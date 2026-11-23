// Yerleşim binalarının üretim tezgâhları ve işlevleri (belgeler/v5 Paket 12), gündelik imalat zinciri (Paket 10 bölüm 3,
// Paket 5 bölüm 3.2), kategorili koloni çantası (Paket 10 bölüm 5) ve Malazar büyü tozuyla açılan rezonans sunağı
// (Paket 10 bölüm 2, Paket 12 bölüm 4).
//
// Bina içi standart sıra (Paket 12 bölüm 5): her binanın köşesinde önce "Üretim ve işlev tezgâhları", sonra "Şu an
// binadaki yerleşimciler", sonra "Bina durumu ve yükseltme" (yerlesim.js noktaEylemleri; buradaki TEZGAH kancası).
// Üretim anında olur; her tarifte "bir kez", "beş kez" ve "ilan panosundaki eksik istekler için gereken kadar".
//
// Tarif: { bina: [bina], tezgah, girdi: [[[seçenekler], adet]], cikti: {kimlik: adet}, kisi: [katılmış olmalı] }
// Bir girdinin seçeneklerinden elde yeteri olan ilki harcanır (ör. arpa yoksa akifer buğdayı; süt yoksa soya-kazein).
import * as Z from '../zaman';
import * as ZN from '../tonoflenya/zanaat';
import * as SB from '../tonoflenya/subay';
import * as YR from '../yerlesim/yerlesim';
import * as PZ from '../yerlesim/pazar';
import * as SH from '../saha/saha';
import { YERLESIM_BINALARI, YERLESIMCILER, DEKORLAR } from '../yerlesim/veri';
import { HAMMADDELER, HAMMADDE_SIRASI } from '../veri/tesisler';
import { PARCALAR } from '../veri/uretim';
import { BITKILER } from '../tarim/bitkiler';
import { tarim } from '../tarim/tarim';
import { GUNLUK, SEKMELER, REZONANS_NOTU, rezonansMi, sekmesi } from './esya';

const BALIK = ['sazan', 'gol_baligi', 'yilan_baligi'];
// 4.5 kancaları: hobi.js (aşçılık ritmi, beste, zar) tarif ve tezgâh menülerine öğe ekler
export const TARIF_EKLERI = [];
export const TEZGAH_EKLERI = [];
const UN = ['urun_arpa', 'urun_akifer'];
export const TEZGAHLAR = {
  kamp: { ates: { ad: 'Ateş başı', ses: 'el_tz_ocak', tarif: 'Taşların üstünde bir kazan ve ızgara: basit kamp yemeği, sıcak su kaynatma.' } },
  ashane: {
    firin: { ad: 'Taş fırın', ses: 'el_tz_firin', tarif: 'Ekmek, börek ve kurutma rafı.' },
    ocak: { ad: 'Ocak ve demlik', ses: 'el_tz_ocak', tarif: 'Çay, kahve, çorba, konserve ve baharat.' },
  },
  atolye: {
    firin: { ad: 'Döküm fırını', ses: 'el_tz_firin', tarif: 'Tuğla, kiremit, seramik ve kalın cam.' },
    marangoz: { ad: 'Marangoz tezgâhı', ses: 'el_tz_marangoz', tarif: 'Kereste kalası, odun kömürü, oyuncak, müzik kutusu, akvaryum.' },
    ors: { ad: 'Örs', ses: 'el_tz_ors', tarif: 'Kazma, balta, fener, olta, çanta; tamir kiti, çivi ve menteşe, düğün yüzüğü.' },
    dokuma: { ad: 'Dokuma tezgâhı', ses: 'el_tz_dokuma', tarif: 'Gömlek, şal, çocuk kıyafeti, halat, eldiven, saha çantası, battaniye.' },
  },
  tapinak: {
    tutsu: { ad: 'Tütsü ve tılsım masası', ses: 'el_tz_tutsu', tarif: 'Huzur tütsüsü, bağ tılsımı, gümüş takı.' },
    sunak: { ad: 'Büyü ve rezonans sunağı', ses: 'el_tz_tutsu', tarif: 'Kilitli: Malazar büyü tozuyla açılır.' },
  },
  okul: {
    yazi: { ad: 'Yazı ve arşiv masası', ses: 'el_tz_yazi', tarif: 'Ders defteri ve kalem, arşiv mühür kutusu.' },
    sunak: { ad: 'Akademi kolu: büyü ve rezonans bölümü', ses: 'el_tz_yazi', tarif: 'Kilitli: Malazar büyü tozuyla açılır.' },
  },
  gozlem: {
    can: { ad: 'Çan atölyesi', ses: 'el_tz_can', tarif: 'Kristal çan, rüzgâr çanı, rezonans lambası, fener yağı, kristal pusula.' },
    yanki: { ad: 'Harmonik yankı odası', ses: 'el_tz_can', tarif: 'Kilitli; ileride piezo kristal ve ışık otuyla ses dalgası modülleri.' },
  },
  hamam: { lab: { ad: 'Şifa labı', ses: 'el_tz_lab', tarif: 'Sabun, aroma yağı, sakinleştirici çay, antikor iksiri.' } },
  taverna: { ikram: { ad: 'İkram servisi', ses: 'el_secim', tarif: 'Börek, şerbet, çay ya da kahve ikram et.' } },
  dunya_konut: { ev: { ad: 'Ev içi dinlenme', ses: 'el_secim', tarif: 'Bir koltuk, bir sıcak içecek.' } },
  kubbe_ev: { ev: { ad: 'Kubbede dinlenme', ses: 'el_secim', tarif: 'Yıldız ışığı süzülen kubbede sakin bir nefes.' } },
};

