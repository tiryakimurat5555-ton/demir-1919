// Karaköy haritası (dikey dilim). Saf veri; ekrandan ve sesten bağımsız.
// Düzlem: x doğuya, y kuzeye doğru metre. Deniz güneyde (y < 0,5), rıhtım kıyı boyunca uzanır.
// İç mekânlar binanın kendi alanını kullanır; böylece dışarıdaki sesler içeride de doğru yerden gelir.

export const SU_KENARI = 0.5;
export const SINIR = { bati: -60, dogu: 60, guney: SU_KENARI, kuzey: 42 };

// Girilmeyen binalar yalnızca engeldir. Girilen binaların kapısı ve iç mekânı vardır.
export const BINALAR = [
  { id: 'kayikhane', ad: 'Süleyman Kaptan\'ın kayıkhanesi', x1: -52, x2: -38, y1: 1, y2: 10 },
  { id: 'dukkanlar', ad: 'Dükkânlar', x1: -60, x2: -38, y1: 14, y2: 30 },
  { id: 'gumruk', ad: 'Gümrük ambarı', x1: -34, x2: -14, y1: 14, y2: 30 },
  { id: 'buro', ad: 'Liman kayıt bürosu', x1: -10, x2: 8, y1: 14, y2: 26 },
  { id: 'antrepo', ad: 'Ferrante ve Ortakları antreposu', x1: 12, x2: 24, y1: 14, y2: 28 },
  { id: 'han', ad: 'Kalafatçı Hanı', x1: 28, x2: 46, y1: 16, y2: 30 },
  { id: 'yapilar', ad: 'Yapılar', x1: 50, x2: 60, y1: 14, y2: 30 },
];

// Mekânlar: 'dis' sokak; ötekiler iç mekân. cikislar: kapılar ve merdivenler.
// Her çıkışın bir yeri (x, y) ve geçince oyuncunun düştüğü yer (varis) vardır.
export const MEKANLAR = {
  dis: {
    id: 'dis',
    ortam: 'ortam_rihtim',
    cikislar: [
      { id: 'kayikhane_kapi', ad: 'Kayıkhanenin kapısı', x: -37.5, y: 5, hedef: 'kayikhane', varis: { x: -39.5, y: 5, yon: -Math.PI / 2 } },
      { id: 'buro_kapi', ad: 'Liman kayıt bürosunun kapısı', x: -1, y: 13.5, hedef: 'buro', varis: { x: -1, y: 15.5, yon: 0 } },
      { id: 'han_kapi', ad: 'Kalafatçı Hanı\'nın kapısı', x: 37, y: 15.5, hedef: 'han', varis: { x: 37, y: 17.5, yon: 0 } },
      {
        id: 'antrepo_arka',
        ad: 'Antreponun arka kapısı',
        x: 24.6,
        y: 22,
        hedef: 'antrepo',
        varis: { x: 23, y: 22, yon: -Math.PI / 2 },
        // Akşam dokuza kadar Ferrante'nin adamları içeride sayım yapar; sonra yalnız bekçi kalır
        acik: (d) => {
          const gd = ((d.dakika % 1440) + 1440) % 1440;
          return (gd >= 21 * 60 || gd < 5 * 60) && d.bayrak.antrepoKapaliGece !== geceKimligi(d);
        },
        kilitli: 'Arka kapı kilitli. İçeriden sesler geliyor; Ferrante\'nin adamları akşam dokuza kadar sayım yapıyor.',
      },
    ],
  },
  kayikhane: {
    id: 'kayikhane',
    ad: 'Kayıkhanenin içi',
    ortam: 'ortam_kayikhane',
    alan: { x1: -52, x2: -38, y1: 1, y2: 10 },
    cikislar: [{ id: 'kayikhane_cik', ad: 'Kayıkhanenin kapısı', x: -38.5, y: 5, hedef: 'dis', varis: { x: -36, y: 5, yon: Math.PI / 2 } }],
  },
  buro: {
    id: 'buro',
    ad: 'Liman kayıt bürosu',
    ortam: 'ortam_buro',
    alan: { x1: -10, x2: 8, y1: 14, y2: 26 },
    cikislar: [{ id: 'buro_cik', ad: 'Büronun kapısı', x: -1, y: 14.5, hedef: 'dis', varis: { x: -1, y: 12, yon: Math.PI } }],
  },
  han: {
    id: 'han',
    ad: 'Kalafatçı Hanı\'nın avlusu',
    ortam: 'ortam_han',
    alan: { x1: 28, x2: 46, y1: 16, y2: 30 },
    cikislar: [
      { id: 'han_cik', ad: 'Hanın kapısı', x: 37, y: 16.5, hedef: 'dis', varis: { x: 37, y: 13.5, yon: Math.PI } },
      {
        id: 'merdiven_cik',
        ad: 'Üst kata çıkan merdiven',
        x: 44.5,
        y: 28.5,
        hedef: 'oda',
        varis: { x: 44, y: 27, yon: Math.PI },
        acik: (d) => !!d.bayrak.odaAnahtari,
        kilitli: 'Merdivenin başındaki kapı kilitli. Sabri\'nin odasının anahtarı Ohannes Usta\'da.',
      },
    ],
  },
  antrepo: {
    id: 'antrepo',
    ad: 'Ferrante\'nin antreposu, karanlık',
    ortam: 'ortam_depo',
    alan: { x1: 12, x2: 24, y1: 14, y2: 28 },
    cikislar: [{ id: 'antrepo_cik', ad: 'Arka kapı', x: 23.4, y: 22, hedef: 'dis', varis: { x: 25.6, y: 22, yon: Math.PI / 2 } }],
  },
  oda: {
    id: 'oda',
    ad: 'Sabri\'nin odası, hanın üst katında',
    ortam: 'ortam_oda',
    alan: { x1: 39, x2: 46, y1: 23, y2: 30 },
    cikislar: [{ id: 'merdiven_in', ad: 'Aşağı inen merdiven', x: 44.5, y: 29, hedef: 'han', varis: { x: 43.5, y: 27.5, yon: Math.PI } }],
  },
};

