// Birinci bölümün baştan sona oynanabildiğini dener: bun test testler/bolum1.test.js
import { expect, test } from 'bun:test';
import { BOLUM1 as B } from '../src/hikaye/bolum1';
import * as M from '../src/oyun/motor';

function sahneGec(d, parca) {
  expect(d.gorunum.tur).toBe('sahne');
  const s = M.sahneBilgisi(B, d);
  const sec = parca ? s.secenekler.find((x) => x.etiket.includes(parca)) : s.secenekler[0];
  expect(sec).toBeTruthy();
  return M.sahneSec(B, d, sec).durum;
}

function sahneleriGec(d) {
  let n = 0;
  while (d.gorunum.tur === 'sahne' && n++ < 20) d = sahneGec(d);
  return d;
}

function konus(d, kisi, parcalar) {
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
  const r = M.incele(B, d, id);
  expect(r.metin.length).toBeGreaterThan(0);
  return r.durum;
};
const git = (d, hedef) => {
  const m = M.mekanBilgisi(B, d);
  expect(m.gecisler.map((g) => g.hedef)).toContain(hedef);
  return M.mekanaGir(B, d, hedef);
};
const baglan = (d, a, b) => {
  const r = M.baglan(B, d, a, b);
  expect(r.basarili).toBe(true);
  return r.durum;
};

test('her delilin ve çıkarımın tanımı var', () => {
  for (const c of Object.values(B.cikarimlar)) {
    expect(B.deliller[c.a]).toBeTruthy();
    expect(B.deliller[c.b]).toBeTruthy();
  }
});

for (const karar of ['İngiliz', 'eski bir polis', 'sakla']) {
  const neden = { 'İngiliz': 'İnandım', 'eski bir polis': 'Korktum', sakla: 'bırakıp gittiğimi' }[karar];
  test('bölüm baştan sona oynanır: ' + karar, () => {
    let d = M.yeniDurum(B);
    d = sahneGec(d); // açılış
    d = sahneGec(d, 'Nefesini'); // anı
    d = sahneGec(d); // nefes
    d = sahneGec(d, 'Rıhtıma'); // çağrı
    expect(d.gorunum.tur).toBe('mekan');
    expect(d.mekan).toBe('rihtim');

    d = incele(d, 'bilekler');
    d = incele(d, 'yuz');
    d = incele(d, 'eller');
    expect(d.gorunum).toEqual({ tur: 'sahne', id: 'araba' });
    d = sahneleriGec(d);
    expect(M.bayrak(d, 'cesetGitti')).toBe(true);

    d = konus(d, 'husnu', ['Süleyman', 'Teşekkür']);
    expect(M.delilVar(d, 'motor')).toBe(true);

    d = git(d, 'kayikhane');
    d = konus(d, 'suleyman', ['Bilekleri', 'Denki']);
    d = incele(d, 'denk');
    expect(d.gorunum.id).toBe('belge');
    d = sahneleriGec(d);
    expect(M.delilVar(d, 'belge')).toBe(true);
    d = konus(d, 'suleyman', ['Gülce']);

    d = git(d, 'rihtim');
    d = git(d, 'buro');
    d = konus(d, 'gulce', ['Leventis\'in sahibi', 'Haklısın', 'yük kaydını', 'Ferrante\'nin adamı']);
    d = incele(d, 'defter');
    d = incele(d, 'vinc');
    d = konus(d, 'gulce', ['işareti', 'güveniyorum']);
    expect(M.delilVar(d, 'ferrante_damga')).toBe(true);

    d = git(d, 'rihtim');
    d = git(d, 'han');
    d = konus(d, 'ohannes', ['Süleyman', 'anahtarını']);
    d = git(d, 'oda');
    d = incele(d, 'pervaz');
    d = sahneleriGec(d);
    expect(M.delilVar(d, 'fotograf')).toBe(true);
    expect(M.bayrak(d, 'haticeSozu')).toBe(true);

    expect(M.baglan(B, d, 'motor', 'belge').basarili).toBe(false);
    d = baglan(d, 'ip_izi', 'kopuk_yok');
    d = baglan(d, 'mum', 'ferrante_muhur');
    d = baglan(d, 'paltolu', 'fransiz_aksan');
    d = baglan(d, 'mektup', 'agirlik');
    d = baglan(d, 'kanatli_anahtar', 'ferrante_damga');
    expect(d.gorunum).toEqual({ tur: 'sahne', id: 'karar_oncesi' });
    expect(d.mekan).toBe('kayikhane');
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('gece_konusma');
    expect(M.sahneBilgisi(B, d).paragraflar.join(' ')).toContain('Kalaycı İsmail Usta');
    d = sahneGec(d, neden);
    expect(d.gorunum.id).toBe('gece_suleyman');
    expect(M.sahneBilgisi(B, d).paragraflar.join(' ')).toContain('Kemal');
    d = sahneGec(d);
    expect(M.bayrak(d, 'aramaSozu')).toBe(true);
    expect(d.gorunum.id).toBe('karar');
    d = sahneGec(d, karar);
    d = sahneGec(d); // son sahnesi
    const kapanis = M.sahneBilgisi(B, d);
    expect(kapanis.paragraflar.join(' ')).toContain('kanatlı bir anahtar');
    d = sahneGec(d);
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
    expect(d.gorunum.id).toBe('son');
    expect(M.sahneBilgisi(B, d).secenekler.map((x) => x.sonrakiBolum || (x.anaMenu && 'menu'))).toEqual(['bolum2', 'menu']);
    expect(M.hedef(B, d)).toContain('bitti');
  });
}

test('Gülce ile yalan söylenip geri dönülürse yine güven kazanılır', () => {
  let d = M.yeniDurum(B);
  d = { ...d, gorunum: { tur: 'mekan' }, mekan: 'buro', bayraklar: { gulceOnerildi: true } };
  d = konus(d, 'gulce', ['Leventis\'in sahibi', 'Çık']);
  d = konus(d, 'gulce', ['Doğrusunu', 'yük kaydını', 'Teşekkür']);
  expect(M.mekanBilgisi(B, d).nesneler.map((o) => o.id)).toContain('defter');
});

test('Hüsnü tehdit edilip bırakılırsa sonra özürle konuşur', () => {
  let d = { ...M.yeniDurum(B), gorunum: { tur: 'mekan' } };
  d = konus(d, 'husnu', ['Yakasından', 'uzaklaş']);
  d = konus(d, 'husnu', ['Kusura', 'Teşekkür']);
  expect(M.delilVar(d, 'fransiz_aksan')).toBe(true);
});
