// On birinci bölüm: "Kordon". İzmir, 5-11 Haziran 1919; işgalin ilk haftaları.
// Ferrante altmış sandık taşla kalmış, Rainer'in yeni adamı Whitlock'tan saklanıyor. Rainer'in "asıl sevkiyatı"
// Aurora vapuru: makineli tüfekler ve cephane, aynı aracıyla iki tarafa da satılacak.
// Dr. Eleni Mavrou (İzmirli Rum hekim) yaralıları ayırmadan tedavi eder; Cemil'in Paris'ten sınıf arkadaşı.
// Arka plan (gerçek): Yunan ordusu 15 Mayıs 1919'da İzmir'e çıktı; şehir çok dilli ve çok dinliydi; çıkarmanın ilk
// günlerinde kan döküldü ve iç bölgelerde silahlı çeteler çatışmaya başladı. Gerçek kişiler kullanılmadı.
// Hassasiyet: hiçbir topluluk kötü gösterilmez; örgüt herkese silah satar (belgeler/hikaye-plani.md).
// Kişiler (Ferrante, Whitlock, Eleni, Kadir, Stavros) ve olaylar KURGUDUR.
import { BOLUM10 } from './bolum10';
import { bayrak, cikarimVar, delilVar } from '../oyun/motor';

export const BOLUM11 = {
  id: 'bolum11',
  ad: 'On birinci bölüm: Kordon',
  baslangic: 'acilis',
  ilkMekan: 'kordon',

  deliller: {
    ...BOLUM10.deliller,
    aurora_adi: { ad: 'Yaralı hamalın sözleri', tarif: 'Kadir, Ferrante\'nin hamalı: Aurora diye bir vapur, on Haziran gecesi, Punta iskelesi. Taş sandıklar açılınca İtalyan efendi ağlamış. Amerikalı bir adam gelmiş; Kadir\'in koluna o vurmuş.' },
    whitlock_kaydi: { ad: 'Otel Levant\'ın defteri', tarif: 'Mr. Elias Whitlock, Amerikan Tütün Şirketi, Boston. 2 Haziran\'dan beri 21 numarada. Ziyaretçisi yok; telgrafları Viyana\'dan.' },
    ferrante_defteri: { ad: 'Ferrante\'nin hesap defteri', tarif: 'İtalyanca rakamlar ve siyakat satırları karışık. Siyakatı yalnızca Neslihan okuyabilir.' },
    iki_yana: { ad: 'Neslihan\'ın okuduğu satırlar', tarif: 'Aurora: kırk makineli tüfek, iki yüz sandık cephane. Yarısı dağdaki Rum çetelerine, yarısı Aydın yöresindeki Türk çetelerine. Aynı aracı, aynı fiyat. Ödeme Viyana\'ya. Kenarda bir not: Aurora\'nın navlunu Pire\'ye, H. P.\'ye.' },
  },

  cikarimlar: {
    ...BOLUM10.cikarimlar,
    aurora: {
      a: 'aurora_adi',
      b: 'iki_yana',
      ad: 'Aurora',
      metin: 'On Haziran gecesi Punta\'ya yanaşacak bir vapur, iki tarafı da silahlandıracak. Rainer\'in ateşi: iki komşu köyü birbirine düşürüp ikisine de aynı tüfeği satmak.',
    },
    yeni_adam: {
      a: 'whitlock_kaydi',
      b: 'rainer_bilgi',
      ad: 'Yeni Delorme',
      metin: 'Telgrafları Viyana\'dan gelen bir Amerikalı tütün temsilcisi. Delorme\'un yerine gelen adam. Rainer\'in yeni eli; daha sessiz, daha soğuk.',
    },
  },

  olaylar: [
    {
      id: 'gece',
      kosul: (d) => cikarimVar(d, 'aurora') && cikarimVar(d, 'yeni_adam'),
      etki: { mekan: 'kordon', sahne: 'gece_plani' },
    },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'On birinci bölüm bitti.' },
    { kosul: (d) => !bayrak(d, 'gecisIzni'), metin: 'Cemil Bey\'in eski arkadaşı Dr. Eleni\'nin kliniğine git.' },
    { kosul: (d) => !delilVar(d, 'aurora_adi'), metin: 'Klinikteki yaralı hamalla konuş.' },
    { kosul: (d) => !delilVar(d, 'ferrante_defteri'), metin: 'Ferrante\'yi bul. Yazıhanesine bak; sonra Kemeraltı.' },
    { kosul: (d) => !delilVar(d, 'iki_yana'), metin: 'Ferrante\'nin defterini Neslihan\'a okut.' },
    { kosul: (d) => !delilVar(d, 'whitlock_kaydi'), metin: 'Kordon\'daki otellere bak: Rainer\'in yeni adamı burada olmalı.' },
    { kosul: () => true, metin: 'Bulduklarını soruşturma panosunda birleştir.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_kordon',
      efekt: ['vapur_duduk'],
      baslik: '5 Haziran 1919, İzmir',
      paragraflar: (d) => [
        'Vapur Körfez\'e girerken güneş Kadifekale\'nin arkasından vuruyor. Kordon boyunca konsolosluklar, oteller, kahveler; Avrupa\'nın en güzel rıhtımlarından biri. Ama bayraklar yeni, askerler yeni, sessizlik yeni.',
        'Çıkarmanın ilk günü kan döküldü. Üç haftadır şehirde herkes birini kaybetmiş ya da birinden korkuyor. Türk mahallelerinde kepenkler yarı kapalı; Rum mahallelerinde bayraklar ve kuşku. Ermeni, Yahudi, Levanten esnaf her sabah dükkânını açıyor, akşam erken kapıyor.',
        bayrak(d, 'ferranteIpucu')
          ? 'Delorme İngiliz hücresinde konuştu: Ferrante İzmir\'de; asıl sevkiyat Haziran\'da. Rıza Bey o ifadeyi cebinde taşıyor.'
          : 'Ferrante İzmir\'de; altmış sandık taşla. Rainer\'in sabrı Delorme\'unkinden az değildir.',
        'Baban İstanbul\'da, Ohannes\'in ocağının başında kaldı. Neslihan yanında; Cemil Bey, Nermin, Rıza Bey de. Cemil Bey\'in cebinde bir adres: Dr. Eleni Mavrou. Paris\'te aynı amfide okudukları, kendisinden daha iyi bir hekim.',
      ],
      secenekler: [{ etiket: 'Rıhtıma çık', etki: { mekan: 'kordon', bayrak: { 'gorüldü_kordon': true, ekip_cemil: true, ekip_nermin: true, ekip_riza: true } } }],
    },
    gece_plani: {
      ortam: 'ortam_kordon',
      ortamOran: 0.6,
      baslik: '10 Haziran, akşam',
      paragraflar: (d) => [
        'Eleni\'nin kliniğinin damında, Körfez\'e bakarak. Güneş Karşıyaka\'nın arkasına iniyor. Punta iskelesinde fenerler yanmaya başlamış.',
        'Kırk makineli tüfek, diyor Cemil Bey. Bir makineli tüfek bir dakikada bir köyü boşaltır. Bunu Balkan Harbi\'nde gördüm.',
        'Eleni kollarını kavuşturmuş. Benim kliniğime iki taraftan da yaralı geliyor, diyor. Bu gemi boşalırsa koridorlara sığmazlar.',
        bayrak(d, 'ferranteGuven')
          ? 'Ferrante limandaki bir balıkçı kayığında bekliyor. Gece yarısı Aurora\'nın kaptanını o oyalayacak, sonra kaçacak. Sözünü tutarsa.'
          : 'Ferrante İtilaf kontrol bürosunun bodrumunda. Rıza Bey ifadesini aldı; Aurora\'nın yanaşma saatini, ambar planını, nöbetçileri.',
        'Rıza Bey saatine bakıyor. Gece yarısı yanaşacak, diyor. Ne yapacaksak ondan önce.',
      ],
      secenekler: [
        {
          etiket: 'İtilaf liman kontrol subayına ihbar et. Gemiyi onlar bassın.',
          etki: { bayrak: { auroraSonu: 'ihbar' } },
          sonra: 'punta_ihbar',
        },
        {
          etiket: 'Stavros\'un kayığıyla yanaş; ambarı su bastır.',
          etki: { bayrak: { auroraSonu: 'batti' } },
          sonra: 'punta_batir',
        },
      ],
    },
    punta_ihbar: {
      ortam: 'ortam_kordon',
      baslik: 'Punta, gece yarısı',
      paragraflar: [
        'İngiliz kontrol subayı Nermin\'in elindeki kâğıtlara bakıyor; sonra iskeleye. Bir İngiliz devriye botu, bir Fransız torpidosu, Yunan askerleri. Aurora yanaşır yanaşmaz projektörler yanıyor.',
        'Makineli tüfekler birer birer iskeleye indiriliyor. İtilaf mühürleriyle mühürleniyor. Kayda geçiyor.',
        'Nermin defterine yazıyor; sonra kalemi durduruyor. Bu tüfekler şimdi bir işgal ordusunun deposunda, diyor alçak sesle. Yarın kimin eline geçecek, kimse söylemiyor.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'whitlock' }],
    },
    punta_batir: {
      ortam: 'ortam_kayik',
      baslik: 'Aurora',
      paragraflar: [
        'Stavros\'un kayığı; Eleni\'nin hastası, yaşlı bir Rum balıkçı. Benim oğlum da dağda, diyor Stavros kürek çekerken. Hangi dağda bilmiyorum. Bu gemi oraya gitmesin.',
        'Aurora karanlıkta yanaşıyor. Rıza Bey ve sen kıç taraftan halata tırmanıyorsunuz. Makine dairesi, deniz suyu vanaları. Rıza Bey anahtarı çeviriyor: su fışkırıyor.',
        'Yarım saat sonra Aurora sığ suda, iskelenin dibinde, ambarı denizle dolu yan yatıyor. Kimse ölmedi. Kırk makineli tüfek tuzlu suda; cephane ıslak, işe yaramaz.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'whitlock' }],
    },
    whitlock: {
      ortam: 'ortam_kordon',
      efekt: ['silah'],
      baslik: 'Whitlock',
      paragraflar: (d) => [
        'İskelenin sonunda, ince bir sigara içen uzun boylu bir adam. Beyaz yazlık takım, panama şapka. Elias Whitlock. Sana bakıp gülümsüyor; bir hesap makinesinin gülümsemesi.',
        'Mister Demir, diyor kusursuz bir İngilizceyle; Nermin çeviriyor. Mister Rainer bunu tahmin etmişti. Sizi takdir ediyor. Bir sonraki sefer, diyor, daha büyük bir şey olacak. Ve sizi önceden haberdar etmeyeceğiz.',
        bayrak(d, 'ferranteGuven')
          ? 'Sonra Whitlock\'un eli ceketine gidiyor. Karanlıkta, bir balıkçı kayığında kürek çeken Ferrante\'ye nişan alıyor. Silah patlıyor. Kayık sallanıyor; ama kürekler durmuyor. Ferrante karanlığa, Körfez\'in ağzına doğru çekiyor. Yaşıyor. Sözünü tuttu.'
          : 'Sonra şapkasını hafifçe kaldırıp bir İtalyan yük vapuruna yürüyor. Kimse onu durdurmuyor; Amerikan pasaportu, Amerikan şirketi. Vapur gece yarısı demir alıyor.',
        'Whitlock\'un sigarası iskelenin kenarında hâlâ tütüyor.',
      ],
      secenekler: [{ etiket: 'Devam', etki: (d) => ({ bayrak: { ferranteSonu: bayrak(d, 'ferranteGuven') ? 'kacti' : 'tutuklu' } }), sonra: 'son_sayfa' }],
    },
    son_sayfa: {
      ortam: 'ortam_hastane',
      baslik: '11 Haziran, sabah',
      paragraflar: (d) => [
        'Eleni\'nin kliniğinde sabah. Koridorlarda yaralılar; bir Türk hamal, bir Rum bakkal, bir Ermeni çocuk. Eleni ve Cemil Bey gece boyu uyumamış.',
        bayrak(d, 'auroraSonu') === 'batti'
          ? 'Aurora sığ suda yan yatmış; çocuklar Kordon\'dan onu seyrediyor. Liman idaresi kazanın sebebini araştırıyor.'
          : 'Aurora\'nın yükü İtilaf depolarında. Gazeteler bir kaçakçılık vakasından söz ediyor; isim yok.',
        'Neslihan Ferrante\'nin defterinin son sayfalarını okuyor. Birden duruyor. Yüzü bembeyaz. Abi, diyor. Buraya bak.',
        'Siyakatla yazılmış eski bir satır, 1913 tarihli, İstanbul sayfasından buraya kopyalanmış: K. E., İstanbul gümrüğü, tasfiye. Onay: N. B.',
        'K. E. Kâmil Efendi. Gülce\'nin babası. "İmzala ve yaşa." İmzalamadı. N. B.: Nazım Bey. Maliye\'den. Mercure Kulübü\'nün 17 numaralı odasında öksüren yaşlı adam. Benim adım içinde değil, demişti. Benim rakamım içinde.',
        'Nazım Bey hâlâ İstanbul\'da. Hâlâ Maliye\'de.',
        'Nermin telgraf kâğıdını katlıyor. Gülce\'ye ne söyleyeceğiz? diyor.',
        'Gerçeği, diyorsun.',
        'On birinci bölümün sonu.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true, nazimBulundu: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_kordon',
      ortamOran: 0.45,
      baslik: 'On birinci bölüm bitti',
      paragraflar: ['Sıradaki: İstanbul, Gülce\'nin babasının hesabı. Kararların kaydedildi.'],
      secenekler: [{ etiket: 'On ikinci bölüme geç', sonrakiBolum: 'bolum12' }, { etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    kordon: {
      ad: 'Kordon',
      ortam: 'ortam_kordon',
      tarif: 'Uzun taş rıhtım, palmiyeler, atlı tramvay. Bir yanda deniz, bir yanda konsolosluklar ve oteller: Otel Levant, Kraemer, Sporting Kulüp. Köşe başlarında asker devriyeleri. Kemeraltı\'na giden sokakların ağzında bir nöbet yeri; geçenlerin kâğıtlarına bakılıyor.',
      nesneler: [
        {
          id: 'otel_levant',
          etiket: 'Otel Levant',
          incele: (d) =>
            delilVar(d, 'whitlock_kaydi')
              ? 'Resepsiyondaki Levanten kâtip artık seni tanıyor; başını eğiyor.'
              : 'Nermin muhabir kartını resepsiyona koyuyor; İtilaf basın izni. Levanten kâtip yeni gelen yabancıların listesini açıyor. Rıza Bey listeyi tersten okuyor: Mr. Elias Whitlock, Amerikan Tütün Şirketi, 21 numara. Telgrafları Viyana\'dan geliyor, diyor kâtip; omuz silkerek. Tütüncüler her yere telgraf çeker.',
          etki: (d) => (delilVar(d, 'whitlock_kaydi') ? null : { delil: ['whitlock_kaydi'] }),
        },
        {
          id: 'nobet',
          etiket: 'Nöbet yeri',
          incele: (d) =>
            bayrak(d, 'gecisIzni')
              ? 'Kolundaki Kızılhaç bandına bakıp geçirdiler. Nöbetçi genç bir asker; senden daha korkmuş görünüyor.'
              : 'Asker kâğıtlarına bakıyor, başını sallıyor: geçemezsin. Kemeraltı\'na yalnızca izinliler, hekimler ve hastabakıcılar giriyor.',
        },
      ],
      kisiler: ['neslihan', 'cemil', 'nermin', 'riza'],
      gecisler: [
        { hedef: 'klinik', etiket: 'Dr. Eleni\'nin kliniğine git' },
        { hedef: 'yazihane', etiket: 'Punta\'da Ferrante\'nin yazıhanesine git' },
        { hedef: 'kemeralti', etiket: 'Kemeraltı\'na geç', kosul: (d) => bayrak(d, 'gecisIzni') },
      ],
    },
    klinik: {
      ad: 'Dr. Eleni\'nin kliniği',
      ortam: 'ortam_hastane',
      tarif: 'Basmane yakınında, eski bir konaktan bozma küçük bir klinik. Avluda yaralılar, koridorda bekleyenler. Kimse kimseye nereli olduğunu sormuyor. Duvarda Kızılhaç bayrağı.',
      nesneler: [
        {
          id: 'kayit_defteri11',
          etiket: 'Hasta defteri',
          incele: 'Eleni\'nin kayıt defteri. Adlar Türkçe, Rumca, Ermenice, İbranice, Fransızca; hepsi aynı mürekkeple. 15 Mayıs sayfası iki sayfa sürüyor.',
        },
      ],
      kisiler: ['eleni', 'kadir'],
      gecisler: [{ hedef: 'kordon', etiket: 'Kordon\'a dön' }],
    },
    yazihane: {
      ad: 'Ferrante\'nin yazıhanesi',
      ortam: 'ortam_buro',
      tarif: 'Punta\'da bir depo binasının üst katı. Kapı kırılmış; dolaplar boşaltılmış, kâğıtlar yerlerde. Pencereden iskele görünüyor. Bir köşede açılmış bir sandık.',
      nesneler: [
        {
          id: 'tas_sandik',
          etiket: 'Açılmış sandık',
          incele: 'Sandığın içi taş ve kum dolu. Kenarındaki kurşun mührü çeviriyorsun: kanatlı anahtar. Ve kanadın ucunda, çekiçle vurulmuş küçük çentikler. Tak, tak-tak, tak. Babanın imzası. Gülümsememek için dudağını ısırıyorsun.',
        },
        {
          id: 'kagitlar',
          etiket: 'Yerdeki kâğıtlar',
          incele: (d) =>
            bayrak(d, 'ferranteYeri')
              ? 'Kâğıtların arasında başka bir şey yok.'
              : 'Faturalar, konşimentolar, İtalyanca mektuplar. Birinin arkasında, aceleyle yazılmış bir makbuz: Hacı Bekir Hanı, Kemeraltı, oda 4, bir haftalık. Ferrante, 3 Haziran. Kaçarken bırakmış.',
          etki: { bayrak: { ferranteYeri: true } },
        },
      ],
      kisiler: [],
      gecisler: [{ hedef: 'kordon', etiket: 'Kordon\'a dön' }],
    },
    kemeralti: {
      ad: 'Kemeraltı',
      ortam: 'ortam_kemeralti',
      tarif: 'Dar, gölgeli sokaklar; hanlar, bakırcılar, kahveler. Dükkânların yarısı kapalı. Bir kahvenin önünde yaşlı adamlar bir gazeteyi elden ele geçiriyor; kimse yüksek sesle konuşmuyor.',
      nesneler: [
        {
          id: 'kahvehane',
          etiket: 'Kahvenin önündeki yaşlılar',
          incele: 'Yaşlılardan biri gazeteyi katlayıp sana bakıyor. İstanbul\'dan mı? diyor. Orada ne diyorlar? Ne diyeceğini bilemiyorsun. Yaşlı adam başını sallıyor: Orada da kimse bir şey demiyor, değil mi?',
        },
        {
          id: 'han_kapisi',
          etiket: 'Hacı Bekir Hanı',
          kosul: (d) => bayrak(d, 'ferranteYeri'),
          incele: (d) =>
            bayrak(d, 'ferranteBulundu')
              ? 'Dördüncü odanın kapısı aralık.'
              : 'Merdivenlerden çıkıyorsun. Dördüncü odanın kapısını Rıza Bey eski bir komiser vuruşuyla çalıyor. Kapı aralanıyor; bir tabanca namlusu. Sonra namlu iniyor. Siz misiniz, diyor titrek bir ses. Ferrante.',
          etki: { bayrak: { ferranteBulundu: true } },
        },
      ],
      kisiler: ['ferrante'],
      gecisler: [{ hedef: 'kordon', etiket: 'Kordon\'a dön' }],
    },
  },

  kisiler: {
    eleni: {
      ad: 'Dr. Eleni Mavrou',
      giris: (d) => (bayrak(d, 'gecisIzni') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Kırk yaşlarında, kır saçlı, kolları dirseğe kadar kanlı bir kadın. Cemil Bey\'i görünce bir an duruyor; sonra Fransızca bir küfür ve sıkı bir sarılma. Cemil! Paris\'te bana kemik kırığı sardırmayı öğreten adam! Şimdi buraya bak. Kırık değil; şehir.',
          secenekler: [
            {
              etiket: 'Kemeraltı\'na girmemiz gerek.',
              etki: { bayrak: { gecisIzni: true } },
              sonra: 'sonra',
              cevap: 'Eleni bir çekmeceden Kızılhaç kol bantları çıkarıyor. Bunlar hekim ve hastabakıcılar için, diyor. Cemil bir hekim. Sizler de bu gece hastabakıcısınız. Yalan söylemiş olmayayım diye akşam gelip sedye taşıyacaksınız.',
            },
          ],
        },
        sonra: {
          soz: 'Eleni bir yarayı sarıyor, başını kaldırmadan konuşuyor. Bu şehirde herkes bir taraf seçti, diyor. Ben yaralıları seçtim. Onlar taraf değiştirmez.',
          secenekler: [{ etiket: 'Sağ ol Eleni.' }],
        },
      },
    },
    kadir: {
      ad: 'Yaralı hamal Kadir',
      kosul: (d) => bayrak(d, 'gecisIzni'),
      giris: (d) => (delilVar(d, 'aurora_adi') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Sedyede, kolu sargılı, iri yarı bir hamal. Ferrante efendinin hamalıyım, diyor. Daha doğrusu idim. Cemil Bey sargıyı açıp bakıyor; kurşun yarası, temiz geçmiş.',
          secenekler: [
            {
              etiket: 'Kim vurdu seni?',
              etki: { delil: ['aurora_adi'] },
              sonra: 'sonra',
              cevap: 'Sandıklar açılınca İtalyan efendi ağladı, diyor Kadir. Taş, taş, hep taş. Sonra Amerikalı bir adam geldi; beyaz elbiseli, şapkalı. Ferrante\'yi sordu. Ben bilmem dedim. Koluma sıktı; sonra sigarasını yaktı. Giderken arkadaşına bir şey dedi; Aurora, on Haziran, Punta. Bir gemi adı herhalde.',
            },
          ],
        },
        sonra: {
          soz: 'Kadir tavana bakıyor. Hamal iki taraf bilmez, diyor. Yük bilir.',
          secenekler: [{ etiket: 'Geçmiş olsun Kadir.' }],
        },
      },
    },
    ferrante: {
      ad: 'Ferrante',
      kosul: (d) => bayrak(d, 'ferranteBulundu'),
      giris: (d) => (delilVar(d, 'ferrante_defteri') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Daracık bir han odası. Ferrante; Pera\'daki o telaşlı, şişman tüccar değil artık. Zayıflamış, tıraşsız, gözlerinin altı mor. Masada bir tabanca ve bir deri defter. Taş, diyor İtalyan ağızlı Türkçesiyle. Altmış sandık taş. Rainer bunu benim yaptığımı sanıyor. Whitlock beni öldürmeye geldi. Sizin yüzünüzden.',
          secenekler: [
            {
              etiket: 'Ne istiyorsun?',
              sonra: 'pazarlik',
            },
          ],
        },
        pazarlik: {
          soz: 'Ferrante defteri iki eliyle göğsüne bastırıyor. Bir kayık, diyor. Körfez\'den çıkmak. Sonra Napoli. Karşılığında bu defter ve Aurora. Ben Aurora\'nın kaptanını tanırım. Gece yarısı onu oyalarım; siz ne yapacaksanız yaparsınız.',
          secenekler: [
            {
              etiket: 'Anlaştık. Kayığın hazır olacak.',
              etki: { delil: ['ferrante_defteri'], bayrak: { ferranteGuven: true } },
              sonra: 'sonra',
              cevap: 'Ferrante defteri uzatıyor; elleri titriyor. Grazie, diyor. Sonra gözleri doluyor. Ben bir tüccardım, diyor. Sadece bir tüccar. Ne zaman bu oldum, bilmiyorum.',
            },
            {
              etiket: 'Hayır. Defteri ver. Gerisini İtilaf kontrolü konuşur.',
              etki: { delil: ['ferrante_defteri'], bayrak: { ferranteGuven: false } },
              sonra: 'sonra',
              cevap: 'Ferrante tabancaya bakıyor; sonra Rıza Bey\'e. Rıza Bey tabancayı masadan alıp cebine koyuyor; yavaşça, kimseyi korkutmadan. Ferrante defteri bırakıyor. Hiç değilse hapiste Whitlock\'tan güvendeyim, diyor acı acı. Belki.',
            },
          ],
        },
        sonra: {
          soz: (d) => (bayrak(d, 'ferranteGuven') ? 'Ferrante pencereden Körfez\'e bakıyor. Gece yarısı, diyor. Sözümü tutacağım.' : 'Ferrante oturmuş, ellerini dizlerine koymuş. Rıza Bey kapıda bekliyor.'),
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
    neslihan: {
      ad: 'Neslihan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Neslihan Kordon\'un taşlarına bakıyor. Rivière beni bir kez buraya getirmişti, diyor. 1914 baharı. Sporting Kulüp\'te dans. Herkes Fransızca konuşuyordu; herkes birbirini seviyordu. Sonra hepsi birbirine silah doğrulttu.',
          secenekler: [
            {
              etiket: 'Ferrante\'nin defterini oku.',
              kosul: (d) => delilVar(d, 'ferrante_defteri') && !delilVar(d, 'iki_yana'),
              etki: { delil: ['iki_yana'] },
              sonra: 'ilk',
              cevap: 'Neslihan defteri açıyor, parmağını siyakat satırlarında gezdiriyor. Yüzü sertleşiyor. Aurora, diyor. Kırk makineli tüfek, iki yüz sandık cephane. Yarısı dağdaki Rum çetelerine, yarısı Aydın yöresindeki Türk çetelerine. Aynı aracı. Aynı fiyat. Ödeme Viyana\'ya. Defteri kapatıyor. Bunu da ben yazmış olabilirdim, diyor. Geçen yıl. Bu el yazısını tanıyorum; benden sonra gelen kızın.',
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
          soz: 'Cemil Bey gözlüğünü siliyor. Eleni Paris\'te sınıfın en iyisiydi, diyor. Hocalar bir kadına diploma verip vermemekte tereddüt ettiler; o da sınavda hepimizi geçti. Burada olması bu şehir için bir şans.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
    nermin: {
      ad: 'Nermin Hanım',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Nermin Kordon boyunca yürüyen askerlere bakıyor. Gazeteler bu şehri bir sembol yapacak, diyor. Birileri için zafer, birileri için yas. Ama buradaki insanlar sembol değil. Ben onları yazmak istiyorum.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
    riza: {
      ad: 'Rıza Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Rıza Bey bıyığını sıvazlıyor. Kaçan bir adam her zaman bir iz bırakır, diyor. Özellikle de kâğıtla yaşayan bir tüccarsa. Ferrante\'nin yazıhanesine bakalım.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
  },
};
