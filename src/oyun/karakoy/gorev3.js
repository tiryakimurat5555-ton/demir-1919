// Üçüncü görev: On Yedi Numara (birinci perde, Pera). Saf JavaScript; gorev1.js'i içe aktarmaz.
//
// Cumartesi gecesi. Cemil'in Cihangir'deki evinde gazeteci Nermin Hanım'la tanışılır. Arif, Cemil'in eski
// takımıyla bir bey kılığında Mercure Kulübü'ne girer. Salonda baş garson Achille gözcüdür; barmen Yorgo
// Süleyman'ın eski aşçı yamağıdır (garson ceketi, yemek asansörü, anahtar). Servis koridorundaki yemek
// asansöründen on yedi numaradaki toplantı dinlenir: Delorme, Ferrante, Nazım Bey. Toplantı dağılınca
// anahtarla odaya çıkılır: rüşvet defteri, kül tablası, telgraf ve Arif'in kendi dosyası.
// Koridorda yakalanan kulüpten atılır; o zaman eksik delilleri Nermin getirir.
//
// d alanları: gorev 3, gorevGun, kilik ('bey' | 'usak'), bayrak.*

import { TOPLANTI_BAS, TOPLANTI_BIT, oyalaniyor } from './pera';
import { gorev4Baslat } from './gorev4';

const bayrak = (d, k) => d.bayrak[k];
const delilVar = (d, id) => d.deliller.includes(id);
function delilEkle(d, id) {
  if (delilVar(d, id)) return false;
  d.deliller.push(id);
  return true;
}
const gunDakika = (d) => ((d.dakika % 1440) + 1440) % 1440;
const ilkGun = (d) => d.gun === d.gorevGun;
const g3Mi = (d) => d.gorev === 3;

export const G3_DELILLER = {
  oda17_kira: {
    ad: 'On yedinin kiracısı',
    tarif: 'İngiliz yüzbaşının dilinden: on yedi numaralı oda her cumartesi Ferrante adına tutulur, hesabı da Ferrante öder. Garsonlar o kata çıkmaz.',
  },
  hargreaves_zarf: {
    ad: 'Cumartesi zarfları',
    tarif: 'İngiliz yüzbaşı sarhoşken anlattı: her cumartesi fesli, gözlüklü bir Maliye beyi kulübe gelir ve çıkarken ceketinin cebi bir zarfla şişkin olur.',
  },
  dinle_toplanti: {
    ad: 'Yemek asansöründen duyulanlar',
    tarif: 'On yedideki toplantı: lavantalı adamın adı Delorme; yanında Ferrante ve Maliye\'den Nazım Bey. Türkçe konuşuyorlar, Nazım Bey\'in hatırına. Halim çok konuşuyormuş. Bir de hamalın dosyası.',
  },
  santa_lucia: {
    ad: 'Santa Lucia\'nın yükü',
    tarif: 'Santa Lucia pazartesi gecesi Odesa\'ya kalkıyor. Altmış sandık: yarısı Beyazlara, yarısı Kızıllara. Savaş ne kadar uzarsa o kadar iyi, diyor Delorme.',
  },
  madam_n: {
    ad: 'Selanik telgrafı',
    tarif: 'SALONIQUE. MADAM N. MANASTIR FOTOGRAFINI ISTIYOR. HAMALDA OLABILIR. Altında kanatlı bir anahtar yerine yalnızca bir harf: R.',
  },
  rusvet_defteri: {
    ad: 'On yedinin defteri',
    tarif: 'Siyakatla tutulmuş ince bir defter; kenarlarında Fransızca notlar. Okuyabildiğin kadarı: N. B., Maliye, ayda iki yüz lira. H., Karaköy, ayda otuz. Gümrük, liman, bir de bir Paşa\'nın kapısı. Her satırın başında küçük bir anahtar.',
  },
  kul_tablasi: {
    ad: 'Lavanta kokulu izmaritler',
    tarif: 'On yedinin kül tablasında ince, pahalı Fransız sigaraları. Kâğıtlarının ucunda kabartma iki harf: L. D. Tablanın üstünde lavanta kokusu.',
  },
  delorme_kart: {
    ad: 'Vestiyerdeki kartvizit',
    tarif: 'Lavanta kokulu bir paltonun cebinden: Lucien Delorme, İthalat ve İhracat, Grand Rue de Péra. Arkasında kurşun kalemle: Karaköy, K. Hanı, 3.',
  },
  arif_dosyasi: {
    ad: 'Arif Demir\'in dosyası',
    tarif: 'On yedideki masanın çekmecesinde, adının yazılı olduğu bir dosya: doğum yeri, baban, esaretin, Seddülbahir, Kalafatçı Hanı\'ndaki odan. Ailenin satırında tek bir not: Bkz. S.',
  },
};

export const G3_CIKARIMLAR = {
  delorme: {
    ifade: 'Sabri\'yi öldüren lavantalı adamın adı Lucien Delorme; on yedideki toplantıyı o yönetiyor.',
    kume: [['dinle_toplanti', 'kul_tablasi', 'delorme_kart'], ['lavanta_not', 'bicak_yarasi', 'paltolu', 'kulak_misafiri']],
    gerekli: true,
    gorev: 3,
  },
  sevkiyat: {
    ifade: 'Ferrante\'nin tüfekleri Santa Lucia ile Odesa\'ya gidiyor; iç savaşın iki tarafına birden.',
    kume: [['santa_lucia'], ['tufek', 'manifest', 'agirlik', 'mektup']],
    gerekli: true,
    gorev: 3,
  },
  rusvet: {
    ifade: 'Nazım Bey ve Komiser Halim kanatlı anahtarın maaşlı memurları.',
    kume: [['rusvet_defteri', 'hargreaves_zarf'], ['nazim_emri', 'halim_bulusma', 'halimin_adami', 'dinle_toplanti', 'oda17_kira']],
    gerekli: true,
    gorev: 3,
  },
  madam: {
    ifade: 'Selanik\'te Madam N. diye biri Sabri\'nin sakladığı Manastır fotoğrafının peşinde.',
    kume: [['madam_n'], ['fotograf']],
    gorev: 3,
  },
  dosya: {
    ifade: 'Delorme Arif\'i Sabri\'den önce de tanıyordu; dosyası Manastır\'a, ailesine kadar uzanıyor.',
    kume: [['arif_dosyasi'], ['madam_n', 'fotograf', 'lavanta_not']],
    gorev: 3,
  },
};

export const G3_YANLISLAR = [
  { gorev: 3, ifade: 'Nazım Bey bu işe zorla karıştırılmış; o da bir kurban.', duzeltme: 'Zorla karıştırılan adam ayda iki yüz lirayı deftere yazdırmaz, evlat.' },
  { gorev: 3, ifade: 'Delorme Fransız hükümetinin adamı.', duzeltme: 'Hükümetin adamı Halim\'e zarf vermez; hükümetin bütçesi vardır. Bu adam başka birine çalışıyor.' },
  { gorev: 3, ifade: 'Silahlar İstanbul\'da kalacak, şehirde kullanılacak.', duzeltme: 'Altmış sandık bir şehri değil, bir savaşı besler. Gemiye yükleniyorsa uzağa gidiyordur.' },
];

