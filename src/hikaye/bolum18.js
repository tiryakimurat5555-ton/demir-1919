// On sekizinci bölüm: "Kinin". Eskişehir yakınlarında bir sahra hastanesi, 3-14 Ocak 1921. Dördüncü kitabın açılışı.
// Cemil Bey'in sahra hastanesinde kinin ve morfin bitiyor. İstanbul'dan gizli ağla gönderilen ilaçlar yolda eriyor.
// Esir düşmüş genç bir Yunan hekimi, Yannis, aynı parti numaralı şişelerin öbür tarafta da karaborsada satıldığını söyler:
// bir savaş vurguncusu iki cepheye de satıyor. Yeni oynanış: hesap tutturma (üç kayıt, iki açık).
// Arif'in Çanakkale travması: topçu sesi, nöbet (travma 2 ve üstü).
// Arka plan (gerçek): Ocak 1921'de İnönü'de çarpışmalar oldu; savaş iki tarafa da ağır kayıplar verdirdi; Kızılay ve
// Kızılhaç yaralılara ve esirlere yardım etti. Bunlar yalnızca arka plan; gerçek kişiler kurguya karışmaz.
// Bütün kişiler (Yannis, Sabit Bey, depo memuru) ve olaylar KURGUDUR.
import { BOLUM17 } from './bolum17';
import { bayrak, cikarimVar, delilVar, sayi } from '../oyun/motor';

const ACILIS_ETKI = { mekan: 'cadir', delil: ['yuk_telgrafi'], bayrak: { 'gorüldü_cadir': true, ekip_cemil: true, ekip_riza: true, ekip_nermin: false } };

