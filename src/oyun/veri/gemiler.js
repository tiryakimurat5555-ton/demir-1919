// Gemi sınıfları, odaları, montaj aşamaları ve modül katmanları (belgeler/araclar-ve-gemi-filosu.md bölüm 1.2, 2, 5;
// uzay-oyunu-tasarim-ve-senaryo.md bölüm 3). Saf veri.
//
// Montaj malzemeleri belgedeki miktarlarla (ör. Kademe 2: 350 güçlendirilmiş alaşım, 120 şasi çeliği, 80 saf kristal,
// 60 litre plazma yakıtı, 1 plazma füzyon reaktörü). kizak: gereken tersane kızağı kademesi (Kademe I: izcilik ve
// korvet; Kademe II Manyetik Beşik: fırkateyn ve lojistik kruvazörü; Kademe III Hisar: sancak zırhlısı).
// Odaların ortam sesleri belge bölüm 5'e göre: köprü telsiz ve bip; reaktör derin kükreme ve ritmik titreşim;
// revir monitör bipleri ve steril hava; kargo geniş alan yankısı ve manyetik kilit çıtırtısı.

const oda = (id, ad, ortam, gorevYeri, tarif) => ({ id, ad, ortam, gorevYeri, tarif });

export const GEMI_SINIFLARI = {
  1: {
    ad: 'Kıvılcım',
    sinif: 'Hafif İzcilik Firkateyni',
    rol: 'Hızlı keşif, sinyal takibi, tekil kurtarma ve acil durum kuryeliği.',
    ses: 'İnce, yüksek devirli bir türbin vızıltısı; hızlandıkça tizleşen hafif bir ıslık.',
    motor: 'turbin',
    kizak: 1,
    govde: 100,
    kalkan: 0,
    yakit: { parca: 'itki_yakiti', tank: 25 },
    uygunluk: 'Yakın uzay görevleri, sinyal rölesi onarımları (G-01, G-03).',
    odalar: [
      oda('kokpit', 'Kokpit ve seyrüsefer istasyonu', 'ortam_kokpit', 'Telsiz Subayı', 'Pilot koltuğu, radyo dalgası alıcıları, dokunsal itki kolları ve dış ses hidrofonları. Telsiz cızırdıyor, göstergeler bipliyor.'),
      oda('kargo', 'Kompakt kargo ve acil durum ranzası', 'ortam_kargo', 'İkmal Subayı', 'İki kişilik acil yaşam alanı, ilk yardım dolabı ve küçük bir numune kasası. Sesin metal duvarlardan yankılanıyor.'),
    ],
    montaj: [
      { id: 'govde', ad: 'Omurga ve gövde iskeleti', gerek: { plaka: 150 }, vinc: true, kaynak: 90, parca: 'iskelet kirişleri' },
      { id: 'kokpit', ad: 'Kokpit ve kablo demeti', gerek: { kablo: 40 }, vinc: true, kaynak: 60, parca: 'basınçlı kokpit kabuğu' },
      { id: 'reaktor', ad: 'Minyatür iyon reaktörü', gerek: { iyon_reaktoru: 1 }, vinc: true, kaynak: 60, parca: 'reaktör çekirdeği' },
      { id: 'itki', ad: 'İtki hattı ve yakıt dolumu', gerek: { itki_yakiti: 25 }, vinc: false, kaynak: 30, parca: 'yakıt hattı' },
    ],
  },
  2: {
    ad: 'Rüzgarkıran',
    sinif: 'Ağır Keşif ve Madencilik Korveti',
    rol: 'Asteroit kuşağı madenciliği, enkaz sökümü, derin uzay numune toplama.',
    ses: 'Tok, mekanik bir ritimle çalışan çift pistonlu itki homurtusu; ambar doldukça kalınlaşır.',
    motor: 'piston',
    kizak: 1,
    govde: 250,
    kalkan: 0,
    yakit: { parca: 'plazma_yakiti', tank: 60 },
    uygunluk: 'Asteroit parçalama, maden hasadı (G-02, G-07).',
    odalar: [
      oda('pilotaj', 'Pilotaj ve sensör istasyonu', 'ortam_kokpit', 'Telsiz Subayı', 'İki kişilik operasyon kabini; sonar ekranı ve maden frekans analizörü.'),
      oda('makine', 'Makine ve soğutma dairesi', 'ortam_reaktor', 'Başçarkçı', 'Plazma reaktörünün bulunduğu, boruların hafifçe tısladığı sıcak mühendislik odası.'),
      oda('ambar', 'Ağır maden ve kargo ambarı', 'ortam_kargo', 'İkmal Subayı', 'Manyetik sabitleme kilitleri olan, kırılan kayaçların ve metal plakaların istiflendiği geniş ambar.'),
      oda('yasam', 'Yaşam ve karantina kabini', 'ortam_revir', 'Başhekim', 'Dört kişilik ranzalı dinlenme alanı, sentetik gıda sentezleyicisi ve biyolojik temizleme duşu.'),
    ],
    montaj: [
      { id: 'govde', ad: 'Güçlendirilmiş alaşım gövde', gerek: { guclu_alasim: 350 }, vinc: true, kaynak: 150, parca: 'gövde kesitleri' },
      { id: 'sasi', ad: 'Şasi ve maden kolları', gerek: { sasi_celigi: 120 }, vinc: true, kaynak: 120, parca: 'şasi kirişleri' },
      { id: 'sensor', ad: 'Piezo-kristal sensör ve rezonans dizisi', gerek: { saf_kristal: 80 }, vinc: true, kaynak: 90, parca: 'sensör dizisi' },
      { id: 'reaktor', ad: 'Standart plazma füzyon reaktörü', gerek: { plazma_reaktoru: 1 }, vinc: true, kaynak: 120, parca: 'füzyon reaktörü' },
      { id: 'itki', ad: 'Plazma yakıt dolumu', gerek: { plazma_yakiti: 60 }, vinc: false, kaynak: 45, parca: 'yakıt hattı' },
    ],
  },
  3: {
    ad: 'Aethel Muhafızı',
    sinif: 'Taktik Firkateyn ve Bilim Kruvazörü',
    rol: 'Sınır devriyesi, korsan önleme, kseno-biyolojik saha araştırmaları ve diplomatik eskort.',
    ses: 'Dengeli, pürüzsüz bir manyetik uğultu; silahlar ve kalkanlar şarj olunca rezonant bir tınlama.',
    motor: 'manyetik',
    kizak: 2,
    govde: 500,
    kalkan: 100,
    yakit: { parca: 'graviton_yakiti', tank: 40 },
    uygunluk: 'Bilim anomalileri, kseno-temaslar, korsan çatışmaları (G-05, G-08, G-09, Vaka 1, Vaka 2).',
    odalar: [
      oda('kopru', 'Merkezi köprüüstü', 'ortam_kokpit', 'Telsiz Subayı', 'Kaptan koltuğu, taktik harita masası, haberleşme subayı ve seyrüseferci istasyonları.'),
      oda('guc', 'Reaktif güç çekirdeği', 'ortam_reaktor', 'Başçarkçı', 'Yüksek voltajlı plazma jeneratörü ve manyetik muhafaza bobinleri.'),
      oda('lab', 'Biyo-karantina ve Ar-Ge laboratuvarı', 'ortam_revir', 'Başhekim', 'Uzaydan getirilen kseno-kozaların ve yabancı dokuların incelendiği steril cam hücreler.'),
      oda('silah', 'Taktik silah ve torpido dairesi', 'ortam_reaktor', 'Taktik Nişancı', 'EMP torpido yükleme mekanizmaları ve hisar lazer kondansatörleri.'),
      oda('kogus', 'Mürettebat koğuşu ve revir', 'ortam_revir', 'Başhekim', 'Sekiz kişilik personel alanı, otomatik cerrahi yatak ve dekontaminasyon odası.'),
      oda('kargo', 'Basınç korumalı kargo bölümü', 'ortam_kargo', 'İkmal Subayı', 'Patlayıcı gazların ya da hassas antik veri disklerinin saklandığı yalıtımlı ambar.'),
    ],
    montaj: [
      { id: 'govde', ad: 'Zırhlı şasi ve titanyum plaka gövde', gerek: { zirhli_plaka: 700 }, vinc: true, kaynak: 200, parca: 'zırh kesitleri' },
      { id: 'iletken', ad: 'Kseno-alaşım ve iletken kristal ağı', gerek: { kseno_alasim: 250 }, vinc: true, kaynak: 150, parca: 'iletken ağ' },
      { id: 'sogutma', ad: 'Helyum soğutma sistemi', gerek: { helyum: 120 }, vinc: true, kaynak: 120, parca: 'soğutma blokları' },
      { id: 'kalkan', ad: 'Ağır korvet sınıfı kalkan projektörü', gerek: { kalkan_projektoru: 1 }, vinc: true, kaynak: 150, parca: 'kalkan projektörü' },
      { id: 'itki', ad: 'Graviton yakıt dolumu', gerek: { graviton_yakiti: 40 }, vinc: false, kaynak: 60, parca: 'yakıt hattı' },
    ],
  },
  4: {
    ad: 'Gökdelen',
    sinif: 'Ağır Nakliye ve Lojistik Devi',
    rol: 'Kitlesel mülteci tahliyesi, yüzey araçları nakliyesi, gezegenler arası ağır inşaat lojistiği.',
    ses: 'Çok derin bas frekansında, gövdeyi titreten devasa hidrolik iniltiler ve ağır hava kilidi sesleri.',
    motor: 'bas',
    kizak: 2,
    govde: 1000,
    kalkan: 150,
    yakit: { parca: 'graviton_yakiti', tank: 80 },
    uygunluk: 'Mülteci kurtarma, gezegen tahliyeleri, üs kurma (Vaka 7, Vaka 8, K-03, K-04).',
    odalar: [
      oda('kopru', 'Yüksek idare köprüsü', 'ortam_kokpit', 'Telsiz Subayı', 'Geniş açılı sensör konsolları ve konvoy seyrüsefer masası.'),
      oda('reaktor', 'Çift çekirdekli reaktör dairesi', 'ortam_reaktor', 'Başçarkçı', 'İki senkronize füzyon jeneratörü ve ağır soğutma boruları.'),
      oda('lojistik', 'Lojistik ambarı', 'ortam_kargo', 'İkmal Subayı', 'Yüzlerce ton mineral ve konteyner taşıyan vinçli devasa kargo salonu.'),
      oda('hangar', 'Dahili araç hangarı', 'ortam_kargo', 'İkmal Subayı', 'İki yüzey aracının park edildiği ve tamir edildiği zırhlı garaj.'),
      oda('revir', 'Kapsamlı revir ve kriyojenik koğuş', 'ortam_revir', 'Başhekim', 'Ağır yaralıların tedavi edildiği, on altı stasis kapsüllü tıbbi merkez.'),
      oda('kseno', 'Kseno-adaptasyon odası', 'ortam_revir', 'Başhekim', 'Metan, silikat gibi farklı atmosferlerde yaşayan ırklar için gaz ayarlı bölme.'),
      oda('bakim', 'Mühendislik ve bakım koridoru', 'ortam_reaktor', 'Başçarkçı', 'Yedek parçalar, torna tezgâhları ve kaynak robotları.'),
      oda('karadutu', 'Karadutu ve veri arşivi', 'ortam_kokpit', 'Telsiz Subayı', 'Şifreli askeri ve seyrüsefer kayıtlarının saklandığı korumalı kasa odası.'),
    ],
    montaj: [
      { id: 'govde', ad: 'Ağır titanyum-kompozit zırh blokları', gerek: { kompozit_blok: 1500 }, vinc: true, kaynak: 300, parca: 'zırh blokları' },
      { id: 'matris', ad: 'Nötron-yoğun çelik ve kristal matris', gerek: { notron_matris: 450 }, vinc: true, kaynak: 240, parca: 'matris kafesi' },
      { id: 'sogutma', ad: 'Helyum soğutma blokları', gerek: { helyum: 300 }, vinc: true, kaynak: 180, parca: 'soğutma blokları' },
      { id: 'bobin', ad: 'Çift hatlı ağır hiper-sürücü bobinleri', gerek: { hiper_bobin: 2 }, vinc: true, kaynak: 240, parca: 'hiper-sürücü bobini' },
      { id: 'itki', ad: 'Graviton yakıt dolumu', gerek: { graviton_yakiti: 80 }, vinc: false, kaynak: 90, parca: 'yakıt hattı' },
    ],
  },
  5: {
    ad: 'Hisar-ı Kadim',
    sinif: 'Süper Ağır Sancak Zırhlısı ve Filo Karargâhı',
    rol: 'Topyekûn sistem savunması, derin uzay harekât karargâhı, bağımsız medeniyet gemisi.',
    ses: 'Uzay boşluğunda bile hissedilen kütleçekim uğultusu, hisar bataryalarının hidrolik kilitlenme yankıları ve uzaktan gelen rezonans çanları.',
    motor: 'kutle',
    kizak: 3,
    govde: 2500,
    kalkan: 400,
    yakit: { parca: 'graviton_yakiti', tank: 250 },
    uygunluk: 'Galaktik savaşlar, kara delik operasyonları, kadim koruyucu karşılaşmaları (Vaka 8, Vaka 9, K-08).',
    odalar: [
      oda('amiral', 'Merkezi amiral köprüsü', 'ortam_kokpit', 'Telsiz Subayı', 'Filo komuta masası, hologram simülatörleri ve amiral koltuğu.'),
      oda('batarya', 'Hisar ağır batarya kontrol odası', 'ortam_reaktor', 'Taktik Nişancı', 'Plazma toplarının, iyon fırlatıcılarının ve EMP kalkanlarının ateşleme odası.'),
      oda('cekirdek', 'Kuantum graviton reaktör çekirdeği', 'ortam_reaktor', 'Başçarkçı', 'Kendi minyatür yerçekimini üreten, izole dev enerji kalbi.'),
      oda('hangar', 'Fırlatma hangarları', 'ortam_kargo', 'İkmal Subayı', 'Dron filolarının ve iki hafif mekiğin fırlatılıp indiği basınçlı uçuş koridoru.'),
      oda('enstitu', 'İleri kseno-bilim enstitüsü', 'ortam_revir', 'Başhekim', 'Antik kalıntıların deşifre edildiği, biyo-kapsüllerin incelendiği araştırma kompleksi.'),
      oda('cerrahi', 'Tam donanımlı cerrahi revir', 'ortam_revir', 'Başhekim', 'Ameliyathaneler, genetik restorasyon kabinleri ve yoğun bakım.'),
      oda('multeci', 'Mülteci ve yolcu yaşam sektörü', 'ortam_revir', 'İkmal Subayı', 'Farklı ırkların kendi yerçekimi ve ikliminde yaşadığı modüler bloklar.'),
      oda('hucre', 'Güvenlik ve hücre bölümü', 'ortam_kargo', 'Taktik Nişancı', 'Korsanların ya da kseno-tehditlerin tutulduğu manyetik kilitli hücreler.'),
      oda('harekat', 'Stratejik harekât dairesi', 'ortam_kokpit', 'Telsiz Subayı', 'Galaktik haritaların, diplomatik kriptoların işlendiği oda.'),
      oda('otoyol', 'Gövde içi makine otoyolları', 'ortam_reaktor', 'Başçarkçı', 'Ağır yedek parçaların taşındığı raylı lojistik tünelleri.'),
      oda('hidroponik', 'Hidroponik yaşam kubbesi', 'ortam_revir', 'Başhekim', 'Uzun seferlerde taze oksijen ve besin sağlayan sera koridoru.'),
      oda('kalkan', 'Dış kalkan ve savunma rezonans odası', 'ortam_reaktor', 'Başçarkçı', 'Üç katmanlı manyetik iyon kubbesini besleyen jeneratör odası.'),
    ],
    montaj: [
      { id: 'govde', ad: 'Nötron takviyeli süper alaşım plakaları', gerek: { super_alasim: 3500 }, vinc: true, kaynak: 400, parca: 'süper alaşım plakaları' },
      { id: 'kristal', ad: 'Kadim kseno-kristal ve optik şifreleme diskleri', gerek: { kadim_disk: 1200 }, vinc: true, kaynak: 300, parca: 'kristal diskler' },
      { id: 'sogutma', ad: 'Endüstriyel helyum reaktör tüpleri', gerek: { helyum: 800 }, vinc: true, kaynak: 240, parca: 'reaktör tüpleri' },
      { id: 'cekirdek', ad: 'Dört kuantum rezonans çekirdeği', gerek: { kuantum_cekirdek: 4 }, vinc: true, kaynak: 300, parca: 'kuantum çekirdeği' },
      { id: 'itki', ad: 'Saf graviton yakıt dolumu', gerek: { graviton_yakiti: 250 }, vinc: false, kaynak: 120, parca: 'yakıt hattı' },
    ],
  },
};

