// Altıncı görev: Siyakat (birinci perde). Saf JavaScript; gorev1.js'i içe aktarmaz.
//
// Perşembe, 12 Aralık 1918. Gülce belgenin alt yarısını, siyakat yazısını okur: bir liste değil, bir zimmet.
// Anahtarın dört dişi, dört şehir, dört kol: Selanik'te Göz, Viyana'da Kasa, Berlin'de Kılıç. Dördüncü satırda
// şehir yok, bir evrak numarası var: Maliye, Gümrük Kalemi, 1329, numara 417. Gülce'nin babası Kâmil Efendi'nin
// imzalamadığı dosya. Dosya köprünün öte yakasında, Maliye Nezareti'nin evrak mahzeninde. Kâtip Tahsin Efendi
// kapıyı bekler, ihtiyar Rüştü Efendi rafların arasında dolaşır; Gülce kâtibi oyalayabilir, öğle namazında ikisi de
// çıkar. Saat iki buçukta Nazım Bey kendisi iner. Rafı bulmak için Rumi yılı hesaplamak gerekir.
// Dosyadan dördüncü diş (Atina, Mühür, "Kont S."), Kâmil Efendi'nin ölümünün Sabri'ninkine benzeyişi ve emri
// verenin adı çıkar. Sonra Gülce'yle birlikte karar: Nazım Bey'in yüzüne söylemek, Rıza Bey'e vermek ya da
// Nermin'in gazetesi.
//
// d alanları: gorev 6, gorevGun, bayrak.*

import { GULCE_GIDER, NAZIM_GELIR, NAZIM_GIDER, g6Oyalaniyor } from './maliye';

const bayrak = (d, k) => d.bayrak[k];
const delilVar = (d, id) => d.deliller.includes(id);
function delilEkle(d, id) {
  if (delilVar(d, id)) return false;
  d.deliller.push(id);
  return true;
}
const gunDakika = (d) => ((d.dakika % 1440) + 1440) % 1440;
const g6Mi = (d) => d.gorev === 6;
const uzak = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const dogruTeori = (d, id) => d.teoriler.some((t) => t.dogru && t.cikarim === id);

export const G6_DELILLER = {
  siyakat_satirlari: {
    ad: 'Belgenin siyakat yazısı',
    tarif:
      'Gülce okudu: bir zimmet. Selanik cânibinde, Göz nezdinde: bir diş. Viyana cânibinde, Kasa nezdinde: bir diş. Berlin cânibinde, Kılıç nezdinde: bir diş. Dördüncü satırda şehir yok: Mühür nezdinde bir diş; yerinde bir evrak numarası, Maliye, Gümrük Kalemi, 1329, numara 417.',
  },
  kamil_olumu: {
    ad: 'Kâmil Efendi\'nin ölümü',
    tarif:
      'Gülce anlattı: dokuz Nisan 1329 akşamı babası eve gelmedi; üç gün sonra Haliç\'ten çıkardılar. Köprüden düşmüş, dediler. Bileklerinde ince, morarmış bir şerit vardı. Raporu genç bir komiser muavini yazdı: Halim.',
  },
  evrak_kaydi: {
    ad: 'Evrak odasının çıkış defteri',
    tarif:
      'Tahsin Efendi\'nin defterine göre dosya 417, dört Nisan 1329\'da Nazım Bey\'in kalemine çıkmış, dokuz Nisan\'da iade edilmiş: Kâmil Efendi\'nin eve dönmediği gün. Geçen salı aynı kalem dosyayı yine istemiş.',
  },
  nazim_sozu: {
    ad: 'Nazım Bey\'in kâtibe sözü',
    tarif:
      'Evrak odasında gözlüklü bey, Nazım Bey, kâtibe 417 numaralı dosyayı kimseye vermemesini, soran olursa adını yazıp kendisine getirmesini söyledi.',
  },
  kamil_dosyasi: {
    ad: 'Dosya 417',
    tarif:
      'Nisan 1329 tarihli bir yük kaydı: vapur Elpis, Selanik\'ten Pire üzerinden; yük "zirai alet", otuz sandık; alıcı Atina\'da, Kont S. hesabına. İmza yeri boş. Kenarda Kâmil Efendi\'nin eli: Sandıklarda tüfek var, imzalamam. Havalede N. B. parafı, köşede kabartma bir kanatlı anahtar.',
  },
};

export const G6_CIKARIMLAR = {
  dorduncu_dis: {
    ifade: 'Dördüncü diş Atina\'da, Mühür kolunda; Kâmil Efendi\'nin imzalamadığı yük o kolun yüküydü.',
    kume: [['siyakat_satirlari'], ['kamil_dosyasi']],
    gerekli: true,
    gorev: 6,
  },
  ayni_yontem: {
    ifade: 'Kâmil Efendi de Sabri gibi öldürüldü: bilekleri bağlanıp suya atıldı, raporu Halim yazdı.',
    kume: [['kamil_olumu'], ['ip_izi', 'kopuk_yok', 'bicak_yarasi', 'halim_itirafi']],
    gerekli: true,
    gorev: 6,
  },
  emri_veren: {
    ifade: 'Kâmil Efendi\'nin ölümünü Nazım Bey istedi: dosyayı o hafta o çekti, öldüğü gün iade etti.',
    kume: [['evrak_kaydi', 'nazim_sozu'], ['kamil_dosyasi', 'rusvet_defteri', 'nazim_emri']],
    gerekli: true,
    gorev: 6,
  },
};

