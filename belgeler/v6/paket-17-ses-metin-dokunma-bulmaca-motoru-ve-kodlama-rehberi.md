# Paket 17: Ses, Metin ve Dokunma Tabanlı Bulmaca Motoru & Geliştirici Yapay Zekâ Kodlama Rehberi

> [!IMPORTANT]
> **Zorunlu Ses Üretimi ve ElevenLabs Entegrasyon Kuralı:**
> - Bu proje ses, metin ve dokunma tabanlı bir oyun olduğundan; oyuna ses aktarımı, bulmaca eşleme sesleri, büyü geri bildirimleri ve `3D` ortam ambiyansları esnasında **kaliteden kesinlikle kaçınılmayacaktır**.
> - İlgili tüm mekânlar, durumlar, karakter replikleri ve bulmaca etkileşimleri için **ses efektleri üretimi zorunludur**.
> - **Kaynak Önceliği:** Her ses ihtiyacı için **önce Drive klasöründe bulunan mevcut ses efektlerine bakılır**; uygun bir ses bulunamadığında ise en uygun olanı **ElevenLabs üzerinden yüksek kalitede farklı unsurlarla üretilerek** oyuna entegre edilir.

> [!NOTE]
> Bu dosya, oyunun 3D grafik veya fare nişan alma oyunu değil; ses, metin, dokunma (touch/swipe), titreşim (haptic) ve ekran okuyucu (`TalkBack / VoiceOver`) tabanlı bir erişilebilir RPG olduğu gerçeğine göre hazırlanmıştır.
> Geliştirici yapay zekâ, tüm bulmacaları bu dosyadaki Durum Makinesi (`State Machine`), Çoklu Büyü Kombine Matrisi, Ses/Haptic Geri Bildirim Kuralları ve Görev Bazlı Teknik Şartnameler üzerinden doğrudan kodlamalıdır. Hiçbir görev özet geçilmemiş; her bulmaca tek tek işlenmiştir.

---

## 1. Geliştirici Yapay Zekâ İçin Çekirdek Mimari

### 1.1 Veri Modeli (`PuzzleDefinition` Şeması)
Her bulmaca sahnesi geliştirici yapay zekâ tarafından aşağıdaki tek tip veri yapısıyla temsil edilmelidir:

```json
{
  "puzzleId": "ORNEK-01",
  "zoneId": "kara_gol",
  "title": "Krater İskelesi",
  "accessibility": {
    "stereoNodes": [
      { "nodeId": "direk_sol", "pan": -0.7, "distance": 0.4, "idleLoop": "hum_static_low.wav" },
      { "nodeId": "direk_orta", "pan": 0.0, "distance": 0.6, "idleLoop": "hum_static_mid.wav" },
      { "nodeId": "direk_sag", "pan": 0.7, "distance": 0.5, "idleLoop": "hum_static_high.wav" }
    ],
    "syncWindowMs": 15000
  },
  "steps": [
    {
      "stepIndex": 1,
      "targetNode": "direk_sol",
      "validCombos": [
        ["Hakikat Yankısı", "Beyaz Lumina Şişesi"],
        ["Lumina Salımı", "Zihin Arındırma"]
      ],
      "onWrongAction": {
        "focusPenalty": 5,
        "resetStep": false,
        "audioCue": "error_dull_thud.wav",
        "haptic": "double_short",
        "talkback": "Yanlış frekans; direk soğuk bir yankıyla titredi ama kilitlenmedi."
      },
      "onSuccess": {
        "audioCue": "chime_crystal_clear.wav",
        "haptic": "rising_pulse",
        "talkback": "Sol direkteki sahte fısıltı sustu; mavi bir ışık sabitlendi."
      }
    }
  ],
  "zeroDeadlockFallback": "Oyuncuda ilgili usta büyü yoksa alternatif kombinasyon veya şehir aracı kabul edilir."
}
```

