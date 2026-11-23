// Yerleşim mekânları (v5 paketi, Paket 1 bölüm 2): Koloni Meydanı (açık hava), binaların iç mekânları ve kamp ateşi.
// Bağımlılıksız (yalnız veri.js); yuzey/harita.js birleştirir.
//   Meydan vadinin doğusundaki düzlükte (kapı vadi (32,-6)); binaların kapıları meydanın kenarlarında.
//   Bir bina kurulmadan kapısı görünmez (gizli) ve geçilemez. Gözlem Tepesi açık hava.
import { YERLESIM_BINALARI } from './veri';

const yerVar = (d, id) => !!(d.yer && d.yer.binalar && d.yer.binalar.includes(id));

// Meydandaki kapı yerleri (x, y, yön: içeri bakış)
const KAPI_YERI = {
  kamara: { x: 3205, y: 48.5 },
  ashane: { x: 3215, y: 48.5 },
  atolye: { x: 3225, y: 48.5 },
  dunya_konut: { x: 3235, y: 48.5 },
  kubbe_ev: { x: 3245, y: 48.5 },
  tapinak: { x: 3255, y: 48.5 },
  taverna: { x: 3258.5, y: 32 },
  okul: { x: 3258.5, y: 16 },
  hamam: { x: 3201.5, y: 32 },
  gozlem: { x: 3201.5, y: 16 },
};
export const BINA_KAPILARI = KAPI_YERI;

// İç mekânlar: x 3300 + 30 × sıra, 20 × 20 (gözlem tepesi 40 × 40, açık hava)
const IC_SIRA = ['kamara', 'ashane', 'atolye', 'dunya_konut', 'kubbe_ev', 'tapinak', 'taverna', 'okul', 'hamam', 'gozlem'];
export function icMerkez(id) {
  const i = IC_SIRA.indexOf(id);
  if (i < 0) return null;
  const bati = 3300 + 50 * i;
  const gen = id === 'gozlem' ? 40 : 20;
  return { x: bati + gen / 2, y: gen / 2, bati, gen };
}

export const Y_MEKANLAR = {
  meydan: {
    ad: 'Koloni Meydanı',
    tarif: 'Bazalt plakalarla döşenmiş geniş bir düzlük. Ortada fenerler vızıldıyor, kenarlarda tezgâhlar ve yerleşimin binalarının kapıları. Batıda vadiye dönen yol.',
    alan: { bati: 3200, dogu: 3260, guney: 0, kuzey: 50 },
    ortam: 'ortam_meydan',
    zemin: 'tas',
    dis: true,
  },
};
for (const id of IC_SIRA) {
  const b = YERLESIM_BINALARI[id];
  const m = icMerkez(id);
  Y_MEKANLAR[b.mekan] = {
    ad: b.ad,
    tarif: b.tarif + ' Gündüz ' + b.sesGunduz + '; gece ' + b.sesGece + '.',
    alan: { bati: m.bati, dogu: m.bati + m.gen, guney: 0, kuzey: m.gen },
    ortam: b.ortam,
    zemin: 'tas',
    dis: !!b.dis,
    yerlesim: id,
  };
}

export const Y_KAPILAR = {
  meydan_kapi: {
    ad: 'Koloni Meydanı yolu',
    uclar: [
      { mekan: 'vadi', x: 32, y: -6, yon: 0, ad: 'Koloni Meydanı yolu' },
      { mekan: 'meydan', x: 3201.5, y: 3, yon: 0, ad: 'Vadiye dönen yol' },
    ],
    kosul: (d) => yerVar(d, 'meydan'),
    gizli: (d) => !yerVar(d, 'meydan'),
    yerlesim: true,
    kilitMetni: 'Düzlenmemiş, taşlı bir arazi. Meydan henüz kurulmadı.',
    gecisMetni: ['Taş döşeli yoldan meydana çıkıyorsun. Fenerlerin vızıltısı, tezgâhların tıkırtısı.', 'Vadiye dönüyorsun.'],
  },
};
for (const id of IC_SIRA) {
  const b = YERLESIM_BINALARI[id];
  const m = icMerkez(id);
  const k = KAPI_YERI[id];
  Y_KAPILAR['yk_' + id] = {
    ad: b.ad + ' kapısı',
    uclar: [
      { mekan: 'meydan', x: k.x, y: k.y, yon: 0, ad: b.ad + (b.dis ? ' yolu' : ' kapısı') },
      { mekan: b.mekan, x: m.x, y: 1.5, yon: 0, ad: 'Meydana çıkış' },
    ],
    kosul: (d) => yerVar(d, id),
    gizli: (d) => !yerVar(d, id),
    yerlesim: true,
    kilitMetni: 'Burası ' + b.ad + ' için ayrılmış; henüz kurulmadı.',
    gecisMetni: [(b.dis ? 'Yokuştan çıkıyorsun. ' : 'Kapıdan giriyorsun. ') + b.ad + '.', 'Meydana çıkıyorsun.'],
  };
}

// Noktalar: kamp ateşi (vadide, başlangıçtan), meydan terminali, her binanın kendi köşesi, kamaranın yatağı ve rafı
export const Y_NOKTALAR = {
  kamp_atesi: { mekan: 'vadi', x: 6, y: -4, ad: 'Kamp ateşi', yaricap: 2.2, engel: 0.9, yerlesim: 'kamp', tarif: YERLESIM_BINALARI.kamp.tarif },
  meydan_terminali: { mekan: 'meydan', x: 3230, y: 25, ad: 'Meydan terminali', yaricap: 2, engel: 0.8, yerlesim: 'meydan', tarif: 'Meydanın ortasında bir direğe takılı terminal. Yerleşim kayıtları, takvim ve yerleşimcilerin nöbet programı burada.' },
  kamara_yatak: { mekan: 'kamara', x: 3306, y: 15, ad: 'Yatak', yaricap: 2, engel: 1, yerlesim: 'kamara', tarif: 'Yumuşak bir yatak; başucunda duvar takvimi. Burada dinlenip yeni güne başlayabilirsin.' },
  kamara_raf: { mekan: 'kamara', x: 3314, y: 15, ad: 'Dekor rafı', yaricap: 2, engel: 0.8, yerlesim: 'kamara', tarif: 'Usta Veysel\'in yaptığı raf. Dekorlar buraya konur.' },
};
for (const id of IC_SIRA) {
  if (id === 'kamara') continue;
  const b = YERLESIM_BINALARI[id];
  const m = icMerkez(id);
  Y_NOKTALAR['yb_' + id] = { mekan: b.mekan, x: m.x, y: m.y + 3, ad: b.ad, yaricap: 2.2, engel: 1, yerlesim: id, tarif: b.tarif };
}
