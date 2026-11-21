// Eşya, zanaat, envanter, kargo ve para (belgeler/tonoflenya-esya-zanaat-ve-murettebat-rehberi.md bölüm 2-5) ile
// subay kurulu ve limanlarda prosedürel subay istihdamı (bölüm 1, yönerge 6.C). Saf JavaScript.
//
// Durum: d.esya = { eşya: adet } (silah, zırh, modül, tüketim, pazar malı, yadigâr), d.kusanilan = { silah, zirh },
//   d.para = { ml: Malken Lirası, gk: Galaktik Keşif Kredisi } (Fenrir ışık tozu hammadde: koloni.kaynaklar.isik_tozu,
//   gram), d.satilanVeri (YGK'ye satılmış operasyon ve kodeks kimlikleri), d.istasyonlar (subay.js).
// Menüler ağaç olarak döner: { baslik, giris, ogeler: [{ id, etiket, ipucu, alt(d) | yap(d) → { metin, ses } }],
//   ikiParmak: { sag(d), sol(d) } }; ekran (Yuzey agacGoster) bunları okur.
import { HAMMADDELER } from '../veri/tesisler';
import { PARCALAR } from '../veri/uretim';
import { GEMI_SINIFLARI } from '../veri/gemiler';
import { OPERASYONLAR } from '../veri/uzayGorevleri';
import { BITKILER } from '../tarim/bitkiler';
import { Z_NOKTALAR } from './zanaatHarita';
import * as SB from './subay';
const SICRAMA_SN = 8 * 300; // malken.js ile aynı: sekiz oyun saati (döngüsel içe aktarma olmasın diye)

// Pyros-7 ve Glies-9b operasyonlarının ganimetine özütler eklenir (bölüm 2.3, 3.4)
if (OPERASYONLAR.g17) OPERASYONLAR.g17.odul.kaynak = { ...OPERASYONLAR.g17.odul.kaynak, lav_orkidesi: 3 };
if (OPERASYONLAR.g18) OPERASYONLAR.g18.odul.kaynak = { ...OPERASYONLAR.g18.odul.kaynak, glies_buzu: 4 };

// --- Katalog ---
// kat: 1 subay teçhizatı ve silah, 2 gemi modülü ve zırh plakası, 3 hammadde ve pazar malı, 4 tüketim ve ilaç,
// 5 görev yadigârı ve belge. yuva: silah | zirh (kuşanılır) ya da gemi yuvası (gemiye takılır).
export const KATEGORILER = [
  'Subay teçhizatı ve silahlar',
  'Gemi modülleri ve zırh plakaları',
  'Hammaddeler: kristaller, metaller, tozlar',
  'Tüketim maddeleri ve ilaçlar',
  'Görev yadigârları ve belgeler',
];

