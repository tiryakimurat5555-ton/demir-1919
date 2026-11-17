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
    karsiliklar: ['bolum19', 'bolum21'],
    gelecek: '21. bölümde karşılık buldu (kemal sahnesi: aradi seçeneği). Devamı kemal_sonu ipliğinde.',
    durum: 'kapali',
  },
  {
    id: 'kemal_soylenti',
    ad: 'Pire\'den gelen söylenti',
    bayrak: 'kemalSoylenti',
    ekildi: ['bolum19'],
    karsiliklar: ['bolum21'],
    gelecek: '21. bölüm açılışında ve köprüde hatırlandı.',
    durum: 'kapali',
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
    karsiliklar: ['bolum16', 'bolum17', 'bolum21'],
    gelecek: 'sonra_durust ya da durust ise son kitapta Neslihan Arif için bir şeyi göze alır; yalan/sessiz kalmışsa bu an soğuk geçer.',
    durum: 'acik',
  },
  {
    id: 'cemil_rapor',
    ad: 'Cemil Bey\'in yemini: bir tane daha olmayacak',
    bayrak: 'cemilRapor',
    ekildi: ['bolum18'],
    karsiliklar: ['bolum18', 'bolum20', 'bolum21'],
    gelecek: '21. bölümde İzmir\'de Eleni ile buluşmada: cemilYuk ise Cemil Kostas\'ı anlatır; değilse Yannis\'in anlattıkları Eleni\'ye ulaşmıştır.',
    durum: 'acik',
  },
  {
    id: 'riza_yakup',
    ad: 'Rıza Bey\'in sopası',
    bayrak: 'rizaHikaye',
    ekildi: ['bolum19'],
    karsiliklar: ['bolum19', 'bolum21'],
    gelecek: '21. bölümde Fenwick sorgusunda sınandı (rizaSorgu). Devamı riza_sorgu ipliğinde.',
    durum: 'kapali',
  },
  {
    id: 'nermin_yemin',
    ad: 'Nermin\'in Pendle yemini',
    bayrak: 'nerminYemin',
    ekildi: ['bolum20'],
    karsiliklar: ['bolum21'],
    gelecek: '21. bölümde Pendle yüzleşmesinde uygulandı. Devamı pendle_sonu ipliğinde.',
    durum: 'kapali',
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
    karsiliklar: ['bolum1', 'bolum18', 'bolum21'],
    gelecek: '1922 sonbaharında İzmir\'deki yangında travma >= 2 ise Arif\'in en ağır anısı; Neslihan ya da Cemil\'in sesi.',
    durum: 'acik',
  },
  {
    id: 'kemal_sonu',
    ad: 'Kemal Reis ve Pire',
    bayrak: 'kemalSonu',
    ekildi: ['bolum21'],
    karsiliklar: [],
    gelecek: 'yolcu: Kemal Pire\'de mültecilerle; Pendle\'in eski kaptanı olarak tanıklık eder, babasına mektup yazar. tereddut: Kemal hâlâ Pendle Shipping\'te; bir gün seçmesi gerekecek; Süleyman\'ın pusulası onda.',
    durum: 'acik',
  },
  {
    id: 'pendle_sonu',
    ad: 'Pendle\'in sonu',
    bayrak: 'pendleSonu',
    ekildi: ['bolum21'],
    karsiliklar: [],
    gelecek: 'gazete: Pendle iflas eder, Lozan\'da bir kulisde yeniden görünür. mahkeme: Londra\'da dava, Nermin ve Kemal tanık. kacti_*: Pendle Lozan\'da (Kasım 1922) yeni bir müşteriyle.',
    durum: 'acik',
  },
  {
    id: 'cocuk',
    ad: 'Rıhtımdaki kız, Ayva',
    bayrak: 'cocukKarar',
    ekildi: ['bolum21'],
    karsiliklar: [],
    gelecek: 'yanina: Neslihan kızı büyütür; Neslihan\'ın kendi çocukluğuyla barışması; kızın ninnisinin dili bir gün bir aileye götürür. aile: Rina\'nın ninesinden Pire\'den bir mektup gelir.',
    durum: 'acik',
  },
  {
    id: 'riza_sorgu',
    ad: 'Rıza Bey\'in bastonu',
    bayrak: 'rizaSorgu',
    ekildi: ['bolum21'],
    karsiliklar: [],
    gelecek: 'sopa: Rıza bastonunu bırakır; emekliliğini ister, Arif onu ikna etmelidir. kalabalik: Rıza Arif\'e güvenini yitirir (rizaBag). delil/sen: Rıza Arif\'e kendi defterlerini, Halim\'in dosyasını devreder.',
    durum: 'acik',
  },
];

export const acikIplikler = () => IPLIKLER.filter((i) => i.durum === 'acik');
