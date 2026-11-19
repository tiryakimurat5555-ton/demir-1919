// Birinci görev: Sudaki Adam (Karaköy dikey dilimi, 2. adım). Saf JavaScript.
// Deliller, incelenen nesneler, konuşmalar, fotoğraf ve karanlık oda, serbest soruşturma panosu,
// para ve itibar. Görevin sonu: Süleyman Kaptan'la belgenin akıbetine karar.
//
// d (dünya durumu) üzerinde şu alanları kullanır:
//   deliller [id], teoriler [{a, b, ifade, dogru, cikarim}], bayrak {}, para (kuruş), itibar,
//   envanter {}, film, negatifler [konu], fotograflar [konu], gorevBitti

export const DELILLER = {
  ip_izi: { ad: 'Bileklerdeki ip izi', tarif: 'Sabri\'nin iki bileğinde de ince, morarmış bir şerit var. Elleri bir süre sıkıca bağlı kalmış.' },
  kopuk_yok: { ad: 'Ağızda köpük yok', tarif: 'Boğulan adamın ağzında ve burnunda köpük olur; Arif bunu Seddülbahir kıyısında çok gördü. Sabri\'de yok.' },
  mum: { ad: 'Tırnak altındaki kırmızı mum', tarif: 'Sabri\'nin kömür karası tırnaklarının altında kırmızı, kırılgan kırıntılar: mühür mumu.' },
  motor: { ad: 'Gece yanaşan ışıksız motor', tarif: 'Kayıkçı Hüsnü, gece üç sularında ışıksız bir motorun Leventis\'in kıçına yanaştığını, iki adamın ağır bir çuvalı taşıdığını gördü.' },
  fransiz_aksan: { ad: 'Frenk ağızlı adam', tarif: 'Motordaki adamlardan biri Türkçe konuşuyordu, ama Hüsnü\'ye göre Frenk ağzıyla.' },
  belge: { ad: 'Şifreli belge', tarif: 'Yağlı beze sarılı kalın kâğıt: harf ve rakamlardan isimler, Fransızca şehir adları, tarihler ve okuyamadığın siyakat yazısıyla bir bölüm.' },
  kanatli_anahtar: { ad: 'Kanatlı anahtar işareti', tarif: 'Belgenin altına mürekkeple basılmış bir işaret: iki yanından kanat açmış bir anahtar.' },
  manifest: { ad: 'Leventis\'in yük kaydı', tarif: 'Büronun defterine göre Leventis, Ferrante ve Ortakları adına kırk sandık makine yedek parçası indirecek. Geminin sahibi Pendle Shipping, Pire.' },
  agirlik: { ad: 'Fazla ağır sandıklar', tarif: 'Vinç defterine göre her sandık iki adam ağırlığında. O boyda yedek parça bu kadar çekmez.' },
  ferrante_damga: { ad: 'Ferrante\'nin kâğıdındaki işaret', tarif: 'Ferrante ve Ortakları\'nın antetli kâğıdının köşesinde, neredeyse görünmeyecek kadar küçük: kanatlı bir anahtar.' },
  paltolu: { ad: 'Odayı arayan paltolu adam', tarif: 'Ohannes Usta\'ya göre dün akşam Sabri\'nin kuzeniyim diyen, temiz paltolu, lavanta kokulu bir adam odaya girdi. Türkçeyi yabancı gibi, ama düzgün konuşuyordu.' },
  mektup: { ad: 'Sabri\'nin yarım mektubu', tarif: 'Trabzon\'daki kız kardeşine yazılmış, bitirilmemiş mektup: kırılan bir sandık, içinde tüfekler, deri bir çanta ve korku.' },
  fotograf: { ad: 'Manastır\'da çekilmiş fotoğraf', tarif: 'Bir genç kadının fotoğrafı. Arkasındaki damga: Manastır, Fotoğrafhane-i Hilal. İçinde bir şey kıpırdıyor.' },
  tufek: { ad: 'Sandıktaki tüfekler', tarif: 'Antrepoda, yedek parça yazan bir sandığın samanının altında yağlı kâğıda sarılı tüfekler. Mauser; yeni.' },
  mum_izi: { ad: 'Mum kırıntısındaki mühür izi', tarif: 'Banyo edilen fotoğrafta, Sabri\'nin tırnağındaki mum kırıntısında yarım bir mühür izi: bir kanadın ucu ve bir anahtar dişi.' },
};

// Panoda kurulabilen doğru bağlar. Her çıkarım için iki küme: birinden bir delil, ötekinden bir delil.
// (iki küme aynıysa o kümeden iki farklı delil)
export const CIKARIMLAR = {
  olduruldu: {
    ifade: 'Sabri boğulmadı; öldürüldü.',
    kume: [['ip_izi', 'kopuk_yok', 'mum', 'motor'], ['ip_izi', 'kopuk_yok', 'mum', 'motor']],
    gerekli: true,
  },
  silah: {
    ifade: 'Ferrante\'nin "yedek parça" sandıklarında silah var.',
    kume: [['mektup', 'tufek'], ['manifest', 'agirlik']],
    gerekli: true,
  },
  orgut: {
    ifade: 'Belgenin sahipleri Ferrante\'nin arkasındaki kanatlı anahtar örgütü.',
    kume: [['kanatli_anahtar', 'belge'], ['ferrante_damga', 'mum_izi']],
    gerekli: true,
  },
  odayi_arayan: {
    ifade: 'Motordaki Frenk ağızlı adam, Sabri\'nin odasını da aradı.',
    kume: [['paltolu'], ['fransiz_aksan']],
  },
  sandigi_acti: {
    ifade: 'Sabri sandığı açtı; tırnağındaki mum sandığın mührü.',
    kume: [['mum', 'mum_izi'], ['mektup', 'tufek']],
  },
};

