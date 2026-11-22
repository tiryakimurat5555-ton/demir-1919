// Kseno-botanik verisi (belgeler/tarim-ve-kseno-botanik-rehberi.md). Saf JavaScript.
//
// Bitkiler üç kategoride (bölüm 3): A koloni ve Eski Dünya ürünleri, B Aethelis-IV'ün yabani florası, C derin uzaydan
// gelen kseno-bitkiler. Her bitki:
//   ortam    nerede yetişir: 'teras' (jeotermal hidroponik teras), 'kubbe' (kseno-habitat bölmesi, kademe 3'ten),
//            'vaha' (saklı vahanın açık toprak parselleri). mantar hem vahada hem terasın gölgeliğinde yetişir (ortamlar).
//   dongu    olgunlaşma süresi, koloni döngüsü (tarim.js DONGU_SN)
//   su, isi  ideal su seviyesi (yüzde) ve sıcaklık (°C); sapma payı tarim.js'te
//   olgun    hasada hazır olduğunu duyuran kendi sesi (metin) ve tonu (frek, Hz; konumsal motorun çan tınısı)
//   urun     hasat ürünü adı; isleme tarifleri (aşağıda) bu ürünleri kullanır
//   kaynak   tohumu nereden gelir (bilgi metni)

export const BITKILER = {
  // --- Kategori A: Vanguard-01'in tohum kasaları ve kolonistlerin getirdikleri ---
  don_kiran: { ad: 'Don Kıran Arktik Yumrusu', kat: 'A', ortam: 'teras', dongu: 4, su: 55, isi: 10, frek: 196, urun: 'Don Kıran yumrusu', olgun: 'toprağın altından hafif bir çıtırtı, kabuğun gerilip çatlaması', kaynak: 'Kapsülden getirilen tohum kesesi ve Vanguard-01 enkazındaki kasalar.' },
  akifer: { ad: 'Akifer Buğdayı (Mavi Başak)', kat: 'A', ortam: 'teras', dongu: 3, su: 95, isi: 22, frek: 220, urun: 'akifer buğdayı', olgun: 'başakların su üstünde dalgalanırken çıkardığı metalik kuru hışırtı', kaynak: 'Kapsülden getirilen tohum kesesi ve Vanguard-01 enkazındaki kasalar.' },
  soya: { ad: 'Soya-Kazein Baklası', kat: 'A', ortam: 'teras', dongu: 5, su: 70, isi: 24, frek: 247, urun: 'soya-kazein baklası', olgun: 'bakla kılıfının gerilip hava sızdırma fısıltısı', kaynak: 'Vanguard-01 enkazındaki tohum kasaları.' },
  noro_kahve: { ad: 'Nöro-Kahve Ağacı (Siyah Çekirdek)', kat: 'A', ortam: 'teras', dongu: 6, su: 60, isi: 28, frek: 262, urun: 'nöro-kahve çekirdeği', olgun: 'çekirdeklerin kabuk içinde tıkır tıkır sallanması', kaynak: 'Vanguard-01 enkazındaki tohum kasaları.' },
  aloe: { ad: 'Tıbbi Aloe-Silika', kat: 'A', ortam: 'teras', dongu: 4, su: 40, isi: 26, frek: 294, urun: 'aloe-silika yaprağı', olgun: 'kütikül zarı gerilince vızıldayan ince bir hava tonu', kaynak: 'Vanguard-01 enkazındaki tohum kasaları.' },
  // --- Kategori B: Aethelis-IV yabani florası ---
  obsidyen_mantari: { ad: 'Kadife Obsidyen Mantarı', kat: 'B', ortam: 'vaha', ortamlar: ['vaha', 'teras'], dongu: 5, su: 75, isi: 16, frek: 165, urun: 'obsidyen mantarı', olgun: 'şapkanın kenarından dökülen sporların kum gibi pıtırtısı', kaynak: 'Biyolüminesan mantar ormanında, yarasa yuvalarının dibinde.' },
  kukurt_sarmasigi: { ad: 'Asit Süzücü Kükürt Sarmaşığı', kat: 'B', ortam: 'vaha', dongu: 3, su: 50, isi: 30, frek: 311, urun: 'kükürt sarmaşığı', olgun: 'gövdeden süzülen asidin nötrleşirken köpürme fışıltısı', kaynak: 'Saklı vahanın kalsit kayalıkları.' },
  fosforlu_liken: { ad: 'Fosforlu Damar Likeni', kat: 'B', ortam: 'vaha', dongu: 2, su: 90, isi: 18, frek: 370, urun: 'fosforlu liken', olgun: 'liken yüzeyinden damlayan suyun ritmik tıpırtısı', kaynak: 'Kadim yeraltı tünellerinin ıslak duvarları.' },
  vaha_hurmasi: { ad: 'Gece Açan Vaha Hurması', kat: 'B', ortam: 'vaha', dongu: 7, su: 65, isi: 32, frek: 233, urun: 'vaha hurması', olgun: 'meyve kılıflarının çıt sesiyle açılıp tatlı bir koku fısıltısı yayması', kaynak: 'Saklı vahanın derin toprağında.' },
  bazalt_koku: { ad: 'Bazalt Kökü Çalısı', kat: 'B', ortam: 'vaha', dongu: 6, su: 35, isi: 20, frek: 131, urun: 'bazalt kökü', olgun: 'köklerin kayayı çatlatırken derin mikro-sismik iniltisi', kaynak: 'Saklı vahanın kayalık etekleri.' },
  // --- Kategori C: derin uzaydan kurtarılan kseno-bitkiler (uzay görevlerinden) ---
  magma_korugu: { ad: 'Magma Koruğu (Pyros Çiçeği)', kat: 'C', ortam: 'kubbe', dongu: 8, su: 20, isi: 350, frek: 110, urun: 'magma koruğu', olgun: 'çiçeğin merkezinden fokurdama ve cızırtılı termal üfleme', op: 'g17', kaynak: 'Pyros-7 (G-17 Kızıl Lav Dünyası görevi).' },
  kar_lalesi: { ad: 'Kriyojenik Kar Lalesi', kat: 'C', ortam: 'kubbe', dongu: 6, su: 30, isi: -80, frek: 880, urun: 'kar lalesi', olgun: 'don zerrelerinin cam kırığı gibi tınlaması', op: 'g18', kaynak: 'Glies-9b (G-18 Kriyojenik Gezegen görevi).' },
  kaelith_celengi: { ad: 'Işın-Beslenen Kaelith Çelengi', kat: 'C', ortam: 'kubbe', dongu: 7, su: 45, isi: 20, frek: 659, urun: 'Kaelith çelengi', olgun: 'radyasyon emdikçe statik cızırtı ve tiz harmonik uğultu', op: 'kadim_mezar', kaynak: 'Kadim medeniyetin mezar gezegeni.' },
  metan_yosunu: { ad: 'Metan Süngeri Yosunu', kat: 'C', ortam: 'kubbe', dongu: 3, su: 85, isi: -20, frek: 147, urun: 'metan yosunu', olgun: 'süngerin dolunca ıslak nefes alma ve köpük patlama sesleri', op: 'g14', kaynak: 'Vaelin ana dünyası (G-14 Metan Okyanusunun Şarkıcıları görevi).' },
  prizma_dikeni: { ad: 'Silikat Prizma Dikeni', kat: 'C', ortam: 'teras', dongu: 9, su: 30, isi: 26, frek: 1047, urun: 'prizma dikeni', olgun: 'iğnelerin birbirine çarpıp rüzgâr çanı gibi tınlaması', op: 'g13', kaynak: 'Kithron dünyası (G-13 Kovandaki Fısıltı görevi).' },
  vakum_sarmasigi: { ad: 'Vakum Sarmaşığı', kat: 'C', ortam: 'kubbe', dongu: 5, su: 10, isi: -100, frek: 494, urun: 'vakum sarmaşığı', olgun: 'metalik liflerin gerilirken keman teli gibi iniltisi', op: 'moloz_kusagi', kaynak: 'Havasız Moloz Kuşağı.' },
  zaman_tozu: { ad: 'Zaman Tozu Ağacı', kat: 'C', ortam: 'kubbe', dongu: 10, su: 50, isi: 0, frek: 523, urun: 'zaman tozu meyvesi', olgun: 'havada süzülen tohumların yavaş bir saatin tiktakları gibi vuruşu', op: 'zaman_havzasi', kaynak: 'Kronos zaman anomalisi havzası.' },
  // --- Melezler (bölüm 7): kseno-biyoloji kubbesinde çaprazlanır, kubbede yetişir ---
  gunes_buz: { ad: 'Güneş-Buz Kristali', kat: 'H', ortam: 'kubbe', dongu: 8, su: 30, isi: 135, frek: 698, urun: 'güneş-buz kristali', olgun: 'sıcakla soğuğun birbirine karışırken çıkardığı çift tınlı çınlama', kaynak: 'Melez: Magma Koruğu ve Kar Lalesi.' },
  demir_kok: { ad: 'Demir-Kök Sarmaşığı', kat: 'H', ortam: 'vaha', dongu: 6, su: 45, isi: 25, frek: 175, urun: 'demir-kök teli', olgun: 'gövdedeki demir tellerin gerilip metalik vınlaması', kaynak: 'Melez: Bazalt Kökü ve Kükürt Sarmaşığı.' },
  altin_hurma: { ad: 'Altın Nöro-Hurma', kat: 'H', ortam: 'teras', dongu: 7, su: 62, isi: 30, frek: 392, urun: 'altın nöro-hurma', olgun: 'kılıfların tıkırtıyla açılıp sıcak bir mırıltı yayması', kaynak: 'Melez: Nöro-Kahve ve Vaha Hurması.' },
  zaman_yosunu: { ad: 'Zaman-Kristal Yosunu', kat: 'H', ortam: 'kubbe', dongu: 9, su: 40, isi: 13, frek: 784, urun: 'zaman-kristal yosunu', olgun: 'yavaş tiktaklara karışan cam çanı ezgisi', kaynak: 'Melez: Zaman Tozu Ağacı ve Prizma Dikeni.' },
};

