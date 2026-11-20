# Aethelis Seyrüsefer ve Savaş Mekanikleri: Akustik Çatışma, Yetenek Ağaçları, Mürettebat ve Koloni Nüfusu

Bu doküman; görsel arayüzü bulunmayan, tamamen üç boyutlu ses mimarisi (binaural soundscape) ve dokunsal ekran jestleri üzerinden deneyimlenen uzay simülasyonunun çekirdek mekaniklerini tanımlar. Doküman dört temel sütun üzerine inşa edilmiştir: A Blind Legend esintili reaktif ve tur tabanlı akustik savaş modu, oyuncu (kaptan) ve gemi yetenek ağaçları, prosedürel mürettebat atama ve dinamik haber bildirim sistemi ile ana gezegenin demografik nüfus simülasyonu.

---

## 1. Reaktif Akustik Savaş Modu (A Blind Legend Esinlenmeli Çatışma Duruşu)

Uzayda serbest seyrüsefer veya görev icrası sırasında bir tehditle karşılaşıldığında, genel dolaşım sesleri geri plana çekilir ve oyun özel bir **Savaş Duruşu (Combat Stance)** moduna geçer. Bu modda dünya veya kokpit içi serbest dolaşım duraklar; ses sahnesi yalnızca **Saldıran (Düşman Gemisi)** ve **Savunan (Oyuncunun Gemisi)** arasındaki ölümcül it dalaşına odaklanır.

### 1.1 Akustik Konumlandırma ve Hedefleme Mantığı

* **3D Ses Konumlandırması (Binaural Audio Tracking):** Düşman gemisinin iyon motoru homurtusu, kalkan vızıltısı veya silah şarj sesi 360 derecelik bir ses çemberinde hareket eder. Düşman gemisi sağımızdaysa ses tamamen sağ kulaklıkta yankılanır; arkamızdan dolanıyorsa bas frekanslar boğuklaşır ve mesafe uzaklaşır.
* **Pruva Kilidi (Nokta Hedefleme):** Oyuncu parmağını sağa veya sola kaydırarak gemisinin burnunu düşman sesine çevirir. Düşmanın motor sesi her iki kulaklıkta da eşit şiddet ve tınıya ulaştığında (merkez stereo dengesi), gemi bilgisayarı tiz bir "Kilitlenme Tonu (Lock-on Chime)" verir.

### 1.2 Çatışma Turu Yapısı: Sıralı ve Reaktif Dinamikler

Savaş sistemi katı ve durağan bir bekleme sırası değildir. Oyuncunun hamlesi ile düşmanın hamlesi arasında reaktif tepki pencereleri bulunur:

```
[ 1. OYUNCU HAMLE EVRESİ ] ──► (Ateş / Kalkan / Manevra)
              │
              ▼
[ 2. ETKİ VE AKUSTİK DÖNÜŞ ] ──► (Gövde Delinmesi / Kalkan Rezonansı)
              │
              ▼
[ 3. DÜŞMAN HAZIRLIK SESİ ] ──► (Düşman Silahını Şarj Ediyor - Ses Uyarısı)
              │
              ├──► [ Gemi Sağlamsa ] ──► (REAKTİF SAVUNMA PENCERESİ: Blok / Kaçınma / Karşı Atış)
              │
              └──► [ Sistemler Hasarlıysa ] ──► (TEPKİSİZ KİLİTLENME: Savunmasız Darbe Alma)
              │
              ▼
[ 4. TUR DEĞERLENDİRMESİ VE YENİ HAMLE DÖNGÜSÜ ]
```

1. **Oyuncunun Hamlesi (Saldırı / Hazırlık):** Oyuncunun inisiyatifinde olan kısımdır. Oyuncu kilitlendiği hedefe ekran jestleriyle saldırı emri verir.
2. **Düşmanın Hamlesi ve Erken Ses Uyarısı:** Düşman sırası geldiğinde doğrudan hasar uygulanmaz; düşman gemisinin silah türüne göre 1.5 ila 3.0 saniyelik bir ses uyarısı (Telegraph Audio) çalar:
   * *Plazma Topu:* Gitgide tipleşen bir bobin şarj vızıltısı.
   * *Kinetik Torpido:* Ağır bir basınç tahliyesi ve hızla yaklaşan roket kükremesi.
   * *İyon Işını:* Sürekli yükselen bir rezonans ıslığı.
