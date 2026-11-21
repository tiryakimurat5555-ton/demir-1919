// Aethelis-IV, Vadi-i Sukût (Merkez Çöküntü Alanı). Saf veri.
// Düzlem: x doğuya, y kuzeye metre. Yön 0 kuzey, saat yönünde artar (src/oyun/konum.js).
// Kapsülün içi aynı düzlemde ama uzakta (x 300 civarı) ayrı bir mekândır; dışarıdaki sesler kapsülün yerinden duyulur.

export const MEKANLAR = {
  vadi: {
    ad: 'Vadi-i Sukût',
    tarif: 'Kanyonun korunaklı dibi. Zemin gevşek bazalt ve kristalleşmiş silikat; rüzgâr yukarıda, kayaların üstünde uğulduyor.',
    alan: { bati: -55, dogu: 55, guney: -45, kuzey: 60 },
    ortam: 'ortam_vadi',
    zemin: 'tas',
    dis: true,
  },
  kapsul: {
    ad: 'İniş kapsülü',
    tarif: 'Dar, sıcak bir metal oda. Fanlar vızıldıyor; gövde soğudukça çıtırdıyor.',
    alan: { bati: 300, dogu: 306, guney: 0, kuzey: 8 },
    ortam: 'ortam_kapsul',
    zemin: 'tas',
    dis: false,
    // Dışarıdaki seslerin geldiği yer: kapsülün vadideki konumu
    disariKonum: { x: 0, y: 0 },
  },
  sirtlar: {
    ad: 'Manyetik Sırtlar',
    tarif: 'Tektonik olarak canlı, dağlık bir bölge. Yerden süper ısınmış gaz fışkırıyor; hava kükürt kokuyor, pusulan şaşıyor.',
    alan: { bati: 500, dogu: 580, guney: -60, kuzey: 0 },
    ortam: 'ortam_sirtlar',
    zemin: 'tas',
    dis: true,
    zehirli: true, // kükürt gazı: maruziyet artar (dunya.js zehir)
    radarMenzili: 22, // manyetik parazit radarı kısaltır
  },
  krater: {
    ad: 'Kadim Krater',
    tarif: 'Devasa bir çarpışma havzası. Rüzgâr hiç yok; mutlak bir sessizlik. Yerden yer yer kadim çanların başları yükseliyor.',
    alan: { bati: 700, dogu: 780, guney: 0, kuzey: 70 },
    // Murat (1.16): kraterin kendi döngüsel müziği; çanlar duyulsun diye yarı düzeyde
    ortam: 'ortam_krater',
    ortamOran: 0.5,
    zemin: 'tas',
    dis: true,
  },
  kseno_lab: {
    ad: 'Gömülü yapının salonu',
    tarif: 'Pürüzsüz, serin taş duvarlar. Hava kımıldamıyor; yerin altından ağır, nabız gibi bir çekim uğultusu geliyor.',
    alan: { bati: 900, dogu: 924, guney: 0, kuzey: 24 },
    ortam: 'ortam_krater', // kraterin müziği kesilmeden sürer (Murat, 1.17)
    ortamOran: 0.5,
    zemin: 'tas',
    dis: false,
    disariKonum: { x: 740, y: 35 },
  },
  plato: {
    ad: 'Uğultulu Plato',
    tarif: 'Gökyüzüne açık, geniş bir bazalt düzlüğü. Fırtına hiç dinmiyor; kanyon boşluklarından geçen rüzgâr ıslık çalıyor. Tersanenin kurulacağı yer.',
    alan: { bati: 1100, dogu: 1180, guney: 0, kuzey: 70 },
    ortam: 'ortam_plato',
    ortamOran: 0.85,
    zemin: 'tas',
    dis: true,
    firtinali: true, // ara sıra rüzgâr hamlesi: yürürken yakalarsa savurur (dunya.js firtinaIlerle)
    radarMenzili: 45, // fırtına radarı biraz kısaltır
  },
  // --- Faz 2 bölgeleri (gezegen-gelisimi-ve-yerel-gorevler-v2.md 2.1, 2.2, 3.1-3.5) ---
  dogu: {
    ad: 'Manyetik Sis ve Kristal Bataklıkları',
    tarif: 'Doğu sektörü. Topraktan sütun boyunda piezo-elektrik kuvars kristalleri yükseliyor; havada iyonize bir sis asılı. Zemin ara sıra statikle boşalıyor.',
    alan: { bati: 1300, dogu: 1380, guney: 0, kuzey: 70 },
    ortam: 'ortam_dogu',
    zemin: 'tas',
    dis: true,
    statik: true, // kristal sütunların yanında statik boşalma (dunya.js statikIlerle)
    radarMenzili: 40, // manyetik sis radarı kısaltır
  },
  civa: {
    ad: 'Cıva Şelaleleri ve Ağır Metal Havzası',
    tarif: 'Manyetik sis vadisinin batı ucunda dik bir vadi. Gümüş renkli, ağır sıvı metal nehirleri kayalara tok tok çarpıyor; nehrin üstünde manyetik bir vızıltı.',
    alan: { bati: 1500, dogu: 1560, guney: 0, kuzey: 50 },
    ortam: 'ortam_civa',
    zemin: 'tas',
    dis: true,
    zehirli: true,
    maruziyet: 'Cıva buharı maruziyeti',
  },
  lav: {
    ad: 'Lav Koridorları',
    tarif: 'Sırtların güneyinde aktif volkanik menfezler. Yerin altından magma basıncıyla erimiş mineral akıntıları fışkırıyor; hava yanık kükürt kokuyor.',
    alan: { bati: 500, dogu: 580, guney: -130, kuzey: -65 },
    ortam: 'ortam_lav',
    zemin: 'tas',
    dis: true,
    zehirli: true,
    magma: true, // ayağının altında magma kabarır; hemen uzaklaş (dunya.js magmaIlerle)
    radarMenzili: 30,
  },
  mantar: {
    ad: 'Biyo-Işıldayan Mantar Ormanları',
    tarif: 'Kükürt çatlaklarının derinliğinde nemli, devasa bir mağara. Tavanlardan ışıldayan spor saçakları sarkıyor; mantar zarları nefes alır gibi hışırdıyor, su damlaları yankılanıyor.',
    alan: { bati: 1700, dogu: 1760, guney: 0, kuzey: 60 },
    ortam: 'ortam_mantar',
    zemin: 'tas',
    dis: true,
    yarasa: true, // kör yarasa sürüleri sonik yankıyla uçuşur
  },
  kriyo: {
    ad: 'Kriyojenik Metan Mağaraları',
    tarif: 'Kuzey platosunun derin yarıklarında, mutlak sıfıra yakın sıvı metan göletleri ve mavi buzul sarkıtları. Menfezler tiz tiz tıslıyor; buz cam gibi çatlıyor.',
    alan: { bati: 1900, dogu: 1960, guney: 0, kuzey: 60 },
    ortam: 'ortam_kriyo',
    zemin: 'tas',
    dis: true,
    soguk: true, // donma: maruziyet artar; termal giysi korur
    maruziyet: 'Donma',
  },
  obsidyen: {
    ad: 'Camlaşmış Obsidyen Ovası',
    tarif: 'Kuyruklu yıldızın erittiği dev bir krater tabanı; ayna gibi siyah bir cam denizi. Her adım çınlıyor; kraterin çanağı fısıltıları bile uzaklara taşıyor.',
    alan: { bati: 2100, dogu: 2200, guney: 0, kuzey: 80 },
    ortam: 'ortam_obsidyen',
    zemin: 'cam',
    dis: true,
    radarMenzili: 110, // parabolik krater yankıyı uzağa taşır
  },
  kuleler: {
    ad: 'Havada Asılı Bazalt Kuleleri',
    tarif: 'Manyetik kutupların kırılma noktasındaki dev çukurda, yerçekimine meydan okuyup süzülen bazalt bloklar. Kayalar birbirine sürtünüp inliyor; aralarından geçen rüzgâr flüt gibi çalıyor.',
    alan: { bati: 2300, dogu: 2380, guney: 0, kuzey: 80 },
    ortam: 'ortam_kuleler',
    zemin: 'tas',
    dis: true,
  },
  vanguard: {
    ad: 'Sarp kanyon',
    tarif: 'Doğu sektörünün kuzeyinde, iki duvarı da dimdik bir kanyon. Dibinde dev bir çelik iskelet sıkışmış; eski bir acil durum feneri hâlâ mors çalıyor.',
    alan: { bati: 2500, dogu: 2560, guney: 0, kuzey: 60 },
    ortam: 'ortam_yuzey',
    ortamOran: 0.45,
    zemin: 'tas',
    dis: true,
  },
  tuneller: {
    ad: 'Fosil solucan tünelleri',
    tarif: 'Yüzeyin yüzlerce metre altında, tarih öncesi kaya yiyici solucanların açtığı kilometrelerce uzun tüneller. Derin bir oyuk rüzgârı uğulduyor; zemin ara sıra titriyor.',
    alan: { bati: 2600, dogu: 2700, guney: 0, kuzey: 40 },
    ortam: 'ortam_tunel',
    zemin: 'tas',
    dis: true,
    radarMenzili: 50,
  },
  vaha: {
    ad: 'Saklı Jeotermal Kseno-Vaha',
    tarif: 'Kükürt fırtınasının tam kalbinde, doğal kalsit duvarlarla çevrili küçük bir vadi. Yer altı buharı havayı süzüyor: taze toprak ve çiçek kokusu, su şırıltıları, kuş cıvıltıları. Maskeni çıkarabilirsin.',
    alan: { bati: 2800, dogu: 2850, guney: 0, kuzey: 40 },
    ortam: 'ortam_vaha',
    zemin: 'tas',
    dis: true,
  },
  mabet: {
    ad: 'İç mabet',
    tarif: 'Küçük, yuvarlak bir oda. Ortada bir kaide; duvarlar parmaklarının altında hafifçe titriyor.',
    alan: { bati: 950, dogu: 966, guney: 0, kuzey: 16 },
    ortam: 'ortam_krater', // kraterin müziği kesilmeden sürer (Murat, 1.17)
    ortamOran: 0.5,
    zemin: 'tas',
    dis: false,
    disariKonum: { x: 740, y: 35 },
  },
  // Murat (1.15): ana gezegendeki jeotermal tarım alanı; içine girince kendi ortam sesi döner. Senaryosu Bahtiyar'da.
  tarim: {
    ad: 'Jeotermal Tarım Alanı',
    tarif: 'Sırtların ısısıyla ısıtılan, kayaya oyulmuş geniş bir sera. Hava ılık ve nemli; borularda sıcak su akıyor.',
    alan: { bati: 3000, dogu: 3020, guney: 0, kuzey: 20 },
    ortam: 'ortam_tarim',
    zemin: 'tas',
    dis: false,
    disariKonum: { x: -35, y: -25 },
  },
};

