// Evrensel bina sistemi (belgeler/v4/bina-etkileri-ve-isleyis-mantigi.txt, 25-bina-evrensel-butunsellik-ve-yetim-esya-
// baglantisi.txt). Saf JavaScript. Mevcut 25 tesisin maliyeti ve tarifleri değişmez; her tesis beş evrensel rolden birine
// (ya da ikisine) oturur. Yeni bir kW elektrik kısıtı yoktur (25 bina belgesi bölüm 1): hız jeotermal santral, Yıldız
// Nöbeti, topluluk ve moral üzerinden işler.
//
// Üç kural: (1) pasif iş (tesisin kendi üretimi ve kilidi), (2) sefer/savaş hazırlığı: oyuncu sefer öncesi tesise
// uğrarsa bir sonraki sefere tek seferlik avantaj (d.hazirlik), (3) hızlanma: işten anlayan topluluk ve uyan nöbet.
import { nobet } from './zaman';
import { evrenEtki } from './tonoflenya/kisiler';

export const ROL_ADLARI = {
  1: 'Çekirdek, yönetim ve savunma',
  2: 'Yaşam, tarım ve sağlık',
  3: 'Sanayi, tersane ve araç',
  4: 'Bilim, dinleme ve akademi',
  5: 'Hibrit ve geçiş',
};
export const ROL_NOBETLERI = { 1: ['Zhaor'], 2: ['Axira', 'Uma'], 3: ['Varek'], 4: ['Elyndra', 'Sinha'], 5: [] };
// Mevcut 25 tesisin rolleri (25 bina belgesi bölüm 2)
export const ROLLER = {
  komuta_merkezi: [1], yuksek_reaktor: [1], jeotermal_santral: [1], koloni_kalkani: [1], tina_cekirdegi: [1],
  yasam_blogu: [2], biyo_kubbe: [2], sera: [2], kseno_habitat: [2], multeci_kampusu: [2], hastane: [2], koloni_mutfagi: [2], kseno_eczane: [2],
  dokumhane: [3], reaktor_lab: [3], arac_hangari: [3], tersane: [3], tersane_2: [3], tersane_3: [3], itki_hangari: [3], kriyo_atolye: [3], askeri_tersane: [3],
  sinyal_kulesi: [4], kuantum_lab: [4], akademi: [4],
};
// Savaş ve sefer katkılarının bir cümlelik anlatımı (terminalde ve kodekste okunur)
export const KATKI = {
  komuta_merkezi: 'Taktik harp dairesi düşmanın arketipini önceden söyler, ilk uyarıya yarım saniye ekler.',
  yuksek_reaktor: 'Sınıf IV ve V gemilerde ağır silahın dolumu bir tur kısalır.',
  jeotermal_santral: 'Bütün üretim yüzde yirmi hızlı; Aethelis yüzeyindeki çatışmalarda termal kalkan ısıyı yarıya indirir.',
  koloni_kalkani: 'Koloni baskınlarında ekibin aldığı ilk darbe yarıya iner.',
  tina_cekirdegi: 'Bütün savaşlarda kilit ve kaçınma penceresi kalıcı olarak 0,3 saniye uzar.',
  yasam_blogu: 'Barınma kapasitesi; nüfus arttıkça iş gücü üretimi kısaltır.',
  biyo_kubbe: 'Karanlık düşmanların yarattığı stres birikimi yüzde otuz az.',
  sera: 'Nüfus artışı ve moral; moral yüksekken üretim hızlanır.',
  kseno_habitat: 'Farklı ırkların moral kaybı sıfırlanır.',
  multeci_kampusu: 'Yüksek nüfusla koloninin üretim ve savunma kapasitesi en üst düzeye çıkar.',
  hastane: 'Savaş sonrası mürettebatın yaralanma ve travma cezaları kendiliğinden temizlenir.',
  koloni_mutfagi: 'Sefere yüklenen rasyonlar savaşta tepki süresi ve moral verir.',
  kseno_eczane: 'Kara ya da uzay yenilgisinde ekip kaybı ve yas olmaz.',
  dokumhane: 'Kalıcı zırh ve gövde kaplamaları hem gemiye hem yüzey araçlarına işler.',
  reaktor_lab: 'K3 çift fazlı bobinlerle kalkan delme ve yenileme.',
  arac_hangari: 'Kara çatışmasında kullanılacak yüzey araçlarının bakımı.',
  tersane: 'Yedek filodaki gemiyi destek yuvasına hazırlar.',
  tersane_2: 'Yedek filodaki gemiyi destek yuvasına hazırlar.',
  tersane_3: 'Yedek filodaki gemiyi destek yuvasına hazırlar.',
  itki_hangari: 'Uzay savaşında kaçınma penceresi 0,2 saniye uzar.',
  kriyo_atolye: 'Aşırı ısı saldırılarına karşı gemi ve kara ekibi direnci yüzde yirmi beş artar.',
  askeri_tersane: 'Gemi silah hasarı yüzde on beş artar; karada zırh delme güçlenir.',
  sinyal_kulesi: 'Gezegen sinyallerinin menzilini açar; pusu ve yabancı firkateyni önceden bildirir.',
  kuantum_lab: 'Taktik ışınlanma ve frekans eşleme kolaylaşır (eşleme payı yüzde elli geniş).',
  akademi: 'Gezegen numuneleri Ar-Ge masasında kalıcı bonuslara dönüşür.',
};