// Yanlış ama akla yatkın teoriler; oyuncu bunları da kurabilir (Süleyman sonra düzeltir)
export const YANLISLAR = [
  { ifade: 'Sabri sarhoştu; gece düşüp boğuldu.', duzeltme: 'Sabri ağzına içki koymazdı, evlat. Hem bilekleri bağlı adam düşmez; atılır.' },
  { ifade: 'Sabri kaçakçıydı; kendi işinin kurbanı oldu.', duzeltme: 'Sabri kömür fişinden başka kâğıt taşımazdı. Bulduğu şey yüzünden öldü, yaptığı şey yüzünden değil.' },
  { ifade: 'Sandıklarda gerçekten makine parçası var.', duzeltme: 'Makine parçası mum mühürle kapanmaz, iki adam da çekmez. Kendini kandırma.' },
  { ifade: 'Bu işin arkasında hamallar var.', duzeltme: 'Hamallar Sabri\'yi severdi. Onlar o motoru süremez, Frenk ağzıyla da konuşmaz.' },
];

// İkinci görevin tanımları bu tablolara katılır
import { G2_CIKARIMLAR, G2_DELILLER, G2_KONUSMALAR, G2_NESNELER, G2_YANLISLAR, TUM_YANLISLAR, g2Ipucu } from './gorev2';
import { G3_CIKARIMLAR, G3_DELILLER, G3_KONUSMALAR, G3_NESNELER, G3_YANLISLAR, g3Ipucu } from './gorev3';
import { G4_CIKARIMLAR, G4_DELILLER, G4_KONUSMALAR, G4_NESNELER, G4_YANLISLAR, g4Ipucu } from './gorev4';
Object.assign(DELILLER, G2_DELILLER, G3_DELILLER, G4_DELILLER);
Object.assign(CIKARIMLAR, G2_CIKARIMLAR, G3_CIKARIMLAR, G4_CIKARIMLAR);
TUM_YANLISLAR.push(...YANLISLAR, ...G3_YANLISLAR, ...G4_YANLISLAR);
YANLISLAR.push(...G2_YANLISLAR, ...G3_YANLISLAR, ...G4_YANLISLAR);

export const BASLANGIC_PARA = 35;
export const FILM = 6;

function bayrak(d, k) {
  return d.bayrak[k];
}

export function delilVar(d, id) {
  return d.deliller.includes(id);
}

// Yeni delil eklenirse true
export function delilEkle(d, id) {
  if (delilVar(d, id)) return false;
  d.deliller.push(id);
  return true;
}

function deliller(d, ...idler) {
  const yeni = idler.filter((id) => delilEkle(d, id));
  return yeni;
}

export function cikarimVar(d, id) {
  return d.teoriler.some((t) => t.dogru && t.cikarim === id);
}

export function gerekliCikarimlarTamam(d, gorev = d.gorev || 1) {
  return Object.keys(CIKARIMLAR)
    .filter((k) => CIKARIMLAR[k].gerekli && (CIKARIMLAR[k].gorev || 1) === gorev)
    .every((k) => cikarimVar(d, k));
}

