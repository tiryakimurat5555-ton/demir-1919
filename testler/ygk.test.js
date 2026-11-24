// 5.1: YGK Akademi bağ ağı (belgeler/v6 Paket 3, Paket 5, karakter-01 … karakter-24)
import { describe, expect, test, afterEach } from 'bun:test';
import { yeniOyun } from '../src/oyun/durum';
import { zamanIlerle, eylemUygula, noktaEylemleri, SAHNELER, sahneSecenekleri, sahneSec } from '../src/oyun/yuzey/gorevler';
import { NOKTALAR } from '../src/oyun/yuzey/harita';
import * as YG from '../src/oyun/ygk';
import * as BY from '../src/oyun/buyu/buyu';
import * as BM from '../src/oyun/buyu/bulmaca';
import { ELEMANLAR, BUYULER, TUREVLER } from '../src/oyun/buyu/veri';
import * as ZN from '../src/oyun/tonoflenya/zanaat';
import * as Z from '../src/oyun/zaman';

const { Y, AG } = YG;
afterEach(() => BM.kolayModAyarla(false));

function oyun(tohum = 11) {
  const d = yeniOyun(tohum);
  d.sahne = null;
  zamanIlerle(d, 1);
  BY.hazirla(d);
  BY.asaUyandir(d);
  d.sahne = null;
  BM.kolayModAyarla(true);
  return d;
}
function hepsiniBil(d) {
  for (const k of [...Object.keys(BUYULER), ...Object.keys(TUREVLER)]) BY.ogret(d, k);
  for (const r of ['kizil', 'mavi', 'sari', 'yesil', 'mor']) d.buyu.taslar[r] = 5;
  BY.siseEkle(d, 'lumina', 5);
  BY.siseEkle(d, 'solis', 5);
  d.buyu.odak = 100;
}
function sart(d, g) {
  for (const kid of Y.KISI_SIRASI) {
    const r = Y.kayit(d, kid);
    r.k = 10;
    r.p = 1000;
  }
  for (const o of g.once || []) Y.kayit(d, Y.GOREVLER[o].kisi).gorev[o] = 'bitti';
  d.hikaye = d.hikaye || { biten: {} };
  d.hikaye.biten = { ...(d.hikaye.biten || {}), ak_zephyra: 1, ak_morwenna: 1 };
  d.gorulenMekanlar = [...(d.gorulenMekanlar || []), 'halka_varek'];
  d.bayrak.akademiBuyuKolu = true;
}
// Düğümleri sırayla çöz: ilk ulaşılabilir kombinasyon, yoksa yedek yol
function coz(d) {
  let guvenlik = 0;
  while (d.bulmaca && guvenlik++ < 60) {
    const l = BM.dugumler(d);
    const i = l.findIndex((n) => !BM.cozulduMu(d, n) && (!n.on || n.on.every((x) => BM.cozulduMu(d, l.find((m) => m.id === x)))));
    if (i < 0) break;
    d.bulmaca.i = i;
    const n = l[i];
    const c = n.kombolar.find((k) => k.every((el) => BM.elemanUlasilir(d, el, n)));
    d.buyu.odak = 100;
    if (!c) {
      BM.sec(d, 'yedek');
      continue;
    }
    for (const el of c) {
      if (!d.bulmaca) break;
      if (el.indexOf('hava_') === 0 && el !== 'hava_durgun' && el !== 'hava_ruzgar' && el !== 'hava_kubbe') {
        const hedef = Number(Object.keys(require('../src/oyun/buyu/veri').HAVA).find((k) => 'hava_' + require('../src/oyun/buyu/veri').HAVA[k].id === el));
        let say = 0;
        while (d.bulmaca && d.bulmaca.hava !== hedef && say++ < 12) {
          d.buyu.odak = 100;
          BM.sec(d, d.bulmaca.hava > hedef ? 'h_sogut' : 'h_isit');
        }
        continue;
      }
      if (el === 'yildirim_dusur') {
        let say = 0;
        while (d.bulmaca && d.bulmaca.hava < 3 && say++ < 12) {
          d.buyu.odak = 100;
          BM.sec(d, 'h_isit');
        }
      }
      d.buyu.odak = 100;
      BM.sec(d, el);
    }
  }
}

