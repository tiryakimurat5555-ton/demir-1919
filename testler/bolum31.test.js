// Otuz birinci bölüm: İskenderiye, Temmuz 1924. Rahel ve ninni.
import { expect, test } from 'bun:test';
import { BOLUM30 } from '../src/hikaye/bolum30';
import { BOLUM31 as B } from '../src/hikaye/bolum31';
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
    ad: 'Eleni ile Ankara, Neslihan cevap verir, birlikte',
    ek: { kurulSonu30: 'ad', neslihanTanik: 'evet', cemilRapor: 'dogru', cemilTanik: true, melekKarar: 'anne', neslihanTavsiye: 'ben' },
    eleni: 'Ankara\'ya gelsin', cevap: 'Neslihan cevap', karar: 'birlikte',
    beklenen: { cemilEleni: 'birlikte', rahelCevap: 'neslihan', rahelKarar: 'birlikte' },
    metin: ['okumuş', 'elini sıktı', 'Doğruyu yazmışsın', 'Cenevre\'deki yazını', 'Bir mevsim', 'Adını da okudum', 'Burada da duracak mısın', 'Dandini', 'Ambarda sen bana öğrettin', 'Biri buldu', 'kimse sana kapıda dur'],
  },
  {
    ad: 'Eleni ile mektup, Arif araya girer, Rahel yönetir',
    ek: { kurulSonu30: 'genel', cemilRapor: 'sitma', cocukKarar: 'yanina' },
    eleni: 'Bırak Cemil Bey', cevap: 'Araya gir', karar: 'Rahel yönetsin',
    beklenen: { cemilEleni: 'mektup', rahelCevap: 'arif', rahelKarar: 'rahel' },
    metin: ['hiçbir şey okumamış', 'Herkes bir kere yazar', 'Her ay', 'Sen de neredeydin', 'Zehra', 'Önce Beyrut'],
  },
  {
    ad: 'veda, ayrı yollar',
    ek: { cemilRapor: 'kendi' },
    eleni: 'avluda bırak', cevap: 'Neslihan cevap', karar: 'onun kalsın',
    beklenen: { cemilEleni: 'veda', rahelKarar: 'ayri' },
    metin: ['korkakça', 'Bazı insanlar birbirine yetişemez', 'Kendi yolum var'],
  },
];

for (const s of senaryolar) {
  test('otuz birinci bölüm: ' + s.ad, () => {
    const s30 = { ...M.yeniDurum(BOLUM30), gorunum: { tur: 'sahne', id: 'son' }, deliller: ['belge', 'zarf', 'alt_yari', 'makbuz_defteri'], cikarimlar: ['orgut'], bayraklar: { bolumBitti: true, ...s.ek } };
    expect(M.sahneBilgisi(BOLUM30, s30).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum31');
    let d = M.bolumeGec(B, s30);
    const metinler = [];
    const topla = (t) => metinler.push([].concat(t).join(' '));
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d);
    expect(d.mekan).toBe('liman31');
    d = git(d, 'attarin31');
    d = incele(d, 'ev31');
    d = konus(d, 'tutuncu', ['Bir kızı']);
    d = { ...d, gorunum: { tur: 'mekan' } };
    d = baglan(d, 'makbuz_defteri', 'komsu_ifadesi');
    expect(d.gorunum.tur).toBe('mekan');
    d = git(d, 'liman31');
    d = git(d, 'hastane31');
    d = incele(d, 'merdiven31');
    expect(d.gorunum.id).toBe('eleni31');
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d, s.eleni);
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('rahel31');
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d, s.cevap);
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d, s.karar);
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
    for (const [k, v] of Object.entries(s.beklenen)) expect(M.bayrak(d, k)).toBe(v);
    const hepsi = metinler.join(' ');
    for (const m of s.metin) expect(hepsi).toContain(m);
  });
}

test('otuz birinci bölümde boş paragraf yok', () => {
  for (const id of Object.keys(B.sahneler)) {
    const d = { ...M.yeniDurum(B), gorunum: { tur: 'sahne', id } };
    expect(M.sahneBilgisi(B, d).paragraflar.every((p) => typeof p === 'string' && p.length > 0)).toBe(true);
  }
});
