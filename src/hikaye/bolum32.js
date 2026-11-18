// Otuz ikinci bölüm: "Pusula". İstanbul, 12-14 Eylül 1924. Beşinci kitabın sonu.
// Kalıbı kır: delil ve çıkarım yok; bir veda gecesi ve bir kayık yolculuğu. Karşıt yok (kural 6).
// Süleyman Kaptan'ın kalbi yoruldu (Cemil'in teşhisi). Son isteği: Nevres'ten kalan pusulayla bir gece daha denize çıkmak.
// Önce Neslihan'ın Cenevre tanıklığı babasına ulaşır (han32, baba32). Sonra üç durak: Karaköy (1918'in ilk gecesi;
// arifNeden'in kapanışı), Kız Kulesi (pusula kime), Fenerbahçe açığında şafak (Süleyman ölür).
// Karşılık verilen iplikler: arifNeden (kapanır), kemalKalir / kemalSonu, neslihanTanik, neslihanAd, gulceTevfik, rahelKarar,
// suleymanBag. Yeni iplikler: pusulaKime, kayikhaneVaris, gulceZarf, babaBildi, arifCevap.
import { BOLUM31 } from './bolum31';
import { bayrak, sayi } from '../oyun/motor';

const kemalVar = (d) => !!bayrak(d, 'kemalKalir') || bayrak(d, 'kemalSonu') === 'yolcu';
const gulceYakin = (d) => sayi(d, 'gulceGuven') >= 2 || !!bayrak(d, 'gulceyeAnlatti');

