// Savaş eğitimi (3.13): uzay ve kara için ilk çatışmadan önce zorunlu, adım adım; bitince gerçek çatışma başlar
import { describe, expect, test, beforeAll, afterAll } from 'bun:test';
import { yeniOyun } from '../src/oyun/durum';
import * as G from '../src/oyun/gemi/gemi';
import * as SV from '../src/oyun/uzay/savas';
import { ADIMLAR } from '../src/oyun/uzay/egitim';

beforeAll(() => { SV.EGITIM_AYAR.zorunlu = true; });
afterAll(() => { SV.EGITIM_AYAR.zorunlu = false; });

function uzaydaOyun(tohum = 5) {
  const d = yeniOyun(tohum);
  G.gemiOlustur(d, 1);
  d.gemi.yer = 'uzay';
  d.uzay = { x: 0, y: 0, yon: 0, hiz: 0, yaklasilan: {} };
  return d;
}
const sozler = (o) => o.filter((x) => x.soz).map((x) => x.soz).join(' ');
const adim = (d) => ADIMLAR[d.savas.egitim.adim].id;
// Uyarı başlayana kadar zamanı ilerlet
function uyariBekle(d) {
  for (let i = 0; i < 100 && d.savas && !d.savas.uyari; i++) SV.savasIlerle(d, 0.1);
  expect(d.savas.uyari).toBeTruthy();
}
function egitimiOyna(d, kayitla) {
  const tum = [];
  const g = (x) => { const r = SV.savasGirdi(d, x); tum.push(...r); return r; };
  const ilerle = (sn) => { for (let t = 0; t < sn; t += 0.1) tum.push(...SV.savasIlerle(d, 0.1)); };
  expect(adim(d)).toBe('nisan');
  // Yanlış hareket adımı geçirmez
  expect(sozler(g({ tur: 'dokun', parmak: 1 }))).toContain('Şimdi');
  expect(adim(d)).toBe('nisan');
  for (let i = 0; i < 6 && adim(d) === 'nisan'; i++) g({ tur: 'kaydir', yon: 'sag', parmak: 1 });
  expect(adim(d)).toBe('ates');
  g({ tur: 'dokun', parmak: 1 });
  expect(adim(d)).toBe('frekans');
  if (kayitla) {
    const k = JSON.parse(JSON.stringify(d));
    Object.assign(d, k);
  }
  for (let i = 0; i < 40 && adim(d) === 'frekans'; i++) g({ tur: 'dondur', f: 0.2 });
  expect(adim(d)).toBe('ates2');
  expect(d.savas.dusman.delik).toBe(true);
  g({ tur: 'dokun', parmak: 1 });
  expect(adim(d)).toBe('agir');
  g({ tur: 'kaydir', yon: 'yukari', parmak: 1 });
  expect(adim(d)).toBe('kalkan');
  // Kalkan adımı: önce yanlış (savunmasız) dene, adım yinelenir; hasar yok
  const can0 = d.savas.ortam === 'kara' ? d.savas.can : d.gemi.govde;
  g({ tur: 'dokun', parmak: 1 });
  uyariBekle(d);
  ilerle(6);
  expect(adim(d)).toBe('kalkan');
  expect(d.savas.ortam === 'kara' ? d.savas.can : d.gemi.govde).toBe(can0);
  g({ tur: 'dokun', parmak: 1 });
  uyariBekle(d);
  g({ tur: 'dokun', parmak: 2 });
  ilerle(0.3);
  expect(adim(d)).toBe('kacinma');
  g({ tur: 'dokun', parmak: 1 });
  uyariBekle(d);
  expect(d.savas.uyari.yon).toBe('sol');
  expect(sozler(g({ tur: 'kaydir', yon: 'sol', parmak: 1 }))).toContain('Yanlış');
  g({ tur: 'kaydir', yon: 'sag', parmak: 1 });
  ilerle(0.3);
  expect(adim(d)).toBe('karsi');
  g({ tur: 'dokun', parmak: 1 });
  uyariBekle(d);
  g({ tur: 'cift', parmak: 1 });
  ilerle(0.3);
  expect(adim(d)).toBe('yetenek');
  expect(sozler(g({ tur: 'cift', parmak: 1 }))).toContain('Şimdi');
  g({ tur: 'kaydir', yon: 'asagi', parmak: 1 });
  g({ tur: 'cift', parmak: 1 });
  expect(adim(d)).toBe('durum');
  return g({ tur: 'dokun', parmak: 2 });
}

describe('Savaş eğitimi', () => {
  test('uzayda ilk çatışma önce eğitimi açar; dokuz adım; bitince bekleyen korsan saldırır', () => {
    const d = uzaydaOyun();
    const o = SV.savasBaslat(d, 'korsan_avci');
    expect(d.savas.egitim).toBeTruthy();
    expect(d.savas.dusman.tur).toBe('egitim_dronu');
    expect(sozler(o)).toContain('Uzay savaş eğitimi');
    const son = egitimiOyna(d, true);
    expect(d.bayrak.egitim_uzay).toBe(true);
    expect(son.some((x) => x.yeniSavas)).toBe(true);
    expect(sozler(son)).toContain('gerçek çatışma');
    expect(d.savas.egitim).toBeFalsy();
    expect(d.savas.dusman.tur).toBe('korsan_avci');
    expect(d.gemi.govde).toBe(d.gemi.maxGovde);
    // İkinci uzay çatışması doğrudan başlar
    d.savas = null;
    SV.savasBaslat(d, 'korsan_korvet');
    expect(d.savas.egitim).toBeFalsy();
  });
  test('kara eğitimi ayrı; savaş sonrası sahnesi korunur; menüden yineleme çatışmasız biter', () => {
    const d = yeniOyun(9);
    d.bayrak.egitim_uzay = true;
    d.savasSonraSahne = 'kom_savunma';
    SV.savasBaslat(d, { dusmanlar: ['sulfur_akrebi'], ortam: 'kara' });
    expect(d.savas.dusman.tur).toBe('egitim_otomati');
    expect(d.savas.ortam).toBe('kara');
    egitimiOyna(d, false);
    expect(d.bayrak.egitim_kara).toBe(true);
    expect(d.savas.dusman.tur).toBe('sulfur_akrebi');
    expect(d.savasSonraSahne).toBe('kom_savunma');
    d.savas = null;
    SV.egitimBaslat(d, 'kara');
    expect(d.savas.egitim.sonra).toBe(null);
    const son = egitimiOyna(d, false);
    expect(son.some((x) => x.bitti)).toBe(true);
    expect(d.savas).toBe(null);
  });
  test('eğitimde sarf ve kaçış yeteneği harcanmaz; savaşı bitirmez', () => {
    const d = uzaydaOyun(3);
    d.bayrak.tf_sicrayici = true;
    SV.egitimBaslat(d, 'uzay');
    d.savas.egitim.adim = ADIMLAR.findIndex((a) => a.id === 'yetenek');
    for (let i = 0; i < 3; i++) SV.savasGirdi(d, { tur: 'kaydir', yon: 'asagi', parmak: 1 });
    SV.savasGirdi(d, { tur: 'cift', parmak: 1 });
    expect(d.savas).toBeTruthy();
    expect(adim(d)).toBe('durum');
  });
});
