# PAKET 2: İLAN PANOSU, SİPARİŞLER, HAFTALIK TÜCCAR GEMİSİ VE KOLONİ TEZGÂHI

Bu belge, oyuna **Trade Island** tarzı yaşayan bir sipariş ve ticaret döngüsü ekleyen **2. Geliştirme Paketi**dir. Görev aralarındaki boşlukları doldurur, tarım ve maden fazlalarını değerlendirir.

---

## 1. AMAÇ (OYUNCUYA NE KAZANDIRIR?)
* Ana görevler veya uzun seferler arasında oyuncuya kısa, ödüllü ve tatmin edici hedefler sunar.
* Depoda biriken fazla tarım ürünlerini, madenleri ve zanaat eşyalarını hem **yerleşimci güvenine** hem de **Galaktik Keşif Kredisine (GK)** dönüştürür.
* Haftalık fiyat dalgalanmaları ve koloninin kendi tezgâhı sayesinde ekonomiyi canlı tutar.

---

## 2. MEKÂNLAR (AÇILMA ŞARTI VE ORTAM SESLERİ)

| Mekân Adı | Açılma Şartı | Tarifi | Gündüz Ortam Sesi | Gece Ortam Sesi |
| :--- | :--- | :--- | :--- | :--- |
| **1. Koloni İlan Panosu** | `#4 Yaşam Bloğu` + Koloni Meydanı | Yerleşimcilerin ve gelen gemilerin istek astığı ışıklı/metal pano. | Kâğıt/metal plaka tıkırtısı, hafif meydan uğultusu. | Fener vızıltısı, rüzgarda sallanan plaka sesi. |
| **2. İkmal İskelesi & Koloni Tezgâhı** | `#7 Tersane` + `Tüccar Mateo` katılımı | Haftalık tüccar gemisinin indiği rıhtım ve koloninin kendi satış tezgâhı. | Vinç sesleri, sandık taşınması, pazarlık uğultusu. | Liman feneri bip'i, hafif rüzgar, metalik iskele gıcırtısı. |

---

## 3. TÜCCAR GEMİSİ KAPTANI (YARIM İKAMET / HAFTALIK ZİYARETÇİ)

#### Kaptan Orin *(Bağımsız İkmal Tüccarı — Haftada 1 Uğrar)*
* **Hikâye Mantığı:** Uzaydaki serbest kargo pilotlarından biri. Aethelis'in sinyal kulesini ve güvenli iniş pistini görünce haftalık ticaret rotasına eklemiştir.
* **Kişilik & İmza Sesi:** Neşeli, pazarlıkçı, dedikoducu. *Ses:* Ağır kargo konteyneri kilit sesi ve kaba kahkaha.
* **İmza Cümleleri (ElevenLabs — 3 kısa satır):**
  * *Selam:* "İskeleniz sağlam, çorbanız sıcakmış Kaptan!"
  * *Teşekkür:* "Seninle ticaret yapmak zevk!"
  * *Kızgın:* "Bu fiyata motor bile çalıştırmam."

---

## 4. KURALLAR VE SAYILAR

