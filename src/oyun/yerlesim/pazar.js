// İlan panosu, siparişler, haftalık tüccar gemisi ve koloni tezgâhı (v5 Paket 2) ile dinamik istek havuzu (Paket 11).
//
// İlan panosu (Koloni Meydanı; Yaşam Bloğu + meydan): aynı anda en çok 3 sipariş. İki kanal:
//   Kanal 1, isimli yerleşimci isteği (şablondaki kişi kolonideyse): ödül o kişiye yakınlık (+15..+35) ve kredi.
//   Kanal 2, sıradan vatandaş isteği (sera işçisi, maden işçisi, kıyı balıkçısı, gece nöbetçisi, genç çırak, yeni evli
//   aile): kredi, moral (+1..+3), yüksek basamakta takas kuponu.
//   Basamak oyun gününden: 1 (1-12), 2 (13-30), 3 (31-60), 4 (61+); çeşit sayısı ve adetler basamakla artar.
//   Akıllı kilit: yalnız oyuncunun elde edebildiği eşyalar istenir (ulasilabilir). Paket 10/13'ün henüz oyunda olmayan
//   eşyaları (ekmek, çay, balık, tuğla ...) kimlikleriyle şablonlarda durur; o eşyalar eklenince kendiliğinden istenir.
//   Süre 1-3 gün; süresi dolan ceza vermez. Boş yerler her sabah dolar. Teslim tek dokunuşla, hepsi birden.
// Kaptan Orin (İkmal İskelesi; tersane + Tüccar Mateo): her haftanın 7. günü Gümüş Şafak'ta iner, Yeşil Öğle sonunda
//   kalkar. Her gelişte dört ürün grubuna %70-%140 fiyat; Mateo Kademe 3 bir gün önceden pahalı grubu söyler.
//   Alım: kredi, takas kuponu, mal-mal takası. Satış: hasat, erzak, maden, cam. Evren itibarı indirimi (%10/%15/%25).
//   %10-%15 ihtimalle Malazar Asası ya da Malazar Büyü Kristali.
// Koloni tezgâhı (iskelede): en çok 4 çeşit mal; her nöbet yerleşimciler ve küçük botlar alır (Mateo Kademe 2 +%10).
//
// d.pazar = { pano: [istek], sonGun, sayac, kupon, orin: { hafta, varis, ayrilis, carpan, stok, takas, selam } | null,
//             duyuruHafta, tezgah: { k: adet }, tezgahNobet, tezgahGelir, teslimSayisi }
import * as Z from '../zaman';
import { YERLESIMCILER, DEKORLAR } from './veri';
import { katildiMi, yerVar } from './konum';
import * as YR from './yerlesim';
import * as ZN from '../tonoflenya/zanaat';
import * as SB from '../tonoflenya/subay';
import { HAMMADDELER, HAMMADDE_SIRASI } from '../veri/tesisler';
import { PARCALAR, TARIFLER } from '../veri/uretim';
import { BITKILER, ISLEME, HIBRITLER } from '../tarim/bitkiler';
import { NOKTALAR } from '../yuzey/harita';
import { itibarKademesi } from '../uzay/fenomen';

// Malazar stoğu (Paket 2 4.2): ileride akademi/okul büyü kısmının anahtarı
if (!ZN.ESYA.malazar_asasi) {
  ZN.ESYA.malazar_asasi = { kat: 4, ad: 'Malazar Asası', tarif: 'Malazar Dağı\'nın ocaklarından, Malkenlere özgü bir asa. Bir asa ve iki üç büyü kristali birikince akademinin büyü bölümünün anahtarı olur.' };
  ZN.ESYA.malazar_kristali = { kat: 4, ad: 'Malazar Büyü Kristali', tarif: 'İçinde mor bir ışığın kıpırdadığı kristal; büyü tozu üretiminin anahtarı.' };
}

