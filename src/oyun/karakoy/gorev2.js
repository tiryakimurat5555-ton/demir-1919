// İkinci görev: İkinci Adım Sesi (birinci perde, Karaköy). Saf JavaScript; gorev1.js'i içe aktarmaz
// (gorev1.js bu dosyadaki tanımları kendi tablolarına katar).
//
// Kapının altındaki lavantalı notun ertesi günü. Sabri kimsesiz diye gömülmüştür. Gureba'dan Doktor Cemil
// gelir: Sabri'nin midesinden çıkan jeton (kanatlı anahtar, Mercure, Pera, 17) ve sırtındaki bıçak yarası.
// Bütün gün biri Arif'in peşindedir: kasketli bir adam. Adımlarını duymak, durunca onun da durduğunu fark
// etmek, dönüp ona bakmak oyuncuya kalmıştır. Akşam o adam, han ile yapıların arasındaki karanlık geçitte
// Komiser Halim'le buluşur; yaklaşıp sessizce dinleyen, gece kayıkhanenin yakılacağını öğrenir.
// Karar: belgeyi ve Süleyman'ı taşımak, pusu kurmak ya da haber verip beklemek.
//
// d alanları: gorev (2), gorevGun (görevin başladığı gün), takip {...}, dinle {...}, bayrak.*

import { goreliAci, uzaklik } from '../konum';

const bayrak = (d, k) => d.bayrak[k];
const delilVar = (d, id) => d.deliller.includes(id);
function delilEkle(d, id) {
  if (delilVar(d, id)) return false;
  d.deliller.push(id);
  return true;
}
const gunDakika = (d) => ((d.dakika % 1440) + 1440) % 1440;
const ilkGun = (d) => d.gun === d.gorevGun;

export const G2_DELILLER = {
  lavanta_not: {
    ad: 'Kapının altındaki not',
    tarif: 'Kalın, pahalı, lavanta kokulu bir kâğıt. Düzgün bir Türkçeyle tek satır ve altında mürekkeple basılmış kanatlı bir anahtar. Seni tanıyorlar; odanı biliyorlar.',
  },
  jeton: {
    ad: 'Sabri\'nin yuttuğu jeton',
    tarif: 'Doktor Cemil\'in Sabri\'nin midesinden çıkardığı pirinç jeton. Bir yüzünde kanatlı anahtar, öbür yüzünde: Mercure, Pera, 17. Sabri onu ölmeden önce, birileri ceplerini ararken yutmuş.',
  },
  bicak_yarasi: {
    ad: 'Sırttaki bıçak yarası',
    tarif: 'Cemil\'e göre Sabri\'nin ciğerlerinde su yok; suya ölü atılmış. Sol kürek kemiğinin altında, kaburgaların arasından girmiş ince bir bıçak yarası: usta işi. Ceketinin yakası lavanta kokuyormuş.',
  },
  takipci: {
    ad: 'Kasketli adam',
    tarif: 'Bütün gün senin gittiğin yere giden kasketli bir adam. Sen durunca o da duruyor; sen yürüyünce adımları on iki adım geriden geliyor.',
  },
  halim_bulusma: {
    ad: 'Karanlık geçitteki buluşma',
    tarif: 'Akşam, Kalafatçı Hanı ile yapıların arasındaki karanlık geçitte Komiser Halim kasketli adamla buluştu. Fısıl fısıl konuştular.',
  },
  kulak_misafiri: {
    ad: 'Geçitte duyduklarım',
    tarif: 'Halim ile kasketli adamın konuşması: Delorme memnun değil, kâğıt hâlâ ortada. Cumartesi gecesi Pera\'da, on yedide toplanacaklar. Bu gece kayıkhane yakılacak; ihtiyar içindeyse kaderi.',
  },
  gaz: {
    ad: 'Batı duvarındaki gaz tenekeleri',
    tarif: 'Kayıkhanenin batı duvarının dibinde, çuvalla örtülmüş iki gaz tenekesi. Biri yarı boş; tahtalar ıslak ve keskin kokuyor.',
  },
  belge_tarihi: {
    ad: 'Belgedeki tarih',
    tarif: 'Cemil belgenin Fransızca satırlarını okudu: isim sandığın kısaltmalar gemi adları ve limanlar. Selanik, Pire, Trieste. Ve en son tarih: 7 Aralık. Bu cumartesi.',
  },
  nazim_emri: {
    ad: 'Maliye\'den gelen emir',
    tarif: 'Gülce\'ye göre Ferrante\'nin adamı dün akşam yine geldi; elinde Maliye\'den Nazım Bey imzalı bir emirle: Leventis\'in kaydı düzeltilsin, kırk sandık otuz sekiz yazılsın.',
  },
  halimin_adami: {
    ad: 'Kasketlinin kimliği',
    tarif: 'Hüsnü Reis tanıyor: Kasketli Yaşar. Sabahları karakolun arka kapısından çıkar; Komiser Halim\'in muhbiri.',
  },
  yuzbasi_motor: {
    ad: 'Ferrante\'nin motorundaki yüzbaşı',
    tarif: 'Hüsnü Reis dün akşam, belgeyi verdiğin İngiliz yüzbaşısının Ferrante\'nin motoruna bindiğini, Moda\'ya doğru gittiğini gördü.',
  },
};

// Panoda kurulacak bağlar. gerekli olanlar ikinci görevin üç bağıdır.
export const G2_CIKARIMLAR = {
  toplanti: {
    ifade: 'Sabri\'nin yuttuğu jeton, kanatlı anahtarın Pera\'daki buluşma yerini gösteriyor: Mercure Kulübü, on yedi.',
    kume: [['jeton'], ['kanatli_anahtar', 'kulak_misafiri', 'belge_tarihi']],
    gerekli: true,
    gorev: 2,
  },
  katil: {
    ifade: 'Sabri\'yi sırtından bıçaklayan, lavanta kokulu, Frenk ağızlı adam.',
    kume: [['bicak_yarasi'], ['paltolu', 'fransiz_aksan', 'lavanta_not', 'kulak_misafiri']],
    gerekli: true,
    gorev: 2,
  },
  tehlike: {
    ifade: 'Kanatlı anahtar artık senin peşinde; sırada Süleyman\'ın kayıkhanesi var.',
    kume: [['lavanta_not'], ['takipci', 'kulak_misafiri', 'halim_bulusma', 'gaz']],
    gerekli: true,
    gorev: 2,
  },
  halim_bagli: {
    ifade: 'Komiser Halim, lavantalı adam için çalışıyor; Sabri\'yi kimsesiz diye o gömdürdü.',
    kume: [['halimin_adami', 'halim_bulusma'], ['kulak_misafiri', 'nazim_emri']],
    gorev: 2,
  },
  ihanet: {
    ifade: 'Belgeyi verdiğin yüzbaşı da onlardan; kanatlı anahtarı görünce şaşırmadı, tanıdı.',
    kume: [['yuzbasi_motor'], ['kanatli_anahtar', 'lavanta_not']],
    gorev: 2,
  },
};

export const G2_YANLISLAR = [
  { gorev: 2, ifade: 'Kasketli adam İngilizlerin adamı.', duzeltme: 'İngiliz kendi adamına kasket giydirmez evlat, üniforma giydirir. O herif bu limanın çocuğu.' },
  { gorev: 2, ifade: 'Sabri\'yi Komiser Halim kendi eliyle öldürdü.', duzeltme: 'Halim\'in eli bıçak tutmaz, rüşvet tutar. Sabri\'yi bıçaklayan usta biri; Halim yalnız üstünü örttü.' },
  { gorev: 2, ifade: 'Jeton Sabri\'nin kendi kumarından kalma.', duzeltme: 'Sabri\'nin kumar oynayacak parası yoktu. Bir ateşçi Pera\'daki kulübün kapısından bile giremez.' },
];

// Süleyman'ın düzeltmeleri için iki görevin yanlışları (gorev1.js kendininkileri ekler)
export const TUM_YANLISLAR = [...G2_YANLISLAR];

