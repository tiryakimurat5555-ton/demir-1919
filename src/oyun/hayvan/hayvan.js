// Xeno-fauna: genom birleştirme, kuluçka, barınak, bakım, üretim hatları ve özel roller (belgeler/v5 Paket 14, 15;
// Paket 3B hobi 5 "Kseno-Hayvan Bakımı").
//
// d.hayvan = { kesif [tür], barinak [{ no, tur, durum 'mutlu'|'ac'|'hasta' }], sayac, moduller [], kademe -1..2,
//   kulucka { genler, bitis } | null, bekleyen [tür] (barınakta yer yokken), yoldas (köpeğin no'su), kedi { yer, gun },
//   sonGun, sonNobet, donum [n], festival, zar }
// Kuluçka (Paket 14 2.2): iki genom kapsülü + saf su ya da aether, bir oyun günü. Sonuç zarla: yüzde 60 yaygın, 30 nadir,
// 10 mutasyon (mutasyonun dörtte biri efsanevi). Keşfedilmemiş türler önce gelir. Dondurulmuş yumurta: genom gerekmez,
// rastgele yaygın bir tür.
// Gün başı: mutlu ve modülü kurulu hayvanlar ürün verir; eşeleyenler bulduklarını bırakır; sonra her hayvan yeniden
// acıkır ya da hastalanabilir. Bakım: aç olana yem, hastaya ilaç; doğru bakım mutlu eder.
import * as Z from '../zaman';
import * as ZN from '../tonoflenya/zanaat';
import * as SB from '../tonoflenya/subay';
import * as YR from '../yerlesim/yerlesim';
import * as PZ from '../yerlesim/pazar';
import { GENLER, GEN_SIRASI, HAYVANLAR, HAYVAN_SIRASI, MODULLER, BARINAK, KULUCKA_SUVU, YEMLER, ILACLAR, DONUM, NADIR_ADI } from './veri';
import { GUNLUK } from '../imalat/esya';

// --- Eşyalar: genom kapsülleri, dondurulmuş yumurta, hayvan ürünleri (Paket 15 bölüm 3) ---
const E = (ad, sekme, gk, tarif, ek = {}) => ({ kat: 6, gunluk: true, ad, sekme, gk, tarif, ...ek });
export const HAYVAN_ESYALARI = {
  donmus_yumurta: E('Dondurulmuş yumurta', 4, 90, 'Dış diyarlardan dondurulmuş bir yumurta; kuluçkada rastgele yaygın bir tür çıkar.'),
  uyku_tuyu: E('Yumuşak uyku tüyü', 2, 12, 'Kaz ve ördek tüyü; kamaranın yatağına konunca uyandığında moral iki fazla.', { kullan: 'tuy' }),
  kristal_tuy: E('Kristal tüy', 3, 14, 'Işığı kıran ince tüy; çan atölyesi ve hediye.', { rezonans: true }),
  isi_yagi: E('Doğal ısı yağı', 3, 6, 'Termal kertenkelelerden; fener yağının yerine geçer.', { kullan: 'fener' }),
  malken_ipegi: E('Malken ipeği', 2, 20, 'Vaha ipek böceğinin ince lifi.'),
  isildayan_yun: E('Işıldayan yün', 2, 24, 'Karanlıkta hafifçe parlayan yün.'),
  rezonans_kabugu: E('Rezonans kabuk parçası', 3, 16, 'Kaplumbağa kabuğundan dökülen, tınlayan parça.', { rezonans: true }),
  sifali_sut: E('Şifalı süt', 1, 10, 'Malken şifa keçisinden; stresi ve hafif yaraları iyileştirir.', { yiyecek: true, kullan: 'ic' }),
  piezo_yumurta: E('Piezo yumurta', 4, 60, 'Altın sarısı kristal kabuklu yumurta; koleksiyon ve yüksek değerli sipariş.', { rezonans: true }),
  aether_bali: E('Aether balı', 1, 30, 'Aether-arısının şifalı balı; şifa labında şuruba dönüşür.', { yiyecek: true, rezonans: true }),
  peynir: E('Xeno-peynir', 1, 12, 'Xeno-sütten mayalanmış.', { yiyecek: true, kullan: 'ye' }),
  sutlu_cay: E('Sütlü çay', 1, 9, 'Demli çay ve xeno-süt.', { yiyecek: true, kullan: 'ic' }),
  kahvalti: E('Ballı kahvaltı tabağı', 1, 14, 'Bal, ekmek ve peynir; yüksek moralli kahvaltı.', { yiyecek: true, kullan: 'ye' }),
  kseno_guvec: E('Kseno-et güveci', 1, 20, 'Jeotermal gölün kseno-etiyle ağır pişen güveç; yüksek moral.', { yiyecek: true, kullan: 'ye' }),
  festival_kiyafeti: E('Parlak festival kıyafeti', 2, 80, 'Malken ipeği ve ışıldayan yünden; Orin için yüksek değerli takas kumaşı.'),
};
for (const k of GEN_SIRASI) HAYVAN_ESYALARI['gen_' + k] = E('Genom kapsülü: ' + GENLER[k].ad, 4, 150, 'Biyo-kubbedeki kuluçka makinesinde başka bir genle birleştirilir.');
for (const k of Object.keys(HAYVAN_ESYALARI)) {
  if (!ZN.ESYA[k]) ZN.ESYA[k] = HAYVAN_ESYALARI[k];
  if (!GUNLUK[k]) GUNLUK[k] = HAYVAN_ESYALARI[k];
}