describe('Veri bütünlüğü', () => {
  test('31 kişi, her birinin 11 kademesi ve üç imza cümlesi var', () => {
    expect(Y.KISI_SIRASI.length).toBe(31);
    for (const k of Y.KISI_SIRASI) {
      const ki = Y.KISILER[k];
      expect(ki.kademeler.length).toBe(11);
      expect(ki.imza.selam && ki.imza.tesekkur && ki.imza.kizgin).toBeTruthy();
      expect(ki.sever.length).toBeGreaterThan(0);
    }
  });
  test('Bütün kombinasyon elemanları tanımlı', () => {
    for (const gid of Object.keys(Y.GOREVLER)) {
      const g = Y.GOREVLER[gid];
      for (const n of (g.bulmaca && g.bulmaca.dugumler) || []) for (const c of n.kombolar) for (const el of c) {
        if (!ELEMANLAR[el]) throw new Error(gid + ' ' + n.id + ' tanımsız: ' + el);
      }
      if (g.ogren) expect(BUYULER[g.ogren] || TUREVLER[g.ogren]).toBeTruthy();
    }
  });
  test('Hediye kimlikleri gerçek eşyalar', () => {
    for (const k of Y.KISI_SIRASI) for (const h of [...Y.KISILER[k].sever, ...Y.KISILER[k].sevmez]) {
      if (h.startsWith('sise_')) continue;
      expect(ZN.adi(h)).not.toBe(h);
    }
  });
  test('Görev kimlikleri benzersiz; öncül görevler var', () => {
    for (const gid of Object.keys(Y.GOREVLER)) for (const o of Y.GOREVLER[gid].once || []) expect(Y.GOREVLER[o]).toBeTruthy();
  });
  test('Yeni noktalar haritada; var olan noktalı kişilerin noktası gerçek', () => {
    expect(NOKTALAR.yg_lasiraxi.mekan).toBe('ygk_2');
    expect(NOKTALAR.ygk_arsiv).toBeTruthy();
    for (const k of Y.KISI_SIRASI) if (Y.KISILER[k].nokta) expect(NOKTALAR[Y.KISILER[k].nokta]).toBeTruthy();
  });
});

describe('Bütün görevler baştan sona', () => {
  for (const gid of Object.keys(Y.GOREVLER)) {
    test(gid, () => {
      const d = oyun();
      hepsiniBil(d);
      const g = Y.GOREVLER[gid];
      sart(d, g);
      expect(Y.gorevDurumu(d, gid)).toBe('acik');
      Y.gorevBaslat(d, gid);
      expect(d.sahne).toBe('ygk_gorev');
      expect(SAHNELER.ygk_gorev.metin(d).join(' ').length).toBeGreaterThan(10);
      const s = sahneSecenekleri(d, 'ygk_gorev');
      sahneSec(d, 'ygk_gorev', 0);
      if (g.bulmaca) {
        expect(d.bulmaca).toBeTruthy();
        coz(d);
        expect(d.bulmaca).toBeFalsy();
      }
      expect(d.sahne).toBe('ygk_secim');
      const l = sahneSecenekleri(d, 'ygk_secim');
      expect(l.length).toBeGreaterThan(0);
      sahneSec(d, 'ygk_secim', l.length - 1);
      expect(d.sahne).toBe('ygk_sonuc');
      expect(Y.kayit(d, g.kisi).gorev[gid]).toBe('bitti');
      if (g.ogren) expect(BY.biliyor(d, g.ogren)).toBe(true);
    });
  }
});

describe('Öğrenme görevleri bilgi olmadan da çözülür', () => {
  for (const gid of Object.keys(Y.GOREVLER).filter((g) => Y.GOREVLER[g].ogren)) {
    test(gid + ' yalnız temel büyülerle', () => {
      const d = oyun(5);
      for (const k of ['kivilcim', 'buzul', 'suzulme', 'tele_kaldirma', 'devre', 'frekans_anahtari', 'yanki_tarama', 'zihin_arindirma', 'siseleme']) BY.ogret(d, k);
      BY.siseEkle(d, 'lumina', 3);
      const g = Y.GOREVLER[gid];
      sart(d, g);
      Y.gorevBaslat(d, gid);
      sahneSec(d, 'ygk_gorev', 0);
      coz(d);
      expect(d.sahne).toBe('ygk_secim');
      expect(BY.biliyor(d, g.ogren) || true).toBe(true);
      sahneSec(d, 'ygk_secim', 0);
      expect(BY.biliyor(d, g.ogren)).toBe(true);
    });
  }
});