export const BITKI_SIRASI = Object.keys(BITKILER);
export const KATEGORI_ADI = { A: 'Koloni ürünü', B: 'Yerel yabani flora', C: 'Kseno-bitki', H: 'Melez' };
export const ORTAM_ADI = { teras: 'jeotermal hidroponik teras', kubbe: 'kseno-habitat bölmesi', vaha: 'saklı vahanın açık toprağı' };

export function yetisirMi(bitki, ortam) {
  const b = BITKILER[bitki];
  return !!b && (b.ortamlar || [b.ortam]).includes(ortam);
}

// --- Melezleme (bölüm 7.1): iki tohum, rezonans eşleme, iki döngü kuluçka ---
export const HIBRITLER = [
  { id: 'gunes_buz', a: 'magma_korugu', b: 'kar_lalesi' },
  { id: 'demir_kok', a: 'bazalt_koku', b: 'kukurt_sarmasigi' },
  { id: 'altin_hurma', a: 'noro_kahve', b: 'vaha_hurmasi' },
  { id: 'zaman_yosunu', a: 'zaman_tozu', b: 'prizma_dikeni' },
];
export function hibritBul(a, b) {
  return HIBRITLER.find((h) => (h.a === a && h.b === b) || (h.a === b && h.b === a)) || null;
}

