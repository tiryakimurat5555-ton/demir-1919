// Otuz beşinci bölüm: "İncir". İzmir, 14-18 Eylül 1925.
// Arka plan (gerçek): İzmir'in incir ve üzüm ihracatı, yangından üç yıl sonra yeniden kurulan şehir. Gerçek kişiler ve
// kurumlar konuşturulmaz; firmalar, ihale ve kişiler kurgudur.
// Kurgu: Bay Albrecht (34. bölüm) Vollmer adına İzmir incirini rehin senetleriyle bağlıyor; rehinler Pendle Ltd. adına.
// Pendle (1, 15, 20, 21, 22, 23; kural 4) yaşlı ve hasta; son gemisi Arethusa rıhtımda boş. Vollmer onun gemilerini almış
// (23); Pendle artık Vollmer'in borçlusu. Albrecht'in amacı Ekim'de Ankara'daki bir ihracat imtiyazı ihalesi: teminat
// İzmir incirinin rehni, sermaye Bursa'nın kozası ve Ankara'nın kinini.
// Kalıbı kır: gözetleme. Üç gece, dört yer; her gece bir yer seçilir (GECE_SAYISI 3). Sonra rıhtımda Arethusa.
// Karşılık verilen iplikler: vollmerAjan, pendleSonu, rahelKarar, hisseKarar, rizaKorku, nerminYemin, cemilRapor34.
// Yeni iplikler: neslihanMiras, pendleSon35, albrechtSonu.
import { BOLUM34 } from './bolum34';
import { bayrak, cikarimVar, delilVar, sayi } from '../oyun/motor';

export const GECE_SAYISI = 3;
const geceKaldi = (d) => sayi(d, 'gece35') < GECE_SAYISI;
const pendleKacmisti = (d) => String(bayrak(d, 'pendleSonu') || '').startsWith('kacti');

const izle = (yer, sahne) => (d) =>
  !geceKaldi(d) || bayrak(d, 'izlendi_' + yer)
    ? null
    : { sahne, bayrak: { ['izlendi_' + yer]: true }, artir: { gece35: 1 } };

