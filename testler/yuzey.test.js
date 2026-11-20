// Birinci görev baştan sona: kapsülden çık, kesiciyi al, anteni ve hücreyi bul, jeneratörü çalıştır,
// anteni kur, frekansı ayarla, kaynak topla, Sinyal Kulesi'ni kur.
import { describe, expect, test } from 'bun:test';
import { yeniOyun, gecerliMi } from '../src/oyun/durum';
import { NOKTALAR } from '../src/oyun/yuzey/harita';
import { cevreMetni, durumMetni, etkiles, ilerle, otoBaslat, radar, yerlerListesi } from '../src/oyun/yuzey/dunya';
import {
  SAHNELER,
  ayarBaslat,
  ayarDegis,
  ayarIlerle,
  ayarYakinlik,
  eylemUygula,
  gorevIpucu,
  insaEt,
  insaListesi,
  konusma,
  noktaEylemleri,
  sahneSec,
  sahneSecenekleri,
} from '../src/oyun/yuzey/gorev1';
import { TESISLER } from '../src/oyun/veri/tesisler';

// Bir yere kendiliğinden yürür (en çok 120 benzetim saniyesi)
function yuru(d, id) {
  const h = yerlerListesi(d).find((y) => y.id === id) || { id, ad: NOKTALAR[id].ad, mekan: NOKTALAR[id].mekan, x: NOKTALAR[id].x, y: NOKTALAR[id].y };
  otoBaslat(d, h);
  const olaylar = [];
  for (let i = 0; i < 1200 && d.oto; i++) olaylar.push(...ilerle(d, {}, 0.1));
  return olaylar;
}

function sahneleriGec(d) {
  let n = 0;
  while (d.sahne && n++ < 10) {
    expect(SAHNELER[d.sahne]).toBeDefined();
    expect(sahneSecenekleri(d, d.sahne).length).toBeGreaterThan(0);
    sahneSec(d, d.sahne, 0);
  }
}

describe('yeni oyun', () => {
  test('durum geçerli ve kapsülde başlar', () => {
    const d = yeniOyun(12345);
    expect(gecerliMi(d)).toBe(true);
    expect(d.mekan).toBe('kapsul');
    expect(d.sahne).toBe('acilis');
    expect(d.murettebat.length).toBe(3);
    expect(d.murettebat[0].ad).not.toBe(d.murettebat[1].ad);
    // Aynı tohum aynı adları verir
    expect(yeniOyun(12345).murettebat[0].ad).toBe(d.murettebat[0].ad);
    expect(JSON.parse(JSON.stringify(d))).toEqual(d);
  });

  test('çevre, durum ve radar metinleri boş değil', () => {
    const d = yeniOyun(7);
    sahneleriGec(d);
    expect(cevreMetni(d).length).toBeGreaterThan(5);
    expect(durumMetni(d)).toContain('İniş kapsülü');
    const r = radar(d);
    expect(r.metin.length).toBeGreaterThan(5);
  });

  test('duvara çarpınca durur ve söyler', () => {
    const d = yeniOyun(7);
    sahneleriGec(d);
    const olaylar = [];
    for (let i = 0; i < 80; i++) olaylar.push(...ilerle(d, { ileri: 1 }, 0.1));
    expect(olaylar.some((o) => o.tur === 'carpti')).toBe(true);
    expect(d.oyuncu.y).toBeLessThanOrEqual(8);
    expect(olaylar.some((o) => o.tur === 'adim')).toBe(true);
  });

  test('dönerken tıkırtı', () => {
    const d = yeniOyun(7);
    const o = [];
    for (let i = 0; i < 20; i++) o.push(...ilerle(d, { donus: 1 }, 0.1));
    expect(o.filter((x) => x.tur === 'tik').length).toBeGreaterThan(2);
  });
});