// --- Hasat işleme (bölüm 5 ve bölüm 3'teki her bitkinin kendi çıktısı) ---
// tesis: 'mutfak' (Koloni Mutfağı), 'revir' (Kseno-Eczane), 'dokum' (dökümhanenin biyo hattı).
// etki: tarim.js etkiUygula. Sefer erzakları kalkışta gemiye yüklenir ve 'sefer' kadar seferde sürer.
//   sefer: { anahtar: sefer sayısı }  kalkışta yüklenir (seyir, savaş, sefer kancaları anahtarı okur)
//   koloni: hemen kolonide kullanılır (moral, stres, maruziyet)
//   kalici: gemiye ya da koloniye bir kez işler
//   kaynak / itibar: satış
export const ISLEME = [
  // 5.1 Koloni mutfağı ve sefer erzakları
  { id: 'peksimet', ad: 'Yıldız Gezgini Peksimeti', tesis: 'mutfak', girdi: { don_kiran: 2, akifer: 1 }, etki: { sefer: { peksimet: 1 } }, tarif: 'Fırında taşlaşana kadar kurutulur. Sefer boyunca sentetik küp yorgunluğunu önler: uzun seferden sonra moral düşmez.' },
  { id: 'guvec', ad: 'Kadife Obsidyen Güveci', tesis: 'mutfak', girdi: { obsidyen_mantari: 1, soya: 1 }, etki: { sefer: { guvec: 1 } }, tarif: 'Jeotermal buharda yavaş pişer. Seferde mürettebat strese girmez; savaşta panik olmaz.' },
  { id: 'noro_konsantre', ad: 'Nöro-Kafein Konsantresi', tesis: 'mutfak', girdi: { noro_kahve: 2, vaha_hurmasi: 1 }, etki: { sefer: { konsantre: 1 } }, tarif: 'Yüksek basınçta damıtılır. Telsiz ve sonar subaylarının sinyal çözme gücü yüzde yirmi beş artar: fener menzili uzar.' },
  { id: 'ziyafet', ad: 'Vaha Ziyafet Rasyonu', tesis: 'mutfak', girdi: { vaha_hurmasi: 2, akifer: 1 }, etki: { sefer: { ziyafet: 1 } }, tarif: 'Ballı fermantasyon keki. Bütün mürettebata enerji: savaşta ilk iki uyarıda savunmaya bir saniye fazla vakit.' },
  { id: 'kronos_iksiri', ad: 'Kronos Bilinç İksiri', tesis: 'mutfak', girdi: { zaman_tozu: 1, fosforlu_liken: 1 }, etki: { sefer: { kronos: 1 } }, tarif: 'Karanlık oditoryumda damıtılır. Savaşta her uyarıda savunma süresi bir buçuk saniye uzar.' },
  // Bitkilerin kendi çıktıları (bölüm 3)
  { id: 'noro_infuzyon', ad: 'Nöro-Kahve İnfüzyonu', tesis: 'mutfak', girdi: { noro_kahve: 1 }, etki: { sefer: { kahve: 2 } }, tarif: 'Telsiz ve sonar subaylarının dinleme dikkati iki sefer boyunca yüzde on beş artar.' },
  { id: 'mantar_corbasi', ad: 'Koyu Aromatik Mantar Çorbası', tesis: 'mutfak', girdi: { obsidyen_mantari: 1 }, etki: { koloni: { stres: 0, moral: 3 } }, tarif: 'Mürettebatın stresini sıfırlar.' },
  { id: 'kseno_cay', ad: 'Sakinleştirici Kseno-Çay', tesis: 'mutfak', girdi: { fosforlu_liken: 1 }, etki: { koloni: { moral: 5 } }, tarif: 'Likenin özütünden demlenir; koloniye dağıtılır, moral beş artar.' },
  { id: 'serbet', ad: 'Lüks Kseno-Şerbet', tesis: 'mutfak', girdi: { vaha_hurmasi: 2 }, etki: { koloni: { moral: 100 } }, tarif: 'Koloninin moralini en üst seviyeye taşır.' },
  { id: 'hurma_sat', ad: 'Vaha hurmasını tüccarlara sat', tesis: 'mutfak', girdi: { vaha_hurmasi: 1 }, etki: { kaynak: { titanyum: 3 }, itibar: 5 }, tarif: 'Seyyar uzay tüccarları çok yüksek fiyat verir: üç titanyum.' },
  { id: 'vaelin_gidasi', ad: 'Vaelin besin jeli', tesis: 'mutfak', girdi: { metan_yosunu: 1 }, etki: { besin: { vaelin: 3 } }, tarif: 'Vaelin topluluğunun ana gıdası; üç öğün.' },
  { id: 'kithron_gidasi', ad: 'Kithron mineral tozu', tesis: 'mutfak', girdi: { prizma_dikeni: 1 }, etki: { besin: { kithron: 3 } }, tarif: 'Kithron silikat varlıklarının temel besin minerali; üç öğün.' },
  // 5.2 Revir ve kseno-tıp
  { id: 'merhem', ad: 'Doku Rejenerasyon Merhemi', tesis: 'revir', girdi: { aloe: 2, kukurt_sarmasigi: 1 }, etki: { sefer: { merhem: 1 } }, tarif: 'Savaşta yaralanan mürettebatı revirde hemen iyileştirir: her çatışmadan sonra stres yarıya iner.' },
  { id: 'yanik_merhemi', ad: 'Yanık Merhemi ve Radyasyon Yaması', tesis: 'revir', girdi: { aloe: 1 }, etki: { sefer: { merhem: 1 } }, tarif: 'Aloe-silika jelinden. Yaralı personelin tedavi süresi yarıya iner.' },
  { id: 'kriyo_igne', ad: 'Kriyojenik Şok İğnesi', tesis: 'revir', girdi: { kar_lalesi: 1, obsidyen_mantari: 1 }, etki: { sefer: { kriyo: 1 } }, tarif: 'Ölümcül yaralananları stasis uykusuna sokar: yenilgide koloniye kayıpsız dönülür, yas tutulmaz.' },
  { id: 'stasis', ad: 'Stasis Kapsülü Stabilizatörü', tesis: 'revir', girdi: { kar_lalesi: 1 }, etki: { sefer: { kriyo: 1 } }, tarif: 'Ağır yaralı mürettebatın ölümünü durdurur.' },
  { id: 'detoks', ad: 'Kseno-Radyasyon Detoksu', tesis: 'revir', girdi: { kaelith_celengi: 1, kukurt_sarmasigi: 1 }, etki: { koloni: { maruziyet: 0 } }, tarif: 'Radyasyon ve gaz zehirlenmesini temizler: maruziyet sıfırlanır.' },
  { id: 'filtre_kartusu', ad: 'Endüstriyel Asit Filtre Kartuşu', tesis: 'revir', girdi: { kukurt_sarmasigi: 1 }, etki: { koloni: { maruziyetYari: true } }, tarif: 'Sarmaşığın kabuğundan. Maskeye takılır: maruziyet yarıya iner.' },
  // 5.3 Biyo-dökümhane
  { id: 'plazma_katalizor', ad: 'Hiper-Termal Plazma Katalizörü', tesis: 'dokum', girdi: { magma_korugu: 2 }, etki: { sefer: { katalizor: 1 } }, tarif: 'Yakıt tankına katılır: o sefer yakıt yarı yarıya az harcanır.' },
  { id: 'plazma_sogutucu', ad: 'Plazma Motoru Süper-Soğutucusu', tesis: 'dokum', girdi: { magma_korugu: 1 }, etki: { sefer: { sogutucu: 3 } }, tarif: 'Gemi itiş gücü üç sefer boyunca yüzde yirmi artar.' },
  { id: 'govde_macunu', ad: 'Esnek Gövde Macunu', tesis: 'dokum', girdi: { bazalt_koku: 1, vakum_sarmasigi: 2 }, etki: { sefer: { macun: 1 } }, tarif: 'Canlı reçine: gövde yarının altına inince delikleri kendiliğinden onarır, bir kez.' },
  { id: 'fotonik_pasta', ad: 'Fotonik Odaklama Pastası', tesis: 'dokum', girdi: { prizma_dikeni: 1, fosforlu_liken: 1 }, etki: { sefer: { fotonik: 1 } }, tarif: 'Optik sensör aynalarına sürülür: fener menzili iki katı.' },
  { id: 'kalibrasyon_tozu', ad: 'Optik Kalibrasyon Tozu', tesis: 'dokum', girdi: { fosforlu_liken: 2 }, etki: { sefer: { kalibrasyon: 1 } }, tarif: 'Likenin ışıldayan tozu: sensörler kalibre, fener menzili yüzde on beş uzar.' },
  { id: 'zirh_astari', ad: 'Darbe Sönümleyici Zırh Astarı', tesis: 'dokum', girdi: { obsidyen_mantari: 2 }, etki: { kalici: { govde: 10 } }, tarif: 'Kurutulmuş şapka lifinden. Aktif geminin gövdesi kalıcı olarak on puan güçlenir.' },
  { id: 'termal_macun', ad: 'Süper Yapıştırıcı ve Termal Macun', tesis: 'dokum', girdi: { bazalt_koku: 1 }, etki: { kalici: { govde: 10 } }, tarif: 'Gövde reçinesinden; tersanede zırha işlenir: aktif geminin gövdesi on puan güçlenir.' },
  { id: 'kalkan_kristali', ad: 'Kaelith Kalkan Kristali', tesis: 'dokum', girdi: { kaelith_celengi: 1 }, etki: { sefer: { kalkan: 2 } }, tarif: 'Kalkan jeneratörünün aşırı yüklenme direnci: iki sefer boyunca savaş hasarı yüzde yirmi azalır.' },
  { id: 'optik_lens', ad: 'Prizmatik Odaklama Lensi', tesis: 'dokum', girdi: { prizma_dikeni: 2 }, etki: { sefer: { lens: 3 } }, tarif: 'Lazer silahlarının odaklama lensi: üç sefer boyunca savaş hasarı yüzde yirmi fazla.' },
  { id: 'vakum_halati', ad: 'Kopmaz Uzay Halatı ve Kargo Ağı', tesis: 'dokum', girdi: { vakum_sarmasigi: 1 }, etki: { kalici: { halat: true } }, tarif: 'Uzay yürüyüşü halatları ve gövde yalıtım keçesi: aktif geminin gövdesi beş puan güçlenir.' },
  { id: 'kronos_eliksiri', ad: 'Kronos Eliksiri', tesis: 'revir', girdi: { zaman_tozu: 1 }, etki: { sefer: { kronos: 1 } }, tarif: 'Pilotun reaksiyon hızını iki katına çıkarır: savaşta her uyarıda savunma süresi bir buçuk saniye uzar.' },
  // 7 Melezlerin ürünleri
  { id: 'super_iletken', ad: 'Süper-İletken Soğutucu Sıvı', tesis: 'dokum', girdi: { gunes_buz: 1 }, etki: { kalici: { bayrak: 'sancak_sogutucu' } }, tarif: 'Sancak Zırhlısı çekirdek reaktörünün tek soğutucusu. Depoya kondu.' },
  { id: 'demir_tel', ad: 'Saf demir teli çek', tesis: 'dokum', girdi: { demir_kok: 1 }, etki: { kaynak: { titanyum: 4 } }, tarif: 'Kazma gerektirmeden saf tel: dört birim titanyum.' },
  { id: 'altin_sat', ad: 'Altın Nöro-Hurmayı diplomatlara sat', tesis: 'mutfak', girdi: { altin_hurma: 1 }, etki: { kaynak: { titanyum: 6, kristal: 3 }, itibar: 25 }, tarif: 'Galaktik diplomatların en çok aradığı lüks ticaret metası.' },
  { id: 'koruyucu_tabaka', ad: 'Zaman-Kristal Koruyucu Tabakası', tesis: 'dokum', girdi: { zaman_yosunu: 1 }, etki: { kalici: { bayrak: 'koruyucu_tabaka' } }, tarif: 'Aşınmayı durduran kseno-tabaka; gemiye kaplanır: savaş hasarı kalıcı olarak yüzde on azalır.' },
];
export const ISLEME_TESISI = { mutfak: 'Koloni Mutfağı', revir: 'Kseno-Eczane', dokum: 'dökümhanenin biyo hattı' };

