// Otuz yedinci bölüm: İstanbul, Kasım 1925. Babanın kapısı ve Yakup'un taşı.
import { expect, test } from 'bun:test';
import { BOLUM36 } from '../src/hikaye/bolum36';
import { BOLUM37 as B } from '../src/hikaye/bolum37';
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
    ad: 'önce baba (yanında), sonra Rıza (dua); red',
    ek: { babaSayfa: 'yayimla', nerminKorku: 'istanbul', vollmerIhale: 'red', rizaKorku: 'fark', rizaBaba: 'sor', rizaHikaye: true, mezarSozu: true, kayikhaneVaris: 'hepimiz' },
    once: 'baba', baba: 'yanında dur', riza: 'duasını',
    beklenen: { babaYuz: 'yaninda', rizaMezar: 'dua', klaraTelgraf: true },
    metin: ['iki kadının bürosu', 'senin seçtiğin bir satır', 'Zürih\'te görüşürüz', 'Sen istemişsin', 'Hüseyin Efendi', 'Bunu sen sakla', 'Fikri değilsin', 'Olmadım', 'Kasımpaşa ağzıyla', 'kuru gül', 'Her sabah bakacakmış', 'DEFTERİN SONUNU', 'Ama ben giderim', 'Sayılır', 'Nereye gömüldüğünü hiç sormadım'],
  },
  {
    ad: 'önce Rıza (taş), sonra baba (savun); kabul',
    ek: { babaSayfa: 'korundu', vollmerIhale: 'kabul', rizaKorku: 'yanında' },
    once: 'riza', baba: 'Araya gir', riza: 'Taşa bir ad',
    beklenen: { babaYuz: 'savun', rizaMezar: 'tas' },
    metin: ['Zürih damgalı', 'imtiyazı aldı', 'Yapmamalıydın', 'Sormamak da bir döküm', 'Koltuktan önce bir taş', 'Suçsuzdu', 'Süleyman yazdırmıştı', 'korunmak istemedi', 'YENİ KREDİ'],
  },
  {
    ad: 'yalnız bırak, sus',
    ek: { babaSayfa: 'coktan' },
    once: 'baba', baba: 'yalnız bırak', riza: 'Bir şey söyleme',
    beklenen: { babaYuz: 'yalniz', rizaMezar: 'sus' },
    metin: ['Manastır\'dan', 'Manastır türküsü', 'bastonsuz', 'Annem de söylerdi'],
  },
];

for (const s of senaryolar) {
  test('otuz yedinci bölüm: ' + s.ad, () => {
    const s36 = { ...M.yeniDurum(BOLUM36), gorunum: { tur: 'sahne', id: 'son' }, deliller: ['belge'], cikarimlar: ['orgut'], bayraklar: { bolumBitti: true, ...s.ek } };
    expect(M.sahneBilgisi(BOLUM36, s36).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum37');
    let d = M.bolumeGec(B, s36);
    const metinler = [];
    const topla = () => metinler.push([].concat(M.sahneBilgisi(B, d).paragraflar).join(' '));
    const soz = (k) => metinler.push([].concat(M.dugumBilgisi(B, M.konusmaBaslat(B, d, k)).soz).join(' '));
    topla();
    d = sahneGec(d);
    expect(d.mekan).toBe('kayikhane37');
    soz('riza37k'); soz('gulce37');
    const baba = () => {
      d = git(d, 'han37');
      d = incele(d, 'oda37');
      topla();
      d = sahneGec(d, s.baba);
      topla();
      d = sahneGec(d);
    };
    const riza = () => {
      d = git(d, 'arsiv37');
      expect(M.mekanBilgisi(B, d).gecisler.map((g) => g.hedef)).not.toContain('gureba37');
      d = incele(d, 'defter37');
      d = git(d, 'gureba37');
      d = incele(d, 'mezar37');
      topla();
      d = sahneGec(d, s.riza);
      topla();
      d = sahneGec(d);
    };
    if (s.once === 'baba') { baba(); expect(d.gorunum.tur).toBe('mekan'); riza(); } else { riza(); expect(d.gorunum.tur).toBe('mekan'); baba(); }
    expect(d.gorunum.id).toBe('aksam37');
    topla();
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    for (const [k, v] of Object.entries(s.beklenen)) expect(M.bayrak(d, k)).toBe(v);
    const hepsi = metinler.join(' ');
    for (const m of s.metin) expect(hepsi).toContain(m);
  });
}

test('otuz yedinci bölümde boş paragraf yok', () => {
  for (const id of Object.keys(B.sahneler)) {
    const d = { ...M.yeniDurum(B), gorunum: { tur: 'sahne', id } };
    expect(M.sahneBilgisi(B, d).paragraflar.every((p) => typeof p === 'string' && p.length > 0)).toBe(true);
  }
});
