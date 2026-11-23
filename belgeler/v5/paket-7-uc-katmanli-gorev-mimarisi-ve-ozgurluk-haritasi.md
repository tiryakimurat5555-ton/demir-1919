# Paket 7: Üç Katmanlı Görev Mimarisi, Bağımlılık Ağacı ve Özgürlük Haritası

> **Geliştirici Yapay Zekâya Entegrasyon Notu:**
> Bu belgedeki görevler, mevcut `görevler.txt` sistemini (8 Yerel Operasyon, 9 Yüzey Bölgesi, Aşama 1–4, Tonoflenya ve 20 Dış Gezegen) **bozmaz ve yerine geçmez**. `ANA-01..20` satırları mevcut ana akıştaki köprü/çapa noktalarını temsil eder. Geliştirici, burada hazırlanan `YER` ve `YAN` görevlerinden mantıklı olanları mevcut görev sisteminin aralarına, uygun sıra ve ön şartlarla paralel kollar olarak yerleştirip entegre etmelidir.

## 1. Amaç
Bu belge, oyundaki tüm ilerleyişi rastgelelikten çıkarıp birbirini besleyen ama oyuncuyu asla tek bir yola hapsetmeyen 3 katmanlı bir görev mimarisine oturtur:
1. Ana Görevler (`ANA`): Gezegenin ana hikâyesi, komuta/sanayi omurgası, uzay/Tonoflenya/gezegenler arası geçişler ve hayatta kalma krizleri (`görevler.txt` omurgası korunur).
2. Yerleşim Görevleri (`YER`): Koloniyi yaşanabilir kılan `Yerleşim` sekmesi binaları, maden katları (Kat 1–40), İç Deniz Kıyısı, karakollar, günlük imalat zincirleri, arşiv setleri ve kara araçlarının saha entegrasyonu.
3. Yan Görevler ve Sosyal Etkileşimler (`YAN`): 16 yerleşimcinin 3 aşamalı (`K1–K3`) kişisel hikâye zincirleri, evlilik/aile/çocuk dönüm noktaları, Tüccar Kaptan Orin, İlan Panosu siparişleri, 6 Festival ve hobi/ustalık hedefleri.

Temel Tasarım İlkesi — "Şunu Yaparsam Bu Olur" Şeffaflığı:
Oyuncu Görev Terminali'nde kilitli veya açık her göreve baktığında:
- Ön Şartını,
- Tamamlandığında Açacağı Somut İçeriği (yeni mekân, yeni bina, yeni araç kullanımı, yeni karakter veya hikâye tetikleyicisi),
- Bekletilebilirlik Durumunu (bunu şimdi yapmayıp başka kola geçersem koloni hayatım durur mu?)
önceden görür. Böylece oyuncu kendi hızını ve sırasını bilinçli olarak seçer.

---

## 2. Mekânlar ve Görev Terminali Yapısı

### 2.1. Merkez Terminal -> `Görevler` Ekranı (3 Sekme + Öngörü Kartı)
Mevcut `Görevler` ekranı 3 ana sekmeye ayrılır:
1. `Ana Görevler` Sekmesi: Oyunun ana hikâye ve teknoloji evreleri (`ANA-01` – `ANA-20`).
2. `Yerleşim Görevleri` Sekmesi: Alt filtreler içerir:
   - Koloni İnşa & Sosyal Binalar
   - Maden & Yeraltı Karakolları
   - İç Deniz Kıyısı & Doğal Kaynaklar
   - Günlük İmalat, Araçlar & Arşiv
3. `Yan Görevler` Sekmesi: Alt filtreler içerir:
   - Yerleşimci Hikâyeleri (K1–K3)
   - Aile, Nesil & Kültür (Festivaller)
   - Ticaret, İlan Panosu & Hobi Ustalığı

### 2.2. Her Görev Kartının Standart 5 Alanı
1. Görev Kodu ve Adı: Örn. `[YER-08] Bakır Çanı ve İlk Karakol`
2. Ön Şartlar (Gerekenler): Örn. `ANA-02 + YER-05 + Demir Kazma (Seviye 1)`
3. Açacağı Yeni Şeyler ("Bunu Yaparsan Ne Olur?"): Örn. `Maden Kat 10 Asansörü açılır, Kat 11–20 erişime girer, Kaptan Marcus karakol devriyesine başlar.`
4. Etki / Risk Uyarısı (Varsa): Örn. `DİKKAT: Bu görevi tamamlarsan Kat 11–20'daki Zehirli Spor Tehlikesi başlar. Hazır değilsen bekletip Kat 1–10'te malzeme biriktirebilirsin.`
5. Durum: `Kilitli (Ön Şart Eksik)` / `Başlatılabilir (Hazır)` / `Aktif (İlerleme %X)` / `Tamamlandı` / `Ertelendi (Oyuncu Seçimi)`.

---

## 3. Görev Kategorileri ve Tam Görev Ağacı (115 Bağlantılı Görev)

Aşağıdaki sistem 5 Evre halinde düzenlenmiştir. Evreler sert duvar değildir; aynı anda birden fazla koldan ilerlenebilir. Önemli olan bir görevin kendi ön şartını tamamlamış olmasıdır.

---

### EVRE 1: İniş, İlk Nefes ve Koloni Çekirdeği (Gün 1–10)
Amaç: Mevcut ana kurulumun ardından yerleşim, ilk maden/kıyı erişimi ve ilk 5 çekirdek karakterle tanışma.

