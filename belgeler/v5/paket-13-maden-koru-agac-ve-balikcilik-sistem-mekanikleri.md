# Paket 13: Maden, Kıyı Koruluğu (Ağaç Kesimi) ve Balıkçılık Sistem Mekanikleri

## 1. Amaç
Bu belge, `Paket 5` ve `Paket 6`'da tanımlanan yürünebilir alanların **oynanış matematiğini ve adım adım sistem kurallarını** belirler: Maden içinde nasıl yön bulunup kazı yapılacağı, hangi katta hangi ekipmanın gerekeceği, korulukta ağaçların kaç vuruşta devrilip ne vereceği ve balıkçılığın sesli tutma/olta mekanikleri net sayılarla tanımlanır.

---

## 2. Derin Maden Ocağı Sistemi (`Kat 1 – 40`)

### 2.1. Madende Nasıl Yol İzlenir? (Sesli Oda & Yön Bulma)
- Oyuncu maden girişinden asansöre biner ve açık duraklardan birini seçer (`Kat 1, 5, 10, 15, 20, 25, 30, 35, 40`).
- Her kat, TalkBack ve 3D sesle gezilen **4–6 düğümlü** bir yeraltı galerisi olarak çalışır:
  - *Sol / Ön-Sol / Ön / Ön-Sağ / Sağ* yönlerinden gelen ses ipuçlarıyla düğümler seçilir:
    - **Cevher / Kristal Damarı:** İnce metalik veya kristal parıltı tınısı.
    - **Kaya Duvarı (Engel):** Tok taş yankısı *(ardında gizli oda veya aşağı iniş merdiveni olabilir)*.
    - **Tehlike (Düşman / Gaz Cebi):** Hırıltı, kıskaç tıkırtısı veya gaz tıslaması.
    - **Aşağı İniş Merdiveni:** Rüzgar/derinlik uğultusu *(Kat temizlenmeden veya gizli merdiven bulunmadan görünür/açılır)*.
- **Yorgunluk & Dönüş:** Oyuncu canı/fener yağı azaldığında **istediği an** asansör/halatla çıkışa veya `Kat 10/20/30` karakoluna dönebilir; topladıkları çantada kalır.

### 2.2. Maden Nasıl Kazılır? (Vuruş, Verim ve Alet Etkisi)
Bir cevher veya kaya düğümüne yaklaşıldığında **"Kaz / Kır"** düğmesine basılır (her vuruşta çekiç/kazma sesi ve hafif titreşim gelir):

| Damar / Kaya Türü | Bulunduğu Katlar | Gereken Min. Kazma | Vuruş Sayısı (`T1 / T2 / T3`) | Elde Edilen Ürün & Adet |
|---|---|---|---|---|
| **Kaba Taş / Kil / Kömür** | `Kat 1–10` | `T1` | `3 / 2 / 1 vuruş` | `2–4 Bazalt / Kil / Kömür` |
| **Demir & Bakır Damarı** | `Kat 1–20` | `T1` | `4 / 3 / 2 vuruş` | `2–3 Demir / Bakır Cevheri` |
| **Kuvars & Gümüş Damarı** | `Kat 11–25` | `T2` *(Demir)* | `— / 4 / 3 vuruş` | `1–3 Gümüş Tozu / Kuvars` |
| **Piezo Kristal & Mantar** | `Kat 11–25` | `T2` *(Demir)* | `— / 4 / 2 vuruş` | `1–2 Piezo Kristal`, `1–3 Şifalı Mantar` |
| **Kalın Kaya Duvarı** | `Kat 11–40` | `Mammoth` *(veya T3 + 6 vuruş)* | `Mammoth: 1 darbe` | Arkasından gizli damar odası veya kestirme merdiven |
| **Aether & Fosil Damarı** | `Kat 26–40` | `T3` *(Kristal)* | `— / — / 5 vuruş` | `1–2 Küçük Aether / Fosil Parçası` |
| **Çekirdek Taşı Damarı** | `Kat 31–40` | `T3` *(Kristal)* | `— / — / 6 vuruş` | `1 Çekirdek Taşı` + nadir `Elmas/Altın Kırıntısı` |

*(Not: `Torvok K6+` açıkken nadir cevher düşme şansı `+%20` artar.)*

### 2.3. Zorluk Katmanları ve Gereksinimler
| Kat Aralığı | Tehlike Seviyesi | Önerilen / Gereken Ekipman |
|---|---|---|
| **Kat 1–10** | **Düşük** (Nadir zayıf kaya böceği) | `T1 Kazma` + `T1 Kafa Feneri` (`Çöl Tilkisi` içeri girebilir). |
| **Kat 11–25** | **Orta** (`Kristal Akrep`, `Tünel Pusucusu`) | `T2 Kazma` + `T2 Fener` (1 tur erken düşman sesi) + `Kat 10 Karakolu` + `Antikor İksiri`. |
| **Kat 26–40** | **Yüksek** (`Kör Solucan Yavrusu`, `Gaz Pusucusu`) | `T3 Kazma` + `T3 Fener` (`Işık Otu Yağı`) + `Kat 20/30 Karakolu` + `Mammoth` / `Akrep` + `Silah/Sonik Kovucu`. |

---

## 3. Kıyı Koruluğu ve Ağaç Kesimi Sistemi

### 3.1. Korulukta Nasıl Yol İzlenir?
- `Aethelis İç Denizi ve Kıyı Koruluğu` tek harita içinde **2 şeritli** bir sahil-koru alanıdır: *Kıyı Şeridi* (Tuz, Kıyı Kayası, Balık noktaları) ve *Koru Patikası* (Ağaçlar, Lif Çalıları).
- Her düğüm kesildiğinde/toplandığında **tükenir** ve mevcut yüzey madeniyle aynı mantıkla **bekleme süresine (`30–60 sn`)** girer; ortalama **30 saniyede 1 yeni düğüm** belirir.

