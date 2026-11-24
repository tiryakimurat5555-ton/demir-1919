// 5.5: v6 Paket 8, Tonoflenya büyü finali (beş muhafız, Kaos Mührü, üç siyasi kapanış, Tam Rezonans)
import { describe, expect, test, afterEach } from 'bun:test';
import { yeniOyun } from '../src/oyun/durum';
import { zamanIlerle, sahneSecenekleri, sahneSec, SAHNELER } from '../src/oyun/yuzey/gorevler';
import * as YG from '../src/oyun/ygk';
import * as BY from '../src/oyun/buyu/buyu';
import * as BM from '../src/oyun/buyu/bulmaca';
import { BUYULER, TUREVLER } from '../src/oyun/buyu/veri';
import { gucEkle } from '../src/oyun/tonoflenya/kisiler';
import { finalEksikleri, epilog } from '../src/oyun/ygk/kisiler/k16';

const { Y } = YG;
afterEach(() => BM.kolayModAyarla(false));
function oyun() {
  const d = yeniOyun(13);
  d.sahne = null;
  zamanIlerle(d, 1);
  BY.hazirla(d);
  BY.asaUyandir(d);
  d.sahne = null;
  d.bayrak.tonoflenyaGoruldu = true;
  return d;
}
function hazir(d) {
  d.buyu.asa = 3;
  for (const r of ['kizil', 'mavi', 'sari', 'yesil']) d.buyu.taslar[r] = 3;
  d.buyu.taslar.mor = 1;
  for (const g of ['bati', 'dogu', 'kuzey', 'guney', 'ygk']) gucEkle(d, g, 30);
  for (const k of [...Object.keys(BUYULER), ...Object.keys(TUREVLER)]) BY.ogret(d, k);
  BY.siseEkle(d, 'lumina', 3);
  BY.siseEkle(d, 'solis', 3);
}
function coz(d) {
  BM.kolayModAyarla(true);
  let say = 0;
  while (d.bulmaca && say++ < 60) {
    const l = BM.dugumler(d);
    const i = l.findIndex((n) => !BM.cozulduMu(d, n) && (!n.on || n.on.every((x) => BM.cozulduMu(d, l.find((m) => m.id === x)))));
    if (i < 0) break;
    d.bulmaca.i = i;
    const n = l[i];
    const c = n.kombolar.find((k) => k.every((el) => BM.elemanUlasilir(d, el, n)));
    d.buyu.odak = 100;
    if (!c) { BM.sec(d, 'yedek'); continue; }
    for (const el of c) {
      if (!d.bulmaca) break;
      if (el === 'yildirim_dusur') { let s = 0; while (d.bulmaca.hava < 3 && s++ < 10) { d.buyu.odak = 100; BM.sec(d, 'h_isit'); } }
      d.buyu.odak = 100;
      BM.sec(d, el);
    }
  }
}
function oyna(d) {
  d.mekan = Y.gorevYeri('BF-01').mekan;
  Y.gorevBaslat(d, 'BF-01');
  expect(d.sahne).toBe('ygk_gorev');
  sahneSec(d, 'ygk_gorev', 0);
  coz(d);
  expect(d.bulmaca).toBeFalsy();
  expect(d.sahne).toBe('ygk_secim');
  const l = sahneSecenekleri(d, 'ygk_secim');
  expect(l.length).toBe(1);
  sahneSec(d, 'ygk_secim', 0);
  expect(d.sahne).toBe('ygk_sonuc');
}

describe('Açılış şartı', () => {
  test('eksikler sayılır; tamamlanınca açılır', () => {
    const d = oyun();
    expect(finalEksikleri(d).length).toBeGreaterThan(0);
    expect(Y.gorevDurumu(d, 'BF-01')).toBe('kosul');
    hazir(d);
    expect(finalEksikleri(d)).toEqual([]);
    expect(Y.gorevDurumu(d, 'BF-01')).toBe('acik');
  });
  test('bölge şartı görevle de dolar', () => {
    const d = oyun();
    hazir(d);
    gucEkle(d, 'kuzey', -30);
    expect(finalEksikleri(d).join(' ')).toContain('Kuzey');
    Y.kayit(d, 'mirelza').gorev['KUZ-01'] = 'bitti';
    expect(finalEksikleri(d)).toEqual([]);
  });
});

describe('Final', () => {
  test('Denge Yolu kapanışı, ödüller ve akor sahnesi', () => {
    const d = oyun();
    hazir(d);
    oyna(d);
    expect(d.bayrak.buyuFinali).toBe('C');
    expect(d.bayrak.malazarUstasi).toBe(true);
    expect(d.tf.unvan).toContain('Malazar Büyük Ustası');
    expect(BY.odakTavani(d)).toBe(120);
    expect(d.ygk.sonuc).toContain('eşit ortaklar');
    expect(d.buyu.taslar.mor).toBe(0); // muhafızların taşları kalıcı
    sahneSec(d, 'ygk_sonuc', 0);
    expect(d.sahne).toBe('bf_akor');
    expect(SAHNELER.bf_akor.metin(d).length).toBe(2);
    expect(Y.gorevDurumu(d, 'BF-01')).toBe('bitti');
  });
  test('Başkent kapanışı; Valen stasisteyse Morvenna konuşur', () => {
    const d = oyun();
    hazir(d);
    gucEkle(d, 'bati', -60); gucEkle(d, 'guney', -60); gucEkle(d, 'kuzey', -60);
    gucEkle(d, 'ygk', 30);
    Y.kayit(d, 'oronte').gorev['FIL-01'] = 'bitti';
    Y.kayit(d, 'barracuda').gorev['GUN-01'] = 'bitti';
    Y.kayit(d, 'mirelza').gorev['KUZ-01'] = 'bitti';
    oyna(d);
    expect(d.bayrak.buyuFinali).toBe('A');
    const d2 = oyun();
    d2.bayrak.valenKapali = true;
    expect(epilog(d2, 'A')).toContain('Morvenna Kael');
    expect(epilog(oyun(), 'A')).toContain('Valen Lazeria resmi mührünü');
  });
  test('Taşra kapanışı ve Tam Rezonans satırı', () => {
    const d = oyun();
    d.bayrak.tamRezonans = true;
    d.bayrak.axiraCizgisi = true;
    const m = epilog(d, 'B');
    expect(m).toContain('Serbest Lonca');
    expect(m).toContain('zümrüt ışık');
  });
});
