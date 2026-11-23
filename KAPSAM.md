# Belge kapsamı: Bahtiyar'ın 17 belgesinin her bölümü ve durumu

Murat'ın isteği (20 Kasım 2026): "Belgedeki hiçbir şeyi atlama." Bu liste belgeler/ klasöründeki dokuz belgenin
bütün bölümlerini sırayla sayar (21 Kasım: v3 paketiyle sekiz belge daha geldi, bölüm 10-17; 22 Kasım: v4 paketiyle 39 belge, bölüm 18 ve sonrası). Her sürümde güncellenir; bir bölüm burada "yapıldı" olmadan atlanmış sayılmaz.

İşaretler: [x] yapıldı · [~] kısmen (ne eksik yazılı) · [ ] yapılmadı (planlanan sıra yazılı).
"Telefonda denenmedi" uyarısı bütün maddeler için geçerlidir; ancak Murat Expo Go'da denediğinde doğrulanır.

## 1. gelistirici-entegrasyon-rehberi-ve-yol-haritasi.md
- [x] 1.1 Dikey ekran zorunluluğu (app.json portrait).
- [x] 1.2 Erişilebilirlik ve dokunmatik girdi katmanı: kendi sesli rehber, hareketler (jestler.js).
- [x] 2.1 Çıkışta otomatik kayıt (AppState, 10 sn, her eylem; yedekli).
- [x] 2.2 Elle kayıt: kapsüldeki merkez terminali, 3 yuva.
- [x] 2.3 Kayıt edilen veri kapsamı: koloni, gemi ve filo, mürettebat (stres dahil), görevler, operasyon ve savaş
      durumu (yarıda kalan operasyon ve çatışma kayıttan sürer; 1.4), kodeks, gezegen keşifleri.
- [~] 3.1 Drive ortam sesleri: Efektler klasörlerinden kullanılıyor. Ambians klasöründeki dosyalar 14 MB; bağlayıcı
      10 MB'tan büyüğünü indiremiyor. Bahtiyar ya da Murat 10 MB altı parçalar koyarsa eklenecek.
- [x] 3.2 ElevenLabs (1.5, 1.7): savaş uyarıları (plazma şarjı, torpido, iyon ıslığı), kalkan, keşif zili, deklanşör;
      1.7'de 33 telsiz ve gemi içi konuşması seslendirildi (15 görev ve bölge bildirimi, 8 yerel görev çağrısı, 4 sefer
      olayı, 6 savaş uyarısı). Üç öncü sesi: başçarkçı Emir, telsizci Agit Taşdemir, hekim Öykü Arel (ElevenLabs v4).
      Yüzey telsizi bant süzgeçli ve çok kısık parazitli, gemi içi interkom yankılı ve parazitsiz, savaş telsizi dar
      bant ve sert. Adı değişen konuşmalar (koloni bilgisayarı, klostrofobi olayı, sonradan alınan subaylar) sentez
      sesle kalır.
- [x] 4 Belge okuma sırası (CLAUDE.md'de).
- [x] 5 Veri modelleri: ColonyWorld [x], Starship [x] (sınıf, odalar, gövde, kalkan, silahlar, kargo, motor sesi),
      CrewMember [x] (1.4: stres darbelerle artar, kolonide sıfırlanır; verimlilik görev yeri etkisini çarpar), SpaceMission [x] (1.1, d.op), CombatSession [x] (1.3, d.savas),
      ExoPlanet [x] (1.2, gezegen operasyonları), CodexEntry [x] (salon, ses imzası tonu).
- [x] 6 Master prompt ilkeleri (görselsiz, Türkçe, ses ve hareket).
- [~] 7 Yol haritası: Faz 1 [x], Faz 2 [x], Faz 3 [x], Faz 4 [x], Faz 5 [~]. Ayrıntı aşağıda.

## 2. uzay-oyunu-tasarim-ve-senaryo.md
- [x] 1 Gezegenin dört sektörü: Vadi-i Sukût [x], Manyetik Sırtlar [x], Kadim Krater ve harabeler [x],
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
      fener ×1,3), obsidyen (yansıtıcı zırh). Elektromanyetik sülükler (1.4: konumlu cızırtı).
- [x] 3.4 Cıva şelaleleri (0.8): cıva buharı maruziyeti, tok metal gümbürtüleri; sıvı metal (ana enerji hattı: yakıt
      ×0,85), manyetik cıva tortusu (koloni kalkan jeneratörü, bariyer iki kat).
- [x] 3.5 Asılı bazalt kuleleri (0.8): yalnız Atmosphere-X ile; taş gıcırtıları ve flüt armonileri; antigravitasyon tozu
      (gravitasyon kalkanı: kalkış yakıtı yarıya). İplik böcekleri (1.4: ağların çınlaması).
- [x] 4.1 Vanguard-01 enkazı (0.9): Gözcü Tepesi'nde eski mors sinyali (frekans ayarı) → doğunun kuzeyinde sarp kanyon;
      mors feneri konumlu duyulur; ses günlükleri (kodeks) ve topoğrafik harita (bütün noktalar bilinir); fırın
      jeneratörü Demir Kervan'la dökümhaneye (üretim ×1,25).
- [x] 4.2 Kseno-rezonans çanları ve tapınak (0.3).
- [x] 4.3 Fosil solucan tünelleri (0.9): mantar ormanının doğusu, Mammoth açar; fosil kseno-kabuk → araç zırhı (araçta
      maruziyet ×0,7) ve delici uç (derin damarda çift verim). Tünel sürüngenlerinin yankılanan ayak sesleri (1.4).
- [x] 4.4 Manyetik tersinme monoliti (0.9): doğu sektöründe; 30 m içinde yön bildirimleri karışır, 6 m içinde radar
      ve ortam susar; manyetik tohum → graviton dengeleyicisi (kuantum lab, ek donanım).
- [x] 4.5 Saklı jeotermal kseno-vaha (0.9): sırtlarda kalsit aralığı (kuş ve su sesleri konumlu sızar); maskesiz ilk
      alan, moral 100; tohum → Sera Hubu (nüfus artışı ×1,5).
- [x] 5 Güvensiz bölgeleri arındırma protokolü (0.9): altı bölgede (sırtlar, doğu, lav, plato, cıva, mantar) karakol
      yerinde dört adım: akustik profil (bölgenin bütün noktaları bulunmuş olmalı), tehdit izolasyonu (dondurucu köpük,
      topraklama çubuğu, sonik kovucu), stabilizasyon (sismik dengeleyici, nötralizasyon kulesi), ikmal karakolu.
      Güvenli bölgede tehlike kalkar; karakol 180 sn'de bir bölgenin yataklarından koloniye taşır.
- [x] 6 Terraforming katmanları (0.9): dört katman, yerel girdi teslimi (koloni yönetimi menüsü); etkiler
      (atmosfer: maskesiz, hidroloji: barınma +20, biyosfer: nüfus ×1,5, manyetosfer: kalkan 3); uzay girdileri
      Vaka 1, 2, 5, 7 görevlerinden (1.1).
- [x] 7 Uzaydan gelen ırklar ve yapılar (0.9, 1.1): dört yapı; akademi (Vaka 1 mühendisleri + Denek 07), kseno-habitat
      (G-13 … G-16 ırk teması), mülteci kampüsü (Aethel-9), Tina çekirdeği (Vaka 6).
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
- [x] 2 Kademe 4 Gökdelen (8 oda) ve Kademe 5 Hisar-ı Kadim (12 oda): odalar, sesler, montaj aşamaları ve belgedeki
      malzemeler tanımlı; Kademe 4-5 malzemelerinin tarifleri uzay görevlerinin şemalarıyla açılır (1.1): kompozit blok
      (Prometheus, Pyros-7), nötron cevheri → nötron matris (G-07, G-17), süper alaşım (Aethel-9), kadim disk (G-10,
      kadim mezar), kuantum çekirdeği (Kuantum Korveti).
- [x] 3 Yüzey araçları (0.6): Çöl Tilkisi (hız ×2,6, zehir ×0,4, sonar radarı ×1,4, manyetik vızıltı), Mammoth (derin
      graviton kuyusunu kazar, zehir ×0,2, palet gümbürtüsü), Demir Kervan (ocaklardan koloniye 3 dakikada bir bazalt ve
      titanyum), Atmosphere-X (hız ×4, jet sesi), Akrep (2 dakikada bir yataklardan bir birim); belgedeki üretim girdileri.
      Atmosphere-X kulelere iner (0.8). Çöl Tilkisi'nin sinyal feneri fırlatıcısı (1.4: menüden fener bırak; konumlu bip, Yerler'de).
