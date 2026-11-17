// Bütün bölümlerdeki ortam ve efekt adlarının src/ses/efektler.js'te bir karşılığı olduğunu denetler.
import { expect, test } from 'bun:test';
import { readFileSync } from 'fs';
import { BOLUMLER } from '../src/hikaye/index';

const kaynak = readFileSync(new URL('../src/ses/efektler.js', import.meta.url), 'utf8');
const var_ = (ad) => new RegExp('^\\s*' + ad + ': require', 'm').test(kaynak);

test('sahne ortam ve efektlerinin ses dosyası var', () => {
  const eksik = new Set();
  for (const b of Object.values(BOLUMLER)) {
    for (const [id, s] of Object.entries(b.sahneler)) {
      if (s.ortam && !var_(s.ortam)) eksik.add(b.id + '/' + id + ' ortam ' + s.ortam);
      for (const e of [].concat(s.efekt || [])) if (!var_(e)) eksik.add(b.id + '/' + id + ' efekt ' + e);
    }
  }
  expect([...eksik]).toEqual([]);
});

test('mekân ortam sesleri var', () => {
  const eksik = new Set();
  for (const b of Object.values(BOLUMLER)) {
    for (const [id, m] of Object.entries(b.mekanlar)) {
      const ad = m.ortam || 'ortam_' + id;
      if (!var_(ad)) eksik.add(b.id + '/' + id + ' ' + ad);
    }
  }
  expect([...eksik]).toEqual([]);
});