// Bir gecenin kimliği: öğleden önceki saatler önceki günün gecesine sayılır
export function geceKimligi(d) {
  const gd = ((d.dakika % 1440) + 1440) % 1440;
  return gd < 12 * 60 ? d.gun - 1 : d.gun;
}

// Tarifte anılan sabit yerler (yalnızca sokakta)
export const YERLER = [
  { id: 'leventis', ad: 'Leventis vapuru', x: 30, y: -2 },
  { id: 'iskele', ad: 'Kayıkçı iskelesi', x: 5, y: 0.5 },
  { id: 'durak', ad: 'Tramvay durağı', x: 0, y: 34 },
  { id: 'antrepo_kapi', ad: 'Antreponun kapalı kapısı', x: 18, y: 13.5 },
  { id: 'gecit', ad: 'Han ile yapıların arasındaki karanlık geçit', x: 48, y: 20 },
];

// Gün dakikası (0-1439). Aralık 1918 İstanbul: güneş yaklaşık 07.15'te doğar, 16.40'ta batar.
export const GUN_DOGUMU = 7 * 60 + 15;
export const GUN_BATIMI = 16 * 60 + 40;

// Kişilerin günlük rutini. Her satır o saatten itibaren nerede olduklarını söyler.
// mekan 'yok' ise kişi Karaköy'den ayrılmıştır; giris noktasından gelir ve oradan gider.
// soz: yanına gidip çift dokununca söylediği kısa söz (bu adımda hikâye yok).
export const KISILER = [
  {
    id: 'suleyman',
    ad: 'Süleyman Kaptan',
    giris: { x: -36, y: 41 },
    rutin: [
      { bas: 0, mekan: 'kayikhane', x: -46, y: 6, eylem: 'uyuyor', soz: 'Süleyman Kaptan uyuyor. Horultusu sobanın çıtırtısına karışıyor.' },
      { bas: 6 * 60, gun: 1, mekan: 'kayikhane', x: -45, y: 5, eylem: 'mangalın başında oturuyor' },
      { bas: 7 * 60, mekan: 'dis', x: -36, y: 3, eylem: 'kayığını kalafatlıyor', soz: 'Gel evlat. Şu kayığın karnı yine su alıyor. Leventis bu sabah erken yanaştı, gördün mü?' },
      { bas: 12 * 60, mekan: 'han', x: 32, y: 20, eylem: 'Ohannes Usta\'yla çay içiyor', soz: 'Öğle çayı, evlat. Ohannes\'in çayı Karaköy\'ün en iyisidir, ona söyleme ama.' },
      { bas: 13 * 60, mekan: 'dis', x: -36, y: 3, eylem: 'kayığını kalafatlıyor', soz: 'Akşama bitirmem lazım. Zifti karıştır da elin boş durmasın.' },
      { bas: 17 * 60, mekan: 'kayikhane', x: -44, y: 5, eylem: 'sobanın başında oturuyor', soz: 'Otur biraz, ısın. Gece rıhtımda dolaşma; bu aralar limanda tuhaf işler dönüyor.' },
      { bas: 23 * 60, mekan: 'kayikhane', x: -46, y: 6, eylem: 'uyuyor', soz: 'Süleyman Kaptan uyuyor. Horultusu sobanın çıtırtısına karışıyor.' },
    ],
  },
  {
    id: 'gulce',
    ad: 'Gülce',
    giris: { x: -36, y: 41 },
    rutin: [
      { bas: 0, mekan: 'yok' },
      { bas: 8 * 60 + 30, mekan: 'buro', x: -1, y: 23, eylem: 'kayıt defterinin başında', soz: 'Gülce başını defterden kaldırmadan konuşuyor: Kayıtlara bakmak için müdürün izni gerekir. Beşte kapatıyoruz.' },
      { bas: 17 * 60, mekan: 'yok' },
    ],
  },
  {
    id: 'ohannes',
    ad: 'Ohannes Usta',
    giris: { x: 37, y: 13 },
    rutin: [
      { bas: 0, mekan: 'han', x: 41, y: 27, eylem: 'uyuyor', soz: 'Ohannes Usta ocağın yanındaki sedirde uyuyor.' },
      { bas: 6 * 60, mekan: 'han', x: 40, y: 26, eylem: 'ocağın başında', soz: 'Hoş geldin Arif. Çay demlendi. Yukarıdaki odalarda bu kış kimler kalıyor, bir ben bilirim, bir Allah.' },
      { bas: 23 * 60, mekan: 'han', x: 41, y: 27, eylem: 'uyuyor', soz: 'Ohannes Usta ocağın yanındaki sedirde uyuyor.' },
    ],
  },
  {
    id: 'husnu',
    ad: 'Kayıkçı Hüsnü',
    giris: { x: 5, y: 1 },
    rutin: [
      { bas: 0, mekan: 'yok' },
      { bas: 6 * 60, mekan: 'dis', x: 6, y: 1.5, eylem: 'kayığının başında müşteri bekliyor', soz: 'Karşıya mı, abi? Eminönü on kuruş. İngilizler fiyatları da işgal etti.' },
      { bas: 18 * 60, mekan: 'yok' },
    ],
  },
  {
    id: 'hamallar',
    ad: 'Hamallar',
    giris: { x: 50, y: 41 },
    rutin: [
      { bas: 0, mekan: 'yok' },
      { bas: 7 * 60, mekan: 'dis', x: 31, y: 3, eylem: 'Leventis\'in yükünü indiriyor', soz: 'Hamallardan biri sırtındaki denki düzeltiyor: Çekil kardeşim, yük ağır. Ateşçi Sabri bu sabah işe gelmedi, ona da kızıyor reis.' },
      { bas: 17 * 60, mekan: 'yok' },
    ],
  },
  {
    id: 'halim',
    ad: 'Komiser Halim',
    giris: { x: -36, y: 41 },
    devriye: [
      { x: -30, y: 8 },
      { x: 50, y: 8 },
      { x: 50, y: 12 },
      { x: -30, y: 12 },
    ],
    rutin: [
      { bas: 0, mekan: 'yok' },
      { bas: 8 * 60 + 20, gun: 1, mekan: 'dis', x: 31.5, y: 4, eylem: 'cesedin başında bekliyor' },
      { bas: 9 * 60 + 10, gun: 1, mekan: 'yok' },
      { bas: 10 * 60, mekan: 'devriye', eylem: 'devriye geziyor', soz: 'Komiser Halim bıyığını sıvazlıyor: Ne dikiliyorsun burada? Hamal mısın, işsiz mi? İşine bak.' },
      { bas: 11 * 60, mekan: 'yok' },
      // İkinci görevin ilk akşamı: karanlık geçitte kasketli adamla buluşma
      { bas: 18 * 60 + 30, gorev: 2, gorevGunu: true, mekan: 'dis', x: 48, y: 33, eylem: 'geçidin ağzında sigara içiyor', soz: 'Komiser Halim sigarasının ateşini avucuna saklıyor: Yolun açık olsun. Burada durma.' },
      { bas: 18 * 60 + 52, gorev: 2, gorevGunu: true, mekan: 'dis', x: 48, y: 25.6, eylem: 'karanlık geçitte biriyle fısıldaşıyor' },
      { bas: 19 * 60 + 35, gorev: 2, gorevGunu: true, mekan: 'yok' },
      { bas: 20 * 60, mekan: 'devriye', eylem: 'devriye geziyor', soz: 'Komiser Halim fenerini yüzüne tutuyor: Gece yarısı rıhtımda ne arıyorsun? Evine git.' },
      { bas: 21 * 60, mekan: 'yok' },
    ],
  },
];

