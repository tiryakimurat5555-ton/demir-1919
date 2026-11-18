// Kırkıncı bölüm: "Calle Junín". Buenos Aires, 23-26 Mart 1926.
// Kurgu: Ferrante'nin son günleri (San Isidro'da bir villa; yeğeni Tomás), Bruno'nun "iş bulma bürosu" (Calle Junín),
// La Boca'da bir pansiyon. Arka plan (gerçek): göçmen şehri Buenos Aires, La Boca'nın sac evleri, Dock Sud. Gerçek bir örgüt
// ya da kişi kullanılmadı; büro hiçbir din ya da toplulukla özdeşleşmez.
// Asıl karşıt Bruno (28, 30, 38, 39; kural 4). Ferrante (3. bölümden beri) ölüyor ve Neslihan'ı görmek istiyor.
// Kalıbı kır: ekip bölünür. Son gece iki kapı var; kimin hangisine gideceğini sen seçersin, göremediğin kapıyı başkası anlatır.
// Büyük açılım (Zehra ipliği, 29 → 38 → 39): Zehra Hanım 1913 baharında Selanik iskelesine kızını sormaya geldi;
// Bruno ona "tifo" dedi. Fikri'nin yalanı Bruno'nun ağzından çıkmış. Zehra 1913'te yaşıyordu.
// Karşılık verilen iplikler: testaKarar, neslihanNazli, rizaEkvator, cemilEkvator, zehraTelgraf.
// Yeni iplikler: nazliIceri, geceBolunme, ferranteSon40, brunoSon40, zehraIz.
import { BOLUM39 } from './bolum39';
import { bayrak, delilVar, sayi } from '../oyun/motor';

const rizaVar = (d) => !!bayrak(d, 'ekip_riza');
const nazliYaninda = (d) => bayrak(d, 'testaKarar') !== 'indir' && ['anlat', 'arif'].includes(bayrak(d, 'neslihanNazli'));
const yoldas = (d) => (rizaVar(d) ? 'Rıza Bey' : 'Cemil Bey');