// Modüler montaj katmanları: her biri belirli uzay görevlerinin zorunlu donanımıdır
export const MODUL_KATMANLARI = [
  { id: 'burun', ad: 'Ön Burun', modul: 'Sensör Dizilimi ve Kripto-Anten' },
  { id: 'komuta', ad: 'Komuta Katı', modul: 'Basınçlı Kokpit ve Askeri Karadutu' },
  { id: 'govde', ad: 'Ana Gövde', modul: 'Lamine Titanyum Zırh ve Basınç Perdeleri' },
  { id: 'bolme_a', ad: 'İç Bölme A', modul: 'Biyo-Karantina ve Plazma Dekontaminasyon' },
  { id: 'bolme_b', ad: 'İç Bölme B', modul: 'Yüksek Hacimli Optik Kripto-Bellek' },
  { id: 'makine', ad: 'Makine Dairesi', modul: 'Kararlı Graviton Reaktörü ve Soğutma' },
  { id: 'tahrik', ad: 'Tahrik Hattı', modul: 'Kuantum Rezonans Sürücüsü ve İyon Motoru' },
  { id: 'dis_a', ad: 'Dış Donanım A', modul: 'Manyetik Çekici Kiriş' },
  { id: 'dis_b', ad: 'Dış Donanım B', modul: 'Ağır Hisar Savunma Topları ve Torpidolar' },
];

