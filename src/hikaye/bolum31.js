// Otuz birinci bölüm: "Ninni". İskenderiye, 14-16 Temmuz 1924.
// Arka plan (gerçek): Mısır 1922'den beri adıyla bağımsız; İskenderiye Rum, İtalyan, Yahudi, Ermeni, Arap mahalleleriyle
// bir liman kenti. Gerçek kişiler konuşturulmaz; hastane ve kişiler kurgudur.
// Kurgu: Rahel (Serezli; listede, 28'de makbuzda "hâlâ orada", 29'da Melek'in ve Gennaro'nun andığı ninni), Rum hastanesinde
// hemşire. On iki yıldır kendisi de arıyor: elinde kendi listesi var. Dr. Eleni Mavrou (11, 18, 21, 22) aynı hastanede.
// Kalıbı kır: iz sürme + bir yüzleşme. Rahel kurtarılmayı beklemiyordu; Neslihan'a öfkeli ("sen operadaydın").
// Ninninin sırrı: ambarda Rahel'e o ninniyi on yedi yaşındaki Neslihan öğretmişti; annesi Zehra Hanım'ın ninnisi.
// Karşılık verilen iplikler: kurulSonu30, neslihanTanik, melekKarar, cemilRapor + cemilTanik (Eleni), neslihanTavsiye,
// cocukKarar (Zehra). Yeni iplikler: rahelKarar (iki liste nasıl birleşir), cemilEleni.
import { BOLUM30 } from './bolum30';
import { bayrak, cikarimVar, delilVar } from '../oyun/motor';