// Kapılar: iki yönlü geçitler. Çift dokununca öteki uca geçilir.
export const KAPILAR = {
  kapsul_kilit: {
    ad: 'Hava kilidi',
    uclar: [
      { mekan: 'vadi', x: 0, y: 3.2, yon: Math.PI, ad: 'Kapsülün hava kilidi' },
      { mekan: 'kapsul', x: 303, y: 0.8, yon: 0, ad: 'Hava kilidi' },
    ],
  },
  guney_gecit: {
    ad: 'Güney kanyon ağzı',
    uclar: [
      { mekan: 'vadi', x: 0, y: -41.5, yon: Math.PI, ad: 'Güney kanyon ağzı' },
      { mekan: 'sirtlar', x: 540, y: -1.5, yon: Math.PI, ad: 'Vadiye dönen yol' },
    ],
    // Kükürt gazı: filtre maskesi olmadan geçilmez
    kosul: (d) => !!d.bayrak.maske,
    kilitMetni: 'Kanyon ağzından kükürt kokusu yoğun geliyor; birkaç adımda gözlerin yanmaya başlıyor. Filtre maskesi olmadan geçemezsin. Hekime sor.',
    gecisMetni: ['Maskeyi takıyorsun. Kükürt kokusu filtreden süzülüp metalik bir tada dönüşüyor. Güneye, Manyetik Sırtlar\'a iniyorsun.', 'Kanyon ağzından vadiye dönüyorsun. Maskeyi çıkarıyorsun; hava temiz.'],
  },
  kuzey_gecit: {
    ad: 'Plato yokuşu',
    uclar: [
      { mekan: 'vadi', x: 4, y: 58.5, yon: 0, ad: 'Plato yokuşu' },
      { mekan: 'plato', x: 1140, y: 1.5, yon: 0, ad: 'Vadiye inen yokuş' },
    ],
    kosul: (d) => !!d.bayrak.biyo_kubbe,
    kilitMetni: 'Tepeden yukarı, fırtınalı Uğultulu Plato\'ya çıkan dik bir yol. Yukarıdan uluyan rüzgâr seni geri itiyor. Şimdilik orada yapacak bir işin yok.',
    gecisMetni: [
      'Dik yokuşu tırmanıyorsun. Kanyonun kenarını aşınca rüzgâr bütün gücüyle yüzüne çarpıyor: Uğultulu Plato. Hamlelerin ıslığını dinle; geldiğini duyunca dur.',
      'Yokuştan vadiye iniyorsun. Rüzgâr kanyon duvarlarının ardında kalıyor.',
    ],
  },
  tarim_kapi: {
    ad: 'Jeotermal tarım alanının kapısı',
    uclar: [
      { mekan: 'vadi', x: -35, y: -25, yon: Math.PI, ad: 'Jeotermal tarım alanının kapısı' },
      { mekan: 'tarim', x: 3010, y: 1.5, yon: 0, ad: 'Vadiye çıkış' },
    ],
    // Bacalar dengelenip jeotermal ısı vadiye ulaşınca açılır
    kosul: (d) => !!d.bayrak.sondaj,
    kilitMetni: 'Kayaya oyulmuş ağır bir kapı; ardı karanlık ve soğuk. Isıtma boruları boş. Önce sırtlardaki bacalar dengelenmeli, jeotermal ısı buraya ulaşmalı.',
    gecisMetni: ['Kapı açılınca yüzüne ılık, nemli bir hava çarpıyor. Jeotermal tarım alanındasın.', 'Vadinin serin havasına çıkıyorsun.'],
  },
  dogu_gecit: {
    ad: 'Doğu geçidi',
    uclar: [
      { mekan: 'vadi', x: 54, y: 10, yon: Math.PI / 2, ad: 'Doğu geçidi' },
      { mekan: 'dogu', x: 1301.5, y: 35, yon: Math.PI / 2, ad: 'Vadiye dönen geçit' },
    ],
    kosul: (d) => !!d.bayrak.dokumhane,
    kilitMetni: 'Doğuya açılan dar bir geçit; içinden kulak tırmalayan çınlamalar ve statik çıtırtılar geliyor. Manyetik sis yön duygunu bozuyor. Koloni önce sanayisini kurmalı: dökümhane.',
    gecisMetni: ['Geçidin ağzında sis yüzüne yapışıyor; kulağında fısıltılı yankılar. Manyetik Sis ve Kristal Bataklıkları. Çınlayan kristal sütunların yanında oyalanma: zemin statikle boşalıyor.', 'Sisten çıkıp vadiye dönüyorsun.'],
  },
  civa_gecit: {
    ad: 'Cıva vadisinin yokuşu',
    uclar: [
      { mekan: 'dogu', x: 1302, y: 4, yon: Math.PI, ad: 'Cıva vadisine inen yokuş' },
      { mekan: 'civa', x: 1530, y: 48.5, yon: Math.PI, ad: 'Bataklıklara çıkan yokuş' },
    ],
    kosul: (d) => !!d.bayrak.maske,
    kilitMetni: 'Aşağıdan ağır, metalik bir buhar yükseliyor. Maskesiz inersen ciğerlerin dayanmaz.',
    gecisMetni: ['Maskeni sıkılaştırıp yokuştan iniyorsun. Cıva Şelaleleri: gümüş nehirler tok tok gümbürdüyor.', 'Yokuştan bataklıklara çıkıyorsun.'],
  },
  lav_gecit: {
    ad: 'Lav koridorlarının ağzı',
    uclar: [
      { mekan: 'sirtlar', x: 540, y: -59, yon: Math.PI, ad: 'Lav koridorlarının ağzı' },
      { mekan: 'lav', x: 540, y: -66.5, yon: Math.PI, ad: 'Sırtlara dönen yol' },
    ],
    kosul: (d) => !!d.bayrak.sondaj,
    kilitMetni: 'Güneyden yanık bir sıcaklık ve kaynama uğultusu geliyor. Bacalar dengelenmeden bu basınçla aşağı inilmez.',
    gecisMetni: ['Kayalar ısınıyor, maskenin filtresi tıslıyor. Lav Koridorları. Ayağının altında gümbürtü duyarsan hemen uzaklaş: magma kabarıyor.', 'Sırtlara dönüyorsun; sıcaklık arkanda kalıyor.'],
  },
  mantar_gecit: {
    ad: 'Mağaraya inen çatlak',
    uclar: [
      { mekan: 'lav', x: 512, y: -127, yon: Math.PI, ad: 'Mağaraya inen çatlak' },
      { mekan: 'mantar', x: 1730, y: 1.5, yon: 0, ad: 'Lav koridorlarına çıkan çatlak' },
    ],
    gecisMetni: ['Çatlaktan aşağı kayıyorsun. Hava birden serinleyip nemleniyor; damlalar yankılanıyor. Biyo-Işıldayan Mantar Ormanları.', 'Çatlaktan tırmanıp sıcağa çıkıyorsun.'],
  },
  kriyo_gecit: {
    ad: 'Buzul yarığı',
    uclar: [
      { mekan: 'plato', x: 1176, y: 68, yon: 0, ad: 'Buzul yarığı' },
      { mekan: 'kriyo', x: 1930, y: 1.5, yon: 0, ad: 'Platoya çıkan yarık' },
    ],
    kosul: (d) => !!d.bayrak.zemin,
    kilitMetni: 'Platonun kuzey ucunda derin bir yarık; dibinden dondurucu bir hava yükseliyor. Halatlar ve iskele olmadan inilmez; kızak işi bitince mühendis kurar.',
    gecisMetni: ['Halatla yarığa iniyorsun. Nefesin donuyor; buz cam gibi çatlıyor. Kriyojenik Metan Mağaraları. Soğuk seni hızla tüketir; termal giysi yoksa kısa tut.', 'Halatla platoya tırmanıyorsun; fırtına yeniden yüzünde.'],
  },
  obsidyen_gecit: {
    ad: 'Güneybatı kanyonu',
    uclar: [
      { mekan: 'vadi', x: -50, y: -43.5, yon: Math.PI, ad: 'Güneybatı kanyonu' },
      { mekan: 'obsidyen', x: 2150, y: 1.5, yon: 0, ad: 'Vadiye dönen kanyon' },
    ],
    kosul: (d) => !!d.bayrak.dokumhane,
    kilitMetni: 'Güneybatıda göçükle kapanmış bir kanyon. Dökümhanenin kirişleriyle açılabilir.',
    gecisMetni: ['Kanyonun sonunda zemin birden pürüzsüz ve sert oluyor; adımların çınlıyor. Camlaşmış Obsidyen Ovası.', 'Kanyondan vadiye dönüyorsun.'],
  },
  kule_inisi: {
    ad: 'Kulelere uçuş',
    uclar: [
      { mekan: 'plato', x: 1104, y: 66, yon: 0, ad: 'Kulelere uçuş noktası' },
      { mekan: 'kuleler', x: 2340, y: 1.5, yon: 0, ad: 'Platoya dönüş uçuşu' },
    ],
    kosul: (d) => d.arac === 'atmosphere_x',
    kilitMetni: 'Platonun kenarından, uzakta havada süzülen kayaların inlemesi geliyor. Oraya ancak dikey iniş yapabilen bir mekikle gidilir: Atmosphere-X.',
    gecisMetni: ['Jetler kükrüyor; mekik uçurumun üstünde süzülüp bir bazalt bloğun sırtına iniyor. Havada Asılı Bazalt Kuleleri.', 'Mekik kalkıyor; platoya dönüyorsun.'],
  },
  sarp_kanyon: {
    ad: 'Sarp kanyonun ağzı',
    uclar: [
      { mekan: 'dogu', x: 1340, y: 69, yon: 0, ad: 'Sarp kanyonun ağzı' },
      { mekan: 'vanguard', x: 2530, y: 1.5, yon: 0, ad: 'Bataklıklara dönen yol' },
    ],
    kosul: (d) => !!d.bayrak.morsBulundu,
    kilitMetni: 'Sisin içinde bir yarık; nereye çıktığı belli değil. Önce bir iz, bir sinyal bulmalısın.',
    gecisMetni: ['Mors sesinin geldiği yöne, dar yarıktan iniyorsun. Duvarlar daralıp yükseliyor. Kanyonun dibinde dev bir çelik iskelet: Vanguard-01.', 'Kanyondan sise dönüyorsun.'],
  },
  tunel_agzi: {
    ad: 'Derin oyuk',
    uclar: [
      { mekan: 'mantar', x: 1758, y: 30, yon: Math.PI / 2, ad: 'Derin oyuk' },
      { mekan: 'tuneller', x: 2601.5, y: 20, yon: Math.PI / 2, ad: 'Mağaraya çıkan oyuk' },
    ],
    kosul: (d) => !!d.bayrak.tunelAcik || d.arac === 'mammoth',
    gecince: (d) => (d.bayrak.tunelAcik = true),
    kilitMetni: 'Mağaranın doğu duvarında derin bir oyuk; içinden uğuldayan bir rüzgâr ve zemin titreşimleri geliyor. Ağzı kayayla tıkalı; ancak bir sondaj tankının matkabı açar: Mammoth.',
    gecisMetni: ['Oyuktan aşağı, uçsuz bucaksız bir tünele iniyorsun. Duvarlar düzgün ve yivli: bir şey bunları yiyerek açmış. Fosil solucan tünelleri.', 'Tünelden mağaraya çıkıyorsun.'],
  },
  vaha_yolu: {
    ad: 'Kalsit duvardaki aralık',
    uclar: [
      { mekan: 'sirtlar', x: 503, y: -3, yon: -Math.PI / 2, ad: 'Kalsit duvardaki aralık; kükürt kokusu burada taze toprağa dönüyor' },
      { mekan: 'vaha', x: 2825, y: 1.5, yon: 0, ad: 'Sırtlara dönen aralık' },
    ],
    gecince: (d) => {
      if (!d.bayrak.vahaBulundu) d.vahaGirisi = true; // kesifler.js vahaBulundu (görev kancası zamanIlerle'de)
    },
    gecisMetni: ['Kalsit duvarların arasından geçiyorsun. Kükürt kokusu birden taze toprak ve çiçek kokusuna dönüşüyor; su şırıltıları, kuş cıvıltıları. Saklı bir vaha. Maskeni çıkarıyorsun: hava temiz.', 'Aralıktan sırtlara dönüyorsun; maskeni takıyorsun.'],
  },
  bati_gecit: {
    ad: 'Batı geçidi',
    uclar: [
      { mekan: 'vadi', x: -52.5, y: 20, yon: -Math.PI / 2, ad: 'Batı geçidi' },
      { mekan: 'krater', x: 740, y: 1.5, yon: 0, ad: 'Vadiye dönen yarık' },
    ],
    kosul: (d) => !!d.bayrak.dokumhane,
    kilitMetni: 'Rüzgârın hiç girmediği dar bir yarık. Ağzını bir kaya göçüğü kapatmış; ancak çelik kirişlerle açılır. Önce bir dökümhane gerek.',
    gecisMetni: ['Göçüğün açılan ağzından, kirişlerin altından geçiyorsun. Yarık daralıyor, sonra birden genişliyor: rüzgâr kesiliyor. Kadim Krater.', 'Yarıktan vadiye dönüyorsun. Rüzgâr yeniden kulaklarında.'],
  },
  kseno_kapi: {
    ad: 'Gömülü yapının kapısı',
    uclar: [
      { mekan: 'krater', x: 740, y: 33.2, yon: Math.PI, ad: 'Gömülü yapının kapısı' },
      { mekan: 'kseno_lab', x: 912, y: 1, yon: 0, ad: 'Krater kapısı' },
    ],
    kosul: (d) => !!d.bayrak.kapi_dis,
    rezonans: 'dis', // frekans rezonatörüyle açılır (gorev3.js)
    kilitMetni: 'Kraterin ortasında, yarısı toprağa gömülü pürüzsüz bir kapı. Kolu, menteşesi yok. Dokununca içinden üç notalık bir tını geliyor.',
    gecisMetni: ['Kapı ses çıkarmadan iki yana kayıyor. Serin, kımıltısız bir havaya giriyorsun.', 'Kraterin sessizliğine çıkıyorsun.'],
  },
  ic_kapi: {
    ad: 'İç mabedin kapısı',
    uclar: [
      { mekan: 'kseno_lab', x: 912, y: 23, yon: Math.PI, ad: 'İç mabedin kapısı' },
      { mekan: 'mabet', x: 958, y: 1, yon: 0, ad: 'Salona dönen kapı' },
    ],
    kosul: (d) => !!d.bayrak.kapi_ic,
    rezonans: 'ic',
    kilitMetni: 'Salonun dibinde ikinci bir kapı. Bunun tınısı daha uzun: dört nota.',
    gecisMetni: ['Kapı açılıyor. Küçük, titreşen bir odaya giriyorsun.', 'Salona dönüyorsun.'],
  },
};

