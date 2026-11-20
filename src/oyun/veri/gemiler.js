// Gemi sınıfları ve modül katmanları (belgeler/araclar-ve-gemi-filosu.md bölüm 2,
// belgeler/uzay-oyunu-tasarim-ve-senaryo.md bölüm 3). Saf veri; tersane Faz 3'te bağlanacak.

export const GEMI_SINIFLARI = {
  1: {
    ad: 'Kıvılcım',
    sinif: 'Hafif İzcilik Firkateyni',
    rol: 'Hızlı keşif, sinyal takibi, tekil kurtarma ve acil kuryelik.',
    ses: 'İnce, yüksek devirli bir türbin vızıltısı; hızlandıkça tizleşen ıslık.',
    bolmeler: ['Kokpit ve Seyrüsefer İstasyonu', 'Kompakt Kargo ve Acil Durum Ranzası'],
  },
  2: {
    ad: 'Rüzgarkıran',
    sinif: 'Ağır Keşif ve Madencilik Korveti',
    rol: 'Asteroit madenciliği ve uzun keşif.',
    bolmeler: ['Pilotaj', 'Makine Dairesi', 'Maden Ambarı', 'Yaşam Modülü'],
  },
  3: {
    ad: 'Aethel Muhafızı',
    sinif: 'Taktik Firkateyn ve Bilim Kruvazörü',
    rol: 'Bilimsel görevler ve savunma.',
    bolmeler: ['Köprüüstü', 'Reaktör', 'Laboratuvar', 'Silah Odası', 'Koğuş', 'Kargo'],
  },
  4: {
    ad: 'Gökdelen',
    sinif: 'Ağır Nakliye ve Lojistik Devi',
    rol: 'Tahliye ve büyük lojistik.',
    bolmeler: ['Yüksek Köprü', 'Çift Reaktör', 'Araç Hangarı', 'Lojistik Depo', 'Revir', 'Kseno Odası', 'Bakım', 'Karadutu'],
  },
  5: {
    ad: 'Hisar-ı Kadim',
    sinif: 'Süper Ağır Sancak Zırhlısı',
    rol: 'Filo karargâhı.',
    bolmeler: ['Amiral Köprüsü', 'Hisar Bataryası', 'Graviton Çekirdeği', 'Dron Hangarı', 'Cerrahi Revir', 'Mülteci Sektörü', 'Harekât Dairesi'],
  },
};

// Modüler montaj katmanları: her biri belirli uzay görevlerinin zorunlu donanımıdır
export const MODUL_KATMANLARI = [
  { id: 'burun', ad: 'Ön Burun', modul: 'Sensör Dizilimi ve Kripto-Anten' },
  { id: 'komuta', ad: 'Komuta Katı', modul: 'Basınçlı Kokpit ve Askeri Karadutu' },
  { id: 'govde', ad: 'Ana Gövde', modul: 'Lamine Titanyum Zırh ve Basınç Perdeleri' },
  { id: 'bolme_a', ad: 'İç Bölme A', modul: 'Biyo-Karantina ve Plazma Dekontaminasyon' },
  { id: 'bolme_b', ad: 'İç Bölme B', modul: 'Yüksek Hacimli Optik Kripto-Bellek' },
  { id: 'makine', ad: 'Makine Dairesi', modul: 'Kararlı Graviton Reaktörü ve Soğutma' },
  { id: 'tahrik', ad: 'Tahrik Hattı', modul: 'Kuantum Rezonans Sürücüsü ve İyon Motoru' },
  { id: 'dis_a', ad: 'Dış Donanım A', modul: 'Manyetik Çekici Kiriş' },
  { id: 'dis_b', ad: 'Dış Donanım B', modul: 'Ağır Hisar Savunma Topları ve Torpidolar' },
];
