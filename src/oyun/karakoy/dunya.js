// Karaköy benzetimi (saf JavaScript): oyuncunun hareketi, çarpışma, saat, gece-gündüz,
// kişilerin günlük rutinleri ve tramvay. Ekran bu durumu okur, sesleri ona göre kurar.
import { BINALAR, GUN_BATIMI, GUN_DOGUMU, KISILER, MEKANLAR, SINIR, TRAMVAY, YERLER, SESLER, geceKimligi } from './harita';
import { BASLANGIC_PARA, NESNELER, mevcutNesneler, nesneEylem } from './gorev1';
import { rotaKur } from './yol';
import { gorev2Ilerle, kisiDuzelt, takipciKisi } from './gorev2';
import { gorev3Ilerle, kisiDuzelt3 } from './gorev3';
import { ekKisiler4, gorev4Ilerle, kisiDuzelt4 } from './gorev4';
import { g5Yakalanma, gorev5Ilerle } from './gorev5';
import { aciDuzelt, goreliAci, saatYonu, tarif, uzaklik } from '../konum';

// Zaman: gerçek 1 saniye = oyunda ZAMAN_ORANI saniye (1 gerçek dakika = 10 oyun dakikası)
export const ZAMAN_ORANI = 10;
export const YURUME_HIZI = 2.4; // m/sn, gerçek zamanda (Murat 1,4'ü çok yavaş buldu)
export const DONUS_HIZI = 1.6; // radyan/sn
export const ADIM_BOYU = 1.0; // her bu kadar metrede bir adım sesi
export const KISI_HIZI = 1.2; // kişilerin yürüyüşü, m/sn gerçek
export const DEVRIYE_HIZI = 1.0;
export const TRAMVAY_HIZI = 4; // m/sn gerçek
export const KAPI_MENZILI = 2.5;
export const KISI_MENZILI = 3;
const PAY = 0.35; // duvarlara en çok bu kadar yaklaşılır

// Oyun dakikası başına metre (gerçek hızdan)
const dakikaMetre = (hiz) => (hiz * 60) / ZAMAN_ORANI;

export const BASLANGIC_DAKIKA = 6 * 60 + 40;
export const SUPHE_UYARI = 40;
const NESNE_MENZILI = 2;
// Gizlice girilen mekânlar: kendiliğinden yürüyüş yavaştır, adımlar kısıktır
export const GIZLI_MEKANLAR = ['antrepo', 'servis_koridoru', 'oda17'];
const gizliMi = (m) => GIZLI_MEKANLAR.includes(m);

export function yeniDunya() {
  return {
    gun: 1, // 4 Aralık 1918, Çarşamba
    dakika: BASLANGIC_DAKIKA, // günün dakikası (kesirli)
    oyuncu: { x: -40, y: 5, yon: Math.PI / 2 },
    mekan: 'kayikhane',
    sahne: 'acilis', // açık hikâye sahnesi (sahneler.js)
    yurunen: 0,
    yakin: {}, // bildirilmiş yakınlıklar: kapı, nesne ve kişi kimlikleri
    gece: geceMi(BASLANGIC_DAKIKA),
    sonSaat: Math.floor(BASLANGIC_DAKIKA / 60),
    sonVapur: BASLANGIC_DAKIKA,
    // soruşturma
    deliller: [],
    teoriler: [],
    bayrak: {},
    para: BASLANGIC_PARA,
    itibar: 0,
    travma: 0,
    envanter: {},
    film: 0,
    negatifler: [],
    fotograflar: [],
    suphe: 0,
    gorevBitti: false,
    gorev: 1,
    gorevGun: 1,
    kilik: null, // üçüncü görevde 'bey' ya da 'usak'
    kesif: { kayikhane: true, han: true }, // bilinen yerler, kişiler, eşyalar (Yerler menüsü bunlardan oluşur)
  };
}

// Mekânların zemini (adım sesleri): taş ya da ahşap
export const ZEMIN = {
  dis: 'tas',
  han: 'tas',
  buro: 'tas',
  kayikhane: 'ahsap',
  oda: 'ahsap',
  antrepo: 'ahsap',
  cihangir: 'ahsap',
  pera_cadde: 'tas',
  kulup_salon: 'ahsap',
  servis_koridoru: 'tas',
  oda17: 'ahsap',
  meyhane: 'ahsap',
};

function kesfet(d, anahtar) {
  if (!d.kesif) d.kesif = {};
  d.kesif[anahtar] = true;
}

export function geceMi(dakika) {
  const d = ((dakika % 1440) + 1440) % 1440;
  return d < GUN_DOGUMU || d >= GUN_BATIMI;
}

export function saatMetni(dakika) {
  const d = Math.floor(((dakika % 1440) + 1440) % 1440);
  const s = Math.floor(d / 60);
  const m = d % 60;
  return s + '.' + String(m).padStart(2, '0');
}

export function gunBolumu(dakika) {
  const d = ((dakika % 1440) + 1440) % 1440;
  if (d < 5 * 60) return 'gece yarısından sonra';
  if (d < GUN_DOGUMU) return 'şafaktan önce';
  if (d < 11 * 60) return 'sabah';
  if (d < 14 * 60) return 'öğle';
  if (d < GUN_BATIMI) return 'öğleden sonra';
  if (d < 20 * 60) return 'akşam';
  return 'gece';
}

