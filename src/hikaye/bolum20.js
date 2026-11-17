// Yirminci bölüm: "Tarife". Ankara ve Polatlı, 18-24 Ağustos 1921.
// Bursa'daki aracı Nuri Bey Ankara'da: sahte tekâlif vesikalarıyla depolardan mal topluyor, cephane trenlerinin
// tarifesini satıyor. Arkasındaki el: Sir Henry Pendle (kurgu; Genel Kurul'daki İngiliz armatör), Pire'den.
// Yeni oynanış: görev dağıtımı. Gece baskınında ekibi yerlere sen yerleştirirsin; doğru kişi doğru yerde olursa iş tutar.
// Arka plan (gerçek): Ağustos 1921'de Tekâlif-i Milliye emirleri halktan mal topladı; Sakarya'da 23 Ağustos'ta
// büyük muharebe başladı. Bunlar yalnızca arka plan; gerçek kişiler kurguya karışmaz. Bütün kişiler KURGUDUR.
import { BOLUM19 } from './bolum19';
import { bayrak, cikarimVar, delilVar } from '../oyun/motor';

const ACILIS_ETKI = { mekan: 'tashan', bayrak: { 'gorüldü_tashan': true, ekip_cemil: true, ekip_riza: true, ekip_nermin: true } };

export const EKIP20 = { riza: 'Rıza Bey', nermin: 'Nermin', neslihan: 'Neslihan', cemil: 'Cemil Bey' };

// Doğru yerleşim: hana Rıza (pusu ve takip), istasyona Nermin (telgraf ve kâğıt), hastanede Cemil kalır.
export function dogruAtama(d) {
  return (bayrak(d, 'atamaHan') === 'riza' ? 1 : 0) + (bayrak(d, 'atamaIstasyon') === 'nermin' ? 1 : 0);
}

const atamaSecenekleri = (alan, sonra) =>
  Object.entries(EKIP20).map(([id, ad]) => ({
    etiket: ad,
    kosul: (d) => bayrak(d, 'atamaHan') !== id,
    etki: { bayrak: { [alan]: id } },
    sonra,
  }));