### 1.2 Ses, Metin ve Dokunma Etkileşim Kuralları
1. Düğüm Odaklı Gezinti (`Node Navigation`): Oyuncu ekranda sola/sağa kaydırarak (`swipe`) veya dokunmatik listeden hedef düğümleri (`Sol Direk`, `Sıcak Valf`, `Buzul Çatlağı`) seçer. Her odaklanmada:
    3D Stereo Ses (`pan: -1.0` sol, `0.0` merkez, `+1.0` sağ) ve mesafe filtresi (`low-pass`) çalar.
    Metin + TalkBack nesnenin o anki fiziksel durumunu (`sıcak`, `donmuş`, `rezonanslı`, `çatlak`) net bildirir.
2. Erişilebilir Zaman Pencereleri (`syncWindowMs`): Çift plaka basma (`Yankı İkizi` veya `Sabit Yankı Mührü`) gibi eşzamanlı işlemlerde refleks zorlaması yapılmaz; ekran okuyucu kullanıcıları için eşzamanlı pencere en az `15.000 ms` (`15 sn`) (mühürle `60.000 ms`) olmalıdır.
3. Çoklu Kombine Motoru (`validCombos`): Her adım, mantıksal olarak geçerli en az 1–3 alternatif kombinasyonu (`[A + B]` veya `[C]` veya `[Saha Aracı]`) kabul eder. Kod tarafında `evalCombo(appliedSpells, step.validCombos)` sırasız veya sıralı (`orderMatters: true/false`) kontrol edilmelidir.
4. Sıfır Kilitlenme (`failSafe` & `Odak`): Yanlış büyü atıldığında bulmaca kalıcı bozulmaz; yalnızca `5–15 Odak` düşer ve ipucu verilir. `Odak` sıfırlanırsa oyuncu `Dinlen / Odak Topla` düğmesiyle bulmaca odasını sıfırlamadan nefes alabilir.
5. Savaş Yasağı Bayrağı (`combatMode === "universal_tech"`): Normal savaş sahnelerinde büyü menüsü kilitli/gizli (`disabled`) kalır; yalnızca `sceneType === "puzzle" || sceneType === "academy_exam" || sceneType === "quest_interaction"` olduğunda aktifleşir.

---

## 2. Akademi Sınav ve Kat Bulmacaları (Tek Tek Şartname)

### 2.1 Akademi Katları (`paket-3` & `karakter-01..18`)
1. Kat 1 (`IGN-02` — Dev Bobin Uyandırma):
   - Düğümler: `bobin_tepesi` (`pan: 0.0`), `hava_basinc_gostergesi` (`pan: -0.4`).
   - Kombine Mantığı: `["Hava Kontrolü: Yağmur", "Hava Kontrolü: Fırtına", "Yıldırım Düşürme"]` (`orderMatters: true`) VEYA `["Sarı Solis Şişesi", "Kıvılcım Dalgası"]`.
   - Ses/Haptic: Her kademede gök gürültüsü yaklaşır; başarıda dev elektrik uğultusu + uzun titreşim (`long_rumble`).
2. Kat 2 (`KAE-01..02` / `Tixie` — Oculon & Yankı Odası):
   - Düğümler: `kalkan_vericisi` (`pan: -0.5`), `iki_yanki_plakasi` (`pan: 0.5`).
   - Kombine Mantığı: `Tixie` için `["Devre Kıvılcımı", "Hakikat Yankısı"]` (VEYA `["Lumina Salımı", "Otonom Kalkan Aşırtma"]`); `Kaelis` için `["Yankı İkizi"]` (`syncWindowMs: 15000`) VEYA `["Sabit Yankı Mührü"]`.
   - Hata Tepkisi: Yankı senkronu kaçarsa iki ayrı tonda çınlama duyulur (`audioCue: "desync_ping.wav"`).
3. Kat 3 (`FOR-01..02` / `ZEV-01..02` — Metal Ocak & Ağırlık Terazisi):
   - Düğümler: `ocak_kalibi` (`pan: -0.6`), `terazi_kefesi` (`pan: 0.6`).
   - Kombine Mantığı: `Forges` için `["Kıvılcım Dalgası", "Metal Şekillendirme"]` (VEYA `["Buzul Mühür", "Taş Parçalama / Ağır Toprak Yarma"]` soğuk kırma); `Zeva` için `["Hafif Süzülme"]` VEYA `["Geçici Madde Köprüsü"]`.