export const BOLUM31 = {
  id: 'bolum31',
  ad: 'Otuz birinci bölüm: Ninni',
  baslangic: 'acilis',
  ilkMekan: 'liman31',

  deliller: {
    ...BOLUM30.deliller,
    komsu_ifadesi: {
      ad: 'Attarin\'deki komşu',
      tarif: 'Makbuzdaki adresin karşısında tütüncü dükkânı işleten yaşlı Rum kadın: O ev on yıl önce kapandı. Kızlardan biri, Serezli olanı, bir gece kaçtı; sonra hemşire oldu, Rum hastanesinde. Adını değiştirmedi. Herkes ona Rahel der.',
    },
    rahel_listesi: {
      ad: 'Rahel\'in defteri',
      tarif: 'Rahel\'in on yıldır tuttuğu defter: İskenderiye, Kahire, Beyrut, Pire limanlarından duyduğu adlar. Altı kız: üçü yaşıyor, ikisi öldü, biri bilinmiyor. Makbuz defterinde olmayan iki ad daha: 1913 ve 1914 gemilerinden.',
    },
  },

  cikarimlar: {
    ...BOLUM30.cikarimlar,
    rahel_yeri: {
      a: 'makbuz_defteri',
      b: 'komsu_ifadesi',
      ad: 'Kaçan kız',
      metin: 'Makbuzda Rahel hâlâ Attarin\'deki evde. Ama o ev on yıl önce kapanmış; Rahel bir gece kaçmış ve hemşire olmuş. Ferrante\'nin defteri yalnızca satışları biliyor; kaçışları bilmiyor.',
    },
  },

  olaylar: [
    { id: 'rahel', kosul: (d) => cikarimVar(d, 'rahel_yeri') && d.mekan === 'hastane31' && !!bayrak(d, 'eleniGoruldu'), etki: { sahne: 'rahel31' } },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Otuz birinci bölüm bitti.' },
    { kosul: (d) => !delilVar(d, 'komsu_ifadesi'), metin: 'Makbuzdaki adrese, Attarin\'e git.' },
    { kosul: (d) => !cikarimVar(d, 'rahel_yeri'), metin: 'Makbuz defteriyle komşunun söylediklerini birleştir.' },
    { kosul: (d) => !bayrak(d, 'rahelKarar'), metin: 'Rum hastanesine git.' },
    { kosul: () => true, metin: 'Limana dön.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_iskenderiye',
      efekt: ['vapur_duduk'],
      baslik: '14 Temmuz 1924, İskenderiye',
      paragraflar: (d) => [
        'Sıcak. Liman feneri, palmiyeler, beyaz binalar. Rıhtımda Rumca, İtalyanca, Arapça, Ermenice; bir köşede iki hamal Türkçe küfrediyor. Neslihan gülüyor; ilk kez bir limanda.',
        {
          ad: 'Cenevre\'nin raporu bu sabah İskenderiye gazetelerinde de çıktı: C. Ferrante, Napoli. Liman memuru pasaportlarınıza bakarken başını kaldırıyor; okumuş.',
          genel: 'Cenevre\'nin raporunda Ferrante\'nin adı yoktu. Liman memuru pasaportlarınıza bakıyor; hiçbir şey okumamış.',
        }[bayrak(d, 'kurulSonu30')] || '',
        bayrak(d, 'neslihanTanik') === 'evet'
          ? 'Neslihan\'ın adı o raporda. Vapurda bir kadın onu tanıdı; bir şey demedi, yalnızca elini sıktı.'
          : '',
        'Cemil Bey de geldi. Ankara\'dan izin almak için bir yalan uydurmadım, diyor; ilk kez. İskenderiye\'de bir hastanede çalışan bir arkadaşımı göreceğim, dedim. Doğruydu.',
        'Makbuz defterinin İskenderiye sayfası: Rahel, Serez, on altı yaşında. Alıcı: Attarin\'de bir ev. Not: hâlâ orada.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Rıhtıma çık', etki: { mekan: 'liman31', bayrak: { 'gorüldü_liman31': true, ekip_cemil: true, ekip_riza: false, ekip_nermin: false } } }],
    },

    eleni31: {
      ortam: 'ortam_hastane',
      baslik: 'Eleni',
      paragraflar: (d) => [
        'Rum hastanesinin avlusu. Bir incir ağacı, beyaz önlüklü hemşireler. Ve merdivenin başında, gözlüklü, saçlarına ak düşmüş bir kadın: Dr. Eleni Mavrou.',
        'Eleni Cemil Bey\'i görüyor; merdivenin ortasında duruyor. İzmir\'den sonra Pire, sonra burası, diyor; Fransızca. Bir hekim nereye çağrılırsa.',
        {
          dogru: 'Kostas\'ın raporunu okudum, diyor. Yannis getirdi. Doğruyu yazmışsın. Bir Türk hekimin bir Yunan esiri için doğruyu yazması; bunu Pire\'de kimse inanmadı. Ben inandım.',
          sitma: 'Yannis Kostas\'ı anlattı, diyor. Raporda sıtma yazıyormuş. Sesinde bir suçlama yok; yalnızca yorgunluk. Ben de bir kere yazdım böyle bir şey, diyor sonra. Herkes bir kere yazar.',
          kendi: 'Kostas\'ın raporuna kendi adını yazmışsın, diyor. Nöbetçinin değil. Bir hekim kendini suçlarsa kimse hesap sormaz. Akıllıca. Ve korkakça. İkisi birden.',
        }[bayrak(d, 'cemilRapor')] || 'Cemil Bey bir şey söyleyemiyor.',
        bayrak(d, 'cemilTanik') ? 'Cenevre\'deki yazını da okudum, diyor. Kaza. İki yüz kere. Bunu bana İzmir\'de söylemiştin; şimdi herkese söyledin.' : '',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Cemil Bey, söyle ona. Ankara\'ya gelsin; bir hastane, iki hekim.',
          etki: { bayrak: { cemilEleni: 'birlikte' }, artir: { cemilBag: 1 } },
          sonra: 'eleni31_son',
        },
        {
          etiket: 'Bırak Cemil Bey konuşsun. Bir şey söyleme.',
          etki: { bayrak: { cemilEleni: 'mektup' } },
          sonra: 'eleni31_son',
        },
        {
          etiket: 'Cemil Bey\'i avluda bırak. Bu onların konuşması.',
          etki: { bayrak: { cemilEleni: 'veda' } },
          sonra: 'eleni31_son',
        },
      ],
    },
    eleni31_son: {
      ortam: 'ortam_hastane',
      baslik: 'Eleni',
      paragraflar: (d) => [
        {
          birlikte: 'Cemil Bey sana bakıyor; sonra Eleni\'ye. Söylediğini Fransızca tekrarlıyor; daha kötü bir aksanla, daha güzel. Eleni gülüyor; İzmir\'deki gibi. Ankara\'da deniz yok, diyor. Ama hekim lazım. Bir mevsim düşünürüm. Cemil Bey bir mevsimin bir ömürden uzun olduğunu bilen bir adam gibi başını sallıyor.',
          mektup: 'Uzun bir sessizlik. Sonra Cemil Bey konuşuyor; senin anlamadığın Fransızcayla, yavaş. Eleni bir şey cevap veriyor. Dönüşte Cemil Bey yalnızca şunu söylüyor: Mektup yazacağız. Her ay. Bu yaşta insan mektupla da yaşar.',
          veda: 'Avluda incirin altında bekliyorsun. Yarım saat sonra Cemil Bey yalnız çıkıyor. Gözlüğünü siliyor. Bir şey sormuyorsun. Bazı insanlar birbirine yetişemez, diyor sonunda. İzmir\'de de yetişemedik. Ama birbirimizi gördük. Bu da bir şey.',
        }[bayrak(d, 'cemilEleni')] || '',
        'Eleni avlunun öbür ucunu gösteriyor: çamaşır asan bir hemşire, otuzlarında, kısa saçlı. Rahel, diyor. Onu mu arıyorsunuz? Dikkat edin. Rahel aranmayı sevmez.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'hastane31', bayrak: { eleniGoruldu: true } } }],
    },

    rahel31: {
      ortam: 'ortam_hastane',
      baslik: 'Rahel',
      paragraflar: (d) => [
        'Rahel çamaşırı asmayı bitiriyor; sonra size dönüyor. Kollarını kavuşturuyor. Kim olduğunuzu biliyorum, diyor; Türkçesi sert, kırık. Cenevre\'deki raporu okudum. ' + (bayrak(d, 'neslihanTanik') === 'evet' ? 'Adını da okudum, Neslihan.' : 'Adın yoktu; ama biliyordum.'),
        'On iki yıl sen Viyana\'da operadaydın. Biz ambardaydık, sonra o evdeydik. Ben bir gece pencereden atladım; bacağım hâlâ topal. Kimse beni kurtarmadı. Ben kendimi kurtardım. Sonra ötekileri aramaya başladım.',
        'Önlüğünün cebinden kalın bir defter çıkarıyor. Altı ad, diyor. On yılda. Siz bir defterden okudunuz; ben her birini bir limanda, bir kahvede, bir hastane koğuşunda buldum.',
        bayrak(d, 'neslihanTavsiye') === 'ben'
          ? 'Neslihan sana bakıyor. Marsilya\'da kapıda durmuştun. Burada da duracak mısın, yoksa ilk kez ben mi konuşacağım?'
          : 'Neslihan bir şey söylemiyor. Yüzü bembeyaz.',
      ],
      secenekler: [
        {
          etiket: 'Neslihan cevap versin. Kendi kelimeleriyle.',
          etki: { bayrak: { rahelCevap: 'neslihan' } },
          sonra: 'rahel31_ninni',
        },
        {
          etiket: 'Araya gir: Neslihan da kurtarılmadı. Rivière onu satın aldı; bu kurtuluş değildi.',
          etki: { bayrak: { rahelCevap: 'arif' } },
          sonra: 'rahel31_ninni',
        },
      ],
    },
    rahel31_ninni: {
      ortam: 'ortam_hastane',
      baslik: 'Ninni',
      paragraflar: (d) => [
        bayrak(d, 'rahelCevap') === 'arif'
          ? 'Rahel sana dönüyor. Sen kimsin? Abisi mi? Sen de neredeydin? Neslihan elini senin koluna koyuyor; susturmak için değil, tutmak için. Haklı abi, diyor. Ben operadaydım.'
          : 'Neslihan bir adım atıyor. Haklısın, diyor. Ben operadaydım. Kimse beni zincirlemedi; altın bir kafes de kafes ama yine de altındı. Senden bir şey istemeye gelmedim. Sana bir şey borçluyum; ne olduğunu bilmiyorum.',
        'Rahel uzun süre ona bakıyor. Sonra kendi kendine, alçak sesle, bir ninni mırıldanmaya başlıyor. Türkçe. Eski, Rumeli ağzıyla. Dandini dandini dastana; danalar girmiş bostana.',
        'Neslihan donup kalıyor. Bu ninniyi, diyor; sesi kırılıyor. Annem söylerdi. Manastır\'da. Bize.',
        'Rahel başını sallıyor. Biliyorum, diyor. Ambarda sen bana öğrettin. On yedi yaşındaydın, ben on altı. Ağlıyordum. Sen yanıma oturdun, bunu söyledin. Üçüncü gün seni aldılar; Viyana\'ya. Ben on iki yıl her gece bunu söyledim. Melek de öğrendi; Marsilya\'da kimseye söylememiş, ama öğrendi.',
        bayrak(d, 'melekKarar') === 'anne'
          ? 'Melek annesini buldu, diyorsun. Tekirdağ\'da. Rahel bir an gözlerini kapatıyor. İyi, diyor. Biri buldu.'
          : bayrak(d, 'cocukKarar') === 'yanina'
            ? 'İstanbul\'da altı yaşında bir kız var, diyor Neslihan. Adını annemin adı koydum: Zehra. Ona da bu ninniyi söylüyorum. Rahel gülümsüyor; ilk kez.'
            : 'Neslihan bir şey diyemiyor. Rahel onun yanına oturuyor; on iki yıl önce ambarda olduğu gibi, ama yer değiştirmiş.',
      ],
      secenekler: [
        {
          etiket: 'İki defteri birleştirin. Rahel yönetsin; o on yıldır arıyor.',
          etki: { bayrak: { rahelKarar: 'rahel' }, delil: ['rahel_listesi'] },
          sonra: 'rahel31_son',
        },
        {
          etiket: 'İki defteri birleştirin. Neslihan ve Rahel birlikte; bir kapıya ikisi gitsin.',
          etki: { bayrak: { rahelKarar: 'birlikte' }, delil: ['rahel_listesi'], artir: { neslihanBag: 1 } },
          sonra: 'rahel31_son',
        },
        {
          etiket: 'Rahel\'in defteri onun kalsın. Bizimkini ona kopyalayalım; kendi yolunu kendisi bilir.',
          etki: { bayrak: { rahelKarar: 'ayri' } },
          sonra: 'rahel31_son',
        },
      ],
    },
    rahel31_son: {
      ortam: 'ortam_iskenderiye',
      efekt: ['vapur_duduk'],
      baslik: 'Liman feneri',
      paragraflar: (d) => [
        {
          rahel: 'Rahel defterleri yan yana koyuyor; kalemiyle bir sıra çiziyor. Önce Beyrut, diyor. Orada biri hâlâ ilk kocasıyla; kurtarılmak istemiyor, ama bir adres istiyor. Sonra Kahire. Neslihan dinliyor; not alıyor. On iki yıl sonra biri ona ne yapacağını söylüyor ve o buna seviniyor.',
          birlikte: 'Rahel ve Neslihan hastanenin avlusunda, incirin altında, iki defterin başında; gece yarısına kadar. Biri bir adı okuyor, öbürü bir şehri. Cemil Bey onlara çay taşıyor. Sen kapıda duruyorsun; bu kez kimse sana kapıda dur demeden.',
          ayri: 'Bütün gece Neslihan makbuz defterini Rahel\'in defterine kopyalıyor. Sabah Rahel defteri kapatıyor. Teşekkür etmiyor; sadece Neslihan\'ın elini bir an sıkıyor. Kendi yolum var, diyor. Ama artık ninnimin nereden geldiğini biliyorum.',
        }[bayrak(d, 'rahelKarar')] || '',
        'Limanda akşam. Fener yanıyor. Neslihan sana dönüyor. Annemin ninnisi, diyor. On iki yıl bir gemide, bir evde, bir hastanede yaşamış. Ben unutmuşum; o hatırlamış.',
        'Otuz birinci bölümün sonu.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_iskenderiye',
      ortamOran: 0.45,
      baslik: 'Otuz birinci bölüm bitti',
      paragraflar: ['Kararların kaydedildi. Sırada otuz ikinci bölüm: Pusula.'],
      secenekler: [
        { etiket: '32. bölüme geç', sonrakiBolum: 'bolum32' },
        { etiket: 'Ana menüye dön', anaMenu: true },
      ],
    },
  },

  mekanlar: {
    liman31: {
      ad: 'İskenderiye limanı',
      ortam: 'ortam_iskenderiye',
      tarif: 'Rıhtım, palmiyeler, tramvay zilleri. Doğuya doğru Attarin\'in dar sokakları; batıda Rum hastanesinin beyaz binası.',
      nesneler: [],
      kisiler: ['neslihan31', 'cemil31'],
      gecisler: [
        { hedef: 'attarin31', etiket: 'Attarin\'e, makbuzdaki adrese git' },
        { hedef: 'hastane31', etiket: 'Rum hastanesine git' },
      ],
    },
    attarin31: {
      ad: 'Attarin',
      ortam: 'ortam_iskenderiye',
      tarif: 'Eski eşyacılar, baharatçılar, kahveler. Makbuzdaki adreste kepenkleri kapalı, iki katlı bir ev. Karşısında bir tütüncü dükkânı.',
      nesneler: [
        {
          id: 'ev31',
          etiket: 'Makbuzdaki ev',
          incele: 'Kepenkler paslanmış. Kapının üstünde silinmiş bir tabela; bir zamanlar yaldızlıymış. İçeriden ses gelmiyor. On yıldır gelmiyor gibi.',
        },
      ],
      kisiler: ['tutuncu'],
      gecisler: [{ hedef: 'liman31', etiket: 'Limana dön' }],
    },
    hastane31: {
      ad: 'Rum hastanesi',
      ortam: 'ortam_hastane',
      tarif: 'Beyaz bir bina, bir avlu, bir incir ağacı. Hemşireler; Rumca, Fransızca, Arapça. Merdivenin başında gözlüklü bir kadın hekim.',
      nesneler: [
        {
          id: 'merdiven31',
          etiket: 'Merdivenin başındaki hekim',
          kosul: (d) => !bayrak(d, 'eleniGoruldu'),
          incele: 'Cemil Bey merdivenin dibinde duruyor; bir adım atamıyor.',
          etki: { sahne: 'eleni31' },
        },
      ],
      kisiler: [],
      gecisler: [{ hedef: 'liman31', etiket: 'Limana dön' }],
    },
  },

  kisiler: {
    neslihan31: {
      ad: 'Neslihan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'rahelKarar')
              ? 'Neslihan feneri izliyor. Dandini dandini, diye mırıldanıyor; sonra susuyor, sonra yine.'
              : 'Neslihan makbuz defterinin İskenderiye sayfasına bakıyor. Rahel, diyor. Melek bir ninni söylediğini hatırlıyordu. Gennaro da. Hangi ninni, merak ediyorum.',
          secenekler: [{ etiket: 'Bulacağız.' }],
        },
      },
    },
    cemil31: {
      ad: 'Cemil Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'cemilEleni')
              ? 'Cemil Bey palmiyelerin gölgesinde. Bu kentin havası bana iyi geliyor, diyor; yalan söylediğini ikiniz de biliyorsunuz.'
              : 'Cemil Bey Rum hastanesinin beyaz binasına bakıyor. Eleni orada, diyor. İzmir\'den sonra Pire, sonra burası. Bir mektubunda yazmıştı. Gitmeli miyim, bilmiyorum.',
          secenekler: [{ etiket: 'Gidelim Cemil Bey.' }],
        },
      },
    },
    tutuncu: {
      ad: 'Tütüncü kadın',
      giris: (d) => (delilVar(d, 'komsu_ifadesi') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Yaşlı bir Rum kadın; tezgâhın arkasında tütün yaprakları kesiyor. Karşıdaki evi soruyorsunuz. Bıçağını bırakıyor. O ev, diyor; Türkçesi İzmir ağzı. Ne arıyorsunuz orada?',
          secenekler: [
            {
              etiket: 'Bir kızı. Serezli. On iki yıl önce oradaydı.',
              etki: { delil: ['komsu_ifadesi'] },
              sonra: 'sonra',
              cevap: 'Kadın uzun süre bakıyor. O ev on yıl önce kapandı, diyor. Kızlardan biri, Serezli olanı, bir gece pencereden atladı. Bacağını kırdı. Ben sakladım; dükkânın arkasında, üç hafta. Sonra hemşire oldu; Rum hastanesinde. Adını değiştirmedi. Herkes ona Rahel der.',
            },
          ],
        },
        sonra: {
          soz: 'Tütüncü kadın yine yaprak kesiyor. Rahel\'e selam söyleyin, diyor. Bana hâlâ her bayram bir tatlı getirir.',
          secenekler: [{ etiket: 'Söyleriz.' }],
        },
      },
    },
  },
};
