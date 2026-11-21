// Tonoflenya büyük final görevleri (2.5): yirmi görev baştan sona, kararlar, ödüller, epilog
import { describe, expect, test } from 'bun:test';
import { yeniOyun } from '../src/oyun/durum';
import { MEKANLAR, NOKTALAR } from '../src/oyun/yuzey/harita';
import { eylemUygula, noktaEylemleri, zamanIlerle, sahneSec, sahneSecenekleri, gorevIpucu } from '../src/oyun/yuzey/gorevler';
import { gemiOlustur } from '../src/oyun/gemi/gemi';
import * as O from '../src/oyun/uzay/operasyon';
import * as V from '../src/oyun/veri/uzayGorevleri';
import { savasGirdi } from '../src/oyun/uzay/savas';
import * as FN from '../src/oyun/tonoflenya/final';
import { F_NOKTALAR } from '../src/oyun/tonoflenya/finalHarita';
import * as ZN from '../src/oyun/tonoflenya/zanaat';

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
  const d = yeniOyun(21);
  d.sahne = null;
  gemiOlustur(d, 3);
  Object.assign(d.bayrak, { ygkKayit: true, tonoflenyaGoruldu: true, karaGolIzni: true });
  d.mekan = 'ygk_6';
  return d;
}
// Sahneleri ilk seçenekle geçer; bekleyen operasyon ve çatışmaları oynar
function surdur(d, secim = 0) {
  const sahneler = [];
  for (let k = 0; k < 300; k++) {
    if (d.op) oyna(O, V, d);
    else if (d.savas) {
      d.savas.dusman.govde = 1;
      d.savas.dusman.aci = 0;
      d.savas.uyari = null;
      savasGirdi(d, { tur: 'dokun', parmak: 1 });
    } else if (d.sahne) {
      sahneler.push(d.sahne);
      sahneSec(d, d.sahne, d.sahne === 'tf_karar' ? Math.min(secim, sahneSecenekleri(d, d.sahne).length - 1) : 0);
    } else {
      const o = zamanIlerle(d, 0.1);
      if (!o.some((x) => x.tur === 'op' || x.tur === 'savas')) break;
    }
  }
  return sahneler;
}

describe('Tonoflenya final görevleri', () => {
  test('görev noktaları kendi mekânlarında', () => {
    for (const id of Object.keys(F_NOKTALAR)) {
      const n = NOKTALAR[id];
      const a = MEKANLAR[n.mekan].alan;
      expect(n.x >= a.bati && n.x <= a.dogu && n.y >= a.guney && n.y <= a.kuzey).toBe(true);
    }
    expect(FN.GOREVLER.length).toBe(20);
  });

  test('yirmi görev sırayla; kararlar, yadigârlar, ödüller, epilog', () => {
    const d = hazir();
    expect(noktaEylemleri(d, 'konsey_salonu').some((e) => e.id === 'f_bas_1')).toBe(true);
    expect(noktaEylemleri(d, 'yasak_dolaplar').some((e) => e.id.indexOf('f_bas') === 0)).toBe(false);
    for (const g of FN.GOREVLER) {
      const yer = g.nokta;
      expect(noktaEylemleri(d, yer).some((e) => e.id === 'f_bas_' + g.no)).toBe(true);
      const rr = eylemUygula(d, yer, 'f_bas_' + g.no);
      expect(d.sahne).toBe('tf_giris');
      if (g.rezonator) {
        surdur(d);
        expect(d.tf.evre).toBe('rezonator');
        const rz = ['rezonator_zhaor', 'rezonator_varek', 'rezonator_axira', 'rezonator_elyndra', 'rezonator_sinha', 'rezonator_uma'];
        rz.forEach((id, i) => {
          const e = noktaEylemleri(d, id).find((x) => x.id === 'f_rez_' + i);
          expect(e).toBeTruthy();
          eylemUygula(d, id, e.id);
          surdur(d, g.no % 2);
        });
      } else {
        const l = surdur(d, g.no % 2);
        expect(l).toContain('tf_odul'.replace('tf_odul', g.no === 20 ? 'tf_epilog' : 'tf_odul'));
      }
      expect(FN.bittiMi(d, g.no)).toBe(true);
    }
    expect(d.tf.biten.length).toBe(20);
    expect(d.tf.unvan).toContain('Evrenin Muhafızı');
    expect(d.bayrak.serbestKesif).toBe(true);
    expect(d.bayrak.tonoflenyaKurtuldu).toBe(true);
    for (const y of ['runahar_tasi', 'runashar_tasi', 'cahelon_anahtari', 'tyzrakhel_prizmasi', 'tyzrakhel_parcasi', 'efsanevi_reaktor']) expect(ZN.miktar(d, y)).toBe(1);
    expect(Object.keys(d.tf.karar).length).toBe(4);
    expect(d.koloni.nufus.toplam).toBeGreaterThan(1200);
    expect(gorevIpucu(d)).toContain('Bütün final görevleri tamam');
  });

  test('koşullar: Dünya Çivisi yadigârsız açılmaz; yüzey operasyonunda geri çekilme', () => {
    const d = hazir();
    d.tf = undefined;
    FN.tf(d).biten = Array.from({ length: 17 }, (_, i) => i + 1);
    const r = eylemUygula(d, 'dunya_civisi', 'f_bas_18');
    expect(r.ses).toBe('red');
    // Geri çekilme: refleks adımında alarmı kaçır
    const h = hazir();
    eylemUygula(h, 'konsey_salonu', 'f_bas_1');
    sahneSec(h, 'tf_giris', 0);
    zamanIlerle(h, 0.1);
    expect(h.op.id).toBe('tf1');
    const govde = h.gemi.govde;
    h.op.adim = 2;
    h.op.s = { n: 0, alarm: null, sonraki: 0 };
    for (let i = 0; i < 3000 && h.op; i++) O.opIlerle(h, 0.1);
    expect(h.op).toBe(null);
    expect(h.sahne).toBe('op_geri_cekil');
    expect(h.gemi.govde).toBe(govde);
    sahneSec(h, 'op_geri_cekil', 0);
    expect(noktaEylemleri(h, 'konsey_salonu').some((e) => e.id === 'f_bas_1')).toBe(true);
  });
});
