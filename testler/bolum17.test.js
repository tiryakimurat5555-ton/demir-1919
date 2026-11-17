// On yedinci bölüm: İnebolu'dan Ankara'ya. İstifçi Zihni, kafile etapları, erzak/yorgunluk ve kalıbın erimesi.
import { expect, test } from 'bun:test';
import { BOLUM16 } from '../src/hikaye/bolum16';
import { BOLUM17 as B } from '../src/hikaye/bolum17';
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

function onAltinciBolumSonu(ek, deliller = []) {
  return {
    ...M.yeniDurum(BOLUM16),
    gorunum: { tur: 'sahne', id: 'son' },
    deliller: ['belge', 'kara_liste', ...deliller],
    cikarimlar: ['orgut'],
    bayraklar: { bolumBitti: true, ekip_cemil: true, ekip_nermin: true, ekip_riza: true, nerminSonu: 'anadolu', ...ek },
  };
}

const senaryolar = [
  { ad: 'Anadolu sandıkları, Neslihan okur, Zihni kafilede, orman + han → sağlam, kalıp erir', ek: { sevkiyatKarar: 'anadolu', babaKarar: 'sakla' }, deliller: ['kurulus_defteri'], bag: 'neslihan', zihni: 'yürüsün', e1: 'Orman', e2: 'Handa', kafile: 'saglam', erzak: 3 },
  { ad: 'postane, Zihni teslim, orman (eşkıya) + gece → perişan, kalıp kayıp', ek: { sevkiyatKarar: 'batir', babaKarar: 'anadolu', kalipKayip: true }, deliller: [], bag: 'postane', zihni: 'teslim', e1: 'Orman', e2: 'Gece', kafile: 'perisan', erzak: 0 },
  { ad: 'postane, teslim, vadi + han → sağlam', ek: { sevkiyatKarar: 'ingiliz', babaKarar: 'anadolu' }, deliller: [], bag: 'postane', zihni: 'teslim', e1: 'Vadi', e2: 'Handa', kafile: 'saglam', erzak: 2 },
];

for (const s of senaryolar) {
  test('on yedinci bölüm: ' + s.ad, () => {
    const s16 = onAltinciBolumSonu(s.ek, s.deliller);
    expect(M.sahneBilgisi(BOLUM16, s16).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum17');
    let d = M.bolumeGec(B, s16);
    d = sahneGec(d);
    expect(d.mekan).toBe('iskele');
    expect(M.sayi(d, 'erzak')).toBe(2);
    const kisiler = M.mekanBilgisi(B, d).kisiler;
    expect(kisiler.includes('hasan17')).toBe(s.ek.sevkiyatKarar === 'anadolu');
    expect(kisiler.includes('baba17')).toBe(s.ek.babaKarar === 'sakla');
    if (s.bag === 'neslihan') d = konus(d, 'neslihan', ['İnebolu', 'Hadi']);
    d = git(d, 'kafile');
    d = konus(d, 'zeynep', ['saklıyor']);
    d = git(d, 'iskele');
    d = git(d, 'carsi17');
    if (s.bag === 'postane') d = incele(d, 'postane');
    expect(M.delilVar(d, 'zihni_baglantisi')).toBe(true);
    d = git(d, 'mahzen');
    d = incele(d, 'sandiklar17');
    expect(M.delilVar(d, 'mahzen_sandiklari')).toBe(true);
    d = git(d, 'carsi17');
    expect(M.mekanBilgisi(B, d).gecisler.map((g) => g.hedef)).not.toContain('mahzen');
    d = baglan(d, 'zihni_baglantisi', 'mahzen_sandiklari');
    expect(d.gorunum).toEqual({ tur: 'sahne', id: 'zihni' });
    d = sahneGec(d, s.zihni);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('etap_kure');
    d = sahneGec(d, s.e1);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('etap_ilgaz');
    d = sahneGec(d, s.e2);
    expect(d.gorunum.id).toBe('etap_cankiri');
    d = sahneGec(d);
    expect(M.bayrak(d, 'kafileSonu')).toBe(s.kafile);
    expect(M.sayi(d, 'erzak')).toBe(s.erzak);
    expect(d.gorunum.id).toBe('ankara');
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('harf');
    const metin = M.sahneBilgisi(B, d).paragraflar.join(' ');
    expect(metin.includes('Kalıba gerek yok')).toBe(!!s.ek.kalipKayip);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
    expect(M.bayrak(d, 'kalipEridi')).toBe(true);
  });
}
