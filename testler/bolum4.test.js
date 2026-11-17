// Dördüncü bölüm: sorgu, Gülce, depo; farklı karar birleşimleri.
import { expect, test } from 'bun:test';
import { BOLUM3 } from '../src/hikaye/bolum3';
import { BOLUM4 as B } from '../src/hikaye/bolum4';
import * as M from '../src/oyun/motor';

function sahneGec(d, parca) {
  expect(d.gorunum.tur).toBe('sahne');
  const s = M.sahneBilgisi(B, d);
  const sec = parca ? s.secenekler.find((x) => x.etiket.includes(parca)) : s.secenekler[0];
  if (!sec) throw new Error('sahne ' + d.gorunum.id + ': seçenek yok: ' + parca + ' / var: ' + s.secenekler.map((x) => x.etiket).join(' | '));
  return M.sahneSec(B, d, sec).durum;
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
const git = (d, hedef) => {
  expect(M.mekanBilgisi(B, d).gecisler.map((g) => g.hedef)).toContain(hedef);
  return M.mekanaGir(B, d, hedef);
};
const baglan = (d, a, b) => {
  const r = M.baglan(B, d, a, b);
  if (!r.basarili) throw new Error(a + ' + ' + b + ': ' + r.metin);
  return r.durum;
};

function ucuncuBolumSonu(ek) {
  const d = M.yeniDurum(BOLUM3);
  return {
    ...d,
    gorunum: { tur: 'sahne', id: 'son' },
    deliller: ['ip_izi', 'kopuk_yok', 'belge', 'kanatli_anahtar', 'paltolu', 'fotograf', 'ince_yara', 'akciger_kuru', 'sahte_sarhos', 'defin_emri', 'jeton', 'delorme_adi', 'izin_belgesi', 'toplanti', 'siyakat_defter'],
    cikarimlar: ['olduruldu', 'silah', 'orgut', 'bicakla', 'ortbas', 'kulup', 'delorme', 'sevkiyat', 'rusvet'],
    bayraklar: { bolumBitti: true, cemilEkipte: true, nerminEkipte: true, travma: 1, ...ek },
  };
}

const senaryolar = [
  { ad: 'gazete, tutukla, saldır, gecikme', ek: { karar1: 'polis', karar3: 'gazete', gorulmusOlabilir: true }, halim: 'güvendiğin', gulce: 'Yap', yol: 'Hüsnü', yuz: 'Üstüne', sonuc: 'tam' },
  { ad: 'depo, bırak, oyala, gecikme yok', ek: { karar1: 'sakla', karar3: 'depo' }, halim: 'Bırak gitsin', gulce: 'Hayır', yol: 'damlarından', yuz: 'Konuşmaya', sonuc: 'yarim' },
  { ad: 'ihbar, tutukla, fotoğraf', ek: { karar1: 'ingiliz', karar3: 'ihbar' }, halim: 'güvendiğin', gulce: 'Hayır', yol: 'Hüsnü', yuz: 'Fotoğrafı', sonuc: 'tam' },
];

for (const s of senaryolar) {
  test('dördüncü bölüm: ' + s.ad, () => {
    const s3 = ucuncuBolumSonu(s.ek);
    expect(M.sahneBilgisi(BOLUM3, s3).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum4');
    let d = M.bolumeGec(B, s3);
    d = sahneGec(d);
    expect(d.mekan).toBe('hastane');
    expect(M.mekanBilgisi(B, d).kisiler).not.toContain('gulce');
    d = konus(d, 'riza', ['adil', 'nasıl bulacağız', 'Anlaştık']);
    d = konus(d, 'suleyman', ['Rıza Bey kim', 'kayıkhane kuracağım', 'Dinlen']);
    d = konus(d, 'cemil', ['sargı', 'Sağ ol']);
    d = konus(d, 'nermin', ['Ağabeyin', 'Dikkatli']);
    d = konus(d, 'gulce', ['Dinliyorum', 'adalet mi', s.gulce]);
    d = git(d, 'meyhane');
    d = konus(d, 'halim', ['Yakasına', 'defin emri', 'rakı', 'K 7', 'Anlat', s.halim]);
    expect(M.sayi(d, 'baski')).toBe(4);
    d = baglan(d, 'halim_itiraf', 'ince_yara');
    d = baglan(d, 'gumruk_kaydi', 'halim_itiraf');
    expect(d.gorunum).toEqual({ tur: 'sahne', id: 'depo_yaklasim' });
    d = sahneGec(d, s.yol);
    d = sahneGec(d, 'Hasan');
    d = sahneGec(d);
    d = sahneGec(d, s.yuz);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('sandiklar');
    expect(M.sahneBilgisi(B, d).paragraflar.join(' ')).toContain('SALONIQUE');
    d = sahneGec(d);
    expect(M.bayrak(d, 'sevkiyatSonuc')).toBe(s.sonuc);
    expect(M.sahneBilgisi(B, d).paragraflar.length).toBeGreaterThan(5);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    expect(M.bayrak(d, 'rizaEkipte')).toBe(true);
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
  });
}