// --- Durum ---
export function hazirla(d) {
  if (!d.hayvan) d.hayvan = { kesif: [], barinak: [], sayac: 0, moduller: [], kademe: -1, kulucka: null, bekleyen: [], yoldas: null, kedi: null, donum: [], zar: 0 };
  const h = d.hayvan;
  for (const k of ['kesif', 'barinak', 'moduller', 'bekleyen', 'donum']) if (!h[k]) h[k] = [];
  if (h.kademe == null) h.kademe = d.bayrak && d.bayrak.barinak ? 0 : -1;
  return h;
}
function zar(d) {
  const h = hazirla(d);
  h.zar = (h.zar || 0) + 1;
  const x = Math.sin(((d.tohum || 7) % 99989) * 0.031 + h.zar * 91.7) * 43758.5453;
  return x - Math.floor(x);
}
const varlik = (d, k) => YR.varlik(d, k);
const ekle = (d, k, n) => YR.varlikEkle(d, k, n);
const adi = (k) => YR.varlikAdi(k);
const eksik = (d, b) => Object.keys(b).filter((k) => varlik(d, k) < b[k]);
const bedelMetni = (b) => Object.keys(b).map((k) => b[k] + ' ' + adi(k)).join(', ');
export const kubbeVar = (d) => !!(d.koloni && d.koloni.binalar.includes('biyo_kubbe'));
export const kapasite = (d) => (hazirla(d).kademe >= 0 ? BARINAK[d.hayvan.kademe].kapasite : 0);
export const turler = (d) => hazirla(d).barinak.map((x) => x.tur);
const var_ = (d, tur) => turler(d).includes(tur);
const rolVar = (d, rol) => hazirla(d).barinak.some((x) => HAYVANLAR[x.tur].rol === rol);

// --- Barınak ve modüller ---
export function barinakKur(d) {
  const h = hazirla(d);
  if (h.kademe >= 0) return { metin: 'Barınak zaten kurulu.' };
  if (!kubbeVar(d)) return { metin: 'Önce biyo-kubbe kurulmalı; hayvanlar orada kuluçkadan çıkar.', ses: 'red' };
  const b = BARINAK[0].bedel;
  const e = eksik(d, b);
  if (e.length) return { metin: 'Barınak için ' + bedelMetni(b) + ' gerekir. Eksik: ' + e.map((k) => b[k] - varlik(d, k) + ' ' + adi(k)).join(', ') + '.', ses: 'red' };
  for (const k of Object.keys(b)) ekle(d, k, -b[k]);
  h.kademe = 0;
  d.bayrak.barinak = true;
  bekleyenleriYerlestir(d);
  return { metin: 'Hayvan Barınağı kuruldu: sera binasının yanında, vadinin batısında. Altı hayvanlık yer var. Üretim için her türün bakım modülü gerekir.', ses: 'kur' };
}
export function barinakYukselt(d) {
  const h = hazirla(d);
  if (h.kademe < 0) return barinakKur(d);
  if (h.kademe >= BARINAK.length - 1) return { metin: 'Barınak en geniş hâlinde: yirmi hayvan.' };
  const b = BARINAK[h.kademe + 1].bedel;
  const bedava = d.bayrak.hayvanBarinakBedava;
  if (!bedava) {
    const e = eksik(d, b);
    if (e.length) return { metin: 'Genişletme için ' + bedelMetni(b) + ' gerekir. Eksik: ' + e.map((k) => b[k] - varlik(d, k) + ' ' + adi(k)).join(', ') + '.', ses: 'red' };
    for (const k of Object.keys(b)) ekle(d, k, -b[k]);
  } else d.bayrak.hayvanBarinakBedava = false;
  h.kademe += 1;
  bekleyenleriYerlestir(d);
  return { metin: 'Barınak genişletildi: ' + BARINAK[h.kademe].kapasite + ' hayvanlık yer.', ses: 'kur' };
}
export function modulKur(d, m) {
  const h = hazirla(d);
  if (h.kademe < 0) return { metin: 'Önce barınak kurulmalı.', ses: 'red' };
  if (h.moduller.includes(m)) return { metin: MODULLER[m].ad + ' zaten kurulu.' };
  if (!modulPlaniAcik(d, m)) return { metin: 'Bu modülün planı, ona ihtiyaç duyan ilk tür keşfedilince açılır.', ses: 'red' };
  const b = MODULLER[m].bedel;
  const e = eksik(d, b);
  if (e.length) return { metin: MODULLER[m].ad + ' için ' + bedelMetni(b) + ' gerekir. Eksik: ' + e.map((k) => b[k] - varlik(d, k) + ' ' + adi(k)).join(', ') + '.', ses: 'red' };
  for (const k of Object.keys(b)) ekle(d, k, -b[k]);
  h.moduller.push(m);
  return { metin: MODULLER[m].ad + ' kuruldu. Bu bölmedeki hayvanlar artık her gün ürün verir.', ses: 'kur' };
}
export const modulPlaniAcik = (d, m) => hazirla(d).kesif.some((t) => HAYVANLAR[t].modul === m);

