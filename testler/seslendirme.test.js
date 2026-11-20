// Seslendirilmiş sahnelerin planları: sesler dosyada ve motora yükleniyor, kişiler kurulmadan kullanılmıyor.
import { describe, expect, test } from 'bun:test';
import { existsSync, readFileSync } from 'fs';
import { SESLI_SAHNELER } from '../src/oyun/karakoy/seslendirme';
import { SAHNELER } from '../src/oyun/karakoy/sahneler';
import { MEKANLAR } from '../src/oyun/karakoy/harita';

const ekran = readFileSync(new URL('../src/ekran/Karakoy.js', import.meta.url), 'utf8');
const TURLER = ['dinleyici', 'boguk', 'kisi', 'git', 'cal', 'oran', 'dur', 'don', 'yuru', 'anlat', 'bekle'];
const icinde = (m, x, y) => x >= m.alan.x1 && x <= m.alan.x2 && y >= m.alan.y1 && y <= m.alan.y2;

describe('Seslendirme', () => {
  for (const [id, sahne] of Object.entries(SESLI_SAHNELER)) {
    test(id + ': sahne var, sesler dosyada ve yükleniyor', () => {
      expect(SAHNELER[id]).toBeDefined();
      expect(SAHNELER[id].sesliParagraflar.length).toBeGreaterThan(0);
      for (const a of sahne.sesler) {
        expect(existsSync(new URL('../assets/ses/konumsal/' + a + '.wav', import.meta.url))).toBe(true);
        expect(ekran.includes(a + ": require('../../assets/ses/konumsal/" + a + ".wav')")).toBe(true);
      }
    });
    test(id + ': plan adımları geçerli', () => {
      const kurulan = new Set();
      for (const a of sahne.plan) {
        expect(TURLER).toContain(a.t);
        if (a.t === 'kisi') kurulan.add(a.id);
        if (['git', 'cal', 'oran', 'dur'].includes(a.t)) expect(kurulan.has(a.id)).toBe(true);
        if (a.t === 'cal') expect(sahne.sesler).toContain(a.ses);
        if (a.t === 'yuru') expect(['tas', 'ahsap']).toContain(a.zemin);
      }
      // ses kaynaklarının hepsi sonunda bekleniyor: son konuşma bitmeden anlatım başlamaz
      const sonCal = [...sahne.plan].reverse().find((a) => a.t === 'cal');
      expect(sonCal.bekle).toBe(true);
    });
  }
  test('Süleyman Kaptan kayıkhanenin içinde, Ali rıhtımda koşuyor', () => {
    const sul = SESLI_SAHNELER.cagri_kaptan.plan.find((a) => a.t === 'kisi');
    expect(icinde(MEKANLAR.kayikhane, sul.x, sul.y)).toBe(true);
    const ali = SESLI_SAHNELER.cagri.plan.filter((a) => (a.t === 'kisi' || a.t === 'git') && a.id === 'ali');
    for (const a of ali) expect(icinde(MEKANLAR.kayikhane, a.x, a.y)).toBe(false);
    const son = ali[ali.length - 1];
    const din = SESLI_SAHNELER.cagri.plan.find((a) => a.t === 'dinleyici');
    expect(Math.hypot(son.x - din.x, son.y - din.y)).toBeLessThan(1.6);
  });
});
