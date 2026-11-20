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
- Sıradaki (yol haritası): Faz 2 Jeotermal Sondaj (Manyetik Sırtlar, güney yolu), dökümhane, nüfus ve iş gücü,
  mürettebat telsiz bildirimleri; Faz 3 tersane ve Kıvılcım; Faz 4 uzay haritası ve görevler; Faz 5 savaş.

## Sesler
- Drive'daki Efektler/Ambians dosyaları 14 MB; Drive bağlayıcısı 10 MB'tan büyük dosyayı indiremiyor. Bu yüzden
  ortam döngüleri şimdilik Efektler klasörlerindeki bilim kurgu ortamlarından (hepsi Bahtiyar'ın Drive'ı):
  ortam_yuzey ← "Ortam Bilim Kurgu Rüzgar.wav" (Efektler 4), ortam_kapsul ← "Bilim Kurgu Yıldız Gemisi Alt Frekans
  Uğultu Ortamı.wav" (Efektler 6), ortam_harabe ← "Ambiyans Bilim Kurgu Uzaylı.wav" (Efektler 4, henüz kullanılmıyor),
  ortam_menu ← "Ortam Enerji Drone.wav" (Efektler 4). Efektler: bip ← "UI HUD Kısa Terminal Bip ... C.wav" (1),
  dugme ← "Eski Radyo Düğmesi.wav" (5), jenerator_calis ← "Enerji El Jeneratörleri 6.wav" (6), kapi ← "Bilim Kurgu
  Kapısı Açılışı 04.wav" (6), reddedildi ← "Arayüz Bip Sesleri Erişim Reddedildi.wav" (6), sinyal ← "Sinyal Kalibre
  Edilmiş Com.wav" (2), sonar ← "Geçiş Uzaylı Sonarı.wav" (1), tislama ← "Basınçlı Hava Tıslama ve Püskürme 06.wav" (6).
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