export const BOLUM35 = {
  id: 'bolum35',
  ad: 'Otuz beşinci bölüm: İncir',
  baslangic: 'acilis',
  ilkMekan: 'kordon35',

  deliller: {
    ...BOLUM34.deliller,
    albrecht_defteri: {
      ad: 'Albrecht\'in cep defteri',
      tarif: 'Otel odasının masasında, açık bırakılmış: Ekim, Ankara: ihracat imtiyazı. Teminat: İzmir incir rekoltesinin rehni, Pendle Ltd. adına. Sermaye: Bursa koza, Ankara kinin. Altında: A. V. onayladı.',
    },
    rehin_senetleri: {
      ad: 'Rehin senetleri',
      tarif: 'İncir hanının kantarında bir deste senet: Aydın ve Ödemiş köylerinden üç yüz incirci, gelecek yılın mahsulünü Pendle Ltd.\'e rehin vermiş; faiz yüzde kırk. Ödemeyenin bahçesi rehinde.',
    },
    arethusa_gozlem: {
      ad: 'Arethusa',
      tarif: 'Pendle\'in son gemisi rıhtımda; ambar kapakları açık, ambar boş. Güvertede tekerlekli bir sandalyede yaşlı bir adam: Sir Henry Pendle. Yükleme yok. Rehin yalnızca kâğıtta.',
    },
    albrecht_takvimi: {
      ad: 'Rıza Bey\'in öğrendiği',
      tarif: 'Otelin eski kapıcısı, Rıza Bey\'in yirmi yıllık tanıdığı: Albrecht cuma gecesi Arethusa\'ya çıkacak; Pendle\'le imza için. Cumartesi sabahı Pire vapuruna bileti var.',
    },
  },

  cikarimlar: {
    ...BOLUM34.cikarimlar,
    imtiyaz: {
      a: 'albrecht_defteri',
      b: 'rehin_senetleri',
      ad: 'İmtiyazın teminatı',
      metin: 'Vollmer Ankara\'da bir ihracat imtiyazına girecek; teminatı üç yüz incircinin gelecek yılı. Senetler çökerse teminat çöker. Bursa\'nın kozası, Ankara\'nın kinini, İzmir\'in inciri: bir zincir.',
    },
  },

  olaylar: [
    { id: 'arethusa', kosul: (d) => sayi(d, 'gece35') >= GECE_SAYISI && d.mekan === 'kordon35', etki: { sahne: 'arethusa35' } },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Otuz beşinci bölüm bitti.' },
    { kosul: (d) => geceKaldi(d), metin: (d) => 'Gözetleme: ' + (GECE_SAYISI - sayi(d, 'gece35')) + ' gece kaldı. Her gece bir yer seç.' },
    { kosul: () => true, metin: 'Cuma gecesi. Rıhtıma, Arethusa\'ya.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_kordon',
      efekt: ['vapur_duduk'],
      baslik: '14 Eylül 1925, İzmir',
      paragraflar: (d) => [
        'Üç yıl sonra İzmir. Yangın yerinde boş arsalar, iskeleler, yeni çatılar. Kordon\'da incir mevsimi: hanların önünde kantarlar, sandıklar, kadınlar ve çocuklar ayıklama tezgâhlarında.',
        bayrak(d, 'vollmerAjan') === 'izmir'
          ? 'Bay Albrecht Ankara\'dan bu trenle gelmiş; Kordon\'daki bir otelde. Rıza Bey onu istasyonda görmüş; şapkasını çıkarmadan selam vermiş.'
          : 'Vollmer\'in adamının adını bilmiyorsun; Rıza Bey İzmir\'de Zürih çekiyle ödeme yapan tek otel müşterisini buldu: Bay Albrecht.',
        {
          birlikte: 'Neslihan Beyrut\'tan geldi; Rahel\'le bir kapıyı birlikte açmışlar. Yüzü yorgun, gözleri değil.',
          rahel: 'Neslihan Beyrut\'tan Rahel\'in mektubuyla geldi: Bir kapı açıldı. Yazdığı tek satır bu.',
          ayri: 'Neslihan İstanbul\'dan geldi. Rahel\'den haber yok; yalnızca bir kartpostal: Beyrut. Yazısız.',
        }[bayrak(d, 'rahelKarar')] || 'Neslihan İstanbul\'dan geldi.',
        {
          adli: 'Cemil Bey\'in raporu Ankara\'da amirini götürdü; Vollmer artık daha dikkatli. Doğrudan değil, Pendle\'in adıyla çalışıyor.',
          gazete: 'Taşhan\'daki tebeşir haberi İzmir gazetelerine de geçmiş. Vollmer artık daha dikkatli; Pendle\'in adıyla çalışıyor.',
          adsiz: 'Cemil Bey\'in raporu firmayı yaktı ama memurları korudu. Vollmer\'in Ankara\'da hâlâ dostları var.',
        }[bayrak(d, 'cemilRapor34')] || '',
        'Rıza Bey bir plan yapıyor: Üç gece. Dört yer. Her gece birini gözetleriz; cuma gecesi ne biliyorsak onunla gideriz.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'kordon35', bayrak: { ekip_riza: true, ekip_cemil: false, ekip_nermin: false } } }],
    },

    otel35: {
      ortam: 'ortam_otel',
      baslik: 'Otel, gece',
      paragraflar: [
        'Albrecht yemek salonunda; Rıza Bey onu bir İzmirli tüccarla oyalıyor. Sen arka merdivenden üçüncü kata çıkıyorsun.',
        'Oda düzgün; bir İsviçreli düzgünlüğü. Masada açık bir cep defteri. Ekim, Ankara: ihracat imtiyazı. Teminat: İzmir incir rekoltesinin rehni, Pendle Ltd. adına. A. V. onayladı.',
        'Merdivende ayak sesi. Defteri bıraktığın gibi bırakıp çıkıyorsun.',
      ],
      secenekler: [{ etiket: 'Sabah oldu', etki: { delil: ['albrecht_defteri'], mekan: 'kordon35' } }],
    },
    han35: {
      ortam: 'ortam_kemeralti',
      baslik: 'İncir hanı, gece',
      paragraflar: (d) => [
        'Gece yarısı han boş; yalnız kantarın başında bir adam, kolunun biri dirsekten aşağı yok. Seni tanıyor.',
        'Kadir. Altı yıl önce Ferrante\'nin hamalıydı; Aurora\'nın adını o vermişti. Şimdi kantar başı. Bunlar mı, diyor; kantarın altındaki çekmeceden bir deste senet çıkarıyor. Üç yüz incirci. Gelecek yılın mahsulü. Faiz yüzde kırk.',
        'Bu sene inciri sattılar, diyor Kadir. Seneye inciri değil bahçeyi satacaklar. Bir İngiliz şirketi; parası bir İsviçre bankasından.',
      ],
      secenekler: [{ etiket: 'Sabah oldu', etki: { delil: ['rehin_senetleri'], mekan: 'kordon35' } }],
    },
    gemi35: {
      ortam: 'ortam_guverte',
      baslik: 'Rıhtım, gece',
      paragraflar: (d) => [
        'Arethusa rıhtımda. Üç yıl önce bu gemiden yanan şehre bakmıştın. Şimdi ambar kapakları açık, ambar boş.',
        'Güvertede tekerlekli bir sandalye. Bir battaniye. Yaşlı bir adam: Sir Henry Pendle. ' +
          (pendleKacmisti(d) ? 'Üç yıl önce bu gemiyle kaçmıştı.' : 'Üç yıl önce bu gemiden indirilmişti; mahkemeden döndü.'),
        'Gece boyunca yükleme olmuyor. Rehin kâğıtta, diyorsun kendine. Gemi bir vitrin.',
      ],
      secenekler: [{ etiket: 'Sabah oldu', etki: { delil: ['arethusa_gozlem'], mekan: 'kordon35' } }],
    },
    kahve35: {
      ortam: 'ortam_kahve',
      baslik: 'Kahve, gece',
      paragraflar: (d) => [
        'Rıza Bey bir kahvenin arka masasında, yaşlı bir adamla tavla oynuyor. Otelin eski kapıcısı; yirmi yıl önce İstanbul\'da Rıza Bey\'in muhbiriymiş.',
        'Cuma gecesi, diyor ihtiyar zarı atarken. Alman, ya da her neyse, gemiye çıkacak. İngilizle imza. Cumartesi Pire vapuru.',
        {
          fark: 'Rıza Bey tavlayı topluyor. Bu adama bir zamanlar para verirdim, diyor sana. Şimdi tavla. Napoli\'de bana Fikri değilsin demiştin. Haklıydın; ama bazı geceler emin değilim.',
          'yanında': 'Rıza Bey tavlayı topluyor. Koltuk konusunu unutmadım, diyor. Adları birlikte sayacaktık. Bu gece bir ad daha: Albrecht.',
          sus: 'Rıza Bey tavlayı topluyor; bir şey söylemiyor. Napoli\'de de söylememişti.',
        }[bayrak(d, 'rizaKorku')] || 'Rıza Bey tavlayı topluyor.',
      ],
      secenekler: [{ etiket: 'Sabah oldu', etki: { delil: ['albrecht_takvimi'], mekan: 'kordon35' } }],
    },

    arethusa35: {
      ortam: 'ortam_guverte',
      baslik: 'Cuma gecesi, Arethusa',
      paragraflar: (d) => [
        'Arethusa\'nın kamarası. Pendle masanın başında, tekerlekli sandalyesinde; karşısında Albrecht, önünde bir dosya. Kapıda sen, Rıza Bey, Neslihan.',
        'Pendle sizi görünce gülümsüyor; yorgun, neredeyse memnun. Bay Demir, diyor. Üç yıl. Bu gece bir şey imzalayacaktım. İmzalamadan önce geldiniz; iyi.',
        cikarimVar(d, 'imtiyaz')
          ? 'Albrecht dosyayı kapatıyor. Teminat, diyorsun; üç yüz incircinin bahçesi. Ankara\'daki imtiyaz bunun üstüne kurulu.'
          : 'Albrecht dosyayı kapatıyor. Ne imzalanacağını tam bilmiyorsun; yalnızca kimlerin imzalayacağını.',
        bayrak(d, 'neslihanMiras') === 'borc'
          ? 'Neslihan dosyanın üstüne bir zarf koyuyor. Senetlerin bedeli, diyor. Kadir\'e ödedim. Üç yüz bahçe artık kimseye rehin değil.'
          : '',
        delilVar(d, 'arethusa_gozlem') ? 'Ambar boş, diyorsun Pendle\'e. Bu gemi bir vitrin.' : '',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Pendle\'e son gemilerini hatırlat: Vollmer onları aldı. Şimdi de seni bir vitrin yaptı.',
          kosul: (d) => cikarimVar(d, 'imtiyaz') || delilVar(d, 'arethusa_gozlem'),
          etki: { bayrak: { pendleSon35: 'tanik' } },
          sonra: 'arethusa35_son',
        },
        {
          etiket: 'Pendle\'i İzmir savcılığına teslim et. Senetlerle.',
          etki: { bayrak: { pendleSon35: 'teslim' } },
          sonra: 'arethusa35_son',
        },
        {
          etiket: 'Pendle\'i bırak. Yaşlı, hasta. Albrecht\'e bak.',
          etki: { bayrak: { pendleSon35: 'birak' } },
          sonra: 'arethusa35_son',
        },
      ],
    },
    arethusa35_son: {
      ortam: 'ortam_guverte',
      baslik: 'Kamara',
      paragraflar: (d) => [
        {
          tanik: 'Pendle uzun süre susuyor. Sonra Albrecht\'in dosyasını kendi önüne çekiyor. Columbia, diyor; Aurora, Santa Lucia. Hepsini Vollmer\'in parasıyla doldurdum, sonra Vollmer gemilerimi aldı. Bir İngiliz bir şeyi iyi bilir: kime borçlu olduğunu. Bana bir kâtip getirin. Ankara\'ya bir ifade yazacağım.',
          teslim: 'Rıza Bey kapıyı açıyor; iki polis. Pendle sandalyesini kendisi itiyor. Kapıda duruyor: Atkı, diyor; Nermin Hanım\'a selam söyleyin. Bir yemin etmişti; tuttu.',
          birak: 'Pendle sandalyesinde kalıyor. Gidin, diyor. Ben zaten gidiyorum; doktorlar kış demiyor. Albrecht ayağa kalkıyor.',
        }[bayrak(d, 'pendleSon35')] || '',
        delilVar(d, 'albrecht_takvimi')
          ? 'Albrecht kapıya yürüyor; Rıza Bey önünde. Pire vapurunuz yarın sabah, diyor Rıza Bey. Bu gece burada kalacaksınız. Albrecht ilk kez sesini yükseltmeden konuşuyor: Bankam sizi hatırlayacak.'
          : 'Albrecht kapıya yürüyor; kimse onu durdurmayı bilmiyor. Bir saat sonra bir motor Pire yoluna çıkıyor.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: (d) => ({ bayrak: { albrechtSonu: delilVar(d, 'albrecht_takvimi') ? 'yakalandi' : 'kacti' } }), sonra: 'son35' }],
    },
    son35: {
      ortam: 'ortam_kordon',
      baslik: '18 Eylül 1925, Kordon',
      paragraflar: (d) => [
        'Sabah. Kordon\'da incir sandıkları; kadınlar tezgâhlarda. Kadir kantarın başında.',
        bayrak(d, 'neslihanMiras') === 'borc'
          ? 'Üç yüz incirci bu yıl ilk kez senetsiz. Kadir sana el sallıyor; kolunun olmayan yarısıyla, alışkanlıkla.'
          : bayrak(d, 'neslihanMiras') === 'dokunma'
            ? 'Senetler hâlâ geçerli; ama sahibi tutuklu ya da kaçak. Kimin bahçesi kimin, bir mahkeme karar verecek.'
            : 'Neslihan parasıyla ne yapacağını henüz söylemedi. Senetler bir mahkemenin önünde.',
        {
          tanik: 'Pendle\'in ifadesi Ankara yolunda. Ekim\'deki imtiyaz ihalesinde bir İngiliz armatörünün sesi Vollmer\'e karşı konuşacak.',
          teslim: 'Pendle İzmir\'de tutuklu; bir hastane odasında. Atkıyı istemiş; kimse ne atkısı olduğunu anlamamış.',
          birak: 'Arethusa sabah boş halatlarıyla rıhtımda. Pendle güvertede; denize bakıyor.',
        }[bayrak(d, 'pendleSon35')] || '',
        bayrak(d, 'albrechtSonu') === 'yakalandi'
          ? 'Albrecht karakolda. Zürih\'ten bir telgraf geliyor: Banque Vollmer bu adamı tanımıyor.'
          : 'Albrecht Pire\'de. Zürih bir adam kaybetmedi; yalnızca bir şehir.',
        'Otuz beşinci bölümün sonu.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_kordon',
      ortamOran: 0.45,
      baslik: 'Otuz beşinci bölüm bitti',
      paragraflar: ['Kararların kaydedildi. Sırada otuz altıncı bölüm: İhale.'],
      secenekler: [
        { etiket: '36. bölüme geç', sonrakiBolum: 'bolum36' },
        { etiket: 'Ana menüye dön', anaMenu: true },
      ],
    },
  },

  mekanlar: {
    kordon35: {
      ad: 'Kordon',
      ortam: 'ortam_kordon',
      tarif: (d) =>
        'Rıhtım, incir hanları, oteller, kahveler. Rıhtımın ucunda Arethusa. ' +
        (geceKaldi(d) ? 'Bu gece nereyi gözetleyeceksin? Kalan gece: ' + (GECE_SAYISI - sayi(d, 'gece35')) + '.' : 'Gözetleme bitti. Cuma gecesi.'),
      nesneler: [
        { id: 'otel_iz', etiket: 'Albrecht\'in oteli', kosul: (d) => geceKaldi(d) && !bayrak(d, 'izlendi_otel'), incele: 'Albrecht\'in odası üçüncü katta.', etki: izle('otel', 'otel35') },
        { id: 'han_iz', etiket: 'İncir hanı', kosul: (d) => geceKaldi(d) && !bayrak(d, 'izlendi_han'), incele: 'Hanın kantarı gece de açık.', etki: izle('han', 'han35') },
        { id: 'gemi_iz', etiket: 'Arethusa', kosul: (d) => geceKaldi(d) && !bayrak(d, 'izlendi_gemi'), incele: 'Rıhtımın ucunda, ışıkları yanık.', etki: izle('gemi', 'gemi35') },
        { id: 'kahve_iz', etiket: 'Rıza Bey\'in kahvesi', kosul: (d) => geceKaldi(d) && !bayrak(d, 'izlendi_kahve'), incele: 'Rıza Bey bir tanıdığını bekliyor.', etki: izle('kahve', 'kahve35') },
      ],
      kisiler: ['neslihan35', 'riza35'],
      gecisler: [],
    },
  },

  kisiler: {
    neslihan35: {
      ad: 'Neslihan',
      giris: (d) => (bayrak(d, 'neslihanMiras') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: (d) =>
            [
              'Neslihan bir incir tezgâhının yanında; kadınların ellerine bakıyor. Beyrut\'ta bir kadını bir evden çıkardık, diyor. Ona para lazımdı. Bende para var, abi. Hep vardı.',
              bayrak(d, 'hisseKarar') === 'sat'
                ? 'Rainer\'in hisse parası. Rivière\'in parası. Hiç dokunmadım; elim yanar gibi.'
                : 'Viyana\'dan kalan biriktirdiklerim; Rivière\'in sahneye çıkarken verdikleri. Hiç dokunmadım.',
              delilVar(d, 'rehin_senetleri')
                ? 'Kadir\'in senetleri, diyor. Üç yüz bahçe. Benim param buna yeter mi?'
                : 'Bir şeye yarasın istiyorum. Neye, bilmiyorum.',
            ].join(' '),
          secenekler: [
            {
              etiket: 'Senetleri satın al. Üç yüz bahçe kimseye rehin olmasın.',
              kosul: (d) => delilVar(d, 'rehin_senetleri'),
              etki: { bayrak: { neslihanMiras: 'borc' }, artir: { neslihanBag: 1 } },
              cevap: 'Neslihan başını sallıyor. Rivière beni bir gemiden satın aldı, diyor. Ben de onun parasıyla bahçeleri bir gemiden geri alayım. Hesap kapanmaz; ama bir sayfa döner.',
            },
            {
              etiket: 'Para senin. Ne yapacağına sen karar ver; ben karışmam.',
              etki: { bayrak: { neslihanMiras: 'kendi' } },
              cevap: 'Neslihan gülümsüyor; biraz kırgın, biraz rahat. Hep böyle dersin, diyor. Bir gün bir şey söyle diye bekliyorum.',
            },
            {
              etiket: 'O paraya dokunma. Temiz değil; dokunduğun her şeyi kirletir.',
              etki: { bayrak: { neslihanMiras: 'dokunma' } },
              cevap: 'Neslihan bir süre susuyor. Ben de temiz değilim, diyor sonunda. Ama sen bana yine de elini uzattın. Sonra yüzünü çeviriyor.',
            },
          ],
        },
        sonra: {
          soz: 'Neslihan tezgâhtaki bir kadına incir ayıklamayı soruyor; kadın gülerek gösteriyor.',
          secenekler: [
            {
              etiket: 'Kordon\'a bak. Üç yıl önce burası yanıyordu.',
              kosul: (d) => !bayrak(d, 'izmirAni'),
              sonra: 'kordon',
            },
            { etiket: 'Tamam.' },
          ],
        },
        kordon: {
          soz: (d) =>
            [
              'Neslihan yeni yapılan binaların cephesine bakıyor; harçları hâlâ taze. Burada bir kahve vardı, diyor. Eylül\'de. Sonra hiçbir şey.',
              {
                neslihan: 'O gece benim sesime tutunmuştun, abi. Elin elimdeydi; titriyordu. Ben de titriyordum; sen fark etmedin.',
                cemil: 'O gece Cemil Bey\'in sesine tutunmuştun. Ben yanındaydım; beni duymadın. Kızmadım. Ama hatırlıyorum.',
                yalniz: 'O gece kimseye tutunmadın. Dişlerini sıktın, kalabalığın içinden yalnız çıktın. Ben arkandan seslendim; dönmedin.',
              }[bayrak(d, 'yanginAni')] || 'O gece ikimiz de bir şey görmüştük; hiç konuşmadık.',
            ].join(' '),
          secenekler: [
            {
              etiket: 'Ona o geceyi anlat: ne gördüğünü, neden döndüğünü.',
              etki: (d) => ({ bayrak: { izmirAni: 'anlat' }, artir: { neslihanBag: 1, travma: sayi(d, 'travma') > 0 ? -1 : 0 } }),
              sonra: 'sonra',
              cevap: 'Anlatıyorsun: rıhtımdaki atları, denize giren insanları, bir an Seddülbahir\'in suyunu gördüğünü. Neslihan dinliyor. Sonra elini tutuyor; bu kez titreyen sen değilsin. Söylediğin için teşekkür ederim, diyor. Üç yıl bekledim.',
            },
            {
              etiket: 'Ona sor: O gece sen ne gördün?',
              etki: { bayrak: { izmirAni: 'sor' }, artir: { neslihanBag: 1 } },
              sonra: 'sonra',
              cevap: 'Neslihan uzun süre susuyor. Bir kızın elini tuttum, diyor sonunda. On iki yaşında belki. Kalabalık bizi ayırdı. Adını sormadım. Her gece o eli düşünüyorum; Selanik iskelesinde kimse benim elimi tutmamıştı. Ben tuttum, ve bıraktım.',
            },
            {
              etiket: 'Geç bunu. İncirlere bak.',
              etki: { bayrak: { izmirAni: 'gec' } },
              sonra: 'sonra',
              cevap: 'Neslihan başını çeviriyor. Peki abi, diyor. İncirler.',
            },
          ],
        },
      },
    },
    riza35: {
      ad: 'Rıza Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            'Rıza Bey bastonuyla Kordon\'u ölçüyor. ' +
            (geceKaldi(d) ? 'Üç gece, dört yer, diyor. Hepsini göremeyiz; neyi bilmek istediğine karar ver.' : 'Gözetleme bitti, diyor. Ne biliyorsak o.'),
          secenekler: [{ etiket: 'Tamam Rıza Bey.' }],
        },
      },
    },
  },
};