const T = (bina, tezgah, girdi, cikti, ek = {}) => ({ bina: Array.isArray(bina) ? bina : [bina], tezgah, girdi, cikti, ...ek });
export const TARIFLER = {
  // Kamp ateşi
  kamp_yemegi: T('kamp', 'ates', [[[...BALIK, 'yengec'], 1], [['kiyi_kerestesi', 'komur'], 1]], { kamp_yemegi: 1 }),
  sicak_su: T('kamp', 'ates', [[['kiyi_kerestesi', 'komur'], 1]], { saf_su: 3 }, { ad: 'Sıcak su kaynat' }),
  // Aşhane: taş fırın
  ekmek: T('ashane', 'firin', [[UN, 2], [['deniz_tuzu'], 1]], { ekmek: 3 }),
  borek: T('ashane', 'firin', [[UN, 2], [['xeno_sut', 'xeno_yumurta', 'urun_soya'], 1], [['urun_vaha_hurmasi', 'bal'], 1]], { borek: 2 }),
  kuru_meyve: T('ashane', 'firin', [[['urun_vaha_hurmasi'], 1], [['urun_tatli_kok'], 1]], { kuru_meyve: 3 }),
  // Aşhane: ocak
  dunya_cayi: T('ashane', 'ocak', [[['urun_cay_yapragi'], 1]], { dunya_cayi: 3 }),
  kavrulmus_kahve: T('ashane', 'ocak', [[['urun_noro_kahve', 'urun_arpa'], 1], [['komur'], 1]], { kavrulmus_kahve: 2 }),
  balik_corbasi: T('ashane', 'ocak', [[BALIK, 1], [['urun_tatli_kok'], 1], [['deniz_tuzu'], 1]], { balik_corbasi: 2 }),
  balik_konservesi: T('ashane', 'ocak', [[BALIK, 2], [['deniz_tuzu'], 1], [['cam'], 1]], { balik_konservesi: 2 }),
  baharat: T('ashane', 'ocak', [[['deniz_tuzu'], 2], [['urun_kristal_cicek'], 1], [['urun_tatli_kok'], 1]], { baharat: 3 }),
  vaha_tabagi: T('ashane', 'ocak', [[['urun_vaha_hurmasi'], 2], [['bal'], 1], [['baharat'], 1]], { vaha_tabagi: 1 }, { kisi: ['sorya'] }),
  // 4.5: hayvan ürünleri (v5 Paket 15 bölüm 3) ve göl avı (Paket 3B hobi 1)
  peynir: T('ashane', 'ocak', [[['xeno_sut', 'sifali_sut'], 2]], { peynir: 1 }),
  sutlu_cay: T('ashane', 'ocak', [[['dunya_cayi'], 1], [['xeno_sut'], 1]], { sutlu_cay: 2 }),
  kahvalti: T('ashane', 'firin', [[['bal', 'aether_bali'], 1], [['ekmek', 'borek'], 1], [['peynir', 'xeno_yumurta'], 1]], { kahvalti: 1 }),
  kseno_guvec: T('ashane', 'ocak', [[['kseno_eti'], 1], [['urun_tatli_kok', 'urun_don_kiran'], 1], [['baharat', 'deniz_tuzu'], 1]], { kseno_guvec: 2 }),
  sakin_cay: T(['ashane', 'hamam'], 'ocak', [[['urun_kristal_cicek'], 1], [['bal'], 1]], { sakin_cay: 2 }, { tezgahlar: { hamam: 'lab' } }),
  // Atölye: fırın
  tugla: T('atolye', 'firin', [[['ham_kil'], 2], [['komur'], 1]], { tugla: 4 }),
  seramik_canak: T('atolye', 'firin', [[['ham_kil'], 3]], { seramik_canak: 2 }),
  kalin_cam: T('atolye', 'firin', [[['kuvars_kumu'], 2], [['komur'], 1]], { cam: 2 }, { ad: 'Kalın pencere camı' }),
  // Atölye: marangoz
  kereste_kalasi: T('atolye', 'marangoz', [[['kiyi_kerestesi'], 2]], { kereste: 2 }, { ad: 'İşlenmiş kereste kalası' }),
  odun_komuru: T('atolye', 'marangoz', [[['kiyi_kerestesi'], 2]], { komur: 2 }, { ad: 'Odun kömürü' }),
  oyuncak: T('atolye', 'marangoz', [[['kereste'], 1], [['recine'], 1]], { oyuncak: 2 }, { kisi: ['veysel'] }),
  muzik_kutusu: T('atolye', 'marangoz', [[['kereste'], 2], [['bakir'], 2], [['kristal', 'piezo'], 1]], { muzik_kutusu: 1 }, { kisi: ['veysel', 'kaelon'] }),
  akvaryum: T('atolye', 'marangoz', [[['cam'], 3], [['gol_baligi', 'sazan'], 1]], { akvaryum: 1 }, { kisi: ['veysel', 'siravel'] }),
  // Atölye: örs (aletler saha.js aletMenu)
  tamir_kiti: T('atolye', 'ors', [[['demir_cevheri'], 2], [['urun_pamuk_keten', 'bitkisel_lif'], 1], [['recine'], 1]], { tamir_kiti: 1 }, { kisi: ['kaelon'] }),
  demir_takim: T('atolye', 'ors', [[['demir_cevheri'], 2], [['komur'], 1]], { demir_takim: 3 }),
  dugun_yuzugu: T('atolye', 'ors', [[['gumus_tozu'], 3], [['piezo'], 1]], { dugun_yuzugu: 1 }),
  // Atölye: dokuma
  keten_gomlek: T('atolye', 'dokuma', [[['urun_pamuk_keten'], 2], [['bitkisel_lif'], 1]], { keten_gomlek: 1 }),
  cocuk_kiyafeti: T('atolye', 'dokuma', [[['urun_pamuk_keten'], 1], [['bitkisel_lif'], 1]], { cocuk_kiyafeti: 1 }),
  sal: T('atolye', 'dokuma', [[['urun_pamuk_keten'], 2]], { sal: 1 }),
  halat: T('atolye', 'dokuma', [[['bitkisel_lif'], 3]], { halat: 2 }),
  is_eldiveni: T('atolye', 'dokuma', [[['bitkisel_lif'], 1], [['urun_pamuk_keten'], 1]], { is_eldiveni: 2 }),
  saha_cantasi: T('atolye', 'dokuma', [[['urun_pamuk_keten'], 2], [['halat'], 1], [['bakir'], 1]], { saha_cantasi: 1 }),
  yun_battaniye: T('atolye', 'dokuma', [[['xeno_yun', 'isildayan_yun'], 3]], { yun_battaniye: 1 }, { hayvan: true }),
  festival_kiyafeti: T('atolye', 'dokuma', [[['malken_ipegi'], 2], [['isildayan_yun', 'xeno_yun'], 1]], { festival_kiyafeti: 1 }, { hayvan: true }),
  // Tapınak
  huzur_tutsusu: T('tapinak', 'tutsu', [[['urun_kristal_cicek'], 1], [['recine'], 1]], { huzur_tutsusu: 2 }),
  bag_tilsimi: T('tapinak', 'tutsu', [[['saf_aether'], 1], [['urun_kristal_cicek'], 1], [['gumus_tozu'], 1]], { bag_tilsimi: 1 }),
  malken_takisi: T('tapinak', 'tutsu', [[['gumus_tozu'], 2], [['urun_kristal_cicek'], 1]], { malken_takisi: 1 }),
  malazar_buyu_tozu: T(['tapinak', 'okul'], 'sunak', [[['malazar_asasi'], 1], [['malazar_kristali'], 2]], { malazar_buyu_tozu: 1 }),
  // Okul
  ders_defteri: T('okul', 'yazi', [[['bitkisel_lif'], 2], [['urun_fosforlu_liken'], 1]], { ders_defteri: 2 }),
  muhur_kutusu: T('okul', 'yazi', [[['kereste'], 1], [['gumus_tozu'], 1], [['fosil'], 1]], { muhur_kutusu: 1 }, { kisi: ['zarek', 'defne'] }),
  // Gözlem tepesi ve çan atölyesi
  kristal_can: T('gozlem', 'can', [[['bakir'], 2], [['piezo'], 1]], { kristal_can: 1 }),
  ruzgar_cani: T('gozlem', 'can', [[['kereste'], 1], [['kristal_can'], 1]], { ruzgar_cani: 1 }, { kisi: ['julian'] }),
  rezonans_lambasi: T('gozlem', 'can', [[['cam'], 1], [['urun_fosforlu_liken'], 1], [['bakir'], 1]], { rezonans_lambasi: 1 }),
  fener_yagi: T('gozlem', 'can', [[['urun_isik_otu', 'isi_yagi'], 1], [['recine'], 1]], { fener_yagi: 2 }),
  kristal_pusula: T('gozlem', 'can', [[['bakir'], 1], [['piezo'], 1], [['cam'], 1]], { kristal_pusula: 1 }),
  // Termal şifa hamamı ve şifa labı
  sabun: T('hamam', 'lab', [[['recine'], 1], [['deniz_tuzu'], 1]], { sabun: 3 }),
  aroma_yagi: T('hamam', 'lab', [[['urun_kristal_cicek'], 1], [['urun_isik_otu'], 1]], { aroma_yagi: 1 }),
  aether_surubu: T('hamam', 'lab', [[['aether_bali'], 1], [['saf_su'], 1]], { vaha_surubu: 1 }, { ad: 'Aether balından şifa şurubu' }),
  antikor_iksiri: T('hamam', 'lab', [[['sifali_mantar'], 2], [['hamam_minerali'], 1]], { antikor_iksiri: 1 }),
};

