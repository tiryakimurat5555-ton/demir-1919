// Derinleştirme iplikleri: birinci bölümdeki kararların sonraki bölümlerde karşılığı.
// arifNeden (Süleyman'la gece konuşması) → 6. bölüm Hafız Efendi, 8. bölüm babanın tahliyesi.
// haticeSozu (Sabri'nin yarım mektubu) → 2. bölüm cenaze, 17. bölüm kafile (bolum17.test.js).
// Pendle tohumu → 1. bölüm yük kaydı, 20. bölüm tarife çıkarımı.
import { expect, test } from 'bun:test';
import { BOLUM1 } from '../src/hikaye/bolum1';
import { BOLUM2 } from '../src/hikaye/bolum2';
import { BOLUM6 } from '../src/hikaye/bolum6';
import { BOLUM8 } from '../src/hikaye/bolum8';
import { BOLUM20 } from '../src/hikaye/bolum20';
import * as M from '../src/oyun/motor';

const durum = (bolum, bayraklar, gorunum) => ({ ...M.yeniDurum(bolum), bayraklar, gorunum });

test('Hafız Efendi Arif\'in nedenine göre konuşur', () => {
  const metinler = {};
  for (const n of ['inandim', 'korktum', 'sucluluk', undefined]) {
    const d = durum(BOLUM6, { arifNeden: n }, { tur: 'konusma', kisi: 'hafiz', dugum: 'anlat' });
    metinler[n] = M.dugumBilgisi(BOLUM6, d).soz.join(' ');
  }
  expect(metinler.inandim).toContain('inandın');
  expect(metinler.korktum).toContain('tanımasalardı');
  expect(metinler.sucluluk).toContain('bırakıp gittim');
  expect(metinler[undefined]).not.toContain('Süleyman');
});

test('baba tahliyede Arif\'in nedenine cevap verir', () => {
  for (const [n, parca] of [['sucluluk', 'Esir aranmaz'], ['korktum', 'Seni tanıdım'], ['inandim', 'Ben inanmadım']]) {
    const d = durum(BOLUM8, { arifNeden: n, babaTanima: 2 }, { tur: 'sahne', id: 'tahliye' });
    expect(M.sahneBilgisi(BOLUM8, d).paragraflar.join(' ')).toContain(parca);
  }
  const yok = durum(BOLUM8, { arifNeden: 'sucluluk', babaTanima: 0 }, { tur: 'sahne', id: 'tahliye' });
  expect(M.sahneBilgisi(BOLUM8, yok).paragraflar.join(' ')).not.toContain('Esir aranmaz');
});

test('cenazede Hatice sözü yalnızca mektubu saklayana çıkar', () => {
  const evet = durum(BOLUM2, { haticeSozu: true }, { tur: 'sahne', id: 'cenaze' });
  const hayir = durum(BOLUM2, {}, { tur: 'sahne', id: 'cenaze' });
  const et = (d) => M.sahneBilgisi(BOLUM2, d).secenekler.map((x) => x.etiket).join(' | ');
  expect(et(evet)).toContain('Hatice');
  expect(et(evet)).not.toContain('Kız kardeşine haber');
  expect(et(hayir)).toContain('Kız kardeşine haber');
  expect(et(hayir)).not.toContain('Hatice');
});

test('Pendle\'in adı birinci bölümde ekilir, yirminci bölümde hatırlanır', () => {
  expect(BOLUM1.deliller.manifest.tarif).toContain('Pendle Shipping');
  expect(BOLUM20.cikarimlar.tarife.metin).toContain('Leventis');
});