export const BOLUM32 = {
  id: 'bolum32',
  ad: 'Otuz ikinci bölüm: Pusula',
  baslangic: 'acilis',
  ilkMekan: 'kayikhane32',

  deliller: { ...BOLUM31.deliller },
  cikarimlar: { ...BOLUM31.cikarimlar },

  olaylar: [
    {
      id: 'gece32',
      kosul: (d) => d.mekan === 'kayikhane32' && !!bayrak(d, 'babaBildi') && !!bayrak(d, 'suleymanHazir'),
      etki: { sahne: 'kayik32' },
    },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Otuz ikinci bölüm bitti.' },
    { kosul: (d) => !bayrak(d, 'babaBildi'), metin: 'Neslihan babasıyla konuşmak istiyor. Kalafatçı Hanı\'na git.' },
    { kosul: (d) => !bayrak(d, 'suleymanHazir'), metin: 'Süleyman Kaptan\'la konuş.' },
    { kosul: () => true, metin: 'Kayıkhaneye dön.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_kayikhane',
      baslik: '12 Eylül 1924, Karaköy',
      paragraflar: (d) => [
        'Kayıkhane. Altı yıl önce bir Aralık gecesi bu kapıdan bir ceset haberiyle girmiştin. Şimdi Eylül; kapı açık, içeri lodos giriyor.',
        'Süleyman Kaptan yatağını tezgâhın yanına, denizi görecek yere çektirmiş. Cemil Bey İskenderiye\'den döndüğünüz akşam onu muayene etti; sonra dışarı çıkıp iskelenin ucunda uzun süre sigarasını yakmadan tuttu. Kalbi, dedi sana. Yorulmuş. Günler, belki bir hafta.',
        'Duvarda pusula. Birinci gece Süleyman onu göstermişti: Nevres battığında tutunduğu sandal, bu pusula, üç gün.',
        kemalVar(d)
          ? 'Kemal tezgâhta yeni bir kayığın kaburgalarını çakıyor. Babası her çekiç sesinde gözlerini açıyor; sonra rahatlayıp kapatıyor. Ses oğlunun, ona bu yetiyor.'
          : 'Kemal Pire\'de; bir telgraf çektiniz. Cevap gelmedi. Süleyman sormadı.',
        bayrak(d, 'rahelKarar') === 'birlikte'
          ? 'Neslihan İskenderiye\'den Rahel\'in defterinin bir kopyasıyla döndü. Gelecek ay Beyrut\'a gidecekler, ikisi. Ama önce bir kapı var; Kalafatçı Hanı\'nda.'
          : 'Neslihan İskenderiye\'den sessiz döndü. Vapurda bir ninni mırıldandı, sonra sustu. Önce bir kapı var, dedi; Kalafatçı Hanı\'nda.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'kayikhane32' } }],
    },

    baba32: {
      ortam: 'ortam_han',
      baslik: 'Babanın odası',
      paragraflar: (d) => [
        'Ohannes Usta\'nın hanında, ocağın üstündeki küçük oda. Baban pencerenin önünde; elleri dizlerinde, kalay lekeli.',
        bayrak(d, 'neslihanTanik') === 'evet'
          ? 'Dizinin üstünde katlanmış bir gazete. Ohannes Usta dün okumuş ona; Cenevre\'deki komitenin raporu, bir sütun. Bir tanık: N. İ., Manastır doğumlu. Baban başını kaldırıyor. Gazeteden öğrendim, diyor. Kızımın başına geleni bir gazeteden. Senden duymak isterdim, Neslihan.'
          : 'Baban hiçbir şey bilmiyor. Cenevre\'de Neslihan konuşmadı; rapor adsız çıktı. Ama Ohannes Usta bir gazete getirmiş, on yedi kızdan söz eden bir sütun. Baban okutmamış; katlayıp yastığının altına koymuş. Neslihan onu görüyor. Biri anlatmadan önce ben anlatmalıyım, diyor sana fısıltıyla.',
        bayrak(d, 'mektupKarar') === 'baba'
          ? 'Rivière\'in mektubu da masada; geçen yıl ona verdiğiniz. Okuyamıyor ama atmamış. Bazı kâğıtlar okunmak için değil, diyor, tutulmak için.'
          : '',
        bayrak(d, 'babaItiraf')
          ? 'Sofrada kalıbı anlatmıştı; kendi günahını. Şimdi sıra çocuklarının günahı olmayan bir şeyde.'
          : '',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Neslihan anlatsın. Kendi sesiyle, baştan.',
          etki: { bayrak: { babaBildi: 'neslihan' }, artir: { neslihanBag: 1 } },
          sonra: 'baba32_son',
        },
        {
          etiket: 'Sen anlat. Neslihan yanında otursun; bir yerde dursun dersen durursun.',
          etki: { bayrak: { babaBildi: 'arif' } },
          sonra: 'baba32_son',
        },
        {
          etiket: 'Bu gece değil. Babanın yalnızca kızının elini tutmasına izin ver.',
          etki: { bayrak: { babaBildi: 'el' } },
          sonra: 'baba32_son',
        },
      ],
    },
    baba32_son: {
      ortam: 'ortam_han',
      baslik: 'Kalay',
      paragraflar: (d) => [
        {
          neslihan: (bayrak(d, 'neslihanAd') === 'baba'
            ? 'Ben İsmail kızı Neslihan\'ım, diye başlıyor. Cenevre\'de de böyle başladım. '
            : bayrak(d, 'neslihanAd') === 'kendi'
              ? 'Kendi seçtiğim adla konuştum orada, diyor. Ama şimdi sana senin verdiğin adla anlatacağım. '
              : 'Neslihan iki elini dizlerinin arasına sıkıştırıyor. ') +
            'Selanik\'teki iskeleyi, ambarı, Viyana\'yı anlatıyor. Bir yerde sesi kırılıyor; durmuyor. Baban bir kez bile gözlerini ondan ayırmıyor.',
          arif: 'Sen anlatıyorsun; Neslihan senin anlattığını düzeltiyor. Hayır abi, o gün yağmur yoktu. Hayır, o adam İtalyan değildi. Sonunda hikâyeyi senden alıyor; bitiren o oluyor. Baban ikinizin de yüzüne ayrı ayrı bakıyor.',
          el: 'Kimse bir şey söylemiyor. Neslihan babasının yanına oturuyor; baban onun elini alıyor, kalay lekeli parmaklarıyla avucunu açıyor, bir süre öylece tutuyor. Söylenmeyen bir şey o gece o odada kalıyor; kötü bir şekilde değil.',
        }[bayrak(d, 'babaBildi')] || '',
        'Sonunda baban konuşuyor. Kalay bakırı zehirden korur, diyor; çocukken size öğrettiğim ilk şey. Ama içeriden korumaz. Ben sizi içeriden koruyamadım.',
        'Pencereden Haliç görünüyor. Ohannes Usta aşağıda ocağı yakıyor. Kayıkhaneden Kemal\'in, ya da birinin, çekiç sesi gelmiyor artık. Gitmeliyiz, diyor Neslihan. Kaptan bekliyor.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Kayıkhaneye dön', etki: { mekan: 'kayikhane32' } }],
    },

    kayik32: {
      ortam: 'ortam_kayik',
      baslik: 'Gece, Karaköy rıhtımı',
      paragraflar: (d) => [
        'Gece yarısı. Süleyman\'ı battaniyesiyle kayığa taşıyorsunuz; pusula kucağında. ' +
          (kemalVar(d) ? 'Kemal kürekte.' : 'Kürekte sen varsın.') +
          ' Cemil Bey kıçta oturuyor; çantası yanında, açmayacağını bildiği halde.',
        'İlk durak uzak değil. Leventis\'in yanaştığı yer; şimdi orada bir İtalyan yük gemisi. Sabri\'nin suda bulunduğu yer.',
        'Süleyman başını kaldırıyor. Altı yıl önce, diyor, mangalın başında sana sordum: hiç aramadın mı onları? ' +
          ({
            inandim: 'Sen inandım dedin. Öldüler dediler, inandım.',
            korktum: 'Sen korktum dedin. Tanımamaktan korktun.',
            sucluluk: 'Sen aramanın onları bıraktığını kabul etmek olduğunu söyledin.',
          }[bayrak(d, 'arifNeden')] || 'Sen cevap vermedin.'),
        'Sonra aradın. Selanik, Manastır, Viyana, Zürih, Napoli. Neden, evlat? Bunu ölmeden önce bilmek istiyorum.',
      ],
      secenekler: [
        {
          etiket: 'Onlar için. Bir ayva ağacı, bir ses. Yaşıyorlarsa beni beklemesinler diye.',
          etki: { bayrak: { arifCevap: 'onlar' } },
          sonra: 'kayik32_kule',
        },
        {
          etiket: 'Senin için kaptan. Aramayı bırakan kendini gömer dedin. Seni o iskelede yalnız bırakmak istemedim.',
          etki: { bayrak: { arifCevap: 'kaptan' }, artir: { suleymanBag: 1 } },
          sonra: 'kayik32_kule',
        },
        {
          etiket: 'Kendim için. Gömülmek istemedim.',
          etki: { bayrak: { arifCevap: 'kendim' } },
          sonra: 'kayik32_kule',
        },
      ],
    },
    kayik32_kule: {
      ortam: 'ortam_kayik',
      baslik: 'Kız Kulesi',
      paragraflar: (d) => [
        {
          onlar: 'Süleyman gülümsüyor. Onlar için, diyor. Peki onlar seni bekledi mi? Bekledi. Yanlış yerde, yanlış adlarla, ama bekledi. Arayan da bulunur, evlat. Bunu bilmiyordun.',
          kaptan: 'Süleyman uzun süre bir şey demiyor. Sonra elini senin elinin üstüne koyuyor; kuru, sıcak. Bir oğlumu denizde kaybettim, diyor. Birini rıhtımda buldum. Biri geri geldi. Bir adama düşenin fazlası.',
          kendim: 'Süleyman başını sallıyor. Doğru cevap bu, diyor. Ötekiler de doğru, ama bu en doğrusu. Başkası için arayan bir gün yorulur. Kendini arayan yorulmaz; yorulursa durur, dinlenir, yine yola çıkar.',
        }[bayrak(d, 'arifCevap')] || '',
        {
          kalip: 'Kule karanlıkta beliriyor. Babanın Delorme\'u ittiği taşlar. Kalıp bu suyun dibinde, diyor Süleyman. İyi ki.',
          atil: 'Kule karanlıkta beliriyor. Rıza Bey\'in tetiği çektiği yer. Süleyman bir şey söylemiyor; Cemil Bey gözlerini kaçırıyor.',
          konus: 'Kule karanlıkta beliriyor. Delorme\'un teslim olduğu yer. Bir adamı konuşarak indirdin, diyor Süleyman. Ben hiç beceremedim.',
        }[bayrak(d, 'kuleSecim')] || 'Kule karanlıkta beliriyor; feneri sönük.',
        kemalVar(d)
          ? 'Kemal kürekleri bırakıyor. Kayık kendi başına dönüyor. Süleyman pusulayı kucağından kaldırıyor. Bunu kime vereyim, diyor; Kemal\'e değil, sana.'
          : 'Kayık akıntıya yan dönüyor. Süleyman pusulayı kucağından kaldırıyor. Kemal burada değil, diyor. Bunu kime vereyim?',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Kemal\'e. Nevres\'ten ikinizden biri kurtuldu sandın; ikiniz de kurtuldunuz.',
          kosul: (d) => kemalVar(d),
          etki: { bayrak: { pusulaKime: 'kemal' } },
          sonra: 'kayik32_safak',
        },
        {
          etiket: 'Kemal\'e. Pire\'ye ben götürürüm.',
          kosul: (d) => !kemalVar(d),
          etki: { bayrak: { pusulaKime: 'kemal' } },
          sonra: 'kayik32_safak',
        },
        {
          etiket: 'Bana kaptan. Aramayı bırakmayacağım.',
          etki: { bayrak: { pusulaKime: 'arif' }, artir: { suleymanBag: 1 } },
          sonra: 'kayik32_safak',
        },
        {
          etiket: 'Denize. Nevres\'in yattığı yer değil ama aynı deniz.',
          etki: { bayrak: { pusulaKime: 'deniz' } },
          sonra: 'kayik32_safak',
        },
      ],
    },
    kayik32_safak: {
      ortam: 'ortam_safak32',
      efekt: ['vapur_duduk'],
      baslik: 'Fenerbahçe açığı, şafak',
      paragraflar: (d) => [
        {
          kemal: kemalVar(d)
            ? 'Kemal pusulayı alıyor; bir çocuğun aldığı gibi, iki eliyle. Sol kulağının üstündeki yanık izi ilk ışıkta parlıyor. Süleyman o ize dokunuyor. Gömleğimle sarmıştım, diyor. Hatırlıyor musun? Kemal hatırlamıyor. Evet, diyor.'
            : 'Pusulayı cebine koyuyorsun. Pire\'ye bir vapur her hafta kalkıyor. Süleyman gözlerini kapatıyor. İyi, diyor. Oğlum bilsin, babası onu düşündü.',
          arif: 'Pusulayı alıyorsun. Ağır; bir sandala tutunmuş bir adamın üç günü kadar ağır. İbresi titriyor, sonra kuzeyi buluyor. Hep bulur, diyor Süleyman. Sen kaybolsan da.',
          deniz: 'Süleyman pusulayı kendi eliyle bırakıyor. Su bir an parlıyor, sonra kapanıyor. Gerek kalmadı, diyor. Herkes eve döndü.',
        }[bayrak(d, 'pusulaKime')] || '',
        'Fenerbahçe feneri sönüyor; doğuda gökyüzü açılıyor. Bir Kadıköy vapuru düdük çalıyor. Süleyman nefesini zor alıyor. Cemil Bey nabzına bakıyor; sonra elini bırakıyor ve yalnızca tutuyor.',
        bayrak(d, 'rahelKarar')
          ? 'Neslihan Süleyman\'ın başını dizine almış. İskenderiye\'den beri dilinde bir ninni var; şimdi bekliyor.'
          : 'Neslihan Süleyman\'ın başını dizine almış. Bir şey söylemek istiyor; ne söyleyeceğini bilmiyor.',
        'Süleyman gözlerini açıyor. Bir şey söyleyin, diyor. Deniz çok sessiz.',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Neslihan söylesin: annenin ninnisini.',
          etki: { bayrak: { suleymanSon: 'ninni' } },
          sonra: 'kayik32_son',
        },
        {
          etiket: 'Sen anlat: ilk geceyi. Sabri\'yi, denki, onun kahvesini.',
          etki: { bayrak: { suleymanSon: 'anlat' }, artir: { suleymanBag: 1 } },
          sonra: 'kayik32_son',
        },
        {
          etiket: 'Kimse konuşmasın. Kürekleri bırakın; denizi dinlesin.',
          etki: { bayrak: { suleymanSon: 'sus' } },
          sonra: 'kayik32_son',
        },
      ],
    },
    kayik32_son: {
      ortam: 'ortam_safak32',
      baslik: 'Süleyman',
      paragraflar: (d) => [
        {
          ninni: 'Dandini dandini dastana, diye başlıyor Neslihan; sesi önce titriyor, sonra düzeliyor. Süleyman gülümsüyor. Bunu bilirim, diyor; Rumeli ağzı. Benim annem de. İkinci kıtada gözleri kapanıyor.',
          anlat: 'Anlatıyorsun: bir Aralık gecesi, rıhtımda bir kalabalık, suda bir adam. Kaptanın kahvesi, ters çevrilmiş fincan. Süleyman bir yerde düzeltiyor: kahve değildi o gece, ıhlamurdu. Sonra gülüyor; sonra gülerken susuyor.',
          sus: 'Kimse konuşmuyor. Dalga kayığın tahtasına vuruyor; bir martı, bir vapur, uzakta bir çekiç. Süleyman dinliyor. Bir ara dudakları kıpırdıyor; kimse duymuyor ne dediğini. Belki bir ad.',
        }[bayrak(d, 'suleymanSon')] || '',
        'Güneş Moda\'nın üstünden doğarken Süleyman Kaptan ölüyor. Cemil Bey saati söylemiyor; kimse sormuyor.',
        bayrak(d, 'cemilSuleyman')
          ? 'Cemil Bey gözlüğünü çıkarıyor. Bir sandık İzmir inciri, diyor kendi kendine. Morgda sana söylemiştim, hatırlıyor musun? Altı yıl. Hâlâ borçluyum.'
          : '',
        sayi(d, 'suleymanBag') >= 3
          ? 'Kayığı kıyıya sen çekiyorsun. Ellerin titremiyor. Bunu ondan öğrendin.'
          : 'Kayığı kıyıya hep birlikte çekiyorsunuz. Kimse bir şey söylemiyor.',
      ].filter(Boolean),
      secenekler: [
        { etiket: 'Devam', kosul: (d) => !!bayrak(d, 'madalya'), sonra: 'madalya32' },
        { etiket: 'Devam', kosul: (d) => !bayrak(d, 'madalya'), sonra: 'vasiyet32' },
      ],
    },
    madalya32: {
      ortam: 'ortam_kayikhane',
      ortamOran: 0.3,
      baslik: 'Sandığın dibi',
      paragraflar: (d) => [
        'Gece. Süleyman yıkanmış, kefenlenmiş; kayıkhanenin ortasında, tezgâhın üstünde. Sabah Karacaahmet\'e götürülecek. Herkes uyuyor, ya da uyuyor gibi.',
        'Karaköy\'deki odana gidip sandığını açıyorsun. Dipte, bir mendile sarılı: Seddülbahir\'den madalya. On yıldır açmadığın mendil.',
        bayrak(d, 'madalya') === 'anlat'
          ? 'Cihangir\'de Nermin\'e anlatmıştın; sofrada da sormuştu: Hâlâ sandığın dibinde mi? Hâlâ.'
          : 'Cihangir\'de Nermin\'e yarısını anlatmıştın. Öbür yarısını hâlâ bekliyor.',
        sayi(d, 'travma') >= 2
          ? 'Mendili açınca elin titriyor. Kum kokusu; olmayan bir koku. Nefesini sayıyorsun.'
          : 'Mendili açıyorsun. Pirinç kararmış. Elin titremiyor; bu seni şaşırtıyor.',
        'Süleyman bir keresinde demişti: Savaşın günahını kendi sırtına yükleme. Madalyayı avucunda tartıyorsun.',
      ],
      secenekler: [
        {
          etiket: 'Kefenin yanına koy. Bir savaştan sağ çıkan iki adam; biri artık yorulmadı.',
          etki: (d) => ({ bayrak: { madalyaSonu: 'mezar' }, artir: { travma: sayi(d, 'travma') > 0 ? -1 : 0 } }),
          sonra: 'vasiyet32',
        },
        {
          etiket: 'Göğsüne tak. Cenazeye bir asker gibi git; bir kez.',
          etki: { bayrak: { madalyaSonu: 'tak' } },
          sonra: 'vasiyet32',
        },
        {
          etiket: 'Nermin\'e gönder. Öbür yarıyı yazsın; sen anlatamıyorsan bir kâğıt anlatsın.',
          etki: { bayrak: { madalyaSonu: 'nermin' }, artir: { nerminBag: 1 } },
          sonra: 'vasiyet32',
        },
      ],
    },
    vasiyet32: {
      ortam: 'ortam_kayikhane',
      ortamOran: 0.6,
      baslik: '14 Eylül 1924, Karacaahmet',
      paragraflar: (d) => [
        {
          mezar: 'Madalya kefenin içinde, Süleyman\'ın göğsünde. Kimse bilmiyor; Cemil Bey hariç. Bir şey demiyor; yalnızca omzuna bir kez dokunuyor.',
          tak: 'Göğsünde Seddülbahir madalyası. Rıhtımdan gelen hamallardan biri, kolu dirsekten kesik, sana selam veriyor; asker selamı.',
          nermin: 'Madalya bir zarfta, Ankara yolunda. İçine tek bir satır yazdın: Öbür yarısı. Nermin anlayacak.',
        }[bayrak(d, 'madalyaSonu')] || '',
        'Karacaahmet\'te sade bir mezar. Rıhtımdan otuz hamal geliyor; Topal Hasan başta. Ohannes Usta, Yorgo, Gülce. ' +
          (bayrak(d, 'rizaSon22') === 'kirgin' ? 'Rıza Bey mezarlığın kapısında duruyor; içeri girmiyor, ama gelmiş.' : 'Rıza Bey bastonuna dayanmış, en arkada.'),
        {
          mektup: 'İnebolu\'dan bir sandık fındık geliyor; Hatice\'nin elinden bir not: Abimin mektubunu bana getiren adamın kaptanına. Rahmet olsun. Abim de onu severdi.',
          dogru: 'İnebolu\'dan bir sandık fındık geliyor; Hatice\'nin elinden bir not: Abimin katilini arayanların kaptanına. Rahmet olsun.',
          sessiz: 'İnebolu\'dan Hatice\'nin mektubu geliyor; cenazeden bir gün sonra. Abim hangi gemide boğuldu, kaptan bilirdi, yazıyor. Ona sorar mısınız? Mektubu katlayıp cebine koyuyorsun. Cevabı biliyorsun; dört yıl önce kağnının yanında ona söyleyemedin.',
        }[bayrak(d, 'haticeSonu')] || '',
        {
          ad: 'Nermin\'in telgrafı Ankara\'dan: Gelemiyorum. Cenevre yazısından beri kapımda bir jandarma bekliyor; korumak için mi izlemek için mi bilmiyorum. Kaptana benim yerime bir avuç toprak atın.',
          takma: 'Nermin\'in telgrafı Ankara\'dan: Gelemiyorum. Taşhan bu hafta kaptanın adını ilk sayfaya basıyor; imzasız. Bir avuç toprak da benden.',
        }[bayrak(d, 'nerminImza')] || '',
        bayrak(d, 'husnuKustu')
          ? 'Mezarlığın kapısında kayıkçı Hüsnü; artık çok yaşlı. Sana bakmıyor. Altı yıl önce rıhtımda yakasından tutmuştun. Toprağı atıp gidiyor.'
          : sayi(d, 'husnuGuven') >= 1
            ? 'Mezarlığın kapısında kayıkçı Hüsnü; artık çok yaşlı. O gün rıhtımda Süleyman\'ın adını verdin, diyor. Yalan değilmiş. Toprağı senden önce atıyor.'
            : 'Mezarlığın kapısında kayıkçı Hüsnü; artık çok yaşlı. Bir şey demeden toprağı atıp gidiyor.',
        'Akşam kayıkhanede Gülce bir kâğıt açıyor; Süleyman geçen kış yazdırmış, mühürletmiş. Tek satır: Kayıkhane, aramayı bırakmayanındır. Ad yok.',
        'Kâğıdın içinden mühürlü ikinci bir zarf çıkıyor. Üstünde: Gülce\'ye. ' +
          ({
            yaz: 'Gülce zarfı çeviriyor. Tevfik\'e yaz ve yaşa demiştin, diyor sana. Kaptan o adamı benden iyi tanıyordu.',
            affetme: 'Gülce zarfı çeviriyor. Tevfik\'i affetmedim, diyor. Kaptan biliyordu. Belki bu yüzden yazmış.',
            sessiz: 'Gülce zarfı çeviriyor; köşesinde Bursa\'dan bir posta damgası. Tevfik\'in defterini dizine koymuştun, diyor. Kaptan koymamış.',
          }[bayrak(d, 'gulceTevfik')] || 'Gülce zarfı çeviriyor; köşesinde Bursa\'dan bir posta damgası.'),
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Kayıkhane Kemal\'in. Burada kayık yapsın.',
          kosul: (d) => kemalVar(d),
          etki: { bayrak: { kayikhaneVaris: 'kemal' } },
          sonra: 'zarf32',
        },
        {
          etiket: 'Kayıkhane Kemal\'in. Bir gün dönecek.',
          kosul: (d) => !kemalVar(d),
          etki: { bayrak: { kayikhaneVaris: 'kemal' } },
          sonra: 'zarf32',
        },
        {
          etiket: 'Kayıkhane Gülce\'nin. On Üç\'ten beri onun iskelesi.',
          etki: { bayrak: { kayikhaneVaris: 'gulce' }, artir: { gulceGuven: 1 } },
          sonra: 'zarf32',
        },
        {
          etiket: 'Kayıkhane hepimizin. Kapıya bir levha: kim kaybolduysa, buradan aranır.',
          etki: { bayrak: { kayikhaneVaris: 'hepimiz' } },
          sonra: 'zarf32',
        },
      ],
    },
    zarf32: {
      ortam: 'ortam_kayikhane',
      baslik: 'Gülce\'nin zarfı',
      paragraflar: (d) => [
        {
          kemal: kemalVar(d)
            ? 'Kemal babasının tezgâhına elini koyuyor. Bir kayık bitireceğim, diyor. Adını o koymuştu: Arayan.'
            : 'Kayıkhanenin anahtarını bir zarfa koyup Pire\'ye yolluyorsunuz. Kapı kilitli kalmayacak; Gülce her akşam uğrayacak.',
          gulce: 'Gülce anahtarı avucunda tutuyor. On bir yıl önce bu iskelede oturdum, diyor. Bir şey istemedim. Şimdi bir şey verildi; bilmiyorum ne yapacağımı. ' + (gulceYakin(d) ? 'Sonra sana bakıyor. Biliyorum aslında.' : ''),
          hepimiz: 'Ohannes Usta ertesi sabah bir levha getiriyor; kalayla yazılmış harfler. Senin baban döktü harfleri, diyor. Sen istemeden.',
        }[bayrak(d, 'kayikhaneVaris')] || '',
        'Gülce zarfı açmadan sana bakıyor. Kaptanın el yazısı. Bursa damgası. Açayım mı?',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Aç. Kaptan bunu sana bir sebeple bıraktı.',
          etki: { bayrak: { gulceZarf: 'acti' } },
          sonra: 'kapanis32',
        },
        {
          etiket: 'Sakla. Hazır olduğunda açarsın; kaptan acele etmezdi.',
          etki: { bayrak: { gulceZarf: 'sakla' } },
          sonra: 'kapanis32',
        },
      ],
    },
    kapanis32: {
      ortam: 'ortam_kayikhane',
      ortamOran: 0.45,
      baslik: 'Beşinci kitabın sonu',
      paragraflar: (d) => [
        bayrak(d, 'gulceZarf') === 'acti'
          ? 'Gülce okuyor; yüzü değişiyor. Tevfik\'in kardeşi, diyor. Selim. Bursa\'da. Kaptan On Üç\'ten beri biliyormuş: babamın dosyasını Maliye\'den o gece çıkaran Selim\'miş. Babamı kurtarmak için. Geç kalmış. Kâğıdın altında bir adres var.'
          : 'Gülce zarfı açmıyor. Göğsünün cebine koyuyor; babasının mektubunun yanına. Bir gün, diyor.',
        'Gece. Kayıkhanenin kapısı açık; lodos dinmiş. Duvarda pusulanın asılı olduğu çivi boş, ya da değil.',
        'Neslihan iskelenin ucunda oturuyor; Süleyman\'ın oturduğu yerde. Pire\'den gelen bir vapurun ışıklarına bakıyor; inenlerin yüzüne. Deliliktir, biliyorum, diyor sana gülümseyerek. Ama birini öğrendim.',
        'Beşinci kitabın sonu.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_kayikhane',
      ortamOran: 0.45,
      baslik: 'Otuz ikinci bölüm bitti',
      paragraflar: ['Kararların kaydedildi. Altıncı kitap yazılıyor.'],
      secenekler: [{ etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    kayikhane32: {
      ad: 'Kayıkhane',
      ortam: 'ortam_kayikhane',
      tarif: 'Tezgâh, talaş kokusu, açık kapıdan deniz. Süleyman Kaptan\'ın yatağı denize bakıyor. Duvarda pusula.',
      nesneler: [
        {
          id: 'pusula32',
          etiket: 'Duvardaki pusula',
          incele: 'Pirinç kasası yeşillenmiş. Camında bir çatlak; Nevres\'ten. İbre hâlâ kuzeyi buluyor.',
        },
      ],
      kisiler: ['suleyman32', 'cemil32', 'kemal32', 'neslihan32'],
      gecisler: [{ hedef: 'han32', etiket: 'Kalafatçı Hanı\'na git' }],
    },
    han32: {
      ad: 'Kalafatçı Hanı',
      ortam: 'ortam_han',
      tarif: 'Ohannes Usta\'nın ocağı, katran ve kalay kokusu. Ocağın üstünde babanın odası.',
      nesneler: [
        {
          id: 'oda32',
          etiket: 'Babanın odası',
          kosul: (d) => !bayrak(d, 'babaBildi'),
          incele: 'Neslihan kapının önünde duruyor; elini kaldırıyor, indiriyor, yine kaldırıyor.',
          etki: { sahne: 'baba32' },
        },
      ],
      kisiler: [],
      gecisler: [{ hedef: 'kayikhane32', etiket: 'Kayıkhaneye dön' }],
    },
  },

  kisiler: {
    suleyman32: {
      ad: 'Süleyman Kaptan',
      giris: (d) => (bayrak(d, 'suleymanHazir') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: (d) =>
            'Süleyman gözlerini açıyor. Cemil ne dedi, biliyorum, diyor. Yüzü söyledi. ' +
            (bayrak(d, 'suleymanUmut') === 'soz'
              ? 'İzmir\'de sözünü tuttun; oğlumu getirdin. Bir şey daha isteyeceğim.'
              : 'Bir şey isteyeceğim.') +
            ' Bir gece daha denize çıkmak. Pusulayla.',
          secenekler: [
            {
              etiket: 'Cemil Bey izin vermez kaptan.',
              cevap: 'Cemil izin vermez, diyor Süleyman; ama gelir. Ben onu tanırım.',
              sonra: 'ilk',
            },
            {
              etiket: 'Neden pusula?',
              cevap: 'Yirmi yedi yıl duvarda durdu, diyor. Bir kez de beni taşısın; ben onu taşıdım.',
              sonra: 'ilk',
            },
            {
              etiket: 'Bu gece çıkarız. Önce Neslihan\'ın bir kapısı var.',
              etki: { bayrak: { suleymanHazir: true } },
              cevap: 'İyi, diyor Süleyman. Kapılar beklemez; deniz bekler.',
            },
          ],
        },
        sonra: {
          soz: 'Süleyman uyukluyor. Bir eli battaniyenin üstünde, açık; kürek tutar gibi.',
          secenekler: [{ etiket: 'Uyusun.' }],
        },
      },
    },
    cemil32: {
      ad: 'Cemil Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            ({
              birlikte: 'Cemil Bey iskelede. Eleni ekimde Ankara\'ya geliyor, diyor; yeni hastaneye. Sonra susuyor. Bir adamın sevinmesi için kötü bir hafta.',
              mektup: 'Cemil Bey iskelede; cebinde Eleni\'nin İskenderiye\'den gelen ilk mektubu, açılmamış. Bu hafta açmayacağım, diyor. Bu hafta kaptanın.',
              veda: 'Cemil Bey iskelede, yalnız. İskenderiye\'de bir kapıyı kapattım, diyor. Burada bir kapı kendiliğinden kapanıyor. İkisi arasında bir hekim ne yapar? Nabız sayar.',
            }[bayrak(d, 'cemilEleni')] || 'Cemil Bey iskelede. Nabız sayıyorum, diyor; başka işe yaramıyorum.'),
          secenekler: [{ etiket: 'Bu gece bizimle gel.' , cevap: 'Elbette, diyor. Çantamla. Açmayacağım ama.' }],
        },
      },
    },
    kemal32: {
      ad: 'Kemal',
      kosul: (d) => kemalVar(d),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'kemalKalir')
              ? 'Kemal çekici bırakıyor. Bir yıl önce kalırım dedim, diyor. Bir yıl. Kayık yapmayı ancak öğrendim. Bitiremeyeceğim, değil mi?'
              : 'Kemal limanda bir gemiden izin almış, üç gün. Yirmi beş yıl aradı beni, diyor. Ben ona üç gün veriyorum. Utanıyorum.',
          secenekler: [
            {
              etiket: 'Bitireceksin. O dinliyor; çekici bırakma.',
              etki: { artir: { suleymanBag: 1 } },
              cevap: 'Kemal çekici yeniden alıyor. Babası gözlerini açıyor, kapatıyor.',
            },
            { etiket: 'Yanına otur. Kayık bekler.', cevap: 'Kemal babasının yanına oturuyor. Konuşmuyorlar. Konuşmaları gerekmiyor.' },
          ],
        },
      },
    },
    neslihan32: {
      ad: 'Neslihan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'babaBildi')
              ? 'Neslihan kaptanın yatağının ayak ucunda. Babam ağladı mı, biliyor musun, diyor. Hayır. Kalaycılar ağlamaz, ellerini yakarlar.'
              : bayrak(d, 'neslihanTanik') === 'evet'
                ? 'Neslihan bir gazete tutuyor; Cenevre raporu, bir sütun. Ohannes Usta bunu babama okumuş, diyor. Benden önce. Gitmem lazım abi.'
                : 'Neslihan pencerede. Cenevre\'de konuşmadım, diyor. Ama babama konuşmam lazım. Kaptandan önce. Ondan sonra yapamam.',
          secenekler: [{ etiket: 'Hana gidelim.' }],
        },
      },
    },
  },
};

