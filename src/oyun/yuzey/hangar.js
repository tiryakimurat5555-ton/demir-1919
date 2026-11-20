// Yüzey Araçları Montaj Hangarı (belgeler/araclar-ve-gemi-filosu.md 1.1 ve 3). Saf JavaScript.
// Hangardan araca binilir ve inilir. Araçlar araç hangarının üretim menüsünden yapılır (veri/uretim.js).
// Binilen aracın etkileri dunya.js aracCarpani'nda (hız, zehir, radar); Mammoth derin damarları kazar;
// Demir Kervan ve Akrep sahip olununca koloniye kendiliğinden malzeme getirir (koloni.js).
import { ARACLAR, ARAC_SIRASI } from '../veri/gemiler';

export function noktaMi(id) {
  return id === 'hangar';
}

export function aracListesi(d) {
  return ARAC_SIRASI.filter((id) => (d.araclar || []).includes(id));
}

export function noktaEylemleri(d) {
  if (!d.koloni.binalar.includes('arac_hangari')) return [{ id: 'incele', etiket: 'Hangarı incele' }];
  const e = [];
  if (d.arac) e.push({ id: 'in', etiket: ARACLAR[d.arac].ad + '\'dan in' });
  for (const id of aracListesi(d)) {
    if (ARACLAR[id].otonom || id === d.arac) continue;
    e.push({ id: 'bin_' + id, etiket: ARACLAR[id].ad + '\'ya bin', ipucu: ARACLAR[id].tarif });
  }
  e.push({ id: 'incele', etiket: 'Hangarı incele' });
  return e;
}

export function aracaBin(d, id) {
  const a = ARACLAR[id];
  if (!a || !(d.araclar || []).includes(id)) return { metin: 'Böyle bir aracın yok.', ses: 'red' };
  if (a.otonom) return { metin: a.ad + ' binilmez; kendi başına çalışır.', ses: 'red' };
  if (!MEKAN_DIS(d)) return { metin: 'Araca dışarıda binilir.', ses: 'red' };
  d.arac = id;
  return { metin: a.ad + ', ' + a.tip + '. ' + a.ses + ' ' + a.tarif, ses: 'kapi' };
}
export function aractanIn(d) {
  if (!d.arac) return { metin: 'Bir araçta değilsin.' };
  const a = ARACLAR[d.arac];
  d.arac = null;
  return { metin: a.ad + '\'dan indin.', ses: 'tislama' };
}
const MEKAN_DIS = (d) => d.mekan !== 'kapsul' && d.mekan !== 'kseno_lab' && d.mekan !== 'mabet';

export function eylemUygula(d, id, eylemId) {
  if (eylemId === 'in') return aractanIn(d);
  if (eylemId.indexOf('bin_') === 0) return aracaBin(d, eylemId.slice(4));
  if (!d.koloni.binalar.includes('arac_hangari')) return { metin: 'Kapsülün batısında, iskeleti kurulmuş boş bir hangar alanı. Terminalden Yüzey Araçları Montaj Hangarı kurulunca dolacak.' };
  const v = aracListesi(d);
  return { metin: v.length ? 'Hangarda: ' + v.map((x) => ARACLAR[x].ad).join(', ') + '.' : 'Hangar boş. Araçlar terminalden, üretim menüsünden yapılır.' };
}
