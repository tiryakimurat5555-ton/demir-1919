// Pera (üçüncü görev): Cemil'in Cihangir'deki evi, Grand Rue de Péra, Mercure Kulübü'nün salonu,
// servis koridoru ve 17 numaralı oda. Saf veri. Karaköy haritasıyla aynı düzlemde ama uzakta
// (x 200'ün doğusu) duran iç mekânlardır; Karaköy'ün konumsal sesleri buradan duyulmaz.
// harita.js bu tabloları kendi MEKANLAR ve KISILER'ine katar.

const gd = (d) => ((d.dakika % 1440) + 1440) % 1440;
export const TOPLANTI_BAS = 21 * 60 + 18;
export const TOPLANTI_BIT = 22 * 60 + 45;

// Nermin baş garsonu oyalarken (mutlak dakika olarak saklanır)
export function oyalaniyor(d) {
  const b = d.bayrak.oyalaBitis;
  return !!b && d.gun * 1440 + gd(d) < b;
}

export const PERA_MEKANLAR = {
  cihangir: {
    id: 'cihangir',
    ad: 'Cemil\'in Cihangir\'deki evi',
    ortam: 'ortam_cemil_ev',
    alan: { x1: 200, x2: 210, y1: 50, y2: 58 },
    cikislar: [{ id: 'cihangir_cik', ad: 'Sokak kapısı', x: 205, y: 50.5, hedef: 'pera_cadde', varis: { x: 204, y: 7, yon: Math.PI / 2 } }],
  },
  pera_cadde: {
    id: 'pera_cadde',
    ad: 'Grand Rue de Péra',
    ortam: 'ortam_pera',
    alan: { x1: 200, x2: 262, y1: 0, y2: 10 },
    cikislar: [
      { id: 'cadde_cihangir', ad: 'Cihangir\'e inen sokak', x: 203, y: 9.5, hedef: 'cihangir', varis: { x: 205, y: 51.5, yon: 0 } },
      {
        id: 'kulup_kapi',
        ad: 'Mercure Kulübü\'nün kapısı',
        x: 230,
        y: 9.5,
        hedef: 'kulup_salon',
        varis: { x: 230, y: 13.5, yon: 0 },
        acik: (d) => d.kilik !== 'usak' && !d.bayrak.kulupKapali,
        kilitli: 'Kapıdaki uşak kolunu önüne uzatıyor: Garsonlar arka sokaktan girer.',
      },
      {
        id: 'servis_kapi',
        ad: 'Kulübün servis kapısı, arka sokakta',
        x: 250,
        y: 9.5,
        hedef: 'servis_koridoru',
        varis: { x: 246, y: 13.5, yon: 0 },
        acik: (d) => d.kilik === 'usak' && !d.bayrak.kulupKapali,
        kilitli: 'Servis kapısının önünde sigara içen bir aşçı yamağı seni süzüyor: Sen kimsin? Ceketin nerede? Burası mutfak.',
      },
      { id: 'karakoy_in', ad: 'Yüksekkaldırım, Karaköy\'e inen merdivenler', x: 201, y: 1, hedef: 'dis', varis: { x: 2, y: 39.5, yon: Math.PI } },
    ],
  },
  kulup_salon: {
    id: 'kulup_salon',
    ad: 'Mercure Kulübü\'nün salonu',
    ortam: 'ortam_kulup',
    alan: { x1: 220, x2: 242, y1: 12, y2: 30 },
    cikislar: [
      { id: 'salon_cik', ad: 'Kulübün ön kapısı', x: 230, y: 12.5, hedef: 'pera_cadde', varis: { x: 230, y: 8, yon: Math.PI } },
      {
        id: 'salon_servis',
        ad: 'Servis kapısı, barın yanında',
        x: 241.5,
        y: 26,
        hedef: 'servis_koridoru',
        varis: { x: 244.5, y: 26, yon: Math.PI / 2 },
        acik: (d) => d.kilik === 'usak' || oyalaniyor(d),
        kilitli: 'Bir garson önünü kesiyor: Pardon mösyö, orası servis. Baş garson Achille kapıyı gözünün ucuyla izliyor.',
      },
    ],
  },
  servis_koridoru: {
    id: 'servis_koridoru',
    ad: 'Kulübün servis koridoru',
    ortam: 'ortam_servis',
    alan: { x1: 243, x2: 249, y1: 12, y2: 30 },
    cikislar: [
      { id: 'koridor_salon', ad: 'Salona açılan kapı', x: 243.5, y: 26, hedef: 'kulup_salon', varis: { x: 240, y: 26, yon: -Math.PI / 2 } },
      { id: 'koridor_cadde', ad: 'Arka sokağa çıkan kapı', x: 246, y: 12.5, hedef: 'pera_cadde', varis: { x: 250, y: 8, yon: Math.PI } },
      {
        id: 'merdiven17',
        ad: 'On yedi numaraya çıkan merdiven',
        x: 248.5,
        y: 29.5,
        hedef: 'oda17',
        varis: { x: 246, y: 33, yon: 0 },
        acik: (d) => !!d.bayrak.anahtar17 && !(gd(d) >= 20 * 60 && gd(d) < TOPLANTI_BIT + 5),
        kilitli: 'Merdivenin başındaki kapı kilitli. Anahtarlar barın arkasındaki panoda durur; içeride biri varken kimse çıkamaz.',
      },
    ],
  },
  oda17: {
    id: 'oda17',
    ad: 'On yedi numara',
    ortam: 'ortam_oda',
    alan: { x1: 243, x2: 249, y1: 31, y2: 38 },
    cikislar: [{ id: 'oda17_in', ad: 'Aşağı inen merdiven', x: 248.5, y: 31.5, hedef: 'servis_koridoru', varis: { x: 247.5, y: 28.5, yon: Math.PI } }],
  },
};