test('Viyana gecesi: Arif\'in nedenine uygun tek dürüst cevap çıkar, on altıncı bölümde geri döner', async () => {
  const { BOLUM9 } = await import('../src/hikaye/bolum9');
  const { BOLUM16 } = await import('../src/hikaye/bolum16');
  for (const n of ['inandim', 'korktum', 'sucluluk', undefined]) {
    let d = durum(BOLUM9, { arifNeden: n }, { tur: 'mekan' });
    d = { ...d, mekan: 'pansiyon' };
    d = M.konusmaBaslat(BOLUM9, d, 'neslihan');
    const sec = M.dugumBilgisi(BOLUM9, d).secenekler.find((x) => x.etiket.includes('Altı yılı'));
    d = M.secenekSec(BOLUM9, d, sec).durum;
    expect(d.gorunum.id).toBe('kardes_gecesi');
    const s = M.sahneBilgisi(BOLUM9, d).secenekler;
    expect(s.length).toBe(3);
    d = M.sahneSec(BOLUM9, d, s[0]).durum;
    expect(d.gorunum.id).toBe('kardes_durust');
    expect(M.sayi(d, 'neslihanBag')).toBe(1);
    d = M.sahneSec(BOLUM9, d, M.sahneBilgisi(BOLUM9, d).secenekler[0]).durum;
    expect(d.gorunum.tur).toBe('mekan');
    // Bir kez konuşulur
    d = M.konusmaBaslat(BOLUM9, d, 'neslihan');
    expect(M.dugumBilgisi(BOLUM9, d).secenekler.map((x) => x.etiket).join(' ')).not.toContain('Altı yılı');
  }
  for (const [k, parca] of [['durust', 'kızamadım'], ['yalan', 'yalanını'], ['sessiz', 'Hâlâ söyleyemiyorsun']]) {
    const d = durum(BOLUM16, { kardesGecesi: k }, { tur: 'sahne', id: 'mektup_baba' });
    expect(M.sahneBilgisi(BOLUM16, d).paragraflar.join(' ')).toContain(parca);
  }
  const bos = durum(BOLUM16, {}, { tur: 'sahne', id: 'mektup_baba' });
  expect(M.sahneBilgisi(BOLUM16, bos).paragraflar.every((p) => p.length > 0)).toBe(true);
});

test('Pendle\'in gemileri 3., 11., 12. ve 15. bölümlerde görünür', async () => {
  const { BOLUM3 } = await import('../src/hikaye/bolum3');
  const { BOLUM11 } = await import('../src/hikaye/bolum11');
  const { BOLUM12 } = await import('../src/hikaye/bolum12');
  const { BOLUM15 } = await import('../src/hikaye/bolum15');
  expect(BOLUM3.deliller.toplanti.tarif).toContain('Sir Henry');
  expect(BOLUM11.deliller.iki_yana.tarif).toContain('H. P.');
  expect(BOLUM12.deliller.agir_sandik.tarif).toContain('Pendle Shipping');
  const d = durum(BOLUM15, {}, { tur: 'konusma', kisi: 'pendle', dugum: 'ilk' });
  const d2 = { ...d, deliller: ['manifest'] };
  expect(M.dugumBilgisi(BOLUM15, d2).soz.join(' ')).toContain('Leventis');
  expect(M.dugumBilgisi(BOLUM15, d).soz.join(' ')).not.toContain('Leventis');
});

test('Cemil\'in raporu on sekizinci bölümde verilir, esir değişiminde ve Polatlı\'da hatırlanır', async () => {
  const { BOLUM18 } = await import('../src/hikaye/bolum18');
  for (const [r, parca] of [['dogru', 'Raporu duydum'], ['kendi', 'Raporu duydum'], ['sitma', 'Kostas\'ın yatağı boş']]) {
    const d = durum(BOLUM18, { cemilRapor: r }, { tur: 'sahne', id: 'esir_degisimi' });
    expect(M.sahneBilgisi(BOLUM18, d).paragraflar.join(' ')).toContain(parca);
  }
  for (const [r, parca] of [['sitma', 'Okumaları için tutmuyor'], ['dogru', 'teslim olmuş']]) {
    const d = durum(BOLUM20, { cemilRapor: r }, { tur: 'sahne', id: 'polatli_son' });
    expect(M.sahneBilgisi(BOLUM20, d).paragraflar.join(' ')).toContain(parca);
  }
  const bos = durum(BOLUM20, {}, { tur: 'sahne', id: 'polatli_son' });
  expect(M.sahneBilgisi(BOLUM20, bos).paragraflar.every((p) => p.length > 0)).toBe(true);
});

