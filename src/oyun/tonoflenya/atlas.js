// Tonoflenya'nın büyük coğrafi atlası (belgeler/tonoflenya-buyuk-cografi-atlasi.md). Saf JavaScript.
//
//   Beş kuşak (bölüm 1): merkez (Magentor, YGK, kırsal), kuzey (Mormon adaları, Malazar'ın dört katmanı, Zeris, kuzey
//   krallıkları), batı (Loran, Julithan, Anitor, Filtra, Safran), doğu (Zorah'ın beş katmanı, Hardrin, Kahergonat),
//   güney (Fleeplee, Tentran, Fenrir, Arin, Veradon, güney iç krallıkları). Her bölge bir ya da birkaç mekân.
//   Uzak yolculuk "Tonoflenya haritası"ndan (final-gorevleri 1.2: makro harita → bölge): ROTALAR atlasın 7.2 tablosu
//   ve 7.3 büyük çemberi; süre oyun günü (7200 sn) olarak Yıldız Zamanı'nı ileri sarar, her ayağın tehlikesi işler.
//   Kahergonat Yolu yalnız Mavi Akşam (Sinha) nöbetinde açıktır (4.2: "belirli yıldız hizalanmalarında").
//   Şehir içi ışınlanma istasyonları (2.4): Merkez İstasyon (yetkili araştırmacılar: Kara Göl izni), Fenrir Kapısı,
//   Zorah Kapıları.
//   Bayraklar: d.bayrak.zerisIzni (Zeris'in üst katları), d.tBolge (son bölge; bilgi).
import { nobet, kalanSn } from '../zaman';
import * as SB from './subay';

export const GUN = 7200; // bir oyun günü (altı nöbet)
const dis = (ad, tarif, bati, ortam, ek = {}) => ({ ad, tarif, alan: { bati, dogu: bati + 60, guney: 0, kuzey: 60 }, ortam, zemin: 'tas', dis: true, tonoflenya: true, ...ek });
const X = (i) => 10000 + i * 100;

export const A_MEKANLAR = {
  // Merkez kuşak
  axira_cemberi: dis('Axira Çemberi', 'Sarayı şehirden ayıran geniş, oval meydan. Taban taşları gündüz yıldız ışığını hapseder, ışıklar kısılınca zeminden yukarı yumuşak, kılavuz bir ışıltı yayar. Sarayın kristal katmanları yukarı doğru renk değiştiriyor: tabanda donuk mavi-gri, ortada mor, yeşil, turkuaz, zirvede saf aether.', X(0), 'ortam_t_cember'),
  kristal_teraslar: dis('Kristal Teraslar', 'Şehir surlarının dışında, kuzey yamaçlarda rüzgârla beslenen ve büyü kristallerinin yetiştirildiği basamaklı teraslar; her esintide yüzlerce kristal çınlıyor.', X(1), 'ortam_t_teras'),
  tas_cember: dis('Taş Çember Köyleri', 'Doğu iç kesimde Axira Irmağı boyunca dizilmiş dairesel köyler; ırmak şırıldıyor, su değirmenleri dönüyor.', X(2), 'ortam_t_koy'),
  // Kuzey kuşağı
  gumus_tuy: dis('Gümüş Tüy Takımadaları', 'Kıyılarında rüzgârla gümüş gibi dalgalanan sazlıkların yetiştiği uzun, ince adalar zinciri. Malazar seferlerinin ilk ikmal ve sığınak üssü.', X(3), 'ortam_t_ada'),
  gozlem_adalari: dis('Gözlem Adaları', 'Malazar ile Zeris arasında serpiştirilmiş küçük kayalıklar; deniz fenerleri, akıntı rasathaneleri, ışık gözlem kuleleri. Mormon\'un akıntıları burada doğrusal değil, Malazar\'ın çevresinde spiral halkalar hâlinde dönüyor.', X(4), 'ortam_t_mormon'),
  halyon: dis('Halyon Adası', 'Öbür adalardan uzak, bağımsız, büyük bir kara parçası: YGK denetiminde tehlikeli büyü deneyleri yapan bilginlerin ve Magentor\'dan sürülen asi büyücülerin tutulduğu yarı sürgün, yarı araştırma merkezi.', X(5), 'ortam_t_mormon'),
  zeris: dis('Zeris Kulesi, Kuzey Gözü', 'Mormon\'un tam kuzeyinde, batmaz bir kaya kütlesinin üstüne kurulmuş, atmosferin sınırına uzanan ince kristal-metal kule.', X(6), 'ortam_t_zeris'),
  valdren: dis('Valdren Tundrası', 'En batıda, dondurucu rüzgârların estiği, yosun ve liken kaplı düzlükler.', X(7), 'ortam_t_tundra', { soguk: true }),
  norvask: dis('Norvask Buz Krallığı', 'Mormon kıyısında donmuş fiyortlara kurulu sert denizciler ülkesi: balina ve deniz canavarı avcıları, buz gemisi ustaları.', X(8), 'ortam_t_tundra', { soguk: true }),
  helgar: dis('Helgar Kara Buz Dükalığı', 'Dağlık iç kesimde, erimeyen siyah buz kütlelerini işleyip kırılmaz zırh ve yapı üreten sanayi dükalığı.', X(9), 'ortam_t_tundra', { soguk: true }),
  drahmir: dis('Drahmir Krallığı', 'Mavi Hardrin\'in kuzey koluna yaslanan tampon krallık; Kahergonat Yolu\'nu tutar. Kuzey buzullarıyla doğu çölleri arasındaki tek geçit.', X(10), 'ortam_t_kale'),
  malazar_hale: dis('Malazar: Hâle Bölgesi', 'Sürekli dönen büyü fırtınaları, iyonize şimşekler ve öldürücü aether akımları. Her nefeste ağzında metal tadı.', X(11), 'ortam_t_malazar', { statik: true, zehirli: true, maruziyet: 'Aether akımı maruziyeti' }),
  malazar_zirve: dis('Malazar: Tepe ve Pelerin Zirvesi', 'Yoğun toz bulutları ve kristalleşmiş buzullar; fani gözün seçemediği, saf kozmik gücün yoğunlaştığı kutsal doruk.', X(12), 'ortam_t_malazar', { soguk: true }),
  // Batı kuşağı
  loran: dis('Loran Vadisi', 'Zinas\'ın ortasında dik falezlerle korunan ada-vadi: dış kayalıklarda dalgalar kırılırken içeride ılıman, sakin bir sığınak. YGK ile ortak deniz biyolojisi ve dalga enerjisi istasyonları.', X(13), 'ortam_t_loran'),
  julithan: dis('Julithan Cumhuriyeti', 'Batı Kıtası\'nın doğu sahilinde tüccar ve diplomatlar cumhuriyeti; Magentor\'dan gelen bütün ticaret bu limanlardan girer. Bürokratik meclisler, batının beyni.', X(14), 'ortam_t_liman'),
  anitor: dis('Anitor Krallığı, Brastion', 'Açık okyanusa bakan fırtınalı kıyıda feodal askerî devlet; başkent Brastion dev hisarlarla çevrili. Korzel Burnu ve Darnak Limanı hem savaş filolarını hem batı korsanlarını barındırır.', X(15), 'ortam_t_kale'),
  filtra: dis('Filtra, Kızılkaya Filtrum', 'Kırmızı-kahverengi oksitlenmiş metal görünümlü dağların arasındaki yüksek platoda ağır sanayi kenti: nadir alaşımlar, Malken büyüsüyle kaba mekaniği birleştiren zırh ve top dökümü.', X(16), 'ortam_t_sanayi'),
  safran: dis('Safran Sıradağları', 'Julithan ve Anitor\'un bütün güneyini duvar gibi kapatan sarı ve turuncu kükürtlü kayalıklar. Ötesi henüz haritalanmamış.', X(17), 'ortam_t_kukurt', { zehirli: true }),
  // Doğu kuşağı
  gri_yel: dis('Gri Yel Burcu ve Zorah\'ın batı kenarı', 'Magentor\'un doğu kapısı; ardında yarı kurak ticaret sahası: sınır kaleleri, kervansaraylar, kum büyücüleri loncası. Kristalli toprak burada kuru rüzgâra dönüyor.', X(18), 'ortam_t_col'),
  ajmero: dis('İç Dune Kuşağı ve Ajmero Kulesi', 'Durmadan yer değiştiren dev kum tepelerinin ortasında göğe yükselen Ajmero Kulesi ve çevresindeki oval taş sunak. Rüzgâr kuleye çarptıkça sesli bir rezonans yayılıyor.', X(19), 'ortam_t_col'),
  golge_hatti: dis('Kuzey Gölge Hattı', 'Mavi Hardrin\'in eteklerine vuran, dağların gölgesinde kalmış sisli ve soğuk kum kuşağı.', X(20), 'ortam_t_kanyon'),
  cam_duzlukleri: dis('Güney Cam Düzlükleri', 'Antik plazma ve büyü patlamalarında eriyip dev cam levhalara dönüşmüş kum: ayna gibi parlak, son derece kaygan, tehlikeli.', X(21), 'ortam_t_cam', { zemin: 'cam' }),
  kirik_vadi: dis('Doğu Kırık Vadi', 'Yer kabuğunun yarıldığı yerde antik şehir kalıntıları ve kurumuş nehir yataklarıyla dolu derin bir kanyon labirenti.', X(22), 'ortam_t_kanyon'),
  hardrin: dis('Mavi Hardrin Dağları', 'Gece kayalarındaki aether damarlarından mavi ışık sızdıran dev bir jeolojik büyü duvarı. Büyü pusulaları sapıyor, yön duygusu kayboluyor, yer yer gerçeklik katlanıyor. Üç boğaz: Nirdol Boynu, Morluk Kapısı, Kahergonat Yolu.', X(23), 'ortam_t_hardrin', { radarMenzili: 25 }),
  kahergonat: dis('Kahergonat', 'Sis ve kara buzun birleştiği uçurumlara oyulmuş şehir: sönmüş tanrıların sunakları, siyah bazalt kuleler, ışığı yutan dar kanyonlar. Alt Evren kalıntılarının ve unutulmuş tarikatların sığınağı.', X(24), 'ortam_t_kahergonat', { soguk: true }),
  // Güney kuşağı
  tharal: dis('Tharal Krallığı', 'Tarım ve orman arazileriyle geleneksel feodal bir krallık; Fenrir tozu ticaretiyle zenginleşmiş.', X(25), 'ortam_t_orman'),
  nerya: dis('Nerya Şehir Devletleri', 'Kanallarla bölünmüş, ticaret loncalarının yönettiği zengin sahil kentleri.', X(26), 'ortam_t_liman'),
  oredan: dis('Oredan Dükalığı', 'Mor Anzelon Dağları\'nın güney geçitlerini tutan askerî dükalık.', X(27), 'ortam_t_kale'),
  keralon: dis('Keralon Bataklıkları', 'Büyülü gazların ve kseno-canlıların kaynaştığı, yolculuğu son derece riskli bataklık kuşağı.', X(28), 'ortam_t_bataklik', { zehirli: true, maruziyet: 'Bataklık gazı maruziyeti' }),
};

