import { test, expect } from 'bun:test';
import { yeniOyun, kaydiTamamla } from '../src/oyun/durum';
import * as GV from '../src/oyun/yuzey/gorevler';
import { ilerle, etkiles, gec, radar, cevreMetni, yerlerListesi, otoBaslat, durumMetni } from '../src/oyun/yuzey/dunya';
import { KAPILAR, MEKANLAR, NOKTALAR } from '../src/oyun/yuzey/harita';
import { gemiOlustur } from '../src/oyun/gemi/gemi';
import { kalkis } from '../src/oyun/uzay/seyir';
import { TESISLER } from '../src/oyun/veri/tesisler';
import { PARCALAR } from '../src/oyun/veri/uretim';

function zar(t) { let a = t >>> 0; return () => { a = (a * 1664525 + 1013904223) >>> 0; return a / 4294967296; }; }

for (const tohum of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) test('bulanık oyun ' + tohum, () => {
  const r = zar(tohum * 99);
  let d = yeniOyun(tohum);
  while (d.sahne) GV.sahneSec(d, d.sahne, 0);
  // Her şeyi aç
  for (const k of Object.keys(TESISLER)) if (!d.koloni.binalar.includes(k)) d.koloni.binalar.push(k);
  Object.assign(d.bayrak, { maske: true, dokumhane: true, sondaj: true, zemin: true, biyo_kubbe: true, jenerator: true, telemetri: true, morsBulundu: true, vahaBulundu: true });
  d.araclar = ['col_tilkisi', 'mammoth', 'demir_kervan', 'atmosphere_x', 'akrep'];
  d.envanter.push('kesici', 'termal_giysi');
  gemiOlustur(d, 3);
  if (tohum % 2) { for (const k of Object.keys(PARCALAR)) if (PARCALAR[k].katman) d.gemi.moduller[PARCALAR[k].katman] = true; d.gemi.sinif = 5; d.tamamlananOp = ['g01', 'g02']; }
  for (const k of Object.keys(d.koloni.kaynaklar)) d.koloni.kaynaklar[k] = 50;
  const hatalar = [];
  for (let adim = 0; adim < 8000; adim++) {
    try {
      const x = r();
      if (d.sahne) {
        const s = GV.sahneSecenekleri(d, d.sahne);
        GV.sahneMetni(d, d.sahne);
        GV.sahneSec(d, d.sahne, Math.floor(r() * Math.max(1, s.length)));
      } else if (d.op) {
        const t = ['dokun', 'cift', 'cift2', 'uzun', 'ac', 'kaydir', 'surukle', 'dondur'][Math.floor(r() * 8)];
        GV.opGirdi(d, { tur: t, yon: ['sag', 'sol', 'yukari', 'asagi'][Math.floor(r() * 4)], parmak: 1 + Math.floor(r() * 3), dx: r() * 40 - 20, dy: r() * 40 - 20, f: r() - 0.5 });
        GV.opIlerle(d, 0.5);
        GV.opSes(d); GV.opDurum(d);
      } else if (d.savas) {
        const t = ['dokun', 'cift', 'kaydir', 'dondur'][Math.floor(r() * 4)];
        GV.savasGirdi(d, { tur: t, yon: ['sag', 'sol', 'yukari', 'asagi'][Math.floor(r() * 4)], parmak: 1 + Math.floor(r() * 2), f: r() - 0.5 });
        GV.savasIlerle(d, 0.5); GV.savasSes(d); GV.savasDurumu(d);
      } else if (d.uzay) {
        d.uzay.hiz = 3;
        if (x < 0.1) d.uzay.yon = r() * 6.28;
        GV.uzayAdim(d, 1);
        if (x > 0.95) { const k = GV.kenetlen(d); }
        if (x > 0.9 && x < 0.92) { d.uzay.x = 0; d.uzay.y = 0; d.uzay.hiz = 0; GV.kenetlen(d); d.gemide = false; }
        // bir noktaya ışınla
        if (x > 0.85 && x < 0.86) { const ids = GV.gorunurNoktalar(d); const n = GV.UZAY_NOKTALARI[ids[Math.floor(r() * ids.length)]]; d.uzay.x = n.x + 5; d.uzay.y = n.y; d.uzay.hiz = 0; GV.kenetlen(d); }
      } else {
        if (x < 0.4) ilerle(d, { ileri: r() * 2 - 1, donus: r() * 2 - 1 }, 0.5);
        else if (x < 0.5) { const e = etkiles(d); if (e.tur === 'nokta') { const ev = GV.noktaEylemleri(d, e.id); if (ev.length) GV.eylemUygula(d, e.id, ev[Math.floor(r() * ev.length)].id); } }
        else if (x < 0.6) { const ids = Object.keys(NOKTALAR); const id = ids[Math.floor(r() * ids.length)]; const n = NOKTALAR[id]; d.mekan = n.mekan; d.oyuncu = { x: n.x + 1, y: n.y + 1, yon: 0 }; const ev = GV.noktaEylemleri(d, id); if (ev.length) { const res = GV.eylemUygula(d, id, ev[Math.floor(r() * ev.length)].id); if (res && res.ayar) { GV.ayarBaslat(d, res.amac); d.ayar = null; } if (res && res.valf) { GV.valfBaslat(d, id, res.amac); d.valf = null; } } }
        else if (x < 0.65) { const ks = Object.keys(KAPILAR); const k = ks[Math.floor(r() * ks.length)]; const u = KAPILAR[k].uclar[0]; d.mekan = u.mekan; d.oyuncu = { x: u.x, y: u.y, yon: 0 }; gec(d, k, 0); }
        else if (x < 0.7) { radar(d); cevreMetni(d); durumMetni(d); const y = yerlerListesi(d); if (y.length) otoBaslat(d, y[Math.floor(r() * y.length)]); }
        else if (x < 0.73) { GV.insaEt(d, Object.keys(TESISLER)[Math.floor(r() * Object.keys(TESISLER).length)]); }
        else if (x < 0.75) { d.gemide = true; d.gemi.yakit = d.gemi.maxYakit; kalkis(d); }
        else GV.zamanIlerle(d, 2);
        GV.zamanIlerle(d, 0.5); GV.gorevIpucu(d); GV.bildirimIlerle(d);
      }
      if (adim % 200 === 0) d = kaydiTamamla(JSON.parse(JSON.stringify(d)));
    } catch (e) {
      hatalar.push(adim + ': ' + e.message + ' | ' + (e.stack || '').split('\n')[1]);
      if (hatalar.length > 5) break;
    }
  }
  if (hatalar.length) console.log(hatalar.join('\n'));
  expect(hatalar.length).toBe(0);
});
