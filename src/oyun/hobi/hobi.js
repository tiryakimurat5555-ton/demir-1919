// Koloni Arşivi (dört set) ve sesli hobiler (belgeler/v5 Paket 3B).
//   Hobi 1 jeotermal gölde avlanma: hayvan/harita.js gol_iskelesi + saha/balik.js (jeotermal_gol tablosu)
//   Hobi 2 derinleşen maden ocağı: saha/ (4.3)
//   Hobi 3 aşçılık ritmi: aşhanede "Ritimle pişir" → OPERASYONLAR.hb_asci (boşluk ritmi); hatasız: altın kalite
//   Hobi 4 çan atölyesi: altı yıldız notasıyla sekiz vuruşluk beste (aşağıda), kamarada ve festivalde çalınır
//   Hobi 5 kseno-hayvan bakımı: hayvan/hayvan.js
//   Hobi 6 taverna masa oyunu "Altı Yıldız Zarı": üç zar, üç tur, tekrar at ya da dur (aşağıda)
//
// d.arsiv = { bagis [parça], tamam [set], sonMuzik }; d.hobi = { asci {tarif, bina}, besteler [{ad, notalar}], taslak [],
//   juliangun, zar {tur, atis, puan, rakip, bahis, kim}, zarGun }
import * as Z from '../zaman';
import * as ZN from '../tonoflenya/zanaat';
import * as SB from '../tonoflenya/subay';
import * as YR from '../yerlesim/yerlesim';
import * as IM from '../imalat/tezgah';
import { OPERASYONLAR } from '../veri/uzayGorevleri';
import { FENOMENLER } from '../veri/gozlem';
import { NOBETLER } from '../zaman';

const varlik = (d, k) => YR.varlik(d, k);
const ekle = (d, k, n) => YR.varlikEkle(d, k, n);
const adi = (k) => YR.varlikAdi(k);

