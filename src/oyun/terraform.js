// Yaşanabilirlik katmanları ve terraforming (belgeler/gezegen-gelisimi-ve-yerel-gorevler-v2.md bölüm 6), uzaydan gelen
// ırkların yapıları (bölüm 7) ve koloni kademeleri (bölüm 9). Saf JavaScript.
//
// Her terraforming katmanı iki girdi ister: yerel biyomlardan malzeme (burada teslim edilir) ve bir uzay görevinden
// gelen girdi (Vaka 1, 2, 5, 7; görevler Faz 4'te). İkisi de gelince katman tamamlanır ve etkisi başlar.
export const KATMANLAR = {
  atmosfer: {
    ad: 'Atmosfer ve gaz dengesi',
    baslangic: 'Asitli ve zehirli kükürt',
    teknoloji: 'Biyo-spor dönüştürme bacaları',
    yerel: { kseno_spor: 6, foton_recinesi: 3 },
    yerelAd: 'mantar ormanının fotonik sporları',
    uzay: { bayrak: 'vaka2_biyokapsul', ad: 'Vaka 2 biyo-kapsülü (Kadim Genom görevi)' },
    sonuc: 'Dışarıda maskesiz solunabilen, taze oksijenli atmosfer.',
  },
  hidroloji: {
    ad: 'Hidroloji ve temiz su',
    baslangic: 'Ağır metalli, asitli bataklıklar',
    teknoloji: 'Jeotermal damıtma ve kriyolit ayrıştırıcı',
    yerel: { kriyolit: 4, metan: 2 },
    yerelAd: 'donmuş kriyojenik menfezlerin kriyoliti',
    uzay: { bayrak: 'vaka7_aritici', ad: 'Vaka 7 arıtıcıları (Aethel-9 görevi)' },
    sonuc: 'Şehir şebekesine bağlı doğal tatlı su nehirleri ve barajlar.',
  },
  biyosfer: {
    ad: 'Biyosfer ve organik toprak',
    baslangic: 'İnert bazalt tozu ve cam',
    teknoloji: 'Kseno-enzim gübreleme ve sera hubları',
    yerel: { tohum: 3, kseno_spor: 2 },
    yerelAd: 'saklı kseno-vahanın tohumları',
    uzay: { bayrak: 'vaka5_besin', ad: 'Vaka 5 genetik besinleri (Deney 07 görevi)' },
    sonuc: 'Gezegen yüzeyinde yeşeren ormanlar ve tarım vadileri.',
  },
  manyetosfer: {
    ad: 'Manyetosfer ve kalkan',
    baslangic: 'Şiddetli güneş fırtınaları',
    teknoloji: 'Gezegen çapında iyonosfer ağı',
    yerel: { sivi_metal: 4, civa_tortusu: 2 },
    yerelAd: 'cıva şelalelerinin iletkenleri',
    uzay: { bayrak: 'vaka1_reaktor', ad: 'Vaka 1 Prometheus reaktörü (Prometheus görevi)' },
    sonuc: 'Uzay radyasyonunu saptıran yapay auroral manyetik kalkan.',
  },
};

export function terraform(d) {
  if (!d.koloni.terraform) d.koloni.terraform = {};
  return d.koloni.terraform;
}
export function katmanTamamMi(d, id) {
  const t = terraform(d)[id] || {};
  return !!(t.yerel && (t.uzay || d.bayrak[KATMANLAR[id].uzay.bayrak]));
}

export function terraformListesi(d) {
  const t = terraform(d);
  return Object.keys(KATMANLAR).map((id) => {
    const k = KATMANLAR[id];
    const s = t[id] || {};
    const uzay = !!d.bayrak[k.uzay.bayrak];
    let durum;
    if (s.yerel && uzay) durum = 'Tamamlandı: ' + k.sonuc;
    else if (s.yerel) durum = 'Yerel girdi teslim edildi. Bekleyen: ' + k.uzay.ad + '.';
    else durum = 'Başlangıç: ' + k.baslangic + '. Teknoloji: ' + k.teknoloji + '. Yerel girdi: ' + Object.keys(k.yerel).map((x) => k.yerel[x] + ' ' + x).join(', ') + ' (' + k.yerelAd + '). Uzay girdisi: ' + k.uzay.ad + '.';
    return { id, ad: k.ad, durum, teslim: !s.yerel };
  });
}

