// Yirmi birinci bölüm: "Arethusa". İzmir, 11-18 Eylül 1922.
// Arka plan (gerçek): Türk ordusu 9 Eylül 1922'de İzmir'e girdi; 13 Eylül'de başlayan büyük yangın kentin büyük bölümünü
// yaktı; faili bugün de tartışmalıdır ve bu bölüm bunu tartışmaz, kimseyi suçlamaz. Rıhtımda her topluluktan insanlar,
// geride kalan yanmış köylerden gelenler; acı herkes için aynı ölçüyle anlatılır. Gerçek kişiler kurguya karışmaz.
// Kurgu: Pendle'in gemisi Arethusa, acentesi Fenwick, süvari Kemal Reis (Süleyman'ın 1897'de kaybettiği oğlu).
// Bölüm kalıbı kırar: tek çıkarım; gerisi yangın, sorgu, deniz ve yüzleşme sahneleri.
// Karşılık verilen iplikler: aramaSozu / kemalSoylenti (Kemal), nerminYemin + nerminCevdet (Pendle), cemilRapor (Eleni),
// travma + kardesGecesi (yangın anısı), rizaHikaye (Fenwick'in sorgusu). Yeni iplik: cocukKarar (rıhtımdaki kız, "Ayva").
import { BOLUM20 } from './bolum20';
import { bayrak, cikarimVar, delilVar, sayi } from '../oyun/motor';

const neslihanSesi = (d) => ['durust', 'sonra_durust'].includes(bayrak(d, 'kardesGecesi'));
const cemilSesi = (d) => sayi(d, 'cemilBag') >= 1;
// Pendle'in sonu: Kemal yolcuları aldıysa Pendle gemide yakalanır; tereddüt ettiyse motorla kaçar.
const pendleEtki = (d, yol, bag) => ({
  bayrak: { pendleSonu: bayrak(d, 'kemalSonu') === 'yolcu' ? yol : 'kacti_' + yol },
  artir: { nerminBag: bag },
});