// --- Kural 3: hızlanma (topluluk ve nöbet) ---
// Topluluklar: Kaelith (kadim mezar ya da kurtarma görevi), Kithron (G-13), Vaelin (G-14), Aethel-9 madencileri,
// Malken (YGK kaydı), insan koloniciler (her zaman)
export function topluluklar(d) {
  const op = d.tamamlananOp || [];
  const b = d.bayrak || {};
  return {
    insan: true,
    kaelith: op.includes('kadim_mezar') || !!b.kaelithKurtarildi,
    kithron: op.includes('g13') || !!b.irk_kithron,
    vaelin: op.includes('g14'),
    aethel9: op.includes('aethel9'),
    malken: !!b.ygkKayit,
  };
}
export function rolCarpani(d, tesis) {
  const roller = ROLLER[tesis] || [];
  const t = topluluklar(d);
  let c = 1;
  if (roller.includes(3) && (t.kaelith || t.aethel9)) c *= 1.25; // maden, metal, ateş uyumlu
  if (roller.includes(2) && t.vaelin) c *= 1.25; // su, tıp, doğa uyumlu
  if (roller.includes(4) && (t.malken || t.kithron)) c *= 1.25; // bilim, sinyal, aether uyumlu
  if (roller.includes(1)) c *= 1.1; // insan koloniciler yönetimi hızlandırır
  // Ayrı, izole kseno-kubbeler (3B): Kithron ve Vaelin kendi atmosferlerinde yüzde yirmi beş verimli
  if (d.bayrak && d.bayrak.ksenoIzole && ((roller.includes(2) && t.vaelin) || (roller.includes(4) && t.kithron))) c *= 1.25;
  // Evren itibarı: araştırma hızı (Galaktik Öncü yüzde yirmi beş, Evrenin Muhafızı yüzde otuz beş)
  if (roller.includes(4)) c *= 1 + evrenEtki(d).bilim;
  // Doğu bataklığından sağ dönen uzmanlar: enstitü ve sera yüzde on hızlı (v4 Görev 1C)
  if (roller.includes(2) && d.bayrak && d.bayrak.doguUzmanlari) c *= 1.1;
  // Fotonik kristaller aydınlatma hatlarında (yerel operasyon 1A): gece nöbetlerinde (Sinha, Uma) verim yüzde on
  if (d.bayrak && d.bayrak.fotonHat && d.zaman && ['Sinha', 'Uma'].includes(nobet(d).yildiz)) c *= 1.1;
  // Dr. Selin'in iksir deneyi: eczane bir gün hızlı
  if (tesis === 'reaktor_lab' && d.bayrak && d.bayrak.halvar) c *= 1.15; // Radion-Kızıl'dan teknisyen Halvar
  if (tesis === 'kseno_eczane' && d.bayrak && d.zaman && (d.bayrak.eczaneHizBitis || 0) > d.zaman.sn) c *= 1.5;
  // Günün nöbeti tesisin işiyle uyuşuyorsa
  if (d.zaman) {
    const y = nobet(d).yildiz;
    if (roller.some((r) => ROL_NOBETLERI[r].includes(y))) c *= 1.15;
  }
  return c;
}

