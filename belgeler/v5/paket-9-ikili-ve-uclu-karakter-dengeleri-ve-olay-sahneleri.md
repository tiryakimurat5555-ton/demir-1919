# Paket 9: İkili ve Üçlü Karakter Dengeleri, Çatışma/Sinerji Tablosu ve Olay Sahneleri

## 1. Amaç
Bu belge, `Paket 8`'deki 10 kademeli bireysel ilişkilerin üzerine **ikili ve üçlü NPC–NPC dengelerini** ekler. Amaç, 16 yerleşimcinin yalnızca Kaptan'la değil birbirleriyle de dostluk, rekabet, ön yargı ve dayanışma içinde olduğu canlı bir koloni ekosistemi kurmaktır.
Oyuncu taraf seçtiğinde koloni farklı bir kültürel tona bürünür; **hiçbir seçim oyunu kilitlemez**.

---

## 2. İkili Uyum Ölçeği (`-100` ile `+100` Arası)

> **Eksik / Geç Gelen Karakter Koruması (Asenkron Tetikleme Kuralı):**
> - Hiçbir karakterin bireysel `0–10` barı, henüz kolonide kilidi açılmamış ikinci bir karaktere bağlanmaz; herkes kendi başına `K10`'a kadar çıkabilir.
> - İkili/üçlü çatışma ve sinerji sahneleri bireysel `0–10` barından **bağımsız bir olay havuzunda** uyku modunda bekler.
> - **Tetiklenme Şartı:** `(Karakter A Kolonide + K5+) VE (Karakter B Kolonide + K5+)`. Örneğin `Torvok` çoktan `K10` olmuşsa bile `Brom` aylar sonra gelip `K5`'e ulaştığı an sahne otomatik olarak tetiklenir.
> - Üçlü sahnede 3. karakter henüz kolonide yoksa, o sahnedeki 3. gözlemci rolünü **mevcut Sosyal Ocak'tan başka bir yerleşimci** (ör. `Usta Veysel` veya `Dr. Lyris`) devralır.

Her ikili çiftin kendi arasında gizli bir **Uyum Skoru** vardır (başlangıçta yakın çiftler `+35`, çatışmalı çiftler `-35` başlar):

| Uyum Aralığı | Durum | Koloni İçi Davranış ve Oynanış Etkisi |
|---|---|---|
| **`-100 .. -30`** | **Kırgın / Soğuk** | Aynı mekânda bulunmaktan kaçınırlar; Taverna'da zıt köşelere otururlar. Ortak proje üretmezler. |
| **`-29 .. -1`** | **Gergin / Tartışmalı** | Karşılaştıklarında iğneleyici laf atarlar; ikili arabuluculuk sahnesi tetiklenmeye hazırdır. |
| **`0 .. +29`** | **Nötr / Mesafeli Saygı** | İş gereği konuşurlar, kişisel yakınlık yoktur. |
| **`+30 .. +69`** | **Uyumlu / Dost** | Aynı atölye veya masada yan yana çalışırlar; birbirleri hakkında oyuncuya olumlu dedikodu fısıldarlar. |
| **`+70 .. +100`** | **Tam Sinerji / Ortak** | **Ortak Sinerji Ödülü** kalıcı olarak açılır; kriz anlarında birbirlerinin işini otomatik desteklerler. |

---

## 3. Sekiz Kilit Çatışma & Arabuluculuk Çifti

Bu çiftler zıt düşünce yapılarından dolayı doğal olarak sürtüşür. İki karakter de ilgili kademeye (`genelde Kademe 4–5`) ulaştığında arabuluculuk sahnesi açılır:

