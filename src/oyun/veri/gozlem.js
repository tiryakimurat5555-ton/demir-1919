// Gözlem gereçleri, yol üstü kozmik fenomenler (derin-uzay-kesifleri-ve-evren-kutuphanesi.md bölüm 2-4, 6, 7),
// yirmi keşfedilebilir gezegen (kesfedilebilir-gezegenler-rehberi.md), Evren Kütüphanesi salonları ve itibar kademeleri
// (bölüm 5). Saf veri; fenomen ve gezegen operasyonları OPERASYONLAR'a buradan eklenir (veri/uzayGorevleri.js).

const don = (ad, tesis, girdi, sure, minSinif, tarif) => ({ ad, tesis, girdi, sure, minSinif, tarif });

// --- 2. Bilimsel gözlem ve fotoğraflama gereçleri; derin-uzay-gorevleri bölüm 1 otomasyon alt-sistemleri ---
export const GOZLEM_DONANIMLARI = {
  kamera: don('derin uzay rezonans alan kamerası', 'sinyal_kulesi', { saf_kristal: 10, mikrocip: 5 }, 60, 1, 'Nesnenin çekirdek tonuna odaklanıp üç saniye sabit tutar; kozmik izdüşüm fotoğrafı, bir ses imzası olarak arşivlenir.'),
  spektrometre: don('çok kutuplu radyo-spektrometre', 'sinyal_kulesi', { kristal: 2, kablo: 10 }, 60, 1, 'Elektromanyetik tayfı parçalar; bileşimi sesin kalınlığından ve tizliğinden ayırt eder.'),
  gravimetre: don('yerçekimi dalgalanma dedektörü (mikro-gravimetre)', 'reaktor_lab', { graviton_yakiti: 5, saf_kristal: 10 }, 90, 1, 'Uzay dokusunun bükülmesini kabine derin bir bas uğultusu olarak verir.'),
  lidar: don('kseno-lidar ve yüzey morfoloji tarayıcısı', 'sinyal_kulesi', { saf_kristal: 10, kablo: 10 }, 60, 1, 'Yapıların girinti ve çıkıntılarını lazer ses sonarıyla heykel gibi tarar.'),
  arsivleyici: don('hızlı kuantum kripto-arşivleyicisi ve veri paketi anteni', 'sinyal_kulesi', { mikrocip: 10, saf_kristal: 10 }, 90, 1, 'Gözlemleri sıkıştırıp şifreler; hiper-dalgayla Gözlemevi\'ne ışınlar.'),
  oto_kenet: don('otomatik kenetlenme bilgisayarı', 'sinyal_kulesi', { mikrocip: 10, kablo: 10 }, 60, 1, 'Hedefin çekim kılavuzuna kilitlenir: daha uzaktan ve daha hızlıyken kenetlenir.'),
  akustik_filtre: don('akustik filtreleme ünitesi', 'sinyal_kulesi', { kristal: 2, mikrocip: 5 }, 60, 1, 'Kozmik cızırtıyı bastırır: frekans ayarlarında kilit payı genişler.'),
  toplama_dronu: don('maden ve enkaz toplama dronları', 'arac_hangari', { hafif_alasim: 30, mikrocip: 10 }, 90, 1, 'Operasyon sonrası etraftaki enkazı ve madeni toplayıp ambara istifler.'),
};