- [x] 4 Malzeme matrisi: plaka, şasi çeliği, saf kristal, plazma yakıtı, graviton yakıtı (derin kuyudan, Mammoth'la),
      helyum-3, kseno-kristal (salonda yenilenen damar), polimer [x]; nötron-yoğun çekirdek [x] (G-07, 1.1).
- [x] 5 Dokunsal iç gezinti: iki parmakla sağa-sola oda, kapı tıslaması ve kilit sesi, her odanın ortam sesi
      (köprü, reaktör, revir, kargo), dokunma terminal (reaktörde güç dağıtımı, revirde tıbbi tarama), basılı tutma
      mürettebatla konuşma. Bütün sınıfların odaları tanımlı.

## 5. savas-yetenek-ve-murettebat-mekanikleri.md
- [x] 1 Reaktif akustik savaş modu (1.3, uzay/savas.js): savaş duruşunda dolaşım durur, düşmanın motoru konumlu;
      pruva kilidi tonu; tur yapısı (oyuncu hamlesi → etki → düşmanın 1,5-3 sn uyarı sesi: plazma şarjı, torpido
      kükremesi, iyon ıslığı → reaktif savunma penceresi → değerlendirme); hasarlı sistemler savunmayı kısıtlar
      (iticiler: kaçınma yok, kalkan ısınması, reaktör kilidi: tepkisiz darbe). Korsan karşılaşmaları seferde.
- [x] 2 Hareket kütüphanesi (1.3): dokun birincil ateş, yukarı kaydır torpido (kilit ve şarj), kalkan (iki parmakla
      basılı tutma yerine iki parmakla dokunma), sesin ters yönüne kaydır kaçınma, iki parmakla çevir kalkan frekans
      modülasyonu (eşleşince kalkan delinir), uyarıda çift dokun karşı ateş.
- [x] 3.1 Kaptan yetenek ağacı (1.3, veri/yetenek.js): dört dal, on iki yetenek, sefer tecrübesiyle sırayla; hepsi
      oyuna işler (kilit açısı, kritik vuruş, uzun pencere, salvo, bastırma, nara, basınç disiplini, aşırı yükleme,
      hurda yama, chaff, dil sezgisi, ateşkes). Menü: kokpit terminali ve koloni yönetimi.
- [x] 3.2 Gemi modifikasyon ağacı (1.3): K1-K5 belgedeki tesislerde üretilip takılır (dökümhane, itki hangarı,
      reaktör lab, biyo-kubbe/kseno lab, komuta merkezi) ve savaşa işler.
- [x] 4.1 Prosedürel personel (1.3): ad, uzmanlık, nitelik; soğukkanlı (savaşta tamir), klipsomanyak (her dördüncü
      toplamada fazladan parça), ses hassasiyeti (düşman silahını önceden söyler), klostrofobik (uzun seferde kriz).
      Tersanede subay istihdamı (boştaki kolonist mürettebata katılır, en çok 12).
- [x] 4.2 Görev yerleri (1.3): Başçarkçı (arızaları hızlı onarır), Telsiz Subayı (fenerleri uzaktan duyar, düşman
      kilitlenmesini önceden söyler), Taktik Nişancı (birincil hasar ×1,3), Başhekim ve İkmal Subayı (sefer olaylarında).
- [x] 4.3 Telsiz bildirimleri ve seferde rastgele karar olayları (1.3, uzay/sefer.js): ikmal mekiği, mekanik arıza
      (hız sınırı ya da yedek parça), ortak alaşım, korsan karartması (rota değiştir ya da çatış), klostrofobi.
- [x] 5.1 Nüfus ve iş gücü (0.5, 1.1 mülteciler).
- [x] 5.2 Moral nabzı (0.5) ve düşme nedenleri (1.3): radyasyon fırtınası (kalkan jeneratörü yoksa), yetersiz besin
      (yirmiden fazla nüfus ve sera yok), seferde kaybedilen çatışmanın yası; yerel krizler (1.0) morali onarır.
- [x] 6 Dokunsal ve sesli arayüz matrisi (1.3 savaş dahil). Mürettebat listesi menüde, atama oda seçerek.
- [x] 7 Sistem entegrasyonu (1.3): gezegen → kalkış (yetenek ve mürettebat) → uzay (savaş) → kriz (telsiz) → dönüş.

## 6. derin-uzay-gorevleri.md (Cilt I)
- [x] 1 Seyrüsefer hareketleri: yukarı itki, aşağı fren, sağa-sola pruva ve stereo kilit, basılı tut radar, çift
      dokun kenetlenme; operasyonda iki parmakla çevirme frekans, kıstırıp açma dron (1.1, jestler.js onKistirAc).
- [x] 1 Otomasyon (1.2): otomatik kenetlenme bilgisayarı (iki kat mesafe, hız 3'e kadar), akustik filtre (frekans
      kilit payı ×1,6), toplama dronları (operasyon sonrası enkazdan titanyum ve bazalt).
- [x] 2-4 Görevler G-01 … G-12 (1.1): belgedeki dört adım operasyon adımı olarak; koloniye katkılar (rota haritaları:
      fener ×1,2; hidrojen; astrogatörler; plazma yakıtı; kalkan projektörü; ticaret rotası; nötron cevheri; gizlenme
      modülü; kseno-yaşam; kadim disk şeması; füzyon teorisi üretim ×1,15; kripto kodları).
- [x] 5 Görev ve donanım matrisi (1.1): her görevin iki donanımı ayrı üretilir (veri/uzayGorevleri.js G_DONANIMLARI).
- [x] 6 Görevlerin kule menziliyle ortaya çıkması (1.1): sinyal kulesi ve gemiyle ilk dalga; tamamlanan operasyon
      sayısı arttıkça yeni dalgalar telsizden haber verilerek haritaya düşer.

## 7. derin-uzay-gorevleri-cilt-2.md
- [x] 1 Genişletilmiş dokunsal kontrol (1.1): süzülme dengesi (iki ton), linguistik çevirici (iki parmakla çevirme),
      kademeli tahliye (iki ya da üç parmakla kaydırma; iki parmak da kabul edilir).
- [x] 2 Kategori D G-13 … G-16 (1.1): Kithron, Vaelin (sporlar ve enzimler), Nyxar (elçilik, karanlık madde zırhı),
      Oron (bilgin, üretim ×1,2); ırk teması bayrağı (kseno-habitat).
- [x] 3 Kategori E G-17 … G-20 (1.1): Pyros-7, Glies-9b (tohumlar, nüfus ×1,2), halka dünyası (terraform girdileri),
      Viridion-IV (botanikçiler, panzehir: maruziyet ×0,7). İniş operasyon adımları olarak (ayrı yüzey yok).
- [x] 4 Kategori F G-21 … G-24 (1.1): Orion-Omega (nüfus ve barınma +30, tersane +2), Korsan Kafesi (mikroçip,
      ticaret), hastane gemisi (Bölge Hastanesi tesisi), kara delik gelgiti (tarafsızlık: ticaret iki katı, itibar).
- [x] 5 Gereksinim matrisi (1.1) · [x] 6 Ekosistem bütünleşmesi (sonuçlar koloniye işler; savaş 1.3).

## 8. kesfedilebilir-gezegenler-rehberi.md
- [x] 1 Yörüngesel ve yüzey araştırma kontrolleri (1.2): iki parmakla çevirme spektrometre, basılı tut deklanşör,
      çift dokun iniş, kaydırarak yüzey aracı sürme (iki keşif noktası), iki parmakla çift dokun numune kolu, aşağı
      hızlı kaydırma ve basılı tutma lazer sondaj.
- [x] 2 Yirmi gezegen (1.2, veri/gozlem.js GEZEGENLER): her birinin akustik kimliği, iki yüzey noktası, gözlemi,
      numunesi, kazanımı ve itibarı (+500 … +1000); atmosferi sert olanlarda iniş dengesi. Kazanımlar koloniye işler
      (malzemeler, yakıt tasarrufu, tarım ×1,3, kadim şema, takyon: kalkış yakıtsız, vb.).
- [x] 3 Keşif matrisi (1.2): her gezegenin iniş aracı ayrı üretilir (araç hangarı, 20 araç) + spektrometre + kamera.
- [x] 4 Oyun döngüsüne entegrasyon (1.2): kule ve gözlem gereciyle, tamamlanan operasyonlar arttıkça haritaya düşer;
      numuneler sanayiye, gözlemler Evren Kütüphanesi'ne.

## 9. derin-uzay-kesifleri-ve-evren-kutuphanesi.md
- [x] 1 Serbest seyrüsefer keşif mantığı (1.2, uzay/fenomen.js): zorunluluk yok; gözlem yok etmek değil kaydetmek.
- [x] 2 Gözlem gereçleri (1.2): rezonans alan kamerası, radyo-spektrometre, mikro-gravimetre, kseno-lidar, kripto-arşivleyici
      (radyasyon yalıtımlı kamera = kamera + radyasyon zırhı; biyo-rezonans kamera = kamera + harmonik rezonatör).
- [x] 3 Dokunsal ve akustik fotoğraflama (1.2): basılı tut vizör → iki parmakla çevir odak → pozlama (basılı tut; iki
      parmak basılı tutma yerine tek parmak) → çift dokun deklanşör → yukarı hızlı kaydır ışınlama.
- [x] 4 On altı kozmik fenomen (1.2): her birinin akustik imzası (kendi tonunda konumlu fener), gereçleri, kütüphane
      kaydı, gözlemcilerin tepkisi (koloniye etkisi) ve itibarı; özel kayıt hareketleri (lidar, ritim, gravite dengesi, fiske).
- [x] 5 Veri iletimi, Evren Kütüphanesi ve itibar (1.2): menüde "Evren Kütüphanesi": dört salon (Astrofizik,
      Kseno-Biyoloji, Tarih ve Sanat, Anomali); her pano kaydın ses imzasını çalar ve makalesini okur. Dört itibar
      kademesi (0 / 1000 / 5000 / 12000): araştırmacılar gelir, elçiler ticaret açar, moral.
- [x] 6 Keşif, gereç ve itibar matrisi (1.2) · [x] 7 Kodlama notu: her sektör atlamasında (30 sn seyir) yüzde 35,
      keşif zili; zaman sınırı yok; keşfedildi mührü, yeniden rastlanınca dinlenir.

## 10. tonoflenya-ve-yeni-sistemler-gelistirici-yonergesi.md (v3 paketinin yönergesi)
- [x] 1-2 Yeni belgeler ve okuma sırası (CLAUDE.md): tarım → Malken → kadim tarihçe → atlas → eşya-zanaat → final → yan görevler.
- [x] 3.A Modüler ekim parselleri (2.0): kademe 1 dört yatak (elle sulama, gece soğuması), kademe 2 sekiz yatak (buhar
      kanalı ısıyı tutar), kademe 3 on altı (dört kseno-bölme; Kseno-Biyoloji Kubbesi gerekir), kademe 4 otuz iki
      (sekiz bölme; hasat yüzde kırk kısa; reaktör laboratuvarı gerekir).
- [x] 3.B Kolonist atama (2.0): boştaki kolonist yatağa atanır; sular, ısıyı tutar, olgun ürünü toplar, aynı tohumdan
      yeniden eker. İnsan: koloni ürünlerinde büyüme +%20. Kaelith botanikçisi (kadim mezar görevinden sonra): spor ve
      kristal bitkilerinde çift tohum, +%30 geri kazanım, çürüme yok. Malken çırağı: işlenen erzaklar bir sefer fazla
      sürer; Malken'ler Tonoflenya'dan gelir, o bölüm yapılınca açılır.
- [x] 4.A Altı nöbetli Yıldız Zamanı (2.0, zaman.js): nöbet 20 dakika, gün 2 saat. Yeşil Öğle'de tarlalar +%25 hızlı,
      Altın Gece ve Mavi Akşam'da ısıtılmayan teras soğur.
- [x] 4.B Nöbet değişiminde o yıldızın üç notalı çan akoru; sağ üst köşeye çift dokun (ve menüde "Yıldız Zamanı"):
      gün, nöbet, kalan dakika, tarla notu. Klavye "T" tuşu yok (telefonda klavye yok). Seyahatte zaman gerçek
      zamanlı akar; Tonoflenya'ya hiper-sıçrama (2.1) sekiz saat ileri sarar (koloni, tarla ve atölyeler işler).
- [x] 5.A Yıldız Ekolü Kıdemi (2.4, tonoflenya/subay.js): altı ekol, dört kademe (Çırak/Öncü 0, Seyrüsefer Uzmanı 100,
      Yıldız Muhafızı 300, Baş-Rezonatör 700 puan); menüde "Yıldız Ekolü kıdemi". Puan: Zorah harabeleri Sarı (+25, her
      yerde bir kez), kronik Sarı, ticaret Sarı; Mormon akıntıları Mavi (+40), savaşta doğru savunma ve fenomen Mavi;
      melez Yeşil (+40), hasat ve imbik Yeşil; zafer Kırmızı (+30), dökümhane Kırmızı; iğne (+50), YGK frekansı ve
      aether laboratuvarı Mor; yeni Tonoflenya bölgesi, yolculuk ve operasyon Gümüş. İstasyondaki subay da yarısını alır.
      Kabiliyetler: belgenin üç örneği aynen (Mavi 2 pusuları yüzde yirmi beş uzaktan duyma: savaş uyarısı ×1,25;
      Kırmızı 3 zırh delici aether mühimmatı; Mor 4 taktik teleport: uyarıda üç parmakla dokun). [~] Öteki on beşi
      belgede yok; aynı ilkeyle (sayısal can değil yeni yetenek) ekolün alanından eklendi (Bahtiyar değiştirebilir).
- [x] 5.B Rastgele karşılaşma motoru (2.4, sefer.js): korsan pususu (1.3), sürüklenen sandık (sesli kilit: dört ton;
      ganimet saf aether, prizma, nadir tohum ya da ışık tozu), astral fırtına (frekans tut: kalıcı aether verimi,
      yakıt yüzde beş az, en çok yirmi beş), kaçak mülteci filikası (kurtar: Aethelis'te üç nüfus, Tonoflenya'da
      kantonlara yerleşir: itibar ve lira). Yetmiş beş saniyede bir yüzde yirmi beş (Sinha sonarıyla 1,5 kat); tekrar
      eden operasyonlar sayılmaz.
- [x] 6.A zaman modeli · [x] 6.B ekim yatağı ve işçi modeli · [x] 6.C prosedürel istasyon modeli (2.4): altı istasyon
      (reaktör, silah, revir, dümen, sonar, hangar), her birinde subay (ad, köken, ekol, kıdem, aktif yetenek, pasif);
      menüde "Subaylar ve istasyonlar".

## 11. tarim-ve-kseno-botanik-rehberi.md
- [x] 1 Çekirdek döngü (2.0): toplama → sera → hasat → mutfak/eczane/dökümhane. Erzaksız uzun seferden sonra (5 dk+)
      sentetik küp yorgunluğu: moral −3. Tarım alanı ayrı iç mekân (1.15), kendi ortam sesi.
- [x] 2.1 Jeotermal hidroponik teraslar · [~] 2.2 Kseno-habitat bölmeleri: kademe 3'ten; atmosfer (metan, kükürt,
      vakum, radyasyon) bölmenin geniş sıcaklık aralığıyla (−200 … 400 °C) temsil ediliyor, ayrı gaz ayarı yok;
      kendi ortam sesi (ElevenLabs) · [x] 2.3 Saklı vahanın dört açık toprak parseli.
- [x] 3 On yedi tür (A beş, B beş, C yedi), her birinin ortamı, süresi, su ve sıcaklık ihtiyacı, olgunluk sesi ve
      çıktısı. Tohumlar: kapsülün kesesi (ilk giriş), Vanguard-01 kasaları, yabani bitkiler (mantar ormanı, tüneller,
      vaha; 10 dakikada bir), derin uzay görevleri (G-13, G-14, G-17, G-18, kadim mezar, moloz kuşağı, zaman havzası).
- [x] 4 Jestler: iki parmakla sürtme çapa (üç vuruş, sert titreşim), çift dokun ekme, iki parmakla çevirme vana, sağa
      sola sıcaklık, yukarı hasat (çift titreşim). Durum sesleri: kuru çatırtı, çürük şapırtı, sağlıklı damla.
      [~] Olgunluk: ortak olgunluk zili + bitkinin kendi tonu; her bitkinin kendine özel kaydı yok, metinde anlatılıyor.
- [~] 5.1 Mutfak tarifleri: beşi de var. Ziyafetin "+2 eylem puanı" oyunda eylem puanı olmadığından ilk iki savaş
      uyarısına +1 sn. [x] 5.2 Eczane (merhem, şok iğnesi, detoks) · [x] 5.3 Biyo-dökümhane (katalizör, gövde macunu,
      fotonik pasta) ve bölüm 3'teki her bitkinin ve melezin kendi çıktısı (33 tarif). Erzak kalkışta gemiye yüklenir.
- [~] 6 Beslenme matrisi: beş topluluk beş dakikada bir uygun hasattan yer (bilgisayar yasak gıdayı vermez; yanlış
      besleme seçeneği yok). Tokken: Vaelin metan yakıtı ×1,5, Kithron lens ve pasta çift, Aethel-9 ocaklar ×1,25,
      insan sera hubu cezası yok; aç: moral −2. Kaelith'in terraforming hızlandırması yok.
- [x] 7 Melezleme: Kseno-Biyoloji Kubbesi; iki tohumun biyo-titreşimi iki parmakla çevrilerek tek harmoniye getirilir,
      iki döngü kuluçka. Dört melez (güneş-buz, demir-kök, altın nöro-hurma, zaman-kristal) ve ürünleri.
- [x] 8 Sesler (ElevenLabs): çapa, ekme, vana, hasat, olgunluk zili, melezleme, kuru, çürük, sağlıklı; kseno-bölme
      ortamı. Sera ortamı Murat'ın kaydı (ortam_tarim), vaha ortamı 0.9'dan.

## 12. tonoflenya-ve-malken-medeniyeti.md
- [x] 1 Hekzat sistemi (2.1): altı yıldızın kodeks kaydı; Yıldız Zamanı'nda hâkim yıldızın işi güçlenir (Zhaor fener
      ×1,1, Varek üretim ×1,15, Axira tarla ×1,25, Elyndra melezleme eşiği ×1,5, Sinha hız ×1,1 ve savaş hasarı ×0,9,
      Uma nüfus ×1,2). Varışta altı yıldız sahnesi; Tenohris'in Aether Çekirdeği altı yıldızın tonlarını çalar.
- [x] 2 Malken ırkı (2.1): kodeks (rezonans kriptosunda); Malken'ler konuşulan kişiler (kabul görevlisi, lonca
      ihtiyarı, Meclis sözcüsü, iskele görevlisi, Arin keşişi, Veradon gümrükçüsü); Malken çırakları koloniye gelir.
- [x] 3 Malkenia (2.1): altı halka ayrı mekân, dıştan içe Zhaor, Varek, Axira, Sinha, Uma, Elyndra; her birinin ortam
      sesi ve işi (kalkan kulesi, aether dökümhanesi: 1 aether → 30 zırhlı plaka, asma bahçe, kuantum pilonuyla koloniye
      bağlantı, altın meydanda halk, lonca). 3.1 Tenohris Sarayı ve Aether Çekirdeği · 3.2 Kara Göl (yasaklı; arşivdeki
      kaydı dinleyen kayıtlı kaptana koruma mührü), batık kule · 3.3 Doğu çöl kantonları ve aether hamamı (günde bir:
      mürettebatın stresi sıfır).