function icinde(r, p, pay = 0) {
  return p.x > r.x1 - pay && p.x < r.x2 + pay && p.y > r.y1 - pay && p.y < r.y2 + pay;
}

// Bir nokta oyuncunun bulunduğu mekânda geçilebilir mi? Değilse engelin türünü döndürür.
export function engel(mekan, p) {
  if (mekan === 'dis') {
    if (p.y < SINIR.guney + PAY) return 'su';
    if (p.x < SINIR.bati || p.x > SINIR.dogu || p.y > SINIR.kuzey) return 'sinir';
    for (const b of BINALAR) if (icinde(b, p, PAY)) return 'duvar';
    return null;
  }
  const a = MEKANLAR[mekan].alan;
  if (p.x < a.x1 + PAY || p.x > a.x2 - PAY || p.y < a.y1 + PAY || p.y > a.y2 - PAY) return 'duvar';
  return null;
}

// Oyuncunun yeri için kısa ad
export function konumAdi(d) {
  if (d.mekan !== 'dis') return MEKANLAR[d.mekan].ad;
  if (d.oyuncu.x > 24 && d.oyuncu.x < 28 && d.oyuncu.y > 14 && d.oyuncu.y < 30) return 'antrepo ile hanın arasındaki geçit';
  const { x, y } = d.oyuncu;
  if (y < 10) return 'rıhtım';
  if (y < 14) return 'Rıhtım Caddesi';
  if (y >= 30) return 'meydana çıkan cadde';
  if (x > -38 && x < -34) return 'gümrük ambarının yanındaki ara sokak';
  if (x > 8 && x < 12) return 'büronun yanındaki dar geçit';
  if (x > 24 && x < 28) return 'antrepo ile hanın arasındaki geçit';
  if (x > 46 && x < 50) return 'han ile yapıların arasındaki karanlık geçit';
  return 'ara sokak';
}

// --- Kişiler ---

function kapiNoktasi(mekan) {
  const c = MEKANLAR.dis.cikislar.find((k) => k.hedef === mekan);
  return c ? { x: c.x, y: c.y } : null;
}

// Bir rutin satırının yerini verir; devriyede o anki devriye noktası
function satirYeri(kisi, satir, dakika) {
  const dm = kisi.devriyeMekan || 'dis';
  if (satir.mekan === 'yok') return { mekan: 'yok', x: kisi.giris.x, y: kisi.giris.y };
  if (satir.mekan === 'devriye') {
    const n = kisi.devriye;
    let toplam = 0;
    const uzun = [];
    for (let i = 0; i < n.length; i++) {
      const u = uzaklik(n[i], n[(i + 1) % n.length]);
      uzun.push(u);
      toplam += u;
    }
    let yol = (((dakika - satir.bas) * dakikaMetre(DEVRIYE_HIZI)) % toplam + toplam) % toplam;
    for (let i = 0; i < n.length; i++) {
      if (yol <= uzun[i]) {
        const a = n[i];
        const b = n[(i + 1) % n.length];
        const t = uzun[i] ? yol / uzun[i] : 0;
        return { mekan: dm, x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, yuruyor: true };
      }
      yol -= uzun[i];
    }
    return { mekan: dm, x: n[0].x, y: n[0].y, yuruyor: true };
  }
  return { mekan: satir.mekan, x: satir.x, y: satir.y };
}

// Bir yerden ötekine yürüme yolu: iç mekândan çıkarken kapıdan geçilir
function rota(a, b) {
  const noktalar = [{ x: a.x, y: a.y, mekan: a.mekan === 'yok' ? 'dis' : a.mekan }];
  if (a.mekan !== b.mekan) {
    const ak = MEKANLAR[a.mekan] && a.mekan !== 'dis' ? kapiNoktasi(a.mekan === 'oda' ? 'han' : a.mekan) : null;
    const bk = MEKANLAR[b.mekan] && b.mekan !== 'dis' ? kapiNoktasi(b.mekan === 'oda' ? 'han' : b.mekan) : null;
    if (ak) noktalar.push({ ...ak, mekan: 'dis' });
    if (bk) noktalar.push({ ...bk, mekan: 'dis' });
  }
  noktalar.push({ x: b.x, y: b.y, mekan: b.mekan === 'yok' ? 'dis' : b.mekan });
  return noktalar;
}

function rotaUzunlugu(r) {
  let u = 0;
  for (let i = 1; i < r.length; i++) u += uzaklik(r[i - 1], r[i]);
  return u;
}

function rotadaYer(r, yol) {
  for (let i = 1; i < r.length; i++) {
    const u = uzaklik(r[i - 1], r[i]);
    if (yol <= u) {
      const t = u ? yol / u : 0;
      const a = r[i - 1];
      const b = r[i];
      // Kapıya kadar başladığı mekânda, kapıdan sonra vardığı mekânda sayılır
      const mekan = i === 1 ? a.mekan : i === r.length - 1 ? b.mekan : 'dis';
      return { mekan, x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, yuruyor: true };
    }
    yol -= u;
  }
  const s = r[r.length - 1];
  return { mekan: s.mekan, x: s.x, y: s.y, yuruyor: false };
}

