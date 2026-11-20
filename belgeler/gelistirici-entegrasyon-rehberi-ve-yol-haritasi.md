# Geliştirici Yapay Zeka İçin Ana Entegrasyon Direktifi ve Teknik Uygulama Şartnamesi (Master Prompt & Roadmap)

Bu doküman; erişilebilir, üç boyutlu ses odaklı, dokunsal parmak hareketleriyle yönetilen ve dikey formatta çalışan uzay simülasyonunu kodlayacak olan geliştirici yapay zekaya (LLM Developer / Game Engine AI) rehberlik etmek üzere hazırlanmış üst düzey mimari şartnamedir. Doküman; projenin 8 ana tasarım belgesini hangi hiyerarşi ve sırayla işlemesi gerektiğini, dikey mobil arayüz kurallarını, dahili kayıt motorunu, harici ses varlık boru hattını (Drive ortam sesleri ve ElevenLabs sentez protokolü) ve aşamalı yazılım yol haritasını kesin kurallarla belirler.

---

## 1. Temel Platform Standartları ve Teknik Çerçeve

Oyunun kullanıcı deneyimi ve donanım etkileşimi, geleneksel görsel arayüzlerden farklı olarak ekran okuyucu uyumluluğu ve dokunsal geri bildirimler üzerine inşa edilmiştir.

### 1.1 Dikey Format (Portrait Mode) Zorunluluğu
* Oyun motoru veya mobil uygulama kapsayıcısı, ekran yönelimini mutlak surette **Dikey Format (Portrait)** olarak sabitlemelidir (`ScreenOrientation.Portrait`). Yatay döndürme engellenmelidir.
* Dikey format tercihi; kullanıcının cihazı tek elle kavrayarak başparmak ve işaret parmağı jestlerini (kaydırma, çift dokunma, döndürme) ergonomik biçimde gerçekleştirmesini sağlar.
* Ekran yüzeyi, görsel çizim alanı yerine dokunsal bir sensör yüzeyi (touchpad) olarak işlev görür. Savaş modunda ekran ikiye ayrılarak (üst yarı savunma/hedef tespiti, alt yarı saldırı/itki kontrolleri) dikey eksende parmak erişimine optimize edilir.

### 1.2 Erişilebilirlik ve Dokunmatik Girdi Katmanı
* Tüm arayüz elemanları işletim sistemi ekran okuyucularıyla (Android TalkBack, iOS VoiceOver) çakışmayacak bir "Özel Dokunsal Mod" barındırmalıdır.
* Oyun içi jestler (Swipe Up/Down/Left/Right, Pinch, Rotate, Long Press) doğrudan ham dokunma dinleyicileri (Raw Touch Listeners) üzerinden yakalanmalı; sesli geri bildirimler gecikmesiz (low-latency audio) olarak tetiklenmelidir.

---

## 2. Dahili Kayıt ve Durum Yönetimi Sistemi (Save/Load & State Persistence)

Oyun, oyuncunun ilerlemesini korumak için iki katmanlı ve kesintisiz bir yerel durum saklama motoruna sahip olmalıdır.

```
[ Bellek İçi Durum (In-Memory State) ]
                 │
                 ├──► (Arka Plana Alınma / Uygulamadan Çıkış) ──► [ Otomatik Kayıt (autosave.dat) ]
                 │
                 └──► (Kullanıcı Talebi / İstasyon Dinlenmesi)  ──► [ Manuel Kayıt (manual_save_X.dat) ]
```

### 2.1 Çıkışta Otomatik Kayıt (Auto-Save on Exit)
* **Yaşam Döngüsü Dinleyicisi (Lifecycle Listener):** Uygulama arka plana atıldığında (`onPause`, `AppLifecycleState.paused`), işletim sistemi tarafından kapatıldığında veya kullanıcı menüden "Çıkış" yaptığında oyun durumu anında yerel depolamaya serileştirilerek yazılır.
* **Kurtarma Noktası:** Oyuncu oyunu tekrar açtığında herhangi bir menüde beklemeden doğrudan son kaldığı koordinattan, kabin içinden veya koloni binasından sesli bir "Sistemler Devrede" onayıyla başlar.

