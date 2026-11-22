// Kilit karakterlerin konuşma noktaları k_<id> (tonoflenya/kisiler.js KARAKTERLER yer alanından). Saf veri;
// yuzey/harita.js birleştirir.
import { KARAKTERLER, KARAKTER_SIRASI } from './kisiler';
import { A_MEKANLAR } from './atlas';
import { T_MEKANLAR } from './harita';

export const MEKAN = (id) => A_MEKANLAR[id] || T_MEKANLAR[id];
export const K_NOKTALAR = {};
for (const id of KARAKTER_SIRASI) {
  const k = KARAKTERLER[id];
  const m = MEKAN(k.yer[0]);
  if (!m) continue;
  K_NOKTALAR['k_' + id] = { mekan: k.yer[0], x: m.alan.bati + k.yer[1], y: m.alan.guney + k.yer[2], ad: k.ad + ', ' + k.unvan, yaricap: 2, karakter: id, tarif: k.tarif };
}
