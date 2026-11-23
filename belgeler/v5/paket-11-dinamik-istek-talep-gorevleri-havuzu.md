# Paket 11: Dinamik İstek & Talep Görevleri Havuzu (Rastgelelik ve Ölçeklenme Sistemi)

## 1. Amaç
Bu belge, `Paket 2`'deki `İlan Panosu` ve günlük yerleşimci taleplerini `Paket 10` Eşya Kataloğu'na bağlayarak **yüzlerce farklı kombinasyon üretebilen akıllı ve dinamik bir istek havuzu** kurar.
Başlangıçta tek eşya ve az adet isteyen sistem, koloni büyüdükçe ve yeni binalar/maden katları açıldıkça **aynı anda 2–4 farklı eşya isteyen, adetleri artan karmaşık taleplere** dönüşür.

---

## 2. İki Kanallı Talep Sistemi (Hikâye İstekleri + Sıradan Vatandaş İstekleri)

Oyundaki istekler birbirine karışmayan **2 ayrı kanaldan** gelir:

### 2.1. Kanal 1 — Hikâye Dahilindeki İsimli Yerleşimci Talepleri (*"Şu Kişi Benden Şunu İstiyor"*)
- **Kim İster?** 16 isimli yerleşimci (`Sorya`, `Veysel`, `Kaelon`, `Brom`, `Dr. Nerissa`, `Julian` vb.) kendi `K1–K10` hikâye kademelerine, yaklaşılan bir festivale veya ikili olaylara bağlı olarak doğrudan Kaptan'dan talepte bulunur.
- **Nasıl Görünür?** `Görevler -> Yan Görevler` sekmesinde ve `İlan Panosu`'nun en üstünde **`[Özel / İsimli]`** etiketiyle çıkar (ör. *"Brom'un Özel Dövüm İsteği"*).
- **Ödülü:** Doğrudan o karakterin **`İlişki Puanını (+15..+35)`** artırır ve kısa bir hikâye/teşekkür diyaloğu tetikler.

### 2.2. Kanal 2 — Sıradan Vatandaşların Rastgele İstekleri (*İlan Panosu Günlük Akışı*)
- **Kim İster?** Kolonideki sıradan, isimsiz/prosedürel vatandaşlar (*Sera İşçisi, Maden İşçisi, Kıyı Balıkçısı, Gece Nöbetçisi, Genç Çırak, Yeni Evli Aile*).
- **Nasıl Görünür?** `İlan Panosu`'nda **`[Vatandaş İsteği]`** olarak rastgele çıkar. Karakter hikâyelerini bekletmez; günlük ekonomi ve koloni yaşamını canlı tutar.
- **Ödülü:** `GK` + `Koloni Moral (+1..+3)` + yüksek basamaklarda `Takas Kuponu`.

---

## 3. Dinamik Ölçeklenme Algoritması (Sistem Nasıl Ayarlar?)

Sistem yeni bir rastgele talep üretirken **4 parametreye** bakar: *(1) Geçen Gün / Evre, (2) Açık Binalar & Maden Katı, (3) Koloni Nüfusu, (4) Mevcut Yörünge Mevsimi*.

### 3.1. Dört Zorluk & Adet Basamağı
| Basamak | Ne Zaman Aktif Olur? | Aynı Anda İstenen Çeşit | Temel Hammadde Adedi | İşlenmiş Ürün Adedi | Ödül Bandı |
|---|---|---|---|---|---|
| **Basamak 1 (Başlangıç)** | Gün `1–12` (Evre 1) | **1 çeşit eşya** | `2 – 5 adet` | `1 – 2 adet` | `100–250 GK` + `+15 Güven` (veya `+1 Moral`) |
| **Basamak 2 (Gelişme)** | Gün `13–30` (Evre 2) | **1 – 2 çeşit eşya** | `5 – 10 adet` | `2 – 4 adet` | `250–500 GK` + `+20 Güven` (veya `+2 Moral`) |
| **Basamak 3 (Zanaat)** | Gün `31–60` (Evre 3) | **2 – 3 çeşit eşya** | `8 – 18 adet` | `3 – 6 adet` | `500–900 GK` + `+25 Güven` + `Kupon` şansı |
| **Basamak 4 (Büyük Koloni)** | Gün `61+` (Evre 4–5) | **3 – 4 çeşit eşya** | `12 – 25 adet` | `4 – 8 adet` | `800–1.500 GK` + `+35 Güven` + `Takas Kuponu` |

