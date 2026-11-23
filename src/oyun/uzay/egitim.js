// Savaş eğitimi (3.13, Murat: "ilk müsabakaya girilmeden önce uzay ve kara için geçerli bir eğitim sekansı zorunlu").
// Bağımlılıksız metin ve adım tablosu; mantık savas.js'te (egitimKur, egitimGirdi, egitimIlerle).
// 3.15: menüdeki "Savaş eğitimi" başlığından yapılır (kara baştan, uzay ilk gemiyle açık); bitince d.bayrak.egitim_<ortam>.
// Tamamlanmadan o ortamdaki çatışmalar başlamaz (savas.js egitimEngeli). Eğitimde hasar alınmaz; yanlışta adım yinelenir.

export const EGITIM_DUSMANI = { uzay: 'egitim_dronu', kara: 'egitim_otomati' };
// Eğitim hedefinin kalkan tonu (silah tonu 15'ten başlar; iki parmakla yaklaşık yarım tur çevirmek yeter)
export const EGITIM_KALKAN_FREK = 35;
// Savunma adımlarında uyarı penceresi (saniye); gerçek savaşta kademeye göre 1,5-3 sn
export const EGITIM_PENCERE = 4.5;

const U = (o, uzay, kara) => (o === 'kara' ? kara : uzay);

// Adımlar. id mantığı seçer; metin adıma girerken okunur; kisa yanlış harekette hatırlatma; tamam adım bitince.
// silah/yon: savunma adımlarında uyarının türü ve geldiği yan; beklenen: doğru savunma.
export const ADIMLAR = [
  {
    id: 'nisan',
    metin: (o) => U(o,
      'Birinci adım, nişan. Eğitim dronunun motor sesi şu an sağ kulağında. Sesi iki kulakta eşit duyana kadar tek parmakla sağa kaydır; ses hangi yandaysa o yana kaydırırsın. Ses tam önüne gelince ince bir kilit tonu çalar ve telefon titrer.',
      'Birinci adım, nişan. Eğitim otomatının servo sesi şu an sağ kulağında. Sesi iki kulakta eşit duyana kadar tek parmakla sağa kaydır; ses hangi yandaysa o yana kaydırırsın. Ses tam önüne gelince ince bir kilit tonu çalar ve telefon titrer.'),
    kisa: 'Sesi ortala: ses hangi yandaysa tek parmakla o yana kaydır, kilit tonunu bekle.',
    tamam: 'Kilitlendin.',
  },
  {
    id: 'ates',
    metin: (o) => U(o, 'İkinci adım, ateş. Kilitliyken tek parmakla bir kez dokun: lazer bataryası ateşler.', 'İkinci adım, ateş. Kilitliyken tek parmakla bir kez dokun: tüfeğin ateşler.'),
    kisa: 'Tek parmakla bir kez dokun: ateş. Kilit kaçtıysa önce sesi yeniden ortala.',
    tamam: (o) => U(o, 'İsabet, ama hedefin kalkanı atışın çoğunu yuttu.', 'İsabet, ama hedefin zırhı atışın çoğunu yuttu.'),
  },
  {
    id: 'frekans',
    metin: (o) => U(o,
      'Üçüncü adım, kalkan frekansı. Her düşman kalkanının bir tonu var. Ekrana basılı tutarsan o tonu ve durumu duyarsın. İki parmağını ekrana koyup saat yönünde çevir: silahının tonu yükselir; ters yöne çevirirsen alçalır. İki ton aynı olunca eşleşti denir ve kalkan delinebilir olur.',
      'Üçüncü adım, zırh frekansı. Her düşman zırhının bir tonu var. Ekrana basılı tutarsan o tonu ve durumu duyarsın. İki parmağını ekrana koyup saat yönünde çevir: silahının tonu yükselir; ters yöne çevirirsen alçalır. İki ton aynı olunca eşleşti denir ve zırh delinebilir olur.'),
    kisa: 'İki parmağını ekrana koy ve saat yönünde çevir; basılı tutarak hedefin tonunu dinle.',
    tamam: 'Eşleşti.',
  },
  {
    id: 'ates2',
    metin: () => 'Şimdi yine tek parmakla dokun: delik açılan yere tam hasar.',
    kisa: 'Tek parmakla dokun: ateş.',
    tamam: 'Tam isabet.',
  },
  {
    id: 'agir',
    metin: (o) => U(o,
      'Dördüncü adım, torpido. Kilitliyken tek parmakla yukarı kaydır. Torpido ağır vurur ama iki turda bir dolar.',
      'Dördüncü adım, ağır saldırı. Kilitliyken tek parmakla yukarı kaydır: el bombası ya da ağır atış. Ağır vurur ama iki turda bir dolar.'),
    kisa: 'Kilitliyken tek parmakla yukarı kaydır.',
    tamam: (o) => U(o, 'Torpido isabet etti.', 'Ağır saldırı isabet etti.'),
  },
  {
    id: 'kalkan',
    savunma: true,
    silah: { uzay: 'plazma', kara: 'mermi' },
    yon: 'sag',
    beklenen: 'kalkan',
    metin: (o) => U(o,
      'Beşinci adım, kalkan. Şimdi sıra düşmanda. Saldırmadan önce silahını doldurur; bunu bir uyarı sesinden duyarsın. Uyarı sesini duyunca hemen iki parmakla bir kez dokun: kalkan açılır. Hazır olunca tek parmakla dokun; uyarı birkaç saniye içinde gelir.',
      'Beşinci adım, siper. Şimdi sıra düşmanda. Saldırmadan önce silahını kurar; bunu bir uyarı sesinden duyarsın. Uyarı sesini duyunca hemen iki parmakla bir kez dokun: siper alırsın. Hazır olunca tek parmakla dokun; uyarı birkaç saniye içinde gelir.'),
    kisa: (o) => 'Uyarı sesini duyunca iki parmakla dokun: ' + U(o, 'kalkan.', 'siper.'),
    tamam: (o) => U(o, 'Kalkan darbeyi tuttu.', 'Siper darbeyi tuttu.'),
  },
  {
    id: 'kacinma',
    savunma: true,
    silah: { uzay: 'plazma', kara: 'mermi' },
    yon: 'sol',
    beklenen: 'kacinma',
    metin: (o) => U(o,
      'Altıncı adım, kaçınma. Kalkan her darbede ısınır; kaçınmak onu dinlendirir. Uyarı sesi hangi kulaktan geliyorsa tek parmakla ters yöne kaydır. Bu kez saldırı soldan gelecek: sesi duyunca sağa kaydır. Hazır olunca tek parmakla dokun.',
      'Altıncı adım, kaçınma. Siper her darbede yıpranır; yana atlamak onu korur. Uyarı sesi hangi kulaktan geliyorsa tek parmakla ters yöne kaydır. Bu kez saldırı soldan gelecek: sesi duyunca sağa kaydır. Hazır olunca tek parmakla dokun.'),
    kisa: 'Uyarı sesi soldan: tek parmakla sağa kaydır.',
    tamam: (o) => U(o, 'Kaçtın; mermi boş uzayı yırttı.', 'Yana atladın; mermi boşa gitti.'),
  },
  {
    id: 'karsi',
    savunma: true,
    silah: { uzay: 'torpido', kara: 'mermi' },
    yon: 'sag',
    beklenen: 'karsi',
    metin: (o) => U(o,
      'Yedinci adım, karşı ateş. Torpido gibi yavaş mermiler havada vurulabilir. Ağır bir basınç tahliyesi ve roket kükremesi duyunca tek parmakla çift dokun: karşı ateş. Hazır olunca tek parmakla dokun.',
      'Yedinci adım, karşı ateş. Tüfek kurma şakırtısını duyunca tek parmakla çift dokun: düşmanın namlusuna karşı ateş açarsın. Hazır olunca tek parmakla dokun.'),
    kisa: 'Uyarı sesini duyunca tek parmakla çift dokun.',
    tamam: 'İki patlama birbirini yok etti.',
  },
  {
    id: 'yetenek',
    metin: (o) => U(o,
      'Sekizinci adım, yetenekler. Kendi sırandayken tek parmakla aşağı kaydır: kaptanın ve subayların yetenekleri, sonra sarf malzemeleri sırayla okunur. Birini seçince tek parmakla çift dokun: kullan. Şimdi aşağı kaydır, sonra çift dokun.',
      'Sekizinci adım, yetenekler. Kendi sırandayken tek parmakla aşağı kaydır: kaptanın ve refakatçinin yetenekleri, sonra sarf malzemeleri sırayla okunur. Birini seçince tek parmakla çift dokun: kullan. Şimdi aşağı kaydır, sonra çift dokun.'),
    kisa: 'Önce tek parmakla aşağı kaydır, sonra çift dokun.',
    tamam: 'Yetenek kullanıldı. Her yetenek kullanıldıktan sonra birkaç tur bekler.',
  },
  {
    id: 'durum',
    metin: () => 'Son adım, durum. Savaşın ortasında kaybolursan iki parmakla bir kez dokun ya da basılı tut: hedefin canı, nerede olduğu ve kendi durumun okunur. Şimdi iki parmakla dokun.',
    kisa: 'İki parmakla bir kez dokun.',
    tamam: '',
  },
];