### 4.1. İlan Panosu ve Sipariş Sistemi
* Panoda aynı anda en fazla **3 aktif sipariş** bulunur.
* **3 Sipariş Türü:**
  1. **Yerleşimci İsteği (Tarım / Mutfak):** Örn. *"3 gün içinde 10 Akifer Buğdayı"* veya *"4 Vaha Şerbeti"*.
     * *Ödül:* `150–400 GK`, ilgili yerleşimciye **`+20 Güven`** ve **`+5 Koloni Morali`**.
  2. **Onarım & Zanaat İşi:** Örn. *"Kristal çan onarımı: 2 Piezo Kristal + 10 Kablo"* veya *"Kantin ısıtıcı borusu: 5 Polimer"*.
     * *Ödül:* `250–600 GK`, `+20 Güven` ve bazen nadir malzeme/dekor indirimi.
  3. **Acil Kargo Kontratı (Tüccar / Keşif):** Örn. *"Gemi kalkmadan 30 Titanyum"* veya *"10 Doğal İzotop"*.
     * *Ödül:* `500–1.200 GK` + `1x Takas Kuponu` (Tüccar Orin'den özel eşya almada kullanılır).
* **Süre & Ceza Kuralı:** Siparişlerin süresi `1–3 Oyun Günü` (`6–18 Nöbet`) arasındadır. Süresi dolan sipariş **ceza vermez**, yalnızca panodan kalkıp yerine yeni sipariş düşer.

### 4.2. Haftalık Tüccar Gemisi (Kaptan Orin)
* **Ziyaret Döngüsü:** Her **7 Oyun Gününde 1 kez** (ör. her haftanın 7. Günü `Gümüş Şafak`ta iner, `3 Nöbet` boyunca iskelede kalıp `Yeşil Öğle` sonunda ayrılır).
* **Fiyat Dalgalanması:** Orin her gelişinde belirli ürün gruplarına yüksek veya düşük fiyat verir (`%70` ile `%140` arası).
  * *Tüccar Mateo (Güven Kademe 3)* açıksa, Orin gelmeden 1 gün önce hangi ürünün pahalıya gideceğini önceden söyler!
* **Özel Stok:** Orin bazen koloni dışından nadir tohum, sesli dekor parçası, yakıt veya Tonoflenya köprüsü sonrası egzotik takas eşyası (`Fenrir Tozu` / `ML` karşılığı) getirir.
  * *Çok Düşük İhtimalli Malazar Dağı Stoğu (İlerideki Büyü/Akademi Kilidi):* Orin her gelişinde **`%10–%15` çok düşük ihtimalle** Malazar Dağı'ndan elde edilen Malkenlere özel **`Malazar Asası`** veya **`Malazar Büyü Kristali`** getirir (yüksek `GK` + `2–3 Takas Kuponu` ile alınır; `1x Asa` + `2–3x Kristal` biriktirildiğinde Akademi/Okul büyü kısmını açacak `Büyü Tozu` üretiminin anahtarıdır).

### 4.3. Koloninin Kendi Satış Tezgâhı
* Oyuncu fazla olan **1–4 çeşit ürünü** (ör. fazla mantar, patates, şerbet, hurda titanyum) Koloni Tezgâhı'na koyar.
* Nöbetler ilerledikçe yerleşimciler ve uğrayan küçük keşif botları bu ürünleri satın alır; gelir doğrudan kasaya (`GK`) eklenir.
* *Tüccar Mateo (Güven Kademe 2)* açıksa tezgâh satışları **`+%10` ekstra gelir** getirir.

### 4.4. Tüccarda Alım–Satım Yöntemleri ve Kullanılan Kaynaklar
* **Tüccar'dan Satın Alma (3 Yöntem):**
  1. **`GK` (Galaktik Keşif Kredisi):** Temel hammaddeler, eksik inşaat/tamir parçaları, tohumlar ve standart genom kapsülleri (`Paket 4` gereği `3x–5x` pahalı fiyatla ve `1–2` nadir stok sınırıyla).
  2. **`Takas Kuponu` (`İlan Panosu`'ndan Kazanılır):** Nadir/Efsanevi genom kapsülleri, özel sesli dekorlar ve nadir hibrit tohumlar `1–3 Takas Kuponu` (+ gerekirse az `GK`) karşılığında alınır.
  3. **Doğrudan Mal-Mal Takası (Barter):** Orin her gelişinde `1–2` özel takas teklifi açar (ör. *"5x Malken İpeği + 4x Tuzlu Balık Konservesi ver → 1x Nadir Genom Kapsülü al"*). Böylece nakit `GK` harcamadan sadece koloni üretimiyle de nadir eşya alınabilir. *(Tonoflenya köprüsü sonrasında egzotik stoklar için mevcut `ML` / `Fenrir Tozu` da kabul edilir.)*
* **Tüccar'a Satış (Ne Satılır, Ne Alınır?):**
  * **Satılabilenler:** Sera/Vaha mahsulleri, balık/konserve, tuğla/seramik/kereste, dokuma/kıyafet, günlük hayvan ürünleri (`Bal`, `Yün`, `Süt`, `Yumurta`, `İpek`) ve maden cevherleri (`%70–%140` dalgalı **`GK`** kazandırır).
  * **Satılamayanlar:** Ana gemi parçaları, kişisel silah/zırhlar ve 20 dış gezegenin özel hikâye/boss numuneleri tüccara satılmaz.

---

## 5. MEVCUT SİSTEMLERLE BAĞ
* **Tarım & Zanaat (`Bina ve araçlar.txt`):** `Koloni Mutfağı`, `Sera`, `Eczane` ve `Dökümhane`de üretilen tüm ürünler artık yalnızca savaş için değil, panodaki siparişleri ve yüksek fiyatlı haftalık ticareti yakalamak için de üretilir.
* **Evren İtibarı:** `00-PROJE-OZET-SISTEMLER.md`'deki Kademe 2–4 pazar indirimleri (`%10 / %15 / %25`) Kaptan Orin fiyatlarına doğrudan uygulanır.
* **Tonoflenya Bağlantısı:** Tonoflenya Köprüsü açıldıktan sonra Orin'in haftalık stoğuna küçük miktarda `Tonoflenya Pazar Malzemesi` (*Deri Astar, Zhaor İpeği* vb.) eklenir.

---

## 6. SESLE OYNANIŞ (ERİŞİLEBİLİRLİK)
* **İlan Panosu:** Yukarı/aşağı kaydırmayla 3 ilan gezilir. Her ilanda TalkBack kalan süreyi, istenen miktarı ve ödülü tek cümlede okur (*"Sorya'nın İsteği: 10 Akifer Buğdayı. Kalan süre: 2 gün. Sende 12 adet var. Teslim etmek için çift dokunun"*).
* **Tüccar Gemisi Gelişi:** Orin indiğinde tüm kolonide duyulan kısa bir **liman kornası ve iniş motoru sesi** çalar.
* **Fiyat Sinyali:** Orin'in pazar listesinde fiyatı yüksek (`+%20+`) olan ürünlerin yanında ince yükselen bir **kasa/zil tınısı**, ucuz ürünlerde ise alçalan bir **bas ton** çalar; böylece görme engelli oyuncu kârlı fırsatı sesle anında yakalar.
