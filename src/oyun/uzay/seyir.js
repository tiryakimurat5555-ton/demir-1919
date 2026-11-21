// Uzay seyrüseferi ve ziyaret noktaları (belgeler/derin-uzay-gorevleri.md bölüm 1 "dokunsal ve sesli seyrüsefer",
// uzay-oyunu-tasarim-ve-senaryo.md bölüm 4 "otomatik ziyaret noktaları, ön tarama ve donanım gereksinim listesi",
// gelistirici-entegrasyon-rehberi Faz 3 "uzay haritasında ses fenerleriyle yön bulma"). Saf JavaScript.
//
// Düzlem: x doğu, y kuzey (birim); gemi yönü 0 kuzey, saat yönünde. Her ziyaret noktası kendi perdesinde bir fener
// çalar; fenerin sesi iki kulakta eşitlenince pruva hedefe dönüktür. Yukarı kaydır: itki (hız kademesi artar),
// aşağı: ters itici; sağa-sola: burun 15 derece döner. Basılı tut: radar. Çift dokun: kenetlen (yakın ve yavaşken).
// Bir noktaya kenetlenince ön tarama raporu: çevre analizi ve zorunlu donanım. Eksik varsa görev kilitli.
import * as E from '../tarim/etki';
import * as SB from '../tonoflenya/subay';
import { yildizCarpani } from '../zaman';
import { GEMI_SINIFLARI, MODUL_KATMANLARI } from '../veri/gemiler';
import { aciDuzelt, goreliAci, saatYonu } from '../konum';
import { telsizSubayiCarpani, gucDagitimi } from '../gemi/gemi';

export const HIZ_BIRIMI = 8; // birim/sn, her kademe
export const HIZ_EN_COK = 5;
export const YAKIT_TUKETIM = 0.04; // litre/sn, her kademe
export const KENET_MESAFE = 40;
export const YAKLASMA_MESAFE = 120;
export const UZAY_SINIRI = 1600;
export const FENER_MENZILI = 1300; // fenerler bu mesafeden duyulur (telsiz subayı uzatır)
export const KILIT_ACISI = (6 * Math.PI) / 180;

