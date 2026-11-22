// v4 Faz 5 (3.6): YGK Akademi gezilebilir katlar, on kürsü testi, dört kilit figür ve stasis tutsakları
import { describe, expect, test } from 'bun:test';
import { yeniOyun } from '../src/oyun/durum';
import * as G from '../src/oyun/gemi/gemi';
import * as SV from '../src/oyun/uzay/savas';
import * as AK from '../src/oyun/tonoflenya/akademi';
import * as FN from '../src/oyun/tonoflenya/final';
import * as ZN from '../src/oyun/tonoflenya/zanaat';
import * as HK from '../src/oyun/hikaye';
import { MEKANLAR, NOKTALAR } from '../src/oyun/yuzey/harita';
import { noktaEylemleri, eylemUygula, sahneSec, sahneSecenekleri } from '../src/oyun/yuzey/gorevler';

function akademide(t = 60) {
  const d = yeniOyun(t);
  d.sahne = null;
  G.gemiOlustur(d, 3);
  Object.assign(d.bayrak, { tonoflenyaGoruldu: true, tonoflenyada: true, ygkKayit: true });
  FN.tf(d);
  return d;
}
// Hikâyeyi oynar: operasyonlar kazanılmış, savaşlar zaferle; kararlarda secim
function oyna(d, secim = 0) {
  for (let i = 0; i < 40 && d.sahne; i++) {
    const sc = sahneSecenekleri(d, d.sahne);
    sahneSec(d, d.sahne, d.sahne === 'hk_karar' ? Math.min(secim, sc.length - 1) : 0);
    if (d.opBekle) {
      d.opBekle = null;
      d.sahne = 'hk_ara';
    }
    if (d.savasBekle) {
      const sb = d.savasBekle;
      d.savasBekle = null;
      SV.savasBaslat(d, sb);
      for (let k = 0; k < 300 && d.savas; k++) {
        d.savas.dusman.govde = 1;
        d.savas.dusman.aci = 0;
        d.savas.uyari = null;
        d.savas.sizma = false;
        SV.savasGirdi(d, { tur: 'dokun', parmak: 1 });
        if (d.savas) SV.savasIlerle(d, 0.1);
      }
    }
    if (d.sahne === 'hk_sonuc') {
      sahneSec(d, 'hk_sonuc', 0);
      break;
    }
  }
}

