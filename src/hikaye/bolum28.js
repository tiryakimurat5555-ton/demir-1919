// Yirmi sekizinci bölüm: "Cehennem, Otuz Üç". Napoli, 22-24 Nisan 1924.
// Arka plan (gerçek): İtalya'da Ekim 1922'den beri yeni rejim; Nisan 1924'te genel seçim. Duvarlarda seçim afişleri,
// sokaklarda kara gömlekliler; gerçek kişiler konuşturulmaz. Milletler Cemiyeti'nin kadın ve çocuk ticaretiyle ilgili bir
// danışma komitesi vardı (gerçek kurum; bu bölümde kurgu bir dosya ona gider).
// Kurgu: Ferrante (1. bölümden; 11'de kaçtı ya da tutuklandı), Ferrante e Soci, eski tayfası Gennaro, "soru sormayan adam"
// Bruno (26-27'de ekildi). Santa Lucia: 3. bölümdeki geminin adı, Napoli'nin bir mahallesi.
// Kalıbı kır: pazarlık + gece araması. Ferrante bir takas önerir: üst yarıyı yak, on altı kızın bugünkü adresini al.
// Karşılık verilen iplikler: neslihanYol, fikriItiraf (arama), fikriKarar, yabanciGeldi (Bruno), kemalKalir, ferranteSonu /
// ferranteGuven, rizaHikaye ve rizaSon22 (Rıza'nın korkusu), klaraYardim + rainerSonu (Cenevre).
// Yeni iplikler: ferranteKarar, rizaKorku, makbuz (makbuz defteri).
import { BOLUM27 } from './bolum27';
import { bayrak, cikarimVar, delilVar, sayi } from '../oyun/motor';

const neslihanYanimda = (d) => bayrak(d, 'neslihanYol') !== 'yalniz';
export const ALARM_SINIRI28 = 2;

