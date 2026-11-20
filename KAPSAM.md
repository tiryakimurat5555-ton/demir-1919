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
      CrewMember [~] (atanan oda var; verimlilik/stres alanları var ama işlemiyor), SpaceMission [x] (1.1, d.op), CombatSession [ ],
      ExoPlanet [ ], CodexEntry [~] (kodeks kaydı var; ses kaydı ve kütüphane durumu yok).
- [x] 6 Master prompt ilkeleri (görselsiz, Türkçe, ses ve hareket).
- [~] 7 Yol haritası: Faz 1 [x], Faz 2 [x], Faz 3 [~], Faz 4 [~], Faz 5 [ ]. Ayrıntı aşağıda.

## 2. uzay-oyunu-tasarim-ve-senaryo.md
- [~] 1 Gezegenin dört sektörü: Vadi-i Sukût [x], Manyetik Sırtlar [x], Kadim Krater ve harabeler [x],
      Uğultulu Plato [x]. Ayrıntılı alt biyomlar gezegen-gelisimi-v2'de (aşağıda).
- [x] 1 Yüzey görevleri 1-4: Sinyal Arayışı (0.1), Jeotermal Sondaj (0.2), Antik Kseno-Laboratuvar Kazısı (0.3),
      Tersane Zemin Güçlendirmesi (0.4).
- [x] 2 Tesisler: Sinyal Kulesi, Dökümhane, Graviton ve Reaktör Laboratuvarı, Kseno-Biyoloji Kubbesi, Merkezi Montaj
      Tersanesi; her biri belgedeki gemi birimini üretir (kripto anten, gövde zırhı, graviton reaktörü ve yakıtlar,
      biyo-karantina, montaj).
- [x] 3 Modüler gemi ve 9 montaj katmanı: dokuzu da üretilir ve takılır (0.7): burun, komuta (karadutu), gövde,
      bölme A, bölme B (optik kripto-bellek), makine (graviton reaktörü), tahrik (kuantum sürücü), dış A (çekici kiriş),
      dış B (hisar topları ve torpido); sınıfa göre katman sınırı.
- [x] 4 Uzay haritası, otomatik ziyaret noktaları, ön tarama ve donanım gereksinim listesi, eksikse kilit (0.5).
- [x] 4 Operasyon sahası (1.1, uzay/operasyon.js): donanımı tam gemi kenetlenince doğrudan sahaya girer; şans ve seçim
      penceresi yok, adımlar kulakla ve parmakla sırayla icra edilir (15 adım türü). Hata gövdeye hasar; gövde biterse
      koloniye çekilir, sonra yeniden denenir. Eve kenetlenince tersane gövdeyi onarır.
- [x] 5 Dokuz büyük uzay görevi (1.1): her birinin 3-4 adımlı operasyonu ve sonucu; ödül gemileri (Prometheus Ağır
      Kruvazörü, iki eskort, Kuantum Korveti, Malken Prototipi, Akademi Bilim Gemisi, Hisar Muhafız Kruvazörü, iki
      Konfederasyon kruvazörü, Kadim Koruyucu) sınıflarının bütün katmanları takılı filoya katılır; Vaka bayrakları
      (terraform ve ırk yapıları için), Kadim Genom → kadim mezar gezegeni noktası, Aethel-9 mültecileri (nüfus +20).
- [x] 6 Entegrasyon matrisi (0.7): dokuz satırın hepsi: yüzey işi → tesis → birim → ziyaret noktası. Altı yeni yüzey işi:
      rezonatör kalibrasyonu (kalibrasyon sütunu, 5 nota), izotop sıkıştırma (valf), gaz bacası ısı izolasyonu (polimer
      levha), zemin alaşım kaplaması (vinç), ağ şebekesi entegrasyonu (ikinci frekans ayarı), kadim şifre deşifresi
      (6 nota, kadim rezonans anahtarı). Altı tesis: Kuantum Laboratuvarı, İtki Hangarı, Kriyo-Atölye, Askeri Tersane,
      Komuta Merkezi, Yüksek Enerji Reaktörü. Tesis kurulunca nokta haritada belirir. Son sütun (ödül gemileri) 1.1.

