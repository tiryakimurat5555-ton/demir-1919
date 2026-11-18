// Karaköy benzetimi (saf JavaScript): oyuncunun hareketi, çarpışma, saat, gece-gündüz,
// kişilerin günlük rutinleri ve tramvay. Ekran bu durumu okur, sesleri ona göre kurar.
import { BINALAR, GUN_BATIMI, GUN_DOGUMU, KISILER, MEKANLAR, SINIR, TRAMVAY, YERLER, SESLER } from './harita';
import { aciDuzelt, goreliAci, saatYonu, tarif, uzaklik } from '../konum';

// Zaman: gerçek 1 saniye = oyunda ZAMAN_ORANI saniye (1 gerçek dakika = 10 oyun dakikası)
export const ZAMAN_ORANI = 10;
export const YURUME_HIZI = 1.4; // m/sn, gerçek zamanda
export const DONUS_HIZI = 1.6; // radyan/sn
export const ADIM_BOYU = 0.75;
export const KISI_HIZI = 1.2; // kişilerin yürüyüşü, m/sn gerçek
export const DEVRIYE_HIZI = 1.0;
export const TRAMVAY_HIZI = 4; // m/sn gerçek
export const KAPI_MENZILI = 2.5;
export const KISI_MENZILI = 3;
const PAY = 0.35; // duvarlara en çok bu kadar yaklaşılır

// Oyun dakikası başına metre (gerçek hızdan)
const dakikaMetre = (hiz) => (hiz * 60) / ZAMAN_ORANI;

export function yeniDunya() {
  return {
    gun: 1, // 4 Aralık 1918
    dakika: 15 * 60, // günün dakikası (kesirli)
    oyuncu: { x: -30, y: 6, yon: Math.PI / 2 },
    mekan: 'dis',
    yurunen: 0,
    yakin: {}, // bildirilmiş yakınlıklar: kapı ve kişi kimlikleri
    gece: geceMi(15 * 60),
    sonSaat: 15,
    sonVapur: 15 * 60,
  };
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
  const { x, y } = d.oyuncu;
  if (y < 10) return 'rıhtım';
  if (y < 14) return 'Rıhtım Caddesi';
  if (y >= 30) return 'meydana çıkan cadde';
  if (x > -38 && x < -34) return 'gümrük ambarının yanındaki ara sokak';
  if (x > 8 && x < 12) return 'büronun yanındaki dar geçit';
  if (x > 24 && x < 28) return 'antrepo ile hanın arasındaki geçit';
  return 'ara sokak';
}

// --- Kişiler ---

function kapiNoktasi(mekan) {
  const c = MEKANLAR.dis.cikislar.find((k) => k.hedef === mekan);
  return c ? { x: c.x, y: c.y } : null;
}

// Bir rutin satırının yerini verir; devriyede o anki devriye noktası
function satirYeri(kisi, satir, dakika) {
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
        return { mekan: 'dis', x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, yuruyor: true };
      }
      yol -= uzun[i];
    }
    return { mekan: 'dis', x: n[0].x, y: n[0].y, yuruyor: true };
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

// Kişinin şu andaki durumu: { id, ad, mekan, x, y, yuruyor, eylem, soz } ya da null (Karaköy'de değil)
export function kisiDurumu(kisi, dakika) {
  const gd = ((dakika % 1440) + 1440) % 1440;
  const r = kisi.rutin;
  let i = 0;
  for (let k = 0; k < r.length; k++) if (r[k].bas <= gd) i = k;
  const satir = r[i];
  const onceki = r[(i - 1 + r.length) % r.length];
  const gecen = gd - satir.bas;
  const hedef = satirYeri(kisi, satir, gd);
  // Önceki yerden yeni yere yürüyüş (devriyeye ve devriyeden gidişte devriyenin ilk noktası kullanılır)
  const oncekiYer = satirYeri(kisi, onceki, onceki.mekan === 'devriye' ? satir.bas : 0);
  const varis = satir.mekan === 'devriye' ? { mekan: 'dis', x: kisi.devriye[0].x, y: kisi.devriye[0].y } : hedef;
  const ayni = oncekiYer.mekan === varis.mekan && uzaklik(oncekiYer, varis) < 0.5;
  if (!ayni) {
    const yol = rota(oncekiYer, varis);
    const uzun = rotaUzunlugu(yol);
    const sure = uzun / dakikaMetre(KISI_HIZI);
    if (gecen < sure) {
      const yer = rotadaYer(yol, gecen * dakikaMetre(KISI_HIZI));
      return { id: kisi.id, ad: kisi.ad, ...yer, eylem: 'yürüyor', soz: null };
    }
  }
  if (satir.mekan === 'yok') return null;
  if (satir.mekan === 'devriye') {
    const yol = rota(oncekiYer, varis);
    const sure = rotaUzunlugu(yol) / dakikaMetre(KISI_HIZI);
    const yer = satirYeri(kisi, satir, gd - (ayni ? 0 : sure));
    return { id: kisi.id, ad: kisi.ad, ...yer, eylem: satir.eylem, soz: satir.soz };
  }
  return { id: kisi.id, ad: kisi.ad, mekan: hedef.mekan, x: hedef.x, y: hedef.y, yuruyor: false, eylem: satir.eylem, soz: satir.soz };
}