### 3.2. Ağaç Kesimi (Vuruş Sayısı ve Elde Edilenler)
Oyuncu bir ağaç veya çalı düğümüne dokunup **"Kes / Topla"** dediğinde balta vuruş sesleri duyulur; son vuruşta **gövde gıcırtısı ve devrilme gümbürtüsü** çalar:

| Koru Unsuru | Gereken Balta | Vuruş Sayısı (`T1 / T2 / T3`) | Elde Edilen Ürün & Adet |
|---|---|---|---|
| **Lif Çalısı / İnce Dal** | `T1` *(veya el)* | `2 / 1 / 1 vuruş` | `2–3 Bitkisel Lif` + `1 Kıyı Kerestesi` |
| **Orta Kıyı Ağacı** | `T1` | `4 / 3 / 2 vuruş` | `3–5 Kıyı Kerestesi (Odun)` + `1–2 Ağaç Reçinesi` |
| **Yaşlı Sert Koru Ağacı** | `T2` *(Çelik Balta)* | `— / 5 / 3 vuruş` | `6–9 Kıyı Kerestesi` + `2–3 Reçine` + `%25` ihtimalle `1x İşlenmiş Kalas` |
| **Kıyı Kayası / Tuz Birikintisi** | `T1 Kazma` | `3 / 2 / 1 vuruş` | `2–4 Kıyı Kireç Taşı` veya `2–4 Deniz Tuzu` |

---

## 4. İç Deniz Balıkçılığı Sistemi

### 4.1. Nerede Ne Bulunur? (3 Avlanma Noktası)
1. **Sığ Göl Kıyısı (Standart Nokta):**
   - *Çıkanlar:* `Gümüş Göl Sazanı` (%75), `Yosun / Eski Teneke` (%15), `Küçük Göl Balığı (Akvaryum)` (%10).
2. **Sıcak Termal Akıntı (Vaha Yakını — `Kat 10` veya Kıyı Kampı Sonrası):**
   - *Çıkanlar:* `Termal Yılan Balığı` (%50), `Gümüş Göl Sazanı` (%35), `Şifa / Hamam Minerali` (%15).
3. **Kayalık Koy & Açık İskele (`T2+ Olta` veya `Atmosphere-X` Adacıkları):**
   - *Çıkanlar:* `Kristal Kabuklu Yengeç` (%45), `Termal Yılan Balığı` (%30), `Deniz Tuzu` (%15), nadir `Batık Fosil / Gümüş Parçası` (%10).

### 4.2. Balık Nasıl Tutulur? (4 Adımlı Sesli Mekanik)
1. **Olta Atışı:** Oyuncu "Olta At" düğmesine basar; havada ıslık ve suda *"cup!"* sesi duyulur.
2. **Bekleyiş (3–8 sn):** Hafif dalga şırıltısı duyulur.
3. **Vurma / Isırma Anı:** Ani ve keskin bir **"ŞLAP!" su sıçrama sesi + telefon titreşimi** gelir. Oyuncu olta kademesine göre **1.5 – 2.5 saniye** içinde dokunarak tasmayı atar.
4. **Çekme Ritmi (2–3 Kısa Tur):**
   - Makara dönerken bir **gerginlik tonu** yükselir:
     - *Normal ton / suya çarpma:* Ekrana **basılı tut / çek**.
     - *Tiz ip gerilme gıcırtısı:* İp kopmasın diye **1 saniye bırak**; ses yumuşayınca tekrar çek.
   - Balık kıyıya çıkınca neşeli su sıçraması ve TalkBack anonsu çalar (*"Yakalandı: 1x Termal Yılan Balığı!"*).

### 4.3. Oltaların Etkileri (`T1`, `T2`, `T3`)
| Olta Seviyesi | Isırma Tepki Penceresi | Çekme Kolaylığı | Özel Etki ve Nadir Yakalama |
|---|---|---|---|
| **T1 Basit Olta** | `1.5 saniye` | Standart gerginlik hızı | Yalnızca Sığ Kıyı ve basit balıkları (`Gümüş Sazan`) rahat çeker; büyük avlarda ip çabuk gerilir. |
| **T2 Güçlü Olta** | `2.0 saniye` (**+%25 geniş**) | Gerginlik artışı `%20` yavaşlar | `Termal Yılan Balığı` ve `Kristal Kabuklu Yengeç` kaçma şansını yarıya indirir. |
| **T3 Usta Olta** | `2.4 saniye` (**+%40 geniş**) | Çok dengeli gerginlik | Tek atışta **`%25` ihtimalle çift balık veya ekstra `Deniz Tuzu`** çeker; batık fosil/gümüş şansı 2x olur. |

*(Bonus: `Sira-Vel K6+` açıkken tüm noktalarda nadir balık/yengeç şansı `+%25` artar.)*

---

## 5. Sesle Oynanış (TalkBack / VoiceOver)
- **Zorluk / Ekipman Uyarısı:** Oyuncu `T2` gereken bir damara `T1` kazmayla veya `T2` balta gereken yaşlı ağaca `T1` baltayla dokunursa sistem boşa vuruş yaptırmaz; tek cümlede uyarır: *"Bu damar için En Az Demir Kazma (T2) gerekir."*
- **Tek Tuşlu Erişilebilirlik Seçeneği (İsteğe Bağlı):** Ayarlarda **"Basit Balıkçılık Modu"** açık olursa çekme aşamasındaki bas-bırak ritmi sadeleştirilir; yalnızca ısırma anında (`Şlap!`) tek dokunuş yeterli olur.
