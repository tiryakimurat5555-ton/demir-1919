// Beşinci görev: Antrepo (birinci perde, Karaköy). Saf JavaScript; gorev1.js'i içe aktarmaz.
//
// Çarşamba gecesi, saat on. Ferrante'nin antreposunda son sandıklar mavnaya yükleniyor; Delorme oradadır.
// Ekip yerini seçer: Rıza namuslu birkaç polisle ön kapıda, Süleyman kayığıyla denizde ya da Nermin hanın
// damında fotoğraf makinesiyle. Arif arka kapıdan içeri süzülür: bekçinin ve Delorme'un adımları arasında,
// Delorme'un sandığın üstüne bıraktığı deri çantaya (Sabri'nin mektubundaki çanta) uzanır. Nasıl olursa olsun
// yüzleşme gelir: Delorme'a çok yaklaşmak, yakalanmak ya da çantayla dışarı çıkmak. Delorme bu perdede yakalanmaz;
// ama ardında bir şey bırakır: Selanik.
//
// d alanları: gorev 5, gorevGun, bayrak.*

const bayrak = (d, k) => d.bayrak[k];
const delilVar = (d, id) => d.deliller.includes(id);
function delilEkle(d, id) {
  if (delilVar(d, id)) return false;
  d.deliller.push(id);
  return true;
}
const gunDakika = (d) => ((d.dakika % 1440) + 1440) % 1440;
const g5Mi = (d) => d.gorev === 5;
const uzak = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

export const DELORME_YERI = { x: 15.5, y: 15.8 };
export const YUZLESME_MENZILI = 4;

export const G5_DELILLER = {
  salonique_n: {
    ad: 'Deri çantadaki telgraf',
    tarif: 'SALONIQUE. N. 23 ARALIK. FOTOGRAF ONEMLI. HAMAL CANLI KALSIN. Altında yine tek harf: R. Hamal sensin. Biri seni canlı istiyor.',
  },
  mavna_listesi: {
    ad: 'Mavnanın yük listesi',
    tarif: 'Deri çantada, Delorme\'un temiz el yazısıyla: Mavna Ayşegül, yirmi sandık, Pire. Oradan Santa Lucia\'nın kardeş gemisine. Gümrük damgası: perşembe sabahı.',
  },
  delorme_fotografi: {
    ad: 'Delorme\'un fotoğrafı',
    tarif: 'Nermin hanın damından çekti: fenerin ışığında, rıhtımda, paltosunun yakası kalkık bir adam. Yüzü ilk kez belli. Lucien Delorme.',
  },
};

export const G5_NESNELER = [
  {
    id: 'canta',
    ad: 'Sandığın üstündeki deri çanta',
    mekan: 'antrepo',
    x: 20.5,
    y: 25.5,
    mevcut: (d) => g5Mi(d) && !bayrak(d, 'cantaAlindi') && !bayrak(d, 'g5Yuzlesti'),
    giris: 'Antreponun dip köşesinde, bir sandığın üstüne bırakılmış deri bir çanta. Kayışı sarkıyor. Sabri\'nin yarım mektubu: deri bir çanta varmış.',
    eylemler: [
      {
        id: 'al',
        etiket: 'Çantayı kayışından al',
        gurultu: 25,
        yap: (d) => {
          d.bayrak.cantaAlindi = true;
          return {
            metin: 'Deri çanta, köşeleri pirinç, kilidi açık; Delorme bir an bile bırakmayacağını düşünmüş olmalı. Kayışı parmağına dolayıp sandıktan kaldırıyorsun. Kapağı bir parmak aralıyorsun; kapının aralığından sızan sokak fenerinin ışığı yetiyor. Üstte bir telgraf kâğıdı, büyük harfler: SALONIQUE. N. 23 ARALIK. FOTOGRAF ONEMLI. HAMAL CANLI KALSIN. Altında yine tek harf: R. Hamal sensin. Biri seni canlı istiyor. Altında katlanmış bir liste, Delorme\'un temiz, eğik el yazısıyla: Mavna Ayşegül, yirmi sandık, Pire; oradan Santa Lucia\'nın kardeş gemisine. Kapağı kapatıyorsun. Şimdi okuma zamanı değil; önce buradan çık.',
            delil: ['salonique_n', 'mavna_listesi'],
          };
        },
      },
    ],
  },
];