const u = (mekan, x, y, yon, ad) => ({ mekan, x, y, yon, ad });
export const A_KAPILAR = {
  cember_saray: { ad: 'Sarayın kapısı', uclar: [u('axira_cemberi', X(0) + 30, 58.5, 0, 'Malken Sarayı, Tenohris'), u('tenohris', 7612, 1.5, Math.PI, 'Axira Çemberi\'ne çıkış')] },
  hale_yolu: {
    ad: 'Hâle Bölgesi\'ne tırmanış', uclar: [u('malazar_ocaklari', 9218.5, 10, Math.PI / 2, 'Hâle Bölgesi\'ne çıkan kuyu'), u('malazar_hale', X(11) + 30, 1.5, Math.PI, 'Ocaklara inen kuyu')],
    gecisMetni: ['Kuyudan yukarı çıktıkça hava iyonlaşıyor; dişlerinde çıtırtı. Hâle Bölgesi: aether akımları öldürücü, maruziyetine dikkat.', 'Ocakların görece sakin havasına iniyorsun.'],
  },
  zirve_yolu: {
    ad: 'Pelerin Zirvesi\'ne tırmanış', uclar: [u('malazar_hale', X(11) + 30, 58.5, 0, 'Zirveye tırmanış'), u('malazar_zirve', X(12) + 30, 1.5, Math.PI, 'Hâle Bölgesi\'ne iniş')],
    gecisMetni: ['Fırtınanın üstüne çıkıyorsun; birden her şey donuyor. Toz bulutları ve buzullar: Pelerin Zirvesi.', 'Fırtınanın içine geri iniyorsun.'],
  },
};

