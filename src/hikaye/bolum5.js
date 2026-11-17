// Beşinci bölüm: "Kalliope". İstanbul'dan Selanik'e iki gecelik vapur yolculuğu (20-22 Aralık 1918).
// Yeni oynanış: ekip seçimi (üç kişiden ikisi gelir). Her ekip üyesinin kendi delil yolu var:
// Cemil zehri tanır, Nermin Almanca notu okur, Rıza kamarotu konuşturur. Ortak delil kol düğmesi + bunlardan biri.
// Arka plan (gerçek): Selanik 1912'den beri Yunanistan'da; 1917 büyük yangını şehrin merkezini yaktı;
// 1918'de İtilaf'ın Doğu Ordusu'nun üssü. Vapur, yolcular, Garnier ve bütün olay KURGUDUR.
import { BOLUM4 } from './bolum4';
import { bayrak, cikarimVar, delilVar } from '../oyun/motor';

const yanimda = (d, kim) => !!bayrak(d, 'ekip_' + kim);
const GARNIER_CIKARIMLARI = ['garnier_zehir', 'garnier_kamarot', 'garnier_not', 'garnier_sise'];
const garnierBulundu = (d) => GARNIER_CIKARIMLARI.some((id) => cikarimVar(d, id));

const garnierMetni =
  'Kanatlı anahtarlı kol düğmeleri ve Brenner\'in ölümü aynı adamı gösteriyor: şarap tüccarı Mösyö Garnier. Brenner örgütten kaçmak istiyordu; Garnier onu durdurmak için bu gemideydi.';

