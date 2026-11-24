// Oyunun bütün durumu tek bir düz nesnedir (saf JavaScript; ekrandan ve sesten bağımsız).
// Kayıt bu nesneyi olduğu gibi JSON olarak yazar (src/oyun/kayit.js).
// Veri modelleri belgeler/gelistirici-entegrasyon-rehberi-ve-yol-haritasi.md bölüm 5'e göre:
//   koloni  (ColonyWorld)  seviye, bölgeler, binalar, nüfus, kaynaklar, moral
//   gemi    (Starship)     şimdilik yok; tersane kurulunca sinif, bolmeler, govde, kalkan, silahlar, kargo
//   murettebat (CrewMember) ad, uzmanlık, oda, verimlilik, stres, kayıt
//   gorev   (SpaceMission / yüzey görevi) id, adım, bayraklar
//   kodeks  (CodexEntry)   kaydedilen fenomenler, itibar
import { BASLANGIC, NOKTALAR, VADI_OLCEK } from './yuzey/harita';
import { oncuUret } from './veri/murettebat';
import { HAMMADDE_SIRASI } from './veri/tesisler';

export const KAYIT_SURUMU = 1;

export function yeniOyun(tohum = Date.now() % 2147483647) {
  const kaynaklar = {};
  for (const k of HAMMADDE_SIRASI) kaynaklar[k] = 0;
  const stok = {};
  for (const id of Object.keys(NOKTALAR)) if (NOKTALAR[id].kaynak) stok[id] = NOKTALAR[id].stok;
  return {
    surum: KAYIT_SURUMU,
    tohum,
    sure: 0, // oyunda geçen gerçek süre (sn)
    mekan: BASLANGIC.mekan,
    oyuncu: { x: BASLANGIC.x, y: BASLANGIC.y, yon: BASLANGIC.yon },
    sahne: 'acilis',
    envanter: [], // taşınan eşyalar: kesici, anten, guc_hucresi
    stok, // kaynak yataklarında kalan
    kesif: [], // bulunan (duyulan ya da gidilen) noktalar
    koloni: {
      seviye: 1,
      bolgeler: { vadi: 'acik', guney: 'kilitli', bati: 'kilitli', kuzey: 'kilitli' },
      binalar: [],
      nufus: { toplam: 4, barinma: 6, sanayi: 0, tersane: 0, bilim: 0 },
      kaynaklar,
      parcalar: {}, // üretilmiş gemi parçaları ve modüller (veri/uretim.js)
      uretimler: [], // tesislerde süren işler
      moral: 55,
    },
    gemi: null,
    murettebat: oncuUret(tohum),
    kaptan: { yetenekler: [], tecrube: 0 },
    itibar: 0,
    kodeks: [],
    harita: { poiler: [] },
    gorev: { id: 'sinyal' },
    bayrak: {}, // hikâye bayrakları (görevler arası kalıcı)
    vadiOlcek: VADI_OLCEK, // 4.8: vadi genişletildi; eski kayıtlarda konumlar bir kez ölçeklenir
    bitenGorevler: [],
    ayar: null, // frekans ayarı sürüyorsa { frekans, hedef, kilit }
    oto: null, // kendiliğinden yürüme hedefi
  };
}

// Eski sürümlerin kayıtlarını tamamlar: sonradan eklenen kaynak yataklarının stoku (ör. 0.3 titanyum_3,
// 0.4 plato ve kükürt çatlakları). Kayıt okunurken çağrılır; aynı nesneyi döndürür.
export function kaydiTamamla(d) {
  if (!d) return d;
  // 4.8: genişletilmiş vadi. Eski kayıtta vadideki oyuncu ve fenerler aynı oranda açılır.
  if (!d.vadiOlcek) {
    if (d.mekan === 'vadi' && d.oyuncu) {
      d.oyuncu.x *= VADI_OLCEK;
      d.oyuncu.y *= VADI_OLCEK;
    }
    for (const f of d.fenerler || []) if (f.mekan === 'vadi') {
      f.x *= VADI_OLCEK;
      f.y *= VADI_OLCEK;
    }
    d.vadiOlcek = VADI_OLCEK;
  }
  if (!d.stok) d.stok = {};
  for (const id of Object.keys(NOKTALAR)) if (NOKTALAR[id].kaynak && d.stok[id] == null) d.stok[id] = NOKTALAR[id].stok;
  for (const k of HAMMADDE_SIRASI) if (d.koloni && d.koloni.kaynaklar[k] == null) d.koloni.kaynaklar[k] = 0;
  if (d.koloni && !d.koloni.parcalar) d.koloni.parcalar = {};
  if (d.koloni && !d.koloni.uretimler) d.koloni.uretimler = [];
  return d;
}

export function gecerliMi(d) {
  return !!(d && d.surum === KAYIT_SURUMU && d.oyuncu && d.koloni && d.gorev && d.bayrak && Array.isArray(d.envanter));
}
