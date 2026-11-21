# 📘 TONOFLENYA VE YENİ SİSTEMLER GELİŞTİRİCİ ENTEGRASYON YÖNERGESİ
**Yeni Nesil Sistemler, Kronolojik Uygulama Sırası ve Çekirdek Mekanik Entegrasyonu**

Bu yönerge belgesi; Aethelis-IV'ün yerel tarım altyapısından başlayarak kadim anavatan Tonoflenya'nın 6 yıldızlı hekzat sistemine, büyük coğrafi atlasına, 20 ana ve 30 yan görevine, zanaat envanterine ve prosedürel mürettebat mimarisine kadar uzanan **7 yeni sistem dokümanını** tek bir geliştirici uygulama çerçevesinde birleştirmek amacıyla hazırlanmıştır. İlk aşama tasarım belgeleri bu yönergenin dışındadır; bu belge doğrudan genişletme paketinin çekirdek mekaniklerini ve entegrasyon sırasını yönetir.

---

## 1. Yeni Dokümanlar Ekosistemi ve Oyuna Kattığı Temel Unsurlar

Tarım ve kseno-botanik ile başlayan bu ikinci geliştirme fazı, oyunu basit bir doğrusal uzay seyrüseferinden çıkarıp yaşayan bir organik ekonomi, çok katmanlı bir siyasi-büyü coğrafyası ve kozmik bir mitoloji sahnesine dönüştürmüştür.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        YENİ FAZIN 7 SİSTEM DOKÜMANI                                    │
├────────────────────────────────┬───────────────────────────────────────────────────────┤
│ 1. tarim-ve-kseno-botanik      │ Organik rasyonlar, kseno-tohumlar, jeotermal yataklar │
│ 2. tonoflenya-ve-malken        │ Hekzat sistemi, 6 yıldız felsefesi, büyü-teknoloji     │
│ 3. tonoflenya-kadim-tarihcesi  │ Kozmik mitoloji, Beyaz Kıyamet, Bagrius kronolojisi   │
│ 4. tonoflenya-cografi-atlasi   │ 5 coğrafi kuşak, küresel ring rotası, POI kataloğu    │
│ 5. tonoflenya-final-gorevleri  │ 20 büyük ana operasyon, Cahelon kozmik savaşı         │
│ 6. tonoflenya-yan-gorevler     │ 30 bölgesel vaka zinciri, itibar ve seçim dalları     │
│ 7. tonoflenya-esya-zanaat      │ Prosedürel mürettebat, hammadde ve zanaat matrisi     │
└────────────────────────────────┴───────────────────────────────────────────────────────┘
```

### Bu Belgelerin Oyuna Getirdiği 5 Devrimsel Unsur
1. **Yaşayan Organik Lojistik:** Önceden sadece sayısal bir tüketim kalemi olan gıda ve rasyonlar; tohum ıslahı, sıcaklık/nem ayarı ve mürettebatın metabolik türlerine göre hazırlanan özel iksirlere dönüştürülmüştür.
2. **Akustik Parmak İzli Çok Katmanlı Dünya:** Magentor'un 6 halkasından Zorah'ın cam düzlüklerine, Mormon'un siyah girdaplarından Fenrir'in ışık tozuna kadar her bölge bağımsız bir 3D ses ortamına kavuşmuştur.
3. **Mitolojik Nedensellik Bağı:** Oyuncunun Aethelis-IV'te başlayan serüveni artık havada asılı bir kaza değil; Alt Evren'in üç kozmik titanı (Runahar, Runashar, Cahelon) ve 6 Yıldız Muhafızı'nın kadim hapishane sırrıyla doğrudan bağlanmıştır.
4. **Prosedürel Personel Yönetimi:** Gemi mürettebatı tekil sabit isimlerden arındırılmış; oyuncunun akademiden veya limanlardan istihdam edebileceği, kendi unvan, diyalog ve bonuslarına sahip dinamik subay ekollerine oturtulmuştur.
5. **Dallanan Ahlaki ve Jeopolitik Tercihler:** 30 yan görev ve 20 ana görev; oyuncuya iki krallık arasında taraf tutma, kaçak büyücüleri koruma veya infaz etme, kadim mühürleri teknolojiyle mi büyüyle mi besleyeceğine karar verme serbestisi tanımıştır.

---

## 2. Belgelerin Okuma ve Uygulama Hiyerarşisi

Geliştirici yapay zekanın veri yapılarında çakışma yaşamaması, fonksiyon çağrılarının boşta kalmaması ve harita geçişlerinin mantıklı inşa edilebilmesi için dokümanlar **aşağıdaki kesin sıra ile okunmalı ve uygulanmalıdır**:

```
[ ADIM 1: tarim-ve-kseno-botanik-rehberi.md ]
     │  └──► Üretim, hammadde ve metabolik rasyon altyapısının kurulması.
     ▼