export const G6_YANLISLAR = [
  { gorev: 6, ifade: 'Kâmil Efendi gerçekten köprüden düştü.', duzeltme: 'Köprüden düşen adamın bilekleri bağlanmaz, Arif.' },
  { gorev: 6, ifade: 'Kâmil Efendi\'yi Halim öldürdü.', duzeltme: 'Halim o zaman bıyığı yeni terlemiş bir çocuktu; yalnızca raporu yazdı. Emri veren, dosyayı o hafta çeken kalemdir.' },
  { gorev: 6, ifade: 'Dördüncü diş İstanbul\'da, Maliye\'nin mahzeninde.', duzeltme: 'Numara bir şehir değil, bir yol gösterir. Dosyadaki yük Atina\'ya gidiyordu; Kont S. hesabına.' },
  { gorev: 6, ifade: 'Kâmil Efendi rüşvet aldığı için öldürüldü.', duzeltme: 'Babam o imzayı atsaydı yaşardı. Rüşvet alan imzalar, Arif.' },
];

// --- Evrak mahzeninin rafları ---
// Rafı bulmak: Kâmil Efendi Nisan 1913'te öldü; Rumi yıl Mart'tan sonra miladiden 584 eksiktir (1329).
const YANLIS_RAF = {
  raf_1327:
    'Bin üç yüz yirmi yedi. Tozlu, ıslak kokan klasörler: Trablusgarp Harbi\'nin yılı, İtalyan bandıralı gemilerin el konulan yükleri. Dört yüz on yedi numara burada bir un sevkiyatı; bütün imzaları tam. Kâmil Efendi\'nin adı hiç geçmiyor. Bu yıl değil.',
  raf_1328:
    'Bin üç yüz yirmi sekiz. Balkan Harbi: seferberlik iaşesi, muhacir gemileri, Selanik\'ten kaçan vapurların listeleri. Bir an bir satırda Manastır kelimesine takılıyorsun; nefesin duruyor. Bir buğday kaydı, başka bir şey değil. Kâmil Efendi\'nin imzası birkaç sayfada var; demek bu kalemde çalışıyormuş. Ama dört yüz on yedi bir buğday kaydı. Bu yıl değil.',
  raf_1329_tahrirat:
    'Bin üç yüz yirmi dokuz, Tahrirat Kalemi. Doğru yıl ama yazışmalar: nezaretler arası tezkereler, tayin yazıları, birinin yeğeni için bir ricanın üç ayrı nüshası. Yük kaydı yok. Gülce okurken açıkça söylemişti: Gümrük Kalemi.',
  raf_1330:
    'Bin üç yüz otuz. Seferberliğin ilanı, el konulan vapurlar, kömür tahsisleri. Kâmil Efendi bu yılı görmedi. Bu yıl değil.',
};

function rafNesnesi(id, ad, x, y) {
  return {
    id,
    ad,
    mekan: 'evrak_mahzeni',
    x,
    y,
    mevcut: (d) => g6Mi(d) && !bayrak(d, 'g6Bitti'),
    giris: 'Tavana kadar yükselen ahşap bir raf. Sırtlarına mürekkeple yıl ve kalem yazılmış klasörler: ' + ad.replace('Raf: ', '') + '.',
    eylemler: [
      {
        id: 'ara',
        etiket: 'Klasörleri karıştır, dört yüz on yediyi ara',
        gurultu: 30,
        yap: (d) => {
          if (id !== 'raf_1329_gumruk') {
            d.bayrak.yanlisRaf = (d.bayrak.yanlisRaf || 0) + 1;
            return { metin: YANLIS_RAF[id], sure: 10 };
          }
          if (delilVar(d, 'kamil_dosyasi')) return { metin: 'Dört yüz on yedinin yeri boş; dosya artık sende.' };
          d.bayrak.dosyaAlindi6 = true;
          d.sahne = 'g6_dosya';
          return { metin: '', delil: ['kamil_dosyasi'], sure: 5 };
        },
      },
    ],
  };
}

export const G6_NESNELER = [
  rafNesnesi('raf_1327', 'Raf: 1327, Gümrük Kalemi', 302, 17.5),
  rafNesnesi('raf_1328', 'Raf: 1328, Gümrük Kalemi', 302, 22),
  rafNesnesi('raf_1329_tahrirat', 'Raf: 1329, Tahrirat Kalemi', 302, 27),
  rafNesnesi('raf_1329_gumruk', 'Raf: 1329, Gümrük Kalemi', 309, 28.5),
  rafNesnesi('raf_1330', 'Raf: 1330, Gümrük Kalemi', 315, 28.5),
];

// --- Konuşmalar ---
const g6Tamam = (d) => ['dorduncu_dis', 'ayni_yontem', 'emri_veren'].every((k) => dogruTeori(d, k));

function bildiklerimiAnlat(d) {
  const yanlis = d.teoriler.filter((t) => !t.dogru);
  d.bayrak.g6Duzelt = yanlis.map((t) => (G6_YANLISLAR.find((y) => y.ifade === t.ifade) || {}).duzeltme).filter(Boolean);
  d.teoriler = d.teoriler.filter((t) => t.dogru);
  d.sahne = 'g6_karar_oncesi';
}