// --- Yirmi gezegenin iniş araçları (bölüm 3 matrisi "Yüzey iniş aracı") ---
const arac = (ad, girdi, tarif) => don(ad, 'arac_hangari', girdi, 90, 2, tarif);
export const INIS_ARACLARI = {
  termal_rover: arac('ağır termal rover', { sasi_celigi: 40, helyum: 20 }, 'Magma çatlaklarının kenarına sokulur (Pyros-Prime).'),
  kar_mekigi: arac('paletli kar mekiği', { sasi_celigi: 40, kablo: 10 }, 'Buzul ve metan kıyılarında yürür (Kriyos-7).'),
  dalis_sondasi: arac('derin dalış sondası', { plaka: 50, polimer_levha: 20 }, 'Dört bin metrelik basınca dayanır (Thalassa).'),
  filtreli_rover: arac('yüzen hava filtreli rover', { hafif_alasim: 30, polimer_levha: 10 }, 'Havadaki sporları süzer (Mycelia-IV).'),
  manyetik_rover: arac('manyetik süspansiyonlu rover', { sasi_celigi: 30, saf_kristal: 10 }, 'Aşındırıcı cam kumunda süzülür (Sol-Kharra).'),
  ekskavator: arac('ağır hidrolik ekskavatör', { sasi_celigi: 80, plaka: 30 }, '3,5 G yerçekiminde manyetik kayayı koparır (Ferros-Omega).'),
  irtifa_mekigi: arac('yüksek irtifa mekiği', { hafif_alasim: 40, itki_yakiti: 10 }, 'Gaz devinin fırtına katmanlarında uçar (Zephyr-Major).'),
  denge_roveri: arac('akustik denge roverı', { sasi_celigi: 30, kristal: 2 }, 'Rezonans kraterinde titreşimi sönümler (Lithos-Echo).'),
  kesif_robotu: arac('otonom keşif robotu', { mikrocip: 15, hafif_alasim: 20 }, 'Akustik kilitli dehlizlere iner (Necron-Sıfır).'),
  iki_kutuplu: arac('iki kutuplu keşif aracı', { sasi_celigi: 40, helyum: 10 }, 'Sıcak ve soğuk yarıküre arasında dayanır (Janus-Split).'),
  paratoner_rover: arac('paratoner zırhlı rover', { sasi_celigi: 40, kablo: 20 }, 'Yıldırım altında sürülür (Fulgur-3).'),
  korozyon_dronu: arac('korozyon korumalı dron', { hafif_alasim: 20, polimer_levha: 20 }, 'Asit buharında uçar (Miasma-9).'),
  kizilotesi_arac: arac('kızılötesi sondaj aracı', { sasi_celigi: 30, saf_kristal: 10 }, 'Zifiri karanlıkta ısıdan yön bulur (Umbra-Kayıp).'),
  capali_mekik: arac('manyetik itki çapalı mekik', { hafif_alasim: 30, plaka: 30 }, 'Yüzen kıta parçalarına çapa atar (Fractura).'),
  sonik_madenci: arac('sonik kesicili madenci', { sasi_celigi: 40, saf_kristal: 10 }, 'Elmas sütunları keser (Carbonis-V).'),
  kursun_robot: arac('kurşun zırhlı sondaj robotu', { plaka: 60, polimer_levha: 20 }, 'Gama radyasyonuna dayanır (Radion-Kızıl).'),
  siber_dron: arac('siber-müdahale dronu', { mikrocip: 20, hafif_alasim: 20 }, 'Makine kodunu dinler, kollara sızar (Automata-Enkaz).'),
  zaman_kapsulu: arac('zaman-yalıtımlı kapsül', { kseno_alasim: 20, mikrocip: 10 }, 'Takyon alanında zamanını korur (Chronos-Döngü).'),
  kepceli_mekik: arac('atmosferik kepçeli mekik', { hafif_alasim: 30, polimer_levha: 10 }, 'Yüzen canlıların gazını emer (Aero-Flora).'),
  intihar_sondasi: arac('süper termal intihar sondası', { plaka: 30, helyum: 30 }, 'Erimeden önce güneş plazmasını hapseder (Corona-Lux).'),
};

