// Dokuzuncu bölüm: "Imperial". Viyana, 12-16 Ocak 1919.
// İmparatorluk çökmüş, şehir aç ve soğuk. Kanatlı Anahtar'ın ileri gelenleri 15 Ocak'ta Hotel Imperial'de toplanıyor.
// Yeni oynanış: kıt bir takas malı (Saltiel'in iki paket tütünü). Para değersiz; tütün kapı açar.
// Örgütün başı Viktor Rainer görünür. Delorme gözden düşer. Defterin kaderi oyuncunun kararı.
// Arka plan (gerçek): Kasım 1918'de Alman-Avusturya Cumhuriyeti ilan edildi; 1918-19 kışında Viyana'da açlık,
// kömür kıtlığı ve grip vardı; Paris Barış Konferansı 18 Ocak 1919'da açıldı. Hotel Imperial ve Café Central gerçek
// mekânlardır; içlerinde geçen olaylar ve bütün kişiler (Rainer, Kessler, Josef, Frau Gruber) KURGUDUR.
import { BOLUM8 } from './bolum8';
import { bayrak, cikarimVar, delilVar, sayi } from '../oyun/motor';

const yanimda = (d, kim) => !!bayrak(d, 'ekip_' + kim);
const cevirmen = (d) => (yanimda(d, 'nermin') ? 'Nermin' : yanimda(d, 'cemil') ? 'Cemil Bey' : 'Neslihan');