// Etkileşilen noktalar. ses: konumsal motorda çalan kaynak (kosul sağlanınca).
export const NOKTALAR = {
  // --- Kapsülün içi ---
  terminal: { mekan: 'kapsul', x: 303, y: 7, ad: 'Merkez terminali', yaricap: 1.6, tarif: 'Kapsül bilgisayarının ana terminali. Koloni durumu, inşa ve kayıt buradan.' },
  dolap: { mekan: 'kapsul', x: 305.3, y: 3, ad: 'Alet dolabı', yaricap: 1.4, tarif: 'Gövdeye vidalı çelik dolap.' },
  // --- Vadi ---
  kapsul_dis: { mekan: 'vadi', x: 0, y: 0, ad: 'İniş kapsülü', yaricap: 3.5, tarif: 'Yarısı bazalta gömülmüş, hâlâ ılık kapsül. Hava kilidi kuzey yüzünde.', engel: 2.4 },
  enkaz: { mekan: 'vadi', x: -24, y: 20, ad: 'Kopan arka modül', yaricap: 3, tarif: 'İniş sırasında kopan kargo ve iletişim modülü. Acil durum feneri hâlâ bipliyor.', engel: 1.8 },
  jenerator: { mekan: 'vadi', x: 16, y: 12, ad: 'Yedek jeneratör', yaricap: 2.4, tarif: 'Kapsülle birlikte atılan, kendi paraşütüyle inmiş füzyon jeneratörü.', engel: 1.2 },
  tepe: { mekan: 'vadi', x: 4, y: 50, ad: 'Gözcü Tepesi', yaricap: 3, tarif: 'Vadinin kuzeyindeki bazalt sırt. Kanyon duvarlarının üstünü gören tek yer.' },
  // Kaynak yatakları: stok kadar toplanır
  bazalt_1: { mekan: 'vadi', x: 10, y: -12, ad: 'Bazalt yığını', yaricap: 2.2, kaynak: 'bazalt', stok: 3 },
  bazalt_2: { mekan: 'vadi', x: -12, y: -8, ad: 'Bazalt yığını', yaricap: 2.2, kaynak: 'bazalt', stok: 3 },
  bazalt_3: { mekan: 'vadi', x: 30, y: 30, ad: 'Bazalt yığını', yaricap: 2.2, kaynak: 'bazalt', stok: 3 },
  kristal_1: { mekan: 'vadi', x: -38, y: 4, ad: 'Silikat kristal kümesi', yaricap: 2.2, kaynak: 'kristal', stok: 2, ses: 'kristal' },
  kristal_2: { mekan: 'vadi', x: 36, y: -20, ad: 'Silikat kristal kümesi', yaricap: 2.2, kaynak: 'kristal', stok: 2, ses: 'kristal' },
  titanyum_1: { mekan: 'vadi', x: -19, y: 24, ad: 'Titanyum hurdası', yaricap: 2.2, kaynak: 'titanyum', stok: 2 },
  titanyum_2: { mekan: 'vadi', x: -29, y: 15, ad: 'Titanyum hurdası', yaricap: 2.2, kaynak: 'titanyum', stok: 2 },
  // Vadiden çıkışlar (sonraki görevlerde açılacak)
  // --- Manyetik Sırtlar ---
  baca_1: { mekan: 'sirtlar', x: 522, y: -18, ad: 'Batı gaz bacası', yaricap: 2.8, engel: 1.1, baca: true, tarif: 'Kayadaki bir yarıktan kesik kesik süper ısınmış gaz fışkırıyor.' },
  baca_2: { mekan: 'sirtlar', x: 558, y: -28, ad: 'Doğu gaz bacası', yaricap: 2.8, engel: 1.1, baca: true, tarif: 'Geniş ağızlı, gürültülü bir baca; zemin ayağının altında titriyor.' },
  baca_3: { mekan: 'sirtlar', x: 534, y: -50, ad: 'Derin gaz bacası', yaricap: 2.8, engel: 1.1, baca: true, tarif: 'Sırtın dibinde, derinden kaynayan bir baca. Buradan gelen basınç en sert olanı.' },
  bazalt_4: { mekan: 'sirtlar', x: 548, y: -10, ad: 'Bazalt yığını', yaricap: 2.2, kaynak: 'bazalt', stok: 4 },
  bazalt_5: { mekan: 'sirtlar', x: 524, y: -38, ad: 'Bazalt yığını', yaricap: 2.2, kaynak: 'bazalt', stok: 4 },
  agir_1: { mekan: 'sirtlar', x: 566, y: -46, ad: 'Ağır metal damarı', yaricap: 2.2, kaynak: 'titanyum', stok: 3 },
  catlak_1: { mekan: 'sirtlar', x: 572, y: -8, ad: 'Kükürt çatlağı', yaricap: 2.2, kaynak: 'polimer', stok: 4, tarif: 'Kayadaki bir çatlaktan sakız kıvamında, keskin kokulu bir reçine sızıyor.' },
  catlak_2: { mekan: 'sirtlar', x: 508, y: -52, ad: 'Kükürt çatlağı', yaricap: 2.2, kaynak: 'polimer', stok: 4, tarif: 'Sıcak bir çatlak; kenarlarında katılaşmış reçine kabuğu.' },
  graviton_kuyusu: { mekan: 'sirtlar', x: 566, y: -55, ad: 'Derin graviton kuyusu', yaricap: 2.6, kaynak: 'graviton', stok: 3, gerekArac: 'mammoth', tarif: 'Yerin derinlerinden kulaklığında hissedilen pes bir titreşim yükselen, dar ve derin bir kuyu.' },
  agir_2: { mekan: 'sirtlar', x: 510, y: -30, ad: 'Ağır metal damarı', yaricap: 2.2, kaynak: 'titanyum', stok: 3 },
  // --- Kadim Krater: beş rezonans çanı (pesten tize), kristaller ---
  can_1: { mekan: 'krater', x: 712, y: 20, ad: 'Birinci çan', yaricap: 2.4, engel: 0.9, can: 0, tarif: 'Topraktan yükselen, insan boyunda kararmış bir çan. En pes olanı.' },
  can_2: { mekan: 'krater', x: 725, y: 46, ad: 'İkinci çan', yaricap: 2.4, engel: 0.9, can: 1, tarif: 'Yan yatmış bir çan; ağzı kuzeye bakıyor.' },
  can_3: { mekan: 'krater', x: 748, y: 58, ad: 'Üçüncü çan', yaricap: 2.4, engel: 0.9, can: 2, tarif: 'Yüzeyi oyma işaretlerle kaplı bir çan.' },
  can_4: { mekan: 'krater', x: 770, y: 38, ad: 'Dördüncü çan', yaricap: 2.4, engel: 0.9, can: 3, tarif: 'İnce, uzun bir çan; dokununca tısır gibi titriyor.' },
  can_5: { mekan: 'krater', x: 760, y: 14, ad: 'Beşinci çan', yaricap: 2.4, engel: 0.9, can: 4, tarif: 'En küçük ve en tiz çan; kristal gibi parlak bir sesi var.' },
  kristal_3: { mekan: 'krater', x: 705, y: 52, ad: 'Silikat kristal kümesi', yaricap: 2.2, kaynak: 'kristal', stok: 2, ses: 'kristal' },
  kristal_4: { mekan: 'krater', x: 775, y: 62, ad: 'Silikat kristal kümesi', yaricap: 2.2, kaynak: 'kristal', stok: 2, ses: 'kristal' },
  titanyum_3: { mekan: 'krater', x: 726, y: 8, ad: 'Kadim metal yığını', yaricap: 2.2, kaynak: 'titanyum', stok: 4, tarif: 'Çöküntünün kıyısında, işlenmiş metal parçalarından bir yığın.' },
  // --- Gömülü yapı: veri kristali kaideleri ve iç mabet ---
  // Faz 2 bölgelerinin yatakları
  kuvars_1: { mekan: 'dogu', x: 1320, y: 20, ad: 'Piezo kuvars sütunu', yaricap: 2.4, engel: 1, kaynak: 'kristal', stok: 6, sutun: true, ses: 'kristal' },
  kuvars_2: { mekan: 'dogu', x: 1345, y: 48, ad: 'Piezo kuvars sütunu', yaricap: 2.4, engel: 1, kaynak: 'kristal', stok: 6, sutun: true, ses: 'kristal' },
  kuvars_3: { mekan: 'dogu', x: 1368, y: 15, ad: 'Piezo kuvars sütunu', yaricap: 2.4, engel: 1, kaynak: 'kristal', stok: 6, sutun: true, ses: 'kristal' },
  sivi_metal_1: { mekan: 'civa', x: 1512, y: 20, ad: 'Sıvı metal gölü', yaricap: 2.4, kaynak: 'sivi_metal', stok: 3, tarif: 'Gümüş, ağır bir sıvı; kabın içinde tok tok sallanıyor.' },
  civa_tortusu_1: { mekan: 'civa', x: 1548, y: 12, ad: 'Manyetik cıva tortusu', yaricap: 2.4, kaynak: 'civa_tortusu', stok: 3, tarif: 'Şelalenin dibinde, manyetik alanla titreşen koyu bir tortu.' },
  agir_metal_1: { mekan: 'lav', x: 520, y: -90, ad: 'Ağır metal damarı', yaricap: 2.4, kaynak: 'titanyum', stok: 5 },
  agir_metal_2: { mekan: 'lav', x: 565, y: -110, ad: 'Ağır metal damarı', yaricap: 2.4, kaynak: 'titanyum', stok: 5 },
  foton_1: { mekan: 'mantar', x: 1715, y: 25, ad: 'Fotonik yosun yatağı', yaricap: 2.4, kaynak: 'foton_recinesi', stok: 3, tarif: 'Dokundukça parlaklığı artan iletken bir yosun; avucunda ılık bir ışık reçinesi kalıyor.' },
  spor_1: { mekan: 'mantar', x: 1745, y: 45, ad: 'Sütun mantar', yaricap: 2.4, engel: 1.2, kaynak: 'kseno_spor', stok: 3, tarif: 'İnsan boyunda bir mantar gövdesi; zarı nefes alır gibi genişleyip daralıyor, sakinleştirici sporlar savuruyor.' },
  kriyolit_1: { mekan: 'kriyo', x: 1915, y: 30, ad: 'Süperiletken kriyolit damarı', yaricap: 2.4, kaynak: 'kriyolit', stok: 3, tarif: 'Buzun içinde mavi, soğuk ışıldayan bir mineral.' },
  metan_1: { mekan: 'kriyo', x: 1948, y: 45, ad: 'Sıvı metan göleti', yaricap: 2.6, kaynak: 'metan', stok: 3, tarif: 'Dondurucu bir sıvının kenarında kriyo-kristal çiçekleri; ısındıkça tıslayıp gaz salıyorlar.' },
  menfez_1: { mekan: 'kriyo', x: 1935, y: 52, ad: 'Kriyojenik gaz menfezi', yaricap: 2.4, engel: 1, menfez: true, tarif: 'Basınç altındaki gazı tiz tiz tıslayan bir buz bacası. Yanında soğuk ikiye katlanıyor.' },
  plazma_cami_1: { mekan: 'obsidyen', x: 2125, y: 40, ad: 'Kusursuz plazma camı', yaricap: 2.4, kaynak: 'plazma_cami', stok: 3, tarif: 'Erimiş kuvarsın donduğu, cam gibi pürüzsüz bir damar.' },
  obsidyen_1: { mekan: 'obsidyen', x: 2178, y: 62, ad: 'Obsidyen tabakası', yaricap: 2.4, kaynak: 'obsidyen', stok: 4, tarif: 'Ayna gibi siyah, keskin kenarlı katmanlar.' },
  antigrav_1: { mekan: 'kuleler', x: 2320, y: 40, ad: 'Antigravitasyon tozu', yaricap: 2.4, kaynak: 'antigrav_tozu', stok: 3, tarif: 'Süzülen bir bloğun altından dökülen, avucunda yukarı doğru çeken ince bir toz; içinde çekirdek jeotlar.' },
  antigrav_2: { mekan: 'kuleler', x: 2362, y: 66, ad: 'Antigravitasyon tozu', yaricap: 2.4, kaynak: 'antigrav_tozu', stok: 3 },
  // Gezegenin gizemli noktaları (gezegen-gelisimi-v2 bölüm 4)
  vanguard_enkaz: { mekan: 'vanguard', x: 2530, y: 40, ad: 'Vanguard-01 enkazı', yaricap: 4, engel: 3, mors: true, tarif: 'İlk insan keşif gemisinin, manyetik fırtınaya kapılıp düşmüş dev çelik iskeleti. Acil durum feneri hâlâ ritmik dıt-dıt sesleri çalıyor.' },
  monolit: { mekan: 'dogu', x: 1362, y: 62, ad: 'Manyetik tersinme monoliti', yaricap: 3, engel: 1.5, monolit: true, tarif: 'Simsiyah, pürüzsüz, hiçbir sensörün işleyemediği dev bir dikilitaş. Çevresinde pusulan sürekli dönüyor; yanında her şey susuyor.' },
  kabuk_1: { mekan: 'tuneller', x: 2630, y: 30, ad: 'Fosil kseno-kabuk', yaricap: 2.2, kaynak: 'kseno_kabuk', stok: 2, tarif: 'Duvara gömülü, taştan sert, spiral bir kabuk.' },
  kabuk_2: { mekan: 'tuneller', x: 2680, y: 10, ad: 'Fosil kseno-kabuk', yaricap: 2.2, kaynak: 'kseno_kabuk', stok: 2 },
  tohum_1: { mekan: 'vaha', x: 2815, y: 25, ad: 'Vahşi kseno-tahıl', yaricap: 2.2, kaynak: 'tohum', stok: 3, tarif: 'Buharla beslenen, başakları ince ince hışırdayan yerel bir bitki. Tohumları açıkta yetişebilir.' },
  vaha_kaynagi: { mekan: 'vaha', x: 2838, y: 34, ad: 'Vahanın su kaynağı', yaricap: 2.4, engel: 1, tarif: 'Kalsit kayadan şırıldayarak çıkan berrak bir su. Vahayı bu su besliyor.' },
  // Yerel fauna (gezegen-gelisimi-v2 2.2, 3.5, 4.3): yalnız sesleri ve tarifleri var
  suluk_1: { mekan: 'dogu', x: 1330, y: 10, ad: 'Elektromanyetik sülük kümesi', yaricap: 1.8, fauna: 'suluk', tarif: 'Çatlaklara yapışmış, statik enerjiyle beslenen yassı canlılar. Yaklaştıkça kulaklıkta cızırdıyorlar.' },
  suluk_2: { mekan: 'dogu', x: 1356, y: 28, ad: 'Elektromanyetik sülük kümesi', yaricap: 1.8, fauna: 'suluk', tarif: 'Kuvars sütunun dibinde vızıldayan sülükler; elini yaklaştırınca tüylerin diken diken oluyor.' },
  iplik_1: { mekan: 'kuleler', x: 2335, y: 55, ad: 'İplik böceği ağı', yaricap: 2, fauna: 'iplik', tarif: 'İki süzülen kaya arasına gerilmiş ipeksi bir ağ; rüzgârda ince ince çınlıyor. Böcekler havada yaşıyor.' },
  iplik_2: { mekan: 'kuleler', x: 2356, y: 25, ad: 'İplik böceği ağı', yaricap: 2, fauna: 'iplik', tarif: 'Kayadan kayaya uzanan ışıltılı iplikler.' },
  surungen_1: { mekan: 'tuneller', x: 2655, y: 25, ad: 'Tünel sürüngenleri', yaricap: 2, fauna: 'surungen', tarif: 'Karanlıkta yönünü şaşırtan hızlı ayak sesleri; tünelin duvarlarında yankılanıp nereden geldiği anlaşılmıyor.' },
  // Yerel mini görevlerin noktaları (gezegen-gelisimi-v2 bölüm 8; mini.js). Yalnız görev sürerken vardır.
  foton_olgun_1: { mekan: 'mantar', x: 1712, y: 48, ad: 'Fotonik kristal kümesi', yaricap: 2, mini: 'mantar_hasadi', tarif: 'Bir mantar sapının dibinde yeşilimsi parlayan kristaller.' },
  foton_olgun_2: { mekan: 'mantar', x: 1748, y: 12, ad: 'Fotonik kristal kümesi', yaricap: 2, mini: 'mantar_hasadi', tarif: 'Tavandan sarkan bir zarın kıyısında kristal salkımı.' },
  foton_olgun_3: { mekan: 'mantar', x: 1722, y: 8, ad: 'Fotonik kristal kümesi', yaricap: 2, mini: 'mantar_hasadi', tarif: 'Islak bir kayanın üstünde, nabız gibi atan kristaller.' },
  boru_1: { mekan: 'kriyo', x: 1908, y: 12, ad: 'Yakıt hattı bağlantısı', yaricap: 2, mini: 'vana_donmasi', secenek: 0, tarif: 'Buzla kaplı kalın bir boru bağlantısı.' },
  boru_2: { mekan: 'kriyo', x: 1952, y: 18, ad: 'Yakıt hattı bağlantısı', yaricap: 2, mini: 'vana_donmasi', secenek: 1, tarif: 'Buzla kaplı kalın bir boru bağlantısı.' },
  boru_3: { mekan: 'kriyo', x: 1922, y: 44, ad: 'Yakıt hattı bağlantısı', yaricap: 2, mini: 'vana_donmasi', secenek: 2, tarif: 'Buzla kaplı kalın bir boru bağlantısı.' },
  boru_4: { mekan: 'kriyo', x: 1955, y: 56, ad: 'Yakıt hattı bağlantısı', yaricap: 2, mini: 'vana_donmasi', secenek: 3, tarif: 'Buzla kaplı kalın bir boru bağlantısı.' },
  kayip_ekip_a: { mekan: 'obsidyen', x: 2190, y: 70, ad: 'Kayıp keşif aracı', yaricap: 3, mini: 'kayip_ekip', secenek: 0, radarsiz: true, tarif: 'Camlaşmış bir yarığa saplanmış araç; içinden yorgun sesler.' },
  kayip_ekip_b: { mekan: 'obsidyen', x: 2110, y: 72, ad: 'Kayıp keşif aracı', yaricap: 3, mini: 'kayip_ekip', secenek: 1, radarsiz: true, tarif: 'Camlaşmış bir yarığa saplanmış araç; içinden yorgun sesler.' },
  kayip_ekip_c: { mekan: 'obsidyen', x: 2160, y: 30, ad: 'Kayıp keşif aracı', yaricap: 3, mini: 'kayip_ekip', secenek: 2, radarsiz: true, tarif: 'Camlaşmış bir yarığa saplanmış araç; içinden yorgun sesler.' },
  vaha_bent: { mekan: 'vaha', x: 2842, y: 26, ad: 'Kaynağı tıkayan bent', yaricap: 2.2, mini: 'vaha_kanali', tarif: 'Kaynağın ağzına yığılmış kalsit kayalar; arkasında suyun boğuk gürültüsü.' },
  kompresor_1: { mekan: 'vadi', x: 20, y: -30, ad: 'Birinci yedek kompresör', yaricap: 2, mini: 'basinc_dususu', tarif: 'Kseno-habitat kubbesine bağlı elle çalışan kompresör.' },
  kompresor_2: { mekan: 'vadi', x: 28, y: -34, ad: 'İkinci yedek kompresör', yaricap: 2, mini: 'basinc_dususu', tarif: 'Kseno-habitat kubbesine bağlı elle çalışan kompresör.' },
  kompresor_3: { mekan: 'vadi', x: 14, y: -37, ad: 'Üçüncü yedek kompresör', yaricap: 2, mini: 'basinc_dususu', tarif: 'Kseno-habitat kubbesine bağlı elle çalışan kompresör.' },
  kazik_1: { mekan: 'sirtlar', x: 515, y: -8, ad: 'Kazık kayası', yaricap: 2, mini: 'solucan_gocu', tarif: 'Fay çizgisinin üstünde, kazık için çatlak bir kaya.' },
  kazik_2: { mekan: 'sirtlar', x: 545, y: -40, ad: 'Kazık kayası', yaricap: 2, mini: 'solucan_gocu', tarif: 'Fay çizgisinin üstünde, kazık için çatlak bir kaya.' },
  kazik_3: { mekan: 'sirtlar', x: 572, y: -30, ad: 'Kazık kayası', yaricap: 2, mini: 'solucan_gocu', tarif: 'Fay çizgisinin üstünde, kazık için çatlak bir kaya.' },
  yagmaci_1: { mekan: 'vanguard', x: 2512, y: 25, ad: 'Korsan', yaricap: 2.5, mini: 'yagmaci_tuzagi', tarif: 'Telsizi cızırdayan, sırtı sana dönük bir yağmacı.' },
  yagmaci_2: { mekan: 'vanguard', x: 2548, y: 22, ad: 'Korsan', yaricap: 2.5, mini: 'yagmaci_tuzagi', tarif: 'Telsizi cızırdayan, sırtı sana dönük bir yağmacı.' },
  yagmaci_3: { mekan: 'vanguard', x: 2522, y: 52, ad: 'Korsan', yaricap: 2.5, mini: 'yagmaci_tuzagi', tarif: 'Telsizi cızırdayan, sırtı sana dönük bir yağmacı.' },
  // Arındırma karakol yerleri (gezegen-gelisimi-v2 bölüm 5)
  karakol_sirtlar: { mekan: 'sirtlar', x: 530, y: -30, ad: 'Sırtların karakol yeri', yaricap: 2.4, karakol: 'sirtlar' },
  karakol_dogu: { mekan: 'dogu', x: 1340, y: 35, ad: 'Bataklığın karakol yeri', yaricap: 2.4, karakol: 'dogu' },
  karakol_lav: { mekan: 'lav', x: 545, y: -100, ad: 'Lav koridorunun karakol yeri', yaricap: 2.4, karakol: 'lav' },
  karakol_plato: { mekan: 'plato', x: 1160, y: 20, ad: 'Platonun karakol yeri', yaricap: 2.4, karakol: 'plato' },
  karakol_civa: { mekan: 'civa', x: 1530, y: 30, ad: 'Cıva vadisinin karakol yeri', yaricap: 2.4, karakol: 'civa' },
  karakol_mantar: { mekan: 'mantar', x: 1730, y: 40, ad: 'Mağaranın karakol yeri', yaricap: 2.4, karakol: 'mantar' },
  // Uğultulu Plato: tersane kızağının dört hidrolik ayağı, dağıtım kutusu, kaynaklar
  ayak_1: { mekan: 'plato', x: 1125, y: 30, ad: 'Güneybatı ayağı', yaricap: 2.4, ayak: true, tarif: 'Kızağın güneybatı köşesindeki hidrolik ayak. Altındaki bazalt gevşek; topuk taşın içine gömülmüş.' },
  ayak_2: { mekan: 'plato', x: 1155, y: 30, ad: 'Güneydoğu ayağı', yaricap: 2.4, ayak: true, tarif: 'Kızağın güneydoğu köşesindeki hidrolik ayak. Rüzgâr çelik gövdesinde uğulduyor.' },
  ayak_3: { mekan: 'plato', x: 1125, y: 55, ad: 'Kuzeybatı ayağı', yaricap: 2.4, ayak: true, tarif: 'Kızağın kuzeybatı köşesindeki hidrolik ayak; pistonu yarıya kadar dışarıda.' },
  ayak_4: { mekan: 'plato', x: 1155, y: 55, ad: 'Kuzeydoğu ayağı', yaricap: 2.4, ayak: true, tarif: 'Kızağın kuzeydoğu köşesindeki hidrolik ayak. Gövdesine dolu taneleri çarpıyor.' },
  hangar: { mekan: 'vadi', x: -8, y: 6, ad: 'Araç hangarı', yaricap: 3, engel: 1.5, tarif: 'Kapsülün batısında, rüzgâra sırtını vermiş kubbeli bir hangar. Yüzey araçları burada.' },
  kizak: { mekan: 'plato', x: 1140, y: 49, ad: 'Tersane kızağı', yaricap: 3, tarif: 'Dört hidrolik ayağın taşıdığı uzun çelik kızak. Rayları enerjiyle uğulduyor.' },
  dagitim_kutusu: { mekan: 'plato', x: 1140, y: 42, ad: 'Dağıtım kutusu', yaricap: 2.2, engel: 0.8, tarif: 'Kızağın ortasında, rüzgâra karşı perçinlenmiş bir enerji dağıtım kutusu. Kapağı açık, yuvaları boş.' },
  bazalt_6: { mekan: 'plato', x: 1110, y: 15, ad: 'Bazalt yığını', yaricap: 2.2, kaynak: 'bazalt', stok: 6 },
  bazalt_7: { mekan: 'plato', x: 1170, y: 64, ad: 'Bazalt yığını', yaricap: 2.2, kaynak: 'bazalt', stok: 6 },
  titanyum_4: { mekan: 'plato', x: 1172, y: 12, ad: 'Devrik anten direği', yaricap: 2.2, kaynak: 'titanyum', stok: 4, tarif: 'Eski bir keşif sondasının rüzgârla devrilmiş titanyum direği.' },
  kseno_damari: { mekan: 'kseno_lab', x: 921, y: 21.5, ad: 'Kseno-kristal damarı', yaricap: 1.8, kaynak: 'kseno', stok: 2, tarif: 'Duvarın dibinden filizlenen, melodik tonlar yayan kadim kristaller.' },
  kalibrasyon_sutunu: { mekan: 'krater', x: 740, y: 24, ad: 'Kalibrasyon sütunu', yaricap: 2, engel: 0.7, tarif: 'Kapının önünde, çanların tam ortasında duran beline kadar bir taş sütun. Dokununca beş perdeli bir dizi çalıyor.' },
  kaide_1: { mekan: 'kseno_lab', x: 903, y: 10, ad: 'Batı kaidesi', yaricap: 1.8, kaide: true, tarif: 'Göğüs hizasında bir taş kaide; üstünde soluk ışıklı bir veri kristali.' },
  kaide_2: { mekan: 'kseno_lab', x: 921, y: 9, ad: 'Doğu kaidesi', yaricap: 1.8, kaide: true, tarif: 'Duvara yaslı bir kaide; kristali hafifçe vızıldıyor.' },
  kaide_3: { mekan: 'kseno_lab', x: 904, y: 20, ad: 'Kuzey kaidesi', yaricap: 1.8, kaide: true, tarif: 'Salonun dibinde, iç kapının yanında bir kaide.' },
  yazit: { mekan: 'mabet', x: 958, y: 7, ad: 'Duvar yazıtı', yaricap: 2, tarif: 'Parmak uçlarınla okunacak kadar derin oyulmuş çizgiler.' },
  harita_kaidesi: { mekan: 'mabet', x: 958, y: 13, ad: 'Yıldız haritası kaidesi', yaricap: 2, tarif: 'Ortadaki kaidenin üstünde avuç büyüklüğünde, ağır bir küre.' },
  // Jeotermal tarım alanı ve kseno-botanik (tarim-ve-kseno-botanik-rehberi; tarim/tarim.js)
  sera_konsolu: { mekan: 'tarim', x: 3004, y: 6, ad: 'Sera konsolu', yaricap: 2, engel: 0.8, tarim: 'konsol', tarif: 'Nemli bir panel; tuşları ılık. Seraların, tohum ambarının ve hasat deposunun kayıtları burada.' },
  ekim_teraslari: { mekan: 'tarim', x: 3012, y: 12, ad: 'Ekim terasları', yaricap: 3, engel: 1.5, tarim: 'sera', tarif: 'Kayaya oyulmuş basamak basamak hidroponik yataklar; borulardan ılık su şırıldıyor, fıskiyeler aralıkla tıslıyor.' },
  vaha_parselleri: { mekan: 'vaha', x: 2812, y: 12, ad: 'Vahanın açık toprak parselleri', yaricap: 3, tarim: 'vaha', tarif: 'Volkanik kül ve çürümüş likenlerle kararmış, yumuşak, sıcak bir toprak. Zehirli fırtına buraya ulaşmıyor.' },
  yabani_mantar: { mekan: 'mantar', x: 1735, y: 30, ad: 'Kadife obsidyen mantarları', yaricap: 2, tarim: 'yabani', tarif: 'Dokununca titreşimi emen, simsiyah, kadife şapkalı mantarlar; kenarlarından spor dökülüyor.' },
  yabani_liken: { mekan: 'tuneller', x: 2665, y: 35, ad: 'Fosforlu damar likeni', yaricap: 2, tarim: 'yabani', tarif: 'Islak duvarda ağ gibi yayılmış, ılık, kaygan bir doku; yüzeyinden su damlıyor.' },
  yabani_sarmasik: { mekan: 'vaha', x: 2846, y: 10, ad: 'Kükürt sarmaşığı', yaricap: 2, tarim: 'yabani', tarif: 'Kalsit kayaya sımsıkı sarılmış sert, lifli bir sarmaşık; gövdesinde hafif bir köpürme fışıltısı.' },
  yabani_hurma: { mekan: 'vaha', x: 2806, y: 34, ad: 'Gece açan vaha hurması', yaricap: 2.4, engel: 1, tarim: 'yabani', tarif: 'Mor salkımlı, ağır meyveli bir ağaç; kılıflarından tatlı bir koku sızıyor.' },
  yabani_bazalt: { mekan: 'vaha', x: 2830, y: 6, ad: 'Bazalt kökü çalısı', yaricap: 2, tarim: 'yabani', tarif: 'Kökleri kayayı delmiş iğneli bir çalı; dibinden derin, sismik bir inilti geliyor.' },
};

