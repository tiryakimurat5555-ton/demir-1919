# Demir 1919 — çalışma notları

## Murat ile çalışma
- Murat'ın yalnızca iPhone'u var; kodu elle düzenleyemez. Bütün dosyaları ben yazar, depoya gönderirim.
  Asla "şu satırı değiştir" türü talimat verme. Kendisinin yapacağı adımlarda sayfanın doğrudan bağlantısını ver.
- Murat görme engellidir (VoiceOver kullanır); görsel tasarımı görüntüden değerlendiremez.
- Her şey Türkçe: arayüz, sesli rehber, kod içi adlar ve yorumlar.
- Diğer projeler (kayip-okyanus, TaslarPro, Deneme/Galaktik İmparatorluk) ayrıdır; onlara dokunma.
- Test edilmemiş bir özelliği çalışıyor diye sunma; telefonda ancak Murat Expo Go'da denediğinde doğrulanır.

## Tasarım
- HİKÂYE KARARLARI BENİM (17 Kasım, Murat: "Hikayenin gidişatını bana sorma. Derinliği olan sürükleyici hikayeyi,
  olayları, her şeyi sen oluştur"). Hikâye, olaylar, karakter kaderleri, ekibe katılış sırası için soru SORMA;
  belgeler/hikaye-plani.md'ye göre yaz ve tutarlı tut. Bu, taslaktaki "her kararda soru sor" talimatını hikâye
  için geçersiz kılar. Teknik/oynanış/erişilebilirlik kararlarında taslaktaki tek soru + öneri düzeni sürer.
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
  (mekân kimliğiyle eşleşir; sahnede `ortam`, `ortamOran`, `efekt` alanları), efektler sandik, ani_savas, delil, yangin; 3. bölüm döngüleri ortam_cemil_ev/pera/kulup/servis; 4. bölüm ortam_hastane/meyhane/depo, efekt silah; 5. bölüm ortam_guverte/salon/kamara/firtina, efekt vapur_duduk; 6. bölüm ortam_yanik_sehir/otel/ev; 7. bölüm ortam_kosk_bahce/kosk_ic, efektler kopek, kilise_cani; 8. bölüm ortam_tren/manastir/cezaevi/revir, efektler tren_duduk, demir_kapi;
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
  Tohumların çözümü belgeler/hikaye-plani.md'de (fotoğraf = kız kardeş Neslihan, "Madam N."; Gülce'nin babası;
  "eski bir polis" = Rıza Bey). Bayraklar: travma, karar1, gulceyeAnlatti, gulceYalan, suleymanBag.
  Anlatım ikinci tekil şahıs, şimdiki zaman. Tarihsel: İtilaf donanması Kasım 1918'de geldi; Ankara hareketi henüz yok.