- [x] 4 Güney havzası (2.1): güney karavan hattıyla Flee Plee; doğu ucunda kuantum faz kapısıyla Aether-Dock (kadırga
      montaj kızağı); rezonans kayığıyla (iskele görevlisi, YGK kaydından sonra) Fenrir (foton tozu, nöbette bir),
      Uçan Arin Adası (keşişin dersi) ve Veradon (gümrük ve han).
- [x] 5 YGK Akademi (2.1): on bir kat, asansörle: 6 Zirve İğnesi (altı yıldızı hizalama, frekans ayarı → Malazar izni),
      5 fırlatma hangarı (gemi buraya iner; bakım, Aethelis'e dönüş), 4 körleme simülatörü (+120 tecrübe), 3 Magitech
      (çırak, büyü mühürleri: 2 aether → gövde +40), 2 astrogasyon (rota haritaları), 1 kabul, -1 arşiv küreleri, -2
      rezonans kriptosu, -3 tohum deposu (tohum takası), -4 enerji çekirdeği, -5 yasaklı tonozlar (Başmüfettiş mührü:
      final görevlerine kaldı).
- [x] 6 Malazar Dağı (2.1): kuzey sahil kapısından (izinle); tepede mor şimşekler (statik boşalma), altında aether
      ocakları: aether kristali ve büyü tozu yatakları (yeni hammaddeler).
- [~] 7 Çevre krallıklar: Zhaor halkasındaki sınır levhası ve kodeks kaydı. Donmuş krallıklar, çöl krallıkları,
      Kahergonat ve okyanus ötesine yolculuk atlas bölümüyle (14).
- [x] 8 Hikâye köprüsü (2.1): Gözcü Tepesi'nde "YGK frekansını ara" (koşullar: Sınıf III ya da üstü gemi, iki
      kurtarılmış topluluk, on uzay operasyonu) → frekans ayarı → uzay haritasında YGK feneri → kenetlenince sekiz
      saatlik hiper-sıçrama (koloni o sürede kendi başına yaşar) → YGK kat 5. Kabul görevlisi kaptanın kaydını tanır.

## 13. tonoflenya-kadim-tarihcesi-ve-kronikler.md
- [x] 1-11 (2.2, tonoflenya/kronik.js): on bir bölüm, belgedeki bütün olay ve adlarla, Tonoflenya'da onları saklayan
      yerde "Kronik: …" eylemiyle dinlenir ve kodekse girer: 1-2 YGK arşiv küreleri (2. bölüm Kızıl Yutucu operasyonunu
      yapmışsan mancınığı tanır), 3 Aether Çekirdeği, 4 Zirve İğnesi (hizalandıktan sonra), 5 Elyndra lonca ihtiyarı,
      6 Arin keşişi (ilk dersten sonra), 7 Zhaor sınır levhası, 8-9 Kara Göl'ün batık kulesi, 10 Malazar ocaklarındaki
      I. Bagrius anıtı, 11 YGK kat 1 kuruluş kitabesi. Menüde "Tonoflenya kronikleri": bulunanlar yeniden okunur,
      bulunmayanların yeri söylenir.
- [x] 12 Çağlar matrisi (2.2): sekiz çağ (liderler, mekânlar, dönüm noktası, kozmik sonuç); ilgili bölüm bulununca açılır.

## 14. tonoflenya-buyuk-cografi-atlasi.md
- [x] 1 Beş kuşak (2.3, tonoflenya/atlas.js): 34 bölge; menüde "Tonoflenya haritası" (yalnız Tonoflenya'dayken):
      kuşak → bölge → yolculuk (final-gorevleri 1.2'deki makro → bölge katmanı).
- [x] 2 Merkez: 2.1 Axira Çemberi (Elyndra ile saray arasında yeni meydan; sarayın renk katmanları, kabartmalar) ·
      2.2 üç eksen geçit adlarında (Yıldız Yolu, Fenrir Caddesi, Zorah Kapıları Yolu) · [~] 2.3 altı mahalle halkası:
      iki belge halkaları farklı anlatıyor (Malken belgesi: Zhaor dış savunma … Elyndra iç konsey; atlas: Axira dış
      çeper, Zhaor zanaat, Varek kışla, Sinha şifahane, Uma kütüphane, Elyndra zaman kuleleri). Malken belgesinin sırası
      korundu, atlasın işlevleri halkalara nokta olarak eklendi; hangisinin doğru olduğu Bahtiyar'a sorulmalı ·
      2.4 Kuzeyboğaz ve Güneygeçit köprüleri, üç ışınlanma istasyonu (Merkez İstasyon yetkiyle: YGK, Tentran, Loran;
      Fenrir Kapısı: Fleeplee, Tentran; Zorah Kapıları: Gri Yel), Kristal Teraslar (kristal fidanlığı), Taş Çember Köyleri.
- [x] 3 Batı: Zinas yolculuğu (fırtına, korsan), Loran Vadisi, Julithan, Anitor (Brastion, Korzel, Darnak), Filtra
      (oksit alaşımı yatağı), Safran Sıradağları (kükürt maruziyeti); 3.3 matrisi rotalarda.
- [x] 4 Doğu: Gri Yel Burcu ve batı kenar, Ajmero Kulesi, Kuzey Gölge Hattı, Güney Cam Düzlükleri (cam zemin, rezonans
      camı), Doğu Kırık Vadi, Mavi Hardrin (radar menzili kısa, üç boğaz, mavi aether), Kahergonat (Kahergonat Yolu
      yalnız Mavi Akşam nöbetinde açık; termal giysi yoksa bir gün daha).
- [x] 5 Kuzey: Gümüş Tüy, Gözlem Adaları, Halyon; Malazar'ın dört katmanı (taban: Taç Seferi kampı; orta yamaç:
      ocaklar, Morluk damarı, bağımsız madenciler; Hâle: statik ve aether akımı maruziyeti, tarikat müridi; zirve:
      soğuk, buzul aether) ve üç sefer grubu; Zeris'in üç katı (üst katlar konsey izniyle: Kara Göl mührü + iğne
      hizası); Valdren, Norvask, Helgar (soğuk), Drahmir.
- [x] 6 Güney: 6.1 Fenrir'in ters itim alanı · 6.2 Fleeplee toz iskeleleri ve sahil mabedi, Tentran (Aether-Dock'un adı;
      Malken belgesi doğu ucu, atlas batı ucu diyor: geçiş yeri değişmedi) · 6.3 Arin'in kanatlı halkı, Veradon ve Mor
      Anzelon · 6.4 Tharal, Nerya, Oredan, Keralon (bataklık gazı).
