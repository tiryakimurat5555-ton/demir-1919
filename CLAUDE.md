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
  (mekân kimliğiyle eşleşir; sahnede `ortam`, `ortamOran`, `efekt` alanları), efektler sandik, ani_savas, delil, yangin; 3. bölüm döngüleri ortam_cemil_ev/pera/kulup/servis; 4. bölüm ortam_hastane/meyhane/depo, efekt silah; 5. bölüm ortam_guverte/salon/kamara/firtina, efekt vapur_duduk; 6. bölüm ortam_yanik_sehir/otel/ev; 7. bölüm ortam_kosk_bahce/kosk_ic, efektler kopek, kilise_cani; 8. bölüm ortam_tren/manastir/cezaevi/revir, efektler tren_duduk, demir_kapi; 9. bölüm ortam_viyana/kahve/mutfak, efekt tramvay; 10. bölüm ortam_kule/kayik, efekt dokum; 11. bölüm ortam_kordon/kemeralti; 12. bölüm ortam_arsiv/yali; 13. bölüm ortam_yagmur; 14. bölüm ortam_zurih/banka; 15. bölüm ortam_genelkurul, efekt tokmak; 16. bölüm ortam_baskin; 17. bölüm ortam_inebolu/kagni; 18. bölüm ortam_sahra, efekt top; 19. bölüm ortam_telgraf; 20. bölüm ortam_matbaa/istasyon; 21. bölüm ortam_yangin21; 22. bölüm ortam_lozan_otel/gol; 23. bölüm ortam_sofra; 24. bölüm ortam_kurtulus, efekt baston; 25. bölüm ortam_mezat; 2. bölüm morgu ortam_cezaevi;
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
  döktü) → tahliye (demir_kapi) → han → son.
  motor.mekanaGir: ilkSahne işlev olabilir (deger). mekanaGir olayları tetiklemez; mekâna girişte sahne için ilkSahne kullan.