// --- Koloni Arşivi (Paket 3B bölüm 3) ---
const fenomenSayisi = (d) => (d.kodeks || []).filter((k) => FENOMENLER[k.id]).length;
const P = (id, ad, ek) => ({ id, ad, ...ek });
export const SETLER = [
  {
    id: 'fosil', ad: 'Fosil ve Kemik Koleksiyonu', odulMetni: 'Araç hangarı ve tersanelerde zırh geliştirme maliyetleri kalıcı olarak yüzde on beş düştü; müze odasına tarihçe anonsu eklendi.',
    parcalar: [
      P('fosil_kabuk', 'Fosil kseno-kabuk', { harca: 'fosil', ipucu: 'Madenin derin katlarında ve batık kıyıda.' }),
      P('miasma', 'Miasma kalsiyum bileşiği', { harca: 'kalsiyum_ksenon', ipucu: 'Miasma-9\'un fosillerinden.' }),
      P('kovan', 'Büyük kovan kabuğu', { kosul: (d) => (d.tamamlananOp || []).includes('g13') || !!d.bayrak.gz_p04, ipucu: 'Kithron kovanında ya da Mycelia\'da bulunur.' }),
      P('vanguard', 'Vanguard plakası', { kosul: (d) => (d.gorulenMekanlar || []).includes('vanguard'), ipucu: 'Vanguard-01 enkazından.' }),
    ],
  },
  {
    id: 'kristal', ad: 'Kristal ve Mineral Koleksiyonu', odulMetni: 'Dökümhane ve atölye üretimi kalıcı olarak yüzde yirmi hızlandı; Kaptan Orin artık nadir kristal de getiriyor.',
    parcalar: [
      P('silikat', 'Silikat kristali', { harca: 'kristal' }),
      P('piezo', 'Piezo saf kristal', { harca: 'piezo' }),
      P('mor', 'Mor harmonik kristal', { harca: 'mor_kristal', ipucu: 'Lirael\'in amfitiyatrosundan.' }),
      P('elmas', 'Elmas çekirdeği', { harca: 'elmas_kirintisi', ipucu: 'Madenin çekirdek damarlarından.' }),
      P('aether', 'Saf aether', { harca: 'saf_aether' }),
    ],
  },
  {
    id: 'kayit', ad: 'Kadim Kayıt ve Tarihçe Seti', odulMetni: 'YGK ve Tonoflenya köprüsünde mekik bedeli kalıcı olarak yarıya indi; Öğretmen Defne bütün koloniye ders verdi, moral on arttı.',
    parcalar: [
      P('necron', 'Necron mührü', { kosul: (d) => !!d.bayrak.gz_p09, ipucu: 'Necron-Sıfır\'ın gömülü arşivinden.' }),
      P('disk', 'Vanguard veri diski', { kosul: (d) => !!d.bayrak.vanguardGunluk, ipucu: 'Vanguard-01 enkazındaki ses günlükleri.' }),
      P('siren', 'Siren-0 kaydı', { kosul: (d) => !!d.bayrak.gz_p03 || !!d.bayrak.yk_nerissa_3, ipucu: 'Thalassa\'nın derinliklerinden ya da Dr. Nerissa\'dan.' }),
      P('kronik', 'Tonoflenya kronik parçası', { kosul: (d) => !!(d.kronik && Object.keys(d.kronik).length), ipucu: 'Tonoflenya kroniklerinden bir bölüm.' }),
    ],
  },
  {
    id: 'ses', ad: 'Kozmik Fenomen Ses İmzaları', odulMetni: 'Kaptanın Kamarası\'nda Kozmik Müzik Kutusu açıldı: fenomenlerin seslerini çalar; dinleyince stres tamamen silinir.',
    parcalar: [1, 2, 3, 4].map((i) => P('fenomen_' + i, i + '. fenomen ses kaydı', { kosul: (d) => fenomenSayisi(d) >= i, ipucu: 'Uzayda kaydedilen yol üstü fenomenleri.' })),
  },
];
export function arsiv(d) {
  if (!d.arsiv) d.arsiv = { bagis: [], tamam: [] };
  return d.arsiv;
}
export function parcaHazir(d, p) {
  if (p.harca) return varlik(d, p.harca) > 0;
  return !!p.kosul(d);
}
export function bagisla(d, setId, pid) {
  const a = arsiv(d);
  const s = SETLER.find((x) => x.id === setId);
  const p = s.parcalar.find((x) => x.id === pid);
  if (a.bagis.includes(setId + ':' + pid)) return { metin: p.ad + ' zaten vitrinde.' };
  if (!parcaHazir(d, p)) return { metin: p.ad + ' elinde yok. ' + (p.ipucu || ''), ses: 'red' };
  if (p.harca) ekle(d, p.harca, -1);
  a.bagis.push(setId + ':' + pid);
  let m = p.ad + ' vitrine kondu; cam ince bir tınıyla titreşiyor.';
  if (s.parcalar.every((x) => a.bagis.includes(setId + ':' + x.id)) && !a.tamam.includes(setId)) {
    a.tamam.push(setId);
    d.bayrak['arsiv_' + setId] = true;
    if (setId === 'kayit') d.koloni.moral = Math.min(100, d.koloni.moral + 10);
    m += ' ' + s.ad + ' tamamlandı! ' + s.odulMetni;
    if (a.tamam.length === SETLER.length) {
      d.bayrak.arsiv_hepsi = true;
      d.itibar = Math.round((d.itibar || 0) * 1.15);
      m += ' Dört set tamam: koloninin evren itibarı yüzde on beş arttı, pazarlarda yüzde on beş ek indirim.';
    }
  }
  return { metin: m, ses: 'kristal' };
}
export function arsivMenu(d) {
  const a = arsiv(d);
  return {
    baslik: 'Koloni Arşivi',
    giris: a.tamam.length + ' / 4 set tamam. Fazla örnekleri vitrinlere bağışla; her set kalıcı bir koloni ödülü açar.',
    ogeler: SETLER.map((s) => {
      const n = s.parcalar.filter((p) => a.bagis.includes(s.id + ':' + p.id)).length;
      return { id: 's_' + s.id, etiket: s.ad + ', ' + n + ' / ' + s.parcalar.length + (a.tamam.includes(s.id) ? ', tamam' : ''), alt: (x) => setMenu(x, s.id) };
    }),
  };
}
function setMenu(d, setId) {
  const a = arsiv(d);
  const s = SETLER.find((x) => x.id === setId);
  return {
    baslik: s.ad,
    giris: 'Ödül: ' + s.odulMetni,
    ogeler: s.parcalar.map((p) => {
      const v = a.bagis.includes(setId + ':' + p.id);
      return { id: 'p_' + p.id, etiket: p.ad + (v ? ', vitrinde' : parcaHazir(d, p) ? ', bağışlanabilir' : ', eksik'), ipucu: p.ipucu, yap: (x) => bagisla(x, setId, p.id) };
    }),
  };
}
// Kozmik müzik kutusu (set 4): fenomenlerin ses imzaları; günde bir stres sıfırlar
export function kozmikDinle(d) {
  const a = arsiv(d);
  if (!d.bayrak.arsiv_ses) return { metin: 'Kozmik müzik kutusu arşivin dördüncü setiyle açılır.' };
  const notalar = (d.kodeks || []).filter((k) => FENOMENLER[k.id] && k.frek).slice(0, 8).map((k) => k.frek);
  const g = Z.gun(d);
  if (a.sonMuzik === g) return { metin: 'Kozmik müzik kutusu fenomenlerin seslerini yeniden çalıyor.', notalar };
  a.sonMuzik = g;
  for (const u of d.murettebat || []) u.stres = 0;
  return { metin: 'Kozmik müzik kutusu açıldı: yol üstü fenomenlerinin ses imzaları kamaranı dolduruyor. Mürettebatın stresi tamamen silindi.', notalar };
}

