# 00 — YENİ GÜNCELLEME PAKETİ: OKUMA SIRASI VE GELİŞTİRİCİ YAPAY ZEKÂ TALİMATLARI

Bu klasör, mevcut bilim-kurgu/keşif oyununun ana omurgasını bozmadan oyuna **Stardew Valley + Trade Island** ruhunu, 16 yaşayan yerleşimciyi, 40 katlı madeni, kıyı koruluğunu, 50 hayvanlık genom melezleme sistemini ve 3 katmanlı özgür görev ağını entegre eden **tam tasarım paketidir**.

---

## 1. GELİŞTİRİCİ YAPAY ZEKÂYA ZORUNLU ENTEGRASYON TALİMATLARI

### 1.1. Mevcut Sistemlere Saygı ve Mantıklı Yerleştirme
- **Dokunulmayacak Çekirdekler:** Mevcut 25 sanayi/uzay binası (`Bina ve araçlar.txt`), `görevler.txt` ana hikâyesi (8 Yerel Operasyon, Aşama 1–4, Tonoflenya, 20 Dış Gezegen), evrensel savaş modülleri, dinamik yakıt ve 5 uzay gemisi/kara aracı kuralları **aynen korunur**.
- **Aralara Serpiştirme:** `Paket 7`'deki `YER` (Yerleşim) ve `YAN` (Sosyal/Karakter) görevlerini mevcut ana görevlerin aralarına, mantıklı sıralara ve ön şartlara göre yerleştir; `ANA-01..20` satırlarını yeni ana görev yerine mevcut görev akışının köprü/çapa noktaları olarak kullan.
- **Sıfır Kilitlenme (Zero-Deadlock):** Ana hikâye ilerlerken koloni işleri durmaz; koloni/sosyal işler ertelenince ana hikâye kilitlenmez (`Paket 7` ve `Paket 16`).

### 1.2. Karakter Diyalogları ve Hikâyeleri Derinleştirme Kuralı
- `Paket 8`, `8A`, `8B`, `8C` ve `Paket 9` içinde özet hâlinde verilen her karakterin **`K1–K10` kademe sahnelerini, günlük sohbetlerini ve ikili/üçlü arabuluculuk olaylarını** kodlarken tek satırlık kuru metinler yazma.
- **2 – 4 Paragraf Kuralı:** Her önemli hikâye sahnesini, anı paylaşımını ve ikili yüzleşmeyi **duruma uygun olarak 2 ile 4 paragraf arasında** edebi, duygusal, karakterin düşünce yapısını (Gelenekçi, Pragmatik, Bilimsel, Toplulukçu, Stratejik) hissettiren ve TalkBack/VoiceOver ile akıcı dinlenen diyaloglara dönüştür.

### 1.3. Ses Üretimi, Drive Kontrolü, ElevenLabs ve Bina Dış Sesleri
- **Ses Kaynağı Önceliği:** Ses efektleri ve karakter seslendirmeleri için önce mevcut **Google Drive ses klasörünü** (ve proje içi yerel ses varlıklarını) kontrol et; eksik kalan imza cümleleri (`her yerleşimci için 3 kısa imza cümlesi`) ve yeni ortam/efekt seslerini **doğrudan ElevenLabs üzerinden üret**.
- **Bina Dış Döngüsel Sesleri (Exterior Ambient Loops):** Oyuncu binaların içine **girmeden önce**, koloni meydanında/sokaklarında yürürken de binaların dışından gelen **yumuşak, boğuk/filtrelenmiş döngüsel (loop) ortam sesleri** ekle:
  - *Aşhane önünden geçerken:* Boğuk taş fırın çıtırtısı ve tencere sesi.
  - *Dünya Atölyesi önünden geçerken:* Uzaktan gelen ritmik çekiç ve rende sesi.
  - *Taverna önünden geçerken:* Kapı ardından sızan sıcak akustik müzik ve sohbet uğultusu.
  - *Axelum Tapınağı önünden geçerken:* Hafif rezonanslı kubbe çanı uğultusu.
  - *Termal Hamam önünden geçerken:* Yumuşak su ve buhar sesi.
  - *Hayvan Barınağı önünden geçerken:* Uzaktan gelen hafif hayvan sesleri (açılan türlere göre).
  - *Ortak Okul önünden geçerken:* Gündüzleri hafif ders zili ve çocuk mırıltısı.
