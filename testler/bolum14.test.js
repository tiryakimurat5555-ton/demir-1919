// On dördüncü bölüm: Zürih. Rivière'in sandığı, parola bulmacası, kasa 1908 ve defterin üç yolu.
import { expect, test } from 'bun:test';
import { BOLUM13 } from '../src/hikaye/bolum13';
import { BOLUM14 as B } from '../src/hikaye/bolum14';
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

function onUcuncuBolumSonu(ek) {
  return {
    ...M.yeniDurum(BOLUM13),
    gorunum: { tur: 'sahne', id: 'son' },
    deliller: ['belge', 'rainer_bilgi', 'davetiye', 'vasiyet', 'imza_ani'],
    cikarimlar: ['orgut', 'miras', 'sallanan_koltuk'],
    bayraklar: { bolumBitti: true, ekip_cemil: true, ekip_nermin: true, ekip_riza: true, ...ek },
  };
}

const senaryolar = [
  { ad: 'Klara ile tanış, doğru parola, defter Klara\'ya', ek: { hisseKarar: 'genelkurul', whitlockSonu: 'kacti' }, klara: true, parolalar: ['Que sais-je'], gol: 'Klara', gecikme: false },
  { ad: 'Klarasız iki yanlış, müdür, gecikme, Viyana', ek: { hisseKarar: 'sat', whitlockSonu: 'oldu' }, klara: false, parolalar: ['Montaigne', 'Neslihan', 'müdürü'], gol: 'Viyana', gecikme: true },
  { ad: 'Klara ile iki yanlış, müdür, kopya', ek: { hisseKarar: 'bagis' }, klara: true, parolalar: ['Montaigne', 'On iki', 'müdürü'], gol: 'fotoğraflasın', gecikme: false },
];

for (const s of senaryolar) {
  test('on dördüncü bölüm: ' + s.ad, () => {
    const s13 = onUcuncuBolumSonu(s.ek);
    expect(M.sahneBilgisi(BOLUM13, s13).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum14');
    let d = M.bolumeGec(B, s13);
    d = sahneGec(d);
    expect(d.mekan).toBe('otel');
    expect(M.bayrak(d, 'ekip_riza')).toBe(false);
    expect(M.mekanBilgisi(B, d).nesneler.map((n) => n.id)).not.toContain('denemeler');
    d = incele(d, 'riviere_sandigi');
    expect(M.delilVar(d, 'kucuk_anahtar')).toBe(true);
    expect(M.delilVar(d, 'ajanda')).toBe(true);
    d = incele(d, 'denemeler');
    expect(M.delilVar(d, 'exlibris')).toBe(true);
    d = git(d, 'sehir');
    expect(M.mekanBilgisi(B, d).gecisler.map((g) => g.hedef)).not.toContain('banka');
    d = baglan(d, 'ajanda', 'davetiye');
    d = git(d, 'banka');
    d = incele(d, 'gise');
    expect(d.gorunum.tur).toBe('mekan');
    if (s.klara) d = konus(d, 'klara', ['neden']);
    d = baglan(d, 'exlibris', 'kucuk_anahtar');
    d = incele(d, 'gise');
    expect(d.gorunum.id).toBe('parola_sahne');
    for (const p of s.parolalar) {
      d = sahneGec(d, p);
      if (d.gorunum.id === 'parola_yanlis') d = sahneGec(d);
    }
    if (d.gorunum.id === 'mudur') d = sahneGec(d);
    expect(d.gorunum.id).toBe('kasa');
    expect(!!M.bayrak(d, 'gecikme14')).toBe(s.gecikme);
    d = sahneGec(d);
    expect(M.delilVar(d, 'kurulus_defteri')).toBe(true);
    expect(d.gorunum.id).toBe('mektup');
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('gol');
    const etiketler = M.sahneBilgisi(B, d).secenekler.map((x) => x.etiket).join(' | ');
    expect(etiketler.includes('Klara')).toBe(s.klara);
    d = sahneGec(d, s.gol);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son_sahne14');
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
  });
}
