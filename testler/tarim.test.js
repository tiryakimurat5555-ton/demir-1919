// Tarım motoru ve Yıldız Zamanı (2.0): ekim, bakım, hasat, işleme, kolonist, kademe, melez, erzak etkileri
import { describe, expect, test } from 'bun:test';
import { yeniOyun } from '../src/oyun/durum';
import * as T from '../src/oyun/tarim/tarim';
import * as E from '../src/oyun/tarim/etki';
import { BITKILER, ISLEME } from '../src/oyun/tarim/bitkiler';
import { eylemUygula, noktaEylemleri, zamanIlerle, zamanMetni } from '../src/oyun/yuzey/gorevler';
import { zamanAkit, NOBET_SN, nobetNo } from '../src/oyun/zaman';
import { bosta, harca, yeterMi, girdiMetni } from '../src/oyun/koloni';

function hazirla() {
  const d = yeniOyun(7);
  d.bayrak.sondaj = true;
  d.mekan = 'tarim';
  d.sahne = null;
  return d;
}
// Yatağı dengede tutarak n saniye ilerlet (bakım: her adımda suyu ideale çek)
function bak(d, y, sn) {
  for (let t = 0; t < sn; t += 5) {
    if (y.bitki) {
      y.su = BITKILER[y.bitki].su;
      y.isi = BITKILER[y.bitki].isi;
    }
    T.tarimIlerle(d, 5);
  }
}