// --- Sahneler ---
export const G5_SAHNELER = {
  g5_cagri: {
    ortam: 'ortam_han',
    baslik: 'Çarşamba',
    paragraflar: (d) =>
      [
        'Çarşamba akşamı. Kalafatçı Hanı\'nın avlusunda beş kişi: sen, Cemil, Nermin, Rıza ve Süleyman.',
        bayrak(d, 'suleymanYarali') ? 'Süleyman\'ın kolları hâlâ sargılı; ama kayığa binerim, diyor, kürek çekmem gerekmez, dümen tutarım.' : 'Süleyman pipo tütününü bastırıyor; elleri sakin.',
        bayrak(d, 'halimSonu') === 'sakli'
          ? 'Mahzendeki Halim saat ona doğru yükleme olacağını bir daha söyledi. Mavna arka rıhtıma yanaşacakmış.'
          : 'Halim\'in son sözü kulağında: Çarşamba gecesi, saat on. Delorme orada olacak.',
      ].filter(Boolean),
    secenekler: [{ etiket: 'Planı konuşalım', yap: (d) => gorev5Baslat(d), sonra: 'g5_plan' }],
  },
  g5_plan: {
    ortam: 'ortam_han',
    baslik: 'Plan',
    paragraflar: [
      'İçeriye arka kapıdan sen gireceksin; bunu herkes biliyor. Bekçinin adımlarını tanıyorsun. Ama ekip nerede duracak?',
      'Rıza: Galata karakolunda hâlâ namuslu üç polis tanırım. Ön kapıda beklerler; işaret verirsen girerler. Süleyman: Mavna denizden gelecek. Kayığımla karanlıkta beklerim. Nermin: Hanın damından antreponun rıhtım kapısı görünüyor. Fotoğraf makinemle beklerim; o adamın yüzünü bir kez görürsek bir daha saklayamaz.',
      'Cemil gözlüklerini siliyor: Ben yaralıya bakarım. Ki olacak.',
    ],
    secenekler: [
      { etiket: 'Rıza Bey polislerle ön kapıda.', yap: (d) => (d.bayrak.g5Plan = 'polis'), sonra: 'g5_plan_son' },
      { etiket: 'Süleyman Kaptan kayığıyla denizde.', yap: (d) => (d.bayrak.g5Plan = 'deniz'), sonra: 'g5_plan_son' },
      { etiket: 'Nermin damda, fotoğraf makinesiyle.', yap: (d) => (d.bayrak.g5Plan = 'foto'), sonra: 'g5_plan_son' },
    ],
  },
  g5_plan_son: {
    ortam: 'ortam_rihtim',
    baslik: 'Saat on',
    paragraflar: (d) => [
      d.bayrak.g5Plan === 'polis'
        ? 'Rıza bastonunu alıp karanlığa yürüyor. İşaret, diyor: üç kısa ıslık. Duyamazsam yine de gelirim.'
        : d.bayrak.g5Plan === 'deniz'
          ? 'Süleyman kayığını sessizce iskeleden çözüyor. Mavnayı görürsem yolunu keserim, diyor. Denizi bana bırak.'
          : 'Nermin Kodak\'ını paltosunun altına saklayıp hanın merdivenlerine yöneliyor. Işık olursa çekerim, diyor. Sen yeter ki onu ışığa çıkar.',
      'Antreponun arka kapısı açık; yükleme var. İçeriden zincir sesleri, alçak sesler, bir fenerin gıcırtısı.',
      'Delorme rıhtıma bakan kapının yanında, sandıkların başında. Bekçi feneriyle dolaşıyor. Deri bir çanta, dip köşede bir sandığın üstünde duruyor; Yorgo\'nun söylediği gibi bu adam hiçbir şeyi yanından ayırmaz, ama bu gece ellerinin boş olması gerekiyor.',
    ],
    secenekler: [{ etiket: 'Arka kapıya git', sonra: null }],
    bitisSozu: 'Beşinci görev: Antrepo. Saat on. Antreponun arka kapısı, han ile antreponun arasındaki geçitte. İçeride yavaş yürü; bekçinin ve Delorme\'un adımlarını dinle.',
  },
  g5_yuzlesme: {
    ortam: 'ortam_depo',
    ortamOran: 0.5,
    baslik: 'Delorme',
    paragraflar: (d) => {
      const nasil = bayrak(d, 'g5Nasil');
      const giris =
        nasil === 'yakalandi'
          ? 'Bekçinin eli enseni kavrıyor; seni sandıkların arasından sürükleyip fenerin ışığına atıyor. Işığın ötesinde biri ayağa kalkıyor. Lavanta.'
          : nasil === 'canta'
            ? 'Arka kapıdan geçidin karanlığına çıktığın an bir kibrit çakılıyor. Geçidin duvarına yaslanmış bir adam; sigarasının ateşi elinin içinde. Lavanta. Çantam, diyor yumuşak bir sesle. Ya da Sabri\'nin çantası. Ne fark eder.'
            : 'Bir sandığın gölgesinden çıktığın an ses geliyor, kusursuz ve yumuşak bir Türkçeyle: Yaklaş, Arif Bey. Seni bekliyordum. Lavanta.';
      return [
        giris,
        'Lucien Delorme. Kırk yaşlarında, temiz tıraşlı, siyah paltolu. Sesi hiç yükselmiyor. Seddülbahir\'de bir bölüğün tek sağ kalanı, diyor. Kalafatçı Hanı, üç numara. Gece uyumazsın. Sağ kulağın daha iyi duyar. Ben de seni çok iyi tanıyorum.',
        'Sabri\'yi neden öldürdün?',
        'Delorme omuz silkiyor. Ateşçi bir sandığı kırdı, bir çantayı açtı, bir kâğıdı yuttu. Ben yalnızca düzeni korurum. Sen de korursun; o yüzden yaşıyorsun. Biri seni canlı istiyor, Arif Bey. Yoksa bu konuşmayı yapmazdık.',
        bayrak(d, 'g5Plan') === 'polis' ? 'Dışarıda, çok uzakta, bir bastonun taşa vuruşu. Rıza işareti bekliyor.' : '',
      ].filter(Boolean);
    },
    secenekler: [
      {
        etiket: 'Üstüne atıl.',
        yap: (d) => {
          d.bayrak.yuzlesmeSecim = 'saldir';
          d.bayrak.yaraKol = true;
          d.travma = (d.travma || 0) + 1;
        },
        sonra: 'g5_sonuc',
      },
      {
        etiket: 'Konuştur. Vakit kazan.',
        yap: (d) => {
          d.bayrak.yuzlesmeSecim = 'oyala';
        },
        sonra: 'g5_sonuc',
      },
      {
        etiket: 'Cebindeki Manastır fotoğrafını ona göster.',
        kosul: (d) => delilVar(d, 'fotograf'),
        yap: (d) => {
          d.bayrak.yuzlesmeSecim = 'fotograf';
          d.bayrak.fotografGosterildi = true;
        },
        sonra: 'g5_sonuc',
      },
    ],
  },
  g5_sonuc: {
    ortam: 'ortam_depo',
    efekt: ['silah'],
    baslik: 'Gece',
    paragraflar: (d) => {
      const s = bayrak(d, 'yuzlesmeSecim');
      const plan = bayrak(d, 'g5Plan');
      const p = [];
      if (s === 'saldir')
        p.push(
          'Üstüne atılıyorsun. Delorme kıpırdamıyor bile; son anda bir adım yana çekiliyor ve bileğinin içinden bir bıçak parlıyor. Kolunda soğuk bir çizgi, sonra sıcak. Kum. Barut. Biri adını bağırıyor. Yere düştüğünde Delorme çoktan rıhtım kapısında.',
        );
      else if (s === 'fotograf')
        p.push(
          'Fotoğrafı fenerin ışığına tutuyorsun. Delorme ilk kez susuyor. Uzun süre bakıyor; örgülü saçlı genç kadına, bahçe kapısına. Ne kadar benziyorsunuz, diyor sonunda, alçak sesle; kendine söyler gibi. Sonra gülümsüyor. Saklayın onu, Arif Bey. Birisi onu sizden almak isteyecek. Ben değil.',
        );
      else
        p.push(
          'Konuşturuyorsun. Ferrante\'yi, Nazım Bey\'i, Halim\'i soruyorsun; Delorme cevap veriyor, sabırla, bir öğretmen gibi. Her cevap bir dakika. Her dakika bir ıslık mesafesi.',
        );
      if (plan === 'polis' && s === 'oyala') {
        d.bayrak.sandikSonu = 'el_konuldu';
        p.push('Üç kısa ıslık çalıyorsun; ön kapıda düdükler. Rıza\'nın polisleri içeri dalıyor. Ferrante\'nin adamları sandıkların arasına dağılıyor; ikisi yakalanıyor. Yirmi sandığa el konuluyor. Delorme mi? Rıhtım kapısından denize, karanlıkta bekleyen bir motora. Bir motor homurtusu, sonra hiçbir şey.');
      } else if (plan === 'polis') {
        d.bayrak.sandikSonu = 'yarim';
        p.push('Rıza\'nın polisleri gürültüye koşuyor ama geç. Mavna yirmi sandığın yarısıyla iskeleden çözülmüş bile. Delorme denizde, motorun kıçında, sigarasının ateşi elinin içinde.');
      } else if (plan === 'deniz') {
        d.bayrak.sandikSonu = 'batti';
        p.push('Rıhtımda bir çatırtı: Süleyman\'ın kayığı karanlıktan çıkıp mavnanın dümenine bindiriyor. Mavna yan yatıyor; sandıklar birer birer Haliç\'in dibine. Delorme\'un motoru bir an duruyor, sonra uzaklaşıyor. Süleyman denizde, ıslak, gülüyor.');
      } else {
        d.bayrak.sandikSonu = 'gitti';
        delilEkle(d, 'delorme_fotografi');
        p.push('Delorme rıhtım kapısından motoruna geçerken fenerin ışığı yüzüne vuruyor. Hanın damında bir deklanşörün tıkırtısı; buradan duyulmaz ama sen duyuyorsun. Mavna yükünü alıp gidiyor. Ama artık Delorme\'un bir yüzü var.');
      }
      p.push(
        bayrak(d, 'fotografGosterildi')
          ? 'Motor uzaklaşmadan önce Delorme\'un sesi suyun üstünden geliyor: Selanik\'te görüşürüz, Arif Bey. Biri sizi bekliyor.'
          : 'Motor uzaklaşmadan önce Delorme\'un sesi suyun üstünden geliyor: Selanik\'te görüşürüz, Arif Bey. Fotoğrafınızı iyi saklayın.',
      );
      return p;
    },
    secenekler: [{ etiket: 'Devam', sonra: 'g5_kapanis' }],
  },
  g5_gec: {
    ortam: 'ortam_rihtim',
    baslik: 'Geç kalındı',
    paragraflar: (d) => [
      'Gece yarısı. Antreponun içi boşalıyor; mavna iskeleden çözülmüş, Delorme\'un motoru karanlıkta uzaklaşıyor. Onu bu gece göremedin.',
      bayrak(d, 'g5Plan') === 'deniz' ? 'Süleyman mavnanın peşine düşüyor ama yalnız bir kayık bir mavnayı durduramaz.' : 'Ekip bir şey yapamadan her şey bitiyor.',
    ],
    secenekler: [
      {
        etiket: 'Devam',
        yap: (d) => {
          d.bayrak.yuzlesmeSecim = 'yok';
          d.bayrak.sandikSonu = 'gitti';
          d.bayrak.g5Yuzlesti = true;
        },
        sonra: 'g5_kapanis',
      },
    ],
  },
  g5_kapanis: {
    ortam: 'ortam_han',
    baslik: 'Siyakat',
    paragraflar: (d) =>
      [
        'Şafak. Cemil kolunu sarıyor ya da sarmayı teklif ediyor; sen ona belgeyi uzatıyorsun.',
        delilVar(d, 'salonique_n')
          ? 'Çantadaki telgrafı ikinci kez okuyorsun: SALONIQUE. N. 23 ARALIK. FOTOGRAF ONEMLI. HAMAL CANLI KALSIN. Delorme\'un seni neden öldürmediği şimdi belli.'
          : 'Delorme\'un son sözü aklından çıkmıyor: Selanik.',
        'Gülce avlunun kapısında, şalına sarınmış. Belgeyi görüyor; alt yarıdaki kıvrık harfleri.',
        bayrak(d, 'gulceKamil') === 'soyle'
          ? 'Babam bana öğretti, diyor. Siyakat. Maliye kâtiplerinin yazısı. İmzalamadığı o kâğıt da siyakatla yazılmıştı. Ver, okuyayım.'
          : 'Ben siyakat okurum, diyor. Nereden mi? Bir gün anlatırım. Ver.',
        'Beşinci görevin sonu. Karaköy\'de dolaşmayı sürdürebilirsin. Altıncı görev, Siyakat, bir sonraki adımda: belgenin alt yarısı ve dört şehir.',
      ].filter(Boolean),
    secenekler: [{ etiket: 'Devam', yap: (d) => gorev5Bitir(d), sonra: null }],
    bitisSozu: 'Kalafatçı Hanı\'nın avlusu, perşembe sabahı. Menüden Görev\'i ve Yerler\'i her zaman açabilirsin.',
  },
};