test('Viyana\'da söylenmeyen cümle Ilgaz\'da söylenebilir', async () => {
  const { BOLUM17 } = await import('../src/hikaye/bolum17');
  for (const onceki of ['yalan', 'sessiz']) {
    let d = durum(BOLUM17, { kardesGecesi: onceki, neslihanBag: 1 }, { tur: 'sahne', id: 'ilgaz_ates' });
    const s = M.sahneBilgisi(BOLUM17, d).secenekler;
    expect(s.length).toBe(2);
    d = M.sahneSec(BOLUM17, d, s[0]).durum;
    expect(d.gorunum.id).toBe('ilgaz_itiraf');
    expect(M.bayrak(d, 'kardesGecesi')).toBe('sonra_durust');
    expect(M.sayi(d, 'neslihanBag')).toBe(2);
    expect(M.sahneBilgisi(BOLUM17, d).paragraflar.join(' ')).toContain(onceki === 'yalan' ? 'Kulağın' : 'Sustuğunda');
    d = M.sahneSec(BOLUM17, d, M.sahneBilgisi(BOLUM17, d).secenekler[0]).durum;
    expect(d.gorunum.id).toBe('etap_cankiri');
  }
  const d = durum(BOLUM17, { kardesGecesi: 'durust' }, { tur: 'sahne', id: 'ilgaz_ates' });
  expect(M.sahneBilgisi(BOLUM17, d).secenekler.length).toBe(1);
});

test('Rıza Bey\'in Yakup hikâyesi ve yanlış suçlamada sessizliği', async () => {
  const { BOLUM19 } = await import('../src/hikaye/bolum19');
  let d = durum(BOLUM19, {}, { tur: 'mekan' });
  d = { ...d, mekan: 'rihtim' };
  d = M.konusmaBaslat(BOLUM19, d, 'riza');
  d = M.secenekSec(BOLUM19, d, M.dugumBilgisi(BOLUM19, d).secenekler.find((x) => x.etiket.includes('delille'))).durum;
  expect(M.dugumBilgisi(BOLUM19, d).soz.join(' ')).toContain('Yakup');
  d = M.secenekSec(BOLUM19, d, M.dugumBilgisi(BOLUM19, d).secenekler[0]).durum;
  d = M.secenekSec(BOLUM19, d, M.dugumBilgisi(BOLUM19, d).secenekler[0]).durum;
  expect(d.gorunum.tur).toBe('mekan');
  expect(M.bayrak(d, 'rizaHikaye')).toBe(true);
  const s = { ...d, gorunum: { tur: 'sahne', id: 'yanlis_muhsin_sahne' } };
  expect(M.sahneBilgisi(BOLUM19, s).paragraflar.join(' ')).toContain('Kasımpaşa');
  const bos = durum(BOLUM19, {}, { tur: 'sahne', id: 'suclama' });
  expect(M.sahneBilgisi(BOLUM19, bos).paragraflar.every((p) => p.length > 0)).toBe(true);
});

test('Nermin\'in ağabeyi ve Pendle yemini', () => {
  for (const [parca, yemin] of [['Gazeteye', 'gazete'], ['hâkimin', 'mahkeme'], ['yalnız yapma', 'birlikte']]) {
    let d = { ...durum(BOLUM20, {}, { tur: 'mekan' }), mekan: 'tashan', deliller: ['mavi_kagit', 'pendle_ceki'] };
    d = M.konusmaBaslat(BOLUM20, d, 'nermin');
    expect(d.gorunum.dugum).toBe('sonra');
    d = M.secenekSec(BOLUM20, d, M.dugumBilgisi(BOLUM20, d).secenekler.find((x) => x.etiket.includes('Ağabeyini'))).durum;
    expect(M.dugumBilgisi(BOLUM20, d).soz.join(' ')).toContain('Cevdet');
    d = M.secenekSec(BOLUM20, d, M.dugumBilgisi(BOLUM20, d).secenekler[0]).durum;
    d = M.secenekSec(BOLUM20, d, M.dugumBilgisi(BOLUM20, d).secenekler.find((x) => x.etiket.includes('Pendle'))).durum;
    d = M.secenekSec(BOLUM20, d, M.dugumBilgisi(BOLUM20, d).secenekler.find((x) => x.etiket.includes(parca))).durum;
    expect(M.bayrak(d, 'nerminYemin')).toBe(yemin);
    expect(M.dugumBilgisi(BOLUM20, d).secenekler.map((x) => x.etiket).join(' ')).not.toContain('Pendle');
  }
});