export const BOLUM18 = {
  id: 'bolum18',
  ad: 'On sekizinci bölüm: Kinin',
  baslangic: 'acilis',
  ilkMekan: 'cadir',

  deliller: {
    ...BOLUM17.deliller,
    yuk_telgrafi: { ad: 'Gülce\'nin şifreli telgrafı', tarif: 'İstanbul\'dan, Gülce\'den: Aralık\'ta İnebolu yoluyla altı yüz kutu kinin, yüz kutu morfin gönderildi. Parti numaraları K-117 ve M-42. Şişelerin dibinde kazıma bir yıldız var; Süleyman\'ın işareti.' },
    depo_defteri: { ad: 'Eskişehir deposunun defteri', tarif: 'İstasyondaki sıhhiye deposu: Aralık sonunda dört yüz kutu kinin, altmış kutu morfin teslim alındı. Hastanelere sevk: Sabit Bey\'in kağnılarıyla.' },
    teslim_fisleri: { ad: 'Hastanenin teslim fişleri', tarif: 'Cemil Bey\'in sahra hastanesine ulaşan: iki yüz elli kutu kinin, yirmi kutu morfin. Fişlerin altında müteahhit Sabit Bey\'in mührü.' },
    esir_tanikligi: { ad: 'Yannis\'in sözleri', tarif: 'Esir düşen Yunan hekimi Yannis: Aralık\'ta Bursa\'da karaborsada morfin aldık; dipleri yıldız kazımalı şişeler, M-42. Bir Türk tüccarın adamı satıyordu; altınla.' },
    ag_bilgisi: { ad: 'Sabit Bey\'in itirafı', tarif: 'Sabit Bey yalnız değil: İstanbul\'da Gümrük\'te biri parti numaralarını bildiriyor, İnebolu\'da biri kağnıları sayıyor, Bursa\'da biri öbür tarafa satıyor. İstanbul\'daki adın baş harfleri: M. T.' },
  },

  cikarimlar: {
    ...BOLUM17.cikarimlar,
    kayip_ilac: {
      a: 'depo_defteri',
      b: 'teslim_fisleri',
      ad: 'Yüz elli kutu',
      metin: 'Depoya dört yüz kutu girmiş, hastaneye iki yüz elli ulaşmış. Depo ile hastane arasında yüz elli kutu kinin ve kırk kutu morfin kaybolmuş. O yolu yalnızca Sabit Bey\'in kağnıları gidiyor.',
    },
    iki_cephe: {
      a: 'esir_tanikligi',
      b: 'yuk_telgrafi',
      ad: 'İki cephe',
      metin: 'Süleyman\'ın yıldız işaretli şişeleri, Gülce\'nin gönderdiği M-42 partisi, cephenin öbür tarafında altınla satılıyor. Bu tarafın askeri morfinsiz ölürken. Bir vurguncu iki orduyu da emiyor.',
    },
  },

  olaylar: [
    {
      id: 'sabit',
      kosul: (d) => cikarimVar(d, 'kayip_ilac') && cikarimVar(d, 'iki_cephe'),
      etki: { mekan: 'depo18', sahne: 'sabit' },
    },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'On sekizinci bölüm bitti.' },
    { kosul: (d) => !delilVar(d, 'teslim_fisleri'), metin: 'Hasta çadırında teslim fişlerine bak.' },
    { kosul: (d) => !delilVar(d, 'depo_defteri'), metin: 'Eskişehir istasyonundaki sıhhiye deposuna git.' },
    { kosul: (d) => !delilVar(d, 'esir_tanikligi'), metin: 'Esir çadırındaki Yunan hekimiyle konuş. Neslihan çevirebilir.' },
    { kosul: () => true, metin: 'Bulduklarını soruşturma panosunda birleştir.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_sahra',
      efekt: ['top'],
      baslik: '3 Ocak 1921, Eskişehir yakınları',
      paragraflar: (d) => [
        'Dokuz ay geçti. Ankara\'da baban Nermin\'in matbaasında harf döküyor; Nermin her gün bir gazete çıkarıyor. Sen ise burada, kar altında bir ovada, çadırların arasındasın.',
        'Cemil Bey\'in sahra hastanesi: on iki çadır, iki yüz yatak, üç doktor. Batıdan, uzaktan, top sesleri. Cephe yaklaşıyor, diyor herkes.',
        'Neslihan bir hemşire önlüğüyle bir yaralının alnını siliyor. Selanik\'te büyüyen herkes biraz Rumca bilir; o yüzden esir çadırına da o bakıyor. Rıza Bey jandarmayla hastane arasında gidip geliyor.',
        'Cemil Bey seni bir kenara çekiyor. Kinin bitti, diyor. Morfin bitmek üzere. Sıtmalılar titriyor; ameliyatlıları uyutamıyoruz. Gülce İstanbul\'dan gönderdiğini yazıyor; yeterince. Ama yeterincesi buraya ulaşmıyor.',
        'Elinde Gülce\'nin şifreli telgrafı. Süleyman\'ın işareti: şişelerin dibinde kazıma bir yıldız.',
      ],
      secenekler: [
        { etiket: 'Devam', kosul: (d) => sayi(d, 'travma') >= 2, etki: { ...ACILIS_ETKI, sahne: 'nobet' } },
        { etiket: 'Devam', kosul: (d) => sayi(d, 'travma') < 2, etki: ACILIS_ETKI },
      ],
    },
    nobet: {
      ortam: 'ortam_sahra',
      efekt: ['top'],
      ortamOran: 0.3,
      baslik: 'Top',
      paragraflar: [
        'Bir top sesi. Uzakta. Sonra bir tane daha. Daha yakın.',
        'Birden çadır yok. Kar yok. Arıburnu. Mayıs 1915. Siperin dibinde, yanındaki askerin kanı yüzünde. Kulaklarında bir uğultu; ellerin titriyor; nefes alamıyorsun.',
        'Bir ses, uzaktan: Arif. Arif, bana bak. Cemil Bey. Bir eli omzunda.',
      ],
      secenekler: [
        { etiket: 'Cemil\'in sesine tutun. Nefes al.', etki: { artir: { travma: -1 }, bayrak: { nobetAtlatildi: true } } },
        { etiket: 'Çadırdan dışarı, kara koş.', etki: { bayrak: { nobetKacti: true } } },
      ],
    },
    hesap: {
      ortam: 'ortam_sahra',
      baslik: 'Hesap',
      paragraflar: [
        'Çadırın köşesinde, bir sandığın üstünde, üç kâğıt yan yana. Rıza Bey bıyığını sıvazlayarak bakıyor.',
        'İstanbul\'dan yüklenen: altı yüz kutu kinin. Eskişehir deposuna giren: dört yüz. Hastaneye ulaşan: iki yüz elli.',
        'İki açık var, diyor Rıza Bey. Biri İstanbul ile depo arasında, iki yüz kutu. Öbürü depo ile hastane arasında, yüz elli kutu. Hangisinin peşine düşelim?',
      ],
      secenekler: [
        { etiket: 'İstanbul ile depo arası: iki yüz kutu.', etki: { artir: { yanlisHesap: 1 } }, sonra: 'hesap_yanlis' },
        { etiket: 'Depo ile hastane arası: yüz elli kutu.', etki: { bayrak: { hesapDogru: true } }, sonra: 'hesap_dogru' },
      ],
    },
    hesap_yanlis: {
      ortam: 'ortam_sahra',
      baslik: 'Uzun yol',
      paragraflar: [
        'Rıza Bey başını sallıyor. O yol uzun, diyor. Deniz, İnebolu, Kastamonu, Ilgaz. Kağnı devrilir, kayık batar, kar yolları kapar. İki yüz kutu orada kaybolabilir; kimse çalmadan.',
        'Ama depoyla hastane arası yarım günlük düz yol. Ve tek bir adamın kağnıları gidip geliyor.',
      ],
      secenekler: [{ etiket: 'Yeniden bak', sonra: 'hesap' }],
    },
    hesap_dogru: {
      ortam: 'ortam_sahra',
      baslik: 'Yarım günlük yol',
      paragraflar: [
        'Depoyla hastane arası yarım günlük düz yol, diyorsun. Kar bile kapatmaz. Ve o yolu tek bir adamın kağnıları gidiyor: müteahhit Sabit Bey.',
        'Rıza Bey kâğıtları katlıyor. Kırk yıl önce hocam bana bir şey öğretti, diyor. Hırsız her zaman en kısa yoldadır. Uzun yolda yorulur.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { delil: ['depo_defteri'] } }],
    },
    sabit: {
      ortam: 'ortam_depo',
      baslik: 'Gece, istasyon',
      paragraflar: (d) => [
        'Gece yarısı istasyonun arkasında. Kar yağıyor. Üç kağnı yükleniyor; hastaneye değil, batıya, Bursa yoluna. Kağnıların başında, kürk yakalı paltosuyla, tombul, gülümseyen bir adam: Sabit Bey.',
        'Rıza Bey ve iki jandarma kağnıların önüne çıkıyor. Sabit Bey\'in gülümsemesi donuyor.',
        'Çuvallardan birini açıyorsun. Kinin kutuları. Bir morfin şişesi; dibinde kazıma bir yıldız. M-42.',
        'Sabit Bey ellerini açıyor. Ben tüccarım beyler, diyor. Savaşta herkes bir şey satar. Ben de satıyorum; kim ödüyorsa. Öbür taraf altınla ödüyor. Bizimkiler kâğıt parayla.',
        sayi(d, 'travma') >= 3
          ? 'Ellerin titriyor. Bu adamın yüzünde, Arıburnu\'nda morfinsiz ölen askerlerin yüzlerini görüyorsun. Cemil Bey bileğini tutuyor.'
          : 'Rıza Bey sana bakıyor. Senin kararın, der gibi.',
      ],
      secenekler: [
        { etiket: 'Jandarmaya teslim edin. Mahkemeye çıksın.', etki: { bayrak: { sabitSonu: 'teslim' } }, sonra: 'esir_degisimi' },
        { etiket: 'Önce konuşsun. Ağın geri kalanını söylesin.', etki: { bayrak: { sabitSonu: 'konustu' }, delil: ['ag_bilgisi'] }, sonra: 'sabit_konusur' },
      ],
    },
    sabit_konusur: {
      ortam: 'ortam_depo',
      baslik: 'Ağ',
      paragraflar: [
        'Rıza Bey Sabit Bey\'i bir sandığın üstüne oturtuyor. Döverek değil, diyor; delille. Ve önüne üç kâğıdı koyuyor.',
        'Sabit Bey uzun süre kâğıtlara bakıyor. Sonra konuşuyor; bir tüccarın hesap verir gibi düzgün sesiyle.',
        'İstanbul\'da Gümrük\'te biri var, diyor. Parti numaralarını bildirir. İnebolu\'da biri kağnıları sayar. Bursa\'da biri öbür tarafa satar. Ben yalnızca bir halkayım. İstanbul\'dakinin adını bilmem; baş harflerini bilirim: M. T.',
        'Gümrük, diyorsun içinden. Gülce\'nin bürosu.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'esir_degisimi' }],
    },
    esir_degisimi: {
      ortam: 'ortam_sahra',
      baslik: '14 Ocak 1921',
      paragraflar: (d) => [
        'Cephe bir hafta boyunca gürledi; sonra sustu. Cephe tuttu, diyorlar. İki tarafta da yüzlerce ölü. Cemil Bey üç gün uyumadı.',
        'Bugün kar dinmiş. Ovanın ortasında iki Kızılhaç bayrağı, aralarında yüz adım. Bir esir değişimi. Bu taraftan yirmi Yunan esir; öbür taraftan yirmi Türk esir.',
        'Yannis sıranın başında. Neslihan\'ın elini sıkıyor. Efharisto, diyor. Sonra Rumca bir şey daha. Neslihan gülümsüyor: Annem de Selanikliydi, diyor; bir gün o şehirde bir kahve içelim.',
        'Öbür bayrağın altında, Kızılhaç önlüğüyle, kır saçlı bir kadın. Eleni Mavrou. Cemil Bey\'i görünce elini kaldırıyor. Yüz adım. Aşamazlar. Ama Eleni bir zarfı Yannis\'e veriyor; Yannis yüz adımı yürüyüp Cemil Bey\'e uzatıyor.',
        'Cemil Bey zarfı açıyor: İzmir\'den, Eleni\'den. Bir mektup ve bir kutu kinin. Bunu kimse satmasın, yazmış. Kimin askeri olursa olsun.',
        bayrak(d, 'sabitSonu') === 'konustu'
          ? 'Cebinde Sabit Bey\'in verdiği iki harf: M. T. Gümrük. İstanbul.'
          : 'Sabit Bey Ankara\'ya, mahkemeye gönderildi. Ama Rıza Bey\'in kuşkusu dinmiyor: Bir kağnıcı tek başına iki cepheye satamaz, diyor.',
        'Top sesleri bitti. Ama sende bitmedi. Gece uyurken hâlâ duyuyorsun.',
        'On sekizinci bölümün sonu.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_sahra',
      ortamOran: 0.4,
      baslik: 'On sekizinci bölüm bitti',
      paragraflar: ['Dördüncü kitap başladı. On dokuzuncu bölüm yazılıyor: İstanbul, gümrükteki halka. Kararların kaydedildi.'],
      secenekler: [{ etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    cadir: {
      ad: 'Hasta çadırı',
      ortam: 'ortam_sahra',
      tarif: 'Uzun bir çadır; iki sıra sedye, ortada bir soba. Sıtmalılar battaniyelerin altında titriyor. Bir köşede Cemil Bey\'in masası; üstünde kâğıtlar, bir lamba.',
      nesneler: [
        {
          id: 'ilac_dolabi',
          etiket: 'İlaç sandığı',
          incele: 'Tahta bir sandık. İçinde üç kutu kinin, iki şişe morfin. Bir şişenin dibinde kazıma bir yıldız: Süleyman\'ın işareti. İki yüz yatak için.',
        },
        {
          id: 'teslim',
          etiket: 'Teslim fişleri',
          incele: (d) =>
            delilVar(d, 'teslim_fisleri')
              ? 'Fişler Cemil Bey\'in masasında, bir taşın altında.'
              : 'Cemil Bey\'in masasında bir deste fiş. Aralık boyunca hastaneye ulaşan: iki yüz elli kutu kinin, yirmi kutu morfin. Her fişin altında aynı mühür: Müteahhit Sabit, Eskişehir.',
          etki: (d) => (delilVar(d, 'teslim_fisleri') ? null : { delil: ['teslim_fisleri'] }),
        },
        {
          id: 'hesap_kagitlari',
          etiket: 'Üç kâğıdı yan yana koy',
          kosul: (d) => delilVar(d, 'teslim_fisleri') && bayrak(d, 'depoGoruldu') && !bayrak(d, 'hesapDogru'),
          incele: 'Gülce\'nin telgrafı, deponun sayıları, hastanenin fişleri.',
          etki: { sahne: 'hesap' },
        },
      ],
      kisiler: ['cemil', 'neslihan', 'riza'],
      gecisler: [
        { hedef: 'esir', etiket: 'Esir çadırına git' },
        { hedef: 'depo18', etiket: 'Eskişehir istasyonuna, sıhhiye deposuna git' },
      ],
    },
    esir: {
      ad: 'Esir çadırı',
      ortam: 'ortam_sahra',
      tarif: 'Küçük bir çadır. Yaralı Yunan esirleri; bir jandarma kapıda. Köşede, kolu sargılı, genç, gözlüklü bir adam başka bir esirin yarasını sarıyor: Yannis.',
      nesneler: [],
      kisiler: ['yannis'],
      gecisler: [{ hedef: 'cadir', etiket: 'Hasta çadırına dön' }],
    },
    depo18: {
      ad: 'Sıhhiye deposu',
      ortam: 'ortam_depo',
      tarif: 'Eskişehir istasyonunun arkasında taş bir ambar. Çuvallar, sandıklar, bir masa, bir defter. Masada ihtiyar bir depo memuru; burnunun ucunda gözlük.',
      nesneler: [
        {
          id: 'depo_kaydi',
          etiket: 'Depo defteri',
          incele: (d) =>
            bayrak(d, 'depoGoruldu')
              ? 'Memur defteri yeniden açıyor; sayılar aynı.'
              : 'Depo memuru defteri çeviriyor. Aralık sonu: dört yüz kutu kinin, altmış kutu morfin teslim alındı. Hastanelere sevk: Müteahhit Sabit Bey\'in kağnılarıyla. Kâğıtlar tamam, diyor memur. Ben kâğıda bakarım; kağnıya bakmam.',
          etki: { bayrak: { depoGoruldu: true } },
        },
      ],
      kisiler: [],
      gecisler: [{ hedef: 'cadir', etiket: 'Hastaneye dön' }],
    },
  },

  kisiler: {
    yannis: {
      ad: 'Yannis',
      giris: (d) => (delilVar(d, 'esir_tanikligi') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Yannis başını kaldırıyor. Neslihan Rumca konuşuyor; Yannis şaşırıyor, sonra gülümsüyor. Atina\'da tıp okumuş; iki ay önce cepheye gelmiş. Doktorlarınız bize de bakıyor, diyor. Bunu evde anlatacağım. Eğer eve dönersem.',
          secenekler: [
            {
              etiket: 'Neslihan, ona morfin şişesini göster.',
              etki: { delil: ['esir_tanikligi'] },
              sonra: 'sonra',
              cevap: 'Yannis şişeyi alıyor, dibine bakıyor. Yüzü değişiyor. Bu yıldız, diyor; Neslihan çeviriyor. Bu şişelerden Aralık\'ta Bursa\'da karaborsada aldık. M-42. Bizim de morfinimiz yoktu. Bir Türk tüccarın adamı getiriyordu; altınla. Biz de aldık. Utanarak. Şişeyi Neslihan\'a geri veriyor. Bir yaralı yaralıdır, diyor. Ama bu şişeyi satan adam ne?',
            },
          ],
        },
        sonra: {
          soz: 'Yannis bir başka esirin sargısını değiştiriyor. Bir gün bu savaş bitecek, diyor Neslihan aracılığıyla. Herkes birinin ne yaptığını hatırlayacak.',
          secenekler: [{ etiket: 'Hatırlayacağız.' }],
        },
      },
    },
    cemil: {
      ad: 'Cemil Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'nobetAtlatildi')
              ? 'Cemil Bey sana bir tas çay uzatıyor. Sen de yaralısın, Arif, diyor. Yaran görünmüyor, o kadar. Benim de var; Balkan\'dan. Birlikte taşırız.'
              : bayrak(d, 'nobetKacti')
                ? 'Cemil Bey seni karın içinde bulmuştu; titriyordun. Bir şey söylemiyor. Sadece yanına oturuyor. Konuşmak istersen, diyor sonunda, ben buradayım.'
                : 'Cemil Bey bir sıtmalının nabzını sayıyor. Kinin olmadan bu adam bir hafta yaşar, diyor. Kinin olursa bir ömür.',
          secenekler: [{ etiket: 'Bulacağım Cemil Bey.' }],
        },
      },
    },
    neslihan: {
      ad: 'Neslihan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Neslihan önlüğünü silkeliyor. Viyana\'da opera locası, diyor. Burada sedye. Hangisinde daha çok yaşadığımı biliyor musun abi? Burada.',
          secenekler: [{ etiket: 'Biliyorum.' }],
        },
      },
    },
    riza: {
      ad: 'Rıza Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Rıza Bey şapkasındaki karı silkeliyor. Gülce\'nin telgrafına göre altı yüz kutu yola çıkmış, diyor. Burada iki yüz elli var. Aradaki her kutunun bir yolu var. Üç kâğıt bul; hesabı tuttur.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
  },
};