4. Kat 4 (`COR-01..02` / `KEF-01` — Yasak Ayna & Mürekkepli Arşiv):
   - Düğümler: `ayna_yuzeyi` (`pan: 0.0`), `gizli_raf` (`pan: -0.7`).
   - Kombine Mantığı: Yansımayı kesmek için `["Hava Kontrolü: Yoğun Sis"]` VEYA `["Buzul Mühür", "Kıvılcım Dalgası"]` (Buhar Perdesi); mührü okumak için `["Lumina Salımı", "Hakikat Yankısı"]`.
5. Kat 5 (`LYR-01..02` / `TRE-01..02` — Sera & Sıvı Boruları):
   - Düğümler: `tuzlu_boru` (`pan: -0.5`), `kurak_sarmasik` (`pan: 0.5`).
   - Kombine Mantığı: `["Sıvı Yönlendirme", "Canlı Sarmaşık"]` (VEYA alternatif: `["Hava Kontrolü: Yağmur", "Zihin Arındırma"]` bitki yatıştırma).
6. Kat 6 (`VAL-01..02` / `MORV-01` — Altı Yıldız Akort Salonu):
   - Düğümler: `yildiz_penceresi` (`pan: 0.0`), `rektor_muhru` (`pan: 0.4`).
   - Kombine Mantığı: `["Hakikat Yankısı", "Lumina Salımı"]` VEYA `["Hava Kontrolü: Durgun", "Yankı Düğümü"]`.
7. Kat -1 / -2 (`MAE-01..02` / `SIL-01..02` — Gölge Gözcü Kuklaları):
   - Düğümler: `gozcu_kukla_1` (`pan: -0.6`), `gozcu_kukla_2` (`pan: 0.6`).
   - Kombine Mantığı: Görüş kesmek için `["Hava Kontrolü: Yoğun Sis"]` VEYA `["Buzul Mühür", "Kıvılcım Dalgası"]` VEYA `["Yankı İkizi"]` ile kuklaları ters yöne çekme.
8. Kat -3 (`JOL-01..02` / `CAE-01` — Ağır Bazalt Duvar & Yeraltı Sızıntısı):
   - Düğümler: `catlak_duvar` (`pan: 0.0`), `gecit_agzi` (`pan: -0.5`).
   - Kombine Mantığı: `["Ağır Toprak Yarma"]` VEYA `["Buzul Mühür", "Kıvılcım Dalgası"]` (termal şok); fırtına yatıştırma için `["Hava Kontrolü: Serin"]`.
9. Kat -4 (`ZEP-02..03` / `MOR-02..03` — Zaman Hücresi & Rüzgâr Halkaları):
   - Düğümler: `degisen_kapi_1..3`, `halka_1..3` (`pan: -0.8 .. +0.8` dinamik hareketli ses!).
   - Kombine Mantığı: `ZEP-02`: `["Hava Kontrolü: Yoğun Sis (0°C)", "Hava Kontrolü: Fırtına", "Yıldırım Düşürme"]`; `ZEP-03`: `["Hafif Süzülme", "Kuzey Rüzgarı Uçuşu"]`; `MOR`: `["Hakikat Yankısı", "Aether Adımı"]`.
10. Kat -5 (`KEF-03` — Karanlık Taş Muhafız):
    - Düğümler: `tas_muhafiz` (`pan: 0.0`).
    - Kombine Mantığı: `["Renkli Taş Heykel Canlandırma", "Öz Bağlama"]` VEYA `["Lumina Salımı", "Hakikat Yankısı"]`.

---

## 3. Bölge ve Subay Bulmacaları (`paket-6a`, `paket-6b`, `paket-7`)