## 3. gezegen-gelisimi-ve-yerel-gorevler-v2.md
- [x] 1 Üç katman: üst (platolar, kuleler), orta (vadi, sırtlar, krater, doğu, cıva, lav, obsidyen), alt (mantar
      ormanı, metan mağaraları, kadim salonlar) (0.8).
- [x] 2.1 Kükürt çatlakları ve lav koridorları (güney, 0.8): lav koridorları, magma kabarması (kaç), kaynama uğultusu,
      ağır metal damarları; jeotermal enerji santrali (üretim ×1,2).
- [x] 2.2 Manyetik sis ve kristal bataklıkları (doğu, 0.8): piezo kuvars sütunları (stok 6), statik boşalma (yüklenen
      sütundan uzaklaş), sis radarı kısaltır, çınlama ve fısıltılı yankılar.
- [x] 2.3 Asit yağmurlu fırtına platosu (kuzey): Uğultulu Plato, rüzgâr hamleleri.
- [x] 2.4 Kseno-harabeleri (batı): Kadim Krater, salon, mabet.
- [x] 3.1 Mantar ormanları (0.8): damla yankıları, nefes alan zarlar, kör yarasa sürüleri (konumlu cıvıltı); fotonik yosun
      → foton reçinesi (kubbe aydınlatması, moral), sütun mantar → kseno-spor (sakinleştirici ilaç, koloniye dağıtım).
- [x] 3.2 Kriyojenik metan mağaraları (0.8): donma maruziyeti, gaz menfezleri, buzul çatlamaları; kriyolit (hiper-sürücü
      bobini, helyum), sıvı metan (yakıt); kriyo-atölyede termal giysi.
- [x] 3.3 Obsidyen ovası (0.8): cam zeminde çınlayan adımlar, uzun yankı (radar ×1,6); plazma camı (sensör prizması:
      fener ×1,3), obsidyen (yansıtıcı zırh). Eksik: elektromanyetik sülükler.
- [x] 3.4 Cıva şelaleleri (0.8): cıva buharı maruziyeti, tok metal gümbürtüleri; sıvı metal (ana enerji hattı: yakıt
      ×0,85), manyetik cıva tortusu (koloni kalkan jeneratörü, bariyer iki kat).
- [x] 3.5 Asılı bazalt kuleleri (0.8): yalnız Atmosphere-X ile; taş gıcırtıları ve flüt armonileri; antigravitasyon tozu
      (gravitasyon kalkanı: kalkış yakıtı yarıya). Eksik: iplik böcekleri.
- [x] 4.1 Vanguard-01 enkazı (0.9): Gözcü Tepesi'nde eski mors sinyali (frekans ayarı) → doğunun kuzeyinde sarp kanyon;
      mors feneri konumlu duyulur; ses günlükleri (kodeks) ve topoğrafik harita (bütün noktalar bilinir); fırın
      jeneratörü Demir Kervan'la dökümhaneye (üretim ×1,25).
- [x] 4.2 Kseno-rezonans çanları ve tapınak (0.3).
- [x] 4.3 Fosil solucan tünelleri (0.9): mantar ormanının doğusu, Mammoth açar; fosil kseno-kabuk → araç zırhı (araçta
      maruziyet ×0,7) ve delici uç (derin damarda çift verim). Eksik: tünellerde yönü şaşıran sürüngen yankıları.
- [x] 4.4 Manyetik tersinme monoliti (0.9): doğu sektöründe; 30 m içinde yön bildirimleri karışır, 6 m içinde radar
      ve ortam susar; manyetik tohum → graviton dengeleyicisi (kuantum lab, ek donanım).