// --- 4. On altı yol üstü kozmik fenomen ---
// salon: Evren Kütüphanesi salonu. adim: belgedeki "dokunsal kayıt hareketi"nin özel adımı.
const fen = (ad, salon, imza, gerec, kayit, tepki, itibar, frek, etki, ozel) => ({ ad, salon, imza, gerec, kayit, tepki, itibar, frek, etki, ozel });
export const FENOMENLER = {
  f01: fen('Zümrüt ışımalı proto-yıldız kozası', 'astrofizik', 'Nefes alıp veren derin, ritmik bir emiş; ardından tiz bir elektrik uğultusu.', ['spektrometre', 'kamera'], 'Yıldızların erken evre hidrojen sıkışma modelleri.', 'Astrofizik Enstitüsü reaktörlerin verimini artıran modeller geliştirdi: üretim hızlandı.', 150, 110, { bayrak: ['f_fuzyon'] }),
  f02: fen('Durgunlaşmış mavi dev ve ışık halkası', 'astrofizik', 'Kalın, yankılanan bir org armonisi.', ['gravimetre', 'spektrometre'], 'Kütleçekimsel zaman kırılmaları ve hiper-plazma dalga boyları.', 'Kalkan üreticileri mavi devin plazma frekansını taklit etti: bir kalkan projektörü.', 200, 131, { parca: { kalkan_projektoru: 1 } }),
  f03: fen('İkili kuasar koridoru', 'astrofizik', 'Çağlayan bir beyaz gürültü; aralarda metalik kırbaç şaklamaları.', ['kamera', 'radyasyon_zirhi'], 'Galaktik sınır boyu radyasyon haritaları.', 'İyonosferik kalkan kulelerine yeni soğurma algoritmaları: koloni kalkanı güçlendi.', 250, 880, { kalkan: 1 }),
  f04: fen('Soğumuş elmas gezegen kalıntısı', 'astrofizik', 'Mikrometeoroit çarptıkça billur kadeh çınlamaları.', ['lidar', 'spektrometre'], 'Süper basınçta karbon kristalleşmesi.', 'Dökümhane kristalize karbon kaplamayı geliştirdi: gemi gövdeleri güçlendi.', 180, 1320, { bayrak: ['f_karbon'] }, 'lidar'),
  f05: fen('Yıldız tozu otlayıcıları: Etelyan biyo-sürüsü', 'biyoloji', 'Balina şarkılarını andıran, alçalıp yükselen hüzünlü melodiler.', ['kamera', 'harmonik_rezonator'], 'Biyolojik iyon itkisi ve vakum adaptasyonu.', 'Kseno-biyologlar sürünün göç yolundan organik mineral rotası çizdi.', 300, 196, { kaynak: { kseno_spor: 3 } }),
  f06: fen('Kriyojenik spor sisi ve spor gözleri', 'biyoloji', 'Donmuş cam kırılması gibi çıtırtılar ve rüzgâr hışırtısı.', ['spektrometre', 'lidar'], 'Aşırı soğukta yaşayan kseno-tohum genetiği.', 'Soğuğa dayanıklı bitki genleri: kuzey dağlarında tarım.', 220, 1046, { kaynak: { tohum: 3 } }, 'lidar'),
  f07: fen('Solar yelken paraziti kolonisi', 'biyoloji', 'Statik çıtırtılar eşliğinde hızlı, minik organik nabızlar.', ['lidar', 'kamera', 'harmonik_rezonator'], 'Biyo-fotovoltaik enerji ve hücresel elektron depolama.', 'Güneş santralleri modernize edildi: üretim hızlandı.', 190, 740, { bayrak: ['f_fotosentez'] }),
  f08: fen('Fosilleşmiş derin boşluk devi', 'biyoloji', 'Kemiklerin boşluklarında titreşen tok, mağaramsı bir yankı.', ['gravimetre', 'lidar'], 'Galaksinin erken evriminin paleontoloji kaydı.', 'Tarih konseyi yaşamın kökenine dair çığır açan makaleler yayınladı.', 350, 82, { moral: 5 }, 'lidar'),
  f09: fen('Aura-7 yörünge heykeli', 'tarih', 'Işık prizmalardan geçerken berrak bir arp ve çan tınısı.', ['kamera', 'lidar'], 'Kadim medeniyetin estetik, mimari ve optik felsefesi.', 'Sivil yerleşkeler bu mimariyi benimsedi: halkın refahı yükseldi.', 280, 587, { moral: 10 }),
  f10: fen('Kayıp göçmen gemisinin mezar çelengi', 'tarih', 'Son pillerle yayılan, çok yavaş ve derinden tek bir melodi.', ['spektrometre', 'arsivleyici'], 'Koloninin kayıp atalarının isimleri, biyografileri, seyir defterleri.', 'Kolonide anma günü ilan edildi; kayıp ailelerin hatıraları kütüphanenin altın salonunda.', 300, 220, { moral: 10 }),
  f11: fen('Yıldızlararası mesaj kapsülü: Altın Disk-X', 'tarih', 'Analog bant hışırtısı; aralarda kseno-türlerin fısıltılı şarkıları.', ['spektrometre', 'kamera'], 'Erken uzay kaşiflerinin müzik, dil ve antropoloji arşivi.', 'Akademide Kozmik Diller ve Müzik Kürsüsü kuruldu.', 260, 392, { bilim: 1 }),
  f12: fen('Boşluktaki saat kulesi: kronometrik sütun', 'tarih', 'Uzayın derinliklerinde yankılanan tok bir mekanik tıkırtı.', ['gravimetre', 'lidar'], 'Galaktik zaman hesabı ve çağ dönümleri.', 'Filoların saatleri kalibre edildi: seyirde yakıt tasarrufu.', 320, 147, { bayrak: ['f_saat'] }, 'ritim'),
  f13: fen('Tersine akan plazma şelalesi', 'anomali', 'Suyun yukarı aktığını andıran tersine bir çağlama.', ['spektrometre', 'gravimetre'], 'Yüksek manyetik basınçta termodinamik tersinirlik.', 'Dökümhane manyetik kalıplar geliştirdi: sıvı metal hattı malzemesi.', 240, 466, { kaynak: { sivi_metal: 2 } }, 'denge'),
  f14: fen('Zaman donması cebi', 'anomali', 'Duyulması güç, ultra düşük frekanslı derin bir titreşim.', ['arsivleyici', 'gravimetre'], 'Kuantum alan teorisi ve zamansal durgunluk katsayıları.', 'Zaman dondurucu acil sedye icat edildi: hastanede ölüm yok, moral yükseldi.', 400, 41, { moral: 5, nufus: 2 }),
  f15: fen('Akustik çınlama odası nebulası', 'anomali', 'Bir katedralin içindeymiş gibi zengin, derin bir koro yankısı.', ['kamera', 'spektrometre'], 'Yıldızlararası sonik iletkenlik teorisi.', 'Derin uzay sonarının menzili üç katına çıktı.', 210, 262, { bayrak: ['f_sonar'] }),
  f16: fen('Mikro-solucan deliği köpüklenmesi', 'anomali', 'Su yüzeyinde patlayan sabun köpükleri gibi neşeli çıtırtılar.', ['gravimetre', 'arsivleyici'], 'Alt-uzay dokusunun mikro-bükülmeleri.', 'Hiper-sürücü çekirdeklerinin yakıt verimi optimize edildi.', 380, 1568, { bayrak: ['f_yakit'] }, 'fiske'),
};
export const FENOMEN_SIRASI = Object.keys(FENOMENLER);

