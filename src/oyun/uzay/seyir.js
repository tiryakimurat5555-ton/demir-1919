// Uzay seyrüseferi ve ziyaret noktaları (belgeler/derin-uzay-gorevleri.md bölüm 1 "dokunsal ve sesli seyrüsefer",
// uzay-oyunu-tasarim-ve-senaryo.md bölüm 4 "otomatik ziyaret noktaları, ön tarama ve donanım gereksinim listesi",
// gelistirici-entegrasyon-rehberi Faz 3 "uzay haritasında ses fenerleriyle yön bulma"). Saf JavaScript.
//
// Düzlem: x doğu, y kuzey (birim); gemi yönü 0 kuzey, saat yönünde. Her ziyaret noktası kendi perdesinde bir fener
// çalar; fenerin sesi iki kulakta eşitlenince pruva hedefe dönüktür. Yukarı kaydır: itki (hız kademesi artar),
// aşağı: ters itici; sağa-sola: burun 15 derece döner. Basılı tut: radar. Çift dokun: kenetlen (yakın ve yavaşken).
// Bir noktaya kenetlenince ön tarama raporu: çevre analizi ve zorunlu donanım. Eksik varsa görev kilitli.
import { GEMI_SINIFLARI, MODUL_KATMANLARI } from '../veri/gemiler';
import { aciDuzelt, goreliAci, saatYonu } from '../konum';
import { telsizSubayiCarpani } from '../gemi/gemi';

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
};

export function gorunurNoktalar(d) {
  return Object.keys(UZAY_NOKTALARI).filter((id) => UZAY_NOKTALARI[id].ev || d.harita.poiler.includes(UZAY_NOKTALARI[id].poi));
}

function uzak(a, b) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

export function fenerMenzili(d) {
  return FENER_MENZILI * telsizSubayiCarpani(d);
}

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
    const yakit = u.hiz * YAKIT_TUKETIM * dt;
    g.yakit = Math.max(0, g.yakit - yakit);
    u.x += Math.sin(u.yon) * u.hiz * HIZ_BIRIMI * dt;
    u.y += Math.cos(u.yon) * u.hiz * HIZ_BIRIMI * dt;
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
  const { eksik, sinifYetmez } = eksikDonanim(d, id);
  const satir = [
    'Hedef sektör: ' + n.ad + '.',
    'Görev: ' + n.gorev + '.',
    'Çevre analizi: ' + n.tehlike,
    'Operasyon hedefi: ' + n.hedef,
    'Zorunlu donanım: ' + n.gerekli.map((x) => x.ad + (d.gemi && d.gemi.moduller[x.katman] ? ', takılı' : ', eksik')).join('; ') + '.',
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
  if (!e || e.m > KENET_MESAFE) return { metin: 'Kenetlenecek bir şey yok. ' + (e ? e.n.ad + ' ' + Math.round(e.m) + ' birim uzakta.' : ''), ses: 'red' };
  if (u.hiz > 1) return { metin: 'Çok hızlısın; kenetlenmek için hızı bire ya da sıfıra düşür.', ses: 'red' };
  if (e.n.ev) {
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
