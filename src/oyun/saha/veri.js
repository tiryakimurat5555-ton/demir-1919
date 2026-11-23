// Saha verisi (v5 Paket 5, 6, 13): Derin Maden Ocağı ve İç Deniz Kıyı Koruluğu'nun hammaddeleri, düğüm türleri, aletler,
// balık noktaları. Bağımlılıksız (yalnız tesisler.js'e hammadde ekler).
import { HAMMADDELER, HAMMADDE_SIRASI } from '../veri/tesisler';

// Paket 10 bölüm 3.1: maden ve kıyı hammaddeleri. [Ham Rezonans] etiketi tarife eklenir.
const REZ = ' Doğal rezonans taşır; şimdilik zanaat ve törende kullanılır, ileride özel tesislerde işlenebilir.';
export const SAHA_HAMMADDELERI = {
  komur: { ad: 'kömür', tarif: 'Madenin üst katlarından. Fırın, dökümhane ve kış ısıtması.' },
  ham_kil: { ad: 'ham kil', tarif: 'Üst katlardan ve göl kıyısından yumuşak kil. Tuğla, testi, çanak çömlek.' },
  kuvars_kumu: { ad: 'kuvars kumu', tarif: 'İnce parlak kum. Cam, şişe, mercek.' },
  demir_cevheri: { ad: 'demir cevheri', tarif: 'Çivi, menteşe, demir aletler, karakol kapısı.' },
  bakir: { ad: 'bakır cevheri', tarif: 'Kablo, tencere, çan alaşımı, tesisat borusu.' },
  gumus_tozu: { ad: 'gümüş tozu', tarif: 'Orta katların gümüş damarlarından. Yüzük, ince işçilik, rezonans kaplaması.' },
  sifali_mantar: { ad: 'şifalı yeraltı mantarı', tarif: 'Nemli galerilerde büyür. Antikor iksiri, yorgunluk giderici çorba.' },
  fosil: { ad: 'fosil parçası', tarif: 'Derin galerilerden eski kalıntı. Koloni Arşivi bağışı, tarihçe araştırması.' },
  cekirdek_tasi: { ad: 'çekirdek taşı', tarif: 'En derin katların koyu kristali. Usta aletler, büyük anıt.' + REZ },
  elmas_kirintisi: { ad: 'elmas ve altın kırıntısı', tarif: 'Çekirdek damarlarından nadiren çıkan parıltı. Değerli bir hediye ve takas malı.' },
  kiyi_kerestesi: { ad: 'kıyı kerestesi', tarif: 'Kıyı koruluğunun odunu. Ev, mobilya, alet sapı, iskele tamiri.' },
  bitkisel_lif: { ad: 'bitkisel lif', tarif: 'Lif çalılarından. Halat, sepet, kaba kumaş, fırça.' },
  recine: { ad: 'ağaç reçinesi', tarif: 'Kıyı ağaçlarının yapışkan özü. Vernik, meşale, tütsü bağlayıcısı.' },
  kereste: { ad: 'işlenmiş kereste kalası', tarif: 'Düzgün kalas. Mobilya, masa, okul sırası, iskele.' },
  deniz_tuzu: { ad: 'deniz tuzu', tarif: 'İç denizin tuz birikintilerinden. Yemek, konserve, deri işleme.' },
  kirec_tasi: { ad: 'kıyı kireç taşı', tarif: 'Kıyı kayalıklarından çakıl ve kireç. Harç, seramik sırrı, yol döşemesi.' },
  sazan: { ad: 'gümüş göl sazanı', tarif: 'İç denizin sığ kıyısında. Izgara, balık çorbası, tuzlu konserve.' },
  yilan_baligi: { ad: 'termal yılan balığı', tarif: 'Sıcak akıntılarda yaşar. Yüksek enerjili sefer güveci, şifa yağı.' },
  yengec: { ad: 'kristal kabuklu yengeç', tarif: 'Kayalık koyun canlısı. Festival ziyafeti; kabuğu seramik sırrı.' },
  gol_baligi: { ad: 'küçük göl balığı', tarif: 'Rengârenk minik balık; akvaryumda yaşar.' },
  kseno_eti: { ad: 'kseno-et', tarif: 'Jeotermal gölün sıcak sularında yaşayan iri bir kseno-canlının eti; aşhanede yüksek moralli yemeklere girer.' }, // 4.5
  hamam_minerali: { ad: 'şifa ve hamam minerali', tarif: 'Termal akıntının dibinden. Hamam tuzu, şifa yağı.' },
  batik_gumus: { ad: 'batık gümüş parçası', tarif: 'Kayalık koyun dibinden; eski bir gemiden mi?' },
};
for (const k of Object.keys(SAHA_HAMMADDELERI)) {
  if (!HAMMADDELER[k]) HAMMADDELER[k] = SAHA_HAMMADDELERI[k];
  if (!HAMMADDE_SIRASI.includes(k)) HAMMADDE_SIRASI.push(k);
}
// Piezo ve aether madende de çıkar; tariflerine rezonans etiketi
if (HAMMADDELER.piezo && HAMMADDELER.piezo.tarif.indexOf('rezonans taşır') < 0) HAMMADDELER.piezo.tarif += REZ;
if (HAMMADDELER.aether && HAMMADDELER.aether.tarif.indexOf('rezonans taşır') < 0) HAMMADDELER.aether.tarif += REZ;