export const ESYA = {
  // 3.1 Bireysel silahlar (savaşta kaptanın bataryasına odak olarak bağlanır)
  plazma_tufegi: { kat: 1, yuva: 'silah', ad: 'Filtra Ağır Plazma Tüfeği', tarif: 'Üçüncü kademe kinetik-enerji silahı: 180 hasar, yüzde on beş zırh delme. Ateşlenince boğuk bir çelik gürlemesi, ardından hidrolik tıslama.', ses: 'el_tufek', etki: 'Savaşta birincil atış 1,8 kat vurur; düşman kalkanı yüzde on beş az sönümler.' },
  kara_buz_hancer: { kat: 1, yuva: 'silah', ad: 'Norvask Kara Buz Hançeri', tarif: 'Dördüncü kademe büyü-kritik silahı: 120 hasar; vurduğu düşmanı iki tur dondurur. Kınından çekilince camın buza sürtünmesi.', ses: 'el_hancer', etki: 'Birincil atış 1,2 kat; isabet düşmanı donduruyor: sonraki iki saldırısı gecikir.' },
  isik_mizragi: { kat: 1, yuva: 'silah', ad: 'Zhaor Işık Mızrağı', tarif: 'YGK seçkin silahı: 240 hasar, menzilli ışık patlaması; karanlık yaratıklara iki kat. Havayı yaran tiz bir ıslık ve kristal çınlaması.', ses: 'el_mizrak', etki: 'Birincil atış 2,4 kat; karanlık düşmanlara bunun da iki katı.' },
  golge_yayici: { kat: 1, yuva: 'silah', ad: 'Kahergonat Gölge Yayıcı', yasakli: true, tarif: 'Yasaklı zanaat: alan etkili gölge alevi; kalkanı yok sayar, düşman mürettebatının moralini kırar. Yanan odun çıtırtısıyla insan fısıltısı.', ses: 'el_golge', etki: 'Atışlar kalkanı yok sayar; morali kırılan düşman her atışında yüzde otuz ıskalar. YGK itibarı düşer.' },
  // 3.2 Zırhlar ve pelerinler
  oksit_zirhi: { kat: 1, yuva: 'zirh', ad: 'Filtra Oksit Ağır Zırhı', tarif: '+350 gövde koruması, patlamaya yüzde kırk direnç; hareket hızını yüzde on düşürür.', etki: 'Yüzeyde magma ve statik patlamalarından yüzde kırk az etkilenirsin; yürüyüş yüzde on yavaş.' },
  isik_pelerini: { kat: 1, yuva: 'zirh', ad: 'Fenrir Işık Pelerini', tarif: '+150 büyü koruması; düşman tarayıcılarında gemiyi ve kaptanı bir tur görünmez kılar. Rüzgârda ince kum tanelerinin şıkırtısı.', ses: 'el_pelerin', etki: 'Her çatışmada düşmanın ilk saldırısı hedef bulamaz; yağmacılar seni yarı yarıya geç fark eder.' },
  bas_buyucu_cubbesi: { kat: 1, yuva: 'zirh', ad: 'YGK Baş-Büyücü Cübbesi', tarif: 'Büyü bekleme sürelerini bir tur kısaltır; zihinsel saldırılara tam bağışıklık.', etki: 'Subay yeteneklerinin beklemesi bir tur kısa; monolitin zihin karıştırması etkilemez.' },
  // 3.3 Gemi modülleri
  kalkan_amplifikatoru: { kat: 2, yuva: 'savunma', ad: 'Aether Kalkan Amplifikatörü', tarif: 'Savunma yuvası: kalkan kapasitesi yüzde kırk artar, kalkan delinmeleri önlenir.', etki: 'Kalkan darbenin beşte biri yerine sekizde birini geçirir; kondansatör yüzde kırk az ısınır.' },
  sinha_sonari: { kat: 2, yuva: 'kesif', ad: 'Sinha Akustik Derinlik Sonarı', tarif: 'Keşif yuvası: gizli asteroitleri ve batık gemileri iki kat mesafeden duyar.', etki: 'Uzayda fener menzili iki kat; sürüklenen sandıklar daha sık duyulur.' },
  filtra_plakalari: { kat: 2, yuva: 'govde', ad: 'Filtra Basınçlı Zırh Plakaları', tarif: 'Gövde yuvası: geminin azami gövdesi yüzde elli artar; meteorit çarpmasını engeller.', etki: 'Azami gövde 1,5 katı.' },
  tentran_modulatoru: { kat: 2, yuva: 'sicrama', ad: 'Tentran Işınlanma Modülatörü', tarif: 'Sıçrama yuvası: gezegenler arası hiper-sıçrama süresini bir güne indirir.', etki: 'Aethelis-IV ile Tonoflenya arası sıçrama dört gün yerine bir gün.' },
  iklim_kubbesi: { kat: 2, yuva: 'yasam', ad: 'Biyo-Habitat İklim Kubbesi', tarif: 'Yaşam yuvası: gemideki yabancı ırkların moralini ve çiftlik üretimini yüzde otuz artırır.', etki: 'Tarladaki bitkiler yüzde otuz hızlı büyür; her eve dönüşte koloninin morali artar.' },
  // Kırmızı Yıldız Kademe 3
  aether_muhimmati: { kat: 4, ad: 'Zırh delici aether mühimmatı', tarif: 'Kızıl ekolün mühimmatı: torpido tüpüne sürülür; kalkanı yok sayar, bir buçuk kat vurur.', etki: 'Her torpido bir mühimmat harcar.' },
  // 3.4 İlaçlar ve rasyonlar
  glies_ignesi: { kat: 4, ad: 'Glies Kriyojenik İğnesi', tarif: 'Savaşta ağır yaralanan mürettebatı dondurarak ölümünü engeller.', etki: 'Gemiye yüklenir: bir yenilgide yas tutulmaz.' },
  vaha_surubu: { kat: 4, ad: 'Jeotermal Vaha Şurubu', tarif: 'Mürettebatın yorgunluğunu anında sıfırlar; keşif hızı on iki saat yüzde yirmi beş artar.', etki: 'Stres silinir; on iki saat yürüyüş ve seyir hızı 1,25 kat.' },
  astral_iksir: { kat: 4, ad: 'Astral Odak İksiri', tarif: 'Büyücü subayın sonraki büyüsünü kritik yapar.', etki: 'Savaşta kullanılan sonraki subay yeteneği iki kat etkili.' },
  malken_rasyonu: { kat: 4, ad: 'Yüksek Kalorili Malken Sefer Rasyonu', tarif: 'Standart gıda barlarının yerine geçer, morali yüksek tutar.', etki: 'Gemiye yüklenir: sonraki seferde besin yorgunluğu olmaz, dönüşte moral artar.' },
  // Pazar malları ve ara ürünler (bölüm 3'ün gereksinimleri)
  plazma_kartusu: { kat: 3, ad: 'Plazma kartuşu', tarif: 'Safran kükürdüyle fitillenmiş izotop kartuşu; plazma tüfeğinin şarjı.' },
  deri_astar: { kat: 3, ad: 'Deri astar', tarif: 'Tharal ve Uma tabakhanelerinden kalın deri.' },
  zhaor_ipegi: { kat: 3, ad: 'Zhaor ipeği', tarif: 'Gümüş halkanın dokumacılarından; ışığı kıran ince ipek.' },
  mor_kumas: { kat: 3, ad: 'Elyndra mor kumaşı', tarif: 'Elyndra\'nın ışığında boyanmış, aether akımı geçiren kumaş.' },
  altin_tel: { kat: 3, ad: '100 gram altın tel', tarif: 'Uma halkasının kuyumcularından.' },
  sinha_cipi: { kat: 3, ad: 'Sinha akustik çipi', tarif: 'Mavi halkanın frekans atölyesinden; sonar dizilerinin beyni.' },
  tentran_rolesi: { kat: 3, ad: 'Tentran rezonans rölesi', tarif: 'Platform kentin kuantum rölesi; ışınlanma alanını odaklar.' },
  biyo_filtre: { kat: 3, ad: 'Axira biyo-filtresi', tarif: 'Yeşil halkanın şifacılarından; canlı süzgeç dokusu.' },
  ruh_kapsulu: { kat: 3, ad: 'Ruh kapsülü', yasakli: true, tarif: 'Kahergonat karaborsasından; içinde bir şeyin fısıldadığı kapalı bir cam kapsül.' },
  saf_su: { kat: 3, ad: 'Saf su', tarif: 'Damıtılmış su.' },
  bal: { kat: 3, ad: 'Bal', tarif: 'Uma\'nın kovanlarından altın renkli bal.' },
  nektar: { kat: 3, ad: 'Aethelis nektarı', tarif: 'Vaha hurmasıyla kseno-sporun imbikte süzülmüş özü.' },
  mor_cicek: { kat: 3, ad: 'Mor çiçek özütü', tarif: 'Asma bahçelerin mor çiçeklerinden.' },
  // 4. Yadigârlar ve belgeler (görevlerde elde edilir)
  runahar_tasi: { kat: 5, ad: 'Runahar Kara Mühür Taşı', tarif: 'Kara Göl kraterindeki antik saray enkazından; Alt Evren rünleriyle oyulmuş soğuk taş silindir. Taşlaşmış erkek titanı mühürlemek için YGK zeminindeki yuvaya yerleştirilir.' },
  runashar_tasi: { kat: 5, ad: 'Runashar Kara Mühür Taşı', tarif: 'Kahergonat\'ta Lord Sharon\'un taht odasından; titreşen dişi mühür taşı. İkiz taşla bir araya gelince yüksek bir rezonans ıslığı çıkarır.' },
  cahelon_anahtari: { kat: 5, ad: 'Cahelon Girdap Anahtarı', tarif: 'Uçan Arin Adası\'ndaki monolitik mekanizmadan; spiral dönen kristal anahtar. Okyanus gezegenindeki dipsiz girdaba inmek için kalkana takılır.' },
  tyzrakhel_prizmasi: { kat: 5, ad: 'Tyzrakhel Işık Prizması', tarif: 'Başkent semalarındaki astral ışık kulesinden saf foton kristali; Beyaz Kıyamet\'in kalıntılarını temizler, karanlık büyüyü dağıtır.' },
  mormon_pusulasi: { kat: 5, ad: 'Mormon Girdap Pusulası', tarif: 'Mormon Denizi\'nin manyetik girdaplarında yön kaybını önleyen sferik jiroskop.' },
  zeris_aynasi: { kat: 5, ad: 'Zeris Yıldız Aynası', tarif: 'Zeris Kulesi\'nin altı yıldız ışığını tek huzmede toplayan dev merceğinin taşınabilir kopyası.' },
  loran_tableti: { kat: 5, ad: 'Loran Kripto Tableti', tarif: 'Batı denizindeki batık araştırma üssünden; Julithan Cumhuriyeti\'nin gizli deniz haritaları.' },
  filtra_sartnamesi: { kat: 5, ad: 'Filtra Madenci Şartnamesi', tarif: 'Mühürlü ferman: Filtra Oksit Dağları\'ndaki grevi çözmek için başkentten alınan kraliyet onayı.' },
  ajmero_kuresi: { kat: 5, ad: 'Ajmero Çöl Güneş Küresi', tarif: 'Zorah Çölü\'ndeki antik kulede kum fırtınasının yönünü gösteren pirinç düzenek.' },
  halyon_prangasi: { kat: 5, ad: 'Halyon Sürgün Prangası', tarif: 'Sürgün adasından kaçan büyücünün kırık büyü zinciri; itibar kanıtı.' },
  tentran_izni: { kat: 5, ad: 'Tentran Işınlanma İzni', tarif: 'Flee Plee sahilinden deniz üstü teknoloji kentine geçiren şifreli kuantum kartı.' },
  veradon_defteri: { kat: 5, ad: 'Veradon Deniz Korsanları Seyir Defteri', tarif: 'Güney krallıklarına kaçak silah sevkiyatını belgeleyen deri ciltli defter.' },
};

