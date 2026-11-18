// Yirmi altıncı bölüm: "Zarf". Selanik, 13-14 Şubat 1924. Beşinci kitabın açılışı.
// Arka plan (gerçek): Lozan'da Ocak 1923'te imzalanan nüfus mübadelesi; 1923-1924 kışında Selanik'in Müslümanları
// vapurlarla Anadolu'ya, Anadolu'nun Ortodoks Rumları Yunanistan'a taşındı. İki yöne giden iki kalabalık aynı acıyla
// anlatılır; hiçbir topluluk suçlanmaz. Gerçek kişiler ve gerçek vapur adları kurguya karışmaz.
// Kurgu: Hafız Efendi'nin torunu Emine, Niğdeli Despina'nın ailesi (Hafız'ın evine yerleşen mübadil), Binbaşı Fikri'nin
// oğlu avukat Kenan Bey.
// Karşılık verilen iplikler: hafizZarf (zarf), saltielDavid / davidNotu (David'in defteri, on yedi ad), neslihanAd (Emine'nin
// sorusu), cemilFikri / cemilDefter (eski sağlık dairesi, Kenan), arifGece (vapur yolculuğu), rizaSon22 (telgraf).
// Kötü (kural 4): Binbaşı Fikri 2. bölümde ekildi; 25. bölümde F. E. olarak geri döndü.
// Yeni iplikler: kenanSonu (Kenan Bey ne yapacak), zarfAcan (zarfı kim açtı), cemilSelanik (Cemil'in sözü).
import { BOLUM25 } from './bolum25';
import { bayrak, cikarimVar, delilVar, sayi } from '../oyun/motor';

export const SUPHE_SINIRI26 = 2;
const emineKusku = (d) => sayi(d, 'emineSuphe') >= SUPHE_SINIRI26;