### 3.2. Akıllı Kilit Koruması (İmkânsız İstek Yok)
- Sistem **yalnızca oyuncunun kilidini açtığı** mekân ve kaynaklardan seçim yapar.
- Örneğin `Kat 11–25` henüz açılmadıysa `Piezo Kristal` veya `Gümüş Tozu` istenmez; `Okul` kurulmadıysa `Çocuk Ders Defteri` panoya düşmez.
- Aynı anda **en fazla 3 aktif talep** panoda durur; süresi dolan veya oyuncunun iptal ettiği talep **hiçbir ceza vermeden** silinir ve ertesi sabah yenisi çıkar.

---

## 4. Geniş İstek Havuzu (70 Şablon — İsimli Hikâye + Sıradan Vatandaş)

*(Not: Aşağıdaki şablonlarda parantez içinde birden fazla rol varsa; isimli yerleşimci kendi hikâye evresinde **Kanal 1**, sıradan vatandaşlar ise **Kanal 2** olarak rastgele panoya düşer. Adetler **Basamak 1–2 taban değerleridir**; sistem Basamak 3 ve 4'te çeşit sayısını ve adetleri otomatik yukarı ölçekler.)*

### A. Dünya Gündelik & Sofra Talepleri (12 Şablon)
1. **Taş Fırın Sabahı (`Sorya / Veysel`):** `Taş Fırın Ekmeği` (`2–6 adet`)
2. **Nöbetçi Çayı (`Kaptan Marcus / Halvar`):** `Demli Dünya Çayı` (`2–5 adet`)
3. **Uzun Yol Erzağı (`Mateo / Pilot Elara`):** `Tuzlu Balık Konservesi` (`2–6 adet`)
4. **Akşam Güveci (`Sorya`):** `Balık Çorbası` (`2–4 adet`) + `Deniz Tuzu` (`3–6 adet`)
5. **Taverna İkramı (`Julian`):** `Peynirli Börek & Şerbet` (`2–5 adet`)
6. **Temiz Önlük (`Sorya / Dr. Lyris`):** `Keten Gömlek / İş Tulumu` (`1–3 adet`)
7. **Kışa Hazırlık (`Öğretmen Defne`):** `Yün Battaniye / Atkı` (`1–4 adet`)
8. **Kahvaltı Sofrası (`Veysel`):** `Xeno-Yumurta` (`3–8 adet`) + `Xeno-Süt` (`2–5 adet`)
9. **Un Değirmeni (`Sorya`):** `Arpa & Buğday` (`5–15 adet`)
10. **Sofra Takımı (`Usta Veysel`):** `Seramik Çanak / Testi` (`2–6 adet`)
11. **Kuru Balık Stoğu (`Marcus`):** `Göl & İç Deniz Balıkları` (`4–12 adet`)
12. **Tatlı Kaçamak (`Julian / Çocuklar`):** `Bal` (`2–6 adet`) + `Taş Fırın Ekmeği` (`2–4 adet`)

### B. Malken Kültür, Şifa & Tapınak Talepleri (12 Şablon)
13. **Tapınak Gecesi (`Dr. Lyris`):** `Huzur Tütsüsü` (`2–5 adet`)
14. **Akustik Ayin (`Julian / Zarek`):** `Küçük Kristal Çan` (`1–3 adet`)
15. **Gece Nöbeti Işığı (`Zarek`):** `Rezonans Lambası` (`1–3 adet`)
16. **Sefer Sonrası Arınma (`Dr. Lyris`):** `Sakinleştirici Malken Çayı` (`2–5 adet`)
17. **Hamam Günü (`Sira-Vel`):** `Hamam Aroma Yağı` (`1–4 adet`)
18. **Vaha Şöleni (`Sorya`):** `Vaha Ziyafet Tabağı` (`2–4 adet`) + `Vaha Hurması` (`4–10 adet`)
19. **Derin Maden Koruması (`Dr. Nerissa`):** `Malken & Abis Antikor İksiri` (`1–4 adet`)
20. **Tatlı Kök Hasadı (`Sorya`):** `Tatlı Yıldız Kökü` (`5–12 adet`)
21. **Çiçek Kurutma (`Dr. Lyris`):** `Kristal Çiçek` (`4–10 adet`)
22. **Liken Mürekkebi (`Zarek / Defne`):** `Fosforlu Liken` (`3–8 adet`)
23. **Aether Lambası (`Dr. Lyris`):** `Küçük Aether Damarı` (`1–3 adet`) + `Bakır` (`3–6 adet`)
24. **Kökten Şifa (`Sira-Vel`):** `Şifalı Yeraltı Mantarı` (`3–8 adet`) + `Saf Su` (`3–6 adet`)

### C. Maden, Kıyı & İnşaat / Tamir Talepleri (12 Şablon)
25. **Duvar Örme (`Usta Veysel`):** `Pişmiş Tuğla` (`6–18 adet`)
26. **Yeni Pencere (`Kaelon`):** `Kalın Pencere Camı` (`3–8 adet`)
27. **Çatı ve Sıra Tamiri (`Veysel`):** `İşlenmiş Kereste Kalası` (`4–12 adet`)
28. **İniş Halatı (`Torvok`):** `Halat & İş Eldiveni` (`2–5 adet`)
29. **Fener Yakıtı (`Zarek / Torvok`):** `Işık Otu Fener Yağı` (`2–6 adet`)
30. **Saha Bakımı (`Kaelon`):** `Tamir Kiti` (`1–3 adet`)
31. **Demir Çivi & Menteşe (`Brom / Kaelon`):** `Demir Cevheri` (`6–15 adet`) + `Kömür` (`4–10 adet`)
32. **Kablo & Tesisat (`Halvar`):** `Bakır Cevheri` (`5–12 adet`) + `Ağaç Reçinesi` (`3–6 adet`)
33. **İskele Güçlendirme (`Mateo`):** `Kıyı Kerestesi` (`8–20 adet`) + `Halat` (`2–4 adet`)
34. **Kireç Harcı (`Veysel`):** `Kıyı Kireç Taşı` (`6–15 adet`) + `Ham Kil` (`6–15 adet`)
35. **Gümüş Lehim (`Brom / Kaelon`):** `Gümüş Tozu` (`2–6 adet`) + `Piezo Kristal` (`2–5 adet`)
36. **Çekirdek Ölçümü (`Halvar / Tina`):** `Çekirdek Taşı` (`1–3 adet`) + `Kuvars Kumu` (`4–8 adet`) *(Yalnızca Kat 26–40 açıksa)*

### D. Mevsimlik ve Festival Özel Talepleri (10 Şablon)
37. **[Filiz/Yeşil Mevsimi] Bahar Temizliği (`Sorya`):** `Pamuk & Keten` (`4–10 adet`) + `Hamam Aroma Yağı` (`1–2 adet`)
38. **[Kor/Kızıl Mevsimi] Sıcak Gün İçecekleri (`Julian`):** `Vaha Hurması` (`4–10 adet`) + `Deniz Tuzu` (`3–6 adet`)
39. **[Sis/Mor Mevsimi] Sis Lambası (`Zarek / Marcus`):** `Işık Otu Fener Yağı` (`2–5 adet`) + `Rezonans Lambası` (`1–2 adet`)
40. **[Ayaz/Gümüş Mevsimi] Kış Isınması (`Veysel / Defne`):** `Kömür` (`8–20 adet`) + `Yün Battaniye` (`2–4 adet`)
41. **[Ayaz/Gümüş Mevsimi] Sıcak Çorba Nöbeti (`Sorya`):** `Balık Çorbası` (`3–6 adet`) + `Demli Dünya Çayı` (`3–6 adet`)
42. **Dünya Hasat Bayramı Hazırlığı (`Veysel`):** `Taş Fırın Ekmeği` (`4–8 adet`) + `Xeno-Süt` (`3–6 adet`)
43. **Malken Işık Gecesi (`Dr. Lyris`):** `Huzur Tütsüsü` (`3–6 adet`) + `Fosforlu Liken` (`4–8 adet`)
44. **Ses ve Çan Şenliği (`Julian`):** `Küçük Kristal Çan` (`2–4 adet`) + `Rüzgâr Çanı` (`1–2 adet`)
45. **Büyük Hizalanma Şöleni (`Sorya + Julian`):** `Vaha Ziyafet Tabağı` (`2–4 adet`) + `Peynirli Börek & Şerbet` (`3–5 adet`)
46. **Kış Ateşi Odunu (`Torvok`):** `Kıyı Kerestesi` (`10–20 adet`) + `Ağaç Reçinesi` (`4–8 adet`)

### E. Çoklu Karmaşık / Kombo Paket Talepleri (Basamak 3–4 — 10 Şablon)
47. **Karakol İkmal Paketi (`Kaptan Marcus`):** `Pişmiş Tuğla` (`10 adet`) + `Demir` (`8 adet`) + `Tuzlu Balık Konservesi` (`4 adet`) + `Fener Yağı` (`2 adet`)
48. **Derin Maden Seferi Paketi (`Torvok`):** `Halat & İş Eldiveni` (`3 adet`) + `Antikor İksiri` (`2 adet`) + `Tamir Kiti` (`2 adet`) + `Taş Fırın Ekmeği` (`5 adet`)
49. **Okul Yeni Dönem Paketi (`Öğretmen Defne`):** `Çocuk Ders Defteri` (`4 adet`) + `Kereste Kalası` (`6 adet`) + `Yün Battaniye` (`2 adet`)
50. **İki Dünyanın Ziyafeti (`Sorya + Veysel`):** `Taş Fırın Ekmeği` (`4 adet`) + `Vaha Ziyafet Tabağı` (`2 adet`) + `Demli Dünya Çayı` (`4 adet`) + `Sakinleştirici Malken Çayı` (`3 adet`)
51. **Araç Bakım & Kıyı Paketi (`Pilot Elara + Kaelon`):** `Tamir Kiti` (`2 adet`) + `Kalın Cam` (`4 adet`) + `Bakır` (`6 adet`) + `Reçine` (`4 adet`)
52. **Hamam & Şifa Günü (`Dr. Lyris + Sira-Vel`):** `Hamam Aroma Yağı` (`2 adet`) + `Huzur Tütsüsü` (`3 adet`) + `Sakinleştirici Çay` (`4 adet`) + `Keten Gömlek` (`2 adet`)
53. **Tüccar Orin İhracat Sandığı (`Tüccar Mateo`):** `Seramik Çanak` (`4 adet`) + `Tuzlu Balık Konservesi` (`5 adet`) + `Küçük Kristal Çan` (`2 adet`)
54. **Akustik & Rezonans Paketi (`Julian + Tina`):** `Piezo Kristal` (`4 adet`) + `Rezonans Lambası` (`2 adet`) + `Gümüş Tozu` (`3 adet`)
55. **Kış Nöbeti Paketi (`Halvar + Marcus`):** `Kömür` (`15 adet`) + `Demli Çay` (`5 adet`) + `Yün Battaniye` (`3 adet`) + `Tamir Kiti` (`1 adet`)
56. **Arşiv & Tarih Koruma Paketi (`Defne + Zarek`):** `Fosil Parçası` (`3 adet`) + `Arşiv Mühür Kutusu` (`1 adet`) + `Fosforlu Liken` (`5 adet`)

### F. Acil & Sürpriz Özel Talepler (8 Şablon)
57. **Kaptanın Kamarası Sürprizi (`Usta Veysel`):** `Müzik Kutusu` veya `Rüzgâr Çanı` (`1 adet`) -> *Yüksek Moral*
58. **Kayıp Akvaryum Merakı (`Sira-Vel`):** `Küçük Göl Akvaryumu` (`1 adet`) + `Göl Balığı` (`3 adet`)
59. **Acil Yara Bakımı (`Dr. Lyris`):** `Pamuk & Keten` (`4 adet`) + `Şifalı Mantar` (`3 adet`) + `Bal` (`2 adet`)
60. **Orin'in Acil Siparişi (`Tüccar Mateo`):** Rastgele 2 çeşit günlük imalat (`3–6 adet`) -> *Garanti `1x Takas Kuponu`*
61. **Evcil Xeno-Hayvan Bakımı (`Sorya / Çocuklar`):** `Balık` (`4 adet`) + `Tatlı Yıldız Kökü` (`4 adet`) + `Bitkisel Lif` (`5 adet`)
62. **Brom'un Özel Dövüm İsteği (`Brom`):** `Gümüş Tozu` (`3 adet`) + `Demir` (`10 adet`) + `Kömür` (`10 adet`)
63. **Nerissa'nın Abis Testi (`Dr. Nerissa`):** `Deniz Tuzu` (`6 adet`) + `Kalın Cam` (`3 adet`) + `Şifalı Mantar` (`4 adet`)
64. **Evlilik Hazırlığı Dedikodusu (`Julian` — Çiftler İçin):** `Dünya Düğün Yüzüğü` veya `Altı Yıldız Bağ Tılsımı` (`1 adet`) + `Peynirli Börek` (`3 adet`) *(İki NPC evlenmek üzereyken nadir çıkar)*
65. **Gece Nöbeti Kahvesi (`Kaelon / Marcus`):** `Kavrulmuş Nöro-Kahve` (`2–4 adet`) + `Kurutulmuş Mevsim Meyvesi` (`3–6 adet`)
66. **Hamam ve Temizlik Günü (`Sira-Vel / Dr. Lyris`):** `Doğal Koloni Sabunu` (`3–6 adet`) + `Hamam Aroma Yağı` (`1–2 adet`)
67. **Okul Şenliği Oyuncakları (`Usta Veysel / Defne`):** `Ahşap Çocuk Oyuncağı / Topaç` (`2–5 adet`) + `Bal` (`2–4 adet`)
68. **Özel Kıyı Ziyafeti (`Sorya`):** `Kristal Kabuklu Yengeç` (`2–4 adet`) + `Termal Yılan Balığı` (`2–3 adet`) + `Baharat & Tuz Karışımı` (`2 adet`)
69. **Yeni İzci Teçhizatı (`Zarek / Pilot Elara`):** `Dokuma Saha Çantası` (`1–2 adet`) + `Sesli Kristal Pusula` (`1 adet`)
70. **Kış Erzak Takviyesi (`Sorya / Mateo`):** `Gümüş Göl Sazanı` (`4–8 adet`) + `Baharat & Tuz Karışımı` (`2–4 adet`) + `Taş Fırın Ekmeği` (`4 adet`)

---

## 4. Mevcut Sistemlerle Bağ
- **Ticaret Adası Dengesi (`Paket 4`):** İstekler oyuncudan uzay gemisi parçası veya 20 gezegenin ana hikâye numunelerini istemez; yalnızca koloni içi ekonomi ve sosyal yaşamı döndürür.
- **Karakter Etkileşimi (`Paket 8`):** Bir yerleşimcinin kendi açtığı talebi tamamlamak o günkü günlük sohbetten bağımsız olarak ek **`+15 .. +35` İlişki Puanı** verir.

## 5. Sesle Oynanış (TalkBack / VoiceOver)
- **Eksik Malzeme Özeti:** Her talep kartında TalkBack doğrudan şu sırayla okur:
  1. `İsteyen ve Başlık` (ör. *Kaptan Marcus — Karakol İkmal Paketi*)
  2. `Gerekenler ve Elindeki Stok` (ör. *10 Pişmiş Tuğla [Elinde: 12 — Tamam], 8 Demir [Elinde: 5 — 3 Eksik]*)
  3. `Ödül` (ör. *650 GK, +25 Marcus Güveni*)
- **Tek Dokunuşla Teslim:** Tüm parçalar tamamsa tek düğmeyle **"Tümünü Teslim Et"** çalışır; parça parça teslimat gerektirmez.