// --- Nesneler ---
const achilleEngel = (metin) => (d, ctx) => (ctx.kisiYakin && ctx.kisiYakin('achille', 7) && !oyalaniyor(d) ? metin : null);

export const G3_NESNELER = [
  {
    id: 'asansor',
    ad: 'Yemek asansörü',
    mekan: 'servis_koridoru',
    x: 244.3,
    y: 15,
    mevcut: (d) => g3Mi(d),
    giris: 'Duvarda, bel hizasında, sürgülü kapaklı bir yemek asansörü. Halatı yukarıya, üst katın karanlığına uzanıyor. Boşluktan yukarının sesleri boğuk boğuk iniyor.',
    eylemler: [
      {
        id: 'dinle',
        etiket: 'Kulağını asansör boşluğuna daya',
        yap: (d) => {
          const gd = gunDakika(d);
          if (bayrak(d, 'asansorDinlendi')) return { metin: 'Yukarıdan yalnızca sandalye gıcırtıları ve bardak sesleri geliyor. Söyleneceği söylendi.' };
          if (!ilkGun(d) || gd < TOPLANTI_BAS) return { metin: 'Boşluk sessiz. Yukarıda kimse yok; henüz.' };
          if (gd >= TOPLANTI_BIT - 5) return { metin: 'Yukarıdan sandalyeler itiliyor, kapı kapanıyor. Toplantı bitti; geç kaldın.' };
          d.bayrak.asansorDinlendi = true;
          d.sahne = 'g3_dinle';
          return { metin: '', sure: 20 };
        },
      },
    ],
  },
  {
    id: 'pano17',
    ad: 'Barın ucundaki anahtar panosu',
    mekan: 'kulup_salon',
    x: 238.5,
    y: 29.2,
    mevcut: (d) => g3Mi(d),
    giris: 'Barın ucunda, duvarda pirinç çengellere asılı oda anahtarları. Her birinin altında numarası.',
    eylemler: [
      {
        id: 'al',
        etiket: 'On yedinin anahtarını çengelden al',
        engel: achilleEngel('Elini uzattığın an baş garson Achille\'nin sesi: Mösyö? Anahtarlar müşterilere değil, bana sorulur. Elini geri çekiyorsun. Gözü artık üstünde.'),
        yap: (d) => {
          if (bayrak(d, 'anahtar17')) return { metin: 'On yedinin anahtarı zaten cebinde.' };
          d.bayrak.anahtar17 = true;
          return { metin: 'Pirinç anahtarı çengelden kaldırıp avucuna saklıyorsun. Üstünde kazınmış: 17. Kimse görmedi; sanırsın.' };
        },
      },
    ],
  },
  {
    id: 'vestiyer',
    ad: 'Vestiyer',
    mekan: 'kulup_salon',
    x: 221.5,
    y: 13.6,
    mevcut: (d) => g3Mi(d),
    giris: 'Kapının yanında paltoların ve şapkaların asılı durduğu vestiyer. Görevli kız sigara içmeye çıkmış.',
    eylemler: [
      {
        id: 'ara',
        etiket: 'Paltoların ceplerini yokla',
        engel: achilleEngel('Achille vestiyere doğru dönüyor. Bir paltoyu düzeltiyormuş gibi yapıp uzaklaşıyorsun.'),
        yap: (d) => {
          const gd = gunDakika(d);
          if (!ilkGun(d) || gd < TOPLANTI_BAS - 12 || gd >= TOPLANTI_BIT) return { metin: 'Paltoların cebinde mendiller, eldivenler, tiyatro biletleri. Dikkatini çeken bir şey yok.' };
          return {
            metin: 'Paltolardan biri lavanta kokuyor. Kalın, iyi dikilmiş, siyah. İç cebinde bir kartvizit: Lucien Delorme. Arkasında kurşun kalemle bir not: Karaköy, K. Hanı, 3. Senin odan. Üç numara.',
            delil: ['delorme_kart'],
          };
        },
      },
    ],
  },
  {
    id: 'defter17',
    ad: 'Masadaki deri defter',
    mekan: 'oda17',
    x: 244.5,
    y: 35,
    mevcut: (d) => g3Mi(d),
    giris: 'Yeşil çuha kaplı masanın üstünde, kurşun kalemin altında ince deri bir defter. Acele etmişler; unutmuşlar ya da bırakmışlar.',
    eylemler: [
      {
        id: 'oku',
        etiket: 'Defteri aç',
        yap: () => ({
          metin: 'Siyakat; okuyamıyorsun. Ama kenarlardaki Fransızca notlarda baş harfler ve rakamlar seçiliyor: N. B., Maliye, iki yüz. H., Karaköy, otuz. Gümrük, liman, bir Paşa\'nın kapısı. Her satırın başında minicik bir anahtar çizilmiş.',
          delil: ['rusvet_defteri'],
        }),
      },
      {
        id: 'al',
        etiket: 'Defteri ceketinin içine sok',
        kosul: (d) => delilVar(d, 'rusvet_defteri') && !bayrak(d, 'defterAlindi'),
        yap: (d) => {
          d.bayrak.defterAlindi = true;
          return { metin: 'Defteri ceketinin iç cebine sokuyorsun. Ağırlığı göğsüne bastırıyor. Yokluğunu sabah fark edecekler.' };
        },
      },
      { id: 'foto', etiket: 'Defterin sayfalarını fotoğrafla', foto: 'defter', kosul: (d) => delilVar(d, 'rusvet_defteri') },
    ],
  },
  {
    id: 'kul17',
    ad: 'Kül tablası',
    mekan: 'oda17',
    x: 246.5,
    y: 35.5,
    mevcut: (d) => g3Mi(d),
    giris: 'Masanın öbür ucunda gümüş bir kül tablası, ağzına kadar dolu.',
    eylemler: [
      {
        id: 'bak',
        etiket: 'İzmaritlere bak',
        yap: () => ({
          metin: 'İnce, pahalı Fransız sigaraları; hepsi yarıya kadar içilip bastırılmış. Kâğıtlarının ucunda kabartma iki harf: L. D. Tabladan lavanta kokusu yükseliyor.',
          delil: ['kul_tablasi'],
        }),
      },
    ],
  },
  {
    id: 'telgraf17',
    ad: 'Buruşturulmuş telgraf',
    mekan: 'oda17',
    x: 247.5,
    y: 33.5,
    mevcut: (d) => g3Mi(d),
    giris: 'Şöminenin önüne atılmış, yanmamış, buruşuk bir telgraf kâğıdı.',
    eylemler: [
      {
        id: 'ac',
        etiket: 'Kâğıdı düzelt, oku',
        yap: () => ({
          metin: 'SALONIQUE. MADAM N. MANASTIR FOTOGRAFINI ISTIYOR. HAMALDA OLABILIR. İmza yerine tek harf: R. Cebindeki fotoğraf birden ağırlaşıyor.',
          delil: ['madam_n'],
        }),
      },
    ],
  },
  {
    id: 'dosya17',
    ad: 'Masanın çekmecesi',
    mekan: 'oda17',
    x: 243.6,
    y: 35.5,
    mevcut: (d) => g3Mi(d) && !bayrak(d, 'dosyaKarar'),
    giris: 'Masanın çekmecesi yarı açık. İçinde karton bir dosya.',
    eylemler: [
      {
        id: 'ac',
        etiket: 'Dosyayı aç',
        yap: (d) => {
          d.sahne = 'g3_dosya';
          return { metin: '', delil: ['arif_dosyasi'] };
        },
      },
    ],
  },
  {
    id: 'masa_cemil',
    ad: 'Cemil\'in çalışma masası',
    mekan: 'cihangir',
    x: 202.5,
    y: 56,
    mevcut: (d) => g3Mi(d) && !bayrak(d, 'g3Bitti'),
    giris: 'Cemil\'in kâğıtlarla, kitaplarla dolu çalışma masası. Lambanın yeşil camı.',
    eylemler: [
      {
        id: 'anlat',
        etiket: 'Bildiklerini masaya dök',
        yap: (d) => {
          if (!g3Tamam(d)) return { metin: 'Kâğıtları masaya yayıyorsun ama parçalar henüz yerine oturmuyor. Panoda üç bağ eksik.' };
          d.sahne = 'g3_karar_oncesi';
          return { metin: '' };
        },
      },
    ],
  },
];