const n = (mekan, x, y, ad, tarif, ek = {}) => ({ mekan, x, y, ad, tarif, yaricap: 2.2, ...ek });
export const A_NOKTALAR = {
  // Magentor'un halkalarına atlasın işlevleri (iki belge halkaları farklı anlatıyor; ikisi birlikte)
  zanaat_atolyesi: n('halka_zhaor', 7050, 12, 'İnce zanaat atölyeleri', 'Kristal oymacıları, vitray pencereli galeriler, mücevher loncaları; çekiç tıkırtıları kemerli geçitlerde yankılanıyor.'),
  fenrir_istasyonu: n('halka_zhaor', 7020, 8, 'Fenrir Kapısı İstasyonu', 'Fenrir Caddesi\'nin sonundaki ışınlanma istasyonu: Fleeplee\'ye ve Tentran\'a.', { atlas: 'istasyon', hedefler: ['fleeplee', 'tentran'] }),
  varek_kislasi: n('halka_varek', 7145, 15, 'Varek kışlaları', 'Geniş tatbikat meydanları, kalın duvarlı garnizonlar, strateji odaları; sürekli metal çekiç sesleri ve intizam.'),
  bati_kapisi: n('halka_varek', 7105, 45, 'Batı Şehir Kapısı', 'Rüzgârlı falezlere açılan kapı: Zinas Okyanusu\'na ve Batı Kıtası\'na giden deniz rotaları burada başlar. Tonoflenya haritasından Loran\'a yelken açılır.'),
  halk_pazari: n('halka_axira', 7245, 45, 'Büyük halk pazarı', 'Göçebe hanları, seyyar tezgâhlar, çok dilli kalabalık; sokak lezzetleri, pazarlık sesleri, büyü parıltıları.'),
  sifahane: n('halka_sinha', 7315, 45, 'Botanik bahçeleri ve şifahane', 'Yeşil teraslar, gölgelikli taş yollar, şifalı ot kokusu, fıskiyeli havuzlar; tohum ambarları ve kseno-biyoloji merkezleri.', { atlas: 'sifahane' }),
  kanun_panolari: n('halka_uma', 7445, 45, 'Kütüphaneler ve kanun panoları', 'Dar, düzenli sokaklar; cephelerde kristal panolara kazınmış kadim kanunlar, küçük rasathaneler, sessiz bir ağırbaşlılık.'),
  zaman_kulesi: n('halka_elyndra', 7545, 45, 'Zaman kuleleri ve yüksek yargı', 'Yüksek tavanlı taş binalar, çan sesleri, düzenli devriyeler; astroloji enstitüleri nöbetleri buradan duyurur.', { atlas: 'zaman' }),
  zorah_istasyonu: n('dogu_kanton', 7950, 50, 'Zorah Kapıları İstasyonu', 'Zorah Kapıları Yolu\'ndaki ışınlanma istasyonu: Gri Yel Burcu\'na.', { atlas: 'istasyon', hedefler: ['gri_yel'] }),
  merkez_istasyon: n('tenohris', 7615, 16, 'Merkez İstasyon', 'Sarayın altındaki ışınlanma istasyonu; yalnız yetkili Malken\'ler ve kıdemli araştırmacılar kullanır: YGK, Tentran, Loran.', { atlas: 'istasyon', hedefler: ['ygk', 'tentran', 'loran'], yetki: true }),
  aether_aritici: n('tenohris', 7604, 14, 'Aether arıtma halkası', 'Çekirdeğin yanında, ham kristali saf aethere çeviren dönen bir halka.', { atlas: 'arit' }),
  isik_kabartmasi: n('axira_cemberi', X(0) + 15, 30, 'Altı yıldızın kristal kabartmaları', 'Sarayın cephesinden dışarı taşan dev kabartmalar ve gözlem balkonları; Axira şerefine ince sütunlu hava terasları.'),
  kristal_fidanlik: n('kristal_teraslar', X(1) + 30, 30, 'Kristal fidanlığı', 'Rüzgârla büyüyen genç kristaller; bahçıvanlar her birinin tınısını dinleyip budar.', { kaynak: 'kristal', stok: 3, ses: 'kristal' }),
  degirmen: n('tas_cember', X(2) + 30, 30, 'Su değirmeni', 'Axira Irmağı\'nın döndürdüğü taş değirmen; köylüler un ve ırmak hikâyeleri satıyor.'),
  // Kuzey
  sazlik: n('gumus_tuy', X(3) + 30, 30, 'Gümüş sazlıklar', 'Rüzgârda gümüş dalgalar gibi eğilen uzun sazlar; ikmal iskelesi hemen yanında.'),
  akinti_rasathanesi: n('gozlem_adalari', X(4) + 30, 30, 'Akıntı rasathanesi', 'Feneri ve akıntı ölçerleriyle küçük bir kayalık; Malazar\'ın çevresindeki spiral akıntıların kayıtları.'),
  surgun_kampi: n('halyon', X(5) + 30, 30, 'Sürgün büyücülerin kampı', 'YGK muhafızlarının gözetiminde tehlikeli deneyler; çadırlardan tuhaf ışıklar ve fısıltılar.'),
  zeris_alt: n('zeris', X(6) + 20, 15, 'Zeris, aşağı katlar', 'Deniz akıntısı hesaplama merkezleri, sinyal vericileri, denizaltı gözlem odaları.'),
  zeris_orta: n('zeris', X(6) + 40, 30, 'Zeris, orta katlar', 'YGK ile kuzey krallıklarının ortak büyü-teknoloji laboratuvarları.'),
  zeris_ust: n('zeris', X(6) + 30, 50, 'Zeris, üst katlar', 'Yalnız konsey izniyle girilen gözlem terasları: altı yıldızın hizalanmalarını izler, üst atmosferdeki boyutsal yırtıkları tarar.', { atlas: 'zeris' }),
  liken_duzlugu: n('valdren', X(7) + 30, 30, 'Liken düzlüğü', 'Dondurucu rüzgârın altında yosun ve liken; ayağının altında çıtırdıyor.'),
  buz_tersanesi: n('norvask', X(8) + 30, 30, 'Buz gemisi tersanesi', 'Donmuş fiyortta dev buz gemileri; avcılar uzaktan bir balinanın sesini dinliyor.'),
  kara_buz_ocagi: n('helgar', X(9) + 30, 30, 'Kara buz ocağı', 'Erimeyen siyah buz kütlelerinin kesildiği ocak; ustalar ondan kırılmaz zırh levhaları dövüyor.'),
  drahmir_hisari: n('drahmir', X(10) + 30, 30, 'Drahmir hisarı', 'Kahergonat Yolu\'nun ağzını tutan hisar; muhafızlar yıldız hizalanmasını bekleyen kervanları sayıyor.'),
  morluk_1: n('malazar_ocaklari', 9216, 18, 'Morluk damarı', 'Psişik rezonansı artıran yarı iletken mor kristal tabakası.', { kaynak: 'morluk_kristali', stok: 3, ses: 'kristal' }),
  hale_akimi: n('malazar_hale', X(11) + 40, 30, 'Aether akımı', 'Havada dönen, dokunulamayan bir ışık nehri; yaklaştıkça maruziyet artıyor.', { sutun: true }),
  buzul_aether_1: n('malazar_zirve', X(12) + 30, 40, 'Buzul aether', 'Dondurucu fırtınada oluşmuş sıvımsı kristal; soğuk füzyonda ve reaktör kararlılığında kullanılır.', { kaynak: 'buzul_aether', stok: 2, ses: 'kristal' }),
  tac_seferi: n('malazar', 9015, 15, 'Malken Taç Seferi kampı', 'Saray ve YGK\'nin finanse ettiği ağır zırhlı sefer; madenci iskeleleri ve korunaklı barınaklar.', { atlas: 'konus', soz: 'Sefer komutanı: "Taban kuşağı güvenli, Kaptan. Orta yamaçta damarlar başlar; Hâle\'de aether akımları adamı yakar. Zirveye yalnız tarikat çıkar, bir de deliler."' }),
  madenci_klani: n('malazar_ocaklari', 9206, 18, 'Bağımsız madenci klanı', 'Filtra, Norvask ve Drahmir\'den gelen hızlı, gözü kara madenciler.', { atlas: 'konus', soz: 'Klan reisi: "Saray seferleri yavaş, biz hızlıyız. Morluk damarını bulduk; psişik bir çınlaması var. Al, ama bize de bırak."' }),
  tarikat_muridi: n('malazar_hale', X(11) + 15, 45, 'Malazar Tarikatı müridi', 'Dağı yaşayan bir yarı-tanrı sayıp vizyon arayan mistik bir yolcu; fırtınanın ortasında kıpırdamadan oturuyor.', { atlas: 'konus', soz: 'Mürit gözlerini açmadan: "Dağ nefes alıyor. Pelerinin altında altı yıldızın ışığı birikir. Zirvede buzul aether var; ama dağ yalnız dinleyene verir."' }),
  // Batı
  dalga_istasyonu: n('loran', X(13) + 30, 30, 'Dalga enerjisi istasyonu', 'YGK ile ortak deniz biyolojisi ve dalga enerjisi araştırmaları; gemiler burada ikmal yapar.'),
  julithan_meclisi: n('julithan', X(14) + 30, 30, 'Julithan meclisi', 'Mühürlü kâğıtlar, tartışan delegeler, ticaret kayıtları.'),
  brastion_hisari: n('anitor', X(15) + 30, 30, 'Brastion hisarları', 'Dev surlar; aşağıda Korzel Burnu\'nun sarp kayalıkları ve Darnak Limanı\'nın savaş filoları.'),
  oksit_1: n('filtra', X(16) + 30, 30, 'Oksit alaşım ocağı', 'Kırmızı-kahverengi damarlardan çıkan ağır alaşım; zırh, top ve gemi şasisi için.', { kaynak: 'oksit_celik', stok: 4 }),
  safran_yariklari: n('safran', X(17) + 30, 30, 'Kükürt yarıkları', 'Sarı dumanlar tüten çatlaklar; ötesi haritalanmamış güney toprakları.'),
  // Doğu
  kervansaray: n('gri_yel', X(18) + 30, 30, 'Kervansaray ve kum büyücüleri loncası', 'Deri ve cam atölyeleri, kum büyücülerinin fısıltıları; kervanlar Ajmero\'ya buradan kalkar.'),
  ajmero_kulesi: n('ajmero', X(19) + 30, 30, 'Ajmero Kulesi ve oval sunak', 'Rüzgâr çarptıkça derin bir rezonansla uğuldayan taş kule.', { engel: 1.5, ses: 'kristal' }),
  rezonans_cami_1: n('cam_duzlukleri', X(21) + 30, 30, 'Rezonans camı levhası', 'Erimiş kumdan oluşmuş, tıklayınca uzun süre tınlayan cam; büyü pusulalarında ve sinyal prizmalarında kullanılır.', { kaynak: 'rezonans_cami', stok: 3, ses: 'kristal' }),
  antik_kalinti: n('kirik_vadi', X(22) + 30, 30, 'Antik şehir kalıntıları', 'Kurumuş bir nehir yatağının kıyısında yarı gömülü sütunlar.'),
  mavi_aether_1: n('hardrin', X(23) + 30, 30, 'Mavi aether damarı', 'Kayanın içinden sızan mavi ışık; kazınca ince, soğuk bir toz.', { kaynak: 'mavi_aether', stok: 3, ses: 'kristal' }),
  bogazlar: n('hardrin', X(23) + 15, 50, 'Üç boğaz', 'Batıda Nirdol Boynu (Malkenia\'nın kuzeyine ve Mormon kıyılarına), ortada Morluk Kapısı (kaçak kervanlar ve münzeviler), doğuda Kahergonat Yolu (buz koridorları; yalnız belli yıldız hizalanmalarında açık).'),
  sonmus_sunak: n('kahergonat', X(24) + 30, 30, 'Sönmüş tanrıların sunağı', 'Siyah bazalt kulelerin arasında soğuk bir sunak; taşı ışığı yutuyor.'),
  // Güney
  toz_iskelesi: n('flee_plee', 6250, 20, 'Toz iskeleleri', 'Fenrir kıyısına uzanan kristal kaplı iskeleler; kıyıya vuran ışık tozu tüplere hapsedilip YGK\'ye gönderiliyor.', { atlas: 'toz' }),
  sahil_mabedi: n('flee_plee', 6220, 45, 'Sahil mabedi', 'Fenrir\'in akışkan ruhuna adanmış açık kaya tapınağı; rüzgâr ve toz içinden geçiyor.'),
  itim_alani: n('fenrir', 6415, 45, 'Ters yerçekimi itim alanı', 'Belli bir derinlikten sonra maddeyi yukarı fırlatan itim kuvveti; Fenrir\'in dibine klasik yollarla inilmez. Kayığın kalkanı burada titriyor.'),
  kanatli_halk: n('arin', 6605, 6, 'Arin\'in kanatlı halkı', 'Hafif süzülme aparatları ve rüzgâr büyüleriyle adalar arasında uçan bir halk; dış dünyaya mesafeli.'),
  anzelon_eteklri: n('veradon', 6845, 45, 'Mor Anzelon Dağları\'nın etekleri', 'Veradon\'un arkasında yükselen mor dağlar; güney krallıklarına geçitler.'),
  tharal_tarlasi: n('tharal', X(25) + 30, 30, 'Tharal\'ın tarlaları', 'Orman kıyısında geniş tarlalar; köylüler Fenrir tozunu gübre gibi seriyor.'),
  nerya_kanali: n('nerya', X(26) + 30, 30, 'Nerya kanalları', 'Loncaların kayıkları kanallarda; her köprüde başka bir lonca arması.'),
  oredan_gecidi: n('oredan', X(27) + 30, 30, 'Oredan geçit kalesi', 'Mor Anzelon\'un güney geçidini tutan kale.'),
  bataklik_feneri: n('keralon', X(28) + 30, 30, 'Sis feneri', 'Bataklığın ortasında yarı batık eski bir fener; ışığı sisin içinde boğuluyor.'),
};

