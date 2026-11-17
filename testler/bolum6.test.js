// Altıncı bölüm: farklı ekipler ve yaklaşımlar; Neslihan'ın güvenine göre son.
import { expect, test } from 'bun:test';
import { BOLUM5 } from '../src/hikaye/bolum5';
import { BOLUM6 as B } from '../src/hikaye/bolum6';
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

function besinciBolumSonu(ek) {
  return {
    ...M.yeniDurum(BOLUM5),
    gorunum: { tur: 'sahne', id: 'son' },
    deliller: ['belge', 'kanatli_anahtar', 'fotograf', 'telgraf', 'talimat_metni', 'kol_dugmesi'],
    cikarimlar: ['orgut', 'talimat'],
    bayraklar: { bolumBitti: true, ...ek },
  };
}

const senaryolar = [
  { ad: 'Cemil+Nermin, kurye, talimat → anahtar', ek: { ekip_cemil: true, ekip_nermin: true, muhurSaglam: true, fransizBag: true }, kim: 'cemil', yak: 'Herr Brenner', adim: [['O mektuptaki']], anahtar: true },
  { ad: 'Cemil+Rıza, hamal, çay içti, ayva → anahtar', ek: { ekip_cemil: true, ekip_riza: true }, kim: 'riza', yak: 'hamalım', adim: [['Fincanı al'], ['Ayva']], anahtar: true },
  { ad: 'Nermin+Rıza, hamal, fincan değişti, ayva → anahtar yok', ek: { ekip_nermin: true, ekip_riza: true, fotografVerildi: true }, kim: 'nermin', yak: 'hamalım', adim: [['değiştir'], ['Ayva']], anahtar: false },
  { ad: 'Nermin+Rıza, abi, Sabri → anahtar', ek: { ekip_nermin: true, ekip_riza: true }, kim: 'riza', yak: 'Abin', adim: [['Sabri']], anahtar: true },
];

for (const s of senaryolar) {
  test('altıncı bölüm: ' + s.ad, () => {
    const s5 = besinciBolumSonu(s.ek);
    expect(M.sahneBilgisi(BOLUM5, s5).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum6');
    let d = M.bolumeGec(B, s5);
    d = sahneGec(d);
    expect(d.mekan).toBe('ev');
    if (s.ek.fransizBag) d = konus(d, 'morin', ['Neslihan', 'Teşekkürler']);
    else d = konus(d, 'saltiel', ['Hotel Olympos', 'Manastırlı', 'Sağ ol']);
    expect(M.delilVar(d, 'riviere_bilgi')).toBe(true);
    const yardim = { cemil: 'Cemil', nermin: 'Nermin', riza: 'Rıza' }[s.kim];
    d = konus(d, s.kim, ['Otelde', 'Sağ ol']);
    d = git(d, 'yanik_sehir');
    expect(M.mekanBilgisi(B, d).kisiler).not.toContain('hafiz');
    d = incele(d, 'barakalar');
    d = konus(d, 'hafiz', [s.ek.fotografVerildi ? 'anlat' : 'göster', 'Anlat', 'Devam']);
    expect(d.gorunum.id).toBe('ani3');
    d = sahneGec(d, 'Nefesini');
    expect(M.delilVar(d, 'hafiz_tanik')).toBe(true);
    d = git(d, 'otel');
    d = konus(d, 'katip', [yardim]);
    expect(M.delilVar(d, 'otel_kaydi')).toBe(true);
    d = baglan(d, 'hafiz_tanik', 'fotograf');
    d = baglan(d, 'otel_kaydi', 'talimat_metni');
    d = baglan(d, 'riviere_bilgi', 'hafiz_tanik');
    expect(d.gorunum).toEqual({ tur: 'sahne', id: 'olympos' });
    d = sahneGec(d, s.yak);
    for (const [p] of s.adim) {
      while (d.gorunum.tur === 'sahne' && !M.sahneBilgisi(B, d).secenekler.some((x) => x.etiket.includes(p))) d = sahneGec(d);
      d = sahneGec(d, p);
    }
    while (d.gorunum.id !== 'gece') d = sahneGec(d);
    expect(M.bayrak(d, 'anahtarAlindi')).toBe(s.anahtar);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
  });
}