// --- Nesneler ---
// mevcut(d): görünür mü; eylemler: [{ id, etiket, kosul?(d), yap(d, ctx) → { metin, deliller?, sure?, ses? } }]
// ctx: { gece, kisiYakin(id, metre) }
export const NESNELER = [
  {
    id: 'ceset',
    ad: 'Sabri\'nin cesedi',
    mekan: 'dis',
    x: 29,
    y: 2,
    mevcut: (d) => !bayrak(d, 'cesetGitti'),
    giris: 'Sabri\'yi sudan çıkarıp rıhtımın taşına yatırmışlar. Üstüne bir çuval örtmüşler. Ateşçinin kömür karası elleri çuvalın altından taşıyor.',
    eylemler: [
      {
        id: 'bilek',
        etiket: 'Bileklerine bak',
        yap: () => ({ metin: 'Çuvalı biraz kaldırıyorsun. İki bileğinde de ince, morarmış bir şerit. Elleri bağlıymış.', delil: ['ip_izi'] }),
      },
      {
        id: 'yuz',
        etiket: 'Yüzüne bak',
        yap: () => ({ metin: 'Yüzü sakin, gözleri yarı açık. Ağzında, burnunda köpük yok. Seddülbahir\'de boğulanların hepsinde vardı.', delil: ['kopuk_yok'] }),
      },
      {
        id: 'el',
        etiket: 'Ellerine bak',
        yap: () => ({ metin: 'Tırnaklarının altında kömürden başka bir şey var: kırmızı, kırılgan kırıntılar. Mühür mumu.', delil: ['mum'] }),
      },
      { id: 'foto', etiket: 'Ellerinin fotoğrafını çek', foto: 'ceset_el' },
    ],
  },
  {
    id: 'denk',
    ad: 'Sabri\'nin denki',
    mekan: 'kayikhane',
    x: -48,
    y: 8,
    mevcut: (d) => bayrak(d, 'denkAcik') && bayrak(d, 'kayikhaneYandi') !== 'tam',
    giris: 'Duvarın dibinde, yağlı bir branda altında Sabri\'nin denki. Süleyman sakla dediği için burada.',
    eylemler: [
      {
        id: 'ac',
        etiket: 'Denki aç',
        yap: (d) => {
          d.sahne = 'belge';
          return { metin: '', delil: ['belge', 'kanatli_anahtar'] };
        },
      },
    ],
  },
  {
    id: 'karanlik_oda',
    ad: 'Kayıkhanenin karanlık odası',
    mekan: 'kayikhane',
    x: -50.5,
    y: 2.5,
    mevcut: (d) => !!d.envanter.kamera && bayrak(d, 'kayikhaneYandi') !== 'tam',
    giris: 'Süleyman\'ın gençliğinde fotoğrafçılık hevesinden kalma, perdeyle ayrılmış küçük bir köşe: leğenler, şişeler, kırmızı camlı bir fener.',
    eylemler: [
      {
        id: 'banyo',
        etiket: 'Filmi banyo et',
        kosul: (d) => d.negatifler.length > 0,
        yap: (d) => {
          const konular = d.negatifler.splice(0);
          d.fotograflar.push(...konular);
          const parca = ['Kırmızı fenerin ışığında yarım saat. Kâğıtlar leğende yavaşça kararıyor.'];
          const delil = [];
          if (konular.includes('ceset_el')) {
            parca.push('Sabri\'nin ellerinin fotoğrafını büyütecin altına alıyorsun. Tırnaktaki mum kırıntısında gözle görülmeyen bir şey var: yarım bir mühür izi. Bir kanadın ucu, bir anahtar dişi.');
            delil.push('mum_izi');
          }
          if (konular.includes('sandik')) parca.push('Sandığın fotoğrafında kapağın iç yüzündeki boya yazısı okunuyor: Liège. Fabrika damgası kazınmış.');
          if (!delil.length && !konular.includes('sandik')) parca.push('Fotoğraflar çıktı ama yeni bir şey göstermiyor.');
          return { metin: parca.join(' '), delil, sure: 30 };
        },
      },
    ],
  },
  {
    id: 'yuk_defteri',
    ad: 'Yük defteri',
    mekan: 'buro',
    x: 4,
    y: 24,
    mevcut: () => true,
    giris: 'Gülce\'nin masasının yanında, deri kaplı kalın bir yük defteri.',
    eylemler: [
      {
        id: 'oku',
        etiket: 'Leventis\'in sayfasını oku',
        kosul: (d) => bayrak(d, 'gulceIzin'),
        yap: () => ({ metin: 'Leventis. Ferrante ve Ortakları adına kırk sandık makine yedek parçası. Gemi sahibi Pendle Shipping, Pire.', delil: ['manifest'] }),
      },
    ],
    kilitli: 'Kâtiplerden biri öksürüyor. Gülce\'nin izni olmadan deftere dokunamazsın.',
  },
  {
    id: 'vinc_defteri',
    ad: 'Vinç defteri',
    mekan: 'buro',
    x: -7,
    y: 24,
    mevcut: () => true,
    giris: 'Duvardaki rafta vinççinin tuttuğu ağırlık defteri.',
    eylemler: [
      {
        id: 'oku',
        etiket: 'Dünkü kayıtları oku',
        kosul: (d) => bayrak(d, 'gulceIzin'),
        yap: () => ({ metin: 'Leventis, Ferrante sandıkları: her biri iki adam ağırlığında. Vinççi kenara bir soru işareti koymuş.', delil: ['agirlik'] }),
      },
    ],
    kilitli: 'Rafa uzandığında kâtip başını kaldırıyor. Gülce\'nin izni olmadan olmaz.',
  },
  {
    id: 'doseme',
    ad: 'Yarılmış döşek',
    mekan: 'oda',
    x: 41,
    y: 28,
    mevcut: () => true,
    giris: 'Döşek bıçakla yarılmış, yünü yere saçılmış. Biri bir şey aramış.',
    eylemler: [
      {
        id: 'ara',
        etiket: 'Yünün içini yokla',
        yap: () => ({
          metin: 'Arayan acele etmiş. Yünün en dibinde katlanmış bir kâğıt: Trabzon\'daki kız kardeşine yarım kalmış bir mektup. Bir sandık kırılmış, içinden tüfekler çıkmış; deri bir çanta varmış. Korkuyorum, diye bitiyor.',
          delil: ['mektup'],
        }),
      },
    ],
  },
  {
    id: 'pervaz',
    ad: 'Pencere pervazı',
    mekan: 'oda',
    x: 45.4,
    y: 25,
    mevcut: () => true,
    giris: 'Pencerenin pervazı biraz kalkık.',
    eylemler: [
      {
        id: 'kaldir',
        etiket: 'Pervazı kaldır',
        yap: (d) => {
          d.sahne = 'fotograf';
          return { metin: '', delil: ['fotograf'] };
        },
      },
    ],
  },
  {
    id: 'sandiklar',
    ad: 'Ferrante\'nin sandıkları',
    mekan: 'antrepo',
    x: 18,
    y: 21,
    mevcut: () => true,
    giris: 'Üst üste yığılmış sandıklar. Kapaklarında kırmızı mum mühürler, yanlarında boyayla: makine yedek parçası.',
    eylemler: [
      {
        id: 'ac',
        etiket: 'Bir sandığın kapağını kaldır',
        gurultu: 40,
        yap: () => ({
          metin: 'Bıçağının ucuyla mumu kırıp kapağı kaldırıyorsun. Çivi gıcırdıyor. Samanın altında yağlı kâğıda sarılı tüfekler. Mauser; yepyeni.',
          delil: ['tufek'],
        }),
      },
      { id: 'foto', etiket: 'Sandığın fotoğrafını çek', foto: 'sandik', kosul: (d) => delilVar(d, 'tufek') },
    ],
  },
];

NESNELER.push(...G2_NESNELER, ...G3_NESNELER, ...G4_NESNELER);

export function mevcutNesneler(d) {
  return NESNELER.filter((n) => n.mekan === d.mekan && n.mevcut(d));
}

export function nesneBul(id) {
  return NESNELER.find((n) => n.id === id);
}

// Bir nesnenin o anki eylem listesi (kilitli olanlar da etiketle gelir)
export function nesneEylemleri(d, id) {
  const n = nesneBul(id);
  return n.eylemler
    .filter((e) => !e.foto || d.envanter.kamera)
    .filter((e) => !(e.foto && e.kosul && !e.kosul(d)))
    .map((e) => ({ id: e.id, etiket: e.etiket + (e.foto ? ' (' + d.film + ' poz kaldı)' : '') }));
}

