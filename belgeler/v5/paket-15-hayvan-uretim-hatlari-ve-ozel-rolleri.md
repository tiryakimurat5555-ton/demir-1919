# Paket 15: Hayvan Üretim Hatları, Barınak Modülleri ve Üretim Dışı Özel Roller

## 1. Amaç
Bu belge, `Paket 14`'teki 50 hayvanın kuluçkadan çıktıktan sonra kolonide **nasıl işlev kazandığını** tanımlar:
1. Hangi hayvan hangi **Barınak Bakım Modülünü** (`Kovan`, `Kümes`, `Ağıl/Sağım`, `İpek/Teraryum`, `Su Havuzu`) gerektirir?
2. Üretim hattına bağlı hayvanların ürünleri hangi binalarda (`Aşhane`, `Dokuma`, `Şifa Labı`, `Atölye`) neye dönüşür?
3. **Üretim zincirine bağlı olmayan** hayvanlar kolonide hangi farklı amaçlarla (keşif alarmı, stres azaltma, tozlaşma, festival morali, yoldaşlık) kullanılır?

---

## 2. Barınak Bakım Modülleri (Önce Modül Kilidi, Sonra Üretim)

Bir hayvan kuluçkadan çıktığında `Hayvan Barınağı`na konur; ancak o türe ait **Bakım Modülü** kurulmadan düzenli üretim hattı başlamaz. İlgili ilk tür keşfedildiği an o modülün planı Barınak menüsünde açılır:

| Barınak Modülü | Kurulum Şartı (Örnek) | Kapsadığı Hayvan Türleri | Günlük Çıktı |
|---|---|---|---|
| **1. Arı Kovanı (`Kovan`)** | `Kıyı Kerestesi` + `Reçine` + `Lif` | `Dünya Bal Arısı (#11)`, `Vaha Yonca Arısı (#12)`, `Aether-Arısı (#33)` | `Bal`, `Aromatik Bal`, `Aether Balı` *(+Sera verim bonusu)* |
| **2. Kümes & Tünek** | `Kereste` + `Lif` + `Tuğla` | `Vanguard Tavuğu (#1)`, `Gümüş Tavuk (#2)`, `Kaya Bıldırcını (#3)`, `Sığ Göl Ördeği (#4)`, `Kızıl Kaz (#5)`, `Hindi (#14)`, `Piezo-Tavuk (#31)`, `Kıvılcım Bıldırcını (#39)` | `Xeno-Yumurta`, `Piezo Yumurta`, `Uyku Tüyü` |
| **3. Ağıl & Sağım Bölmesi** | `Kereste` + `Demir` + `Seramik Kova` | `Süt Keçisi (#6)`, `Dağ Koyunu (#7)`, `Altın Koç (#8)`, `Minik İnek (#9)`, `Ren-Keçisi (#15)`, `Sis-Yünü Keçisi (#21)`, `Malken Şifa Keçisi (#30)`, `Yıldız-Yünlü (#32)`, `Kristal-Süt İneği (#36)`, `Liken-Koyunu (#41)`, `Kar-Lalesi Keçisi (#45)` | `Xeno-Süt`, `Şifalı Süt`, `Yumuşak Yün`, `Işıldayan Yün` |
| **4. İpek & Teraryum Bölmesi** | `Kalın Cam` + `Kereste` + `Işık Otu` | `Keten Tavşanı (#10)`, `Termal Kertenkele (#18)`, `Fosforlu Geko (#19)`, `Vaha İpek Böceği (#20)`, `İpek-Tavşan (#38)` | `Malken İpeği`, `Isı/Işık Yağı`, `Fosforlu Liken Özü`, `İnce Lif` |
| **5. Su & Kabuk Havuzu** | `Tuğla` + `Kireç Taşı` + `Saf Su` | `Termal Kuğu (#24)`, `Rezonans Kaplumbağası (#23)`, `Bal-Kaplumbağası (#43)`, `Termal-Ördek (#34)` | `Doğal Bal Peteği`, `Sıcak Su Yumurtası`, `Rezonans Kabuk Parçası` |

---

## 3. Üretim Zinciri Hatları (Hayvan → Modül → İşleme Binası → Son Ürün)

Üretim odaklı hayvanlar mevcut `Paket 10` ve `Paket 12` binalarını doğrudan besler:

1. **Arı Hattı (`Kovan`):**
   - `Bal Arısı / Yonca Arısı` → `Bal` → **`Aşhane`** (`Bal + Ekmek/Börek` = Yüksek Moral Kahvaltısı) & **`Şifa Labı`** (`Kristal Çiçek + Bal` = `Sakinleştirici Malken Çayı`).
   - `Aether-Arısı (#33)` → `Aether Balı` → **`Şifa Labı`** (Sefer yorgunluğunu tek içişte azaltan üst düzey şifa şurubu).
2. **Süt & Peynir Hattı (`Ağıl`):**
   - `Süt Keçisi / Minik İnek / Kristal-Süt İneği` → `Xeno-Süt` → **`Aşhane`** (`Peynir`, `Peynirli Börek`, `Sütlü Çay`).
   - `Malken Şifa Keçisi (#30)` → `Şifalı Süt` → **`Hamam / Şifa Labı`** (Stres ve hafif yaralanma iyileştirici).
