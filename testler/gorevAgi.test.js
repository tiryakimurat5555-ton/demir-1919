// 4.7: üç katmanlı görev mimarisi (v5 Paket 7)
import { describe, expect, test } from 'bun:test';
import { yeniOyun } from '../src/oyun/durum';
import { zamanIlerle, eylemUygula, noktaEylemleri } from '../src/oyun/yuzey/gorevler';
import * as GA from '../src/oyun/gorevAgi/gorevAgi';

const say = (t) => GA.SIRA.filter((k) => GA.GOREVLER[k].tur === t).length;

describe('Görev ağı', () => {
  test('115 görev: 20 ana, 40 yerleşim, 55 yan; ön şartlar tanımlı', () => {
    expect(GA.SIRA.length).toBe(115);
    expect([say('ANA'), say('YER'), say('YAN')]).toEqual([20, 40, 55]);
    for (const k of GA.SIRA) for (const o of GA.GOREVLER[k].on) for (const x of o.split('|')) expect(GA.GOREVLER[x]).toBeTruthy();
  });
  test('yeni oyun: ANA-01 hazır, öteki kilitli; ilk ilerleme sessiz', () => {
    const d = yeniOyun(3);
    expect(GA.gorevAgiIlerle(d)).toEqual([]);
    expect(GA.durum(d, 'ANA-01')).toBe('hazir');
    expect(GA.durum(d, 'ANA-02')).toBe('kilitli');
    expect(GA.hazirlar(d)).toContain('ANA-01');
  });
  test('tamamlanınca olay; açılan görevler okunur; ön şartsız tamamlanmaz', () => {
    const d = yeniOyun(3);
    GA.gorevAgiIlerle(d);
    d.bayrak.dokumhane = true; // ANA-02'nin denetimi doğru ama ANA-01 eksik
    expect(GA.gorevAgiIlerle(d, true)).toEqual([]);
    d.bayrak.kule = true;
    const ol = GA.gorevAgiIlerle(d, true);
    const g = ol.find((o) => o.tur === 'gorevTamam');
    expect(g.metin).toContain('ANA-01');
    expect(g.metin).toContain('ANA-02');
    expect(g.metin).toContain('Açılan görevler');
    expect(GA.durum(d, 'YER-01')).toBe('hazir');
  });
  test('erteleme ve kart sırası', () => {
    const d = yeniOyun(3);
    GA.gorevAgiIlerle(d);
    GA.ertele(d, 'ANA-01');
    expect(GA.durum(d, 'ANA-01')).toBe('ertelendi');
    expect(GA.hazirlar(d)).not.toContain('ANA-01');
    GA.ertele(d, 'ANA-01');
    expect(GA.durum(d, 'ANA-01')).toBe('hazir');
    const k = GA.kartMetni(d, 'YER-11');
    expect(k.indexOf('YER-11')).toBeLessThan(k.indexOf('Durum'));
    expect(k.indexOf('Durum')).toBeLessThan(k.indexOf('Ön şart'));
    expect(k.indexOf('Ön şart')).toBeLessThan(k.indexOf('açılacaklar'));
    expect(k.indexOf('açılacaklar')).toBeLessThan(k.indexOf('Uyarı'));
  });
  test('uyarılı görev hazır olunca bir kez sesli uyarı', () => {
    const d = yeniOyun(3);
    GA.gorevAgiIlerle(d);
    for (const k of ['ANA-01', 'ANA-02', 'ANA-03', 'YER-01', 'YER-03', 'YER-04', 'YER-05', 'YAN-06']) GA.agi(d).biten[k] = 1;
    const ol = GA.gorevAgiIlerle(d, true);
    expect(ol.some((o) => o.soz && o.soz.includes('YER-11'))).toBe(true);
    expect(GA.gorevAgiIlerle(d, true).some((o) => o.soz && o.soz.includes('YER-11'))).toBe(false);
  });
  test('menüler: sekmeler, alt filtreler, iki parmak', () => {
    const d = yeniOyun(3);
    const m = GA.gorevMenu(d);
    expect(m.ogeler.map((o) => o.id).slice(0, 4)).toEqual(['hazir', 'ana', 'yer', 'yan']);
    const y = GA.sekmeMenu(d, 'yer');
    expect(y.ogeler.length).toBe(40);
    const maden = y.ikiParmak.sag(d);
    expect(maden.baslik).toContain('Koloni inşa');
    expect(GA.sekmeMenu(d, 'yan', 1).ogeler.every((o) => GA.GOREVLER[o.id].kat === 'hikaye')).toBe(true);
    const kart = m.ogeler[1].alt(d).ogeler[0].alt(d);
    expect(kart.ogeler.some((o) => o.id === 'nasil')).toBe(true);
  });
  test('terminal eylemi ve zaman akışı; bütün denetimler hata atmaz', () => {
    const d = yeniOyun(3);
    d.sahne = null;
    expect(noktaEylemleri(d, 'terminal').some((e) => e.id === 'ga_gorevler')).toBe(true);
    expect(eylemUygula(d, 'terminal', 'ga_gorevler').agac(d).baslik).toBe('Görev terminali');
    zamanIlerle(d, 1);
    for (const k of GA.SIRA) if (GA.GOREVLER[k].denetim) GA.GOREVLER[k].denetim(d);
    for (const k of GA.SIRA) GA.kartMetni(d, k);
  });
  test('YER-40 kitabesi kurucuları okur', () => {
    const d = yeniOyun(3);
    GA.gorevAgiIlerle(d);
    d.yer = d.yer || {};
    d.yer.katilan = ['sorya', 'veysel'];
    for (const k of GA.SIRA) GA.agi(d).biten[k] = 1;
    const kart = GA.gorevMenu(d).ogeler[1];
    const ana = GA.sekmeMenu(d, 'yer');
    const k40 = ana.ogeler.find((o) => o.id === 'YER-40').alt(d);
    const r = k40.ogeler.find((o) => o.id === 'kitabe').yap(d);
    expect(r.metin).toContain('Sorya');
    expect(kart).toBeTruthy();
  });
});