// Zanaat istasyonları (bölüm 3: gemideki üç tezgâh)
export const ISTASYONLAR = {
  dokum: { ad: 'Dökümhane Masası', tarif: 'Fiziksel silahlar, zırhlar ve zırh plakaları.', ekol: 'varek', ses: 'kaynak' },
  aether: { ad: 'Aether Laboratuvarı', tarif: 'Büyü modülleri ve kristaller.', ekol: 'elyndra', ses: 'el_kalkan' },
  imbik: { ad: 'Kseno-Sera İmbik Ünitesi', tarif: 'İlaçlar, iksirler ve rasyonlar.', ekol: 'axira', ses: 'polimer' },
};
// Girdi anahtarları: hammadde (koloni.kaynaklar), parça (koloni.parcalar), eşya (d.esya), urun_<bitki> (hasat),
// tohum (herhangi bir tohum)
export const TARIFLER = {
  plazma_tufegi: { ist: 'dokum', girdi: { oksit_celik: 4, kizilkaya_titanyumu: 2, plazma_kartusu: 1 } },
  kara_buz_hancer: { ist: 'aether', girdi: { norvask_buzu: 2, saf_aether: 1, isik_tozu: 50 } },
  isik_mizragi: { ist: 'aether', girdi: { zhaor_prizmasi: 1, kizilkaya_titanyumu: 3, isik_tozu: 200 } },
  golge_yayici: { ist: 'aether', girdi: { kara_aether: 2, obsidyen: 1, ruh_kapsulu: 1 }, not: 'Nirdol obsidyeni: obsidyen ovasının kompozit tabakası.' },
  oksit_zirhi: { ist: 'dokum', girdi: { oksit_celik: 8, kizilkaya_titanyumu: 4, deri_astar: 2 } },
  isik_pelerini: { ist: 'aether', girdi: { isik_tozu: 500, arin_tuyu: 2, zhaor_ipegi: 1 } },
  bas_buyucu_cubbesi: { ist: 'aether', girdi: { saf_aether: 2, mor_kumas: 1, altin_tel: 1 } },
  kalkan_amplifikatoru: { ist: 'aether', girdi: { saf_aether: 3, zhaor_prizmasi: 2, isik_tozu: 150 } },
  sinha_sonari: { ist: 'aether', girdi: { mavi_aether: 2, sinha_cipi: 1 }, not: 'Mavi Hardrin taşı: Hardrin damarlarının mavi aether tozu.' },
  filtra_plakalari: { ist: 'dokum', girdi: { oksit_celik: 12, titanyum: 6 } },
  tentran_modulatoru: { ist: 'aether', girdi: { tentran_rolesi: 1, graviton: 4 }, not: 'Graviton yakıtı: derin kuyuların graviton minerali.' },
  iklim_kubbesi: { ist: 'imbik', girdi: { rezonans_cami: 2, biyo_filtre: 1, tohum: 3 }, not: 'Zorah cam kumu: cam düzlüklerinin rezonans camı.' },
  aether_muhimmati: { ist: 'dokum', girdi: { aether: 2, kizilkaya_titanyumu: 1 }, adet: 3, kosul: (d) => SB.kabiliyet(d, 'varek', 3), kosulMetni: 'Kırmızı Yıldız ekolünde Yıldız Muhafızı kıdemi gerekir.' },
  plazma_kartusu: { ist: 'dokum', girdi: { safran_kukurt: 1, izotop: 1 }, adet: 2 },
  glies_ignesi: { ist: 'imbik', girdi: { glies_buzu: 1, saf_su: 1 }, ilac: true },
  vaha_surubu: { ist: 'imbik', girdi: { urun_vaha_hurmasi: 2, nektar: 1 }, ilac: true, not: 'Vaha meyvesi: gece açan vaha hurması.' },
  astral_iksir: { ist: 'imbik', girdi: { buyu_tozu: 1, mor_cicek: 1 }, ilac: true, not: 'Malazar tozu: ocakların büyü tozu.' },
  malken_rasyonu: { ist: 'imbik', girdi: { urun_akifer: 1, urun_soya: 1, bal: 1 }, ilac: true, not: 'Hidroponik buğday: akifer buğdayı; protein bloğu: soya-kazein baklası.' },
  nektar: { ist: 'imbik', girdi: { urun_vaha_hurmasi: 1, kseno_spor: 1 } },
};

// Ticaret masaları: satar (eşya ya da hammadde → fiyat), alir (hammadde → birim fiyatı), para 'ml' | 'isik'
export const PAZARLAR = {
  uma_pazari: { para: 'ml', satar: { deri_astar: 40, altin_tel: 120, bal: 15, saf_su: 5 }, alir: { aether: 20, buyu_tozu: 25, oksit_celik: 15, rezonans_cami: 20, morluk_kristali: 30 } },
  zhaor_pazari: { para: 'ml', satar: { zhaor_ipegi: 90, zhaor_prizmasi: 220 }, alir: { zhaor_prizmasi: 110, saf_aether: 60, piezo: 12 } },
  axira_tezgahi: { para: 'ml', satar: { biyo_filtre: 80, mor_cicek: 20, saf_su: 5 }, alir: { kseno_spor: 15, tohum: 10 } },
  sinha_tezgahi: { para: 'ml', satar: { sinha_cipi: 150 }, alir: { mavi_aether: 30, kristal: 8 } },
  elyndra_dokumacisi: { para: 'ml', satar: { mor_kumas: 110 }, alir: { buzul_aether: 40, aether: 22 } },
  tentran_tuccari: { para: 'isik', satar: { tentran_rolesi: 6, glies_buzu: 2, lav_orkidesi: 2, sinha_cipi: 3 }, alir: { kara_aether: 2, saf_aether: 1 } },
  veradon_hani: { para: 'ml', satar: { deri_astar: 35, bal: 12, saf_su: 4 }, alir: { safran_kukurt: 10, kizilkaya_titanyumu: 25, arin_tuyu: 30 } },
  julithan_limani: { para: 'ml', satar: { deri_astar: 35, saf_su: 4, bal: 12, altin_tel: 115 }, alir: { oksit_celik: 20, kizilkaya_titanyumu: 25, safran_kukurt: 10, norvask_buzu: 35 } },
  nerya_limani: { para: 'ml', satar: { bal: 12, saf_su: 4, deri_astar: 38, altin_tel: 110, mor_cicek: 22 }, alir: { aether: 18, oksit_celik: 18, girdap_recinesi: 30, isik_tozu: 0.9 } },
  kahergonat_karaborsa: { para: 'ml', satar: { ruh_kapsulu: 300, kara_aether: 120 }, alir: { kara_aether: 60, obsidyen: 40 }, yasakli: true },
};
export const ISIK_ML = 50; // bir gram ışık tozu elli Malken Lirası
export const GK_ML = 2; // YGK bankası: bir kredi iki lira

// --- Durum ve stok yardımcıları ---
export function hazirla(d) {
  if (!d.esya) d.esya = {};
  if (!d.kusanilan) d.kusanilan = { silah: null, zirh: null };
  if (!d.para) d.para = { ml: 0, gk: 0 };
  if (!d.satilanVeri) d.satilanVeri = [];
  SB.istasyonlar(d);
  return d;
}
export function adi(k) {
  if (ESYA[k]) return ESYA[k].ad;
  if (HAMMADDELER[k]) return HAMMADDELER[k].ad;
  if (PARCALAR[k]) return PARCALAR[k].ad;
  if (k === 'tohum') return 'tohum (herhangi)';
  if (k.indexOf('urun_') === 0 && BITKILER[k.slice(5)]) return BITKILER[k.slice(5)].urun;
  return k;
}
function tohumToplam(d) {
  const t = d.tarim && d.tarim.tohumlar;
  return t ? Object.values(t).reduce((a, b) => a + (b || 0), 0) : 0;
}
export function miktar(d, k) {
  if (ESYA[k]) return (d.esya && d.esya[k]) || 0;
  if (HAMMADDELER[k]) return d.koloni.kaynaklar[k] || 0;
  if (PARCALAR[k]) return d.koloni.parcalar[k] || 0;
  if (k === 'tohum') return tohumToplam(d) + (d.koloni.kaynaklar.tohum || 0);
  if (k.indexOf('urun_') === 0) return (d.tarim && d.tarim.urun[k.slice(5)]) || 0;
  return 0;
}
export function ekle(d, k, n) {
  hazirla(d);
  if (ESYA[k]) d.esya[k] = Math.max(0, (d.esya[k] || 0) + n);
  else if (HAMMADDELER[k]) d.koloni.kaynaklar[k] = Math.max(0, (d.koloni.kaynaklar[k] || 0) + n);
  else if (PARCALAR[k]) d.koloni.parcalar[k] = Math.max(0, (d.koloni.parcalar[k] || 0) + n);
  else if (k.indexOf('urun_') === 0 && d.tarim) d.tarim.urun[k.slice(5)] = Math.max(0, (d.tarim.urun[k.slice(5)] || 0) + n);
  else if (k === 'tohum') {
    // Önce koloni tohumu, sonra tarlanın en bol tohumu harcanır
    let kalan = -n;
    const kk = d.koloni.kaynaklar;
    const al = Math.min(kalan, kk.tohum || 0);
    kk.tohum = (kk.tohum || 0) - al;
    kalan -= al;
    while (kalan > 0 && d.tarim) {
      const t = d.tarim.tohumlar;
      const en = Object.keys(t).sort((a, b) => (t[b] || 0) - (t[a] || 0))[0];
      if (!en || !(t[en] > 0)) break;
      t[en] -= 1;
      kalan -= 1;
    }
  }
}
export function girdiMetni(g) {
  return Object.keys(g).map((k) => g[k] + ' ' + adi(k)).join(', ');
}
function eksikMetni(d, g) {
  return Object.keys(g).filter((k) => miktar(d, k) < g[k]).map((k) => (g[k] - miktar(d, k)) + ' ' + adi(k)).join(', ');
}

// Elyndra 3. kademe: aether laboratuvarında en çok gereken hammaddeden bir eksik
export function tarifGirdisi(d, id) {
  const t = TARIFLER[id];
  const g = { ...t.girdi };
  if (t.ist === 'aether' && SB.kabiliyet(d, 'elyndra', 3)) {
    const en = Object.keys(g).filter((k) => HAMMADDELER[k]).sort((a, b) => g[b] - g[a])[0];
    if (en && g[en] > 1) g[en] -= en === 'isik_tozu' ? Math.min(50, g[en] - 1) : 1;
  }
  return g;
}

