// 5.4: v6 Paket 14 (saha araçları, rota olayları, Axira Çemberi), Paket 15 (Kara Şehir, Arin tapınağı, Su Mezarı eşiği),
// Paket 16 (tekrarlanabilir şehir işleri), karakter 25-30 ve Keşiş Vaelor
import { describe, expect, test, afterEach } from 'bun:test';
import { yeniOyun } from '../src/oyun/durum';
import { zamanIlerle, sahneSecenekleri, sahneSec, noktaEylemleri, eylemUygula } from '../src/oyun/yuzey/gorevler';
import { NOKTALAR } from '../src/oyun/yuzey/harita';
import * as YG from '../src/oyun/ygk';
import * as BY from '../src/oyun/buyu/buyu';
import * as BM from '../src/oyun/buyu/bulmaca';
import * as ZN from '../src/oyun/tonoflenya/zanaat';
import { GUN_SN } from '../src/oyun/zaman';
import { SEYAHAT_KANCALARI } from '../src/oyun/tonoflenya/atlas';
import { seyahatKurali } from '../src/oyun/tonoflenya/gecitler';
import { aracYap } from '../src/oyun/ygk/kisiler/k14';
import { SAHNELER as FS } from '../src/oyun/tonoflenya/final';

const { Y } = YG;
afterEach(() => BM.kolayModAyarla(false));
function oyun() {
  const d = yeniOyun(11);
  d.sahne = null;
  zamanIlerle(d, 1);
  BY.hazirla(d);
  BY.asaUyandir(d);
  d.sahne = null;
  d.bayrak.tonoflenyaGoruldu = true;
  return d;
}
function coz(d) {
  BM.kolayModAyarla(true);
  let say = 0;
  while (d.bulmaca && say++ < 40) {
    const l = BM.dugumler(d);
    const i = l.findIndex((n) => !BM.cozulduMu(d, n) && (!n.on || n.on.every((x) => BM.cozulduMu(d, l.find((m) => m.id === x)))));
    if (i < 0) break;
    d.bulmaca.i = i;
    d.buyu.odak = 100;
    const n = l[i];
    const c = n.kombolar.find((k) => k.every((el) => BM.elemanUlasilir(d, el, n)));
    if (!c) BM.sec(d, 'yedek');
    else for (const el of c) if (d.bulmaca) { d.buyu.odak = 100; BM.sec(d, el); }
  }
}
const YENI = ['xaela', 'misket', 'sifir', 'zahra', 'kikirdak', 'cakal', 'vaelor'];

describe('Karakter 25-30 ve Vaelor', () => {
  test('yedi kişi, noktaları haritada, üçer görev (Vaelor bir)', () => {
    for (const k of YENI) {
      const ki = Y.KISILER[k];
      expect(ki.kademeler.length).toBe(11);
      expect(NOKTALAR[ki.nokta]).toBeTruthy();
      expect(ki.gorevler.length).toBe(k === 'vaelor' ? 1 : 3);
    }
  });
  test('kişinin noktasında bağ eylemi var', () => {
    const d = oyun();
    expect(noktaEylemleri(d, 'yg_xaela').some((e) => e.id === 'yg_bag')).toBe(true);
    expect(noktaEylemleri(d, 'arin_tapinagi').some((e) => e.id === 'yg_bag_vaelor')).toBe(true);
  });
  test('Paket 11 teçhizatı kişiden: kademe 5 ile ücretsiz, öncesi ML ile', () => {
    const d = oyun();
    d.para = { ml: 0, gk: 0 };
    const al = () => Y.kisiMenu(d, 'kikirdak').ogeler.find((o) => o.id === 'sehir_techizat');
    expect(al().yap(d).ses).toBe('red');
    Y.kayit(d, 'kikirdak').k = 5;
    al().yap(d);
    expect(ZN.miktar(d, 'fisilti_filtresi')).toBe(1);
  });
  test('LAN-01 Yol B: Xaela zorla senkronlar, görev biter', () => {
    const d = oyun();
    d.tf = { biten: [18] };
    ZN.ekle(d, 'tamir_kiti', 1);
    const o = Y.kisiMenu(d, 'xaela').ogeler.find((x) => x.id === 'lan_b');
    o.yap(d);
    expect(d.bayrak.sicramaZorla).toBe(true);
    expect(Y.gorevDurumu(d, 'LAN-01')).toBe('bitti');
  });
  test('ZAH-03 tarafsız mühür ambargoyu kırar', () => {
    const d = oyun();
    d.tf = { biten: [1] };
    d.bayrak.ambargo = 'tasra';
    const y = { ayaklar: [] };
    expect(seyahatKurali(d, y, 'magentor', { magentor: {} }).red).toBeTruthy();
    ZN.ekle(d, 'tarafsiz_muhur', 1);
    expect(seyahatKurali(d, y, 'magentor', { magentor: {} }).red).toBeFalsy();
  });
});