[ ADIM 2: tonoflenya-ve-malken-medeniyeti.md ]
     │  └──► 6 Yıldız Hekzat Sistemi ve büyü-teknoloji temel mantığının kavranması.
     ▼
[ ADIM 3: tonoflenya-kadim-tarihcesi-ve-kronikler.md ]
     │  └──► Karakter motivasyonları, kadim tehditler ve dünya lore temelleri.
     ▼
[ ADIM 4: tonoflenya-buyuk-cografi-atlasi.md ]
     │  └──► 5 Bölgenin çift tıklamalı harita düğümleri ve transit ringinin kodlanması.
     ▼
[ ADIM 5: tonoflenya-esya-zanaat-ve-murettebat-rehberi.md ]
     │  └──► Prosedürel istasyon rolleri, envanter, hammadde ve tarif havuzunun yüklenmesi.
     ▼
[ ADIM 6: tonoflenya-buyuk-final-gorevleri.md ]
     │  └──► 20 ana operasyonun, mühür sekanslarının ve Cahelon patron döngüsünün bağlanması.
     ▼
[ ADIM 7: tonoflenya-yan-gorevler-ve-yerel-vakalar.md ]
        └──► 30 bölgesel yan görevin ilgili harita POI noktalarına dağıtılması ve itibar motoru.
