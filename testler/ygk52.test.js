// 5.2: Paket 4 (hiyerarşi, pozisyon, zincir), Paket 6A/6B (bölge bağları, yerinde görevler), Paket 7 (seçkin subaylar)
import { describe, expect, test, afterEach } from 'bun:test';
import { yeniOyun } from '../src/oyun/durum';
import { zamanIlerle, eylemUygula, noktaEylemleri, sahneSecenekleri, sahneSec } from '../src/oyun/yuzey/gorevler';
import { NOKTALAR } from '../src/oyun/yuzey/harita';
import * as YG from '../src/oyun/ygk';
import * as BY from '../src/oyun/buyu/buyu';
import * as BM from '../src/oyun/buyu/bulmaca';
import * as ZN from '../src/oyun/tonoflenya/zanaat';
import { gucEkle } from '../src/oyun/tonoflenya/kisiler';

const { Y, SY } = YG;
afterEach(() => BM.kolayModAyarla(false));
function oyun() {
  const d = yeniOyun(7);
  d.sahne = null;
  zamanIlerle(d, 1);
  BY.hazirla(d);
  BY.asaUyandir(d);
  d.sahne = null;
  d.bayrak.tonoflenyaGoruldu = true;
  return d;
}
const YENI = ['oronte', 'cuce', 'sarah', 'zeno', 'kasim', 'mirelza', 'kaelan', 'barracuda', 'nyxara', 'elyndra', 'varek', 'axira', 'zhaor', 'sinha', 'drahmir'];

describe('Veri', () => {
  test('on beş yeni kişi, 11 kademe, imza, görevler', () => {
    for (const k of YENI) {
      const ki = Y.KISILER[k];
      expect(ki).toBeTruthy();
      expect(ki.kademeler.length).toBe(11);
      expect(ki.gorevler.length).toBeGreaterThan(0);
    }
  });
  test('Paket 6A/6B/7 görev kodlarının hepsi var', () => {
    for (const g of ['FIL-01', 'FIL-02', 'FIL-03', 'FIL-04', 'FIL-05', 'FIL-06', 'ZOR-01', 'ZOR-02', 'ZOR-03', 'ZOR-04', 'ZOR-05', 'ZOR-06', 'KUZ-01', 'KUZ-02', 'KUZ-03', 'KUZ-04', 'KUZ-05', 'KUZ-06', 'GUN-01', 'GUN-02', 'GUN-03', 'GUN-04', 'GUN-05', 'GUN-06', 'SUB-01', 'SUB-02', 'SUB-03', 'SUB-04', 'SUB-05', 'SUB-06', 'ZIN-02']) expect(Y.GOREVLER[g]).toBeTruthy();
  });
  test('kişi noktaları haritada', () => {
    for (const k of YENI.filter((x) => !Y.KISILER[x].subay)) expect(NOKTALAR[Y.KISILER[k].nokta]).toBeTruthy();
  });
});

describe('Paket 4: pozisyon ve etiket', () => {
  test('üç pozisyon itibardan çıkar', () => {
    const d = oyun();
    expect(SY.pozisyon(d)).toBe(null);
    gucEkle(d, 'ygk', 40);
    expect(SY.pozisyon(d)).toBe('A');
    for (const g of ['bati', 'guney', 'kuzey']) gucEkle(d, g, 40);
    expect(SY.pozisyon(d)).toBe('C');
    gucEkle(d, 'ygk', -60);
    expect(SY.pozisyon(d)).toBe('B');
    expect(SY.carpan(d, Y.KISILER.valen, 'gorev')).toBe(0.5);
    expect(SY.carpan(d, Y.KISILER.oronte, 'gorev')).toBe(1.15);
  });
  test('görev listesinde sınıf etiketi okunur', () => {
    const d = oyun();
    const m = Y.gorevlerMenu(d, 'oronte');
    expect(m.ogeler[0].etiket.indexOf('[Hiyerarşi]')).toBe(0);
    expect(m.ogeler.find((o) => o.id === 'FIL-02').etiket.indexOf('[Zincir]')).toBe(0);
  });
  test('siyaset menüsü', () => {
    const d = oyun();
    expect(SY.siyasetMenu(d).ogeler.length).toBe(9);
    expect(YG.bolgeMenu(d).ogeler.length).toBe(20);
  });
});

describe('Yerinde görevler', () => {
  test('uzakta başlamaz, işaret görünür, yerinde başlar', () => {
    const d = oyun();
    d.mekan = 'vadi';
    const r = Y.gorevBaslat(d, 'FIL-01');
    expect(r.metin).toContain('yerinde yapılır');
    expect(d.ygk.acikYer['FIL-01']).toBe(true);
    const n = NOKTALAR['yg_yer_FIL-01'];
    expect(n.gorunur(d)).toBe(true);
    d.mekan = n.mekan;
    expect(noktaEylemleri(d, 'yg_yer_FIL-01').some((e) => e.id === 'yg_gorev')).toBe(true);
    eylemUygula(d, 'yg_yer_FIL-01', 'yg_gorev');
    expect(d.sahne).toBe('ygk_gorev');
    expect(YG.sesYerleri(d, NOKTALAR).some((x) => x.id === 'yer_FIL-01')).toBe(true);
  });
});