// Rezonans sunağı açılınca (bayrak.rezonansSunagi) işlenen tılsımlar: süreli koloni etkileri (zaman.js etkiKoy)
export const TILSIMLAR = {
  koruma: { ad: 'Koloni koruma tılsımı', girdi: { saf_aether: 2, cekirdek_tasi: 1, urun_kristal_cicek: 1 }, etki: 'koruma', gun: 7, tarif: 'Yedi gün radyasyon fırtınaları koloninin moralini düşürmez.' },
  bereket: { ad: 'Hızlı büyüme tılsımı', girdi: { urun_kristal_cicek: 2, urun_isik_otu: 2, aether: 1 }, etki: 'tarimHiz', gun: 3, tarif: 'Üç gün sera ve vahadaki bitkiler yüzde otuz hızlı büyür.' },
  maden: { ad: 'Maden şansı tılsımı', girdi: { cekirdek_tasi: 1, piezo: 2, urun_fosforlu_liken: 1 }, etki: 'madenSansi', gun: 3, tarif: 'Üç gün maden ve kıyı düğümlerinden birer fazla ürün çıkar.' },
};

// --- Yardımcılar ---
const varlik = (d, k) => YR.varlik(d, k);
const ekle = (d, k, n) => YR.varlikEkle(d, k, n);
const adi = (k) => YR.varlikAdi(k);
const yerVar = (d, b) => b === 'kamp' || YR.yerVar(d, b);
export function tarifAdi(id) {
  const t = TARIFLER[id];
  return t.ad || adi(Object.keys(t.cikti)[0]);
}
function tezgahi(t, bina) {
  return (t.tezgahlar && t.tezgahlar[bina]) || t.tezgah;
}
// Girdiyi elde olana göre çöz: { kimlik: adet } ya da eksik listesi
export function girdiCoz(d, id, kat = 1) {
  const t = TARIFLER[id];
  const g = {};
  const eksik = [];
  for (const [secenek, n] of t.girdi) {
    const gerek = n * kat;
    const k = secenek.find((x) => varlik(d, x) - (g[x] || 0) >= gerek);
    if (k) g[k] = (g[k] || 0) + gerek;
    else eksik.push(gerek - Math.max(...secenek.map((x) => varlik(d, x))) + ' ' + secenek.map(adi).join(' ya da '));
  }
  return { g, eksik };
}
function girdiMetni(t) {
  return t.girdi.map(([s, n]) => n + ' ' + s.map(adi).join(' ya da ')).join(', ');
}
function ciktiMetni(t, kat = 1) {
  return Object.keys(t.cikti).map((k) => t.cikti[k] * kat + ' ' + adi(k)).join(', ');
}
export function kisiEngeli(d, id) {
  const t = TARIFLER[id];
  if (t.hayvan && !d.bayrak.barinak) return 'Bu iş hayvan ürünleri ister; ilk bölgede bilinen hayvan yok. Biyo-kubbede kuluçka ve barınak kurulunca açılır.';
  const yok = (t.kisi || []).filter((k) => !YR.katildiMi(d, k));
  return yok.length ? 'Bu iş ' + yok.map(YR.kisaAdi).join(' ve ') + ' kolonideyken yapılabilir.' : null;
}
// Paket 12 bölüm 5: "eksik istek için gereken kadar" — panodaki isteklerin bu tarifin çıktısındaki eksikleri
export function istekIcinKat(d, id) {
  const t = TARIFLER[id];
  const pano = (d.pazar && d.pazar.pano) || [];
  let kat = 0;
  for (const k of Object.keys(t.cikti)) {
    let gerek = 0;
    for (const x of pano) if (x.istenen && x.istenen[k]) gerek += x.istenen[k];
    const eksik = gerek - varlik(d, k);
    if (eksik > 0) kat = Math.max(kat, Math.ceil(eksik / t.cikti[k]));
  }
  return kat;
}
export function uret(d, id, kat = 1, bina) {
  const t = TARIFLER[id];
  if (!t) return { metin: '', ses: 'red' };
  const b = bina || t.bina.find((x) => yerVar(d, x));
  if (!b || !yerVar(d, b)) return { metin: tarifAdi(id) + ' için ' + t.bina.map((x) => YERLESIM_BINALARI[x].ad).join(' ya da ') + ' gerekir.', ses: 'red' };
  const k = kisiEngeli(d, id);
  if (k) return { metin: k, ses: 'red' };
  const { g, eksik } = girdiCoz(d, id, kat);
  if (eksik.length) return { metin: 'Eksik: ' + eksik.join(', ') + '. Tarif: ' + girdiMetni(t) + '.', ses: 'red' };
  for (const x of Object.keys(g)) ekle(d, x, -g[x]);
  for (const x of Object.keys(t.cikti)) ekle(d, x, t.cikti[x] * kat);
  (d.uretilenTarif || (d.uretilenTarif = {}))[id] = 1; // 4.7: görev ağı
  const tz = TEZGAHLAR[b] && TEZGAHLAR[b][tezgahi(t, b)];
  const son = Object.keys(t.cikti).map((x) => adi(x) + ' ' + varlik(d, x)).join(', ');
  return { metin: ciktiMetni(t, kat) + ' üretildi. Harcanan: ' + Object.keys(g).map((x) => g[x] + ' ' + adi(x)).join(', ') + '. Elinde: ' + son + '.', ses: tz ? tz.ses : 'kur' };
}