// Bölgeler: giriş mekânı ve konumu (yolculuk sonunda buraya varılır)
const b = (ad, kusak, giris, x, y, ek = {}) => ({ ad, kusak, giris, x, y, ...ek });
export const BOLGELER = {
  magentor: b('Magentor, başkent Malkenia', 'merkez', 'halka_zhaor', 7030, 5, { mekanlar: ['halka_zhaor', 'halka_varek', 'halka_axira', 'halka_sinha', 'halka_uma', 'halka_elyndra', 'axira_cemberi', 'tenohris', 'kara_gol', 'dogu_kanton'] }),
  ygk: b('YGK Akademi', 'merkez', 'ygk_1', 8410, 4, { onek: 'ygk_' }),
  kristal_teraslar: b('Kristal Teraslar', 'merkez', 'kristal_teraslar', X(1) + 30, 3),
  tas_cember: b('Taş Çember Köyleri', 'merkez', 'tas_cember', X(2) + 30, 3),
  gumus_tuy: b('Gümüş Tüy Takımadaları', 'kuzey', 'gumus_tuy', X(3) + 30, 3),
  gozlem_adalari: b('Gözlem Adaları', 'kuzey', 'gozlem_adalari', X(4) + 30, 3),
  halyon: b('Halyon Adası', 'kuzey', 'halyon', X(5) + 30, 3),
  malazar: b('Malazar Dağı', 'kuzey', 'malazar', 9030, 5, { mekanlar: ['malazar', 'malazar_ocaklari', 'malazar_hale', 'malazar_zirve'] }),
  zeris: b('Zeris Kulesi', 'kuzey', 'zeris', X(6) + 30, 3),
  valdren: b('Valdren Tundrası', 'kuzey', 'valdren', X(7) + 30, 3),
  norvask: b('Norvask Buz Krallığı', 'kuzey', 'norvask', X(8) + 30, 3),
  helgar: b('Helgar Kara Buz Dükalığı', 'kuzey', 'helgar', X(9) + 30, 3),
  drahmir: b('Drahmir Krallığı', 'kuzey', 'drahmir', X(10) + 30, 3),
  loran: b('Loran Vadisi', 'bati', 'loran', X(13) + 30, 3),
  julithan: b('Julithan Cumhuriyeti', 'bati', 'julithan', X(14) + 30, 3),
  anitor: b('Anitor Krallığı', 'bati', 'anitor', X(15) + 30, 3),
  filtra: b('Filtra Oksit Dağları', 'bati', 'filtra', X(16) + 30, 3),
  safran: b('Safran Sıradağları', 'bati', 'safran', X(17) + 30, 3),
  gri_yel: b('Gri Yel Burcu (Zorah\'ın batı kenarı)', 'dogu', 'gri_yel', X(18) + 30, 3),
  ajmero: b('Ajmero Kulesi (İç Dune Kuşağı)', 'dogu', 'ajmero', X(19) + 30, 3),
  golge_hatti: b('Kuzey Gölge Hattı', 'dogu', 'golge_hatti', X(20) + 30, 3),
  cam_duzlukleri: b('Güney Cam Düzlükleri', 'dogu', 'cam_duzlukleri', X(21) + 30, 3),
  kirik_vadi: b('Doğu Kırık Vadi', 'dogu', 'kirik_vadi', X(22) + 30, 3),
  hardrin: b('Mavi Hardrin Dağları', 'dogu', 'hardrin', X(23) + 30, 3),
  kahergonat: b('Kahergonat', 'dogu', 'kahergonat', X(24) + 30, 3),
  fleeplee: b('Fleeplee sahili', 'guney', 'flee_plee', 6230, 55),
  tentran: b('Tentran platform kenti (Aether-Dock)', 'guney', 'aether_dock', 6030, 5),
  fenrir: b('Fenrir Işık ve Toz Denizi', 'guney', 'fenrir', 6430, 55),
  arin: b('Arin Ada Krallığı', 'guney', 'arin', 6610, 4),
  veradon: b('Veradon liman kenti', 'guney', 'veradon', 6830, 55),
  tharal: b('Tharal Krallığı', 'guney', 'tharal', X(25) + 30, 3),
  nerya: b('Nerya Şehir Devletleri', 'guney', 'nerya', X(26) + 30, 3),
  oredan: b('Oredan Dükalığı', 'guney', 'oredan', X(27) + 30, 3),
  keralon: b('Keralon Bataklıkları', 'guney', 'keralon', X(28) + 30, 3),
};
export const KUSAKLAR = { merkez: 'Merkez kuşak', kuzey: 'Kuzey kuşağı', bati: 'Batı kuşağı', dogu: 'Doğu kuşağı', guney: 'Güney kuşağı' };