```

---

## 3. Genişletilebilir Jeotermal Ekim ve Nüfus Atama Mekaniği

Tarım dokümanında tanımlanan jeotermal ekim alanları, oyunun ilerleyen evrelerinde oyuncunun sürekli manuel olarak sulamak zorunda kalmayacağı, **koloni nüfusunun istihdam edilebileceği ve kademe kademe genişletilebilir bir tesis** olarak modellenmelidir.

### A. Modüler Ekim Parselleri ve Genişleme Kademeleri
Başlangıçta sadece 4 adet temel jeotermal ark haznesine sahip olan seralar, koloni kaynakları harcanarak genişletilebilir:

* **Kademe 1 (Başlangıç Serası):** 4 Ekim Yatağı. Manuel sulama ve jeotermal vana kontrolü gerekir.
* **Kademe 2 (Buhar Kanallı Isıtma Terası):** 8 Ekim Yatağı. Jeotermal buhar şebekesi otomatik ısıtma sağlar; donma riski sıfırlanır.
* **Kademe 3 (Kseno-Habitat Biyo-Kubbesi):** 16 Ekim Yatağı. Farklı atmosfer (metan/oksijen) destekleyen bağımsız kseno-bölümler açılır; derin uzay egzotik tohumları ekilebilir.
* **Kademe 4 (Endüstriyel Rezonans Çiftliği):** 32 Ekim Yatağı. Saf Aether kristalleriyle ışık spektrumu hızlandırılır; hasat süreleri %40 kısalır.

### B. Koloni Nüfusu ve Kseno-İşçi Atama Sistemi
Oyuncu koloni yönetim ekranından kurtardığı mültecileri veya yerel çiftçileri seralara atayabilir:

```
[ Nüfus Atama Arayüzü ]
├── [ Boş Yatak #05 ] ──► (Seçenek: Kolonist Ata)
│                          ├── Atanan: Kaelith Botanikçisi (Uzman Kseno-Çiftçi)
│                          ├── Görev: Otomatik Sulama, Sıcaklık Dengeleme, Hasat
│                          └── Verim Bonusu: +%30 Tohum Geri Kazanımı, 0 Çürüme
```

* **Otomasyon Döngüsü:** Bir parsele işçi atandığında, tohum ekildikten sonra sulama ve vana ayarları işçi tarafından otomatik yapılır. TalkBack arayüzünde parsel durumu *"Otomatik Bakımda - Kaelith Uzmanı Tarafından Yönetiliyor"* olarak seslendirilir.
* **Uzmanlık Bonusları:** Kurtarılan farklı ırkların tarım üzerinde özel çarpanları vardır:
  * *İnsan Kolonistler:* Standart Eski Dünya ürünlerinde +%20 büyüme hızı.
  * *Kaelith Irkı:* Biyo-kristal ve spor bitkilerinde çift tohum dökümü.
  * *Malken Çırakları:* Aether aşılaması yaparak bitkilerden elde edilen iksir gücünü artırır.

---

## 4. Dinamik Zaman, Nöbet ve Gün Döngüsü Mimarisi

Oyunumuzda şu ana kadar katı bir takvim saati bulunmamaktaydı. Seyrüsefer süreleri, bitki büyüme süreleri ve şehirlerin yaşayan atmosferi için **ses odaklı, sezgisel bir Zaman ve Nöbet Döngüsü** sisteme dahil edilmelidir.

### A. 6 Nöbetli "Yıldız Zamanı" Döngüsü
Tonoflenya'nın 6 yıldızlı gökyüzü ve gezegenlerin rotasyonuna uygun olarak 1 oyun günü, her biri 4 gerçek dünya saatine (veya hızlandırılmış oyun ölçeğinde 20 dakikaya) denk gelen **6 Nöbete (Vardiyaya)** bölünür:

```
┌─────────┬──────────────────────┬─────────────────────────┬──────────────────────────────────┐
│ Nöbet   │ İsim                 │ Hakim Yıldız Işığı      │ Akustik & Oynanış Etkisi         │
├─────────┼──────────────────────┼─────────────────────────┼──────────────────────────────────┤
│ 1. Nöbet│ Gümüş Şafak (Zhaor)  │ Gümüşi parlak alacakaranlık│ Sabah pazarının açılış çanları   │
│ 2. Nöbet│ Kızıl Kuşluk (Varek) │ Sıcak kırmızı gün ışığı │ Askeri talimler, sanayi sesleri  │
│ 3. Nöbet│ Yeşil Öğle (Axira)   │ Canlı yeşil parıltı     │ Bitki fotosentez zirvesi         │
│ 4. Nöbet│ Mor İkindi (Elyndra) │ Derin mor gölgeler      │ Akademi dersleri, büyü deneyleri │
│ 5. Nöbet│ Mavi Akşam (Sinha)   │ Mavi huzur ışığı        │ Liman fenerleri, sakin müzikler  │
│ 6. Nöbet│ Altın Gece (Uma)     │ Sarı yıldız karanlığı   │ Gece pazarları, gölge yaratıklar │
└─────────┴──────────────────────┴─────────────────────────┴──────────────────────────────────┘
```

### B. Ses Tabanlı Zaman Bildirimi (TalkBack & 3D Ses)
* **Merkezi Rezonans Çanı:** Her nöbet değişiminde, bulunulan şehrin veya geminin hoparlörlerinden o nöbetin yıldızına ait karakteristik bir **rezonans çanı akoru** duyulur (örneğin Sinha nöbetinde derin bir sualtı çanı tınlaması).
* **Tek Dokunuşla Zaman Sorgulama:** Ekranın sağ üst köşesine çift dokunulduğunda veya klavyede 'T' tuşuna basıldığında ekran okuyucu doğrudan konuşur:
  * *"Gün: 42 — Mor İkindi Nöbeti (Elyndra Işığı). Bir sonraki nöbete 14 dakika var. Tarlalarda hasat vakti yaklaşıyor."*
* **Gemi Seyrüseferiyle Entegrasyonu:** Uzayda hiper-sıçrama yapıldığında veya Aethelis-IV'ten Tonoflenya'ya seyahat edildiğinde geçen seyahat süresi (örn: *08:00:00*), takvimde doğrudan nöbetleri ve günleri ileri sarar. Böylece gemi limana yanaştığında tarladaki bitkiler büyümüş, atölyedeki zanaat tamamlanmış olur.

---

## 5. Prosedürel Sefer İlerlemesi: "Ekol Kıdemi" ve Rastgele Karşılaşmalar

Oyunda geleneksel, yapay bir sayısal oyuncu seviyesi (Level 1, Level 50 gibi) bulunmamaktadır. Bunun yerine oyunun ruhuna ve erişilebilirlik felsefesine çok daha uygun olan **"Yıldız Ekolü Kıdemi" (Tier / Doktrin İlerlemesi)** ve **"Rastgele Seyrüsefer Olayları"** ile ilerleme sağlanacaktır.

### A. Yıldız Ekolü Kıdem Basamakları (Statik Level Yerine)
Oyuncu ve gemi personeli, yaptıkları keşifler ve çözdükleri krizlerle 6 Yıldız Ekolü'nde **Kıdem Puanı** kazanır:

```
[ Çırak / Öncü ] ──► [ Seyrüsefer Uzmanı ] ──► [ Yıldız Muhafızı ] ──► [ Baş-Rezonatör ]
    (Kademe 1)             (Kademe 2)                 (Kademe 3)             (Kademe 4)
```

* **Nasıl Yükselir?**
  * Zorah çölünde antik harabeleri araştırmak -> *Uma (Sarı Yıldız) Kıdemi* kazandırır.
  * Mormon denizinde tehlikeli akıntıları çözmek -> *Sinha (Mavi Yıldız) Kıdemi* kazandırır.
  * Tarlada nadir melez bitkiler yetiştirmek -> *Axira (Yeşil Yıldız) Kıdemi* kazandırır.
* **Kıdemin Somut Faydası:** Her kademe atlandığında oyuncu sayısal can puanı artışı yerine **yeni operasyonel kabiliyetler** açar:
  * *Mavi Kademe 2:* Sinyal analizinde kör noktalardaki pusuları %25 daha uzaktan duyabilme.
  * *Kırmızı Kademe 3:* Bataryalarda yeni zırh delici aether mühimmatı zanaatlayabilme.
  * *Mor Kademe 4:* Gemiyi anında kısa menzilli taktik teleport edebilme.

### B. Görev Dışı Dinamik Seferler (Rastgele Karşılaşma Motoru)
Oyuncu ana veya yan görevleri yapmadığı zamanlarda da gemisiyle serbest devriyeye çıkıp uzmanlık kasabilir. Oyun motoruna eklenecek **"Rastgele Karşılaşma Tablosu"** şu 4 dinamik olayı periyodik olarak fırlatır:

1. **Korsan Pususu ve Devriye Çatışması:** Belirli rotalarda sensörlerin yakaladığı düşman akıncıları. Zafer kazanıldığında hurda metal ve silah tecrübesi verir.
2. **Kozmik Enkaz ve Sürüklenen Sandıklar:** Uzay boşluğunda veya Mormon denizinde bulunan terk edilmiş kargo kapsülleri. Mini sesli kilit açma mekaniğiyle nadir tohum veya kristal verir.
3. **Astral Fırtına ve Rezonans Anomalisi:** Geminin kalkanlarını zorlayan manyetik girdaplar. Oyuncu doğru frekansı tutturursa gemi motorlarına kalıcı aether verimliliği katar.
4. **Kaçak Mülteci Sinyali:** Küçük bir filikada mahsur kalmış yabancı yolcular. Kurtarılıp koloniye veya Tonoflenya kantonlarına yerleştirildiğinde itibar ve iş gücü kazandırır.

---

## 6. Geliştirici Yapay Zeka İçin Veri Yapıları ve Kodlama Standartları

Uygulamayı yapacak olan geliştirici yapay zeka, sistemleri kodlarken aşağıdaki temel JSON veri modellerini esas almalıdır.

### A. Zaman ve Nöbet Modeli (State Tracker)
```json
{
  "zaman_yoneticisi": {
    "mevcut_gun": 42,
    "aktif_nobet": {
      "index": 3,
      "ad": "Yeşil Öğle",
      "hakim_yildiz": "Axira",
      "kalan_saniye": 720
    },
    "nobet_degisim_sesi": "sfx/ambians/yildiz_canlari/axira_akor.ogg",
    "talkback_anons": "Yeşil Öğle Nöbeti devrede. Bitki fotosentezi aktif."
  }
}
```

### B. Modüler Ekim Yatağı ve İşçi Modeli
```json
{
  "jeotermal_seralar": {
    "mevcut_kademe": 2,
    "toplam_yatak": 8,
    "yataklar": [
      {
        "yatak_id": "BED_01",
        "ekili_tohum": "SE_AET_01_REZONANS_MANTARI",
        "buyume_yuzdesi": 65,
        "su_seviyesi": 80,
        "atanan_isci": {
          "isim": "Kaelith Bahçıvanı",
          "tur": "Kaelith",
          "otomasyon_aktif": true,
          "verim_carpani": 1.3
        }
      }
    ]
  }
}
```

### C. Prosedürel Mürettebat İstasyon Modeli
```json
{
  "gemi_murettebati": {
    "istasyonlar": [
      {
        "istasyon_id": "STATION_ENGINEERING",
        "unvan": "Baş Büyü-Mühendisi",
        "atanan_subay": {
          "subay_id": "OFFICER_PROC_882",
          "ad_soyad": "Elyndra Val-Tarek",
          "koken": "Malkenia 4. Halka",
          "ekol": "Mor Yıldız (Elyndra)",
          "kidem_kademe": 3,
          "aktif_yetenek": "Aether Aşırı Yüklemesi",
          "pasif_bonus": "Aether tüketimi -%15"
        }
      }
    ]
  }
}
```

---

## 7. Sonuç ve Kontrol Listesi

Bu yönerge doğrultusunda geliştirici yapay zeka:
* [x] Önce `tarim-ve-kseno-botanik-rehberi.md` ile tarım motorunu kurar.
* [x] `tonoflenya-ve-malken-medeniyeti.md` ve `kadim-tarihce` ile dünya atmosferini yükler.
* [x] `tonoflenya-buyuk-cografi-atlasi.md` ile 5 coğrafi bölgenin çift tıklamalı harita ağını örer.
* [x] `tonoflenya-esya-zanaat-ve-murettebat-rehberi.md` ile prosedürel subay havuzunu ve zanaatı bağlar.
* [x] Bu belgedeki **6 Nöbetli Yıldız Zamanı** sistemini ve **Ekol Kıdemi** mekaniğini ana döngüye yerleştirir.
* [x] Son olarak 20 büyük final görevini ve 30 yan görevi ilgili koordinatlara bağlayarak açık dünya döngüsünü tamamlar.
