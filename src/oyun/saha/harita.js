// Saha haritaları (v5 Paket 5 bölüm 2, Paket 13 bölüm 2.1 ve 3.1). yuzey/harita.js birleştirir.
//   Derin Maden Ocağı: vadideki maden ağzından asansörle inilir. Her durak (Kat 1, 5, ... 40) bir galeri: girişte
//   asansör, önünde soldan sağa yarım daire üzerinde 4-6 düğüm (damar, kaya duvarı, tehlike, iniş merdiveni).
//   İç Deniz Kıyı Koruluğu: Manyetik Sırtlar'ın doğusundan inilir. İki şerit: kıyı (tuz, kayalık, balık) ve koru patikası
//   (ağaçlar, lif çalıları).
import { DURAKLAR, GALERILER, MADEN_DUGUMLERI, KIYI_DUGUMLERI, KARAKOL_DURAKLARI, BALIK_NOKTALARI, bandi } from './veri';

export const GALERI_GEN = 24;
export const galeriMekani = (kat) => 'maden_' + kat;
export function galeriMerkezi(kat) {
  const i = DURAKLAR.indexOf(kat);
  return { bati: 4200 + 40 * i, x: 4200 + 40 * i + GALERI_GEN / 2 };
}
const YON_ADLARI = ['solda', 'sol önde', 'önde', 'sağ önde', 'sağda', 'ileride'];
export function yonAdi(n, i) {
  if (n <= 1) return 'önde';
  if (n === 4) return ['solda', 'sol önde', 'sağ önde', 'sağda'][i];
  if (n === 5) return ['solda', 'sol önde', 'önde', 'sağ önde', 'sağda'][i];
  return YON_ADLARI[i] || 'ileride';
}

export const S_MEKANLAR = {};
export const S_KAPILAR = {};
export const S_NOKTALAR = {};

const ORTAM = { ust: 'ortam_maden_ust', orta: 'ortam_maden_orta', derin: 'ortam_maden_derin' };
for (const kat of DURAKLAR) {
  const g = galeriMerkezi(kat);
  const b = bandi(kat);
  S_MEKANLAR[galeriMekani(kat)] = {
    ad: 'Maden, Kat ' + kat,
    tarif: b === 'ust' ? 'Üst taş ve kömür katı: kazma yankıları, damlayan su.' : b === 'orta' ? 'Kristal ve gümüş katı: duvarlarda ince kristal çınlamaları.' : 'Derin yankı ve çekirdek katı: zifiri karanlık, uzaklardan rüzgâr uğultusu.',
    alan: { bati: g.bati, dogu: g.bati + GALERI_GEN, guney: 0, kuzey: 18 },
    ortam: ORTAM[b],
    zemin: 'tas',
    maden: kat,
    saha: 'maden',
    radarMenzili: b === 'derin' ? 10 : 14,
  };
  S_NOKTALAR['maden_asansor_' + kat] = { mekan: galeriMekani(kat), x: g.x, y: 1.5, ad: 'Asansör', yaricap: 2, saha: 'asansor', tarif: 'Halatlı maden asansörü. Açık duraklara iner, yüzeye çıkar.' };
  if (KARAKOL_DURAKLARI.includes(kat)) S_NOKTALAR['maden_karakol_' + kat] = { mekan: galeriMekani(kat), x: g.x - 5, y: 2.5, ad: 'İleri karakol yeri', yaricap: 2, saha: 'karakol', karakol: 'kat' + kat, tarif: 'Asansör durağının yanında düz bir taş. Bir ileri karakol kurulabilir.' };
  const l = GALERILER[kat];
  l.forEach((tur, i) => {
    // Yarım daire: soldan (-90°) sağa (+90°), merkez (x, 5), yarıçap 7
    const a = l.length === 1 ? 0 : -Math.PI / 2 + (Math.PI * i) / (l.length - 1);
    const x = g.x + Math.sin(a) * 7;
    const y = 5 + Math.cos(a) * 7;
    const id = 'md_' + kat + '_' + i;
    if (tur === 'merdiven') S_NOKTALAR[id] = { mekan: galeriMekani(kat), x, y, ad: 'Aşağı iniş merdiveni', yaricap: 2, saha: 'merdiven', kat, yon: yonAdi(l.length, i), tarif: 'Rüzgâr ve derinlik uğultusu. Aşağıdaki durağa iner.' };
    else if (tur === 'tehlike') S_NOKTALAR[id] = { mekan: galeriMekani(kat), x, y, ad: 'Hareket eden bir şey', yaricap: 2.5, saha: 'tehlike', kat, yon: yonAdi(l.length, i), tarif: 'Taşların arasında hareket var.' };
    else {
      const n = MADEN_DUGUMLERI[tur];
      S_NOKTALAR[id] = { mekan: galeriMekani(kat), x, y, ad: n.ad, yaricap: 2, saha: 'damar', dugum: tur, kat, yon: yonAdi(l.length, i), tarif: n.ad + '.' };
    }
  });
}
// Vadideki maden ağzı
S_NOKTALAR.maden_agzi = { mekan: 'vadi', x: -20, y: -30, ad: 'Maden ağzı ve asansör', yaricap: 2.5, engel: 1, saha: 'asansor', gorunur: (d) => !!(d.bayrak && d.bayrak.madenAcik), tarif: 'Kayaya oyulmuş derin kuyunun ağzı; halatlı bir asansör.' };

