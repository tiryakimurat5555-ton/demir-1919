// Onuncu bölüm: "Kurşun Mühür". İstanbul, 10-15 Mayıs 1919. İkinci kitabın açılışı.
// Arif babası ve kız kardeşiyle Karaköy'e döner. Babanın itirafı: 1908'de Rivière için kanatlı mühür kalıbını döktü,
// 1912'de silah sandıklarının üstünde görünce anladı. Rainer'in yeni sevkiyatı (Santa Lucia, Trieste → İzmir) gümrükte.
// Baba ve oğul aynı kalıpla sahte kurşun mühürler döker; sandıkların içi değiştirilir, mühürler sağlam görünür.
// Delorme babayı kaçırır; Kız Kulesi'nde son yüzleşme.
// Arka plan (gerçek): Yunan ordusu 15 Mayıs 1919'da İzmir'e çıktı; işgal altındaki İstanbul'dan Anadolu'ya
// İnebolu yoluyla silah kaçırıldı. Kişiler ve olaylar KURGUDUR; gerçek kişiler kullanılmadı.
import { BOLUM9 } from './bolum9';
import { bayrak, cikarimVar, delilVar, sayi } from '../oyun/motor';

export const BOLUM10 = {
  id: 'bolum10',
  ad: 'Onuncu bölüm: Kurşun Mühür',
  baslangic: 'acilis',
  ilkMekan: 'rihtim',

  deliller: {
    ...BOLUM9.deliller,
    gumruk_listesi: { ad: 'Santa Lucia\'nın manifestosu', tarif: 'Santa Lucia, Trieste\'den, 11 Mayıs. Altmış sandık ziraat aleti. Alıcı: Ferrante ve Ortakları. Varış: İzmir, 16 Mayıs. Her sandıkta kurşun mühür; kanatlı anahtar. Gümrük muayenesi: muaf.' },
    baba_itirafi: { ad: 'Babanın itirafı', tarif: '1908 yazı, Manastır: Rivière bir banka mührü diye kanatlı anahtarın kalıbını ısmarladı. 1912 sonbaharı: aynı mühür hem Bulgar komitacılarına hem Osmanlı depolarına giden tüfek sandıklarında. Baba Selanik\'e gidip Rivière\'in yazıhanesinden kalıbı geri çaldı. Manastır\'a döndüğünde bir ihbarla tutuklandı.' },
    delorme_notu: { ad: 'Lavanta kokan not', tarif: 'Ustayı istiyorsan kalıbı getir. Yarın gece yarısı, Kız Kulesi. Yalnız gel. L. D.' },
  },

  cikarimlar: {
    ...BOLUM9.cikarimlar,
    ikinci_sevkiyat: {
      a: 'gumruk_listesi',
      b: 'viyana_ipucu',
      ad: 'Odun',
      metin: 'Rainer Viyana\'da söylemişti: Ateş ancak odun atılırsa yanar. Santa Lucia\'nın altmış sandığı o odun. İzmir\'e, çıkarmadan bir gün sonra varacak. Herkese satılmak üzere.',
    },
    kalip: {
      a: 'baba_itirafi',
      b: 'kalay_takimi',
      ad: 'Kalıp',
      metin: 'Yusuf\'un sakladığı küçük kalıp bir oyuncak değil: Kanatlı Anahtar\'ın asıl mühür kalıbı. Baban onu 1912\'de Rivière\'den geri çaldı. Bu kalıpla dökülen kurşun mühür, örgütün kendi mühründen ayırt edilemez.',
    },
  },

  olaylar: [
    {
      id: 'dokum',
      kosul: (d) => cikarimVar(d, 'ikinci_sevkiyat') && cikarimVar(d, 'kalip'),
      etki: { mekan: 'han', sahne: 'dokum' },
    },
    {
      id: 'kacirma',
      kosul: (d) => !!bayrak(d, 'sevkiyatKarar'),
      etki: { mekan: 'han', sahne: 'kacirildi' },
    },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Onuncu bölüm bitti.' },
    { kosul: (d) => !delilVar(d, 'gumruk_listesi'), metin: 'Liman kayıt bürosunda Gülce\'yi gör.' },
    { kosul: (d) => !delilVar(d, 'baba_itirafi'), metin: 'Kalafatçı Hanı\'nda babanla konuş.' },
    { kosul: (d) => !bayrak(d, 'sahteMuhur'), metin: 'Bulduklarını panoda birleştir.' },
    { kosul: (d) => !bayrak(d, 'sevkiyatKarar'), metin: 'Gece gümrük antreposuna git; sandıkların ne olacağına karar ver.' },
    { kosul: () => true, metin: 'Babanı bul.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_rihtim',
      efekt: ['vapur_duduk'],
      baslik: '10 Mayıs 1919, Karaköy',
      paragraflar: (d) => [
        'Dört ay. Baban Manastır\'da toparlanana kadar bekledin; sonra Selanik\'ten bir vapur. Şimdi Karaköy rıhtımında, bahar güneşi altında, babanın koluna giriyorsun.',
        'Rıhtım aynı: hamallar, martılar, İtilaf bayrakları. Ama yanmış kayıkhanenin yerinde yeni kalaslar, yeni bir çatı. Süleyman Kaptan ' + (bayrak(d, 'suleymanBag') ? 'bastonuna dayanmış, gülümsüyor; seni görünce bastonunu havaya kaldırıyor.' : 'bastonuna dayanmış, seni görünce başını sallıyor.'),
        'Neslihan bir adım arkanda. İstanbul\'u ilk kez görüyor. Boğaz\'a, Galata Kulesi\'ne, Sarayburnu\'na bakıyor; gözleri dolu. Bunu her gün mü görüyordun? diyor.',
        'Cemil Bey, Nermin, Rıza Bey. Hepsi burada. Ekip yeniden bir arada.',
        bayrak(d, 'isimlerBasildi')
          ? 'Nermin gazetenin ilk sayfasını uzatıyor: Kanatlı Anahtar listesi İstanbul\'da da basıldı. Üç memur istifa etti, biri ortadan kayboldu. Ama Rainer hâlâ Viyana\'da, hâlâ hayırsever.'
          : 'Rıza Bey sesini alçaltıyor: Sen yokken liman sessizdi, diyor. Fazla sessiz. Santa Lucia yarın geliyor. Trieste\'den.',
        'Ve baban bir şey söylemek istiyor. Yol boyu söylemek istedi. Bu akşam, diyor. Ohannes\'in ocağının başında. Kalayın yanında konuşmak daha kolay.',
      ],
      secenekler: [
        {
          etiket: 'Devam',
          etki: { mekan: 'rihtim', delil: ['kalay_takimi'], bayrak: { 'gorüldü_rihtim': true, ekip_cemil: true, ekip_nermin: true, ekip_riza: true } },
        },
      ],
    },
    dokum: {
      ortam: 'ortam_han',
      efekt: ['dokum'],
      baslik: 'Kurşun',
      paragraflar: [
        'Ohannes Usta\'nın ocağı. Körük soluyor. Baban kalıbı iki elinin arasında tutuyor; elleri titriyor, ama kalıba dokununca duruyor.',
        'Kurşunu Ohannes veriyor; kalafatın artığı. Baban kepçeyi sana uzatıyor. Sen dök, diyor. Ben elini tutarım.',
        'Erimiş kurşun kalıba akıyor; cızırdayarak. Baban kalıbı suya daldırıyor; buhar yüzüne vuruyor. Kalıbı açıyor: avucunda küçük, soğuk, gri bir mühür. Kanatlı anahtar. Kusursuz.',
        'Bir daha. Bir daha. Altmış kere. Her dökümde baban çekiçle mührün kenarına vuruyor: tak, tak-tak, tak.',
        'Bu kalıpla zehir döktüm, diyor baban sonunda. Şimdi kalay olsun. Yalnızca ince bir kat. Ama zehri tutsun.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { sahteMuhur: true }, mekan: 'han' } }],
    },
    sevkiyat_karari: {
      ortam: 'ortam_depo',
      baslik: 'Altmış sandık',
      paragraflar: (d) => [
        'Gece. Antreponun içinde fener ışığı. Altmış sandık; her birinde kanatlı mühür. Rıza Bey bir kapağı kaldırıyor: yağlı bezlere sarılı Mannlicher tüfekleri. Avusturya ordusunun teslim ettiği silahlar; şimdi Rainer\'in malı.',
        'Plan basit: sandıkları açmak, içlerini değiştirmek, babanın döktüğü mühürlerle yeniden kapamak. Ferrante\'nin adamları sabah altmış sandık taş ve kum yükleyecek. İzmir\'de açtıklarında iş işten geçmiş olacak.',
        'Ama tüfekler ne olacak?',
        bayrak(d, 'hasanHazir')
          ? 'Topal Hasan kapının yanında bekliyor. Kayıklar Tophane\'de, diyor. Karadeniz\'e, İnebolu\'ya. Oradan Anadolu\'ya. İngilizler mühürlü sandığa bakmaz.'
          : 'Hamallar kapının yanında bekliyor; sabah olmadan bitmeli.',
      ],
      secenekler: [
        {
          etiket: 'İngilizlere teslim et. Ferrante\'yi de yakalasınlar.',
          etki: { bayrak: { sevkiyatKarar: 'ingiliz' } },
          sonra: 'sevkiyat_ingiliz',
        },
        {
          etiket: 'Topal Hasan\'ın kayıklarıyla Anadolu\'ya gönder.',
          kosul: (d) => bayrak(d, 'hasanHazir'),
          etki: { bayrak: { sevkiyatKarar: 'anadolu' } },
          sonra: 'sevkiyat_anadolu',
        },
        {
          etiket: 'Boğaz\'ın dibine. Hiç kimsenin olmasın.',
          etki: { bayrak: { sevkiyatKarar: 'batir' } },
          sonra: 'sevkiyat_batir',
        },
      ],
    },
    sevkiyat_ingiliz: {
      ortam: 'ortam_depo',
      baslik: 'Teğmen Ashford',
      paragraflar: (d) => [
        bayrak(d, 'karar3') === 'ihbar'
          ? 'Teğmen Ashford şafakla geliyor; Aralık\'taki ihbarını unutmamış. Yine mi siz? diyor; gülümseyerek. İngiliz askerî polisi tüfekleri kamyonlara yüklüyor.'
          : 'Rıza Bey eski bir tanıdığı uyandırıyor: İngiliz askerî polisinde çevirmenlik yapan bir Rum. Sabaha karşı Teğmen Ashford geliyor; kuşkulu ama dikkatli. Tüfekler kamyonlara yükleniyor.',
        'Ferrante ve Ortakları\'nın yazıhanesi aynı sabah basılıyor. Ferrante yok; bir gün önce İzmir\'e gitmiş. Ama defterleri, mektupları burada.',
        'Silahlar bir işgal ordusunun deposuna gidiyor. Kimseyi vurmayacaklar; belki. Kime karşı kullanılacaklarına artık sen karar vermiyorsun.',
      ],
      secenekler: [{ etiket: 'Devam' }],
    },
    sevkiyat_anadolu: {
      ortam: 'ortam_kayik',
      baslik: 'Tophane',
      paragraflar: [
        'Gece boyu kayıklar Tophane\'den çözülüyor. Topal Hasan aksayarak ama hiç durmadan sandık taşıyor; sırtı, babanın yaşındaki bir adamın sırtı.',
        'İnebolu\'ya, diyor son kayığı iterken. Oradan dağlara. Bilmem kim alır, bilmem kimi vurur. Ama hiç değilse bu memleketin içinde kalır.',
        'Rainer\'in tüfekleri, Rainer\'in hiç hesaba katmadığı birinin eline gidiyor. Bunun ne demek olduğunu zaman gösterecek.',
      ],
      secenekler: [{ etiket: 'Devam' }],
    },
    sevkiyat_batir: {
      ortam: 'ortam_kayik',
      baslik: 'Boğaz',
      paragraflar: [
        'Süleyman Kaptan\'ın mavnası gece yarısı Sarayburnu açığına çıkıyor. Hamallar sandıkları birer birer suya bırakıyor. Her biri bir çırpıntı, bir hava kabarcığı, sonra hiçbir şey.',
        'Süleyman Kaptan bastonuyla suya bakıyor. Burası altmış kulaç, diyor. Akıntı aşağıda kuzeye çeker. Kırk yıl sonra bile kimse bulamaz.',
        'Altmış sandık. Kimseyi vurmayacak altı yüz tüfek. Ne kazanan var bu gece ne kaybeden. Belki ilk kez.',
      ],
      secenekler: [{ etiket: 'Devam' }],
    },
    kacirildi: {
      ortam: 'ortam_han',
      baslik: 'Boş oda',
      paragraflar: [
        'Sabah, yorgun argın hana döndüğünde kapı ardına kadar açık. Ohannes Usta yerde, alnı kanlı; inliyor. Neslihan bir köşede, ellerini kollarına sarmış, titriyor.',
        'Baban yok.',
        'Bir adam, diyor Ohannes güçlükle. Lavanta kokuyordu. İki kişiydiler. Ustayı kollarından tuttular. Usta karşı koymadı bile. Gelirim, dedi. Kızıma dokunmayın.',
        'Masada, babanın kalay takımının üstünde, katlanmış bir kâğıt. Lavanta kokuyor.',
      ],
      secenekler: [{ etiket: 'Kâğıdı aç', etki: { delil: ['delorme_notu'] }, sonra: 'kayik' }],
    },
    kayik: {
      ortam: 'ortam_kayik',
      baslik: 'Ertesi gece yarısı',
      paragraflar: (d) => [
        'Bütün gün bekledin. Şimdi Süleyman Kaptan\'ın kayığı Salacak\'a doğru süzülüyor. Kürekte Süleyman; yaşına, bastonuna rağmen. Bu suyu ben bilirim, diyor. Sen bilmezsin.',
        'Yalnız gel, demiş not. Yalnız değilsin. Rıza Bey kayığın dibinde, bir muşambanın altında, eski tabancasıyla yatıyor. Cemil Bey ve Nermin Salacak iskelesinde bekliyor; ellerinde fener.',
        bayrak(d, 'defterKarar') === 'sakla'
          ? 'Ceketinin astarında deri defter. Kalıp cebinde. Delorme ikisini de isteyecek.'
          : 'Kalıp cebinde. Defter artık sende değil; Delorme bunu biliyor mu?',
        'Önünde Kız Kulesi. Fenerinin ışığı suyun üstünde dönüp duruyor. Kulenin dibindeki küçük iskelede bir kayık bağlı.',
      ],
      secenekler: [{ etiket: 'Kuleye çık', sonra: 'kule' }],
    },
    kule: {
      ortam: 'ortam_kule',
      baslik: 'Kız Kulesi',
      paragraflar: (d) => [
        'Taş merdiven. Rüzgâr dar pencerelerden ıslık çalarak giriyor. Fenerin odasında, ışığın gölgesinde: baban, bir sandalyeye bağlı. Arkasında Delorme.',
        'Lucien Delorme. Ama Pera\'daki o şık adam değil. Sakalı uzamış, paltosu yırtık, sol eli hâlâ sargılı. Yalnızca lavanta aynı. Ve bıçak.',
        bayrak(d, 'delormeKovuldu')
          ? 'Kalıp, diyor. Sonra gidebilirsin. Ben de giderim. Viyana\'da senin sahte defterin yüzünden Rainer beni herkesin önünde kovdu; yirmi yıl, bir kâğıt parçası için. Kalıp elimdeyse bir sonraki Rainer ben olurum.'
          : 'Kalıp, diyor. Sonra gidebilirsin. Ben de giderim. Rainer bana sırtını döndü. Kalıp elimdeyse bir sonraki Rainer ben olurum.',
        bayrak(d, 'defterKarar') === 'sakla'
          ? 'Ve defter. Ceketinde olduğunu biliyorum. Sabri de ceketinde taşıyordu.'
          : bayrak(d, 'defterKarar') === 'gazete'
            ? 'Defter gazetelerde. Adım da orada. Viyana\'da, Paris\'te, İstanbul\'da. Artık kimse benimle iş yapmaz. Bana bir tek kalıp kaldı.'
            : 'Defteri Fransızlara verdin. Akıllıca. Onlar onu bir çekmeceye koyar. Ama kalıp…',
        'Baban başını kaldırıyor. Sana bakıyor; sis yok gözlerinde. Ver ona, oğul, diyor. Benim kalıbım bu. Benim günahım.',
      ],
      secenekler: [
        { etiket: 'Kalıbı uzat.', etki: { bayrak: { kuleSecim: 'kalip' } }, sonra: 'son_kalip' },
        { etiket: 'Delorme\'un üstüne atıl.', etki: { bayrak: { kuleSecim: 'atil' }, artir: { travma: 1 } }, sonra: 'son_atil' },
        { etiket: 'Rainer seni sattı, Lucien. Bunu sen de biliyorsun.', etki: { bayrak: { kuleSecim: 'konus' } }, sonra: 'son_konus' },
      ],
    },
    son_kalip: {
      ortam: 'ortam_kule',
      baslik: 'Kalıp',
      paragraflar: [
        'Kalıbı uzatıyorsun. Delorme alıyor, fenerin ışığına tutuyor; gözleri parlıyor. Kanatlı anahtar. Sonunda, diyor.',
        'Baban konuşuyor; sakin, ustanın sesiyle. O kalıp çatlak, evlat. Bu akşam altmış mühür döktük; altmışıncıda çatladı. Ondan dökeceğin her mühür yarım kanatlı çıkar. Herkes anlar.',
        'Delorme kalıba bakıyor. Bir an. O an yeter: sandalyenin ipleri gevşemiş, baban ayağa kalkıp bütün ağırlığıyla Delorme\'a yükleniyor. İkisi pencerenin kenarına sendeliyor.',
        'Babanı yakalayıp geri çekiyorsun. Delorme\'un eli boşluğu tutuyor. Kalıp elinden kayıyor. Ve Delorme, kalıbın peşinden, karanlık suya.',
        'Fenerin ışığı dönüyor. Su kapanıyor. Kalıp da, adam da gitti.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { delormeSonu: 'denizde', kalipKayip: true } }, sonra: 'safak10' }],
    },
    son_atil: {
      ortam: 'ortam_kule',
      efekt: ['silah'],
      baslik: 'Fener',
      paragraflar: (d) => [
        'Delorme\'un üstüne atılıyorsun. Bıçak havada bir yay çiziyor.',
        bayrak(d, 'yaraKol') || bayrak(d, 'yaraBogur')
          ? 'Eski yaran seni yarı yolda bırakıyor; bıçak omzuna saplanıyor. Yere düşüyorsun. Delorme bıçağı kaldırıyor.'
          : 'Bileğini yakalıyorsun; fenerin camına çarpıyorsunuz. Delorme dizini karnına gömüyor; düşüyorsun. Bıçağı kaldırıyor.',
        'Bir silah sesi. Merdivenin başında Rıza Bey, tabancası dumanlı. Delorme bir an olduğu yerde duruyor; şaşkın, sanki birine bir şey sormak ister gibi. Sonra yere çöküyor.',
        'Lavanta kokusu barut kokusuna karışıyor. Rıza Bey tabancasını indiriyor. Kırk yıl, diyor, kimseyi vurmadım. Döverek değil, delille. Bu gece delil bitti.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { delormeSonu: 'vuruldu' } }, sonra: 'safak10' }],
    },
    son_konus: {
      ortam: 'ortam_kule',
      baslik: 'Lavanta',
      paragraflar: (d) => [
        'Rainer seni sattı, diyorsun. Bir köpek gibi kullandı, sonra kapıdan attı. Kalıbı alsan ne olacak? Bir başka Rainer bulur seni. Bir başka Kız Kulesi.',
        bayrak(d, 'defterKarar') === 'sakla'
          ? 'Ceketinden defteri çıkarıp İstanbul sayfasını açıyorsun. Fenerin ışığında okuyorsun: L. D., temizlik, ayda iki yüz lira. Rainer seni de defterine yazmış, Lucien. Bir kalem gibi.'
          : 'Adın artık her yerde, diyorsun. Rainer\'in adı hiçbir yerde. Hep böyle oldu, değil mi?',
        'Delorme\'un bıçağı iniyor. Bir an genç görünüyor; çok yorgun bir genç adam. Lyon\'da bir kalaycı vardı, diyor tuhaf bir sesle. Babam. Hiç zengin olamadı.',
        'Kulenin dibinde bir motor sesi. Bir projektör ışığı pencereden içeri doluyor: İngiliz devriye motoru. Salacak iskelesindeki Cemil Bey ile Nermin fener sallayarak çağırmışlar.',
        'Delorme bıçağı yere bırakıyor. Babanın iplerini kendi eliyle çözüyor. Rainer\'in İzmir\'deki adamı Ferrante, diyor. Sandıklar yalnızca başlangıçtı. Asıl sevkiyat Haziran\'da. Sonra ellerini uzatıyor; kelepçeye.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { delormeSonu: 'tutuklu', ferranteIpucu: true } }, sonra: 'safak10' }],
    },
    safak10: {
      ortam: 'ortam_rihtim',
      ortamOran: 0.6,
      baslik: '15 Mayıs 1919',
      paragraflar: (d) => [
        bayrak(d, 'delormeSonu') === 'denizde'
          ? 'Sabaha karşı Süleyman\'ın tayfaları Salacak\'ta bir ceset buluyor. Lavanta kokmuyor artık; yalnızca deniz. Kalıp hiç bulunmuyor. Baban bunu iyi bir şey sayıyor.'
          : bayrak(d, 'delormeSonu') === 'vuruldu'
            ? 'Cemil Bey omzundaki yarayı dikiyor. Delorme\'un cesedini İngiliz devriyesi alıp götürüyor; tek kelime sormadan. Bir Fransız serseri, diye yazıyorlar raporlarına.'
            : 'Delorme bir İngiliz hücresinde. Sorgusu üç gün sürecek, diyor Rıza Bey. Ama konuşacak. Ferrante\'nin adı ilk sayfada.',
        {
          intikam: 'Sabahın ilk vapuruyla Gureba Mezarlığı\'na gidiyorsun. Sabri\'nin taşının başında, beş ay önce verdiğin söz: Seni bunu yapana bulduracağım. ' +
            (bayrak(d, 'delormeSonu') === 'tutuklu'
              ? 'Tuttun. Adam bir hücrede; hesabını bir hâkimin önünde verecek. Bu, beklediğinden çok daha fazla rahatlatıyor seni.'
              : 'Tuttun. Ama bir ceset, beklediğin gibi rahatlatmıyor. Taşın başında uzun süre duruyorsun; söyleyecek bir şey bulamıyorsun.'),
          huzur: 'Sabahın ilk vapuruyla Gureba Mezarlığı\'na gidiyorsun. Sabri\'nin taşına bir demet sümbül bırakıyorsun. Huzur içinde yat demiştin. Bugün ilk kez buna inanıyorsun.',
          sessiz: 'Sabahın ilk vapuruyla Gureba Mezarlığı\'na gidiyorsun. Beş ay önce, burada, bir şey söyleyememiştin. Bugün de söylemiyorsun. Ama bu kez başını eğmiyorsun; taşa dik dik bakıyorsun.',
        }[bayrak(d, 'mezarSozu')] || '',
        'Öğleye doğru Nermin rıhtıma koşarak geliyor. Yüzü bembeyaz. Elinde bir telgraf.',
        'Bu sabah Yunan askerleri İzmir\'e çıktı, diyor. Rıhtımda, Kordon\'da. Ateş açılmış. Ölüler var.',
        'Rıhtımda kimse konuşmuyor. Hamallar yüklerini bırakmış. Süleyman Kaptan bastonuna dayanmış, güneye bakıyor.',
        bayrak(d, 'sevkiyatKarar') === 'anadolu'
          ? 'Topal Hasan\'ın kayıkları şimdi Karadeniz\'de bir yerde. İnebolu\'ya iki gün.'
          : bayrak(d, 'sevkiyatKarar') === 'ingiliz'
            ? 'Altmış sandık tüfek İngiliz deposunda. Ferrante İzmir\'de; altmış sandık taşla.'
            : 'Altmış sandık tüfek Boğaz\'ın dibinde. Ferrante İzmir\'de; altmış sandık taşla.',
        'Baban yanına geliyor; Neslihan koluna girmiş. Rainer haklıymış, diyor baban. Ateş yanıyor. Ama ateşin de bir sahibi olur, oğul. Odunu kim atıyorsa o.',
        'Güneye bakıyorsun. İzmir. Ferrante. Rainer\'in odunları.',
        'Onuncu bölümün sonu.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_rihtim',
      ortamOran: 0.45,
      baslik: 'Onuncu bölüm bitti',
      paragraflar: ['İkinci kitap başladı. Sıradaki: İzmir. Kararların kaydedildi.'],
      secenekler: [{ etiket: 'On birinci bölüme geç', sonrakiBolum: 'bolum11' }, { etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    rihtim: {
      ad: 'Karaköy rıhtımı',
      tarif: 'Bahar. Martılar, hamallar, kömür dumanı. Açıkta İtilaf zırhlıları. Yeniden yapılan kayıkhanenin kalasları güneşte reçine kokuyor.',
      nesneler: [
        {
          id: 'kayikhane10',
          etiket: 'Yeni kayıkhane',
          incele: 'Kalaslar yeni, çatı yeni. Kapının üstüne Süleyman eski tabelayı asmış; yarısı yanık. Yangından kurtardığım tek şey, demişti. Bir de seni.',
        },
        {
          id: 'santa_lucia',
          etiket: 'Santa Lucia',
          incele: 'İtalyan bandıralı yük vapuru; Aralık\'ta da buradaydı. Ambarlarından sandıklar indiriliyor; her birinin köşesinde gri bir kurşun mühür. Hamallar sandıkları gümrük antreposuna taşıyor.',
        },
      ],
      kisiler: ['suleyman', 'neslihan'],
      gecisler: [
        { hedef: 'buro', etiket: 'Liman kayıt bürosuna git' },
        { hedef: 'han', etiket: 'Kalafatçı Hanı\'na git' },
        { hedef: 'antrepo', etiket: 'Gümrük antreposuna git', kosul: (d) => bayrak(d, 'sahteMuhur') && !bayrak(d, 'sevkiyatKarar') },
      ],
    },
    buro: {
      ad: 'Liman kayıt bürosu',
      tarif: 'Damga kokusu, toz, tavana kadar dosya. Pencerenin önünde Gülce; önünde bir yığın manifesto.',
      nesneler: [],
      kisiler: ['gulce'],
      gecisler: [{ hedef: 'rihtim', etiket: 'Rıhtıma dön' }],
    },
    han: {
      ad: 'Kalafatçı Hanı',
      tarif: 'Avluda Ohannes Usta\'nın ocağı; körük, kurşun külçeleri, katran kazanı. Yukarıda babanla Neslihan\'ın kaldığı oda. Akşam, bütün ekip ocağın başında toplanıyor.',
      nesneler: [
        {
          id: 'ocak',
          etiket: 'Ohannes\'in ocağı',
          incele: (d) =>
            bayrak(d, 'sahteMuhur')
              ? 'Ocak sönmüş. Bir kovanın içinde, suda, altmış küçük gri mühür.'
              : 'Ohannes kalafat için kurşun eritiyor. Baban ocağın başına çömelmiş, ateşi seyrediyor; elleri dizlerinde, kıpırdamadan. Sanki ateşle konuşuyor.',
        },
      ],
      kisiler: ['baba', 'ohannes', 'neslihan', 'cemil', 'nermin', 'riza'],
      gecisler: [{ hedef: 'rihtim', etiket: 'Rıhtıma dön' }],
    },
    antrepo: {
      ad: 'Gümrük antreposu',
      ortam: 'ortam_depo',
      tarif: 'Gece. Taş kemerler, örümcek ağları, sıra sıra sandık. Kapıda yaşlı bir bekçi; Rıza Bey onunla bir sigara içiyor, eski günlerden konuşuyor. Arka kapıda hamallar bekliyor.',
      nesneler: [
        {
          id: 'sandiklar',
          etiket: 'Santa Lucia\'nın sandıkları',
          incele: 'Altmış sandık. Her birinin köşesinde kanatlı kurşun mühür. Cebindeki altmış sahte mühür ağırlaşıyor.',
          etki: { sahne: 'sevkiyat_karari' },
        },
      ],
      kisiler: ['hasan'],
      gecisler: [{ hedef: 'rihtim', etiket: 'Rıhtıma dön' }],
    },
  },

  kisiler: {
    suleyman: {
      ad: 'Süleyman Kaptan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Süleyman Kaptan bastonunu kalasa vuruyor. Yangın kayıkhaneyi aldı, beni almadı, diyor. Sen de babanı geri getirdin. Bu liman bize borçlu artık.',
          secenekler: [
            {
              etiket: 'Santa Lucia\'yı sor.',
              sonra: 'ilk',
              cevap: 'Süleyman gözlerini kısıp vapura bakıyor. Aralık\'ta da gelmişti, diyor. O zaman Odesa\'ya gidiyordu. Şimdi Trieste\'den geliyor, İzmir\'e gidecek. Bir vapur her yere gidiyorsa kimseye gitmiyordur. Gülce kâğıtlarını bilir.',
            },
            { etiket: 'Sağ ol kaptan.' },
          ],
        },
      },
    },
    gulce: {
      ad: 'Gülce',
      giris: (d) => (delilVar(d, 'gumruk_listesi') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'gulceGecikme')
              ? 'Gülce seni görünce kalemi bırakıyor. Döndün, diyor; sesi titriyor. Babanı da getirdin. Benimkini kimse getiremez. Ama seninki geldi; bu da bir şey.'
              : 'Gülce başını kaldırıyor. Döndün, diyor. Bir an susuyor. Sonra çekmeceden bir dosya çıkarıyor: Bunu bekliyordum. Ne zaman gelecektin diye.',
          secenekler: [
            {
              etiket: 'Santa Lucia\'nın manifestosu.',
              etki: { delil: ['gumruk_listesi'] },
              sonra: 'sonra',
              cevap: 'Gülce dosyayı açıyor. Altmış sandık ziraat aleti, diyor. Trieste\'den İzmir\'e. Alıcı Ferrante. Muayeneden muaf; bir İngiliz binbaşının imzası var. Ve her sandıkta kanatlı mühür. Aralık\'taki gibi. Bu sefer kimse geciktiremez, Arif. Babamın ölümünden beri hiçbir şeyi geciktiremedim zaten.',
            },
          ],
        },
        sonra: {
          soz: 'Gülce manifestoyu çekmeceye geri koyuyor. Sandıklar antrepoda, diyor. Gece bekçisi yaşlı Hilmi Efendi. Rıza Bey\'i tanır.',
          secenekler: [{ etiket: 'Sağ ol Gülce.' }],
        },
      },
    },
    baba: {
      ad: 'İsmail Usta',
      giris: (d) => (delilVar(d, 'baba_itirafi') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Baban ateşe bakarak konuşmaya başlıyor. Ellerini dizlerine koymuş; sesi alçak, düz. Bir ustanın sesi. Bir kere anlatacağım, diyor. Bir daha sorma.',
          secenekler: [
            {
              etiket: 'Anlat baba.',
              etki: { delil: ['baba_itirafi'] },
              sonra: 'sonra',
              cevap: [
                '1908 yazıydı. Meşrutiyet ilan edilmişti; herkes sokaklarda. Dükkâna bir Fransız geldi. Rivière. Bir çizim gösterdi: kanatlı bir anahtar. Banka mührü, dedi. Kurşun mühürler için bir kalıp. Bir yılın kazancını peşin verdi. Ben de döktüm. Hayatımın en güzel kalıbıydı.',
                '1912 sonbaharında Manastır istasyonunda tüfek sandıkları gördüm. Bir vagon Bulgar komitacılarına, bir vagon bizim depolara. İkisinde de benim mührüm. Anladım.',
                'Selanik\'e gittim. Rivière\'in yazıhanesine girdim. Kalıp masasının çekmecesindeydi. Aldım, cebime koydum, çıktım. Ondan sonra savaş, sen kayıp, ben Manastır\'da seni ararken jandarma. Casus, dediler. Kim ihbar etti, hiç sormadım. Biliyordum.',
                'Kalıbı Yusuf\'a verdim. Altı yıl sakladı. Benim günahımı.',
              ],
            },
          ],
        },
        sonra: {
          soz: 'Baban ateşe bakıyor. Bir usta zehir dökebilir, diyor. Bilmeden. Ama bildikten sonra dökmez.',
          secenekler: [{ etiket: 'Biliyorum baba.' }],
        },
      },
    },
    ohannes: {
      ad: 'Ohannes Usta',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Ohannes Usta körüğü bırakıp babanın elini sıkıyor. Bir usta bir ustayı ellerinden tanır, diyor. Bu eller kalay görmüş. Benim ocak senin ocağın, İsmail Usta.',
          secenekler: [
            {
              etiket: 'Usta, Aralık\'tan beri bize kapını açıyorsun. Neden?',
              kosul: (d) => !bayrak(d, 'ohannesOgul'),
              sonra: 'aram',
            },
            { etiket: 'Sağ ol Ohannes Usta.' },
          ],
        },
        aram: {
          soz: [
            'Ohannes tespihini çeviriyor. Merdivenin başındaki küçük odayı gördün mü? diyor. Oğlum Aram\'ın odası. On dokuz yaşında Amerika\'ya gitti; Bin dokuz yüz dokuzda. Boston. İki mektup yazdı, sonra kesildi.',
            'Ben İngilizce bilmem, o Türkçeyi unuttu belki. Odayı kimseye vermedim. Bir baba oğlunu arar, bir oğul babasını arar evlat. Sizi görünce o oda boş durmasın dedim.',
          ],
          secenekler: [
            {
              etiket: 'Nermin\'in Amerikalı muhabir dostları var. Aram\'ı arayalım.',
              etki: { bayrak: { ohannesOgul: 'ara' } },
              sonra: 'ilk',
              cevap: 'Ohannes bir an konuşamıyor. Sonra çekmeceden iki eski zarf çıkarıp sana uzatıyor; adres yarı silinmiş. Arayın, diyor. Bulamazsanız da söyleyin. Bilmemek daha ağır.',
            },
            {
              etiket: 'Bazı mektuplar geç gelir usta. Kapı açık durdukça gelir.',
              etki: { bayrak: { ohannesOgul: 'bekle' } },
              sonra: 'ilk',
              cevap: 'Ohannes gülümsüyor. Kapı açık, diyor. Hep açık.',
            },
          ],
        },
      },
    },
    neslihan: {
      ad: 'Neslihan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'sevkiyatKarar')
              ? 'Neslihan titriyor. Beni değil onu aldılar, diyor. Ben Rivière\'in kızıydım; onlar için bir değerim vardı. Babamın ise yalnızca elleri.'
              : 'Neslihan Boğaz\'a bakıyor. Babam bana hep İstanbul\'u anlatırdı, diyor. Bir gün götüreceğim derdi. Altı yaşındaydım. Unutmuşum. Şimdi hatırlıyorum.',
          secenekler: [{ etiket: 'Buradayız artık.' }],
        },
      },
    },
    hasan: {
      ad: 'Topal Hasan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            [
              'Topal Hasan; Aralık\'ta depoda gördüğün hamal. Aksıyor ama sırtı hâlâ sağlam. Seni tanıyor.',
              bayrak(d, 'sevkiyatSonuc') === 'yarim'
                ? 'O gece mavna yandı, diyor. Sandıkların yarısı kurtuldu; kimin eline geçti, bilmiyorum. Ben bilmediğim şeyi sırtımda taşımam artık.'
                : 'O gece sandıkların hepsi yakalandı, diyor. İngilizler bize bir teşekkür bile etmedi. Ama hamallar senin adını biliyor.',
              sayi(d, 'hamalBag') >= 1
                ? 'Depoda bizi kapıdan çıkarmıştın; kimse yaralanmadı. Bunu unutmadık. Bu sefer hangi taraftasın?'
                : 'Bu sefer hangi taraftasın? diyor.',
            ].join(' '),
          secenekler: [
            {
              etiket: 'Kayıkların var mı?',
              kosul: (d) => !bayrak(d, 'hasanHazir'),
              etki: { bayrak: { hasanHazir: true } },
              sonra: 'ilk',
              cevap: 'Hasan sesini alçaltıyor. Tophane\'de üç kayık, diyor. Karadeniz\'e açılır. İnebolu\'da tanıdıklarım var. Bu silahlar bu memleketten çıkacaksa, memlekette kalsın. Sen bilirsin.',
            },
            { etiket: 'Sonra konuşuruz.' },
          ],
        },
      },
    },
    cemil: {
      ad: 'Cemil Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Cemil Bey babanın nabzını sayıyor; artık bir alışkanlık. Afyonsuz dördüncü ay, diyor. Kalbi bir tulumba gibi. Bir kalaycıya yakışır.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
    nermin: {
      ad: 'Nermin Hanım',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Nermin bir gazete katlıyor. Paris\'te herkes Anadolu\'yu paylaşıyor, diyor. Yunanlılar İzmir\'i istiyor, İtalyanlar Antalya\'yı. Bizim gazete yazmaya korkuyor. Ben korkmuyorum; ama yazacak yer bulamıyorum.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
    riza: {
      ad: 'Rıza Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Rıza Bey tabancasını temizliyor. Antreponun gece bekçisi Hilmi, diyor. Otuz yıl önce ben çırakken o komiserdi. Bir sigaraya kapıyı açar.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
  },
};