// Eylemi uygular. ctx: { gece, kisiYakin(id, metre) }
// Döner: { metin, yeniDeliller, sure, gurultu, travma }
export function nesneEylem(d, id, eylemId, ctx = {}) {
  const n = nesneBul(id);
  const e = n.eylemler.find((x) => x.id === eylemId);
  if (!e) return { metin: '' };
  if (id === 'ceset' && ctx.kisiYakin && ctx.kisiYakin('halim', 7)) {
    d.bayrak.halimGordu = true;
    return { metin: 'Komiser Halim bağırıyor: Çekil oradan! Ölüye dokunan benimle uğraşır. Geri çekiliyorsun.' };
  }
  if (e.foto) {
    if (!d.envanter.kamera) return { metin: 'Fotoğraf makinen yok.' };
    if (d.film <= 0) return { metin: 'Film bitti.' };
    if (ctx.gece && d.mekan === 'dis') return { metin: 'Bu karanlıkta çekilen kare boş çıkar. Gün ağarmasını bekle.' };
    d.film -= 1;
    d.negatifler.push(e.foto);
    return { metin: 'Deklanşörün tıkırtısı. Bir poz. Film karanlık odada banyo edilmeli.', ses: 'deklansor' };
  }
  if (e.engel) {
    const engelMetni = e.engel(d, ctx);
    if (engelMetni) return { metin: engelMetni };
  }
  if (e.kosul && !e.kosul(d)) return { metin: n.kilitli || 'Şimdi olmaz.' };
  const s = e.yap(d) || {};
  const yeni = deliller(d, ...(s.delil || []));
  if (s.travma) {
    d.travma = (d.travma || 0) + s.travma;
    d.bayrak.fotoTravma = true;
  }
  return { metin: s.metin, yeniDeliller: yeni, sure: s.sure || 0, gurultu: e.gurultu || 0 };
}

// --- Konuşmalar ---
// Her kişi için giris(d) düğümü seçer. Düğüm: { metin(d), secenekler: [{ etiket, kosul?(d), yap?(d) → metin|undefined, sonra? }] }
// sonra yoksa konuşma biter.

function harca(d, kurus) {
  if (d.para < kurus) return false;
  d.para -= kurus;
  return true;
}

