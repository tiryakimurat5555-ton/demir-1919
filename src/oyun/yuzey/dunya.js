// Gezegen yüzeyinin benzetimi (saf JavaScript; ekrandan ve sesten bağımsız, testlerle sınanır).
// Yürüme, dönme, çarpma, yaklaşınca haber verme, çevre tarifi, radar, etkileşim,
// kapılardan geçiş ve kendiliğinden yürüme ("Yerler" menüsü).
import { ALANLAR, KAPILAR, KISILER, MEKANLAR, NOKTALAR } from './harita';
import { aciDuzelt, goreliAci, saatYonu, uzaklik } from '../konum';
import { ESYALAR } from './gorev1';

export const YURUME_HIZI = 2.6; // m/sn (tam güçte)
export const DONUS_HIZI = 2.2; // rad/sn
export const ADIM_BOYU = 1.1; // metre
export const ETKILESIM_MENZILI = 3.2;
export const RADAR_MENZILI = 70;
const HABER_YARICAPI = 4.5; // bu kadar yaklaşınca bir kez söylenir
const HABER_SIFIRLA = 8;
const DILIM = Math.PI / 6; // dönüş tıkırtısı: 30 derecede bir
const OTO_HIZ = 2.6;

// --- Kişilerin yeri (görev ilerledikçe değişir) ---
export function kisiYeri(d, id) {
  const k = KISILER[id];
  if (!k) return null;
  const g = d.bayrak;
  if (id === 'muhendis' && g.jenerator && !g.telemetri) return { ...k, x: 6.5, y: 47.5, eylem: 'anten direğinin dibinde, kablo makarasıyla' };
  return k;
}

export function kisiAdi(d, id) {
  const k = KISILER[id];
  const m = k && d.murettebat[k.rol];
  return m ? m.ad : id;
}

export function kisiTarifi(d, id) {
  const k = KISILER[id];
  const m = k && d.murettebat[k.rol];
  return m ? m.rol + ' ' + m.ad : id;
}

// Bulunulan mekândaki nesneler: noktalar, kapı uçları ve kişiler
export function yakindakiler(d) {
  const sonuc = [];
  for (const id of Object.keys(NOKTALAR)) {
    const n = NOKTALAR[id];
    if (n.mekan !== d.mekan) continue;
    if (n.kaynak && (d.stok[id] || 0) <= 0) continue;
    sonuc.push({ tur: 'nokta', id, ad: n.ad, x: n.x, y: n.y, yaricap: n.yaricap || 2 });
  }
  for (const id of Object.keys(KAPILAR)) {
    KAPILAR[id].uclar.forEach((u, i) => {
      if (u.mekan === d.mekan) sonuc.push({ tur: 'kapi', id, uc: i, ad: u.ad, x: u.x, y: u.y, yaricap: 1.8 });
    });
  }
  for (const id of Object.keys(KISILER)) {
    const k = kisiYeri(d, id);
    if (k.mekan === d.mekan) sonuc.push({ tur: 'kisi', id, ad: kisiTarifi(d, id), x: k.x, y: k.y, yaricap: 1.8, eylem: k.eylem });
  }
  return sonuc;
}

function siraliYakin(d) {
  return yakindakiler(d)
    .map((n) => ({ ...n, m: uzaklik(d.oyuncu, n) }))
    .sort((a, b) => a.m - b.m);
}

function konumMetni(d, n) {
  const m = Math.round(n.m != null ? n.m : uzaklik(d.oyuncu, n));
  if (m < 2) return n.ad + ' tam yanında';
  return n.ad + ', saat ' + saatYonu(goreliAci(d.oyuncu, n)) + ' yönünde, ' + m + ' metre';
}

const YONLER = ['kuzey', 'kuzeydoğu', 'doğu', 'güneydoğu', 'güney', 'güneybatı', 'batı', 'kuzeybatı'];
export function yonAdi(yon) {
  return YONLER[Math.round(aciDuzelt(yon) / (Math.PI / 4)) % 8];
}