export const G6_KONUSMALAR = {
  gulce: {
    uygun: (d) => g6Mi(d) && !bayrak(d, 'g6Bitti'),
    giris: () => 'g6',
    dugumler: {
      g6: {
        metin: (d) =>
          d.mekan === 'evrak_odasi'
            ? g6Oyalaniyor(d)
              ? 'Gülce Tahsin Efendi\'nin masasında, eski bir kaydı parmağıyla gösteriyor; sana bakmıyor.'
              : 'Gülce sesini alçaltıyor: Tahsin Efendi sırtını kapıya dönerse fırsatın olur. Ben ikiyi çeyrek geçe büroya dönmek zorundayım.'
            : delilVar(d, 'kamil_dosyasi')
              ? 'Gülce elindeki çay bardağını bırakıyor. Buldun mu?'
              : 'Gülce şalına sarınıyor: Dosya mahzende, Arif. Benim elim oraya uzanmıyor.',
        secenekler: [
          {
            etiket: 'Tahsin Efendi\'yi biraz oyalar mısın?',
            kosul: (d) => d.mekan === 'evrak_odasi' && !g6Oyalaniyor(d) && (d.bayrak.g6OyalaSayi || 0) < 2 && gunDakika(d) < GULCE_GIDER,
            yap: (d) => {
              d.bayrak.g6OyalaSayi = (d.bayrak.g6OyalaSayi || 0) + 1;
              d.bayrak.g6OyalaBitis = d.gun * 1440 + gunDakika(d) + 20;
              return 'Gülce kalkıp bir defteri koltuğunun altına alıyor ve Tahsin Efendi\'nin masasına gidiyor. Efendim, bin üç yüz otuz bir senesinin bir kaydında iki ayrı tarih var; hangisini esas alayım? Tahsin Efendi gözlüğünü düzeltip defterin üstüne eğiliyor; sırtı parmaklıklı kapıya dönük. Yirmi dakikan var, belki daha az.';
            },
          },
          {
            etiket: 'Rumi yılı nasıl hesaplarım?',
            yap: () =>
              'Mart\'tan Aralık\'a kadar miladiden beş yüz seksen dört çıkar, diyor Gülce; Ocak ile Şubat\'ta beş yüz seksen beş. Babam bin dokuz yüz on üçün Nisan\'ında öldü. Hesabı sen yap. Ben beş yıldır her sabah yapıyorum.',
            sonra: 'g6',
          },
          {
            etiket: 'Babanın kalemi neresiydi?',
            yap: () => 'Gümrük Kalemi. Belgede de öyle yazıyor: Maliye, Gümrük Kalemi. Tahrirat\'a hiç uğramazdı; oradakileri kâtip değil, mektupçu sayardı.',
            sonra: 'g6',
          },
          {
            etiket: 'Bildiklerimi anlatayım.',
            kosul: (d) => g6Tamam(d),
            yap: (d) => void bildiklerimiAnlat(d),
          },
          { etiket: 'Sonra.' },
        ],
      },
    },
  },
  tahsin: {
    uygun: (d) => g6Mi(d),
    giris: () => 'ilk',
    dugumler: {
      ilk: {
        metin: () => 'Tahsin Efendi gözlüğünün üstünden bakıyor. Altmışlarında, mürekkep lekeli kolluklar takmış; masasında üç ayrı defter. Buyurun?',
        secenekler: [
          {
            etiket: 'Gülce Hanım\'ın talep pusulası için geldim. Dört yüz on yedi numara.',
            kosul: (d) => bayrak(d, 'g6Pusula') && !bayrak(d, 'tahsinSoruldu'),
            yap: (d) => {
              d.bayrak.tahsinSoruldu = true;
              delilEkle(d, 'evrak_kaydi');
              return 'Tahsin Efendi pusulayı alıp en kalın defteri açıyor; parmağını ıslatıp sayfaları çeviriyor. Dört yüz on yedi, diyor. Bu dosya bu ara pek meşhur. Geçen salı Nazım Bey\'in kaleminden istediler, çarşamba iade ettiler. Eskiden de çıkmış, bakın: dört Nisan bin üç yüz yirmi dokuz, Nazım Bey kalemi; iade dokuz Nisan. Parmağının altındaki tarihe bakıyorsun. Dokuz Nisan. Gülce\'nin babasının eve dönmediği akşam. Tahsin Efendi defteri kapatıyor: Evrak-ı atîka mahzende, evladım. Müdür bey imzalamadan aşağı inemezsiniz. Müdür bey bugün İngilizlerle; gelmez. Pusulanın arkasına adınızı yazdım, usuldendir.';
            },
          },
          {
            etiket: 'Mahzene inebilir miyim?',
            yap: () => 'Müdür imzası, evladım. Ben bu kapının önünde otuz bir yıldır oturuyorum; imzasız inen tek kişi Rüştü Efendi, o da aşağıda yaşıyor zaten.',
            sonra: 'ilk',
          },
          { etiket: 'Kolay gelsin.' },
        ],
      },
    },
  },
};

