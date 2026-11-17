// İkinci bölümün birinci bölümün sonundan baştan sona oynanabildiğini dener.
import { expect, test } from 'bun:test';
import { BOLUM1 } from '../src/hikaye/bolum1';
import { BOLUM2 as B } from '../src/hikaye/bolum2';
import { BOLUMLER } from '../src/hikaye';
import * as M from '../src/oyun/motor';

function sahneGec(d, parca) {
  expect(d.gorunum.tur).toBe('sahne');
  const s = M.sahneBilgisi(B, d);
  const sec = parca ? s.secenekler.find((x) => x.etiket.includes(parca)) : s.secenekler[0];
  if (!sec) throw new Error('sahne ' + d.gorunum.id + ': seçenek yok: ' + parca);
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
  expect(M.mekanBilgisi(B, d).gecisler.map((g) => g.hedef)).toContain(hedef);
  return M.mekanaGir(B, d, hedef);
};
const baglan = (d, a, b) => {
  const r = M.baglan(B, d, a, b);
  if (!r.basarili) throw new Error(a + ' + ' + b + ': ' + r.metin);
  return r.durum;
};

// Birinci bölümün sonunu taklit eden durum
function birinciBolumSonu(karar) {
  const d = M.yeniDurum(BOLUM1);
  return {
    ...d,
    gorunum: { tur: 'sahne', id: 'son' },
    deliller: ['ip_izi', 'kopuk_yok', 'mum', 'motor', 'fransiz_aksan', 'belge', 'kanatli_anahtar', 'manifest', 'agirlik', 'ferrante_muhur', 'paltolu', 'mektup', 'fotograf', 'ferrante_damga'],
    cikarimlar: ['olduruldu', 'silah', 'orgut'],
    bayraklar: { karar1: karar, bolumBitti: true, olay_karar: true, 'gorüldü_rihtim': true, travma: 1, gulceyeAnlatti: true },
  };
}

test('bölüm geçişi kararları taşır, geçici bayrakları sıfırlar', () => {
  const s1 = birinciBolumSonu('polis');
  const sec = M.sahneBilgisi(BOLUM1, s1).secenekler.find((x) => x.sonrakiBolum);
  expect(sec.sonrakiBolum).toBe('bolum2');
  const d = M.bolumeGec(BOLUMLER[sec.sonrakiBolum], s1);
  expect(d.bolum).toBe('bolum2');
  expect(d.bayraklar.karar1).toBe('polis');
  expect(d.bayraklar.travma).toBe(1);
  expect(d.bayraklar.bolumBitti).toBeUndefined();
  expect(d.bayraklar.olay_karar).toBeUndefined();
  expect(d.bayraklar.bitti_bolum1).toBe(true);
  expect(d.gorunum).toEqual({ tur: 'sahne', id: 'sabah' });
  expect(M.sahneBilgisi(B, d).paragraflar.join(' ')).toContain('Cihangir');
});

for (const [karar, saklan, soz] of [
  ['ingiliz', 'Nefesini', 'bulduracağım'],
  ['polis', 'Gözlerini', 'Huzur'],
  ['sakla', 'Nefesini', 'Bir şey söyleme'],
]) {
  test('ikinci bölüm baştan sona: ' + karar, () => {
    let d = M.bolumeGec(B, birinciBolumSonu(karar));
    d = sahneGec(d);
    expect(d.mekan).toBe('kayikhane');
    d = konus(d, 'suleyman', ['Korkuyor', 'Sabri\'yi bu şekilde', 'Hastaneye']);
    d = git(d, 'hastane');
    d = konus(d, 'rustem', ['Cemil']);
    d = konus(d, 'cemil', ['Süleyman Kaptan', 'Ateşçi', 'Bir şey görmedim', 'Bekle', 'Bileklerinde', 'Çanakkale']);
    expect(M.bayrak(d, 'cemilRazi')).toBe(true);
    d = git(d, 'morg');
    d = incele(d, 'koltuk');
    d = incele(d, 'akciger');
    d = incele(d, 'ceket');
    expect(d.gorunum).toEqual({ tur: 'sahne', id: 'baskin' });
    d = sahneGec(d);
    d = sahneGec(d, saklan);
    d = sahneleriGec(d);
    expect(M.delilVar(d, 'on_yedi')).toBe(true);
    d = incele(d, 'mide');
    d = incele(d, 'sirt');
    d = incele(d, 'defter');
    d = konus(d, 'cemil', ['ince yara', 'Neden', 'Devam']);
    d = baglan(d, 'ince_yara', 'akciger_kuru');
    d = baglan(d, 'olum_saati', 'sirt_deseni');
    d = baglan(d, 'jeton', 'on_yedi');
    d = baglan(d, 'sahte_sarhos', 'defin_emri');
    d = baglan(d, 'kanatli_anahtar', 'jeton');
    expect(d.gorunum).toEqual({ tur: 'sahne', id: 'cenaze' });
    d = sahneGec(d, soz);
    d = sahneGec(d);
    expect(M.bayrak(d, 'cemilEkipte')).toBe(true);
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
    expect(d.gorunum.id).toBe('son');
    expect(M.hedef(B, d)).toContain('bitti');
  });
}

test('bütün sahne ve mekân metinleri her bölümde üretilebilir', () => {
  for (const bolum of Object.values(BOLUMLER)) {
    const d = { ...M.yeniDurum(bolum), bayraklar: { karar1: 'sakla' } };
    for (const id of Object.keys(bolum.sahneler)) {
      const s = M.sahneBilgisi(bolum, { ...d, gorunum: { tur: 'sahne', id } });
      expect(s.paragraflar.every((p) => typeof p === 'string' && p.length > 0)).toBe(true);
    }
    for (const id of Object.keys(bolum.mekanlar)) {
      const m = M.mekanBilgisi(bolum, { ...d, mekan: id });
      expect(typeof m.tarif).toBe('string');
    }
  }
});
