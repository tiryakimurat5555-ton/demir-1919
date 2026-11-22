# Aethelis — çalışma notları

Bu depo ve Expo projesi (@murat5561/demir-1919) 20 Kasım 2026'dan beri Bahtiyar Cankurt'un uzay oyunu için
kullanılıyor (Murat: "Bahtiyar'ın projesini demir1919 projesine yaz, Demir oyununu kaldırabilirsin"). Eski
Demir 1919 oyunu silindi; geçmişi git kaydında (son sürüm 1.06, commit 556f89a). Depo adı ve Expo kısa adı
(slug) değişmedi; uygulamanın görünen adı "Aethelis" (çalışma adı, Murat ya da Bahtiyar değiştirebilir).

## Murat ile çalışma
- Murat'ın yalnızca iPhone'u var; kodu elle düzenleyemez. Bütün dosyaları ben yazar, depoya gönderirim.
  Asla "şu satırı değiştir" türü talimat verme. Kendisinin yapacağı adımlarda sayfanın doğrudan bağlantısını ver.
- Murat görme engellidir (VoiceOver kullanır); görsel tasarımı görüntüden değerlendiremez.
- Her şey Türkçe: arayüz, sesli rehber, kod içi adlar ve yorumlar.
- Diğer projeler (kayip-okyanus, TaslarPro, Deneme/Galaktik İmparatorluk) ayrıdır; onlara dokunma.
- Test edilmemiş bir özelliği çalışıyor diye sunma; telefonda ancak Murat Expo Go'da denediğinde doğrulanır.
- Bahtiyar Android/TalkBack ile test eder; Drive'ı (bahtiyar.oflu.61@gmail.com) bu sohbete bağlı.
- Murat (20 Kasım): "Belgedeki hiçbir şeyi atlama." KAPSAM.md dokuz belgenin her bölümünü ve durumunu sayar;
  her sürümde güncellenir. Bir bölüm orada yapıldı işaretlenmeden atlanmış sayılmaz.

