// Maliye Nezareti (altıncı görev): köprünün öte yakasındaki evrak odası ve evrak mahzeni. Saf veri.
// Karaköy haritasıyla aynı düzlemde ama uzakta (x 300'ün doğusu) duran iç mekânlardır; Karaköy'ün konumsal
// sesleri buradan duyulmaz. harita.js bu tabloları kendi MEKANLAR ve KISILER'ine katar.

const gd = (d) => ((d.dakika % 1440) + 1440) % 1440;

export const NEZARET_ACILIS = 9 * 60;
export const NEZARET_KAPANIS = 17 * 60;
export const OGLE_BAS = 12 * 60;
export const OGLE_BIT = 12 * 60 + 45;
export const GULCE_GIDER = 14 * 60 + 15; // Gülce büroya dönmek zorunda
export const NAZIM_GELIR = 14 * 60 + 30;
export const NAZIM_GIDER = 14 * 60 + 50;

// Gülce kâtip Tahsin Efendi'yi oyalarken (mutlak dakika olarak saklanır)
export function g6Oyalaniyor(d) {
  const b = d.bayrak.g6OyalaBitis;
  return !!b && d.gun * 1440 + gd(d) < b;
}

export const ogleArasi = (d) => gd(d) >= OGLE_BAS && gd(d) < OGLE_BIT;
const nezaretAcik = (d) => gd(d) >= NEZARET_ACILIS && gd(d) < NEZARET_KAPANIS;
const bugunKapali = (d) => d.bayrak.mahzenKapaliGun === d.gun;

export const MALIYE_MEKANLAR = {
  evrak_odasi: {
    id: 'evrak_odasi',
    ad: 'Maliye Nezareti\'nin evrak odası',
    ortam: 'ortam_buro',
    alan: { x1: 300, x2: 318, y1: 0, y2: 12 },
    cikislar: [
      { id: 'evrak_cik', ad: 'Nezaret\'in kapısı, köprüye dönen yol', x: 302, y: 0.5, hedef: 'dis', varis: { x: -57.5, y: 12, yon: Math.PI / 2 } },
      {
        id: 'mahzen_kapi',
        ad: 'Evrak mahzenine inen demir parmaklıklı kapı',
        x: 317.5,
        y: 11.5,
        hedef: 'evrak_mahzeni',
        varis: { x: 316.5, y: 15.5, yon: -Math.PI / 2 },
        acik: (d) => nezaretAcik(d) && !bugunKapali(d) && (g6Oyalaniyor(d) || ogleArasi(d)),
        kilitli:
          'Parmaklıklı kapı Tahsin Efendi\'nin masasının hemen arkasında. Kâtip gözlüğünün üstünden bakıyor: Evrak-ı atîka, evladım. Müdür bey imzalamadan aşağı kimse inemez.',
      },
    ],
  },
  evrak_mahzeni: {
    id: 'evrak_mahzeni',
    ad: 'Evrak mahzeni, eski defterlerin rafları',
    ortam: 'ortam_arsiv',
    alan: { x1: 300, x2: 318, y1: 14, y2: 30 },
    cikislar: [{ id: 'mahzen_cik', ad: 'Evrak odasına çıkan merdiven', x: 317.5, y: 14.5, hedef: 'evrak_odasi', varis: { x: 316.5, y: 10, yon: Math.PI } }],
  },
};

// Sokaktan köprüye çıkan yol: Rıhtım Caddesi'nin batı ucunda
export const KOPRU_CIKISI = {
  id: 'kopru_gec',
  ad: 'Galata Köprüsü, karşı yakaya geçen yol',
  x: -59.2,
  y: 12,
  hedef: 'evrak_odasi',
  varis: { x: 303, y: 2, yon: Math.PI / 2 },
  acik: (d) => (d.gorev || 1) >= 6 && nezaretAcik(d) && !bugunKapali(d),
  kilitli: 'Köprünün öte yakasındaki Nezaret dokuzdan beşe açık. Bugün oraya işin yoksa köprüyü geçmenin anlamı yok.',
};