#### A. Ana Görevler (Evre 1)
| Kod | Görev Adı | Ön Şart | Açacağı İçerik / Sonuç | Özgürlük / Bekletme |
|---|---|---|---|---|
| ANA-01 | Sağ Kalanların Sayımı ve İlk Enerji | Başlangıç | `Merkez Terminal`, `Sera` ve `Termal Vaha` temel erişimi; 5 çekirdek yerleşimci aktif olur. | Zorunlu başlangıç adımı. |
| ANA-02 | Koloni Savunma Çemberi ve İlk Çıkarım | `ANA-01` | `İnşaat` sekmesi temel sanayi binaları; `YER-01` (Yerleşim sekmesi) ve `YAN-01..05` açılır. | Tamamlandıktan sonra `ANA-03` bekletilebilir. |
| ANA-03 | Atmosfer Tarayıcısı ve Kısa Menzil Radyo | `ANA-02` | Uydu sinyali yakalanır -> `YAN-06` (Kaptan Marcus sinyali) ve `ANA-04` tetiklenir. | Maden veya köy işleri için istenildiği kadar ertelenebilir. |
| ANA-04 | Vanguard-01 Enkaz Koordinatları | `ANA-03` | Enkaz kurtarma rotası açılır -> Evre 2'ye (`ANA-05`) köprü kurulur. | Oyuncu hazır hissetmeden (`Çöl Tilkisi` / ekipman yapmadan) çıkmayabilir. |

#### B. Yerleşim Görevleri (Evre 1)
| Kod | Görev Adı | Ön Şart | Açacağı İçerik / Sonuç | Özgürlük / Bekletme |
|---|---|---|---|---|
| YER-01 | Yerleşim Sekmesini Aç | `ANA-02` | `Merkez Terminal -> Yerleşim` sekmesi aktif olur; ilk `Ev` planı açılır. | İsteğe bağlı sırayla ilerlenir. |
| YER-02 | Kaptanın Kamarası ve Vardiya Düzeni | `YER-01` | `Kaptanın Kamarası` ve `10/20/30 dk Vardiya` ayarı açılır. | İstediğin zaman ayarla. |
| YER-03 | İlk Konutlar ve Yatak Kapasitesi | `YER-01` | 2 adet `Tekli/Çiftli Ev` kurulur; yeni göçmen kabulü (`Nüfus Sınırı +4`) açılır. | Ev yapılmazsa göçmen görevleri bekler, oyun durmaz. |
| YER-04 | Basit Alet Tezgâhı | `ANA-02` | `Taş/Demir Kazma T1`, `Taş Balta T1`, `Basit Olta T1` üretimi açılır. | Maden/kıyı öncesi şarttır. |
| YER-05 | Maden Girişinin Temizlenmesi | `YER-04` (Kazma T1) | Yürünebilir Maden (Kat 1–10) açılır (`Bakır`, `Kömür`, `Kil`, `Kuvars`). | Maden istemeyen kıyıya (`YER-06`) gidebilir. |
| YER-06 | İç Deniz Kıyı Patikası | `YER-04` (Balta T1 + Olta T1) | İç Deniz ve Kıyı Korusu açılır (`Odun`, `Lif`, `Tuz`, `Göl Balığı`). | Kıyı veya maden tamamen paraleldir. |
| YER-07 | Dünya Usulü Aşhane | `YER-01` + `YER-06` | `Aşhane` açılır; günlük yemek pişirme ve stamina/moral buffları başlar. | İsteğe bağlı; açlık cezası yoktur. |
| YER-08 | Çamurdan Tuğlaya: İlk Fırın | `YER-05` + `YER-06` | `Tuğla ve Seramik Fırını` tarifleri açılır (ev ve tapınak yapımı hızlanır). | Paralel üretim kolu. |
| YER-09 | İlan Panosu Direğini Dik | `YER-02` | `İlan Panosu` aktif olur (günlük/haftalık 3 sipariş kapasitesi). | Ekonomik özgürlük sağlar. |
| YER-10 | Koloni Tezgâhı ve İlk Satış | `YER-09` | `Koloni Tezgâhı` açılır (günlük GK sınırı içinde yerel satış). | İstediğin zaman kullan. |

#### C. Yan Görevler & Karakterler (Evre 1 — Çekirdek 5'li K1 + İlk Sosyal Bağlar)
| Kod | Görev Adı | Ön Şart | Açacağı İçerik / Sonuç | Özgürlük / Bekletme |
|---|---|---|---|---|
| YAN-01 | Sorya Val-Nira (K1): Toprağın Nabzı | `ANA-02` | `Sorya` Güven Kademesi 1; Termal Vaha verimi +%10, ilk Malken tohum hediyesi. | Tamamen opsiyonel. |
| YAN-02 | Kaelon Vex-Tar (K1): Sessiz Perçin | `ANA-02` | `Kaelon` Güven Kademesi 1; alet tamir maliyeti -%15. | Tamamen opsiyonel. |
| YAN-03 | Dr. Lyris Mar-Axira (K1): Işık ve Nabız | `ANA-02` | `Dr. Lyris` Güven Kademesi 1; Revir/iyileşme süresi -%15. | Tamamen opsiyonel. |
| YAN-04 | Zarek Sol-Zhaor (K1): Altı Yıldızın Kaydı | `ANA-02` | `Zarek` Güven Kademesi 1; `Koloni Arşivi` fikri ve ilk arşiv ipucu açılır. | Tamamen opsiyonel. |
| YAN-05 | Usta Veysel (K1): Çayın Demini Bulmak | `YER-07` | `Usta Veysel` Güven Kademesi 1; Dünya Usulü Çay/ekmek tarifi açılır. | Tamamen opsiyonel. |
| YAN-06 | Enkazdan Gelen Ses (Kaptan Marcus) | `ANA-03` + `YER-03` | `Kaptan Marcus` koloniye katılır (6. yerleşimci). | Bekletilirse Marcus enkazda bekler. |
| YAN-07 | İlk Olta, İlk Av | `YER-06` | `Gölet Balıkçılığı` mini oyunu kalıcı olarak ustalık puanı vermeye başlar. | Hobi kolu. |
| YAN-08 | İlan Panosunda İlk Gün | `YER-09` | 3 adet `İlan Panosu` siparişi tamamla -> Tüccar Gemisi sinyali ipucu açılır. | İsteğe bağlı. |