// Sınıfa göre takılabilen katmanlar (bölmeler büyüdükçe artar)
export const SINIF_KATMANLARI = {
  1: ['burun', 'govde'],
  2: ['burun', 'komuta', 'govde', 'makine', 'dis_a'],
  3: ['burun', 'komuta', 'govde', 'bolme_a', 'makine', 'tahrik', 'dis_a', 'dis_b'],
  4: ['burun', 'komuta', 'govde', 'bolme_a', 'bolme_b', 'makine', 'tahrik', 'dis_a'],
  5: ['burun', 'komuta', 'govde', 'bolme_a', 'bolme_b', 'makine', 'tahrik', 'dis_a', 'dis_b'],
};

// Yüzey ve destek araçları (bölüm 3). maliyet: araç hangarında üretim girdisi (belgedeki miktarlar).
// v4 gemiler-araclar-ve-filo-sistemi.txt bölüm 1-2: Sınıf I-III yüzeye iner ve dışarıda bir modüler alt kızak taşır;
// Sınıf IV-V yörüngede kalır, iç hangarına birkaç araç ve Atmosphere-X alır. kisi: barındırdığı mürettebat.
export const TASIMA = {
  1: { yorunge: false, arac: 1, kisi: 2, ad: 'harici alt kızak (Akrep dronu)', yalniz: ['akrep'] },
  2: { yorunge: false, arac: 1, kisi: 4, ad: 'harici alt kızak (Çöl Tilkisi ya da Akrep)', yalniz: ['col_tilkisi', 'akrep'] },
  3: { yorunge: false, arac: 1, kisi: 8, ad: 'alt kızak (bir yüzey aracı ya da Atmosphere-X)' },
  4: { yorunge: true, arac: 3, kisi: 16, ad: 'dahili araç hangarı (iki ağır araç ve bir Atmosphere-X)' },
  5: { yorunge: true, arac: 7, kisi: 50, ad: 'uçuş güvertesi (dört araç, iki Atmosphere-X ve dron filosu)' },
};