3. **Reaktif Savunma İhtimali ve Durumsal Kısıtlamalar:** Düşmanın saldırı sesi duyulduğu anda oyuncunun karşı hamle yapma imkanı doğar; ancak bu imkan geminin mekanik durumuna kesin olarak bağlıdır:
   * **Normal / Sağlam Durum:** İticiler ve reaktör çalışıyorsa, oyuncu doğru anda savunma jestini yaparak saldırıyı savuşturabilir, kalkanıyla absorbe edebilir veya ani bir karşı yaylım ateşiyle düşman mermisini havada patlatabilir.
   * **Hasarlı / Kısıtlı Durum:** 
     * Eğer bir önceki darbede *Yön İticileri* parçalanmışsa, kaçınma manevrası yapılamaz (Tepkisiz itki uyarısı gelir).
     * Eğer *Kalkan Kondansatörü* aşırı ısınmışsa, kalkan açılamaz.
     * Eğer *Reaktör Basıncı* kritik seviyedeyse, sistem kilitlenir; oyuncu yalnızca darbenin gövdeye çarpış sesini ve iç alarmları dinlemek zorunda kalır.

---

## 2. Savaş İçi Dokunsal Eylemler ve Jest Kütüphanesi

Savaş modunda ekranda hiçbir buton veya arayüz çubuğu bulunmaz; tüm emirler dokunsal jestlerle verilir:

| Savaş Hamlesi | Dokunsal Jest | Akustik Bildirim ve Mekanik Etki | Reaktif Kullanım Şartı |
| :--- | :--- | :--- | :--- |
| **Birincil Ateş (Hafif Silahlar)** | Ekrana Hızlı Tek Dokunma (Single Tap) | Plazma mermilerinin hedefe doğru fırlama ve zırha çarpma metalik sesi. | Her zaman kullanılabilir; enerji biterse tıkırtı sesi verir. |
| **Ağır Torpido Fırlatma** | Yukarı Hızlı Kaydırma (Flick Up) | Torpido tüpünün mekanik açılma sesi ve derinden gelen dev patlama uğultusu. | Hedefe tam akustik kilitlenme zorunludur. |
| **Reaktif Kalkan Blokajı** | Ekrana İki Parmakla Basılı Tutma | Kalkan jeneratörünün yüksek voltajla vızıldaması; merminin kalkan yüzeyinde sönümlenme cızırtısı. | Düşman atış sesi duyulduğunda doğru yöne tutulmalıdır. |
| **Acil Manevra (Kaçınma)** | Sesin Ters Yönüne Hızlı Kaydırma | Ters iticilerin patlama sesi ve kokpit yerçekimi iniltisi; mermi boş uzayı yırtarak geçer. | İtici motorların hasarsız olması şarttır. |
| **Kalkan Frekans Modülasyonu** | İki Parmakla Ekranda Çevirme (Rotate) | Düşman kalkanının tınısı dinlenir; döndürülerek silahın frekansı düşman kalkan tonuyla eşlenir. | Kalkanı delmek için eşleşme sağlandığında tiz rezonans duyulur. |
| **Karşı Ateş (Interception)** | Düşman Saldırı Anında Ekrana Çift Dokunma | Gelen torpido havadayken vurulur; iki patlamanın birbirini yok etme gürültüsü duyulur. | Yüksek refleks ve sağlam ateşleme kontrol bilgisayarı gerektirir. |

---

## 3. Çift Katmanlı Gelişim: Kaptan ve Gemi Yetenek Ağaçları

Oyunda ilerleme hem karakterin (Kaptan) kişisel uzmanlığı hem de bizzat kullanılan yıldız gemisinin fiziksel donanım mimarisi üzerinden iki ayrı dikey ağaçla yönetilir.

```
[ KAPTAN YETENEK AĞACI ]                  [ GEMİ MODİFİKASYON AĞACI ]
        │                                             │
        ├── 1. Akustik Sezgi                          ├── 1. Gövde ve Kalkan Rezonansı
        ├── 2. Taktik Komuta                          ├── 2. Vektörel İtki ve Manevra
        ├── 3. Alan Mühendisliği                      ├── 3. Silah Kondansatörleri
        └── 4. Kseno-Diplomasi                        └── 4. Karadutu ve İşlemci Çekirdeği
```

---

### 3.1 Kaptan (Oyuncu) Yetenek Ağacı