// Ziyaret noktaları. gerekli: modül katmanları (gemiler.js). sinif: en az gemi kademesi.
export const UZAY_NOKTALARI = {
  aethelis: { ad: 'Aethelis-IV', x: 0, y: 0, frek: 196, tarif: 'Koloni gezegeni. Fenerinin pes, sıcak tonu eve dönüşün işareti.', ev: true },
  sektor15: {
    ad: 'Sektör 15, gaz bulutundaki asteroit üssü',
    x: 640,
    y: 860,
    frek: 523,
    poi: 'sektor15',
    gorev: 'Prometheus Derinliği ve Gizli İstasyon',
    tehlike: 'Yoğun parazit yayan kör bir nebula. Asteroidin içine oyulmuş, reaktörü tamamen soğumuş gizli bir askeri istasyon.',
    hedef: 'İstasyona dışarıdan enerji basıp hangarları açmak, şifreli veritabanından kızağın kilit kodlarını çözmek, baskına gelecek korsanları püskürtmek.',
    gerekli: [
      { katman: 'makine', ad: 'Yüksek voltajlı graviton reaktörü' },
      { katman: 'burun', ad: 'Kripto frekans anteni' },
      { katman: 'dis_b', ad: 'Ağır hisar savunma topları' },
    ],
    sinif: 3,
  },
  moloz_kusagi: {
    ad: 'Buzlu Moloz Kuşağı',
    x: -820,
    y: 470,
    frek: 784,
    poi: 'moloz_kusagi',
    gorev: 'Kadim Genom ve Kseno-Arkeoloji',
    tehlike: 'Milyonlarca yıllık derin uzay buzulları; içinde biyolojik stasis kilidi açık, nabız gibi sinyal yayan organik bir kapsül.',
    hedef: 'Kırılgan buz kapsülünü parçalamadan ambara almak, açıldığında saçılacak kseno-sporları izole etmek, genetik çekirdeği kurtarmak.',
    gerekli: [
      { katman: 'dis_a', ad: 'Manyetik çekici kiriş' },
      { katman: 'bolme_a', ad: 'Biyo-karantina bölmesi ve kontrollü plazma dekontaminasyon ünitesi' },
    ],
    sinif: 3,
  },
  k12: {
    ad: 'Sektör K-12, asteroit kanyonundaki korsan kalesi', x: 1100, y: -300, frek: 440, poi: 'k12', acan: 'dokumhane', sinif: 3,
    gorev: 'Gölge Armada ve Kaçırılan Filo',
    tehlike: 'Yoğun manyetik fırtınaların ardında, yüksek hızlı meteoritlerin uçuştuğu bir asteroit kanyonu. Pusuya düşmüş müttefik konvoyun eskortları rehin.',
    hedef: 'Kaleye fark edilmeden sızmak, ana jeneratörü felç etmek, kaçırılan gemilerin otopilotunu sıfırlayıp komutayı geri almak.',
    gerekli: [
      { katman: 'govde', ad: 'Lamine zırh kaplaması' },
      { katman: 'termal_karartma', ad: 'Pasif termal karartma modülü' },
      { katman: 'komuta', ad: 'Geniş kapsamlı askeri karadutu ünitesi' },
    ],
  },
  zaman_havzasi: {
    ad: 'Kuantum kırılma noktası, Zaman Döngüsü Havzası', x: -300, y: -1100, frek: 659, poi: 'zaman_havzasi', acan: 'kuantum_lab', sinif: 3,
    gorev: 'Yankılanan Kuantum Çöküşü',
    tehlike: 'Zaman çizgisini büken bir kuantum feneri; geçmiş ve gelecek telsiz konuşmaları aynı anda yankılanıyor. Bir prototip korvet döngüde kaybolmak üzere.',
    hedef: 'Geminin zaman çizgisini sabitlemek, yankıların içinden gerçek korvetin imzasını ayıklayıp onu yarıktan çekmek.',
    gerekli: [
      { katman: 'tahrik', ad: 'Kuantum rezonans sürücüsü' },
      { katman: 'zaman_capasi', ad: 'Zaman çapası dengeleyicisi' },
      { katman: 'takonik_cozucu', ad: 'Çok kanallı takonik frekans çözücü' },
    ],
  },
  xerad: {
    ad: 'Xerad Sektörü, kararsız boyut yarığı', x: 1250, y: 600, frek: 349, poi: 'xerad', acan: 'itki_hangari', sinif: 3,
    gorev: 'Deney 07 ve Tonoflenya Anomalisi',
    tehlike: 'Boyut atlama deneyi felaketle bitmiş; istasyonun ortasında büyüyen bir yarık. Ağzında canlı bir denek ve Malken prototip motoru asılı.',
    hedef: 'Yarığın çekimine karşı sabit kalmak, kabini kirişle koparıp almak, deneği yaşatmak.',
    gerekli: [
      { katman: 'dis_a', ad: 'Ağır hizmet tipi manyetik çekici kiriş' },
      { katman: 'asiri_iyon', ad: 'Aşırı yüklü iyon iticileri' },
      { katman: 'biyo_stabilizasyon', ad: 'Biyo-stabilizasyon yaşam destek odası' },
    ],
  },
  yanan_gemi: {
    ad: 'Yanan araştırma gemisinin reaktör çekirdeği', x: -1200, y: -400, frek: 587, poi: 'yanan_gemi', acan: 'kriyo_atolye', sinif: 3,
    gorev: 'Alevin Ruhu ve Yapay Bilinç Tina',
    tehlike: 'Plazma sızıntısıyla eriyen bir Konfederasyon araştırma gemisi; beş bin derecelik koridorlar. Çekirdekte yapay bilinç Tina kilitli.',
    hedef: "Plazma hatlarını dondurmak, Tina'nın bilincini veri kaybı olmadan gemiye aktarmak.",
    gerekli: [
      { katman: 'yangin_kalkani', ad: 'Termal koruma ve yangın bastırma kalkanı' },
      { katman: 'kriyo_pompa', ad: 'Kriyo-plazma soğutma pompaları' },
      { katman: 'bolme_b', ad: 'Yüksek hacimli optik kripto-bellek bankası' },
    ],
  },
  aethel9: {
    ad: 'Aethel-9 maden gezegeni yörünge hattı', x: 300, y: 1350, frek: 392, poi: 'aethel9', acan: 'askeri_tersane', sinif: 4,
    gorev: 'Aethel-9 Gezegen Kuşatması',
    tehlike: 'Dev bir yabancı filo gezegeni yörüngeden bombalıyor; kalkanlar çökmek üzere, binlerce kolonist tahliye bekliyor.',
    hedef: 'Yörünge savunma koridorunu açmak, amiral gemisinin kalkanını tek salvoda delmek, tahliye mekiklerini korumak.',
    gerekli: [
      { katman: 'hisar_zirhi', ad: 'Ağır hisar zırhı ve çift katmanlı deflektör kalkanı' },
      { katman: 'dis_b', ad: 'Ağır torpido istasyonu' },
      { katman: 'tahliye_ambari', ad: 'Genişletilmiş tahliye ambarı' },
    ],
  },
  tarras: {
    ad: 'Tarras Geçidi, galaktik boğaz çatışma alanı', x: -1000, y: 1000, frek: 466, poi: 'tarras', acan: 'komuta_merkezi', sinif: 4,
    gorev: 'Tarras Boğazı Donanma Mahşeri',
    tehlike: 'İki süper gücün binlerce gemisi boğazda karşı karşıya; çapraz lazer ve plazma ateşi.',
    hedef: 'Tarafsız bölgede hayatta kalmak, iki donanmanın gizli protokollerini derlemek, kanıtları bütün frekanslara yayıp ateşkese zorlamak.',
    gerekli: [
      { katman: 'jammer', ad: 'Diplomatik karartma ve jammer kalkanı' },
      { katman: 'komuta', ad: 'Süper-işlemcili karadutu analizörü' },
      { katman: 'genis_telsiz', ad: 'Geniş bantlı telsiz vericisi' },
    ],
  },
  kizil_yutucu: {
    ad: 'Kızıl Yutucu olay ufku, kadim çekim kapanı', x: 900, y: -1200, frek: 293, poi: 'kizil_yutucu', acan: 'yuksek_reaktor', sinif: 5,
    gorev: 'Kızıl Yutucu ve Alt-Evren Mancınığı',
    tehlike: 'Süper-kütleli bir kara deliğin olay ufkunda, gezegen boyutunda kadim bir mancınık; çekim kirişleri gemiyi içeri çekiyor.',
    hedef: 'Gövdeyi çekime karşı korumak, mancınığın kontrol merkezine kilitlenmek, kadim anahtarla mancınığı çalıştırmak.',
    gerekli: [
      { katman: 'graviton_surucu', ad: 'Gelişmiş graviton sürücüsü' },
      { katman: 'ters_itki', ad: 'Ters itki kuantum bobinleri' },
      { katman: 'kadim_anahtar', ad: 'Kadim rezonans anahtarı' },
    ],
  },
};

