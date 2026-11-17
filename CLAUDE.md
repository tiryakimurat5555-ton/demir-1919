# Demir 1919 — çalışma notları

## Murat ile çalışma
- Murat'ın yalnızca iPhone'u var; kodu elle düzenleyemez. Bütün dosyaları ben yazar, depoya gönderirim.
  Asla "şu satırı değiştir" türü talimat verme. Kendisinin yapacağı adımlarda sayfanın doğrudan bağlantısını ver.
- Murat görme engellidir (VoiceOver kullanır); görsel tasarımı görüntüden değerlendiremez.
- Her şey Türkçe: arayüz, sesli rehber, kod içi adlar ve yorumlar.
- Diğer projeler (kayip-okyanus, TaslarPro, Deneme/Galaktik İmparatorluk) ayrıdır; onlara dokunma.
- Test edilmemiş bir özelliği çalışıyor diye sunma; telefonda ancak Murat Expo Go'da denediğinde doğrulanır.

## Tasarım
- Kaynak: belgeler/tasarim-taslagi.pdf (8 sayfa). 19. bölümdeki çalışma talimatına uy:
  önceki seçimleri yeniden sorma ya da sessizce değiştirme; her yeni tasarım kararında tek soru sor,
  önerilen seçeneği ve kısa gerekçesini söyle; 186. soru (dünya büyüklüğü) açık karar olarak kalır.
- Tarihsel gerçekler ile kurgu (örgüt, karakterler) ayrı tutulur; gerçek kişileri uydurma bilgilerle ilişkilendirme.
- Taslaktaki ölçek (fotogerçekçi, 80+ saat, çok şehir) hedeftir, taahhüt değildir. Önce dikey dilim:
  İstanbul limanı, Süleyman Kaptan, denizcinin eşyaları, belge, soruşturma panosu.
