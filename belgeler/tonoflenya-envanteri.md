# Tonoflenya envanteri: karakterler, görevler, hikâye sekansları

Bu belge oyunun şu anki kodundan (sürüm 4.8) otomatik çıkarıldı; oyunda olan her şey burada olduğu gibi yazılıdır. Yeni büyü kolu ve akademi içeriğini hazırlarken çakışma olmasın diye başvuru kaynağıdır. Bölümler: 1 Tonoflenya'ya bağlantı ve dönüş, 2 Mekânlar, 3 Karakterler, 4 Ana hikâye (yirmi büyük görev ve son), 5 Zirve İğnesi (4B), 6 YGK Akademisi, 7 Bölgesel lider zincirleri ve ambargo, 8 Otuz yan görev, 9 Kronikler, 10 Sistemler, 11 Yeni içerik için boş ve güvenli bağlantı noktaları.


## 1. Tonoflenya'ya ilk bağlantı ve dönüş

Tonoflenya'ya gitmek için gereken üç koşul (Aethelis'teki koloniden):

- Sınıf III ya da üstü bir gemi (Aethel Muhafızı bilim kruvazörü)
- çok ırklı bir koloni: en az iki kurtarılmış topluluk (Kaelith, Kithron, Vaelin ya da Aethel-9 madencileri)
- derin uzayda en az 10 tamamlanmış operasyon (şimdi 0)

- Koşullar sağlanınca Gözcü Tepesi'nde "YGK frekansını ara" eylemi açılır: frekans ayarı (hedef 32-48). Kilitlenince ygk_frekansi sahnesi oynar ve uzay haritasında YGK Feneri belirir.
- Gemiyle YGK Feneri'ne gidip kenetlenince sıçrama başlar (8 saat; yolda zaman akar). Gemi Tonoflenya limanına iner, kaptan YGK Akademisi'nin beşinci katında (gemi iskelesi) başlar.
- İlk varışta tonoflenya_varis sahnesi; sonraki gelişlerde tonoflenya_tekrar. Aethelis'e dönüş YGK beşinci kattaki gemi iskelesinden (aethelis_donus sahnesi; plato).
- İlk varışta kabul masasından YGK kaydı yapılır (ygkKayit). Büyük görevlerin çoğu, yan görevler ve akademi bu kayda bağlıdır.


### Sahne: YGK frekansı

Parazitin içinden altı ayrı ton yükseliyor; her biri başka bir yıldızın rengi. Sonra bir ses: YGK Akademi'nin otomatik feneri, seni yıllar önce derin uzaya fırlatan akademinin çağrısı. Hafızanda bir kapı açılıyor: kat 5'teki gravitasyonel katapult, alt-uzay sıçraması, dengesizlik, Aethelis-IV'e düşüş. Görev emrin hiç bitmemişti. Zarek: "Kaptan, bu frekansın ardında bir hiper-sıçrama koridoru var. Haritaya işliyorum: YGK feneri." Uzay haritasında YGK feneri belirdi. Sınıf III ya da üstü bir gemiyle kenetlenince Tonoflenya'ya sıçrarsın; yolculuk sekiz saat sürer, koloni o sürede kendi başına yaşar.


### Sahne: Tonoflenya

Sekiz saatlik alt-uzay uğultusu diniyor; manyetik frenler kilitleniyor: klank, tısss. Koridorun sonunda gökyüzü hiç kararmıyor: altı yıldız. Gümüşi Zhaor, kızıl Varek, zümrüt Axira, ametist Elyndra, mavi Sinha ve altın Uma; üç ikili çift birbirinin çevresinde dönüyor. Gemi YGK Akademi'nin beşinci katındaki yerçekimi iskelesine kilitleniyor. Hoparlörlerden binlerce öğrencinin uğultusu ve uzak bir ilahi. Gökte altı yıldızın altı notalı çan akoru. İskelede iki kişi bekliyor. Baş Yönetici Valen Lazeria: "Demek Aethelis'ten geri dönen kayıp kaptan sensin... Yıllar önce kat beş katapultundan fırlatıldığında görev emrin kapanmamıştı. Hoş geldin." Antik Büyü Ustası Kefius Arateon: "Zamanımız dar, Valen. Altı yıldızın kilidi titriyor ve Kara Göl'ün altındaki mühür çatlıyor. Bu kaptanın getirdiği Aethelis teknolojisi olmadan Tonoflenya ayakta kalamaz." Şu an Gümüş Şafak nöbeti: gökyüzüne Zhaor hâkim. Akademinin kabul masası birinci katta; asansör iskelenin yanında. Önce kendini bildir.


### Sahne: Tonoflenya

Altı yıldızın altına yeniden çıkıyorsun; gemi YGK'nin yerçekimi iskelesine kilitlendi. Gümüş Şafak nöbeti.


### Sahne: Aethelis-IV

Sekiz saatlik sıçramanın sonunda Aethelis-IV'ün fırtınası gövdeyi dövüyor; gemi plato kızağına oturuyor.


## 2. Mekânlar


### 2.1 Şehir ve akademi (yürünebilir mekânlar)

- **YGK Kat 6: Yüksek Konsey ve Gözlemevi** (ygk_6): Yüksek kubbenin yankısı ve altı yıldızın çan tonu. Konsey salonu ve akademinin tepesindeki kristal kule: altı yıldızın ışığını odaklayan Zirve İğnesi başının üstünde vınlıyor; camlara gümüşi rüzgâr vuruyor.
- **YGK Kat 5: Yerçekimi İskelesi, Aether Simya Laboratuvarı ve Kseno-Seralar** (ygk_5): Keşif gemilerinin kilitlendiği yerçekimi iskelesi ve seni yıllar önce fırlatan katapult. Yanında bin iki yüz ile iki bin dört yüz hertz arası kristal armonisi: melez zanaat laboratuvarı ve fıskiyeleri fısıldayan kseno-seralar.
- **YGK Kat 4: Kartografya, Kütüphane ve Taktik Simülatör** (ygk_4): Sayfa ve parşömen hışırtısı, saat tiktakları; Kefius'un boyut haritaları ve Profesör Püskül'ün rafları. Bir köşede sesi yutan akustik körleme simülatörü.
- **YGK Kat 3: Kristal İhtisas ve Zanaat Atölyeleri** (ygk_3): Çekiç sesleri ve kristal törpüleme; büyü mühürlerinin gemi gövdelerine kazındığı magitech tezgâhları. Havada ozon ve sıcak kristal kokusu.
- **YGK Kat 2: Yıldız Ekolleri Amfileri ve Cep-Park** (ygk_2): Öğrenci uğultusu ve cep-boyut rüzgârı; rota haritalarının çıkarıldığı amfiler, kseno-dilbilim derslerinin fısıltıları ve havalandırma şebekesinin boru yankıları.
- **YGK Kat 1: Varış Avlusu ve Ağır Plazma Talimgâhı** (ygk_1): Mekik motorları ve plazma talim atışları; beyaz sütunlu kabul meydanı, diplomatik salonlar ve öğrenci kapıları. Seksen bin kişilik akademinin kalbi burada atıyor.
- **YGK Kat -1: Röle ve Mekik İskelesi, Yeraltı Arşivleri** (ygk_m1): Kırk hertzlik röle uğultusu ve Tether-Key mekik terminali; ardında milyonlarca yıllık kayıtların sesli küreler hâlinde saklandığı labirent. Ses kendiliğinden kısılıyor.
- **YGK Kat -2: Sessiz Arşivler ve Disiplin** (ygk_m2): Tam sessizlik; uzaktan kapı sürgüleri. Aether frekanslarını duymayı öğreten yalıtım hücreleri; duvarlar kendi kalbinin sesini geri veriyor.
- **YGK Kat -3: Malazar Çatlağı ve Yasak Kronikler** (ygk_m3): Mağara akustiği, kristal çatırtısı; dağın kökünden gelen çatlak, karantinadaki kseno-örnekler ve yasak kroniklerin dolapları. Astral geçidin soğuk nefesi.
- **YGK Kat -4: Kadim Stasis Hücreleri ve Enerji Çekirdeği** (ygk_m4): Kriyo-tüp nabızları; tehlikeli tutsakların hücreleri ve akademinin bütün kalkanını taşıyan lav ve soğuk füzyon çekirdeği. Manyetik soğutma havuzları köpürüyor.
- **YGK Kat -5: Sıfırıncı Karanlık ve Dünya Çivisi** (ygk_m5): Gezegenin omurgası; uzay-zaman kırılmalarının incelendiği, kadim kalıntıların mühürlendiği en derin nokta. Boyut yarığı kuyusundan soğuk bir çekim geliyor.
- **Malkenia, 6. halka: Zhaor** (halka_zhaor): Gümüş dış savunma ve kalkan kuleleri. Şehri saran enerji bariyeri derin bir uğultuyla titreşiyor; devriyelerin adımları taş surlarda yankılanıyor.
- **Malkenia, 5. halka: Varek** (halka_varek): Kızıl dökümhaneler ve ağır sanayi ağı. Fırınların kükremesi, uzaktan çekiç ritmi, plazma meşalelerinin cızırtısı.
- **Malkenia, 4. halka: Axira** (halka_axira): Zümrüt asma bahçeler ve hidroponik teraslar. Sulama kanallarının şırıltısı, yabancı kuşların ötüşü, yaprak hışırtısı.
- **Malkenia, 3. halka: Sinha** (halka_sinha): Mavi kuantum iletişim ve ticaret halkası. Kalabalık uğultusu, dijital çanlar, üstünden süzülen hava araçları.
- **Malkenia, 2. halka: Uma** (halka_uma): Altın meydanlar ve sosyal yaşam. Fıskiyeler, gevşek sohbetler, taş zeminde adımlar.
- **Malkenia, 1. halka: Elyndra** (halka_elyndra): Mor kadim loncalar ve Yüksek Konsey. Uzaktan koro mırıltısı, tütsü mangallarının çıtırtısı, derin taş salonların yankısı.
- **Tenohris Sarayı** (tenohris): Şehrin geometrik merkezinde bin beş yüz metre yükselen saray: köşesi, sütunu yok; sanki yukarı doğru donmuş tek bir sıvı kristal damlası. Malken Yüksek Meclisi ve Gezegenler Arası Egemenlik Makamı burada.
- **Kara Göl ve Büyük Krater** (kara_gol): Batı surlarının hemen ardında kilometrelerce genişlikte bir krater; dibi görünmeyen, zift gibi koyu mor-siyah sular. Birinci Çağ'ın başkenti bir aether patlamasıyla burada yok olmuştu. Sudan fısıltılar yükseliyor.
- **Doğu çöl kantonları** (dogu_kanton): Altın kumulların başladığı kurak platolarda soylu ve tüccar klanlarının malikâneleri: yerçekimi sönümleyicili özel vahalar, aether hamamları, yüksek kuleler.
- **Flee Plee sahil şeridi** (flee_plee): Malkenia ile Fenrir Denizi arasında kıvrılan beyaz kumlu sahil: kavisli organik villalar, balıkçı köyleri, aether fenerleri. Kumun üstünde ışıldayan bir toz sürükleniyor.
- **Tentran platform kenti (Aether-Dock)** (aether_dock): Kıyıdan fersahlarca uzakta, Fenrir'in derin sularının üstünde yükselen metal ve kristal platform. Karadan köprü yok; Tonoflenya'nın yıldız gemileri burada monte edilip fırlatılıyor.
- **Fenrir Işık ve Toz Denizi** (fenrir): Sıvılaşmış aether kristalleri, foton tozu ve minerallerle kaplı bir deniz. Kayığın manyetik kalkanı ışıldayan tozun üstünde süzülüyor; metal bir gemi burada batardı.
- **Uçan Arin Adası** (arin): Denizin onlarca metre üstünde havada asılı bir kaya ve orman kütlesi; ters-yerçekimi kristalleriyle dolu. Malken keşişlerinin inzivaya çekildiği antik tapınaklar burada.
- **Veradon liman kasabası** (veradon): Malken topraklarının bittiği son resmî sınır: taş rıhtımlar, gümrük kuleleri, hanlar. Ötesinde güney kıtasının bağımsız ve tekinsiz krallıkları.
- **Malazar Dağı** (malazar): Okyanusun sert dalgaları arasında yükselen sarp, sisli zirve. Havaya karışan kristal tozları yüzünden tepesinde durmadan mor şimşekler çakıyor.
- **Malazar'ın aether ocakları** (malazar_ocaklari): Dağın altına yüzlerce kilometre oyulmuş tüneller. Duvarlarda mor titreşen aether kristalleri, havada büyü tozu; uzakta kazmaların yankısı.


### 2.2 Atlas mekânları (bölge haritasıyla seyahat)