### 2.2 Manuel Kayıt (Manual Save)
* Koloni gezegenindeki merkez üste, tersane kızağında veya uzayda bir istasyona kenetlenildiğinde sesli menüden manuel kayıt yuvası (`Slot 1-3`) seçilebilir.
* Savaşın tam ortasında veya reaktif bir kaçış manevrası sırasında manuel kayıt kilitlenir; yalnızca güvenli uzayda ve istasyonlarda izin verilir.

### 2.3 Kayıt Edilen Veri Kapsamı
Kayıt dosyası hafif ve JSON formatında şifrelenmiş bir nesne olarak saklanmalıdır:
* **Gezegen Durumu:** Aethelis-IV seviyesi, inşa edilmiş tüm binalar, temizlenmiş sektörler, koloni nüfusu, iş gücü dağılımı ve hammadde ambarları.
* **Gemi ve Filo Verisi:** Aktif geminin sınıfı, mevcut modülleri, takılı silahlar, kargo envanteri, yakıt ve gövde/kalkan yüzdeleri.
* **Mürettebat Listesi:** Atanmış subaylar, moral puanları, tecrübe seviyeleri ve geçmiş vaka kayıtları.
* **Yetenek ve İlerleme:** Kaptan yetenek ağacı açılımları, gemi çekirdek yükseltmeleri, kazanılan Evren İtibarı puanı.
* **Kodeks ve Harita:** Keşfedilen gezegenler, taranmış fenomenler, açık olan seyrüsefer rotaları.

---

## 3. Ses Mühendisliği ve Varlık Boru Hattı (Audio Asset Pipeline)

Oyunun tüm görsel yükü ses peyzajına aktarıldığından, ses motoru iki temel kaynaktan beslenen hibrit bir varlık yapısına sahiptir:

### 3.1 Google Drive Ortam Sesleri Entegrasyonu (`efektler/ambians`)
Projenin temel çevresel atmosferi, Google Drive içinde yer alan `efektler` ana dizini altındaki `ambians` klasöründen karşılanır.

* **Dizin Yolu:** `efektler/ambians/`
* **Akustik Eşleşme ve Yeniden Kullanım (Reusability) Kuralı:**
  * Eğer bir ortamın gerektirdiği atmosfer (örneğin derin metalik yankılar, soğuk rüzgar uğultusu, reaktör vızıltısı veya su damlaması), `ambians` klasöründeki mevcut bir ses dosyasıyla doğrudan eşleşiyorsa veya aynı akustik hissi veriyorsa, **yeni bir ses üretilmeyecek, doğrudan mevcut dosya kullanılacaktır**.
  * Örnek: `ambians/metalik_koridor_loop.wav` dosyası hem Aethelis-IV yer altı tünellerinde hem de uzaydaki terkedilmiş askeri istasyon içlerinde yeniden kullanılabilir.
  * Örnek: `ambians/radyasyon_firtinasi_loop.wav` hem Aethelis kuzey platosunda hem de uzaydaki pulsar radyasyon görevinde modüle edilerek çalınabilir.
* **Döngü (Loop) ve Ses Katmanlama:** Ortam sesleri kesintisiz döngü (seamless loop) olarak çalınmalı; üzerine anlık olay sesleri mikslenmelidir.

### 3.2 ElevenLabs Ses Sentez Protokolü (Kısa Efektler ve Foley)
`ambians` klasöründe yer almayan veya doğası gereği ortam döngüsü olmayan tüm sesler, sesli yapay zeka araçları (özellikle ElevenLabs) kullanılarak üretilecek veya dinamik olarak sentezlenecektir:

