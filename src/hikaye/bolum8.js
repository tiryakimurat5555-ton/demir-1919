// Sekizinci bölüm: "Kalay". Manastır, 26-27 Aralık 1918.
// Arif, Rivière'in mektubundaki izi sürüp babası Kalaycı İsmail Usta'yı Manastır cezaevinde bulur.
// Altı yıldır yargılanmadan tutulan baba, örgütün para verdiği İsviçreli doktor Hasler'in afyonlu
// damlalarıyla "deli" gösterilmektedir. İki çıkarım (yargısız, ilaçlı) Yüzbaşı Ristić'e sunulur.
// Arka plan (gerçek): Manastır Kasım 1912'de Sırp ordusuna geçti; 1916-1918'de cephe hattındaydı ve bombalandı;
// 1 Aralık 1918'de Sırp-Hırvat-Sloven Krallığı kuruldu; Selanik-Manastır demiryolu 1894'te açılmıştı.
// Bütün kişiler (Yusuf, Stojan, Hasler, Ristić) ve cezaevindeki olaylar KURGUDUR.
import { BOLUM7 } from './bolum7';
import { bayrak, cikarimVar, delilVar, sayi } from '../oyun/motor';

const yanimda = (d, kim) => !!bayrak(d, 'ekip_' + kim);
const neslihanBurada = (d) => bayrak(d, 'neslihanSecim') === 'geldi' || !!bayrak(d, 'neslihanGeldi8');

