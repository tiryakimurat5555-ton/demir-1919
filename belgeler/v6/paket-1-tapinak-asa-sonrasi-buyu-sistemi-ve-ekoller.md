# Paket 1: Tapınak Asa Sonrası Büyü Sistemi, 4 Ekol ve Öğrenme/Test Mekaniği

> Kapsam Notu: Bu belge, `Yeni_Guncelleme` paketinin devamı niteliğindeki `Buyu_YGK_Tonoflenya_Paketi` klasörünün 1. Paketidir. Mevcut `Evrensel Savaş`, `25 Bina`, `görevler.txt` ve `Yeni_Guncelleme` kurallarını bozmadan; `Malazar Büyü Tozu` üretildikten sonra açılan Büyü Sisteminin temelini kurar.

---

## 1. Amaç ve Açılış Şartı
- Açılış Anahtarı (`Yeni_Guncelleme` Bağlantısı): Oyuncu `Kaptan Orin`'den çok düşük ihtimalle gelen `1x Malazar Asası` + `2–3x Malazar Büyü Kristali`ni birleştirip `Malazar Büyü Tozu` ürettiğinde `Axelum Tapınağı (Rezonans Sunağı)` ve `Ortak Okul (Akademi Kolu)` büyüye açılır.
- Tasarım İlkesi (Sadece Görev & Bulmaca Sistemi): Normal uzay ve kara savaşlarında yalnızca teknoloji kullanılır; büyü normal savaşlarda kullanılmaz. Büyü tamamen yeni test odaları, YGK Akademi sınavları, bulmacalar (bulmaca içi aksiyon/engel sahneleri dahil) ve Tonoflenya'daki yalnızca büyüyle çözülebilen görev hatlarını açan sistemdir.

---

## 2. İki Katmanlı Öğrenme Modeli (`Tapınak` → `YGK Akademi` → `Tonoflenya Saha`)

| Aşama | Nerede Gerçekleşir? | Ne Yapılır? |
|---|---|---|
| **Katman 1: Basit / Kök Büyüler** | **`Axelum Tapınağı`** *(Koloni)* | `Malazar Büyü Tozu` ile her ekolün ilk **2 Temel Büyüsü (Toplam 8 büyü)** + temel `Şişeleme` öğrenilir. |
| **Katman 2: Usta & Özel Bulmaca Büyüleri** | **`YGK Akademi`** *(11 Kat)* | Tüm ileri ve özel büyüler (**8 İleri Ekol Büyüsü + Özel Bulmaca Türevleri**) Akademi'deki hocalar ve karakterlerin **uzun hikâye ve işlem zincirleriyle** öğrenilir. |
| **Katman 3: Dış Saha Tehdit & Bulmaca Kullanımı** | **`Tonoflenya Bölgeleri`** *(Akademi Dışı)* | Akademi'den çıkınca bağ kopmaz; dış bölgelerde (`Filtra`, `Zorah`, `Zeris`, `Flee Plee`, `Arin`, `Malazar`) ortaya çıkan **tehditlere ve bulmacalara** karşı Akademi seni gönderir, öğrendiğin büyülerle keşif yaparsın. |

---

## 3. Dört Büyü Ekolü ve 16 Büyü Kataloğu

### Ekol 1: Element Büyüleri (Ateş, Buz, Toprak, Yıldırım)
| # | Büyü Adı | Öğrenme Yeri & Hocası | Görev / Test & Dış Saha İşlevi |
|---|---|---|---|
| 1 | Kıvılcım Dalgası (Temel) | `Axelum Tapınağı` | Donmuş kilitleri ve buz kapılarını eritir; karanlık/soğuk odalarda ısı sağlar. |
| 2 | Buzul Mühür (Temel) | `Axelum Tapınağı` | Aşırı sıcak reaktör/lav geçitlerini geçici soğutup yürünür hale getirir. |
| 3 | Ağır Toprak Yarma (İleri) | `YGK Akademi — Jolkar Tectus (Kat -3)` | Normal kazmanın açamadığı kadim kaya/enkaz duvarlarını yarar (`Filtra` & `Zorah` dış saha tehditleri). |
| 4 | Yıldırım Rezonansı (İleri) | `YGK Akademi — Ignador (Kat 1)` | Yüksek enerjili eski bobinleri ve Tonoflenya enerji kilitlerini çalıştırır. |

