// Derin uzay görevleri: dokuz büyük senaryonun (uzay-oyunu-tasarim-ve-senaryo.md bölüm 5) ve yirmi dört derin uzay
// görevinin (derin-uzay-gorevleri.md G-01 … G-12, derin-uzay-gorevleri-cilt-2.md G-13 … G-24) operasyon adımları,
// G görevlerinin donanımları ve uzay noktaları. Saf veri; motor uzay/operasyon.js.
//
// Adım türleri (operasyon.js):
//   yaklas   hedefin sesi iki kulakta eşitlenene dek sağa-sola kaydır, yukarı kaydırıp hızlan (sessiz: yalnız dokunuşla
//            soğuk gaz itkisi; yukarı kaydırmak kıvılcım çıkarır)
//   kenetle  çift dokun
//   sonar    basılı tut: yankı
//   frekans  iki parmakla çevir (ya da yukarı-aşağı sürükle); ton netleşip kilitlenene dek
//   basinc   basınç yükselir, kesik alarm başlayınca çift dokun (girdi 'cift2': iki parmakla çift dokun); üç kez
//   tut      basılı tut: donanım birkaç saniye çalışır
//   ritim    art arda n kez dokun
//   kacin    tehlikenin sesi bir yandan gelir; ters yana kaydır (yon: 'asagi' ise aşağı kaydırıp saklan)
//   dron     iki parmağı birbirinden ayır (ya da iki parmakla yukarı kaydır): dron fırlar
//   nisan    sağa sola kayan hedef ortaya gelince çift dokun ya da yukarı kaydır (ateş)
//   kademeli n kez (iki ya da üç parmakla) aşağı ya da yukarı kaydır
//   denge    sapma kayar; yatay ya da dikey sürükleyerek iki tonu birleştir ve tut
//   direnc   çekim seni içeri çeker; aşağı sürükleyip motoru geri itişte tut
//   ton      basılı tut: kilit tonları çalar; geri çal (aşağı kaydır kalın, yukarı kaydır tiz, çift dokun orta)
//   bosluk   düzenli tıkırtıda eksik vuruşların yerine dokun

const don = (ad, tesis, girdi, sure, minSinif, tarif) => ({ ad, tesis, girdi, sure, minSinif, tarif });

// --- G görevlerinin donanımları (ek donanım; uretim.js mod_<id> tarifleri üretir) ---
export const G_DONANIMLARI = {
  frekans_kalkani: don('frekans izolasyonlu iletişim kalkanı', 'sinyal_kulesi', { kablo: 10, kristal: 1 }, 60, 1, 'Ses patlamalarından kokpiti korur (G-01).'),
  manyetik_capa: don('manyetik itki çapası ve tamir dronu', 'dokumhane', { plaka: 50, titanyum: 2 }, 60, 1, 'Uyduların dış halkasına kenetlenir; dron sıkışmış vanaları gevşetir (G-01).'),
  plazma_kesici: don('termal plazma kesici', 'dokumhane', { titanyum: 2, izotop: 1 }, 60, 1, 'Gövdeleri saran buzu eritir (G-02).'),
  kurtarma_kapsulu: don('basınç dengelemeli kurtarma kapsülü', 'dokumhane', { plaka: 50, polimer_levha: 10 }, 60, 1, 'Donmuş gemilerden yük ve insan alır (G-02).'),
  sinyal_cozucu: don('çok kanallı sinyal çözücü bilgisayar', 'sinyal_kulesi', { mikrocip: 10, kristal: 1 }, 60, 1, 'Sahte yankıların içinden gerçek sinyali ayıklar (G-03).'),
  ince_itici: don('ince manevra iticileri', 'dokumhane', { plaka: 30, kablo: 10 }, 60, 1, 'Dev yelkenlerin arasından kıl payı geçirir (G-03).'),
  soguk_itici: don('düşük ısılı sessiz sürüklenme motoru', 'reaktor_lab', { polimer_levha: 10, helyum: 10 }, 60, 1, 'Kıvılcım çıkarmayan soğuk gaz iticisi (G-04).'),
  kriyo_enjektor: don('basınçlı soğutma gazı enjektörü', 'reaktor_lab', { helyum: 20, kablo: 10 }, 60, 1, 'Çatlakları soğutma gazıyla dondurur (G-04).'),
  paratoner: don('iyon dağıtıcı paratoner zırhı', 'dokumhane', { titanyum: 2, kablo: 20 }, 60, 1, 'Gövdede biriken statik yükü boşaltır (G-05).'),
  cekici_isin: don('güçlendirilmiş çekici ışın', 'reaktor_lab', { kristal: 2, kablo: 20 }, 60, 1, 'Sondaları ve küçük nesneleri ambara çeker (G-05).'),
  jiroskop_capa: don('jiroskopik dengeleme çapası', 'dokumhane', { plaka: 50, kristal: 1 }, 60, 1, 'Dönen kütlelerin göbeğine kenetlenir (G-06).'),
  torklu_itici: don('yüksek torklu manyetik itici', 'reaktor_lab', { iyon_reaktoru: 1, plaka: 30 }, 90, 1, 'Dev yapıları ekseninden iter (G-06).'),
  yercekimi_kalkani: don('yerçekimi kalkanı ve ısı yalıtımlı kargo ambarı', 'reaktor_lab', { graviton_yakiti: 10, plaka: 50 }, 90, 2, 'Yoğun çekim dalgalarına ve akkor metale dayanır (G-07).'),
  sonar_matkap: don('sonar rezonans matkabı', 'arac_hangari', { sondaj_cekirdegi: 1, saf_kristal: 10 }, 90, 2, 'Sonik şokla metal kabukları kırar (G-07).'),
  hidrofon: don('akustik hidrofon ve sessiz çalışma modu', 'sinyal_kulesi', { kristal: 2, mikrocip: 10 }, 60, 2, 'Kör nebulalarda motor tıklamalarını dinler (G-08).'),
  emp_torpido: don('manyetik impuls torpidosu', 'reaktor_lab', { iyon_reaktoru: 1, kablo: 20 }, 90, 2, 'Düşman motorlarını elektromanyetik darbeyle susturur (G-08).'),
  harmonik_rezonator: don('biyo-akustik harmonik rezonatör', 'biyo_kubbe', { kseno: 1, kristal: 2 }, 60, 2, 'Canlı kristallerle aynı frekansta konuşur (G-09).'),
  kriyo_kol: don('kriyojenik kapsülleme kolu', 'reaktor_lab', { helyum: 20, plaka: 30 }, 60, 2, 'Kırılgan canlı örnekleri zedelemeden alır (G-09).'),
  sonik_cozucu: don('sonik çözücü ve frekans analizörü', 'sinyal_kulesi', { saf_kristal: 10, mikrocip: 5 }, 60, 2, 'Akustik kilitlerin tonlarını çözer (G-10).'),
  gaz_roketi: don('yüksek basınçlı gaz roketi', 'reaktor_lab', { helyum: 20, itki_yakiti: 10 }, 60, 2, 'Kilitli kapılara basınç uygular (G-10).'),
  radyasyon_zirhi: don('ağır kurşun-polimer radyasyon zırhı', 'dokumhane', { polimer_levha: 20, plaka: 50 }, 60, 2, 'Pulsar ışınlarına karşı koruma (G-11).'),
  hizli_karadutu: don('hızlı veri kayıt karadutusu', 'sinyal_kulesi', { mikrocip: 15, saf_kristal: 10 }, 60, 2, 'Ritmik sinyalleri hızla kaydeder (G-11).'),
  kuantum_kanca: don('çekici kanca ve kuantum dengeleyici', 'reaktor_lab', { graviton_yakiti: 10, sasi_celigi: 30 }, 90, 2, 'Yarığın kenarındaki nesneleri zıpkınla yakalar (G-12).'),
  intikal_motoru: don('yüksek hızlı intikal iticileri', 'reaktor_lab', { plazma_yakiti: 20, iyon_reaktoru: 1 }, 90, 2, 'Yarığın çekiminden hızla kaçırır (G-12).'),
  piezo_donusturucu: don('piezo-elektrik rezonans dönüştürücüsü', 'sinyal_kulesi', { saf_kristal: 20 }, 60, 2, 'Kristal zekâlarla konuşmak için piezo akımı üretir (G-13).'),
  kseno_iletisim: don('yalıtımlı kseno-iletişim dizilimi', 'biyo_kubbe', { kseno: 1, kablo: 20 }, 60, 2, 'Yabancı sinyalleri melodik bir çeviri ritmine oturtur (G-13).'),
  sonar_bastirici: don('düşük frekanslı sonar bastırıcı', 'sinyal_kulesi', { mikrocip: 10, kablo: 10 }, 60, 2, 'Korsan şamandıralarını susturur (G-14).'),
  coban_isini: don('kseno-biyolojik çoban ışını', 'biyo_kubbe', { kseno_spor: 2, saf_kristal: 10 }, 60, 2, 'Canlı sürülerini peşinden götüren biyo-siren (G-14).'),
  dalga_modulatoru: don('yerçekimi dalga modülatörü', 'reaktor_lab', { graviton_yakiti: 20, saf_kristal: 10 }, 90, 2, 'Görünmez gemileri yerçekimi dalgalanmasından bulur (G-15).'),
  karanlik_kalkan: don('karanlık madde koruma kalkanı', 'reaktor_lab', { antigrav_tozu: 1, plaka: 50 }, 90, 2, 'Karanlık madde akımlarına karşı gövdeyi korur (G-15).'),
  termal_kablo: don('ağır termal yalıtımlı enerji transfer kablosu', 'dokumhane', { kablo: 40, polimer_levha: 10 }, 60, 2, 'Reaktörden dış yapılara acil durum gücü aktarır (G-16).'),
  sibernetik_arayuz: don('sibernetik veri arayüzü', 'sinyal_kulesi', { mikrocip: 20, kablo: 10 }, 60, 2, 'Biyo-mekanik arşivlere bağlanır (G-16).'),
  isi_kalkani: don('aşırı ısı kalkanı ve atmosferik iniş kanatları', 'reaktor_lab', { helyum: 30, plaka: 50 }, 90, 2, 'Kızgın atmosferlere dalmayı sağlar (G-17).'),
  jeotermal_sonda: don('zırhlı jeotermal maden sondası', 'arac_hangari', { sondaj_cekirdegi: 1, plaka: 30 }, 90, 2, 'Lavın içinden kristal çıkarır (G-17).'),
  zirh_isitici: don('kriyojenik zırh ısıtıcısı', 'dokumhane', { kablo: 20, helyum: 20 }, 60, 2, 'Donmuş dünyalarda gövdeyi ısıtır (G-18).'),
  buz_delici: don('sonik buz delici sondaj ünitesi', 'arac_hangari', { sondaj_cekirdegi: 1, kristal: 1 }, 90, 2, 'Kalın buzulları deler (G-18).'),
  denge_iticisi: don('yerçekimi dengeleme iticileri', 'reaktor_lab', { antigrav_tozu: 1, plaka: 30 }, 60, 2, 'Dönen enkaz parçalarının arasında süzdürür (G-19).'),
  gaz_emici: don('atmosferik gaz yakalama emicisi', 'reaktor_lab', { helyum: 20, polimer_levha: 20 }, 60, 2, 'Antik atmosfer bileşenlerini tanklara çeker (G-19).'),
  kok_kesici: don('plazma yakıcı kök kesici', 'dokumhane', { titanyum: 2, izotop: 1 }, 60, 2, 'Canlı kökleri yakarak keser (G-20).'),
  kurtarma_roveri: don('zırhlı kurtarma keşif aracı', 'arac_hangari', { sasi_celigi: 60, plaka: 30 }, 90, 2, 'Yabancı yüzeylerde mahsur kalanlara ulaşır (G-20).'),
  kenet_tuneli: don('çoklu manyetik kenetlenme tüneli', 'dokumhane', { plaka: 100, polimer_levha: 20 }, 90, 3, 'Çöken istasyonlara tahliye körüğü kurar (G-21).'),
  yasam_destek: don('yüksek kapasiteli yaşam destek modülü', 'biyo_kubbe', { helyum: 40, polimer_levha: 30 }, 90, 3, 'Binlerce sivili taşıyabilir (G-21).'),
  hisar_kalkani: don('ağır hisar kalkanı ve yansıtıcı zırh', 'askeri_tersane', { zirhli_plaka: 100, kalkan_projektoru: 1 }, 150, 3, 'Gemiyi konvoya siper eder (G-22).'),
  emp_topu: don('EMP şok dalga topu', 'askeri_tersane', { iyon_reaktoru: 1, saf_kristal: 20 }, 120, 3, 'Elektromanyetik ağları parçalar (G-22).'),
  dekontaminasyon_odasi: don('sterilizasyon plazma dekontaminasyon odası', 'biyo_kubbe', { helyum: 30, izotop: 1 }, 90, 3, 'Patojen sporlarını plazmayla yakar (G-23).'),
  biyo_sensor: don('uzaktan teşhis ve biyo-sensör taraması', 'sinyal_kulesi', { mikrocip: 10, saf_kristal: 10 }, 60, 3, 'Gövde dışından yaşam sinyallerini ayırır (G-23).'),
  cekici_halat: don('gravitasyonel çekici halat', 'reaktor_lab', { graviton_yakiti: 20, sasi_celigi: 60 }, 120, 3, 'Olay ufkundaki gemilere zıpkın atar (G-24).'),
  cift_kuantum: don('çift çekirdekli kuantum itki motoru', 'kuantum_lab', { kseno_alasim: 30, graviton_yakiti: 20 }, 150, 3, 'Kara delik gelgitinden koparacak aşırı yükleme (G-24).'),
};