// --- Kuluçka ---
export const KULUCKA_SN = () => Z.GUN_SN;
export function kuluckaEngeli(d) {
  const h = hazirla(d);
  if (!kubbeVar(d)) return 'Genom birleştirme biyo-kubbede yapılır; önce biyo-kubbe kurulmalı.';
  if (h.kulucka) return 'Kuluçka makinesi dolu; ' + kalanMetni(d) + ' çatlayacak.';
  return null;
}
function kalanMetni(d) {
  const k = d.hayvan.kulucka;
  const kalan = Math.max(0, k.bitis - d.zaman.sn);
  const saat = Math.ceil(kalan / Z.SAAT_SN);
  return saat <= 1 ? 'birazdan' : saat + ' saat içinde';
}
function suBul(d) {
  return KULUCKA_SUVU.find((k) => varlik(d, k) > 0) || null;
}
export function kuluckaBaslat(d, g1, g2) {
  const h = hazirla(d);
  const engel = kuluckaEngeli(d);
  if (engel) return { metin: engel, ses: 'red' };
  const gerek = {};
  gerek['gen_' + g1] = (gerek['gen_' + g1] || 0) + 1;
  gerek['gen_' + g2] = (gerek['gen_' + g2] || 0) + 1;
  const e = eksik(d, gerek);
  if (e.length) return { metin: 'Eksik genom kapsülü: ' + e.map(adi).join(', ') + '. Kapsüller Kaptan Orin\'in gemisinde çıkar.', ses: 'red' };
  const su = suBul(d);
  if (!su) return { metin: 'Kuluçka için bir saf su ya da küçük aether gerekir. Kamp ateşinde su kaynatabilirsin.', ses: 'red' };
  for (const k of Object.keys(gerek)) ekle(d, k, -gerek[k]);
  ekle(d, su, -1);
  h.kulucka = { genler: [g1, g2], bitis: d.zaman.sn + kuluckaSuresi(d) };
  return { metin: 'Dr. Lyris ve Dr. Nerissa iki geni birleştirip kuluçkaya yerleştirdi: ' + GENLER[g1].ad + ' ve ' + GENLER[g2].ad + '. Bir gün sonra çatlama sesi gelecek. Ne çıkacağını kimse bilemez.', ses: 'el_tz_lab' };
}
export function yumurtaKulucka(d) {
  const h = hazirla(d);
  const engel = kuluckaEngeli(d);
  if (engel) return { metin: engel, ses: 'red' };
  if (varlik(d, 'donmus_yumurta') < 1) return { metin: 'Dondurulmuş yumurta yok; Kaptan Orin\'den alınır.', ses: 'red' };
  ekle(d, 'donmus_yumurta', -1);
  h.kulucka = { genler: null, bitis: d.zaman.sn + kuluckaSuresi(d) };
  return { metin: 'Dondurulmuş yumurta kuluçka makinesine kondu; bir gün sonra çatlar.', ses: 'el_tz_lab' };
}
// Kaya Bıldırcını kuluçkayı yarım gün kısaltır (Paket 14: "hızlı kuluçka")
const kuluckaSuresi = (d) => Z.GUN_SN * (rolVar(d, 'hizli') ? 0.5 : 1);
const cerez = (d, l) => {
  if (!l.length) return null;
  const yeni = l.filter((t) => !d.hayvan.kesif.includes(t));
  const havuz = yeni.length && zar(d) < 0.75 ? yeni : l;
  return havuz[Math.floor(zar(d) * havuz.length)];
};
export function sonucSec(d, genler) {
  const h = hazirla(d);
  if (!genler) return cerez(d, HAYVAN_SIRASI.filter((t) => HAYVANLAR[t].nadir === 'yaygin'));
  const [a, b] = genler;
  const capraz = GENLER[a].koken !== GENLER[b].koken;
  const tek = (n) => HAYVAN_SIRASI.filter((t) => HAYVANLAR[t].nadir === n && HAYVANLAR[t].genler.length === 1 && genler.includes(HAYVANLAR[t].genler[0]));
  const ikili = HAYVAN_SIRASI.filter((t) => HAYVANLAR[t].nadir === 'mutasyon' && HAYVANLAR[t].genler.length === 2 && HAYVANLAR[t].genler.includes(a) && HAYVANLAR[t].genler.includes(b) && a !== b);
  const efsane = HAYVAN_SIRASI.filter((t) => {
    const x = HAYVANLAR[t];
    if (x.nadir !== 'efsanevi') return false;
    if (t === 'anka') return genler.includes('termal') && genler.includes('kristal') && h.kesif.includes('tavus');
    return capraz;
  });
  const r = zar(d);
  const sira = r < 0.6 ? ['yaygin', 'nadir'] : r < 0.9 ? ['nadir', 'yaygin'] : zar(d) < 0.25 ? ['efsanevi', 'mutasyon', 'nadir', 'yaygin'] : ['mutasyon', 'efsanevi', 'nadir', 'yaygin'];
  for (const s of sira) {
    const l = s === 'mutasyon' ? ikili : s === 'efsanevi' ? efsane : tek(s);
    const t = cerez(d, l);
    if (t) return t;
  }
  return 'vanguard_tavugu';
}
function catla(d) {
  const h = hazirla(d);
  const k = h.kulucka;
  h.kulucka = null;
  const tur = sonucSec(d, k.genler);
  const x = HAYVANLAR[tur];
  const yeni = !h.kesif.includes(tur);
  if (yeni) h.kesif.push(tur);
  const yer = yerlestir(d, tur);
  const yuzde = x.nadir === 'yaygin' ? 'yüzde altmış, yaygın tür' : x.nadir === 'nadir' ? 'yüzde otuz, nadir alt tür' : x.nadir === 'mutasyon' ? 'yüzde on, beklenmedik mutasyon' : 'yüzde on, efsanevi mutasyon';
  let m = 'Çatlama sesi! ' + (x.nadir === 'yaygin' ? '' : 'Tebrikler! ') + 'Kuluçkadan ' + x.ad + ' çıktı (' + yuzde + ').' + (yeni ? ' Yeni tür: ansiklopedide ' + h.kesif.length + ' / 50.' : '');
  if (x.modul && !h.moduller.includes(x.modul)) m += ' ' + x.ad + ' için üretimi başlatmak üzere barınak menüsünden ' + MODULLER[x.modul].ad + ' modülünü kurmalısın.';
  if (!yer) m += h.kademe < 0 ? ' Barınak yok; hayvan biyo-kubbede bekliyor. Barınağı kuluçka menüsünden kurabilirsin.' : ' Barınakta yer yok; hayvan biyo-kubbede bekliyor.';
  if (tur === 'anka') {
    d.koloni.moral = Math.min(100, d.koloni.moral + 10);
    m += ' Anka kanatlarını açınca bütün koloni dışarı çıktı; moral on arttı.';
  }
  m += donumDenetle(d);
  return m;
}
function yerlestir(d, tur) {
  const h = hazirla(d);
  if (h.kademe < 0 || h.barinak.length >= kapasite(d)) {
    h.bekleyen.push(tur);
    return false;
  }
  h.sayac = (h.sayac || 0) + 1;
  h.barinak.push({ no: h.sayac, tur, durum: 'mutlu' });
  bayraklar(d);
  return true;
}
function bekleyenleriYerlestir(d) {
  const h = hazirla(d);
  const l = h.bekleyen.slice();
  h.bekleyen = [];
  for (const t of l) yerlestir(d, t);
}
function donumDenetle(d) {
  const h = hazirla(d);
  let m = '';
  for (const x of DONUM) {
    if (h.kesif.length >= x.n && !h.donum.includes(x.n)) {
      h.donum.push(x.n);
      ZN.hazirla(d);
      d.para.gk += x.odul.gk || 0;
      if (x.odul.moral) d.koloni.moral = Math.min(100, d.koloni.moral + x.odul.moral);
      if (x.odul.barinak) d.bayrak.hayvanBarinakBedava = true;
      m += ' ' + x.ad + ': ' + x.metin;
    }
  }
  return m;
}
// Rol bayrakları: tarim.js (yonca, güve), komuta.js (alarm) okur
export function bayraklar(d) {
  d.bayrak.hayvan_yonca = var_(d, 'yonca_arisi');
  d.bayrak.hayvan_guve = var_(d, 'yildiz_guvesi');
  d.bayrak.hayvan_alarm = rolVar(d, 'alarm');
  const h = hazirla(d);
  if (h.yoldas && !h.barinak.some((x) => x.no === h.yoldas)) h.yoldas = null;
}