### Ekol 2: Taşıma ve Uçma Büyüleri (Süzülme, Kaldırma, Rüzgâr, Ağırlık)
| # | Büyü Adı | Öğrenme Yeri & Hocası | Görev / Test & Dış Saha İşlevi |
|---|---|---|---|
| 5 | Hafif Süzülme (Temel) | `Axelum Tapınağı` | Yıkık köprü, yarık ve tuzaklı zeminlerin üzerinden hasar almadan süzülerek geçer. |
| 6 | Tele-Kaldırma (Temel) | `Axelum Tapınağı` | Çok ağır kaya bloklarını, enkaz kapaklarını ve sandıkları uzaktan kaldırır. |
| 7 | Kuzey Rüzgarı Uçuşu (İleri) | `YGK Akademi — Zephyra (Kat -4)` | Yüksek kulelere, asılı istasyonlara ve uçurum üstü gizli platformlara uçarak erişim sağlar (`Zeris` & `Uçan Arin`). |
| 8 | Kervan Ağırlık Sıfırlama (İleri) | `YGK Akademi — Zeva 'Kılavuz' Thorne (Kat 3)` | Dev yükleri/eserleri taşır; saha ve gemi ambarındaki ağırlık cezasını geçici sıfırlar (`Zorah` kervanları). |

### Ekol 3: Tekno-Büyü (Devre, Frekans, Hibrit Mühür, Otomasyon)
| # | Büyü Adı | Öğrenme Yeri & Hocası | Görev / Test & Dış Saha İşlevi |
|---|---|---|---|
| 9 | Devre Kıvılcımı (Temel) | `Axelum Tapınağı` | Enerjisi kesilmiş eski bilgisayarları, kapıları ve asansörleri geçici olarak uyandırır. |
| 10 | Frekans Anahtarı (Temel) | `Axelum Tapınağı` | Ses/ton şifreli güvenlik kapılarını doğru frekansı yakalayarak açar. |
| 11 | Arin–Malken Hibrit Çözücü (İleri) | `YGK Akademi — Lasiraxi Jolt (Kat 1–3)` | Normal teknolojinin kıramadığı en karmaşık `Arin + Malken` tekno-mühürlerini çözer (`Flee Plee` & `Aether-Dock`). |
| 12 | Otonom Kalkan Aşırtma (İleri) | `YGK Akademi — Tixie (Kat 2)` | Havalandırma tünelleri, lazer bariyerleri ve kilitli cep-ambar kapılarını sessizce aşar. |

### Ekol 4: Yankı, Mühür ve Zihin (Algı, Arınma, Mühür Kırma, Zaman)
| # | Büyü Adı | Öğrenme Yeri & Şartı | Görev / Test & Saha İşlevi |
|---|---|---|---|
| 13 | Sessiz Yankı Taraması (Temel) | `Axelum Tapınağı` | Görünmez mühürleri, gizli odaları ve pusudaki tehlikeleri 3D ses yankısıyla ortaya çıkarır. |
| 14 | Zihin Arındırma (Temel) | `Axelum Tapınağı` | `Karanlık & Zihin Paraziti` etkilerini, halüsinasyon engellerini ve yüksek stresi anında temizler. |
| 15 | Hakikat Yankısı (Mühür Kırma) (İleri) | `YGK Akademi — Kefius Arateon (4. & -5. Kat)` | Kadim `YGK` ve `Arkanist` mühürlü arşiv kapılarını ve yasak kat kilitlerini kırar. |
| 16 | Aether Adımı (Kısa Zaman Bükümü) (İleri) | `YGK Akademi — Morwenna (Kat -4)` | Zaman döngüsüyle kilitli bulmaca odalarına girer ve hızlı kapanan geçitleri aşar. |