export function zanaatEt(d, id) {
  hazirla(d);
  const t = TARIFLER[id];
  if (!t) return { metin: '', ses: 'red' };
  if (t.kosul && !t.kosul(d)) return { metin: adi(id) + ': ' + t.kosulMetni, ses: 'red' };
  const g = tarifGirdisi(d, id);
  const eksik = eksikMetni(d, g);
  if (eksik) return { metin: adi(id) + ' için eksik: ' + eksik + '.', ses: 'red' };
  for (const k of Object.keys(g)) ekle(d, k, -g[k]);
  const n = (t.adet || 1) * (t.ilac && SB.kabiliyet(d, 'axira', 3) ? 2 : 1);
  ekle(d, id, n);
  const ist = ISTASYONLAR[t.ist];
  SB.ekolKazan(d, ist.ekol, t.ist === 'aether' ? 10 : 5);
  let ek = '';
  if (ESYA[id] && ESYA[id].yasakli) {
    d.itibar = Math.max(0, d.itibar - 10);
    ek = ' YGK yasaklı zanaatı duydu: itibar on düştü.';
  }
  return { metin: ist.ad + ': ' + (n > 1 ? n + ' ' : '') + adi(id) + ' hazır.' + ek, ses: ist.ses };
}

// --- Kuşanma, modül, kullanma ---
export function kusanildiMi(d, id) {
  return !!(d.kusanilan && (d.kusanilan.silah === id || d.kusanilan.zirh === id));
}
export function kusan(d, id) {
  hazirla(d);
  const e = ESYA[id];
  if (!e || !e.yuva || miktar(d, id) < 1) return { metin: 'Bu eşya kuşanılmaz.', ses: 'red' };
  if (e.kat === 2) return modulTak(d, id);
  const eski = d.kusanilan[e.yuva];
  d.kusanilan[e.yuva] = eski === id ? null : id;
  if (eski === id) return { metin: e.ad + ' çıkarıldı.', ses: 'dugme' };
  return { metin: e.ad + ' kuşanıldı' + (eski ? '; ' + ESYA[eski].ad + ' çıkarıldı' : '') + '. ' + e.etki, ses: 'kapi_gemi', efekt: e.ses };
}
export function modulTak(d, id) {
  const g = d.gemi;
  if (!g) return { metin: 'Modül takacak gemi yok.', ses: 'red' };
  const e = ESYA[id];
  if (g.moduller[id]) {
    g.moduller[id] = false;
    if (id === 'filtra_plakalari') {
      g.maxGovde = Math.round(g.maxGovde / 1.5);
      g.govde = Math.min(g.govde, g.maxGovde);
    }
    return { metin: e.ad + ' gemiden söküldü; ambarda.', ses: 'hidrolik' };
  }
  // Aynı yuvada başka modül varsa sökülür
  for (const k of Object.keys(ESYA)) if (ESYA[k].kat === 2 && ESYA[k].yuva === e.yuva && g.moduller[k]) g.moduller[k] = false;
  g.moduller[id] = true;
  if (id === 'filtra_plakalari') {
    g.maxGovde = Math.round(g.maxGovde * 1.5);
    g.govde = Math.round(g.govde * 1.5);
  }
  return { metin: e.ad + ' ' + yuvaAdi(e.yuva) + ' yuvasına takıldı. ' + e.etki, ses: 'kaynak' };
}
const yuvaAdi = (y) => ({ savunma: 'savunma', kesif: 'keşif', govde: 'gövde', sicrama: 'sıçrama', yasam: 'yaşam' })[y] || y;

export function kullan(d, id) {
  hazirla(d);
  if (miktar(d, id) < 1) return { metin: 'Elinde yok.', ses: 'red' };
  if (!d.seferEtki) d.seferEtki = {};
  let metin;
  if (id === 'glies_ignesi') {
    d.seferEtki.kriyo = Math.max(d.seferEtki.kriyo || 0, 1);
    metin = 'Kriyojenik iğne revir dolabına yüklendi: bir yenilgide ağır yaralılar stasise alınır.';
  } else if (id === 'vaha_surubu') {
    for (const u of d.murettebat) u.stres = 0;
    d.surupBitis = ((d.zaman && d.zaman.sn) || 0) + 3600;
    metin = 'Vaha şurubu dağıtıldı: yorgunluk silindi. On iki saat boyunca adımların ve iticilerin daha hızlı.';
  } else if (id === 'astral_iksir') {
    d.astralOdak = true;
    metin = 'Astral iksir içildi: savaşta kullanılacak sonraki subay yeteneği kritik olacak.';
  } else if (id === 'malken_rasyonu') {
    d.seferEtki.rasyon = Math.max(d.seferEtki.rasyon || 0, 1);
    metin = 'Malken sefer rasyonları ambara yüklendi: sonraki seferde besin yorgunluğu yok.';
  } else return { metin: 'Bu eşya kullanılmaz.', ses: 'red' };
  ekle(d, id, -1);
  return { metin, ses: 'tislama' };
}
export function surupEtkin(d) {
  return (d.surupBitis || 0) > ((d.zaman && d.zaman.sn) || 0);
}

// Reaktöre yükle: aether türü kristaller gemi yakıtına dönüşür (Elyndra yüzde yirmi beş fazla)
const REAKTOR = { aether: 10, saf_aether: 25, buzul_aether: 15, mavi_aether: 8, kara_aether: 12, morluk_kristali: 10 };
export function reaktoreYukle(d, k) {
  const g = d.gemi;
  if (!g) return { metin: 'Yükleyecek reaktör yok.', ses: 'red' };
  if (miktar(d, k) < 1) return { metin: 'Elinde yok.', ses: 'red' };
  const l = Math.round(REAKTOR[k] * SB.aetherGucCarpani(d));
  ekle(d, k, -1);
  g.yakit = Math.min(g.maxYakit, g.yakit + l);
  return { metin: 'Bir ' + adi(k) + ' rezonans çekirdeğine atıldı: ' + l + ' litre itki yakıtı. Tank ' + Math.round(g.yakit) + ' litre.' + (k === 'kara_aether' ? ' Çekirdek bir an cızırdıyor; kara kristal temiz yanmıyor.' : ''), ses: 'el_kalkan' };
}
// Dökümhaneye gönder: metaller zırhlı plakaya
const DOKUM = { oksit_celik: ['zirhli_plaka', 20], kizilkaya_titanyumu: ['zirhli_plaka', 15], titanyum: ['plaka', 25], norvask_buzu: ['zirhli_plaka', 12] };
export function dokumhaneyeGonder(d, k) {
  if (miktar(d, k) < 1) return { metin: 'Elinde yok.', ses: 'red' };
  const [p, n] = DOKUM[k];
  ekle(d, k, -1);
  d.koloni.parcalar[p] = (d.koloni.parcalar[p] || 0) + n;
  return { metin: 'Bir ' + adi(k) + ' dökümhanede eritildi: ' + n + ' ' + adi(p) + '.', ses: 'kaynak' };
}
export function at(d, k) {
  if (miktar(d, k) < 1) return { metin: 'Elinde yok.', ses: 'red' };
  if (kusanildiMi(d, k) && miktar(d, k) <= 1) return { metin: 'Kuşandığın eşyayı atamazsın; önce çıkar.', ses: 'red' };
  if (ESYA[k] && ESYA[k].kat === 5) return { metin: 'Görev yadigârı atılmaz.', ses: 'red' };
  ekle(d, k, -1);
  return { metin: 'Bir ' + adi(k) + ' atıldı.', ses: 'dugme' };
}