// Dokununca: çevrende ne var (yakından uzağa, en çok 4 şey)
export function cevreMetni(d) {
  const liste = siraliYakin(d).filter((n) => n.m < (MEKANLAR[d.mekan].dis ? 30 : 12));
  const parcalar = liste.slice(0, 4).map((n) => konumMetni(d, n));
  const donus = donusYolu(d);
  if (donus) {
    if (!liste.slice(0, 4).some((n) => n.tur === 'kapi')) parcalar.push(konumMetni(d, donus));
  } else if (MEKANLAR[d.mekan].dis) {
    const kapsul = NOKTALAR.kapsul_dis;
    if (!liste.slice(0, 4).some((n) => n.id === 'kapsul_dis')) parcalar.push(konumMetni(d, { ad: 'Kapsül', x: kapsul.x, y: kapsul.y }));
  }
  if (!parcalar.length) return 'Yakında bir şey yok. Uzun bas, radar gönder.';
  return parcalar.join('. ') + '.';
}

// Uzun bas: durum + radar. Radar her şeyi keşfedilmiş sayar ve yankıların geleceği yerleri döndürür.
export function radar(d) {
  const menzil = MEKANLAR[d.mekan].radarMenzili || RADAR_MENZILI;
  const liste = siraliYakin(d).filter((n) => n.m <= menzil && n.tur !== 'kapi');
  const pingler = liste.slice(0, 6).map((n) => ({ id: n.id, x: n.x, y: n.y, gecikme: Math.round(250 + n.m * 22) }));
  for (const n of liste) if (n.tur === 'nokta' && !d.kesif.includes(n.id)) d.kesif.push(n.id);
  const sozler = liste
    .filter((n) => n.tur !== 'kisi')
    .slice(0, 3)
    .map((n) => konumMetni(d, n));
  const parazit = MEKANLAR[d.mekan].radarMenzili ? 'Manyetik parazit radarı kısaltıyor. ' : '';
  return { pingler, metin: parazit + (sozler.length ? 'Yankılar: ' + sozler.join('. ') + '.' : 'Radar yankısı yok.') };
}

export function durumMetni(d) {
  const mk = MEKANLAR[d.mekan];
  const parca = [mk.ad + '.', 'Yüzün ' + yonAdi(d.oyuncu.yon) + 'e dönük.'];
  if (d.mekan === 'vadi') parca.push(konumMetni(d, { ad: 'Kapsül', x: NOKTALAR.kapsul_dis.x, y: NOKTALAR.kapsul_dis.y }) + '.');
  const donus = donusYolu(d);
  if (donus) parca.push(konumMetni(d, donus) + '.');
  if (d.envanter.length) parca.push('Taşıdığın: ' + esyaMetni(d) + '.');
  if (mk.zehirli || d.zehir > 0) parca.push('Kükürt maruziyeti yüzde ' + Math.round(d.zehir || 0) + '.');
  return parca.join(' ');
}

// Vadinin dışındaki açık bölgelerde vadiye dönen geçidin ucu
function donusYolu(d) {
  if (d.mekan === 'vadi' || !MEKANLAR[d.mekan].dis) return null;
  for (const id of Object.keys(KAPILAR)) {
    const u = KAPILAR[id].uclar;
    for (let i = 0; i < 2; i++) if (u[i].mekan === d.mekan && u[1 - i].mekan === 'vadi') return { ad: u[i].ad, x: u[i].x, y: u[i].y };
  }
  return null;
}

// Taşınan eşyalar; aynı eşyadan birden çoksa sayısıyla
export function esyaMetni(d) {
  const sayi = {};
  for (const e of d.envanter) sayi[e] = (sayi[e] || 0) + 1;
  return Object.keys(sayi)
    .map((e) => (sayi[e] > 1 ? sayi[e] + ' ' : '') + ESYALAR[e].ad)
    .join(', ');
}

export function durumKisa(d) {
  const mk = MEKANLAR[d.mekan];
  return mk.ad + '. ' + (d.bitenGorevler.length ? d.bitenGorevler.length + ' görev tamamlandı.' : 'Birinci görev: Sinyal Arayışı.');
}