- **Axira Çemberi** (axira_cemberi): Sarayı şehirden ayıran geniş, oval meydan. Taban taşları gündüz yıldız ışığını hapseder, ışıklar kısılınca zeminden yukarı yumuşak, kılavuz bir ışıltı yayar. Sarayın kristal katmanları yukarı doğru renk değiştiriyor: tabanda donuk mavi-gri, ortada mor, yeşil, turkuaz, zirvede saf aether.
- **Kristal Teraslar** (kristal_teraslar): Şehir surlarının dışında, kuzey yamaçlarda rüzgârla beslenen ve büyü kristallerinin yetiştirildiği basamaklı teraslar; her esintide yüzlerce kristal çınlıyor.
- **Taş Çember Köyleri** (tas_cember): Doğu iç kesimde Axira Irmağı boyunca dizilmiş dairesel köyler; ırmak şırıldıyor, su değirmenleri dönüyor.
- **Gümüş Tüy Takımadaları** (gumus_tuy): Kıyılarında rüzgârla gümüş gibi dalgalanan sazlıkların yetiştiği uzun, ince adalar zinciri. Malazar seferlerinin ilk ikmal ve sığınak üssü.
- **Gözlem Adaları** (gozlem_adalari): Malazar ile Zeris arasında serpiştirilmiş küçük kayalıklar; deniz fenerleri, akıntı rasathaneleri, ışık gözlem kuleleri. Mormon'un akıntıları burada doğrusal değil, Malazar'ın çevresinde spiral halkalar hâlinde dönüyor.
- **Halyon Adası** (halyon): Öbür adalardan uzak, bağımsız, büyük bir kara parçası: YGK denetiminde tehlikeli büyü deneyleri yapan bilginlerin ve Magentor'dan sürülen asi büyücülerin tutulduğu yarı sürgün, yarı araştırma merkezi.
- **Zeris Kulesi, Kuzey Gözü** (zeris): Mormon'un tam kuzeyinde, batmaz bir kaya kütlesinin üstüne kurulmuş, atmosferin sınırına uzanan ince kristal-metal kule.
- **Valdren Tundrası** (valdren): En batıda, dondurucu rüzgârların estiği, yosun ve liken kaplı düzlükler.
- **Norvask Buz Krallığı** (norvask): Mormon kıyısında donmuş fiyortlara kurulu sert denizciler ülkesi: balina ve deniz canavarı avcıları, buz gemisi ustaları.
- **Helgar Kara Buz Dükalığı** (helgar): Dağlık iç kesimde, erimeyen siyah buz kütlelerini işleyip kırılmaz zırh ve yapı üreten sanayi dükalığı.
- **Drahmir Krallığı** (drahmir): Mavi Hardrin'in kuzey koluna yaslanan tampon krallık; Kahergonat Yolu'nu tutar. Kuzey buzullarıyla doğu çölleri arasındaki tek geçit.
- **Malazar: Hâle Bölgesi** (malazar_hale): Sürekli dönen büyü fırtınaları, iyonize şimşekler ve öldürücü aether akımları. Her nefeste ağzında metal tadı.
- **Malazar: Tepe ve Pelerin Zirvesi** (malazar_zirve): Yoğun toz bulutları ve kristalleşmiş buzullar; fani gözün seçemediği, saf kozmik gücün yoğunlaştığı kutsal doruk.
- **Loran Vadisi** (loran): Zinas'ın ortasında dik falezlerle korunan ada-vadi: dış kayalıklarda dalgalar kırılırken içeride ılıman, sakin bir sığınak. YGK ile ortak deniz biyolojisi ve dalga enerjisi istasyonları.
- **Julithan Cumhuriyeti** (julithan): Batı Kıtası'nın doğu sahilinde tüccar ve diplomatlar cumhuriyeti; Magentor'dan gelen bütün ticaret bu limanlardan girer. Bürokratik meclisler, batının beyni.
- **Anitor Krallığı, Brastion** (anitor): Açık okyanusa bakan fırtınalı kıyıda feodal askerî devlet; başkent Brastion dev hisarlarla çevrili. Korzel Burnu ve Darnak Limanı hem savaş filolarını hem batı korsanlarını barındırır.
- **Filtra, Kızılkaya Filtrum** (filtra): Kırmızı-kahverengi oksitlenmiş metal görünümlü dağların arasındaki yüksek platoda ağır sanayi kenti: nadir alaşımlar, Malken büyüsüyle kaba mekaniği birleştiren zırh ve top dökümü.
- **Safran Sıradağları** (safran): Julithan ve Anitor'un bütün güneyini duvar gibi kapatan sarı ve turuncu kükürtlü kayalıklar. Ötesi henüz haritalanmamış.
- **Gri Yel Burcu ve Zorah'ın batı kenarı** (gri_yel): Magentor'un doğu kapısı; ardında yarı kurak ticaret sahası: sınır kaleleri, kervansaraylar, kum büyücüleri loncası. Kristalli toprak burada kuru rüzgâra dönüyor.
- **İç Dune Kuşağı ve Ajmero Kulesi** (ajmero): Durmadan yer değiştiren dev kum tepelerinin ortasında göğe yükselen Ajmero Kulesi ve çevresindeki oval taş sunak. Rüzgâr kuleye çarptıkça sesli bir rezonans yayılıyor.
- **Kuzey Gölge Hattı** (golge_hatti): Mavi Hardrin'in eteklerine vuran, dağların gölgesinde kalmış sisli ve soğuk kum kuşağı.
- **Güney Cam Düzlükleri** (cam_duzlukleri): Antik plazma ve büyü patlamalarında eriyip dev cam levhalara dönüşmüş kum: ayna gibi parlak, son derece kaygan, tehlikeli.
- **Doğu Kırık Vadi** (kirik_vadi): Yer kabuğunun yarıldığı yerde antik şehir kalıntıları ve kurumuş nehir yataklarıyla dolu derin bir kanyon labirenti.
- **Mavi Hardrin Dağları** (hardrin): Gece kayalarındaki aether damarlarından mavi ışık sızdıran dev bir jeolojik büyü duvarı. Büyü pusulaları sapıyor, yön duygusu kayboluyor, yer yer gerçeklik katlanıyor. Üç boğaz: Nirdol Boynu, Morluk Kapısı, Kahergonat Yolu.
- **Kahergonat** (kahergonat): Sis ve kara buzun birleştiği uçurumlara oyulmuş şehir: sönmüş tanrıların sunakları, siyah bazalt kuleler, ışığı yutan dar kanyonlar. Alt Evren kalıntılarının ve unutulmuş tarikatların sığınağı.
- **Tharal Krallığı** (tharal): Tarım ve orman arazileriyle geleneksel feodal bir krallık; Fenrir tozu ticaretiyle zenginleşmiş.
- **Nerya Şehir Devletleri** (nerya): Kanallarla bölünmüş, ticaret loncalarının yönettiği zengin sahil kentleri.
- **Oredan Dükalığı** (oredan): Mor Anzelon Dağları'nın güney geçitlerini tutan askerî dükalık.
- **Keralon Bataklıkları** (keralon): Büyülü gazların ve kseno-canlıların kaynaştığı, yolculuğu son derece riskli bataklık kuşağı.


### 2.3 Atlas bölgeleri (34) kuşaklara göre

**Merkez kuşak**: Magentor, başkent Malkenia, YGK Akademi, Kristal Teraslar, Taş Çember Köyleri.

**Kuzey kuşağı**: Gümüş Tüy Takımadaları, Gözlem Adaları, Halyon Adası, Malazar Dağı, Zeris Kulesi, Valdren Tundrası, Norvask Buz Krallığı, Helgar Kara Buz Dükalığı, Drahmir Krallığı.

**Batı kuşağı**: Loran Vadisi, Julithan Cumhuriyeti, Anitor Krallığı, Filtra Oksit Dağları, Safran Sıradağları.