export const KONUSMALAR = {
  suleyman: {
    giris: (d) => {
      if (d.gorevBitti) return 'bitti';
      if (gerekliCikarimlarTamam(d)) return 'karar';
      if (bayrak(d, 'denkAcik')) return 'sonra';
      if (['ip_izi', 'kopuk_yok', 'mum'].some((x) => delilVar(d, x)) || bayrak(d, 'cesetGitti')) return 'rapor';
      return 'ilk';
    },
    dugumler: {
      ilk: {
        metin: () =>
          'Süleyman Kaptan\'ın sesi hiç bu kadar yorgun gelmemişti. Sabri, diyor. Bizim Sabri. Suda bulmuşlar, Leventis\'in yanında. Boğulmuş diyorlar. Git bir bak, evlat. Sen ölü görmüş adamsın. Halim gelmeden bak.',
        secenekler: [{ etiket: 'Gidiyorum, kaptan.' }],
      },
      rapor: {
        metin: (d) =>
          bayrak(d, 'cesetGitti') && !['ip_izi', 'kopuk_yok', 'mum'].some((x) => delilVar(d, x))
            ? 'Halim\'in adamları götürdü onu, diyor Süleyman. Ben gördüm ama: bilekleri morarmıştı. Bağlamışlar evlat. Ne gördün sen?'
            : 'Ne gördün?',
        secenekler: [
          {
            etiket: 'Sabri boğulmadı kaptan. Öldürüldü.',
            yap: (d) => {
              d.bayrak.denkAcik = true;
              d.bayrak.gulceOnerildi = true;
              d.envanter.kamera = true;
              d.film = FILM;
              d.suleymanBag = (d.suleymanBag || 0) + 1;
              const ek = bayrak(d, 'cesetGitti') ? deliller(d, 'ip_izi') : [];
              return (
                'Süleyman uzun süre susuyor. Sonra kalkıp kayıkhanenin anahtarını uzatıyor. Sabri dün gece bana bir denk bıraktı, diyor. Bir şey olursa sakla, dedi. Denk kayıkhanede, duvarın dibinde. Bir de şu eski Kodak\'ı al; gençliğimin hevesi. Altı pozluk film var; karanlık oda da kayıkhanede. Yük kayıtları için büroda Gülce\'ye git, benim adımı ver.' +
                (ek.length ? ' Bileklerini ben gördüm, aklında olsun.' : '')
              );
            },
          },
          { etiket: 'Henüz bir şey diyemem.', yap: () => 'Süleyman başını sallıyor. Acele et o zaman. Ölüler beklemez, onları gömenler hiç beklemez.' },
        ],
      },
      sonra: {
        metin: (d) =>
          'Süleyman zifti karıştırıyor ya da sobayı kurcalıyor; seni görünce bırakıyor. Ne buldun evlat? ' +
          (d.deliller.length >= 6 ? 'Çok şey biriktirmişsin. Panona bak; bir araya getir, sonra gel.' : 'Ben burada, sen bul.'),
        secenekler: [
          { etiket: 'Kanatlı anahtar sana bir şey söylüyor mu?', kosul: (d) => delilVar(d, 'kanatli_anahtar'), yap: () => 'Selanik\'te, eski zamanda bir gemi acentesinin kapısında görmüştüm, diyor. Kapı hep kapalıydı. Bir de o gemilerin yükleri hiç sayılmazdı.', sonra: 'sonra' },
          { etiket: 'Sonra konuşuruz.' },
        ],
      },
      karar: {
        metin: (d) => {
          const yanlis = d.teoriler.filter((t) => !t.dogru);
          const duzelt = yanlis.map((t) => (YANLISLAR.find((y) => y.ifade === t.ifade) || {}).duzeltme).filter(Boolean);
          d.teoriler = d.teoriler.filter((t) => t.dogru);
          return [
            duzelt.length ? 'Süleyman panona kulak veriyor. Bazı bağlarını söküyor: ' + duzelt.join(' ') : '',
            'Sabri öldürüldü, diyor Süleyman. Ferrante\'nin sandıklarında silah var. Ve bu belge, o işaretin sahiplerinin. Gel, kayıkhaneye geçelim; burada konuşulmaz.',
          ]
            .filter(Boolean)
            .join(' ');
        },
        secenekler: [
          {
            etiket: 'Bildiklerimi anlatayım kaptan.',
            yap: (d) => {
              d.sahne = 'karar_oncesi';
              if (d.mekan !== 'kayikhane') {
                d.mekan = 'kayikhane';
                d.oyuncu = { x: -43, y: 5, yon: -Math.PI / 2 };
                d.yakin = {};
              }
            },
          },
          { etiket: 'Henüz değil. Biraz daha araştırayım.' },
        ],
      },
      bitti: {
        metin: () => 'Süleyman pipo tütününü bastırıyor. Kapını kilitle bu gece, diyor.',
        secenekler: [{ etiket: 'Kilitlerim.' }],
      },
    },
  },
  husnu: {
    giris: (d) => (bayrak(d, 'husnuAnlatti') ? 'sonra' : bayrak(d, 'husnuKustu') ? 'kus' : 'ilk'),
    dugumler: {
      ilk: {
        metin: () => 'İhtiyar kayıkçı küreklerini bağlıyor. Seni görünce başını kaldırmıyor. Bir şey görmedim, bir şey bilmem, diyor; sen bir şey sormadan.',
        secenekler: [
          { etiket: 'Süleyman Kaptan gönderdi. Sabri onun evladı gibiydi.', kosul: (d) => bayrak(d, 'denkAcik') || d.itibar >= 1, sonra: 'anlatir' },
          {
            etiket: 'Beş kuruşu sandalın kenarına koy.',
            yap: (d) => (harca(d, 5) ? undefined : 'Cebini yokluyorsun; beş kuruşun yok.'),
            sonra: (d) => (d.bayrak._odendi ? 'anlatir' : null),
          },
          {
            etiket: 'Yakasından tut. Gördüğünü söyle.',
            yap: (d) => {
              d.bayrak.husnuKustu = true;
              d.itibar -= 1;
              return 'Yaşlı adam irkiliyor. Bırak beni! Senin gibi kabadayıları çok gördüm. Rıhtımdakiler başlarını çeviriyor; bu iş limanda konuşulacak.';
            },
          },
        ],
      },
      kus: {
        metin: () => 'Hüsnü sana sırtını dönüyor.',
        secenekler: [
          {
            etiket: 'Kusura bakma reis. Süleyman Kaptan için soruyorum.',
            kosul: (d) => bayrak(d, 'denkAcik'),
            yap: (d) => {
              d.bayrak.husnuKustu = false;
            },
            sonra: 'anlatir',
          },
          { etiket: 'Uzaklaş.' },
        ],
      },
      anlatir: {
        metin: (d) => {
          d.bayrak.husnuAnlatti = true;
          return 'Hüsnü etrafına bakıyor, sesini alçaltıyor. Gece üç sularıydı. Işıksız bir motor geldi, Leventis\'in kıçına yanaştı. İki adam ağır bir çuval indirdi. Çuval değildi o, biliyorsun. Biri Türkçe konuşuyordu ama Frenk ağzıyla; öbürüne sus, diyordu, sus.';
        },
        secenekler: [{ etiket: 'Teşekkür ederim, Hüsnü Reis.', yap: (d) => void deliller(d, 'motor', 'fransiz_aksan') }],
      },
      sonra: { metin: () => 'Ne söylediysem söyledim. Kimseye benden duyduğunu deme.', secenekler: [{ etiket: 'Demem.' }] },
    },
  },
  gulce: {
    giris: (d) => (bayrak(d, 'gulceIzin') ? 'guvenli' : bayrak(d, 'gulceYalan') ? 'tekrar' : 'ilk'),
    dugumler: {
      ilk: {
        metin: () => 'Kadın başını defterden kaldırıyor. Otuzlarının başında; kalem tutan parmakları mürekkepli, bakışı temkinli. Burası yük kaydı, diyor. Hamalların işi kapıda.',
        secenekler: [
          { etiket: 'Beni Süleyman Kaptan gönderdi. Sabri\'yi tanırdın belki; ateşçi.', kosul: (d) => bayrak(d, 'gulceOnerildi'), sonra: 'sabri' },
          {
            etiket: 'Leventis\'in sahibi adına geldim. Kayıtlara bakmam lazım.',
            yap: (d) => {
              d.bayrak.gulceYalan = true;
              return 'Gülce kalemini bırakıyor. Leventis\'in sahibi Pire\'de, vekili de kürk mantolu bir bey. Sen hamalsın; ellerin kömür. Yalan söyleyen adamla konuşmam.';
            },
          },
          { etiket: 'Kusura bakma. Çıkıyorum.' },
        ],
      },
      tekrar: {
        metin: () => 'Yine mi sen?',
        secenekler: [
          { etiket: 'Doğrusunu söyleyeceğim: Süleyman Kaptan gönderdi. Sabri dün gece öldürüldü.', kosul: (d) => bayrak(d, 'gulceOnerildi'), sonra: 'sabri' },
          { etiket: 'Çık.' },
        ],
      },
      sabri: {
        metin: (d) => {
          d.bayrak.gulceIzin = true;
          return 'Gülce\'nin kalemi havada kalıyor. Sabri mi? Kömür fişlerini getiren çocuk? Bir an gözlerini kapatıyor. Defterlere bak ama dokunma, diyor. Yük defteri masamın yanında, vinç defteri rafta.';
        },
        secenekler: [{ etiket: 'Teşekkür ederim, Gülce Hanım.', sonra: 'guvenli' }],
      },
      guvenli: {
        metin: () => 'Gülce sesini alçaltıyor. Bir şey bulursan bana da söyle. Bu defterlere ben imza atıyorum.',
        secenekler: [
          {
            etiket: 'Ferrante\'nin adamı buraya geldi mi?',
            kosul: (d) => !bayrak(d, 'ferranteAnlatti'),
            yap: (d) => {
              d.bayrak.ferranteAnlatti = true;
              return 'Dün geldi. Bir kaydı düzeltmek istedi; vermedim. Temiz paltolu, eldivenli. Türkçesi düzgün ama yabancı. Kokusu lavanta. Bıraktığı mektup hâlâ çekmecemde.';
            },
            sonra: 'guvenli',
          },
          {
            etiket: 'Belgedeki işareti çizerek göster: kanatlı bir anahtar.',
            kosul: (d) => delilVar(d, 'kanatli_anahtar') && bayrak(d, 'ferranteAnlatti') && !delilVar(d, 'ferrante_damga'),
            yap: (d) => {
              deliller(d, 'ferrante_damga');
              return 'Gülce\'nin yüzü bembeyaz oluyor. Çekmeceden Ferrante\'nin mektubunu çıkarıyor. Antetli kâğıdın köşesinde, iğne başı kadar: kanatlı bir anahtar. Bunu kimseye gösterme, diyor. Sesi titriyor; sebebini söylemiyor.';
            },
            sonra: 'guvenli',
          },
          { etiket: 'Teşekkür ederim.' },
        ],
      },
    },
  },
  ohannes: {
    giris: (d) => (bayrak(d, 'odaAnahtari') ? 'sonra' : 'ilk'),
    dugumler: {
      ilk: {
        metin: () => 'Ohannes Usta çaydanlığı ocaktan alıyor. Hoş geldin Arif. Sabri\'yi duydum; Allah rahmet eylesin. Ne istersin?',
        secenekler: [
          {
            etiket: 'Sabri\'nin odasını görmem lazım. Öldürüldü, usta.',
            yap: (d) => {
              if (d.itibar < 0) return 'Ohannes başını sallıyor. Rıhtımda Hüsnü\'ye yaptığını konuşuyorlar, Arif. Bugün olmaz. Ya yarın gel ya da elini cebine at.';
              d.bayrak.odaAnahtari = true;
              deliller(d, 'paltolu');
              return 'Ohannes usulca anahtarı uzatıyor. Dün akşam biri geldi, diyor. Sabri\'nin kuzeniyim dedi. Temiz paltolu, lavanta kokulu. Türkçeyi yabancı gibi ama düzgün konuşuyordu. Kuzen değildi o, Arif. Merdiven avlunun dibinde.';
            },
          },
          {
            etiket: 'On kuruşu tezgâha bırak.',
            kosul: (d) => d.itibar < 0,
            yap: (d) => {
              if (!harca(d, 10)) return 'On kuruşun yok.';
              d.bayrak.odaAnahtari = true;
              deliller(d, 'paltolu');
              return 'Ohannes parayı görmezden geliyor ama anahtarı tezgâhın üstüne koyuyor. Dün akşam lavanta kokulu bir bey de çıktı o odaya, diyor. Kuzeniyim dedi. Kuzen değildi.';
            },
          },
          { etiket: 'Bir çay içeyim, usta.', yap: () => 'İnce belli bardak elini ısıtıyor. Ohannes susuyor; sen de.' },
        ],
      },
      sonra: { metin: () => 'Ohannes: Odayı bulduğun gibi bırak, Arif. Ölünün eşyası emanettir.', secenekler: [{ etiket: 'Bırakırım.' }] },
    },
  },
  hamallar: {
    giris: () => 'ilk',
    dugumler: {
      ilk: {
        metin: () => 'Hamallardan biri sırtındaki denki düzeltiyor. Sabri\'ye yazık oldu, diyor. Bir kardeşimizdi.',
        secenekler: [
          {
            etiket: 'Yüke yardım et (bir saat sürer).',
            kosul: (d) => d.bayrak.yardimGunu !== d.gun,
            yap: (d) => {
              d.bayrak.yardimGunu = d.gun;
              d.para += 8;
              d.itibar += 1;
              d.bekleme = 60;
              return 'Bir saat boyunca Leventis\'in yükünü sırtlıyorsun. Reis eline sekiz kuruş sayıyor. Hamallar artık sana kardeş diyor.';
            },
          },
          {
            etiket: 'Ferrante\'nin sandıklarını kim taşıdı?',
            yap: (d) => {
              if (d.itibar >= 1) d.bayrak.arkaKapiBiliniyor = true;
              return d.itibar >= 1
                ? 'Biz taşıdık, diyor biri sesini alçaltarak. Her biri iki adam ağırlığında. Ferrante\'nin bekçisi gece antrepoyu kolaçan eder, arka kapının kilidi gevşektir; söylemedim say.'
                : 'Hamal omuz silkiyor. Biz yük taşırız, soru sormayız.';
            },
          },
          { etiket: 'Kolay gelsin.' },
        ],
      },
    },
  },
  halim: {
    giris: () => 'ilk',
    dugumler: {
      ilk: {
        metin: (d) =>
          !bayrak(d, 'cesetGitti') && d.gun === 1
            ? 'Komiser Halim bıyığını sıvazlıyor. Kimsesiz bir ateşçi, sarhoş, suya düşmüş. Öğleden önce gömülür. Ne bakıyorsun?'
            : 'Komiser Halim fenerini yüzüne tutuyor. Ne dikiliyorsun burada? İşine bak.',
        secenekler: [
          {
            etiket: 'Sabri sarhoş değildi, komiserim. Ağzına içki koymazdı.',
            yap: (d) => {
              d.bayrak.halimUyarildi = true;
              return 'Halim sana yaklaşıyor; nefesi tütün kokuyor. Sen kimsin de bana ders veriyorsun? Adını öğrendim, hamal. Bir daha önüme çıkma.';
            },
          },
          { etiket: 'Haklısınız komiserim.', yap: () => 'Halim homurdanıp yoluna devam ediyor.' },
        ],
      },
    },
  },
  bekci: {
    giris: () => 'ilk',
    dugumler: {
      ilk: {
        metin: () => 'Bekçi fenerini kaldırıyor. Kimsin sen? Çık buradan!',
        secenekler: [{ etiket: 'Uzaklaş.' }],
      },
    },
  },
};

