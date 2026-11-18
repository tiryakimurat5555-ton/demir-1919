// Yirmi üçüncü bölüm: "Sofra". İstanbul, 23-24 Nisan 1923.
// Arka plan (gerçek): Lozan görüşmeleri 23 Nisan 1923'te yeniden başladı; İstanbul hâlâ İtilaf askerlerinin elinde.
// Yalnızca arka plan. Kurgu: Albert Vollmer (Banque Vollmer, kurucu A. V.; 14. ve 15. bölümde ekildi) Neslihan'dan bir
// feragatname istiyor: Rivière mirasçılarının bankadaki hesaplar üzerindeki bütün haklarından vazgeçmesi. Karşılığında
// kuruluş defterinin kırmızı sayfalarındaki "Kalıp: Manastırlı usta İ." satırını gazetelere vermeyecek.
// Yeni oynanış: sofra. Kayıkhanede herkes bir arada; üç konuşma hakkın var. Kiminle konuştuğun, ertesi sabah Vollmer'e
// karşı elinde ne olduğunu belirler. Kalıbı kırar: delil yok, çıkarım yok; yalnızca insanlar.
// Karşılık verilen iplikler: kemalSonu, cocukKarar, rizaSon22, neslihanAd, vollmerIpucu, gulceTevfik, arifNeden.
// Yeni iplikler: vollmerSonu, kemalKalir, babaItiraf.
import { BOLUM22 } from './bolum22';
import { bayrak, delilVar, sayi } from '../oyun/motor';

export const SOFRA_HAKKI = 3;

const kemalBurada = (d) => bayrak(d, 'kemalSonu') === 'yolcu' || delilVar(d, 'kemal_ifadesi');
const rizaBurada = (d) => bayrak(d, 'rizaSon22') !== 'kirgin';
const zehraBurada = (d) => bayrak(d, 'cocukKarar') === 'yanina';
const gulceYakin = (d) => sayi(d, 'gulceGuven') >= 2 || !!bayrak(d, 'gulceyeAnlatti');
const hakVar = (d) => sayi(d, 'sofraKonusma') < SOFRA_HAKKI;
const konus = (kim, ek = {}) => ({ ...ek, artir: { sofraKonusma: 1, ...(ek.artir || {}) }, bayrak: { ['konustu_' + kim]: true, ...(ek.bayrak || {}) } });