1. Batı / `Filtra` (`FIL-01` – `FIL-06`):
   - `FIL-01..03` (Maden & Körük): `Metal Şekillendirme` + `Sıvı Yönlendirme` (soğutma) VEYA `Buzul Mühür` + `Ağır Toprak Yarma`.
   - `FIL-04` (`Loran` Dalga İstasyonu): `Sıvı Yönlendirme` + `Devre Kıvılcımı` (bobin dengeleme).
   - `FIL-05` (`Kara Göl` İlk Geçiş): `["Buzul Mühür", "Zihin Arındırma"]` VEYA `["Hava Kontrolü: Ayaz (-8°C)", "Zihin Arındırma"]`.
   - `FIL-06` (Kızılkaya Mühür Kapısı): `["Renkli Taş Heykel Canlandırma", "Metal Şekillendirme"]`.
2. Doğu / `Zorah` (`ZOR-01` – `ZOR-06`):
   - `ZOR-01..02` (Batak Kum): `["Kıvılcım Dalgası / Yıldırım", "Geçici Madde Köprüsü"]` VEYA `["Hava Kontrolü: Yağmur", "Buzul Mühür", "Geçici Madde Köprüsü"]`.
   - `ZOR-03` (Gözcü Atlatma): `["Hava Kontrolü: Yoğun Sis"]` VEYA `["Buzul Mühür", "Kıvılcım Dalgası"]`.
   - `ZOR-04` (Gömülü Dikilitaş): `["Ağır Toprak Yarma", "Beyaz Lumina Şişesi"]` VEYA `["Hava Kontrolü: Boran", "Beyaz Lumina Şişesi"]`.
   - `ZOR-05..06` (`Zeno` & `Kasım` Sırrı): `["Sarı Solis Şişesi"]` + `["Hakikat Yankısı"]` (veya diyalog sekansı).
3. Kuzey / `Zeris` & `Helgar` (`KUZ-01` – `KUZ-06`):
   - `KUZ-01` (Yüksek Kule): `["Hava Kontrolü: Fırtına", "Kuzey Rüzgarı Uçuşu"]` VEYA `["Hafif Süzülme", "Canlı Sarmaşık"]`.
   - `KUZ-02..04` (`Helgar` Kara Buz): `["Sarı Solis Şişesi", "Metal Şekillendirme"]` VEYA `["Kıvılcım Dalgası", "Ağır Toprak Yarma"]`.
   - `KUZ-05` (Kamp Dağıtma): `["Hava Kontrolü: Şiddetli Boran (-18°C)"]` VEYA `["Hava Kontrolü: Yoğun Sis", "Öz Bağlama"]`.
   - `KUZ-06` (Astral Geçit): `["Aether Adımı", "Hakikat Yankısı"]`.
4. Güney / `Fleeplee`, `Arin`, `Malazar` (`GUN-01` – `GUN-06`):
   - `GUN-01..02` (Batık Kadırga): `["Beyaz Lumina Şişesi", "Sarı Solis Şişesi (Fırlat)"]` (`orderMatters: true`: önce görünür kıl, sonra kır).
   - `GUN-03..04` (`Uçan Arin`): `["Kuzey Rüzgarı Uçuşu"]` VEYA `["Işık Köprüsü", "Canlı Sarmaşık"]`.
   - `GUN-05..06` (`Malazar Ocakları`): `["Sıvı Yönlendirme", "Hava Kontrolü: Fırtına", "Yıldırım Düşürme"]`.
5. 6 Gemi Subayı (`SUB-01` – `SUB-06`):
   - `Elyndra`: `["Lumina Salımı", "Hakikat Yankısı"]`; `Varek`: `["Metal Şekillendirme", "Buzul Mühür"]`; `Dr. Axira`: `["Sıvı Yönlendirme", "Zihin Arındırma"]`; `Zhaor`: `["Kuzey Rüzgarı Uçuşu", "Lumina Salımı"]` (veya `["Canlı Sarmaşık", "Lumina Salımı"]`); `Sinha`: `["Yankı İkizi", "Devre Kıvılcımı"]`; `Drahmir`: `["Ağır Toprak Yarma", "Öz Bağlama"]`.

---

## 4. Evrimsel Saha Bulmacaları (`paket-9` & `paket-10` — Tek Tek Şartname)