export const BOLUM40 = {
  id: 'bolum40',
  ad: 'Kırkıncı bölüm: Calle Junín',
  baslangic: 'acilis',
  ilkMekan: 'boca40',

  deliller: {
    ...BOLUM39.deliller,
    davetiye40: {
      ad: 'Tomás Ferrante\'nin kartı',
      tarif: 'Kalın, krem rengi bir kart. Ferrante e Nipote, Dock Sud. Arkasında el yazısı: Amcam ölüyor. Hanımefendiyi görmek istiyor. San Isidro, perşembe gecesi. T. F.',
    },
    junin_gozlem: {
      ad: 'Calle Junín\'deki büro',
      tarif: 'İki katlı bir yapı. Camında: Agencia de Colocaciones. Gündüz kapısı kapalı; gece arka avluya her saat başı bir araba giriyor. Üst kattaki pencerelerin kepenkleri hep kapalı.',
    },
    kizlar_yeri: {
      ad: 'Nazlı\'nın gördükleri',
      tarif: 'Büronun bodrumu değil, arka avludaki depo: ranzalar, bir mangal, kilitli bir kapı. Yedi kız; ikisi Stella del Plata\'dan. Bruno her gece yarısı gelip sayıyor. Perşembe sabahı Rosario\'ya bir tren.',
    },
    despina_telgrafi: {
      ad: 'Despina\'nın telgrafı',
      tarif: 'Selanik\'ten, Despina: Florina hastanesinin 1912 defteri bulundu. Zehra, Manastırlı, kalaycı İsmail karısı. Tifo. Kabul Aralık 1912. Taburcu Şubat 1913. Yürüyerek, Selanik yoluna.',
    },
    ferrante_itirafi: {
      ad: 'Ferrante\'nin imzalı ifadesi',
      tarif: 'Titrek bir elle, İtalyanca, iki sayfa. 1908\'den 1926\'ya: sandıklar, kızlar, limanlar. Bruno\'nun adı her sayfada. Ve bir paragraf: 1913 baharında Selanik iskelesine kızını soran bir kadın geldi. Bruno ona tifo dedi.',
    },
  },

  cikarimlar: { ...BOLUM39.cikarimlar },

  olaylar: [],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Kırkıncı bölüm bitti.' },
    { kosul: (d) => !delilVar(d, 'junin_gozlem'), metin: 'Calle Junín\'deki büroyu gözetle. Perşembe gecesi San Isidro.' },
    { kosul: () => true, metin: 'Perşembe gecesi. Nazlı\'yla ve telgrafhaneyle işin bittiyse haritayı aç.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_rihtim',
      baslik: '23 Mart 1926, Buenos Aires',
      paragraflar: (d) => [
        'Dock Sud. Vinçler, tahıl çuvalları, İtalyanca bağıran hamallar. Yirmi yıl Karaköy\'de çuval taşıdın; bu rıhtımın kokusunu tanıyorsun.',
        {
          indir: 'Dokuz kız Montevideo\'da kaldı. Testa iskelede sana bakmıştı. Bruno biliyor; artık kimin geldiğini de biliyor.',
          izle: 'Testa önde, kızlar arkada; iki araba. Peşlerinden gidiyorsunuz. Arabalar Calle Junín\'de, iki katlı bir yapının arka avlusuna giriyor.',
          ihbar: 'Testa iskelede bir arabaya biniyor; gülümseyerek. Akşam pansiyonun kapısının altından bir kâğıt: Bienvenidos. B.',
        }[bayrak(d, 'testaKarar')] || 'Bruno bu şehirde bir yerde.',
        nazliYaninda(d)
          ? 'Nazlı yanında; bavulu elinde. Montevideo\'da inmedi. Ben sizinle kalacağım demişti. Kaldı.'
          : '',
        rizaVar(d)
          ? {
              birlikte: 'Rıza Bey iskelede bir an duruyor; dizleri. Yavaş yürürsem siz de yavaş yürürsünüz demiştin, diyor. Yürüyelim.',
              gorev: 'Rıza Bey iskelede kalabalığı tarıyor; kırk yıllık bir komiserin gözüyle. Bruno\'nun yüzü bende, diyor. Napoli\'den.',
              montevideo: 'Rıza Bey Montevideo\'da kaldı; ama sabah feribotla geldi. Arka kapı bende demiştim, diyor. Arka kapı burada.',
            }[bayrak(d, 'rizaEkvator')] || 'Rıza Bey yanında.'
          : 'Cemil Bey yanında; çantası elinde. Bir hekim bu şehirde her kapıdan girer, diyor; bir de hastaneye.',
        'İskelenin ucunda bir adam bekliyor. Otuz yaşlarında, iyi giyimli, yorgun. Tomás Ferrante, diyor; yeğeni. Bir kart uzatıyor. Amcam ölüyor. Neslihan Hanım\'ı görmek istiyor.',
        'Neslihan kartı alıyor. Uzun süre bakıyor. Sonra çantasına koyuyor.',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Devam',
          etki: (d) => ({ mekan: 'boca40', delil: ['davetiye40'], bayrak: { ekip_riza: rizaVar(d), 'gorüldü_boca40': true } }),
        },
      ],
    },

    gozlem40: {
      ortam: 'ortam_depo',
      baslik: 'Calle Junín',
      paragraflar: (d) => [
        'Karşı kaldırımda bir kahve. Üç gün, sabah akşam. ' + yoldas(d) + ' gazetesinin arkasından sayıyor.',
        'Camda: Agencia de Colocaciones. Gündüz kimse girmiyor, kimse çıkmıyor. Gece arka avluya her saat başı bir araba. Bir gece yarısı, sokak lambasının altında bir adam: kırk yaşlarında, kalın boyunlu, şapkası geride. Bruno.',
        bayrak(d, 'testaKarar') === 'izle'
          ? 'Stella del Plata\'nın kızları bu avludan girdi. Hiçbiri çıkmadı.'
          : 'Avluya kimin girdiğini göremiyorsun; yalnızca arabaların sesini duyuyorsun.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'boca40', delil: ['junin_gozlem'] } }],
    },

    telgraf40: {
      ortam: 'ortam_telgraf',
      baslik: 'Telgrafhane',
      paragraflar: (d) => [
        bayrak(d, 'zehraTelgraf') === 'telgraf'
          ? 'Gemiden çektiğiniz telgrafın cevabı gelmiş. Neslihan kâğıdı açıyor; okuyor; iki kez. Elleri titremiyor; sesi titriyor. Taburcu, diyor. Şubat 1913. Yürüyerek. Abi, annem o hastaneden yürüyerek çıktı.'
          : 'Neslihan Despina\'ya kendisi telgraf çekiyor; gemide çekmemiştiniz. Akşam cevap geliyor, beklenmedik bir hızla: Despina zaten aramaya başlamış. Neslihan okuyor. Taburcu, diyor. Şubat 1913. Abi, annem o hastaneden yürüyerek çıktı.',
        {
          gonder: 'Bir telgraf da Cemil Bey\'e; İzmir\'den. Cemil Bey okuyor, katlıyor, cebine koyuyor. Gülümsüyor; ilk kez bu yolculukta. Evet, diyor yalnızca. Tek kelime.',
          yuz: 'Cemil Bey telgrafhanede bir an duruyor; İzmir\'e yazmayı düşünüyor. Yazmıyor. Yüzüne sorarım, demişti.',
        }[bayrak(d, 'cemilEkvator')] || '',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'boca40', delil: ['despina_telgrafi'], bayrak: { zehraIz: 'taburcu' } } }],
    },

    // --- Gece: iki kapı ------------------------------------------------------
    gece40: {
      ortam: 'ortam_han',
      baslik: 'Perşembe gecesi',
      paragraflar: (d) => [
        'Perşembe. Pansiyonun dar odasında haritanın üstüne eğiliyorsunuz. San Isidro kuzeyde, trenle bir saat. Calle Junín şehrin ortasında.',
        delilVar(d, 'kizlar_yeri')
          ? 'Nazlı\'nın gördükleri: yedi kız, arka avludaki depo. Sabah Rosario treni. Bu gece değilse hiç.'
          : 'Avluda kaç kız var, bilmiyorsunuz. Ama gece yarısı Bruno orada olacak.',
        'Ferrante bu gece ölebilir. Bruno bu gece kızları götürebilir. İki kapı, bir gece.',
        'Neslihan sana bakıyor. Ferrante beni istiyor, diyor. Ama sen nereye gidersen ben de oraya gitmek istiyorum. Karar ver abi.',
      ],
      secenekler: [
        {
          etiket: 'Bölünelim. Neslihan Ferrante\'ye, ben Junín\'e.',
          etki: { bayrak: { geceBolunme: 'bolun' } },
          sonra: 'junin40',
        },
        {
          etiket: 'Birlikte Junín\'e. Ölen adam bekler; kızlar beklemez.',
          etki: { bayrak: { geceBolunme: 'junin' } },
          sonra: 'junin40',
        },
        {
          etiket: 'Birlikte San Isidro\'ya. Ferrante\'nin söyleyeceği her şeyi değiştirebilir.',
          etki: { bayrak: { geceBolunme: 'ferrante' } },
          sonra: 'ferrante40',
        },
      ],
    },

    junin40: {
      ortam: 'ortam_depo',
      baslik: 'Calle Junín, gece yarısı',
      paragraflar: (d) => [
        'Arka avlu. Bir araba, motoru çalışıyor. Deponun kapısı aralık; içeride mangal ışığı.',
        bayrak(d, 'testaKarar') === 'ihbar'
          ? 'Bruno seni bekliyor. Avlunun ortasında, iki adamıyla. Kapının altından bir kâğıt bırakmıştım, diyor; okudun mu? Bienvenidos.'
          : bayrak(d, 'testaKarar') === 'indir'
            ? 'Bruno bavul kapatıyor. Montevideo\'dan beri biliyorum, diyor; arkasını dönmeden. Dokuz kız. Yetmez mi?'
            : 'Bruno kızları sayıyor; sırtı sana dönük. Testa\'nın gülümsemesini hatırlıyorsun: bilmediğinizi sanıyordu.',
        rizaVar(d)
          ? bayrak(d, 'rizaEkvator') === 'montevideo'
            ? 'Rıza Bey avlunun öbür ucunda, sokak kapısında; arka kapı. Kimse oradan çıkamaz.'
            : 'Rıza Bey yanında. Bruno onu görünce bir an duruyor. Napoli, diyor. Polizia.'
          : 'Cemil Bey yanında; çantası elinde. İçeride bir kız öksürüyor.',
        delilVar(d, 'kizlar_yeri') ? 'Nazlı içeride, ranzalardan birinde; sana bakıyor, kıpırdamıyor. Yedi kız.' : 'Ranzalarda kızlar. Kaç tane, karanlıkta sayamıyorsun.',
        bayrak(d, 'geceBolunme') === 'junin' ? 'Neslihan arkanda. Bruno onu görünce gülümsüyor. Seni tanıyorum, diyor. Selanik. İskele. Büyümüşsün.' : '',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Kızlar. Önce kapıyı aç; Bruno kaçarsa kaçsın.',
          etki: { bayrak: { brunoSon40: 'kacti' } },
          sonra: 'junin40_son',
        },
        {
          etiket: 'Bruno. Üstüne yürü; on dört yıl.',
          etki: (d) => ({ bayrak: { brunoSon40: rizaVar(d) || delilVar(d, 'kizlar_yeri') ? 'yakalandi' : 'yarali' }, artir: { travma: 1 } }),
          sonra: 'junin40_son',
        },
        {
          etiket: 'Konuş. Calle Junín\'in sahibi Ferrante mi, sen mi?',
          etki: { bayrak: { brunoSon40: 'konustu' } },
          sonra: 'junin40_son',
        },
      ],
    },
    junin40_son: {
      ortam: 'ortam_depo',
      baslik: 'Avlu',
      paragraflar: (d) => [
        {
          kacti: 'Deponun kapısını açıyorsun. Kızlar çıkıyor; önce biri, sonra hepsi. Bruno arabaya atlıyor; motor zaten çalışıyordu. Avludan çıkarken pencereden sana bağırıyor: Kız kardeşine söyle, annesi de böyle kaçmıştı. Araba sokağın sonunda kayboluyor.',
          yakalandi: 'Bruno\'nun üstüne yürüyorsun. ' + (rizaVar(d) ? 'Rıza Bey\'in bastonu onun dizine iniyor; kırk yıllık bir komiserin bastonu.' : 'Nazlı ranzadan kalkıp deponun kapısını arkadan kilitliyor; Bruno kaçamıyor.') + ' Yere düşüyor. Sabaha karşı polis geliyor; bir komiser, İtalyan asıllı, Bruno\'yu tanıyor. Bunu yıllardır bekliyordum, diyor. Kanıtınız var mı? Var.',
          yarali: 'Bruno\'nun üstüne yürüyorsun. Adamlarından biri seni yere seriyor; kaburgan. Bruno bir an üstünde duruyor. Sonra gülüyor ve gidiyor. Kızlar kendi kendilerine çıkıyor; biri sana elini uzatıyor.',
          konustu: 'Bruno sigarasını yakıyor. Calle Junín benim, diyor. Ferrante yaşlı bir adam; o sandık satardı, ben kız. Sandık bitti; kız bitmez. Sonra kapıyı kendisi açıyor. Götür, diyor. Yarın başkaları gelir. Sen bir kişisin; liman büyük. Ve gidiyor; acele etmeden, Cenevre\'deki gibi.',
        }[bayrak(d, 'brunoSon40')] || '',
        bayrak(d, 'brunoSon40') === 'kacti' || bayrak(d, 'brunoSon40') === 'konustu'
          ? 'Annesi de böyle kaçmıştı. Ya da: yarın başkaları gelir. Bruno\'nun sesi kulağında kalıyor.'
          : '',
        'Sabah pansiyonda yedi kız, bir mangal, ' + yoldas(d) + '\'in kaynattığı çay.',
      ].filter(Boolean),
      secenekler: [
        { etiket: 'Devam', kosul: (d) => bayrak(d, 'geceBolunme') === 'bolun', sonra: 'ferrante40_anlat' },
        { etiket: 'Devam', kosul: (d) => bayrak(d, 'geceBolunme') !== 'bolun', sonra: 'ferrante40_haber' },
      ],
    },

    ferrante40: {
      ortam: 'ortam_kosk_ic',
      baslik: 'San Isidro',
      paragraflar: (d) => [
        'Nehrin kıyısında beyaz bir villa. Oda loş; ilaç ve çiçek kokusu. Ferrante yastıklara gömülmüş; seksen yaşında görünüyor, belki daha genç. Gözleri hâlâ o göz: Punta\'daki yazıhanedeki, Napoli\'deki.',
        rizaVar(d) ? '' : 'Cemil Bey nabzını yokluyor; başını iki yana sallıyor. Bu gece, diyor alçak sesle. En geç sabah.',
        'Ferrante Neslihan\'ı görünce elini kaldırıyor. Signorina. Size bir şey borçluyum. Bir ad değil; adları verdim, Cenevre\'de, Napoli\'de. Bir hikâye.',
        '1913 baharı, diyor. Selanik iskelesi. Bir kadın geldi; Manastırlı, zayıf, hastalıktan yeni kalkmış. Kızımı soruyorum, dedi. Neslihan. On yedi yaşında. Bruno ona baktı ve dedi ki: Tifo. Kızın tifodan öldü, hanım. Fikri Bey\'in kâğıdında öyle yazıyordu; Bruno da öyle söyledi. Kadın oturdu, iskelenin taşına. Sonra kalktı ve gitti.',
        'Neslihan kıpırdamıyor.',
        'Nereye gitti, bilmiyorum, diyor Ferrante. Bilmek istemedim. Bunu size borçluydum. Şimdi bir şey isteyeceğim: bu kâğıdı imzalayayım mı? Bütün limanlar, bütün yıllar. Yeğenim bilmesin istiyordum. Artık istemiyorum.',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'İmzala. Bir mahkeme okusun; adınla.',
          etki: { bayrak: { ferranteSon40: 'imza' }, delil: ['ferrante_itirafi'] },
          sonra: 'ferrante40_son',
        },
        {
          etiket: 'Neslihan karar versin. Bu onun borcu.',
          etki: (d) => ({ bayrak: { ferranteSon40: 'neslihan' }, delil: sayi(d, 'neslihanBag') >= 3 ? ['ferrante_itirafi'] : [], artir: { neslihanBag: 1 } }),
          sonra: 'ferrante40_son',
        },
        {
          etiket: 'Hiçbir şey imzalama. Bununla öl.',
          etki: { bayrak: { ferranteSon40: 'reddet' } },
          sonra: 'ferrante40_son',
        },
      ],
    },
    ferrante40_son: {
      ortam: 'ortam_kosk_ic',
      baslik: 'San Isidro, sabaha karşı',
      paragraflar: (d) => [
        {
          imza: 'Ferrante imzalıyor; harfler kâğıdın kenarından taşıyor. Tomás kapıda; duymuş. Bir şey söylemiyor. Sonra kâğıdı sana uzatan o oluyor.',
          neslihan: delilVar(d, 'ferrante_itirafi')
            ? 'Neslihan kâğıdı alıp Ferrante\'nin önüne koyuyor. İmzalayın, diyor. Annem için değil. Nazlı için. Ferrante imzalıyor.'
            : 'Neslihan kâğıda bakıyor; uzun uzun. Sonra yırtmadan masaya bırakıyor. Ben karar veremem, diyor. Ferrante imzalamıyor. Kâğıt masada kalıyor.',
          reddet: 'Ferrante kalemi bırakıyor. Anlıyorum, diyor. Bir iş adamına göre fazla adil. Gözlerini kapatıyor.',
        }[bayrak(d, 'ferranteSon40')] || '',
        'Ferrante sabaha karşı ölüyor. Nehrin üstünde kuşlar. Neslihan pencerede; sırtı sana dönük. Oturdu, diyor. İskelenin taşına. Sonra kalktı ve gitti. Annem kalktı, abi. Yaşıyordu.',
      ].filter(Boolean),
      secenekler: [
        { etiket: 'Devam', kosul: (d) => bayrak(d, 'geceBolunme') === 'ferrante', sonra: 'junin40_haber' },
        { etiket: 'Devam', kosul: (d) => bayrak(d, 'geceBolunme') !== 'ferrante', sonra: 'son40' },
      ],
    },

    // Göremediğin kapıyı başkası anlatır.
    ferrante40_anlat: {
      ortam: 'ortam_han',
      baslik: 'Pansiyon, sabah',
      paragraflar: (d) => [
        'Neslihan sabah dönüyor; tek başına, trenle. Kapıda duruyor. Ferrante öldü, diyor. Sonra oturuyor ve anlatıyor; sesi düz, bir zabıt kâtibi gibi.',
        '1913 baharı. Selanik iskelesi. Bir kadın geldi, kızını sordu. Bruno ona tifo dedi. Kadın iskelenin taşına oturdu; sonra kalktı ve gitti.',
        'Yalnızdım abi, diyor. Bunu yalnız duydum. Belki böyle olması gerekiyordu. Belki değil.',
        'Çantasından bir kâğıt çıkarıyor: Ferrante\'nin imzası. Annem için değil, diyor. Nazlı için imzalattım.',
      ],
      secenekler: [
        {
          etiket: 'Yanında olmalıydım.',
          etki: { bayrak: { ferranteSon40: 'neslihan', bolunmeCevap: 'ozur' }, delil: ['ferrante_itirafi'] },
          sonra: 'son40',
        },
        {
          etiket: 'Bunu sen duymalıydın. Senin annen; senin hikâyen.',
          etki: { bayrak: { ferranteSon40: 'neslihan', bolunmeCevap: 'onun' }, delil: ['ferrante_itirafi'], artir: { neslihanBag: 1 } },
          sonra: 'son40',
        },
      ],
    },
    ferrante40_haber: {
      ortam: 'ortam_han',
      baslik: 'Pansiyon, sabah',
      paragraflar: [
        'Öğlen Tomás Ferrante pansiyonun kapısında. Amcam sabaha karşı öldü, diyor. Sizi bekledi. Bir kâğıt imzalamak istiyordu; kimse gelmedi, imzalamadı.',
        'Bir zarf uzatıyor. Ölmeden önce bunu söyledi; ben yazdım, diyor. Neslihan zarfı açıyor. Tek satır: 1913 baharı, Selanik iskelesi; anneniz kızını sordu, Bruno tifo dedi. Kadın gitti; yaşıyordu.',
        'Neslihan zarfı göğsüne bastırıyor. Onu duymam gerekirdi, diyor. Kendi sesiyle. Ama kızlar kurtuldu. İkisi birden olmazdı, değil mi abi?',
      ],
      secenekler: [{ etiket: 'Olmazdı.', etki: { bayrak: { ferranteSon40: 'olu' } }, sonra: 'son40' }],
    },
    junin40_haber: {
      ortam: 'ortam_han',
      baslik: 'Pansiyon, sabah',
      paragraflar: (d) => [
        'Sabah La Boca\'ya dönüyorsunuz. Pansiyonun kapısında bir gazete: Calle Junín\'deki büro gece boşaltılmış. Rosario treninde yedi genç kadın. Bir araba, bir kalın boyunlu adam.',
        delilVar(d, 'kizlar_yeri')
          ? 'Nazlı yok. Pansiyonun sahibesi bir not uzatıyor; Nazlı\'nın eğri harfleriyle: Ben içerdeyim. Rosario. Gelin.'
          : 'Kızlar gitti. Bruno da.',
        'Neslihan gazeteyi katlıyor. Bir annem vardı, diyor; yaşıyordu. Bir de yedi kız. Hangisi daha önemliydi abi? Cevap verme.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { brunoSon40: 'gitti' } }, sonra: 'son40' }],
    },

    son40: {
      ortam: 'ortam_rihtim',
      baslik: 'Dock Sud',
      paragraflar: (d) => [
        'Rıhtım. Akşam. Bir İtalyan vapuru Cenova\'ya kalkmak üzere.',
        delilVar(d, 'despina_telgrafi')
          ? 'Despina\'nın telgrafı ile Ferrante\'nin sözleri yan yana: Şubat 1913, Florina\'dan yürüyerek çıktı. Bahar 1913, Selanik iskelesi; kızını sordu, tifo dendi; kalktı, gitti. Zehra Hanım yaşıyordu.'
          : 'Ferrante\'nin sözleri: Bahar 1913, Selanik iskelesi. Zehra Hanım yaşıyordu. Telgrafhaneye uğramadınız; Florina\'nın defterini bilmiyorsunuz.',
        delilVar(d, 'ferrante_itirafi') ? 'Ferrante\'nin imzalı ifadesi bavulunda. Bruno\'nun adı her sayfada.' : '',
        {
          yakalandi: 'Bruno Buenos Aires cezaevinde. Komiser bir mektup yazacağını söyledi; Cenevre\'ye.',
          kacti: 'Bruno kaçtı. Annesi de böyle kaçmıştı, demişti. Ne demek istedi?',
          konustu: 'Bruno kayıp. Yarın başkaları gelir, demişti.',
          yarali: 'Bruno kayıp. Kaburgan sızlıyor.',
          gitti: 'Bruno Rosario\'da, ya da başka bir yerde.',
        }[bayrak(d, 'brunoSon40')] || '',
        'Neslihan vapura bakıyor. Cenova, diyor. Oradan Selanik. Oradan Florina. Hangi yola yürüdü, abi? Bir kadın bir iskeleden kalkıp nereye gider?',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: (d) => ({ bayrak: { bolumBitti: true, zehraIz: bayrak_zehra(d) } }), sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_rihtim',
      ortamOran: 0.45,
      baslik: 'Kırkıncı bölüm bitti',
      paragraflar: ['Kararların kaydedildi. Sırada kırk birinci bölüm: İskele Taşı.'],
      secenekler: [
        { etiket: '41. bölüme geç', sonrakiBolum: 'bolum41' },
        { etiket: 'Ana menüye dön', anaMenu: true },
      ],
    },
  },

  mekanlar: {
    boca40: {
      ad: 'La Boca',
      ortam: 'ortam_han',
      tarif: (d) =>
        'Renkli sac evler, kalaycılar, tango çalan bir gramofon; pansiyonun penceresi Riachuelo\'ya bakıyor. ' +
        (delilVar(d, 'junin_gozlem') ? 'Perşembe gecesi geldi.' : 'Perşembeye üç gün var.'),
      nesneler: [
        {
          id: 'junin',
          etiket: 'Calle Junín\'deki büroyu gözetle',
          kosul: (d) => !delilVar(d, 'junin_gozlem'),
          incele: 'Karşı kaldırımdaki kahveye oturuyorsun.',
          etki: { sahne: 'gozlem40' },
        },
        {
          id: 'telgrafhane40',
          etiket: 'Telgrafhaneye git',
          kosul: (d) => !delilVar(d, 'despina_telgrafi'),
          incele: 'Avenida de Mayo\'daki telgrafhane.',
          etki: { sahne: 'telgraf40' },
        },
        {
          id: 'persembe',
          etiket: 'Perşembe gecesi. Haritayı aç',
          kosul: (d) => delilVar(d, 'junin_gozlem'),
          incele: 'Pansiyonun dar odası.',
          etki: { sahne: 'gece40' },
        },
      ],
      kisiler: ['nazli40', 'neslihan40', 'riza40', 'cemil40'],
      gecisler: [],
    },
  },

  kisiler: {
    nazli40: {
      ad: 'Nazlı',
      kosul: (d) => nazliYaninda(d),
      giris: (d) => (bayrak(d, 'nazliIceri') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Nazlı pansiyonun merdiveninde oturuyor; sözleşmesini katlayıp açıyor. O büroya beni de götüreceklerdi, diyor. Hâlâ alırlar. Bir kız daha. İçeri girerim, bakarım; kaç kız, nerede. Akşam çıkarım. Kimse beni tanımaz.',
          secenekler: [
            {
              etiket: 'Hayır. Seni oraya bir kez daha göndermem.',
              etki: { bayrak: { nazliIceri: 'hayir' } },
              cevap: 'Nazlı başını eğiyor. Annem de böyle derdi, diyor. Sonra beni bir gemiye bindirdi.',
            },
            {
              etiket: 'Git. Ama akşam ezan saatinde çıkmazsan biz gireriz.',
              etki: { bayrak: { nazliIceri: 'evet' }, delil: ['kizlar_yeri'] },
              cevap: 'Nazlı ertesi akşam dönüyor; dizleri titriyor ama sesi titremiyor. Yedi kız, diyor. Arka avluda. Perşembe sabahı Rosario treni. Bruno her gece yarısı sayıyor. Beni de saydı.',
            },
          ],
        },
        sonra: {
          soz: (d) => (bayrak(d, 'nazliIceri') === 'evet' ? 'Nazlı Neslihan\'ın yanında; çay içiyor. Yedi, diyor kendi kendine. Yedi.' : 'Nazlı pencereden Riachuelo\'ya bakıyor.'),
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
    neslihan40: {
      ad: 'Neslihan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'zehraIz')
              ? 'Neslihan telgrafı dizinin üstünde tutuyor. Yürüyerek, diyor. Ateşi düşmüş, yürüyerek çıkmış. Bir kadın tifodan kalkıp nereye yürür?'
              : 'Neslihan Tomás\'ın kartını çevirip duruyor. Ferrante beni istiyor, diyor. Napoli\'de bana bakamamıştı.',
          secenekler: [{ etiket: 'Perşembe.' }],
        },
      },
    },
    riza40: {
      ad: 'Rıza Bey',
      kosul: (d) => rizaVar(d),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Rıza Bey haritaya bastonuyla dokunuyor. Bir gece, iki kapı, diyor. Polislikte buna şanssızlık derler. Hep böyledir.',
          secenekler: [{ etiket: 'Tamam Rıza Bey.' }],
        },
      },
    },
    cemil40: {
      ad: 'Cemil Bey',
      kosul: (d) => !rizaVar(d),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Cemil Bey Tomás\'ın kartını eline alıyor. Ölen bir adam yalan söylemez derler, diyor. Yanlış. Ölen adam en güzel yalanı söyler. Ama bazen doğruyu da.',
          secenekler: [{ etiket: 'Göreceğiz.' }],
        },
      },
    },
  },
};

function bayrak_zehra(d) {
  return delilVar(d, 'despina_telgrafi') ? 'taburcu_iskele' : 'iskele';
}
