import { describe, expect, test } from 'bun:test';
import { yeniDunya, ilerle, etkiles, eylemUygula, bekle, kisiler, kapidanGec, kayittanDunya, kayitTemizle } from '../src/oyun/karakoy/dunya';
import { konusmaBasla, dugum, sec, gorevIpucu, mevcutNesneler } from '../src/oyun/karakoy/gorev1';
import { DELORME_YERI } from '../src/oyun/karakoy/gorev5';
import { MEKANLAR } from '../src/oyun/karakoy/harita';
import { sahneParagraflari, sahneSec, sahneSecenekleri } from '../src/oyun/karakoy/sahneler';

function konus(d, kisi, dugumId, etiketBasi) {
  const g = dugum(d, kisi, dugumId);
  const s = g.secenekler.find((x) => x.etiket.startsWith(etiketBasi));
  if (!s) throw new Error('Seçenek yok: ' + etiketBasi + ' / ' + g.secenekler.map((x) => x.etiket).join(' | '));
  return sec(d, kisi, dugumId, s.i);
}
function sahneSecEtiket(d, id, etiketBasi) {
  const s = sahneSecenekleri(d, id).find((x) => x.etiket.startsWith(etiketBasi));
  if (!s) throw new Error('Sahne seçeneği yok: ' + etiketBasi + ' / ' + sahneSecenekleri(d, id).map((x) => x.etiket).join(' | '));
  return sahneSec(d, id, s.i);
}

// Dördüncü görevi bitirmiş dünya: salı sabahı, han
function dorduncuBitmis(ek = {}, deliller = []) {
  const d = yeniDunya();
  d.sahne = null;
  d.gorevBitti = true;
  d.gorev = 4;
  d.gorevGun = 6;
  d.gun = 7;
  d.dakika = 9 * 60;
  d.mekan = 'han';
  d.oyuncu = { x: 37, y: 19, yon: Math.PI };
  d.bayrak = { karar1: 'polis', g2Gun: 2, g2Bitti: true, g3Bitti: true, g4Bitti: true, rizaEkipte: true, halimSonu: 'sakli', ...ek };
  d.deliller.push('fotograf', 'belge', ...deliller);
  return d;
}

// Beşinci görevin planı seçilmiş, sahneler kapanmış
function besinciGorev(plan = 'Rıza', ek = {}) {
  const d = dorduncuBitmis(ek);
  d.sahne = 'g5_cagri';
  sahneSec(d, 'g5_cagri', 0);
  sahneSecEtiket(d, 'g5_plan', plan);
  sahneSec(d, 'g5_plan_son', 0);
  return d;
}

function antrepoya(d) {
  d.mekan = 'dis';
  d.oyuncu = { x: 25.5, y: 22, yon: -Math.PI / 2 };
  return kapidanGec(d, MEKANLAR.dis.cikislar.find((c) => c.id === 'antrepo_arka'));
}

