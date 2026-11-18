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

test('Gülce\'nin Tevfik kararı yirminci bölümün açılışında döner', () => {
  for (const [g, parca] of [['yaz', 'on dört sayfa'], ['affetme', 'yaşıyor mu'], ['sessiz', 'defterini']]) {
    const d = durum(BOLUM20, { gulceTevfik: g }, { tur: 'sahne', id: 'acilis' });
    expect(M.sahneBilgisi(BOLUM20, d).paragraflar.join(' ')).toContain(parca);
  }
  const bos = durum(BOLUM20, {}, { tur: 'sahne', id: 'acilis' });
  expect(M.sahneBilgisi(BOLUM20, bos).paragraflar.every((p) => p.length > 0)).toBe(true);
});

// 6. derinleştirme adımı: Hafız Efendi'nin zarfı (47. sayfa), Nermin'in madalya sorusu, Yusuf Usta'nın sözü.
test('Hafız Efendi\'nin zarfı yirmi beşinci bölümün sonunda hatırlanır', async () => {
  const { BOLUM7 } = await import('../src/hikaye/bolum7');
  const { BOLUM25 } = await import('../src/hikaye/bolum25');
  let d = durum(BOLUM7, {}, { tur: 'konusma', kisi: 'hafiz', dugum: 'sonra' });
  const zarf = M.dugumBilgisi(BOLUM7, d).secenekler.find((x) => x.etiket.includes('zarf'));
  d = M.secenekSec(BOLUM7, d, zarf).durum;
  expect(M.bayrak(d, 'hafizZarf')).toBe(true);
  expect(M.dugumBilgisi(BOLUM7, d).secenekler.some((x) => x.etiket.includes('zarf'))).toBe(false);
  const ile = M.sahneBilgisi(BOLUM25, durum(BOLUM25, { hafizZarf: true }, { tur: 'sahne', id: 'son25' })).paragraflar;
  expect(ile.join(' ')).toContain('kırk yedi');
  const siz = M.sahneBilgisi(BOLUM25, durum(BOLUM25, {}, { tur: 'sahne', id: 'son25' })).paragraflar;
  expect(siz.join(' ')).not.toContain('defterdarın');
  expect(siz.every((p) => p.length > 0)).toBe(true);
});

test('Nermin\'in madalya sorusu sofrada geri döner', async () => {
  const { BOLUM3 } = await import('../src/hikaye/bolum3');
  const { BOLUM23 } = await import('../src/hikaye/bolum23');
  for (const [i, k, parca] of [[0, 'anlat', 'sandığın dibinde'], [1, 'sakla', 'öbür yarısını']]) {
    let d = durum(BOLUM3, {}, { tur: 'konusma', kisi: 'nermin', dugum: 'bilgi' });
    d = M.secenekSec(BOLUM3, d, M.dugumBilgisi(BOLUM3, d).secenekler.find((x) => x.etiket.includes('sor bana'))).durum;
    expect(M.dugumBilgisi(BOLUM3, d).soz.join(' ')).toContain('subay');
    d = M.secenekSec(BOLUM3, d, M.dugumBilgisi(BOLUM3, d).secenekler[i]).durum;
    expect(M.bayrak(d, 'madalya')).toBe(k);
    const s = durum(BOLUM23, { madalya: k }, { tur: 'konusma', kisi: 'nermin23', dugum: 'ilk' });
    expect(M.dugumBilgisi(BOLUM23, s).soz.join(' ').toLowerCase()).toContain(parca);
  }
  const bos = durum(BOLUM23, {}, { tur: 'konusma', kisi: 'nermin23', dugum: 'ilk' });
  expect(M.dugumBilgisi(BOLUM23, bos).soz.every((p) => p.length > 0)).toBe(true);
});

test('Yusuf Usta\'nın sözü yirmi dördüncü bölümde mektupla döner', async () => {
  const { BOLUM24 } = await import('../src/hikaye/bolum24');
  for (const [i, k] of [[0, 'soz'], [1, 'yok']]) {
    let d = durum(BOLUM8, {}, { tur: 'konusma', kisi: 'yusuf', dugum: 'sonra' });
    d = M.secenekSec(BOLUM8, d, M.dugumBilgisi(BOLUM8, d).secenekler.find((x) => x.etiket.includes('İstanbul'))).durum;
    d = M.secenekSec(BOLUM8, d, M.dugumBilgisi(BOLUM8, d).secenekler[i]).durum;
    expect(M.bayrak(d, 'yusufSoz')).toBe(k);
  }
  const ile = M.sahneBilgisi(BOLUM24, durum(BOLUM24, { babaItiraf: true, yusufSoz: 'soz' }, { tur: 'sahne', id: 'acilis' }));
  expect(ile.paragraflar.join(' ')).toContain('Dükkân açık');
  const siz = M.sahneBilgisi(BOLUM24, durum(BOLUM24, { babaItiraf: true, yusufSoz: 'yok' }, { tur: 'sahne', id: 'acilis' }));
  expect(siz.paragraflar.join(' ')).not.toContain('Dükkân açık');
});