export function kisiler(d) {
  return KISILER.map((k) => kisiDurumu(k, d.dakika)).filter(Boolean);
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
  yakinlikOlaylari(d, olaylar);
  return olaylar;
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
      olaylar.push({ tur: 'kapi', ad: c.ad, saat: saatYonu(goreliAci(o, c)) });
    } else if (u > KAPI_MENZILI + 1.5) delete d.yakin[c.id];
  }
  for (const k of kisiler(d)) {
    const anahtar = 'kisi_' + k.id;
    const ayni = k.mekan === d.mekan;
    const u = ayni ? uzaklik(o, k) : 99;
    if (u <= KISI_MENZILI && !d.yakin[anahtar]) {
      d.yakin[anahtar] = true;
      olaylar.push({ tur: 'kisi', ad: k.ad, eylem: k.eylem, saat: saatYonu(goreliAci(o, k)) });
    } else if (u > KISI_MENZILI + 2) delete d.yakin[anahtar];
  }
}

// Çift dokunuş: yakındaki kapıdan geç ya da yakındaki kişiyle konuş
export function etkiles(d) {
  const o = d.oyuncu;
  const kapi = MEKANLAR[d.mekan].cikislar
    .map((c) => ({ c, u: uzaklik(o, c) }))
    .filter((x) => x.u <= KAPI_MENZILI)
    .sort((a, b) => a.u - b.u)[0];
  const kisi = yakindakiKisiler(d)
    .map((k) => ({ k, u: uzaklik(o, k) }))
    .filter((x) => x.u <= KISI_MENZILI)
    .sort((a, b) => a.u - b.u)[0];
  if (kisi && (!kapi || kisi.u < kapi.u)) {
    return { tur: 'konus', ad: kisi.k.ad, metin: kisi.k.soz || kisi.k.ad + ' yürüyor; durup konuşacak gibi değil.' };
  }
  if (kapi) {
    const c = kapi.c;
    d.mekan = c.hedef;
    d.oyuncu = { ...c.varis };
    d.yakin = {};
    MEKANLAR[d.mekan].cikislar.forEach((k) => {
      if (uzaklik(d.oyuncu, k) <= KAPI_MENZILI + 1.5) d.yakin[k.id] = true;
    });
    const yer = d.mekan === 'dis' ? 'Dışarıdasın, ' + konumAdi(d) + '.' : MEKANLAR[d.mekan].ad + '.';
    return { tur: 'gecti', mekan: d.mekan, metin: yer };
  }
  return { tur: 'bos', metin: 'Yakında kapı da kimse de yok.' };
}

// Dokunuş: çevrede ne var? En yakın beş şey, saat yönüyle
export function cevreMetni(d) {
  const o = d.oyuncu;
  const seyler = [];
  for (const c of MEKANLAR[d.mekan].cikislar) seyler.push({ ad: c.ad, x: c.x, y: c.y });
  for (const k of yakindakiKisiler(d)) seyler.push({ ad: k.ad + ' (' + k.eylem + ')', x: k.x, y: k.y });
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
  parcalar.push(konumAdi(d) + ', ' + bakisYonu(d.oyuncu.yon) + ' bakıyorsun.');
  if (d.mekan === 'dis') parcalar.push(d.oyuncu.y < 10 ? 'Deniz güneyinde.' : 'Deniz güneyde, rıhtımın ötesinde.');
  return parcalar.join(' ');
}

// Bekleme: saati ilerletir (yürüme olmadan); oluşan zaman olaylarını döndürür
export function bekle(d, dakika) {
  const olaylar = [];
  const adim = 5;
  for (let g = 0; g < dakika; g += adim) {
    const eski = d.dakika;
    d.dakika += Math.min(adim, dakika - g);
    if (d.dakika >= 1440) {
      d.dakika -= 1440;
      d.gun += 1;
    }
    zamanOlaylari(d, eski, olaylar);
  }
  d.sonVapur = ((d.dakika % 1440) + 1440) % 1440;
  yakinlikOlaylari(d, olaylar);
  return olaylar.filter((o) => o.tur === 'aksam' || o.tur === 'sabah' || o.tur === 'kisi' || o.tur === 'kapi');
}
