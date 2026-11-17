// Beşinci bölüm: üç ekip birleşimi, her birinin kendi delil yolu; fırtına sonuçları.
import { expect, test } from 'bun:test';
import { BOLUM4 } from '../src/hikaye/bolum4';
import { BOLUM5 as B } from '../src/hikaye/bolum5';
import * as M from '../src/oyun/motor';

function sahneGec(d, parca) {
  expect(d.gorunum.tur).toBe('sahne');
  const s = M.sahneBilgisi(B, d);
  const sec = parca ? s.secenekler.find((x) => x.etiket.includes(parca)) : s.secenekler[0];
  if (!sec) throw new Error('sahne ' + d.gorunum.id + ': seçenek yok: ' + parca + ' / var: ' + s.secenekler.map((x) => x.etiket).join(' | '));
  return M.sahneSec(B, d, sec).durum;
}
function konus(d, kisi, parcalar) {
  expect(M.mekanBilgisi(B, d).kisiler).toContain(kisi);
  d = M.konusmaBaslat(B, d, kisi);
  for (const p of parcalar) {
    expect(d.gorunum.tur).toBe('konusma');
    const b = M.dugumBilgisi(B, d);
    const sec = b.secenekler.find((x) => x.etiket.includes(p));
    if (!sec) throw new Error(kisi + ': seçenek yok: ' + p + ' / var: ' + b.secenekler.map((x) => x.etiket).join(' | '));
    d = M.secenekSec(B, d, sec).durum;
  }
  return d;
}
const incele = (d, id) => M.incele(B, d, id).durum;
const git = (d, hedef) => {
  expect(M.mekanBilgisi(B, d).gecisler.map((g) => g.hedef)).toContain(hedef);
  return M.mekanaGir(B, d, hedef);
};
const baglan = (d, a, b) => {
  const r = M.baglan(B, d, a, b);
  if (!r.basarili) throw new Error(a + ' + ' + b + ': ' + r.metin);
  return r.durum;
};

function dorduncuBolumSonu(ek) {
  return {
    ...M.yeniDurum(BOLUM4),
    gorunum: { tur: 'sahne', id: 'son' },
    deliller: ['belge', 'kanatli_anahtar', 'fotograf', 'ince_yara', 'halim_itiraf'],
    cikarimlar: ['orgut', 'katil_delorme', 'saat_on'],
    bayraklar: { bolumBitti: true, cemilEkipte: true, nerminEkipte: true, rizaEkipte: true, ...ek },
  };
}

const senaryolar = [
  { ad: 'Cemil + Nermin, Morin', ek: {}, ekip: 'Cemil Bey ve Nermin', yol: 'cemil', firtina: 'Morin', sonuc: 'tutuklu' },
  { ad: 'Cemil + Rıza, yaralı kol, atıl', ek: { yaraKol: true }, ekip: 'Cemil Bey ve Rıza', yol: 'riza', firtina: 'üstüne atıl', sonuc: 'deniz' },
  { ad: 'Nermin + Rıza, sağlam kol, atıl', ek: {}, ekip: 'Nermin ve Rıza', yol: 'nermin', firtina: 'üstüne atıl', sonuc: 'zehir' },
  { ad: 'Nermin + Rıza, konuş, şişe yolu', ek: { fotografVerildi: true }, ekip: 'Nermin ve Rıza', yol: 'sise', firtina: 'Konuş', sonuc: 'deniz' },
];

for (const s of senaryolar) {
  test('beşinci bölüm: ' + s.ad, () => {
    const s4 = dorduncuBolumSonu(s.ek);
    expect(M.sahneBilgisi(BOLUM4, s4).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum5');
    let d = M.bolumeGec(B, s4);
    d = sahneGec(d, s.ekip);
    expect(M.delilVar(d, 'telgraf')).toBe(true);
    d = sahneGec(d);
    expect(d.mekan).toBe('kamara');
    expect(M.mekanBilgisi(B, d).kisiler.length).toBe(2);
    d = git(d, 'salon');
    if (s.firtina === 'Morin') d = konus(d, 'morin', ['selam']);
    d = incele(d, 'garnier_masa');
    expect(d.gorunum.tur).toBe('mekan');
    d = konus(d, 'brenner', ['düşmanım']);
    expect(d.gorunum).toEqual({ tur: 'sahne', id: 'cigilik' });
    d = sahneGec(d);
    expect(d.mekan).toBe('koridor');
    d = incele(d, 'ceket');
    expect(d.gorunum.id).toBe('mektup');
    d = sahneGec(d, 'buharıyla');
    d = sahneGec(d, 'Nefesini');
    expect(M.bayrak(d, 'muhurSaglam')).toBe(true);
    let ikinci;
    if (s.yol === 'cemil') {
      d = incele(d, 'fincan');
      ikinci = 'zehir';
    } else if (s.yol === 'nermin') {
      d = incele(d, 'not_defteri');
      ikinci = 'brenner_notu';
    } else if (s.yol === 'riza') {
      d = konus(d, 'lefteris', ['Rıza Bey', 'Söylemeyeceğiz']);
      ikinci = 'kamarot_ifadesi';
    } else {
      d = incele(d, 'kamara9');
      expect(M.delilVar(d, 'bos_sise')).toBe(false);
      d = git(d, 'salon');
      d = incele(d, 'garnier_kaptan');
      d = git(d, 'koridor');
      d = incele(d, 'kamara9');
      ikinci = 'bos_sise';
    }
    expect(M.delilVar(d, ikinci)).toBe(true);
    if (s.firtina === 'Morin') d = konus(d, 'morin', ['Kanatlı anahtarı']);
    d = baglan(d, 'kol_dugmesi', ikinci);
    d = baglan(d, 'talimat_metni', 'telgraf');
    expect(d.gorunum).toEqual({ tur: 'sahne', id: 'firtina' });
    expect(d.mekan).toBe('guverte');
    d = sahneGec(d, s.firtina);
    expect(M.bayrak(d, 'garnierSonuc')).toBe(s.sonuc);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('varis');
    const v = M.sahneBilgisi(B, d).paragraflar.join(' ');
    expect(v).toContain('Beyaz Kule');
    expect(v).toContain('mührü sağlam');
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
  });
}

test('çevirmen yoksa Morin konuşmaz; Saltiel çevirmen olunca konuşur', () => {
  let d = { ...M.yeniDurum(B), gorunum: { tur: 'mekan' }, mekan: 'koridor', deliller: ['telgraf'], bayraklar: { ekip_cemil: true, ekip_riza: true, olay_olum: true } };
  let b = M.dugumBilgisi(B, M.konusmaBaslat(B, d, 'morin'));
  expect(b.secenekler.map((x) => x.etiket).join(' ')).not.toContain('Kanatlı');
  d = M.mekanaGir(B, d, 'salon');
  d = konus(d, 'saltiel', ['Fransız yüzbaşıyla', 'Afiyet']);
  d = M.mekanaGir(B, d, 'koridor');
  d = konus(d, 'morin', ['Kanatlı anahtarı']);
  expect(M.bayrak(d, 'morinGuven')).toBe(true);
});