// Yerel girdiyi teslim eder (hammadde stoğundan)
export function yerelTeslim(d, id, adlar) {
  const k = KATMANLAR[id];
  const t = terraform(d);
  if ((t[id] || {}).yerel) return { metin: 'Bu katmanın yerel girdisi zaten teslim edildi.' };
  const kay = d.koloni.kaynaklar;
  const eksik = Object.keys(k.yerel).filter((x) => (kay[x] || 0) < k.yerel[x]);
  if (eksik.length) return { metin: 'Gerekli: ' + Object.keys(k.yerel).map((x) => k.yerel[x] + ' ' + (adlar ? adlar(x) : x) + ' (elinde ' + (kay[x] || 0) + ')').join(', ') + '.', ses: 'red' };
  for (const x of Object.keys(k.yerel)) kay[x] -= k.yerel[x];
  t[id] = { ...(t[id] || {}), yerel: true };
  d.kaptan.tecrube += 30;
  d.koloni.moral = Math.min(100, d.koloni.moral + 5);
  return { metin: k.teknoloji + ' kuruldu ve yerel girdiyle çalışmaya başladı. Tamamlanması için: ' + k.uzay.ad + '.', ses: 'kur' };
}

// Bölüm 7: uzaydan gelen ırkların yapıları. Hepsi bir uzay görevinin sonucuna bağlı (Faz 4).
export const IRK_YAPILARI = {
  akademi: { ad: 'Çoklu-Tür Bilim ve Felsefe Akademisi', islev: 'Prometheus mühendisleri, Denek 07\'nin boyut kuramcıları ve Kaelith kseno-biyologları birlikte çalışır; yeni teknolojiler ve gemi yükseltmeleri geliştirir.', bayraklar: ['vaka1_muhendis', 'vaka5_denek07'], maliyet: { bazalt: 30, titanyum: 20, kristal: 10, kseno: 4 } },
  kseno_habitat: { ad: 'Kseno-Habitat Yaşam Kubbeleri', islev: 'İnsan atmosferinde nefes alamayan ırklar için metan, silikon ve azot basınçlı modüler sığınaklar.', bayraklar: ['irk_temasi'], maliyet: { bazalt: 20, titanyum: 12, polimer: 6, metan: 3 } },
  multeci_kampusu: { ad: 'Yıldızlararası Mülteci Entegrasyon Kampüsü', islev: 'Aethel-9 savaşından ve Tarras Boğazı çatışmasından kaçan sivillerin barındığı ve iş gücüne katıldığı sosyal merkez.', bayraklar: ['vaka7_multeci'], maliyet: { bazalt: 40, titanyum: 15, polimer: 6, tohum: 2 } },
  tina_cekirdegi: { ad: 'Merkezi Nöral Veri Çekirdeği (Tina)', islev: 'Madenleri, fabrikaları ve kalkan jeneratörlerini tek bir armonik ritimle yöneten siber kovan.', bayraklar: ['vaka6_tina'], maliyet: { titanyum: 20, kristal: 15, sivi_metal: 4 } },
};

// Bölüm 9: kademe 4 (Galaktik Başkent) koşulları
export function seviye4Eksikleri(d, guvenliMi) {
  const eksik = [];
  const tum = Object.keys(KATMANLAR).filter((id) => !katmanTamamMi(d, id));
  if (tum.length) eksik.push('terraforming katmanları: ' + tum.map((id) => KATMANLAR[id].ad).join(', '));
  const bolgeler = ['sirtlar', 'dogu', 'lav', 'plato', 'civa', 'mantar'].filter((m) => !guvenliMi(d, m));
  if (bolgeler.length) eksik.push(bolgeler.length + ' bölgenin arındırılması');
  const yapilar = Object.keys(IRK_YAPILARI).filter((id) => !d.koloni.binalar.includes(id));
  if (yapilar.length) eksik.push('ırk yapıları: ' + yapilar.map((id) => IRK_YAPILARI[id].ad).join(', '));
  return eksik;
}