// --- Hobi 3: aşçılık ritmi (Sorya) ---
const A = (tur, ad, giris, bitis, ek = {}) => ({ tur, ad, giris, bitis, ...ek });
OPERASYONLAR.hb_asci = {
  yuzey: true, final: 'hobi', tekrar: true, sahne: 'hb_asci_son',
  adimlar: [A('bosluk', 'Tava ritmi', 'Tavada cızırtı ve kaşık ritmi: tık, tık, tık. Ritimde boşluk kalan vuruşa, yani tavanın sustuğu ana tam zamanında dokun: baharatı at, ateşi ayarla. Üç kez.', 'Yemek tam kıvamında.', { n: 3 })],
  sonuc: (d) => [d.hobi && d.hobi.asciSon ? d.hobi.asciSon : ''],
  odulFn: (d) => {
    const h = hobi(d);
    const x = h.asci;
    h.asci = null;
    if (!x) return {};
    const hata = (d.op && d.op.s && d.op.s.hata) || 0;
    const r = IM.uret(d, x.tarif, 1, x.bina);
    let m = r.metin;
    if (!/üretildi/.test(m)) {
      h.asciSon = m;
      return {};
    }
    const t = IM.TARIFLER[x.tarif];
    const cik = Object.keys(t.cikti)[0];
    if (hata <= 2) {
      ekle(d, cik, 1);
      m += ' Sorya: "Ritmi tuttun Kaptan!" Bir porsiyon fazla çıktı.';
    }
    if (hata === 0) {
      d.yer.altinHediye = (d.yer.altinHediye || 0) + 1;
      m += ' Altın kalite: bu yemeği hediye edersen sevinci iki kat olur.';
    }
    h.asciSon = m;
    return {};
  },
};
export const SAHNELER = {
  hb_asci_son: {
    baslik: 'Aşhane',
    efekt: ['el_tz_ocak'],
    metin: (d) => [(d.hobi && d.hobi.asciSon) || 'Yemek hazır.'],
    secenekler: () => [{ etiket: 'Aşhaneye dön', sonra: null }],
  },
};
export function hobi(d) {
  if (!d.hobi) d.hobi = { asci: null, besteler: [], taslak: [] };
  if (!d.hobi.besteler) d.hobi.besteler = [];
  if (!d.hobi.taslak) d.hobi.taslak = [];
  return d.hobi;
}
export function asciBaslat(d, tarif, bina) {
  const engel = IM.kisiEngeli(d, tarif);
  if (engel) return { metin: engel, ses: 'red' };
  const { eksik } = IM.girdiCoz(d, tarif, 1);
  if (eksik.length) return { metin: 'Eksik: ' + eksik.join(', ') + '.', ses: 'red' };
  if (!YR.katildiMi(d, 'sorya')) return { metin: 'Aşçılık ritmi Sorya\'yla çalışılır; o henüz kolonide değil.', ses: 'red' };
  hobi(d).asci = { tarif, bina };
  d.opBekle = 'hb_asci';
  return { metin: 'Sorya tavayı ateşe koyuyor: "Dinle Kaptan, tavanın sustuğu yerde dokun."', kapat: true };
}
IM.TARIF_EKLERI.push((d, id, bina) => (bina === 'ashane' ? [{ id: 'ritim', etiket: 'Ritimle pişir (Sorya ile aşçılık oyunu)', ipucu: 'Hatasız ritim altın kalite ve bir porsiyon fazla verir.', yap: (x) => asciBaslat(x, id, bina) }] : []));

