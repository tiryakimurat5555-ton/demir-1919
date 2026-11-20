# Belge kapsamı: Bahtiyar'ın 9 belgesinin her bölümü ve durumu

Murat'ın isteği (20 Kasım 2026): "Belgedeki hiçbir şeyi atlama." Bu liste belgeler/ klasöründeki dokuz belgenin
bütün bölümlerini sırayla sayar. Her sürümde güncellenir; bir bölüm burada "yapıldı" olmadan atlanmış sayılmaz.

İşaretler: [x] yapıldı · [~] kısmen (ne eksik yazılı) · [ ] yapılmadı (planlanan sıra yazılı).
"Telefonda denenmedi" uyarısı bütün maddeler için geçerlidir; ancak Murat Expo Go'da denediğinde doğrulanır.

## 1. gelistirici-entegrasyon-rehberi-ve-yol-haritasi.md
- [x] 1.1 Dikey ekran zorunluluğu (app.json portrait).
- [x] 1.2 Erişilebilirlik ve dokunmatik girdi katmanı: kendi sesli rehber, hareketler (jestler.js).
- [x] 2.1 Çıkışta otomatik kayıt (AppState, 10 sn, her eylem; yedekli).
- [x] 2.2 Elle kayıt: kapsüldeki merkez terminali, 3 yuva.
- [~] 2.3 Kayıt edilen veri kapsamı: koloni, gemi, mürettebat, görevler, kodeks kaydediliyor. Eksik: savaş durumu
      ve yabancı gezegen durumu (o sistemler yok).
- [~] 3.1 Drive ortam sesleri: Efektler klasörlerinden kullanılıyor. Ambians klasöründeki dosyalar 14 MB; bağlayıcı
      10 MB'tan büyüğünü indiremiyor. Bahtiyar ya da Murat 10 MB altı parçalar koyarsa eklenecek.
