// İkinci bölüm: "Ölüler Konuşur". Murat'ın kararı (17 Kasım): ana ekipten ilk katılan Cemil Bey.
// Birinci bölümden ertesi sabah. Polis Sabri'yi öğlen "kimsesiz, boğulmuş denizci" diye gömdürecek.
// Arif, Vakıf Gureba Hastanesi'nin morgunda adli tabip Cemil Bey'le cesedi gömülmeden inceler.
// Cemil Bey, Komiser Halim Efendi, Mercure Kulübü ve lavantalı adam KURGUDUR.
// Gureba Hastanesi o yıllarda gerçekten vardı; buradaki morg ve kişiler kurgudur.
// Anı sahnesi: 24 Mayıs 1915 Arıburnu ateşkesi (ölüleri gömmek için, gerçek olay).
import { BOLUM1 } from './bolum1';
import { bayrak, cikarimVar, delilVar } from '../oyun/motor';

const MORG_INCELEME = ['koltuk', 'akciger', 'mide', 'sirt', 'ceket'];
const incelenenSayisi = (d) => MORG_INCELEME.filter((id) => bayrak(d, 'incelendi_' + id)).length;

export const BOLUM2 = {
  id: 'bolum2',
  ad: 'İkinci bölüm: Ölüler Konuşur',
  baslangic: 'sabah',
  ilkMekan: 'kayikhane',

  deliller: {
    ...BOLUM1.deliller,
    ince_yara: { ad: 'Koltuk altındaki ince yara', tarif: 'Sol koltuk altında, kaburgaların arasından kalbe inen ince bir delik. Islak ceketin altında görünmez. Şiş gibi dar bir bıçak.' },
    akciger_kuru: { ad: 'Akciğerlerde su yok', tarif: 'Cemil Bey\'e göre boğulan adamın ciğerleri su doludur. Sabri\'ninkiler kuru: suya girdiğinde ölüydü.' },
    sahte_sarhos: { ad: 'Rakı kokan ceket, temiz mide', tarif: 'Sabri\'nin ceketi rakıya batırılmış gibi kokuyor, ama midesinde tek damla rakı yok. Sarhoşluğu biri sahnelemiş.' },
    olum_saati: { ad: 'Ölüm saati: gece yarısı', tarif: 'Cesedin katılığına ve morluklarına göre Sabri gece on bir ile bir arasında öldü.' },
    sirt_deseni: { ad: 'Sırttaki ızgara deseni', tarif: 'Sırttaki morlukların içinde beyaz kalmış düzenli çizgiler: ceset saatlerce bir teknenin ızgaralı tahta döşemesinde sırtüstü yatmış.' },
    defin_emri: { ad: 'Sabah altıda imzalanmış defin emri', tarif: 'Komiser Halim Efendi\'nin imzası. Saat altı; cesedi muayene eden olmadan, kaza diye.' },
    jeton: { ad: 'Midedeki pirinç jeton', tarif: 'Sabri\'nin midesinden çıkan küçük pirinç jeton. Bir yüzünde kanatlı anahtar, öbür yüzünde Mercure, Pera ve 17 rakamı. Sabri onu ölmeden önce yutmuş.' },
    on_yedi: { ad: 'Lavantalı adamın Fransızca sözü', tarif: 'Morgda saklanırken duyduğun cümle: Lö dizset atan. Cemil Bey\'e göre Fransızca: on yedi bekliyor.' },
  },

  cikarimlar: {
    ...BOLUM1.cikarimlar,
    bicakla: {
      a: 'ince_yara',
      b: 'akciger_kuru',
      ad: 'Sabri bıçakla öldürüldü',
      metin: 'Ciğerlerinde su yok; koltuk altında ince bir bıçak yarası var. Sabri tek ve ustaca bir darbeyle öldürüldü, sonra suya atıldı. Bunu yapan, öldürmeyi bilen biri.',
    },
    ortbas: {
      a: 'sahte_sarhos',
      b: 'defin_emri',
      ad: 'Polisten biri örtbas ediyor',
      metin: 'Ceketine rakı döküp sarhoş gösterdiler. Komiser Halim Efendi de daha kimse cesede bakmadan, sabah altıda, kaza diye gömme emrini imzaladı. Polisin içinde onlara çalışan biri var.',
    },
    motorda: {
      a: 'olum_saati',
      b: 'sirt_deseni',
      ad: 'Ceset motorda bekletildi',
      metin: 'Sabri gece yarısı öldü ama suya saat üçte atıldı. Arada üç saat bir teknenin ızgaralı döşemesinde yattı: Kayıkçı Hüsnü\'nün gördüğü ışıksız motorda.',
    },
    kulup: {
      a: 'jeton',
      b: 'kanatli_anahtar',
      ad: 'İz Pera\'daki Mercure Kulübü\'ne çıkıyor',
      metin: 'Belgedeki kanatlı anahtar, Sabri\'nin yuttuğu jetonda da var. Mercure, Pera, on yedi. Sabri ölmeden önce onu yutacak kadar önemli bulmuş. Örgütün kapılarından biri Pera\'da.',
    },
    bekleyen: {
      a: 'jeton',
      b: 'on_yedi',
      ad: 'On yedi numara bekliyor',
      metin: 'Lavantalı adam, on yedi bekliyor dedi. Jetonun üstünde de 17 yazıyor. Mercure Kulübü\'nde, on yedi numarada biri ya da bir şey seni bekliyor.',
    },
  },

  olaylar: [
    {
      id: 'baskin',
      kosul: (d) => incelenenSayisi(d) >= 3 && d.mekan === 'morg',
      etki: { sahne: 'baskin' },
    },
    {
      id: 'cenaze',
      kosul: (d) => cikarimVar(d, 'bicakla') && cikarimVar(d, 'ortbas') && cikarimVar(d, 'kulup'),
      etki: { sahne: 'cenaze' },
    },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'İkinci bölüm bitti.' },
    { kosul: (d) => !bayrak(d, 'hastaneOgrenildi'), metin: 'Kayıkhanede Süleyman Kaptan\'la konuş.' },
    {
      kosul: (d) => !bayrak(d, 'cemilRazi'),
      metin: 'Sabri öğlen gömülmeden önce cesedine ulaş. Gureba Hastanesi\'ndeki adli tabip Cemil Bey\'i ikna et.',
    },
    {
      kosul: (d) => incelenenSayisi(d) < MORG_INCELEME.length || !delilVar(d, 'defin_emri'),
      metin: 'Morgda Cemil Bey\'le Sabri\'yi incele: koltuk altı, ciğerler, mide, sırt ve ceket. Kayıt defterine de bak.',
    },
    { kosul: () => true, metin: 'Morgda bulduklarını soruşturma panosunda birleştir. Öğlen yaklaşıyor.' },
  ],

  sahneler: {
    sabah: {
      ortam: 'ortam_oda',
      baslik: 'Ertesi sabah',
      paragraflar: (d) => [
        'Uyumadın. Lavanta kokulu kâğıt, yastığının yanında. Gece boyunca her merdiven gıcırtısında doğrulup dinledin.',
        bayrak(d, 'karar1') === 'ingiliz'
          ? 'Belgeyi İngilizlere verdin. Kopyası yok. Elinde yalnızca hatırladıkların var: birkaç Fransızca kelime, siyakatın kıvrımları, kanatlı anahtar.'
          : bayrak(d, 'karar1') === 'polis'
            ? 'Asıl belge Cihangir\'deki yaşlı adamda. Kopyası ceketinin iç cebinde, göğsüne bir taş gibi bastırıyor.'
            : 'Belge kayıkhanenin döşemesinin altında. Gece iki kez kalkıp hâlâ orada mı diye gitmek istedin. Gitmedin.',
        'Şafakla birlikte kapı vuruluyor. Tayfa çocuğu Ali, nefes nefese: Kaptan çağırıyor Arif Ağabey. Sabri\'yi bugün gömecekler.',
      ],
      secenekler: [{ etiket: 'Kayıkhaneye git', etki: { mekan: 'kayikhane', bayrak: { 'gorüldü_kayikhane': true } } }],
    },
    baskin: {
      ortam: 'ortam_buro',
      ortamOran: 0.3,
      baslik: 'Ayak sesleri',
      paragraflar: [
        'Koridorda ayak sesleri. Biri ağır, polis postalı; biri hafif, pahalı bir kundura. Ve koku, kapının altından süzülen: lavanta.',
        'Cemil Bey neşterini bırakıp kulağını kapıya veriyor. Yüzündeki şakacı ifade bir anda siliniyor. Soğuk odaya, diye fısıldıyor. Çabuk. Ses çıkarma.',
        'Seni arka taraftaki buz kalıplarının durduğu odaya itiyor, kapıyı aralık bırakıyor. İçerisi zifiri karanlık ve buz gibi. Bir rafın üstünde, örtülü bir şekil daha yatıyor.',
        'Kapı açılıyor. Bir ses, kalın ve sabırsız: Ben Komiser Halim. Bu adam öğlen gömülecek, doktor. Muayene falan yok. Emir var.',
        'Sonra öbür ses. Yumuşak, düzgün, yabancı bir Türkçe: Doktor Bey yalnızca işini yapıyor, komiserim. Değil mi doktor? Kimse kimseyi rahatsız etmiyor.',
        'Karanlıkta buz eriyip damlıyor. Göğsün sıkışıyor. Soğuk, ölü kokusu, karanlık... burayı tanıyorsun. Burası Arıburnu\'ndaki siper.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'ani2' }],
    },
    ani2: {
      ortam: 'ortam_oda',
      ortamOran: 0.1,
      efekt: ['ani_savas'],
      baslik: 'Siper',
      paragraflar: [
        'Mayıs 1915, ateşkes günü. Ölüleri gömmek için birkaç saat. İki taraf da siperlerden çıkmış, kimse kimseye bakmadan cesetleri topluyor.',
        'Koku. Günlerdir güneşin altında bekleyen binlerce ölü. Bir Avustralyalı asker sana sigara uzatıyor; sen de ona bir avuç kuru üzüm veriyorsun. Sonra herkes siperine dönüyor ve ertesi gün yine birbirinizi öldürmeye başlıyorsunuz.',
        'Soğuk odanın karanlığında nefesin hızlanıyor. Kapının ardında lavantalı adam konuşuyor. Bir şey görmek istiyorsan şimdi.',
      ],
      secenekler: [
        {
          etiket: 'Nefesini say ve kapının aralığından bak.',
          etki: { bayrak: { ikinciNefes: 'say', baktin: true }, delil: ['on_yedi'] },
          sonra: 'baskin_bak',
        },
        {
          etiket: 'Gözlerini kapa, sırtını duvara ver, sadece dinle.',
          etki: { artir: { travma: 1 }, bayrak: { ikinciNefes: 'kapat' }, delil: ['on_yedi'] },
          sonra: 'baskin_dinle',
        },
      ],
    },
    baskin_bak: {
      ortam: 'ortam_buro',
      ortamOran: 0.3,
      baslik: 'Kapının aralığı',
      paragraflar: [
        'Bir, iki, üç, dört. Gözünü aralığa dayıyorsun. Lambanın ışığında iki adam: şişman, bıyıklı bir komiser, yanında ince, gri paltolu, eldivenli biri. Kırk yaşlarında. Saçları özenle taranmış. Sabri\'nin yüzüne bakıyor; yüzünde hiçbir şey yok.',
        'Eldivenli adam komisere dönüp Fransızca bir şey söylüyor, alçak sesle: Lö dizset atan. Sonra Türkçe: Hadi komiserim. Bırakalım doktor işini bitirsin. Öğlen, dediniz.',
        'Çıkarken bir an duruyor. Başını çeviriyor, soğuk odanın kapısına bakıyor. Nefesini tutuyorsun. Sonra gülümsüyor, kendi kendine, ve gidiyor.',
        'Seni gördü mü? Bilmiyorsun.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { gorulmusOlabilir: true } } }],
    },
    baskin_dinle: {
      ortam: 'ortam_buro',
      ortamOran: 0.3,
      baslik: 'Karanlıkta',
      paragraflar: [
        'Gözlerini kapatıyorsun. Sırtın buz gibi duvarda. Kalbinin sesi kulaklarında.',
        'Sesler. Komiserin homurtusu. Sonra lavantalı adam, alçak sesle, Fransızca bir şey: Lö dizset atan. Kelimeleri anlamıyorsun ama hecelerini aklına kazıyorsun, savaşta parola ezberler gibi.',
        'Ayak sesleri uzaklaşıyor. Kapı kapanıyor. Ellerin hâlâ titriyor. Cemil Bey soğuk odanın kapısını açtığında seni yere çömelmiş buluyor. Bir şey demiyor; sadece elini uzatıyor.',
      ],
      secenekler: [{ etiket: 'Devam' }],
    },
    cenaze: {
      ortam: 'ortam_han',
      ortamOran: 0.4,
      baslik: 'Öğle ezanı',
      paragraflar: (d) => [
        'Gureba Mezarlığı\'nda servilerin arasında küçük bir kalabalık. Süleyman Kaptan, birkaç hamal, kayıkçı Hüsnü. ' +
          (bayrak(d, 'gulceyeAnlatti') ? 'Biraz uzakta, siyah bir çarşafın içinde Gülce. Gözleri kızarmış, ama kimseyle konuşmuyor.' : 'Uzaktan bakan birkaç meraklı.'),
        'Komiser Halim Efendi\'nin istediği gibi kimsesiz bir denizci olarak değil; adıyla, yıkanıp kefenlenmiş olarak gömülüyor Sabri. Cemil Bey, otopsiyi kayda geçmeyen bir tutanakla, defin emrinin altına ancak kendi imzasını atınca bıraktı onu.',
        'İmam duayı bitiriyor. Toprak atılıyor. Süleyman sana dönüyor: Bir şey söyle, evlat. Onu sen buldun.',
      ],
      secenekler: [
        {
          etiket: 'Seni bunu yapana bulduracağım Sabri. Söz.',
          etki: { bayrak: { mezarSozu: 'intikam' }, artir: { suleymanBag: 1 } },
          sonra: 'cemil_katilir',
        },
        {
          etiket: 'Huzur içinde yat. Kız kardeşine haber vereceğiz.',
          etki: { bayrak: { mezarSozu: 'huzur' }, artir: { suleymanBag: 1 } },
          sonra: 'cemil_katilir',
        },
        {
          etiket: 'Bir şey söyleme. Sadece başını eğ.',
          etki: { bayrak: { mezarSozu: 'sessiz' }, artir: { travma: 1 } },
          sonra: 'cemil_katilir',
        },
      ],
    },
    cemil_katilir: {
      ortam: 'ortam_han',
      ortamOran: 0.4,
      baslik: 'Cemil Bey',
      paragraflar: (d) => [
        'Kalabalık dağılırken Cemil Bey yanına geliyor. Fesini düzeltiyor, servilerin arasından denize bakıyor.',
        'On iki yıl Paris\'te, Viyana\'da, sonra Selanik\'te kadavra kestim, diyor. Cinayeti kaza diye yazdıran polis de gördüm, rüşvetle rapor değiştiren hekim de. Ama ölmeden önce jeton yutan bir ateşçi görmedim. Bu adam bize bir şey söylemeye çalışmış, Arif Efendi.',
        'Mercure, Pera\'da, Grand Rue\'nün arka sokaklarında bir kulüp. Bankerler, tüccarlar, birkaç subay. Kapısından benim gibi bir hekim girer; senin gibi bir hamal giremez.',
        bayrak(d, 'gorulmusOlabilir')
          ? 'Bir de şu var: o lavantalı adam soğuk odanın kapısına baktı. Seni gördüyse, yalnız dolaşmaman lazım.'
          : 'Bir de şu var: lavantalı adamın yüzünü görmedin, ama o da seninkini görmedi. Bunu kullanabiliriz.',
        'Elini uzatıyor. Ben ölülerle konuşurum, sen yaşayanlarla. Belki birlikte bir şey anlarız.',
        'Ve ilk kez, Sabri öldüğünden beri, yalnız olmadığını hissediyorsun.',
        'İkinci bölümün sonu.',
      ],
      secenekler: [{ etiket: 'Elini sık', etki: { bayrak: { cemilEkipte: true, bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_oda',
      ortamOran: 0.5,
      baslik: 'İkinci bölüm bitti',
      paragraflar: [
        'Cemil Bey artık ekibinde. Hikâye üçüncü bölümde, Pera\'da, Mercure Kulübü\'nün kapısında sürecek. Kararların kaydedildi.',
      ],
      secenekler: [{ etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    kayikhane: {
      ad: 'Süleyman Kaptan\'ın kayıkhanesi',
      tarif: 'Sabah soğuğu. Mangal yeni yakılmış, kahve henüz kaynamadı. Süleyman Kaptan pencerenin önünde, sırtı sana dönük, denize bakıyor.',
      nesneler: [
        {
          id: 'not',
          etiket: 'Kapının altındaki not',
          incele: 'Lavanta kokan kalın kâğıt. Düzgün, eğitimli bir el yazısı. Altında kanatlı anahtar. Bunu yazan, kim olduğunu saklamak istemiyor; korkutmak istiyor.',
        },
      ],
      kisiler: ['suleyman'],
      gecisler: [
        { hedef: 'hastane', etiket: 'Aksaray\'a, Gureba Hastanesi\'ne git', kosul: (d) => bayrak(d, 'hastaneOgrenildi') },
      ],
    },

    hastane: {
      ad: 'Gureba Hastanesi\'nin avlusu',
      tarif: 'Taş duvarlarla çevrili geniş bir avlu. Ortada yaşlı bir çınar, dalları çıplak. Koridorlardan öksürükler, bir yerde bir hastabakıcının seslendiği isimler. Avlunun dibinde, toprağa gömülü gibi alçak bir kapı: morg.',
      nesneler: [
        {
          id: 'cinar',
          etiket: 'Çınarın altındaki sıra',
          incele: 'Taş bir sıra. Yerde izmarit yığını; hepsi aynı marka, hepsi dikkatle söndürülmüş. Biri buraya her gün aynı saatte gelip sigara içiyor.',
        },
        {
          id: 'morgKapisi',
          etiket: 'Morgun kapısı',
          incele: (d) =>
            bayrak(d, 'cemilRazi')
              ? 'Kapı aralık. İçeriden fenik asidi ve buz kokusu geliyor.'
              : 'Ağır, demir kuşaklı bir kapı. Kilitli. Üstünde tebeşirle yazılmış: Görevliden başkası giremez.',
        },
      ],
      kisiler: ['rustem', 'cemil'],
      gecisler: [
        { hedef: 'morg', etiket: 'Morga in', kosul: (d) => bayrak(d, 'cemilRazi') },
        { hedef: 'kayikhane', etiket: 'Kayıkhaneye dön' },
      ],
    },

    morg: {
      ad: 'Morg',
      tarif: (d) =>
        'Taş merdivenlerle inilen, tavanı tonozlu, buz gibi bir oda. Fenik asidi ve ıslak taş kokuyor. Duvar dibinde buz kalıplarından su damlıyor. Ortada mermer bir masa; üstünde, bir çarşafın altında Sabri. ' +
        (bayrak(d, 'olay_baskin') ? 'Lavanta kokusu hâlâ havada.' : 'Cemil Bey önlüğünü bağlıyor, gözlüğünü siliyor.'),
      nesneler: [
        {
          id: 'koltuk',
          etiket: 'Sabri\'nin koltuk altı',
          incele: [
            'Cemil Bey cesedin sol kolunu kaldırıyor ve lambayı yaklaştırıyor. Bak, diyor. Buraya kimse bakmaz.',
            'Koltuk altının kıvrımında, kıllar arasında, mercimek büyüklüğünde bir delik. Kenarları temiz.',
            'Şiş gibi ince bir bıçak, diyor Cemil Bey. Kaburgaların arasından, yukarı doğru, kalbe. Dışarı neredeyse kan çıkmaz; hepsi içeri akar. Bunu bilmeyen yapmaz. Ya kasap ya cerrah ya da asker.',
            'Bir an sana bakıyor. Sen bu darbeyi bilirsin, değil mi?',
            'Bilirsin. Çanakkale\'de bir çavuş göstermişti; sessiz öldürmek için.',
          ],
          etki: { delil: ['ince_yara'] },
        },
        {
          id: 'akciger',
          etiket: 'Göğüs ve ciğerler',
          incele: [
            'Bu kısmı görmek istemeyebilirsin, diyor Cemil Bey, neşteri alırken. İstersen arkanı dön.',
            'Arkanı dönmüyorsun. Savaş seni bundan çok daha kötülerine alıştırdı.',
            'Cemil Bey ciğerleri açıyor, iki eliyle bastırıyor. Boğulan adamın ciğeri süngere döner, diyor. Ağırlaşır, su dolar, köpük çıkar. Bak: kuru. Hafif. Sabri suya girdiğinde nefes almıyordu. Polis raporunda boğulma yazıyor. Raporu yazan cesedin yüzüne bile bakmamış.',
          ],
          etki: { delil: ['akciger_kuru'] },
        },
        {
          id: 'mide',
          etiket: 'Mide',
          incele: [
            'Cemil Bey mideyi açıyor, içindekini bir tasa boşaltıyor. Burnunu yaklaştırıyor. Ekmek, peynir, çay. Rakı yok. Tek damla bile.',
            'Sonra kaşığın ucu madenî bir şeye çarpıyor. Cemil Bey cımbızla çıkarıp suyla yıkıyor ve ışığa tutuyor.',
            'Küçük, yuvarlak bir pirinç jeton. Bir yüzünde kabartma bir anahtar, iki yanında kanatlar. Öbür yüzünde: Mercure, Pera. Ve ortasında 17.',
            'Cemil Bey uzun bir ıslık çalıyor. Otuz yıllık hekimim, diyor. İnsan midesinden yüzük çıkardım, altın çıkardım, bir keresinde bir saatin yarısını. Ama hiçbiri sahibine bu kadar pahalıya mal olmamıştı.',
          ],
          etki: { delil: ['jeton'] },
        },
        {
          id: 'sirt',
          etiket: 'Sırt ve morluklar',
          incele: [
            'İkiniz cesedi yan çeviriyorsunuz. Sırtı mor; kan öldükten sonra en aşağıya, yere değen yere çökmüş.',
            'Ama morluğun içinde beyaz kalmış çizgiler var. Düzenli, birbirine paralel, iki parmak aralıklı.',
            'Cemil Bey çizgileri parmağıyla ölçüyor. Ceset saatlerce sırtüstü bir şeyin üstünde yatmış, diyor. Aralıklı tahtalar. Bir teknenin döşeme ızgarası gibi.',
            'Katılığa bakılırsa gece on bir ile bir arasında ölmüş. Sabaha karşı suya atılmışsa, arada birkaç saat bu tahtaların üstünde bekletilmiş.',
          ],
          etki: { delil: ['sirt_deseni', 'olum_saati'] },
        },
        {
          id: 'ceket',
          etiket: 'Sabri\'nin ceketi',
          incele: [
            'Islak, ağır bir ceket. Burnuna yaklaştırıyorsun ve geri çekiliyorsun: rakı. Yaka, göğüs, kollar; sanki bir şişe başından aşağı boşaltılmış.',
            'Midesinde rakı yok, ceketinde bir şişe, diyor Cemil Bey. Bir sarhoş rakıyı içer, giymez.',
          ],
          etki: { delil: ['sahte_sarhos'] },
        },
        {
          id: 'defter',
          etiket: 'Morgun kayıt defteri',
          incele: [
            'Kapının yanındaki kürsüde kalın bir defter. Cemil Bey sayfayı çeviriyor: dünün kayıtları, bugünün kayıtları.',
            'Sabri\'nin satırında gelen saat: sabah beş buçuk. Altında bir defin emri, eğri büğrü bir imza: Komiser Halim. Saat: altı. Muayene sütunu boş.',
            'Cesedi muayene eden olmadan, gelişinden yarım saat sonra gömme emri, diyor Cemil Bey. Bu komiserin eli çok çabuk. Ya da biri ona çok iyi ödüyor.',
          ],
          etki: { delil: ['defin_emri'] },
        },
      ],
      kisiler: ['cemil'],
      gecisler: [{ hedef: 'hastane', etiket: 'Avluya çık' }],
    },
  },

  kisiler: {
    suleyman: {
      ad: 'Süleyman Kaptan',
      giris: (d) => (bayrak(d, 'hastaneOgrenildi') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: [
            'Süleyman dönmeden konuşuyor. Komiser Halim diye biri sabaha karşı hastaneye emir göndermiş. Sabri\'yi öğlen Gureba Mezarlığı\'na gömecekler; kimsesiz, boğulmuş bir denizci diye. Yıkanmadan, adı yazılmadan.',
            'Sonra sana dönüyor. Gece hiç uyumadığı belli. Notu gördüm, diyor. Sen gelmeden kapının altından bana da biri attı. Aynısı.',
          ],
          secenekler: [
            { etiket: 'Onu bu şekilde gömmelerine izin vermeyeceğim.', sonra: 'cemil' },
            { etiket: 'Korkuyor musun kaptan?', sonra: 'korku' },
          ],
        },
        korku: {
          soz: 'Kırk yıl fırtına gördüm, korktum mu? Her seferinde. Korkmayan denizci erken ölür. Ama korkudan dümeni bırakan daha erken ölür. Şimdi bırakmayacağım.',
          secenekler: [{ etiket: 'O zaman Sabri\'yi bu şekilde gömmelerine izin vermeyelim.', sonra: 'cemil', etki: { artir: { suleymanBag: 1 } } }],
        },
        cemil: {
          soz: 'Gureba Hastanesi\'nde Cemil Bey diye bir adli tabip var. Avrupa\'da okumuş. Ölülerle konuşur derler. Bir keresinde boğuldu denen bir tayfamın aslında zehirlendiğini o bulmuştu. Kimseden korkmaz, ama kimseye de kolay inanmaz. Öğlene kadar vaktin var.',
          secenekler: [
            {
              etiket: 'Hastaneye gidiyorum.',
              etki: { bayrak: { hastaneOgrenildi: true } },
              cevap: 'Aksaray\'da, Yenibahçe tarafında. Avlunun dibindeki kapı morgdur. Cemil Bey her sabah çınarın altında sigara içer, derler.',
            },
          ],
        },
        sonra: {
          soz: 'Vakit daralıyor evlat. Hastaneye git.',
          secenekler: [{ etiket: 'Gidiyorum.' }],
        },
      },
    },

    rustem: {
      ad: 'Hademe Rüstem',
      giris: (d) => (bayrak(d, 'cemilRazi') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Elinde süpürge, yüzü asık bir hademe yolunu kesiyor. Nereye? Morga yabancı giremez. Komiser efendinin emri var; o ölüye kimse dokunmayacak.',
          secenekler: [
            { etiket: 'Cemil Bey\'i arıyorum.', sonra: 'cemil' },
            {
              etiket: 'Cebinden birkaç kuruş çıkar.',
              sonra: 'para',
            },
          ],
        },
        para: {
          soz: 'Rüstem paraya bakıyor, sonra etrafına. Paranı cebine koy, diyor. Bugün buraya komiser de geldi, para da geldi. Ben ikisini birden yemem. Doktor Bey\'e sor; çınarın altında.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
        cemil: {
          soz: 'Rüstem çenesiyle çınarı gösteriyor. Orada. Ama boşuna uğraşma, o da emir dinler.',
          secenekler: [{ etiket: 'Göreceğiz.' }],
        },
        sonra: {
          soz: 'Doktor Bey seni aldıysa benim diyeceğim yok. Ben bir şey görmedim.',
          secenekler: [{ etiket: 'Sağ ol.' }],
        },
      },
    },

    cemil: {
      ad: 'Cemil Bey',
      giris: (d) => {
        if (d.mekan === 'morg') return 'morg';
        if (bayrak(d, 'cemilRazi')) return 'avlu_sonra';
        if (bayrak(d, 'cemilTanisti')) return 'tekrar';
        return 'ilk';
      },
      dugumler: {
        ilk: {
          soz: [
            'Çınarın altında, taş sırada, fesli, ince bıyıklı bir adam sigara içiyor. Elli yaşlarında. Paltosunun altından beyaz önlük görünüyor. Gözlüğünün üstünden seni süzüyor.',
            'Hamal ellerin, asker duruşun var, diyor sen bir şey demeden. Cebinden sigara paketi çıkarıp uzatıyor. Ölülerimden birini mi arıyorsun? Söyleyeyim: hepsi burada, hiçbiri kaçmıyor. Mesleğimin en güzel yanı.',
          ],
          secenekler: [
            {
              etiket: 'Sabri. Ateşçi. Öğlen gömecekler. Boğulmadı; öldürüldü.',
              etki: { bayrak: { cemilTanisti: true } },
              sonra: 'kanit',
            },
            {
              etiket: 'Süleyman Kaptan gönderdi. Yıllar önce bir tayfasının zehirlendiğini bulmuşsunuz.',
              etki: { bayrak: { cemilTanisti: true, cemilSuleyman: true } },
              sonra: 'suleyman',
            },
          ],
        },
        suleyman: {
          soz: 'Cemil Bey gülümsüyor. Süleyman Reis! Arsenikle zehirlenen kâtip. İyi adamdır Süleyman; bana bir sandık İzmir inciri getirmişti. Hâlâ borçluyum. Peki, ne var?',
          secenekler: [{ etiket: 'Sabri. Ateşçi. Öğlen gömecekler. Boğulmadı; öldürüldü.', sonra: 'kanit' }],
        },
        tekrar: {
          soz: 'Yine sen. Sigara?',
          secenekler: [{ etiket: 'Sabri öldürüldü. Dinleyin beni.', sonra: 'kanit' }],
        },
        kanit: {
          soz: 'Cemil Bey sigarasını söndürüyor, izmariti dikkatle yığının üstüne koyuyor. Komiser Halim\'in raporuna göre sarhoştu, iskeleden düşüp boğuldu. Sen ne gördün?',
          secenekler: [
            {
              etiket: 'Bileklerinde ip izi vardı. Ağzında köpük yoktu. Tırnaklarının altında kırmızı mühür mumu.',
              kosul: (d) => delilVar(d, 'ip_izi') && delilVar(d, 'kopuk_yok'),
              sonra: 'razi',
            },
            {
              etiket: 'Bir şey görmedim. Ama hissediyorum.',
              sonra: 'red',
            },
          ],
        },
        red: {
          soz: 'Hissetmek, diyor Cemil Bey. Hissetmek şairlerin işi. Ben bıçağın açtığı deliğe inanırım. Göreceğin bir şey olursa gel.',
          secenekler: [{ etiket: 'Bekle. Gördüğüm şeyler var.', sonra: 'kanit' }],
        },
        razi: {
          soz: [
            'Cemil Bey bir süre susuyor. Bileklerde ip izi, diyor sonunda, kendi kendine. Köpük yok. Tutanakta bunların hiçbiri yazmıyor. Çünkü kimse bakmadı.',
            'Saatine bakıyor. Öğlene iki saat var. Resmen dokunamam; emir var. Ama bir hekim gömülecek bir cesedin kimliğini doğrulamak zorundadır. Kimlik doğrulaması biraz uzun sürebilir.',
            'Kalkıyor, önlüğünü düzeltiyor. Gel. Kapıda Rüstem\'e benim yardımcımsın deriz. Midesi kuvvetli midir yardımcımın?',
          ],
          secenekler: [
            {
              etiket: 'Çanakkale\'deydim.',
              etki: { bayrak: { cemilRazi: true } },
              cevap: 'Cemil Bey başını sallıyor. O zaman hiçbir şey seni şaşırtmaz. Gel.',
            },
          ],
        },
        avlu_sonra: {
          soz: 'Ne bekliyorsun? Ölüler sabırlıdır ama komiserler değil. Aşağı in.',
          secenekler: [{ etiket: 'Geliyorum.' }],
        },
        morg: {
          soz: (d) =>
            incelenenSayisi(d) >= MORG_INCELEME.length
              ? 'Cemil Bey eldivenlerini çıkarıyor. Ölü söyleyeceğini söyledi, diyor. Şimdi senin sıran: bunları soruşturma panosunda birleştir. Ben gömmeyi öğlen ezanına kadar geciktireyim.'
              : bayrak(d, 'olay_baskin')
              ? 'Gittiler. Lavantalının sözünü duydun mu? Lö dizset atan. Fransızca: on yedi bekliyor. Bir oda numarası, bir masa, bir saat; bilmiyorum. Hadi, işimizi bitirelim.'
              : 'Cemil Bey eldivenlerini giyiyor. Nereden başlayalım? Ölüler sırayla anlatmaz; nereye bakarsan oradan konuşurlar.',
          secenekler: [
            {
              etiket: 'Bu ince yara... Bunu kim yapabilir?',
              kosul: (d) => delilVar(d, 'ince_yara') && !bayrak(d, 'cemilYara'),
              etki: { bayrak: { cemilYara: true } },
              sonra: 'morg',
              cevap: 'Cemil Bey neşteri bırakıyor. Paris\'te bir apaşın, Viyana\'da bir düellocunun, Selanik\'te bir komitacının cesedinde gördüm bu yarayı. Hepsi aynı okuldan: sessiz, hızlı, kansız. Bunu yapan adamı bir kalabalıkta görsen tanımazsın. Asıl korkulacak olan da o.',
            },
            {
              etiket: 'Neden yardım ediyorsunuz? Başınız belaya girebilir.',
              kosul: (d) => !bayrak(d, 'cemilNeden'),
              etki: { bayrak: { cemilNeden: true } },
              sonra: 'morg',
              cevap: 'Cemil Bey bir an duruyor. Selanik\'te, Balkan Harbi\'nde, kaza diye yazılmış iki yüz ceset imzaladım, diyor. Emir vardı. Hepsini hatırlıyorum. Bir tanesi daha olmayacak.',
            },
            { etiket: 'Devam edelim.' },
          ],
        },
      },
    },
  },
};