- Dokuzuncu bölüm "Imperial" (src/hikaye/bolum9.js): 12-18 Ocak 1919, Viyana (aç, soğuk; Paris konferansı 18 Ocak).
  Neslihan her zaman yanında (Almanca bilir; cevirmen(d): Nermin > Cemil > Neslihan). Takas malı: tutun (açılışta 2,
  Saltiel'in tütünü). Mekânlar pansiyon (Frau Gruber: tütün verilebilir; masa9 → sahteFikri → Neslihan sahte_defter
  sahnesi), ring (asker kişisi: tütün verilebilir), kahve (Café Central, Franz Kessler: Nermin ücretsiz / tütün / tütün
  bitmişse defterden bir isim → isimVerildi; rainer_bilgi, toplanti_yeri), lobi (resepsiyon: Neslihan Madame Rivière
  olarak → delorme_odasi), mutfak (asansör → asansorBulundu; Josef: Cemil kız kardeşine bakar / tütün → garson).
  Çıkarımlar buyuk_usta (rainer_bilgi + siyakat_okundu), tuzak (delorme_odasi + viyana_ipucu) + toplanti_yeri → plan:
  yol9 neslihan / garson / asansor → toplanti (Viktor Rainer, Bankhaus Rainer, örgütün başı; "Paris'te Yunanlılara İzmir")
  → teklif: sahte (sahte_defter; Rainer Delorme'u kovar, delormeKovuldu) / red (Delorme bıçaklar, yaraBogur, travma+1)
  → defter_karari: defterKarar fransiz / gazete (isimlerBasildi) / sakla → telgraf9 (Manastır'dan) → son.
- Onuncu bölüm "Kurşun Mühür" (src/hikaye/bolum10.js; ikinci kitabın açılışı): 10-15 Mayıs 1919 İstanbul. Bütün ekip
  burada (açılış ekip_* bayraklarını true yapar, kalay_takimi'ni garantiler). Mekânlar rihtim (Süleyman), buro (Gülce →
  gumruk_listesi: Santa Lucia, Trieste → İzmir, 60 sandık), han (baba → baba_itirafi: 1908 kalıp, 1912 tüfek sandıkları,
  kalıbı Rivière'den çaldı; Ohannes'in ocağı), antrepo (sahteMuhur sonrası; Topal Hasan → hasanHazir; sandiklar →
  sevkiyat_karari). Çıkarımlar ikinci_sevkiyat (gumruk_listesi + viyana_ipucu), kalip (baba_itirafi + kalay_takimi)
  → dokum (efekt dokum; 60 sahte kurşun mühür; sandıkların içi taşla değişir). sevkiyatKarar ingiliz / anadolu
  (hasanHazir; İnebolu) / batir → olay kacirma: baba kaçırılır, delorme_notu → kayik → kule (Kız Kulesi): kuleSecim
  kalip (baba Delorme'u iter; delormeSonu denizde, kalipKayip) / atil (Rıza vurur; vuruldu) / konus (teslim olur;
  tutuklu, ferranteIpucu: asıl sevkiyat Haziran'da) → safak10 (15 Mayıs 1919 İzmir çıkarması haberi) → son.
- On birinci bölüm "Kordon" (src/hikaye/bolum11.js): 5-11 Haziran 1919 İzmir, işgalin ilk haftaları. Bütün ekip ve
  Neslihan. Mekânlar kordon (otel_levant → whitlock_kaydi; nöbet yeri), klinik (Dr. Eleni Mavrou, İzmirli Rum hekim,
  Cemil'in Paris'ten sınıf arkadaşı → gecisIzni: Kızılhaç bantları; yaralı hamal Kadir → aurora_adi), yazihane
  (Ferrante'nin Punta'daki yazıhanesi; taş sandık babanın çentikli mührüyle; kagitlar → ferranteYeri), kemeralti
  (gecisIzni; han_kapisi → ferranteBulundu; Ferrante: Anlaştık → ferranteGuven / Hayır → teslim; ikisinde
  ferrante_defteri). Neslihan defteri okur → iki_yana (Aurora: 40 makineli tüfek; yarısı Rum, yarısı Türk çetelerine).
  Çıkarımlar aurora (aurora_adi + iki_yana), yeni_adam (whitlock_kaydi + rainer_bilgi) → gece_plani: auroraSonu
  ihbar / batti (Stavros'un kayığı, ambarı su bastırma) → whitlock (Elias Whitlock, Amerikalı, Rainer'in yeni adamı;
  ferranteSonu kacti / tutuklu) → son_sayfa (Ferrante'nin defterinde: K. E., 1913, tasfiye, onay N. B. = Nazım Bey
  Gülce'nin babasını öldürttü; nazimBulundu) → son.
  Hassasiyet: hiçbir topluluk kötü gösterilmez; klinikte herkes; örgüt iki tarafa da silah satar.
- On ikinci bölüm "İmza" (src/hikaye/bolum12.js): 24-28 Haziran 1919 İstanbul. Açılış tasfiye_satiri verir.
  Mekânlar rihtim, buro (ilkSahne gulce_ogrenir → gulceBildi; Gülce → agir_sandik: Columbia, 30 sandık × 400 kg
  "tütün"), gulce_ev (Kumkapı; baba_sandigi → baba_mektubu: evrak 1329/417), maliye (arsiv_kapisi → arsiv sahnesi:
  Rumi yıl bulmacası; doğru raf "1329, Gümrük Kalemi" → kamil_raporu; yanlış raf dikkat +1, DIKKAT_SINIRI 3 →
  arsiv_yakalandi: yaşlı kâtip dosyayı verir, nazimUyarildi), pera (pera_palas: Rıza izler, Neslihan siyakatı okur →
  whitlock_nazim). Çıkarımlar katil_nazim (tasfiye_satiri + kamil_raporu), altin (agir_sandik + whitlock_nazim) →
  yali_yol → yali (Kandilli, Nazım Bey): yaliSecim tut → imza / birak → namlu (travma+1) → imza (Gülce: "İmzala ve
  yaşa"; nazim_itirafi) → columbia: altinKarar ingiliz / gazete (nerminGazeteKapandi) → son_sabah (Rainer'in telgrafı:
  "Artık kendim geliyorum"; rainerGeliyor) → son. gulceYakin(d): gulceGuven >= 2 ya da gulceyeAnlatti.
- On üçüncü bölüm "Satranç" (src/hikaye/bolum13.js; ikinci kitabın sonu): 8-10 Ekim 1919 İstanbul. Açılış davetiye verir
  (ortam_yagmur). Mekânlar han (Neslihan → imza_ani: Ekim 1918 Viyana noteri; baba), telgrafhane (telgraf13 →
  telgraf_bekle sahnesi → vasiyet: Rivière'in %34 Bankhaus Rainer hissesi Neslihan'a), palas (Pera Palas barı,
  Whitlock → whitlock_korku). Çıkarımlar miras (vasiyet + imza_ani), sallanan_koltuk (whitlock_korku + rainer_bilgi)
  → satranc1-3: söz satrancı, avantaj (hamle1: nazim_itirafi ya da sahteMuhur +1; hamle2: defterKarar'a göre ya da
  ezber +1; hamle3: koltuk +2), TERK_SINIRI 4 → satrancSonu terk / berabere → hisse_karari: hisseKarar sat / genelkurul
  (neslihanBag +1) / bagis → whitlock13: terk ise Whitlock kaçar ve zurih delilini verir (Zürih, kasa 1908, Rainer'in
  kendi defteri), berabere ise Whitlock ölü bulunur → son_sabah13 → son.
- On dördüncü bölüm "Que sais-je?" (src/hikaye/bolum14.js; üçüncü kitabın açılışı): 18-20 Kasım 1919 Zürih. Ekip Cemil +
  Nermin + Neslihan (ekip_riza false; Rıza İstanbul'da). Mekânlar otel (riviere_sandigi → kucuk_anahtar + ajanda;
  denemeler → exlibris "Que sais-je?"), sehir (Bahnhofstrasse; banka geçişi kasa_yeri çıkarımıyla), banka (Banque Vollmer;
  Klara Rainer: Rainer'in torunu, bankanın avukatı → klaraTanisti, klara_uyarisi; gise → parola çıkarımı varsa
  parola_sahne). Çıkarımlar kasa_yeri (ajanda + davetiye), parola (exlibris + kucuk_anahtar). Parola bulmacası: doğru
  "Que sais-je?"; yanlış yanlisParola +1, YANLIS_SINIRI 2 → mudur (Klara tanışıldıysa yardım eder, değilse Neslihan
  hatırlar ama gecikme14: Gubler polisle gelir) → kasa (kurulus_defteri: Selanik 1908, beş kurucu, "usta bilmesin",
  kırmızı rüşvet sayfaları) → mektup (Rivière: babayı ben ihbar ettim; "Que sais-je?") → gol (Dr. Gubler):
  defter14 klara (klaraTanisti) / kopya (Nermin'in Kodak'ı; negatifler Kessler'e, Rıza'ya) / viyana → son_sahne14 → son.
- On beşinci bölüm "Genel Kurul" (src/hikaye/bolum15.js): 15-24 Aralık 1919 Viyana. Ekip Cemil + Nermin + Neslihan.
  Paylar: Rainer %40, Rivière payı %34 (hisseKarar sat ise Rainer'de, oy 0), Vollmer %8, Szalay %10, Pendle %8 (PAYLAR).
  oyToplami(d) dışa açık; > 50 → devrildi, değilse ikna edilen kurucu >= 2 → iflas, yoksa kazandi (kurulSonu).
  Mekânlar pansiyon (Frau Gruber; oy_cizelgesi; Neslihan → budapeste_satiri, kanıt gerekir), ring (bankhaus geçişi
  kanitVar: defter14 kopya değilse ya da fotograflar), kahve (Kessler; karanlik_oda yalnız kopya yolunda → fotograflar),
  imperial (kurucular: Vollmer → kanıt; Szalay → budapeste_satiri; Pendle → agir_sandik ya da aurora_adi; oy_* bayrakları),
  bankhaus (ilkSahne genel_kurul, efekt tokmak) → ring15: rainerSonu tutuklu / yalniz (Salzburg) / serbest (kazandi;
  Klara istifa eder, Cenevre) → son15 (Noel arifesi; Ankara haberi) → son.
- On altıncı bölüm "16 Mart" (src/hikaye/bolum16.js): 13-17 Mart 1920 İstanbul. Bütün ekip (ekip_* true). Gubler
  Rainer'in adamlarından derlediği kara listeyi İngilizlere satacak. Mekânlar han (Neslihan → mektup_baba sahnesi:
  Rivière'in mektubunu babaya okur, babaAffetti), rihtim (Süleyman → kayikHazir), buro (Gülce → izin_kagitlari),
  pera (Tokatlıyan; Gubler: satın al [hisseKarar sat] / tehdit [kurulus_defteri ya da fotograflar] → kara_liste;
  yoksa gubler_odasi: Rıza + Cemil çalar; listeYolu para/tehdit/hirsiz). Olay gece16 (kara_liste + izin_kagitlari +
  kayikHazir) → listeKarar uyar / yak (travma+1) → baba_karar: babaKarar anadolu / sakla (Ohannes'in mahzeni) →
  baskin (16 Mart 1920 şafak, ortam_baskin; Nermin Anadolu'ya gider, nerminSonu anadolu; uyar ise rizaYarali) →
  son16 (Nermin'in notu: Ankara, Taşhan) → son.
- On yedinci bölüm "Kağnı" (src/hikaye/bolum17.js; üçüncü kitabın sonu): 8-23 Nisan 1920, İnebolu → Ankara. Ekip Cemil
  + Rıza + Neslihan (ekip_nermin false; Nermin Ankara'da); babaKarar sakla ise baba yanında (baba17), anadolu ise Ankara'da.
  Açılış erzak 2. Mekânlar iskele (hasan17 yalnız sevkiyatKarar anadolu), carsi17 (postane → zihni_baglantisi; depo17;
  mahzen geçişi mahzenYeri ile), mahzen (sandiklar17 → mahzen_sandiklari; anadolu ise babanın çentikli mühürleri),
  kafile (Zeynep Ana → mahzenYeri). Neslihan da zihni_baglantisi verir (kanıt varsa). Çıkarım istifci → zihni sahnesi:
  zihniSonu teslim / kafile → kafile_baslangic → etap_kure (orman: zihniSonu kafile ise eşkıya geçirir, değilse
  erzak -2 yorgunluk +1; vadi: erzak -1) → etap_ilgaz (gece: yorgunluk +1; han: erzak +1) → etap_cankiri (kafileSonu
  perisan: erzak <= 0 ya da yorgunluk >= 2, değilse saglam) → ankara (23 Nisan 1920, meclisin açılışı arka plan) →
  harf (baba kanatlı kalıbı eritip Nermin'in matbaasına Ç, Ğ, Ş döker; kalipKayip ise eliyle; kalipEridi) → son.
- On sekizinci bölüm "Kinin" (src/hikaye/bolum18.js; dördüncü kitabın açılışı): 3-14 Ocak 1921, Eskişehir yakınında
  Cemil'in sahra hastanesi. Ekip Cemil + Rıza + Neslihan. Açılış yuk_telgrafi verir; travma >= 2 ise nobet sahnesi
  (Çanakkale anısı, efekt top): Cemil'in sesine tutun (travma -1, nobetAtlatildi) / kaç (nobetKacti). Önemli motor notu:
  sahne seçeneğinde etki.mekan varsa `sonra` yok sayılır; sahneye geçmek için etki.sahne kullan.
  Mekânlar cadir (teslim → teslim_fisleri; hesap_kagitlari nesnesi teslim_fisleri + depoGoruldu varken → hesap sahnesi:
  doğru "Depo ile hastane" → depo_defteri; yanlış → hesap_yanlis, yeniden), esir (Yannis, Yunan esir hekim; Neslihan
  Rumca çevirir → esir_tanikligi), depo18 (depo_kaydi → depoGoruldu). Çıkarımlar kayip_ilac (depo_defteri +
  teslim_fisleri), iki_cephe (esir_tanikligi + yuk_telgrafi) → sabit (müteahhit Sabit Bey iki cepheye satıyor):
  sabitSonu teslim / konustu (ag_bilgisi: İstanbul Gümrük'te M. T.) → esir_degisimi (Kızılhaç; Eleni öbür taraftan
  Cemil'e mektup ve kinin gönderir) → son (sonrakiBolum bolum19).
- On dokuzuncu bölüm "Yeşil Mürekkep" (src/hikaye/bolum19.js): 2-9 Nisan 1921 İstanbul. Ekip Arif + Rıza + Neslihan (ekip_cemil
  false). Açılış sabitSonu konustu ise ag_bilgisine değinir. Mekânlar rihtim (Süleyman → kurye_notu), buro (mudur_masasi →
  yesil_murekkep; kayit_defteri19 [kurye_notu varken] → el_yazisi; nobet19 → nobet_cizelgesi; kişiler gulce, tevfik, muhsin),
  kontrol (İngiliz kontrol bürosu, ortam_telgraf; Turner → turner_ifadesi, isteğe bağlı). Çıkarımlar kalem (kurye_notu +
  el_yazisi), gece_nobeti (nobet_cizelgesi + yesil_murekkep) → olay suclama: Muhsin / Turner yanlış (yanlis_*; gulceGuven -1,
  seçenek düşer, Turner kişisi kaybolur) / Tevfik (haindogru) → tevfik: tevfikKarar teslim / cift → gece19 → son.
- Yirminci bölüm "Tarife" (src/hikaye/bolum20.js): 18-24 Ağustos 1921 Ankara/Polatlı. Ekip herkes (ekip_* true). Mekânlar
  tashan (Nermin'in matbaası, ortam_matbaa; Nermin → mavi_kagit; tevfik20 yalnız tevfikKarar teslim), han20 (ortam_han;
  katip20 → nuri_izi; nuri_odasi [nuri_izi varken] → pendle_ceki), istasyon (ortam_istasyon; sef_defteri → sevk_listesi),
  polatli (ortam_sahra; Cemil). Çıkarımlar sahte_vesika (mavi_kagit + nuri_izi), tarife (sevk_listesi + pendle_ceki) → olay
  plan20 → atama_han → atama_istasyon (atamaHan/atamaIstasyon; dogruAtama(d): han riza, istasyon nermin) → gece20 (nuriSonu
  yakalandi/kacti, trenSonu tam/hasarli, cemilYalniz) → nuri20 (Arethusa, İzmir) → polatli_son (efekt top) → son.
  Ek: nermin düğümleri cevdet (nerminCevdet) ve yemin (nerminYemin).
- Yirmi birinci bölüm "Arethusa" (src/hikaye/bolum21.js; bölüm yazma kurallarıyla yazılan ilk bölüm): 11-16 Eylül 1922 İzmir.
  Yangının faili tartışılmaz; rıhtımda her topluluk. Ekip herkes + Süleyman. Mekânlar kordon21 (durbun → kopru sahnesi →
  suvari, suleymanUmut soz [aramaSozu]/bak/sessiz; acente → ajan_defteri; cocuk21 → cocuk: cocukKarar aile/yanina,
  "Ayva"), klinik21 (ortam_hastane; Eleni → eleni_tanikligi; Cemil). Tek çıkarım fiyat (ajan_defteri + eleni_tanikligi)
  + suvari → olay yangin (ortam_yangin21, efekt yangin; travma >= 2 ise yanginAni neslihan [kardesGecesi durust/sonra_durust]
  / cemil [cemilBag >= 1] / yalniz, travma ±1) → sorgu21 (Fenwick; rizaSorgu sen / kalabalik (travma+1) / bekle → delil
  [rizaHikaye] ya da sopa) → kemal (pusula; kemalSecim aradi [aramaSozu] / gorev / sus) → kemal_son (kemalSonu yolcu,
  sus ise suleymanBag >= 2 gerekir, yoksa tereddut) → pendle21 (atkı [nerminCevdet]; nerminYemin'e uyan seçenek nerminBag +1;
  pendleSonu gazete/mahkeme ya da kacti_*) → kalkis (efekt vapur_duduk; Eleni ve cemilRapor; Ayva) → son.
- Yirmi ikinci bölüm "Üç Akşam" (src/hikaye/bolum22.js): 22 Kasım 1922 - 4 Şubat 1923 Lozan (konferans arka plan; gerçek
  kişiler ve heyetler konuşturulmaz; "kayıp mallar alt komisyonu" kurgu). Pendle'in dilekçesi (dilekce): Kızılhaç'ın kırk
  sandığı için tazminat; avukat Klara Rainer; masrafları Banque Vollmer. Tek mekân otel22 (ortam_lozan_otel); AKSAM_SAYISI 3,
  sayaç aksam: her akşam bir nesne → sahne → Devam (aksam +1). kutuphane → klara22 (klaraTanisti ya da ikinci ziyaret →
  sahte_manifest, klaraYardim), iskele → kemal22 (ortam_gol; kemalSonu yolcu ya da ikinci ziyaret → kemal_ifadesi; cocukKarar
  aile ise Rina'nın çizimi), kizilhac → eleni22 (kizilhac_fisi; cemilRapor'a göre Cemil'in mektubu), basin → basin22
  (basinYardim yalnız pendleSonu gazete/kacti_gazete). kanitSayisi(d) dışa açık. Olaylar: aksam>=1 riza22 (rizaSorgu sopa →
  kal/emekli, kalabalik → baris/kirgin, diğer → devir/tasi; rizaSon22), aksam>=2 neslihan22 (pasaport; neslihanAd baba/iki/
  kendi; cocukKarar yanina ise Ayva'nın adı Zehra), aksam>=3 komisyon (efekt tokmak; tazminatSonu red (>=2) / askida (1) /
  inceleme) → koridor (Klara: masraflar Banque Vollmer, vollmerIpucu) → son_lozan → son.
- Yirmi üçüncü bölüm "Sofra" (src/hikaye/bolum23.js): 23-24 Nisan 1923 İstanbul, Süleyman'ın kayıkhanesi. Delil/çıkarım yok.
  Açılış feragatname delili (Vollmer: Neslihan Rivière mirasından vazgeçsin; yoksa kırmızı sayfadaki "usta İ." gazeteye).
  Mekân sofra23 (ortam_sofra); SOFRA_HAKKI 3, sayaç sofraKonusma (konus(kim, ek) yardımcı; konustu_<kim>). Kişiler baba23
  (babaItiraf / ilk kalay anısı travma -1), gulce23 (gulceDamga yalnız gulceYakin / gulceGuven +1; Tevfik haberi),
  kemal23 (kemalBurada: kemalSonu yolcu ya da kemal_ifadesi; kemalYardim / kemalKalir), riza23 (rizaSon22 kirgin değilse;
  rizaYardim emekli değilse / rizaBag +1), neslihan23, nermin23. Olay sabah23 → gece23 → vollmer23: vollmerSonu itiraf
  [babaItiraf] / damga [gulceDamga] / kurye [kemalYardim + rizaYardim] / imza (her zaman; travma +1) → vollmer23_son → son23.
- Yirmi dördüncü bölüm "Baston" (src/hikaye/bolum24.js): 6-29 Ekim 1923 İstanbul (İtilaf çekilişi, bayram, cumhuriyet ilanı
  arka plan). Gubler (14., 16. bölüm) Ohannes'in hanından Rivière'in mektubunu çalar. Yeni oynanış: kulakla takip; sahnelerde
  efekt 'baston' (demir uçlu baston). takip1 (yokuş aşağı doğru; cocukKarar yanina ise Zehra ipucu verir) → takip2 (köpek
  havlayan Bankalar Caddesi doğru) → takip3 (bando davulu; travma >= 2 ise ilkNefes 'say' (1. bölüm) "Nefesini say" kayıpsız,
  "Dişlerini sık" kayip +1) → takip3_yon (Kamondo merdivenleri doğru; saat çeyreği çalar) → takip4: takipSonu yakalandi
  (kayip < KAYIP_SINIRI 2) / kemal (kemalKalir; kayığıyla vapuru durdurur) / riza (rizaSon22 emekli/kirgin değilse) / kacti
  → rihtim24 → gubler24 (gublerSonu teslim/haberci; Vollmer 29 Ekim'de defterin aslını satacak) → mektup24 (mektupKarar
  baba/sakla/deniz; neslihanAd metni) → son24 (babaItiraf ise babaYaninda seçimi → son24_baba) → kapanis24 → son.
  Yanlış yön seçenekleri yon(etiket, dogruMu, sonra) yardımcısı. Ekran: sahne efekt'i dize ya da dizi olabilir
  (Oyun.js [].concat; önceden dize çökme yapardı). testler/sesler.test.js bütün ortam/efekt adlarını efektler.js'te arar.
- Yirmi beşinci bölüm "Kırmızı Sayfalar" (src/hikaye/bolum25.js; dördüncü kitabın sonu): 30 Kasım - 1 Aralık 1923 Zürih.
  Vollmer kuruluş defterini kapalı mezatta satıyor (alıcılar adsız temsilciler). acilis → onizleme (Cemil kırmızı sayfada
  Kasım 1912, Binbaşı F. E. = Fikri Efendi'ye ödeme: "kaza" emri satın alınmış; cemilDefter teselli/durust/sessiz) →
  onizleme_son (47. sayfa kesilmiş; sayfa47) → mekân mezat25 (ortam_mezat): KARTLAR (mektup [mektupKarar sakla/baba], gubler
  [gublerSonu teslim], kurye [vollmerSonu kurye], damga [vollmerSonu damga, 2], klara [klaraYardim, 2], negatif [defter14
  kopya], hisse [hisseKarar genelkurul]) nesne olarak; her biri itiraz +değer, tur +1 → kart_sahne (efekt tokmak; sonKart);
  "Bu turda bekle" tur +1. TUR_SAYISI 3; olay tokmak (tur >= 3) → tokmak25: mezatSonu durdu (itiraz >= ITIRAZ_ESIGI 3) /
  satildi → mahkeme25: defterSonu arsiv (Federal Arşiv, 50 yıl) / gazete / yak / satildi → son25 (göl; cocukKarar, cemilDefter)
  → son ("Beşinci kitap: kırk yedinci sayfa").
  Beşinci kitap yok: açık iplikler cemil_defter, defter_sonu, sayfa47 (kural 4: 47. sayfayı kesen birinci bölümden beri ekili
  biri olmalı), cocuk, neslihan_ad, riza_son, kemal_kalir, travma, arif_neden, kardes_gecesi, cemil_rapor, gulce_tevfik.
- Yirmi altıncı bölüm "Zarf" (src/hikaye/bolum26.js; beşinci kitabın açılışı): 13-14 Şubat 1924 Selanik, nüfus mübadelesi
  arka plan (iki yöne giden kalabalıklar eşit anlatılır). Ekip Cemil + Neslihan (ekip_nermin/riza false). Açılış
  saltiel_telgrafi; arifGece, rizaSon22, hafizZarf satırları. Mekânlar rebeka26 (ortam_ev; saltiel26 → david_defteri),
  mahalle26 (ortam_yanik_sehir; Niğdeli Despina → hafiz_notu + kenan_mektubu), rihtim26 (ortam_mubadele; eski_daire →
  cemil26: cemilSelanik gir/bak/soz; emine [zarf_yeri çıkarımıyla]: ad bulmacası, yanlış ad emineSuphe +1, SUPHE_SINIRI26 2;
  doğru: "Kalaycı İsmail Usta'nın kızı" ya da Neslihan kendisi (neslihanAd'a göre; neslihanAdSoyledi) → zarf_teslim:
  zarfAcan neslihan/arif → zarf_icerik (47. sayfanın üst yarısı: 17 ad + şehir, F. E.; Rivière: alt yarıyı 1918 yazında
  sahibine geri verdim; davidNotu sakla ise davidItiraf) → zarf_son. Çıkarımlar zarf_yeri (telgraf + hafiz_notu),
  fikri_yasiyor (david_defteri + kenan_mektubu). Olay kenan (zarf + fikri_yasiyor + zarfAcan) → kenan26: kenanSonu
  goster/uyar/sakla → vapur26 (efekt vapur_duduk) → son. Fikri: Moda'da köşk, 62 yaşında, gözleri görmüyor.
- Yirmi yedinci bölüm "Moda" (src/hikaye/bolum27.js): 8-9 Mart 1924 İstanbul. Kalıbı kırar: kör binbaşının sorgusu.
  Mekânlar kayikhane27 (suleyman27 → kayikHazir27; neslihan27 → neslihan_yol: neslihanYol yalniz/birlikte/bekle; kemal27
  [kemalKalir], riza27 [rizaSon22 kirgin değilse], cemil27; kayik_bin → kayik27 → moda27: kenanSonu'na göre giriş
  (goster kenanIceride; uyar giris27 riza/kemal/cemil; sakla yabanciGeldi); kirgin ise Rıza bahçede döner, rizaDondu),
  kosk27 (ortam_kosk_ic; masa27 → napoli_zarfi; fikri: okundu_liste +1, okundu_david +1, okundu_kenan +1, Cemil →
  cemil_soru27 sahnesi (cemilDefter'e göre; cemilSelanik soz/gir +2, değilse +1); fikriCatlak, CATLAK_ESIGI 3 → itiraf
  tam/kismi → fikri_itirafi). Çıkarım satan (fikri_itirafi + napoli_zarfi: alt yarıyı imzalayan Ferrante, Napoli, Via
  Marina 14; tam ise Dante cildi, Cehennem 33) → olay karar → fikri_karar: fikriKarar savci / kenan [kenanIceride] / birak
  (travma+1) → fikri_son → son.
- Yirmi sekizinci bölüm "Cehennem, Otuz Üç" (src/hikaye/bolum28.js): 22-24 Nisan 1924 Napoli (seçim dönemi arka plan).
  Ekip Rıza + Neslihan (neslihanYol yalniz değilse) + Kemal (kemalKalir). Mekânlar liman28 (ortam_napoli; gennaro →
  gennaro_ifadesi; riza28 → riza_korku: rizaKorku fark [rizaHikaye]/yanında/sus; neslihan28, kemal28), via_marina
  (ferrante_kapisi → pazarlik28 → ferrante_teklifi; arka_merdiven [makbuz çıkarımı] → gece28: fikriItiraf tam ise yalnız
  Dante, kismi ise Petrarca/Boccaccio da (alarm28 +1, ALARM_SINIRI28 2) → gece28_bulundu: alt_yari + makbuz_defteri).
  Çıkarım makbuz (gennaro_ifadesi + ferrante_teklifi). Olay bruno (iki delil) → bruno28: brunoSonu riza / kemal
  [kemalKalir] / kavga (travma+1) → ferrante28 (şafak, Santa Lucia): ferranteKarar cenevre (klaraYardim ya da rainerSonu
  serbest ise Klara) / polis / birak → ferrante28_son → son. Yeni ses ortam_napoli.
- Yirmi dokuzuncu bölüm "Melek" (src/hikaye/bolum29.js): 3-4 Mayıs 1924 Marsilya. Neslihan'ın bölümü; kalıbı kırar: tek bir
  konuşma. Ekip Rıza (kahvede) + Neslihan. Mekânlar liman29 (ortam_napoli; telgrafhane29 → gulce_telgrafi; neslihan29 →
  neslihan_hazir: neslihanTavsiye anlat/dinle/ben; riza29 [rizaKorku]; okula geçiş neslihanTavsiye ile), okul29
  (ortam_kosk_bahce; melek: melekGuven, GUVEN_ESIGI 2; hikâye +1 (anlat ise +2) → neslihan_hikaye düğümü [arifGece kardes,
  neslihanAd]; Florina +1 (dinle ise +2); liste -1; "Bugünlük" +1; güvenliyse Ferrante → melek_tanikligi, melekKonustu).
  Çıkarım anne_yasiyor (makbuz_defteri + gulce_telgrafi: Fikri'nin "tifo" yalanı; anne Tekirdağ'da). Olay karar
  (konuşma sırasında da tetiklenir) → karar29: melekKarar anne / zarf / sus → melek_son (ferranteKarar cenevre + güven +
  tanıklık ise melekTanik; davidItiraf false ise Arif Saltiel'in kâğıdını verir → 'sonra') → son.
- Otuzuncu bölüm "Tanıklar" (src/hikaye/bolum30.js): 16-19 Haziran 1924 Cenevre, Milletler Cemiyeti'nin kadın ticareti
  komitesi (oturum ve üyeler kurgu). Kalıbı kırar: bekleme ve ikna. Tek mekân otel30 (ortam_lozan_otel); ikna sayacı,
  IKNA_ESIGI 5; açılışta sayfa (+1), makbuz (+1), fikriKarar savci (+1, fikri_ifadesi). Kişiler neslihan30 → neslihan_tanik
  (neslihanTanik evet +2 / hayir / "ben söyleyemem": neslihanBag >= 3 ise evet), cemil30 → cemil_tanik (cemilTanik +1;
  cemilDefter durust ise reddedemezsin), melek30 [melekTanik] (melekGeldi +2), kenan30 [fikriKarar kenan] (kenanTanik +2),
  nermin30 (nerminYazdi +1 / false), klara30 [klaraYardim ya da rainerSonu serbest], riza30. Olay bruno30 (Ferrante serbest +
  melekGeldi): riza / tasindi [Klara] / konustu (brunoBilgi: Buenos Aires). oturuma_git (neslihanTanik varsa) → olay oturum →
  oturum30 (efekt tokmak) → kurulSonu30 ad (ikna >= 5) / genel → oturum30_son → son.
- Otuz birinci bölüm "Ninni" (src/hikaye/bolum31.js): Temmuz 1924 İskenderiye. Ekip Cemil + Neslihan. Mekânlar liman31
  (ortam_iskenderiye), attarin31 (Attarin; tütüncü → komsu_ifadesi), hastane31 (ortam_hastane; merdiven31 → eleni31:
  cemilEleni birlikte/mektup/veda, eleniGoruldu). Çıkarım rahel_yeri (makbuz_defteri + komsu_ifadesi) + eleniGoruldu →
  olay rahel → rahel31 (Rahel, 1912 ambarındaki kızlardan; kendini kurtarmış, altı adı bulmuş; rahelCevap neslihan/arif)
  → rahel31_ninni (Dandini dastana: ambarda Neslihan öğretmişti, annesi Zehra Hanım'ın ninnisi; rahelKarar rahel/birlikte/
  ayri, rahel_listesi) → rahel31_son → son. Karşılıklar: kurulSonu30, neslihanTanik, melekKarar, cemilTanik,
  neslihanTavsiye, cocukKarar. Yeni iplikler rahel_karar, cemil_eleni.
- Otuz ikinci bölüm "Pusula" (src/hikaye/bolum32.js; beşinci kitabın sonu): 12-14 Eylül 1924 İstanbul. Delil/çıkarım yok;
  Süleyman Kaptan'ın son gecesi. Mekânlar kayikhane32 (suleyman32 → suleymanHazir; cemil32 [cemilEleni], kemal32 [kemalKalir
  ya da kemalSonu yolcu], neslihan32), han32 (oda32 → baba32: tanıklık babaya ulaşır, babaBildi neslihan/arif/el;
  neslihanTanik, neslihanAd, mektupKarar, babaItiraf satırları). Olay gece32 (babaBildi + suleymanHazir, kayıkhanede) →
  kayik32 (Karaköy; arifNeden'e dönüş, arifCevap onlar/kaptan/kendim; arif_neden kapandı) → kayik32_kule (kuleSecim satırı;
  pusulaKime kemal/arif/deniz) → kayik32_safak (ortam_safak32; suleymanSon ninni/anlat/sus) → kayik32_son (Süleyman ölür) →
  vasiyet32 (Karacaahmet; "Kayıkhane, aramayı bırakmayanındır"; kayikhaneVaris kemal/gulce/hepimiz; gulceTevfik satırı) →
  zarf32 (gulceZarf acti/sakla: Tevfik'in kardeşi Selim, Bursa) → kapanis32 → son ("Altıncı kitap yazılıyor").
  Seçenek etiketi durumdan bağımsız dize olmalı: iki farklı etiket gerekiyorsa iki seçenek + kosul.
- DERİNLEŞTİRME KARARI (17 Kasım, Murat: "Derinleştir"): yeni bölüm yazmaya ara; önce var olan bölümler derinleşir.
  Plan ve yapılanlar belgeler/hikaye-plani.md "Derinleştirme" bölümünde. 1. adım: arifNeden (1. bölüm gece_konusma →
  6. bölüm arifNedenSatiri, 8. bölüm tahliye), haticeSozu (1. bölüm mektup → 2. cenaze → 17. hatice17), Pendle tohumu
  (1. bölüm manifest → 20. tarife), Süleyman'ın oğlu Kemal (1897, Nevres; sıradaki: Arethusa'nın kaptanı).
  2. adım: 9. bölüm kardes_gecesi (Neslihan: "Sen beni aradın mı abi?"; kardesGecesi durust/yalan/sessiz → 16. bölüm
  mektup_baba), Pendle'in gemileri Santa Lucia (3), Aurora (11), Columbia (12), 15. bölümde Pendle'le yüzleşmede hatırlanır.
  3. adım: 18. bölüm rapor18 (cemilRapor dogru/sitma/kendi, cemilYuk → esir_degisimi, 20. polatli_son), 17. bölüm
  ilgaz_ates → ilgaz_itiraf (kardesGecesi yalan/sessiz ise sonra_durust).
  4. adım: 19. bölüm Rıza'nın Yakup hikâyesi (riza yakup düğümü, rizaHikaye → suclama/yanlis_* satırları), 20. bölüm
  Nermin'in ağabeyi Cevdet (nerminCevdet) ve Pendle yemini (nerminYemin gazete/mahkeme/birlikte; 21. bölümde kullanılacak).
  5. adım: 19. bölüm gulce19 (Gülce, Tevfik'in defteri, Süleyman 1913'ten beri onu korur; gulceTevfik yaz/affetme/sessiz →
  20. bölüm açılışı; aramaSozu ise Kemal Reis söylentisi, kemalSoylenti).
  6. adım (18 Kasım): 7. bölüm Hafız Efendi'nin zarfı (hafizZarf; Rivière'in mührü, üstünde "kırk yedi", gerçek adıyla
  isteyene) → 25. bölüm son25; 3. bölüm Nermin'in madalya sorusu (madalya anlat/sakla, nerminBag) → 23. bölüm nermin23;
  8. bölüm Yusuf Usta'nın sözü (yusufSoz soz/yok) → 24. bölüm açılış (babaItiraf yolunda mektubu Arif açar).
  7. adım: 5. bölüm Saltiel'in kardeşi David (saltielDavid anlat/sus; Kasım 1912 on yedi kızın yolcu listesi, mühür
  basmadı, öldürüldü) → 9. bölüm açılış (anlat ise tütünün arasında liste kopyası; davidNotu verdi/sakla) → 25. son25;
  10. bölüm Ohannes'in oğlu Aram (ohannesOgul ara/bekle; Boston 1909) → 24. bölüm açılış.
  8. adım: 2. bölüm morgda Cemil'in emri veren Binbaşı Fikri'yi anması (cemilFikri teselli/sert/sus, kural 4 için erken tohum;
  Cemil 1912'de rıhtımdan gelen kâtibin, David Saltiel'in, defterini adsız paketle ailesine yollamış) → 25. bölüm onizleme;
  5. bölüm Cemil yanındaysa Saltiel'e söyler (cemilSaltiel) → 9. bölüm açılış notu.
  9. adım: 4. bölümün açık kalan sözleri döner: Rıza'nın imam babasının sorusu (rizaBaba bekle/sor) → 19. yakup;
  kayikhaneSozu → 23. açılış (levha "Arif'in sözü"); gulceSoru → 12. namlu/imza. Tutarsızlık düzeltildi: 4. bölümde
  Nermin'in ağabeyinin adı Selim yazıyordu, Cevdet oldu (Selim Tevfik'in kardeşi); 20. cevdet nerminAgabey'e göre.
  10. adım: hiç okunmayan bayraklar tarandı (başka bölümde '<bayrak>' geçmeyenler); karşılık verilenler: mezarSozu →
  10. safak10 (Gureba Mezarlığı, delormeSonu'na göre), yarimCumle → 6. hafiz anlat, halimKarar → 19. yakup_son,
  babaAffetti → 23. baba23.
  11. adım: gulceYalan → 23. gulce23 (hakkı harcamayan yan seçenek, gulceYalanAnildi); listeKarar → 17. riza ilk ve
  20. nermin ilk (uyar: çırak Hilmi / yak: Necati Bey'in boş sandalyesi, Malta); rizaYarali → 17. riza ilk.
  12. adım: yaliSecim → 19. gulce19 (Gülce yalıdaki geceyi anar; morinGuven fransizBag ile zaten okunuyor);
  25. bölüme gece25 → gece25_son eklendi (son25 → gece25; travma, madalya, ilkNefes 'say' seçeneği; arifGece
  nefes/kardes/yalniz, travma -1; bolumBitti artık gece25 seçeneklerinde). Yeni açık iplik arif_gece.
  testler/derinlik.test.js iplikleri denetler.
- İPLİK KAYDI: src/hikaye/iplikler.js (IPLIKLER: bayrak, ekildi, karsiliklar, gelecek, durum). testler/iplikler.test.js
  bayrağın ekildiği bölümde yazıldığını, karşılık bölümlerinde '<bayrak>' olarak okunduğunu denetler. Yeni iplik ekleyince,
  bir ipliğe karşılık yazınca ya da kapatınca kaydı güncelle.
- BÖLÜM YAZMA KURALLARI (17 Kasım, Murat: "İlerki bölümlerde derinleştirme yapılacak, ona göre kurgula her şeyi"):
  1. Yazmadan önce IPLIKLER'deki açık ipliklere bak; her bölüm en az iki açık ipliğe sahneyle karşılık verir (yalnız bir
     cümle değil: seçimli bir an).
  2. Her bölüm en az bir yeni uzun iplik eker (bayrak + IPLIKLER kaydı + gelecek planı).
  3. Her bölümde ekipten biriyle kişisel bir sahne (geçmiş, korku, ilişki); konuşmalarda ikinci, üçüncü düğümler.
  4. Kötü sonradan çıkarılmaz: bölümün asıl karşıtı en az iki bölüm önce ekilmiş olmalı.
  5. Duygusal anlar seçimle oynanır (söyle / sakla / sus / ver); sonuç bir sonraki bölümlerde geri döner.
  6. Kalıbı kır: her bölüm 3-4 delil + 2 çıkarım + karar olmak zorunda değil; yolculuk, sorgu, bekleme, konuşma bölümleri de olur.
  7. Metin paragraflarında koşullu boş dize kullanılırsa diziyi .filter(Boolean) ile bitir.
  8. Testler: bölüm testi + derinlik.test.js'e geri dönen satırların testi + iplikler.test.js kaydı.
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
- Testler: `bun test testler/` (bolum1-25.test.js bölümleri farklı kararlarla baştan sona oynar; 3'te şüphe yolu da).
- Akış: uygula → testler → bun build → CLAUDE.md/README → commit → git pull --rebase → push → yayın (yukarıda) → SUCCESS'i bekle
  → Türkçe rapor (Expo Go bağlantısı, yenilikler, denenmemiş olanlar dürüstçe).