// --- Gün başı: üretim, eşeleme, durum ---
function gunBasi(d) {
  const h = hazirla(d);
  const top = {};
  const al = (k, n) => {
    if (n <= 0) return;
    let a = Math.floor(n);
    if (zar(d) < n - a) a += 1;
    if (a) top[k] = (top[k] || 0) + a;
  };
  const ayaz = Z.mevsimNo(d) === 3;
  for (const x of h.barinak) {
    const t = HAYVANLAR[x.tur];
    if (x.durum === 'mutlu' && t.modul && h.moduller.includes(t.modul)) {
      const c = ayaz && t.modul === 'agil' ? (t.ayaz || 0.5) : 1;
      for (const k of Object.keys(t.urun)) al(k, t.urun[k] * c);
    }
    if (t.esele && x.durum !== 'hasta' && (!t.ayazEsele || ayaz)) for (const [k, p] of t.esele) al(k, p);
  }
  for (const k of Object.keys(top)) ekle(d, k, top[k]);
  // Moral rolleri
  const kugu = h.barinak.filter((x) => HAYVANLAR[x.tur].rol === 'moral').length;
  if (kugu) d.koloni.moral = Math.min(100, d.koloni.moral + kugu);
  if (var_(d, 'anka')) d.koloni.moral = Math.min(100, d.koloni.moral + 1);
  // Yeni gün: acıkma ve hastalık
  for (const x of h.barinak) {
    const r = zar(d);
    x.durum = r < 0.35 ? 'ac' : r < 0.45 && !var_(d, 'anka') ? 'hasta' : 'mutlu';
  }
  if (h.kedi) h.kedi.gun = null;
  const l = Object.keys(top);
  return l.length ? 'Barınaktan bugünün ürünleri depoya: ' + l.map((k) => top[k] + ' ' + adi(k)).join(', ') + '.' : '';
}

