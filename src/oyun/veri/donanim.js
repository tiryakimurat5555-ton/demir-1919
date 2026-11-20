// Gemi donanımları: dokuz montaj katmanı ve büyük uzay görevlerinin istediği ek donanımlar
// (belgeler/uzay-oyunu-tasarim-ve-senaryo.md bölüm 3 ve 5.1-5.9, bölüm 6 entegrasyon matrisi). Saf veri.
//
// Her donanım bir tesiste üretilir (tarif uretim.js'e buradan eklenir) ve kızakta gemiye takılır. katman: true ise
// dokuz montaj katmanından biridir (gemiler.js SINIF_KATMANLARI'na tabi); değilse ek donanımdır ve en az minSinif
// kademesindeki gemiye takılır.

export const DONANIMLAR = {
  // Katmanlar (burun, govde, bolme_a önceden: uretim.js)
  komuta: { ad: 'süper-işlemcili askeri karadutu analizörü', katman: true, tesis: 'komuta_merkezi', girdi: { mikrocip: 30, kablo: 20, saf_kristal: 10 }, sure: 120, tarif: 'Komuta katı: otopilot kilitleme, telemetri kaydı, dost-düşman tanıma; filoların kayıtlarını aynı anda dinler.' },
  bolme_b: { ad: 'yüksek hacimli optik kripto-bellek bankası', katman: true, tesis: 'komuta_merkezi', girdi: { saf_kristal: 30, mikrocip: 15 }, sure: 120, tarif: 'İç bölme B: bilinç aktarımlarını ve dev veri arşivlerini soğurur.' },
  makine: { ad: 'yüksek voltajlı graviton reaktörü ve soğutma', katman: true, tesis: 'reaktor_lab', girdi: { graviton_yakiti: 20, plazma_reaktoru: 1, helyum: 30 }, sure: 180, tarif: 'Makine dairesi: dış istasyonlara voltaj basar, derin uzay kalkanlarını besler.' },
  tahrik: { ad: 'kuantum rezonans sürücüsü ve iyon motoru', katman: true, tesis: 'kuantum_lab', girdi: { kseno_alasim: 30, graviton_yakiti: 10, saf_kristal: 20 }, sure: 180, tarif: 'Tahrik hattı: zaman döngülerini kırar, kara delik çekiminden kaçırır.' },
  dis_a: { ad: 'ağır hizmet tipi manyetik çekici kiriş', katman: true, tesis: 'itki_hangari', girdi: { sasi_celigi: 60, saf_kristal: 20, plazma_yakiti: 15 }, sure: 150, tarif: 'Dış donanım A: sürüklenen kırılgan kapsülleri ve kabinleri parçalamadan çeker.' },
  dis_b: { ad: 'ağır hisar savunma topları ve torpido istasyonu', katman: true, tesis: 'askeri_tersane', girdi: { zirhli_plaka: 100, plazma_reaktoru: 1, kablo: 20 }, sure: 180, tarif: 'Dış donanım B: korvetleri imha eder, amiral kalkanlarını tek salvoda deler.' },
  // Ek donanımlar
  termal_karartma: { ad: 'pasif termal karartma modülü', tesis: 'askeri_tersane', girdi: { polimer_levha: 30, helyum: 30 }, sure: 90, tarif: 'Korsan radarlarına yakalanmadan sızmayı sağlar (Gölge Armada).' },
  zaman_capasi: { ad: 'zaman çapası dengeleyicisi', tesis: 'kuantum_lab', girdi: { kseno_alasim: 20, graviton_yakiti: 10 }, sure: 150, tarif: 'Zamansal kırılmadaki yerçekimi mikro-patlamalarını sönümler (Kuantum Çöküşü).' },
  takonik_cozucu: { ad: 'çok kanallı takonik frekans çözücü', tesis: 'kuantum_lab', girdi: { mikrocip: 20, saf_kristal: 20 }, sure: 120, tarif: 'Yankılanan sinyallerin içinden gerçek koordinat imzasını ayıklar (Kuantum Çöküşü).' },
  ters_itki: { ad: 'ters itki kuantum bobinleri', tesis: 'kuantum_lab', girdi: { kseno_alasim: 30, graviton_yakiti: 20 }, sure: 180, tarif: 'Çekim kuyusunda parçalanmadan kilitlenmeyi sağlar (Kızıl Yutucu).' },
  asiri_iyon: { ad: 'aşırı yüklü iyon iticileri', tesis: 'itki_hangari', girdi: { iyon_reaktoru: 2, plazma_yakiti: 30 }, sure: 150, tarif: 'Yarığın çekimini alt edip sabit konumda tutar (Deney 07).' },
  biyo_stabilizasyon: { ad: 'biyo-stabilizasyon yaşam destek odası', tesis: 'biyo_kubbe', girdi: { kseno: 1, helyum: 30, polimer_levha: 30 }, sure: 120, tarif: 'Boyutsal radyasyona maruz kalanın yaşamını korur (Deney 07).' },
  yangin_kalkani: { ad: 'termal koruma ve yangın bastırma kalkanı', tesis: 'kriyo_atolye', girdi: { helyum: 60, polimer_levha: 30 }, sure: 120, tarif: 'Beş bin derecelik eriyen koridorlara yaklaştırır (Alevin Ruhu).' },
  kriyo_pompa: { ad: 'kriyo-plazma soğutma pompaları', tesis: 'kriyo_atolye', girdi: { helyum: 60, plazma_yakiti: 15 }, sure: 120, tarif: 'Reaktör çekirdeğine nitrojen-plazma basarak patlamayı geciktirir (Alevin Ruhu).' },
  hisar_zirhi: { ad: 'ağır hisar zırhı ve çift katmanlı deflektör kalkanı', tesis: 'askeri_tersane', girdi: { zirhli_plaka: 200, kalkan_projektoru: 1 }, sure: 240, tarif: 'Yörünge bombardımanının çapraz ateşine dayanır (Aethel-9).', minSinif: 4 },
  tahliye_ambari: { ad: 'genişletilmiş tahliye ambarı', tesis: 'askeri_tersane', girdi: { zirhli_plaka: 100, polimer_levha: 60 }, sure: 180, tarif: 'Sivil tahliye mekiklerine manyetik örtüleme sağlar (Aethel-9).', minSinif: 4 },
  jammer: { ad: 'diplomatik karartma ve jammer kalkanı', tesis: 'komuta_merkezi', girdi: { mikrocip: 30, saf_kristal: 20, kalkan_projektoru: 1 }, sure: 180, tarif: 'İki tarafın hedefleme kilitlerini bozar (Tarras Boğazı).', minSinif: 4 },
  genis_telsiz: { ad: 'geniş bantlı telsiz vericisi', tesis: 'sinyal_kulesi', girdi: { kablo: 40, saf_kristal: 20 }, sure: 120, tarif: 'Kanıtları bütün filoların açık frekansına aynı anda basar (Tarras Boğazı).' },
  graviton_surucu: { ad: 'gelişmiş graviton mancınık sürücüsü', tesis: 'yuksek_reaktor', girdi: { graviton_yakiti: 50, kseno_alasim: 50, plazma_reaktoru: 1 }, sure: 300, tarif: 'Kara deliğin kütleçekiminde gövdenin ezilmesini önler (Kızıl Yutucu).', minSinif: 5 },
  // Yerel biyomların malzemeleriyle (gezegen-gelisimi-v2 bölüm 3)
  sivi_iletken: { ad: 'sıvı metal ana enerji hattı', tesis: 'dokumhane', girdi: { sivi_metal: 2, kablo: 20 }, sure: 90, tarif: 'Ana enerji kablolarının yerine geçer, voltaj kaybını sıfırlar: yakıt tüketimi yüzde on beş azalır.', minSinif: 1 },
  optik_prizma: { ad: 'plazma camı sensör prizması', tesis: 'sinyal_kulesi', girdi: { plazma_cami: 2, saf_kristal: 10 }, sure: 90, tarif: 'Kusursuz camdan hedefleme ve teleskop prizması: fenerler yüzde otuz daha uzaktan duyulur.', minSinif: 1 },
  obsidyen_zirh: { ad: 'obsidyen yansıtıcı zırh kaplaması', tesis: 'askeri_tersane', girdi: { obsidyen: 3, zirhli_plaka: 50 }, sure: 120, tarif: 'Lazer ve enerji silahlarını yansıtan kaplama (çatışmalar için).', minSinif: 2 },
  grav_kalkani: { ad: 'gravitasyon kalkanı', tesis: 'reaktor_lab', girdi: { antigrav_tozu: 2, saf_kristal: 10 }, sure: 120, tarif: 'İniş takımlarında dikey kalkış-iniş desteği: kalkış yakıtının yarısını kurtarır.', minSinif: 1 },
  graviton_dengeleyici: { ad: 'graviton dengeleyicisi', tesis: 'kuantum_lab', girdi: { manyetik_tohum: 1, graviton_yakiti: 10 }, sure: 150, tarif: 'Monolitin tohum materyalinden: uzaydaki anomali ve kara delik çekimlerine karşı direnç.', minSinif: 1 },
  kadim_anahtar: { ad: 'kadim rezonans anahtarı', tarif: 'Mabetteki yazıtın deşifresinden çıkan antik kseno-şifre modülü; mancınığın kilidini açar (Kızıl Yutucu).', kendi: true },
};