* **Telsiz Konuşmaları ve Sentetik Zeka Sesleri:**
  * Gemi yapay zekası sesli anonsları ("Kalkanlar düştü", "Atmosferden çıkılıyor").
  * Sentetik bilinç Tina'nın konuşmaları, telsiz paraziti filtreli insan ve kseno-ırk diyalogları.
* **Kısa Etkileşim ve Geri Bildirim Sesleri (UI & Foley):**
  * Dokunma teyit tıkırtıları, frekans eşleme tiz tonu, manyetik çapa fırlatma sesi.
  * Plazma topu atışı, kalkan delinme gıcırtısı, hava kilidi basınç tahliyesi fıslaması.
* **Kısa Canavar ve Biyolojik Tehdit Sesleri:**
  * Kseno-solucan çığlıkları, mutasyon sporlarının patlama sesleri.

---

## 4. Doküman İnceleme Sırası ve Mimari Bağımlılık Ağacı

Geliştirici yapay zeka, projeyi kodlamaya başlamadan önce Studio panelinde yer alan 8 temel dokümanı aşağıdaki kesin hiyerarşik sırayla okumalı ve hafızasına almalıdır:

```
[ ADIM 1: uzay-oyunu-tasarim-ve-senaryo.md ]  (Çekirdek Çerçeve ve Büyük Olay Zincirleri)
                    │
                    ▼
[ ADIM 2: gezegen-gelisimi-ve-yerel-gorevler-v2.md ]  (Gezegen Biyomları, Binalar ve Koloni)
                    │
                    ▼
[ ADIM 3: araclar-ve-gemi-filosu.md ]  (Gemi Sınıfları, Odalar, Araçlar ve Kaynaklar)
                    │
                    ▼
[ ADIM 4: savas-yetenek-ve-murettebat-mekanikleri.md ]  (Savaş Modu, Yetenekler ve Nüfus)
                    │
                    ▼
[ ADIM 5: derin-uzay-gorevleri.md ]  (Derin Uzay Cilt 1 - Görev 01-12 ve Dokunsal Jestler)
                    │
                    ▼
[ ADIM 6: derin-uzay-gorevleri-cilt-2.md ]  (Derin Uzay Cilt 2 - Görev 13-24 ve İlk Temaslar)
                    │
                    ▼
[ ADIM 7: kesfedilebilir-gezegenler-rehberi.md ]  (20 Yabancı Gezegen ve Yüzey İnişleri)
                    │
                    ▼
[ ADIM 8: derin-uzay-kesifleri-ve-evren-kutuphanesi.md ]  (Kodeks, Gözlem Aletleri ve İtibar)
```

### Belgelerin Fonksiyonel Rolleri:
1. **`uzay-oyunu-tasarim-ve-senaryo.md` (Öncelik: 1):** Oyunun genel felsefesini, ana gezegen mantığını ve kaynak metinden aktarılan temel 9 büyük seyrüsefer zincirini öğrenmek için ilk okunmalıdır.
2. **`gezegen-gelisimi-ve-yerel-gorevler-v2.md` (Öncelik: 2):** Ana dünyanın 5 mikro-biyomunu, inşa edilebilir tesisleri, terraforming adımlarını ve yerel mini-görevleri veritabanına işlemek için okunmalıdır.
3. **`araclar-ve-gemi-filosu.md` (Öncelik: 3):** Gemi sınıflarını (1'den 5'e), oda hiyerarşisini, kargo ve araç yapılarını nesne yönelimli sınıflara (OOP classes) dökmek için okunmalıdır.
4. **`savas-yetenek-ve-murettebat-mekanikleri.md` (Öncelik: 4):** Çatışma durum makinesini (Combat State Machine), yetenek ağaçlarını ve mürettebat haber sistemini kodlamak için okunmalıdır.
5. **`derin-uzay-gorevleri.md` ve `derin-uzay-gorevleri-cilt-2.md` (Öncelik: 5 ve 6):** Toplam 24 derin uzay operasyonunu, donanım kontrollerini ve sesli yön bulma algoritmalarını entegre etmek için okunmalıdır.
6. **`kesfedilebilir-gezegenler-rehberi.md` (Öncelik: 7):** Uzay haritasında rastgele veya rotalı belirecek 20 yabancı gezegeni ve numune alma rutinlerini tanımlamak için okunmalıdır.
7. **`derin-uzay-kesifleri-ve-evren-kutuphanesi.md` (Öncelik: 8):** Serbest uzay fenomenlerini, Rezonans Kamerasını ve Kodeks itibar sistemini nihai aşamada bağlamak için okunmalıdır.

