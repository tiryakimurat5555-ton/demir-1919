// v4 Aşama 4 (3.5): 4A Final #1 ödülü, 4B Zirve İğnesi, Final #16 gizli geçit, #17 → #18 karar bağları, Lord Sharon ve
// Cahelon aşama kancaları, Pyros-Prime'da Xarathia
import { describe, expect, test } from 'bun:test';
import { yeniOyun } from '../src/oyun/durum';
import * as G from '../src/oyun/gemi/gemi';
import * as SV from '../src/oyun/uzay/savas';
import * as FN from '../src/oyun/tonoflenya/final';
import * as ZN from '../src/oyun/tonoflenya/zanaat';
import * as KR from '../src/oyun/tonoflenya/kronik';
import * as HK from '../src/oyun/hikaye';
import { SAHNELER, sahneSec } from '../src/oyun/yuzey/gorevler';

function uzayda(t = 41) {
  const d = yeniOyun(t);
  d.sahne = null;
  G.gemiOlustur(d, 3);
  d.gemi.yer = 'uzay';
  d.uzay = { x: 0, y: 0, yon: 0, hiz: 0, yaklasilan: {} };
  return d;
}

describe('Aşama 4: Tonoflenya ana ekseni ve final derinleştirmesi', () => {
  test('4A: Final #1 ödülü belgedeki gibi', () => {
    const d = yeniOyun(40);
    G.gemiOlustur(d, 3);
    d.bayrak.ygkKayit = true;
    FN.tf(d);
    const ml = d.para.ml;
    const gk = d.para.gk;
    const m = FN.GOREV[1].odul(d);
    expect(d.para.ml - ml).toBe(500);
    expect(d.para.gk - gk).toBe(100);
    expect(ZN.miktar(d, 'ygk_muhru')).toBe(1);
    expect(d.bayrak.seckinKadro).toBe(true);
    expect(m).toContain('Seçkin Subay');
  });

  test('4B: Final #3 bitince Kefius çağırır; hizalanınca Kronik 4 ve Final 4 açılır', () => {
    const d = yeniOyun(42);
    d.sahne = null;
    d.bayrak.tonoflenyaGoruldu = true;
    FN.tf(d).biten = [1, 2];
    HK.hikayeIlerle(d);
    expect(HK.hikaye(d).bekleyen).not.toContain('zirve_ignesi');
    FN.tf(d).biten.push(3);
    expect(FN.GOREV[4].kosul(d)).toBe(false);
    for (let i = 0; i < 5 && !d.sahne; i++) HK.hikayeIlerle(d);
    expect(d.sahne).toBe('hk_giris');
    expect(HK.hikaye(d).aktif).toBe('zirve_ignesi');
    // Operasyon kazanılmış sayılır
    for (let i = 0; i < 10 && d.sahne; i++) {
      sahneSec(d, d.sahne, 0);
      if (d.opBekle) {
        d.opBekle = null;
        d.sahne = 'hk_ara';
      }
      if (d.sahne === 'hk_sonuc') {
        sahneSec(d, 'hk_sonuc', 0);
        break;
      }
    }
    expect(d.bayrak.zirveHizasi).toBe(true);
    expect(d.bayrak.malazarIzni).toBe(true);
    expect(FN.GOREV[4].kosul(d)).toBe(true);
    expect(SAHNELER.hk_giris).toBeTruthy();
  });

  test('Final #16: gizli geçit haritası kalkanı yüzde yirmi beş kırık başlatır', () => {
    const a = uzayda(43);
    SV.savasBaslat(a, 'kahergonat_zirhlisi');
    const k0 = a.savas.dusman.kalkan;
    const b = uzayda(43);
    ZN.ekle(b, 'gecit_haritasi', 1);
    const o = SV.savasBaslat(b, 'kahergonat_zirhlisi');
    expect(b.savas.dusman.kalkan).toBeCloseTo(k0 * 0.75, 2);
    expect(o[0].soz).toContain('Gizli geçit');
    expect(FN.GOREV[16].op.length).toBe(1);
    expect(FN.GOREV[16].kararlar.length).toBe(2);
  });

  test('Final #17 A: Elyon ilk üç tur zırh ve ek atış; B: Sharon tek muhafız çağırır', () => {
    const d = yeniOyun(44);
    d.bayrak.tfElyon = true;
    const o = SV.savasBaslat(d, 'lord_sharon');
    expect(d.savas.elyon).toBe(3);
    expect(o[0].soz).toContain('Elyon');
    const h = d.savas.dusman;
    h.aci = 0;
    d.savas.sizma = false;
    const r = SV.savasGirdi(d, { tur: 'dokun', parmak: 1 });
    expect(r.some((x) => x.soz && x.soz.includes('Elyon Vane de ateş'))).toBe(true);

    const e = yeniOyun(45);
    e.bayrak.tfKusatma = true;
    SV.savasBaslat(e, 'lord_sharon');
    const s = e.savas.dusman;
    s.govde = Math.round(s.max * 0.6);
    s.aci = 0;
    e.savas.can = e.savas.maxCan = 99999;
    e.savas.sizma = false;
    SV.savasGirdi(e, { tur: 'dokun', parmak: 1 });
    expect(s.faz).toBe(1);
    expect(e.savas.dusmanlar.filter((x) => x.tur === 'golge_muhafizi').length).toBe(1);
  });

  test('Final #18: mızrak birleşir ve kuşanılır; savaş önce, sonra mühür taşları', () => {
    const d = yeniOyun(46);
    ZN.ekle(d, 'tyzrakhel_parcasi', 1);
    ZN.ekle(d, 'tyzrakhel_prizmasi', 1);
    FN.mizrakBirlestir(d);
    expect(ZN.miktar(d, 'tyzrakhel_mizragi')).toBe(1);
    expect(ZN.kusanildiMi(d, 'tyzrakhel_mizragi')).toBe(true);
    expect(FN.GOREV[18].savasOnce).toBe(true);
    expect(FN.GOREV[18].savas).toBe('lord_sharon');
    expect(FN.GOREV[20].savas).toBe('cahelon');
    expect(FN.GOREV[19].kosul(d)).toBe(false); // reaktör ve anahtar gerekir
  });

  test('Final #20: Cahelon; abis verisiyle derin aşamada yer kaybolmaz, anahtar birinci aşamayı dengeler', () => {
    const d = uzayda(47);
    d.bayrak.abisVeri = true;
    ZN.ekle(d, 'cahelon_anahtari', 1);
    const o = SV.savasBaslat(d, 'cahelon');
    expect(o[0].soz).toContain('Girdap Anahtarı');
    const h = d.savas.dusman;
    h.govde = Math.round(h.max * 0.6);
    h.aci = 0;
    d.savas.sizma = false;
    const r = SV.savasGirdi(d, { tur: 'kaydir', yon: 'yukari', parmak: 1 });
    expect(h.faz).toBe(1);
    expect(h.kilitCarpani).toBe(1);
    expect(r.some((x) => x.soz && x.soz.includes('Abis veri'))).toBe(true);
  });

  test('Kronik 4 artık Zirve İğnesi hizasını bekler', () => {
    const d = yeniOyun(48);
    d.bayrak.malazarIzni = true;
    expect(KR.noktadakiBolum(d, 'zirve_ignesi')).toBeFalsy();
    d.bayrak.zirveHizasi = true;
    expect(KR.noktadakiBolum(d, 'zirve_ignesi')).toBeTruthy();
  });
});