export const BOLUM5 = {
  id: 'bolum5',
  ad: 'Beşinci bölüm: Kalliope',
  baslangic: 'acilis',
  ilkMekan: 'kamara',

  deliller: {
    ...BOLUM4.deliller,
    telgraf: { ad: 'Delorme\'un telgrafı', tarif: 'SALONIQUE. N. ARRIVE 23 DÉCEMBRE. ATTENDRE INSTRUCTIONS. Selanik; N. yirmi üç aralıkta geliyor; talimat bekleyin.' },
    kol_dugmesi: { ad: 'Garnier\'in kol düğmeleri', tarif: 'Şarap tüccarı Mösyö Garnier\'in altın kol düğmelerinde minicik kabartma: kanatlı bir anahtar.' },
    zehir: { ad: 'Fincandaki acı badem', tarif: 'Cemil Bey\'e göre Brenner\'in kahve fincanı acı badem kokuyor: siyanür. Ölüm birkaç dakika sürmüş.' },
    kamarot_ifadesi: { ad: 'Kamarotun ifadesi', tarif: 'Kamarot Lefteris, gece yarısı Brenner\'in kahvesini Mösyö Garnier\'in kendi eliyle götürdüğünü söyledi; "ikram" diye.' },
    brenner_notu: { ad: 'Brenner\'in Almanca notu', tarif: 'Nermin\'in okuduğu not: Morin. İkinci gece, güverte. Her şeyi anlatacağım. Beni Selanik\'te koruyacaklarına söz verdiler.' },
    bos_sise: { ad: 'Garnier\'in kamarasındaki boş şişe', tarif: 'Garnier\'in bavulunun dibinde, mendile sarılı, küçük kahverengi bir şişe. Boş. Ağzında acı badem kokusu.' },
    talimat_metni: { ad: 'Mühürlü mektup', tarif: 'Brenner\'in ceket astarına dikilmiş, kanatlı anahtar mühürlü mektup. İçinde Madam N.\'ye talimat.' },
  },

  cikarimlar: {
    ...BOLUM4.cikarimlar,
    garnier_zehir: { a: 'kol_dugmesi', b: 'zehir', ad: 'Brenner\'i Garnier zehirledi', metin: garnierMetni },
    garnier_kamarot: { a: 'kol_dugmesi', b: 'kamarot_ifadesi', ad: 'Brenner\'i Garnier zehirledi', metin: garnierMetni },
    garnier_not: { a: 'kol_dugmesi', b: 'brenner_notu', ad: 'Brenner\'i Garnier susturdu', metin: garnierMetni },
    garnier_sise: { a: 'kol_dugmesi', b: 'bos_sise', ad: 'Brenner\'i Garnier zehirledi', metin: garnierMetni },
    talimat: {
      a: 'talimat_metni',
      b: 'telgraf',
      ad: 'Madam N.\'ye verilen talimat',
      metin: 'Delorme\'un telgrafının söz ettiği talimat bu mektup. Madam N. yirmi üç aralıkta Selanik\'te, Hotel Olympos\'ta "hamalı" bekleyecek. Defteri alınca ondan kurtulacak. Seni öldürmesi istenen kadın, cebindeki fotoğraftaki kadın.',
    },
  },

  olaylar: [
    {
      id: 'olum',
      kosul: (d) => bayrak(d, 'brennerKonustu') && delilVar(d, 'kol_dugmesi'),
      etki: { mekan: 'koridor', sahne: 'cigilik' },
    },
    {
      id: 'firtina',
      kosul: (d) => garnierBulundu(d) && cikarimVar(d, 'talimat'),
      etki: { mekan: 'guverte', sahne: 'firtina' },
    },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Beşinci bölüm bitti.' },
    { kosul: (d) => !bayrak(d, 'olay_olum'), metin: 'Akşam yemeği salonda. Yolcuları tanı; özellikle sinirli görünen İsviçreliyle konuş.' },
    { kosul: (d) => !garnierBulundu(d), metin: 'Brenner\'i kim öldürdü? Kamarasını incele, yanındakilerin yeteneklerinden yararlan, kamarotla ve Yüzbaşı Morin\'le konuş.' },
    { kosul: (d) => !cikarimVar(d, 'talimat'), metin: 'Brenner\'in taşıdığı mühürlü mektubu Delorme\'un telgrafıyla birleştir.' },
    { kosul: () => true, metin: 'Selanik yaklaşıyor.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_rihtim',
      baslik: 'Galata rıhtımı, 20 Aralık',
      paragraflar: (d) => [
        'Akşamüstü. Galata rıhtımında Yunan bayraklı bir yolcu vapuru, Kalliope, kazanlarını yakıyor. Bacasından kara bir duman kıvrılarak Boğaz\'a uzanıyor.',
        'Gülce sana bir zarf uzatıyor: liman kâğıtları, yolcu biletleri, Selanik\'te bir tütün tüccarının yardımcısı olduğunu yazan bir belge. Hiçbiri tamamen sahte değil, diyor. Hiçbiri tamamen gerçek de değil. Babam olsa kızardı.',
        'Süleyman Kaptan sargılı kolunu göğsüne bastırmış, bir sandığın üstünde oturuyor. Ali yanında. Pusulayı bende bırakma, diyor sen paslı pusulayı uzatınca. Sende kalsın. Kuzeyi göstersin.',
        'Sonra ekip. Selanik\'e dört kişi gidemezsiniz; dikkat çekersiniz. Biri İstanbul\'da kalmalı: Süleyman\'a, Gülce\'ye, deftere göz kulak olmalı.',
        bayrak(d, 'fotografVerildi')
          ? 'Cebinde fotoğraf yok artık. Ama yüzü, Delorme\'un "ne kadar benziyorsunuz" sözüyle birlikte, aklının içinde.'
          : 'Cebinde fotoğraf. Örgülü saçlar. Yirmi üç aralık.',
      ],
      secenekler: [
        {
          etiket: 'Cemil Bey ve Nermin gelsin. Rıza Bey İstanbul\'da kalsın.',
          etki: { bayrak: { ekip_cemil: true, ekip_nermin: true, ekip_riza: false }, delil: ['telgraf'] },
          sonra: 'kalkis',
        },
        {
          etiket: 'Cemil Bey ve Rıza Bey gelsin. Nermin İstanbul\'da kalsın.',
          etki: { bayrak: { ekip_cemil: true, ekip_nermin: false, ekip_riza: true }, delil: ['telgraf'] },
          sonra: 'kalkis',
        },
        {
          etiket: 'Nermin ve Rıza Bey gelsin. Cemil Bey İstanbul\'da kalsın.',
          etki: { bayrak: { ekip_cemil: false, ekip_nermin: true, ekip_riza: true }, delil: ['telgraf'] },
          sonra: 'kalkis',
        },
      ],
    },
    kalkis: {
      ortam: 'ortam_guverte',
      efekt: ['vapur_duduk'],
      baslik: 'Kalkış',
      paragraflar: (d) => {
        const kalan = !yanimda(d, 'cemil') ? 'Cemil Bey' : !yanimda(d, 'nermin') ? 'Nermin' : 'Rıza Bey';
        return [
          'Kalliope iki kez öttürüyor. Halatlar çözülüyor. Rıhtım yavaşça geri çekiliyor: Süleyman\'ın kalkmış eli, Gülce\'nin siyah mantosu, Ali\'nin koşarak el sallaması, ' + kalan + '\'in rıhtımda dimdik duruşu.',
          'Sarayburnu\'nu dönerken İstanbul sisin içinde eriyor. Hayatında ilk kez bu şehri denizden, giderken görüyorsun. Gelirken bir askerdin. Şimdi ne olduğunu bilmiyorsun.',
          'Selanik. Doğduğun yere, Manastır\'a giden demiryolunun başladığı şehir. Çocukken babanla bir kez gitmiştin; Beyaz Kule\'yi görüp çok büyük sanmıştın.',
        ];
      },
      secenekler: [{ etiket: 'Kamaraya in', etki: { mekan: 'kamara', bayrak: { 'gorüldü_kamara': true } } }],
    },
    cigilik: {
      ortam: 'ortam_kamara',
      baslik: 'Gece yarısı',
      paragraflar: [
        'Gece yarısını geçiyor. Bir çığlık; kamarotun sesi, Rumca bir şey bağırıyor. Koridora fırlıyorsun.',
        'Yedi numaralı kamaranın kapısı açık. Kamarot Lefteris bembeyaz, eli ağzında. İçeride, ranzanın kenarında, Herr Brenner. Başı göğsüne düşmüş, sanki uyuyor. Masada devrilmiş bir kahve fincanı.',
        'Akşam yemeğinde sana fısıldadığı sözler kulağında: Bu gemide güvende değilim.',
        'Koridorun ucunda bir kapı sessizce kapanıyor. Dokuz numara.',
      ],
    },
    mektup: {
      ortam: 'ortam_kamara',
      baslik: 'Mühür',
      paragraflar: [
        'Brenner\'in ceketinin astarı bir yerinden yeniden dikilmiş; iplik farklı renk. Bir hamal, malın nerede saklandığını bilir. Astarı söküyorsun.',
        'İnce, kalın kâğıttan bir zarf. Mühür mumu kırmızı, üstünde kanatlı anahtar. Üzerinde tek bir harf: N.',
      ],
      secenekler: [
        {
          etiket: 'Mührü kırmadan, bir lambanın buharıyla yavaşça aç.',
          etki: { delil: ['talimat_metni'], bayrak: { muhurSaglam: true } },
          sonra: 'mektup_oku',
        },
        {
          etiket: 'Mührü kır ve oku.',
          etki: { delil: ['talimat_metni'], bayrak: { muhurSaglam: false } },
          sonra: 'mektup_oku',
        },
      ],
    },
    mektup_oku: {
      ortam: 'ortam_kamara',
      baslik: 'Talimat',
      paragraflar: (d) => [
        bayrak(d, 'muhurSaglam')
          ? 'Lambanın üstünde, buharda, mum yumuşuyor; zarfın kapağı mührü bozmadan açılıyor. Bir gün bu mührün sağlam olması işine yarayabilir.'
          : 'Mum kırılıyor. Kanatlı anahtar ikiye ayrılıyor.',
        yanimda(d, 'nermin')
          ? 'Mektup Fransızca. Nermin yüksek sesle, yavaş yavaş çeviriyor; her cümlede sesi biraz daha kısılarak.'
          : 'Mektup Fransızca. Cemil Bey, Paris\'te geçen yıllarının Fransızcasıyla, yavaş yavaş çeviriyor; her cümlede gözlüğünü biraz daha sıkı tutarak.',
        'Sevgili N. İstanbul\'daki defterin yarısı bir hamalın elinde. Selanik\'e gelecek; ondan eminiz, çünkü onu çeken şey senin fotoğrafın. Yirmi üç aralık akşamı Hotel Olympos\'ta onu bekle. Kibar ol. Güvenini kazan. Defteri alınca ondan kurtul.',
        'Altında imza yok. Yalnızca kanatlı anahtar.',
        'Ondan kurtul.',
        'Kâğıt elinde titriyor. Fotoğraftaki kadın. Örgülü saçlar. Seni öldürmesi için ona bir mektup yazmışlar ve sen o mektubu ona götüren gemidesin.',
      ],
      secenekler: [
        { etiket: 'Nefesini say. Mektubu katla.', sonra: null },
        { etiket: 'Mektubu yumruğunda buruştur.', etki: { artir: { travma: 1 } }, sonra: null },
      ],
    },
    firtina: {
      ortam: 'ortam_firtina',
      baslik: 'Fırtına',
      paragraflar: (d) => [
        'İkinci gece. Ege kabarıyor; Kalliope bir sallanıp bir dikiliyor. Güverte ıslak, rüzgâr insanı denize atacak kadar sert.',
        'Garnier\'i güvertenin kıçında, bir filika vinçinin altında buluyorsun. Yalnız değil: Saltiel Efendi\'yi kolundan tutmuş, boğazına ince bir bıçak dayamış. Tütün tüccarının gözlükleri kaymış, yüzü bembeyaz.',
        'Hamal! diye bağırıyor Garnier rüzgârın içinden. Bu adam akşam yemeğinde fazla şey gördü. Mektubu ver bana. Mektubu ver, ben de onu bırakayım. Sonra hepimiz Selanik\'e gideriz; sanki hiçbir şey olmamış gibi.',
        bayrak(d, 'yaraKol') ? 'Sol kolundaki dikişler yağmurda zonkluyor. Delorme\'un bıçağının bıraktığı hatıra.' : 'Ellerin soğuktan uyuşmuş ama sağlam.',
      ],
    },
    varis: {
      ortam: 'ortam_rihtim',
      efekt: ['vapur_duduk'],
      baslik: 'Selanik, 22 Aralık',
      paragraflar: (d) => [
        'Şafak. Fırtına dindi. Kalliope ağır ağır Selanik körfezine giriyor.',
        'Önce Beyaz Kule görünüyor; çocukken çok büyük sandığın kule, sabah ışığında beyaz ve yalnız. Sonra şehir. Rıhtım boyunca İtilaf gemileri, Fransız, İngiliz, Sırp bayrakları. Ve şehrin ortası: kapkara.',
        'Geçen yaz yandı, diyor Saltiel Efendi yanında, sesi kısık. Bir yıl önce, ağustosta. Bir mutfaktan çıkan kıvılcım; rüzgâr gerisini yaptı. Benim evim, babamın dükkânı, sinagogumuz, camiler, kiliseler; hepsi. Yetmiş bin kişi bir gecede evsiz kaldı.',
        'Kül, diye düşünüyorsun. Önce Süleyman\'ın kayıkhanesi, şimdi bütün bir şehir. Ama kül yeniden kuruluyor; rıhtım boyunca iskeleler, yeni çatılar, bağıran işçiler.',
        bayrak(d, 'garnierSonuc') === 'tutuklu'
          ? 'Yüzbaşı Morin iskelede seni bekliyor. Garnier bizde, diyor; ' + (yanimda(d, 'nermin') ? 'Nermin' : 'Saltiel Efendi') + ' çeviriyor. Konuşmuyor; ama konuşacak. Siz de bir gün bize bir şey anlatmak isterseniz, Fransız karargâhında beni sorun.'
          : bayrak(d, 'garnierSonuc') === 'zehir'
            ? 'Garnier\'in cesedi bir brandanın altında iskeleye indiriliyor. Dilinin altında bir kapsül saklamış. Bu adamlar yakalanmaz, diye düşünüyorsun. Ya kaçar ya ölürler.'
            : 'Garnier\'den geriye yalnızca bir şapka kaldı; fırtınada denize düştü. Kaptan raporuna kaza yazacak. Bu kelimeden artık nefret ediyorsun.',
        'Hotel Olympos, diyor ' + (yanimda(d, 'nermin') ? 'Nermin' : 'Cemil Bey') + ', rıhtımın karşısındaki yeni, beyaz bir binayı göstererek. Yarın akşam.',
        'Yarın akşam. Fotoğraftaki kadın. Seni öldürmesi söylenen kadın. ' + (bayrak(d, 'muhurSaglam') ? 'Ve cebinde, mührü sağlam bir mektup. Onu ona sen götürebilirsin.' : 'Ve cebinde, mührü kırık bir mektup.'),
        'Beşinci bölümün sonu.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true, selanikteyiz: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_rihtim',
      ortamOran: 0.4,
      baslik: 'Beşinci bölüm bitti',
      paragraflar: ['Selanik\'e vardın. Altıncı bölüm yazılıyor: Hotel Olympos. Kararların kaydedildi.'],
      secenekler: [{ etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    kamara: {
      ad: 'Kamaran',
      tarif: (d) =>
        'Dar bir kamara; iki ranza, yuvarlak bir lomboz, çengelinde sallanan bir lamba. Makinenin uğultusu duvarlardan geçiyor, dalgalar gövdeye vuruyor. ' +
        (yanimda(d, 'cemil') && yanimda(d, 'nermin')
          ? 'Cemil Bey ranzada kitap okuyor; Nermin lombozdan dışarı bakıyor.'
          : yanimda(d, 'cemil')
            ? 'Cemil Bey ranzada kitap okuyor; Rıza Bey tabancasını yağlıyor.'
            : 'Nermin lombozdan dışarı bakıyor; Rıza Bey tabancasını yağlıyor.'),
      nesneler: [
        {
          id: 'pusula',
          etiket: 'Süleyman\'ın pusulası',
          incele: 'Külden çıkardığın paslı pirinç pusula. İbresi gemiyle birlikte titreyip duruyor, sonra yine kuzeye dönüyor. Arkamızda İstanbul, diye düşünüyorsun. Önümüzde her şey.',
        },
        {
          id: 'lomboz',
          etiket: 'Lomboz',
          incele: 'Camın ardında kapkara deniz. Arada bir köpüren bir dalga ayın ışığını yakalıyor. Çanakkale önlerinden geçiyorsunuz; Seddülbahir orada bir yerde, karanlıkta. Bakmamayı seçiyorsun.',
        },
      ],
      kisiler: ['cemil', 'nermin', 'riza'],
      gecisler: [
        { hedef: 'salon', etiket: 'Yemek salonuna çık' },
        { hedef: 'koridor', etiket: 'Kamaralar koridoruna çık', kosul: (d) => bayrak(d, 'olay_olum') },
        { hedef: 'guverte', etiket: 'Güverteye çık' },
      ],
    },
    salon: {
      ad: 'Yemek salonu',
      tarif: 'Maun kaplı, pirinç lambalı bir salon. Porselenler gemiyle birlikte hafifçe kayıyor. Yolcular az: sinirli, zayıf bir İsviçreli; kır sakallı, kibar bir Fransız şarap tüccarı; üniformalı bir Fransız yüzbaşı; gözlüklü, güler yüzlü bir Selanikli tütün tüccarı.',
      nesneler: [
        {
          id: 'garnier_masa',
          etiket: 'Şarap tüccarının masası',
          incele: [
            'Mösyö Garnier yalnız yiyor; şarabını kokluyor, tadıyor, ve sonunda memnun olmayan bir yüzle bırakıyor. Kadehi kaldırırken ceketinin kolu sıyrılıyor.',
            'Altın kol düğmeleri. Lambanın ışığında minicik bir kabartma parlıyor: iki yanından kanat açmış bir anahtar.',
            'Gözlerini hemen başka yere çeviriyorsun. Garnier seni görmedi. Ya da gördü ve gülümsedi; emin olamıyorsun.',
          ],
          etki: { delil: ['kol_dugmesi'] },
        },
        {
          id: 'garnier_kaptan',
          etiket: 'Kaptanla konuşan Garnier',
          kosul: (d) => bayrak(d, 'olay_olum'),
          incele: 'Garnier salonun ucunda kaptanla konuşuyor; elleri havada, sesi yumuşak. Brenner\'in kalp hastası olduğunu, ilaçlarını unuttuğunu anlatıyor; kaptan başını sallıyor. Bu konuşma uzun sürecek. Dokuz numaralı kamara şimdi boş olmalı.',
          etki: { bayrak: { garnierSalonda: true } },
        },
      ],
      kisiler: ['brenner', 'saltiel', 'morin'],
      gecisler: [
        { hedef: 'kamara', etiket: 'Kamaraya in' },
        { hedef: 'koridor', etiket: 'Kamaralar koridoruna in', kosul: (d) => bayrak(d, 'olay_olum') },
        { hedef: 'guverte', etiket: 'Güverteye çık' },
      ],
    },
    koridor: {
      ad: 'Kamaralar koridoru',
      ortam: 'ortam_kamara',
      tarif: 'Dar, gıcırdayan bir koridor. Lambalar gemiyle sallanıyor. Yedi numaranın kapısı aralık; içeride Brenner. Dokuz numara, Garnier\'in kamarası, kapalı.',
      nesneler: [
        {
          id: 'fincan',
          etiket: 'Brenner\'in kahve fincanı',
          incele: (d) =>
            yanimda(d, 'cemil')
              ? 'Cemil Bey fincanı burnuna yaklaştırıyor, sonra hızla uzaklaştırıyor. Acı badem, diyor. Siyanür. Birkaç dakika sürmüştür. Dudaklarındaki pembeliğe bak. Kahveyle verilmiş; kahvenin acısı zehrinkini örter.'
              : 'Fincanda kahve telvesi. Garip, acı bir koku. Ne olduğunu bilmiyorsun. Cemil Bey burada olsa bilirdi.',
          etki: (d) => (yanimda(d, 'cemil') ? { delil: ['zehir'] } : null),
        },
        {
          id: 'not_defteri',
          etiket: 'Brenner\'in cep defteri',
          incele: (d) =>
            yanimda(d, 'nermin')
              ? 'Nermin defterin son sayfasını okuyor: Almanca. Morin. İkinci gece, güverte. Her şeyi anlatacağım. Beni Selanik\'te koruyacaklarına söz verdiler. Nermin başını kaldırıyor: Kaçmak istiyormuş. Fransızlara.'
              : 'Küçük bir cep defteri; Almanca, sık, titrek bir el yazısı. Bir kelime tanıyorsun: Morin. Gerisi senin için kapalı. Nermin burada olsa okurdu.',
          etki: (d) => (yanimda(d, 'nermin') ? { delil: ['brenner_notu'] } : null),
        },
        {
          id: 'ceket',
          etiket: 'Brenner\'in ceketi',
          incele: (d) =>
            delilVar(d, 'talimat_metni') ? 'Astarı sökülmüş ceket, sandalyenin arkasında.' : 'Sandalyenin arkasında asılı, iyi kesimli bir ceket. Astarın bir yeri farklı renk iplikle dikilmiş.',
          etki: (d) => (delilVar(d, 'talimat_metni') ? null : { sahne: 'mektup' }),
        },
        {
          id: 'kamara9',
          etiket: 'Dokuz numaranın kapısı',
          incele: (d) =>
            bayrak(d, 'garnierSalonda')
              ? [
                  'Garnier salonda kaptanla konuşuyor; kamarası boş. Kilit eski, bir çivi yeter. İçeri giriyorsun.',
                  'Düzenli, kokulu bir kamara. Bavulun dibinde, bir mendile sarılı küçük kahverengi bir şişe. Boş. Ağzında acı badem kokusu.',
                ]
              : 'Kapı kilitli. İçeriden ayak sesleri. Garnier kamarasında. Belki salona çıktığında.',
          etki: (d) => (bayrak(d, 'garnierSalonda') ? { delil: ['bos_sise'] } : null),
        },
      ],
      kisiler: ['lefteris', 'morin'],
      gecisler: [
        { hedef: 'kamara', etiket: 'Kamarana dön' },
        { hedef: 'salon', etiket: 'Salona çık' },
      ],
    },
    guverte: {
      ad: 'Güverte',
      tarif: 'Rüzgâr, tuz, kömür dumanı. Bacadan kıvılcımlar uçuyor; aşağıda makinenin ağır vuruşu. Uzakta, karanlığın içinde Gelibolu\'nun ya da adaların silueti.',
      nesneler: [
        {
          id: 'filika',
          etiket: 'Filikalar',
          incele: 'Brandaları sıkıca bağlanmış iki filika. Fırtına çıkarsa, diye düşünüyorsun, kimin onlara bineceğine kim karar verir?',
        },
      ],
      kisiler: [],
      gecisler: [
        { hedef: 'kamara', etiket: 'Kamaraya in' },
        { hedef: 'salon', etiket: 'Salona gir' },
      ],
    },
  },

  kisiler: {
    cemil: {
      ad: 'Cemil Bey',
      kosul: (d) => yanimda(d, 'cemil') && d.mekan === 'kamara',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Cemil Bey kitabını kapatıyor. Selanik, diyor. On yıl orada çalıştım. Şehrin her köşesinde bir dostum, her mezarlığında bir hastam var. İkisi de beni hatırlar; biri daha sevgiyle.',
          secenekler: [
            {
              etiket: 'Selanik\'te kimseyi tanıyor musun, örgütle ilgili?',
              kosul: (d) => !bayrak(d, 'cemilSelanik'),
              etki: { bayrak: { cemilSelanik: true } },
              sonra: 'ilk',
              cevap: 'Bir banker vardı, diyor Cemil Bey düşünceli. Rivière. Fransız. Balkan Harbi\'nden sonra evine kimsesiz kızlar aldığı söylenirdi; hayırsever diye. Herkes onu severdi. Ben sevmezdim. Gözleri gülmezdi.',
            },
            { etiket: 'İyi geceler Cemil Bey.' },
          ],
        },
      },
    },
    nermin: {
      ad: 'Nermin Hanım',
      kosul: (d) => yanimda(d, 'nermin') && d.mekan === 'kamara',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Nermin lomboza dayanmış. Hiç İstanbul\'dan çıkmamıştım, diyor. Babam Viyana\'da, Paris\'te görev yaptı; beni hiç götürmedi. Kız çocuğu dedi. Şimdi bir hamal beni Selanik\'e götürüyor. Hayat tuhaf.',
          secenekler: [
            {
              etiket: 'Fotoğraftaki kadını sana anlatayım.',
              kosul: (d) => !bayrak(d, 'nermineFotograf'),
              etki: { bayrak: { nermineFotograf: true }, artir: { nerminBag: 1 } },
              sonra: 'ilk',
              cevap: 'Anlatıyorsun: Manastır, ayva ağacı, kuyunun başında su serpen küçük bir kız. Balkan Harbi. Ölü dedikleri bir aile. Nermin uzun süre bir şey demiyor. Sonra elini bir an elinin üstüne koyuyor. Bulacağız onu, diyor. Kim olursa olsun.',
            },
            { etiket: 'İyi geceler.' },
          ],
        },
      },
    },
    riza: {
      ad: 'Rıza Bey',
      kosul: (d) => yanimda(d, 'riza') && d.mekan === 'kamara',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Rıza Bey tabancasının namlusunu bezle siliyor. Gemiler polisin kâbusudur, diyor. Kaçacak yer yok, saklanacak yer çok. Herkes herkesi görür ama kimse bir şey görmez.',
          secenekler: [
            {
              etiket: 'Halim için üzgünüm.',
              kosul: (d) => !bayrak(d, 'rizaHalim'),
              etki: { bayrak: { rizaHalim: true }, artir: { rizaBag: 1 } },
              sonra: 'ilk',
              cevap: 'Rıza Bey bezi bir an bırakıyor. Ben de, diyor. Kırk yıl insanları yakaladım; birini kurtarabildiğimi sanmıştım. Yanılmışım. Sonra bezi yeniden alıyor. Bu sefer yanılmayacağım.',
            },
            { etiket: 'İyi geceler Rıza Bey.' },
          ],
        },
      },
    },

    brenner: {
      ad: 'Herr Brenner',
      kosul: (d) => !bayrak(d, 'olay_olum'),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: [
            'Zayıf, solgun bir adam; gözlükleri buğulu, çatalı tabağında titriyor. Saat satıcısıyım, diyor kırık bir Türkçeyle, sen sormadan. İsviçreli. Saat.',
            'Sonra sesini alçaltıyor, gözleri şarap tüccarının masasına kayarak: Siz... siz Mösyö Delorme\'un adamı değilsiniz, değil mi?',
          ],
          secenekler: [
            {
              etiket: 'Hayır. Delorme benim düşmanım.',
              etki: { bayrak: { brennerKonustu: true, brennerGuven: true } },
              cevap: 'Brenner\'in yüzünde bir an umut. Sonra korku. Bu gemide güvende değilim, diye fısıldıyor. Yarın gece. Yarın gece her şey bitecek. Kalkıp aceleyle salondan çıkıyor.',
            },
            {
              etiket: 'Delorme kim?',
              etki: { bayrak: { brennerKonustu: true } },
              cevap: 'Brenner kekeliyor. Kimse. Kimse değil. Yanlış... yanlış adam. Bu gemide güvende değilim, diye mırıldanıyor, sonra kalkıp aceleyle salondan çıkıyor.',
            },
          ],
        },
      },
    },

    saltiel: {
      ad: 'Saltiel Efendi',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Gözlüklü, tombul, güler yüzlü bir adam. Daniel Saltiel, diyor, elini uzatarak. Selanikli. Tütün. Türkçe, Rumca, Fransızca, İspanyolca; dört dil bilirim, dördüyle de tütün satarım. Siz İstanbullusunuz. Hamal elleri, asker duruşu. Selanik\'e ne için gidiyorsunuz?',
          secenekler: [
            {
              etiket: 'Bir akraba arıyorum.',
              kosul: (d) => !bayrak(d, 'saltielAkraba'),
              etki: { bayrak: { saltielAkraba: true } },
              sonra: 'ilk',
              cevap: 'Saltiel başını sallıyor. Selanik\'te herkes birini arıyor, diyor. Balkan Harbi, Büyük Harp, geçen yazki yangın. Şehir kaybolanlarla dolu. Ararken umudunu kaybetme ama aklını da kaybetme.',
            },
            {
              etiket: 'Fransız yüzbaşıyla konuşmam lazım ama Fransızca bilmiyorum.',
              kosul: (d) => !yanimda(d, 'nermin') && !bayrak(d, 'saltielCevirmen'),
              etki: { bayrak: { saltielCevirmen: true } },
              sonra: 'ilk',
              cevap: 'Saltiel gülüyor. Ben çeviririm. Tütün satarken öğrendim: iki adamın arasında duran, ikisinden de fazlasını bilir.',
            },
            { etiket: 'Afiyet olsun Saltiel Efendi.' },
          ],
        },
      },
    },

    morin: {
      ad: 'Yüzbaşı Morin',
      giris: (d) => (bayrak(d, 'olay_olum') ? 'olumden_sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: (d) =>
            yanimda(d, 'nermin') || bayrak(d, 'saltielCevirmen')
              ? 'Kırklarında, ince bıyıklı, yorgun gözlü bir Fransız yüzbaşı. ' + (yanimda(d, 'nermin') ? 'Nermin' : 'Saltiel Efendi') + ' çeviriyor: Doğu Ordusu. Selanik karargâhı. İstanbul\'da birkaç işim vardı. Siz? Gözleri seni tartıyor; bir istihbaratçının gözleri.'
              : 'Kırklarında, ince bıyıklı bir Fransız yüzbaşı. Sana Fransızca bir şey söylüyor; anlamıyorsun. Kibarca gülümseyip kadehini kaldırıyor. Bir çevirmen bulmalısın.',
          secenekler: [{ etiket: 'Başınla selam ver.' }],
        },
        olumden_sonra: {
          soz: (d) =>
            yanimda(d, 'nermin') || bayrak(d, 'saltielCevirmen')
              ? 'Morin yedi numaranın kapısında, yüzü sert. ' + (yanimda(d, 'nermin') ? 'Nermin' : 'Saltiel') + ' çeviriyor: Bu adam benimle konuşacaktı. Yarın gece. Bir şey bilmek istiyorsanız, önce siz bir şey anlatın.'
              : 'Morin yedi numaranın kapısında, yüzü sert, Fransızca bir şeyler söylüyor. Bir çevirmen olmadan anlaşamazsınız. Salonda tütün tüccarı dört dil biliyordu.',
          secenekler: [
            {
              etiket: 'Kanatlı anahtarı anlat. Delorme\'u, İstanbul\'daki silahları.',
              kosul: (d) => (yanimda(d, 'nermin') || bayrak(d, 'saltielCevirmen')) && !bayrak(d, 'morinGuven'),
              etki: { bayrak: { morinGuven: true, fransizBag: true } },
              cevap: 'Morin dinliyor; bir kez bile sözünü kesmiyor. Sonra: Clavis, diyor. Biz onlara böyle diyoruz. Brenner bize onların Selanik\'teki adamlarını verecekti. Şimdi sizden başka kimsem yok. Yarın gece bir şey olursa, beni çağırın. Kamaram on iki numara.',
            },
            { etiket: 'Uzaklaş.' },
          ],
        },
      },
    },

    lefteris: {
      ad: 'Kamarot Lefteris',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Genç bir kamarot; titriyor, gözleri kızarmış. İstanbullu Rum; Türkçesi seninki kadar. Ben bir şey bilmem, diyor sen sormadan. Kahveyi ben pişirdim ama ben bir şey bilmem!',
          secenekler: [
            {
              etiket: 'Rıza Bey konuşsun.',
              kosul: (d) => yanimda(d, 'riza') && !delilVar(d, 'kamarot_ifadesi'),
              sonra: 'riza',
            },
            {
              etiket: 'Kahveyi kim götürdü?',
              cevap: 'Lefteris başını iki yana sallıyor, gözlerini kaçırıyor. Bilmem, bilmem. Ben mutfaktaydım. Korkuyor; senden değil, başka birinden.',
            },
          ],
        },
        riza: {
          soz: [
            'Rıza Bey kamarotun omzuna elini koyuyor, sesini yumuşatıyor; kırk yıllık bir polisin sesi. Oğlum. Kimse seni suçlamıyor. Kahveyi sen pişirdin; tamam. Peki fincanı kim aldı elinden?',
            'Lefteris yutkunuyor. Fransız bey, diye fısıldıyor. Şarap satan. Ben götürürüm dedi, arkadaşıma ikram. Bana bir altın verdi. Kimseye söyleme dedi. Allah aşkına, beni ona söylemeyin.',
          ],
          secenekler: [
            {
              etiket: 'Söylemeyeceğiz.',
              etki: { delil: ['kamarot_ifadesi'] },
              cevap: 'Rıza Bey çocuğun omzunu sıkıyor. Sen doğru olanı yaptın, diyor. Biz de yapacağız.',
            },
          ],
        },
      },
    },
  },
};