// YGK feneri: Tonoflenya'ya hiper-sıçrama koridoru (tonoflenya/malken.js; final-gorevleri 1.1: Sınıf III ve üstü)
UZAY_NOKTALARI.ygk_feneri = {
  ad: 'YGK feneri, Tonoflenya hiper-sıçrama koridoru', x: 0, y: -1450, frek: 1175, poi: 'ygk_feneri', sinif: 3, gerekli: [],
  acKosul: (d) => !!d.bayrak.ygkFrekansi,
  gorev: 'Tonoflenya\'ya dönüş',
  tehlike: 'Alt-uzay koridoru; sekiz saatlik sıçrama.',
  hedef: 'Fenere kenetlenmek ve YGK Akademi\'nin yerçekimi iskelesine sıçramak.',
};

// Derin uzay görevlerinin noktaları (veri/uzayGorevleri.js)
import { G_NOKTALARI } from '../veri/uzayGorevleri';
Object.assign(UZAY_NOKTALARI, G_NOKTALARI);

// Tesisler kuruldukça haritada yeni ziyaret noktaları belirir (bölüm 4 ve 6). Yeni çıkanların listesi döner.
export function poiGuncelle(d) {
  const yeni = [];
  for (const id of Object.keys(UZAY_NOKTALARI)) {
    const n = UZAY_NOKTALARI[id];
    if (((n.acan && d.koloni.binalar.includes(n.acan)) || (n.acKosul && n.acKosul(d))) && !d.harita.poiler.includes(n.poi)) {
      d.harita.poiler.push(n.poi);
      yeni.push(id);
    }
  }
  return yeni;
}