export function g3Tamam(d) {
  return Object.keys(G3_CIKARIMLAR)
    .filter((k) => G3_CIKARIMLAR[k].gerekli)
    .every((k) => d.teoriler.some((t) => t.dogru && t.cikarim === k));
}
const cikarimVar = (d, id) => d.teoriler.some((t) => t.dogru && t.cikarim === id);

function harca(d, kurus) {
  if (d.para < kurus) return false;
  d.para -= kurus;
  return true;
}

const kararSecenegi = {
  etiket: 'Bildiklerimi anlatayım; Cihangir\'e dönelim.',
  kosul: (d) => g3Tamam(d) && !bayrak(d, 'g3Bitti'),
  yap: (d) => {
    d.sahne = 'g3_karar_oncesi';
  },
};

// --- Konuşmalar ---
export const G3_KONUSMALAR = {
  nermin: {
    uygun: () => true,
    giris: (d) => {
      if (bayrak(d, 'g3Bitti')) return 'bitti';
      if (bayrak(d, 'kulupKapali') && !bayrak(d, 'nerminGetirdi')) return 'disari';
      return 'ilk';
    },
    dugumler: {
      ilk: {
        metin: (d) =>
          d.mekan === 'kulup_salon'
            ? 'Nermin yelpazesini açıyor, sesini müziğin altına saklıyor. Yüzbaşım viskisine dalmış. Ne istiyorsun?'
            : 'Nermin defterinden başını kaldırıyor. Söyle.',
        secenekler: [
          {
            etiket: 'Baş garsonu biraz oyalar mısın?',
            kosul: (d) => d.mekan === 'kulup_salon' && (d.bayrak.oyalaSayi || 0) < 2 && !oyalaniyor(d),
            yap: (d) => {
              d.bayrak.oyalaSayi = (d.bayrak.oyalaSayi || 0) + 1;
              d.bayrak.oyalaBitis = d.gun * 1440 + gunDakika(d) + 15;
              return 'Nermin parmağını kaldırıyor: Achille! Bu şarap mantar kokuyor. Baş garson koşarak geliyor; Nermin şişeyi, kadehi, mantarı, Bordeaux\'nun bağlarını tek tek soruyor. Çeyrek saatin var. Servis kapısı da, pano da şimdi kör.';
            },
          },
          {
            etiket: 'Yüzbaşından bir şey öğrenebildin mi?',
            kosul: (d) => d.mekan === 'kulup_salon' && gunDakika(d) >= 21 * 60 && !delilVar(d, 'hargreaves_zarf'),
            yap: (d) => {
              delilEkle(d, 'hargreaves_zarf');
              return 'Nermin dudaklarını kıpırdatmadan konuşuyor. Her cumartesi fesli, gözlüklü bir Maliye beyi geliyormuş. Çıkarken cebi şişkin oluyormuş. Yüzbaşım buna Türk usulü maaş dedi ve güldü. Gülmedim.';
            },
            sonra: 'ilk',
          },
          { etiket: 'Ağabeyini sorabilir miyim?', kosul: (d) => !bayrak(d, 'nerminCevdet'), sonra: 'cevdet' },
          kararSecenegi,
          { etiket: 'Sonra.' },
        ],
      },
      cevdet: {
        metin: () =>
          'Nermin yelpazesini kapatıyor. Cevdet. Sarıkamış, Ocak on beş. Donarak öldü; dağda, kaputsuz. Kaputları bir müteahhit satmıştı; kâğıt üstünde teslim edilmiş görünüyordu. O müteahhit şimdi Şişli\'de bir konakta oturuyor. Ben de o günden beri kâğıtların üstünde görünen ile görünmeyen arasındaki farkı yazıyorum.',
        secenekler: [
          {
            etiket: 'Bu adamlarda onu mu arıyorsun?',
            yap: (d) => {
              d.bayrak.nerminCevdet = 'soru';
              return 'Nermin sana bakıyor; ilk kez gerçekten. Hepsinde onu arıyorum, diyor. Hepsi aynı adam. Farklı paltolar giyiyorlar, o kadar.';
            },
            sonra: 'ilk',
          },
          {
            etiket: 'Ben Seddülbahir\'deydim. O kaputları ben de bekledim.',
            yap: (d) => {
              d.bayrak.nerminCevdet = 'anlat';
              d.nerminBag = (d.nerminBag || 0) + 1;
              return 'Nermin bir an susuyor. Sonra elini kolunun üstüne koyuyor; kimse görmesin diye çabucak. Demek o yüzden bu kadar sessizsin, diyor. Bir gün anlatırsın. Ben yazarım. Ama adını koymam, istersen.';
            },
            sonra: 'ilk',
          },
          {
            etiket: 'Bir şey söyleme. Başını eğ.',
            yap: (d) => {
              d.bayrak.nerminCevdet = 'sus';
              return 'Nermin yelpazesini yeniden açıyor. İyi, diyor. Teselli edenlerden yoruldum.';
            },
            sonra: 'ilk',
          },
        ],
      },
      disari: {
        metin: (d) => {
          const gd = gunDakika(d);
          if (gd < 22 * 60 + 50 && ilkGun(d)) return 'Nermin pencereden sana bakıyor; başını iki yana sallıyor: sonra.';
          d.bayrak.nerminGetirdi = true;
          const yeni = ['delorme_kart', 'santa_lucia', 'hargreaves_zarf'].filter((x) => delilEkle(d, x));
          return (
            'Nermin arka sokakta, kürk yakasını kaldırmış, seni bekliyor. Seni sokağa attıklarını gördüm, diyor. Ben de işimi yaptım. Vestiyerdeki lavantalı paltonun cebinden bir kart: Lucien Delorme. Yüzbaşım iki viskiden sonra Santa Lucia\'yı anlattı; pazartesi Odesa\'ya, altmış sandık. Bir de Maliye beyinin cumartesi zarfları. ' +
            (yeni.length ? 'Defterini aç.' : 'Ama bunları sen zaten bulmuşsun.')
          );
        },
        secenekler: [{ etiket: 'Sağ ol Nermin Hanım.' }, kararSecenegi],
      },
      bitti: {
        metin: () => 'Nermin kalemini kulağının arkasına sıkıştırıyor. Yazacak çok şey var, diyor. Çok az kâğıt.',
        secenekler: [{ etiket: 'Kâğıdı ben bulurum.' }],
      },
    },
  },

  cemil: {
    uygun: (d) => g3Mi(d),
    giris: (d) => (bayrak(d, 'g3Bitti') ? 'bitti' : 'ilk'),
    dugumler: {
      ilk: {
        metin: (d) =>
          d.mekan === 'kulup_salon'
            ? 'Cemil kadehini dudağına götürüyor, içmiyor. Doktorların içtiğini kimse görmemeli, diyor. Hastalar korkar.'
            : 'Cemil gözlüklerini siliyor. Söyle Arif.',
        secenekler: [
          {
            etiket: 'Lavantalı adamın adı Delorme.',
            kosul: (d) => (delilVar(d, 'dinle_toplanti') || delilVar(d, 'delorme_kart')) && !bayrak(d, 'cemilDelorme'),
            yap: (d) => {
              d.bayrak.cemilDelorme = true;
              return (
                'Cemil\'in eli kadehin üstünde donuyor. Delorme, diyor. Selanik, on iki. Binbaşı Fikri\'nin çadırında bir Fransız vardı; tüccar dediler. Kaza raporlarını imzalarken o çadırın kapısında duruyordu. Parmağında kanatlı bir yüzük. Adını kimse söylemezdi. ' +
                (bayrak(d, 'cemilFikri') === 'sert' ? 'Dokuzuncuyu yazmayacağım demiştim, değil mi? Onuncusu da o olmasın.' : 'Demek adı buymuş.')
              );
            },
            sonra: 'ilk',
          },
          kararSecenegi,
          { etiket: 'Sonra konuşuruz doktor.' },
        ],
      },
      bitti: {
        metin: () => 'Cemil çantasını kapatıyor. Uyu biraz, diyor. Kâbuslar da yorulur.',
        secenekler: [{ etiket: 'Deneyeceğim.' }],
      },
    },
  },

  hargreaves: {
    uygun: () => true,
    giris: () => 'ilk',
    dugumler: {
      ilk: {
        metin: () => 'İngiliz yüzbaşı seni süzüyor; kırmızı yüzü terli. Who are you? Ah, Nermin Hanım\'ın kuzeni! Otur, otur. Türkçem iyi; kötü Türklerden öğrendim.',
        secenekler: [
          {
            etiket: 'Bu kulüp çok gizemli, yüzbaşım. Üst kat kimin?',
            kosul: (d) => !delilVar(d, 'oda17_kira'),
            yap: (d) => {
              delilEkle(d, 'oda17_kira');
              return 'Yüzbaşı kahkahayı basıyor. Seventeen! On yedi numara. Her cumartesi Signor Ferrante tutar, hesabı da o öder. Garsonlar çıkamaz oraya. Ben de çıkamam; ben sadece bir yüzbaşıyım. Kartlarına dönüyor.';
            },
            sonra: 'ilk',
          },
          {
            etiket: 'Size bir viski ısmarlayayım (on kuruş).',
            kosul: (d) => !delilVar(d, 'hargreaves_zarf') && !bayrak(d, 'viski'),
            yap: (d) => {
              if (!harca(d, 10)) return 'Cebini yokluyorsun; on kuruş yok. Yüzbaşı omuz silkiyor.';
              d.bayrak.viski = true;
              delilEkle(d, 'hargreaves_zarf');
              return 'Viski geliyor. Yüzbaşı bardağı kaldırıyor: Türk usulü maaşa! Neye mi? Her cumartesi fesli bir Maliye beyi gelir, çıkarken cebi şişer. Herkes bilir. Kimse söylemez. Ben söyledim mi? Söylemedim.';
            },
            sonra: 'ilk',
          },
          { etiket: 'Kartlarınızda bol şans yüzbaşım.' },
        ],
      },
    },
  },

  yorgo: {
    uygun: () => true,
    giris: (d) => (bayrak(d, 'yorgoGuven') ? 'guven' : 'ilk'),
    dugumler: {
      ilk: {
        metin: () => 'Barmen bardağı ışığa tutuyor: kırk yaşlarında, kır bıyıklı, kolları dövmeli. Ne alırsınız mösyö?',
        secenekler: [
          {
            etiket: 'Süleyman Kaptan\'ın selamı var, Yorgo.',
            yap: (d) => {
              d.bayrak.yorgoGuven = true;
              const yanik = bayrak(d, 'kayikhaneYandi') === 'tam' || bayrak(d, 'suleymanYarali');
              return (
                'Bardak elinde duruyor. Kaptan mı? Nevres\'te aşçı yamağıydım; on üç yaşındaydım, kaptan beni Pire rıhtımından topladı. Sesini alçaltıyor. ' +
                (yanik
                  ? 'Kayıkhanesini yaktılar, duydum. Kim yaktıysa söyle bana. Ne istersen.'
                  : 'Kaptanın adamına ne lazımsa söyle. Ama burada değil; ellerine bak, bardağa bak.')
              );
            },
            sonra: 'guven',
          },
          { etiket: 'Bir kadeh şarap.', yap: () => 'Barmen kadehi dolduruyor. Kadehin dibinde Pera\'nın ışıkları titriyor.' },
        ],
      },
      guven: {
        metin: () => 'Yorgo tezgâhı siliyor; bez hep aynı yerde dönüyor. Söyle.',
        secenekler: [
          {
            etiket: 'Bir garson ceketi lazım.',
            kosul: (d) => d.kilik !== 'usak',
            yap: (d) => {
              d.kilik = 'usak';
              return 'Yorgo tezgâhın altından katlanmış beyaz bir ceket çıkarıyor. Arkadaki kilerde değiş, diyor. Şimdi sen yeni garson Hüsnü\'sün; Achille sorarsa ben aldım de. Garsonlar ön kapıdan girmez, unutma; servis kapısı arka sokakta. Ceketi giyip tepsiyi alıyorsun.';
            },
            sonra: 'guven',
          },
          {
            etiket: 'On yediyi nasıl dinlerim?',
            kosul: (d) => !bayrak(d, 'asansorBiliniyor'),
            yap: (d) => {
              d.bayrak.asansorBiliniyor = true;
              return 'Koridorun başında yemek asansörü var, diyor Yorgo. Halatı on yedinin şöminesinin yanına çıkar. Boşluk her şeyi taşır: çatal sesini de, fısıltıyı da. Dokuz buçuk gibi toplanırlar. Merdivenin başında bir iri herif bekler; ondan uzak dur.';
            },
            sonra: 'guven',
          },
          {
            etiket: 'On yedinin anahtarı?',
            kosul: (d) => !bayrak(d, 'anahtar17') && !bayrak(d, 'anahtarSoruldu'),
            yap: (d) => {
              d.bayrak.anahtarSoruldu = true;
              const verir = bayrak(d, 'kayikhaneYandi') === 'tam' || bayrak(d, 'suleymanYarali') || (d.suleymanBag || 0) >= 2;
              if (verir) {
                d.bayrak.anahtar17 = true;
                return 'Yorgo bezini katlıyor; altından pirinç bir anahtar çıkıyor. On yedi. Kaptan için, diyor. Onlar çıkınca kullan; içerideyken değil.';
              }
              return 'Yorgo başını iki yana sallıyor. Anahtarlar barın ucundaki panoda. Ben veremem; Achille sayar. Sen alırsan ben görmedim.';
            },
            sonra: 'guven',
          },
          { etiket: 'Sağ ol Yorgo.' },
        ],
      },
    },
  },

  achille: {
    uygun: () => true,
    giris: () => 'ilk',
    dugumler: {
      ilk: {
        metin: (d) =>
          d.kilik === 'usak'
            ? 'Achille seni tepeden tırnağa süzüyor. Yeni misin? Tepsini dolu tut, gözünü yere indir. Üst kata çıkan garsonun bacağını kırarım.'
            : 'Achille eğiliyor, gülümsüyor; gözleri gülmüyor. Mösyö bir şey arıyor mu? Mösyöyü daha önce görmedim.',
        secenekler: [
          {
            etiket: 'Cemil Bey\'in misafiriyim, İzmir\'den.',
            kosul: (d) => d.kilik !== 'usak',
            yap: (d) =>
              bayrak(d, 'kimlik') === 'gercek'
                ? 'Achille adını tekrar ediyor: Arif Bey. Bir an durup ezberliyor; adını defterine yazacakmış gibi. Hoş geldiniz.'
                : 'Achille başını eğiyor: İzmirli tüccarlar her zaman hoş geldi. Uzaklaşırken bir kez daha dönüp bakıyor.',
          },
          { etiket: 'Bir şey yok, teşekkür ederim.' },
        ],
      },
    },
  },

  nobetci: {
    uygun: () => true,
    giris: () => 'ilk',
    dugumler: { ilk: { metin: () => 'İri adam kollarını çözüyor. Kaybol, diyor. Bir daha söylemem.', secenekler: [{ etiket: 'Geri çekil.' }] } },
  },
};