// --- Rezonans sunağı ---
export const sunakAcik = (d) => !!d.bayrak.rezonansSunagi;
export function sunagiAc(d) {
  if (sunakAcik(d)) return { metin: 'Sunak zaten açık.' };
  if (varlik(d, 'malazar_buyu_tozu') < 1) return { metin: 'Önce Malazar büyü tozu üretilmeli: bir Malazar asası ve iki Malazar büyü kristali. Bunlar çok seyrek, Kaptan Orin\'in gemisinde çıkar.', ses: 'red' };
  ekle(d, 'malazar_buyu_tozu', -1);
  d.bayrak.rezonansSunagi = true;
  return { metin: 'Malazar büyü tozu sunağın oyuklarına serpiliyor. Mor bir ışık taşların arasından süzülüp tapınağın kubbesinde ve akademinin dersliğinde aynı anda yankılanıyor. Büyü ve ileri rezonans bölümü açıldı: biriktirdiğin Ham Rezonans eşyalarıyla tılsımlar işlenebilir.', ses: 'el_tz_tutsu' };
}
export function tilsimIsle(d, id) {
  const x = TILSIMLAR[id];
  if (!sunakAcik(d)) return { metin: 'Sunak kilitli.', ses: 'red' };
  const e = Object.keys(x.girdi).filter((k) => varlik(d, k) < x.girdi[k]);
  if (e.length) return { metin: 'Eksik: ' + e.map((k) => x.girdi[k] - varlik(d, k) + ' ' + adi(k)).join(', ') + '.', ses: 'red' };
  for (const k of Object.keys(x.girdi)) ekle(d, k, -x.girdi[k]);
  Z.etkiKoy(d, x.etki, x.gun * Z.GUN_SN);
  return { metin: x.ad + ' işlendi. ' + x.tarif, ses: 'el_tz_tutsu' };
}
function sunakMenu(d, bina) {
  const tz = TEZGAHLAR[bina].sunak;
  if (!sunakAcik(d)) {
    return {
      baslik: tz.ad,
      giris: 'Bu bölüm kilitli. Açılması için Malazar Dağı\'ndan gelen bir Malazar asası ve iki üç Malazar büyü kristaliyle Malazar büyü tozu üretilmelidir. Bugün hiçbir bina büyü üretmez; Ham Rezonans etiketli eşyaları biriktirebilirsin.',
      ogeler: [
        tarifOgesi(d, 'malazar_buyu_tozu', bina),
        { id: 'ac', etiket: 'Sunağı büyü tozuyla aç', ipucu: 'Elinde Malazar büyü tozu ' + varlik(d, 'malazar_buyu_tozu') + '.', yap: (x) => sunagiAc(x), geri: true },
      ],
    };
  }
  return {
    baslik: tz.ad,
    giris: 'Sunak açık. Ham Rezonans eşyalarından süreli tılsımlar işlenir.' + etkiMetni(d),
    ogeler: Object.keys(TILSIMLAR).map((k) => ({ id: 't_' + k, etiket: TILSIMLAR[k].ad + ': ' + Object.keys(TILSIMLAR[k].girdi).map((m) => TILSIMLAR[k].girdi[m] + ' ' + adi(m)).join(', '), ipucu: TILSIMLAR[k].tarif, yap: (x) => tilsimIsle(x, k), geri: true })),
  };
}
function etkiMetni(d) {
  const l = [];
  for (const k of Object.keys(TILSIMLAR)) {
    const e = TILSIMLAR[k].etki;
    if (Z.etkiVar(d, e)) l.push(TILSIMLAR[k].ad + ' ' + Math.max(1, Math.ceil((d.etkiler[e] - d.zaman.sn) / Z.GUN_SN)) + ' gün');
  }
  return l.length ? ' Süren: ' + l.join(', ') + '.' : '';
}