---

## 4. Yakıt, Rezonans Odak Havuzu ve Test Mekaniği

### 4.1. Rezonans Odak Havuzu (`[Ham Rezonans]` Kullanımı)
- Büyüler havadan bedava atılmaz; oyuncunun yanında taşıdığı `Rezonans Odak Havuzu (0–100 Puan)`ndan harcanır:
  - Temel Büyüler: `10–15 Odak`
  - İleri Büyüler: `25–35 Odak`
- Nasıl Doldurulur? `Axelum Tapınağı`nda dinlenerek günlük yenilenir + `Yeni_Guncelleme`'de biriktirilen `Işık Otu` (`+15`), `Kristal Çiçek` (`+20`), `Piezo Kristal` (`+30`), `Saf Aether` (`+50`) ve `Çekirdek Taşı` (`100 Full`) ile her yerde doldurulabilir.

### 4.2. Görev ve Test Odalarında Büyü Kullanımı (Sesli Test Mekaniği)
- Bir büyü engeli veya Akademi testiyle karşılaşıldığında oyuncuya 3D ses ipucu verilir (ör. "Kapıdan yüksek frekanslı metalik vızıltı ve soğuk hava geliyor" → `Tekno-Büyü` veya `Element: Kıvılcım`).
- Oyuncu doğru büyüyü seçtiğinde kısa bir Sesli Rezonans Ayarı (sağa/sola kaydırarak titreşim/tonun en netleştiği noktada dokun) yapılır; başarılı olunca engel açılır!

---

## 5. Özel Büyü Türevleri: Şişeleme, Kademeli Hava Kontrolü ve Heykel Canlandırma

Standart 16 ekol büyüsünün yanında, doğrudan bulmaca, ortam müdahalesi ve görev içi dövme/aksiyon için çalışan 10 özel büyü türevi bulunur:

### 5.1. Yıldız Işığı Şişeleme (`Beyaz Lumina Tozu` & `Sarı Solis Tozu`)
- Nasıl Toplanır? Tonoflenya'nın belirli yüksek/açık bölgelerinde doğru yıldız veya ışık vurduğunda (`Zhaor`, `Elyndra` veya `Sinha` nöbetlerinde) havada parlayan Beyaz Toz (`Lumina`) ve Sarı Toz (`Solis`) özel cam şişelere hapsedilir.
- İki Farklı Kullanım Biçimi:
  1. Kontrollü Salım (Yumuşak Büyü): Şişe aralanır; `Lumina` karanlık/görünmez mühürlü odaları sessizce aydınlatıp gizli yazıtları okutur; `Solis` donmuş veya zehirli alanları temizler.
  2. Fırlatarak Patlatma (Tüm Enerjiyi Açığa Çıkarma): Şişe hedefe fırlatılır ve içindeki tüm enerji tek anda patlar — kadim mühür bariyerlerini parçalama, bulmaca içi karanlık/gözcü engellerini dağıtma veya acil kaçış ışığı açma için kullanılır (şişe tükenir).

### 5.2. Kademeli Hava Durumu Kontrolü & Yıldırım Düşürme
- Tek dokunuşla hava değiştirilmez; oyuncu büyüyü defalarca/kademeli uygulayarak ortam sıcaklığını ve basıncı adım adım çeker:
  - Soğutma Hattı: Normal → Serin → Yoğun Sis (`Gözcülerden Gizlenme / Bulmaca`) → Ayaz (`Su/Bataklık Dondurma`) → Şiddetli Boran (`Düşman Kampını Dağıtma`).
  - Isıtma & Fırtına Hattı: Normal → Sıcak Güneş (`Buzul/Nem Çözme`) → Nemli Basınç → Şiddetli Yağmur (`Yangın/Aşırı Isı Söndürme`) → Fırtına & Yıldırım Düşürme (`Enerji Kulesi Şarj Etme veya Hedefe Doğrudan Yıldırım İndirme`).