describe('YGK Akademi', () => {
  test('noktalar kendi katlarında; katlar belgedeki adlarla', () => {
    for (const [id, n] of Object.entries(AK.AK_NOKTALAR)) {
      const a = MEKANLAR[n.mekan].alan;
      expect(n.x >= a.bati && n.x <= a.dogu && n.y >= a.guney && n.y <= a.kuzey).toBe(true);
      expect(NOKTALAR[id]).toBeTruthy();
    }
    expect(MEKANLAR.ygk_m4.ad).toContain('Stasis');
    expect(MEKANLAR.ygk_1.ad).toContain('Talimgâhı');
  });

  test('katlar ana görevlerle açılır', () => {
    const d = yeniOyun(61);
    d.bayrak.tonoflenyaGoruldu = true;
    FN.tf(d);
    expect(AK.katKilidi(d, 'ygk_5')).toBeNull();
    expect(AK.katKilidi(d, 'ygk_1')).toBeNull();
    expect(AK.katKilidi(d, 'ygk_6')).toBeTruthy();
    d.bayrak.ygkKayit = true;
    expect(AK.katKilidi(d, 'ygk_6')).toBeNull();
    expect(AK.katKilidi(d, 'ygk_3')).toBeTruthy();
    d.tf.biten = [1, 2];
    expect(AK.katKilidi(d, 'ygk_3')).toBeNull();
    expect(AK.katKilidi(d, 'ygk_m3')).toBeNull(); // Final 3'ün yeri
    expect(AK.katKilidi(d, 'ygk_m2')).toBeTruthy();
    d.tf.biten.push(3);
    expect(AK.katKilidi(d, 'ygk_m2')).toBeNull();
    expect(AK.katKilidi(d, 'ygk_m4')).toBeTruthy();
    d.tf.biten.push(13);
    expect(AK.katKilidi(d, 'ygk_m4')).toBeNull();
    // Asansör kilitli kata indirmez
    d.mekan = 'ygk_5';
    const r = eylemUygula(d, 'asansor_ygk_5', 'kat_ygk_m5');
    expect(r.ses).toBe('red');
  });

  test('on kürsü testi: hepsi oynanır, ekol kıdemi ve etkiler', () => {
    const d = akademide(62);
    d.tf.biten = [1, 2, 3, 4, 5, 6];
    const ekol0 = JSON.stringify(d.ekol || {});
    for (const id of ['korvinus', 'silas', 'forges', 'jolkar', 'faelan', 'trellis', 'seraphine', 'caelum', 'kaelis', 'zeva']) {
      const n = 'ak_' + id;
      const e = noktaEylemleri(d, n).find((x) => x.id === 'ak_test');
      expect(e).toBeTruthy();
      eylemUygula(d, n, 'ak_test');
      expect(d.sahne).toBe('hk_giris');
      oyna(d);
      expect(d.bayrak[n]).toBe(true);
      expect(noktaEylemleri(d, n).some((x) => x.id === 'ak_test')).toBe(false);
    }
    expect(JSON.stringify(d.ekol)).not.toBe(ekol0);
    expect(d.tarim.tohumlar.kukurt_sarmasigi).toBeGreaterThanOrEqual(2);
    // Caelum: sıçrama yüzde yirmi kısa
    const s0 = ZN.sicramaSuresi(yeniOyun(1));
    expect(ZN.sicramaSuresi(d)).toBeCloseTo(s0 * 0.8, 3);
  });

  test('testler belgedeki görevlerden önce kilitli', () => {
    const d = akademide(63);
    const r = eylemUygula(d, 'ak_jolkar', 'ak_test');
    expect(r.ses).toBe('red');
    expect(d.sahne).toBeFalsy();
  });

  test('Ignador darbesi: Valen stasise, Morvenna yönetir; ya da Ignador kırgın', () => {
    const a = akademide(64);
    a.tf.biten = [1];
    expect(noktaEylemleri(a, 'k_ignador').some((e) => e.id === 'akd_reform')).toBe(true);
    eylemUygula(a, 'k_ignador', 'akd_reform');
    oyna(a, 0);
    expect(a.bayrak.valenKapali).toBe(true);
    expect(eylemUygula(a, 'k_valen', 'konus').metin).toContain('stasis');
    const b = akademide(65);
    b.tf.biten = [1];
    eylemUygula(b, 'k_ignador', 'akd_reform');
    oyna(b, 1);
    expect(b.bayrak.ignadorKirgin).toBe(true);
    expect(b.bayrak.valenKapali).toBeFalsy();
  });

  test('Tixie: çip T-03\'ü açar; ihbar kaçırır', () => {
    const d = akademide(66);
    expect(ZN.TARIFLER.cep_ambar.kosul(d)).toBe(false);
    eylemUygula(d, 'ak_cip', 'ak_al');
    expect(noktaEylemleri(d, 'k_tixie').some((e) => e.id === 'akd_cip')).toBe(true);
    eylemUygula(d, 'k_tixie', 'akd_cip');
    expect(ZN.TARIFLER.cep_ambar.kosul(d)).toBe(true);
    const e = akademide(67);
    eylemUygula(e, 'k_tixie', 'akd_ihbar');
    expect(noktaEylemleri(e, 'k_tixie').map((x) => x.id)).toEqual(['incele']);
  });

  test('stasis: Zephyra Fırtına Kalkanı; Morwenna Sharon\'u zayıflatır', () => {
    const d = akademide(68);
    eylemUygula(d, 'ak_zephyra', 'ak_hucre');
    oyna(d, 0);
    expect(ZN.miktar(d, 'firtina_kalkani')).toBe(1);
    eylemUygula(d, 'ak_morwenna', 'ak_hucre');
    oyna(d, 0);
    expect(d.bayrak.morwennaYanda).toBe(true);
    // Kefius güveni: Sharon kalkanı zayıf başlar
    const a = yeniOyun(69);
    SV.savasBaslat(a, 'lord_sharon');
    const k0 = a.savas.dusman.kalkan;
    const b = yeniOyun(69);
    FN.tf(b).guven.kefius = 40;
    const o = SV.savasBaslat(b, 'lord_sharon');
    expect(b.savas.dusman.kalkan).toBeCloseTo(k0 * 0.8, 2);
    expect(o[0].soz).toContain('Kefius');
  });
});