### 4.1 Su ve Akışkan Hattı (`SU-01` → `SU-03`)
 `SU-01` (`Taş Çember`):
  - Düğümler: `bent_sol` (`pan: -0.7`), `bent_orta` (`pan: 0.0`), `bent_sag` (`pan: 0.7`) — her birinde su gürlemesi `volume` ile mesafeyi verir.
  - Kombine: Her bentte `["Sıvı Yönlendirme"]` VEYA `["Buzul Mühür"]` (geçici tıkama) + `["Ağır Toprak Yarma"]` (yan kanal açma).
 `SU-02` (`Norvask` Fiyordu):
  - Düğümler: `sicak_yarik` (`pan: -0.5`), `kara_buz_duvar` (`pan: 0.3`).
  - Kombine: `["Sıvı Yönlendirme", "Sarı Solis Şişesi"]` (`SU-01` tamamsa tek şişe; değilse `2` şişe) VEYA `["Sıvı Yönlendirme", "Kıvılcım Dalgası"]` VEYA `["Solis Eritici Kapsül"]`.
  - Ses/Haptic: Buhar genleşmesinde yükselen ıslık sesi + güçlü buz kırılma darbesi (`heavy_crack`).
 `SU-03` (`Keralon` Pompa Odası):
  - Düğümler: `metan_tavan` (`pan: 0.0`), `duvar_1..2` (`pan: -0.6 / 0.6`), `su_tribunu` (`pan: 0.2`).
  - Kombine (3 Aşama):
    1. `metan_tavan`: `["Hava Kontrolü: Rüzgâr/Durgun"]` (Ateş/Kıvılcım atılırsa patlama uyarısı verir, `15 Odak` keser, sıfırlanır!).
    2. `duvar_1..2`: `["Canlı Sarmaşık"]` VEYA `["Buzul Mühür"]` (duvarı dondurarak tutma).
    3. `su_tribunu`: `["Sıvı Yönlendirme", "Yıldırım Rezonansı"]` VEYA `["Sıvı Yönlendirme", "Devre Kıvılcımı"]`.

### 4.2 Işık, Kristal ve Yankı Hattı (`ISIK-01` → `ISIK-03`)
 `ISIK-01` (`Kristal Teraslar`):
  - Düğümler: `sutun_1..4` (4 farklı nota tonu: Do–Mi–Sol–Si).
  - Kombine: Aşırı ışıklı sütunlara `["Beyaz Lumina Şişesi"]`; karşıt sütunlara `["Yankı İkizi"]` (`syncWindowMs: 15000`) VEYA `["Sabit Yankı Mührü"]`.
 `ISIK-02` (`Cam Düzlükleri` & `Ajmero`):
  - Düğümler: `ayna_levha_1..2` (`pan: -0.6 / 0.6`), `ajmero_sunak` (`pan: 0.0`).
  - Kombine: `["Sarı Solis Şişesi", "Işık Köprüsü", "Yankı Düğümü"]` VEYA `["Lumina Salımı", "Geçici Madde Köprüsü", "Hakikat Yankısı"]` (`Aether Denge Çivisi` ile süre `2x`).
 `ISIK-03` (`Mavi Hardrin: Morluk Kapısı`):
  - Düğümler: `gecit_sol`, `gecit_orta`, `gecit_sag` (yalnızca birinden berrak rüzgâr sesi gelir), `kirik_yarik`.
  - Kombine:
    1. Doğru geçit tespiti: `["Hakikat Yankısı"]` (VEYA `paket-11` Yıldız Pusulası otomatik sesli işaret verir).
    2. Geçiş: `["Yankı İkizi", "Işık Köprüsü", "Aether Adımı"]` VEYA `["Sabit Yankı Mührü", "Geçici Madde Köprüsü", "Hafif Süzülme"]`.