// İkinci görev: Gureba'dan gelen Doktor Cemil ve geçitteki buluşmada kasketli adam
KISILER.push(
  {
    id: 'cemil',
    ad: 'Doktor Cemil',
    giris: { x: -36, y: 41 },
    rutin: [
      { bas: 0, mekan: 'yok' },
      { bas: 10 * 60, gorevMin: 2, mekan: 'dis', x: -33.5, y: 4.5, eylem: 'Süleyman\'ın kayığının yanında, ziftten uzak duruyor', soz: 'Cemil gözlüklerini siliyor: Deniz kokusu morg kokusundan iyidir, derdi hocam. Haklıymış.' },
      { bas: 17 * 60 + 30, gorevMin: 2, mekan: 'kayikhane', x: -47, y: 4, eylem: 'sobanın başında ellerini ısıtıyor', soz: 'Cemil ellerini sobaya tutuyor: Ölülerle çalışan adamın elleri hiç ısınmaz.' },
      { bas: 21 * 60, gorevMin: 2, mekan: 'yok' },
    ],
  },
  {
    id: 'kasketli',
    ad: 'Kasketli adam',
    giris: { x: 48, y: 41 },
    rutin: [
      { bas: 0, mekan: 'yok' },
      { bas: 18 * 60 + 50, gorev: 2, gorevGunu: true, mekan: 'dis', x: 48, y: 24.4, eylem: 'karanlık geçitte biriyle fısıldaşıyor' },
      { bas: 19 * 60 + 35, gorev: 2, gorevGunu: true, mekan: 'yok' },
    ],
  },
);

