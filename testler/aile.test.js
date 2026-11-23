// 4.6: koloni nesilleri (v5 Paket 4) ve ekonomi kuralları
import { describe, expect, test } from 'bun:test';
import { yeniOyun } from '../src/oyun/durum';
import * as KM from '../src/oyun/komuta';
import { zamanIlerle, eylemUygula, noktaEylemleri, SAHNELER } from '../src/oyun/yuzey/gorevler';
import * as YR from '../src/oyun/yerlesim/yerlesim';
import * as PZ from '../src/oyun/yerlesim/pazar';
import * as AI from '../src/oyun/aile/aile';
import * as Z from '../src/oyun/zaman';
import { kisiKonumu } from '../src/oyun/yerlesim/konum';

function koloni(tohum = 5) {
  const d = yeniOyun(tohum);
  d.sahne = null;
  Object.assign(d.bayrak, { sondaj: true, kazi: true, dokumhane: true, kule: true });
  const k = KM.komuta(d);
  for (const s of Object.keys(k.sektor)) k.sektor[s] = { durum: 'guvenli', karakol: null };
  zamanIlerle(d, 1);
  d.haberKuyrugu = [];
  d.yer.binalar.push('meydan', 'kamara', 'dunya_konut');
  for (const id of ['sorya', 'kaelon', 'lyris', 'zarek', 'veysel', 'marcus', 'defne']) if (!d.yer.katilan.includes(id)) d.yer.katilan.push(id);
  return d;
}
const ver = (d, o) => {
  for (const k of Object.keys(o)) YR.varlikEkle(d, k, o[k]);
};
const gunAtla = (d, n = 1) => {
  for (let i = 0; i < n; i++) {
    d.zaman.sn = Z.gun(d) * Z.GUN_SN + 1;
    zamanIlerle(d, 0.01);
  }
};
const kademeYap = (d, id, k) => {
  const r = YR.kayit(d, id);
  r.k = k;
  r.p = k * 100;
};

describe('Evlilik', () => {
  test('Veysel ve Tina romantik değil; Kademe 8, ev ve sembol gerekir', () => {
    const d = koloni();
    expect(AI.evlilikEngeli(d, 'veysel')).toMatch(/manevi baban/);
    expect(AI.evlilikEngeli(d, 'lyris')).toMatch(/Kademe 8/);
    kademeYap(d, 'lyris', 8);
    expect(AI.evlilikEngeli(d, 'lyris')).toMatch(/genişlet/);
    ver(d, { kereste: 8, tugla: 8 });
    expect(AI.kamaraGenislet(d).metin).toMatch(/yuva/);
    expect(AI.sembol('lyris')).toBe('bag_tilsimi');
    expect(AI.evlilikEngeli(d, 'lyris')).toMatch(/tılsım/i);
    ver(d, { bag_tilsimi: 1 });
    const m = d.koloni.moral;
    AI.evlen(d, 'lyris');
    expect(d.aile.es).toBe('lyris');
    expect(d.sahne).toBe('aile_dugun');
    expect(SAHNELER.aile_dugun.metin(d)[0]).toMatch(/Lyris/);
    expect(d.koloni.moral).toBe(Math.min(100, m + 10));
    expect(AI.evlilikEngeli(d, 'sorya')).toMatch(/Evlisin/);
  });
  test('eş akşam kamarada; sabah destek verir', () => {
    const d = koloni();
    kademeYap(d, 'sorya', 8);
    AI.aile(d).kamaraGenis = true;
    ver(d, { bag_tilsimi: 1 });
    AI.evlen(d, 'sorya');
    d.sahne = null;
    d.zaman.sn = (Z.gun(d) - 1) * Z.GUN_SN + 4 * Z.NOBET_SN + 5;
    expect(kisiKonumu(d, 'sorya').bina).toBe('kamara');
  });
});

describe('Çocuklar', () => {
  test('üç gün, yatak, eşin sorusu, on dört gün sonra doğum; evreler ve çırak', () => {
    const d = koloni();
    kademeYap(d, 'zarek', 8);
    AI.aile(d).kamaraGenis = true;
    ver(d, { bag_tilsimi: 1 });
    AI.evlen(d, 'zarek');
    d.sahne = null;
    expect(AI.cocukSorusuHazir(d)).toBe(false);
    ver(d, { kereste: 4, bitkisel_lif: 3, urun_pamuk_keten: 2 });
    expect(AI.yatakKur(d).metin).toMatch(/kuruldu/);
    gunAtla(d, 3);
    expect(AI.cocukSorusuHazir(d)).toBe(true);
    expect(noktaEylemleri(d, 'kamara_yatak').some((e) => e.id === 'ai_soru')).toBe(true);
    expect(AI.cocukCevap(d, false).metin).toMatch(/Acelemiz yok/);
    expect(AI.cocukCevap(d, true).metin).toMatch(/14 gün/);
    const nufus = d.koloni.nufus.toplam;
    gunAtla(d, 14);
    expect(d.aile.cocuklar.length).toBe(1);
    expect(d.koloni.nufus.toplam).toBe(nufus + 1);
    const c = d.aile.cocuklar[0];
    expect(AI.evre(d, c)).toBe('bebek');
    expect(AI.cocukSorusuHazir(d)).toBe(false);
    gunAtla(d, 14);
    expect(AI.evre(d, c)).toBe('ogrenci');
    expect(AI.cocukSorusuHazir(d)).toBe(true);
    gunAtla(d, 28);
    expect(AI.evre(d, c)).toBe('cirak');
    expect(c.meslek).toBeTruthy();
  });
  test('NPC çifti yalnız Kaptan evliyse ya da onayla; aile evi kapasitesi', () => {
    const d = koloni();
    d.yer.uyum = { 'marcus|zarek': 40 };
    expect(AI.ciftAday(d, 'marcus', 'zarek')).toBe(false);
    AI.arabuluculukOnayla(d, 'marcus', 'zarek');
    expect(AI.ciftAday(d, 'marcus', 'zarek')).toBe(true);
    ver(d, { kereste: 12, tugla: 15, cam: 4 });
    expect(AI.aileEviKur(d, 'dunya_konut').metin).toMatch(/aile evine/);
    gunAtla(d, 8);
    expect(d.aile.ciftler.length).toBe(1);
    expect(AI.aileMenu(d).ogeler.some((o) => /Evli çiftler: 1/.test(o.etiket))).toBe(true);
  });
});

describe('Ekonomi kuralları', () => {
  test('tezgâh günlük geliri 400 krediyle sınırlı', () => {
    expect(PZ.TEZGAH_GUNLUK_TAVAN).toBe(400);
  });
});
