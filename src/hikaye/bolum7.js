// Yedinci bölüm: "Montaigne". Selanik, 23-24 Aralık 1918 gecesi. Rivière'in Kalamarya'daki köşkü.
// Yeni oynanış: gizlice sızma. Köpek, bekçi ve çalışma odası kapısı; her engel ya bir ekip üyesinin
// becerisiyle sessizce geçilir ya da alarm (alarm) artar. Alarm 3 olursa yakalanırsın; hikâye sürer.
// Kasanın şifresi odadaki çerçeveden (12 Aralık 1912). Rivière ve Delorme'la yüzleşme; Neslihan'ın seçimi.
// Arka plan (gerçek): Manastır Kasım 1912'de Sırp ordusuna geçti; 1 Aralık 1918'de Sırp-Hırvat-Sloven Krallığı kuruldu.
// Bütün kişiler ve olaylar KURGUDUR.
import { BOLUM6 } from './bolum6';
import { bayrak, cikarimVar, delilVar, sayi } from '../oyun/motor';

const yanimda = (d, kim) => !!bayrak(d, 'ekip_' + kim);
const ALARM_SINIRI = 3;

export const BOLUM7 = {
  id: 'bolum7',
  ad: 'Yedinci bölüm: Montaigne',
  baslangic: 'acilis',
  ilkMekan: 'ev',

  deliller: {
    ...BOLUM6.deliller,
    defter_yarisi: { ad: 'Defterin öbür yarısı', tarif: 'Rivière\'in kasasından çıkan deri kaplı defter. Siyakatla yazılmış rakamlar, harfler, şehir adları. Sabri\'nin çaldığı sayfalar bu defterden koparılmış.' },
    riviere_mektubu: { ad: 'Rivière\'in masasındaki mektup', tarif: 'Belgrad\'dan bir mektubun kopyası: İ. U., Manastır cezaevi. Hâlâ yaşıyor. Kızı asla bilmemeli. Bedeli ödendi.' },
    siyakat_okundu: { ad: 'Hafız Efendi\'nin okuduğu satırlar', tarif: 'Eski defterdarlık kâtibi Hafız Efendi siyakatı okudu: İstanbul, Selanik, Viyana, Berlin. Rüşvet alan memurlar, subaylar, gazeteciler. Ve her sayfanın altında bir aracının imzası: N. R.' },
  },

  cikarimlar: {
    ...BOLUM6.cikarimlar,
    baba_yasiyor: {
      a: 'riviere_mektubu',
      b: 'hafiz_tanik',
      ad: 'Baban yaşıyor',
      metin: 'Hafız Efendi babanın Manastır yoluna döndüğünü söyledi. Rivière\'in masasındaki mektup sonunu yazıyor: İ. U., İsmail Usta, Manastır\'da bir Sırp cezaevinde. Altı yıldır. Yaşıyor. Neslihan bilmesin diye parası ödenmiş.',
    },
    isimler: {
      a: 'siyakat_okundu',
      b: 'defter_yarisi',
      ad: 'Defter çözüldü',
      metin: 'Defterin iki yarısı ve Hafız Efendi\'nin okuduğu satırlar birleşince, Kanatlı Anahtar\'ın İstanbul\'dan Berlin\'e kadar satın aldığı insanların listesi ortaya çıkıyor. Ve her sayfanın altındaki aracı imzası, N. R.: Neslihan Rivière. Kardeşin, bilmeden, örgütün bütün rüşvetlerini kendi eliyle yazmış.',
    },
  },

  olaylar: [
    {
      id: 'yakalandi',
      kosul: (d) => sayi(d, 'alarm') >= ALARM_SINIRI && !delilVar(d, 'defter_yarisi'),
      etki: { mekan: 'calisma', sahne: 'yakalandi' },
    },
    {
      id: 'riviere',
      kosul: (d) => delilVar(d, 'defter_yarisi') && !bayrak(d, 'yakalandi7'),
      etki: { sahne: 'riviere' },
    },
    {
      id: 'safak',
      kosul: (d) => cikarimVar(d, 'baba_yasiyor') && cikarimVar(d, 'isimler'),
      etki: { mekan: 'ev', sahne: 'safak' },
    },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Yedinci bölüm bitti.' },
    { kosul: (d) => !bayrak(d, 'gorüldü_kosk_bahce'), metin: 'Rebeka Hanım\'ın evinde ekibinle planı konuş, sonra köşke git.' },
    { kosul: (d) => !bayrak(d, 'kopekGecildi') || !bayrak(d, 'bekciGecildi'), metin: 'Bahçede köpeği ve bekçiyi dikkat çekmeden geç. Ekibinin becerilerini kullan; yoksa alarm artar.' },
    { kosul: (d) => !delilVar(d, 'defter_yarisi'), metin: 'Çalışma odasına gir, kasayı bul ve aç. Şifre odanın içinde bir yerde.' },
    { kosul: () => true, metin: 'Kurtardıklarını panoda birleştir. Şafak yaklaşıyor.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_ev',
      baslik: '23 Aralık, gece yarısına doğru',
      paragraflar: (d) => [
        'Rebeka Hanım\'ın mutfağında bir lamba. Masada Saltiel Efendi\'nin çizdiği kaba bir kroki: köşk, bahçe, uçurum, deniz.',
        bayrak(d, 'anahtarAlindi')
          ? 'Avucunda Neslihan\'ın anahtarı. Çalışma odası, kütüphanenin arkasında. Kasa Montaigne\'in arkasında.'
          : 'Anahtarın yok. Yalnızca Saltiel\'in krokisi ve bir hamalın kilit ve kapı bilgisi.',
        'Delorme yarın geliyor. Defter bu gece orada; yarın gece başka yerde olabilir.',
        bayrak(d, 'fransizBag')
          ? 'Morin\'in iki adamı bahçe kapısının dışında bekleyecek. İçeri girmezler, dedi Morin; generalimin dostunun evine. Ama biri dışarı kaçarsa yakalarız.'
          : 'Kimse sizi beklemeyecek. Bir şey olursa, yalnızsınız.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'ev', bayrak: { 'gorüldü_ev': true } } }],
    },
    havlama: {
      ortam: 'ortam_kosk_bahce',
      efekt: ['kopek'],
      baslik: 'Köpek',
      paragraflar: [
        'Zincir şakırdıyor. Kocaman bir köpek karanlıktan fırlıyor ve havlamaya başlıyor. Yere yapışıyorsun.',
        'Evin bir penceresinde ışık yanıyor. Bir bekçi homurdanarak bahçeye çıkıyor, fenerini sağa sola tutuyor. Köpeğe bağırıyor. Sus, kediye havlarsın sen!',
        'Fener yüzünden bir karış ötede. Sonra uzaklaşıyor. Işık sönüyor. Ama artık uyanıklar.',
      ],
      secenekler: [{ etiket: 'Devam' }],
    },
    yakalandi: {
      ortam: 'ortam_kosk_ic',
      baslik: 'Yakalandın',
      paragraflar: [
        'Bir el yakana yapışıyor; bir tabanca ensende. İki bekçi seni koridor boyunca sürükleyip bir kapıyı itiyor.',
        'Çalışma odası. Kitaplarla dolu duvarlar, sönmek üzere bir şömine. Ve bir koltukta, karanlıkta, sabahlıklı, ak saçlı bir adam.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { yakalandi7: true }, delil: ['defter_yarisi'] }, sonra: 'riviere' }],
    },
    riviere: {
      ortam: 'ortam_kosk_ic',
      baslik: 'Gaston Rivière',
      paragraflar: (d) => [
        bayrak(d, 'yakalandi7')
          ? 'Gaston Rivière bekçilere eliyle çıkmalarını işaret ediyor. Altmış yaşlarında, ak saçlı, yorgun gözlü bir adam. Dizinde deri kaplı bir defter. Onu sana uzatıyor. Bunu mu arıyordunuz? Alın. Bu gece benim için artık bir anlamı yok.'
          : 'Kasanın kapağını kapattığın an karanlıktan bir ses: Montaigne\'i okumadan kasasını açmak ayıp, Mösyö. Köşedeki koltukta, sabahlıklı, ak saçlı bir adam. Gaston Rivière. Seni bekliyormuş.',
        'Kusursuz bir Türkçe: Felsefe yapmak, ölmeyi öğrenmektir, der Montaigne. Ben bu gece biraz felsefe yapıyordum.',
        'Kardeşinizin kulağından tanıdım sizi, diyor; sanki bir hastalık teşhis eder gibi. Aynı kulak memesi, aynı inat. Ben onu yollardan topladım, Mösyö Arif. Tifolu bir arabanın içinden. Bunu unutmayın.',
      ],
      secenekler: [
        { etiket: 'Babamı sor.', etki: { delil: ['riviere_mektubu'], bayrak: { babaSoruldu: true } }, sonra: 'riviere_baba' },
        { etiket: 'O talimatı neden yazdın? Ondan kurtul.', etki: { bayrak: { talimatSoruldu: true } }, sonra: 'riviere_talimat' },
      ],
    },
    riviere_baba: {
      ortam: 'ortam_kosk_ic',
      baslik: 'İsmail Usta',
      paragraflar: [
        'Rivière bir an susuyor. Sonra masasındaki bir zarfı gösteriyor.',
        'İsmail Usta, diyor. Kalaycı. Oğlunu aramak için Manastır\'a döndü. Sırplar onu casus diye tuttu; bir Türk kalaycı, savaşın ortasında sokak sokak oğlunu soruyor. Altı yıldır Manastır cezaevinde.',
        'Ben biliyordum. Parası ödendi ki orada kalsın; Neslihan bir babanın peşine düşüp hayatını mahvetmesin diye. Bana canavar diyebilirsiniz. Ben ona bir hayat verdim.',
        'Elin zarfa gidiyor. Belgrad\'dan bir mektup: İ. U., Manastır cezaevi. Hâlâ yaşıyor.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'delorme_gelir' }],
    },
    riviere_talimat: {
      ortam: 'ortam_kosk_ic',
      baslik: 'Mühür',
      paragraflar: [
        'Rivière\'in yüzü ilk kez değişiyor. Ben yazmadım, diyor. Delorme yazdı. Benim mührümle.',
        'Bu örgüt, diyor yorgun bir sesle, bir zamanlar düzen içindi. Bankalar, anlaşmalar, savaşı önleyen borçlar. Şimdi Delorme gibiler yönetiyor. Ateşi canlı tutmak, diyorlar. Ben artık yalnızca bir mühürüm. Yaşlı bir mühür.',
        'Masasındaki zarfı sana doğru itiyor. Bunu da alın, diyor. Babanız hakkında. Ona borçluyum.',
      ],
      secenekler: [{ etiket: 'Zarfı al', etki: { delil: ['riviere_mektubu'] }, sonra: 'delorme_gelir' }],
    },
    delorme_gelir: {
      ortam: 'ortam_kosk_ic',
      baslik: 'Delorme',
      paragraflar: (d) => [
        'Kapı açılıyor. Lavanta kokusu odayı dolduruyor.',
        'Lucien Delorme, yolculuk paltosuyla, arkasında iki adam. Bir gün erken geldim, diyor gülümseyerek. Gece vapuru. Ve iyi ki gelmişim.',
        'Gözleri önce sana, sonra elindeki deftere, sonra Rivière\'e kayıyor. Ah, Gaston. Kasanı bir hamala açtırdın. Yoruldun dostum. Yorulanlar dinlenmeli.',
        'Tabancasını kaldırıyor; Rivière\'e değil, sana değil: ikinizin arasına, kimseye.',
        'Ve kapıda, elinde bir şamdan, gecelikli: Neslihan. Gözleri babası dediği adamdan Delorme\'a, Delorme\'dan sana gidip geliyor.',
        sayi(d, 'neslihanBag') >= 2 ? 'Bir an göz göze geliyorsunuz. Bir ayva ağacının gölgesi geçiyor aranızdan.' : 'Seni tanıyor. Yüzünde korku ve öfke.',
      ],
      secenekler: [
        { etiket: 'Neslihan\'ın önüne geç.', etki: { bayrak: { sonSecim: 'koru' } }, sonra: 'son_koru' },
        { etiket: 'Delorme\'un üstüne atıl.', etki: { bayrak: { sonSecim: 'atil' }, artir: { travma: 1 } }, sonra: 'son_atil' },
        { etiket: 'Defteri göğsüne bastır ve pencereden kaç.', etki: { bayrak: { sonSecim: 'kac' } }, sonra: 'son_kac' },
      ],
    },
    son_koru: {
      ortam: 'ortam_kosk_ic',
      efekt: ['silah'],
      baslik: 'Kalkan',
      paragraflar: (d) => [
        'Bir adımda Neslihan\'ın önündesin. Delorme\'un namlusu sana dönüyor.',
        'Silah patlıyor. Ama sana değil. Rivière koltuğundan kalkmış, ikinizin önüne atılmış. Göğsünü tutarak yere çöküyor.',
        'Neslihan bir çığlık atıyor. Diz çöküp yaşlı adamın başını kucağına alıyor. Baba, diyor. Baba.',
        'Rivière ona gülümsüyor. Kardeşin, diye fısıldıyor. Doğru söylüyor. Affet beni. Ve gözleri duruyor.',
        bayrak(d, 'fransizBag')
          ? 'Bahçede düdükler. Morin\'in adamları. Delorme pencereye koşuyor, camı kırıp karanlığa, uçuruma doğru atlıyor. Aşağıda deniz. Bir silah sesi; Fransızlar ateş ediyor. Sonra yalnızca dalgalar.'
          : 'Delorme bir an Neslihan\'a bakıyor; sonra pencereyi kırıp karanlığa atlıyor. Aşağıda uçurum ve deniz. Yalnızca dalgalar.',
      ],
      secenekler: [
        {
          etiket: 'Devam',
          etki: (d) => ({ bayrak: { riviereSonu: 'oldu', neslihanSecim: sayi(d, 'neslihanBag') >= 1 ? 'geldi' : 'gitti' } }),
          sonra: 'kacis',
        },
      ],
    },
    son_atil: {
      ortam: 'ortam_kosk_ic',
      efekt: ['silah'],
      baslik: 'Bıçak ve şamdan',
      paragraflar: (d) => [
        'Delorme\'un üstüne atılıyorsun. Silah patlıyor, mermi tavana gidiyor. Yere yuvarlanıyorsunuz; onun bıçağı, senin yumrukların.',
        bayrak(d, 'yaraKol') ? 'Sol kolun yine seni yarı yolda bırakıyor. Delorme\'un bıçağı boğazına iniyor.' : 'Bileğini kavrıyorsun ama o bir yılan gibi kurtuluyor. Bıçak boğazına iniyor.',
        sayi(d, 'neslihanBag') >= 2
          ? 'Bir şamdan Delorme\'un başına iniyor. Neslihan. Delorme sendeleyip pencereye çarpıyor; cam kırılıyor ve karanlığa, uçuruma düşüyor.'
          : 'Rivière, yaşlı, titrek, Delorme\'un koluna yapışıyor. Delorme ona dönüp bıçağını gömüyor. O an kalkıyorsun; Delorme pencereyi kırıp karanlığa, uçuruma atlıyor.',
        'Rivière yerde. Neslihan yanında, dizlerinin üstünde. Baba, diyor. Baba.',
        'Rivière son bir kez gülümsüyor; sana, sonra ona. Kardeşin, diye fısıldıyor. Affet beni.',
      ],
      secenekler: [
        {
          etiket: 'Devam',
          etki: (d) => ({ bayrak: { riviereSonu: 'oldu', neslihanSecim: sayi(d, 'neslihanBag') >= 2 ? 'geldi' : 'gitti' } }),
          sonra: 'kacis',
        },
      ],
    },
    son_kac: {
      ortam: 'ortam_kosk_bahce',
      efekt: ['silah'],
      baslik: 'Uçurum yolu',
      paragraflar: [
        'Defteri göğsüne bastırıp pencereden atlıyorsun. Çalılar, çakıl, ıslak çimen. Arkanda bir silah sesi. Bir çığlık; Neslihan\'ın sesi.',
        'Durmuyorsun. Duramazsın. Bahçe duvarı, kaya yolu, sonra Kalamarya\'nın karanlık sokakları.',
        'Defter elinde. Ama arkanda, o pencerenin ardında, kardeşin bir katille baş başa.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { riviereSonu: 'oldu', neslihanSecim: 'kaldi' }, artir: { travma: 1 } }, sonra: 'kacis' }],
    },
    kacis: {
      ortam: 'ortam_ev',
      baslik: 'Rebeka Hanım\'ın mutfağı',
      paragraflar: (d) => [
        'Gece üç. Rebeka Hanım\'ın mutfağında, lambanın altında, ellerin hâlâ titriyor. Defter masada.',
        bayrak(d, 'neslihanSecim') === 'geldi'
          ? 'Neslihan karşında oturuyor, gecelikli, omuzlarında Rebeka Hanım\'ın şalı. Bir şey söylemiyor. Sadece masanın üstünde elini senin elinin yanına koymuş; dokunmadan.'
          : bayrak(d, 'neslihanSecim') === 'gitti'
            ? 'Neslihan gelmedi. Kapıda, sabahlığıyla, babasının cesedinin başında kaldı. Gitmemi bekleme, dedi sana. Şimdi değil.'
            : 'Neslihan\'dan haber yok. Pencerenin ardında kaldı. Bir katille.',
        'Saltiel Efendi kapıda. Arkasında, eski bir cübbenin içinde, Hafız Efendi. Siyakat okuyacak birini arıyormuşsunuz, diyor tütüncü. Benim tanıdığım en iyi kâtip Manastır defterdarlığından.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'ev' } }],
    },
    safak: {
      ortam: 'ortam_ev',
      efekt: ['kilise_cani'],
      baslik: '24 Aralık, şafak',
      paragraflar: (d) => [
        'Kalamarya\'da şafak. Şehrin kiliselerinin çanları birer birer çalmaya başlıyor; Noel arifesi. Fransız ve İngiliz askerlerinin bayramı. Körfezin üstünde çanların sesi.',
        bayrak(d, 'neslihanSecim') === 'geldi'
          ? 'Neslihan pencerenin önünde. Defterin her sayfasının altında kendi adının baş harfleri. Bilmiyordum, diyor sesi kırık. Tercüme ettiğimi sanıyordum. Satın alıyormuşum.'
          : bayrak(d, 'neslihanSecim') === 'gitti'
            ? 'Sabah bir çocuk bir mektup getiriyor. Neslihan\'ın yazısı: Babamı gömeceğim. Sonra bilmiyorum. Bana zaman ver. Altında, bir kız çocuğunun çizer gibi çizdiği küçük bir ayva.'
            : 'Neslihan\'dan haber yok. Rivière\'in köşkü sabaha karşı jandarmayla doldu, diyor Saltiel. Kızdan bahseden yok.',
        'Ve masada, Rivière\'in zarfı. İ. U., Manastır cezaevi. Hâlâ yaşıyor.',
        'Baban yaşıyor. Altı yıl, bir Sırp hapishanesinde. Seni aramaya döndüğü için.',
        yanimda(d, 'riza')
          ? 'Rıza Bey zarfı okuyup katlıyor. Manastır, diyor. Şimdi başka bir krallığın toprağı. Sırp jandarması. Pasaport, izin, rüşvet. Ama yol bellidir: Selanik\'ten trenle.'
          : 'Cemil Bey zarfı okuyup gözlüğünü çıkarıyor. Manastır treni hâlâ işliyor, diyor. Benim de orada bir iki dostum var. Hepsi ölmediyse.',
        'Kuzeye bakıyorsun. Pusula cebinde. İbresi titriyor, sonra duruyor: kuzey. Manastır.',
        'Yedinci bölümün sonu.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_ev',
      ortamOran: 0.5,
      baslik: 'Yedinci bölüm bitti',
      paragraflar: ['Baban yaşıyor. Sekizinci bölüm yazılıyor: Manastır. Kararların kaydedildi.'],
      secenekler: [{ etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    ev: {
      ad: 'Rebeka Hanım\'ın evi',
      tarif: (d) =>
        bayrak(d, 'olay_riviere') || bayrak(d, 'yakalandi7')
          ? 'Mutfakta lamba. Masada deri kaplı defter. Ocakta çay. Kimse uyumuyor.'
          : 'Mutfakta lamba, masada kroki. Çocuklar uyuyor. Rebeka Hanım ocakta bir şey ısıtıyor; size bakıp bakıp başını sallıyor.',
      nesneler: [
        {
          id: 'kroki',
          etiket: 'Saltiel\'in krokisi',
          incele: 'Köşk uçurumun kenarında. Bahçede zincirli bir köpek, gece bir bekçi. Yan kapı mutfaktan. Çalışma odası zemin katta, denize bakan tarafta. Altında Saltiel\'in notu: Tütünü her ay mutfak kapısından teslim ederim; köpek bana havlamaz.',
        },
      ],
      kisiler: ['cemil', 'nermin', 'riza', 'neslihan', 'hafiz'],
      gecisler: [
        {
          hedef: 'kosk_bahce',
          etiket: 'Köşke git',
          kosul: (d) => !delilVar(d, 'defter_yarisi'),
        },
      ],
    },
    kosk_bahce: {
      ad: 'Köşkün bahçesi',
      tarif: 'Çam ağaçlarında rüzgâr, aşağıda uçurumun dibinde kayalara vuran dalgalar. Çakıllı yollar, karanlık bir köşk, bir pencerede sönük bir ışık. Kulübenin önünde zincirli, iri bir köpek; uyuyor gibi. Evin köşesinde bir bekçinin feneri gidip geliyor.',
      nesneler: [
        {
          id: 'kopek',
          etiket: 'Zincirli köpek',
          incele: (d) =>
            bayrak(d, 'kopekGecildi')
              ? 'Köpek kulübesinin önünde yatıyor; zincir sessiz.'
              : yanimda(d, 'cemil')
                ? 'Cemil Bey cebinden bir parça et çıkarıyor; ilaçlı. Laudanum, diyor fısıltıyla. Hekim çantası her işe yarar. Eti köpeğe atıyor. Köpek kokluyor, yiyor, birkaç dakika sonra yan yatıp horlamaya başlıyor.'
                : 'Köpeğe yaklaşmaya çalışıyorsun.',
          etki: (d) =>
            bayrak(d, 'kopekGecildi')
              ? null
              : yanimda(d, 'cemil')
                ? { bayrak: { kopekGecildi: true } }
                : { bayrak: { kopekGecildi: true }, artir: { alarm: 1 }, sahne: 'havlama' },
        },
        {
          id: 'bekci',
          etiket: 'Bekçinin feneri',
          incele: (d) =>
            bayrak(d, 'bekciGecildi')
              ? 'Bekçi evin öbür ucunda.'
              : yanimda(d, 'riza')
                ? 'Rıza Bey çömelip feneri izliyor; dudakları kıpırdıyor, sayıyor. Her tur dört dakika, diyor. Mutfak kapısının önünden geçtikten sonra üç dakika kör. Şimdi. Geçiyorsunuz; bekçi hiçbir şey görmüyor.'
                : yanimda(d, 'nermin')
                  ? 'Nermin şalını düzeltip bahçe kapısına yürüyor ve Fransızca seslenerek kapıyı çalıyor: yolunu kaybetmiş bir hanım. Bekçi fenerini alıp kapıya koşuyor; Nermin onu beş dakika oyalıyor. Sen mutfak kapısına geçiyorsun.'
                  : 'Fenerin gidip gelişini izliyorsun. Bir aralık bulup koşuyorsun; çakıl ayağının altında gıcırdıyor. Bekçi duruyor, dinliyor. Sonra yürümeye devam ediyor. Şanslısın; ama bir dahaki sefere değil.',
          etki: (d) =>
            bayrak(d, 'bekciGecildi')
              ? null
              : yanimda(d, 'riza') || yanimda(d, 'nermin')
                ? { bayrak: { bekciGecildi: true } }
                : { bayrak: { bekciGecildi: true }, artir: { alarm: 1 } },
        },
        {
          id: 'pencere',
          etiket: 'Işıklı pencere',
          incele: (d) =>
            bayrak(d, 'incelendi_pencere')
              ? 'Perde artık kapalı.'
              : 'Çiçek tarhının içinden pencereye sokuluyorsun. İçeride, lambanın altında, Neslihan. Bir masada mektup yazıyor; kalemi duruyor, başını kaldırıp karanlığa bakıyor. Bir an göz göze geldiğinizi sanıyorsun. Ayağının altında bir saksı devriliyor. Neslihan perdeyi çekiyor; içeride bir zil çalıyor.',
          etki: (d) => (bayrak(d, 'incelendi_pencere') ? null : { artir: { alarm: 1 } }),
        },
      ],
      kisiler: [],
      gecisler: [
        { hedef: 'kosk_ic', etiket: 'Mutfak kapısından içeri gir', kosul: (d) => bayrak(d, 'kopekGecildi') && bayrak(d, 'bekciGecildi') },
        { hedef: 'ev', etiket: 'Geri çekil' },
      ],
    },
    kosk_ic: {
      ad: 'Köşkün içi',
      tarif: 'Karanlık bir hol. Büyük bir duvar saati ağır ağır vuruyor; parke her adımda gıcırdıyor. Camlarda yağmur. Merdivenin başında bir kapının altından ışık sızıyor: yukarıda biri uyanık.',
      nesneler: [
        {
          id: 'calisma_kapisi',
          etiket: 'Çalışma odasının kapısı',
          incele: (d) =>
            bayrak(d, 'calismaAcik')
              ? 'Kapı aralık.'
              : bayrak(d, 'anahtarAlindi')
                ? 'Neslihan\'ın anahtarını kilide sokuyorsun. Yağlanmış; hiç ses çıkarmadan dönüyor.'
                : yanimda(d, 'riza')
                  ? 'Rıza Bey cebinden iki ince tel çıkarıyor. Kırk yıl hırsız yakaladım, diyor. Biraz da öğrendim. Kilit yarım dakikada açılıyor.'
                  : 'Kilitli. Omzunla yükleniyorsun; kapı çatırdayarak açılıyor. Ses holde yankılanıyor.',
          etki: (d) =>
            bayrak(d, 'calismaAcik')
              ? null
              : bayrak(d, 'anahtarAlindi') || yanimda(d, 'riza')
                ? { bayrak: { calismaAcik: true } }
                : { bayrak: { calismaAcik: true }, artir: { alarm: 1 } },
        },
        {
          id: 'merdiven',
          etiket: 'Merdivenin başındaki ışık',
          incele: (d) =>
            bayrak(d, 'incelendi_merdiven')
              ? 'Işık hâlâ yanıyor. Bir daha denemeye cesaretin yok.'
              : 'İki basamak çıkıyorsun. Üçüncüsü bir silah gibi gıcırdıyor. Yukarıdaki ışığın altında bir gölge duruyor, dinliyor. Geri iniyorsun; nefesini tutuyorsun.',
          etki: (d) => (bayrak(d, 'incelendi_merdiven') ? null : { artir: { alarm: 1 } }),
        },
      ],
      kisiler: [],
      gecisler: [
        { hedef: 'calisma', etiket: 'Çalışma odasına gir', kosul: (d) => bayrak(d, 'calismaAcik') },
        { hedef: 'kosk_bahce', etiket: 'Bahçeye çık' },
      ],
    },
    calisma: {
      ad: 'Rivière\'in çalışma odası',
      ortam: 'ortam_kosk_ic',
      tarif: 'Tavana kadar kitaplar. Sönmek üzere bir şömine. Büyük bir maun masa, üstünde mektuplar. Denize bakan uzun pencereler. Köşede, karanlıkta, bir koltuk.',
      nesneler: [
        {
          id: 'kitaplik',
          etiket: 'Kitaplık',
          incele: (d) =>
            bayrak(d, 'kasaBulundu')
              ? 'Montaigne\'in Denemeler\'i yerinden çekilmiş; arkasında küçük, demir bir kasa.'
              : 'Fransızca, Almanca, Latince ciltler. Parmaklarını sırtlarında gezdiriyorsun. Montaigne, Denemeler. Üç cilt. Ortadakini çekiyorsun; arkasında soğuk demir. Bir kasa. Dört haneli bir şifre kilidi.',
          etki: { bayrak: { kasaBulundu: true } },
        },
        {
          id: 'cerceve',
          etiket: 'Masadaki çerçeve',
          incele: 'Gümüş bir çerçeve. İçinde genç bir kız; saçları örgülü değil, kısa kesilmiş, yüzü zayıf, gözleri kocaman. Altında Rivière\'in el yazısı: N., Selanik, 12 Aralık 1912. Eve geldiği gün. On iki, on iki.',
          etki: { bayrak: { tarihBilindi: true } },
        },
        {
          id: 'masa',
          etiket: 'Masadaki mektuplar',
          incele: (d) =>
            delilVar(d, 'riviere_mektubu')
              ? 'Mektuplar karışık. Belgrad\'dan gelen zarf artık sende.'
              : 'Fransızca mektuplar, banka kâğıtları. Birinin kenarına Türkçe, kurşun kalemle bir not düşülmüş: İ. U., Manastır cezaevi. Hâlâ yaşıyor. Kızı asla bilmemeli. Bedeli ödendi. Altında: Belgrad, Kasım 1918.',
          etki: (d) => (delilVar(d, 'riviere_mektubu') ? null : { delil: ['riviere_mektubu'] }),
        },
        {
          id: 'kasa',
          etiket: 'Kasa',
          kosul: (d) => bayrak(d, 'kasaBulundu'),
          incele: (d) =>
            delilVar(d, 'defter_yarisi')
              ? 'Kasa boş.'
              : bayrak(d, 'tarihBilindi')
                ? 'Bir, iki, bir, iki. On iki, on iki. Kilit tık diye açılıyor. İçeride deri kaplı bir defter. Açıyorsun: siyakat. Sabri\'nin denkindeki kâğıtların koparıldığı yer.'
                : 'Dört haneli bir kilit. Rakamları rastgele çeviriyorsun; açılmıyor. Şifre bu odada bir yerde olmalı. Rivière gibi bir adam şifresini neye bağlar?',
          etki: (d) => (delilVar(d, 'defter_yarisi') || !bayrak(d, 'tarihBilindi') ? null : { delil: ['defter_yarisi'] }),
        },
      ],
      kisiler: [],
      gecisler: [],
    },
  },

  kisiler: {
    cemil: {
      ad: 'Cemil Bey',
      kosul: (d) => yanimda(d, 'cemil'),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) => (delilVar(d, 'defter_yarisi') ? 'Cemil Bey Hafız Efendi\'nin omzunun üstünden deftere bakıyor. Ölülerin dilini bilirim, diyor; bu başka bir ölü dil.' : 'Cemil Bey çantasını açıp bir parça ete bir şişeden birkaç damla damlatıyor. Köpekler için, diyor. İnsanlar için de olurdu ama kibar değil.'),
          secenekler: [{ etiket: 'Tamam.', etki: { bayrak: { koskeGidildi: true } } }],
        },
      },
    },
    nermin: {
      ad: 'Nermin Hanım',
      kosul: (d) => yanimda(d, 'nermin'),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) => (delilVar(d, 'defter_yarisi') ? 'Nermin defterin sayfalarını çeviriyor, isimleri kendi defterine geçiriyor; parmakları mürekkep içinde. Bu, diyor, bir gün Avrupa\'nın bütün gazetelerinin ilk sayfası olacak.' : 'Nermin şalını omzuna alıyor. Bahçe kapısında yolunu kaybetmiş bir Fransız hanımı olabilirim, diyor. Bekçiler kayıp hanımlara bayılır.'),
          secenekler: [{ etiket: 'Tamam.', etki: { bayrak: { koskeGidildi: true } } }],
        },
      },
    },
    riza: {
      ad: 'Rıza Bey',
      kosul: (d) => yanimda(d, 'riza'),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) => (delilVar(d, 'defter_yarisi') ? 'Rıza Bey defterdeki İstanbul sayfasına bakıyor. Halim, diyor. K 7. Yedinci sırada. Benim çırağım, bir rüşvet defterinde yedinci sırada.' : 'Rıza Bey bıyığını sıvazlıyor. Bekçiler saat gibidir, diyor. Bir tur, bir sigara, bir tur. Sen kapıyı düşün, ben bekçiyi.'),
          secenekler: [{ etiket: 'Tamam.', etki: { bayrak: { koskeGidildi: true } } }],
        },
      },
    },
    neslihan: {
      ad: 'Neslihan',
      kosul: (d) => bayrak(d, 'neslihanSecim') === 'geldi',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Neslihan şalına sarılmış, bir fincan çayı iki eliyle tutuyor. Ellerinin titremesi durmuyor. Viyana\'da, diyor, bana Avrupa\'nın barışını kurduğumuzu söylerlerdi. Ben de inandım. Her mektup bir barış, sandım.',
          secenekler: [
            {
              etiket: 'Babam yaşıyor, Neslihan. Bizim babamız.',
              kosul: (d) => delilVar(d, 'riviere_mektubu') && !bayrak(d, 'neslihaneBaba'),
              etki: { bayrak: { neslihaneBaba: true }, artir: { neslihanBag: 1 } },
              sonra: 'ilk',
              cevap: 'Neslihan fincanı bırakıyor. Babam, diyor. İsmail Usta. Kalaycı. Ellerinde hep kalay ve mangal kokusu. Bana öldü dediler. Gözleri doluyor ve bu sefer, ilk kez, ağlıyor. Sen de.',
            },
            {
              etiket: 'Sen bilmiyordun. Seni kullandılar.',
              kosul: (d) => !bayrak(d, 'neslihanTeselli'),
              etki: { bayrak: { neslihanTeselli: true } },
              sonra: 'ilk',
              cevap: 'Bilmiyordum, diyor. Ama bilmem gerekirdi. Her mektubu ben yazdım, abi. Her birini.',
            },
            { etiket: 'Dinlen.' },
          ],
        },
      },
    },
    hafiz: {
      ad: 'Hafız Efendi',
      kosul: (d) => bayrak(d, 'olay_riviere') || bayrak(d, 'yakalandi7'),
      giris: (d) => (delilVar(d, 'siyakat_okundu') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Hafız Efendi deri defteri dizlerine alıyor, gözlüğünü takıyor. Siyakat, diyor gülümseyerek. Kırk yıl bununla yazdım. Manastır defterdarlığında. Artık bilen kalmadı; bu yüzden seçmişler. Okuyayım mı evlat?',
          secenekler: [
            {
              etiket: 'Oku Hafız Efendi.',
              etki: { delil: ['siyakat_okundu'] },
              cevap: 'Yaşlı adam parmağını satırlarda gezdirerek okuyor; isimler, rakamlar, şehirler. İstanbul: K 7, N. B., Binbaşı R. Selanik: on dört isim. Viyana, Berlin, Belgrad. Her sayfanın altında bir aracı imzası. Hafız Efendi duruyor, gözlüğünü çıkarıyor. N. R., diyor. Her sayfada. N. R.',
            },
          ],
        },
        sonra: {
          soz: 'Hafız Efendi defteri kapatıyor. Bu defter bir şehri yakar evlat, diyor. Ya da kurtarır. Kimin elinde olduğuna bağlı.',
          secenekler: [{ etiket: 'Sağ ol Hafız Efendi.' }],
        },
      },
    },
  },
};