// --- Kural 2: sefer ve savaş hazırlığı ---
export const HAZIRLIKLAR = {
  tarama: { rol: 1, tesisler: ['komuta_merkezi', 'sinyal_kulesi'], ad: 'Hedef sektör taraması', tarif: 'Bir sonraki çatışmada ilk uyarı penceresi yarım saniye daha uzun; pusular önceden bildirilir.' },
  ziyafet: { rol: 2, tesisler: ['koloni_mutfagi', 'sera'], ad: 'Sefer ziyafeti', tarif: 'Bir sonraki çatışmanın ilk iki turunda pencere bir saniye uzun ve atışlar yüzde on beş güçlü.' },
  ilac: { rol: 2, tesisler: ['kseno_eczane', 'hastane', 'biyo_kubbe'], ad: 'Acil tedavi iğneleri', tarif: 'Bir sonraki yenilgide kayıp ve yas olmaz; savaşta stres yarı birikir.' },
  kalibrasyon: { rol: 3, tesisler: ['dokumhane', 'tersane', 'itki_hangari'], ad: 'Motor ve silah kalibrasyonu', tarif: 'Bir sonraki seferde yakıt yüzde on beş az; kaçınma penceresi 0,3 saniye uzun.' },
  istihbarat: { rol: 4, tesisler: ['kuantum_lab', 'akademi', 'sinyal_kulesi'], ad: 'Erken uyarı istihbaratı', tarif: 'Bir sonraki çatışmaya sessiz ilk vuruş avantajıyla girersin.' },
};
export function hazirlikListesi(d) {
  const b = d.koloni.binalar;
  const h = d.hazirlik || {};
  return Object.keys(HAZIRLIKLAR)
    .filter((k) => HAZIRLIKLAR[k].tesisler.some((t) => b.includes(t)))
    .map((k) => ({ id: k, ...HAZIRLIKLAR[k], hazir: !!h[k] }));
}
export function hazirlikYap(d, id) {
  const x = HAZIRLIKLAR[id];
  if (!x || !x.tesisler.some((t) => d.koloni.binalar.includes(t))) return { metin: 'Bu hazırlık için gereken tesis kurulu değil.', ses: 'red' };
  if (!d.hazirlik) d.hazirlik = {};
  if (d.hazirlik[id]) return { metin: x.ad + ' zaten hazır: ' + x.tarif };
  d.hazirlik[id] = true;
  return { metin: x.ad + ' hazır. ' + x.tarif, ses: 'dugme' };
}
// Savaş başında tüketilir (uzay/savas.js çağırır)
export function savasHazirligi(d) {
  const h = d.hazirlik || {};
  const r = { tarama: !!h.tarama, ziyafet: !!h.ziyafet, ilac: !!h.ilac, istihbarat: !!h.istihbarat };
  if (d.hazirlik) for (const k of ['tarama', 'ziyafet', 'istihbarat']) delete d.hazirlik[k];
  return r;
}
// Sefer bitince kalibrasyon ve tedavi iğneleri harcanmış sayılır
export function seferHazirligiBitti(d) {
  if (d.hazirlik) {
    delete d.hazirlik.kalibrasyon;
    delete d.hazirlik.ilac;
  }
}

// --- Akademi Ar-Ge masası: 20 gezegen numunesi (25 bina belgesi 4.1) ---
export const NUMUNE_ESIKLERI = [
  { n: 5, metin: 'Bütün gemilerin kalkan kapasitesi kalıcı olarak yüzde on arttı.' },
  { n: 10, metin: 'Kara ve uzay savaşlarında birincil silah hasarı kalıcı olarak yüzde on arttı.' },
  { n: 15, metin: 'Derin uzayda yakıt tüketimi kalıcı olarak yüzde on beş azaldı.' },
  { n: 20, metin: 'Tam koleksiyon: Tonoflenya ve Alt Evren düşmanlarına karşı yüzde on beş direnç ve "Galaktik Kâşif" unvanı.' },
];
export function numuneTeslim(d, adlar = {}) {
  if (!d.koloni.binalar.includes('akademi')) return { metin: 'Ar-Ge masası Çoklu-Tür Bilim ve Felsefe Akademisi\'nde; önce akademiyi kur.', ses: 'red' };
  const elde = d.numuneler || [];
  if (!d.numuneTeslim) d.numuneTeslim = [];
  const yeni = elde.filter((x) => !d.numuneTeslim.includes(x));
  if (!yeni.length) return { metin: 'Teslim edilecek yeni numune yok. Teslim edilen: ' + d.numuneTeslim.length + ' / 20.' };
  const once = d.numuneTeslim.length;
  for (const x of yeni) d.numuneTeslim.push(x);
  if (!d.yan) d.yan = {};
  d.yan.bilim = (d.yan.bilim || 0) + 250 * yeni.length;
  d.itibar += 25 * yeni.length;
  d.kaptan.tecrube += 30 * yeni.length;
  const sonra = d.numuneTeslim.length;
  const esik = NUMUNE_ESIKLERI.filter((e) => once < e.n && sonra >= e.n).map((e) => e.metin);
  if (sonra >= 20) d.bayrak.galaktikKasif = true;
  return {
    metin: yeni.length + ' numune Ar-Ge masasına teslim edildi: ' + yeni.map((x) => adlar[x] || x).join(', ') + '. Bilim puanı +' + 250 * yeni.length + ', evren itibarı +' + 25 * yeni.length + '. Toplam ' + sonra + ' / 20.' + (esik.length ? ' ' + esik.join(' ') : ''),
    ses: 'sinyal',
  };
}

