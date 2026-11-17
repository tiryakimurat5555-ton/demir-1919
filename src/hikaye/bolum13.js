// On üçüncü bölüm: "Satranç". İstanbul, 8-10 Ekim 1919.
// Viktor Rainer bir Avusturya maliye heyetinin içinde İstanbul'a gelir ve Arif'i Pera Palas'ta satranca çağırır.
// Asıl istediği bir imza: Rivière vasiyetiyle Bankhaus Rainer'deki hisselerini Neslihan'a bırakmıştır; ortaklar Rainer'e
// karşı o hisselerle oy verebilir. Yeni oynanış: üç hamlelik söz satrancı (avantaj). Doğru delil doğru anda.
// Arka plan (gerçek): 1919 sonbaharında İstanbul işgal altındaydı, hükümet değişti, Anadolu'da kongreler toplanıyordu.
// Bunlar yalnızca haber olarak geçer; gerçek kişiler kurguya karışmaz. Bütün kişiler ve olaylar KURGUDUR.
import { BOLUM12 } from './bolum12';
import { bayrak, cikarimVar, delilVar, sayi } from '../oyun/motor';

const TERK_SINIRI = 4; // üç hamlenin üçü de doğru olmalı (1 + 1 + 2)

export const BOLUM13 = {
  id: 'bolum13',
  ad: 'On üçüncü bölüm: Satranç',
  baslangic: 'acilis',
  ilkMekan: 'han',

  deliller: {
    ...BOLUM12.deliller,
    davetiye: { ad: 'Rainer\'in kartı', tarif: 'Kalın, krem rengi bir kart. Viktor Rainer. Arkasında Fransızca: Perşembe akşamı dokuzda, Pera Palas, satranç. Kızınızı da getirin, Mösyö Demir; onunla da konuşacaklarım var.' },
    imza_ani: { ad: 'Neslihan\'ın hatırladığı imza', tarif: 'Ekim 1918, Viyana. Rivière Neslihan\'ı bir notere götürdü. Neslihan okumadan üç kâğıt imzaladı. Rivière ona sarıldı: Artık kimse sana bir şey yapamaz, dedi.' },
    vasiyet: { ad: 'Saltiel\'in telgrafı', tarif: 'Selanik noterinden: Gaston Rivière vasiyeti, Ekim 1918. Bütün mal varlığım ve Bankhaus Rainer und Söhne\'deki yüzde otuz dört hissem kızım Neslihan Rivière\'e. Vasiyet Ocak\'ta açılmış; varis bulunamamış.' },
    whitlock_korku: { ad: 'Whitlock\'un sarhoş sözleri', tarif: 'Rainer\'in Viyana\'daki ortakları onu suçluyor: Aurora, Columbia, altmış sandık taş. Bir sonraki genel kurulda koltuğu gidebilir. Bir tek o kız. Kızın hisseleri.' },
    zurih: { ad: 'Whitlock\'un verdiği kâğıt', tarif: 'Zürih\'te bir banka, bir kasa numarası: 1908. Rainer\'in kendi defteri; örgütün kuruluşundan beri bütün kayıtları.' },
  },

  cikarimlar: {
    ...BOLUM12.cikarimlar,
    miras: {
      a: 'vasiyet',
      b: 'imza_ani',
      ad: 'Miras',
      metin: 'Rivière ölmeden iki ay önce Neslihan\'ı varisi yaptı. Bankhaus Rainer\'in üçte biri artık Neslihan\'ın. Rainer\'in İstanbul\'a getirdiği şey satranç tahtası değil: bir devir senedi. Bir imza istiyor.',
    },
    sallanan_koltuk: {
      a: 'whitlock_korku',
      b: 'rainer_bilgi',
      ad: 'Sallanan koltuk',
      metin: 'Dört imparatorluk battı, Rainer\'in bankası büyüdü. Ama bu yıl üç sevkiyat kaybetti. Ortakları bir suçlu arıyor. Neslihan\'ın hisseleri hangi tarafa giderse, Rainer\'in kaderi oraya gider. Güçlü görünen adam, aslında tahtada en sıkışık taş.',
    },
  },

  olaylar: [
    {
      id: 'satranc',
      kosul: (d) => cikarimVar(d, 'miras') && cikarimVar(d, 'sallanan_koltuk'),
      etki: { mekan: 'palas', sahne: 'satranc1' },
    },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'On üçüncü bölüm bitti.' },
    { kosul: (d) => !delilVar(d, 'imza_ani'), metin: 'Neslihan\'la konuş: Rainer ondan ne istiyor olabilir?' },
    { kosul: (d) => !delilVar(d, 'vasiyet'), metin: 'Galata telgrafhanesinden Selanik\'e, Saltiel Efendi\'ye telgraf çek.' },
    { kosul: (d) => !delilVar(d, 'whitlock_korku'), metin: 'Pera Palas\'ın barında Whitlock\'u bul.' },
    { kosul: () => true, metin: 'Bulduklarını soruşturma panosunda birleştir. Perşembe akşamı satranç.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_yagmur',
      baslik: '8 Ekim 1919, İstanbul',
      paragraflar: (d) => [
        'Sonbaharın ilk yağmuru. Galata\'nın yokuşlarından sular iniyor. Kahvelerde herkes aynı şeyi konuşuyor: hükümet değişti; Anadolu\'da kongreler toplandı; İtilaf devriyeleri her gün biraz daha sinirli.',
        'Kalafatçı Hanı\'nın kapısına sabah bir kart bırakılmış. Ohannes Usta iki parmağıyla tutup getiriyor; yanacakmış gibi.',
        'Viktor Rainer. Perşembe akşamı dokuzda, Pera Palas, satranç. Kızınızı da getirin, Mösyö Demir.',
        'Rıza Bey haberi bir gün önce almış: bir Avusturya maliye heyeti gelmiş, Düyun-u Umumiye ile görüşmek için. Heyetin başında yaşlı bir bankacı. Diplomatik pasaport. Dokunulmaz.',
        bayrak(d, 'altinKarar') === 'gazete'
          ? 'Nermin\'in gazetesi kapalı. Ama İstanbul\'da Rainer\'in adını duymayan kalmadı. Yine de geldi.'
          : 'Columbia\'nın otuz sandık altını İngiliz deposunda. Yine de geldi.',
        'Baban kartı eline alıp kokluyor. Lavanta değil, diyor. Sedir. Pahalı bir adam.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'han', delil: ['davetiye'], bayrak: { 'gorüldü_han': true } } }],
    },
    telgraf_bekle: {
      ortam: 'ortam_buro',
      baslik: 'Ertesi sabah',
      paragraflar: [
        'Bir gece, bir sabah. Telgrafhanenin tahta sırasında Nermin\'le bekliyorsunuz. Memur öğleye doğru bir zarf uzatıyor: Selanik.',
        'Saltiel Efendi uzun yazmış; tüccar cimriliğini bırakmış. Rivière\'in vasiyeti Ocak\'ta açılmış. Bütün mal varlığı ve Bankhaus Rainer\'deki yüzde otuz dört hisse: kızım Neslihan Rivière\'e. Varis bulunamamış. Noter hâlâ arıyormuş.',
        'Telgrafın sonunda bir satır daha: Rebeka çocuklara sizden söz ediyor. Ayva reçeli yaptı; birine gönderecek. Kime göndersin?',
      ],
      secenekler: [{ etiket: 'Devam', etki: { delil: ['vasiyet'] } }],
    },
    satranc1: {
      ortam: 'ortam_otel',
      baslik: 'Pera Palas, perşembe akşamı',
      paragraflar: [
        'Otelin küçük salonu. Şöminede ateş, pencerelerde yağmur, aşağıda Haliç\'in ışıkları. Bir masada satranç tahtası; fildişi ve abanoz taşlar.',
        'Viktor Rainer ayağa kalkıp Neslihan\'ın elini öpüyor. Madmazel. Gaston sizi çok severdi. Sonra sana dönüyor: Mösyö Demir. Oturun. Beyazlar sizin; misafirsiniz.',
        'Cemil Bey, Nermin ve Rıza Bey kapının yanında. Rainer\'in iki adamı öbür kapıda. Kimse silahına el atmıyor.',
        'Rainer ilk hamleni bekliyor, sonra kendi piyonunu sürerken konuşuyor. Babanız, diyor. Usta İsmail. 1908\'de bizim mühürlerimizi döktü. Bütün sevkiyatlarımızda onun eli var. İngilizlere bunu söylersem, işgal altındaki bir şehirde, bir silah kaçakçılığı şebekesinin ustası olarak ne olur sanırsınız?',
      ],
      secenekler: [
        {
          etiket: 'Nazım Bey\'in imzalı itirafını tahtanın yanına koy.',
          kosul: (d) => delilVar(d, 'nazim_itirafi'),
          etki: { artir: { avantaj: 1 }, bayrak: { hamle1: 'itiraf' } },
          sonra: 'satranc2',
        },
        {
          etiket: 'Babam o kalıbı sizden çaldı. Altmış sandığınızı da taşla doldurdu.',
          kosul: (d) => !!bayrak(d, 'sahteMuhur'),
          etki: { artir: { avantaj: 1 }, bayrak: { hamle1: 'kalip' } },
          sonra: 'satranc2',
        },
        { etiket: 'Bir şey söyleme. Taşını sür.', etki: { bayrak: { hamle1: 'sus' } }, sonra: 'satranc2' },
      ],
    },
    satranc2: {
      ortam: 'ortam_otel',
      baslik: 'Orta oyun',
      paragraflar: (d) => [
        bayrak(d, 'hamle1') === 'itiraf'
          ? 'Rainer kâğıda bakıyor; okumuyor bile. İmzayı tanıyor. Nazım, diyor. Kırk yıl imza attı, bir kez de kendi aleyhine attı. Bir fili kaybetmiş gibi başını sallıyor. Bu kâğıdın bir kopyası İngilizlerde, değil mi?'
          : bayrak(d, 'hamle1') === 'kalip'
            ? 'Rainer bir an duruyor. Sonra gülüyor; içten, neredeyse hayran. Taş, diyor. Altmış sandık taş. Ortaklarım hâlâ bunu konuşuyor. Babanız iyi bir usta, Mösyö Demir. Bir fili kaybetmiş gibi başını sallıyor.'
            : 'Taşını sürüyorsun. Rainer bekliyor; bir şey söylemeni. Söylemiyorsun. Hafifçe gülümsüyor. Sessizlik de bir hamledir, diyor. Ama kazandırmaz.',
        'Atını oynatıyor. Defter, diyor. Gaston\'un defteri. Siyakatla yazılmış, bir kızın el yazısıyla. Kimsenin okuyamayacağı bir dil. Bir defter ancak okunursa tehlikelidir.',
      ],
      secenekler: [
        {
          etiket: 'Defter ceketimin astarında. Okuyan da yanımda oturuyor.',
          kosul: (d) => bayrak(d, 'defterKarar') === 'sakla',
          etki: { artir: { avantaj: 1 }, bayrak: { hamle2: 'sakla' } },
          sonra: 'satranc3',
        },
        {
          etiket: 'İsimler gazetelerde. Ortaklarınız sizi değil, gazeteleri okuyor.',
          kosul: (d) => bayrak(d, 'defterKarar') === 'gazete',
          etki: { artir: { avantaj: 1 }, bayrak: { hamle2: 'gazete' } },
          sonra: 'satranc3',
        },
        {
          etiket: 'Defter Paris\'te. O çekmece bir gün açılacak.',
          kosul: (d) => bayrak(d, 'defterKarar') === 'fransiz',
          etki: { artir: { avantaj: 1 }, bayrak: { hamle2: 'fransiz' } },
          sonra: 'satranc3',
        },
        {
          etiket: 'Okuyan biri yeter. Neslihan her satırı ezbere biliyor.',
          etki: { artir: { avantaj: 1 }, bayrak: { hamle2: 'ezber' } },
          sonra: 'satranc3',
        },
        { etiket: 'Fili geri çek; savun.', etki: { bayrak: { hamle2: 'savun' } }, sonra: 'satranc3' },
      ],
    },
    satranc3: {
      ortam: 'ortam_otel',
      baslik: 'Son oyun',
      paragraflar: (d) => [
        bayrak(d, 'hamle2') === 'savun'
          ? 'Rainer senin geri çekilişini izliyor; memnun. Herkes bir gün savunmaya geçer, diyor.'
          : 'Rainer\'in eli bir an taşın üstünde duruyor. Sonra Neslihan\'a bakıyor; bu kez kibarlık yok gözlerinde.',
        'Vezirini sürüyor. Madmazel, diyor. Bir imza. Yalnızca bir. Gaston\'un hisselerini bana devredersiniz; karşılığında Viyana\'da bir saray kadar para. Ağabeyiniz, babanız, bu inatçı dostlarınız; hiçbiri bir daha benden haber almaz. İmzalamazsanız…',
        'Cümlesini bitirmiyor. Gerek görmüyor.',
        'Neslihan sana bakıyor. Senin hamlen, abi.',
      ],
      secenekler: [
        {
          etiket: 'Ortaklarınız size değil, Neslihan\'a oy verecek. Koltuğunuz onun elinde.',
          kosul: (d) => cikarimVar(d, 'miras') && cikarimVar(d, 'sallanan_koltuk'),
          etki: { artir: { avantaj: 2 }, bayrak: { hamle3: 'koltuk' } },
          sonra: 'satranc_son',
        },
        { etiket: 'Neslihan hiçbir şey imzalamayacak.', etki: { bayrak: { hamle3: 'ret' } }, sonra: 'satranc_son' },
      ],
    },
    satranc_son: {
      ortam: 'ortam_otel',
      baslik: 'Şah',
      paragraflar: (d) =>
        sayi(d, 'avantaj') >= TERK_SINIRI
          ? [
              'Rainer uzun süre tahtaya bakıyor. Sonra parmağının ucuyla kendi şahını devirir; abanoz taş fildişi kareye tıklıyor.',
              'Terk ediyorum, diyor. Mat değil. Ama mat gelecek; görebiliyorum. Yaşlı bir adam nerede durması gerektiğini bilmeli.',
              'Ayağa kalkıyor, Neslihan\'ın önünde eğiliyor. Gaston haklıymış, diyor. Sizi kimse koruyamaz; çünkü korunmaya ihtiyacınız yok. Sonra sana dönüyor: Bir kalaycının oğlu. Bu tahtaya oturmayı kim öğretti size?',
              'Bir ateşçi, diyorsun. Sabri. Onu sizin adamınız öldürdü.',
              'Rainer başını eğiyor; ilk kez hiçbir şey söylemeden.',
            ]
          : [
              'Rainer taşları bir süre daha oynatıyor; sonra durup tahtayı itiyor. Berabere, diyor. Şimdilik.',
              'Ayağa kalkıyor. Paltosunu adamlarından biri tutuyor. Madmazel, diyor Neslihan\'a. Bir hafta. Viyana\'da, notere. İmzanızı bekleyeceğim. Ağabeyinizin inadı sizi de yakmasın.',
              'Kapıdan çıkarken sana dönmüyor bile. Ama öbür kapıdaki adamlarından biri, Whitlock\'un oturduğu bara doğru yürüyor.',
            ],
      secenekler: [{ etiket: 'Devam', etki: (d) => ({ bayrak: { satrancSonu: sayi(d, 'avantaj') >= TERK_SINIRI ? 'terk' : 'berabere' } }), sonra: 'hisse_karari' }],
    },
    hisse_karari: {
      ortam: 'ortam_han',
      baslik: 'Gece yarısı',
      paragraflar: [
        'Kalafatçı Hanı. Ohannes\'in ocağının başında hepiniz. Yağmur dinmiş; damlardan su damlıyor.',
        'Neslihan dizlerinin üstünde vasiyetin kopyasını tutuyor. Yüzde otuz dört, diyor. Bir bankanın üçte biri. Bir babanın son hediyesi; o babaya baba diyebilir miyim, bilmiyorum.',
        'Baban ocağa bakıyor. Gerçek babana. Sana ne bırakabildim ki, diyor. Bir ayva ağacı. Bir ritim.',
        'Neslihan sana dönüyor. Ne yapayım abi? Senin dediğini yapacağım. Ama iyi düşün.',
      ],
      secenekler: [
        { etiket: 'İmzala, sat. Parayı al; hepimiz kurtulalım.', etki: { bayrak: { hisseKarar: 'sat' } }, sonra: 'whitlock13' },
        { etiket: 'İmzalama. Viyana\'da genel kurul iste; Rainer\'i kendi bankasından at.', etki: { bayrak: { hisseKarar: 'genelkurul' }, artir: { neslihanBag: 1 } }, sonra: 'whitlock13' },
        { etiket: 'Hisseleri bir vakfa bağışla: Eleni\'nin kliniği, yetimler, savaşın yaralıları.', etki: { bayrak: { hisseKarar: 'bagis' } }, sonra: 'whitlock13' },
      ],
    },
    whitlock13: {
      ortam: 'ortam_yagmur',
      baslik: 'Sabaha karşı',
      paragraflar: (d) => {
        const karar = bayrak(d, 'hisseKarar');
        return [
          karar === 'sat'
            ? 'Neslihan başını sallıyor. Satacağım, diyor. Ama bir şartla: Rainer\'in parasıyla Manastır\'daki evimizi yeniden yaptıracağım. Ayva ağacının etrafına.'
            : karar === 'genelkurul'
              ? 'Neslihan vasiyeti katlıyor. Viyana, diyor. Kendi bankasının masasında, kendi ortaklarının önünde. Gaston bana dört dil öğretti; şimdi kullanacağım.'
              : 'Neslihan gülümsüyor; uzun zamandır ilk kez. Eleni\'ye yazacağım, diyor. Rainer\'in parasıyla yaralılara bakılsın. Ateşi besleyen para, bir kez de söndürsün.',
          bayrak(d, 'satrancSonu') === 'terk'
            ? 'Sabaha karşı hanın kapısı çalınıyor. Islak, tıraşsız, şapkasız bir adam: Whitlock. Elinde bir zarf. Rainer terk etti, diyor; ilk kez sigarasız. Terk eden adam önce tanıkları temizler. Ben tanığım. Zarfı uzatıyor: Zürih, bir kasa numarası, 1908. Rainer\'in kendi defteri. Örgütün kuruluşundan beri her şey. Benim hayatımı kurtarın; bu sizin.'
            : 'Sabaha karşı Rıza Bey haberle geliyor. Tophane iskelesinde bir ceset çıkarmışlar: beyaz yazlık takım, panama şapka. Elias Whitlock. Rainer gitmeden önce tanıkları temizlemiş.',
        ];
      },
      secenekler: [{ etiket: 'Devam', etki: (d) => (bayrak(d, 'satrancSonu') === 'terk' ? { delil: ['zurih'], bayrak: { whitlockSonu: 'kacti' } } : { bayrak: { whitlockSonu: 'oldu' } }), sonra: 'son_sabah13' }],
    },
    son_sabah13: {
      ortam: 'ortam_rihtim',
      ortamOran: 0.5,
      baslik: '10 Ekim 1919',
      paragraflar: (d) => [
        'Sirkeci garında bir tren düdüğü. Viktor Rainer Avrupa\'ya dönüyor; diplomatik vagonunda, perdeleri kapalı.',
        'Rıhtımda Süleyman Kaptan yeni kayıkhanesinin kapısında oturmuş, ağ örüyor. Sana bakmadan konuşuyor: Bir balık ağı, diyor; ilmek ilmek. Bir ilmeği kaçırırsan bütün ağ boşalır. Sen o adamın ağını ilmek ilmek söktün evlat.',
        bayrak(d, 'whitlockSonu') === 'kacti'
          ? 'Cebinde Whitlock\'un zarfı. Zürih. 1908. Babanın kalıbı döktüğü yıl.'
          : 'Cebinde Rainer\'in krem rengi kartı. Arkasında, Pera Palas\'tan çıkarken birinin eklediği iki kelime: Zürih. 1908.',
        'Neslihan yanına geliyor. Gülce de. Nermin, Cemil Bey, Rıza Bey. Baban, Ohannes\'in ocağının başından elini sallıyor.',
        'Üçüncü kitap, diyorsun içinden. Zürih. Viyana. Rainer\'in kendi defteri. Ve Anadolu\'dan gelen haberler her gün biraz daha yüksek sesle.',
        'On üçüncü bölümün sonu.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_rihtim',
      ortamOran: 0.45,
      baslik: 'On üçüncü bölüm bitti',
      paragraflar: ['İkinci kitap burada kapanıyor: Kurşun Mühür\'den Satranç\'a. Sıradaki: Zürih. Kararların kaydedildi.'],
      secenekler: [{ etiket: 'On dördüncü bölüme geç', sonrakiBolum: 'bolum14' }, { etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    han: {
      ad: 'Kalafatçı Hanı',
      tarif: 'Yağmur avlunun taşlarını yıkıyor. Ohannes Usta\'nın ocağı yanıyor; baban yanında, bir bakır tasa kalay sürüyor. Yukarıda Neslihan\'ın penceresinde ışık.',
      nesneler: [
        {
          id: 'kart',
          etiket: 'Rainer\'in kartı',
          incele: 'Kalın, krem rengi kart. Sedir kokuyor. Arkasındaki yazı Fransızca, eğik, kusursuz. Kızınızı da getirin. Kızınız. Neslihan\'ı hâlâ bir babanın kızı sanıyor; ama hangi babanın?',
        },
      ],
      kisiler: ['neslihan', 'baba', 'cemil', 'nermin', 'riza'],
      gecisler: [
        { hedef: 'telgrafhane', etiket: 'Galata telgrafhanesine git' },
        { hedef: 'palas', etiket: 'Pera Palas\'a çık' },
      ],
    },
    telgrafhane: {
      ad: 'Galata telgrafhanesi',
      ortam: 'ortam_buro',
      tarif: 'Tahta sıralar, mors cihazlarının tıkırtısı, sansür memurunun masası. Her telgraf önce bir İngiliz çavuşunun elinden geçiyor.',
      nesneler: [
        {
          id: 'telgraf13',
          etiket: 'Selanik\'e telgraf',
          incele: (d) =>
            delilVar(d, 'vasiyet')
              ? 'Saltiel\'in telgrafı cebinde.'
              : 'Nermin telgrafı yazıyor; kısa ve masum görünsün diye: SALTİEL EFENDİ SELANİK STOP RİVİERE VASİYETİ NOTER STOP KİMİN ADINA STOP ARİF. Sansür çavuşu okuyup damgalıyor. Cevap ertesi sabah gelir, diyor memur.',
          etki: (d) => (delilVar(d, 'vasiyet') ? null : { sahne: 'telgraf_bekle' }),
        },
      ],
      kisiler: [],
      gecisler: [{ hedef: 'han', etiket: 'Hana dön' }],
    },
    palas: {
      ad: 'Pera Palas',
      ortam: 'ortam_otel',
      tarif: 'Mermer lobi, Avrupa\'dan gelen asansör, kadife koltuklar. İtilaf subayları, diplomatlar, mülteci Rus prensesleri. Barın köşesinde, bir viski kadehine eğilmiş, beyaz yazlık takımlı bir adam: Whitlock. Ekim\'de yazlık takım.',
      nesneler: [],
      kisiler: ['whitlock'],
      gecisler: [{ hedef: 'han', etiket: 'Hana dön' }],
    },
  },

  kisiler: {
    neslihan: {
      ad: 'Neslihan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Neslihan pencerenin önünde, yağmuru seyrediyor. Rainer beni istiyor, diyor. Neden? Ben artık hiçbir şeyin sekreteri değilim.',
          secenekler: [
            {
              etiket: 'Rivière sana Viyana\'da bir şey imzalattı mı?',
              kosul: (d) => !delilVar(d, 'imza_ani'),
              etki: { delil: ['imza_ani'] },
              sonra: 'ilk',
              cevap: 'Neslihan bir an düşünüyor. Sonra yüzü değişiyor. Ekim 1918, diyor. Ölmeden iki ay önce. Beni Viyana\'da bir notere götürdü. Üç kâğıt imzaladım; okumadım. Gaston okumamı istemedi. İmzalayınca bana sarıldı. Artık kimse sana bir şey yapamaz, dedi. O zaman anlamadım.',
            },
            { etiket: 'Bir şey yok. Dinlen.' },
          ],
        },
      },
    },
    baba: {
      ad: 'İsmail Usta',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Baban tası bırakıp sana bakıyor. O adam benim kalıbımı söyleyecek, diyor. İngilizlere. Söylesin. Ben bir kere sustum, altı yıl ödedim. Bir daha susmam.',
          secenekler: [{ etiket: 'Kimse seni almayacak baba.' }],
        },
      },
    },
    whitlock: {
      ad: 'Elias Whitlock',
      giris: (d) => (delilVar(d, 'whitlock_korku') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Whitlock kadehinden başını kaldırıyor. Gözleri kırmızı. İzmir\'deki o soğuk adamdan eser yok. Mister Demir, diyor; Nermin çeviriyor. Oturun. İçki? Hayır mı? Akıllısınız.',
          secenekler: [
            {
              etiket: 'Rainer neden kendisi geldi?',
              etki: { delil: ['whitlock_korku'] },
              sonra: 'sonra',
              cevap: 'Whitlock acı acı gülüyor. Çünkü korkuyor, diyor. Aurora, Columbia, altmış sandık taş. Viyana\'daki ortakları bir suçlu arıyor. Bir sonraki genel kurulda koltuğu gidebilir. Bir tek şey onu kurtarır: o kızın imzası. Kızın hisseleri. Kadehini bitiriyor. Ve suçlu bulunması gerekiyorsa, Mister Demir, ilk bakacakları yer benim.',
            },
          ],
        },
        sonra: {
          soz: 'Whitlock kadehini çeviriyor. Boston\'da bir annem var, diyor; kimseye değil. Tütün işinde olduğumu sanıyor.',
          secenekler: [{ etiket: 'İyi akşamlar.' }],
        },
      },
    },
    cemil: {
      ad: 'Cemil Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Cemil Bey bir satranç kitabını karıştırıyor. Paris\'te Café de la Régence\'ta oynardım, diyor. Bir şey öğrendim: Güçlü oyuncu tahtayı değil, karşısındakinin korkusunu oynar. Rainer\'in neyden korktuğunu bul.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
    nermin: {
      ad: 'Nermin Hanım',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Nermin bir kalemi çeviriyor. Bir bankacı neden bir kızla konuşmak ister? diyor. Çünkü kızda para vardır. Ya da imza. Saltiel Efendi\'ye bir telgraf çekelim; Selanik noterini o tanır.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
    riza: {
      ad: 'Rıza Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Rıza Bey şapkasının suyunu silkeliyor. Rainer\'in Amerikalısı Pera Palas\'ın barında, diyor. Üç gündür oradan kalkmıyor. Korkan adam içer. İçen adam konuşur.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
  },
};