export function gorunurNoktalar(d) {
  return Object.keys(UZAY_NOKTALARI).filter((id) => UZAY_NOKTALARI[id].ev || d.harita.poiler.includes(UZAY_NOKTALARI[id].poi));
}

function uzak(a, b) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

export function fenerMenzili(d) {
  return FENER_MENZILI * telsizSubayiCarpani(d) * (d.gemi && d.gemi.moduller.optik_prizma ? 1.3 : 1) * (d.bayrak.g_haritalar ? 1.2 : 1) * E.fenerCarpani(d) * yildizCarpani(d, 'fener') * SB.taramaCarpani(d) * (d.gemi && d.gemi.moduller.sinha_sonari ? 2 : 1) * (SB.kabiliyet(d, 'zhaor', 3) ? 1.2 : 1);
}
export const KALKIS_YAKITI = 2;

// --- Kalkış ve iniş ---
export function kalkisOlur(d) {
  const g = d.gemi;
  if (!g) return 'Gemi yok.';
  if (g.yer === 'uzay') return 'Zaten uzaydasın.';
  if (g.yakit < 5) return 'Yakıt az: ' + Math.round(g.yakit) + ' litre. Kalkış için en az 5 litre gerekir; kızaktan yakıt doldur.';
  return '';
}
export function kalkis(d) {
  const engel = kalkisOlur(d);
  if (engel) return { metin: engel, ses: 'red' };
  d.gemi.yakit = Math.max(0, d.gemi.yakit - KALKIS_YAKITI * (d.gemi.moduller.grav_kalkani ? 0.5 : 1) * (d.bayrak.p_takyon ? 0 : 1) * SB.kalkisYakitCarpani(d));
  d.gemi.yer = 'uzay';
  d.uzay = { x: 0, y: 45, yon: 0, hiz: 0, yaklasilan: {}, kilitli: null, yakitUyari: false };
  d.sahne = 'kalkis';
  return { metin: '' };
}

// --- Kumanda ---
export function itki(d, fark) {
  const u = d.uzay;
  if (!u) return { metin: '' };
  if (fark > 0 && d.gemi.yakit <= 0) return { metin: 'Yakıt bitti; itki yok.', ses: 'red' };
  const once = u.hiz;
  u.hiz = Math.max(0, Math.min(HIZ_EN_COK, u.hiz + fark));
  if (u.hiz === once) return { metin: fark > 0 ? 'Tam itki.' : 'Duruyorsun.' };
  return { metin: u.hiz === 0 ? 'Ters iticiler: durdun.' : 'Hız kademesi ' + u.hiz + '.' };
}
export function burunDondur(d, radyan) {
  const u = d.uzay;
  if (!u) return null;
  u.yon = aciDuzelt(u.yon + radyan);
  return u.yon;
}

// En yakın nokta (görünürler içinden)
export function enYakin(d) {
  const u = d.uzay;
  let en = null;
  for (const id of gorunurNoktalar(d)) {
    const n = UZAY_NOKTALARI[id];
    const m = uzak(u, n);
    if (!en || m < en.m) en = { id, m, n };
  }
  return en;
}

