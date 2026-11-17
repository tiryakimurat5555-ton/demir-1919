// On beşinci bölüm: Viyana genel kurulu. Oy toplama, üç sonuç ve Rainer'in akıbeti.
import { expect, test } from 'bun:test';
import { BOLUM14 } from '../src/hikaye/bolum14';
import { BOLUM15 as B, oyToplami } from '../src/hikaye/bolum15';
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

function onDorduncuBolumSonu(ek) {
  return {
    ...M.yeniDurum(BOLUM14),
    gorunum: { tur: 'sahne', id: 'son' },
    deliller: ['belge', 'rainer_bilgi', 'kurulus_defteri', 'agir_sandik'],
    cikarimlar: ['orgut', 'kasa_yeri', 'parola'],
    bayraklar: { bolumBitti: true, ekip_cemil: true, ekip_nermin: true, ...ek },
  };
}

const senaryolar = [
  { ad: 'genel kurul, Szalay + Vollmer → devrildi, tutukla', ek: { hisseKarar: 'genelkurul', defter14: 'klara' }, ikna: ['szalay', 'vollmer'], oy: 52, sonuc: 'devrildi', son: 'Müfettiş', rainer: 'tutuklu' },
  { ad: 'sattı, kopya, üçü ikna → iflas, bırak', ek: { hisseKarar: 'sat', defter14: 'kopya' }, foto: true, ikna: ['szalay', 'vollmer', 'pendle'], oy: 26, sonuc: 'iflas', son: 'Kalk ve git', rainer: 'yalniz' },
  { ad: 'bağış, yalnızca Pendle → Rainer kazanır', ek: { hisseKarar: 'bagis', defter14: 'viyana' }, ikna: ['pendle'], oy: 42, sonuc: 'kazandi', son: 'Devam', rainer: 'serbest' },
];

const ACIK = { vollmer: ['Kasa 1908'], szalay: ['Budapeşte'], pendle: ['Columbia'] };

for (const s of senaryolar) {
  test('on beşinci bölüm: ' + s.ad, () => {
    const s14 = onDorduncuBolumSonu(s.ek);
    expect(M.sahneBilgisi(BOLUM14, s14).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum15');
    let d = M.bolumeGec(B, s14);
    d = sahneGec(d);
    expect(d.mekan).toBe('pansiyon');
    d = git(d, 'ring');
    const kurulVar = M.mekanBilgisi(B, d).gecisler.map((g) => g.hedef).includes('bankhaus');
    expect(kurulVar).toBe(!s.foto);
    if (s.foto) {
      d = git(d, 'kahve');
      d = incele(d, 'karanlik_oda');
      expect(M.delilVar(d, 'fotograflar')).toBe(true);
      d = git(d, 'ring');
    }
    d = git(d, 'pansiyon');
    if (s.ikna.includes('szalay')) {
      d = konus(d, 'neslihan', ['Macaristan', 'Hadi']);
      expect(M.delilVar(d, 'budapeste_satiri')).toBe(true);
    }
    d = git(d, 'ring');
    d = git(d, 'imperial');
    for (const k of s.ikna) d = konus(d, k, ACIK[k]);
    expect(oyToplami(d)).toBe(s.oy);
    d = git(d, 'ring');
    d = git(d, 'bankhaus');
    expect(d.gorunum.id).toBe('genel_kurul');
    d = sahneGec(d);
    expect(M.bayrak(d, 'kurulSonu')).toBe(s.sonuc);
    expect(d.gorunum.id).toBe('ring15');
    d = sahneGec(d, s.son);
    expect(M.bayrak(d, 'rainerSonu')).toBe(s.rainer);
    expect(d.gorunum.id).toBe('son15');
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
  });
}