- **Festival Etkinliği Ambiyans Kuralı (`Paket 3A`):** Paketin içindeki 6 adet festival `.mp3` dosyası, ilgili festival aktif olduğu sürece **ana gezegen haritasında (bina içleri ve girilen özel yerler hariç)** mevcut dış ambiyansın yerini **etkinlik bitene kadar döngüsel (loop) olarak** alır.

### 1.4. Sistem Bütünlüğü ve Kenar Durum Kuralları (Tüm Açıkları Kapatan Kurallar)
- **Pratik Envanter + Otomatik Kuşanma (`Paket 6`):** Mevcut oyundaki ekran okuyucu dostu `Envanter` yapısı korunur (`Envanter` menüsü üstündekileri okur; `Maske`, `Fener`, `Aletler` ve `Mammoth/Çöl Tilkisi` gibi araçlar bile envanterde bulunduğu sürece girilen alanda otomatik devreye girer). Saha taşıma sınırı `25 -> 50 -> 100` birimdir; koloniye dönünce eşyalar **sınırsız `Koloni Ortak Deposu`**na geçer.
- **Maden/Kıyı Acil Kurtarma Kuralı (`Paket 13`):** Maden veya kıyıda Can/Enerji `0`'a düşerse eşya/alet kaybı olmaz; `Dr. Lyris` veya `Kaptan Marcus` seni Revir/Kamara'ya çıkarır, yalnızca o turdaki toplanan ham madenin `%15–20`'si düşer ve ertesi nöbette uyanırsın.
- **Kamara'da Uyuma vs. `Yıldız Zamanı` (`Paket 1`):** Kamara'da uyuma yalnızca koloni döngüsünü (`Tarım`, `Kuluçka`, `İlan Panosu`, `Günlük Sohbet`, `Tüccar günü`) bir sonraki güne ilerletir ve Moral/Stres yeniler; uzay seferleri ve bina inşaat süreleri suistimali önlemek için kendi gerçek zamanlayıcısında kalır.
- **Kaptan Önceliği & Doğum Günleri (`Paket 4`):** Kaptan'ın `K5+` olduğu adayı başka NPC otomatik kapmaz. Çocuklar evin/kamaranın yatak şartıyla eşin sorusu onaylanınca `14 günde` doğar; hem çocukların hem 16 yerleşimcinin `56 günlük` takvimde sabit yıllık Doğum Günleri (`2x` hediye bonusu) bulunur.

---

## 2. OKUMA VE UYGULAMA SIRASI (20 BELGE)

