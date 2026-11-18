// Otuzuncu bölüm: "Tanıklar". Cenevre, 16-19 Haziran 1924.
// Arka plan (gerçek): Milletler Cemiyeti'nin kadın ve çocuk ticaretiyle ilgili danışma komitesi Cenevre'de toplanırdı.
// Bu bölümdeki oturum, dosya ve komite üyeleri KURGUDUR; gerçek kişiler konuşturulmaz. Komitenin polis gücü yoktur:
// yalnızca rapor yazar ve devletlere öneride bulunur.
// Kalıbı kır: bir bekleme ve ikna bölümü. Üç gün; her tanık kendi bedelini öder. ikna toplamı IKNA_ESIGI'ne ulaşırsa
// komite raporunda Ferrante'nin adı geçer. Kötü: Ferrante (1. bölümden), Bruno (26'dan).
// Karşılık verilen iplikler: ferranteKarar, melekTanik, fikriKarar (Kenan), cemilDefter (Cemil'in tanıklığı), neslihanAd
// (Neslihan hangi adla konuşur), nerminYemin (Nermin'in yazısı), klaraYardim / rainerSonu (Klara), yabanciGeldi (Bruno).
// Yeni iplikler: neslihanTanik, cemilTanik, kurulSonu30, brunoBilgi (Buenos Aires).
import { BOLUM29 } from './bolum29';
import { bayrak, delilVar, sayi } from '../oyun/motor';

export const IKNA_ESIGI = 5;
export const iknaToplami = (d) => sayi(d, 'ikna');
const klaraVar = (d) => !!bayrak(d, 'klaraYardim') || bayrak(d, 'rainerSonu') === 'serbest';
const ferranteSerbest = (d) => bayrak(d, 'ferranteKarar') !== 'cenevre';