3. **Yün & İpek Hattı (`Ağıl` + `Teraryum`):**
   - `Dağ Koyunu / Sis-Yünü Keçisi / Tavşan` → `Yumuşak Yün / İnce Lif` → **`Dokuma Tezgâhı`** (`Yün Battaniye`, `Kışlık Atkı`).
   - `Vaha İpek Böceği / Yıldız-Yünlü / Liken-Koyunu` → `Malken İpeği / Işıldayan Yün` → **`Dokuma Tezgâhı`** (Festivallere özel parlak kıyafet ve `Kaptan Orin` için yüksek değerli takas kumaşı).
4. **Yumurta & Tüy Hattı (`Kümes`):**
   - `Tavuk / Bıldırcın / Ördek` → `Xeno-Yumurta` → **`Aşhane`** (Hamur işi, sefer rasyonu).
   - `Piezo-Tavuk (#31)` → `Piezo Yumurta` → **`Çan Atölyesi` / `Mateo İskelesi`** (Nadir koleksiyon veya yüksek değerli `İlan Panosu` siparişi).
   - `Kızıl Kaz / Gümüş-Sülün` → `Yumuşak / Gümüşi Tüy` → **`Marangoz / Evler`** (Kamara yatak konforu artışı).
5. **Doğal Yağ & Işık Hattı (`Teraryum`):**
   - `Termal Kertenkele / Fosforlu Geko` → `Doğal Isı Yağı / Liken Özü` → **`Atölye`** (`Işık Otu Fener Yağı` alternatifi — madene giderken bitki beklemeden yakıt üretimi).

---

## 4. Üretim Zincirine Bağlı OLMAYAN Özel Amaçlı Hayvanlar

Tüm hayvanlar "süt/yumurta fabrikası" değildir; **17 tür** tamamen farklı, canlı ve sesli roller üstlenir:

### 4.1. Keşif, Güvenlik ve Erken Uyarı Hayvanları
- **Kaptan'ın Sesli Xeno-Köpeği (#49):** Hiçbir ürün üretmez. `Kıyı Koruluğu` veya `Maden Kat 1–10` yürüyüşlerinde oyuncunun yanında yürür; pusudaki düşmanı **1 tur önceden havlayarak** bildirir ve kayıp düğümleri koklayarak bulur!
- **Yankı Kazı (#40) & Zırhlı Keçi (#37):** Çiftlik çevresinde dolaşır; dışarıdan baskın/tehlike yaklaştığında alarm sesi vererek karakol uyarı süresini uzatır.

### 4.2. Ekosistem & Küçük Toplayıcı Hayvanlar (Otomatik Destek)
- **Mantar Yiyen Porsuk (#22) & Çekirdek Porsuğu (#48):** Sağım/kafes üretimi yapmazlar; gün sonunda barınak tabanında eşelenip rastgele `1x Şifalı Mantar` veya nadir `Piezo/Gümüş` kırıntısı çıkarırlar.
- **Kaya Armadillosu (#29) & Göl Yengeç-Kuşu (#25):** Günde `1–2 adet` rasgele `Ham Kil`, `Kıyı Tuzu` veya `Yengeç Kabuğu` bırakır.
- **Yıldız Güvesi (#26):** Ürün vermez; geceleri `Termal Vaha`'nın üzerinde uçuşarak `Kristal Çiçek` ve `Işık Otu` büyüme hızını **`+%15`** artırır.

### 4.3. Moral, Müzik, Terapi ve Ev Yoldaşları
- **Sakinleştirici Mırıl-Kedi (#28):** `Kaptanın Kamarası`'nda veya `Termal Hamam`'da yaşar. Yanına yaklaşıp sevdiğinde hafif **mırıltı sesi** çalar ve günde 1 kez **`-10 Stres`** verir.
- **Yankı Bülbülü (#17), Çan-Kanatlı Güvercin (#35), Kristal İbikli Kuş (#16):** `Julian`'ın Çan Atölyesi ve Meydan'da öterler; koloninin akşam moralini pasif olarak yükseltirler.
- **Şafak Horozu (#46):** Her `Zhaor` (sabah) nöbetinin başında neşeli bir ötüşle yeni günü ve hava/mevsim bilgisini müjdeler.
- **Evcil Güvercin (#13), Göl-Ejderi (#42), Mistik Tavus Kuşu (#47), Aethelis Anka-Kuşu (#50):** Üretim zincirine girmezler; `Koloni Arşivi` (`50/50`) tamamlama, Festival morali (`+5` / `+10`) ve yaşayan koloni ses atmosferi için özel prestij/yoldaş canlılarıdır.

---

## 5. Sesle Oynanış (TalkBack / VoiceOver)
- **Modül Eksikliği Uyarısı:** Oyuncu elinde örneğin `Dünya Bal Arısı` varken henüz `Kovan` kurmadıysa TalkBack net söyler: *"Dünya Bal Arısı kuluçkadan çıktı! Bal üretimi için Barınak Menüsünden `Arı Kovanı` modülünü kurmalısın."*
- **Yoldaş Seçimi (`Xeno-Köpek` / `Mırıl-Kedi`):** Barınakta bu özel hayvanlara dokunulduğunda *"Maden/Kıyı Yoldaşı Olarak Yanına Al"* veya *"Kaptanın Kamarası'na Taşı"* seçeneği çıkar.