// --- Bakım (Paket 3B hobi 5): tıslama aç, mırıltı mutlu, hırıltı hasta ---
export const DURUM_SESI = { ac: 'el_hayvan_ac', mutlu: 'el_hayvan_mutlu', hasta: 'el_hayvan_hasta' };
export function bakim(d, no, eylem) {
  const h = hazirla(d);
  const x = h.barinak.find((y) => y.no === no);
  if (!x) return { metin: 'Bu hayvan barınakta değil.' };
  const t = HAYVANLAR[x.tur];
  if (eylem === 'yem') {
    if (x.durum !== 'ac') return { metin: t.ad + ' aç değil; yemi kokladı ve döndü.', ses: 'red' };
    const k = YEMLER.find((y) => varlik(d, y) > 0);
    if (!k) return { metin: 'Yem yok: arpa, buğday, lif, tatlı kök ya da soya gerekir.', ses: 'red' };
    ekle(d, k, -1);
    x.durum = 'mutlu';
    return { metin: t.ad + ' yemi (' + adi(k) + ') iştahla yedi; şimdi mırıldanıyor.', ses: 'el_hayvan_mutlu' };
  }
  if (eylem === 'ilac') {
    if (x.durum !== 'hasta') return { metin: t.ad + ' hasta değil; ilaca gerek yok.', ses: 'red' };
    const k = ILACLAR.find((y) => varlik(d, y) > 0);
    if (!k) return { metin: 'İlaç yok: şifalı mantar, antikor iksiri ya da şifalı süt gerekir.', ses: 'red' };
    ekle(d, k, -1);
    x.durum = 'mutlu';
    return { metin: t.ad + ' ilacı (' + adi(k) + ') aldı; hırıltısı geçti.', ses: 'el_hayvan_mutlu' };
  }
  // sev
  if (x.durum !== 'mutlu') return { metin: t.ad + ' huzursuz: ' + (x.durum === 'ac' ? 'tıslıyor, acıkmış.' : 'hırıldıyor, hasta.'), ses: DURUM_SESI[x.durum] };
  if (t.rol === 'kedi') return kediSev(d);
  return { metin: t.ad + ' başını eline sürtüyor.', ses: 'el_hayvan_mutlu' };
}
export function kediSev(d) {
  const h = hazirla(d);
  if (!rolVar(d, 'kedi')) return { metin: 'Kolonide bir mırıl-kedi yok.' };
  if (!h.kedi) h.kedi = { yer: 'barinak', gun: null };
  const g = Z.gun(d);
  if (h.kedi.gun === g) return { metin: 'Kedi kucağında uyuyor; bugünlük yeter.', ses: 'el_hayvan_mutlu' };
  h.kedi.gun = g;
  for (const u of d.murettebat || []) u.stres = Math.max(0, (u.stres || 0) - 10);
  return { metin: 'Mırıl-kedi kucağına kıvrıldı; derin bir mırıltı. Mürettebatın stresi on azaldı.', ses: 'el_hayvan_mutlu' };
}
export function kediTasi(d, yer) {
  const h = hazirla(d);
  if (!h.kedi) h.kedi = { yer: 'barinak', gun: null };
  h.kedi.yer = yer;
  return { metin: 'Mırıl-kedi artık ' + (yer === 'kamara' ? 'Kaptanın Kamarası\'nda' : yer === 'hamam' ? 'termal hamamda' : 'barınakta') + ' yaşıyor.' };
}
export function yoldasYap(d, no) {
  const h = hazirla(d);
  if (h.yoldas === no) {
    h.yoldas = null;
    return { metin: 'Köpek barınakta kalacak.' };
  }
  h.yoldas = no;
  return { metin: 'Xeno-köpek yanında: korulukta ve madenin ilk on katında pusuyu bir tur önce havlayarak bildirecek.', ses: 'el_secim' };
}
export function sat(d, no) {
  const h = hazirla(d);
  const x = h.barinak.find((y) => y.no === no);
  if (!x) return { metin: '' };
  const t = HAYVANLAR[x.tur];
  const gk = { yaygin: 60, nadir: 150, mutasyon: 300, efsanevi: 800 }[t.nadir];
  h.barinak = h.barinak.filter((y) => y !== x);
  ZN.hazirla(d);
  d.para.gk += gk;
  bayraklar(d);
  bekleyenleriYerlestir(d);
  return { metin: t.ad + ' koloni çiftliklerine ve Orin\'in takas listesine verildi: ' + gk + ' kredi. Ansiklopedideki kaydı kalır.', ses: 'el_kasa' };
}