export function uzayIlerle(d, dt) {
  const u = d.uzay;
  const olaylar = [];
  if (!u) return olaylar;
  const g = d.gemi;
  if (u.hiz > 0) {
    const b = d.bayrak;
    const yakit = u.hiz * YAKIT_TUKETIM * dt * (g.moduller.sivi_iletken ? 0.85 : 1) * (b.f_yakit ? 0.9 : 1) * (b.f_saat ? 0.9 : 1) * (b.p_yakit ? 0.9 : 1) * (b.p_tasarruf ? 0.9 : 1) * E.yakitCarpani(d) * SB.yakitCarpani(d) * (1 - (g.aetherVerimi || 0));
    g.yakit = Math.max(0, g.yakit - yakit);
    const birim = HIZ_BIRIMI * gucDagitimi(d).hiz * E.hizCarpani(d) * yildizCarpani(d, 'hiz') * ((d.surupBitis || 0) > ((d.zaman && d.zaman.sn) || 0) ? 1.25 : 1);
    u.x += Math.sin(u.yon) * u.hiz * birim * dt;
    u.y += Math.cos(u.yon) * u.hiz * birim * dt;
    if (g.yakit <= 0) {
      u.hiz = 0;
      olaylar.push({ tur: 'yakitBitti' });
    }
  }
  if (!u.yakitUyari && g.yakit <= g.maxYakit * 0.2) {
    u.yakitUyari = true;
    olaylar.push({ tur: 'yakitAz', metin: 'Yakıt yüzde yirminin altında: ' + Math.round(g.yakit) + ' litre. Eve dönüşü düşün.' });
  }
  const r = Math.hypot(u.x, u.y);
  if (r > UZAY_SINIRI) {
    const a = Math.atan2(u.x, u.y);
    u.x = Math.sin(a) * UZAY_SINIRI;
    u.y = Math.cos(a) * UZAY_SINIRI;
    u.hiz = 0;
    olaylar.push({ tur: 'sinir', metin: 'Seyir bilgisayarı: haritalanmış bölgenin sınırı. Ötesi için kulenin menzili yetmiyor. Durdun.' });
  }
  // Yaklaşma ve pruva kilidi
  for (const id of gorunurNoktalar(d)) {
    const n = UZAY_NOKTALARI[id];
    const m = uzak(u, n);
    if (m < YAKLASMA_MESAFE && !u.yaklasilan[id]) {
      u.yaklasilan[id] = true;
      olaylar.push({ tur: 'yaklasti', id, metin: n.ad + ' yakında, ' + Math.round(m) + ' birim. Yavaşla; kenetlenmek için çift dokun.' });
    } else if (m > YAKLASMA_MESAFE * 1.5) u.yaklasilan[id] = false;
  }
  const kilit = gorunurNoktalar(d).find((id) => {
    const n = UZAY_NOKTALARI[id];
    if (uzak(u, n) > fenerMenzili(d) || uzak(u, n) < KENET_MESAFE) return false;
    const a = goreliAci({ x: u.x, y: u.y, yon: u.yon }, n);
    return a < KILIT_ACISI || a > Math.PI * 2 - KILIT_ACISI;
  });
  if (kilit && kilit !== u.kilitli) olaylar.push({ tur: 'pruvaKilit', id: kilit, metin: 'Pruva kilitli: ' + UZAY_NOKTALARI[kilit].ad + '.' });
  u.kilitli = kilit || null;
  return olaylar;
}

// Radar: noktaların yönü ve uzaklığı; yankının perdesi uzaklıkla düşer
export function uzayRadar(d) {
  const u = d.uzay;
  const pingler = [];
  const sozler = [];
  for (const id of gorunurNoktalar(d)) {
    const n = UZAY_NOKTALARI[id];
    const m = uzak(u, n);
    const saat = saatYonu(goreliAci({ x: u.x, y: u.y, yon: u.yon }, n));
    pingler.push({ id, x: n.x, y: n.y, m, gecikme: 300 + Math.min(m, 1600) * 1.2, frek: Math.max(180, 1200 - m * 0.6) });
    sozler.push({ m, metin: n.ad + ' saat ' + saat + ' yönünde, ' + Math.round(m) + ' birim' });
  }
  sozler.sort((a, b) => a.m - b.m);
  return { pingler, metin: 'Radar: ' + sozler.map((s) => s.metin).join('; ') + '.' };
}

