// Otuz sekizinci bölüm: "Kar". Zürih, 14-16 Ocak 1926. Altıncı kitabın sonu.
// Kurgu: Banque Vollmer et Cie'nin olağanüstü genel kurulu (37. bölümde Klara'nın telgrafı). Albert Vollmer (15'ten beri;
// kural 4). Altıncı kitabın bütün sonuçları bir terazide: Bursa, Ankara, İzmir, Ankara ihalesi. AGIRLIK_ESIGI'ne ulaşırsa
// ortaklar Vollmer'i başkanlıktan düşürür. Gece Vollmer kendi hesap defterini kasa dairesinde yakmaya iner.
// Defterde 1912'den bir makbuz: Selanik iskelesi, "kız N.", alıcı G. R., aracı B. Bruno (28, 30) ve Ferrante Buenos Aires'te
// (30. bölüm brunoBilgi, kurulSonu30). Yedinci kitabın tohumu: Buenos Aires.
// Karşılık verilen iplikler: klaraTelgraf, vollmerIhale, nuriSon33, pendleSon35, albrechtSonu, cemilRapor34, neslihanMiras,
// rizaMezar, defterSonu, babaYuz.
// Yeni iplikler: konusmaci38, vollmerSon38, kasa38, buenosAires.
// Derinleştirme 16. adım: klaraLozan (tazminatSonu, 22), neslihanRahel (brunoSonu 28, rahelCevap 31), rizaKar (suleymanSon,
// arifCevap 32).
import { BOLUM37 } from './bolum37';
import { bayrak, delilVar, sayi } from '../oyun/motor';

export const AGIRLIK_ESIGI = 4;
export const agirlik38 = (d) =>
  (bayrak(d, 'vollmerIhale') === 'red' ? 1 : 0) +
  (bayrak(d, 'nuriSon33') === 'imza' ? 1 : 0) +
  (bayrak(d, 'pendleSon35') === 'tanik' ? 1 : 0) +
  (bayrak(d, 'albrechtSonu') === 'yakalandi' ? 1 : 0) +
  (bayrak(d, 'cemilRapor34') === 'adli' ? 1 : 0) +
  (bayrak(d, 'neslihanMiras') === 'borc' ? 1 : 0) +
  (bayrak(d, 'konusmaci38') === 'neslihan' && bayrak(d, 'neslihanRahel') === 'ad' ? 1 : 0) +
  (bayrak(d, 'konusmaci38') === 'klara' && bayrak(d, 'klaraLozan') === 'affet' ? 1 : 0) +
  sayi(d, 'konusma38');

const klaraYakin = (d) => !!bayrak(d, 'klaraYardim') || bayrak(d, 'rainerSonu') === 'serbest' || !!bayrak(d, 'klaraTanisti');

