// Kendiliğinden yürüme için yol bulma (saf JavaScript).
// Sokakta (dis) 1 metrelik ızgarada A*; iç mekânlar dikdörtgen olduğu için orada düz çizgi.
// Mekânlar arası geçişte kapılar sırayla kullanılır (sokak ↔ bina, han ↔ oda).
import { MEKANLAR, SINIR } from './harita';
import { uzaklik } from '../konum';

// engel işlevi döngüsel içe aktarmayı önlemek için dışarıdan verilir: engel(mekan, nokta) → null | neden
const ADIM = 1;

function anahtar(x, y) {
  return x + ',' + y;
}

// İki nokta arası düz yol açık mı?
export function gorusAcik(engel, mekan, a, b) {
  const u = uzaklik(a, b);
  const n = Math.max(1, Math.ceil(u / 0.1));
  const pay = 0.2; // köşeleri sıyırmasın diye yolun iki yanı da boş olmalı
  for (let i = 1; i < n; i++) {
    const t = i / n;
    const x = a.x + (b.x - a.x) * t;
    const y = a.y + (b.y - a.y) * t;
    if (engel(mekan, { x, y })) return false;
    if (i > 2 && i < n - 2)
      for (const [ox, oy] of [[pay, 0], [-pay, 0], [0, pay], [0, -pay]]) if (engel(mekan, { x: x + ox, y: y + oy })) return false;
  }
  return true;
}

function enYakinBosHucre(engel, p) {
  const x0 = Math.round(p.x);
  const y0 = Math.round(p.y);
  for (let r = 0; r <= 8; r++)
    for (let dx = -r; dx <= r; dx++)
      for (let dy = -r; dy <= r; dy++) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
        const h = { x: x0 + dx, y: y0 + dy };
        if (!engel('dis', h)) return h;
      }
  return null;
}

// Sokakta a'dan b'ye nokta dizisi (a hariç, b dahil) ya da null
export function sokakYolu(engel, a, b) {
  if (gorusAcik(engel, 'dis', a, b)) return [{ x: b.x, y: b.y }];
  const bas = enYakinBosHucre(engel, a);
  const son = enYakinBosHucre(engel, b);
  if (!bas || !son) return null;
  const acik = [{ ...bas, g: 0, f: uzaklik(bas, son) }];
  const onceki = {};
  const gMap = { [anahtar(bas.x, bas.y)]: 0 };
  const kapali = {};
  let bulundu = null;
  let sinir = 20000;
  while (acik.length && sinir-- > 0) {
    let mi = 0;
    for (let i = 1; i < acik.length; i++) if (acik[i].f < acik[mi].f) mi = i;
    const c = acik.splice(mi, 1)[0];
    const ck = anahtar(c.x, c.y);
    if (kapali[ck]) continue;
    kapali[ck] = true;
    if (c.x === son.x && c.y === son.y) {
      bulundu = c;
      break;
    }
    for (let dx = -1; dx <= 1; dx++)
      for (let dy = -1; dy <= 1; dy++) {
        if (!dx && !dy) continue;
        const n = { x: c.x + dx * ADIM, y: c.y + dy * ADIM };
        if (n.x < SINIR.bati || n.x > SINIR.dogu || n.y > SINIR.kuzey) continue;
        if (engel('dis', n)) continue;
        // Çaprazda köşe kesilmesin
        if (dx && dy && (engel('dis', { x: c.x + dx, y: c.y }) || engel('dis', { x: c.x, y: c.y + dy }))) continue;
        const nk = anahtar(n.x, n.y);
        const g = c.g + (dx && dy ? Math.SQRT2 : 1);
        if (gMap[nk] !== undefined && gMap[nk] <= g) continue;
        gMap[nk] = g;
        onceki[nk] = ck;
        acik.push({ ...n, g, f: g + uzaklik(n, son) });
      }
  }
  if (!bulundu) return null;
  const hucreler = [];
  let k = anahtar(son.x, son.y);
  while (k) {
    const [x, y] = k.split(',').map(Number);
    hucreler.unshift({ x, y });
    k = onceki[k];
  }
  // Yolu sadeleştir: görüş açık oldukça ara noktaları atla
  const ham = [a, ...hucreler, b];
  const sade = [];
  let i = 0;
  while (i < ham.length - 1) {
    let j = ham.length - 1;
    while (j > i + 1 && !gorusAcik(engel, 'dis', ham[i], ham[j])) j--;
    sade.push(ham[j]);
    i = j;
  }
  return sade.map((p) => ({ x: p.x, y: p.y }));
}

// Mekânlar arası kapı zinciri (genişlik öncelikli arama): [{ mekan, cikis }]
function kapiZinciri(bas, hedef) {
  if (bas === hedef) return [];
  const kuyruk = [[bas, []]];
  const gorulen = { [bas]: true };
  while (kuyruk.length) {
    const [m, yol] = kuyruk.shift();
    for (const c of MEKANLAR[m].cikislar) {
      if (gorulen[c.hedef]) continue;
      const yeni = [...yol, { mekan: m, cikis: c }];
      if (c.hedef === hedef) return yeni;
      gorulen[c.hedef] = true;
      kuyruk.push([c.hedef, yeni]);
    }
  }
  return null;
}

function bacak(engel, mekan, a, b) {
  if (mekan === 'dis') {
    const y = sokakYolu(engel, a, b);
    return y ? y.map((p) => ({ tur: 'yuru', mekan, x: p.x, y: p.y })) : null;
  }
  return [{ tur: 'yuru', mekan, x: b.x, y: b.y }];
}

// Rota: { adimlar: [{ tur: 'yuru', mekan, x, y } | { tur: 'kapi', mekan, cikisId }], kilitli?: metin } ya da { hata }
// hedef: { mekan, x, y }
export function rotaKur(d, engel, hedef) {
  const zincir = kapiZinciri(d.mekan, hedef.mekan);
  if (!zincir) return { hata: 'Oraya yol yok.' };
  const adimlar = [];
  let konum = { x: d.oyuncu.x, y: d.oyuncu.y };
  for (const h of zincir) {
    const b = bacak(engel, h.mekan, konum, h.cikis);
    if (!b) return { hata: 'Oraya yol bulunamadı.' };
    adimlar.push(...b);
    if (h.cikis.acik && !h.cikis.acik(d)) return { adimlar, kilitli: h.cikis.kilitli || 'Kapı kilitli.' };
    adimlar.push({ tur: 'kapi', mekan: h.mekan, cikisId: h.cikis.id });
    konum = { x: h.cikis.varis.x, y: h.cikis.varis.y };
  }
  const son = bacak(engel, hedef.mekan, konum, hedef);
  if (!son) return { hata: 'Oraya yol bulunamadı.' };
  adimlar.push(...son);
  return { adimlar };
}