export const ARACLAR = {
  col_tilkisi: {
    ad: 'Çöl Tilkisi',
    tip: 'Manyetik yastıklı hafif keşif skimmer\'ı',
    ses: 'Yüksek frekanslı manyetik vızıltı, sürtünmesiz kayma sesi.',
    tarif: 'Engebeli arazide ve zehirli bataklıkların üstünde temas etmeden hızla kayar. Yüzey sonarı radarı uzatır.',
    motor: 'hover',
    hiz: 2.6,
    zehir: 0.4,
    radar: 1.4,
  },
  mammoth: {
    ad: 'Mammoth',
    tip: 'Sekiz paletli ağır kaya kırıcı ve sondaj tankı',
    ses: 'Çelik paletlerin kayaları ezmesi, hidrolik matkabın yeri sarsan gümbürtüsü.',
    tarif: 'Titreşimli rezonans matkabıyla derin damarlara iner. Zehirli gaz ve lav sıçramalarına dayanıklıdır.',
    motor: 'palet',
    hiz: 1.3,
    zehir: 0.2,
    radar: 1,
    matkap: true,
  },
  demir_kervan: {
    ad: 'Demir Kervan',
    tip: 'Çok eklemli manyetik asit taşıyıcısı',
    ses: 'Ağır vagon bağlantılarının çınlaması, basınçlı hava fıslamaları.',
    tarif: 'Maden ocaklarıyla dökümhane arasında cevher taşır: sahip olunca ocaklardan koloniye düzenli bazalt ve titanyum gelir. Gövdesi asite dayanıklı.',
    motor: 'kervan',
    hiz: 1.6,
    zehir: 0.5,
    radar: 1,
    lojistik: true,
  },
  atmosphere_x: {
    ad: 'Atmosphere-X',
    tip: 'Dikey iniş-kalkış yapabilen keşif mekiği',
    ses: 'Yönlendirilebilir jet motorlarının kükremesi, rüzgâr sürtünmesi.',
    tarif: 'Karadan ulaşılamayan yüksek kulelere ve yarıklara iner. Yerler menüsünden giderken uçar.',
    motor: 'vtol',
    hiz: 4,
    zehir: 0.3,
    radar: 1.2,
    ucar: true,
  },
  akrep: {
    ad: 'Akrep',
    tip: 'Dört kollu otonom toplama dronu',
    ses: 'Arı vızıltısına benzeyen mikro-iticiler, kıskaçların metalik tıkırtısı.',
    tarif: 'Binilmez; kendi başına serbest madenleri toplar. Sahip olunca her iki dakikada bir yataklardan koloniye bir birim getirir.',
    otonom: true,
  },
};
export const ARAC_SIRASI = ['col_tilkisi', 'mammoth', 'demir_kervan', 'atmosphere_x', 'akrep'];
