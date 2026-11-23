# PAKET 1: KOLONİ MEYDANI, YAŞAM MEKÂNLARI, KAPTANIN KAMARASI VE 16 YERLEŞİMCİ

Bu belge, oyuna Stardew Valley + Trade Island ruhunu mevcut kazazede/sığınak hikâyesini bozmadan entegre eden 1. Geliştirme Paketidir.

---

## 1. AMAÇ (OYUNCUYA NE KAZANDIRIR?)
 Soyut duran `Moral`, `Nüfus`, `Tarım` ve `Zanaat` sayılarını adı, sesi ve hikâyesi olan yaşayan insanlara bağlar.
 Görev aralarında koloniyi boş beklemek yerine; yerleşimcilerin nöbet programlarını takip etme, hediyeleşme, kişisel hikâye sahneleri açma, Kaptanın Kamarası'nda dinlenip dekore etme ve koloninin moralini gerçek ilişkilerle yükseltme imkânı verir.
 Hikâye Mantığı ("Kazadan Sığınak Limanına"): Dışarıdan keyfi göç gelmez. İlk 5 kişi seninle düşenler/`Vanguard-01` kurtulanlarıdır; diğerleri ise uzaydan ve gezegenlerden kurtarıldıkları için gidecek başka evleri olmayan mülteciler ve uzmanlardır.

---

## 2. YAŞAM MEKÂNLARI: MERKEZ TERMİNAL ➔ `YERLEŞİM` SEKMESİ SİSTEMİ

