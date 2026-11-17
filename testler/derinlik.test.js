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