// --- İlerleme (gorevler.zamanIlerle) ---
export function hayvanIlerle(d) {
  if (!d.koloni || !d.zaman) return [];
  const h = hazirla(d);
  const olaylar = [];
  if (h.kulucka && d.zaman.sn >= h.kulucka.bitis) olaylar.push({ tur: 'catlama', metin: catla(d) });
  const g = Z.gun(d);
  if (h.sonGun !== g) {
    const ilk = h.sonGun == null;
    h.sonGun = g;
    if (!ilk && h.barinak.length) {
      const m = gunBasi(d);
      if (m) SB.haber(d, m);
    }
  }
  const n = Z.nobetNo(d);
  if (h.sonNobet !== n) {
    const once = h.sonNobet;
    h.sonNobet = n;
    if (once != null && n === 0 && rolVar(d, 'horoz')) SB.haber(d, 'Şafak Horozu ötüyor: ' + Z.takvimMetni(d));
    if (once != null && n === 4) {
      const kus = Math.min(3, h.barinak.filter((x) => HAYVANLAR[x.tur].rol === 'aksam').length);
      if (kus) d.koloni.moral = Math.min(100, d.koloni.moral + kus);
    }
  }
  // Festival başında tavus ve hindi
  const f = d.festival && d.festival.aktif;
  if (f && h.festival !== f) {
    h.festival = f;
    const ek = (rolVar(d, 'festival') ? 5 : 0) + (rolVar(d, 'sofra') ? 3 : 0);
    if (ek) {
      d.koloni.moral = Math.min(100, d.koloni.moral + ek);
      SB.haber(d, (rolVar(d, 'festival') ? 'Mistik Tavus Kuşu kuyruğunu açtı; ' : '') + (rolVar(d, 'sofra') ? 'Benekli hindi şölen sofrasında; ' : '') + 'festival morali ' + ek + ' fazla.');
    }
  } else if (!f) h.festival = null;
  return olaylar;
}

