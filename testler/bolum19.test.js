// On dokuzuncu bölüm: gümrükteki halka. Deliller, yanlış suçlamalar, Tevfik kararı.
import { expect, test } from 'bun:test';
import { BOLUM18 } from '../src/hikaye/bolum18';
import { BOLUM19 as B } from '../src/hikaye/bolum19';
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

function onSekizinciBolumSonu(ek) {
  return {
    ...M.yeniDurum(BOLUM18),
    gorunum: { tur: 'sahne', id: 'son' },
    deliller: ['belge'],
    cikarimlar: ['orgut'],
    bayraklar: { bolumBitti: true, gulceGuven: 2, ...ek },
  };
}

const senaryolar = [
  { ad: 'iki yanlış suçlama, çift taraflı', ek: { sabitSonu: 'konustu' }, yanlis: ['Muhsin', 'Turner'], karar: 'Kalsın', tevfik: 'cift', guven: 1, gulce: 'Yaz ve yaşa', gulceTevfik: 'yaz' },
  { ad: 'doğrudan Tevfik, teslim', ek: { sabitSonu: 'teslim' }, yanlis: [], karar: 'Teslim', tevfik: 'teslim', guven: 3, gulce: 'affetmek', gulceTevfik: 'affetme' },
  { ad: 'bir yanlış, teslim, Turner ifadesi', ek: {}, yanlis: ['Muhsin'], karar: 'Teslim', tevfik: 'teslim', guven: 1, turner: true, gulce: 'Defteri', gulceTevfik: 'sessiz' },
];

for (const s of senaryolar) {
  test('on dokuzuncu bölüm: ' + s.ad, () => {
    const s18 = onSekizinciBolumSonu(s.ek);
    expect(M.sahneBilgisi(BOLUM18, s18).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum19');
    let d = M.bolumeGec(B, s18);
    expect(d.gorunum.id).toBe('acilis');
    const acilis = M.sahneBilgisi(B, d).paragraflar.join(' ');
    expect(acilis.includes('Sabit Bey konuşmuştu')).toBe(s.ek.sabitSonu === 'konustu');
    d = sahneGec(d);
    expect(d.mekan).toBe('rihtim');
    expect(M.hedef(B, d)).toContain('Süleyman');

    d = konus(d, 'suleyman', ['Göster']);
    expect(M.delilVar(d, 'kurye_notu')).toBe(true);
    d = konus(d, 'riza', ['Tamam']);

    if (s.turner) {
      d = git(d, 'kontrol');
      d = konus(d, 'turner', ['M. T.']);
      expect(M.delilVar(d, 'turner_ifadesi')).toBe(true);
      d = git(d, 'rihtim');
    }

    d = git(d, 'buro');
    d = incele(d, 'mudur_masasi');
    d = incele(d, 'kayit_defteri19');
    d = incele(d, 'nobet19');
    expect(M.delilVar(d, 'yesil_murekkep') && M.delilVar(d, 'el_yazisi') && M.delilVar(d, 'nobet_cizelgesi')).toBe(true);
    d = konus(d, 'tevfik', ['Sağ ol']);

    d = baglan(d, 'kurye_notu', 'el_yazisi');
    expect(d.gorunum.tur).toBe('mekan');
    d = baglan(d, 'nobet_cizelgesi', 'yesil_murekkep');
    expect(d.gorunum.id).toBe('suclama');

    for (const y of s.yanlis) {
      d = sahneGec(d, y);
      expect(d.gorunum.id).toContain('yanlis_');
      d = sahneGec(d, 'Yeniden');
      expect(d.gorunum.id).toBe('suclama');
    }
    const secenekSayisi = M.sahneBilgisi(B, d).secenekler.length;
    expect(secenekSayisi).toBe(3 - s.yanlis.length);
    d = sahneGec(d, 'Tevfik');
    expect(d.gorunum.id).toBe('tevfik');
    d = sahneGec(d, s.karar);
    expect(M.bayrak(d, 'tevfikKarar')).toBe(s.tevfik);
    expect(d.gorunum.id).toBe('gulce19');
    d = sahneGec(d, s.gulce);
    expect(M.bayrak(d, 'gulceTevfik')).toBe(s.gulceTevfik);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('gece19');
    const gece = M.sahneBilgisi(B, d).paragraflar.join(' ');
    expect(gece.includes('Tuzla')).toBe(s.tevfik === 'cift');
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
    expect(M.sayi(d, 'gulceGuven')).toBe(s.guven);
    expect(M.mekanBilgisi(B, { ...d, mekan: 'buro' }).kisiler).not.toContain('tevfik');
  });
}