// --- Envanter (bölüm 5.1) ---
// Tonoflenya'dan getirilen ve gemide taşınan hammaddeler (kargo hacmine girer)
export const TONOFLENYA_HAMMADDELERI = ['aether', 'buyu_tozu', 'oksit_celik', 'rezonans_cami', 'mavi_aether', 'morluk_kristali', 'buzul_aether', 'saf_aether', 'zhaor_prizmasi', 'kara_aether', 'kizilkaya_titanyumu', 'norvask_buzu', 'safran_kukurt', 'isik_tozu', 'arin_tuyu', 'girdap_recinesi', 'lav_orkidesi', 'glies_buzu', 'piezo'];
export function kategoriOgeleri(d, kat) {
  hazirla(d);
  if (kat === 2) {
    const l = Object.keys(ESYA).filter((k) => ESYA[k].kat === 3 && miktar(d, k) > 0);
    const h = Object.keys(HAMMADDELER).filter((k) => miktar(d, k) > 0);
    return [...h, ...l];
  }
  return Object.keys(ESYA).filter((k) => ESYA[k].kat === kat + 1 && (miktar(d, k) > 0 || (d.gemi && d.gemi.moduller[k])));
}
function esyaSatiri(d, k) {
  const e = ESYA[k];
  const n = miktar(d, k);
  const tarif = e ? e.tarif : HAMMADDELER[k] ? HAMMADDELER[k].tarif : '';
  const durum = kusanildiMi(d, k) ? ' Kuşanılı.' : d.gemi && d.gemi.moduller[k] ? ' Gemiye takılı.' : '';
  return adi(k) + ', adet ' + n + '.' + durum + ' ' + tarif;
}
export function eylemler(d, k) {
  const e = ESYA[k];
  const l = [];
  if (e && e.yuva) l.push({ id: 'kusan', etiket: e.kat === 2 ? (d.gemi && d.gemi.moduller[k] ? 'Gemiden sök' : 'Gemiye tak') : kusanildiMi(d, k) ? 'Çıkar' : 'Kuşan' });
  if (e && e.kat === 4 && k !== 'aether_muhimmati') l.push({ id: 'kullan', etiket: 'Kullan' });
  if (REAKTOR[k]) l.push({ id: 'reaktor', etiket: 'Reaktöre yükle' });
  if (DOKUM[k]) l.push({ id: 'dokum', etiket: 'Dökümhaneye gönder' });
  l.push({ id: 'at', etiket: 'At' });
  return l;
}
export function eylemYap(d, k, eid) {
  if (eid === 'kusan') return kusan(d, k);
  if (eid === 'kullan') return kullan(d, k);
  if (eid === 'reaktor') return reaktoreYukle(d, k);
  if (eid === 'dokum') return dokumhaneyeGonder(d, k);
  if (eid === 'at') return at(d, k);
  return { metin: '' };
}
export function paraMetni(d) {
  hazirla(d);
  return Math.round(d.para.ml) + ' Malken Lirası, ' + Math.round(d.koloni.kaynaklar.isik_tozu || 0) + ' gram Fenrir ışık tozu, ' + Math.round(d.para.gk) + ' Galaktik Keşif Kredisi.';
}
export function envanterMenu(d, kat = 0) {
  hazirla(d);
  const l = kategoriOgeleri(d, kat);
  const sonraki = (kat + 1) % 5;
  const onceki = (kat + 4) % 5;
  const k = kargo(d);
  return {
    baslik: (kat + 1) + '. ' + KATEGORILER[kat],
    giris: (l.length ? l.length + ' kalem.' : 'Bu bölmede bir şey yok.') + ' Çift dokun: eylem menüsü. İki parmakla sağa kaydır: sonraki kategori. ' + paraMetni(d) + ' Ambar ' + k.hacim + ' / ' + k.kapasite + ' hacim.',
    ikiParmak: { sag: (x) => envanterMenu(x, sonraki), sol: (x) => envanterMenu(x, onceki), ses: 'el_sayfa' },
    ogeler: [
      ...l.map((id) => ({ id, etiket: esyaSatiri(d, id), alt: (x) => esyaMenu(x, id, kat) })),
      { id: 'sonraki', etiket: 'Sonraki kategori: ' + KATEGORILER[sonraki], alt: (x) => envanterMenu(x, sonraki), efekt: 'el_sayfa' },
    ],
  };
}
export function esyaMenu(d, id, kat) {
  return {
    baslik: adi(id),
    giris: esyaSatiri(d, id) + (ESYA[id] && ESYA[id].etki ? ' ' + ESYA[id].etki : ''),
    ogeler: eylemler(d, id).map((e) => ({ id: e.id, etiket: e.etiket, yap: (x) => eylemYap(x, id, e.id), geri: true })),
  };
}

// --- Zanaat menüsü ---
export function zanaatMenu(d, ist) {
  hazirla(d);
  if (!ist) {
    return {
      baslik: 'Zanaat tezgâhları',
      giris: d.gemi ? 'Gemideki üç tezgâh. Birini seç.' : 'Zanaat tezgâhları gemide; önce bir gemin olmalı.',
      ogeler: d.gemi ? Object.keys(ISTASYONLAR).map((k) => ({ id: k, etiket: ISTASYONLAR[k].ad + ': ' + ISTASYONLAR[k].tarif, alt: (x) => zanaatMenu(x, k) })) : [],
    };
  }
  const l = Object.keys(TARIFLER).filter((id) => TARIFLER[id].ist === ist);
  return {
    baslik: ISTASYONLAR[ist].ad,
    giris: 'Bir tarif seç; malzemen yetiyorsa hemen üretilir.',
    ogeler: l.map((id) => {
      const t = TARIFLER[id];
      const g = tarifGirdisi(d, id);
      const kilit = t.kosul && !t.kosul(d);
      const eksik = eksikMetni(d, g);
      return {
        id,
        etiket: adi(id) + '. ' + (kilit ? 'Kilitli: ' + t.kosulMetni : eksik ? 'Eksik: ' + eksik : 'Hazır') + '. Gerekir: ' + girdiMetni(g) + '.' + (t.not ? ' ' + t.not : '') + (ESYA[id] && ESYA[id].etki ? ' Etki: ' + ESYA[id].etki : ''),
        yap: (x) => zanaatEt(x, id),
      };
    }),
  };
}

// --- Kargo (bölüm 5.2) ---
const HACIM = (k) => (ESYA[k] ? (ESYA[k].kat === 3 ? 0.5 : ESYA[k].kat === 2 ? 3 : 0.2) : k === 'isik_tozu' ? 0.002 : ['oksit_celik', 'kizilkaya_titanyumu', 'norvask_buzu'].includes(k) ? 2 : 1);
export function kargo(d) {
  hazirla(d);
  let h = 0;
  for (const k of TONOFLENYA_HAMMADDELERI) h += miktar(d, k) * HACIM(k);
  for (const k of Object.keys(d.esya)) if (!(d.gemi && d.gemi.moduller[k])) h += (d.esya[k] || 0) * HACIM(k);
  const siniflar = Object.keys(GEMI_SINIFLARI);
  const s = d.gemi ? Math.max(0, siniflar.indexOf(d.gemi.sinif)) : 0;
  const kapasite = Math.round((60 + 30 * s) * (SB.kabiliyet(d, 'uma', 3) ? 1.5 : 1));
  const kara = miktar(d, 'kara_aether');
  return { hacim: Math.round(h), kapasite, asim: h > kapasite, karaFazla: kara > 4 };
}
// Ambardaki kara kristal fazlası kalkan frekansını bozar: Sinha bir kez uyarır
export function kargoDenetle(d) {
  const k = kargo(d);
  if (k.karaFazla && !d.karaUyarildi) {
    d.karaUyarildi = true;
    SB.haber(d, 'Sinha: "Kaptan, ambarımızdaki kara kristal yoğunluğu kalkan frekansımızı bozuyor; derhal rafine etmeli ya da satmalıyız."');
  }
  if (!k.karaFazla) d.karaUyarildi = false;
  return k;
}