// --- G görevlerinin uzay noktaları ---
// Dinleme kulesinin menzili büyüdükçe dalga dalga belirir: tamamlanan operasyon sayısına göre.
const tamam = (d) => (d.tamamlananOp || []).length;
const gemiVar = (d) => !!d.gemi && d.koloni.binalar.includes('sinyal_kulesi');
const nokta = (id, ad, x, y, frek, sinif, esik, gorev, tehlike, hedef, gerekli) => ({
  ad, x, y, frek, sinif, poi: id, gorev, tehlike, hedef,
  gerekli: gerekli.map((k) => ({ katman: k, ad: G_DONANIMLARI[k].ad })),
  acKosul: (d) => gemiVar(d) && tamam(d) >= esik,
});
export const G_NOKTALARI = {
  g01: nokta('g01', 'Mor Ötesi Kuşak, Delta-9: kadim rezonatör uydusu', -400, 300, 330, 1, 0, 'G-01 Sessiz Çan Kulesi', 'Kontrolsüz bir yerçekimi çanı gibi titreşen kadim seyir feneri; asteroitlerin yörüngesi bozuluyor.', 'Çanın frekansını eşlemek, çapayla kenetlenmek, dronla soğutma vanasını gevşetmek.', ['frekans_kalkani', 'manyetik_capa']),
  g02: nokta('g02', 'Caelum Buzul Alanı: donmuş maden gemisi SS Vornak', 500, -500, 370, 1, 0, 'G-02 Donmuş Madenci Gemisi', 'Metan buzuna gömülmüş, yaşam desteği kapalı bir maden gemisi; ambarında hidrojen hücreleri sağlam.', 'Buzu eritmek, donmuş kilidi zorlamak, hidrojen tanklarını almak.', ['plazma_kesici', 'kurtarma_kapsulu']),
  g03: nokta('g03', 'Tarras Ayrımı: yansıtıcı güneş yelkeni kalıntıları', -600, -200, 415, 1, 1, 'G-03 Ayna Koridoru', 'Dev yelkenler telsiz sinyallerini her yöne yansıtıyor; sahte yardım çağrıları arasında gerçek bir sinyal saklı.', 'Yelkenlerden kaçınmak, gerçek mekiği bulmak, mürettebatı tahliye etmek.', ['sinyal_cozucu', 'ince_itici']),
  g04: nokta('g04', 'Oksidasyon Kuşağı: sızdıran yakıt istasyonu', 200, 500, 494, 1, 1, 'G-04 Kayıp Yakıt Tankeri', 'Patlayıcı plazma gazı sızdıran, çekirdeği kritik ısıya yaklaşan bir istasyon. En ufak kıvılcım sektörü tutuşturur.', 'Kıvılcımsız yaklaşmak, çatlağı dondurmak, kalan yakıtı almak.', ['soguk_itici', 'kriyo_enjektor']),
  g05: nokta('g05', 'Aethel-Girdabı: iyon fırtınasındaki bilim sondası', 700, 200, 554, 1, 2, 'G-05 Elektromanyetik Fırtına', 'Füzyon verileriyle dolu bir sonda iyon fırtınasının merkezinde, motorları kilitli.', 'Statik yükü boşaltarak sondaya ulaşmak, çekici ışınla ambara almak.', ['paratoner', 'cekici_isin']),
  g06: nokta('g06', 'Kırık Omurga Asteroit Kümesi: iyonik deniz feneri', -200, 700, 622, 1, 2, 'G-06 İyonik Deniz Feneri', 'Ekseninden kaymış dev bir radyo feneri konvoyları asteroit tarlasına yönlendiriyor.', 'Dönüşüne eşlenip kenetlenmek, feneri doğru eksene itmek.', ['jiroskop_capa', 'torklu_itici']),
  g07: nokta('g07', 'Nekropol Artığı: parçalanmış gezegen çekirdeği', 1400, 100, 262, 2, 3, 'G-07 Gezegen Çekirdeğinde Ağır Element Hasadı', 'Akkor, aşırı yoğun bir çekirdek parçası soğuyarak kabuk bağlıyor; çekimi gemileri yutuyor.', 'Çekime direnmek, kabuğu sonik şokla kırmak, nötron-yoğun cevheri dronla almak.', ['yercekimi_kalkani', 'sonar_matkap']),
  g08: nokta('g08', 'Zehirli Sülfür Bulutu: kör nokta', -900, -800, 311, 2, 3, 'G-08 Kör Nebulada Hayalet Avcı', 'Konvoylara pusu kuran görünmez bir korvet; sensörler kör, yalnız motor tıklamaları duyuluyor.', 'Sessizce dinlemek, hedefe kilitlenmek, EMP torpidosuyla susturmak.', ['hidrofon', 'emp_torpido']),
  g09: nokta('g09', 'Kseno-Yatağı: kristal döküntü kuşağı', 100, -800, 698, 2, 4, 'G-09 Kristalize Yaşam Kozası', 'Kuyruklu yıldıza yapışmış, içinden kalp atışı gelen zümrüt bir koza. Kaba bir dokunuş içindekini öldürür.', 'Nabzın frekansını bulmak, kabuğu rezonansla gevşetmek, kozayı karantinaya almak.', ['harmonik_rezonator', 'kriyo_kol']),
  g10: nokta('g10', 'Unutulmuşlar Boşluğu, Koordinat Sıfır: taşlaşmış tapınak gemisi', -1400, 300, 233, 2, 4, 'G-10 Taşlaşmış Kadim Tapınak Gemisi', 'Taşa dönmüş kadim bir gemi; kapısı ses dalgalarına tonlarla yanıt veren akıllı bir kilit.', 'Kilidin tonlarını geri çalmak, dronla holografik diskleri toplamak.', ['sonik_cozucu', 'gaz_roketi']),
  g11: nokta('g11', 'Nötron Ufku: pulsar radyasyon sektörü', 1300, -800, 740, 2, 5, 'G-11 Ölü Yıldızın Kalp Atışı', 'Saniyede onlarca kez dönen bir pulsar; ışınları ölümcül, sinyalinde gizli bir şifre.', 'Işından saklanarak ritmi kaydetmek, eksik vuruşları tamamlamak, kaçmak.', ['radyasyon_zirhi', 'hizli_karadutu']),
  g12: nokta('g12', 'Kırık Çizgi: boyut yarığı sınırı', -500, -1400, 277, 2, 5, 'G-12 Alt-Uzay Korvet Enkazı', 'İki evren arasında sıkışmış bir korvet; karadutusu yarığa savrulmak üzere.', 'Çekime direnmek, karadutusuna zıpkın atıp makarayla çekmek.', ['kuantum_kanca', 'intikal_motoru']),
  g13: nokta('g13', 'Kristal Sırtı, Sigma-11: Kithron kovanı', 800, 1200, 784, 2, 6, 'G-13 Kovandaki Fısıltı: Kithron', 'Cam gibi tınlayan, düşünen bir kristal kolonisi. Silikat zekâsı Kithron.', 'Sessizce yaklaşmak, kovanın ritmine kilitlenmek, barışçıl yayınla elçiyi almak.', ['piezo_donusturucu', 'kseno_iletisim']),
  g14: nokta('g14', 'Gaz devi Aethel-Tiamat: dış halka katmanı', -1300, -1000, 165, 2, 6, 'G-14 Metan Okyanusunun Şarkıcıları: Vaelin', 'Korsan şamandıralarının tiz ciyaklamasıyla acı içindeki planktonik bir sürü.', 'Şamandırayı susturmak, sürüyü sirenle peşine takıp güvenli yörüngeye çekmek.', ['sonar_bastirici', 'coban_isini']),
  g15: nokta('g15', 'Hiper-Boşluk Uçurumu, Sektör 0: göçebe Nyxar filosu', 0, 1550, 98, 2, 7, 'G-15 Karanlık Madde Gezginleri: Nyxar', 'Gözle görülmeyen bir göçebe filo; yalnız yerçekimi dalgalanmasıyla seziliyor. Amiral gemisinin çekirdeği sönüyor.', 'Görünmez gemiyi bulmak, karanlıkta yaklaşmak, çekirdeğe yerçekimi plazması pompalamak.', ['dalga_modulatoru', 'karanlik_kalkan']),
  g16: nokta('g16', 'Beyaz cüce kalıntısı: Oron mabet istasyonu', 1500, -300, 880, 2, 7, 'G-16 Yıldız Tozu Rahipleri: Oron', 'Radyasyon fırtınasında enerjisi tükenmiş biyo-mekanik bir mabet.', 'Kenetlenip güç aktarmak, rahiplerin tonlarını tekrarlayıp arşivi kopyalamak.', ['termal_kablo', 'sibernetik_arayuz']),
  g17: nokta('g17', 'İç Kuşak: cehennem dünyası Pyros-7', 1000, 1000, 196, 2, 8, 'G-17 Kızıl Lav Dünyası: Pyros-7', 'Kızgın atmosferli bir lav dünyası; magma nehirlerinin altında volkanik çekirdek kristalleri.', 'Atmosfere dengeyle girmek, lavın üstünde sabitlenip sondayı bırakmak, kristalle kaçmak.', ['isi_kalkani', 'jeotermal_sonda']),
  g18: nokta('g18', 'Dış Donmuş Kuşak: Glies-9b', -1100, -1150, 587, 2, 8, 'G-18 Kriyojenik Gezegen: Glies-9b', 'Amonyak tipisi altında donmuş bir dünya; buzun altında antik bir tohum bankası.', 'Fırtınada inmek, buzu delmek, dronla tohumları almak.', ['zirh_isitici', 'buz_delici']),
  g19: nokta('g19', 'Parçalanmış kadim halka dünyası', 400, -1450, 659, 2, 9, 'G-19 Halka Dünyası Molozları', 'Dönen dev metal ve toprak parçaları; birinde hâlâ yaşayan yapay bir biyom.', 'Parçaların arasından süzülmek, biyomu bulmak, antik atmosferi ve tohumları almak.', ['denge_iticisi', 'gaz_emici']),
  g20: nokta('g20', 'Orman dünyası Viridion-IV', -1450, 650, 523, 2, 9, 'G-20 Biyo-Toksik Cennet: Viridion-IV', 'Canlı, nabız atan bir orman; köklerin arasında mahsur bir bilim ekibi.', 'Taşlığa inmek, roveri yollamak, kökleri yakmak, ekibi vinçle çekmek.', ['kok_kesici', 'kurtarma_roveri']),
  g21: nokta('g21', 'Sınır Hattı: çöken yıldız istasyonu Orion-Omega', 1550, 350, 349, 3, 10, 'G-21 Orion-Omega Tahliyesi', 'Reaktörü patlamak üzere olan dev bir istasyon; binlerce sivil iskelede bekliyor.', 'Tahliye körüğünü kurmak, kapıları kırmak, patlamadan önce kopup kaçmak.', ['kenet_tuneli', 'yasam_destek']),
  g22: nokta('g22', 'Kara Bayrak Boğazı: asteroit pusu alanı', -700, 1350, 392, 3, 10, 'G-22 Korsan Kafesi', 'Elektromanyetik bir ağa yakalanmış kargo konvoyu ve onu döven korsanlar.', 'Konvoya siper olmak, ağı EMP ile parçalamak, konvoyu güvenli sıçramaya eskort etmek.', ['hisar_kalkani', 'emp_topu']),
  g23: nokta('g23', 'Sessiz Sektör, Mu-4: sürüklenen hastane gemisi', -100, -300, 440, 3, 11, 'G-23 Sürüklenen Hastane Gemisi', 'Patojenle dolu bir hastane gemisi; içeride zayıf kalp atışları.', 'Yaşam sinyallerini taramak, plazma gazıyla arındırmak, yaralıları almak, gövdeyi imha etmek.', ['dekontaminasyon_odasi', 'biyo_sensor']),
  g24: nokta('g24', 'Kızıl Uçurum: olay ufku kenarı', 1100, -1050, 147, 3, 11, 'G-24 Kara Delik Gelgiti', 'Olay ufkunun kenarında sıkışmış diplomatik bir firkateyn; telsizi zamanla bükülmüş, ağır çekimde.', 'Gelgit çizgisinde dengede kalmak, halatı fırlatmak, kuantum itkiyle iki gemiyi koparmak.', ['cekici_halat', 'cift_kuantum']),
  // Kadim Genom görevinin (5.2) açtığı nokta
  kadim_mezar: {
    ad: 'Kadim medeniyetin mezar gezegeni', x: -1250, y: 1200, frek: 208, poi: 'kadim_mezar', gerekli: [], sinif: 1,
    gorev: 'Kadim Mezar Gezegeni',
    tehlike: 'Biyo-kapsüldeki DNA şifresinin gösterdiği sessiz bir dünya; yörüngede kadim mezar uyduları.',
    hedef: 'Mezar uydusunun kilidini açmak, kadim diskleri ve genetik arşivi almak.',
    acKosul: (d) => !!d.bayrak.vaka2_biyokapsul,
  },
};

