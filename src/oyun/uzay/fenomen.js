// Yol üstü kozmik fenomenler (derin-uzay-kesifleri-ve-evren-kutuphanesi.md bölüm 1, 4 ve 7) ve Evren Kütüphanesi /
// itibar kademeleri (bölüm 5). Saf JavaScript.
//
// Seyir sırasında her otuz saniyelik "sektör atlamasında" yüzde otuz beş ihtimalle pruvanın önünde bir fenomen
// belirir; keşif zili çalar. Zorunluluk yoktur: oyuncu yanına gidip çift dokunursa (gereçleri takılıysa) gözlem
// operasyonu başlar (vizör, odak, pozlama, deklanşör, ışınlama). Gözlenmiş fenomene yeniden rastlanınca "keşfedildi"
// mührü söylenir; istenirse yalnız dinlenir.
import * as SB from '../tonoflenya/subay';
import { FENOMENLER, FENOMEN_SIRASI, ITIBAR_KADEMELERI, SALONLAR } from '../veri/gozlem';

export const SEKTOR_SN = 30;
export const FENOMEN_IHTIMAL = 0.35;
export const FENOMEN_UZAKLIK = 150;
export const FENOMEN_KENET = 60;

function rastgele(d, i) {
  const x = Math.sin((d.tohum || 1) * 3.17 + i * 91.7) * 43758.5453;
  return x - Math.floor(x);
}

export function fenomenIlerle(d, dt) {
  const u = d.uzay;
  const olaylar = [];
  if (!u) {
    d.fenomen = null;
    return olaylar;
  }
  if (d.fenomen) {
    if (Math.hypot(d.fenomen.x - u.x, d.fenomen.y - u.y) > 450) {
      d.fenomen = null;
      olaylar.push({ tur: 'fenomenGitti', metin: 'Fenomenin sesi arkada kayboldu.' });
    }
    return olaylar;
  }
  if (u.hiz <= 0) return olaylar;
  d.sektorSayac = (d.sektorSayac || 0) + dt;
  if (d.sektorSayac < SEKTOR_SN) return olaylar;
  d.sektorSayac = 0;
  d.sektorNo = (d.sektorNo || 0) + 1;
  if (rastgele(d, d.sektorNo) >= FENOMEN_IHTIMAL) return olaylar;
  const tamam = d.tamamlananOp || [];
  const yeni = FENOMEN_SIRASI.filter((id) => !tamam.includes(id));
  const id = yeni.length ? yeni[Math.floor(rastgele(d, d.sektorNo + 50) * yeni.length)] : FENOMEN_SIRASI[Math.floor(rastgele(d, d.sektorNo + 70) * FENOMEN_SIRASI.length)];
  d.fenomen = { id, x: u.x + Math.sin(u.yon) * FENOMEN_UZAKLIK, y: u.y + Math.cos(u.yon) * FENOMEN_UZAKLIK };
  const f = FENOMENLER[id];
  olaylar.push({ tur: 'fenomen', id, metin: 'Keşif zili. Sensörler pruvanın önünde bir şey yakaladı: ' + f.imza + (tamam.includes(id) ? ' ' + f.ad + ': keşfedildi mührü var; istersen yalnız dinle.' : ' Yanına gidip çift dokun: gözlem.') });
  return olaylar;
}

export function fenomenYakinMi(d) {
  const u = d.uzay;
  return !!(u && d.fenomen && Math.hypot(d.fenomen.x - u.x, d.fenomen.y - u.y) < FENOMEN_KENET * SB.taramaCarpani(d));
}
export function fenomenEksik(d, id) {
  const g = d.gemi;
  return FENOMENLER[id].gerec.filter((k) => !(g && g.moduller[k]));
}

// --- Evren Kütüphanesi ---
export function salonListesi(d) {
  return Object.keys(SALONLAR).map((s) => {
    const kayitlar = d.kodeks.filter((k) => (k.salon || 'tarih') === s);
    return { id: s, ad: SALONLAR[s], kayitlar };
  });
}
export function itibarKademesi(d) {
  let i = 0;
  ITIBAR_KADEMELERI.forEach((k, j) => {
    if (d.itibar >= k.esik) i = j;
  });
  return i;
}
// Kademe değişince bir kez etkiler (2: araştırmacılar gelir, 3: elçiler ve ticaret, 4: tarafsız fener)
export function itibarIlerle(d) {
  const k = itibarKademesi(d);
  const once = d.itibarKademe || 0;
  if (k <= once) return [];
  d.itibarKademe = k;
  const n = d.koloni.nufus;
  if (k >= 1 && once < 1) {
    n.bilim = (n.bilim || 0) + 1;
    n.toplam += 1;
  }
  if (k >= 2 && once < 2) d.bayrak.g_ticaret = true;
  if (k >= 3 && once < 3) d.koloni.moral = Math.min(100, d.koloni.moral + 15);
  const x = ITIBAR_KADEMELERI[k];
  return [{ tur: 'itibar', metin: 'Galaktik itibar kademesi ' + (k + 1) + ': ' + x.ad + '. ' + x.tarif }];
}