// --- Hobi 4: çan atölyesi bestesi (Julian) ---
// Altı yıldız notası, pesten tize; sekiz vuruşluk beste. Kamarada ve festivalde çalınır.
export const YILDIZ_NOTALARI = NOBETLER.map((n) => ({ ad: n.yildiz, frek: n.akor[0] })).sort((a, b) => a.frek - b.frek);
export const BESTE_UZUNLUK = 8;
export function besteMenu(d) {
  const h = hobi(d);
  const t = h.taslak;
  return {
    baslik: 'Çan atölyesi: beste',
    giris: 'Sekiz vuruşluk bir melodi. Bir vuruşa gir, altı yıldız notasından birini seç; pesten tize: ' + YILDIZ_NOTALARI.map((n) => n.ad).join(', ') + '. Kayıtlı ' + h.besteler.length + ' beste.',
    ogeler: [
      ...Array.from({ length: BESTE_UZUNLUK }, (_, i) => ({
        id: 'v' + i,
        etiket: i + 1 + '. vuruş: ' + (t[i] != null ? YILDIZ_NOTALARI[t[i]].ad : 'sessiz'),
        alt: (x) => notaMenu(x, i),
      })),
      { id: 'dinle', etiket: 'Taslağı dinle', yap: (x) => ({ metin: '', notalar: hobi(x).taslak.filter((n) => n != null).map((n) => YILDIZ_NOTALARI[n].frek) }) },
      { id: 'kaydet', etiket: 'Besteyi kaydet', yap: (x) => besteKaydet(x) },
      { id: 'temizle', etiket: 'Taslağı temizle', yap: (x) => ((hobi(x).taslak = []), { metin: 'Taslak temizlendi.' }) },
      ...h.besteler.map((b, i) => ({ id: 'b' + i, etiket: 'Çal: ' + b.ad, yap: () => ({ metin: b.ad + '.', notalar: b.notalar }) })),
    ],
  };
}
function notaMenu(d, i) {
  return {
    baslik: i + 1 + '. vuruş',
    giris: 'Bir nota seç; seçince çalar.',
    ogeler: [
      ...YILDIZ_NOTALARI.map((n, j) => ({ id: 'n' + j, etiket: n.ad, geri: true, yap: (x) => ((hobi(x).taslak[i] = j), { metin: n.ad + '.', notalar: [n.frek] }) })),
      { id: 'sus', etiket: 'Sessiz', geri: true, yap: (x) => ((hobi(x).taslak[i] = null), { metin: 'Sessiz.' }) },
    ],
  };
}
export function besteKaydet(d) {
  const h = hobi(d);
  const notalar = h.taslak.filter((n) => n != null).map((n) => YILDIZ_NOTALARI[n].frek);
  if (notalar.length < 3) return { metin: 'En az üç nota gerekir.', ses: 'red' };
  const imza = notalar.join(',');
  if (h.besteler.some((b) => b.notalar.join(',') === imza)) return { metin: 'Bu beste zaten kayıtlı.' };
  if (h.besteler.length >= 6) h.besteler.shift();
  const ad = 'Beste ' + (h.toplamBeste = (h.toplamBeste || 0) + 1);
  h.besteler.push({ ad, notalar });
  let m = ad + ' kaydedildi; kamarada ve festivalde çalabilirsin.';
  if (YR.katildiMi(d, 'julian')) {
    const g = Z.gun(d);
    if (h.julianGun !== g) {
      h.julianGun = g;
      const bulbul = !!(d.hayvan && d.hayvan.barinak.some((x) => x.tur === 'yanki_bulbulu'));
      const r = YR.puanEkle(d, 'julian', 15 * (bulbul ? 2 : 1), true);
      d.koloni.moral = Math.min(100, d.koloni.moral + 2);
      m += ' Julian dinledi: "Bunu festivalde çalarız!" Yakınlık ' + 15 * (bulbul ? 2 : 1) + (bulbul ? ' (yankı bülbülü ilham verdi)' : '') + ', moral iki.' + (r.metin ? ' ' + r.metin : '');
    }
  }
  return { metin: m, notalar, ses: 'el_tz_can' };
}
// Festival alanında beste çalmak (günde bir moral)
export function festivaldeCal(d, i) {
  const h = hobi(d);
  const b = h.besteler[i];
  if (!b) return { metin: '' };
  const g = Z.gun(d);
  if (!(d.festival && d.festival.aktif)) return { metin: b.ad + '.', notalar: b.notalar };
  if (h.festivalGun === g) return { metin: 'Meydan yine dinliyor.', notalar: b.notalar };
  h.festivalGun = g;
  d.koloni.moral = Math.min(100, d.koloni.moral + 4);
  return { metin: 'Meydanda ' + b.ad + ' çalınıyor; koloni sessizce dinledi, sonra alkış. Moral dört arttı.', notalar: b.notalar };
}

