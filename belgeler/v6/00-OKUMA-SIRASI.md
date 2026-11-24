# Buyu, YGK Akademi ve Tonoflenya Paketi — Okuma Sırası & Geliştirici Talimatı

> [!IMPORTANT]
> **Geliştirici Yapay Zekâ İçin Zorunlu Ses ve ElevenLabs Entegrasyon Komutu:**
> 1. Bu paket **ses, metin ve dokunma (`TalkBack / VoiceOver`) tabanlı** bir oyun için hazırlanmıştır; ses aktarımı, bulmaca eşleme sesleri, büyü tepkileri, karakter diyalogları ve `3D` mekân ambiyansları esnasında **kaliteden kesinlikle kaçınılmayacaktır**.
> 2. Paketlerde geçen **ilgili yerler, büyüler, bulmaca durumları ve ortam döngülerinin tamamı için ses efektleri üretimi zorunludur**.
> 3. **Ses Kaynağı Önceliği:** Her ses efekti ve ambiyans için **önce Drive klasöründe bulunan mevcut efektlere bakılacaktır**; orada uygun olan bir ses bulunamadığında ise uygun olanı **ElevenLabs üzerinden yüksek kalitede farklı unsurlarda üretilerek** oyuna entegrasyonu sağlanacaktır.
> 4. **Savaş Yasağı & `Zero-Deadlock`:** Büyü yalnızca YGK sınavları, Tonoflenya bulmacaları/görevleri ve zanaat için kullanılır; normal `Evrensel Savaş`ta büyü **ASLA** kullanılmaz. Hiçbir karakter/görev seçimi oyuncuyu kilitlemez.

---

## 1. Çekirdek Sistem ve Kurallar (İlk Okunacaklar)