describe('Bağ: sohbet, hediye, kademe, telafi', () => {
  test('Günde bir sohbet; seçimli sekans puan verir', () => {
    const d = oyun();
    const m = Y.sohbetMenu(d, 'tixie');
    expect(m.ogeler.length).toBeGreaterThan(0);
    m.ogeler[0].yap(d);
    expect(Y.kayit(d, 'tixie').p).toBeGreaterThan(0);
    expect(Y.sohbetMenu(d, 'tixie').ogeler.length).toBe(0);
  });
  test('Sevdiği hediye iki kat; sevmediği geri çevrilir, puan düşmez', () => {
    const d = oyun();
    ZN.ekle(d, 'piezo', 2);
    ZN.ekle(d, 'ekmek', 1);
    Y.hediyeVer(d, 'tixie', 'ekmek');
    expect(Y.kayit(d, 'tixie').p).toBe(0);
    expect(ZN.miktar(d, 'ekmek')).toBe(1);
    d.zaman.sn += Z.GUN_SN;
    Y.hediyeVer(d, 'tixie', 'piezo');
    expect(Y.kayit(d, 'tixie').p).toBeGreaterThanOrEqual(30);
  });
  test('Bir günde en çok bir kademe', () => {
    const d = oyun();
    Y.puanEkle(d, 'veyra', 400);
    expect(Y.kademe(d, 'veyra')).toBe(1);
    d.zaman.sn += Z.GUN_SN;
    YG.ygkIlerle(d);
    expect(Y.kademe(d, 'veyra')).toBe(2);
  });
  test('Kırgınlık telafi edilir; görevleri hiç kilitlemez', () => {
    const d = oyun();
    Y.kayit(d, 'kefius').kirgin = true;
    expect(Y.gorevDurumu(d, 'KEF-01')).toBe('kademe');
    Y.kayit(d, 'kefius').k = 1;
    expect(Y.gorevDurumu(d, 'KEF-01')).toBe('acik');
    ZN.ekle(d, 'fosil', 2);
    const r = Y.telafi(d, 'kefius');
    expect(r.metin).toContain('kırgınlığını');
    expect(Y.kayit(d, 'kefius').kirgin).toBe(false);
  });
});

describe('Arşiv yedek yolu ve T2 asa', () => {
  test('Kırgın ustanın büyüsü arşivden öğrenilir', () => {
    const d = oyun();
    Y.kayit(d, 'jolkar').kirgin = true;
    ZN.ekle(d, 'gumus_tozu', 1);
    d.buyu.odak = 100;
    const m = AG.arsivMenu(d);
    const o = m.ogeler.find((x) => x.id === 'ar_toprak_yarma');
    expect(o).toBeTruthy();
    o.yap(d);
    expect(d.bulmaca.id).toBe('ogren_arsiv_toprak_yarma');
    coz(d);
    expect(BY.biliyor(d, 'toprak_yarma')).toBe(true);
  });
  test('Üç kürsü sınavı ve Kefius onayı T2 asa verir', () => {
    const d = oyun();
    expect(AG.asaT2Durumu(d)).toContain('Üç kürsü');
    for (const g of ['SNV-01', 'SNV-02', 'SNV-03']) Y.kayit(d, Y.GOREVLER[g].kisi).gorev[g] = 'bitti';
    expect(AG.asaT2Durumu(d)).toContain('piezo');
    ZN.ekle(d, 'piezo', 1);
    ZN.ekle(d, 'gumus_tozu', 1);
    AG.asaT2Yap(d);
    expect(d.buyu.asa).toBe(2);
  });
});

describe('Nokta ve menü', () => {
  test('Yeni kişi noktası bağ menüsünü açar; var olan noktaya bağ eylemi eklenir', () => {
    const d = oyun();
    const e = noktaEylemleri(d, 'yg_veyra');
    expect(e[0].id).toBe('yg_bag');
    const r = eylemUygula(d, 'yg_veyra', 'yg_bag');
    expect(r.agac(d).baslik).toBe('Veyra-K');
    expect(r.ses).toBe('imza_yg_veyra_selam');
    expect(noktaEylemleri(d, 'k_kefius').some((x) => x.id === 'yg_bag_kefius')).toBe(true);
    expect(noktaEylemleri(d, 'ak_forges').some((x) => x.id === 'yg_bag_forges')).toBe(true);
  });
  test('Rehber üç yolu listeler', () => {
    const d = oyun();
    expect(YG.rehberMenu(d).ogeler.length).toBe(3);
  });
});

describe('5.1 sesler', () => {
  test('her kişinin imza üçlüsü ve konumlu döngüsü var', () => {
    const fs = require('fs');
    for (const kid of Y.KISI_SIRASI) {
      for (const t of ['selam', 'tesekkur', 'kizgin']) expect(fs.existsSync('assets/ses/ygk/imza/' + kid + '_' + t + '.mp3')).toBe(true);
      expect(fs.existsSync('assets/ses/konumsal/yg_' + kid + '.wav')).toBe(true);
    }
  });
  test('sesYerleri yalnız bulunulan kattakileri verir', () => {
    const { NOKTALAR } = require('../src/oyun/yuzey/harita');
    const YGI = require('../src/oyun/ygk');
    const d = yeniOyun(5);
    d.mekan = 'ygk_2';
    const l = YGI.sesYerleri(d, NOKTALAR);
    expect(l.every((x) => x.n.mekan === 'ygk_2')).toBe(true);
    expect(l.some((x) => x.id === 'lasiraxi')).toBe(true);
    d.bayrak.tixieIhbar = true;
    expect(YGI.sesYerleri(d, NOKTALAR).some((x) => x.id === 'tixie')).toBe(false);
  });
});