// Görev 2'de o kişinin ikinci görev konuşması uygunsa o, değilse birinci görevinki
// Görev kaynakları: o anki görevden geriye doğru, uygun olan ilk konuşma
const GOREV_KONUSMALARI = { 2: G2_KONUSMALAR, 3: G3_KONUSMALAR, 4: G4_KONUSMALAR };
function kaynak(d, kisiId) {
  for (let g = (d && d.gorev) || 1; g >= 2; g--) {
    const k = GOREV_KONUSMALARI[g] && GOREV_KONUSMALARI[g][kisiId];
    if (k && k.uygun(d)) return k;
  }
  return KONUSMALAR[kisiId];
}

// Düğüm önce seçili kaynakta, yoksa öbüründe aranır (konuşma sürerken kaynak değişebilir)
function dugumBul(d, kisiId, dugumId) {
  const k = kaynak(d, kisiId);
  if (k && k.dugumler[dugumId]) return k.dugumler[dugumId];
  for (const t of [KONUSMALAR, G2_KONUSMALAR, G3_KONUSMALAR, G4_KONUSMALAR]) if (t[kisiId] && t[kisiId].dugumler[dugumId]) return t[kisiId].dugumler[dugumId];
  return null;
}

export function konusmaVarMi(kisiId, d = null) {
  return !!kaynak(d, kisiId);
}