// 7. derinleştirme adımı: David Saltiel'in listesi, Ohannes Usta'nın oğlu.
test('Saltiel\'in kardeşi ve listesi Viyana\'da ve Zürih\'te döner', async () => {
  const { BOLUM5 } = await import('../src/hikaye/bolum5');
  const { BOLUM9 } = await import('../src/hikaye/bolum9');
  const { BOLUM25 } = await import('../src/hikaye/bolum25');
  let d = durum(BOLUM5, { saltielAkraba: true }, { tur: 'konusma', kisi: 'saltiel', dugum: 'ilk' });
  d = M.secenekSec(BOLUM5, d, M.dugumBilgisi(BOLUM5, d).secenekler.find((x) => x.etiket.includes('Siz de'))).durum;
  expect(M.dugumBilgisi(BOLUM5, d).soz.join(' ')).toContain('David');
  d = M.secenekSec(BOLUM5, d, M.dugumBilgisi(BOLUM5, d).secenekler[0]).durum;
  expect(M.bayrak(d, 'saltielDavid')).toBe('anlat');
  expect(M.dugumBilgisi(BOLUM5, d).secenekler.some((x) => x.etiket.includes('Siz de'))).toBe(false);

  const a = durum(BOLUM9, { saltielDavid: 'anlat' }, { tur: 'sahne', id: 'acilis' });
  const b = M.sahneBilgisi(BOLUM9, a);
  expect(b.paragraflar.join(' ')).toContain('On yedi ad');
  expect(b.secenekler.length).toBe(2);
  const v = M.secenekSec(BOLUM9, a, b.secenekler[0]).durum;
  expect(M.bayrak(v, 'davidNotu')).toBe('verdi');
  expect(v.gorunum.tur).toBe('mekan');
  const bos = M.sahneBilgisi(BOLUM9, durum(BOLUM9, {}, { tur: 'sahne', id: 'acilis' }));
  expect(bos.secenekler.length).toBe(1);
  expect(bos.paragraflar.every((p) => p.length > 0)).toBe(true);

  for (const [n, parca] of [['verdi', 'Dört yıldır yanında'], ['sakla', 'hiç göstermedin']]) {
    const s = durum(BOLUM25, { davidNotu: n }, { tur: 'sahne', id: 'son25' });
    expect(M.sahneBilgisi(BOLUM25, s).paragraflar.join(' ')).toContain(parca);
  }
});

test('Ohannes Usta\'nın oğlu Aram yirmi dördüncü bölümde döner', async () => {
  const { BOLUM10 } = await import('../src/hikaye/bolum10');
  const { BOLUM24 } = await import('../src/hikaye/bolum24');
  for (const [i, k, parca] of [[0, 'ara', 'Boston\'dan'], [1, 'bekle', 'hâlâ boş']]) {
    let d = durum(BOLUM10, {}, { tur: 'konusma', kisi: 'ohannes', dugum: 'ilk' });
    d = M.secenekSec(BOLUM10, d, M.dugumBilgisi(BOLUM10, d).secenekler.find((x) => x.etiket.includes('Neden'))).durum;
    expect(M.dugumBilgisi(BOLUM10, d).soz.join(' ')).toContain('Aram');
    d = M.secenekSec(BOLUM10, d, M.dugumBilgisi(BOLUM10, d).secenekler[i]).durum;
    expect(M.bayrak(d, 'ohannesOgul')).toBe(k);
    const s = durum(BOLUM24, { ohannesOgul: k }, { tur: 'sahne', id: 'acilis' });
    expect(M.sahneBilgisi(BOLUM24, s).paragraflar.join(' ')).toContain(parca);
  }
});