// --- Dinleme kulesinin menzili: hangi halkadaki gezegen sinyalleri duyulur (25 bina belgesi 2, madde 21) ---
// 0: kule yok · 2: kule kurulu (halka 1-2) · 3: kripto frekans anteni + çok kanallı sinyal çözücü · 5: komuta merkezi +
// kuantum kripto-arşivleyicisi (halka 4-5 ve YGK feneri)
export function kuleMenzili(d, sahip) {
  const b = d.koloni.binalar;
  if (!b.includes('sinyal_kulesi')) return 0;
  const anten = sahip(d, 'burun') || sahip(d, 'mod_burun');
  if (b.includes('komuta_merkezi') && sahip(d, 'arsivleyici') && anten) return 5;
  if (anten && sahip(d, 'sinyal_cozucu')) return 3;
  return 2;
}

// Koloni yönetiminde ağaç menü: sefer hazırlığı, bina rolleri ve katkıları, Ar-Ge masası
export function binaMenu(d, TESISLER, GEZEGENLER) {
  const adlar = {};
  for (const k of Object.keys(GEZEGENLER || {})) adlar[k] = GEZEGENLER[k].ad;
  const ogeler = [
    {
      id: 'hazirlik',
      etiket: 'Sefer ve savaş hazırlığı',
      ipucu: 'Bir sonraki sefere tek seferlik avantaj.',
      alt: (x) => ({
        baslik: 'Sefer ve savaş hazırlığı',
        giris: 'Tesislere uğrayıp hazırlık yap; bir sonraki sefer ya da çatışmada harcanır. Yapmazsan oyun yine sürer.',
        ogeler: hazirlikListesi(x).map((h) => ({ id: h.id, etiket: h.ad + (h.hazir ? ': hazır' : '') + '. ' + h.tarif, yap: (y) => hazirlikYap(y, h.id) })),
      }),
    },
    {
      id: 'roller',
      etiket: 'Bina rolleri ve savaş katkıları',
      alt: (x) => ({
        baslik: 'Kurulu binaların rolleri',
        giris: 'Her bina beş evrensel rolden birinde; işten anlayan topluluk ve uyan Yıldız Nöbeti işini hızlandırır.',
        ogeler: x.koloni.binalar.filter((b) => TESISLER[b]).map((b) => ({
          id: b,
          etiket: (TESISLER[b].kisa || TESISLER[b].ad) + ': ' + (ROLLER[b] || []).map((r) => ROL_ADLARI[r]).join(' ve ') + ' rolü, hız çarpanı ' + rolCarpani(x, b).toFixed(2).replace('.', ',') + '. ' + (KATKI[b] || ''),
          yap: () => ({ metin: KATKI[b] || TESISLER[b].islev || '' }),
        })),
      }),
    },
  ];
  if (d.koloni.binalar.includes('akademi'))
    ogeler.push({ id: 'numune', etiket: 'Akademi Ar-Ge masası: gezegen numunelerini teslim et (' + (d.numuneTeslim || []).length + ' / 20)', yap: (x) => numuneTeslim(x, adlar) });
  return { baslik: 'Binalar ve hazırlık', giris: 'Evrensel bina sistemi.', ogeler };
}
