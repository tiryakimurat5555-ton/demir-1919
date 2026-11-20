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

## Tasarım kaynağı
- belgeler/ içindeki 9 belge (Bahtiyar'ın). Okuma sırası ve yol haritası:
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
- Sıradaki (yol haritası): Faz 3 Kıvılcım'ın parça parça montajı (tersane, 2 bölme) ve kalkış; Faz 2'nin kalanı
  nüfus ve iş gücü; Faz 4 uzay haritası ve görevler; Faz 5 savaş.

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
- ElevenLabs (kısa efekt, telsiz sesleri) henüz kullanılmadı. Bu ortam elevenlabsusercontent.com'a erişemez:
  adresleri araclar/indirilecek-sesler.json'a yaz, push et → .github/workflows/sesleri-indir.yml ham-sesler dalına indirir.

## Teknik
- Expo SDK 58; react-native-webview 14.0.1. Bu ortamda npm erişimi yok.
- Sözdizimi denetimi: `bun build index.js --outdir /tmp/bb -e expo -e expo-speech -e expo-haptics -e expo-status-bar -e react -e react-native -e 'react-native/*' -e '@react-native-async-storage/async-storage' -e expo-audio -e '*.wav' -e react-native-webview -e expo-asset -e expo-file-system`
- Motor betiği: konumsal.js'teki <script> içeriği `new Function` ile ve headless Chrome'da (google-chrome --headless=new
  --dump-dom) denenebilir.
- Testler: `bun test testler/`.
- Expo proje kimliği c16f7fc6-b024-4e29-b55c-b0a304381807 (app.json; @murat5561/demir-1919). Ekran dikey (orientation portrait).
- Yayın: main'e push → GitHub Actions (.github/workflows/expo-guncelleme.yml) → eas update (branch main).
  Gizli anahtar depoda EXPO_TEKEN adıyla kayıtlı (iş akışı EXPO_TOKEN, EXPO_TEKEN, DEMIR1919'u dener).
  Kayıt `yayin-kaydi` dalında: `git fetch -q origin yayin-kaydi && git show FETCH_HEAD:yayin-kaydi.txt`
  Yedek yol: mcp__Expo__workflow_run (appFullName @murat5561/demir-1919, fileName yayin.yml, gitRef = commit).
  EAS iOS derlemesi (kredi harcar) Murat'a sormadan başlatılmaz.
- Akış: uygula → testler → bun build → CLAUDE.md/README → commit → git pull --rebase → push → yayın → SUCCESS'i bekle
  → Türkçe rapor (Expo Go bağlantısı, yenilikler, denenmemiş olanlar dürüstçe).
