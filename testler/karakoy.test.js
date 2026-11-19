import { describe, expect, test } from 'bun:test';
import {
  yeniDunya,
  ilerle,
  engel,
  etkiles,
  cevreMetni,
  durumMetni,
  kisiDurumu,
  kisiler,
  tramvayYeri,
  geceMi,
  saatMetni,
  bekle,
  konumAdi,
} from '../src/oyun/karakoy/dunya';
import { KISILER, MEKANLAR, BINALAR } from '../src/oyun/karakoy/harita';

// Saat 15.00'te başlayan bir dünya (ilk adımdaki testler için)
function ogleden() {
  const d = yeniDunya();
  d.dakika = 15 * 60;
  d.gece = false;
  d.sonSaat = 15;
  d.sonVapur = 15 * 60;
  return d;
}

const kisi = (id) => KISILER.find((k) => k.id === id);

function yuruSaniye(d, sn, girdi = { ileri: 1 }) {
  const olaylar = [];
  for (let i = 0; i < sn * 10; i++) olaylar.push(...ilerle(d, girdi, 0.1));
  return olaylar;
}

describe('Karaköy haritası', () => {
  test('her çıkışın vardığı yer geçilebilir', () => {
    for (const m of Object.values(MEKANLAR)) {
      for (const c of m.cikislar) expect(engel(c.hedef, c.varis)).toBeNull();
    }
  });
  test('dış kapılar sokakta, binaların dışında', () => {
    for (const c of MEKANLAR.dis.cikislar) expect(engel('dis', c)).toBeNull();
  });
  test('kişilerin durdukları yerler kendi mekânlarında geçilebilir', () => {
    for (const k of KISILER)
      for (const r of k.rutin) if (r.mekan !== 'yok' && r.mekan !== 'devriye') expect(engel(r.mekan, r)).toBeNull();
  });
  test('binalar birbirine girmiyor', () => {
    for (let i = 0; i < BINALAR.length; i++)
      for (let j = i + 1; j < BINALAR.length; j++) {
        const a = BINALAR[i];
        const b = BINALAR[j];
        const ortusur = a.x1 < b.x2 && b.x1 < a.x2 && a.y1 < b.y2 && b.y1 < a.y2;
        expect(ortusur).toBe(false);
      }
  });
});

describe('hareket ve çarpışma', () => {
  test('ileri yürüyünce yer değişir ve adım sesi çıkar', () => {
    const d = yeniDunya();
    const x0 = d.oyuncu.x;
    const olaylar = yuruSaniye(d, 2);
    expect(d.oyuncu.x).toBeGreaterThan(x0 + 2);
    expect(olaylar.some((o) => o.tur === 'adim')).toBe(true);
  });
  test('denize yürünmez', () => {
    const d = yeniDunya();
    d.oyuncu = { x: 0, y: 3, yon: Math.PI };
    const olaylar = yuruSaniye(d, 5);
    expect(d.oyuncu.y).toBeGreaterThan(0.5);
    expect(olaylar.find((o) => o.tur === 'carpti').neden).toBe('su');
  });
  test('bina duvarından geçilmez', () => {
    const d = yeniDunya();
    d.oyuncu = { x: -1, y: 11, yon: 0 };
    const olaylar = yuruSaniye(d, 5);
    expect(d.oyuncu.y).toBeLessThan(14);
    expect(olaylar.some((o) => o.tur === 'carpti' && o.neden === 'duvar')).toBe(true);
  });
  test('dönüş yönü değiştirir', () => {
    const d = yeniDunya();
    const y0 = d.oyuncu.yon;
    ilerle(d, { donus: 1 }, 0.5);
    expect(d.oyuncu.yon).not.toBe(y0);
  });
});

describe('kapılar ve iç mekânlar', () => {
  test('kayıkhaneye girip çıkılır', () => {
    const d = yeniDunya();
    d.oyuncu = { x: -36.5, y: 5, yon: -Math.PI / 2 };
    d.dakika = 18 * 60; // Süleyman içeride, kapının önünde kimse yok
    const g = etkiles(d);
    expect(g.tur).toBe('gecti');
    expect(d.mekan).toBe('kayikhane');
    ilerle(d, {}, 0.1);
    const c = etkiles(d);
    expect(c.tur).toBe('gecti');
    expect(d.mekan).toBe('dis');
  });
  test('hanın merdiveninden Sabri\'nin odasına çıkılır', () => {
    const d = yeniDunya();
    d.mekan = 'han';
    d.oyuncu = { x: 44, y: 28, yon: 0 };
    expect(etkiles(d).tur).toBe('kilitli');
    d.bayrak.odaAnahtari = true;
    const g = etkiles(d);
    expect(d.mekan).toBe('oda');
    expect(g.metin).toContain('Sabri');
  });
  test('içeride duvardan çıkılmaz', () => {
    const d = yeniDunya();
    d.mekan = 'buro';
    d.oyuncu = { x: -1, y: 20, yon: Math.PI / 2 };
    yuruSaniye(d, 10);
    expect(d.oyuncu.x).toBeLessThan(8);
  });
  test('kapıya yaklaşınca bildirilir, bir kez', () => {
    const d = yeniDunya();
    d.oyuncu = { x: -6, y: 12, yon: Math.PI / 2 };
    const olaylar = yuruSaniye(d, 4);
    const kapi = olaylar.filter((o) => o.tur === 'kapi');
    expect(kapi.length).toBe(1);
    expect(kapi[0].ad).toContain('büro');
  });
});

