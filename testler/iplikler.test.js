// İplik kaydının doğruluğu: her ipliğin bayrağı ekildiği bölümde yazılır, karşılık bölümlerinde okunur,
// açık ipliklerin gelecek planı vardır.
import { expect, test } from 'bun:test';
import { readFileSync } from 'fs';
import { IPLIKLER } from '../src/hikaye/iplikler';
import { BOLUMLER } from '../src/hikaye/index';

const kaynak = (b) => readFileSync(new URL('../src/hikaye/' + b + '.js', import.meta.url), 'utf8');

for (const ip of IPLIKLER) {
  test('iplik: ' + ip.ad, () => {
    for (const b of [...ip.ekildi, ...ip.karsiliklar]) expect(BOLUMLER[b]).toBeTruthy();
    for (const b of ip.ekildi) expect(kaynak(b)).toContain(ip.bayrak);
    for (const b of ip.karsiliklar) expect(kaynak(b)).toContain("'" + ip.bayrak + "'");
    if (ip.durum === 'acik') expect(ip.gelecek.length).toBeGreaterThan(20);
  });
}

test('iplik kimlikleri benzersiz', () => {
  expect(new Set(IPLIKLER.map((i) => i.id)).size).toBe(IPLIKLER.length);
});