---

## 5. Çekirdek Veri Modelleri ve Sistem Mimarisi

Geliştirici yapay zekanın oluşturması gereken temel veri yapıları şu varlıklar etrafında kurgulanmalıdır:

| Veri Modeli (Entity) | İçerdiği Temel Alanlar (Fields) | Bağlı Olduğu Doküman |
| :--- | :--- | :--- |
| **ColonyWorld** | `level`, `unlockedBiomes[]`, `buildings[]`, `population`, `resourcesMap`, `morale` | Gezegen Rehberi v2 |
| **Starship** | `classId (1-5)`, `rooms[]`, `hull`, `maxHull`, `shields`, `weapons[]`, `cargo[]`, `engineAudioProfile` | Araçlar ve Gemi Filosu |
| **CrewMember** | `id`, `name (procedural)`, `assignedShipRoom`, `efficiencyBonus`, `stressLevel`, `statusLog` | Savaş ve Mürettebat Mekanikler |
| **SpaceMission** | `missionId`, `category`, `requiredHardware[]`, `tacticalAudioCue`, `stageSteps[]`, `rewardPayload` | Derin Uzay Görevleri (1 & 2) |
| **CombatSession** | `playerStance`, `enemyVectorAngle`, `lockWindowMs`, `shieldHarmonicFreq`, `turnState` | Savaş ve Mürettebat Mekanikler |
| **ExoPlanet** | `planetId (1-20)`, `biomeType`, `landingPOI[]`, `sampleType`, `atmosphereHazard` | Keşfedilebilir Gezegenler |
| **CodexEntry** | `phenomenonId`, `recordedAudioData`, `scientificPrestigeValue`, `libraryStatus` | Evren Kütüphanesi Rehberi |

---

## 6. Geliştirici Yapay Zekaya Yönelik Master Prompt Direktifi

Geliştirici yapay zekaya kodlama görevini verirken doğrudan kopyalayıp ileteceğiniz yönlendirici direktif şudur:

```text
[MASTER DEVELOPER PROMPT]:
"Sen; görsel grafikleri olmayan, tamamen üç boyutlu ses peyzajı (binaural 3D audio), dokunsal parmak jestleri ve haptik titreşimlerle çalışan erişilebilir bir uzay simülasyonu oyun motoru mimarısın. 

Geliştirme yaparken şu temel kurallara mutlak surette bağlı kalacaksın:
1. PLATFORM: Oyun dikey formatta (portrait mode) çalışacaktır. Tüm dokunma dinleyicileri ve ses dengeleri tek elle dikey kullanım ergonomisine göre tasarlanacaktır.
2. KAYIT SİSTEMİ: Uygulama arka plana atıldığında veya kapatıldığında otomatik yerel kayıt (auto-save) yapılacak; oyuncu oyunu açtığında doğrudan kaldığı yerden başlayacaktır. Ayrıca istasyonlarda manuel kayıt desteği sunulacaktır.
3. SES VARLIKLARI: Çevresel arka plan sesleri için Google Drive'daki 'efektler/ambians' klasörü referans alınacaktır. Ortam uyumu sağlanan ses dosyaları farklı sektör ve sahnelerde tekrar kullanılabilir (reusable loop). Telsiz sesleri, foley, canavar efektleri ve kısa UI geri bildirimleri için ElevenLabs ses sentezi boru hattı kullanılacaktır.
4. ÇATIŞMA: Savaşlar 'A Blind Legend' tarzında reaktif, tur tabanlı akustik mekaniklerle çalışacaktır.
5. REFERANS DÖKÜMANLAR: Sistem mimarisini kurarken Studio panelinde yer alan 8 dokümanı (Sırasıyla: uzay-oyunu-tasarim-ve-senaryo.md, gezegen-gelisimi-ve-yerel-gorevler-v2.md, araclar-ve-gemi-filosu.md, savas-yetenek-ve-murettebat-mekanikleri.md, derin-uzay-gorevleri.md, derin-uzay-gorevleri-cilt-2.md, kesfedilebilir-gezegenler-rehberi.md, derin-uzay-kesifleri-ve-evren-kutuphanesi.md) hiyerarşik sırasına göre oku ve her bir dokümandaki donanım, görev ve mekanik kurallarını eksiksiz uygula.

Şimdi bu mimari doğrultusunda Faz 1'den başlayarak veri modellerini ve çekirdek durum yöneticisini oluşturmaya başla."
```