// Rotalar (7.2 ve 7.3): gün, mod (kara | deniz_zinas | deniz_mormon | col | kuzey | isinlanma | kayik), tehlike
const r = (a, c, gun, mod, ad, tehlike) => ({ a, c, gun, mod, ad, tehlike });
export const ROTALAR = [
  r('magentor', 'ygk', 0.5, 'kara', 'Kuzeybatı Yıldız Yolu (taş döşeli yol)', 'denetim'),
  r('magentor', 'kristal_teraslar', 0.25, 'kara', 'Kuzey yamaç yolu', null),
  r('magentor', 'tas_cember', 0.5, 'kara', 'Axira Irmağı boyu', null),
  r('magentor', 'loran', 1.5, 'deniz_zinas', 'Zinas Okyanusu, açık deniz (hızlı kalyon)', 'zinas_firtina'),
  r('loran', 'julithan', 4, 'deniz_zinas', 'Batı Zinas geçişi (kalyon)', 'korsan'),
  r('julithan', 'anitor', 1, 'kara', 'Batı kıyı yolu', null),
  r('julithan', 'filtra', 1, 'kara', 'Kuzey dağ yolu', null),
  r('julithan', 'safran', 1, 'kara', 'Güney yolu', null),
  r('anitor', 'safran', 1, 'kara', 'Hisar yolu', null),
  r('filtra', 'valdren', 2, 'kuzey', 'Tundra kara rotası', 'kara_buz'),
  r('valdren', 'norvask', 1, 'kuzey', 'Kıyı tundrası', null),
  r('norvask', 'helgar', 1, 'kuzey', 'Buzul geçidi', null),
  r('helgar', 'drahmir', 1, 'kuzey', 'Dağ yolu', null),
  r('drahmir', 'hardrin', 1, 'kuzey', 'Hardrin\'in kuzey kolu', 'anomali'),
  r('magentor', 'gri_yel', 1, 'col', 'Doğu Kapıları karayolu (kervan)', 'kum'),
  r('gri_yel', 'ajmero', 2.5, 'col', 'İç Zorah Dune Kuşağı (çöl bineği)', 'serap'),
  r('ajmero', 'golge_hatti', 1, 'col', 'Kuzey kumulları', null),
  r('ajmero', 'cam_duzlukleri', 1, 'col', 'Güney kumulları', 'cam'),
  r('ajmero', 'kirik_vadi', 1, 'col', 'Doğu kumulları', null),
  r('golge_hatti', 'hardrin', 0.5, 'kuzey', 'Morluk Kapısı (orta geçit)', 'anomali'),
  r('hardrin', 'kahergonat', 5, 'kuzey', 'Kahergonat Yolu (buz koridoru)', 'kahergonat'),
  r('hardrin', 'ygk', 2, 'kuzey', 'Nirdol Boynu (batı geçidi)', 'anomali'),
  r('kirik_vadi', 'veradon', 2, 'col', 'Gölge hattından güneye kanyon yolu', null),
  r('magentor', 'fleeplee', 0.5, 'kara', 'Güneygeçit Köprüsü ve Fenrir Caddesi', 'toz_sisi'),
  r('fleeplee', 'tentran', 0, 'isinlanma', 'Sabit koordinatlı ışınlanma', 'kayma'),
  r('fleeplee', 'fenrir', 0.25, 'kayik', 'Rezonans kayığı', null),
  r('fenrir', 'arin', 0.25, 'kayik', 'Kaldırma kristalleriyle yükseliş', null),
  r('fenrir', 'veradon', 0.5, 'kayik', 'Güney rotası', null),
  r('veradon', 'tharal', 1, 'kara', 'Güney ova yolu', null),
  r('veradon', 'oredan', 1, 'kara', 'Mor Anzelon geçidi', null),
  r('tharal', 'nerya', 1, 'kara', 'Sahil yolu', null),
  r('nerya', 'keralon', 1, 'kara', 'Bataklık yolu', 'bataklik'),
  r('oredan', 'keralon', 1, 'kara', 'Dağ eteği', 'bataklik'),
  r('ygk', 'gumus_tuy', 1, 'deniz_mormon', 'Mormon Denizi, büyülü yelkenli', 'mormon'),
  r('gumus_tuy', 'malazar', 1.5, 'deniz_mormon', 'Gümüş Tüy\'den Malazar tabanına', 'mormon'),
  r('gumus_tuy', 'gozlem_adalari', 1, 'deniz_mormon', 'Fener hattı', null),
  r('malazar', 'gozlem_adalari', 1, 'deniz_mormon', 'Spiral akıntılar', 'mormon'),
  r('gozlem_adalari', 'zeris', 1, 'deniz_mormon', 'Kuzey Gözü\'ne', null),
  r('gozlem_adalari', 'halyon', 1, 'deniz_mormon', 'Sürgün adasına', null),
  r('ygk', 'norvask', 2, 'deniz_mormon', 'Mormon\'un kuzey kıyıları', 'mormon'),
];

