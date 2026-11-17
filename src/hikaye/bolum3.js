// Üçüncü bölüm: "On Yedi Numara". Pera, Mercure Kulübü. Nermin Hanım ekibe katılır.
// Yeni oynanış: kılık (uşak kıyafeti) ve şüphe. Şüphe 3'e ulaşırsa Arif kulüpten atılır; hikâye
// başka bir yoldan (Nermin'in duydukları) sürer. Bütün kişiler, kulüp ve gemi KURGUDUR.
// Arka plan: Aralık 1918'de Fransız birlikleri Odesa'ya çıktı; Pera'da elektrikli tramvay 1914'ten beri çalışıyordu.
import { BOLUM2 } from './bolum2';
import { bayrak, cikarimVar, delilVar, sayi } from '../oyun/motor';

const SUPHE_SINIRI = 3;

export const BOLUM3 = {
  id: 'bolum3',
  ad: 'Üçüncü bölüm: On Yedi Numara',
  baslangic: 'acilis',
  ilkMekan: 'cemil_ev',

  deliller: {
    ...BOLUM2.deliller,
    yorgo_bilgi: { ad: 'Yorgo\'nun anlattıkları', tarif: 'On yedi numaralı oda perşembe geceleri kilitlenir; içeri yalnızca pirinç jetonu olan girer. Odanın duvarının ardında, servis koridorunda bir yemek asansörü var.' },
    delorme_adi: { ad: 'Lavantalı adamın adı', tarif: 'Lucien Delorme. Kulüpte herkes ona Mösyö Delorme diyor; bahşişi bol, gülüşü soğuk.' },
    izin_belgesi: { ad: 'İngiliz geçiş izni', tarif: 'Sarhoş bir İngiliz yüzbaşının anlattığına göre Ferrante\'nin sandıkları için tarım makinesi diye geçiş izni imzalanmış. Karşılığında İsviçre frangı.' },
    toplanti: { ad: '17 numaralı odadaki konuşma', tarif: 'Tüfekler yarın gece yarısı Kurşunlu Han\'ın arkasındaki depodan alınıp Santa Lucia vapuruyla Odesa\'ya gidecek. Santa Lucia\'nın sahibi: Sir Henry, Pire\'de bir İngiliz armatör.' },
    siyakat_defter: { ad: 'Kayıp defter', tarif: 'Odadakiler, Sabri\'nin çaldığı kâğıtların bir rüşvet defterinin parçası olduğunu konuştu. İçinde Halim\'in de adı var. Yarın akşama kadar geri istiyorlar.' },
  },

  cikarimlar: {
    ...BOLUM2.cikarimlar,
    delorme: {
      a: 'delorme_adi',
      b: 'paltolu',
      ad: 'Lavantalı adam: Lucien Delorme',
      metin: 'Sabri\'nin odasını arayan, morgda Sabri\'nin yüzüne bakan, kapının altına not bırakan adamın artık bir adı var: Lucien Delorme.',
    },
    sevkiyat: {
      a: 'toplanti',
      b: 'izin_belgesi',
      ad: 'Silahlar yarın gece Odesa\'ya',
      metin: 'Kırk sandık tüfek, satın alınmış bir İngiliz izniyle tarım makinesi diye, yarın gece yarısı Santa Lucia\'ya yüklenecek. Odesa\'da bir iç savaş var; örgüt ateşe silah taşıyor.',
    },
    rusvet: {
      a: 'siyakat_defter',
      b: 'belge',
      ad: 'Siyakat bir rüşvet defteri',
      metin: 'Sabri\'nin denkinden çıkan kâğıdın siyakatla yazılmış kısmı bir rüşvet defteri. Rakamlı isimler satın alınmış memurlar; K 7 büyük ihtimalle Komiser Halim. Örgüt bu yüzden o kâğıdı geri almak için her şeyi yapar.',
    },
    oda: {
      a: 'yorgo_bilgi',
      b: 'jeton',
      ad: 'Jeton bir giriş kartı',
      metin: 'Sabri\'nin yuttuğu jeton, 17 numaralı odanın kapısını açan anahtar. Çantada o da vardı; Sabri hangi kapıyı açtığını bilmeden yuttu onu.',
    },
  },

  olaylar: [
    {
      id: 'yakalandin',
      kosul: (d) => sayi(d, 'suphe') >= SUPHE_SINIRI && !bayrak(d, 'disariAtildi'),
      etki: { sahne: 'yakalandin' },
    },
    {
      id: 'gece',
      kosul: (d) => cikarimVar(d, 'delorme') && cikarimVar(d, 'sevkiyat') && cikarimVar(d, 'rusvet'),
      etki: { mekan: 'cemil_ev', sahne: 'gece_yarisi' },
    },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Üçüncü bölüm bitti.' },
    { kosul: (d) => !bayrak(d, 'planYapildi'), metin: 'Cemil Bey\'in evinde Nermin Hanım\'la konuş.' },
    { kosul: (d) => !bayrak(d, 'kilik'), metin: 'Uşak kıyafetini giy. Bu gece Cemil Bey\'in uşağısın.' },
    { kosul: (d) => !bayrak(d, 'kapiGecildi') && !bayrak(d, 'disariAtildi'), metin: 'Pera\'da Mercure Kulübü\'nün kapısından geç. Başını eğik tut.' },
    {
      kosul: (d) => !bayrak(d, 'disariAtildi') && !delilVar(d, 'toplanti'),
      metin: 'Kulüpte dikkat çekmeden 17 numaralı odaya yaklaşmanın yolunu bul. Barmen, vestiyer, Nermin. Şüphe uyandırma.',
    },
    { kosul: () => true, metin: 'Bu gece öğrendiklerini soruşturma panosunda birleştir.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_cemil_ev',
      baslik: 'Cihangir, perşembe akşamı',
      paragraflar: (d) => [
        'İki gün geçti. Cemil Bey\'in Cihangir\'deki evi, yokuşun yarısında, cumbası Boğaz\'a bakan ahşap bir ev. Çalışma odası kitap, kafatası ve tütün kokuyor. Duvar saati ağır ağır vuruyor; camda yağmur.',
        'Mercure Kulübü\'nü soruşturdum, diyor Cemil Bey, piposunu doldururken. Üyeler bankerler, tüccarlar, birkaç subay. Perşembe geceleri bazı odalar kilitlenir. Üye olmayan kapıdan giremez. Ben de üye değilim.',
        bayrak(d, 'gorulmusOlabilir')
          ? 'Sen de pek giremezsin, diye ekliyor. Morgda o adam soğuk odanın kapısına baktı. Yüzünü gördüyse...'
          : 'Sen hiç giremezsin, diye ekliyor gülümseyerek. Senin ellerin hamal elleri, Arif Efendi. Pera bunu bir bakışta anlar.',
        'Kapı çalınıyor. Cemil Bey kaşlarını kaldırıyor; kimseyi beklemiyor.',
        'Kapıda koyu renk bir manto, ıslak bir şemsiye ve elinde bir not defteri tutan genç bir kadın. Yağmurdan ıslanmış saçlarını geri itiyor ve ikinize sırayla bakıyor.',
        'Nermin, diyor. Gazeteciyim. Komiser Halim\'i bir haftadır izliyorum. Cenazede sizi gördüm. Sanırım aynı adamların peşindeyiz.',
      ],
      secenekler: [{ etiket: 'İçeri gelmesine izin ver', etki: { mekan: 'cemil_ev', bayrak: { 'gorüldü_cemil_ev': true } } }],
    },

    on_yedi_oda: {
      ortam: 'ortam_servis',
      ortamOran: 0.5,
      baslik: 'Yemek asansörü',
      paragraflar: (d) => [
        'Yemek asansörünün kapağını aralıyorsun. Ahşap kuyu karanlık ve dar; öbür ucunda, duvarın ardında, 17 numaralı odanın lambası bir şeritten sızıyor. Sesler kuyuda büyüyor.',
        'Üç ses. Birini tanıyorsun: yumuşak, düzgün, lavanta kokan ses. Delorme. Öbürü telaşlı, İtalyan ağızlı bir Türkçe: Ferrante. Üçüncüsü yaşlı, öksürüklü, kâtip Türkçesi konuşan bir adam; ötekiler ona Nazım Bey diyor.',
        'Yarın gece yarısı, diyor Delorme. Kurşunlu Han\'ın arkasındaki depodan. Santa Lucia saat birde demir alıyor, Odesa\'ya. İngiliz yüzbaşının izni hazır; tarım makinesi. Bolşevik de alacak, Beyaz da alacak. Biz de ikisinden de alacağız. Ferrante bir soru soruyor: Ya kaptan sorarsa? Delorme gülüyor: Santa Lucia Sir Henry\'nin gemisi. Sir Henry\'nin kaptanları soru sormaz. Sir Henry de sormaz; yalnızca fatura keser.',
        'Ya defter, diye titriyor Ferrante. Defterin yarısı o hamalda! Halim\'in adı içinde, Nazım Bey\'in adı içinde...',
        'Nazım Bey öksürüyor. Benim adım içinde değil, diyor. Benim rakamım içinde.',
        'Defter yarın akşama kadar geri gelir, diyor Delorme, sakin. İnsanlar sevdiklerini korumak için her şeyi verir. O hamalın bir kaptanı var; kayıkhanesi ahşap. Deniz kenarında yangın çok çabuk yayılır.',
        'Bir an susuyorlar. Sonra Delorme, neredeyse şefkatle: Bir de fotoğraf var. Çantadaydı. Madam N. onu geri istiyor. Kendi yüzünü yabancı bir adamın cebinde görmekten hoşlanmıyormuş.',
        'Elin kendiliğinden ceketinin iç cebine gidiyor. Fotoğraf orada. Manastır. Örgülü saçlar. Gülümsemeyen bir kız.',
        bayrak(d, 'karar1') === 'sakla'
          ? 'Ve belge, kayıkhanenin döşemesinin altında. Süleyman\'ın kayıkhanesinin.'
          : 'Ve Süleyman. Kayıkhanesinde, mangalının başında, tek başına.',
        'Arkanda, koridorun ucunda bir tabak yere düşüp kırılıyor. Ayak sesleri sana doğru geliyor.',
      ],
      secenekler: [
        {
          etiket: 'Kıpırdama. Gölgeye yapış ve nefesini tut.',
          etki: { delil: ['toplanti', 'siyakat_defter'], bayrak: { madamN: true } },
          sonra: 'kipirdama',
        },
        {
          etiket: 'Hemen geri çekil ve elindeki tepsiyi düzelt; bir uşak gibi.',
          etki: { delil: ['toplanti', 'siyakat_defter'], bayrak: { madamN: true }, artir: { suphe: 1 } },
          sonra: 'geri_cekil',
        },
      ],
    },
    kipirdama: {
      ortam: 'ortam_servis',
      baslik: 'Gölge',
      paragraflar: [
        'Duvara yapışıyorsun. Bir mutfak yamağı kırık tabağın parçalarını toplayıp küfrederek geri dönüyor. Seni görmüyor.',
        'Nefesini bırakıyorsun. Siperde öğrendiğin şey: en iyi saklanma, hiç kıpırdamamaktır.',
      ],
      secenekler: [{ etiket: 'Devam' }],
    },
    geri_cekil: {
      ortam: 'ortam_servis',
      baslik: 'Uşak',
      paragraflar: [
        'Koridorun ortasına çıkıyorsun, tepsiyi düzeltip başını eğiyorsun. Kıdemli bir garson seni süzüyor. Sen kimin uşağısın? Burada ne işin var?',
        'Cemil Bey\'in, efendim. Yolumu kaybettim. Adam bir şey demiyor ama gözlerini senden ayırmadan uzaklaşıyor.',
      ],
      secenekler: [{ etiket: 'Devam' }],
    },

    yakalandin: {
      ortam: 'ortam_kulup',
      ortamOran: 0.4,
      baslik: 'Yakalandın',
      paragraflar: (d) => [
        'Bir el omzuna kapanıyor. Kulübün baş garsonu, yanında iki iri adam. Sen kimsin? Kimin uşağısın? Uşak ellerine benzemiyor bu eller.',
        'Daha bir şey diyemeden Nermin salonun ortasında bir kadeh deviriyor ve sesini yükseltiyor: Uşağıma dokunmayın! Bu ne terbiyesizlik! Bütün başlar dönüyor. Cemil Bey yanına geliyor, ciddi ve soğuk: Adamımı bırakın. Gidiyoruz.',
        'Kapı dışarı ediliyorsunuz. Pera\'nın ıslak kaldırımında Nermin şemsiyesini açıyor; yüzünde sinirli ama memnun bir ifade.',
        'Sen onları oyalarken ben servis koridoruna saptım, diyor. Yemek asansörünün başında üç dakika durdum. Yarın gece yarısı, Kurşunlu Han\'ın arkasındaki depo, Santa Lucia, Odesa. Bir de bir defterden bahsediyorlardı; rüşvet defteri, Halim\'in adı içinde. Yarın akşama kadar geri istiyorlar.',
        'Bir şey daha söylediler, diye ekliyor, kaşlarını çatarak. Bir Madam N.\'den bahsettiler. Bir fotoğraf istiyormuş.',
        'Elin ceketinin iç cebine gidiyor. Fotoğraf orada. Nermin bunu fark ediyor; bir şey sormuyor. Henüz.',
      ],
      secenekler: [
        {
          etiket: 'Devam',
          etki: (d) => ({
            delil: ['toplanti', 'siyakat_defter', ...(delilVar(d, 'izin_belgesi') ? [] : ['izin_belgesi']), ...(delilVar(d, 'delorme_adi') ? [] : ['delorme_adi'])],
            bayrak: { disariAtildi: true, madamN: true },
            mekan: 'pera',
          }),
        },
      ],
    },

    gece_yarisi: {
      ortam: 'ortam_cemil_ev',
      baslik: 'Gece yarısı, Cihangir',
      paragraflar: (d) => [
        'Cemil Bey\'in çalışma odasında üçünüz. Masada jeton, Nermin\'in not defteri, soğumuş kahveler. Yağmur hâlâ yağıyor.',
        'Nermin ayağa kalkmış, odada dolaşıyor. Elimizde haber var, diyor. Bir İngiliz yüzbaşı, bir komiser, bir maliye memuru, işgal altındaki şehirden silah kaçıran bir İtalyan tüccar. Sabah gazetesine yetiştiririm. Bütün İstanbul okur.',
        'Cemil Bey piposunu yakıyor. Ve Delorme gece yarısından önce depoyu boşaltır, diyor. Gazete kâğıdı tüfekleri durdurmaz, hanımefendi.',
        'İkisi de sana dönüyor.',
        bayrak(d, 'madamN')
          ? 'Sen ise başka bir şey düşünüyorsun. Madam N. Fotoğraf cebinde, sıcak, sanki canlı.'
          : 'Sen ise cebindeki fotoğrafı düşünüyorsun.',
      ],
      secenekler: [
        {
          etiket: 'Nermin yazsın. Sabah bütün şehir bilsin; onları ortaya dökmenin tek yolu bu.',
          etki: { bayrak: { karar3: 'gazete' }, artir: { nerminBag: 1 } },
          sonra: 'karar_gazete',
        },
        {
          etiket: 'Önce sevkiyatı durduralım. Yarın gece depoya gideceğiz.',
          etki: { bayrak: { karar3: 'depo' }, artir: { cemilBag: 1 } },
          sonra: 'karar_depo',
        },
        {
          etiket: 'İngiliz yüksek komiserliğine isimsiz bir ihbar mektubu yazalım. Silah işini İngilizler durdursun.',
          etki: { bayrak: { karar3: 'ihbar' } },
          sonra: 'karar_ihbar',
        },
      ],
    },
    karar_gazete: {
      ortam: 'ortam_cemil_ev',
      baslik: 'Mürekkep',
      paragraflar: [
        'Nermin\'in yüzü aydınlanıyor; sonra kendini toparlıyor, sanki sevindiğini göstermek istemiyor. Sabah dörtte matbaada olurum, diyor. İsim vermeyeceğim; yalnızca gemi, depo, tarih. Bırakalım nereden sızdığını düşünsünler.',
        'Cemil Bey başını sallıyor, ikna olmamış. O zaman ben de sabah ilk iş Gureba\'ya gideyim, diyor. Bugün birileri yaralanacak, içimden bir ses öyle diyor.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'yangin' }],
    },
    karar_depo: {
      ortam: 'ortam_cemil_ev',
      baslik: 'Depo',
      paragraflar: [
        'Nermin kollarını kavuşturuyor. Yani sen, bir hamal ve bir hekim, kırk sandık tüfeği bir Lejyon katilinin elinden alacaksınız. Harika bir plan.',
        'Plan değil, diyorsun. Başlangıç. Kurşunlu Han\'ın arkasını iyi bilirim; orada yük taşıdım. Kayıkçıların, hamalların, bekçilerin hepsini tanırım.',
        'Nermin bir süre sana bakıyor. Sonra not defterini açıyor. Peki, diyor. Ama haber benim.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'yangin' }],
    },
    karar_ihbar: {
      ortam: 'ortam_cemil_ev',
      baslik: 'İhbar',
      paragraflar: [
        'Nermin acı acı gülüyor. İzni imzalayan bir İngiliz yüzbaşı, diyor. Mektubun hangi masaya düşeceğini sanıyorsun?',
        'Belki dürüst bir masaya düşer, diyor Cemil Bey. Her ordunun içinde birkaç dürüst adam vardır. Ben Balkan Harbi\'nde birini tanıdım. Bir tane.',
        'Mektubu Nermin İngilizce yazıyor, sen imzasız bırakıyorsun. Sabah ilk vapurla Galata postanesine.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'yangin' }],
    },
    yangin: {
      ortam: 'ortam_rihtim',
      ortamOran: 0.3,
      efekt: ['yangin'],
      baslik: 'Yangın',
      paragraflar: (d) => [
        'Saat ikiye geliyor. Kapı yumruklanıyor. Ali, sırılsıklam, yüzü kurum içinde, nefesi kesilmiş: Arif Ağabey! Kayıkhane! Kayıkhane yanıyor! Kaptan içerideydi!',
        'Yokuştan aşağı, ıslak taşlarda kayarak koşuyorsun. Tophane\'den Karaköy\'e kadar gökyüzü turuncu. Rıhtımda bir kalabalık, kovalar, bağırışlar, bir yerde bir el çanı.',
        'Kayıkhanenin çatısı çöküyor. Kıvılcımlar denize düşüp sönüyor. Ve kalabalığın içinde, yerde, kayıkçı Hüsnü\'nün kucağında biri: Süleyman.',
        'Yaşıyor. Sol kolu ve yüzünün bir yanı yanmış, nefesi hırıltılı. Seni görünce gözleri açılıyor. Kapıyı dışarıdan kilitlemişlerdi, diye fısıldıyor. Hüsnü denizden, kayıkla geldi. Pencereyi kırdı.',
        bayrak(d, 'karar1') === 'sakla'
          ? 'Sonra yanmamış eliyle göğsüne bastırdığı bir şeyi sana uzatıyor: yağlı beze sarılı paket. Belge. Döşemenin altından çıkardım, diyor. Onlara bırakmadım evlat.'
          : 'Sonra yanmamış elini açıyor. Avucunda buruşmuş, lavanta kokan bir kart: Yarın akşama kadar.',
        sayi(d, 'travma') >= 3
          ? 'Alevlerin sesi, yanık et kokusu, bağırışlar. Kulaklarında yine o çınlama. Ama bu sefer geri gitmiyorsun. Burada kalıyorsun. Süleyman\'ın elini tutuyorsun ve bırakmıyorsun.'
          : 'Süleyman\'ın elini tutuyorsun. Kalabalığın arkasında, rıhtımın gölgesinde, gri paltolu bir adamın arkasını dönüp yürüdüğünü görür gibi oluyorsun.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'kapanis' }],
    },
    kapanis: {
      ortam: 'ortam_rihtim',
      ortamOran: 0.5,
      baslik: 'Şafak',
      paragraflar: (d) => [
        'Cemil Bey Süleyman\'ın yaralarını sararken, Nermin yanına geliyor. Ilk kez sesinde alay yok.',
        'Ağabeyim Sarıkamış\'ta dondu, diyor birden, sanki kendi kendine. On dokuz yaşındaydı. Ona palto diye gönderilen şey, birilerinin cebini doldurmak için yarım dikilmiş bir paçavraydı. O günden beri savaştan para kazananların peşindeyim.',
        'Senin de birileri var, değil mi? O fotoğraftaki kadın gibi.',
        bayrak(d, 'karar3') === 'gazete'
          ? 'Sabah gazetesi çıkacak. Ama Delorme da bir şeyler yapacak. Şehir uyanırken bir yarış başlıyor.'
          : bayrak(d, 'karar3') === 'depo'
            ? 'Yarın gece yarısı depo. Şimdi bunun ne demek olduğunu daha iyi anlıyorsun: artık geri dönüş yok.'
            : 'Mektup sabah postada. Kimin masasına düşeceğini bilmiyorsun. Beklemek hiç bu kadar ağır gelmemişti.',
        'Şafak sökerken, yanmış kayıkhanenin dumanı Boğaz\'a doğru uzanıyor. Delorme yarın akşama kadar süre verdi. Sen ise artık yalnız değilsin: bir hekim, bir gazeteci, yaralı bir kaptan, bir kayıkçı ve bir çocuk.',
        'Üçüncü bölümün sonu.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { nerminEkipte: true, kayikhaneYandi: true, bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_rihtim',
      ortamOran: 0.4,
      baslik: 'Üçüncü bölüm bitti',
      paragraflar: ['Nermin Hanım artık ekibinde. Hikâye dördüncü bölümde, yangının ertesi sabahı sürüyor. Kararların kaydedildi.'],
      secenekler: [
        { etiket: 'Dördüncü bölüme geç', sonrakiBolum: 'bolum4' },
        { etiket: 'Ana menüye dön', anaMenu: true },
      ],
    },
  },

  mekanlar: {
    cemil_ev: {
      ad: 'Cemil Bey\'in çalışma odası',
      tarif: 'Kitaplarla dolu duvarlar, cam kavanozlarda tuhaf şeyler, raftaki bir kafatasının üstünde Cemil Bey\'in eski fesi. Soba çıtırdıyor, duvar saati vuruyor, camda yağmur. Masada, lambanın altında pirinç jeton.',
      nesneler: [
        {
          id: 'jeton',
          etiket: 'Masadaki jeton',
          incele: 'Pirinç jeton lambanın ışığında parlıyor. Kanatlı anahtar, Mercure, Pera, 17. Sabri\'nin son nefesi. Avucunda tartıyorsun; hafif bir şey, ama bir adamın hayatı kadar ağır.',
        },
        {
          id: 'sozluk',
          etiket: 'Cemil Bey\'in Fransızca sözlüğü',
          incele: (d) =>
            delilVar(d, 'on_yedi')
              ? 'Cemil Bey sözlüğü açıp parmağıyla gösteriyor: dix-sept, on yedi. attend, bekliyor. Le dix-sept attend. Delorme bunu morgda Halim\'e söyledi; bu gece 17 numaralı odada bir toplantı var.'
              : 'Kalın, yıpranmış bir Fransızca sözlük. Kenarlarına Cemil Bey\'in el yazısıyla tıp terimleri karalanmış.',
        },
        {
          id: 'elbise',
          etiket: 'Uşak kıyafeti',
          kosul: (d) => bayrak(d, 'planYapildi'),
          incele: (d) =>
            bayrak(d, 'kilik')
              ? 'Kıyafet üstünde. Yakası boğazını sıkıyor.'
              : 'Siyah bir yelek, kolalı bir yaka, beyaz eldivenler. Cemil Bey\'in eski uşağından kalma. Giyiyorsun. Aynada sana yabancı bir adam bakıyor. Eldivenler ellerini saklıyor; iyi. Ama omuzlarını ve duruşunu saklamıyor. Başını eğik tut, diyor Nermin. Bir uşak efendisinin yüzüne bakmaz.',
          etki: { bayrak: { kilik: true } },
        },
      ],
      kisiler: ['nermin', 'cemil'],
      gecisler: [{ hedef: 'pera', etiket: 'Pera\'ya, Mercure Kulübü\'ne git', kosul: (d) => bayrak(d, 'kilik') && !bayrak(d, 'disariAtildi') }],
    },

    pera: {
      ad: 'Pera, Grand Rue',
      tarif: (d) =>
        bayrak(d, 'disariAtildi')
          ? 'Islak kaldırım. Kulübün kapısı arkanızda kapandı. Tramvayın çanı, faytonlar, yağmurda yürüyen İngiliz askerleri.'
          : 'Elektrikli tramvay çanını çalarak geçiyor. Faytonlar, şemsiyeler, Rumca, Fransızca, Ermenice, İngilizce konuşan kalabalık. Pastane vitrinlerinin ışığı ıslak kaldırıma vuruyor. Arka sokakta, demir fenerlerin altında, Mercure Kulübü\'nün kapısı.',
      nesneler: [
        {
          id: 'gazeteci_cocuk',
          etiket: 'Gazete satan çocuk',
          incele: 'Akşam gazetesi! İtilaf komiserlerinin yeni kararları! diye bağırıyor bir çocuk. Yalınayak. Yaşı Ali kadar. Cebinden bir kuruş bulup veriyorsun; gazeteyi almıyorsun.',
        },
        {
          id: 'kulup_cephesi',
          etiket: 'Kulübün kapısı',
          incele: 'Pirinç tokmaklı ağır bir kapı. Üstünde, taşa oyulmuş küçük bir Merkür başı: kanatlı miğferli tüccar tanrısı. Kanatlar. Bir tesadüf mü, bilmiyorsun.',
        },
      ],
      kisiler: ['kapici'],
      gecisler: [
        { hedef: 'kulup', etiket: 'Kulübe gir', kosul: (d) => bayrak(d, 'kapiGecildi') && !bayrak(d, 'disariAtildi') },
        { hedef: 'cemil_ev', etiket: 'Cihangir\'e, Cemil Bey\'in evine dön' },
      ],
    },

    kulup: {
      ad: 'Mercure Kulübü, salon',
      tarif: 'Kristal avizeler, kalın halılar, puro dumanı. Yan salonda bir piyano yavaş bir vals çalıyor. Kart masalarında bankerler, köşede birkaç İngiliz subayı. Yetimler yararına bir gece; kadınlar ipek, erkekler frak. Sen bir duvarın dibinde, Cemil Bey\'in paltosunu kolunda tutuyorsun.',
      nesneler: [
        {
          id: 'delorme_masa',
          etiket: 'Pencere kenarındaki masa',
          incele: (d) =>
            bayrak(d, 'delormeBakti')
              ? 'Gri paltolu adam artık o masada değil. Sandalyesi boş; kadehinin yanında yarım bir puro.'
              : bayrak(d, 'gorulmusOlabilir')
                ? 'Pencere kenarında, tek başına, gri takımlı bir adam şarap içiyor. Lavanta. Başını kaldırıyor ve bakışları bir an senin üstünde duruyor. Hemen gözlerini yere indiriyorsun. Kalbin göğsünü dövüyor. Seni tanıdı mı?'
                : 'Pencere kenarında, tek başına, gri takımlı bir adam şarap içiyor. Lavanta. Seni hiç görmedi; bunu biliyorsun, çünkü morgda gözlerini kapattın. Yine de başını eğik tutuyorsun.',
          etki: (d) => (bayrak(d, 'gorulmusOlabilir') ? { bayrak: { delormeBakti: true }, artir: { suphe: 1 } } : { bayrak: { delormeBakti: true } }),
        },
        {
          id: 'vestiyer',
          etiket: 'Vestiyer ve misafir defteri',
          incele: [
            'Paltoyu vestiyere asıyorsun. Vestiyerci kız arkasını dönünce misafir defterine göz atıyorsun. Yavaş, heceleyerek.',
            'Bu gecenin satırları: E. Ferrante. N. Bey, Maliye. Ve düzgün, yatık bir el yazısıyla: L. Delorme.',
          ],
          etki: { delil: ['delorme_adi'] },
        },
        {
          id: 'piyano',
          etiket: 'Yan salondaki piyano',
          incele: 'Bir vals. Annenin mutfakta mırıldandığı bir ezgiye benziyor; değil ama. Piyanonun başında yaşlı bir Rus göçmen çalıyor; gözlerini kapatmış. Onun da kaybettiği bir şehir var belli ki.',
        },
      ],
      kisiler: ['yorgo', 'nermin', 'basgarson'],
      gecisler: [
        { hedef: 'servis', etiket: 'Servis koridoruna sıvış', kosul: (d) => bayrak(d, 'servisAcik') && !bayrak(d, 'disariAtildi') },
        { hedef: 'pera', etiket: 'Dışarı çık' },
      ],
    },

    servis: {
      ad: 'Servis koridoru',
      tarif: 'Dar, loş bir koridor. Duvarların ardından salonun uğultusu ve piyano geliyor. Uzakta mutfak, tabak ve tencere sesleri. Koridorun ortasında, duvara gömülü ahşap bir kapak: yemek asansörü. Hemen yanında 17 numaralı odanın duvarı.',
      nesneler: [
        {
          id: 'asansor',
          etiket: 'Yemek asansörü',
          incele: (d) =>
            delilVar(d, 'toplanti')
              ? 'Kuyudan artık yalnızca sandalye gıcırtıları geliyor. Toplantı bitmiş.'
              : 'Kapağa kulağını dayıyorsun. Sesler, ahşap kuyunun içinde boğuk ama seçilebilir.',
          etki: (d) => (delilVar(d, 'toplanti') ? null : { sahne: 'on_yedi_oda' }),
        },
        {
          id: 'tepsi',
          etiket: 'Duvar dibindeki tepsi',
          incele: 'Boş bardaklarla dolu bir tepsi. Bir uşağın elinde en iyi bahane budur. Alıyorsun.',
          etki: { bayrak: { tepsi: true } },
        },
      ],
      kisiler: [],
      gecisler: [{ hedef: 'kulup', etiket: 'Salona dön' }],
    },
  },

  kisiler: {
    cemil: {
      ad: 'Cemil Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'planYapildi')
              ? 'Bu gece benim uşağımsın Arif Efendi. Bana efendim diyeceksin ve ben de sana bir kez olsun emir vereceğim. İtiraf edeyim, bunu bekliyordum.'
              : 'Cemil Bey Nermin Hanım\'ı süzüyor, sonra sana göz kırpıyor. Gazeteciler, diyor alçak sesle, ölülerden de meraklıdır. Ama ölülerden çok daha iyi konuşurlar.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },

    nermin: {
      ad: 'Nermin Hanım',
      giris: (d) => {
        if (d.mekan === 'kulup') return 'kulupta';
        if (bayrak(d, 'planYapildi')) return 'plan_sonra';
        if (bayrak(d, 'nerminTanisti')) return 'bilgi';
        return 'ilk';
      },
      dugumler: {
        ilk: {
          soz: [
            'Nermin şemsiyesini kapıya dayayıp seni baştan aşağı süzüyor. Demek cenazede Sabri\'nin başında konuşan hamal sensin. Komiser Halim\'in peşindeki hamal dedektif.',
            'Sesinde alay var. Ama gözleri merakla bakıyor.',
          ],
          secenekler: [
            {
              etiket: 'Hamal da olsa gözlerim var hanımefendi. Sizin gördüğünüzü ben de gördüm.',
              etki: { artir: { nerminBag: 1 }, bayrak: { nerminTanisti: true } },
              sonra: 'bilgi',
              cevap: 'Nermin bir an duraksıyor, sonra gülümsüyor; istemeden.',
            },
            {
              etiket: 'Bir şey deme. Sadece bak.',
              etki: { bayrak: { nerminTanisti: true } },
              sonra: 'bilgi',
              cevap: 'Sessizlik uzuyor. Nermin gözlerini ilk kaçıran oluyor.',
            },
            {
              etiket: 'Nişantaşı hanımları Karaköy\'ü gazeteden okur. Biz orada yaşıyoruz.',
              etki: { artir: { nerminBag: -1 }, bayrak: { nerminTanisti: true, nerminSivri: true } },
              sonra: 'bilgi',
              cevap: 'Nermin\'in yanakları kızarıyor. Haklısın, diyor soğuk bir sesle. Ama gazeteyi yazan da benim.',
            },
          ],
        },
        bilgi: {
          soz: 'Bildiklerimi söyleyeyim, sonra sizinkileri dinlerim. Ferrante ve Ortakları üç aydır limana makine yedek parçası getiriyor. Hiçbiri bir fabrikaya gitmiyor. Komiser Halim Ferrante\'nin deposuna haftada iki kez uğruyor. Ve bu gece Mercure Kulübü\'nde yetimler yararına bir gece var. Rahmetli babam üyeydi; ben kızı olarak girebilirim.',
          secenekler: [
            {
              etiket: 'Sabri\'yi, belgeyi ve jetonu anlat.',
              etki: { artir: { nerminBag: 1 }, bayrak: { nermineAnlatti: true } },
              sonra: 'plan',
              cevap: 'Anlatıyorsun. Nermin hiç sözünü kesmeden dinliyor, not almıyor. Sonra jetonu alıp ışığa tutuyor. On yedi, diyor. Perşembe. Bu gece.',
            },
            {
              etiket: 'Sadece jetonu göster. Gerisini kendine sakla.',
              etki: { bayrak: { nermineAnlatti: false } },
              sonra: 'plan',
              cevap: 'Nermin jetona bakıyor, sonra sana. Bana güvenmiyorsun, diyor. Akıllıca. Ben de sana güvenmiyorum. İyi anlaşacağız.',
            },
          ],
        },
        plan: {
          soz: 'Plan şu: ben babamın kızı olarak girerim, Cemil Bey benim eşlikçim olur; saygın bir hekim, kimse sorgulamaz. Sen de Cemil Bey\'in uşağı. Uşaklar her yere girer ve kimse yüzlerine bakmaz. Tek şart: başını eğik tutacaksın ve ağzını açmayacaksın.',
          secenekler: [
            {
              etiket: 'Kabul.',
              etki: { bayrak: { planYapildi: true } },
              cevap: 'Cemil Bey dolaptan bir uşak kıyafeti çıkarıyor. Eski uşağımdan kaldı, diyor. Rahmetli değil, Bursa\'ya gitti; ama bunu giymeyi reddederdi.',
            },
          ],
        },
        plan_sonra: {
          soz: (d) => (bayrak(d, 'kilik') ? 'Fena değil. Ama omuzların bir asker gibi duruyor. Biraz eğil.' : 'Kıyafeti giy. Vaktimiz yok.'),
          secenekler: [
            {
              etiket: 'Neden bu işin peşindesin?',
              kosul: (d) => !bayrak(d, 'nerminNeden'),
              etki: { bayrak: { nerminNeden: true } },
              sonra: 'plan_sonra',
              cevap: 'Nermin dudaklarını sıkıyor. Bunu kazanman lazım, hamal dedektif. Henüz kazanmadın.',
            },
            { etiket: 'Tamam.' },
          ],
        },
        kulupta: {
          soz: (d) =>
            delilVar(d, 'izin_belgesi')
              ? 'Nermin kadehini kaldırıp bir bankere gülümsüyor, dudaklarını kıpırdatmadan sana fısıldıyor: Benden bu kadar. Gerisi senin işin, uşak.'
              : 'Nermin yanından geçerken eldivenini düşürüyor. Eğilip alıyorsun. Ne istiyorsun, diye fısıldıyor, gülümsemesini bozmadan.',
          secenekler: [
            {
              etiket: 'Bardaki sarhoş İngiliz subayıyla konuşabilir misin?',
              kosul: (d) => !delilVar(d, 'izin_belgesi'),
              etki: { delil: ['izin_belgesi'] },
              cevap: 'Nermin bara süzülüyor. On dakika boyunca subayın şakalarına gülüyor, İngilizce konuşuyor. Sonra yanından geçerken fısıldıyor: Yüzbaşı Hargreaves. Ferrante\'nin sandıkları için tarım makinesi diye geçiş izni imzalamış. İsviçre frangıyla ödemişler. Bir de, bu gece kendisinin de "Odesa için" kadeh kaldırdığını söyledi.',
            },
            { etiket: 'Hiçbir şey. Eldiveniniz, hanımefendi.' },
          ],
        },
      },
    },

    kapici: {
      ad: 'Kulübün kapıcısı',
      giris: (d) => (bayrak(d, 'kapiGecildi') ? 'sonra' : bayrak(d, 'kilik') ? 'kilikli' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'İri, bıyıklı bir kapıcı. Seni görünce kolunu kaldırıyor. Hamallar arka kapıdan. Burası beyefendiler için.',
          secenekler: [{ etiket: 'Geri çekil.' }],
        },
        kilikli: {
          soz: 'Nermin kapıcıya babasının üyelik kartını uzatıyor, Cemil Bey fesini düzeltiyor. Kapıcı başını eğiyor. Sonra gözleri sana kayıyor; omuzlarına, ellerine.',
          secenekler: [
            {
              etiket: 'Başını eğ. Paltoları kolunda düzelt. Bir uşak gibi bekle.',
              etki: { bayrak: { kapiGecildi: true } },
              cevap: 'Kapıcı bir an bekliyor, sonra kenara çekiliyor. Buyrun efendim.',
            },
            {
              etiket: 'Kapıcının gözlerinin içine bak.',
              etki: { bayrak: { kapiGecildi: true }, artir: { suphe: 1 } },
              cevap: 'Kapıcı kaşlarını çatıyor. Uşaklar başını eğer, diyor alçak sesle. Ama Cemil Bey seni çekip içeri sokuyor.',
            },
          ],
        },
        sonra: {
          soz: 'Kapıcı seni görmezden geliyor.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },

    yorgo: {
      ad: 'Barmen Yorgo',
      giris: (d) => (bayrak(d, 'servisAcik') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Altmışlarında, kır saçlı, kibar bir barmen. Kadehleri bir beze silerken sana yan gözle bakıyor. Uşaklara içki yok evladım, diyor Rum ağzıyla. Ama su verebilirim.',
          secenekler: [
            {
              etiket: 'Süleyman Reis\'in adamıyım. Karaköy\'den.',
              sonra: 'suleyman',
            },
            {
              etiket: 'Avucunu açıp jetonu göster.',
              etki: { artir: { suphe: 2 } },
              sonra: 'jeton',
            },
            {
              etiket: 'Pencere kenarındaki gri takımlı bey kim?',
              etki: { artir: { suphe: 1 } },
              sonra: 'delorme',
            },
          ],
        },
        suleyman: {
          soz: 'Yorgo\'nun eli duruyor. Süleyman Reis? Gençliğimde onun gemisinde aşçı yamağıydım. Bana kızgın yağın nasıl sönmeyeceğini o öğretti. Sesini alçaltıyor: Ne istiyorsun?',
          secenekler: [
            {
              etiket: '17 numaralı oda. Ne oluyor orada?',
              etki: { delil: ['yorgo_bilgi', 'delorme_adi'], bayrak: { servisAcik: true } },
              cevap: 'Yorgo bezi omzuna atıyor. Perşembe geceleri kilitlenir. Pirinç jetonu olan girer, başkası giremez. Mösyö Delorme, şu pencere kenarındaki lavanta kokulu bey, her seferinde orada. Bahşişi bol, gözleri ölü. Odanın duvarının arkasında, servis koridorunda bir yemek asansörü var. Kapağı aralık kalırsa insan her şeyi duyar. Bunu ben söylemedim. Mutfağın yanındaki kapıdan geç.',
            },
          ],
        },
        jeton: {
          soz: 'Yorgo jetonu görünce rengi atıyor ve avucunu sert bir hareketle kapatıyor. Sen deli misin? diye tıslıyor. Bunu burada kimse görmesin! Etrafına bakıyor; baş garson sizi izliyor. Kimin adamısın sen?',
          secenekler: [
            { etiket: 'Süleyman Reis\'in. Karaköy\'den.', sonra: 'suleyman' },
          ],
        },
        delorme: {
          soz: 'Yorgo kadehi bırakmıyor, yüzünü kaldırmıyor. Uşaklar efendileri hakkında soru sormaz evladım, diyor. Sorarlarsa baş garson onları kapı dışarı eder. Ben sana iyilik olsun diye söylüyorum.',
          secenekler: [
            { etiket: 'Süleyman Reis\'in adamıyım. Karaköy\'den.', sonra: 'suleyman' },
            { etiket: 'Başını eğ ve uzaklaş.' },
          ],
        },
        sonra: {
          soz: 'Mutfağın yanındaki kapı, diyor Yorgo, kadeh silmeye devam ederek. Çabuk ol. Toplantı uzun sürmez.',
          secenekler: [{ etiket: 'Sağ ol Yorgo.' }],
        },
      },
    },

    basgarson: {
      ad: 'Baş garson',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Uzun boylu, solgun, kolalı yakalı bir adam. Sana tepeden bakıyor. Bir şey mi istiyorsunuz? Uşaklar duvar dibinde bekler.',
          secenekler: [
            { etiket: 'Hayır efendim. Özür dilerim.' },
            {
              etiket: 'Efendimin paltosu için vestiyeri arıyorum.',
              cevap: 'Baş garson çenesiyle girişi gösteriyor. Orada. Ve bir daha salonun ortasında dolaşma.',
            },
            {
              etiket: 'Bu kulübün sahibi kim?',
              etki: { artir: { suphe: 1 } },
              cevap: 'Baş garsonun gözleri kısılıyor. Bu ne biçim soru? Kimin uşağısın sen? Seni izliyor olacağım.',
            },
          ],
        },
      },
    },
  },
};