describe('Sinyal Arayışı', () => {
  test('baştan sona', () => {
    const d = yeniOyun(424242);
    sahneleriGec(d);
    expect(gorevIpucu(d)).toContain('kesici');

    // Kesici
    yuru(d, 'dolap');
    const e1 = etkiles(d);
    expect(e1.tur).toBe('nokta');
    expect(e1.id).toBe('dolap');
    expect(noktaEylemleri(d, 'dolap').map((x) => x.id)).toContain('kesici');
    eylemUygula(d, 'dolap', 'kesici');
    expect(d.envanter).toContain('kesici');

    // Konuşmalar her kişiyle açılır
    for (const k of ['telsizci', 'hekim', 'muhendis']) {
      const kn = konusma(d, k);
      expect(kn.metin.length).toBeGreaterThan(10);
      expect(kn.secenekler.length).toBeGreaterThan(1);
      for (const s of kn.secenekler) s.cevap(d);
    }

    // Dışarı çık (kapsülün dışındaki enkaza yürüyünce hava kilidinden kendisi geçer)
    yuru(d, 'enkaz');
    expect(d.mekan).toBe('vadi');
    expect(etkiles(d).id).toBe('enkaz');
    eylemUygula(d, 'enkaz', 'incele');
    eylemUygula(d, 'enkaz', 'anten');
    eylemUygula(d, 'enkaz', 'hucre');
    expect(d.envanter).toEqual(expect.arrayContaining(['anten', 'guc_hucresi']));

    // Anteni jeneratörsüz kurmaya çalışmak işe yaramaz
    yuru(d, 'tepe');
    const r0 = eylemUygula(d, 'tepe', 'kur');
    expect(r0.ses).toBe('red');
    expect(d.bayrak.antenKuruldu).toBeFalsy();

    // Jeneratör
    yuru(d, 'jenerator');
    eylemUygula(d, 'jenerator', 'tak');
    expect(d.bayrak.jenerator).toBe(true);
    expect(d.envanter).not.toContain('guc_hucresi');

    // Anten
    yuru(d, 'tepe');
    eylemUygula(d, 'tepe', 'kur');
    expect(d.bayrak.antenKuruldu).toBe(true);
    const r = eylemUygula(d, 'tepe', 'ayar');
    expect(r.ayar).toBe(true);

    // Frekans ayarı: hedefe doğru çevir, tut
    ayarBaslat(d);
    const hedef = d.ayar.hedef;
    expect(ayarYakinlik(d)).toBeLessThan(0.5);
    let olaylar = [];
    for (let i = 0; i < 400 && d.ayar; i++) {
      const fark = hedef - d.ayar.frekans;
      if (Math.abs(fark) > 0.3) ayarDegis(d, Math.sign(fark) * 0.5);
      olaylar.push(...ayarIlerle(d, 0.1));
    }
    expect(olaylar).toContain('yakin');
    expect(olaylar).toContain('kilitlendi');
    expect(d.bayrak.telemetri).toBe(true);
    expect(d.sahne).toBe('telemetri');
    sahneleriGec(d);

    // Kule henüz kurulamaz: malzeme yok
    const t0 = insaEt(d, 'sinyal_kulesi');
    expect(t0.ses).toBe('red');

    // Kaynak topla
    const m = TESISLER.sinyal_kulesi.maliyet;
    const yataklar = Object.keys(NOKTALAR).filter((id) => NOKTALAR[id].kaynak);
    for (const id of yataklar) {
      if ((d.koloni.kaynaklar[NOKTALAR[id].kaynak] || 0) >= (m[NOKTALAR[id].kaynak] || 0)) continue;
      if (!d.kesif.includes(id)) d.kesif.push(id);
      yuru(d, id);
      while ((d.stok[id] || 0) > 0) eylemUygula(d, id, 'topla');
    }
    for (const k of Object.keys(m)) expect(d.koloni.kaynaklar[k]).toBeGreaterThanOrEqual(m[k]);

    // Kule
    yuru(d, 'terminal');
    expect(d.mekan).toBe('kapsul');
    const liste = insaListesi(d);
    expect(liste.find((x) => x.id === 'sinyal_kulesi').durum).toContain('Kurulabilir');
    insaEt(d, 'sinyal_kulesi');
    expect(d.koloni.binalar).toContain('sinyal_kulesi');
    expect(d.sahne).toBe('kule');
    sahneleriGec(d);
    expect(d.bitenGorevler).toContain('sinyal');
    expect(d.harita.poiler).toContain('sektor15');
    expect(gorevIpucu(d)).toContain('tamamlandı');
    // Kayıt JSON'a sorunsuz döner
    expect(gecerliMi(JSON.parse(JSON.stringify(d)))).toBe(true);
  });
});