export const BOLUM26 = {
  id: 'bolum26',
  ad: 'Yirmi altıncı bölüm: Zarf',
  baslangic: 'acilis',
  ilkMekan: 'rebeka26',

  deliller: {
    ...BOLUM25.deliller,
    saltiel_telgrafi: {
      ad: 'Saltiel\'in telgrafı',
      tarif: 'Selanik, 2 Şubat 1924: Hafız Efendi Aralık sonunda vefat etti. Ölmeden kalaycının oğlunu sordu. Zarf torunu Emine\'de. Aile mübadele listesinde; vapur 14 Şubat sabahı. Saltiel.',
    },
    david_defteri: {
      ad: 'David Saltiel\'in defteri',
      tarif: 'Mavi kaplı küçük bir defter; Kasım 1912. On yedi kız adı, David\'in düzgün harfleriyle. Altında bir not: Listeyi getiren sağlık dairesinden bir binbaşı. Adını söylemedi. Yazısı sola yatık. Kâğıdın köşesinde tek harf: F.',
    },
    hafiz_notu: {
      ad: 'Hafız Efendi\'nin notu',
      tarif: 'Hafız Efendi\'nin titrek eliyle, katlanmış bir kâğıt: Emine, kızım. Zarf kırmızı sandığın dibinde. Kalaycının kızı gelirse ona ver. Rivière\'in kızı diye gelene verme; o ad onun değil, onu alanların.',
    },
    kenan_mektubu: {
      ad: 'İstanbullu beyin mektubu',
      tarif: 'Emine\'ye bırakılmış bir mektup: dedesinin kâğıtlarını iyi bir fiyata almak istiyor. İmza: Av. Kenan. Altında, başka bir elle, sola yatık harflerle bir satır: Dedeniz beni tanırdı. F. E.',
    },
    zarf: {
      ad: 'Kırk yedi',
      tarif: 'Rivière\'in mühürlü zarfı. İçinde kuruluş defterinin kırk yedinci sayfasının üst yarısı: Kasım 1912, on yedi kız adı ve her birinin karşısında bir şehir. Sola yatık bir el. Alt yarısı yırtılmış. Bir de Rivière\'in notu.',
    },
  },

  cikarimlar: {
    ...BOLUM25.cikarimlar,
    zarf_yeri: {
      a: 'saltiel_telgrafi',
      b: 'hafiz_notu',
      ad: 'Kırmızı sandık',
      metin: 'Emine ailesiyle rıhtımda; vapur sabah kalkıyor. Zarf kırmızı sandığın dibinde. Hafız Efendi ona bir şey öğretmiş: kime vereceğini, adından anlayacak.',
    },
    fikri_yasiyor: {
      a: 'david_defteri',
      b: 'kenan_mektubu',
      ad: 'Sola yatık el',
      metin: 'On iki yıl önce David\'e listeyi getiren binbaşının eli ile Emine\'ye yazılan mektubun altındaki el aynı. F. E. Binbaşı Fikri yaşıyor. Oğlu zarfın peşinde; bu kentte, bu gece.',
    },
  },

  olaylar: [
    {
      id: 'kenan',
      kosul: (d) => delilVar(d, 'zarf') && cikarimVar(d, 'fikri_yasiyor') && !!bayrak(d, 'zarfAcan'),
      etki: { sahne: 'kenan26' },
    },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Yirmi altıncı bölüm bitti.' },
    { kosul: (d) => !delilVar(d, 'david_defteri'), metin: 'Saltiel Efendi\'yle konuş; David\'in defteri onda.' },
    { kosul: (d) => !delilVar(d, 'hafiz_notu'), metin: 'Hafız Efendi\'nin eski evine git.' },
    { kosul: (d) => !cikarimVar(d, 'zarf_yeri'), metin: 'Telgrafla Hafız Efendi\'nin notunu soruşturma panosunda birleştir.' },
    { kosul: (d) => !delilVar(d, 'zarf'), metin: 'Rıhtımda Emine\'yi bul. Vapur sabah kalkıyor.' },
    { kosul: (d) => !cikarimVar(d, 'fikri_yasiyor'), metin: 'David\'in defteriyle İstanbullu beyin mektubunu karşılaştır.' },
    { kosul: () => true, metin: 'Rıhtımda kal. Biri seni arıyor.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_guverte',
      efekt: ['vapur_duduk'],
      baslik: '13 Şubat 1924, Selanik',
      paragraflar: (d) => [
        'Vapur Beyaz Kule\'nin önünde demir atıyor. Beş yıl önce bu rıhtıma Kalliope\'yle, bir fırtınadan sonra çıkmıştın. Şehir yine yanık; ama bu kez yangından değil.',
        bayrak(d, 'hafizZarf')
          ? 'Beş yıl önce Rebeka Hanım\'ın evinde, ateşin başında, yaşlı bir defterdarın göğüs cebinde bir zarf görmüştün. Kırk yedi. Onu gerçek adıyla isteyene ver.'
          : '',
        'Cebinde Saltiel Efendi\'nin telgrafı. Hafız Efendi Aralık sonunda ölmüş. Ölmeden kalaycının oğlunu sormuş. Zarf torunu Emine\'de. Aile mübadele listesinde; vapurları yarın sabah.',
        'Lozan\'da imzalanan bir kâğıt: bu kentin Müslümanları Anadolu\'ya, Anadolu\'nun Rumları buraya. Rıhtımda iki yöne giden iki kalabalık var; aynı bohçalar, aynı yorganlar, aynı kafesli kanaryalar.',
        'Neslihan yanında. Cemil Bey de; Ankara\'dan izin aldı. Rıza Bey ' +
          ({
            emekli: 'İstanbul\'da, kayıkhanede; bastonu sende. Bir telgraf çekti: Zarfı aç, adamı bul, dikkat et.',
            kirgin: 'İstanbul\'da; hâlâ yazmıyor. Süleyman Kaptan onun da selamını getirdiğini söyledi; inanmadın, ama sevindin.',
          }[bayrak(d, 'rizaSon22')] || 'İstanbul\'da kaldı; Gülce\'nin bürosunda bir dosyanın başında. Ben buradan bakarım, dedi; Selanik\'ten gelen her kâğıdı.'),
        {
          kardes: 'Vapurda Neslihan Viyana\'nın ilk kışını anlattı sana; ilk kez. Rivière\'in kütüphanesini, gece yarısı Fransızca derslerini, penceresinden gördüğü karı. Sonra sustu. Gerisi Selanik\'te, dedi.',
          nefes: 'Vapurda fırtına çıktı. Aşağıda bir çocuk ağlıyordu; ona nefesini saymayı öğrettin. Dörde kadar al, dörde kadar ver. Sabah çocuğun annesi sana bir ayva verdi.',
          yalniz: 'Vapurda bir gece kazan dairesinin gürültüsü seni Seddülbahir\'e götürdü. Sabah Cemil Bey\'i kamaranın kapısında, bir sandalyede uyurken buldun. Bir şey sormadı.',
        }[bayrak(d, 'arifGece')] || '',
        'Kalamarya\'da Rebeka Hanım\'ın evi. Saltiel Efendi kapıda bekliyor.',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Karaya çık',
          etki: { mekan: 'rebeka26', delil: ['saltiel_telgrafi'], bayrak: { 'gorüldü_rebeka26': true, ekip_cemil: true, ekip_nermin: false, ekip_riza: false } },
        },
      ],
    },

    cemil26: {
      ortam: 'ortam_yanik_sehir',
      baslik: 'Sağlık dairesi',
      paragraflar: (d) => [
        'Rıhtımın arkasında, iki katlı taş bir bina. Cemil Bey önünde duruyor; şapkası elinde.',
        'Burası, diyor. On İki\'nin Kasım\'ı. Avlusuna her gece bir araba girerdi. Ben şu pencerenin arkasında, bir masada, kaza yazardım.',
        'Pencereden şimdi çocuk sesleri geliyor. Bir ilkokul olmuş; Rumca bir tekerleme, hep bir ağızdan.',
        {
          teselli: 'Zürih\'te bana emir satın alınmıştı dedin, diyor. Doğru. Ama kalemi tutan bendim.',
          durust: 'Zürih\'te Fikri\'nin adını Eleni\'ye yazdım, diyor. Kendimi temize çıkarmadan. Şimdi buradayım; yazdığım yerde.',
          sessiz: 'Zürih\'te bir şey söylemedin, diyor. Bunun için sana minnettarım. Burada da söyleme.',
        }[bayrak(d, 'cemilDefter')] || 'Cemil Bey uzun süre konuşmuyor.',
        bayrak(d, 'cemilFikri')
          ? 'Gureba\'nın morgunda sana anlattığım kâtip, diyor. David. Onu bu avluda yıkadım. Defterini bu binanın arka kapısından postaya verdim.'
          : '',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'İçeri girelim, Cemil Bey. Masanın yerine bak.',
          etki: { bayrak: { cemilSelanik: 'gir' }, artir: { cemilBag: 1 } },
          sonra: 'cemil26_son',
        },
        {
          etiket: 'Uzaktan bakmak yeter. Gel, rıhtıma dönelim.',
          etki: { bayrak: { cemilSelanik: 'bak' } },
          sonra: 'cemil26_son',
        },
        {
          etiket: 'Fikri\'yi bulacağız, Cemil Bey. Ona soracağın soruyu ben de duymak istiyorum.',
          etki: { bayrak: { cemilSelanik: 'soz' }, artir: { cemilBag: 1 } },
          sonra: 'cemil26_son',
        },
      ],
    },
    cemil26_son: {
      ortam: 'ortam_yanik_sehir',
      baslik: 'Sağlık dairesi',
      paragraflar: (d) => [
        {
          gir: 'Sınıfın öğretmeni genç bir kadın; Cemil Bey\'in hekim çantasına bakıp sınıfın arkasını gösteriyor. Masanın olduğu yerde şimdi bir soba yanıyor. Bir çocuk Cemil Bey\'e tebeşirle çizdiği bir gemiyi uzatıyor. Cemil Bey resmi göğüs cebine koyuyor; David\'in defterinin durduğu yere.',
          bak: 'Bir süre daha bakıyorsunuz. Sonra Cemil Bey şapkasını takıyor. Bazı kapılar kapalı kalmalı, diyor. Ama hangisi olduğunu bilmek lazım.',
          soz: 'Cemil Bey sana bakıyor. Bir soru, diyor. Ona tek bir soru soracağım. Neden diye değil; bu, bütün hayatını değiştirdi mi diye. Benimkini değiştirdi.',
        }[bayrak(d, 'cemilSelanik')] || '',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'rihtim26' } }],
    },

    zarf_teslim: {
      ortam: 'ortam_mubadele',
      baslik: 'Kırmızı sandık',
      paragraflar: (d) => [
        'Emine kırmızı sandığın kapağını kaldırıyor. Yorganların, bir bakır sininin, sarı bir Kuran kesesinin altından mühürlü bir zarf çıkarıyor. Mühürde kanatlı bir anahtar; kenarında Rivière\'in baş harfi. Zarfın üstünde tek bir sayı: kırk yedi.',
        'Dedem her akşam bu zarfa bakardı, diyor Emine. Bir defterdar mühür kırmaz derdi. Ben de kırmadım.',
        'Zarfı uzatıyor. Ama sana değil.',
      ],
      secenekler: [
        {
          etiket: 'Neslihan alsın, Neslihan açsın. Onun adına bırakıldı.',
          etki: { delil: ['zarf'], bayrak: { zarfAcan: 'neslihan' }, artir: { neslihanBag: 1 } },
          sonra: 'zarf_icerik',
        },
        {
          etiket: 'Ben açayım. İçinde ne var, önce ben bileyim.',
          etki: { delil: ['zarf'], bayrak: { zarfAcan: 'arif' } },
          sonra: 'zarf_icerik',
        },
      ],
    },
    zarf_icerik: {
      ortam: 'ortam_mubadele',
      baslik: 'Kırk yedinci sayfa',
      paragraflar: (d) => [
        bayrak(d, 'zarfAcan') === 'arif'
          ? (['durust', 'sonra_durust'].includes(bayrak(d, 'kardesGecesi'))
            ? 'Mührü sen kırıyorsun. Neslihan bir şey demiyor; ama elini senin elinin üstüne koyuyor. Birlikte okuyorsunuz.'
            : 'Mührü sen kırıyorsun. Neslihan bir adım geri çekiliyor. Yine mi beni koruyorsun abi, diyor. Sesi kırgın değil; yorgun.')
          : 'Neslihan mührü tırnağıyla kaldırıyor; bir defterdarın kızı gibi dikkatli. Kâğıdı açıyor. Sonra sana uzatıyor: birlikte.',
        'Kuruluş defterinin kırk yedinci sayfası; yarısı. Üstte, Kasım 1912. Altında on yedi kız adı; her birinin karşısında bir şehir. Viyana. Marsilya. İskenderiye. Odesa. Napoli. Buenos Aires.',
        'On birinci satır: Neslihan, İsmail kızı, Manastır. Karşısında: Viyana, R.',
        bayrak(d, 'sayfa47')
          ? 'Zürih\'te, cam masanın üstünde, kesik kenarını gördüğün sayfa. İşte öbür yarısının yarısı.'
          : '',
        'El yazısı sola yatık. Sayfanın alt yarısı yırtılmış; yırtığın kenarında bir imzanın ilk iki harfi kalmış: F. E.',
        {
          verdi: 'Neslihan çantasından David\'in listesinin kopyasını çıkarıyor; dört yıldır taşıdığı kâğıdı. Yan yana koyuyor. Aynı on yedi ad. Ama bu kâğıtta şehirler var, diyor. Artık nereye bakacağımı biliyorum.',
          sakla: 'Cüzdanındaki kâğıt göğsüne batıyor: Saltiel\'in kopyası, aynı on yedi ad. Neslihan\'a hiç göstermedin. Neslihan sayfadan başını kaldırıp sana bakıyor. Bu adları ilk kez mi görüyorsun abi?',
        }[bayrak(d, 'davidNotu')] || '',
        'Sayfanın arkasında Rivière\'in el yazısı, Fransızca. Neslihan okuyor: Alt yarısında satanın imzası vardı. On Sekiz\'in yazında onu sahibine geri verdim; susması karşılığında. Ama yazının kendisi onun. N., bu kâğıt senin. Ötekileri bul. Ben bulamadım; aramadım. Que sais-je?',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Evet. Saltiel\'in kâğıdı dört yıldır cüzdanımda. Sana söylemedim.',
          kosul: (d) => bayrak(d, 'davidNotu') === 'sakla',
          etki: { bayrak: { davidItiraf: true } },
          sonra: 'zarf_son',
        },
        {
          etiket: 'Bir şey söyleme. Sayfayı ona bırak.',
          kosul: (d) => bayrak(d, 'davidNotu') === 'sakla',
          etki: { bayrak: { davidItiraf: false } },
          sonra: 'zarf_son',
        },
        { etiket: 'Devam', kosul: (d) => bayrak(d, 'davidNotu') !== 'sakla', sonra: 'zarf_son' },
      ],
    },
    zarf_son: {
      ortam: 'ortam_mubadele',
      baslik: 'Kırk yedinci sayfa',
      paragraflar: (d) => [
        bayrak(d, 'davidNotu') === 'sakla'
          ? (bayrak(d, 'davidItiraf')
            ? 'Cüzdanından kâğıdı çıkarıp ona veriyorsun. Neslihan iki kâğıda uzun uzun bakıyor. Neden, diye sormuyor. Biliyor neden. Bir daha yapma, diyor yalnızca. Ben kırılacak bir şey değilim artık abi.'
            : 'Sayfayı ona bırakıyorsun. Cüzdanındaki kâğıt yerinde kalıyor; artık daha ağır.')
          : '',
        'Emine ailesinin yanına dönüyor. Annesi sandığın kapağını kapatıyor, ipini bağlıyor. Yarın sabah bu sandık bir ambara inecek; Hafız Efendi\'nin mezarı bu kentte kalacak.',
        'Neslihan sayfayı göğsüne bastırıyor. On altı ad, diyor. On altı kapı.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'rihtim26' } }],
    },

    kenan26: {
      ortam: 'ortam_mubadele',
      baslik: 'İstanbullu bey',
      paragraflar: (d) => [
        'Akşam. Rıhtımda fenerler yanıyor. Kalabalığın arasından kır paltolu, otuz beşlik bir adam sana doğru geliyor; elinde şapkası.',
        'Kenan, diyor. Avukatım. Babamın adına geldim; ama sanırım bunu biliyorsunuz. Sesi sakin; gözleri değil.',
        'Babam altmış iki yaşında. Moda\'da bir köşkte oturuyor; gözleri artık görmüyor. Geçen ay beni çağırdı: Selanik\'te bir zarf var, dedi. Kırk yedi yazıyor. Onu bul, okumadan yak. Neden diye sormadım. Avukatım; sormamayı öğrendim.',
        'Şimdi soruyorum, diyor. Ne yazıyor o sayfada?',
        bayrak(d, 'cemilDefter') === 'teselli'
          ? 'Cemil Bey bir adım öne çıkıyor; yüzü taş gibi. Neslihan onun kolunu tutuyor.'
          : bayrak(d, 'cemilDefter') === 'durust'
            ? 'Cemil Bey Kenan\'a bakıyor. Babanız benim komutanımdı, diyor sakin bir sesle. On İki\'de. Size bir soru sormak isterdim ama sizin değil, onun cevabı lazım.'
            : 'Cemil Bey bir şey söylemiyor. Ama senin yanından ayrılmıyor.',
      ],
      secenekler: [
        {
          etiket: 'Okuyun. Babanızın el yazısı.',
          etki: { bayrak: { kenanSonu: 'goster' } },
          sonra: 'kenan26_son',
        },
        {
          etiket: 'Babanıza söyleyin: Kalaycının çocukları geliyor.',
          etki: { bayrak: { kenanSonu: 'uyar' } },
          sonra: 'kenan26_son',
        },
        {
          etiket: 'Bir şey söylemeyeceğim. Gidin Kenan Bey.',
          etki: { bayrak: { kenanSonu: 'sakla' } },
          sonra: 'kenan26_son',
        },
      ],
    },
    kenan26_son: {
      ortam: 'ortam_mubadele',
      baslik: 'İstanbullu bey',
      paragraflar: (d) => [
        {
          goster: 'Neslihan sayfayı ona uzatıyor; bırakmadan. Kenan feneri yakınına çekiyor. Okuyor. On yedi ad, on yedi şehir. Sola yatık harfler; çocukluğundan beri bildiği harfler. Elleri titremiyor; yüzü bembeyaz oluyor. Bu el, diyor, bana okumayı öğreten el. Uzun bir sessizlik. Sonra şapkasını takıyor. İstanbul\'a dönüyorum, diyor. Babama yakmadım diyeceğim. Ve neden diye soracağım. Bu sefer cevabını dinleyeceğim.',
          uyar: 'Kenan bir süre sana bakıyor. Söylerim, diyor. Ama bilin: babam yaşlı ama yalnız değil. On iki yıl önce onu koruyanlar bugün de yaşıyor; bazıları Ankara\'da, bazıları Atina\'da. Siz bir sayfa taşıyorsunuz. Onlar bir ömür.',
          sakla: 'Kenan başını sallıyor; nazik, soğuk. Peki, diyor. Ama babamın tek oğlu ben değilim; tek adamı hiç değilim. Benden sonra gelen soru sormaz. Fenerlerin arasında kayboluyor.',
        }[bayrak(d, 'kenanSonu')] || '',
        'Rıhtımın ucunda vapurun bacası tütmeye başlıyor. Gece boyu yükleme sürecek.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Sabahı bekle', sonra: 'vapur26' }],
    },
    vapur26: {
      ortam: 'ortam_mubadele',
      efekt: ['vapur_duduk'],
      baslik: '14 Şubat 1924, sabah',
      paragraflar: (d) => [
        'Sabah. Vapur iskeleden ayrılıyor. Güvertede binlerce insan; kimse el sallamıyor, herkes kente bakıyor. Emine korkuluğun başında; kırmızı sandık ambarda.',
        'Rıhtımda, bu sabah gelen başka bir vapurdan inen bir aile: Niğdeli Despina, kocası, üç çocuk. Hafız Efendi\'nin evine yerleşecekler. Despina Emine\'ye son kez el sallıyor; Türkçe bir dua mırıldanıyor. Emine Rumca bilmiyor, Despina da; ikisi aynı dille ağlıyor.',
        'Neslihan sayfayı katlayıp göğüs cebine koyuyor. On altı ad, diyor yine. Saltiel Efendi\'nin yardımıyla önce Selanik\'teki kayıtlara bakacağız. Sonra Marsilya. Sonra İskenderiye.',
        bayrak(d, 'cemilSelanik') === 'soz'
          ? 'Cemil Bey yanına geliyor. Ve Moda, diyor. Bir köşk. Bir soru.'
          : 'Cemil Bey denize bakıyor. Moda, diyor, sanki kendi kendine.',
        'Saltiel Efendi bir paket tütün uzatıyor; yolluk. Bu sefer içinde bir şey yok, diyor gülümseyerek. Sadece tütün.',
        'Yirmi altıncı bölümün sonu.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_rihtim',
      ortamOran: 0.45,
      baslik: 'Yirmi altıncı bölüm bitti',
      paragraflar: ['Kararların kaydedildi. Yirmi yedinci bölüm yazılıyor.'],
      secenekler: [{ etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    rebeka26: {
      ad: 'Rebeka Hanım\'ın evi',
      ortam: 'ortam_ev',
      tarif: 'Kalamarya\'da, denize bakan küçük bir ev. Beş yıl önce Rivière\'in köşküne bu evden gitmiştin. Rebeka Hanım yaşlanmış; mangalın başında. Saltiel Efendi masada, önünde mavi kaplı bir defter.',
      nesneler: [],
      kisiler: ['saltiel26', 'neslihan26', 'cemil26k'],
      gecisler: [
        { hedef: 'mahalle26', etiket: 'Hafız Efendi\'nin eski mahallesine git' },
        { hedef: 'rihtim26', etiket: 'Rıhtıma in' },
      ],
    },
    mahalle26: {
      ad: 'Hafız Efendi\'nin mahallesi',
      ortam: 'ortam_yanik_sehir',
      tarif: 'Eski barakaların yerinde tek katlı evler. Kapıların üstünde mübadele komisyonunun tebeşirle yazdığı numaralar. Bazı evler boş; bazılarında yeni gelenlerin yorganları serili.',
      nesneler: [
        {
          id: 'kapi26',
          etiket: 'Hafız Efendi\'nin kapısı',
          incele: 'Kapının üstünde tebeşirle: 214. Altında, eski bir elle, Arap harfleriyle kazınmış bir ad: Hafız. Biri onu silmeye çalışmamış.',
        },
      ],
      kisiler: ['despina'],
      gecisler: [
        { hedef: 'rebeka26', etiket: 'Rebeka Hanım\'ın evine dön' },
        { hedef: 'rihtim26', etiket: 'Rıhtıma in' },
      ],
    },
    rihtim26: {
      ad: 'Selanik rıhtımı',
      ortam: 'ortam_mubadele',
      tarif: 'Rıhtım baştan sona insan. Sandıklar, denkler, ipe dizilmiş tencereler. Bir köşede komisyonun memurları listelerden ad okuyor. Kara gövdeli bir vapur iskelede bekliyor; yükleme sabaha kadar sürecek.',
      nesneler: [
        {
          id: 'eski_daire',
          etiket: 'Rıhtımın arkasındaki taş bina',
          kosul: (d) => !bayrak(d, 'cemilSelanik'),
          incele: 'Cemil Bey o binaya bakıyor; bakmamaya çalışarak.',
          etki: { sahne: 'cemil26' },
        },
        {
          id: 'liste26',
          etiket: 'Komisyonun listesi',
          incele: 'Memur adları tek tek okuyor: Ahmet oğlu Hüseyin, Manastırlı. Mehmet kızı Hatice, Florinalı. Her adın karşısında bir sandık sayısı. Neslihan dinliyor; bir tanıdık ad duyunca gözlerini kapatıyor.',
        },
      ],
      kisiler: ['emine', 'kenan', 'neslihan26'],
      gecisler: [
        { hedef: 'rebeka26', etiket: 'Kalamarya\'ya, Rebeka Hanım\'ın evine dön' },
        { hedef: 'mahalle26', etiket: 'Hafız Efendi\'nin mahallesine git' },
      ],
    },
  },

  kisiler: {
    saltiel26: {
      ad: 'Saltiel Efendi',
      giris: (d) => (delilVar(d, 'david_defteri') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: (d) => [
            'Saltiel seni kucaklıyor; gözlüğü buğulanıyor. Beş yıl, diyor. Selanik\'te beş yıl bir ömür.',
            bayrak(d, 'saltielDavid') === 'anlat'
              ? 'Mavi defteri önüne itiyor. Kalliope\'de sana söylemiştim: annemin sandığında. Açtım. Sana kopyasını yollamıştım; bu aslı.'
              : 'Mavi defteri önüne itiyor. Kalliope\'de sana kardeşimi anlatmıştım, diyor. Bir şey dememiştin. Hafız Efendi ölmeden önce beni çağırdı; kalaycının kızını sordu. O zaman anladım. Bu defter senin de.',
            bayrak(d, 'cemilSaltiel')
              ? 'Cemil Bey\'e dönüyor; ellerini tutuyor. Annem geçen kış öldü, diyor. Son cuma da sizin adınızı andı.'
              : '',
          ].filter(Boolean),
          secenekler: [
            {
              etiket: 'Defteri aç.',
              etki: { delil: ['david_defteri'] },
              sonra: 'sonra',
              cevap: 'On yedi ad, David\'in düzgün harfleriyle. Altında bir not: Listeyi getiren sağlık dairesinden bir binbaşı. Adını söylemedi. Yazısı sola yatık. Kâğıdın köşesinde tek harf: F.',
            },
          ],
        },
        sonra: {
          soz: 'Saltiel defterin kapağını okşuyor. Emine\'nin ailesi rıhtımda, diyor. Ama Hafız Efendi\'nin evine önce sen git; oraya Niğde\'den bir aile yerleşti. Kadın, Despina, bana bir kâğıt bulduğunu söyledi; Arap harfleriyle. Okuyamamış.',
          secenekler: [{ etiket: 'Sağ ol Saltiel Efendi.' }],
        },
      },
    },
    neslihan26: {
      ad: 'Neslihan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            delilVar(d, 'zarf')
              ? 'Neslihan sayfayı bir kez daha okuyor; dudakları kıpırdıyor. Adları ezberliyor, diye düşünüyorsun. Sonra anlıyorsun: dua ediyor.'
              : 'Neslihan pencereden denize bakıyor. On İki\'de bu kente bir arabayla geldim, diyor. Şimdi bir vapurla. Çocukken her şeyin ilk kez olduğunu sanırdım. Meğer her şey iki kez oluyormuş.',
          secenekler: [{ etiket: 'Buradayım.' }],
        },
      },
    },
    cemil26k: {
      ad: 'Cemil Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Cemil Bey Rebeka Hanım\'ın nabzını sayıyor; yaşlı kadın gülüyor, bırakmıyor. Kalbi benimkinden sağlam, diyor Cemil Bey. Bu kentte herkesin kalbi benimkinden sağlam.',
          secenekler: [{ etiket: 'Hadi Cemil Bey.' }],
        },
      },
    },
    despina: {
      ad: 'Despina',
      giris: (d) => (delilVar(d, 'hafiz_notu') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: [
            'Kapıyı başörtülü, yorgun yüzlü bir kadın açıyor; kucağında bir bebek. Türkçe konuşuyor; Kapadokya ağzıyla. Niğde\'den geldik, diyor. Üç hafta oldu. Rumcayı burada öğreniyoruz; çocuklar benden hızlı.',
            'Bu evin efendisi ölmüş, diyor. Bize bıraktığı tek şey bir halı, bir mangal ve şu. Duvarın içinden, bir taşın arkasından iki kâğıt çıkarıyor. Biri Arap harfleriyle. Öbürü yeni bir zarf; İstanbullu bir bey getirdi, kıza verin dedi. Kızı bulamadım.',
          ],
          secenekler: [
            {
              etiket: 'İkisini de alabilir miyim? Kıza ben götürürüm.',
              etki: { delil: ['hafiz_notu', 'kenan_mektubu'] },
              sonra: 'sonra',
              cevap: 'Despina kâğıtları uzatıyor. Kıza söyleyin, diyor: evini temiz tutacağım. Benimkini de birinin temiz tuttuğunu düşünmek istiyorum.',
            },
          ],
        },
        sonra: {
          soz: 'Despina bebeği sallıyor. Kızı bulursanız selamımı söyleyin, diyor. Niğde\'deki evimin anahtarı hâlâ cebimde. Belki o da Hafız Efendi\'nin anahtarını taşıyordur.',
          secenekler: [{ etiket: 'Söylerim.' }],
        },
      },
    },
    emine: {
      ad: 'Emine',
      kosul: (d) => cikarimVar(d, 'zarf_yeri') && !delilVar(d, 'zarf'),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) => [
            'On dokuz yaşlarında bir kız, kırmızı bir sandığın üstünde oturuyor; yanında annesi, iki küçük kardeş. Seni görünce ayağa kalkıyor.',
            emineKusku(d)
              ? 'Emine kollarını kavuşturmuş. Size inanmak istiyorum, diyor. Ama dedemin sözünü siz değil, o söylemeli; onun adına bırakıldıysa.'
              : 'Dedem öldü, diyor. Ölmeden bir şey söyledi: Zarfı gerçek adıyla isteyene ver. İki gün önce bir bey geldi; adını söyledi, dedemin söylediği ad değildi. Kimin adına istiyorsunuz?',
            bayrak(d, 'emineSuphe') ? '' : 'Neslihan arkanda duruyor; sessiz.',
          ].filter(Boolean),
          secenekler: [
            {
              etiket: 'Madam Neslihan Rivière adına.',
              kosul: (d) => !emineKusku(d) && !bayrak(d, 'yanlis_riviere'),
              etki: { artir: { emineSuphe: 1 }, bayrak: { yanlis_riviere: true } },
              sonra: 'ilk',
              cevap: 'Emine\'nin yüzü kapanıyor. O beyin söylediği ad da buydu, diyor. Dedem dedi ki: o ad onun değil; onu alanların.',
            },
            {
              etiket: 'Kırk yedi numaralı sayfa için geldik.',
              kosul: (d) => !emineKusku(d) && !bayrak(d, 'yanlis_sayfa'),
              etki: { artir: { emineSuphe: 1 }, bayrak: { yanlis_sayfa: true } },
              sonra: 'ilk',
              cevap: 'Emine başını sallıyor. Dedem sayfa demedi, diyor. Ad dedi.',
            },
            {
              etiket: 'Kalaycı İsmail Usta\'nın kızı Neslihan adına.',
              kosul: (d) => !emineKusku(d),
              etki: { sahne: 'zarf_teslim', bayrak: { emineAd: 'arif' } },
            },
            {
              etiket: 'Neslihan kendisi söylesin.',
              sonra: 'neslihan_ad',
            },
          ],
        },
        neslihan_ad: {
          soz: (d) =>
            ({
              baba: 'Neslihan bir adım öne çıkıyor. Neslihan, diyor. İsmail kızı. Manastırlı kalaycının kızı. Nüfusta da öyle yazıyor; Ankara\'da yazdırdım. Emine gülümsüyor: Dedem tam böyle söyledi.',
              iki: 'Neslihan bir an duraksıyor. Neslihan, diyor. İsmail kızı. Bir zaman Rivière\'in kızıydım da; o adı da taşıyorum. Ama buraya kalaycının kızı olarak geldim. Emine bir süre ona bakıyor; sonra başını sallıyor. Dedem iki adınızı da bilirdi. Hangisiyle geldiğinizi sordu sadece.',
            }[bayrak(d, 'neslihanAd')] ||
              'Neslihan uzun süre bir şey söylemiyor. Lozan\'dan beri bir ad arıyordum, diyor sonunda; sesi titriyor. Bu sabaha kadar bulamadım. Kalaycının kızı Neslihan. Bu benim adım. Kendim seçtim. Emine gözlerini siliyor: Dedem tam böyle söyledi.'),
          secenekler: [
            {
              etiket: 'Devam',
              etki: (d) => ({
                sahne: 'zarf_teslim',
                bayrak: { emineAd: 'neslihan', neslihanAdSoyledi: bayrak(d, 'neslihanAd') || 'kendi' },
                artir: { neslihanBag: 1 },
              }),
            },
          ],
        },
      },
    },
    kenan: {
      ad: 'Kır paltolu bey',
      kosul: (d) => !bayrak(d, 'kenanSonu'),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            cikarimVar(d, 'fikri_yasiyor')
              ? 'Kır paltolu adam kalabalığın kenarında, bir fenerin altında. Seni görüyor; başıyla selam veriyor. Bekliyor; senin değil, bir şeyin olmasını.'
              : 'Kalabalığın kenarında kır paltolu, iyi giyimli bir adam. İstanbul Türkçesiyle bir memura bir şey soruyor. Sana bakıp kibarca gülümsüyor. Soğuk bir sabah, diyor. Herkes bir şey arıyor.',
          secenekler: [{ etiket: 'Başınla selam ver.' }],
        },
      },
    },
  },
};