// 8. derinleştirme adımı: Binbaşı Fikri Efendi birinci kitaptan ekilir; Cemil ve Saltiel ailesi.
test('Binbaşı Fikri morgda anılır, Zürih\'te geri döner', async () => {
  const { BOLUM5 } = await import('../src/hikaye/bolum5');
  const { BOLUM9 } = await import('../src/hikaye/bolum9');
  const { BOLUM25 } = await import('../src/hikaye/bolum25');
  for (const [i, k, parca] of [[0, 'teselli', 'bir defteri göndermenin'], [1, 'sert', 'o günden beri ödüyor'], [2, 'sus', 'omzunda']]) {
    let d = durum(BOLUM2, { cemilNeden: true }, { tur: 'konusma', kisi: 'cemil', dugum: 'morg' });
    const sec = M.dugumBilgisi(BOLUM2, d).secenekler.find((x) => x.etiket.includes('emri kim'));
    expect(sec).toBeTruthy();
    d = M.secenekSec(BOLUM2, d, sec).durum;
    expect(M.dugumBilgisi(BOLUM2, d).soz.join(' ')).toContain('Fikri');
    d = M.secenekSec(BOLUM2, d, M.dugumBilgisi(BOLUM2, d).secenekler[i]).durum;
    expect(M.bayrak(d, 'cemilFikri')).toBe(k);
    const s = durum(BOLUM25, { cemilFikri: k }, { tur: 'sahne', id: 'onizleme' });
    expect(M.sahneBilgisi(BOLUM25, s).paragraflar.join(' ')).toContain(parca);
  }
  // Vapurda Cemil yanındaysa Saltiel defteri kimin gönderdiğini öğrenir.
  let v = durum(BOLUM5, { saltielAkraba: true, ekip_cemil: true, cemilFikri: 'sus' }, { tur: 'konusma', kisi: 'saltiel', dugum: 'david' });
  const bak = M.dugumBilgisi(BOLUM5, v).secenekler.find((x) => x.etiket.includes('Cemil'));
  expect(bak).toBeTruthy();
  v = M.secenekSec(BOLUM5, v, bak).durum;
  expect(M.bayrak(v, 'cemilSaltiel')).toBe(true);
  const yok = durum(BOLUM5, { saltielAkraba: true }, { tur: 'konusma', kisi: 'saltiel', dugum: 'david' });
  expect(M.dugumBilgisi(BOLUM5, yok).secenekler.some((x) => x.etiket.includes('Cemil'))).toBe(false);
  const a = durum(BOLUM9, { saltielDavid: 'anlat', cemilSaltiel: true }, { tur: 'sahne', id: 'acilis' });
  expect(M.sahneBilgisi(BOLUM9, a).paragraflar.join(' ')).toContain('cuma duasına');
  const bos = durum(BOLUM25, {}, { tur: 'sahne', id: 'onizleme' });
  expect(M.sahneBilgisi(BOLUM25, bos).paragraflar.every((p) => p.length > 0)).toBe(true);
});

// 9. derinleştirme adımı: dördüncü bölümün sözleri ve soruları sonradan döner.
test('Rıza Bey\'in babası, kayıkhane sözü ve Gülce\'nin sorusu', async () => {
  const { BOLUM4 } = await import('../src/hikaye/bolum4');
  const { BOLUM12 } = await import('../src/hikaye/bolum12');
  const { BOLUM19 } = await import('../src/hikaye/bolum19');
  const { BOLUM23 } = await import('../src/hikaye/bolum23');
  for (const [i, k, parca] of [[0, 'bekle', 'Beklemeyi bilen'], [1, 'sor', 'Bugün gerisi']]) {
    let d = durum(BOLUM4, {}, { tur: 'konusma', kisi: 'riza', dugum: 'adil' });
    d = M.secenekSec(BOLUM4, d, M.dugumBilgisi(BOLUM4, d).secenekler.find((x) => x.etiket.includes('Babanız'))).durum;
    expect(M.dugumBilgisi(BOLUM4, d).soz.join(' ')).toContain('imam');
    d = M.secenekSec(BOLUM4, d, M.dugumBilgisi(BOLUM4, d).secenekler[i]).durum;
    expect(M.bayrak(d, 'rizaBaba')).toBe(k);
    expect(M.dugumBilgisi(BOLUM4, d).secenekler.some((x) => x.etiket.includes('Babanız'))).toBe(false);
    const y = durum(BOLUM19, { rizaBaba: k }, { tur: 'konusma', kisi: 'riza', dugum: 'yakup' });
    expect(M.dugumBilgisi(BOLUM19, y).soz.join(' ')).toContain(parca);
  }
  expect(M.dugumBilgisi(BOLUM19, durum(BOLUM19, {}, { tur: 'konusma', kisi: 'riza', dugum: 'yakup' })).soz.join(' ')).toContain('Yakup');

  const ile = M.sahneBilgisi(BOLUM23, durum(BOLUM23, { kayikhaneSozu: true }, { tur: 'sahne', id: 'acilis' }));
  expect(ile.paragraflar.join(' ')).toContain('Arif\'in sözü');
  const siz = M.sahneBilgisi(BOLUM23, durum(BOLUM23, {}, { tur: 'sahne', id: 'acilis' }));
  expect(siz.paragraflar.join(' ')).toContain('imece');

  const n = M.sahneBilgisi(BOLUM12, durum(BOLUM12, { gulceSoru: true }, { tur: 'sahne', id: 'namlu' }));
  expect(n.paragraflar.join(' ')).toContain('intikam');
  const im = M.sahneBilgisi(BOLUM12, durum(BOLUM12, { gulceSoru: true, yaliSecim: 'tut' }, { tur: 'sahne', id: 'imza' }));
  expect(im.paragraflar.join(' ')).toContain('Adalet.');
  for (const s of ['namlu', 'imza']) {
    expect(M.sahneBilgisi(BOLUM12, durum(BOLUM12, {}, { tur: 'sahne', id: s })).paragraflar.every((p) => p.length > 0)).toBe(true);
  }
});

