import { expect, test } from 'bun:test';
import { existsSync, readFileSync } from 'fs';
import { GEZEGENLER } from '../src/oyun/veri/gozlem';
import { OPERASYONLAR } from '../src/oyun/veri/uzayGorevleri';

test('her inilebilir gezegenin yüzey ortamı var ve inişten sonra başlar', () => {
  const efektler = readFileSync(new URL('../src/ses/efektler.js', import.meta.url), 'utf8');
  const ids = Object.keys(GEZEGENLER);
  expect(ids.length).toBe(20);
  for (const id of ids) {
    const o = OPERASYONLAR[id];
    expect(o.ortam).toBe('ortam_gez_' + id);
    expect(o.adimlar[o.ortamAdim - 1].tur).toBe('kenetle');
    expect(o.ortamAdim < o.adimlar.length).toBe(true);
    expect(existsSync(new URL('../assets/ses/gezegen/' + o.ortam + '.mp3', import.meta.url))).toBe(true);
    expect(efektler.includes("  " + o.ortam + ": require(")).toBe(true);
    expect(efektler.includes("  " + o.ortam + ": 0.6,")).toBe(true);
  }
});