// --- Kültürel beslenme matrisi (bölüm 6) ---
// var: topluluk kolonide mi. yiyebilir: hasat ürünleri (ya da besin öğünü). yasak: ölümcül.
export const TOPLULUKLAR = {
  insan: { ad: 'İnsan kolonistler ve gaziler', var: () => true, yiyebilir: ['don_kiran', 'akifer', 'soya', 'vaha_hurmasi', 'noro_kahve'], yasak: ['kukurt_sarmasigi', 'magma_korugu'], katki: 'Fabrika ve tersanede vardiya aksamaz.' },
  kaelith: { ad: 'Kaelith halkı', var: (d) => (d.tamamlananOp || []).includes('kadim_mezar'), yiyebilir: ['kaelith_celengi', 'fosforlu_liken', 'obsidyen_mantari'], yasak: ['vaha_hurmasi'], katki: 'Toprak terraformingi hızlanır: biyosfer katmanı daha az malzemeyle teslim edilir.' },
  vaelin: { ad: 'Vaelin plankton kolonisi', var: (d) => (d.tamamlananOp || []).includes('g14'), yiyebilir: ['metan_yosunu'], besin: 'vaelin', yasak: ['akifer', 'vaha_hurmasi'], katki: 'Rafinerilerde gaz yakıt üretimi yüzde elli hızlı.' },
  kithron: { ad: 'Kithron silikat varlıkları', var: (d) => (d.tamamlananOp || []).includes('g13'), yiyebilir: ['prizma_dikeni', 'bazalt_koku'], besin: 'kithron', yasak: ['don_kiran', 'akifer', 'soya'], katki: 'Tersanede optik ve lens işleri iki kat hızlı.' },
  aethel9: { ad: 'Aethel-9 madenci aileleri', var: (d) => (d.tamamlananOp || []).includes('aethel9'), yiyebilir: ['don_kiran', 'obsidyen_mantari', 'noro_kahve'], yasak: [], katki: 'Maden temposunda grev olmaz: yataklar daha hızlı yenilenir.' },
};

