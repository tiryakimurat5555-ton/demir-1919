// Hikâyenin uzun iplikleri: bir bölümde ekilen seçimlerin sonraki bölümlerdeki karşılıkları.
// Her yeni bölüm bu kayda bakılarak yazılır (CLAUDE.md "Bölüm yazma kuralları"). testler/iplikler.test.js her ipliğin
// bayrağının ekildiği bölümde yazıldığını ve karşılık bölümlerinde okunduğunu denetler.
//
// Alanlar:
//   bayrak     : ipliği taşıyan bayrak (ya da delil) adı
//   ekildi     : bayrağın verildiği bölüm(ler)
//   karsiliklar: bayrağın okunduğu (sahne/metin değiştiren) bölümler
//   gelecek    : henüz yazılmamış bölümlerde ne olacağı (plan; durum 'acik' ise zorunlu)
//   durum      : 'acik' (gelecekte karşılığı bekleniyor) | 'kapali' (iplik bitti)

export const IPLIKLER = [
  {
    id: 'arif_neden',
    ad: 'Arif ailesini neden aramadı',
    bayrak: 'arifNeden',
    ekildi: ['bolum1'],
    karsiliklar: ['bolum6', 'bolum8', 'bolum9'],
    gelecek: 'Son kitapta Arif kendi yarım kalan aramasıyla yüzleşir: Süleyman\'ın oğlu için aramayı bırakmaz.',
    durum: 'acik',
  },
  {
    id: 'kemal',
    ad: 'Süleyman\'ın ölü bildiği oğlu Kemal',
    bayrak: 'aramaSozu',
    ekildi: ['bolum1'],
    karsiliklar: ['bolum19'],
    gelecek: '21. bölüm Arethusa: Kemal, Pendle\'in gemisinin süvarisi. aramaSozu ise Arif Süleyman\'a haber verir; değilse Süleyman kendisi tanır, geç.',
    durum: 'acik',
  },
  {
    id: 'kemal_soylenti',
    ad: 'Pire\'den gelen söylenti',
    bayrak: 'kemalSoylenti',
    ekildi: ['bolum19'],
    karsiliklar: [],
    gelecek: '21. bölümde Arethusa\'nın süvarisinin adı duyulunca hatırlanır.',
    durum: 'acik',
  },
  {
    id: 'hatice',
    ad: 'Sabri\'nin yarım mektubu',
    bayrak: 'haticeSozu',
    ekildi: ['bolum1'],
    karsiliklar: ['bolum2', 'bolum17'],
    gelecek: 'haticeSonu (mektup/dogru/sessiz) son kitapta Hatice\'nin bir kez daha görünmesinde kullanılabilir.',
    durum: 'kapali',
  },
  {
    id: 'pendle',
    ad: 'Pendle Shipping, iki tarafa birden',
    bayrak: 'manifest',
    ekildi: ['bolum1'],
    karsiliklar: ['bolum15'],
    gelecek: '21. bölüm: Arethusa, Eylül 1922 İzmir. Pendle\'le yüzleşme; nerminYemin uygulanır.',
    durum: 'acik',
  },
  {
    id: 'kardes_gecesi',
    ad: 'Sen beni aradın mı abi?',
    bayrak: 'kardesGecesi',
    ekildi: ['bolum9', 'bolum17'],
    karsiliklar: ['bolum16', 'bolum17'],
    gelecek: 'sonra_durust ya da durust ise son kitapta Neslihan Arif için bir şeyi göze alır; yalan/sessiz kalmışsa bu an soğuk geçer.',
    durum: 'acik',
  },
  {
    id: 'cemil_rapor',
    ad: 'Cemil Bey\'in yemini: bir tane daha olmayacak',
    bayrak: 'cemilRapor',
    ekildi: ['bolum18'],
    karsiliklar: ['bolum18', 'bolum20'],
    gelecek: '21. bölümde İzmir\'de Eleni ile buluşmada: cemilYuk ise Cemil Kostas\'ı anlatır; değilse Yannis\'in anlattıkları Eleni\'ye ulaşmıştır.',
    durum: 'acik',
  },
  {
    id: 'riza_yakup',
    ad: 'Rıza Bey\'in sopası',
    bayrak: 'rizaHikaye',
    ekildi: ['bolum19'],
    karsiliklar: ['bolum19'],
    gelecek: 'Pendle ya da adamlarından biri ele geçince sorgu sahnesinde Rıza\'nın sınavı: bu kez kendisi sopa ister mi?',
    durum: 'acik',
  },
  {
    id: 'nermin_yemin',
    ad: 'Nermin\'in Pendle yemini',
    bayrak: 'nerminYemin',
    ekildi: ['bolum20'],
    karsiliklar: [],
    gelecek: '21. bölüm Pendle\'le yüzleşme: gazete / mahkeme / birlikte. Cevdet\'in atkısı (nerminCevdet) orada çıkar.',
    durum: 'acik',
  },
  {
    id: 'gulce_tevfik',
    ad: 'Gülce\'nin yetiştirdiği hain',
    bayrak: 'gulceTevfik',
    ekildi: ['bolum19'],
    karsiliklar: ['bolum20'],
    gelecek: 'Tevfik\'in kardeşi Selim (tevfikKarar cift) ya da Tevfik\'in Bursa yolculuğu (teslim) son kitapta Gülce\'ye döner.',
    durum: 'acik',
  },
  {
    id: 'travma',
    ad: 'Arif\'in Çanakkale yarası',
    bayrak: 'travma',
    ekildi: ['bolum1'],
    karsiliklar: ['bolum1', 'bolum18'],
    gelecek: '1922 sonbaharında İzmir\'deki yangında travma >= 2 ise Arif\'in en ağır anısı; Neslihan ya da Cemil\'in sesi.',
    durum: 'acik',
  },
];

export const acikIplikler = () => IPLIKLER.filter((i) => i.durum === 'acik');
