// Tonoflenya yan görevleri (2.6): otuz görev, ön koşullar, kararlar, ödüller, itibar matrisi
import { describe, expect, test } from 'bun:test';
import { yeniOyun } from '../src/oyun/durum';
import { MEKANLAR, NOKTALAR } from '../src/oyun/yuzey/harita';
import { eylemUygula, noktaEylemleri, zamanIlerle, sahneSec, sahneSecenekleri } from '../src/oyun/yuzey/gorevler';
import { gemiOlustur } from '../src/oyun/gemi/gemi';
import * as O from '../src/oyun/uzay/operasyon';
import * as V from '../src/oyun/veri/uzayGorevleri';
import * as YN from '../src/oyun/tonoflenya/yan';
import * as SB from '../src/oyun/tonoflenya/subay';
import * as ZN from '../src/oyun/tonoflenya/zanaat';
import { tarim } from '../src/oyun/tarim/tarim';
import { savasBaslat, savasGirdi, savasIlerle } from '../src/oyun/uzay/savas';
import { seyahat } from '../src/oyun/yuzey/gorevler';

function oyna(O, V, d) {
  let guvenlik = 0;
  while (d.op && guvenlik++ < 20000) {
    const a = V.OPERASYONLAR[d.op.id].adimlar[d.op.adim];
    const s = d.op.s;
    const adim = d.op.adim;
    const ilerle = (sn) => {
      for (let t = 0; t < sn && d.op && d.op.adim === adim; t += 0.1) O.opIlerle(d, 0.1);
    };
    if (a.tur === 'yaklas') {
      if (Math.abs(s.aci) > O.KILIT_ACI) O.opGirdi(d, { tur: 'kaydir', yon: s.aci > 0 ? 'sol' : 'sag', parmak: 1 });
      else if (a.sessiz) O.opGirdi(d, { tur: 'dokun' });
      else if (s.hiz === 0) O.opGirdi(d, { tur: 'kaydir', yon: 'yukari', parmak: 1 });
      O.opIlerle(d, 0.1);
    } else if (a.tur === 'kenetle') O.opGirdi(d, { tur: 'cift' });
    else if (a.tur === 'sonar') O.opGirdi(d, { tur: 'uzun' });
    else if (a.tur === 'tut') {
      O.opGirdi(d, { tur: 'uzun' });
      ilerle(4);
    } else if (a.tur === 'dron') {
      O.opGirdi(d, { tur: 'ac' });
      ilerle(4);
    } else if (a.tur === 'frekans') {
      O.opGirdi(d, { tur: 'dondur', f: (s.hedef - s.deger) / 7 });
      if (a.cift) O.opGirdi(d, { tur: 'cift' });
      else ilerle(3);
    } else if (a.tur === 'basinc') {
      while (d.op && d.op.adim === adim && !d.op.s.alarm) O.opIlerle(d, 0.1);
      if (d.op && d.op.adim === adim) O.opGirdi(d, { tur: a.girdi || 'cift' });
    } else if (a.tur === 'ritim') {
      for (let i = 0; i < (a.n || 3) && d.op && d.op.adim === adim; i++) {
        O.opGirdi(d, a.girdi === 'kaydir2' ? { tur: 'kaydir', yon: 'yukari', parmak: 2 } : { tur: 'dokun' });
        O.opIlerle(d, 0.2);
      }
    } else if (a.tur === 'kacin') {
      while (d.op && d.op.adim === adim && !d.op.s.tehdit) O.opIlerle(d, 0.1);
      if (d.op && d.op.adim === adim) O.opGirdi(d, { tur: 'kaydir', yon: a.ayni ? d.op.s.tehdit.yon : a.yon ? a.yon : d.op.s.tehdit.yon === 'sag' ? 'sol' : 'sag', parmak: 1 });
    } else if (a.tur === 'nisan') {
      const h = O.opSes(d).hedef;
      if (Math.abs(h.x) < 2) O.opGirdi(d, { tur: 'cift' });
      else O.opIlerle(d, 0.1);
    } else if (a.tur === 'kademeli') O.opGirdi(d, { tur: 'kaydir', yon: a.yon || 'asagi', parmak: a.parmak || 2 });
    else if (a.tur === 'zikzak') O.opGirdi(d, { tur: 'kaydir', yon: s.beklenen, parmak: 1 });
    else if (a.tur === 'sessizlik') ilerle(11);
    else if (a.tur === 'rotasyon') O.opGirdi(d, { tur: 'dondur', f: 1 });
    else if (a.tur === 'muhur') O.opGirdi(d, { tur: 'dokun', parmak: 3 });
    else if (a.tur === 'refleks') {
      while (d.op && d.op.adim === adim && !d.op.s.alarm) O.opIlerle(d, 0.1);
      if (d.op && d.op.adim === adim) O.opGirdi(d, { tur: 'dokun', parmak: 1 });
    }
    else if (a.tur === 'denge') {
      if (a.eksen === 'dikey') O.opGirdi(d, { tur: 'surukle', dx: 0, dy: -s.sapma / 0.004 });
      else O.opGirdi(d, { tur: 'surukle', dx: s.sapma / 0.004, dy: 0 });
      O.opIlerle(d, 0.1);
    } else if (a.tur === 'direnc') {
      if (s.konum < 0.8) O.opGirdi(d, { tur: 'surukle', dx: 0, dy: 30 });
      O.opIlerle(d, 0.1);
    } else if (a.tur === 'ton') {
      O.opGirdi(d, { tur: 'uzun' });
      for (const t of [...d.op.s.dizi]) O.opGirdi(d, t === 'kalin' ? { tur: 'kaydir', yon: 'asagi', parmak: 1 } : t === 'tiz' ? { tur: 'kaydir', yon: 'yukari', parmak: 1 } : { tur: 'cift' });
    } else if (a.tur === 'bosluk') {
      const once = s.vurus;
      const o = O.opIlerle(d, 0.05);
      if (d.op && d.op.adim === adim && d.op.s.vurus !== once && !o.some((x) => x.nota)) O.opGirdi(d, { tur: 'dokun' });
    }
  }
  return guvenlik;
}