// Çift dokununca: menzildeki en yakın kapı, nokta ya da kişi
export function etkiles(d) {
  const liste = siraliYakin(d).filter((n) => n.m <= Math.max(ETKILESIM_MENZILI, n.yaricap + 1));
  if (!liste.length) return { tur: 'yok', metin: 'Yanında kullanabileceğin bir şey yok. ' + cevreMetni(d) };
  const n = liste[0];
  if (n.tur === 'kapi') return { tur: 'kapi', ...gec(d, n.id, n.uc) };
  if (n.tur === 'kisi') return { tur: 'kisi', id: n.id, ad: n.ad };
  return { tur: 'nokta', id: n.id, ad: n.ad };
}

// Kapıdan geçer: öteki uca ışınlanır
export function gec(d, kapiId, uc) {
  const k = KAPILAR[kapiId];
  if (k.kosul && !k.kosul(d)) return { metin: k.kilitMetni, kilitli: true, kapi: kapiId, rezonans: k.rezonans };
  const ote = k.uclar[1 - uc];
  d.mekan = ote.mekan;
  d.oyuncu = { x: ote.x, y: ote.y, yon: ote.yon };
  d.haber = {};
  let metin;
  if (k.gecisMetni) metin = k.gecisMetni[uc];
  else metin = MEKANLAR[d.mekan].dis ? 'Hava kilidi tıslayarak açılıyor. Dışarıdasın: ' + MEKANLAR[d.mekan].ad + '.' : 'Hava kilidi arkandan kapanıyor. ' + MEKANLAR[d.mekan].ad + '.';
  return { metin, gecti: true, kapi: kapiId };
}

// Çarpma: mekân sınırı ve engeller (noktaların engel yarıçapı)
function engelVar(d, x, y) {
  for (const a of ALANLAR) if (a.mekan === d.mekan && Math.hypot(x - a.x, y - a.y) < a.r) return { ad: 'Yerçekimi alanı', alan: true, x: a.x, y: a.y };
  for (const id of Object.keys(NOKTALAR)) {
    const n = NOKTALAR[id];
    if (n.mekan !== d.mekan || !n.engel) continue;
    if (Math.hypot(x - n.x, y - n.y) < n.engel) return n;
  }
  return null;
}

function sinirDisi(d, x, y) {
  const a = MEKANLAR[d.mekan].alan;
  if (x < a.bati) return 'bati';
  if (x > a.dogu) return 'dogu';
  if (y < a.guney) return 'guney';
  if (y > a.kuzey) return 'kuzey';
  return null;
}

const SINIR_METNI = {
  vadi: 'Kanyon duvarı. Kaya burada dimdik yükseliyor.',
  kapsul: 'Kapsülün duvarı.',
  krater: 'Kraterin yamacı. Taş burada dik ve pürüzsüz.',
  kseno_lab: 'Pürüzsüz taş duvar; parmaklarının altında hafif bir titreşim.',
  mabet: 'Odanın titreşen duvarı.',
  sirtlar: 'Sırtın yamacı burada çok dik; kayalar ayağının altından kayıyor.',
  plato: 'Platonun kenarı. Aşağısı derin bir uçurum; rüzgâr seni kenardan geri itiyor.',
};

// Bir adım ilerletir. girdi: { ileri: -1..1, donus: -1..1 }. Olay listesi döndürür.
export function ilerle(d, girdi, dt) {
  const olaylar = [];
  d.sure = (d.sure || 0) + dt;
  if (!d.haber) d.haber = {};
  if (d.adimBirikim == null) d.adimBirikim = 0;
  let ileri = girdi.ileri || 0;
  let donus = girdi.donus || 0;

  // Kendiliğinden yürüme
  if (d.oto && !ileri && !donus) {
    const o = otoAdim(d, dt, olaylar);
    if (o) {
      if (d.oto) zehirIlerle(d, dt, 0, olaylar);
      firtinaIlerle(d, dt, !!d.oto, olaylar);
      return olaylar;
    }
  } else if (d.oto && (ileri || donus)) {
    d.oto = null;
    olaylar.push({ tur: 'otoIptal' });
  }

  if (donus) {
    const once = d.oyuncu.yon;
    d.oyuncu.yon = aciDuzelt(d.oyuncu.yon + donus * DONUS_HIZI * dt);
    const dilim = Math.floor((d.oyuncu.yon + DILIM / 2) / DILIM) % 12;
    const onceDilim = Math.floor((aciDuzelt(once) + DILIM / 2) / DILIM) % 12;
    if (dilim !== onceDilim) olaylar.push({ tur: 'tik', guc: dilim % 3 === 0 ? 0.65 : 0.3 });
  }
  if (ileri) {
    const m = ileri * YURUME_HIZI * dt;
    adimAt(d, m, olaylar);
  }
  yaklasmaHaberi(d, olaylar);
  zehirIlerle(d, dt, 0, olaylar);
  firtinaIlerle(d, dt, !!ileri, olaylar);
  return olaylar;
}