Kaptan yetenekleri, oyuncunun uzayda icra ettiği her başarılı görev, çözülen kriz ve hayatta kalınan çatışma sonucunda kazanılan **Sefer Tecrübesi (Insight Points)** ile açılır.

#### Dal 1: Akustik Sezgi ve Refleks (Sensörsüz Muharebe Uzmanlığı)
* **A-1: Kör Odaklanma:** Pruva tam düşmana kilitlendiğinde kilitlenme sesinin tolerans aralığını genişletir; hedefleme süresini %30 kısaltır.
* **A-2: Rezonans Ayırt Etme:** Düşman gemisinin zayıf yapısal noktasını motor sesindeki mikro-çatlak sesinden tespit eder; hedefe yönelik kritik hasar ihtimali doğar.
* **A-3: Zaman Esnetici Refleks:** Düşmanın saldırı uyarısı (telegraph audio) ile darbenin inişi arasındaki reaktif savunma penceresini 1.0 saniye uzatır; kaçınma manevrası yapmayı kolaylaştırır.

#### Dal 2: Taktik Komuta ve Soğukkanlılık
* **B-1: Salvo Senkronizasyonu:** Birincil silahlar ve torpidolar art arda ateşlendiğinde ikinci silahın enerji sarfiyatını sıfıra indirir.
* **B-2: Bastırma Ateşi:** Düşmanın silah şarj sesi duyulduğu anda yapılan başarılı bir vuruş, düşmanın saldırısını iptal ettirir (Stagger / Kesinti).
* **B-3: Filo Lideri Narası:** Mürettebat panik halindeyken telsizden tek bir komutla moral krizini durdurur; gemi içi operasyonları normale döndürür.

#### Dal 3: Alan Mühendisliği ve Doğaçlama Hayatta Kalma
* **C-1: Kabin Basınç Disiplini:** Gövde delindiğinde oksijen tahliye süresini uzatır; oyuncuya acil durum contalama için fazladan zaman kazandırır.
* **C-2: Aşırı Yükleme Toleransı:** Reaktör soğutması çöktüğünde acil durum bataryalarıyla silahları 1 tur daha ateşleme imkanı sağlar.
* **C-3: Hurda Yamama Sanatı:** Savaş bittiğinde enkaz parçalarını kullanarak birincil iticileri tersaneye dönmeden asgari seviyede çalışır hale getirir.

#### Dal 4: Kseno-Diplomasi ve Telsiz Aldatması
* **D-1: Frekans Karıştırma (Chaff):** Düşman füze kilitlenmesi sesini duyduğu anda telsizden sahte gürültü patlaması yayarak füzenin hedefini şaşırtır.
* **D-2: Yabancı Dil Sezgisi:** Kseno-ırkların çatışma sırasındaki telsiz bağırtılarını anında tercüme eder; bir sonraki hamlelerinin ne olacağını önceden fısıldar.
* **D-3: Ateşkes Çağrısı:** Korsan veya tarafsız gemilerle çatışırken, karşı tarafın gövdesi %25'e indiğinde teslim olmalarını veya çatışmayı bırakmalarını sağlayan diplomatik protokolü devreye sokar.

---

### 3.2 Gemi Modifikasyon ve Donanım Ağacı

Gemi yetenekleri, koloni dökümhanesinde üretilen egzotik alaşımlar ve görevlerden getirilen parçalarla tersanede doğrudan gemi iskeletine kaynaklanır.

| Modifikasyon Kademesi | Gemiye Kazandırılan Mekanik Yetenek | Akustik Değişim | Gereken Koloni Tesisi |
| :--- | :--- | :--- | :--- |
| **K1: Akustik Sönümlemeli Plakalar** | Kinetik mermi darbelerinin iç kabine ilettiği sarsıntı hasarını %40 azaltır. | Gövdeye çarpan mermilerin sesi tok bir tınlamaya dönüşür. | Ağır Metal Dökümhanesi |
| **K2: Vektörel Soğuk İtici Nozulları** | Reaktif kaçınma manevrasının tepki süresini iki katına çıkarır; yakıt yakmaz. | Ters itiş anında sert bir gaz fıslaması duyulur. | Yerçekimi İtki Hangarı |
| **K3: Çift Fazlı Plazma Bobini** | Silahlar ateşlendiğinde düşman kalkanının rezonansını zorlayarak kalkanı delip geçer. | Ateşleme anında elektrik arkı ve yüksek tiz çınlama. | Enerji ve Füzyon Reaktörü |
| **K4: Otomatik Basınç Tahliye Valfleri** | Odalardan biri delindiğinde odayı 1 saniye içinde otomatik mühürler; pilotun kabinine gaz sızmasını engeller. | Derin bir pnömatik kilitlenme ve vana kapanma sesi. | Kseno-Teknoloji Laboratuvarı |
| **K5: Kuantum Rezonans Karadutusu** | Savaşta alınan kritik darbeleri kaydedip düşmanın atış ritmini çözer; sonraki turlarda hedeflemeyi otomatikleştirir. | Bilgisayarın sakin bir sesle "Düşman modeli çözüldü" bildirimi. | İleri Bilim ve Kütüphane Kulesi |

