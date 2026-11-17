// On üçüncü bölüm: Rainer'le söz satrancı (avantaj), hisselerin kaderi ve Whitlock'un sonu.
import { expect, test } from 'bun:test';
import { BOLUM12 } from '../src/hikaye/bolum12';
import { BOLUM13 as B } from '../src/hikaye/bolum13';
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

function onIkinciBolumSonu(ek, deliller = []) {
  return {
    ...M.yeniDurum(BOLUM12),
    gorunum: { tur: 'sahne', id: 'son' },
    deliller: ['belge', 'rainer_bilgi', 'kamil_raporu', ...deliller],
    cikarimlar: ['orgut', 'katil_nazim', 'altin'],
    bayraklar: { bolumBitti: true, rainerGeliyor: true, ekip_cemil: true, ekip_nermin: true, ekip_riza: true, ...ek },
  };
}

const senaryolar = [
  { ad: 'kusursuz oyun, genel kurul, Whitlock kaçar', ek: { sahteMuhur: true, defterKarar: 'sakla', altinKarar: 'ingiliz' }, deliller: ['nazim_itirafi'], hamleler: ['itirafını', 'astarında', 'Koltuğunuz'], sonuc: 'terk', hisse: 'genel kurul', whitlock: 'kacti' },
  { ad: 'kalıp + gazete + ret, sat, Whitlock ölür', ek: { sahteMuhur: true, defterKarar: 'gazete', altinKarar: 'gazete' }, deliller: [], hamleler: ['kalıbı', 'gazetelerde', 'imzalamayacak'], sonuc: 'berabere', hisse: 'sat', whitlock: 'oldu' },
  { ad: 'susup savunmak, bağış', ek: { defterKarar: 'fransiz' }, deliller: [], hamleler: ['Bir şey söyleme', 'savun', 'Koltuğunuz'], sonuc: 'berabere', hisse: 'vakfa', whitlock: 'oldu' },
];

for (const s of senaryolar) {
  test('on üçüncü bölüm: ' + s.ad, () => {
    const s12 = onIkinciBolumSonu(s.ek, s.deliller);
    expect(M.sahneBilgisi(BOLUM12, s12).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum13');
    let d = M.bolumeGec(B, s12);
    d = sahneGec(d);
    expect(d.mekan).toBe('han');
    expect(M.delilVar(d, 'davetiye')).toBe(true);
    d = konus(d, 'neslihan', ['Viyana', 'Dinlen']);
    expect(M.delilVar(d, 'imza_ani')).toBe(true);
    d = git(d, 'telgrafhane');
    d = incele(d, 'telgraf13');
    expect(d.gorunum.id).toBe('telgraf_bekle');
    d = sahneGec(d);
    expect(M.delilVar(d, 'vasiyet')).toBe(true);
    d = git(d, 'han');
    d = git(d, 'palas');
    d = konus(d, 'whitlock', ['neden']);
    expect(M.delilVar(d, 'whitlock_korku')).toBe(true);
    d = baglan(d, 'vasiyet', 'imza_ani');
    d = baglan(d, 'whitlock_korku', 'rainer_bilgi');
    expect(d.gorunum).toEqual({ tur: 'sahne', id: 'satranc1' });
    for (const h of s.hamleler) d = sahneGec(d, h);
    expect(d.gorunum.id).toBe('satranc_son');
    d = sahneGec(d);
    expect(M.bayrak(d, 'satrancSonu')).toBe(s.sonuc);
    expect(d.gorunum.id).toBe('hisse_karari');
    d = sahneGec(d, s.hisse);
    expect(d.gorunum.id).toBe('whitlock13');
    d = sahneGec(d);
    expect(M.bayrak(d, 'whitlockSonu')).toBe(s.whitlock);
    expect(M.delilVar(d, 'zurih')).toBe(s.whitlock === 'kacti');
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
  });
}