| Çift | Gerilim Konusu | Tek Taraf Tutulursa | Ortak Orta Yol Bulunursa (Uyum `+40`) |
|---|---|---|---|
| **1. Brom ↔ Yapay Bilinç Tina** | Eski Filtra ustası çeliğe güvenmeyen bir makineyi atölyede istemez. | `Brom` kazanırsa atölye saf mekanik kalır; `Tina` kazanırsa otomasyon artar, Brom küser. | `Brom` tecrübesini, `Tina` hassas ölçümünü birleştirir -> **Hatasız Ağır Şasi İndirimi (-%10)**. |
| **2. Sorya Val-Nira ↔ Tüccar Mateo** | Fazla erzak koloniye bedava mı dağıtılsın, İskele'de GK'ya mı satılsın? | `Sorya` = Moral artar; `Mateo` = GK geliri artar. | İhtiyaç fazlasının yarısı sofraya, yarısı kârlı takasa -> **Düzenli İkmal & Sofra Dengesi**. |
| **3. Kaptan Marcus ↔ Zarek Sol-Zhaor** | Katı gece nöbeti çizelgesi mi, özgür keşif içgüdüsü mü? | `Marcus` = Karakol disiplini artar; `Zarek` = Keşif hızı artar. | Gece dış hatlar `Marcus`'a, gündüz öncü izi `Zarek`'e -> **Çift Katmanlı Güvenlik**. |
| **4. Torvok ↔ Sira-Vel** | Dökümhane/maden ısısı ve gürültüsü göl/hamam suyunu bulandırıyor. | `Torvok` = Maden hızı; `Sira-Vel` = Şifa huzuru. | Atık ısıyı Hamam'a yönlendiren kapalı kanal -> **Ücretsiz Sıcak Su & Ocak Verimi**. |
| **5. Kaelon Vex-Tar ↔ Julian** | Julian'ın atölye yanında çan/müzik provası Kaelon'un dikkatini dağıtıyor. | `Kaelon` = Teknik hata sıfırlanır; `Julian` = Moral artar. | Akort saatlerini vardiya sonuna alma -> **Ritimli Atölye (Yorgunluk -%10)**. |
| **6. Pilot Elara ↔ Usta Veysel** | Eski usul ağır el işçiliği mi, hızlı seri çözüm mü? | `Elara` = Hız; `Veysel` = Kalite. | Hızlı iskelet `Elara`'dan, ince ahşap/kaplama `Veysel`'den -> **Dayanıklı Hızlı Kamara/Araç Dekoru**. |
| **7. Dr. Nerissa Tide ↔ Zarek Sol-Zhaor** | Keşifte önce bilimsel tarama mı, saha cesareti mi? | `Nerissa` = Güvenli veri; `Zarek` = Hızlı yol. | Zarek numune getirir, Nerissa anında analiz eder -> **Tehlike Erken Uyarısı**. |
| **8. Halvar ↔ Julian** | Patlama travmalı Halvar, yüksek sesli festival/çan provalarından irkiliyor. | `Halvar` = Sessiz nöbet; `Julian` = Yüksek sesli şölen. | Julian düşük frekanslı yumuşak tınılar besteler -> **Halvar'ın Huzur Terapisi (+Moral)**. |

---

## 4. Sekiz Kilit Sinerji & Ortaklık Çifti

Bu çiftler birbirini tamamlar. İki karakteri de **Kademe 5+** seviyesine çıkardığında özel **Ortak Sinerji Sahnesi** tetiklenir ve tek başlarına üretemedikleri kalıcı ödül açılır:

| Ortak Çift | Ön Şart | Ortak Sinerji Sahnesi & Kalıcı Kazanç |
|---|---|---|
| **1. Torvok + Brom** | İkisi `K5+` | *"Kaelith Ateşi, Filtra Çekici"* — İki usta aynı örste çalışır; **T3 ve zırhlı araç parçalarında %15 ek dayanıklılık**. |
| **2. Dr. Lyris + Dr. Nerissa Tide** | İkisi `K5+` | *"Malken ve Abis İksiri"* — Kat 21–40 zehir/spor etkilerini %50 azaltan **Çift Kaynaklı Antikor** açılır. |
| **3. Usta Veysel + Kaelon Vex-Tar** | İkisi `K5+` | *"Ahşap ve Dişli"* — Kaptanın Kamarası için hareketli/sesli **Otomatik Yıldız Müzik Kutusu** üretilir. |
| **4. Sorya Val-Nira + Usta Veysel** | İkisi `K5+` | *"İki Dünyanın Fırını"* — Dünya ekmeği ile Vaha hurması birleşir; **Seferlerde +1 ekstra rasyon ve +5 Moral**. |
| **5. Öğretmen Defne + Yapay Bilinç Tina** | İkisi `K5+` | *"Canlı Yıldız Dersliği"* — Okulda çocuklar ve çıraklar için **sesli interaktif tarih arşivi** açılır; çırak eğitimi +%20 hızlanır. |
| **6. Zarek Sol-Zhaor + Pilot Elara** | İkisi `K5+` | *"Yıldızdan Toprağa Rota"* — Hem uzay hem kara araçlarında **yakıt/süre -%8 ortak optimizasyon**. |
| **7. Dr. Lyris + Sira-Vel** | İkisi `K5+` | *"Buhar ve Çay"* — Termal Hamam sonrası içilen özel çay ile **yaralanma ve stres aynı anda sıfırlanır**. |
| **8. Kaptan Marcus + Halvar** | İkisi `K5+` | *"Sessiz Kalkan Hattı"* — Maden Kat 20/20/30 ve Kıyı karakollarına **ek enerji kalkanı (+%10 pusu engelleme)**. |

---

## 5. Dört Sosyal Ocak ve Üçlü Olay Sahneleri

Kolonide olaylar sadece iki kişi arasında kalmaz; **4 Sosyal Ocak** içinden 3. bir kişi hakem veya tanık olarak sahneye girer:

1. **Ocak & Atölye Grubu:** `Usta Veysel`, `Kaelon Vex-Tar`, `Torvok`, `Brom`, `Halvar`
2. **Şifa & Toprak Grubu:** `Sorya Val-Nira`, `Dr. Lyris`, `Sira-Vel`, `Dr. Nerissa Tide`
3. **Gök & Keşif Grubu:** `Kaptan Marcus`, `Zarek Sol-Zhaor`, `Pilot Elara`
4. **Kültür & Pazar Grubu:** `Öğretmen Defne`, `Julian`, `Tüccar Mateo`, `Yapay Bilinç Tina`

