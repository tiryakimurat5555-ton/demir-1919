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
  (mekân kimliğiyle eşleşir; sahnede `ortam`, `ortamOran`, `efekt` alanları), efektler sandik, ani_savas, delil, yangin; 3. bölüm döngüleri ortam_cemil_ev/pera/kulup/servis; 4. bölüm ortam_hastane/meyhane/depo, efekt silah; 5. bölüm ortam_guverte/salon/kamara/firtina, efekt vapur_duduk; 6. bölüm ortam_yanik_sehir/otel/ev; 7. bölüm ortam_kosk_bahce/kosk_ic, efektler kopek, kilise_cani; 8. bölüm ortam_tren/manastir/cezaevi/revir, efektler tren_duduk, demir_kapi; 9. bölüm ortam_viyana/kahve/mutfak, efekt tramvay; 10. bölüm ortam_kule/kayik, efekt dokum; 11. bölüm ortam_kordon/kemeralti; 12. bölüm ortam_arsiv/yali; 13. bölüm ortam_yagmur; 14. bölüm ortam_zurih/banka; 15. bölüm ortam_genelkurul, efekt tokmak; 16. bölüm ortam_baskin; 17. bölüm ortam_inebolu/kagni; 18. bölüm ortam_sahra, efekt top; 19. bölüm ortam_telgraf; 20. bölüm ortam_matbaa/istasyon;
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
  Yirmi birinci bölüm yok.
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
- Testler: `bun test testler/` (bolum1-20.test.js bölümleri farklı kararlarla baştan sona oynar; 3'te şüphe yolu da).
- Akış: uygula → testler → bun build → CLAUDE.md/README → commit → git pull --rebase → push → yayın (yukarıda) → SUCCESS'i bekle
  → Türkçe rapor (Expo Go bağlantısı, yenilikler, denenmemiş olanlar dürüstçe).
