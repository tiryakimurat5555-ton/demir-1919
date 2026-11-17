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