// --- Başlangıç ve bitiş ---
export function gorev5Baslat(d) {
  const g4 = d.gorevGun;
  const carsamba = g4 + 2;
  if (d.gun < carsamba) d.gun = carsamba;
  d.bayrak.g4Gun = g4;
  d.gorev = 5;
  d.gorevGun = d.gun;
  d.dakika = 21 * 60 + 40;
  d.gece = true;
  d.sonSaat = 21;
  d.sonVapur = d.dakika;
  d.mekan = 'han';
  d.oyuncu = { x: 37, y: 19, yon: Math.PI };
  d.yakin = {};
  d.oto = null;
  d.suphe = 0;
  d.bayrak.antrepoKapaliGece = null;
  if (!d.kesif) d.kesif = {};
  d.kesif.kapi_antrepo_arka = true;
}

function gorev5Bitir(d) {
  d.bayrak.g5Bitti = true;
  d.gun = d.gorevGun + 1;
  d.dakika = 8 * 60;
  d.gece = false;
  d.sonSaat = 8;
  d.sonVapur = d.dakika;
  d.mekan = 'han';
  d.oyuncu = { x: 37, y: 19, yon: Math.PI };
  d.yakin = {};
  d.oto = null;
  d.suphe = 0;
}

// Dördüncü görev bitince çarşamba akşamı çağrı; beşinci görevde yüzleşme ve geç kalma
export function gorev5Ilerle(d) {
  if (d.sahne) return;
  const gd = gunDakika(d);
  if (d.gorev === 4 && bayrak(d, 'g4Bitti')) {
    const g4 = d.gorevGun;
    if (d.gun > g4 + 2 || (d.gun === g4 + 2 && gd >= 20 * 60 + 30)) d.sahne = 'g5_cagri';
    return;
  }
  if (!g5Mi(d) || bayrak(d, 'g5Bitti') || bayrak(d, 'g5Yuzlesti')) return;
  if (d.mekan === 'antrepo' && uzak(d.oyuncu, DELORME_YERI) <= YUZLESME_MENZILI && gd >= 21 * 60 + 45) {
    yuzles(d, 'yaklasti');
    return;
  }
  if (d.mekan === 'dis' && bayrak(d, 'cantaAlindi')) {
    yuzles(d, 'canta');
    return;
  }
  if (d.gun > d.gorevGun || gd >= 23 * 60 + 50) d.sahne = 'g5_gec';
}