describe('Paket 14: saha araçları ve rota olayları', () => {
  test('saha aracı ustasında yapılır ve bulmaca elemanı olur', () => {
    const d = oyun();
    expect(aracYap(d, 'sabit_yanki_muhru').ses).toBe('red');
    ZN.ekle(d, 'fosil', 1);
    ZN.ekle(d, 'piezo', 1);
    aracYap(d, 'sabit_yanki_muhru');
    expect(ZN.miktar(d, 'sabit_yanki_muhru')).toBe(1);
    expect(BM.elemanUlasilir(d, 'sabit_yanki_muhru', { kombolar: [['sabit_yanki_muhru']] })).toBe(true);
    expect(Y.kisiMenu(d, 'kaelis').ogeler.some((o) => o.id === 'saha_araci')).toBe(true);
  });
  test('yolculuk ilk geçişte rota olayını açar', () => {
    const d = oyun();
    expect(Y.gorevDurumu(d, 'ROTA-03')).toBe('kosul');
    const m = SEYAHAT_KANCALARI.map((f) => f(d, { ayaklar: [{ a: 'veradon', c: 'oredan', from: 'veradon', to: 'oredan' }] }, 'oredan')).join(' ');
    expect(m).toContain('ROTA-03');
    expect(Y.gorevDurumu(d, 'ROTA-03')).toBe('acik');
    expect(SEYAHAT_KANCALARI.map((f) => f(d, { ayaklar: [{ a: 'veradon', c: 'oredan' }] }, 'oredan')).join('')).toBe('');
  });
});

describe('Paket 14-15: Axira, Kara Şehir, Su Mezarı', () => {
  test('AXI-02 açıksa Final 17\'de yanal sızma seçeneği', () => {
    const d = oyun();
    d.tf = { aktif: 17, biten: [1, 16], evre: null };
    const l = () => FS.tf_giris.secenekler(d).map((o) => o.etiket);
    expect(l().some((e) => e.includes('bakım kapısı'))).toBe(false);
    d.bayrak.axiraYanGecit = true;
    expect(l()[0]).toContain('bakım kapısı');
  });
  test('üç kule tek tek sayılır', () => {
    const d = oyun();
    d.tf = { biten: [15] };
    for (const id of ['KAR-01a', 'KAR-01b']) Y.kayit(d, 'saha').gorev[id] = 'bitti';
    d.mekan = Y.gorevYeri('KAR-01c').mekan;
    Y.gorevBaslat(d, 'KAR-01c');
    sahneSec(d, 'ygk_gorev', 0);
    coz(d);
    sahneSec(d, 'ygk_secim', 0);
    expect(d.bayrak.karKule).toBe(3);
    expect(ZN.miktar(d, 'kara_sehir_kaydi')).toBe(1);
  });
  test('CAH-01 Cahelon\'un yankısı', () => {
    const d = oyun();
    d.tf = { biten: [19] };
    d.mekan = Y.gorevYeri('CAH-01').mekan;
    Y.gorevBaslat(d, 'CAH-01');
    sahneSec(d, 'ygk_gorev', 0);
    coz(d);
    sahneSec(d, 'ygk_secim', 0);
    expect(d.bayrak.cahelonYanki).toBe(true);
  });
});

describe('Paket 16: tekrarlanabilir şehir işleri', () => {
  test('günde bir kez; ertesi gün yeniden', () => {
    const d = oyun();
    const ek = noktaEylemleri(d, 'kabul_masasi').find((e) => e.id === 'yg_sehir');
    expect(ek).toBeTruthy();
    const r = eylemUygula(d, 'kabul_masasi', 'yg_sehir');
    expect(r.buyu).toBe(true);
    coz(d);
    expect(d.bulmaca).toBeFalsy();
    expect(ZN.miktar(d, 'muhur_kutusu') + ZN.miktar(d, 'dunya_cayi')).toBe(1);
    expect(eylemUygula(d, 'kabul_masasi', 'yg_sehir').metin).toContain('Bugünlük');
    d.zaman.sn += GUN_SN;
    expect(eylemUygula(d, 'kabul_masasi', 'yg_sehir').buyu).toBe(true);
  });
  test('Arin tapınağı odağı doldurur', () => {
    const d = oyun();
    d.buyu.odak = 5;
    eylemUygula(d, 'arin_tapinagi', 'yg_sehir');
    coz(d);
    expect(d.bulmaca).toBeFalsy();
    expect(d.buyu.odak).toBeGreaterThanOrEqual(90);
  });
});
