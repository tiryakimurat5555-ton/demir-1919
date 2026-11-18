// Otuz dördüncü bölüm: "Tebeşir". Ankara, 8-12 Haziran 1925. Cemil'in bölümü.
// Arka plan (gerçek): Cumhuriyetin ilk yıllarında sıtma ile mücadele; Ankara'da kinin dağıtımı. Gerçek kişiler ve kurumlar
// konuşturulmaz; hastane, firma ve ihale kurgudur.
// Kurgu: Cemil'in hastanesine gelen kinin tabletlerinin yarısı tebeşir. Tedarikçi "Anadolu Ecza Ticaret"; ortağı Sabit Bey
// (18. bölümde iki cepheye kinin satan müteahhit; kural 4). Parası Zürih'ten, Banque Vollmer'den (33. bölüm vollmerCek).
// Kalıbı kır: bir deney (tabletin sırrı), sonra bir yüzleşme, sonra bir rapor kararı.
// Karşılık verilen iplikler: cemilEleni, nerminImza, vollmerCek, sabitSonu, cemilRapor, cemilDefter.
// Yeni iplikler: nerminKorku, sabitSon34, cemilRapor34, vollmerAjan.
import { BOLUM33 } from './bolum33';
import { bayrak, cikarimVar, delilVar, sayi } from '../oyun/motor';