// Hiper-sıçrama: sekiz saat sürer (Gümüş sıçrama kabiliyetiyle dört). Sıçramadan sonra motorun şarjı iki gün
// bekler; Tentran ışınlanma modülatörü bu beklemeyi bir güne indirir (bölüm 3.3). Yakıt on litre; ambar taşarsa
// yarısı kadar fazlası (bölüm 5.2).
export const SICRAMA_YAKITI = 10;
export const SARJ_SN = 2 * 7200;
export function sicramaSuresi(d) {
  return SICRAMA_SN / (SB.kabiliyet(d, 'zhaor', 4) ? 2 : 1);
}
export function sarjSuresi(d) {
  return d.gemi && d.gemi.moduller.tentran_modulatoru ? 7200 : SARJ_SN;
}
const simdi = (d) => (d.zaman && d.zaman.sn) || 0;
export function sarjKalan(d) {
  return Math.max(0, (d.sicramaHazir || 0) - simdi(d));
}
// Sıçrama yapıldıktan sonra çağrılır
export function sarjBaslat(d) {
  d.sicramaHazir = simdi(d) + sarjSuresi(d);
}
// Engel varsa açıklaması, yoksa null
export function sicramaDurumu(d) {
  const k = sarjKalan(d);
  if (k > 0) return 'Sıçrama motoru şarj oluyor; ' + sureMetni(k) + ' kaldı.' + (d.gemi && d.gemi.moduller.tentran_modulatoru ? '' : ' Tentran ışınlanma modülatörü bu beklemeyi bir güne indirir.') + ' Beklemek istersen iskelede ya da Aethelis\'in merkez terminalinde şarjı bekleyebilirsin; o sürede tarlalar kendi başına kalır.';
  const y = sicramaYakiti(d);
  if (!d.gemi || d.gemi.yakit < y) return 'Sıçrama için ' + y + ' litre yakıt gerekir' + (kargo(d).asim ? ' (ambar taşkın: yüzde elli fazla)' : '') + '; tankta ' + Math.round(d.gemi ? d.gemi.yakit : 0) + '.';
  return null;
}
export function sicramaYakitiHarca(d) {
  d.gemi.yakit = Math.max(0, d.gemi.yakit - sicramaYakiti(d));
}
// Aethelis'in merkez terminalinde şarjı bekleme eylemi
export function ekEylemler(d, id) {
  if (id === 'terminal' && d.bayrak.tonoflenyaGoruldu && sarjKalan(d) > 0) return [{ id: 'z_sarj', etiket: 'Sıçrama motorunun şarjını bekle', ipucu: sureMetni(sarjKalan(d)) + ' kaldı.' }];
  return [];
}
export function sicramaYakiti(d) {
  return SICRAMA_YAKITI * (kargo(d).asim ? 1.5 : 1);
}
export function sureMetni(sn) {
  const gun = Math.floor(sn / 7200);
  const saat = Math.round((sn % 7200) / 300);
  return [gun ? gun + ' gün' : '', saat ? saat + ' saat' : ''].filter(Boolean).join(' ') || 'bir an';
}

// --- Para: YGK veri masası ve bakım (bölüm 5.3) ---
export function veriPaketleri(d) {
  hazirla(d);
  const op = (d.tamamlananOp || []).filter((x) => !d.satilanVeri.includes('op_' + x));
  const kd = (d.kodeks || []).filter((x) => !d.satilanVeri.includes('k_' + x.id));
  return { op, kd, gk: op.length * 150 + kd.length * 25 };
}
export function veriSat(d) {
  const v = veriPaketleri(d);
  if (!v.gk) return { metin: 'Satılacak yeni veri paketi yok. Derin uzaydan yeni operasyonlar ve kodeks kayıtlarıyla dön.', ses: 'red' };
  for (const x of v.op) d.satilanVeri.push('op_' + x);
  for (const x of v.kd) d.satilanVeri.push('k_' + x.id);
  d.para.gk += v.gk;
  return { metin: v.op.length + ' operasyon ve ' + v.kd.length + ' kodeks kaydı Akademiye aktarıldı: ' + v.gk + ' Galaktik Keşif Kredisi. Toplam ' + d.para.gk + '.', ses: 'sinyal' };
}
export function bakimMaliyeti(d) {
  const g = d.gemi;
  return g ? Math.ceil((g.maxGovde - g.govde) * 0.5 * SB.tamirCarpani(d)) : 0;
}
// İskelede bakım: gövde tamiri krediyle (yetmezse yettiği kadar), yakıt Akademiden
export function bakimYap(d) {
  hazirla(d);
  const g = d.gemi;
  const m = bakimMaliyeti(d);
  const birim = 0.5 * SB.tamirCarpani(d);
  let onar = g.maxGovde - g.govde;
  let odenen = m;
  if (m > d.para.gk) {
    onar = Math.floor(d.para.gk / birim);
    odenen = Math.ceil(onar * birim);
  }
  d.para.gk -= odenen;
  g.govde = Math.min(g.maxGovde, g.govde + onar);
  g.yakit = g.maxYakit;
  return { metin: 'Akademinin teknisyenleri tankı dolduruyor.' + (onar > 0 ? ' Gövde ' + onar + ' puan onarıldı, ' + odenen + ' kredi.' : m === 0 ? ' Gövde zaten sağlam.' : ' Gövde onarımı için kredi yok; veri masasında veri paketi sat.') + ' Gövde ' + g.govde + ' / ' + g.maxGovde + '. Kalan kredi ' + Math.round(d.para.gk) + '.', ses: 'kaynak' };
}

// --- Ticaret masası ---
function fiyat(d, f, alim) {
  const k = SB.kabiliyet(d, 'uma', 2) ? 0.1 : 0;
  return Math.max(alim ? 1 : 0, Math.round(f * (alim ? 1 - k : 1 + k) * 10) / 10);
}
function paraAdi(p) {
  return p === 'isik' ? 'gram ışık tozu' : 'Malken Lirası';
}
function paraVar(d, p) {
  return p === 'isik' ? d.koloni.kaynaklar.isik_tozu || 0 : d.para.ml;
}
function paraEkle(d, p, n) {
  if (p === 'isik') d.koloni.kaynaklar.isik_tozu = (d.koloni.kaynaklar.isik_tozu || 0) + n;
  else d.para.ml += n;
}
export function satinAl(d, pz, k) {
  hazirla(d);
  const P = PAZARLAR[pz];
  const f = fiyat(d, P.satar[k], true);
  if (paraVar(d, P.para) < f) return { metin: adi(k) + ' ' + f + ' ' + paraAdi(P.para) + '. Paran yetmiyor: ' + paraMetni(d), ses: 'red' };
  paraEkle(d, P.para, -f);
  ekle(d, k, 1);
  SB.ekolKazan(d, 'uma', 2);
  let ek = '';
  if (ESYA[k] && ESYA[k].yasakli) {
    d.itibar = Math.max(0, d.itibar - 5);
    ek = ' Karaborsadan alışveriş: itibar beş düştü.';
  }
  return { metin: 'Bir ' + adi(k) + ' aldın, ' + f + ' ' + paraAdi(P.para) + '.' + ek + ' ' + paraMetni(d), ses: 'dugme' };
}
export function sat(d, pz, k, hepsi = false) {
  hazirla(d);
  const P = PAZARLAR[pz];
  const n = hepsi ? miktar(d, k) : Math.min(1, miktar(d, k));
  if (!n) return { metin: 'Elinde ' + adi(k) + ' yok.', ses: 'red' };
  const f = fiyat(d, P.alir[k], false);
  ekle(d, k, -n);
  paraEkle(d, P.para, Math.round(f * n * 10) / 10);
  SB.ekolKazan(d, 'uma', 2);
  return { metin: n + ' ' + adi(k) + ' sattın: ' + Math.round(f * n * 10) / 10 + ' ' + paraAdi(P.para) + '. ' + paraMetni(d), ses: 'dugme' };
}
export function pazarMenu(d, pz) {
  hazirla(d);
  const P = PAZARLAR[pz];
  const n = Z_NOKTALAR[pz];
  return {
    baslik: n.ad,
    giris: (P.para === 'isik' ? 'Burada yalnız Fenrir ışık tozu geçer. ' : '') + paraMetni(d),
    ogeler: [
      { id: 'al', etiket: 'Satın al', alt: (x) => ({ baslik: 'Satın al', giris: paraMetni(x), ogeler: Object.keys(P.satar).map((k) => ({ id: k, etiket: adi(k) + ': ' + fiyat(x, P.satar[k], true) + ' ' + paraAdi(P.para) + '. Elinde ' + miktar(x, k) + '.', yap: (y) => satinAl(y, pz, k) })) }) },
      { id: 'sat', etiket: 'Sat', alt: (x) => ({ baslik: 'Sat', giris: 'Bir kez dokun: bir tane; listenin sonunda hepsini sat.', ogeler: [...Object.keys(P.alir).map((k) => ({ id: k, etiket: adi(k) + ': tanesi ' + fiyat(x, P.alir[k], false) + ' ' + paraAdi(P.para) + '. Elinde ' + Math.round(miktar(x, k)) + '.', yap: (y) => sat(y, pz, k) })), ...Object.keys(P.alir).filter((k) => miktar(x, k) > 1).map((k) => ({ id: 'h_' + k, etiket: 'Bütün ' + adi(k) + ' stoğunu sat', yap: (y) => sat(y, pz, k, true) }))] }) },
      ...(P.para === 'ml' ? [{ id: 'kur', etiket: 'Kur: ışık tozu ' + ISIK_ML + ' lira', alt: (x) => kurMenu(x) }] : [{ id: 'kur', etiket: 'Kur: ışık tozu ' + ISIK_ML + ' lira', alt: (x) => kurMenu(x) }]),
      ...(n.liman ? [{ id: 'istihdam', etiket: 'Tavernadaki subaylar', ipucu: 'İstasyonlarına subay istihdam et.', alt: (x) => istihdamMenu(x, pz) }] : []),
    ],
  };
}
export function kurMenu(d) {
  return {
    baslik: 'Para kuru',
    giris: 'Bir gram Fenrir ışık tozu elli Malken Lirası. ' + paraMetni(d),
    ogeler: [
      { id: 'isik_al', etiket: '10 gram ışık tozu al: ' + 10 * ISIK_ML + ' lira', yap: (x) => kurIslem(x, 10) },
      { id: 'isik_sat', etiket: '10 gram ışık tozu boz: ' + 10 * ISIK_ML + ' lira', yap: (x) => kurIslem(x, -10) },
    ],
  };
}
export function kurIslem(d, g) {
  hazirla(d);
  if (g > 0 && d.para.ml < g * ISIK_ML) return { metin: 'Liran yetmiyor. ' + paraMetni(d), ses: 'red' };
  if (g < 0 && (d.koloni.kaynaklar.isik_tozu || 0) < -g) return { metin: 'Işık tozun yetmiyor. ' + paraMetni(d), ses: 'red' };
  d.para.ml -= g * ISIK_ML;
  d.koloni.kaynaklar.isik_tozu = (d.koloni.kaynaklar.isik_tozu || 0) + g;
  return { metin: 'Tamam. ' + paraMetni(d), ses: 'dugme' };
}
export function veriMenu(d) {
  hazirla(d);
  const v = veriPaketleri(d);
  return {
    baslik: 'Derin uzay veri masası',
    giris: 'Satılmamış ' + v.op.length + ' operasyon ve ' + v.kd.length + ' kodeks kaydı: ' + v.gk + ' kredi. ' + paraMetni(d),
    ogeler: [
      { id: 'sat', etiket: 'Veri paketlerini Akademiye sat', yap: (x) => veriSat(x) },
      { id: 'boz', etiket: '100 krediyi Malken Lirası\'na çevir: ' + 100 * GK_ML + ' lira', yap: (x) => krediBoz(x, 100) },
      { id: 'kartus', etiket: 'İki plazma kartuşu al: 40 kredi', yap: (x) => krediyleAl(x, 'plazma_kartusu', 2, 40) },
    ],
  };
}
export function krediBoz(d, n) {
  hazirla(d);
  if (d.para.gk < n) return { metin: 'Kredin yetmiyor. ' + paraMetni(d), ses: 'red' };
  d.para.gk -= n;
  d.para.ml += n * GK_ML;
  return { metin: 'Tamam. ' + paraMetni(d), ses: 'dugme' };
}
function krediyleAl(d, k, n, f) {
  hazirla(d);
  if (d.para.gk < f) return { metin: 'Kredin yetmiyor. ' + paraMetni(d), ses: 'red' };
  d.para.gk -= f;
  ekle(d, k, n);
  return { metin: n + ' ' + adi(k) + ' ambara. ' + paraMetni(d), ses: 'dugme' };
}