const r01 = (d, k) => {
  const x = Math.sin(((d.tohum || 7) % 100000) * 0.017 + k * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};
const ara = (d, k, lo, hi) => lo + Math.floor(r01(d, k) * (hi - lo + 1));
const tesisVar = (d, t) => d.koloni.binalar.includes(t);

// --- Eşyalar: ulaşılabilirlik ve taban değer ---
const ISLEME_TESIS = { mutfak: 'koloni_mutfagi', revir: 'kseno_eczane', dokum: 'dokumhane' };
function bitkiBiliniyor(d, b) {
  const t = d.tarim;
  if (!t) return false;
  if ((t.tohumlar && t.tohumlar[b] > 0) || (t.urun && t.urun[b] > 0)) return true;
  return JSON.stringify(t.yataklar || []).includes('"' + b + '"') || JSON.stringify(t.vaha || []).includes('"' + b + '"');
}
export function bilinir(k) {
  if (k.indexOf('erzak_') === 0) return !!ISLEME.find((i) => i.id === k.slice(6));
  if (k.indexOf('urun_') === 0) return !!BITKILER[k.slice(5)];
  return !!(HAMMADDELER[k] || PARCALAR[k] || ZN.ESYA[k]);
}
// 4.4: yerleşim binalarının tezgâhları (imalat/tezgah.js) gündelik eşyaları buraya bağlar
export const ULASIM_EKLERI = [];
export function ulasilabilir(d, k) {
  if (!bilinir(k)) return false;
  if (YR.varlik(d, k) > 0) return true;
  if (ULASIM_EKLERI.some((f) => f(d, k))) return true;
  if (k.indexOf('urun_') === 0) return bitkiBiliniyor(d, k.slice(5));
  if (k.indexOf('erzak_') === 0) {
    const i = ISLEME.find((x) => x.id === k.slice(6));
    const g = i.girdi || {};
    return tesisVar(d, ISLEME_TESIS[i.tesis] || 'koloni_mutfagi') && Object.keys(g).every((b) => bitkiBiliniyor(d, b));
  }
  if (HAMMADDELER[k]) {
    const gm = d.gorulenMekanlar || [];
    return Object.keys(NOKTALAR).some((n) => NOKTALAR[n].kaynak === k && (NOKTALAR[n].mekan === 'vadi' || gm.includes(NOKTALAR[n].mekan)));
  }
  if (PARCALAR[k]) return Object.keys(TARIFLER).some((t) => tesisVar(d, t) && (TARIFLER[t] || []).some((x) => x.cikti && x.cikti[k]));
  return false;
}
const TABAN_HAM = { bazalt: 2, titanyum: 5, kristal: 6, polimer: 5, izotop: 12, kseno: 15, piezo: 6, aether: 10, tohum: 8 };
const TABAN_PARCA = { cam: 4, kablo: 1, plaka: 1 };
export function grup(k) {
  if (k.indexOf('urun_') === 0) return 'tarim';
  if (k.indexOf('erzak_') === 0) return 'mutfak';
  if (HAMMADDELER[k]) return 'maden';
  if (ZN.ESYA[k] && ZN.ESYA[k].yiyecek) return 'mutfak';
  return 'zanaat';
}
export const GRUP_ADI = { tarim: 'hasat ürünleri', mutfak: 'mutfak ve eczane ürünleri', maden: 'maden ve hammadde', zanaat: 'zanaat ve imalat' };
export function taban(k) {
  if (k.indexOf('urun_') === 0) return HIBRITLER.some((h) => 'urun_' + h.id === k) ? 15 : 6;
  if (k.indexOf('erzak_') === 0) return 18;
  if (HAMMADDELER[k]) return TABAN_HAM[k] || 9;
  if (PARCALAR[k]) return TABAN_PARCA[k] || 6;
  if (ZN.ESYA[k] && ZN.ESYA[k].gk) return ZN.ESYA[k].gk;
  if (ZN.ESYA[k] && ZN.ESYA[k].deger) return Math.max(1, Math.round(ZN.ESYA[k].deger / ZN.GK_ML));
  return 8;
}
// Tüccara satılabilenler: hasat, erzak, maden cevherleri, cam; gemi parçası, silah, zırh ve gezegen numuneleri satılmaz
export function satilir(k) {
  if (k.indexOf('urun_') === 0 || k.indexOf('erzak_') === 0) return true;
  if (HAMMADDELER[k]) return HAMMADDE_SIRASI.includes(k) && k !== 'tohum';
  if (ZN.ESYA[k] && ZN.ESYA[k].gunluk) return !['malazar_buyu_tozu', 'dugun_yuzugu', 'bag_tilsimi'].includes(k);
  return k === 'cam' || !!(ZN.ESYA[k] && ['bal', 'saf_su', 'deri_astar', 'zhaor_ipegi', 'mor_cicek'].includes(k));
}
function satilabilirler(d) {
  const l = [];
  const t = d.tarim;
  if (t) {
    for (const b of Object.keys(t.urun || {})) if (t.urun[b] > 0) l.push('urun_' + b);
    for (const e of Object.keys(t.erzak || {})) if (t.erzak[e] > 0) l.push('erzak_' + e);
  }
  for (const h of HAMMADDE_SIRASI) if (h !== 'tohum' && (d.koloni.kaynaklar[h] || 0) >= 1) l.push(h);
  if ((d.koloni.parcalar.cam || 0) > 0) l.push('cam');
  for (const e of ['bal', 'saf_su', 'deri_astar', 'zhaor_ipegi', 'mor_cicek']) if (d.esya && d.esya[e] > 0) l.push(e);
  for (const e of Object.keys(d.esya || {})) if (d.esya[e] > 0 && ZN.ESYA[e] && ZN.ESYA[e].gunluk && satilir(e)) l.push(e);
  return l;
}

// --- Paket 11 şablonları: [no, ad, kişiler, eşyalar [[kimlik, en az, en çok]], grup, ek] ---
// Kimlikler: oyundaki gerçek eşyalar (urun_, erzak_, hammadde, parça) ya da Paket 10/13 ile gelecek eşyalar.
const S = (no, ad, kim, es, grp, ek = {}) => ({ no, ad, kim, es, grp, ...ek });
export const SABLONLAR = [
  // Paket 2 bölüm 4.1'in örnekleri (sipariş türleri)
  S('2a', 'Un çuvalı', ['sorya'], [['urun_akifer', 3, 10]], 'A', { tur: 'istek' }),
  S('2b', 'Vaha şerbeti', ['julian', 'sorya'], [['erzak_serbet', 2, 4]], 'A', { tur: 'istek' }),
  S('2c', 'Kristal çan onarımı', ['julian'], [['piezo', 1, 2], ['kablo', 5, 10]], 'C', { tur: 'onarim' }),
  S('2d', 'Kantin ısıtıcı borusu', ['kaelon'], [['polimer', 3, 5]], 'C', { tur: 'onarim' }),
  S('2e', 'Gemi kalkmadan titanyum', ['mateo'], [['titanyum', 10, 30]], 'C', { tur: 'kargo' }),
  S('2f', 'Doğal izotop kontratı', ['mateo', 'halvar'], [['izotop', 4, 10]], 'C', { tur: 'kargo' }),
  // A. Dünya gündelik ve sofra
  S(1, 'Taş Fırın Sabahı', ['sorya', 'veysel'], [['ekmek', 2, 6]], 'A'),
  S(2, 'Nöbetçi Çayı', ['marcus', 'halvar'], [['dunya_cayi', 2, 5]], 'A'),
  S(3, 'Uzun Yol Erzağı', ['mateo', 'elara'], [['balik_konservesi', 2, 6]], 'A'),
  S(4, 'Akşam Güveci', ['sorya'], [['balik_corbasi', 2, 4], ['deniz_tuzu', 3, 6]], 'A'),
  S(5, 'Taverna İkramı', ['julian'], [['borek', 2, 5], ['erzak_serbet', 1, 3]], 'A'),
  S(6, 'Temiz Önlük', ['sorya', 'lyris'], [['keten_gomlek', 1, 3]], 'A'),
  S(7, 'Kışa Hazırlık', ['defne'], [['yun_battaniye', 1, 4]], 'A'),
  S(8, 'Kahvaltı Sofrası', ['veysel'], [['xeno_yumurta', 3, 8], ['xeno_sut', 2, 5]], 'A'),
  S(9, 'Un Değirmeni', ['sorya'], [['urun_akifer', 5, 15]], 'A'),
  S(10, 'Sofra Takımı', ['veysel'], [['seramik_canak', 2, 6]], 'A'),
  S(11, 'Kuru Balık Stoğu', ['marcus'], [['gol_baligi', 4, 12]], 'A'),
  S(12, 'Tatlı Kaçamak', ['julian'], [['bal', 2, 6], ['ekmek', 2, 4]], 'A'),
  // B. Malken kültür, şifa ve tapınak
  S(13, 'Tapınak Gecesi', ['lyris'], [['huzur_tutsusu', 2, 5]], 'B'),
  S(14, 'Akustik Ayin', ['julian', 'zarek'], [['kristal_can', 1, 3]], 'B'),
  S(15, 'Gece Nöbeti Işığı', ['zarek'], [['rezonans_lambasi', 1, 3]], 'B'),
  S(16, 'Sefer Sonrası Arınma', ['lyris'], [['erzak_kseno_cay', 2, 5]], 'B'),
  S(17, 'Hamam Günü', ['siravel'], [['aroma_yagi', 1, 4]], 'B'),
  S(18, 'Vaha Şöleni', ['sorya'], [['erzak_ziyafet', 2, 4], ['urun_vaha_hurmasi', 4, 10]], 'B'),
  S(19, 'Derin Maden Koruması', ['nerissa'], [['antikor_iksiri', 1, 4]], 'B'),
  S(20, 'Tatlı Kök Hasadı', ['sorya'], [['urun_tatli_kok', 5, 12]], 'B'),
  S(21, 'Çiçek Kurutma', ['lyris'], [['urun_kristal_cicek', 4, 10]], 'B'),
  S(22, 'Liken Mürekkebi', ['zarek', 'defne'], [['urun_fosforlu_liken', 3, 8]], 'B'),
  S(23, 'Aether Lambası', ['lyris'], [['aether', 1, 3], ['bakir', 3, 6]], 'B'),
  S(24, 'Kökten Şifa', ['siravel'], [['sifali_mantar', 3, 8], ['saf_su', 3, 6]], 'B'),
  // C. Maden, kıyı, inşaat ve tamir
  S(25, 'Duvar Örme', ['veysel'], [['tugla', 6, 18]], 'C', { tur: 'onarim' }),
  S(26, 'Yeni Pencere', ['kaelon'], [['cam', 3, 8]], 'C', { tur: 'onarim' }),
  S(27, 'Çatı ve Sıra Tamiri', ['veysel'], [['kereste', 4, 12]], 'C', { tur: 'onarim' }),
  S(28, 'İniş Halatı', ['torvok'], [['halat', 2, 5]], 'C', { tur: 'onarim' }),
  S(29, 'Fener Yakıtı', ['zarek', 'torvok'], [['fener_yagi', 2, 6]], 'C'),
  S(30, 'Saha Bakımı', ['kaelon'], [['tamir_kiti', 1, 3]], 'C', { tur: 'onarim' }),
  S(31, 'Demir Çivi ve Menteşe', ['brom', 'kaelon'], [['demir_cevheri', 6, 15], ['komur', 4, 10]], 'C', { tur: 'onarim' }),
  S(32, 'Kablo ve Tesisat', ['halvar'], [['bakir', 5, 12], ['recine', 3, 6]], 'C', { tur: 'onarim' }),
  S(33, 'İskele Güçlendirme', ['mateo'], [['kiyi_kerestesi', 8, 20], ['halat', 2, 4]], 'C', { tur: 'onarim' }),
  S(34, 'Kireç Harcı', ['veysel'], [['kirec_tasi', 6, 15], ['ham_kil', 6, 15]], 'C', { tur: 'onarim' }),
  S(35, 'Gümüş Lehim', ['brom', 'kaelon'], [['gumus_tozu', 2, 6], ['piezo', 2, 5]], 'C', { tur: 'onarim' }),
  S(36, 'Çekirdek Ölçümü', ['halvar', 'tina'], [['cekirdek_tasi', 1, 3], ['kuvars_kumu', 4, 8]], 'C'),
  // D. Mevsimlik ve festival (mevsim: 0 Filiz, 1 Kor, 2 Sis, 3 Ayaz)
  S(37, 'Bahar Temizliği', ['sorya'], [['urun_pamuk_keten', 4, 10], ['aroma_yagi', 1, 2]], 'D', { mevsim: 0 }),
  S(38, 'Sıcak Gün İçecekleri', ['julian'], [['urun_vaha_hurmasi', 4, 10], ['deniz_tuzu', 3, 6]], 'D', { mevsim: 1 }),
  S(39, 'Sis Lambası', ['zarek', 'marcus'], [['fener_yagi', 2, 5], ['rezonans_lambasi', 1, 2]], 'D', { mevsim: 2 }),
  S(40, 'Kış Isınması', ['veysel', 'defne'], [['komur', 8, 20], ['yun_battaniye', 2, 4]], 'D', { mevsim: 3 }),
  S(41, 'Sıcak Çorba Nöbeti', ['sorya'], [['balik_corbasi', 3, 6], ['dunya_cayi', 3, 6]], 'D', { mevsim: 3 }),
  S(42, 'Dünya Hasat Bayramı Hazırlığı', ['veysel'], [['ekmek', 4, 8], ['xeno_sut', 3, 6]], 'D', { festival: 'ekmek' }),
  S(43, 'Malken Işık Gecesi', ['lyris'], [['huzur_tutsusu', 3, 6], ['urun_fosforlu_liken', 4, 8]], 'D', { festival: 'axira' }),
  S(44, 'Ses ve Çan Şenliği', ['julian'], [['kristal_can', 2, 4], ['ruzgar_cani', 1, 2]], 'D', { festival: 'elyndra' }),
  S(45, 'Büyük Hizalanma Şöleni', ['sorya', 'julian'], [['erzak_ziyafet', 2, 4], ['borek', 3, 5]], 'D', { festival: 'alti_yildiz' }),
  S(46, 'Kış Ateşi Odunu', ['torvok'], [['kiyi_kerestesi', 10, 20], ['recine', 4, 8]], 'D', { mevsim: 3 }),
  // E. Çoklu karmaşık paketler (Basamak 3-4)
  S(47, 'Karakol İkmal Paketi', ['marcus'], [['tugla', 10, 10], ['demir_cevheri', 8, 8], ['balik_konservesi', 4, 4], ['fener_yagi', 2, 2]], 'E'),
  S(48, 'Derin Maden Seferi Paketi', ['torvok'], [['halat', 3, 3], ['antikor_iksiri', 2, 2], ['tamir_kiti', 2, 2], ['ekmek', 5, 5]], 'E'),
  S(49, 'Okul Yeni Dönem Paketi', ['defne'], [['ders_defteri', 4, 4], ['kereste', 6, 6], ['yun_battaniye', 2, 2]], 'E', { bina: 'okul' }),
  S(50, 'İki Dünyanın Ziyafeti', ['sorya', 'veysel'], [['ekmek', 4, 4], ['erzak_ziyafet', 2, 2], ['dunya_cayi', 4, 4], ['erzak_kseno_cay', 3, 3]], 'E'),
  S(51, 'Araç Bakım ve Kıyı Paketi', ['elara', 'kaelon'], [['tamir_kiti', 2, 2], ['cam', 4, 4], ['bakir', 6, 6], ['recine', 4, 4]], 'E'),
  S(52, 'Hamam ve Şifa Günü', ['lyris', 'siravel'], [['aroma_yagi', 2, 2], ['huzur_tutsusu', 3, 3], ['erzak_kseno_cay', 4, 4], ['keten_gomlek', 2, 2]], 'E'),
  S(53, 'Tüccar Orin İhracat Sandığı', ['mateo'], [['seramik_canak', 4, 4], ['balik_konservesi', 5, 5], ['kristal_can', 2, 2]], 'E'),
  S(54, 'Akustik ve Rezonans Paketi', ['julian', 'tina'], [['piezo', 4, 4], ['rezonans_lambasi', 2, 2], ['gumus_tozu', 3, 3]], 'E'),
  S(55, 'Kış Nöbeti Paketi', ['halvar', 'marcus'], [['komur', 15, 15], ['dunya_cayi', 5, 5], ['yun_battaniye', 3, 3], ['tamir_kiti', 1, 1]], 'E'),
  S(56, 'Arşiv ve Tarih Koruma Paketi', ['defne', 'zarek'], [['fosil', 3, 3], ['muhur_kutusu', 1, 1], ['urun_fosforlu_liken', 5, 5]], 'E'),
  // F. Acil ve sürpriz
  S(57, 'Kaptanın Kamarası Sürprizi', ['veysel'], [['muzik_kutusu', 1, 1]], 'F', { moral: 6 }),
  S(58, 'Kayıp Akvaryum Merakı', ['siravel'], [['akvaryum', 1, 1], ['gol_baligi', 3, 3]], 'F'),
  S(59, 'Acil Yara Bakımı', ['lyris'], [['urun_pamuk_keten', 4, 4], ['sifali_mantar', 3, 3], ['bal', 2, 2]], 'F'),
  S(60, 'Orin\'in Acil Siparişi', ['mateo'], [], 'F', { orin: true }),
  S(61, 'Evcil Kseno-Hayvan Bakımı', ['sorya'], [['gol_baligi', 4, 4], ['urun_tatli_kok', 4, 4], ['bitkisel_lif', 5, 5]], 'F'),
  S(62, 'Brom\'un Özel Dövüm İsteği', ['brom'], [['gumus_tozu', 3, 3], ['demir_cevheri', 10, 10], ['komur', 10, 10]], 'F'),
  S(63, 'Nerissa\'nın Abis Testi', ['nerissa'], [['deniz_tuzu', 6, 6], ['cam', 3, 3], ['sifali_mantar', 4, 4]], 'F'),
  S(64, 'Evlilik Hazırlığı Dedikodusu', ['julian'], [['dugun_yuzugu', 1, 1], ['borek', 3, 3]], 'F', { kosul: (d) => !!(d.aile && d.aile.yakinEvlilik) }),
  S(65, 'Gece Nöbeti Kahvesi', ['kaelon', 'marcus'], [['erzak_noro_infuzyon', 2, 4], ['kuru_meyve', 3, 6]], 'F'),
  S(66, 'Hamam ve Temizlik Günü', ['siravel', 'lyris'], [['sabun', 3, 6], ['aroma_yagi', 1, 2]], 'F'),
  S(67, 'Okul Şenliği Oyuncakları', ['veysel', 'defne'], [['oyuncak', 2, 5], ['bal', 2, 4]], 'F', { bina: 'okul' }),
  S(68, 'Özel Kıyı Ziyafeti', ['sorya'], [['yengec', 2, 4], ['yilan_baligi', 2, 3], ['baharat', 2, 2]], 'F'),
  S(69, 'Yeni İzci Teçhizatı', ['zarek', 'elara'], [['saha_cantasi', 1, 2], ['kristal_pusula', 1, 1]], 'F'),
  S(70, 'Kış Erzak Takviyesi', ['sorya', 'mateo'], [['sazan', 4, 8], ['baharat', 2, 4], ['ekmek', 4, 4]], 'F'),
];
export const VATANDASLAR = ['Sera işçisi', 'Maden işçisi', 'Kıyı balıkçısı', 'Gece nöbetçisi', 'Genç çırak', 'Yeni evli aile'];
// Basamaklar (Paket 11 3.1): çeşit [en az, en çok], adet çarpanı, kredi bandı, yakınlık, moral
export const BASAMAKLAR = [
  null,
  { cesit: [1, 1], carpan: 1, gk: [100, 250], guven: 15, moral: 1 },
  { cesit: [1, 2], carpan: 1, gk: [250, 500], guven: 20, moral: 2 },
  { cesit: [2, 3], carpan: 1.5, gk: [500, 900], guven: 25, moral: 3, kuponSans: 0.3 },
  { cesit: [3, 4], carpan: 2, gk: [800, 1500], guven: 35, moral: 3, kupon: 1 },
];
export function basamak(d) {
  const g = Z.gun(d);
  return g <= 12 ? 1 : g <= 30 ? 2 : g <= 60 ? 3 : 4;
}
export const PANO_EN_COK = 3;

export function durum(d) {
  if (!d.pazar) d.pazar = { pano: [], sonGun: 0, sayac: 0, kupon: 0, orin: null, tezgah: {}, tezgahGelir: 0, teslimSayisi: 0 };
  const p = d.pazar;
  if (!p.pano) p.pano = [];
  if (!p.tezgah) p.tezgah = {};
  return p;
}
export const panoAcik = (d) => tesisVar(d, 'yasam_blogu') && yerVar(d, 'meydan');
export const iskeleAcik = (d) => tesisVar(d, 'tersane') && katildiMi(d, 'mateo');

// Şablonun bugün uygun olup olmadığı (mevsim, festival, bina, akıllı kilit)
function uygunMu(d, s, b) {
  if (s.kosul && !s.kosul(d)) return false;
  if (s.orin) return !!(d.pazar && d.pazar.orin);
  if (s.mevsim != null && s.mevsim !== Z.mevsimNo(d)) return false;
  if (s.festival) {
    const F = d.festival && d.festival.son && d.festival.son[s.festival];
    // festivalden önce (henüz kutlanmadıysa) ya da festival sürerken
    if (!(d.festival && d.festival.aktif === s.festival) && F && F.yil === Z.yil(d)) return false;
  }
  if (s.bina && !yerVar(d, s.bina)) return false;
  if (s.grp === 'E' && b < 3) return false;
  if (!s.es.length) return true;
  return s.es.every((x) => ulasilabilir(d, x[0]));
}
function istekUret(d, b, kimden) {
  const p = durum(d);
  const aday = SABLONLAR.filter((s) => uygunMu(d, s, b) && !p.pano.some((x) => x.sablon === s.no) && (!kimden || s.kim.includes(kimden)));
  if (!aday.length) return null;
  p.sayac = (p.sayac || 0) + 1;
  const n = p.sayac * 31 + Z.gun(d);
  const s = aday[Math.floor(r01(d, n) * aday.length)];
  const B = BASAMAKLAR[b];
  // Eşyalar: şablonun ilk eşyaları basamağın çeşit sayısına göre; Basamak 3-4'te başka uygun şablondan eklenir
  let es = s.es.map((x) => [x[0], x[1], x[2]]);
  if (s.orin) {
    const l = satilabilirler(d).filter((k) => k.indexOf('erzak_') === 0 || k.indexOf('urun_') === 0 || k === 'cam');
    es = l.slice(0, 2).map((k) => [k, 3, 6]);
    if (!es.length) es = [['bazalt', 3, 6]];
  }
  const cesit = ara(d, n + 1, B.cesit[0], B.cesit[1]);
  if (s.grp !== 'E' && s.grp !== 'F') es = es.slice(0, Math.max(1, cesit));
  if (es.length < cesit && b >= 3) {
    for (const t of aday) {
      if (es.length >= cesit) break;
      for (const x of t.es) if (es.length < cesit && !es.some((y) => y[0] === x[0]) && ulasilabilir(d, x[0])) es.push([x[0], x[1], x[2]]);
    }
  }
  const istenen = {};
  es.forEach((x, i) => {
    const temel = ara(d, n + 3 + i, x[1], x[2]);
    istenen[x[0]] = Math.max(1, Math.round(temel * (s.grp === 'E' ? 1 : B.carpan)));
  });
  // Kanal: şablonun kişilerinden kolonide olan varsa çoğunlukla isimli
  const kisiler = kimden ? [kimden, ...s.kim.filter((k) => k !== kimden && katildiMi(d, k))] : s.kim.filter((k) => katildiMi(d, k));
  const isimli = kisiler.length && (kimden || r01(d, n + 9) < 0.6 || s.orin);
  const tur = s.tur || (s.grp === 'C' ? 'onarim' : 'istek');
  let gk = ara(d, n + 11, B.gk[0], B.gk[1]);
  if (tur === 'onarim') gk = Math.max(gk, ara(d, n + 12, 250, 600));
  if (tur === 'kargo') gk = Math.max(gk, ara(d, n + 13, 500, 1200));
  gk = Math.round(gk / 10) * 10;
  const odul = { gk, kupon: s.orin || tur === 'kargo' || B.kupon || (B.kuponSans && r01(d, n + 14) < B.kuponSans) ? 1 : 0 };
  if (isimli) odul.guven = { kisiler, n: B.guven + (s.grp === 'E' ? 5 : 0) };
  else odul.moral = B.moral + (s.moral || 0);
  if (s.moral && isimli) odul.moral = s.moral;
  return {
    no: p.sayac,
    sablon: s.no,
    ad: s.ad,
    tur,
    kanal: isimli ? 1 : 2,
    isteyen: isimli ? kisiler[0] : null,
    vatandas: isimli ? null : VATANDASLAR[Math.floor(r01(d, n + 15) * VATANDASLAR.length)],
    istenen,
    bitisGun: Z.gun(d) + ara(d, n + 16, 1, 3),
    odul,
  };
}
export function panoYenile(d) {
  const p = durum(d);
  const g = Z.gun(d);
  if (p.sonGun === g) return [];
  p.sonGun = g;
  const kalkan = p.pano.filter((x) => x.bitisGun < g);
  p.pano = p.pano.filter((x) => x.bitisGun >= g);
  const b = basamak(d);
  const yeni = [];
  while (p.pano.length < PANO_EN_COK) {
    const x = istekUret(d, b);
    if (!x) break;
    p.pano.push(x);
    yeni.push(x);
  }
  return { kalkan, yeni };
}
function isteyenAdi(x) {
  return x.kanal === 1 ? YR.adi(x.isteyen) : x.vatandas;
}
function odulMetni(x) {
  const o = x.odul;
  const l = [o.gk + ' Galaktik Keşif Kredisi'];
  if (o.guven) l.push(o.guven.kisiler.map(YR.kisaAdi).join(' ve ') + ' için ' + o.guven.n + ' yakınlık');
  if (o.moral) l.push(o.moral + ' moral');
  if (o.kupon) l.push(o.kupon + ' takas kuponu');
  return l.join(', ');
}
export function eksikler(d, x) {
  return Object.keys(x.istenen).filter((k) => YR.varlik(d, k) < x.istenen[k]);
}
// Paket 11 bölüm 5: isteyen ve başlık; gerekenler ve elindeki; ödül; kalan süre
export function istekMetni(d, x) {
  const g = Z.gun(d);
  const kalan = x.bitisGun - g + 1;
  const ger = Object.keys(x.istenen).map((k) => {
    const var_ = YR.varlik(d, k);
    const n = x.istenen[k];
    return n + ' ' + YR.varlikAdi(k) + ' [elinde ' + var_ + (var_ >= n ? ', tamam' : ', ' + (n - var_) + ' eksik') + ']';
  });
  return (x.kanal === 1 ? 'Özel istek, ' : 'Vatandaş isteği, ') + isteyenAdi(x) + ': ' + x.ad + '. ' + ger.join('; ') + '. Ödül: ' + odulMetni(x) + '. Kalan süre: ' + (kalan <= 1 ? 'bugün bitiyor' : kalan + ' gün') + '.';
}
export function teslimEt(d, no) {
  const p = durum(d);
  const x = p.pano.find((y) => y.no === no);
  if (!x) return { metin: 'Bu istek panoda yok.' };
  const e = eksikler(d, x);
  if (e.length) return { metin: 'Eksik: ' + e.map((k) => x.istenen[k] - YR.varlik(d, k) + ' ' + YR.varlikAdi(k)).join(', ') + '.', ses: 'red' };
  for (const k of Object.keys(x.istenen)) YR.varlikEkle(d, k, -x.istenen[k]);
  ZN.hazirla(d);
  d.para.gk += x.odul.gk;
  p.kupon = (p.kupon || 0) + (x.odul.kupon || 0);
  p.teslimSayisi = (p.teslimSayisi || 0) + 1;
  let ek = '';
  if (x.odul.guven) for (const k of x.odul.guven.kisiler) {
    const r = YR.puanEkle(d, k, x.odul.guven.n, true);
    if (r.metin) ek += ' ' + r.metin;
  }
  if (x.odul.moral) d.koloni.moral = Math.min(100, d.koloni.moral + x.odul.moral);
  p.pano = p.pano.filter((y) => y.no !== no);
  const tes = x.kanal === 1 ? YR.kisaAdi(x.isteyen) + ': "' + YERLESIMCILER[x.isteyen].imza.tesekkur + '"' : x.vatandas + ' teşekkür ediyor.';
  return { metin: x.ad + ' teslim edildi. ' + tes + ' Kazanç: ' + odulMetni(x) + '.' + ek + ' Kasada ' + d.para.gk + ' kredi, ' + p.kupon + ' takas kuponu.', ses: 'el_kasa', efekt: x.kanal === 1 ? 'imza_' + x.isteyen + '_tesekkur' : null };
}
export function iptalEt(d, no) {
  const p = durum(d);
  p.pano = p.pano.filter((y) => y.no !== no);
  return { metin: 'İstek panodan kaldırıldı; ceza yok. Yarın sabah yerine yenisi asılır.' };
}
export function panoMenu(d) {
  const p = durum(d);
  if (!panoAcik(d)) return { baslik: 'İlan panosu', giris: 'İlan panosu Yaşam Bloğu ve Koloni Meydanı kurulunca açılır.', ogeler: [] };
  panoYenile(d);
  const sirali = [...p.pano].sort((a, b) => a.kanal - b.kanal);
  return {
    baslik: 'Koloni ilan panosu',
    giris: (sirali.length ? sirali.length + ' ilan. ' : 'Panoda ilan yok; yarın sabah yenileri asılır. ') + 'Basamak ' + basamak(d) + '. Kasada ' + ((d.para && d.para.gk) || 0) + ' kredi, ' + (p.kupon || 0) + ' takas kuponu. Yukarı aşağı kaydırarak gez.',
    ogeler: sirali.map((x) => ({
      id: 'i_' + x.no,
      etiket: istekMetni(d, x) + (eksikler(d, x).length ? '' : ' Teslim etmek için çift dokun.'),
      alt: (z) => istekKarti(z, x.no),
    })),
  };
}
function istekKarti(d, no) {
  const x = durum(d).pano.find((y) => y.no === no);
  if (!x) return { baslik: 'İlan', giris: 'Bu ilan kalktı.', ogeler: [] };
  return {
    baslik: x.ad,
    giris: istekMetni(d, x),
    ogeler: [
      { id: 'teslim', etiket: 'Tümünü teslim et', geri: true, yap: (z) => teslimEt(z, no) },
      { id: 'iptal', etiket: 'İlanı panodan kaldır', geri: true, yap: (z) => iptalEt(z, no) },
    ],
  };
}
// Yerleşimcinin kendi açtığı isimli istek (Paket 1 bölüm 6 "Görev al"; Paket 11 Kanal 1)
export function kisininIstegi(d, id) {
  if (!d.pazar) return null;
  return d.pazar.pano.find((x) => x.kanal === 1 && (x.isteyen === id || (x.odul.guven && x.odul.guven.kisiler.includes(id)))) || null;
}

// --- Kaptan Orin ---
export const ORIN = {
  ad: 'Kaptan Orin',
  tarif: 'Bağımsız ikmal tüccarı. Sinyal kulesini ve güvenli iniş pistini görünce Aethelis\'i haftalık rotasına eklemiş. Neşeli, pazarlıkçı, dedikoducu.',
  imza: { selam: 'İskeleniz sağlam, çorbanız sıcakmış Kaptan!', tesekkur: 'Seninle ticaret yapmak zevk!', kizgin: 'Bu fiyata motor bile çalıştırmam.' },
};
const GRUPLAR = ['tarim', 'mutfak', 'maden', 'zanaat'];
export function carpanlar(d, hafta) {
  const c = {};
  GRUPLAR.forEach((g, i) => {
    c[g] = Math.round((0.7 + r01(d, hafta * 17 + i * 5) * 0.7) * 100) / 100;
  });
  return c;
}
function indirim(d) {
  const k = itibarKademesi(d);
  // 4.5: Koloni Arşivi'nin dört seti tamamlanınca pazar bonusu yüzde on beş (v5 Paket 3B 3)
  return Math.min(0.4, (k >= 3 ? 0.25 : k === 2 ? 0.15 : k === 1 ? 0.1 : 0) + (d.bayrak && d.bayrak.arsiv_hepsi ? 0.15 : 0));
}
// 4.5: hayvan ve arşiv modülleri Orin'in stoğuna mal ekler (döngüsel içe aktarma olmasın)
export const ORIN_STOK_EKLERI = [];
function orinStokUret(d, h) {
  const st = [];
  const tohumlar = Object.keys(BITKILER).filter((b) => !HIBRITLER.some((x) => x.id === b) && !BITKILER[b].gorev);
  const filiz = Z.mevsimNo(d) === 0 ? 0.8 : 1; // Filiz: taze tohum ucuz
  for (let i = 0; i < 2; i++) {
    const b = tohumlar[Math.floor(r01(d, h * 7 + i) * tohumlar.length)];
    if (!st.some((x) => x.tohum === b)) st.push({ id: 'tohum_' + b, ad: BITKILER[b].ad + ' tohumu', tohum: b, gk: Math.round(20 * filiz), adet: 3 });
  }
  st.push({ id: 'yakit', ad: '10 litre itki yakıtı', parca: 'itki_yakiti', n: 10, gk: 30, adet: 3 });
  st.push({ id: 'titanyum', ad: '10 titanyum', ham: 'titanyum', n: 10, gk: 70, adet: 2 });
  st.push({ id: 'kristal', ad: '5 silikat kristali', ham: 'kristal', n: 5, gk: 45, adet: 2 });
  st.push({ id: 'polimer', ad: '5 polimer', ham: 'polimer', n: 5, gk: 35, adet: 2 });
  st.push({ id: 'kablo', ad: '20 kablo demeti', parca: 'kablo', n: 20, gk: 25, adet: 2 });
  const yok = Object.keys(DEKORLAR).filter((k) => !(d.yer && d.yer.dekorlar.includes(k)));
  if (yok.length) {
    const k = yok[Math.floor(r01(d, h * 3 + 1) * yok.length)];
    st.push({ id: 'dekor_' + k, ad: 'Sesli dekor: ' + DEKORLAR[k].ad, dekor: k, kupon: 2, gk: 0, adet: 1 });
  }
  const hib = HIBRITLER[Math.floor(r01(d, h * 5 + 2) * HIBRITLER.length)].id;
  st.push({ id: 'hibrit_' + hib, ad: 'Nadir hibrit tohum: ' + BITKILER[hib].ad, tohum: hib, kupon: 1, gk: 50, adet: 1 });
  // Sis Yörüngesi ve Tonoflenya köprüsü: egzotik mal (Malken Lirası ya da kredi)
  if (Z.mevsimNo(d) === 2 || d.bayrak.tonoflenyaGoruldu) {
    st.push({ id: 'deri_astar', ad: 'Deri astar (Tonoflenya)', esya: 'deri_astar', gk: 3, ml: 45, adet: 2 });
    st.push({ id: 'zhaor_ipegi', ad: 'Zhaor ipeği (Tonoflenya)', esya: 'zhaor_ipegi', gk: 6, ml: 100, adet: 1 });
  }
  // Malazar stoğu: yüzde 10-15 ihtimal
  if (r01(d, h * 11 + 4) < 0.125) {
    if (r01(d, h * 11 + 5) < 0.4) st.push({ id: 'malazar_asasi', ad: 'Malazar Asası', esya: 'malazar_asasi', gk: 400, kupon: 3, adet: 1 });
    else st.push({ id: 'malazar_kristali', ad: 'Malazar Büyü Kristali', esya: 'malazar_kristali', gk: 250, kupon: 2, adet: 1 });
  }
  for (const f of ORIN_STOK_EKLERI) st.push(...f(d, h, (k) => r01(d, k)));
  return st;
}
function orinTakasUret(d, h) {
  const l = [];
  const sat = satilabilirler(d).filter((k) => k.indexOf('urun_') === 0 || k.indexOf('erzak_') === 0);
  const a = sat[Math.floor(r01(d, h * 13) * sat.length)] || 'urun_akifer';
  l.push({ id: 't1', ver: { [a]: 6, bazalt: 10 }, al: { tohum: HIBRITLER[h % HIBRITLER.length].id, n: 1 }, ad: 'bir nadir hibrit tohum' });
  if (r01(d, h * 13 + 1) < 0.6) l.push({ id: 't2', ver: { titanyum: 8, kristal: 4 }, al: { kupon: 1 }, ad: 'bir takas kuponu' });
  return l;
}
export function orinIlerle(d) {
  const p = durum(d);
  const hg = Z.haftaGunu(d);
  const h = Z.hafta(d);
  const nb = Z.nobetNo(d);
  const olaylar = [];
  if (!iskeleAcik(d)) {
    p.orin = null;
    return olaylar;
  }
  // Mateo Kademe 3: bir gün önce pahalı grup
  if (hg === 6 && p.duyuruHafta !== h && YR.kademe(d, 'mateo') >= 3) {
    p.duyuruHafta = h;
    const c = carpanlar(d, h);
    const en = GRUPLAR.slice().sort((a, b) => c[b] - c[a])[0];
    SB.haber(d, 'Tüccar Mateo: "Telsizden duydum Kaptan; yarın Orin ' + GRUP_ADI[en] + ' için iyi para verecek. Elinde ne varsa ayır."');
  }
  if (hg === 7 && nb < 3 && (!p.orin || p.orin.hafta !== h)) {
    p.orin = { hafta: h, carpan: carpanlar(d, h), stok: orinStokUret(d, h), takas: orinTakasUret(d, h), alinan: {}, selam: false };
    olaylar.push({ tur: 'orin', metin: 'İkmal iskelesinden liman kornası: Kaptan Orin\'in kargo gemisi indi. Yeşil Öğle sonuna kadar iskelede.' });
    SB.haber(d, 'İkmal iskelesinden liman kornası: Kaptan Orin\'in kargo gemisi indi. Yeşil Öğle sonuna kadar iskelede.');
  }
  if (p.orin && (hg !== 7 || nb >= 3)) {
    p.orin = null;
    if (hg === 7) SB.haber(d, 'Kaptan Orin\'in gemisi iskeleden kalktı; gelecek hafta yine gelecek.');
  }
  return olaylar;
}
export const orinBurada = (d) => !!(d.pazar && d.pazar.orin);
export function orinSatisFiyati(d, k) {
  const o = d.pazar.orin;
  return Math.max(1, Math.round(taban(k) * o.carpan[grup(k)] * 10) / 10);
}
function sinyalSesi(c) {
  return c >= 1.2 ? 'el_kasa' : c <= 0.85 ? 'el_bas_ton' : null;
}
export function orinMenu(d) {
  const p = durum(d);
  const o = p.orin;
  if (!o) return { baslik: 'İskele', giris: 'Orin\'in gemisi iskelede değil. Her haftanın yedinci günü Gümüş Şafak\'ta iner.', ogeler: [] };
  const sel = !o.selam;
  o.selam = true;
  const c = o.carpan;
  const fiyat = GRUPLAR.map((g) => GRUP_ADI[g] + ' yüzde ' + Math.round(c[g] * 100)).join(', ');
  const ind = indirim(d);
  return {
    baslik: ORIN.ad,
    giris: (sel ? 'Orin: "' + ORIN.imza.selam + '" ' : '') + 'Bu haftanın fiyatları: ' + fiyat + '. ' + (ind ? 'Evren itibarın yüzünden alışta yüzde ' + Math.round(ind * 100) + ' indirim. ' : '') + 'Kasada ' + ((d.para && d.para.gk) || 0) + ' kredi, ' + (p.kupon || 0) + ' takas kuponu.',
    efekt: sel ? 'imza_orin_selam' : null,
    ogeler: [
      { id: 'sat', etiket: 'Orin\'e sat', ipucu: 'Pahalı mallarda yükselen zil, ucuzlarda alçak ton.', alt: (x) => orinSatMenu(x) },
      { id: 'al', etiket: 'Orin\'den satın al', alt: (x) => orinAlMenu(x) },
      { id: 'takas', etiket: 'Mal mala takas', alt: (x) => orinTakasMenu(x) },
      { id: 'dedikodu', etiket: 'Dedikodu', yap: (x) => ({ metin: 'Orin: "' + dedikodu(x) + '"' }) },
    ],
  };
}
function dedikodu(d) {
  const l = [
    'Moloz Kuşağı\'nda korsanlar yine kıpırdanıyor; kargonu sağlam bağla.',
    'Sektör 15\'te bir firkateyn gördüm, sinyalleri garip.',
    'Senin aşçının çorbası üç halkada konuşuluyor, haberin olsun.',
    'Malazar Dağı\'ndan asa getiren tüccar mı? Ancak şanslı bir haftamda.',
    'Bir koloniyi tezgâhından tanırsın; seninki dolu dolu.',
  ];
  return l[Z.hafta(d) % l.length];
}
function orinSatMenu(d) {
  const l = satilabilirler(d);
  return {
    baslik: 'Orin\'e sat',
    giris: l.length ? 'Bir kez dokun: bir tane; listenin sonunda bütün stoğu sat.' : 'Satacak hasat, erzak ya da maden yok.',
    ogeler: [
      ...l.map((k) => ({ id: k, etiket: YR.varlikAdi(k) + ': tanesi ' + orinSatisFiyati(d, k) + ' kredi. Elinde ' + Math.floor(YR.varlik(d, k)) + '.', ses: sinyalSesi(d.pazar.orin.carpan[grup(k)]), yap: (x) => orinSat(x, k, false) })),
      ...l.filter((k) => YR.varlik(d, k) > 1).map((k) => ({ id: 'h_' + k, etiket: 'Bütün ' + YR.varlikAdi(k) + ' stoğunu sat', yap: (x) => orinSat(x, k, true) })),
    ],
  };
}
export function orinSat(d, k, hepsi) {
  if (!orinBurada(d)) return { metin: 'Orin gitti.' };
  if (!satilir(k)) return { metin: 'Orin bunu almıyor: "' + ORIN.imza.kizgin + '"', ses: 'red' };
  const n = hepsi ? Math.floor(YR.varlik(d, k)) : Math.min(1, Math.floor(YR.varlik(d, k)));
  if (!n) return { metin: 'Elinde ' + YR.varlikAdi(k) + ' yok.', ses: 'red' };
  const f = orinSatisFiyati(d, k);
  YR.varlikEkle(d, k, -n);
  ZN.hazirla(d);
  const t = Math.round(f * n * 10) / 10;
  d.para.gk += t;
  return { metin: n + ' ' + YR.varlikAdi(k) + ' sattın: ' + t + ' kredi. Kasada ' + Math.round(d.para.gk) + '.', ses: 'el_kasa' };
}
function stokFiyati(d, s) {
  const ind = indirim(d);
  return { gk: Math.round(s.gk * (1 - ind)), kupon: s.kupon || 0, ml: s.ml ? Math.round(s.ml * (1 - ind)) : 0 };
}
// Paket 4 bölüm 6: kısıtlı acil stokta "normalin N katı" uyarısı
function katMetni(s) {
  const k = s.esya || s.ham || s.parca;
  if (!k || !s.gk) return '';
  const t = taban(k) * (s.n || 1);
  const kat = Math.round(s.gk / Math.max(1, t));
  return kat >= 2 ? ', kısıtlı acil stok: normalin ' + kat + ' katı' : '';
}
function orinAlMenu(d) {
  const o = d.pazar.orin;
  return {
    baslik: 'Orin\'den satın al',
    giris: 'Kasada ' + Math.round(d.para.gk) + ' kredi, ' + (d.pazar.kupon || 0) + ' takas kuponu' + (d.para.ml ? ', ' + Math.round(d.para.ml) + ' Malken Lirası' : '') + '.',
    ogeler: o.stok.map((s) => {
      const f = stokFiyati(d, s);
      const kalan = s.adet - (o.alinan[s.id] || 0);
      const fm = [f.gk ? f.gk + ' kredi' : '', f.kupon ? f.kupon + ' kupon' : ''].filter(Boolean).join(' ve ') + (f.ml ? ' (ya da ' + f.ml + ' Malken Lirası)' : '') + katMetni(s);
      return { id: s.id, etiket: s.ad + ': ' + fm + '. ' + (kalan > 0 ? kalan + ' tane kaldı.' : 'Tükendi.'), yap: (x) => orinAl(x, s.id) };
    }),
  };
}
export function orinAl(d, sid) {
  if (!orinBurada(d)) return { metin: 'Orin gitti.' };
  const p = d.pazar;
  const o = p.orin;
  const s = o.stok.find((x) => x.id === sid);
  if (!s) return { metin: 'Stokta yok.' };
  if ((o.alinan[sid] || 0) >= s.adet) return { metin: 'Orin: "Hepsi gitti dostum, gelecek hafta."', ses: 'red' };
  ZN.hazirla(d);
  const f = stokFiyati(d, s);
  const mlIle = f.ml && d.para.gk < f.gk && d.para.ml >= f.ml;
  if ((p.kupon || 0) < f.kupon) return { metin: f.kupon + ' takas kuponu gerekiyor; sende ' + (p.kupon || 0) + '. Kupon ilan panosundaki büyük siparişlerden gelir.', ses: 'red' };
  if (!mlIle && d.para.gk < f.gk) return { metin: 'Orin: "' + ORIN.imza.kizgin + '" ' + f.gk + ' kredi lazım; sende ' + Math.round(d.para.gk) + '.', ses: 'red' };
  if (mlIle) d.para.ml -= f.ml;
  else d.para.gk -= f.gk;
  p.kupon -= f.kupon;
  o.alinan[sid] = (o.alinan[sid] || 0) + 1;
  if (s.tohum) {
    if (d.tarim) d.tarim.tohumlar[s.tohum] = (d.tarim.tohumlar[s.tohum] || 0) + 1;
    else d.koloni.kaynaklar.tohum = (d.koloni.kaynaklar.tohum || 0) + 1;
  } else if (s.parca) d.koloni.parcalar[s.parca] = (d.koloni.parcalar[s.parca] || 0) + s.n;
  else if (s.ham) d.koloni.kaynaklar[s.ham] = (d.koloni.kaynaklar[s.ham] || 0) + s.n;
  else if (s.dekor) {
    if (!d.yer.dekorlar.includes(s.dekor)) d.yer.dekorlar.push(s.dekor);
  } else if (s.esya) ZN.ekle(d, s.esya, 1);
  return { metin: s.ad + (s.dekor ? ' kamarandaki rafa kondu.' : ' ambara girdi.') + ' Orin: "' + ORIN.imza.tesekkur + '"', ses: 'el_kasa', efekt: 'imza_orin_tesekkur' };
}
function orinTakasMenu(d) {
  const o = d.pazar.orin;
  return {
    baslik: 'Mal mala takas',
    giris: 'Kredi harcamadan koloni üretiminle değiş tokuş.',
    ogeler: o.takas.map((t) => ({
      id: t.id,
      etiket: Object.keys(t.ver).map((k) => t.ver[k] + ' ' + YR.varlikAdi(k)).join(' ve ') + ' ver, ' + t.ad + ' al' + (o.alinan[t.id] ? '. Yapıldı.' : '.'),
      yap: (x) => orinTakas(x, t.id),
    })),
  };
}
export function orinTakas(d, tid) {
  if (!orinBurada(d)) return { metin: 'Orin gitti.' };
  const o = d.pazar.orin;
  const t = o.takas.find((x) => x.id === tid);
  if (!t || o.alinan[tid]) return { metin: 'Bu takas yapıldı.' };
  const e = Object.keys(t.ver).filter((k) => YR.varlik(d, k) < t.ver[k]);
  if (e.length) return { metin: 'Eksik: ' + e.map((k) => t.ver[k] - Math.floor(YR.varlik(d, k)) + ' ' + YR.varlikAdi(k)).join(', ') + '.', ses: 'red' };
  for (const k of Object.keys(t.ver)) YR.varlikEkle(d, k, -t.ver[k]);
  o.alinan[tid] = 1;
  if (t.al.tohum && d.tarim) d.tarim.tohumlar[t.al.tohum] = (d.tarim.tohumlar[t.al.tohum] || 0) + t.al.n;
  if (t.al.kupon) d.pazar.kupon = (d.pazar.kupon || 0) + t.al.kupon;
  return { metin: 'Takas tamam: ' + t.ad + '. Orin: "' + ORIN.imza.tesekkur + '"', ses: 'el_kasa', efekt: 'imza_orin_tesekkur' };
}

// --- Koloni tezgâhı ---
export const TEZGAH_CESIT = 4;
// Paket 4 bölüm 4.3: tezgâhın pasif geliri günde en çok 400 kredi
export const TEZGAH_GUNLUK_TAVAN = 400;
function tezgahFiyati(d, k) {
  const c = carpanlar(d, Z.hafta(d))[grup(k)];
  return Math.round(taban(k) * c * 0.9 * (YR.kademe(d, 'mateo') >= 2 ? 1.1 : 1) * 10) / 10;
}
export function tezgahKoy(d, k, n) {
  const p = durum(d);
  if (!satilir(k)) return { metin: 'Bu mal tezgâhta satılmaz.', ses: 'red' };
  if (!p.tezgah[k] && Object.keys(p.tezgah).length >= TEZGAH_CESIT) return { metin: 'Tezgâhta en çok dört çeşit mal durur.', ses: 'red' };
  const al = Math.min(n, Math.floor(YR.varlik(d, k)));
  if (al < 1) return { metin: 'Elinde yok.', ses: 'red' };
  YR.varlikEkle(d, k, -al);
  p.tezgah[k] = (p.tezgah[k] || 0) + al;
  return { metin: al + ' ' + YR.varlikAdi(k) + ' tezgâha kondu; tanesi yaklaşık ' + tezgahFiyati(d, k) + ' kredi.', ses: 'dugme' };
}
export function tezgahAl(d, k) {
  const p = durum(d);
  const n = p.tezgah[k] || 0;
  if (!n) return { metin: 'Tezgâhta yok.' };
  YR.varlikEkle(d, k, n);
  delete p.tezgah[k];
  return { metin: n + ' ' + YR.varlikAdi(k) + ' tezgâhtan geri alındı.' };
}
// Her nöbet başında satış (gorevler.zamanIlerle → pazarIlerle)
export function tezgahIlerle(d) {
  const p = durum(d);
  const nb = Z.gun(d) * 6 + Z.nobetNo(d);
  if (p.tezgahNobet == null) p.tezgahNobet = nb;
  if (p.tezgahNobet === nb) return 0;
  p.tezgahNobet = nb;
  if (!iskeleAcik(d)) return 0;
  const alici = 1 + Math.floor(((d.koloni.nufus && d.koloni.nufus.toplam) || 0) / 8) + Math.floor((d.yer ? d.yer.katilan.length : 0) / 4);
  let gelir = 0;
  const g = Z.gun(d);
  if (p.tezgahGun !== g) {
    p.tezgahGun = g;
    p.tezgahBugun = 0;
  }
  for (const k of Object.keys(p.tezgah)) {
    const kalan = TEZGAH_GUNLUK_TAVAN - p.tezgahBugun - gelir;
    if (kalan <= 0) break;
    const n = Math.min(p.tezgah[k], alici, Math.floor(kalan / Math.max(1, tezgahFiyati(d, k))));
    if (n <= 0) continue;
    gelir += n * tezgahFiyati(d, k);
    p.tezgah[k] -= n;
    if (p.tezgah[k] <= 0) delete p.tezgah[k];
  }
  if (gelir > 0) {
    ZN.hazirla(d);
    gelir = Math.round(gelir * 10) / 10;
    d.para.gk += gelir;
    p.tezgahBugun = (p.tezgahBugun || 0) + gelir;
    p.tezgahGelir = Math.round(((p.tezgahGelir || 0) + gelir) * 10) / 10;
  }
  return gelir;
}
export function tezgahMenu(d) {
  const p = durum(d);
  const l = satilabilirler(d);
  const tz = Object.keys(p.tezgah);
  return {
    baslik: 'Koloni tezgâhı',
    giris: (tz.length ? 'Tezgâhta: ' + tz.map((k) => p.tezgah[k] + ' ' + YR.varlikAdi(k)).join(', ') + '. ' : 'Tezgâh boş. ') + 'Her nöbet yerleşimciler ve uğrayan küçük botlar alır' + (YR.kademe(d, 'mateo') >= 2 ? '; Mateo\'nun pazarlığıyla yüzde on fazla' : '') + '. Bugüne kadar ' + (p.tezgahGelir || 0) + ' kredi kazandırdı.',
    ogeler: [
      ...tz.map((k) => ({ id: 'g_' + k, etiket: YR.varlikAdi(k) + ' tezgâhtan geri al (' + p.tezgah[k] + ')', geri: true, yap: (x) => tezgahAl(x, k) })),
      ...l.filter((k) => satilir(k)).slice(0, 20).map((k) => ({ id: 'k_' + k, etiket: YR.varlikAdi(k) + ' koy: elinde ' + Math.floor(YR.varlik(d, k)) + ', tanesi yaklaşık ' + tezgahFiyati(d, k), alt: (x) => ({
        baslik: YR.varlikAdi(k),
        giris: 'Kaç tane konsun?',
        ogeler: [1, 5, 10, 9999].map((n) => ({ id: 'n' + n, etiket: n === 9999 ? 'Hepsi' : n + ' tane', geri: true, yap: (z) => tezgahKoy(z, k, n) })),
      }) })),
    ],
  };
}

// Her karede: sabah panoyu yenile, Orin'in gelişi ve gidişi, tezgâh satışı
export function pazarIlerle(d) {
  const olaylar = [];
  if (panoAcik(d)) {
    const r = panoYenile(d);
    if (r && r.yeni && r.yeni.length) {
      const ozel = r.yeni.filter((x) => x.kanal === 1);
      SB.haber(d, 'İlan panosuna ' + r.yeni.length + ' yeni ilan asıldı' + (ozel.length ? '; ' + ozel.map((x) => YR.kisaAdi(x.isteyen)).join(' ve ') + ' senden bir şey istiyor' : '') + '.');
    }
  }
  olaylar.push(...orinIlerle(d));
  tezgahIlerle(d);
  return olaylar;
}

// --- Noktalar ---
export function noktaMi(id) {
  return id === 'ilan_panosu' || id === 'orin_gemisi' || id === 'koloni_tezgahi';
}
export function noktaEylemleri(d, id) {
  if (id === 'ilan_panosu') return [{ id: 'pz_pano', etiket: 'İlanları oku' }, { id: 'incele', etiket: 'İncele' }];
  if (id === 'orin_gemisi') return [{ id: 'pz_orin', etiket: 'Orin ile ticaret' }, { id: 'incele', etiket: 'İncele' }];
  return [{ id: 'pz_tezgah', etiket: 'Tezgâh' }, { id: 'incele', etiket: 'İncele' }];
}
export function ekEylemler(d, id) {
  if ((id === 'meydan_terminali' || id === 'terminal') && panoAcik(d)) return [{ id: 'pz_pano', etiket: 'İlan panosu', ipucu: d.pazar && d.pazar.pano.length ? d.pazar.pano.length + ' ilan.' : '' }];
  return [];
}
export function ekEylemMi(eylemId) {
  return eylemId === 'pz_pano' || eylemId === 'pz_orin' || eylemId === 'pz_tezgah';
}
export function eylemUygula(d, id, eylemId) {
  if (eylemId === 'pz_pano') return { agac: (x) => panoMenu(x) };
  if (eylemId === 'pz_orin') return { agac: (x) => orinMenu(x) };
  if (eylemId === 'pz_tezgah') return { agac: (x) => tezgahMenu(x) };
  if (id === 'ilan_panosu') return { metin: 'Yerleşimcilerin ve gelen gemilerin istek astığı ışıklı metal pano. Gündüz plakalar tıkırdıyor, gece fener vızıldıyor.' };
  if (id === 'orin_gemisi') return { metin: ORIN.tarif + ' Gemisi iskelede; ambar kapakları açık.' };
  return { metin: 'Koloninin kendi satış tezgâhı. Fazla malını koyarsın, her nöbet alıcılar gelir.' };
}

// Paket 1 bölüm 6 "Görev al": yerleşimci kendi şablonlarından birini panoya asar (pano doluysa olmaz)
export function gorevAl(d, id) {
  const p = durum(d);
  if (!panoAcik(d)) return { metin: YR.kisaAdi(id) + ': "Meydanda ilan panosu kurulunca isteklerimi oraya asarım Kaptan."' };
  if (kisininIstegi(d, id)) return { metin: 'Zaten panoda bir isteği var.' };
  if (p.pano.length >= PANO_EN_COK) return { metin: 'İlan panosu dolu; önce bir ilanı teslim et ya da kaldır.', ses: 'red' };
  const x = istekUret(d, basamak(d), id);
  if (!x) return { metin: YR.kisaAdi(id) + ': "Şimdilik bir şeye ihtiyacım yok, sağ ol."' };
  p.pano.push(x);
  return { metin: YR.kisaAdi(id) + ' panoya bir istek astı. ' + istekMetni(d, x) };
}
YR.KISI_EKLERI.push((d, id) => {
  const x = kisininIstegi(d, id);
  if (x) return [{ id: 'istek', etiket: 'İsteği: ' + x.ad, alt: (z) => istekKarti(z, x.no) }];
  return panoAcik(d) ? [{ id: 'gorev_al', etiket: 'Görev al', ipucu: 'Ondan bir istek al; ilan panosuna asılır.', yap: (z) => gorevAl(z, id) }] : [];
});

// Yerleşim panosu: ilan panosu ve kasa
YR.PANEL_EKLERI.push((d) => (panoAcik(d) ? [{ id: 'pano', etiket: 'İlan panosu' + (d.pazar && d.pazar.pano.length ? ', ' + d.pazar.pano.length + ' ilan' : ''), alt: (x) => panoMenu(x) }] : []));
