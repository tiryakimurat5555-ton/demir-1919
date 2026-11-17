// On sekizinci bölüm: sahra hastanesi. Nöbet (travma), hesap bulmacası, Yannis, Sabit Bey ve esir değişimi.
import { expect, test } from 'bun:test';
import { BOLUM17 } from '../src/hikaye/bolum17';
import { BOLUM18 as B } from '../src/hikaye/bolum18';
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

function onYedinciBolumSonu(ek) {
  return {
    ...M.yeniDurum(BOLUM17),
    gorunum: { tur: 'sahne', id: 'son' },
    deliller: ['belge'],
    cikarimlar: ['orgut'],
    bayraklar: { bolumBitti: true, kalipEridi: true, ...ek },
  };
}

const senaryolar = [
  { ad: 'travmalı, nefes al, bir yanlış hesap, konuştur', ek: { travma: 3 }, nobet: 'Cemil', yanlis: true, sabit: 'konuşsun', ag: true, travmaSon: 2, rapor: 'Doğruyu yaz', raporBayrak: 'dogru' },
  { ad: 'travmalı, kaç, doğru hesap, teslim', ek: { travma: 2 }, nobet: 'kara koş', yanlis: false, sabit: 'Jandarmaya', ag: false, travmaSon: 2, rapor: 'Sıtma yaz', raporBayrak: 'sitma' },
  { ad: 'travmasız, nöbet yok, teslim', ek: { travma: 1 }, nobet: null, yanlis: false, sabit: 'Jandarmaya', ag: false, travmaSon: 1, rapor: 'yanındayım', raporBayrak: 'kendi' },
];

for (const s of senaryolar) {
  test('on sekizinci bölüm: ' + s.ad, () => {
    const s17 = onYedinciBolumSonu(s.ek);
    expect(M.sahneBilgisi(BOLUM17, s17).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum18');
    let d = M.bolumeGec(B, s17);
    d = sahneGec(d);
    if (s.nobet) {
      expect(d.gorunum.id).toBe('nobet');
      d = sahneGec(d, s.nobet);
    }
    expect(d.gorunum.tur).toBe('mekan');
    expect(d.mekan).toBe('cadir');
    expect(M.delilVar(d, 'yuk_telgrafi')).toBe(true);
    expect(M.sayi(d, 'travma')).toBe(s.travmaSon);
    expect(M.mekanBilgisi(B, d).nesneler.map((n) => n.id)).not.toContain('hesap_kagitlari');
    d = incele(d, 'teslim');
    d = git(d, 'depo18');
    d = incele(d, 'depo_kaydi');
    d = git(d, 'cadir');
    d = incele(d, 'hesap_kagitlari');
    expect(d.gorunum.id).toBe('hesap');
    if (s.yanlis) {
      d = sahneGec(d, 'İstanbul ile depo');
      d = sahneGec(d);
    }
    d = sahneGec(d, 'Depo ile hastane');
    d = sahneGec(d);
    expect(M.delilVar(d, 'depo_defteri')).toBe(true);
    expect(M.mekanBilgisi(B, d).nesneler.map((n) => n.id)).not.toContain('hesap_kagitlari');
    d = git(d, 'esir');
    d = konus(d, 'yannis', ['şişesini']);
    expect(M.delilVar(d, 'esir_tanikligi')).toBe(true);
    d = baglan(d, 'depo_defteri', 'teslim_fisleri');
    d = baglan(d, 'esir_tanikligi', 'yuk_telgrafi');
    expect(d.gorunum).toEqual({ tur: 'sahne', id: 'sabit' });
    d = sahneGec(d, s.sabit);
    if (d.gorunum.id === 'sabit_konusur') d = sahneGec(d);
    expect(d.gorunum.id).toBe('rapor18');
    d = sahneGec(d, s.rapor);
    expect(M.bayrak(d, 'cemilRapor')).toBe(s.raporBayrak);
    d = sahneGec(d);
    expect(M.delilVar(d, 'ag_bilgisi')).toBe(s.ag);
    expect(d.gorunum.id).toBe('esir_degisimi');
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
  });
}