// --- Sahneler ---
export const G3_SAHNELER = {
  g3_cagri: {
    ortam: 'ortam_kayikhane',
    baslik: 'Cumartesi',
    paragraflar: (d) =>
      [
        'Cumartesi, akşamüstü. Cemil\'in hademesi bir zarf getiriyor; içinde tek satır: Altıda Cihangir\'de. Kravat bende.',
        bayrak(d, 'suleymanHanda')
          ? 'Süleyman Ohannes\'in sedirinden doğruluyor. Mercure\'ün barmeni Yorgo benim gemide aşçı yamağıydı, diyor. Adımı ver; seni kardeşi bilir.'
          : 'Süleyman kayığının başından doğruluyor. Mercure\'ün barmeni Yorgo benim gemide aşçı yamağıydı, diyor. Adımı ver; seni kardeşi bilir.',
        'Yüksekkaldırım\'ın basamaklarını sayarak tırmanıyorsun. Yüz yirmi dört. Tepede Pera başka bir şehir: elektrik ışıkları, Frenk sesleri, kürkler.',
      ].filter(Boolean),
    secenekler: [{ etiket: 'Cihangir\'e git', yap: (d) => gorev3Baslat(d), sonra: 'g3_acilis' }],
  },
  g3_acilis: {
    ortam: 'ortam_cemil_ev',
    baslik: 'On Yedi Numara',
    paragraflar: [
      'Cemil\'in evi kitap kokuyor: duvardan duvara raflar, masada kafatası, pencerede Boğaz\'ın ışıkları. Pencerenin önünde bir kadın sigara içiyor; yirmi sekizinde, kısa saçlı, gözleri seni ölçüyor.',
      'Nermin Hanım, diyor Cemil. Gazeteci. Sansür onun yazılarının yarısını keser, öbür yarısı yine de ses getirir.',
      'Nermin dumanı pencereden üflüyor. Doktor bana jetonu anlattı, diyor. Mercure\'ü ben bilirim: her cumartesi İngiliz subayları kâğıt oynar, Frenk tüccarlar şarap içer, bizden de birkaç bey zarf alır. Benim yüzbaşım orada; benimle röportaj sözü verdi. Sen benim kuzenimsin.',
      'Cemil sana eski bir takım uzatıyor. Paris\'ten kalma, diyor. Benden geniş omuzların var ama karanlıkta kimse fark etmez. Ayakkabı sorunu var; hamal ayakkabısıyla bey olunmaz. Senin numaran kırk dört mü? Benimki de. Talih.',
      'Aynada kendine bakıyorsun. Takım, kravat, Cemil\'in fesi. Ellerin hâlâ hamal elleri. Ceplerine sokuyorsun.',
      'Nermin defterini kapatıyor. Kulübün baş garsonu Achille her şeyi görür. On yedinin toplantısı dokuz buçuk sularında. Kapıda kendini nasıl tanıtacaksın?',
    ],
    secenekler: [
      {
        etiket: 'Arif Bey, İzmirli tüccar.',
        yap: (d) => {
          d.bayrak.kimlik = 'sahte';
        },
        sonra: 'g3_acilis_son',
      },
      {
        etiket: 'Kendi adımla. Saklanacak bir şeyim yok.',
        yap: (d) => {
          d.bayrak.kimlik = 'gercek';
        },
        sonra: 'g3_acilis_son',
      },
    ],
  },
  g3_acilis_son: {
    ortam: 'ortam_cemil_ev',
    baslik: 'Pera',
    paragraflar: (d) => [
      bayrak(d, 'kimlik') === 'gercek'
        ? 'Nermin kaşlarını kaldırıyor. Cesur ya da aptal, diyor. Hangisi olduğunu bu gece öğreniriz.'
        : 'Nermin başını sallıyor. İzmirli tüccar. İncir mi satıyorsun, tütün mü? İncir; incirden kimse anlamaz.',
      'Cemil ceketinin cebine küçük bir şişe koyuyor. Bayılan olursa, diyor. Ya da bayıltmak gerekirse.',
      'Kapıdan çıkınca Grand Rue. Kulübün kapısı doğuda, yirmi beş adım kadar. Servis kapısı daha doğuda, arka sokakta; oradan yalnız garsonlar girer. Kulüp sekizde açılıyor.',
    ],
    secenekler: [{ etiket: 'Kravatını düzelt', sonra: null }],
    bitisSozu: 'Üçüncü görev: On Yedi Numara. Cemil\'in Cihangir\'deki evindesin. Nermin ile Cemil sekizden sonra kulübün salonunda. Menüden Görev\'i her zaman açabilirsin.',
  },
  g3_dinle: {
    ortam: 'ortam_servis',
    ortamOran: 0.4,
    baslik: 'Asansör boşluğu',
    paragraflar: (d) =>
      [
        'Yanağını soğuk tahtaya dayıyorsun. Yukarıdan sandalye gıcırtısı, kadehlerin şıngırtısı, sonra sesler. Türkçe konuşuyorlar; biri kırık bir İtalyan ağzıyla, biri kusursuz ve yumuşak. Lavanta kokusunu buradan duyacak gibisin.',
        'Kırık ses, Ferrante: Santa Lucia pazartesi gecesi kalkar. Odesa. Altmış sandık.',
        'Yumuşak ses: Yarısı Beyazlara, yarısı Kızıllara. Savaş ne kadar uzarsa, Signor Ferrante, o kadar iyi. Bir taraf kazanırsa müşteri kaybederiz.',
        'Üçüncü bir ses, boğazını temizleyen yaşlı bir İstanbul efendisi: Maliye kayıtları benden sorulur, Mösyö Delorme. Ama Halim\'i bana bırakmayın; çok konuşuyor.',
        bayrak(d, 'halimGordu2')
          ? 'Delorme: Halim\'in buluşmasını dün akşam biri dinlemiş. Halim kim olduğunu bilmiyor. Ben biliyorum.'
          : 'Delorme: Halim\'in işi bitince bitecek, Nazım Bey. Henüz değil.',
        'Sonra kâğıt hışırtısı. Delorme\'un sesi hiç yükselmiyor: Hamal. Arif Demir. Manastırlı. Seddülbahir\'de bir bölüğün sağ kalan tek eri. Kalafatçı Hanı, üç numara. ' +
          (bayrak(d, 'kimlik') === 'gercek' ? 'Bu akşam kendi adıyla buraya geldi; Achille söyledi. Cesur.' : 'Dosyası bende.'),
        'Seddülbahir. Kelime boşluktan aşağı düşüp göğsüne çarpıyor. Kum. Barut. Biri adını bağırıyor.',
      ].filter(Boolean),
    secenekler: [
      {
        etiket: 'Nefesini say. Dörde kadar al, dörde kadar ver.',
        yap: (d) => {
          d.bayrak.dinleNefes = 'say';
          if (bayrak(d, 'ilkNefes') === 'say') d.travma = Math.max(0, (d.travma || 0) - 1);
        },
        sonra: 'g3_dinle2',
      },
      {
        etiket: 'Dişlerini sık. Kulağın yukarıda kalsın.',
        yap: (d) => {
          d.bayrak.dinleNefes = 'bastir';
          d.travma = (d.travma || 0) + 1;
        },
        sonra: 'g3_dinle2',
      },
    ],
  },
  g3_dinle2: {
    ortam: 'ortam_servis',
    ortamOran: 0.4,
    baslik: 'Asansör boşluğu',
    paragraflar: (d) =>
      [
        bayrak(d, 'dinleNefes') === 'say'
          ? 'Bir, iki, üç, dört. Kum çekiliyor. Tahtanın soğuğu geri geliyor, yukarıdan yine sesler.'
          : 'Çeneni sıkıyorsun; kum ağzında kalıyor ama kulağın yukarıda.',
        'Delorme: Selanik\'ten telgraf geldi. Madam N. Manastır fotoğrafını istiyor. Ateşçi onu hamala vermiş olabilir. Fotoğraf da gerekirse hamal da.',
        'Cebindeki fotoğraf. Örgülü saçlı genç kadın. Madam N. kim? Ve neden o fotoğrafı istiyor?',
        'Sonra asansörün halatı kıpırdıyor. Delorme: Bu asansör çalışıyor mu? Garson! Yukarı bir şişe yolla. Halat gerildikçe kabin başının hizasına iniyor.',
      ].filter(Boolean),
    secenekler: [
      {
        etiket: 'Halatı tut, kabini olduğu yerde durdur. Kıpırdama.',
        yap: (d) => {
          const titrer = (d.travma || 0) >= 2 && bayrak(d, 'dinleNefes') !== 'say';
          d.bayrak.asansorSecim = titrer ? 'kaydi' : 'tuttu';
          if (titrer) d.suphe = Math.max(d.suphe || 0, 60);
        },
        sonra: 'g3_dinle_son',
      },
      {
        etiket: 'Geri çekil, karanlığa yapış.',
        yap: (d) => {
          d.bayrak.asansorSecim = 'cekildi';
        },
        sonra: 'g3_dinle_son',
      },
    ],
  },
  g3_dinle_son: {
    ortam: 'ortam_servis',
    baslik: 'Asansör boşluğu',
    paragraflar: (d) => {
      const s = bayrak(d, 'asansorSecim');
      delilEkle(d, 'dinle_toplanti');
      delilEkle(d, 'santa_lucia');
      delilEkle(d, 'madam_n');
      d.bayrak.delormeAdi = true;
      if (s === 'tuttu')
        return [
          'Halatı iki elinle kavrıyorsun; kabin olduğu yerde, iki tuğla arasında duruyor. Yukarıda Delorme bir süre bekliyor. Sonra: Bozuk. Bu şehirde her şey bozuk. Sandalyeler gıcırdıyor; konuşma yine Odesa\'ya dönüyor.',
          'Halatı yavaşça bırakıyorsun. Avuçların yanıyor. Duyduğun her şey kafanda.',
        ];
      if (s === 'kaydi')
        return [
          'Halatı kavrıyorsun ama ellerin titriyor; halat avucunda kayıyor, kabin tahtaya çarpıyor. Yukarıda sessizlik. Sonra Delorme\'un yumuşak sesi: Aşağıda biri var.',
          'Merdivenin başındaki iri adamın ağırlığı koridorun taşlarında. Duvara yapışıyorsun. Şimdi kıpırdarsan duyar.',
        ];
      return [
        'Karanlığa çekiliyorsun. Kabin aşağı iniyor; içine bir şişe konup yukarı çekiliyor. Yukarıda biri gülüyor. Duyduğun kadarı yeter; ama koridorda kalmak artık tehlikeli.',
      ];
    },
    secenekler: [{ etiket: 'Devam', sonra: null }],
    bitisSozu: 'Koridordasın, yemek asansörünün yanında. Toplantı on bire doğru dağılır; on yedinin anahtarın varsa onlar gidince yukarı çıkabilirsin.',
  },
  g3_dosya: {
    ortam: 'ortam_oda',
    baslik: 'Kendi dosyan',
    paragraflar: (d) =>
      [
        'Karton dosyanın üstünde mürekkeple: DEMIR, Arif. İçinde dört sayfa, Fransızca ve Türkçe karışık, temiz bir el yazısı.',
        'Doğum: 1893, Manastır. Baba: Kalaycı İsmail. 1912: esir, Yanya yolu. 1915: Seddülbahir, bölüğün tek sağ kalanı. 1916: İstanbul, Karaköy, hamal. Kalafatçı Hanı, 3.',
        'Kenarda kurşun kalemle küçük notlar: Gece uyumaz. Sağ kulağı daha iyi duyar. Süleyman Kaptan\'a bağlı. ' +
          (bayrak(d, 'kimlik') === 'gercek' ? 'Son satır taze mürekkep: Mercure\'e kendi adıyla geldi.' : 'Son satır taze mürekkep: Mercure\'de görüldü.'),
        'Ve ailenin satırında, altı çizilmiş tek bir not: Bkz. S.',
        'S. Selanik mi? Bir insanın adının baş harfi mi? Annenin, babanın, kız kardeşinin üstüne yazılmış iki harf. Öldüler dediler. Bu adam, onların öldüğünü yazmamış.',
      ].filter(Boolean),
    secenekler: [
      {
        etiket: 'Dosyayı al. Bu senin hayatın; onlarda kalmayacak.',
        yap: (d) => {
          d.bayrak.dosyaKarar = 'al';
        },
        sonra: 'g3_dosya_son',
      },
      {
        etiket: 'Dosyayı yerine koy. Bildiğini bilmesinler.',
        yap: (d) => {
          d.bayrak.dosyaKarar = 'birak';
        },
        sonra: 'g3_dosya_son',
      },
    ],
  },
  g3_dosya_son: {
    ortam: 'ortam_oda',
    baslik: 'Kendi dosyan',
    paragraflar: (d) =>
      bayrak(d, 'dosyaKarar') === 'al'
        ? ['Dosyayı katlayıp göğsüne sokuyorsun; defterin, belgenin, fotoğrafın yanına. Göğsün artık bir arşiv. Delorme sabah çekmeceyi boş bulunca kimin aldığını bilecek. Bilsin.']
        : ['Dosyayı olduğu gibi kapatıp çekmeceye geri itiyorsun, yarı açık, nasıl bulduysan. Bkz. S. İki harf aklında kalıyor. Delorme onun okunduğunu bilmeyecek; bu bir silah.'],
    secenekler: [{ etiket: 'Devam', sonra: null }],
  },
  g3_karar_oncesi: {
    ortam: 'ortam_cemil_ev',
    baslik: 'Gece yarısı, Cihangir',
    paragraflar: (d) =>
      [
        'Cemil\'in masasının üstüne her şeyi döküyorsunuz. Nermin ayakta, sigarası sönmüş, elinde unutmuş.',
        'Delorme. Sabri\'yi o öldürdü; kanatlı anahtarın İstanbul\'daki eli o. Santa Lucia pazartesi gecesi Odesa\'ya kalkıyor, bir iç savaşın iki tarafına birden. Ve Nazım Bey, Halim, bir Paşa\'nın kapısı: maaşlı adamlar.',
        delilVar(d, 'arif_dosyasi') ? 'Kendi dosyanı anlatmıyorsun. Bkz. S. İki harf boğazında.' : '',
        'Nermin: Bunu yazarsam sansür yarısını keser ama yarısı kalır. Yarısı da bir Maliye beyini koltuğundan eder. Cemil: Yazarsan Delorme sabah kapına gelir. Ya da Arif\'in kapısına.',
        'İkisi de sana bakıyor. Pazartesiye iki gün var.',
      ].filter(Boolean),
    secenekler: [{ etiket: 'Devam', sonra: 'g3_karar' }],
  },
  g3_karar: {
    ortam: 'ortam_cemil_ev',
    baslik: 'Ne yapacağız?',
    paragraflar: ['Lambanın yeşil camında üç yüz yansıyor.'],
    secenekler: [
      {
        etiket: 'Nermin yazsın. Defteri ve Santa Lucia\'yı sabah gazetesinde görsünler.',
        yap: (d) => {
          d.bayrak.karar3 = 'gazete';
          d.nerminBag = (d.nerminBag || 0) + 1;
        },
        sonra: 'g3_son_gazete',
      },
      {
        etiket: 'Santa Lucia\'yı İtilaf kontrolüne ihbar edelim. Gemi limandan çıkmasın.',
        yap: (d) => {
          d.bayrak.karar3 = 'ihbar';
          d.bayrak.sevkiyatSonuc = bayrak(d, 'karar1') === 'ingiliz' ? 'kacti' : 'el_konuldu';
        },
        sonra: 'g3_son_ihbar',
      },
      {
        etiket: 'Saklayalım. Bununla Halim\'i konuşturacağız; Halim de bizi Delorme\'a götürür.',
        yap: (d) => {
          d.bayrak.karar3 = 'sakla';
        },
        sonra: 'g3_son_sakla',
      },
    ],
  },
  g3_son_gazete: {
    ortam: 'ortam_matbaa',
    baslik: 'Sabah baskısı',
    paragraflar: (d) =>
      [
        'Nermin sabaha kadar yazıyor; sen yanında, kahve taşıyorsun. Şafakta yazıyı matbaaya kendisi götürüyor.',
        'Pazartesi sabahı gazetenin ikinci sayfasında, sansürün beyaz bıraktığı iki sütunun arasında bir başlık kalmış: Maliye\'de Cumartesi Zarfları. Nazım Bey\'in adı yok; ama Maliye\'de herkes kimin cumartesileri Pera\'ya çıktığını biliyor.',
        'Öğleden sonra haber geliyor: Nazım Bey hastalık izni almış. Santa Lucia ise akşam, sessizce, limandan çıkıyor; sansür Odesa satırını tamamen silmiş.',
        bayrak(d, 'defterAlindi') ? 'Defterin aslı Nermin\'in matbaasında, bir kurşun kasanın içinde.' : 'Yazıyı fotoğraflardan ve senin hatırladıklarından kurdunuz; defterin aslı hâlâ on yedide.',
      ].filter(Boolean),
    secenekler: [{ etiket: 'Devam', sonra: 'g3_kapanis' }],
  },
  g3_son_ihbar: {
    ortam: 'ortam_rihtim',
    baslik: 'Pazartesi gecesi',
    paragraflar: (d) =>
      bayrak(d, 'sevkiyatSonuc') === 'kacti'
        ? [
            'Nermin\'in yüzbaşısı ihbarı kontrol bürosuna kendi eliyle götürüyor. Pazartesi akşamı İngiliz motorları Santa Lucia\'nın yattığı rıhtıma varıyor.',
            'Rıhtım boş. Gemi öğleden sonra, tarifesinden altı saat önce kalkmış. Belgeyi verdiğin yüzbaşının adı kontrol bürosunun nöbet çizelgesinde, öğle saatinde.',
            'Biri haber verdi, diyor Nermin. Kimin verdiğini biliyorsun.',
          ]
        : [
            'Nermin\'in yüzbaşısı ihbarı kontrol bürosuna kendi eliyle götürüyor. Pazartesi gecesi İngiliz motorları Santa Lucia\'yı rıhtımında yakalıyor.',
            'Ambardan altmış sandık çıkıyor: makine yedek parçası yazan, içinden Mauser çıkan altmış sandık. Ferrante\'nin adamları gecenin içine dağılıyor.',
            'Karaköy\'de hamallar ertesi gün bunu konuşuyor; Sabri\'nin adını da. Ferrante\'nin bekçisi antreponun kapısına iki kilit daha vurduruyor.',
          ],
    secenekler: [{ etiket: 'Devam', sonra: 'g3_kapanis' }],
  },
  g3_son_sakla: {
    ortam: 'ortam_cemil_ev',
    baslik: 'Saklanan defter',
    paragraflar: (d) =>
      [
        bayrak(d, 'defterAlindi')
          ? 'Defteri Cemil\'in kitaplığında, Ibn Sina\'nın Kanun\'unun arkasına saklıyorsunuz. Cemil gülüyor: Hekimlerin şahı rüşvet defterine bekçilik edecek.'
          : 'Hatırladığın her satırı Nermin\'e yazdırıyorsun; baş harfleri, rakamları. Kâğıdı Cemil\'in kitaplığında, Ibn Sina\'nın Kanun\'unun arkasına saklıyorsunuz.',
        'Santa Lucia pazartesi gecesi kalkıyor. Sen rıhtımdan ışıklarının uzaklaşmasını izliyorsun. Altmış sandık. Kaç kişi? Bunu düşünmemeye çalışıyorsun.',
        'Ama elinde artık bir Maliye beyini, bir komiseri, bir Paşa\'nın kapısını titretecek bir şey var. Halim, diyorsun Nermin\'e. Önce Halim.',
      ].filter(Boolean),
    secenekler: [{ etiket: 'Devam', sonra: 'g3_kapanis' }],
  },
  g3_kapanis: {
    ortam: 'ortam_cemil_ev',
    baslik: 'Dördüncü kişi',
    paragraflar: (d) =>
      [
        'Nermin paltosunu giyerken duruyor. Bir şey söyleyeceğim, diyor. Bu işi bir haber olsun diye yapmıyorum artık. Yazacağım, evet. Ama sonuna kadar.',
        bayrak(d, 'nerminCevdet') === 'anlat'
          ? 'Sen Seddülbahir\'de kaput bekledin. Cevdet Sarıkamış\'ta. Aynı adamlar satıyor, aynı adamlar alıyor. Benimle misin?'
          : 'Kâğıtların üstünde görünen ile görünmeyen arasında bir yer var. Orada yalnız yürümek istemiyorum. Benimle misin?',
      ].filter(Boolean),
    secenekler: [
      {
        etiket: 'Seninleyim Nermin. Hoş geldin.',
        yap: (d) => {
          d.bayrak.nerminEkipte = true;
          d.bayrak.nerminKabul = 'gel';
          d.nerminBag = (d.nerminBag || 0) + 1;
        },
        sonra: 'g3_son',
      },
      {
        etiket: 'Gazeteni de kendini de riske atıyorsun.',
        yap: (d) => {
          d.bayrak.nerminEkipte = true;
          d.bayrak.nerminKabul = 'uyar';
        },
        sonra: 'g3_son',
      },
    ],
  },
  g3_son: {
    ortam: 'ortam_rihtim',
    baslik: 'Haliç',
    paragraflar: (d) =>
      [
        bayrak(d, 'nerminKabul') === 'uyar'
          ? 'Nermin gülüyor; ilk kez. Gazetemi sansür her sabah zaten riske atıyor, diyor. Ben en azından neye attığımı bileceğim.'
          : 'Nermin elini uzatıyor; erkek gibi sıkıyor. Cemil ikinizin arasında gözlüklerini siliyor: Bir doktor, bir gazeteci, bir hamal. Kötü bir fıkranın başı gibi.',
        'Pazartesi sabahı Karaköy\'e iniyorsun. Rıhtımda kalabalık. Hamallar sudan bir adam çıkarmış; Haliç\'in ağzında, kayıkların arasında bulunmuş.',
        'Kasketi hâlâ başında. Yaşar. Halim\'in muhbiri. Sırtında, sol kürek kemiğinin altında ince bir yara.',
        'Delorme temizliyor. Ve Halim, kendi adamının cesedinin başında, ilk kez korkmuş görünüyor.',
        'Üçüncü görevin sonu: On Yedi Numara.',
      ].filter(Boolean),
    secenekler: [
      {
        etiket: 'Devam',
        yap: (d) => {
          gorev3Bitir(d);
          gorev4Baslat(d);
        },
        sonra: 'g4_acilis',
      },
    ],
  },
};