// --- İşlevler: taverna ikramı, evde dinlenme ---
const IKRAMLAR = ['borek', 'erzak_serbet', 'dunya_cayi', 'kavrulmus_kahve', 'vaha_tabagi'];
export function ikramVer(d) {
  const g = Z.gun(d);
  if (d.yer.ikramGun === g) return { metin: 'Bu akşamın ikramı yapıldı; masalar dolu.' };
  const k = IKRAMLAR.find((x) => varlik(d, x) > 0);
  if (!k) return { metin: 'İkram edecek bir şey yok: börek, şerbet, çay ya da kahve gerekir.', ses: 'red' };
  ekle(d, k, -1);
  d.yer.ikramGun = g;
  const julian = YR.katildiMi(d, 'julian') && YR.kisiKonumu(d, 'julian') && YR.kisiKonumu(d, 'julian').mekan === 'taverna';
  const m = 4 * (julian || d.bayrak.yk_julian_10 ? 2 : 1);
  d.koloni.moral = Math.min(100, d.koloni.moral + m);
  return { metin: adi(k) + ' masalara dağıtıldı. ' + (julian ? 'Julian sahnede; ' : '') + 'Koloninin morali ' + m + ' arttı.', ses: 'el_secim' };
}
export function evdeDinlen(d, bina) {
  const g = Z.gun(d);
  if (!d.yer.evGun) d.yer.evGun = {};
  if (d.yer.evGun[bina] === g) return { metin: 'Bugün burada dinlendin zaten.' };
  d.yer.evGun[bina] = g;
  for (const u of d.murettebat || []) u.stres = Math.max(0, (u.stres || 0) - 10);
  if (d.saha) d.saha.yorgunluk = Math.round((d.saha.yorgunluk || 0) / 2);
  return { metin: (bina === 'kubbe_ev' ? 'Kubbenin camından yıldız ışığı süzülüyor; ince bir tını. ' : 'Bir koltuk, bir sıcak içecek, kapı gıcırtısı. ') + 'Mürettebatın stresi on azaldı, yorgunluğun yarıya indi.', ses: 'el_secim' };
}