---

## 4. Dinamik Mürettebat, Rol Atamaları ve Haber Bildirim Sistemi

Gemi büyüdükçe (özellikle Korvet, Kruvazör ve Sancak Zırhlısı sınıflarında) sistemlerin idaresi tek başına kaptana yetmez. Koloniden veya uzay kurtarma görevlerinden toplanan bireyler geminin kritik bölmelerine atanır.

```
[ AETHELİS NÜFUS HAVUZU ] ──► [ RASTGELE AD / KÖKEN ATAMASI ]
                                         │
                                         ▼
                            [ GÖREV YERİ / ODA SEÇİMİ ]
                                         │
                    ┌────────────────────┼────────────────────┐
                    ▼                    ▼                    ▼
             [ Başçarkçı ]         [ Telsiz Subayı ]    [ Taktik Topçu ]
             (Motor Dairesi)         (Köprüüstü)        (Silah Kulesi)
                    │                    │                    │
                    └────────────────────┼────────────────────┘
                                         ▼
                    [ SEFER ESNASINDA DİNAMİK OLAY TETİKLENMESİ ]
                                         │
                                         ▼
              [ SESLİ HABER VE ETKİLEŞİM BİLDİRİMİ (ALERT POP-UP) ]
```

### 4.1 Prosedürel Personel Üretimi ve Nitelikleri

Her mürettebat üyesi koloniye katıldığında prosedürel olarak üretilir:
* **İsim ve Köken:** Rastgele isim kombinasyonları (Örn: *Demir Kaya, Lyra Thorne, Kaelith Vok, Kıdemli Çavuş Aras, Tina-04*).
* **Uzmanlık Eğilimi:** Mühendislik, Muharebe, Telsiz/Keşif veya Biyo-Tıp.
* **Karakter Kusuru veya Üstünlüğü:** 
  * *Soğukkanlı:* Çatışmada panik yapmaz, tamir hızını korur.
  * *Klipsomanyak:* Hurda maden toplarken beklenmedik fazladan malzeme bulur.
  * *Ses Hassasiyeti:* Düşman kalkan frekanslarındaki değişimleri kaptandan önce duyar ve uyarır.
  * *Klosterofobik:* Uzun uzay seferlerinde morali çabuk düşer; geniş koğuşlar ister.

### 4.2 Görev Yerleri ve Operasyonel Katkıları

Oyuncu gemisindeki odalara mürettebat atar:
1. **Motor Dairesi (Başçarkçı):** Reaktör aşırı ısındığında otomatik soğutma yapar; manevra iticilerinin tepki hızını artırır.
2. **Köprüüstü / Sensör Masası (Telsiz Subayı):** Uzaydaki sinyalleri ve parazitleri süzer; düşman kilitlenmelerini 1 tur önceden haber verir.
3. **Hisar ve Silah Kulesi (Taktik Nişancı):** Birincil silahların yeniden şarj süresini kısaltır; ıskalanan atışları telafi eder.
4. **Revir (Başhekim):** Uzay anomalilerinde radyasyona maruz kalan personeli tedavi eder; pilotun yaralanma etkilerini siler.
5. **Kargo ve Maden Bölmesi (İkmal Subayı):** Yüzey inişlerinde toplanan madenlerin saflık oranını artırır.

### 4.3 Haber Nitelikli Dinamik Etkileşim Bildirimleri

Sefer sırasında, görevde veya uzayda süzülürken rastgele tetiklenen ve oyuncunun karar vermesini gerektiren olaylar meydana gelir. Bu durum ekranda bir pop-up yerine **Özel Bir Sesli Telsiz Zili (Comms Ping)** ile oyuncuya bildirilir:

* **Bildirim Sesi:** Telsizden üç tonlu kibar bir akustik zil çalar ve ardından telsiz hışırtısı gelir.
* **Etkileşim:** Oyuncu kulaklığına dokunur (çift dokunma) ve ilgili subayın sesli raporunu dinler.
* **Olay Örnekleri (Haber ve Krizler):**
  * *İyi Haber (Keşif):* "Kaptanım, Telsiz Subayı Lyra konuşuyor. Yakındaki asteroit gölgesinde terk edilmiş bir ikmal mekiği sinyali yakaladım. Rotayı 2 derece kaydırırsak sağlam yakıt kapsülleri alabiliriz."
  * *Kötü Haber / Mekanik Arıza:* "Kaptanım, Başçarkçı Demir bildirdi! Sol plazma hattındaki rezonans valfi aşındı, motor dairesine gaz sızıyor. Ya hızı yarıya düşürmeliyiz ya da bir yedek parça yakıp valfi mühürlemeliyim!"
  * *Kişisel / Moral Olayı:* "Kaptanım, Aethel-9 kökenli madenci mürettebat ile Kaelith ırkından biyoloğumuz laboratuvar alanının paylaşımı konusunda anlaştı; ortaklaşa geliştirdikleri yeni bir soğutucu alaşım müjdesi veriyorlar."
  * *Dış Tehdit Uyarısı:* "Kaptan! Sektör devriyesinden şifreli telsiz: Bölgede korsan karartması başlamış. Sinyal kulesi rotamızı değiştirmemizi öneriyor."

---

## 5. Ana Gezegen Demografisi, Nüfus Artışı ve İş Gücü Simülasyonu

Aethelis-IV sadece fabrikalardan ibaret değildir; yaşayan, nefes alan ve uzaydaki seferlerimizin başarısına göre büyüyen bir medeniyet merkezidir.

```
[ UZAY KURTARMA OPERASYONLARI ] ──► [ SIĞINMACI / MÜLTECİ GÖÇÜ ]
                                                │
                                                ▼
[ YAŞANABİLİRLİK VE TERRAFORMİNG ] ──► [ DOĞAL NÜFUS ARTIŞI ]
                                                │
                                                ▼
                                    [ TOPLAM KOLONİ NÜFUSU ]
                                                │
                 ┌──────────────────────────────┼──────────────────────────────┐
                 ▼                              ▼                              ▼
        [ Ağır Sanayi & Maden ]        [ Tersane & İnşa ]            [ Bilim & Keşif ]
        (Alaşım ve Yakıt Üretimi)      (Gemi ve Araç Montajı)        (Yeni Şemalar ve Kodeks)
```

### 5.1 Nüfus Havuzu ve Yaşam Kapasitesi

1. **Barınma Eşiği (Housing Cap):** İnşa edilen yaşam blokları, kseno-kubbeler ve yerleşkeler koloninin taşıyabileceği azami nüfusu belirler. Kapasite aşılırsa gecekondulaşma, hijyen krizleri ve moral çöküşü başlar.
2. **Nüfus Büyüme Faktörleri:**
   * *Uzay Seferleri (Dış Göç):* Vaka 1, Vaka 3, Vaka 7 gibi operasyonlardan kurtarılan mülteciler yüzlerce kişilik kafileler halinde koloniye yerleşir.
   * *Doğal Büyüme:* Temiz su akiferleri, organik sera kubbeleri ve atmosferik filtreler kuruldukça kolonideki doğum oranları ve yaşam beklentisi artar.
3. **İş Gücü Dağılımı ve Atama:**
   Koloni nüfusu soyut bir sayı değildir; oyuncu bu nüfusu üç ana üretim sektörüne paylaştırır:
   * **Sanayi ve Ekstraksiyon Gücü:** Maden ocaklarında ve dökümhanelerde çalışır. Gemi gövdesi, zırh levhası ve yakıt üretim hızını belirler.
   * **Tersane Mühendisleri:** Gemilerin ve yüzey araçlarının kızağa konma ve parça montaj sürelerini doğrudan kısaltır.
   * **Akademik ve Teori Personeli:** Kseno-teknolojileri, kadim veri disklerini analiz eder; Kaptan yetenekleri için gereken tecrübe puanı çarpanını artırır.

### 5.2 Koloni Morali ve Toplumsal Denge