// --- Başlangıç ve bitiş ---
export function gorev3Baslat(d) {
  const g2 = d.bayrak.g2Gun || d.gorevGun || d.gun;
  const cumartesi = g2 + 2;
  if (d.gun < cumartesi) d.gun = cumartesi;
  d.gorev = 3;
  d.gorevGun = d.gun;
  d.dakika = 18 * 60;
  d.gece = true;
  d.sonSaat = 18;
  d.sonVapur = d.dakika;
  d.mekan = 'cihangir';
  d.oyuncu = { x: 205, y: 53, yon: 0 };
  d.yakin = {};
  d.oto = null;
  d.suphe = 0;
  d.kilik = 'bey';
  if (!d.kesif) d.kesif = {};
  d.kesif.cihangir = true;
  d.kesif.pera_cadde = true;
  d.kesif.kisi_nermin = true;
}

function gorev3Bitir(d) {
  d.bayrak.g3Bitti = true;
  d.gun = d.gorevGun + 2; // pazartesi
  d.dakika = 9 * 60;
  d.gece = false;
  d.sonSaat = 9;
  d.sonVapur = d.dakika;
  d.mekan = 'han';
  d.oyuncu = { x: 37, y: 19, yon: Math.PI };
  d.yakin = {};
  d.oto = null;
  d.kilik = null;
}

