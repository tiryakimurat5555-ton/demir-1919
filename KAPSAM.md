# Belge kapsamı: Bahtiyar'ın 17 belgesinin her bölümü ve durumu

Murat'ın isteği (20 Kasım 2026): "Belgedeki hiçbir şeyi atlama." Bu liste belgeler/ klasöründeki dokuz belgenin
bütün bölümlerini sırayla sayar (21 Kasım: v3 paketiyle sekiz belge daha geldi, bölüm 10-17). Her sürümde güncellenir; bir bölüm burada "yapıldı" olmadan atlanmış sayılmaz.

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
      zamanlı akar; hiper-sıçrama yok, ileri sarma işlevi (ileriSar) Tonoflenya yolculuğu için hazır.
- [ ] 5.A Yıldız Ekolü Kıdemi (altı ekol, dört kademe, kabiliyetler): Tonoflenya bölümleriyle (sıra: eşya-zanaat'tan sonra).
- [~] 5.B Rastgele karşılaşma motoru: korsan pususu 1.3'ten var (sefer.js). Sürüklenen sandıklar (sesli kilit), astral
      fırtına (frekans tutturma), kaçak mülteci sinyali yok; sıra: 5.A ile.
- [x] 6.A zaman modeli · [x] 6.B ekim yatağı ve işçi modeli · [ ] 6.C prosedürel istasyon modeli (eşya-zanaat 1 ile).

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
- [ ] 1 Hekzat sistemi · 2 Malken ırkı · 3 Malkenia ve altı halka (3.1-3.3) · 4 Güney havzası (4.1-4.5) · 5 YGK Akademi
      (yüzey ve yeraltı katları) · 6 Malazar Dağı · 7 Çevre krallıklar · 8 Hikâye köprüsü. Sıra: tarımdan sonra ilk.

## 13. tonoflenya-kadim-tarihcesi-ve-kronikler.md
- [ ] 1-12 Kozmik şafak, Üçler miti, koruyucular, Cahelon, Malken I. Çağ, Tyzrakhel, Kahergonat, Beyaz Kıyamet, Valen'in
      portalı, Bagrius hanedanı, III. Çağ, çağlar matrisi (kodeks kayıtları ve sahne metinleri olarak).

## 14. tonoflenya-buyuk-cografi-atlasi.md
- [ ] 1 Beş kuşak · 2 Merkez kuşak (2.1-2.4) · 3 Batı (3.1-3.3) · 4 Doğu (4.1-4.3) · 5 Kuzey (5.1-5.4) · 6 Güney
      (6.1-6.4) · 7 Lojistik, hammadde ve seyrüsefer matrisi (7.1-7.3).

## 15. tonoflenya-esya-zanaat-ve-murettebat-rehberi.md
- [ ] 1 YGK çekirdek subayları · 2 Hammaddeler (2.1-2.3) · 3 Zanaat (silahlar, zırhlar, gemi modülleri, iksirler) ·
      4 Yadigârlar ve görev eşyaları · 5 Envanter, kargo ağırlığı, para birimleri ve ticaret masası.

## 16. tonoflenya-buyuk-final-gorevleri.md
- [ ] 1 Tetiklenme ve çift dokunuşlu harita geçişi · 2 Yirmi ana görev (Kısım I-VII: YGK ve Malkenia 1-3, Malazar 4-6,
      Fenrir 7-9, Doğu çölleri 10-12, Kara Göl 13-15, Kahergonat 16-18, Cahelon finali 19-20) · 3 Ses motoru şartları.

## 17. tonoflenya-yan-gorevler-ve-yerel-vakalar.md
- [ ] Bölüm 1-5: otuz yan görev (Magentor 1-6, Batı 7-12, Doğu 13-18, Kuzey 19-24, Güney 25-30) · 6 Ödül ve itibar
      matrisi · 7 Entegrasyon direktifi.

## Sıradaki adımlar (sırayla)
0. Tonoflenya genişlemesi, yönergedeki sırayla: Malken medeniyeti ve hekzat sistemi (bölüm 12) → kadim tarihçe (13,
   kodeks) → coğrafi atlas (14, beş kuşak haritası ve gemiyle Tonoflenya yolculuğu) → eşya, zanaat ve prosedürel
   mürettebat (15; Ekol Kıdemi ve rastgele karşılaşmalar, yönerge 5) → yirmi final görevi (16) → otuz yan görev (17).
1. Telefonda deneme: seslendirilmiş telsizlerin düzeyi ve anlaşılırlığı (Murat ve Bahtiyar), ses dengeleme ve
   erişilebilirlik testleri. İstenirse koloni bilgisayarı için ayrı bir ses.