// --- Fırtına hamleleri (Uğultulu Plato) ---
// Ara sıra bir yönden rüzgâr hamlesi gelir: önce 2,5 sn yükselen bir ıslık (hamleGeliyor), sonra 1,5 sn hamle.
// Hamle anında yürüyorsan rüzgâr seni 4 metre savurur; durursan çömelirsin, üstünden geçer. Hidrolik ayak
// dengelenirken (d.terazi) hamle ayağı sarsar. Zamanlama ve yön oyunun tohumundan: şansa değil kulağa dayanır.
export const HAMLE_UYARI = 2.5;
export const HAMLE_SURE = 1.5;
export const HAMLE_ITME = 4;
function karisim(tohum, n) {
  let x = (tohum ^ (n * 2654435761)) >>> 0;
  x = Math.imul(x ^ (x >>> 15), 2246822507) >>> 0;
  x = Math.imul(x ^ (x >>> 13), 3266489909) >>> 0;
  return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
}
export function firtinaIlerle(d, dt, hareketli, olaylar) {
  const mk = MEKANLAR[d.mekan];
  if (!mk.firtinali) {
    d.firtina = null;
    return;
  }
  if (!d.firtina) d.firtina = { sayac: 0, sonraki: (d.sure || 0) + 8, evre: null };
  const f = d.firtina;
  const t = d.sure || 0;
  if (!f.evre && t >= f.sonraki) {
    f.evre = 'uyari';
    f.bitis = t + HAMLE_UYARI;
    f.yon = karisim(d.tohum || 1, f.sayac + 1) * Math.PI * 2; // hamlenin geldiği mutlak yön
    const kaynak = { x: d.oyuncu.x + Math.sin(f.yon) * 20, y: d.oyuncu.y + Math.cos(f.yon) * 20 };
    olaylar.push({ tur: 'hamleGeliyor', kaynak, metin: 'Saat ' + saatYonu(goreliAci(d.oyuncu, kaynak)) + ' yönünden ıslık yükseliyor: hamle geliyor. Dur!' });
  } else if (f.evre === 'uyari' && t >= f.bitis) {
    f.evre = 'hamle';
    f.bitis = t + HAMLE_SURE;
    const kaynak = { x: d.oyuncu.x + Math.sin(f.yon) * 3, y: d.oyuncu.y + Math.cos(f.yon) * 3 };
    if (d.vinc && !d.vinc.oturdu) {
      // Hamle vinçteki parçayı savurur
      d.vinc.x = Math.max(-1, Math.min(1, d.vinc.x + (karisim(d.tohum || 1, f.sayac + 70) < 0.5 ? -0.35 : 0.35)));
      olaylar.push({ tur: 'hamle', kaynak, savruldu: false, sarsti: true, metin: 'Hamle vinçteki parçayı savurdu!' });
    } else if (d.terazi) {
      // Hamle kızağı sarsar: ayak dengeden kayar (yön tohumdan)
      d.terazi.sapma = Math.max(-1, Math.min(1, d.terazi.sapma + (karisim(d.tohum || 1, f.sayac + 50) < 0.5 ? -0.3 : 0.3)));
      d.terazi.kilit = 0;
      olaylar.push({ tur: 'hamle', kaynak, savruldu: false, sarsti: true, metin: 'Hamle kızağı sarstı; ayak dengeden kaydı.' });
    } else if (hareketli) {
      // Rüzgârın estiği yöne (geldiği yönün tersine) savrulur; engelde ya da sınırda durur
      const a = f.yon + Math.PI;
      let m = 0;
      for (let i = 0; i < HAMLE_ITME * 4; i++) {
        const nx = d.oyuncu.x + Math.sin(a) * 0.25;
        const ny = d.oyuncu.y + Math.cos(a) * 0.25;
        if (sinirDisi(d, nx, ny) || engelVar(d, nx, ny)) break;
        d.oyuncu.x = nx;
        d.oyuncu.y = ny;
        m += 0.25;
      }
      d.haber = {};
      olaylar.push({ tur: 'hamle', kaynak, savruldu: true, metin: 'Hamle seni yürürken yakaladı; ' + Math.round(m) + ' metre savruldun. Islığı duyunca dur.' });
    } else olaylar.push({ tur: 'hamle', kaynak, savruldu: false, metin: 'Yere çömeldin; hamle üstünden geçti.' });
  } else if (f.evre === 'hamle' && t >= f.bitis) {
    f.evre = null;
    f.sayac += 1;
    f.sonraki = t + 13 + karisim(d.tohum || 1, f.sayac + 100) * 9;
  }
}