// İkinci görev bittikten sonra cumartesi akşamüstü üçüncü görev kendiliğinden çağırır
export function gorev3Ilerle(d) {
  if (d.gorev !== 2 || !d.bayrak.g2Bitti || d.sahne) return;
  const g2 = d.bayrak.g2Gun || d.gorevGun;
  const gd = gunDakika(d);
  if (d.gun > g2 + 2 || (d.gun === g2 + 2 && gd >= 17 * 60 + 15)) d.sahne = 'g3_cagri';
}

// Kişi düzeltmeleri: Nermin baş garsonu oyalarken Achille onun masasında; kulüpten atılınca Nermin arka sokakta
export function kisiDuzelt3(d, k) {
  if (!g3Mi(d)) return k;
  if (k.id === 'achille' && oyalaniyor(d)) return { ...k, x: 225.8, y: 21.2, yuruyor: false, eylem: 'Nermin Hanım\'ın masasında şarabı inceliyor' };
  if (k.id === 'nermin' && bayrak(d, 'kulupKapali') && !bayrak(d, 'nerminGetirdi') && ilkGun(d)) {
    const gd = gunDakika(d);
    if (gd >= 22 * 60 + 50 && gd < 23 * 60 + 59) return { ...k, mekan: 'pera_cadde', x: 251, y: 5, yuruyor: false, eylem: 'arka sokakta seni bekliyor' };
  }
  return k;
}