// Pera'nın kişileri. yalniz: görev gününün satırları kişinin bütün gününü belirler.
const G3 = { gorev: 3, gorevGunu: true, yalniz: true };

export const PERA_KISILER = [
  {
    id: 'nermin',
    ad: 'Nermin Hanım',
    giris: { x: 204, y: 7 },
    rutin: [
      { bas: 0, mekan: 'yok' },
      { ...G3, bas: 17 * 60, mekan: 'cihangir', x: 207.5, y: 56, eylem: 'pencerenin önünde sigara içiyor', soz: 'Nermin dumanı pencereden üflüyor: Pera\'da herkes bir kostüm giyer. Sizinki hamal kostümüydü; bu gece başka.' },
      { ...G3, bas: 20 * 60 + 10, mekan: 'kulup_salon', x: 225, y: 20, eylem: 'bir masada, kâğıt oynayan İngiliz subayının yanında', soz: 'Nermin yelpazesinin ardından fısıldıyor: Bana bakma. Bir tanıdığa bakar gibi bak.' },
      { ...G3, bas: 23 * 60 + 30, mekan: 'cihangir', x: 207.5, y: 56, eylem: 'masada notlarını yazıyor', soz: 'Nermin kalemini bırakmadan: Anlat. Hepsini.' },
    ],
  },
  {
    id: 'cemil',
    ad: 'Doktor Cemil',
    giris: { x: 204, y: 7 },
    rutin: [
      { bas: 0, mekan: 'yok' },
      { ...G3, bas: 17 * 60, mekan: 'cihangir', x: 203, y: 53, eylem: 'kitaplığın önünde, kravatını bağlıyor', soz: 'Cemil kravatıyla boğuşuyor: Morgda kimse kravat takmaz. Ölüler çok hoşgörülüdür.' },
      { ...G3, bas: 20 * 60 + 20, mekan: 'kulup_salon', x: 233, y: 27, eylem: 'barın ucunda, bir kadeh şarapla', soz: 'Cemil kadehini kaldırıyor: Sağlığınıza mösyö. Fransızcam Paris\'ten kalma; aksanım Gureba\'dan.' },
      { ...G3, bas: 23 * 60 + 30, mekan: 'cihangir', x: 203, y: 53, eylem: 'sobaya odun atıyor', soz: 'Cemil: Sağ salim döndük. Bu bile bir şeydir.' },
    ],
  },
  {
    id: 'hargreaves',
    ad: 'İngiliz yüzbaşı',
    giris: { x: 230, y: 13 },
    rutin: [
      { bas: 0, mekan: 'yok' },
      { ...G3, bas: 20 * 60, mekan: 'kulup_salon', x: 226.5, y: 21.5, eylem: 'kâğıt oynuyor, sesli sesli gülüyor', soz: 'İngiliz subay kartlarını masaya vuruyor: Another one, garçon! Bu şehirde viski bile işgal altında.' },
      { ...G3, bas: 23 * 60 + 40, mekan: 'yok' },
    ],
  },
  {
    id: 'yorgo',
    ad: 'Barmen',
    giris: { x: 246, y: 13 },
    rutin: [
      { bas: 0, mekan: 'yok' },
      { ...G3, bas: 19 * 60, mekan: 'kulup_salon', x: 236, y: 28.5, eylem: 'barın arkasında bardak siliyor', soz: 'Barmen bardağı ışığa tutuyor: Ne alırsınız mösyö?' },
      { ...G3, bas: 23 * 60 + 50, mekan: 'yok' },
    ],
  },
  {
    id: 'achille',
    ad: 'Baş garson Achille',
    giris: { x: 230, y: 13 },
    devriyeMekan: 'kulup_salon',
    devriye: [
      { x: 223, y: 15 },
      { x: 239, y: 15 },
      { x: 239, y: 27 },
      { x: 223, y: 27 },
    ],
    rutin: [
      { bas: 0, mekan: 'yok' },
      { ...G3, bas: 19 * 60, mekan: 'devriye', eylem: 'masaların arasında dolaşıyor', soz: 'Baş garson eğiliyor ama gözleri gülmüyor: Mösyö bir şey arıyor mu?' },
      { ...G3, bas: 23 * 60 + 50, mekan: 'yok' },
    ],
  },
  {
    id: 'nobetci',
    ad: 'Merdivendeki iri adam',
    gozcu: true,
    giris: { x: 246, y: 13 },
    rutin: [
      { bas: 0, mekan: 'yok' },
      { ...G3, bas: 21 * 60, mekan: 'servis_koridoru', x: 247.5, y: 27.5, eylem: 'merdivenin başında, kollarını kavuşturmuş bekliyor', soz: 'İri adam başını kaldırıyor: Kaybol.' },
      { ...G3, bas: TOPLANTI_BIT, mekan: 'yok' },
    ],
  },
  {
    id: 'lavantali',
    ad: 'Lavanta kokulu adam',
    gozcu: true,
    giris: { x: 246, y: 13 },
    rutin: [
      { bas: 0, mekan: 'yok' },
      { ...G3, bas: 21 * 60 + 8, mekan: 'servis_koridoru', x: 248, y: 28.5, eylem: 'merdivene yürüyor' },
      { ...G3, bas: TOPLANTI_BAS, mekan: 'oda17', x: 245, y: 35.5, eylem: 'on yedide, masanın başında' },
      { ...G3, bas: TOPLANTI_BIT, mekan: 'yok' },
    ],
  },
];
