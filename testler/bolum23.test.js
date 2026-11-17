// Yirmi üçüncü bölüm: sofra (üç konuşma), Vollmer'in feragatnamesi.
import { expect, test } from 'bun:test';
import { BOLUM22 } from '../src/hikaye/bolum22';
import { BOLUM23 as B, SOFRA_HAKKI } from '../src/hikaye/bolum23';
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

const senaryolar = [
  {
    ad: 'babayla ve Nermin\'le konuş → itiraf; Kemal kalır',
    ek: { kemalSonu: 'yolcu', neslihanAd: 'baba', cocukKarar: 'yanina', rizaSon22: 'devir', gulceGuven: 2, tevfikKarar: 'teslim', gulceTevfik: 'yaz', travma: 2 },
    konusmalar: [['baba23', 'tehdit'], ['nermin23', 'basabilir'], ['kemal23', 'Kalacak']],
    secim: 'kendi hikâyesini', vollmer: 'itiraf', metin: 'Kalıbı ben döktüm', kemalKalir: true, travma: 2,
  },
  {
    ad: 'Gülce yakın → damga',
    ek: { kemalSonu: 'tereddut', neslihanAd: 'iki', cocukKarar: 'aile', rizaSon22: 'emekli', gulceyeAnlatti: true, tevfikKarar: 'cift', gulceTevfik: 'affetme', travma: 1 },
    konusmalar: [['gulce23', 'gümrükçü'], ['baba23', 'ilk kalayı'], ['riza23', 'Galata']],
    secim: 'Gülce\'ye bak', vollmer: 'damga', metin: 'Kayıt numarası yanlış', kemalKalir: undefined, travma: 0,
  },
  {
    ad: 'Kemal ve Rıza → kurye',
    ek: { kemalSonu: 'yolcu', rizaSon22: 'kal', defter14: 'kopya' },
    konusmalar: [['kemal23', 'taşırdı'], ['riza23', 'Galata'], ['neslihan23', 'yanındayım']],
    secim: 'kuryeniz', vollmer: 'kurye', metin: 'Delille', kemalKalir: undefined, travma: 0,
  },
  {
    ad: 'kimseden yardım yok → imza',
    ek: { rizaSon22: 'kirgin', gulceGuven: 0, defter14: 'kopya' },
    konusmalar: [['gulce23', 'gümrükçü'], ['nermin23', 'Cevdet'], ['neslihan23', 'Rivière']],
    secim: 'İmzala Neslihan', vollmer: 'imza', metin: 'Kessler', kemalKalir: undefined, travma: 1,
  },
];

for (const s of senaryolar) {
  test('yirmi üçüncü bölüm: ' + s.ad, () => {
    const s22 = { ...M.yeniDurum(BOLUM22), gorunum: { tur: 'sahne', id: 'son' }, deliller: ['belge'], cikarimlar: ['orgut'], bayraklar: { bolumBitti: true, ...s.ek } };
    expect(M.sahneBilgisi(BOLUM22, s22).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum23');
    let d = M.bolumeGec(B, s22);
    d = sahneGec(d);
    expect(d.mekan).toBe('sofra23');
    expect(M.delilVar(d, 'feragatname')).toBe(true);
    const kisiler = M.mekanBilgisi(B, d).kisiler;
    expect(kisiler.includes('kemal23')).toBe(s.ek.kemalSonu === 'yolcu');
    expect(kisiler.includes('riza23')).toBe(s.ek.rizaSon22 !== 'kirgin');
    for (let i = 0; i < SOFRA_HAKKI; i++) {
      const [kim, parca] = s.konusmalar[i];
      d = konus(d, kim, [parca]);
      if (i < SOFRA_HAKKI - 1) {
        expect(d.gorunum.tur).toBe('mekan');
        expect(M.mekanBilgisi(B, d).kisiler).not.toContain(kim);
      }
    }
    expect(d.gorunum.id).toBe('gece23');
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('vollmer23');
    d = sahneGec(d, s.secim);
    expect(M.bayrak(d, 'vollmerSonu')).toBe(s.vollmer);
    let metin = M.sahneBilgisi(B, d).paragraflar.join(' ');
    d = sahneGec(d);
    metin += M.sahneBilgisi(B, d).paragraflar.join(' ');
    expect(metin).toContain(s.metin);
    expect(M.bayrak(d, 'kemalKalir')).toBe(s.kemalKalir);
    expect(M.sayi(d, 'travma')).toBe(s.travma);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
  });
}