// Rutin satırının bugün geçerli olup olmadığı. ctx: { gorev, gorevGun }
function satirGecerli(x, gun, ctx) {
  const gorev = ctx.gorev || 1;
  if (x.gun && x.gun !== gun) return false;
  if (x.gorev && x.gorev !== gorev) return false;
  if (x.gorevMin && gorev < x.gorevMin) return false;
  if (x.gorevGunu && gun !== ctx.gorevGun) return false;
  return true;
}

// Kişinin şu andaki durumu: { id, ad, mekan, x, y, yuruyor, eylem, soz } ya da null (Karaköy'de değil)
export function kisiDurumu(kisi, dakika, gun = 1, ctx = {}) {
  const gd = ((dakika % 1440) + 1440) % 1440;
  const gecerli = kisi.rutin.filter((x) => satirGecerli(x, gun, ctx));
  // "yalniz" satırlar o günün bütün rutinini belirler (başka bir şehirdeki gün gibi)
  const ozel = gecerli.filter((x) => x.yalniz);
  const r = ozel.length ? [{ bas: 0, mekan: 'yok' }, ...ozel] : gecerli.filter((x) => !x.yalniz);
  let i = 0;
  for (let k = 0; k < r.length; k++) if (r[k].bas <= gd) i = k;
  const satir = r[i];
  const onceki = r[(i - 1 + r.length) % r.length];
  const gecen = gd - satir.bas;
  const hedef = satirYeri(kisi, satir, gd);
  // Önceki yerden yeni yere yürüyüş (devriyeye ve devriyeden gidişte devriyenin ilk noktası kullanılır)
  const oncekiYer = satirYeri(kisi, onceki, onceki.mekan === 'devriye' ? satir.bas : 0);
  const varis = satir.mekan === 'devriye' ? { mekan: kisi.devriyeMekan || 'dis', x: kisi.devriye[0].x, y: kisi.devriye[0].y } : hedef;
  const ayni = oncekiYer.mekan === varis.mekan && uzaklik(oncekiYer, varis) < 0.5;
  if (!ayni) {
    const yol = rota(oncekiYer, varis);
    const uzun = rotaUzunlugu(yol) > 90 ? 0 : rotaUzunlugu(yol); // çok uzak yerler arası yürünmez (Karaköy - Pera)
    const sure = uzun / dakikaMetre(KISI_HIZI);
    if (gecen < sure) {
      const yer = rotadaYer(yol, gecen * dakikaMetre(KISI_HIZI));
      return { id: kisi.id, ad: kisi.ad, ...yer, eylem: 'yürüyor', soz: null };
    }
  }
  if (satir.mekan === 'yok') return null;
  if (satir.mekan === 'devriye') {
    const yol = rota(oncekiYer, varis);
    const sure = (rotaUzunlugu(yol) > 90 ? 0 : rotaUzunlugu(yol)) / dakikaMetre(KISI_HIZI);
    const yer = satirYeri(kisi, satir, gd - (ayni ? 0 : sure));
    return { id: kisi.id, ad: kisi.ad, ...yer, eylem: satir.eylem, soz: satir.soz };
  }
  return { id: kisi.id, ad: kisi.ad, mekan: hedef.mekan, x: hedef.x, y: hedef.y, yuruyor: false, eylem: satir.eylem, soz: satir.soz };
}

// Karaköy'deki kişiler. Fark edilmemiş takipçi bu listede yoktur (yalnızca adımları duyulur).
export function kisiler(d) {
  const ctx = { gorev: d.gorev || 1, gorevGun: d.gorevGun };
  const liste = KISILER.map((k) => kisiDurumu(k, d.dakika, d.gun, ctx))
    .filter(Boolean)
    .map((k) => kisiDuzelt(d, k))
    .filter(Boolean)
    .map((k) => kisiDuzelt3(d, k))
    .map((k) => kisiDuzelt4(d, k))
    .filter(Boolean);
  for (const e of ekKisiler4(d)) if (!liste.some((k) => k.id === e.id)) liste.push(e);
  const t = takipciKisi(d);
  if (t && !t.gizli) liste.push(t);
  return liste;
}

// Ses için: gizli takipçi de dahil (adımları duyulur)
export function sesliKisiler(d) {
  const liste = kisiler(d);
  const t = takipciKisi(d);
  if (t && t.gizli) liste.push(t);
  return liste;
}

// Aynı mekândaki kişiler
export function yakindakiKisiler(d) {
  return kisiler(d).filter((k) => k.mekan === d.mekan);
}

// --- Tramvay ---
// Gündüz her TRAMVAY.aralik oyun dakikasında bir doğudan batıya geçer. Konumu ya da null.
export function tramvayYeri(dakika) {
  const gd = ((dakika % 1440) + 1440) % 1440;
  if (gd >= TRAMVAY.gece.bas || gd < TRAMVAY.gece.bit) return null;
  const gecen = (((gd - TRAMVAY.ilk) % TRAMVAY.aralik) + TRAMVAY.aralik) % TRAMVAY.aralik;
  const yol = gecen * dakikaMetre(TRAMVAY_HIZI);
  const boy = TRAMVAY.dogu - TRAMVAY.bati;
  if (yol > boy) return null;
  return { x: TRAMVAY.dogu - yol, y: TRAMVAY.y };
}

