// 3.16: kısa gün (nöbet 10 dakika), her yerden dinlenme ve evrensel zaman sarma
import { describe, expect, test } from 'bun:test';
import { yeniOyun } from '../src/oyun/durum';
import * as G from '../src/oyun/gemi/gemi';
import * as KM from '../src/oyun/komuta';
import { zamanSar, dinlen, dinlenMenu, dinlenmeEngeli } from '../src/oyun/yuzey/gorevler';
import { NOBET_SN, GUN_SN, nobetNo } from '../src/oyun/zaman';

function koloni(tohum, filo) {
  const d = yeniOyun(tohum);
  d.sahne = null;
  Object.assign(d.bayrak, { sondaj: true, kazi: true, dokumhane: true, kule: true });
  G.gemiOlustur(d, 1);
  if (filo) d.filo = [{ sinif: 2, ad: 'yedek' }];
  for (const r of Object.keys(d.koloni.kaynaklar)) d.koloni.kaynaklar[r] = 40;
  const k = KM.komuta(d);
  k.sektor.guney = { durum: 'guvenli', karakol: null };
  k.sektor.dogu = { durum: 'dusman', karakol: null };
  return d;
}

describe('Yıldız Zamanı ve dinlenme', () => {
  test('gün bir saat: altı nöbet × on dakika', () => {
    expect(NOBET_SN).toBe(600);
    expect(GUN_SN).toBe(3600);
  });
  test('bir sonraki nöbete ve seçilen nöbete dinlenilir', () => {
    const d = koloni(3);
    d.mekan = 'vadi';
    const n0 = nobetNo(d);
    const r = dinlen(d, null);
    expect(r.kapat).toBe(true);
    expect(nobetNo(d)).toBe((n0 + 1) % 6);
    const m = dinlenMenu(d);
    expect(m.ogeler.length).toBe(6);
    m.ogeler[3].yap(d); // dört nöbet sonrası
    expect(nobetNo(d)).toBe((n0 + 5) % 6);
  });
  test('tehlikeli yerde, uzayda, iş ortasında dinlenilmez', () => {
    const d = koloni(3);
    d.mekan = 'sirtlar';
    expect(dinlenmeEngeli(d)).toContain('tehlikeli');
    d.mekan = 'vadi';
    d.uzay = { x: 0, y: 0, yon: 0, hiz: 0 };
    expect(dinlenmeEngeli(d)).toContain('uzay');
    d.uzay = null;
    d.savasBekle = 'korsan_avci';
    expect(dinlen(d, null).ses).toBe('red');
  });
  test('dinlenme baskın gelince kesilir', () => {
    const d = koloni(7);
    d.mekan = 'vadi';
    KM.komuta(d).sonrakiBaskin = ((d.zaman && d.zaman.sn) || 0) + 30;
    const r = dinlen(d, (nobetNo(d) + 5) % 6);
    expect(r.metin).toContain('yarıda kesildi');
    expect(KM.komuta(d).baskinlar.length).toBe(1);
  });
  test('zorunlu sarmada (yolculuk) yedek gemi baskını kendiliğinden püskürtür; yoksa yağma ve özet haberi', () => {
    for (const filo of [true, false]) {
      const d = koloni(11, filo);
      d.bayrak.tonoflenyada = true;
      KM.komuta(d).sonrakiBaskin = 10;
      const moral = d.koloni.moral;
      zamanSar(d, 2 * NOBET_SN);
      const h = (d.haberKuyrugu || []).join(' ');
      expect(h).toContain('Yokluğunda');
      if (filo) {
        expect(h).toContain('Sen uzaktayken');
        expect(d.koloni.moral).toBeGreaterThanOrEqual(moral);
      } else expect(h).toContain('yağmalandı');
    }
  });
  test('sarma sırasında yerel operasyon donar', () => {
    const d = koloni(5);
    d.mini = { aktif: 'mantar_hasadi', bekle: 0, spor: 10, olgunluk: 0.5 };
    zamanSar(d, NOBET_SN);
    expect(d.mini.spor).toBe(10);
    expect(d.mini.aktif).toBe('mantar_hasadi');
  });
});
