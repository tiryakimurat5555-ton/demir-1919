// Altıncı bölüm: "Hotel Olympos". Selanik, 22-23 Aralık 1918.
// Arif ailesinin akıbetini öğrenir (Manastırlı yaşlı göçmen Hafız Efendi) ve kız kardeşi Neslihan'la
// ("Madam N.") karşılaşır. Neslihan Rivière'in evlatlığıdır; örgütün barış için çalıştığına inanır.
// Arka plan (gerçek): Manastır Kasım 1912'de düştü; göç yollarında salgınlar; Selanik 1917 yangını.
// Hafız Efendi, Rivière, Neslihan, otel ve bütün olaylar KURGUDUR.
import { BOLUM5 } from './bolum5';
import { bayrak, cikarimVar, delilVar, sayi } from '../oyun/motor';

const yanimda = (d, kim) => !!bayrak(d, 'ekip_' + kim);
const ekipAdlari = (d) => ['cemil', 'nermin', 'riza'].filter((k) => yanimda(d, k));
const AD = { cemil: 'Cemil Bey', nermin: 'Nermin', riza: 'Rıza Bey' };

export const BOLUM6 = {
  id: 'bolum6',
  ad: 'Altıncı bölüm: Hotel Olympos',
  baslangic: 'acilis',
  ilkMekan: 'ev',

  deliller: {
    ...BOLUM5.deliller,
    riviere_bilgi: { ad: 'Banker Rivière', tarif: 'Gaston Rivière: Fransız banker, Selanik\'in sevilen hayırseveri. Balkan Harbi\'nden sonra evine kimsesiz kızlar aldı; yangından sonra evsizlere çorba dağıttı. Hotel Olympos onun.' },
    hafiz_tanik: { ad: 'Hafız Efendi\'nin anlattıkları', tarif: 'Manastırlı yaşlı göçmen: Kalaycı İsmail Usta\'nın ailesini tanır. Zehra Hanım göç yolunda tifodan öldü. On yedi yaşındaki kızı Neslihan\'ı Selanik\'te bir Fransız bankerin adamları aldı. İsmail Usta askerdeki oğlunu aramak için Manastır yoluna döndü ve bir daha görülmedi.' },
    otel_kaydi: { ad: 'Otelin defteri', tarif: 'Hotel Olympos\'un defteri: Mlle N. Rivière, 12 numara, 23 Aralık. Bir satır altında: M. L. Delorme, 24 Aralık için ayrılmış oda.' },
  },

  cikarimlar: {
    ...BOLUM5.cikarimlar,
    kardes: {
      a: 'hafiz_tanik',
      b: 'fotograf',
      ad: 'Madam N. kız kardeşin Neslihan',
      metin: 'Fotoğraftaki kadın Neslihan. Kız kardeşin. Ölmedi. Göç yolunda annenizi kaybettikten sonra bir Fransız banker onu aldı. Seni öldürmesi söylenen kadın, kuyunun başında sana su serpen küçük kız.',
    },
    randevu: {
      a: 'otel_kaydi',
      b: 'talimat_metni',
      ad: 'Yarın akşam, 12 numara',
      metin: 'Neslihan yarın akşam Hotel Olympos\'un 12 numaralı odasında "hamalı" bekleyecek. Ve bir gün sonra Delorme geliyor. Onunla Delorme\'dan önce konuşmalısın.',
    },
    riviere: {
      a: 'riviere_bilgi',
      b: 'hafiz_tanik',
      ad: 'Rivière örgütün Selanik ayağı',
      metin: 'Kimsesiz kızları evine alan hayırsever banker, kardeşini alan adam. Otelin sahibi, talimatı yazan elin sahibi. Gaston Rivière, Kanatlı Anahtar\'ın Selanik\'teki başı. Defterin öbür yarısı büyük ihtimalle onda.',
    },
  },

  olaylar: [
    {
      id: 'aksam',
      kosul: (d) => cikarimVar(d, 'kardes') && cikarimVar(d, 'randevu') && cikarimVar(d, 'riviere'),
      etki: { mekan: 'otel', sahne: 'olympos' },
    },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Altıncı bölüm bitti.' },
    { kosul: (d) => !delilVar(d, 'riviere_bilgi'), metin: 'Saltiel Efendi\'yle konuş: Selanik\'te kimin kim olduğunu bilir.' },
    { kosul: (d) => !delilVar(d, 'hafiz_tanik'), metin: 'Yanık şehirde Manastırlı göçmenleri ara.' },
    { kosul: (d) => !delilVar(d, 'otel_kaydi'), metin: 'Hotel Olympos\'un defterine bak. Kâtip kolay ikna olmaz; ekibinden yararlan.' },
    { kosul: () => true, metin: 'Öğrendiklerini panoda birleştir. Yarın akşam 12 numara.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_ev',
      baslik: 'Kalamarya, 22 Aralık',
      paragraflar: (d) => [
        'Saltiel Efendi\'nin kuzeni Rebeka Hanım\'ın evi, yangının ulaşmadığı Kalamarya\'da, denize bakan küçük bir bahçeli ev. Mutfakta çaydanlık kaynıyor, öbür odada çocuklar gülüşüyor. Rebeka Hanım sizi hiçbir şey sormadan doyurdu.',
        'Pencereden körfez görünüyor: İtilaf gemileri, Beyaz Kule, ve şehrin ortasındaki kara yara.',
        ekipAdlari(d).map((k) => AD[k]).join(' ve ') + ' masada. Kimse ilk sözü söylemek istemiyor.',
        bayrak(d, 'fransizBag')
          ? 'Kapı çalınıyor. Yüzbaşı Morin, sivil giyinmiş, elinde bir dosya. Garnier konuştu, diyor tercüme edilerek. Az. Ama yetecek kadar.'
          : 'Saltiel Efendi kahvesini bitirip kalkıyor. Selanik\'te kimin kim olduğunu bilmek istiyorsanız, diyor, tütüncülere sorun. Tütüncüler her şeyi bilir; herkes tütün içer.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'ev', bayrak: { 'gorüldü_ev': true } } }],
    },
    ani3: {
      ortam: 'ortam_yanik_sehir',
      ortamOran: 0.1,
      efekt: ['ani_savas'],
      baslik: 'Manastır, Kasım 1912',
      paragraflar: [
        'Manastır önlerinde sis. Sırp topçusu sabahtan beri dövüyor. Sen yirmi dokuz yaşındasın; Balkan Harbi\'nin ilk ayı. Şehrin içinde, iki sokak ötede, annenin evi.',
        'Geri çekilme emri geliyor. Koşarken sokağına bir an bakabiliyorsun: ayva ağacı, kuyu, kapı. Kapı açık. Avlu boş.',
        'Aylar sonra, esaretten döndüğünde, ev yanmıştı. Komşular dağılmıştı. Biri, hepsi öldü, dedi. Sen de inandın. İnanmak, aramaktan kolaydı.',
        'Şimdi, Selanik\'in yanık sokağında, yaşlı bir adamın karşısında, o kolaylığın bedelini ödüyorsun.',
      ],
      secenekler: [
        { etiket: 'Nefesini say. Yaşlı adamın elini tut.', sonra: null },
        { etiket: 'Yumruklarını sık. Ağlama.', etki: { artir: { travma: 1 } }, sonra: null },
      ],
    },
    olympos: {
      ortam: 'ortam_otel',
      baslik: '23 Aralık, akşam',
      paragraflar: (d) => [
        'Hotel Olympos. Mermer bir lobi, pirinç bir kapı, sessizce dönen bir döner kapı. ' + ekipAdlari(d).map((k) => AD[k]).join(' ve ') + ' lobide, bir gazetenin ve bir kahvenin arkasında.',
        'Merdivenleri çıkıyorsun. Her basamakta göğsündeki taş biraz daha ağırlaşıyor. On iki numara. Kapının altından ışık sızıyor. İçeride biri piyano değil, bir gramofon çalıyor; bir Viyana valsi.',
        'Kapıyı çalıyorsun. Vals duruyor.',
        'Kapı açılıyor. Örgülü saçlar değil artık; saçları Viyana usulü toplanmış. Gülümsemiyor. Kaşları. Çenesi. Gözlerindeki o inat. Senin gözlerin.',
        'Evet? diyor, kusursuz ama hafif yabancı bir Türkçeyle. Kimsiniz?',
      ],
      secenekler: [
        {
          etiket: 'Mührü sağlam mektubu uzat: Herr Brenner\'in yerine geldim. Bu size.',
          kosul: (d) => bayrak(d, 'muhurSaglam'),
          etki: { bayrak: { yaklasim: 'kurye' } },
          sonra: 'kurye',
        },
        {
          etiket: 'Ben beklediğiniz hamalım.',
          etki: { bayrak: { yaklasim: 'hamal' } },
          sonra: 'hamal',
        },
        {
          etiket: 'Neslihan. Ben Arif. Abin.',
          etki: { bayrak: { yaklasim: 'abi' }, artir: { neslihanBag: 1 } },
          sonra: 'abi',
        },
      ],
    },
    kurye: {
      ortam: 'ortam_otel',
      baslik: 'Mektup',
      paragraflar: [
        'Neslihan zarfı alıyor; mührü kontrol ediyor, kanatlı anahtara bakıyor. Sizi içeri buyur ediyor; bir kuryeye gösterilen soğuk bir nezaketle.',
        'Pencerenin önünde mektubu açıyor. Okurken yüzü değişmiyor. Sonra bir yerde, bir satırda, duruyor. Bir daha okuyor.',
        'Defteri alınca ondan kurtul.',
        'Elindeki kâğıt hafifçe titriyor. Bunu, diyor, kendi kendine. Bunu bana neden... Ben tercümanım. Ben yazışırım. Ben... Sonra başını kaldırıp sana bakıyor; sanki odada olduğunu unutmuş gibi. Gidebilirsiniz, diyor. Teşekkür ederim.',
        'Gitmiyorsun.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'yuzyuze' }],
    },
    hamal: {
      ortam: 'ortam_otel',
      baslik: 'Hamal',
      paragraflar: [
        'Neslihan bir an hiç kıpırdamıyor. Sonra kenara çekiliyor. İçeri buyurun, diyor, kibar ve soğuk. Bekliyordum.',
        'Oda çiçek ve kâğıt kokuyor. Masada yazı takımı, Fransızca ve Almanca mektuplar, bir çay servisi. İki fincan.',
        'Çay ister misiniz? diye soruyor. Bir fincanı sana doğru itiyor.',
        'Fincana bakıyorsun. Brenner\'in fincanını hatırlıyorsun.',
      ],
      secenekler: [
        { etiket: 'Fincanı al ve iç. Ona güven.', etki: { artir: { neslihanBag: 1 }, bayrak: { cayIcti: true } }, sonra: 'cay' },
        { etiket: 'Fincanları değiştir.', etki: { bayrak: { cayDegisti: true } }, sonra: 'cay' },
      ],
    },
    cay: {
      ortam: 'ortam_otel',
      baslik: 'Çay',
      paragraflar: (d) =>
        bayrak(d, 'cayDegisti')
          ? [
              'Fincanları sessizce yer değiştiriyorsun. Neslihan bunu görüyor. Bir an gözleri parlıyor; öfke mi, utanç mı bilmiyorsun.',
              'Kendi fincanını, yani sana verdiğini, alıp tek yudumda içiyor. Çay, diyor sertçe. Yalnızca çay. Biz katil değiliz.',
            ]
          : [
              'Çay sıcak ve şekersiz. Acı badem yok. Yalnızca çay.',
              'Neslihan seni izliyor. Cesursunuz, diyor. Ya da aptalsınız. Brenner\'i duydum.',
            ],
      secenekler: [{ etiket: 'Devam', sonra: 'yuzyuze' }],
    },
    abi: {
      ortam: 'ortam_otel',
      baslik: 'Abi',
      paragraflar: [
        'Neslihan yüzüne bir tokat yemiş gibi geri çekiliyor. Sonra gülüyor; kısa, sert, inanmayan bir gülüş.',
        'Abim Manastır önlerinde öldü, diyor. Dokuz yüz on iki. Bana öyle söylediler. Ben ona yıllarca ağladım. Siz kimsiniz de bu yüzü ve bu adı bana getiriyorsunuz?',
        'Ama kapıyı kapatmıyor.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'yuzyuze' }],
    },
    yuzyuze: {
      ortam: 'ortam_otel',
      baslik: 'Neslihan',
      paragraflar: (d) => [
        'Pencerenin önündesiniz. Aşağıda Beyaz Kule, deniz, Fransız gemilerinin ışıkları.',
        'Babam, diyor Neslihan, ve "babam" derken sesi yumuşuyor, beni yollardan topladı. Annem bir arabanın içinde öldü; ateşler içindeydi. Ben on yedi yaşındaydım. Babam bana okul verdi, Viyana verdi, kitap verdi, bir hayat verdi.',
        'Sizin Kanatlı Anahtar dediğiniz şey, diyor, bir düzen. Savaşlar kaostan çıkar. Biz kaosu önlemek için çalışıyoruz. Bankalar, anlaşmalar, mektuplar. Delorme gibi... kaba adamlar istisna.',
        sayi(d, 'neslihanBag') > 0 ? 'Gözlerinde bir şüphe kıpırdıyor; ama onu bastırıyor.' : 'Bunu kendine söyler gibi söylüyor.',
      ],
      secenekler: [
        {
          etiket: 'Talimatı göster: Defteri alınca ondan kurtul. Bunu sana kim yazdı?',
          kosul: (d) => bayrak(d, 'yaklasim') !== 'kurye',
          etki: { artir: { neslihanBag: 2 }, bayrak: { talimatGosterildi: true } },
          sonra: 'gercek',
        },
        {
          etiket: 'O mektuptaki satır. Seni benim katilim yaptılar. Bu mu düzen?',
          kosul: (d) => bayrak(d, 'yaklasim') === 'kurye',
          etki: { artir: { neslihanBag: 2 }, bayrak: { talimatGosterildi: true } },
          sonra: 'gercek',
        },
        {
          etiket: 'Ayva ağacını anlat. Kuyunun başında bana su serperdin.',
          etki: { artir: { neslihanBag: 1 }, bayrak: { ayvaAnlatildi: true } },
          sonra: 'ayva',
        },
        {
          etiket: 'Sabri\'yi anlat. Delorme\'un bıçağını. Mauser\'leri.',
          etki: { artir: { neslihanBag: 1 } },
          sonra: 'gercek',
        },
      ],
    },
    gercek: {
      ortam: 'ortam_otel',
      baslik: 'Kâğıt',
      paragraflar: (d) => [
        bayrak(d, 'talimatGosterildi')
          ? 'Neslihan satıra uzun süre bakıyor. Ondan kurtul. Babasının el yazısı değil; ama mühür onun. Kâğıt elinde, pencerenin soğuğunda, titriyor.'
          : 'Anlatıyorsun: Sabri\'nin bileklerini, Mauser\'leri, yanan kayıkhaneyi, Halim\'i. Neslihan dinliyor; ilk kez sözünü kesmeden.',
        'Ben yazışırım, diyor kısık bir sesle. Ben tercümanım. Bana kimseyi öldürmemi söylemediler. Hiç.',
        'Şimdi söylüyorlar, diyorsun.',
        'Uzun bir sessizlik. Sonra hiç beklemediğin bir şey söylüyor, sanki kendi kendine: Avlumuzda bir ayva ağacı vardı. Kuyunun başında abime su serperdim. Kızardı. Sonra güler, beni omzuna alırdı. Sana bakıyor; yüzünde bir şeyi arıyor.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'kapi' }],
    },
    ayva: {
      ortam: 'ortam_otel',
      baslik: 'Ayva',
      paragraflar: [
        'Anlatıyorsun. Avlu. Ayva ağacı. Kuyunun bakır kovası. Küçük bir kız, avucuna doldurduğu soğuk suyu ensene serpip kaçardı. Sen kızar gibi yapar, sonra onu omzuna alırdın. Annen mutfaktan, Arif, gel yemeğe, diye seslenirdi.',
        'Neslihan\'ın yüzündeki bütün kibar soğukluk çözülüyor. Bunu kimse bilemez, diye fısıldıyor. Bunu kimseye anlatmadım. Viyana\'da bile. Babama bile.',
        'Sonra eliyle ağzını kapatıyor. Gözleri doluyor ama ağlamıyor. Senin gibi. Ağlamamayı aynı evde öğrendiniz.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'kapi' }],
    },
    kapi: {
      ortam: 'ortam_otel',
      baslik: 'Kapı',
      paragraflar: [
        'Kapı vuruluyor. Fransızca, kalın bir ses: Mademoiselle. Monsieur Rivière vous attend. Bay Rivière sizi bekliyor.',
        'Neslihan bir an sana bakıyor. Sonra kapıya. Sonra yine sana. Hayatının iki yarısı arasında bir pencere önünde duruyor.',
      ],
      secenekler: [{ etiket: 'Bekle', sonra: 'karar' }],
    },
    karar: {
      ortam: 'ortam_otel',
      baslik: 'Seçim',
      paragraflar: (d) =>
        sayi(d, 'neslihanBag') >= 2
          ? [
              'Neslihan seni balkona itiyor, perdeyi çekiyor. Kapıyı açıp Fransızca bir şeyler söylüyor; sesi sakin, kusursuz. Geliyorum, beş dakika.',
              'Kapı kapanınca balkona dönüyor. Elinde bir anahtar. Babamın çalışma odasının anahtarı, diyor. Köşkte, kütüphanenin arkasında. Kasası Montaigne\'in Denemeler\'inin arkasında. Defterin yarısı orada. Delorme yarın geliyor. Ondan önce.',
              'Neden? diye soruyorsun.',
              'Bilmiyorum, diyor. Belki bir ayva ağacı yüzünden. Belki o satır yüzünden. Servis merdiveni koridorun sonunda. Git, abi.',
              'Abi. Altı yıl sonra ilk kez.',
            ]
          : [
              'Neslihan kapıya bakıyor, sonra sana. Gözlerinde öfke ve korku. Balkondan aşağısı bir kat, diyor soğukça. Bahçede çalılar var. Atlayabilirsin.',
              'Sen kim olursan ol, bir daha karşıma çıkma. Bir daha çıkarsan, babama söyleyeceğim. Ve o zaman Delorme seni bulur.',
              'Balkondan atlıyorsun. Çalılar yüzünü çiziyor. Yukarıda kapı açılıyor, sesler. Pencerenin perdesinin arasından bir an Neslihan\'ın yüzü görünüyor. Sonra perde kapanıyor.',
            ],
      secenekler: [
        {
          etiket: 'Devam',
          etki: (d) => ({ bayrak: { anahtarAlindi: sayi(d, 'neslihanBag') >= 2, neslihanBuldu: true } }),
          sonra: 'gece',
        },
      ],
    },
    gece: {
      ortam: 'ortam_rihtim',
      ortamOran: 0.5,
      baslik: 'Beyaz Kule',
      paragraflar: (d) => [
        'Gece yarısı. Beyaz Kule\'nin dibinde, rıhtımın taşına oturmuşsun. ' + ekipAdlari(d).map((k) => AD[k]).join(' ve ') + ' iki yanında. Kimse konuşmuyor.',
        bayrak(d, 'anahtarAlindi')
          ? 'Avucunda soğuk, ağır bir anahtar. Kardeşinin sana verdiği ilk şey; on yedi yıl sonra.'
          : 'Avucunda hiçbir şey yok. Yalnızca perdenin arkasında bir an görünen bir yüz.',
        yanimda(d, 'nermin')
          ? 'Nermin sonunda konuşuyor: Ağabeyimi bulamadım ben, diyor. Sarıkamış\'tan döndürmediler bile. Sen kardeşini buldun. Ne olursa olsun, bunu unutma.'
          : yanimda(d, 'cemil')
            ? 'Cemil Bey sonunda konuşuyor: Ölülerle konuşmayı bilirim, diyor. Yaşayanlarla değil. Ama şunu bilirim: yaşayan biri, bir kez kapıyı açtıysa, bir daha da açar.'
            : 'Rıza Bey sonunda konuşuyor: Kırk yıl insanları yakaladım, diyor. Bazen en zor yakalanan, insanın kendi kanıdır.',
        'Körfezin karşısında, Kalamarya\'nın sırtında, bir köşkün ışıkları yanıyor. Rivière. Yarın Delorme gelecek.',
        'Altıncı bölümün sonu.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_rihtim',
      ortamOran: 0.4,
      baslik: 'Altıncı bölüm bitti',
      paragraflar: ['Kardeşini buldun. Yedinci bölüm yazılıyor: Rivière\'in köşkü. Kararların kaydedildi.'],
      secenekler: [{ etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    ev: {
      ad: 'Rebeka Hanım\'ın evi, Kalamarya',
      tarif: 'Küçük, sıcak bir ev. Mutfakta çaydanlık, öbür odada çocuk sesleri, pencereden deniz. Masada zeytin, peynir, Rebeka Hanım\'ın pişirdiği çörekler.',
      nesneler: [
        {
          id: 'pencere',
          etiket: 'Pencere',
          incele: 'Körfezin karşısında şehir. Ortası kapkara; yangının yarası. Kenarlarında yeni çatılar, iskeleler. Kül yeniden kuruluyor. Ve sırtta, Kalamarya\'nın üstünde, bahçeli büyük bir köşk. Saltiel Efendi parmağıyla gösteriyor: Rivière\'in köşkü.',
        },
      ],
      kisiler: ['saltiel', 'morin', 'cemil', 'nermin', 'riza'],
      gecisler: [
        { hedef: 'yanik_sehir', etiket: 'Yanık şehre in' },
        { hedef: 'otel', etiket: 'Hotel Olympos\'a git' },
      ],
    },
    yanik_sehir: {
      ad: 'Yanık şehir',
      tarif: 'Bir yıl önce yanan şehrin ortası. Duvarları ayakta, içleri boş evler; kömürleşmiş kirişler; çekiç ve testere sesleri. Yıkıntıların arasında tahta barakalar, ocaklar, çamaşırlar. Göçmenler, evsizler, askerler.',
      nesneler: [
        {
          id: 'yikinti',
          etiket: 'Yıkılmış bir mabedin duvarı',
          incele: 'Bir duvarın kalıntısında yarım kalmış bir yazı; İbranice, Rumca, Osmanlıca harfler yan yana. Saltiel Efendi duruyor. Burası benim mahallemdi, diyor. Üç dil, dört din, yüz yıllık komşuluk. Ateş hiçbirine sormadı.',
        },
        {
          id: 'barakalar',
          etiket: 'Göçmen barakaları',
          incele: 'Tahta ve tenekeden barakalar. Önünde ateşin başında birkaç yaşlı adam; Türkçe konuşuyorlar, Rumeli ağzıyla. Manastır ağzıyla. Kalbin bir an duruyor.',
          etki: { bayrak: { barakaGoruldu: true } },
        },
      ],
      kisiler: ['hafiz'],
      gecisler: [
        { hedef: 'ev', etiket: 'Kalamarya\'ya dön' },
        { hedef: 'otel', etiket: 'Hotel Olympos\'a git' },
      ],
    },
    otel: {
      ad: 'Hotel Olympos, lobi',
      tarif: 'Rıhtımın karşısında, yangından sonra yapılmış beyaz bir otel. Mermer zemin, pirinç lambalar, bir resepsiyon. Fransız subayları, tüccarlar, birkaç zengin Selanikli.',
      nesneler: [
        {
          id: 'tabela',
          etiket: 'Girişteki pirinç levha',
          incele: 'Hotel Olympos. Altında küçük harflerle: Propriété de M. G. Rivière. Mülk sahibi: Bay G. Rivière.',
        },
      ],
      kisiler: ['katip'],
      gecisler: [
        { hedef: 'ev', etiket: 'Kalamarya\'ya dön' },
        { hedef: 'yanik_sehir', etiket: 'Yanık şehre git' },
      ],
    },
  },

  kisiler: {
    saltiel: {
      ad: 'Saltiel Efendi',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Saltiel Efendi gözlüklerini siliyor. Ne bilmek istiyorsunuz, söyleyin. Tütünün olduğu her yerde ben varım.',
          secenekler: [
            {
              etiket: 'Hotel Olympos ve Madam N. Rivière.',
              kosul: (d) => !delilVar(d, 'riviere_bilgi'),
              etki: { delil: ['riviere_bilgi'] },
              sonra: 'ilk',
              cevap: 'Saltiel kaşlarını kaldırıyor. Gaston Rivière, diyor. Fransız banker. Selanik\'in en sevilen adamı. Balkan Harbi\'nden sonra evine kimsesiz kızlar aldı, okuttu. Yangından sonra evsizlere çorba dağıttı; ben de kuyrukta durdum. Hotel Olympos onun. Kızlarından biri, Mademoiselle Rivière, Viyana\'da okumuş. Herkes onu sever. Babası gibi.',
            },
            {
              etiket: 'Yanık şehirde Manastırlı göçmenler var mı?',
              kosul: (d) => !bayrak(d, 'saltielManastir'),
              etki: { bayrak: { saltielManastir: true } },
              sonra: 'ilk',
              cevap: 'Var. Yangın yerinin kuzeyinde, eski hamamın yanında barakalar. Balkan Harbi\'nde Manastır\'dan, Florina\'dan, Kesriye\'den gelenler. Bir yaşlı hafız var; herkesi tanır.',
            },
            { etiket: 'Sağ ol Saltiel Efendi.' },
          ],
        },
      },
    },

    morin: {
      ad: 'Yüzbaşı Morin',
      kosul: (d) => bayrak(d, 'fransizBag'),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Morin dosyayı masaya açıyor. Saltiel çeviriyor: Rivière\'i bir yıldır izliyoruz. Dokunamıyoruz; generallerimizle yemek yiyor. Garnier yalnızca bir şey söyledi: Rivière\'in kasası, köşkte. Defter orada.',
          secenekler: [
            {
              etiket: 'Rivière\'in kızı. Neslihan. Ne biliyorsunuz?',
              kosul: (d) => !bayrak(d, 'morinNeslihan'),
              etki: { bayrak: { morinNeslihan: true }, delil: ['riviere_bilgi'] },
              sonra: 'ilk',
              cevap: 'Morin bir sayfa çeviriyor. Mademoiselle Neslihan Rivière. Evlatlık. Viyana\'da okumuş, beş dil. Rivière\'in yazışmalarını o yürütür. Bizim için bir soru işareti: inanmış bir üye mi, yoksa kullanılan biri mi? Siz söyleyin.',
            },
            { etiket: 'Teşekkürler yüzbaşı.' },
          ],
        },
      },
    },

    cemil: {
      ad: 'Cemil Bey',
      kosul: (d) => yanimda(d, 'cemil'),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Cemil Bey pencereden yanık şehre bakıyor. On yıl burada çalıştım, diyor. O sokakların her birinde bir hastam vardı. Şimdi hiçbiri yok.',
          secenekler: [
            {
              etiket: 'Otelde bana yardım eder misin?',
              kosul: (d) => !bayrak(d, 'cemilOtel'),
              etki: { bayrak: { cemilOtel: true } },
              sonra: 'ilk',
              cevap: 'Hekimim, diyor Cemil Bey gülümseyerek. Hekim her kapıdan girer. Mademoiselle Rivière\'in sağlığını soran eski bir aile hekimi... kâtibi yumuşatır.',
            },
            { etiket: 'Sağ ol.' },
          ],
        },
      },
    },
    nermin: {
      ad: 'Nermin Hanım',
      kosul: (d) => yanimda(d, 'nermin'),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Nermin defterini açmış, bir şeyler karalıyor. Bu şehir bir gazeteci için hazine, diyor. Ama şimdi haber değil, sen önemlisin.',
          secenekler: [
            {
              etiket: 'Otelde bana yardım eder misin?',
              kosul: (d) => !bayrak(d, 'nerminOtel'),
              etki: { bayrak: { nerminOtel: true } },
              sonra: 'ilk',
              cevap: 'Nermin gülümsüyor. Viyana\'dan gelen bir hanımın eski okul arkadaşı... Fransızca, Almanca. Kâtip bana defteri kendi eliyle açar.',
            },
            { etiket: 'Sağ ol.' },
          ],
        },
      },
    },
    riza: {
      ad: 'Rıza Bey',
      kosul: (d) => yanimda(d, 'riza'),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Rıza Bey çayını yudumluyor. Yabancı şehir, yabancı polis, diyor. Burada benim rozetim bir şey ifade etmez. Ama kâtipler her yerde aynıdır.',
          secenekler: [
            {
              etiket: 'Otelde bana yardım eder misin?',
              kosul: (d) => !bayrak(d, 'rizaOtel'),
              etki: { bayrak: { rizaOtel: true } },
              sonra: 'ilk',
              cevap: 'Rıza Bey bıyığını sıvazlıyor. Kırk yıl otel defteri karıştırdım. Kâtibe bakışından anlarsın ne istediğini. Bırak ben konuşayım.',
            },
            { etiket: 'Sağ ol.' },
          ],
        },
      },
    },

    hafiz: {
      ad: 'Hafız Efendi',
      kosul: (d) => bayrak(d, 'barakaGoruldu'),
      giris: (d) => (delilVar(d, 'hafiz_tanik') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Ak sakallı, gözleri bulanık, eski bir cübbenin içinde zayıf bir ihtiyar. Ateşin başında ellerini ısıtıyor. Manastır ağzıyla: Hayırdır evlat? Rumeli\'densin sen. Sesinden belli.',
          secenekler: [
            {
              etiket: 'Fotoğrafı göster.',
              kosul: (d) => !bayrak(d, 'fotografVerildi'),
              sonra: 'tanidi',
            },
            {
              etiket: 'Fotoğrafı anlat: Manastır, Fotoğrafhane-i Hilal, örgülü saçlı bir kız.',
              kosul: (d) => bayrak(d, 'fotografVerildi'),
              sonra: 'tanidi',
            },
          ],
        },
        tanidi: {
          soz: [
            'İhtiyar uzun süre susuyor. Hilal\'in fotoğrafhanesi, diyor. Çarşının başında. Biliyorum. Bu kız... bu kız Kalaycı İsmail Usta\'nın kızı. Neslihan.',
            'Sen... Sen İsmail\'in oğlusun. Arif. Aynı alın, aynı çene. Sen askere gittin. Seni ölü bildik.',
          ],
          secenekler: [{ etiket: 'Anlat Hafız Efendi. Her şeyi.', sonra: 'anlat' }],
        },
        anlat: {
          soz: [
            'Kasımda Manastır düştü. Biz arabalarla Selanik\'e yola çıktık; hepimiz, bütün mahalle. Yollarda tifo vardı. Annen, Zehra Hanım, Florina\'yı geçmeden ateşlendi. Bir sabah arabada... Allah rahmet eylesin evlat.',
            'Selanik\'te çadırlarda kaldık. Bir gün Fransız bir bankerin adamları geldi; kimsesiz kızlara iş, okul, yemek. Neslihan on yedisindeydi. Baban razı olmadı; ama baban o hafta yoktu. Gitti, kız da gitti.',
            'Baban? Baban seni aramaya döndü. Askerdeki oğlum geri gelir, dedi, beni evde bulamazsa ne yapar. Manastır yoluna tek başına çıktı. Bir daha ne gören oldu ne duyan.',
          ],
          secenekler: [
            {
              etiket: 'Devam',
              etki: { delil: ['hafiz_tanik'], sahne: 'ani3' },
            },
          ],
        },
        sonra: {
          soz: 'Hafız Efendi ellerini ateşe uzatıyor. Kardeşini bul evlat, diyor. Babanı da. Ölü bilinip yaşayan çok insan var bu yollarda. Senin gibi.',
          secenekler: [{ etiket: 'Sağ ol Hafız Efendi.' }],
        },
      },
    },

    katip: {
      ad: 'Resepsiyon kâtibi',
      giris: (d) => (delilVar(d, 'otel_kaydi') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Pomatlı saçlı, kolalı yakalı genç bir kâtip. Sana tepeden bakıyor; Fransızca bir şey söylüyor, sonra Rumca, sonra kötü bir Türkçeyle: Buyurun? Oda yok.',
          secenekler: [
            {
              etiket: 'Cemil Bey konuşsun: Mademoiselle Rivière\'in eski aile hekimi.',
              kosul: (d) => yanimda(d, 'cemil') && bayrak(d, 'cemilOtel'),
              etki: { delil: ['otel_kaydi'] },
              cevap: 'Cemil Bey fesini düzeltip Fransızca konuşmaya başlıyor; nazik, babacan, kendinden emin. Kâtibin yüzü yumuşuyor. Defteri açıp parmağıyla gösteriyor: Mademoiselle Rivière, 12 numara, yarın. Cemil Bey teşekkür ederken gözü bir alt satıra kayıyor: M. L. Delorme, 24 Aralık.',
            },
            {
              etiket: 'Nermin konuşsun: Viyana\'dan bir okul arkadaşı.',
              kosul: (d) => yanimda(d, 'nermin') && bayrak(d, 'nerminOtel'),
              etki: { delil: ['otel_kaydi'] },
              cevap: 'Nermin Almanca bir iki cümle, sonra Fransızca bir kahkaha. Kâtip kızarıyor, defteri açıyor. 12 numara, yarın akşam. Nermin defteri kapatırken bir alt satırı ezberliyor: M. L. Delorme, 24 Aralık.',
            },
            {
              etiket: 'Rıza Bey konuşsun.',
              kosul: (d) => yanimda(d, 'riza') && bayrak(d, 'rizaOtel'),
              etki: { delil: ['otel_kaydi'] },
              cevap: 'Rıza Bey hiçbir şey söylemeden kâtibe bakıyor; kırk yıllık bir polisin bakışı. Sonra tezgâha bir altın koyuyor ve tek kelime: Rivière. Kâtip yutkunup defteri çeviriyor. 12 numara, yarın. Ve: M. L. Delorme, 24 Aralık.',
            },
            {
              etiket: 'Kendin dene: tezgâha birkaç kuruş koy.',
              cevap: 'Kâtip kuruşlara bakıp güldü. Bu otelde hamal parası geçmez, diyor. Ekibinden birinin yardımı lazım.',
            },
          ],
        },
        sonra: {
          soz: 'Kâtip seni görmezden geliyor.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
  },
};