// --- Nesneler ---
export const G2_NESNELER = [
  {
    id: 'gaz',
    ad: 'Batı duvarının dibindeki çuval',
    mekan: 'dis',
    x: -53.2,
    y: 6,
    mevcut: (d) => d.gorev === 2 && !bayrak(d, 'g2Bitti') && (d.gun > d.gorevGun || gunDakika(d) >= 19 * 60 + 40),
    giris: 'Kayıkhanenin batı duvarının dibinde, rıhtımın karanlık ucunda bir çuval. Altında bir şeyin köşesi çıkmış. Keskin bir koku.',
    eylemler: [
      {
        id: 'bak',
        etiket: 'Çuvalı kaldır',
        yap: () => ({
          metin: 'Çuvalın altında iki gaz tenekesi. Biri yarı boş; duvarın alt tahtaları ıslak, parmağına bulaşan şey yakıcı kokuyor. Biri kayıkhaneyi yakmaya hazırlanmış.',
          delil: ['gaz'],
        }),
      },
      {
        id: 'denize',
        etiket: 'Tenekeleri denize boşalt',
        kosul: (d) => delilVar(d, 'gaz') && !bayrak(d, 'gazAtildi'),
        yap: (d) => {
          d.bayrak.gazAtildi = true;
          return { metin: 'Tenekeleri tek tek rıhtımın kenarına taşıyıp denize boşaltıyorsun. Gaz suyun üstünde gökkuşağı gibi yayılıyor. Islak tahtalara kum serpiyorsun. Gelen kim olursa eli boş gelecek.', sure: 10 };
        },
      },
    ],
  },
  {
    id: 'kul',
    ad: 'Yanık kirişler',
    mekan: 'kayikhane',
    x: -47,
    y: 6,
    mevcut: (d) => !!bayrak(d, 'kayikhaneYandi'),
    giris: 'Yanık kirişler.',
    eylemler: [
      {
        id: 'bak',
        etiket: 'Küllerin arasına bak',
        yap: (d) => ({
          metin:
            bayrak(d, 'kayikhaneYandi') === 'tam'
              ? 'Islak kül, kömürleşmiş kirişler. Süleyman\'ın kayığından geriye bir omurga kalmış. Duvardaki pusulanın camı erimiş ama ibresi hâlâ kuzeyi gösteriyor.'
              : 'Batı duvarı kömür karası, birkaç kiriş yanmış. Kayık sağlam. Süleyman kalafat ziftini yeniden kaynatmış bile.',
        }),
      },
    ],
  },
];

// --- Takip: kasketli adam ---
const TAKIP_ARA = 12; // oyuncunun yolunda bu kadar metre geriden gelir
const TAKIP_HIZ = 2.8; // m/sn, gerçek (oyuncudan biraz hızlı)
const KACIS_HIZ = 4.5;
const TAKIP_BAS = 8 * 60;
const TAKIP_BIT = 18 * 60 + 40;
const FARK_ACI = 0.45; // radyan; bu açıdan dar bakarsan onu görürsün
const FARK_MENZIL = 18;
const FARK_SURE = 1.5; // saniye, gerçek
const KACIS_MENZIL = 5;
const IPUCU_DURGUN = 5; // saniye, gerçek

export function takipBaslat() {
  return { durum: 'bekliyor', iz: [], x: null, y: null, yuruyor: false, bakis: 0, durgun: 0, ipucu: 0, sonIpucu: -999, sure: 0 };
}

function takipAktif(d) {
  const t = d.takip;
  if (!t || d.gorev !== 2 || bayrak(d, 'g2Bitti') || !ilkGun(d)) return false;
  const gd = gunDakika(d);
  return gd >= TAKIP_BAS && gd < TAKIP_BIT;
}

function izUzunlugu(iz, son) {
  let u = 0;
  for (let i = 1; i < iz.length; i++) u += uzaklik(iz[i - 1], iz[i]);
  if (son && iz.length) u += uzaklik(iz[iz.length - 1], son);
  return u;
}

