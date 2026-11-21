// Tonoflenya'nın kadim tarihçesi (belgeler/tonoflenya-kadim-tarihcesi-ve-kronikler.md). Saf JavaScript.
// On bir bölüm, Tonoflenya'da onları saklayan yerde dinlenir (nokta eylemi kr_<no>); dinlenen bölüm kodekse girer ve
// menüde "Tonoflenya kronikleri"nden yeniden okunur. Bölüm 12 (çağlar matrisi) aynı menüde, açılan bölümlere göre dolar.
// d.kronik = [açılan bölüm numaraları]

import * as SB from './subay';

export const KRONIKLER = [
  null,
  {
    no: 1, baslik: 'Kozmik şafak ve Alt Evren\'in Kara Nüvesi', yer: 'arsiv_kuresi', ipucu: 'YGK kat eksi birdeki arşiv küreleri.',
    metin: [
      'Tonoflenya kendiliğinden oluşmuş bir gezegen değildir: altı ilahi yıldızın iradesiyle örülmüş dev bir lahit, Alt Evren\'in kadim dehşetlerini evrenin kalbinde hareketsiz tutan yaşayan bir hapishane. Malken\'lerin kusursuz şehirlerinin, Tenohris\'in kubbelerinin ve YGK\'nin kulelerinin altında iki taşlaşmış titanın omurgası yatar.',
      'Üst Evren henüz gençken, boyutlar arası dokunun en zayıf alt katmanlarında karanlık bir medeniyet yükseldi: Kryndorim. Madde yoksunluğundan ve varoluş kıskançlığından beslenen büyücüleri, maddeyi ve bilinci kendi karanlıklarına çeken organik bir metafizik virüs yaptı: Kara Nüve.',
      'Kara Nüve bir ordu gibi yürümedi. Yıldız sistemlerine sızınca önce gezegenlerin yerçekimi dengesini bozdu, sonra medeniyetlerin ortak bilincine girip kardeşi kardeşe kırdırdı. Ölen dünyaların enerjisiyle beslenip dokunduğu güneşi karartıyor, ardında yalnız siyah demir ve kül bırakıyordu. İlk dalga Üst Evren\'in binlerce sektörünü haritadan sildi.',
      'Sonunda Üst Evren\'in kadim güçleri Kryndorim\'i buldu ve bir karşı seferle yerle bir etti. Yok oluş anında şehrin hükümdarı ve baş büyücüsü Kahergon, tek bedende kalırsa silineceğini anladı ve varlığını ikiye böldü: Runahar, eril prensip, yıkıcı kinetik kudret ve saf öfke; Runashar, dişil prensip, kara büyü, zihinleri çürüten fısıltılar ve boyutsal manipülasyon.',
      'İkisi Alt Evren\'in yarıklarında asırlarca beslendi. Birleşmelerinden Alt Evren\'in gördüğü en dehşetli zekâ doğdu: Cahelon. Kozmik kayıtlar bu üçlüyü tek bir adla anar: Üçler.',
    ],
  },
  {
    no: 2, baslik: 'Üçler miti: Gezegen Mancınığı ve Kızıl Kıyamet', yer: 'arsiv_kuresi', ipucu: 'Arşiv kürelerinde, birinci bölümden sonra.',
    metin: [
      'Cahelon\'un önderliğinde toparlanan Alt Evren, Üst Evren\'i parça parça almak yerine kökünden kurutacak bir yapıya girişti. Cahelon kara büyüyü boyutsal teknolojiyle birleştirmişti: gezegen kütlelerini mermi gibi fırlatan bir yapı, Gezegen Mancınığı.',
      'Üçler boyutlar arasındaki zarı yırttı; mancınık, trilyonlarca mürit, gölge korvetler ve et-metal yaratıklar Üst Evren\'in sınırına girdi. Nihai silah Cahelon ile Runashar\'ın kara ayinlerle yoğurduğu Kızıl Yutucu\'ydu: yerçekimini, ışığı ve aetheri yuttukça büyüyen akkor bir mini tekillik, yaşayan bir kozmik parazit.',
      'Denemek için mancınığın kızaklarına asteroit kuşağı büyüklüğünde ölü bir kütle kondu ve müreffeh bir uygarlığın ana gezegenine ışık hızına yakın fırlatıldı. Çarpışmada serbest kalan Kızıl Yutucu gezegeni saniyeler içinde yuttu, yüz kat büyüdü.',
      'Sonra Cahelon onu galaksinin merkezindeki süper kütleli kara deliğin yörüngesine fırlattı. Yutucu çekirdeğin enerjisini emmeye başlayınca gökyüzü kana boyandı; eksenler kaydı, yıldızlar birer birer içe çöktü. Kozmik tarih buna Kızıl Kıyamet der.',
    ],
    kopru: (d) => ((d.tamamlananOp || []).includes('kizil_yutucu') ? 'Arşivcinin sesi titriyor: "Kızıl Yutucu\'nun olay ufkunda gördüğün o gezegen boyutundaki mancınık, Kaptan... buydu."' : null),
  },
  {
    no: 3, baslik: 'Koruyucuların inişi ve Tonoflenya hapishanesinin örülüşü', yer: 'aether_cekirdegi', ipucu: 'Tenohris Sarayı\'ndaki Aether Çekirdeği.',
    metin: [
      'Galaksinin dokusu yırtılıp varoluş eşiğe gelince, Yüce İrade\'nin doğrudan emrindeki altı kozmik görevli yuvalarından çıktı: Altı Yıldız Koruyucusu. Zhaor, gümüşi ışık: arınma, mutlak düzen, zamanın akışı. Varek, kırmızı kor: ilahi yargı, ısı, kinetik kudret. Axira, zümrüt: tohum, yenilenme, yaşam ağı. Elyndra, derin mor: aether büyüsü, boyutların dokusu, ruhsal bilinç. Sinha, saf mavi: kozmik bilgelik, soğuk mantık, manyetik akımlar. Uma, altın sarısı: güneş ışığı, bereket, yerçekiminin kararlılığı.',
      'Koruyucular Kızıl Yutucu\'nun merkezine ortak bir rezonans dalgası gönderip çekirdeğini dondurdular ve yok ettiler. Sonra Üçler\'in üstüne indiler. Alt Evren orduları kül oldu. Runahar\'ın kinetik zırhını Varek ile Sinha parçaladı; Runashar\'ın kara kalkanlarını Zhaor ile Elyndra\'nın gümüş-mor ışığı yaktı.',
      'Ama Alt Evren\'in efendileri büsbütün öldürülemezdi; maddeleri Üst Evren\'in atom kurallarına uymuyordu. Koruyucular onları ebedî hapse mahkûm etti: bilinçlerini ilahi bir büyüyle kilitlediler, gezegen boyutundaki bedenlerini taşlaştırdılar.',
      'İki taş bedeni uzay boşluğunda sırt sırta getirdiler; çevrelerini asteroitler, ağır metaller, magma ve tektonik plakalarla ördüler. İki titan yeni dünyanın en derin mantosuna, çekirdeğin hemen altına gömüldü; üstlerine uyanmalarını engelleyecek ilahi bir ağırlık bindirildi. Dünyanın adı kondu: Tonoflenya, "Karanlığın üzerine örülen taş beşik".',
      'Koruyucular göğe kendi mühürlerinin tezahürü olan altı yıldızı yerleştirdi. Bu yıldızlar rastgele dönen gök cisimleri değildir: gece gündüz taş bedenleri baskı altında tutan altı ilahi kilittir.',
    ],
  },
  {
    no: 4, baslik: 'Cahelon\'un laneti ve komşu gezegendeki su mezarı', yer: 'zirve_ignesi', ipucu: 'Zirve İğnesi hizalandıktan sonra, komşu gezegene bakarak.',
    metin: [
      'Savaşın son anlarında, ebeveynlerinin taşlaştırıldığını gören Cahelon karanlık gemisine atılıp kaçmaya çalıştı. Koruyucuların kırmızı yargıcı Varek arkasından ilahi bir lanet oku fırlattı.',
      'Işıktan hızlı lanet gemiyi motorlarından vurdu. Cahelon Tonoflenya\'nın hemen komşusundaki kurak, kayalık bir gezegene çakıldı; çarpma kabuğu yardı. Lanetin ateşini söndürmek, kendini bir kozaya almak için son bir büyü fısıldadı: gezegenin bütün nemi, buharı, yeraltındaki bütün su tek bir noktaya mıknatıs gibi çekildi.',
      'Bütün okyanuslar tek yerde toplanıp kilometrelerce derin, dipsiz, karanlık bir girdap oldu. Cahelon\'un yaralı bedeni bu su mezarının dibine battı ve derin bir uykuya düştü. Sistemde ikili bir mühür kuruldu: ortada iki titana beşik olan Tonoflenya, yanında okyanusun dibinde kıvranan Cahelon.',
      'Göğe çekilmeden önce zümrüt Axira Tonoflenya\'nın taş ve lav kabuğuna indi; toprağa yaşam tohumları serpti, organik bir soluk üfledi, gölleri ve ırmakları başlattı. Sonra Koruyucular yıldızlarına çekilip sessizliğe gömüldü.',
    ],
  },
  {
    no: 5, baslik: 'Malken ırkının doğuşu ve Birinci Çağ', yer: 'konsey_sozcusu', ipucu: 'Elyndra halkasındaki lonca ihtiyarı.',
    metin: [
      'Axira\'nın tohumları gezegenin altındaki aether ve altı yıldızın ayrı ayrı ışığıyla birleşince eşsiz bir ırk doğdu: Malken\'ler. Uzun boylu, solgun beyaz, kusursuz hatlı; gözlerinde Elyndra\'nın mor ışığı. Hem büyüye yatkın hem keskin, analitik bir zekâ.',
      'Altlarında yatan mezardan habersiz ilk Malken\'ler göğe bakıp altı yıldızı koruyucuları olarak selamladı. Böylece Axelum doğdu: altı yıldızın ahengini korumayı, doğa ve aetherle uyum içinde yaşamayı buyuran teokratik bir gök inancı.',
      'İlk altın çağ Kral Tenos ile Kraliçe Harees\'in yönetiminde başladı. Malkenia\'yı kurdular ve ortasına adlarının birleşiminden Tenohris Sarayı\'nı diktiler: oval, silindirik, göğe uzanan saf mermer sütunlar, altı yıldızı yansıtan pencereler.',
      'Devleti kralın başkanlık ettiği Sekizler Konseyi yönetiyordu. İki adı çağlar unutmadı: Valen Lazeria, boyutsal enerji ve uzay-zaman büyüsünün dâhisi, sakin ve ileri görüşlü bir devlet adamı; Kefius Arateon, antik semboller, nekrotik tınılar ve karanlık sanatların üstadı, gölgelerin dilini çözen gizemli bir adam.',
    ],
  },
  {
    no: 6, baslik: 'Tyzrakhel\'in görünmez ışık kulesi ve rahibeler', yer: 'arin_tapinagi', ipucu: 'Uçan Arin Adası\'ndaki keşiş, ikinci kez konuşunca.',
    metin: [
      'Axelum\'un kalbinde halktan tamamen ayrı yaşayan kadın büyücüler vardı: Tyzrakhel Rahibeleri. Tapınakları taştan değildi. Tyzrakhel Kulesi gökte gözle görülmeyen, yalnız rahibelerin derin transıyla ve koro hâlindeki harmonik ilahileriyle astral düzlemde var olan saf ışıktan bir kuleydi.',
      'Rahibeler bedenlerini saraydaki mermer odalarda bırakıp zihinleriyle kuleye yükselir, altı yıldızın titreşimini dinler, gezegenin aether dengesini gözetirdi.',
      'Çağın sonuna doğru kulenin saf ışığında açıklanamaz kızıl damarlar belirdi. Yüksek Rahibe yıldızları dinlerken gökten değil, gezegenin tam kalbinden gelen, yıldızların sesini taklit eden karanlık bir fısıltı duymaya başladı. Runashar\'ın taşlaşmış bilinci asırların sessizliğinden sonra rahibelerin zihnine bir parazit gibi yerleşmişti.',
      'Rahibe, yaklaşan felaketi önlemek için göklerin kan ve kurban istediğine inanmaya başladı. Axelum\'un saf inancı yerin altındaki fısıltıyla yavaş yavaş zehirleniyordu.',
    ],
  },
  {
    no: 7, baslik: 'Kahergonat\'ın doğuşu ve Lord Sharon', yer: 'sinir_kapilari', ipucu: 'Zhaor halkasındaki sınır yolları levhası, Kahergonat yönü.',
    metin: [
      'Kuzeydoğunun en ucunda, göğü durmadan gri ve mor şimşeklerle kaplı çorak bir bozkırda, Alt Evren\'in asırlar önce serptiği karanlık kalıntılar yeniden filizlendi. Kryndorim\'in yıkılışından kurtulup nesiller boyu mağaralarda saklanan beş kıdemli Alt Evren müridi bir araya geldi.',
      'Runahar ile Runashar\'ı uyandırmaya güçlerinin yetmeyeceğini biliyorlardı. Yasak birleşme ayinini yaptılar: Pentagramik Ruh Kaynatması. Beş beden, beş kara bilinç tek bir et ve kemik yığınında eridi. Küllerinden boyu üç metreyi aşan, gözleri dipsiz bir boşluk gibi parlayan, ellerinden siyah plazma fışkıran bir varlık doğdu: Lord Sharon.',
      'Lord Sharon kuzeydoğuda siyah obsidyenden Kahergonat\'ı kurdu. Kahergonat bir yerleşim değil, toprağın altına sivri bir mızrak gibi inen dev bir rezonans yapısıydı. Uçan, sürünen, asit kusan, büyü yapan yaratıklardan bir ordu derledi.',
      'Hedefi açıktı: Malkenia\'yı yerle bir etmek, Tenohris\'in altındaki mühür odasını açmak, taşlaşmış tanrılarını uyandırmak.',
    ],
  },
  {
    no: 8, baslik: 'Tenos ve Harees çağının sonu: ihanetin mızrağı ve Beyaz Kıyamet', yer: 'batik_kule', ipucu: 'Kara Göl\'ün batık kulesi.',
    metin: [
      'Kahergonat\'ın orduları sel gibi güneye aktı. Malkenia surları tarihinin en kanlı kuşatmasını gördü. Malken orduları büyü kalkanları ve aether oklarıyla günlerce direndi; gök mor büyü patlamaları ve kara alevlerle aydınlanıyordu.',
      'Yedinci gün, surların önündeki kan gölünde iki tarafın kaderini belirleyecek bir düello başladı. Kral Tenos ışık saçan altın kılıcıyla bizzat meydana indi; karşısında karanlığın vücut bulmuş hâli Lord Sharon. Her kılıç temasında çıkan sonik şok dalgaları surlardaki askerleri yere seriyordu. Tenos Sharon\'u köşeye sıkıştırdı, kılıcını göğsüne saplamak için kaldırdı.',
      'Tam o anda surların tepesinde Tyzrakhel Yüksek Rahibesi belirdi. Gözleri kararmış, vecd içinde bir göksel büyü mırıldandı ve yıldızların kurban istediği sanrısıyla elindeki saf Işık Mızrağı\'nı Sharon\'a değil, kendi hükümdarının, Kral Tenos\'un sırtına fırlattı.',
      'Mızrak kralın göğsünü delip geçti. Tenos diz çökerken gökte dehşetli bir kırılma oldu: ritüel bozulmuş, kurban edilen kralın saf kanı toprağa sızıp Runahar\'ın mührüne değmişti. Altı yıldız birden karardı.',
      'Gökten neredeyse bir kıta büyüklüğünde, gözleri kör eden saf beyaz bir enerji küresi düşmeye başladı: mührün bozulmasını önlemek için Koruyucuların kurduğu otomatik arınma ve yok ediş protokolü. Beyaz Kıyamet.',
    ],
  },
  {
    no: 9, baslik: 'Valen\'in portalı, Kara Göl ve yitik kuşaklar', yer: 'batik_kule', ipucu: 'Kara Göl\'ün batık kulesinde, sekizinci bölümden sonra.',
    metin: [
      'Beyaz küre şehre değdiği an hiçbir patlama duyulmadı: yalnız varoluşu silen mutlak bir sessizlik ve ışık fırtınası. Şehir, saray, Kraliçe Harees, Lord Sharon ve ordusu saniyeler içinde moleküllerine ayrılıp toprağın derinine çöktü.',
      'O mikrosaniyelerde Sekizler Konseyi\'nin boyutsal büyücüsü Valen Lazeria, son enerjisiyle bir uzay-zaman yarığı açtı. İçine küçük bir grubu fırlattı: antik büyü ustası Kefius Arateon ve Kral Tenos\'un genç oğlu Prens Bagrius da aralarındaydı. Kendisi de peşlerinden atladı. Portal kapandığında eski başkent bütünüyle çökmüştü.',
      'Kıyamet dindiğinde Malkenia\'nın yerinde kilometrelerce geniş, yüzlerce metre derin dipsiz bir krater kalmıştı. Yeraltından sızan zehirli siyah sular onu doldurdu: Kara Göl Krateri.',
      'Ardından karanlık bir fetret devri geldi. Malken nüfusunun yüzde sekseni tek günde yok oldu. Kütüphaneler, genetik kayıtlar, arşivler buharlaştı. Kurtulanlar kantonlara, çöllere, dağlara dağıldı.',
      'Tarih yazıcıları öldüğü için sonraki birkaç yüzyılın anlatıları efsaneye, hurafeye, çelişkili hikâyelere dönüştü. Tarih bölündü, eğip bükülmüştü; geriye yalnız "kral ihanete uğradı ve gök şehri beyaz bir ateşle cezalandırdı" sözü kaldı.',
    ],
  },
  {
    no: 10, baslik: 'Bagrius hanedanı ve bilimin şafağı (İkinci Çağ)', yer: 'bagrius_aniti', ipucu: 'Malazar ocaklarındaki I. Bagrius anıtı.',
    metin: [
      'Valen\'in portalından kurtulan Prens Bagrius yetişkin bir lider olunca halkını yeniden topladı ve tahta I. Bagrius adıyla çıktı.',
      'Babasının ölümüne ve medeniyetin yıkımına yol açan Axelum teokrasisine ve Tyzrakhel rahibelerine derin bir nefret duyuyordu. Tahta geçer geçmez tapınakları kapattı, rahibelerin tarikatını yasadışı ilan etti ve medeniyetin rotasını pozitif bilime, teknolojiye ve rasyonel aether mühendisliğine çevirdi.',
      'Malazar\'ın keşfi: kuzeybatı okyanusunun açığında, yaklaşılmaz fırtınalarla korunan efsanevi dağa bizzat sefer düzenledi. Eteklerindeki kazılarda Malken\'lerin büyü gücünü bin kat artıran, makinelere sınırsız enerji veren saf mor-mavi aether kristalleri ve büyü tozları bulundu. Malazar krallığın endüstriyel kalbi oldu.',
      'Yeni başkent: Kara Göl\'ün doğusunda yeni bir Malkenia kuruldu. I. Bagrius anne ve babasının anısına sarayı eski planına sadık kalarak yeniden yaptırdı ve yine Tenohris adını verdi. Çevresini altı yıldızın frekanslarını dengeleyen altı konsantrik halka şehir sardı.',
      'Akademinin temeli: Valen Lazeria ile Kefius Arateon\'un asırlara meydan okuyan deneyimiyle başkentin kuzeybatısında hem bilimi hem kadim büyüyü sistemli öğreten ilk araştırma atölyeleri kuruldu: bugünkü YGK Akademi\'nin çekirdeği.',
    ],
  },
  {
    no: 11, baslik: 'Restorasyondan derin uzaya: IV. Bagrius çağı (günümüz)', yer: 'kurulus_kitabesi', ipucu: 'YGK kat birdeki kuruluş kitabesi.',
    metin: [
      'I. Bagrius\'un temellerini ardılları büyüttü. II. Bagrius şehirlerin altyapısını kurdu, Flee Plee sahilini imara açtı ve deniz üstünde anlık madde aktaran ışınlanma kentini başlattı. III. Bagrius Fenrir Işık ve Toz Denizi\'ni haritalandırdı, Uçan Arin Adası\'na ilk bilimsel seferleri yolladı, krallığın kalkanlarını yeniledi.',
      'Bugünün hükümdarı IV. Bagrius bu mirası kozmik boyuta taşıdı. Kuzeybatıdaki araştırma kompleksi onun döneminde altı katı göğe, beş katı yerin dibine uzanan on bir katlı bir mega yapıya dönüştü ve YGK Akademi adını aldı; Malken ırkının bütün kozmik ve büyüsel hafızası burada toplandı.',
      'Valen Lazeria, nasıl hayatta kaldığı ve ölümsüzlüğünü nereden aldığı hâlâ bir devlet sırrı olarak, YGK\'nin Baş Yöneticisi ve Yüksek Konsey Başkanı. Kefius Arateon akademinin yeraltındaki yasaklı katlarında karanlık sanatlar ve Alt Evren araştırmaları kürsüsünü yönetiyor.',
      'IV. Bagrius\'un en büyük vizyonu Tonoflenya\'nın sınırlarını aşmak, evrendeki bilinçli ırkları, kadim teknolojileri ve olası Alt Evren tehditlerini kaynağında incelemekti. Bunun için YGK\'den evrenin dört bir yanına uzun menzilli keşif gemileri fırlatıldı.',
      'Bunlardan biri, senin gemin, derin uzayda bilinmeyen bir uzay-zaman fırtınasına yakalanıp vahşi bir dünyaya, Aethelis-IV\'e çakıldı. Orada hayatta kalıp gemini parça parça yeniden kurarken ve kurtarma görevlerini yaparken, aslında Tonoflenya\'nın kadim geçmişine ve yaklaşan kozmik uyanışa uzanan büyük döngünün ilk adımını atıyordun.',
    ],
  },
];

