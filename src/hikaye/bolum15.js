// On beşinci bölüm: "Genel Kurul". Viyana, 15-17 Aralık 1919.
// Bankhaus Rainer'in olağanüstü genel kurulu. Kuruluş defterindeki öbür üç kurucu bankanın ortaklarıdır:
// A. V. Albert Vollmer (İsviçreli bankacı, %8), I. S. Kont Imre Szalay (Macar, %10), H. P. Sir Henry Pendle
// (İngiliz armatör, %8). Rainer %40, Rivière'in payı %34 (Neslihan'a kaldı; satıldıysa Rainer'de, bağışlandıysa vakıfta).
// Yeni oynanış: oy toplamak. Her kurucunun ayrı bir zaafı var; doğru kanıtla doğru kişiye gidilir.
// Arka plan (gerçek): 1919'da Macaristan'da kısa ömürlü bir sovyet cumhuriyeti kuruldu, ardından Budapeşte Romen
// işgaline uğradı; Viyana açlık içindeydi. Bütün kişiler, banka ve olaylar KURGUDUR.
import { BOLUM14 } from './bolum14';
import { bayrak, delilVar } from '../oyun/motor';

const PAYLAR = { vollmer: 8, szalay: 10, pendle: 8 };
const neslihanPayi = (d) => (bayrak(d, 'hisseKarar') === 'sat' ? 0 : 34);
const ikna = (d) => Object.keys(PAYLAR).filter((k) => bayrak(d, 'oy_' + k));
export const oyToplami = (d) => neslihanPayi(d) + ikna(d).reduce((t, k) => t + PAYLAR[k], 0);
const kanitVar = (d) => bayrak(d, 'defter14') !== 'kopya' || delilVar(d, 'fotograflar');
const sonucBul = (d) => (oyToplami(d) > 50 ? 'devrildi' : ikna(d).length >= 2 ? 'iflas' : 'kazandi');