export const BOLUM30 = {
  id: 'bolum30',
  ad: 'Otuzuncu bölüm: Tanıklar',
  baslangic: 'acilis',
  ilkMekan: 'otel30',

  deliller: {
    ...BOLUM29.deliller,
    fikri_ifadesi: {
      ad: 'Fikri\'nin yazılı ifadesi',
      tarif: 'Kadıköy savcılığına verilmiş ifadenin onaylı sureti: On yedi ad, sağlık dairesinin defterine "tifo" diye yazıldı. Listeyi ben yazdım; altını C. Ferrante imzaladı. Ben, Fikri, emekli binbaşı.',
    },
  },

  cikarimlar: { ...BOLUM29.cikarimlar },

  olaylar: [
    {
      id: 'bruno30',
      kosul: (d) => ferranteSerbest(d) && !!bayrak(d, 'melekGeldi'),
      etki: { sahne: 'bruno30' },
    },
    {
      id: 'oturum',
      kosul: (d) => !!bayrak(d, 'oturumaGit'),
      etki: { sahne: 'oturum30' },
    },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Otuzuncu bölüm bitti.' },
    { kosul: () => true, metin: (d) => 'Oturuma üç gün var. Tanıklarla konuş; her biri kendi kararını verecek. İkna: ' + iknaToplami(d) + ' / ' + IKNA_ESIGI + '.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_gol',
      baslik: '16 Haziran 1924, Cenevre',
      paragraflar: (d) => [
        'Leman Gölü sabah ışığında. Kıyıda, eski bir otelin içine yerleşmiş Milletler Cemiyeti; bayraklar, kâtipler, daktilo sesleri. Bir dünya mahkemesi değil, diyor Rıza Bey; bir dünya kâtipliği. Ama kâtiplerin yazdığı kalır.',
        {
          cenevre: 'Ferrante\'nin dosyası iki aydır komitenin önünde. Ferrante gelmedi; Napoli\'den bir avukat gönderdi, Signor Borghi. Borghi, belgelerin çalıntı ve sahte olduğunu yazmış.',
          polis: 'Ferrante serbest. Dosyayı Napoli\'den döner dönmez sen gönderdin. Ferrante gelmiş; göl kıyısındaki en pahalı otelde. Yanında avukatı Signor Borghi ve Bruno.',
          birak: 'Ferrante\'yi Napoli\'de bırakmıştın. Dosyayı sonra gönderdin; Ferrante öğrenmiş. Gelmiş; göl kıyısındaki en pahalı otelde. Yanında avukatı ve Bruno.',
        }[bayrak(d, 'ferranteKarar')] || 'Ferrante\'nin dosyası komitenin önünde.',
        klaraVar(d)
          ? 'Dosyayı Klara Rainer hazırladı. Dedesinin örgütünü belgelerle anlatmak, diyor, benim için bir tür vasiyet.'
          : 'Dosyayı Rıza Bey ile Nermin hazırladı; Nermin Ankara\'dan geldi, Fransızcası keskin, sabrı az.',
        'Komite tanık dinleyecek: üç gün sonra, tek bir oturum. Komite bir mahkeme değil; kimseyi tutuklayamaz. Ama raporunda bir ad geçerse, o ad her limanda okunur.',
        'Masada iki kâğıt: kırk yedinci sayfa, iki yarısı birleşmiş; ve Ferrante\'nin makbuz defteri. Kâğıtlar yetmez, diyor ' + (klaraVar(d) ? 'Klara' : 'Nermin') + '. Bir insanın sesi lazım.',
      ],
      secenekler: [
        {
          etiket: 'Otele yerleş',
          etki: (d) => ({
            mekan: 'otel30',
            delil: ['savci', 'kenan'].includes(bayrak(d, 'fikriKarar')) ? ['fikri_ifadesi'] : [],
            artir: { ikna: (delilVar(d, 'alt_yari') && delilVar(d, 'zarf') ? 1 : 0) + (delilVar(d, 'makbuz_defteri') ? 1 : 0) + (bayrak(d, 'fikriKarar') === 'savci' ? 1 : 0) },
            bayrak: { 'gorüldü_otel30': true, ekip_cemil: true, ekip_riza: true, ekip_nermin: true },
          }),
        },
      ],
    },

    neslihan_tanik: {
      ortam: 'ortam_gol',
      baslik: 'Kendi adıyla',
      paragraflar: (d) => [
        'Göl kıyısında bir bank. Neslihan dizlerini karnına çekmiş. Bir tanık lazım, demişler, diyor. Ben bir tanığım abi. On birinci satır.',
        'Ama konuşursam adım bir raporda yazılacak. Viyana. Rivière. Her şey. Herkes okuyacak; babam da. Gazeteler de.',
        {
          baba: 'İsmail kızı Neslihan diye konuşurum, diyor. Babamın adıyla. Bu adı yeni aldım; ilk işi bu olsun.',
          iki: 'Hangi adla konuşacağım? Rivière\'in adı orada yazılı; benim adım da. Belki ikisiyle. Belki ikisi aynı kâğıtta yan yana durursa bir şey düzelir.',
          kendi: 'Kalaycının kızı Neslihan diye konuşurum, diyor. Selanik\'te Emine\'ye söylediğim ad. Kendi seçtiğim ad.',
        }[bayrak(d, 'neslihanAd') || bayrak(d, 'neslihanAdSoyledi')] || 'Hangi adla konuşacağımı bile bilmiyorum.',
        bayrak(d, 'neslihanTavsiye') === 'ben'
          ? 'Marsilya\'da kapıda durdun, diyor. Burada da durur musun? Yoksa bu kapıdan yalnız mı girmeliyim?'
          : 'Sen ne dersin abi?',
      ],
      secenekler: [
        {
          etiket: 'Konuş. Adınla. Ben arkandayım.',
          etki: { bayrak: { neslihanTanik: 'evet' }, artir: { ikna: 2, neslihanBag: 1 } },
          sonra: 'neslihan_tanik_son',
        },
        {
          etiket: 'Konuşma. Sen yeterince ödedin. Kâğıtlar ve öbür tanıklar yeter.',
          etki: { bayrak: { neslihanTanik: 'hayir' } },
          sonra: 'neslihan_tanik_son',
        },
        {
          etiket: 'Ben söyleyemem. Bu senin kararın.',
          etki: (d) => ({ bayrak: { neslihanTanik: sayi(d, 'neslihanBag') >= 3 ? 'evet' : 'hayir' }, artir: { ikna: sayi(d, 'neslihanBag') >= 3 ? 2 : 0 } }),
          sonra: 'neslihan_tanik_son',
        },
      ],
    },
    neslihan_tanik_son: {
      ortam: 'ortam_gol',
      baslik: 'Kendi adıyla',
      paragraflar: (d) => [
        bayrak(d, 'neslihanTanik') === 'evet'
          ? 'Neslihan kalkıyor; eteğini düzeltiyor. Konuşacağım, diyor. Bir kez. Sonra bir daha hiç anlatmayacağım; ama bir kez, herkesin önünde.'
          : 'Neslihan başını sallıyor. Bu sefer değil, diyor. Belki bir gün. Belki bir kitap olur; Nermin yazar. Ama bir komitenin önünde değil.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'otel30' } }],
    },

    cemil_tanik: {
      ortam: 'ortam_lozan_otel',
      baslik: 'Kaza',
      paragraflar: (d) => [
        'Cemil Bey otelin kütüphanesinde, bir masada; önünde boş bir kâğıt. Komite benden bir şey istemedi, diyor. Ama ben bir şey biliyorum.',
        'O kızların aileleri tifo yazısına inandı. Neden inandılar? Çünkü aynı aylarda, aynı dairede, iki yüz ceset için kaza yazan bir hekim vardı; adı Cemil. Fikri\'nin yalanı benim yalanlarımın arasına saklandı.',
        bayrak(d, 'cemilDefter') === 'durust'
          ? 'Bunu Eleni\'ye yazmıştım, diyor. Şimdi bir komiteye yazacağım. Kendi adımla. İzin istemiyorum, Arif. Sadece bil istedim.'
          : 'Bunu yazarsam, diyor, Ankara\'daki hastanemde bir daha kimse yüzüme aynı bakmaz. Yazmazsam, ben bir daha kendi yüzüme bakamam. Sen söyle.',
      ],
      secenekler: [
        {
          etiket: 'Yaz, Cemil Bey. Kendi adınla.',
          etki: { bayrak: { cemilTanik: true }, artir: { ikna: 1, cemilBag: 1 } },
          sonra: 'cemil_tanik_son',
        },
        {
          etiket: 'Bu senin yükün; bu oturumun değil. Yazma.',
          kosul: (d) => bayrak(d, 'cemilDefter') !== 'durust',
          etki: { bayrak: { cemilTanik: false } },
          sonra: 'cemil_tanik_son',
        },
      ],
    },
    cemil_tanik_son: {
      ortam: 'ortam_lozan_otel',
      baslik: 'Kaza',
      paragraflar: (d) => [
        bayrak(d, 'cemilTanik')
          ? 'Cemil Bey yazıyor; hekim harfleriyle, hızlı. Kasım 1912, Selanik sağlık dairesi. Bitirince imzalıyor; uzun uzun imzasına bakıyor. Hiç bu kadar yavaş imza atmamıştım, diyor.'
          : 'Cemil Bey kâğıdı katlayıp cebine koyuyor. Peki, diyor. Ama cebimde dursun. Bir gün çıkar.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'otel30' } }],
    },

    bruno30: {
      ortam: 'ortam_lozan_otel',
      baslik: 'Koridor',
      paragraflar: (d) => [
        'Gece yarısı. Otelin üçüncü kat koridoru. Melek\'in kapısının önünde bir adam: Bruno. Kapıyı çalmıyor; sadece duruyor. Kapının altından ışık sızıyor.',
        bayrak(d, 'yabanciGeldi') ? 'Selanik vapurundan, Moda\'dan, Napoli\'den beri aynı adam. Sanki dört limandır aynı koridorda bekliyor.' : '',
        'Seni görüyor. Bu kez gülümsüyor; ilk kez. Signor Ferrante selam söylüyor, diyor kırık bir Fransızcayla. Hanımefendiye. Marsilya\'daki okul çok güzelmiş.',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Rıza Bey\'i çağır. Koridorun öbür ucunda uyumuyor.',
          etki: { bayrak: { bruno30: 'riza' } },
          sonra: 'bruno30_son',
        },
        {
          etiket: 'Melek\'i hemen başka bir otele taşı. Klara\'nın evine.',
          kosul: (d) => klaraVar(d),
          etki: { bayrak: { bruno30: 'tasindi' } },
          sonra: 'bruno30_son',
        },
        {
          etiket: 'Bruno\'yla konuş. Ne istiyor? Ferrante ne istiyor?',
          etki: { bayrak: { bruno30: 'konustu', brunoBilgi: true } },
          sonra: 'bruno30_son',
        },
      ],
    },
    bruno30_son: {
      ortam: 'ortam_lozan_otel',
      baslik: 'Koridor',
      paragraflar: (d) => [
        {
          riza: 'Rıza Bey koridorda belirdiğinde Bruno çoktan merdivende. Rıza Bey Melek\'in kapısının önüne bir sandalye çekiyor; sabaha kadar orada oturuyor. Melek sabah kapıyı açınca onu görüyor. Ağlamıyor; sadece bir çay getiriyor.',
          tasindi: 'Gece yarısı bir arabayla Melek\'i Klara\'nın evine götürüyorsunuz. Melek arabada hiç konuşmuyor. Kapıda Klara bir şal uzatıyor. Burada kimse sizi bulamaz, diyor; ben de bulunamamayı bir avukattan öğrendim.',
          konustu: 'Bruno omuz silkiyor. Ben bir işçiyim, diyor. Signor Ferrante oturumdan sonra gidiyor. Buenos Aires. Orada bir yeğeni var, bir şirketi var, bir limanı var. Bu hanımlar konuşursa giderken öfkeli gider. Konuşmazsa sessizce. Hepsi bu. Sonra merdivenden iniyor; acele etmeden.',
        }[bayrak(d, 'bruno30')] || '',
        'Melek ertesi sabah kahvaltıya iniyor. Hâlâ konuşacağım, diyor. Daha çok konuşacağım.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'otel30' } }],
    },

    oturum30: {
      ortam: 'ortam_genelkurul',
      efekt: ['tokmak'],
      baslik: '19 Haziran 1924, komite salonu',
      paragraflar: (d) => [
        'Uzun bir masa; yeşil çuha. Karşısında dokuz kişi: bir Danimarkalı hanım, bir İngiliz hekim, bir İtalyan diplomat, bir Japon hukukçu. Kenarda kâtipler. Arkada, iki sıra ötede, Signor Borghi.',
        'Önce kâğıtlar. Kırk yedinci sayfa, iki yarısı birleşmiş. Makbuz defteri. Borghi kalkıyor: Çalıntı belgeler, sahte imzalar. Komite başkanı not alıyor; yüzü bir şey söylemiyor.',
        ['savci', 'kenan'].includes(bayrak(d, 'fikriKarar'))
          ? (bayrak(d, 'fikriKarar') === 'kenan' && bayrak(d, 'kenanTanik')
            ? 'Sonra Kenan Bey kalkıyor. Babamın oğluyum, diyor. Babamın el yazısını kendi el yazımdan iyi tanırım. Bu liste onun eli. Borghi oturuyor.'
            : 'Sonra Fikri\'nin Kadıköy savcılığına verdiği ifadenin sureti okunuyor. Borghi itiraz ediyor; kör bir ihtiyarın sözü, diyor. Başkan itirazı not alıyor.')
          : '',
        bayrak(d, 'cemilTanik') ? 'Cemil Bey\'in yazısı okunuyor: Kasım 1912, Selanik sağlık dairesi, kaza ve tifo. İngiliz hekim gözlüğünü çıkarıyor; uzun uzun Cemil Bey\'e bakıyor. Cemil Bey bakışını kaçırmıyor.' : '',
        bayrak(d, 'melekTanik') ? 'Melek kalkıyor. Madeleine diye değil, Melek diye konuşuyor; Florinalı. Ambarı, çeneleri tutan eli, Rahel\'in ninnisini anlatıyor. Borghi itiraz etmiyor. Kimse itiraz etmiyor.' : '',
        bayrak(d, 'neslihanTanik') === 'evet'
          ? 'Sonra Neslihan. On birinci satır, diyor; benim. Sesi titremiyor. Viyana\'yı, kütüphaneyi, Rivière\'i anlatıyor; nefretle değil, düzgün cümlelerle. Bitirince Danimarkalı hanım kalemini bırakıyor.'
          : '',
        bayrak(d, 'nerminYazdi') ? 'Salonun dışında, koridorda, sabahki gazeteler: Nermin\'in yazısı Fransızca bir gazetede çıkmış. Kâtipler okuyor.' : '',
        'İkna: ' + iknaToplami(d) + ' / ' + IKNA_ESIGI + '. Başkan tokmağı vuruyor.',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Kararı dinle',
          etki: (d) => ({ bayrak: { kurulSonu30: iknaToplami(d) >= IKNA_ESIGI ? 'ad' : 'genel' } }),
          sonra: 'oturum30_son',
        },
      ],
    },
    oturum30_son: {
      ortam: 'ortam_gol',
      baslik: 'Rapor',
      paragraflar: (d) => [
        bayrak(d, 'kurulSonu30') === 'ad'
          ? 'Komitenin raporu: Selanik, Kasım 1912; on yedi kız; teslim eden ve bedeli alan C. Ferrante, Ferrante e Soci, Napoli. Komite İtalya hükümetine kovuşturma önerir; bütün liman makamlarına adın bildirilmesini önerir. Ferrante\'nin adı artık her limanda okunacak.'
          : 'Komitenin raporu: Akdeniz limanlarında 1912-1914 yıllarında kadın ticaretine dair ciddi belgeler sunulmuştur; komite üye devletlere dikkat önerir. Ad yok. Borghi salondan çıkarken şapkasını size doğru hafifçe kaldırıyor.',
        bayrak(d, 'brunoBilgi') || bayrak(d, 'kurulSonu30') === 'ad'
          ? 'Ertesi sabah Ferrante\'nin oteli boş. Cenova\'dan kalkan bir gemi: Buenos Aires. Bruno\'nun söylediği gibi.'
          : 'Ertesi sabah Ferrante\'nin oteli boş. Nereye gittiğini kimse bilmiyor.',
        'Neslihan göl kıyısında, makbuz defterini açmış. On dört ad kaldı, diyor. Rahel, İskenderiye. Oradan başlayalım.',
        'Otuzuncu bölümün sonu.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_gol',
      ortamOran: 0.45,
      baslik: 'Otuzuncu bölüm bitti',
      paragraflar: ['Kararların kaydedildi.'],
      secenekler: [{ etiket: 'Otuz birinci bölüme geç', sonrakiBolum: 'bolum31' }, { etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    otel30: {
      ad: 'Göl kıyısındaki otel',
      ortam: 'ortam_lozan_otel',
      tarif: (d) => 'Küçük, temiz bir otel. Lobide kimse kimseye bakmıyor. Pencereden göl. Oturuma üç gün var. İkna: ' + iknaToplami(d) + ' / ' + IKNA_ESIGI + '.',
      nesneler: [
        {
          id: 'oturuma_git',
          etiket: 'Oturum günü: komite salonuna git',
          kosul: (d) => !!bayrak(d, 'neslihanTanik') && !bayrak(d, 'oturumaGit'),
          incele: 'Üçüncü günün sabahı. Göl dümdüz.',
          etki: { bayrak: { oturumaGit: true } },
        },
      ],
      kisiler: ['neslihan30', 'cemil30', 'melek30', 'kenan30', 'nermin30', 'klara30', 'riza30'],
      gecisler: [],
    },
  },

  kisiler: {
    neslihan30: {
      ad: 'Neslihan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) => (bayrak(d, 'neslihanTanik') ? 'Neslihan pencerede, göle bakıyor. Karar verdim, diyor. Artık sadece bekliyorum.' : 'Neslihan kapıda. Göle inelim mi abi? Konuşmamız lazım.'),
          secenekler: [
            { etiket: 'İnelim.', kosul: (d) => !bayrak(d, 'neslihanTanik'), etki: { sahne: 'neslihan_tanik' } },
            { etiket: 'Bekleyelim.', kosul: (d) => !!bayrak(d, 'neslihanTanik') },
          ],
        },
      },
    },
    cemil30: {
      ad: 'Cemil Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) => (bayrak(d, 'cemilTanik') !== undefined ? 'Cemil Bey bir gazete okuyor; tersten tuttuğunu fark etmeden.' : 'Cemil Bey kütüphaneye doğru yürüyor. Bir dakikan var mı, diyor.'),
          secenekler: [
            { etiket: 'Var.', kosul: (d) => bayrak(d, 'cemilTanik') === undefined, etki: { sahne: 'cemil_tanik' } },
            { etiket: 'Sonra.', kosul: (d) => bayrak(d, 'cemilTanik') !== undefined },
          ],
        },
      },
    },
    melek30: {
      ad: 'Melek',
      kosul: (d) => !!bayrak(d, 'melekTanik'),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'melekGeldi')
              ? 'Melek bir defterin kenarına çocuklarına mektup yazıyor. Madame Madeleine iki gün yok, diyor; Cenevre\'de. Ne yaptığımı onlara bir gün anlatırım.'
              : 'Melek trenden iniyor; küçük bir valiz, bir şapka. Geldim, diyor. Ama ellerimi tutun; titriyorlar.',
          secenekler: [
            {
              etiket: 'Ellerini tut.',
              kosul: (d) => !bayrak(d, 'melekGeldi'),
              etki: { bayrak: { melekGeldi: true }, artir: { ikna: 2 } },
              cevap: (d) =>
                bayrak(d, 'melekKarar') === 'anne'
                  ? 'Melek ellerini bırakmıyor. Tekirdağ\'a yazdım, diyor. Annem cevap yazdı; birine yazdırmış, kendisi okuma bilmez. Tek satır: Kızım, ölmemişsin. Ben de konuşacağım; annem için.'
                  : 'Melek ellerini bırakmıyor. Konuşacağım, diyor. Rahel için. Ve çenesi tutulan herkes için.',
            },
            { etiket: 'Dinlen.', kosul: (d) => !!bayrak(d, 'melekGeldi') },
          ],
        },
      },
    },
    kenan30: {
      ad: 'Kenan Bey',
      kosul: (d) => bayrak(d, 'fikriKarar') === 'kenan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'kenanTanik')
              ? 'Kenan bir avukat cüppesini değil, kır paltosunu giymiş. Hazırım, diyor.'
              : 'Kenan Bey lobide, elinde babasının ifadesi. Babam bunu yazdı, diyor. Ama bir kör ihtiyarın sözü derler. Ben kalkarsam, babamın el yazısını tanıyan bir oğul kalkar. Kalkayım mı?',
          secenekler: [
            {
              etiket: 'Kalk. Babanın yazısını sen tanı.',
              kosul: (d) => !bayrak(d, 'kenanTanik'),
              etki: { bayrak: { kenanTanik: true }, artir: { ikna: 2 } },
              cevap: 'Kenan başını sallıyor. Babama söyledim, diyor. Hiçbir şey demedi. Sonra elimi tuttu. Bunu da bir cevap saydım.',
            },
            { etiket: 'Sağ ol Kenan Bey.' },
          ],
        },
      },
    },
    nermin30: {
      ad: 'Nermin',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'nerminYazdi') !== undefined
              ? 'Nermin daktilosunun başında. Gerisi komitenin, diyor.'
              : [
                  'Nermin daktilosunu masaya koyuyor. Bir Fransız gazetesinde arkadaşım var, diyor. Oturumdan önce yazarsam komite bir gazetenin baktığını bilir. Ama Ferrante de bilir; yeni dostları da.',
                  bayrak(d, 'nerminYemin') ? 'Pendle için bir yemin etmiştik, diyor. Bu da o yeminin devamı.' : 'Yazayım mı?',
                ],
          secenekler: [
            {
              etiket: 'Yaz. Gölün öbür yakası da okusun.',
              kosul: (d) => bayrak(d, 'nerminYazdi') === undefined && sayi(d, 'nerminBag') < 3,
              etki: { bayrak: { nerminYazdi: true }, artir: { ikna: 1 } },
              cevap: 'Nermin yazıyor; tuşlar bir yağmur gibi. Başlığı Fransızca: Kırk Yedinci Sayfa.',
            },
            {
              etiket: 'Yaz. Gölün öbür yakası da okusun.',
              kosul: (d) => bayrak(d, 'nerminYazdi') === undefined && sayi(d, 'nerminBag') >= 3,
              etki: { bayrak: { nerminYazdi: true }, artir: { ikna: 1 } },
              sonra: 'imza',
            },
            {
              etiket: 'Bekle. Oturumdan sonra yaz.',
              kosul: (d) => bayrak(d, 'nerminYazdi') === undefined,
              etki: { bayrak: { nerminYazdi: false } },
              cevap: 'Nermin daktiloyu kapatıyor. Peki, diyor. Ama oturumdan sonra bir gece bile beklemem.',
            },
            { etiket: 'Hadi Nermin.', kosul: (d) => bayrak(d, 'nerminYazdi') !== undefined },
          ],
        },
        imza: {
          soz: (d) =>
            [
              'Nermin ilk paragrafı yazıyor, sonra duruyor. Sana dönüyor. Altı yıldır takma adla yazıyorum, diyor. İstanbul\'da tek bir harf, Ankara\'da Taşhan\'ın adı. Bunu kendi adımla yazmak istiyorum: Nermin, Sarıkamış\'ta donan Cevdet\'in kız kardeşi. Ferrante\'nin adamları adımı öğrenir; Ankara\'da da sevmeyenler olur.',
              bayrak(d, 'madalya') === 'anlat'
                ? 'Cevdet\'in madalyası hâlâ çantamda, diyor. Ağabeyim adını saklamazdı.'
                : 'Sen bana hep doğruyu söyledin, diyor. Şimdi sen söyle.',
            ].join(' '),
          secenekler: [
            {
              etiket: 'Kendi adınla yaz. Senin sesin bu.',
              etki: { bayrak: { nerminImza: 'ad' }, artir: { nerminBag: 1 } },
              cevap: 'Nermin son satıra adını yazıyor; harf harf, yavaş. Başlığı Fransızca: Kırk Yedinci Sayfa. Altında: Nermin, Cevdet\'in kız kardeşi, İstanbul.',
            },
            {
              etiket: 'Takma adla yaz. Seni daha çok yazı bekliyor.',
              etki: { bayrak: { nerminImza: 'takma' } },
              cevap: 'Nermin başını sallıyor; bir an kırgın, sonra değil. Haklısın, diyor. Ölü bir gazeteci yazamaz. Altına tek bir harf: N.',
            },
          ],
        },
      },
    },
    klara30: {
      ad: 'Klara Rainer',
      kosul: (d) => klaraVar(d),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Klara dosyayı karıştırıyor; kenarlarına kurşun kalemle notlar almış. Komite kâğıda değil, insana inanır, diyor. Borghi kâğıtları sahte diye çürütür. Bir kişinin yüzünü çürütemez. Kimi getirebilirseniz getirin.',
          secenekler: [{ etiket: 'Sağ ol Klara.' }],
        },
      },
    },
    riza30: {
      ad: 'Rıza Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'rizaKorku') === 'fark'
              ? 'Rıza Bey göl kıyısında yürüyor; bastonu yok, sadece elleri arkasında. Bu sefer delille, diyor. Kırk yıl önce öğrenmem gerekirdi; şimdi öğretiyorum. Komiteye.'
              : 'Rıza Bey lobide gazete okuyor; Fransızcasını hecelerken dudakları kıpırdıyor. Bir dünya kâtipliği, diyor yine. Kâtipler iyidir. Kâtipler unutmaz.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
  },
};