// Kıyı Koruluğu: x 4600-4680, y 0-50. Güney şeridi kıyı (deniz güneyde), kuzey şeridi koru patikası.
S_MEKANLAR.kiyi = {
  ad: 'İç Deniz Kıyı Koruluğu',
  tarif: 'Güneyde iç denizin kıyısı: dalgalar, tuz birikintileri, kayalıklar. Kuzeyde sert yapraklı bir koru patikası. Batıda sırtlara dönen yokuş.',
  alan: { bati: 4600, dogu: 4680, guney: 0, kuzey: 50 },
  ortam: 'ortam_kiyi',
  zemin: 'tas',
  dis: true,
  saha: 'kiyi',
};
S_KAPILAR.kiyi_yolu = {
  ad: 'Kıyıya inen yokuş',
  uclar: [
    { mekan: 'sirtlar', x: 578.5, y: -20, yon: 0, ad: 'Doğuya, kıyıya inen yokuş' },
    { mekan: 'kiyi', x: 4601.5, y: 25, yon: 0, ad: 'Sırtlara dönen yokuş' },
  ],
  kosul: (d) => !!(d.bayrak && d.bayrak.kiyiAcik),
  gizli: (d) => !(d.bayrak && d.bayrak.kiyiAcik),
  kilitMetni: 'Sırtların doğusu sarp; yol bilinmiyor.',
  gecisMetni: ['Kayalık yokuştan iniyorsun; tuzlu bir rüzgâr ve dalga sesi.', 'Yokuştan sırtlara tırmanıyorsun.'],
};
const KIYI_YERLESIM = [
  ['tuz', 4612, 6], ['kiyi_kayasi', 4625, 4], ['tuz', 4645, 7], ['kiyi_kayasi', 4662, 5],
  ['lif_calisi', 4610, 40], ['orta_agac', 4622, 44], ['orta_agac', 4636, 38], ['yasli_agac', 4650, 45], ['lif_calisi', 4660, 36], ['yasli_agac', 4672, 42],
];
KIYI_YERLESIM.forEach(([tur, x, y], i) => {
  S_NOKTALAR['ky_' + i] = { mekan: 'kiyi', x, y, ad: KIYI_DUGUMLERI[tur].ad, yaricap: 2, saha: 'kiyi', dugum: tur, tarif: KIYI_DUGUMLERI[tur].ad + '.' };
});
S_NOKTALAR.balik_sig = { mekan: 'kiyi', x: 4630, y: 12, ad: 'Sığ göl kıyısı', yaricap: 2.5, saha: 'balik', balik: 'sig_kiyi', tarif: 'Durgun, sığ su. Gümüş sazanlar burada.' };
S_NOKTALAR.balik_termal = { mekan: 'kiyi', x: 4655, y: 14, ad: 'Sıcak termal akıntı', yaricap: 2.5, saha: 'balik', balik: 'termal', tarif: 'Buhar tüten ılık bir akıntı. Termal yılan balıkları burada.' };
S_NOKTALAR.balik_kayalik = { mekan: 'kiyi', x: 4675, y: 10, ad: 'Kayalık koy ve açık iskele', yaricap: 2.5, saha: 'balik', balik: 'kayalik', tarif: 'Dalgaların dövdüğü kayalık; uçta eski bir iskele.' };
S_NOKTALAR.kiyi_kampi = { mekan: 'kiyi', x: 4606, y: 22, ad: 'Kıyı kampı yeri', yaricap: 2, saha: 'karakol', karakol: 'kiyi', tarif: 'Rüzgârdan korunaklı bir düzlük. Bir ileri karakol kurulabilir.' };
void BALIK_NOKTALARI;