- Bulmaca & Olay Müdahalesi: Bir Tonoflenya kalesinde gözcüleri atlatmak için önce 2 adım soğutup `Sis` indirirsin; veya sönmüş dev bir jeneratörü/kalkanı açmak için basıncı 3 adımda yükseltip tam üzerine `Yıldırım` düşürürsün.

### 5.3. Renkli Rezonans Taşları ile Heykel / Golem Canlandırma
- Taş Toplama: Madenler, YGK katları ve Tonoflenya'nın farklı bölgelerinden 5 Renkte Rezonans Taşı (`Kızıl, Mavi, Sarı, Yeşil, Mor`) toplanır.
- Canlandırma Bulmacası: Eski tapınaklarda, harabelerde ve Tonoflenya sınırlarında duran cansız Kadim Muhafız Heykelleri vardır. Her heykelin göğsünde istediği özel renk/sayı kombinasyonu bulunur (ör. 2 Kızıl + 1 Mor Taş veya 3 Mavi + 2 Sarı Taş).
- İki Kullanım Alanı:
  1. Bulmaca Heykelleri: Doğru taşlar takılıp canlandırma büyüsü okunduğunda heykel uyanır; dev taş kapıyı iter, yıkık köprüyü tutar veya gizli kasayı açar.
  2. Büyük Final Muhafızları (Tonoflenya Büyü Hattı): Tonoflenya büyü görev hattının final bulmacasında canlandırılan dev muhafız heykelleri, o büyülü sınavın koruyucu bariyerini kırar ve görev içi heykel çatışmalarında oyuncunun yanında yer alır.

### 5.4. Ses & Yankı Düğümü (Akustik Mühür Çalma)
- Eski Malken ve YGK kapılarında duyulan 3–4 notalı ses dizisini asa/rezonansla havada yakalayıp doğru sırayla veya tersine çevirerek ses kilitlerini açma (`Julian` ve `Caelum Nokturnus` kürsüsüyle bağlantılı).

### 5.5. Geçici Madde / Işık Köprüsü Şekillendirme
- Uçmanın yetmediği ekip/kervan geçişlerinde çevredeki kumu, donmuş suyu veya yıldız ışığını geçici köprüye/rampaya dönüştürme (yalnızca o geçiş süresince kalır; `Silahşör Zeno` kervan görevleri için ideal).

### 5.6. Yankı İkizi (İkizleme — Aynı Anda İki Kola Basma)
- Oyuncu bulunduğu noktaya sabit kalp atışı/tıkırtı sesi çıkaran bir **Yankı İkizi** bırakır; kendisi odanın diğer ucundaki ikinci kol/basınç plakasına geçip bastığında ikisi **aynı anda** mührü açar (tek başına iki kişilik bulmacaları çözmek için).

### 5.7. Canlı Kök / Sarmaşık Büyütme (Malken Doğa Büyüsü)
- Çantadaki bir tohum veya kök parçası (`Kristal Çiçek` / `Vaha Tohumu`) duvar çatlağına bırakılıp büyütüldüğünde saniyeler içinde **tırmanılabilir kalın sarmaşık merdivene** veya taş kapıyı çatlatan **dev köke** dönüşür (`Sorya` & `Dr. Lyris` kökenli Malken büyüsü).

### 5.8. Sıvı / Akıntı Yönlendirme
- Bir mahzeni, mağarayı veya gizli geçidi kapatan şelale, zehirli gölet ya da erimiş lav akıntısını büyüyle yan kanala/havuza yönlendirerek kuruyan zemindeki gizli kapıya veya sandığa erişim sağlama.

### 5.9. Metal / Madde Şekillendirme *(Dövme & Onarım)*
- Eritilmiş madeni veya kırık bir metal parçayı büyüyle istenen kalıba (görev/bulmaca silahı, kırık kapı dişlisi, kol veya kilit parçası) döküp biçimlendirme (`Forges` 3. Kürsü veya `Oronte` ocağıyla bağlantılı).

