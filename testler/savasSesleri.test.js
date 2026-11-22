// 3.9: savaş seslerinin her adı bir dosyaya karşılık gelmeli ve her düşmanın ailesi olmalı
import { test, expect } from 'bun:test';
import { existsSync } from 'fs';
import { DUSMANLAR, savasBaslat, savasGirdi, savasIlerle } from '../src/oyun/uzay/savas';
import { aile, dusmanSesi, savasSesListesi, ATIS_SESI, uyariSesi } from '../src/oyun/uzay/savasSesleri';
import { yeniOyun } from '../src/oyun/durum';
import * as G from '../src/oyun/gemi/gemi';
import { kilitliMi } from '../src/oyun/uzay/savas';

const eski = new Set(['patlama', 'red', 'tik', 'tislama', 'sonar', 'hidrolik', 'valf', 'sinyal', 'kaynak', 'el_kalkan', 'el_pelerin', 'el_hancer', 'el_tufek', 'el_mizrak', 'el_golge', 'el_plazma_sarj', 'el_torpido', 'el_iyon', 'el_canavar', 'el_droid', 'magma', 'alarm', 'kilitTonu']);
const dosyaVar = (ad) => eski.has(ad) || existsSync('assets/ses/savas/' + ad + '.mp3');

test('her düşmanın ses ailesi var', () => {
  const eksik = Object.keys(DUSMANLAR).filter((t) => !aile(t));
  expect(eksik).toEqual([]);
});

test('her düşmanın bütün olay sesleri dosyada', () => {
  const eksik = [];
  for (const t of Object.keys(DUSMANLAR)) {
    for (const o of ['gelis', 'hasar1', 'hasar2', 'yetenek', 'olum', 'faz']) {
      const s = dusmanSesi(t, o);
      if (!s || !dosyaVar(s)) eksik.push(t + ':' + o + ':' + s);
    }
    const h = dusmanSesi(t, 'hareket');
    if (h && !dosyaVar(h)) eksik.push(t + ':hareket:' + h);
    for (const sl of DUSMANLAR[t].silahlar || []) {
      const u = uyariSesi(t, sl, 'el_iyon');
      if (!dosyaVar(u)) eksik.push(t + ':uyari:' + u);
    }
  }
  for (const s of Object.values(ATIS_SESI)) if (!dosyaVar(s)) eksik.push('atis:' + s);
  for (const s of savasSesListesi(Object.keys(DUSMANLAR), true).concat(savasSesListesi([], false))) if (!dosyaVar(s)) eksik.push('liste:' + s);
  expect(eksik).toEqual([]);
});

test('savaş olaylarındaki bütün sesler dosyada', () => {
  const eksik = new Set();
  const bak = (ol) => {
    for (const o of ol || []) {
      if (o.ses && !dosyaVar(o.ses)) eksik.add(o.ses);
      if (o.ses2 && !dosyaVar(o.ses2)) eksik.add(o.ses2);
      for (const x of o.sesler || []) if (!dosyaVar(x.ad)) eksik.add(x.ad);
    }
  };
  for (const tur of ['korsan_korvet', 'yabanci_firkateyn', 'dron_tasiyici', 'sulfur_akrebi', 'haydut_cetesi', 'xarathia', 'lord_sharon', 'cahelon', 'kahergonat_zirhlisi', 'dev_kor_solucan']) {
    const d = yeniOyun(7);
    G.gemiOlustur(d, 1);
    d.gemi.yer = 'uzay';
    d.uzay = { x: 0, y: 0, yon: 0, hiz: 0, yaklasilan: {} };
    bak(savasBaslat(d, { dusmanlar: [tur] }));
    for (let i = 0; i < 3000 && d.savas; i++) {
      const s = d.savas;
      let g;
      if (s.uyari) g = s.uyari.savunma ? null : i % 3 ? { tur: 'kaydir', yon: s.uyari.yon === 'sag' ? 'sol' : 'sag', parmak: 1 } : { tur: 'dokun', parmak: 2 };
      else if (!kilitliMi(d)) g = { tur: 'kaydir', yon: s.dusman.aci > 0 ? 'sol' : 'sag', parmak: 1 };
      else g = i % 5 ? { tur: 'dokun', parmak: 1 } : { tur: 'kaydir', yon: 'yukari', parmak: 1 };
      if (g) bak(savasGirdi(d, g));
      if (d.savas) bak(savasIlerle(d, 0.1));
    }
  }
  expect([...eksik]).toEqual([]);
});