// --- Subaylar: kurul ve istasyonlar ---
const ERKEK = ['Kaelen', 'Torvin', 'Ilyas', 'Maren', 'Soryn', 'Daven', 'Tharos', 'Velin', 'Oren', 'Caspar'];
const KADIN = ['Lysara', 'Nerith', 'Ilvane', 'Seraya', 'Tavia', 'Ormenne', 'Yvera', 'Kessa', 'Amaris', 'Thelia'];
const SOYAD = ['Val-Oren', 'Mar-Ithel', 'Sel-Kara', 'Dor-Vash', 'Nel-Amar', 'Ras-Tulen', 'Kor-Ennis', 'Tal-Vey', 'Iss-Ravel', 'Zen-Hart'];
const KOKEN = { tentran_tuccari: 'Tentran platform kenti', veradon_hani: 'Veradon liman kasabası', julithan_limani: 'Julithan Cumhuriyeti', nerya_limani: 'Nerya şehir devletleri' };
function zar(d, i) {
  const x = Math.sin((d.tohum || 1) * 3.17 + i * 91.7) * 43758.5453;
  return x - Math.floor(x);
}
// Limandaki iki aday her gün değişir
export function adaylar(d, pz) {
  const gun = Math.floor(((d.zaman && d.zaman.sn) || 0) / 7200);
  const l = [];
  for (let i = 0; i < 2; i++) {
    const t = gun * 13 + i * 7 + pz.length * 31;
    const ekol = SB.EKOL_SIRASI[Math.floor(zar(d, t) * 6)];
    const k = zar(d, t + 1) < 0.5 ? 'e' : 'k';
    const ad = (k === 'e' ? ERKEK : KADIN)[Math.floor(zar(d, t + 2) * 10)] + ' ' + SOYAD[Math.floor(zar(d, t + 3) * 10)];
    const kidem = 1 + Math.floor(zar(d, t + 4) * 2);
    l.push({ id: 'p_' + gun + '_' + pz + '_' + i, ad, cinsiyet: k, koken: KOKEN[pz] || 'Malkenia', ekol, kidem, puan: SB.KIDEMLER[kidem - 1].esik, ucret: 150 * kidem, cekirdek: false });
  }
  return l;
}
function istasyonEkol(ist) {
  return SB.ISTASYONLAR[ist].ekol;
}
export function istihdamEt(d, pz, i) {
  hazirla(d);
  const a = adaylar(d, pz)[i];
  if (Object.values(d.istasyonlar).some((s) => s && s.id === a.id)) return { metin: a.ad + ' zaten gemide.', ses: 'red' };
  const ist = SB.ISTASYON_SIRASI.find((x) => istasyonEkol(x) === a.ekol);
  if (d.istasyonlar[ist]) return { metin: SB.ISTASYONLAR[ist].ad + ' dolu: ' + d.istasyonlar[ist].ad + '. Önce Subaylar menüsünden istasyonu boşalt.', ses: 'red' };
  if (d.para.ml < a.ucret) return { metin: a.ad + ' ' + a.ucret + ' lira avans istiyor. ' + paraMetni(d), ses: 'red' };
  d.para.ml -= a.ucret;
  d.istasyonlar[ist] = { ...a, istasyon: ist };
  return { metin: a.ad + ' ' + SB.ISTASYONLAR[ist].unvan + ' olarak ' + SB.ISTASYONLAR[ist].ad + '\'na geçti. ' + SB.EKOLLER[a.ekol].ad + ', ' + SB.KIDEMLER[a.kidem - 1].ad + '.', ses: 'kapi_gemi' };
}
export function istihdamMenu(d, pz) {
  hazirla(d);
  return {
    baslik: 'Tavernadaki subaylar',
    giris: 'Bugün iki aday var; yarın başkaları. ' + paraMetni(d),
    ogeler: adaylar(d, pz).map((a, i) => {
      const ist = SB.ISTASYON_SIRASI.find((x) => istasyonEkol(x) === a.ekol);
      return { id: 'a' + i, etiket: a.ad + ', ' + a.koken + '. ' + SB.EKOLLER[a.ekol].ad + ', ' + SB.KIDEMLER[a.kidem - 1].ad + '. ' + SB.ISTASYONLAR[ist].unvan + ' olabilir. Avans ' + a.ucret + ' lira.', yap: (x) => istihdamEt(x, pz, i) };
    }),
  };
}
export function cekirdekAl(d, anahtar) {
  hazirla(d);
  if (!d.bayrak.ygkKayit) return { metin: 'Kurul: "Önce kabul masasına kendini bildir, Kaptan."', ses: 'red' };
  const s = SB.SUBAYLAR[anahtar];
  const ist = s.istasyon;
  const v = d.istasyonlar[ist];
  if (v && v.anahtar === anahtar) return { metin: s.ad + ' zaten gemide.', ses: 'red' };
  const ek = v ? ' ' + v.ad + ' istasyondan ayrıldı.' : '';
  d.istasyonlar[ist] = { id: 's_' + anahtar, anahtar, ad: s.ad, cinsiyet: s.cinsiyet, koken: s.koken, ekol: s.ekol, kidem: 3, puan: 300, cekirdek: true, istasyon: ist };
  return { metin: s.ad + ', ' + SB.ISTASYONLAR[ist].unvan + ', gemine katıldı.' + ek + ' ' + s.karakter + ' Pasif: ' + s.pasif + ' Savaş yeteneği, ' + s.aktif.ad + ': ' + s.aktif.tarif, ses: 'kapi_gemi' };
}
export function kurulMenu(d) {
  hazirla(d);
  return {
    baslik: 'Akademi subay kurulu',
    giris: 'YGK\'nin altı seçkin subayı. Birini seçince gemindeki istasyonuna geçer.',
    ogeler: SB.SUBAY_SIRASI.map((k) => {
      const s = SB.SUBAYLAR[k];
      const v = d.istasyonlar[s.istasyon];
      const gemide = v && v.anahtar === k;
      return { id: k, etiket: s.ad + ', ' + SB.ISTASYONLAR[s.istasyon].unvan + (s.ekol ? ', ' + SB.EKOLLER[s.ekol].ad : ', ' + s.koken) + '. ' + (gemide ? 'Gemide.' : 'Görevlendirilebilir.') + ' ' + s.pasif, yap: (x) => cekirdekAl(x, k) };
    }),
  };
}
export function istasyonBosalt(d, ist) {
  const v = d.istasyonlar[ist];
  if (!v) return { metin: 'İstasyon zaten boş.', ses: 'red' };
  d.istasyonlar[ist] = null;
  return { metin: v.ad + ' istasyondan ayrıldı' + (v.cekirdek ? '; Akademinin subay kurulunda yeniden görevlendirilebilir.' : '.'), ses: 'dugme' };
}
// Prosedürel istasyon modeli (yönerge 6.C) sesli dökümü
export function istasyonMetni(d, ist) {
  const I = SB.ISTASYONLAR[ist];
  const s = d.istasyonlar && d.istasyonlar[ist];
  if (!s) return I.ad + ': boş. ' + I.unvan + ' bekliyor.';
  const ana = s.cekirdek ? SB.SUBAYLAR[s.anahtar] : SB.SUBAYLAR[SB.SUBAY_SIRASI.find((k) => SB.SUBAYLAR[k].istasyon === ist)];
  const kd = SB.kidemNo(s.puan || 0, s.kidem || 1);
  return I.ad + ': ' + I.unvan + ' ' + s.ad + ', ' + s.koken + (s.ekol ? ', ' + SB.EKOLLER[s.ekol].ad : '') + ', kıdem ' + SB.KIDEMLER[kd - 1].ad + '. Savaş yeteneği: ' + ana.aktif.ad + '. Pasif: ' + ana.pasif + (s.cekirdek ? '' : ' (kıdemine göre yüzde ' + Math.round(SB.guc(d, ist) * 100) + ' etkiyle)');
}
export function subayMenu(d) {
  hazirla(d);
  return {
    baslik: 'Subaylar ve istasyonlar',
    giris: 'Kaptan: ' + SB.KAPTAN.unvan + '. ' + SB.KAPTAN.pasif + ' Komuta yeteneği, ' + SB.KAPTAN.aktif.ad + ': ' + SB.KAPTAN.aktif.tarif + ' Savaşta oyuncu evresinde aşağı kaydır: yetenek seç; çift dokun: kullan.',
    ogeler: [
      ...SB.ISTASYON_SIRASI.map((ist) => ({
        id: ist,
        etiket: istasyonMetni(d, ist),
        alt: (x) => ({ baslik: SB.ISTASYONLAR[ist].ad, giris: istasyonMetni(x, ist), ogeler: x.istasyonlar[ist] ? [{ id: 'bosalt', etiket: 'İstasyonu boşalt', yap: (y) => istasyonBosalt(y, ist), geri: true }] : [] }),
      })),
      ...(d.istasyonlar.revir ? [{ id: 'biyo', etiket: 'Biyo-kalkanı aç: bir saat zehirli atmosfer süzülür', ipucu: 'Günde bir kez.', yap: (x) => biyoKalkan(x) }] : []),
    ],
  };
}
// Revirdeki subayın biyo-kalkanı yüzeyde (bir oyun saati, günde bir kez)
export function biyoKalkan(d) {
  const sn = (d.zaman && d.zaman.sn) || 0;
  const gun = Math.floor(sn / 7200);
  if (d.biyoKalkanGun === gun) return { metin: 'Spor kültürleri bugün tükendi; yarın yeniden.', ses: 'red' };
  d.biyoKalkanGun = gun;
  d.biyoKalkanBitis = sn + 300 * (0.5 + 0.5 * SB.guc(d, 'revir'));
  return { metin: d.istasyonlar.revir.ad + ' sporları maskene ve gemi havalandırmasına yaydı: zehirli atmosfer bir süre tamamen süzülüyor.', ses: 'tislama' };
}
export function ekolMenu(d) {
  return {
    baslik: 'Yıldız Ekolü kıdemi',
    giris: 'Statik seviye yok; altı ekolde kıdem puanı. Her kademe yeni bir kabiliyet açar.',
    ogeler: SB.EKOL_SIRASI.map((e) => ({
      id: e,
      etiket: SB.ekolMetni(d, e),
      alt: (x) => ({
        baslik: SB.EKOLLER[e].ad,
        giris: SB.ekolMetni(x, e),
        ogeler: [2, 3, 4].map((k) => ({ id: 'k' + k, etiket: SB.KIDEMLER[k - 1].ad + ': ' + SB.KABILIYETLER[e + '_' + k].ad + (SB.kabiliyet(x, e, k) ? ', açık. ' : ', kapalı. ') + SB.KABILIYETLER[e + '_' + k].tarif })),
      }),
    })),
  };
}

