// On altıncı bölüm: 16 Mart 1920. Listeyi ele geçirmenin üç yolu, kaçış hazırlığı, liste ve baba kararları.
import { expect, test } from 'bun:test';
import { BOLUM15 } from '../src/hikaye/bolum15';
import { BOLUM16 as B } from '../src/hikaye/bolum16';
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

function onBesinciBolumSonu(ek, deliller = []) {
  return {
    ...M.yeniDurum(BOLUM15),
    gorunum: { tur: 'sahne', id: 'son' },
    deliller: ['belge', 'rainer_bilgi', ...deliller],
    cikarimlar: ['orgut'],
    bayraklar: { bolumBitti: true, ekip_cemil: true, ekip_nermin: true, ...ek },
  };
}

const senaryolar = [
  { ad: 'parayla al, mektup, herkesi uyar, baba Anadolu\'ya', ek: { hisseKarar: 'sat', rainerSonu: 'yalniz', sevkiyatKarar: 'anadolu' }, deliller: [], liste: 'para', mektup: true, karar: 'Herkesi', baba: 'Anadolu', yarali: true },
  { ad: 'tehditle al, yak, baba saklansın', ek: { hisseKarar: 'genelkurul', rainerSonu: 'tutuklu' }, deliller: ['kurulus_defteri'], liste: 'tehdit', mektup: false, karar: 'bizimkileri', baba: 'mahzen', yarali: false },
  { ad: 'odadan çal, uyar, baba Anadolu\'ya', ek: { hisseKarar: 'bagis', rainerSonu: 'serbest' }, deliller: [], liste: 'hirsiz', mektup: false, karar: 'Herkesi', baba: 'Anadolu', yarali: true },
];

for (const s of senaryolar) {
  test('on altıncı bölüm: ' + s.ad, () => {
    const s15 = onBesinciBolumSonu(s.ek, s.deliller);
    expect(M.sahneBilgisi(BOLUM15, s15).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum16');
    let d = M.bolumeGec(B, s15);
    d = sahneGec(d);
    expect(d.mekan).toBe('han');
    expect(M.bayrak(d, 'ekip_riza')).toBe(true);
    if (s.mektup) {
      d = konus(d, 'neslihan', ['Şimdi oku']);
      expect(d.gorunum.id).toBe('mektup_baba');
      d = sahneGec(d);
      expect(M.bayrak(d, 'babaAffetti')).toBe(true);
    }
    d = git(d, 'pera');
    if (s.liste === 'para') d = konus(d, 'gubler', ['satın alır']);
    else if (s.liste === 'tehdit') d = konus(d, 'gubler', ['Kırmızı sayfalarda']);
    else {
      d = konus(d, 'gubler', ['Hayır']);
      d = incele(d, 'gubler_odasi');
    }
    expect(M.delilVar(d, 'kara_liste')).toBe(true);
    expect(M.bayrak(d, 'listeYolu')).toBe(s.liste);
    expect(M.mekanBilgisi(B, d).kisiler).not.toContain('gubler');
    d = git(d, 'han');
    d = git(d, 'buro');
    d = konus(d, 'gulce', ['seyr-i sefain']);
    expect(M.delilVar(d, 'izin_kagitlari')).toBe(true);
    d = git(d, 'han');
    d = git(d, 'rihtim');
    d = konus(d, 'suleyman', ['Dört kişi']);
    expect(d.gorunum).toEqual({ tur: 'sahne', id: 'gece16' });
    expect(d.mekan).toBe('han');
    const metin = M.sahneBilgisi(B, d).paragraflar.join(' ');
    expect(metin.includes('Topal Hasan')).toBe(s.ek.sevkiyatKarar === 'anadolu');
    d = sahneGec(d, s.karar);
    d = sahneGec(d, s.baba);
    expect(d.gorunum.id).toBe('baskin');
    d = sahneGec(d);
    expect(!!M.bayrak(d, 'rizaYarali')).toBe(s.yarali);
    expect(M.bayrak(d, 'nerminSonu')).toBe('anadolu');
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
  });
}