### Örnek 3'lü Olay Sahneleri (Geliştirici İçin Şablon)

#### Sahne A: *Ocak Başında Makine Tartışması* (`Brom` ↔ `Tina` + `Öğretmen Defne`)
- **Mekân:** Atölye Sokağı (`Kademe 5+`)
- **Durum:** `Brom`, `Tina`'nın döküm ısı sensörünü sökmek üzeredir. `Öğretmen Defne` çocukların bunu görüp korktuğunu söyleyerek araya girer.
- **Oyuncu Seçimleri:**
  1. **"Brom haklı, ağır çekiçte his gerekir."** → `Brom +30`, `Tina -15`, `Defne -5` *(Koloni gelenekçi zanaat tonuna kayar)*.
  2. **"Tina'nın ölçümü hayat kurtarır, Brom alışmalı."** → `Tina +30`, `Defne +10`, `Brom -20` *(Koloni teknolojik/verimli tona kayar)*.
  3. **"[Ortak Orta Yol — Arşiv veya Kademe 5+] Brom'un el ölçüsünü Tina sadece kayıt etsin, komut vermesin."** → `Brom +20`, `Tina +20`, `Defne +15`, Uyum `+40` *(İkisi de birbirine saygı duymaya başlar)*.

#### Sahne B: *Kıtlık Korkusu ve Kâr Defteri* (`Sorya` ↔ `Mateo` + `Usta Veysel`)
- **Mekân:** Koloni Meydanı / Aşhane (`Kademe 5+`)
- **Durum:** `Sorya` fazla hurma ve ekmeği herkese dağıtmak isterken `Mateo` Tüccar Orin'e satıp GK getirmek ister. `Usta Veysel` bastonunu yere vurup Kaptan'ın kararını bekler.
- **Oyuncu Seçimleri:**
  1. **"Önce kimse aç kalmasın, hepsi sofraya."** → `Sorya +30`, `Veysel +15`, `Mateo -15` *(Moral +5)*.
  2. **"Koloniye nakit lazım, Mateo satsın."** → `Mateo +30`, `Sorya -15`, `Veysel -10` *(+Ek GK fırsatı)*.
  3. **"[Ortak Orta Yol — Aşhane + İskele varsa] Taze yemek sofraya, uzun ömürlü konserve/turşu takasa!"** → `Sorya +20`, `Mateo +20`, `Veysel +20`, Uyum `+40` *(Konserve/kurutulmuş ürün ticareti açılır)*.

#### Sahne C: *Sıcak Çekiç, Soğuk Su* (`Torvok` ↔ `Sira-Vel` + `Dr. Lyris`)
- **Mekân:** Termal Şifa Hamamı Çevresi (`Kademe 5+`)
- **Durum:** `Torvok` ocağın cüruf suyunu dereye akıtınca `Sira-Vel`'in şifa havuzu bulanır. `Dr. Lyris` su kalitesi uyarısı verir.
- **Oyuncu Seçimleri:**
  1. **"Torvok'un ocağı duramaz, madene ihtiyacımız var."** → `Torvok +25`, `Sira-Vel -20`, `Lyris -15`.
  2. **"Şifa suyu kirlenemez, ocağı kapat."** → `Sira-Vel +25`, `Lyris +15`, `Torvok -20`.
  3. **"[Ortak Orta Yol — Kaelon veya Boru Malzemesi varsa] Ocağın sıcak atık suyunu kapalı boruyla Hamam kazanına bağlayalım."** → `Torvok +20`, `Sira-Vel +25`, `Lyris +15`, Uyum `+45` *(Hamam ısınma maliyeti sıfırlanır)*.

---

## 6. Sesle Oynanış (TalkBack / VoiceOver + 3D Ses)
- **Mekânda Sosyal Konumlandırma:** Oyuncu `Taverna`'ya veya `Meydan`'a girdiğinde, **uyumu yüksek (`+30`) çiftlerin** imza sesleri (ör. Veysel'in bastonu + Kaelon'un anahtarı) **aynı yönden** ve neşeli sohbet uğultusuyla gelir. **Gergin (`-`) çiftler** ise odanın zıt iki ucundan duyulur.
- **İkili Olay Bildirimi:** Bir üçlü/ikili olay tetiklenmeye hazırsa `Merkez Terminal` veya mekân girişinde *"Meydan'da bir tartışma/toplanma sesi duyuluyor"* anonsu geçer; oyuncu dilerse hemen katılır, dilerse sonraya bırakır (kaçırma cezası yoktur).
- **Sosyal Ağ Özeti:** Herhangi bir yerleşimcinin profil kartında *"Şu an arası iyi: ... | Tartıştığı: ..."* satırı TalkBack ile tek dokunuşta okunur.
