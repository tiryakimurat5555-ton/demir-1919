// Aethelis-IV, Vadi-i Sukût (Merkez Çöküntü Alanı). Saf veri.
// Düzlem: x doğuya, y kuzeye metre. Yön 0 kuzey, saat yönünde artar (src/oyun/konum.js).
// Kapsülün içi aynı düzlemde ama uzakta (x 300 civarı) ayrı bir mekândır; dışarıdaki sesler kapsülün yerinden duyulur.

export const MEKANLAR = {
  vadi: {
    ad: 'Vadi-i Sukût',
    tarif: 'Kanyonun korunaklı dibi. Zemin gevşek bazalt ve kristalleşmiş silikat; rüzgâr yukarıda, kayaların üstünde uğulduyor.',
    alan: { bati: -55, dogu: 55, guney: -45, kuzey: 60 },
    ortam: 'ortam_yuzey',
    zemin: 'tas',
    dis: true,
  },
  kapsul: {
    ad: 'İniş kapsülü',
    tarif: 'Dar, sıcak bir metal oda. Fanlar vızıldıyor; gövde soğudukça çıtırdıyor.',
    alan: { bati: 300, dogu: 306, guney: 0, kuzey: 8 },
    ortam: 'ortam_kapsul',
    zemin: 'tas',
    dis: false,
    // Dışarıdaki seslerin geldiği yer: kapsülün vadideki konumu
    disariKonum: { x: 0, y: 0 },
  },
  sirtlar: {
    ad: 'Manyetik Sırtlar',
    tarif: 'Tektonik olarak canlı, dağlık bir bölge. Yerden süper ısınmış gaz fışkırıyor; hava kükürt kokuyor, pusulan şaşıyor.',
    alan: { bati: 500, dogu: 580, guney: -60, kuzey: 0 },
    ortam: 'ortam_sirtlar',
    zemin: 'tas',
    dis: true,
    zehirli: true, // kükürt gazı: maruziyet artar (dunya.js zehir)
    radarMenzili: 22, // manyetik parazit radarı kısaltır
  },
};

// Kapılar: iki yönlü geçitler. Çift dokununca öteki uca geçilir.
export const KAPILAR = {
  kapsul_kilit: {
    ad: 'Hava kilidi',
    uclar: [
      { mekan: 'vadi', x: 0, y: 3.2, yon: Math.PI, ad: 'Kapsülün hava kilidi' },
      { mekan: 'kapsul', x: 303, y: 0.8, yon: 0, ad: 'Hava kilidi' },
    ],
  },
  guney_gecit: {
    ad: 'Güney kanyon ağzı',
    uclar: [
      { mekan: 'vadi', x: 0, y: -41.5, yon: Math.PI, ad: 'Güney kanyon ağzı' },
      { mekan: 'sirtlar', x: 540, y: -1.5, yon: Math.PI, ad: 'Vadiye dönen yol' },
    ],
    // Kükürt gazı: filtre maskesi olmadan geçilmez
    kosul: (d) => !!d.bayrak.maske,
    kilitMetni: 'Kanyon ağzından kükürt kokusu yoğun geliyor; birkaç adımda gözlerin yanmaya başlıyor. Filtre maskesi olmadan geçemezsin. Hekime sor.',
    gecisMetni: ['Maskeyi takıyorsun. Kükürt kokusu filtreden süzülüp metalik bir tada dönüşüyor. Güneye, Manyetik Sırtlar\'a iniyorsun.', 'Kanyon ağzından vadiye dönüyorsun. Maskeyi çıkarıyorsun; hava temiz.'],
  },
};

