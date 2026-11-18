// On altıncı bölüm: "16 Mart". İstanbul, 13-16 Mart 1920.
// Rainer düştükten sonra avukatı Dr. Gubler İstanbul'a gelir; Rainer'in yerel adamlarından derlediği bir "kara liste"yi
// İngiliz istihbaratına satmak üzeredir. Listede Nermin, Rıza Bey ve İsmail Usta da var.
// Yeni oynanış: kaçış hazırlığı. Liste, izin kâğıtları ve kayık: üçü hazır olunca son gece.
// Arka plan (gerçek): 16 Mart 1920'de İtilaf kuvvetleri İstanbul'u resmen işgal etti; bir karakol basıldı, meclis
// dağıtıldı, pek çok kişi tutuklanıp sürgüne gönderildi; birçok gazeteci ve aydın Anadolu'ya geçti.
// Gerçek kişiler kurguya karışmaz. Gubler, liste ve olaylar KURGUDUR.
import { BOLUM15 } from './bolum15';
import { bayrak, delilVar } from '../oyun/motor';

const kanitVar = (d) => delilVar(d, 'kurulus_defteri') || delilVar(d, 'fotograflar');

export const BOLUM16 = {
  id: 'bolum16',
  ad: 'On altıncı bölüm: 16 Mart',
  baslangic: 'acilis',
  ilkMekan: 'han',

  deliller: {
    ...BOLUM15.deliller,
    kara_liste: { ad: 'Gubler\'in listesi', tarif: 'Daktiloyla yazılmış dört sayfa, kırk iki isim. Gazeteciler, öğretmenler, eski subaylar, liman işçileri. Aralarında: Nermin, gazeteci. Rıza, emekli komiser. İsmail, kalaycı: bir silah şebekesinin mühür ustası. Her ismin yanında bir adres.' },
    izin_kagitlari: { ad: 'Gülce\'nin kâğıtları', tarif: 'Liman idaresinin damgalı seyr-i sefain izinleri: Beykoz\'dan Karadeniz\'e çıkacak bir balıkçı motoru için, dört yolcu. Damga gerçek; isimler değil.' },
  },

  cikarimlar: { ...BOLUM15.cikarimlar },

  olaylar: [
    {
      id: 'gece16',
      kosul: (d) => delilVar(d, 'kara_liste') && delilVar(d, 'izin_kagitlari') && !!bayrak(d, 'kayikHazir'),
      etki: { mekan: 'han', sahne: 'gece16' },
    },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'On altıncı bölüm bitti.' },
    { kosul: (d) => !delilVar(d, 'kara_liste'), metin: 'Tokatlıyan Oteli\'nde Gubler\'i bul. Listeyi ele geçir.' },
    { kosul: (d) => !delilVar(d, 'izin_kagitlari'), metin: 'Liman kayıt bürosunda Gülce\'den yol kâğıtları iste.' },
    { kosul: (d) => !bayrak(d, 'kayikHazir'), metin: 'Süleyman Kaptan\'dan bir kayık iste.' },
    { kosul: () => true, metin: 'Hana dön.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_yagmur',
      baslik: '13 Mart 1920, İstanbul',
      paragraflar: (d) => [
        'Mart yağmuru. Karaköy\'den Galata\'ya kadar sokaklar sessiz; herkes bir şey bekliyor gibi. Kahvelerde fısıltılar: meclis, Anadolu, İngilizler.',
        bayrak(d, 'rainerSonu') === 'tutuklu'
          ? 'Viyana\'da Rainer hâlâ tutuklu. Ama avukatı Gubler bir hafta önce İstanbul\'a gelmiş; patronundan kalan ne varsa satıyor.'
          : bayrak(d, 'rainerSonu') === 'yalniz'
            ? 'Rainer Salzburg\'da bir manastırda. Ama avukatı Gubler bir hafta önce İstanbul\'a gelmiş; patronundan kalan ne varsa satıyor.'
            : 'Rainer hâlâ bankasının başında; ama artık İstanbul\'la uğraşmıyor. Avukatı Gubler bir hafta önce gelmiş; kendi hesabına çalışıyor.',
        'Rıza Bey haberi bir eski meslektaşından almış: Gubler, Tokatlıyan Oteli\'nde kalıyor. Rainer\'in yıllardır İstanbul\'da tuttuğu adamlardan bir liste derlemiş. Kimin ne düşündüğünü, kimin nerede oturduğunu. İngiliz istihbaratıyla pazarlık ediyor. Teslim günü: on beş Mart akşamı.',
        'Kırk iki isim, diyor Rıza Bey. Birinin seninki olmadığını mı sanıyorsun?',
        'Kalafatçı Hanı\'nda baban ocağın başında. Neslihan yanında; elinde Rivière\'in mektubu. Üç aydır okuyamadı.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'han', bayrak: { 'gorüldü_han': true, ekip_cemil: true, ekip_nermin: true, ekip_riza: true } } }],
    },
    mektup_baba: {
      ortam: 'ortam_han',
      ortamOran: 0.5,
      baslik: 'Mektup',
      paragraflar: (d) => [
        'Neslihan babanın yanına oturuyor ve mektubu okuyor. Yavaş, kelime kelime. Babamı ben ihbar ettim. Seni o yüzden aldım. Önce suçluluktan, sonra sevdiğim için.',
        'Baban dinliyor. Ocakta kalay eriyor. Neslihan bitirince uzun bir sessizlik.',
        'Sonra baban konuşuyor. O adam bilerek zehir döktü, diyor. Ben bilmeden. Sonra ikimiz de anladık. Ben kalıbı çaldım. O seni aldı. İkimiz de kendimize göre bir kat kalay sürmeye çalıştık.',
        'Neslihan\'ın elini tutuyor. Seni sevmiş, kızım. Bunu ondan alamam. Almak da istemem. Altı yılımı aldı ama sana bir hayat verdi. Hesabı Allah görür.',
        'Neslihan babasının omzuna başını koyuyor. Ohannes Usta körüğü bırakıp avluya çıkıyor; sessizce.',
        bayrak(d, 'kardesGecesi') === 'durust'
          ? 'Sonra Neslihan sana bakıyor. Viyana\'daki geceyi hatırlıyor musun abi, diyor. İkimiz de aramamıştık. Bir kez öyle söyledin, ben de sana kızamadım. Ona da kızamıyorum artık. Babamın elini sıkıyor. Sende öğrendim bunu.'
          : bayrak(d, 'kardesGecesi') === 'yalan'
            ? 'Sonra Neslihan sana bakıyor; sol kulağına. Bir şey demiyor. Viyana\'daki geceyi ikiniz de hatırlıyorsunuz. Babanın itirafını dinleyip affeden kız, senin yalanını hâlâ bekliyor.'
            : bayrak(d, 'kardesGecesi') === 'sessiz'
              ? 'Sonra Neslihan sana bakıyor. Sen de bir gün söylersin, demişti Viyana\'da. Babanın sesini dinlerken boğazında o cümle düğümleniyor: Ben de aramadım. Hâlâ söyleyemiyorsun.'
              : '',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { babaAffetti: true } } }],
    },
    gece16: {
      ortam: 'ortam_han',
      baslik: '15 Mart, gece',
      paragraflar: (d) => [
        'Kalafatçı Hanı\'nın üst odası. Masada Gubler\'in listesi, Gülce\'nin izin kâğıtları. Süleyman\'ın kayığı Salacak\'ta, sabaha karşı Beykoz\'a, oradan bir balıkçı motoruyla Karadeniz\'e.',
        'Listede kırk iki isim. Nermin. Rıza Bey. Baban. ' + (bayrak(d, 'sevkiyatKarar') === 'anadolu' ? 'Topal Hasan. ' : '') + 'Ve otuz küsur yabancı: öğretmenler, gazeteciler, bir hafız, iki doktor, Galata\'dan liman işçileri.',
        'Nermin listeyi okuyor. Ben gidiyorum, diyor. Anadolu\'ya. Burada artık gazete çıkaramam; orada çıkarırım. Ama bu listedeki insanlar ne olacak?',
        'Rıza Bey saatine bakıyor. Sabaha altı saat var, diyor. Bir gecede kırk iki kapı çalınmaz. Ama yirmisi çalınır belki.',
      ],
      secenekler: [
        { etiket: 'Herkesi uyarın. Nermin\'in ağı bütün gece çalışsın.', etki: { bayrak: { listeKarar: 'uyar' } }, sonra: 'baba_karar' },
        { etiket: 'Yalnızca bizimkileri kaçıralım. Liste yansın.', etki: { bayrak: { listeKarar: 'yak' }, artir: { travma: 1 } }, sonra: 'baba_karar' },
      ],
    },
    baba_karar: {
      ortam: 'ortam_han',
      baslik: 'Baba',
      paragraflar: (d) => [
        bayrak(d, 'listeKarar') === 'uyar'
          ? 'Nermin, Gülce ve Rıza Bey gece yarısı yağmurun içine dağılıyor; kapı kapı. Cemil Bey hastane arabasıyla iki öğretmeni Gureba\'ya götürüyor; hasta diye.'
          : 'Liste ocakta yanıyor. Kırk iki isim kıvrılıp kararıyor. Nermin bakmıyor. Rıza Bey bakıyor; sonuna kadar.',
        'Baban ocağın başında oturuyor. Listede adı var: mühür ustası. İngilizler bir kalaycıyı neden ister? Ama ister, diyor Rıza Bey. Rainer\'in kalıbının ustası; mahkemede güzel bir hikâye olur.',
        'Neslihan sana bakıyor. Babamız ne olacak?',
      ],
      secenekler: [
        { etiket: 'Babam Nermin\'le Anadolu\'ya gitsin.', etki: { bayrak: { babaKarar: 'anadolu' } }, sonra: 'baskin' },
        { etiket: 'Babam Ohannes\'in mahzeninde saklansın. Burada kalsın.', etki: { bayrak: { babaKarar: 'sakla' } }, sonra: 'baskin' },
      ],
    },
    baskin: {
      ortam: 'ortam_baskin',
      baslik: '16 Mart 1920, şafak',
      paragraflar: (d) => [
        'Şafak sökmeden İngiliz askerleri şehre yayılıyor. Yağmur. Postal sesleri. Kamyonlar. Bir karakol basılmış, nöbetteki askerler öldürülmüş, diye fısıldıyorlar. Meclisin kapısında süngüler.',
        'Salacak\'ta, sisin içinde, Süleyman Kaptan\'ın kayığı. Nermin kıçta oturuyor; bir çanta, bir daktilo, bir defter. ' + (bayrak(d, 'babaKarar') === 'anadolu' ? 'Yanında baban; omzunda Yusuf\'un kalay takımı. Neslihan\'ın elini bırakmıyor.' : 'Yalnız.'),
        bayrak(d, 'listeKarar') === 'uyar'
          ? 'Nermin gece boyu yirmi üç kapı çaldı. Yirmi üç kişi şafak sökmeden evlerinden çıktı. Ama Nermin de geç kaldı: kayığa koşarak geliyor, bir İngiliz devriyesinin farları sisin içinde. Rıza Bey devriyeyi bir sokak boyu oyalıyor; eski bir komiserin kâğıtlarıyla, eski bir komiserin sesiyle.'
          : 'Nermin vaktinde geliyor. Ama Galata\'dan gelen haberler ağır: listedeki yabancıların kapıları birer birer çalınıyor. İngilizlerin kendi listeleri de varmış. Liste yandı; ama isimler yanmadı.',
        'Süleyman Kaptan kürekleri suya daldırıyor. Beykoz\'a iki saat, diyor. Sonra Karadeniz. İnebolu. Oradan Ankara.',
        'Nermin sana bakıyor. Gel demiyorum, diyor. Henüz değil. Ama gelirsen, bir gazetenin bir muhabire ihtiyacı olacak. Sonra gülümsüyor; ilk günkü gibi. Sarıkamış\'ta ağabeyimi kaybettim. Burada kimseyi kaybetmeyeceğim.',
        'Kayık sisin içinde kayboluyor.',
      ],
      secenekler: [{ etiket: 'Devam', etki: (d) => ({ bayrak: { nerminSonu: 'anadolu', rizaYarali: bayrak(d, 'listeKarar') === 'uyar' } }), sonra: 'son16' }],
    },
    son16: {
      ortam: 'ortam_rihtim',
      ortamOran: 0.5,
      baslik: '17 Mart 1920',
      paragraflar: (d) => [
        'Karaköy rıhtımında İngiliz bayrakları artık resmî. Gazeteler kapalı; çıkanlar sansürlü. Tramvaylar yarı boş.',
        bayrak(d, 'rizaYarali')
          ? 'Rıza Bey\'in alnı sargılı. Devriye onu bir duvara savurmuş; ama bırakmışlar. Yaşlı bir adamdan ne zarar gelir, demişler. Rıza Bey gülüyor: Kırk yıl bunu duymak istedim.'
          : 'Rıza Bey sabahtan beri bir şey söylemiyor. Yanan listede tanıdığı üç isim vardı.',
        bayrak(d, 'babaKarar') === 'anadolu'
          ? 'Baban Karadeniz\'de bir motorda. Neslihan rıhtımda, kuzeye bakıyor. Gidecekti, diyor. Hep giden o oldu. Bu sefer bir yere varsın.'
          : 'Baban Ohannes\'in mahzeninde; bir sandığın arkasında, kalay kokusunun içinde. Neslihan her akşam ona yemek götürüyor.',
        'Gülce büroda. Cemil Bey Gureba\'da; iki öğretmen hâlâ hasta yatağında, hasta değiller.',
        'Ve sen, rıhtımda, ellerin cebinde. Rainer\'in ateşi söndü. Ama ateş ondan büyükmüş. Şimdi her yerde.',
        'Cebinde Nermin\'in bıraktığı bir kâğıt: Ankara, Taşhan. Bir gazete. Bir muhabir.',
        'On altıncı bölümün sonu.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_rihtim',
      ortamOran: 0.45,
      baslik: 'On altıncı bölüm bitti',
      paragraflar: ['Sıradaki: Ankara yolu. Kararların kaydedildi.'],
      secenekler: [{ etiket: 'On yedinci bölüme geç', sonrakiBolum: 'bolum17' }, { etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    han: {
      ad: 'Kalafatçı Hanı',
      tarif: 'Yağmur avluyu yıkıyor. Ocak yanıyor. Baban kalay sürüyor; Neslihan yanında, elinde bir mektup. Yukarıda Rıza Bey pencereden sokağı gözlüyor.',
      nesneler: [],
      kisiler: ['neslihan', 'baba', 'cemil', 'nermin', 'riza'],
      gecisler: [
        { hedef: 'rihtim', etiket: 'Rıhtıma git' },
        { hedef: 'buro', etiket: 'Liman kayıt bürosuna git' },
        { hedef: 'pera', etiket: 'Pera\'ya, Tokatlıyan\'a çık' },
      ],
    },
    rihtim: {
      ad: 'Karaköy rıhtımı',
      ortam: 'ortam_yagmur',
      tarif: 'Yağmurda rıhtım. Süleyman Kaptan kayıkhanesinin kapısında, muşambaya sarılmış, ağ örüyor.',
      nesneler: [],
      kisiler: ['suleyman'],
      gecisler: [{ hedef: 'han', etiket: 'Hana dön' }],
    },
    buro: {
      ad: 'Liman kayıt bürosu',
      ortam: 'ortam_buro',
      tarif: 'Damga, toz, mürekkep. Gülce masasında; önünde İngilizce yeni yönetmelikler.',
      nesneler: [],
      kisiler: ['gulce'],
      gecisler: [{ hedef: 'han', etiket: 'Hana dön' }],
    },
    pera: {
      ad: 'Tokatlıyan Oteli',
      ortam: 'ortam_otel',
      tarif: 'Grand Rue de Péra\'da, aynalı lobisi ve pastanesiyle meşhur otel. Bir köşede, yuvarlak gözlüklü, kısa boylu bir adam bir pasta yiyor: Dr. Gubler.',
      nesneler: [
        {
          id: 'gubler_odasi',
          etiket: 'Gubler\'in odası, üçüncü kat',
          kosul: (d) => !delilVar(d, 'kara_liste'),
          incele: 'Gece. Rıza Bey koridorun ucunda nöbetçiyi bir sigarayla oyalıyor; Cemil Bey kapının kilidini Rıza\'nın telleriyle açıyor. Kırk yıllık polisten bir şey öğrendim, diyor fısıltıyla. Ya da hırsızdan; artık ayıramıyorum. Çekmecede dört sayfalık bir liste. Kopyasını çıkarmaya vakit yok; aslını alıyorsunuz.',
          etki: { delil: ['kara_liste'], bayrak: { listeYolu: 'hirsiz' } },
        },
      ],
      kisiler: ['gubler'],
      gecisler: [{ hedef: 'han', etiket: 'Hana dön' }],
    },
  },

  kisiler: {
    neslihan: {
      ad: 'Neslihan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Neslihan mektubu dizinin üstünde tutuyor. Üç aydır okuyamıyorum, diyor. Babama. Ama okumazsam o mektup aramızda bir duvar olacak.',
          secenekler: [
            { etiket: 'Şimdi oku. Ben yanındayım.', kosul: (d) => !bayrak(d, 'babaAffetti'), etki: { sahne: 'mektup_baba' } },
            { etiket: 'Zamanı gelince.' },
          ],
        },
      },
    },
    baba: {
      ad: 'İsmail Usta',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Baban kalayı bakıra sürüyor. Bir liste varmış, diyor. Benim adım da içindeymiş. Altı yıl hapis yattım evlat; bir liste beni korkutmaz. Ama Neslihan\'ı korkutuyor. Onun için korkuyorum.',
          secenekler: [{ etiket: 'Kimse seni almayacak baba.' }],
        },
      },
    },
    suleyman: {
      ad: 'Süleyman Kaptan',
      giris: (d) => (bayrak(d, 'kayikHazir') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Süleyman Kaptan ağını bırakıyor. Kayık mı lazım? diyor; sen daha sormadan. Kırk yıldır bu sularda kim kaçacaksa benim kayığımla kaçtı. Rum, Ermeni, Türk, Bulgar. Şimdi sıra kimde?',
          secenekler: [
            {
              etiket: 'Dört kişi. Sabaha karşı Beykoz\'a.',
              etki: { bayrak: { kayikHazir: true } },
              sonra: 'sonra',
              cevap: 'Süleyman Kaptan başını sallıyor. Salacak\'ta, şafaktan bir saat önce, diyor. Beykoz\'da kuzenimin balıkçı motoru var; Karadeniz\'e açılır. İngilizler şimdi Boğaz\'ın ağzını gözlüyor; ama sisi gözleyemezler. Yarın sis var. Kemiklerimde hissediyorum.',
            },
          ],
        },
        sonra: {
          soz: 'Süleyman Kaptan ağını örüyor. Salacak, şafaktan bir saat önce, diyor.',
          secenekler: [{ etiket: 'Sağ ol kaptan.' }],
        },
      },
    },
    gulce: {
      ad: 'Gülce',
      giris: (d) => (delilVar(d, 'izin_kagitlari') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Gülce kâğıtlarını topluyor. Yarından itibaren her damga İngilizlerin onayından geçecek, diyor. Bugün son gün.',
          secenekler: [
            {
              etiket: 'Dört kişilik bir seyr-i sefain izni.',
              etki: { delil: ['izin_kagitlari'] },
              sonra: 'sonra',
              cevap: 'Gülce bir an sana bakıyor. Sonra çekmeceden boş bir form çıkarıyor, damgayı alıyor. Babam bir kâğıdı imzalamadığı için öldü, diyor. Ben bu kâğıdı imzalıyorum; bir başkası yaşasın diye. Damgayı vuruyor. İsimleri kendin yaz. Ben görmedim.',
            },
          ],
        },
        sonra: {
          soz: 'Gülce bir dosyayı kapatıyor. Damga bende kalacak, diyor. Yarın da lazım olabilir.',
          secenekler: [{ etiket: 'Sağ ol Gülce.' }],
        },
      },
    },
    gubler: {
      ad: 'Dr. Gubler',
      kosul: (d) => !delilVar(d, 'kara_liste'),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Gubler pastasını bırakıp sizi süzüyor. Mösyö Demir, diyor. Zürih\'te sizi küçümsemiştim. Bir avukat hatalarından ders alır. Şimdi bir tüccarım. Satacak bir şeyim var; alıcısı da hazır. Siz de mi alıcısınız?',
          secenekler: [
            {
              etiket: 'Neslihan satın alır. Rainer\'in parasıyla.',
              kosul: (d) => bayrak(d, 'hisseKarar') === 'sat',
              etki: { delil: ['kara_liste'], bayrak: { listeYolu: 'para' } },
              cevap: 'Neslihan bir çek yazıyor; Rainer\'in hisseleri için ödediği paradan. Gubler rakama bakıp gülümsüyor. İngilizler bunun yarısını teklif etmişti, diyor. Listeyi bir zarfta uzatıyor. Patronumun parasıyla patronumun listesi. Hayat ne tuhaf, madmazel.',
            },
            {
              etiket: 'Kırmızı sayfalarda senin adın da var, Gubler. Avukatlık ücretleri.',
              kosul: (d) => kanitVar(d),
              etki: { delil: ['kara_liste'], bayrak: { listeYolu: 'tehdit' } },
              cevap: 'Gubler\'in yüzü soluyor. 1916, 1917, 1918, diyorsun; her yıl Rainer\'den aldığı paralar, kimin adına. Bu sayfa İngilizlerin eline geçerse, Gubler, onlar seni de bir listeye yazar. Gubler uzun süre susuyor. Sonra çantasından bir zarf çıkarıp masaya bırakıyor. Ben bu şehirde hiç bulunmadım, diyor. Ve kalkıp gidiyor; pastasını yarım bırakarak.',
            },
            {
              etiket: 'Hasler\'in mektubunu masaya koy. Her ay, Bankhaus Rainer hesabından.',
              kosul: (d) => delilVar(d, 'hasler_mektubu'),
              etki: { delil: ['kara_liste'], bayrak: { listeYolu: 'hasler' } },
              cevap: 'Gubler kâğıdı okumuyor; ilk satırda Hasler\'in el yazısını tanıyor. Manastır, diyor; bir hekimin raporları. Bir İngiliz hâkimi bunu okursa ben avukat değil sanık olurum. Çantasından bir zarf çıkarıyor. Liste. Hasler\'e söyleyin, diyor: korkak adamlar her zaman en çok yazanlardır.',
            },
            { etiket: 'Hayır. İyi günler.' },
          ],
        },
      },
    },
    cemil: {
      ad: 'Cemil Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Cemil Bey çantasını kapatıyor. Gureba\'da iki boş yatak ayarladım, diyor. Listedeki birileri hasta olmak isterse, hasta olabilir. Bir doktorun en eski numarası.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
    nermin: {
      ad: 'Nermin Hanım',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Nermin daktilosunu bir çantaya yerleştiriyor. Anadolu\'ya gidiyorum, diyor. Kararımı verdim. Burada artık yazamam. Orada yazarım. Sonra sana bakıyor; ne diyeceğini bekler gibi.',
          secenekler: [{ etiket: 'Biliyorum.' }],
        },
      },
    },
    riza: {
      ad: 'Rıza Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Rıza Bey pencereden sokağı gözlüyor. Gubler Tokatlıyan\'da, diyor. Odası üçüncü katta. Kapıdaki nöbetçi benim eski bir muhbirim. Kırk yıl, evlat; bir şehirde kırk yıl polislik yaparsan her kapının anahtarı cebinde olur.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
  },
};