---

### EVRE 2: Derinleşme, Ticaret Gemisi ve Yeni Göçmenler (Gün 11–25)
Amaç: Ticaret Adası dengesi, ilk yeraltı/kıyı karakolları, kara araçlarının saha kullanımı ve 6 göçmen/kurtarma karakterinin gelişi.

#### A. Ana Görevler (Evre 2)
| Kod | Görev Adı | Ön Şart | Açacağı İçerik / Sonuç | Özgürlük / Bekletme |
|---|---|---|---|---|
| ANA-05 | Vanguard-01 Kara Kutusunu Çıkar | `ANA-04` + (`Çöl Tilkisi` veya `YER-05`) | Enkazdan eski Dünya teknolojisi ve `Öğretmen Defne` + `Mimar Selim` koordinatları çıkar. | Bekletilirse mevcut koloni işleyişi aksamaz. |
| ANA-06 | Yörünge İniş Pisti Onarımı | `ANA-05` + `YER-09` | Haftalık Tüccar Gemisi (Kaptan Orin) her 7 günde bir iniş yapmaya başlar. | İniş pisti açılana kadar tüccar gelmez; oyuncu hazır olunca açar. |
| ANA-07 | Uzun Menzilli Radyo Kulesi | `ANA-06` | Dış gezegen ön tarama protokolü açılır (mevcut gezegen görevlerine köprü). | Uzay görevlerine çıkmak istemeyen burada durup koloni kurabilir. |
| ANA-08 | İlk Gezegen Savunma Tatbikatı | `ANA-07` + `YAN-06` | Döngüsel baskın azaltma mekaniği tam entegre olur; Evre 3 ana görevleri açılır. | Oyuncu ekipmanı güçlenene kadar erteleyebilir. |

#### B. Yerleşim Görevleri (Evre 2)
| Kod | Görev Adı | Ön Şart | Açacağı İçerik / Sonuç | Özgürlük / Bekletme |
|---|---|---|---|---|
| YER-11 | Kat 10 Asansörü ve İlk Yeraltı Karakolu | `YER-05` + `YAN-06` | Maden Kat 10 Karakolu kurulur (%70 pusu düşüşü); Kat 11–20 (Bakır & Şifalı Mantar) açılır. | Uyarı: Kat 6+ orta seviye düşman içerir; hazır değilse Kat 1–10'te kalınabilir. |
| YER-12 | Kıyı Kampı Karakolu | `YER-06` + `YER-08` | İç Deniz Kıyı Kampı kurulur; kıyı pusu riski %70 düşer, kereste/tuz otomatik desteği başlar. | Paralel güvenlik adımı. |
| YER-13 | Koloni Arşivi Binası | `YER-01` + `YAN-04` | Koloni Arşivi (4 bağış seti: Maden, Deniz/Toprak, Aşhane/İmalat, Tarih) açılır. | Koleksiyon & kalıcı ödül kolu. |
| YER-14 | Axelum Tapınağı / Huzur Mabedi | `YER-08` + `YER-03` | `Axelum Tapınağı` inşa edilir; Malken festivalleri ve ruhsal moral bonusu açılır. | Sosyal bina kolu. |
| YER-15 | Takas Meydanı ve Tüccar İskelesi | `ANA-06` | Tüccar Kaptan Orin'e özel toplu satış/takas penceresi ve fiyat uyarı çanı açılır. | Ticaret kolu. |
| YER-16 | Çöl Tilkisi Saha Donanımı | `YER-11` veya `YER-12` | `Çöl Tilkisi` aracına madenci römorku/kıyı sepeti takılır (taşıma kapasitesi +50%). | Araç entegrasyonu. |
| YER-17 | Demir Atölyesi ve T2 Aletler | `YER-11` (Kat 11–20 cevherleri) | `Çelik Kazma T2`, `Çelik Balta T2`, `Güçlü Olta T2` üretimi açılır. | Güçlenme adımı. |
| YER-18 | Taverna: Akşamların Kalbi | `YER-07` + `YER-03` | `Taverna` açılır; akşam sosyalleşmesi, dedikodu/ipucu ve Zar/Bahis Mini Oyunu açılır. | Sosyal & mini oyun kolu. |
| YER-19 | Çan ve Tütsü Atölyesi | `YER-14` + `YER-08` | `Çan Döküm Mini Oyunu` ve günlük tütsü/çan imalatı açılır. | Zanaat kolu. |
| YER-20 | Sera ve Vaha Genişletme (Günlük Mahsul) | `YER-07` + `YER-13` | Mevcut `Sera` ve `Vaha`ya `Pamuk/Keten`, `Arpa`, `Işık Otu`, `Kristal Çiçek` eklenir (yeni tarla yok). | Çiftçilik + dokuma/aşhane zinciri. |