function hazir() {
  const d = yeniOyun(31);
  d.sahne = null;
  gemiOlustur(d, 3);
  Object.assign(d.bayrak, { ygkKayit: true, tonoflenyaGoruldu: true, aetherKayigi: true });
  tarim(d);
  for (const e of SB.EKOL_SIRASI) SB.ekolKazan(d, e, 120);
  ZN.hazirla(d);
  d.esya.plazma_tufegi = 1;
  d.kusanilan.zirh = 'oksit_zirhi';
  d.esya.oksit_zirhi = 1;
  return d;
}
function surdur(d, secim) {
  for (let k = 0; k < 200; k++) {
    if (d.op) oyna(O, V, d);
    else if (d.sahne) sahneSec(d, d.sahne, d.sahne === 'yan_karar' ? Math.min(secim, sahneSecenekleri(d, d.sahne).length - 1) : 0);
    else {
      const o = zamanIlerle(d, 0.1);
      if (!o.some((x) => x.tur === 'op')) break;
    }
  }
}

describe('Tonoflenya yan görevleri', () => {
  test('otuz görev noktası kendi mekânında; matris eksiksiz', () => {
    expect(YN.YAN.length).toBe(30);
    for (const id of Object.keys(YN.YAN_NOKTALARI)) {
      const n = NOKTALAR[id];
      const a = MEKANLAR[n.mekan].alan;
      expect(n.x >= a.bati && n.x <= a.dogu && n.y >= a.guney && n.y <= a.kuzey).toBe(true);
    }
    for (const g of YN.YAN) {
      expect(g.kararlar.length).toBe(2);
      for (const k of g.kararlar) for (const f of Object.keys(k.itibar)) expect(YN.FRAKSIYONLAR[f]).toBeTruthy();
    }
  });

  test('otuz görev sırayla oynanır; kararlar, ödüller, itibar', () => {
    const d = hazir();
    for (const g of YN.YAN) {
      const id = 'yan_' + g.no;
      const e = noktaEylemleri(d, id).find((x) => x.id === 'yn_bas_' + g.no);
      expect(e).toBeTruthy();
      eylemUygula(d, id, e.id);
      expect(d.sahne).toBe('yan_giris');
      surdur(d, g.no % 2);
      expect(d.yan.biten).toContain(g.no);
      expect(d.yan.karar[g.no]).toBe(g.no % 2 ? 'B' : 'A');
      expect(noktaEylemleri(d, id).some((x) => x.id === 'yn_bitti_' + g.no)).toBe(true);
    }
    expect(d.yan.biten.length).toBe(30);
    expect(Object.keys(d.yan.itibar).length).toBeGreaterThan(10);
    expect(ZN.miktar(d, 'gumus_rozet')).toBe(0); // 1. görevde B seçildi
    expect(YN.ozelVar(d, 'Gareth')).toBe(false); // 10. görevde A
    expect(YN.ozelVar(d, 'Malakor')).toBe(true); // 19. görevde B
    for (const y of ['loran_tableti', 'filtra_sartnamesi', 'ajmero_kuresi', 'mormon_pusulasi', 'tentran_izni', 'zeris_aynasi', 'halyon_prangasi', 'veradon_defteri']) expect(ZN.miktar(d, y)).toBe(1);
    expect(d.bayrak.yan_cift_graviton).toBe(undefined); // 26 A
    expect(d.bayrak.yan_tentran_bakim).toBe(true);
    expect(ZN.bakimMaliyeti(d)).toBe(0);
    expect(YN.yanMenu(d).ogeler.length).toBe(3);
  });

  test('ön koşul eksikse görev başlamaz; aynı anda bir yan görev', () => {
    const d = yeniOyun(32);
    d.sahne = null;
    Object.assign(d.bayrak, { tonoflenyaGoruldu: true });
    const r = eylemUygula(d, 'yan_1', 'yn_bas_1');
    expect(r.ses).toBe('red');
    const h = hazir();
    eylemUygula(h, 'yan_2', 'yn_bas_2');
    h.sahne = null;
    expect(eylemUygula(h, 'yan_3', 'yn_bas_3').ses).toBe('red');
  });

  test('pasif gelir, tehlike muafiyeti ve savaş ödülleri', () => {
    const d = hazir();
    YN.yan(d);
    d.esya.maden_hissesi = 1;
    const ml = d.para.ml;
    for (let i = 0; i < 7200 * 2 + 10; i += 60) zamanIlerle(d, 60);
    expect(d.para.ml).toBe(ml + 200);
    d.esya.hayat_muskasi = 1;
    savasBaslat(d, 'korsan_korvet');
    d.gemi.govde = 1;
    for (let i = 0; i < 400 && d.savas && d.esya.hayat_muskasi; i++) savasIlerle(d, 0.1);
    expect(d.esya.hayat_muskasi).toBe(0);
    expect(d.gemi.govde).toBeGreaterThan(1);
  });
});