function yuzles(d, nasil) {
  d.bayrak.g5Yuzlesti = true;
  d.bayrak.g5Nasil = nasil;
  d.oto = null;
  d.suphe = 0;
  d.sahne = 'g5_yuzlesme';
}

// dunya.js yakalanma anında çağırır: beşinci görevde antrepoda yakalanan kapı dışına atılmaz, Delorme'un önüne sürüklenir
export function g5Yakalanma(d) {
  if (!g5Mi(d) || bayrak(d, 'g5Yuzlesti') || d.mekan !== 'antrepo') return false;
  yuzles(d, 'yakalandi');
  return true;
}

export function g5Ipucu(d) {
  if (bayrak(d, 'g5Bitti')) return 'Beşinci görev bitti. Gülce belgenin siyakat yazısını okuyacak. Altıncı görev, Siyakat, bir sonraki adımda.';
  if (bayrak(d, 'g5Yuzlesti')) return 'Hana dön.';
  return 'Antreponun arka kapısı, han ile antreponun arasındaki geçitte. İçeride Delorme rıhtım kapısının yanında, sandıkların başında; bekçi feneriyle dolaşıyor. Dip köşede bir sandığın üstünde deri bir çanta var. Yavaş yürü; ikisinin de adımlarını dinle.';
}