// Bölüm 12: tarihsel çağlar ve dönüm noktaları matrisi. bolum: bu satırı açan kronik bölümü.
export const CAGLAR = [
  { ad: 'Kozmik Şafak', bolum: 1, kimler: 'Kahergon, Runahar, Runashar, Cahelon', yerler: 'Kryndorim şehri, Alt Evren', olay: 'Gezegen Mancınığı ve Kızıl Yutucu ile galaksinin vurulması.', sonuc: 'Galaktik çekirdeğin çöküşü: Kızıl Kıyamet.' },
  { ad: 'Büyük Mühür Çağı', bolum: 3, kimler: 'Altı Yıldız Koruyucusu: Zhaor, Varek, Axira, Elyndra, Sinha, Uma', yerler: 'Tonoflenya, komşu okyanus gezegeni', olay: 'Runahar ve Runashar\'ın taşlaştırılıp gezegene gömülmesi; Cahelon\'un su mezarına hapsi.', sonuc: 'Hapishane gezegen Tonoflenya\'nın doğuşu.' },
  { ad: 'Birinci Malken Çağı', bolum: 5, kimler: 'Kral Tenos, Kraliçe Harees, Valen Lazeria, Kefius Arateon', yerler: 'Eski Malkenia, Tenohris Sarayı, Tyzrakhel Kulesi', olay: 'Axelum teokrasisi; rahibelerin ışık kulesinde astral ritüelleri.', sonuc: 'Medeniyetin ve büyü sanatlarının ilk altın çağı.' },
  { ad: 'Büyük İhanet ve Yıkım', bolum: 8, kimler: 'Lord Sharon (beş mürit), Tyzrakhel Yüksek Rahibesi', yerler: 'Surlar, düello meydanı, eski başkent', olay: 'Rahibenin Kral Tenos\'u Işık Mızrağı\'yla sırtından vurması; Beyaz Kıyamet küresinin düşüşü.', sonuc: 'Eski başkentin Kara Göl Krateri\'ne çökmesi.' },
  { ad: 'Kayıp Fetret Devri', bolum: 9, kimler: 'Mülteci kabileler, ilk kaçaklar', yerler: 'Çöller, Malazar etekleri', olay: 'Arşivlerin yok oluşu, kayıtların parçalanıp çarpıtılması.', sonuc: 'Gerçek tarihin efsanelere dönüşmesi.' },
  { ad: 'İkinci Çağ: Rönesans', bolum: 10, kimler: 'I. Bagrius, Valen Lazeria, Kefius Arateon', yerler: 'Malazar Dağı, yeni Malkenia, Tenohris', olay: 'Teokrasinin tasfiyesi, aether kristallerinin keşfi, büyü-teknoloji sentezi.', sonuc: 'Pozitif bilim ve rasyonel imparatorluğun yükselişi.' },
  { ad: 'Üçüncü Çağ: İmar', bolum: 11, kimler: 'II. ve III. Bagrius', yerler: 'Flee Plee, Uçan Arin Adası, ışınlanma kenti', olay: 'Kıyı kantonlarının modernleşmesi, Fenrir\'in keşfi, teknolojik şehir ağları.', sonuc: 'Tonoflenya\'nın küresel bütünleşmesi.' },
  { ad: 'Dördüncü Çağ: Derin Uzay (günümüz)', bolum: 11, kimler: 'IV. Bagrius, Valen Lazeria, YGK mürettebatı', yerler: 'YGK Akademi (on bir kat), Aethelis-IV', olay: 'YGK\'nin derin uzay keşif programı; gemimizin Aethelis-IV\'e düşüşü.', sonuc: 'Büyük finalin ve kara işaretlerin eşiği.' },
];

