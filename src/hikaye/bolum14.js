// On dördüncü bölüm: "Que sais-je?". Zürih, 18-20 Kasım 1919. Üçüncü kitabın açılışı.
// Rivière'in eşyaları Selanik'ten Neslihan'a gelir: kanatlı küçük bir anahtar, bir ajanda, Montaigne'in Denemeler'i.
// Banque Vollmer'deki 1908 numaralı kasa iki anahtarlıdır: Rainer'in ve Rivière'in. İçinde örgütün kuruluş defteri.
// Yeni oynanış: banka gişesinde parola (Rivière'in ex libris damgası ipucu; iki yanlışta müdür çağrılır).
// Klara Rainer: Rainer'in torunu, bankanın avukatı; dedesinden şüpheli. Gubler: Rainer'in Zürih avukatı.
// Arka plan (gerçek): İsviçre savaşta tarafsız kaldı; Zürih bankacılığı gizliliğiyle tanınıyordu.
// Bütün kişiler (Klara, Gubler, Vollmer bankası) ve olaylar KURGUDUR.
import { BOLUM13 } from './bolum13';
import { bayrak, cikarimVar, delilVar, sayi } from '../oyun/motor';

const YANLIS_SINIRI = 2;

export const BOLUM14 = {
  id: 'bolum14',
  ad: 'On dördüncü bölüm: Que sais-je?',
  baslangic: 'acilis',
  ilkMekan: 'otel',

  deliller: {
    ...BOLUM13.deliller,
    kucuk_anahtar: { ad: 'Kanatlı küçük anahtar', tarif: 'Rivière\'in sandığından çıkan pirinç bir anahtar. Başı kanat biçiminde. Sapında kazınmış dört rakam: 1908.' },
    ajanda: { ad: 'Rivière\'in ajandası', tarif: '1918 yılı. Ekim sayfasında: Viyana, noter, N. imzaladı. Altında: Zürih, Vollmer, ikinci anahtar yerinde. Kasım\'dan sonra sayfalar boş.' },
    exlibris: { ad: 'Ex libris damgası', tarif: 'Denemeler\'in ilk sayfasında Rivière\'in mürekkep damgası: bir terazi ve altında üç kelime: Que sais-je? Ne biliyorum ki? Montaigne\'in sözü. Rivière her kitabına basarmış.' },
    klara_uyarisi: { ad: 'Klara\'nın uyarısı', tarif: 'Dedemin avukatı Gubler yarın sabah mahkemeden bir tedbir kararı alacak. Kasa mühürlenecek. Bugün açamazsanız bir daha açamazsınız.' },
    kurulus_defteri: { ad: 'Kuruluş defteri', tarif: 'Selanik, Ağustos 1908. Beş kurucu; baş harfleri. V. R., G. R. ve üç isim daha. Kalıp: Manastırlı usta İ., bedeli ödendi, usta bilmesin. Amaç: İmparatorluklar yıkılacak; yıkıntıdan biz kazanacağız. Sonraki kırmızı sayfalarda on bir yılın rüşvetleri: altı devletin bakanları, generalleri, gazete sahipleri.' },
  },

  cikarimlar: {
    ...BOLUM13.cikarimlar,
    kasa_yeri: {
      a: 'ajanda',
      b: 'davetiye',
      ad: 'Vollmer, 1908',
      metin: 'Rainer\'in kartındaki Zürih ve Rivière\'in ajandasındaki Vollmer: Bahnhofstrasse\'deki Banque Vollmer et Cie. Kasa 1908. İkinci anahtar yerinde, yazmış Rivière. Birinci anahtar Rainer\'de.',
    },
    parola: {
      a: 'exlibris',
      b: 'kucuk_anahtar',
      ad: 'İki anahtar, bir söz',
      metin: 'İsviçre bankalarının iki anahtarlı kasaları anahtarla yetinmez: sahibinden bir de parola ister. Rivière gibi bir adam parolasını neye bağlar? Her kitabının ilk sayfasına bastığı şeye belki.',
    },
  },

  olaylar: [],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'On dördüncü bölüm bitti.' },
    { kosul: (d) => !delilVar(d, 'ajanda'), metin: 'Otel odasında Rivière\'in sandığını aç.' },
    { kosul: (d) => !cikarimVar(d, 'kasa_yeri'), metin: 'Rivière\'in ajandasını Rainer\'in kartıyla karşılaştır.' },
    { kosul: (d) => !cikarimVar(d, 'parola'), metin: 'Anahtar tek başına yetmeyecek. Rivière\'in kitaplarına bak.' },
    { kosul: (d) => !delilVar(d, 'kurulus_defteri'), metin: 'Banque Vollmer\'e git. Kasayı aç.' },
    { kosul: () => true, metin: 'Defterle bankadan çık.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_zurih',
      efekt: ['tren_duduk'],
      baslik: '18 Kasım 1919, Zürih',
      paragraflar: (d) => [
        'Dört gün trende: Sofya, Belgrad, Trieste, Milano, sonra Alpler. Ve sonra Zürih: temiz, sessiz, tok bir şehir. Göl, kuğular, çan sesleri. Savaş buraya hiç uğramamış gibi. Uğramadı da; yalnızca parası uğradı.',
        'Neslihan yanında. Cemil Bey ve Nermin de. Rıza Bey İstanbul\'da kaldı: Baban da, Gülce de, Süleyman da korunmalı, dedi. Rainer\'in kolu uzundur.',
        bayrak(d, 'hisseKarar') === 'genelkurul'
          ? 'Neslihan\'ın çantasında Viyana\'ya yazılmış bir mektup: Bankhaus Rainer ortaklarına, olağanüstü genel kurul çağrısı. Aralık ortası.'
          : bayrak(d, 'hisseKarar') === 'sat'
            ? 'Neslihan hisseleri sattı; Rainer\'in parası Selanik\'teki bir bankada. Ama Rivière\'in kişisel eşyaları vasiyetin dışında kalmıştı.'
            : 'Neslihan hisseleri Eleni\'nin vakfına bağışladı. Vakfın ilk toplantısı Aralık\'ta, Viyana\'da. Rainer orada olacak.',
        'Bir hafta önce Selanik\'ten bir sandık geldi. Saltiel Efendi göndermiş: Rivière\'in köşkünden kalan kişisel eşyalar. Neslihan onu açamadı. Zürih\'e kadar getirdi.',
        bayrak(d, 'whitlockSonu') === 'kacti'
          ? 'Cebinde Whitlock\'un kâğıdı: Zürih, 1908. Whitlock şimdi Boston\'a giden bir gemide; annesinin yanına.'
          : 'Cebinde Rainer\'in kartı. Arkasında, birinin eklediği iki kelime: Zürih. 1908.',
      ],
      secenekler: [{ etiket: 'Otele yerleş', etki: { mekan: 'otel', bayrak: { 'gorüldü_otel': true, ekip_cemil: true, ekip_nermin: true, ekip_riza: false } } }],
    },
    parola_sahne: {
      ortam: 'ortam_banka',
      baslik: 'Gişe',
      paragraflar: (d) => [
        'Mermer bir gişe. Arkasında kır saçlı, altın gözlüklü bir memur. Neslihan anahtarı ve vasiyetin noter onaylı kopyasını uzatıyor. Memur ikisini de uzun uzun inceliyor.',
        'Kasa 1908, diyor sonunda; Fransızca, yumuşak. İki anahtarlı kasa. Mösyö Rivière\'in varisi olarak anahtarı tanıyorum, madmazel. Ama yönetmelik gereği Mösyö Rivière\'in parolasını söylemeniz gerekiyor.',
        sayi(d, 'yanlisParola') > 0 ? 'Memurun kaşları her yanlışta biraz daha yükseliyor. Bir yanlış daha ve müdürü çağıracak.' : 'Neslihan sana bakıyor. Sen ona.',
      ],
      secenekler: [
        { etiket: 'Montaigne', kosul: (d) => sayi(d, 'yanlisParola') < YANLIS_SINIRI, etki: { artir: { yanlisParola: 1 } }, sonra: 'parola_yanlis' },
        { etiket: 'Que sais-je?', kosul: (d) => sayi(d, 'yanlisParola') < YANLIS_SINIRI, sonra: 'kasa' },
        { etiket: 'On iki Aralık 1912', kosul: (d) => sayi(d, 'yanlisParola') < YANLIS_SINIRI, etki: { artir: { yanlisParola: 1 } }, sonra: 'parola_yanlis' },
        { etiket: 'Neslihan', kosul: (d) => sayi(d, 'yanlisParola') < YANLIS_SINIRI, etki: { artir: { yanlisParola: 1 } }, sonra: 'parola_yanlis' },
        { etiket: 'Memur müdürü çağırıyor', kosul: (d) => sayi(d, 'yanlisParola') >= YANLIS_SINIRI, sonra: 'mudur' },
      ],
    },
    parola_yanlis: {
      ortam: 'ortam_banka',
      baslik: 'Hayır',
      paragraflar: [
        'Memur başını iki yana sallıyor; özür diler gibi. Hayır, madmazel. Çok üzgünüm.',
        'Neslihan dudağını ısırıyor. Gaston\'u düşünüyor, diyor fısıltıyla. Onu en iyi ben tanırdım. Neyi en çok severdi?',
      ],
      secenekler: [{ etiket: 'Bir daha dene', sonra: 'parola_sahne' }],
    },
    mudur: {
      ortam: 'ortam_banka',
      baslik: 'Müdür',
      paragraflar: (d) =>
        bayrak(d, 'klaraTanisti')
          ? [
              'Müdür geliyor; uzun boylu, soğuk. Ama arkasından Klara Rainer de geliyor. Müdüre bir şey fısıldıyor. Müdür bir an duraksıyor, sonra çekiliyor.',
              'Klara Neslihan\'ın yanına eğiliyor. Gaston amca her mektubunu iki kelimeyle bitirirdi, diyor. Dedem onunla hep bununla alay ederdi: Bir bankacı her şeyi bilmeli, Gaston. Gaston da gülümser, bilmiyorum derdi. Fransızca.',
              'Neslihan\'ın gözleri doluyor. Que sais-je, diyor gişeye. Memur başını eğiyor.',
            ]
          : [
              'Müdür geliyor; uzun boylu, soğuk. Mahkeme kararı olmadan kasayı açamayız, diyor. Yarın bir avukat göndereceğiz. Neslihan bir an donuyor.',
              'Sonra, sanki bir şey hatırlamış gibi, çantasından Denemeler\'i çıkarıp ilk sayfayı açıyor. Damgaya bakıyor. Sonra gülümsüyor; ağlamakla gülmek arasında. Her kitabına basardı, diyor. Her mektubunun sonuna yazardı. Que sais-je?',
              'Müdür bir an susuyor; sonra memura başını sallıyor. Ama bir telefon ediyor. Kime ettiğini görmüyorsun.',
            ],
      secenekler: [{ etiket: 'Devam', etki: (d) => (bayrak(d, 'klaraTanisti') ? {} : { bayrak: { gecikme14: true } }), sonra: 'kasa' }],
    },
    kasa: {
      ortam: 'ortam_banka',
      efekt: ['demir_kapi'],
      baslik: 'Kasa 1908',
      paragraflar: [
        'Bodrum. Çelik bir kapı, yüzlerce küçük çekmece. Memur kendi anahtarını bir kilide, Neslihan\'ınkini öbürüne sokuyor. Aynı anda çeviriyorlar. Uzun, dar bir kutu kayarak çıkıyor.',
        'İçinde iki şey. Kırmızı deri kaplı kalın bir defter. Ve bir zarf: Neslihan\'ın adı, Rivière\'in el yazısıyla.',
        'Defteri açıyorsun. İlk sayfa: Selanik, Ağustos 1908. Beş kurucu. V. R., G. R. ve üç baş harf daha. Altında: Kalıp, Manastırlı usta İ., bedeli ödendi. Usta bilmesin.',
        'Ve amaç, Rainer\'in düzgün el yazısıyla: İmparatorluklar yıkılacak; yıkıntıdan biz kazanacağız.',
        'Sonraki sayfalar kırmızı mürekkeple. On bir yıl. Altı devletin bakanları, generalleri, gazete sahipleri. Ne zaman, ne kadar, kimin eliyle.',
      ],
      secenekler: [{ etiket: 'Neslihan zarfı açıyor', etki: { delil: ['kurulus_defteri'] }, sonra: 'mektup' }],
    },
    mektup: {
      ortam: 'ortam_banka',
      ortamOran: 0.4,
      baslik: 'Kızım Neslihan',
      paragraflar: [
        'Neslihan mektubu yüksek sesle okuyor; sesi titriyor ama durmuyor.',
        'Kızım. Bu satırları okuyorsan ben ölmüşüm ve sen bu kasayı açmışsın. Sana borçlu olduğum gerçeği yazıyorum. 1912 sonbaharında baban İsmail Usta yazıhaneme girdi ve kalıbı aldı. Ben onu Manastır\'daki Sırp komutanlığına ihbar ettim. Casus dedim.',
        'Sonra seni yollarda buldum. Tifolu bir arabada, annenin yanında. Annen öldü. Seni aldım. Önce suçluluktan. Sonra sevdiğim için. Ama bir suçu sevgi temizlemez.',
        'Bu defter Viktor\'un hayatı. Bu defterle onu durdurabilirsin. Yapıp yapmamak senin elinde. Ben yapamadım; korktum.',
        'Que sais-je? Ne biliyorum ki? Hiçbir şey. Yalnızca seni sevdiğimi. Gaston.',
        'Neslihan mektubu katlıyor. Uzun süre hiçbir şey söylemiyor. Sonra sana dönüyor. Babamı o ihbar etmiş, abi. Ve ben ona baba dedim.',
      ],
      secenekler: [
        { etiket: 'İkisi de doğru. İkisi de senin.', etki: { artir: { neslihanBag: 1 } }, sonra: 'gol' },
        { etiket: 'Bir şey söyleme. Elini tut.', sonra: 'gol' },
      ],
    },
    gol: {
      ortam: 'ortam_zurih',
      baslik: 'Göl kıyısı',
      paragraflar: (d) => [
        'Bankadan çıkıyorsunuz. Bahnhofstrasse\'den göle doğru. Akşamüstü; göl kurşun rengi, kuğular kıyıda.',
        bayrak(d, 'gecikme14')
          ? 'Göl kıyısında sizi bekliyorlar: kısa boylu, yuvarlak gözlüklü bir adam, Dr. Gubler; yanında iki İsviçre polisi ve elinde bir mahkeme kararı. Müdürün telefonu. Mademoiselle, diyor Gubler. O defter müvekkilimin malıdır. Teslim edin.'
          : 'Göl kıyısında kısa boylu, yuvarlak gözlüklü bir adam: Dr. Gubler, Rainer\'in avukatı; yanında iki iri adam. Mahkeme kararı yarın elimde olacak, diyor. Ama ben dostça bir çözümü tercih ederim. O defteri bana verin.',
        bayrak(d, 'klaraTanisti') ? 'Arkanızdan koşarak Klara geliyor; nefes nefese. Gubler\'in yüzü bir an değişiyor.' : 'Göl kıyısında başka kimse yok.',
        'Nermin çantasını omzuna alıyor. Cemil Bey gözlüğünü siliyor. Neslihan defteri göğsüne bastırmış.',
      ],
      secenekler: [
        { etiket: 'Defteri Klara\'ya ver. Dedesini kendi eliyle o durdursun.', kosul: (d) => bayrak(d, 'klaraTanisti'), etki: { bayrak: { defter14: 'klara' } }, sonra: 'son_klara' },
        { etiket: 'Nermin her sayfayı fotoğraflasın; aslını Gubler\'e ver.', etki: { bayrak: { defter14: 'kopya' } }, sonra: 'son_kopya' },
        { etiket: 'Defteri bırakma. Neslihan\'la Viyana\'ya götür.', etki: { bayrak: { defter14: 'viyana' } }, sonra: 'son_viyana' },
      ],
    },
    son_klara: {
      ortam: 'ortam_zurih',
      baslik: 'Klara',
      paragraflar: [
        'Defteri Klara\'ya uzatıyorsun. Gubler bir adım atıyor; Klara ona dönüyor. Herr Doktor, diyor; buz gibi. Bu bankanın avukatı benim. Bu defter bir Rainer\'in elinde. Mahkemeye gidin isterseniz.',
        'Gubler bir şey söyleyemiyor. İki adamıyla geri çekiliyor.',
        'Klara defteri iki eliyle tutuyor. Dedem beni büyüttü, diyor. Bana Montaigne\'i o okuttu. Aralık\'ta Viyana\'da genel kurul var. Bu defteri masaya ben koyacağım. Bir Rainer\'i ancak bir Rainer durdurabilir.',
        'Neslihan ona bakıyor; kendini görür gibi.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'son_sahne14' }],
    },
    son_kopya: {
      ortam: 'ortam_zurih',
      baslik: 'Kodak',
      paragraflar: [
        'Nermin otelin karanlık odasında bütün gece çalışıyor. Ödünç bir Kodak, bir lamba, kırk iki sayfa. Sabaha karşı kırk iki cam negatif kurumaya asılı.',
        'Sabah defteri Gubler\'e teslim ediyorsunuz. Gubler gülümsüyor; kazandığını sanıyor. Müvekkilim minnettar kalacak, diyor.',
        'Nermin negatifleri üç ayrı zarfa koyuyor: biri Viyana\'ya, Kessler\'e; biri İstanbul\'a, Rıza Bey\'e; biri kendi çantasına. Bir defteri yakabilirsin, diyor. Bir fotoğrafı yakmak için önce bütün kopyalarını bulman gerek.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'son_sahne14' }],
    },
    son_viyana: {
      ortam: 'ortam_zurih',
      baslik: 'Gece treni',
      paragraflar: (d) => [
        bayrak(d, 'gecikme14')
          ? 'Polisler bir adım atıyor. Cemil Bey önlerine geçiyor; kusursuz bir Almancayla: Madmazel Rivière bir kasanın yasal varisidir; mahkeme kararı yarın tebliğ edilmiştir, bugün değil. Polisler birbirine bakıyor. Gubler kızarıyor. Bu kısa duraksama yetiyor.'
          : 'Gubler\'in iki adamı yaklaşıyor. Cemil Bey önlerine geçiyor; bastonunu yere vuruyor. Bir İsviçre polisi seyrediyor; Gubler\'in adamları duruyor.',
        'O gece Viyana trenine biniyorsunuz. Neslihan defteri kucağında tutuyor; uyumuyor.',
        'Kompartımanın camında karanlık Alpler. Neslihan bir ara konuşuyor: Gaston korktu, diyor. Ben korkmayacağım.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'son_sahne14' }],
    },
    son_sahne14: {
      ortam: 'ortam_tren',
      baslik: '20 Kasım 1919',
      paragraflar: (d) => [
        'Zürih\'ten ayrılırken Nermin bir telgraf okuyor: İstanbul\'dan, Rıza Bey\'den.',
        'BABAN İYİ STOP GÜLCE BÜROYA DÖNDÜ STOP RAİNERİN ADAMLARI SÜLEYMANIN KAYIKHANESİNİ GÖZETLİYOR STOP DİKKAT STOP',
        'Ve bir satır daha, Rıza Bey\'in kuru üslubuyla: ANADOLUDAN HABERLER BÜYÜYOR STOP HERKES BİR ŞEY BEKLİYOR STOP',
        bayrak(d, 'defter14') === 'klara'
          ? 'Defter Klara\'da. Aralık\'ta Viyana\'da, bir torun dedesinin karşısına oturacak.'
          : bayrak(d, 'defter14') === 'kopya'
            ? 'Defter Gubler\'de; kırk iki negatif üç ayrı yolda. Aralık\'ta Viyana\'da Rainer kazandığını sanacak.'
            : 'Defter Neslihan\'ın kucağında. Aralık\'ta Viyana\'da onu masaya o koyacak.',
        'Neslihan Rivière\'in mektubunu bir kez daha okuyup cebine koyuyor. Bir gün babama okuyacağım, diyor. Belki. Que sais-je?',
        'On dördüncü bölümün sonu.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_zurih',
      ortamOran: 0.45,
      baslik: 'On dördüncü bölüm bitti',
      paragraflar: ['Üçüncü kitap başladı. Sıradaki: Viyana, genel kurul. Kararların kaydedildi.'],
      secenekler: [{ etiket: 'On beşinci bölüme geç', sonrakiBolum: 'bolum15' }, { etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    otel: {
      ad: 'Otel odası',
      ortam: 'ortam_otel',
      tarif: 'Limmat kıyısında küçük bir otel. Pencereden nehir ve kuğular. Yerde Saltiel\'in gönderdiği tahta sandık; çivileri sökülmüş, kapağı hâlâ kapalı.',
      nesneler: [
        {
          id: 'riviere_sandigi',
          etiket: 'Rivière\'in sandığı',
          incele: (d) =>
            delilVar(d, 'ajanda')
              ? 'Sandıkta Rivière\'in gömlekleri, bir pipo, bir çerçeve. Çerçevedeki fotoğraf seni tanıyor: Neslihan, on yedi yaşında, kısa saçlı.'
              : 'Neslihan kapağı kaldırıyor. Sedir ve tütün kokusu. Gömlekler, bir pipo, birkaç kitap, bir çerçeve. Bir gömleğin cebinde, mendile sarılı, kanat başlı küçük pirinç bir anahtar; sapında 1908. Ve deri kaplı bir ajanda. Neslihan Ekim sayfasını açıyor: Viyana, noter, N. imzaladı. Altında: Zürih, Vollmer, ikinci anahtar yerinde.',
          etki: (d) => (delilVar(d, 'ajanda') ? null : { delil: ['kucuk_anahtar', 'ajanda'] }),
        },
        {
          id: 'denemeler',
          etiket: 'Montaigne\'in Denemeler\'i',
          kosul: (d) => delilVar(d, 'ajanda'),
          incele: (d) =>
            delilVar(d, 'exlibris')
              ? 'Kitabın sayfa kenarları Rivière\'in notlarıyla dolu.'
              : 'Sandıktaki kitaplardan biri: Denemeler, ilk cilt. Köşkün kütüphanesindekinin eşi. İlk sayfada bir mürekkep damgası: bir terazi ve altında üç kelime: Que sais-je? Neslihan parmağını damganın üstünde gezdiriyor. Her kitabına basardı, diyor.',
          etki: (d) => (delilVar(d, 'exlibris') ? null : { delil: ['exlibris'] }),
        },
      ],
      kisiler: ['neslihan', 'cemil', 'nermin'],
      gecisler: [{ hedef: 'sehir', etiket: 'Şehre çık' }],
    },
    sehir: {
      ad: 'Bahnhofstrasse',
      ortam: 'ortam_zurih',
      tarif: 'İstasyondan göle inen geniş cadde. Ihlamur ağaçları yaprak döküyor. Saatçiler, kürkçüler, bankalar; bankalar, bankalar. Sessiz, temiz, ağır kapılar.',
      nesneler: [
        {
          id: 'vollmer',
          etiket: 'Banque Vollmer et Cie',
          incele: (d) =>
            cikarimVar(d, 'kasa_yeri')
              ? 'Gri taş bir bina. Pirinç bir levha: Banque Vollmer et Cie, 1867. Kapıda üniformalı bir kapıcı.'
              : 'Caddede onlarca banka var. Hangisi olduğunu bilmeden içeri girmenin anlamı yok.',
        },
      ],
      kisiler: [],
      gecisler: [
        { hedef: 'banka', etiket: 'Banque Vollmer\'e gir', kosul: (d) => cikarimVar(d, 'kasa_yeri') && !delilVar(d, 'kurulus_defteri') },
        { hedef: 'otel', etiket: 'Otele dön' },
      ],
    },
    banka: {
      ad: 'Banque Vollmer',
      ortam: 'ortam_banka',
      tarif: 'Mermer salon, yüksek pencereler, bir duvar saati. Gişelerde altın gözlüklü memurlar. Bir köşede, siyah elbiseli genç bir kadın dosya okuyor; arada sizi süzüyor.',
      nesneler: [
        {
          id: 'gise',
          etiket: 'Kasa gişesi',
          incele: (d) =>
            cikarimVar(d, 'parola')
              ? 'Neslihan anahtarı avucunda sıkıyor. Hazırım, diyor.'
              : 'Memur bir levhayı gösteriyor: İki anahtarlı kasalar için anahtar sahibinin parolası gereklidir. Parolayı bilmeden gişeye gitmenin anlamı yok.',
          etki: (d) => (cikarimVar(d, 'parola') ? { sahne: 'parola_sahne' } : null),
        },
      ],
      kisiler: ['klara'],
      gecisler: [{ hedef: 'sehir', etiket: 'Caddeye çık' }],
    },
  },

  kisiler: {
    klara: {
      ad: 'Klara Rainer',
      giris: (d) => (bayrak(d, 'klaraTanisti') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Siyah elbiseli kadın yanınıza geliyor. Yirmi sekiz yaşlarında, kısa saçlı, keskin gözlü. Mükemmel bir Fransızcayla: Madmazel Rivière, değil mi? Ben Klara Rainer. Bankanın avukatıyım. Ve evet; o Rainer\'in torunu.',
          secenekler: [
            {
              etiket: 'Bizi neden uyarıyorsun?',
              etki: { bayrak: { klaraTanisti: true }, delil: ['klara_uyarisi'] },
              sonra: 'sonra',
              cevap: 'Klara sesini alçaltıyor. Dedemin avukatı Gubler yarın sabah mahkemeden tedbir kararı alacak, diyor. Kasa mühürlenecek. Bugün açamazsanız bir daha açamazsınız. Neden söylüyorum? Neslihan\'a bakıyor. Çünkü Gaston amca beni de büyüttü, biraz. Ve geçen ay dedemin masasında İzmir\'den gelen bir raporu okudum. Kırk makineli tüfek. İki taraf. Bir bankacının torunuyum, madmazel. Hesap yapmayı bilirim. Bu hesap tutmuyor.',
            },
          ],
        },
        sonra: {
          soz: 'Klara dosyasına dönüyor; sesini alçaltarak. Kapanışa iki saat var. Acele edin.',
          secenekler: [{ etiket: 'Teşekkürler Klara.' }],
        },
      },
    },
    neslihan: {
      ad: 'Neslihan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            delilVar(d, 'ajanda')
              ? 'Neslihan anahtarı avucunda çeviriyor. 1908, diyor. Babamızın kalıbı döktüğü yıl. Gaston bu anahtarı hep bir gömleğinin cebinde taşırdı; ben bir uğur sanırdım.'
              : 'Neslihan sandığın başında oturmuş, dokunmadan bakıyor. Açamıyorum, diyor. İçinde ne var bilmiyorum. Ya da biliyorum, korkuyorum.',
          secenekler: [{ etiket: 'Birlikte açalım.' }],
        },
      },
    },
    cemil: {
      ad: 'Cemil Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Cemil Bey pencereden göle bakıyor. 1905\'te Viyana\'dan buraya bir kongre için gelmiştim, diyor. O zaman da böyleydi: sessiz, temiz. Bütün Avrupa\'nın parası bu sessizliğin altında uyuyor. Bir de sırları.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
    nermin: {
      ad: 'Nermin Hanım',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Nermin çantasından küçük bir kutu çıkarıyor: bir Kodak fotoğraf makinesi. Viyana\'da Kessler ödünç verdi, diyor. Bir gazeteci olarak bir şey öğrendim: Bir belgeyi kimse alamaz, eğer kopyası varsa.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
  },
};