// Etkileşilen noktalar. ses: konumsal motorda çalan kaynak (kosul sağlanınca).
export const NOKTALAR = {
  // --- Kapsülün içi ---
  terminal: { mekan: 'kapsul', x: 303, y: 7, ad: 'Merkez terminali', yaricap: 1.6, tarif: 'Kapsül bilgisayarının ana terminali. Koloni durumu, inşa ve kayıt buradan.' },
  dolap: { mekan: 'kapsul', x: 305.3, y: 3, ad: 'Alet dolabı', yaricap: 1.4, tarif: 'Gövdeye vidalı çelik dolap.' },
  // --- Vadi ---
  kapsul_dis: { mekan: 'vadi', x: 0, y: 0, ad: 'İniş kapsülü', yaricap: 3.5, tarif: 'Yarısı bazalta gömülmüş, hâlâ ılık kapsül. Hava kilidi kuzey yüzünde.', engel: 2.4 },
  enkaz: { mekan: 'vadi', x: -24, y: 20, ad: 'Kopan arka modül', yaricap: 3, tarif: 'İniş sırasında kopan kargo ve iletişim modülü. Acil durum feneri hâlâ bipliyor.', engel: 1.8 },
  jenerator: { mekan: 'vadi', x: 16, y: 12, ad: 'Yedek jeneratör', yaricap: 2.4, tarif: 'Kapsülle birlikte atılan, kendi paraşütüyle inmiş füzyon jeneratörü.', engel: 1.2 },
  tepe: { mekan: 'vadi', x: 4, y: 50, ad: 'Gözcü Tepesi', yaricap: 3, tarif: 'Vadinin kuzeyindeki bazalt sırt. Kanyon duvarlarının üstünü gören tek yer.' },
  // Kaynak yatakları: stok kadar toplanır
  bazalt_1: { mekan: 'vadi', x: 10, y: -12, ad: 'Bazalt yığını', yaricap: 2.2, kaynak: 'bazalt', stok: 3 },
  bazalt_2: { mekan: 'vadi', x: -12, y: -8, ad: 'Bazalt yığını', yaricap: 2.2, kaynak: 'bazalt', stok: 3 },
  bazalt_3: { mekan: 'vadi', x: 30, y: 30, ad: 'Bazalt yığını', yaricap: 2.2, kaynak: 'bazalt', stok: 3 },
  kristal_1: { mekan: 'vadi', x: -38, y: 4, ad: 'Silikat kristal kümesi', yaricap: 2.2, kaynak: 'kristal', stok: 2, ses: 'kristal' },
  kristal_2: { mekan: 'vadi', x: 36, y: -20, ad: 'Silikat kristal kümesi', yaricap: 2.2, kaynak: 'kristal', stok: 2, ses: 'kristal' },
  titanyum_1: { mekan: 'vadi', x: -19, y: 24, ad: 'Titanyum hurdası', yaricap: 2.2, kaynak: 'titanyum', stok: 2 },
  titanyum_2: { mekan: 'vadi', x: -29, y: 15, ad: 'Titanyum hurdası', yaricap: 2.2, kaynak: 'titanyum', stok: 2 },
  // Vadiden çıkışlar (sonraki görevlerde açılacak)
  bati_yol: { mekan: 'vadi', x: -53, y: 20, ad: 'Batı geçidi', yaricap: 3, tarif: 'Rüzgârın hiç girmediği dar bir yarık. Ötesi Kadim Krater ve harabeler.' },
  kuzey_yol: { mekan: 'vadi', x: 4, y: 58, ad: 'Plato yokuşu', yaricap: 3, tarif: 'Tepeden yukarı, fırtınalı Uğultulu Plato\'ya çıkan dik yol.' },
  // --- Manyetik Sırtlar ---
  baca_1: { mekan: 'sirtlar', x: 522, y: -18, ad: 'Batı gaz bacası', yaricap: 2.8, engel: 1.1, baca: true, tarif: 'Kayadaki bir yarıktan kesik kesik süper ısınmış gaz fışkırıyor.' },
  baca_2: { mekan: 'sirtlar', x: 558, y: -28, ad: 'Doğu gaz bacası', yaricap: 2.8, engel: 1.1, baca: true, tarif: 'Geniş ağızlı, gürültülü bir baca; zemin ayağının altında titriyor.' },
  baca_3: { mekan: 'sirtlar', x: 534, y: -50, ad: 'Derin gaz bacası', yaricap: 2.8, engel: 1.1, baca: true, tarif: 'Sırtın dibinde, derinden kaynayan bir baca. Buradan gelen basınç en sert olanı.' },
  bazalt_4: { mekan: 'sirtlar', x: 548, y: -10, ad: 'Bazalt yığını', yaricap: 2.2, kaynak: 'bazalt', stok: 4 },
  bazalt_5: { mekan: 'sirtlar', x: 524, y: -38, ad: 'Bazalt yığını', yaricap: 2.2, kaynak: 'bazalt', stok: 4 },
  agir_1: { mekan: 'sirtlar', x: 566, y: -46, ad: 'Ağır metal damarı', yaricap: 2.2, kaynak: 'titanyum', stok: 3 },
  agir_2: { mekan: 'sirtlar', x: 510, y: -30, ad: 'Ağır metal damarı', yaricap: 2.2, kaynak: 'titanyum', stok: 3 },
};

// Kişiler: kapsülden sağ çıkan öncüler. Adları oyun başında üretilir (durum.murettebat).
// rol: murettebat dizisindeki sıra (0 mühendis, 1 telsizci, 2 hekim)
export const KISILER = {
  muhendis: { rol: 0, mekan: 'vadi', x: 14, y: 9.5, eylem: 'jeneratörün kapağı açık, içine eğilmiş' },
  telsizci: { rol: 1, mekan: 'kapsul', x: 301, y: 3, eylem: 'ranzada, bacağı sargılı' },
  hekim: { rol: 2, mekan: 'kapsul', x: 301.5, y: 5.5, eylem: 'ilaç kutusunu sayıyor' },
};

export const BASLANGIC = { mekan: 'kapsul', x: 303, y: 3.5, yon: 0 };