### 5.10. Öz / Taş Bağlama *(Mühürleme)*
- Üretilen bir görev/bulmaca silahına ya da kadim bir eşyaya `Renkli Rezonans Taşı`nı veya `Lumina/Solis` tozunu kalıcı olarak kaynatıp kilitleme (`Axelum Tapınağı` ve `Kefius Arateon` tekniği; büyüsüz saf silahlarda kullanılmaz).

---

## 6. Çoklu Kullanım, Alternatif Çözümler ve Büyü Dallanması

Oyuncu tek bir bulmacayı çözmek için **tek bir zorunlu büyüye hapsedilmez**; aynı sonuca elindeki farklı büyülerle veya ortamı değiştirerek de ulaşabilir:

| Bulmaca Hedefi / Engel | Doğrudan Büyü Yolu | Alternatif / Dolaylı Büyü Yolu |
|---|---|---|
| **Suyu Buza Dönüştürmek** *(Geçit / Tıkaç)* | **`Buzul Mühür`** ile suyu anında dondurmak. | **Kademeli Hava Kontrolü** ile ortam sıcaklığını **`Ayaz (-8°C)`** seviyesine düşürerek suyu doğal yoldan dondurmak. |
| **Buzu / Donmuş Kilidi Eritmek** | **`Kıvılcım Dalgası`** ile doğrudan eritmek. | **Hava Kontrolü (`Sıcak Güneş +30°C`)** veya **Sarı `Solis` Tozu** salarak eritmek. |
| **Karanlık / Görünmez Mührü Açmak** | **Beyaz `Lumina` Şişesi** salmak. | **`Sessiz Yankı Taraması`** veya **`Devre Kıvılcımı`** (eski lambaları yakarak) ile görmek. |
| **İki Kola Aynı Anda Basmak** | **`Yankı İkizi`** bırakıp diğer kola yürümek. | **`Ağır Taş` Heykeli canlandırıp** bir kolun üzerinde tutmak. |
| **Yüksek Kuleye / Uçuruma Çıkmak** | **`Kuzey Rüzgarı Uçuşu`** (+ Fırtına ile uzun süzülme). | **`Sıvı Yönlendirme` + `Canlı Sarmaşık`** ile kuru çatlağa su verip sarmaşığı 2 kat uzatmak. |
| **Gözcü / Sensör Önünden Geçmek** | **Hava Kontrolü (`Yoğun Sis`)** indirmek. | **`Buzul Mühür` + `Kıvılcım Dalgası`** peş peşe atarak anlık **Yoğun Buhar Perdesi** oluşturmak. |
| **Çölde Kayan Kumu / Çölü Geçmek** | **`Hafif Süzülme`** veya **`Geçici Köprü`** kullanmak. | **`Kıvılcım / Yıldırım`** ile kumu **cam köprüye** çevirmek ya da **`Yağmur / Buzul`** ile kayan kumu sertleştirmek. |
| **Gömülü Çöl Harabesini Açmak** | **`Ağır Toprak Yarma`** ile kum tepesini yarmak. | **Hava Kontrolü (`Boran / Güçlü Rüzgâr`)** ile kum örtüsünü süpürüp kapıyı ortaya çıkarmak. |

---

## 7. Sesle Oynanış (TalkBack / VoiceOver)
- Büyü Çantası / Grimoire: TalkBack açıkken büyüler 4 Ekol sekmesi + Özel Şişe/Taş/Hava sekmesine ayrılır. Her büyüde `Adı + Gereken Odak + Ne İşe Yarar / Hangi Kapıları Açar` tek cümlede okunur.
- Hava & Sıcaklık Geri Bildirimi: Her kademe hava müdahalesinde sıcaklık değeri (`ör. +18°C -> +6°C -> -4°C: Yoğun Sis Başladı`) sesle anons edilir ve rüzgâr/yağmur/gök gürültüsü 3D efekti değişir.
- Yanlış Büyü Koruması: Görev/engel noktasında yanlış ekol seçilirse odak puanı boşa yanmaz; sistem sesli ipucuyla uyarır ("Bu mühür ateşe dirençli, daha çok tekno-frekansla titreşiyor").
