// Seslendirilmiş sahneler (deneme). Saf veri: Karakoy.js bu planları konumsal ses motorunda oynatır.
// Konumlar Karaköy haritasının koordinatlarıdır (x doğu, y kuzey; yon 0 kuzey, saat yönünde).
// Dinleyici Arif'in kulaklarıdır. Ses dosyaları assets/ses/konumsal içinde, tek kanallı.
//
// Plan adımları (sırayla; 'git' ve beklemesiz 'cal' arka planda sürer):
//   { t: 'dinleyici', x, y, yon }         Arif'in yeri ve baktığı yön
//   { t: 'boguk', acik }                  içerideyken dışarının sesleri boğulur
//   { t: 'kisi', id, x, y, ic }           konuşan kişi (ic: Arif'le aynı odada)
//   { t: 'git', id, x, y, sure }          kişi oraya sure ms'de gider (arka planda)
//   { t: 'cal', id, ses, duzey, dongu, oran, bekle }  kişinin sesi; bekle ise bitene kadar beklenir
//   { t: 'oran', id, oran, sure }         döngünün hızı (koşu yavaşlar)
//   { t: 'dur', id }                      döngüyü durdur
//   { t: 'don', yon, sure }               Arif başını çevirir
//   { t: 'yuru', x, y, adim, zemin, ms }  Arif yürür (kendi adım sesleri), varınca sürer
//   { t: 'anlat', metin }                 anlatıcı (rehber) söyler, bitene kadar beklenir
//   { t: 'bekle', ms }

const BATI = (3 * Math.PI) / 2;
const GUNEY = Math.PI;

export const SESLI_SAHNELER = {
  // Ali kayıkhaneden rıhtım boyunca koşarak gelir. Arif kömürün başında, denize bakıyor;
  // Ali sağ arkadan, sisin içinden gelir, iki kez seslenir, yanında durur.
  cagri: {
    sesler: ['kosu_tas', 'ali_seslenis1', 'ali_seslenis2', 'ali_cagri'],
    plan: [
      { t: 'dinleyici', x: -6, y: 3, yon: GUNEY },
      { t: 'boguk', acik: false },
      { t: 'kisi', id: 'ali', x: -34, y: 6.5 },
      { t: 'bekle', ms: 400 },
      { t: 'cal', id: 'ali', ses: 'kosu_tas', duzey: 0.9, dongu: true, oran: 1.05 },
      { t: 'git', id: 'ali', x: -18, y: 4.6, sure: 3700 },
      { t: 'bekle', ms: 500 },
      { t: 'cal', id: 'ali', ses: 'ali_seslenis1', duzey: 1 },
      { t: 'bekle', ms: 3200 },
      { t: 'git', id: 'ali', x: -8.6, y: 3.7, sure: 2700 },
      { t: 'cal', id: 'ali', ses: 'ali_seslenis2', duzey: 1 },
      { t: 'bekle', ms: 2400 },
      { t: 'oran', id: 'ali', oran: 0.82, sure: 600 },
      { t: 'git', id: 'ali', x: -7.2, y: 3.2, sure: 900 },
      { t: 'don', yon: BATI, sure: 700 },
      { t: 'bekle', ms: 750 },
      { t: 'dur', id: 'ali' },
      { t: 'bekle', ms: 200 },
      { t: 'cal', id: 'ali', ses: 'ali_cagri', duzey: 1, bekle: true },
      { t: 'bekle', ms: 400 },
    ],
  },
  // Arif kayıkhanenin kapısından girer; Süleyman Kaptan mangalın başında oturuyor.
  cagri_kaptan: {
    sesler: ['suleyman_cagri1', 'suleyman_cagri2'],
    plan: [
      { t: 'dinleyici', x: -36.2, y: 5, yon: BATI },
      { t: 'boguk', acik: false },
      { t: 'kisi', id: 'suleyman', x: -45, y: 5.3, ic: true },
      { t: 'yuru', x: -38.6, y: 5, adim: 3, zemin: 'tas', ms: 520 },
      { t: 'boguk', acik: true },
      { t: 'yuru', x: -43.3, y: 5, adim: 5, zemin: 'ahsap', ms: 560 },
      { t: 'anlat', metin: 'Mangalın ışığında yüzünü görüyorsun. Gözleri kızarmış.' },
      { t: 'bekle', ms: 500 },
      { t: 'cal', id: 'suleyman', ses: 'suleyman_cagri1', duzey: 1, bekle: true },
      { t: 'bekle', ms: 1100 },
      { t: 'cal', id: 'suleyman', ses: 'suleyman_cagri2', duzey: 1, bekle: true },
      { t: 'bekle', ms: 500 },
    ],
  },
};

// Planın kullandığı ses dosyaları
export function planSesleri(id) {
  const s = SESLI_SAHNELER[id];
  return s ? s.sesler : [];
}