### 4.3 Taş, Metal ve Kütle Hattı (`TAS-01` → `TAS-03`)
 `TAS-01` (`Filtra` Eğilmiş Raylar):
  - Düğümler: `ray_1..3` (`pan: -0.7, 0.0, 0.7`).
  - Kombine: `["Metal Şekillendirme"]` VEYA `["Kıvılcım Dalgası", "Tamir Kiti"]`.
 `TAS-02` (`Safran / Doğu Kırık Vadi`):
  - Düğümler: `ust_tortu` (`pan: 0.0`), `curuf_duvar` (`pan: 0.2`).
  - Kombine: `["Ağır Toprak Yarma", "Metal Şekillendirme"]` VEYA `["Sarı Solis Şişesi", "Taş Parçalama / Ağır Toprak Yarma"]`.
 `TAS-03` (`Kahergonat` Beş Basamaklı Sunak):
  - Düğümler: `gomulu_sutun_1..2`, `bronz_disli`, `bazalt_muhafiz`.
  - Kombine: `["Ağır Toprak Yarma", "Metal Şekillendirme", "Renkli Taş Heykel Canlandırma", "Öz Bağlama"]`. (Alternatif: Eğer heykel yerine `Sabit Yankı Mührü` + `Sıvı Yönlendirme` varsa dişli yine döner.)

### 4.4 Hava, Yıldırım ve Aether Hattı (`HAVA-01` → `HAVA-03`)
 `HAVA-01` (`Gözlem Adaları`):
  - Düğümler: `bobin_1..3` (artan ritimde 3 bip sesi).
  - Kombine: `["Yıldırım Rezonansı"]` VEYA `["Devre Kıvılcımı", "Piezo Kristal"]`.
 `HAVA-02` (`İç Dune Kuşağı`):
  - Düğümler: `girdap_merkezi` (`pan: 0.0` çevresel 360° uğultu).
  - Kombine: `["Hava Kontrolü: Basınç Kubbesi"]` VEYA `["Hava Kontrolü: Durgun", "Buzul Mühür"]` (kum tabanını sertleştirme).
 `HAVA-03` (`Malazar: Hâle Bölgesi`):
  - Düğümler: `firtina_gozu`, `paratoner_1..2`, `aether_yarigi`, `hale_dugumu`.
  - Kombine: `["Hava Kontrolü: Durgun", "Yıldırım Rezonansı", "Boş Rezonans Şişesi", "Aether Adımı"]`.

---

## 5. Kara Göl, Deniz/Toz ve Sınır Bulmacaları (`paket-11`, `paket-12`, `paket-13`)

1. `KG-01` – `KG-03` (`Kara Göl`):
   - `KG-01`: Belge (`Valen/Palmi` VEYA `Usta Çakal` VEYA `Bayan Misket`) + Filtre (`Trellis-7/Axira` VEYA `Kıkırdak` şişesi) + `["Hakikat Yankısı", "Beyaz Lumina Şişesi"]` (3 direkte).
   - `KG-02`: `Corinne` haritası varsa 3 eklem anında sesli işaretlenir (yoksa `["Hakikat Yankısı"]` ile aranır) → `["Sıvı Yönlendirme", "Metal Şekillendirme"]`.
   - `KG-03`: `["Boş Rezonans Şişesi"]` (sızıntı çekme) + `["Canlı Sarmaşık", "Öz Bağlama"]` VEYA `["Ağır Toprak Yarma", "Metal Şekillendirme"]`.
2. `NER-01` – `NER-02` (`Nerya`):
   - `NER-01`: `["Geçici Madde Köprüsü", "Sıvı Yönlendirme"]` VEYA `["Metal Şekillendirme", "Aether Denge Çivisi"]`.
   - `NER-02`: `["Hafif Süzülme", "Buzul Mühür", "Öz Bağlama"]`.
3. `FEN-01` – `FEN-02` (`Fenrir`):
   - `FEN-01`: 3 şamandırada `["Hafif Süzülme"]` + `["Hakikat Yankısı", "Beyaz Lumina Şişesi"]` (VEYA `Lumina İşaret Feneri`).
   - `FEN-02`: `["Hava Kontrolü: Rüzgâr", "Geçici Madde Köprüsü", "Işık Köprüsü"]`.