test('Nermin\'in ağabeyinin adı her yerde Cevdet', async () => {
  const fs = await import('fs');
  const metin = fs.readFileSync(new URL('../src/hikaye/bolum4.js', import.meta.url), 'utf8');
  expect(metin).toContain('Adı Cevdet');
  const d = durum(BOLUM20, { nerminAgabey: true }, { tur: 'konusma', kisi: 'nermin', dugum: 'cevdet' });
  expect(M.dugumBilgisi(BOLUM20, d).soz.join(' ')).toContain('Gureba');
});

// 10. derinleştirme adımı: hiç okunmayan dört bayrak karşılık buldu.
test('mezar sözü, yarım cümle, Halim\'in sonu ve babanın affı geri döner', async () => {
  const { BOLUM6 } = await import('../src/hikaye/bolum6');
  const { BOLUM10 } = await import('../src/hikaye/bolum10');
  const { BOLUM19 } = await import('../src/hikaye/bolum19');
  const { BOLUM23 } = await import('../src/hikaye/bolum23');
  const safak = (b) => M.sahneBilgisi(BOLUM10, durum(BOLUM10, b, { tur: 'sahne', id: 'safak10' })).paragraflar.join(' ');
  expect(safak({ mezarSozu: 'intikam', delormeSonu: 'tutuklu' })).toContain('hâkimin');
  expect(safak({ mezarSozu: 'intikam', delormeSonu: 'denizde' })).toContain('rahatlatmıyor');
  expect(safak({ mezarSozu: 'huzur' })).toContain('sümbül');
  expect(safak({ mezarSozu: 'sessiz' })).toContain('başını eğmiyorsun');
  expect(M.sahneBilgisi(BOLUM10, durum(BOLUM10, {}, { tur: 'sahne', id: 'safak10' })).paragraflar.every((p) => p.length > 0)).toBe(true);

  const hafiz = (b) => M.dugumBilgisi(BOLUM6, durum(BOLUM6, b, { tur: 'konusma', kisi: 'hafiz', dugum: 'anlat' })).soz;
  expect(hafiz({ yarimCumle: true }).join(' ')).toContain('Kız kardeşin');
  expect(hafiz({}).every((p) => p.length > 0)).toBe(true);

  const ys = (b) => M.dugumBilgisi(BOLUM19, durum(BOLUM19, b, { tur: 'konusma', kisi: 'riza', dugum: 'yakup_son' })).soz.join(' ');
  expect(ys({ halimKarar: 'tutukla' })).toContain('asılı');
  expect(ys({ halimKarar: 'birak' })).toContain('bıçaklı');

  const baba = (b) => M.dugumBilgisi(BOLUM23, durum(BOLUM23, b, { tur: 'konusma', kisi: 'baba23', dugum: 'ilk' })).soz.join(' ');
  expect(baba({ babaAffetti: true })).toContain('Affedilmek zor');
  expect(baba({})).toContain('dinlemeliydim');
});

// 11. derinleştirme adımı: Gülce'ye ilk yalan, kara liste kararı, Rıza'nın yarası.
test('ilk yalan, kara liste ve Rıza\'nın yarası geri döner', async () => {
  const { BOLUM17 } = await import('../src/hikaye/bolum17');
  const { BOLUM23 } = await import('../src/hikaye/bolum23');
  let d = durum(BOLUM23, { gulceYalan: true }, { tur: 'konusma', kisi: 'gulce23', dugum: 'ilk' });
  const sec = M.dugumBilgisi(BOLUM23, d).secenekler.find((x) => x.etiket.includes('yalan'));
  expect(sec).toBeTruthy();
  d = M.secenekSec(BOLUM23, d, sec).durum;
  expect(M.bayrak(d, 'gulceYalanAnildi')).toBe(true);
  expect(M.bayrak(d, 'sofraKonusma') || 0).toBe(0);
  expect(M.dugumBilgisi(BOLUM23, d).secenekler.some((x) => x.etiket.includes('yalan'))).toBe(false);
  const yok = durum(BOLUM23, {}, { tur: 'konusma', kisi: 'gulce23', dugum: 'ilk' });
  expect(M.dugumBilgisi(BOLUM23, yok).secenekler.some((x) => x.etiket.includes('yalan'))).toBe(false);

  const nermin = (b) => M.dugumBilgisi(BOLUM20, durum(BOLUM20, b, { tur: 'konusma', kisi: 'nermin', dugum: 'ilk' })).soz.join(' ');
  expect(nermin({ listeKarar: 'uyar' })).toContain('Hilmi');
  expect(nermin({ listeKarar: 'yak' })).toContain('Malta');
  const riza = (b) => M.dugumBilgisi(BOLUM17, durum(BOLUM17, b, { tur: 'konusma', kisi: 'riza', dugum: 'ilk' })).soz;
  expect(riza({ rizaYarali: true, listeKarar: 'uyar' }).join(' ')).toContain('Yirmi üç');
  expect(riza({ listeKarar: 'yak' }).join(' ')).toContain('Bekirağa');
  expect(riza({}).every((p) => p.length > 0)).toBe(true);
});