// --- İlerleme ---
// girdi: { ileri: -1..1, donus: -1..1 }, dt: gerçek saniye. Olaylar dizisi döner.
export function ilerle(d, girdi, dt) {
  const olaylar = [];
  const eskiDakika = d.dakika;
  d.dakika += (dt * ZAMAN_ORANI) / 60;
  if (d.dakika >= 1440) {
    d.dakika -= 1440;
    d.gun += 1;
    olaylar.push({ tur: 'yeniGun' });
  }
  zamanOlaylari(d, eskiDakika, olaylar);

  if (d.oto && (girdi.ileri || girdi.donus)) {
    d.oto = null;
    olaylar.push({ tur: 'otoIptal' });
  }
  if (d.oto) {
    otoHareket(d, dt, olaylar);
    gizlilik(d, gizliMi(d.mekan) ? 0.3 : 0.7, dt, olaylar);
    gorev2Ilerle(d, gizliMi(d.mekan) ? OTO_HIZ_GIZLI / YURUME_HIZI : OTO_HIZ / YURUME_HIZI, dt, olaylar);
    gorev3Ilerle(d);
    gorev4Ilerle(d);
    gorev5Ilerle(d);
    yakinlikOlaylari(d, olaylar);
    return olaylar;
  }
  const ileri = Math.max(-1, Math.min(1, girdi.ileri || 0));
  const donus = Math.max(-1, Math.min(1, girdi.donus || 0));
  if (donus) d.oyuncu = { ...d.oyuncu, yon: aciDuzelt(d.oyuncu.yon + donus * DONUS_HIZI * dt) };
  if (ileri) {
    const metre = ileri * YURUME_HIZI * dt * (ileri < 0 ? 0.6 : 1);
    const o = d.oyuncu;
    const dx = Math.sin(o.yon) * metre;
    const dy = Math.cos(o.yon) * metre;
    let yeni = { ...o, x: o.x + dx, y: o.y + dy };
    let neden = engel(d.mekan, yeni);
    if (neden) {
      // Duvar boyunca kay
      const yatay = { ...o, x: o.x + dx };
      const dikey = { ...o, y: o.y + dy };
      if (!engel(d.mekan, yatay) && Math.abs(dx) > 0.001) yeni = yatay;
      else if (!engel(d.mekan, dikey) && Math.abs(dy) > 0.001) yeni = dikey;
      else yeni = null;
      if (!d.carpti) olaylar.push({ tur: 'carpti', neden });
      d.carpti = true;
    } else d.carpti = false;
    if (yeni) {
      const gidilen = uzaklik(o, yeni);
      d.oyuncu = yeni;
      d.yurunen += gidilen;
      if (d.yurunen >= ADIM_BOYU) {
        d.yurunen = 0;
        olaylar.push({ tur: 'adim' });
      }
    }
  } else d.carpti = false;
  gizlilik(d, Math.abs(ileri), dt, olaylar);
  gorev2Ilerle(d, Math.abs(ileri), dt, olaylar);
  gorev3Ilerle(d);
  gorev4Ilerle(d);
  gorev5Ilerle(d);
  yakinlikOlaylari(d, olaylar);
  return olaylar;
}

// Gözcüler (antrepoda bekçi, kulübün koridorunda merdivendeki adamlar): yakınken hareket etmek şüphe doğurur;
// 100'e varınca yakalanırsın. Aynı mekândaki en yakın gözcüyü döndürür.
const GOZCULER = KISILER.filter((k) => k.gozcu).map((k) => k.id);
export function bekci(d) {
  const liste = kisiler(d).filter((k) => GOZCULER.includes(k.id) && k.mekan === d.mekan);
  if (!liste.length) return null;
  liste.sort((a, b) => uzaklik(a, d.oyuncu) - uzaklik(b, d.oyuncu));
  return liste[0];
}

function gizlilik(d, hiz, dt, olaylar) {
  const b = bekci(d);
  const once = d.suphe;
  if (!b) {
    d.suphe = Math.max(0, d.suphe - 12 * dt);
    return;
  }
  const u = uzaklik(d.oyuncu, b);
  let art;
  if (u < 2.5) art = 200;
  else if (u < 6) art = hiz > 0.5 ? 30 : hiz > 0 ? 12 : 4;
  else if (u < 10) art = hiz > 0.8 ? 8 : -10;
  else art = -12;
  d.suphe = Math.max(0, Math.min(100, d.suphe + art * dt));
  if (once < SUPHE_UYARI && d.suphe >= SUPHE_UYARI) olaylar.push({ tur: 'suphe' });
  if (d.suphe >= 100) yakalan(d, olaylar);
}