describe('saat ve gece', () => {
  test('gerçek bir dakika oyunda on dakika', () => {
    const d = yeniDunya();
    const d0 = d.dakika;
    yuruSaniye(d, 60, {});
    expect(Math.round(d.dakika - d0)).toBe(10);
  });
  test('Aralık\'ta hava 16.40\'ta kararır', () => {
    expect(geceMi(16 * 60 + 30)).toBe(false);
    expect(geceMi(16 * 60 + 45)).toBe(true);
    expect(geceMi(7 * 60)).toBe(true);
    expect(geceMi(8 * 60)).toBe(false);
  });
  test('bekleyince akşam olur', () => {
    const d = ogleden();
    const olaylar = bekle(d, 120);
    expect(olaylar.some((o) => o.tur === 'aksam')).toBe(true);
    expect(saatMetni(d.dakika)).toBe('17.00');
  });
  test('gece yarısını geçince gün artar', () => {
    const d = ogleden();
    bekle(d, 10 * 60);
    expect(d.gun).toBe(2);
  });
});

describe('kişilerin rutinleri', () => {
  test('Gülce mesai saatinde büroda, akşam yok', () => {
    expect(kisiDurumu(kisi('gulce'), 10 * 60).mekan).toBe('buro');
    expect(kisiDurumu(kisi('gulce'), 20 * 60)).toBeNull();
  });
  test('Gülce sabah büroya yürüyerek gelir', () => {
    const k = kisiDurumu(kisi('gulce'), 8 * 60 + 31);
    expect(k.yuruyor).toBe(true);
    expect(k.mekan).toBe('dis');
  });
  test('Süleyman gündüz kayığının başında, akşam kayıkhanede', () => {
    expect(kisiDurumu(kisi('suleyman'), 9 * 60).mekan).toBe('dis');
    expect(kisiDurumu(kisi('suleyman'), 19 * 60).mekan).toBe('kayikhane');
    expect(kisiDurumu(kisi('suleyman'), 12 * 60 + 40).mekan).toBe('han');
  });
  test('Komiser Halim devriyede rıhtım boyunca yürür', () => {
    const a = kisiDurumu(kisi('halim'), 10 * 60 + 20);
    const b = kisiDurumu(kisi('halim'), 10 * 60 + 25);
    expect(a.mekan).toBe('dis');
    expect(a.yuruyor).toBe(true);
    expect(Math.hypot(a.x - b.x, a.y - b.y)).toBeGreaterThan(5);
    expect(kisiDurumu(kisi('halim'), 15 * 60)).toBeNull();
  });
  test('yürüyen kişinin yeri hep geçerli bir mekânda', () => {
    for (const k of KISILER)
      for (let m = 0; m < 1440; m += 1) {
        const s = kisiDurumu(k, m);
        if (s) expect(Object.keys(MEKANLAR)).toContain(s.mekan);
      }
  });
  test('yanındaki kişiyle konuşulur', () => {
    const d = yeniDunya();
    d.dakika = 9 * 60;
    d.oyuncu = { x: -34.5, y: 3, yon: -Math.PI / 2 };
    const e = etkiles(d);
    expect(e.tur).toBe('konus');
    expect(e.ad).toBe('Süleyman Kaptan');
  });
  test('yaklaşınca kişi bildirilir', () => {
    const d = yeniDunya();
    d.dakika = 9 * 60;
    d.oyuncu = { x: -28, y: 3, yon: -Math.PI / 2 };
    const olaylar = yuruSaniye(d, 5);
    expect(olaylar.some((o) => o.tur === 'kisi' && o.ad === 'Süleyman Kaptan')).toBe(true);
  });
});

describe('tarif ve tramvay', () => {
  test('çevre tarifi yeri ve yakın şeyleri saat yönüyle söyler', () => {
    const d = yeniDunya();
    d.dakika = 9 * 60;
    d.oyuncu = { x: -30, y: 4, yon: 0 };
    const m = cevreMetni(d);
    expect(m).toContain('rıhtım');
    expect(m).toContain('Süleyman Kaptan');
    expect(m).toMatch(/saat \d+ yönünde/);
  });
  test('durum metni saati ve yönü söyler', () => {
    const d = ogleden();
    expect(durumMetni(d)).toContain('Saat 15.00');
    expect(durumMetni(d)).toContain('doğuya');
  });
  test('tramvay gündüz geçer, gece işlemez', () => {
    expect(tramvayYeri(9 * 60 + 5)).not.toBeNull();
    expect(tramvayYeri(2 * 60 + 5)).toBeNull();
  });
  test('konum adları', () => {
    const d = yeniDunya();
    d.oyuncu = { x: 0, y: 12, yon: 0 };
    expect(konumAdi(d)).toBe('Rıhtım Caddesi');
  });
  test('kişi listesi saatle değişir', () => {
    const d = yeniDunya();
    d.dakika = 3 * 60;
    const gece = kisiler(d).map((k) => k.id);
    d.dakika = 10 * 60 + 30;
    const gunduz = kisiler(d).map((k) => k.id);
    expect(gunduz.length).toBeGreaterThan(gece.length);
    expect(gunduz).toContain('halim');
  });
});