// --- Menüler ---
function tarifOgesi(d, id, bina) {
  const t = TARIFLER[id];
  const engel = kisiEngeli(d, id);
  return {
    id: 'u_' + id,
    etiket: tarifAdi(id) + (engel ? ', kilitli' : girdiCoz(d, id).eksik.length ? ', malzeme eksik' : ', yapılabilir'),
    ipucu: 'Girdi: ' + girdiMetni(t) + '. Çıktı: ' + ciktiMetni(t) + '.' + (engel ? ' ' + engel : ''),
    alt: (x) => tarifMenu(x, id, bina),
  };
}
export function tarifMenu(d, id, bina) {
  const t = TARIFLER[id];
  const ist = istekIcinKat(d, id);
  const cik = Object.keys(t.cikti)[0];
  const r = rezonansMi(cik) ? ' ' + REZONANS_NOTU : '';
  return {
    baslik: tarifAdi(id),
    giris: 'Girdi: ' + girdiMetni(t) + '. Çıktı: ' + ciktiMetni(t) + '. Elinde ' + varlik(d, cik) + '.' + (ZN.ESYA[cik] && ZN.ESYA[cik].tarif ? ' ' + ZN.ESYA[cik].tarif : '') + r,
    ogeler: [
      { id: 'bir', etiket: 'Bir kez üret', yap: (x) => uret(x, id, 1, bina) },
      { id: 'bes', etiket: 'Beş kez üret', yap: (x) => uret(x, id, 5, bina) },
      ...(ist > 0 ? [{ id: 'istek', etiket: 'İlan panosundaki eksik istekler için gereken kadar üret: ' + ist + ' kez', yap: (x) => uret(x, id, ist, bina) }] : []),
      ...TARIF_EKLERI.flatMap((f) => f(d, id, bina)),
    ],
  };
}
export function tezgahMenu(d, bina, tz) {
  const x = TEZGAHLAR[bina][tz];
  if (tz === 'sunak') return sunakMenu(d, bina);
  if (tz === 'yanki') return { baslik: x.ad, giris: 'Harmonik yankı odası henüz kapalı. İleride piezo kristal ve ışık otuyla ses dalgası temelli araç ve keşif modülleri burada üretilecek.', ogeler: [] };
  if (tz === 'ikram') return { baslik: x.ad, giris: x.tarif, ogeler: [{ id: 'ikram', etiket: 'Akşam ikramını dağıt', ipucu: 'Günde bir; Julian sahnedeyse iki kat moral.', yap: (z) => ikramVer(z), geri: true }] };
  if (tz === 'ev') return { baslik: x.ad, giris: x.tarif + ' Aile evi ve aile kubbesi yükseltmesi koloni nesilleriyle gelir.', ogeler: [{ id: 'dinlen', etiket: 'Biraz dinlen', ipucu: 'Günde bir: stres on azalır, yorgunluk yarıya iner.', yap: (z) => evdeDinlen(z, bina), geri: true }] };
  const l = Object.keys(TARIFLER).filter((id) => TARIFLER[id].bina.includes(bina) && tezgahi(TARIFLER[id], bina) === tz);
  return {
    baslik: x.ad,
    giris: x.tarif + ' ' + l.length + ' tarif.',
    efekt: x.ses,
    ogeler: [
      ...(bina === 'atolye' && tz === 'ors' ? [{ id: 'aletler', etiket: 'El aletleri: yükselt ve bile', alt: (z) => SH.aletMenu(z) }] : []),
      ...l.map((id) => tarifOgesi(d, id, bina)),
    ],
  };
}
export function binaTezgahlari(d, bina) {
  const tz = TEZGAHLAR[bina];
  const b = YERLESIM_BINALARI[bina];
  if (!tz) return { baslik: b ? b.ad : 'Bina', giris: 'Bu binada üretim yok; yönetim ve buluşma yeri.', ogeler: [] };
  const ids = Object.keys(tz);
  const ek = TEZGAH_EKLERI.flatMap((f) => f(d, bina));
  if (ids.length === 1 && !ek.length) return tezgahMenu(d, bina, ids[0]);
  return {
    baslik: 'Üretim ve işlev tezgâhları',
    giris: b.ad + ': ' + (ids.length + ek.length) + ' tezgâh.',
    ogeler: [...ids.map((k) => ({ id: 'tz_' + k, etiket: tz[k].ad, ipucu: tz[k].tarif, alt: (x) => tezgahMenu(x, bina, k) })), ...ek],
  };
}
// Bina durumu ve yükseltme (Paket 12 bölüm 5 üçüncü başlık)
export function binaDurumu(d, bina) {
  const b = YERLESIM_BINALARI[bina];
  const l = [b.ad + (bina === 'kamp' || YR.yerVar(d, bina) ? ', kurulu.' : ', kurulmadı.')];
  const tz = TEZGAHLAR[bina];
  if (tz) l.push('Tezgâhlar: ' + Object.keys(tz).map((k) => tz[k].ad).join(', ') + '.');
  if (bina === 'atolye') {
    if (d.bayrak.yk_kaelon_3 || d.bayrak.yk_veysel_3) l.push('Kaelon ya da Veysel üçüncü kademede: alet bileme ücretsiz.');
    if (d.bayrak.sin_torvok_brom) l.push('Torvok ve Brom birlikte çalışıyor: aletler daha geç körelir.');
  }
  if (bina === 'kamara') l.push('Rafta ' + d.yer.dekorlar.length + ' dekor.' + (d.bayrak.yk_veysel_6 ? ' Veysel altıncı kademede: dinlenme morali iki kat.' : ''));
  if (bina === 'taverna') l.push(d.bayrak.yk_julian_10 ? 'Julian onuncu kademede: akşam morali iki kat.' : 'Julian sahne aldığında ikram morali iki kat.');
  if (bina === 'hamam') l.push(d.bayrak.yk_siravel_10 || d.bayrak.sin_lyris_siravel ? 'Sira-Vel ve Lyris: stres tek ziyarette sıfırlanır.' : 'Aroma yağıyla yıkanınca stres tamamen silinir.');
  if (bina === 'dunya_konut' || bina === 'kubbe_ev') l.push('Aile evi ve aile kubbesi yükseltmesi koloni nesilleri ve evlilikle açılır.');
  if (bina === 'tapinak' || bina === 'okul') l.push(sunakAcik(d) ? 'Büyü ve rezonans sunağı açık.' + etkiMetni(d) : 'Büyü ve rezonans bölümü kilitli; Malazar büyü tozu gerekir.');
  if (bina === 'gozlem') l.push('Harmonik yankı odası kilitli.');
  return { metin: l.join(' ') };
}