// --- Operasyonlar: adımlar ve ödüller ---
// odul: gemi (hediye gemiler), bayrak, kaynak (hammadde), parca, nufus, barinma, moral, itibar, kodeks
const A = (tur, ad, giris, bitis, ek) => ({ tur, ad, giris, bitis, ...(ek || {}) });
export const OPERASYONLAR = {
  // 9 büyük senaryo
  sektor15: {
    adimlar: [
      A('yaklas', 'Asteroide yaklaş', 'Nebulanın parazitinde istasyonun acil fenerini dinle. Ses iki kulakta eşitlenene dek sağa ya da sola kaydır; yukarı kaydırıp yaklaş.', 'Asteroidin oyuk girişindesin. İstasyon karanlık ve soğuk.', { frek: 523 }),
      A('basinc', 'Graviton reaktöründen güç bas', 'Reaktörden istasyonun şebekesine güç basıyorsun. Basınç yükselir; kesik alarm başlayınca çift dokun, enerjiyi akıt. Üç kez.', 'Hangarların dev kapıları gıcırdayarak açılıyor.'),
      A('frekans', 'Kripto antenle şifreyi çöz', 'Şifreli askeri veritabanı. İki parmakla çevir; parazitin içindeki ince ton netleşip kilitlenene dek.', 'Kızağın kilit kodları çözüldü. İçeride prototip bir ağır kruvazör!'),
      A('nisan', 'Hisar toplarıyla korsanları püskürt', 'Enerji dalgasını fark eden üç korsan korveti geliyor! Motor sesleri sağa sola kayıyor; ses tam önüne gelince çift dokun, ateş.', 'Üç korvet de etkisiz. Kruvazörün reaktörü uyanıyor.', { n: 3 }),
    ],
    sonuc: ['Prometheus prototip ağır kruvazörü gemimizin eskortunda Aethelis-IV tersanesine çekildi ve donanmaya katıldı.', 'İstasyonun mühendis kayıtları ve reaktör şemaları akademiye aktarıldı.'],
    odul: { gemi: [{ sinif: 4, ad: 'Prometheus Ağır Kruvazörü' }], bayrak: ['vaka1_reaktor', 'vaka1_muhendis', 'sema_kompozit'], itibar: 30, kodeks: { id: 'prometheus', ad: 'Prometheus istasyonu', tarif: 'Askeri kayıtlardan silinmiş, asteroide oyulmuş gizli tersane ve dinleme istasyonu.' } },
  },
  moloz_kusagi: {
    adimlar: [
      A('yaklas', 'Kapsüle nazikçe yaklaş', 'Kırılgan buz kapsülü. Motorları kapat; yalnız dokunarak soğuk gazla sokul. Yukarı kaydırma: buz çatlar. Nabız gibi sinyali iki kulakta eşitle.', 'Kapsül önünde, buzun içinden ritmik bir nabız.', { frek: 784, sessiz: true, mesafe: 40 }),
      A('tut', 'Çekici kirişle ambara al', 'Basılı tut: manyetik kiriş kapsülü buzdan söküp ambara çeker.', 'Kapsül ambarda.'),
      A('kenetle', 'Biyo-karantinayı mühürle', 'Çift dokun: karantina bölmesi kapanır.', 'Bölme mühürlendi. Kapsül çözülüyor; sporlar saçılıyor.'),
      A('basinc', 'Plazma dekontaminasyonu', 'Mutasyon kontrolden çıkıyor! Plazma basıncı yükselince çift dokun, yak. Üç kez.', 'Mutasyon yandı; genetik çekirdek emniyette.'),
    ],
    sonuc: ['Dokunun çekirdeğindeki DNA şifresi çözüldü: kadim medeniyetin mezar gezegeninin koordinatları uzay haritasında.', 'Kadim genetik besinler biyosfer terraformingi için hazır.'],
    odul: { bayrak: ['vaka2_biyokapsul'], itibar: 25, kodeks: { id: 'kadim_genom', ad: 'Kadim genom', tarif: 'Milyonlarca yıllık stasis kapsülündeki soyu tükenmiş türün genetik çekirdeği.' } },
  },
  k12: {
    adimlar: [
      A('kacin', 'Meteoritlerden kaçın', 'Kanyondaki meteoritler! Vızıltı bir yandan yaklaşınca ters yana kaydır. Lamine zırh sıyrıkları kaldırır, tam çarpmayı kaldırmaz.', 'Kanyonu geçtin.', { n: 3 }),
      A('yaklas', 'Termal karartmayla sız', 'Termal karartma açık; motorlar soğuk. Yalnız dokunarak süzül; kalenin jeneratör uğultusunu iki kulakta eşitle.', 'Ana jeneratörün dibindesin.', { frek: 110, sessiz: true, mesafe: 40 }),
      A('basinc', 'Jeneratörü felç et', 'Jeneratöre aşırı yük basıyorsun. Alarm başlayınca çift dokun. Üç kez.', 'Kale karanlığa gömüldü.'),
      A('frekans', 'Karadutuyla otopilotu sıfırla', 'Kaçırılan eskortların otopilot frekansını bul; iki parmakla çevir.', 'Komuta bizde! Eskortlar korsanlara dönüyor.'),
    ],
    sonuc: ['Korsan kalesi çöktü. Kurtarılan iki askeri eskort gemisi zaferle koloniye geliyor.'],
    odul: { gemi: [{ sinif: 2, ad: 'Eskort Gemisi Alfa' }, { sinif: 2, ad: 'Eskort Gemisi Beta' }], itibar: 25 },
  },
  zaman_havzasi: {
    adimlar: [
      A('denge', 'Zaman çizgisini sabitle', 'Kuantum sürücüsü devrede. İki ton kayıyor: sağa sola sürükleyip birleştir ve tut.', 'Geminin zaman çizgisi sabit.', { eksen: 'yatay' }),
      A('kacin', 'Mikro-patlamaları sönümle', 'Zaman çapası açık. Yerçekimi patlamaları bir yandan gelince ters yana kaydır.', 'Patlamalar söndü.', { n: 3 }),
      A('frekans', 'Gerçek korvetin imzasını ayıkla', 'Geçmiş ve gelecek konuşmalar üst üste. Takonik çözücüyle iki parmakla çevir; gerçek imza netleşene dek.', 'Korvetin gerçek frekansı yakalandı.'),
      A('kademeli', 'Korveti döngüden çek', 'Döngünün kırıldığı an: iki parmakla aşağı kaydır, korveti çek!', 'Korvet boyut dışı yarıktan çıktı.', { n: 1, yon: 'asagi' }),
    ],
    sonuc: ['Boyutsal kayma yapabilen prototip Kuantum Korveti filoya katıldı.', 'Korvetin rezonans çekirdeklerinin şeması kuantum laboratuvarında.'],
    odul: { gemi: [{ sinif: 3, ad: 'Kuantum Korveti' }], bayrak: ['sema_kuantum'], itibar: 30 },
  },
  xerad: {
    adimlar: [
      A('direnc', 'Yarığın çekimine direnç', 'Yarık seni içeri çekiyor! Aşırı yüklü iyon iticileri: aşağı sürükleyip geri itişte tut.', 'Konumunu korudun.', { sure: 10 }),
      A('yaklas', 'Kabine yönel', 'Deney kabininin acil bipini iki kulakta eşitle, yaklaş.', 'Kabin menzilde.', { frek: 349, mesafe: 40 }),
      A('tut', 'Kirişle kabini kilitle', 'Basılı tut: ağır kiriş kabine kilitlenir.', 'Kiriş kabinde.'),
      A('kademeli', 'Kabini kopar', 'İstasyon yarığa göçüyor! İki parmakla üç kez aşağı kaydır.', 'Kabin koptu; Denek 07 biyo-stabilizasyon odasında, nabzı düzenli.', { n: 3, yon: 'asagi' }),
    ],
    sonuc: ['Denek 07 hayatta. Kurtarılan Malken prototip gemisi filoya katıldı.', 'Deneğin genetik besin kültürleri biyosfer terraformingi için.'],
    odul: { gemi: [{ sinif: 3, ad: 'Malken Prototip Gemisi' }], bayrak: ['vaka5_denek07', 'vaka5_besin'], itibar: 30 },
  },
  yanan_gemi: {
    adimlar: [
      A('kacin', 'Alev koridorundan geç', 'Yangın kalkanı açık. Plazma alevleri bir yandan fışkırınca ters yana kaydır.', 'Çekirdeğe ulaştın.', { n: 3 }),
      A('basinc', 'Kriyo-pompayla çekirdeği soğut', 'Nitrojen-plazma basıncı yükseliyor; alarm başlayınca çift dokun, çekirdeğe bas. Üç kez.', 'Plazma hatları dondu; patlama gecikti.'),
      A('frekans', 'Tina\'nın bilincini aktar', 'Optik kripto-bellek bağlandı. Tina\'nın veri akışının frekansını iki parmakla çevirerek yakala.', 'Aktarım eksiksiz. Bir ses kulaklığında: "Teşekkür ederim, Kaptan."'),
    ],
    sonuc: ['Araştırma gemisi arkanızda patladı. Tina güvende.', 'Akademi Konfederasyonu en prestijli bilim gemisini hediye etti.'],
    odul: { gemi: [{ sinif: 4, ad: 'Akademi Bilim Gemisi' }], bayrak: ['vaka6_tina'], itibar: 35 },
  },
  aethel9: {
    adimlar: [
      A('kacin', 'Bombardıman koridorunu aç', 'Yörünge bataryaları çapraz ateşte! Mermi bir yandan gelince ters yana kaydır.', 'Koridor açık.', { n: 4 }),
      A('nisan', 'Amiral gemisine torpido', 'Amiral gemisinin kalkan jeneratörü; motor sesi sağa sola kayıyor. Önüne gelince yukarı kaydır ya da çift dokun: tek salvo.', 'Amiral gemisinin kalkanı çöktü; filo çekiliyor.', { n: 1 }),
      A('kademeli', 'Tahliye mekiklerini koru', 'Mekikler kalkıyor. Her biri için iki parmakla aşağı kaydır, manyetik örtüye al.', 'Son mekik de ambarda.', { n: 3, yon: 'asagi' }),
    ],
    sonuc: ['Kolonistlerin tahliyesi tamam; mültecilerin bir kısmı Aethelis-IV\'e yerleşiyor.', 'Aethel-9 yönetimi Hisar Muhafız Kruvazörünü emrine verdi; arıtıcı teknolojileri de geldi.'],
    odul: { gemi: [{ sinif: 4, ad: 'Hisar Muhafız Kruvazörü' }], bayrak: ['vaka7_multeci', 'vaka7_aritici', 'sema_super'], nufus: 20, barinma: 20, itibar: 40 },
  },
  tarras: {
    adimlar: [
      A('kacin', 'Tarafsız bölgede hayatta kal', 'Jammer kalkanı açık ama başıboş ateş var. Bir yandan gelince ters yana kaydır.', 'Tarafsız bölgedesin.', { n: 3 }),
      A('frekans', 'İki donanmanın protokollerini derle', 'Karadutu iki donanmayı birden dinliyor. Gizli protokolün frekansını iki parmakla çevirerek yakala.', 'Komplo belgeleri derlendi.'),
      A('tut', 'Kanıtları bütün frekanslara yay', 'Basılı tut: geniş bantlı verici kanıtları bütün filolara basar.', 'Bütün telsizlerde aynı kayıt. Ateş kesiliyor.'),
    ],
    sonuc: ['İki amiral savaşı durdurdu. Galaktik Hakem sensin.', 'Her iki konfederasyon tazminat olarak birer kruvazör teslim etti.'],
    odul: { gemi: [{ sinif: 4, ad: 'Konfederasyon Kruvazörü Doğu' }, { sinif: 4, ad: 'Konfederasyon Kruvazörü Batı' }], itibar: 50 },
  },
  kizil_yutucu: {
    adimlar: [
      A('direnc', 'Olay ufkuna direnç', 'Graviton sürücüsü gövdeyi koruyor ama çekim korkunç. Aşağı sürükleyip motoru geri itişte tut.', 'Çekim dengede.', { sure: 12 }),
      A('yaklas', 'Mancınığın kontrol merkezine kilitlen', 'Ters itki bobinleri açık. Kontrol merkezinin kadim uğultusunu eşitle, yaklaş.', 'Kontrol merkezine kenetlendin.', { frek: 293, mesafe: 50 }),
      A('ton', 'Kadim anahtarı çal', 'Kadim anahtar takıldı. Basılı tut: kilit tonlarını dinle. Sonra geri çal: aşağı kaydır kalın, yukarı kaydır tiz, çift dokun orta.', 'Mancınık uyanıyor.', { n: 5 }),
      A('kademeli', 'Fırlatılış', 'Mancınık hazır. İki parmakla yukarı kaydır!', 'Boyutlar arası bir fırlatılış!', { n: 1, yon: 'yukari' }),
    ],
    sonuc: ['Kara deliğin çekiminden kurtuldun. Mancınığın derinliklerinden uyanan Kadim Koruyucu savaş gemisi yanında, güvenli sektörde.'],
    odul: { gemi: [{ sinif: 5, ad: 'Kadim Koruyucu' }], itibar: 100 },
  },
  kadim_mezar: {
    adimlar: [
      A('sonar', 'Mezar uydusunu tara', 'Basılı tut: sonar.', 'Uydunun içinde mühürlü bir oda; duvarlarında ton dizileri.'),
      A('ton', 'Mühürü aç', 'Basılı tut: tonları dinle. Sonra geri çal: aşağı kalın, yukarı tiz, çift dokun orta.', 'Mühür açıldı.', { n: 4 }),
      A('dron', 'Dronla arşivi al', 'İki parmağını birbirinden ayır ya da iki parmakla yukarı kaydır: dron fırlar.', 'Dron kadim diskleri ve genetik arşivi getirdi.'),
    ],
    sonuc: ['Kadim medeniyetin mezar arşivi koloni kütüphanesinde. Disk şemaları kuantum laboratuvarında.'],
    odul: { bayrak: ['sema_kadim'], kaynak: { kseno: 4 }, itibar: 20, kodeks: { id: 'kadim_mezar', ad: 'Kadim mezar gezegeni', tarif: 'Kadimlerin ölülerini frekanslarla mühürlediği sessiz bir dünya.' } },
  },
  // Cilt I
  g01: {
    adimlar: [
      A('yaklas', 'Akustik yaklaşma', 'Çan sesinin rezonansı iki kulakta dengelenene dek sağa sola kaydır; yukarı kaydırıp çanın merkezine yaklaş.', 'Uydunun dış halkasındasın; çan kabinini sarsıyor.', { frek: 330 }),
      A('frekans', 'Frekans eşleme', 'İki parmakla çevir: geminin titreşimini uydunun ritmine getir.', 'Rezonans kilitlendi; tiz bir onay.'),
      A('kenetle', 'Çapa fırlatma', 'Çift dokun: manyetik çapa dış halkaya.', 'Çapa kenetlendi.'),
      A('dron', 'Dron tamiri', 'İki parmağını ayır ya da iki parmakla yukarı kaydır: tamir dronu.', 'Vana gevşedi; kükreyen çan sakin, ritmik bir bipe döndü.'),
    ],
    sonuc: ['Kadim seyir uydusu yeniden çalışıyor; uzak sektörlerin rota haritaları sinyal kulesine aktarıldı. Fenerler artık daha uzaktan duyulur.'],
    odul: { bayrak: ['g_haritalar'], itibar: 10 },
  },
  g02: {
    adimlar: [
      A('sonar', 'Enkaz taraması', 'Basılı tut: sonar. Metalin buz altındaki tok yankısını dinle.', 'Gövde buzun on metre altında.'),
      A('tut', 'Buz eritme', 'Basılı tut: plazma kesici çalışır; buzun çatırdaması ve buharlaşması.', 'Hava kilidi açıkta.'),
      A('ritim', 'Hava kilidini zorla', 'Donmuş kilidin acil koluna üç kez art arda dokun.', 'Kapı metalik bir iniltiyle aralandı.', { n: 3 }),
      A('kademeli', 'Kargo tahliyesi', 'Yükleme rayı uzandı. Her tank için iki parmakla aşağı kaydır.', 'Hidrojen tankları ambarda.', { n: 3, yon: 'asagi' }),
    ],
    sonuc: ['Saf hidrojen yakıtı tersaneye; seyir defterinden eski maden yataklarının yerleri öğrenildi.'],
    odul: { parca: { itki_yakiti: 60 }, kaynak: { titanyum: 6, bazalt: 6 }, itibar: 10 },
  },
  g03: {
    adimlar: [
      A('yaklas', 'Yankı labirenti', 'Her yandan fısıltılar. Gerçek sinyal boğuk ve tekdüze; onu iki kulakta eşitle, yaklaş.', 'Yankıların dışına çıktın.', { frek: 415 }),
      A('kacin', 'Yelken engelleri', 'Dev yelkenler! Vızıltı bir yandan gelince ters yana kaydır.', 'Yelkenler geride.', { n: 3 }),
      A('frekans', 'Kaynak geminin tespiti', 'Küçük keşif mekiğinin sinyalini iki parmakla çevirerek eşitle.', 'Mekik bulundu.'),
      A('kenetle', 'Transfer tüneli', 'Çift dokun: manyetik transfer tüneli.', 'Adım sesleri, hava kilidi; mürettebat gemide.'),
    ],
    sonuc: ['Kurtarılan sivil mürettebat ve astrogatörler koloni akademisine katıldı.'],
    odul: { nufus: 3, bilim: 1, itibar: 10 },
  },
  g04: {
    adimlar: [
      A('yaklas', 'Sessiz yaklaşma', 'Reaktör kapalı. Yalnız dokunarak soğuk gazla kay; yukarı kaydırma kıvılcım çıkarır! İstasyonun inlemesini iki kulakta eşitle.', 'İstasyonun dibindesin.', { frek: 494, sessiz: true, mesafe: 40 }),
      A('yaklas', 'Sızıntının yerini bul', 'Tıslamanın en yüksek olduğu noktaya dön ve dokunarak sokul.', 'Çatlak tam önünde.', { frek: 1200, sessiz: true, mesafe: 15 }),
      A('tut', 'Kriyojenik mühürleme', 'Basılı tut: soğutma gazı çatlağa; tıslama donma sesine döner.', 'Çatlak dondu.'),
      A('basinc', 'Yakıt transferi', 'Emiş hortumu bağlı. Basınç alarmında çift dokun. Üç kez.', 'Saf plazma ambarda.'),
    ],
    sonuc: ['Tersaneye yüksek verimli plazma yakıtı; sektörde güvenli bir ikmal koridoru açıldı.'],
    odul: { parca: { plazma_yakiti: 60 }, itibar: 10 },
  },
  g05: {
    adimlar: [
      A('yaklas', 'Statik gürültüde ilerleme', 'Şimşeklerin arasında sondanın düzenli mors bipini iki kulakta eşitle, yaklaş.', 'Sonda menzile girdi.', { frek: 554 }),
      A('basinc', 'Yüksek voltaj boşaltımı', 'Gövdede statik birikiyor. Kritik alarmda iki parmakla çift dokun: paratoner. Üç kez.', 'Gövde boşaldı.', { girdi: 'cift2' }),
      A('tut', 'Çekici ışın kilidi', 'Basılı tut: çekici ışın sondaya kilitlenir.', 'Sonda ağır ağır geliyor.'),
      A('kenetle', 'Ambara alma', 'Çift dokun: kargo kapağı.', 'Sonda karantinada.'),
    ],
    sonuc: ['Sondanın füzyon kayıtları yeni nesil enerji kalkanlarının yolunu açtı: bir kalkan projektörü tersanede.'],
    odul: { parca: { kalkan_projektoru: 1 }, itibar: 10 },
  },
  g06: {
    adimlar: [
      A('yaklas', 'Dönen kütleye yanaşma', 'Fenerin ritmik iniltisini iki kulakta eşitle, yaklaş.', 'Fener yanında dönüyor.', { frek: 622 }),
      A('frekans', 'Dönüş hızını eşleme', 'Sağa sola kaydır ya da iki parmakla çevir: iki ses üst üste oturunca bağıl hız sıfır.', 'Senkron.'),
      A('kenetle', 'Aks sabitleme', 'Çift dokun: jiroskopik çapa göbeğe.', 'Çapa kenetlendi.'),
      A('denge', 'Manuel itme ile açı ayarı', 'Yavaşça yukarı ya da aşağı sürükle: iki ton birleşince fener doğru eksende.', 'Fener berrak, tiz ana tonunu veriyor.', { eksen: 'dikey' }),
    ],
    sonuc: ['Ticaret ve göçmen gemilerinin rotası emniyette; koloniye düzenli ticaret gelir.'],
    odul: { bayrak: ['g_ticaret'], itibar: 15 },
  },
  g07: {
    adimlar: [
      A('direnc', 'Çekim alanına giriş', 'Bas uğultusu kabini titretiyor. Aşağı sürükleyip motoru geri itişte tut.', 'Yörüngede dengedesin.', { sure: 10 }),
      A('sonar', 'Kabuk çatlağını dinle', 'Basılı tut: sonar; tınlama farkından çatlak.', 'Çatlak bulundu.'),
      A('basinc', 'Rezonans darbesi', 'Matkap şarj oluyor. Alarmda iki parmakla çift dokun: sonik şok. Üç kez.', 'Kabuk büyük bir gümbürtüyle kırıldı.', { girdi: 'cift2' }),
      A('dron', 'Çekirdek parçasını dronla kap', 'İki parmağını ayır ya da iki parmakla yukarı kaydır: maden dronu.', 'Cımbız kollar metali kopardı.'),
    ],
    sonuc: ['Nötron-yoğun cevher dökümhanede: süper ağır zırh alaşımlarının yolu açık.'],
    odul: { kaynak: { notron_cevher: 10 }, itibar: 15 },
  },
  g08: {
    adimlar: [
      A('sonar', 'Sessiz pusu', 'Reaktör asgaride. Basılı tut: hidrofon dinler.', 'Uzakta zayıf motor tıklamaları.'),
      A('yaklas', 'Mesafeyi tahmin et', 'Tıklamalar hangi yandaysa oraya dön; dokunarak sessizce sokul.', 'Hayalet tam önünde.', { frek: 311, sessiz: true, mesafe: 40 }),
      A('nisan', 'İmpuls yaylımı', 'Hedef kayıyor. Önüne gelince yukarı hızla kaydır: EMP torpidosu.', 'Elektromanyetik inilti; düşman motoru sustu.', { n: 1 }),
    ],
    sonuc: ['Korsan tehdidi bitti. Hayalet avcının gizlenme teknolojisi tersanede: bir termal karartma modülü.'],
    odul: { parca: { mod_termal_karartma: 1 }, itibar: 15 },
  },
  // Cilt I, kategori C
  g09: {
    adimlar: [
      A('frekans', 'Nabız frekansını yakala', 'İki parmakla çevir: kristalin biyo-nabzının temposu.', 'Yumuşak, melodik bir ton.'),
      A('tut', 'Harmonik eşleme', 'Basılı tut: aynı frekansta ses dalgası.', 'Kabuk gevşedi.'),
      A('yaklas', 'Nazik yaklaşma', 'Dokunarak milim milim sokul.', 'Koza önünde.', { frek: 698, sessiz: true, mesafe: 25 }),
      A('kenetle', 'Kapsülleme', 'Çift dokun: kriyojenik kol.', 'Koza karantina hücresinde.'),
    ],
    sonuc: ['Biyo-kubbeye bilinmeyen bir kseno-yaşam formu; kseno-tıp araştırmaları sıçradı.'],
    odul: { bilim: 1, moral: 5, itibar: 15, kodeks: { id: 'yasam_kozasi', ad: 'Kristalize yaşam kozası', tarif: 'Kuyruklu yıldıza tutunmuş, kristal kabuklu canlı bir organizma.' } },
  },
  g10: {
    adimlar: [
      A('ton', 'Şifre tonlarını dinle ve geri çal', 'Basılı tut: kapı üç tonda yankı verir. Sonra geri çal: aşağı kaydır kalın, yukarı kaydır tiz, çift dokun orta.', 'Kilit ağır bir gıcırtıyla açıldı; antik atmosfer fısıldayarak kaçıyor.', { n: 3 }),
      A('dron', 'Keşif dronu', 'İki parmağını ayır ya da iki parmakla yukarı kaydır.', 'Dron holografik diskleri topladı.'),
    ],
    sonuc: ['Hiper-uzay motor şemaları ve galaktik koordinat arşivleri kütüphanede. Kadim disk üretimi kuantum laboratuvarında.'],
    odul: { bayrak: ['sema_kadim'], itibar: 20, kodeks: { id: 'tapinak_gemisi', ad: 'Taşlaşmış tapınak gemisi', tarif: 'Akustik kilitli kadim gemi; içinde hiper-uzay motor şemaları.' } },
  },
  g11: {
    adimlar: [
      A('kacin', 'Radyasyon dalgalarından kaçın', 'Siren yükselip zirveye varınca aşağı kaydır, asteroidin arkasına saklan.', 'Işın geçti.', { n: 3, yon: 'asagi' }),
      A('tut', 'Pulsar ritmini kaydet', 'Basılı tut: kayıt.', 'Tık-tık-tık kaydedildi.'),
      A('bosluk', 'Şifre boşluklarını doldur', 'Ritimdeki eksik vuruşun yerine dokun.', 'Şifre tamam.', { n: 3 }),
      A('kademeli', 'Acil sıçrama', 'İki parmakla yukarı hızla kaydır: hiper-sürücü!', 'Fırtınanın dışındasın.', { n: 1, yon: 'yukari' }),
    ],
    sonuc: ['Minyatür füzyon reaktörlerinin teorisi: bütün üretim yüzde on beş hızlandı.'],
    odul: { bayrak: ['g_fuzyon'], itibar: 20 },
  },
  g12: {
    adimlar: [
      A('direnc', 'Yarığın çekimine direnme', 'Emme sesi kabini sarsıyor; aşağı sürükleyip geri itişte tut.', 'Mesafe korunuyor.', { sure: 8 }),
      A('yaklas', 'Karadutunun sesini yakala', 'Yüksek frekanslı acil bipi iki kulakta eşitle, yaklaş.', 'Karadutu menzilde.', { frek: 1100, mesafe: 40 }),
      A('nisan', 'Manyetik zıpkın', 'Kutu titreşiyor; önüne gelince çift dokun: zıpkın.', 'Metalin metale çarpması; halat gerildi.', { n: 1 }),
      A('kademeli', 'Makara', 'İki parmakla aşağı kaydır, sar. Üç kez.', 'Kutu ambarda.', { n: 3, yon: 'asagi' }),
    ],
    sonuc: ['Yabancı filoların kriptolu haberleşme kodları koloni istihbaratında.'],
    odul: { bayrak: ['g_kripto'], itibar: 20 },
  },
  // Cilt II, kategori D
  g13: {
    adimlar: [
      A('yaklas', 'Sessiz yaklaşma', 'Motorlar kapalı; dokunarak kay. Cam tınlamalarını iki kulakta eşitle.', 'Kovanın önündesin.', { frek: 784, sessiz: true, mesafe: 40 }),
      A('frekans', 'Rezonans ritim eşleme', 'İki parmakla çevir: harmonik jeneratör kovanın ritmine.', 'Kilitlendi.'),
      A('tut', 'Barışçıl frekans yayını', 'Basılı tut: yumuşak piezo akımı.', 'Çıtırtılar melodik bir armoniye döndü.'),
      A('kenetle', 'Elçi', 'Çift dokun: Kithron elçisini steril bölmeye al.', 'Elçi gemide.'),
    ],
    sonuc: ['Kithron ile ilk ittifak. Elçinin mineroloji bilgisiyle doğudaki kuvars sütunları daha çok verir.'],
    odul: { bayrak: ['irk_temasi', 'irk_kithron'], kaynak: { kristal: 6 }, itibar: 25 },
  },
  g14: {
    adimlar: [
      A('yaklas', 'Parazit şamandırasını bul', 'İniltiler arasında tiz mekanik ciyaklamayı eşitle, yaklaş.', 'Şamandıra önünde.', { frek: 1500 }),
      A('kenetle', 'Şamandırayı sustur', 'Çift dokun: sonik darbe.', 'Tiz ses kesildi.'),
      A('tut', 'Sürüyü peşine tak', 'Basılı tut: biyo-çoban sireni.', 'Sürünün şarkısı görkemli bir koroya döndü.'),
      A('denge', 'Güvenli yörüngeye çekme', 'Yavaşça yukarı ya da aşağı sürükleyerek iki tonu birleştir: sürü rotada.', 'Sürü açık uzayda.', { eksen: 'dikey' }),
    ],
    sonuc: ['Vaelin sürüsünden hediye: saf biyolüminesans enzimleri ve atmosfer temizleyici sporlar.'],
    odul: { bayrak: ['irk_temasi'], kaynak: { kseno_spor: 6, foton_recinesi: 3 }, itibar: 25 },
  },
  g15: {
    adimlar: [
      A('yaklas', 'Görünmez gemiyi konumlandır', 'Kabindeki yerçekimi titreşiminin yönünü iki kulakta eşitle, yaklaş.', 'Bir şey önünde; göremiyorsun ama hissediyorsun.', { frek: 98 }),
      A('yaklas', 'Işık karartması', 'Fenerler kapalı. Dokunarak sessizce sokul.', 'Amiral gemisine değecek kadar yakınsın.', { frek: 98, sessiz: true, mesafe: 20 }),
      A('basinc', 'Çekirdeği besle', 'Yerçekimi plazması: basınç alarmında iki parmakla çift dokun. Üç kez.', 'Motor derin bir nefes gibi kükredi.', { girdi: 'cift2' }),
    ],
    sonuc: ['Nyxar filosu karanlık maddeye kayarken bir iletişim modülü bıraktı: karanlık madde zırh şemaları ve kolonide bir ticaret elçiliği.'],
    odul: { bayrak: ['irk_temasi', 'g_elcilik'], parca: { mod_obsidyen_zirh: 1 }, itibar: 25 },
  },
  g16: {
    adimlar: [
      A('yaklas', 'Mabede yaklaş', 'Yerçekimi halkasının uğultusunu eşitle, yaklaş.', 'Halkanın yanında.', { frek: 880 }),
      A('kenetle', 'Kenetlen', 'Çift dokun.', 'Kenetlendin.'),
      A('kademeli', 'Enerji hattını bağla', 'İki parmakla yukarı kaydır: reaktörden mabede güç.', 'Jeneratör kükreyerek uyandı.', { n: 1, yon: 'yukari' }),
      A('ton', 'Sibernetik şifre', 'Basılı tut: rahiplerin tonları. Sonra geri çal: aşağı kalın, yukarı tiz, çift dokun orta.', 'Kütüphane kilitleri açıldı.', { n: 4 }),
      A('tut', 'Arşivi kopyala', 'Basılı tut: karadutuya aktarım.', 'Yıldız haritaları ve kuantum teorileri gemide.'),
    ],
    sonuc: ['Kıdemli bir Oron bilgini akademiye katıldı; enerji santrallerinin verimi arttı (üretim hızlandı).'],
    odul: { bayrak: ['irk_temasi', 'g_oron'], bilim: 1, itibar: 25 },
  },
  // Kategori E
  g17: {
    adimlar: [
      A('denge', 'Atmosfere giriş', 'Kabin kavruluyor. Sağa sola hafifçe sürükle: iki ton birleşince hücum açısı doğru.', 'Atmosferin altındasın.', { eksen: 'yatay' }),
      A('sonar', 'Magmanın üstünde sabitlen', 'Basılı tut: lavların kaynaması tam altında mı?', 'Motorlar sabit; lav tam altında.'),
      A('dron', 'Maden sondasını bırak', 'İki parmağını ayır ya da iki parmakla yukarı kaydır.', 'Sonda lava daldı; kristali yakaladı.'),
      A('kademeli', 'Acil kalkış', 'İki ya da üç parmakla yukarı kaydır: sondayı çek, tam güç!', 'Gezegenin çekiminden fırladın.', { n: 1, yon: 'yukari' }),
    ],
    sonuc: ['Volkanik çekirdek kristalleri: dökümhanede en üst sınıf kruvazör gövdeleri ve süper ağır zırh.'],
    odul: { kaynak: { notron_cevher: 10 }, bayrak: ['sema_kompozit'], itibar: 20 },
  },
  g18: {
    adimlar: [
      A('denge', 'Fırtınada iniş', 'Tipide alçalıyorsun; yukarı aşağı sürükleyip iki tonu birleştir.', 'Karlı yüzeye oturdun.', { eksen: 'dikey' }),
      A('tut', 'Buz delme', 'Basılı tut: sonik delici.', 'Delik açıldı.'),
      A('dron', 'Yeraltı odasına sız', 'İki parmağını ayır: dron aşağı.', 'Dron metal kapının kilidini çözdü.'),
      A('kademeli', 'Örnekleri al', 'İki parmakla aşağı kaydır, iki kez.', 'Donmuş tohumlar ambarda.', { n: 2, yon: 'asagi' }),
    ],
    sonuc: ['Soğuğa ve kuraklığa dayanıklı bitki genetiği: tarım güvencede, nüfus daha hızlı büyür.'],
    odul: { kaynak: { tohum: 5 }, bayrak: ['g_tarim'], itibar: 20 },
  },
  g19: {
    adimlar: [
      A('kacin', 'Enkaz halkasına giriş', 'Dönen parçalar! Sürtünme sesi bir yandan gelince ters yana kaydır.', 'Halkanın içindesin.', { n: 3 }),
      A('yaklas', 'Yapay biyomu bul', 'Rüzgâr ve kuş cıvıltısı gibi sesleri eşitle, yaklaş.', 'Biyomlu parça önünde.', { frek: 659 }),
      A('basinc', 'Atmosferik sondaj', 'Gaz pompaları: basınç alarmında çift dokun. Üç kez.', 'Antik atmosfer tanklarda.'),
      A('dron', 'Ekolojik numune', 'İki parmağını ayır: dronlar.', 'Kadim toprak ve kseno-çiçek tohumları alındı.'),
    ],
    sonuc: ['Terraforming hızlandı: antik atmosfer ve tohumlar yerel katmanlar için koloniye.'],
    odul: { kaynak: { kseno_spor: 4, tohum: 3 }, itibar: 20 },
  },
  g20: {
    adimlar: [
      A('denge', 'Ağaç tepelerine iniş', 'Nemli rüzgârda yukarı aşağı sürükleyip iki tonu birleştir.', 'Taşlık alana indin.', { eksen: 'dikey' }),
      A('dron', 'Roveri yolla', 'İki parmağını ayır ya da iki parmakla yukarı kaydır.', 'Rover çamurda ilerliyor... İmdat çağrısı!'),
      A('tut', 'Kökleri yak', 'Basılı tut: plazma kesici.', 'Kökler çatırdayarak yandı.'),
      A('kademeli', 'Ekibi vinçle çek', 'İki ya da üç parmakla yukarı kaydır, iki kez.', 'Bilim ekibi hangarda.', { n: 2, yon: 'yukari' }),
    ],
    sonuc: ['Kurtarılan botanikçiler koloniye katıldı; panzehirleri zehirli bölgelerde maruziyeti azaltır.'],
    odul: { nufus: 4, bayrak: ['g_panzehir'], itibar: 20 },
  },
  // Kategori F
  g21: {
    adimlar: [
      A('yaklas', 'Parçalanan istasyona yaklaş', 'Metalik feryatlar arasında tahliye iskelesinin fenerini eşitle, yaklaş.', 'İskeledesin.', { frek: 349 }),
      A('kenetle', 'Manyetik hava kilidi', 'Çift dokun: tahliye körüğü.', 'Körük vakumla mühürlendi.'),
      A('frekans', 'İç kapıların şifresi', 'İki parmakla çevir: rezonans frekansı.', 'Kapılar patladı; siviller koşuyor.'),
      A('kademeli', 'Acil kopma', 'Reaktör alarmı! İki parmakla aşağı hızla kaydır: körüğü at, kaç!', 'İstasyon arkanızda patladı.', { n: 1, yon: 'asagi' }),
    ],
    sonuc: ['Binlerce sivil madenci ve mühendis "Yeni Yuva" mahallelerine yerleşti; iş gücü ve tersane kapasitesi büyüdü.'],
    odul: { nufus: 30, barinma: 30, tersane: 2, itibar: 40 },
  },
  g22: {
    adimlar: [
      A('kademeli', 'Pusu alanına dalış', 'İki parmakla yukarı kaydır: hiper-uzaydan çık!', 'Kalkanlar lazerle dövülüyor.', { n: 1, yon: 'yukari' }),
      A('kacin', 'Gövde ile siper ol', 'Atışlar bir yandan gelince ters yana kaydır.', 'Konvoy arkanda güvende.', { n: 4 }),
      A('tut', 'Ağı parçala', 'Basılı tut: EMP yaylımı.', 'Ağ çıtırdayarak dağıldı.'),
      A('frekans', 'Konvoya eskort', 'İki parmakla çevir ya da sağa sola kaydır: konvoyun hızına senkron.', 'Güvenli sıçrama koordinatı.'),
    ],
    sonuc: ['Tüccarlar nadir elektronikleri, nano-işlemcileri ve ticaret izinlerini koloniye devretti.'],
    odul: { parca: { mikrocip: 60 }, bayrak: ['g_ticaret'], itibar: 30 },
  },
  g23: {
    adimlar: [
      A('sonar', 'Biyo-tarama', 'Basılı tut: yaşam sinyalleri ve patojen vızıltısı.', 'On iki zayıf kalp atışı.'),
      A('yaklas', 'Hava kilidine yanaş', 'Kilidin bipini eşitle, yaklaş.', 'Kenetlendin.', { frek: 440 }),
      A('basinc', 'Dekontaminasyon gazı', 'Plazma gazı: basınç alarmında çift dokun. Üç kez.', 'Sporlar çıtırdayarak yandı.'),
      A('kademeli', 'Yaralıların tahliyesi', 'İki parmakla aşağı kaydır, her sedye için. Üç kez.', 'Kazazedeler karantinada.', { n: 3, yon: 'asagi' }),
      A('nisan', 'Gövdeyi mühürle', 'Uzaklaştın. Enfekte gövde önüne gelince çift dokun: plazma topu.', 'Hastane gemisi yok edildi.', { n: 1 }),
    ],
    sonuc: ['Askeri doktorlar ve kseno-tıp uzmanları kolonide bölge hastanesini kurabilir (tesis listesinde).'],
    odul: { bayrak: ['g_hekimler'], nufus: 4, itibar: 30 },
  },
  g24: {
    adimlar: [
      A('direnc', 'Gelgit çizgisinde denge', 'Bas kükreme kabini sarsıyor; aşağı sürükleyip motoru sınırda tut.', 'Gelgit çizgisinde dengedesin.', { sure: 12 }),
      A('yaklas', 'Yavaşlayan sinyali yakala', 'Ağır çekim telsiz sesini eşitle, yaklaş.', 'Firkateyn menzilde.', { frek: 147, mesafe: 50 }),
      A('nisan', 'Çekici halat', 'Önüne gelince çift dokun: yerçekimi zıpkını.', 'Halat kilitlendi, gerilerek inliyor.', { n: 1 }),
      A('kademeli', 'Kuantum itkiyle geri çek', 'İki parmakla yukarı kaydır: aşırı yükleme!', 'İki gemi olay ufkundan koptu.', { n: 1, yon: 'yukari' }),
    ],
    sonuc: ['Aethelis-IV galakside resmî tarafsız barış ve müzakere bölgesi ilan edildi; bütün büyük güçlerin koruması ve ticari desteği koloninin.'],
    odul: { bayrak: ['g_tarafsiz', 'g_ticaret'], moral: 10, itibar: 60 },
  },
};