- Ekip: Cemil Bey 2. bölümde (Murat seçti), Nermin 3. bölümde, Rıza Bey 4. bölümde (hikâye planı).
- İkinci bölüm "Ölüler Konuşur" (src/hikaye/bolum2.js): ertesi sabah; Komiser Halim (kurgu, rüşvetçi) Sabri'yi öğlen
  kimsesiz diye gömdürecek. Vakıf Gureba Hastanesi (gerçek) avlusu ve morgu (kurgu); hademe Rüstem; Cemil Bey
  (Paris, Viyana, Selanik; esprili, titiz; Balkan Harbi'nde emirle "kaza" yazdığı cesetlerin vicdan yükü).
  Morgda 5 inceleme (koltuk, akciger, mide, sirt, ceket) + kayıt defteri; 3 incelemeden sonra baskın sahnesi:
  Komiser Halim ve lavantalı adam; soğuk odada ani2 (24 Mayıs 1915 Arıburnu ateşkesi), bak/dinle → "Lö dizset atan".
  Midede jeton: kanatlı anahtar, Mercure, Pera, 17 (Mercure Kulübü kurgu; gerçek Cercle d'Orient kullanılmadı).
  Zorunlu çıkarımlar bicakla, ortbas, kulup → cenaze (mezar sözü) → Cemil katılır (cemilEkipte). İsteğe bağlı: motorda, bekleyen.
  Tohum: gorulmusOlabilir (lavantalı adam Arif'i görmüş olabilir), mezarSozu. Üçüncü bölüm: Pera, Mercure Kulübü.
- Üçüncü bölüm "On Yedi Numara" (src/hikaye/bolum3.js): Cemil'in Cihangir'deki evi, Pera Grand Rue, Mercure Kulübü
  salonu, servis koridoru. Nermin katılır (nerminBag; Sarıkamış'ta donan ağabeyi). Kılık (uşak kıyafeti, kilik) ve
  şüphe (suphe; SUPHE_SINIRI 3 → yakalandin sahnesi, disariAtildi; Nermin eksik delilleri getirir, bölüm sürer).
  Barmen Yorgo (Süleyman'ın eski aşçı yamağı), Yüzbaşı Hargreaves (Nermin aracılığıyla, izin_belgesi), baş garson.
  17 numaralı oda (yemek asansöründen): Delorme, Ferrante, Nazım Bey (Maliye); Santa Lucia, Odesa, rüşvet defteri,
  "Madam N. fotoğrafını istiyor" (madamN). Zorunlu: delorme, sevkiyat, rusvet → gece_yarisi → karar3
  (gazete/depo/ihbar) → yangın (kayıkhane yakılır, Süleyman yaralı kurtulur; karar1 sakla ise belgeyi kurtarmış) →
  kapanış.
- Dördüncü bölüm "Kül" (src/hikaye/bolum4.js): Gureba koğuşu (Süleyman yaralı), Rıza Bey gelir (karar1 polis ise
  Cihangir'deki adam; Halim'i o yetiştirdi; "döverek değil delille"). Gülce sırrını açar (babası Kâmil Efendi, 1913,
  "İmzala ve yaşa"); gümrük kâğıtları + damgayı geciktirme seçimi (gulceGecikme). Yüksekkaldırım meyhanesinde sorgu:
  baski (BASKI_SINIRI 3; defin +1, rakı +1, K 7/rusvet +2, delorme +1; tehdit rizaBag -1) → itiraf → halimKarar
  tutukla/birak (her iki durumda Halim ölür: hücrede asılı / depoda bıçaklı). Çıkarımlar katil_delorme, saat_on →
  depo: yol deniz/dam, hamallar (Topal Hasan), Mauser, Delorme yüzleşmesi: saldir (yaraKol, travma+1) / oyala
  ("ateşi canlı tutmak") / fotograf (fotografVerildi; "Ne kadar benziyorsunuz", Selanik). Sandıklar: karar3 ihbar →
  Teğmen Ashford, Hargreaves tutuklandı; gulceGecikme → jandarma; yoksa mavna yakılır (sevkiyatSonuc tam/yarim).
  Telgraf: SALONIQUE, N. 23 Aralık. Kül sahnesi; rizaEkipte.
- Beşinci bölüm "Kalliope" (src/hikaye/bolum5.js): vapur kamarası, yemek salonu, kamaralar koridoru, güverte.
  Ekip seçimi (ekip_cemil/nermin/riza; ikisi gelir). Brenner (kurye, kaçmak istiyor), Garnier (kol düğmesi =
  kanatlı anahtar; Brenner'i siyanürle öldürür), Yüzbaşı Morin (Fransız istihbaratı; çevirmen gerekir: Nermin ya da
  Saltiel), Saltiel (Selanikli Yahudi tütün tüccarı, dost), kamarot Lefteris. Garnier delili: kol_dugmesi + (zehir:
  Cemil | brenner_notu: Nermin | kamarot_ifadesi: Rıza | bos_sise: herkes, garnier_kaptan sonrası kamara9).
  Brenner'in astarında mühürlü mektup (muhurSaglam: buharla / kır) → talimat (+ telgraf). Fırtına: atıl (yaraKol →
  denize düşer, değilse kapsülle ölür) / konuş ("O kadın senin..." yarimCumle) / Morin (morinGuven → tutuklu,
  fransizBag). Varış: Beyaz Kule, 1917 yangını; Hotel Olympos yarın akşam.
- Altıncı bölüm "Hotel Olympos" (src/hikaye/bolum6.js): Kalamarya'da Rebeka Hanım'ın evi (Saltiel'in kuzeni), yanık
  şehir, otel lobisi. Saltiel ya da Morin (fransizBag) → riviere_bilgi. Hafız Efendi (barakalar incelenince):
  aile: baba Kalaycı İsmail Usta (Manastır yoluna döndü, kayıp), anne Zehra Hanım (göç yolunda tifo), Neslihan 17
  yaşında Rivière'in adamlarınca alındı → ani3 (Manastır Kasım 1912; Arif esir düşüp döndüğünde ev yanmıştı).
  Kâtip yalnızca ekip üyesiyle konuşur (cemilOtel/nerminOtel/rizaOtel) → otel_kaydi (Delorme 24 Aralık geliyor).
  Çıkarımlar kardes, randevu, riviere → olympos: kurye (muhurSaglam) / hamal (çay: iç +1 / değiştir) / abi (+1);
  yuzyuze: talimat (+2) / ayva (+1) / Sabri (+1). neslihanBag >= 2 → çalışma odası anahtarı, kasa Montaigne'in
  arkasında (anahtarAlindi), "Git, abi"; değilse "bir daha karşıma çıkma".
- Yedinci bölüm "Montaigne" (src/hikaye/bolum7.js): 23→24 Aralık gecesi, Rivière'in köşkü. Mekânlar ev (Rebeka Hanım),
  kosk_bahce, kosk_ic, calisma (ortam ortam_kosk_ic). Sızma: alarm sayacı (ALARM_SINIRI 3 → yakalandi sahnesi, yakalandi7;
  Rivière defteri kendisi verir). Köpek: Cemil ilaçlı et, yoksa havlama sahnesi +1; bekçi: Rıza tur sayar / Nermin oyalar,
  yoksa +1; kapı: anahtarAlindi ya da Rıza tel, yoksa zorla +1; pencere (Neslihan'ı görürsün) ve merdiven birer kez +1.
  Kasa: kitaplık (Montaigne) → kasaBulundu; çerçeve "N., 12 Aralık 1912" → tarihBilindi → defter_yarisi → riviere sahnesi
  (Babamı sor / talimat) → riviere_mektubu → delorme_gelir: koru / atil (travma+1) / kac (travma+1). Rivière her yolda ölür,
  Delorme uçuruma atlar (cesedi yok; döner). neslihanSecim geldi/gitti/kaldi. kacis → ev; Hafız Efendi siyakat_okundu.
  Çıkarımlar baba_yasiyor (riviere_mektubu + hafiz_tanik), isimler (siyakat_okundu + defter_yarisi; N. R.) → safak
  (kilise_cani; Noel arifesi) → son.
- Sekizinci bölüm "Kalay" (src/hikaye/bolum8.js): 26-27 Aralık 1918, Manastır (Sırp-Hırvat-Sloven Krallığı; cephe
  yıkıntısı). Açılış trende (ortam_tren, tren_duduk). Mekânlar carsi (Yusuf Usta, eski çırak → kalay_takimi, kanat
  kalıbı), baba_evi (ilkSahne işlev: Neslihan yanında değilse avlu_neslihan → neslihanGeldi8, sonra ani4: 1902,
  "kalay bakırı zehirden korur", ritim tak, tak-tak, tak → ritimBilindi), cezaevi (gardiyan Stojan → cezaevi_kaydi,
  hucreIzni), revir (Dr. Ferdinand Hasler, İsviçreli, Clavis; dosyalar → hasler_raporu; dolap → afyon: Nermin
  haslerOyalandi ya da Rıza tel), hucre (baba İsmail Usta; goz: Cemil → afyon; babaTanima: takım +1, ritim +1,
  Neslihan varsa +1; >= 2 → babaTanidi). Çıkarımlar yargisiz (cezaevi_kaydi + riviere_mektubu), ilacli
  (hasler_raporu + afyon) → yuzbasi (Yüzbaşı Lazar Ristić, dürüst) → haslerSonu tutuklu / kacti; ikisinde de
  viyana_ipucu (Delorme yaşıyor, 15 Ocak Viyana, Hotel Imperial) ve kalipSirri (babası 1908'de anahtar kalıbını
  döktü) → tahliye (demir_kapi) → han → son. Dokuzuncu bölüm (Viyana) yok.
  motor.mekanaGir: ilkSahne işlev olabilir (deger). mekanaGir olayları tetiklemez; mekâna girişte sahne için ilkSahne kullan.
- Hassasiyet: örgüt üyeleri çeşitli uyruklardan; hiçbir din/etnik grupla özdeşleşmez (hikaye-plani.md).
- Mekânda `ortam` alanı mekânın ortam sesini değiştirir (yoksa 'ortam_' + mekân kimliği).
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
- Testler: `bun test testler/` (bolum1-8.test.js bölümleri farklı kararlarla baştan sona oynar; 3'te şüphe yolu da).
- Akış: uygula → testler → bun build → CLAUDE.md/README → commit → git pull --rebase → push → yayın (yukarıda) → SUCCESS'i bekle
  → Türkçe rapor (Expo Go bağlantısı, yenilikler, denenmemiş olanlar dürüstçe).