export const TEHLIKELER = {
  denetim: (d) => (d.bayrak.ygkKayit ? 'Elit muhafızlar YGK kaydını görünce yolu açıyor.' : ek(d, 0.25, 'Bürokratik denetimler: kayıtsız bir yolcu olarak çeyrek gün bekletildin.')),
  zinas_firtina: (d) => stres(d, 8, 'Sert bir batı fırtınası kalyonu dövdü; yüksek falezlerin dibinden geçtiniz. Mürettebat yorgun.'),
  korsan: (d) => {
    if ((d.koloni.kaynaklar.kristal || 0) > 0 && zar(d) < 0.5) {
      d.koloni.kaynaklar.kristal -= 1;
      return 'Korsan akını! Kalyon kaçmayı başardı ama yük ambarından bir kristal gitti.';
    }
    return 'Ufukta korsan yelkenleri; değişken dip akıntıları bu kez sizden yanaydı.';
  },
  kum: (d) => stres(d, 5, 'Kuru bir kum fırtınası, su kıtlığı; kervan dişini sıkarak yürüdü.'),
  serap: (d) => ek(d, 0.5, 'Hareketli kumullar ve büyü serapları: kervan yarım gün yanlış bir vahaya yürüdü.'),
  cam: (d) => stres(d, 6, 'Cam düzlüklerinin kenarı ayna gibi kaygan; binekler kaydı, herkes sarsıldı.'),
  anomali: (d) => stres(d, 6, 'Hardrin\'in manyetik anomalisi: pusulalar saptı, bir an gerçeklik katlandı; yön duygusu karıştı.'),
  kara_buz: (d) => (termal(d) ? 'Dondurucu kara buz; termal giysi işini yaptı.' : ek(d, 1, 'Dondurucu kara buz: termal giysi olmadan bir gün daha sürdü.', 10)),
  kahergonat: (d) => (termal(d) ? stres(d, 10, 'Kara buz koridorları ve yön saptıran manyetik anomali; termal giysi seni dondurmadı ama sinirler gerildi.') : ek(d, 1, 'Kara buz ve manyetik anomali: termal giysisiz bir gün daha, mürettebat tükendi.', 15)),
  toz_sisi: (d) => 'Fenrir Caddesi\'nde yoğun toz sisi ve kervan trafiği.',
  kayma: (d) => (zar(d) < 0.3 ? 'Enerji dalgalanması: koordinat biraz kaydı, platformun öbür ucuna düştün.' : 'Sıçrama kusursuz.'),
  mormon: (d) => stres(d, 10, 'Spiral su hortumları ve iyonik yıldırımlar; yelkenli fırtınanın içinden geçti.'),
  bataklik: (d) => stres(d, 6, 'Büyülü gazlar ve kseno-canlılar; bataklıkta her adım bir tehlike.'),
};
function zar(d) {
  const t = Math.floor(((d.zaman && d.zaman.sn) || 0) / 60) + (d.tohum || 1) * 31;
  const x = Math.sin(t * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}
function stres(d, n, metin) {
  for (const u of d.murettebat) if (u.nitelik !== 'sogukkanli') u.stres = Math.min(100, (u.stres || 0) + n);
  return metin;
}
function ek(d, gun, metin, st = 0) {
  d.seyahatEk = (d.seyahatEk || 0) + gun;
  if (st) stres(d, st, '');
  return metin;
}
function termal(d) {
  return (d.envanter || []).includes('termal_giysi') || !!(d.bayrak && d.bayrak.termal_giysi);
}

// Bulunulan bölge
export function bolgeSu(d) {
  for (const id of Object.keys(BOLGELER)) {
    const g = BOLGELER[id];
    if (g.giris === d.mekan || (g.mekanlar && g.mekanlar.includes(d.mekan)) || (g.onek && d.mekan.indexOf(g.onek) === 0)) return id;
  }
  return null;
}

// En kısa yol (gün olarak; Dijkstra)
export function yolBul(d, hedef) {
  const bas = bolgeSu(d);
  if (!bas || bas === hedef) return null;
  const mesafe = { [bas]: 0 };
  const once = {};
  const bekleyen = new Set(Object.keys(BOLGELER));
  while (bekleyen.size) {
    let en = null;
    for (const k of bekleyen) if (mesafe[k] != null && (en == null || mesafe[k] < mesafe[en])) en = k;
    if (en == null) break;
    bekleyen.delete(en);
    if (en === hedef) break;
    for (const e of ROTALAR) {
      const obur = e.a === en ? e.c : e.c === en ? e.a : null;
      if (!obur || !bekleyen.has(obur)) continue;
      if (e.mod === 'kayik' && !d.bayrak.aetherKayigi) continue;
      const m = mesafe[en] + e.gun + 0.01;
      if (mesafe[obur] == null || m < mesafe[obur]) {
        mesafe[obur] = m;
        once[obur] = { from: en, e };
      }
    }
  }
  if (mesafe[hedef] == null) return null;
  const ayaklar = [];
  for (let k = hedef; k !== bas; k = once[k].from) ayaklar.unshift({ ...once[k].e, from: once[k].from, to: k });
  return { ayaklar, gun: ayaklar.reduce((t, a) => t + a.gun, 0) };
}

export function haritaListesi(d) {
  const bas = bolgeSu(d);
  return Object.keys(BOLGELER).map((id) => {
    const g = BOLGELER[id];
    if (id === bas) return { id, ad: g.ad, kusak: g.kusak, burada: true, metin: g.ad + ': buradasın.' };
    const y = yolBul(d, id);
    if (!y) return { id, ad: g.ad, kusak: g.kusak, yol: null, metin: g.ad + ': buradan yol yok' + (d.bayrak.aetherKayigi ? '' : ' (Fenrir için rezonans kayığı gerekir)') + '.' };
    return { id, ad: g.ad, kusak: g.kusak, yol: y, metin: g.ad + ': ' + gunMetni(y.gun) + ', ' + y.ayaklar.map((a) => a.ad).join(', sonra ') + '.' };
  });
}
function gunMetni(g) {
  if (g <= 0.02) return 'anlık';
  if (g < 1) return Math.round(g * 6) + ' nöbet';
  return (Math.round(g * 2) / 2).toString().replace('.', ',') + ' gün';
}

// Yolculuk: zaman gorevler.js'te ileri sarılır (sn döner)
export function seyahatEt(d, hedef) {
  const y = yolBul(d, hedef);
  if (!y) return { metin: 'Oraya buradan yol yok.', ses: 'red' };
  if (y.ayaklar.some((a) => a.tehlike === 'kahergonat') && nobet(d).yildiz !== 'Sinha') {
    return { metin: 'Kahergonat Yolu yalnız Mavi Akşam nöbetinde, Sinha\'nın hizalanmasında açılır. Şu an ' + nobet(d).ad + '. Bekle ya da başka yere git.', ses: 'red' };
  }
  // Yan görev 15: kanyon patlatıldıysa Nirdol Boynu bir hafta kapalı
  const simdi = (d.zaman && d.zaman.sn) || 0;
  if (d.yan && d.yan.nirdolKapali > simdi && y.ayaklar.some((a) => a.ad.indexOf('Nirdol') >= 0)) {
    return { metin: 'Nirdol Boynu kapalı: patlatılan kanyonun molozu temizleniyor; ' + Math.ceil((d.yan.nirdolKapali - simdi) / GUN) + ' gün daha.', ses: 'red' };
  }
  d.seyahatEk = 0;
  const notlar = [];
  const muaf = d.bayrak.tehlikeMuaf || {};
  for (const a of y.ayaklar) {
    notlar.push(a.ad + '.');
    // Zephyra'nın Fırtına Kalkanı: Arin ve Güney rotalarında rüzgâr senden yana
    if (a.tehlike && d.bayrak.zephyraSerbest && /Arin|Güney|güney/.test(a.ad + ' ' + (BOLGELER[hedef] && BOLGELER[hedef].ad))) notlar.push('Zephyra\'nın rüzgârı yolu açtı; tehlike seni teğet geçti.');
    else if (a.tehlike && TEHLIKELER[a.tehlike] && !muaf[a.tehlike]) notlar.push(TEHLIKELER[a.tehlike](d));
    else if (a.tehlike && muaf[a.tehlike]) notlar.push('Yanındakiler sayesinde yolun tehlikesi seni teğet geçti.');
  }
  const g = BOLGELER[hedef];
  d.mekan = g.giris;
  d.oyuncu = { x: g.x, y: g.y, yon: 0 };
  d.oto = null;
  if (!d.gorulenMekanlar) d.gorulenMekanlar = [];
  if (!d.gorulenMekanlar.includes(g.giris)) d.gorulenMekanlar.push(g.giris);
  d.tBolge = hedef;
  const gun = y.gun + (d.seyahatEk || 0);
  const son = y.ayaklar[y.ayaklar.length - 1].mod;
  d.seyahatNotu = notlar.filter(Boolean).join(' ');
  d.seyahatHedef = g.ad;
  d.sahne = 'seyahat_' + (son === 'isinlanma' ? 'isinlanma' : son);
  // Ekol kıdemi: her yolculuk Gümüş; Mormon akıntıları Mavi, çöl Sarı (yönerge 5.A)
  SB.ekolKazan(d, 'zhaor', 5);
  if (y.ayaklar.some((a) => a.mod === 'deniz_mormon')) SB.ekolKazan(d, 'sinha', 40);
  if (y.ayaklar.some((a) => a.mod === 'col')) SB.ekolKazan(d, 'uma', 10);
  return { metin: '', sn: Math.round(gun * GUN * SB.seyahatCarpani(d) * (d.bayrak.ak_caelum ? 0.8 : 1) * (d.bayrak.tf_deniz_haritasi && y.ayaklar.some((a) => String(a.mod).indexOf('deniz') === 0) ? 0.8 : 1)), sahne: d.sahne };
}

// İstasyonlar ve öbür atlas noktaları
export function noktaMi(id) {
  return !!(A_NOKTALAR[id] && A_NOKTALAR[id].atlas);
}
export function noktaEylemleri(d, id) {
  const p = A_NOKTALAR[id];
  const e = [];
  if (p.atlas === 'istasyon') {
    for (const h of p.hedefler) e.push({ id: 'ist_' + h, etiket: 'Işınlan: ' + BOLGELER[h].ad });
  }
  if (p.atlas === 'konus') e.push({ id: 'konus', etiket: 'Konuş' });
  if (p.atlas === 'arit') e.push({ id: 'arit', etiket: 'Aether arıt', ipucu: '2 aether kristali → 1 saf aether.' });
  if (p.atlas === 'zeris') e.push({ id: 'tara', etiket: 'Gözlem teraslarına çık' });
  if (p.atlas === 'toz') e.push({ id: 'topla', etiket: 'Bir tüp ışık tozu al' });
  if (p.atlas === 'sifahane') e.push({ id: 'sifa', etiket: 'Mürettebatı şifacılara götür' });
  if (p.atlas === 'zaman') e.push({ id: 'saat', etiket: 'Çanları dinle' });
  e.push({ id: 'incele', etiket: 'İncele' });
  return e;
}
// Zorah çölünün harabelerini araştırmak Sarı Yıldız kıdemi verir (her yerde bir kez)
const ZORAH = ['gri_yel', 'ajmero', 'cam_duzlukleri', 'kirik_vadi'];
export function eylemUygula(d, id, eid) {
  const p = A_NOKTALAR[id];
  if (ZORAH.includes(p.mekan) && eid !== 'incele') {
    if (!d.ekolNokta) d.ekolNokta = [];
    if (!d.ekolNokta.includes(id)) {
      d.ekolNokta.push(id);
      SB.ekolKazan(d, 'uma', 25);
    }
  }
  if (eid === 'incele') return { metin: p.tarif };
  if (eid === 'konus') return { metin: p.soz };
  if (eid.indexOf('ist_') === 0) {
    if (p.yetki && !d.bayrak.karaGolIzni) return { metin: 'İstasyon görevlisi: "Merkez İstasyon yalnız yetkili Malken\'lere ve kıdemli araştırmacılara açık. Koruma mührün yok."', ses: 'red' };
    const h = eid.slice(4);
    const g = BOLGELER[h];
    d.mekan = g.giris;
    d.oyuncu = { x: g.x, y: g.y, yon: 0 };
    if (!d.gorulenMekanlar) d.gorulenMekanlar = [];
    if (!d.gorulenMekanlar.includes(g.giris)) d.gorulenMekanlar.push(g.giris);
    return { metin: 'Kristal halkalar dönüyor, kulaklarında bir an her şey ters akıyor: ' + g.ad + '.', kapat: true, ses: 'kapi_gemi' };
  }
  if (eid === 'arit') {
    if ((d.koloni.kaynaklar.aether || 0) < 2) return { metin: 'İki aether kristali gerekir.', ses: 'red' };
    d.koloni.kaynaklar.aether -= 2;
    d.koloni.kaynaklar.saf_aether = (d.koloni.kaynaklar.saf_aether || 0) + 1;
    return { metin: 'Halka dönüyor, kristaller eriyip tek bir ışık damlasına dönüşüyor: bir birim arıtılmış saf aether.', ses: 'sinyal' };
  }
  if (eid === 'tara') {
    if (!(d.bayrak.karaGolIzni && d.bayrak.malazarIzni)) return { metin: 'Muhafız: "Üst katlar yalnız konsey izniyle. Kara Göl mührü ve Zirve İğnesi\'nin hizası sende olmalı."', ses: 'red' };
    if (!d.bayrak.zerisIzni) {
      d.bayrak.zerisIzni = true;
      d.itibar += 25;
      if (!d.kodeks.some((k) => k.id === 'zeris')) d.kodeks.push({ id: 'zeris', ad: 'Zeris\'in boyutsal taraması', tarif: 'Zeris Kulesi\'nin üst teraslarından üst atmosfer taranıyor: altı yıldızın hizalanmasında ince yırtıklar, en büyüğü komşu gezegenin, su mezarının üstünde.', itibar: 25 });
    }
    return { metin: 'Teraslardan gökyüzü tek bir ses gibi duyuluyor: altı yıldızın hizalanması ve aralarında incecik çatlaklar. Gözlemci fısıldıyor: "En büyük yırtık komşu gezegenin üstünde, Kaptan." Kodekse işlendi.', ses: 'sinyal' };
  }
  if (eid === 'topla') {
    const g = Math.floor(((d.zaman && d.zaman.sn) || 0) / 1200);
    if (d.bayrak.t_iskele === g) return { metin: 'Bu nöbetin tozu toplandı.', ses: 'red' };
    d.bayrak.t_iskele = g;
    d.koloni.kaynaklar.foton_recinesi = (d.koloni.kaynaklar.foton_recinesi || 0) + 1;
    return { metin: 'Bir tüp saf ışık tozu: bir birim foton reçinesi.', ses: 'topla' };
  }
  if (eid === 'sifa') {
    for (const u of d.murettebat) u.stres = Math.max(0, (u.stres || 0) - 40);
    return { metin: 'Şifacılar mürettebatı fıskiyeli bahçelere oturtuyor; şifalı otların kokusu. Stres hafifledi.', ses: 'dugme' };
  }
  if (eid === 'saat') {
    const n0 = nobet(d);
    return { metin: 'Zaman kulelerinin çanları ' + n0.ad + ' nöbetini çalıyor; ' + n0.yildiz + ' ışığı. Bir sonraki nöbete ' + Math.ceil(kalanSn(d) / 60) + ' dakika.', ses: 'dugme', akor: true };
  }
  return { metin: '' };
}

const seyahatSahnesi = (ortam, efekt) => ({
  baslik: 'Yolculuk',
  ortam,
  efekt,
  metin: (d) => [d.seyahatNotu || '', 'Vardın: ' + (d.seyahatHedef || '') + '.'],
  secenekler: () => [{ etiket: 'Devam', sonra: null }],
});
export const SAHNELER = {
  seyahat_kara: seyahatSahnesi('ortam_t_koy', ['tislama']),
  seyahat_deniz_zinas: seyahatSahnesi('ortam_t_okyanus', ['tislama']),
  seyahat_deniz_mormon: seyahatSahnesi('ortam_t_mormon', ['tislama']),
  seyahat_col: seyahatSahnesi('ortam_t_col', ['tislama']),
  seyahat_kuzey: seyahatSahnesi('ortam_t_tundra', ['tislama']),
  seyahat_kayik: seyahatSahnesi('ortam_t_fenrir', ['tislama']),
  seyahat_isinlanma: seyahatSahnesi('ortam_t_dock', ['kapi_gemi']),
};