export const BOLUM28 = {
  id: 'bolum28',
  ad: 'Yirmi sekizinci bölüm: Cehennem, Otuz Üç',
  baslangic: 'acilis',
  ilkMekan: 'liman28',

  deliller: {
    ...BOLUM27.deliller,
    gennaro_ifadesi: {
      ad: 'Gennaro\'nun anlattıkları',
      tarif: 'Ferrante\'nin eski tayfası Gennaro: Patron her akşam yedi buçukta San Carlo\'ya, operaya gider; gece yarısından önce dönmez. Yazıhanenin arka merdiveni avluya açılır. Kitaplıkta Dante\'den başka kitap okumaz; Cehennem\'i ezbere bilir. Bir de kasası yok: makbuzlarını bir deftere yazar, masanın gizli çekmecesine koyar. Otuz yıldır; ilk günden.',
    },
    ferrante_teklifi: {
      ad: 'Ferrante\'nin teklifi',
      tarif: 'Ferrante: Üst yarıyı getir, gözümün önünde yak. Karşılığında sana makbuz defterimden on altı adres vereyim: hangi kız, hangi kente, kime, şimdi nerede. Bir kâğıt yanar, on altı kapı açılır.',
    },
    alt_yari: {
      ad: 'Kırk yedinci sayfanın alt yarısı',
      tarif: 'Dante\'nin Cehennem\'inden, otuz üçüncü kantonun arasından: sayfanın alt yarısı. Yırtık kenarı Selanik\'teki yarıya birebir oturuyor. Altında: Teslim eden ve bedeli alan, C. Ferrante. Kasım 1912.',
    },
    makbuz_defteri: {
      ad: 'Ferrante\'nin makbuz defteri',
      tarif: 'Otuz yıllık bir defter. 1912 sayfasında on yedi makbuz: alıcının adı, şehir, bedel. Kenarlarda sonradan eklenmiş notlar: evlendi, öldü, kaçtı, hâlâ orada. Melek, Marsilya: hâlâ orada.',
    },
  },

  cikarimlar: {
    ...BOLUM27.cikarimlar,
    makbuz: {
      a: 'gennaro_ifadesi',
      b: 'ferrante_teklifi',
      ad: 'Gizli çekmece',
      metin: 'Ferrante on altı adresi ezbere bilmiyor; makbuz defterinden okuyacak. Defter yazıhanesinde, masanın gizli çekmecesinde. Alt yarı da orada bir yerde; Dante\'nin yanında. Ve Ferrante bu akşam yedi buçukta operada.',
    },
  },

  olaylar: [
    { id: 'bruno', kosul: (d) => delilVar(d, 'alt_yari') && delilVar(d, 'makbuz_defteri'), etki: { sahne: 'bruno28' } },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Yirmi sekizinci bölüm bitti.' },
    { kosul: (d) => !delilVar(d, 'gennaro_ifadesi'), metin: 'Limanda Ferrante\'nin eski tayfasını bul.' },
    { kosul: (d) => !delilVar(d, 'ferrante_teklifi'), metin: 'Via Marina\'ya git; Ferrante seni bekliyor.' },
    { kosul: (d) => !cikarimVar(d, 'makbuz'), metin: 'Gennaro\'nun anlattıklarını Ferrante\'nin teklifiyle birleştir.' },
    { kosul: (d) => !delilVar(d, 'alt_yari'), metin: (d) => 'Gece, arka merdivenden yazıhaneye gir. Dikkat: ' + sayi(d, 'alarm28') + ' / ' + ALARM_SINIRI28 + '.' },
    { kosul: () => true, metin: 'Yazıhanede kalan ne varsa al.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_napoli',
      efekt: ['vapur_duduk'],
      baslik: '22 Nisan 1924, Napoli',
      paragraflar: (d) => [
        'Vapur Vezüv\'ün dumanının altında körfeze giriyor. Napoli: sarı, kırmızı, kirli, güzel. Rıhtımda balıkçılar, arabacılar, limon satan çocuklar.',
        'Duvarlarda seçim afişleri. Köşe başlarında kara gömlekli gençler; birbirlerine bağırarak gülüyorlar. Rıza Bey onlara bir polisin gözüyle bakıyor; sonra bakmamayı seçiyor.',
        {
          yalniz: 'Cebinde Neslihan\'ın ilk mektubu, Marsilya\'dan: Manastır okulunu buldum abi. Kapıcı kadın Melek diye birini hatırlıyor; ama adını değiştirmişler. Buradayım. Her hafta.',
          birlikte: 'Neslihan yanında, korkuluğa yaslanmış. Önce Napoli, demişti; ben öndeyim. Şimdi gerçekten önde: rıhtıma ilk o iniyor.',
          bekle: 'Neslihan yanında. Napoli\'den sonra Marsilya, demiştin. Her gece Melek\'in adını yazdığı kâğıdı yastığının altına koyuyor.',
        }[bayrak(d, 'neslihanYol')] || 'Neslihan yanında.',
        {
          savci: 'İstanbul\'dan son haber: Fikri ifadesini Kadıköy savcısına verdi. On yedi adı tek tek saydı. Savcı Ferrante için İtalya\'ya bir yazı gönderecek; ama yazılar yavaş gider.',
          kenan: 'İstanbul\'dan son haber, Kenan\'dan: Babamı savcılığa götürdüm. On yedi adı tek tek saydı. Size bir şey borçluyum: babamı tanımayı.',
          birak: 'İstanbul\'dan bir haber gelmedi. Moda\'daki köşkün perdeleri kapalı, diyor Süleyman Kaptan\'ın son mektubu.',
        }[bayrak(d, 'fikriKarar')] || '',
        bayrak(d, 'kemalKalir')
          ? 'Kemal de geldi; Akdeniz limanlarını avucunun içi gibi bilir. Napoli\'de, Santa Lucia\'nın balıkçıları arasında eski bir tayfa tanıdığı var, diyor.'
          : 'Limanın Santa Lucia tarafında balıkçılar ağ örüyor. Santa Lucia: altı yıl önce Karaköy\'de Ferrante\'nin tüfeklerini taşıyan geminin adı.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Karaya çık', etki: { mekan: 'liman28', bayrak: { 'gorüldü_liman28': true, ekip_riza: true, ekip_cemil: false, ekip_nermin: false } } }],
    },

    riza_korku: {
      ortam: 'ortam_napoli',
      baslik: 'Rıza Bey',
      paragraflar: (d) => [
        'Rıza Bey rıhtımın kenarındaki bir kahvenin önüne oturuyor. Bir şey itiraf edeyim, diyor. Moda\'da, o köşkte, o koltukta kendimi gördüm.',
        'Yaşlı bir adam. Gözleri kör değil; ama yarın olabilir. Bir koltukta oturup unutamadıklarını sayıyor. Fikri on yedi ad sayıyor. Ben bir ad sayıyorum.',
        bayrak(d, 'rizaHikaye') ? 'Yakup, diyor; adı ilk kez yüksek sesle söylüyor gibi. Bazı geceler adını sayıyorum. Bir, bir, bir.' : 'Bir çocuğun adı. Sana bir gün anlatırım demiştim; hâlâ anlatamadım.',
      ],
      secenekler: [
        {
          etiket: 'Sen Fikri değilsin. Sen o sopayı dizinde kırdın; o kalemini kırmadı.',
          kosul: (d) => !!bayrak(d, 'rizaHikaye'),
          etki: { bayrak: { rizaKorku: 'fark' }, artir: { rizaBag: 1 } },
          sonra: 'riza_korku_son',
        },
        {
          etiket: 'Bir gün koltukta oturursan, yanında ben de oturacağım. Adları birlikte sayarız.',
          etki: { bayrak: { rizaKorku: 'yanında' }, artir: { rizaBag: 1 } },
          sonra: 'riza_korku_son',
        },
        {
          etiket: 'Bir şey söyleme. Kahveni iç.',
          etki: { bayrak: { rizaKorku: 'sus' } },
          sonra: 'riza_korku_son',
        },
      ],
    },
    riza_korku_son: {
      ortam: 'ortam_napoli',
      baslik: 'Rıza Bey',
      paragraflar: (d) => [
        {
          fark: 'Rıza Bey uzun süre denize bakıyor. Kırdım, diyor. Ama parçaları hâlâ bende. Sonra gülüyor; kısa, gerçek. Sağ ol evlat. Bunu kendime hiç söyleyemezdim.',
          yanında: 'Rıza Bey sana bakıyor. Sen o zaman da genç olmayacaksın, diyor. İki yaşlı adam, bir koltukta. Kahvesini kaldırıyor: Kabul.',
          sus: 'Kahveni içiyorsunuz. Bir balıkçı ağını sudan çekiyor; boş. Bir daha atıyor. Rıza Bey bunu izliyor; ağın her atılışında başını hafifçe sallıyor.',
        }[bayrak(d, 'rizaKorku')] || '',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'liman28' } }],
    },

    pazarlik28: {
      ortam: 'ortam_buro',
      baslik: 'Ferrante e Soci',
      paragraflar: (d) => [
        'Via Marina, on dört. İkinci kat. Kapıda pirinç bir levha: Ferrante e Soci, Spedizioni. İçeride kahve kokusu ve bir gramofon.',
        'Ferrante masasının arkasından kalkıyor. Altı yıl önce Karaköy\'de gördüğünden yaşlı; saçları ağarmış, yüzü güneşten kararmış. Gülümsemesi aynı.',
        {
          kacti: 'Kalaycının oğlu, diyor. İzmir\'de, Kemeraltı\'nda bana anlaştık demiştin. Ben sözümü tuttum; kaçtım ve kimseyi öldürmedim. Sen de tuttun; arkamdan gelmedin. Ta ki bugüne kadar.',
          tutuklu: 'Kalaycının oğlu, diyor. İzmir\'de beni tutuklattın. İki yıl yattım; konsolosumuz çıkardı. Kin tutmam. Kin pahalıdır.',
        }[bayrak(d, 'ferranteSonu')] || 'Kalaycının oğlu, diyor. Seni bekliyordum.',
        bayrak(d, 'yabanciGeldi')
          ? 'Köşede bir adam oturuyor; gazetesini indirmiyor. Moda\'daki çakıl izlerini bıraktığını düşündüğün adam. Ferrante tanıştırmıyor; Bruno, diyor sadece, sanki bir köpeğin adını söyler gibi.'
          : 'Köşede bir adam oturuyor; gazetesini indirmiyor. Ferrante tanıştırmıyor; Bruno, diyor sadece.',
        'Selanik\'teki yarıyı biliyorum, diyor Ferrante. Fikri\'nin eli; benim imzam öbür yarıda. İkisi birleşirse benim için Milano\'da da, Paris\'te de, Cenevre\'de de bir hücre var. Ama ben iş adamıyım. Sana bir teklifim var.',
        'Üst yarıyı getir; gözümün önünde yak. Karşılığında sana makbuz defterimden on altı adres veririm. Hangi kız, hangi kente, kime gitti; şimdi nerede, yaşıyor mu. Bir kâğıt yanar, on altı kapı açılır. Kalaycının kızı için bundan iyi bir pazarlık olur mu?',
        neslihanYanimda(d)
          ? 'Neslihan bir şey söylemiyor. Ama eli titriyor; ilk kez.'
          : 'Neslihan burada değil. Marsilya\'da bir kapının önünde. Onun yerine sen karar vereceksin; ve bunu biliyorsun.',
      ],
      secenekler: [
        {
          etiket: 'Düşüneceğim.',
          etki: { delil: ['ferrante_teklifi'], mekan: 'via_marina' },
        },
      ],
    },

    gece28: {
      ortam: 'ortam_buro',
      baslik: 'Arka merdiven',
      paragraflar: (d) => [
        'Gece. Avludan arka merdivene çıkıyorsunuz; ' + (bayrak(d, 'kemalKalir') ? 'Kemal avluda, bir kayığın başında bekliyor.' : 'Rıza Bey avlunun kapısında bekliyor.'),
        'Yazıhane karanlık. Gramofon susmuş. Ferrante\'nin masası, bir koltuk, duvar boyunca kitaplık. Üç raf, üç cilt; ciltler ortada, tozları silinmiş: biri Dante, biri Petrarca, biri Boccaccio.',
        bayrak(d, 'fikriItiraf') === 'tam'
          ? 'Fikri\'nin sesi kulağında: Dante cildinin içinde. Cehennem, otuz üçüncü kanto.'
          : 'Fikri sana yerini söylememişti. Gennaro\'nun sözü aklında: Patron Dante\'den başka kitap okumaz. Ama bir adam asıl sakladığını en çok sevdiği kitaba mı koyar?',
        'Dikkat: ' + sayi(d, 'alarm28') + ' / ' + ALARM_SINIRI28 + '. Aşağıda, sokakta, bir motor sesi geçiyor.',
      ],
      secenekler: [
        {
          etiket: 'Dante. Cehennem\'i aç; otuz üçüncü kanto.',
          etki: { delil: ['alt_yari'], bayrak: { aramaSonu: 'dante' } },
          sonra: 'gece28_bulundu',
        },
        {
          etiket: 'Petrarca. Sevdiği kitaba koymaz; sevmediğine koyar.',
          kosul: (d) => !bayrak(d, 'bakildi_petrarca') && bayrak(d, 'fikriItiraf') !== 'tam',
          etki: { artir: { alarm28: 1 }, bayrak: { bakildi_petrarca: true } },
          sonra: 'gece28_yanlis',
        },
        {
          etiket: 'Boccaccio. Kimse Decameron\'da ciddi bir şey aramaz.',
          kosul: (d) => !bayrak(d, 'bakildi_boccaccio') && bayrak(d, 'fikriItiraf') !== 'tam',
          etki: { artir: { alarm28: 1 }, bayrak: { bakildi_boccaccio: true } },
          sonra: 'gece28_yanlis',
        },
      ],
    },
    gece28_yanlis: {
      ortam: 'ortam_buro',
      baslik: 'Arka merdiven',
      paragraflar: (d) => [
        'Cildi açıyorsun; sayfalar boş. Rafa geri koyarken bir kitap yere düşüyor. Ses bütün binada yankılanıyor.',
        sayi(d, 'alarm28') >= ALARM_SINIRI28
          ? 'Aşağıda bir kapı açılıyor. Biri merdivenden çıkıyor; ağır adımlarla. Artık seçecek zaman yok: kitaplıkta tek bir cilt kaldı.'
          : 'Bir süre bekliyorsunuz. Kimse gelmiyor. Henüz.',
      ],
      secenekler: [{ etiket: 'Kitaplığa dön', sonra: 'gece28' }],
    },
    gece28_bulundu: {
      ortam: 'ortam_buro',
      efekt: ['delil'],
      baslik: 'Cehennem, Otuz Üç',
      paragraflar: (d) => [
        'Otuz üçüncü kanto. Kont Ugolino, kendi çocuklarıyla bir kulede aç bırakılan adam. Sayfaların arasında katlanmış bir kâğıt: sayfanın alt yarısı.',
        'Teslim eden ve bedeli alan: C. Ferrante. Kasım 1912. İmza düzgün, gösterişli; bir tüccar imzası.',
        neslihanYanimda(d)
          ? 'Neslihan iki yarıyı yan yana koyuyor; yırtık kenarlar birbirine oturuyor. On iki yıl sonra sayfa yeniden tek parça. Neslihan bir şey söylemiyor; sadece avucunu sayfanın üstüne koyuyor, bir yarayı kapatır gibi.'
          : 'İki yarıyı yan yana koyuyorsun; yırtık kenarlar birbirine oturuyor. Neslihan burada olsaydı ne yapardı, diye düşünüyorsun. Sayfayı bir mendile sarıyorsun; onun gibi.',
        'Sonra masa. Gennaro\'nun dediği gibi, sağ çekmecenin altında ikinci bir dip. İçinde kalın, kara kaplı bir defter.',
      ],
      secenekler: [{ etiket: 'Defteri al', etki: { delil: ['makbuz_defteri'] } }],
    },

    bruno28: {
      ortam: 'ortam_buro',
      baslik: 'Bruno',
      paragraflar: (d) => [
        'Kapı açılıyor. Bruno. Elinde bir tabanca yok; daha kötüsü, eli boş ve sakin. Soru sormuyor.',
        bayrak(d, 'yabanciGeldi')
          ? 'Moda\'da senden önce gelen adam. Selanik vapurundan beri arkanda. Şimdi önünde.'
          : 'Ferrante\'nin yazıhanesinde gazetesini indirmeyen adam.',
        'Kapıyla senin arandaki boşluğu ölçüyor. Defter ve sayfa senin elinde.',
      ],
      secenekler: [
        {
          etiket: 'Rıza Bey\'in sesini duy: Merdivenden çağırıyor, eski polis sesiyle.',
          etki: { bayrak: { brunoSonu: 'riza' } },
          sonra: 'bruno28_son',
        },
        {
          etiket: 'Pencere. Avluda Kemal\'in kayığı.',
          kosul: (d) => !!bayrak(d, 'kemalKalir'),
          etki: { bayrak: { brunoSonu: 'kemal' } },
          sonra: 'bruno28_son',
        },
        {
          etiket: 'Üstüne yürü. Bu sefer kaçmayacaksın.',
          etki: { bayrak: { brunoSonu: 'kavga' }, artir: { travma: 1 } },
          sonra: 'bruno28_son',
        },
      ],
    },
    bruno28_son: {
      ortam: 'ortam_napoli',
      baslik: 'Gece',
      paragraflar: (d) => [
        {
          riza: 'Merdivenin başında Rıza Bey: İtalyanca tek bir kelime biliyor, polizia; ama o kelimeyi kırk yıllık bir komiserin sesiyle söylüyor. Bruno bir an duraksıyor. O an yeter. Yanından geçip merdivenden iniyorsun.',
          kemal: 'Pencereden avluya atlıyorsun; Kemal kayığı duvarın dibine çekmiş. Kürekler suya giriyor. Bruno pencerede; atlamıyor. Kayıkla peşinden gelinmez, diyor Kemal; babamın sözü.',
          kavga: 'Bruno\'nun üstüne yürüyorsun. Seddülbahir\'de öğrendiğin her şey ellerine dönüyor. Bruno yere düşüyor; sen de. Kaburgan sızlıyor. Ama defter göğsünde, sayfa cebinde. Merdivenden inerken ellerin titriyor; titremesi saatlerce geçmiyor.',
        }[bayrak(d, 'brunoSonu')] || '',
        'Şafakta Santa Lucia rıhtımı. Ferrante orada; operadan dönmüş, frakının üstünde bir palto. Bruno ona haber vermiş olmalı. Yanında kimse yok.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Ferrante\'nin yanına git', sonra: 'ferrante28' }],
    },
    ferrante28: {
      ortam: 'ortam_napoli',
      baslik: 'Santa Lucia',
      paragraflar: (d) => [
        'Ferrante denize bakıyor. Defterimi aldınız, diyor. Otuz yıl. Her makbuz. Şimdi ben bir iş adamı değilim; bir sanığım.',
        'Ama bir şeyi unutuyorsunuz: bu ülkede yeni dostlarım var. İtalyan polisine verirseniz, bir hafta içinde çıkarım. Ve defter bir hafta içinde kaybolur.',
        'Neslihan defterin 1912 sayfasını okuyor; ' + (neslihanYanimda(d) ? 'yanında.' : 'yok; sen okuyorsun.') + ' On altı makbuz. Kenarlarda notlar: evlendi, öldü, kaçtı, hâlâ orada. Melek, Marsilya: hâlâ orada. Rahel, İskenderiye: hâlâ orada.',
        bayrak(d, 'klaraYardim') || bayrak(d, 'rainerSonu') === 'serbest'
          ? 'Cebinde bir kart: Dr. Klara Rainer, avukat, Cenevre. Lozan\'dan beri saklıyorsun. Milletler Cemiyeti\'nin kadın ve çocuk ticareti komitesi Cenevre\'de toplanıyor.'
          : 'Milletler Cemiyeti\'nin kadın ve çocuk ticareti komitesi Cenevre\'de toplanıyor; Rıza Bey gazetede okumuş.',
      ],
      secenekler: [
        {
          etiket: 'Cenevre\'ye. Sayfa, defter ve Ferrante\'nin adı aynı dosyada; bir ülkenin değil, herkesin önünde.',
          etki: { bayrak: { ferranteKarar: 'cenevre' } },
          sonra: 'ferrante28_son',
        },
        {
          etiket: 'İtalyan polisine. Bir hafta da olsa hücrede yatsın.',
          etki: { bayrak: { ferranteKarar: 'polis' } },
          sonra: 'ferrante28_son',
        },
        {
          etiket: 'Git Ferrante. Önce kapılar. On altı kapı. Seninle sonra uğraşırız.',
          etki: { bayrak: { ferranteKarar: 'birak' } },
          sonra: 'ferrante28_son',
        },
      ],
    },
    ferrante28_son: {
      ortam: 'ortam_napoli',
      efekt: ['vapur_duduk'],
      baslik: 'Santa Lucia',
      paragraflar: (d) => [
        {
          cenevre: (bayrak(d, 'klaraYardim') || bayrak(d, 'rainerSonu') === 'serbest'
            ? 'Klara\'ya telgraf çekiyorsun. Cevap öğlene gelmeden geliyor: Getirin. Dedemin örgütünün sayfası benim de sayfam.'
            : 'Rıza Bey Cenevre\'ye bir mektup yazıyor; Fransızcasıyla, kelime kelime.') + ' Ferrante gülüyor; sonra gülmüyor. Cenevre uzak, diyor. Ama sesinde ilk kez bir tereddüt var.',
          polis: 'Rıza Bey bir karakol buluyor. Ferrante karşı koymuyor; tek kelime etmeden arabaya biniyor. Kapı kapanırken sana dönüp gülümsüyor. Bir hafta, diyor dudakları.',
          birak: 'Ferrante şapkasını çıkarıyor; bir an, gerçek bir saygıyla. Bir iş adamına göre fazla cömertsin, diyor. Sonra kalabalığa karışıyor. Defter sende. Gerisi zamanın.',
        }[bayrak(d, 'ferranteKarar')] || '',
        bayrak(d, 'neslihanYol') === 'yalniz'
          ? 'Marsilya\'ya bir telgraf: Melek hâlâ orada. Adres ekte. Neslihan\'ın cevabı akşam geliyor; tek kelime: Biliyorum.'
          : 'Neslihan defterin Marsilya sayfasını parmağıyla işaretliyor. Yarın, diyor. Melek on iki yıldır bekliyor.',
        'Yirmi sekizinci bölümün sonu.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_napoli',
      ortamOran: 0.45,
      baslik: 'Yirmi sekizinci bölüm bitti',
      paragraflar: ['Kararların kaydedildi.'],
      secenekler: [{ etiket: 'Yirmi dokuzuncu bölüme geç', sonrakiBolum: 'bolum29' }, { etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    liman28: {
      ad: 'Santa Lucia rıhtımı',
      ortam: 'ortam_napoli',
      tarif: 'Balıkçı kayıkları, ağ örenler, limon satan çocuklar. Rıhtımın ucunda Castel dell\'Ovo. Kahvenin önünde Rıza Bey oturuyor.',
      nesneler: [],
      kisiler: ['gennaro', 'riza28', 'neslihan28', 'kemal28'],
      gecisler: [{ hedef: 'via_marina', etiket: 'Via Marina\'ya git' }],
    },
    via_marina: {
      ad: 'Via Marina',
      ortam: 'ortam_napoli',
      tarif: 'Limana bakan, dar balkonlu sarı binalar. On dört numaranın ikinci katında pirinç bir levha: Ferrante e Soci.',
      nesneler: [
        {
          id: 'ferrante_kapisi',
          etiket: 'Ferrante e Soci\'nin kapısı',
          kosul: (d) => !delilVar(d, 'ferrante_teklifi'),
          incele: 'Pirinç levha parlatılmış. Kapıyı çalıyorsun.',
          etki: { sahne: 'pazarlik28' },
        },
        {
          id: 'arka_merdiven',
          etiket: 'Gece: avludaki arka merdiven',
          kosul: (d) => cikarimVar(d, 'makbuz') && !delilVar(d, 'alt_yari'),
          incele: 'Yedi buçuk. San Carlo\'nun kapısında arabalar. Avluya giriyorsun.',
          etki: { sahne: 'gece28' },
        },
      ],
      kisiler: [],
      gecisler: [{ hedef: 'liman28', etiket: 'Rıhtıma dön' }],
    },
  },

  kisiler: {
    gennaro: {
      ad: 'Gennaro',
      giris: (d) => (delilVar(d, 'gennaro_ifadesi') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'kemalKalir')
              ? 'Kemal bir balıkçının sırtına vuruyor; adam dönüp Kemal\'i kucaklıyor. Gennaro, diyor Kemal; Pire\'de aynı gemideydik. On yıl Ferrante\'nin gemilerinde çalıştı. Gennaro Türkçe bilmiyor; Kemal çeviriyor.'
              : 'Ağ ören yaşlı bir balıkçı; Ferrante adını duyunca ağı bırakıyor. Rıza Bey\'in Fransızcası ile adamın Fransızcası bir yerde buluşuyor. Gennaro, diyor adam. On yıl onun gemilerindeydim.',
          secenekler: [
            {
              etiket: 'Ferrante\'yi anlat.',
              etki: { delil: ['gennaro_ifadesi'] },
              sonra: 'sonra',
              cevap: 'Her akşam yedi buçukta San Carlo\'ya gider, diyor Gennaro; gece yarısından önce dönmez. Yazıhanenin arka merdiveni avluya açılır. Kitaplıkta Dante\'den başka kitap okumaz. Kasası yok; makbuzlarını bir deftere yazar, masanın gizli çekmecesine koyar. Otuz yıldır.',
            },
          ],
        },
        sonra: {
          soz: 'Gennaro ağına dönüyor. On iki yıl önce bir gemide kızlar vardı, diyor birden. Ambara koymuşlardı. Ben su götürürdüm. Bir tanesi bana Türkçe bir ninni söylemişti. Hâlâ hatırlıyorum, ama söyleyemem; dilimi bilmem.',
          secenekler: [{ etiket: 'Sağ ol Gennaro.' }],
        },
      },
    },
    riza28: {
      ad: 'Rıza Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Rıza Bey kahvesini karıştırıyor. Otur, diyor. Bir şey söylemem lazım; bu kentte söyleyebilirim, çünkü kimse Türkçe bilmiyor.',
          secenekler: [
            { etiket: 'Dinliyorum.', kosul: (d) => !bayrak(d, 'rizaKorku'), etki: { sahne: 'riza_korku' } },
            { etiket: 'Sonra Rıza Bey.' },
          ],
        },
      },
    },
    neslihan28: {
      ad: 'Neslihan',
      kosul: (d) => neslihanYanimda(d),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            delilVar(d, 'ferrante_teklifi')
              ? 'Neslihan rıhtımın kenarında. On altı adres, diyor. Bir kâğıt karşılığında. Abi, ben o kâğıdı yakarım. Melek için yakarım. Ama sonra bütün hayatım boyunca yaktığımı bileceğim.'
              : 'Neslihan Castel dell\'Ovo\'ya bakıyor. Rivière beni bir kez buraya getirmişti, diyor. On altı yaşındaydım. Bu kenti güzel bulmuştum. Hâlâ buluyorum. Bu daha kötü.',
          secenekler: [{ etiket: 'Buradayım.' }],
        },
      },
    },
    kemal28: {
      ad: 'Kemal',
      kosul: (d) => !!bayrak(d, 'kemalKalir'),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Kemal bir kayıkçıyla pazarlık ediyor; Rumca, İtalyanca, Türkçe karışık. Gece için bir kayık tuttum, diyor. Lazım olur. Babam derdi ki: karada iş yapacaksan denizden bir yol tut.',
          secenekler: [{ etiket: 'Sağ ol Kemal.' }],
        },
      },
    },
  },
};
