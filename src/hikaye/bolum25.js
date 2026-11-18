// Yirmi beşinci bölüm: "Kırmızı Sayfalar". Zürih, 30 Kasım - 1 Aralık 1923. Dördüncü kitabın sonu.
// Kurgu: Albert Vollmer kuruluş defterinin aslını (14. bölümde ekildi) kapalı bir mezatta satıyor. Alıcılar adı verilmeyen
// temsilciler; hiçbir gerçek kişi, hiçbir devletin gerçek bir görevlisi kurguya karışmaz. Mezat ve noter KURGUDUR.
// Yeni oynanış: itiraz kartları. Mezat üç tur sürer; her turda elindeki bir kanıtı notere sunabilirsin. Kartlar önceki
// bölümlerdeki seçimlerden gelir; değeri toplamı ITIRAZ_ESIGI'ne ulaşırsa noter satışı durdurur.
// Karşılık verilen iplikler: gublerSonu, mektupKarar, vollmerSonu, neslihanAd, cemilRapor, rizaSon22, cocukKarar.
// Yeni iplikler: cemilDefter, defterSonu, sayfa47.
import { BOLUM24 } from './bolum24';
import { bayrak, sayi } from '../oyun/motor';

export const TUR_SAYISI = 3;
export const ITIRAZ_ESIGI = 3;

// Kartlar: kimlik, etiket, değer, ne zaman elde.
export const KARTLAR = {
  mektup: { etiket: 'Rivière\'in mektubu: Banque Vollmer\'in 1912 ödemesi', deger: 1, var: (d) => ['sakla', 'baba'].includes(bayrak(d, 'mektupKarar')) },
  gubler: { etiket: 'Gubler\'in İstanbul polisine verdiği ifade', deger: 1, var: (d) => bayrak(d, 'gublerSonu') === 'teslim' },
  kurye: { etiket: 'Galata\'da ele geçen ödeme sayfaları', deger: 1, var: (d) => bayrak(d, 'vollmerSonu') === 'kurye' },
  damga: { etiket: 'Geçersiz feragatname: Neslihan hâlâ Rivière\'in mirasçısı', deger: 2, var: (d) => bayrak(d, 'vollmerSonu') === 'damga' },
  klara: { etiket: 'Klara Rainer\'in ihtiyati tedbir dilekçesi', deger: 2, var: (d) => !!bayrak(d, 'klaraYardim') },
  negatif: { etiket: 'Kessler\'deki negatifler: defterin içeriği zaten belgelenmiş', deger: 1, var: (d) => bayrak(d, 'defter14') === 'kopya' },
  hisse: { etiket: 'Neslihan\'ın Bankhaus Rainer hissesi: kurucu mirası', deger: 1, var: (d) => bayrak(d, 'hisseKarar') === 'genelkurul' },
};

export const itirazToplami = (d) => sayi(d, 'itiraz');

const kartEtki = (id) => ({ artir: { itiraz: KARTLAR[id].deger, tur: 1 }, bayrak: { ['kart_' + id]: true } });