describe('Beşinci görev: Antrepo', () => {
  test('çarşamba akşamı çağrı kendiliğinden gelir; Rıza\'yla konuşunca beklemeden', () => {
    const d = dorduncuBitmis();
    bekle(d, 36 * 60);
    expect(d.sahne).toBe('g5_cagri');
    expect(d.gun).toBe(8);
    const e = dorduncuBitmis();
    expect(konusmaBasla(e, 'riza')).toBe('bitti');
    konus(e, 'riza', 'bitti', 'Hazırım');
    expect(e.sahne).toBe('g5_cagri');
    expect(sahneParagraflari(e, 'g5_cagri').join(' ')).toContain('Mahzendeki Halim');
    sahneSec(e, 'g5_cagri', 0);
    expect(e.gorev).toBe(5);
    expect(e.gun).toBe(8);
    expect(e.sahne).toBe('g5_plan');
  });

  test('plan seçilir; arka kapı açık, Delorme antrepoda, çanta dip köşede', () => {
    const d = besinciGorev('Süleyman');
    expect(d.bayrak.g5Plan).toBe('deniz');
    expect(d.sahne).toBeNull();
    expect(antrepoya(d).tur).toBe('gecti');
    expect(d.mekan).toBe('antrepo');
    bekle(d, 5);
    const dl = kisiler(d).find((k) => k.id === 'delorme');
    expect(dl.mekan).toBe('antrepo');
    expect(mevcutNesneler(d).some((n) => n.id === 'canta')).toBe(true);
    expect(gorevIpucu(d)).toContain('deri bir çanta');
  });

  test('Delorme\'a yaklaşmak yüzleşmeyi açar; oyalamak ve Rıza\'nın polisleri sandıklara el koyar', () => {
    const d = besinciGorev('Rıza');
    antrepoya(d);
    bekle(d, 5);
    d.oyuncu = { x: DELORME_YERI.x + 3.5, y: DELORME_YERI.y + 1, yon: 0 };
    ilerle(d, {}, 0.1);
    expect(d.sahne).toBe('g5_yuzlesme');
    expect(d.bayrak.g5Nasil).toBe('yaklasti');
    expect(sahneParagraflari(d, 'g5_yuzlesme').join(' ')).toContain('bastonun');
    sahneSecEtiket(d, 'g5_yuzlesme', 'Konuştur');
    const p = sahneParagraflari(d, 'g5_sonuc').join(' ');
    expect(d.bayrak.sandikSonu).toBe('el_konuldu');
    expect(p).toContain('Selanik');
    sahneSec(d, 'g5_sonuc', 0);
    expect(d.sahne).toBe('g5_kapanis');
    sahneSec(d, 'g5_kapanis', 0);
    expect(d.bayrak.g5Bitti).toBe(true);
    expect(d.mekan).toBe('han');
    expect(d.gun).toBe(9);
    expect(d.gorev).toBe(6);
    expect(d.sahne).toBe('g6_acilis');
  });

  test('çantayı alıp dışarı çıkan geçitte Delorme\'la karşılaşır; fotoğrafı göstermek', () => {
    const d = besinciGorev('Nermin', { gulceKamil: 'soyle' });
    antrepoya(d);
    bekle(d, 5);
    d.oyuncu = { x: 20.5, y: 24.5, yon: 0 };
    const r = eylemUygula(d, 'canta', 'al');
    expect(r.yeniDeliller).toEqual(['salonique_n', 'mavna_listesi']);
    expect(d.bayrak.cantaAlindi).toBe(true);
    d.oyuncu = { x: 23.2, y: 22, yon: Math.PI / 2 };
    kapidanGec(d, MEKANLAR.antrepo.cikislar[0]);
    ilerle(d, {}, 0.1);
    expect(d.sahne).toBe('g5_yuzlesme');
    expect(d.bayrak.g5Nasil).toBe('canta');
    sahneSecEtiket(d, 'g5_yuzlesme', 'Cebindeki');
    const p = sahneParagraflari(d, 'g5_sonuc').join(' ');
    expect(p).toContain('Ne kadar benziyorsunuz');
    expect(p).toContain('Biri sizi bekliyor');
    expect(d.deliller).toContain('delorme_fotografi');
    sahneSec(d, 'g5_sonuc', 0);
    const k = sahneParagraflari(d, 'g5_kapanis').join(' ');
    expect(k).toContain('HAMAL CANLI KALSIN');
    expect(k).toContain('Babam bana öğretti');
  });

  test('bekçiye yakalanan dışarı atılmaz, Delorme\'un önüne sürüklenir; saldırmak kolu yaralar', () => {
    const d = besinciGorev('Süleyman');
    antrepoya(d);
    bekle(d, 5);
    const b = kisiler(d).find((k) => k.id === 'bekci');
    d.oyuncu = { x: b.x + 1, y: b.y, yon: 0 };
    const travma = d.travma;
    for (let i = 0; i < 10 && !d.sahne; i++) {
      const bb = kisiler(d).find((k) => k.id === 'bekci');
      d.oyuncu = { x: bb.x + 1, y: bb.y, yon: 0 };
      ilerle(d, {}, 0.1);
    }
    expect(d.mekan).toBe('antrepo');
    expect(d.sahne).toBe('g5_yuzlesme');
    expect(d.bayrak.g5Nasil).toBe('yakalandi');
    sahneSecEtiket(d, 'g5_yuzlesme', 'Üstüne');
    expect(d.bayrak.yaraKol).toBe(true);
    expect(d.travma).toBe(travma + 1);
    sahneParagraflari(d, 'g5_sonuc');
    expect(d.bayrak.sandikSonu).toBe('batti');
  });

  test('gece yarısına kadar yüzleşilmezse geç kalınır', () => {
    const d = besinciGorev('Nermin');
    bekle(d, 3 * 60);
    expect(d.sahne).toBe('g5_gec');
    sahneSec(d, 'g5_gec', 0);
    expect(d.bayrak.sandikSonu).toBe('gitti');
    expect(d.sahne).toBe('g5_kapanis');
  });

  test('fotoğrafı olmayan gösteremez; kayıt saklanır', () => {
    const d = besinciGorev('Rıza');
    d.deliller = d.deliller.filter((x) => x !== 'fotograf');
    d.sahne = 'g5_yuzlesme';
    expect(sahneSecenekleri(d, 'g5_yuzlesme').some((x) => x.etiket.startsWith('Cebindeki'))).toBe(false);
    const k = kayittanDunya(JSON.parse(JSON.stringify(kayitTemizle(d))));
    expect(k.gorev).toBe(5);
    expect(k.sahne).toBe('g5_yuzlesme');
  });
});