## Tasarım kaynağı
- belgeler/ içindeki 17 belge (Bahtiyar'ın; 21 Kasım v3 paketiyle sekiz belge eklendi: tarım ve yedi Tonoflenya belgesi,
  sırası tonoflenya-ve-yeni-sistemler-gelistirici-yonergesi.md bölüm 2'de). Okuma sırası ve yol haritası:
  belgeler/gelistirici-entegrasyon-rehberi-ve-yol-haritasi.md (Faz 1-5). Sıra: tasarim-ve-senaryo → gezegen-gelisimi-v2
  → araclar-ve-gemi-filosu → savas-yetenek-ve-murettebat → derin-uzay-gorevleri (1, 2) → kesfedilebilir-gezegenler
  → derin-uzay-kesifleri-ve-evren-kutuphanesi.
- Temel kurallar: görselsiz, 3B ses + dokunma hareketleri; dikey ekran; çıkışta otomatik kayıt + istasyonda
  elle kayıt (3 yuva); ortam sesleri Drive'daki Efektler/Ambians'tan, kısa efektler ve telsiz sesleri ElevenLabs;
  savaş "A Blind Legend" tarzı reaktif ve tur tabanlı; görevler şansla değil doğru donanımla çözülür.

## Yapılanlar
- SÜRÜM 0.1 (20 Kasım): Faz 1 + yüzeyde birinci görev "Sinyal Arayışı". Telefonda denenmedi.
  - Durum: src/oyun/durum.js yeniOyun(tohum) (koloni, gemi null, murettebat, kaptan, itibar, kodeks, harita.poiler,
    gorev {id}, bayrak {}, envanter, stok, kesif). KAYIT_SURUMU 1, gecerliMi.
  - Kayıt: src/oyun/kayit.js otoOku/otoYaz (10 sn'de bir, her eylemde, AppState arka plan, çıkış; yedekli),
    yuvalariOku/yuvayaYaz (3 yuva; yalnız kapsüldeki merkez terminalinden), ayarlar (eski demir1919.ayarlar taşınır).
  - Veri: src/oyun/veri/tesisler.js (HAMMADDELER, TESISLER 5 tesis + maliyet/kosul, KOLONI_KADEMELERI),
    gemiler.js (5 sınıf, 9 modül katmanı; tersane Faz 3), murettebat.js (tohumlu uretec, uyeUret, oncuUret: mühendis,
    telsizci [ses_hassas], hekim).
  - Yüzey: src/oyun/yuzey/harita.js (MEKANLAR vadi [-55..55, -45..60] ve kapsul [x 300-306]; KAPILAR kapsul_kilit;
    NOKTALAR terminal, dolap, kapsul_dis (engel), enkaz (-24,20), jenerator (16,12), tepe (4,50), kaynak yatakları
    bazalt×3 (stok 3), kristal×2 (stok 2, çınlar), titanyum×2 (stok 2), kilitli çıkışlar guney_yol/bati_yol/kuzey_yol;
    KISILER muhendis/telsizci/hekim, rol = murettebat sırası). dunya.js: ilerle (YURUME_HIZI 2,6, dönüş tıkı 30°,
    sınır ve engel çarpması, yaklaşınca bir kez haber), cevreMetni, radar (RADAR_MENZILI 70; pingler gecikme
    250 + 22×m ms; bulduklarını kesif'e ekler), etkiles, gec, yerlerListesi/otoBaslat (düz yürüyüş, engelde yana kayar,
    kapıdan kendisi geçer), durumMetni. gorev1.js: SAHNELER acilis → acilis2 → (oyun) → telemetri → kule;
    noktaEylemleri/eylemUygula; konusma(kisi); frekans ayarı ayarBaslat/ayarDegis/ayarIlerle/ayarYakinlik
    (kanal 0-120, hedef 50-90 tohumdan, ±1,2 içinde 2,5 sn → kilitlendi; 4'ten yakın ilk kez → 'yakin');
    insaListesi/insaEt (sinyal_kulesi: 6 bazalt, 3 titanyum, 2 kristal; telemetri bayrağı gerekir → sahne kule,
    itibar +10, harita sektor15, bitenGorevler sinyal, gorev jeotermal [bu sürümde yok]).
    Bayraklar: kesiciAlindi, antenAlindi, hucreAlindi, jenerator, antenKuruldu, telemetri, kule.
  - Ekran: src/ekran/Yuzey.js (Karakoy.js'ten uyarlandı). Konumlu sesler: kopan modülün feneri (bip, 2 sn), çalışan
    jeneratör (dongu), kristaller ('kristal' sentez). Kapsülün içindeyken dinleyici kapsülün vadideki yerinde, boğuk.
    Uzun bas = radar (sonar + nesnelerden bip yankıları + en yakın üç). Frekans ayarı ayrı katman: tek parmak
    yukarı-aşağı sürükleme (0,06 kanal/px), iki parmakla çevirme (7 kanal/rad), sağa-sola kaydırma ±0,2.
  - Ses motoru src/ses/konumsal.js (Demir 1919'dan; WebView + Web Audio HRTF, Expo Go'da doğrulanmıştı) eklemeleri:
    'kristal' kaynağı, dongu/duzey (döngülü konumlu dosya), telsizKur/telsizAyar(yakinlik, kayma)/telsizSil
    (kulaklıkta parazit + kesik sinyal tonu; kayma tonun perdesini kaydırır). Headless Chrome'da hatasız.
  - Hareketler src/arayuz/jestler.js: onDondur(radyan) iki parmakla çevirme eklendi.
  - Testler testler/yuzey.test.js (görevi baştan sona oynar).
- SÜRÜM 0.2 (20 Kasım, Murat: "Devam"): ikinci görev "Jeotermal Sondaj ve İzotop Hasadı". Telefonda denenmedi.
  - Görev girişi src/oyun/yuzey/gorevler.js (ekran ve testler buradan alır; G1 + G2 birleşik SAHNELER, eylem ve
    konuşma yönlendirmesi; d.gorev.id 'sinyal' değilse önce G2.konusma). gorev2.js saf.
  - harita.js: MEKANLAR.sirtlar (x 500-580, y -60..0; zehirli, radarMenzili 22, ortam_sirtlar), KAPILAR.guney_gecit
    (vadi (0,-41.5) ↔ sirtlar (540,-1.5); kosul bayrak.maske, kilitMetni, gecisMetni [uc]); NOKTALAR baca_1/2/3 (baca,
    engel), bazalt_4/5 (stok 4), agir_1/2 (titanyum, stok 3). guney_yol noktası kalktı (artık geçit).
  - dunya.js: gec kosul/kilitli; zehirIlerle(d, dt, ek, olaylar) (sırtlarda 0,35/sn, bacaya 7 m'den yakın 0,8/sn,
    dışarıda -3/sn; uyarılar 50/75/90; 100 → kapsüle taşınır, sahne bayilma); kendiliğinden yürüme kapı yoksa vadi
    üzerinden; esyaMetni (aynı eşyalar sayıyla); otoKilitli.
  - Akış: kule sonrası gorev jeotermal → mühendis "Sondaları ver" (3 sonda, sondaAlindi) → hekim "Maskeyi al" (maske)
    → sırtlar → baca: sonda yerleştir (bayrak sonda_<id>) → valf dengeleme: basınç 0,15'ten 0,07/sn × (1 + 0,3 × başarı),
    ALARM_ESIGI 0,78'de alarm, çift dokun = tahliye (erken: boşa, sıfırlanır; 1'e varınca patlama, zehir +20);
    3 başarı (valf_<id>) → baca_<id>, izotop +2. Üç baca → sondaj, sahne sondaj_tamam, gorev dokumhane →
    dökümhane (10 bazalt, 5 titanyum; kosul sondaj) → dokumhaneKuruldu: koloni seviye 2, sanayi 2, sahne dokumhane,
    bitenGorevler jeotermal, gorev kazi (yok; batı geçidi, Kadim Krater).
  - Telsiz bildirimleri (gorev2 bildirimIlerle, d.bildirimler kuyruk, d.duyulanBildirimler, d.telsizKayitlari):
    sirtlar_ilk (telsizci), zehir_yarim (hekim), ilk_baca (mühendis). Üç tonlu zil (telsiz_zil.wav); çift dokun dinle
    (başka her şeyden önce), iki parmakla aşağı kaydır ertele; menüde "Telsiz kayıtları".
  - Ses motoru: basincKur/basincAyar(basinc, alarm)/basincSil (kulaklıkta tıslama + kesik alarm tonu). Bacalar
    'baca' döngüsüyle konumlu (yalnız sırtlarda; dengede olanlar 0,35).
- SÜRÜM 0.3 (20 Kasım, Murat: "Devam"): üçüncü görev "Antik Kseno-Laboratuvar Kazısı". Telefonda denenmedi.
  - gorev3.js saf: NOTALAR (5 çan, 196/220/262/294/330 Hz, pesten tize), kapiDizisi(d, 'dis'|'ic') tohumdan (3 / 4 nota,
    art arda aynı nota yok), rezonansBaslat/rezonansSecimDegis/rezonansCal (yanlış → sıra sıfır; son nota → kapi_dis /
    kapi_ic), REZONATOR_MALIYET 2 kristal + 1 titanyum (mühendisten "Rezonatörü yap"), kaideler (veri_kristali ×3),
    yazıt, harita_kaidesi (yildiz_haritasi) → bitisDenetle: kazi, kseno +3, kodeks kadim_harita, gorev biyo, sahne
    kazi_tamam → biyo_kubbe (3 kseno, 3 kristal, 2 titanyum) → biyoKubbeKuruldu: moral +10, nufus.bilim 1, poi
    moloz_kusagi, bitenGorevler kazi, gorev zemin (Faz 3 tersane zemini; bu sürümde yok).
  - harita.js: MEKANLAR krater (x 700-780, y 0-70, ortamOran 0,18), kseno_lab (x 900-924, y 0-24, ortam_harabe),
    mabet (x 950-966, y 0-16); KAPILAR bati_gecit (vadi (-52.5,20) ↔ krater (740,1.5), kosul dokumhane),
    kseno_kapi ve ic_kapi (rezonans 'dis'/'ic'); NOKTALAR can_1..5, kristal_3/4, titanyum_3 (krater, stok 4; 1. ve
    2. görev 10 titanyumun 8'ini harcıyor), kaide_1..3, yazit, harita_kaidesi; ALANLAR (salonda 4 görünmez çekim alanı).
  - dunya.js: ALANLAR çarpması (özel söz, ağır titreşim), kendiliğinden yürüme kapı grafiğinde BFS, engelde engelden
    uzak yana kayar (sıkışınca yön değiştirir), yerlerListesi'nde bati_gecit/kseno_kapi/ic_kapi.
  - gorevler.js: bildirimIlerle artık burada (G2 + G3 BILDIRIMLER; gorev alanı o görevle sınırlar): krater_ilk, lab_ilk.
  - Ses motoru: nota(frek, nokta|null, düzey, süre) çan tınısı, inleme (yanlış nota), kaynak 'can' (frek; seyrek kısık
    çınlama) ve 'yercekimi' (45/90 Hz nabız). Headless Chrome'da hatasız.
  - Yuzey.js: rezonans katmanı (rezJest), çan/alan kaynakları, dinleyici yalnız kapsülde dışarıda (salon ve mabette
    oyuncunun kendisi; boğukluk yalnız kapsülde), menüde Kodeks, uzay haritasında Moloz Kuşağı.
- SÜRÜM 0.4 (20 Kasım, Murat: "Devam"): dördüncü görev "Tersane Zemin Güçlendirmesi". Telefonda denenmedi.
  - gorev4.js saf: mühendis "Platoya hazırlan" → pompa + kablo (zeminHazir); ayak_1..4'te "Zemine polimer dök"
    (1 polimer → sertlesti_<ayak>; sertleşmeden dengeleme reddedilir) ve "Ayağı dengele" → terazi: sapma tohumdan
    ±0,45-0,85, yavaş kayma 0,03/sn, teraziPompa (ekranda 0,004/px, yukarı kaldırır), |sapma| < 0,05'te 2 sn →
    kilitli_<ayak>. Ses: kulakta 330 Hz referans + ayak tonu 330 × 2^(sapma/4) (vuru yavaşlar) + hidrolik uğultusu.
    Dört ayak → dagitim_kutusu "Kabloyu bağla" → zemin, gorev tersane, sahne zemin_tamam → tersane (12 bazalt,
    6 titanyum, 2 polimer; kosul zemin) → tersaneKuruldu: seviye 3, nufus.tersane 2, bitenGorevler zemin, gorev
    kivilcim (Faz 3 gemi montajı; bu sürümde yok). Bildirimler plato_ilk, ilk_ayak.
  - harita.js: MEKANLAR.plato (x 1100-1180, y 0-70, firtinali, radarMenzili 45, ortam_plato); KAPILAR.kuzey_gecit
    (vadi (4,58.5) ↔ plato (1140,1.5), kosul biyo_kubbe; eski kuzey_yol noktası kalktı); NOKTALAR ayak_1..4,
    dagitim_kutusu, bazalt_6/7 (stok 6), titanyum_4 (stok 4), sırtlarda catlak_1/2 (polimer, stok 4).
  - dunya.js firtinaIlerle(d, dt, hareketli, olaylar): platoda 8 sn sonra, sonra 13-22 sn arayla (tohumdan) hamle:
    hamleGeliyor (2,5 sn, yönü tohumdan, 20 m öteden ıslık) → hamle (1,5 sn): yürüyorsa 4 m savrulur, duruyorsa
    çömelir; terazi açıksa sapma ±0,3. ilerle hem elle hem kendiliğinden yürümede çağırır.
  - durum.js kaydiTamamla: eski kayıtlara sonradan eklenen yatakların stokunu ekler (kayit.js okurken; 0.3'teki
    titanyum_3 eksikliği de böylece düzeldi).
  - Yuzey.js: terazi katmanı (teraziJest), hamle sesleri (konumsal 'hamle'), nokta eylemi sahne açarsa hemen gösterir.
  - Sesler: ortam_plato ← "Wind Int Howl Güçlü Ton Vokal Rüzgarı.wav", konumsal/hamle ← "Hızlı Geçiş Rüzgarı 049.wav",
    hidrolik ← "Whoosh Hidrolik Bomba.wav", kilit ← "Çelik Kilit Kolu Kapanma Bırakma Gıcırtı Çınlama.wav",
    polimer ← "Bilim Kurgu Metal Kaynayan Metal Sızıntısı.wav" (ilk 4 sn). Hepsi Bahtiyar'ın Drive'ı, Efektler.
  0.5 ile: ortam_uzay ← "Uzay Aracı Pedi.wav", ortam_kokpit ← "Uzay İstasyonu Döngüsü.wav", ortam_kargo ← ortam_kapsul
  + yankı (ffmpeg aecho), kapi_gemi ← "Elektrikli Yıldız Gemisi Kapısı 02.wav", kalkis ← "UZAY GEMİSİ Büyük Uzun
  Gümbürtüyle Uçuyor.wav", kaynak ← "METLFric Çelik Kaynak Ve Taşlama Makinesi Endüstriyel JF SoS.wav" (4 sn),
  zincir ← "Metal Zincir Çarpması 10.wav", arayuz ← "Uzay Gemisi Arayüzü.wav", moral_yuksek ← "WALLA Kalabalık Gülüyor
  Ve Bağırıyor Interior Medium.wav" (×3), moral_dusuk ← "SmlAlarm Tek DDM Döngüsü.wav" + aynı kalabalık (pes, süzülmüş)
  + "Büyük Cam Kırılması ve Parçalanması Çok Sayıda Parça.wav".
- SÜRÜM 0.5 (20 Kasım, Murat: "Devam. Belgedeki hiçbir şeyi atlama"): Faz 3 çekirdeği + Faz 2 ekonomisi. Telefonda denenmedi.
  - src/oyun/koloni.js koloniIlerle(d, dt): yataklar 120/(1+0,15×sanayi) sn'de bir birim yenilenir; sondaj sonrası
    boru hattı 150 sn'de 1 izotop (tavan 20); üretim kuyruğu (tesis başına bir iş, süre/(1+0,25×sanayi)×moral);
    tersane kaynak işi (×(1+0,5×tersane)); nüfus 300 sn'de +1 (barınma yetiyorsa; biyo-kubbe ×1,5, moral<50 ×0,3),
    barınma aşılırsa moral düşer. İş gücü isGucuDegis (sanayi/tersane/bilim, boşta). Moral ≥75 üretim ×1,2, <30 ×0,8;
    moralSesi (moral_yuksek ≥60, moral_dusuk <35) inişte çalar. gorevler.js zamanIlerle = koloniIlerle + görev kancası.
  - veri/uretim.js: PARCALAR (plaka, kablo, itki_yakiti, iyon_reaktoru, mod_burun, mod_govde, mod_bolme_a) ve TARIFLER
    (dökümhane: 50 plaka ← 2 ti + 1 bazalt; 20 kablo ← 1 kristal + 1 ti; zırh; reaktör lab: 10 L yakıt ← 1 izotop,
    iyon reaktörü ← 2 izotop + 1 kristal + 1 ti; sinyal kulesi: kripto anten; biyo-kubbe: biyo-karantina).
    tesisler.js: reaktor_lab (4 izotop, 3 ti, 2 kristal; kosul tersane), yasam_blogu (+10 barınma).
  - gemi/gemi.js: KIVILCIM_MONTAJ (govde 150 plaka, kokpit 40 kablo, reaktor 1 iyon reaktörü: vinçle; itki 25 L: dolum),
    vinç (x tohumdan ±0,5-0,9, rüzgâr kayması, hamle ±0,35; |x|<0,08'de indirilir, 3 basamak, çift dokun kenetle,
    vincIptal parçaları geri verir), montajIlerle; gemiOlustur (Starship alanları), ODALAR (Kıvılcım: kokpit, kargo;
    ortam_kokpit, ortam_kargo), SINIF_KATMANLARI, modulTak, yakitDoldur, gemiyeBin/gemidenIn/odaDegis/atamaYap,
    telsizSubayiCarpani (kokpitte ses_hassas 1,6, başkası 1,25).
  - uzay/seyir.js: UZAY_NOKTALARI aethelis (0,0; 196 Hz), sektor15 (640,860; 523 Hz; graviton reaktörü, kripto anten,
    hisar topları; kademe 3), moloz_kusagi (-820,470; 784 Hz; çekici kiriş, biyo-karantina; kademe 3). Hız 0-5 kademe ×8
    birim/sn, yakıt 0,04 L/sn/kademe, kenet 40 birim ve hız ≤1, pruva kilidi ±6°, sınır 1600, fener menzili 1300 ×
    telsiz subayı. Ses düzlemi 20 birim = 1 m. onTarama raporu; eksikse kilit. Yakıt biterse sahne kurtarma.
  - gorev5.js: gorev kivilcim → (gemi hazır) ilk_ucus → (bir noktayı tarayıp Aethelis'e kenetlenince) filo.
    Sahneler kivilcim_hazir, kalkis, inis (moral metni), kurtarma. Platoda 'kizak' noktası (montaj, modül, yakıt, bin).
  - Ses motoru: vincKur/vincAyar(x, yukseklik, ortada)/vincSil (StereoPanner + zincir şıkırtısı + ortadayken tık),
    motorKur/motorAyar(hiz)/motorSil (türbin + ıslık), kaynak 'fener' (frek; geniş menzilli panner). Headless Chrome'da hatasız.
  - Yuzey.js: Üretim ve Koloni yönetimi menüleri (terminal), montaj/modül menüleri (kızak), vinç katmanı, gemi katmanı
    (odalar, oda terminali, harita ve ön tarama, mürettebat atama, kalkış, uzayda itki/burun/radar/kenetlenme),
    koloni olayları telsiz çağrısı olarak ("Koloni bilgisayarı"). durum.js kaydiTamamla parcalar/uretimler ekler.
- SÜRÜM 0.6 (21 Kasım, Murat: "5 saat mühlet, belgede bir yer atlamadan sırayla yap"): Faz 3 kalanı. Telefonda denenmedi.
  - veri/gemiler.js artık bütün sınıfların verisi: odalar (belgedeki bütün bölmeler; ortam_kokpit/reaktor/revir/kargo),
    montaj aşamaları (belgedeki malzeme miktarları), motor profili, kızak kademesi, gövde/kalkan, yakıt türü ve tankı;
    SINIF_KATMANLARI; ARACLAR (5 araç: hiz/zehir/radar çarpanları, matkap, lojistik, otonom, ucar).
  - uretim.js: Kademe 2-3 malzemeleri ve tarifleri, Kademe 4-5 malzemeleri (uzaydan: true), araç parçaları,
    arac_hangari tarifleri (şasi çeliği + 5 araç; cikti arac_<id> → d.araclar). Hammadde graviton (derin kuyu).
  - tesisler.js: arac_hangari, tersane_2 (Manyetik Beşik), tersane_3 (Hisar). harita: hangar (vadi -8,6),
    graviton_kuyusu (sırtlar, gerekArac mammoth), kseno_damari (salon, yenilenir).
  - gemi.js: montajAsamalari/kizakKademesi/filo/yeniGemiSiniflari/kizagaKoy/aktifGemiSec; ilk gemi aktif, sonrakiler
    d.filo'ya; GUC_DAGITIMLARI (dengeli/itki/sensor/kalkan → seyirde hız ve fener çarpanı).
  - hangar.js: araca bin/in; dunya.js aracCarpani (hız, zehir, radar), araçla iç mekâna girilmez. koloni.js Demir
    Kervan (180 sn) ve Akrep (120 sn). Ses motoru motorKur(profil): turbin, piston, manyetik, bas, kutle, hover,
    palet, kervan, vtol. ortam_reaktor ve ortam_revir ffmpeg ile üretildi (kahverengi gürültü + 55 Hz + tremolo;
    süzülmüş pembe gürültü + 1 kHz monitör bipi).
  - gorev5.js: kızakta yeni gemi / filo seçimi, sahne yeni_gemi.
- SÜRÜM 0.7 (21 Kasım): entegrasyon matrisi. Telefonda denenmedi.
  - veri/donanim.js: DONANIMLAR (katman: true olan 6 katman + 14 ek donanım; tesis, girdi, süre, minSinif; kadim_anahtar
    kendi: true, deşifreden gelir) ve MATRIS (9 satır). uretim.js bunlardan mod_<id> parçaları ve tarifleri üretir;
    gemi.js modulListesi ek donanımı minSinif'e göre takar (moduller anahtarı donanım kimliği).
  - tesisler.js: kuantum_lab, itki_hangari, kriyo_atolye, askeri_tersane, komuta_merkezi, yuksek_reaktor
    (kosul bayrak kalibrasyon/sikistirma/izolasyon/kaplama/ag/sifre).
  - seyir.js: 7 yeni nokta (k12, zaman_havzasi, xerad, yanan_gemi, aethel9, tarras, kizil_yutucu; belgedeki üç
    donanım, kademe 3-5, acan tesis); poiGuncelle (zamanIlerle'de; 'poi' olayı koloni çağrısı olarak).
  - gorev6.js: ekEylemler (kalibrasyon_sutunu p_kalibre, bacalarda p_sikistir/p_izole, kizak p_kapla, tepe p_ag,
    yazit p_sifre), 6 tamam sahnesi, projeMetni (görev ipucunda). G3 kapiDizisi uzunluk dis 3 / ic 4 / kalibre 5 /
    sifre 6; G2 valfBaslat(d, id, amac); G1 ayarBaslat(d, amac 'ag' → hedef 10-40, bayrak ag, sahne ag_tamam);
    gemi.js KAPLAMA + kaplamaBaslat (vinçle 100 zırhlı plaka). harita: kalibrasyon_sutunu (krater 740,24).
- SÜRÜM 0.8 (21 Kasım): Faz 2 bölgeleri. Telefonda denenmedi.
  - harita.js: MEKANLAR dogu (1300-1380, statik), civa (1500-1560, zehirli, maruziyet adı), lav (500-580 × -130..-65,
    zehirli, magma), mantar (1700-1760, yarasa), kriyo (1900-1960, soguk), obsidyen (2100-2200, zemin cam,
    radarMenzili 110), kuleler (2300-2380). KAPILAR dogu_gecit (vadi 54,10; dokumhane), civa_gecit (maske), lav_gecit
    (sırtlar 540,-59; sondaj), mantar_gecit (lav 512,-127), kriyo_gecit (plato 1176,68; zemin), obsidyen_gecit
    (vadi -50,-43.5; dokumhane), kule_inisi (plato 1104,66; d.arac atmosphere_x). Yataklar kuvars_1..3 (sutun),
    sivi_metal_1, civa_tortusu_1, agir_metal_1/2, foton_1, spor_1, kriyolit_1, metan_1, menfez_1, plazma_cami_1,
    obsidyen_1, antigrav_1/2. 9 yeni hammadde (tesisler.js).
  - dunya.js: maruziyetAdi; zehirIlerle soğuk (0,6/sn, menfeze 7 m'den yakın 1,3; termal giysi ×0,25), bayilmaNedeni;
    statikIlerle (2 sn yükleme, 6 m içinde çarpılma: 3 m savrulma, +10), magmaIlerle (3 sn içinde 4 m uzaklaş yoksa
    +20), yarasaIlerle; d.gorulenMekanlar (gec). Yerler'de bölge geçitleri.
  - Donanım: sivi_iletken, optik_prizma, obsidyen_zirh, grav_kalkani (seyir: yakıt ×0,85, fener ×1,3, kalkış yakıtı
    2 L → 1 L). Tarifler: metan yakıtı, hiper_bobin (kriyolit; artık uzaydan değil), yatistirici, foton (moral +8),
    kriyo_atolye helyum ve termal giysi (esya_ çıktısı). Tesisler jeotermal_santral (üretim ×1,2), koloni_kalkani
    (koloni.kalkan 2). koloni.js ilacDagit (10 doz → moral +5). bolgeler.js telsiz bildirimleri.
  - Sesler (Drive Efektler): ortam_dogu ← "Ton Ses Tasarımı Elektrik Kıvılcımı ..." + "Fısıltı C.wav"; ortam_civa ←
    "Su Kabarması.wav" (×0,6) + 60 Hz; ortam_lav ← "Bilim Kurgu Metal Kaynayan Metal Sızıntısı.wav" (×0,55) + kahverengi
    gürültü; ortam_mantar ← "WATRDrip Metal Tencere Kapağına Su Damlıyor ..." + nefes; ortam_kriyo ← "ICEMisc Buz
    Cızırtısı MWSFX SEC.wav"; ortam_obsidyen ← ortam_yuzey + uzun yankı; ortam_kuleler sentez (taş gıcırtısı + flüt
    armonileri); ortam_vaha ← "Kırsal Gece Çiftlik Evi Kuşlar ve Böcekler Ortamı 44.mp3" (0.9 vaha için); statik ←
    "Enerji Elektrik Sigortası 08.wav"; buz_catlak ← "Gölde Çatlayan İnce Buz Tabakası 16.wav"; magma ← "Orta Patlama
    Uzun Kuyruklu Yankı 01.wav" (×0,7); konumsal/adim_cam_1..4 ← "Küçük Cam Çatlaması Orta Şiddette Darbe.wav".
  - Düzeltme: yürürken maruziyet uyarıları (50/75/90) artık söyleniyor (önceden yalnız valfte).
- SÜRÜM 0.9 (21 Kasım): gezegen-gelisimi bölüm 4, 5, 6, 7, 9. Telefonda denenmedi.
  - kesifler.js: tepe k_mors → ayarBaslat 'mors' (hedef 95-115) → morsBulundu → harita sarp_kanyon (dogu 1340,69 ↔
    vanguard 2500-2560); vanguard_enkaz k_gunluk (kodeks, bütün NOKTALAR kesif), k_firin (demir_kervan → bayrak.firin,
    koloni üretim ×1,25); monolit (dogu 1362,62; dunya.js cevreMetni/radar monolitSuz: <30 m saat yönleri karışır,
    <6 m sessiz; Yuzey ortam 0,35/0,02) k_kazi → manyetik_tohum → graviton_dengeleyici; tunel_agzi (mantar 1758,30;
    tunelAcik ya da mammoth) → tuneller (ortam_tunel) kabuk_1/2 → arac_hangari kabuk_zirh/delici_uc (bayrak_); vaha_yolu
    (sırtlar 503,-3) gecince d.vahaGirisi → zamanIlerle K.vahaBulundu (moral 100, sahne) → tohum_1 → tesis sera
    (nüfus ×1,5). Konumlu: mors bip 700 ms (doğuda kanyon ağzında, vanguardda enkazda), vaha döngüsü (sırtlarda aralıkta).
  - arindirma.js: ARINDIRMA 6 bölge, karakol_<mekan> noktaları, koloni.bolgeDurumu[mekan] 0-4 (a_kesif/a_izole/a_stabil/
    a_karakol); parçalar dondurucu_kopuk, topraklama_cubugu, sismik_dengeleyici (dökümhane), notralizasyon_kulesi
    (reaktör lab), sonik_kovucu (sinyal kulesi), ikmal_karakolu (araç hangarı). dunya.js tehlikeMekani: güvenli bölgede
    zehirli/soguk/statik/magma/yarasa/firtinali kalkar; koloni.js KARAKOL_SN 180.
  - terraform.js: KATMANLAR (yerel girdi hammaddeden, uzay girdisi bayrak vaka2_biyokapsul/vaka7_aritici/vaka5_besin/
    vaka1_reaktor — Faz 4 görevleri koyacak), etkiler koloni.js'te bir kez (atmosfer: zehirli kalkar); IRK_YAPILARI
    (akademi, kseno_habitat, multeci_kampusu, tina_cekirdegi; tesisler.js'e eklenir, bayraklar Faz 4); seviye4Eksikleri →
    koloni.seviye 4. Yuzey: koloni yönetiminde "Terraforming katmanları" ve "Bölge arındırma durumu".
  - Sesler: konumsal/vaha ← ortam_vaha (tek kanal 24 kHz), ortam_tunel 0.9 ile eklendi.
- SÜRÜM 1.0 (21 Kasım): gezegen-gelisimi bölüm 8, yerel mini görevler. Telefonda denenmedi.
  - mini.js: MINI (8 görev, MINI_SIRASI belge sırası), d.mini {aktif, bekle, bitenGorevler, bitenler, secim, toplanan,
    spor, olgunluk, kalan, dikkat}; miniIlerle (MINI_BEKLEME 150 sn; mantar sporu 1,4/sn, olgunluk /40 sn, >1,15 patlar;
    solucan 150 sn; yağmacı dikkat: vanguardda >1,3 m/sn hızla korsana 14 m içinde 45×(1-u/14)/sn, yoksa -6/sn);
    miniBaslat (bildirim mini_<id>), bitir → d.miniSon + sahne mini_tamam; ceviri_krizi sahnesi (yap: ceviriSec).
    Noktalar harita.js'te mini: id (secenek, radarsiz); dunya.js yakindakiler miniGorunur ile süzer, radar radarsiz'i
    atlar. Kancalar: G1 ayar amac 'mini_bent' → miniKilitlendi; G2 valf amac 'mini_kompresor' (sayaç kompresor_<id>,
    patlamada zehir yok) → miniValfBitti. gorevler.js: ekEylemler (terminal m_teslim, m_ceviri), gorevIpucu başında
    yerel operasyon, zamanIlerle olaylar (acil: hemen söylenir; tasindi; miniBasladi: zil).
  - Yuzey: mini konumlu sesler (olgun kristal 'kristal', kaçak 'baca' döngüsü, korna 'fener' 311 Hz, korsan 'parazit'
    2,6 sn, kompresör/kazık/bent 'bip' 3 sn, sürü 'yercekimi' (540,-62)); kompresör valf sözleri.
- SÜRÜM 1.1 (21 Kasım): Faz 4 görev motoru, 9 büyük görev + G-01 … G-24. Telefonda denenmedi.
  - veri/uzayGorevleri.js: G_DONANIMLARI (48 ek donanım; donanim.js'e eklenir → mod_<id> tarifleri), G_NOKTALARI (24 nokta
    + kadim_mezar; acKosul: gemi + sinyal kulesi + tamamlanan operasyon sayısı eşiği 0..11; seyir.js poiGuncelle acKosul
    destekler), OPERASYONLAR (34; adimlar [{tur, ad, giris, bitis, ...}], sonuc, odul {gemi, bayrak, kaynak, parca, nufus,
    barinma, bilim, tersane, moral, itibar, kodeks}).
  - uzay/operasyon.js: opBaslat/opGirdi/opIlerle/opSes/opDurum; adım türleri yaklas (aci, mesafe; sağa kaydır aci +0,26;
    kilit 0,14 rad; hız 0-3 × 4 m/sn; sessiz: dokun -4 m, yukarı kaydır hasar), kenetle, sonar, frekans (±1,2 / 2,5 sn),
    basinc (girdi cift|cift2), tut/dron (3 sn), ritim, kacin (tehdit 1,8 sn; ters yana; yon asagi), nisan (hedef
    sin(t·0,35)·0,8 − burun), kademeli (parmak ≥ 2), denge (sapma ±0,05/sn kayma; 0,08 içinde 2,5 sn), direnc (konum
    −(0,08+0,05 sin)/sn; aşağı sürükle +0,003/px), ton (kalın/orta/tiz), bosluk (0,7 sn vuruş, eksik vuruşa dokun).
    hasar → gövde; 0 → op_basarisiz, gemi kızakta. bitir → d.tamamlananOp, odulVer (hediye gemiler bütün katmanlarıyla
    d.filo'ya), sahne op_tamam. gorevler.js kenetlen: donanım tamsa r.op = opBaslat. seyir.js: eve kenetlenince gövde
    onarılır; onTarama tamamlananı söyler; fener ×1,2 (g_haritalar).
  - Etkiler: uretim tarifleri bayrak alanı (sema_kompozit/super/kadim/kuantum), notron_cevher hammaddesi, tesis hastane
    (g_hekimler); koloni.js g_ticaret (TICARET_SN 180; g_tarafsiz ×2), üretim × g_fuzyon 1,15 × g_oron 1,2, nüfus ×
    g_tarim 1,2 × hastane 1,2; dunya.js g_panzehir maruziyet ×0,7. gemi.js modulListesi ek donanımı yalnız üretildiyse
    ya da takılıysa listeler.
  - Yuzey: operasyon katmanı (opJest; dinleyici (0,0); hedef 'fener' kaynağı op_hedef_<adim>, telsiz/basinc/terazi
    motorları, tehlike konumsal 'hamle', ton dizisi nota). jestler.js onKistirAc (iki parmak arası > 90 px açılınca).
- SÜRÜM 1.2 (21 Kasım): Faz 4 kalanı (gezegenler, fenomenler, kütüphane). Telefonda denenmedi.
  - veri/gozlem.js: GOZLEM_DONANIMLARI (kamera, spektrometre, gravimetre, lidar, arsivleyici, oto_kenet, akustik_filtre,
    toplama_dronu), INIS_ARACLARI (20, araç hangarı), FENOMENLER f01-f16 (salon, imza, gerec, kayit, tepki, itibar, frek,
    etki, ozel adım), GEZEGENLER p01-p20 (poi1/2, numune, kazanım, itibar, arac, frek, x/y, etki, denge), SALONLAR,
    ITIBAR_KADEMELERI (0/1000/5000/12000). uzayGorevleri.js sonunda fenomen ve gezegen OPERASYONLAR'ı ile gezegen
    G_NOKTALARI üretilir (acKosul: gemi + kule + gözlem gereci ya da filo + tamamlanan ≥ ⌊(n−1)·0,6⌋).
  - uzay/fenomen.js: fenomenIlerle (SEKTOR_SN 30, ihtimal 0,35, pruvanın 150 birim önüne; 450'den uzaklaşınca kaybolur),
    fenomenYakinMi (60), fenomenEksik, salonListesi, itibarKademesi/itibarIlerle (kademe 2 bilim +1, 3 ticaret, 4 moral).
    gorevler.js kenetlen önce fenomene bakar; uzayAdim fenomenIlerle; zamanIlerle itibarIlerle. operasyon.js: kademeli
    parmak alanı, akustik filtre payı ×1,6, toplama dronu, odul.kalkan. seyir.js: oto_kenet (mesafe ×2, hız ≤ 3), yakıt ×
    f_yakit/f_saat/p_yakit/p_tasarruf 0,9, p_takyon kalkış yakıtı 0. koloni.js: f_fuzyon/f_fotosentez üretim ×1,1, p_tarim nüfus ×1,3.
  - Yuzey: fenomen konumlu feneri (fener_fenomen_<id>), keşif zili; menüde "Evren Kütüphanesi" (salonlar, panoda ses imzası:
    kaydın frek'inden altı notalı arpej).
- SÜRÜM 1.3 (21 Kasım): Faz 5 savaş, yetenekler, mürettebat, sefer olayları. Telefonda denenmedi.
  - uzay/savas.js: DUSMANLAR (korsan_korvet, korsan_avci, yabanci_firkateyn), SILAHLAR (plazma/torpido/iyon: uyarı sn, hasar),
    d.savas {tur, dusman {govde, kalkan, kalkanFrek, aci}, silahFrek, delik, uyari {silah, kalan, yon, savunma}, sistem
    {itici, kalkan, reaktor}, isi, raunt, torpidoBekle}; savasGirdi/savasIlerle/savasSes/durumMetni; gorevli(d, gorevYeri);
    bitir → d.savasSon + sahne savas_son (zafer: ganimet; yenilgi: kızak, moral −5). tonFrek(x) = 200 + 8x Hz.
  - veri/yetenek.js: YETENEKLER A1-D3 (bedel sıra×100; d.kaptan.yetenekler, harcanan), GEMI_MODLARI k1-k5 (donanim.js'e).
  - uzay/sefer.js: seferIlerle (HABER_SN 90 / 0,3; KORSAN_SN 45 / 0,12, iki operasyondan sonra; klostrofobi 240 sn;
    olaySavas), sahneler sefer_olay/sefer_sonuc; uzay.hizSiniri. gorevler.js uzayAdim: savaşta durur, seferIlerle.
  - koloni.js: subayIstihdam (boşta 1 kolonist → uyeUret), FIRTINA_SN 600 (kalkan < 2 ve nüfus ≥ 8: moral −5), BESIN_SN 240
    (nüfus > 20 ve sera yok: −2). gorev1 topla: klipsomanyak (nitelik toplayici) her 4. toplamada +1.
  - Yuzey: savaş katmanı (savasJest, dokunmaBekle false; düşman 'fener' kaynağı savas_dusman; uyarı sesleri nota/hidrolik/
    hamle; kilit tonu 1760 Hz), kokpit ve koloni yönetiminde Kaptan yetenekleri, koloni yönetiminde Subay istihdam et.
- SÜRÜM 1.4 (21 Kasım): belge boşlukları. Telefonda denenmedi.
  - dunya.js fenerBirak (yalnız Çöl Tilkisi'nde; d.fenerler en çok 8; yakindakiler'de tur 'isaret', etkileşime girmez;
    yerlerListesi'nde). harita.js fauna noktaları suluk_1/2 (dogu), iplik_1/2 (kuleler), surungen_1 (tuneller); Yuzey
    FAUNA sesleri (parazit 3,3 sn / 'kristal' / 'ayak'), fener sesleri bip 2,5 sn. yerlerListesi mini noktaları süzer.
  - savas.js: üreteç yerine kayda girebilen tohum + sayaç (zar); stres (darbe +8, soğukkanlı hariç), verimlilik
    (1 − stres/200, en az 0,5) nişancı etkisini çarpar; eve kenetlenince stres, seferSure, klostrofobi sıfırlanır.
- SÜRÜM 1.5 (21 Kasım): ElevenLabs efektleri. Telefonda denenmedi.
  - ElevenLabs bağlayıcısı (creative_generate_in_flow, sfx, eleven_text_to_sound_v3, ~17 kredi/efekt), flow
    BPWC2OLWbdljIKExgHDq. araclar/indirilecek-sesler.json → ham-sesler dalı → ffmpeg (sessizlik kırp, I=-18) →
    assets/ses/el_plazma_sarj, el_torpido, el_iyon, el_kalkan, el_kesif_zili, el_deklansor. Yuzey: savaş uyarısı ve kalkan,
    fenomen zili; fenomen deklanşör adımı (adım alanı ses).
- SÜRÜM 1.6 (21 Kasım): sağlamlık. Telefonda denenmedi.
  - testler/bulanik.test.js: 12 tohumla 8000 rastgele adım (yürüme, eylem, kapı, inşa, sahne seçimi, uzay, operasyon,
    savaş; her 200 adımda JSON kaydı/kaydiTamamla) — hata atmamalı. Bulduğu hatalar düzeltildi: mini.js görünmeyen
    nokta ve aktif olmayan görev eylemleri; vana görevinde dört bağlantının yalnız kaçıranı görünüyordu (artık dördü).
  - Tanımsız ad denetimi: tsc --checkJs (/tmp/tsconfig.json; allowJs, noEmit) çıktısında TS2304/TS2552 olmamalı.
- SÜRÜM 1.7 (21 Kasım, Murat: "Seslendir, her ses temiz ve ortamına uygun seslendirilsin"): telsiz seslendirmesi.
  Telefonda denenmedi.
  - veri/seslendirme.js: KAYITLAR (33; id → rol, ortam telsiz|gemi|savas, metin — kayıtta ad yok), SESLER (0 Emir
    DAnQthL4CQoTrAexmU0i, 1 Agit Taşdemir qLctY6uJSzrtjp23kPzO, 2 Öykü Arel BxCViLAxox0EqpBjvqwR; eleven_v4, savaş
    satırları [shouting]), ERKEK_ADLAR/KADIN_ADLAR, cinsiyeti, kayitBul(d, id, uye): yalnız öncü ve ses cinsiyeti uyarsa.
    murettebat.js uyeUret(r, uzmanlik, kullanilan, cinsiyet): ad cinsiyete göre; öncüler e/e/k.
  - ElevenLabs flow ui4cHVdu6EZCZ5QIbudH; oturumlar araclar/seslendirme-oturumlari.txt (~4600 kredi). ham-sesler dalı →
    ffmpeg (/tmp betiği; özet): telsiz 300-3400 Hz + acompressor + asoftclip + pembe parazit (0,012) + baş/son cızırtı;
    savas 350-3800 Hz, ratio 5; gemi 180-6500 Hz + 1,8 kHz +3 dB + aecho 23|41 ms; hepsi loudnorm I=-16 (savaş -15),
    22050 Hz tek kanal MP3 48k → assets/ses/telsiz/<id>.mp3. Süreler src/ses/telsizSureleri.js (ffprobe).
  - src/ses/telsiz.js: kayitCal(id, düzey, bitince) oynatıcıyı o an açar, bitince bırakır; rehberle bağı 1.9'da değişti.
  - Yuzey: telsizOku (bildirim dinleme ve telsiz kayıtları: "Telsizci Aras Kaya." sonra kayıt), sefer_olay sahnesi
    sefer.js olayKaydi ile (SesliListe sessizAc; başlık + konuşan, kayıt, sonra ilk seçenek), savaş uyarısında
    savas.js soz olayının kayit alanı (uyarı efektinden 350 ms sonra).
- SÜRÜM 1.8 (21 Kasım, Murat): Yerler listesi yalnız bulunulan mekânı gösterir (dunya.js yerlerListesi(d, hepsi);
  vadi dışında dönüş geçitlerinin bu taraftaki uçları eklenir; testler hepsi=true ile uzak yürür). SesliListe:
  tek parmak yukarı kaydır listenin başı, aşağı kaydır listenin sonu. Telefonda denenmedi.
- SÜRÜM 1.9 (21 Kasım, Murat: "telsizden gelen konuşmalar gerçekten telsizden geliyormuş gibi duyulsun ... ekran
  okuyucusu bir şey deyince telsiz kesilmesin"). Telefonda denenmedi.
  - Kayıtlar ham-sesler dalındaki ElevenLabs çıktılarından yeniden işlendi: araclar/telsiz-sesi-isle.sh (telsiz 450-2800 Hz
    iki kat süzgeç, 1,6 kHz +6 dB, ratio 8, atan doyum, 8 kHz'e inip çıkma, tremolo 5,3 Hz; arkada konumsal/parazit.wav
    0,12 (savaş 0,16, 550-2600 Hz); başta tuş + cızırtı, sonda 0,3 sn kşşş kuyruğu. Gemi: 280-4500 Hz, 2 kHz +4 dB,
    üç yansımalı kabin yankısı, kahverengi uğultu).
  - rehber.js: soyle artık telsizi kesmez; kayıt sürerken kritik olmayan sözler bekler (kesen sözlerden yalnız son
    bekleyen okunur, bekleyenNo), kritik uyarı hemen okunur ve kayıt kısılır (kisinceCagir → telsiz.js kayitKis ×0,3).
    Yalnız sustur() (oyuncu iki parmakla dokunur) kaydı da susturur; sustur(false) yalnız rehberi (rezonans dokunuşu).
    Savaşta kayıtla aynı anda gelen sözler 450 ms sonra kuyruğa girer.
- SÜRÜM 1.10 (21 Kasım, Murat: "Telsiz konuşurken menü seslerini de aç"): rehber.js 'menu' önceliği (SesliListe
  bütün okumaları): telsizi beklemez, kayıt kısılarak (×0,3, kisSayac sayacı) üstüne okunur. Telefonda denenmedi.
- SÜRÜM 1.11 (21 Kasım, Murat sohbete ses dosyası ekledi: "Bunu oyunun giriş melodisi yap"): assets/ses/giris_muzik.mp3
  (174 sn; baş sessizliği kırpıldı, 1,5 sn açılış, loudnorm I=-20, 112k stereo; efektler.js döngü düzeyi 0,6).
  App.js menülerde ortam_menu yerine giris_muzik çalar (döngü; oyuna girince Yüzey ortamı devralır). Telefonda denenmedi.
- SÜRÜM 1.12 (21 Kasım, Murat ses dosyası ekledi: "Bu da ilk haritamızın ambiyans sesi olacak"): assets/ses/ortam_vadi.mp3
  (10 dakikalık kaydın ilk 302 sn'si, 3 sn çapraz geçişli döngü, loudnorm I=-24, 96k stereo). harita.js vadi ve vadide
  geçen sahneler (telemetri, kule, dökümhane, biyo-kubbe) ortam_vadi; ortam_yuzey krater/vanguard için kaldı. Telefonda denenmedi.
- SÜRÜM 1.13 (21 Kasım, Murat: "ekran okuyucusu hızını 350'ye kadar yükseltebilelim"): Ayarlar.js EN_COK 3.5 (yüzde 350);
  adım yüzde 200'e kadar 0,1, üstünde 0,25. expo-speech rate olarak geçer; iPhone'un konuşma motoru belli bir hızın üstünü
  kırpabilir (telefonda denenmedi).
- SÜRÜM 1.14 (21 Kasım, Murat ses dosyası ekledi: merkez terminaline girilince çalacak ambiyans): assets/ses/ortam_terminal.mp3
  (ilk 302 sn, 3 sn çapraz geçişli döngü, I=-24, 96k). Yuzey noktaGoster('terminal') → ortamCal('ortam_terminal'), terminalAcik
  ref; terminalden açılan alt menülerde sürer; katmanKapat ya da ortamlı sahne mekân ortamına döndürür. Telefonda denenmedi.
- SÜRÜM 1.15 (21 Kasım, Murat ses dosyası ekledi: "jeotermal tarım alanı var ana gezegende, içeriye girince döngüsel çalsın";
  senaryoyu kendisi/Bahtiyar uyduracak). Önceden böyle bir yer yoktu; harita.js MEKANLAR.tarim (iç mekân x 3000-3020, y 0-20,
  ortam_tarim, şimdilik boş) ve KAPILAR.tarim_kapi (vadi (-35,-25) ↔ tarım (3010,1.5); kosul bayrak.sondaj). assets/ses/
  ortam_tarim.mp3 (baş 0,7 sn sessizlik atıldı, ilk 302 sn, 3 sn çapraz geçiş, I=-24, 96k). dunya.js yerlerListesi geçit
  listesine tarim_kapi. Telefonda denenmedi.
- SÜRÜM 1.16 (21 Kasım, Murat: "yukarıdaki müziği kadim yarık, notalarla etkileşime girdiğimiz haritaya, döngüsel"):
  gönderdiği dosya 1.15'teki tarım sesiyle bayt bayt aynı (md5 aeff8543…). Kadim Krater ortamı ortam_krater (efektler.js'te
  aynı ortam_tarim.mp3; ortamOran 0,18 → 0,5, çanlar duyulsun). Tarım alanı şimdilik aynı sesi çalıyor. Telefonda denenmedi.
- SÜRÜM 1.17 (21 Kasım, Murat, Bahtiyar'dan: kraterdeki gömülü yapıya girince müzik kesilmesin): kseno_lab ve mabet
  ortamı da ortam_krater (oran 0,5), kazi_tamam sahnesi de; ortamCal aynı adda döngüyü yeniden başlatmaz, yalnız düzeyi
  ayarlar → krater, salon ve mabet arasında müzik kesintisiz. ortam_harabe artık kullanılmıyor. Telefonda denenmedi.
- SÜRÜM 1.18 (21 Kasım, Murat: "butonlara efektler, eleven üzerinden; devam et, yeni oyun gibi şeylere 2 saniyelik bilim
  kurgu efektleri"). ElevenLabs sfx (flow BPWC2OLWbdljIKExgHDq, 4 × 17 kredi) → assets/ses/el_devam (2 sn güç açılışı + çan),
  el_yeni_oyun (2 sn fırlatma + hava kilidi), el_secim (0,75 sn holografik onay), el_geri (0,7 sn inen blip + panel).
  SesliListe etkinlestir: oge.efekt ya da id geri/hayir → el_geri, öteki → el_secim; iki parmak çift dokun geri → el_geri.
  App.js: Devam et el_devam, Yeni oyun (kayıt yoksa) ve "Evet, baştan başla" el_yeni_oyun. Telefonda denenmedi.
  Yayın iş akışı artık her yayında `eas channel:edit main --branch main` (APK kanalı) çalıştırıp durumu kayda yazar;
  sesleri-indir.yml ham-sesler dalındaki eski dosyaları korur.
- SÜRÜM 1.19 (21 Kasım, Murat): yüzeyde (yürüme katmanı) iki parmakla yukarı kaydırma boştaydı → Yerler'i doğrudan açar
  (yerlerGoster(true): geri ve "Oyuna dön" katmanı kapatır, menüye gitmez). Gemi, operasyon, savaş ve öteki katmanlar
  kendi hareketlerini korur. Telefonda denenmedi.
- SÜRÜM 2.0 (21 Kasım, Murat v3 belge paketini gönderdi, metin yok): yönergenin 1. adımı, tarım ve Yıldız Zamanı.
  Telefonda denenmedi.
  - zaman.js: NOBETLER (6; ad, yıldız, ışık, etki, akor), NOBET_SN 1200, zamanAkit (gorevler zamanIlerle; 'nobet' olayı →
    Yuzey çan akoru m().nota ×3 + söz), zamanMetni, ileriSar. d.zaman.sn. Yürürken sağ üst köşe çift dokun ve menü.
  - tarim/bitkiler.js: BITKILER 21 (A5, B5, C7 görev op'lu, H4 melez; ortam teras|kubbe|vaha, dongu, su, isi, frek,
    olgun, urun), HIBRITLER, ISLEME 33 tarif (tesis mutfak|revir|dokum; etki sefer|koloni|kalici|kaynak|itibar|besin),
    TOPLULUKLAR (beslenme matrisi), KADEMELER 1-4, VAHA_PARSEL 4, ISCI_TURLERI (insan, kaelith, malken).
  - tarim/tarim.js: d.tarim (kademe, yataklar, vaha, tohumlar, urun, erzak, besin, besli, kulucka, verilen, kese, kasa,
    toplandi); DONGU_SN 300; tarimIlerle (su −15/döngü, kademe 1 teras gece soğur, denge payı su ±15 / ısı teras ±5,
    kubbe ±30; dışında sağlık −0,25/döngü, 0 → ölür; Yeşil Öğle ×1,25, kademe 4 ×1/0,6; işçi bakar, toplar, yeniden
    eker; kuluçka; BESLEME_SN 300 besle; görev tohumları); tarla katmanı (tarlaAc/Gez/Capa [3 vuruş]/Ek/Vana/Isi/Hasat,
    tohumSec, yatakSesi); isle, erzakYukle (kalkışta; gorevler kalkis sarmalayıcısı), seferBitti (inişte; sentetik küp
    moral −3 peksimetsiz 300 sn+), kademeYukselt, isciDegistir (nufus.tarim; koloni.js bosta düşer), melez (terazi
    motoruyla iki ton; oktav, MELEZ_ESIK 0,012, 2 sn), yabaniTopla (TOPLAMA_SN 600), kasaAc (vanguard_enkaz t_kasa).
  - tarim/etki.js: d.seferEtki anahtarları; seyir (fener, yakıt, hız), savaş (uyarı eki, guvec stres yok, kalkan/lens
    hasar, macun onarımı, merhem stres yarı, kriyo yenilgide yas yok) okur. tarim/eylemler.js nokta eylemleri.
  - harita.js: sera_konsolu, ekim_teraslari (tarım), vaha_parselleri, yabani_mantar (mantar), yabani_liken (tüneller),
    yabani_sarmasik/hurma/bazalt (vaha). tesisler.js koloni_mutfagi (sondaj), kseno_eczane (biyo_kubbe).
  - Yuzey.js: tarla katmanı (tarlaJest), melez katmanı (melezJest), tarimMenuGoster (isle, isci, kademe, melez,
    ansiklopedi). Sesler ElevenLabs (flow BPWC2OLWbdljIKExgHDq, 10 × 17 kredi): tarim_capa/ekme/vana/hasat/hazir/melez/
    kuru/curuk/saglikli (I=-18, tek kanal 22 kHz wav), ortam_kubbe (20 sn, 2,5 sn çapraz geçiş, I=-24).
  - testler/tarim.test.js.
- SÜRÜM 2.1 (21 Kasım, Murat: "Devam"): Malken medeniyeti belgesi (Tonoflenya'ya varış). Telefonda denenmedi.
  - tonoflenya/harita.js: T_MEKANLAR 27 (ygk_6 … ygk_m5 iç 20×20, x 8200 + 40×sıra; halka_zhaor/varek/axira/sinha/uma/
    elyndra 7000-7560 dış 60×60; tenohris 7600; kara_gol 7700; dogu_kanton 7900; flee_plee 6200; aether_dock 6000; fenrir
    6400; arin 6600; veradon 6800; malazar 9000 statik; malazar_ocaklari 9200), tonoflenya: true; T_KAPILAR (halkalar
    zincir, bati_sur karaGolIzni, fenrir_iskelesi aetherKayigi, malazar_yolu malazarIzni, faz_kapisi, karavan_hatti …);
    T_NOKTALAR (asansor_<kat>, malken: konuşma, tonEylem, aether_1/2 ve buyu_tozu_1 yatakları). yuzey/harita.js sonunda
    Object.assign. dunya.js: Tonoflenya noktaları ve bütün geçit uçları Yerler'de bilinir; geçiş metni kapı adı + tarif.
  - tonoflenya/malken.js: seferKosullari (Sınıf III+, iki topluluk op'u kadim_mezar/g13/g14/aethel9, GEREKEN_OP 10),
    tepe eylemi y_ygk → ayarBaslat 'ygk' (gorev1: hedef 32-48, kilit → ygkFrekansi, sahne ygk_frekansi) ve zirve iğnesi
    'igne' (hedef 92-108 → malazarIzni); seyir.js UZAY_NOKTALARI.ygk_feneri (0,-1450; sinif 3; acKosul ygkFrekansi);
    gorevler.kenetlen → sicrama (gemi.liman tonoflenya, mekan ygk_5, sahne tonoflenya_varis/tekrar) + sicramaZamani
    (8 saat, zamanIlerle 60 sn adımlarla); iskelede donus (plato, sahne aethelis_donus). Eylemler ve Malken
    konuşmaları (kabul → ygkKayit; arşiv ikinci küre → karaGolIzni; iskele → aetherKayigi; kesis; gumruk; lonca; meclis);
    kodeks hekzat, malken_irki, arsiv_*, tenohris, batik_kule, arin, veradon, cevre_krallik. Asansör r.kapat (Yuzey katman
    kapatır), çekirdek r.akor (altı nöbet tonu).
  - zaman.js yildizCarpani (fener, uretim, aether, hiz, hasar, nufus): seyir, savaş, koloni, tarım okur.
  - tesisler.js hammaddeler aether, buyu_tozu. Sesler ElevenLabs (20 × 17 kredi): assets/ses/t/ortam_t_<ad>.mp3 (22 sn,
    2,5 sn çapraz geçiş, I=-24, 96k). Kat -3 ortam_revir, -4 ortam_reaktor.
  - testler/tonoflenya.test.js.
- SÜRÜM 2.2 (21 Kasım, Murat: "Devam"): kadim tarihçe. Telefonda denenmedi.
  - tonoflenya/kronik.js: KRONIKLER 1-11 (baslik, yer = nokta, ipucu, metin [paragraflar], 2. bölüm kopru: kizil_yutucu
    op'u), CAGLAR 8 (bolum), ONKOSUL (2 ← 1, 4 ← malazarIzni, 6 ← arinDersi, 9 ← 8), kronikEylemi (malken.js
    noktaEylemleri başına kr_<no>), kronikAc (d.kronik, kodeks kronik_<no>, itibar 15), kronikListesi, caglarListesi.
    Yeni noktalar kurulus_kitabesi (ygk_1), bagrius_aniti (malazar_ocaklari), tonEylem 'kitabe'.
  - Yuzey: menüde "Tonoflenya kronikleri" (tonoflenyaGoruldu ya da bir bölüm açıksa): bölümler ve çağlar alt listesi.
- SÜRÜM 2.3 (21 Kasım, Murat: "Devam"): büyük coğrafi atlas. Telefonda denenmedi.
  - tonoflenya/atlas.js: A_MEKANLAR 29 (x 10000 + 100×sıra; axira_cemberi, kristal_teraslar, tas_cember, kuzey 10, batı 5,
    doğu 7, güney 4; malazar_hale statik+zehirli, malazar_zirve soguk), A_KAPILAR (cember_saray; hale_yolu, zirve_yolu),
    A_NOKTALAR (atlas: istasyon|konus|arit|zeris|toz|sifahane|zaman; kaynaklar oksit_1, rezonans_cami_1, mavi_aether_1,
    morluk_1, buzul_aether_1, kristal_fidanlik), BOLGELER 34 (giris, mekanlar/onek), ROTALAR 40 (gun, mod, tehlike),
    TEHLIKELER, yolBul (Dijkstra; kayık rotası aetherKayigi ister), haritaListesi, seyahatEt (Kahergonat Yolu yalnız
    Sinha nöbeti; sahne seyahat_<mod>), GUN 7200. gorevler.seyahat: sn kadar zamanIlerle(60). elyndra_saray artık
    Axira Çemberi'ne, cember_saray Tenohris'e. aether_dock adı Tentran. Hammaddeler oksit_celik, rezonans_cami,
    mavi_aether, morluk_kristali, buzul_aether, saf_aether.
  - Yuzey: menüde "Tonoflenya haritası" (tonoflenyaHaritasi: kuşaklar → bölgeler → seyahat → sahne).
  - Sesler ElevenLabs (20 × 17 kredi): ortam_t_okyanus/mormon/loran/liman/kale/sanayi/kukurt/col/cam/kanyon/hardrin/
    kahergonat/tundra/zeris/bataklik/orman/teras/koy/ada/cember.
- SÜRÜM 2.4 (21 Kasım, Murat: "Kaç aşama varsa eksiksiz yap, bitirene kadar sorma"): eşya, zanaat, mürettebat;
  yönerge 5.A, 5.B, 6.C. Telefonda denenmedi.
  - tonoflenya/subay.js (bağımlılıksız): EKOLLER, KIDEMLER (0/100/300/700), KABILIYETLER (ekol_kademe; belge: true üç
    örnek), ISTASYONLAR (reaktor/silah/revir/dumen/sonar/hangar → ekol), SUBAYLAR (elyndra, varek, axira, zhaor
    [şemada var, profilsiz: eklendi], sinha, drahmir), KAPTAN; d.istasyonlar, guc/pasif çarpanları (kalkanIsi,
    aetherGuc, kritikIhtimal, moralKaybi, tarim, tarama, seyahat, yakit, tamir, kalkisYakit), ekolKazan (d.ekol; kademe
    atlayınca d.haberKuyrugu), kriz (d.krizDendi; eve inişte ve sıçramada sıfırlanır).
  - tonoflenya/zanaat.js: ESYA (kat 1-5), ISTASYONLAR (dokum/aether/imbik), TARIFLER, PAZARLAR (ml | isik); d.esya,
    d.kusanilan {silah, zirh}, d.para {ml, gk}, d.satilanVeri; miktar/ekle (hammadde, parça, eşya, urun_<bitki>, tohum);
    zanaatEt, kusan/modulTak (gemi.moduller[eşya]), kullan, reaktoreYukle, dokumhaneyeGonder; kargo/kargoDenetle;
    sicramaSuresi (SICRAMA_SN 8×300), SARJ_SN 2 gün (Tentran modülatörü 1), sicramaDurumu, sarjBaslat; veriSat,
    bakimYap; satinAl/sat/kurIslem; adaylar/istihdamEt (prosedürel subay), cekirdekAl; menüler (envanterMenu,
    zanaatMenu, pazarMenu, veriMenu, kurulMenu, subayMenu, ekolMenu) ağaç: { baslik, giris, ogeler [alt | yap], ikiParmak }.
    ekolDenetle (gorevler.zamanIlerle): yeni Tonoflenya mekânı, operasyon, fenomen sayısından puan.
  - tonoflenya/zanaatHarita.js Z_NOKTALAR (zanaat: kurul | veri | pazar; liman: taverna) ve yeni yataklar; yuzey/harita.js
    birleştirir. tesisler.js 11 yeni hammadde.
  - Kancalar: savas.js (yetenekler, yetenekSec/Kullan: aşağı kaydır / çift dokun; silah ve zırh etkileri, mühimmat,
    teleport üç parmak, kriz sözleri, bitir 'kacis'), seyir.js, fenomen.js, koloni.js, tarim.js, dunya.js, mini.js,
    gorev1.js (topla, iğne/ygk), atlas.js (seyahat), kronik.js, malken.js (kabulde 300 ML + 100 GK, bakım, şarj, toz).
  - sefer.js karşılaşmalar: OPERASYONLAR.k_sandik/k_firtina/k_multeci (tekrar: true, odulFn, sonuc işlevi; operasyon.js
    destekler), sefer_olay → d.olayOp → { tur: 'op' } → Yuzey opAc.
  - Yuzey: agacGoster(uret, geri) ağaç menü; r.agac; menüde Envanter, Zanaat tezgâhları, Subaylar ve istasyonlar, Yıldız
    Ekolü kıdemi. SesliListe onIkiParmak, Yuzey ilkOdak geçirir. Sesler ElevenLabs (6 × 17 kredi): el_sayfa, el_tufek,
    el_hancer, el_mizrak, el_golge, el_pelerin.
  - testler/zanaat.test.js.
- SÜRÜM 2.5 (21 Kasım): yirmi final görevi (tonoflenya-buyuk-final-gorevleri.md). Telefonda denenmedi.
  - tonoflenya/final.js: GOREVLER 1-20 (no, ad, konum, nokta, tehlike, jest, veren, kosul, giris, op adımları, savas,
    savasOnce, kararlar, sonrasi, odul, ortam); ZN.ESYA'ya ödül/yadigâr eşyaları; OPERASYONLAR tf<no> (yuzey: !uzay,
    final, sahne 'tf_ara') ve tf2_<0-5> (altı halka rezonatörü, tekrar, odulFn d.tf.rez); d.tf {aktif, evre, biten,
    karar, rez, catlak, unvan, guven}; ekEylemler (sıradaki görevin noktasında f_bas_/f_devam_/f_savas_/f_rez_);
    sahneler tf_giris (ortam işlevi), tf_savas_sonra, tf_ara, tf_rez, tf_karar (sonrasiHazirla), tf_odul, tf_epilog,
    tf_krediler. d.opBekle / d.savasBekle → gorevler.zamanIlerle { tur: 'op' | 'savas' } → Yuzey koloniOlaylari opAc /
    savasAc; savas.js bitir zaferde d.savasSonraSahne. finalHarita.js F_NOKTALAR.
  - operasyon.js: yuzey hasarı d.op.can (op_geri_cekil, gemi dokunulmaz), o.final/o.tekrar tamamlanana girmez, o.sahne,
    a.efekt; yeni adımlar zikzak, sessizlik, rotasyon (a.radyan), refleks, muhur (dokun parmak ≥ 3; opJest parmak
    geçirir); frekans a.cift, kacin a.ayni ve a.yon 'yukari', ritim a.girdi 'kaydir2'.
  - savas.js: golge_kanat, golge_gemisi, kahergonat_zirhlisi (karanlik); tf_kalkan, tf_obsidyen, tf_astral, onur_kilici,
    efsanevi_reaktor, tf_sicrayici ('atlama' yeteneği). seyir.js tf_astral/efsanevi_reaktor; atlas tf_deniz_haritasi;
    zanaat bakım kidemli_brove ×0,5.
  - Sesler ElevenLabs (5 × 17 kredi): el_koro, el_cahelon, el_sharon, el_mancinik, t/ortam_t_girdap.
  - testler/final.test.js (yirmi görev baştan sona).
- SÜRÜM 2.6 (21 Kasım): otuz yan görev ve itibar matrisi (tonoflenya-yan-gorevler-ve-yerel-vakalar.md). Telefonda denenmedi.
  - tonoflenya/yan.js: YAN 1-30 (no, kod, ad, tur, mekan + fx/fy, yer, npc, harita, onkosul [[ad, denetim|null]], ambiyans,
    talkback, giris, op, kararlar [K(etiket, sonuc, itibar, odul)]); YAN_NOKTALARI yan_<no> (yuzey/harita.js birleştirir);
    YADIGAR (eşya rehberi 4.2 belgeleri); OPERASYONLAR yan<no> (yuzey, final, sahne yan_karar); d.yan {aktif, biten,
    karar, itibar, bilim, ozel, gun, odunc, hardrinBariyer, nirdolKapali}; sahneler yan_giris, yan_karar, yan_odul;
    yanIlerle (maden hissesi, Tharal rasyonu, haftalık büyü tozu); FRAKSIYONLAR; yanMenu (menüde "Yan görevler ve itibar").
  - Kancalar: savas.js (haydut tabancası, Varek bataryası, akrep zehri, Malakor, kara buz parçası, bataklık feneri,
    Drahmir kalkanı, Gareth, Hardrin bariyeri, hayat muskası, gizli geçit haritası, Magentor protokolü 'atlama', toz
    pelerini), seyir.js (yıldız atlası, mavi prizma, parazit sensörü, çift graviton), tarim.js (gübre), zanaat.js
    (Tentran ücretsiz bakım, pazar indirimleri, değerli mallar, konser bileti, yeni reaktör eşyaları), atlas.js
    (d.bayrak.tehlikeMuaf, Nirdol kapalı). ElevenLabs (3 × 17 kredi): el_canavar, el_droid, el_kus.
  - testler/yan.test.js (otuz görev baştan sona, A/B dönüşümlü).
- SÜRÜM 2.7 (21 Kasım, Murat: "Murat ismini oradan kaldır, yapımcı olarak sadece Bahtiyar Cankurt yazsın"): App.js
  HAKKINDA_METNI ve final.js tf_krediler: "Yapımcı: Bahtiyar Cankurt."; README. Oyuncunun duyduğu metinlerde Murat'ın adı
  geçmez (kod yorumları dışında). Telefonda denenmedi.
- SÜRÜM 2.8 (21 Kasım, Murat ses dosyası ekledi: "fenrir denizi adlı ortam dosyası bu gönderdiğim ile değiştiriliyor"):
  assets/ses/t/ortam_t_fenrir.mp3 Murat'ın kaydından (600 sn'nin ilk 302 sn'si, 3 sn çapraz geçişli döngü, I=-24, 96k stereo;
  efektler.js düzeyi 0,6). Fenrir Işık ve Toz Denizi ve atlas seyahat_kayik (rezonans kayığı yolculuğu) bunu çalar. Telefonda denenmedi.
- SÜRÜM 2.9 (21 Kasım, Murat ses dosyası ekledi: "t bataklik adlı ortam dosyası bununla değiştiriliyor"): assets/ses/t/
  ortam_t_bataklik.mp3 Murat'ın kaydından (600 sn'nin ilk 302 sn'si, 3 sn çapraz geçiş, I=-24, 96k; düzey 0,6). Keralon
  Bataklıkları çalar. Telefonda denenmedi.
- SÜRÜM 2.10 (21 Kasım, Murat ses dosyası ekledi: "gemi uzay klasöründe bulunan ortam revir adlı dosya bu gönderdiğim ile
  değiştiriliyor"): assets/ses/ortam_revir.mp3 (eski ffmpeg sentezi .wav silindi; ilk 302 sn, 3 sn çapraz geçiş, I=-24, 96k;
  düzey 0,45 → 0,6). Gemilerin revir, yaşam, laboratuvar, koğuş, kseno, cerrahi, mülteci, hidroponik bölmeleri ve YGK Kat -3
  çalar. Telefonda denenmedi.
- SÜRÜM 2.11 (21 Kasım, Murat ses dosyası ekledi: "gemi klasöründe bulunan ortam kokpit adlı dosya ... ile değiştiriliyor"):
  assets/ses/ortam_kokpit.mp3 (eski .wav silindi; ilk 302 sn, 3 sn çapraz geçiş, I=-24, 96k; düzey 0,5 → 0,6). Bütün
  gemilerin kokpit/köprü bölmeleri çalar. Telefonda denenmedi.
- SÜRÜM 2.12 (21 Kasım, Murat ses dosyası ekledi: "gemi ortam kargo adlı dosya bununla değiştirilsin"): assets/ses/
  ortam_kargo.mp3 (eski yankılı kapsül .wav'ı silindi; ilk 302 sn, 3 sn çapraz geçiş, I=-24, 96k; düzey 0,5 → 0,6). Gemilerin
  kargo/hangar bölmeleri çalar. Telefonda denenmedi.
- SÜRÜM 2.13 (21 Kasım, Bahtiyar 20 gezegen ortamını zip olarak gönderdi, Pyros-Prime_.zip; Murat: "hepsini uygun yerlerine
  yerleştir"): assets/ses/gezegen/ortam_gez_p01..p20.mp3 (her biri 10 dk'lık kaydın baş sessizliği atılmış ilk 183 sn'si, 3 sn
  çapraz geçişli 180 sn döngü, I=-24, 96k; boyut için 302 değil 180 sn; toplam 42 MB). efektler.js KAYNAKLAR + DONGULER 0,6,
  calanOrtamAdi(). uzayGorevleri.js gezegen op'larında ortam ve ortamAdim (kenetle adımından sonraki adım); Yuzey opSesEsitle
  inişten sonra ortamCal(ortam, 0,8), opKapat sesleriEsitle ile oda sesine döner. Zip'teki Zephyr-Major ve Lithos-Echo dosyaları
  bayt bayt aynı (md5 99353bce…): ikisi de aynı sesi çalıyor, Bahtiyar'a soruldu. testler/gezegen.test.js. Telefonda denenmedi.
- SÜRÜM 2.14 (22 Kasım, Murat ses dosyası ekledi: "lithos echo"): Lithos-Echo'nun doğru kaydı (md5 173380f6…); assets/ses/
  gezegen/ortam_gez_p08.mp3 aynı işlemle (ilk 183 sn, 180 sn döngü, I=-24, 96k). 2.13'teki ortak dosya Zephyr-Major'da (p07) kaldı.
  Telefonda denenmedi.
- SÜRÜM 3.0 (22 Kasım, Murat v4 paketini gönderdi: Yeni_Icerikler_Paketi.zip, 39 belge → belgeler/v4/; okuma rehberi
  00-YAPAY-ZEKA-UYGULAMA-VE-OKUMA-REHBERI.txt beş faz): Faz 1, evrensel savaş motoru. Telefonda denenmedi.
  - uzay/savas.js yeniden: d.savas.ortam 'uzay' | 'kara'; dusmanlar [birim] + hedef dizini, s.dusman etkin hedefe bağ
    (bagla: JSON'dan dönünce ve eski tek düşmanlı kayıtlar için). TEHDIT T1-T5, oyuncuKademesi, tehditKademesi (en çok
    bir geride), oyuncuGucu (gemi sınıfı). MODULLER 8 (frekans, pusucu, cagiran, karanlik, isi, iyon, zehir, kacis);
    sahip(d, id) karşılık denetimi. SILAHLAR 12 (p pencere çarpanı, karsi, delici, ozel), UYARI_SESI. DUSMANLAR: 8 uzay
    (agir_maden_korsani, dron_tasiyici yeni), 5 kara, 5 yardımcı (kucuk), bosslar xarathia/lord_sharon/cahelon
    (fazlar: esik, soz, kalkan, moduller, pencere, zayif, olumsuz, sahte, frek, kilit, cagir). GELISLER 6, CEVRELER 3,
    karsilasmaUret(d, {ortam, bolge, no}) (T2+ ikincil modül). SARF (dondurucu köpük, sonik kovucu, kseno-panzehir,
    vaha şurubu, detoks) yetenek listesinde. DESTEK (filo destek yuvası d.destekNo, sınıfa göre), d.refakatci (kara).
    Kara: s.can/maxCan, sistem itici/kalkan/kask, s.stres, yenilgide kapsüle tahliye (Tonoflenya'da yerinde).
    Taktik harp dairesi (komuta_merkezi) ve dinleme kulesi (sinyal_kulesi) bildirimleri; nöbet sinerjileri.
  - sefer.js korsan karşılaşması → karsilasmaUret (yakın/derin). gorevler.js: kenetlen'de gezegen yörüngesi firkateyn
    devriyesi (T3, kule; d.savasBekle + d.opBekle), zamanIlerle savasBekle önce (kara savaşta gemi gerekmez),
    baskinIlerle (BASKIN_SN 900, Aethelis dış mekânda, seviye 2+, karakolu kurulu bölge hariç; spec.giris).
  - Yuzey: savaşta her düşmana konumlu kaynak savas_dusman_<no> (etkin hedef önde), uyarı sesi o.ses2, karada mekân
    ortamı; kokpit terminalinde "Savaşta destek yuvası" ve "Kara çatışmasında refakatçi".
  - testler/savas2.test.js (12 senaryo).
- SÜRÜM 3.1 (22 Kasım): v4 Faz 2 (binalar, gemiler, araçlar, eşyalar, dinamik yakıt). Telefonda denenmedi.
  - binalar.js (yeni): ROLLER (25 tesis → rol), ROL_NOBETLERI, KATKI, topluluklar, rolCarpani (koloni uretimBaslat),
    HAZIRLIKLAR + hazirlikYap/savasHazirligi/seferHazirligiBitti (d.hazirlik), NUMUNE_ESIKLERI + numuneTeslim
    (d.numuneler ← operasyon.js gezegen op'u; d.numuneTeslim; d.yan.bilim), kuleMenzili(d, sahip), binaMenu (koloni
    yönetimi). tesisler.js IRK_KOSULLARI (kilitli dört bina op'lara bağlı). uzayGorevleri.js gezHalka + gezegen
    acKosul'da kuleMenzili.
  - savas.js: sınıf özellikleri, DESTEK belgedeki gibi (destekSinifi), kara araçları (Mammoth matkabı, Kervan siperi ve
    ikmali, Atmosphere-X taraması ve tahliyesi, Akrep şaşırtması), bina katkıları, T-01/T-02/T-05..T-08, numune bonusları,
    termal giysi/lamine zırh, sarsıntı çevresi, nötralizasyon, kripto anten, Hisar süper-soğutma, hazırlıklar, kaçışta
    yakıt −4, spec.gezegen (gemi.tasinan aracı).
  - seyir.js: halka, yolBirimi, BIRIM_LITRE, rotaYakiti (kargo, Sinha, p07, kalibrasyon, numune 15); sürekli tüketim ×0,25;
    %15 kritik uyarı + en yakın ikmal yönü; uzay.halka. gorevler.js kenetlen: rota yakıtı (kilitli taramada yok), d.karakollar
    (ikmal karakolu kurulumu ve dolum), acilImdat (10 GK ya da gövde −%20; d.kurtarmaNotu), inişte biyo-karantina.
  - koloni.js filoGorevi (FILO_SN 300), harca/yeterMi piezo ↔ kristal. uretim.js lazer_sogutucu, itki_yaglayici.
  - gemiler.js TASIMA; gemi.js aracYukle (gemi.tasinan). zanaat.js: melez istasyonu, uretimYeri (saha/standart/melez),
    T-01..T-10 ESYA + TARIFLER (nobet, gozetmen; d.zanaatKuyrugu, zanaatIlerle, d.usta), tarifGirdisi gözetmen ×0,75 ve
    morluk/buzul aether ikamesi, cep-ambar +500 kargo, GK_ML 25, degerCumlesi (veri/deger.js DEGER).
  - Yuzey: kokpit terminalinde araç yükleme; koloni yönetiminde binalar ağacı; üretim menüsünde değer cümlesi.
  - testler/binalar.test.js (14 senaryo).
- Sıradaki: Tonoflenya belgelerinin hepsi işlendi; KAPSAM.md'de [~] notları (Bahtiyar'a sorulacaklar) ve telefonda deneme.

## Sesler
- Drive'daki Efektler/Ambians dosyaları 14 MB; Drive bağlayıcısı 10 MB'tan büyük dosyayı indiremiyor. Bu yüzden
  ortam döngüleri şimdilik Efektler klasörlerindeki bilim kurgu ortamlarından (hepsi Bahtiyar'ın Drive'ı):
  ortam_yuzey ← "Ortam Bilim Kurgu Rüzgar.wav" (Efektler 4), ortam_kapsul ← "Bilim Kurgu Yıldız Gemisi Alt Frekans
  Uğultu Ortamı.wav" (Efektler 6), ortam_harabe ← "Ambiyans Bilim Kurgu Uzaylı.wav" (Efektler 4, 0.3 ile salonda ve mabette),
  ortam_menu ← "Ortam Enerji Drone.wav" (Efektler 4). Efektler: bip ← "UI HUD Kısa Terminal Bip ... C.wav" (1),
  dugme ← "Eski Radyo Düğmesi.wav" (5), jenerator_calis ← "Enerji El Jeneratörleri 6.wav" (6), kapi ← "Bilim Kurgu
  Kapısı Açılışı 04.wav" (6), reddedildi ← "Arayüz Bip Sesleri Erişim Reddedildi.wav" (6), sinyal ← "Sinyal Kalibre
  Edilmiş Com.wav" (2), sonar ← "Geçiş Uzaylı Sonarı.wav" (1), tislama ← "Basınçlı Hava Tıslama ve Püskürme 06.wav" (6).
  0.2 ile: ortam_sirtlar ← "Volkan Patlaması.wav" (Efektler 4, 3,5-19,5 sn arası gürleme), patlama ← aynı dosyanın
  1,2-5,2 sn'si, valf ← "Buhar Püskürtme Tüpü Veya Borusu Uzak.wav" (4), sonda ← "Özel Tasarım Mega Buhar Kolu
  Mekanizması 001.wav" (6), konumsal/baca ← "Buhar.wav" (2, 1-5,2 sn döngü), telsiz_zil ffmpeg ile üretildi (880/1175/1568 Hz).
  Konumsal (tek kanal 24 kHz): jenerator_ugultu (Ortam Enerji Drone'dan 12 sn), parazit ("Bluezone Radyo Parazit
  Sinyali 025.wav"), sonar, bip; adim_tas_1..8 Demir 1919'dan (ElevenLabs).
  Dönüştürme: döngüler çapraz geçişle (python numpy, 2-2,5 sn) → loudnorm I=-24 TP=-3, 22050 Hz iki kanal;
  efektler sessizlik kırpma + loudnorm I=-18 TP=-2; konumsal I=-20, 24 kHz tek kanal.
- Ambians'ı kullanmak için: Bahtiyar ya da Murat dosyaları 10 MB'tan küçük parçalar hâlinde (ör. 3-4 dakikalık
  MP3) Drive'a koyarsa ya da sohbete eklerse indirilebilir.
- ElevenLabs: 1.5'te altı kısa efekt üretildi (yukarıda). Telsiz seslendirmesi yok. Bu ortam elevenlabsusercontent.com'a erişemez:
  adresleri araclar/indirilecek-sesler.json'a yaz, push et → .github/workflows/sesleri-indir.yml ham-sesler dalına indirir.

## Teknik
- Expo SDK 58; react-native-webview 14.0.1. Bu ortamda npm erişimi yok.
- Sözdizimi denetimi: `bun build index.js --outdir /tmp/bb -e expo -e expo-speech -e expo-haptics -e expo-status-bar -e react -e react-native -e 'react-native/*' -e '@react-native-async-storage/async-storage' -e expo-audio -e '*.wav' -e react-native-webview -e expo-asset -e expo-file-system`
- Motor betiği: konumsal.js'teki <script> içeriği `new Function` ile ve headless Chrome'da (google-chrome --headless=new
  --dump-dom) denenebilir.
- Testler: `bun test testler/` (yuzey.test.js senaryolar, bulanik.test.js rastgele sağlamlık).
- Expo proje kimliği c16f7fc6-b024-4e29-b55c-b0a304381807 (app.json; @murat5561/demir-1919). Ekran dikey (orientation portrait).
- Yayın: main'e push → GitHub Actions (.github/workflows/expo-guncelleme.yml) → eas update (branch main).
  Gizli anahtar depoda EXPO_TEKEN adıyla kayıtlı (iş akışı EXPO_TOKEN, EXPO_TEKEN, DEMIR1919'u dener).
  Kayıt `yayin-kaydi` dalında: `git fetch -q origin yayin-kaydi && git show FETCH_HEAD:yayin-kaydi.txt`
  Yedek yol: mcp__Expo__workflow_run (appFullName @murat5561/demir-1919, fileName yayin.yml, gitRef = commit).
  EAS iOS derlemesi (kredi harcar) Murat'a sormadan başlatılmaz.
- Android APK (Bahtiyar için; Murat 21 Kasım istedi): eas.json "apk" profili (internal, buildType apk, channel main).
  Kanal main → dal main: her push'taki eas update APK'ya da iner. runtimeVersion policy appVersion: app.json
  "version" 0.1.0 DEĞİŞTİRİLMEMELİ, yoksa güncellemeler eski APK'ya gelmez. Yeni yerel modül (package.json'a yeni
  native bağımlılık) eklenirse yeni APK gerekir. Derleme: mcp__Expo__build_run (ANDROID, apk, gitRef commit).
  İlk APK (21 Kasım, derleme 2ba770aa, runtime 0.1.0, kanal main): https://expo.dev/artifacts/eas/fpiGIh_F2fAgpXqa8WIDFGzzbCL6QfJa0xBXu4Bof6k.apk
- Akış: uygula → testler → bun build → CLAUDE.md/README → commit → git pull --rebase → push → yayın → SUCCESS'i bekle
  → Türkçe rapor (Expo Go bağlantısı, yenilikler, denenmemiş olanlar dürüstçe).