// --- Noktalar ---
export function noktaMi(id) {
  return !!(Z_NOKTALAR[id] && Z_NOKTALAR[id].zanaat);
}
export function noktaEylemleri(d, id) {
  const z = Z_NOKTALAR[id].zanaat;
  const e = [];
  if (z === 'kurul') e.push({ id: 'z_kurul', etiket: 'Kurula danış', ipucu: 'Çekirdek subayları gemine görevlendir.' });
  if (z === 'veri') e.push({ id: 'z_veri', etiket: 'Veri masasına otur', ipucu: 'Veri paketi sat, kredi boz.' });
  if (z === 'pazar') e.push({ id: 'z_pazar', etiket: 'Ticaret masası' });
  e.push({ id: 'incele', etiket: 'İncele' });
  return e;
}
export function eylemUygula(d, id, eid) {
  hazirla(d);
  if (eid === 'z_sarj') return { metin: '', bekle: sarjKalan(d) };
  const n = Z_NOKTALAR[id];
  if (eid === 'z_kurul') return { agac: (x) => kurulMenu(x) };
  if (eid === 'z_veri') return { agac: (x) => veriMenu(x) };
  if (eid === 'z_pazar') return { agac: (x) => pazarMenu(x, id) };
  return { metin: n.tarif || n.ad };
}

// --- Kıdem: türetilen puanlar (gorevler.zamanIlerle her adımda) ---
// Yeni Tonoflenya bölgesi görmek Gümüş, tamamlanan operasyon Gümüş, fenomen keşfi Mavi kıdem puanı verir.
export function ekolDenetle(d, MEKANLAR, FENOMENLER) {
  if (!d.ekolSayac) d.ekolSayac = { mekan: 0, op: 0, fen: 0 };
  const c = d.ekolSayac;
  const m = (d.gorulenMekanlar || []).filter((x) => MEKANLAR[x] && MEKANLAR[x].tonoflenya).length;
  if (m > c.mekan) SB.ekolKazan(d, 'zhaor', (m - c.mekan) * 10);
  const op = (d.tamamlananOp || []).filter((x) => !FENOMENLER[x]).length;
  const fen = (d.tamamlananOp || []).filter((x) => FENOMENLER[x]).length;
  if (op > c.op) SB.ekolKazan(d, 'zhaor', (op - c.op) * 20);
  if (fen > c.fen) SB.ekolKazan(d, 'sinha', (fen - c.fen) * 15);
  c.mekan = m;
  c.op = op;
  c.fen = fen;
}
