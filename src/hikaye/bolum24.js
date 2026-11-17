// Yirmi dördüncü bölüm: "Baston". İstanbul, 6 Ekim 1923 - 29 Ekim 1923.
// Arka plan (gerçek): İtilaf askerleri Ekim 1923 başında İstanbul'dan ayrıldı; 6 Ekim'de Türk birlikleri kente girdi ve
// kent bayram yaptı; 29 Ekim 1923'te cumhuriyet ilan edildi. Yalnızca arka plan; gerçek kişiler kurguya karışmaz.
// Kurgu: Dr. Gubler (14. ve 16. bölümde ekildi; Rainer'in avukatıydı, şimdi Vollmer'e çalışıyor) bayram kalabalığında
// Ohannes'in hanından Rivière'in mektubunu çalar. Mektup, "bedeli ödendi" satırıyla Banque Vollmer'in 1912'deki ödemesini
// gösteriyor; Vollmer'in elinde kalmasını istemediği son kâğıt.
// Yeni oynanış: kulakla takip. Dört kavşak; her birinde sesler anlatılır, Gubler'in demir uçlu bastonu (efekt baston)
// çalar; doğru yönü seslerden çıkarırsın. İki kez yanılırsan izini kaybedersin.
// Karşılık verilen iplikler: vollmerSonu, kemalKalir, babaItiraf, cocukKarar, neslihanAd, rizaSon22, travma (ve 1. bölümün
// ilkNefes'i: "Nefesini say"). Yeni iplikler: takipSonu, gublerSonu, mektupKarar, babaYaninda.
import { BOLUM23 } from './bolum23';
import { bayrak, sayi } from '../oyun/motor';

export const KAYIP_SINIRI = 2;

const zehraBurada = (d) => bayrak(d, 'cocukKarar') === 'yanina';
const rizaGelir = (d) => !['emekli', 'kirgin'].includes(bayrak(d, 'rizaSon22'));

// Bir kavşak seçeneği: doğruysa kayıp yok; yanlışsa kayip +1.
const yon = (etiket, dogruMu, sonra) => ({ etiket, etki: dogruMu ? {} : { artir: { kayip: 1 } }, sonra });