function yakalan(d, olaylar) {
  if (g5Yakalanma(d)) {
    olaylar.push({ tur: 'anlatim', metin: 'Bir fener yüzüne vuruyor.', uyari: true });
    return;
  }
  d.suphe = 0;
  d.bayrak.yakalandiSayi = (d.bayrak.yakalandiSayi || 0) + 1;
  d.oto = null;
  if (d.mekan === 'servis_koridoru' || d.mekan === 'oda17') {
    // Kulüpten atılırsın; bu gece ne ön kapıdan ne servis kapısından girebilirsin
    d.bayrak.kulupKapali = true;
    d.mekan = 'pera_cadde';
    d.oyuncu = { x: 249, y: 6, yon: -Math.PI / 2 };
    d.yakin = {};
    olaylar.push({
      tur: 'yakalandi',
      metin: 'İri bir el ensenden yakalıyor. Seni koridor boyunca sürükleyip arka kapıdan sokağa fırlatıyorlar; kaldırım taşları dizlerini parçalıyor. Kapı arkandan sürgüleniyor. Bu gece kulübe bir daha giremezsin. Nermin ile Cemil hâlâ içeride.',
    });
    return;
  }
  d.itibar -= 1;
  d.bayrak.antrepoKapaliGece = geceKimligi(d);
  d.mekan = 'dis';
  d.oyuncu = { x: 25.6, y: 22, yon: Math.PI / 2 };
  d.yakin = {};
  olaylar.push({ tur: 'yakalandi' });
}

function zamanOlaylari(d, eski, olaylar) {
  const gece = geceMi(d.dakika);
  if (gece !== d.gece) {
    d.gece = gece;
    olaylar.push({ tur: gece ? 'aksam' : 'sabah' });
  }
  const saat = Math.floor((((d.dakika % 1440) + 1440) % 1440) / 60);
  if (saat !== d.sonSaat) {
    d.sonSaat = saat;
    olaylar.push({ tur: 'saatBasi', saat });
  }
  const gd = ((d.dakika % 1440) + 1440) % 1440;
  if (!gece && gd - d.sonVapur >= SESLER.vapur.aralik) {
    d.sonVapur = gd;
    olaylar.push({ tur: 'vapur' });
  }
  if (gd < d.sonVapur) d.sonVapur = gd;
  if (!d.bayrak.cesetGitti && (d.gun > 1 || gd >= 9 * 60 + 5)) {
    d.bayrak.cesetGitti = true;
    olaylar.push({ tur: 'cesetGitti' });
  }
  const ot = tramvayYeri(eski);
  const yt = tramvayYeri(d.dakika);
  if (!ot && yt) olaylar.push({ tur: 'tramvay' });
}

function yakinlikOlaylari(d, olaylar) {
  const o = d.oyuncu;
  for (const c of MEKANLAR[d.mekan].cikislar) {
    const u = uzaklik(o, c);
    if (u <= KAPI_MENZILI && !d.yakin[c.id]) {
      d.yakin[c.id] = true;
      kesfet(d, 'kapi_' + c.id);
      olaylar.push({ tur: 'kapi', ad: c.ad, saat: saatYonu(goreliAci(o, c)) });
    } else if (u > KAPI_MENZILI + 1.5) delete d.yakin[c.id];
  }
  for (const n of mevcutNesneler(d)) {
    const anahtar = 'nesne_' + n.id;
    const u = uzaklik(o, n);
    if (u <= NESNE_MENZILI && !d.yakin[anahtar]) {
      d.yakin[anahtar] = true;
      kesfet(d, anahtar);
      olaylar.push({ tur: 'nesne', ad: n.ad, saat: saatYonu(goreliAci(o, n)) });
    } else if (u > NESNE_MENZILI + 1.5) delete d.yakin[anahtar];
  }
  for (const k of kisiler(d)) {
    const anahtar = 'kisi_' + k.id;
    const ayni = k.mekan === d.mekan;
    const u = ayni ? uzaklik(o, k) : 99;
    if (u <= KISI_MENZILI && !d.yakin[anahtar]) {
      d.yakin[anahtar] = true;
      kesfet(d, anahtar);
      olaylar.push({ tur: 'kisi', ad: k.ad, eylem: k.eylem, saat: saatYonu(goreliAci(o, k)) });
    } else if (u > KISI_MENZILI + 2) delete d.yakin[anahtar];
  }
}

// Çift dokunuş: en yakındaki kapı, nesne ya da kişi.
// Döner: { tur: 'gecti' | 'kilitli' | 'nesne' | 'konus' | 'bos', ... }
export function etkiles(d) {
  const o = d.oyuncu;
  const adaylar = [];
  for (const c of MEKANLAR[d.mekan].cikislar) {
    const u = uzaklik(o, c);
    if (u <= KAPI_MENZILI) adaylar.push({ tur: 'kapi', c, u });
  }
  for (const n of mevcutNesneler(d)) {
    const u = uzaklik(o, n);
    if (u <= NESNE_MENZILI) adaylar.push({ tur: 'nesne', n, u: u - 0.3 });
  }
  for (const k of yakindakiKisiler(d)) {
    const u = uzaklik(o, k);
    if (u <= KISI_MENZILI) adaylar.push({ tur: 'kisi', k, u: u - 0.2 });
  }
  adaylar.sort((a, b) => a.u - b.u);
  const s = adaylar[0];
  if (!s) return { tur: 'bos', metin: 'Yakında kapı, eşya ya da kimse yok.' };
  if (s.tur === 'kisi') {
    const k = s.k;
    if (k.yuruyor && k.id !== 'bekci') return { tur: 'konus', kisiId: k.id, ad: k.ad, metin: k.ad + ' yürüyor; durup konuşacak gibi değil.', yuruyor: true };
    return { tur: 'konus', kisiId: k.id, ad: k.ad, metin: k.soz || '' };
  }
  if (s.tur === 'nesne') return { tur: 'nesne', id: s.n.id, ad: s.n.ad, metin: s.n.giris };
  const c = s.c;
  if (c.acik && !c.acik(d)) return { tur: 'kilitli', metin: c.kilitli || 'Kapı kilitli.' };
  return kapidanGec(d, c);
}