- [ ] 3.2 ElevenLabs kısa efektler ve telsiz sesleri: henüz yok; telsiz konuşmaları Türkçe sentez sesle.
      Plan: telsiz zili ve kısa foley için ElevenLabs (indirme yolu CLAUDE.md'de).
- [x] 4 Belge okuma sırası (CLAUDE.md'de).
- [~] 5 Veri modelleri: ColonyWorld [x], Starship [x] (sınıf, odalar, gövde, kalkan, silahlar, kargo, motor sesi),
      CrewMember [~] (atanan oda var; verimlilik/stres alanları var ama işlemiyor), SpaceMission [ ], CombatSession [ ],
      ExoPlanet [ ], CodexEntry [~] (kodeks kaydı var; ses kaydı ve kütüphane durumu yok).
- [x] 6 Master prompt ilkeleri (görselsiz, Türkçe, ses ve hareket).
- [~] 7 Yol haritası: Faz 1 [x], Faz 2 [~], Faz 3 [~], Faz 4 [ ], Faz 5 [ ]. Ayrıntı aşağıda.

## 2. uzay-oyunu-tasarim-ve-senaryo.md
- [~] 1 Gezegenin dört sektörü: Vadi-i Sukût [x], Manyetik Sırtlar [x], Kadim Krater ve harabeler [x],
      Uğultulu Plato [x]. Ayrıntılı alt biyomlar gezegen-gelisimi-v2'de (aşağıda).
- [x] 1 Yüzey görevleri 1-4: Sinyal Arayışı (0.1), Jeotermal Sondaj (0.2), Antik Kseno-Laboratuvar Kazısı (0.3),
      Tersane Zemin Güçlendirmesi (0.4).
- [~] 2 Tesisler: Sinyal Kulesi [x], Dökümhane [x], Graviton ve Reaktör Laboratuvarı [x] (0.5), Kseno-Biyoloji Kubbesi [x],
      Merkezi Montaj Tersanesi [x]. Tesislerin ürettiği gemi birimleri: kripto anten [x], gövde zırhı [x],
      biyo-karantina [x], reaktör ve itki [~] (Kıvılcım'ınki var; graviton reaktörü ve itki motorları yok).
- [~] 3 Modüler gemi ve 9 montaj katmanı: veri [x]; üretilen ve takılabilen: burun, gövde, iç bölme A [x];
      komuta, iç bölme B, makine, tahrik, dış A, dış B [ ] (Faz 3 devamı / Faz 4).
- [x] 4 Uzay haritası, otomatik ziyaret noktaları, ön tarama ve donanım gereksinim listesi, eksikse kilit (0.5).
- [~] 4 Operasyon sahası (donanım sırayla devreye girer): [ ] Faz 4.
- [ ] 5 Dokuz büyük uzay görevi (5.1 Prometheus ... 5.9 Kızıl Yutucu): ön taramaları 5.1 ve 5.2 için var; görevlerin
      kendisi Faz 4.
- [~] 6 Entegrasyon matrisi: yüzey işi → tesis → modül → ziyaret noktası zinciri ilk iki satır için kuruldu.

## 3. gezegen-gelisimi-ve-yerel-gorevler-v2.md
- [~] 1 Coğrafi ve atmosferik katmanlaşma: dört ana bölge var; katmanların sesli tarifleri kısmen.
- [~] 2.1 Kükürt çatlakları ve lav koridorları (güney): sırtlar ve kükürt çatlakları [x]; lav koridorları [ ].
- [ ] 2.2 Manyetik sis ve kristal bataklıkları (doğu sektörü): yok.
- [x] 2.3 Asit yağmurlu fırtına platosu (kuzey): Uğultulu Plato, rüzgâr hamleleri.
- [x] 2.4 Kseno-harabeleri (batı): Kadim Krater, salon, mabet.
- [ ] 3.1 Biyo-ışıldayan mantar ormanları.
- [ ] 3.2 Kriyojenik metan mağaraları.
- [ ] 3.3 Obsidyen ovası ve akustik yankı krateri.
- [ ] 3.4 Cıva şelaleleri ve hidro-havza.
- [ ] 3.5 Havada asılı bazalt kuleleri.
- [ ] 4.1 Vanguard-01 enkazı · [x] 4.2 Kseno-rezonans çanları ve tapınak (0.3) · [ ] 4.3 Fosil solucan tünelleri
      · [ ] 4.4 Manyetik tersinme monoliti · [ ] 4.5 Saklı jeotermal kseno-vaha.
- [ ] 5 Güvensiz bölgeleri arındırma protokolü (keşif, tehdit izolasyonu, stabilizasyon, karakol).
- [ ] 6 Terraforming katmanları (atmosfer, hidroloji, biyosfer, manyetosfer).
- [ ] 7 Uzaydan gelen ırklar ve yapılar (akademi, kseno-habitat kubbeleri, mülteci kampüsü, Tina çekirdeği).
- [ ] 8 Yerel mini görevler: 8.1 dört biyom görevi, 8.2 iki sosyal kriz, 8.3 iki güvenlik görevi.
- [~] 9 Koloni kademeleri: 1-3 [x] (Düşmüş İskelet → Sağlamlaşmış Vaha → Endüstriyel Koloni); 4 Galaktik Başkent [ ].

## 4. araclar-ve-gemi-filosu.md
- [ ] 1.1 Yüzey Araçları Montaj Hangarı.
- [~] 1.2 Kuru tersane ve kızak: Kademe I kızak [x]; Kademe II Manyetik Beşik, Kademe III Hisar Tersanesi [ ].
- [~] 1.3 Kuantum itki ve reaktör kalibrasyon laboratuvarı: Graviton ve Reaktör Laboratuvarı kuruldu (yakıt, iyon
      reaktörü); kalibrasyon işlemleri [ ].
- [x] 2 Kademe 1 Kıvılcım: 2 oda, türbin sesi, belgedeki malzemeler (150 plaka, 40 kablo, 25 litre yakıt, 1 iyon reaktörü).
- [ ] 2 Kademe 2 Rüzgarkıran, Kademe 3 Aethel Muhafızı, Kademe 4 Gökdelen, Kademe 5 Hisar-ı Kadim (veri var, inşa yok).
- [ ] 3 Yüzey araçları: Çöl Tilkisi, Mammoth, Demir Kervan, Atmosphere-X, Akrep.
- [~] 4 Malzeme matrisi: titanyum-karbon plaka, kristal, asit-direnç polimeri, kadim kseno-kristal, plazma yakıtı [x]
      (itki yakıtı); şasi çeliği, graviton yakıtı, helyum-3, nötron çekirdeği [ ].
- [x] 5 Dokunsal iç gezinti: iki parmakla sağa-sola oda, kapı tıslaması ve kilit sesi, her odanın ortam sesi,
      dokunma terminal, basılı tutma mürettebatla konuşma (0.5; Kıvılcım'ın iki odası).

## 5. savas-yetenek-ve-murettebat-mekanikleri.md
- [ ] 1 Reaktif akustik savaş modu (1.1 konumlandırma, 1.2 tur yapısı) — Faz 5.
- [ ] 2 Savaş içi hareket kütüphanesi — Faz 5.
- [ ] 3.1 Kaptan yetenek ağacı (4 dal) · [ ] 3.2 Gemi modifikasyon ağacı. Tecrübe puanı birikiyor, harcanmıyor.
- [~] 4.1 Prosedürel personel: ad, uzmanlık, nitelik [x]; klipsomanyak ve klostrofobik etkileri [ ].
- [~] 4.2 Görev yerleri: Kıvılcım'da kokpit (telsiz subayı: fenerleri uzaktan duyar) ve kargo (ikmal) [x];
      başçarkçı, topçu, başhekim büyük gemilerde [ ].
- [~] 4.3 Telsiz bildirimleri: üç tonlu zil, çift dokun dinle, ertele, kayıtlar [x]; seferde rastgele olaylar ve
      karar isteyen krizler [ ].
- [~] 5.1 Nüfus ve iş gücü: barınma, doğal artış, yaşam bloğu, üç sektöre atama ve etkileri [x] (0.5);
      mülteci göçü [ ] (uzay görevleriyle).
- [~] 5.2 Moral nabzı: inişte koloninin uğultusu (canlı ya da huzursuz) ve üretime etkisi [x]; moralin düşme
      nedenleri ve yerel krizlerle onarım [ ].
- [~] 6 Dokunsal ve sesli arayüz matrisi: yüzey, menüler, mini oyunlar, gemi, seyir [x]; savaş [ ].
- [ ] 7 Sistem entegrasyonu ve oyun çevrimi (savaş ve yeteneklerle).

## 6. derin-uzay-gorevleri.md (Cilt I)
- [~] 1 Seyrüsefer hareketleri: yukarı itki, aşağı fren, sağa-sola pruva ve stereo kilit, basılı tut radar, çift
      dokun kenetlenme [x]; iki parmakla çevirme telsiz taraması [~] (yer tutucu); kıstırıp açma dron [ ].
- [ ] 1 Otomasyon: otomatik kenetlenme bilgisayarı, akustik filtre, toplama dronları.
- [ ] 2-4 Görevler G-01 … G-12.
- [ ] 5 Görev ve donanım matrisi · [ ] 6 Görevlerin kule menziliyle ortaya çıkması.

## 7. derin-uzay-gorevleri-cilt-2.md
- [ ] 1 Genişletilmiş dokunsal kontrol.
- [ ] 2 Kategori D: yeni ırklar G-13 … G-16.
- [ ] 3 Kategori E: yabancı gezegen inişleri G-17 … G-20.
- [ ] 4 Kategori F: kurtarma operasyonları G-21 … G-24.
- [ ] 5 Gereksinim matrisi · [ ] 6 Ekosistem bütünleşmesi.

## 8. kesfedilebilir-gezegenler-rehberi.md
- [ ] 1 Yörüngesel ve yüzey araştırma kontrolleri.
- [ ] 2 Yirmi gezegen (Pyros-Prime … Corona-Lux).
- [ ] 3 Keşif ve etkileşim matrisi · [ ] 4 Oyun döngüsüne entegrasyon.

## 9. derin-uzay-kesifleri-ve-evren-kutuphanesi.md
- [ ] 1 Serbest seyrüsefer keşif mantığı (yol üstü fenomenler).
- [ ] 2 Gözlem gereçleri: rezonans alan kamerası, radyo-spektrometre, mikro-gravimetre, kseno-lidar, kripto-arşivleyici.
- [ ] 3 Dokunsal ve akustik fotoğraflama arayüzü.
- [ ] 4 On altı kozmik fenomen (Keşif 01 … 16).
- [~] 5 Veri iletimi, Evren Kütüphanesi ve itibar: Kodeks menüsü ve itibar puanı [x]; kütüphane durumu ve
      prestij kademeleri [ ].
- [ ] 6 Keşif, gereç ve itibar matrisi.

## Sıradaki adımlar (sırayla)
1. Faz 3'ün kalanı: Kademe 2-3 gemiler ve kızak kademeleri, kalan modüllerin üretimi (graviton reaktörü, çekici kiriş,
   hisar topları, kuantum sürücü ...), yüzey araçları hangarı ve beş araç.
2. Faz 2'nin kalanı: doğu sektörü, beş mikro-biyom, kalan dört POI, arındırma protokolü, terraforming, yerel mini
   görevler, ırk yapıları, Kademe 4.
3. Faz 4: görev motoru (SpaceMission), 9 büyük görev, G-01 … G-24, 20 gezegen, gözlem gereçleri ve fenomenler, kütüphane.
4. Faz 5: savaş modu, yetenek ağaçları, ElevenLabs sesleri, cila.
