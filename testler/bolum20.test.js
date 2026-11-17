// Yirminci bölüm: Ankara, sahte vesikalar, cephane treni, görev dağıtımı.
import { expect, test } from 'bun:test';
import { BOLUM19 } from '../src/hikaye/bolum19';
import { BOLUM20 as B, dogruAtama } from '../src/hikaye/bolum20';
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
const incele = (d, id) => {
  expect(M.mekanBilgisi(B, d).nesneler.map((o) => o.id)).toContain(id);
  return M.incele(B, d, id).durum;
};
const git = (d, hedef) => {
  expect(M.mekanBilgisi(B, d).gecisler.map((g) => g.hedef)).toContain(hedef);
  return M.mekanaGir(B, d, hedef);
};
const baglan = (d, a, b) => {
  const r = M.baglan(B, d, a, b);
  if (!r.basarili) throw new Error(a + ' + ' + b + ': ' + r.metin);
  return r.durum;
};

function onDokuzuncuBolumSonu(ek) {
  return {
    ...M.yeniDurum(BOLUM19),
    gorunum: { tur: 'sahne', id: 'son' },
    deliller: ['belge'],
    cikarimlar: ['orgut'],
    bayraklar: { bolumBitti: true, ...ek },
  };
}

const senaryolar = [
  { ad: 'doğru yerleşim, Tevfik teslim', ek: { tevfikKarar: 'teslim' }, han: 'Rıza', ist: 'Nermin', dogru: 2, nuri: 'yakalandi', tren: 'tam', cemil: false },
  { ad: 'yanlış yerleşim, Cemil gider, çift taraflı', ek: { tevfikKarar: 'cift' }, han: 'Neslihan', ist: 'Cemil', dogru: 0, nuri: 'kacti', tren: 'hasarli', cemil: true },
  { ad: 'yarı doğru', ek: { tevfikKarar: 'cift' }, han: 'Rıza', ist: 'Neslihan', dogru: 1, nuri: 'yakalandi', tren: 'hasarli', cemil: false },
];

for (const s of senaryolar) {
  test('yirminci bölüm: ' + s.ad, () => {
    const s19 = onDokuzuncuBolumSonu(s.ek);
    expect(M.sahneBilgisi(BOLUM19, s19).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum20');
    let d = M.bolumeGec(B, s19);
    expect(d.gorunum.id).toBe('acilis');
    expect(M.sahneBilgisi(B, d).paragraflar.join(' ').includes('Tuzla')).toBe(s.ek.tevfikKarar === 'cift');
    d = sahneGec(d);
    expect(d.mekan).toBe('tashan');
    expect(M.mekanBilgisi(B, d).kisiler.includes('tevfik20')).toBe(s.ek.tevfikKarar === 'teslim');

    d = konus(d, 'nermin', ['Kim sipariş']);
    expect(M.delilVar(d, 'mavi_kagit')).toBe(true);
    d = incele(d, 'harf_kasasi');

    d = git(d, 'han20');
    expect(M.mekanBilgisi(B, d).nesneler.map((o) => o.id)).not.toContain('nuri_odasi');
    d = konus(d, 'katip20', ['Nuri Bey']);
    d = incele(d, 'nuri_odasi');
    expect(M.delilVar(d, 'pendle_ceki')).toBe(true);
    d = git(d, 'tashan');
    d = git(d, 'polatli');
    d = konus(d, 'cemil', ['Elimizden']);
    d = git(d, 'tashan');
    d = git(d, 'istasyon');
    d = incele(d, 'sef_defteri');

    d = baglan(d, 'mavi_kagit', 'nuri_izi');
    expect(d.gorunum.tur).toBe('mekan');
    d = baglan(d, 'sevk_listesi', 'pendle_ceki');
    expect(d.gorunum.id).toBe('plan20');
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('atama_han');
    expect(M.sahneBilgisi(B, d).secenekler.length).toBe(4);
    d = sahneGec(d, s.han);
    expect(d.gorunum.id).toBe('atama_istasyon');
    expect(M.sahneBilgisi(B, d).secenekler.length).toBe(3);
    expect(M.sahneBilgisi(B, d).secenekler.map((x) => x.etiket)).not.toContain(s.han === 'Rıza' ? 'Rıza Bey' : s.han);
    d = sahneGec(d, s.ist);
    expect(d.gorunum.id).toBe('gece20');
    expect(dogruAtama(d)).toBe(s.dogru);
    d = sahneGec(d);
    expect(M.bayrak(d, 'nuriSonu')).toBe(s.nuri);
    expect(M.bayrak(d, 'trenSonu')).toBe(s.tren);
    expect(M.bayrak(d, 'cemilYalniz')).toBe(s.cemil);
    expect(d.gorunum.id).toBe('nuri20');
    expect(M.sahneBilgisi(B, d).paragraflar.join(' ')).toContain('Arethusa');
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('polatli_son');
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
  });
}