describe('Pyros-Prime: Xarathia', () => {
  const sec = (d, i) => sahneSec(d, d.sahne, i);
  function oyna(d, karar, sonKarar) {
    d.tamamlananOp = [...(d.tamamlananOp || []), 'p01'];
    for (let i = 0; i < 5 && !d.sahne; i++) HK.hikayeIlerle(d);
    expect(HK.hikaye(d).aktif).toBe('gz_p01');
    for (let i = 0; i < 30 && d.sahne; i++) {
      const ara = d.sahne === 'hk_karar' && HK.hikaye(d).adim === 1;
      const son = d.sahne === 'hk_karar' && HK.hikaye(d).adim !== 1;
      sec(d, ara ? karar : son ? sonKarar : 0);
      if (d.opBekle) {
        d.opBekle = null;
        d.sahne = 'hk_ara';
      }
      if (d.savasBekle) {
        const sb = d.savasBekle;
        d.savasBekle = null;
        SV.savasBaslat(d, sb);
        expect(d.savas.dusman.tur).toBe('xarathia');
        for (let k = 0; k < 200 && d.savas; k++) {
          d.savas.dusman.govde = 1;
          d.savas.dusman.aci = 0;
          d.savas.uyari = null;
          d.savas.sizma = false;
          SV.savasGirdi(d, { tur: 'dokun', parmak: 1 });
          if (d.savas) SV.savasIlerle(d, 0.1);
        }
        d.savasOldu = true;
      }
      if (d.sahne === 'hk_sonuc') {
        sec(d, 0);
        break;
      }
    }
  }
  test('soğuk armağanla ittifak: savaşılmaz', () => {
    const d = yeniOyun(50);
    d.sahne = null;
    G.gemiOlustur(d, 3);
    d.koloni.kaynaklar.kriyolit = 6;
    oyna(d, 0, 0);
    expect(d.savasOldu).toBeFalsy();
    expect(d.bayrak.xarathiaIttifak).toBe(true);
    expect(d.bayrak.gz_p01).toBe('iyi');
    expect(d.koloni.kaynaklar.kriyolit).toBe(1);
  });
  test('saldırı: iki aşamalı boss savaşı, ittifak kapalı', () => {
    const d = yeniOyun(51);
    d.sahne = null;
    G.gemiOlustur(d, 3);
    d.koloni.kaynaklar.kriyolit = 6;
    oyna(d, 1, 1);
    expect(HK.hikaye(d).aktif).toBeFalsy();
    expect(d.savasOldu).toBe(true);
    expect(d.bayrak.xarathiaIttifak).toBeFalsy();
    expect(d.bayrak.gz_p01).toBe('kotu');
  });
});