#### C. Yan Görevler & Karakterler (Evre 2 — Yeni Göçmenler + K1/K2 Hikâyeler)
| Kod | Görev Adı | Ön Şart | Açacağı İçerik / Sonuç | Özgürlük / Bekletme |
|---|---|---|---|---|
| YAN-09 | Sığınaktaki Öğretmen (Öğretmen Defne) | `ANA-05` + `YER-03` | `Öğretmen Defne` koloniye katılır (7. yerleşimci); `Okul` binası planı açılır. | Bekletilebilir. |
| YAN-10 | Yıkık Kubbeden Çıkan Mimar (Selim) | `ANA-05` + `YER-08` | `Mimar Selim` koloniye katılır (8. yerleşimci); ev geliştirme maliyeti -%15. | Bekletilebilir. |
| YAN-11 | Vaha Kenarındaki Çiftçi (Elara) | `YER-20` + `YER-03` | `Elara` koloniye katılır (9. yerleşimci); Sera/Vaha tohum verimi artar. | Bekletilebilir. |
| YAN-12 | Kaptan Orin ile İlk Pazarlık | `ANA-06` | Tüccar Orin'den ilk indirimli (%70) alım veya kârlı (%140) satış -> Orin sadakat puanı başlar. | Ticaret yan zinciri. |
| YAN-13 | Sorya Val-Nira (K2): Vaha'nın Kökleri | `YAN-01` + `YER-20` | `Sorya` Güven Kademesi 2; nadir Malken bitkisi reçetesi açılır. | İsteğe bağlı. |
| YAN-14 | Kaelon Vex-Tar (K2): Kardeşimin Çekici | `YAN-02` + `YER-17` | `Kaelon` Güven Kademesi 2; T2 araçlarda kritik üretim şansı +%15. | İsteğe bağlı. |
| YAN-15 | Dr. Lyris Mar-Axira (K2): Eski Salgın Günlüğü | `YAN-03` + `YER-11` | `Dr. Lyris` Güven Kademesi 2; Kat 11–20 zehir/spor direnci iksiri açılır. | Maden güvenliği için çok faydalı ama zorunlu değil. |
| YAN-16 | Zarek Sol-Zhaor (K2): Unutulmuş Tablet | `YAN-04` + `YER-13` | `Zarek` Güven Kademesi 2; Arşiv'e `Tarih Seti` bağışı açılır. | İsteğe bağlı. |
| YAN-17 | Usta Veysel (K2): Eski Dünya'nın Ekmeği | `YAN-05` + `YER-20` | `Usta Veysel` Güven Kademesi 2; `Arpa`dan özel ekmek/içecek tarifleri açılır. | İsteğe bağlı. |
| YAN-18 | Kaptan Marcus (K1): Nöbet Defteri | `YAN-06` + `YER-11` | `Marcus` Güven Kademesi 1; karakol pusu azaltma bonusu +%5 artar. | İsteğe bağlı. |
| YAN-19 | İlk Festival Hazırlığı (Malken veya Dünya) | `YER-14` veya `YER-18` | Oyuncu dilediği bir festivali tetikler -> 5 gün bekleme ve döngü başlar. | Festival tamamen oyuncu isteğiyle başlatılır. |
| YAN-20 | Dokuma Tezgâhı ve İlk Kıyafet | `YER-20` (`Pamuk/Keten`) | Günlük kıyafet/kumaş üretimi başlar; yerleşimci hediye çeşitliliği artar. | İsteğe bağlı. |

---

### EVRE 3: Topluluk, Aileler, Derin Maden ve Ağır Araçlar (Gün 26–50)
Amaç: Koloninin kendi kendine üreyip büyümesi (evlilik/çocuk), Kat 20–15 madenleri, ağır kara araçları (`Mammoth`, `Demir Kervan`), Hamam/Okul/Pazar.

#### A. Ana Görevler (Evre 3)
| Kod | Görev Adı | Ön Şart | Açacağı İçerik / Sonuç | Özgürlük / Bekletme |
|---|---|---|---|---|
| ANA-09 | İlk Dış Gezegen Keşif Uçuşu | `ANA-08` | Gezegen 01–05 hattı açılır (`görevler.txt` dış gezegen akışı, kuralları bozulmadan). | Kolonide kalıp Evre 3 yerleşimlerini bitirmek tamamen serbesttir. |
| ANA-10 | Yörünge Ticaret ve Siyaset Köprüsü | `ANA-09` + `ANA-06` | `Evren İtibarı` ve gemi yükseltme ana hattı derinleşir. | İsteğe bağlı tempoda ilerler. |
| ANA-11 | Gezegen Çekirdek Sismik Taraması | `ANA-09` + `YER-21` | Maden Kat 21–30'in yeraltı fay hattı haritalanır -> `YER-24` kolaylaşır. | Bilimsel ön hazırlık. |
| ANA-12 | Koloni Meclisi ve Ortak Yemin | `ANA-10` + `YER-22` | Dünya + Malken birleşik koloni kimliği resmileşir; Evre 4 ana görevleri açılır. | Hikâye dönüm noktası. |