// --- Yirmi keşfedilebilir gezegen ---
const gez = (ad, sinifi, akustik, poi1, poi2, gozlem, numune, numuneAd, kazanim, itibar, arac, frek, x, y, etki, denge) => ({ ad, sinifi, akustik, poi1, poi2, gozlem, numune, numuneAd, kazanim, itibar, arac, frek, x, y, etki, denge });
export const GEZEGENLER = {
  p01: gez('Pyros-Prime', 'Hiper-volkanik gezegen', 'Derin bas homurtuları, kükürt fıslamaları, kabin tavanına çarpan sıvı cam damlaları.', 'Obsidyen Çatlağı Menfezi', 'Kızıl Kalp Kalderası', 'Magma göllerindeki manyetik alev dalgalarının tiz rezonansı.', 'Isı kalkanlı roverla çatlak kenarından 1200 derecelik sıvı kobalt-titanyum çekilir.', 'sıvı titanyum-kobalt', 'Yüksek ısıya dayanıklı motor alaşımları; dökümhaneye termal manyetik çekirdek.', 600, 'termal_rover', 98, 1450, -600, { kaynak: { titanyum: 10 } }, true),
  p02: gez('Kriyos-7', 'Derin buzul ve metan dünyası', 'Buzul çatırtıları, viskoz metan dalgaları.', 'Mavi Cam Buzulu', 'Sıvı Metan Fiyordu', 'Buzun içinden yansıyan yıldız ışığının kırılma sesleri.', 'Sonik matkapla mavi buzdan çekirdek silindiri çıkarılır.', 'mavi cam buz çekirdeği', 'Süperiletken soğutma; tersanede sıvı yakıt optimizasyonu.', 550, 'kar_mekigi', 1175, -1450, -100, { parca: { helyum: 60 }, bayrak: ['p_yakit'] }),
  p03: gez('Thalassa-Derinlik', 'Sonsuz okyanus dünyası', 'Dalga gümbürtüsü, abisal basınç inlemesi.', 'Abisal Kara Baca Tarlası', 'Yüzen Yosun Adaları', 'Biyo-ışıldayan plankton tabakasının harmonik tınısı.', 'Basınca dayanıklı sonda kara bacadan mineral çamuru doldurur.', 'hidro-termal maden çamuru', 'Biyo-kubbelere sınırsız organik filtreleme; kseno-tıp antikorları.', 700, 'dalis_sondasi', 147, 600, 1450, { moral: 5 }),
  p04: gez('Mycelia-IV', 'Biyo-ışıldayan mantar ve spor dünyası', 'Spor hışırtısı, elektrik gibi cızırdayan yosun halısı.', 'Büyük Kovan Mantarı', 'Fosforlu Spor Vadisi', 'Gece sporların kolektif biyo-manyetik titreşimi.', 'Hava emme filtreleri havadaki kseno-sporları toz hâlinde süzer.', 'canlı kseno-spor tozu', 'Tarımda verimi üçe katlayan enzimler.', 650, 'filtreli_rover', 330, -1500, 500, { kaynak: { kseno_spor: 4 }, bayrak: ['p_tarim'] }),
  p05: gez('Sol-Kharra', 'Aşındırıcı cam ve toz çölü', 'Müzik aleti gibi öten kumullar, cam tozu hışırtısı.', 'Kristalize Kum Tepeleri', 'Güneş Fırını Çukuru', 'Kumulların armonik ötüşü lidarla taranır.', 'Pnömatik kılıçla camlaşmış kumuldan silikat kristali kesilir.', 'saf silikat cam kristali', 'Kokpitler için kırılmaz optik cam.', 500, 'manyetik_rover', 698, 1300, 900, { kaynak: { kristal: 8 } }),
  p06: gez('Ferros-Omega', '3,5 G ağır metal dünyası', 'Ağır metal gümbürtüleri, boğuk cıva nehirleri.', 'Manyetik Dağ Sırtı', 'Sıvı Cıva Kanyonu', 'Yerçekimsel merceklenme yörüngeden fotoğraflanır.', 'Hidrolik kırıcı manyetik kayadan nötron-yoğun demir koparır.', 'nötron-yoğun demir', 'Sancak zırhlıları için süper-ağır gövde plakaları.', 800, 'ekskavator', 65, -800, -1300, { kaynak: { notron_cevher: 10 } }),
  p07: gez('Zephyr-Major', 'Fırtınalı gaz devi', 'Siklon uğultusu, iyon şimşeklerinin akustik darbeleri.', 'Büyük Siklon Gözü', 'Elmas Yağmuru Katmanı', 'Siklon duvarlarındaki iyon şimşeklerinin darbesi.', 'Atmosferik kepçe helyum-3 ve donmuş elmas çeker.', 'sıvı helyum-3 ve elmas', 'Füzyon reaktörleri için en verimli yakıt.', 750, 'irtifa_mekigi', 233, 1550, -100, { parca: { helyum: 150, plazma_yakiti: 40 } }, true),
  p08: gez('Lithos-Echo', 'Rezonans ve kristal çan dünyası', 'Bin kat büyüyen yankılar, mor kristallerin çınlaması.', 'Rezonans Amfitiyatrosu', 'Monolit Ormanı', 'Amfitiyatroya vurulan sonik darbenin armonik deseni.', 'Lazerle bir mor kristalin ucu çatlatılır.', 'mor harmonik kristal', 'Kalkan frekans modülatörleri ve akustik radar netliği.', 700, 'denge_roveri', 784, 200, -1550, { bayrak: ['p_radar'] }),
  p09: gez('Necron-Sıfır', 'Taşlaşmış kadim mezar dünyası', 'Rüzgârın lahitlerde ıslığı, kadim taş gıcırtısı.', 'Kseno-Nekropol Meydanı', 'Gömülü Arşiv Girişi', 'Lahitlerdeki hiyerogliflerin ses profili.', 'Yıkık bir anıtın kaidesinden kseno-metalik mühür tableti sökülür.', 'kadim metalik mühür', 'Kadim tarih arşivi; hiper-sürücü rota şemaları.', 900, 'kesif_robotu', 208, -300, 1580, { bayrak: ['sema_kadim'], kaynak: { kseno: 3 } }),
  p10: gez('Janus-Split', 'Gelgit kilitli alacakaranlık dünyası', 'Hortum uğultuları, sıcakla soğuğun çarpışması.', 'Termal Şerit Vadisi', 'Gölge Duvarı', 'Alacakaranlık sınırındaki aurora kuşağı.', 'Sınır çizgisindeki nadir termal mineraller kazılır.', 'nadir termal mineral', 'Dengesiz çevrelere uyumlu zırh kaplamaları.', 650, 'iki_kutuplu', 277, 1100, 1150, { parca: { zirhli_plaka: 100 } }, true),
  p11: gez('Fulgur-3', 'Sonsuz elektromanyetik şimşek dünyası', 'Kesintisiz gök gürültüsü, süperiletken sütunların vızıltısı.', 'Paratoner Platoları', 'Fulgurit Tarlaları', 'En yüksek deşarj noktasındaki plazma arkının radyo frekansı.', 'Paratoner zırhlı rover taze fulgurit tüpünü keser.', 'doğal cam fulgurit tüpü', 'Gemi silahları için EMP ve iyon topu mühimmatı.', 700, 'paratoner_rover', 1397, -1150, -1100, { parca: { iyon_reaktoru: 1 } }),
  p12: gez('Miasma-9', 'Zehirli asit bataklığı ve fosil havzası', 'Asit gayzerlerinin fışkırması, fosil kaburgalarında flüt sesleri.', 'Asit Gayzeri Krateri', 'Devasa Kseno-Fosil Mezarlığı', 'Fosil kaburgalarının rüzgârdaki flüt sesleri.', 'Asit geçirmez kepçeyle kemik iliğinden numune alınır.', 'kseno-kemik iliği', 'Korozyona mutlak bağışık gövde vernikleri.', 600, 'korozyon_dronu', 349, 400, -1100, { parca: { polimer_levha: 60 } }),
  p13: gez('Umbra-Kayıp', 'Yıldızsız başıboş karanlık dünya', 'Mutlak sessizlikte buhar sütunlarının uğultusu.', 'Karanlık Kanyon Bacaları', 'Biyolüminesan Liken Mağaraları', 'Kızılötesi ve manyetik radarla yüzey topoğrafyası.', 'Sıcak bacaların çevresindeki kseno-bakteriler vakumlanır.', 'kseno-bakteri kolonisi', 'Işıksız derin uzayda enerji tasarrufu teorisi.', 850, 'kizilotesi_arac', 55, -1550, -400, { bayrak: ['p_tasarruf'] }),
  p14: gez('Fractura', 'Yerçekimsel parçalanmış harabe dünya', 'Kıtaların savrulurken çıkardığı sonik dalgalar.', 'Havada Asılı Plaka', 'Açığa Çıkmış Çekirdek Kırığı', 'Kıtaların yerçekimi dalgaları.', 'Dron açıkta kalan çekirdek kabuğundan manyetik platin toplar.', 'saf manyetik platin', 'Yerçekimi sönümleme ve itki çapası teknolojisi.', 800, 'capali_mekik', 415, 1580, 300, { kaynak: { antigrav_tozu: 3 } }),
  p15: gez('Carbonis-V', 'Grafit ve elmas basınç dünyası', 'Elmas monolitlerin kırılma tınıları; grafit kanyonun sessizliği.', 'Elmas Sütunlar Ovası', 'Katı Grafit Kanyonu', 'Işığın elmas monolitlerden geçerken kırılma tınısı.', 'Sonik kesici bir elmas sütunun çekirdeğini keser.', 'elmas sütun çekirdeği', 'Aşınmaz lazer lensleri ve matkap uçları.', 750, 'sonik_madenci', 1661, -500, 1300, { bayrak: ['bayrak_deliciUc'] }),
  p16: gez('Radion-Kızıl', 'Radyoaktif gama dünyası', 'Geiger çıtırtıları, kaynayan ışıltılı göl.', 'Uranyum Krateri', 'Kurşun Tepeleri', 'Gama ışınlarının manyetik dalgalanması.', 'Zenginleştirilmiş doğal izotop kayası kapsüle konur.', 'zengin doğal izotop', 'Süper nükleer piller ve kalkan reaktörleri.', 850, 'kursun_robot', 523, 900, 1350, { kaynak: { izotop: 10 } }),
  p17: gez('Automata-Enkaz', 'Terk edilmiş makine dünyası', 'Dev dişliler, durmaksızın çalışan robot kollar.', 'Sonsuz Montaj Hattı', 'Hurda Piramidi', 'Kontrol kulesinin kadim makine kodu.', 'Çalışan bir montaj kolundan kuantum işlemci çipi sökülür.', 'sağlam kuantum çipi', 'Otonom dron zekâsı ve otomatik gemi tamir algoritmaları.', 900, 'siber_dron', 932, -1350, 800, { parca: { mikrocip: 60 }, bayrak: ['p_tamir'] }),
  p18: gez('Chronos-Döngü', 'Zaman anomalisi dünyası', 'Tersine çalan sesler, havada asılı kalmış bir patlama.', 'Donmuş Patlama Sahası', 'Hızlı Zaman Çemberi', 'Zaman kırılmasının tersine çevrilmiş frekansı.', 'Kuantum yalıtımlı tüple takyon partikülleri yakalanır.', 'takyon partikülü', 'Alt-uzay atlama motorlarının bekleme süresini sıfırlayan teknoloji.', 1000, 'zaman_kapsulu', 1245, 50, -1580, { bayrak: ['p_takyon'], parca: { kuantum_cekirdek: 1 } }),
  p19: gez('Aero-Flora', 'Yüzen canlı gaz dünyası', 'Yüzen dev kesecilerin iletişim şarkısı, gaz akıntılarının ıslığı.', 'Canlı Gaz Kolonisi', 'Biyolojik İtki Akıntısı', 'Yüzen kseno-keselerin şarkısı hidrofonla.', 'Emiş valfiyle uçucu anti-yerçekimi gazı çekilir.', 'anti-yerçekimi gazı', 'Gemiler için hafif yerçekimsiz kargo ambarları.', 750, 'kepceli_mekik', 262, -1100, 1150, { kaynak: { antigrav_tozu: 3 } }, true),
  p20: gez('Corona-Lux', 'Yıldıza bitişik plazma dünyası', 'Plazma şelalelerinin kükremesi, güneş rüzgârı uğultusu.', 'Plazma Şelalesi Menfezi', 'Güneş Rüzgârı Kapanı', 'Yıldız patlamasının manyetosferle çarpıştığı rezonans noktası.', 'Acil sonda erimeden yoğun güneş plazmasını hapseder.', 'yoğun güneş plazması', 'Yıkılmaz yıldız kalkanları ve nihai plazma tahrik motorları.', 1000, 'intihar_sondasi', 1760, 1200, -1050, { parca: { plazma_yakiti: 100, kalkan_projektoru: 1 } }, true),
};
export const GEZEGEN_SIRASI = Object.keys(GEZEGENLER);