// --- Hobi 6: Altı Yıldız Zarı (taverna; Marcus ya da Mateo) ---
// Üç zar (1-6). Her turda zarlar atılır; "Tekrar at" en düşük zarı yeniden atar, "Dur" puanı (toplam; üçü aynıysa ×2) alır.
// Üç tur sonunda rakibin puanıyla karşılaştırılır. Bahis 50-200 GK; kazanırsan bahis kadar kazanırsın.
export const BAHISLER = [50, 100, 200];
function zarAt(d) {
  const h = hobi(d);
  h.zarSayac = (h.zarSayac || 0) + 1;
  const x = Math.sin(((d.tohum || 7) % 99971) * 0.037 + h.zarSayac * 57.13) * 43758.5453;
  return 1 + Math.floor((x - Math.floor(x)) * 6);
}
const puan = (z) => z.reduce((a, b) => a + b, 0) * (z[0] === z[1] && z[1] === z[2] ? 2 : 1);
const zarMetni = (z) => z.join(', ') + (z[0] === z[1] && z[1] === z[2] ? ', üçü aynı: iki kat' : '');
export function zarBaslat(d, bahis) {
  const h = hobi(d);
  ZN.hazirla(d);
  if (d.para.gk < bahis) return { metin: 'Bahis için ' + bahis + ' kredi gerekir; sende ' + Math.round(d.para.gk) + '.', ses: 'red' };
  const g = Z.gun(d);
  if (h.zarGun === g && h.zarOyun >= 3) return { metin: 'Marcus: "Bugünlük yeter Kaptan, yarın rövanş."' };
  if (h.zarGun !== g) {
    h.zarGun = g;
    h.zarOyun = 0;
  }
  const kim = YR.katildiMi(d, 'marcus') ? 'marcus' : YR.katildiMi(d, 'mateo') ? 'mateo' : null;
  h.zar = { tur: 1, toplam: 0, rakip: 0, bahis, kim, z: [zarAt(d), zarAt(d), zarAt(d)], tekrar: 0 };
  return { metin: 'Zarlar atıldı. Birinci tur: ' + zarMetni(h.zar.z) + '.', ses: 'el_zar' };
}
export function zarTekrar(d) {
  const z = hobi(d).zar;
  if (!z) return { metin: '' };
  if (z.tekrar >= 2) return { metin: 'Bu turda iki kez yeniden attın; dur ve puanı al.', ses: 'red' };
  const i = z.z.indexOf(Math.min(...z.z));
  z.z[i] = zarAt(d);
  z.tekrar += 1;
  return { metin: 'En düşük zarı yeniden attın: ' + zarMetni(z.z) + '.', ses: 'el_zar' };
}
export function zarDur(d) {
  const h = hobi(d);
  const z = h.zar;
  if (!z) return { metin: '' };
  z.toplam += puan(z.z);
  const r = [zarAt(d), zarAt(d), zarAt(d)];
  z.rakip += puan(r);
  const rakipAd = z.kim ? YR.kisaAdi(z.kim) : 'Rakip';
  let m = 'Puanın ' + puan(z.z) + '. ' + rakipAd + ' attı: ' + zarMetni(r) + '. Toplam: sen ' + z.toplam + ', ' + rakipAd + ' ' + z.rakip + '.';
  if (z.tur >= 3) {
    h.zar = null;
    h.zarOyun = (h.zarOyun || 0) + 1;
    ZN.hazirla(d);
    if (z.toplam > z.rakip) {
      d.para.gk += z.bahis;
      m += ' Kazandın: ' + z.bahis + ' kredi.';
    } else if (z.toplam < z.rakip) {
      d.para.gk -= z.bahis;
      m += ' Kaybettin: ' + z.bahis + ' kredi.';
    } else m += ' Berabere; bahis masada kaldı.';
    if (z.kim) {
      const g = Z.gun(d);
      if (h.zarDostGun !== g) {
        h.zarDostGun = g;
        const rr = YR.puanEkle(d, z.kim, 10, true);
        m += ' ' + rakipAd + ' ile dostluk on arttı.' + (rr.metin ? ' ' + rr.metin : '');
      }
    }
    return { metin: m, ses: z.toplam > z.rakip ? 'el_kasa' : 'el_zar', bitti: true };
  }
  z.tur += 1;
  z.tekrar = 0;
  z.z = [zarAt(d), zarAt(d), zarAt(d)];
  return { metin: m + ' ' + z.tur + '. tur zarların: ' + zarMetni(z.z) + '.', ses: 'el_zar' };
}
export function zarMenu(d) {
  const h = hobi(d);
  const z = h.zar;
  if (!z) {
    return {
      baslik: 'Altı Yıldız Zarı',
      giris: 'Üç zar, üç tur. Her turda en düşük zarı en çok iki kez yeniden atabilir ya da durup puanı alabilirsin; üçü aynıysa iki kat. Günde üç oyun. Kasada ' + Math.round((d.para && d.para.gk) || 0) + ' kredi.',
      ogeler: BAHISLER.map((b) => ({ id: 'b' + b, etiket: b + ' kredi bahisle oyna', yap: (x) => zarBaslat(x, b) })),
    };
  }
  return {
    baslik: 'Altı Yıldız Zarı, ' + z.tur + '. tur',
    giris: 'Zarların: ' + zarMetni(z.z) + '. Toplam: sen ' + z.toplam + ', rakip ' + z.rakip + '.',
    ogeler: [
      { id: 'tekrar', etiket: 'Tekrar at', yap: (x) => zarTekrar(x) },
      { id: 'dur', etiket: 'Dur ve puanı al', yap: (x) => zarDur(x) },
    ],
  };
}