export function uzayDurumu(d) {
  const u = d.uzay;
  if (!u) return '';
  const e = enYakin(d);
  return (
    'Hız kademesi ' + u.hiz + '. Yakıt ' + Math.round(d.gemi.yakit) + ' litre. ' +
    (e ? 'En yakın: ' + e.n.ad + ', saat ' + saatYonu(goreliAci({ x: u.x, y: u.y, yon: u.yon }, e.n)) + ' yönünde, ' + Math.round(e.m) + ' birim.' : '')
  );
}

// --- Ön tarama (bölüm 4) ---
export function eksikDonanim(d, id) {
  const n = UZAY_NOKTALARI[id];
  const g = d.gemi;
  const eksik = (n.gerekli || []).filter((x) => !(g && g.moduller[x.katman]));
  return { eksik, sinifYetmez: !!(n.sinif && (!g || g.sinif < n.sinif)) };
}
export function onTarama(d, id) {
  const n = UZAY_NOKTALARI[id];
  if (n.ev) return n.ad + '. ' + n.tarif;
  if ((d.tamamlananOp || []).includes(id)) return n.ad + '. ' + n.gorev + ': operasyon tamamlandı.';
  const { eksik, sinifYetmez } = eksikDonanim(d, id);
  const satir = [
    'Hedef sektör: ' + n.ad + '.',
    'Görev: ' + n.gorev + '.',
    'Çevre analizi: ' + n.tehlike,
    'Operasyon hedefi: ' + n.hedef,
    n.gerekli.length ? 'Zorunlu donanım: ' + n.gerekli.map((x) => x.ad + (d.gemi && d.gemi.moduller[x.katman] ? ', takılı' : ', eksik')).join('; ') + '.' : 'Özel donanım gerekmez.',
  ];
  if (n.sinif) satir.push('Gemi sınıfı: en az kademe ' + n.sinif + ', ' + GEMI_SINIFLARI[n.sinif].ad + '.' + (sinifYetmez ? ' ' + (d.gemi ? d.gemi.ad : 'Gemin') + ' yetmez.' : ''));
  if (eksik.length || sinifYetmez) satir.push('Gemi bilgisayarı görevi kilitledi. Eksikleri koloni tersanesinde üret.');
  else satir.push('Donanım tam. Seyir onaylandı.');
  return satir.join(' ');
}

// --- Kenetlenme ---
export function kenetlen(d) {
  const u = d.uzay;
  if (!u) return { metin: '' };
  const e = enYakin(d);
  const oto = d.gemi.moduller.oto_kenet; // otomatik kenetlenme bilgisayarı: daha uzaktan, daha hızlıyken
  if (!e || e.m > KENET_MESAFE * (oto ? 2 : 1)) return { metin: 'Kenetlenecek bir şey yok. ' + (e ? e.n.ad + ' ' + Math.round(e.m) + ' birim uzakta.' : ''), ses: 'red' };
  if (u.hiz > (oto ? 3 : 1)) return { metin: 'Çok hızlısın; kenetlenmek için hızı bire ya da sıfıra düşür.', ses: 'red' };
  if (e.n.ev) {
    d.gemi.govde = d.gemi.maxGovde; // tersane gövdeyi onarır
    d.gemi.yer = 'kizak';
    d.uzay = null;
    d.sahne = 'inis';
    return { metin: '', inis: true };
  }
  if (!d.taranan) d.taranan = [];
  if (!d.taranan.includes(e.id)) d.taranan.push(e.id);
  u.hiz = 0;
  const { eksik, sinifYetmez } = eksikDonanim(d, e.id);
  return { metin: onTarama(d, e.id), kilitli: !!(eksik.length || sinifYetmez), id: e.id };
}

// Koordinatları ses düzlemine (metre) indirger: 20 birim = 1 metre
export const SES_OLCEK = 20;
export function sesYeri(n) {
  return { x: n.x / SES_OLCEK, y: n.y / SES_OLCEK };
}

// Katman adı (eksik raporları ve gemi durumu için)
export function katmanAdi(id) {
  const k = MODUL_KATMANLARI.find((x) => x.id === id);
  return k ? k.modul : id;
}