// --- 5.1 Evren Kütüphanesi salonları; 5.2 itibar kademeleri ---
export const SALONLAR = {
  astrofizik: 'Astrofizik Salonu',
  biyoloji: 'Kseno-Biyoloji Koridoru',
  tarih: 'Tarih ve Sanat Galerisi',
  anomali: 'Anomali Laboratuvarı',
};
export const ITIBAR_KADEMELERI = [
  { esik: 0, ad: 'Bilinmeyen Kazazede', tarif: 'Galakside adınız duyulmamış; hayatta kalmaya çalışan bir mülteci kampı olarak görülüyorsunuz. Ek bonus yok.' },
  { esik: 1000, ad: 'Tanınan Kâşif', tarif: 'İlk raporlar bağımsız akademilerin dikkatini çekti; ilk yabancı araştırmacılar geliyor. Taramalar yüzde on beş hızlı, pazarlarda yüzde on avantaj, koloni moraline artı beş.' },
  { esik: 5000, ad: 'Galaktik Öncü', tarif: 'Kütüphaneniz galaksinin en zengin arşivlerinden biri; konfederasyonlar elçi yolluyor. Araştırma yüzde yirmi beş hızlı, pazar yüzde on beş; korsanlar adını tanır: savaşmadan korkutma ya da yüzde otuz beşte teslim. Tonoflenya\'nın beş ana gücü artı on saygınlık tanır.' },
  { esik: 12000, ad: 'Evrenin Muhafızı', tarif: 'Aethelis-IV artık bir koloni değil: evrenin sırlarının çözüldüğü tarafsız, dokunulmaz bir galaktik fener. Pazar yüzde yirmi beş, araştırma yüzde otuz beş, bütün savaşlarda yüzde on savunma; Konsey ve ambargo ikna testlerinde sözün geçer.' },
];
