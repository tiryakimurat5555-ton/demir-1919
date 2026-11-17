// Dokuzuncu bölüm: tütün takası, üç giriş yolu, teklif (sahte / red) ve defter kararı.
import { expect, test } from 'bun:test';
import { BOLUM8 } from '../src/hikaye/bolum8';
import { BOLUM9 as B } from '../src/hikaye/bolum9';
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
const sahneBitir = (d) => {
  while (d.gorunum.tur === 'sahne') d = sahneGec(d);
  return d;
};

function sekizinciBolumSonu(ek) {
  return {
    ...M.yeniDurum(BOLUM8),
    gorunum: { tur: 'sahne', id: 'son' },
    deliller: ['belge', 'defter_yarisi', 'riviere_mektubu', 'siyakat_okundu', 'viyana_ipucu', 'kalay_takimi'],
    cikarimlar: ['orgut', 'isimler', 'yargisiz', 'ilacli'],
    bayraklar: { bolumBitti: true, neslihanSecim: 'geldi', neslihanBag: 2, babaTanidi: true, ...ek },
  };
}

function baslat(ek) {
  const s8 = sekizinciBolumSonu(ek);
  expect(M.sahneBilgisi(BOLUM8, s8).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum9');
  let d = M.bolumeGec(B, s8);
  expect(d.gorunum).toEqual({ tur: 'sahne', id: 'acilis' });
  d = sahneGec(d);
  expect(d.mekan).toBe('pansiyon');
  expect(M.sayi(d, 'tutun')).toBe(2);
  return d;
}

const senaryolar = [
  { ad: 'Cemil+Rıza, askere tütün, garson, sahte defter, gazete', ek: { ekip_cemil: true, ekip_riza: true }, asker: true, mutfak: true, sahte: true, yol: 'Garson', teklif: 'sahte', karar: 'Kessler', tutunSon: 0 },
  { ad: 'Cemil+Nermin, asansör, red, Fransızlar', ek: { ekip_cemil: true, ekip_nermin: true, fransizBag: true }, mutfak: true, yol: 'asansör', teklif: 'Reddet', karar: 'Fransız', tutunSon: 2 },
  { ad: 'Nermin+Rıza, Neslihan içeri, red, sakla', ek: { ekip_nermin: true, ekip_riza: true, yaraKol: true }, yol: 'Madam N.', teklif: 'Reddet', karar: 'Sakla', tutunSon: 2 },
];

for (const s of senaryolar) {
  test('dokuzuncu bölüm: ' + s.ad, () => {
    let d = baslat(s.ek);
    if (s.sahte) {
      d = incele(d, 'masa9');
      d = konus(d, 'neslihan', ['Sahte']);
      expect(d.gorunum.id).toBe('sahte_defter');
      d = sahneGec(d);
      expect(M.delilVar(d, 'sahte_defter')).toBe(true);
    }
    d = git(d, 'ring');
    if (s.asker) {
      d = konus(d, 'asker', ['tütün']);
      expect(d.gorunum.id).toBe('asker');
      d = sahneGec(d);
    }
    d = git(d, 'kahve');
    d = konus(d, 'kessler', [s.ek.ekip_nermin ? 'Nermin' : 'tütün', 'Rainer', 'Imperial', 'Sağ ol']);
    expect(M.delilVar(d, 'rainer_bilgi')).toBe(true);
    expect(M.delilVar(d, 'toplanti_yeri')).toBe(true);
    d = git(d, 'ring');
    d = git(d, 'lobi');
    if (s.mutfak) {
      d = git(d, 'mutfak');
      d = incele(d, 'asansor');
      if (s.yol === 'Garson') d = konus(d, 'josef', [s.ek.ekip_cemil ? 'Cemil' : 'tütün']);
      d = git(d, 'lobi');
    }
    d = incele(d, 'resepsiyon');
    expect(M.delilVar(d, 'delorme_odasi')).toBe(true);
    d = baglan(d, 'rainer_bilgi', 'siyakat_okundu');
    d = baglan(d, 'delorme_odasi', 'viyana_ipucu');
    expect(d.gorunum).toEqual({ tur: 'sahne', id: 'plan' });
    d = sahneGec(d, s.yol);
    expect(d.gorunum.id).toBe('toplanti');
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('teklif');
    const secenekler = M.sahneBilgisi(B, d).secenekler.map((x) => x.etiket).join(' | ');
    expect(secenekler.includes('sahte')).toBe(!!s.sahte);
    d = sahneGec(d, s.teklif);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('defter_karari');
    if (s.teklif === 'Reddet') expect(M.bayrak(d, 'yaraBogur')).toBe(true);
    d = sahneGec(d, s.karar);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('telgraf9');
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
    expect(M.sayi(d, 'tutun')).toBe(s.tutunSon);
  });
}

test('dokuzuncu bölüm: tütün biterse Kessler\'e defterden bir isim verilir', () => {
  let d = baslat({ ekip_cemil: true, ekip_riza: true });
  d = konus(d, 'gruber', ['tütün']);
  d = git(d, 'ring');
  d = konus(d, 'asker', ['tütün']);
  d = sahneBitir(d);
  expect(M.sayi(d, 'tutun')).toBe(0);
  d = git(d, 'kahve');
  d = konus(d, 'kessler', ['isim', 'Rainer', 'Imperial', 'Sağ ol']);
  expect(M.bayrak(d, 'isimVerildi')).toBe(true);
  expect(M.delilVar(d, 'toplanti_yeri')).toBe(true);
});