export const BOLUM8 = {
  id: 'bolum8',
  ad: 'Sekizinci bölüm: Kalay',
  baslangic: 'acilis',
  ilkMekan: 'carsi',

  deliller: {
    ...BOLUM7.deliller,
    kalay_takimi: { ad: 'Babanın kalay takımı', tarif: 'Yusuf Usta\'nın altı yıl sakladığı deri bohça: çekiç, körük ağzı, nişadır taşı. Çekicin sapında babanın damgası: İ. Ve yanında küçük bir kalıp; kanat biçiminde.' },
    cezaevi_kaydi: { ad: 'Cezaevi kayıt defteri', tarif: 'Kasım 1912: İsmail, Kalaycı, Manastırlı. Suç: casusluk şüphesi. Mahkeme: yok. 1913\'ten beri her yıl aynı not: Yargılanması ertelendi. 1916\'dan beri ek: Dr. F. Hasler raporu, tehlikeli akıl hastası, nakli sakıncalı.' },
    hasler_raporu: { ad: 'Doktor Hasler\'in raporları', tarif: 'İki yıllık aylık raporlar. Hepsi aynı cümleler, aynı el yazısı, yalnızca tarihler değişiyor: dementia praecox, saldırgan, nakli ve ziyareti sakıncalı. Altında: Cenevre Yardım Heyeti.' },
    afyon: { ad: 'Afyon damlaları', tarif: 'Laudanum. Gözbebekleri iğne ucu gibi bir adam, uyuşuk, unutkan, korkulu. Deli değil; uyuşturulmuş.' },
    viyana_ipucu: { ad: 'Viyana', tarif: 'Delorme yaşıyor. Kanatlı Anahtar\'ın ileri gelenleri 15 Ocak\'ta Viyana\'da, Hotel Imperial\'de toplanacak.' },
  },

  cikarimlar: {
    ...BOLUM7.cikarimlar,
    yargisiz: {
      a: 'cezaevi_kaydi',
      b: 'riviere_mektubu',
      ad: 'Yargısız',
      metin: 'Baban altı yıldır bir mahkeme görmedi. Yargılanması her yıl ertelendi; çünkü Rivière her yıl bedelini ödedi. Bir Sırp cezaevinde, bir Fransız bankerin parasıyla, hiçbir suçun cezasını çekmeden.',
    },
    ilacli: {
      a: 'hasler_raporu',
      b: 'afyon',
      ad: 'Uyuşturulmuş',
      metin: 'Hasler\'in raporları kopya; babanı muayene ettiği bile şüpheli. Deli diye yazdığı adamı her sabah afyonla uyuşturuyor ki kimse onunla konuşamasın, kimse onu nakletmesin. Deli değil; susturulmuş.',
    },
  },

  olaylar: [
    {
      id: 'yuzbasi',
      kosul: (d) => cikarimVar(d, 'yargisiz') && cikarimVar(d, 'ilacli'),
      etki: { mekan: 'cezaevi', sahne: 'yuzbasi' },
    },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Sekizinci bölüm bitti.' },
    { kosul: (d) => !delilVar(d, 'kalay_takimi'), metin: 'Çarşıda babanın eski dükkânını bul.' },
    { kosul: (d) => !bayrak(d, 'gorüldü_baba_evi'), metin: 'Eski evinize git.' },
    { kosul: (d) => !delilVar(d, 'cezaevi_kaydi'), metin: 'Cezaevine git; gardiyanla konuş.' },
    { kosul: (d) => !delilVar(d, 'hasler_raporu') || !delilVar(d, 'afyon'), metin: 'Babanı neden deli diye tutuyorlar? Hücreye ve revire bak.' },
    { kosul: () => true, metin: 'Bulduklarını soruşturma panosunda birleştir.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_tren',
      efekt: ['tren_duduk'],
      baslik: '26 Aralık 1918, Manastır treni',
      paragraflar: (d) => [
        'Selanik\'ten kuzeybatıya, karlı ovalardan dağlara tırmanan tek hatlı demiryolu. Vagonda soba tütüyor. Pencerede yanmış köyler, terk edilmiş siperler, paslı tel örgüler: iki yıl boyunca cephe buradan geçti.',
        'Florina\'dan sonra sınır. Sırp jandarması pasaportlara bakıyor. Bu artık yeni bir krallığın toprağı: Sırp-Hırvat-Sloven Krallığı. Yirmi altı gün önce kuruldu.',
        bayrak(d, 'fransizBag')
          ? 'Yüzbaşı Morin\'in mühürlü mektubu jandarmanın yüzünü yumuşatıyor. Müttefik subaylarının dostlarına kapılar açılıyor.'
          : yanimda(d, 'riza')
            ? 'Rıza Bey pasaportların arasına katlanmış birkaç kâğıt para sıkıştırıyor. Jandarma görmezden geliyor. Dünyanın her yerinde aynı, diyor Rıza Bey.'
            : 'Cemil Bey\'in Paris tıp diploması ve Nermin\'in muhabir kartı jandarmayı ikna ediyor: tifo salgını için gelen bir heyet.',
        bayrak(d, 'neslihanSecim') === 'geldi'
          ? 'Neslihan karşında oturuyor, camdan dağlara bakıyor. Bu yolu biliyorum, diyor. Altı yıl önce ters yönde geldim. Tifolu bir arabada.'
          : 'Karşındaki koltuk boş. Neslihan\'dan haber yok.',
        'Akşamüstü Manastır. Kar yağıyor. Şehir yarı yıkık: çatısı uçmuş evler, kurşun izli camiler ve kiliseler, yıkıntıların arasında yürüyen siyah giysili kadınlar. Ama Dragor deresi hâlâ akıyor, saat kulesi hâlâ ayakta.',
        'Burada doğdun. On dokuz yaşına kadar bu sokaklarda koştun. Bir şehri tanımamak böyle bir şeymiş.',
      ],
      secenekler: [{ etiket: 'Trenden in', etki: { mekan: 'carsi', bayrak: { 'gorüldü_carsi': true } } }],
    },
    avlu_neslihan: {
      ortam: 'ortam_manastir',
      baslik: 'Ayva ağacı',
      paragraflar: (d) => [
        'Evinizin yerinde kararmış duvarlar. Kapı yok, çatı yok. Ama avluda, kar altında, bükük, yaşlı bir ağaç: ayva ağacı. Hâlâ ayakta.',
        'Ağacın altında, siyah paltolu, başı açık biri duruyor. Neslihan.',
        bayrak(d, 'neslihanSecim') === 'kaldi'
          ? 'O gece, diyor sana dönmeden. Delorme beni uçurumun kenarındaki kayığa sürükledi. Seni de kaybedeceğim sandım. Selanik limanında bir Fransız devriyesi gördü bizi; o kaçtı, ben kaldım. Viyana, dedi giderken. Viyana\'da görüşürüz, küçük hanım.'
          : 'Babamı gömdüm, diyor, ağaca bakarak. Sonra masasındaki kâğıtları okudum. Bütün kâğıtlarını. Altı yıl, abi. Altı yıl her ay bir ödeme. Bir adamı hapiste tutmak için. Benim babamı. Bizim babamızı.',
        'Ağacın gövdesine elini koyuyor. Bunu hatırlıyorum, diyor. Başka hiçbir şeyi hatırlamıyorum ama bunu hatırlıyorum.',
      ],
      secenekler: [{ etiket: 'Yanına git', etki: { bayrak: { neslihanGeldi8: true }, artir: { neslihanBag: 1 } }, sonra: 'ani4' }],
    },
    ani4: {
      ortam: 'ortam_manastir',
      ortamOran: 0.5,
      efekt: ['ani_savas'],
      baslik: 'Anı: Manastır, 1902',
      paragraflar: [
        'Dükkânın arkasında mangal. Babanın elleri kararmış, kalay kokuyor. Bir bakır tencere ateşte ısınıyor.',
        'Bak oğul, diyor. Bakır güzeldir ama zehirlenir. Kalay onu korur. İnce bir kat, gözle görülmez. Ama yemek o kat sayesinde zehirlenmez.',
        'Avluda küçük bir kız, ayva ağacının altında taşlarla oynuyor. Neslihan. Yedi yaşında. Babanın çekici bakırda bir şarkı tutturuyor: tak, tak-tak, tak. Tak, tak-tak, tak.',
        'İnsan da böyledir, diyor baban. Bir kat iyilik yeter. Kimse görmez. Ama zehri o tutar.',
        'Şimdiye dönüyorsun. Neslihan avucunu açmış, kar taneleri eriyor. Tak, tak-tak, tak, diyor fısıltıyla. Bunu da hatırlıyorum.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { ritimBilindi: true } } }],
    },
    yuzbasi: {
      ortam: 'ortam_cezaevi',
      baslik: 'Yüzbaşı Ristić',
      paragraflar: (d) => [
        'Cezaevi müdürünün odası. Soba, harita, bir aile fotoğrafı. Yüzbaşı Lazar Ristić; kırk yaşlarında, Kumanova\'dan Kaymakçalan\'a kadar her savaşı görmüş yorgun bir subay. Masasının önünde Doktor Hasler, elinde bir kâğıt: yarın sabah İsmail adlı tutuklunun Üsküp tımarhanesine nakli.',
        yanimda(d, 'nermin')
          ? 'Nermin konuşuyor; Fransızcası keskin. Kayıt defteri, raporlar, şişe. Ristić önce Hasler\'e, sonra deftere, sonra yeniden Hasler\'e bakıyor.'
          : 'Cemil Bey konuşuyor, Fransızca, bir hekimin soğukkanlılığıyla: raporlar kopya, gözbebekleri iğne ucu, şişe revirin dolabında. Ristić önce Hasler\'e, sonra deftere, sonra yeniden Hasler\'e bakıyor.',
        'Altı yıl, diyor Ristić; sesi alçak. Benim hapishanemde. Ben buraya geldiğimde zaten oradaydı; deli dediler, ben de sormadım. Yabancı bir doktorun parasıyla, yabancı bir bankerin parasıyla. Bu krallık daha yirmi altı günlük, doktor. İlk işimiz mi bu olacak?',
        'Hasler gülümsüyor, gözlüğünü siliyor. Yüzbaşım, diyor, sizin de ödenmiş borçlarınız var. Eğer bu adamları dinlerseniz…',
        'Ristić ayağa kalkıyor. Dinliyorum zaten, diyor. Sonra sana dönüyor, Stojan çeviriyor: Bu adamı ne yapmamı istersiniz?',
      ],
      secenekler: [
        { etiket: 'Tutuklayın. Yasaya göre yargılansın.', etki: { bayrak: { haslerSonu: 'tutuklu' }, delil: ['viyana_ipucu'] }, sonra: 'hasler_tutuklu' },
        { etiket: 'Bırakın konuşsun. Kimin için çalıştığını söylerse gitsin.', etki: { bayrak: { haslerSonu: 'kacti' }, delil: ['viyana_ipucu'] }, sonra: 'hasler_konusur' },
      ],
    },
    hasler_tutuklu: {
      ortam: 'ortam_cezaevi',
      baslik: 'Cebindeki telgraf',
      paragraflar: [
        'İki asker Hasler\'in kollarına giriyor. Ceplerini boşaltıyorlar: bir şişe damla, bir cüzdan, bir de katlanmış bir telgraf.',
        'Ristić telgrafı sana uzatıyor. Fransızca: VIENNE HOTEL IMPERIAL 15 JANVIER STOP TOUS LES MEMBRES STOP D.',
        'D. Delorme. Uçurumdan düştü sandığın adam. Yaşıyor. Ve bütün örgütü Viyana\'ya çağırıyor.',
        'Hasler kapıdan çıkarken sana dönüyor. Kalayın tadı nasıldı, Mösyö Demir? diyor. Babanız çok iyi bir ustaydı. Anahtarlarımızın kalıbını o döktü. Size söylemedi mi?',
        'Kapı kapanıyor.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { kalipSirri: true } }, sonra: 'tahliye' }],
    },
    hasler_konusur: {
      ortam: 'ortam_cezaevi',
      baslik: 'Pazarlık',
      paragraflar: [
        'Hasler gözlüğünü takıyor; bir an düşünüyor. Sonra hesap yapan bir adamın sakinliğiyle konuşuyor.',
        'Delorme yaşıyor, diyor. Kayıkla Kassandra\'ya, oradan bir İtalyan gemisiyle Trieste\'ye geçti. Ocak\'ın on beşinde Viyana\'da, Hotel Imperial\'de bütün üyeler toplanacak. Rivière\'in boşluğunu dolduracaklar. Belki de kızı geri isteyecekler.',
        'Ristić çenesiyle kapıyı gösteriyor. Hasler paltosunu alıp çıkıyor. Eşikte duruyor.',
        'Bir şey daha, Mösyö Demir, diyor. Bedava. Babanız çok iyi bir ustaydı. Kanatlı anahtarların ilk kalıbını o döktü, 1908\'de. Size söylemedi mi? Belki de söyleyemezdi.',
        'Ve karın içinde kayboluyor.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { kalipSirri: true } }, sonra: 'tahliye' }],
    },
    tahliye: {
      ortam: 'ortam_cezaevi',
      efekt: ['demir_kapi'],
      baslik: 'Kapı',
      paragraflar: (d) => {
        const tanima = sayi(d, 'babaTanima') + (neslihanBurada(d) ? 1 : 0);
        return [
          'Stojan anahtarı çeviriyor. Sürgü kayıyor. Demir kapı gıcırdayarak açılıyor.',
          'Baban, Stojan\'ın koluna yaslanmış, avluya çıkıyor. Altı yıldır ilk kez gökyüzünün altında. Kar yüzüne düşüyor. Gözlerini kırpıştırıyor; elini kaldırıp tanelerine bakıyor.',
          tanima >= 2
            ? 'Sonra sana bakıyor. Uzun uzun. Dudakları kıpırdıyor. Arif, diyor. Oğlum. Seni aradım. Seni çok aradım.' +
              (bayrak(d, 'arifNeden') === 'sucluluk'
                ? ' Ben seni hiç aramadım baba, diyorsun; sesin kırılıyor. Baban başını iki yana sallıyor: Sen esirdin. Esir aranmaz; beklenir. Ben de bekleyemedim, o kadar.'
                : bayrak(d, 'arifNeden') === 'korktum'
                  ? ' Beni tanır mısın diye korkuyordum, diyorsun. Baban gülümsüyor, yorgun: Altı yıl damla içtim oğul. Kendimi tanımadım. Seni tanıdım.'
                  : bayrak(d, 'arifNeden') === 'inandim'
                    ? ' Öldün dediler baba, diyorsun. İnandım. Baban elini yüzüne koyuyor: Bana da öyle dediler. Ben inanmadım. Bu kadar.'
                    : '')
            : 'Sana bakıyor; yabancı bir adama bakar gibi. Teşekkür ederim efendi, diyor kibarca. Afyonun sisi hâlâ gözlerinde. ' + (yanimda(d, 'cemil') ? 'Cemil Bey yanına eğiliyor: Günler sürer, diyor. Belki haftalar. Ama dönecek.' : 'Günler sürecek, belki haftalar. Ama dönecek.'),
          neslihanBurada(d)
            ? (tanima >= 2
              ? 'Ve senin arkanda duran kıza dönüyor. Ellerini onun yüzüne koyuyor, titreyerek. Neslihan\'ım. Ayvam. Neslihan çocuk gibi ağlıyor.'
              : 'Neslihan ona yaklaşıyor ve parmaklarıyla babanın elinin üstüne vuruyor: tak, tak-tak, tak. Babanın eli duruyor. Sonra kendi parmaklarıyla aynı ritmi tekrarlıyor. Bir şeyi tanımıyor; ama bir şey onu tanıyor.')
            : 'Ve bir an, sanki birini arar gibi, etrafına bakınıyor.',
          'Stojan bir battaniye getiriyor. Yüzbaşı Ristić pencerede, şapkasını çıkarmış.',
        ];
      },
      secenekler: [{ etiket: 'Devam', etki: (d) => ({ bayrak: { babaKurtuldu: true, babaTanidi: sayi(d, 'babaTanima') + (neslihanBurada(d) ? 1 : 0) >= 2 } }), sonra: 'han' }],
    },
    han: {
      ortam: 'ortam_manastir',
      ortamOran: 0.4,
      baslik: '27 Aralık, gece',
      paragraflar: (d) => [
        'Yusuf Usta\'nın dükkânının üstündeki odada, mangalın başında. Baban yorganın altında uyuyor; derin, ilaçsız ilk uykusu.',
        yanimda(d, 'cemil')
          ? 'Cemil Bey nabzını sayıyor. Afyonu birden kesersek titrer, terler, sayıklar, diyor. Azaltarak gideceğiz. Ben buradayım.'
          : 'Yusuf Usta mahallenin ebesini getirdi. Afyonu azaltarak kesin, dedi kadın. Birden keserseniz titrer.',
        'Babanın yastığının yanında deri bohça. Çekiç, körük ağzı. Ve o küçük kalıp: kanat biçiminde. Hasler\'in sözleri kulağında: Anahtarlarımızın kalıbını o döktü.',
        'Bir kalaycı. Bakırı zehirden korumak için yaşayan bir adam. 1908\'de, bilmeden mi, bilerek mi, bir zehrin kalıbını dökmüş.',
        neslihanBurada(d)
          ? 'Neslihan babanın başucunda uyuyakalmış. Elinde hâlâ babanın eli.'
          : 'Pencereden karlı çatılara bakıyorsun.',
        yanimda(d, 'nermin')
          ? 'Nermin defterini kapatıyor. Viyana, diyor. On beş Ocak. Gazetem için bir Viyana muhabiri kartı bulabilirim. Bize üç hafta var.'
          : 'Rıza Bey bıyığını sıvazlıyor. Viyana, diyor. On beş Ocak. Üç haftamız var. Ve bir defterimiz.',
        'Baban uykusunda bir şey mırıldanıyor. Eğiliyorsun. Anahtar, diyor. Anahtarı ben yaptım. Affet.',
        'Sekizinci bölümün sonu.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_manastir',
      ortamOran: 0.4,
      baslik: 'Sekizinci bölüm bitti',
      paragraflar: ['Babanı buldun. Sıradaki: Viyana. Kararların kaydedildi.'],
      secenekler: [{ etiket: 'Dokuzuncu bölüme geç', sonrakiBolum: 'bolum9' }, { etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    carsi: {
      ad: 'Manastır çarşısı',
      ortam: 'ortam_manastir',
      tarif: 'Karla örtülü dar sokaklar, yarısı yıkık dükkânlar. Bakırcılar arastası hâlâ çınlıyor; iki üç çekiç, eskisinin yanında bir fısıltı. Saat kulesinin dibinde bir askerî devriye. Uzakta, şehrin kenarında, taş duvarlı cezaevi.',
      nesneler: [
        {
          id: 'dukkan',
          etiket: 'Babanın eski dükkânı',
          incele: (d) =>
            delilVar(d, 'kalay_takimi')
              ? 'Kepenk kapalı. Tabelanın yerinde boş bir çivi.'
              : 'Bakırcılar arastasının sonunda bir kepenk. Üstünde silik bir tabelanın izi: Kalaycı İsmail. Kepengin önünde, ellerini ovuşturan orta yaşlı bir usta seni süzüyor. Arif? diyor; sesi kırılıyor. Arif ağabey?',
          etki: { bayrak: { yusufBulundu: true } },
        },
        {
          id: 'saat_kulesi',
          etiket: 'Saat kulesi',
          incele: 'Çocukken her öğlen burada babanı beklerdin. Kulenin taşlarında şarapnel izleri. Saat yanlış gösteriyor; belki iki yıldır.',
        },
      ],
      kisiler: ['yusuf', 'cemil', 'nermin', 'riza', 'neslihan'],
      gecisler: [
        { hedef: 'baba_evi', etiket: 'Eski evinize git' },
        { hedef: 'cezaevi', etiket: 'Cezaevine git' },
      ],
    },
    baba_evi: {
      ad: 'Eski eviniz',
      ilkSahne: (d) => (neslihanBurada(d) ? 'ani4' : 'avlu_neslihan'),
      ortam: 'ortam_manastir',
      tarif: 'Kararmış duvarlar, kar dolmuş odalar. Avluda yaşlı ayva ağacı. Mutfak ocağının taşı hâlâ yerinde.',
      nesneler: [
        {
          id: 'ocak',
          etiket: 'Ocak taşı',
          incele: 'Annenin ocağı. Taşın altına bir zamanlar bayram harçlıklarını saklardınız. Eğilip bakıyorsun: kurumuş bir ayva çekirdeği. Neslihan her bayram oraya bir çekirdek gömerdi; ağaç olsun diye.',
        },
        {
          id: 'agac',
          etiket: 'Ayva ağacı',
          incele: 'Gövdesinde çakıyla oyulmuş iki harf, kabuk büyüdükçe genişlemiş: A ve N. Senin oyduğun. On iki yaşındaydın.',
        },
      ],
      kisiler: ['neslihan'],
      gecisler: [{ hedef: 'carsi', etiket: 'Çarşıya dön' }],
    },
    cezaevi: {
      ad: 'Cezaevi avlusu',
      ortam: 'ortam_cezaevi',
      tarif: 'Yüksek taş duvarlar, karla dolu bir avlu, demir parmaklıklı pencereler. Kapıda bir nöbetçi. Avlunun bir ucunda revir, öbür ucunda hücreler. Bir yerden, çok uzaktan, metal üstünde metal: tak, tak-tak, tak.',
      nesneler: [
        {
          id: 'ses',
          etiket: 'Tıkırtı',
          incele: (d) =>
            bayrak(d, 'ritimBilindi')
              ? 'Tak, tak-tak, tak. Bir kaşık, bir demir parmaklığa vuruyor. Babanın çekicinin şarkısı. Kalbin duruyor.'
              : 'Tak, tak-tak, tak. Bir kaşık bir demir parmaklığa vuruyor. Bir ritim; tanıdık ama nereden?',
        },
      ],
      kisiler: ['stojan', 'cemil', 'nermin', 'riza', 'neslihan'],
      gecisler: [
        { hedef: 'revir', etiket: 'Revire git' },
        { hedef: 'hucre', etiket: 'Hücreye git', kosul: (d) => bayrak(d, 'hucreIzni') },
        { hedef: 'carsi', etiket: 'Çarşıya dön' },
      ],
    },
    revir: {
      ad: 'Revir',
      ortam: 'ortam_revir',
      tarif: 'Dar bir oda, kükreyen bir soba, iki demir karyola. Duvarda ilaç dolabı, masada dosyalar. Pencerenin önünde gözlüklü, sarı sakallı, temiz önlüklü bir adam: Doktor Ferdinand Hasler.',
      nesneler: [
        {
          id: 'dosyalar',
          etiket: 'Masadaki dosyalar',
          incele: (d) =>
            delilVar(d, 'hasler_raporu')
              ? 'Dosyalar karışık.'
              : 'Hasler pencereye döndüğünde dosyaları karıştırıyorsun. İsmail, hücre 14. Aylık raporlar. Birini okuyorsun, sonra bir sonrakini. Aynı cümleler, kelimesi kelimesine. Yirmi dört ay boyunca. Kimse bir adamı yirmi dört ay aynı cümlelerle tarif edemez. Bunlar yazılmış, bakılmamış.',
          etki: (d) => (delilVar(d, 'hasler_raporu') ? null : { delil: ['hasler_raporu'] }),
        },
        {
          id: 'dolap',
          etiket: 'İlaç dolabı',
          incele: (d) =>
            delilVar(d, 'afyon')
              ? 'Dolap kapalı.'
              : bayrak(d, 'haslerOyalandi')
                ? 'Nermin Hasler\'i pencerenin önünde soru yağmuruna tutmuşken dolabın anahtarını soba rafında buluyorsun. İçeride bir şişe laudanum; etiketinde kurşun kalemle: 14, sabah, yirmi damla. Yirmi damla. Bir atı uyutur.'
                : yanimda(d, 'riza')
                  ? 'Rıza Bey öksürük nöbetine tutuluyor, Hasler ona su getirmeye dönerken Rıza\'nın teli dolabın kilidinde. Bir şişe laudanum; etiketinde kurşun kalemle: 14, sabah, yirmi damla. Yirmi damla. Bir atı uyutur.'
                  : 'Kilitli. Hasler\'in gözü hep üstünde.',
          etki: (d) => (delilVar(d, 'afyon') || !(bayrak(d, 'haslerOyalandi') || yanimda(d, 'riza')) ? null : { delil: ['afyon'] }),
        },
      ],
      kisiler: ['hasler'],
      gecisler: [{ hedef: 'cezaevi', etiket: 'Avluya dön' }],
    },
    hucre: {
      ad: 'Hücre 14',
      ortam: 'ortam_cezaevi',
      tarif: 'İki adım boyunda, bir adım eninde. Duvarda bir pencere, karla dolu. Yerde saman bir şilte. Şiltenin üstünde, battaniyeye sarılmış, ak sakallı, zayıf bir adam; elinde bir kaşık.',
      nesneler: [
        {
          id: 'duvar',
          etiket: 'Duvardaki çizikler',
          incele: 'Duvarın her yeri çizik. Gün sayan çizgiler; sonra bırakılmış. Ortada, kaşığın sapıyla kazınmış bir ağaç. Dallarında yuvarlak meyveler. Ayva. Altında, eğri harflerle: A. N.',
        },
        {
          id: 'goz',
          etiket: 'Gözleri',
          incele: (d) =>
            yanimda(d, 'cemil')
              ? 'Cemil Bey babanın yanına çömeliyor, göz kapağını nazikçe kaldırıyor. Gözbebekleri iğne ucu, diyor. Nabız yavaş, cilt kuru, kabız. Bu deli değil Arif. Bu afyon. Her gün, uzun zamandır.'
              : 'Gözbebekleri iğne ucu gibi küçücük. Konuşurken kelimeler ağır, uykulu. Biri ona her gün bir şey veriyor. Revirde olmalı.',
          etki: (d) => (yanimda(d, 'cemil') && !delilVar(d, 'afyon') ? { delil: ['afyon'] } : null),
        },
      ],
      kisiler: ['baba'],
      gecisler: [{ hedef: 'cezaevi', etiket: 'Avluya dön' }],
    },
  },

  kisiler: {
    yusuf: {
      ad: 'Yusuf Usta',
      kosul: (d) => bayrak(d, 'yusufBulundu'),
      giris: (d) => (delilVar(d, 'kalay_takimi') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Yusuf Usta seni dükkânın içine çekiyor, mangalı karıştırıyor. Babanın çırağıydı; sen askere gittiğinde on üç yaşındaydı. Şimdi yirmisinde; ama otuzunda gibi görünüyor. Altı yıl, ağabey, diyor. Seni öldü bildik.',
          secenekler: [
            {
              etiket: 'Babam. Ne oldu ona?',
              sonra: 'ilk',
              cevap: 'Kasım on ikide, Sırplar şehre girdiğinde, diyor. Usta seni aramaya çıktı; esirler arasında, hastanelerde, sokak sokak. Arif Demir, kalaycının oğlu, diye sordu. Sonra bir gün dükkânın önünde jandarma onu aldı. Casus, dediler. Ondan beri cezaevinde. Ziyaret yasak. Deli olmuş, diyorlar.',
            },
            {
              etiket: 'Dükkân ne oldu?',
              etki: { delil: ['kalay_takimi'] },
              sonra: 'sonra',
              cevap: 'Yusuf rafın arkasından bir deri bohça çıkarıyor. Ustanın takımı, diyor. Altı yıl sakladım. Jandarma her şeyi aldı, bunu ben kaçırdım. Çekiç, körük ağzı, nişadır taşı. Ve küçük bir kalıp; kanat biçiminde. Bunu ne için yaptığını hiç söylemedi, diyor Yusuf. Selanik\'ten bir Fransız getirmişti siparişini. Bir kere.',
            },
          ],
        },
        sonra: {
          soz: 'Yusuf Usta bir bakır tasa kalay sürüyor. Ustanın öğrettiği gibi, diyor. İnce bir kat. Kimse görmez.',
          secenekler: [
            {
              etiket: 'Babamı çıkarırsam onu İstanbul\'a götüreceğim. Sen gelir misin?',
              kosul: (d) => !bayrak(d, 'yusufSoz'),
              sonra: 'yusuf_soz',
            },
            { etiket: 'Sağ ol Yusuf.' },
          ],
        },
        yusuf_soz: {
          soz: 'Yusuf Usta çekici bırakıyor. Burası benim şehrim ağabey, diyor. Sırp olsun, Türk olsun, Bulgar olsun; bu çarşıda kalaycı lazım. Ustanın dükkânını ben açık tutarım. Ama bir şey isteyeceğim: usta bir gün bana bir mektup yazsın. Okuma bilmez; sen yazarsın, o söyler. Altı yıl bekledim; bir mektup daha beklerim.',
          secenekler: [
            {
              etiket: 'Söz. Her bayram bir mektup.',
              etki: { bayrak: { yusufSoz: 'soz' } },
              sonra: 'sonra',
              cevap: 'Yusuf gülümsüyor; yirmi yaşında bir çocuğun gülümsemesi, otuz yaşında bir yüzde. Her bayram, diyor. Ben de cevap yazarım. Benim yazım kötü; ama usta okur. Yani sen okursun.',
            },
            {
              etiket: 'Söz veremem Yusuf. Önümüzde ne var bilmiyorum.',
              etki: { bayrak: { yusufSoz: 'yok' } },
              sonra: 'sonra',
              cevap: 'Yusuf başını sallıyor. Dürüst bir cevap, diyor. Usta da öyle derdi: Bilmediğin işe söz verme, kalay tutmaz.',
            },
          ],
        },
      },
    },
    stojan: {
      ad: 'Gardiyan Stojan',
      giris: (d) => (bayrak(d, 'hucreIzni') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'İri yapılı, kırçıl bıyıklı bir gardiyan. Kapıdaki kulübeden çıkıyor, Türkçe konuşuyor; çarşıda büyümüş bir Manastırlının Türkçesi. Ziyaret yok, efendi, diyor. Kimin için geldin?',
          secenekler: [
            {
              etiket: 'Kalaycı İsmail Usta. Babam.',
              etki: { bayrak: { stojanBildi: true } },
              sonra: 'baba',
            },
          ],
        },
        baba: {
          soz: 'Stojan bir süre susuyor. Kaşık mı? diyor. On dört numara. Bütün gün parmaklığa vurur: tak, tak-tak, tak. Deli diyorlar. Ben deli görmedim onda. Yorgun gördüm. Babamı hatırlatır bana; o da demirciydi.',
          secenekler: [
            {
              etiket: 'Kayıt defterini görebilir miyim?',
              kosul: (d) => !delilVar(d, 'cezaevi_kaydi'),
              etki: { delil: ['cezaevi_kaydi'] },
              sonra: 'baba',
              cevap: (d) =>
                yanimda(d, 'riza')
                  ? 'Stojan kulübeden kalın bir defter getiriyor. Rıza Bey sayfaları bir avcı gibi çeviriyor. Kasım 1912, casusluk şüphesi. Mahkeme yok. 1913, yargılanması ertelendi. 1914, ertelendi. Her yıl. Ertelemeyi kim imzalamış? Hep aynı mühür. Kırk yıl defter okudum, diyor Rıza Bey. Bir adamı yargılamadan yıllarca tutmanın tek yolu birinin her yıl unutmasını sağlamaktır.'
                  : 'Stojan kulübeden kalın bir defter getiriyor, satırı parmağıyla gösteriyor. Kasım 1912, casusluk şüphesi. Mahkeme yok. 1913, yargılanması ertelendi. 1914, ertelendi. Her yıl ertelendi. 1916\'dan beri: Dr. Hasler raporu, tehlikeli akıl hastası.',
            },
            {
              etiket: 'Onu görmeme izin ver. Beş dakika.',
              kosul: (d) => delilVar(d, 'cezaevi_kaydi') && !bayrak(d, 'hucreIzni'),
              etki: { bayrak: { hucreIzni: true } },
              cevap: 'Stojan omzunun üstünden revire bakıyor. Doktor görmesin, diyor. Doktor ziyareti sevmez. Anahtar demetini sallıyor. Beş dakika.',
            },
            { etiket: 'Sonra konuşuruz.' },
          ],
        },
        sonra: {
          soz: 'Stojan anahtarlarını sallıyor. Doktor revirde, diyor. Dikkat et.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
    hasler: {
      ad: 'Doktor Hasler',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) => [
            'Hasler Fransızca konuşuyor; kibar, yumuşak, Cenevre aksanlı. ' + (yanimda(d, 'cemil') ? 'Cemil Bey çeviriyor.' : 'Nermin çeviriyor.'),
            'Cenevre Yardım Heyeti, diyor. Savaşın unuttuğu hastalar. Kimse bakmazsa ben bakarım.',
          ].join(' '),
          secenekler: [
            {
              etiket: 'On dört numaradaki hastanızı sor.',
              sonra: 'ilk',
              cevap: 'Ah, kalaycı, diyor Hasler; yüzü değişmiyor. Zavallı adam. Dementia praecox. Saldırgan, sanrılı. Bir oğlu olduğunu sanıyor; savaşta öldüğü hâlde. Nakledilmesini istedim; yarın sabah Üsküp\'e gidiyor, orada daha iyi bakılır. Demir, dediniz, değil mi? Soyadınız? Hmm. Güzel bir isim.',
            },
            {
              etiket: 'Nermin: Cenevre gazeteleri için bir röportaj?',
              kosul: (d) => yanimda(d, 'nermin') && !bayrak(d, 'haslerOyalandi'),
              etki: { bayrak: { haslerOyalandi: true } },
              sonra: 'ilk',
              cevap: 'Nermin defterini açıp Hasler\'e Journal de Genève için yazdığını söylüyor. Hasler\'in gözleri parlıyor; pencereye dönüp savaş hastalarını, yardım heyetini, kendi fedakârlığını anlatmaya başlıyor. Uzun uzun. Arkası dolaba dönük.',
            },
            { etiket: 'Teşekkürler doktor.' },
          ],
        },
      },
    },
    baba: {
      ad: 'İsmail Usta',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Baban başını kaldırıp sana bakıyor. Gözlerinde sis. Doktor mu geldi? diyor. Damla vakti mi? Sesi ince, çocuk gibi. Elindeki kaşıkla parmaklığa vuruyor: tak, tak-tak, tak.',
          secenekler: [
            {
              etiket: 'Kalay takımını ellerine ver.',
              kosul: (d) => delilVar(d, 'kalay_takimi') && !bayrak(d, 'takimVerildi'),
              etki: { bayrak: { takimVerildi: true }, artir: { babaTanima: 1 } },
              sonra: 'ilk',
              cevap: 'Çekici eline alıyor. Parmakları sapın üstünde, damganın üstünde geziniyor. İ. Bir an gözlerindeki sis çekiliyor. Bu benim, diyor. Bunu kim getirdi? Yusuf mu? Yusuf iyi çocuktur. Sonra sis geri geliyor.',
            },
            {
              etiket: 'Ritmi parmaklığa vur: tak, tak-tak, tak.',
              kosul: (d) => bayrak(d, 'ritimBilindi') && !bayrak(d, 'ritimVuruldu'),
              etki: { bayrak: { ritimVuruldu: true }, artir: { babaTanima: 1 } },
              sonra: 'ilk',
              cevap: 'Parmağınla parmaklığa vuruyorsun. Tak, tak-tak, tak. Babanın kaşığı duruyor. Seni dinliyor. Sonra devam ediyor; seninle birlikte. Tak, tak-tak, tak. Gözleri doluyor ama neden ağladığını bilmiyor gibi.',
            },
            {
              etiket: 'Baba. Benim, Arif.',
              sonra: 'ilk',
              cevap: 'Arif, diyor; kelimeyi tadına bakar gibi. Arif askerde. Arif esir düştü. Arif\'i arıyorum. Gördün mü onu? Uzun boylu, sol kulağı… Sesi kayboluyor.',
            },
            { etiket: 'Seni buradan çıkaracağım.' },
          ],
        },
      },
    },
    cemil: {
      ad: 'Cemil Bey',
      kosul: (d) => yanimda(d, 'cemil'),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            delilVar(d, 'afyon')
              ? 'Cemil Bey gözlüğünü siliyor. Bir hekim afyonu ağrıya verir, diyor. Bu adam onu susturmaya veriyor. Yemin ettiğimiz şeyin tam tersi.'
              : 'Cemil Bey paltosunun yakasını kaldırıyor. Manastır, diyor. Burada bir yaz kolera vardı, 1912\'den önce. Gençtim. Senin şehrin beni hekim yaptı.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
    nermin: {
      ad: 'Nermin Hanım',
      kosul: (d) => yanimda(d, 'nermin'),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Nermin şehre bakıyor, defterine yazıyor. Burada üç dil konuşulan bir çarşı vardı, diyor; beş belki. Şimdi her köşede bir başka bayrak. Sonra sana dönüyor: Babanı bulacağız Arif. Ben ağabeyimi bulamadım. Sen bulacaksın.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
    riza: {
      ad: 'Rıza Bey',
      kosul: (d) => yanimda(d, 'riza'),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Rıza Bey karın içinde cezaevinin duvarlarına bakıyor. Her hapishanenin bir defteri vardır, diyor. Gardiyanı bul, defteri bul. Gerisi gelir.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
    neslihan: {
      ad: 'Neslihan',
      kosul: (d) => neslihanBurada(d),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'babaKurtuldu')
              ? 'Neslihan babanın başucunda. Konuşmuyor; yalnızca bakıyor.'
              : 'Neslihan paltosuna sarılmış, karlı sokaklara bakıyor. Bu şehirde bir kızdım, diyor. Sonra başka biri oldum. Şimdi hangisiyim bilmiyorum.',
          secenekler: [
            {
              etiket: 'İkisi de sensin.',
              kosul: (d) => !bayrak(d, 'neslihanTeselli8'),
              etki: { bayrak: { neslihanTeselli8: true } },
              sonra: 'ilk',
              cevap: 'Neslihan başını omzuna yaslıyor. Bir an. Sonra doğruluyor. Babamı bulalım, diyor. Sonra kim olduğumu düşünürüm.',
            },
            { etiket: 'Hadi.' },
          ],
        },
      },
    },
  },
};