export const BOLUM23 = {
  id: 'bolum23',
  ad: 'Yirmi üçüncü bölüm: Sofra',
  baslangic: 'acilis',
  ilkMekan: 'sofra23',

  deliller: {
    ...BOLUM22.deliller,
    feragatname: { ad: 'Vollmer\'in mektubu', tarif: 'Banque Vollmer\'den Neslihan\'a: Rivière mirasçılarının bankadaki bütün hesaplar üzerindeki haklarından vazgeçtiğini bildiren bir feragatname, imzaya hazır. Ekinde tek bir fotoğraf: kuruluş defterinin kırmızı sayfası. "Kalıp: Manastırlı usta İ., bedeli ödendi." Altında bir not: Yarın sabah onda, kayıkhanede.' },
  },

  cikarimlar: { ...BOLUM22.cikarimlar },

  olaylar: [{ id: 'sabah23', kosul: (d) => sayi(d, 'sofraKonusma') >= SOFRA_HAKKI, etki: { sahne: 'gece23' } }],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Yirmi üçüncü bölüm bitti.' },
    { kosul: () => true, metin: (d) => 'Sofradasın. ' + (SOFRA_HAKKI - sayi(d, 'sofraKonusma')) + ' kişiyle daha uzun uzun konuşabilirsin. Sabah Vollmer gelecek.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_rihtim',
      baslik: '23 Nisan 1923, Karaköy',
      paragraflar: (d) => [
        'Bahar. Lozan\'da görüşmeler bugün yeniden başladı, diyor gazeteler. İstanbul\'da İtilaf askerleri hâlâ köprü başlarında; ama kimse onlara eskisi gibi bakmıyor. Herkes bir şeyin bitmek üzere olduğunu biliyor; neyin başlayacağını bilmiyor.',
        'Süleyman Kaptan\'ın kayıkhanesi. Dört yıl önce yandı; yeniden yapıldı. ' +
          (bayrak(d, 'kayikhaneSozu')
            ? 'Sen yaptın. Gureba\'nın koğuşunda verdiğin sözü dört baharda, hamal parasıyla, tahta tahta tuttun. Kapının üstündeki levhayı Süleyman kendi eliyle yazdı: Kayıkhane. Altında, küçük harflerle: Arif\'in sözü.'
            : 'Mahallenin kalafatçıları imece ile kurdu; Süleyman her birine bir kayık borçlu olduğunu söyler.') +
          ' Bu akşam önüne uzun bir masa kurulmuş: iki kayık küreği üstüne bir kapı, üstünde beyaz bir örtü. Süleyman herkesi çağırmış.',
        kemalBurada(d)
          ? 'Masanın başında, babasının yanında, kasketsiz bir adam: Kemal. Pire\'den geldi; bir haftadır kayıkhanede uyuyor. Süleyman her sabah onu uyurken izliyormuş; Ohannes Usta öyle anlatıyor.'
          : 'Masanın başında Süleyman. Yanındaki sandalye boş. Kemal Lozan\'dan Pendle\'le gitti; bir mektup bile yazmadı. Süleyman o sandalyeyi yine de koydu.',
        bayrak(d, 'vollmerIpucu') ? 'Lozan\'da Klara\'nın gösterdiği isim bu sabah bir mektubun başında duruyordu.' : '',
        'Ama önce sabah gelen mektup. Neslihan sana uzatıyor; elleri titremiyor, bu daha kötü. Banque Vollmer. Bir feragatname, imzaya hazır. Ekinde bir fotoğraf: kırmızı sayfa. Kalıp: Manastırlı usta İ., bedeli ödendi. Altında: Yarın sabah onda, kayıkhanede.',
        'İmzalarsam babam rahat eder, diyor Neslihan. İmzalamazsam, bu sayfa gazetelerde çıkar. Yeni bir devlet kuruluyor abi; herkes eski defterleri karıştırıyor. Kanatlı anahtarın kalıbını döken usta; bunu kimse affetmez.',
        'Önce sofra, diyor Süleyman. Ekmek bölünmeden karar verilmez.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Sofraya otur', etki: { mekan: 'sofra23', delil: ['feragatname'], bayrak: { 'gorüldü_sofra23': true, ekip_riza: true, ekip_nermin: true, ekip_cemil: false } } }],
    },
    gece23: {
      ortam: 'ortam_sofra',
      ortamOran: 0.5,
      baslik: 'Gece yarısı',
      paragraflar: (d) => [
        'Sofra dağılıyor. Ohannes Usta lambaları söndürüyor; biri hariç. ' + (zehraBurada(d) ? 'Zehra Neslihan\'ın kucağında uyumuş; ağzında bir ayva dilimi.' : 'Neslihan Rina\'nın çizimini masanın üstüne koymuş; bir gemi, bir rıhtım, bir ayva.'),
        'Konuştuklarını düşünüyorsun. ' +
          [bayrak(d, 'babaItiraf') && 'Babanın kendi ağzıyla anlatmaya karar vermesi.', bayrak(d, 'gulceDamga') && 'Gülce\'nin damgası.', bayrak(d, 'kemalYardim') && 'Kemal\'in bildiği kurye.', bayrak(d, 'rizaYardim') && 'Rıza Bey\'in sözü.']
            .filter(Boolean)
            .join(' ') || 'Sabaha ne getireceğini bilmiyorsun. Ama bu gece kimse yalnız değildi.',
        'Sabah onda Vollmer gelecek.',
      ],
      secenekler: [{ etiket: 'Sabah', sonra: 'vollmer23' }],
    },
    vollmer23: {
      ortam: 'ortam_kayikhane',
      baslik: '24 Nisan, sabah onda',
      paragraflar: [
        'Bir motor iskeleye yanaşıyor. İçinden gri paltolu, ince, temiz traşlı bir adam çıkıyor; Zürih\'te seni bankanın kapısında karşılayan gülümsemeyle. Albert Vollmer.',
        'Kayıkhaneye giriyor; tahta duvarlara, pusulanın asılı olduğu çiviye, mangalın külüne bakıyor. Hoş bir yer, diyor Fransızca; Neslihan çeviriyor. Ben de bir zamanlar küçük bir bankada başladım. Sonra büyüdü.',
        'Masaya feragatnameyi koyuyor. Bir kalem. Matmazel Rivière, diyor; Neslihan\'ın yüzünde bir şey kıpırdıyor. Bu kâğıt geçmişi kapatır. Sizin geçmişinizi; babanızınkini. Bende kalan sayfalar bende kalır. Bir bankacı sır tutar.',
        'Bir sandalye gıcırdıyor. Süleyman duvardaki boş çiviye bakıyor. Neslihan sana bakıyor.',
      ],
      secenekler: [
        {
          etiket: 'Neslihan imzalamayacak. Babamız kendi hikâyesini kendisi anlatacak; bugün, Nermin\'in gazetesinde.',
          kosul: (d) => !!bayrak(d, 'babaItiraf'),
          etki: { bayrak: { vollmerSonu: 'itiraf' } },
          sonra: 'vollmer23_son',
        },
        {
          etiket: 'Gülce\'ye bak. İmzala, Neslihan.',
          kosul: (d) => !!bayrak(d, 'gulceDamga'),
          etki: { bayrak: { vollmerSonu: 'damga' } },
          sonra: 'vollmer23_son',
        },
        {
          etiket: 'Bay Vollmer, kuryeniz şu an Galata\'da, Rıza Bey\'in adamlarının yanında.',
          kosul: (d) => !!bayrak(d, 'kemalYardim') && !!bayrak(d, 'rizaYardim'),
          etki: { bayrak: { vollmerSonu: 'kurye' } },
          sonra: 'vollmer23_son',
        },
        {
          etiket: 'İmzala Neslihan. Babamızı bu adamın kalemine bırakamayız.',
          etki: { bayrak: { vollmerSonu: 'imza' }, artir: { travma: 1 } },
          sonra: 'vollmer23_son',
        },
      ],
    },
    vollmer23_son: {
      ortam: 'ortam_kayikhane',
      baslik: 'Feragatname',
      paragraflar: (d) => {
        const v = bayrak(d, 'vollmerSonu');
        const ad = bayrak(d, 'neslihanAd');
        if (v === 'itiraf')
          return [
            'Neslihan feragatnameyi iki parmağıyla Vollmer\'e geri itiyor. ' + (ad === 'baba' ? 'Benim adım Rivière değil, diyor. İsmail kızı Neslihan. Babamın adını taşıyorum; günahıyla birlikte.' : 'İmzalamıyorum, diyor.'),
            'Nermin kapıdan giriyor; elinde bu sabahın gazetesi, mürekkebi kurumamış. İkinci sayfada bir başlık: Kalıbı ben döktüm. Altında İsmail Usta\'nın adı ve dün gece Nermin\'e anlattıkları: 1908, Selanik, bir kalıp, bir bedel, yıllar sonra anlaşılan bir zehir.',
            'Vollmer gazeteyi alıyor, okuyor. Yüzündeki gülümseme bir an kalıyor; sonra bir yüz kalıyor, gülümsemesiz. Bir bankacı, diyor, artık sırrı olmayan birine bir şey satamaz. Paltosunu ilikleyip çıkıyor.',
            'Baban kayıkhanenin köşesinde, ocağın yanında. Gazeteyi eline almıyor. Ellerine bakıyor. Hafifledim, diyor sana. Kırk yıl kalay sürdüm; ilk kez bir şeyin üstünü örtmüyorum.',
          ];
        if (v === 'damga')
          return [
            'Neslihan Gülce\'ye bakıyor. Gülce başını hafifçe sallıyor. Neslihan kalemi alıyor ve imzalıyor. ' + (ad === 'iki' ? 'İki adla: Neslihan Rivière, İsmail kızı.' : 'Neslihan Rivière.'),
            'Gülce feragatnameyi alıp çantasından çıkardığı damgayla mühürlüyor. Gümrük Başmüdürlüğü, yabancı belgeler kaydı, diyor; İstanbul\'da imzalanan yabancı bir feragatname buraya kaydedilmezse geçersizdir. Vollmer başını eğiyor; teşekkür ediyor. Kâğıdı alıp çıkıyor.',
            'Gülce sana dönüyor. Kayıt numarası yanlış, diyor alçak sesle. Bilerek. On Üç\'ten kalma bir defterin numarası; babamın defterinin. Bu kâğıt Zürih\'te bir mahkemeye çıktığı gün, hiçbir yerde kayıtlı olmadığı anlaşılır. Babam bana bir kâğıt bırakmıştı. Ben de Vollmer\'e bir kâğıt bıraktım.',
          ];
        if (v === 'kurye')
          return [
            'Vollmer\'in yüzü değişmiyor; ama kalemi masaya bırakıyor. Kurye mi?',
            'Kemal kapıda. Pendle Shipping\'in her ay Pire\'den İstanbul\'a gelen posta çantası, diyor; içinde Banque Vollmer\'in mühürlü zarfları. Ben on yıl taşıdım o çantayı. Bu sabah Rıza Bey\'in tanıdıkları Galata\'da onu açtı. İçinde kırmızı sayfaların kopyaları vardı. Ve başka sayfalar: kimlere, ne zaman, ne ödendi; 1923 Mart\'ına kadar.',
            'Rıza Bey bir zarfı masaya koyuyor. Delille, diyor. Döverek değil.',
            'Vollmer paltosunu ilikliyor. Sayfaların kopyası olur, diyor. Defterin aslı Zürih\'te. Ama sesi Zürih\'teki kadar düz değil. Motoruna biniyor. Motor iskeleden ayrılırken Kemal babasının yanına geliyor; iki adam aynı anda pusulaya bakıyor.',
          ];
        return [
          'Neslihan sana bakıyor. Uzun uzun. Sonra kalemi alıyor ve imzalıyor: Neslihan Rivière. Kâğıtlardaki adıyla. ' + (ad === 'baba' ? 'Dün gece İsmail kızı olmaya karar vermişti. Bugün son kez Rivière.' : ''),
          'Vollmer kâğıdı alıyor, katlıyor, iç cebine koyuyor. Bir bankacı sır tutar, diyor yine. Ve çıkıyor.',
          'Baban ocağın yanında. Kızının imzasını görmedi; ama anladı. Bir şey söylemiyor. Neslihan da söylemiyor. İkiniz de onun için yaptınız; o da bunu biliyor. Bu bilgi kayıkhanenin içinde bir taş gibi duruyor.',
        ];
      },
      secenekler: [{ etiket: 'Devam', sonra: 'son23' }],
    },
    son23: {
      ortam: 'ortam_rihtim',
      baslik: 'Rıhtım',
      paragraflar: (d) => [
        kemalBurada(d)
          ? bayrak(d, 'kemalKalir')
            ? 'Öğleden sonra Kemal kayıkhanenin önünde bir kayığın karinasını kalafatlıyor. Ohannes Usta zifti ısıtıyor. Süleyman bastonuna dayanmış, izliyor. Denizden yirmi beş yıl sonra karaya çıkan bir adam, diyor sana; şimdi de karadan denize kayık itiyor. İyi bir iş.'
            : 'Öğleden sonra Kemal\'in gemisi Galata\'dan kalkıyor; Pire\'ye, oradan İskenderiye\'ye. Kendi gemisi değil; bir Mısır şirketinin. Pendle\'in değil. Süleyman rıhtımda el sallıyor. Dönecek, diyor. Bu kez nereden döneceğini biliyorum.'
          : 'Öğleden sonra Süleyman boş sandalyeyi kayıkhaneye geri taşıyor. Kemal\'den hâlâ haber yok. Pusula duvarda değil; Kemal\'in cebinde. Bu da bir haber, diyor Süleyman.',
        bayrak(d, 'vollmerSonu') === 'imza'
          ? 'Vollmer kazandı; bu sefer. Ama kırmızı sayfaların bir kopyası hâlâ bir yerde: ' + (bayrak(d, 'defter14') === 'kopya' ? 'Viyana\'da Kessler\'in karanlık odasında, Nermin\'in negatifleri.' : 'bir yerde. Kimin elinde, bilmiyorsun.')
          : 'Vollmer bu sabah eli boş döndü. Ama Zürih\'teki defter hâlâ onda. Ve bir bankacı, kaybettiği bir sabahı unutmaz.',
        'Yirmi üçüncü bölümün sonu.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_kayikhane',
      ortamOran: 0.45,
      baslik: 'Yirmi üçüncü bölüm bitti',
      paragraflar: ['Kararların kaydedildi. Sıradaki: Ekim 1923. İtilaf askerleri İstanbul\'dan çekiliyor; Zürih\'te bir defter hâlâ kapalı.'],
      secenekler: [{ etiket: 'Yirmi dördüncü bölüme geç', sonrakiBolum: 'bolum24' }, { etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    sofra23: {
      ad: 'Kayıkhanenin önündeki sofra',
      ortam: 'ortam_sofra',
      tarif: (d) =>
        'Kürekler üstünde bir kapı, beyaz örtü, rakı, balık, ekmek, ayva reçeli. Masanın çevresinde: Süleyman, ' +
        (kemalBurada(d) ? 'Kemal, ' : '') +
        'baban, Neslihan' + (zehraBurada(d) ? ' ve kucağında Zehra' : '') + ', Gülce, Nermin' + (rizaBurada(d) ? ', Rıza Bey' : '') + ', Ohannes Usta. ' +
        (hakVar(d) ? 'Gece uzun ama sınırsız değil: ' + (SOFRA_HAKKI - sayi(d, 'sofraKonusma')) + ' kişiyle daha uzun uzun konuşabilirsin.' : 'Gece bitiyor.'),
      nesneler: [],
      kisiler: ['baba23', 'gulce23', 'kemal23', 'riza23', 'neslihan23', 'nermin23'],
      gecisler: [],
    },
  },

  kisiler: {
    baba23: {
      ad: 'Baban, İsmail Usta',
      kosul: (d) => hakVar(d) && !bayrak(d, 'konustu_baba'),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) => [
            'Baban masanın ucunda, ekmeğini küçük küçük bölüyor. Elleri eskisi kadar yanık değil; üç yıldır ' + (bayrak(d, 'babaKarar') === 'sakla' ? 'Ohannes\'in ocağında' : 'Ankara\'da, Nermin\'in matbaasında') + ' kalay değil, harf döküyor.',
            bayrak(d, 'neslihanAd') === 'baba'
              ? 'Neslihan nüfusa gitmiş, diyor sana; sesi kırık. İsmail kızı Neslihan yazdırmış. Ben bir kalaycıyım oğul; kızıma bir ad bile veremedim. Kendisi aldı.'
              : 'Kızım dün bana Viyana\'yı anlattı, diyor. Operayı, kitapları. Ben bir kalaycıyım oğul. Onun anlattıklarının yarısını anlamadım. Ama dinledim.',
            'Sonra sesini alçaltıyor. Mektubu gördüm, diyor. Kırmızı sayfayı. O satırı.',
          ],
          secenekler: [
            {
              etiket: 'Vollmer o sayfayla Neslihan\'ı tehdit ediyor baba. Ne yapacağız?',
              etki: konus('baba', { bayrak: { babaItiraf: true } }),
              cevap: 'Baban ekmeği bırakıyor. Kalayın işi bir şeyin üstünü örtmektir, diyor. Bakırı zehirden korur. Ama ben kırk yıl kendimi örttüm; zehir içeride kaldı. Nermin\'i çağır. Bu gece anlatacağım; her şeyi. 1908\'i, kalıbı, bedeli. Yarın sabah gazetede olsun. Bir sır, söylendiği an satılık olmaktan çıkar.',
            },
            {
              etiket: 'Bu gece bunu konuşmayalım baba. Bana çocukken yaptığın ilk kalayı anlat.',
              etki: (d) => konus('baba', { artir: { travma: sayi(d, 'travma') > 0 ? -1 : 0 } }),
              cevap: 'Babanın yüzü yumuşuyor. Manastır\'da, Bit Pazarı\'nın arkasında, diyor. On iki yaşındaydım. Ustam bir bakır tencere verdi; delikti. Kalayladım, delik kaldı. Ustam tencereyi kafama geçirdi. Gülüyor; kırk yıldır ilk kez gülüyor gibi. Sen de gülüyorsun. Seddülbahir, bir an, çok uzakta kalıyor.',
            },
          ],
        },
      },
    },
    gulce23: {
      ad: 'Gülce',
      kosul: (d) => hakVar(d) && !bayrak(d, 'konustu_gulce'),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) => [
            zehraBurada(d)
              ? 'Gülce, Zehra\'ya balık ayıklıyor. Kız kılçıkları tabağın kenarına diziyor; bir gemi biçiminde. Bürodaki bütün kâğıtlarım gemi resmi oldu, diyor Gülce; mutlu.'
              : 'Gülce rakısına su katıyor; bir kez, iki kez. Bu masada en az içen benim, diyor. Babam da az içerdi. Az içen hatırlar.',
            bayrak(d, 'tevfikKarar') === 'teslim'
              ? 'Geçen ay Tevfik geldi, diyor. Bursa\'dan, kardeşiyle. Kapıda durdu; içeri girmedi. ' + (bayrak(d, 'gulceTevfik') === 'yaz' ? 'Bana on dört sayfası için teşekkür etti. Ben de ona bir iş buldum; Mudanya\'da bir gümrük kâtipliği.' : bayrak(d, 'gulceTevfik') === 'affetme' ? 'Yaşıyor. Bunu görmek istemiştim; gördüm. Kapıyı kapattım.' : 'Defterini ona geri verdim. Bir şey demeden.')
              : 'Tevfik\'in kardeşi Selim, Cemil Bey\'in hastanesinden yazdı, diyor. Ağabeyime söyleyin, okumayı öğrendim. ' + (bayrak(d, 'gulceTevfik') === 'affetme' ? 'Söylemedim. Ama mektubu sakladım.' : 'Tevfik\'e ilettim.'),
          ],
          secenekler: [
            {
              etiket: 'Vollmer\'in kâğıdı yarın gelecek. Bir gümrükçü ne yapardı?',
              etki: (d) => konus('gulce', { bayrak: { gulceDamga: gulceYakin(d) } }),
              cevap: (d) =>
                gulceYakin(d)
                  ? 'Gülce gözlerini kısıyor; sonra gülümsüyor; babasının gülümsemesi olmalı, diye düşünüyorsun. İstanbul\'da imzalanan yabancı bir feragatname gümrüğün yabancı belgeler defterine kaydedilmezse geçersizdir, diyor. Bunu kimse bilmez; bir kanun maddesinin dipnotu. Ben kaydederim. Yanlış numarayla. Damgam yarın sabah çantamda olacak.'
                  : 'Gülce omuz silkiyor. Bir gümrükçü kâğıdı okur, diyor. Ama bu kâğıt bir bankacının; benim değil. Sana yardım edemem Arif. Yorgunum. Bütün bu yıllar boyunca kimse bana ne düşündüğümü sormadı; sen de sormadın.',
            },
            {
              etiket: 'Sen nasılsın Gülce? Bunu hiç sormadım.',
              etki: konus('gulce', { artir: { gulceGuven: 1 } }),
              cevap: 'Gülce bir süre cevap vermiyor. Babam öldüğünde yirmi yedi yaşındaydım, diyor sonra. Şimdi otuz yedi. On yıl başkalarının kâğıtlarını okudum. Bu akşam ilk kez biri benimkini sordu. İyiyim, Arif. Galiba ilk kez gerçekten.',
            },
          ],
        },
      },
    },
    kemal23: {
      ad: 'Kemal',
      kosul: (d) => hakVar(d) && !bayrak(d, 'konustu_kemal') && kemalBurada(d),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) => [
            'Kemal babasının yanında; ikisi de aynı şekilde oturuyor, sol dirsek masada. Ohannes Usta bunu fark edip gülüyor.',
            bayrak(d, 'pendleSonu') === 'mahkeme'
              ? 'Londra\'da Pendle\'in davası ertelendi, diyor Kemal. Sigortacılar Vollmer\'in avukatlarını tutmuş. Vollmer her yerde.'
              : 'Pendle Shipping\'in son iki gemisi satıldı, diyor Kemal. Alıcı: bir Zürih şirketi. Kimin olduğunu biliyorsun.',
          ],
          secenekler: [
            {
              etiket: 'Pendle\'in gemileri Vollmer\'e ne taşırdı?',
              etki: konus('kemal', { bayrak: { kemalYardim: true } }),
              cevap: 'Kemal ekmeğini bırakıyor. Her ay bir posta çantası, diyor. Pire\'den İstanbul\'a, oradan Trieste\'ye. Mühürlü Banque Vollmer zarfları. Ben on yıl taşıdım; hiç açmadım. Bu ay da gelecek; yarın sabah, Galata\'ya. Çantayı kimin aldığını da biliyorum. Rıza Bey\'e söylersem o adamı bulur.',
            },
            {
              etiket: 'Kalacak mısın Kemal? Babanın yanında?',
              etki: konus('kemal', { bayrak: { kemalKalir: true }, artir: { suleymanBag: 1 } }),
              cevap: 'Kemal babasına bakıyor; Süleyman başka yöne bakıyor, duymamış gibi; duydu. Yirmi beş yıl denizdeydim, diyor Kemal. Kara bana yabancı. Ama bu kayıkhane değil. Kalırım. Kayık yaparım. Babam gibi; bir yaşlı denizcinin işi.',
            },
          ],
        },
      },
    },
    riza23: {
      ad: 'Rıza Bey',
      kosul: (d) => hakVar(d) && !bayrak(d, 'konustu_riza') && rizaBurada(d),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'rizaSon22') === 'emekli'
              ? 'Rıza Bey bastonsuz; bastonu sende kaldı. Masaya dirseklerini koymuş, balığını ayıklıyor. Emekli bir polis, diyor, artık yalnızca balık sorgular. Kılçıklar itiraf ediyor.'
              : 'Rıza Bey bastonunu sandalyesinin arkasına asmış. ' + (bayrak(d, 'rizaSon22') === 'devir' ? 'Dosyaları sana verdim, diyor; ama aklım hâlâ onlarda.' : 'Bir iş daha, demiştim Lozan\'da. Bu o iş mi?'),
          secenekler: [
            {
              etiket: 'Yarın sabah Galata\'da birini izlemen gerekebilir.',
              etki: (d) => konus('riza', { bayrak: { rizaYardim: bayrak(d, 'rizaSon22') !== 'emekli' } }),
              cevap: (d) =>
                bayrak(d, 'rizaSon22') === 'emekli'
                  ? 'Rıza Bey başını iki yana sallıyor. Emekli oldum evlat. Sen de bastonumu aldın. Bu sefer ben yokum. Ama sana bir şey söyleyeyim: kimi izlersen izle, önce onun ne taşıdığına bak; kim olduğuna değil.'
                  : 'Rıza Bey bıyığını sıvazlıyor. Galata\'da hâlâ beni tanıyan üç hamal, iki kayıkçı, bir polis var, diyor. Kimi izleyeceğimi söyle; gerisini bana bırak. Delille.',
            },
            {
              etiket: 'Yakup\'u hâlâ düşünüyor musun?',
              etki: konus('riza', { artir: { rizaBag: 1 } }),
              cevap: 'Rıza Bey uzun süre denize bakıyor. Her gece, diyor. Ama artık başka şeyleri de düşünüyorum. Bu masayı mesela. Yakup\'un hiç böyle bir masası olmadı. Ben ona bir masa borçluyum. Her masaya oturduğumda o borcu biraz ödüyorum.',
            },
          ],
        },
      },
    },
    neslihan23: {
      ad: 'Neslihan',
      kosul: (d) => hakVar(d) && !bayrak(d, 'konustu_neslihan'),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) => [
            zehraBurada(d) ? 'Neslihan Zehra\'nın saçını örüyor; üç parmak, sıkı.' : 'Neslihan Rina\'nın çizimini parmağıyla izliyor; gemi, rıhtım, ayva.',
            'Yarın ne yapacağımı bilmiyorum abi, diyor. ' + (['durust', 'sonra_durust'].includes(bayrak(d, 'kardesGecesi')) ? 'Sen bana hep doğruyu söyledin. Şimdi de söyle.' : 'Bir şey söyle; ne olursa.'),
          ],
          secenekler: [
            {
              etiket: 'Ne yaparsan yap, ben yanındayım. İmzalasan da, imzalamasan da.',
              etki: konus('neslihan', { artir: { neslihanBag: 1 } }),
              cevap: 'Neslihan başını omzuna yaslıyor. Josefstadt\'taki pencere, diyor. Buz çiçekleri. O gece de böyle oturmuştuk. Hatırlıyor musun?',
            },
            {
              etiket: 'Rivière\'den sana kalan her şeyi o adam bir kalemle alacak. Buna değer mi?',
              etki: konus('neslihan', { bayrak: { neslihanOfke: true } }),
              cevap: 'Neslihan\'ın gözleri parlıyor. Bana kalan şey kâğıt değil abi, diyor. Montaigne, Strauss, Fransızca. Onları kimse alamaz. Ama haklısın: o adamın kalemi benim geçmişimi silmeye kalkıyor. Buna kızmalıyım. Kızıyorum.',
            },
          ],
        },
      },
    },
    nermin23: {
      ad: 'Nermin',
      kosul: (d) => hakVar(d) && !bayrak(d, 'konustu_nermin'),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) => [
            'Nermin masanın ucunda, defteri dizinde. Bu masayı yazacağım, diyor. Bir gün. Kimse inanmayacak.',
            bayrak(d, 'nerminCevdet') ? 'Atkıyı Lozan\'dan sonra taktım, diyor; boynundaki gri yünü gösteriyor. Nisan ama akşamları serin.' : 'İstanbul\'a dönmek tuhaf, diyor. Burada her köşe bir haber gibi.',
            bayrak(d, 'madalya') === 'anlat'
              ? 'Madalyan hâlâ o sandığın dibinde mi, diye soruyor birden. Cihangir\'de, beş yıl önce söylemiştin. Bir gün çıkar onu. Taşıdığın çuvallardan ağır gelmiyorsa artık.'
              : bayrak(d, 'madalya') === 'sakla'
                ? 'Beş yıl önce bana doğrunun yarısını söylemiştin, diyor gülümseyerek. Öbür yarısını hâlâ bekliyorum, hamal.'
                : '',
          ].filter(Boolean),
          secenekler: [
            {
              etiket: 'Yarın sabah gazeten bir şey basabilir mi?',
              etki: (d) => konus('nermin', { bayrak: { nerminHazir: true } }),
              cevap: (d) =>
                bayrak(d, 'konustu_baba')
                  ? 'Nermin babanın masasına bakıyor; az önce onunla konuştuğunu görmüş. Baban anlatırsa ben yazarım, diyor. Gece yarısı dizerim, sabah altıda basarım. Ç\'si, Ğ\'si, Ş\'si babanın harfleriyle.'
                  : 'Nermin omuz silkiyor. Bir haberim olursa basarım, diyor. Ama önce bir haber gerek. Kimin hikâyesi?',
            },
            {
              etiket: 'Cevdet bu masayı görse ne derdi?',
              etki: konus('nermin', { artir: { nerminBag: 1 } }),
              cevap: 'Nermin gülüyor; atkısının ucuyla oynuyor. Kötü bir şiir yazardı, diyor. Çok kötü. Kayıkhane ile ayva reçelini kafiyeli yapmaya çalışırdı. Ve ben gülerdim. Gülüyorum, Cevdet.',
            },
          ],
        },
      },
    },
  },
};