// --- Kükürt maruziyeti (Manyetik Sırtlar) ---
// Sırtlarda yavaşça, gaz bacalarının dibinde hızlı artar; dışarıda hızla düşer. 100 olunca bayılırsın:
// mürettebat seni kapsüle taşır (eşyalar ve ilerleme kalır).
export const ZEHIR_UYARILARI = [50, 75, 90];
export function zehirIlerle(d, dt, ek, olaylar) {
  const mk = MEKANLAR[d.mekan];
  const once = d.zehir || 0;
  if (mk.zehirli) {
    let hiz = 0.35;
    for (const id of Object.keys(NOKTALAR)) {
      const n = NOKTALAR[id];
      if (n.baca && n.mekan === d.mekan && uzaklik(d.oyuncu, n) < 7) hiz = 0.8;
    }
    d.zehir = Math.min(100, once + (hiz + (ek || 0)) * dt);
  } else if (once > 0) d.zehir = Math.max(0, once - 3 * dt);
  for (const e of ZEHIR_UYARILARI) if (once < e && d.zehir >= e) olaylar.push({ tur: 'zehir', duzey: e });
  if (d.zehir >= 100) {
    d.zehir = 0;
    d.mekan = 'kapsul';
    d.oyuncu = { x: 303, y: 3.5, yon: 0 };
    d.oto = null;
    d.valf = null;
    d.haber = {};
    d.sahne = 'bayilma';
    olaylar.push({ tur: 'bayildi' });
  }
}

function adimAt(d, m, olaylar) {
  const nx = d.oyuncu.x + Math.sin(d.oyuncu.yon) * m;
  const ny = d.oyuncu.y + Math.cos(d.oyuncu.yon) * m;
  const sinir = sinirDisi(d, nx, ny);
  const engel = engelVar(d, nx, ny);
  if (sinir || engel) {
    if (!d.carpmaSusturma || d.sure - d.carpmaSusturma > 1.5) {
      d.carpmaSusturma = d.sure;
      if (engel && engel.alan) olaylar.push({ tur: 'carpti', alan: true, metin: 'Görünmez bir çekim seni yere bastırıyor, dizlerin bükülüyor; geri çekiliyorsun. Uğultunun geldiği yerden uzak dur.' });
      else olaylar.push({ tur: 'carpti', metin: engel ? engel.ad + '. Etrafından dolaş.' : SINIR_METNI[d.mekan] || 'Geçit yok.' });
    }
    return false;
  }
  d.oyuncu.x = nx;
  d.oyuncu.y = ny;
  d.adimBirikim += Math.abs(m);
  if (d.adimBirikim >= ADIM_BOYU) {
    d.adimBirikim -= ADIM_BOYU;
    olaylar.push({ tur: 'adim', zemin: MEKANLAR[d.mekan].zemin });
  }
  return true;
}

function yaklasmaHaberi(d, olaylar) {
  for (const n of yakindakiler(d)) {
    const anahtar = n.tur + ':' + n.id + (n.uc != null ? ':' + n.uc : '');
    const m = uzaklik(d.oyuncu, n);
    if (m <= Math.max(HABER_YARICAPI, n.yaricap + 1.5)) {
      if (!d.haber[anahtar]) {
        d.haber[anahtar] = true;
        if (n.tur === 'nokta' && !d.kesif.includes(n.id)) d.kesif.push(n.id);
        if (!d.oto) olaylar.push({ tur: 'yakin', nesne: n.tur, id: n.id, metin: konumMetni(d, { ...n, m }) + '.' + (n.tur === 'kisi' ? ' ' + n.eylem + '.' : '') + ' Çift dokun.' });
      }
    } else if (m > HABER_SIFIRLA && d.haber[anahtar]) delete d.haber[anahtar];
  }
}