**Doğu kuşağı**: Gri Yel Burcu (Zorah'ın batı kenarı), Ajmero Kulesi (İç Dune Kuşağı), Kuzey Gölge Hattı, Güney Cam Düzlükleri, Doğu Kırık Vadi, Mavi Hardrin Dağları, Kahergonat.

**Güney kuşağı**: Fleeplee sahili, Tentran platform kenti (Aether-Dock), Fenrir Işık ve Toz Denizi, Arin Ada Krallığı, Veradon liman kenti, Tharal Krallığı, Nerya Şehir Devletleri, Oredan Dükalığı, Keralon Bataklıkları.

Seyahat rotaları: 40 rota (gün, yolculuk biçimi, tehlike). Tehlikeler: .


## 3. Karakterler


### 3.1 Galaktik karakter ağı (14 kişi)

- **Valen Lazeria**, YGK Yüksek Konsey Rektörü (güç: YGK Akademi; yer: YGK Kat 6: Yüksek Konsey ve Gözlemevi; akademiye misafir gelebilir). Uzun boylu, sakin; konuştukça salonun kristal duvarları hafifçe titriyor. Sekizler Konseyi'nden kalan son dâhi; Akademinin Baş Yöneticisi.
- **Morvenna Kael**, Yüksek Konsey Vekili (güç: YGK Akademi; yer: YGK Kat 6: Yüksek Konsey ve Gözlemevi; akademiye misafir gelebilir). Gri cüppeli, keskin bakışlı bir Malken; Konsey'in tutanaklarını ezbere bilir.
- **Kefius Arateon**, Kartografya ve Alt-Evren Kürsüsü Kıdemli Arkanisti (güç: YGK Akademi; yer: YGK Kat 4: Kartografya, Kütüphane ve Taktik Simülatör; akademiye misafir gelebilir). Kat dördün sessiz çalışma odasında, boyut haritalarının arasında; sesi kadim bir rezonansla karışıyor.
- **Ignador**, Ağır Plazma Talimgâhı Eğitmeni (güç: YGK Akademi; yer: YGK Kat 1: Varış Avlusu ve Ağır Plazma Talimgâhı; akademiye misafir gelebilir). Kat birin dış muhafız amfisinde, plazma mermilerinin kokusu arasında; eski Zeris Kulesi muhafızı. Konuşkan, Konsey'e diş bileyen bir taktik ustası.
- **Tixie**, Zefiryum kökenli teknopat kaçak (güç: YGK Akademi; yer: YGK Kat 2: Yıldız Ekolleri Amfileri ve Cep-Park; akademiye misafir gelebilir). Kat ikinin cep-parkı ile havalandırma şebekesi arasında yaşayan, sesi borulardan yankılanan ufak bir kaçak.
- **Lyra**, Aether Simya Laboratuvarı optikçisi (güç: YGK Akademi; yer: YGK Kat 5: Yerçekimi İskelesi, Aether Simya Laboratuvarı ve Kseno-Seralar; akademiye misafir gelebilir). Kat beşin laboratuvarında Loran söğüdü reçinesiyle mercek döken bir Malken.
- **Nyxara Vel'din**, Arin'den sürgün eski baş mucit (güç: Güney, Fleeplee ve Veradon; yer: Tentran platform kenti (Aether-Dock)). Tentran kıyısında, platformun kuytusunda kendi atölyesinde çalışıyor. Resmî Arin elçisi değil; elçi Aethelgard.
- **Oronte**, Filtra Maden Sendikası önderi (Batı Kuşağı) (güç: Batı ve Filtra Sendikası; yer: Filtra, Kızılkaya Filtrum). Yarı-sentetik bir maden önderi; sesi pistonlu bir göğüs kafesinden geliyor. Akademinin tutsağı değil, Batı'nın lideri.
- **Cüretkâr Cüce**, Filtra madenlerinin sondaj ustası (güç: Batı ve Filtra Sendikası; yer: Filtra, Kızılkaya Filtrum). Omzunda koca bir matkap taşıyan, kahkahası kayaları titreten kısa boylu bir usta.
- **Kaelan**, Helgar kara buz zırh ustası (güç: Kuzey, Zeris ve Mormon; yer: Helgar Kara Buz Dükalığı). Erimeyen siyah buzun yanında örs başında; zırhı kemik gibi esneten bir usta. Akademinin tutsağı değil, kendi bölgesinde yaşıyor.
- **Kaptan Barracuda**, Fleeplee Toz Sahili korsan kaptanı (Güney Kuşağı) (güç: Güney, Fleeplee ve Veradon; yer: Flee Plee sahil şeridi). Veradon Donanması'na açıkça düşman; limana değil, toz sahilindeki batık bir kadırgaya kurulmuş. Sesi tuzlu ve alaycı.
- **Silahşör Zeno**, Zorah Kervan Yolu muhafızı (Doğu Kuşağı) (güç: Doğu, Zorah Çöl Loncası; yer: Gri Yel Burcu ve Zorah'ın batı kenarı). Yolboyu Hanı'nın gölgeli verandasında, kum büyücüleriyle kâğıt oynuyor; tabancasının horozu ara ara tıkırdıyor.
- **Mirelza**, Zeris Dış Kulesi sonik sürgünü (Kuzey Kuşağı) (güç: Kuzey, Zeris ve Mormon; yer: Zeris Kulesi, Kuzey Gözü). Zeris Kulesi'nin dış basamaklarında, rüzgârın çığlığıyla şarkı söyleyen bir sürgün. Akademinin tutsağı değil.
- **Sarah**, Loran Vadisi botanikçisi (güç: Batı ve Filtra Sendikası; yer: Loran Vadisi). Dalga enerjisi istasyonunun yanında, falezlerin kovuğunda kendi serası; ellerinden yosun kokusu eksik olmuyor.


### 3.2 Gemi subayları (altı ekol)

- **Elyndra Val-Tarek** (Malkenia 4. Halka; istasyon: Rezonans Çekirdeği ve Büyü-Reaktör Odası). Mor aether akımları ve kristal enerji hatlarında dahi bir kuramcı; YGK eksi üçüncü kattaki reaktör tasarım ekibinden. Soğukkanlı, analitik ve iğneleyici konuşur.
- **Varek Kaelon** (Malkenia 2. Halka; istasyon: Taktik Köprü ve Ağır Silah Bataryası). Askerî akademiden; savaş büyüleri ve ağır plazma bataryalarında uzman sert bir Malken askeri. Saldırgan stratejileri ve hızlı baskınları savunur.
- **Dr. Axira Nerys** (Malkenia 3. Halka; istasyon: Kseno-Laboratuvar, Biyo-Kubbeler ve Revir). Canlı dokular, kseno-botanik, yabancı ekosistemler ve mikrobiyoloji uzmanı; Aethelis-IV tohumlarının evcilleştirilmesinde başrolde. İnsancıl, şefkatli; biyolojik tehditte acımasızca rasyonel.
- **Zhaor Vel-Amin** (Malkenia 1. Halka; istasyon: Dümen ve Harita Masası). Gümüş Yıldız ekolünden bir dümenci; şemadaki seyrüsefer istasyonunun subayı. Rota hesaplarını yüksek sesle, sakin bir sayımla yapar.
- **Sinha Mar-Zul** (Malkenia 5. Halka; istasyon: Akustik Dinleme Odası ve Spektrum Analiz Masası). Doğuştan kör; Malken'lerin ses ve rezonans duyusunu doruğa taşımış. Uzayın yerçekimi dalgalarını ve yıldız frekanslarını piyano notaları gibi ayırır. Melodik, fısıltılı, tane tane konuşur.
- **Başçavuş Drahmir Oksid** (Batı Kıtası Filtra Oksit Dağları ve Kuzey Drahmir Sınırı karması; istasyon: Hangar, Dökümhane ve Basınç Odaları). Kristal büyüleriyle uğraşmayan; çekiçte, çelikte, hidrolikte ve kaynakta ustalaşmış emektar bir usta. Ağır zırh kaplamalarından ve yüzey keşif araçlarından sorumlu.


### 3.3 YGK Akademisi kürsüleri ve tutsaklar (14)

- **Korvinus Vael**, Anti-Büyü Kürsüsü (YGK Kat 3: Kristal İhtisas ve Zanaat Atölyeleri; final görevi üçten sonra). Kat üçün köşesinde, bozuk rezonans kalkanlarının arasında kuru, dikkatli bir öğretmen.
- **Silas Vex**, Gölge ve Psikometri Kürsüsü (YGK Kat -2: Sessiz Arşivler ve Disiplin; final görevi üçten sonra). Eksi ikinin sessiz arşivlerinde, disiplin odasının gölgesinde; varlığını ancak konuşunca fark ediyorsun.
- **Forges**, Mekanik ve Enerji Kürsüsü (YGK Kat 3: Kristal İhtisas ve Zanaat Atölyeleri; final görevi birden sonra). Kat üçün zanaat atölyesinde çekiç sesleri arasında; kolları kristal tozuyla kaplı, iri bir usta.
- **Jolkar Tectus**, Rünler ve Antik Dil Kürsüsü (YGK Kat -3: Malazar Çatlağı ve Yasak Kronikler; final görevi altıdan sonra). Eksi üçteki Malazar çatlağının ağzında, kristal çatırtıları arasında yazıtlara eğilmiş yaşlı bir rünbilim ustası.
- **Faelan Cinder**, Hata Büyüsü Kürsüsü (YGK Kat 2: Yıldız Ekolleri Amfileri ve Cep-Park; final görevi birden sonra). Kat ikinin amfilerinden birinde, eli hep biraz yanık, gülerek konuşan bir genç usta.
- **Trellis-7**, Kseno-Botanik ve Zehir Kürsüsü (YGK Kat 5: Yerçekimi İskelesi, Aether Simya Laboratuvarı ve Kseno-Seralar; final görevi üçten sonra). Kat beşin kseno-seralarında, sporlu odanın camının ardında nefes ritmiyle konuşan bitkimsi bir eğitmen.
- **Seraphine 'Işık Yolu' Rael**, Şifa ve Empati Kürsüsü (YGK Kat 5: Yerçekimi İskelesi, Aether Simya Laboratuvarı ve Kseno-Seralar; final görevi üçten sonra). Kat beşin sera fıskiyelerinin yanında; sesi yumuşak, elleri ılık bir şifacı.
- **Caelum Nokturnus**, Astral Seyahat Kürsüsü (YGK Kat -3: Malazar Çatlağı ve Yasak Kronikler; final görevi altıdan sonra). Eksi üçteki astral geçidin kıyısında; konuşurken sesi bir yakından bir uzaktan geliyor.
- **Kaelis 'Echo' Duman**, Ses ve İllüzyon Kürsüsü (YGK Kat 2: Yıldız Ekolleri Amfileri ve Cep-Park; final görevi birden sonra). Kat ikinin akustik odasında; senin sesini senden önce taklit eden bir illüzyon ustası.
- **Zeva 'Kılavuz' Thorne**, Mekik ve Denge Kürsüsü (YGK Kat 3: Kristal İhtisas ve Zanaat Atölyeleri; final görevi üçten sonra). Kat üçteki denge platformunun başında; mekik pilotlarının hocası, sakin ve kesin.
- **Profesör Püskül**, Kütüphane ve Kartografya (YGK Kat 4: Kartografya, Kütüphane ve Taktik Simülatör). Kat dördün kütüphanesinde, sayfa hışırtıları ve saat tiktakları arasında yaşlı, dalgın bir profesör.
- **Maelis**, Röle ve Mekik İskelesi Görevlisi (YGK Kat -1: Röle ve Mekik İskelesi, Yeraltı Arşivleri). Eksi birin kırk hertzlik röle uğultusunda, Tether-Key mekik terminalinin başında.
- **Zephyra, Göğün Hiddeti**, Stasis tutsağı (YGK Kat -4: Kadim Stasis Hücreleri ve Enerji Çekirdeği). Dar bir kriyo hücresinde kanatlarını açamayan bir atmokinezi ustası; nefesi hızlı, hücrenin camı buğulu.
- **Morwenna**, Stasis tutsağı, eski Tyzrakhel rahibesi adayı (YGK Kat -4: Kadim Stasis Hücreleri ve Enerji Çekirdeği). Sessiz bir kriyo tüpünde; sesi duvarların içinden, bir sağdan bir soldan geliyor.


### 3.4 Şehirdeki görevliler (konuşulan noktalar)

- **Kabul masası** (YGK Kat 1: Varış Avlusu ve Ağır Plazma Talimgâhı): Uzun, beyaz bir masa; arkasında mor gözleri karanlıkta parlayan bir Malken görevli.
- **Lonca ihtiyarı** (Malkenia, 1. halka: Elyndra): Mor cüppeli, yaşı belirsiz bir Malken; gözleri loş salonda iki ametist gibi.
- **Yüksek Meclis'in kürsüsü** (Tenohris Sarayı): Sıvı kristal bir kürsü; arkasında Meclis'in sözcüsü.
- **İskele görevlisi** (Flee Plee sahil şeridi): Tuzlu rüzgârda pelerini dalgalanan bir Malken; elinde kayıkların kristal anahtarları.
- **Antik tapınak** (Uçan Arin Adası): Kayaya oyulmuş, rüzgârın içinden çan sesleri gelen bir tapınak; kapısında yaşlı bir keşiş.
- **Gümrük kulesi ve han** (Veradon liman kasabası): Taş bir kule; altında kalabalık bir han. Güneyden gelen kervanların kokusu.


### 3.5 Görev veren diğer kişiler

Büyük görevlerde: Baş Yönetici Valen Lazeria ve Antik Büyü Ustası Kefius Arateon; Başkent Savunma Mareşali Elyon Vane; Kütüphane Muhafızı Archivist Oron; Baş Maden Mühendisi Bront; Kefius Arateon (telsiz aktarımı); YGK Baş Mühendisi Taelis; Sahil Muhafız Kaptanı Miria; Baş Teknisyen Kaelen; Valen Lazeria; Çöl Loncası Reisi Şeyh Kasım; Münzevi Rahip Malok (eski Axelum tarikatının sağ kalanı); Liman Başkanı Varis; Kefius Arateon; (Kendiliğinden); Rahibenin astral silueti; Mareşal Elyon Vane ve Valen Lazeria; IV. Bagrius; Valen Lazeria ve Kefius Arateon; (Bütün filo); (Büyük final).

Yan görevlerde: Muhafız Yüzbaşısı Vaelen Morvath; Baş Mühendis Telamon Sael; Botanikçi Kaelen Vey; Silah Ustası Torin Grax; Baş Rahibe Seraphina; Baş Müzisyen Orpheus Dan; Kaptan Marik Vane; Arkeolog Selyna Thorne; Senatör Cassian Drake; Firari Şövalye Sir Gareth; Maden Lideri Borok Demirçekiç; Kervancıbaşı El-Mansur; Kule Bekçisi Rashid; Usta Avcı Varis; Muhafız Yüzbaşısı Korgan; Keşiş Eldor; Tarihçi Alim Tariq; Muhafız Teğmeni Selim; Cezaevi Müdürü Orik; Kuşbilimci Elspeth; Baş Gözlemci Valerius; Buz Avcısı Jarek; Gümrük Şefi Brann; Yüzbaşı Vorn; Balıkçı Reisi Morwen; Baş Mimar Zephyra; Kanatlı Elçi Aethelgard; Liman Valisi Roderick; Değirmenci Yaşlı Bran; Bataklık Cadısı Moira.


### 3.6 Güçler ve fraksiyonlar

Beş büyük güç: YGK Akademi, Batı ve Filtra Sendikası, Güney, Fleeplee ve Veradon, Doğu, Zorah Çöl Loncası, Kuzey, Zeris ve Mormon. Yan görev fraksiyonları: Malken Sarayı, Yeraltı karaborsası, Magentor Konseyi, Botanikçiler, Varek Muhafızları, Şehir güvenliği, Şehir halkı, Akademi, Uma aristokrasisi, Julithan Cumhuriyeti, Bilim Enstitüsü, Julithan Senatosu, Anitor Krallığı, Filtra madencileri, Safran göçebeleri, Çöl kabileleri, Avcılar Loncası, Kervan Loncası, Doğu keşişleri, Sınır muhafızları, Cezaevi idaresi, Yasal itibar, Doğa koruma, YGK astronomi, Norvask Krallığı, Helgar Dükalığı, Drahmir Krallığı, Fleeplee köyü, Tentran Teknoloji Konseyi, Arin Ada Krallığı, Veradon ticareti, Tharal halkı, Keralon halkı, YGK Akademi, Batı ve Filtra Sendikası, Doğu ve Zorah Çöl Loncası, Kuzey, Zeris ve Mormon, Güney, Fleeplee ve Veradon.


## 4. Ana hikâye: yirmi büyük görev

Görevler sırayla açılır; her biri bir önceki bitince ve kendi koşulu sağlanınca başlar. Yer, verenin adı, koşul, giriş metni, mini oyun adımları ve kararlar aşağıda.


### Büyük görev 1: Sürgünün Sonu ve Yıldız Odası Raporu

- Yer: YGK Akademi, Kat 6, Yüksek Konsey Salonu (nokta: Yüksek Konsey Salonu (YGK Kat 6: Yüksek Konsey ve Gözlemevi))
- Veren: Baş Yönetici Valen Lazeria ve Antik Büyü Ustası Kefius Arateon
- Koşul: Önce kabul masasına kendini bildir.
- Mini oyun adımları: Veri çekirdeği aktarımı (kademeli); Ses spektrumunu dinle (sonar); Güvenlik duvarı (refleks)
- Tehlike: 1 / 5

Telsizden binlerce Malken öğrencisinin alkışı ve ilahisi geliyor; ama sağ kulağında Valen Lazeria'nın sesi tok ve ciddi: "Evrenin öte ucundan sağ döndün, Kaptan. Ancak yıldızlarımız eski huzurunda değil." Sol kulağına Kefius Arateon'un fısıltısı, kadim bir rezonansla karışıyor: "Getirdiğin verilerde bir şey var. Bir karanlık." Arka planda mırıldanan korolar, uzaktan geçen gemilerin iyon fısıltısı, kule camlarına vuran gümüşi rüzgâr.

- Karar: Verilerin hepsini halka açık arşive sun → Malkenia'nın halkı coşuyor; itibarın arttı.
- Karar: Önce Kefius kara işaretleri gizlice incelesin → Kefius bir süre susuyor; sonra mühürlü bir parşömen uzatıyor. Güveni arttı.


### Büyük görev 2: Altı Halkalı Savunma Kalibrasyonu

- Yer: Malkenia, altı halka (nokta: Kalkan rezonatörü (Zhaor) (Malkenia, 6. halka: Zhaor))
- Veren: Başkent Savunma Mareşali Elyon Vane
- Tehlike: 2 / 5

Mareşal Elyon Vane: "Halkaların kalkan rezonatörlerinde faz kayması var, Kaptan. Altı yıldızın enerjisi kalkanlara eşit dağılmıyor." Her halkada bir rezonatör: Zhaor'un gümüşi tiz çınlaması, Varek'in kalın bas zonklaması, Axira'nın melodik rüzgâr fısıltısı. Her birinde referans sesini dinleyip iki parmakla çevirerek kalkan tonunu eşle; altısı bitince Mareşal'e karar ver.

- Karar: Enerjiyi dış halkalara, halk pazarlarına yönlendir → Pazarlar aydınlık; halk sana minnettar.
- Karar: Enerjiyi iç halkada Tenohris Sarayı'na yoğunlaştır → Saray kalkanı kusursuz; Meclis memnun.


### Büyük görev 3: Akademi Dehlizlerinde Sızıntı

- Yer: YGK Akademi, Kat eksi 3, yasak kronikler ve kseno-arşiv (nokta: Yasak kronik dolapları (YGK Kat -3: Malazar Çatlağı ve Yasak Kronikler))
- Veren: Kütüphane Muhafızı Archivist Oron
- Mini oyun adımları: Karanlıkta adım takibi (yaklas); Mühür basma (muhur); Gölge parazitleri (nisan)
- Tehlike: 3 / 5

Oron: "Hava kanallarından fısıltılar yükseliyor, Kaptan. Eski Axelum inancının mühürlü parşömenlerinin dolapları kendiliğinden titriyor." Damlayan su, eski metal rafların gıcırtısı; sağ ve sol kanallardan anlaşılmaz kadim fısıltılar.


### Büyük görev 4: Aether Kristallerinin Ağlayışı

- Yer: Malazar Dağı, derin ocaklar (nokta: Derin ocak ağzı (Malazar'ın aether ocakları))
- Veren: Baş Maden Mühendisi Bront
- Koşul: Önce Kefius'un çağrısıyla Akademinin altıncı katında Zirve İğnesi'ni hizala (Hikâye çağrıları).
- Mini oyun adımları: Sonik matkap (basinc)
- Tehlike: 3 / 5

Bront: "İşçiler aletleri bıraktı. Kristallerden melodi yerine tiz bir ağlama geliyor; madencilerin burnundan siyah kan damlıyor." Tünellerde derin kazma sesleri; araya yüksek frekanslı kristal inlemeleri giriyor. Maden derinliği sekiz yüz metre.

- Karar: Zehirlenen madencileri hemen yüzeye tahliye et → Herkes sağ; ama kazı yavaşladı, kristallerin bir kısmı kayıp.
- Karar: Kazıyı durdurma, siyah damarı hemen mühürle → Kristaller kurtuldu; ama iki madenci ağır yaralı. Lonca bunu unutmayacak.


### Büyük görev 5: Siyah Damar Kazısı

- Yer: Malazar Dağı, Sıfır Noktası Fayı (I. Bagrius'un ilk kazı yeri) (nokta: Sıfır noktası fayı (Malazar'ın aether ocakları))
- Veren: Kefius Arateon (telsiz aktarımı)
- Mini oyun adımları: Spektral ayırıcı (zikzak)
- Tehlike: 3 / 5

Kefius telsizden: "Kristalleri zehirleyen bu kırık, Kaptan. Dağın dibinde Alt Evren savaşından kalma taşlaşmış bir kemiğe değiyor." Derinden ritmik, kalp atışı gibi bas darbeleri: dum... dum... dum...


### Büyük görev 6: Kadim Körüklerin Uyanışı

- Yer: Malazar zirvesi, terk edilmiş Bagrius dökümhanesi (nokta: Terk edilmiş Bagrius dökümhanesi (Malazar: Tepe ve Pelerin Zirvesi))
- Veren: YGK Baş Mühendisi Taelis
- Mini oyun adımları: Buhar kolları (kademeli); Ritmik tahliye (basinc)
- Tehlike: 3 / 5

Taelis: "Yaklaşan savaşa karşı zırhları güçlendirmeliyiz. I. Bagrius'un dağ dökümhanesinin jeotermal körükleri yeniden ateşlenmeli."


### Büyük görev 7: Flee Plee Sahilinde Telsiz Karartması

- Yer: Güney sahil, Flee Plee balıkçı yerleşkesi (nokta: Sahil muhafız kulesi (Flee Plee sahil şeridi))
- Veren: Sahil Muhafız Kaptanı Miria
- Mini oyun adımları: Lidar taraması (frekans); İkinci batık (frekans)
- Tehlike: 2 / 5

Miria: "Fenrir'in ışıldayan tozları söndü; deniz zifiri karanlık. Telsizler kör; yalnız derinden bir su fokurtusu." Kıyıya vuran toz dalgalarının köpüklü hışırtısı; uzakta deniz yaratıklarının boğuk çığlıkları.


### Büyük görev 8: Deniz Üstü Teleportasyon Kenti Protokolü

- Yer: Tentran (Nadir-Port), yüzen tekno-kent (nokta: Teleportasyon kapıları (Tentran platform kenti (Aether-Dock)))
- Veren: Baş Teknisyen Kaelen
- Mini oyun adımları: Portal faz eşleme (denge); İkinci portal (denge)
- Tehlike: 3 / 5

Kaelen: "Teleportasyon kapıları arızalı. Uzay istasyonundan inen silah konteynerleri boyutsal arafta asılı kaldı."


### Büyük görev 9: Uçan Arin Adası'nın Kozmik Nabzı

- Yer: Fenrir Denizi, Uçan Arin Adası, Koruyucu Gözlemevi (nokta: Koruyucu Gözlemevi (Uçan Arin Adası))
- Veren: Valen Lazeria
- Mini oyun adımları: Monolitin şifresi (rotasyon)
- Çatışma: var (görevden önce)
- Tehlike: 4 / 5

Valen: "Arin'deki Koruyucu Gözlemevi kendiliğinden uyandı. Gezegen kurulurken konulan izleme kulesi bu." Şiddetli rüzgâr uğultusu, yerçekimi bozulma sesleri; yerin binlerce kilometre altından çift kalp atışı.


### Büyük görev 10: Kayıp Çöl Dikilitaşları

- Yer: Doğu çöl kantonları, Akrep Vadisi (nokta: Akrep Vadisi (Doğu çöl kantonları))
- Veren: Çöl Loncası Reisi Şeyh Kasım
- Mini oyun adımları: Akustik pusula (yaklas); İkinci dikilitaş (yaklas)
- Tehlike: 2 / 5

Şeyh Kasım: "Dikilitaşlar kumun altına battı; kum fırtınası bütün pusulaları bozdu. Yalnız rüzgârın ıslığı yol gösterir: ton inceldikçe doğru yoldasın."


### Büyük görev 11: Münzevi Büyücünün Kehaneti

- Yer: Doğu kanyonları, Çökük Mağara (nokta: Çökük Mağara (Doğu Kırık Vadi))
- Veren: Münzevi Rahip Malok (eski Axelum tarikatının sağ kalanı)
- Mini oyun adımları: Rünlerin hafızası (ton)
- Tehlike: 2 / 5

Mağaranın dibinden yaşlı bir ses adını söylüyor: "Geldin demek, gezgin... Mancınığın fırlattığı Kızıl Yutucu'yu ve gökten düşen beyaz küreyi yalnız ben hatırlarım. Rünlerin tonlarını tekrarla; hafızan sağlam mı görelim."


### Büyük görev 12: Veradon Limanı Tahliye Hattı

- Yer: Veradon liman kasabası (nokta: Liman başkanlığı (Veradon liman kasabası))
- Veren: Liman Başkanı Varis
- Mini oyun adımları: Taktiksel koruma (kacin)
- Çatışma: var
- Tehlike: 4 / 5

Varis: "Deniz çekildi, yerini çamur ve kükürt aldı. Dış krallıklardan kaçan binlerce mülteci limanda sıkıştı. Gökten korsanlar ve gölge gemileri saldırıyor!" Mülteci gemilerinin motorlarını dinle; torpido hangi yandan gelirse kalkanını o yana sür.


### Büyük görev 13: Kara Suların Çekilişi

- Yer: Malkenia batısı, dipsiz Kara Göl krateri (nokta: Kraterin kenarı (Kara Göl ve Büyük Krater))
- Veren: Kefius Arateon
- Koşul: Kara Göl'e girmek için koruma mührü gerekir.
- Mini oyun adımları: Çamurda ilerleme (kacin)
- Tehlike: 4 / 5

Kefius: "Kara sular bir gecede yer altına çekildi. Kral Tenos ile Kraliçe Harees'in parçalanmış saray kuleleri ve çamurda yatan devasa taş eller ortaya çıktı." Balçık fokurtuları, göl yatağında uğuldayan zehirli rüzgâr, metalik sürtünmeler.


### Büyük görev 14: Kırmızı Yıldız Varek'in Kan Fırtınası

- Yer: Kara Göl tabanı, Titan Runahar'ın göğüs kafesi (nokta: Runahar'ın göğüs kafesi (Kara Göl ve Büyük Krater))
- Veren: (Kendiliğinden)
- Mini oyun adımları: Ters kutup (tut); Kozmik mühürleme (denge)
- Tehlike: 5 / 5

Kraterin dibine inince gökteki Kırmızı Yıldız Varek kan rengine bürünüyor. Taşlaşmış göğüs kafesinden siyah alevler fışkırıyor: Runahar uyanmak üzere.


### Büyük görev 15: Tyzrakhel Kulesi'nin Astral Yankısı

- Yer: Kara Göl üzeri, astral düzlem geçişi (nokta: Astral geçit (Kara Göl ve Büyük Krater))
- Veren: Rahibenin astral silueti
- Mini oyun adımları: Zihinsel odaklanma (sessizlik)
- Tehlike: 3 / 5

Kral Tenos'u sırtından vuran hain rahibenin astral hayaleti beliriyor. Ağlayarak af diliyor ve ihanetin arkasındaki Alt Evren fısıltısını anlatıyor: bir ses onun aklına girmiş, elini o ses yönetmiş.


### Büyük görev 16: Kara Şehrin Uyanan Kuleleri

- Yer: Kuzeydoğu sınırı, Kahergonat (nokta: Kara kulelerin dibi (Kahergonat))
- Veren: Mareşal Elyon Vane ve Valen Lazeria
- Mini oyun adımları: Karanlık sızma (kacin)
- Çatışma: var
- Tehlike: 5 / 5

Mareşal Elyon Vane: "Kaptan, Doğu dağlarının ardındaki Kahergonat kuleleri yüzyıllardır ilk kez kara aether ateşi yakıyor. Şehirde kimse yaşamıyor sanırdık ama gölge zırhlıları göğe yükseldi. Oraya ilk sen sızacaksın!" Kahergonat'ın siyah sivri kuleleri göğe mor yıldırımlar fırlatıyor. Beş müridin birleşimi Lord Sharon, kulelerin tepesinde devasa bir gölge olarak yükseliyor; beş sesin üst üste bindiği metalik bir kahkaha. Metalik savaş boruları, binlerce Alt Evren yaratığının hırıltılı yürüyüşü, gök gürültüsü.

- Karar: Zırhlının yüz elli kara aetherini ambara al → Yüz elli kara aether ambarda. Dikkat: ambarda dörtten fazla kara kristal kalkan frekansını bozar; reaktörde ya da zanaatta harca.
- Karar: Kara aetheri YGK laboratuvarında arıtma hakkına çevir → Akademi yüz elli kara kristali arıttı: altmış saf aether senin.


### Büyük görev 17: Tenohris Sarayı Kuşatması

- Yer: Malkenia, Tenohris Sarayı ön avlusu (nokta: Sarayın ön avlusu (Tenohris Sarayı))
- Veren: IV. Bagrius
- Mini oyun adımları: Hava savunma bataryaları (basinc)
- Tehlike: 5 / 5

Kara ordular dış halkaları aşmış, sarayın oval kapılarına dayanmış. IV. Bagrius balkondan halka sesleniyor; gökten kara mancınık kayaları yağıyor. Hava savunma bataryası senin.

- Karar: Sarayı ve halkı koru: muhafızları Akademiye ve halkın yanına gönder → Akademi sağlam, öğrenciler ve halk kurtuldu. Mareşal Elyon Vane hayatta; Dünya Çivisi'nde yanında savaşacak.
- Karar: Doğrudan kuşatma merkezine saldır → Saray hasar aldı ama Sharon'un gölge ordusu kırıldı; IV. Bagrius omzuna elini koyuyor. Sharon artık daha az muhafız çağırabilir.


### Büyük görev 18: Dünya Çivisi Savunması

- Yer: YGK Akademi, Kat eksi 5, gezegenin omurgası (nokta: Dünya Çivisi (YGK Kat -5: Sıfırıncı Karanlık ve Dünya Çivisi))
- Veren: Valen Lazeria ve Kefius Arateon
- Koşul: Lord Sharon'u durdurmak için Tyzrakhel mızrağının parçası (Final 11), Tyzrakhel Işık Prizması (Final 15) ve zemindeki yuvalara iki mühür taşı (Runahar, Runashar) gerekir.
- Mini oyun adımları: Mühür taşları (kademeli); Büyü çemberi (rotasyon)
- Çatışma: var (görevden önce)
- Tehlike: 5 / 5

Akademinin eksi beşinci katı, Sıfırıncı Karanlık. Valen Lazeria ve Kefius Arateon mühür sütununun başında nefes nefese bekliyor: "Sızma birlikleri sütuna ulaştı. Sütun kırılırsa Runahar ve Runashar tamamen canlanır; Tonoflenya bir yumurta gibi çatlar." Sütunun önünden bir gölge yükseliyor. Lord Sharon'un sesi yankılı, soğuk ve çok katmanlı: "Beyaz Kıyamet beni parçaladı sandınız... Ama Kara Göl beni besledi! Şimdi Runahar ve Runashar yeniden birleşecek!" Hazırlık: Malok'un mızrak parçası ile astral kulenin prizması birleşiyor; Tyzrakhel Işık Mızrağı elinde.


### Büyük görev 19: Lanetli Gezegene Hiper-Sıçrama

- Yer: Tonoflenya yörüngesi → Okyanos-Abyssus (nokta: Geminin yerçekimi iskelesi (YGK Kat 5: Yerçekimi İskelesi, Aether Simya Laboratuvarı ve Kseno-Seralar))
- Veren: (Bütün filo)
- Koşul: Okyanos-Abyssus sıçraması için Efsanevi Aether Reaktörü (Final 18) ve kalkana takılacak Cahelon Girdap Anahtarı (Arin gözlemevi) gerekir.
- Mini oyun adımları: Hiper-uzay koridoru (kacin)
- Tehlike: 4 / 5

Bütün okyanusun tek noktaya toplandığı bir girdap: komşu gezegende Cahelon uyanıyor. Filon son sefer için hiper-sıçrama motorlarını ateşliyor; Cahelon Girdap Anahtarı kalkana takılı.


### Büyük görev 20: Su Mezarında Cahelon ile Hesaplaşma

- Yer: Okyanos-Abyssus, dipsiz girdabın kalbi (nokta: Geminin yerçekimi iskelesi (YGK Kat 5: Yerçekimi İskelesi, Aether Simya Laboratuvarı ve Kseno-Seralar))
- Veren: (Büyük final)
- Çatışma: var
- Tehlike: 5 / 5

Okyanos-Abyssus'un sonsuz okyanusunda dev bir girdabın uğultusu. Gezegenin bütün suyu gökyüzüne yükselen devasa bir su kulesi olmuş; su altından yükselen balina benzeri infrasonik bir çığlık gövdeni titretiyor. Valen Lazeria telsizden: "Kaptan, Cahelon uyanıyor! Arin'den getirdiğin Girdap Anahtarı'nı kalkan rezonatörüne tak. Bu sadece Tonoflenya'nın değil, Aethelis-IV'ün de kader savaşı!" Girdap Anahtarı kalkan rezonatöründe dönüyor; birinci aşamada yüzgeç darbelerini ve sonik dalgaları dengeleyecek.


### Son sahne: Epilog

Cahelon ebediyen su mezarına kilitleniyor; suyun dibinde ebedî bir kristal heykele dönüşüyor. Gökyüzüne yükselen okyanus yavaşça gezegenin yüzeyine geri dökülüyor. Altı yıldız gökyüzünde yeniden sabit bir uyum akoru çalıyor. Telsizden Valen Lazeria'nın, Kefius Arateon'un ve kurtardığın bütün ırkların ortak zafer marşı yükseliyor. Galaksi, Alt Evren'in Kızıl Kıyamet tehdidinden tamamen temizlendi. Aethelis-IV, Galaktik Başkent, ile Tonoflenya arasındaki köprü kalıcı barış dönemine geçti; kalan yan görevler, melez zanaatlar ve gezegen keşifleri için serbest keşif sürüyor. (Ardından son görevin ödülü okunur.)


### Son sahne: Aethelis

Aethelis. Yapımcı: Bahtiyar Cankurt. Sesler: Bahtiyar'ın efekt arşivi ve ElevenLabs. Ses motoru: üç boyutlu kulaklık sesi. Oynadığın için teşekkürler, Evrenin Muhafızı. Serbest keşif modunda dilediğin gibi dolaşabilirsin.


## 5. Zirve İğnesi (Aşama 4B)


### 4B: Zirve İğnesi'nin Hizalanması

- Veren: Kefius Arateon ve Gözlemevi Görevlisi
- Ödül: Zirve İğnesi hizalandı. İğnenin ucundan komşu bir dünyaya bakıyorsun: suyla kaplı Okyanos-Abyssus. Kronik dört, Cahelon'un laneti, artık okunabilir; Malazar yolu da açık.

Gözlemevi Görevlisi telsizden, telaşla: "Kaptan, Akademinin altıncı katına çıkın! Dehlizdeki sızıntı Zirve İğnesi'ni kaydırdı; altı yıldızın ışığı iğnenin ucunda dağılıyor." Kefius Arateon: "İğne hizasız kaldıkça Kara Göl'ün altındaki mührün sesini duyamayız. Dev pirinç ve kristal halkayı iki parmağınla çevir; altı yıldızı tek bir tonda topla." Gözlemevi camlarına gümüşi rüzgâr vuruyor; iğnenin başında altı ayrı ton birbirine sürtünerek vınlıyor.

- Adım 1: mini oyun (Gümüş, kızıl ve zümrüt ışık (frekans); Ametist, mavi ve altın ışık (frekans))


## 6. YGK Akademisi

Katlar (yukarıdan aşağı): YGK Kat 6: Yüksek Konsey ve Gözlemevi, YGK Kat 5: Yerçekimi İskelesi, Aether Simya Laboratuvarı ve Kseno-Seralar, YGK Kat 4: Kartografya, Kütüphane ve Taktik Simülatör, YGK Kat 3: Kristal İhtisas ve Zanaat Atölyeleri, YGK Kat 2: Yıldız Ekolleri Amfileri ve Cep-Park, YGK Kat 1: Varış Avlusu ve Ağır Plazma Talimgâhı, YGK Kat -1: Röle ve Mekik İskelesi, Yeraltı Arşivleri, YGK Kat -2: Sessiz Arşivler ve Disiplin, YGK Kat -3: Malazar Çatlağı ve Yasak Kronikler, YGK Kat -4: Kadim Stasis Hücreleri ve Enerji Çekirdeği, YGK Kat -5: Sıfırıncı Karanlık ve Dünya Çivisi. Asansörle gezilir; bazı katlar büyük görev ilerledikçe açılır.

Kürsü sınavları ve akademi hikâyeleri (her biri bir kez):


### K-korvinus: Kürsü testi: Kusursuz Hata

- Veren: Korvinus Vael, Anti-Büyü Kürsüsü
- Ödül: Artı elli Mavi Yıldız Ekolü kıdemi. Düşmanın frekans kalkanını kırdığın her atış yüzde yirmi beş daha sert vurur.

Korvinus kat üçün test odasında bozuk bir rezonans kalkanı açıyor; kalkan kusursuz bir tonla vınlıyor, ama içinde bir yerde titreyen bir hata var.

- Adım 1: mini oyun (Hata frekansı (frekans))


### K-silas: Kürsü testi: Gölge Şantajı

- Veren: Silas Vex, Gölge ve Psikometri Kürsüsü
- Ödül: Artı elli Mor Yıldız Ekolü kıdemi. Karada ve uzayda pusuları önceden sezersin: tuzaklarda ilk saldırı erken gelmez, ilk uyarıdan önce bir nefes payın olur.

Eksi ikinin uzak kapı sürgüleri. Silas: "Katibin odası koridorun sonunda. Hızlı yürürsen sürgüler seni ele verir."

- Adım 1: mini oyun (Sessiz sızma (yaklas))


### K-forges: Kürsü testi: Çelik Damar

- Veren: Forges, Mekanik ve Enerji Kürsüsü
- Ödül: Artı elli Kırmızı Yıldız Ekolü kıdemi. Bütün zırh ve gemi gövdesi üretim maliyetlerinde kalıcı yüzde on indirim.

Forges örsün başında patlamak üzere olan dengesiz bir aether kristali tutuyor: "Isı yükselir, çatlama sesi gelir; tam o an soğut. Üç kez."

- Adım 1: mini oyun (Üç aşamalı soğutma (basinc))


### K-jolkar: Kürsü testi: Konuşan Taş

- Veren: Jolkar Tectus, Rünler ve Antik Dil Kürsüsü
- Ödül: Artı elli Sarı Yıldız Ekolü kıdemi. Karanlık düşmanların zihin ve stres saldırılarına kalıcı yüzde yirmi direnç.

Malazar çatlağının dibinde lanetli yazıt. Jolkar: "Ritmi kaçırma. Yanlış okursan uyanan muhafızla sen uğraşırsın; doğru okusan da taş bir kez sınar."

- Adım 1: mini oyun (Yazıtın ritmi (ritim))
- Adım 2: çatışma. Sonu: Muhafız taşa geri çöktü. Jolkar: "Taş seni tanıdı."


### K-faelan: Kürsü testi: Kontrollü İnfilak

- Veren: Faelan Cinder, Hata Büyüsü Kürsüsü
- Ödül: Artı elli Kırmızı Yıldız Ekolü kıdemi. Glitch Atışı: gemi silahların ya da siperin aşırı ısınınca bir sonraki atışın kritik vurur.

Faelan iki kristal tutuyor, biri ateş, biri buz: "İkisini aynı anda yükle; tonlar birleşince dengede tut. Kaçırırsan yanağım yine yanar!"

- Adım 1: mini oyun (Ateş ve buz (denge))


### K-trellis: Kürsü testi: Zehirli Nefes

- Veren: Trellis-7, Kseno-Botanik ve Zehir Kürsüsü
- Ödül: Artı elli Yeşil Yıldız Ekolü kıdemi. Zehir ve asit hasarına kalıcı yüzde yirmi beş direnç; iki nadir kükürt sarmaşığı tohumu.

Sporlu oda. Trellis-7: "Oda nefes veriyor... nefes alıyor... Nefes verdiği anda dokun; panzehir bitkisi o an açılır."

- Adım 1: mini oyun (Nefes ritmi (refleks))


### K-seraphine: Kürsü testi: Acıyı Paylaş

- Veren: Seraphine 'Işık Yolu' Rael, Şifa ve Empati Kürsüsü
- Ödül: Artı elli Yeşil Yıldız Ekolü kıdemi. Savaştan sonra mürettebatın stresi ve yaraları yarı sürede iyileşir.

Seraphine yaralı bir askerin elini eline veriyor: "Nabzını duy. Aynı ritimde kal; acısı yarıya iner."

- Adım 1: mini oyun (Nabız senkronu (ritim))


### K-caelum: Kürsü testi: Kör Uçuş

- Veren: Caelum Nokturnus, Astral Seyahat Kürsüsü
- Ödül: Artı elli Gümüş Yıldız Ekolü kıdemi. Derin uzay ile Tonoflenya arası sıçrama ve Tonoflenya içi seyahat süreleri yüzde yirmi kısa.

Caelum astral geçitte seni Mormon Denizi'nin fırtınasına taşıyor: "Harita yok. Yalnız rüzgâr ve dalga; tehlike hangi yandan gelirse ters yana kaç."

- Adım 1: mini oyun (Fırtına rotası (kacin))


### K-kaelis: Kürsü testi: Kendi Sesinle Savaş

- Veren: Kaelis 'Echo' Duman, Ses ve İllüzyon Kürsüsü
- Ödül: Artı elli Mavi Yıldız Ekolü kıdemi. Savaşta yetenekler, sahte gürültü ve şaşırtma bir tur daha hızlı dolar.

Akustik oda. Kaelis: "Şimdi duyduğun ses senin saldırın. Ama onu ben çalıyorum."

- Adım 1: çatışma. Sonu: İllüzyon dağıldı. Kaelis kendi sesine dönüyor: "Artık sahte gürültüyü daha çabuk kurarsın."


### K-zeva: Kürsü testi: Ağırlık Merkezi

- Veren: Zeva 'Kılavuz' Thorne, Mekik ve Denge Kürsüsü
- Ödül: Artı elli Gümüş Yıldız Ekolü kıdemi. Yüzey araçların ve mekiklerin engebeli, tehlikeli arazide aldığı hasar yüzde otuz az.

Zeva denge platformunu açıyor: "Ağırlık bir yana kayıyor; sesini dinle ve merkeze çek."

- Adım 1: mini oyun (Denge platformu (denge))


### K-ignador: Konsey mi, reform mu?

- Veren: Ağır Plazma Talimgâhı Eğitmeni Ignador

Talimgâhta plazma mermilerinin kokusu. Ignador sesini alçaltıyor: "Konsey nutuk atarken sınırlarımız yanıyor, Kaptan. Muhafızların yarısı benimle. Valen'i görevden alalım; Akademiyi bir ordu gibi yönetelim." Uzaktan, altıncı katın kubbesinde Valen Lazeria'nın sakin sesi yankılanıyor.


- Karar: Ignador'la darbeye katıl → Valen Lazeria eksi dördüncü kattaki stasis hücrelerine kapatıldı; Konsey Vekili Morvenna Kael yönetimi devraldı. Ignador'un ağır talimi senin: karada birincil atış yüzde on güçlü, T-06 gözetmen indirimi sürüyor. Konsey desteği zayıfladı.
- Karar: Valen'i koru, darbeyi Konsey'e bildir → Valen yerinde; diplomatik erişim ve Konsey desteği tam. Ignador kırgın: T-06 taslağını yine verir ama başında durduğunda indirim yapmaz.


### K-zephyra: Göğün Hiddeti

- Veren: Stasis tutsağı Zephyra

Zephyra'nın hücresinde kriyo-tüp nabızları hızlanıyor; dar camın ardında klostrofobik bir kriz. Kanatlarının duvara sürtünmesi, kesik nefesler.

- Adım 1: mini oyun (Hücreyi yatıştır (ritim))

- Karar: Hücreyi aç, serbest bırak → Zephyra kanatlarını açıp gökyüzüne yükseldi; giderken sana Fırtına Kalkanı'nı bıraktı: hava ve yıldırım saldırılarına direnç, Arin ve Güney rotalarında rüzgâr senden yana.
- Karar: Hücrede bırak; yalnız krizini yatıştırmak yeterli → Zephyra camın ardında sessizce sana bakıyor. Akademi minnettar; YGK itibarı arttı.


### K-morwenna: Karanlık Ses Bükücü

- Veren: Stasis tutsağı Morwenna

Morwenna'nın tüpünden duvarlar boyunca kayan bir fısıltı: "Sharon'un sesi beş sestir, Kaptan. Ben o seslerden birini öğrenmeye adaydım. Beni ne yapacaksın?"


- Karar: Serbest bırak → Morwenna tüpten çıktı ve Dünya Çivisi'nde Sharon'un fısıltısını sana karşı bükeceğine söz verdi: Final on sekizde Sharon'un zihin saldırıları yüzde yirmi beş zayıf.
- Karar: Hücreden konuşarak ikna et, tüpte kalsın → Morwenna tüpün içinden sana Sharon'un seslerini öğretti; serbest kalmadan da Final on sekizde zihin saldırıları yüzde yirmi beş zayıf.
- Karar: Hücrede bırak, yalnız verisini al → Morwenna'nın kara aether verisi YGK laboratuvarında: iki kara aether ve yüz elli bilim puanı.


## 7. Bölgesel lider zincirleri ve ambargo


### BL-oronte-1: Oronte, 1. aşama: Filtra Çarklarının Yağlanması

- Veren: Oronte, Filtra Maden Sendikası
- Ödül: Batı itibarı artı yirmi, elli kızılkaya titanyumu.

Galeri dördün derinliğinden sıkışmış bir maden vagonunun gıcırtısı ve basınç tıslaması. Oronte: "Vagon kilitlendi, içerideki otomat da çıldırdı. Basıncı dengele, otomatı indir."

- Adım 1: mini oyun (Vagon basıncı (basinc))
- Adım 2: çatışma. Sonu: Otomat sustu; galeri açık.


### BL-oronte-2: Oronte, 2. aşama: Julithan Ambargosu

- Veren: Oronte

Oronte: "Şifreli kargomuz Julithan gemilerinin hedefinde. Konvoyu koru; sonra kargo kimin olacak, sen karar ver."

- Adım 1: çatışma. Sonu: Julithan korveti geri çekildi; konvoy güvende.

- Karar: Kargoyu sendikaya ver → Oronte minnettar; Batı kuşağı seni tanıyor.
- Karar: Kargoyu başkente bildir → YGK minnettar; Oronte küstü.


### BL-oronte-3: Oronte, 3. aşama: Demir ve Cıva İttifakı

- Veren: Oronte
- Ödül: T-02 Akışkan Cıva Plakası taslağı ve Oronte'nin Tether-Key mekik hakkı: kolonideyken Aethelis'te zırh ve araç maliyeti yarı.

Filtra barikatının önünde ağır hidrolik gıcırtılar. Oronte: "İki ağır maden korsanı barikatı kırıyor. Onları temizle; sendika seninle ittifak kurar."

- Adım 1: çatışma. Sonu: Barikat temizlendi.


### BL-barracuda-1: Kaptan Barracuda, 1. aşama: Parlayan Sığlıkların Baskını

- Veren: Kaptan Barracuda, Fleeplee
- Ödül: Güney itibarı artı yirmi, yüz gram Fenrir ışık tozu.

Parlayan toz sığlıklarında dalga sesi. Barracuda: "Veradon devriye botu peşimizde. Sesle atlat ya da avcı botunu sustur."

- Adım 1: mini oyun (Sığlıklarda kaçış (kacin))
- Adım 2: çatışma. Sonu: Avcı botu etkisiz.


### BL-barracuda-2: Kaptan Barracuda, 2. aşama: Arin Göksel Ambargosu

- Veren: Barracuda ve Arin elçisi Aethelgard

Arin'in resmî elçisi Aethelgard gizlice yaklaşıyor: "Korsan iskelesini sabote et, Kaptan; Arin hava sahası sana sonsuza dek açık olur." Barracuda arkadan sesleniyor: "Bizi satacak mısın?"


- Karar: Aethelgard'a yardım et, iskeleyi sabote et → Arin minnettar; Barracuda öfkeli ama zincir sürüyor.
- Karar: Barracuda'yı koru → Arin hava sahası sana kapandı (yalnız Atmosphere-X ile inilir). Sürgün mucit Nyxara Vel'din Fleeplee'de olduğu için Tether-Key yine üretilebilir.


### BL-barracuda-3: Kaptan Barracuda, 3. aşama: Fenrir Hayalet Filosu

- Veren: Kaptan Barracuda
- Ödül: T-07 Plazma Pençeli Kesici taslağı ve Barracuda'nın Tether-Key mekik hakkı: kolonideyken kargo kaybı sıfır, maden ambarları korunur.

Fleeplee açıklarında kaybolup beliren karanlık motor sesleri. Barracuda: "Gölge korsanı ve bir dron taşıyıcısı pusuda. Bu benim denizim; birlikte temizleyelim."

- Adım 1: çatışma. Sonu: Hayalet filo dağıldı.


### BL-zeno-1: Silahşör Zeno, 1. aşama: Cam Kumların Fırtınası

- Veren: Silahşör Zeno, Zorah Kervan Yolu
- Ödül: Doğu itibarı artı yirmi, otuz rezonans camı.

Çöl fırtınası; kum camda tıslıyor. Zeno: "Kervan kayboldu. Sesli pusulanı aç, onları bul; kumdan çıkanlarla ben ilgilenmem, sen ilgilenirsin."

- Adım 1: mini oyun (Sesli pusula (yaklas))
- Adım 2: çatışma. Sonu: Pusu dağıldı; kervan yola çıktı.


### BL-zeno-2: Silahşör Zeno, 2. aşama: Vaha Kuşatması

- Veren: Silahşör Zeno

Doğu vahasında hurma yaprakları arasında tüfek kurma şakırtıları. Zeno: "Paralı askerler vahayı kuşattı. Kır onları; sonra vaha kimin, sen söyle."

- Adım 1: çatışma. Sonu: Paralı askerler kaçtı; vaha kurtuldu.

- Karar: Vahayı Çöl Loncası'na bırak → Lonca seni kardeş bildi.
- Karar: Vahayı başkent ve Anitor vergi hattına bağla → Başkent ve Anitor memnun; çöl kabileleri kırgın.


### BL-zeno-3: Silahşör Zeno, 3. aşama: Mavi Hardrin Kanunsuzları

- Veren: Silahşör Zeno
- Ödül: Doğu itibarı artı otuz beş ve Zeno'nun Tether-Key mekik hakkı: kolonideyken koloni savunması yüzde kırk, Aethelis'te pusu riski sıfır.

Nirdol Boynu'nda alçak ayin fısıltıları. Zeno: "Haydut lideri bir tarikat muhafızıyla birlikte. Düello onların, son kurşun bizim."

- Adım 1: çatışma. Sonu: Kanunsuzlar düştü.


### BL-mirelza-1: Mirelza, 1. aşama: Donmuş Frekansların Kaydı

- Veren: Mirelza, Zeris Dış Kulesi
- Ödül: Kuzey itibarı artı yirmi, otuz Norvask kara buzu.

Kule eteklerinde donmuş rezonans kristallerinin kırık tınıları. Mirelza: "Her biri bir kayıt. Akort et, sesleri geri gelsin."

- Adım 1: mini oyun (Donmuş kristal (frekans); İkinci kristal (frekans))


### BL-mirelza-2: Mirelza, 2. aşama: Norvask Lordlarının Kazısı

- Veren: Mirelza

Buzun altından servo gıcırtıları. Mirelza: "Norvask lordları kadim bir şey kazdı ve uyandırdı. İki otomat tonunu değiştiriyor."

- Adım 1: çatışma. Sonu: Otomatlar buzda kıpırtısız.

- Karar: Kazıyı durdur, buzu yeniden mühürle → Mirelza memnun; Kuzey güveniyor.
- Karar: Kazıyı ele geçir → Kadim parçalar senin; Norvask lordları kırgın.


### BL-mirelza-3: Mirelza, 3. aşama: Zeris'in Göksel Şarkısı

- Veren: Mirelza
- Ödül: T-05 Sonik Çığlık Tüfeği taslağı ve Mirelza'nın Tether-Key mekik hakkı: kolonideyken radar menzili iki kat, sera yüzde otuz hızlı.

Kule tepesinde sonik bir parazit; şarkıyı boğan kanat çırpınışları. Mirelza: "Alt Evren sürüsü kuleme yuva yaptı. Temizle; şarkı senin olsun."

- Adım 1: çatışma. Sonu: Sürü dağıldı; kule yeniden şarkı söylüyor.


### BL-ambargo: Büyük Tonoflenya Ambargosu

- Veren: YGK Yönetimi
- Ödül: 

Valen Lazeria Yüksek Konsey kubbesinden bütün kuşaklara sesleniyor: "Taşradaki isyanlar ve kaçakçılık bitecek. Bugünden itibaren Büyük Tonoflenya Ambargosu yürürlükte: dış kuşaklar vergilerini ve malzemelerini başkente aktaracak." Telsizinde dört kuşağın liderlerinin sesleri birbirine karışıyor: Oronte, Barracuda, Zeno, Mirelza. Herkes senin ne yapacağını bekliyor.


- Karar: Başkenti ve YGK merkezini destekle → Magentor ve Akademi kapıları sonuna kadar açık; Final on yedi ve on sekizde YGK büyücü takviyesi ve tam aether ikmali gelecek.
- Karar: Taşra ittifakını, dört bölgeyi destekle → Dört kuşağın mekik hatları, pazarları ve Tether-Key ikmalleri açık; Final on yedide dört bölgenin gönüllü filosu kuşatmayı dışarıdan kıracak. Bedeli: Magentor kapıları geçici olarak kapalı; Akademiye yalnız eksi birinci kattaki Kör Rıhtım'dan gizlice girilir.


## 8. Otuz yan görev


### MAG-SQ-01: Zhaor Gece Pazarında Kaçak Kristal İzi

- Tür: Dedektiflik, gizlilik, soruşturma
- Yer: Dünya Haritası → Magentor Yarımadası → Zhaor Halkası → Kuzey Gece Pazarı Tezgâhları
- Kişi: Muhafız Yüzbaşısı Vaelen Morvath
- Ön koşul: Karakter seviyesi 12 ve üstü (oyunda: herhangi bir ekolde Seyrüsefer Uzmanı); Akustik analiz becerisi seviye 2 (Mavi Yıldız ekolünde Seyrüsefer Uzmanı); Fenrir Işık Pelerini ya da YGK Baş-Büyücü Cübbesi
- Zaman: Gece pazarı yalnız Altın Gece ya da Gümüş Şafak nöbetinde kurulur.
- Mini oyun adımları: İz sürme (frekans); Kaçış koridorunu kapat (kademeli)

Gece pazarında sahte Malazar tozuyla seyreltilmiş kaçak aether kristalleri satılıyor.

- Karar: Kaçakçıyı ihbar et → Kaçakçı muhafızlara verildi; başkentte kanun düzeni arttı.
- Karar: Karaborsacıyla anlaş → Mallara el koymadın; karaborsa artık sana yüzde on indirim yapıyor.


### MAG-SQ-02: Saray Altı Teleport Şebekesinde Rezonans Sızıntısı

- Tür: Teknik mühendislik, frekans hizalama
- Yer: Magentor Yarımadası → Tenohris Sarayı → Alt Merkez İstasyon → Tentran-Loran Hat Odası
- Kişi: Baş Mühendis Telamon Sael
- Ön koşul: T-05 Sonik Tüfek ya da Sinha akustik çipi; YGK mühendislik sertifikası seviye 1 (YGK kaydı)
- Mini oyun adımları: Basınç ayarı (frekans); Arızalı çekirdek (basinc)

Saraydan Tentran ve Loran'a giden teleport hatlarında faz kayması var; rezonans tüpü aşırı ısınıyor.

- Karar: Hattı kapat ve onar → Hat güvenle onarıldı; Telamon gemine gizli bir tahliye kapısı açtı.
- Karar: Sızan aetheri topla → Sızıntıyı tankına çektin.


### MAG-SQ-03: Elyndra Halkasında Kayıp Simyacının Notları

- Tür: Gizem, bulmaca, biyo-büyü
- Yer: Magentor Yarımadası → Elyndra Halkası → Biyo-Kristal Kubbesi 3
- Kişi: Botanikçi Kaelen Vey
- Ön koşul: Kseno-botanik tarım bilgisi (tarım alanı açılmış olmalı); Bir analiz tüpü
- Zaman: Simyacının gizli yazısı yalnız Mor İkindi'nin ışığında okunur.
- Mini oyun adımları: Akustik çiçek takibi (frekans); Kasa açma (ton)

Kayıp simyacı geride yalnız sesle açılan üç rezonans çiçeği bırakmış; polenleri zemin altındaki kasasının şifresini fısıldıyor.

- Karar: Notları Botanik Konseyine teslim et → Aethelis-IV tarım teraslarına aktarılacak resmî hibrit formülü kazanıldı.
- Karar: Notları şahsi seraya sakla → Gece açan egzotik orkide tohumları senin.


### MAG-SQ-04: Varek Kışlasında Silah Testi Kazası

- Tür: Taktik savaş, yangın söndürme
- Yer: Magentor Yarımadası → Varek Halkası → Poligon 7
- Kişi: Silah Ustası Torin Grax
- Ön koşul: Filtra Oksit Ağır Zırhı ya da Lamine Titanyum Zırh (kuşanılı ya da gemide); İki tüp dondurucu köpük
- Mini oyun adımları: Akustik siper (kacin); Devre dışı bırak (kenetle)
- Çatışma: var

Kırmızı yıldız plazmasıyla çalışan otonom bir savaş kulesi arızalanmış, etrafa ateş açıyor.

- Karar: Bataryayı kışlaya geri ver, kazayı raporla → Varek Muhafızları minnettar; batarya sende kalsın dediler.
- Karar: Bataryayı gizlice gemine tak → Batarya senin; kışla bir şey sormadı.


### MAG-SQ-05: Axira Tapınağında Kadim İlahilerin Sırrı

- Tür: Mistik, ritim eşleme
- Yer: Magentor Yarımadası → Axira Halkası → Zümrüt Sütunlu Salon
- Kişi: Baş Rahibe Seraphina
- Ön koşul: Astral melodi algılama yeteneği (Yeşil Yıldız ekolünde Seyrüsefer Uzmanı)
- Mini oyun adımları: Ritim takibi (ritim)

Zümrüt sütunlar belirli bir vuruş ritmiyle titriyor; ritmi tutanın önünde mabedin altındaki tohum mahzeni aralanır.

- Karar: Tohumları halka dağıt → Başkent halkı kutsal ekmeğini yapacak.
- Karar: Akademiye biyolojik incelemeye götür → YGK genetik araştırmaya başladı.


### MAG-SQ-06: Uma Sanatçılar Sokağında Akustik Şantaj

- Tür: Sosyal casusluk, dinleme
- Yer: Magentor Yarımadası → Uma Halkası → Sanatçılar Locası
- Kişi: Baş Müzisyen Orpheus Dan
- Ön koşul: Mikro-frekans kaydedici
- Mini oyun adımları: Casus dinleme (yaklas); Kaset değişimi (kademeli)

Seyircilerin arasında diplomatik bir şantajcı var; cebinde soylu bir hanedanın kristal kaseti.

- Karar: Kaseti soyluya iade et → Soylu minnettar; Sinha tezgâhı sana bir akustik çip gönderdi.
- Karar: Gizli şantaj kaydını YGK'ya ver → Kayıt Akademinin arşivinde; YGK sana borçlu.


### WST-SQ-01: Zinas Denizi Ortasında Hayalet Ticaret Kalyonu

- Tür: Deniz keşfi, hayatta kalma
- Yer: Batı Kuşağı → Zinas Denizi → Sürüklenen Kalyon Güvertesi
- Kişi: Kaptan Marik Vane
- Ön koşul: Sınıf II (Rüzgarkıran) ya da üstü gemi; Deniz sonarı donanımı
- Mini oyun adımları: Sis içinde arama (yaklas); Zihin kontrol kristali (tut)

Yoğun sisin içinden bir çıngırak sesi; sürüklenen bir kalyonun mürettebatı hipnoz altında.

- Karar: Kalyonu çekerek Julithan limanına götür → Julithan liman idaresi kalyonun yükünü seninle paylaştı.
- Karar: Yükü yağmala, gemiyi batır → Yük senin ama Julithan hayalet kalyonun kaderini öğrendi.


### WST-SQ-02: Loran Vadisi'nde Batık Laboratuvarın Uyanışı

- Tür: Su altı arkeolojisi, basınç yönetimi
- Yer: Batı Kuşağı → Loran Vadisi → Çökük Biyo-Laboratuvar
- Kişi: Arkeolog Selyna Thorne
- Ön koşul: Basınç kalkanı seviye 2; Çöl Tilkisi ya da Mammoth (araç hangarı)
- Mini oyun adımları: Dalgıç inişi (sonar); Basınç odası (basinc)

Manta aracıyla dip yarığa iniliyor; laboratuvarın odaları su almış.

- Karar: Kadim su-yosunu kültürünü kurtar → Oksijen üreten devrimsel bir biyom hücresi.
- Karar: Enerji reaktörünü sök → Laboratuvar çöktü ama saf graviton hücreleri çıktı.


### WST-SQ-03: Julithan Senatosunda Suikast Alarmı

- Tür: Casusluk, keskin nişancılık, akustik engelleme
- Yer: Batı Kuşağı → Julithan Başkenti → Senato Balkonları
- Kişi: Senatör Cassian Drake
- Ön koşul: Sonik nabız tabancası; Diplomatik geçiş belgesi (YGK kaydı)
- Mini oyun adımları: Tetik sesini yakala (nisan); Sonik şok (refleks)

Senatör konuşurken localardan birinden metal sürtünmesi geliyor: bir suikastçı.

- Karar: Suikastçıyı yakala → Senato kurtuldu.
- Karar: Senato sırrını sakla → Sır seninle; Senato seni korumaya aldı.


### WST-SQ-04: Anitor Krallığı Sınırında Firari Şövalye

- Tür: Kovalamaca, onur düellosu
- Yer: Batı Kuşağı → Anitor Sınırı → Kuzgun Kayalıkları
- Kişi: Firari Şövalye Sir Gareth
- Ön koşul: Filtra Ağır Plazma Tüfeği ya da Zhaor Işık Mızrağı; Bir zırh kuşanılı
- Mini oyun adımları: Düello (kacin)
- Çatışma: var

Sir Gareth'i kraliyet muhafızları kovalıyor; seni de onun yanında sanıyorlar.

- Karar: Şövalyeyi Anitor'a teslim et → Anitor kralı adaleti sağladı.
- Karar: Sir Gareth'i kurtar ve ekibe al → Sir Gareth mürettebatında; Anitor sana kırgın.


### WST-SQ-05: Filtra Oksit Dağlarında Madenci İsyanı

- Tür: Müzakere, taktik bastırma
- Yer: Batı Kuşağı → Filtra Oksit Dağları → Derin Cevher Ocağı 9
- Kişi: Maden Lideri Borok Demirçekiç
- Ön koşul: Karizma / diplomasi seviye 2 (Sarı Yıldız ekolünde Seyrüsefer Uzmanı) ya da ağır zırhlı birlikler (Filtra oksit zırhı)
- Mini oyun adımları: Kriz noktası (sonar)

Madenciler zehirli gaz sızıntısı yüzünden asansörleri kilitlemiş.

- Karar: Havalandırmayı kendi geminden tamir et → Madencilerin güvenini kazanıp barışçıl bir çözüm buldun.
- Karar: Ocakları zorla aç, elebaşlarını tutukla → Şirket sahipleri seni takdir ediyor.


### WST-SQ-06: Safran Sıradağlarında Kayıp Kervanın Çanları

- Tür: Arama-kurtarma, çığ tehlikesi
- Yer: Batı Kuşağı → Safran Dağları → Kör Vadi Geçidi
- Kişi: Kervancıbaşı El-Mansur
- Ön koşul: Çöl Tilkisi ya da Mammoth (araç hangarı); Termal tarayıcı
- Mini oyun adımları: Çan akustiği (yaklas); Kaya kırma (tut)

Kar ve kaya altına gömülmüş bir kervan; çanları hâlâ ara ara çalıyor.

- Karar: Önce canları kurtar → Kervandaki bütün yolcular sağ.
- Karar: Önce safran baharat sandıklarını çıkar → Paha biçilmez egzotik yük kurtuldu.


### EST-SQ-01: Ajmero Kulesi'nde Fırtına Sığınağı

- Tür: Hayatta kalma, kule savunması
- Yer: Doğu Kuşağı → Zorah Çölü → Ajmero Kulesi Terası
- Kişi: Kule Bekçisi Rashid
- Ön koşul: Çöl filtreli çevre giysisi; Kum fırtınası barometresi
- Mini oyun adımları: Kapıları mühürleme (kademeli); Kum kertenkeleleri (nisan)
- Çatışma: var

Manyetik bir fırtına yaklaşıyor; kulenin dört yönündeki taş sürgüler açık.

- Karar: Dışarıda kalan yabancı kervanı içeri al → Kuledeki oksijen riske girdi ama hayatlar kurtuldu.
- Karar: Kapıları açma, güvenliği koru → Kule sakinleri sorunsuz kurtuldu.


### EST-SQ-02: Cam Düzlüklerinde Işık Yankısı Avı

- Tür: Yaratık avı, ışık-ses bulmacası
- Yer: Doğu Kuşağı → Zorah Çölü → Erimiş Cam Krateri
- Kişi: Usta Avcı Varis
- Ön koşul: Lazer kırılma prizması; Rezonans yayı
- Mini oyun adımları: Yankı takibi (frekans)
- Çatışma: var

Görünmez Kristal Çöl Akrebi ayak seslerinden değil, camın çınlama frekansından bulunur.

- Karar: Akrebi Lonca'ya teslim et → Avcılar Loncası ödülü verdi.
- Karar: Akrep kabuğunu işle → Kristal kabuk rezonans camına dönüştü.


### EST-SQ-03: Nirdol Boynunda Haydut Pususu ve Barikat

- Tür: Akustik taktik savaş
- Yer: Doğu Kuşağı → Mavi Hardrin Dağları → Nirdol Boğazı
- Kişi: Muhafız Yüzbaşısı Korgan
- Ön koşul: Kırmızı Yıldız ekolünde Yıldız Muhafızı kıdemi (300 puan); Zırh kalkanı
- Mini oyun adımları: Kanyonda yankı savaşı (nisan)
- Çatışma: var

Haydutlar yüksek kayalıklardan ateş açıyor; kanyon her atışı üç kez yankılıyor.

- Karar: Haydut liderini düelloya çağır → Lideri yendin; çete dağıldı.
- Karar: Kanyonu patlatıp geçidi kapat → Haydutlar gömüldü; ticaret yolu bir hafta kapalı.


### EST-SQ-04: Morluk Kapısı'nda Mavi Kristal Uğultusu

- Tür: Manyetik frekans dengeleme
- Yer: Doğu Kuşağı → Mavi Hardrin Dağları → Mavi Işık Kemeri
- Kişi: Keşiş Eldor
- Ön koşul: Manyetik ayar çatalı; Aether izolasyon eldiveni
- Mini oyun adımları: Manyetik dengeleme (rotasyon)

Hardrin'in gece ışığı dengesizleşmiş, kervanların pusulalarını bozuyor.

- Karar: Frekansı doğal mavi ışığa sabitle → Dağın bin yıllık mistik dengesi korundu.
- Karar: Enerjiyi gemi kalkanlarına şarj et → Gemi geçici olarak sınırsız kalkan enerjisi çekti.


### EST-SQ-05: Doğu Kırık Vadisi'nde Çökmüş Güneş Tapınağı

- Tür: Zindan keşfi, labirent
- Yer: Doğu Kuşağı → Doğu Kırık Vadi → Yeraltı Güneş Mahzeni
- Kişi: Tarihçi Alim Tariq
- Ön koşul: Taşınabilir projektör; Sismik tarayıcı
- Mini oyun adımları: Sesle yön bulma (ton)

Kör karanlıkta yön, duvara vurulan bastonun yankısından bulunur.

- Karar: Kadim güneş küresini yerinde bırak → Tapınak ayakta; hiyeroglifler kopyalandı.
- Karar: Küreyi söküp al → Tapınak çökerken kaçtın; paha biçilmez bir antika.


### EST-SQ-06: Kahergonat Sınırında Firari Tarikatçının İtirafları

- Tür: Casusluk, sorgu, ahlaki tercih
- Yer: Doğu Kuşağı → Kahergonat Sınır Hattı → Karakol Hücresi
- Kişi: Muhafız Teğmeni Selim
- Ön koşul: Fenrir Işık Pelerini ya da YGK Baş-Büyücü Cübbesi
- Mini oyun adımları: Fısıltıyı ayrıştırma (frekans)

Tarikatçı aynı anda iki sesle konuşuyor: kendi sesi ve Lord Sharon'un fısıltısı.

- Karar: Tarikatçıyı dinle, haritayı al → Tarikatçı Kahergonat'ın gizli arka giriş haritasını verdi: Final on altıda zırhlının kalkanı yüzde yirmi beş kırık başlar.
- Karar: Sınır muhafızlarına teslim et → Muhafızlar tarikatçıyı aldı.


### NTH-SQ-01: Halyon Sürgün Adasında Kaçak Simyacı Vakası

- Tür: Firar kovalamacası, büyü düellosu
- Yer: Kuzey Kuşağı → Mormon Denizi → Halyon Adası Kayalıkları
- Kişi: Cezaevi Müdürü Orik
- Ön koşul: Sınıf II (Rüzgarkıran) ya da üstü gemi; Donma önleyici motor ısıtıcıları
- Mini oyun adımları: Büyü kalkanını kırma (frekans)
- Çatışma: var

Deli simyacı etrafına buzdan bir kalkan örmüş; büyüleri kayalara çarpıyor.

- Karar: Simyacıyı muhafızlara teslim et → Halyon cezaevi simyacıyı geri aldı.
- Karar: Deli Simyacı Malakor'u gemine al → Malakor laboratuvarında; Kuzey bunu hoş karşılamadı.


### NTH-SQ-02: Gümüş Tüy Takımadalarında Göçmen Kuşların Çığlığı

- Tür: Ekolojik kurtarma, akustik yön bulma
- Yer: Kuzey Kuşağı → Gümüş Tüy Adaları → Yuva Kayalıkları
- Kişi: Kuşbilimci Elspeth
- Ön koşul: Biyo-akustik sensör modülü
- Mini oyun adımları: Sinyal parazitini kesme (frekans)

Terk edilmiş bir korsan telsiz kulesi kuşların yönünü şaşırtıp kayalara çarpmalarına yol açıyor.

- Karar: Kuleyi kuş sığınağı olarak yeniden programla → Ekolojik denge korundu.
- Karar: Kuleyi askerî erken uyarı radarına çevir → Kuzey donanması için bir üs.


### NTH-SQ-03: Zeris Kulesi Tepesinde Yıldız Parazitleri

- Tür: Yüksek irtifa savaş, droid bakımı
- Yer: Kuzey Kuşağı → Zeris Kulesi → Açık Çatı Gözlem Platformu
- Kişi: Baş Gözlemci Valerius
- Ön koşul: Yüksek irtifa oksijen maskesi; Statik boşaltıcı
- Mini oyun adımları: Platformda yürüyüş (nisan)
- Çatışma: var

Kulenin en üstündeki merceklere etobur yıldız parazitleri yapışmış.

- Karar: Mercekleri temizleyip teleskobu onar → Uzayın derinliklerini tarayan teleskop yeniden açıldı.
- Karar: Parazitlerin enerjisini gemi sensörüne çek → Amiral geminin tarama menzili ikiye katlandı.


### NTH-SQ-04: Norvask Buz Krallığında Donmuş Mamut Mezarı

- Tür: Kazı, paleontoloji, buz kırma
- Yer: Kuzey Kuşağı → Norvask Krallığı → Buzul Mağarası 12
- Kişi: Buz Avcısı Jarek
- Ön koşul: Termal lazer kesici; Ağır kışlık giysi (termal giysi ya da kriyo çalışması)
- Mini oyun adımları: Buz çözme ritimleri (basinc)

Buzun içinde bir mamut; aşırı ısı verilirse mağara çöker.

- Karar: Fosil kemikleri ve dişleri müze için çıkar → Büyük bir arkeolojik değer.
- Karar: Bozulmamış hücreyi ve geni klonlama için al → Biyoteknolojik deneyler.


### NTH-SQ-05: Helgar Kara Buz Dükalığında Kaçakçılık Ağı

- Tür: Pusu, soğuk takip
- Yer: Kuzey Kuşağı → Helgar Dükalığı → Buz Altı Tünelleri
- Kişi: Gümrük Şefi Brann
- Ön koşul: Kızılötesi kar gözlüğü; Susturuculu silah
- Mini oyun adımları: Tünelde sessiz ilerleme (yaklas)

Kara buz kristali kaçıran bir konvoy tünellerde ilerliyor.

- Karar: Kaçakçıların kristallerini sat → Kristaller pazarda.
- Karar: Helgar madenlerine serbest erişim iste → Dük madenlerini sana açtı.


### NTH-SQ-06: Drahmir Sınırında Donmuş Gözcü Kulesi

- Tür: Savunma, barikat
- Yer: Kuzey Kuşağı → Drahmir Sınırı → Burç 3
- Kişi: Yüzbaşı Vorn
- Ön koşul: Ağır plazma tüfeği (Filtra Ağır Plazma Tüfeği); Taktik kalkan
- Mini oyun adımları: Karanlık yaratık püskürtme (kacin)
- Çatışma: var

Kahergonat'ın kara sisinden çıkan buz yaratıkları kuleye tırmanıyor.

- Karar: Kuleyi Drahmir'e teslim et → Drahmir muhafızları kuleyi devraldı.
- Karar: Üç sınır muhafızını ekibe al → Üç Drahmir askeri koloni ve gemi kara savunmasında.


### STH-SQ-01: Fleeplee Sahilinde Işık Tozu Fırtınası

- Tür: Hasat, toz manyetizması
- Yer: Güney Kuşağı → Fleeplee Sahili → Işık Kumsalı
- Kişi: Balıkçı Reisi Morwen
- Ön koşul: Toz süzgeci ağları; Toz geçirmez tulum
- Zaman: Işık tozu dalgası en yoğun Mavi Akşam nöbetinde.
- Mini oyun adımları: Toz dalgasını yakalama (kademeli)

Fenrir'den altın sarısı bir toz dalgası yükseliyor.

- Karar: Tozu köyün ortak ambarına bırak → Balıkçı köyü kışı refah içinde geçirecek.
- Karar: Tozu kendi laboratuvarına yükle → Gemi jeneratörleri için saf biyo-ışık yakıtı.


### STH-SQ-02: Tentran Işınlanma Platformunda Graviton Sapması

- Tür: Yüksek mühendislik, ağırlıksızlık bulmacası
- Yer: Güney Kuşağı → Tentran Platformu → Havadaki Ana İtki Halkası
- Kişi: Baş Mimar Zephyra
- Ön koşul: Graviton ayar anahtarı; Yerçekimi botları
- Mini oyun adımları: Sıfır yerçekimi (yaklas); Rotoru kilitle (kenetle)

Platformun itim jeneratörlerinden biri bozulmuş; şehir havada yan yatıyor.

- Karar: Ana rotoru onar → Şehir yatay dengesine kavuştu.
- Karar: Rotorun iticisini gemine çift motor olarak bağla → Tentran acil durum desteğiyle idare ediyor; gemin süper hız kazandı.


### STH-SQ-03: Uçan Arin Adası'nda Kanatlı Elçinin Gizli Mektubu

- Tür: Diplomatik casusluk, havada takip
- Yer: Güney Kuşağı → Uçan Arin Adası → Rüzgâr Kulesi
- Kişi: Kanatlı Elçi Aethelgard
- Ön koşul: Uçan araç ya da planör modülü (rezonans kayığı); Şifre çözücü çip
- Mini oyun adımları: Hava takibi (denge)

Arin'den güney krallıklarına gizli bir mektup taşıyan casus bir kuş havalanıyor.

- Karar: Mektubu değiştirmeden yerine ulaştır → İki krallık arasında savaş önlendi.
- Karar: Mektubu okuyup şantaj için kopyala → Yüksek bir siyasi koz.


### STH-SQ-04: Veradon Limanında Bataklık Korsanları Ablukası

- Tür: Deniz savaşı, taktik havan atışı
- Yer: Güney Kuşağı → Veradon Limanı → Dış Dalgakıran Barikatı
- Kişi: Liman Valisi Roderick
- Ön koşul: Sınıf III (Aethel Muhafızı) ya da üstü gemi
- Mini oyun adımları: Korsan barikatını kırma (nisan)
- Çatışma: var

Keralon bataklıklarından gelen dört korsan zırhlısı limanı kapatmış.

- Karar: Veradon ticaret filosunu koru → Filo limana sağ salim girdi.
- Karar: Korsan gemisini ele geçir → Zırhlı Korsan Korveti filoda; Veradon korsanla iş tuttuğunu düşünüyor.


### STH-SQ-05: Tharal Krallığında Antik Işık Tozu Değirmeni

- Tür: Bulmaca, çark mekaniği
- Yer: Güney Kuşağı → Tharal Krallığı → Büyük Kristal Değirmen
- Kişi: Değirmenci Yaşlı Bran
- Ön koşul: Kinetik kaldıraç aleti
- Mini oyun adımları: Çarkları hizalama (ritim)

Değirmenin dev kristal çarkları sıkışmış.

- Karar: Değirmeni halka aç → Yerel halkın gıda sorunu çözüldü; koloni de bunu duydu.
- Karar: Üretim payı al → Değirmenin bir payı senin.


### STH-SQ-06: Keralon Bataklıklarında Sis Feneri Canavarı

- Tür: Efsanevi yaratık avı, körleme dövüş
- Yer: Güney Kuşağı → Keralon Bataklıkları → Kör Sis Çukuru
- Kişi: Bataklık Cadısı Moira
- Ön koşul: Asit geçirmez zırh (bir zırh kuşanılı); Güçlü fener; Zhaor Işık Mızrağı ya da Filtra Ağır Plazma Tüfeği
- Mini oyun adımları: Sahte fener tuzağı (nisan)
- Çatışma: var

Canavar kafasındaki parlayan feneri sallayarak kurbanlarını çekiyor. Görsel fener yanıltıcı; yalnız derin göğüs hırıltısı gerçek.

- Karar: Canavarı yok et, kristali al → Sis feneri kristali senin: Keralon sisine bağışıklık, kalkan ve sensör bonusu.
- Karar: Bataklık halkına hediye et → Bataklık köyleri canavarın kristalini kutsal emanet sayacak.


## 9. Kronikler (kadim tarihçe)

- **Bölüm 1: Kozmik şafak ve Alt Evren'in Kara Nüvesi** (yer: Sesli arşiv küreleri (YGK Kat -1: Röle ve Mekik İskelesi, Yeraltı Arşivleri)). YGK kat eksi birdeki arşiv küreleri.
- **Bölüm 2: Üçler miti: Gezegen Mancınığı ve Kızıl Kıyamet** (yer: Sesli arşiv küreleri (YGK Kat -1: Röle ve Mekik İskelesi, Yeraltı Arşivleri)). Arşiv kürelerinde, birinci bölümden sonra.
- **Bölüm 3: Koruyucuların inişi ve Tonoflenya hapishanesinin örülüşü** (yer: Aether Çekirdeği (Tenohris Sarayı)). Tenohris Sarayı'ndaki Aether Çekirdeği.
- **Bölüm 4: Cahelon'un laneti ve komşu gezegendeki su mezarı** (yer: Zirve İğnesi (YGK Kat 6: Yüksek Konsey ve Gözlemevi)). Final görevi üçten sonra Kefius'un çağrısıyla Zirve İğnesi yeniden hizalanınca, komşu gezegene bakarak.
- **Bölüm 5: Malken ırkının doğuşu ve Birinci Çağ** (yer: Lonca ihtiyarı (Malkenia, 1. halka: Elyndra)). Elyndra halkasındaki lonca ihtiyarı.
- **Bölüm 6: Tyzrakhel'in görünmez ışık kulesi ve rahibeler** (yer: Antik tapınak (Uçan Arin Adası)). Uçan Arin Adası'ndaki keşiş, ikinci kez konuşunca.
- **Bölüm 7: Kahergonat'ın doğuşu ve Lord Sharon** (yer: Sınır yolları levhası (Malkenia, 6. halka: Zhaor)). Zhaor halkasındaki sınır yolları levhası, Kahergonat yönü.
- **Bölüm 8: Tenos ve Harees çağının sonu: ihanetin mızrağı ve Beyaz Kıyamet** (yer: Batık kulenin tepesi (Kara Göl ve Büyük Krater)). Kara Göl'ün batık kulesi.
- **Bölüm 9: Valen'in portalı, Kara Göl ve yitik kuşaklar** (yer: Batık kulenin tepesi (Kara Göl ve Büyük Krater)). Kara Göl'ün batık kulesinde, sekizinci bölümden sonra.
- **Bölüm 10: Bagrius hanedanı ve bilimin şafağı (İkinci Çağ)** (yer: I. Bagrius anıtı (Malazar'ın aether ocakları)). Malazar ocaklarındaki I. Bagrius anıtı.
- **Bölüm 11: Restorasyondan derin uzaya: IV. Bagrius çağı (günümüz)** (yer: Kuruluş kitabesi (YGK Kat 1: Varış Avlusu ve Ağır Plazma Talimgâhı)). YGK kat birdeki kuruluş kitabesi.

Çağlar: Kozmik Şafak, Büyük Mühür Çağı, Birinci Malken Çağı, Büyük İhanet ve Yıkım, Kayıp Fetret Devri, İkinci Çağ: Rönesans, Üçüncü Çağ: İmar, Dördüncü Çağ: Derin Uzay (günümüz).

## 10. Tonoflenya'daki sistemler (kısa)

- **Para:** Malken Lirası (ML) ve Galaktik Kredi (GK). Kabulde 300 ML + 100 GK verilir. Pazarlarda alım ve satım, veri paketi satışı, gemi bakımı.
- **Eşya ve zanaat:** beş kademe eşya; gemide dökümhane masası, aether laboratuvarı ve imbik ünitesi; silah ve zırh kuşanma.
- **Subaylar ve Yıldız Ekolü:** altı ekol (Elyndra, Varek, Axira, Zhaor, Sinha, Uma). Gemi istasyonlarına subay atanır; ekol kıdemi yeni mekân, operasyon ve fenomenle artar.
- **Yıldız Zamanı:** günde altı nöbet; her nöbetin yıldızı farklı etki verir. "Mor İkindi" (Elyndra) nöbetinin tarifinde zaten "Akademi dersleri, büyü deneyleri" yazar.
- **Sıçrama:** Tonoflenya ile Aethelis arası 8 saat; şarj 2 gün (Tentran modülatörüyle 1).
- **Büyüyle ilgili mevcut parçalar:** aether, saf aether, büyü tozu ve ışık tozu hammaddeleri; Malazar Dağı ve ocakları; Kat -3'teki Malazar Çatlağı; Korvinus'un Anti-Büyü Kürsüsü ve Faelan'ın Hata Büyüsü Kürsüsü (ad olarak; öğrenilen büyü yok); koloni tarafında Orin'in gemisinden Malazar Asası ve Malazar Büyü Kristali, onlardan Malazar büyü tozu ve tapınaktaki rezonans sunağı (üç tılsım).

## 11. Yeni içerik için güvenli bağlantı noktaları

Kural: mevcut hikâye ve son değişmez; yeni içerik ancak buralara yeni yol olarak bağlanır.

### 11.1 Akademi katları ve şu an içlerinde olanlar

- **YGK Kat 6: Yüksek Konsey ve Gözlemevi**: noktalar: Zirve İğnesi, Yüksek Konsey Salonu, Valen Lazeria, YGK Yüksek Konsey Rektörü, Morvenna Kael, Yüksek Konsey Vekili
- **YGK Kat 5: Yerçekimi İskelesi, Aether Simya Laboratuvarı ve Kseno-Seralar**: kürsü/kişi: Trellis-7, Seraphine; noktalar: Geminin yerçekimi iskelesi, Lyra, Aether Simya Laboratuvarı optikçisi, Trellis-7, Kseno-Botanik ve Zehir Kürsüsü, Seraphine 'Işık Yolu' Rael, Şifa ve Empati Kürsüsü, Simya laboratuvarı, boyut sabitleyici rafı
- **YGK Kat 4: Kartografya, Kütüphane ve Taktik Simülatör**: kürsü/kişi: Profesör; noktalar: Akustik körleme simülatörü, Kefius Arateon, Kartografya ve Alt-Evren Kürsüsü Kıdemli Arkanisti, Profesör Püskül, Kütüphane ve Kartografya
- **YGK Kat 3: Kristal İhtisas ve Zanaat Atölyeleri**: kürsü/kişi: Korvinus, Forges, Zeva; noktalar: Magitech tezgâhı, Korvinus Vael, Anti-Büyü Kürsüsü, Forges, Mekanik ve Enerji Kürsüsü, Zeva 'Kılavuz' Thorne, Mekik ve Denge Kürsüsü
- **YGK Kat 2: Yıldız Ekolleri Amfileri ve Cep-Park**: kürsü/kişi: Faelan, Kaelis; noktalar: Akustik yıldız haritası, Derin uzay veri masası, Tixie, Zefiryum kökenli teknopat kaçak, Faelan Cinder, Hata Büyüsü Kürsüsü, Kaelis 'Echo' Duman, Ses ve İllüzyon Kürsüsü
- **YGK Kat 1: Varış Avlusu ve Ağır Plazma Talimgâhı**: noktalar: Kabul masası, Kuruluş kitabesi, Akademi subay kurulu, Ignador, Ağır Plazma Talimgâhı Eğitmeni
- **YGK Kat -1: Röle ve Mekik İskelesi, Yeraltı Arşivleri**: kürsü/kişi: Maelis; noktalar: Sesli arşiv küreleri, Maelis, Röle ve Mekik İskelesi Görevlisi
- **YGK Kat -2: Sessiz Arşivler ve Disiplin**: kürsü/kişi: Silas; noktalar: Rezonans hücresi, Silas Vex, Gölge ve Psikometri Kürsüsü
- **YGK Kat -3: Malazar Çatlağı ve Yasak Kronikler**: kürsü/kişi: Jolkar, Caelum; noktalar: Kriyojenik tohum depoları, Yasak kronik dolapları, Jolkar Tectus, Rünler ve Antik Dil Kürsüsü, Caelum Nokturnus, Astral Seyahat Kürsüsü
- **YGK Kat -4: Kadim Stasis Hücreleri ve Enerji Çekirdeği**: kürsü/kişi: Zephyra,, Morwenna; noktalar: Reaktör çekirdeği, Zephyra, Göğün Hiddeti, Stasis tutsağı, Morwenna, Stasis tutsağı, eski Tyzrakhel rahibesi adayı
- **YGK Kat -5: Sıfırıncı Karanlık ve Dünya Çivisi**: noktalar: Boyut yarığı test kuyusu, Dünya Çivisi

Görece boş katlar: Kat 1 (yalnız kabul masası, kitabe, subay kurulu ve Ignador), Kat -1 (arşiv ve Maelis), Kat -2 (Silas), Kat -5 (test kuyusu ve Dünya Çivisi). Kat 4'te tek kürsü var. Öğrenci karakteri hiç yok; yatakhane, sınıf, yemekhane gibi yaşam alanları tanımlı değil. Bunlar yeni karakter ve ders için en uygun yerler.

### 11.2 Zaman çizelgesinde güvenli bağlama anları

- **Tonoflenya'dan önce (koloni):** asa, kristal ve tapınaktaki sunak. Büyük görevlere hiç dokunmaz.
- **İlk varış ile Büyük görev 1 arası:** YGK kaydından sonra akademiye giriş dersi, ilk büyü dersleri.
- **Büyük görev 1, 3 ve 6'dan sonra:** akademi kürsüleri bu eşiklerde açılıyor (Faelan, Kaelis ve Forges 1'den, Korvinus, Silas, Trellis, Seraphine ve Zeva 3'ten, Jolkar ve Caelum 6'dan sonra). Büyü dersleri bu kürsülere bağlanırsa doğal bir sıra oluşur.
- **Büyük görev 3 ile 4 arası:** Zirve İğnesi (4B) burada; Kat 6 gözlemevi ışık ve hizalama büyüleri için uygun.
- **Akademi darbesi (Ignador) öncesi ve sonrası:** iki farklı akademi düzeni var (Valen ya da Morvenna yönetimi). Yeni akademi görevleri iki düzende de çalışmalı ya da her birine ayrı kol olmalı.
- **Yan görevler ve bölgesel zincirler:** büyü, mevcut mini oyunların yanına seçmeli bir "büyüyle çöz" yolu olarak eklenebilir; eski çözüm yolu kalır.
- **Büyük görev 20 ve epilogdan sonra:** epilog serbest keşfin sürdüğünü söylüyor. Büyü kolunun büyük finali için en güvenli yer burası; mevcut son değişmez.

### 11.3 Çakışma riski olan yerler (dokunulmaması gerekenler)

- Büyük görevlerin sırası, koşulları ve kararları (örneğin Görev 17'deki Elyon ya da kuşatma seçimi, Görev 18'deki mızrak).
- Cahelon, Lord Sharon ve Xarathia savaşları ve fazları.
- Akademi darbesinin iki sonucu ve Zephyra ile Morwenna'nın kaderi.
- Ambargonun merkez ve taşra sonuçları, Magentor kapanışı.
- Kroniklerin sırası (2 ← 1, 4 ← Zirve hizası, 6 ← Arin dersi, 9 ← 8).