// Entegrasyon matrisi (bölüm 6): yüzey işi → tesis → üretilen birim → açılan uzay noktası
export const MATRIS = [
  { is: 'Enkaz anteni onarımı', tesis: 'sinyal_kulesi', birim: 'burun', nokta: 'sektor15' },
  { is: 'Antik krater kazısı', tesis: 'biyo_kubbe', birim: 'bolme_a', nokta: 'moloz_kusagi' },
  { is: 'Manyetik sırtlar sondajı', tesis: 'dokumhane', birim: 'govde', nokta: 'k12' },
  { is: 'Rezonatör kalibrasyonu', tesis: 'kuantum_lab', birim: 'tahrik', nokta: 'zaman_havzasi', bayrak: 'kalibrasyon' },
  { is: 'İzotop sıkıştırma', tesis: 'itki_hangari', birim: 'dis_a', nokta: 'xerad', bayrak: 'sikistirma' },
  { is: 'Gaz bacası ısı izolasyonu', tesis: 'kriyo_atolye', birim: 'yangin_kalkani', nokta: 'yanan_gemi', bayrak: 'izolasyon' },
  { is: 'Zemin alaşım kaplaması', tesis: 'askeri_tersane', birim: 'dis_b', nokta: 'aethel9', bayrak: 'kaplama' },
  { is: 'Ağ şebekesi entegrasyonu', tesis: 'komuta_merkezi', birim: 'komuta', nokta: 'tarras', bayrak: 'ag' },
  { is: 'Kadim şifre deşifresi', tesis: 'yuksek_reaktor', birim: 'graviton_surucu', nokta: 'kizil_yutucu', bayrak: 'sifre' },
];