export function konusmaBasla(d, kisiId) {
  return kaynak(d, kisiId).giris(d);
}

// Düğümün metni ve o anda görünen seçenekleri (dizindeki yerleriyle)
export function dugum(d, kisiId, dugumId) {
  const g = dugumBul(d, kisiId, dugumId);
  const metin = typeof g.metin === 'function' ? g.metin(d) : g.metin;
  const secenekler = g.secenekler.map((s, i) => ({ ...s, i })).filter((s) => !s.kosul || s.kosul(d));
  return { metin, secenekler: secenekler.map((s) => ({ etiket: s.etiket, i: s.i })) };
}

// Seçeneği uygular: { metin (söylenecek cevap ya da boş), sonra (düğüm ya da null), yeniDeliller }
export function sec(d, kisiId, dugumId, i) {
  const s = dugumBul(d, kisiId, dugumId).secenekler[i];
  const once = [...d.deliller];
  let metin;
  if (s.yap) {
    // Para ödeyen seçenekler için geçici işaret
    const paraOnce = d.para;
    metin = s.yap(d);
    d.bayrak._odendi = d.para < paraOnce;
  }
  let sonra = typeof s.sonra === 'function' ? s.sonra(d) : s.sonra || null;
  delete d.bayrak._odendi;
  const yeniDeliller = d.deliller.filter((x) => !once.includes(x));
  return { metin: metin || '', sonra, yeniDeliller };
}

// --- Karar ---
export function kararVer(d, karar) {
  d.bayrak.karar1 = karar;
  d.gorevBitti = true;
  const metinler = {
    ingiliz:
      'Ertesi sabah Galata\'daki askerî polis karakolunda bir tercüman seni dinliyor. Yüzbaşı belgeyi alıp ışığa tutuyor; kanatlı anahtarı görünce kaşı bir an kalkıyor. İlgileneceğiz, diyorlar. Kapıdan çıkarken belgenin kopyası olmadığını düşünüyorsun.',
    polis:
      'Süleyman seni Cihangir\'de yokuşun dibindeki bir eve götürüyor. Kapıyı açan yaşlı adam dimdik; adı Rıza. Belgeyi okumadan önce senin anlatmanı istiyor, her ayrıntıyı iki kez. Sonra kâğıdı lambaya tutuyor. Bundan sonra kimseye güvenme, diyor. Bana da.',
    sakla:
      'Belgeyi yağlı beze geri sarıp kayıkhanenin döşemesinde, gevşek tahtanın altına koyuyorsun. Siyakatı okuyacak birini bulmalısın. Fransızca isimleri çözecek birini. Ve kanatlı anahtarın kime ait olduğunu.',
  };
  return (
    metinler[karar] +
    ' Gece hana döndüğünde kapının altında lavanta kokulu bir kâğıt buluyorsun. Tek satır: Bulduğunu geri ver. Altında, mürekkeple basılmış kanatlı bir anahtar. Birinci görevin sonu. Karaköy\'de dolaşmayı sürdürebilirsin; hikâyenin devamı sonraki adımda.'
  );
}