1. **`paket-1-yerlesimciler-ve-koloni-mekanlari.md`** — `Yerleşim` sekmesindeki 12 sosyal bina, Kaptanın Kamarası, 10/20/30 dk vardiya ve 16 yerleşimci kartı.
2. **`paket-2-ilan-panosu-ve-tuccar-gemisi.md`** — İlan Panosu, Haftalık Tüccar `Kaptan Orin` (GK / Takas Kuponu / Mal-Mal Takas + nadir `Malazar Dağı` stoğu) ve Koloni Tezgâhı.
3. **`paket-3a-takvim-ve-6-festival-sistemi.md`** — 7 günlük hafta, 4 yörünge mevsimi (`56 gün = 1 yıl`) ve oyuncu tetiklemeli 6 Festival (4 Malken + 2 Dünya).
4. **`paket-3b-koloni-arsivi-ve-hobi-mini-oyunlari.md`** — Koloni Arşivi (4 bağış seti) ve 6 sesli hobi mini oyunu.
5. **`paket-4-koloni-nesilleri-aile-ve-ekonomi-sinirlari.md`** — Evlilik özel koşulları (Yüzük/Bağ Tılsımı, diğer adayların `Can Dostu`na dönmesi), doğum, 3 evreli çocuk büyümesi ve Ticaret Adası koruma kuralları.
6. **`paket-5-gidilebilir-maden-kiyi-ve-gundelik-imalat.md`** — Yürünebilir Maden (`Kat 1–40`), İç Deniz ve Kıyı Koruluğu (`30–60 sn` yenilenme algoritması), mevcut Sera/Vaha günlük ekimleri.
7. **`paket-6-alet-edevat-ve-kara-araclari-kullanimi.md`** — 5 kişisel alet x 3 kademe, mevcut 5 kara aracının (`Çöl Tilkisi`, `Mammoth`, `Demir Kervan`, `Atmosphere-X`, `Akrep`) saha rolleri, yeraltı/kıyı düşmanları ve `Kat 10/20/30` + Kıyı karakolları.
8. **`paket-7-uc-katmanli-gorev-mimarisi-ve-ozgurluk-haritasi.md`** — 3 sekmeli görev mimarisi (`ANA`, `YER`, `YAN`), 115 bağlantılı görev, "bunu yaparsam ne olur" önizlemesi ve sıfır kilitlenme.
9. **`paket-8-karakter-etkilesim-algoritmasi-ve-10-kademe.md`** — 0–10 arası 10 kademeli (`0–1000 puan`) ilişki ölçeği, 5 düşünce yapısı (mizaç), ton seçimleri ve sosyal ağ.
10. **`paket-8a-cekirdek-5-karakter-hikaye-ve-10-kademe.md`** — İlk 5 çekirdek yerleşimcinin (`Sorya`, `Kaelon`, `Dr. Lyris`, `Zarek`, `Usta Veysel`) uzun ölçekli hikâyeleri ve bar hızları.
11. **`paket-8b-goc-ve-kurtarma-6-karakter-hikaye-ve-10-kademe.md`** — Göç/kurtarma kadrosunun (`Öğretmen Defne`, `Kaptan Marcus`, `Torvok`, `Sira-Vel`, `Tüccar Mateo`, `Julian`) uzun ölçekli hikâyeleri.
12. **`paket-8c-gezegenler-ve-tina-5-karakter-hikaye-ve-10-kademe.md`** — Gezegenlerden ve Tina'dan gelen son 5 yerleşimcinin (`Brom`, `Dr. Nerissa Tide`, `Halvar`, `Pilot Elara`, `Yapay Bilinç Tina`) hikâyeleri.
13. **`paket-9-ikili-ve-uclu-karakter-dengeleri-ve-olay-sahneleri.md`** — `-100..+100` ikili uyum, 8 çatışma çifti, 8 sinerji çifti, 4 Sosyal Ocak, 3'lü olay sahneleri ve geç gelen karakter koruması.
14. **`paket-10-kapsamli-esya-katalogu-ve-buyu-altyapi-mantigi.md`** — ~55 eşyalı tam katalog, başlangıçta hayvan yok kuralı ve `[Ham Rezonans]` + `Malazar Büyü Tozu` altyapısı.
15. **`paket-11-dinamik-istek-talep-gorevleri-havuzu.md`** — Kanal 1 (İsimli Hikâye Talepleri) + Kanal 2 (Sıradan Vatandaş İlan Panosu), 4 basamaklı dinamik ölçeklenme ve 70 şablon.
16. **`paket-12-yerlesim-binalari-uretim-istasyonlari-ve-islevleri.md`** — 12 `Yerleşim` binasının tezgâhları, saha tesisleri ve `Malazar Büyü Tozu` ile açılacak Okul/Tapınak büyü kapısı.
17. **`paket-13-maden-koru-agac-ve-balikcilik-sistem-mekanikleri.md`** — Maden kat navigasyonu/kazı vuruş sayıları, ağaç kesme vuruş/verim sayıları ve 3 noktalı sesli balıkçılık + `T1–T3` olta etkileri.
18. **`paket-14-xeno-fauna-50-hayvan-genom-ve-melezleme-sistemi.md`** — `#5 Biyoloji Kubbesi` içinde 8 ana genden rastgele olasılıklarla (`%60/%30/%10`) 50 farklı hayvan (`15 Dünya + 15 Malken + 20 Melez`) üretme sistemi.
19. **`paket-15-hayvan-uretim-hatlari-ve-ozel-rolleri.md`** — 5 Barınak Bakım Modülü (`Kovan`, `Kümes`, `Ağıl`, `Teraryum`, `Havuz`), üretim hatları ve üretim dışı 17 özel hayvan rolü (`Xeno-Köpek`, `Mırıl-Kedi`, `Yıldız Güvesi` vb.).
20. **`paket-16-ana-hikaye-ile-koloni-ekosistemi-koprusu-neden-yapilir.md`** — Oyuncunun ana uzay hikâyesi akarken bu sistemleri neden yapacağını açıklayan 5 somut taktik, ekonomik ve duygusal köprü.