test('yalıdaki seçim on dokuzuncu bölümde Gülce\'nin sözünde döner', async () => {
  const { BOLUM19 } = await import('../src/hikaye/bolum19');
  const g = (b) => M.sahneBilgisi(BOLUM19, durum(BOLUM19, b, { tur: 'sahne', id: 'gulce19' })).paragraflar;
  expect(g({ yaliSecim: 'tut' }).join(' ')).toContain('elimi tuttun');
  expect(g({ yaliSecim: 'birak' }).join(' ')).toContain('beni bıraktın');
  expect(g({}).every((p) => p.length > 0)).toBe(true);
});

test('göldeki gece travmaya ve ilk nefese göre', async () => {
  const { BOLUM25 } = await import('../src/hikaye/bolum25');
  const g = (b) => M.sahneBilgisi(BOLUM25, durum(BOLUM25, b, { tur: 'sahne', id: 'gece25' }));
  expect(g({ travma: 3 }).paragraflar.join(' ')).toContain('titremeye');
  expect(g({ ilkNefes: 'say' }).secenekler.length).toBe(3);
  expect(g({}).secenekler.length).toBe(2);
  let d = durum(BOLUM25, { travma: 2 }, { tur: 'sahne', id: 'gece25' });
  d = M.sahneSec(BOLUM25, d, M.sahneBilgisi(BOLUM25, d).secenekler.find((x) => x.etiket.includes('Neslihan'))).durum;
  expect(M.bayrak(d, 'arifGece')).toBe('kardes');
  expect(M.sayi(d, 'travma')).toBe(1);
  expect(M.sahneBilgisi(BOLUM25, d).paragraflar.join(' ')).toContain('Sabaha kadar');
});

// 13. adım: okunmayan seçimler (Hasler, Topal Hasan, Delorme'un kovulması, kafile, Gubler'in listesi, Nermin'in imzası).
test('Hasler Zürih\'te karşına çıkar; mektubu 16. bölümde Gubler\'e karşı kullanılır', async () => {
  const { BOLUM14 } = await import('../src/hikaye/bolum14');
  const { BOLUM16 } = await import('../src/hikaye/bolum16');
  const sehir = (b) => M.mekanBilgisi(BOLUM14, { ...durum(BOLUM14, b, { tur: 'mekan' }), mekan: 'sehir' }).kisiler;
  expect(sehir({ haslerSonu: 'kacti' })).toContain('hasler14');
  expect(sehir({})).not.toContain('hasler14');
  const soz = (b) => M.dugumBilgisi(BOLUM14, durum(BOLUM14, b, { tur: 'konusma', kisi: 'hasler14', dugum: 'ilk' })).soz.join(' ');
  expect(soz({ haslerSonu: 'tutuklu' })).toContain('konsolosluğu');
  expect(soz({ haslerSonu: 'kacti' })).toContain('karda kaybolmuştu');
  let d = { ...durum(BOLUM14, { haslerSonu: 'kacti' }, { tur: 'mekan' }), mekan: 'sehir' };
  d = M.konusmaBaslat(BOLUM14, d, 'hasler14');
  d = M.secenekSec(BOLUM14, d, M.dugumBilgisi(BOLUM14, d).secenekler.find((x) => x.etiket.includes('imzanı'))).durum;
  expect(M.delilVar(d, 'hasler_mektubu')).toBe(true);
  expect(M.sahneBilgisi(BOLUM14, { ...d, gorunum: { tur: 'sahne', id: 'gol' } }).paragraflar.join(' ')).toContain('imzalı kâğıdı');
  expect(sehir({ haslerSonu: 'kacti', haslerKarar: 'yaz' })).not.toContain('hasler14');
  const g = (dl) => M.dugumBilgisi(BOLUM16, { ...durum(BOLUM16, {}, { tur: 'konusma', kisi: 'gubler', dugum: 'ilk' }), deliller: dl }).secenekler.map((x) => x.etiket).join(' | ');
  expect(g(['hasler_mektubu'])).toContain('Hasler');
  expect(g([])).not.toContain('Hasler');
});

test('Topal Hasan depoyu, Delorme kovulmasını, kafile kağnıcıları sonucu hatırlar', async () => {
  const { BOLUM10 } = await import('../src/hikaye/bolum10');
  const { BOLUM18 } = await import('../src/hikaye/bolum18');
  const hasan = (b) => M.dugumBilgisi(BOLUM10, durum(BOLUM10, b, { tur: 'konusma', kisi: 'hasan', dugum: 'ilk' })).soz.join(' ');
  expect(hasan({ sevkiyatSonuc: 'yarim', hamalBag: 1 })).toContain('mavna yandı');
  expect(hasan({ sevkiyatSonuc: 'yarim', hamalBag: 1 })).toContain('kimse yaralanmadı');
  expect(hasan({ sevkiyatSonuc: 'tam' })).toContain('hepsi yakalandı');
  const kule = (b) => M.sahneBilgisi(BOLUM10, durum(BOLUM10, b, { tur: 'sahne', id: 'kule' })).paragraflar.join(' ');
  expect(kule({ delormeKovuldu: true })).toContain('sahte defterin');
  expect(kule({})).not.toContain('sahte defterin');
  const ac = (b) => M.sahneBilgisi(BOLUM18, durum(BOLUM18, b, { tur: 'sahne', id: 'acilis' })).paragraflar.join(' ');
  expect(ac({ kafileSonu: 'perisan' })).toContain('donmuştu');
  expect(ac({ kafileSonu: 'saglam' })).toContain('sağ salim');
});