export function g3Ipucu(d) {
  if (bayrak(d, 'g3Bitti')) return 'Üçüncü görev bitti.';
  if (g3Tamam(d)) return 'Panonda üç bağ kurulu. Nermin ya da Cemil\'le konuş, ya da Cihangir\'de Cemil\'in masasına dön: ne yapacağınıza karar verin.';
  const gd = gunDakika(d);
  const p = [];
  const eksik = [];
  if (!cikarimVar(d, 'delorme')) eksik.push('lavantalı adamın kim olduğu');
  if (!cikarimVar(d, 'sevkiyat')) eksik.push('tüfeklerin nereye gittiği');
  if (!cikarimVar(d, 'rusvet')) eksik.push('kimin para aldığı');
  p.push('Panoda kurman gereken bağlar: ' + eksik.join(', ') + '.');
  if (bayrak(d, 'kulupKapali') && !bayrak(d, 'nerminGetirdi'))
    p.push('Kulüpten atıldın. Nermin on bire doğru arka sokakta, servis kapısının yanında seni bekleyecek.');
  else if (ilkGun(d) && gd < 20 * 60) p.push('Kulüp sekizde açılıyor. Barmen Yorgo Süleyman\'ın eski aşçı yamağı; adını ver.');
  else if (ilkGun(d) && gd < TOPLANTI_BAS) p.push('On yedinin toplantısı dokuz buçuk sularında. Servis koridorundaki yemek asansörü dinlemek için; koridora garson ceketiyle ya da Nermin baş garsonu oyalarken geçilir.');
  else if (ilkGun(d) && gd < TOPLANTI_BIT) p.push('Toplantı sürüyor. Asansör boşluğu koridorun başında; merdivendeki adamdan uzak dur.');
  else if (!delilVar(d, 'rusvet_defteri')) p.push('Toplantı dağıldı. On yedinin anahtarı barın ucundaki panoda; oda şimdi boş.');
  return p.join(' ');
}