#### B. Yerleşim Görevleri (Evre 3)
| Kod | Görev Adı | Ön Şart | Açacağı İçerik / Sonuç | Özgürlük / Bekletme |
|---|---|---|---|---|
| YER-21 | Kat 20 Asansörü ve İkinci Karakol | `YER-11` + `YER-17` | Maden Kat 20 Karakolu kurulur; Kat 21–30 (Mithril/Kristal Damarları) açılır. | Uyarı: Güçlü yeraltı düşmanları başlar; önce `Mammoth` veya T2 zırh önerilir. |
| YER-22 | Okul ve Gençlik Çıraklık Binası | `YAN-09` + `YER-08` | `Okul` binası açılır; doğacak çocukların `Öğrenci (28g) -> Genç Çırak (42g+)` büyüme hattı aktifleşir. | Aile/nesil sisteminin temel şartıdır. |
| YER-23 | Termal Hamam ve Dinlenme Konağı | `YER-14` + `YER-08` | `Termal Hamam` açılır; ağır yaralanma/yorgunluk tek ziyarette sıfırlanır. | Yaşam kalitesi binası. |
| YER-24 | Mammoth ve Demir Kervan Saha Entegrasyonu | `YER-21` + (`Mammoth` veya `Demir Kervan`) | Büyük kara araçları maden/kıyı nakliyesine girer (kapasite x3, mobil koruma). | Mevcut araçların koloniye bağlanması. |
| YER-25 | Mimarlar ve Aile Konutları (Geniş Evler) | `YAN-10` + `YER-22` | `Aile Evi` yükseltmesi açılır -> Evlilik ve Çocuk Doğumu için fiziksel şart sağlanır. | Nüfus artışı kolu. |
| YER-26 | Açık Hava Pazarı (Haftalık Panayır) | `YER-15` + `YER-18` | Settlerların kendi ürettiği küçük eşyaları takas ettiği canlı sesli pazar alanı açılır. | Sosyal ekonomi. |
| YER-27 | Hayvan Barınağı ve Xeno-Bakım | `YAN-11` + `YER-06` | `Xeno-Hayvan Bakımı Mini Oyunu` ve günlük süt/yün/yumurta üretimi açılır. | Hobi & günlük ürün kolu. |
| YER-28 | T3 Ustalık Aletleri Tezgâhı | `YER-21` (Kat 21–30 kristalleri) | `Kristal Kazma T3`, `Kristal Balta T3`, `Usta Olta T3` üretimi açılır. | Son katlar öncesi güçlenme. |
| YER-29 | Yeraltı Işıklandırma ve Ses İşaretçileri | `YER-21` + `YER-20` (`Işık Otu`) | Maden Kat 1–30 arası kör erişilebilirlik yön bulma bonusu (+%25 hız). | Erişilebilirlik & konfor. |
| YER-30 | Koloni Arşivi: İlk 2 Seti Tamamla | `YER-13` + `YER-21` | Arşiv'in 2 seti tamamlanır -> Koloni çapında kalıcı +%10 üretim/ticaret bonusu. | Koleksiyon hedefi. |

#### C. Yan Görevler & Karakterler (Evre 3 — Kalan Göçmenler, K2/K3 Hikâyeler, Evlilik)
| Kod | Görev Adı | Ön Şart | Açacağı İçerik / Sonuç | Özgürlük / Bekletme |
|---|---|---|---|---|
| YAN-21 | Kıyı Mağarasındaki Şifacı (Nadia) | `YER-12` + `YER-03` | `Nadia` koloniye katılır (10. yerleşimci); bitkisel ilaç ve çay çeşitleri açılır. | Bekletilebilir. |
| YAN-22 | Gölgedeki Zanaatkâr (Tarik) | `YER-18` + `YER-17` | `Tarik` koloniye katılır (11. yerleşimci); özel aksesuar ve çan tasarımları açılır. | Bekletilebilir. |
| YAN-23 | Gezgin Ozan / Ses Ustası (Lira) | `YER-26` + `YER-03` | `Lira` koloniye katılır (12. yerleşimci); festivallerde karnaval ses/müzik çeşitliliği artar. | Bekletilebilir. |
| YAN-24 | İlk Düğün Çanı (Evlilik Kilidi Açma) | `YER-25` + Herhangi bir yerleşimcide `Güven 3` | Oyuncu veya iki NPC arasında Evlilik sistemi aktif olur. | Evlilik tamamen oyuncunun tercihine bağlıdır. |
| YAN-25 | Yeni Bir Ses: Koloninin İlk Çocuğu | `YAN-24` + `YER-22` | `Bebek (14g) -> Öğrenci (28g) -> Genç Çırak (42g+)` büyüme döngüsü başlar. | Nesil devamlılığı kolu. |
| YAN-26 | Öğretmen Defne (K1): Boş Defterler | `YAN-09` + `YER-22` | `Defne` Güven Kademesi 1; Okul eğitim hızı +%15. | İsteğe bağlı. |
| YAN-27 | Mimar Selim (K1): Rüzgâra Dayanıklı Duvar | `YAN-10` + `YER-25` | `Selim` Güven Kademesi 1; tüm Yerleşim binaları taş/tuğla maliyeti -%10. | İsteğe bağlı. |
| YAN-28 | Elara (K1): İlk Hasadın Tadı | `YAN-11` + `YER-20` | `Elara` Güven Kademesi 1; Sera'da çift hasat şansı +%10. | İsteğe bağlı. |
| YAN-29 | Kaptan Marcus (K2): Karanlıkta Nöbet | `YAN-18` + `YER-21` | `Marcus` Güven Kademesi 2; Kat 20 karakolu ek savunma kazanır. | İsteğe bağlı. |
| YAN-30 | Sorya Val-Nira (K3): Toprağın Kalbi | `YAN-13` + `YER-23` | `Sorya` Final Hikâyesi (K3); kalıcı Vaha mucizesi ve özel eşya. | Karakter finali. |
| YAN-31 | Kaelon Vex-Tar (K3): Ateş ve İsim | `YAN-14` + `YER-28` | `Kaelon` Final Hikâyesi (K3); ustalık aletlerine özel imza bonusu. | Karakter finali. |
| YAN-32 | Dr. Lyris Mar-Axira (K3): İki Dünyanın Şifası | `YAN-15` + `YAN-21` | `Dr. Lyris` Final Hikâyesi (K3); koloni genelinde hastalık/zehir direnci. | Karakter finali. |
| YAN-33 | Zarek Sol-Zhaor (K3): Altı Yıldızın Sırrı | `YAN-16` + `YER-30` | `Zarek` Final Hikâyesi (K3); Büyük Festival için özel ilahi/kayıt açılır. | Karakter finali. |
| YAN-34 | Usta Veysel (K3): Ocağın Son Sırrı | `YAN-17` + `YER-26` | `Usta Veysel` Final Hikâyesi (K3); efsanevi şölen yemeği tarifi açılır. | Karakter finali. |
| YAN-35 | Altı Yıldızın Büyük Hizalanması (Büyük Festival) | `YER-14` + `YAN-33` (veya yılın 4. mevsimi) | Oyunun en büyük kültürel kutlaması; tüm kolonide yüksek moral ve nadir takaslar. | Oyuncu hazır olunca tetikler. |