export const BOLUM24 = {
  id: 'bolum24',
  ad: 'Yirmi dördüncü bölüm: Baston',
  baslangic: 'acilis',
  ilkMekan: 'han24',

  deliller: { ...BOLUM23.deliller },
  cikarimlar: { ...BOLUM23.cikarimlar },
  olaylar: [],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Yirmi dördüncü bölüm bitti.' },
    { kosul: () => true, metin: 'Gubler\'in izini sür. Demir uçlu bastonunu dinle.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_kurtulus',
      baslik: '6 Ekim 1923, Tophane',
      paragraflar: (d) => [
        'İtilaf askerleri gitti. Bu sabah köprüden bir süvari birliği geçti; kent sokaklara döküldü. Bandolar, bayraklar, ağlayan yaşlılar, omuzlarda çocuklar. Bir şey bitti. Kimse neyin başladığını tam bilmiyor; ama bugün kimse sormuyor.',
        'Kalafatçı Hanı\'nın avlusunda Ohannes Usta kapıyı süpürüyor. ' +
          ({
            ara: 'Yeleğinin cebinden yıpranmış bir zarf görünüyor; Boston\'dan. Nermin\'in dostları dört yılda buldu: Aram evlenmiş, iki çocuğu var, Türkçeyi unutmamış. Ohannes zarfı günde üç kez okutuyor. ',
            bekle: 'Merdivenin başındaki küçük oda hâlâ boş; Ohannes her bayram orayı da süpürüyor. ',
          }[bayrak(d, 'ohannesOgul')] || '') +
          'Baban yukarıda, pencerede. ' +
          (bayrak(d, 'babaItiraf')
            ? 'Gazetedeki itiraftan beri sokağa az çıkıyor. Bakkal selam vermiyor artık; Yusuf Usta Manastır\'dan bir mektup yazdı, baban açmadı.' +
              (bayrak(d, 'yusufSoz') === 'soz'
                ? ' Beş yıldır her bayram sen okuyorsun Yusuf\'un mektuplarını; bu sefer baban saklamış. Bugün bayram, diyorsun ona. Mektubu açıyorsun. Usta, diye başlıyor Yusuf; gazeteyi gördük. Çarşıda herkes biliyor. Kimse bir şey demiyor. Ben de demiyorum. Dükkân açık. Kalay hâlâ senin öğrettiğin gibi. Baban pencereden dönüyor.'
                : '')
            : 'Bayram sesine kulak veriyor; Manastır\'da da böyle bir gün olmuştu, diyor, çok önce.'),
        'Bir çığlık. Neslihan merdivenden iniyor; yüzü bembeyaz. Babamın odasında biri vardı, diyor. Rivière\'in mektubu yok. Bedeli ödendi satırı olan mektup. Vollmer\'in imzası o satırın arkasında.',
        zehraBurada(d)
          ? 'Zehra Neslihan\'ın eteğine yapışmış. Tık tık adam, diyor; elini yere vura vura. Tık tık adam aldı. Kapıdan, aşağı.'
          : 'Ohannes Usta süpürgesini bırakıyor. Bir efendi geçti az önce, diyor; gümüş saatli, bastonlu. Bastonun ucu demir; taşlarda tık tık ses çıkarıyordu. Saati çeyrekte bir çaldı. Aşağı, yokuşa saptı.',
        {
          itiraf: 'Babamın itirafından sonra Vollmer\'in elinde koz kalmadı, diyor Neslihan. Bu mektup onun aleyhine olan son kâğıt; onu da yok etmek istiyor.',
          damga: 'Vollmer feragatnamenin kayıt numarasının sahte olduğunu öğrenmiş olmalı, diyor Neslihan. Yeni bir koz arıyor.',
          kurye: 'Kuryesini kaybettiğinden beri, diyor Neslihan, Vollmer\'in elinde yalnızca defterin aslı var. Bu mektup onu da tehlikeye atıyor.',
          imza: 'İmzamı aldı, diyor Neslihan; sesi kısık. Ama mektup bende kaldıkça imzanın bir anlamı yok. Şimdi onu da aldı.',
        }[bayrak(d, 'vollmerSonu')] || '',
        'Gubler, diyor Neslihan. Rainer\'in avukatı. Lozan\'dan beri Vollmer\'e çalışıyor. Kalabalıkta kaybolur. Ama bastonu kaybolmaz.',
        'Kapıya koşuyorsun. Kent bağırıyor, çalıyor, şarkı söylüyor. Ve bütün bu seslerin altında, bir yerde, demir bir uç taşlara vuruyor.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Peşine düş', sonra: 'takip1' }],
    },
    takip1: {
      ortam: 'ortam_kurtulus',
      efekt: 'baston',
      baslik: 'Han kapısı',
      paragraflar: (d) => [
        'Han kapısındasın. Durup dinliyorsun.',
        'Sağında, Tophane meydanından bir bando: trampet, boru. Solunda, Cihangir\'e çıkan dar sokakta bir kadın pencereden kilim silkeliyor. Karşında yokuş aşağı uzanan taş sokak; kalabalık orada seyrek.',
        'Ve yokuşun dibinden, kalabalığın arasından, uzaklaşan bir tıkırtı: tık, tık, tık. Hızlı. Bir bastonun demir ucu.',
        zehraBurada(d) ? 'Zehra arkandan bağırıyor: Aşağı! Tık tık aşağı!' : '',
      ].filter(Boolean),
      secenekler: [
        yon('Sağa, bandonun olduğu meydana.', false, 'takip2'),
        yon('Yokuş aşağı, tıkırtının gittiği yere.', true, 'takip2'),
        yon('Sola, Cihangir sokağına.', false, 'takip2'),
      ],
    },
    takip2: {
      ortam: 'ortam_kurtulus',
      efekt: 'baston',
      baslik: 'Karaköy meydanı',
      paragraflar: (d) => [
        sayi(d, 'kayip') > 0 ? 'Yanlış sokak. Geri dönüp yeniden buluyorsun izini; ama aradaki mesafe açıldı.' : 'Yokuşun dibindesin. Tıkırtı hâlâ önünde.',
        'Karaköy meydanı. Kalabalık burada bir duvar gibi; tıkırtı uğultunun içinde kayboluyor. Duramazsın; ama dinlemelisin.',
        'Sağda, köprünün başında güvercinler havalanıyor; birisi onlara yem atmış, çocuklar gülüyor. Önde, iskelede bir vapur düdüğü. Solda, Bankalar Caddesi\'nin ağzında bir köpek havlıyor; sert, inatçı, birine. Köpekler bastonlu adamlara havlar; Kasımpaşa\'da Rıza Bey öyle demişti.',
      ],
      secenekler: [
        yon('Güvercinlerin havalandığı köprü başına.', false, 'takip3'),
        yon('Vapur düdüğünün geldiği iskeleye.', false, 'takip3'),
        yon('Köpeğin havladığı Bankalar Caddesi\'ne.', true, 'takip3'),
      ],
    },
    takip3: {
      ortam: 'ortam_kurtulus',
      efekt: 'baston',
      baslik: 'Bankalar Caddesi',
      paragraflar: (d) => [
        sayi(d, 'kayip') > 0 ? 'Gubler önünde bir yerde; ama artık sesinden çok tahminine güveniyorsun.' : 'Köpek hâlâ havlıyor; önünde, kırk adım ötede, siyah bir palto, gümüş başlı bir baston.',
        'Tam o sırada caddenin öbür ucundan bir askerî bando geçiyor. Büyük davul. Bir kez, iki kez. Göğsüne vuruyor.',
        sayi(d, 'travma') >= 2 ? 'Davul bir top atışı gibi. Kum. Barut. Seddülbahir. Bacakların duruyor.' : 'Bir an göğsün sıkışıyor; geçiyor.',
      ],
      secenekler: [
        {
          etiket: 'Nefesini say. Dörde kadar al, dörde kadar ver.',
          kosul: (d) => sayi(d, 'travma') >= 2 && bayrak(d, 'ilkNefes') === 'say',
          etki: { bayrak: { davulAni: 'nefes' } },
          sonra: 'takip3_yon',
        },
        {
          etiket: 'Dişlerini sık. Yürümeye devam et.',
          kosul: (d) => sayi(d, 'travma') >= 2,
          etki: { bayrak: { davulAni: 'dis' }, artir: { kayip: 1 } },
          sonra: 'takip3_yon',
        },
        { etiket: 'Devam', kosul: (d) => sayi(d, 'travma') < 2, sonra: 'takip3_yon' },
      ],
    },
    takip3_yon: {
      ortam: 'ortam_kurtulus',
      efekt: 'baston',
      baslik: 'Kavşak',
      paragraflar: (d) => [
        bayrak(d, 'davulAni') === 'nefes'
          ? 'Bir, iki, üç, dört. Beş yıl önce Karaköy rıhtımında bir kömür çuvalının yanında öğrendiğin şey. Davul davul olarak kalıyor. Yürüyorsun.'
          : bayrak(d, 'davulAni') === 'dis'
            ? 'Dişlerini sıkıp yürüyorsun; ama bacakların seni dinlemedi bir süre. Kendine geldiğinde bando geçmiş, palto kaybolmuş.'
            : 'Bando geçiyor. Sen yürüyorsun.',
        'Caddenin sonunda üç yol. Sağda Kamondo merdivenleri, yukarı, Galata\'ya. Solda bir pasaj; içinden bir gramofon. Karşıda rıhtıma inen dar sokak.',
        'Merdivenlerin yukarısından, taşlarda tık, tık, tık; sonra bir saat, çeyrek saati çalıyor: dört ince vuruş. Ohannes Usta\'nın söylediği saat.',
      ],
      secenekler: [
        yon('Kamondo merdivenlerinden yukarı.', true, 'takip4'),
        yon('Gramofonlu pasaja.', false, 'takip4'),
        yon('Rıhtıma inen sokağa.', false, 'takip4'),
      ],
    },
    takip4: {
      ortam: 'ortam_kurtulus',
      efekt: 'baston',
      baslik: 'Galata',
      paragraflar: (d) => [
        sayi(d, 'kayip') >= KAYIP_SINIRI
          ? 'Merdivenlerin başında duruyorsun. Kalabalık, bando, çan. Tıkırtı yok. Gubler\'i kaybettin.'
          : 'Merdivenlerin başında, Galata Kulesi\'nin gölgesinde, siyah palto bir an duruyor; gümüş saatine bakıyor. Sonra arkasını dönmeden yine aşağı, öbür yoldan, rıhtıma iniyor. Bir vapura yetişmeye çalışıyor.',
        'Aşağıda, Galata rıhtımında bir İtalyan vapuru demir almak üzere: Trieste\'ye. İskele tahtası çekiliyor.',
      ],
      secenekler: [
        {
          etiket: 'Rıhtıma koş.',
          etki: (d) => ({
            bayrak: {
              takipSonu: sayi(d, 'kayip') < KAYIP_SINIRI ? 'yakalandi' : bayrak(d, 'kemalKalir') ? 'kemal' : rizaGelir(d) ? 'riza' : 'kacti',
            },
          }),
          sonra: 'rihtim24',
        },
      ],
    },
    rihtim24: {
      ortam: 'ortam_rihtim',
      efekt: 'vapur_duduk',
      baslik: 'Galata rıhtımı',
      paragraflar: (d) => {
        const t = bayrak(d, 'takipSonu');
        if (t === 'yakalandi')
          return [
            'İskele tahtasının başında yetişiyorsun. Gubler tahtaya basmak üzere; bileğini tutuyorsun. Bastonu taşlara düşüyor; demir ucu son bir kez tıkırdıyor.',
            'Gubler dönüp sana bakıyor; şaşkın değil, yorgun. Zürih\'te bankanın önünde, diyor, polisle gelmiştim. Şimdi siz bastonumla geldiniz. Göğüs cebinden katlanmış bir kâğıt çıkarıyor: Rivière\'in mektubu.',
          ];
        if (t === 'kemal')
          return [
            'Rıhtıma vardığında iskele tahtası çekilmiş, vapur kıpırdamaya başlamış. Gubler güvertede, korkuluğa yaslanmış.',
            'Ama vapurun pruvasının önünde bir kayık: Kemal\'in kayığı. Kemal iki küreği çaprazlamış, vapurun yolunu tıkıyor. İtalyan kaptan köprüden bağırıyor; Kemal Rumca, Türkçe, İtalyanca, İngilizce cevap veriyor; hepsi aynı anlamda. Liman reisi geliyor. Vapur duruyor. Gubler iniyor; iki polisin arasında.',
            'Kemal kayığından sana el sallıyor. Babam sabah söyledi, diye bağırıyor: Bugün rıhtımda dur, bir iş çıkar. Yaşlı denizcilerin önsezisi.',
          ];
        if (t === 'riza')
          return [
            'Rıhtıma vardığında iskele tahtası çekilmiş. Ama tahtanın başında, bastonuna dayanmış, Rıza Bey. Ve yanında, gümüş başlı bastonu elinde, Gubler; Rıza Bey\'in öbür eli onun kolunda, demir gibi.',
            'Kırk yıl, diyor Rıza Bey. Bu limandan kaçmak isteyen her adam bu tahtadan geçer. Ben de tahtanın başında beklerim. Sen bastonu dinledin; ben tahtayı.',
          ];
        return [
          'Rıhtıma vardığında vapur iskeleden ayrılmış. Gubler güvertede; korkuluktan sana bakıyor, şapkasını hafifçe kaldırıyor. Vapur düdüğünü çalıyor; Trieste\'ye.',
          'Rivière\'in mektubu onunla gidiyor. Bedeli ödendi satırı, Vollmer\'in kasasına.',
        ];
      },
      secenekler: [
        {
          etiket: 'Gubler\'i yeni kurulan polise teslim et. Mektup kanıt olarak kalsın.',
          kosul: (d) => bayrak(d, 'takipSonu') !== 'kacti',
          etki: { bayrak: { gublerSonu: 'teslim', mektupGeri: true } },
          sonra: 'gubler24',
        },
        {
          etiket: 'Mektubu al ve Gubler\'i bırak. Vollmer\'e bir haber götürsün.',
          kosul: (d) => bayrak(d, 'takipSonu') !== 'kacti',
          etki: { bayrak: { gublerSonu: 'haberci', mektupGeri: true } },
          sonra: 'gubler24',
        },
        {
          etiket: 'Devam',
          kosul: (d) => bayrak(d, 'takipSonu') === 'kacti',
          etki: { bayrak: { gublerSonu: 'kacti' }, artir: { travma: 1 } },
          sonra: 'son24',
        },
      ],
    },
    gubler24: {
      ortam: 'ortam_rihtim',
      baslik: 'Gubler',
      paragraflar: (d) => [
        bayrak(d, 'gublerSonu') === 'teslim'
          ? 'Gubler polislere bakıyor; sonra sana. Bana bir sigara verin, diyor. Ve ben size Vollmer\'in nerede olacağını söyleyeyim; nasılsa bilecektiniz.'
          : 'Gubler mektubu sana uzatıyor; şaşkın. Bırakıyor musunuz? Ne söylememi istiyorsunuz?',
        bayrak(d, 'gublerSonu') === 'teslim'
          ? 'Ayın yirmi dokuzunda Zürih\'te, diyor. Bankasında. Kuruluş defterini satacak; aslını. Kırmızı sayfalarıyla. Yeni kurulan devletlerin hepsi kendi geçmişini satın almak ister; Ankara da, Belgrad da, Atina da. En yüksek fiyatı veren alacak.'
          : 'Ona de ki, diyorsun: defter onun değil. Kasım\'da geleceğiz. Gubler başını sallıyor. Söylerim, diyor. Ama bir şey daha söyleyeyim size: ayın yirmi dokuzunda defteri satacak. Aslını. Kırmızı sayfalarıyla. En yüksek fiyatı verene.',
        'Rivière\'in mektubu elinde. Kâğıt sararmış; bir köşesi yırtık. Neslihan yanına geliyor.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'mektup24' }],
    },
    mektup24: {
      ortam: 'ortam_rihtim',
      baslik: 'Mektup',
      paragraflar: (d) => [
        'Neslihan mektubu alıyor. Rivière\'in el yazısı; ince, eğik. Babanı ben ihbar ettim. Kızı asla bilmemeli. Bedeli ödendi.',
        {
          baba: 'İsmail kızı Neslihan, diyor kendi kendine. Bu kâğıt Rivière kızı Neslihan\'ın kâğıdıydı. Artık değil.',
          iki: 'İki adım var, diyor. İkisinin de bir hikâyesi var. Bu kâğıt ikisinin arasındaki köprü; ama köprüler bazen yıkılmalı.',
          kendi: 'Adımı seçeceğim, demiştim Lozan\'da. Önce bu kâğıdı ne yapacağımı seçmeliyim.',
        }[bayrak(d, 'neslihanAd') || 'kendi'],
        'Sana bakıyor. Ne yapayım abi?',
      ],
      secenekler: [
        { etiket: 'Babamıza ver. Bu kâğıt en çok onun.', etki: { bayrak: { mektupKarar: 'baba' }, artir: { neslihanBag: 1 } }, sonra: 'son24' },
        { etiket: 'Sakla. Zürih\'te Vollmer\'in önüne bu kâğıtla çıkacağız.', etki: { bayrak: { mektupKarar: 'sakla' } }, sonra: 'son24' },
        { etiket: 'Denize at. Ne Vollmer\'in olsun ne Rivière\'in.', etki: { bayrak: { mektupKarar: 'deniz' } }, sonra: 'son24' },
      ],
    },
    son24: {
      ortam: 'ortam_kurtulus',
      ortamOran: 0.6,
      baslik: 'Akşam',
      paragraflar: (d) => [
        {
          baba: 'Akşam han\'da baban mektubu ocağın yanında okuyor. Bitirince katlıyor, göğüs cebine koyuyor. Yakmıyorum, diyor. Kalay gibi: üstünü örtmüyorum. Taşıyorum.',
          sakla: 'Neslihan mektubu kendi defterinin arasına koyuyor; Montaigne\'in Denemeler\'inin, Rivière\'in kitabının, arasına. Que sais-je? Ne biliyorum? Artık bir şey biliyorum, diyor.',
          deniz: 'Neslihan mektubu rıhtımdan denize bırakıyor. Kâğıt bir süre yüzüyor; sonra bir vapurun dalgası onu alıp götürüyor. Bitti, diyor Neslihan. Ama sesi bitmemiş birinin sesi.',
        }[bayrak(d, 'mektupKarar')] || 'Mektup gitti. Akşam han\'da kimse onu anmıyor; ama herkes düşünüyor.',
        bayrak(d, 'babaItiraf')
          ? 'Gece bayram sokaklara taşıyor. Baban pencerede; aşağı inmiyor. Sokakta onu tanıyanlar var: kalıbı döken usta.'
          : 'Gece bayram sokaklara taşıyor. Baban Ohannes Usta\'yla avluda; ikisi de susuyor, ikisi de dinliyor.',
      ],
      secenekler: [
        {
          etiket: 'Babanın koluna gir. Bayram yerine birlikte yürüyün.',
          kosul: (d) => !!bayrak(d, 'babaItiraf'),
          etki: { bayrak: { babaYaninda: true } },
          sonra: 'son24_baba',
        },
        {
          etiket: 'Pencerede kalsın. Bugün kalabalığın günü; onun değil.',
          kosul: (d) => !!bayrak(d, 'babaItiraf'),
          etki: { bayrak: { babaYaninda: false } },
          sonra: 'son24_baba',
        },
        { etiket: 'Devam', kosul: (d) => !bayrak(d, 'babaItiraf'), sonra: 'kapanis24' },
      ],
    },
    son24_baba: {
      ortam: 'ortam_kurtulus',
      baslik: 'Bayram',
      paragraflar: (d) =>
        bayrak(d, 'babaYaninda')
          ? [
              'Babanın koluna giriyorsun. Merdivenden iniyorsunuz. Avluda Ohannes Usta şapkasını çıkarıyor.',
              'Sokakta bakkal sizi görüyor. Bir an duruyor. Sonra elindeki bayrağı babana uzatıyor; bir şey söylemeden. Baban bayrağı alıyor. Elleri titriyor; kalay sürerken hiç titremezdi.',
              'Tophane meydanına kadar yürüyorsunuz. Kimse bir şey demiyor. Bazıları başını çeviriyor; bazıları selam veriyor. Baban senin kolunu sıkıyor. Oğlum yanımda, diyor yalnızca; kendine.',
            ]
          : [
              'Baban pencerede kalıyor. Sen de yanında. Aşağıda kalabalık geçiyor, şarkılar, bayraklar.',
              'Belki seneye, diyor baban. Seneye inerim. Ama bugün onların günü. Sesinde ne kırgınlık var ne utanç; yalnızca yorgunluk.',
            ],
      secenekler: [{ etiket: 'Devam', sonra: 'kapanis24' }],
    },
    kapanis24: {
      ortam: 'ortam_kurtulus',
      ortamOran: 0.4,
      baslik: '29 Ekim 1923',
      paragraflar: (d) => [
        'Üç hafta sonra, bir akşam, Ankara\'dan haber geliyor: cumhuriyet ilan edildi. Kent bir kez daha sokaklara dökülüyor; bu kez daha sessiz, daha şaşkın.',
        bayrak(d, 'gublerSonu') === 'kacti'
          ? 'Ve aynı akşam, Zürih\'te, bir bankanın kasasından kırmızı sayfalı bir defter çıkıyor. Vollmer onu satacak. Gubler\'in götürdüğü mektup da yanında. En yüksek fiyatı verene.'
          : 'Ve aynı akşam, Zürih\'te, bir bankanın kasasından kırmızı sayfalı bir defter çıkıyor. Vollmer onu satacak; en yüksek fiyatı verene. Gubler öyle söyledi. Ama artık biliyorsun: ne zaman, nerede.',
        'Neslihan bir bilet alıyor: Zürih. ' + (rizaGelir(d) ? 'Rıza Bey de. ' : '') + 'Nermin de. Cemil Bey Ankara\'dan telgraf çekiyor: Geliyorum. Son bir otopsi; bu kez bir defterin.',
        'Yirmi dördüncü bölümün sonu.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_kurtulus',
      ortamOran: 0.45,
      baslik: 'Yirmi dördüncü bölüm bitti',
      paragraflar: ['Kararların kaydedildi. Sıradaki: Kasım 1923, Zürih. Dördüncü kitabın sonu.'],
      secenekler: [{ etiket: 'Yirmi beşinci bölüme geç', sonrakiBolum: 'bolum25' }, { etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    han24: {
      ad: 'Kalafatçı Hanı',
      ortam: 'ortam_han',
      tarif: 'Ohannes Usta\'nın hanı. Avluda çeşme, yukarıda babanın odası.',
      nesneler: [],
      kisiler: [],
      gecisler: [],
    },
  },

  kisiler: {},
};