// Ferrante'nin bekçisi: geceleri antreponun içinde dolaşır
KISILER.push({
  id: 'bekci',
  ad: 'Ferrante\'nin bekçisi',
  giris: { x: 18, y: 13 },
  devriyeMekan: 'antrepo',
  devriye: [
    { x: 14.5, y: 16 },
    { x: 22.5, y: 16 },
    { x: 22.5, y: 26.5 },
    { x: 14.5, y: 26.5 },
  ],
  rutin: [
    { bas: 0, mekan: 'devriye', eylem: 'feneriyle dolaşıyor' },
    { bas: 5 * 60, mekan: 'yok' },
    { bas: 21 * 60, mekan: 'devriye', eylem: 'feneriyle dolaşıyor' },
  ],
});

// Tramvay kuzeydeki caddeden geçer (y 36)
export const TRAMVAY = { y: 36, bati: -75, dogu: 75, aralik: 30, ilk: 5, gece: { bas: 23 * 60, bit: 6 * 60 } };

// Konumsal sesler (ekran bunları motora kurar)
export const SESLER = {
  deniz: [
    { x: -40, y: -4 },
    { x: 0, y: -4 },
    { x: 40, y: -4 },
  ],
  cekic: { x: -37, y: 2.5 },
  vapur: { x: 30, y: -6, aralik: 25 },
  can: { x: -25, y: 70 },
  kopek: { x: 55, y: 40 },
};
