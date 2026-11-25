// 5.7: kapsüle kendiliğinden yürüyüş hava kilidine, tersanede onarım, eksiye düşmeyen ambar, Xerad Sınıf II
import { describe, expect, test } from 'bun:test';
import { yeniOyun } from '../src/oyun/durum';
import { ilerle, otoBaslat, yerlerListesi } from '../src/oyun/yuzey/dunya';
import { KAPILAR, NOKTALAR } from '../src/oyun/yuzey/harita';
import { zamanIlerle } from '../src/oyun/yuzey/gorevler';
import { gemiOlustur } from '../src/oyun/gemi/gemi';
import { UZAY_NOKTALARI } from '../src/oyun/uzay/seyir';
import { DONANIMLAR } from '../src/oyun/veri/donanim';
import { MEKANLAR } from '../src/oyun/yuzey/harita';

const yuru = (d, h) => {
  otoBaslat(d, h);
  const o = [];
  for (let i = 0; i < 2000 && d.oto; i++) o.push(...ilerle(d, {}, 0.1));
  return o;
};

describe('kapsüle yürüyüş', () => {
  for (const [ad, x, y] of [['güney', 0, -30], ['batı', -30, 0], ['doğu', 30, 2], ['kuzey', 2, 30], ['güneydoğu yakın', 3, -4]]) {
    test(ad + ' yönünden hava kilidinin önüne varır', () => {
      const d = yeniOyun(3);
      d.mekan = 'vadi';
      d.oyuncu = { x, y, yon: 0 };
      const h = yerlerListesi(d, true).find((z) => z.id === 'kapsul_dis');
      expect(h).toBeTruthy();
      const o = yuru(d, h);
      expect(o.some((x) => x.tur === 'otoVardi')).toBe(true);
      const kilit = KAPILAR.kapsul_kilit.uclar[0];
      expect(Math.hypot(d.oyuncu.x - kilit.x, d.oyuncu.y - kilit.y)).toBeLessThanOrEqual(1.25);
      // Yüzü kapsüle dönük
      const n = NOKTALAR.kapsul_dis;
      const aci = Math.atan2(n.x - d.oyuncu.x, n.y - d.oyuncu.y);
      expect(Math.abs(Math.atan2(Math.sin(aci - d.oyuncu.yon), Math.cos(aci - d.oyuncu.yon)))).toBeLessThan(0.3);
    });
  }
  test('kapsülün içindeki terminale vadiden yürüyüş kilitten geçer', () => {
    const d = yeniOyun(3);
    d.mekan = 'vadi';
    d.oyuncu = { x: 0, y: -30, yon: 0 };
    const h = yerlerListesi(d, true).find((z) => z.id === 'terminal');
    yuru(d, h);
    expect(d.mekan).toBe('kapsul');
  });
});

describe('tutarlılık', () => {
  test('kızaktaki hasarlı gemi tersanede onarılır', () => {
    const d = yeniOyun(4);
    d.koloni.binalar.push('tersane');
    gemiOlustur(d, 1);
    d.gemi.yer = 'kizak';
    d.gemi.govde = 1;
    for (let i = 0; i < 200; i++) zamanIlerle(d, 1);
    expect(d.gemi.govde).toBe(d.gemi.maxGovde);
  });
  test('ambar eksiye düşmez', () => {
    const d = yeniOyun(4);
    d.koloni.kaynaklar.saf_aether = -50;
    d.koloni.kaynaklar.kriyolit = -5;
    zamanIlerle(d, 1);
    expect(d.koloni.kaynaklar.saf_aether).toBe(0);
    expect(d.koloni.kaynaklar.kriyolit).toBe(0);
  });
  test('Xerad Sınıf II gemiyle yapılabilir; donanımları Sınıf II\'ye takılır', () => {
    expect(UZAY_NOKTALARI.xerad.sinif).toBe(2);
    expect(DONANIMLAR.asiri_iyon.minSinif).toBe(2);
    expect(DONANIMLAR.biyo_stabilizasyon.minSinif).toBe(2);
  });
  test('kraterde eski ortam (sera ve vaha müziği değil)', () => {
    expect(MEKANLAR.krater.ortam).toBe('ortam_yuzey');
    expect(MEKANLAR.kseno_lab.ortam).toBe('ortam_harabe');
    expect(MEKANLAR.mabet.ortam).toBe('ortam_harabe');
  });
});