// Aletler (Paket 6 bölüm 2): üç kademe. Kademe 1 başlangıçta elde.
export const ALETLER = {
  kazma: { ad: 'kazma', kademeler: ['taş kazma', 'demir döküm kazma', 'kristal alaşım kazma'], etki: ['Kat 1-10 taş, kömür, kil kazısı.', 'Kat 11-25 piezo ve gümüş; yüzde otuz hızlı.', 'Kat 26-40 aether, fosil, çekirdek; kaya duvarını tek başına kırar.'] },
  balta: { ad: 'balta', kademeler: ['taş balta', 'çelik balta', 'kristal alaşım balta'], etki: ['İnce dal ve lif.', 'Kalın kıyı kerestesi, yaşlı ağaçlar.', 'Bol kereste ve ekstra reçine.'] },
  fener: { ad: 'kafa feneri', kademeler: ['temel kafa feneri', 'akustik lamba', 'ışık otu feneri'], etki: ['Kat 1-10 temel ışık.', 'Kat 11-25 düşman sesini bir adım erken duyurur.', 'Kat 26-40 zifiri karanlıkta pusu şansını yarıya indirir.'] },
  olta: { ad: 'olta', kademeler: ['basit olta', 'güçlü olta', 'usta olta'], etki: ['Isırma penceresi 1,5 saniye.', 'Pencere 2 saniye, gerginlik yüzde yirmi yavaş, büyük avlar daha az kaçar; kayalık koya erişim.', 'Pencere 2,4 saniye; yüzde yirmi beş çift av, batık fosil ve gümüş şansı iki kat.'] },
  canta: { ad: 'saha çantası', kademeler: ['küçük saha çantası', 'saha çantası', 'büyük saha çantası'], etki: ['25 birim taşır.', '50 birim taşır.', '100 birim taşır; yorgunluk dörtte bir az.'] },
};
export const ALET_SIRASI = ['kazma', 'balta', 'fener', 'olta', 'canta'];
export const CANTA_KAPASITE = [0, 25, 50, 100];
// Yükseltme bedelleri (belgede sayı yok; seçildi): Kademe 2 dökümle, Kademe 3 kristal alaşımla
export const ALET_BEDELI = {
  kazma: { 2: { demir_cevheri: 8, komur: 4, kiyi_kerestesi: 2 }, 3: { demir_cevheri: 10, piezo: 4, gumus_tozu: 4, aether: 2 } },
  balta: { 2: { demir_cevheri: 6, komur: 3, kiyi_kerestesi: 3 }, 3: { demir_cevheri: 8, piezo: 3, gumus_tozu: 4, cekirdek_tasi: 1 } },
  fener: { 2: { demir_cevheri: 4, bakir: 2, kristal: 1 }, 3: { gumus_tozu: 2, piezo: 2, aether: 1, kristal: 2 } },
  olta: { 2: { demir_cevheri: 3, bitkisel_lif: 4, kiyi_kerestesi: 2 }, 3: { gumus_tozu: 3, piezo: 2, bitkisel_lif: 6 } },
  canta: { 2: { bitkisel_lif: 10, bakir: 2 }, 3: { bitkisel_lif: 20, gumus_tozu: 4, piezo: 2 } },
};
export const YIPRANMA_ESIGI = 60; // bu kadar kullanımda alet körelir: bir vuruş fazla gerekir
export const BILEME_BEDELI = { kazma: { demir_cevheri: 2 }, balta: { demir_cevheri: 1, kiyi_kerestesi: 1 }, olta: { bitkisel_lif: 2 }, fener: { bakir: 1 }, canta: { bitkisel_lif: 2 } };