// --- Kendiliğinden yürüme ---
// Gidilebilecek yerler: keşfedilen noktalar, kişiler ve kapsül. Başka mekândakiler kapıdan geçilerek.
export function yerlerListesi(d) {
  const liste = [];
  const ekle = (tur, id, adi, mekan, x, y) => {
    const m = mekan === d.mekan ? Math.round(uzaklik(d.oyuncu, { x, y })) : null;
    liste.push({ tur, id, ad: adi, mekan, x, y, uzaklik: m });
  };
  for (const id of Object.keys(NOKTALAR)) {
    const n = NOKTALAR[id];
    if (n.kaynak && (d.stok[id] || 0) <= 0) continue;
    const bilinen = d.kesif.includes(id) || n.mekan === 'kapsul' || id === 'kapsul_dis' || id === 'jenerator' || (id === 'tepe' && d.bayrak.jenerator) || (id === 'enkaz' && d.bayrak.kesiciAlindi) || (n.baca && d.bayrak.sondaAlindi) || ((n.ayak || id === 'dagitim_kutusu') && d.bayrak.zeminHazir) || (id === 'kizak' && d.bayrak.zemin);
    if (bilinen) ekle('nokta', id, n.ad, n.mekan, n.x, n.y);
  }
  for (const id of Object.keys(KISILER)) {
    const k = kisiYeri(d, id);
    ekle('kisi', id, kisiTarifi(d, id), k.mekan, k.x, k.y);
  }
  // Bilinen geçitler (vadi tarafındaki uçları)
  if (d.bayrak.sondaAlindi || d.bayrak.maske) {
    const u = KAPILAR.guney_gecit.uclar[0];
    ekle('kapi', 'guney_gecit', u.ad, u.mekan, u.x, u.y);
  }
  if (d.bayrak.dokumhane) {
    const u = KAPILAR.bati_gecit.uclar[0];
    ekle('kapi', 'bati_gecit', u.ad, u.mekan, u.x, u.y);
  }
  if (d.kesif.includes('can_1') || d.bayrak.kapi_dis) {
    const u = KAPILAR.kseno_kapi.uclar[0];
    ekle('kapi', 'kseno_kapi', u.ad, u.mekan, u.x, u.y);
  }
  if (d.bayrak.kapi_dis) {
    const u = KAPILAR.ic_kapi.uclar[0];
    ekle('kapi', 'ic_kapi', u.ad, u.mekan, u.x, u.y);
  }
  if (d.bayrak.biyo_kubbe) {
    const u = KAPILAR.kuzey_gecit.uclar[0];
    ekle('kapi', 'kuzey_gecit', u.ad, u.mekan, u.x, u.y);
  }
  return liste.sort((a, b) => (a.mekan === d.mekan ? 0 : 1) - (b.mekan === d.mekan ? 0 : 1) || (a.uzaklik || 0) - (b.uzaklik || 0));
}

export function otoBaslat(d, hedef) {
  d.oto = { id: hedef.id, ad: hedef.ad, mekan: hedef.mekan, x: hedef.x, y: hedef.y, yan: 0 };
  const m = hedef.mekan === d.mekan ? Math.round(uzaklik(d.oyuncu, hedef)) : null;
  return { metin: 'Yürüyorsun: ' + hedef.ad + (m != null ? ', ' + m + ' metre' : ', geçitlerden geçerek') + '. Durmak için ekrana dokun.' };
}

