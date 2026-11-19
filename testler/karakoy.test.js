import { describe, expect, test } from 'bun:test';
import {
  yeniDunya as ilkDunya,
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

// Sokakta, sahnesiz başlayan dünya (açılış sahnesinden sonraki durum)
function yeniDunya() {
  const d = ilkDunya();
  d.mekan = 'dis';
  d.oyuncu = { x: 20, y: 5, yon: Math.PI / 2 };
  d.sahne = null;
  return d;
}

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

import { yerlerListesi, otoBaslat } from '../src/oyun/karakoy/dunya';
import { SAHNELER, sahneSec } from '../src/oyun/karakoy/sahneler';

function otoYuru(d, sn = 300) {
  const olaylar = [];
  for (let i = 0; i < sn * 10 && d.oto; i++) olaylar.push(...ilerle(d, {}, 0.1));
  return olaylar;
}

describe('Yerler: kendiliğinden yürüme', () => {
  test('rıhtımdan hana, kapılardan geçerek', () => {
    const d = yeniDunya();
    const han = yerlerListesi(d).find((y) => y.id === 'han');
    expect(otoBaslat(d, han).tamam).toBe(true);
    const olaylar = otoYuru(d);
    expect(olaylar.some((o) => o.tur === 'otoVardi')).toBe(true);
    expect(d.mekan).toBe('han');
  });
  test('kayıkhanenin içinden büroya: önce dışarı çıkar', () => {
    const d = yeniDunya();
    d.mekan = 'kayikhane';
    d.oyuncu = { x: -48, y: 7, yon: 0 };
    d.bayrak.gulceOnerildi = true;
    otoBaslat(d, yerlerListesi(d).find((y) => y.id === 'buro'));
    const olaylar = otoYuru(d);
    expect(olaylar.filter((o) => o.tur === 'otoKapi').length).toBe(2);
    expect(d.mekan).toBe('buro');
  });
  test('bütün sokak yerlerine ve binalara her noktadan yol bulunur', () => {
    const baslar = [
      { x: -55, y: 3 },
      { x: 55, y: 40 },
      { x: 26, y: 25 },
      { x: -36, y: 35 },
    ];
    for (const b of baslar) {
      const d = yeniDunya();
      d.dakika = 10 * 60;
      d.oyuncu = { ...b, yon: 0 };
      d.bayrak.gulceOnerildi = true;
      d.bayrak.arkaKapiBiliniyor = true;
      for (const y of yerlerListesi(d).filter((x) => x.tur === 'yer' && x.id !== 'oda')) {
        const d2 = { ...d, oyuncu: { ...d.oyuncu }, yakin: {}, bayrak: { ...d.bayrak }, kesif: { ...d.kesif } };
        expect(otoBaslat(d2, y).tamam).toBe(true);
        otoYuru(d2);
        expect(d2.mekan).toBe(y.mekan);
        expect(Math.hypot(d2.oyuncu.x - y.x, d2.oyuncu.y - y.y)).toBeLessThan(y.menzil + 0.5);
      }
    }
  });
  test('kişiye yürür ve yanında durur', () => {
    const d = yeniDunya();
    d.dakika = 10 * 60;
    d.bayrak.gulceOnerildi = true;
    // Gülce başka bir yerde: listede yok; önce büroya gidilir, içeride listede o çıkar
    expect(yerlerListesi(d).some((y) => y.id === 'kisi_gulce')).toBe(false);
    otoBaslat(d, yerlerListesi(d).find((y) => y.id === 'buro'));
    otoYuru(d);
    expect(d.mekan).toBe('buro');
    const g = yerlerListesi(d).find((y) => y.id === 'kisi_gulce');
    expect(yerlerListesi(d)[0].tur).not.toBe('yer');
    otoBaslat(d, g);
    otoYuru(d);
    expect(d.mekan).toBe('buro');
    expect(etkiles(d).tur).toBe('konus');
  });
  test('kilitli kapıda durur ve söyler', () => {
    const d = yeniDunya();
    d.dakika = 10 * 60;
    d.mekan = 'han';
    d.oyuncu = { x: 37, y: 18, yon: 0 };
    const hedef = { id: 'x', ad: 'Sabri\'nin odası', mekan: 'oda', x: 43, y: 26, menzil: 1 };
    otoBaslat(d, hedef);
    const olaylar = otoYuru(d);
    expect(olaylar.some((o) => o.tur === 'otoKilitli')).toBe(true);
    expect(d.mekan).toBe('han');
  });
  test('sürüklemek kendiliğinden yürümeyi durdurur', () => {
    const d = yeniDunya();
    otoBaslat(d, yerlerListesi(d).find((y) => y.id === 'durak'));
    ilerle(d, {}, 0.1);
    const o = ilerle(d, { ileri: 1 }, 0.1);
    expect(o.some((x) => x.tur === 'otoIptal')).toBe(true);
    expect(d.oto).toBeNull();
  });
});

describe('Yerler: yalnızca bilinen ve gidilebilen', () => {
  test('başta büro, Gülce, oda ve antrepo kapısı listede yok', () => {
    const d = yeniDunya();
    d.dakika = 10 * 60;
    const ids = yerlerListesi(d).map((y) => y.id);
    expect(ids).toContain('kayikhane');
    expect(ids).toContain('kisi_suleyman');
    expect(ids).not.toContain('buro');
    expect(ids).not.toContain('kisi_gulce');
    expect(ids).not.toContain('oda');
    expect(ids).not.toContain('antrepo_arka');
    expect(ids).not.toContain('nesne_denk');
  });
  test('hamlelerle açılır: Süleyman büroyu söyler, antrepo kapısına yaklaşınca öğrenilir', () => {
    const d = yeniDunya();
    d.bayrak.gulceOnerildi = true;
    d.bayrak.denkAcik = true;
    d.oyuncu = { x: 26, y: 20, yon: 0 };
    ilerle(d, {}, 0.1);
    const ids = yerlerListesi(d).map((y) => y.id);
    expect(ids).toContain('buro');
    expect(ids).not.toContain('nesne_denk'); // kayıkhanenin içinde: dışarıdan listelenmez
    expect(ids).toContain('antrepo_arka');
    d.mekan = 'kayikhane';
    d.oyuncu = { x: -42, y: 5, yon: 0 };
    const ic = yerlerListesi(d).map((y) => y.id);
    expect(ic).toContain('nesne_denk');
    expect(ic).not.toContain('kayikhane');
    expect(ic).not.toContain('nesne_ceset');
    expect(ic).toContain('buro');
  });
  test('kayıt temizlenir ve geri yüklenir', async () => {
    const { kayitTemizle, kayittanDunya } = await import('../src/oyun/karakoy/dunya');
    const d = yeniDunya();
    d.deliller.push('ip_izi');
    otoBaslat(d, yerlerListesi(d).find((y) => y.id === 'durak'));
    const k = JSON.parse(JSON.stringify(kayitTemizle(d)));
    expect(k.oto).toBeUndefined();
    const g = kayittanDunya(k);
    expect(g.deliller).toEqual(['ip_izi']);
    expect(g.oto).toBeNull();
    expect(kayittanDunya({ surum: 99 })).toBeNull();
  });
});

describe('Açılış sahneleri', () => {
  test('yeni oyun kayıkhanede, açılış sahnesiyle başlar; sahneler serbest dolaşmaya bağlanır', () => {
    const d = ilkDunya();
    expect(d.mekan).toBe('kayikhane');
    expect(d.sahne).toBe('acilis');
    sahneSec(d, 'acilis', 0);
    expect(d.sahne).toBe('ani1');
    sahneSec(d, 'ani1', 1);
    expect(d.travma).toBe(1);
    sahneSec(d, d.sahne, 0);
    expect(d.sahne).toBe('cagri');
    sahneSec(d, 'cagri', 0);
    sahneSec(d, d.sahne, 0);
    expect(d.sahne).toBeNull();
    const e = etkiles(d);
    expect(e.tur).toBe('gecti');
  });
  test('her sahnenin sonraki sahnesi tanımlı', () => {
    for (const [id, sh] of Object.entries(SAHNELER))
      for (const x of sh.secenekler || []) if (x.sonra) expect(SAHNELER[x.sonra]).toBeDefined();
  });
});

describe('dönüş tıkırtısı', () => {
  test('her 30 derecede bir tık, ana yönlerde güçlü', async () => {
    const { yeniDunya, ilerle } = await import('../src/oyun/karakoy/dunya.js');
    const d = yeniDunya();
    d.sahne = null;
    d.oyuncu = { ...d.oyuncu, yon: 0.01 };
    const tiklar = [];
    for (let i = 0; i < 400; i++) tiklar.push(...ilerle(d, { donus: 1 }, 0.01).filter((o) => o.tur === 'tik'));
    // 4 sn × 1,6 rad/sn ≈ 367 derece: bir tur, 12 tık
    expect(tiklar.length).toBeGreaterThanOrEqual(11);
    expect(tiklar.length).toBeLessThanOrEqual(13);
    expect(tiklar.some((t) => t.anaYon && t.guc === 0.65)).toBe(true);
    // yerinde dururken tık yok
    expect(ilerle(d, {}, 0.5).filter((o) => o.tur === 'tik').length).toBe(0);
  });
});

describe('Yerler: iç içe yerler', () => {
  test('limandayken Sabri\'nin odası ve Pera\'nın içi görünmez; handa oda görünür', async () => {
    const { yeniDunya, yerlerListesi } = await import('../src/oyun/karakoy/dunya.js');
    const d = yeniDunya();
    d.sahne = null;
    d.gorev = 3;
    d.bayrak.odaAnahtari = true;
    d.mekan = 'dis';
    d.oyuncu = { x: 0, y: 5, yon: 0 };
    let id = yerlerListesi(d).map((y) => y.id);
    expect(id).not.toContain('oda');
    expect(id).not.toContain('cihangir');
    expect(id).not.toContain('kulup');
    expect(id).toContain('han');
    expect(id).toContain('pera');
    d.mekan = 'han';
    d.oyuncu = { x: 37, y: 19, yon: 0 };
    expect(yerlerListesi(d).map((y) => y.id)).toContain('oda');
    d.mekan = 'pera_cadde';
    d.oyuncu = { x: 210, y: 5, yon: 0 };
    id = yerlerListesi(d).map((y) => y.id);
    expect(id).toContain('cihangir');
    expect(id).toContain('kulup');
    expect(id).not.toContain('oda');
  });
});