// --- Tezgâh ve nokta kancaları ---
IM.TEZGAH_EKLERI.push((d, bina) => {
  const l = [];
  if (bina === 'gozlem') l.push({ id: 'beste', etiket: 'Beste yap (Julian ile çan atölyesi)', alt: (x) => besteMenu(x) });
  if (bina === 'taverna') l.push({ id: 'zar', etiket: 'Altı Yıldız Zarı (masa oyunu)', alt: (x) => zarMenu(x) });
  return l;
});
export function ekEylemler(d, id) {
  const l = [];
  if (id === 'kamara_raf' && d.bayrak.arsiv_ses) l.push({ id: 'hb_kozmik', etiket: 'Kozmik müzik kutusunu dinle' });
  if ((id === 'kamara_yatak' || id === 'festival_alani') && hobi(d).besteler.length) l.push({ id: 'hb_besteler', etiket: 'Bestelerini çal' });
  return l;
}
export const ekEylemMi = (e) => e === 'hb_kozmik' || e === 'hb_besteler' || e === 'hb_arsiv';
export const noktaMi = (id) => id === 'arsiv_vitrinleri';
export function noktaEylemleri() {
  return [{ id: 'hb_arsiv', etiket: 'Vitrinler ve bağış' }, { id: 'incele', etiket: 'İncele' }];
}
export function eylemUygula(d, id, e) {
  if (e === 'hb_arsiv') return { agac: (x) => arsivMenu(x) };
  if (e === 'hb_kozmik') return kozmikDinle(d);
  if (e === 'hb_besteler')
    return {
      agac: (x) => ({
        baslik: 'Bestelerin',
        giris: id === 'festival_alani' ? 'Meydanda çal; festivalde koloni dinler.' : 'Kamarada kendin için çal.',
        ogeler: hobi(x).besteler.map((b, i) => ({ id: 'b' + i, etiket: b.ad, yap: (z) => (id === 'festival_alani' ? festivaldeCal(z, i) : { metin: b.ad + '.', notalar: b.notalar }) })),
      }),
    };
  return { metin: 'Dört cam vitrin: fosil ve kemik, kristal ve mineral, kadim kayıt, kozmik ses imzaları.' };
}
// Arşiv kristal seti: Orin nadir kristal getirir
import * as PZ from '../yerlesim/pazar';
PZ.ORIN_STOK_EKLERI.push((d) => (d.bayrak && d.bayrak.arsiv_kristal ? [{ id: 'saf_kristal', ad: '5 saf kristal (arşivin dostu için)', parca: 'saf_kristal', n: 5, gk: 120, adet: 2 }] : []));
void SB;