// Maden düğüm türleri (Paket 13 bölüm 2.2): gereken kazma, vuruş [T1, T2, T3] (null: o kademe yetmez), ürünler
export const MADEN_DUGUMLERI = {
  kaba: { ad: 'kaba taş ve kömür damarı', ses: 'kaya', gerek: 1, vurus: [3, 2, 1], urun: [['bazalt', 'ham_kil', 'komur'], 2, 4], kalis: 'tok' },
  demir_bakir: { ad: 'demir ve bakır damarı', ses: 'cevher', gerek: 1, vurus: [4, 3, 2], urun: [['demir_cevheri', 'bakir'], 2, 3], kalis: 'metal' },
  kuvars_gumus: { ad: 'kuvars ve gümüş damarı', ses: 'cevher', gerek: 2, vurus: [null, 4, 3], urun: [['gumus_tozu', 'kuvars_kumu'], 1, 3], kalis: 'metal' },
  piezo_mantar: { ad: 'piezo kristali ve mantar damarı', ses: 'kristal', gerek: 2, vurus: [null, 4, 2], urun: [['piezo'], 1, 2], ek: [['sifali_mantar', 1, 3], ['urun_fosforlu_liken', 0, 1]] },
  kaya_duvari: { ad: 'kalın kaya duvarı', ses: 'duvar', gerek: 3, vurus: [null, null, 6], mammoth: true, gizli: true },
  aether_fosil: { ad: 'aether ve fosil damarı', ses: 'kristal', gerek: 3, vurus: [null, null, 5], urun: [['aether', 'fosil'], 1, 2] },
  cekirdek: { ad: 'çekirdek taşı damarı', ses: 'kristal', gerek: 3, vurus: [null, null, 6], urun: [['cekirdek_tasi'], 1, 1], nadir: ['elmas_kirintisi', 0.2] },
};
// Asansör durakları ve galerileri: kat bandı, düğümler (soldan sağa), tehlike, karakol yeri
export const DURAKLAR = [1, 5, 10, 15, 20, 25, 30, 35, 40];
export function bandi(kat) {
  return kat <= 10 ? 'ust' : kat <= 25 ? 'orta' : 'derin';
}
export const GALERILER = {
  1: ['kaba', 'demir_bakir', 'kaba', 'merdiven'],
  5: ['kaba', 'demir_bakir', 'kaba', 'demir_bakir', 'merdiven'],
  10: ['demir_bakir', 'kaba', 'tehlike', 'demir_bakir', 'merdiven'],
  15: ['kuvars_gumus', 'piezo_mantar', 'demir_bakir', 'kaya_duvari', 'tehlike', 'merdiven'],
  20: ['piezo_mantar', 'kuvars_gumus', 'demir_bakir', 'tehlike', 'kaya_duvari', 'merdiven'],
  25: ['kuvars_gumus', 'piezo_mantar', 'kaya_duvari', 'tehlike', 'merdiven'],
  30: ['aether_fosil', 'kaya_duvari', 'tehlike', 'aether_fosil', 'merdiven'],
  35: ['cekirdek', 'aether_fosil', 'kaya_duvari', 'tehlike', 'merdiven'],
  40: ['cekirdek', 'aether_fosil', 'tehlike', 'cekirdek', 'kaya_duvari'],
};
export const KARAKOL_DURAKLARI = [10, 20, 30];
// Galeri tehlikeleri (Paket 6 4.1): düşman sürüsü ya da gaz cebi
export const MADEN_TEHLIKE = {
  10: { tur: 'dusman', dusmanlar: ['kaya_bocegi'], ad: 'kaya böcekleri', giris: 'Taşların arasından zayıf kaya böcekleri çıktı.' },
  15: { tur: 'dusman', dusmanlar: ['kristal_akrep', 'kristal_akrep'], ad: 'kristal kabuklu akrepler', giris: 'Kristal kabuklu iki akrep kıskaçlarını şaklatıyor.' },
  20: { tur: 'dusman', dusmanlar: ['tunel_pusucusu'], ad: 'tünel pusucusu', giris: 'Duvarın ardından bir tünel pusucusu atıldı!' },
  25: { tur: 'dusman', dusmanlar: ['kristal_akrep', 'tunel_pusucusu'], ad: 'akrep ve pusucu', giris: 'Bir akrep önden geliyor; arkasında bir pusucunun hışırtısı.' },
  30: { tur: 'dusman', dusmanlar: ['kor_solucan_yavrusu'], ad: 'kör solucan yavrusu', giris: 'Zırhlı bir kör solucan yavrusu galerinin dibinden sürünüyor.' },
  35: { tur: 'gaz', dusmanlar: ['gaz_pusucusu'], ad: 'karanlık gaz cebi', giris: 'Gaz cebinin içinden karanlık bir pusucu sıyrıldı.' },
  40: { tur: 'dusman', dusmanlar: ['kor_solucan_yavrusu', 'gaz_pusucusu'], ad: 'solucan ve gaz pusucusu', giris: 'Derinlerin efendileri: bir solucan yavrusu ve karanlıkta bir gaz pusucusu.' },
};
export const PUSU_IHTIMALI = { ust: 0.05, orta: 0.25, derin: 0.35 };