describe('Zincir: Filtra ve Zorah', () => {
  function bitir(d, gid, secimEtiket) {
    const g = Y.GOREVLER[gid];
    for (const o of g.once || []) Y.kayit(d, Y.GOREVLER[o].kisi).gorev[o] = 'bitti';
    const r = Y.kayit(d, g.kisi);
    r.k = 10;
    const yer = Y.gorevYeri(gid);
    if (yer) d.mekan = yer.mekan;
    Y.gorevBaslat(d, gid);
    d.ygk.aktif = gid;
    d.sahne = 'ygk_secim';
    const l = sahneSecenekleri(d, 'ygk_secim');
    const i = secimEtiket ? l.findIndex((o) => o.etiket.indexOf(secimEtiket) >= 0) : 0;
    expect(i).toBeGreaterThanOrEqual(0);
    sahneSec(d, 'ygk_secim', i);
  }
  test('FIL-02 sonra ZOR-02 ikna ister; denge yolu ateşkes', () => {
    const d = oyun();
    bitir(d, 'FIL-02', 'teslim');
    expect(d.bayrak.filtraSilah).toBe(true);
    Y.kayit(d, 'zeno').k = 6;
    Y.kayit(d, 'zeno').gorev['ZOR-01'] = 'bitti';
    expect(Y.gorevDurumu(d, 'ZOR-02')).toBe('kosul');
    const ek = Y.kisiMenu(d, 'zeno').ogeler.find((o) => o.id === 'ikna');
    expect(ek).toBeTruthy();
    ek.alt(d).ogeler[0].yap(d);
    expect(d.bayrak.zenoIkna).toBe(true);
    Y.kayit(d, 'oronte').k = 6;
    bitir(d, 'ZOR-02', 'Denge');
    expect(d.bayrak.filtraZorahAteskes).toBe(true);
    expect(d.ygk.tepki).toContain('bati');
  });
  test('gemide subay yorumu', () => {
    const d = oyun();
    d.bayrak.seckinKadro = true;
    Y.hazirla(d);
    SY.tepkiEkle(d, 'dogu');
    expect(SY.tepkiIlerle(d).length).toBe(0);
    d.gemide = true;
    expect(SY.tepkiIlerle(d)[0]).toBeTruthy();
  });
});

describe('T3 asa', () => {
  test('parça, onay, malzeme ve T2 gerekir', () => {
    const d = oyun();
    const { t3Durumu, t3Yap } = require('../src/oyun/ygk/kisiler/k11');
    expect(t3Durumu(d)).toContain('ikinci kademe');
    BY.asaYukselt(d, 2);
    expect(t3Durumu(d)).toContain('GUN-04');
    d.bayrak.t3Parca = true;
    d.bayrak.nyxaraMektup = true;
    expect(t3Durumu(d)).toContain('Eksik');
    ZN.ekle(d, 'cekirdek_tasi', 1);
    ZN.ekle(d, 'saf_aether', 1);
    expect(t3Durumu(d)).toBe(null);
    t3Yap(d);
    expect(d.buyu.asa).toBe(3);
  });
});

describe('Seçkin subaylar', () => {
  test('kadro yokken menü boş, varken altı subay', () => {
    const d = oyun();
    expect(YG.subayMenu(d).ogeler.length).toBe(0);
    d.bayrak.seckinKadro = true;
    expect(YG.subayMenu(d).ogeler.length).toBe(6);
  });
  test('SUB-06 denge yolu Elyndra kırgınlığını kaldırır', () => {
    const d = oyun();
    d.bayrak.seckinKadro = true;
    Y.kayit(d, 'elyndra').kirgin = true;
    Y.kayit(d, 'drahmir').k = 5;
    d.ygk.aktif = 'SUB-06';
    d.sahne = 'ygk_secim';
    const l = sahneSecenekleri(d, 'ygk_secim');
    sahneSec(d, 'ygk_secim', l.findIndex((o) => o.etiket.indexOf('Denge') >= 0));
    expect(d.ygk.k.elyndra.kirgin).toBe(false);
    expect(d.bayrak.ortakKilit).toBe(true);
  });
  test('hediye: Drahmir balı geri çevirir, demir cevherini sever', () => {
    const d = oyun();
    d.bayrak.seckinKadro = true;
    ZN.ekle(d, 'bal', 1);
    ZN.ekle(d, 'demir_cevheri', 1);
    expect(Y.hediyeVer(d, 'drahmir', 'bal').metin).toContain('çay bahçesi');
    d.ygk.k.drahmir.hediyeGun = -1;
    expect(Y.hediyeVer(d, 'drahmir', 'demir_cevheri').metin).toContain('taşın altına');
  });
});