export const BOLUM9 = {
  id: 'bolum9',
  ad: 'Dokuzuncu bölüm: Imperial',
  baslangic: 'acilis',
  ilkMekan: 'pansiyon',

  deliller: {
    ...BOLUM8.deliller,
    rainer_bilgi: { ad: 'Viktor Rainer', tarif: 'Bankhaus Rainer und Söhne. Savaş boyunca bütün tarafların tahvillerini satmış bir Viyana bankası. Sahibi Viktor Rainer: yetmiş yaşında, hayırsever, opera locası, hiç fotoğraf vermez. Dört imparatorluk battı; bankası büyüdü.' },
    toplanti_yeri: { ad: 'Kırmızı Salon', tarif: 'Hotel Imperial\'in birinci katındaki Kırmızı Salon, 15 Ocak akşamı Bankhaus Rainer adına on iki kişilik bir akşam yemeğine ayrılmış.' },
    delorme_odasi: { ad: 'Otelin defteri', tarif: 'Oda 112: Mösyö L. Laval, Lyon. Ve aynı kişinin ayırttığı ikinci bir oda, 14-16 Ocak: Madame N. Rivière. Neslihan\'ın gelmesini bekliyorlar.' },
    sahte_defter: { ad: 'Sahte defter', tarif: 'Neslihan\'ın bir gecede, kendi el yazısıyla yazdığı ikinci bir defter. Gerçek isimler yerine ölülerin, hapistekilerin ve hiç var olmamışların adları. Siyakatı okuyabilecek kimse kalmadı; Rainer bile.' },
  },

  cikarimlar: {
    ...BOLUM8.cikarimlar,
    buyuk_usta: {
      a: 'rainer_bilgi',
      b: 'siyakat_okundu',
      ad: 'R.',
      metin: 'Hafız Efendi\'nin okuduğu defterde her ödemenin son durağı tek bir harf: R. Rivière değil; onun da yukarısı. Bankhaus Rainer. Kanatlı Anahtar\'ın başı, Viyana\'da opera locasında oturan yaşlı bir hayırsever.',
    },
    tuzak: {
      a: 'delorme_odasi',
      b: 'viyana_ipucu',
      ad: 'Tuzak',
      metin: 'Delorme Laval adıyla burada. Ve Neslihan için bir oda ayırtmış. Toplantı yalnızca bir toplantı değil: Neslihan\'ı ve defteri geri almak için kurulmuş bir tuzak. Gelmesini bekliyorlar. Geleceğini biliyorlar.',
    },
  },

  olaylar: [
    {
      id: 'plan',
      kosul: (d) => cikarimVar(d, 'buyuk_usta') && cikarimVar(d, 'tuzak') && delilVar(d, 'toplanti_yeri'),
      etki: { mekan: 'pansiyon', sahne: 'plan' },
    },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Dokuzuncu bölüm bitti.' },
    { kosul: (d) => !delilVar(d, 'toplanti_yeri') || !delilVar(d, 'rainer_bilgi'), metin: 'Café Central\'de gazeteci Franz Kessler\'i bul. Toplantıyı ve Rainer\'i sor.' },
    { kosul: (d) => !delilVar(d, 'delorme_odasi'), metin: 'Hotel Imperial\'in resepsiyonuna Neslihan\'la git.' },
    { kosul: () => true, metin: 'Bulduklarını soruşturma panosunda birleştir. İstersen mutfağa da bak: içeri girmenin başka yolları olabilir.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_viyana',
      efekt: ['tramvay'],
      baslik: '12 Ocak 1919, Viyana',
      paragraflar: (d) => [
        'Belgrad, Budapeşte, sonra karla örtülü ovalar. Dört gün trende. Her istasyonda başka bir bayrak, başka bir pasaport memuru, başka bir para.',
        bayrak(d, 'babaTanidi')
          ? 'Baban Manastır\'da, Yusuf\'un dükkânının üstünde kaldı. Giderken elini tuttu: Dön, oğul, dedi. Sana anlatacaklarım var.'
          : 'Baban Manastır\'da, Yusuf\'un dükkânının üstünde kaldı. Giderken sana kibarca teşekkür etti; hâlâ kim olduğunu bilmeden.',
        'Viyana Doğu İstasyonu. Bir imparatorluğun başkentiydi; şimdi altı milyonluk bir devletin aç başkenti. Peronlarda bacağı olmayan askerler, ekmek kuyruğunda yaşlı kadınlar. Sarayların pencerelerinde ışık yok; kömür yok.',
        'Neslihan yakasını kaldırıyor. Burada yaşadım, diyor. İki kış. Rivière bana opera ve dört dil öğretti; Viyana\'nın her sokağını. Şimdi bu sokaklar bana yabancı.',
        'Cebinde, Selanik\'te Saltiel Efendi\'nin yolluk diye verdiği iki paket tütün. Yolda öğrendin: burada kronun değeri yok. Tütün, kahve, un. Kapıları bunlar açıyor.',
        bayrak(d, 'saltielDavid') === 'anlat'
          ? 'Paketlerden birinin arasında katlanmış ince bir kâğıt var; trende fark ettin. Saltiel\'in el yazısı: David\'in defterinden kopya. On yedi ad. On birincisi: Neslihan, İsmail kızı, Manastır. Altına Saltiel bir satır eklemiş: Onu buldun. Ötekiler de birinin kardeşiydi.'
          : '',
        'Josefstadt\'ta, Frau Gruber\'in pansiyonu. Toplantıya üç gün var.',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Pansiyona yerleş',
          kosul: (d) => bayrak(d, 'saltielDavid') !== 'anlat',
          etki: { mekan: 'pansiyon', bayrak: { 'gorüldü_pansiyon': true, tutun: 2 } },
        },
        {
          etiket: 'Kâğıdı Neslihan\'a ver. Bu onun da listesi.',
          kosul: (d) => bayrak(d, 'saltielDavid') === 'anlat',
          etki: { mekan: 'pansiyon', bayrak: { 'gorüldü_pansiyon': true, tutun: 2, davidNotu: 'verdi' } },
        },
        {
          etiket: 'Kâğıdı cüzdanına koy. Ona şimdi bu yük verilmez.',
          kosul: (d) => bayrak(d, 'saltielDavid') === 'anlat',
          etki: { mekan: 'pansiyon', bayrak: { 'gorüldü_pansiyon': true, tutun: 2, davidNotu: 'sakla' } },
        },
      ],
    },
    asker: {
      ortam: 'ortam_viyana',
      baslik: 'İsonzo',
      paragraflar: [
        'Paketi uzatıyorsun. Adam bir an bakıyor; sonra tek eliyle alıp göğsüne bastırıyor.',
        'İsonzo, diyor Almanca; parmağıyla boş paçasını gösteriyor. On ikinci muharebe. Sonra sana bakıyor: Sen? Sen de mi?',
        'Gelibolu, diyorsun. Anlamıyor; ama başını sallıyor. Anlıyor.',
      ],
      secenekler: [{ etiket: 'Devam' }],
    },
    plan: {
      ortam: 'ortam_oda',
      baslik: '15 Ocak, akşamüstü',
      paragraflar: (d) => [
        'Frau Gruber\'in mutfağında, soğuk sobanın başında. Masada otelin krokisi, Kessler\'in notları, deri defter.',
        'Neslihan pencerenin önünde. Beni bekliyorlar, diyor. O zaman gideyim. Madam N. olarak. Rivière\'in kızı, defterle, mirasıyla. Kimse benden şüphelenmez; çünkü beni onlar yarattı.',
        sayi(d, 'neslihanBag') >= 3
          ? 'Sesi titremiyor. Sana bakıyor: Bana güven, abi. Bir kere.'
          : 'Sesi sakin; ama ellerini sıktığını görüyorsun.',
        yanimda(d, 'riza')
          ? 'Rıza Bey başını sallıyor. Tuzağa yem olmak, diyor. Bazen tek yol budur. Ama yemin arkasında biri durmalı.'
          : 'Cemil Bey gözlüğünü siliyor. Bir ameliyatta bir kez kesersin, diyor. Doğru yerden. Nereden keseceğiz?',
      ],
      secenekler: [
        { etiket: 'Neslihan Madam N. olarak girsin; biz yakında olalım.', etki: { bayrak: { yol9: 'neslihan' }, artir: { neslihanBag: 1 } }, sonra: 'toplanti' },
        { etiket: 'Garson kılığında ben gireyim.', kosul: (d) => bayrak(d, 'garson'), etki: { bayrak: { yol9: 'garson' } }, sonra: 'toplanti' },
        { etiket: 'Yemek asansöründen dinleyelim.', kosul: (d) => bayrak(d, 'asansorBulundu'), etki: { bayrak: { yol9: 'asansor' } }, sonra: 'toplanti' },
      ],
    },
    toplanti: {
      ortam: 'ortam_kosk_ic',
      baslik: 'Kırmızı Salon',
      paragraflar: (d) => {
        const yol = bayrak(d, 'yol9');
        return [
          yol === 'neslihan'
            ? 'Neslihan kırmızı kadife bir kapıdan giriyor. Sen mutfak koridorunda, aralık bir servis kapısının ardındasın; kalbin kulaklarında.'
            : yol === 'garson'
              ? 'Siyah ceket, beyaz önlük, elinde bir gümüş tepsi. Josef\'in ödünç ceketi omuzlarından dar. Kırmızı Salon\'a giriyorsun; kimse bir garsona bakmaz.'
              : 'Mutfağın arkasında, yemek asansörünün boşluğuna kulağını dayamışsın. Yukarıdan sesler iniyor; tabakların, kadehlerin, insanların sesi.',
          'On iki kişi. Bir İtalyan, iki İngiliz, bir Macar kontu, bir Alman sanayici, bir İstanbul tüccarı. Masanın başında, ak saçlı, beyaz eldivenli, yetmiş yaşlarında bir adam: Viktor Rainer. Yanında, sol eli sargılı, Lucien Delorme.',
          'Rainer yumuşak bir sesle konuşuyor. Baylar, diyor. Avrupa dört imparatorluğu gömdü. Herkes savaşın bittiğini sanıyor. Bitmedi; yalnızca dağıldı. Kafkasya. Balkanlar. Anadolu. Paris\'te Yunanlılara İzmir\'i vaat edecekler; ilkbaharda. Türkler direnecek. Biz herkese satacağız. Ateş, baylar, ancak odun atılırsa yanar.',
          yol === 'neslihan'
            ? 'Neslihan masaya yürüyor. Rainer ayağa kalkıp elini öpüyor. Kızımız, diyor. Gaston\'un mirası. Defter sizde mi? Neslihan gülümsüyor: Sende değil, Delorme\'un elinde olmadığı için. Babamı öldüren adamla aynı masaya oturmam, Mösyö Rainer. Önce onun hesabını görün. Salonda bir sessizlik. Delorme\'un yüzü bembeyaz.'
            : yol === 'garson'
              ? 'Delorme\'un kadehine şarap dolduruyorsun. Elin titremiyor. Delorme kadehi kaldırırken duruyor; burnu kıpırdıyor. Mangal kömürü ve kalay, diyor yavaşça. Ne tuhaf. Bir Viyana garsonundan Manastır kokusu geliyor. Ve yüzünü sana çeviriyor.'
              : 'Asansörün halatı gıcırdıyor. Yukarıda biri susuyor. Sonra Delorme\'un sesi: Bu otelin yemek asansörleri de İstanbul\'dakiler gibi mi, Viktor? Dinleyenler için çok kullanışlı.',
          'Rainer kadehini bırakıyor. Mösyö Demir, diyor; sesini hiç yükseltmeden. Ya da Arif Bey. Lütfen. Gelin. Bir yemek bir kişi eksik.',
        ];
      },
      secenekler: [{ etiket: 'Devam', sonra: 'teklif' }],
    },
    teklif: {
      ortam: 'ortam_kosk_ic',
      baslik: 'Teklif',
      paragraflar: (d) => [
        'Rainer\'in karşısında oturuyorsun. Neslihan yanında. Delorme ayakta, pencerenin önünde, sargılı elini ovuşturuyor.',
        'Rainer kendi eliyle sana bir kadeh dolduruyor. Babanızı tanırdım, diyor. Usta İsmail. Bütün Makedonya\'da kalıp döken ondan iyisi yoktu. 1908\'de ona küçük bir iş verdik. Ne olduğunu biliyor muydu? Bunu ona sorun. Belki söyler.',
        'Defteri istiyorum, diyor. Karşılığında: kız kardeşiniz özgür. Kimse onu aramaz. Babanız huzur içinde ölür. Siz de İstanbul\'a dönüp bir kahvehane açarsınız. Yoksa… Gülümsüyor. Lucien\'in sabrı benimkinden az.',
        yanimda(d, 'riza')
          ? 'Rıza Bey kulağına eğiliyor: Pazarlık eden adam korkan adamdır. Bu adam defterden korkuyor.'
          : yanimda(d, 'nermin')
            ? 'Nermin masanın altından dizine dokunuyor: Bir gazeteci olarak söylüyorum, diye fısıldıyor. Bu adam isimlerin basılmasından korkuyor.'
            : 'Cemil Bey sessiz. Ama gözleri Rainer\'in titreyen eldivenli elinde.',
      ],
      secenekler: [
        {
          etiket: 'Neslihan\'ın yazdığı sahte defteri uzat.',
          kosul: (d) => delilVar(d, 'sahte_defter'),
          etki: { bayrak: { teklifSonu: 'sahte' } },
          sonra: 'sahte_sonu',
        },
        { etiket: 'Reddet.', etki: { bayrak: { teklifSonu: 'red' } }, sonra: 'red_sonu' },
      ],
    },
    // Derinleştirme: Arif ile Neslihan'ın ilk gerçek konuşması. Birinci bölümdeki arifNeden burada sınanır.
    kardes_gecesi: {
      ortam: 'ortam_oda',
      ortamOran: 0.4,
      baslik: 'Josefstadt, gece',
      paragraflar: [
        'Gece yarısı. Soba söndü; Frau Gruber\'in kömürü haftada iki gün yetiyor. Neslihan battaniyesine sarılmış, pencerenin önünde oturuyor. Camdaki buz çiçeklerine parmağıyla bir şey çiziyor: bir ağaç.',
        'Ayva, diyorsun. Gülümsüyor ama dönüp bakmıyor.',
        'Selanik\'te çadırda bir kış geçirdik, diyor. Annem yoktu artık. Babam seni aramaya gitmişti. Sonra adamlar geldi; okul, yemek, sıcak oda dediler. Gittim. On yedi yaşındaydım ve açtım, abi. Bunu kimseye söylemedim: açtım.',
        'Mösyö Rivière beni Paris\'e götürdü. Kâğıtlarda onun soyadını taşıdım. Fransızca öğrendim, Almanca, piyano. Hiç dokunmadı bana; hiç sesini yükseltmedi. Akşamları Montaigne okurdu. Bilmiyorum, derdi; benim bildiğim tek şey bilmediğim.',
        'İlk yıl her gün limana indim. Selanik\'ten gelen her vapurun yolcularına baktım. İkinci yıl haftada bir. Üçüncü yıl Çanakkale haberleri geldi; gazetelerin ölü listelerinde adını aradım. Bulamadım. Bulamayınca öldüğüne karar verdim. Öyle daha kolaydı.',
        'Şimdi dönüp sana bakıyor. Gözlerinde ağlamayan birinin kuruluğu var.',
        'Sen beni aradın mı abi?',
      ],
      secenekler: [
        {
          etiket: 'Hayır. Öldün dediler, inandım. Senin yaptığının aynısını yaptım.',
          kosul: (d) => bayrak(d, 'arifNeden') === 'inandim',
          etki: { bayrak: { kardesGecesi: 'durust' }, artir: { neslihanBag: 1 } },
          sonra: 'kardes_durust',
        },
        {
          etiket: 'Hayır. Bulursam beni tanımazsın diye korktum.',
          kosul: (d) => bayrak(d, 'arifNeden') === 'korktum',
          etki: { bayrak: { kardesGecesi: 'durust' }, artir: { neslihanBag: 1 } },
          sonra: 'kardes_durust',
        },
        {
          etiket: 'Hayır. Sizi orada bıraktığımı kabul edemedim.',
          kosul: (d) => bayrak(d, 'arifNeden') === 'sucluluk',
          etki: { bayrak: { kardesGecesi: 'durust' }, artir: { neslihanBag: 1 } },
          sonra: 'kardes_durust',
        },
        {
          etiket: 'Hayır. Aramadım.',
          kosul: (d) => !bayrak(d, 'arifNeden'),
          etki: { bayrak: { kardesGecesi: 'durust' }, artir: { neslihanBag: 1 } },
          sonra: 'kardes_durust',
        },
        {
          etiket: 'Aradım. Ama her yer yanmıştı, kimse bir şey bilmiyordu.',
          etki: { bayrak: { kardesGecesi: 'yalan' } },
          sonra: 'kardes_yalan',
        },
        {
          etiket: 'Bir şey söyleme. Battaniyenin ucunu onun omzuna çek.',
          etki: { bayrak: { kardesGecesi: 'sessiz' } },
          sonra: 'kardes_sessiz',
        },
      ],
    },
    kardes_durust: {
      ortam: 'ortam_oda',
      ortamOran: 0.4,
      baslik: 'İki mezar',
      paragraflar: [
        'Neslihan uzun süre bir şey demiyor. Sonra gülüyor; kısa, şaşkın bir gülüş.',
        'Demek ikimiz de birbirimizin mezarına dua ettik, diyor. Sen İstanbul\'da, ben Paris\'te. Aynı yıllarda. Belki aynı gecelerde.',
        'Kızmam gerekirdi sana, diyor. Kızamıyorum. Çünkü ben de aramadım. Herkes kızılacak birini arıyor abi; ben kızacak kimse bulamıyorum. Rivière\'e bile.',
        'Battaniyenin yarısını sana uzatıyor. Pencerenin önünde, iki çocuk gibi, sabaha kadar oturuyorsunuz. Konuşmadan. Camdaki ayva ağacı yavaş yavaş eriyor.',
      ],
      secenekler: [{ etiket: 'Devam' }],
    },
    kardes_yalan: {
      ortam: 'ortam_oda',
      ortamOran: 0.4,
      baslik: 'Kulak',
      paragraflar: [
        'Neslihan sana bakıyor. Sonra elini uzatıp sol kulağına dokunuyor.',
        'Babam yalan söyleyince kulağı kızarırdı, diyor. Seninki de kızarıyor. Hep kızarırdı; ayvaları sen yedin ben değil derken de.',
        'Gülümsüyor ama gözleri gülmüyor. Peki, diyor. Aradın. Teşekkür ederim.',
        'Battaniyesine sarılıp yatağına dönüyor. Sen pencerenin önünde kalıyorsun. Camdaki ayva ağacı yavaş yavaş eriyor; kimse yenisini çizmiyor.',
      ],
      secenekler: [{ etiket: 'Devam' }],
    },
    kardes_sessiz: {
      ortam: 'ortam_oda',
      ortamOran: 0.4,
      baslik: 'Battaniye',
      paragraflar: [
        'Battaniyenin ucunu omzuna çekiyorsun. Neslihan bir an kaskatı kalıyor; sonra başını omzuna yaslıyor.',
        'Cevap vermedin, diyor. Cevabı biliyorum zaten. Ama sormam gerekiyordu; altı yıldır soruyordum. Şimdi sustum. Sen de bir gün söylersin.',
        'Sabaha kadar öyle kalıyorsunuz. Söylenmemiş cümle, odanın içinde üçüncü bir kişi gibi oturuyor.',
      ],
      secenekler: [{ etiket: 'Devam' }],
    },
    sahte_defter: {
      ortam: 'ortam_oda',
      baslik: 'Bir gecelik iş',
      paragraflar: [
        'Neslihan gece boyunca mum ışığında yazıyor. Gerçek defterin yanına boş bir defter açıyor; aynı deri, aynı mürekkep, aynı el.',
        'Siyakat, diyor; kalemi hiç durmadan. Bu yazıyı okuyabilen kimse kalmadı. Rivière bana bu yüzden öğretti. Ben yazdım, ben okurum. Rainer okuyamaz; yalnızca bana inanır.',
        'Sabaha karşı bitiriyor. Gerçek isimlerin yerine ölüler, hapistekiler, hiç var olmamış insanlar. Mürekkebi kurusun diye sobanın yanına koyuyor.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { delil: ['sahte_defter'] } }],
    },
    sahte_sonu: {
      ortam: 'ortam_viyana',
      efekt: ['tramvay'],
      baslik: 'Ringstraße',
      paragraflar: [
        'Rainer defteri açıyor; sayfaları çeviriyor. Siyakatı okuyamıyor; ama Neslihan\'ın yazısını tanıyor. Başını sallıyor. Bir centilmen, diyor. Gidebilirsiniz.',
        'Delorme bir şey söylemek istiyor; Rainer eliyle susturuyor. Lucien, diyor. İki kez başaramadın. Artık bu iş seninle değil.',
        'Otelden çıkıyorsunuz. Ringstraße karlı, karanlık. Neslihan koluna giriyor. Bir hafta, diyor. En çok bir hafta sonra sahte olduğunu anlar. Ama o hafta bizim.',
        'Arkanızda koşan adımlar. Delorme. Elinde bıçak; yüzü öfkeden çarpılmış. Sen bana her şeyimi aldın, diye bağırıyor. Bir tramvay çan çalarak aranızdan geçiyor. Vagon geçtiğinde Delorme yok. Karda yalnızca ayak izleri.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { delormeKovuldu: true } }, sonra: 'defter_karari' }],
    },
    red_sonu: {
      ortam: 'ortam_viyana',
      efekt: ['tramvay'],
      baslik: 'Ringstraße',
      paragraflar: (d) => [
        'Hayır, diyorsun. Defter, satın aldığınız her insanın adı. Bir gün hepsi okunacak.',
        'Rainer iç çekiyor. Yazık, diyor. Babanız da hayır demişti. 1912\'de. Selanik\'e gelip bana hesap sordu. Ve Manastır\'a dönünce… Omuz silkiyor. Lucien, beyleri geçirir misin?',
        'Delorme sizi otelin arka kapısına kadar geçiriyor. Ringstraße karanlık, karlı, bomboş. Bıçağı çıkarıyor.',
        bayrak(d, 'yaraKol')
          ? 'Sol kolun yine işe yaramıyor; Delorme\'un bıçağı paltonu yırtıp böğrüne iniyor. Sıcak bir şey akıyor.'
          : 'Bileğini yakalıyorsun; bıçak paltonu yırtıp böğrünü sıyırıyor.',
        'Neslihan bir çığlık atıyor. Bir tramvay çan çalarak üstünüze geliyor; Delorme\'u itiyorsun, ikiniz rayların iki yanına düşüyorsunuz. Vagon geçtiğinde Delorme yok. Karda kan ve ayak izleri.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { artir: { travma: 1 }, bayrak: { yaraBogur: true } }, sonra: 'defter_karari' }],
    },
    defter_karari: {
      ortam: 'ortam_oda',
      baslik: '16 Ocak, sabah',
      paragraflar: (d) => [
        'Frau Gruber\'in pansiyonu. ' + (bayrak(d, 'yaraBogur') ? (yanimda(d, 'cemil') ? 'Cemil Bey böğründeki yarayı dikiyor; on bir dikiş. Bıçak kaburgaya takılmış, diyor. Şanslısın.' : 'Frau Gruber böğründeki yarayı sarıyor; savaşta hemşirelik yapmış. Derin değil, diyor Almanca.') : 'Kimse uyumadı.'),
        'Masada deri defter. Rainer\'in, Delorme\'un, İstanbul\'dan Berlin\'e kadar satın alınmış yüzlerce insanın adı.',
        bayrak(d, 'teklifSonu') === 'sahte'
          ? 'Bir haftanız var. Sonra Rainer anlayacak.'
          : 'Rainer artık defterin sende olduğunu biliyor. Ve senin hayır dediğini.',
        'Neslihan sana bakıyor. Senin kararın, abi. Ben yeterince karar verdim.',
      ],
      secenekler: [
        {
          etiket: 'Fransızlara ver. Morin ve askerî heyet.',
          etki: { bayrak: { defterKarar: 'fransiz' } },
          sonra: 'son_fransiz',
        },
        {
          etiket: 'Kessler\'e ver. Bütün isimler gazetelerde basılsın.',
          etki: { bayrak: { defterKarar: 'gazete' } },
          sonra: 'son_gazete',
        },
        {
          etiket: 'Sakla. Bu defter bizim tek kalkanımız.',
          etki: { bayrak: { defterKarar: 'sakla' } },
          sonra: 'son_sakla',
        },
      ],
    },
    son_fransiz: {
      ortam: 'ortam_viyana',
      baslik: 'Fransız askerî heyeti',
      paragraflar: (d) => [
        bayrak(d, 'fransizBag')
          ? 'Yüzbaşı Morin Viyana\'daki Fransız heyetinde. Defteri alırken elleri titriyor. Bu, diyor, Paris\'te konferans masasına konacak. Size söz veriyorum.'
          : 'Fransız askerî heyetinde genç bir yüzbaşı defteri alıyor, bir makbuz yazıyor. Paris\'e gönderilecek, diyor. Konferans önemli konularla meşgul ama.',
        'Çıkarken Neslihan fısıldıyor: Paris\'te de Rainer\'in dostları var. Defter bir masaya konacak. Belki o masadan bir çekmeceye.',
        'Bir devlete güvendin. Hangi devlet, bir gün sana bunun hesabını sorar.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'telgraf9' }],
    },
    son_gazete: {
      ortam: 'ortam_kahve',
      baslik: 'Neue Freie Presse',
      paragraflar: (d) => [
        yanimda(d, 'nermin')
          ? 'Franz Kessler defteri bir sevgili gibi tutuyor. Üç gün, diyor. Nermin\'in İstanbul\'daki gazetesiyle aynı gün. Viyana\'da, İstanbul\'da, Paris\'te.'
          : 'Franz Kessler defteri bir sevgili gibi tutuyor. Üç gün, diyor. Viyana\'da, Paris\'te, ve bir telgrafla İstanbul\'da.',
        'Üç gün sonra Café Central\'de herkes aynı gazeteyi okuyor: Kanatlı Anahtar. Savaştan kâr edenlerin listesi. Bankhaus Rainer\'in önünde kalabalık.',
        'Ama listedeki her isim bir düşman demek. Ve bir düşman, bir gün kapını çalar.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { isimlerBasildi: true } }, sonra: 'telgraf9' }],
    },
    son_sakla: {
      ortam: 'ortam_oda',
      baslik: 'Kalkan',
      paragraflar: [
        'Defteri yağlı bir beze sarıp ceketinin astarına dikiyorsun. Sabri\'nin yaptığı gibi.',
        'Rainer bu defter sende oldukça sana dokunamaz, diyor Neslihan. Ama hep arkanı kollayacaksın. Ömür boyu.',
        'Bir kalaycının oğlusun. Kalay ince bir kattır. Kimse görmez. Ama zehri o tutar.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'telgraf9' }],
    },
    telgraf9: {
      ortam: 'ortam_oda',
      baslik: '18 Ocak 1919',
      paragraflar: (d) => [
        'Paris\'te barış konferansı bugün açıldı. Kazananlar dünyanın haritasını yeniden çiziyor.',
        'Frau Gruber kapıyı çalıyor; elinde bir telgraf. Manastır\'dan, Yusuf\'tan:',
        bayrak(d, 'babaTanidi')
          ? 'USTA AYAKTA STOP OĞLUM GELSİN DİYOR STOP KALIBIN HİKAYESİNİ ANLATACAKMIŞ STOP İSTANBULA BİRLİKTE DÖNECEKMİŞ STOP'
          : 'USTA UYANDI STOP ADINI SORDU ARİF DEDİM AĞLADI STOP KALIBIN HİKAYESİNİ ANLATACAKMIŞ STOP',
        'Neslihan telgrafı iki kez okuyor. Sonra katlayıp göğsüne koyuyor.',
        'İstanbul, diyorsun. Eve dönüyoruz. Hepimiz.',
        'Ama Rainer\'in sözleri kulağında: Paris\'te Yunanlılara İzmir\'i vaat edecekler. İlkbaharda. Ve Delorme bir yerde, karda ayak izleri bırakarak, yalnız, öfkeli, artık kimseye ait değil.',
        'Dokuzuncu bölümün sonu.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_oda',
      ortamOran: 0.5,
      baslik: 'Dokuzuncu bölüm bitti',
      paragraflar: ['Birinci kitap burada kapanıyor: Sudaki Adam\'dan Imperial\'e. Sıradaki: İstanbul, 1919 baharı. Kararların kaydedildi.'],
      secenekler: [{ etiket: 'Onuncu bölüme geç', sonrakiBolum: 'bolum10' }, { etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    pansiyon: {
      ad: 'Frau Gruber\'in pansiyonu',
      ortam: 'ortam_oda',
      tarif: 'Josefstadt\'ta dördüncü kat. Soğuk bir soba, buzlu camlar, duvarda siyah kurdeleli bir asker fotoğrafı. Ev sahibesi Frau Gruber, oğlunu İsonzo\'da kaybetmiş dul bir kadın; az konuşur, çok dinler.',
      nesneler: [
        {
          id: 'fotograf9',
          etiket: 'Duvardaki fotoğraf',
          incele: 'Genç bir asker, Avusturya-Macaristan üniforması, utangaç bir gülümseme. Altında: Franz Gruber, 1897-1917, Caporetto. Senin yaşında olacaktı.',
        },
        {
          id: 'masa9',
          etiket: 'Masadaki deri defter',
          incele: (d) =>
            delilVar(d, 'sahte_defter')
              ? 'İki defter yan yana: gerçeği ve Neslihan\'ın yazdığı. Kimse ayırt edemez.'
              : 'Deri defter. Neslihan yanına oturuyor, parmağını kendi baş harflerinin üstünde gezdiriyor. Bir fikrim var, diyor. Bunu ben yazdım. Bir kez daha yazabilirim. Yanlış isimlerle.',
          etki: (d) => (delilVar(d, 'sahte_defter') ? null : { bayrak: { sahteFikri: true } }),
        },
      ],
      kisiler: ['neslihan', 'gruber', 'cemil', 'nermin', 'riza'],
      gecisler: [{ hedef: 'ring', etiket: 'Sokağa çık' }],
    },
    ring: {
      ad: 'Ringstraße',
      ortam: 'ortam_viyana',
      tarif: 'İmparatorluğun büyük bulvarı. Opera, saraylar, parlamento; hepsi karanlık. Tramvaylar seyrek. Bir ekmek kuyruğu köşeyi dönüp gidiyor. Bir kapı eşiğinde, eski bir asker paltosuna sarılmış tek bacaklı bir adam.',
      nesneler: [
        {
          id: 'kuyruk',
          etiket: 'Ekmek kuyruğu',
          incele: 'Kadınlar, çocuklar, yaşlılar. Saatlerdir bekliyorlar. Bir kadın kucağındaki çocuğa şarkı söylüyor; sesi buhar olup uçuyor. Bu şehir dört yıl boyunca İstanbul\'un müttefikiydi. Şimdi ikisi de yenik.',
        },
      ],
      kisiler: ['asker'],
      gecisler: [
        { hedef: 'kahve', etiket: 'Café Central\'e git' },
        { hedef: 'lobi', etiket: 'Hotel Imperial\'e git' },
        { hedef: 'pansiyon', etiket: 'Pansiyona dön' },
      ],
    },
    kahve: {
      ad: 'Café Central',
      ortam: 'ortam_kahve',
      tarif: 'Yüksek tonozlar, mermer masalar, bambu çubuklara takılı gazeteler. Kahve diye arpa kavruluyor ama yine de herkes burada: gazeteciler, şairler, işsiz subaylar, satranççılar. Köşede, sigarasız bir piponun sapını çiğneyen zayıf bir adam: Franz Kessler.',
      nesneler: [
        {
          id: 'gazeteler',
          etiket: 'Gazeteler',
          incele: 'Neue Freie Presse: kömür tayınları, grip, Şubat\'taki seçimler, Paris\'teki konferansa hazırlık. Ekonomi sayfasında küçük bir haber: Bankhaus Rainer, aç çocuklar için bir hayır yemeği verecek. Fotoğraf yok.',
        },
      ],
      kisiler: ['kessler'],
      gecisler: [{ hedef: 'ring', etiket: 'Sokağa çık' }],
    },
    lobi: {
      ad: 'Hotel Imperial lobisi',
      ortam: 'ortam_otel',
      tarif: 'Mermer, altın yaldız, kırmızı halılar. Burada kıtlık yok gibi; ama avizelerin yarısı yanmıyor. Resepsiyonda kır saçlı bir kâtip; bir kenarda Fransız ve İngiliz subayları. Personel kapısından mutfak kokuları sızıyor.',
      nesneler: [
        {
          id: 'resepsiyon',
          etiket: 'Resepsiyon',
          incele: (d) =>
            delilVar(d, 'delorme_odasi')
              ? 'Kâtip Neslihan\'a yine eğilip selam veriyor.'
              : 'Neslihan resepsiyona yürüyor; yürüyüşü değişiyor, sırtı dikleşiyor. Kusursuz bir Viyana Almancasıyla: Madame Rivière, diyor. Bir rezervasyonum olmalı. Kâtip defteri açıyor. Elbette madam. Mösyö Laval sizin için ayırtmıştı, on dört-on altı Ocak. Kendisi 112\'de. Haber vereyim mi? Gerek yok, diyor Neslihan. Sürpriz olsun. Sen kâtibin omzunun üstünden defteri okuyorsun.',
          etki: (d) => (delilVar(d, 'delorme_odasi') ? null : { delil: ['delorme_odasi'] }),
        },
      ],
      kisiler: [],
      gecisler: [
        { hedef: 'mutfak', etiket: 'Personel kapısından mutfağa geç' },
        { hedef: 'ring', etiket: 'Sokağa çık' },
      ],
    },
    mutfak: {
      ad: 'Otelin mutfağı',
      ortam: 'ortam_mutfak',
      tarif: 'Buhar, bakır tencereler, bağıran aşçılar. Bir köşede, bulaşık teknesinin başında genç bir garson, öksürerek bir sigara izmaritinin son nefesini çekiyor: Josef. Duvarda bir yemek asansörü.',
      nesneler: [
        {
          id: 'asansor',
          etiket: 'Yemek asansörü',
          incele: 'Ahşap bir kutu, halatlar, bir zil. Üstündeki levha: Roter Salon, 1. Stock. Kırmızı Salon, birinci kat. Kulağını boşluğa dayıyorsun: yukarıdan sesler iniyor. Mercure Kulübü\'nü hatırlıyorsun.',
          etki: { bayrak: { asansorBulundu: true } },
        },
      ],
      kisiler: ['josef'],
      gecisler: [{ hedef: 'lobi', etiket: 'Lobiye dön' }],
    },
  },

  kisiler: {
    kessler: {
      ad: 'Franz Kessler',
      giris: (d) => (bayrak(d, 'kesslerAcik') ? 'bilgi' : 'ilk'),
      dugumler: {
        ilk: {
          soz: (d) =>
            yanimda(d, 'nermin')
              ? 'Kessler Nermin\'i görünce ayağa fırlıyor. Nermin Hanım! İstanbul! 1913\'te Balkan Harbi\'ni birlikte yazmıştık, diyor sana. Oturun, oturun. Ne arıyorsunuz?'
              : 'Kessler sizi süzüyor; ' + cevirmen(d) + ' çeviriyor. Yabancılar, diyor. Viyana\'da artık yalnızca yabancılar soru soruyor. Bilgi bedava değil, dostum. Ama para da değersiz.',
          secenekler: [
            {
              etiket: 'Nermin, eski dostuna anlat.',
              kosul: (d) => yanimda(d, 'nermin'),
              etki: { bayrak: { kesslerAcik: true } },
              sonra: 'bilgi',
            },
            {
              etiket: 'Bir paket tütün uzat.',
              kosul: (d) => !yanimda(d, 'nermin') && sayi(d, 'tutun') > 0,
              etki: { bayrak: { kesslerAcik: true }, artir: { tutun: -1 } },
              sonra: 'bilgi',
              cevap: 'Kessler paketi koklayıp gözlerini kapatıyor. Selanik, diyor. Makedon tütünü. Dört yıldır böyle bir şey içmedim. Sorun.',
            },
            {
              etiket: 'Defterden bir isim ver. Bir gazeteci için altından değerli.',
              kosul: (d) => !yanimda(d, 'nermin') && sayi(d, 'tutun') <= 0,
              etki: { bayrak: { kesslerAcik: true, isimVerildi: true } },
              sonra: 'bilgi',
              cevap: 'Defteri açıp Viyana sayfasından tek bir satır okuyorsun: bir bakanlık müsteşarı, bir rakam. Kessler\'in yüzü bembeyaz oluyor. Bu adamı tanırım, diyor. Bunu yazarsam beni öldürürler. Yazmazsam kendimi. Sorun.',
            },
            { etiket: 'Sonra konuşuruz.' },
          ],
        },
        bilgi: {
          soz: 'Kessler piposunu dolduruyor. Sorun, diyor.',
          secenekler: [
            {
              etiket: 'Viktor Rainer kim?',
              kosul: (d) => !delilVar(d, 'rainer_bilgi'),
              etki: { delil: ['rainer_bilgi'] },
              sonra: 'bilgi',
              cevap: 'Kessler sesini alçaltıyor. Rainer mi? Savaş boyunca bütün tarafların tahvillerini satan banka. Avusturya\'nın, Almanya\'nın, Osmanlı\'nın; ve bir İsviçre aracısıyla, karşı tarafın da. Dört imparatorluk battı; o büyüdü. Yetmiş yaşında, hayırsever, operada locası var. Hiç fotoğraf vermez. Onun hakkında yazan iki gazeteci tanırdım. Biri kayboldu, öbürü artık spor yazıyor.',
            },
            {
              etiket: 'Hotel Imperial\'de 15 Ocak\'ta ne var?',
              kosul: (d) => !delilVar(d, 'toplanti_yeri'),
              etki: { delil: ['toplanti_yeri'] },
              sonra: 'bilgi',
              cevap: 'Kessler kaşını kaldırıyor. Otelin şefgarsonu kuzenim, diyor. Kırmızı Salon on beşinde Bankhaus Rainer adına ayrılmış. On iki kişilik bir akşam yemeği. Savaştan sonra on iki kişilik akşam yemeği verebilen kimse kalmadı Viyana\'da. Yalnızca onlar.',
            },
            { etiket: 'Sağ ol Kessler.' },
          ],
        },
      },
    },
    josef: {
      ad: 'Garson Josef',
      giris: (d) => (bayrak(d, 'garson') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: (d) => 'Josef izmariti söndürüp sana bakıyor; ' + cevirmen(d) + ' çeviriyor. On dokuz yaşında, kemik ve öksürük. Evde hasta bir kız kardeşi var, diyor. Ateşi düşmüyor. Burada artıkları götürmemize izin vermiyorlar.',
          secenekler: [
            {
              etiket: 'Cemil Bey: Kardeşine bakayım.',
              kosul: (d) => yanimda(d, 'cemil'),
              etki: { bayrak: { garson: true } },
              sonra: 'sonra',
              cevap: 'Cemil Bey o gece Josef\'le birlikte Ottakring\'e gidiyor. Sabah dönüyor; yorgun ama gülümseyerek. Grip, diyor. Zatürreye dönmemiş. Atlatır. Josef sana yedek garson ceketini uzatıyor; gözleri dolu. Ne isterseniz, diyor.',
            },
            {
              etiket: 'Bir paket tütün ver. Ekmek alır.',
              kosul: (d) => !yanimda(d, 'cemil') && sayi(d, 'tutun') > 0,
              etki: { bayrak: { garson: true }, artir: { tutun: -1 } },
              sonra: 'sonra',
              cevap: 'Josef paketi ceketinin içine saklıyor. Bununla bir haftalık un alırım, diyor. Sonra sana yedek garson ceketini uzatıyor. On beşinde Kırmızı Salon\'da yemek var. Bir garson eksik olacak; ben hasta olacağım.',
            },
            { etiket: 'Geçmiş olsun.' },
          ],
        },
        sonra: {
          soz: 'Josef göz kırpıyor. Ceket sizde, diyor. On beşinde akşam yedide servis başlar.',
          secenekler: [{ etiket: 'Sağ ol Josef.' }],
        },
      },
    },
    asker: {
      ad: 'Tek bacaklı asker',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'askereVerdi')
              ? 'Adam seni görünce başını eğiyor. Tütününü bir başka sakatla paylaşıyor.'
              : 'Önünde boş bir şapka, göğsünde bir madalya. Gözleri cebindeki tütün paketinin üstünde. Bir şey istemiyor; yalnızca bakıyor.',
          secenekler: [
            {
              etiket: 'Bir paket tütün ver.',
              kosul: (d) => sayi(d, 'tutun') > 0 && !bayrak(d, 'askereVerdi'),
              etki: { bayrak: { askereVerdi: true }, artir: { tutun: -1 }, sahne: 'asker' },
            },
            { etiket: 'Yürü.' },
          ],
        },
      },
    },
    gruber: {
      ad: 'Frau Gruber',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) => 'Frau Gruber sobaya bir parça kâğıt atıyor; başka yakacak yok. ' + cevirmen(d) + ' çeviriyor: Oğlum hep İstanbul\'u görmek isterdi, diyor. Müttefikimiz, derdi. Hepimiz aynı savaşı kaybettik, değil mi?',
          secenekler: [
            {
              etiket: 'Bir paket tütün bırak; sobaya kömür alsın.',
              kosul: (d) => sayi(d, 'tutun') > 0 && !bayrak(d, 'grubereVerdi'),
              etki: { bayrak: { grubereVerdi: true }, artir: { tutun: -1 } },
              cevap: 'Frau Gruber paketi alıyor; bir şey söylemiyor. Ertesi sabah soba yanıyor. Ve kahvaltıda masada, nereden bulduğunu bilmediğin iki yumurta.',
            },
            { etiket: 'Evet. Hepimiz.' },
          ],
        },
      },
    },
    neslihan: {
      ad: 'Neslihan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            delilVar(d, 'sahte_defter')
              ? 'Neslihan parmaklarındaki mürekkebi ovuşturuyor. Ömrümde ilk kez, diyor, doğru bir şey için yalan yazdım.'
              : 'Neslihan pencereden karşı damlara bakıyor. Rivière beni burada Strauss dinlemeye götürürdü, diyor. Ben de mutlu olduğumu sanırdım. Belki mutluydum da. Bu da beni korkutuyor.',
          secenekler: [
            {
              etiket: 'Sahte bir defter yaz. Rainer\'e verelim.',
              kosul: (d) => bayrak(d, 'sahteFikri') && !delilVar(d, 'sahte_defter'),
              etki: { sahne: 'sahte_defter' },
            },
            {
              etiket: 'Bu gece konuşalım. Altı yılı anlat bana.',
              kosul: (d) => !bayrak(d, 'kardesGecesi'),
              etki: { sahne: 'kardes_gecesi' },
            },
            {
              etiket: 'Mutlu olman suç değil.',
              kosul: (d) => !bayrak(d, 'neslihanTeselli9'),
              etki: { bayrak: { neslihanTeselli9: true }, artir: { neslihanBag: 1 } },
              sonra: 'ilk',
              cevap: 'Neslihan bir an susuyor. Sen hiç mutlu oldun mu abi? Çanakkale\'den sonra? Cevap vermiyorsun. O da üstelemiyor. İkiniz pencereden karı izliyorsunuz.',
            },
            { etiket: 'Hadi.' },
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
          soz: 'Cemil Bey pencereden Allgemeines Krankenhaus\'un damlarını gösteriyor. Orada iki yıl okudum, diyor. 1905. Viyana dünyanın tıp başkentiydi. Şimdi hastanede sargı bezi yokmuş. Bir şehir ne çabuk yaşlanıyor.',
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
          soz: 'Nermin defterine bir şeyler yazıyor. Burada da bizdeki gibi, diyor. Herkes birini suçluyor. Kimse kendini. Café Central\'de eski bir dostum var: Franz Kessler. Viyana\'da bilmediği yoktur.',
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
          soz: 'Rıza Bey paltosunu iliklemiş; eldivensiz elleri cebinde. Bu soğukta, diyor, bir İstanbul polisi ne yapar biliyor musun? Otelin kapıcısına bakar. Kapıcı her şeyi bilir.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
  },
};