// Maliye'nin kişileri: altıncı görev sürdükçe her gün (Gülce yalnızca o gün izinli)
const G6 = { gorev: 6, yalniz: true, kosul: (d) => !d.bayrak.g6Bitti };

export const MALIYE_KISILER = [
  {
    id: 'tahsin',
    ad: 'Evrak kâtibi Tahsin Efendi',
    giris: { x: 302, y: 1 },
    rutin: [
      { bas: 0, mekan: 'yok' },
      { ...G6, bas: NEZARET_ACILIS, mekan: 'evrak_odasi', x: 315, y: 9, eylem: 'masasında, mahzen kapısının önünde defter tutuyor', soz: 'Tahsin Efendi gözlüğünün üstünden bakıyor: Buyurun?' },
      { ...G6, bas: OGLE_BAS, mekan: 'yok' },
      { ...G6, bas: OGLE_BIT, mekan: 'evrak_odasi', x: 315, y: 9, eylem: 'masasında, mahzen kapısının önünde defter tutuyor', soz: 'Tahsin Efendi gözlüğünün üstünden bakıyor: Buyurun?' },
      { ...G6, bas: NEZARET_KAPANIS, mekan: 'yok' },
    ],
  },
  {
    id: 'rustu',
    ad: 'Mahzen memuru Rüştü Efendi',
    gozcu: true,
    giris: { x: 316.5, y: 15.5 },
    devriyeMekan: 'evrak_mahzeni',
    devriye: [
      { x: 304, y: 16.5 },
      { x: 313, y: 16.5 },
      { x: 313, y: 25.5 },
      { x: 304, y: 25.5 },
    ],
    rutin: [
      { bas: 0, mekan: 'yok' },
      { ...G6, bas: NEZARET_ACILIS, mekan: 'devriye', eylem: 'gaz lambasıyla rafların arasında dolaşıyor, öksürüyor' },
      { ...G6, bas: OGLE_BAS, mekan: 'yok' },
      { ...G6, bas: OGLE_BIT, mekan: 'devriye', eylem: 'gaz lambasıyla rafların arasında dolaşıyor, öksürüyor' },
      { ...G6, bas: NEZARET_KAPANIS, mekan: 'yok' },
    ],
  },
  {
    id: 'nazim',
    ad: 'Gözlüklü bir bey',
    giris: { x: 302, y: 1 },
    rutin: [
      { bas: 0, mekan: 'yok' },
      { ...G6, bas: NAZIM_GELIR, mekan: 'evrak_odasi', x: 313.5, y: 8, eylem: 'kâtibin masasına eğilmiş, alçak sesle konuşuyor' },
      { ...G6, bas: NAZIM_GIDER, mekan: 'yok' },
    ],
  },
  {
    id: 'gulce',
    ad: 'Gülce',
    giris: { x: -36, y: 41 },
    rutin: [
      { ...G6, bas: 8 * 60, mekan: 'han', x: 35, y: 21, eylem: 'avluda, belgenin başında', soz: 'Gülce belgeyi katlıyor: Dokuzda evrak odasında olurum.' },
      { ...G6, bas: NEZARET_ACILIS, mekan: 'evrak_odasi', x: 305, y: 4, eylem: 'okuma masasında, önünde bir talep pusulası', soz: 'Gülce başını kaldırmadan fısıldıyor: Tahsin Efendi\'nin gözü kapıda.' },
      { ...G6, bas: GULCE_GIDER, mekan: 'yok' },
      { ...G6, bas: 17 * 60, mekan: 'han', x: 35, y: 21, eylem: 'avluda, Ohannes\'in ocağının yanında bekliyor', soz: 'Gülce ellerini ocağa tutuyor: Anlat.' },
      { ...G6, bas: 22 * 60 + 30, mekan: 'yok' },
    ],
  },
];