// --- Seralar: genişleme kademeleri (geliştirici yönergesi bölüm 3.A) ---
// teras: hidroponik yatak sayısı, kubbe: kseno-habitat bölmesi sayısı (kademe 3'ten).
export const KADEMELER = [
  null,
  { ad: 'Başlangıç Serası', teras: 4, kubbe: 0, maliyet: {}, tarif: 'Dört ekim yatağı. Sulama ve jeotermal vana elle; gece nöbetinde teras soğur.' },
  { ad: 'Buhar Kanallı Isıtma Terası', teras: 8, kubbe: 0, maliyet: { titanyum: 6, polimer: 3, bazalt: 6 }, tarif: 'Sekiz yatak. Jeotermal buhar şebekesi ısıyı kendisi ayarlar; donma riski kalkar.' },
  { ad: 'Kseno-Habitat Biyo-Kubbesi', teras: 12, kubbe: 4, maliyet: { kseno: 3, kristal: 4, polimer: 4, titanyum: 4 }, kosul: (d) => d.koloni.binalar.includes('biyo_kubbe'), kosulMetni: 'Önce Kseno-Biyoloji Kubbesi kurulmalı.', tarif: 'On altı yatak: on iki teras ve atmosferi ayrı ayarlanan dört kseno-bölme. Derin uzay tohumları ekilebilir.' },
  { ad: 'Endüstriyel Rezonans Çiftliği', teras: 24, kubbe: 8, maliyet: { kristal: 8, izotop: 4, titanyum: 8 }, kosul: (d) => d.koloni.binalar.includes('reaktor_lab'), kosulMetni: 'Önce Graviton ve Reaktör Laboratuvarı kurulmalı.', tarif: 'Otuz iki yatak. Saf kristallerle ışık spektrumu hızlanır; hasat süreleri yüzde kırk kısalır.' },
];
// Saklı vahanın açık toprak parselleri (bölüm 2.3)
export const VAHA_PARSEL = 4;

// Kolonistlerin uzmanlıkları (yönerge 3.B)
export const ISCI_TURLERI = {
  insan: { ad: 'İnsan kolonist', var: () => true, bonus: 'Koloni ürünlerinde büyüme yüzde yirmi hızlı.' },
  kaelith: { ad: 'Kaelith botanikçisi', var: (d) => (d.tamamlananOp || []).includes('kadim_mezar'), bonus: 'Spor ve kristal bitkilerinde çift tohum; çürüme yok, tohum geri kazanımı yüzde otuz fazla.' },
  malken: { ad: 'Malken çırağı', var: (d) => !!d.bayrak.malken_ciraklari, bonus: 'Aether aşılaması: işlenen iksirler bir sefer fazla sürer.' },
};
export const SPOR_KRISTAL = ['obsidyen_mantari', 'fosforlu_liken', 'kaelith_celengi', 'prizma_dikeni'];