export function kapidanGec(d, c) {
  d.mekan = c.hedef;
  kesfet(d, c.hedef);
  d.oyuncu = { ...c.varis };
  d.yakin = {};
  MEKANLAR[d.mekan].cikislar.forEach((k) => {
    if (uzaklik(d.oyuncu, k) <= KAPI_MENZILI + 1.5) d.yakin[k.id] = true;
  });
  const yer = d.mekan === 'dis' ? 'Dışarıdasın, ' + konumAdi(d) + '.' : MEKANLAR[d.mekan].ad + '.';
  return { tur: 'gecti', mekan: d.mekan, metin: yer };
}

// Bir nesne eylemini uygular; gürültü bekçiye ulaşırsa şüphe artar, süren işler saati ilerletir
export function eylemUygula(d, nesneId, eylemId) {
  const ctx = {
    gece: d.gece,
    kisiYakin: (id, metre) => kisiler(d).some((k) => k.id === id && k.mekan === d.mekan && uzaklik(k, d.oyuncu) <= metre),
  };
  const s = nesneEylem(d, nesneId, eylemId, ctx);
  const olaylar = [];
  if (s.gurultu) {
    const b = bekci(d);
    if (b && uzaklik(b, d.oyuncu) < 10) {
      const once = d.suphe;
      d.suphe = Math.min(100, d.suphe + s.gurultu);
      if (once < SUPHE_UYARI && d.suphe >= SUPHE_UYARI) olaylar.push({ tur: 'suphe' });
      if (d.suphe >= 100) yakalan(d, olaylar);
    }
  }
  if (s.sure) olaylar.push(...bekle(d, s.sure));
  return { ...s, olaylar };
}

// Dokunuş: çevrede ne var? En yakın beş şey, saat yönüyle
export function cevreMetni(d) {
  const o = d.oyuncu;
  const seyler = [];
  for (const c of MEKANLAR[d.mekan].cikislar) seyler.push({ ad: c.ad, x: c.x, y: c.y });
  for (const k of yakindakiKisiler(d)) seyler.push({ ad: k.ad + ' (' + k.eylem + ')', x: k.x, y: k.y });
  for (const n of mevcutNesneler(d)) seyler.push({ ad: n.ad, x: n.x, y: n.y });
  if (d.mekan === 'dis') {
    for (const y of YERLER) seyler.push(y);
    const t = tramvayYeri(d.dakika);
    if (t) seyler.push({ ad: 'Tramvay', x: t.x, y: t.y });
  }
  const yakin = seyler
    .map((s) => ({ s, u: uzaklik(o, s) }))
    .filter((x) => x.u <= (d.mekan === 'dis' ? 40 : 25))
    .sort((a, b) => a.u - b.u)
    .slice(0, 5)
    .map((x) => tarif(x.s.ad, o, x.s));
  const bas = 'Buradasın: ' + konumAdi(d) + '.';
  return [bas, ...(yakin.length ? yakin : ['Yakında dikkatini çeken bir şey yok.'])].join(' ');
}

const YONLER = ['kuzeye', 'kuzeydoğuya', 'doğuya', 'güneydoğuya', 'güneye', 'güneybatıya', 'batıya', 'kuzeybatıya'];

export function bakisYonu(yon) {
  return YONLER[Math.round(aciDuzelt(yon) / (Math.PI / 4)) % 8];
}

// Uzun basış: saat, gün bölümü, yer ve bakış yönü
export function durumMetni(d) {
  const parcalar = ['Saat ' + saatMetni(d.dakika) + ', ' + gunBolumu(d.dakika) + '.'];
  parcalar.push(d.gece ? 'Hava karanlık.' : 'Hava aydınlık.');
  const yer = konumAdi(d);
  parcalar.push(yer.charAt(0).toLocaleUpperCase('tr') + yer.slice(1) + ', ' + bakisYonu(d.oyuncu.yon) + ' bakıyorsun.');
  if (d.mekan === 'dis') parcalar.push(d.oyuncu.y < 10 ? 'Deniz güneyinde.' : 'Deniz güneyde, rıhtımın ötesinde.');
  return parcalar.join(' ');
}