function kapiUcu(d) {
  // Bu mekândan hedef mekâna giden kapının buradaki ucu; doğrudan kapı yoksa vadiye (bütün yolların kavşağı) giden
  const bul = (hedef) => {
    for (const id of Object.keys(KAPILAR)) {
      const u = KAPILAR[id].uclar;
      for (let i = 0; i < 2; i++) if (u[i].mekan === d.mekan && u[1 - i].mekan === hedef) return { id, uc: i, ...u[i] };
    }
    return null;
  };
  // Kapı ağında hedefe giden ilk adım (genişlik öncelikli arama)
  const komsu = (m) => {
    const r = [];
    for (const id of Object.keys(KAPILAR)) {
      const u = KAPILAR[id].uclar;
      for (let i = 0; i < 2; i++) if (u[i].mekan === m) r.push(u[1 - i].mekan);
    }
    return r;
  };
  const once = { [d.mekan]: null };
  const kuyruk = [d.mekan];
  while (kuyruk.length) {
    const m = kuyruk.shift();
    if (m === d.oto.mekan) break;
    for (const k of komsu(m)) if (!(k in once)) {
      once[k] = m;
      kuyruk.push(k);
    }
  }
  if (!(d.oto.mekan in once)) return null;
  let adim = d.oto.mekan;
  while (once[adim] !== d.mekan && once[adim] != null) adim = once[adim];
  return bul(adim);
}

function otoAdim(d, dt, olaylar) {
  const o = d.oto;
  let hedef = o;
  let kapi = null;
  if (o.mekan !== d.mekan) {
    kapi = kapiUcu(d);
    if (!kapi) {
      d.oto = null;
      olaylar.push({ tur: 'otoTakildi' });
      return true;
    }
    hedef = kapi;
  }
  const m = uzaklik(d.oyuncu, hedef);
  const varis = kapi ? 1.2 : Math.max(1.5, (NOKTALAR[o.id] && NOKTALAR[o.id].yaricap) || 1.5);
  if (m <= varis) {
    if (kapi) {
      const r = gec(d, kapi.id, kapi.uc);
      if (r.kilitli) {
        d.oto = null;
        olaylar.push({ tur: 'otoKilitli', metin: r.metin });
      } else olaylar.push({ tur: 'otoKapi', metin: r.metin });
      return true;
    }
    d.oto = null;
    // Hedefe dön
    d.oyuncu.yon = aciDuzelt(Math.atan2(hedef.x - d.oyuncu.x, hedef.y - d.oyuncu.y));
    olaylar.push({ tur: 'otoVardi', ad: o.ad });
    d.haber = {};
    yaklasmaHaberi(d, []);
    return true;
  }
  let yon = Math.atan2(hedef.x - d.oyuncu.x, hedef.y - d.oyuncu.y);
  if (o.yan > 0) {
    yon += (o.yanIsaret || 1) * (Math.PI / 2);
    o.yan -= dt;
  }
  d.oyuncu.yon = aciDuzelt(yon);
  const adim = Math.min(m, OTO_HIZ * dt);
  const once = olaylar.length;
  if (!adimAt(d, adim, olaylar)) {
    // Engel: bir süre yana kayarak etrafından dolaş (çarpma sözü söylenmez)
    olaylar.length = once;
    // Hangi yana kayacağını seç: açık olan yan; ikisi de açıksa engelden uzaklaşan yan. Sıkışınca yön değiştir.
    const duz = Math.atan2(hedef.x - d.oyuncu.x, hedef.y - d.oyuncu.y);
    const yanPuan = (isaret) => {
      const a = duz + isaret * (Math.PI / 2);
      const x = d.oyuncu.x + Math.sin(a) * 1.5;
      const y = d.oyuncu.y + Math.cos(a) * 1.5;
      if (sinirDisi(d, x, y) || engelVar(d, x, y)) return -1;
      const ex = d.oyuncu.x + Math.sin(duz) * 1.2;
      const ey = d.oyuncu.y + Math.cos(duz) * 1.2;
      const e = engelVar(d, ex, ey);
      const mx = e && e.x != null ? e.x : ex;
      const my = e && e.y != null ? e.y : ey;
      return Math.hypot(x - mx, y - my);
    };
    if (o.yan > 0) o.yanIsaret = -(o.yanIsaret || 1);
    else {
      const sag = yanPuan(1);
      const sol = yanPuan(-1);
      o.yanIsaret = sol > sag ? -1 : 1;
    }
    o.yan = 0.8;
    o.takilma = (o.takilma || 0) + 1;
    if (o.takilma > 40) {
      d.oto = null;
      olaylar.push({ tur: 'otoTakildi' });
    }
  }
  return true;
}