4. `THA-01` – `THA-02` (`Tharal`):
   - `THA-01`: `["Canlı Sarmaşık", "Sıvı Yönlendirme"]`.
   - `THA-02`: `["Yankı İkizi", "Canlı Sarmaşık", "Öz Bağlama"]` (VEYA `Sabit Yankı Mührü` + `Canlı Sarmaşık`).
5. `GUM-01` (`Gümüş Tüy`):
   - `["Hafif Süzülme", "Lumina Salımı", "Öz Bağlama"]`.
6. `JUL-01` – `JUL-02` (`Julithan`):
   - `JUL-01`: `["Hakikat Yankısı", "Lumina Salımı", "Öz Bağlama"]`.
   - `JUL-02`: `["Metal Şekillendirme", "Yankı Düğümü"]`.
7. `ANI-01` – `ANI-02` (`Anitor / Brastion`):
   - `ANI-01`: `["Hafif Süzülme", "Yıldırım Rezonansı"]` VEYA `["Hafif Süzülme", "Sarı Solis Şişesi (Fırlat)"]`.
   - `ANI-02`: `["Sıvı Yönlendirme", "Metal Şekillendirme"]` (VEYA `["Ağır Toprak Yarma", "Metal Şekillendirme"]`).
8. `ORE-01` – `ORE-02` (`Oredan`):
   - `ORE-01`: `["Aether Adımı", "Buzul Mühür", "Ağır Toprak Yarma"]` (`orderMatters: true`).
   - `ORE-02`: `["Metal Şekillendirme", "Yankı İkizi"]` (VEYA `Sabit Yankı Mührü`).
9. `GOL-01` (`Kuzey Gölge Hattı`):
   - `["Hakikat Yankısı", "Beyaz Lumina Şişesi", "Aether Adımı"]` (`Lumina İşaret Feneri` veya `Yıldız Pusulası` varsa `Odak` maliyeti `0`!).

---

## 6. `Axira Çemberi`, Son Kuşak ve Rotalar (`paket-14`, `paket-15`, `paket-16`)

1. `AXI-01` – `AXI-02` (`Axira Çemberi`):
   - `AXI-01`: `["Lumina Salımı", "Yankı İkizi", "Aether Adımı"]` (3 karoda farklı tonlu kristal çınlama; `Sabit Yankı Mührü` alternatifi geçerli).
   - `AXI-02`: `["Metal Şekillendirme", "Öz Bağlama"]` VEYA `["Gölge Mühür Şifre Çözücü"]` (`paket-11`).
2. `KAR-01` (`Kara Şehir` 3 Kule):
   - Kule 1: `["Hakikat Yankısı"]`; Kule 2: `["Yankı İkizi", "Metal Şekillendirme"]` (VEYA `Sabit Yankı Mührü`); Kule 3: `["Buzul Mühür", "Metal Şekillendirme"]` (VEYA `Hava Kontrolü: Serin`).
3. `LAN-01` (`Uçan Arin Tapınağı`):
   - Yol A (`Keşiş Vaelor`): `["Aether Adımı", "Beyaz Lumina Şişesi", "Öz Bağlama"]`; Yol B (`Xaela/Ignador`): `["Yıldırım Rezonansı", "Tamir Kiti"]`.
4. `CAH-01` (`Su Mezarı: Cahelon` Eşiği):
   - Adım 1: `["Sıvı Yönlendirme"]` (`SU-03 + KG-03` varsa tek dokunuş); Adım 2: `["Buzul Mühür", "Hakikat Yankısı"]` (3 anı fısıltısını açar); Adım 3: `["Işık Köprüsü"]`.
5. `ROTA-01` – `ROTA-06` (Seyahat Rotaları):
   - `ROTA-01`: `["Sıvı Yönlendirme", "Canlı Sarmaşık"]`; `ROTA-02`: `["Hava Kontrolü: Rüzgâr", "Lumina İşaret Feneri"]`; `ROTA-03`: `["Geçici Madde Köprüsü", "Metal Şekillendirme"]`; `ROTA-04`: `["Solis Eritici Kapsül", "Hakikat Yankısı"]`; `ROTA-05`: `["Hafif Süzülme", "Hava Kontrolü: Basınç Kubbesi"]`; `ROTA-06`: `["Hava Kontrolü: Serin/Durgun"]` VEYA `["Sıvı Yönlendirme"]`.