export function acikMi(d, no) {
  return (d.kronik || []).includes(no);
}

// Bir noktada dinlenebilecek bölüm: sıradaki açılmamış ve önkoşulu tamam olan
const ONKOSUL = { 2: (d) => acikMi(d, 1), 4: (d) => !!d.bayrak.malazarIzni, 6: (d) => !!d.bayrak.arinDersi, 9: (d) => acikMi(d, 8) };
export function noktadakiBolum(d, noktaId) {
  for (let i = 1; i < KRONIKLER.length; i++) {
    const k = KRONIKLER[i];
    if (k.yer !== noktaId || acikMi(d, i)) continue;
    if (ONKOSUL[i] && !ONKOSUL[i](d)) continue;
    return k;
  }
  return null;
}
export function kronikEylemi(d, noktaId) {
  const k = noktadakiBolum(d, noktaId);
  return k ? [{ id: 'kr_' + k.no, etiket: 'Kronik: ' + k.baslik, ipucu: 'Tonoflenya\'nın kadim tarihçesi, ' + k.no + '. bölüm.' }] : [];
}
export function kronikAc(d, no) {
  const k = KRONIKLER[no];
  if (!d.kronik) d.kronik = [];
  if (!d.kronik.includes(no)) {
    d.kronik.push(no);
    d.kronik.sort((a, b) => a - b);
    if (!d.kodeks.some((x) => x.id === 'kronik_' + no)) {
      d.kodeks.push({ id: 'kronik_' + no, ad: 'Kronik ' + no + ': ' + k.baslik, tarif: k.metin[0], itibar: 15 });
      d.itibar += 15;
    }
    SB.ekolKazan(d, 'uma', 20);
  }
  const kopru = k.kopru ? k.kopru(d) : null;
  return { metin: [k.no + '. bölüm. ' + k.baslik + '.', ...k.metin, kopru].filter(Boolean).join(' '), ses: 'sinyal' };
}

// Menü: bütün bölümler (açılmamışların yerinde nerede bulunacağı) ve çağlar matrisi
export function kronikListesi(d) {
  return KRONIKLER.filter(Boolean).map((k) => ({ no: k.no, baslik: k.baslik, acik: acikMi(d, k.no), ipucu: k.ipucu }));
}
export function caglarListesi(d) {
  return CAGLAR.map((c) => (acikMi(d, c.bolum) ? { ad: c.ad, acik: true, metin: c.ad + '. Liderler ve figürler: ' + c.kimler + '. Kritik mekânlar: ' + c.yerler + '. Dönüm noktası: ' + c.olay + ' Kozmik sonuç: ' + c.sonuc } : { ad: c.ad, acik: false, metin: c.ad + ': kroniğin ' + c.bolum + '. bölümünü bulunca açılır.' }));
}
