// Konum ve yön hesapları (açık dünyanın temeli).
import { expect, test } from 'bun:test';
import { don, goreliAci, saatYonu, sesKoordinati, sesYonu, sinirla, tarif, uzaklik, yuru } from '../src/oyun/konum';

const d0 = { x: 0, y: 0, yon: 0 };

test('saat yönü: önde 12, sağda 3, arkada 6, solda 9', () => {
  expect(saatYonu(goreliAci(d0, { x: 0, y: 5 }))).toBe(12);
  expect(saatYonu(goreliAci(d0, { x: 5, y: 0 }))).toBe(3);
  expect(saatYonu(goreliAci(d0, { x: 0, y: -5 }))).toBe(6);
  expect(saatYonu(goreliAci(d0, { x: -5, y: 0 }))).toBe(9);
});

test('dönünce göreli yön değişir', () => {
  const sag = don(d0, Math.PI / 2); // doğuya bakıyor
  expect(saatYonu(goreliAci(sag, { x: 5, y: 0 }))).toBe(12);
  expect(saatYonu(goreliAci(sag, { x: 0, y: 5 }))).toBe(9);
  expect(saatYonu(goreliAci(don(d0, -Math.PI / 2), { x: 0, y: 5 }))).toBe(3);
});

test('yürüme yöne göre ve sınırlar içinde', () => {
  const d = yuru(don(d0, Math.PI / 2), 3);
  expect(d.x).toBeCloseTo(3);
  expect(d.y).toBeCloseTo(0);
  expect(sinirla(yuru(d0, 50), { bati: -20, dogu: 20, guney: -20, kuzey: 20 }).y).toBe(20);
  expect(uzaklik({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5);
});

test('tarif ve ses koordinatları', () => {
  expect(tarif('Zil', d0, { x: 0, y: 8 })).toBe('Zil saat 12 yönünde, 8 metre.');
  expect(tarif('Zil', d0, { x: 0.2, y: 0.2 })).toBe('Zil tam yanında.');
  expect(sesKoordinati({ x: 2, y: 5 })).toEqual({ x: 2, y: 0, z: -5 });
  const y = sesYonu(0);
  expect(y.z).toBeCloseTo(-1);
  expect(sesYonu(Math.PI / 2).x).toBeCloseTo(1);
});