---

### EVRE 4: Derin Çekirdek, Gezegenler Arası Bağ ve Tonoflenya Köprüsü (Gün 51–85)
Amaç: Maden Kat 31–40, kalan 4 özel/Tonoflenya-gezegen karakterinin (`13–16`) koloniye katılması, `Atmosphere-X` / `Akrep` saha kullanımı.

#### A. Ana Görevler (Evre 4)
| Kod | Görev Adı | Ön Şart | Açacağı İçerik / Sonuç | Özgürlük / Bekletme |
|---|---|---|---|---|
| ANA-13 | Orta Hat Gezegenleri ve YGK Akademisi Köprüsü | `ANA-12` | Gezegen 06–12 ve YGK Akademisi etkileşimleri ana hatta bağlanır. | Kendi hızında ilerlenir. |
| ANA-14 | Büyük İttifak ve Evren İtibarı Sınavı | `ANA-13` | `Evren İtibarı` yüksek kademe kapıları ve Tonoflenya ön şartları açılır. | Tonoflenya'ya gitmek istemeyen koloniye dönebilir. |
| ANA-15 | Tonoflenya'ya İlk Yolculuk | `ANA-14` | Tonoflenya bölgesi açılır -> Evre 4 özel karakterleri (`YAN-36..39`) tetiklenir. | Mevcut Tonoflenya kuralları aynen geçerlidir. |
| ANA-16 | Çekirdek Enerji Dengelemesi | `ANA-15` + `YER-31` | Gezegenin yeraltı enerji akışı ile uzay/koloni reaktörü senkronize olur; Evre 5 açılır. | Final öncesi ana adım. |