test('Gubler listeyi nasıl aldığını, Neslihan sofradaki öfkesini hatırlar', async () => {
  const { BOLUM24 } = await import('../src/hikaye/bolum24');
  const s = (id, b) => M.sahneBilgisi(BOLUM24, durum(BOLUM24, b, { tur: 'sahne', id })).paragraflar.join(' ');
  expect(s('gubler24', { listeYolu: 'para' })).toContain('çek');
  expect(s('gubler24', { listeYolu: 'hirsiz' })).toContain('Ödeştik');
  expect(s('gubler24', { listeYolu: 'hasler' })).toContain('korkak hekim');
  expect(s('mektup24', { neslihanOfke: true })).toContain('buna değer mi');
});

test('Nermin bağı yüksekse Cenevre yazısını kendi adıyla imzalamayı sorar; telgrafı Süleyman\'ın cenazesine gelir', async () => {
  const { BOLUM30 } = await import('../src/hikaye/bolum30');
  const { BOLUM32 } = await import('../src/hikaye/bolum32');
  const sec = (b) => M.dugumBilgisi(BOLUM30, durum(BOLUM30, b, { tur: 'konusma', kisi: 'nermin30', dugum: 'ilk' })).secenekler;
  expect(sec({ nerminBag: 3 }).find((x) => x.etiket.startsWith('Yaz')).sonra).toBe('imza');
  expect(sec({ nerminBag: 1 }).find((x) => x.etiket.startsWith('Yaz')).sonra).toBeUndefined();
  let d = durum(BOLUM30, { nerminBag: 3, madalya: 'anlat' }, { tur: 'konusma', kisi: 'nermin30', dugum: 'ilk' });
  d = M.secenekSec(BOLUM30, d, sec({ nerminBag: 3 }).find((x) => x.etiket.startsWith('Yaz'))).durum;
  expect(M.dugumBilgisi(BOLUM30, d).soz.join(' ')).toContain('madalyası');
  d = M.secenekSec(BOLUM30, d, M.dugumBilgisi(BOLUM30, d).secenekler.find((x) => x.etiket.includes('Kendi adınla'))).durum;
  expect(M.bayrak(d, 'nerminImza')).toBe('ad');
  expect(M.bayrak(d, 'nerminYazdi')).toBe(true);
  const v = (b) => M.sahneBilgisi(BOLUM32, durum(BOLUM32, b, { tur: 'sahne', id: 'vasiyet32' })).paragraflar.join(' ');
  expect(v({ nerminImza: 'ad' })).toContain('jandarma');
  expect(v({ nerminImza: 'takma' })).toContain('imzasız');
  expect(v({ haticeSonu: 'sessiz' })).toContain('hangi gemide');
  expect(v({ haticeSonu: 'mektup' })).toContain('fındık');
  const k = (b) => M.sahneBilgisi(BOLUM32, durum(BOLUM32, { suleymanSon: 'sus', ...b }, { tur: 'sahne', id: 'kayik32_son' })).paragraflar.join(' ');
  expect(k({ cemilSuleyman: true })).toContain('İzmir inciri');
  expect(k({})).not.toContain('İzmir inciri');
});

// 14. adım: ikinci nefes, Kessler'e verilen isim, köşkteki son seçim, Rivière'e sorulan soru, ayva, Nermin'in ilk günü, Hüsnü.
test('morgdaki nefes sayma 18. bölümde nöbette seçenek olur', async () => {
  const { BOLUM18 } = await import('../src/hikaye/bolum18');
  const s = (b) => M.sahneBilgisi(BOLUM18, durum(BOLUM18, b, { tur: 'sahne', id: 'nobet' })).secenekler;
  expect(s({ ikinciNefes: 'say' }).length).toBe(3);
  expect(s({ ikinciNefes: 'kapat' }).length).toBe(2);
  let d = durum(BOLUM18, { ikinciNefes: 'say', travma: 2 }, { tur: 'sahne', id: 'nobet' });
  d = M.sahneSec(BOLUM18, d, s({ ikinciNefes: 'say' }).find((x) => x.etiket.includes('Morgdaki'))).durum;
  expect(M.sayi(d, 'travma')).toBe(1);
  expect(M.bayrak(d, 'nobetAtlatildi')).toBe(true);
});