export const BOLUM25 = {
  id: 'bolum25',
  ad: 'Yirmi beşinci bölüm: Kırmızı Sayfalar',
  baslangic: 'acilis',
  ilkMekan: 'zurih25',

  deliller: { ...BOLUM24.deliller },
  cikarimlar: { ...BOLUM24.cikarimlar },

  olaylar: [{ id: 'tokmak', kosul: (d) => sayi(d, 'tur') >= TUR_SAYISI, etki: { sahne: 'tokmak25' } }],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Yirmi beşinci bölüm bitti. Dördüncü kitabın sonu.' },
    { kosul: (d) => !bayrak(d, 'onizlemeBitti'), metin: 'Mezattan önce defterin önizlemesine bak; Cemil Bey seninle.' },
    {
      kosul: () => true,
      metin: (d) => 'Mezat sürüyor. Tur ' + (sayi(d, 'tur') + 1) + ' / ' + TUR_SAYISI + '. Notere sunulan itiraz: ' + itirazToplami(d) + '. Satışı durdurmak için en az ' + ITIRAZ_ESIGI + '.',
    },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_zurih',
      baslik: '30 Kasım 1923, Zürih',
      paragraflar: (d) => [
        'Zürih\'te yağmur. Bahnhofstrasse\'nin taşları parlıyor. Dört yıl önce bu caddede, Rivière\'in küçük anahtarıyla bir kasaya inmiştiniz. Bugün aynı bankanın kapısında bir davetiye gösteriyorsunuz; Nermin\'in gazetesinin adına, bir muhabir kartıyla.',
        'Banque Vollmer\'in üst katında kapalı bir mezat. Alıcılar adlarını vermiyor: Londra\'dan bir sigorta şirketinin avukatı, Belgrad\'dan, Atina\'dan, Bükreş\'ten, Ankara\'dan gelen gri paltolu temsilciler. Herkes aynı defteri istiyor; her biri başka bir sayfası için.',
        'Ekip yine bir arada. Neslihan, Nermin, Cemil Bey Ankara\'dan. ' +
          (['emekli', 'kirgin'].includes(bayrak(d, 'rizaSon22')) ? 'Rıza Bey yok; ' + (bayrak(d, 'rizaSon22') === 'emekli' ? 'gümüş başlı bastonu senin elinde.' : 'İstanbul\'da kaldı; bir telgraf bile yok.') : 'Rıza Bey de; bastonu kolunda, gözü kapılarda.') +
          (bayrak(d, 'mektupKarar') === 'baba' ? ' Ve baban: Rivière\'in mektubu göğüs cebinde. Kendi elimle koyacağım masaya, dedi; trende hiç uyumadı.' : ''),
        'Mezattan önce alıcılara yarım saatlik bir önizleme veriliyor. Defter bir cam masada; açık. Bir sayfa çevirmek için bir eldiven.',
      ],
      secenekler: [{ etiket: 'Önizlemeye gir', sonra: 'onizleme' }],
    },
    onizleme: {
      ortam: 'ortam_banka',
      baslik: 'Kırmızı sayfalar',
      paragraflar: (d) => [
        'Cemil Bey eldiveni takıyor; sayfaları bir hekimin parmaklarıyla çeviriyor. Selanik, 1908. Viyana, 1911. Selanik, 1912.',
        'Bir sayfada duruyor. Kırmızı mürekkep. Kasım 1912, Selanik. Ödeme: Binbaşı F. E., sağlık dairesi. Karşılığı: Balkan cephesinden gelen cesetlerin kaza olarak kaydı; sandık sevkiyatının soruşturulmaması için.',
        'Cemil Bey\'in parmağı satırın üstünde kalıyor. Sesi çok sakin. Binbaşı Fikri Efendi, diyor. Bana emri o verdi. Kaza yaz, Cemil; savaş zamanı soru sorulmaz. İki yüz ceset. Emir, diye düşünmüştüm. Emir değilmiş. Satın alınmış bir emirmiş.',
        bayrak(d, 'cemilRapor') === 'sitma'
          ? 'Sonra sana bakıyor. Eskişehir\'de Kostas için sıtma yazdım, diyor. Kimse bana para vermedi. Kendim verdim; vicdanımdan.'
          : bayrak(d, 'cemilRapor')
            ? 'Sonra sana bakıyor. Eskişehir\'de Kostas\'ın raporunu yazarken, diyor, bunu bilmiyordum. Bilseydim belki daha kolay yazardım. Belki daha zor.'
            : 'Sonra sana bakıyor.',
        {
          teselli: 'Beş yıl önce, Gureba\'nın morgunda bu adı sana fısıldamıştı. Ona bir defteri göndermenin de bir şey olduğunu söylemiştin. Şimdi o defterin, David Saltiel\'in defterinin, kimin parasıyla susturulmak istendiğini biliyorsunuz.',
          sert: 'Beş yıl önce, Gureba\'nın morgunda bu adı sana fısıldamıştı. İki yüz cesedin bir defterle ödenmeyeceğini söylemiştin. Cemil Bey o günden beri ödüyor.',
          sus: 'Beş yıl önce, Gureba\'nın morgunda bu adı sana fısıldamıştı; sen susmuştun. Şimdi de susuyorsun; ama bu kez elin onun omzunda.',
        }[bayrak(d, 'cemilFikri')] || '',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Emir satın alınmıştı Cemil Bey. Sen bunu bilemezdin.',
          etki: { bayrak: { cemilDefter: 'teselli' } },
          sonra: 'onizleme_son',
        },
        {
          etiket: 'Bilmemek seni temize çıkarmaz. Ama seni onlardan ayırır.',
          etki: { bayrak: { cemilDefter: 'durust' }, artir: { cemilBag: 1 } },
          sonra: 'onizleme_son',
        },
        {
          etiket: 'Bir şey söyleme. Eldiveni onun elinden al; sayfayı sen çevir.',
          etki: { bayrak: { cemilDefter: 'sessiz' }, artir: { cemilBag: 1 } },
          sonra: 'onizleme_son',
        },
      ],
    },
    onizleme_son: {
      ortam: 'ortam_banka',
      baslik: 'Sayfa kırk yedi',
      paragraflar: (d) => [
        {
          teselli: 'Cemil Bey başını sallıyor; ama gözleri sayfadan ayrılmıyor. Bilemezdim, diyor. Bunu kırk kez söyleyeceğim kendime. Belki kırk birincisinde inanırım.',
          durust: 'Cemil Bey sana uzun uzun bakıyor. Sonra gülümsüyor; yorgun, ama gerçek. Paris\'te Eleni de böyle derdi, diyor. Doğruyu söyleyen arkadaşın yarası acıtır ama mikrop kapmaz.',
          sessiz: 'Eldiveni alıyorsun. Sayfayı sen çeviriyorsun. Cemil Bey ellerini cebine sokuyor; titremesini saklamak için. Teşekkür ederim, diyor; çok alçak sesle.',
        }[bayrak(d, 'cemilDefter') || 'sessiz'],
        'Bir sonraki sayfayı çevirdiğinde bir şey fark ediyorsun: kırk altıdan sonra kırk sekiz geliyor. Kırk yedinci sayfa yok. Dikiş yerinde, jiletle kesilmiş ince bir kenar.',
        'Nermin de görüyor. Bir şey demiyor; defterine bir not alıyor: 47.',
        'Bir zil çalıyor. Önizleme bitti. Mezat başlıyor.',
      ],
      secenekler: [{ etiket: 'Mezat salonuna geç', etki: { mekan: 'mezat25', bayrak: { onizlemeBitti: true, sayfa47: true, 'gorüldü_mezat25': true } } }],
    },

    // --- Kartlar ---------------------------------------------------------------------
    kart_sahne: {
      ortam: 'ortam_mezat',
      efekt: 'tokmak',
      baslik: 'İtiraz',
      paragraflar: (d) => {
        const son = bayrak(d, 'sonKart');
        const metin = {
          mektup: bayrak(d, 'mektupKarar') === 'baba'
            ? 'Baban ayağa kalkıyor. Mektubu kendi eliyle notere uzatıyor. Ben İsmail, kalaycı, diyor; Neslihan çeviriyor. Bu mektupta adı geçen usta benim. Bedeli bu bankadan ödendi. Salon susuyor.'
            : 'Neslihan Montaigne\'in sayfaları arasından mektubu çıkarıp notere uzatıyor. Bedeli ödendi. Altında Banque Vollmer\'in 1912 havale numarası.',
          gubler: 'Nermin bir zarf açıyor: İstanbul polisinin mühürlü tutanağı. Gubler\'in ifadesi: defter, mezat, alıcılar. Vollmer\'in avukatı ilk kez bir şey fısıldıyor.',
          kurye: 'Rıza Bey\'in Galata\'da ele geçirdiği zarflar masaya konuyor: 1923 Mart\'ına kadar ödemeler. Satılan defterin hâlâ kullanıldığının kanıtı.',
          damga: 'Neslihan feragatnameyi notere uzatıyor. Gülce\'nin damgası. Kayıt numarası: hiçbir defterde yok. Bu kâğıt geçersiz, diyor Neslihan; Fransızcası pürüzsüz. Ben hâlâ kurucu G. R.\'nin mirasçısıyım. Bu defterin bir sahibi daha var.',
          klara: 'Salonun arka kapısı açılıyor. Klara Rainer; elinde bir dosya. Zürih Kanton Mahkemesi\'ne verilmiş bir ihtiyati tedbir dilekçesi, diyor. Bu defter suç delilidir. Vollmer ilk kez ona bakıyor; eski bir ortağın torununa.',
          negatif: 'Nermin bir fotoğraf zarfı açıyor: Viyana\'da, Kessler\'in karanlık odasında basılmış kopyalar. Bu defterin içeriği zaten kayıt altında, diyor. Satılan şey bir sır değil; bir delil.',
          hisse: 'Neslihan Bankhaus Rainer\'in pay defterinden bir sayfa gösteriyor. Yüzde otuz dört. Kurucuların ortak malı olan her belge üzerinde, diyor, benim de sözüm var.',
          bekle: 'Bu turda bir şey sunmuyorsun. Mezatçı fiyatı yükseltiyor; Londra\'dan gelen avukat elini kaldırıyor, Belgrad\'dan gelen adam da.',
        }[son || 'bekle'];
        return [metin, 'Noter not alıyor. İtirazların toplamı: ' + itirazToplami(d) + '. Mezatçı tokmağı kaldırıyor; indirmiyor.'];
      },
      secenekler: [{ etiket: 'Devam' }],
    },

    tokmak25: {
      ortam: 'ortam_mezat',
      efekt: 'tokmak',
      baslik: 'Tokmak',
      paragraflar: (d) =>
        itirazToplami(d) >= ITIRAZ_ESIGI
          ? [
              'Noter ayağa kalkıyor. Mezat durdurulmuştur, diyor; önce Almanca, sonra Fransızca. Defter, Kanton Mahkemesi\'nin kararına kadar mühürlenecektir.',
              'Gri paltolu temsilciler birer birer kalkıyor. Biri kapıda duruyor; sana bakıyor; şapkasını hafifçe kaldırıyor. Bir dahaki sefere, der gibi.',
              'Vollmer kıpırdamıyor. Ellerini masanın üstünde birleştirmiş. Bir bankacı, diyor sonunda, kaybettiği bir mezatı unutmaz. Ama ben yetmiş yaşındayım. Unutmaya vaktim yok.',
            ]
          : [
              'Mezatçının tokmağı iniyor. Satılmıştır.',
              'Alıcı: gri paltolu, sessiz bir adam. Adını vermiyor. Kime çalıştığını söylemiyor. Defteri bir deri çantaya koyuyor ve çıkıyor; arkasından iki kişi.',
              'Vollmer ayağa kalkıyor, Neslihan\'a eğiliyor. Mademoiselle, diyor. Siz de bir gün öğreneceksiniz: geçmiş satılır. Her zaman bir alıcısı vardır.',
            ],
      secenekler: [
        {
          etiket: 'Devam',
          etki: (d) => ({ bayrak: { mezatSonu: itirazToplami(d) >= ITIRAZ_ESIGI ? 'durdu' : 'satildi' } }),
          sonra: 'mahkeme25',
        },
      ],
    },
    mahkeme25: {
      ortam: 'ortam_zurih',
      baslik: '1 Aralık 1923',
      paragraflar: (d) =>
        bayrak(d, 'mezatSonu') === 'durdu'
          ? [
              'Ertesi sabah Kanton Mahkemesi\'nde bir sulh hâkimi. Yaşlı, gözlüklü, sabırlı. Defter masasında, mühürlü.',
              'Mahkeme bir şey soruyor, diyor Klara Rainer; tercüme ediyor. Kurucu G. R.\'nin mirasçısı olarak, Neslihan Hanım, defterin ne olmasını istiyorsunuz? Mahkeme mirasçının görüşünü dinleyecek.',
              'Neslihan sana bakıyor. ' +
                ({
                  baba: 'İsmail kızı Neslihan, diye imzalayacağım, diyor. Ama ne istediğimi bilmiyorum.',
                  iki: 'İki adla imzalayacağım, diyor. Ama hangi adla karar vereceğimi bilmiyorum.',
                  kendi: 'Adımı seçtim, diyor; yolda, trende. Söyleyeceğim. Ama önce sen söyle.',
                }[bayrak(d, 'neslihanAd') || 'kendi']),
            ]
          : [
              'Ertesi sabah. Otelin kahvaltı salonunda kimse bir şey yemiyor.',
              'Nermin defterini açıyor: 47. Bir sayfa çoktan satılmıştı, diyor. Şimdi defterin tamamı. Ama biz neyin içinde olduğunu biliyoruz. ' + (bayrak(d, 'defter14') === 'kopya' ? 'Ve Kessler\'in negatifleri hâlâ Viyana\'da.' : 'Ve onu satın alanın bir gün onu kullanacağını.'),
              'Cemil Bey pencereden bakıyor. Binbaşı Fikri\'nin adı o defterde, diyor. Defter gitti. Ama ben onu okudum. Bir hekim okuduğunu unutmaz.',
            ],
      secenekler: [
        {
          etiket: 'Bir arşive. Mühürlü kalsın; içindeki herkes ölünce açılsın.',
          kosul: (d) => bayrak(d, 'mezatSonu') === 'durdu',
          etki: { bayrak: { defterSonu: 'arsiv' } },
          sonra: 'son25',
        },
        {
          etiket: 'Nermin\'e. Bütün sayfalar gazetede çıksın; kimse bir daha bu defterle kimseyi tehdit edemesin.',
          kosul: (d) => bayrak(d, 'mezatSonu') === 'durdu',
          etki: { bayrak: { defterSonu: 'gazete' }, artir: { nerminBag: 1 } },
          sonra: 'son25',
        },
        {
          etiket: 'Yakılsın. Babamızın kalayı gibi değil; bu sefer gerçekten.',
          kosul: (d) => bayrak(d, 'mezatSonu') === 'durdu',
          etki: { bayrak: { defterSonu: 'yak' } },
          sonra: 'son25',
        },
        {
          etiket: 'Devam',
          kosul: (d) => bayrak(d, 'mezatSonu') !== 'durdu',
          etki: { bayrak: { defterSonu: 'satildi' } },
          sonra: 'son25',
        },
      ],
    },
    son25: {
      ortam: 'ortam_gol',
      ortamOran: 0.6,
      baslik: 'Göl',
      paragraflar: (d) => [
        {
          arsiv: 'Hâkim kararını üç hafta sonra veriyor: defter Federal Arşiv\'e, elli yıl mühürlü. Neslihan kararın altına imzasını atıyor. Elli yıl, diyor. 1973. Ben yetmiş sekiz yaşında olacağım. Belki okurum.',
          gazete: 'Hâkim mirasçının görüşünü kayda geçiriyor; defteri savcılığa veriyor. Ama Nermin\'in Kodak\'ı mahkeme koridorunda çalışıyor. İki ay sonra Ankara\'da, Atina\'da, Belgrad\'da, Viyana\'da gazetelerde aynı haber: Kanatlı Anahtar\'ın defteri. Bazı adlar istifa ediyor. Bazıları hiç etmiyor.',
          yak: 'Hâkim kaşlarını kaldırıyor; ama mirasçının dileğini kayda geçiriyor. Defter mahkemenin kazanında, bir sabah, bir kâtibin ve senin gözünün önünde yanıyor. Kırmızı mürekkep en son yanıyor; bir an mavi bir alev veriyor. Neslihan bakmıyor. Baban bakıyor; sonuna kadar.',
          satildi: 'Zürih Gölü\'nün kıyısında yürüyorsunuz. Defter bir yerde; bir çantada, bir trende, bir kasada. Bir gün ortaya çıkacak; her zaman çıkar.',
        }[bayrak(d, 'defterSonu') || 'satildi'],
        'Göl kıyısında son akşam. Cemil Bey Eleni\'ye mektup yazıyor; ' + (bayrak(d, 'cemilDefter') === 'durust' ? 'bu kez Binbaşı Fikri\'yi de yazıyor; ilk kez kendini temize çıkarmaya çalışmadan.' : 'Binbaşı Fikri\'yi yazmıyor; henüz değil.'),
        bayrak(d, 'cocukKarar') === 'yanina'
          ? 'Neslihan bir kartpostal alıyor; göl, dağlar, bir vapur. İstanbul\'a, Gülce\'nin bürosuna; Zehra\'ya. Arkasına tek bir kelime yazıyor: Geliyorum.'
          : 'Neslihan bir kartpostal alıyor; Pire\'ye, Rina\'ya. Arkasına bir ayva çiziyor.',
        'Nermin defterinde son satıra bakıyor: 47. Biri o sayfayı mezattan önce kesti, diyor. Vollmer değil; o sayfanın yokluğunu görünce yüzü değişti, gördüm. Kırk yedinci sayfayı kim aldı? Ve ne yazıyordu?',
        bayrak(d, 'hafizZarf')
          ? 'Ve sen hatırlıyorsun: Selanik, Aralık 1918. Rebeka Hanım\'ın evinde, ateşin başında, yaşlı bir defterdarın göğüs cebinde mühürlü bir zarf. Mösyö Rivière\'in mührü. Üstünde yalnızca bir sayı: kırk yedi. Onu gerçek adıyla isteyene ver.'
          : '',
        {
          verdi: 'Neslihan çantasından eski, katlanmış bir kâğıt çıkarıyor: David Saltiel\'in listesi. On yedi ad. Dört yıldır yanında taşıyor. Bu kâğıtta adlar var, diyor; getirenin adı yok. Kırk yedinci sayfada vardı. Biliyorum.',
          sakla: 'Cüzdanında dört yıldır Saltiel\'in kâğıdı duruyor; on yedi ad. Neslihan\'a hiç göstermedin. Kırk yedinci sayfa o kâğıdın öbür yarısı olabilir: adların yanında, onları getirenin adı.',
        }[bayrak(d, 'davidNotu')] || '',
        'Kimse cevap vermiyor. Göl karanlık. Karşı kıyıda bir tren düdüğü; güneye, İtalya\'ya, denize.',
        'Dördüncü kitabın sonu.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', sonra: 'gece25' }],
    },
    gece25: {
      ortam: 'ortam_gol',
      baslik: 'Göl, gece yarısı',
      paragraflar: (d) => [
        'Herkes uyuyor. Sen pansiyonun iskelesinde oturuyorsun; göl kapkara, karşı kıyıda tek bir fener.',
        sayi(d, 'travma') >= 2
          ? 'Su iskeleye vuruyor. Bir, iki. Sonra bir kayık motoru, çok uzakta; ama kulağında başka bir ses oluyor. Seddülbahir. Kum. Ellerin titremeye başlıyor; beş yıldır olduğu gibi.'
          : 'Su iskeleye vuruyor. Bir, iki. Uzakta bir kayık motoru. Beş yıl önce bu ses seni Seddülbahir\'e götürürdü. Bu gece yalnızca bir motor.',
        bayrak(d, 'madalya') === 'anlat'
          ? 'Nermin\'in sofradaki sorusu aklında: Madalyan hâlâ sandığın dibinde mi? Hâlâ orada. Karaköy\'de, bir sandığın dibinde.'
          : '',
        'Arkanda bir kapı gıcırdıyor.',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Nefesini say. Dörde kadar al, dörde kadar ver.',
          kosul: (d) => bayrak(d, 'ilkNefes') === 'say',
          etki: (d) => ({ bayrak: { arifGece: 'nefes', bolumBitti: true }, artir: { travma: sayi(d, 'travma') > 0 ? -1 : 0 } }),
          sonra: 'gece25_son',
        },
        {
          etiket: 'Kapıdaki Neslihan. Yanına çağır; bu gece anlat ona.',
          etki: (d) => ({ bayrak: { arifGece: 'kardes', bolumBitti: true }, artir: { neslihanBag: 1, travma: sayi(d, 'travma') > 0 ? -1 : 0 } }),
          sonra: 'gece25_son',
        },
        {
          etiket: 'Kimseye görünme. Ellerini dizlerine bastır, geçmesini bekle.',
          etki: { bayrak: { arifGece: 'yalniz', bolumBitti: true } },
          sonra: 'gece25_son',
        },
      ],
    },
    gece25_son: {
      ortam: 'ortam_gol',
      baslik: 'Sabaha doğru',
      paragraflar: (d) => [
        {
          nefes: 'Dörde kadar al, dörde kadar ver. Aralık 1918\'de, Karaköy rıhtımında, saçılmış bir kömür çuvalının başında kendine böyle öğretmiştin. Eller duruyor. Karşı kıyıdaki fener söndüğünde sen hâlâ sayıyorsun; ama artık korkudan değil.',
          kardes: 'Neslihan yanına oturuyor; şalını ikinizin omzuna atıyor. Anlatıyorsun: kum, barut, Seddülbahir, bir gece boyunca yanında ölen asker. Hiç kimseye anlatmadığını. Neslihan dinliyor; sonra başını omzuna koyuyor. Ben de Viyana\'da hiç anlatmadım, diyor. Şimdi sıra bende mi? Sabaha kadar konuşuyorsunuz.',
          yalniz: 'Ellerini dizlerine bastırıyorsun. Geçiyor; her zaman geçtiği gibi. Kapı yeniden kapanıyor. Kim olduğunu görmedin. Sabah Neslihan sana bir şey sormuyor; ama kahvaltıda sandalyesini seninkine biraz daha yakın çekiyor.',
        }[bayrak(d, 'arifGece')] || 'Sabah oluyor.',
        'Göl ağarıyor. Kırk yedinci sayfa bir yerde. Bir zarfın içinde, belki. Bir adamın cebinde, belki.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_gol',
      ortamOran: 0.45,
      baslik: 'Dördüncü kitap bitti',
      paragraflar: ['Kararların kaydedildi. Beşinci kitap yazılıyor: kırk yedinci sayfa.'],
      secenekler: [{ etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    zurih25: {
      ad: 'Bahnhofstrasse',
      ortam: 'ortam_zurih',
      tarif: 'Yağmurlu Zürih. Banque Vollmer\'in kapısı.',
      nesneler: [],
      kisiler: [],
      gecisler: [],
    },
    mezat25: {
      ad: 'Mezat salonu',
      ortam: 'ortam_mezat',
      tarif: (d) =>
        'Ahşap kaplı bir salon, yağmur yüksek pencerelerde. Ön sırada gri paltolu temsilciler, bir masada noter, kürsüde mezatçı, köşede Vollmer. Tur ' + Math.min(sayi(d, 'tur') + 1, TUR_SAYISI) + ' / ' + TUR_SAYISI + '. Notere sunulan itiraz: ' + itirazToplami(d) + '. Bu turda bir kanıt sunabilirsin.',
      nesneler: [
        ...Object.entries(KARTLAR).map(([id, k]) => ({
          id: 'kart_' + id,
          etiket: 'Notere sun: ' + k.etiket,
          kosul: (d) => k.var(d) && !bayrak(d, 'kart_' + id) && sayi(d, 'tur') < TUR_SAYISI,
          incele: 'Ayağa kalkıyorsun.',
          etki: { ...kartEtki(id), sahne: 'kart_sahne', bayrak: { ['kart_' + id]: true, sonKart: id } },
        })),
        {
          id: 'bekle',
          etiket: 'Bu turda bekle',
          kosul: (d) => sayi(d, 'tur') < TUR_SAYISI,
          incele: 'Oturuyorsun.',
          etki: { artir: { tur: 1 }, sahne: 'kart_sahne', bayrak: { sonKart: 'bekle' } },
        },
      ],
      kisiler: [],
      gecisler: [],
    },
  },

  kisiler: {},
};