// --- Menüler ---
function hayvanSatiri(d, x) {
  const t = HAYVANLAR[x.tur];
  return t.ad + (d.hayvan.yoldas === x.no ? ', yanında' : '');
}
export function hayvanMenu(d, no) {
  const h = hazirla(d);
  const x = h.barinak.find((y) => y.no === no);
  if (!x) return { baslik: 'Hayvan', giris: 'Barınakta değil.', ogeler: [] };
  const t = HAYVANLAR[x.tur];
  const o = [
    { id: 'yem', etiket: 'Yem ver', yap: (z) => bakim(z, no, 'yem') },
    { id: 'ilac', etiket: 'İlaç ver', yap: (z) => bakim(z, no, 'ilac') },
    { id: 'sev', etiket: 'Sev', yap: (z) => bakim(z, no, 'sev') },
  ];
  if (t.rol === 'yoldas') o.push({ id: 'yoldas', etiket: h.yoldas === no ? 'Barınakta bırak' : 'Maden ve kıyı yoldaşı olarak yanına al', yap: (z) => yoldasYap(z, no), geri: true });
  if (t.rol === 'kedi') {
    o.push({ id: 'kamara', etiket: 'Kaptanın Kamarası\'na taşı', yap: (z) => kediTasi(z, 'kamara'), geri: true });
    o.push({ id: 'hamam', etiket: 'Termal hamama taşı', yap: (z) => kediTasi(z, 'hamam'), geri: true });
  }
  o.push({ id: 'sat', etiket: 'Koloni çiftliklerine ya da Orin\'e ver', yap: (z) => sat(z, no), geri: true });
  return {
    baslik: t.ad,
    giris: NADIR_ADI[t.nadir] + '. ' + t.tarif + (t.modul ? ' Modül: ' + MODULLER[t.modul].ad + (h.moduller.includes(t.modul) ? ', kurulu.' : ', kurulmadı.') : '') + ' Sesini dinle: tıslama aç, mırıltı mutlu, hırıltı hasta.',
    efekt: DURUM_SESI[x.durum],
    ogeler: o,
  };
}
export function hayvanlarMenu(d) {
  const h = hazirla(d);
  return {
    baslik: 'Barınaktaki hayvanlar',
    giris: h.barinak.length + ' / ' + kapasite(d) + ' hayvan. Her birine odaklanınca durum sesi çalar: tıslama aç, mırıltı mutlu, hırıltı hasta.',
    ogeler: h.barinak.map((x) => ({ id: 'h' + x.no, etiket: hayvanSatiri(d, x), ses: DURUM_SESI[x.durum], alt: (z) => hayvanMenu(z, x.no) })),
  };
}
function modulMenu(d) {
  const h = hazirla(d);
  return {
    baslik: 'Bakım modülleri',
    giris: 'Bir modülün planı, ona ihtiyaç duyan ilk tür keşfedilince açılır.',
    ogeler: Object.keys(MODULLER).map((m) => ({
      id: 'm_' + m,
      etiket: MODULLER[m].ad + (h.moduller.includes(m) ? ', kurulu' : modulPlaniAcik(d, m) ? ': ' + bedelMetni(MODULLER[m].bedel) : ', plan kapalı'),
      yap: (z) => modulKur(z, m),
    })),
  };
}
export function ansiklopediMenu(d) {
  const h = hazirla(d);
  return {
    baslik: 'Hayvan ansiklopedisi, ' + h.kesif.length + ' / 50',
    giris: 'Keşfedilen türler. On beş, otuz ve elli türde ödül var.',
    ogeler: HAYVAN_SIRASI.map((t) => {
      const x = HAYVANLAR[t];
      const k = h.kesif.includes(t);
      return { id: 'a_' + t, etiket: x.no + '. ' + (k ? x.ad + ', ' + NADIR_ADI[x.nadir] : 'keşfedilmedi'), yap: () => ({ metin: k ? x.ad + '. ' + x.tarif : 'Bu tür henüz kuluçkadan çıkmadı.' }) };
    }),
  };
}
function genSecMenu(d, ilk) {
  return {
    baslik: ilk ? 'İkinci geni seç' : 'Birinci geni seç',
    giris: ilk ? 'Birinci gen: ' + GENLER[ilk].ad + '.' : 'Elindeki genom kapsülleri.',
    ogeler: GEN_SIRASI.filter((g) => varlik(d, 'gen_' + g) - (g === ilk ? 1 : 0) > 0).map((g) => ({
      id: 'g_' + g,
      etiket: GENLER[g].ad + ', ' + varlik(d, 'gen_' + g) + ' kapsül',
      ...(ilk ? { yap: (z) => kuluckaBaslat(z, ilk, g), geri: true } : { alt: (z) => genSecMenu(z, g) }),
    })),
  };
}
export function kuluckaMenu(d) {
  const h = hazirla(d);
  const genSayisi = GEN_SIRASI.reduce((a, g) => a + varlik(d, 'gen_' + g), 0);
  const o = [];
  if (h.kulucka) o.push({ id: 'durum', etiket: 'Kuluçkada: ' + (h.kulucka.genler ? h.kulucka.genler.map((g) => GENLER[g].ad).join(' ve ') : 'dondurulmuş yumurta') + ', ' + kalanMetni(d) + ' çatlar', yap: () => ({ metin: 'Kuluçka makinesi ılık bir uğultuyla çalışıyor.' }) });
  else {
    o.push({ id: 'birlestir', etiket: 'İki geni birleştir (' + genSayisi + ' kapsül)', ipucu: 'İki kapsül ve bir saf su ya da aether; bir gün.', alt: (z) => genSecMenu(z, null) });
    o.push({ id: 'yumurta', etiket: 'Dondurulmuş yumurtayı kuluçkaya koy (' + varlik(d, 'donmus_yumurta') + ')', yap: (z) => yumurtaKulucka(z), geri: true });
  }
  if (h.kademe < 0) o.push({ id: 'barinak', etiket: 'Hayvan barınağını kur: ' + bedelMetni(BARINAK[0].bedel), yap: (z) => barinakKur(z), geri: true });
  if (h.bekleyen.length) o.push({ id: 'bekleyen', etiket: 'Biyo-kubbede bekleyen: ' + h.bekleyen.map((t) => HAYVANLAR[t].ad).join(', '), yap: () => ({ metin: 'Barınakta yer açılınca kendiliğinden geçerler.' }) });
  o.push({ id: 'ansiklopedi', etiket: 'Hayvan ansiklopedisi ' + h.kesif.length + ' / 50', alt: (z) => ansiklopediMenu(z) });
  return {
    baslik: 'Genom birleştirme ve kuluçka',
    giris: kubbeVar(d) ? 'Biyo-kubbe, Dr. Lyris Mar-Axira ve Dr. Nerissa Tide yönetiminde. Aynı iki gen bile her seferinde başka tür verebilir: yüzde altmış yaygın, otuz nadir, on mutasyon.' : 'Biyo-kubbe kurulmadan genom birleştirilemez.',
    ogeler: o,
  };
}
export function barinakMenu(d) {
  const h = hazirla(d);
  const o = [
    { id: 'hayvanlar', etiket: 'Hayvanlar ve bakım, ' + h.barinak.length + ' / ' + kapasite(d), alt: (z) => hayvanlarMenu(z) },
    { id: 'moduller', etiket: 'Bakım modülleri, ' + h.moduller.length + ' / 5', alt: (z) => modulMenu(z) },
  ];
  if (h.kademe < BARINAK.length - 1) o.push({ id: 'yukselt', etiket: 'Barınağı genişlet: ' + BARINAK[h.kademe + 1].kapasite + ' hayvan, ' + (d.bayrak.hayvanBarinakBedava ? 'bedelsiz' : bedelMetni(BARINAK[h.kademe + 1].bedel)), yap: (z) => barinakYukselt(z) });
  o.push({ id: 'kulucka', etiket: 'Genom birleştirme ve kuluçka', alt: (z) => kuluckaMenu(z) });
  return { baslik: 'Hayvan barınağı', giris: h.barinak.length + ' hayvan, ' + kapasite(d) + ' yer.', ogeler: o };
}