// --- Kategorili koloni çantası (Paket 10 bölüm 5) ---
function cantaKalemleri(d, sekme) {
  const l = [];
  for (const h of HAMMADDE_SIRASI) if ((d.koloni.kaynaklar[h] || 0) >= 1 && sekmesi(h) === sekme) l.push(h);
  for (const p of ['cam', 'kablo', 'plaka']) if ((d.koloni.parcalar[p] || 0) > 0 && sekme === 2) l.push(p);
  const t = d.tarim;
  if (t) {
    for (const b of Object.keys(t.urun || {})) if (t.urun[b] > 0 && BITKILER[b] && sekmesi('urun_' + b) === sekme) l.push('urun_' + b);
    if (sekme === 1) for (const e of Object.keys(t.erzak || {})) if (t.erzak[e] > 0) l.push('erzak_' + e);
  }
  for (const k of Object.keys(GUNLUK)) if (varlik(d, k) > 0 && GUNLUK[k].sekme === sekme) l.push(k);
  if (sekme === 4) for (const k of ['malazar_asasi', 'malazar_kristali', 'bal', 'saf_su']) if (varlik(d, k) > 0) l.push(k);
  return l;
}
export function kalemSatiri(d, k) {
  return adi(k) + ', ' + Math.floor(varlik(d, k)) + (rezonansMi(k) ? ', Ham Rezonans' : '');
}
export function cantaMenu(d, sekme = 0) {
  const l = cantaKalemleri(d, sekme);
  const sonraki = (sekme + 1) % SEKMELER.length;
  const onceki = (sekme + SEKMELER.length - 1) % SEKMELER.length;
  return {
    baslik: 'Koloni çantası, ' + (sekme + 1) + '. ' + SEKMELER[sekme],
    giris: (l.length ? l.length + ' kalem.' : 'Bu bölmede bir şey yok.') + ' İki parmakla sağa kaydır: sonraki bölme.',
    ikiParmak: { sag: (x) => cantaMenu(x, sonraki), sol: (x) => cantaMenu(x, onceki), ses: 'el_sayfa' },
    ogeler: [
      ...l.map((k) => ({ id: 'c_' + k, etiket: kalemSatiri(d, k), ipucu: kalemTarifi(k), alt: (x) => kalemMenu(x, k, sekme) })),
      { id: 'sonraki', etiket: 'Sonraki bölme: ' + SEKMELER[sonraki], alt: (x) => cantaMenu(x, sonraki), efekt: 'el_sayfa' },
    ],
  };
}
function kalemTarifi(k) {
  const e = ZN.ESYA[k];
  const t = e ? e.tarif : HAMMADDELER[k] ? HAMMADDELER[k].tarif : PARCALAR[k] ? PARCALAR[k].tarif : k.indexOf('urun_') === 0 && BITKILER[k.slice(5)] ? BITKILER[k.slice(5)].ad + ' hasadı.' : '';
  return (t || '') + (rezonansMi(k) ? ' ' + REZONANS_NOTU : '');
}
const KULLAN_ETIKETI = { tuy: 'Kamaranın yatağına koy', ye: 'Ye', ic: 'İç', yak: 'Yak', sefer: 'Sefer erzağına koy', fener: 'Fenere doldur', onar: 'Aletleri onar', dekor: 'Kamaranın rafına koy', yikan: 'Hamamda kullan', ilac: 'İç: zehre karşı korun' };
function kalemMenu(d, k, sekme) {
  const e = GUNLUK[k];
  const ogeler = [];
  if (e && e.kullan) ogeler.push({ id: 'kullan', etiket: KULLAN_ETIKETI[e.kullan], yap: (x) => kullan(x, k), geri: true });
  const uretenler = Object.keys(TARIFLER).filter((id) => TARIFLER[id].cikti[k]);
  for (const id of uretenler) ogeler.push({ id: 'n_' + id, etiket: 'Nasıl yapılır: ' + TARIFLER[id].bina.map((b) => YERLESIM_BINALARI[b].ad).join(' ya da '), yap: () => ({ metin: tarifAdi(id) + ': ' + girdiMetni(TARIFLER[id]) + ' → ' + ciktiMetni(TARIFLER[id]) + '.' }) });
  return { baslik: adi(k), giris: kalemSatiri(d, k) + '. ' + kalemTarifi(k), ogeler };
}

// --- Kullanım etkileri ---
const YEMEK = {
  ekmek: { moral: 1, yorgunluk: -30 },
  balik_corbasi: { moral: 2, yorgunluk: -100 },
  borek: { moral: 3, yorgunluk: -20 },
  vaha_tabagi: { moral: 8, yorgunluk: -40 },
  kuru_meyve: { yorgunluk: -20 },
  kamp_yemegi: { yorgunluk: -50 },
  dunya_cayi: { moral: 1, stres: -10 },
  kavrulmus_kahve: { yorgunluk: -40 },
  sakin_cay: { stres: -25 },
  peynir: { moral: 2, yorgunluk: -20 },
  sutlu_cay: { moral: 1, stres: -12 },
  kahvalti: { moral: 6, yorgunluk: -50 },
  kseno_guvec: { moral: 7, yorgunluk: -100 },
  sifali_sut: { stres: -30 },
};
export function kullan(d, k) {
  const e = GUNLUK[k];
  if (!e || !e.kullan || varlik(d, k) < 1) return { metin: 'Elinde ' + adi(k) + ' yok.', ses: 'red' };
  const tur = e.kullan;
  const sonra = (metin, ses) => ({ metin, ses: ses || 'el_secim' });
  if (tur === 'dekor') {
    if (!YR.yerVar(d, 'kamara')) return { metin: 'Önce Kaptanın Kamarası kurulmalı.', ses: 'red' };
    if (d.yer.dekorlar.includes(k)) return { metin: DEKORLAR[k].ad + ' zaten rafta.' };
    ekle(d, k, -1);
    d.yer.dekorlar.push(k);
    return sonra(adi(k) + ' kamaranın rafına yerleştirildi. ' + DEKORLAR[k].tarif, 'kur');
  }
  if (tur === 'tuy') {
    if (d.bayrak.kamaraTuy) return { metin: 'Yatağın zaten kaz tüyü yastıklı.' };
    if (!YR.yerVar(d, 'kamara')) return { metin: 'Önce Kaptanın Kamarası kurulmalı.', ses: 'red' };
    ekle(d, k, -1);
    d.bayrak.kamaraTuy = true;
    return sonra('Kamaranın yatağına yumuşak tüy yastık kondu: uyanınca moral iki fazla artar.');
  }
  if (tur === 'fener') {
    SH.hazirla(d);
    if ((d.saha.yag || 0) >= 100) return { metin: 'Fenerin dolu.' };
    ekle(d, k, -1);
    d.saha.yag = 100;
    return sonra('Kafa fenerine ışık otu yağı dolduruldu: yüzde yüz.');
  }
  if (tur === 'onar') {
    SH.hazirla(d);
    if (!Object.keys(d.saha.yip).some((a) => d.saha.yip[a] > 0)) return { metin: 'Aletlerin sağlam; tamire gerek yok.' };
    ekle(d, k, -1);
    for (const a of Object.keys(d.saha.yip)) d.saha.yip[a] = 0;
    return sonra('Tamir kitiyle bütün aletler sahada onarıldı; ağızları keskin.', 'el_tz_ors');
  }
  if (tur === 'sefer') {
    ekle(d, k, -1);
    if (!d.seferEtki) d.seferEtki = {};
    d.seferEtki.peksimet = Math.max(d.seferEtki.peksimet || 0, 1);
    return sonra('Konserveler gemi ambarına istiflendi: sıradaki uzun seferde sentetik besin yorgunluğu olmaz.');
  }
  if (tur === 'yak') {
    ekle(d, k, -1);
    for (const u of d.murettebat || []) u.stres = Math.max(0, (u.stres || 0) - 15);
    d.koloni.moral = Math.min(100, d.koloni.moral + 2);
    return sonra('Huzur tütsüsü yandı; kristal çiçeğin ince kokusu yayılıyor. Mürettebatın stresi on beş azaldı, moral iki arttı.', 'el_tz_tutsu');
  }
  if (tur === 'yikan') return { metin: 'Aroma yağı hamamda yıkanırken kendiliğinden kullanılır: termal hamama git, sıcak suya gir.' };
  if (tur === 'ilac') {
    ekle(d, k, -1);
    d.zehir = 0;
    Z.etkiKoy(d, 'antikor', Z.GUN_SN);
    return sonra('Antikor iksiri acı ama etkili. Maruziyet sıfırlandı; bir gün boyunca maden gazı ve sporlar daha az etkiler.');
  }
  // ye | ic
  const y = YEMEK[k] || { moral: 1 };
  ekle(d, k, -1);
  const l = [];
  if (y.moral) {
    d.koloni.moral = Math.min(100, d.koloni.moral + y.moral);
    l.push('moral ' + y.moral + ' arttı');
  }
  if (y.yorgunluk && d.saha) {
    d.saha.yorgunluk = Math.max(0, (d.saha.yorgunluk || 0) + y.yorgunluk);
    l.push(y.yorgunluk <= -100 ? 'yorgunluğun geçti' : 'yorgunluğun azaldı');
  }
  if (y.stres) {
    for (const u of d.murettebat || []) u.stres = Math.max(0, (u.stres || 0) + y.stres);
    l.push('mürettebatın stresi ' + -y.stres + ' azaldı');
  }
  return sonra(adi(k) + (tur === 'ic' ? ' içildi' : ' yendi') + (l.length ? ': ' + l.join(', ') : '') + '.');
}
// Aşhanede "Sıcak bir yemek ye": önce pişmiş gündelik yemekler, sonra erzak, sonra ham ürün (yerlesim.js çağırır)
export function enIyiYemek(d) {
  return ['kseno_guvec', 'balik_corbasi', 'kahvalti', 'vaha_tabagi', 'borek', 'peynir', 'ekmek', 'kamp_yemegi', 'kuru_meyve'].find((k) => varlik(d, k) > 0) || null;
}

