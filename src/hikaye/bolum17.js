// On yedinci bölüm: "Kağnı". İnebolu'dan Ankara'ya, 8-23 Nisan 1920. Üçüncü kitabın sonu.
// İnebolu'da bir istifçi, Hacı Zihni, Rainer'in eski adamı: Anadolu'ya kaçırılan silahları mahzeninde saklıyor ve
// en çok ödeyene, eşkıyaya bile satıyor. Sandıklar kağnı kafilesiyle Ankara'ya götürülür.
// Yeni oynanış: yolculuk. Her etapta bir yol seçimi; erzak ve yorgunluk.
// Son: 23 Nisan 1920, Ankara. Baba kanatlı kalıbı eritip Nermin'in gazetesine harf döker.
// Arka plan (gerçek): 1920'de İstanbul'dan Anadolu'ya silah ve cephane İnebolu-Kastamonu-Ankara yoluyla, çoğu zaman
// kağnılarla ve köylü kadınların taşımasıyla gönderildi; 23 Nisan 1920'de Ankara'da meclis açıldı. Bunlar yalnızca
// arka plandır; gerçek kişiler kurguya karışmaz. Hacı Zihni, Zeynep Ana ve olaylar KURGUDUR.
import { BOLUM16 } from './bolum16';
import { bayrak, cikarimVar, delilVar, sayi } from '../oyun/motor';

const kanitVar = (d) => delilVar(d, 'kurulus_defteri') || delilVar(d, 'fotograflar');
const babaYanimda = (d) => bayrak(d, 'babaKarar') === 'sakla';

