// Üçüncü bölüm: normal yol, şüpheyle kulüpten atılma yolu ve bölüm geçişi.
import { expect, test } from 'bun:test';
import { BOLUM2 } from '../src/hikaye/bolum2';
import { BOLUM3 as B } from '../src/hikaye/bolum3';
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

function ikinciBolumSonu(ek = {}) {
  const d = M.yeniDurum(BOLUM2);
  return {
    ...d,
    gorunum: { tur: 'sahne', id: 'son' },
    deliller: ['ip_izi', 'kopuk_yok', 'mum', 'motor', 'fransiz_aksan', 'belge', 'kanatli_anahtar', 'manifest', 'agirlik', 'ferrante_muhur', 'paltolu', 'mektup', 'fotograf', 'ferrante_damga', 'ince_yara', 'akciger_kuru', 'sahte_sarhos', 'olum_saati', 'sirt_deseni', 'defin_emri', 'jeton', 'on_yedi'],
    cikarimlar: ['olduruldu', 'silah', 'orgut', 'bicakla', 'ortbas', 'kulup'],
    bayraklar: { karar1: 'sakla', bolumBitti: true, cemilEkipte: true, travma: 3, ...ek },
  };
}

function basla(ek) {
  const s2 = ikinciBolumSonu(ek);
  const sec = M.sahneBilgisi(BOLUM2, s2).secenekler.find((x) => x.sonrakiBolum);
  expect(sec.sonrakiBolum).toBe('bolum3');
  let d = M.bolumeGec(B, s2);
  d = sahneGec(d);
  expect(d.mekan).toBe('cemil_ev');
  d = konus(d, 'nermin', ['Hamal da olsa', 'Sabri\'yi', 'Kabul']);
  d = incele(d, 'elbise');
  expect(M.bayrak(d, 'kilik')).toBe(true);
  d = git(d, 'pera');
  return d;
}

for (const karar of ['Nermin yazsın', 'sevkiyatı durduralım', 'İngiliz yüksek']) {
  test('üçüncü bölüm, dikkatli yol: ' + karar, () => {
    let d = basla({ gorulmusOlabilir: true });
    d = konus(d, 'kapici', ['Başını eğ']);
    d = git(d, 'kulup');
    d = incele(d, 'vestiyer');
    d = konus(d, 'nermin', ['İngiliz subayı']);
    d = konus(d, 'yorgo', ['Süleyman Reis', '17 numaralı']);
    d = git(d, 'servis');
    d = incele(d, 'asansor');
    expect(d.gorunum.id).toBe('on_yedi_oda');
    d = sahneGec(d, 'Kıpırdama');
    d = sahneleriGec(d);
    expect(M.sayi(d, 'suphe')).toBe(0);
    d = baglan(d, 'yorgo_bilgi', 'jeton');
    d = baglan(d, 'delorme_adi', 'paltolu');
    d = baglan(d, 'toplanti', 'izin_belgesi');
    d = baglan(d, 'siyakat_defter', 'belge');
    expect(d.gorunum).toEqual({ tur: 'sahne', id: 'gece_yarisi' });
    d = sahneGec(d, karar);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('yangin');
    const y = M.sahneBilgisi(B, d).paragraflar.join(' ');
    expect(y).toContain('Döşemenin altından');
    expect(y).toContain('bırakmıyorsun');
    d = sahneGec(d);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    expect(M.bayrak(d, 'nerminEkipte')).toBe(true);
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
  });
}

test('üçüncü bölüm, şüpheyle kulüpten atılma yolu yine bölümü bitirir', () => {
  let d = basla({ karar1: 'ingiliz' });
  d = konus(d, 'kapici', ['gözlerinin içine']);
  d = git(d, 'kulup');
  d = konus(d, 'basgarson', ['sahibi']);
  expect(M.sayi(d, 'suphe')).toBe(2);
  d = konus(d, 'yorgo', ['Pencere kenarındaki']);
  expect(d.gorunum.id).toBe('yakalandin');
  d = sahneGec(d);
  expect(d.mekan).toBe('pera');
  expect(M.bayrak(d, 'disariAtildi')).toBe(true);
  expect(M.mekanBilgisi(B, d).gecisler.map((g) => g.hedef)).not.toContain('kulup');
  d = baglan(d, 'delorme_adi', 'paltolu');
  d = baglan(d, 'toplanti', 'izin_belgesi');
  d = baglan(d, 'siyakat_defter', 'belge');
  expect(d.gorunum.id).toBe('gece_yarisi');
  expect(d.mekan).toBe('cemil_ev');
});