1. [paket-1-tapinak-asa-sonrasi-buyu-sistemi-ve-ekoller.md](file:///c:/Users/bahtiyar/Proje2/Buyu_YGK_Tonoflenya_Paketi/paket-1-tapinak-asa-sonrasi-buyu-sistemi-ve-ekoller.md) — `8` temel + `8` usta büyü (`Tek Hoca = Tek Büyü`), `10` özel bulmaca tipi.
2. [paket-2-buyu-islemleri-yuzuk-asa-siseleme-ve-sinav-kurallari.md](file:///c:/Users/bahtiyar/Proje2/Buyu_YGK_Tonoflenya_Paketi/paket-2-buyu-islemleri-yuzuk-asa-siseleme-ve-sinav-kurallari.md) — `T1–T3` Malazar Asası, Odak havuzu (`0–100`), şişeleme/hava/taş kuralları, Zero-Deadlock telafi sistemi.
3. [paket-3-ygk-akademi-11-kat-10-kursu-ve-hikaye-gorevleri.md](file:///c:/Users/bahtiyar/Proje2/Buyu_YGK_Tonoflenya_Paketi/paket-3-ygk-akademi-11-kat-10-kursu-ve-hikaye-gorevleri.md) — YGK Akademi `11` kat ve `10` kürsü sınavları.
4. [paket-4-tonoflenya-hiyerarsi-ve-zincirleme-etki-haritasi.md](file:///c:/Users/bahtiyar/Proje2/Buyu_YGK_Tonoflenya_Paketi/paket-4-tonoflenya-hiyerarsi-ve-zincirleme-etki-haritasi.md) — `5` güç odağı, `3` siyasi pozisyon ve `[ZİNCİR] / [HİYERARŞİ] / [BAĞ]` sistemi.
5. [paket-5-ygk-akademi-ogretmen-ogrenci-agi-ve-gorevleri.md](file:///c:/Users/bahtiyar/Proje2/Buyu_YGK_Tonoflenya_Paketi/paket-5-ygk-akademi-ogretmen-ogrenci-agi-ve-gorevleri.md) — `3` giriş yolu, `5` öğrenci ağı ve `K0–K10` kademe sınıfları.

---

## 2. Bölgeler, Gemi Subayları ve Büyük Final

6. [paket-6a-tonoflenya-bati-ve-dogu-buyu-gorevleri-ve-10-kademe.md](file:///c:/Users/bahtiyar/Proje2/Buyu_YGK_Tonoflenya_Paketi/paket-6a-tonoflenya-bati-ve-dogu-buyu-gorevleri-ve-10-kademe.md) — Batı (`Filtra`: `Oronte`, `Cüretkâr Cüce`, `Sarah`) & Doğu (`Zorah`: `Silahşör Zeno`, `Şeyh Kasım`).
7. [paket-6b-tonoflenya-kuzey-ve-guney-buyu-gorevleri-ve-10-kademe.md](file:///c:/Users/bahtiyar/Proje2/Buyu_YGK_Tonoflenya_Paketi/paket-6b-tonoflenya-kuzey-ve-guney-buyu-gorevleri-ve-10-kademe.md) — Kuzey (`Zeris/Helgar`: `Mirelza`, `Kaelan`) & Güney (`Fleeplee/Arin/Malazar`: `Barracuda`, `Nyxara Vel'din`).
8. [paket-7-alti-seckin-ygk-subayi-hikaye-ve-10-kademe.md](file:///c:/Users/bahtiyar/Proje2/Buyu_YGK_Tonoflenya_Paketi/paket-7-alti-seckin-ygk-subayi-hikaye-ve-10-kademe.md) — `6` YGK Gemi Subayı (`Elyndra`, `Varek`, `Dr. Axira`, `Zhaor`, `Sinha`, `Drahmir Oksid`).
9. [paket-8-tonoflenya-buyu-finali-dev-heykeller-ve-kapanis.md](file:///c:/Users/bahtiyar/Proje2/Buyu_YGK_Tonoflenya_Paketi/paket-8-tonoflenya-buyu-finali-dev-heykeller-ve-kapanis.md) — `5` Dev Muhafız Heykeli ve `3` Siyasi Epilog.

---

## 3. Evrimsel Saha Görevleri, `34` Atlas Bölgesi ve Kodlama Motoru

10. [paket-9-evrimsel-saha-buyu-gorevleri-su-ve-isik.md](file:///c:/Users/bahtiyar/Proje2/Buyu_YGK_Tonoflenya_Paketi/paket-9-evrimsel-saha-buyu-gorevleri-su-ve-isik.md) — Su (`SU-01..03`) & Işık (`ISIK-01..03`) evrimsel hatları.
11. [paket-10-evrimsel-saha-buyu-gorevleri-tas-ve-hava.md](file:///c:/Users/bahtiyar/Proje2/Buyu_YGK_Tonoflenya_Paketi/paket-10-evrimsel-saha-buyu-gorevleri-tas-ve-hava.md) — Taş (`TAS-01..03`) & Hava (`HAVA-01..03`) evrimsel hatları + büyük kesişim matrisi.
12. [paket-11-kara-gol-ve-akademi-dis-saha-hazirlik-agi.md](file:///c:/Users/bahtiyar/Proje2/Buyu_YGK_Tonoflenya_Paketi/paket-11-kara-gol-ve-akademi-dis-saha-hazirlik-agi.md) — `Kara Göl` (`KG-01..03`) & Akademi'den büyü dışı saha teçhizatı.
13. [paket-12-deniz-kanal-ve-toz-kusagi-gorevleri.md](file:///c:/Users/bahtiyar/Proje2/Buyu_YGK_Tonoflenya_Paketi/paket-12-deniz-kanal-ve-toz-kusagi-gorevleri.md) — `Nerya`, `Fenrir`, `Tharal`, `Gümüş Tüy` (`NER/FEN/THA/GUM`).
14. [paket-13-kiyi-hisarlari-meclis-ve-golge-gecitleri.md](file:///c:/Users/bahtiyar/Proje2/Buyu_YGK_Tonoflenya_Paketi/paket-13-kiyi-hisarlari-meclis-ve-golge-gecitleri.md) — `Julithan`, `Anitor/Brastion`, `Oredan`, `Kuzey Gölge Hattı` (`JUL/ANI/ORE/GOL`).
15. [paket-14-rota-tehlikeleri-saha-araclari-ve-axira-cemberi.md](file:///c:/Users/bahtiyar/Proje2/Buyu_YGK_Tonoflenya_Paketi/paket-14-rota-tehlikeleri-saha-araclari-ve-axira-cemberi.md) — Saha araçları zanaatı, `ROTA-01..06` ve `Axira Çemberi` (`AXI-01..02`).
16. [paket-15-son-kusak-koprusu-kara-sehir-lanetli-gezegen-cahelon.md](file:///c:/Users/bahtiyar/Proje2/Buyu_YGK_Tonoflenya_Paketi/paket-15-son-kusak-koprusu-kara-sehir-lanetli-gezegen-cahelon.md) — `Kara Şehir` (`KAR-01`), `Arin Tapınağı / Lanetli Gezegen` (`LAN-01`), `Su Mezarı: Cahelon` (`CAH-01`).
17. [paket-16-istege-bagli-tekrarlanabilir-sehir-islemleri.md](file:///c:/Users/bahtiyar/Proje2/Buyu_YGK_Tonoflenya_Paketi/paket-16-istege-bagli-tekrarlanabilir-sehir-islemleri.md) — Bölüm `3.4` sabit noktalarında isteğe bağlı tekrarlanabilir şehir işlemleri.
18. [paket-17-ses-metin-dokunma-bulmaca-motoru-ve-kodlama-rehberi.md](file:///c:/Users/bahtiyar/Proje2/Buyu_YGK_Tonoflenya_Paketi/paket-17-ses-metin-dokunma-bulmaca-motoru-ve-kodlama-rehberi.md) — Geliştirici AI için ses/metin/dokunma (`TalkBack`) durum makinesi ve tüm bulmacaların teknik şartnamesi.

---

## 4. Karakter Dosyaları (`karakter-01` – `karakter-30`)

### 4.1 Akademi Hocaları ve Yetkilileri (`karakter-01` – `karakter-18`)
19. `karakter-01-tixie-simarik-deha-ve-oculon.md` (`Kat 2`)
20. `karakter-02-lasiraxi-jolt-sinyal-tanricasi.md` (`Kat 1–3`)
21. `karakter-03-zynae-pembe-prizma.md` (`Kat 3`)
22. `karakter-04-sirilla-sirca-goz.md` (`Kat 5–6`)
23. `karakter-05-palmi-sarayin-gozu.md` (`Kat 3–4`)
24. `karakter-06-miranda-caledor-ihtisamin-golgesi.md` (`Kat 5`)
25. `karakter-07-corinne-sircanin-bekcisi.md` (`Kat 4`)
26. `karakter-08-kefius-arateon-kidemli-arkanist.md` (`Kat 4 & -5`)
27. `karakter-09-zephyra-gogun-hiddeti.md` (`Kat -4`)
28. `karakter-10-valen-lazeria-yuksek-konsey-rektoru.md` (`Kat 6 / -4`)
29. `karakter-11-ignador-agir-plazma-egitmeni.md` (`Kat 1`)
30. `karakter-12-morwenna-karanlik-ses-bukucu.md` (`Kat -4`)
31. `karakter-13-kat-3-hocalari-forges-korvinus-ve-zeva.md` (`Kat 3`)
32. `karakter-14-kat-2-hocalari-kaelis-echo-ve-faelan.md` (`Kat 2`)
33. `karakter-15-kat-eksi-3-hocalari-jolkar-ve-caelum.md` (`Kat -3`)
34. `karakter-16-kat-5-hocalari-lyra-trellis-ve-seraphine.md` (`Kat 5`)
35. `karakter-17-kat-eksi-1-ve-2-maelis-ve-silas-vex.md` (`Kat -1/-2`)
36. `karakter-18-kat-4-ve-6-puskul-ve-morvenna-kael.md` (`Kat 4 & 6`)

### 4.2 Akademi Öğrencileri & Toplu Hediye Rehberi (`karakter-19` – `karakter-24`)
37. `karakter-19-ogrenci-veyra-k-kat-2.md`
38. `karakter-20-ogrenci-dren-kat-3.md`
39. `karakter-21-ogrenci-elian-kat-5.md`
40. `karakter-22-ogrenci-sora-9-kat-4.md`
41. `karakter-23-ogrenci-nox-kat-eksi-1-2.md`
42. `karakter-24-akademi-hediye-rehberi.md` (`karakter-01..16` `Sever/Sevmez` matrisi)

### 4.3 Tonoflenya Şehir ve Dış Bölge Karakterleri (`karakter-25` – `karakter-30`)
43. `karakter-25-sehir-xaela-neon-ilahiyatci.md` (`Flee Plee / Aether-Dock`)
44. `karakter-26-sehir-bayan-misket-uma.md` (`Malkenia 2. Halka: Uma`)
45. `karakter-27-bolge-sifir-makinist-filtra.md` (`Filtra / Kızılkaya`)
46. `karakter-28-bolge-zahra-elmas-goz-zorah.md` (`Doğu Çöl Kantonları / Zorah`)
47. `karakter-29-bolge-doktor-kikirdak-flee-plee.md` (`Flee Plee`)
48. `karakter-30-sehir-usta-cakal-veradon.md` (`Veradon Hanı`)