export const BOLUM38 = {
  id: 'bolum38',
  ad: 'Otuz sekizinci bölüm: Kar',
  baslangic: 'acilis',
  ilkMekan: 'zurih38',

  deliller: {
    ...BOLUM37.deliller,
    vollmer_defteri: {
      ad: 'Vollmer\'in hesap defteri',
      tarif: 'Kenarları yanık, deri ciltli bir defter. 1908\'den bu yana Albert Vollmer\'in kendi eliyle tuttuğu hesaplar. 1912, Kasım: Selanik iskelesi. Kız N. Alıcı G. R. Aracı B. Son sayfalarda her yıl aynı satır: Buenos Aires, F. ve B., yıllık ödeme.',
    },
    makbuz_sayfasi: {
      ad: 'Vollmer\'in verdiği sayfa',
      tarif: 'Vollmer\'in defterinden kendi eliyle kopardığı tek sayfa: Kasım 1912, Selanik iskelesi. Kız N., on yedi yaşında. Alıcı G. R. Aracı B., Napolili. Bedel ödendi. Altında Vollmer\'in el yazısıyla, yeni bir satır: B. hâlâ yaşıyor. Buenos Aires.',
    },
  },

  cikarimlar: { ...BOLUM37.cikarimlar },

  olaylar: [],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Otuz sekizinci bölüm bitti.' },
    { kosul: (d) => !bayrak(d, 'konusmaci38'), metin: (d) => 'Genel kurul yarın. Terazi: ' + agirlik38(d) + ' / ' + AGIRLIK_ESIGI + '. Kim konuşacak?' },
    { kosul: () => true, metin: 'Bankaya, genel kurula.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_zurih',
      baslik: '14 Ocak 1926, Zürih',
      paragraflar: (d) => [
        'Kar. Bahnhofstrasse\'nin ıhlamurları çıplak; göl kurşun rengi. Altı yıl önce burada Rivière\'in kasasını açmıştınız; iki yıl önce bir mezatta oturmuştunuz.',
        bayrak(d, 'klaraTelgraf') && bayrak(d, 'vollmerIhale') === 'red'
          ? 'Klara\'nın telgrafı cebinde: İhale reddedildi; Vollmer imtiyazsız geliyor. Gündemde tek madde: kuruluş defterinin geleceği.'
          : bayrak(d, 'klaraTelgraf') && bayrak(d, 'vollmerIhale') === 'kabul'
            ? 'Klara\'nın telgrafı cebinde: Vollmer imtiyazı teminat gösterip kredi isteyecek. Ankara\'nın bir sözleşmesi Zürih\'te bir masaya konacak.'
            : 'Klara\'nın telgrafı cebinde: On beş Ocak, olağanüstü genel kurul.',
        klaraYakin(d)
          ? 'Klara Rainer istasyonda bekliyor; Cenevre\'den. Dedemin bankası battı, diyor; Vollmer\'inki batmadı. Yarın bunu değiştirebiliriz.'
          : 'Klara Rainer\'in telgrafındaki otelde, lobide bir zarf: genel kurulun gündemi ve bir not. Kendimi tanıtmadığım için affedin; Cenevre\'de sizin raporlarınızı okudum.',
        bayrak(d, 'rizaMezar') === 'sus'
          ? 'Rıza Bey bastonsuz yürüyor; buzlu kaldırımda senin koluna girerek. Bir taşın yanına bıraktım, diyor. Zürih\'te yeni bir tane almayacağım.'
          : 'Rıza Bey bastonunu kara saplıyor; Gureba\'dan beri biraz daha dik yürüyor.',
        {
          yaninda: 'Neslihan\'ın cebinde Hüseyin Efendi\'nin oğlunun fotoğrafının bir kopyası; babası istemiş. Bunu oraya götür, demiş. Bir bankacıya bir yüz göster.',
          savun: 'Neslihan trende babasından söz etmedi. Bir kez yalnızca: Babam korunmak istemiyordu, abi. Biz onu yine de korumaya çalışıyoruz.',
          yalniz: 'Neslihan trende bir türkü mırıldandı; Manastır türküsü. Babamla Hüseyin Efendi\'nin söylediği, dedi.',
        }[bayrak(d, 'babaYuz')] || '',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'zurih38', bayrak: { ekip_riza: true, ekip_cemil: false, ekip_nermin: false } } }],
    },

    genel38: {
      ortam: 'ortam_genelkurul',
      efekt: ['tokmak'],
      baslik: '15 Ocak 1926, Banque Vollmer et Cie',
      paragraflar: (d) => [
        'Meşe paneller, yeşil çuha, on bir ortak. Vollmer başkan koltuğunda; bastonu masanın kenarında. Gündem tek madde: Başkanın Anadolu işleri.',
        {
          klara: 'Klara ayağa kalkıyor. Dedemin bankasının avukatıydım, diyor; şimdi tanığım. Bursa\'nın koza çeklerini, Ankara\'nın kinin çekini, İzmir\'in rehin senetlerini tek tek masaya koyuyor. Her birinin altında aynı imza: A. V.',
          neslihan: 'Neslihan ayağa kalkıyor. Ben Cenevre\'de konuşan kadınım, diyor. On yedi yaşında bu bankanın parasıyla bir iskeleden satıldım. Şimdi bu bankanın parası bir şehrin ipeğini, bir hastanenin kininini, üç yüz bahçeyi satın alıyor. Ortaklardan biri gözlerini kaçırıyor; sonra biri daha.' +
            ({
              ad: ' Sonra kâğıda bakmadan altı ad söylüyor; altı kız, altı liman. Salonda kimse kıpırdamıyor. Yedinci adı söylemiyor; herkes biliyor.',
              kendi: ' Yalnız kendi hikâyesi; Cenevre\'deki gibi, kısa ve düz.',
              sus: ' Bir an duraksıyor; sana bakıyor. Sonra devam ediyor. Konuşmamı istemiyordun, diyor salondaki herkese. Konuşuyorum.',
            }[bayrak(d, 'neslihanRahel')] || ''),
          riza: 'Rıza Bey ayağa kalkıyor; Almancası yok, Neslihan çeviriyor. Kırk yıl polislik yaptım, diyor. Bir kez dövdüm; bir çocuk öldü. O gün öğrendim: Delille. İşte deliller. Kâğıtları yavaşça, bir zabıt kâtibinin sabrıyla diziyor.',
        }[bayrak(d, 'konusmaci38')] || '',
        'Terazi: ' + agirlik38(d) + ' / ' + AGIRLIK_ESIGI + '. Ortaklar oylamaya geçiyor.',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Oyları say',
          etki: (d) => ({ bayrak: { vollmerSon38: agirlik38(d) >= AGIRLIK_ESIGI ? 'dusuruldu' : 'kaldi' } }),
          sonra: 'genel38_son',
        },
      ],
    },
    genel38_son: {
      ortam: 'ortam_genelkurul',
      baslik: 'Oylama',
      paragraflar: (d) => [
        bayrak(d, 'vollmerSon38') === 'dusuruldu'
          ? 'On bir ortaktan yedisi kalkıyor. Vollmer başkanlıktan düşürülüyor; yerine en genç ortak. Vollmer bastonunu alıyor, kimseye bakmadan çıkıyor. Kapıda sana dönüyor: Bir bankacı masasını kaybeder, diyor. Defterini kaybetmez.'
          : 'On bir ortaktan dördü kalkıyor; yetmiyor. Vollmer başkanlığını koruyor. Bastonunu masaya bir kez vuruyor. Anadolu bir ortaklıktır, diyor. Siz bir dedektif bürosunuz. İkisi aynı ağırlıkta değil.',
        {
          arsiv: 'Kuruluş defteri Bern\'de, Federal Arşiv\'de; Vollmer\'in elinde değil. Ama onun kendi defteri var; kendi hesapları.',
          satildi: 'Mezatta kuruluş defterini satın alan adsız alıcı kimdi? Klara fısıldıyor: Albrecht\'in temsil ettiği bir şirket. Yani Vollmer. Defteri kendi bankasından kendi parasıyla geri almış.',
          gazete: 'Kırmızı sayfalar iki yıl önce gazetelerdeydi; Vollmer onlardan kurtuldu. Kendi defterinden kurtulabilir mi?',
          yak: 'Kuruluş defteri Zürih\'te yanmıştı. Ama Vollmer\'in kendi defteri yanmadı. Henüz.',
        }[bayrak(d, 'defterSonu')] || 'Vollmer\'in kendi defteri var; kendi hesapları.',
        'Akşam Klara bir haber getiriyor: Vollmer bu gece bankanın kasa dairesine inecek. Bekçiye izin vermiş.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', sonra: 'kasa38' }],
    },
    kasa38: {
      ortam: 'ortam_banka',
      efekt: ['yangin'],
      baslik: 'Gece, kasa dairesi',
      paragraflar: (d) => [
        'Bankanın bodrumu. Çelik kapı aralık. İçeride bir mangal; yanında Vollmer, paltosuyla, elinde deri ciltli bir defter. Sayfaları birer birer koparıp ateşe atıyor.',
        'Sizi görünce durmuyor. Kırk yıl, diyor. Kırk yılın hesabı. Bir bankacı ölmeden önce defterini kapatır. Ben kapatmıyorum; yakıyorum.',
        'Bir sayfayı ateşe uzatırken duraklıyor; okuyor. Sonra Neslihan\'a bakıyor. Bu sizin, Mademoiselle, diyor. Bin dokuz yüz on iki.',
      ],
      secenekler: [
        {
          etiket: 'Defteri ateşten çek. Kalanı kurtar.',
          etki: { bayrak: { kasa38: 'kurtar' }, delil: ['vollmer_defteri'], artir: { travma: 1 } },
          sonra: 'kasa38_son',
        },
        {
          etiket: 'Neslihan konuşsun. Sayfayı ondan istesin.',
          etki: { bayrak: { kasa38: 'sayfa' }, delil: ['makbuz_sayfasi'], artir: { neslihanBag: 1 } },
          sonra: 'kasa38_son',
        },
        {
          etiket: 'Bırak yaksın. Gördüğün yeter; Klara\'nın kopyaları var.',
          kosul: (d) => klaraYakin(d),
          etki: { bayrak: { kasa38: 'birak' } },
          sonra: 'kasa38_son',
        },
      ],
    },
    kasa38_son: {
      ortam: 'ortam_banka',
      baslik: 'Mangal',
      paragraflar: (d) => [
        {
          kurtar: 'Mangalın üstüne atılıyorsun. Defter elinde; kenarları yanık, parmakların da. Bir an Seddülbahir; sonra Rıza Bey\'in eli omzunda. Vollmer geri çekilmiyor; yalnızca bakıyor. Kalan sayfalar: 1912, Kasım, Selanik. Ve son sayfalarda her yıl aynı satır: Buenos Aires, F. ve B.',
          sayfa: 'Neslihan bir adım atıyor. Bunu bana verin, diyor; Almanca, sakin. Vollmer bir süre bakıyor. Sonra sayfayı kendi eliyle defterden koparıp ona uzatıyor; kalanı ateşe atıyor. Altına bir satır ekledim, diyor. Yaşlı adamlar bir şey borçlu olduklarını bilir. Sayfada: Aracı B. Hâlâ yaşıyor. Buenos Aires.',
          birak: 'Bırakıyorsunuz. Defter yanıyor; sayfa sayfa. Vollmer son sayfayı ateşe atarken söylüyor: Bruno. Bir ad, diyor; size hediyem. Buenos Aires. Klara arkanda, kalemini çıkarıyor.',
        }[bayrak(d, 'kasa38')] || '',
        bayrak(d, 'kasa38') === 'kurtar'
          ? ({
              deniz: 'Otelde yanık sayfaları çeviriyorsun. Aralık 1918: G., Kalliope, ödeme iptal; not: denizde. Garnier\'nin adı bir hesabın kapandığı satırda.',
              zehir: 'Otelde yanık sayfaları çeviriyorsun. Aralık 1918: G., Kalliope, ödeme iptal; not: kendi kapsülü. Garnier\'nin adı bir hesabın kapandığı satırda.',
              tutuklu: 'Otelde yanık sayfaları çeviriyorsun. Aralık 1918: G., Kalliope, tutuklu. Sonra her yıl: G., Marsilya, yıllık ödeme. 1922: serbest. Garnier yaşıyor; Vollmer onu yedi yıl beslemiş.',
            }[bayrak(d, 'garnierSonuc')] || '')
          : '',
        bayrak(d, 'vollmerSon38') === 'dusuruldu'
          ? 'Sabah İsviçre savcılığından iki adam bankaya geliyor; Klara çağırmış. Vollmer onları kendi odasında, çayını içerek bekliyor.'
          : 'Sabah Vollmer bankasında, başkan koltuğunda. Ama artık bir defteri yok; ve siz bir adı biliyorsunuz.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { buenosAires: true } }, sonra: 'son38' }],
    },
    son38: {
      ortam: 'ortam_zurih',
      baslik: 'Göl kıyısı',
      paragraflar: (d) => [
        'Göl kıyısı. İki yıl önce burada bir gece, yanında Neslihan. Kar yağıyor; kuğular kıyıda.',
        'Neslihan elindeki kâğıda bakıyor; ya da yanık defterin bir sayfasına; ya da hiçbir şeye. B., diyor. İskelede beni kolumdan tutan adam. Adını hiç bilmedim. Şimdi biliyorum: Bruno.',
        bayrak(d, 'kurulSonu30') === 'ad' || bayrak(d, 'brunoBilgi')
          ? 'Cenevre\'de Bruno\'nun Buenos Aires\'e gideceğini duymuştunuz. Ferrante de orada; bir yeğen, bir şirket, bir liman.'
          : 'Buenos Aires. Ferrante de orada olmalı; Cenevre\'den sonra izini kaybetmiştiniz.',
        'Rıza Bey gölün öbür kıyısına bakıyor. Arjantin, diyor. Bir vapur kırk gün. Benim yaşımda bir adam Arjantin\'e gitmez. Kimse bir şey söylemiyor; söylemesi gerekmiyor.',
        'Altıncı kitabın sonu.',
        {
          yaz: 'Otelin resepsiyonunda Niğde damgalı bir mektup. Despina Hanım yazmış: Hafız Efendi\'nin hanımı sağken anlatırdı, diyor. Zehra Hanım\'ı Florina\'da bir hastane arabasına verdiler. Hafız Efendi arabanın gidişini gördü; ölümünü görmedi. Neslihan mektubu iki kez okuyor. Üçüncüsünde sesli.',
          suphe: 'Neslihan trende bir kelimeyi tekrarlıyor, sesini çıkarmadan: tifo. Marsilya\'dan beri. Melek\'in nüfus kâğıdında yazan kelime; annemizin ölümünde söylenen kelime.',
        }[bayrak(d, 'zehraSoru')] || '',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_zurih',
      ortamOran: 0.45,
      baslik: 'Otuz sekizinci bölüm bitti',
      paragraflar: ['Kararların kaydedildi. Yedinci kitap yazılıyor.'],
      secenekler: [{ etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    zurih38: {
      ad: 'Zürih, otel',
      ortam: 'ortam_zurih',
      tarif: (d) => 'Gölün kıyısında küçük bir otel. Pencerede kar. Yarın genel kurul. Terazi: ' + agirlik38(d) + ' / ' + AGIRLIK_ESIGI + '.',
      nesneler: [
        {
          id: 'banka38',
          etiket: 'Genel kurula git',
          kosul: (d) => !!bayrak(d, 'konusmaci38'),
          incele: 'Bahnhofstrasse. Banque Vollmer et Cie, 1867. Kapıcı başını eğiyor.',
          etki: { sahne: 'genel38' },
        },
      ],
      kisiler: ['klara38', 'neslihan38', 'riza38'],
      gecisler: [],
    },
  },

  kisiler: {
    klara38: {
      ad: 'Klara Rainer',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            'Klara ortakların listesini masaya yayıyor. On bir kişi; yedisi gerekir. Kim konuşacak yarın, diyor. Bir avukat mı, bir tanık mı, bir polis mi? Ortaklar her birine başka kulakla bakar. Terazi şimdi: ' +
            agirlik38(d) + ' / ' + AGIRLIK_ESIGI + '.',
          secenekler: [
            {
              etiket: 'Sen konuş Klara. Belgeleri sen sun.',
              kosul: (d) => !bayrak(d, 'konusmaci38'),
              etki: (d) => ({ bayrak: { konusmaci38: 'klara' }, artir: { konusma38: klaraYakin(d) ? 1 : 0 } }),
              cevap: (d) => (klaraYakin(d) ? 'Klara başını sallıyor. Dedem bunu benden beklemezdi, diyor. İyi.' : 'Klara bir an duraksıyor. Beni tanımıyorlar, diyor; sizi de. Ama denerim.'),
            },
            {
              etiket: 'Neslihan konuşsun. Yüzünü görsünler.',
              kosul: (d) => !bayrak(d, 'konusmaci38'),
              etki: (d) => ({ bayrak: { konusmaci38: 'neslihan' }, artir: { konusma38: bayrak(d, 'neslihanTanik') === 'evet' ? 1 : 0 } }),
              cevap: (d) => (bayrak(d, 'neslihanTanik') === 'evet' ? 'Neslihan Cenevre\'de konuşmuştu, diyor Klara. Bir kez konuşan ikincisinde titremez.' : 'Klara Neslihan\'a bakıyor. Cenevre\'de konuşmadınız, diyor. Burada konuşabilir misiniz? Neslihan cevap vermiyor.'),
            },
            {
              etiket: 'Rıza Bey konuşsun. Delille.',
              kosul: (d) => !bayrak(d, 'konusmaci38'),
              etki: (d) => ({ bayrak: { konusmaci38: 'riza' }, artir: { konusma38: bayrak(d, 'rizaMezar') && bayrak(d, 'rizaMezar') !== 'sus' ? 1 : 0 } }),
              cevap: 'Rıza Bey şapkasını düzeltiyor. Bir polis bankacılara ne söyler, diyor. Doğruyu. Yavaşça.',
            },
            {
              etiket: 'Lozan\'ı konuşalım. O masada karşı taraftaydın.',
              kosul: (d) => !!bayrak(d, 'tazminatSonu') && !bayrak(d, 'klaraLozan'),
              sonra: 'lozan',
            },
            { etiket: 'Sonra konuşuruz.', kosul: (d) => !!bayrak(d, 'konusmaci38') },
          ],
        },
        lozan: {
          soz: (d) =>
            ({
              red: 'Klara gözlüğünü çıkarıyor. Lozan\'da Pendle\'in dilekçesini ben yazdım, diyor. Kırk sandık, Kızılhaç, tazminat. Komisyon reddetti; sizin yüzünüzden. O akşam otelde ilk kez rahat uyudum. Avukat kaybedince uyumaz. Ben uyudum.',
              askida: 'Klara gözlüğünü çıkarıyor. Lozan\'daki dilekçe hâlâ askıda, diyor. Pendle\'in kırk sandığı; benim imzam. Bir gün biri dosyayı açarsa adım orada. Bunu bilerek mi geldim buraya? Evet.',
              inceleme: 'Klara gözlüğünü çıkarıyor. Lozan\'da kazandım, diyor; dilekçe incelemeye alındı. Kırk sandığın parasını Pendle alabilir. Masrafları Vollmer ödedi. Yarın o masrafın hesabını soracağım; kendi imzamla.',
            }[bayrak(d, 'tazminatSonu')] || 'Klara Lozan\'ı hatırlıyor.'),
          secenekler: [
            {
              etiket: 'Avukattın; işini yaptın. Yarın aynı taraftayız.',
              etki: { bayrak: { klaraLozan: 'affet' } },
              sonra: 'ilk',
              cevap: 'Klara gözlüğünü takıyor. Dedem de böyle derdi, diyor; işini yaptın. Ama o bir hırsızdı. Sizden duymak başka. Yarın konuşursam, bunu da söyleyeceğim.',
            },
            {
              etiket: 'Unutmadım. Yarın konuşurken sen de unutma.',
              etki: { bayrak: { klaraLozan: 'hatirlat' } },
              sonra: 'ilk',
              cevap: 'Klara başını sallıyor. Unutmam, diyor. Bir avukat neyi savunduğunu unutursa bir gün yine savunur.',
            },
            {
              etiket: 'Neden döndün? Dedenin bankası battı; Vollmer\'inki seni beslerdi.',
              etki: { bayrak: { klaraLozan: 'sor' } },
              sonra: 'ilk',
              cevap: 'Klara pencereye bakıyor. Cenevre\'de bir kadın gördüm, diyor; tanık sırasında. Adını bilmiyorum. Bana bakmadı bile. O akşam istifa mektubumu yazdım. Bazen bir yüz yeter.',
            },
          ],
        },
      },
    },
    neslihan38: {
      ad: 'Neslihan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            [
              'Neslihan pencerenin önünde; kar yağışını izliyor. Josefstadt\'ta da böyle yağardı, diyor. Rivière beni operaya götürürken.',
              {
                borc: 'İzmir\'de onun parasıyla üç yüz bahçeyi kurtardım. İlk kez o para bir şeye yaradı.',
                dokunma: 'İzmir\'de paraya dokunma demiştin. Dokunmadım. Hâlâ bir bankada; belki bu bankada.',
                kendi: 'Paramla ne yapacağıma hâlâ karar vermedim. Belki yarından sonra.',
              }[bayrak(d, 'neslihanMiras')] || '',
            ]
              .filter(Boolean)
              .join(' '),
          secenekler: [
            {
              etiket: 'Yarın ne söyleyeceksin?',
              kosul: (d) => !bayrak(d, 'neslihanRahel'),
              sonra: 'yarin',
            },
            { etiket: 'Yarın bitecek.' },
          ],
        },
        yarin: {
          soz: (d) =>
            [
              {
                riza: 'Napoli\'yi düşünüyorum, diyor. Bruno merdivenin başındaydı; Rıza Bey tek bir kelimeyle durdurdu. Bruno hâlâ bir yerde, abi. Yarın onun parasını ödeyen adamın karşısındayım.',
                kemal: 'Napoli\'yi düşünüyorum, diyor. Bruno pencerede duruyordu; atlamadı. Kemal\'in kayığı bizi aldı. Bruno hâlâ bir yerde, abi.',
                kavga: 'Napoli\'yi düşünüyorum, diyor. Merdivenden indiğinde ellerin titriyordu; saatlerce. Bruno\'yu yere serdin. Ama Bruno hâlâ bir yerde, abi.',
              }[bayrak(d, 'brunoSonu')] || 'Bruno\'yu düşünüyorum, diyor. Bir yerde, hâlâ.',
              {
                neslihan: 'İskenderiye\'de Rahel\'e kendi kelimelerimle cevap verdim. Ben kendimi kurtardım, demişti; ben kurtarılmadım. İkimiz de doğruyu söyledik.',
                arif: 'İskenderiye\'de Rahel\'e sen cevap vermiştin. Haklıydın; ama benim cevabımı vermedim. Yarın vermem gerek.',
              }[bayrak(d, 'rahelCevap')] || 'Cenevre\'den beri adımı söylemekten korkmuyorum. Ama yarın bir adı daha söylemem gerekebilir.',
              delilVar(d, 'rahel_listesi') ? 'Rahel\'in defteri yanımda. Altı ad. Onları da söyleyeyim mi?' : 'Yalnız kendimi mi anlatayım?',
            ].join(' '),
          secenekler: [
            {
              etiket: 'Rahel\'in altı adını da söyle. Bankacılar bir kızı değil, yedi kızı duysun.',
              kosul: (d) => delilVar(d, 'rahel_listesi'),
              etki: { bayrak: { neslihanRahel: 'ad' }, artir: { neslihanBag: 1 } },
              cevap: 'Neslihan defteri açıyor; adları dudaklarının arasında tek tek söylüyor. Ezberlemem gerek, diyor. Kâğıttan okursam bir liste olur. Ezberden söylersem insan olurlar.',
            },
            {
              etiket: 'Yalnız kendini anlat. Senin hikâyen yeter.',
              etki: { bayrak: { neslihanRahel: 'kendi' } },
              cevap: 'Neslihan başını sallıyor. Benim hikâyem, diyor. Cenevre\'deki gibi. Bir kez daha.',
            },
            {
              etiket: 'Hiçbir şey söylemek zorunda değilsin. Başkası konuşur.',
              etki: { bayrak: { neslihanRahel: 'sus' } },
              cevap: 'Neslihan sana uzun uzun bakıyor. Hep beni korumaya çalışıyorsun, diyor. Babam gibi. Bir gün izin vereceksin; ben de konuşurum.',
            },
          ],
        },
      },
    },
    riza38: {
      ad: 'Rıza Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            ({
              dua: 'Rıza Bey otelin penceresinden göle bakıyor. Gureba\'dan beri geceleri uyuyorum, diyor. Yirmi yedi yıl sonra.',
              tas: 'Rıza Bey cebinden bir kâğıt çıkarıyor: taşçının makbuzu. Suçsuzdu, diyor. Taşa yazdırmak kolaymış. Yirmi yedi yıl.',
              sus: 'Rıza Bey bastonsuz; elleri ne yapacağını bilmiyor. Bir baston bir ağırlık, diyor. Bıraktıktan sonra anlıyorsun.',
            }[bayrak(d, 'rizaMezar')] || 'Rıza Bey otelin penceresinden göle bakıyor.'),
          secenekler: [
            {
              etiket: 'Kaptanı düşünüyor musun?',
              kosul: (d) => !!bayrak(d, 'suleymanSon') && !bayrak(d, 'rizaKar'),
              sonra: 'kaptan',
            },
            { etiket: 'Tamam Rıza Bey.' },
          ],
        },
        kaptan: {
          soz: (d) =>
            [
              {
                ninni: 'Rıza Bey göle bakıyor. Kaptanın son sabahı, diyor. Neslihan ninni söylemişti; ben küreğe dayanmış ağlıyordum. Kırk yıllık komiser. Kimse görmedi sanıyordum.',
                anlat: 'Rıza Bey göle bakıyor. Kaptanın son sabahı, diyor. Sen ilk geceyi anlatmıştın: Sabri, denk, kahve. Ben o gece Cihangir\'de bir pencerede oturuyordum; senin geleceğini bilmeden. Yedi yıl.',
                sus: 'Rıza Bey göle bakıyor. Kaptanın son sabahı, diyor. Kimse konuşmamıştı; deniz konuştu. Ben hâlâ o sessizliği duyuyorum.',
              }[bayrak(d, 'suleymanSon')],
              {
                onlar: 'O gece ona neden aramayı bırakmadığını söyledin: onlar için. Ayva ağacı, bir ses.',
                kaptan: 'O gece ona neden aramayı bırakmadığını söyledin: onun için. İskelede yalnız kalmasın diye.',
                kendim: 'O gece ona neden aramayı bırakmadığını söyledin: kendin için. Gömülmemek için.',
              }[bayrak(d, 'arifCevap')] || '',
              'Ben neden bırakmadım, biliyor musun? Bilmiyorum. Yaşlandım, Arif. Bu iş bitince ne yapacağım?',
            ]
              .filter(Boolean)
              .join(' '),
          secenekler: [
            {
              etiket: 'Kayıkhanede kal. Kapıda bir polis lazım; aramayı bırakmayan biri.',
              etki: { bayrak: { rizaKar: 'kal' }, artir: { rizaBag: 1 } },
              cevap: 'Rıza Bey gülüyor; kar şapkasının kenarından düşüyor. Kapıcı komiser, diyor. Halim duysa mezarında döner. İyi. Dönsün.',
            },
            {
              etiket: 'Dinlen artık. Yeter, Rıza Bey. Gerçekten yeter.',
              etki: { bayrak: { rizaKar: 'dinlen' } },
              cevap: 'Rıza Bey bir süre susuyor. Kimse bana bunu söylememişti, diyor. Kırk yılda. Belki haklısın. Belki.',
            },
            {
              etiket: 'Son bir yolculuk daha. Nereye gidersek, benimle.',
              etki: { bayrak: { rizaKar: 'yol' }, artir: { rizaBag: 1 } },
              cevap: 'Rıza Bey eldivenlerini çıkarıp yeniden takıyor. Bir son daha, diyor. Hep bir son daha. Peki. Ama bu sefer bavulumu ben taşırım.',
            },
          ],
        },
      },
    },
  },
};