export const BOLUM34 = {
  id: 'bolum34',
  ad: 'Otuz dördüncü bölüm: Tebeşir',
  baslangic: 'acilis',
  ilkMekan: 'hastane34',

  deliller: {
    ...BOLUM33.deliller,
    sahte_kinin: {
      ad: 'Tebeşirli tablet',
      tarif: 'Suda eritilen kinin tabletinin dibinde beyaz bir tortu: tebeşir. Ağırlığı doğru, kabı doğru, etiketi doğru. Kinin yarı yarıya.',
    },
    ihale_kaydi: {
      ad: 'İhale kaydı',
      tarif: 'Nermin\'in gazete arşivinden: Sıtma kinini ihalesi, Mart 1925. Kazanan: Anadolu Ecza Ticaret. Fiyat öbür tekliflerin yarısı. İmza yetkilisi: S. Bey, Eskişehir.',
    },
    sevk_belgesi: {
      ad: 'Sevk belgesi',
      tarif: 'İstasyon deposunda: Kinin, Trieste\'den İzmir\'e, oradan trenle Ankara\'ya. Navlun ve gümrük peşin ödenmiş; Zürih\'teki bir bankanın çekiyle. Çekin üstünde iki harf: A. V.',
    },
    vollmer_ajani: {
      ad: 'Sabit Bey\'in söylediği ad',
      tarif: 'Bay Albrecht. İsviçreli, ecza mümessili olarak Hükümet Meydanı yakınında bir otelde kalıyor. Parayı o getiriyor, ihaleyi o ayarlıyor. Sabit Bey ona yalnızca imza atıyor.',
    },
  },

  cikarimlar: {
    ...BOLUM33.cikarimlar,
    tebesir: {
      a: 'sahte_kinin',
      b: 'ihale_kaydi',
      ad: 'Yarım kinin',
      metin: 'İhaleyi yarı fiyata kazanan firma, kinini yarıya indirip tebeşirle tamamlıyor. İmza yetkilisi S. Bey, Eskişehir. Sabit Bey.',
    },
    zurih_parasi: {
      a: 'ihale_kaydi',
      b: 'sevk_belgesi',
      ad: 'Zürih\'in parası',
      metin: 'Yarı fiyatın açığını Zürih kapatıyor: Banque Vollmer. Bursa\'da koza, Ankara\'da kinin. Vollmer bir devletin ilk yıllarına ortak olmaya çalışıyor.',
    },
  },

  olaylar: [
    { id: 'sabit', kosul: (d) => cikarimVar(d, 'tebesir') && cikarimVar(d, 'zurih_parasi'), etki: { sahne: 'sabit34' } },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Otuz dördüncü bölüm bitti.' },
    { kosul: (d) => !delilVar(d, 'sahte_kinin'), metin: 'Cemil Bey\'in dolabındaki kinin kutularına bak.' },
    { kosul: (d) => !delilVar(d, 'ihale_kaydi'), metin: 'Nermin\'in matbaasına git; ihaleyi sor.' },
    { kosul: (d) => !delilVar(d, 'sevk_belgesi'), metin: 'İstasyon deposuna bak.' },
    { kosul: () => true, metin: 'Soruşturma panosunda delilleri bağla.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_hastane',
      baslik: '8 Haziran 1925, Ankara',
      paragraflar: (d) => [
        'Cemil Bey\'in telgrafı üç kelimeydi: Gel. Kinin. Acele. Trenden indiğin akşam hastanenin koridorlarında titreyen insanlar: sıtma. Yazın ilk sıcakları bataklıkları uyandırmış.',
        {
          birlikte: 'Eleni hastanenin kadın koğuşunda. Ekimde gelmişti; şimdi Türkçesi Cemil\'inkinden hızlı. Seni görünce elini sıkıyor; yorgun, ama gülümsüyor.',
          mektup: 'Cemil Bey\'in masasında İskenderiye pullu bir mektup yığını; her ay bir tane. En üstteki açılmamış.',
          veda: 'Cemil Bey yalnız. Masasında hiçbir mektup yok. İskenderiye\'den sonra, diyor, işe gömüldüm. İyi bir mezar.',
        }[bayrak(d, 'cemilEleni')] || 'Cemil Bey yalnız; masası kâğıtla dolu.',
        'Cemil Bey sana bir kutu kinin uzatıyor. İki haftadır veriyorum, diyor. Kimse iyileşmiyor. Ya ben unuttum hekimliği, ya bu kutular yalan söylüyor.',
        {
          ad: 'Nermin Taşhan\'da; Cenevre yazısından beri kapısının önünde bir jandarma bekliyor. Seni istasyonda karşılamaya o gelmedi; jandarma geldi.',
          takma: 'Nermin Taşhan\'da; gazetesini imzasız çıkarıyor. İstasyonda seni o karşıladı; çantası mürekkep kokuyordu.',
        }[bayrak(d, 'nerminImza')] || 'Nermin Taşhan\'da, matbaasında.',
        bayrak(d, 'vollmerCek') === 'ifade'
          ? 'Cebinde Nuri Bey\'in Bursa\'da imzaladığı kâğıt: Zürih. A. V. Burada da aynı harfleri arayacaksın.'
          : bayrak(d, 'vollmerCek')
            ? 'Bursa\'daki koza çekleri aklında: Zürih. Burada da aynı izi arayacaksın.'
            : '',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'hastane34', bayrak: { ekip_cemil: true, ekip_nermin: true, ekip_riza: false } } }],
    },

    deney34: {
      ortam: 'ortam_hastane',
      ortamOran: 0.4,
      baslik: 'Laboratuvar',
      paragraflar: (d) => [
        'Cemil Bey\'in küçük laboratuvarı: bir terazi, bir ispirto ocağı, cam kaplar. Bir tablet masanın ortasında.',
        sayi(d, 'deneme34') >= 2
          ? 'Cemil Bey gözlüğünü çıkarıyor. Paris\'te hocam derdi ki: Yalanın ağırlığı doğrudur, rengi doğrudur. Yalan suya dayanamaz.'
          : 'Neyi deneyelim, diyor Cemil Bey.',
      ],
      secenekler: [
        {
          etiket: 'Tart. Doz eksikse ağırlıktan belli olur.',
          kosul: (d) => !bayrak(d, 'denendi_tart'),
          etki: { bayrak: { denendi_tart: true }, artir: { deneme34: 1 } },
          sonra: 'deney34_tart',
        },
        {
          etiket: 'Tadına bak. Kinin acıdır.',
          kosul: (d) => !bayrak(d, 'denendi_tat'),
          etki: { bayrak: { denendi_tat: true }, artir: { deneme34: 1 } },
          sonra: 'deney34_tat',
        },
        {
          etiket: 'Suda erit. Ne kalırsa, o.',
          etki: { delil: ['sahte_kinin'] },
          sonra: 'deney34_son',
        },
      ],
    },
    deney34_tart: {
      ortam: 'ortam_hastane',
      ortamOran: 0.4,
      baslik: 'Terazi',
      paragraflar: ['Cemil Bey tableti terazinin kefesine koyuyor. Yarım gram; tam. Ağırlık doğru, diyor. Demek ki eksik olan ağırlık değil. İçindeki.'],
      secenekler: [{ etiket: 'Başka bir şey dene', sonra: 'deney34' }],
    },
    deney34_tat: {
      ortam: 'ortam_hastane',
      ortamOran: 0.4,
      baslik: 'Tat',
      paragraflar: ['Dilinin ucuna dokunduruyorsun. Acı; ama tuhaf bir acı, yarıda kesilen. Cemil Bey de deniyor. Kinin bu kadar kibar değildir, diyor. Bunun yarısı başka bir şey.'],
      secenekler: [{ etiket: 'Başka bir şey dene', sonra: 'deney34' }],
    },
    deney34_son: {
      ortam: 'ortam_hastane',
      ortamOran: 0.4,
      baslik: 'Tortu',
      paragraflar: (d) => [
        'Cam kapta su bulanıyor; sonra duruluyor. Dipte beyaz bir tortu. Cemil Bey bir parmakla alıp kâğıda sürüyor; iz bırakıyor. Tebeşir, diyor. Bir okul tahtası.',
        bayrak(d, 'cemilRapor') === 'sitma'
          ? 'Cemil Bey sesini alçaltıyor. Yirmi Bir\'de bir esirin ölümünü sıtma diye yazmıştım, diyor. Şimdi sıtmalılarıma tebeşir veriyorlar. Bir hekimin yalanı bir gün böyle döner, Arif.'
          : bayrak(d, 'cemilRapor') === 'dogru'
            ? 'Cemil Bey sesini alçaltıyor. Yirmi Bir\'de Kostas için doğruyu yazmıştım, diyor. Bir kez yazdın mı, sonra hep yazarsın. Bunu da yazacağım.'
            : 'Cemil Bey tortuya uzun süre bakıyor. Kimin elinden geçti bu, diyor. Kimin kâğıdından.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'hastane34' } }],
    },

    sabit34: {
      ortam: 'ortam_buro',
      baslik: 'Anadolu Ecza Ticaret',
      paragraflar: (d) => [
        'Karaoğlan çarşısının arkasında, iki odalı bir yazıhane. Kapıda pirinç bir levha. İçeride, tombul, kır bıyıklı, kürk yakalı paltosunu haziranda bile çıkarmamış bir adam: Sabit Bey.',
        bayrak(d, 'sabitSonu') === 'teslim'
          ? 'Eskişehir\'de jandarmaya teslim etmiştiniz onu. Mahkeme iki yıl verdi, diyor; bir buçuğunu yattım. Çıkınca yeni bir devlet buldum, yeni bir ihale. Ben değişmedim beyler; devlet değişti.'
          : 'Eskişehir\'de konuşturmuştunuz onu; ağın adlarını vermişti, siz de onu bırakmıştınız. Size bir ad verdim, diyor. Siz bana bir hayat verdiniz. Ben de o hayatla bir firma kurdum.',
        'Kinin mi? Ben kinin bilmem. Ben imza bilirim. Fiyatı yarıya indirdim; devlet sevindi. Açığı biri kapattı; ben sormadım kim.',
        'Cemil Bey cam kabı masaya koyuyor; dipteki tortuyu. Sabit Bey\'in gülümsemesi tortuyu görünce kayboluyor.',
      ],
      secenekler: [
        {
          etiket: 'Mahkemeye. Bu kez kâğıtla, tortuyla, ihaleyle.',
          etki: { bayrak: { sabitSon34: 'mahkeme' } },
          sonra: 'sabit34_son',
        },
        {
          etiket: 'Açığı kim kapattı? Adını söyle; Zürih\'in adamını.',
          etki: { bayrak: { sabitSon34: 'itiraf' }, delil: ['vollmer_ajani'] },
          sonra: 'sabit34_son',
        },
        {
          etiket: 'Cemil Bey karar versin. Onun hastaları.',
          etki: { bayrak: { sabitSon34: 'cemil' }, artir: { cemilBag: 1 } },
          sonra: 'sabit34_son',
        },
      ],
    },
    sabit34_son: {
      ortam: 'ortam_buro',
      baslik: 'Levha',
      paragraflar: (d) => [
        {
          mahkeme: 'Jandarma geliyor. Sabit Bey paltosunu çıkarmadan gidiyor. Kapıda dönüyor: Bir sonraki ihalede başka biri olacak, diyor. Siz hep bir adım geride kalacaksınız.',
          itiraf: 'Sabit Bey uzun süre susuyor. Sonra bir ad söylüyor: Bay Albrecht. İsviçreli. Hükümet Meydanı yakınında bir otelde. Ecza mümessili diyor kendine. Ben yalnızca imza atarım; parayı o getirir. Jandarma kapıda.',
          cemil: (bayrak(d, 'cemilDefter') === 'durust'
            ? 'Cemil Bey Sabit\'e uzun süre bakıyor. Zürih\'te bir defterde benim adım da vardı, diyor; bir kırmızı sayfada. Ben kendimi affetmedim; seni de affetmeyeceğim. Ama seni asmayacağım da. '
            : 'Cemil Bey Sabit\'e uzun süre bakıyor. ') +
            'Mahkemeye gideceksin, diyor. Ama önce benim koğuşlarıma. Bir hafta, her gece, sıtmalı çocukların başında. Neyi sattığını gör. Sabit Bey ilk kez başını öne eğiyor.',
        }[bayrak(d, 'sabitSon34')] || '',
        'Pirinç levhayı Nermin söküyor; çantasına koyuyor. Gazetenin ilk sayfasına, diyor.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', sonra: 'rapor34' }],
    },
    rapor34: {
      ortam: 'ortam_hastane',
      ortamOran: 0.5,
      baslik: 'Rapor',
      paragraflar: (d) => [
        'Gece. Cemil Bey\'in odası. Masada boş bir kâğıt: Sıhhiye\'ye rapor. İhaleyi onaylayan iki memurun adı da yazılmalı; biri Cemil Bey\'in amiri.',
        'Adları yazarsam hastaneyi bana bırakmazlar, diyor Cemil Bey. Yazmazsam bir sonraki ihalede yine tebeşir gelir.',
        bayrak(d, 'cemilEleni') === 'birlikte'
          ? 'Eleni kapıda duruyor. İzmir\'de de böyle bir gece vardı, diyor; Cemil\'e değil, sana. O gece yazdı. Bu gece de yazacak; ben onu tanırım. Ama sor ona yine de.'
          : 'Cemil Bey kalemi eline alıyor, bırakıyor. Sana bakıyor; Eskişehir\'deki gibi.',
      ],
      secenekler: [
        {
          etiket: 'Adlarla yaz. Bir hekimin raporu bir hekimin raporudur.',
          etki: { bayrak: { cemilRapor34: 'adli' }, artir: { cemilBag: 1 } },
          sonra: 'son34',
        },
        {
          etiket: 'Adsız yaz. Tebeşiri yaz, firmayı yaz; memurları sonraya bırak. Hastane sende kalsın.',
          etki: { bayrak: { cemilRapor34: 'adsiz' } },
          sonra: 'son34',
        },
        {
          etiket: 'Raporu Nermin bassın. Gazete yazar; hekim iyileştirir.',
          etki: { bayrak: { cemilRapor34: 'gazete' }, artir: { nerminBag: 1 } },
          sonra: 'son34',
        },
      ],
    },
    son34: {
      ortam: 'ortam_istasyon',
      efekt: ['tren_duduk'],
      baslik: '12 Haziran 1925, istasyon',
      paragraflar: (d) => [
        {
          adli: 'Rapor Sıhhiye\'de. Üç gün sonra Cemil Bey\'in amiri İstanbul\'a tayin ediliyor; Cemil Bey yerinde kalıyor, şimdilik. Bir kez yazdın mı, diyor, sonra hep yazarsın.',
          adsiz: 'Rapor Sıhhiye\'de; firmanın adı var, memurların adı yok. Yeni kinin geliyor; bu kez gerçek. Cemil Bey koğuşları dolaşıyor; titreme azalıyor. Bir şeyi sakladım, diyor. Ama bir şeyi de kurtardım.',
          gazete: 'Taşhan ilk sayfasında: Sıtmalıya Tebeşir. Altında pirinç levhanın fotoğrafı. ' + (bayrak(d, 'nerminImza') === 'ad' ? 'Nermin\'in adıyla. Kapısındaki jandarma ertesi sabah iki kişi oluyor.' : 'İmzasız. Kim yazdığını herkes biliyor.'),
        }[bayrak(d, 'cemilRapor34')] || '',
        bayrak(d, 'nerminKorku') === 'istanbul'
          ? 'Nermin bir bavulla peronda. Kayıkhane bir süre benim büromdur, diyor. Gülce\'ye haber verdim.'
          : bayrak(d, 'nerminKorku') === 'kal'
            ? 'Nermin peronda seni uğurluyor; arkasında jandarma. Kalıyorum, diyor. Matbaa burada; harfler burada.'
            : 'Nermin peronda bir şey diyecek gibi oluyor; demiyor.',
        delilVar(d, 'vollmer_ajani')
          ? 'Cebinde bir ad: Bay Albrecht. Otelinden bu sabah ayrılmış; İzmir trenine binmiş. Zürih\'in adamı Anadolu\'da dolaşıyor.'
          : 'Zürih\'in parası Bursa\'da koza, Ankara\'da kinin oldu. Bir sonraki ne olacak, bilmiyorsun.',
        'Otuz dördüncü bölümün sonu.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: (d) => ({ bayrak: { bolumBitti: true, vollmerAjan: delilVar(d, 'vollmer_ajani') ? 'izmir' : 'bilinmiyor' } }), sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_istasyon',
      ortamOran: 0.45,
      baslik: 'Otuz dördüncü bölüm bitti',
      paragraflar: ['Kararların kaydedildi. Sırada otuz beşinci bölüm: İncir.'],
      secenekler: [
        { etiket: '35. bölüme geç', sonrakiBolum: 'bolum35' },
        { etiket: 'Ana menüye dön', anaMenu: true },
      ],
    },
  },

  mekanlar: {
    hastane34: {
      ad: 'Hastane',
      ortam: 'ortam_hastane',
      tarif: 'Yeni yapılmış iki katlı bir hastane; boya kokusu hâlâ duvarlarda. Koğuşlarda titreyen insanlar. Cemil Bey\'in odası ve küçük bir laboratuvar.',
      nesneler: [
        {
          id: 'dolap34',
          etiket: 'Kinin dolabı',
          incele: (d) =>
            delilVar(d, 'sahte_kinin')
              ? 'Kutular dolapta; artık hiçbirini açmıyorsunuz.'
              : 'Yüz kutu kinin. Etiketler düzgün, mühürler sağlam: Anadolu Ecza Ticaret. Cemil Bey bir tablet çıkarıyor. Laboratuvara gelin, diyor.',
          etki: (d) => (delilVar(d, 'sahte_kinin') ? null : { sahne: 'deney34' }),
        },
      ],
      kisiler: ['cemil34', 'eleni34'],
      gecisler: [
        { hedef: 'matbaa34', etiket: 'Taşhan\'a, Nermin\'in matbaasına' },
        { hedef: 'istasyon34', etiket: 'İstasyon deposuna' },
      ],
    },
    matbaa34: {
      ad: 'Taşhan, matbaa',
      ortam: 'ortam_matbaa',
      tarif: 'Taşhan\'ın alt katında Nermin\'in matbaası. Bir kasa harf; Ç, Ğ, Ş babanın döktükleri. Kapıda bir jandarma bekliyor ya da beklemiyor.',
      nesneler: [],
      kisiler: ['nermin34'],
      gecisler: [{ hedef: 'hastane34', etiket: 'Hastaneye dön' }],
    },
    istasyon34: {
      ad: 'İstasyon deposu',
      ortam: 'ortam_istasyon',
      tarif: 'Rayların yanında taş bir depo. Kâtip bir masanın başında; yükler, mühürler, sevk kâğıtları.',
      nesneler: [
        {
          id: 'sevk34',
          etiket: 'Sevk kâğıtları',
          incele: (d) =>
            delilVar(d, 'sevk_belgesi')
              ? 'Aynı kâğıtlar. A. V.'
              : 'Kâtip kâğıtları gösteriyor. Kinin, Trieste\'den İzmir\'e, oradan buraya. Ödeme peşin, Zürih\'ten bir çekle. Köşede iki harf: A. V.',
          etki: (d) => (delilVar(d, 'sevk_belgesi') ? null : { delil: ['sevk_belgesi'] }),
        },
      ],
      kisiler: [],
      gecisler: [{ hedef: 'hastane34', etiket: 'Hastaneye dön' }],
    },
  },

  kisiler: {
    cemil34: {
      ad: 'Cemil Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            [
              'Cemil Bey koğuşun kapısında bir çocuğun alnına elini koyuyor. Kırk derece, diyor. Kinin verdim; kinin olduğunu sandığım şeyi.',
              {
                teselli: 'Zürih\'te o kırmızı sayfayı gördüğümden beri her imzanın arkasında bir kalem arıyorum, diyor.',
                durust: 'Moda\'da Fikri\'ye bir soru sormuştum, diyor. Cevabı bende kaldı. Bir adam bir kâğıda imza atar; başka biri ölür.',
                sessiz: 'Zürih\'ten beri kâğıtlara bakamıyorum, diyor. Şimdi yine kâğıt.',
              }[bayrak(d, 'cemilDefter')] || '',
            ]
              .filter(Boolean)
              .join(' '),
          secenekler: [
            {
              etiket: 'Eleni nasıl?',
              sonra: 'eleni',
              cevap: (d) =>
                ({
                  birlikte: 'Cemil Bey gülümsüyor; ilk kez bu akşam. Benden iyi, diyor. Türkçe öğrendi; ben Rumcayı unuttum. Biz böyle bir çiftiz.',
                  mektup: 'Cemil Bey cebindeki zarfa dokunuyor. Bu ayın mektubu, diyor. Açmadım. Açarsam gitmek isteyeceğim; hastaneyi bırakamam.',
                  veda: 'Cemil Bey bir an susuyor. İskenderiye\'de veda ettik, diyor. Doğru olanı yaptık; doğru olan her zaman iyi gelmiyor.',
                }[bayrak(d, 'cemilEleni')] || 'Cemil Bey omuz silkiyor. Bilmiyorum, diyor.'),
            },
            { etiket: 'Kutulara bakalım.' },
          ],
        },
        eleni: {
          soz: 'Cemil Bey çocuğun yanından kalkıyor. Hadi, diyor. Önce kinin.',
          secenekler: [{ etiket: 'Hadi.' }],
        },
      },
    },
    eleni34: {
      ad: 'Dr. Eleni Mavrou',
      kosul: (d) => bayrak(d, 'cemilEleni') === 'birlikte',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Eleni kadın koğuşunda bir hastanın nabzını sayıyor. Cemil sana söylemez, diyor alçak sesle; ama korkuyor. Bu hastaneyi kaybetmekten değil. Bir kez daha bir kâğıdı yanlış imzalamaktan.',
          secenekler: [{ etiket: 'Biliyorum.' }],
        },
      },
    },
    nermin34: {
      ad: 'Nermin',
      giris: (d) => (delilVar(d, 'ihale_kaydi') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Nermin dizgi kasasının başında; parmakları mürekkepli. Kinin ihalesi mi? Mart\'ta yazmıştım, diyor; küçük bir haber. Kimse okumadı. Arşiv arkada.',
          secenekler: [
            {
              etiket: 'Arşive bakalım.',
              etki: { delil: ['ihale_kaydi'] },
              sonra: 'sonra',
              cevap: 'Nermin eski bir sayıyı açıyor. Anadolu Ecza Ticaret, diyor. Yarı fiyat. İmza: S. Bey, Eskişehir. Eskişehir, diyorsun. Kar, kağnılar, bir müteahhit. Nermin başını kaldırıyor. Sabit, diyor. Yirmi Bir.',
            },
          ],
        },
        sonra: {
          soz: (d) =>
            bayrak(d, 'nerminImza') === 'ad'
              ? 'Nermin kapıya bakıyor; jandarma orada, bir sandalyede, gazete okuyor. Beni korumak için mi, izlemek için mi, bilmiyorum, diyor. İkisi de aynı şey belki.'
              : 'Nermin bir harfi kasaya geri koyuyor; Ş. Babanın harfleri hâlâ en iyileri, diyor. Kimse bunları dökemez artık.',
          secenekler: [
            {
              etiket: 'İstanbul\'a gel. Kayıkhane senin de büron olur.',
              kosul: (d) => !bayrak(d, 'nerminKorku'),
              etki: { bayrak: { nerminKorku: 'istanbul' } },
              cevap: 'Nermin uzun süre bakıyor. Gülce izin verirse, diyor. Ve bu iş bitince.',
            },
            {
              etiket: 'Kal. Matbaa burada; harfler burada.',
              kosul: (d) => !bayrak(d, 'nerminKorku'),
              etki: { bayrak: { nerminKorku: 'kal' }, artir: { nerminBag: 1 } },
              cevap: 'Nermin gülüyor. Cevdet de böyle derdi, diyor. Kal; cephe burada.',
            },
            {
              etiket: 'Madalyayı sor.',
              kosul: (d) => !!bayrak(d, 'madalyaSonu') && !bayrak(d, 'nerminMadalya'),
              sonra: 'madalya',
            },
            { etiket: 'Sonra konuşuruz.' },
          ],
        },
        madalya: {
          soz: (d) =>
            ({
              nermin: 'Nermin çekmeceden bir zarf çıkarıyor; içinde senin madalyan. Kaptanın cenazesinden sonra geldi, diyor. Öbür yarıyı yaz demişsin. Oturdum; yazamadım. Ben Seddülbahir\'de değildim, Arif. Sen anlatırsan yazarım.',
              tak: 'Nermin kasadan başını kaldırmıyor. Kaptanın cenazesinde madalyayı göğsüne takmışsın, diyor. Gülce yazdı. Bir kez, demişsin. Yazdığım yarıyı hâlâ saklıyorum; öbür yarısı sende.',
              mezar: 'Nermin bir an duruyor. Madalyayı kaptanın kefenine koymuşsun, diyor. Gülce yazdı. İyi etmişsin. Ama benim yazdığım yarı hâlâ çekmecede; öbür yarısı toprakta mı kaldı, sende mi?',
            }[bayrak(d, 'madalyaSonu')] || 'Nermin madalyayı soruyor.'),
          secenekler: [
            {
              etiket: 'Anlat ona: Seddülbahir\'deki sabahı. Bir kez, baştan sona.',
              etki: (d) => ({ bayrak: { nerminMadalya: 'anlat' }, artir: { nerminBag: 1, travma: sayi(d, 'travma') > 0 ? -1 : 0 } }),
              sonra: 'sonra',
              cevap: 'Anlatıyorsun. Çıkarma sabahını, suyun rengini, yanındaki çocuğun adını. Nermin yazmıyor; dinliyor. Bitince kalemi alıyor. Şimdi yazabilirim, diyor. Sen bir daha anlatmak zorunda kalmayasın diye.',
            },
            {
              etiket: 'Yaz, ama adımı koyma. Herkesin sabahı olsun.',
              etki: { bayrak: { nerminMadalya: 'adsiz' } },
              sonra: 'sonra',
              cevap: 'Nermin başını sallıyor. Bir er, diyor; adsız. Cevdet de adsız öldü. Belki bu yazı ikisinin de olur.',
            },
            {
              etiket: 'Bırak. Madalya nerede kaldıysa orada kalsın.',
              etki: { bayrak: { nerminMadalya: 'birak' } },
              sonra: 'sonra',
              cevap: 'Nermin zarfı kapatıyor. Peki, diyor. Ama çekmece açık; ne zaman istersen.',
            },
          ],
        },
      },
    },
  },
};