// --- Fenomen gözlemleri ve gezegen keşifleri (veri/gozlem.js) operasyon olarak ---
import { kuleMenzili } from '../binalar';
import { FENOMENLER, GEZEGENLER, GOZLEM_DONANIMLARI, INIS_ARACLARI } from './gozlem';
const GEZEGEN_SALONU = { p03: 'biyoloji', p04: 'biyoloji', p12: 'biyoloji', p13: 'biyoloji', p19: 'biyoloji', p09: 'tarih', p17: 'tarih', p14: 'anomali', p18: 'anomali' };
const OZEL_ADIM = {
  lidar: A('tut', 'Lidar taraması', 'Basılı tut: kseno-lidar nesnenin dış hatlarını tarar.', 'Morfoloji kaydı tamam.'),
  ritim: A('ritim', 'Ritim eşleme', 'Sütunun tıkırtısıyla aynı ritimde üç kez dokun.', 'Ritim eşlendi.', { n: 3 }),
  denge: A('denge', 'Gravite dengesi', 'Sağa sola sürükleyerek iki tonu birleştir ve tut.', 'Gravite dengede.', { eksen: 'yatay' }),
  fiske: A('kademeli', 'Hızlı fiske', 'Yarıklar bir belirip kayboluyor. Yukarı hızlıca kaydır: anlık pozlama.', 'Yarık yakalandı.', { n: 1, yon: 'yukari', parmak: 1 }),
};
for (const id of Object.keys(FENOMENLER)) {
  const f = FENOMENLER[id];
  OPERASYONLAR[id] = {
    fenomen: true,
    adimlar: [
      A('sonar', 'Akustik vizör', 'Basılı tut: vizör açılır, motorlar kısılır, hedefin saf sesi kulaklarına dolar.', f.imza),
      A('frekans', 'Odak ve netleme', 'İki parmakla çevir: bulanık ses kristal bir akora dönüşene dek.', 'Odak kilitlendi.'),
      f.ozel ? OZEL_ADIM[f.ozel] : A('tut', 'Pozlama ve spektrografi', 'Basılı tut: spektrometrenin lazer taraması üç saniye sürer.', 'Spektrogram tamam.'),
      A('kenetle', 'Deklanşör', 'Ses doruğa vardı: çift dokun.', 'Kozmik izdüşüm kaydedildi.', { ses: 'el_deklansor' }),
      A('kademeli', 'Veri paketini ışınla', 'Yukarı hızlıca kaydır: gözlem paketi hiper-dalgayla Gözlemevi\'ne.', 'Paket Aethelis-IV\'e ulaştı.', { n: 1, yon: 'yukari', parmak: 1 }),
    ],
    sonuc: [f.ad + ' Evren Kütüphanesi\'nde.', 'Kütüphane kaydı: ' + f.kayit, 'Gözlemcilerin tepkisi: ' + f.tepki, 'Evren itibarı +' + f.itibar + '.'],
    odul: { ...f.etki, itibar: f.itibar, kodeks: { id, ad: f.ad, tarif: f.kayit + ' ' + f.imza, salon: f.salon, frek: f.frek } },
  };
}
const gezNo = (id) => Number(id.slice(1));
const modulVar = (d, id) => !!((d.gemi && d.gemi.moduller[id]) || (d.koloni.parcalar && (d.koloni.parcalar['mod_' + id] > 0 || d.koloni.parcalar[id] > 0)));
export const gezHalka = (id) => { const n = gezNo(id); return n <= 6 ? 2 : n <= 12 ? 3 : n <= 18 ? 4 : 5; };
for (const id of Object.keys(GEZEGENLER)) {
  const p = GEZEGENLER[id];
  const adimlar = [
    A('frekans', 'Yörünge spektrometresi', 'Yörüngedesin. ' + p.akustik + ' İki parmakla çevir: atmosferin vızıltısı en saf tona gelsin.', 'Atmosfer bileşimi kaydedildi.'),
    A('tut', 'Rezonans fotoğrafı', p.gozlem + ' Basılı tut: deklanşör.', 'Flaş darbesi ve kristal kayıt sesi: fotoğraf alındı.'),
    A('kenetle', 'İniş', 'Çift dokun: iniş mekiği atmosfere dalar.', 'Alev kükremesi, hava frenlerinin tıslaması.'),
  ];
  if (p.denge) adimlar.push(A('denge', 'Atmosferde denge', 'Kabin kavruluyor; sağa sola sürükleyip iki tonu birleştir.', 'Yüzeye indin.', { eksen: 'yatay' }));
  adimlar.push(
    A('yaklas', p.poi1, INIS_ARACLARI[p.arac].ad + ' yüzeyde. ' + p.poi1 + ' yönündeki sesi iki kulakta eşitle, yukarı kaydırıp sür.', p.poi1 + ' önündesin.', { frek: p.frek, mesafe: 40 }),
    A('yaklas', p.poi2, p.poi2 + ' yönündeki sesi eşitle, sür.', p.poi2 + ' önündesin.', { frek: Math.round(p.frek * 1.5), mesafe: 40 }),
    A('dron', 'Numune kolu', 'İki parmakla çift dokun: robotik kol ya da emme ağzı uzanır.', 'Kol yerinde.'),
    A('kademeli', 'Sondajı sapla', 'Aşağı hızlıca kaydır: lazer matkap kayaya saplanır.', 'Matkap saplandı.', { n: 1, yon: 'asagi', parmak: 1 }),
    A('tut', 'Numuneyi al', p.numune + ' Basılı tut.', 'Numune depoya istiflendi: ' + p.numuneAd + '.'),
  );
  OPERASYONLAR[id] = {
    gezegen: true,
    // İnişten (kenetle adımının ardından) görev bitene kadar yüzeyin ortam sesi çalar
    ortam: 'ortam_gez_' + id,
    ortamAdim: adimlar.findIndex((x) => x.tur === 'kenetle') + 1,
    adimlar,
    sonuc: [p.ad + ' keşfedildi; numune: ' + p.numuneAd + '.', 'Kodeks ve koloni kazanımı: ' + p.kazanim, 'Evren itibarı +' + p.itibar + '.'],
    odul: { ...p.etki, itibar: p.itibar, kodeks: { id, ad: p.ad + ', ' + p.sinifi, tarif: p.akustik + ' ' + p.kazanim, salon: GEZEGEN_SALONU[id] || 'astrofizik', frek: p.frek } },
  };
  G_NOKTALARI[id] = {
    ad: p.ad + ' (' + p.sinifi.toLowerCase() + ')', x: p.x, y: p.y, frek: p.frek, sinif: 2, poi: id,
    gorev: 'Gezegen keşfi: ' + p.ad,
    tehlike: p.akustik,
    hedef: 'Yörüngeden spektrum ve fotoğraf; ' + p.poi1 + ' ve ' + p.poi2 + '; numune: ' + p.numuneAd + '.',
    gerekli: ['spektrometre', 'kamera', p.arac].map((k) => ({ katman: k, ad: (GOZLEM_DONANIMLARI[k] || INIS_ARACLARI[k]).ad })),
    // Dinleme kulesinin menzili halkayı açar (v4 25 bina belgesi, madde 21): halka 1-2 kule, 3 anten + çözücü, 4-5 komuta + arşivleyici
    acKosul: (d) => !!d.gemi && kuleMenzili(d, modulVar) >= gezHalka(id) && !!(d.gemi.moduller.spektrometre || d.gemi.moduller.kamera || (d.filo || []).length) && (d.tamamlananOp || []).length >= Math.floor((gezNo(id) - 1) * 0.6),
  };
}