// --- Soruşturma panosu ---
function cikarimBul(a, b) {
  for (const [id, c] of Object.entries(CIKARIMLAR)) {
    const [k1, k2] = c.kume;
    if ((k1.includes(a) && k2.includes(b)) || (k1.includes(b) && k2.includes(a))) {
      if (a !== b) return id;
    }
  }
  return null;
}

// İki delil seçilince sunulan ifadeler (sıra delillerden belirlenir, doğru hep ilk sırada değil)
export function panoIfadeleri(d, a, b) {
  const dogru = cikarimBul(a, b);
  const tohum = (a + b).split('').reduce((t, c) => t + c.charCodeAt(0), 0);
  const havuz = YANLISLAR.filter((y) => (y.gorev || 1) === (d.gorev || 1));
  const yanlislar = [havuz[tohum % havuz.length], havuz[(tohum + 1) % havuz.length]].map((y) => y.ifade);
  const liste = dogru ? [CIKARIMLAR[dogru].ifade, ...yanlislar] : [...yanlislar, 'Bu ikisi arasında bir bağ yok.'];
  const kayma = tohum % liste.length;
  return [...liste.slice(kayma), ...liste.slice(0, kayma)];
}

// Teori kurar. Oyuncuya doğru mu yanlış mı söylenmez; yalnızca kaydedilir.
export function teoriKur(d, a, b, ifade) {
  if (ifade === 'Bu ikisi arasında bir bağ yok.') return { metin: 'İki delili ayrı bıraktın.' };
  const dogruId = cikarimBul(a, b);
  const dogru = !!dogruId && CIKARIMLAR[dogruId].ifade === ifade;
  if (d.teoriler.some((t) => t.ifade === ifade)) return { metin: 'Bu teori panonda zaten var.' };
  d.teoriler.push({ a, b, ifade, dogru, cikarim: dogru ? dogruId : null });
  return { metin: 'Panoya iğnelendi: ' + ifade, yeniTeori: true };
}

export function teoriSil(d, ifade) {
  d.teoriler = d.teoriler.filter((t) => t.ifade !== ifade);
}

export function delilAdi(id) {
  return DELILLER[id] ? DELILLER[id].ad : id;
}

export function envanterMetni(d) {
  const p = ['Askerî tabanca, altı mermi.', 'Süngü bıçağı.', 'Cebinde ' + d.para + ' kuruş.'];
  if (d.envanter.kamera) p.push('Süleyman\'ın Kodak\'ı, ' + d.film + ' poz film.' + (d.negatifler.length ? ' Banyo bekleyen ' + d.negatifler.length + ' poz.' : ''));
  if (d.fotograflar.length) p.push(d.fotograflar.length + ' banyo edilmiş fotoğraf.');
  if (delilVar(d, 'belge')) p.push('Yağlı beze sarılı belge.');
  if (delilVar(d, 'fotograf')) p.push('Manastır\'da çekilmiş fotoğraf.');
  if (d.bayrak.odaAnahtari) p.push('Sabri\'nin oda anahtarı.');
  if (delilVar(d, 'lavanta_not')) p.push('Lavanta kokulu not.');
  if (delilVar(d, 'jeton')) p.push('Pirinç bir jeton: Mercure, Pera, 17.');
  if (d.kilik === 'bey') p.push('Cemil\'in Paris\'ten kalma takımı; bir bey gibi görünüyorsun.');
  if (d.kilik === 'usak') p.push('Yorgo\'nun verdiği beyaz garson ceketi.');
  if (d.bayrak.anahtar17) p.push('On yedinin pirinç anahtarı.');
  if (d.bayrak.defterAlindi) p.push('On yedinin deri defteri, ceketinin içinde.');
  if (d.bayrak.dosyaKarar === 'al') p.push('Kendi dosyan.');
  if (d.bayrak.yaraKol) p.push('Sol kolunda Cemil\'in sardığı yanık.');
  p.push('Limandaki itibarın: ' + (d.itibar > 0 ? 'iyi' : d.itibar < 0 ? 'kötü' : 'sıradan') + '.');
  return p.join(' ');
}

// Duraklatma menüsündeki "Görev" satırı: şu an ne yapılabilir?
export function gorevIpucu(d) {
  if (d.gorev === 4) return g4Ipucu(d);
  if (d.gorev === 3) return g3Ipucu(d);
  if (d.gorev === 2) return g2Ipucu(d);
  if (d.gorevBitti) return 'Birinci görev bitti. Karaköy\'de dolaşmayı sürdürebilirsin.';
  if (!bayrak(d, 'denkAcik'))
    return bayrak(d, 'cesetGitti')
      ? 'Sabri\'nin cesedini götürdüler. Süleyman Kaptan\'a git; ne gördüğünü sorar.'
      : 'Sabri\'nin cesedi rıhtımda, Leventis\'in yanında. Komiser Halim gelmeden incele, sonra Süleyman Kaptan\'a anlat.';
  if (!delilVar(d, 'belge')) return 'Süleyman Kaptan Sabri\'nin denkini kayıkhanesinde sakladı. Denki aç.';
  if (gerekliCikarimlarTamam(d)) return 'Panonda üç bağ da kurulu. Süleyman Kaptan\'a git; belgeyi ne yapacağınıza karar verin.';
  const eksik = [];
  if (!cikarimVar(d, 'olduruldu')) eksik.push('Sabri\'nin nasıl öldüğü');
  if (!cikarimVar(d, 'silah')) eksik.push('Ferrante\'nin sandıklarında ne olduğu');
  if (!cikarimVar(d, 'orgut')) eksik.push('belgenin kime ait olduğu');
  return 'Panoda kurman gereken bağlar: ' + eksik.join(', ') + '. Delilleri topla, iki delili panoda bağla. Gülce büroda gündüz, Ohannes Usta handa, Hüsnü iskelede.';
}