---

## 7. `Paket 8` Büyük Finali — Beş Renkli Taş ve Dev Muhafız Heykelleri (Tam Kodlama Akışı)

Geliştirici yapay zekâ, [paket-8-tonoflenya-buyu-finali-dev-heykeller-ve-kapanis.md](file:///c:/Users/bahtiyar/Proje2/Buyu_YGK_Tonoflenya_Paketi/paket-8-tonoflenya-buyu-finali-dev-heykeller-ve-kapanis.md) finalini aşağıdaki 3 Fazlı Durum Makinesi olarak kodlamalıdır:

### Faz 1: `5` Dev Muhafız Heykeli (`Pan: -0.9, -0.45, 0.0, +0.45, +0.9`)
 Ön Koşul Kontrolü: Çantadaki `Renkli Taşlar` (`Mavi, Yeşil, Sarı, Kızıl, Mor`) okunur. Eksik taş varsa `Zero-Deadlock` uyarı penceresi oyuncuyu en yakın eksik taş kaynağına yönlendirir.
 Heykel 1 — Batı Su Muhafızı (`2 Mavi + 1 Yeşil`):
  - Etkinlik: `["Renkli Taş Heykel Canlandırma"]` → Heykel uyanır; su kanalı düğümüne `["Sıvı Yönlendirme"]` VEYA `["Buzul Mühür"]` uygulanır.
 Heykel 2 — Kuzey Toprak Muhafızı (`2 Kızıl + 1 Mavi`):
  - Etkinlik: `["Renkli Taş Heykel Canlandırma"]` → `["Ağır Toprak Yarma", "Metal Şekillendirme"]`. (`TAS-01..03` tamamsa bu adım tek dokunuşta çözülür.)
 Heykel 3 — Doğu Rüzgâr Muhafızı (`2 Sarı + 1 Kızıl`):
  - Etkinlik: `["Renkli Taş Heykel Canlandırma"]` → Yukarıdaki iki yüksek kola `["Kuzey Rüzgarı Uçuşu", "Yankı İkizi"]` (`syncWindowMs: 15000`) VEYA `["Canlı Sarmaşık", "Sabit Yankı Mührü"]`.
 Heykel 4 — Güney Işık Muhafızı (`2 Yeşil + 1 Mor`):
  - Etkinlik: `["Renkli Taş Heykel Canlandırma"]` → `["Işık Köprüsü", "Canlı Sarmaşık"]` (`ISIK-01..03` tamamsa yön ipucu sesli okunur).
 Heykel 5 — Merkez Aether Muhafızı (`2 Mor + 1 Sarı`):
  - Etkinlik: `["Renkli Taş Heykel Canlandırma"]` → `["Aether Adımı", "Öz Bağlama"]`.

### Faz 2: Çoklu Büyü Sınavı (`sunak_paratoner`, `karanlik_cekirdek`, `son_kapi`)
1. `sunak_paratoner`: `["Hava Kontrolü: Yağmur", "Hava Kontrolü: Fırtına", "Yıldırım Düşürme"]` (`orderMatters: true`).
2. `karanlik_cekirdek`: `["Beyaz Lumina Şişesi (Salım)", "Sarı Solis Şişesi (Fırlat)"]` (`orderMatters: true` — önce görünür kıl, sonra kır).
3. `son_kapi`: `["Hakikat Yankısı", "Zihin Arındırma"]` (`paket-10` `HAVA-03` + `paket-9` `SU-03` + `paket-11` `KG-03` tamamsa gizli "Tam Rezonans Epiloğu" bayrağı `true` olur).

### Faz 3: Siyasi Kapanış (`Paket 4` Pozisyonu)
 Seçilen pozisyon (`YGK Merkeziyetçisi` / `Bölge İttifakı` / `Bağımsız Denge`) okunur ve kapanış konuşması ile `Sonsuz Devam` serbest keşif modu açılır.