export function adimMetni(adim, ortam, alan) {
  const x = adim[alan];
  return typeof x === 'function' ? x(ortam) : x || '';
}

export const GIRIS = {
  uzay: 'Uzay savaş eğitimi. Gerçek bir çatışmaya girmeden önce taktik subayı seni simülatöre alıyor. Burada hasar almazsın; bir hareketi yanlış yaparsan adım yinelenir. Dokuz adım var.',
  kara: 'Kara çatışması eğitimi. İlk çatışmadan önce ekip, eğitim otomatıyla tatbikat yapıyor. Burada hasar almazsın; bir hareketi yanlış yaparsan adım yinelenir. Dokuz adım var.',
};
export const BITIS = {
  uzay: 'Uzay savaş eğitimi tamam. Özet: sesi ortala ve kilit tonunu bekle, dokun ateş, yukarı kaydır torpido, iki parmakla çevir kalkan tonu. Uyarıda iki parmakla dokun kalkan, ters yana kaydır kaçınma, torpidoya çift dokun. Aşağı kaydır yetenek, iki parmakla dokun durum. Eğitimi menüdeki Savaş eğitimi başlığından yineleyebilirsin.',
  kara: 'Kara çatışması eğitimi tamam. Özet: sesi ortala ve kilit tonunu bekle, dokun ateş, yukarı kaydır ağır saldırı, iki parmakla çevir zırh tonu. Uyarıda iki parmakla dokun siper, ters yana kaydır kaçınma, tüfek şakırtısına çift dokun. Aşağı kaydır yetenek, iki parmakla dokun durum. Eğitimi menüdeki Savaş eğitimi başlığından yineleyebilirsin.',
};
export const SONRA_GERCEK = 'Simülasyon kapandı. Şimdi gerçek çatışma!';
