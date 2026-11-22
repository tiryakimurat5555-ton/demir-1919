// v4 Faz 5 (3.8): bölgesel geçit kuralları, dört bölge × üç aşama, Büyük Tonoflenya Ambargosu
import { describe, expect, test } from 'bun:test';
import { yeniOyun } from '../src/oyun/durum';
import * as G from '../src/oyun/gemi/gemi';
import * as SV from '../src/oyun/uzay/savas';
import * as AT from '../src/oyun/tonoflenya/atlas';
import * as BL from '../src/oyun/tonoflenya/bolgesel';
import * as KR from '../src/oyun/tonoflenya/karakter';
import * as ZN from '../src/oyun/tonoflenya/zanaat';
import * as HK from '../src/oyun/hikaye';
import { sahneSec, sahneSecenekleri } from '../src/oyun/yuzey/gorevler';

function hazir(t = 80) {
  const d = yeniOyun(t);
  d.sahne = null;
  G.gemiOlustur(d, 3);
  Object.assign(d.bayrak, { tonoflenyaGoruldu: true, tonoflenyada: true, ygkKayit: true, aetherKayigi: true });
  d.tf = { aktif: null, evre: null, biten: [1], karar: {}, rez: [], catlak: 0, unvan: [], guven: { kefius: 0, valen: 0, halk: 0 } };
  ZN.hazirla(d);
  d.mekan = 'ygk_1';
  d.tBolge = 'ygk';
  HK.hikaye(d).biten.zirve_ignesi = -1; // 4B bu testin konusu değil
  return d;
}
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
function cagri(d, id) {
  for (let i = 0; i < 6 && !d.sahne; i++) HK.hikayeIlerle(d);
  expect(HK.hikaye(d).aktif).toBe(id);
}

describe('Bölgesel görevler ve ambargo', () => {
  test('geçit kuralları: Final 1, Tentran harcı, Arin', () => {
    const d = hazir();
    d.tf.biten = [];
    expect(AT.seyahatEt(d, 'magentor').ses).toBe('red');
    d.tf.biten = [1];
    d.koloni.kaynaklar.isik_tozu = 0;
    expect(AT.seyahatEt(d, 'tentran').metin).toContain('ışık tozu harcı');
    d.koloni.kaynaklar.isik_tozu = 100;
    AT.seyahatEt(d, 'tentran');
    expect(d.koloni.kaynaklar.isik_tozu).toBe(60);
    d.sahne = null;
    d.bayrak.arinKapali = true;
    expect(AT.seyahatEt(d, 'arin').metin).toContain('Atmosphere-X');
  });

  test('Oronte zinciri: üç aşama, taslak ve mekik açılır', () => {
    const d = hazir(81);
    expect(BL.mekikKilidi(d, 'oronte')).toContain('zinciri');
    d.tBolge = 'filtra';
    cagri(d, 'bl_oronte_1');
    oyna(d);
    expect(HK.bittiMi(d, 'bl_oronte_1')).toBe(true);
    d.tf.biten.push(2, 3, 4, 5, 6);
    cagri(d, 'bl_oronte_2');
    oyna(d, 1);
    expect(d.bayrak.oronteKus).toBe(true);
    expect(ZN.TARIFLER.civa_plakasi.kosul(d)).toBe(false);
    d.tf.biten.push(7, 8, 9, 10);
    cagri(d, 'bl_oronte_3');
    oyna(d);
    expect(d.bayrak.mekik_oronte).toBe(true);
    expect(ZN.TARIFLER.civa_plakasi.kosul(d)).toBe(true);
    expect(BL.mekikKilidi(d, 'oronte')).toBeNull();
  });

  test('Barracuda\'yı korumak Arin hava sahasını kapatır', () => {
    const d = hazir(82);
    d.tBolge = 'fleeplee';
    cagri(d, 'bl_barracuda_1');
    oyna(d);
    d.tf.biten.push(2, 3, 4, 5, 6);
    cagri(d, 'bl_barracuda_2');
    oyna(d, 1);
    expect(d.bayrak.arinKapali).toBe(true);
  });

  test('ambargo: merkez askıya alır ve takviye; taşra Magentor\'u kapatır, Kör Rıhtım', () => {
    const a = hazir(83);
    a.tf.biten = Array.from({ length: 12 }, (_, i) => i + 1);
    cagri(a, 'bl_ambargo');
    oyna(a, 0);
    expect(a.bayrak.ambargo).toBe('merkez');
    expect(['oronte', 'barracuda']).toContain(a.bayrak.ambargoAski);
    expect(BL.mekikKilidi(a, a.bayrak.ambargoAski)).toContain('askıda');
    a.tf.aktif = 17;
    const o = SV.savasBaslat(a, 'golge_gemisi');
    expect(o[0].soz).toContain('Büyük Ambargo');

    const b = hazir(84);
    b.tf.biten = Array.from({ length: 12 }, (_, i) => i + 1);
    cagri(b, 'bl_ambargo');
    oyna(b, 1);
    expect(b.bayrak.ambargo).toBe('tasra');
    b.tf.biten.push(13, 14, 15, 16, 17);
    b.mekan = 'halka_zhaor';
    b.tBolge = 'magentor';
    b.tBolge = 'loran';
    b.mekan = AT.BOLGELER.loran.giris;
    expect(AT.seyahatEt(b, 'magentor').metin).toContain('Ambargo');
    b.tBolge = 'magentor';
    b.mekan = AT.BOLGELER.magentor.giris;
    AT.seyahatEt(b, 'ygk');
    expect(b.mekan).toBe('ygk_m1');
  });
});