- [x] 7.1 Hammaddeler: saf Malazar kristali (aether), Morluk kristali, buzul aether, Fenrir ışık tozu (foton reçinesi),
      oksit alaşımı, rezonans camı, mavi aether tozu, arıtılmış saf aether (Tenohris'te 2 aether → 1). [~] Bilgi
      kartuşları ayrı eşya değil. · 7.2 Rota tablosu: süreler oyun günüyle (6 nöbet) Yıldız Zamanı'nı ileri sarar, her
      ayağın tehlikesi işler · 7.3 Büyük çember: rotalar halkayı kapatır.

## 15. tonoflenya-esya-zanaat-ve-murettebat-rehberi.md
- [x] 1 YGK çekirdek kadrosu (2.4, subay.js): kaptan (komuta aurası: bekleme ×0,9; Odaklanmış Rezonans: üç tur atış ve
      kalkan iki kat), Elyndra (kalkan ısısı ×0,85, reaktöre aether ×1,25; Mor Aşırı Yük), Varek (kritik +%12; Kızıl
      Odak Atışı: kalkanı kırıp ×1,5), Axira (moral kaybı yarıya, tarla ×1,25; Hücresel Yenilenme: stres sıfır, gövde
      +%10; yüzeyde biyo-kalkan: bir saat zehir süzülür, günde bir), Sinha (tespit ×1,35: fener ve fenomen; Akustik
      Karartma: sıradaki atış ıskalar), Drahmir (tamir ×0,8, kalkış yakıtı ×0,85; Acil Kaynak: gövde +%25). YGK kat 1
      "Akademi subay kurulu"ndan görevlendirilir. Kriz sözleri: Varek ilk darbede, Drahmir gövde yarının, Elyndra
      beşte birin altında, Sinha yabancı firkateyn ve fenomende, Axira maruziyet yüzde yetmiş beşte (seferde birer kez).
      Savaşta kendi sırada aşağı kaydır yetenek seç, çift dokun kullan.
      [~] Şemadaki Zhaor (seyrüsefer) belgede profilsiz: Zhaor Vel-Amin olarak eklendi (yolculuk ve yakıt ×0,9; Gümüş
      Rota: ganimetsiz çekilme). [~] Ses kimlikleri (voice_elyndra_alto …) veride; ekran okuyucu okur, ayrı ses kaydı
      yok. [~] Belgenin cooldown'ı gerçek zaman değil tur; enerji yüzdesi yerine gövde yüzdesi.
      Prosedürel subaylar: Julithan, Nerya, Veradon ve Tentran tavernalarında günde iki aday (ekol, kıdem 1-2, avans
      150 lira × kıdem); kıdemine göre yüzde 50-80 etki.
- [x] 2 Hammaddeler (2.4): yeniler piezo (vadide), Zhaor gümüş prizması (Zhaor halkası), kara aether (Kahergonat; ambarda
      dörtten fazlası Sinha uyarısı ve kalkan sönümünü bozar), Kızılkaya titanyumu (Filtra), Norvask kara buzu (Norvask,
      Helgar), Safran kükürdü, Fenrir ışık tozu (gram; Fenrir'de toz toplayınca yüz gram), Arin tüyü ve girdap reçinesi,
      Pyros lav orkidesi (G-17 ganimeti), Glies buzu (G-18). [~] Eşlemeler: Ham Malazar = aether kristali, Saf Aether
      Rezonans Taşı = saf aether, Filtra Oksit Demiri = oksit ağır alaşımı, Zorah cam kumu = rezonans camı, Rezonans
      mantarı sporu = kseno-spor, Plazma şasi alaşımı = şasi çeliği, Mavi Hardrin taşı = mavi aether, Nirdol obsidyeni =
      obsidyen, Graviton yakıtı = graviton. Önceden G-17/G-18'i bitirenlere özütler verilmez; Tentran tüccarından alınır.
- [x] 3 Zanaat (2.4, zanaat.js; menüde "Zanaat tezgâhları", gemideki üç tezgâh): belgedeki dört silah, üç zırh, beş
      gemi modülü, dört ilaç ve belgedeki malzemelerle; ara ürünler (plazma kartuşu, nektar) ve pazar malları (deri astar,
      Zhaor ipeği, mor kumaş, altın tel, Sinha çipi, Tentran rölesi, biyo-filtre, ruh kapsülü, saf su, bal, mor çiçek).
      [~] Kişisel silah ve zırhlar oyunda kara savaşı olmadığından şöyle: silah kaptanın bataryasına bağlanır (tüfek
      ×1,8 ve kalkan sönümü ×0,85, hançer ×1,2 ve iki saldırı dondurur, mızrak ×2,4 ve karanlık düşmana iki kat, gölge
      yayıcı kalkanı yok sayar ve düşman yüzde otuz ıskalar, yasaklı: itibar −10); oksit zırhı yüzeyde patlamaya yüzde
      kırk direnç ve yüzde on yavaşlık; ışık pelerini her çatışmanın ilk saldırısını boşa çıkarır, yağmacılar geç fark
      eder; cübbe yetenek beklemesini bir tur kısaltır, monolit zihni karıştırmaz. Modüller: kalkan amplifikatörü
      (darbenin sekizde biri, ısı ×0,6), Sinha sonarı (fener ×2), Filtra plakaları (azami gövde ×1,5), Tentran
      modülatörü (sıçrama şarjı iki günden bire), iklim kubbesi (tarla ×1,3, her dönüşte moral +3). İlaçlar: Glies
      iğnesi (yenilgide yas yok), vaha şurubu (stres sıfır, on iki saat hız ×1,25), astral iksir (sonraki yetenek iki
      kat), Malken rasyonu (seferde besin yorgunluğu yok, moral +2). Silahların sesleri ElevenLabs.
- [x] 4 Yadigârlar (2.4): on iki yadigâr ve belge envanterde katalogda; görevlerde (16, 17) elde edilir, atılamaz.
- [x] 5.1 Envanter (2.4): menüde "Envanter", beş kategori; satır okunur (ad, adet, açıklama), çift dokun eylem menüsü
      (Kuşan/Çıkar, Gemiye tak/sök, Kullan, Reaktöre yükle, Dökümhaneye gönder, At); iki parmakla sağa kaydır sonraki,
      sola önceki kategori (sayfa ve damla sesi, ElevenLabs).
- [x] 5.2 Kargo (2.4): Tonoflenya hammaddeleri ve eşyalar ambar hacmine girer (metaller iki, modüller üç); kapasite
      gemi sınıfına göre; taşınca hiper-sıçrama yakıtı (on litre) yüzde elli artar. Kara kristal fazlası: Sinha uyarır.
- [x] 5.3 Para (2.4): Malken Lirası (kabulde 300 harçlık), Fenrir ışık tozu (gram = 50 lira; Tentran yalnız tozla),
      Galaktik Keşif Kredisi (kabulde 100; YGK kat 2 veri masası her operasyon için 150, her kodeks kaydı için 25 öder;
      iskelede gövde tamiri krediyle, 1 kredi = 2 lira). On ticaret masası (Uma, Zhaor, Axira, Sinha, Elyndra halkaları,
      Tentran, Veradon, Julithan, Nerya, Kahergonat karaborsası: alış-satış, kur).
      Düzeltme: hiper-sıçrama 2.1-2.3'te yanlışlıkla dört oyun günü ileri sarıyordu; artık sekiz oyun saati (2400 sn);
      sonra motor iki gün şarj olur (iskelede ya da Aethelis'in terminalinde "şarjı bekle").

## 16. tonoflenya-buyuk-final-gorevleri.md
- [x] 1.1 Tetiklenme (2.5): YGK kaydından sonra; görevler sırayla açılır (tonoflenya/final.js). 1.2 Harita katmanları:
      makro (YGK feneri ve sıçrama), karasal (2.3 Tonoflenya haritası: kuşak → bölge), mikro (bölgedeki görev noktaları).
      [~] Çift dokunuşla harita geçişi menü listesinde (çift dokun = seç); ayrı bir dokunmatik harita yok.
- [x] 2 Yirmi görev (2.5): her biri belgedeki yerde bir noktada başlar ("Final görevi N"); giriş sahnesi (görev veren,
      senaryo, ambiyans anlatımı), belgedeki jestlere en yakın operasyon adımları, gereken yerde akustik çatışma,
      dallanan kararlar (1, 2, 4, 17; d.tf.karar) ve ödüller. Yeni adım türleri (operasyon.js): zikzak (5), sessizlik
      (15: on saniye dokunmadan), rotasyon (9, 18: kesintisiz çevirme), refleks (1: güvenlik duvarı), mühür (3: üç parmak);
      frekans + çift dokun (7: lidar), aynı yana kaçış (12), zıplama (13), iki parmak ritim (20). Yüzey operasyonunda
      hasar kaptanın dayanıklılığına; biterse geri çekilinir, görev yerinden yeniden denenir; duraklatılınca "Göreve dön".
      Çatışmalar: Alt Evren hava yaratıkları (9), gölge korsan gemisi (12), Kahergonat öncü zırhlısı (16) (karanlık
      düşmanlar). Yadigârlar akışa bağlı: Cahelon anahtarı (9, Arin monoliti), Runahar taşı (13), Tyzrakhel prizması
      (15), Runashar taşı (16), Tyzrakhel parçası (11); Dünya Çivisi (18) üçünü ister, Okyanos sıçraması (19) anahtarı.
      Kalıcı ödüller: kalkan ×0,9 (2), obsidyen kaplama kinetik ×0,8 (6), deniz haritası deniz yolu ×0,8 (7), boyutsal
      atlama sıçrayıcısı savaş yeteneği (8), astral ışık atış ×1,15, fener ×1,15, yakıt ×0,87 (15), onur kılıcı (17),
      efsanevi reaktör (18), brövede iskele tamiri yarı fiyat (1), Başmüfettiş mührü (17: kat eksi beş). Titan çatlağı
      anlatımda (9: %60, 13: %70, 14: ×0,75, 18: 0). Epilog ve krediler (giriş müziği), Evrenin Muhafızı, serbest keşif.
      [~] "12: +1.200 mülteci" belgedeki gibi nüfusa eklenir (çadır kentleriyle barınma da). "XP" kaptanlık tecrübesine,
      "Malken Kredisi" Malken Lirası'na, "250 Aether Tozu" büyü tozuna, "Savaş Ganimeti Kredisi" Keşif Kredisine çevrildi.
      [~] Okyanos-Abyssus ayrı bir yürünen harita değil: 19 ve 20 iskeleden başlayan gemi operasyonları (girdap ortamı).
- [x] 3 Ses: ElevenLabs (5 × 17 kredi) girdap ortamı ortam_t_girdap, Cahelon böğürtüsü, Lord Sharon'un katmanlı
      kahkahası, mancınık ıslığı, zafer korosu. [~] Drive'daki dört ambiyans adı (magma_ve_maden_fokurtusu …) Drive'da yok;
      yerlerine bölgelerin 2.1-2.3 ortamları. [~] Valen sağ, Kefius sol kulak: ekran okuyucu konumlandırılamadığından
      metinde belirtilir; Valen, Kefius, Sharon için ElevenLabs seslendirmesi yapılmadı (istenirse).
      [x] Ekran okuyucu dizini her görevin başında: [Görev] - [Konum] - [Tehlike 1-5] - [Gerekli jest].

## 17. tonoflenya-yan-gorevler-ve-yerel-vakalar.md
- [x] Bölüm 1-5 (2.6, tonoflenya/yan.js): otuz görev belgedeki bölgelerinde (Magentor halkaları ve Tenohris; Loran,
      Julithan, Anitor, Filtra, Safran; Ajmero, Cam Düzlükleri, Hardrin/Nirdol, Gölge Hattı/Morluk Kapısı, Kırık Vadi,
      Kahergonat; Halyon, Gümüş Tüy, Zeris, Norvask, Helgar, Drahmir; Flee Plee, Tentran, Arin, Veradon, Tharal,
      Keralon), görevi veren kişide "Yan görev: …". Giriş sahnesinde kod, tür, harita hiyerarşisi, ön koşullar,
      ambiyans ve ekran okuyucu notu; belgedeki mekaniğe en yakın operasyon adımları; A/B kritik kararı ve belgedeki
      ödüller. Aynı anda bir yan görev.
      Ön koşullar: oyunda karşılığı olanlar denetlenir (seviye yerine ekol kıdemi, gemi sınıfı, kuşanılı zırh, plazma
      tüfeği, tarım, YGK kaydı, rezonans kayığı); karşılığı olmayan aletleri görevi veren ödünç verir ("görev gereci").
      Ödüller: "Kredi" Malken Lirası; eşyalar envanterde ve etkileriyle (gümüş rozet Malkenia'da %10 indirim, aether
      bataryası/graviton hücresi/ışık yakıtı reaktöre yüklenir, gübre formülü tarla ×1,25, Varek bataryası ve parazit
      sensörü gemi modülü, hayat muskası savaşta bir kez diriliş, konser bileti, ticaret beratı, maden hissesi günde 100
      lira, rüzgâr muskası / dağ pusulası / radar haritası / bataklık ayrıcalığı atlas tehlikelerinden muafiyet, akrep
      zehri ve kara buz parçası cephane, haydut tabancası ve Drahmir kalkanı teçhizat, mavi prizma ve yıldız atlası fener,
      Hardrin bariyeri üç çatışma yarı hasar, gizli geçit haritası Kahergonat zırhlıları ×0,7, ışık tozu pelerini, Tentran
      ücretsiz bakım ya da çift graviton itkisi ×1,25, korsan korveti filoya, Tharal rasyonları her gün, haftalık 50
      büyü tozu, bataklık feneri kilit payı ×1,5). Sir Gareth, Deli Simyacı Malakor özel mürettebat (savaş etkileri),
      Drahmir'in üç askeri mürettebata. Değerli mallar (safran kristali, güneş küresi, orkide, tüy, sedef) ticaret
      masalarında satılır. Eşya rehberi 4.2'nin belgeleri buradan: Loran tableti (8), Filtra şartnamesi (11), Ajmero
      küresi (13), Mormon pusulası (20), Tentran izni (26), Zeris aynası (21), Halyon prangası (19), Veradon defteri (28).
      [~] "Bilim puanı" sayaç (ve kaptanlık tecrübesi); "kanun düzeni", "YGK araştırma ilerlemesi", "terraforming hızı
      %10", "klonlanabilir binek" bayrak/kayıt olarak tutulur, ayrı mekanikleri yok. 15-B'de Nirdol Boynu bir hafta kapalı.
- [x] 6 Ödül ve itibar matrisi: d.yan.itibar fraksiyonları (otuz üç); menüde "Yan görevler ve itibar" (görev listesi,
      bölgesel itibar, özel mürettebat). Olumlu itibar evren itibarına da eklenir.
- [x] 7 Entegrasyon: harita (atlas bölgeleri), ekran okuyucu (giriş notu, kararlar çift dokunla), sesler ElevenLabs
      (topçu droidi, göçmen kuşlar, bataklık canavarı). [~] Belgedeki Drive ambiyans dosya adları Drive'da yok; bölge
      ortamları 2.1-2.3'ten.

## 18. v4 paketi (22 Kasım, belgeler/v4/, 39 belge): okuma rehberi
00-YAPAY-ZEKA-UYGULAMA-VE-OKUMA-REHBERI.txt beş fazlık sırayı verir; aşağıdaki bölümler o sırayla işlenir.
- [x] 0 Değişmez kurallar: mevcut binalar, tarifler, görevler silinmez; 25 bina belgesi esas; ses ve jest odaklı; zaman
      Yıldız Nöbeti, savaş içi etkiler tur; kilitler hikâye ve görevle açılır.
- [~] 1 Faz 1 [x] (3.0) · Faz 2 [x] (3.1) · Faz 3 [ ] · Faz 4 [ ] · Faz 5 [ ].

## 19. v4 / evrensel-savas-sistemi-uzay-ve-kara.txt (3.0, uzay/savas.js)
- [x] 1 Tek çekirdek: dinle, kilitle (sağa-sola), dokun birincil, yukarı kaydır ağır saldırı (iki tur dolum), iki parmakla
      çevir frekans/zırh kırıcı, aşağı kaydır + çift dokun yetenek; savunmada iki parmak kalkan/siper, ters kaydırma
      kaçınma, çift dokun karşı ateş (torpido ve mermi), aşağı kaydır sahte gürültü (D-1), üç parmak ışınlanma (Mor 4).
- [x] 2 Uzay ve kara karşılaştırması: d.savas.ortam; karada kaptan + refakatçi subay (kokpit terminalinde seçilir) ya da
      yüzey aracı; zırh bütünlüğü (kademe, oksit zırhı ×1,35, Mammoth ×1,5) ve siper; arızalar hareket (kaçınma yok),
      siper (parçalanır), kask (stres iki kat). Kişisel silahlar karada doğrudan el silahı, zırh hasarı azaltır.
      Yenilgide ekip tahliye edilir (Aethelis'te kapsül). [~] Devreye girdiği yerler: koloni krizleri (koloni baskını,
      3.0) var; gezegen yüzeyleri Faz 4, yan görevler Faz 5, final kara çatışmaları Faz 4 ile bağlanacak.
- [x] 3 Tehdit ölçeği T1-T5 (can ×1/1,5/2,2/3/3,5, hasar ×1/1,3/1,7/2,2/2,5, pencere 3,0/2,5/2,0/1,8/1,5 sn);
      oyuncuKademesi (gemi sınıfı, koloni seviyesi, operasyon sayısı, Tonoflenya); en çok bir kademe geride kalma
      kuralı; oyuncunun kendi vuruşu da gemi sınıfıyla büyür.
- [x] 4 Beş arketip (akıncı pencere −0,5 sn; frekans değiştiren; pusucu; çağıran; karanlık) ve zırhlı.
- [x] 5.1 Çoklu düşman: bütün sesler kendi yönünden; pruva hangi sesin karşısındaysa hedef o, öteki sesler geride;
      uyarılar sırayla. 5.2 Filo destek yuvası (kokpit terminali; sınıfa göre yan ateş, kalkan şemsiyesi, onarım, yaylım,
      iz sürme) ve kara araç desteği (Çöl Tilkisi pencere ve kilit, Mammoth zırh ve ağır atış, Akrep yardımcıları avlar).
      5.3 Aşamalı bosslar (kahergonat 2 aşama; Xarathia 2, Lord Sharon 3, Cahelon 3).
- [x] 6 Sonuçlar: zafer (kademeyle büyüyen ganimet, tecrübe 80 + 20 × kademe, ekol, itibar), ateşkes/teslim (yarı),
      kaçtı, yenilgi. Taktik harp dairesi (komuta merkezi) arketipi ve modülleri söyler, ilk uyarıya +0,5 sn; dinleme
      kulesi tuzakları ve yabancı firkateyni önceden bildirir; sera ve enstitü bonusları mevcut erzak etkileriyle.

## 20. v4 / dusman-davranis-modulleri-ve-item-karsiliklari.txt (3.0)
- [x] 1 Eşya zorunlu değil: her modül serbest refleksle yenilir; karşılıklar sahip() ile (eşya, parça, modül, araç,
      bayrak) denetlenir, yeni eşya için yalnız kimliği eklemek yeter. MODULLER tablosu serbest yolu ve karşılıkları yazar.
- [x] 2 Sekiz modül: frekans kalkanı (iki turda üç tondan birine geçer, yanlış ton ×0,3; sonik tüfek iki tur kilit,
      geometrik namlu tonu yok sayar, K3 bobin ve Mammoth ×0,65), pusucu ve sahte sinyal (her isabette yer değiştirir;
      sahte uyarı sesi yüzde otuz beş; Sinha sonarı, parazit sensörü, söğüt nişangâhı eler), çağıran (üç turda bir,
      en çok üç yardımcı; yardımcılar her tur ek hasar; sonik kovucu sarf, gölge yayıcı alan hasarı, Hisar yaylımı, Akrep),
      karanlık (kinetik ×0,5, ışık ×2; stres +15, kalkanda +5; yüzde yüz streste kilit ×0,6 ve pencere ×0,8; cübbe
      bağışıklık, biyo-kubbe ve iklim kubbesi ×0,7, panzehir ve vaha şurubu sıfırlar), ısı (darbeler ısıtır, kalkan ×1,5
      ısınır; dondurucu köpük, termal giysi/karartma ×0,5, kara buz hançeri üç tur dondurur), iyon kilidi (itici bir tur;
      topraklama çubuğu emer, EMP topu düşmanı kilitler), zehir (iki tur erime; panzehir ×0,5, asit zırhı ×0,2, detoks
      üç tur bağışıklık), kaçış ve teslim (yüzde otuzda iki tur içinde kaçar, çekici kiriş/pençe kilitler, iyon
      iticileri üç tur; yüzde yirmi beşte teslim teklifi: iki parmakla yukarı kaydır).
      [~] T-05 … T-09 eşyaları (sonik tüfek, geometrik namlu, plazma pençesi, söğüt nişangâhı, kseno-panzehir) Faz 2'de
      zanaata eklenecek; savaş tarafı hazır.
- [x] 3 Esnek sinerjiler: Varek nöbetinde termal/plazma ×1,1, Elyndra'da ışık/aether ×1,1, Sinha'da akustik ekipmanla
      pencere +0,2 (gizli).
- [x] 4.1 Altı geliş biçimi: kıskaç, öncü + destek (destekçi yaşarken öncüye hasar ×0,5), kaçan konvoy (dört tur), çevresel
      tehlike (iyon fırtınası, ısı, asit), sessiz sızma (ilk atış ×2, ıska alarm ve takviye), sahte yardım tuzağı (dinleme
      kulesi yoksa ilk saldırı hemen). 4.2 T2 ve üstünde ana düşmana bir ikincil modül. karsilasmaUret seferde ve
      koloni baskınlarında kullanılır.

## 21. v4 / somut-dusman-katalogu-ve-bosslar.txt (3.0)
- [x] 1 Ölçekleme kuralı (bölüm 19.3).
- [x] 2 Sekiz uzay düşmanı: avcı (akıncı, iyon), korvet (pusucu, kaçış, teslim), ağır maden korsanı (zırhlı, üç turda bir
      kalkan delici ağır plazma: yalnız kaçınma ya da ışınlanma), tanımsız yabancı firkateyn (frekans + iyon; derin uzay
      karşılaşmalarında T2+ ve dinleme kulesiyle, T3'te gezegen yörüngesi devriyesi), dron taşıyıcısı (çağıran),
      Alt Evren sürüsü, gölge korsanı (sahte uyarı), Kahergonat zırhlısı (2 aşama: kalkan patlar, iki gölge dronu,
      pencere 1,5, ışık ve torpido ×2).
- [x] 3 Beş kara düşmanı: sülfür akrebi (zehir; koloni baskınları), kadim otomat (frekans), gezegen biyom yaratığı
      (çağıran + pusucu), Tonoflenya kaçakçı çetesi (teslimde saklı geçit bilgisi), tarikat muhafızı (karanlık).
- [x] 4 Bosslar: Xarathia (2 aşama, ısı; ikinci aşamada buz ×2), Lord Sharon (3 aşama: muhafızlar ve sahte yönler,
      ölümsüz gölge zırhı: yalnız Tyzrakhel ×3, öteki ×0,1), Cahelon (3 aşama: dalış, infrasonik ton, Alt Evren
      yaratıkları; Dünya Çivisi çatlağında frekans ×3, ışık ×2). [~] Savaş verileri hazır; Lord Sharon (final 18),
      Cahelon (final 20) ve Xarathia (Pyros-Prime) çatışmaları Faz 4'te görevlere bağlanacak.
- [x] 5 Yeni düşman şablonu: DUSMANLAR satırı (ad, ortam, arketip, ses, özel hamle, teslim, ganimet) yeter.

## 22. v4 / bina-etkileri-ve-isleyis-mantigi.txt (3.1, binalar.js)
- [x] 1 Üç kural: pasif iş (mevcut tesis üretimi), sefer/savaş hazırlığı (HAZIRLIKLAR: tarama, ziyafet, tedavi iğneleri,
      kalibrasyon, istihbarat; koloni yönetiminde "Binalar, sefer hazırlığı ve Ar-Ge masası"; bir sonraki çatışmada ya da
      seferde harcanır), hızlanma (rolCarpani: topluluk ve nöbet).
- [x] 2 Beş evrensel rol (ROLLER, ROL_NOBETLERI: 1 Zhaor, 2 Axira/Uma, 3 Varek, 4 Elyndra/Sinha); yeni bina için ROLLER ve
      KATKI satırı yeter.
- [x] 3.1 Enerji yetmezliği: 25 bina belgesi kW kısıtı eklenmesin dediği için yok; hız jeotermal, nöbet, moral ve iş
      gücüyle. 3.2 Irk/personel: Kaelith ve Aethel-9 sanayi ×1,25, Vaelin yaşam ×1,25, Malken ve Kithron bilim ×1,25,
      insan yönetim ×1,1. 3.3 İç mekân: tesislerin işlemleri terminal menülerinde. [~] Tesis kademesiyle yeni oda: mevcut
      kademeli tesisler (tersane 1-3, tarım 1-4) dışında yok.
- [x] 4 Yeni bina şablonu: ROLLER + KATKI + TESISLER kartı.

## 23. v4 / 25-bina-evrensel-butunsellik-ve-yetim-esya-baglantisi.txt (3.1)
- [x] 1 Mevcut 25 bina, maliyet ve tarifler aynen; kW yok.
- [x] 2 Rollere göre savaş/sefer katkıları (KATKI ve savas.js): komuta merkezi arketip + 0,5 sn; yüksek reaktör Sınıf IV-V
      ağır silah dolumu 1 tur; jeotermal santral Aethelis kara çatışmasında ısı ×0,5; koloni kalkanı baskında ilk darbe
      ×0,5; Tina pencere +0,3; biyo-kubbe stres ×0,7; hastane savaş sonrası stres sıfır; mutfak ziyafet hazırlığı; kseno-eczane
      yenilgide kayıp yok; itki hangarı pencere +0,2; kriyo-atölye ısı ×0,75; askeri tersane gemi hasarı ×1,15 ve karada
      zırh delme; kuantum lab frekans eşleme payı ×1,5; tersaneler destek yuvası; dinleme kulesi menzili (2 / 3 anten +
      sinyal çözücü / 5 komuta + kuantum arşivleyici), gezegen sinyalleri halkaya göre açılır; akademi Ar-Ge masası.
      [~] Sera moral dengesi, yaşam bloğu, mülteci kampüsü ve kseno-habitatın ek katkıları mevcut nüfus ve moral
      sistemlerinin içinde (ayrı sayı eklenmedi).
- [x] 3 Kilitli dört bina: akademi (Prometheus + Deney 07), kseno-habitat (G-13 ya da G-14 + Kadim Genom), mülteci kampüsü
      (Aethel-9 + Tarras), Tina (Alevin Ruhu); dördü kurulunca kademe 4 şartı (mevcut terraform.js).
- [x] 4.1 Yirmi gezegen numunesi (d.numuneler) Ar-Ge masasında: her biri +250 bilim, +25 itibar, +30 tecrübe; 5 kalkan ×0,9,
      10 birincil ×1,1, 15 derin uzay yakıtı ×0,85, 20 Tonoflenya/Alt Evren direnci ×0,85 ve "Galaktik Kâşif".
- [x] 4.2 Yetim hammaddeler: lav orkidesi → termal lazer soğutucu (askeri tersane, dökümhane; ısı ×0,7), girdap reçinesi →
      sürtünmesiz itki yağlayıcısı (itki hangarı; pencere +0,3) ve T-03, morluk kristali ve buzul aether aether
      laboratuvarında saf aetherin yerine, piezo kristali silikat kristalinin yerine (koloni üretiminde).
- [x] 4.3 On eşya: termal giysi (kara zırh, ısı ×0,5), lamine zırh takımı (kara zırh), dondurucu köpük (savaş sarfı),
      topraklama çubuğu (iyon kilidi), sonik kovucu (sürü ve akıncı), ikmal karakolu (gezegenlere kurulur: ücretsiz yakıt ve
      onarım), sismik dengeleyici (sarsıntı çevresi), nötralizasyon kulesi (asit ve zehir sıfır), kripto anten (firkateyn
      ×2, kule menzili), biyo-karantina (inişte maruziyet ve kara aether laneti temizlenir).
- [x] 4.4 "Saf demir teli" dört birim titanyum; süper-iletken soğutucu Hisar'da kalkan ısınmasını kaldırır.

## 24. v4 / gemiler-araclar-ve-filo-sistemi.txt (3.1)
- [x] 1 Sınıf I-III yüzeye iner, bir alt kızak; IV-V yörüngede, iç hangar (TASIMA; kokpit terminalinde "Alt kızak ya da
      hangar: araç yükle"; gezegen kara çatışmasında araç eşlik eder). Aktif amiral + yedek filo: destek yuvası ve
      otomatik koloni görevi (filoGorevi: 300 sn'de bir sınıf kadar titanyum ve bazalt, Sınıf III+ kristal).
      [~] Kişi kapasitesi veride (kisi); mürettebat ataması hâlâ oda sayısıyla sınırlı.
- [x] 2 Sınıf savaş özellikleri: Kıvılcım isabet ×0,85 ve pencere +0,3; Rüzgarkıran gövde ×0,9, pencere −0,1, zırhlıya
      lazer ×1,25; Aethel Muhafızı dengeli; Gökdelen pencere −0,3; Hisar üç katman kalkan ×0,6 ve yan birimlere yarım
      vuruş. Destek yuvaları belgedeki gibi (işaret +0,4 sn, ganimet +%35, kalkan %25 yenileme ve frekans kolaylığı,
      %10 onarım ve ikmal, ağır plazma yaylımı). Üretim maliyetleri mevcut montaj aşamalarında (değiştirilmedi).
- [x] 3 Yüzey araçlarının kara işlevleri: Çöl Tilkisi pencere +0,5 ve kilit, Mammoth hasar ×0,6 ve iki turda bir matkap
      darbesi (frekans/zırhlıya ×2), Demir Kervan mobil siper (ısınmaz) ve ikmal, Atmosphere-X hava taraması ve taktik
      tahliye yeteneği, Akrep bir ücretsiz şaşırtma, yardımcı avı ve ganimet +%20.
- [x] 4 Yeni gemi/araç şablonu: GEMI_SINIFLARI + TASIMA + DESTEK satırı. 5 Gemi içi gezinti mevcut.

## 25. v4 / dinamik-yakit-ve-rota-sistemi.txt (3.1, seyir.js)
- [x] 1 Zincirleme mesafe: halka(id) (belgedeki noktalar sabit, ötekiler uzaklıktan), yolBirimi (fark; aynı halkada 1),
      BIRIM_LITRE (5/5/6/10/15); kargo ≥ %80 ×1,25 (cep-ambar siler), Sinha nöbeti ×0,9, Zephyr helyum-3 ×0,85, tersane
      kalibrasyonu ×0,85; kenetlenince düşer (yalnız ön tarama yakmaz); sürekli tüketim manevra ve yaşam desteği için
      dörtte bir. Sert kaçış manevrası +4 L.
- [x] 2 Halka listesi belgedeki gibi (Kızıl Yutucu ve YGK feneri 5).
- [x] 3 İkmal karakolu, yüzde on beşte kritik uyarı ve en yakın ikmalin yönü, yakıt bitince imdat (10 GK ya da korsan
      ateşiyle gövde −%20), oyun kilitlenmez.

## 26. v4 / esya-silah-zirh-ve-melez-zanaat-sistemi.txt (3.1, zanaat.js)
- [x] 1.1 Üç kademe: saha (rasyon, kartuş, iğne, nektar her yerde), standart (Aethelis'te ilgili tesis ya da Tonoflenya),
      melez (Aethelis kademe 3 dökümhanesi ya da YGK); gözetmen atanırsa maliyet ×0,75 ve usta işi (d.gozetmen Faz 3).
      1.2 Kara + uzay çift rol (savas.js).
- [x] 2 Silahlar: Filtra tüfeği, kara buz hançeri (karada dondurur, uzayda pencereyi 0,5 sn yavaşlatır), ışık mızrağı,
      gölge yayıcı, T-05 sonik tüfek, T-06 geometrik namlu, T-07 plazma pençesi, T-08 söğüt nişangâhı.
- [x] 3 Zırhlar: oksit (karada +, uzayda torpido ×0,9), ışık pelerini, baş-büyücü cübbesi, T-01 kemik-alaşım, T-02 cıva plakası.
- [x] 4 Modüller ve ilaçlar: mevcutlar + T-03 cep-ambar (+500 kargo, yük cezası yok), T-04 rezonans halkası, T-09 kseno-
      panzehir (5 doz, savaş sarfı), T-10 magma matkabı (toplamada +1). [~] T-04'ün Tether-Key mekikleri Faz 5 belgesinde.
- [x] 5 Hammadde kökenleri (eşleme zanaat.js başında); 1 GK = 25 ML (GK_ML), 1 g ışık tozu = 50 ML.
      [~] İki dünya arası kargo nakli: kaynaklar ortak ambarda tutulduğu için ayrı nakil gerekmiyor.
- [x] 6 Yeni eşya şablonu: ESYA + TARIFLER + DEGER satırı.

## 27. v4 / item-deger-garantisi-ve-niye-yapayim-kurali.txt (3.1, veri/deger.js)
- [x] 1 Dört gerekçe: on yetim eşya ve T serisi savaşta, keşifte ya da ekonomide işe yarar.
- [x] 2 Değer anonsu: zanaat menüsünde, envanterde ve koloni üretim menüsünde adın ardından "ne işe yarar" cümlesi.
- [x] 3 Kontrol kuralı: DEGER ya da eşyanın etki cümlesi.

## 28. v4 / karakter-aglari-murettebat-ve-ygk-akademi.txt (3.2, tonoflenya/kisiler.js, karakter.js)
- [x] 1 İki aşamalı mürettebat: prosedürel beş istasyon uzmanı (İkmal Subayı eklendi: kargo yüzde yirmi); Akademiye kayıt
      olunca altı seçkin subay istasyonlara kendiliğinden geçer, prosedürel ekip yedek kalır (seckinKadro). Zhaor dümende:
      uzay savaşında kaçınma penceresi +0,3 sn.
- [~] 2 YGK'nin on bir katı: karakterler kanonik katlarına kondu (Ignador 1, Tixie 2, Kefius 4, Lyra 5, Valen ve Morvenna 6).
      Katların kendi adları ve içerikleri v4 Faz 5'teki ygk-akademi-gezilebilir-sistem belgesiyle yeniden kurulacak.
- [x] 3 Kilit karakterler: Valen (Morvenna vekil), Kefius, Ignador, Tixie, Oronte (Filtra), Barracuda (Fleeplee), Nyxara
      (Tentran kıyısı, resmî elçi değil), Mirelza (Zeris), Zeno (Gri Yel, Yolboyu Hanı), Xarathia (yalnız Pyros notu).
      Konuşma noktaları k_<id>: kodeks, bölge gücüne +5, taslak bilgisi. Gözetmenler: akademidekiler YGK katlarında, ustalar
      kendi bölgelerinde, misafir kolonide (d.gozetmen her karede).
      [~] Kaelan, Lyra, Sarah ve Cüretkâr Cüce'nin yeri belgede yok: Kaelan Helgar, Lyra YGK kat 5, Sarah Loran, Cüce
      Filtra'ya kondu. Bahtiyar'a sorulacak.
- [x] 4 Tether-Key mekiği: köprü (Tonoflenya görülmüş) + tanışma; bedel 1 Malazar kristal odaklayıcısı (aether
      laboratuvarı), 50 ışık tozu, 25 L jeotermal soğutucu (dökümhane); iki nöbet kalış, altı nöbet bekleme (T-04 halkasıyla
      iki); rıhtımda tek misafir. Etkiler: Oronte zırh, araç, bakım yarı; Barracuda kargo ve ambar kaybı yok; Zeno savunma
      +%40, pusu ve baskın yok; Mirelza radar ×2, sera +%30; ustalar kendi taslaklarının gözetmeni.
- [x] 5 İtibar: evren itibarı dört kademe (pazar %10/15/25, taramalar +%15, araştırma +%25/35, taban moral +5, korsan
      korkutma ve %35 teslim, beş güce +10, savunma %10); Tonoflenya bölge itibarı beş güç (yan görev fraksiyonları toplanır,
      -100…+100, beş basamak). Menüde "Karakter ağı, mekik ve itibar".

## 29. v4 / bolge-genisletme-panel-ve-ilerleme-sistemi.txt (3.2, komuta.js)
- [x] 1 Komuta ve Genişleme Paneli: üç sekme (iki parmakla sağa sola), satırda durum sesi (sisli statik, düşman alarm,
      baskın zil, güvenli jeneratör uğultusu), çift dokun eylem menüsü (tara, saldır, savun, karakol kur, bilgi), üç parmakla
      dokun en acil bölge. [~] Durum sesleri mevcut efektlerden; istenirse ElevenLabs ile özel sesler.
- [x] 2 Dört aşamalı ilerleme: halka 1 dört sektör, halka 2 yörünge ve Kaelith, halka 3 derin uzay koridorları (Sınıf III;
      gezegen operasyonu ve ikmal karakoluyla), halka 4 beş Tonoflenya kuşağı (itibar 20+ güvenli müttefik). En az üç kuşak
      güvenliyse final 16-18 çatışmalarında müttefik takviyesi, değilse cephe savunmasız.
- [x] 3 Karakollar: ikmal (baskın püskürtür), sinyal rölesi, maden sondajı (çift aktarım); her oyun günü aktarım.
- [x] 4 Komşu halka baskısı: baskın 6-12 nöbet arayla yalnız ele geçirilmemiş komşudan; ikmal karakolu, kalkan jeneratörü,
      devriye ya da erken uyarı bağlıysa kendiliğinden püskürtülür; dört sektör + yörünge güvenli → Tam Güvence. Karşılıksız
      baskın ambarı yağmalar, moral -5. Eski rastgele koloni baskını kaldırıldı. Nadir hikâye baskını: hikayeBaskini.

## 30. v4 / asama-1-ve-2-aethelis-fetih-ve-kaelith-hikayeleri.txt (3.2, komuta.js)
- [x] 1A Güney (Kaya; vana operasyonu; 2 akrep + yuva ana akrebi; mühürle / biyo-kubbeyle izole). Jeotermal Santral artık
      güney güvenli olunca kurulur.
- [x] 1B Batı (telsiz subayı; dört notalı kilit; yağmacı öncüsü + Vanguard otomatı; affet +15 iş gücü / sür, tohum kasaları
      ve veri diski).
- [x] 1C Doğu (Dr. Selin; imdat sinyali; iki bataklık pusucusu; tahliye, sera ve enstitü +%10 / tortu, yaralı). Kalkan
      Jeneratörü doğu güvenli olunca.
- [x] 1D Kuzey (hangar sorumlusu; pike kaçınması; iki kseno-avcı asit yağmurunda; erken uyarı / polimer bacası).
- [x] 2A Yörünge ablukası (avcı + korvet, uzay) → yedek filo devriyesi.
- [x] 2B Kaelith (Torvok; zırhlı korsan uzay savaşı; köpükle ya da vanayla hava kilidi; iki magma akrebi + galeri çağıranı;
      tahliye +25 Kaelith, dökümhane %30 / depo ganimeti +15 Kaelith, %15). Kaelith köprü şartında topluluk sayılır.
- [~] Tetiklenme anları belgedeki görev sırasına bağlandı (sondaj, kazı, ilk uçuş, G-02/kule); G-14 sonrası şartı yerine
      Sınıf 2 gemi.

## 31. v4 / gorev-ve-hikaye-harmanlama-mimarisi.txt (3.3, hikaye.js)
- [x] 1 Beş adımlı harman döngüsü ve 4 altı bölümlü şablon: hikâye motoru (karakter çağrısı telsizden, hazırlık bedeli,
      operasyon ve/veya evrensel savaş adımları, ara ve son kararlar, kalıcı iz; "Sonra" bir nöbet erteler; yarım kalan
      hikâye bekleyenlere döner). Menüde "Hikâye çağrıları".
- [x] 2.1 Kilitli dört bina karakter hikâyeleriyle (bölüm 32'de).
- [x] 2.2 Yirmi gezegen numunesinin karakter zincirleri: 3.4'te on sekiz gezegen hikâyesiyle (bölüm 34-51; p01 ve p02
      belgesi yok, numune eşikleri 3.1'de).
- [x] 2.3 Kaelith kurtarma (3.2, Görev 2B).
- [ ] 3.1 On yan görevin çatışmaları: Faz 5 (tonoflenya-30-yan-gorev-derinlestirme).
- [x] 3.2 Final #1, #16, #18, #20: 3.5'te Aşama 4 belgesiyle (bölüm 53).

## 32. v4 / koloni-yerel-operasyonlar-ve-yuzey-derinlestirme.txt (3.3, mini.js, arindirma.js)
- [x] 1 Fotonik hasat: Dr. Selin; çürümüşe dokununca iki spor pusucusu (biyo-kubbe ya da karantina zehri işletmez); karar
      aydınlatma hatları (gece nöbetlerinde verim) / iksir deneyi (iki sakinleştirici, eczane bir gün hızlı).
- [x] 2 Kriyojenik vana: Kaya; yanlış vanada kriyo yaratığı; kriyo atölyesi varsa dondurucu köpük hediye.
- [x] 3 Kayıp ekip: Aras; iki kristal akrep (sonik kovucu savaşmadan kaçırır); nüfus +3, moral +5, iki plazma camı.
- [x] 4 Vaha kanalı: Lina; vaha kaya solucanı (sismik dengeleyici durdurur); karar seralar (beş peksimet) / yabani havuz
      (iki vaha hurması tohumu).
- [x] 5 Çeviri krizi: sabit ceza kalktı. Sentez: moral +10, itibar +10, yüz bilim puanı; taraf tutmak: moral -5, antik veri.
- [x] 6 Metan kubbesi: kseno-eczane varsa kimse hastalanmaz (itibar +15, moral +10, kseno-alaşım); yoksa stres.
- [x] 7 Solucan göçü: sabit ceza kalktı. Sismik dengeleyici ya da dev kör solucan öncüsüyle kara savaşı (T2) ocakları
      kurtarır (moral +10, titanyum +15, bazalt +10); yalnız süre biter ve çatışma kaybedilirse eski sonuç. Koloniden
      uzaktayken eski sonuç.
- [x] 8 Yağmacı tuzağı: alarmda kaçmazlar; yağmacı lideri ve Vanguard otomatıyla kara savaşı; kazanılırsa itibar +15,
      yüz şasi çeliği, tohum kasaları; kaçılırsa eski sonuç.
- [x] Bölüm 2 dokuz yüzey bölgesi: eksik beşi (kriyo, obsidyen, kuleler, tüneller, vaha) karakol yerleriyle eklendi;
      izolasyonda bölgenin kara düşmanı (cıva ve kuleler düşmansız), keşifte önerilen araç ve eşya, karakol kurulunca
      tablodaki sürekli kazanç (üç dakikada bir).

## 33. v4 / asama-3-derin-uzay-ve-kilitli-binalar-hikayeleri.txt (3.3 bölüm 1 ve 3E; hikayeKoloni.js)
- [x] 3A Ortak Hafıza (Dr. Vael; dron taşıyıcı + iki dron, T3; açık konsey moral +15 / askerî Ar-Ge silah hasarı +%5)
      → Akademi. [~] "Numune kodeks masası" Ar-Ge masası olarak zaten açıktı.
- [x] 3B Nefes Alacak Bir Gök (Sira-Vel; 3 metan; vana kalibrasyonu; iki kriyo pusucusu; izole +%25 / hibrit itibar +300,
      moral +15) → Kseno-Habitat.
- [x] 3C Bir Çekirdeğe Sığmayan Bilinç (Tina; yabancı firkateyn T3; özerklik: baskınlara Tina müdahale eder, moral +10 /
      taktik protokol: uyarı penceresi +0,4) → Tina Çekirdeği.
- [x] 3D Evi Olmayanların Şehri (Mirek; korvet + avcı) → Mülteci Kampüsü; dört bina ile Kademe 4.
- [x] 3E Bilinmeyen Frekans: Sınıf III ve gezegen rotası; firkateyn T3; piezo ve kseno-alaşım; gezegen yörünge devriyeleri
      artık bu temastan sonra.
- [x] Bölüm 2 gezegen matrisi ve 18 gezegen hikâyesi: 3.4 (bölüm 34-51).

## 34. v4 / gezegen-03-...-hikayesi.txt (3.4, gezegenHikayeleri.js gz_p03): Thalassa
- [x] "Derinlerin Mührü ve Siren-0" — çağıran Dr. Nerissa Tide (YGK Biyo-Akustik); gezegen operasyonu bitince telsizden gelir (gemi dururken uzayda da açılır); belgedeki
      adımlar operasyon ve/veya evrensel savaş, ara ve son kararlar (iyi / kötü ya da yol), ödül malzemesi, kalıcı etki ve
      çapraz bağlar; her nöbet bir kez gezegen hasadı (kenetlenince).

## 35. v4 / gezegen-04-...-hikayesi.txt (3.4, gezegenHikayeleri.js gz_p04): Mycelia IV
- [x] "Nefes Alan Kovan ve Miselyum Ağı" — çağıran Botanikçi Mara; gezegen operasyonu bitince telsizden gelir (gemi dururken uzayda da açılır); belgedeki
      adımlar operasyon ve/veya evrensel savaş, ara ve son kararlar (iyi / kötü ya da yol), ödül malzemesi, kalıcı etki ve
      çapraz bağlar; her nöbet bir kez gezegen hasadı (kenetlenince).

## 36. v4 / gezegen-05-...-hikayesi.txt (3.4, gezegenHikayeleri.js gz_p05): Sol-Kharra
- [x] "Kırılan Mercekler ve Çölün Şarkısı" — çağıran Kaptan Daro ve Haris (Kum-Yelkeni 4); gezegen operasyonu bitince telsizden gelir (gemi dururken uzayda da açılır); belgedeki
      adımlar operasyon ve/veya evrensel savaş, ara ve son kararlar (iyi / kötü ya da yol), ödül malzemesi, kalıcı etki ve
      çapraz bağlar; her nöbet bir kez gezegen hasadı (kenetlenince).

## 37. v4 / gezegen-06-...-hikayesi.txt (3.4, gezegenHikayeleri.js gz_p06): Ferros Omega
- [x] "3,5G Altındaki Demirci ve Cıva Kanyonu" — çağıran Usta demirci Brom (Filtra) ve Kaelith madenci Korgath; gezegen operasyonu bitince telsizden gelir (gemi dururken uzayda da açılır); belgedeki
      adımlar operasyon ve/veya evrensel savaş, ara ve son kararlar (iyi / kötü ya da yol), ödül malzemesi, kalıcı etki ve
      çapraz bağlar; her nöbet bir kez gezegen hasadı (kenetlenince).

## 38. v4 / gezegen-07-...-hikayesi.txt (3.4, gezegenHikayeleri.js gz_p07): Zephyr Major
- [x] "Siklon Gözündeki İstasyon ve Elmas Yağmuru" — çağıran Kaptan Vess (Bulut-9) ve Kithron gözlemci Tiz-Kanat; gezegen operasyonu bitince telsizden gelir (gemi dururken uzayda da açılır); belgedeki
      adımlar operasyon ve/veya evrensel savaş, ara ve son kararlar (iyi / kötü ya da yol), ödül malzemesi, kalıcı etki ve
      çapraz bağlar; her nöbet bir kez gezegen hasadı (kenetlenince).

## 39. v4 / gezegen-08-...-hikayesi.txt (3.4, gezegenHikayeleri.js gz_p08): Lithos Echo
- [x] "Çan Kulesinin Yankısı ve Mor Monolitler" — çağıran Akustik keşiş Lirael-9; gezegen operasyonu bitince telsizden gelir (gemi dururken uzayda da açılır); belgedeki
      adımlar operasyon ve/veya evrensel savaş, ara ve son kararlar (iyi / kötü ya da yol), ödül malzemesi, kalıcı etki ve
      çapraz bağlar; her nöbet bir kez gezegen hasadı (kenetlenince).

## 40. v4 / gezegen-09-...-hikayesi.txt (3.4, gezegenHikayeleri.js gz_p09): Necron Sıfır
- [x] "Taşlaşmış Sessizlik ve Gömülü Arşiv" — çağıran Arkeolog Kael-Or; gezegen operasyonu bitince telsizden gelir (gemi dururken uzayda da açılır); belgedeki
      adımlar operasyon ve/veya evrensel savaş, ara ve son kararlar (iyi / kötü ya da yol), ödül malzemesi, kalıcı etki ve
      çapraz bağlar; her nöbet bir kez gezegen hasadı (kenetlenince).

## 41. v4 / gezegen-10-...-hikayesi.txt (3.4, gezegenHikayeleri.js gz_p10): Janus Split
- [x] "Alacakaranlık Çizgisinde İki Kardeş" — çağıran İkiz kardeşler Soren ve Nadia; gezegen operasyonu bitince telsizden gelir (gemi dururken uzayda da açılır); belgedeki
      adımlar operasyon ve/veya evrensel savaş, ara ve son kararlar (iyi / kötü ya da yol), ödül malzemesi, kalıcı etki ve
      çapraz bağlar; her nöbet bir kez gezegen hasadı (kenetlenince).

## 42. v4 / gezegen-11-...-hikayesi.txt (3.4, gezegenHikayeleri.js gz_p11): Fulgur-3
- [x] "Yıldırım Senfonisi ve Kıvılcım-7" — çağıran Maestro Kıvılcım-7 (bakım robotu); gezegen operasyonu bitince telsizden gelir (gemi dururken uzayda da açılır); belgedeki
      adımlar operasyon ve/veya evrensel savaş, ara ve son kararlar (iyi / kötü ya da yol), ödül malzemesi, kalıcı etki ve
      çapraz bağlar; her nöbet bir kez gezegen hasadı (kenetlenince).

## 43. v4 / gezegen-12-...-hikayesi.txt (3.4, gezegenHikayeleri.js gz_p12): Miasma-9
- [x] "Kemik Flütleri ve Bataklık Hekimi" — çağıran Dr. Veyra (yazılı telsiz); gezegen operasyonu bitince telsizden gelir (gemi dururken uzayda da açılır); belgedeki
      adımlar operasyon ve/veya evrensel savaş, ara ve son kararlar (iyi / kötü ya da yol), ödül malzemesi, kalıcı etki ve
      çapraz bağlar; her nöbet bir kez gezegen hasadı (kenetlenince).

## 44. v4 / gezegen-13-...-hikayesi.txt (3.4, gezegenHikayeleri.js gz_p13): Umbra (Kayıp)
- [x] "Güneşsiz Dünyanın Sıcak Kalbi" — çağıran Kör Kaptan Mira; gezegen operasyonu bitince telsizden gelir (gemi dururken uzayda da açılır); belgedeki
      adımlar operasyon ve/veya evrensel savaş, ara ve son kararlar (iyi / kötü ya da yol), ödül malzemesi, kalıcı etki ve
      çapraz bağlar; her nöbet bir kez gezegen hasadı (kenetlenince).

## 45. v4 / gezegen-14-...-hikayesi.txt (3.4, gezegenHikayeleri.js gz_p14): Fractura
- [x] "Kırılan Kıtanın Halatı" — çağıran Kaptan Oskar (Çapa-3); gezegen operasyonu bitince telsizden gelir (gemi dururken uzayda da açılır); belgedeki
      adımlar operasyon ve/veya evrensel savaş, ara ve son kararlar (iyi / kötü ya da yol), ödül malzemesi, kalıcı etki ve
      çapraz bağlar; her nöbet bir kez gezegen hasadı (kenetlenince).

## 46. v4 / gezegen-15-...-hikayesi.txt (3.4, gezegenHikayeleri.js gz_p15): Carbonis V
- [x] "Sürtünmesiz Labirent ve Elmas Çekirdeği" — çağıran Madenciler Bram ve Kaelith Sera-K; gezegen operasyonu bitince telsizden gelir (gemi dururken uzayda da açılır); belgedeki
      adımlar operasyon ve/veya evrensel savaş, ara ve son kararlar (iyi / kötü ya da yol), ödül malzemesi, kalıcı etki ve
      çapraz bağlar; her nöbet bir kez gezegen hasadı (kenetlenince).

## 47. v4 / gezegen-16-...-hikayesi.txt (3.4, gezegenHikayeleri.js gz_p16): Radion Kızıl
- [x] "Geiger Gölgesindeki Son Nöbet" — çağıran Teknisyen Halvar (Kurşun-4); gezegen operasyonu bitince telsizden gelir (gemi dururken uzayda da açılır); belgedeki
      adımlar operasyon ve/veya evrensel savaş, ara ve son kararlar (iyi / kötü ya da yol), ödül malzemesi, kalıcı etki ve
      çapraz bağlar; her nöbet bir kez gezegen hasadı (kenetlenince).

## 48. v4 / gezegen-17-...-hikayesi.txt (3.4, gezegenHikayeleri.js gz_p17): Automata Enkaz
- [x] "Milyon Yıllık Vardiya" — çağıran Fabrika bilinci Ünite-0; gezegen operasyonu bitince telsizden gelir (gemi dururken uzayda da açılır); belgedeki
      adımlar operasyon ve/veya evrensel savaş, ara ve son kararlar (iyi / kötü ya da yol), ödül malzemesi, kalıcı etki ve
      çapraz bağlar; her nöbet bir kez gezegen hasadı (kenetlenince).

## 49. v4 / gezegen-18-...-hikayesi.txt (3.4, gezegenHikayeleri.js gz_p18): Chronos Döngü
- [x] "Patlamadan Önceki Son Yankı" — çağıran Pilot Elara; gezegen operasyonu bitince telsizden gelir (gemi dururken uzayda da açılır); belgedeki
      adımlar operasyon ve/veya evrensel savaş, ara ve son kararlar (iyi / kötü ya da yol), ödül malzemesi, kalıcı etki ve
      çapraz bağlar; her nöbet bir kez gezegen hasadı (kenetlenince).

## 50. v4 / gezegen-19-...-hikayesi.txt (3.4, gezegenHikayeleri.js gz_p19): Aero-Flora
- [x] "Gökyüzünün Balina Şarkısı" — çağıran Ana Kese (hidrofon) ve Vaelin sözcüsü Sira-Vel; gezegen operasyonu bitince telsizden gelir (gemi dururken uzayda da açılır); belgedeki
      adımlar operasyon ve/veya evrensel savaş, ara ve son kararlar (iyi / kötü ya da yol), ödül malzemesi, kalıcı etki ve
      çapraz bağlar; her nöbet bir kez gezegen hasadı (kenetlenince).

## 51. v4 / gezegen-20-...-hikayesi.txt (3.4, gezegenHikayeleri.js gz_p20): Corona Lux
- [x] "Güneşin Kalbindeki Kapan" — çağıran Fizikçi Dr. Kaelen-Sol (Helios-1); gezegen operasyonu bitince telsizden gelir (gemi dururken uzayda da açılır); belgedeki
      adımlar operasyon ve/veya evrensel savaş, ara ve son kararlar (iyi / kötü ya da yol), ödül malzemesi, kalıcı etki ve
      çapraz bağlar; her nöbet bir kez gezegen hasadı (kenetlenince).

## 52. Gezegen hikâyelerinin ortak [~] notları (3.4)
- [~] Trellis-7, Seraphine, Profesör Püskül ve Sarah'nın T-09 ikiye katlaması şimdilik bayrak ve güç itibarı (Faz 5'te
      karakter olarak).
- [~] Cahelon'a karşı abis verisi üstünlüğü bayrak olarak duruyor; Aşama 4 boss savaşında okunacak.
- [~] Bazı ödüller yaklaşık: GK miktarları belgedeki gibi, birkaç parça yerine yakın parça (ör. kuantum çip).
- [x] Etkiler: optik kalkan, helyum-3 yakıt ×0,85, hiper itki ×1,15, termal/kriyo/çift kaplama, EMP hasar +%5, yıldırım
      şarjı, yerçekimi operasyon hasarı ×0,7, nükleer kalkan, Halvar reaktör lab ×1,15, uzak tamir, takyon şarjı (0 ya da
      yarı), kargo, yıldız kalkanı, plazma motoru ×1,2, karanlık halka yakıtı ×0,8, enzim tarım ×1,15, Brom dökümhane ×0,9,
      Galaktik Kâşif unvanı (hasar ×0,95).

## 53. v4 / asama-4-tonoflenya-ana-gorevler-ve-final-derinlestirme.txt (3.5; final.js, asama4.js, malken.js, savas.js)
- [x] 4A Altı Yıldızın Altında: varış sahnesinde manyetik fren kilidi (klank, tıslama), öğrenci uğultusu, altı notalı çan
      akoru; Valen ve Kefius'un sözleri. Final #1 ödülü: 500 ML, YGK Kayıt Mührü (Kat 1-5 ve pazar erişimi), 100 Keşif
      Kredisi (Galaktik Keşif Kredisi); altı YGK Seçkin Subayı bu ödülle resmen kadroda. [~] Önceki sürümdeki 5000 ML
      belgedeki 500'e indi; Kıdemli Kaptan Brövesi (önceki belge) korundu.
- [x] 4B Zirve İğnesi'nin Hizalanması: Final #3 bitince Kefius ve Gözlemevi Görevlisi telsizden çağırır (Hikâye çağrıları);
      iki parmakla çevirerek altı yıldızın ışığı iki adımda tek tonda toplanır → Kronik #4 açılır, Okyanos-Abyssus kodekse
      girer, Malazar yolu açılır. Final #4 bunu bekler. [~] Eski frekans iğnesi (2.1) Malazar izni için yerinde duruyor.
- [x] Final #16: Mareşal Elyon Vane'nin sözü; Adım 1 karanlık sızma (40 Hz davul nabzına ters yana kaydırma); Adım 2 gizli
      geçit haritası zırhlının kalkanını yüzde yirmi beş kırık başlatır (önceden gövde yüzde otuz); Adım 3 iki aşamalı
      Kahergonat Öncü Zırhlısı (T4; kalkan tonu değiştirir, ağır plazma; yarıda kalkan patlar, iki gölge dronu, ışık
      mızrağı ve torpido iki kat). Ödül Runashar Mühür Taşı, 2000 ganimet kredisi ve 150 kara aether ya da arıtma hakkı
      (karar: ambara al / YGK'da arıt → 60 saf aether). [~] Arıtma hakkının karşılığı (60 saf aether) benim tahminim.
- [x] Final #17 → #18: A sarayı ve halkı koru → Elyon Vane Final #18'de refakatçi (ilk üç tur zırh yüzde yirmi, her atışta
      ek atış); B kuşatma merkezine saldır → Sharon ikinci aşamada tek gölge muhafızı çağırır.
- [x] Final #18 Dünya Çivisi: Valen, Kefius ve Sharon'un sözleri; hazırlıkta Malok'un parçası ve Tyzrakhel Işık Prizması
      birleşip Tyzrakhel Işık Mızrağı olur ve kuşanılır; Kırmızı Mühür Parçası Sharon'un karanlık hasarını yüzde yirmi
      azaltır; önce üç aşamalı kara boss savaşı (Lord Sharon T5: çifte gölge kılıcı; karanlık, muhafızlar ve sahte yönler;
      ölümsüz gölge zırhı, yalnız mızrak yarar), sonra mühür taşlarını yuvalara itme ve büyü çemberi. Ödül Efsanevi Aether
      Reaktörü (Okyanos-Abyssus sıçramasının tek anahtarı: Final #19 bunu da ister) ve Malken Kahramanı unvanı.
- [x] Final #19 → #20 Cahelon: girdap ve infrasonik çığlık, Valen'in telsiz sözü; üç aşamalı uzay boss savaşı (yüzey
      girdabında Girdap Anahtarı kalkanı dengeler, alınan hasar yüzde yirmi beş az; derin aşamada dalar, yalnız infrasonik
      nabızdan bulunur, su yaratıkları; Thalassa'nın abis verisi varsa yer kaybolmaz; son aşamada uyarı penceresi 1,5 sn,
      frekans eşlemesi ve ışık darbeleri büyük hasar). Kapanış: altı yıldızın sabit uyum akoru, Evrenin Muhafızı, köprüde
      kalıcı barış, serbest keşif. [~] Eski jest operasyonu (sonar, ritim, uzun basma) yerini savaşa bıraktı.
- [x] Düşman kataloğu Boss 1 Xarathia: Pyros-Prime hikâyesi (gz_p01): ısı dalgaları, soğuk armağanla (iki dondurucu köpük
      ya da beş kriyolit) ittifak, savaşılmaz; ya da iki aşamalı boss savaşı. [~] Pyros-Prime'ın ayrıntılı hikâye belgesi
      yok; adımlar, armağan ve ödüller benim taslağım, Bahtiyar'a sorulacak.
- [x] Düzeltme: hikâye motorunda ara karardan sonraki adımın atlanıp atlanmayacağı artık seçilen seçeneğe göre hesaplanıyor.

## 54. v4 / ygk-akademi-gezilebilir-sistem-ve-10-kursu.txt (3.6; akademi.js, harita.js, malken.js)
- [x] 1 On bir katın adları ve sesleri belgedeki gibi (varış avlusu ve talimgâh, amfiler ve cep-park, kristal ihtisas ve
      zanaat, kartografya ve kütüphane, iskele ve simya laboratuvarı, konsey ve gözlemevi; röle ve mekik, sessiz arşivler,
      Malazar çatlağı, stasis hücreleri, Sıfırıncı Karanlık). Açılış: Faz A Final 1, Faz B Final 3, eksi dört Final 13, eksi
      beş Final 15 ya da Başmüfettiş mührü. [~] Kabul masası (kat 1), Final 1 için Konsey (kat 6, kayıttan sonra) ve sıradaki
      final görevinin katı (Final 3 için eksi üç) her zaman açık; yoksa oyun ilerlemezdi.
- [x] Dokunsal gezinme: asansörde katlar listesi (kapalı katlar "kapalı" diye okunur); kat içinde iki parmakla sağa/sola
      kaydırma kattaki kişi ve odalara sırayla yürütür. [~] Asansörde kat seçimi mevcut sesli liste hareketleriyle
      (tek parmak sağ/sol gezinme, çift dokunma) yapılıyor; belgede tek parmak yukarı/aşağı yazıyor.
- [x] Kişiler: Ignador, Faelan, Kaelis, Tixie, Forges, Zeva, Kefius, Profesör Püskül, Trellis-7, Seraphine, Valen, Maelis,
      Silas Vex, Jolkar Tectus, Caelum Nokturnus; eksi dörtte Zephyra ve Morwenna. (Trellis-7, Seraphine ve Püskül 3.4'teki
      [~] notundaki karakterlerdir; artık konuşulabilir.)
- [x] 2 On kürsü testi (hikâye motoru, noktadan başlar; her biri belgedeki görevden sonra açılır, +50 ilgili ekol kıdemi):
      Korvinus frekans kalkanı kırıkken +%25; Silas pusu önleme ve ilk uyarı öncesi pay; Forges zırh ve gövde malzemesi
      %10 ucuz; Jolkar ritim + T4 kara savaşı, karanlığa stres direnci %20; Faelan aşırı ısınmada Glitch Atışı; Trellis-7
      zehir/asit %25 direnç ve iki nadir tohum; Seraphine savaştan sonra stres yarıya; Caelum sıçrama ve seyahat %20 kısa;
      Kaelis T3 ses illüzyonuyla düello, yetenekler bir tur hızlı dolar; Zeva araç ve gezegen inişi hasarı %30 az.
      [~] Kaelis'in ödülü bütün yetenek beklemelerine uygulandı (belgede yalnız sahte gürültü/şaşırtma).
- [x] 3.1 Dört kilit figür: Ignador'un reformu (darbe → Valen eksi dörde, Morvenna Kael yönetir, YGK -20; Valen korunursa
      YGK +15, Ignador gözetmen indirimi düşer); Kefius güveni 30'u geçince Final 18'de Sharon'un kalkanı %20 zayıf; Tixie
      beşinci kattaki çiple T-03'ü açar, ihbar edilirse kaçar (YGK +15, T-03 yok).
- [x] 3.2 Stasis: Zephyra serbest → Fırtına Kalkanı (iyon/yıldırım %20 direnç, Arin ve Güney rotalarında tehlike yok) ya da
      hücrede (YGK +10); Morwenna serbest ya da ikna → Final 18'de Sharon'un zihin saldırıları %25 zayıf; hücrede bırakılırsa
      kara aether verisi. [~] İkna için Kefius'un güveni ya da Silas'ın dersi şartı benim eklemem.

## 55. v4 / tonoflenya-30-yan-gorev-derinlestirme.txt (3.7; yanDerin.js, yan.js)
- [x] 1.1 Olmayan ön koşullar gerçek karşılıklarına bağlandı: gürültü pelerini / zihin tılsımı → Fenrir Işık Pelerini ya
      da Baş-Büyücü Cübbesi; plazma söndürücü → iki dondurucu köpük; aether akort anahtarı → T-05 Sonik Tüfek ya da Sinha
      çipi; şok mızrağı / plazma kılıcı → Zhaor Işık Mızrağı ya da Filtra Tüfeği; Manta-01 / Nomad-01 → Çöl Tilkisi ya da
      Mammoth; zırh seviyesi 2 → Filtra oksit zırhı ya da lamine zırh; savaş seviyesi 15 → Kırmızı ekolde Yıldız Muhafızı
      (300); gemi sınıfları belgedeki gibi (7 ve 19: Sınıf II, 28: Sınıf III). [~] Karşılığı belgede yazmayan öteki gereçler
      (sonar, barometre, tarayıcı…) eskisi gibi görevi veren kişi ödünç veriyor.
- [x] 1.2 Ödüller beş ana güce yazar (g_ygk, g_bati, g_dogu, g_kuzey, g_guney; karakter ağındaki bölge itibarında
      görünür); Drahmir artık Kuzey'e sayılıyor. Ortak tetik: yan görevler Final 1'den (YGK Kayıt Mührü) sonra.
- [x] 2-6 Nöbet dinamikleri: MAG-01 Altın Gece ya da Gümüş Şafak, MAG-03 Mor İkindi, STH-01 Mavi Akşam.
- [x] On çatışmalı göreve evrensel savaş (operasyondan sonra çatışma, zaferde karar; yenilgide noktadan yeniden girilir):
      MAG-04 Varek savaş otomatı (T3 frekans), WST-04 iki kraliyet sınır muhafızı, EST-01 iki kum kertenkelesi, EST-02 cam
      akrebi (sonik kovucu ilk turda zırhı sarsar), EST-03 üç haydut çetesi (teslim), NTH-01 çılgın simya muhafızı, NTH-03
      iki yıldız paraziti (ışık mızrağı iki kat), NTH-06 iki buzul biyom yaratığı, STH-04 korvet ve dron taşıyıcı (uzay),
      STH-06 sis feneri canavarı.
- [x] Belgedeki Seçenek A/B ödülleri (karışanlar düzeltildi): bütün otuz görevin ödülleri belgeye göre; tek "Ödül" yazan
      görevlerde ödül iki seçeneğe de eklendi. Varek bataryası yüzde on beş; MAG-03 melez üretim süresi %10 kısa;
      WST-05 Julithan limanında Filtra oksit demiri %20 ucuz (limana oksit demiri satışı eklendi); WST-06 günlük yüz liralık
      kervan hissesi; EST-04 Hardrin bariyeri üç çatışma; NTH-02 Kuzey girdap ve kara buz bağışıklığı; NTH-06 B üç sınır
      askeri (kara çatışmasında hasar %10 az); STH-05 B haftada elli gram ışık tozu.
      [~] Bazı eski ödüller (gümüş rozet, liman nişanı, yadigârlar) belgeyle çelişmediği için korundu. STH-03'teki
      Aethelgard / Nyxara ayrımı ödül metninde söyleniyor; ayrı karakter olarak eklenmedi.

## 56. v4 / tonoflenya-bolgesel-gorevler-ve-ambargo-entegrasyonu.txt (3.8; gecitler.js, bolgesel.js)
- [x] 1 Seyahat ve geçit kuralları: başkent ve bütün kuşaklar Final 1'den (YGK Kayıt Mührü) sonra (Yıldız Yolu kapısı
      da); Zinas fırtınasında Çöl Tilkisi ya da Sınıf II gemi avantajı; Tentran kapısında ışık tozu harcı (izinle on gram,
      izinsiz kırk); Arin'e Atmosphere-X ya da YGK hava izni (Barracuda korunduysa yalnız Atmosphere-X); Zorah fırtınası
      Ajmero küresi yoksa ağır, varsa zararsız; Kahergonat Yolu yalnız Mavi Akşam (önceden vardı); Mormon Denizi Sınıf II
      gemi ve Mormon pusulası ya da girdap bağışıklığı yoksa gövdeye yüzde on hasar.
      [~] Belgedeki süreler (ör. YGK'dan Magentor'a "yarım gün, 1,5 nöbet") atlasın mevcut sürelerinde bırakıldı: oyunda
      bir gün altı nöbet, yarım gün üç nöbet ediyor; belgedeki iki değer birbirini tutmuyor. Tentran harcının miktarı ve
      Arin'in YGK hava izni benim kararım.
- [x] 2 Dört bölge × üç aşama (hikâye motoru, telsiz çağrısı): Oronte (galeri basıncı + zırhlı maden otomatı; Julithan
      korveti, kargo kararı; iki ağır maden korsanı), Barracuda (sığlıklarda kaçış + avcı botu; Aethelgard ya da Barracuda;
      gölge korsanı ve dron taşıyıcı), Zeno (sesli pusula + kum akrebi ve haydut; paralı askerler, vaha kararı; haydut
      lideri ve tarikat muhafızı), Mirelza (iki donmuş kristal akordu; iki kadim otomat, kazı kararı; Alt Evren sürüsü).
      Açılış: 1. aşama Final 1 ve o kuşağa ilk gidiş, 2. aşama Final 6, 3. aşama Final 10 ya da komuta merkezi. Üçüncü
      aşama liderin taslağını (T-02, T-07, T-05) ve Tether-Key mekik hakkını açar; mekik etkileri önceki sürümdeki gibi.
      [~] Bir kuşağa geçidi yürüyerek (seyahat menüsü yerine kapıdan) geçince ilk aşama çağrısı gelmeyebilir.
- [x] 3 Büyük Ambargo (Final 12'den sonra, Final 16'dan önce; Valen ya da stasisteyse Morvenna duyurur): A başkent → Final
      17-18 çatışmalarında YGK büyücü takviyesi (işaretleme) ve tam yakıt ikmali; itibarı düşük olan Oronte ya da Barracuda
      mekik hakkını final sonrasına kadar askıya alır. B taşra → dört kuşak +10, YGK -20; Final 17'de dört bölge gönüllü
      filosu (işaretleme, operasyon hasarı yarı); Magentor kapıları kapalı (sıradaki final görevi oradaysa geçilir),
      Akademiye eksi birinci kattaki Kör Rıhtım'dan girilir; Final 18'den sonra kapılar açılır.

## 57. v4 paketinin bütün belgeleri işlendi.

## 58. Savaş sesleri (3.9, Murat'ın isteği; belge dışı)
- [x] Her düşman türü bir ses ailesine bağlı (src/oyun/uzay/savasSesleri.js AILE; 42 tür, 22 aile). Her ailenin geliş,
      hafif hasar, ağır hasar (gövdenin dörtte biri ya da can üçte birin altı), yetenek (çağırma, kalkan tonu, sis,
      zehir, dalış...) ve ölüm sesi; kahergonat, Xarathia, Lord Sharon ve Cahelon'un aşama geçişi sesi. Yer değiştirme
      ve kaçış hareket sesi. ElevenLabs sfx v3, 120 efekt (flow BPWC2OLWbdljIKExgHDq, 17 kredi).
- [x] Silahlar: düşmanın atışı darbe anında (plazma, ağır plazma, lazer, tüfek, kılıç, pençe, ısı dalgası: Drive
      Efektler arşivi; torpido, iyon, gölge oku, sonik dalga: ElevenLabs), uyarı sesi aileye göre (otomat lazer şarjı,
      boss hazırlıkları, uçanın dalışı, kriyo nefesi). Oyuncunun gemi lazeri (Efektler 4) ve tüfeği, torpido fırlatma.
- [x] Vuruşlar: kalkana (ElevenLabs), sipere ve zırha (Drive), gövdeye (Drive), ağır darbede patlama; düşman kalkanının
      atışı saptırması (uzayda ve frekans kalkanlılarda); ıska ıslığı; kalkan kırılması; kalkan açılışı (Drive,
      "Geleceğin Silah Kalkanı"); uzay ve kara savaş alarmı; zafer ve yenilgi.
      [~] Sesler kulaklıkta konumlu değil (iki kulağa eşit); konum düşmanın motor tonundan ve uyarı notalarından gelir.

## 59. Tarım alanı ortam sesi (3.9, Bahtiyar): tarım alanı ve Kadim Krater aynı dosyayı iki ayrı oynatıcıyla açıyordu;
      artık tek oynatıcı (efektler.js TAKMA_ADLAR). [~] Telefonda doğrulanmadı.
      3.10 (Bahtiyar): müzik Saklı Kseno-Vaha'ya taşındı; koloninin iç mekânı "Koloni Sera Binası", şimdilik biyo-kubbe
      sera ortamı. 3.11: Bahtiyar'ın sera kaydı geldi (ortam_sera). Kalanlar: yukarıdaki [~] notları (Bahtiyar'a sorulacaklar) ve telefonda deneme.

## 60. Savaş eğitimi (3.13, Murat): uzay ve kara için ilk çatışmadan önce zorunlu eğitim sekansı.
- [x] uzay/egitim.js (adım ve metin tablosu), savas.js egitimKur/egitimGirdi/egitimIlerle: savasBaslat bir ortamda
      bayrak egitim_<ortam> yoksa önce eğitimi açar (hedef: simülasyon dronu / eğitim otomatı), bitince bekleyen
      çatışmayı başlatır; savaş sonrası sahnesi korunur. Dokuz adım; hasar yok, yanlışta adım yinelenir; savunma
      adımlarında uyarı oyuncu hazır deyince gelir (4,5 sn pencere). Yetenekler simülatörde uygulanmaz (sarf harcanmaz).
- [x] 3.15 (Murat): savaştan önce kendiliğinden açılmıyor; menüde "Savaş eğitimi" başlığı (kara baştan, uzay ilk gemiyle;
      tamamlanmadıysa başlıkta "zorunlu, tamamlanmadı"). Eğitimsiz: bekleyen çatışma bekler ve bir kez hatırlatılır, komuta
      saldırısı ve bizzat savunma reddedilir (otomatik savunma serbest), uzayda rastgele korsan çıkmaz. Yinelenebilir.
      [~] Telefonda denenmedi; adımların okunma hızı ve uyarı süresi Bahtiyar'ın denemesine göre ayarlanabilir.

## 61. Gün uzunluğu ve dinlenme (3.16, Murat; analiz 23 Kasım): nöbet 20 → 10 dakika (zaman.js NOBET_SN 600, GUN_SN,
      SAAT_SN; atlas/malken/zanaat/yan/mini'deki sabit 7200/1200/300 bunlara bağlandı). Evrensel zaman sarma
      (gorevler.zamanSar) ve "Dinlen ve bekle" menüsü; sarmada mini donar, baskına otomatik savunma, özet haberi.
- [x] 3.17: Ayarlar'da nöbet uzunluğu 10-30 dk (5'er); zaman.js zamanOrani/gercekSn, zamanSar gerçek saniye.
- [x] testler/zaman.test.js. [~] Telefonda denenmedi; yönergedeki "20 dakikalık nöbet" ölçeğinden Murat'ın kararıyla sapıldı.

## Sıradaki adımlar (sırayla)
0. Tonoflenya genişlemesi, yönergedeki sırayla: [2.1: Malken (12); 2.2: tarihçe (13); 2.3: atlas (14); 2.4: eşya,
   zanaat, mürettebat (15), Ekol Kıdemi ve rastgele karşılaşmalar; 2.5: yirmi final görevi (16); 2.6: otuz yan görev
   ve itibar matrisi (17)]. Tonoflenya belgelerinin hepsi işlendi.
0b. v4 paketi: Faz 2 (binalar, gemiler, araçlar, eşyalar, dinamik yakıt), Faz 3 (karakterler, komuta paneli; 3.2), Faz 4
   (ana hikâye, 18 gezegen hikâyesi, bosslar), Faz 5 (YGK Akademi, yan görevler, ambargo).
1. Telefonda deneme: seslendirilmiş telsizlerin düzeyi ve anlaşılırlığı (Murat ve Bahtiyar), ses dengeleme ve
   erişilebilirlik testleri. İstenirse koloni bilgisayarı için ayrı bir ses.