// --- Sahneler ---
export const G6_SAHNELER = {
  g6_acilis: {
    ortam: 'ortam_han',
    baslik: 'Siyakat',
    paragraflar: (d) =>
      [
        'Perşembe, 12 Aralık. Kalafatçı Hanı\'nın avlusu, sabah sekiz. Ohannes ocağa çaydanlığı sürmüş; kimse içmiyor.',
        'Gülce belgeyi taş masaya yayıyor, iki köşesine birer bardak koyuyor. Parmağını alt yarıdaki kıvrık, noktasız harflerin üstünde gezdiriyor; dudakları kıpırdıyor, okurken nefesini tutuyor.',
        'Bu bir liste değil, diyor sonunda. Bir zimmet. Kim neyi emanet almış, onun kaydı. Dört satır. Selanik cânibinde, Göz nezdinde: bir diş. Viyana cânibinde, Kasa nezdinde: bir diş. Berlin cânibinde, Kılıç nezdinde: bir diş.',
        'Diş mi? Gülce belgenin en altındaki mürekkep işarete dokunuyor: kanatlı anahtar. Anahtarın dişi, diyor. Dört dişi var; bak. Dört kişi, dört şehir. Her biri bir dişi saklıyor.',
        'Dördüncü satırda duruyor. Mühür nezdinde: bir diş. Şehrin yerinde bir şehir yok; bir evrak numarası var. Maliye, Gümrük Kalemi, sene bin üç yüz yirmi dokuz, numara dört yüz on yedi.',
        'Gülce\'nin parmağı kâğıdın üstünde kalıyor. Bir süre sonra çekiyor, avucunu kapatıyor. Dört yüz on yedi, diyor, çok alçak sesle. Babamın imzalamadığı dosya. Evde, sandığının dibinde bir zarfın üstüne bu numarayı yazmıştı. Ölmeden iki gün önce.',
        bayrak(d, 'gulceKamil') === 'soyle'
          ? 'Nazım Bey ona İmzala ve yaşa demişti; sen söylemiştin. Şimdi o imzalanmayan kâğıdın numarası, onu öldürenlerin belgesinin içinde.'
          : bayrak(d, 'gulceKamil') === 'sakla'
            ? 'Gülce sana dönüyor: Bir tanığın sözünü benden saklamıştın, Arif. O söz bu dosyayla mı ilgili?'
            : 'Kâmil Efendi, diyor. Babam. Maliye\'de kâtipti.',
      ].filter(Boolean),
    secenekler: [
      {
        etiket: 'Sakladığım sözü şimdi söyleyeyim: Nazım Bey babana İmzala ve yaşa demiş.',
        kosul: (d) => bayrak(d, 'gulceKamil') === 'sakla',
        yap: (d) => {
          d.bayrak.gulceKamil = 'soyle';
          d.bayrak.gulceyeAnlatti = true;
          d.bayrak.gulce6 = 'soz';
          d.gulceGuven = (d.gulceGuven || 0) + 1;
        },
        sonra: 'g6_kamil',
      },
      {
        etiket: 'Elini tut. Bir şey söyleme.',
        yap: (d) => {
          d.bayrak.gulce6 = 'el';
          d.gulceGuven = (d.gulceGuven || 0) + 1;
        },
        sonra: 'g6_kamil',
      },
      { etiket: 'Babanı anlat bana.', yap: (d) => (d.bayrak.gulce6 = 'anlat'), sonra: 'g6_kamil' },
      {
        etiket: 'Bu iş tehlikeli. Dosyayı ben bulurum; sen uzak dur.',
        yap: (d) => {
          d.bayrak.gulce6 = 'birak';
          d.gulceGuven = (d.gulceGuven || 0) - 1;
        },
        sonra: 'g6_kamil',
      },
    ],
  },
  g6_kamil: {
    ortam: 'ortam_han',
    baslik: 'Kâmil Efendi',
    paragraflar: (d) => {
      const g = bayrak(d, 'gulce6');
      return [
        g === 'el'
          ? 'Elini masanın üstünden uzatıp onun elinin üstüne koyuyorsun. Gülce çekmiyor. Bir süre öyle kalıyorsunuz; Ohannes ocağın başında sırtını dönüyor. Sonra Gülce konuşuyor, kendiliğinden.'
          : g === 'birak'
            ? 'Gülce başını kaldırıyor; gözlerinde yaş değil, öfke var. Uzak dur mu? Beş yıldır o büroda neden oturuyorum sanıyorsun, Arif? Her sabah o defterlere imza atarken neden ellerim titriyor sanıyorsun? Sesini alçaltıyor. Ben uzak durmam. Ama yalnız da gitmem. Dinle.'
            : g === 'soz'
              ? 'Gülce gözlerini kapatıyor. İmzalamamış, diyor; bir kez daha, kendine. Gözlerini açtığında sesi düzgün. Teşekkür ederim. Şimdi sen dinle.'
              : 'Gülce bardağını iki eliyle tutuyor; ısınmak için değil, bir şey tutmak için.',
        'Nisan, bin üç yüz yirmi dokuz. Dokuzunda babam eve gelmedi. Annem sabaha kadar pencerede oturdu. Üç gün sonra Haliç\'ten, Unkapanı\'nın önünden çıkardılar. Köprüden düşmüş, dediler; kaza.',
        'Ben gördüm onu, Arif. On dört yaşındaydım; kimse beni durdurmadı. Bileklerinde ince, morarmış bir şerit vardı. Kimse sormadı. Raporu genç bir komiser muavini yazdı; bıyığı yeni terlemişti, kalemi tutarken eli titriyordu. Adı Halim\'di.',
        delilVar(d, 'ip_izi') ? 'Sabri\'nin bilekleri geliyor gözünün önüne, rıhtım taşının üstünde: aynı ince, morarmış şerit.' : '',
        'Gülce belgeyi katlıyor. Dosya Maliye Nezareti\'nin evrak mahzeninde olmalı, köprünün öte yakasında. Ben bugün izinliyim; talep pusulasını yazarım, dokuzda evrak odasında olurum. Ama bin üç yüz yirmi dokuz evrak-ı atîka sayılır; müdür imzasız kimse aşağı inemez, müdür de İngilizlerden başını kaldırmıyor.',
        'Kapının önünde kâtip Tahsin Efendi oturur; aşağıda, rafların arasında ihtiyar Rüştü Efendi dolaşır, öksürüğünden bilirsin. Ben Tahsin Efendi\'yi bir süre oyalayabilirim. Öğle namazında ikisi de çıkar, on ikiden on iki kırk beşe kadar. İkiyi çeyrek geçe büroya dönmek zorundayım.',
        'Defterler Rumi yılla dizilir, diyor kalkarken. Mart\'tan sonra miladiden beş yüz seksen dört eksik. Babam on üçün Nisan\'ında öldü. Yanlış rafı karıştırırsan Rüştü Efendi duyar.',
      ].filter(Boolean);
    },
    secenekler: [
      {
        etiket: 'Köprüde buluşuruz.',
        yap: (d) => {
          delilEkle(d, 'siyakat_satirlari');
          delilEkle(d, 'kamil_olumu');
          d.bayrak.g6Pusula = true;
          if (!d.kesif) d.kesif = {};
          d.kesif.kapi_kopru_gec = true;
        },
        sonra: null,
      },
    ],
    bitisSozu:
      'Altıncı görev: Siyakat. Galata Köprüsü Rıhtım Caddesi\'nin batı ucunda, kayıkhanenin kuzeyinde. Nezaret dokuzdan beşe açık. Menüdeki Yerler\'den de gidebilirsin.',
  },
  g6_dosya: {
    ortam: 'ortam_arsiv',
    ortamOran: 0.5,
    baslik: 'Dört yüz on yedi',
    paragraflar: [
      'Bin üç yüz yirmi dokuz, Gümrük Kalemi. Klasörlerin arasında ince bir dosya; sırtında soluk mürekkeple dört yüz on yedi. İpi yeni bağlanmış; düğümü taze. Geçen salı biri açıp kapatmış.',
      'Gaz lambasının ışığı rafın arasından süzülüyor; dizinin üstünde açıyorsun. Bir yük kaydı, Nisan bin üç yüz yirmi dokuz. Vapur Elpis, Selanik\'ten Pire üzerinden İstanbul\'a, oradan Atina\'ya iade. Yük: zirai alet, otuz sandık. Alıcı: Atina\'da, Kont S. hesabına.',
      'İmza yeri boş. Beş buçuk yıldır boş. Kenarda, ince ve düzgün bir rık\'a ile, sayfaya bastırarak yazılmış iki satır: Sandıklarda tüfek var. İmzalamam. K.',
      'Altına iliştirilmiş havale kâğıdında Latin harfleriyle küçük bir paraf: N. B. Bir de köşede, kabartma, iğne başı kadar bir işaret. Parmağının ucuyla yokluyorsun: kanatlı anahtar.',
      'Dosyayı kapatırken arka kapağın astarı kabarıyor; içine bir şey yapıştırılmış. Tırnağınla kaldırıyorsun: dörde katlanmış küçük bir pusula. Üstünde, aynı düzgün el yazısıyla, tek kelime: Gülce\'ye.',
    ],
    secenekler: [
      { etiket: 'Pusulayı açmadan göğsüne koy. Onun.', yap: (d) => (d.bayrak.notKarar = 'ver'), sonra: null },
      { etiket: 'Aç ve oku.', yap: (d) => (d.bayrak.notKarar = 'oku'), sonra: 'g6_not' },
      { etiket: 'Pusulayı sakla. Zamanı gelince verirsin.', yap: (d) => (d.bayrak.notKarar = 'sakla'), sonra: null },
    ],
    bitisSozu: 'Dosya ceketinin içinde. Buradan çık; Rüştü Efendi\'nin öksürüğünü dinle.',
  },
  g6_not: {
    ortam: 'ortam_arsiv',
    ortamOran: 0.4,
    baslik: 'Pusula',
    paragraflar: [
      'Kızım. Bunu okuyorsan ben dönmedim demektir; sen de benim gibi inatçı çıkmışsın demektir.',
      'Bir gün biri sana da İmzala ve yaşa diyecek. Ben imzalamadım. Yaşamak güzeldi; ama imza benim adımdı, adımı da sana bırakmak istedim.',
      'Annene iyi bak. Seni çok sevdim. Baban, Kâmil.',
      'Pusulayı katlıyorsun. Elin bir süre üstünde kalıyor. Bu kâğıdı Gülce\'ye vermek zorundasın; ama okuduğunu da söylemek zorunda kalacaksın.',
    ],
    secenekler: [{ etiket: 'Pusulayı göğsüne koy', sonra: null }],
    bitisSozu: 'Dosya ceketinin içinde. Buradan çık; Rüştü Efendi\'nin öksürüğünü dinle.',
  },
  g6_karar_oncesi: {
    ortam: 'ortam_han',
    baslik: 'Akşam',
    paragraflar: (d) => {
      const not = bayrak(d, 'notKarar');
      const duzelt = bayrak(d, 'g6Duzelt') || [];
      return [
        d.mekan === 'evrak_odasi'
          ? 'Gülce\'yi okuma masasından kaldırıp Nezaret\'in merdivenlerine çıkarıyorsun. Köprünün üstünde rüzgâr; Haliç gri.'
          : 'Avluda Ohannes ocağa bir odun daha atıyor ve kendiliğinden içeri çekiliyor.',
        duzelt.length ? 'Panonu birlikte gözden geçiriyorsunuz; Gülce bazı bağlarını söküyor: ' + duzelt.join(' ') : '',
        'Bildiklerini anlatıyorsun. Zimmetin dördüncü satırı bir şehre değil, bir dosyaya çıkıyor; dosya da Atina\'ya, Kont S. hesabına giden otuz sandık tüfeğe. Mühür. Kâmil Efendi o kaydı imzalamadı; dosya o hafta Nazım Bey\'in kalemine çekildi, Kâmil Efendi\'nin eve dönmediği gün geri verildi. Bilekleri Sabri\'ninki gibiydi. Raporu Halim yazdı.',
        bayrak(d, 'nazimUyarildi')
          ? 'Bir şey daha: Nazım Bey artık birinin dosyayı sorduğunu biliyor. Tahsin Efendi pusulanın arkasına adları yazmıştı.'
          : '',
        not === 'ver' || not === 'oku' ? 'Göğsündeki pusulayı çıkarıp ona uzatıyorsun. Dosyanın astarındaydı.' : '',
        not === 'ver' || not === 'oku'
          ? 'Gülce kâğıdın üstündeki tek kelimeye uzun uzun bakıyor: kendi adı, babasının elinden. Açıyor. Okurken dudakları kıpırdamıyor bu kez. Sonra gülüyor; ağlıyor da. İnatçı, diyor. Bana inatçı demiş.'
          : not === 'sakla'
            ? 'Göğsündeki pusula ağırlaşıyor. Gülce dosyanın kapağını okşarken onu çıkarmıyorsun; zamanı değil, diyorsun kendine. Ya da cesaretin yok.'
            : '',
        not === 'oku' ? 'Okudun mu, diye soruyor. Evet. Gülce başını sallıyor; kızgın değil. Babam da öyleydi, diyor; mühürsüz zarf gördü mü okurdu. Kâtip huyu.' : '',
        'Gülce dosyayı kucağına alıyor. Şimdi ne yapacağız, Arif?',
      ].filter(Boolean);
    },
    secenekler: [{ etiket: 'Devam', sonra: 'g6_karar' }],
  },
  g6_karar: {
    ortam: 'ortam_han',
    baslik: 'Dosya',
    paragraflar: [
      'Nazım Bey hâlâ o binada, üst katta, bir masanın arkasında oturuyor. İngilizler onun imzasıyla gümrük yönetiyor. Kanatlı anahtar onun eliyle Atina\'ya uzanıyor.',
      'Rıza Bey, bir dosyanın mahkeme olmadığını ama mahkemesiz dosyanın kül olduğunu söylerdi. Nermin\'in gazetesi her cumartesi çıkıyor.',
    ],
    secenekler: [
      { etiket: 'Nazım Bey\'in kapısını çalalım. Gülce yüzüne söylesin.', yap: (d) => (d.bayrak.karar6 = 'yuzles'), sonra: 'g6_son_yuzles' },
      { etiket: 'Dosyayı Rıza Bey\'e verelim. Mahkeme günü gelir.', yap: (d) => (d.bayrak.karar6 = 'riza'), sonra: 'g6_son_riza' },
      { etiket: 'Nermin yazsın. Bütün şehir okusun.', yap: (d) => (d.bayrak.karar6 = 'gazete'), sonra: 'g6_son_gazete' },
    ],
  },
  g6_son_yuzles: {
    ortam: 'ortam_buro',
    baslik: 'Nazım Bey',
    paragraflar: (d) =>
      [
        'Ertesi sabah Nezaret\'in üst katı. Kapıda odacı adınızı soruyor; Gülce kendi adını söylüyor, babasının adıyla birlikte. Odacı içeri giriyor, çıkıyor: Buyursunlar.',
        'Nazım Bey ellilerinde, ince bıyıklı, gümüş çerçeveli gözlüklü bir adam. Masasında açık bir Fransız romanı; sayfaya bir kâğıt bıçağı koymuş. Ayağa kalkıyor, Gülce\'ye yer gösteriyor. Kâmil Efendi\'nin kızı, diyor. Babanızın el yazısı bu nezaretin en güzel el yazısıydı.',
        'Gülce oturmuyor. Dosyanın bir suretini masaya, romanın üstüne koyuyor. İmzala ve yaşa, dediniz ona.',
        bayrak(d, 'nazimUyarildi')
          ? 'Nazım Bey sureti açmıyor bile. Tahsin Efendi pusulanızı getirdi, diyor; dün öğleden sonra. Sizi bekliyordum.'
          : 'Nazım Bey sureti açıyor, parmağıyla kenardaki iki satırı buluyor. Yüzünde hiçbir şey kıpırdamıyor.',
        'Ben hep aynı şeyi söylerim Gülce Hanım, diyor. Size de söylüyorum. Çekmecesinden bir kâğıt çıkarıp önüne sürüyor: Maliye\'nin Gümrük Kalemi\'ne tayin, iki misli maaş. İmza yeri boş.',
        'Gülce kâğıdı alıyor, ikiye yırtıyor, sonra bir daha ikiye. Parçaları romanın üstüne bırakıyor. Bir gün, diyor, bu masanın arkasında başka biri oturacak.',
        'Nazım Bey gülümsüyor. Atina\'daki dostlarım kâğıt yırtan insanları sever, diyor. Yırtılan kâğıt da bir kâğıttır. Kapıdan çıkarken sesi arkanızdan geliyor, yumuşak: Arif Bey, değil mi? Hamal. Selanik\'te sizi soruyorlar.',
        'Merdivenlerde Gülce\'nin dizleri boşalıyor; kolundan tutuyorsun. Gülüyor. Yüzüne söyledim, diyor. Beş yıldır ilk kez nefes alabiliyorum.',
      ].filter(Boolean),
    secenekler: [
      {
        etiket: 'Devam',
        yap: (d) => {
          d.bayrak.nazimUyarildi = true;
          d.bayrak.muhurUyarildi = true;
          d.gulceGuven = (d.gulceGuven || 0) + 1;
        },
        sonra: 'g6_kapanis',
      },
    ],
  },
  g6_son_riza: {
    ortam: 'ortam_han',
    baslik: 'Rıza Bey',
    paragraflar: (d) =>
      [
        'Rıza Bey dosyayı lambanın altına çekiyor; gözlüğünü bir takıyor, bir çıkarıyor. Kenardaki iki satırı okuyunca uzun süre bir şey demiyor.',
        'Halim\'in raporunu hatırlıyorum, diyor sonunda. Bin üç yüz yirmi dokuz baharı. İlk raporuydu. Ben imzalattım ona. Kaza, yazdı; ben de mühürledim. Çocuğun eli titriyordu; heyecandan sandım.',
        'Bastonunu iki dizinin arasına dikiyor. Bunun bedelini ben de ödeyeceğim, Gülce Hanım. Ama önce o adam.',
        'Dosyayı paltosunun iç cebine yerleştiriyor. Bir dosya mahkeme değildir. Ama mahkemesiz dosya da kül olur. Bunu İstanbul\'un dışına, güvendiğim birine göndereceğim; İngilizlerin de Nazım\'ın da eli uzanmasın. Gün gelince, delille.',
        'Gülce başını sallıyor; dudakları beyaz. Sabredeceğim, diyor. Ama sonsuza kadar değil.',
      ].filter(Boolean),
    secenekler: [
      {
        etiket: 'Devam',
        yap: (d) => {
          d.rizaBag = (d.rizaBag || 0) + 1;
          d.bayrak.dosyaRizada = true;
        },
        sonra: 'g6_kapanis',
      },
    ],
  },
  g6_son_gazete: {
    ortam: 'ortam_cemil_ev',
    baslik: 'Cumartesi',
    paragraflar: (d) =>
      [
        'Nermin dosyayı Cihangir\'deki masaya yayıp sigarasını unutuyor; kül uzayıp masaya düşüyor. Adını yazamam, diyor. İngiliz sansürü siler, Nazım\'ın avukatı da beni yer. Ama numarayı yazarım. Dört yüz on yedi. Bilen bilir.',
        'Cumartesi sabahı gazetenin üçüncü sayfasında kısa bir yazı: Bir Gümrük Kâtibinin Ölümü. Bir babanın imzalamadığı bir kâğıt, Haliç\'ten çıkarılan bir ceset, bileklerinde bir iz ve bir numara. İmza: N.',
        'Öğleye kadar gazete Karaköy\'ün her kahvesinde. Hamallar okuyamayana okuyor. Ohannes yazıyı kesip hanın kapısına iğneliyor.',
        'Akşamüstü büronun odacısı Gülce\'ye Nezaret\'ten bir haber getiriyor: dört yüz on yedinin yeri mahzende yangın çıkmış gibi boşaltılmış; bütün rafı yakmışlar. Dosyanın aslı sende. Ama artık herkes biliyor ki sende.',
        'Gülce gazeteyi katlayıp göğsüne bastırıyor. Babamın adı yok, diyor. Ama babam orada.',
      ].filter(Boolean),
    secenekler: [
      {
        etiket: 'Devam',
        yap: (d) => {
          d.nerminBag = (d.nerminBag || 0) + 1;
          d.bayrak.kollarUyarildi = true;
          d.bayrak.nazimUyarildi = true;
        },
        sonra: 'g6_kapanis',
      },
    ],
  },
  g6_kapanis: {
    ortam: 'ortam_han',
    baslik: 'Dört kapı',
    paragraflar: (d) =>
      [
        'Gece, hanın avlusu. Süleyman eski bir deniz haritasını taş masaya seriyor; köşelerine pirinç pusulasını, çaydanlığı, Rıza\'nın bastonunu, Cemil\'in kitabını koyuyorlar.',
        'Gülce dört yeri parmağıyla gösteriyor. Selanik: Göz. Viyana: Kasa. Berlin: Kılıç. Atina: Mühür. Dört diş, dört kapı.',
        delilVar(d, 'salonique_n') ? 'Delorme\'un çantasındaki telgraf hâlâ masada: SALONIQUE. N. 23 ARALIK. Birileri Selanik\'te seni bekliyor.' : 'Delorme\'un son sözü masanın üstünde asılı: Selanik\'te görüşürüz.',
        bayrak(d, 'notKarar') === 'sakla' ? 'Göğsündeki pusula hâlâ orada. Gülce haritaya eğilmişken bir an çıkaracak gibi oluyorsun. Çıkarmıyorsun.' : '',
        'Cemil gözlüklerini siliyor: Bir anahtarın dört dişi varsa bir de kilidi vardır. Kimse cevap vermiyor; çünkü herkes aynı şeyi düşünüyor.',
        'Altıncı görevin sonu: Siyakat. Yedinci görev bir sonraki adımda.',
      ].filter(Boolean),
    secenekler: [{ etiket: 'Devam', yap: (d) => gorev6Bitir(d), sonra: null }],
    bitisSozu: 'Kalafatçı Hanı\'nın avlusu, sabah. Karaköy\'de dolaşmayı sürdürebilirsin.',
  },
};