- [x] 4.5 Saklı jeotermal kseno-vaha (0.9): sırtlarda kalsit aralığı (kuş ve su sesleri konumlu sızar); maskesiz ilk
      alan, moral 100; tohum → Sera Hubu (nüfus artışı ×1,5).
- [x] 5 Güvensiz bölgeleri arındırma protokolü (0.9): altı bölgede (sırtlar, doğu, lav, plato, cıva, mantar) karakol
      yerinde dört adım: akustik profil (bölgenin bütün noktaları bulunmuş olmalı), tehdit izolasyonu (dondurucu köpük,
      topraklama çubuğu, sonik kovucu), stabilizasyon (sismik dengeleyici, nötralizasyon kulesi), ikmal karakolu.
      Güvenli bölgede tehlike kalkar; karakol 180 sn'de bir bölgenin yataklarından koloniye taşır.
- [~] 6 Terraforming katmanları (0.9): dört katman, yerel girdi teslimi [x] (koloni yönetimi menüsü); etkiler [x]
      (atmosfer: maskesiz, hidroloji: barınma +20, biyosfer: nüfus ×1,5, manyetosfer: kalkan 3); uzay girdileri
      (Vaka 1, 2, 5, 7) [ ] Faz 4 görevlerine bağlı.
- [~] 7 Uzaydan gelen ırklar ve yapılar (0.9): dört yapı tesis listesinde [x], kilitleri uzay görevlerinin bayraklarına
      bağlı [ ] Faz 4.
- [x] 8 Yerel mini görevler (1.0, mini.js): telsizden sırayla gelir (biri bitince 150 sn sonra, koşulu sağlanan sıradaki).
      8.1.1 fotonik mantar hasadı (olgun kristaller çınlar, spor yoğunluğu, terminalden teslim) · 8.1.2 kriyojenik vana
      (dört bağlantıdan kaçak tıslaması, termal meşale) · 8.1.3 obsidyende kayıp ekip (radar kör, korna sesini izle)
      · 8.1.4 vaha su kanalı (sonik patlatıcı: frekans ayarı) · 8.2.1 akademide çeviri krizi (iki uzman, sentez seçimi;
      akademi gerekir) · 8.2.2 metan kubbesi basıncı (üç kompresör: valf dengeleme; kseno-habitat gerekir) · 8.3.1 kör
      solucan göçü (150 sn içinde üç frekans kazığı) · 8.3.2 Vanguard yağmacıları (yavaş yürüyerek sız, kesiciyle
      sersemlet; hızlı yürürsen alarm). 8.2'nin ikisi ırk yapılarını bekler (Faz 4).
- [x] 9 Koloni kademeleri: 1-3 (Düşmüş İskelet → Sağlamlaşmış Vaha → Endüstriyel Koloni); 4 Galaktik Başkent (0.9):
      dört terraforming katmanı + altı bölge güvenli + dört ırk yapısı; eksikler koloni yönetiminde söylenir.

## 4. araclar-ve-gemi-filosu.md
- [x] 1.1 Yüzey Araçları Montaj Hangarı (0.6): dökümhane ve elektrik şebekesi ister; şasi çeliği atölyesi; vadide hangar.
- [x] 1.2 Kuru tersane ve kızak: Kademe I kızak (0.5), Kademe II Manyetik Beşik ve Kademe III Hisar Tersanesi (0.6);
      gemi sınıfları kızak kademesine bağlı.
- [x] 1.3 Kuantum itki ve reaktör kalibrasyon laboratuvarı: Graviton ve Reaktör Laboratuvarı (yakıt, reaktör, kalkan
      projektörü) ve rezonatör kalibrasyonuyla açılan Kuantum Laboratuvarı (sürücü, zaman çapası, takonik çözücü,
      ters itki bobinleri) (0.7).