#### B. Yerleşim Görevleri (Evre 4)
| Kod | Görev Adı | Ön Şart | Açacağı İçerik / Sonuç | Özgürlük / Bekletme |
|---|---|---|---|---|
| YER-31 | Kat 30 Asansörü ve Derin Karakol | `YER-21` + `YER-28` | Maden Kat 30 Karakolu kurulur; Kat 31–40 (Çekirdek Katları) açılır. | Uyarı: En tehlikeli katlar; `Akrep` veya T3 ekipman önerilir. |
| YER-32 | Atmosphere-X ve Akrep Saha Entegrasyonu | `YER-31` + (`Atmosphere-X` veya `Akrep`) | Keşif/zırhlı araçlar Kat 31–40 ve dış kıyı tehlikelerine karşı aktif kalkan sağlar. | Mevcut araçların zirve kullanımı. |
| YER-33 | Kültürlerarası Şölen Salonu | `YER-26` + `YER-23` | Tüm 16 yerleşimcinin aynı anda toplanabildiği büyük etkinlik alanı açılır. | Sosyal zirve binası. |
| YER-34 | Koloni Arşivi: Tüm 4 Seti Tamamla | `YER-30` + `YER-31` | Koloni Arşivi %100 -> Kalıcı efsanevi madalya ve tüm üretimlerde +%15 verim. | Koleksiyon finali. |
| YER-35 | İlk Genç Çırak'ın Mezuniyeti | `YER-22` + `YAN-25` (42+ gün büyüme) | Kolonide doğan ilk çocuk `Genç Çırak` olarak gerçek bir zanaatta çalışmaya başlar. | Nesil sisteminin meyvesi. |
| YER-36 | Gelişmiş Tıbbi & Botanik Laboratuvarı | `YER-20` + `YAN-32` | Nadir gezegen bitkileri ile Malken otları birleştirilir (Tüccar'da satılamayan özgün ilaçlar). | Ticaret Adası dengesi korunur. |

#### C. Yan Görevler & Karakterler (Evre 4 — 13–16. Yerleşimciler + K2/K3 Hikâyeler)
| Kod | Görev Adı | Ön Şart | Açacağı İçerik / Sonuç | Özgürlük / Bekletme |
|---|---|---|---|---|
| YAN-36 | Eski İstasyon Mühendisi (Kael'en-2 / Tina Bağlantılı) | `ANA-15` + `YER-03` | 13. yerleşimci koloniye katılır; ileri otomasyon/onarım diyalogları açılır. | Bekletilebilir. |
| YAN-37 | Tonoflenya Sürgünü Bilgin (Vaelis) | `ANA-15` + `YER-13` | 14. yerleşimci koloniye katılır; Tonoflenya kültürü ve arşiv bilgileri gelir. | Bekletilebilir. |
| YAN-38 | Gezegen Korucusu (Ayla) | `ANA-13` + `YER-12` | 15. yerleşimci koloniye katılır; Xeno-hayvan ve kıyı koruma bonusu. | Bekletilebilir. |
| YAN-39 | Yıldız Haritacısı (Ozan-7 / Ronin) | `ANA-14` + `YER-33` | 16. yerleşimci koloniye katılır; tüm yerleşimci kadrosu tamamlanır. | Bekletilebilir. |
| YAN-40 | Öğretmen Defne (K2–K3): İlk Mezunlar | `YAN-26` + `YER-35` | `Defne` Final Hikâyesi; Okul çocukları +1 ekstra beceri kazanır. | Karakter finali. |
| YAN-41 | Mimar Selim (K2–K3): Yaşayan Şehir | `YAN-27` + `YER-33` | `Selim` Final Hikâyesi; tüm konutlar en yüksek konfor seviyesine çıkar. | Karakter finali. |
| YAN-42 | Elara (K2–K3): Dört Mevsimin Tohumu | `YAN-28` + `YER-36` | `Elara` Final Hikâyesi; 4 yörünge mevsiminde de yetişen özel hibrit tohum. | Karakter finali. |
| YAN-43 | Kaptan Marcus (K3): Son Nöbet, İlk Barış | `YAN-29` + `YER-31` | `Marcus` Final Hikâyesi; tüm karakollarda nöbet verimi zirveye çıkar. | Karakter finali. |
| YAN-44 | Nadia (K1–K3): Kıyıların Şifası | `YAN-21` + `YER-36` | `Nadia` tam hikâye zinciri tamamlanır. | Karakter finali. |
| YAN-45 | Tarik (K1–K3): Sesin Madeni | `YAN-22` + `YER-31` | `Tarik` tam hikâye zinciri tamamlanır. | Karakter finali. |
| YAN-46 | Lira (K1–K3): Altı Mevsimin Şarkısı | `YAN-23` + `YER-33` | `Lira` tam hikâye zinciri tamamlanır. | Karakter finali. |
| YAN-47 | Kaptan Orin'in Gizli Rotası | `YAN-12` + `ANA-15` | Orin haftalık stokta 1 adet çok nadir dış diyar hatırası getirir (Ticaret dengesini bozmadan). | Ticaret finali. |

---

### EVRE 5: Çekirdeğin Sırrı, Kendi Kendine Yeten Koloni ve Ustalık (Gün 86+)
Amaç: Oyunun sonu gelmeden bitmeyen (Stardew-vari) huzurlu + derin koloni yaşamı ve ana hikâyenin büyük finali.

#### A. Ana Görevler (Evre 5)
| Kod | Görev Adı | Ön Şart | Açacağı İçerik / Sonuç | Özgürlük / Bekletme |
|---|---|---|---|---|
| ANA-17 | Dış Sınırların Ötesi (Gezegen 13–20 Hattı) | `ANA-16` | Son dış gezegenler ve büyük galaktik tehditler açılır (`görevler.txt`). | Oyuncu istediği zaman uzaya çıkar. |
| ANA-18 | Tonoflenya Büyük Meclisi | `ANA-15` + `ANA-17` | Galaktik diplomasi ve Tonoflenya ana dönüm noktası. | Kendi hızında. |
| ANA-19 | Çekirdek Muhafızı ve Son Savunma | `ANA-18` + `YER-31` | Ana hikâyenin büyük final krizi/savaşı tetiklenir. | Oyuncu tam hazır olmadan başlatmak zorunda değildir. |
| ANA-20 | Yeni Bir Çağ: Sonsuz Koloni | `ANA-19` | Ana hikâye zaferle biter; oyun Sonsuz Koloni (Sandbox/Nesil) modunda özgürce devam eder. | Ana hikâye bitse de koloni yaşamı bitmez. |

#### B. Yerleşim Görevleri (Evre 5)
| Kod | Görev Adı | Ön Şart | Açacağı İçerik / Sonuç | Özgürlük / Bekletme |
|---|---|---|---|---|
| YER-37 | Maden Kat 40: Çekirdek Odası | `YER-31` + `YER-32` | Madenin en alt katı (Kat 40) fethedilir; efsanevi çekirdek kristali ve anıt açılır. | Madencilik zirvesi. |
| YER-38 | Kendi Kendine Yeten Ekosistem Sertifikası | `YER-34` + `YER-35` | Koloni dışarıdan hiçbir temel kaynak almadan nesillerce yaşayabilir duruma gelir. | Koloni zirvesi. |
| YER-39 | Altın Aletler / Malken Çekirdek Aletleri | `YER-37` + `YER-28` | Tüm 5 alette `Seviye 3+ / Usta` kalıcı dayanıklılık ve ses efektleri. | Zanaat zirvesi. |
| YER-40 | Koloni Anıtı ve Nesil Kitabesi | `YER-38` + `ANA-20` | Doğan tüm çocukların ve kurucu 16 kişinin isimlerinin okunduğu sesli anıt. | Duygusal final. |

#### C. Yan Görevler & Ustalık (Evre 5 — Son 4 Karakter + 6 Hobi Zirvesi)
| Kod | Görev Adı | Ön Şart | Açacağı İçerik / Sonuç | Özgürlük / Bekletme |
|---|---|---|---|---|
| YAN-48 | 13. Yerleşimci (K1–K3): Sessiz Devreler | `YAN-36` + `YER-37` | 13. yerleşimcinin tam hikâye zinciri tamamlanır. | İsteğe bağlı. |
| YAN-49 | 14. Yerleşimci Vaelis (K1–K3): Sürgünün Defteri | `YAN-37` + `YER-34` | Vaelis'in tam hikâye zinciri tamamlanır. | İsteğe bağlı. |
| YAN-50 | 15. Yerleşimci Ayla (K1–K3): Vahşi Dostluk | `YAN-38` + `YER-27` | Ayla'nın tam hikâye zinciri tamamlanır. | İsteğe bağlı. |
| YAN-51 | 16. Yerleşimci Ozan-7 (K1–K3): Son Koordinat | `YAN-39` + `ANA-20` | 16. yerleşimcinin tam hikâye zinciri tamamlanır. | İsteğe bağlı. |
| YAN-52 | Usta Balıkçı ve Deniz Efsanesi | `YAN-07` + `YER-28` | İç Deniz'deki tüm nadir balıkları yakalama ustalığı. | Hobi ustalığı. |
| YAN-53 | Usta Aşçı: Dünya & Malken Sofrası | `YER-07` + `YAN-34` | Tüm aşhane tariflerini en az bir kez pişirme ustalığı. | Hobi ustalığı. |
| YAN-54 | Usta Madenci: Kat 40 Yankısı | `YER-37` | Maden tüm katlarını (1–20) eksiksiz tamamlama ustalığı. | Hobi ustalığı. |
| YAN-55 | 6 Festivalin Hamisi | `YER-35` | 4 Malken + 2 Dünya festivalinin tamamını en az bir kez kutlama başarısı. | Kültür ustalığı. |

---

## 4. Kurallar ve Sayılar (Kilitlenmeyi Önleyen Özgürlük Kuralları)

1. Sıfır Kilitlenme (Zero-Deadlock) Kuralı:
   - `ANA` görevlerini bekletmek asla `YER` binalarını, günlük hasadı, madeni, kıyıyı, evliliği veya festivalleri bozmaz.
   - `YAN` (karakter/hobi) görevlerini bekletmek asla `ANA` hikâyenin bitmesini engellemez (sadece opsiyonel ekstra güç/hikâye kaçırılır, geri dönüp her zaman yapılabilir).
   - Süreli görevlerde (ör. `İlan Panosu` siparişleri) başarısızlık ceza getirmez, sadece o sipariş yenisiyle değişir.

2. "Sonuç Önizleme" Kuralı (Bilinçli Erteleme):
   - Risk veya dünya değişimi getiren her görevde (`YER-11`, `YER-21`, `YER-31`, `ANA-06`, `ANA-19` vb.) görev kabul edilmeden önce kırmızı/net sesli bir Etki Uyarısı okunur:
     > "Bu görevi tamamlarsan Maden Kat 11–20 açılır ve yeraltı düşman riski başlar. İstersen şimdi kabul etmeyip Kat 1–10'te hazırlık yapabilirsin."

3. Paralel Kollar Kuralı:
   - Her evrede oyuncunun önünde en az 3–4 farklı serbest kol bulunur: Madencilik, Kıyı/Doğa, İmalat/Ticaret, Yerleşimci Hikâyeleri ve Ana Uzay/Koloni Görevi. Oyuncu dilediği koldan puan/kaynak toplayıp diğer kola geçebilir.

4. Toplam Görev Sayısı:
   - Ana Görevler: 20 (`ANA-01` – `ANA-20`)
   - Yerleşim Görevleri: 40 (`YER-01` – `YER-40`)
   - Yan Görevler & Sosyal Zincirler: 55 (`YAN-01` – `YAN-55`)
   - Toplam: 115 ana kodlu görev (Buna ek olarak sonsuz tekrarlanan `İlan Panosu` siparişleri ve `K1–K3` ara sohbet olaylarıyla pratikte 200+ oynanış adımı oluşur).

---

## 5. Mevcut Sistemlerle Bağ
- Dış Gezegenler (01–20) ve Tonoflenya: `ANA-09`..`ANA-20` düğümleri mevcut `görevler.txt` akışına sadece giriş kapısı olarak bağlanır; dış gezegenlerin kendi iç kurallarına, yakıt/savaş/itibar mekaniklerine dokunulmaz.
- Mevcut 25 Bina ve 5 Kara Aracı: Mevcut 25 sanayi binası `ANA` kolunu beslemeye devam ederken, `YER` kolu `Yerleşim` sekmesindeki 12 sosyal binayı ve 5 kara aracının (`Çöl Tilkisi`, `Mammoth`, `Demir Kervan`, `Atmosphere-X`, `Akrep`) koloni içi saha görevlerini yönetir.
- Ticaret Adası Dengesi (`Paket 4`): `ANA-06` ile açılan Tüccar Gemisi ve `YER-10` Koloni Tezgâhı, `Paket 4`'teki katı fiyat/stok/GK sınırı kurallarına tabidir; görev ödülleri bile bu dengeyi bozacak sınırsız GK veya bedava uzay numunesi dağıtmaz.

---

## 6. Sesle Oynanış (TalkBack / VoiceOver)
- Tek Dokunuşta "Ne Açar?" Özeti: Görev listesinde herhangi bir görevin üzerinde sağa kaydırma (veya odaklanma) sırası şöyledir:
  1. `[Kategori + Kod + Adı]`
  2. `Durum: Hazır / Kilitli / Ertelendi`
  3. `Ön Şart: ...`
  4. `Tamamlarsan Açılacaklar: ...`
  5. `Uyarı (varsa): ...`
- "Şu An Ne Yapabilirim?" Filtresi: Terminalde tek dokunuşluk bir "Hazır Görevler" filtresi bulunur. Görme engelli oyuncu 115 görev arasında kaybolmadan yalnızca o an ön şartı tamamlanmış ve başlayabileceği görevleri sırayla dinleyebilir.
- Sesli Kilometre Taşı İşaretçileri: Bir görev tamamlandığında ve yeni bir kol açıldığında kısa, ayırt edici bir ses efekti (ör. yeni mekân açılışı için kapı/asansör sesi, yeni yerleşimci için radyo/ayak sesi) çalar ve hangi yeni görevlerin kilidinin açıldığı tek cümlede özetlenir.