test('eski seçimler sonraki sahnelerde anılır', async () => {
  const B = Object.fromEntries(await Promise.all([10, 14, 15, 21, 30, 32].map(async (n) => [n, (await import('../src/hikaye/bolum' + n))['BOLUM' + n]])));
  const p = (n, id, b) => M.sahneBilgisi(B[n], durum(B[n], b, { tur: 'sahne', id })).paragraflar.join(' ');
  expect(p(15, 'acilis', { isimVerildi: true })).toContain('müsteşarı');
  expect(p(15, 'acilis', {})).not.toContain('müsteşarı');
  expect(p(10, 'kule', { sonSecim: 'atil' })).toContain('Bu iz senden');
  expect(p(10, 'kule', { sonSecim: 'kac' })).toContain('pencereden');
  expect(p(14, 'mektup', { babaSoruldu: true })).toContain('yarısını söyledi');
  expect(p(14, 'mektup', { talimatSoruldu: true })).toContain('Kurtulamamış');
  expect(p(21, 'cocuk', { ayvaAnlatildi: true })).toContain('Hotel Olympos');
  expect(p(32, 'vasiyet32', { husnuGuven: 1 })).toContain('Yalan değilmiş');
  expect(p(32, 'vasiyet32', { husnuKustu: true })).toContain('yakasından');
  const imza = (b) => M.dugumBilgisi(B[30], durum(B[30], b, { tur: 'konusma', kisi: 'nermin30', dugum: 'imza' })).soz.join(' ');
  expect(imza({ nerminSivri: true })).toContain('Nişantaşı');
  expect(imza({ nermineAnlatti: false })).toContain('jetonu');
  expect(imza({ nermineAnlatti: true })).not.toContain('jetonu');
});

// 15. adım: kuruluş defterinin sonu (25) → 27 ve 30; madalya (3, 23, 25) → 32.
test('kuruluş defterinin sonu Fikri\'nin sorgusunda ve Cenevre\'de döner', async () => {
  const { BOLUM27 } = await import('../src/hikaye/bolum27');
  const { BOLUM30 } = await import('../src/hikaye/bolum30');
  const et = (b) => M.dugumBilgisi(BOLUM27, durum(BOLUM27, b, { tur: 'konusma', kisi: 'fikri', dugum: 'ilk' })).secenekler.map((x) => x.etiket).join(' | ');
  expect(et({ defterSonu: 'gazete' })).toContain('gazetelerde');
  expect(et({ defterSonu: 'yak' })).toContain('yaktık');
  expect(et({ defterSonu: 'arsiv' })).not.toContain('gazetelerde');
  const ac = (b) => M.sahneBilgisi(BOLUM30, durum(BOLUM30, b, { tur: 'sahne', id: 'acilis' }));
  expect(ac({ defterSonu: 'arsiv' }).paragraflar.join(' ')).toContain('Federal Arşiv');
  let d = durum(BOLUM30, { defterSonu: 'gazete' }, { tur: 'sahne', id: 'acilis' });
  d = M.sahneSec(BOLUM30, d, ac({ defterSonu: 'gazete' }).secenekler[0]).durum;
  expect(M.sayi(d, 'ikna')).toBe(1);
});

test('madalya Süleyman\'ın cenazesinden önce sandıktan çıkar', async () => {
  const { BOLUM32 } = await import('../src/hikaye/bolum32');
  const son = (b) => M.sahneBilgisi(BOLUM32, durum(BOLUM32, { suleymanSon: 'sus', ...b }, { tur: 'sahne', id: 'kayik32_son' })).secenekler;
  expect(son({ madalya: 'anlat' })[0].sonra).toBe('madalya32');
  expect(son({})[0].sonra).toBe('vasiyet32');
  const m = (b) => M.sahneBilgisi(BOLUM32, durum(BOLUM32, b, { tur: 'sahne', id: 'madalya32' }));
  expect(m({ madalya: 'sakla' }).paragraflar.join(' ')).toContain('yarısını');
  let d = durum(BOLUM32, { madalya: 'anlat', travma: 2 }, { tur: 'sahne', id: 'madalya32' });
  d = M.sahneSec(BOLUM32, d, m({ madalya: 'anlat' }).secenekler.find((x) => x.etiket.startsWith('Kefenin'))).durum;
  expect(M.bayrak(d, 'madalyaSonu')).toBe('mezar');
  expect(M.sayi(d, 'travma')).toBe(1);
  expect(M.sahneBilgisi(BOLUM32, d).paragraflar.join(' ')).toContain('kefenin içinde');
});

// 16. adım: madalya (32) → 34; İzmir yangını (21) → 35; Tevfik (33) → 37; Lozan (22), Bruno (28), Rahel (31),
// kaptanın son gecesi (32) → 38.
const konusmaYolu = (B, bayraklar, kisi, dugum, etiketler) => {
  let d = durum(B, bayraklar, { tur: 'konusma', kisi, dugum });
  const sozler = [];
  let cevap = [];
  for (const e of etiketler) {
    const bilgi = M.dugumBilgisi(B, d);
    sozler.push([].concat(bilgi.soz).join(' '));
    const s = bilgi.secenekler.find((x) => x.etiket.startsWith(e));
    if (!s) throw new Error('seçenek yok: ' + e + ' / ' + bilgi.secenekler.map((x) => x.etiket).join(' | '));
    const r = M.secenekSec(B, d, s);
    d = r.durum;
    cevap = cevap.concat(r.cevap);
  }
  if (d.gorunum.tur === 'konusma') sozler.push([].concat(M.dugumBilgisi(B, d).soz).join(' '));
  return { d, metin: sozler.concat(cevap).join(' ') };
};