Koloninin bir "Moral Nabzı" vardır. Oyuncu uzaydan koloniye her döndüğünde dinleme kulesinden koloninin genel uğultusunu dinler:
* **Yüksek Moral (Canlı Şehir Sesi):** Sokaklardan çocuk sesleri, neşeli pazar sesleri ve fabrika ıslıkları gelir. Üretim hızı %20 artar; tersane işçileri gemilere fazladan zırh bonusu ekler.
* **Düşük Moral (Terk Edilmişlik ve İsyan Sesleri):** Sokaklarda protesto sesleri, kırılan camlar ve sirenler yankılanır. Nedeni: Yetersiz besin, aşırı radyasyon fırtınaları veya uzay seferinde kaybedilen bir ekibin yarattığı yas havasıdır. Oyuncu yerel kriz görevlerine müdahale ederek morali onarır.

---

## 6. Dokunsal Girdi, Sesli Geri Bildirim ve Erişilebilirlik Arayüz Matrisi

Savaş, yönetim ve mürettebat atamalarının kör bir oyuncu tarafından ekrana bakılmaksızın akıcı şekilde yönetilebilmesi için aşağıdaki standart ses ve dokunma matrisi kullanılır:

| Oyun Durumu / Menü | Dokunsal Jest | Kulaklıktan Duyulan Akustik Yanıt | Sistemik İşlem |
| :--- | :--- | :--- | :--- |
| **Savaş: Hedef Arama** | Sağa/Sola Parmağı Sürükleme | Düşman motorunun stereo panoramik geçişi (sol/sağ). | Pruva açısı hedefe çevrilir. |
| **Savaş: Ateşleme** | Ekrana Hızlı Vuruş (Tek Dokunma) | Plazma namlusunun gümlemesi ve çarpma tınısı. | Seçili birincil silah ateşlenir. |
| **Savaş: Reaktif Savunma** | Sesin Geldiği Anda Çift Parmak Tutma | Yüksek voltaj kalkan kükremesi ve sönümleme. | Düşman mermisi absorbe edilir. |
| **Gemi: Mürettebat Listesi** | Yukarı/Aşağı Kaydırma (Swipe) | Her kaydırmada subayın ismi ve rütbesi seslendirilir (TTS / Ses Kaydı). | Personel listesinde gezinilir. |
| **Gemi: Göreve Atama** | İsim Üzerindeyken İki Parmakla Çift Dokunma | Kapı hava kilidinin kapanma sesi ve "Görev yeri onaylandı" tonu. | Subay ilgili odaya bağlanır. |
| **Gezegen: Nüfus Tahsisi** | Parmağı Sağa/Sola Yatay Sürükleme | Fabrika çarklarının dönüş hızının artması / azalması sesi. | Sanayi ve bilim arasındaki nüfus dengesi kaydırılır. |
| **Telsiz Bildirimi Kabulü** | Kulaklığa / Ekrana Çift Dokunma | Telsiz cızırtısı açılır ve subayın konuşması başlar. | Dinamik haber olayı dinlenir. |
| **Telsiz Bildirimi Erteleme** | İki Parmakla Aşağı Kaydırma | Telsiz kapanma kliği ve "Arşive alındı" fısıltısı. | Olay bekleme listesine atılır. |

---

## 7. SİSTEM ENTEGRASYONU VE OYUN ÇEVRİMİ

Bu mekanik katmanı oyunun tüm evrenini birbirine kilitler:
1. **Gezegende:** Koloni nüfusu artar, fabrikalardan iş gücüyle gemi parçaları üretilir ve tersanede yeni subaylar istihdam edilir.
2. **Kalkışta:** Kaptan kendi yetenek ağacından seçtiği akustik avantajlarla ve odalara yerleştirdiği uzman mürettebatla sefere çıkar.
3. **Uzayda:** Karşılaşılan düşmanlara karşı A Blind Legend benzeri 3D ses takibi ve reaktif dokunma jestleriyle it dalaşı verilir.
4. **Kriz Anında:** Gemideki subaylar dinamik telsiz bildirimleriyle kaptana yol gösterir veya acil kararlar aldırır.
5. **Dönüşte:** Kazanılan zaferler, kurtarılan yeni ırklar ve toplanan şemalar koloni nüfusuna katılır; koloni seviye atlar ve döngü daha derin bir evren ölçeğinde yeniden başlar.