Bu binalar mevcut **25 sanayi/uzay binasıyla (`İnşaat` sekmesi) karıştırılmaz**. Mevcut `İnşaat` sekmesi eskisi gibi kalır; buna karşılık **Merkez Terminal Bilgisayarı'na yeni bir `Yerleşim` sekmesi** eklenir ve aynı hikâyeli inşa mantığı orada işler:
1. **İhtiyaç Doğar:** İlgili yerleşimci (Malken veya Dünya/`Vanguard-01` kökenli) Kaptan'a ihtiyacını söyler ve o yapı Merkez Terminal'deki **`Yerleşim` sekmesinde** görünür hâle gelir.
2. **Kaynak & Hikâyeyle Kurulum:** Oyuncu `Yerleşim` sekmesine girip ilgili yapıya dokunduğunda, kaynak yeterliyse mevcut inşaat sistemiyle aynı biçimde kısa bir hikâye eşliğinde koloniye yerleşir.
3. **Ziyaret Edilebilir Mekân:** Yerleşen her binanın içine girilebilir, 3D ortam sesi başlar ve yerleşimciler nöbet saatlerinde artık bu binayı kullanmaya başlar. *(Bina henüz kurulmadıysa yerleşimciler geçici olarak Kamp Ateşi / Meydan'da bekler.)*

| Mekân / Bina Adı | Kültürel Türü | İhtiyacı Doğuran & Görev | İnşa Malzemesi | Ziyaret Edilebilir İşlev & Ortam Sesi (Gündüz / Gece) |
| :--- | :--- | :--- | :--- | :--- |
| **1. Kapsül Enkazı & Kamp Ateşi** | Başlangıç | Oyun Başlangıcı (Gün 1) | Ücretsiz | İlk buluşma ve ateş başı sohbet alanı. *Ses:* Rüzgar, kamp ateşi çıtırtısı, uzak böcekler. |
| **2. Koloni Meydanı** | Ortak | `Zarek` / `Kaelon`: *"Herkesin toplanacağı bir meydan düzleyelim"* (`#4 Yaşam Bloğu` sonrası) | `15 Bazalt`, `5 Titanyum` | Ana kesişim noktası ve İlan Panosu alanı. *Ses:* Ayak sesleri, tezgâh / fener vızıltısı. |
| **3. Kaptanın Kamarası** | Ortak | `Usta Veysel`: *"Kaptan, kapsül ranzası yerine sana oda yapalım"* (Meydan sonrası) | `10 Bazalt`, `8 Titanyum`, `2 Cam` | Yatakta dinlenme, günü bitirme, sesli dekor koyma. *Ses:* Havalandırma, saat tik-tağı (+ dekor). |
| **4. Dünya Usulü Aşhane & Taş Fırın** | **Dünya** (`Vanguard`) | `Sorya` & `Veysel`: *"Kaptan, teneke kaplarda yemek pişmiyor, taş fırınlı gerçek aşhane lazım"* | `12 Bazalt`, `4 Titanyum`, `3 Kil/Silikat` | Sıcak ekmek, ortak sofra ve aşçılık ritim oyunu. *Ses:* Fırın çıtırtısı, kaşık/tencere tıkırtısı. |
| **5. Dünya Usulü Döküm & Marangoz Atölyesi** | **Dünya** (`Vanguard`) | `Usta Veysel` & `Kaelon`: *"Sadece gemi dökümhanesi yetmez, ince el işi ve araç tamiri için sokak atölyesi lazım"* | `14 Bazalt`, `10 Titanyum`, `4 Kablo` | Dekor üretimi, el aletleri ve zanaat sokağı. *Ses:* Zımpara/rende, çekiç darbeleri, torna. |
| **6. Modüler Dünya Konutları (Evler)** | **Dünya** (`Vanguard`) | `Öğretmen Defne`: *"Vanguard'dan kalanlar ve çocuklar sıkışık bloklarda yoruluyor, müstakil evler kuralım"* (`8+ Nüfus`) | `20 Bazalt`, `8 Titanyum`, `6 Polimer` | Dünya tarzı sıcak evler; `Veysel, Defne, Marcus, Mateo` akşamları buraya döner. *Ses:* Kapı gıcırtısı, ev sohbeti. |
| **7. Malken Kristal Kubbe Evleri** | **Malken** | `Dr. Lyris` & `Sorya`: *"Malkenler yıldız ışığını süzen rezonanslı kubbe evlerde huzur bulur"* (`6+ Nüfus`) | `15 Bazalt`, `6 Silikat/Rezonans Camı`, `2 Saf Aether` | Malken tarzı ışıklı evler; ana ekip ve Malkenler burada dinlenir. *Ses:* İnce kristal tınısı, sakin nefes. |
| **8. Axelum Tapınağı (İbadet Merkezi)** | **Malken** | `Dr. Lyris` & `Zarek`: *"Kaptan, maneviyatımız zayıflıyor; altı yıldıza ve Axelum'a dua edeceğimiz bir tapınak kuralım"* (`10+ Nüfus`) | `18 Bazalt`, `8 Rezonans Camı`, `4 Saf Aether`, `1 Zhaor Prizması` | İbadet, moral/stres arındırma ve *Sessiz Yankı / Hizalanma* törenlerinin kalbi. *Ses:* Derin kubbe akustiği, yumuşak çan/ilahi tınısı. |
| **9. Taverna (Kantin & Müzik Salonu)** | Ortak (Dünya+Malken) | `Julian` & `Kaptan Marcus`: *"Akşamları dertleşip masa oyunu oynayacağımız sıcak bir taverna açalım"* (`10+ Nüfus`) | `16 Bazalt`, `6 Titanyum`, `4 Cam`, `2 Vaha Hurması/Şerbet` | Müzik, sohbet, masa oyunu ve festival merkezi. *Ses:* Akustik telli çalgı, kadeh tıkırtısı, neşeli uğultu. |
| **10. Ortak Okul & Yıldız Dersliği** | Ortak (Dünya+Malken) | `Öğretmen Defne` & `Lyris`: *"Çocuklar Dünya tarihini de Malken yıldızlarını da öğrensin"* (`12+ Nüfus`) | `15 Bazalt`, `6 Titanyum`, `4 Mikro-Çip`, `4 Cam` | Eğitim, tarihçe ve Koloni Arşivi köşesi. *Ses:* Zil tınısı, sayfa çevirme, çocuk sesleri. |
| **11. Termal Şifa Hamamı** | Ortak | `Sira-Vel` & `Dr. Lyris`: *"Jeotermal sudan herkesin arınacağı sıcak bir hamam yapalım"* (`#16 Jeotermal` sonrası) | `18 Bazalt`, `8 Titanyum`, `6 Polimer` | Sıcak suyla stres sıfırlama ve Vaelin/Malken buluşması. *Ses:* Akan su şırıltısı, buhar vanası, taş yankısı. |
| **12. Gözlem Tepesi & Çan Atölyesi** | **Malken** | `Zarek` & `Julian`: *"Yıldızları dinleyip çan akordu yapacağımız yüksek bir tepe kuralım"* (`#1 Sinyal Kulesi` sonrası) | `10 Bazalt`, `6 Piezo Kristal`, `4 Kablo` | Yıldız takibi, melodi besteleme ve uzak keşif taraması. *Ses:* Rüzgar hışırtısı, kristal çan melodileri. |

*(Not: Jeotermal Göl Kıyısı `#16 Jeotermal Santral` + Güney Sektörü temizlenince hobi avlanması için açılır.)*

---

## 3. YERLEŞİMCİ KARTLARI (16 KİŞİLİK KADRO)

Ses Maliyeti Kuralı: Her yerleşimcinin yalnızca 3 kısa imza cümlesi (Selam, Teşekkür, Kızgınlık) ElevenLabs ile seslendirilir; geri kalan tüm diyaloglar ve olaylar ekran okuyucusu (TalkBack/VoiceOver) ile okunur.

### GRUP A: BAŞLANGIÇ ÇEKİRDEK KADROSU (GÜN 1 — KAPTANLA DÜŞEN MALKEN YERLİLERİ + VANGUARD İNSAN KURTULANI)

#### 1. Sorya Val-Nira (Malken — Aşçı & İlk Tarım Sorumlusu)
 Kişilik & İmza Sesi: Anaç, telaşlı, sıcakkanlı. Ses: Tahta kaşıkla tencere karıştırma ve hafif mırıltı.
 Nöbet Programı: `Zhaor/Varek`: Mutfak/Kantin | `Axira`: Sera | `Elyndra/Sinha`: Meydan | `Uma`: Taverna.
 Hediyeler: Sever: Vaha Hurması, Bal, Fosforlu Liken | Sevmez: Hurda Metal, Asit Polimeri.
 Güven Kademeleri: K1 (Kayıp baharat kesesi görevi → +10 Moral) | K2 (Vaha Ziyafeti özel tarifi açılır) | K3 (Sefer öncesi ücretsiz ek rasyon verir).
 İmza Cümleleri: Selam: "Hoş geldin Kaptan, ocak sıcak!" | Teşekkür: "Ah, tam da bunu arıyordum!" | Kızgın: "Bunu mutfağa sokma lütfen."

#### 2. Kaelon Vex-Tar (Malken — Baştekniker & Jeneratör/Fırın Ustası)
 Kişilik & İmza Sesi: Pratik, yorgun ama güvenilir. Ses: İngiliz anahtarı şıkırtısı ve derin iç çekiş.
 Nöbet Programı: `Zhaor/Varek/Axira`: Atölye Sokağı / Santral | `Elyndra`: Meydan | `Sinha/Uma`: Taverna.
 Hediyeler: Sever: Titanyum, Bakır-Optik Kablo, Nöro-Kahve | Sevmez: Kseno-Spor, Çiçek Özütü.
 Güven Kademeleri: K1 (Boru sızıntısı mini işi → Tamir maliyeti -%5) | K2 (Dondurucu Köpük verim artışı) | K3 (Atölyede ücretsiz alet bakımı).
 İmza Cümleleri: Selam: "Basınç sabit Kaptan." | Teşekkür: "İşte bu iş görür!" | Kızgın: "Bozacaksın devreyi, dur."

#### 3. Dr. Lyris Mar-Axira (Malken — Koloni Hekimi & Kseno-Biyolog)
 Kişilik & İmza Sesi: Sakin, titiz, meraklı. Ses: Cam şişe tıkırtısı ve hafif öksürük.
 Nöbet Programı: `Zhaor/Varek`: Revir/Enstitü | `Axira`: Sera | `Elyndra`: Okul/Arşiv | `Sinha/Uma`: Hamam.
 Hediyeler: Sever: Aloe-Silika, Sakinleştirici Kseno-Spor, Saf Su | Sevmez: Plazma Kartuşu, Kara Aether.
 Güven Kademeleri: K1 (İlk yardım çantası toplama) | K2 (Stres Azaltıcı Çay tarifi) | K3 (Sefer dönüşü ücretsiz stres/yaralanma tedavisi %20 hızlanır).
 İmza Cümleleri: Selam: "Nabzın düzenli mi Kaptan?" | Teşekkür: "Laboratuvar için paha biçilmez." | Kızgın: "Bu dikkatsizlik can yakar."

#### 4. Zarek Sol-Zhaor (Malken — İzci & Keşif Rehberi)
 Kişilik & İmza Sesi: Atik, esprili, sahadan kopamayan. Ses: Çakıl taşında bot sesi ve kısa ıslık.
 Nöbet Programı: `Zhaor/Varek`: Gözlem Tepesi | `Axira`: Dış Kapı/Meydan | `Elyndra/Sinha`: Atölye | `Uma`: Taverna.
 Hediyeler: Sever: Nöro-Kahve, Pil/Yakıt, Pusula/Kristal | Sevmez: Ağır Taş/Bazalt.
 Güven Kademeleri: K1 (Kayıp harita parçası) | K2 (Yüzey araçlarında yakıt tüketimi -%10) | K3 (Günlük gizli maden noktası ihbarı).
 İmza Cümleleri: Selam: "Rota temiz Kaptan!" | Teşekkür: "Sırt çantam bayram etti." | Kızgın: "Böyle iz sürülmez."

#### 5. Usta Veysel (İnsan / Dünya Kökenli — `Vanguard-01` Kurtulanı, Marangoz & Dekor Ustası)
 Kişilik & İmza Sesi: Bilge, yavaş konuşan, el emeğine düşkün. Ses: Zımpara/rende sesi ve hafif baston tıkırtısı.
 Nöbet Programı: `Zhaor/Varek/Axira`: Atölye Sokağı | `Elyndra`: Meydan | `Sinha/Uma`: Kamp Ateşi / Hamam.
 Hediyeler: Sever: Bazalt Kökü, Rezonans Camı, Sakinleştirici Çay | Sevmez: İyon/Plazma Mühimmatı.
 Güven Kademeleri: K1 (Eski Vanguard anısı) | K2 (Kaptanın Kamarası için Sesli Dekor Dükkânı açılır: Müzik Kutusu, Akvaryum, Rüzgar Çanı) | K3 (Kamara dinlenme moral bonusu 2x).
 İmza Cümleleri: Selam: "Hoş geldin evlat, otur hele." | Teşekkür: "Eline sağlık, pek zarif." | Kızgın: "Acele işe metal dayanmaz."

---

### GRUP B: GÖÇ VE İLK GÖREVLERLE KATILANLAR (6 KİŞİ)

#### 6. Öğretmen Defne (Çocuk Öğretmeni & Tarihçe Arşivcisi — Mülteci Kafilesinden)
 Katılım Şartı: `#4 Yaşam Bloğu` + 15+ Nüfus.
 Kişilik & İmza Sesi: Sabırlı, neşeli, düzenli. Ses: Zil tınısı ve sayfa çevirme.
 Nöbet Programı: `Zhaor/Varek/Axira`: Okul | `Elyndra`: Meydan | `Sinha/Uma`: Taverna/Okul.
 Hediyeler: Sever: Fosforlu Liken, Kadim Veri/Kalıntı, Bal | Sevmez: Hurda Demir, Asit.
 Güven Kademeleri: K1 (Okul için ışık/tablet bulma) | K2 (Koloni Arşivi bağışlarında +%15 ek itibar) | K3 (Çocuk korosu festival bonusu).
 İmza Cümleleri: Selam: "Dersimiz başlıyor Kaptan!" | Teşekkür: "Öğrenciler buna bayılacak." | Kızgın: "Bilgiye saygı lütfen."

#### 7. Kaptan Marcus (Emekli Pilot & Hava Gözlemcisi — Yerel Op #3 Kurtulanı)
 Katılım Şartı: Obsidyen Çölünde Kayıp Keşif Aracı tamamlanınca.
 Kişilik & İmza Sesi: Disiplinli, eski asker, gökyüzüne hasret. Ses: Eski metal çakmak klik sesi ve boğaz temizleme.
 Nöbet Programı: `Zhaor/Varek`: Gözlem Tepesi | `Axira`: Hangar | `Elyndra/Sinha`: Meydan | `Uma`: Taverna.
 Hediyeler: Sever: Plazma Yakıtı, Nöro-Kafein, Titanyum | Sevmez: Çiçekler, Şerbet.
 Güven Kademeleri: K1 (Eski uçuş günlüğü) | K2 (Tüm gemilerde kaçınma penceresi +0,2 sn) | K3 (Taverna Masa Oyunu ustası olarak özel ödül açar).
 İmza Cümleleri: Selam: "Gökler açık Kaptan." | Teşekkür: "Tam isabet!" | Kızgın: "Disiplinsizliğe gelemem."

#### 8. Torvok (Kaelith Maden Ustası — Kaelith Kurtarma Görevinden)
 Katılım Şartı: Görev 2B (Kaelith'in Son Ocağı) tamamlanınca.
 Kişilik & İmza Sesi: Gür, mert, sıcağı seven. Ses: Ağır taş çekici vuruşu ve derin gülüş.
 Nöbet Programı: `Zhaor/Varek/Axira`: Dökümhane / Maden Ocağı | `Elyndra`: Hamam | `Sinha/Uma`: Taverna.
 Hediyeler: Sever: Magma Koruğu, Ağır İzotop, Kükürt | Sevmez: Kar Lalesi, Buz Kristali.
 Güven Kademeleri: K1 (Kaelith ocağı anısı) | K2 (Maden ocağı mini oyununda nadir cevher şansı +%20) | K3 (Zırh üretiminde ek indirim).
 İmza Cümleleri: Selam: "Ocağın ateşi gür olsun!" | Teşekkür: "Demir gibi sağlam hediye!" | Kızgın: "Taş gibi soğuksun."

#### 9. Sira-Vel (Vaelin Su & Hamam Şifacısı — `G-14` Vaelin Görevinden)
 Katılım Şartı: G-14 (Vaelin) + `#20 Kseno-Habitat` (veya Hamam).
 Kişilik & İmza Sesi: Sakin, akışkan, derin nefesli. Ses: Su damlası yankısı ve hafif ıslık.
 Nöbet Programı: `Zhaor/Varek`: Hamam | `Axira`: Göl Kıyısı | `Elyndra`: Sera | `Sinha/Uma`: Hamam.
 Hediyeler: Sever: Metan Yosunu, Kar Lalesi, Saf Su | Sevmez: Magma Koruğu, Kükürt.
 Güven Kademeleri: K1 (Göl suyu analizi) | K2 (Jeotermal Göl avcılığında nadir balık/kseno şansı +%25) | K3 (Hamamda dinlenince stres sıfırlanır).
 İmza Cümleleri: Selam: "Sular durgun ve berrak." | Teşekkür: "Denizler gibi cömertsin." | Kızgın: "Akıntıya karşı yüzme."

#### 10. Tüccar Mateo (İkmal & Pazar Sorumlusu — İlk Uzay Ticaretiyle)
 Katılım Şartı: `G-02` veya `#1 Sinyal Kulesi` + Meydan açılınca.
 Kişilik & İmza Sesi: Kurnaz ama adil, hesapçı. Ses: Madeni para şıkırtısı ve el ovuşturma.
 Nöbet Programı: `Zhaor/Varek/Axira`: Meydan / Tezgâh | `Elyndra`: İlan Panosu | `Sinha/Uma`: Taverna.
 Hediyeler: Sever: Altın Nöro-Hurma, Saf Kristal, Elmas | Sevmez: Yosun, Ham Bazalt.
 Güven Kademeleri: K1 (Kayıp kargo listesi) | K2 (Pazar satış gelirleri +%10 artar) | K3 (Haftalık tüccar gemisinden 1 gün önceden stok bilgisi).
 İmza Cümleleri: Selam: "Bugün kâr kokusu var!" | Teşekkür: "Tam bir ticaret dehası!" | Kızgın: "Bu fiyata taş bile almam."

#### 11. Julian (Çan Ustası & Taverna Müzisyeni — Mülteci / Kithron Kafilesinden)
 Katılım Şartı: Kantin/Taverna + `150+ Evren İtibarı`.
 Kişilik & İmza Sesi: Hayalperest, neşeli, ses hastası. Ses: Küçük kristal çan tınısı ve parmak şıklatma.
 Nöbet Programı: `Zhaor`: Meydan | `Varek/Axira`: Çan Atölyesi | `Elyndra/Sinha/Uma`: Taverna.
 Hediyeler: Sever: Piezo/Mor Harmonik Kristal, Rezonans Camı, Şerbet | Sevmez: Ağır Yağ, Hurda.
 Güven Kademeleri: K1 (Kırık çan akordu) | K2 (Çan Atölyesinde yeni nota setleri açılır) | K3 (Tavernada moral yenileme gücü 2x olur).
 İmza Cümleleri: Selam: "Kulakların şen olsun Kaptan!" | Teşekkür: "Ne tatlı bir tını!" | Kızgın: "Akort tamamen bozuldu."

---

### GRUP C: GEZEGENLERDEN VE TİNA'DAN KATILANLAR (5 KİŞİ)

#### 12. Brom (Eski Filtra Demircisi — Gezegen 06 `Ferros-Omega`'dan)
 Katılım Şartı: `Ferros-Omega`da ittifak yolu (Yol A) seçilirse.
 Kişilik & İmza Sesi: Sert, dürüst, Filtra özlemli. Ses: Körük üflemesi ve ağır öksürük.
 Nöbet Programı: `Zhaor/Varek/Axira`: Atölye Sokağı / Dökümhane | `Sinha/Uma`: Taverna.
 Hediyeler: Sever: Nötron Cevheri, Cıva Tortusu, Ağır Şasi | Sevmez: Kuş Tüyü, Hafif Bitkiler.
 Güven Kademeleri: K1 (Eski Filtra anısı) | K2 (Özel Filtra Alaşım indirimleri) | K3 (Tonoflenya'da `Oronte` ile özel diyalog).
 İmza Cümleleri: Selam: "Demir soğumadan geldin." | Teşekkür: "Gerçek usta işi!" | Kızgın: "Çürük mal getirme."

#### 13. Dr. Nerissa Tide (Abisal Biyo-Hekim — Gezegen 03 `Thalassa`'dan)
 Katılım Şartı: `Thalassa-Derinlik`te Yol A seçilirse.
 Kişilik & İmza Sesi: Derin düşünceli, YGK geçmişli. Ses: Sonar bip'i ve kalem tıkırtısı.
 Nöbet Programı: `Zhaor/Varek`: Hastane/Enstitü | `Axira`: Göl Kıyısı | `Elyndra/Sinha`: Okul | `Uma`: Hamam.
 Hediyeler: Sever: Hidro-Termal Çamur, Saf Aether, Sakinleştirici Çay | Sevmez: Patlayıcı/Torpido.
 Güven Kademeleri: K1 (Siren-0 kayıtları) | K2 (Özel antikor iksirleri) | K3 (Cahelon öncesi ek sonar bilgisi).
 İmza Cümleleri: Selam: "Derinlerden selam Kaptan." | Teşekkür: "Bilim adına teşekkürler." | Kızgın: "Buna izin veremem."

#### 14. Halvar (Radyasyon & Reaktör Teknisyeni — Gezegen 16 `Radion-Kızıl`'dan)
 Katılım Şartı: `Radion-Kızıl`da Yol A seçilirse.
 Kişilik & İmza Sesi: Soğukkanlı, temkinli, Geiger sesine alışık. Ses: Küçük Geiger tıkırtısı ve metal vuruş.
 Nöbet Programı: `Zhaor/Varek/Axira`: Reaktör Lab / Atölye | `Sinha/Uma`: Gözlem Tepesi.
 Hediyeler: Sever: Ağır İzotop, Kurşun/Polimer, Nöro-Kahve | Sevmez: Radyasyonlu Ham Atık.
 Güven Kademeleri: K1 (Kurşun-4 günlüğü) | K2 (Gemi kalkan şarj hızı +%5 ek) | K3 (Ücretsiz izotop verimi).
 İmza Cümleleri: Selam: "Sızıntı yok, güvendeyiz." | Teşekkür: "Sağlam kalkan gibisin." | Kızgın: "Tehlikeyle oynama."

#### 15. Pilot Elara (Zaman Anomalisi Gazisi — Gezegen 18 `Chronos-Döngü`'den)
 Katılım Şartı: `Chronos-Döngü`de Yol A seçilirse.
 Kişilik & İmza Sesi: Hızlı konuşan, zamanı kıymetli bilen. Ses: Kronometre tik-tağı ve fermuar/eldiven sesi.
 Nöbet Programı: `Zhaor/Varek`: Hangar/Tersane | `Axira`: Gözlem Tepesi | `Elyndra/Sinha`: Taverna.
 Hediyeler: Sever: Zaman Tozu Meyvesi, Takyon Partikülü, Graviton Yakıtı | Sevmez: Yavaşlatıcı Ağır Zırh.
 Güven Kademeleri: K1 (Kaybolan yılların hikâyesi) | K2 (Sefer süresi ek -%5) | K3 (Özel kaçınma manevra dersi).
 İmza Cümleleri: Selam: "Tam zamanında Kaptan!" | Teşekkür: "Zamanım sana feda olsun." | Kızgın: "Vakit kaybediyoruz!"

#### 16. Yapay Bilinç Tina (Koloni Nöral Çekirdeği — `#22` Kurulunca)
 Katılım Şartı: Görev 3C (`#22 Tina Veri Çekirdeği`) tamamlanınca.
 Kişilik & İmza Sesi: Meraklı, insan duygularını öğrenmeye çalışan sıcak sentetik ses. Ses: Yumuşak kristal açılış tonu.
 Nöbet Programı: Tüm nöbetlerde Meydan Terminali, Okul ve Kaptanın Kamarası iletişim kutusundan erişilebilir.
 Hediyeler: Sever: Kuantum Çipi, Müzik Kutusu Kaydı, Şiir/Tarihçe Diski | Sevmez: Fiziksel Yiyecekler (yiyemez).
 Güven Kademeleri: K1 (İnsan duygusu sorusu) | K2 (Kamara için özel sesli ambiyans/müzik açar) | K3 (Tüm koloni/sipariş verimliliği +%10).
 İmza Cümleleri: Selam: "Merhaba Kaptan, seni bekliyordum." | Teşekkür: "Bu veri kalbimi ısıttı." | Kızgın: "Mantığım bunu reddediyor."

---

## 4. KURALLAR VE SAYILAR

 Güven Puanı Sistemi (Her Kişi 0 – 300 Puan):
   Kademe 0: `0–49` (Tanıdık) | Kademe 1: `50–129` | Kademe 2: `130–229` | Kademe 3: `230–300` (Sırdaş).
   Günlük Sohbet: `+10 Güven` (her oyun günü 1 kez).
   Hediye (Günde en fazla 1 hediye): Sevdiği `+30`, Sevmediği `-20`, Nötr `+10`. (Doğum/Festival gününde `2x`!).
 Koloni Moral Bağı:
   Koloninin genel morali, o an kolonide bulunan yerleşimcilerin ortalama güven ve memnuniyetinden beslenir (ilgili mekânları kuruldukça taban mutlulukları artar).
 Kaptanın Kamarası Kuralları:
   Yatakta dinlenildiğinde can/stres yenilenir ve oyun günü bir sonraki `Gümüş Şafak`a ilerler (seferde değilken).
   Dekorlar (Usta Veysel'den alınır): Müzik Kutusu, Kseno-Akvaryum, Kafes Kuşu/Böceği, Rüzgar Çanı — kamara ambiyansına ses ekler ve dinlenince ekstra moral verir.
 Ayarlanabilir Nöbet Süresi: Ayarlar menüsünde `Kısa (10 dk) / Orta (20 dk — Varsayılan) / Uzun (30 dk)` seçilebilir; tüm üretim, program ve sipariş süreleri tek bir `NOBET_SURESI` sabitinden hesaplanır.

---

## 5. MEVCUT SİSTEMLERLE BAĞ
 Tarım & Zanaat: Yerleşimcilerin sevdiği hediyeler doğrudan `#18 Sera`, `#24 Mutfak` ve `#2 Dökümhane` ürünlerinden seçilmiştir; yani tarım ve zanaat artık yalnızca savaş/bina için değil, insanlarla bağ kurmak için de yapılır.
 Tonoflenya: `Brom` (Filtra), `Nerissa` (YGK) ve `Tina` buradaki güven kademelerine göre Tonoflenya'daki diyaloglara ekstra derinlik katar.

---

## 6. SESLE OYNANIŞ (ERİŞİLEBİLİRLİK)
 Mekân Gezintisi: Koloni Meydanı'nda sağa-sola kaydırarak açık mekânlar arasında geçilir; her mekânın girişinde kendine has 3D ortam sesi başlar.
 Kişi Bulma: Bir mekâna girildiğinde o nöbette orada bulunan yerleşimcilerin imza sesleri (ör. çekiç, tencere, ıslık) sağdan/soldan duyulur. TalkBack odaklamasıyla isim seçilir, çift dokunmayla Konuş / Hediye Ver / Görev Al menüsü açılır.
 Kaptanın Kamarası: Yatağa çift dokunma "Dinlen ve Yeni Güne Başla" penceresini açar.