// Görünmez yerçekimi alanları: içine girilmez, itilir. Uğultuları yerlerini belli eder.
export const ALANLAR = [
  { mekan: 'kseno_lab', x: 907, y: 7, r: 2 },
  { mekan: 'kseno_lab', x: 917, y: 5.5, r: 2 },
  { mekan: 'kseno_lab', x: 910, y: 15, r: 2.4 },
  { mekan: 'kseno_lab', x: 918.5, y: 18, r: 2 },
];

// Kişiler: kapsülden sağ çıkan öncüler. Adları oyun başında üretilir (durum.murettebat).
// rol: murettebat dizisindeki sıra (0 mühendis, 1 telsizci, 2 hekim)
export const KISILER = {
  muhendis: { rol: 0, mekan: 'vadi', x: 14, y: 9.5, eylem: 'jeneratörün kapağı açık, içine eğilmiş' },
  telsizci: { rol: 1, mekan: 'kapsul', x: 301, y: 3, eylem: 'ranzada, bacağı sargılı' },
  hekim: { rol: 2, mekan: 'kapsul', x: 301.5, y: 5.5, eylem: 'ilaç kutusunu sayıyor' },
};

export const BASLANGIC = { mekan: 'kapsul', x: 303, y: 3.5, yon: 0 };