// Bekleme: saati ilerletir (yürüme olmadan); oluşan zaman olaylarını döndürür
export function bekle(d, dakika) {
  const olaylar = [];
  const adim = 5;
  const sahneOnce = d.sahne;
  for (let g = 0; g < dakika; g += adim) {
    const eski = d.dakika;
    d.dakika += Math.min(adim, dakika - g);
    if (d.dakika >= 1440) {
      d.dakika -= 1440;
      d.gun += 1;
    }
    zamanOlaylari(d, eski, olaylar);
    gorev2Ilerle(d, 0, (Math.min(adim, dakika - g) * 60) / ZAMAN_ORANI, olaylar, true);
    gorev3Ilerle(d);
    gorev4Ilerle(d);
    gorev5Ilerle(d);
    if (d.sahne && !sahneOnce) break; // bir hikâye sahnesi açıldı: bekleme biter
  }
  d.sonVapur = ((d.dakika % 1440) + 1440) % 1440;
  yakinlikOlaylari(d, olaylar);
  return olaylar.filter((o) => ['aksam', 'sabah', 'kisi', 'kapi', 'cesetGitti', 'anlatim'].includes(o.tur));
}

// --- Kendiliğinden yürüme ("Yerler" menüsü) ---

const OTO_HIZ = 2.4; // m/sn
const OTO_HIZ_GIZLI = 0.9; // gizli yerlerde, gözcüyü uyandırmamak için

// Bu kişileri Arif zaten tanır (limanda çalışıyor); ötekiler karşılaşınca listeye girer
const TANIDIK = ['suleyman', 'husnu', 'ohannes', 'hamallar', 'halim', 'riza'];
// Bu kişiler listeye hiç girmez (gizlice izlenir ya da kaçar)
const LISTEDISI = ['bekci', 'takipci', 'kasketli', 'nobetci', 'lavantali', 'delorme'];

// Şu an gidilebilecek ve bilinen yerler: { id, ad, mekan, x, y, menzil, tur, uzaklik }
export function yerlerListesi(d) {
  const k = d.kesif || {};
  const b = d.bayrak;
  const liste = [];
  const ekle = (id, ad, mekan, x, y, menzil, tur) => liste.push({ id, ad, mekan, x, y, menzil, tur });
  ekle('kayikhane', 'Süleyman Kaptan\'ın kayıkhanesi', 'kayikhane', -41, 5, 1, 'yer');
  if (k.buro || b.gulceOnerildi) ekle('buro', 'Liman kayıt bürosu', 'buro', -1, 17, 1, 'yer');
  ekle('han', 'Kalafatçı Hanı', 'han', 37, 19, 1, 'yer');
  if (b.odaAnahtari) ekle('oda', 'Sabri\'nin odası', 'oda', 43, 26, 1, 'yer');
  if (k.kapi_antrepo_arka || b.arkaKapiBiliniyor) ekle('antrepo_arka', 'Antreponun arka kapısı', 'dis', 25.4, 22, 0.5, 'yer');
  ekle('leventis', 'Leventis vapurunun yanı', 'dis', 30, 1.3, 1, 'yer');
  ekle('iskele', 'Kayıkçı iskelesi', 'dis', 5, 1.3, 1, 'yer');
  ekle('durak', 'Tramvay durağı', 'dis', 0, 34, 1, 'yer');
  if ((d.gorev || 1) >= 4) ekle('meyhane', 'Rum meyhanesi', 'meyhane', 55, 16, 1, 'yer');
  if ((d.gorev || 1) >= 3) {
    ekle('pera', 'Yüksekkaldırım\'ın tepesi, Pera', 'pera_cadde', 202.5, 2.5, 1, 'yer');
    ekle('cihangir', 'Cemil\'in evi, Cihangir', 'cihangir', 205, 53, 1, 'yer');
    ekle('kulup', 'Mercure Kulübü\'nün kapısı', 'pera_cadde', 230, 8.3, 0.8, 'yer');
    ekle('servis', 'Kulübün servis kapısı, arka sokak', 'pera_cadde', 250, 8.3, 0.8, 'yer');
    if (k.kulup_salon) ekle('salon', 'Mercure Kulübü\'nün salonu', 'kulup_salon', 230, 16, 1, 'yer');
  }
  if (b.gecitBiliniyor || d.deliller.includes('halim_bulusma')) ekle('gecit', 'Karanlık geçidin rıhtım ağzı', 'dis', 48, 13, 0.6, 'yer');
  for (const p of kisiler(d)) {
    if (LISTEDISI.includes(p.id) || gizliMi(p.mekan)) continue;
    const taniniyor =
      TANIDIK.includes(p.id) || k['kisi_' + p.id] || (p.id === 'gulce' && b.gulceOnerildi) || (p.id === 'cemil' && (b.cemilTanisti || b.s2Selam));
    if (taniniyor) ekle('kisi_' + p.id, p.ad, p.mekan, p.x, p.y, 1.6, 'kisi');
  }
  const bilinen = {
    ceset: true,
    denk: b.denkAcik,
    karanlik_oda: d.envanter.kamera,
    yuk_defteri: b.gulceIzin,
    vinc_defteri: b.gulceIzin,
  };
  for (const n of NESNELER) {
    if (!n.mevcut(d)) continue;
    if (n.mekan === 'oda' && !b.odaAnahtari) continue;
    if (gizliMi(n.mekan)) continue; // gizlice girilen yerlerin eşyalarına menüden yürünmez
    if (bilinen[n.id] || k['nesne_' + n.id]) ekle('nesne_' + n.id, n.ad, n.mekan, n.x, n.y, 1.2, 'nesne');
  }
  for (const y of liste) y.uzaklik = y.mekan === d.mekan ? Math.round(uzaklik(d.oyuncu, y)) : null;
  return liste.filter((y) => !(y.mekan === d.mekan && y.uzaklik !== null && y.uzaklik < 1.5 && y.tur === 'yer'));
}