export const BOLUM15 = {
  id: 'bolum15',
  ad: 'On beşinci bölüm: Genel Kurul',
  baslangic: 'acilis',
  ilkMekan: 'pansiyon',

  deliller: {
    ...BOLUM14.deliller,
    fotograflar: { ad: 'Kırk iki fotoğraf', tarif: 'Kessler\'in karanlık odasında basılmış kırk iki sayfa. Kuruluş defterinin her sayfası; kırmızı mürekkep griye dönmüş ama okunuyor.' },
    budapeste_satiri: { ad: 'Kırmızı sayfadaki satır', tarif: 'Neslihan\'ın okuduğu satır: Budapeşte, Nisan 1919, iki bin tüfek, kızıl hükümete. Aynı sayfada: Ağustos 1919, bin tüfek, karşı-devrimci subaylara. Aynı aracı.' },
  },

  cikarimlar: { ...BOLUM14.cikarimlar },

  olaylar: [],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'On beşinci bölüm bitti.' },
    { kosul: (d) => !kanitVar(d), metin: 'Defter Gubler\'de kaldı. Kessler\'in karanlık odasına git; fotoğrafları bastır.' },
    { kosul: (d) => ikna(d).length < 3 && !bayrak(d, 'genelKurulBasladi'), metin: 'Hotel Imperial\'de kurucuları tek tek gör: Vollmer, Kont Szalay, Sir Henry Pendle. Her birinin zaafı başka.' },
    { kosul: () => true, metin: 'Hazır olduğunda Bankhaus Rainer\'deki genel kurula git.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_viyana',
      efekt: ['tramvay'],
      baslik: '15 Aralık 1919, Viyana',
      paragraflar: (d) => [
        'Bir yıl sonra yine Viyana. Yine kar, yine aç kuyruklar, yine karanlık saraylar. Ama bu kez Frau Gruber kapıyı açınca gülümsüyor; soba yanıyor.',
        bayrak(d, 'defter14') === 'klara'
          ? 'Klara Rainer iki gün önce gelmiş. Defter onda; bir banka kasasında. Toplantıda masaya koyacak. Ama dedem tek başına oy veremez, diyor. Ortakları ikna etmelisiniz.'
          : bayrak(d, 'defter14') === 'kopya'
            ? 'Asıl defter Gubler aracılığıyla Rainer\'e döndü. Ama Nermin\'in kırk iki negatifi Kessler\'in karanlık odasında bekliyor.'
            : 'Defter Neslihan\'ın çantasında. Trende bir kez bile bırakmadı.',
        bayrak(d, 'hisseKarar') === 'sat'
          ? 'Neslihan hisselerini satmıştı; Rainer\'in elinde artık bankanın dörtte üçü var. Oyla devrilmez, diyor Kessler. Ama ortakları onu yalnız bırakırsa banka onunla birlikte batar.'
          : bayrak(d, 'hisseKarar') === 'bagis'
            ? 'Hisseler artık Eleni\'nin vakfının. Eleni İzmir\'den gelmiş; yorgun, ama oy kullanmaya kararlı. Hayatımda ilk kez bir banka toplantısına gireceğim, diyor. Bir ameliyattan farkı yoktur herhalde.'
            : 'Neslihan\'ın yüzde otuz dördü var. Rainer\'in yüzde kırkı. Aradaki yüzde yirmi altı, kuruluş defterindeki üç baş harfte.',
        'Kuruluş defterinin ilk sayfası: V. R., G. R., A. V., I. S., H. P. Kessler adları bir gecede buldu. Albert Vollmer: Zürih bankası. Kont Imre Szalay: Macar toprak sahibi. Sir Henry Pendle: İngiliz armatör. Üçü de genel kurul için Hotel Imperial\'de kalıyor.',
        'Toplantı iki gün sonra.',
      ],
      secenekler: [{ etiket: 'Pansiyona yerleş', etki: { mekan: 'pansiyon', bayrak: { 'gorüldü_pansiyon': true, ekip_cemil: true, ekip_nermin: true, ekip_riza: false } } }],
    },
    genel_kurul: {
      ortam: 'ortam_genelkurul',
      efekt: ['tokmak'],
      baslik: '17 Aralık, Bankhaus Rainer',
      paragraflar: (d) => {
        const oy = oyToplami(d);
        return [
          'Ceviz kaplı bir salon. Uzun bir masa. Şöminede ateş. Masanın başında Viktor Rainer; bir yıl önce Imperial\'deki kadar dimdik değil. Sağında Gubler.',
          'Kapıdan Neslihan giriyor. ' + (bayrak(d, 'hisseKarar') === 'bagis' ? 'Yanında Eleni Mavrou, vakfın başkanı olarak.' : bayrak(d, 'hisseKarar') === 'sat' ? 'Artık ortak değil; bir tanık olarak.' : 'Gaston Rivière\'in varisi olarak.') + ' Arkasında sen.',
          bayrak(d, 'defter14') === 'klara'
            ? 'Klara Rainer ayağa kalkıp kırmızı deri defteri masaya koyuyor. Dedesine bakmıyor. Ortaklara bakıyor.'
            : bayrak(d, 'defter14') === 'kopya'
              ? 'Nermin kırk iki fotoğrafı masaya bir iskambil destesi gibi açıyor. Rainer bir an gözlerini kapatıyor.'
              : 'Neslihan kırmızı deri defteri masaya koyuyor. Rainer onu tanıyor; bir zamanlar kendi eliyle yazdığı defteri.',
          'Rainer tokmağı vuruyor. Oylama: yönetim kurulu başkanının görevden alınması.',
          'Oylar sayılıyor. Rainer\'in yanında kalanlar ve karşısına geçenler. Görevden alınma lehine: yüzde ' + oy + '.',
          oy > 50
            ? 'Gubler önündeki kâğıtlara bakıyor; bir şey diyemiyor. Rainer tokmağı yavaşça masaya bırakıyor. Kırk yıl, diyor; kimseye değil.'
            : ikna(d).length >= 2
              ? 'Oylama Rainer\'in lehine bitiyor. Ama ikna ettiğin kurucular ayağa kalkıyor: paralarını, kredilerini, gemilerini bankadan çekiyorlar. Kâğıt üstünde kazanan Rainer; ama bankası bir öğleden sonrada boşalıyor.'
              : 'Oylama Rainer\'in lehine bitiyor. Kurucular bakışlarını kaçırıyor. Rainer gülümsüyor; yorgun, ama hâlâ Rainer.',
        ];
      },
      secenekler: [{ etiket: 'Devam', etki: (d) => ({ bayrak: { kurulSonu: sonucBul(d) } }), sonra: 'ring15' }],
    },
    ring15: {
      ortam: 'ortam_viyana',
      baslik: 'Ringstraße, akşam',
      paragraflar: (d) => {
        const s = bayrak(d, 'kurulSonu');
        return s === 'kazandi'
          ? [
              'Bankadan çıkarken Rainer seni kapıda durduruyor. Kazandım, diyor; ama sesi bir yenilginin sesi. Ortaklarım beni kurtardı; ama bir daha bana bakmayacaklar. Bir bankacı için bundan büyük ceza yok.',
              'Klara arkasından çıkıyor; elinde istifa mektubu. Dedesinin önünde duruyor. Seni çok sevdim, diyor. Şimdi seni tanıyorum. İkisi aynı şey değilmiş.',
              'Rainer torununun arkasından uzun uzun bakıyor. Sonra arabasına biniyor.',
            ]
          : [
              'Akşam Ringstraße karlı, bomboş. Rainer opera binasının önündeki bir bankta oturuyor; paltosuz. Adamları gitmiş, Gubler gitmiş. Yalnız.',
              'Yanına oturuyorsun. Bir süre ikiniz de bir şey söylemiyorsunuz. Sonra Rainer konuşuyor: 1908\'de Selanik\'te beş genç adamdık, diyor. İmparatorluklar yıkılacak, dedik. Haklıydık. Yıkıntıdan kazanacağız, dedik. Kazandık da. Sonra yıkıntı bizi de yuttu.',
              'Kessler\'in tanıdığı bir polis müfettişi köşede bekliyor. Kırmızı sayfalarda üç Avusturya bakanının adı var; yeni cumhuriyet bir suçlu arıyor. Bir işaretin yeter.',
            ];
      },
      secenekler: [
        { etiket: 'Müfettişe işaret et.', kosul: (d) => bayrak(d, 'kurulSonu') !== 'kazandi', etki: { bayrak: { rainerSonu: 'tutuklu' } }, sonra: 'son15' },
        { etiket: 'Kalk ve git. Bırak, kendi yıkıntısında kalsın.', kosul: (d) => bayrak(d, 'kurulSonu') !== 'kazandi', etki: { bayrak: { rainerSonu: 'yalniz' } }, sonra: 'son15' },
        { etiket: 'Devam', kosul: (d) => bayrak(d, 'kurulSonu') === 'kazandi', etki: { bayrak: { rainerSonu: 'serbest' } }, sonra: 'son15' },
      ],
    },
    son15: {
      ortam: 'ortam_oda',
      baslik: '24 Aralık 1919',
      paragraflar: (d) => [
        bayrak(d, 'rainerSonu') === 'tutuklu'
          ? 'Müfettiş Rainer\'in koluna giriyor; kelepçe takmıyor. Rainer başını eğip yürüyor. Ertesi gün bütün Viyana gazeteleri yazıyor: Bankacı Rainer tutuklandı; üç eski bakan sorgulanıyor.'
          : bayrak(d, 'rainerSonu') === 'yalniz'
            ? 'Rainer\'i bankta bırakıyorsun. Bir hafta sonra Kessler haber getiriyor: Rainer köşkünü satmış, Salzburg\'da bir manastırın misafirhanesine çekilmiş. Kimseyle konuşmuyormuş.'
            : 'Rainer bankasının başında kaldı. Ama Klara Viyana\'dan ayrıldı; Neslihan\'a bir adres bıraktı: Cenevre. Bir gün dedemi durduracak kâğıtlar bende, demiş.',
        'Noel arifesi. Bir yıl önce Selanik\'te, Rivière\'in köşkünde çanları dinliyordun. Şimdi Frau Gruber\'in mutfağında, sobanın başında.',
        'Frau Gruber oğlunun fotoğrafının önüne bir mum yakıyor. Eleni Cemil Bey\'le eski günleri konuşuyor. Nermin İstanbul\'a uzun bir telgraf yazıyor. Neslihan pencerede.',
        'Kessler bir haber getiriyor: Anadolu\'dan. Bir heyet Ankara\'ya gidiyormuş. İstanbul\'da İngilizlerin sabrı tükeniyormuş. Bir şeyler olacak, diyor. Büyük bir şey.',
        'Neslihan sana dönüyor. Eve gidelim abi, diyor. Babamız bekliyor. Ve Gaston\'un mektubunu ona okuyacağım.',
        'On beşinci bölümün sonu.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_oda',
      ortamOran: 0.45,
      baslik: 'On beşinci bölüm bitti',
      paragraflar: ['On altıncı bölüm yazılıyor: İstanbul, 1920 kışı. Kararların kaydedildi.'],
      secenekler: [{ etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    pansiyon: {
      ad: 'Frau Gruber\'in pansiyonu',
      ortam: 'ortam_oda',
      tarif: 'Josefstadt, dördüncü kat. Soba yanıyor; bu yıl kömür var. Duvarda siyah kurdeleli asker fotoğrafı.',
      nesneler: [
        {
          id: 'oy_cizelgesi',
          etiket: 'Nermin\'in oy çizelgesi',
          incele: (d) => {
            const oy = oyToplami(d);
            return 'Nermin bir kâğıda bankanın paylarını çizmiş. Rainer yüzde ' + (bayrak(d, 'hisseKarar') === 'sat' ? '74' : '40') + '. Görevden alınma için şu an elinizdeki oy: yüzde ' + oy + '. Yarıdan fazlası gerek. ' + (ikna(d).length ? 'İkna edilen kurucular: ' + ikna(d).map((k) => ({ vollmer: 'Vollmer', szalay: 'Szalay', pendle: 'Pendle' }[k])).join(', ') + '.' : 'Henüz kimse ikna edilmedi.');
          },
        },
      ],
      kisiler: ['neslihan', 'cemil', 'nermin', 'gruber15'],
      gecisler: [{ hedef: 'ring', etiket: 'Sokağa çık' }],
    },
    ring: {
      ad: 'Ringstraße',
      ortam: 'ortam_viyana',
      tarif: 'Karlı bulvar. Tramvaylar biraz daha sık geçiyor bu kış. Opera, parlamento, Imperial. Ve Am Hof\'ta, gri taşlı Bankhaus Rainer.',
      nesneler: [],
      kisiler: [],
      gecisler: [
        { hedef: 'kahve', etiket: 'Café Central\'e git' },
        { hedef: 'imperial', etiket: 'Hotel Imperial\'e git' },
        { hedef: 'pansiyon', etiket: 'Pansiyona dön' },
        { hedef: 'bankhaus', etiket: 'Genel kurula git', kosul: (d) => kanitVar(d) },
      ],
    },
    kahve: {
      ad: 'Café Central',
      ortam: 'ortam_kahve',
      tarif: 'Tonozlar, gazeteler, satranççılar. Kessler her zamanki köşesinde; bu kez piposu dolu.',
      nesneler: [
        {
          id: 'karanlik_oda',
          etiket: 'Kessler\'in karanlık odası',
          kosul: (d) => bayrak(d, 'defter14') === 'kopya',
          incele: (d) =>
            delilVar(d, 'fotograflar')
              ? 'Fotoğraflar bir zarfta, Nermin\'in çantasında.'
              : 'Kahvenin arkasında, Kessler\'in kiraladığı bir oda. Kırmızı lamba, banyolar, asılı kâğıtlar. Nermin bütün gece çalışıyor. Sabah kırk iki fotoğraf kurumaya asılı.',
          etki: (d) => (delilVar(d, 'fotograflar') ? null : { delil: ['fotograflar'] }),
        },
      ],
      kisiler: ['kessler15'],
      gecisler: [{ hedef: 'ring', etiket: 'Sokağa çık' }],
    },
    imperial: {
      ad: 'Hotel Imperial',
      ortam: 'ortam_otel',
      tarif: 'Bir yıl önce Kırmızı Salon\'a girdiğin otel. Lobide üç ayrı köşede üç yaşlı adam: biri gazete okuyor, biri pipo içiyor, biri pencereden karı seyrediyor.',
      nesneler: [],
      kisiler: ['vollmer', 'szalay', 'pendle'],
      gecisler: [{ hedef: 'ring', etiket: 'Sokağa çık' }],
    },
    bankhaus: {
      ad: 'Bankhaus Rainer',
      ilkSahne: 'genel_kurul',
      ortam: 'ortam_genelkurul',
      tarif: 'Ceviz kaplı salon boşalmış.',
      nesneler: [],
      kisiler: [],
      gecisler: [],
    },
  },

  kisiler: {
    vollmer: {
      ad: 'Albert Vollmer',
      giris: (d) => (bayrak(d, 'oy_vollmer') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Gazete okuyan adam: Albert Vollmer. Zürihli, altmış yaşlarında, kuru, temiz, kusursuz. Neslihan\'ı Zürih\'teki bankasından tanıyor; selamı buz gibi. Sizi dinliyorum, diyor; bir dakikanız var.',
          secenekler: [
            {
              etiket: 'Kasa 1908 sizin bankanızda. Kırmızı sayfalar orada saklandı.',
              kosul: (d) => kanitVar(d),
              etki: { bayrak: { oy_vollmer: true } },
              sonra: 'sonra',
              cevap: 'Vollmer gazetesini katlıyor. Bir İsviçre bankasının tek sermayesi sessizliğidir, diyor yavaşça. Eğer bu defter gazetelere çıkarsa, Banque Vollmer\'in sessizliği biter. Gözlüğünü çıkarıyor. Viktor bunu benim bankamda sakladı. Benim adımla. Bir an susuyor. Oyumu Viktor\'un aleyhine kullanacağım. Bankamı kurtarmak için. Vicdanımı değil; onu çoktan kaybettim.',
            },
            { etiket: 'Sonra konuşuruz.' },
          ],
        },
        sonra: {
          soz: 'Vollmer gazetesine dönmüş. Bir şey söylemiyor; başıyla selam veriyor.',
          secenekler: [{ etiket: 'İyi günler.' }],
        },
      },
    },
    szalay: {
      ad: 'Kont Imre Szalay',
      giris: (d) => (bayrak(d, 'oy_szalay') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Pipo içen adam: Kont Imre Szalay. Uzun boylu, eski bir süvari subayı, eski bir hayatın yıpranmış kıyafetleri içinde. Bu yıl Budapeşte\'de her şeyimi kaybettim, diyor; önce kızıllar, sonra Romenler. Bana bir bankanın ne önemi kaldı?',
          secenekler: [
            {
              etiket: 'Rainer Budapeşte\'de iki tarafa da silah sattı. İşte satır.',
              kosul: (d) => delilVar(d, 'budapeste_satiri'),
              etki: { bayrak: { oy_szalay: true } },
              sonra: 'sonra',
              cevap: 'Szalay kâğıdı alıyor; okurken eli titriyor. Nisan, diyor. Benim köyümü yakanlar. Ağustos, benim köyümü geri alanlar. Aynı tüfekler. Piposunu söndürüyor. Kardeşim Nisan\'da öldürüldü, diyor. Ben Viktor\'la aynı masada şarap içtim. Ayağa kalkıyor. Oyum Viktor\'un aleyhine. Ve bu, hayatımda verdiğim en kolay oy.',
            },
            { etiket: 'Sonra konuşuruz.' },
          ],
        },
        sonra: {
          soz: 'Szalay pencereden karı seyrediyor. Teşekkür ederim, diyor; nedenini söylemeden.',
          secenekler: [{ etiket: 'İyi günler.' }],
        },
      },
    },
    pendle: {
      ad: 'Sir Henry Pendle',
      giris: (d) => (bayrak(d, 'oy_pendle') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Pencereden karı seyreden adam: Sir Henry Pendle. Kırmızı yüzlü, tombul, kibar. İngiliz armatör. Gemilerim yalnızca yük taşır, diyor; Nermin çeviriyor. Ne taşıdıklarını sormam. Bir armatörün işi bu değil.',
          secenekler: [
            {
              etiket: 'Columbia\'nın otuz sandık altını ve Aurora\'nın makineli tüfekleri sizin sigortanızla taşındı.',
              kosul: (d) => delilVar(d, 'agir_sandik') || delilVar(d, 'aurora_adi'),
              etki: { bayrak: { oy_pendle: true } },
              sonra: 'sonra',
              cevap: 'Pendle\'in yüzü kızarıyor; sonra soluyor. Nermin ekliyor: İstanbul\'da İngiliz askerî polisinin tutanaklarında Columbia\'nın adı geçiyor; gazetelerde de. Londra\'da bir soruşturma açılırsa adınız ilk sayfada olur. Pendle uzun süre susuyor. Ben bir tüccarım, diyor sonunda. Bir tüccar batan gemiden iner. Oyum Viktor\'un aleyhine.',
            },
            { etiket: 'Sonra konuşuruz.' },
          ],
        },
        sonra: {
          soz: 'Pendle bir çay ısmarlıyor; sana da. İçmiyorsun.',
          secenekler: [{ etiket: 'İyi günler.' }],
        },
      },
    },
    kessler15: {
      ad: 'Franz Kessler',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Kessler piposunu yakıyor; bu kez gerçek tütün. Bir yıl önce bana bir paket tütün verdiniz, diyor. Bu yıl ben size üç ad verdim. Ödeşmedik daha; yazacağım haber o tütünden pahalı.',
          secenekler: [{ etiket: 'Sağ ol Kessler.' }],
        },
      },
    },
    gruber15: {
      ad: 'Frau Gruber',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'grubereVerdi')
              ? 'Frau Gruber sana bir fincan gerçek kahve uzatıyor. Geçen kış bana tütün bırakmıştınız, diyor; Neslihan çeviriyor. Bu kış benden.'
              : 'Frau Gruber sobaya odun atıyor. Geri döneceğinizi biliyordum, diyor. Dönenler hep bir şeyi bitirmeye döner.',
          secenekler: [{ etiket: 'Teşekkürler Frau Gruber.' }],
        },
      },
    },
    neslihan: {
      ad: 'Neslihan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Neslihan defterin kırmızı sayfalarını çeviriyor; ya da kafasında, ezberinden. Bu sayfalarda her şey var, diyor. Ama doğru kişiye doğru satırı göstermek gerek.',
          secenekler: [
            {
              etiket: 'Kırmızı sayfalarda Macaristan var mı?',
              kosul: (d) => kanitVar(d) && !delilVar(d, 'budapeste_satiri'),
              etki: { delil: ['budapeste_satiri'] },
              sonra: 'ilk',
              cevap: 'Neslihan bir sayfada duruyor. Budapeşte, diyor. Nisan 1919: iki bin tüfek, kızıl hükümete. Ağustos 1919: bin tüfek, karşı-devrimci subaylara. Aynı aracı. Başını kaldırıyor. Rainer orada da iki tarafa satmış, abi. Her yerde.',
            },
            { etiket: 'Hadi.' },
          ],
        },
      },
    },
    cemil: {
      ad: 'Cemil Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Cemil Bey gözlüğünü siliyor. Üç yaşlı adam, diyor. Her biri ayrı bir hastalık. Biri korkudan, biri yastan, biri hesaptan. Her birine ayrı ilaç.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
    nermin: {
      ad: 'Nermin Hanım',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Nermin oy çizelgesine bakıyor. Yarıdan fazla, diyor. Kalemi kulağının arkasına sıkıştırıyor. Bir gazeteciye ilk öğretilen şey hesaptır. İkincisi kimin neyden korktuğu.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
  },
};
