// On ikinci bölüm: "İmza". İstanbul, 24-28 Haziran 1919.
// Gülce babası Kâmil Efendi'nin katilini öğrenir: Maliye'den Nazım Bey. Babasının 1913'te imzalamayı reddettiği
// muayene raporu Maliye arşivinde (Rumi 1329 = Miladi 1913). Aynı günlerde Nazım Bey ile Whitlock, devletin kalan
// altınını "tütün" sandıklarında bir Amerikan yük gemisiyle Rainer'in bankasına kaçırmaya hazırlanıyor.
// Yeni oynanış: arşivde evrak arama (Rumi takvim); yanlış raf dikkat çeker (DIKKAT_SINIRI 3).
// Doruk: yalıda Nazım Bey'e "İmzala ve yaşa" dedirten Gülce.
// Bütün kişiler (Nazım Bey, Whitlock, arşiv kâtibi) ve olaylar KURGUDUR; gerçek kişiler kullanılmadı.
import { BOLUM11 } from './bolum11';
import { bayrak, cikarimVar, delilVar, sayi } from '../oyun/motor';

const DIKKAT_SINIRI = 3;
const gulceYakin = (d) => sayi(d, 'gulceGuven') >= 2 || !!bayrak(d, 'gulceyeAnlatti');

export const BOLUM12 = {
  id: 'bolum12',
  ad: 'On ikinci bölüm: İmza',
  baslangic: 'acilis',
  ilkMekan: 'rihtim',

  deliller: {
    ...BOLUM11.deliller,
    tasfiye_satiri: { ad: 'Ferrante\'nin defterindeki satır', tarif: 'K. E., 1913, İstanbul gümrüğü, tasfiye. Onay: N. B. Neslihan\'ın okuduğu, 1913\'ten kopyalanmış eski bir satır.' },
    baba_mektubu: { ad: 'Kâmil Efendi\'nin son mektubu', tarif: 'Gülce\'nin annesine yazılmış, hiç gönderilmemiş bir mektup: Raporumu verdim. Gümrük Kalemi, evrak 1329/417. İmzalamazsam başıma iş açacaklarmış. Ben imzalamayacağım. Çocuğa babasının imzasız bir adam olduğunu söyle.' },
    kamil_raporu: { ad: 'Kâmil Efendi\'nin raporu', tarif: 'Gümrük muayene raporu, 1329/417. Selanik\'ten gelen bir geminin "makine aksamı" sandıklarında tüfek bulunduğu, mühürlerin kanatlı anahtar olduğu. Kâmil Efendi\'nin imzası; altında, kırmızı mürekkeple, başka bir el: Bu memur tasfiye edilsin. N.' },
    whitlock_nazim: { ad: 'Pera Palas\'taki telgraf', tarif: 'Whitlock\'un Nazım Bey\'e bıraktığı, siyakat harfleriyle yazılmış bir not: Otuz sandık, Columbia, 28 Haziran sabahı, Galata. Viyana\'da karşılanacak.' },
    nazim_itirafi: { ad: 'Nazım Bey\'in itirafı', tarif: 'Nermin\'in yazdığı, Nazım Bey\'in imzaladığı dört sayfa: 1913\'te Kâmil Efendi\'nin tasfiyesi, tüfek sandıkları, Rainer, Whitlock ve Columbia\'nın otuz sandık altını.' },
    agir_sandik: { ad: 'Columbia\'nın manifestosu', tarif: 'Yük gemisi Columbia, New York\'a; Amerikan bayraklı ama kayıtlı sahibi Pendle Shipping, Pire. Otuz sandık işlenmiş tütün, Amerikan Tütün Şirketi. Her sandık dört yüz kilo. Bir tütün denginin sandığı seksen kiloyu geçmez.' },
  },

  cikarimlar: {
    ...BOLUM11.cikarimlar,
    katil_nazim: {
      a: 'tasfiye_satiri',
      b: 'kamil_raporu',
      ad: 'Tasfiye',
      metin: 'Kâmil Efendi örgütün tüfek sandıklarını raporuna yazdı. Raporun altına Nazım Bey kendi eliyle "tasfiye edilsin" yazdı. Üç gün sonra Kâmil Efendi\'yi Haliç\'ten çıkardılar. Gülce\'nin babasını Nazım Bey öldürttü.',
    },
    altin: {
      a: 'agir_sandik',
      b: 'whitlock_nazim',
      ad: 'Tütün değil',
      metin: 'Dört yüz kiloluk tütün sandıkları. Maliye\'den bir müsteşar ve Viyana\'dan telgraf alan bir Amerikalı. Columbia\'nın ambarında tütün yok: devletin kalan altını var. Rainer\'in bankasına, bir işgal altındaki şehirden.',
    },
  },

  olaylar: [
    {
      id: 'yali',
      kosul: (d) => cikarimVar(d, 'katil_nazim') && cikarimVar(d, 'altin'),
      etki: { sahne: 'yali_yol' },
    },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'On ikinci bölüm bitti.' },
    { kosul: (d) => !bayrak(d, 'gulceBildi'), metin: 'Liman kayıt bürosunda Gülce\'ye gerçeği söyle.' },
    { kosul: (d) => !delilVar(d, 'baba_mektubu'), metin: 'Gülce\'nin Kumkapı\'daki evine git; babasının eşyalarına bak.' },
    { kosul: (d) => !delilVar(d, 'kamil_raporu'), metin: 'Maliye arşivinde Kâmil Efendi\'nin raporunu bul. Raflar Rumi yıla göre dizilmiş.' },
    { kosul: (d) => !delilVar(d, 'whitlock_nazim'), metin: 'Pera Palas\'ta Whitlock\'u izle.' },
    { kosul: (d) => !delilVar(d, 'agir_sandik'), metin: 'Gülce\'ye Columbia\'nın manifestosunu sor.' },
    { kosul: () => true, metin: 'Bulduklarını soruşturma panosunda birleştir.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_rihtim',
      baslik: '24 Haziran 1919, Karaköy',
      paragraflar: (d) => [
        'İzmir\'den dönüş vapuru sabah yanaşıyor. Haziran sıcağı, kömür dumanı, martılar. Rıhtım her zamanki gibi; ama sen değilsin.',
        'Ceketinin cebinde, Neslihan\'ın Ferrante\'nin defterinden kopyaladığı tek bir satır: K. E., 1913, İstanbul gümrüğü, tasfiye. Onay: N. B.',
        'Gülce\'yi düşünüyorsun. ' + (bayrak(d, 'gulceGecikme') ? 'Aralık\'ta senin için damgayı bir çekmecede unutan Gülce.' : 'Aralık\'ta sana babasının mektubunu gösteren Gülce.') + ' İmzala ve yaşa.',
        bayrak(d, 'ferranteSonu') === 'kacti'
          ? 'Ferrante şimdi bir Napoli vapurunda, sözünü tutmuş bir adam. Whitlock ise kayıp.'
          : 'Ferrante İtilaf kontrolünün elinde. Whitlock ise kayıp.',
        'Rıza Bey yanına geliyor. Nazım Bey, diyor. Hâlâ Maliye\'de. Müsteşar muavini. Kandilli\'de bir yalısı var. Kırk yıllık devlet memuru; iki padişah, üç sadrazam, dört maliye nazırı gördü. Hepsinin altında imzası var.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'rihtim', delil: ['tasfiye_satiri'], bayrak: { 'gorüldü_rihtim': true } } }],
    },
    gulce_ogrenir: {
      ortam: 'ortam_buro',
      baslik: 'Gülce',
      paragraflar: (d) => [
        'Kâğıdı Gülce\'nin masasına koyuyorsun. Okuyor. Bir kez. İki kez. Kalemini bırakıyor.',
        'Nazım Bey, diyor. Sesi düz, hiç titremiyor. Geçen ay bu büroya geldi. Bir manifestoyu imzalattı. Elimi sıktı. Babanı tanırdım, kızım, dedi. İyi bir memurdu.',
        gulceYakin(d)
          ? 'Gülce ayağa kalkıp pencereye gidiyor. Uzun süre dışarı bakıyor. Sonra sana dönüyor; gözleri kuru. Bana söylediğin için teşekkür ederim, diyor. Başkası söylemezdi.'
          : 'Gülce sana bakıyor; soğuk. Ne zamandır biliyordun? diyor. On beş gün, diyorsun. On beş gün, diye tekrarlıyor. Sonra başını sallıyor. Söyledin ya. Bu da bir şey.',
        'Bir şey istiyorum, diyor sonra. Ne yapacaksak, ben de orada olacağım. Bu sefer bir çekmecede hiçbir şey unutmayacağım.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { gulceBildi: true } } }],
    },
    arsiv: {
      ortam: 'ortam_arsiv',
      baslik: 'Maliye arşivi',
      paragraflar: (d) => [
        'Bodrum katı. Tavana kadar raflar; her rafın başında el yazısıyla bir levha: yıl ve kalem. Yıllar Rumi. Gülce bir mum tutuyor; Rıza Bey kapıda, kâtibi lafa tutuyor.',
        bayrak(d, 'dikkat') ? 'Yukarıdan ayak sesleri. Kâtip iki kez aşağı seslendi. Fazla vaktiniz yok.' : 'Kâtibin sesi yukarıdan geliyor; Rıza Bey\'e tütün ikram ediyor.',
        delilVar(d, 'baba_mektubu')
          ? 'Kâmil Efendi\'nin mektubunu hatırlıyorsun: Gümrük Kalemi, evrak 1329/417.'
          : 'Kâmil Efendi\'nin raporunun numarasını bilmiyorsun. Yalnızca 1913 yılını ve gümrüğü biliyorsun.',
      ],
      secenekler: [
        { etiket: 'Raf: 1913, Gümrük Kalemi', kosul: (d) => sayi(d, 'dikkat') < DIKKAT_SINIRI, etki: { artir: { dikkat: 1 } }, sonra: 'arsiv_yanlis' },
        { etiket: 'Raf: 1329, Gümrük Kalemi', kosul: (d) => sayi(d, 'dikkat') < DIKKAT_SINIRI, etki: { delil: ['kamil_raporu'] }, sonra: 'arsiv_dogru' },
        { etiket: 'Raf: 1329, Mülkiye Kalemi', kosul: (d) => sayi(d, 'dikkat') < DIKKAT_SINIRI, etki: { artir: { dikkat: 1 } }, sonra: 'arsiv_yanlis' },
        { etiket: 'Raf: 1330, Gümrük Kalemi', kosul: (d) => sayi(d, 'dikkat') < DIKKAT_SINIRI, etki: { artir: { dikkat: 1 } }, sonra: 'arsiv_yanlis' },
        { etiket: 'Kâtip merdivende!', kosul: (d) => sayi(d, 'dikkat') >= DIKKAT_SINIRI, sonra: 'arsiv_yakalandi' },
      ],
    },
    arsiv_yanlis: {
      ortam: 'ortam_arsiv',
      baslik: 'Yanlış raf',
      paragraflar: (d) => [
        'Dosyaları çeviriyorsun; numaralar tutmuyor. Bir tozu kaldırıyorsun; Gülce hapşırmamak için ağzını kapatıyor.',
        sayi(d, 'dikkat') >= 2 ? 'Yukarıda kâtip sustu. Bir sandalye gıcırdıyor.' : 'Yukarıda kâtibin sesi bir an kesiliyor; sonra devam ediyor.',
        'Gülce fısıldıyor: Arşivler Rumi yıla göre dizilir. Mart\'tan Mart\'a. 1913\'ün çoğu 1329\'dur.',
      ],
      secenekler: [{ etiket: 'Başka bir rafa bak', sonra: 'arsiv' }],
    },
    arsiv_dogru: {
      ortam: 'ortam_arsiv',
      baslik: '1329/417',
      paragraflar: [
        'Gümrük Kalemi, 1329. Dosyalar numarayla dizili. Dört yüz on beş, dört yüz on altı. Dört yüz on yedi.',
        'Gülce dosyayı açıyor. Babasının el yazısı. Düzgün, eğik, sabırlı harfler: makine aksamı diye bildirilen sandıklarda tüfek; mühürlerde kanatlı bir anahtar. Ve en altta, babasının imzası.',
        'İmzanın altında, kırmızı mürekkeple, başka bir el: Bu memur tasfiye edilsin. N.',
        'Gülce dosyayı göğsüne bastırıyor. Hiç ses çıkarmıyor. Sadece omuzları titriyor.',
      ],
      secenekler: [{ etiket: 'Devam' }],
    },
    arsiv_yakalandi: {
      ortam: 'ortam_arsiv',
      baslik: 'Kâtip',
      paragraflar: [
        'Kâtip merdivenden iniyor; elinde gaz lambası. Burada ne arıyorsunuz?',
        'Gülce dönüp ona bakıyor. Gümrük Kalemi\'nden geliyorum, diyor; sesi bir müfettiş kadar soğuk. 1329/417. Babamın dosyası. Ya bana verirsiniz ya da Nazım Bey\'e kızının dosyayı istediğini söylersiniz.',
        'Kâtip bir an duruyor. Yaşlı bir adam. Kâmil Efendi, diyor yavaşça. Onu tanırdım. Dürüst adamdı. Rafa yürüyüp dosyayı çıkarıyor, Gülce\'ye uzatıyor. Ben bir şey görmedim, kızım. Ama Nazım Bey bu bodruma her ay iner. Bu ay da inecek.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { delil: ['kamil_raporu'], bayrak: { nazimUyarildi: true } } }],
    },
    yali_yol: {
      ortam: 'ortam_kayik',
      baslik: '27 Haziran, gece',
      paragraflar: (d) => [
        'Süleyman Kaptan\'ın kayığı Kandilli\'ye doğru süzülüyor. Boğaz sakin; Anadolu yakasında yalıların pencerelerinde birkaç lamba.',
        'Gülce kıçta oturuyor; kucağında babasının dosyası. Nermin yanında. Rıza Bey küreklerden birinde.',
        bayrak(d, 'nazimUyarildi')
          ? 'Arşiv kâtibi sustu mu, bilmiyorsun. Yalının iskelesinde iki adam nöbet tutuyor.'
          : 'Yalının iskelesi boş. Nazım Bey yalnız yaşar, demişti Rıza Bey. Bir uşak, bir aşçı. Yaşlılar korkmaz; yorulur.',
        'Sabah Columbia Galata\'dan kalkacak. Ama önce bu gece.',
      ],
      secenekler: [{ etiket: 'Yalıya çık', sonra: 'yali' }],
    },
    yali: {
      ortam: 'ortam_yali',
      baslik: 'Kandilli',
      paragraflar: (d) => [
        bayrak(d, 'nazimUyarildi')
          ? 'İskeledeki iki adam Rıza Bey\'in tabancasını görünce ellerini kaldırıyor. Ücretle bekleyen hamallar; kimse bir müsteşar için ölmek istemiyor.'
          : 'İskele boş. Kapı açık. Yaz geceleri İstanbul yalıları kapı kilitlemez.',
        'Yalının selamlığında, sedirde, ak sakallı, öksüren bir adam; önünde bir fincan ıhlamur, elinde bir tespih. Nazım Bey. Sizi görünce şaşırmıyor. Gelirsiniz diye düşünmüştüm, diyor. Oturun.',
        'Gülce dosyayı onun önüne koyuyor. Nazım Bey açmıyor bile. Kâmil, diyor. İyi bir memurdu. Fazla iyi. Bir devlet yalnızca iyi memurlarla yürümez kızım. Bazen biri imza atmalı.',
        'Gülce\'nin eli çantasına gidiyor. Çantada ne olduğunu biliyorsun: babasının eski tabancası. Sabah gördün; bir şey söylemedin.',
      ],
      secenekler: [
        { etiket: 'Gülce\'nin elini tut.', etki: { bayrak: { yaliSecim: 'tut' } }, sonra: 'imza' },
        { etiket: 'Bırak. Bu onun hesabı.', etki: { bayrak: { yaliSecim: 'birak' } }, sonra: 'namlu' },
      ],
    },
    namlu: {
      ortam: 'ortam_yali',
      baslik: 'Tabanca',
      paragraflar: (d) => [
        'Gülce tabancayı çıkarıyor. Eli titremiyor. Namlu Nazım Bey\'in alnına dönük.',
        'Nazım Bey tespihini bırakıyor. İlk kez korkuyor. Kızım, diyor. Kızım, ben yaşlı bir adamım.',
        'Babam da yaşlanacaktı, diyor Gülce.',
        bayrak(d, 'gulceSoru')
          ? 'Gureba\'da ona sormuştun: adalet mi istiyorsun, intikam mı? Bilmiyorum demişti. Şimdi cevabı bir namlunun ucunda arıyor.'
          : '',
        gulceYakin(d)
          ? 'Sonra sana bakıyor. Bir an. Neden durduğunu sen de biliyorsun, o da. Tabancayı indirmiyor; ama tetiği de çekmiyor.'
          : 'Parmağı tetikte beyazlıyor. Nermin bir adım atıyor; Rıza Bey de. Sonra Gülce derin bir nefes alıyor.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { artir: { travma: 1 } }, sonra: 'imza' }],
    },
    imza: {
      ortam: 'ortam_yali',
      baslik: 'İmzala ve yaşa',
      paragraflar: (d) => [
        bayrak(d, 'yaliSecim') === 'tut'
          ? 'Gülce\'nin elini tutuyorsun. Çantadan çıkmadan duruyor. Gülce sana bakıyor; sonra Nazım Bey\'e. Çantadan tabancayı değil, bir kalem ve beyaz bir kâğıt çıkarıyor.'
          : 'Gülce tabancayı masaya, ıhlamur fincanının yanına bırakıyor. Namlu hâlâ Nazım Bey\'e bakıyor. Çantadan bir kalem ve beyaz bir kâğıt çıkarıyor.',
        bayrak(d, 'gulceSoru') && bayrak(d, 'yaliSecim') === 'tut'
          ? 'Gülce fısıldıyor, yalnız senin duyacağın kadar: Gureba\'da sormuştun. Şimdi biliyorum. Adalet.'
          : '',
        'Nermin yazacak, diyor Gülce. Siz anlatacaksınız. 1913\'ü. Babamı. Tüfekleri. Mühürleri. Rainer\'i. Whitlock\'u. Yarın sabahki gemiyi. Her şeyi.',
        'Kâğıdı ve kalemi Nazım Bey\'in önüne itiyor. Sonra, babasının cebinden çıkan o kâğıttaki kelimeleri, tek tek söylüyor:',
        'İmzala ve yaşa.',
        'Nazım Bey uzun süre kâğıda bakıyor. Sonra anlatmaya başlıyor. Nermin yazıyor. Saat ikiyi vuruyor, üçü vuruyor. Sonunda Nazım Bey kalemi alıyor ve imzalıyor. Kırk yıllık devlet memurunun düzgün, eğik, sabırlı imzası.',
        'Gülce kâğıdı alıyor, katlıyor. Babam imzalamadı, diyor. Bu yüzden öldü. Sen imzaladın. Bu yüzden yaşayacaksın. Ama bundan sonra her sabah bu imzayla uyanacaksın.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { delil: ['nazim_itirafi'] }, sonra: 'columbia' }],
    },
    columbia: {
      ortam: 'ortam_rihtim',
      efekt: ['vapur_duduk'],
      baslik: '28 Haziran, sabah',
      paragraflar: (d) => [
        'Galata rıhtımı. Columbia\'nın bacası tütüyor. Otuz sandık ambara iniyor; vinçler gıcırdıyor. Rıhtımın ucunda, beyaz yazlık takımıyla, Whitlock.',
        'Cebinde Nazım Bey\'in imzalı itirafı. ' + (bayrak(d, 'auroraSonu') === 'ihbar' ? 'İzmir\'de İtilaf kontrolüne güvenmiştin; Aurora\'nın tüfeklerinin nereye gittiğini hâlâ bilmiyorsun.' : 'İzmir\'de Aurora\'yı batırmıştın; bu kez otuz sandık altını batıramazsın.'),
        'Rıza Bey saatine bakıyor. Gemi on dakika sonra kalkıyor.',
      ],
      secenekler: [
        { etiket: 'İtirafı İngiliz askerî polisine götür. Gemiyi durdursunlar.', etki: { bayrak: { altinKarar: 'ingiliz' } }, sonra: 'son_ingiliz12' },
        { etiket: 'İtirafı Nermin\'e ver. Bütün şehir okusun.', etki: { bayrak: { altinKarar: 'gazete' } }, sonra: 'son_gazete12' },
      ],
    },
    son_ingiliz12: {
      ortam: 'ortam_rihtim',
      baslik: 'Ambar',
      paragraflar: (d) => [
        (bayrak(d, 'karar3') === 'ihbar' || bayrak(d, 'sevkiyatKarar') === 'ingiliz')
          ? 'Teğmen Ashford itirafı okuyor; yüzü kızarıyor. Yine siz, diyor. Bu sefer daha büyük. Askerî polis rıhtımı kapatıyor.'
          : 'Askerî polisin nöbetçi subayı itirafı okuyor; kuşkuyla. Sonra bir sandığı açtırıyor. Tütünün altında, yağlı bezlere sarılı külçeler. Rıhtım kapanıyor.',
        'Otuz sandık altın İngiliz deposuna gidiyor. Tutanağa: Osmanlı Maliyesi\'ne iade edilecektir. Ne zaman, kimse yazmıyor.',
        'Whitlock\'u arıyorsun. Rıhtımın ucunda yalnızca sigarası tütüyor.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'son_sabah' }],
    },
    son_gazete12: {
      ortam: 'ortam_rihtim',
      baslik: 'Gazete',
      paragraflar: [
        'Nermin itirafı kapıp koşuyor. Öğleden önce baskıya giriyor; öğleden sonra İstanbul\'un bütün kahvelerinde okunuyor. Maliye müsteşar muavini, devletin altını, bir Viyana bankası.',
        'Columbia o sabah kalkamıyor: liman işçileri vinçlerin başından çekiliyor. Kalabalık rıhtıma doluyor. İngiliz askerleri gelip sandıkları el koyuyor; ama artık bütün şehir ne olduğunu biliyor.',
        'Sansür ertesi gün gazeteyi kapatıyor. Nermin gülümsüyor: Bir gün yetti, diyor.',
        'Whitlock\'u arıyorsun. Rıhtımın ucunda yalnızca sigarası tütüyor.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { nerminGazeteKapandi: true } }, sonra: 'son_sabah' }],
    },
    son_sabah: {
      ortam: 'ortam_rihtim',
      ortamOran: 0.6,
      baslik: 'Akşamüstü',
      paragraflar: (d) => [
        'Akşamüstü Kalafatçı Hanı\'nda bir telgraf bekliyor. Viyana\'dan. İmzasız. Fransızca:',
        'TEBRİKLER MÖSYÖ DEMİR STOP BİR KALAYCININ OĞLU BEKLEDİĞİMDEN İYİ STOP ARTIK KENDİM GELİYORUM STOP R.',
        'Rainer. İstanbul\'a.',
        'Gülce kapının eşiğinde. Babasının dosyasını bir bohçaya sarmış. Babamı Eyüp\'e gömdüler, diyor. Mezarına hiç gidemedim. Yarın gideceğim. Benimle gelir misin?',
        gulceYakin(d) ? 'Gelirim, diyorsun. Gülce ilk kez gülümsüyor; yorgun, ama gerçek.' : 'Gelirim, diyorsun. Gülce başını sallıyor; bir şey söylemiyor. Ama gitmiyor da.',
        'Baban ocağın başında. Neslihan yanında. Bir imza, diyor baban; kalayı bir bakır tasa sürerken. İnce bir kat. Ama bazen bütün zehri o tutar.',
        'On ikinci bölümün sonu.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true, rainerGeliyor: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_han',
      ortamOran: 0.45,
      baslik: 'On ikinci bölüm bitti',
      paragraflar: ['Sıradaki: Rainer İstanbul\'a geliyor. Kararların kaydedildi.'],
      secenekler: [{ etiket: 'On üçüncü bölüme geç', sonrakiBolum: 'bolum13' }, { etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    rihtim: {
      ad: 'Karaköy rıhtımı',
      tarif: 'Haziran sıcağı. Hamallar, simitçiler, İtilaf devriyeleri. Galata\'ya doğru büyük yük gemileri; aralarında Amerikan bandıralı bir şilep: Columbia.',
      nesneler: [
        {
          id: 'columbia_gemi',
          etiket: 'Columbia',
          incele: 'Amerikan bandıralı bir yük gemisi. Ambarına sandıklar iniyor; her biri dört adamın zor kaldırdığı sandıklar. Bir tütün sandığı için fazla ağır.',
        },
      ],
      kisiler: ['neslihan', 'riza', 'nermin', 'cemil'],
      gecisler: [
        { hedef: 'buro', etiket: 'Liman kayıt bürosuna git' },
        { hedef: 'gulce_ev', etiket: 'Kumkapı\'ya, Gülce\'nin evine git', kosul: (d) => bayrak(d, 'gulceBildi') },
        { hedef: 'maliye', etiket: 'Maliye Nezareti\'ne git', kosul: (d) => bayrak(d, 'gulceBildi') },
        { hedef: 'pera', etiket: 'Pera\'ya çık' },
      ],
    },
    buro: {
      ad: 'Liman kayıt bürosu',
      ilkSahne: 'gulce_ogrenir',
      tarif: 'Damga, toz, mürekkep. Gülce\'nin masası. Bugün masa düzgün değil; dosyalar dağınık.',
      nesneler: [],
      kisiler: ['gulce'],
      gecisler: [{ hedef: 'rihtim', etiket: 'Rıhtıma dön' }],
    },
    gulce_ev: {
      ad: 'Gülce\'nin evi',
      ortam: 'ortam_oda',
      tarif: 'Kumkapı\'da, denize inen bir sokakta iki katlı ahşap bir ev. Annesi öldükten sonra Gülce tek başına yaşıyor. Bir oda hiç açılmamış: babasının odası.',
      nesneler: [
        {
          id: 'baba_sandigi',
          etiket: 'Kâmil Efendi\'nin sandığı',
          incele: (d) =>
            delilVar(d, 'baba_mektubu')
              ? 'Sandık açık. Gülce babasının fesini dizine koymuş, bakıyor.'
              : 'Gülce altı yıldır açmadığı sandığın kilidini çeviriyor. Bir fes, bir tespih, bir gözlük, bir deste mektup. En alttaki zarfın üstünde annesinin adı; hiç gönderilmemiş. Gülce açıp okuyor; sonra sana uzatıyor. Raporumu verdim, Gümrük Kalemi, evrak 1329/417. Ben imzalamayacağım. Çocuğa babasının imzasız bir adam olduğunu söyle.',
          etki: (d) => (delilVar(d, 'baba_mektubu') ? null : { delil: ['baba_mektubu'] }),
        },
      ],
      kisiler: [],
      gecisler: [{ hedef: 'rihtim', etiket: 'Rıhtıma dön' }],
    },
    maliye: {
      ad: 'Maliye Nezareti',
      ortam: 'ortam_arsiv',
      tarif: 'Taş koridorlar, uyuklayan odacılar, dosya taşıyan kâtipler. Merdivenin dibinde arşive inen demir kapı. Rıza Bey kapıdaki yaşlı kâtiple eski bir tanıdık gibi şakalaşıyor.',
      nesneler: [
        {
          id: 'arsiv_kapisi',
          etiket: 'Arşivin kapısı',
          incele: (d) => (delilVar(d, 'kamil_raporu') ? 'Arşiv karanlık. Aradığınızı buldunuz.' : 'Demir kapı aralık. Aşağıdan küf ve kâğıt kokusu.'),
          etki: (d) => (delilVar(d, 'kamil_raporu') ? null : { sahne: 'arsiv' }),
        },
      ],
      kisiler: [],
      gecisler: [{ hedef: 'rihtim', etiket: 'Rıhtıma dön' }],
    },
    pera: {
      ad: 'Pera',
      ortam: 'ortam_pera',
      tarif: 'Grand Rue de Péra. Konsolosluklar, pastaneler, İngiliz subayları. Tepebaşı\'nda Pera Palas; kapısında bir kapıcı, önünde arabalar.',
      nesneler: [
        {
          id: 'pera_palas',
          etiket: 'Pera Palas',
          incele: (d) =>
            delilVar(d, 'whitlock_nazim')
              ? 'Whitlock otelden çıkmış. Lobide yalnızca bir piyano.'
              : 'Rıza Bey karşı kaldırımdaki bir kahvede iki saat bekliyor. Öğleye doğru Whitlock çıkıyor; bir arabaya biniyor. Araba Sirkeci\'ye, oradan Maliye\'ye. İçeri bir zarf bırakıyor. Odacılardan biri Rıza Bey\'in eski muhbiri: zarfı açmadan kopyalıyor. Akşam Neslihan kopyayı okuyor: siyakat harfleri. Otuz sandık, Columbia, 28 Haziran sabahı, Galata. Viyana\'da karşılanacak.',
          etki: (d) => (delilVar(d, 'whitlock_nazim') ? null : { delil: ['whitlock_nazim'] }),
        },
      ],
      kisiler: [],
      gecisler: [{ hedef: 'rihtim', etiket: 'Karaköy\'e in' }],
    },
  },

  kisiler: {
    gulce: {
      ad: 'Gülce',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Gülce bir dosyayı kapatıyor. Ne istiyorsun? diyor. Sesi yorgun ama kararlı.',
          secenekler: [
            {
              etiket: 'Columbia\'nın manifestosu.',
              kosul: (d) => !delilVar(d, 'agir_sandik'),
              etki: { delil: ['agir_sandik'] },
              sonra: 'ilk',
              cevap: 'Gülce çekmeceden bir kâğıt çıkarıyor. Amerikan şilebi Columbia, diyor. Otuz sandık tütün, New York. Her sandık dört yüz kilo. Bir tütün sandığı seksen kiloyu geçmez, Arif. Gümrükte yirmi yıllık hamallar bunu bilir. Sandığın içinde tütün yoksa ne var?',
            },
            { etiket: 'Hiçbir şey.' },
          ],
        },
      },
    },
    neslihan: {
      ad: 'Neslihan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Neslihan Gülce\'yi uzaktan izliyor. O kızı anlıyorum, diyor. Birinin ne olduğunu öğrenince insanın içinde bir şey kırılıyor. Ama kırılınca da içi görünüyor.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
    riza: {
      ad: 'Rıza Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Rıza Bey bıyığını sıvazlıyor. Maliye\'nin arşiv kâtibi benim eski komşum, diyor. Ben onu konuştururum. Siz aşağı inersiniz. Ama çabuk olun; o adam dedikoduyu sever ama işini de sever.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
    nermin: {
      ad: 'Nermin Hanım',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Nermin defterini açık tutuyor. Gazetem İzmir yazılarımı basmadı, diyor. Sansür. Ama bir müsteşarın imzalı itirafını basmazlarsa, kendi matbaamı kurarım.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
    cemil: {
      ad: 'Cemil Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Cemil Bey Gülce\'nin bürosuna doğru bakıyor. O kız altı yıldır bir yarayı açık tutuyor, diyor. Kapanması için önce temizlenmesi gerek. Temizlemek acıtır.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
  },
};