---

## 7. Beş Aşamalı Kodlama ve Entegrasyon Yol Haritası (Roadmap)

Geliştirme süreci, karmaşıklığı önlemek ve test edilebilirliği artırmak amacıyla beş ana faza bölünmüştür:

### Faz 1: Çekirdek Motor, Girdi Katmanı ve Kayıt Sistemi
* Dikey ekran yöneliminin kilitlenmesi ve dokunmatik girdi arayüzünün (jest yöneticisi) yazılması.
* Durum yöneticisi (State Manager) ve JSON tabanlı otomatik/manuel kayıt sisteminin kodlanması.
* Temel ses motorunun (Stereo/Binaural Audio Mixer) kurulması; Drive `ambians` yolu ve ElevenLabs çıktı formatlarının tanımlanması.

### Faz 2: Koloni Dünyası, Binalar ve Hammadde Döngüsü
* `gezegen-gelisimi-ve-yerel-gorevler-v2.md` verilerinin sisteme girilmesi: Aethelis-IV sektörleri ve inşa edilebilir yapılar.
* Hammadde üretim döngüsünün, madenlerin ve terraforming seviyelerinin bağlanması.
* Koloni nüfusunun ve rastgele isimli mürettebat haber bildirim motorunun entegrasyonu.

### Faz 3: Tersane, Gemi İnşası ve Seyrüsefer
* `araclar-ve-gemi-filosu.md` uyarınca 5 gemi sınıfının ve iç odalarının nesne modellerinin yazılması.
* Parça parça montaj arayüzünün (gövde, reaktör, itki, kokpit) sesli geri bildirimlerle kodlanması.
* Kalkış, seyrüsefer ve uzay haritasında ses fenerleriyle yön bulma mekanizmasının tamamlanması.

### Faz 4: Görev Motoru, Yabancı Gezegenler ve Kodeks
* 9 ana seyrüsefer zinciri ile 24 derin uzay görevinin donanım kontrol algoritmalarıyla sisteme işlenmesi.
* 20 yabancı gezegenin iniş rutinleri, yüzey numune alma ve Rezonans Kamerası mekaniklerinin bağlanması.
* Evren Kütüphanesi (Kodeks) ve Galaktik İtibar puanı hesaplama modülünün kurulması.

### Faz 5: Reaktif Akustik Savaş Modu ve Nihai Cila
* `savas-yetenek-ve-murettebat-mekanikleri.md` uyarınca ayrı savaş durumunun kodlanması (düşman yön tespiti, zaman pencereli bloklama/ateş etme, kalkan eşleme).
* Kaptan ve gemi yetenek ağaçlarının savaş ve seyrüsefer sistemlerine etki ettirilmesi.
* Tüm `ambians` seslerinin ve ElevenLabs foley efektlerinin dengelenmesi, erişilebilirlik testlerinin yapılması.