describe('Tarım', () => {
  test('ilk girişte tohum kesesi; çapala, ek, büyüt, hasat et', () => {
    const d = hazirla();
    const o = T.tarimIlerle(d, 1);
    expect(o.some((x) => x.acil)).toBe(true);
    expect(d.tarim.tohumlar.don_kiran).toBe(2);
    T.tarlaAc(d, 'sera');
    expect(T.tarlaEk(d).ses).toBe('red'); // çapalanmadan olmaz
    for (let i = 0; i < T.CAPA_VURUS; i++) T.tarlaCapa(d);
    const r = T.tarlaEk(d);
    expect(r.ses).toBe('ekme');
    const y = T.tarlaYatak(d);
    expect(y.bitki).toBe('don_kiran');
    expect(T.tarlaHasat(d).ses).toBe('red');
    bak(d, y, BITKILER.don_kiran.dongu * T.DONGU_SN + 60);
    expect(y.buyume).toBe(1);
    const h = T.tarlaHasat(d);
    expect(h.ses).toBe('hasat');
    expect(d.tarim.urun.don_kiran).toBe(3);
    expect(y.bitki).toBe(null);
  });

  test('susuz kalan bitki kurur ve ölür', () => {
    const d = hazirla();
    T.tarimIlerle(d, 1);
    T.tarlaAc(d, 'sera');
    for (let i = 0; i < 3; i++) T.tarlaCapa(d);
    T.tarlaEk(d);
    const y = T.tarlaYatak(d);
    y.su = 0;
    for (let t = 0; t < 5 * T.DONGU_SN; t += 5) T.tarimIlerle(d, 5);
    expect(y.bitki).toBe(null);
  });

  test('vana ve sıcaklık', () => {
    const d = hazirla();
    T.tarlaAc(d, 'sera');
    const y = T.tarlaYatak(d);
    const su = y.su;
    T.tarlaVana(d, 1);
    expect(y.su).toBeGreaterThan(su);
    const isi = y.isi;
    T.tarlaIsi(d, 1);
    expect(y.isi).toBe(isi + 2);
  });

  test('kolonist bakımı ve otomatik hasat', () => {
    const d = hazirla();
    T.tarimIlerle(d, 1);
    d.koloni.nufus.toplam = 6;
    const bos = bosta(d);
    T.tarlaAc(d, 'sera');
    for (let i = 0; i < 3; i++) T.tarlaCapa(d);
    T.tarlaEk(d);
    const r = T.isciDegistir(d, 'sera', 0, bosta(d));
    expect(r.ses).toBeUndefined();
    expect(bosta(d)).toBe(bos - 1);
    for (let t = 0; t < 5 * T.DONGU_SN; t += 5) T.tarimIlerle(d, 5);
    // Hasat edildi (bir kısmını kolonistler yedi) ve aynı tohumdan yeniden ekildi
    expect(d.tarim.besli.insan).toBe(true);
    expect(d.tarim.yataklar[0].bitki).toBe('don_kiran');
    expect(d.tarim.yataklar[0].buyume).toBeLessThan(1);
  });

  test('kademe yükseltme yatak sayısını artırır; kubbe tohumu terasa ekilmez', () => {
    const d = hazirla();
    T.tarim(d);
    expect(d.tarim.yataklar.length).toBe(4);
    Object.assign(d.koloni.kaynaklar, { titanyum: 50, polimer: 50, bazalt: 50, kseno: 50, kristal: 50, izotop: 50 });
    expect(T.kademeYukselt(d, harca, yeterMi, girdiMetni).ses).toBe('kur');
    expect(d.tarim.yataklar.length).toBe(8);
    expect(T.kademeYukselt(d, harca, yeterMi, girdiMetni).ses).toBe('red'); // biyo-kubbe yok
    d.koloni.binalar.push('biyo_kubbe');
    T.kademeYukselt(d, harca, yeterMi, girdiMetni);
    expect(d.tarim.yataklar.filter((y) => y.ortam === 'kubbe').length).toBe(4);
    d.tarim.tohumlar = { magma_korugu: 1 };
    T.tarlaAc(d, 'sera');
    expect(T.uygunTohumlar(d, T.tarlaYatak(d))).toEqual([]);
    d.tarla.i = 12;
    expect(T.uygunTohumlar(d, T.tarlaYatak(d))).toEqual(['magma_korugu']);
  });

  test('uzay görevi kseno-tohum verir; yabani ve kasa tohumları', () => {
    const d = hazirla();
    d.tamamlananOp = ['g17'];
    T.tarimIlerle(d, 1);
    expect(d.tarim.tohumlar.magma_korugu).toBe(2);
    expect(T.yabaniTopla(d, 'yabani_hurma').ses).toBe('topla');
    expect(T.yabaniTopla(d, 'yabani_hurma').ses).toBe('red');
    expect(d.tarim.tohumlar.vaha_hurmasi).toBe(2);
    expect(noktaEylemleri(d, 'vanguard_enkaz').some((e) => e.id === 't_kasa')).toBe(true);
    eylemUygula(d, 'vanguard_enkaz', 't_kasa');
    expect(d.tarim.tohumlar.soya).toBe(3);
  });

  test('işleme: tesis gerekir; erzak kalkışta yüklenir, etkisi seferle biter', () => {
    const d = hazirla();
    T.tarim(d);
    d.tarim.urun = { don_kiran: 2, akifer: 1, obsidyen_mantari: 3, noro_kahve: 1 };
    expect(T.isle(d, 'peksimet').ses).toBe('red');
    d.koloni.binalar.push('koloni_mutfagi', 'dokumhane');
    expect(T.isle(d, 'peksimet').ses).toBe('kur');
    expect(d.tarim.erzak.peksimet).toBe(1);
    T.isle(d, 'noro_infuzyon');
    T.erzakYukle(d);
    expect(E.etkiVar(d, 'peksimet')).toBe(true);
    expect(E.fenerCarpani(d)).toBeCloseTo(1.15);
    d.seferSure = 400;
    const once = d.koloni.moral;
    T.seferBitti(d);
    expect(d.koloni.moral).toBe(once);
    expect(E.etkiVar(d, 'peksimet')).toBe(false);
    expect(E.etkiVar(d, 'kahve')).toBe(true); // iki sefer
    // Kalıcı: zırh astarı aktif geminin gövdesini artırır
    d.gemi = { govde: 50, maxGovde: 50, moduller: {} };
    T.isle(d, 'zirh_astari');
    expect(d.gemi.maxGovde).toBe(60);
  });

  test('her tarifin girdisi tanımlı bir bitki', () => {
    for (const x of ISLEME) for (const k of Object.keys(x.girdi)) expect(BITKILER[k]).toBeDefined();
  });

  test('melezleme: tonlar birleşince kuluçka, iki döngü sonra melez tohum', () => {
    const d = hazirla();
    T.tarim(d);
    d.koloni.binalar.push('biyo_kubbe');
    d.tarim.tohumlar = { noro_kahve: 1, vaha_hurmasi: 1 };
    expect(T.melezBaslat(d, 'altin_hurma').melez).toBe(true);
    T.melezDondur(d, -d.melez.oktav / 0.25);
    let o = [];
    for (let i = 0; i < 30 && d.melez; i++) o = T.melezIlerle(d, 0.1);
    expect(o).toContain('tamam');
    expect(d.tarim.kulucka.id).toBe('altin_hurma');
    T.tarimIlerle(d, 2 * T.DONGU_SN + 1);
    expect(d.tarim.tohumlar.altin_hurma).toBe(2);
  });

  test('beslenme: Vaelin aç kalırsa moral düşer, jel varsa tok', () => {
    const d = hazirla();
    T.tarim(d);
    d.tamamlananOp = ['g14'];
    d.tarim.verilen = ['g14'];
    const m = d.koloni.moral;
    T.tarimIlerle(d, T.BESLEME_SN);
    expect(d.tarim.besli.vaelin).toBe(false);
    expect(d.koloni.moral).toBeLessThan(m);
    d.tarim.besin.vaelin = 1;
    T.tarimIlerle(d, T.BESLEME_SN);
    expect(d.tarim.besli.vaelin).toBe(true);
  });
});

describe('Yıldız Zamanı', () => {
  test('nöbet değişimi olayı ve zaman metni', () => {
    const d = yeniOyun(3);
    expect(nobetNo(d)).toBe(0);
    expect(zamanAkit(d, NOBET_SN - 1)).toEqual([]);
    const o = zamanAkit(d, 2);
    expect(o[0].tur).toBe('nobet');
    expect(nobetNo(d)).toBe(1);
    expect(zamanMetni(d)).toContain('Kızıl Kuşluk');
    expect(zamanIlerle(d, 1)).toBeDefined();
  });
});