// Bir yere kendiliğinden yürümeyi başlatır. Döner: { metin, tamam }
export function otoBaslat(d, hedef) {
  if (hedef.mekan === d.mekan && uzaklik(d.oyuncu, hedef) <= hedef.menzil + 0.3) return { metin: hedef.ad + ' zaten yanında.', tamam: false };
  const r = rotaKur(d, engel, hedef);
  if (r.hata) return { metin: r.hata, tamam: false };
  d.oto = { adimlar: r.adimlar, i: 0, hedef, kilitli: r.kilitli || null };
  return { metin: hedef.ad + ' yönünde yürüyorsun. Durmak için ekrana dokun.', tamam: true };
}

function otoHareket(d, dt, olaylar) {
  const oto = d.oto;
  const adim = oto.adimlar[oto.i];
  if (!adim) {
    otoBitir(d, olaylar);
    return;
  }
  if (adim.tur === 'kapi') {
    const c = MEKANLAR[adim.mekan].cikislar.find((x) => x.id === adim.cikisId);
    if (c.acik && !c.acik(d)) {
      d.oto = null;
      olaylar.push({ tur: 'otoKilitli', metin: c.kilitli || 'Kapı kilitli.' });
      return;
    }
    kapidanGec(d, c);
    olaylar.push({ tur: 'otoKapi', mekan: d.mekan });
    oto.i++;
    return;
  }
  const sonAdim = oto.i === oto.adimlar.length - 1;
  const o = d.oyuncu;
  const u = uzaklik(o, adim);
  const durma = sonAdim ? oto.hedef.menzil : 0.05;
  if (u <= durma) {
    oto.i++;
    if (sonAdim) otoBitir(d, olaylar);
    return;
  }
  const yon = Math.atan2(adim.x - o.x, adim.y - o.y);
  const hiz = gizliMi(d.mekan) ? OTO_HIZ_GIZLI : OTO_HIZ;
  const metre = Math.min(u - (sonAdim ? durma * 0.9 : 0), hiz * dt);
  const yeni = { x: o.x + Math.sin(yon) * metre, y: o.y + Math.cos(yon) * metre, yon: aciDuzelt(yon) };
  let gidilen = yeni;
  if (engel(d.mekan, yeni)) {
    // Köşeye sürtünürse duvar boyunca kay
    const yatay = { ...yeni, y: o.y };
    const dikey = { ...yeni, x: o.x };
    gidilen = !engel(d.mekan, yatay) ? yatay : !engel(d.mekan, dikey) ? dikey : null;
    oto.takilma = (oto.takilma || 0) + 1;
    if (!gidilen || oto.takilma > 40) {
      d.oto = null;
      olaylar.push({ tur: 'otoTakildi' });
      return;
    }
  }
  d.oyuncu = gidilen;
  d.yurunen += metre;
  if (d.yurunen >= ADIM_BOYU) {
    d.yurunen = 0;
    olaylar.push({ tur: 'adim' });
  }
}

function otoBitir(d, olaylar) {
  const h = d.oto.hedef;
  const kilitli = d.oto.kilitli;
  d.oto = null;
  if (kilitli) {
    olaylar.push({ tur: 'otoKilitli', metin: kilitli });
    return;
  }
  // Hedefe dön
  if (h.mekan === d.mekan && uzaklik(d.oyuncu, h) > 0.2) d.oyuncu = { ...d.oyuncu, yon: aciDuzelt(Math.atan2(h.x - d.oyuncu.x, h.y - d.oyuncu.y)) };
  olaylar.push({ tur: 'otoVardi', ad: h.ad });
}

// --- Kayıt ---
export const KARAKOY_SURUM = 1;

// Kaydedilecek durum: geçici alanlar (kendiliğinden yürüme, yakınlık bildirimleri) atılır
export function kayitTemizle(d) {
  const { oto, yakin, carpti, bekleme, ...kalan } = d;
  return { ...kalan, surum: KARAKOY_SURUM };
}

export function kayittanDunya(k) {
  if (!k || k.surum !== KARAKOY_SURUM || !k.oyuncu || !Array.isArray(k.deliller) || !MEKANLAR[k.mekan]) return null;
  const temel = yeniDunya();
  const d = { ...temel, ...k, oto: null, yakin: {} };
  delete d.surum;
  // Birinci görevi ikinci görev yokken bitiren kayıt: ikinci görev gecenin sahnesiyle başlar
  if (d.gorev === 1 && d.gorevBitti && !d.sahne) d.sahne = 'g2_gece';
  return d;
}

// Kayıttan dönüşte söylenen kısa durum: gün, saat, yer
export function durumKisa(d) {
  const tarih = 3 + d.gun + ' Aralık 1918';
  const yer = konumAdi(d);
  return tarih + ', saat ' + saatMetni(d.dakika) + '. ' + yer.charAt(0).toLocaleUpperCase('tr') + yer.slice(1) + '.';
}