// --- Gündelik tohumlar: binalar kurulunca yerleşimciler getirir (Paket 5 bölüm 3.1) ---
const TOHUM_HEDIYELERI = [
  { bayrak: 'tohum_ashane', kosul: (d) => YR.yerVar(d, 'ashane'), tohum: { arpa: 4, cay_yapragi: 3 }, soz: 'Sorya ve Usta Veysel: "Aşhane hazır; şu Dünya tohumlarını seraya ekelim Kaptan: arpa ve çay."' },
  { bayrak: 'tohum_atolye', kosul: (d) => YR.yerVar(d, 'atolye'), tohum: { pamuk_keten: 4 }, soz: 'Usta Veysel: "Dokuma tezgâhı boş durmasın; pamuk ve keten tohumu getirdim, seraya ekeriz."' },
  { bayrak: 'tohum_vaha', kosul: (d) => !!(d.bayrak.vahaBulundu || (d.gorevler && d.gorevler.vahaBulundu) || (d.kesif && d.kesif.vahaBulundu) || (d.gorulenMekanlar || []).includes('vaha')), tohum: { isik_otu: 3, kristal_cicek: 3, tatli_kok: 3 }, soz: 'Lyris: "Vahanın toprağı Malkenia\'nınkine benziyor. Işık otu, kristal çiçek ve tatlı yıldız kökü tohumlarımı buraya ya da seraya ekebiliriz."' },
];
export function gunlukIlerle(d) {
  if (!d.koloni || !d.bayrak) return;
  for (const h of TOHUM_HEDIYELERI) {
    if (d.bayrak[h.bayrak] || !h.kosul(d)) continue;
    d.bayrak[h.bayrak] = true;
    const t = tarim(d);
    for (const b of Object.keys(h.tohum)) t.tohumlar[b] = (t.tohumlar[b] || 0) + h.tohum[b];
    SB.haber(d, h.soz);
  }
}

// --- Kancalar: yerleşim binalarının köşesi (yerlesim.js), ilan panosu ulaşılabilirliği (pazar.js) ---
YR.TEZGAH.menu = binaTezgahlari;
YR.TEZGAH.durum = binaDurumu;
YR.TEZGAH.yemek = enIyiYemek;
YR.TEZGAH.kullan = kullan;
// Bir gündelik eşya bugün üretilebilir mi: binası kurulu, kişisi kolonide, girdilerinin her biri ulaşılabilir
export function uretilebilir(d, k, derinlik = 0) {
  if (derinlik > 3) return false;
  return Object.keys(TARIFLER).some((id) => {
    const t = TARIFLER[id];
    if (!t.cikti[k] || (t.hayvan && !d.bayrak.barinak) || id === 'malazar_buyu_tozu') return false;
    if (!t.bina.some((b) => yerVar(d, b)) || kisiEngeli(d, id)) return false;
    return t.girdi.every(([s]) => s.some((x) => varlik(d, x) > 0 || (x !== k && (uretilenMi(x) ? uretilebilir(d, x, derinlik + 1) : PZ.ulasilabilir(d, x)))));
  });
}
const uretilenMi = (k) => Object.keys(TARIFLER).some((id) => TARIFLER[id].cikti[k]);
PZ.ULASIM_EKLERI.push((d, k) => !(GUNLUK[k] && GUNLUK[k].hayvan && !d.bayrak.barinak) && uretilenMi(k) && uretilebilir(d, k));