// İzin başından metre kadar ilerler (izin başı takipçinin yeridir)
function izdeIlerle(iz, metre) {
  let kalan = metre;
  while (iz.length > 1 && kalan > 0) {
    const a = iz[0];
    const b = iz[1];
    const u = uzaklik(a, b);
    if (u <= kalan) {
      iz.shift();
      kalan -= u;
    } else {
      const t = kalan / u;
      iz[0] = { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
      kalan = 0;
    }
  }
}

function bakiyorMu(o, p) {
  const a = goreliAci(o, p);
  return a < FARK_ACI || a > Math.PI * 2 - FARK_ACI;
}

// Takipçinin bir adımı. hiz: oyuncunun hızı (0-1), dt: gerçek saniye
function takipIlerle(d, hiz, dt, olaylar, sessiz) {
  const t = d.takip;
  if (!t) return;
  if (!takipAktif(d)) {
    if (t.durum === 'takip' || t.durum === 'kaciyor') {
      t.durum = 'gitti';
      t.yuruyor = false;
    }
    return;
  }
  const o = d.oyuncu;
  const disarida = d.mekan === 'dis';
  t.yuruyor = false;

  if (t.durum === 'kaciyor') {
    const h = t.kacisHedef;
    const u = uzaklik(t, h);
    const m = Math.min(u, KACIS_HIZ * dt);
    if (u < 0.3) {
      t.durum = 'kacti';
      return;
    }
    t.x += ((h.x - t.x) / u) * m;
    t.y += ((h.y - t.y) / u) * m;
    t.yuruyor = true;
    return;
  }
  if (t.durum === 'kacti') return;

  if (t.durum === 'bekliyor') {
    // Oyuncu sokağa ilk çıktığında takipçi işe başlar: kapının karşısında bekliyordu,
    // Arif on iki adım uzaklaşınca peşine düşer
    if (!disarida) return;
    t.durum = 'takip';
    t.iz = [{ x: o.x, y: o.y }];
    t.x = o.x;
    t.y = o.y;
    t.belirdi = false;
  }

  // İz: oyuncu sokaktayken yarım metrede bir noktası eklenir
  if (disarida) {
    const son = t.iz[t.iz.length - 1];
    if (uzaklik(son, o) > 6) {
      // Oyuncu başka bir kapıdan çıktı: takipçi o kapıyı da gözlüyordu
      if (uzaklik(t, o) > 20) {
        t.iz = [{ x: o.x, y: o.y }];
        t.x = o.x;
        t.y = o.y;
        t.belirdi = false;
      } else t.iz.push({ x: o.x, y: o.y });
    } else if (uzaklik(son, o) >= 0.5) t.iz.push({ x: o.x, y: o.y });
  }

  // İlerle: oyuncunun yolunda TAKIP_ARA metre geride kal (oyuncu içerideyse kapıdan o kadar uzakta bekler)
  const ara = t.fark ? TAKIP_ARA + 6 : TAKIP_ARA;
  const L = izUzunlugu(t.iz, disarida ? o : null);
  if (L >= ara) t.belirdi = true;
  if (t.belirdi && L > ara + 0.05) {
    const m = Math.min(L - ara, TAKIP_HIZ * dt);
    izdeIlerle(t.iz, m);
    t.x = t.iz[0].x;
    t.y = t.iz[0].y;
    t.yuruyor = m > 0.01;
  }
  if (t.iz.length > 400) t.iz.splice(1, t.iz.length - 400);

  if (!disarida || sessiz || !t.belirdi) return;
  const u = uzaklik(o, t);

  // Fark edilmişse ve oyuncu yaklaşırsa kaçar
  if (t.fark) {
    if (u < KACIS_MENZIL) {
      t.durum = 'kaciyor';
      const yon = t.x >= o.x ? 1 : -1;
      t.kacisHedef = { x: yon * 62, y: 12 };
      olaylar.push({
        tur: 'anlatim',
        metin: 'Kasketli adam sana doğru döndüğünü görünce topukları üstünde dönüyor ve koşmaya başlıyor; adımları ' + (yon > 0 ? 'doğuya' : 'batıya') + ', caddenin ucuna doğru uzaklaşıyor.',
        uyari: true,
      });
    }
    return;
  }

  // Durunca onun da durduğunu fark ettiren ipucu
  if (hiz < 0.05) t.durgun += dt;
  else t.durgun = 0;
  t.sure += dt;
  if (t.durgun >= IPUCU_DURGUN && t.ipucu < 2 && u < 25 && t.sure - t.sonIpucu > 60) {
    t.ipucu += 1;
    t.sonIpucu = t.sure;
    t.durgun = 0;
    olaylar.push({
      tur: 'anlatim',
      metin:
        t.ipucu === 1
          ? 'Durduğunda arkandaki adımlar da duruyor. Bir an sonra değil; aynı anda.'
          : 'Yine o adımlar. Sen durunca duruyorlar. Biri arkanda, seninle birlikte nefes alıyor.',
    });
  }

  // Ona bakarsa görür
  if (u < FARK_MENZIL && bakiyorMu(o, t)) t.bakis += dt;
  else t.bakis = Math.max(0, t.bakis - dt);
  if (t.bakis >= FARK_SURE) {
    t.fark = true;
    const yeni = delilEkle(d, 'takipci');
    olaylar.push({
      tur: 'anlatim',
      metin:
        'Dönüp bakıyorsun. ' +
        Math.round(u) +
        ' adım geride kasketli bir adam duruyor; yakası kalkık, elleri ceplerinde. Gözleri seninle karşılaşınca bir dükkânın camına dönüyor, camdaki bir şeye bakıyormuş gibi yapıyor. Sabahtan beri o adımları duyuyorsun.',
      yeniDeliller: yeni ? ['takipci'] : [],
      uyari: true,
    });
  }
}

// Ekran ve dünya için takipçinin kişi gibi görünüşü (ayak sesi için). Fark edilmemişse anılmaz.
export function takipciKisi(d) {
  const t = d.takip;
  if (!t || !takipAktif(d) || t.x == null || t.durum === 'kacti' || t.durum === 'bekliyor' || t.belirdi === false) return null;
  return {
    id: 'takipci',
    ad: 'Kasketli adam',
    mekan: 'dis',
    x: t.x,
    y: t.y,
    yuruyor: t.yuruyor,
    eylem: t.durum === 'kaciyor' ? 'koşarak uzaklaşıyor' : 'bir vitrine bakıyormuş gibi yapıyor',
    soz: null,
    gizli: !t.fark,
  };
}

// --- Geçitteki buluşma ---
export const BULUSMA = { x: 48, y: 25 };
const BULUSMA_BAS = 19 * 60 + 4;
const BULUSMA_ARA = 3; // oyun dakikası; her satır bu aralıkla söylenir
const DUYMA = 7;
const UZAK_DUYMA = 15;
const FARK_YAKIN = 3;
const KILIT_SATIRLAR = [2, 3, 4];

export function dinleSatirlari(d) {
  const fark = d.takip && d.takip.fark;
  return [
    'Halim\'in boğuk sesi: Bütün gün peşindeydin. Nereye gitti?',
    fark
      ? 'Kasketli adam: Beni fark etti, komiserim. Döndü, baktı. Kaçtım ama yüzümü gördü.'
      : 'Kasketli adam: Kayıkhaneye, hana, büroya. ' + (bayrak(d, 'cemilTanisti') ? 'Bir de Gureba\'dan gelen o doktorla uzun uzun konuştu.' : 'Hiçbir şeyden haberi yok.'),
    'Halim: Delorme memnun değil. Kâğıt hâlâ ortada. Ben ona ateşçiyi kimsesiz diye gömdürdüm dedim; yetmez dedi.',
    'Kasketli adam: Cumartesi gecesi Pera\'da, on yedide toplanıyorlarmış. O güne kadar bu iş temizlensin istiyor.',
    'Halim: Temizlenecek. Bu gece. Kayıkhane eski, ziftli; bir kibrit yeter. İhtiyar içindeyse, kaderi.',
    'Kasketli adam: Tenekeleri batı duvarının dibine bıraktım. Gece yarısından sonra Topal gelip tutuşturacak.',
  ];
}

function bulusmaVar(d) {
  return d.gorev === 2 && !bayrak(d, 'g2Bitti') && ilkGun(d) && !bayrak(d, 'bulusmaBozuldu');
}

// Buluşma süresince her adım: satırlar sırayla, yakında ve görünmeden dinleyen duyar
function bulusmaIlerle(d, hiz, olaylar) {
  if (!bulusmaVar(d)) return;
  const gd = gunDakika(d);
  if (gd < 18 * 60 + 55 || gd >= 19 * 60 + 35) return;
  if (!d.dinle) d.dinle = { sira: 0, duyulan: [], uzak: 0 };
  const dn = d.dinle;
  const u = d.mekan === 'dis' ? uzaklik(d.oyuncu, BULUSMA) : 99;
  const satirlar = dinleSatirlari(d);

  // Görülme: çok yakın ya da hızlı hareket
  if (gd >= 18 * 60 + 58 && (u < FARK_YAKIN || (u < DUYMA && hiz > 0.4))) {
    d.bayrak.bulusmaBozuldu = true;
    d.bayrak.halimGordu2 = true;
    const yeni = delilEkle(d, 'halim_bulusma');
    olaylar.push({
      tur: 'anlatim',
      metin:
        'Fısıltı kesiliyor. Kim var orada, diye Halim\'in sesi. Bir kibrit çakılıyor, sonra bir fener. Kasketli adam kuzeye, geçidin öbür ağzına koşuyor; Halim söverek ardından gidiyor. Yüzünü gördü mü, bilmiyorsun. Komiser Halim\'in sesiydi; bundan eminsin.',
      yeniDeliller: yeni ? ['halim_bulusma'] : [],
      uyari: true,
    });
    return;
  }

  while (dn.sira < satirlar.length && gd >= BULUSMA_BAS + dn.sira * BULUSMA_ARA) {
    const k = dn.sira;
    dn.sira += 1;
    if (u <= DUYMA) {
      dn.duyulan.push(k);
      const yeni = [];
      if (delilEkle(d, 'halim_bulusma')) yeni.push('halim_bulusma');
      if (k === 2) d.bayrak.delormeAdi = true;
      olaylar.push({ tur: 'anlatim', metin: satirlar[k], yeniDeliller: yeni, dinle: true });
    } else if (u <= UZAK_DUYMA && dn.uzak < 2) {
      dn.uzak += 1;
      olaylar.push({ tur: 'anlatim', metin: 'Karanlık geçitten fısıltılar geliyor; iki erkek sesi. Kelimeleri seçemiyorsun. Daha yakına gitmelisin, ama ağır ağır.' });
    }
  }
  if (dn.sira >= satirlar.length && !dn.bitti) {
    dn.bitti = true;
    if (KILIT_SATIRLAR.every((k) => dn.duyulan.includes(k)) && delilEkle(d, 'kulak_misafiri')) {
      olaylar.push({
        tur: 'anlatim',
        metin: 'Ayak sesleri iki yana dağılıyor. Duvara yapışık kalıyorsun; kalbin kulaklarında. Bu gece kayıkhaneyi yakacaklar.',
        yeniDeliller: ['kulak_misafiri'],
        uyari: true,
      });
    } else if (dn.duyulan.length) {
      olaylar.push({ tur: 'anlatim', metin: 'Ayak sesleri iki yana dağılıyor. Duyduğun parçalar kafanda dönüyor, ama hepsini birleştiremiyorsun.' });
    }
  }
}

// dunya.js her adımda çağırır. sessiz: bekleme sırasında (ipucu ve fark edilme yok)
export function gorev2Ilerle(d, hiz, dt, olaylar, sessiz = false) {
  if (d.gorev !== 2) return;
  takipIlerle(d, hiz, dt, olaylar, sessiz);
  bulusmaIlerle(d, sessiz ? 0 : hiz, olaylar);
}

// Kişi listesi düzeltmeleri: bozulan buluşma, yanan kayıkhane
export function kisiDuzelt(d, k) {
  if (d.gorev === 2 && (k.id === 'halim' || k.id === 'kasketli') && bayrak(d, 'bulusmaBozuldu') && ilkGun(d)) {
    const gd = gunDakika(d);
    if (gd >= 18 * 60 + 30 && gd < 19 * 60 + 35) return null;
  }
  if (k.id === 'suleyman' && bayrak(d, 'suleymanHanda') && d.gun > d.gorevGun) {
    return {
      ...k,
      mekan: 'han',
      x: 33,
      y: 24,
      yuruyor: false,
      eylem: bayrak(d, 'suleymanYarali') ? 'sargılı kollarıyla sedirde oturuyor' : 'pencereden kayıkhanenin yerine bakıyor',
      soz: null,
    };
  }
  return k;
}

// --- Görevin başlangıcı ---
export function gorev2Baslat(d) {
  const gd = gunDakika(d);
  if (gd >= 7 * 60) d.gun += 1;
  d.gorev = 2;
  d.gorevGun = d.gun;
  d.bayrak.g2Gun = d.gun;
  d.dakika = 7 * 60 + 25;
  d.gece = false;
  d.sonSaat = 7;
  d.sonVapur = d.dakika;
  d.mekan = 'han';
  d.oyuncu = { x: 37, y: 19, yon: Math.PI };
  d.yakin = {};
  d.oto = null;
  d.suphe = 0;
  d.takip = takipBaslat();
  d.dinle = null;
  delilEkle(d, 'lavanta_not');
}

function gorev2Bitir(d) {
  d.bayrak.g2Bitti = true;
  d.gun = d.gorevGun + 1;
  d.dakika = 8 * 60;
  d.gece = false;
  d.sonSaat = 8;
  d.sonVapur = d.dakika;
  d.mekan = 'han';
  d.oyuncu = { x: 37, y: 19, yon: Math.PI };
  d.yakin = {};
  d.oto = null;
}

// --- Pano ---
export function g2Tamam(d) {
  return Object.keys(G2_CIKARIMLAR)
    .filter((k) => G2_CIKARIMLAR[k].gerekli)
    .every((k) => d.teoriler.some((t) => t.dogru && t.cikarim === k));
}
const cikarimVar = (d, id) => d.teoriler.some((t) => t.dogru && t.cikarim === id);

function harca(d, kurus) {
  if (d.para < kurus) return false;
  d.para -= kurus;
  return true;
}

// --- Konuşmalar (yalnızca ikinci görevde; uygun(d) değilse birinci görevin konuşması sürer) ---
export const G2_KONUSMALAR = {
  suleyman: {
    uygun: () => true,
    giris: (d) => {
      if (bayrak(d, 'g2Bitti')) return 'bitti';
      if (g2Tamam(d)) return 'karar';
      return 'gun';
    },
    dugumler: {
      gun: {
        metin: (d) => {
          if (!bayrak(d, 's2Selam')) {
            d.bayrak.s2Selam = true;
            return 'Süleyman\'ın gözleri kan çanağı. Sabri\'yi şafakta gömmüşler, diyor; taşsız, duasız. Halim imam bile çağırtmamış. Sonra sesini alçaltıyor: Gureba\'dan bir doktor haber yolladı. Halim\'in kaza kâğıdını imzalamamış. Saat onda buraya gelecekmiş. Adı Cemil. Dinle onu, evlat.';
          }
          return 'Süleyman elindeki zifti bırakıyor. Ne var ne yok, evlat?';
        },
        secenekler: [
          {
            etiket: 'Bugün bir tuhaflık gördün mü kaptan?',
            yap: (d) => {
              const gd = gunDakika(d);
              if (delilVar(d, 'takipci')) return 'Gördüm ya. O kasketli herif. Sen de gördün işte; yüzünden belli.';
              if (gd >= 17 * 60) {
                delilEkle(d, 'takipci');
                return 'Süleyman başını kaldırıp sana bakıyor. Sen görmedin mi? Kasketli bir herif bütün gün senin gittiğin yere gitti. Ben iki kez gördüm; bir kez büronun önünde, bir kez de hanın kapısında. Sen durdun, o durdu. Sen yürüdün, o yürüdü.';
              }
              return 'Henüz bir şey görmedim, diyor. Ama gözüm üstünde. Sen de kulağını aç; bu sabah rıhtım bir tuhaf.';
            },
            sonra: 'gun',
          },
          {
            etiket: 'Komiser Halim akşamları nereye gider?',
            yap: (d) => {
              d.bayrak.gecitBiliniyor = true;
              return 'Akşam devriyesinden önce hanın arkasındaki karanlık geçide sapar, diyor Süleyman. Hep saparmış. Kiminle konuştuğunu kimse bilmez; ben de bilmek istemem. Geçidin ağzı rıhtım caddesine bakar, hanın doğusunda.';
            },
            sonra: 'gun',
          },
          {
            etiket: 'Kemal\'i anlat bana kaptan. Nasıl bir çocuktu?',
            kosul: (d) => !bayrak(d, 'kemalSoz'),
            sonra: 'kemal',
          },
          {
            etiket: 'Bu gece kayıkhanede kalma kaptan.',
            kosul: (d) => delilVar(d, 'lavanta_not') && !bayrak(d, 'uyarildi'),
            yap: (d) => {
              d.bayrak.uyarildi = true;
              return 'Süleyman gülüyor; gülmesinde neşe yok. Kırk yıl denizde fırtınadan kaçmadım evlat, bir kâğıttan mı kaçacağım? Bu kayıkhane babamdan kaldı. Bana kanıt getir, sonra konuşuruz.';
            },
            sonra: 'gun',
          },
          { etiket: 'Sonra konuşuruz.' },
        ],
      },
      kemal: {
        metin: () =>
          'Süleyman pipoyu dişlerinin arasından çıkarıyor. İnatçıydı, diyor. Annesi Nevres adını koydu gemiye; ben değil. Kemal on dört yaşında, beni gemiye almazsan kaçarım dedi, aldım. İlk gece direğe tırmandı, ben bağırdım, o güldü. Son gördüğümde de gülüyordu, evlat. Dalga onu benden alırken gülüyordu. Belki de ben öyle hatırlamak istiyorum.',
        secenekler: [
          {
            etiket: 'Onu bulacağız kaptan. Sabri\'nin işi bitince.',
            yap: (d) => {
              d.bayrak.kemalSoz = 'soz';
              d.suleymanBag = (d.suleymanBag || 0) + 1;
              return 'Süleyman sana uzun uzun bakıyor. Sonra elini omzuna koyuyor; ağır, nasırlı bir el. Sözünü tutan adamı severim, diyor. Tutamayacağın sözü verenden de korkarım. Sen hangisisin, göreceğiz.';
            },
            sonra: 'gun',
          },
          {
            etiket: 'Belki o da seni arıyordur, kaptan. Ya da aramıyordur. İkisi de olur.',
            yap: (d) => {
              d.bayrak.kemalSoz = 'durust';
              return 'Süleyman bir an donup kalıyor. Sonra başını sallıyor. Doğru, diyor. Kimse bana bunu söylemedi. Herkes ya öldü dedi ya bulacağız. Sen ikisini de demedin. Sağ ol.';
            },
            sonra: 'gun',
          },
          {
            etiket: 'Hiçbir şey söyleme. Yanında otur.',
            yap: (d) => {
              d.bayrak.kemalSoz = 'sessiz';
              return 'Bir süre ikiniz de denize bakıyorsunuz. Bir vapur iskeleye yanaşıyor. Süleyman, inenlerin yüzlerine bakıyor. Sen de bakıyorsun.';
            },
            sonra: 'gun',
          },
        ],
      },
      karar: {
        metin: (d) => {
          const yanlis = d.teoriler.filter((t) => !t.dogru);
          const duzelt = yanlis.map((t) => (TUM_YANLISLAR.find((y) => y.ifade === t.ifade) || {}).duzeltme).filter(Boolean);
          d.teoriler = d.teoriler.filter((t) => t.dogru);
          return [
            duzelt.length ? 'Süleyman panona kulak veriyor; bazı bağlarını söküyor: ' + duzelt.join(' ') : '',
            'Süleyman zifti ateşten alıyor. Demek Sabri\'yi o lavantalı it bıçakladı, diyor. Ve şimdi sıra bizde. Akşam olsun; kayıkhanede konuşalım. Doktor da gelsin.',
          ]
            .filter(Boolean)
            .join(' ');
        },
        secenekler: [
          {
            etiket: 'Kayıkhaneye geçelim kaptan.',
            yap: (d) => {
              d.sahne = 'g2_karar_oncesi';
            },
          },
          { etiket: 'Henüz değil. Biraz daha bakayım.' },
        ],
      },
      bitti: {
        metin: (d) =>
          bayrak(d, 'suleymanYarali')
            ? 'Süleyman sargılı ellerini kucağında tutuyor. Pusulayı kurtaramadım, diyor. Kırk yıl yolumu gösterdi; bir gecede kül oldu. Neyse; yolu artık sen göster.'
            : bayrak(d, 'kayikhaneYandi') === 'tam'
              ? 'Süleyman pencereden kayıkhanenin yerine bakıyor. Tahta yanar, evlat, diyor. Adam yanmasın yeter.'
              : 'Süleyman kalafat ziftini karıştırıyor. Cumartesi Pera, diyor. Bir bey gibi giyin; hamal gibi yürürsen kapıdan atarlar.',
        secenekler: [{ etiket: 'Peki kaptan.' }],
      },
    },
  },

  cemil: {
    uygun: () => true,
    giris: (d) => (bayrak(d, 'g2Bitti') ? 'bitti' : bayrak(d, 'cemilTanisti') ? 'sonra' : 'ilk'),
    dugumler: {
      ilk: {
        metin: () =>
          'İnce yüzlü, paltosunun yakası kalkık bir adam; gözlüklerini mendiliyle siliyor. Doktor Cemil, diyor, Gureba Hastanesi. Sabri\'yi Halim\'in adamları gömmeden önce bize getirdiler; kimsesizleri gömmeden önce deftere yazarız. Ben de baktım. Kimse bakmamı istemedi. Sabri\'nin cebinden çıkan tek kâğıtta bir isim vardı: Kayıkçı Süleyman. Sonra size geldim.',
        secenekler: [
          { etiket: 'Ne buldun doktor?', sonra: 'bulgu' },
          {
            etiket: 'Sen kimin adamısın?',
            yap: () => 'Cemil gözlüklerini takıyor. Kimsenin. Bu şehirde bu cümleyi kuranlar ya yalancıdır ya da yakında işsiz kalacaktır. Ben ikincisiyim.',
            sonra: 'ilk',
          },
        ],
      },
      bulgu: {
        metin: (d) => {
          d.bayrak.cemilTanisti = true;
          if (!d.kesif) d.kesif = {};
          d.kesif.kisi_cemil = true;
          return 'Ciğerlerinde su yok, diyor Cemil. Suya ölü atılmış. Sırtında, sol kürek kemiğinin altında ince bir bıçak yarası; kaburgaların arasından, tek seferde. Kasap işi değil, usta işi. Bir de midesinde bunu buldum. Avucunu açıyor: pirinç bir jeton. Bir yüzünde kanatlı bir anahtar. Öbür yüzünde: Mercure, Pera, 17.';
        },
        secenekler: [
          {
            etiket: 'Yutmuş mu?',
            yap: (d) => {
              delilEkle(d, 'jeton');
              delilEkle(d, 'bicak_yarasi');
              return 'Yutmuş. Ölmeden önce, birileri ceplerini ararken. Bir ateşçi, bir jetonu saklamak için yutar mı? Yutar, eğer onu bulmalarından ölmekten daha çok korkuyorsa. Ya da birinin bulmasını istiyorsa. Bir de şu var: ceketinin yakası lavanta kokuyordu. Onu son tutan el kokusunu bırakmış.';
            },
            sonra: 'neden',
          },
        ],
      },
      neden: {
        metin: () => 'Cemil jetonu avucuna bırakıyor. Al. Bende durursa Halim bulur.',
        secenekler: [{ etiket: 'Bunu neden bana anlatıyorsun doktor?', sonra: 'kisisel' }],
      },
      kisisel: {
        metin: () =>
          'Cemil bir süre susuyor. Balkan Harbi\'nde, Selanik\'te, Binbaşı Fikri adında biri bana emir verdi: Kaza yaz. Yazdım. Sekiz ceset, sekiz kaza. Adlarını hâlâ ezbere bilirim; geceleri sayarım. Bu sabah Halim de morgun kapısında aynı şeyi söyledi: Kaza yaz. Bu kez yazmadım. Ellerimin titrediğini görmesin diye ceplerime soktum.',
        secenekler: [
          {
            etiket: 'O emri veren sen değildin doktor.',
            yap: (d) => {
              d.bayrak.cemilFikri = 'teselli';
              d.cemilBag = (d.cemilBag || 0) + 1;
              return 'Cemil\'in dudağı kıpırdıyor. Belki, diyor. Ama kalemi tutan bendim. Yine de sağ ol; bunu ilk söyleyen sensin.';
            },
            sonra: 'sonra',
          },
          {
            etiket: 'Sekiz kişi. Bu sabah sen de yazsaydın Sabri dokuzuncu olacaktı.',
            yap: (d) => {
              d.bayrak.cemilFikri = 'sert';
              d.cemilBag = (d.cemilBag || 0) + 1;
              return 'Cemil başını kaldırıp sana uzun uzun bakıyor. Doğru, diyor. Kimse bunu yüzüme söylememişti; herkes geçmiş olsun dedi. İyi ki söyledin. Dokuzuncuyu yazmayacağım.';
            },
            sonra: 'sonra',
          },
          {
            etiket: 'Bir şey söyleme. Başını salla.',
            yap: (d) => {
              d.bayrak.cemilFikri = 'sus';
              return 'Sessizlik Cemil\'e iyi geliyor gibi. Ellerini ceplerinden çıkarıyor. Artık titremiyorlar.';
            },
            sonra: 'sonra',
          },
        ],
      },
      sonra: {
        metin: () => 'Cemil gözlüklerini düzeltiyor. Ne yapacaksın?',
        secenekler: [
          {
            etiket: 'Şu belgeye bak doktor. Fransızcası senin işin.',
            kosul: (d) => delilVar(d, 'belge') && bayrak(d, 'karar1') !== 'ingiliz' && !bayrak(d, 'cemilBelge'),
            yap: (d) => {
              d.bayrak.cemilBelge = true;
              delilEkle(d, 'belge_tarihi');
              return (
                (bayrak(d, 'karar1') === 'polis' ? 'Cebindeki kopyayı açıyorsun. ' : '') +
                'Cemil kâğıdı lambaya tutuyor; dudakları kıpırdıyor. Bunlar isim değil, diyor. Gemi adları ve limanlar: Selanik, Pire, Trieste. Rakamlar sandık sayısı. Şu alt kısım siyakat; onu ben de okuyamam, eski bir maliye kâtibi lazım. Ama en sondaki tarih: 7 Aralık. Bu cumartesi.'
              );
            },
            sonra: 'sonra',
          },
          {
            etiket: 'Belgeyi İngiliz yüzbaşısına verdim.',
            kosul: (d) => bayrak(d, 'karar1') === 'ingiliz' && !bayrak(d, 'cemilIngiliz'),
            yap: (d) => {
              d.bayrak.cemilIngiliz = true;
              return 'Cemil yüzünü buruşturuyor. Kanatlı anahtarı görünce kaşı kalktı diyorsun. Kaşı kalkan adam şaşırmamıştır, evlat; tanımıştır. Şaşıran adam soru sorar. O sordu mu?';
            },
            sonra: 'sonra',
          },
          {
            etiket: 'Lavantalı adamı tanıyor musun?',
            yap: () => 'Pera\'da lavanta süren çok Frenk var, diyor Cemil. Ama bu sabah morgda Halim biriyle Fransızca konuştu, kapının arkasında. Adını söylemedi; yalnız Mösyö dedi. Halim kimseye Mösyö demez.',
            sonra: 'sonra',
          },
          { etiket: 'Sonra konuşuruz doktor.' },
        ],
      },
      bitti: {
        metin: () => 'Cemil çantasını kapatıyor. Cumartesiye kadar Pera\'yı öğren, diyor. Ben Mercure\'ün kapısını bilirim; içini bilmem. Cumartesi akşamı altıda Cihangir\'deki evimde ol.',
        secenekler: [
          {
            etiket: 'Hazırım doktor. Cumartesiye kadar bekleyelim.',
            kosul: (d) => d.gorev === 2,
            yap: (d) => {
              d.sahne = 'g3_cagri';
            },
          },
          { etiket: 'Öğrenirim.' },
        ],
      },
    },
  },

  husnu: {
    uygun: (d) => !bayrak(d, 'husnuKustu') && !bayrak(d, 'g2Bitti'),
    giris: () => 'g2',
    dugumler: {
      g2: {
        metin: (d) => {
          if (bayrak(d, 'husnu2')) return 'Hüsnü küreklerini yağlıyor. Dün söyleyeceğimi söyledim, bugün de söyledim. Daha ne istersin?';
          d.bayrak.husnu2 = true;
          const k = bayrak(d, 'karar1');
          if (k === 'ingiliz') {
            delilEkle(d, 'yuzbasi_motor');
            return 'Hüsnü seni görünce kayığından iniyor; bugün kendisi geliyor yanına. Senin o İngiliz yüzbaşın, diyor fısıltıyla. Dün akşam karanlıkta Ferrante\'nin motoruna bindi. Işıksız motora. Moda\'ya doğru gittiler. Kâğıdını kime verdin sen, Arif?';
          }
          if (k === 'polis') {
            d.bayrak.rizaHaber = true;
            return 'Hüsnü sesini alçaltıyor. Cihangir\'deki yaşlı bey sana haber yolladı; bu sabah kayığıma bindi. Halim\'e dikkat etsin, dedi. Akşamları kiminle buluştuğuna baksın. Bir de: Döverek değil, delille. Ne demekse.';
          }
          d.bayrak.kopekHaber = true;
          return 'Hüsnü sana yaklaşıyor. Gece kayıkhanenin etrafında biri dolandı, diyor. Köpekler havladı; ben iskelede uyuyordum. Feneri yoktu. Süleyman\'a söyle, kapısını kilitlesin.';
        },
        secenekler: [
          {
            etiket: 'Kasketli bir adam gördün mü reis?',
            kosul: (d) => delilVar(d, 'takipci') && !delilVar(d, 'halimin_adami'),
            yap: (d) => {
              delilEkle(d, 'halimin_adami');
              return 'Hüsnü tükürüyor. Kasketli Yaşar. Sabahları karakolun arka kapısından çıkar. Halim\'in muhbiri; parasını Halim\'in cebinden alır, Halim de kimin cebinden alıyorsa. Ondan uzak dur.';
            },
            sonra: 'g2',
          },
          { etiket: 'Sağ ol Hüsnü Reis.' },
        ],
      },
    },
  },

  ohannes: {
    uygun: (d) => !bayrak(d, 'g2Bitti'),
    giris: () => 'g2',
    dugumler: {
      g2: {
        metin: (d) =>
          bayrak(d, 'o2Selam')
            ? 'Ohannes bardakları siliyor. Söyle Arif.'
            : ((d.bayrak.o2Selam = true),
              'Ohannes Usta çaydanlığı bırakıp yanına geliyor. Sabri\'yi şafakta gömdüler, diyor. Kimsesizler mezarlığına, Halim\'in adamları kazdı. Ben ve iki hamal gittik; başka kimse yoktu. Mezarında taş yok, Arif. Bir tahta bile dikmediler.'),
        secenekler: [
          {
            etiket: 'Mezarına bir taş diktirelim usta. Parasını ben veririm.',
            kosul: (d) => !bayrak(d, 'sabriTasi'),
            yap: (d) => {
              if (!harca(d, 15)) return 'Cebini yokluyorsun; on beş kuruşun yok. Ohannes elini omzuna koyuyor: Biriktirince söyle. Taş kaçmaz.';
              d.bayrak.sabriTasi = true;
              d.itibar += 1;
              return 'On beş kuruşu tezgâha sayıyorsun. Ohannes parayı alıp bir süre avucunda tutuyor. Mezarcı Hamdi\'ye söylerim, diyor. Üstüne ne yazalım? Kendi kendine cevap veriyor: Ateşçi Sabri, Trabzonlu. Yeter. Hanın kapısında duyan hamallar başlarını sallıyor.';
            },
            sonra: 'g2',
          },
          {
            etiket: 'Sabri\'nin mektubunu Trabzon\'daki kız kardeşine ben yollarım.',
            kosul: (d) => delilVar(d, 'mektup') && !bayrak(d, 'haticeKarar'),
            yap: (d) => {
              d.bayrak.haticeKarar = 'yolla';
              return 'Ohannes çekmeceden bir zarf çıkarıyor. Hatice, diyor; kız kardeşinin adı Hatice. Yarım mektubun arkasına sen de bir satır yazıyorsun: Ağabeyin iyi bir adamdı. Onu kimin öldürdüğünü bulacağım. Arif. Zarfı kapatırken elin duruyor; bu söz artık senin.';
            },
            sonra: 'g2',
          },
          {
            etiket: 'Mektubu şimdilik saklayacağım usta. İçinde tüfekler yazıyor; okuyan da ölür.',
            kosul: (d) => delilVar(d, 'mektup') && !bayrak(d, 'haticeKarar'),
            yap: (d) => {
              d.bayrak.haticeKarar = 'sakla';
              return 'Ohannes başını sallıyor ama gözleri üzgün. Haklısın belki, diyor. Ama bir kız kardeş ağabeyinin son sözünü bekler, Arif. Çok bekletme.';
            },
            sonra: 'g2',
          },
          {
            etiket: 'Dün gece notu kapımın altına kim soktu usta?',
            yap: () => 'Ohannes çay koyuyor. Kimse gelmedi Arif; kapıyı ben kilitledim. Ama gece merdivende bir şey duydum: eldivenli bir el tırabzana dokundu. Basamaklar gıcırdamadı. Hafif biriydi; bu hanı iyi bilen biri.',
            sonra: 'g2',
          },
          { etiket: 'Sağ ol usta.' },
        ],
      },
    },
  },

  gulce: {
    uygun: (d) => !!bayrak(d, 'gulceIzin') && !bayrak(d, 'g2Bitti'),
    giris: () => 'g2',
    dugumler: {
      g2: {
        metin: (d) =>
          bayrak(d, 'gulce2')
            ? 'Gülce defterden başını kaldırıyor. Yine sen. Dikkatli ol; büroda kulak çok.'
            : 'Gülce seni görünce kalemini bırakıyor, kâtiplere bakıp sesini alçaltıyor. Dün akşam Ferrante\'nin adamı yine geldi, diyor. Bu kez yalnız değildi.',
        secenekler: [
          {
            etiket: 'Kiminle geldi?',
            kosul: (d) => !bayrak(d, 'gulce2'),
            yap: (d) => {
              d.bayrak.gulce2 = true;
              delilEkle(d, 'nazim_emri');
              return 'Elinde Maliye\'den bir emirle. Nazım Bey imzalı. Leventis\'in kaydı düzeltilsin: kırk sandık değil, otuz sekiz yazılsın. İki sandık yok olacak, Arif; kâğıtta. Müdür imzaladı. Ben imzalamadım. Gülce\'nin kalemi parmaklarının arasında çatırdıyor. Nazım Bey, diyor bir daha, adı ağzında acı bir şeymiş gibi.';
            },
            sonra: 'g2',
          },
          {
            etiket: 'Nazım Bey\'i tanıyor musun?',
            kosul: (d) => bayrak(d, 'gulce2') && !bayrak(d, 'gulceNazim'),
            yap: (d) => {
              d.bayrak.gulceNazim = true;
              return 'Gülce bir an susuyor. Babam Maliye\'de kâtipti, diyor sonunda. Bir daha sormayın. Sesi sert ama gözleri değil.';
            },
            sonra: 'g2',
          },
          { etiket: 'Sağ ol Gülce Hanım.' },
        ],
      },
    },
  },
};

// --- Sahneler ---
export const G2_SAHNELER = {
  g2_gece: {
    ortam: 'ortam_oda',
    baslik: 'Uykusuz gece',
    paragraflar: (d) =>
      [
        'O gece uyumuyorsun. Tabancanı yastığın altına koyup karanlıkta, kapıya bakarak yatıyorsun. Hanın tahtaları her gıcırdadığında elin tabancaya gidiyor.',
        (d.travma || 0) >= 2
          ? 'Sabaha karşı gözlerin kapanıyor ve kendini yine kumda buluyorsun; bu kez yanında biri var, yüzünü göremediğin biri, lavanta kokan biri. Ter içinde uyanıyorsun.'
          : 'Sabaha karşı bir kez gözlerin kapanıyor. Rüyanda Sabri kömür küreğini bırakıp sana bir şey uzatıyor; avucunu açmadan uyanıyorsun.',
        'Ezan sesiyle birlikte avluya iniyorsun.',
      ].filter(Boolean),
    secenekler: [{ etiket: 'Devam', yap: (d) => gorev2Baslat(d), sonra: 'g2_sabah' }],
  },
  g2_sabah: {
    ortam: 'ortam_han',
    baslik: 'İkinci Adım Sesi',
    paragraflar: (d) => {
      const k = bayrak(d, 'karar1');
      return [
        'Kalafatçı Hanı\'nın avlusu. Ocakta çaydanlık fokurduyor. Ohannes Usta seni görünce başını iki yana sallıyor: Gece notu buldun, biliyorum. Yüzünden belli.',
        'Sabri\'yi şafakta gömmüşler. Kimsesiz diye. Komiser Halim\'in kâğıdında sarhoş, suya düşmüş yazıyormuş.',
        k === 'ingiliz'
          ? 'Belge artık İngilizlerde. Ama kapının altındaki not, doğru kapıyı çalmadığını söylüyordu. Yazanı, yüzbaşıyla konuştuğun saatte nerede olduğunu biliyordu.'
          : k === 'polis'
            ? 'Belgenin aslı Cihangir\'deki yaşlı adamda, kopyası senin cebinde. Not, yaşlı adamları da biliyordu.'
            : 'Belge kayıkhanenin döşemesinde, gevşek tahtanın altında. Not, Süleyman\'ın kayıkhanesini de biliyordu.',
        'Notu cebinden çıkarıp bir daha kokluyorsun. Lavanta. Sabri\'nin odasını arayan, kuzeniyim diyen adamın kokusu.',
        'Bugün dikkatli yürü. Kulaklarını aç. Bu şehirde artık kimse senin yanından boşuna geçmiyor.',
      ];
    },
    secenekler: [{ etiket: 'Avludan çık', sonra: null }],
    bitisSozu:
      'İkinci görev: İkinci Adım Sesi. 5 Aralık sabahı, Kalafatçı Hanı\'nın avlusu. Süleyman Kaptan rıhtımda. Saat onda Gureba\'dan bir doktor gelecek. Menüden Görev\'i her zaman açabilirsin.',
  },
  g2_karar_oncesi: {
    ortam: 'ortam_kayikhane',
    baslik: 'Kayıkhanede, akşam',
    paragraflar: (d) =>
      [
        'Akşam. Kayıkhanenin kapısı sürgülü. Süleyman mangalı yakıyor; Doktor Cemil sobanın başında ellerini ısıtıyor, gözlükleri buğulanmış.',
        'Bildiklerini anlatıyorsun. Sırttaki bıçak yarasını, lavanta kokusunu. Sabri\'nin yuttuğu jetonu: Mercure, Pera, 17.',
        delilVar(d, 'kulak_misafiri')
          ? 'Sonra geçitte duyduklarını. Halim\'in sesini. Bu gece, bir kibrit yeter. İhtiyar içindeyse, kaderi. Süleyman\'ın mangalı karıştıran eli duruyor.'
          : delilVar(d, 'takipci')
            ? 'Sonra bütün gün peşindeki kasketli adamı. Kapının altındaki notu. Süleyman\'ın yanmasın dediği kayıkhanesini.'
            : 'Sonra kapının altındaki notu. Süleyman\'ın yanmasın dediği kayıkhanesini.',
        delilVar(d, 'gaz')
          ? bayrak(d, 'gazAtildi')
            ? 'Batı duvarının dibindeki tenekeleri denize boşalttığını söylüyorsun. Süleyman bir an gözlerini kapatıyor.'
            : 'Batı duvarının dibindeki gaz tenekelerini söylüyorsun. Hâlâ orada duruyorlar.'
          : '',
        'Süleyman uzun süre susuyor. Sonra duvardaki pusulaya bakıyor. Bu kayıkhane babamdan kaldı, diyor. Kemal\'in beşiği şu köşede sallandı. Kırk yıl denizde fırtınadan kaçmadım.',
        'Cemil gözlüklerini siliyor. Kaptan, diyor yumuşak bir sesle, fırtına kimseyi bıçaklamaz.',
        'Belgeyi göğsüne sokuyorsun. Ne olursa olsun, o bu gece yanmayacak. Süleyman sana dönüyor: Sen söyle evlat. Ne yapacağız?',
      ].filter(Boolean),
    secenekler: [{ etiket: 'Devam', sonra: 'g2_karar' }],
  },
  g2_karar: {
    ortam: 'ortam_kayikhane',
    baslik: 'Bu gece',
    paragraflar: ['Mangalın kömürleri çıtırdıyor. Dışarıda deniz kayıkhanenin direklerini yalıyor.'],
    secenekler: [
      {
        etiket: 'Kaptanı ve kayığın kâğıtlarını Ohannes\'in hanına taşıyalım. Kayıkhane boş kalsın.',
        yap: (d) => {
          d.bayrak.karar2 = 'tasi';
          d.bayrak.suleymanHanda = true;
          d.bayrak.kayikhaneYandi = bayrak(d, 'gazAtildi') ? 'kismen' : 'tam';
        },
        sonra: 'g2_son_tasi',
      },
      {
        etiket: 'Kayıkhanede pusu kuralım. Gelen eli yakalayalım.',
        yap: (d) => {
          d.bayrak.karar2 = 'pusu';
          if (bayrak(d, 'karar1') === 'polis') d.bayrak.pusuYardim = 'riza';
          else if (d.itibar >= 1) d.bayrak.pusuYardim = 'hamallar';
          else d.bayrak.pusuYardim = 'yalniz';
          const basarili = bayrak(d, 'pusuYardim') !== 'yalniz' || bayrak(d, 'gazAtildi');
          d.bayrak.pusuSonuc = basarili ? 'yakalandi' : 'kacti';
          if (basarili) d.bayrak.delormeAdi = true;
          else {
            d.bayrak.yaraKol = true;
            d.travma = (d.travma || 0) + 1;
            d.bayrak.kayikhaneYandi = 'kismen';
          }
          if (bayrak(d, 'pusuYardim') === 'riza') d.bayrak.rizaTanisti = true;
        },
        sonra: 'g2_son_pusu',
      },
      {
        etiket: 'İngiliz devriyesine haber verelim; liman onların. Biz kapıyı kilitleyip bekleyelim.',
        yap: (d) => {
          d.bayrak.karar2 = 'haber';
          if (bayrak(d, 'gazAtildi')) d.bayrak.kayikhaneYandi = 'kismen';
          else {
            d.bayrak.kayikhaneYandi = 'tam';
            d.bayrak.suleymanYarali = true;
            d.bayrak.suleymanHanda = true;
            d.travma = (d.travma || 0) + 1;
          }
        },
        sonra: 'g2_son_haber',
      },
    ],
  },
  g2_son_tasi: {
    ortam: 'ortam_han',
    efekt: ['yangin'],
    baslik: 'Hanın penceresinden',
    paragraflar: (d) =>
      [
        'Gece yarısı Süleyman\'ın sandığını, kayık ruhsatını, duvardaki pusulayı Ohannes\'in hanına taşıyorsunuz. Süleyman kayıkhanenin kapısını kilitlerken anahtarı bir süre elinde tutuyor.',
        'Saat üçe doğru hanın üst katındaki pencereden bakıyorsunuz. Rıhtımın batı ucunda bir kibrit çakılıyor.',
        bayrak(d, 'kayikhaneYandi') === 'kismen'
          ? 'Tenekeler yerinde olmadığı için gelen adam ziftle uğraşıyor; alev batı duvarını yalayıp sönüyor. Hamallar kovalarla koşuyor. Kayıkhane ayakta; yalnızca bir duvarı kömür karası.'
          : 'Alev bir anda boy veriyor. Ziftli tahtalar çatırdıyor, çatı bir mum gibi yanıyor. Süleyman pencerenin kenarını öyle sıkıyor ki parmaklarının boğumları bembeyaz.',
        'Kimse yaralanmadı, diyor Cemil. Kimse.',
        bayrak(d, 'kayikhaneYandi') === 'tam' ? 'Süleyman cevap vermiyor. Pusulayı göğsüne bastırmış, yanan kayıkhanesine bakıyor. Kırk yılın tahtası.' : '',
      ].filter(Boolean),
    secenekler: [{ etiket: 'Devam', sonra: 'g2_kapanis' }],
  },
  g2_son_pusu: {
    ortam: 'ortam_kayikhane',
    baslik: 'Pusu',
    paragraflar: (d) => {
      const y = bayrak(d, 'pusuYardim');
      const p = ['Mangalı söndürüp karanlıkta bekliyorsunuz. Saat üçe doğru batı duvarının dibinde bir hışırtı, sonra aksak bir ayak sesi: tak, sürt; tak, sürt.'];
      if (y === 'riza') {
        p.push('Kapının dibinde bir gölge doğruluyor: Cihangir\'deki yaşlı adam. Rıza. Hüsnü\'nün kayığıyla gelmiş. Elinde ne sopa var ne tabanca; yalnızca bir fener.');
        p.push('Adam kibriti çaktığı anda Rıza feneri açıyor. Aksak bacaklı bir hamal, ışıkta donup kalıyor. Topal Hasan, Ferrante\'nin antreposundan.');
        p.push('Sen yakasına yapışmak istiyorsun; Rıza elini kolunun üstüne koyuyor. Döverek değil, diyor. Delille. Sonra Hasan\'a dönüp tek bir soru soruyor, sakin sakin, üç kez. Üçüncüde Hasan ağlamaya başlıyor: Mösyö Delorme. Lavanta kokan bey. Para verdi.');
      } else if (y === 'hamallar') {
        p.push('Karanlıkta birinin nefesi: hamalların reisi, iki adamıyla. Sabah yükü taşıdığın adamlar; Sabri\'nin kardeşleri.');
        p.push('Adam kibriti çaktığı anda üç hamal üstüne çullanıyor. Aksak bacaklı biri: Topal Hasan, Ferrante\'nin antreposundan. Kendi kardeşleri tutunca direnmiyor.');
        p.push('Reis ensesinden tutup mangalın başına oturtuyor. Hasan titreyerek konuşuyor: Mösyö Delorme. Lavanta kokan bey. Para verdi, çocuklarım aç.');
      } else if (bayrak(d, 'gazAtildi')) {
        p.push('Gölge duvarın dibini yokluyor; tenekeleri arıyor, bulamıyor. Küfrediyor. Arkasına dolanıp kolunu kıvırıyorsun. Aksak bacaklı bir hamal: Topal Hasan.');
        p.push('Elinde yalnızca bir kibrit kutusu var. Mösyö Delorme, diyor ağlamaklı. Lavanta kokan bey. Para verdi.');
      } else {
        p.push('Bir kibrit çakılıyor ve ıslak duvar bir anda tutuşuyor. Kapıdan fırlıyorsun. Gölge sana dönüp elindeki feneri savuruyor; cam kolunda patlıyor, gaz koluna sıçrıyor.');
        p.push('Kolunu kuma gömüyorsun. Süleyman ile Cemil kovalarla duvara su taşıyor. Gölge aksayarak karanlığa kaçıyor; tak, sürt, tak, sürt.');
        p.push('Duvar kurtuluyor ama yanık kolunu Cemil sarıyor. Kumun içinde adamın düşürdüğü bir kâğıt: Pera. Cumartesi. Başka bir şey yok.');
      }
      if (bayrak(d, 'pusuSonuc') === 'yakalandi') p.push('Delorme. Lavantalı adamın bir adı var artık.');
      return p;
    },
    secenekler: [{ etiket: 'Devam', sonra: 'g2_kapanis' }],
  },
  g2_son_haber: {
    ortam: 'ortam_rihtim',
    efekt: ['yangin'],
    baslik: 'Kimse gelmedi',
    paragraflar: (d) =>
      [
        'Akşam Galata\'daki askerî polis karakoluna gidiyorsun. Nöbetçi çavuş seni dinliyor, bir kâğıda bir şeyler yazıyor. Bakarız, diyor tercüman.',
        'Gece boyunca kayıkhanede, kapı sürgülü, bekliyorsunuz. Hiçbir devriye geçmiyor.',
        bayrak(d, 'kayikhaneYandi') === 'kismen'
          ? 'Saat üçe doğru batı duvarında bir alev parlıyor ve sönüyor; tenekeler yerinde olmadığı için ateş tutmuyor. Sen kapıya vardığında aksak bir ayak sesi karanlıkta uzaklaşıyor. Kayıkhane ayakta.'
          : 'Saat üçe doğru dumanın kokusuyla uyanıyorsun. Batı duvarı alevler içinde. Kapıyı açıyorsun, Cemil\'i dışarı itiyorsun. Süleyman ise içeri, alevlere doğru koşuyor: pusula, Kemal\'in fotoğrafı.',
        bayrak(d, 'suleymanYarali') ? 'Onu yakasından tutup dışarı sürüklüyorsun. Kolları yanmış, sakalı kavrulmuş; elinde yalnızca Kemal\'in fotoğrafı var. Pusula içeride kaldı. Cemil rıhtımın taşında Süleyman\'ın kollarını sarıyor.' : '',
        bayrak(d, 'karar1') === 'ingiliz' ? 'Sabah karakolun defterinde senin haberinin kaydı bile yok.' : '',
      ].filter(Boolean),
    secenekler: [{ etiket: 'Devam', sonra: 'g2_kapanis' }],
  },
  g2_kapanis: {
    ortam: 'ortam_han',
    baslik: 'Üçüncü kişi',
    paragraflar: (d) =>
      [
        'Şafak. Kalafatçı Hanı\'nın avlusunda Ohannes çay dağıtıyor; kimse içmiyor. Cemil gözlüklerini çıkarıp burnunun kemerini ovuyor.',
        bayrak(d, 'cemilFikri') === 'sert'
          ? 'Dün bana dokuzuncuyu yazmayacağım dedim, diyor. Sözümün arkasında durmak istiyorum. Cumartesi Pera\'ya gideceksin. Ben de geliyorum.'
          : bayrak(d, 'cemilFikri') === 'teselli'
            ? 'Kalemi tutan bendim dedim ya, diyor. Bu kez kalemi doğru yere bastırmak istiyorum. Cumartesi Pera\'ya gideceksin. Ben de geliyorum.'
            : 'Kimseye bir şey anlatmamıştım, diyor. Sana anlattım. Galiba bir sebebi vardı. Cumartesi Pera\'ya gideceksin. Ben de geliyorum.',
        'Mercure Kulübü\'nün kapısını bilirim, diyor. Pera\'da doktorlar her kapıdan girer; hamallar hiçbirinden.',
        bayrak(d, 'delormeAdi') ? 'Delorme, diyorsun. Adı bu.' : 'Lavantalı adamın adını hâlâ bilmiyorsun. Ama kulübün kapısı onu tanıyor olmalı.',
      ].filter(Boolean),
    secenekler: [
      {
        etiket: 'Gel doktor. Yalnız yapamam.',
        yap: (d) => {
          d.bayrak.cemilEkipte = true;
          d.bayrak.cemilKabul = 'gel';
          d.cemilBag = (d.cemilBag || 0) + 1;
        },
        sonra: 'g2_son',
      },
      {
        etiket: 'Bu iş seni öldürebilir doktor.',
        yap: (d) => {
          d.bayrak.cemilEkipte = true;
          d.bayrak.cemilKabul = 'uyar';
        },
        sonra: 'g2_son',
      },
    ],
  },
  g2_son: {
    ortam: 'ortam_han',
    baslik: 'Cumartesi',
    paragraflar: (d) =>
      [
        bayrak(d, 'cemilKabul') === 'uyar'
          ? 'Cemil acı acı gülümsüyor. Beni sekiz ölü çoktan öldürdü, Arif. Dokuzuncusu olmayayım diye geliyorum.'
          : 'Cemil elini uzatıyor. Sıkıyorsun; ince, soğuk, ama titremeyen bir el.',
        bayrak(d, 'suleymanYarali')
          ? 'Süleyman, Ohannes\'in sedirinde, sargılı kollarıyla oturuyor. Gidin, diyor. Benim kayıkhanem yandı; sizinkini yakmasınlar.'
          : bayrak(d, 'kayikhaneYandi') === 'tam'
            ? 'Süleyman pencerenin önünde, pusula avucunda. Gidin, diyor. Tahta yanar. Adam yanmasın.'
            : 'Süleyman kayıkhanesinin is kokan duvarını elleriyle yokluyor. Gidin, diyor. Ben burada, siz orada.',
        'Avucundaki jetonu çeviriyorsun. Kanatlı anahtar. Mercure, Pera, 17. Cumartesi gecesi.',
        'İkinci görevin sonu. Cuma sabahı. Cumartesi akşamına kadar Karaköy\'de dolaşabilirsin; Pera\'ya çağrı vakti gelince gelir.',
      ].filter(Boolean),
    secenekler: [{ etiket: 'Devam', yap: (d) => gorev2Bitir(d), sonra: null }],
    bitisSozu: 'Kalafatçı Hanı\'nın avlusu, sabah sekiz. Menüden Görev\'i ve Yerler\'i her zaman açabilirsin.',
  },
};

// --- Görev satırı ---
export function g2Ipucu(d) {
  if (bayrak(d, 'g2Bitti')) return 'İkinci görev bitti. Cumartesi gecesi Pera\'da, Mercure Kulübü\'nde, on yedi numarada toplanıyorlar. Cemil cumartesi akşamı altıda seni Cihangir\'de bekliyor; vakit gelince çağrı kendiliğinden gelir. Beklemek istemezsen Cemil\'le konuş.';
  const gd = gunDakika(d);
  const p = [];
  if (!bayrak(d, 'cemilTanisti'))
    p.push(
      ilkGun(d) && gd < 10 * 60
        ? 'Saat onda Gureba\'dan bir doktor Süleyman Kaptan\'ın yanına gelecek; rıhtımda, kayıkhanenin önünde.'
        : 'Gureba\'dan gelen Doktor Cemil gündüz rıhtımda, Süleyman Kaptan\'ın kayığının yanında; akşam kayıkhanede. Onu dinle.',
    );
  if (g2Tamam(d)) return 'Panonda üç bağ kurulu. Süleyman Kaptan\'a git; bu gece ne yapacağınıza karar verin.';
  const eksik = [];
  if (!cikarimVar(d, 'toplanti')) eksik.push('Sabri\'nin yuttuğu jetonun ne anlama geldiği');
  if (!cikarimVar(d, 'katil')) eksik.push('Sabri\'yi kimin öldürdüğü');
  if (!cikarimVar(d, 'tehlike')) eksik.push('kapının altındaki notun ne demek olduğu');
  p.push('Panoda kurman gereken bağlar: ' + eksik.join(', ') + '.');
  if (!delilVar(d, 'takipci')) p.push('Bugün sokakta yalnız yürüdüğünü sanma; durunca kulak ver.');
  else if (!delilVar(d, 'halim_bulusma') && ilkGun(d) && gd < 19 * 60 + 30) p.push('Kasketli adam kimin adamı? Akşam yedi sularında kimin yanına gittiğine bak; yaklaşırken ağır yürü.');
  return p.join(' ');
}