- Erişilebilirlik KARARI (17 Kasım, Murat A'yı seçti): oyun VoiceOver/TalkBack kapalıyken oynanır, Kayıp Okyanus
  düzeni. Kendi rehberi src/ses/rehber.js (expo-speech tr-TR), hareketler src/arayuz/jestler.js ve SesliListe.js
  (kayip-okyanus'tan alındı): kaydır = gez, dokun = oku, çift dokun = seç, uzun bas = açıklama, iki parmakla
  dokun = sustur, iki parmakla çift dokun = geri. Ekran okuyucu açıksa App.js uyarı katmanı gösterir.
- Ses (17 Kasım): src/ses/efektler.js (expo-audio). Ortam döngüleri ortam_rihtim/kayikhane/buro/han/oda
  (mekân kimliğiyle eşleşir; sahnede `ortam`, `ortamOran`, `efekt` alanları), efektler sandik, ani_savas, delil;
  sessiz.wav oturumu açık tutar. tik/secim/dip için dosya yok, titreşim. Menülerde rıhtım sesi 0,45.
  Üretim: ElevenLabs flow H13uSGbaUNJZNoPkxW7V (eleven_text_to_sound_v2; döngüler 30 sn loop true, generations_count 1).
  Bu ortam elevenlabsusercontent.com'a erişemez: adresleri araclar/indirilecek-sesler.json'a yaz, push et →
  .github/workflows/sesleri-indir.yml ham-sesler dalına indirir (adresler ~2 saatte geçersizleşir, hemen push et).
  Dönüştürme: döngüler `ffmpeg -i x.mp3 -af loudnorm=I=-24:TP=-3:LRA=11 -ar 22050 -ac 2 -c:a pcm_s16le`,
  efektler I=-18:TP=-2. Ayarlarda ortam sesi düzeyi (varsayılan 0,6).
- Seslendirme KARARI (17 Kasım, Murat A'yı seçti): karakter sesleri (ElevenLabs) hikâye metni oturunca; şimdilik telefonun sesi.
- Prototip KARARI (17 Kasım, Murat A'yı seçti): önce ses, sonra görüntü. Oynanış önce sesle (rehber, ileride
  3B konumlu ortam sesleri) kurulur; three.js görüntüsü oynanış oturunca aynı mantığı okuyarak eklenir.
  Taslaktaki joystick + 3B kamera hedefi duruyor; şimdiki mekân/menü gezintisi sesli prototip içindir.
- Murat hikâyenin derin ve sürükleyici olmasını istiyor (17 Kasım).
- Birinci bölüm "Sudaki Adam" (src/hikaye/bolum1.js): Aralık 1918 Karaköy. Ateşçi Sabri öldürülüp Leventis'in
  yanına atılır; Süleyman Kaptan'ın sakladığı denkte şifreli belge (Fransızca şehirler, siyakat, kanatlı anahtar).
  Mekânlar: rıhtım, kayıkhane, liman kayıt bürosu (Gülce; Süleyman'ın aracılığıyla, taslaktaki gibi), Kalafatçı Hanı
  (Ohannes Usta) ve Sabri'nin odası. Ferrante ve Ortakları (kurgu) yedek parça diye 40 sandık tüfek indiriyor.
  Zorunlu çıkarımlar: olduruldu, silah, orgut → karar (İngiliz askerî polisi / eski bir polis / sakla) → kapanış notu.
  Tohumlar (karara bağlanmadı, ileride Murat'a sorulacak): Manastır damgalı fotoğraf (Arif'in ailesi), Gülce'nin
  işareti daha önce görmüş olması, "eski bir polis" (adsız; Rıza Bey'in katılış sırası taslakta açık), travma sayacı
  (anı sahnelerinde nefes say / bastır), karar1, gulceyeAnlatti, gulceYalan, suleymanBag.
  Anlatım ikinci tekil şahıs, şimdiki zaman. Tarihsel: İtilaf donanması Kasım 1918'de geldi; Ankara hareketi henüz yok.
- Ekip KARARI (17 Kasım, Murat A'yı seçti): ana ekipten ilk katılan Cemil Bey (ikinci bölüm). Nermin ve Rıza'nın
  sırası hâlâ açık.
- İkinci bölüm "Ölüler Konuşur" (src/hikaye/bolum2.js): ertesi sabah; Komiser Halim (kurgu, rüşvetçi) Sabri'yi öğlen
  kimsesiz diye gömdürecek. Vakıf Gureba Hastanesi (gerçek) avlusu ve morgu (kurgu); hademe Rüstem; Cemil Bey
  (Paris, Viyana, Selanik; esprili, titiz; Balkan Harbi'nde emirle "kaza" yazdığı cesetlerin vicdan yükü).
  Morgda 5 inceleme (koltuk, akciger, mide, sirt, ceket) + kayıt defteri; 3 incelemeden sonra baskın sahnesi:
  Komiser Halim ve lavantalı adam; soğuk odada ani2 (24 Mayıs 1915 Arıburnu ateşkesi), bak/dinle → "Lö dizset atan".
  Midede jeton: kanatlı anahtar, Mercure, Pera, 17 (Mercure Kulübü kurgu; gerçek Cercle d'Orient kullanılmadı).
  Zorunlu çıkarımlar bicakla, ortbas, kulup → cenaze (mezar sözü) → Cemil katılır (cemilEkipte). İsteğe bağlı: motorda, bekleyen.
  Tohum: gorulmusOlabilir (lavantalı adam Arif'i görmüş olabilir), mezarSozu. Üçüncü bölüm: Pera, Mercure Kulübü.
- Bölümler src/hikaye/index.js BOLUMLER; durum.bolum. Bölüm sonu sahnesinde { sonrakiBolum } seçeneği →
  motor.bolumeGec: deliller, çıkarımlar ve bayraklar taşınır; bolumBitti, olay_*, gorüldü_*, incelendi_* sıfırlanır,
  bitti_<bölüm> eklenir. Sonraki bölüm önceki bölümün deliller/cikarimlar tanımlarını yayar (...BOLUM1.deliller).
- Konuşmada yan sorular `sonra` ile aynı düğüme döner; `sonra` yoksa konuşma biter.
- Motor src/oyun/motor.js (saf): görünüm sahne/mekan/konusma; etki {delil, bayrak, artir, sahne, mekan};
  olaylar (ceset_gitti, karar) bir sahne sürerken tetiklenmez. Kayıt src/oyun/kayit.js (AsyncStorage, otomatik,
  yedekli). Ekran src/ekran/Oyun.js: sahnede önce seçenekler sonra paragraflar; mekânda Çevrene bak, nesneler,
  kişiler, geçişler, Soruşturma panosu (iki delil seç = bağla), Defter, Ana menü.
- Ayarlar (src/ekran/Ayarlar.js): konuşma hızı 0,6-2,0 (varsayılan 1,2; Murat yavaş buldu), Türkçe ses seçimi.

## Teknik
- Expo SDK 58; sürümler kayip-okyanus deposuyla aynı (bundledNativeModules.json). Bu ortamda npm erişimi yok.
- Sözdizimi denetimi: `bun build index.js --outdir /tmp/bb -e expo -e expo-speech -e expo-haptics -e expo-status-bar -e react -e react-native -e 'react-native/*' -e '@react-native-async-storage/async-storage' -e expo-audio -e '*.wav'`
- Expo proje kimliği c16f7fc6-b024-4e29-b55c-b0a304381807 (app.json'da; @murat5561/demir-1919).
- Yayın: main'e push → GitHub Actions (.github/workflows/expo-guncelleme.yml) → eas update (branch main).
  Gizli anahtar depoda EXPO_TEKEN adıyla kayıtlı (yazım hatası; iş akışı EXPO_TOKEN, EXPO_TEKEN, DEMIR1919'u dener).
  Kayıt `yayin-kaydi` dalında: `git fetch -q origin yayin-kaydi && git show FETCH_HEAD:yayin-kaydi.txt`
  Yedek yol (GitHub çalışmazsa): push → mcp__Expo__workflow_run (appFullName @murat5561/demir-1919,
  fileName yayin.yml, gitRef = commit) → workflow_info SUCCESS → workflow_logs (CUSTOM bölümü) içindeki
  EXPO_GO_BAGLANTISI satırı. Expo'nun iş akışı süresini kullanır.
  GitHub Actions anahtar yoksa sessizce atlar.
- Testler: `bun test testler/` (bolum1/bolum2.test.js bölümleri farklı kararlarla baştan sona oynar).
- Akış: uygula → testler → bun build → CLAUDE.md/README → commit → git pull --rebase → push → yayın (yukarıda) → SUCCESS'i bekle
  → Türkçe rapor (Expo Go bağlantısı, yenilikler, denenmemiş olanlar dürüstçe).