export const BOLUM20 = {
  id: 'bolum20',
  ad: 'Yirminci bölüm: Tarife',
  baslangic: 'acilis',
  ilkMekan: 'tashan',

  deliller: {
    ...BOLUM19.deliller,
    mavi_kagit: { ad: 'Matbaa siparişi', tarif: 'Nermin\'in matbaasına gelen sipariş: beş yüz adet tekâlif vesikası, mavi kâğıda. Mühür kalıbı da birlikte getirilmiş; ama mühürdeki yazı bir harf yanlış. Siparişi veren: Nuri Bey, Bursalı komisyoncu. Peşin, İngiliz lirasıyla.' },
    nuri_izi: { ad: 'Han kâtibinin sözleri', tarif: 'Karaoğlan\'daki handa üst kat, köşe oda: Nuri Bey. Bursalı. Her sabah istasyona gidiyor; akşamları odasında yazı yazıyor. Kirayı İngiliz lirasıyla ödüyor.' },
    sevk_listesi: { ad: 'Cephane treninin tarifesi', tarif: 'İstasyon şefinin defteri: Polatlı\'ya cephane treni 21 Ağustos gecesi, saat on birde. Tarifenin üç kopyası yazılmış; ikisi yerinde. Üçüncüsünü bir tekâlif vesikası gösteren biri almış: Nuri Bey.' },
    pendle_ceki: { ad: 'Odadaki mektup', tarif: 'Nuri Bey\'in odasında, yatağın altındaki çantada, İngilizce bir mektup: "Tarifeyi Bursa\'ya. Ödeme her zamanki gibi Pire\'de, gemide. H. P." Kâğıdın başlığında bir gemi resmi ve bir ad: Pendle Shipping, Piraeus.' },
  },

  cikarimlar: {
    ...BOLUM19.cikarimlar,
    sahte_vesika: {
      a: 'mavi_kagit',
      b: 'nuri_izi',
      ad: 'Sahte vesika',
      metin: 'Nuri Bey sahte tekâlif vesikalarıyla depolara, istasyona, hanlara giriyor. Köylünün son öküzünü, son çuvalını toplayan emirlerin arasına kendi emirlerini sokuyor; topladığını Bursa\'ya kaçırıyor.',
    },
    tarife: {
      a: 'sevk_listesi',
      b: 'pendle_ceki',
      ad: 'Tarife',
      metin: 'Cephane treninin saati Nuri\'nin elinde; ve Nuri\'nin arkasında Sir Henry Pendle. Pendle Shipping, Pire: Leventis\'in yük kaydında da bu ad vardı. Sabri\'nin öldüğü gece kırk sandık tüfeği getiren gemi onundu. Santa Lucia, Aurora, Columbia da onundu. Viyana\'da "batan gemiden inerim" diyen armatör, şimdi iki tarafa birden yük taşıyor. Tren 21 Ağustos gecesi saat on birde kalkacak. Biri onu bekliyor.',
    },
  },

  olaylar: [
    {
      id: 'plan20',
      kosul: (d) => cikarimVar(d, 'sahte_vesika') && cikarimVar(d, 'tarife'),
      etki: { sahne: 'plan20' },
    },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Yirminci bölüm bitti.' },
    { kosul: (d) => !delilVar(d, 'mavi_kagit'), metin: 'Taşhan\'daki matbaada Nermin\'le konuş.' },
    { kosul: (d) => !delilVar(d, 'nuri_izi'), metin: 'Karaoğlan\'daki handa Nuri Bey\'i sor.' },
    { kosul: (d) => !delilVar(d, 'sevk_listesi'), metin: 'İstasyonda cephane trenlerinin defterine bak.' },
    { kosul: (d) => !delilVar(d, 'pendle_ceki'), metin: 'Nuri Bey dışarıdayken odasına bak.' },
    { kosul: () => true, metin: 'Bulduklarını soruşturma panosunda birleştir.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_matbaa',
      baslik: '18 Ağustos 1921, Ankara',
      paragraflar: (d) => [
        'Ankara toz içinde. İstasyondan kalkan her tren batıya gidiyor; dönen her tren yaralı getiriyor. Herkes aynı adı fısıldıyor: Sakarya.',
        'Nermin\'in Taşhan\'daki matbaası: iki oda, bir el baskı makinesi, bir sandık harf. Kasanın bir köşesinde babanın döktüğü Ç, Ğ, Ş harfleri; parlak, yeni.',
        bayrak(d, 'tevfikKarar') === 'cift'
          ? 'Gülce\'nin mektubu dün geldi: Tuzla tuzağından sonra Bursa\'daki aracının ağı çöktü. Ama aracı kaçtı. Adı Nuri Bey. Ankara\'ya geldiği söyleniyor.'
          : 'Gülce\'nin mektubu dün geldi: Tevfik\'in sayıları kesilince Bursa\'daki aracı başka bir kaynak bulmuş. Adı Nuri Bey. Ankara\'ya geldiği söyleniyor.',
        'Cemil Bey hastanesiyle Polatlı\'ya taşındı; dün gece bir haber yolladı: yaralı sayısı her gün ikiye katlanıyor. Rıza Bey ve Neslihan seninle. Nermin dizgi kasasının başında; mürekkepli elleriyle sana bir kâğıt uzatıyor.',
        'Bu sabah bir sipariş geldi, diyor. Biri bana çok para ödedi. Ve ben bundan hiç hoşlanmadım.',
      ],
      secenekler: [{ etiket: 'Devam', etki: ACILIS_ETKI }],
    },
    plan20: {
      ortam: 'ortam_matbaa',
      baslik: '21 Ağustos, akşamüstü',
      paragraflar: [
        'Matbaada lambayı kısıyorsunuz. Masada tarifenin kopyası, Pendle\'in mektubu, mavi bir vesika.',
        'Rıza Bey haritayı açıyor. Bu gece iki yer var, diyor. Han: Nuri tarifeyi orada birine verecek, ya da kendisi götürecek. İstasyon: tren on birde kalkacak; telgrafhaneden bir sahte emirle saatini, yolunu değiştirebilirler. Bir de Polatlı: Cemil Bey yalnız.',
        'Herkes sana bakıyor. Kim nereye gidecek, sen söyle.',
      ],
      secenekler: [{ etiket: 'Görevleri dağıt', sonra: 'atama_han' }],
    },
    atama_han: {
      ortam: 'ortam_matbaa',
      baslik: 'Hana kim gidecek?',
      paragraflar: [
        'Handa Nuri\'yi izlemek, kiminle buluştuğunu görmek, gerekirse yolunu kesmek gerek. Sabır, gölge, sağlam bir el.',
        'Sen de istasyona gideceksin; ama yanına birini almalısın.',
      ],
      secenekler: atamaSecenekleri('atamaHan', 'atama_istasyon'),
    },
    atama_istasyon: {
      ortam: 'ortam_matbaa',
      baslik: 'İstasyona seninle kim gelecek?',
      paragraflar: [
        'İstasyonda telgrafhane var. Sahte bir emir oradan geçerse tren yanlış hatta, yanlış saatte gider. Emrin sahte olduğunu kâğıdından, mühründen, telgrafın dilinden anlayacak biri gerek.',
      ],
      secenekler: atamaSecenekleri('atamaIstasyon', 'gece20'),
    },
    gece20: {
      ortam: 'ortam_istasyon',
      baslik: '21 Ağustos, gece',
      paragraflar: (d) => {
        const han = EKIP20[bayrak(d, 'atamaHan')];
        const ist = EKIP20[bayrak(d, 'atamaIstasyon')];
        const p = ['Saat on. İstasyon karanlık; buharın tıslaması, ağustosböceği, kuru bozkırın rüzgârı. Yanında ' + ist + '.'];
        if (bayrak(d, 'atamaIstasyon') === 'nermin') {
          p.push('Telgrafhanede genç bir memur bir emir uzatıyor: Tren yarım saat erken, güney hattından. Nermin kâğıdı ışığa tutuyor. Mavi kâğıt, diyor. Benim matbaamın kâğıdı. Mühürde bir harf yanlış. Bu emir sahte. Memur kekeliyor; emri bir saat önce bir adam getirmiş: Bursalı, kibar, İngiliz lirası bırakmış.');
          p.push('Tren on birde, kendi hattından, kendi saatinde kalkıyor. Güney hattında, köprünün başında bekleyenler boşuna bekliyor.');
        } else {
          p.push('Telgrafhanede genç bir memur bir emir uzatıyor: Tren yarım saat erken, güney hattından. ' + ist + ' kâğıda bakıyor; bir mühür, bir imza. Sahte mi, gerçek mi? Kimse emin olamıyor. Tartışırken vakit geçiyor.');
          p.push('Sonunda istasyon şefi treni kendi hattından gönderiyor; ama yarım saat gecikmeyle, ve emir çoktan Bursa\'ya bildirilmiş. Gece yarısı uzaktan bir patlama sesi: köprünün başında iki vagon devriliyor. Cephanenin çoğu kurtuluyor; iki makinist yaralı.');
        }
        if (bayrak(d, 'atamaHan') === 'riza') {
          p.push('Handa Rıza Bey üç saat merdivenin altında bekliyor. Saat on birde Nuri Bey bir çantayla iniyor; avluda bir atlı bekliyor. Rıza Bey öne çıkıyor: Nuri Efendi, bir dakika. Atlı kaçıyor; Nuri kaçamıyor. Rıza Bey kırk yıl adam yakalamış.');
        } else {
          p.push('Handa ' + han + ' bekliyor; ama Nuri Bey merdivenden değil, arka avludaki ahırdan çıkıyor. ' + han + ' onu ancak atlıya binerken görüyor. Bir bağırış, bir toz bulutu. Nuri kaçıyor. Odasında yalnızca yanmış kâğıtlar kalıyor.');
        }
        if (bayrak(d, 'atamaHan') === 'cemil' || bayrak(d, 'atamaIstasyon') === 'cemil') {
          p.push('Ve Polatlı\'da Cemil Bey\'in yerine bir gece genç bir sıhhiye çavuşu kalıyor. Sabah dönen Cemil Bey yaralı sayısına bakıyor; bir şey demiyor. Demesine gerek yok.');
        }
        return p;
      },
      secenekler: [
        {
          etiket: 'Devam',
          etki: (d) => ({
            bayrak: {
              nuriSonu: bayrak(d, 'atamaHan') === 'riza' ? 'yakalandi' : 'kacti',
              trenSonu: bayrak(d, 'atamaIstasyon') === 'nermin' ? 'tam' : 'hasarli',
              cemilYalniz: bayrak(d, 'atamaHan') === 'cemil' || bayrak(d, 'atamaIstasyon') === 'cemil',
            },
          }),
          sonra: 'nuri20',
        },
      ],
    },
    nuri20: {
      ortam: 'ortam_matbaa',
      baslik: 'Nuri Bey',
      paragraflar: (d) =>
        bayrak(d, 'nuriSonu') === 'yakalandi'
          ? [
              'Matbaanın arka odası. Nuri Bey bir sandalyede; kırk beş yaşında, kır saçlı, temiz giyimli. Ellerinde mürekkep yok; o yazdırır, kendisi yazmaz.',
              'Ben bir tüccarım, diyor. Siz de bir gün tüccar olacaksınız; savaşlar biter, ticaret kalır. Pendle bana sordu: Bu savaşı kim kazanacak? Bilmiyorum dedim. O da dedi ki: O zaman ikisine de sat.',
              bayrak(d, 'tevfikKarar') === 'teslim'
                ? 'Kapıda biri duruyor: Mehmet Tevfik. Teslim edildikten sonra Ankara\'ya gelmiş, Nermin\'in yanında dizgici olmuş. Nuri\'ye bakıyor. Kardeşim nerede, diyor. Sesi titremiyor. Nuri ilk kez başını öne eğiyor. Bursa\'da, diyor, Kayhan\'daki handa. Sağ. Tevfik dönüp çıkıyor; ertesi sabah Bursa yoluna düşüyor.'
                : 'Neslihan araya giriyor: Tuzla\'da kaçan çocuk, diyor. On altı yaşındaki. O şimdi Cemil Bey\'in hastanesinde sedye taşıyor. Ona ne diyeyim? Nuri cevap vermiyor.',
              'Pendle nerede, diye soruyorsun. Nuri gülümsüyor. Pire\'de değil artık, diyor. Bir sonraki büyük iş için yer değiştirdi. Gemisinin adı Arethusa. İzmir\'de. Yunan ordusu çekilirse İzmir\'den kaçacak herkes bir gemi arayacak. Sir Henry gemi kiralar; çok pahalıya.',
              'Rıza Bey Nuri\'yi askerî mahkemeye teslim ediyor. Kâğıtlarıyla, delilleriyle. Döverek değil, delille.',
            ]
          : [
              'Nuri Bey\'in odasında yanmış kâğıtlar. Rıza Bey küllerin arasında bir şey arıyor; Neslihan da. Bir parça kurtulmuş: İngilizce, yarım bir satır.',
              '"... Arethusa, İzmir. Eylül sonu. Kaçan herkes bir gemi arayacak; fiyat bizden. H. P."',
              bayrak(d, 'tevfikKarar') === 'teslim'
                ? 'Kapıda Mehmet Tevfik. Nermin\'in yanında dizgici olmuş. Küllere bakıyor. Kardeşim, diyor sadece. Bir hafta sonra Bursa yoluna düşüyor; kendi başına.'
                : 'Neslihan küllere bakıyor. Tuzla\'da kaçan çocuk Cemil Bey\'in hastanesinde sedye taşıyor, diyor. Hiç olmazsa o kurtuldu.',
              'Nuri bir yerde, bir başka handa, bir başka adla. Ama Pendle\'in gemisinin adını artık biliyorsun.',
            ],
      secenekler: [{ etiket: 'Devam', sonra: 'polatli_son' }],
    },
    polatli_son: {
      ortam: 'ortam_sahra',
      efekt: 'top',
      baslik: '24 Ağustos, Polatlı',
      paragraflar: (d) => [
        'Top sesleri artık uzaktan değil. Muharebe dün başladı. Cemil Bey\'in çadırları dolmuş; sedyeler çadırların dışına taşmış.',
        bayrak(d, 'trenSonu') === 'tam'
          ? 'Cephane treni gecikmeden geldi. Bir topçu çavuşu Cemil Bey\'e söylemiş: Tam vaktinde. Bir gece geç gelseydi sırtımız açıktı.'
          : 'Cephane treni iki vagon eksik geldi. Bir topçu çavuşu söylemiş: Bir gece sayılarla yazdık mermileri. Yetti; zor yetti.',
        bayrak(d, 'cemilYalniz')
          ? 'Cemil Bey seni görünce bir şey söylemiyor; önlüğünü uzatıyor. Sen de giyiyorsun. Bir gece burada olmadığının bedelini bir gün değil, bir ömür taşıyacağını ikiniz de biliyorsunuz.'
          : 'Cemil Bey seni görünce önlüğünü uzatıyor. Treni karşıladıysan, diyor, buradaki işe başla. Yorgun, ama gülümsüyor.',
        bayrak(d, 'cemilRapor') === 'sitma'
          ? 'Cemil Bey\'in masasında bir defter var; Ocak\'tan beri tutuyor. Her esir ölümüne iki satır: ad ve gerçek sebep. Kostas\'ın satırı en başta. Kimse okumuyor bu defteri. Okumaları için tutmuyor.'
          : bayrak(d, 'cemilRapor')
            ? 'Cemil Bey\'in her raporunda artık iki satır var: ad ve gerçek sebep. Kostas\'tan beri. Esir çadırındaki hekim bunu herkese anlatmış; öbür taraftan iki yaralı hekim, sırf bu yüzden, Cemil Bey\'in sahra hastanesine teslim olmuş.'
            : '',
        'Yaralılar her iki dilde inliyor; esir çadırında da, bizimkilerde de. Neslihan ikisinin arasında koşuyor. Cemil Bey cebinden bir mektup çıkarıyor: Eleni\'den, öbür taraftan. Onlarda da bitmiş, diyor. Kinin, sargı, umut.',
        'Akşam Rıza Bey haritaya İzmir\'i işaretliyor. Arethusa, diyor. Bir yıl sonra mı, iki yıl sonra mı, bilmiyorum. Ama o gemi bir gün bir rıhtıma yanaşacak ve biz orada olacağız.',
        'Yirminci bölümün sonu.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_matbaa',
      ortamOran: 0.45,
      baslik: 'Yirminci bölüm bitti',
      paragraflar: ['Yirmi birinci bölüm yazılıyor: Arethusa. Kararların kaydedildi.'],
      secenekler: [{ etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    tashan: {
      ad: 'Taşhan\'daki matbaa',
      ortam: 'ortam_matbaa',
      tarif: 'Taşhan\'ın üst katında iki oda: el baskı makinesi, dizgi kasaları, ipe asılmış ıslak gazete sayfaları. Mürekkep ve gazyağı kokusu.',
      nesneler: [
        {
          id: 'harf_kasasi',
          etiket: 'Harf kasası',
          incele: 'Kurşun harfler gözlerine dizilmiş. Bir gözde babanın döktüğü Ç, Ğ, Ş harfleri; kenarlarında hâlâ eğenin izi. Nermin her sayfada önce onları dizer, diyor; uğur.',
        },
      ],
      kisiler: ['nermin', 'riza', 'neslihan', 'tevfik20'],
      gecisler: [
        { hedef: 'han20', etiket: 'Karaoğlan çarşısındaki hana git' },
        { hedef: 'istasyon', etiket: 'İstasyona git' },
        { hedef: 'polatli', etiket: 'Polatlı\'ya, Cemil Bey\'in hastanesine git' },
      ],
    },
    han20: {
      ad: 'Karaoğlan\'daki han',
      ortam: 'ortam_han',
      tarif: 'İki katlı, avlulu bir han. Avluda develer, kağnılar, yorgun yolcular. Köşede, bir masada, gözlüklü ihtiyar bir kâtip.',
      nesneler: [
        {
          id: 'nuri_odasi',
          etiket: 'Üst kattaki köşe oda',
          kosul: (d) => delilVar(d, 'nuri_izi'),
          incele: (d) =>
            delilVar(d, 'pendle_ceki')
              ? 'Oda kilitli. İçerisi sessiz.'
              : 'Nuri Bey istasyona gitmiş. Rıza Bey kilidi bir telle açıyor; sen içeri giriyorsun. Temiz bir oda, katlanmış gömlekler, bir çanta. Çantada İngilizce bir mektup; başlığında bir gemi resmi: Pendle Shipping, Piraeus. Mektubu yerine koyuyorsun; ama içindekini ezberledin.',
          etki: (d) => (delilVar(d, 'pendle_ceki') ? null : { delil: ['pendle_ceki'] }),
        },
      ],
      kisiler: ['katip20'],
      gecisler: [{ hedef: 'tashan', etiket: 'Matbaaya dön' }],
    },
    istasyon: {
      ad: 'Ankara istasyonu',
      ortam: 'ortam_istasyon',
      tarif: 'Küçük taş istasyon binası; önünde yük vagonları, cephane sandıkları, nöbetçiler. İçeride telgrafhane ve istasyon şefinin odası.',
      nesneler: [
        {
          id: 'sef_defteri',
          etiket: 'İstasyon şefinin defteri',
          incele: (d) =>
            delilVar(d, 'sevk_listesi')
              ? 'Defter şefin masasında. Üçüncü kopyanın yeri hâlâ boş.'
              : 'Yorgun bir şef defteri açıyor. Polatlı\'ya cephane treni: 21 Ağustos gecesi, saat on bir. Tarife üç kopya yazılmış: biri telgrafhanede, biri bende. Üçüncüsünü dün bir efendi aldı; tekâlif vesikası gösterdi. Mavi kâğıt, mühürlü. Adı Nuri Bey.',
          etki: (d) => (delilVar(d, 'sevk_listesi') ? null : { delil: ['sevk_listesi'] }),
        },
      ],
      kisiler: [],
      gecisler: [{ hedef: 'tashan', etiket: 'Matbaaya dön' }],
    },
    polatli: {
      ad: 'Polatlı\'daki sahra hastanesi',
      ortam: 'ortam_sahra',
      tarif: 'Bir tepenin ardında beyaz çadırlar. Batıdan arada bir top sesi. Sedyeler, sıhhiye neferleri, kaynayan kazanlar.',
      nesneler: [],
      kisiler: ['cemil'],
      gecisler: [{ hedef: 'tashan', etiket: 'Ankara\'ya, matbaaya dön' }],
    },
  },

  kisiler: {
    nermin: {
      ad: 'Nermin',
      giris: (d) => (delilVar(d, 'mavi_kagit') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Nermin elindeki kâğıdı sallıyor. Beş yüz adet, diyor. Tekâlif vesikası. Halkın son tavuğunu, son çuvalını toplayan emirler. Ama bunları hükümet bana sipariş etmedi.',
          secenekler: [
            {
              etiket: 'Kim sipariş etti?',
              etki: { delil: ['mavi_kagit'] },
              sonra: 'sonra',
              cevap: 'Bursalı bir komisyoncu, diyor. Nuri Bey. Kibar, kır saçlı. Mühür kalıbını da kendisi getirdi. Bak: mühürdeki yazıda bir harf yanlış. Ben fark ettim; köylü fark etmez, depo memuru fark etmez. Mavi kâğıda bastırdı; hükümetinki beyaz. Peşin ödedi, İngiliz lirasıyla. Karaoğlan\'daki handa kalıyormuş.',
            },
          ],
        },
        sonra: {
          soz: (d) =>
            bayrak(d, 'nerminYemin')
              ? 'Nermin dizgi kasasının başında. Kasanın kenarına bir kâğıt iğnelemiş; üstünde tek bir ad: Pendle.'
              : 'Nermin dizgi kasasına dönüyor. Gazeteyi yarın sabah basacağım, diyor. Ve Nuri Bey\'in siparişini de; ama her birinin köşesine, yalnız bizim göreceğimiz bir nokta koyacağım.',
          secenekler: [
            {
              etiket: 'Ağabeyini hiç anlatmadın. Anlat bana.',
              kosul: (d) => !bayrak(d, 'nerminCevdet'),
              etki: { bayrak: { nerminCevdet: true }, artir: { nerminBag: 1 } },
              sonra: 'cevdet',
            },
            {
              etiket: 'Pendle\'i bulduğumuzda ne yapacağız?',
              kosul: (d) => delilVar(d, 'pendle_ceki') && !bayrak(d, 'nerminYemin'),
              sonra: 'yemin',
            },
            { etiket: 'Dikkat et Nermin.' },
          ],
        },
        cevdet: {
          soz: [
            'Nermin elindeki harfi kasaya bırakıyor. Kurşun harf tıkırdıyor.',
            'Adı Cevdet\'ti. Benden dört yaş büyük. Darülfünun\'da edebiyat okuyordu; şiir yazardı. Kötü şiirler, abi; çok kötü. Ben okur gülerdim, o da gülerdi.',
            'On Dört\'ün Aralık\'ında Erzurum\'dan son mektubu geldi. Paltom güzel Nermin, yazmış. Yalnız astarı yok. Sen bana bir atkı ör, ama geç kalma.',
            'Bir hafta ördüm. Gece gündüz. Ocak\'ta postaya verdim. Şubat\'ta geri geldi; zarfın üstünde tek satır: Muhatap vefat etmiştir.',
            'Atkı hâlâ çekmecemde. Hiç takmadım. Sonra o paltoları kimin diktiğini, kimin sattığını, kimin taşıdığını aradım. Dört yıl. Hep bir gölge; bir müteahhit, bir komisyoncu, bir imza. Arkasında hep bir başkası.',
          ],
          secenekler: [
            {
              etiket: 'Geç kalmadın Nermin. Paltoyu diken geç kaldı.',
              sonra: 'sonra',
              cevap: 'Nermin sana uzun uzun bakıyor. Sonra kısa bir gülüş; sesinde dört yıllık bir çatlak. Bunu bana kimse söylememişti, diyor. Ben de kendime söylememiştim.',
            },
            {
              etiket: 'Bir şey söyleme. Kasadan bir harf al, onun yanına diz.',
              sonra: 'sonra',
              cevap: 'Ç harfini alıp Nermin\'in dizdiği satırın yanına koyuyorsun. Babanın döktüğü harf. Nermin ona bakıyor. Cevdet\'in adında Ç yok, diyor. Ama Çanakkale\'de var, Çankırı\'da var; çok ad var. Hepsini dizeceğim abi. Bir gün.',
            },
          ],
        },
        yemin: {
          soz: [
            'Nermin Pendle\'in mektubunun kopyasını alıp kasanın kenarına iğneliyor.',
            'Dört yıl bir gölge aradım, diyor. Şimdi bir adı var. Leventis, Santa Lucia, Aurora, Columbia. Her savaşta iki tarafa birden. Belki Cevdet\'in paltolarının kumaşı da onun gemisiyle geldi; belki gelmedi. Fark etmez artık.',
            'Sana soruyorum, çünkü bulduğumuz gün yanımda sen olacaksın: Ona ne yapacağız?',
          ],
          secenekler: [
            {
              etiket: 'Gazeteye. Herkes okusun; her limanda adı bilinsin.',
              etki: { bayrak: { nerminYemin: 'gazete' } },
              sonra: 'sonra',
              cevap: 'Nermin başını sallıyor. Kâğıt ölmez, diyor. Adam ölür, kâğıt kalır.',
            },
            {
              etiket: 'Bir hâkimin önüne. Kâğıtlarıyla, delilleriyle.',
              etki: { bayrak: { nerminYemin: 'mahkeme' }, artir: { rizaBag: 1 } },
              sonra: 'sonra',
              cevap: 'Nermin bir an duraksıyor. Rıza Bey gibi konuştun, diyor. Hangi hâkim? Hangi devletin? Sonra iç çekiyor. Peki. Bir hâkim bulacağız.',
            },
            {
              etiket: 'Bilmiyorum. Ama ne yaparsan yap, yalnız yapma.',
              etki: { bayrak: { nerminYemin: 'birlikte' }, artir: { nerminBag: 1 } },
              sonra: 'sonra',
              cevap: 'Nermin bir şey demiyor. Elini omzuna koyuyor; bir an. Sonra dizgi kasasına dönüyor. Yalnız yapmam, diyor. Söz.',
            },
          ],
        },
      },
    },
    riza: {
      ad: 'Rıza Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Rıza Bey şapkasının tozunu silkeliyor. Komisyoncular savaşta mantar gibi biter, diyor. Ama sahte vesika basan komisyoncu tek başına çalışmaz. Arkasında para var. Parayı bul.',
          secenekler: [{ etiket: 'Bulacağım.' }],
        },
      },
    },
    neslihan: {
      ad: 'Neslihan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Neslihan ipteki ıslak sayfalara bakıyor. Viyana\'da gazeteler bizi kötü yazıyordu, diyor. Burada herkes kendi gazetesini basıyor. Bir gün biri hepsini okuyup doğrusunu bulmalı.',
          secenekler: [{ etiket: 'Belki sen.' }],
        },
      },
    },
    tevfik20: {
      ad: 'Mehmet Tevfik',
      kosul: (d) => bayrak(d, 'tevfikKarar') === 'teslim',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Bir köşede, dizgi kasasının başında, ince, gözlüklü bir delikanlı: Mehmet Tevfik. Teslim edildikten sonra buraya gönderilmiş; Nermin onu dizgici yapmış. Sana bakmıyor. Harfleri diziyor; düzgün, yuvarlak bir el. Burada kimse bana soru sormuyor, diyor sonunda. Ben de kendime sormamaya çalışıyorum.',
          secenekler: [{ etiket: 'Kardeşini bulacağız Tevfik.' }],
        },
      },
    },
    katip20: {
      ad: 'Han kâtibi',
      giris: (d) => (delilVar(d, 'nuri_izi') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'İhtiyar kâtip gözlüğünü indiriyor. Oda mı lazım? Yok. Herkes cepheye giderken Ankara\'da kalıyor, ben de şaşıyorum.',
          secenekler: [
            {
              etiket: 'Bursalı bir Nuri Bey kalıyor mu burada?',
              etki: { delil: ['nuri_izi'] },
              sonra: 'sonra',
              cevap: 'Kâtip defterine bakıyor. Üst kat, köşe oda. Kibar adam; bahşişi bol. Her sabah istasyona gider, akşam döner, gece yarısına kadar yazı yazar. Kirayı İngiliz lirasıyla ödüyor; ben bozdurmaya Hacı Bayram\'a kadar gidiyorum. Şimdi istasyonda; öğleden önce dönmez.',
            },
          ],
        },
        sonra: {
          soz: 'Kâtip deftere bir şeyler yazıyor. Ben bir şey görmedim, diyor, sormadan. Her şeyi görürüm, hiçbir şey görmem.',
          secenekler: [{ etiket: 'Sağ ol efendi.' }],
        },
      },
    },
    cemil: {
      ad: 'Cemil Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'tevfikKarar') === 'cift'
              ? 'Cemil Bey bir sedyenin başında. Yanında on altı yaşında bir oğlan, kovayla su taşıyor. Bursa\'dan kaçmış, diyor Cemil Bey; adı Selim. Ağabeyi gümrükte kâtipmiş. Bizim taraftan biri ona bir mektup göndermiş; Tuzla\'ya git, kaç demiş. Kim gönderdi, bilmiyor. Bana bakıyor. Sen biliyorsun, değil mi?'
              : 'Cemil Bey bir sedyenin başında. Cephane treni gelmezse, diyor, bu çadırlar iki katına çıkar. Ben ancak gelenleri dikerim, Arif. Gelmesinler diye bir şey yapabilen sizsiniz.',
          secenekler: [{ etiket: 'Elimizden geleni yapıyoruz.' }],
        },
      },
    },
  },
};