test('Nermin Ankara\'da madalyanın öbür yarısını sorar', async () => {
  const { BOLUM34 } = await import('../src/hikaye/bolum34');
  const s = konusmaYolu(BOLUM34, { madalyaSonu: 'nermin', travma: 2 }, 'nermin34', 'sonra', ['Madalyayı sor', 'Anlat ona']);
  expect(s.metin).toContain('Seddülbahir\'de değildim');
  expect(M.bayrak(s.d, 'nerminMadalya')).toBe('anlat');
  expect(M.sayi(s.d, 'travma')).toBe(1);
  expect(konusmaYolu(BOLUM34, { madalyaSonu: 'mezar' }, 'nermin34', 'sonra', ['Madalyayı sor']).metin).toContain('kefenine');
  const yok = M.dugumBilgisi(BOLUM34, durum(BOLUM34, {}, { tur: 'konusma', kisi: 'nermin34', dugum: 'sonra' })).secenekler;
  expect(yok.some((x) => x.etiket.startsWith('Madalyayı'))).toBe(false);
});

test('Neslihan İzmir\'de yangın gecesini anar', async () => {
  const { BOLUM35 } = await import('../src/hikaye/bolum35');
  const y = (b, e) => konusmaYolu(BOLUM35, b, 'neslihan35', 'sonra', ['Kordon', e]);
  expect(y({ yanginAni: 'cemil' }, 'Geç').metin).toContain('Cemil Bey\'in sesine');
  expect(y({ yanginAni: 'yalniz' }, 'Geç').metin).toContain('dönmedin');
  const s = y({ yanginAni: 'neslihan' }, 'Ona sor');
  expect(s.metin).toContain('Bir kızın elini tuttum');
  expect(M.bayrak(s.d, 'izmirAni')).toBe('sor');
});

test('Gülce Tevfik\'in sessizliğini anlatır', async () => {
  const { BOLUM37 } = await import('../src/hikaye/bolum37');
  const t = (b, e) => konusmaYolu(BOLUM37, b, 'gulce37', 'ilk', ['Tevfik', e]);
  expect(t({ gulceSon33: 'bildi' }, 'Bir mektup').metin).toContain('Mudanya damgalı');
  const s = t({ gulceSon33: 'el', gulceGuven: 1 }, 'Onu kayıkhanenin');
  expect(s.metin).toContain('Bir el yeter mi');
  expect(M.bayrak(s.d, 'gulceTevfik37')).toBe('sofra');
  expect(M.sayi(s.d, 'gulceGuven')).toBe(2);
});

test('Zürih\'te Lozan, Bruno, Rahel ve kaptanın son gecesi', async () => {
  const { BOLUM38, agirlik38 } = await import('../src/hikaye/bolum38');
  const l = konusmaYolu(BOLUM38, { tazminatSonu: 'red' }, 'klara38', 'ilk', ['Lozan', 'Avukattın', 'Sen konuş']);
  expect(l.metin).toContain('rahat uyudum');
  expect(agirlik38(l.d)).toBe(1);
  const n = konusmaYolu(BOLUM38, { brunoSonu: 'kavga', rahelCevap: 'arif' }, 'neslihan38', 'ilk', ['Yarın', 'Yalnız']);
  expect(n.metin).toContain('ellerin titriyordu');
  expect(n.metin).toContain('benim cevabımı vermedim');
  const yok = M.dugumBilgisi(BOLUM38, n.d.gorunum.tur === 'konusma' ? n.d : durum(BOLUM38, {}, { tur: 'konusma', kisi: 'neslihan38', dugum: 'yarin' })).secenekler;
  expect(yok.some((x) => x.etiket.startsWith('Rahel'))).toBe(false);
  let d = { ...M.yeniDurum(BOLUM38), bayraklar: { konusmaci38: 'neslihan', neslihanRahel: 'ad' }, gorunum: { tur: 'sahne', id: 'genel38' } };
  expect(agirlik38(d)).toBe(1);
  expect(M.sahneBilgisi(BOLUM38, d).paragraflar.join(' ')).toContain('altı ad söylüyor');
  const r = konusmaYolu(BOLUM38, { suleymanSon: 'ninni', arifCevap: 'kaptan', rizaBag: 1 }, 'riza38', 'ilk', ['Kaptanı', 'Son bir']);
  expect(r.metin).toContain('ninni söylemişti');
  expect(r.metin).toContain('İskelede yalnız');
  expect(M.bayrak(r.d, 'rizaKar')).toBe('yol');
  expect(M.sayi(r.d, 'rizaBag')).toBe(2);
});