// --- Nokta eylemleri ve kancalar ---
export const noktaMi = (id) => id === 'bakim_panosu' || id === 'kulucka_odasi';
export function noktaEylemleri(d, id) {
  if (id === 'kulucka_odasi') return [{ id: 'hv_kulucka', etiket: 'Kuluçka makinesi' }, { id: 'incele', etiket: 'İncele' }];
  return [{ id: 'hv_barinak', etiket: 'Barınak yönetimi ve bakım' }, { id: 'incele', etiket: 'İncele' }];
}
export function ekEylemler(d, id) {
  const l = [];
  if (id === 'terminal' && kubbeVar(d)) l.push({ id: 'hv_kulucka', etiket: 'Genom birleştirme ve kuluçka', ipucu: 'Biyo-kubbe: iki gen, bir gün, sürpriz bir tür.' });
  const kedi = d.hayvan && d.hayvan.kedi && rolVar(d, 'kedi');
  if (kedi && ((id === 'kamara_yatak' && d.hayvan.kedi.yer === 'kamara') || (id === 'yb_hamam' && d.hayvan.kedi.yer === 'hamam'))) l.push({ id: 'hv_kedi', etiket: 'Mırıl-kediyi sev' });
  return l;
}
export const ekEylemMi = (e) => e === 'hv_kulucka' || e === 'hv_barinak' || e === 'hv_kedi';
export function eylemUygula(d, id, e) {
  if (e === 'hv_kulucka') return { agac: (x) => kuluckaMenu(x) };
  if (e === 'hv_barinak') return { agac: (x) => barinakMenu(x) };
  if (e === 'hv_kedi') return kediSev(d);
  const n = id === 'kulucka_odasi' ? 'Biyo-kubbeye bağlı kuluçka makinesi.' : 'Bakım panosu: bölmeler, yem ve ilaç dolabı.';
  return { metin: n };
}
// Hayvan ürünleri ilan panosunda ancak üreten bir hayvan varken istenir
const URETEN = {};
for (const t of HAYVAN_SIRASI) for (const k of Object.keys(HAYVANLAR[t].urun)) (URETEN[k] = URETEN[k] || []).push(t);
PZ.ULASIM_EKLERI.push((d, k) => !!URETEN[k] && !!d.hayvan && d.hayvan.barinak.some((x) => URETEN[k].includes(x.tur) && d.hayvan.moduller.includes(HAYVANLAR[x.tur].modul)));
// Kaptan Orin: her hafta bir iki genom kapsülü ya da dondurulmuş yumurta (Paket 14 2.1)
PZ.ORIN_STOK_EKLERI.push((d, h, r) => {
  const l = [];
  const n = 1 + (r(h * 13 + 7) < 0.5 ? 1 : 0);
  for (let i = 0; i < n; i++) {
    if (r(h * 13 + 8 + i) < 0.25) l.push({ id: 'donmus_yumurta_' + i, ad: 'Dondurulmuş yumurta', esya: 'donmus_yumurta', gk: 90, adet: 1 });
    else {
      const g = GEN_SIRASI[Math.floor(r(h * 17 + i) * GEN_SIRASI.length)];
      l.push({ id: 'gen_' + g + '_' + i, ad: 'Genom kapsülü: ' + GENLER[g].ad, esya: 'gen_' + g, gk: 150 + Math.round(r(h * 19 + i) * 100), kupon: 0, adet: 1 });
    }
  }
  return l;
});