export const BOLUM17 = {
  id: 'bolum17',
  ad: 'On yedinci bölüm: Kağnı',
  baslangic: 'acilis',
  ilkMekan: 'iskele',

  deliller: {
    ...BOLUM16.deliller,
    zihni_baglantisi: { ad: 'Hacı Zihni\'nin Viyana bağlantısı', tarif: 'Hacı Zihni, İnebolu tütün ve zahire tüccarı. 1915\'ten beri her ay Viyana\'dan bir mektup, her mevsim bir havale. Rainer\'in Karadeniz\'deki gözü kulağı.' },
    mahzen_sandiklari: { ad: 'Mahzendeki sandıklar', tarif: 'Tütün deposunun altında, kanatlı mühürlü onlarca sandık: tüfek, cephane. Ankara\'ya gitmesi gereken silahlar. Zihni onları bekletiyor; fiyat artsın diye, ya da en çok ödeyen eşkıyaya satmak için.' },
  },

  cikarimlar: {
    ...BOLUM16.cikarimlar,
    istifci: {
      a: 'zihni_baglantisi',
      b: 'mahzen_sandiklari',
      ad: 'İstifçi',
      metin: 'Rainer düştü ama adamları düşmedi. Hacı Zihni dört yıldır Rainer\'in parasını alıyor; şimdi de Anadolu\'ya giden silahları mahzeninde saklıyor. Ateş ancak odun atılırsa yanar; Zihni odunu satıyor, kim ödüyorsa.',
    },
  },

  olaylar: [
    {
      id: 'zihni',
      kosul: (d) => cikarimVar(d, 'istifci'),
      etki: { mekan: 'carsi17', sahne: 'zihni' },
    },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'On yedinci bölüm bitti.' },
    { kosul: (d) => !bayrak(d, 'mahzenYeri'), metin: 'Kafile yerinde Zeynep Ana\'yla konuş.' },
    { kosul: (d) => !delilVar(d, 'zihni_baglantisi'), metin: 'Hacı Zihni kim? Postaneye bak ya da Neslihan\'a sor.' },
    { kosul: (d) => !delilVar(d, 'mahzen_sandiklari'), metin: 'Gece tütün deposunun mahzenine in.' },
    { kosul: () => true, metin: 'Bulduklarını soruşturma panosunda birleştir.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_inebolu',
      baslik: '8 Nisan 1920, İnebolu',
      paragraflar: (d) => [
        'Karadeniz üç gün boyunca balıkçı motorunu bir ceviz kabuğu gibi salladı. Şimdi İnebolu: dik bir kıyı, iskelesiz bir liman, dalgaların arasından kayıklarla karaya taşınan yükler.',
        'Kumsalda sandıklar, çuvallar, denkler. Hamallar, köylüler, kadınlar. Herkes bir şey taşıyor; herkes Ankara\'ya.',
        'Neslihan yanında. Cemil Bey ve Rıza Bey de. Gülce ve Süleyman İstanbul\'da kaldı: biri damgası, öbürü kayığıyla; birileri orada da lazım.',
        babaYanimda(d)
          ? 'Ve baban. Ohannes\'in mahzeninden çıkıp bu motora bindi. Ben bir kere sustum, dedi; bir kere de saklandım. Yeter.'
          : 'Baban bir ay önce Nermin\'le bu kumsala çıkmış. Şimdi Ankara\'da. Bir mektubu geldi: Nermin bir matbaa buldu; ben de bir ocak.',
        bayrak(d, 'sevkiyatKarar') === 'anadolu'
          ? 'Bir yıl önce Topal Hasan\'ın kayıklarıyla altmış sandık tüfeği buraya göndermiştin. Hasan kumsalda seni bekliyor; yüzü asık. Sandıklar Ankara\'ya varmadı, diyor. Burada bir yerde kayboldu.'
          : 'Kumsalda Rıza Bey\'in eski bir tanıdığı fısıldıyor: İstanbul\'dan gelen silahların bir kısmı Ankara\'ya varmıyor. Burada bir yerde kayboluyor.',
      ],
      secenekler: [{ etiket: 'Karaya çık', etki: { mekan: 'iskele', bayrak: { 'gorüldü_iskele': true, ekip_cemil: true, ekip_riza: true, ekip_nermin: false, erzak: 2 } } }],
    },
    zihni: {
      ortam: 'ortam_inebolu',
      baslik: 'Hacı Zihni',
      paragraflar: (d) => [
        'Tütün deposunun yazıhanesi. Hacı Zihni bir minderde oturmuş, tespih çekiyor; beyaz sakallı, temiz cüppeli, yumuşak sesli. Masada bir Viyana mektubu.',
        'Mektubu masaya koyuyorsun; mahzenin anahtarını yanına. Zihni bir süre ikisine bakıyor. Sonra gülümsüyor.',
        'Ben tüccarım evlat, diyor. Bir sandık tüfek burada otuz lira, Kastamonu\'da elli, dağda yüz. Ben de bekliyorum. Hangi taraf öderse. Viyana\'daki efendi düştü; ama tüfek düşmez.',
        bayrak(d, 'sevkiyatKarar') === 'anadolu'
          ? 'Topal Hasan kapının yanında, yumruklarını sıkıyor. O sandıkları ben kürek çekerek getirdim, diyor sesi titreyerek. Ankara\'ya gitsin diye.'
          : 'Rıza Bey kapının yanında, kollarını kavuşturmuş. Kırk yıl istifçi gördüm, diyor. Hepsi aynı şeyi söyler: Ben tüccarım.',
        'Kumsalda bir kağnı kafilesi bekliyor. Zeynep Ana\'nın kafilesi. Yarın sabah yola çıkacak; cephanesiz.',
      ],
      secenekler: [
        { etiket: 'Sandıkları kafileye ver. Zihni\'yi Kastamonu\'daki komutanlığa teslim edin.', etki: { bayrak: { zihniSonu: 'teslim' } }, sonra: 'kafile_baslangic' },
        { etiket: 'Sandıkları kafileye ver. Zihni de kafileyle yürüsün; kendi sırtında.', etki: { bayrak: { zihniSonu: 'kafile' } }, sonra: 'kafile_baslangic' },
      ],
    },
    kafile_baslangic: {
      ortam: 'ortam_kagni',
      baslik: '10 Nisan, şafak',
      paragraflar: (d) => [
        'Yirmi kağnı. Kırk öküz. Altmış insan; yarısı kadın. Sandıklar kağnılara, çuvallara, sırtlara yükleniyor. Tekerlekler yağlanmamış; gıcırtıları vadiyi dolduruyor. Kağnının sesi kimseyi uyutmaz, diyor Zeynep Ana. Ama kimse de bizi gizlice yakalayamaz.',
        bayrak(d, 'zihniSonu') === 'kafile'
          ? 'Hacı Zihni de kafilede; cüppesini çıkarmış, sırtında bir cephane sandığı. Kimse onunla konuşmuyor. O da kimseyle konuşmuyor.'
          : 'Hacı Zihni iki jandarmanın arasında Kastamonu yoluna çıkarılıyor; sizden önce.',
        'İnebolu\'dan Ankara\'ya on üç gün. Küre ormanları, Kastamonu, Ilgaz dağı, Çankırı. Nisan; ama dağda hâlâ kar var.',
        'Zeynep Ana önden yürüyor. Erzak az, diyor. İki çuval un, bir tulum peynir. Yolu iyi seçerseniz yeter.',
      ],
      secenekler: [{ etiket: 'Yola çık', sonra: 'hatice17' }],
    },
    // Birinci bölümdeki yarım mektubun karşılığı: Sabri'nin kız kardeşi kafilede.
    hatice17: {
      ortam: 'ortam_kagni',
      baslik: 'Trabzonlu kadın',
      paragraflar: (d) => [
        'İlk molada bir kadın kağnının yanında sana su uzatıyor. Otuzunda var yok; başörtüsü sıkı bağlanmış, elleri kınalı, gözleri yorgun. Ağzı Karadeniz ağzı.',
        'Nerelisin bacım, diye soruyorsun. Trabzon, diyor. Kocam İnebolu\'dan; sandal işler. Kocam da kafilede, arkada. Bir abim vardı; vapurlarda ateşçiydi. İstanbul\'da öldü, iki yıl önce. Adı Sabri.',
        'Su kabı elinde donup kalıyor.',
        bayrak(d, 'haticeSozu')
          ? 'Göğüs cebindeki kâğıdı on altı aydır taşıyorsun. Kenarları yumuşamış, katları aşınmış. Sabri\'nin iri, okul görmemiş harfleri. Hatice kardeşim.'
          : 'Sabri\'nin yarım mektubunu hatırlıyorsun. Hatice kardeşim. Kâğıt delillerin arasında kaldı; şimdi kim bilir nerede.',
      ],
      secenekler: [
        {
          etiket: 'Mektubu ver. Sonuna kadar oku; sonra her şeyi anlat.',
          kosul: (d) => bayrak(d, 'haticeSozu'),
          etki: (d) => ({ bayrak: { haticeSonu: 'mektup' }, artir: { travma: sayi(d, 'travma') > 0 ? -1 : 0 } }),
          sonra: 'hatice17_mektup',
        },
        {
          etiket: 'Doğrusunu söyle: abin boğulmadı. Gördüğü bir şey yüzünden öldürüldü.',
          etki: { bayrak: { haticeSonu: 'dogru' } },
          sonra: 'hatice17_dogru',
        },
        {
          etiket: 'Bir şey söyleme. Abisinin iyi bir adam olduğunu söyle, yalnızca.',
          etki: { bayrak: { haticeSonu: 'sessiz' }, artir: { travma: 1 } },
          sonra: 'hatice17_sessiz',
        },
      ],
    },
    hatice17_mektup: {
      ortam: 'ortam_kagni',
      baslik: 'Hatice kardeşim',
      paragraflar: [
        'Kâğıdı açıyor. Okuması yavaş; parmağıyla satırları izliyor. Dudakları kıpırdıyor. Sana bu ay para yollayamadım, kusura bakma.',
        'Tüfekler. Deri çanta. Allah affetsin. Eğer bana bir şey olur. Satırın bittiği yerde parmağı duruyor.',
        'Sana bakıyor. Bitirsene, diyor. Eğer bana bir şey olursa ne?',
        'Ona her şeyi anlatıyorsun. Leventis\'i, kırk sandığı, kayıkhaneyi, Süleyman Kaptan\'ı, Gureba Mezarlığı\'nı, servilerin arasındaki taşı. Sabri\'nin aldığı kâğıtların sonunda nereye gittiğini: Viyana\'ya, Zürih\'e, bir genel kurula, bir matbaaya. Sabri\'nin bir çantadan aldığı üç kâğıdın, bir örgütü yıktığını.',
        'Hatice uzun süre susuyor. Sonra mektubu katlıyor, göğsüne koyuyor; senin taşıdığın yere. Abim hep, ben bir şey bilmem bacım, derdi, diyor. Kazanın sesinden başka bir şey bilmem. Bilirmiş.',
        'O gün kafilede en ağır sandığı Hatice taşıyor. Kimse ona yardım etmeye cesaret edemiyor.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'etap_kure' }],
    },
    hatice17_dogru: {
      ortam: 'ortam_kagni',
      baslik: 'Hatice',
      paragraflar: [
        'Hatice\'nin elindeki su kabı titriyor. Sarhoştu dediler, diyor. Bir polis yazdı; ağzına içki koymayan adama sarhoş dediler.',
        'Ona anlatıyorsun. Bileklerdeki izi, ağızdaki köpüğün yokluğunu, tırnaklardaki kırmızı mumu. Sabri\'nin bir sandığın içinde ne gördüğünü.',
        'Yazdı mı bana bir şey, diye soruyor. Bir mektup başlamış, diyorsun. Bitirememiş. Kâğıt şimdi nerede, bilmiyorum.',
        'Hatice başını sallıyor. Yarım kalan mektubu ben bitiririm, diyor. Her gece. Kırk yıl.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'etap_kure' }],
    },
    hatice17_sessiz: {
      ortam: 'ortam_kagni',
      baslik: 'Hatice',
      paragraflar: [
        'Abin iyi bir adamdı, diyorsun. Onu tanırdım. İyi bir ateşçiydi; kazanın sesinden derdini anlardı.',
        'Hatice gülümsüyor. Süleyman Kaptan da öyle yazmıştı, diyor. Kazanın sesinden derdini anlardı. Sen de onu mu tanıyorsun?',
        'Evet, diyorsun. Başka bir şey demiyorsun. Hatice kağnısına dönüyor. Sırtında kalan cümleleri sen taşıyorsun; on üç gün boyunca.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'etap_kure' }],
    },
    etap_kure: {
      ortam: 'ortam_kagni',
      baslik: 'Küre ormanları',
      paragraflar: [
        'Üçüncü gün. Çam ormanları, sisli vadiler. Bir çoban haber getiriyor: ormandaki kısa yolda bir eşkıya çetesi; geçenlerin yükünü alıyorlar. Vadiden dolaşmak iki gün daha sürer.',
        'Zeynep Ana sana bakıyor. Sen söyle, diyor. Un iki gün daha dayanmaz.',
      ],
      secenekler: [
        { etiket: 'Orman yolu. Kısa ama tehlikeli.', etki: { bayrak: { etap1: 'orman' } }, sonra: 'etap_kure_sonuc' },
        { etiket: 'Vadi yolu. Uzun ama güvenli.', etki: { bayrak: { etap1: 'vadi' }, artir: { erzak: -1 } }, sonra: 'etap_kure_sonuc' },
      ],
    },
    etap_kure_sonuc: {
      ortam: 'ortam_kagni',
      baslik: 'Orman',
      paragraflar: (d) =>
        bayrak(d, 'etap1') === 'vadi'
          ? ['Vadi yolu iki gün sürüyor. Un azalıyor; kadınlar paylarını çocuklara veriyor. Ama kimse bir şey kaybetmiyor.']
          : bayrak(d, 'zihniSonu') === 'kafile'
            ? [
                'Ormanın ortasında yol kesiliyor. On kadar silahlı adam. Başlarındaki kır sakallı adam kağnılara bakıyor; sonra kafilenin içindeki Zihni\'yi görüyor.',
                'Hacı Zihni sandığını yere bırakıp öne çıkıyor. Bu kafileye dokunmayacaksın, Kara Osman, diyor. Yoksa geçen kış sana sattığım tüfeklerin parasını kimden aldığımı herkes öğrenir.',
                'Eşkıya bir an duruyor; sonra yolu açıyor. Zihni sandığını yeniden sırtlanıyor. Kimseye bakmadan yürüyor. Ama Zeynep Ana o akşam ona bir kâse çorba uzatıyor.',
              ]
            : [
                'Ormanın ortasında yol kesiliyor. On kadar silahlı adam. Rıza Bey öne çıkıyor; sesi bir komiserin sesi. Ama bu dağ İstanbul değil.',
                'Bir silah patlıyor. Kağnılar dağılıyor, öküzler böğürüyor. Cemil Bey yere yatan bir kızı sürüklüyor. Sonunda çete iki çuval unu alıp ormana çekiliyor; sandıklara dokunmuyorlar, ağırlar.',
                'Kimse ölmedi. Ama un da yok artık.',
              ],
      secenekler: [
        {
          etiket: 'Devam',
          etki: (d) =>
            bayrak(d, 'etap1') === 'orman' && bayrak(d, 'zihniSonu') !== 'kafile'
              ? { artir: { erzak: -2, yorgunluk: 1 } }
              : {},
          sonra: 'etap_ilgaz',
        },
      ],
    },
    etap_ilgaz: {
      ortam: 'ortam_kagni',
      baslik: 'Ilgaz geçidi',
      paragraflar: (d) => [
        'Dokuzuncu gün. Ilgaz dağı. Nisan ortası ama geçitte diz boyu kar. Öküzler kaymaya başlıyor; bir kağnının tekerleği kırılıyor.',
        sayi(d, 'erzak') <= 0 ? 'Erzak bitti. Çocuklar ağlamıyor artık; ağlamak da yorar.' : 'Son çuvalın dibi görünüyor.',
        'Geçidin dibinde bir han var. Bir gece beklersek kar durur, diyor Zeynep Ana. Ama hancının ekmeğini parayla alırız; paramız da yok. Ya da gece geçeriz; ay var.',
        babaYanimda(d) ? 'Baban kırık tekerleğin başında; elinde Yusuf\'un kalay takımı. Bir demirci olmasam da, diyor, bir çember yaparım.' : 'Cemil Bey bir çocuğun donmuş ayaklarını ovuyor.',
      ],
      secenekler: [
        { etiket: 'Gece geç. Ay ışığında.', etki: { bayrak: { etap2: 'gece' }, artir: { yorgunluk: 1 } }, sonra: 'ilgaz_ates' },
        { etiket: 'Handa bekle. Neslihan\'ın son altınlarıyla ekmek al.', etki: { bayrak: { etap2: 'han' }, artir: { erzak: 1 } }, sonra: 'ilgaz_ates' },
      ],
    },
    // Derinleştirme: Viyana'da söylenmeyen cümle (kardesGecesi yalan / sessiz) burada söylenebilir.
    ilgaz_ates: {
      ortam: 'ortam_kagni',
      ortamOran: 0.5,
      baslik: 'Ateşin başında',
      paragraflar: (d) => {
        const bekleyen = ['yalan', 'sessiz'].includes(bayrak(d, 'kardesGecesi'));
        return [
          bayrak(d, 'etap2') === 'gece'
            ? 'Geçidin ortasında, bir kayanın dibinde yarım saatlik bir mola. Kafile bir ateş yakıyor; dal yaş, duman çok.'
            : 'Hanın avlusunda bir ateş. Kafile uyuyor; öküzler ahırda soluyor.',
          'Neslihan ateşin karşısında, dizlerini kucaklamış. Yüzünde alevin ışığı. Ellerini ateşe uzatıyor; parmakları Viyana\'daki gibi buz.',
          bekleyen
            ? 'Bir şey söylemiyor. Ama gözü bir an sol kulağında duruyor. Viyana\'daki gece aranızda hâlâ oturuyor; söylenmemiş cümle, üçüncü bir yolcu gibi, kafileyle birlikte yürüyor.'
            : 'Annemin ayva reçeli, diyor birden. Hatırlıyor musun abi? Kavanozu sen kırmıştın, beni suçlamıştın. Gülüyor. Altı yıl sonra ilk kez, bir anıyı korkmadan anlatıyor.',
        ];
      },
      secenekler: [
        {
          etiket: 'Neslihan. Viyana\'da sana doğruyu söylemedim. Ben seni hiç aramadım.',
          kosul: (d) => ['yalan', 'sessiz'].includes(bayrak(d, 'kardesGecesi')),
          etki: (d) => ({ bayrak: { kardesGecesi: 'sonra_durust', kardesOnceki: bayrak(d, 'kardesGecesi') }, artir: { neslihanBag: 1 } }),
          sonra: 'ilgaz_itiraf',
        },
        {
          etiket: 'Bir şey söyleme. Ateşe bir dal daha at.',
          kosul: (d) => ['yalan', 'sessiz'].includes(bayrak(d, 'kardesGecesi')),
          sonra: 'etap_cankiri',
        },
        {
          etiket: 'Kavanozu sen kırdın. Ben seni korudum.',
          kosul: (d) => !['yalan', 'sessiz'].includes(bayrak(d, 'kardesGecesi')),
          sonra: 'etap_cankiri',
        },
      ],
    },
    ilgaz_itiraf: {
      ortam: 'ortam_kagni',
      ortamOran: 0.5,
      baslik: 'Ilgaz',
      paragraflar: (d) => [
        'Neslihan bir süre ateşe bakıyor. Sonra başını kaldırıyor.',
        bayrak(d, 'kardesOnceki') === 'yalan'
          ? 'Biliyordum, diyor. Kulağın kızarmıştı. Bir buçuk yıldır kulağını bekliyorum abi. Bugün kızarmadı.'
          : 'Biliyordum, diyor. Sustuğunda bildim. Ama senden duymak istedim. Bir buçuk yıl bekledim.',
        'Ben de seni aramadım, diyor. Ölü listelerinde aradım; bu aramak değil. Bulamamak için aradım. Belki ikimiz de aynı şeyden korktuk: bulursak bir şey kalmamış olmasından.',
        'Ateşin üstünden elini uzatıyor. Tutuyorsun. Buz gibi; sonra ısınıyor.',
        'Artık ararız, diyor. Babamızı bulduk. Birbirimizi bulduk. Bir şey kalmış abi. Az, ama kalmış.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'etap_cankiri' }],
    },
    etap_cankiri: {
      ortam: 'ortam_kagni',
      baslik: 'Çankırı yolu',
      paragraflar: (d) => {
        const zor = sayi(d, 'erzak') <= 0 || sayi(d, 'yorgunluk') >= 2;
        return [
          bayrak(d, 'etap2') === 'gece'
            ? 'Ay ışığında geçit. Kar gümüş gibi. Kimse konuşmuyor; yalnızca tekerleklerin gıcırtısı ve öküzlerin soluğu. Sabaha karşı geçidin öbür yüzündesiniz.'
            : 'Handa bir gece. Neslihan Rivière\'den kalan son iki altını hancıya veriyor. Gaston\'un parası, diyor. İlk kez doğru bir şeye harcanıyor.',
          zor
            ? 'Çankırı\'ya vardığınızda kafile perişan. Yürüyemeyenler kağnılarda, sandıkların üstünde. Ama tek bir sandık eksik değil.'
            : 'Çankırı\'ya vardığınızda kafile yorgun ama ayakta. Bir köyde kadınlar ayran ve ekmekle karşılıyor. Tek bir sandık eksik değil.',
          'Zeynep Ana Ankara\'nın tepesindeki kaleyi gösteriyor. Üç gün daha, diyor.',
        ];
      },
      secenekler: [{ etiket: 'Devam', etki: (d) => ({ bayrak: { kafileSonu: sayi(d, 'erzak') <= 0 || sayi(d, 'yorgunluk') >= 2 ? 'perisan' : 'saglam' } }), sonra: 'ankara' }],
    },
    ankara: {
      ortam: 'ortam_kagni',
      ortamOran: 0.5,
      baslik: '23 Nisan 1920, Ankara',
      paragraflar: (d) => [
        'Ankara: kalenin eteklerinde toprak damlı evler, dar sokaklar, bir istasyon. Bugün sokaklar kalabalık. Hacı Bayram\'da cuma namazından sonra meclis açılıyor, diyorlar. Kimse tam olarak ne olacağını bilmiyor; ama herkes orada olmak istiyor.',
        'Kağnılar istasyonun yanındaki ambarlara yanaşıyor. Sandıklar birer birer indiriliyor. Zeynep Ana boşalan kağnısının başında duruyor; ilk kez oturuyor.',
        bayrak(d, 'zihniSonu') === 'kafile'
          ? 'Hacı Zihni sırtındaki sandığı ambara bırakıyor. Doğruluyor. On üç gün, diyor kendi kendine. Kırk yıl ticaret yaptım; ilk kez bir şeyi bedavaya taşıdım. Ve kalabalığın içinde kayboluyor.'
          : 'Kastamonu\'dan bir haber: Hacı Zihni\'yi komutanlık sorgulamış; mahzenindeki sandıkların defteri çıkmış. Rainer\'in Karadeniz\'deki son adamı.',
        'Taşhan\'ın önünde Nermin. Mürekkepli elleri, yorgun, gülümseyen yüzü. Geldiniz, diyor. Biliyordum.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'harf' }],
    },
    harf: {
      ortam: 'ortam_han',
      efekt: ['dokum'],
      baslik: 'Harf',
      paragraflar: (d) => [
        'Taşhan\'ın arkasında, bir avluda, Nermin\'in matbaası: eski bir el baskı makinesi, iki kasa harf. Harfler eksik, diyor Nermin. Ç yok, ğ yok, ş üç tane.',
        'Ve avlunun köşesinde, küçük bir ocak. Baban. ' + (babaYanimda(d) ? 'Seninle on üç gün yürüyüp gelen baban.' : 'Bir aydır seni bekleyen baban.') + ' Yanında Yusuf\'un kalay takımı.',
        bayrak(d, 'kalipKayip')
          ? 'Kanatlı kalıp Kız Kulesi\'nin dibinde, denizde. Baban gülümsüyor. Kalıba gerek yok, diyor. Kalıbı yapan el burada. Bir parça kurşun, bir parça kalay; avucunda yeni bir kalıp şekillendiriyor: Ç.'
          : 'Baban takımın içinden kanatlı kalıbı çıkarıyor. On iki yıl önce Rivière için döktüğü kalıp. Uzun süre avucunda tutuyor. Sonra ocağa atıyor.',
        'Kalıp eriyor. Kanat, anahtar, 1908; hepsi gri bir sıvı olup potanın dibine akıyor.',
        'Baban o sıvıdan harf döküyor. Ç. Ğ. Ş. Ş. Ş. Bir sabah boyu. Her dökümde çekiçle kenarına vuruyor: tak, tak-tak, tak.',
        'Bu kalıpla zehir döktüm, diyor sonunda; sana değil, harflere. Şimdi bir gazete dökeyim.',
        'Nermin harfleri kasaya diziyor. İlk sayfanın ilk satırı: Ankara, 23 Nisan 1920.',
        'Neslihan babanın omzuna başını koyuyor. Cemil Bey gözlüğünü siliyor; bu sefer gözlük değil sildiği. Rıza Bey bıyığını sıvazlıyor; bir şey söylemiyor.',
        'Sen avlunun kapısında duruyorsun. Karaköy rıhtımında, Aralık 1918\'de, sudan bir ceset çıkmıştı. Sabri. Bir ateşçi. Bir belge. Bir kanatlı anahtar.',
        'Şimdi kanatlı anahtar bir harf oldu.',
        'On yedinci bölümün sonu. Üçüncü kitabın sonu.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true, kalipEridi: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_kagni',
      ortamOran: 0.4,
      baslik: 'On yedinci bölüm bitti',
      paragraflar: ['Üç kitap: Sudaki Adam\'dan Kağnı\'ya. Sıradaki: dördüncü kitap, savaş yılları. Kararların kaydedildi.'],
      secenekler: [{ etiket: 'On sekizinci bölüme geç', sonrakiBolum: 'bolum18' }, { etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    iskele: {
      ad: 'İnebolu kumsalı',
      ortam: 'ortam_inebolu',
      tarif: 'İskelesiz bir liman. Dalgalar kumsala vuruyor; kayıklar yükleri kıyıya atıyor. Hamallar, köylüler, kadınlar. Tepede tütün depoları, kahveler, bir postane.',
      nesneler: [],
      kisiler: ['neslihan', 'cemil', 'riza', 'hasan17', 'baba17'],
      gecisler: [
        { hedef: 'carsi17', etiket: 'Çarşıya çık' },
        { hedef: 'kafile', etiket: 'Kafile yerine git' },
      ],
    },
    carsi17: {
      ad: 'İnebolu çarşısı',
      ortam: 'ortam_inebolu',
      tarif: 'Dik bir yokuş, ahşap dükkânlar, tütün depoları. En büyük depo Hacı Zihni\'nin; kapısında iki bekçi. Köşede küçük bir postane.',
      nesneler: [
        {
          id: 'postane',
          etiket: 'Postane',
          incele: (d) =>
            delilVar(d, 'zihni_baglantisi')
              ? 'Postacı sana başını sallıyor; bir şey söylemiyor.'
              : 'Yaşlı postacı Rıza Bey\'in eski kimlik kartına uzun uzun bakıyor. Sonra sesini alçaltıyor. Hacı Zihni\'ye her ay Viyana\'dan bir mektup gelir, diyor. Dört yıldır. Her mevsim de bir havale. Ben bir şey demedim. Bir zarfı gösteriyor: Bankhaus Rainer und Söhne, Wien.',
          etki: (d) => (delilVar(d, 'zihni_baglantisi') ? null : { delil: ['zihni_baglantisi'] }),
        },
        {
          id: 'depo17',
          etiket: 'Hacı Zihni\'nin tütün deposu',
          incele: 'Büyük, taş bir depo. Kapıda iki bekçi. İçeriden tütün kokusu; ama kapıdan çıkan kağnılar tütün taşımıyor gibi ağır.',
        },
      ],
      kisiler: [],
      gecisler: [
        { hedef: 'mahzen', etiket: 'Gece depo mahzenine in', kosul: (d) => bayrak(d, 'mahzenYeri') && !delilVar(d, 'mahzen_sandiklari') },
        { hedef: 'iskele', etiket: 'Kumsala in' },
      ],
    },
    mahzen: {
      ad: 'Depo mahzeni',
      ortam: 'ortam_depo',
      tarif: 'Gece. Tütün balyalarının arkasında bir kapak, taş bir merdiven, nemli bir mahzen. Fenerin ışığında sıra sıra sandık.',
      nesneler: [
        {
          id: 'sandiklar17',
          etiket: 'Sandıklar',
          incele: (d) =>
            bayrak(d, 'sevkiyatKarar') === 'anadolu'
              ? 'Sandıkların kurşun mühürlerine bakıyorsun. Kanatlı anahtar; ve kanadın ucunda çentikler. Tak, tak-tak, tak. Babanın sahte mühürleri. Bir yıl önce Topal Hasan\'ın kayıklarıyla gönderdiğin altmış sandık. Ankara\'ya hiç gitmemişler.'
              : 'Sandıkların kurşun mühürlerinde kanatlı anahtar. Rainer\'in eski sevkiyatları; İstanbul\'dan, İzmir\'den, Trieste\'den. Hepsi burada, karanlıkta, fiyat artsın diye bekliyor.',
          etki: (d) => (delilVar(d, 'mahzen_sandiklari') ? null : { delil: ['mahzen_sandiklari'] }),
        },
      ],
      kisiler: [],
      gecisler: [{ hedef: 'carsi17', etiket: 'Çarşıya çık' }],
    },
    kafile: {
      ad: 'Kafile yeri',
      ortam: 'ortam_kagni',
      tarif: 'Kasabanın dışında bir çayır. Kağnılar, öküzler, çuvallar. Kadınlar ekmek pişiriyor, erkekler tekerlek onarıyor. Kafilenin başında, yaşlı, dimdik bir kadın: Zeynep Ana.',
      nesneler: [],
      kisiler: ['zeynep'],
      gecisler: [{ hedef: 'iskele', etiket: 'Kumsala dön' }],
    },
  },

  kisiler: {
    zeynep: {
      ad: 'Zeynep Ana',
      giris: (d) => (bayrak(d, 'mahzenYeri') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Zeynep Ana yazmasını düzeltiyor; elleri hamurlu. Üç oğlumu Çanakkale\'de verdim, diyor. Dördüncüsü Ankara\'da. Bu kağnılar boş gidemez evlat. Ama cephane yok. Hacı Zihni\'nin deposunda var; altınla satıyor. Bizim altınımız yok.',
          secenekler: [
            {
              etiket: 'Zihni silahları nerede saklıyor?',
              etki: { bayrak: { mahzenYeri: true } },
              sonra: 'sonra',
              cevap: 'Zeynep Ana sesini alçaltıyor. Tütün deposunun altında bir mahzen var, diyor. Gelinim orada temizlik yapardı. Balyaların arkasında bir kapak. Gece bekçiler kahvede kâğıt oynar.',
            },
          ],
        },
        sonra: {
          soz: 'Zeynep Ana kağnıların tekerleklerini sayıyor. Yarın sabah yola çıkacağız, diyor. Cephaneli ya da cephanesiz.',
          secenekler: [{ etiket: 'Cephaneli olacak.' }],
        },
      },
    },
    hasan17: {
      ad: 'Topal Hasan',
      kosul: (d) => bayrak(d, 'sevkiyatKarar') === 'anadolu',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Topal Hasan kumsalda, yükleri taşıyan hamalların arasında. Altmış sandığı ben getirdim, diyor. Burada bir tüccara teslim ettim; Ankara\'ya kağnıyla gönderecekti. Gitmemiş. Adı Hacı Zihni.',
          secenekler: [{ etiket: 'Bulacağız Hasan.' }],
        },
      },
    },
    baba17: {
      ad: 'İsmail Usta',
      kosul: (d) => babaYanimda(d),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Baban kumsala oturmuş, denize bakıyor. Manastır\'dan çıktığımda deniz görmemiştim, diyor. Şimdi her yer deniz. Ama bu deniz bir yere götürüyor.',
          secenekler: [{ etiket: 'Ankara\'ya baba.' }],
        },
      },
    },
    neslihan: {
      ad: 'Neslihan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Neslihan kumsalda yük taşıyan kadınlara bakıyor. Viyana\'da opera locasında otururdum, diyor. Şimdi burada bir kadın sırtında bir cephane sandığı taşıyor; benden genç.',
          secenekler: [
            {
              etiket: 'Kırmızı sayfalarda İnebolu var mı?',
              kosul: (d) => kanitVar(d) && !delilVar(d, 'zihni_baglantisi'),
              etki: { delil: ['zihni_baglantisi'] },
              sonra: 'ilk',
              cevap: 'Neslihan ezberinden sayıyor. İnebolu, diyor. H. Z. 1915\'ten beri, her mevsim. Karadeniz kıyısındaki bütün sevkiyatların aracısı. Bir tüccar. Adı Hacı Zihni olmalı.',
            },
            { etiket: 'Hadi.' },
          ],
        },
      },
    },
    cemil: {
      ad: 'Cemil Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Cemil Bey çantasını omzuna alıyor. On üç gün, diyor. Kar, çamur, açlık. Bir doktor bu yolda bir orduya bedeldir; bir doktor çantası iki orduya.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
    riza: {
      ad: 'Rıza Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Rıza Bey eski kimlik kartını çıkarıyor; Emniyet-i Umumiye, 1879. Burada hâlâ bir anlamı var mı bilmem, diyor. Ama postacılar eski kâğıtlara hep saygı duyar.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
  },
};