// --- Başlangıç ve bitiş ---
export function gorev6Baslat(d) {
  d.bayrak.g5Gun = d.gorevGun;
  d.gorev = 6;
  if (gunDakika(d) > 8 * 60) d.gun += 1;
  d.gorevGun = d.gun;
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

function gorev6Bitir(d) {
  d.bayrak.g6Bitti = true;
  // Rıza'ya verilirse aynı gece; Nazım Bey'e ertesi sabah gidilir; gazete cumartesi çıkar
  const ek = { yuzles: 1, gazete: 2 }[bayrak(d, 'karar6')] || 0;
  d.gun = Math.max(d.gun, d.gorevGun + ek) + 1;
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

// Beşinci görevden kalan eski kayıt: altıncı görev açılış sahnesiyle başlar.
// Evrak odasında saat iki buçukta Nazım Bey: yakındaysan konuştuklarını duyarsın.
export function gorev6Ilerle(d, olaylar = []) {
  if (d.sahne) return;
  if (d.gorev === 5 && bayrak(d, 'g5Bitti')) {
    gorev6Baslat(d);
    d.sahne = 'g6_acilis';
    return;
  }
  if (!g6Mi(d) || bayrak(d, 'g6Bitti')) return;
  const gd = gunDakika(d);
  if (gd >= NAZIM_GELIR && gd < NAZIM_GIDER && bayrak(d, 'nazimGeldiGun') !== d.gun) {
    d.bayrak.nazimGeldiGun = d.gun;
    if (bayrak(d, 'tahsinSoruldu')) d.bayrak.nazimUyarildi = true;
  }
  if (d.mekan === 'evrak_odasi' && gd >= NAZIM_GELIR + 2 && gd < NAZIM_GIDER && !delilVar(d, 'nazim_sozu') && uzak(d.oyuncu, { x: 313.5, y: 8 }) <= 9) {
    delilEkle(d, 'nazim_sozu');
    const soruldu = bayrak(d, 'tahsinSoruldu');
    olaylar.push({
      tur: 'anlatim',
      dinle: true,
      yeniDeliller: ['nazim_sozu'],
      metin:
        'Kâtibin masasına eğilmiş gözlüklü bey alçak sesle konuşuyor; kokusu kolonya değil, ıslak kâğıt. Tahsin Efendi, dört yüz on yedi numaralı dosyayı kimseye vermeyin. Soran olursa adını yazın, bana getirin. Tahsin Efendi ayağa kalkıyor: Baş üstüne, Nazım Bey. ' +
        (soruldu
          ? 'Sonra pusulayı uzatıyor: Bu sabah biri sordu efendim; Gülce Hanım\'ın pusulasıyla. Nazım Bey kâğıdı katlayıp yeleğinin cebine koyuyor. Teşekkür ederim, diyor. Arkasını dönmeden.'
          : 'Nazım Bey bir an odaya bakıyor; gözlükleri lambayı yansıtıyor. Sonra merdivenlere yürüyor.'),
    });
  }
}

export function g6Ipucu(d) {
  if (bayrak(d, 'g6Bitti')) return 'Altıncı görev bitti: Siyakat. Dört şehir, dört kol. Yedinci görev bir sonraki adımda.';
  if (g6Tamam(d)) return 'Panonda üç bağ kurulu. Gülce\'yle konuş: öğleden önce evrak odasında, akşam beşten sonra handa.';
  const gd = gunDakika(d);
  const p = [];
  const eksik = [];
  if (!dogruTeori(d, 'dorduncu_dis')) eksik.push('dördüncü dişin nerede olduğu');
  if (!dogruTeori(d, 'ayni_yontem')) eksik.push('Kâmil Efendi\'nin nasıl öldüğü');
  if (!dogruTeori(d, 'emri_veren')) eksik.push('emri kimin verdiği');
  p.push('Panoda kurman gereken bağlar: ' + eksik.join(', ') + '.');
  if (bayrak(d, 'mahzenKapaliGun') === d.gun) p.push('Bugün Nezaret\'e giremezsin; Tahsin Efendi seni tanıdı. Yarın sabah dokuzda yeniden dene.');
  else if (!delilVar(d, 'kamil_dosyasi')) {
    p.push('Dosya 417 Maliye\'nin evrak mahzeninde, Gümrük Kalemi\'nin rafında. Rumi yılı sen bul: Kâmil Efendi 1913 Nisan\'ında öldü; Mart\'tan sonra Rumi yıl miladiden 584 eksiktir.');
    p.push('Galata Köprüsü Rıhtım Caddesi\'nin batı ucunda; Nezaret dokuzdan beşe açık. Mahzene Gülce Tahsin Efendi\'yi oyalarken ya da öğle namazında, on ikiden on iki kırk beşe kadar inilir. Gülce ikiyi çeyrek geçe gider.');
    if (gd >= GULCE_GIDER) p.push('Gülce bugün büroya döndü, öğle arası da geçti; yarın sabah dokuzda yeniden dene.');
  }
  if (!delilVar(d, 'evrak_kaydi') && !delilVar(d, 'nazim_sozu'))
    p.push('Dosyayı kimin çektiğini öğrenmek için Tahsin Efendi\'ye Gülce\'nin pusulasını gösterebilirsin; ama adını yazar. Saat iki buçukta evrak odasında olursan başka bir şey de duyabilirsin.');
  return p.join(' ');
}