export const BOLUM21 = {
  id: 'bolum21',
  ad: 'Yirmi birinci bölüm: Arethusa',
  baslangic: 'acilis',
  ilkMekan: 'kordon21',

  deliller: {
    ...BOLUM20.deliller,
    suvari: { ad: 'Arethusa\'nın süvarisi', tarif: 'Pendle Shipping\'in Arethusa vapurunun süvarisi: Kemal Reis. Kırk yaşlarında. Sol kulağının üstünde eski bir yanık izi. Süleyman Kaptan dürbünle baktığından beri elleri titriyor.' },
    ajan_defteri: { ad: 'Acentenin defteri', tarif: 'Pendle\'in acentesi Fenwick\'in masasındaki defter: Arethusa\'ya geçiş, kişi başı beş altın; çocuk üç. Altın getiremeyenin adının karşısında: hayır. Ambar listesinde ayrıca kırk sandık "kurtarılmış mal".' },
    eleni_tanikligi: { ad: 'Eleni\'nin söyledikleri', tarif: 'Dr. Eleni Mavrou: Kızılhaç\'ın kırk sandık ilacı liman deposundan "sahipsiz mal" diye Arethusa\'ya yüklendi. Pire\'de satılacak. Kliniğinde sargı bezi kalmadı.' },
  },

  cikarimlar: {
    ...BOLUM20.cikarimlar,
    fiyat: {
      a: 'ajan_defteri',
      b: 'eleni_tanikligi',
      ad: 'İnsanın fiyatı',
      metin: 'Pendle bu kentten iki şey taşıyor: altın verebilenleri ve kimsenin sahip çıkamadığı ilaçları. İkisini de Pire\'de bir kez daha satacak. Leventis\'ten beri hep aynı iş: bir savaşın iki ucundan da almak. Bu kez sattığı, rıhtımdaki insanların kendisi.',
    },
  },

  olaylar: [
    {
      id: 'yangin',
      kosul: (d) => cikarimVar(d, 'fiyat') && delilVar(d, 'suvari'),
      etki: { sahne: 'yangin' },
    },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Yirmi birinci bölüm bitti.' },
    { kosul: (d) => !delilVar(d, 'suvari'), metin: 'Kordon\'da Süleyman Kaptan\'ın yanına git; Arethusa\'ya bak.' },
    { kosul: (d) => !delilVar(d, 'ajan_defteri'), metin: 'Pendle\'in acentesinin masasına bak.' },
    { kosul: (d) => !delilVar(d, 'eleni_tanikligi'), metin: 'Dr. Eleni\'nin kliniğine git.' },
    { kosul: () => true, metin: 'Bulduklarını soruşturma panosunda birleştir.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_kordon',
      baslik: '11 Eylül 1922, İzmir',
      paragraflar: (d) => [
        'İki gün önce ordu kente girdi. Kordon\'da şimdi kimse kimseye bakmıyor; herkes denize bakıyor. Körfezde yabancı savaş gemileri, birkaç yük vapuru ve aralarında kara gövdeli, bacasında beyaz şerit olan bir gemi: Arethusa.',
        'Rıhtım insanla dolu. Bohçalar, yorganlar, kafesinde bir kanarya, bir dikiş makinesi. Rum aileler, Ermeni aileler, Levanten tüccarlar; bir köşede de batıdan, yanmış köylerinden yürüyerek gelmiş Türk köylüleri, kağnılarıyla. Herkesin gözünde aynı soru: Nereye?',
        'Cemil Bey\'in sahra hastanesi orduyla birlikte batıya indi; Rıza Bey, Nermin ve Neslihan seninle. Ve bir kişi daha: Süleyman Kaptan. Topal Hasan\'ın motoruyla İstanbul\'dan dört günde geldi.',
        bayrak(d, 'kemalSoylenti')
          ? 'Arethusa İzmir\'de dediğinde bir şey söylememişti, diyor Rıza Bey alçak sesle. Sonra bir sabah bastonunu alıp motora bindi. Pire\'den gelen söylentiyi unutmadı.'
          : 'Neden geldiğini kimseye söylemedi. Bir İngiliz armatörün gemisini görmeye, diyor yalnızca.',
        'Kordon\'un ortasında bir masa: Pendle Shipping\'in acentesi. Masanın önünde bir kuyruk; elinde altın olanlar öne, olmayanlar arkaya.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'kordon21', bayrak: { 'gorüldü_kordon21': true, ekip_cemil: true, ekip_riza: true, ekip_nermin: true } } }],
    },
    kopru: {
      ortam: 'ortam_kordon',
      baslik: 'Dürbün',
      paragraflar: (d) => [
        'Süleyman Kaptan\'ın dürbünü pirinç, çizik çizik. Sana uzatmıyor; kendisi bakıyor. Uzun süre.',
        'Arethusa\'nın köprüsünde bir adam. Kırk yaşlarında, uzun boylu, kasketsiz. Sol kulağının üstünde eski bir yanık izi. Elleri parmaklıkta.',
        'Nevres battığında kazan patladı, diyor Süleyman; sesi kâğıt gibi. Kemal kazan dairesinin kapısındaydı. Sol kulağının üstü yandı. Ben sardım; denize atlamadan önce kendi gömleğimle sardım.',
        'Dürbünü indiriyor. Elleri titriyor. Değildir, diyor. Yirmi beş yıl oldu. Her yanık izi Kemal değildir.',
        bayrak(d, 'kemalSoylenti')
          ? 'Pire\'deki aşçı yamağının söylediği adı ikiniz de biliyorsunuz. Kemal Reis. Pendle\'in gemilerinde.'
          : 'Kordon\'da bir hamal acentenin masasına bağırıyor: Kemal Reis\'e söyleyin, çocuklar bekliyor!',
      ],
      secenekler: [
        {
          etiket: 'Aramayı bırakan adam kendini de gömer, demiştin kaptan. Senin sözündü.',
          kosul: (d) => !!bayrak(d, 'aramaSozu'),
          etki: { delil: ['suvari'], bayrak: { suleymanUmut: 'soz' }, artir: { suleymanBag: 1 } },
          sonra: 'kopru_son',
        },
        {
          etiket: 'Belki değildir. Ama oraya kadar gidip bakmadan bilemeyiz.',
          etki: { delil: ['suvari'], bayrak: { suleymanUmut: 'bak' } },
          sonra: 'kopru_son',
        },
        {
          etiket: 'Bir şey söyleme. Elini omzuna koy.',
          etki: { delil: ['suvari'], bayrak: { suleymanUmut: 'sessiz' } },
          sonra: 'kopru_son',
        },
      ],
    },
    kopru_son: {
      ortam: 'ortam_kordon',
      baslik: 'Süleyman',
      paragraflar: (d) => [
        bayrak(d, 'suleymanUmut') === 'soz'
          ? 'Süleyman sana bakıyor. İçinde bir şey yerinden oynuyor. Benim sözümü bana mı satıyorsun, diyor; ama gülümsüyor. Sonra dürbünü yeniden kaldırıyor. Bu kez titremiyor.'
          : bayrak(d, 'suleymanUmut') === 'bak'
            ? 'Süleyman başını sallıyor. Gidip bakarız, diyor. Bakarız. Sonra kendi kendine bir kez daha söylüyor; sanki inanmak için: Bakarız.'
            : 'Süleyman elini omzundaki elinin üstüne koyuyor. Bir şey demiyor. İkiniz körfeze bakıyorsunuz; kalabalığın uğultusu arkanızda bir deniz gibi.',
        'Ama önce rıhtıma bakmalısın, diyor sonunda. Bu gemi kimi alıyor, kimi bırakıyor. Kemal ise, oğlumun ne iş yaptığını bilmek isterim.',
      ],
      secenekler: [{ etiket: 'Devam' }],
    },
    cocuk: {
      ortam: 'ortam_kordon',
      baslik: 'Ayva',
      paragraflar: (d) => [
        'Kalabalığın arasında, bir sandığın üstünde oturmuş, altı yedi yaşlarında bir kız. Ayakkabısının biri yok. Ağlamıyor; bir ninni mırıldanıyor, kendine. Sözleri ne Türkçe ne Rumca; yarım yamalak bir şey, belki ikisi birden.',
        'Neslihan önüne çömeliyor. Adın ne? Kız bakıyor, cevap vermiyor. Annen nerede? Kız eliyle kalabalığı gösteriyor: her yeri.',
        'Neslihan cebinden kurumuş bir ayva dilimi çıkarıyor; Ankara\'dan beri taşıyor. Kız alıyor. Ayva, diyor Neslihan. Kız tekrarlıyor: Ay-va. İlk kez gülümsüyor.',
        bayrak(d, 'ayvaAnlatildi')
          ? 'Selanik\'te, Hotel Olympos\'ta ona ayva ağacını anlatmıştın; kuyunun başını. O günden beri cebinde bir dilim taşıyor, diye fark ediyorsun.'
          : '',
        'Neslihan sana bakıyor. Bir şey soruyor bakışı; ama sormuyor.',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Ailesini arayalım. Bu rıhtımda birileri onu arıyordur.',
          etki: { bayrak: { cocukKarar: 'aile' }, artir: { neslihanBag: 1 } },
          sonra: 'cocuk_aile',
        },
        {
          etiket: 'Yanımızda kalsın. Bu kalabalıkta kimseyi bulamaz.',
          etki: { bayrak: { cocukKarar: 'yanina' } },
          sonra: 'cocuk_yanina',
        },
      ],
    },
    cocuk_aile: {
      ortam: 'ortam_kordon',
      baslik: 'Ninni',
      paragraflar: [
        'Kızın elini tutup Kordon boyunca yürüyorsunuz. Neslihan kızın mırıldandığı ninniyi yüksek sesle söylüyor; her yirmi adımda bir. İnsanlar dönüp bakıyor, başlarını sallıyor.',
        'Bir saat sonra, Pasaport iskelesinin yanında, yaşlı bir kadın ayağa fırlıyor. Ninninin ikinci yarısını o söylüyor. Kız kadının eteğine yapışıyor.',
        'Kadın Neslihan\'ın ellerini öpüyor; Neslihan geri çekmiyor. Kızın adı Rina, diyor kadın. Neslihan gülüyor: Bizim için Ayva.',
      ],
      secenekler: [{ etiket: 'Devam' }],
    },
    cocuk_yanina: {
      ortam: 'ortam_kordon',
      baslik: 'Ayva',
      paragraflar: [
        'Neslihan kızı kucağına alıyor. Kız başını onun omzuna koyuyor ve hemen uyuyor; sanki günlerdir uyumamış.',
        'Ben on yedi yaşında bir çadırdan alındım, diyor Neslihan sana. Biri bana sıcak oda, yemek dedi. Gittim. Bu kıza ne diyeceğimi bilmiyorum abi. Ama onu bu rıhtımda bırakmayacağım.',
        'Kızın elindeki ayva dilimi düşmek üzere; Neslihan parmağıyla yerine itiyor.',
      ],
      secenekler: [{ etiket: 'Devam' }],
    },
    yangin: {
      ortam: 'ortam_yangin21',
      efekt: 'yangin',
      baslik: '13 Eylül 1922, gece',
      paragraflar: (d) => [
        'Akşamüstü ilk dumanı Ermeni mahallesinin üstünde görüyorsun. Gece yarısına doğru rüzgâr dönüyor; ateş Frenk mahallesine, sonra Kordon\'un arkasındaki sokaklara iniyor. Kimin yaktığını kimse bilmiyor; herkes birini suçluyor; ateş kimseyi dinlemiyor.',
        'Rıhtım insanla dolup taşıyor. Sırtında ateş, önünde deniz. Yüz binden fazla insan, bir taş şeridin üstünde. Çocuklar, yaşlılar, yaralılar; Rumca, Ermenice, Türkçe, Ladino, İtalyanca bağıran sesler. Yanmış köylerinden gelen köylüler de kağnılarıyla aynı rıhtımda.',
        'Bir binanın çatısı çöküyor. Ses bir top atışı gibi.',
        sayi(d, 'travma') >= 2
          ? 'Ve sen yeniden Seddülbahir\'desin. Kum. Barut. Deniz kırmızı. Biri adını bağırıyor ama ses çok uzaktan geliyor.'
          : 'Kalbin göğsünü yumrukluyor; ama ayaktasın. Seddülbahir bir an göz kapaklarının arkasında yanıp sönüyor, sonra gidiyor.',
      ],
      secenekler: [
        {
          etiket: 'Neslihan\'ın sesine tutun.',
          kosul: (d) => sayi(d, 'travma') >= 2 && neslihanSesi(d),
          etki: { bayrak: { yanginAni: 'neslihan' }, artir: { travma: -1 } },
          sonra: 'yangin_ses',
        },
        {
          etiket: 'Cemil Bey\'in sesine tutun.',
          kosul: (d) => sayi(d, 'travma') >= 2 && !neslihanSesi(d) && cemilSesi(d),
          etki: { bayrak: { yanginAni: 'cemil' }, artir: { travma: -1 } },
          sonra: 'yangin_ses',
        },
        {
          etiket: 'Dişlerini sık. Yalnız çık bundan.',
          kosul: (d) => sayi(d, 'travma') >= 2,
          etki: { bayrak: { yanginAni: 'yalniz' }, artir: { travma: 1 } },
          sonra: 'yangin_ses',
        },
        { etiket: 'Kalabalığa dal. Rıza Bey\'i bul.', kosul: (d) => sayi(d, 'travma') < 2, sonra: 'sorgu21' },
      ],
    },
    yangin_ses: {
      ortam: 'ortam_yangin21',
      baslik: 'Ses',
      paragraflar: (d) =>
        bayrak(d, 'yanginAni') === 'neslihan'
          ? [
              'Abi. Abi, bana bak. Neslihan iki elini yüzüne koymuş. Ayva ağacı, diyor. Avlu. Kuyu. Bana su serptin, ben ağladım, annem seni kovaladı. Hatırlıyor musun?',
              'Hatırlıyorsun. Kuyunun soğuk taşı. Annenin sesi. Kum çekiliyor; barut çekiliyor. Rıhtımdasın; ateş gerçek ama sen buradasın.',
              'Viyana\'da bana doğruyu söyledin, diyor Neslihan. Şimdi ben sana söylüyorum: Buradasın. Seni bırakmıyorum.',
            ]
          : bayrak(d, 'yanginAni') === 'cemil'
            ? [
                'Arif. Arif Efendi. Nabzını sayıyorum. Cemil Bey\'in parmakları bileğinde. Doksan, seksen beş, seksen. Kostas\'ın raporunu yazarken yanımdaydın. Şimdi ben yanındayım.',
                'Sayıları dinliyorsun. Seksen. Yetmiş beş. Kum çekiliyor; deniz yeniden mavi değil ama artık kırmızı da değil.',
                'Cemil Bey elini bırakmıyor. Hekimler hasta seçmez, diyor. Ama arkadaş seçer.',
              ]
            : [
                'Dişlerini sıkıyorsun. Kum ağzında. Kimsenin elini tutmuyorsun. Ateş, kum, barut; hepsi bir arada.',
                'Ne kadar sürdüğünü bilmiyorsun. Kendine geldiğinde bir duvarın dibinde oturuyorsun; ellerin kanamış. Kimse görmedi. Bunu başardın. Ama göğsündeki yumruk bir boğum daha derine indi.',
              ],
      secenekler: [{ etiket: 'Kalk. Rıza Bey\'i bul.', sonra: 'sorgu21' }],
    },
    sorgu21: {
      ortam: 'ortam_yangin21',
      baslik: 'Fenwick',
      paragraflar: (d) => [
        'Acentenin masası devrilmiş. Fenwick, ince bıyıklı, terli bir İngiliz, bir kadının kulağından küpesini almaya çalışırken yakalanmış. Beş altın yerine, diyormuş; geçiş için. Kalabalık onu iskelenin kenarına sıkıştırmış. Biri denize, diye bağırıyor; başkaları da.',
        'Rıza Bey araya giriyor; bastonu elinde. Fenwick onun ayaklarına kapanıyor. Help me, please, help.',
        bayrak(d, 'rizaHikaye')
          ? 'Rıza Bey\'in bastonu havada kalıyor. Bir an. Kasımpaşa\'daki gecenin sabahı, dizinde kırılan bir sopa. Sana bakıyor.'
          : 'Rıza Bey\'in bastonu havada kalıyor. Yüzü öfkeden kaskatı. Sana bakıyor.',
      ],
      secenekler: [
        {
          etiket: 'Rıza Bey, onu bana bırak. Konuşacak.',
          etki: { bayrak: { rizaSorgu: 'sen' } },
          sonra: 'sorgu21_son',
        },
        {
          etiket: 'Kalabalığa bırak. O da onları bıraktı.',
          etki: { bayrak: { rizaSorgu: 'kalabalik' }, artir: { travma: 1 } },
          sonra: 'sorgu21_son',
        },
        {
          etiket: 'Bir şey söyleme. Rıza Bey\'in ne yapacağını bekle.',
          etki: (d) => ({ bayrak: { rizaSorgu: bayrak(d, 'rizaHikaye') ? 'delil' : 'sopa' } }),
          sonra: 'sorgu21_son',
        },
      ],
    },
    sorgu21_son: {
      ortam: 'ortam_yangin21',
      baslik: 'Pendle nerede',
      paragraflar: (d) => {
        const s = bayrak(d, 'rizaSorgu');
        const p = [];
        if (s === 'sen') p.push('Fenwick\'i yakasından değil, kolundan tutup kalabalıktan çekiyorsun. Nermin defterini açıp önüne koyuyor. Beş altın, diyorsun. Çocuk üç. Kızılhaç\'ın kırk sandığı. Fenwick ağlamaya başlıyor; sonra konuşuyor.');
        if (s === 'kalabalik') p.push('Geri çekiliyorsun. Kalabalık Fenwick\'in üstüne kapanıyor. Rıza Bey bir an seni izliyor; sonra kendi bastonuyla kalabalığı yarıp adamı denizin kenarından çekiyor. Fenwick\'in yüzü kan içinde. Rıza Bey sana bir şey demiyor. Demesine gerek yok. Fenwick konuşuyor; dişlerinin arasından.');
        if (s === 'delil') p.push('Rıza Bey bastonu yavaşça indiriyor; yere, taşa dayıyor. Fenwick\'i ayağa kaldırıyor, ceketinin tozunu silkeliyor. Yakup, diyor yalnızca; kimse anlamıyor, sen anlıyorsun. Sonra Nermin\'in defterini Fenwick\'in önüne koyuyor ve tek tek soruyor. Fenwick her soruya cevap veriyor.');
        if (s === 'sopa') p.push('Rıza Bey\'in bastonu iniyor. Bir kez. Fenwick\'in omzuna. Sonra Rıza Bey duruyor; bastonuna bakıyor, sanki ilk kez görüyor. Elleri titriyor. Fenwick konuşuyor. Rıza Bey bütün gece bir kelime etmiyor.');
        p.push('Sir Henry gemide, diyor Fenwick. Armatör kamarasında. Şafakta demir alacaklar; yalnızca bilet alanlarla ve ambardaki ilaçlarla. Pire\'de her şey ikiye satılır, derdi. Kemal Reis... Kemal Reis bilmiyor ilaçları. Sir Henry ona söylemedi.');
        p.push('Süleyman Kaptan yanında. Topal Hasan bir kayık buldu, diyor. Kürekler hazır.');
        return p;
      },
      secenekler: [
        {
          etiket: 'Arethusa\'ya.',
          etki: (d) => ({ bayrak: { rizaBag: ['sen', 'delil'].includes(bayrak(d, 'rizaSorgu')) ? sayi(d, 'rizaBag') + 1 : sayi(d, 'rizaBag') } }),
          sonra: 'kemal',
        },
      ],
    },
    kemal: {
      ortam: 'ortam_kayik',
      baslik: 'Köprüüstü',
      paragraflar: [
        'Topal Hasan kürek çekiyor. Arkanızda kent yanıyor; körfezin suyu turuncu. Arethusa\'nın borda merdiveninden çıkıyorsunuz: sen, Süleyman, Nermin. Nöbetçi tayfa Süleyman\'ı görünce duruyor; yaşlı bir denizciye el kaldırılmaz.',
        'Köprüüstünde adam dönüyor. Yakından bakınca yanık iz daha belirgin. Kim olduğunu soracak; ama Süleyman\'ın elindeki şeyi görüyor.',
        'Paslı, pirinç bir pusula. Kayıkhanenin duvarından; yangından kurtarılan tek şey.',
        'Kemal, diyor Süleyman.',
        'Adam bir adım geri çekiliyor. Sonra bir adım daha. Babam Nevres\'le battı, diyor İngilizce; sonra Türkçe, yıllardır kullanmadığı bir dille: Babam battı. Bana öyle söylediler. Sir Henry\'nin babası beni denizden çıkardı. Sağ kalan yok dediler. Yirmi beş yıl.',
        'Süleyman pusulayı uzatıyor. İbresi titreyerek kuzeyi gösteriyor. Kemal ona dokunmuyor. Bakıyor.',
      ],
      secenekler: [
        {
          etiket: 'Seni yirmi beş yıl aradı. Pire\'den gelen her geminin yolcularına baktı.',
          kosul: (d) => !!bayrak(d, 'aramaSozu'),
          etki: { bayrak: { kemalSecim: 'aradi' } },
          sonra: 'kemal_son',
        },
        {
          etiket: 'Kemal Reis, ambarında Kızılhaç\'ın ilaçları var. Rıhtımda insanlar ölüyor.',
          etki: { bayrak: { kemalSecim: 'gorev' } },
          sonra: 'kemal_son',
        },
        {
          etiket: 'Bir şey söyleme. Baba ile oğulu bırak.',
          etki: { bayrak: { kemalSecim: 'sus' } },
          sonra: 'kemal_son',
        },
      ],
    },
    kemal_son: {
      ortam: 'ortam_kayik',
      baslik: 'Pusula',
      paragraflar: (d) => {
        const tam = bayrak(d, 'kemalSecim') !== 'sus' || sayi(d, 'suleymanBag') >= 2;
        const p = [];
        if (bayrak(d, 'kemalSecim') === 'aradi') p.push('Kemal sana bakıyor; sonra babasına. Aradın mı, diyor. Süleyman başını sallıyor. Her gemide. Kemal\'in yüzünde bir şey çözülüyor; yirmi beş yıllık bir düğüm.');
        if (bayrak(d, 'kemalSecim') === 'gorev') p.push('Kemal\'in yüzü sertleşiyor. İlaçlar mı? Fenwick\'in listesini uzatıyorsun. Kemal okuyor. Sir Henry bana yardım malzemesi dedi, diyor. Bana kardeşim derdi.');
        if (bayrak(d, 'kemalSecim') === 'sus') p.push('Geri çekiliyorsun. Köprüüstünde iki adam; arada bir pusula. Uzun bir sessizlik. Sonra Kemal elini uzatıp pusulaya değil, babasının eline dokunuyor.');
        p.push(
          tam
            ? 'Kemal tayfaya dönüp bağırıyor; sesi geminin bir ucundan öbürüne gidiyor: Merdivenleri indirin. Bütün filikaları suya. Bilet sormak yok. Ambarı boşaltın; ilaçlar kliniğe. Bir tayfa bir şey söyleyecek oluyor: Sir Henry... Kemal: Sir Henry\'yi ben hallederim.'
            : 'Kemal titreyen elleriyle pusulayı alıyor. Merdivenleri indirin, diyor tayfaya; yolcu alın. Ama sesi kararsız. Sir Henry\'nin kamarasına bakıyor ve oraya gitmiyor. Yirmi beş yıllık bir minnet, bir gecede ölmüyor.',
        );
        return p;
      },
      secenekler: [
        {
          etiket: 'Devam',
          etki: (d) => ({ bayrak: { kemalSonu: bayrak(d, 'kemalSecim') !== 'sus' || sayi(d, 'suleymanBag') >= 2 ? 'yolcu' : 'tereddut' } }),
          sonra: 'pendle21',
        },
      ],
    },
    pendle21: {
      ortam: 'ortam_kamara',
      baslik: 'Armatör kamarası',
      paragraflar: (d) => [
        bayrak(d, 'kemalSonu') === 'yolcu'
          ? 'Kemal kamaranın kapısını açıyor. İçeride, maun bir masanın başında, Sir Henry Pendle. Viyana\'daki kadar kırmızı yüzlü değil; solgun. Pencereden yanan kente bakıyor; elinde bir kadeh.'
          : 'Kamaranın kapısını Nermin açıyor; Kemal arkada, koridorda kalıyor. İçeride Sir Henry Pendle bir çantayı kapatıyor. Kıç tarafta bir motor bekliyor; makinesi çalışıyor.',
        'Pendle sizi görünce kadehini bırakıyor. Viyana\'dan hatırlıyorum, diyor; sesi kibar. Bir tüccar batan gemiden iner, demiştim. Bu kent batıyor. Ben de iniyorum. Bunda bir suç yok.',
        bayrak(d, 'nerminCevdet')
          ? 'Nermin cebinden bir şey çıkarıp masaya koyuyor. Bir atkı. Gri yünden, elle örülmüş, hiç takılmamış. Bunu ağabeyime ördüm, diyor. Erzurum\'a. On Dört\'te. Paltosunun astarı yoktu. Pendle atkıya bakıyor; anlamıyor. Anlamasını beklemiyorum, diyor Nermin. Bilmeni istiyorum.'
          : 'Nermin bir adım öne çıkıyor. Dört yıldır bir isim arıyordum, diyor. Paltoları kim dikti, kim sattı, kim taşıdı. Hep bir gölge. Sen bir gölgesin, Sir Henry. Ama bu gece gölgenin bir adı var.',
        bayrak(d, 'nerminYemin') === 'birlikte'
          ? 'Nermin sana bakıyor. Yalnız yapmayacağım demiştim, diyor. Ne yapalım?'
          : bayrak(d, 'nerminYemin')
            ? 'Nermin sana bakıyor. Ankara\'da matbaada bir söz verdik, diyor bakışı.'
            : 'Nermin sana bakıyor. Ne yapacağız?',
      ],
      secenekler: [
        { etiket: 'Sözümüz gibi: gazeteye. Defter de, liste de, ilaçlar da.', kosul: (d) => bayrak(d, 'nerminYemin') === 'gazete', etki: (d) => pendleEtki(d, 'gazete', 1), sonra: 'kalkis' },
        { etiket: 'Gazeteye. Herkes okusun.', kosul: (d) => bayrak(d, 'nerminYemin') !== 'gazete', etki: (d) => pendleEtki(d, 'gazete', 0), sonra: 'kalkis' },
        { etiket: 'Sözümüz gibi: bir hâkimin önüne. Kâğıtlarıyla.', kosul: (d) => bayrak(d, 'nerminYemin') === 'mahkeme', etki: (d) => pendleEtki(d, 'mahkeme', 1), sonra: 'kalkis' },
        { etiket: 'Bir hâkimin önüne. Kâğıtlarıyla.', kosul: (d) => bayrak(d, 'nerminYemin') !== 'mahkeme', etki: (d) => pendleEtki(d, 'mahkeme', 0), sonra: 'kalkis' },
      ],
    },
    kalkis: {
      ortam: 'ortam_kordon',
      efekt: 'vapur_duduk',
      baslik: '16 Eylül, şafak',
      paragraflar: (d) => {
        const ps = bayrak(d, 'pendleSonu');
        return [
          ps === 'gazete'
            ? 'Nermin Pendle\'in defterini ve Fenwick\'in listesini bir Amerikan muhripindeki gazetecilere götürüyor. Üç gün sonra New York\'ta, Londra\'da, Atina\'da aynı başlık: Yanan kentten bilet satan armatör. Pendle Shipping\'in sigortacıları sözleşmeleri bir hafta içinde feshediyor.'
            : ps === 'mahkeme'
              ? 'Kemal, Pendle\'i defteriyle birlikte İngiliz başkonsolosluğunun filikasına teslim ediyor. İngiliz tebaası, diyor Rıza Bey; kendi mahkemesi yargılasın. Kâğıtlar tam. Konsolos yüzünü buruşturuyor ama imzalıyor. Pendle Londra\'ya gidecek; bir hâkimin önüne.'
              : ps === 'kacti_gazete'
                ? 'Pendle kıç taraftaki motorla karanlığa kaçıyor. Ama defteri masada kaldı. Nermin onu Amerikan gazetecilerine götürüyor. Pendle bir yerde, bir başka limanda; ama adı artık her limanda biliniyor.'
                : 'Pendle kıç taraftaki motorla karanlığa kaçıyor. Rıza Bey defteri alıyor; konsolosluğa, sonra Londra\'ya gidecek. Bir mahkeme bir gün onu çağıracak. Ne zaman, kimse bilmiyor.',
          bayrak(d, 'kemalSonu') === 'yolcu'
            ? 'Arethusa bütün gece filika indiriyor. Bilet sormadan; ad sormadan. Dokuz yüz kişi. Ambar boşaldı; Kızılhaç\'ın kırk sandığı kayıklarla Eleni\'nin kliniğine gitti. Gemi sabah Pire\'ye kalkıyor; köprüüstünde Kemal Reis.'
            : 'Arethusa yolcu alıyor, ama yavaş; tayfa Kemal\'e değil, Pendle\'in bıraktığı emirlere bakıyor. Üç yüz kişi. Kızılhaç\'ın sandıklarının yarısı kayıklara iniyor; yarısı ambarda kalıyor.',
          'Eleni iskelede, önlüğü kurum içinde. Cemil Bey\'in yanına geliyor. ' +
            (bayrak(d, 'cemilRapor') === 'sitma'
              ? 'Yannis bana Kostas\'ı anlattı, diyor. Cemil Bey başını eğiyor. Biliyorum, diyor. Her gün biliyorum. Eleni elini onun eline koyuyor: Ben de bir kez imzaladım, Cemil. On Dokuz\'da. Hepimizin bir sayısı var.'
              : bayrak(d, 'cemilRapor')
                ? 'Yannis bana senin raporunu anlattı, diyor. Bütün Atina hastanesine anlattı. Cemil Bey gülümsüyor; yorgun. Bir tanesi daha olmadı, diyor. Bunu sana söylemek istiyordum.'
                : 'Paris\'teki amfiyi hatırlıyor musun, diyor. Cemil Bey gülümsüyor.') +
            ' Eleni hastalarıyla birlikte Arethusa\'ya biniyor. Bir gün Selanik\'te kahve, diyor. Cemil Bey: Bir gün.',
          bayrak(d, 'cocukKarar') === 'yanina'
            ? 'Neslihan iskelede, kucağında uyuyan kızla. Kız uyanıyor, gemiye bakıyor, sonra Neslihan\'ın boynuna sarılıyor. Ayva kalıyor.'
            : 'İskelede, kalabalığın içinde, yaşlı bir kadın ve elini tutan küçük bir kız Arethusa\'nın filikasına biniyor. Kız Neslihan\'a el sallıyor. Ay-va, diye bağırıyor.',
          'Süleyman Kaptan iskelede kalıyor. Kemal köprüüstünden ona bakıyor. Dönersin, diyor Süleyman; bir soru değil. Kemal pusulayı havaya kaldırıyor. İbre, Süleyman\'ın sonradan söylediğine göre, o sabah tam kuzeyi değil, rıhtımı gösteriyordu.',
        ];
      },
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_kordon',
      ortamOran: 0.45,
      baslik: 'Yirmi birinci bölüm bitti',
      paragraflar: ['Kararların kaydedildi. Sıradaki: Kasım 1922. Bir barış masası kuruluyor; ve Pendle Shipping\'in defterinde hâlâ okunmamış bir sayfa var.'],
      secenekler: [{ etiket: 'Yirmi ikinci bölüme geç', sonrakiBolum: 'bolum22' }, { etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    kordon21: {
      ad: 'Kordon',
      ortam: 'ortam_kordon',
      tarif: 'Taş rıhtım baştan sona insanla dolu. Bohçalar, yorganlar, kağnılar, bir dikiş makinesi. Körfezde savaş gemileri ve Arethusa. Rıhtımın ortasında Pendle Shipping\'in masası.',
      nesneler: [
        {
          id: 'durbun',
          etiket: 'Süleyman Kaptan\'ın dürbünü',
          kosul: (d) => !delilVar(d, 'suvari'),
          incele: 'Süleyman Kaptan Kordon\'un ucunda, bir babanın yanında, dürbünüyle Arethusa\'ya bakıyor.',
          etki: { sahne: 'kopru' },
        },
        {
          id: 'acente',
          etiket: 'Acentenin masası',
          incele: (d) =>
            delilVar(d, 'ajan_defteri')
              ? 'Fenwick bir kadına başını sallıyor: Hayır. Altın yoksa hayır.'
              : 'İnce bıyıklı bir İngiliz, Fenwick, masanın arkasında. Önünde bir terazi, bir defter. Nermin kuyruğa giriyor; sıra ona gelince Fransızca bir gazeteci kartı uzatıyor ve defteri ters çevirip okuyor. Beş altın, kişi başı. Çocuk üç. Altın getiremeyenin adının karşısında tek kelime: hayır. Ambar listesinde kırk sandık "kurtarılmış mal". Fenwick defteri kapatıp onu kuyruktan çıkarıyor; ama Nermin\'in hafızası iyidir.',
          etki: (d) => (delilVar(d, 'ajan_defteri') ? null : { delil: ['ajan_defteri'] }),
        },
      ],
      kisiler: ['cocuk21', 'neslihan', 'riza', 'nermin'],
      gecisler: [{ hedef: 'klinik21', etiket: 'Basmane\'ye, Dr. Eleni\'nin kliniğine git' }],
    },
    klinik21: {
      ad: 'Dr. Eleni\'nin kliniği',
      ortam: 'ortam_hastane',
      tarif: 'Basmane\'deki eski konak. Avlu yaralılarla dolu; kimin nereli olduğunu kimse sormuyor. Duvardaki Kızılhaç bayrağı kurumdan kararmış.',
      nesneler: [],
      kisiler: ['eleni', 'cemil'],
      gecisler: [{ hedef: 'kordon21', etiket: 'Kordon\'a dön' }],
    },
  },

  kisiler: {
    cocuk21: {
      ad: 'Sandığın üstündeki kız',
      kosul: (d) => !bayrak(d, 'cocukKarar'),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Altı yedi yaşlarında bir kız, bir sandığın üstünde. Ayakkabısının biri yok. Kendi kendine bir ninni mırıldanıyor.',
          secenekler: [{ etiket: 'Neslihan\'ı çağır.', etki: { sahne: 'cocuk' } }],
        },
      },
    },
    neslihan: {
      ad: 'Neslihan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'cocukKarar') === 'yanina'
              ? 'Neslihan kızın saçını örüyor. Annem benimkini böyle örerdi, diyor. Üç parmak, sıkı.'
              : 'Neslihan kalabalığa bakıyor. Selanik\'te, On İki\'de, bir çadırın önünde ben de böyle oturuyordum, diyor. Kimse bana nereli olduğumu sormamıştı. Sadece aç mısın demişlerdi.',
          secenekler: [{ etiket: 'Hadi.' }],
        },
      },
    },
    riza: {
      ad: 'Rıza Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Rıza Bey bastonuna dayanmış, acentenin masasını izliyor. O adam altını tartıyor, diyor. Terazisi var. İnsanı tartan terazi. Kırk yıl polislik ettim; böyle bir terazi görmedim.',
          secenekler: [{ etiket: 'Görmeyeceksin de.' }],
        },
      },
    },
    nermin: {
      ad: 'Nermin',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'nerminCevdet')
              ? 'Nermin cebine dokunuyor. Atkıyı getirdim, diyor. Neden bilmiyorum. Çekmecede kalmasın istedim.'
              : 'Nermin defterine bir şeyler yazıyor. Bu rıhtımı birinin yazması lazım, diyor. Herkes kendi tarafını yazacak. Ben rıhtımı yazacağım.',
          secenekler: [{ etiket: 'Yaz Nermin.' }],
        },
      },
    },
    eleni: {
      ad: 'Dr. Eleni Mavrou',
      giris: (d) => (delilVar(d, 'eleni_tanikligi') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Eleni bir yaralının sargısını değiştiriyor. Saçı bembeyaz olmuş; üç yılda. Cemil Bey\'i görünce elindeki makası bırakmıyor; başıyla selam veriyor. Sargı bezi kalmadı, diyor. Morfin kalmadı. Kızılhaç\'ın kırk sandığı vardı limanda.',
          secenekler: [
            {
              etiket: 'Sandıklara ne oldu?',
              etki: { delil: ['eleni_tanikligi'] },
              sonra: 'sonra',
              cevap: 'Eleni makası bırakıyor. Dün liman deposundan alındılar, diyor. Sahipsiz mal diye. Bir İngiliz acentenin kâğıdıyla. Arethusa\'ya yüklendiler. Pire\'de satacaklar; orada da yaralı çok, fiyat iyi. Bunu bana bir hamal söyledi; Kadir. Hatırlıyor musunuz? On Dokuz\'da kolunu sardığım. Şimdi o benim kolum.',
            },
          ],
        },
        sonra: {
          soz: 'Eleni bir çocuğun alnına bez koyuyor. Bir hekim taraf seçmez, diyor. Ama bu hafta herkes benden taraf seçmemi istiyor. Ben de hastayı seçiyorum.',
          secenekler: [{ etiket: 'Doğru seçiyorsun.' }],
        },
      },
    },
    cemil: {
      ad: 'Cemil Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'cemilYuk')
              ? 'Cemil Bey Eleni\'nin yanında, kollarını sıvamış. Ona Kostas\'ı anlatmadım, diyor sana. Anlatmam gerek. Ama Eleni\'nin gözüne bakınca dilim tutuluyor.'
              : 'Cemil Bey Eleni\'nin yanında, kollarını sıvamış. Paris\'te bu kadın bana dikiş atmayı öğretti, diyor. Ben de ona Türkçe küfür. İkimiz de iyi öğrendik.',
          secenekler: [{ etiket: 'Kolay gelsin Cemil Bey.' }],
        },
      },
    },
  },
};
