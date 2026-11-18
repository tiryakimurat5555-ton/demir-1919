// Konum ve yön hesapları (saf JavaScript; ekrandan ve sesten bağımsız).
// Dünya düzlemi: x doğuya, y kuzeye doğru metre. Yön (yon) radyan: 0 kuzey, saat yönünde artar.
// Bu dosya konumsal ses denemesinin ve ileride açık dünyanın ortak temelidir.

const TAM_TUR = Math.PI * 2;

export function aciDuzelt(a) {
  let x = a % TAM_TUR;
  if (x < 0) x += TAM_TUR;
  return x;
}

// Bir noktanın dinleyiciye göre göreli açısı (0 = tam önde, saat yönünde artar)
export function goreliAci(dinleyici, nokta) {
  const dx = nokta.x - dinleyici.x;
  const dy = nokta.y - dinleyici.y;
  return aciDuzelt(Math.atan2(dx, dy) - dinleyici.yon);
}

// Göreli açıyı saat yönüne çevirir: 12 önde, 3 sağda, 6 arkada, 9 solda
export function saatYonu(aci) {
  const saat = Math.round((aciDuzelt(aci) / TAM_TUR) * 12) % 12;
  return saat === 0 ? 12 : saat;
}

export function uzaklik(a, b) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

// Dinleyiciyi yönüne göre ileri (pozitif) ya da geri (negatif) yürütür
export function yuru(dinleyici, metre) {
  return {
    ...dinleyici,
    x: dinleyici.x + Math.sin(dinleyici.yon) * metre,
    y: dinleyici.y + Math.cos(dinleyici.yon) * metre,
  };
}

export function don(dinleyici, radyan) {
  return { ...dinleyici, yon: aciDuzelt(dinleyici.yon + radyan) };
}

// Sınırların içinde tutar (dikdörtgen alan)
export function sinirla(dinleyici, alan) {
  return {
    ...dinleyici,
    x: Math.max(alan.bati, Math.min(alan.dogu, dinleyici.x)),
    y: Math.max(alan.guney, Math.min(alan.kuzey, dinleyici.y)),
  };
}

// Sesli tarif: "Zil saat 3 yönünde, 8 metre."
export function tarif(ad, dinleyici, nokta) {
  const m = Math.round(uzaklik(dinleyici, nokta));
  if (m < 1) return ad + ' tam yanında.';
  return ad + ' saat ' + saatYonu(goreliAci(dinleyici, nokta)) + ' yönünde, ' + m + ' metre.';
}

// Web Audio koordinatları: X doğu, Y yukarı, Z güney (dinleyici varsayılan olarak -Z'ye, kuzeye bakar)
export function sesKoordinati(nokta) {
  return { x: nokta.x, y: 0, z: -nokta.y };
}

export function sesYonu(yon) {
  return { x: Math.sin(yon), y: 0, z: -Math.cos(yon) };
}