// Fırtına sahnesindeki seçimlerin sonuçları seçime ve kola göre belirlenir.
BOLUM5.sahneler.firtina.secenekler = [
  {
    etiket: 'Dalga gemiyi yatırdığı anda üstüne atıl.',
    etki: (d) => ({ bayrak: { firtinaSecim: 'atil', garnierSonuc: bayrak(d, 'yaraKol') ? 'deniz' : 'zehir' } }),
    sonra: 'firtina_atil',
  },
  {
    etiket: 'Konuş. Onu oyala.',
    etki: { bayrak: { firtinaSecim: 'konus', garnierSonuc: 'deniz' } },
    sonra: 'firtina_konus',
  },
  {
    etiket: 'Yüzbaşı Morin\'i çağırdın; onun gelmesini bekle, zaman kazan.',
    kosul: (d) => bayrak(d, 'morinGuven'),
    etki: { bayrak: { firtinaSecim: 'morin', garnierSonuc: 'tutuklu' } },
    sonra: 'firtina_morin',
  },
];

BOLUM5.sahneler.firtina_atil = {
  ortam: 'ortam_firtina',
  baslik: 'Dalga',
  paragraflar: (d) =>
    bayrak(d, 'yaraKol')
      ? [
          'Gemi yan yatıyor, sen atılıyorsun. Ama sol kolun seni dinlemiyor; Garnier\'in bileğini kavradığın an dikişler patlıyor, parmakların açılıyor.',
          'Garnier Saltiel\'i bir yana itip bıçağı sana savuruyor. Islak güvertede ikiniz de kayıyorsunuz.',
          yanimda(d, 'riza')
            ? 'Bir silah patlıyor; Rıza Bey. Garnier bir an duruyor.'
            : yanimda(d, 'cemil')
              ? 'Cemil Bey arkadan Garnier\'in koluna yapışıyor; yaşlı ama inatçı.'
              : 'Nermin bir ıslak halatı Garnier\'in ayaklarına doluyor.',
          'Ve dev bir dalga güverteyi süpürüyor. Bir küpeşteye tutunuyorsun. Dalga çekildiğinde Garnier yok. Yalnızca şapkası, güvertede yuvarlanıyor.',
        ]
      : [
          'Gemi yan yatıyor; sen atılıyorsun. Garnier\'in bileğini kavrıyorsun ve bükerek bıçağı düşürtüyorsun. Saltiel kendini kurtarıp yere kapanıyor.',
          'Garnier\'i güverteye bastırıyorsun. Bir an göz göze geliyorsunuz. Gülümsüyor. Sonra bir şey ısırıyor; dişlerinin arasında bir çatırtı.',
          'Acı badem. Birkaç saniye içinde vücudu kasılıyor, sonra gevşiyor.',
          'Bu adamlar yakalanmaz, diye düşünüyorsun. Ya kaçar ya ölürler.',
        ],
  secenekler: [{ etiket: 'Devam', sonra: 'varis' }],
};
BOLUM5.sahneler.firtina_konus = {
  ortam: 'ortam_firtina',
  baslik: 'Rüzgâr',
  paragraflar: [
    'Mektubu okudum, diye bağırıyorsun rüzgârın içinden. Madam N. Kim o?',
    'Garnier güldü. Bilmiyor musun? Delorme bilir. Delorme her şeyi bilir. O kadın senin...',
    'Cümlesini bitiremiyor. Dev bir dalga güverteyi süpürüyor. Saltiel\'i son anda yakasından yakalayıp küpeşteye çekiyorsun.',
    'Dalga çekildiğinde Garnier yok. Yalnızca şapkası, güvertede yuvarlanıyor. Ve rüzgârda yarım kalmış bir cümle: O kadın senin...',
  ],
  secenekler: [{ etiket: 'Devam', etki: { bayrak: { yarimCumle: true } }, sonra: 'varis' }],
};
BOLUM5.sahneler.firtina_morin = {
  ortam: 'ortam_firtina',
  baslik: 'Morin',
  paragraflar: [
    'Konuşmaya devam ediyorsun; mektup, defter, Delorme. Garnier sabırsızlanıyor, bıçağı Saltiel\'in boğazına daha çok bastırıyor.',
    'Sonra karanlıktan iki Fransız askeri ve Yüzbaşı Morin çıkıyor; tabancalar kalkık. Garnier\'in yüzü değişiyor. Bıçak güverteye düşüyor.',
    'Morin Garnier\'in çenesini sıkıca kavrayıp ağzını açtırıyor; dilinin altından küçük bir kapsül çıkarıyor. Bunu biliyoruz, diyor. Clavis adamları konuşmamak için ölür. Bu konuşacak.',
  ],
  secenekler: [{ etiket: 'Devam', sonra: 'varis' }],
};
