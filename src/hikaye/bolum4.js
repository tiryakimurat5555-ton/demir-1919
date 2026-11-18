// Dördüncü bölüm: "Kül". Yangının ertesi günü. Rıza Bey ekibe katılır, Gülce sırrını açar,
// Komiser Halim sorgulanır, gece Kurşunlu Han'ın arkasındaki depoda Delorme'la yüzleşilir.
// Yeni oynanış: sorgu (baskı: doğru delili doğru anda sunmak; tehdit Rıza'yı kızdırır).
// Bütün kişiler KURGUDUR. Kurşunlu Han (Karaköy) gerçek bir yapıdır; arkasındaki depo kurgudur.
import { BOLUM3 } from './bolum3';
import { bayrak, cikarimVar, delilVar, sayi } from '../oyun/motor';

const BASKI_SINIRI = 3;

export const BOLUM4 = {
  id: 'bolum4',
  ad: 'Dördüncü bölüm: Kül',
  baslangic: 'acilis',
  ilkMekan: 'hastane',

  deliller: {
    ...BOLUM3.deliller,
    gumruk_kaydi: { ad: 'Santa Lucia\'nın çıkış kâğıtları', tarif: 'Gülce\'nin getirdiği gümrük kâğıtları: yükleme bu gece saat onda, kalkış on birde. Yük: tarım aletleri. Altında Yüzbaşı Hargreaves\'in imzası.' },
    halim_itiraf: { ad: 'Komiser Halim\'in itirafı', tarif: 'Halim, Sabri\'yi Delorme\'un öldürdüğünü, kendisinin yalnızca sarhoşluk süsü verip gömme emrini imzaladığını söyledi. Gazete ve ihbar yüzünden Delorme sevkiyatı öne almış.' },
  },

  cikarimlar: {
    ...BOLUM3.cikarimlar,
    katil_delorme: {
      a: 'halim_itiraf',
      b: 'ince_yara',
      ad: 'Sabri\'yi Delorme öldürdü',
      metin: 'Halim\'in itirafı ile Cemil Bey\'in bulduğu yara aynı şeyi söylüyor: Lejyon usulü, kaburgaların arasından tek bir darbe. Sabri\'yi Lucien Delorme kendi eliyle öldürdü.',
    },
    saat_on: {
      a: 'halim_itiraf',
      b: 'gumruk_kaydi',
      ad: 'Yükleme bu gece saat onda',
      metin: 'Halim\'in söylediği ile gümrük kâğıtları örtüşüyor: tüfekler bu gece saat onda Kurşunlu Han\'ın arkasındaki depodan mavnaya yüklenecek, Santa Lucia on birde demir alacak.',
    },
  },

  olaylar: [
    {
      id: 'gece',
      kosul: (d) => cikarimVar(d, 'katil_delorme') && cikarimVar(d, 'saat_on'),
      etki: { mekan: 'depo', sahne: 'depo_yaklasim' },
    },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Dördüncü bölüm bitti.' },
    { kosul: (d) => !bayrak(d, 'rizaPlan'), metin: 'Hastanede Rıza Bey\'le konuş.' },
    { kosul: (d) => !delilVar(d, 'gumruk_kaydi'), metin: 'Gülce hastaneye geldi. Onunla konuş.' },
    { kosul: (d) => !delilVar(d, 'halim_itiraf'), metin: 'Akşam, Yüksekkaldırım\'daki meyhanede Komiser Halim\'i Rıza Bey\'le sorgula. Doğru delili doğru anda sun.' },
    { kosul: () => true, metin: 'Halim\'in itirafını panoda diğer delillerle birleştir. Gece yaklaşıyor.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_hastane',
      baslik: 'Gureba, sabah',
      paragraflar: (d) => [
        'Gureba Hastanesi\'nin koğuşunda, demir bir karyolada Süleyman Kaptan yatıyor. Sol kolu ve yüzünün yarısı sargılar içinde. Uyuyor; nefesi hırıltılı ama düzenli. Cemil Bey sabaha kadar başından ayrılmadı.',
        bayrak(d, 'karar3') === 'gazete'
          ? 'Nermin elinde sabah gazetesiyle geliyor, yüzü öfkeden kızarmış. Sansür, diyor, gazeteyi yatağın ayak ucuna fırlatarak. Sansür memuru yazının yarısını kesmiş. Geriye kalan: kimliği belirsiz bir tüccarın şüpheli yükleri. Ama Ferrante okuyacak. Delorme okuyacak. Korkuttuk onları; durdurmadık.'
          : bayrak(d, 'karar3') === 'depo'
            ? 'Nermin sabaha karşı geldi, gözlerinin altı mor. Bütün gece depoyu izlemiş. Bir şey değişti, diyor. Gece yarısından sonra depoya iki araba girdi. Acele ediyorlar.'
            : 'Nermin geliyor, elinde postanenin makbuzu. Mektup gitti, diyor. Kimin masasına düştüğünü bilmiyoruz. Ama Galata\'da bu sabah iki İngiliz askerî polisi Ferrante\'nin yazıhanesinin önünde dolaşıyordu. Biri bir şey okumuş.',
        'Sonra kapıda biri beliriyor. Yetmişine yakın, dimdik, bembeyaz bıyıklı bir adam. Eski bir polis paltosu, cilalı ama eskimiş postallar. Koğuşa girerken şapkasını çıkarıyor.',
        bayrak(d, 'karar1') === 'polis'
          ? 'Onu tanıyorsun. Cihangir\'deki yaşlı adam. Belgeyi verdiğin adam. Yine karşılaştık, evlat, diyor. Söylemiştim sana: kimseye güvenme. Bana da. Ama bu sefer ben sana geldim.'
          : 'Süleyman\'ın gözleri açılıyor. Rıza, diye fısıldıyor. Geldin demek. Yaşlı adam karyolanın yanına çöküyor ve kaptanın yanmamış elini tutuyor.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'hastane', bayrak: { 'gorüldü_hastane': true } } }],
    },

    depo_yaklasim: {
      ortam: 'ortam_depo',
      baslik: 'Gece, Kurşunlu Han',
      paragraflar: (d) => [
        'Saat dokuz buçuk. Karaköy karanlık; yangından kalan duman hâlâ rıhtımın üstünde asılı. Kurşunlu Han\'ın kalın taş duvarlarının arkasında, denize bakan depo. Kapısında bir fener, önünde iki adam.',
        'Rıza Bey eski tabancasını kontrol ediyor; parmakları titremiyor. Cemil Bey Gureba\'da, Süleyman\'ın başında; çantasını hazır tutuyor. Nermin karşı binanın penceresinde, elinde not defteri. Gülce ' + (bayrak(d, 'gulceGecikme') ? 'gümrükte; Santa Lucia\'nın çıkış damgasını bir çekmecede unutmuş gibi yapıyor.' : 'evinde; sen öyle istedin.'),
        'Depoya iki yoldan girilir, diyorsun. Denizden, yükleme kapağından; ya da damlardan, Kurşunlu Han\'ın çatısından. İkisini de bilirsin; on yıl burada yük taşıdın.',
      ],
      secenekler: [
        {
          etiket: 'Kayıkçı Hüsnü\'nün sandalıyla denizden yanaş.',
          etki: { bayrak: { yol: 'deniz' } },
          sonra: 'depo_ic',
        },
        {
          etiket: 'Kurşunlu Han\'ın damlarından geç, çatı penceresinden in.',
          etki: { bayrak: { yol: 'dam' } },
          sonra: 'depo_ic',
        },
      ],
    },
    depo_ic: {
      ortam: 'ortam_depo',
      baslik: 'Depo',
      paragraflar: (d) => [
        bayrak(d, 'yol') === 'deniz'
          ? 'Hüsnü küreği suya hiç ses çıkarmadan daldırıyor. Yükleme kapağının altından süzülüyorsunuz. Islak taş basamaklar, yosun kokusu.'
          : 'Kurşunlu Han\'ın damında kiremitler ayağının altında kayıyor. Çatı penceresinden bir halatla iniyorsun; Rıza Bey yaşına rağmen arkandan geliyor, nefesini tutarak.',
        'İçerisi fenerlerle aydınlık. Kırk sandık; yarısı kapı ağzına, mavnaya taşınmış. Ve sandıkları taşıyanlar... hamallar. Senin hamalların. Topal Hasan, Arnavut Rexhep, Kürt Mıho. Gündelik verilmiş, ne taşıdıklarını bilmiyorlar.',
        'Kapağı kırılmış bir sandık açık duruyor. İçinde, yağlı kâğıda sarılı tüfekler. Mauser. Senin Çanakkale\'de taşıdığının aynısı. Elin kendiliğinden birinin kundağına gidiyor; ağırlığını, soğukluğunu tanıyorsun.',
        'Topal Hasan seni görüyor. Yüzü bembeyaz oluyor. Arif? Sen burada ne...',
      ],
      secenekler: [
        {
          etiket: 'Hasan\'a fısılda: Bu tüfekler Sabri\'yi öldürenlerin. Adamlarını al ve sessizce çık.',
          etki: { bayrak: { hamallarCikti: true }, artir: { hamalBag: 1 } },
          sonra: 'halim_durumu',
        },
        {
          etiket: 'Hasan\'a susmasını işaret et. Onları bu işe karıştırma.',
          etki: { bayrak: { hamallarCikti: false } },
          sonra: 'halim_durumu',
        },
      ],
    },
    halim_durumu: {
      ortam: 'ortam_depo',
      baslik: 'Halim',
      paragraflar: (d) =>
        bayrak(d, 'halimKarar') === 'birak'
          ? [
              'Sandıkların arkasında, bir branda altında bir şey. Rıza Bey brandayı kaldırıyor ve bir an hiç kıpırdamıyor.',
              'Komiser Halim. Gözleri açık. Koltuk altında mercimek büyüklüğünde bir delik.',
              'Rıza Bey eğilip ölünün gözlerini kapatıyor. On sekiz yaşındaydı polisliğe aldığımda, diyor, sesi kırık. Açtı. Ben doyurdum. Ben polis yaptım. Sonra biri ona benden fazlasını verdi.',
              'Bıraktık, o da onlara koştu. Ve onlar onu temizledi. Sabri gibi.',
            ]
          : [
              'Rıza Bey sandıkların arasında durup karanlığa bakıyor. Halim\'i dün gece Kasımpaşa karakolundaki eski bir çavuşuma teslim ettim, diyor alçak sesle. Güvendiğim tek adama.',
              'Bir sesi daha var bu deponun: yumuşak, düzgün, lavanta kokan bir ses. Karanlıktan geliyor.',
            ],
      secenekler: [{ etiket: 'Devam', sonra: 'yuzlesme' }],
    },
    yuzlesme: {
      ortam: 'ortam_depo',
      baslik: 'Delorme',
      paragraflar: (d) => [
        'Fenerin ışığına çıkıyor. Gri palto, eldivenler, özenle taranmış saçlar. Elinde ne silah ne bıçak; sadece bir sigara.',
        'Hamal, diyor gülümseyerek. Sonunda tanıştık. ' + (bayrak(d, 'gorulmusOlabilir') ? 'Morgdaki soğuk odadan beri seni bekliyordum.' : 'Yüzünü hiç görmemiştim; ama seni hep tanıyormuşum gibi.'),
        bayrak(d, 'halimKarar') === 'birak'
          ? 'Halim\'i bulmuşsunuz. Zavallı adam. Korkak adamlar uzun yaşamaz; bunu sana yaşlı arkadaşın da söyler.'
          : 'Halim\'i karakola götürdünüz, değil mi? Ne yazık. Sabaha hücresinde asılı bulunacak. Karakollar da bizim, hamal. Her şey bizim.',
        'Defter sende. Ya da bir kopyası. Ver onu bana. Karşılığında yaşlı kaptanın bir daha hiç yanmaz. Ve...',
        'Bir an duruyor. Gözleri yüzünde dolaşıyor, sanki bir şeyi tartıyor.',
        'Ve o fotoğraf. Kulüpte cebine nasıl dokunduğunu gördüm, hamal. O yüzü tanıyorsun. Manastır, değil mi? Bil bakalım ben neler biliyorum.',
      ],
      secenekler: [
        {
          etiket: 'Üstüne atıl. Bir asker gibi.',
          etki: { bayrak: { yuzlesme: 'saldir', yaraKol: true }, artir: { travma: 1 } },
          sonra: 'saldir',
        },
        {
          etiket: 'Konuşmaya devam et. Rıza Bey\'e yanından dolaşması için vakit kazandır.',
          etki: { bayrak: { yuzlesme: 'oyala' } },
          sonra: 'oyala',
        },
        {
          etiket: 'Fotoğrafı cebinden çıkar ve ona uzat. Ne bildiğini söylesin.',
          etki: { bayrak: { yuzlesme: 'fotograf', fotografVerildi: true } },
          sonra: 'fotograf_ver',
        },
      ],
    },
    saldir: {
      ortam: 'ortam_depo',
      efekt: ['silah'],
      baslik: 'Bıçak',
      paragraflar: [
        'Aradaki üç adımı bir adımda alıyorsun. Delorme kıpırdamıyor bile; son anda bir yana kayıyor ve eldiveninden ince bir parıltı çıkıyor.',
        'Sol kolunda soğuk bir çizgi. Sonra sıcaklık. Kan.',
        'Bir silah patlıyor; deponun taş duvarlarında yankılanıyor. Rıza Bey. Delorme sendeliyor, omzunu tutuyor, sonra gülüyor; gerçekten gülüyor. Ve kendini yükleme kapağından karanlık suya atıyor.',
        'Dışarıda bir motor çalışıyor. Uzaklaşıyor.',
        'Kolundan kan akıyor. Kulaklarında yine o çınlama. Ama ayaktasın.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'sandiklar' }],
    },
    oyala: {
      ortam: 'ortam_depo',
      efekt: ['silah'],
      baslik: 'Ateş',
      paragraflar: [
        'Neden, diyorsun. Bir ateşçiyi bir çanta kâğıt için öldürdünüz. Bir şehre tüfek döküyorsunuz. Ne için? Para mı?',
        'Delorme sigarasını yakıyor. Para, diyor küçümseyerek. Para bir araç, hamal. Savaş bitti, diyorlar. Sınırlar çiziliyor; yeni krallar, yeni bayraklar. Biz yalnızca ateşi canlı tutuyoruz. Her yerde küçük yangınlar. Kimin kazanacağına biz karar veririz. Bir sonraki büyük savaşın borcunu şimdiden satın alıyoruz.',
        'Bir sonraki savaş, diyorsun. Bir sonraki Çanakkale.',
        'Daha büyüğü, diyor gülümseyerek. Çok daha büyüğü.',
        'Arkasındaki karanlıkta bir tabancanın horozu kalkıyor. Rıza Bey. Delorme bunu duyuyor; gözlerini senden ayırmadan geri geri yürüyor. Silah patlıyor; mermi bir sandığın kapağını parçalıyor. Delorme yükleme kapağından karanlık suya atlıyor. Bir motor çalışıyor, uzaklaşıyor.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'sandiklar' }],
    },
    fotograf_ver: {
      ortam: 'ortam_depo',
      baslik: 'Fotoğraf',
      paragraflar: [
        'Fotoğrafı cebinden çıkarıyorsun. Örgülü saçlar, gülümsemeyen bir kız. Delorme eldivenli eliyle alıyor, ışığa tutuyor.',
        'Ne kadar benziyorsunuz, diyor yumuşak bir sesle. Kaşlar. Çene. Gözlerinizdeki o inat.',
        'Kalbin duruyor gibi.',
        'O yaşıyor, hamal. Ve senin hiç bilmediğin bir hayatı yaşıyor. Bizim hayatımızı. Fotoğrafı ceketinin iç cebine koyuyor, senin koyduğun gibi. Onu geri istiyorsan, defteri getir. Selanik\'te bekleriz.',
        'Rıza Bey karanlıktan çıkıp tabancasını kaldırdığında Delorme çoktan yükleme kapağındadır. Bir adım ve karanlık su. Bir motor çalışıyor, uzaklaşıyor.',
        'Elin boş. Cebin boş. Ama içinde yıllardır ilk kez bir şey yanıyor: umut. Ya da ondan daha tehlikeli bir şey.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'sandiklar' }],
    },
    sandiklar: {
      ortam: 'ortam_depo',
      baslik: 'Sandıklar',
      paragraflar: (d) => {
        const p = [];
        if (bayrak(d, 'karar3') === 'ihbar') {
          p.push(
            'Dışarıda düdükler. Kapı kırılarak açılıyor; içeri İngiliz askerî polisleri doluşuyor. Başlarında genç, kızıl saçlı bir teğmen. Elinde senin imzasız mektubun.',
            'Teğmen Ashford, diyor Nermin\'e İngilizce, Nermin de sana çeviriyor. Yüzbaşı Hargreaves bu sabah tutuklandı. Mektubunuz doğru masaya düştü.',
            'Cemil Bey\'in sözü aklına geliyor: her ordunun içinde birkaç dürüst adam vardır.'
          );
        } else if (bayrak(d, 'gulceGecikme')) {
          p.push(
            'Santa Lucia\'nın çıkış damgası Gülce\'nin çekmecesinde kayboldu; gemi kalkamıyor. Rıza Bey eski jandarma arkadaşlarını çağırıyor; yarım saat sonra depo, ellerinde fenerler, bıyıklı, yaşlı ama dimdik adamlarla dolu.',
            'Kırk sandığın kırkı da mühürleniyor.'
          );
        } else {
          p.push(
            'Mavna yarı yüklü, kapıdan çıkmak üzere. Santa Lucia\'ya vakit yok; gemi on birde demir alacak.',
            'Bir fenerin gazını sandıkların üstüne döküyorsun. Rıza Bey bir kibrit çakıyor. Mavna alev alıyor; ip kesiliyor, akıntı yanan mavnayı Haliç\'in ağzına doğru sürüklüyor. Sandıkların yarısı alevlerin içinde denize gömülüyor. Yarısı çoktan gemideydi.',
            'Yirmi sandık tüfek Odesa\'ya gidecek. Yirmisi gitmeyecek. Bu gece bu kadarı.'
          );
        }
        p.push(
          bayrak(d, 'hamallarCikti')
            ? 'Topal Hasan ve diğerleri karşı kaldırımda bekliyor. Seni görünce Hasan başını sallıyor. Bundan sonra kim ne taşıtırsa önce sana sorarız, Arif, diyor.'
            : 'Hamallar dağılmış, korkudan. Yarın rıhtımda herkes bu geceyi konuşacak.'
        );
        p.push(
          'Delorme\'un attığı yerde, yükleme kapağının kenarında, ıslak bir zarf. İçinde katlanmış bir telgraf. Nermin okuyor: SALONIQUE. N. ARRIVE 23 DÉCEMBRE. ATTENDRE INSTRUCTIONS.',
          'Selanik, diyor Nermin. N. yirmi üç aralıkta geliyor. Talimat bekleyin.'
        );
        return p;
      },
      secenekler: [
        {
          etiket: 'Devam',
          etki: (d) => ({
            bayrak: {
              sevkiyatSonuc: bayrak(d, 'karar3') === 'ihbar' || bayrak(d, 'gulceGecikme') ? 'tam' : 'yarim',
              telgraf: true,
            },
          }),
          sonra: 'kul',
        },
      ],
    },
    kul: {
      ortam: 'ortam_rihtim',
      ortamOran: 0.5,
      baslik: 'Kül',
      paragraflar: (d) => [
        'Sabah. Yanmış kayıkhanenin önündesin. Kömürleşmiş kalaslar, erimiş bir kandil, paslı pusula külün içinde; ibresi hâlâ kuzeyi gösteriyor. Alıp cebine koyuyorsun.',
        bayrak(d, 'yaraKol')
          ? 'Sol kolun Cemil Bey\'in diktiği sargının altında zonkluyor. Birkaç hafta ağır bir şey kaldıramazsın, dedi. Hamal için kötü haber, diye ekledi gülerek. Dedektif için değil.'
          : 'Ellerin hâlâ is kokuyor.',
        bayrak(d, 'halimKarar') === 'birak'
          ? 'Rıza Bey Halim\'i dün gece kendi elleriyle gömdü. Kimse gelmedi.'
          : 'Kasımpaşa karakolundan haber geldi: Komiser Halim sabaha karşı hücresinde asılı bulunmuş. Rıza Bey haberi aldığında tek kelime etmedi; yalnızca şapkasını çıkarıp uzun süre elinde tuttu.',
        'Rıza Bey yanına geliyor. Kırk yıl bu şehrin polisiydim, diyor. Bir avuç hırsızı, bir avuç katili yakaladım. Bu adamlar onlara benzemiyor. Bunlar şehrin kendisini satın alıyor. Yaşım geçti ama, eğer istersen, seninle geleceğim. Selanik\'e de, cehenneme de.',
        'Gülce biraz uzakta, kollarını göğsünde kavuşturmuş, denize bakıyor. Babasının mektubu çantasında, biliyorsun. Bir gün adalet mi istediğine, intikam mı istediğine karar verecek. Belki sen de.',
        bayrak(d, 'fotografVerildi')
          ? 'Cebin boş. Fotoğraf Delorme\'da. Ama yüzü artık gözlerini kapattığında da önünde.'
          : 'Fotoğraf cebinde. Örgülü saçlar. Selanik. Yirmi üç aralık.',
        'Süleyman Kaptan Gureba\'nın penceresinden, sargıları içinde, seni izliyor. Kül de topraktır evlat, demişti dün gece. Üstüne yeniden kurulur.',
        'Dördüncü bölümün sonu.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { rizaEkipte: true, bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_rihtim',
      ortamOran: 0.4,
      baslik: 'Dördüncü bölüm bitti',
      paragraflar: ['Rıza Bey artık ekibinde. Hikâye beşinci bölümde, Selanik\'e giden vapurda sürüyor. Kararların kaydedildi.'],
      secenekler: [
        { etiket: 'Beşinci bölüme geç', sonrakiBolum: 'bolum5' },
        { etiket: 'Ana menüye dön', anaMenu: true },
      ],
    },
  },

  mekanlar: {
    hastane: {
      ad: 'Gureba Hastanesi, koğuş',
      tarif: 'Uzun, yüksek tavanlı bir koğuş. Sıra sıra demir karyolalar, öksürükler, bir hastabakıcının taş zemindeki ayak sesleri. Pencereden yağmurlu bir avlu. Süleyman Kaptan en sondaki karyolada.',
      nesneler: [
        {
          id: 'pusula_yok',
          etiket: 'Süleyman\'ın komodini',
          incele: 'Bir bardak su, Cemil Bey\'in bıraktığı bir şişe ilaç ve Süleyman\'ın yanık eliyle sıktığı tespih. Kırk yıllık pusulası kayıkhanede kaldı. Kül oldu herhalde.',
        },
      ],
      kisiler: ['suleyman', 'riza', 'gulce', 'nermin', 'cemil'],
      gecisler: [{ hedef: 'meyhane', etiket: 'Akşam, Yüksekkaldırım\'daki meyhaneye git', kosul: (d) => bayrak(d, 'rizaPlan') && delilVar(d, 'gumruk_kaydi') }],
    },

    meyhane: {
      ad: 'Yüksekkaldırım\'da bir meyhane',
      tarif: 'Merdivenli sokağın ortasında, buğulu camlı küçük bir meyhane. Rakı, ızgara ve yağmur kokusu. Bir köşede ud çalınıyor. En dipteki masada, sırtı duvara dönük, şişman ve bıyıklı bir adam: Komiser Halim. Önünde bir kadeh, yanında bir zarf.',
      nesneler: [
        {
          id: 'zarf',
          etiket: 'Halim\'in masasındaki zarf',
          incele: 'Kalın bir zarf. Köşesinden İsviçre frangı banknotları görünüyor. Ferrante\'nin kâtibi biraz önce bırakıp gitti, diyor Rıza Bey alçak sesle. Her cuma. Yıllardır.',
        },
      ],
      kisiler: ['halim'],
      gecisler: [{ hedef: 'hastane', etiket: 'Hastaneye dön' }],
    },

    depo: {
      ad: 'Kurşunlu Han\'ın arkasındaki depo',
      tarif: 'Fenerlerin aydınlattığı taş bir depo. Sandıklar, ıslak taş, denize açılan yükleme kapağı.',
      nesneler: [],
      kisiler: [],
      gecisler: [],
    },
  },

  kisiler: {
    suleyman: {
      ad: 'Süleyman Kaptan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Süleyman güçlükle doğruluyor. Kayıkhane gitti, değil mi, diyor. Kırk yılım. Sonra yanmamış eliyle elini tutuyor. Üzülme evlat. Kül de topraktır. Üstüne yeniden kurulur. Sen yeter ki ayakta kal.',
          secenekler: [
            {
              etiket: 'Senin yerine yeni bir kayıkhane kuracağım kaptan. Söz.',
              kosul: (d) => !bayrak(d, 'kayikhaneSozu'),
              etki: { bayrak: { kayikhaneSozu: true }, artir: { suleymanBag: 1 } },
              sonra: 'ilk',
              cevap: 'Süleyman gülümsüyor, yanık yüzü acıyla buruşarak. Sözlerini tutan adamsın, biliyorum. Önce kendini koru.',
            },
            {
              etiket: 'Rıza Bey kim?',
              kosul: (d) => !bayrak(d, 'rizaKim'),
              etki: { bayrak: { rizaKim: true } },
              sonra: 'ilk',
              cevap: 'Otuz yıllık dostum. Bu şehrin en dürüst polisiydi; o yüzden onu erken emekli ettiler. Kahvemi o kadar çok içti ki, kayıkhanenin yarısı onun parasıyla dikildi. Ona güven. Ama ona yalan söyleme; anlar.',
            },
            { etiket: 'Dinlen kaptan.' },
          ],
        },
      },
    },

    riza: {
      ad: 'Rıza Bey',
      giris: (d) => (bayrak(d, 'rizaPlan') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: [
            'Rıza Bey seni baştan aşağı süzüyor; bir polisin süzüşü. Süleyman her şeyi anlattı, diyor. Belge, defter, Mercure. Bir de Halim.',
            'Sesi bir an titriyor, sonra yeniden sertleşiyor. Halim\'i polisliğe ben aldım. On sekiz yaşında, aç, yalınayak bir çocuktu. Ona okumayı, yazmayı, adamın gözüne bakmayı ben öğrettim. Şimdi bir katilin cebinden para yiyor.',
          ],
          secenekler: [
            { etiket: 'Onu nasıl bulacağız?', sonra: 'plan' },
            {
              etiket: 'Bu senin için kişisel, Rıza Bey. Ona karşı adil olabilecek misin?',
              etki: { artir: { rizaBag: 1 } },
              sonra: 'adil',
            },
          ],
        },
        adil: {
          soz: 'Rıza Bey uzun süre sana bakıyor. Sonra başını sallıyor. İyi soru. Kırk yılda bunu bana soran ikinci adamsın. Birincisi kendi babamdı. Adil olacağım. Ama acımayacağım.',
          secenekler: [
            {
              etiket: 'Babanız size neden sormuştu?',
              kosul: (d) => !bayrak(d, 'rizaBaba'),
              sonra: 'baba',
            },
            { etiket: 'Onu nasıl bulacağız?', sonra: 'plan' },
          ],
        },
        baba: {
          soz: 'Rıza Bey şapkasını dizinde çeviriyor. Doksan Sekiz\'de, diyor. Bir çocuğu karakola getirdiğim gece. Babam kapıda bekliyordu; imam efendiydi, Kasımpaşa\'da. Bu çocuğa adil olacak mısın, Rıza? dedi. Ona cevap vermedim. Yürüdüm geçtim. Sesi alçalıyor. O cevabı yirmi yıldır veriyorum evlat. Her gün.',
          secenekler: [
            {
              etiket: 'O geceyi bir gün anlatırsın, Rıza Bey. Ben beklerim.',
              etki: { bayrak: { rizaBaba: 'bekle' } },
              sonra: 'adil',
              cevap: 'Rıza Bey sana bakıyor; bir an polis bakışı değil bu. Beklersin, diyor. Bir gün anlatırım. Belki o gün sen de bana bir şey anlatırsın.',
            },
            {
              etiket: 'Çocuğa ne oldu?',
              etki: { bayrak: { rizaBaba: 'sor' } },
              sonra: 'adil',
              cevap: 'Rıza Bey şapkasını takıyor. Öldü, diyor. Benim yüzümden. Bugünlük bu kadarı yeter.',
            },
          ],
        },
        plan: {
          soz: 'Halim her cuma akşamı Yüksekkaldırım\'daki meyhanede oturur ve Ferrante\'nin kâtibinden zarfını alır. Yıllardır. Bu gece de oturacak; korktuğu için daha çok içecek. Ben masasına otururum, sen yanıma. Onu konuşturacağız. Ama dövmek yok, evlat. Ben adamımı döverek konuşturmam. Delille konuştururum.',
          secenekler: [
            {
              etiket: 'Anlaştık.',
              etki: { bayrak: { rizaPlan: true } },
              cevap: 'Rıza Bey şapkasını takıyor. Akşam ezanından sonra. Bu arada şu genç hanım seni görmek istiyor; kapıda bekliyor. Liman bürosundan.',
            },
          ],
        },
        sonra: {
          soz: (d) => (delilVar(d, 'halim_itiraf') ? 'Halim konuştu. Şimdi bildiklerimizi birleştir, evlat. Gece yaklaşıyor.' : 'Akşam ezanından sonra, Yüksekkaldırım. Önce Gülce Hanım\'la konuş.'),
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },

    gulce: {
      ad: 'Gülce',
      kosul: (d) => bayrak(d, 'rizaPlan'),
      giris: (d) => (delilVar(d, 'gumruk_kaydi') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: (d) => [
            bayrak(d, 'gulceyeAnlatti')
              ? 'Gülce koğuşun kapısında, siyah mantosunun içinde, elinde bir çanta. Gözleri kızarmış. Kayıkhaneyi duydum, diyor. Sana bir şey borçluyum: doğruyu.'
              : 'Gülce koğuşun kapısında, siyah mantosunun içinde, elinde bir çanta. Bana hiçbir şey anlatmadın, diyor. Ama ben duydum. Kayıkhane. Sana bir şey borçluyum: doğruyu.',
            'Çantasından eski, sararmış bir mektup çıkarıyor.',
          ],
          secenekler: [{ etiket: 'Dinliyorum.', sonra: 'baba' }],
        },
        baba: {
          soz: [
            'Babam Kâmil Efendi gümrükte muayene memuruydu. 1913\'te Selanik\'ten gelen bir geminin yük kaydını imzalamayı reddetti. Üç gün sonra Haliç\'ten çıkardılar. Kaza, dediler. Sarhoştu, düştü, dediler. Babam ağzına içki koymazdı.',
            'Sesi titremiyor. Bu cümleleri yıllardır içinden söylediği belli.',
            'Cebinden bu mektup çıktı. Tek satır: İmzala ve yaşa. Altında kanatlı bir anahtar. Sana o işareti ilk gösterdiğinde neden rengim attı, şimdi anlıyorsun. O büroya bu yüzden girdim. Onları bulmak için.',
          ],
          secenekler: [
            {
              etiket: 'Sabri gibi. Aynı yalan.',
              etki: { artir: { gulceGuven: 1 } },
              sonra: 'teklif',
            },
            {
              etiket: 'Sen adalet mi istiyorsun, intikam mı?',
              etki: { bayrak: { gulceSoru: true } },
              sonra: 'teklif',
              cevap: 'Gülce uzun süre susuyor. Bilmiyorum, diyor sonunda. Bunu bana kimse sormadı. Belki ikisi aynı şeydir. Belki değildir.',
            },
          ],
        },
        teklif: {
          soz: 'Çantasından resmî kâğıtlar çıkarıyor. Santa Lucia\'nın çıkış kâğıtları. Bu gece saat onda yükleme, on birde kalkış. Yük: tarım aletleri. İmza: Hargreaves. Ve bir şey daha yapabilirim: geminin çıkış damgasını geciktirebilirim. Damga benim çekmecemde. Bir iki saat kaybolursa gemi kalkamaz. Ama yakalanırsam...',
          secenekler: [
            {
              etiket: 'Yap. Bu gece o geminin kalkmaması lazım.',
              etki: { delil: ['gumruk_kaydi'], bayrak: { gulceGecikme: true } },
              cevap: 'Gülce başını sallıyor. Babam imzalamadı, diyor. Ben de damgalamayacağım.',
            },
            {
              etiket: 'Hayır. Sana bir şey olmasını istemem. Kâğıtlar yeter.',
              etki: { delil: ['gumruk_kaydi'], bayrak: { gulceGecikme: false }, artir: { gulceGuven: 1 } },
              cevap: 'Gülce bir an sana bakıyor; sonra gözlerini kaçırıyor. Peki, diyor. Ama bir gün beni korumaya çalışmaktan vazgeçmen gerekecek.',
            },
          ],
        },
        sonra: {
          soz: (d) => (bayrak(d, 'gulceGecikme') ? 'Damga bu gece çekmecemde kaybolacak. Gerisi sizde.' : 'Kâğıtlar sende. Dikkatli ol.'),
          secenekler: [{ etiket: 'Sağ ol Gülce.' }],
        },
      },
    },

    nermin: {
      ad: 'Nermin Hanım',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'karar3') === 'gazete'
              ? 'Sansürcü yazımı kesti ama makasının ucunda bir şey kaldı, diyor Nermin. Ferrante bu sabah yazıhanesini kapattı. Korkuyor. Korkan adam hata yapar.'
              : 'Bu gece depo, diyor Nermin. Ben karşı binanın penceresinde olacağım. Defterimle. Kim gelir, kim gider, saat kaç; hepsini yazacağım. Bir gün bunların hepsi gazetede çıkacak, sansürsüz.',
          secenekler: [
            {
              etiket: 'Dün gece söylediğin şey. Ağabeyin. Üzgünüm.',
              kosul: (d) => !bayrak(d, 'nerminAgabey'),
              etki: { bayrak: { nerminAgabey: true }, artir: { nerminBag: 1 } },
              sonra: 'ilk',
              cevap: 'Nermin bir an hiçbir şey demiyor. Adı Cevdet\'ti, diyor sonra. Şiir yazardı. Kötü şiirler. Ben hepsini saklıyorum.',
            },
            { etiket: 'Dikkatli ol.' },
          ],
        },
      },
    },

    cemil: {
      ad: 'Cemil Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Cemil Bey gözlüğünü siliyor. Kaptan iyileşecek, diyor. Yanık derin değil ama ciğerleri duman yuttu. Ben bu gece burada kalıyorum. Yaralı getirirseniz, ki getireceğinizi biliyorum, çantam hazır.',
          secenekler: [
            {
              etiket: 'Bana bir sargı ver. Ne olur ne olmaz.',
              kosul: (d) => !bayrak(d, 'sargi'),
              etki: { bayrak: { sargi: true } },
              sonra: 'ilk',
              cevap: 'Cemil Bey cebine bir paket sargı ve küçük bir şişe tentürdiyot koyuyor. Bunu kullanmak zorunda kalmamanı dilerim. Ama dilek tıpta pek işe yaramaz.',
            },
            { etiket: 'Sağ ol Cemil Bey.' },
          ],
        },
      },
    },

    halim: {
      ad: 'Komiser Halim',
      giris: (d) => (delilVar(d, 'halim_itiraf') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: (d) => {
            const b = sayi(d, 'baski');
            if (b >= BASKI_SINIRI) return 'Halim\'in eli titriyor; kadehi bırakıyor. Rengi atmış, terliyor. Gözleri kapıya, Rıza Bey\'e, sana gidip geliyor. Bir şey söylemek üzere.';
            if (b === 0)
              return [
                'Rıza Bey hiçbir şey sormadan Halim\'in masasına oturuyor; sen de yanına. Halim başını kaldırıyor, yüzündeki sarhoş gülümseme donuyor.',
                'Rıza Bey! Emekli kurt. Hayırdır? Bu hamal kim? Bir şey söyleyecekseniz söyleyin; ben meşgul adamım.',
              ];
            return 'Halim kadehine sarılıyor. Gülümsemesi gidip geliyor. Başka? diyor, ama sesi eskisi kadar emin değil.';
          },
          secenekler: [
            {
              etiket: 'Sabah altıda, cesedi kimse muayene etmeden imzaladığın defin emri.',
              kosul: (d) => !bayrak(d, 'sundu_defin'),
              etki: { bayrak: { sundu_defin: true }, artir: { baski: 1 } },
              sonra: 'ilk',
              cevap: 'Halim omuz silkiyor. Benim işim hız. Bir sarhoş boğulmuş. Ne bekleyecektim? Ama kadehini doldurmayı unutuyor.',
            },
            {
              etiket: 'Ceketine rakı döktünüz. Ama midesinde tek damla rakı yoktu.',
              kosul: (d) => !bayrak(d, 'sundu_raki'),
              etki: { bayrak: { sundu_raki: true }, artir: { baski: 1 } },
              sonra: 'ilk',
              cevap: 'Halim\'in bıyığı seğiriyor. Hangi hekim söyledi bunu? Gureba\'daki o ukala mı? Rıza Bey sakin: Hekim değil, Halim. Ölü söyledi.',
            },
            {
              etiket: 'K 7. Siyakatla yazılmış rüşvet defterindeki numaran.',
              kosul: (d) => cikarimVar(d, 'rusvet') && !bayrak(d, 'sundu_defter'),
              etki: { bayrak: { sundu_defter: true }, artir: { baski: 2 } },
              sonra: 'ilk',
              cevap: 'Halim\'in yüzündeki bütün kan çekiliyor. Kadehi devriliyor. O defter... diye fısıldıyor. O defterin sizde olduğunu bilseler...',
            },
            {
              etiket: 'Delorme seni de temizleyecek Halim. Sabri\'yi temizlediği gibi.',
              kosul: (d) => cikarimVar(d, 'delorme') && !bayrak(d, 'sundu_delorme'),
              etki: { bayrak: { sundu_delorme: true }, artir: { baski: 1 } },
              sonra: 'ilk',
              cevap: 'Halim yutkunuyor. Mösyö Delorme benim dostumdur, diyor; ama sesi o kadar zayıf ki kendisi de inanmıyor.',
            },
            {
              etiket: 'Yakasına yapış.',
              kosul: (d) => !bayrak(d, 'tehdit'),
              etki: { bayrak: { tehdit: true }, artir: { rizaBag: -1 } },
              sonra: 'ilk',
              cevap: 'Halim\'in yakasını kavrıyorsun. Meyhane bir anda susuyor. Rıza Bey\'in eli bileğine kapanıyor; demir gibi. Bırak, diyor alçak sesle. Ben adamımı döverek konuşturmam dedim. Bırakıyorsun. Halim yakasını düzeltip sırıtıyor.',
            },
            {
              etiket: 'Anlat Halim. Her şeyi.',
              kosul: (d) => sayi(d, 'baski') >= BASKI_SINIRI,
              sonra: 'itiraf',
            },
          ],
        },
        itiraf: {
          soz: [
            'Halim yüzünü ellerine gömüyor. Sonra konuşmaya başlıyor; alçak sesle, Rıza Bey\'in gözlerine bakamadan.',
            'Ben kimseyi öldürmedim. Yemin ederim. O gece beni motora çağırdılar. Delorme... çocuğu bıçakladı. Tek darbe, koltuk altından. Ses bile çıkmadı. Benden yalnızca rakı dökmemi ve sabah emri imzalamamı istediler.',
            'Gazete, ihbar, kayıkhane... Delorme sinirlendi. Sevkiyatı öne aldı. Bu gece saat onda, depodan mavnaya. On birde gemi kalkıyor.',
            'Rıza Bey\'e dönüyor; gözleri yaşlı. Hocam. Beni koru. Beni bırakırsanız beni de öldürürler.',
          ],
          secenekler: [
            {
              etiket: 'Rıza Bey, onu güvendiğin bir karakola götür. Mahkemede konuşsun.',
              etki: { delil: ['halim_itiraf'], bayrak: { halimKarar: 'tutukla' } },
              cevap: 'Rıza Bey başını sallıyor. Kasımpaşa\'da eski bir çavuşum var. Ona güvenirim. Halim\'i kolundan tutup kaldırıyor; tıpkı yıllar önce aç bir çocuğu sokaktan kaldırdığı gibi.',
            },
            {
              etiket: 'Bırak gitsin. Bu gece kimseye haber veremeyecek kadar korkuyor.',
              etki: { delil: ['halim_itiraf'], bayrak: { halimKarar: 'birak' } },
              cevap: 'Halim zarfı bile almadan kapıya koşuyor. Rıza Bey arkasından uzun süre bakıyor. Korkan adam sığınacak yer arar, diyor. Umarım doğru yere sığınır.',
            },
          ],
        },
        sonra: {
          soz: 'Halim\'in masası boş. Kadehi devrik.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
  },
};