// Kıyı Koruluğu (Paket 13 bölüm 3): düğümler; gereken balta ya da kazma, vuruş, ürünler
export const KIYI_DUGUMLERI = {
  lif_calisi: { ad: 'lif çalısı', ses: 'cali', alet: 'balta', gerek: 1, vurus: [2, 1, 1], urun: [['bitkisel_lif'], 2, 3], ek: [['kiyi_kerestesi', 1, 1]] },
  orta_agac: { ad: 'orta kıyı ağacı', ses: 'agac', alet: 'balta', gerek: 1, vurus: [4, 3, 2], urun: [['kiyi_kerestesi'], 3, 5], ek: [['recine', 1, 2]], devrilir: true },
  yasli_agac: { ad: 'yaşlı sert koru ağacı', ses: 'agac', alet: 'balta', gerek: 2, vurus: [null, 5, 3], urun: [['kiyi_kerestesi'], 6, 9], ek: [['recine', 2, 3]], kalas: 0.25, devrilir: true },
  kiyi_kayasi: { ad: 'kıyı kayalığı', ses: 'kiyi_kaya', alet: 'kazma', gerek: 1, vurus: [3, 2, 1], urun: [['kirec_tasi'], 2, 4] },
  tuz: { ad: 'tuz birikintisi', ses: 'tuz', alet: 'kazma', gerek: 1, vurus: [3, 2, 1], urun: [['deniz_tuzu'], 2, 4] },
};
// Balık noktaları (Paket 13 4.1): av tablosu [ürün, olasılık]
export const BALIK_NOKTALARI = {
  sig_kiyi: { ad: 'sığ göl kıyısı', av: [['sazan', 0.75], ['hurda', 0.15], ['gol_baligi', 0.1]] },
  termal: { ad: 'sıcak termal akıntı', av: [['yilan_baligi', 0.5], ['sazan', 0.35], ['hamam_minerali', 0.15]] },
  jeotermal_gol: { ad: 'jeotermal göl', av: [['gol_baligi', 0.4], ['sazan', 0.25], ['yilan_baligi', 0.2], ['kseno_eti', 0.15]] }, // 4.5 (Paket 3B hobi 1)
  kayalik: { ad: 'kayalık koy ve açık iskele', av: [['yengec', 0.45], ['yilan_baligi', 0.3], ['deniz_tuzu', 0.15], ['nadir', 0.1]] },
};
// Olta kademeleri (4.3): ısırma penceresi sn, gerginlik çarpanı
export const OLTA = [null, { pencere: 1.5, gerginlik: 1 }, { pencere: 2.0, gerginlik: 0.8 }, { pencere: 2.4, gerginlik: 0.7 }];