- [x] 2 Kademe 1 Kıvılcım: 2 oda, türbin sesi, belgedeki malzemeler (150 plaka, 40 kablo, 25 litre yakıt, 1 iyon reaktörü).
- [x] 2 Kademe 2 Rüzgarkıran (4 oda, çift pistonlu homurtu; 350 alaşım, 120 şasi çeliği, 80 saf kristal, 60 L plazma,
      1 füzyon reaktörü) ve Kademe 3 Aethel Muhafızı (6 oda, manyetik uğultu; 700 zırhlı plaka, 250 kseno-alaşım,
      40 L graviton, 120 helyum tüpü, 1 kalkan projektörü) üretilip kızakta toplanır (0.6).
- [~] 2 Kademe 4 Gökdelen (8 oda) ve Kademe 5 Hisar-ı Kadim (12 oda): odalar, sesler, montaj aşamaları ve belgedeki
      malzemeler tanımlı; Kademe 4-5 malzemelerinin tarifleri uzay görevlerinin şemalarıyla açılır (1.1): kompozit blok
      (Prometheus, Pyros-7), nötron cevheri → nötron matris (G-07, G-17), süper alaşım (Aethel-9), kadim disk (G-10,
      kadim mezar), kuantum çekirdeği (Kuantum Korveti).
- [x] 3 Yüzey araçları (0.6): Çöl Tilkisi (hız ×2,6, zehir ×0,4, sonar radarı ×1,4, manyetik vızıltı), Mammoth (derin
      graviton kuyusunu kazar, zehir ×0,2, palet gümbürtüsü), Demir Kervan (ocaklardan koloniye 3 dakikada bir bazalt ve
      titanyum), Atmosphere-X (hız ×4, jet sesi), Akrep (2 dakikada bir yataklardan bir birim); belgedeki üretim girdileri.
      Atmosphere-X kulelere iner (0.8). Eksik: Çöl Tilkisi'nin sinyal feneri fırlatıcısı.
- [~] 4 Malzeme matrisi: plaka, şasi çeliği, saf kristal, plazma yakıtı, graviton yakıtı (derin kuyudan, Mammoth'la),
      helyum-3, kseno-kristal (salonda yenilenen damar), polimer [x]; nötron-yoğun çekirdek [x] (G-07, 1.1).
- [x] 5 Dokunsal iç gezinti: iki parmakla sağa-sola oda, kapı tıslaması ve kilit sesi, her odanın ortam sesi
      (köprü, reaktör, revir, kargo), dokunma terminal (reaktörde güç dağıtımı, revirde tıbbi tarama), basılı tutma
      mürettebatla konuşma. Bütün sınıfların odaları tanımlı.

## 5. savas-yetenek-ve-murettebat-mekanikleri.md
- [ ] 1 Reaktif akustik savaş modu (1.1 konumlandırma, 1.2 tur yapısı) — Faz 5.
- [ ] 2 Savaş içi hareket kütüphanesi — Faz 5.
- [ ] 3.1 Kaptan yetenek ağacı (4 dal) · [ ] 3.2 Gemi modifikasyon ağacı. Tecrübe puanı birikiyor, harcanmıyor.
- [~] 4.1 Prosedürel personel: ad, uzmanlık, nitelik [x]; klipsomanyak ve klostrofobik etkileri [ ].
- [~] 4.2 Görev yerleri: Kıvılcım'da kokpit (telsiz subayı: fenerleri uzaktan duyar) ve kargo (ikmal) [x];
      başçarkçı, topçu, başhekim büyük gemilerde [ ].
- [~] 4.3 Telsiz bildirimleri: üç tonlu zil, çift dokun dinle, ertele, kayıtlar [x]; seferde rastgele olaylar ve
      karar isteyen krizler [ ].
- [x] 5.1 Nüfus ve iş gücü: barınma, doğal artış, yaşam bloğu, üç sektöre atama ve etkileri (0.5); mülteci ve
      kazazede göçü uzay görevleriyle (1.1: Aethel-9, Orion-Omega, Ayna Koridoru, Viridion, hastane gemisi).
- [~] 5.2 Moral nabzı: inişte koloninin uğultusu (canlı ya da huzursuz) ve üretime etkisi [x]; moralin düşme
      nedenleri ve yerel krizlerle onarım [ ].
- [~] 6 Dokunsal ve sesli arayüz matrisi: yüzey, menüler, mini oyunlar, gemi, seyir [x]; savaş [ ].
- [ ] 7 Sistem entegrasyonu ve oyun çevrimi (savaş ve yeteneklerle).

## 6. derin-uzay-gorevleri.md (Cilt I)
- [x] 1 Seyrüsefer hareketleri: yukarı itki, aşağı fren, sağa-sola pruva ve stereo kilit, basılı tut radar, çift
      dokun kenetlenme; operasyonda iki parmakla çevirme frekans, kıstırıp açma dron (1.1, jestler.js onKistirAc).
- [ ] 1 Otomasyon: otomatik kenetlenme bilgisayarı, akustik filtre, toplama dronları.
- [x] 2-4 Görevler G-01 … G-12 (1.1): belgedeki dört adım operasyon adımı olarak; koloniye katkılar (rota haritaları:
      fener ×1,2; hidrojen; astrogatörler; plazma yakıtı; kalkan projektörü; ticaret rotası; nötron cevheri; gizlenme
      modülü; kseno-yaşam; kadim disk şeması; füzyon teorisi üretim ×1,15; kripto kodları).
- [x] 5 Görev ve donanım matrisi (1.1): her görevin iki donanımı ayrı üretilir (veri/uzayGorevleri.js G_DONANIMLARI).
- [x] 6 Görevlerin kule menziliyle ortaya çıkması (1.1): sinyal kulesi ve gemiyle ilk dalga; tamamlanan operasyon
      sayısı arttıkça yeni dalgalar telsizden haber verilerek haritaya düşer.

## 7. derin-uzay-gorevleri-cilt-2.md
- [~] 1 Genişletilmiş dokunsal kontrol (1.1): süzülme dengesi (iki ton), linguistik çevirici (iki parmakla çevirme),
      kademeli tahliye (iki ya da üç parmakla kaydırma; üç parmak ayrımı yok, iki yeter).
- [x] 2 Kategori D G-13 … G-16 (1.1): Kithron, Vaelin (sporlar ve enzimler), Nyxar (elçilik, karanlık madde zırhı),
      Oron (bilgin, üretim ×1,2); ırk teması bayrağı (kseno-habitat).
- [x] 3 Kategori E G-17 … G-20 (1.1): Pyros-7, Glies-9b (tohumlar, nüfus ×1,2), halka dünyası (terraform girdileri),
      Viridion-IV (botanikçiler, panzehir: maruziyet ×0,7). İniş operasyon adımları olarak (ayrı yüzey yok).
- [x] 4 Kategori F G-21 … G-24 (1.1): Orion-Omega (nüfus ve barınma +30, tersane +2), Korsan Kafesi (mikroçip,
      ticaret), hastane gemisi (Bölge Hastanesi tesisi), kara delik gelgiti (tarafsızlık: ticaret iki katı, itibar).
- [x] 5 Gereksinim matrisi (1.1) · [~] 6 Ekosistem bütünleşmesi (sonuçlar koloniye işler; savaş Faz 5).

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
1. Faz 4 kalanı: 20 keşfedilebilir gezegen (kesfedilebilir-gezegenler-rehberi), gözlem gereçleri ve 16 fenomen,
   Evren Kütüphanesi ve prestij; derin-uzay-gorevleri bölüm 1 otomasyon (otomatik kenetlenme, akustik filtre, dronlar).
2. Faz 5: savaş modu, yetenek ağaçları, ElevenLabs sesleri, cila.
