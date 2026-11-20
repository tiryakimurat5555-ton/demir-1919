// Gezegenin gizemli noktaları (belgeler/gezegen-gelisimi-ve-yerel-gorevler-v2.md bölüm 4). Saf JavaScript.
//
//   4.1 Vanguard-01 enkazı: Gözcü Tepesi'nde telsizi eski bir mors sinyaline ayarla (frekans ayarı, amac 'mors') →
//       doğunun kuzeyindeki sarp kanyon açılır; fenerin dıt-dıt sesini izle. Ses günlükleri (kodeks) ve gezegenin ilk
//       topoğrafik haritası (bütün yüzey noktaları bilinir); fırın jeneratörü Demir Kervan'la dökümhaneye taşınır
//       (üretim ×1,25).
//   4.2 Kadim çanlar ve frekans tapınağı: üçüncü görevde (gorev3.js).
//   4.3 Fosil solucan tünelleri: mantar ormanının doğusundaki oyuğu Mammoth açar; fosil kseno-kabuklar araç zırhı
//       (araçta maruziyet ×0,7) ve delici uç (derin damarda çift verim) olur.
//   4.4 Manyetik tersinme monoliti: 30 metre içinde yön bildirimleri karışır, 6 metre içinde her şey susar; yüzeyinden
//       manyetik tohum kazınır → graviton dengeleyicisi.
//   4.5 Saklı kseno-vaha: sırtlarda kükürt kokusunun toprağa döndüğü kalsit aralığı. Maskesiz ilk alan: moral zirveye;
//       tohumlar sera hubunu açar (nüfus artışı ×1,5).
import { NOKTALAR } from './harita';

const b = (d) => d.bayrak;
const ad = (d, rol) => (d.murettebat[rol] ? d.murettebat[rol].ad : '');
const ilkAd = (d, rol) => ad(d, rol).split(' ')[0];

export const SAHNELER = {
  mors_bulundu: {
    baslik: 'Mors sinyali',
    efekt: ['sinyal'],
    metin: (d) => [
      'Parazitin içinden düzenli bir ritim çıkıyor: üç kısa, üç uzun, üç kısa. Eski model bir acil durum feneri; kayıtlarda böyle bir verici yok.',
      ilkAd(d, 1) + ': "Kaptan, yönü buldum: doğu sektörünün kuzeyinde, sisin içindeki bir kanyondan geliyor. Orada kimsenin bilmediği bir şey var."',
    ],
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
    bitisSozu: 'Doğudaki bataklığın kuzey ucunda sarp kanyonun ağzı açıldı. Mors sesini izle.',
  },
  vaha_bulundu: {
    baslik: 'Saklı vaha',
    ortam: 'ortam_vaha',
    efekt: ['sinyal'],
    metin: (d) => [
      'Kalsit duvarların içinde küçük bir dünya: buharla beslenen otlar, şırıldayan bir kaynak, ötüşen kuş benzeri canlılar. Gezegende ilk kez maskesiz nefes alıyorsun.',
      'Haber koloniye ulaşınca telsizde bir sevinç dalgası: insanlar burayı görmek istiyor. Koloninin morali zirvede.',
      ilkAd(d, 2) + ': "Bu otların tohumları açıkta yetişebilir, Kaptan. Bir sera hubu kurarsak koloni kendi ekmeğini yetiştirir."',
    ],
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
  },
};

// Noktalara eklenen keşif eylemleri
export function ekEylemler(d, id) {
  const g = b(d);
  const e = [];
  if (id === 'tepe' && g.telemetri && d.koloni.binalar.includes('sinyal_kulesi') && !g.morsBulundu)
    e.push({ id: 'k_mors', etiket: 'Eski bir sinyal ara', ipucu: 'Kulenin yakaladığı zayıf, ritmik bir yayın.' });
  return e;
}
export function noktaMi(id) {
  return id === 'vanguard_enkaz' || id === 'monolit';
}
export function noktaEylemleri(d, id) {
  const g = b(d);
  if (id === 'vanguard_enkaz') {
    const e = [];
    if (!g.vanguardGunluk) e.push({ id: 'k_gunluk', etiket: 'Ses günlüklerini dinle' });
    if (!g.firin) e.push({ id: 'k_firin', etiket: 'Fırın jeneratörünü sök', ipucu: 'Ağır yük: Demir Kervan gerekir.' });
    e.push({ id: 'incele', etiket: 'Enkazı incele' });
    return e;
  }
  if (id === 'monolit') {
    const e = [];
    if (!g.tohumKazildi) e.push({ id: 'k_kazi', etiket: 'Yüzeyinden kazı' });
    e.push({ id: 'k_dinle', etiket: 'Sessizliği dinle' });
    return e;
  }
  return [];
}
export function ekEylemMi(eylemId) {
  return eylemId.indexOf('k_') === 0;
}

export function eylemUygula(d, id, eylemId) {
  const g = b(d);
  if (eylemId === 'k_mors') return { ayar: true, amac: 'mors' };
  if (eylemId === 'k_gunluk') {
    g.vanguardGunluk = true;
    g.topografya = true;
    d.itibar += 10;
    d.kaptan.tecrube += 30;
    if (!d.kodeks.some((k) => k.id === 'vanguard_gunluk'))
      d.kodeks.push({ id: 'vanguard_gunluk', ad: 'Vanguard-01 ses günlükleri', tarif: 'Gezegene ilk inmeye çalışan öncülerin kayıtları: fırtınada son dakikalar, umut ve vedalar. Yanlarında gezegenin ilk topoğrafik haritası.', itibar: 10 });
    // Topoğrafik harita: yüzeyin bütün noktaları bilinir
    for (const n of Object.keys(NOKTALAR)) if (!d.kesif.includes(n)) d.kesif.push(n);
    return {
      metin:
        'Karadutunun hoparlöründen cızırtılı sesler: "Burası Vanguard-01... manyetik fırtına... iniş takımları gitti..." Son kayıtta bir kadın, gezegenin haritasını tamamladıklarını söylüyor. Haritayı kapsül bilgisayarına aktarıyorsun: bütün yüzey artık Yerler menüsünde.',
      ses: 'sinyal',
    };
  }
  if (eylemId === 'k_firin') {
    if (!(d.araclar || []).includes('demir_kervan')) return { metin: 'Askeri sınıf bir fırın jeneratörü; tek başına kaldırılamayacak kadar ağır. Taşımak için Demir Kervan gerekir.', ses: 'red' };
    g.firin = true;
    d.itibar += 5;
    return { metin: 'Kervanın vinciyle fırın jeneratörünü söküp dökümhaneye taşıyorsunuz. Mühendisler monte edince alaşım üretimi hızlanıyor: üretim yüzde yirmi beş daha hızlı.', ses: 'kapi' };
  }
  if (eylemId === 'k_kazi') {
    g.tohumKazildi = true;
    d.koloni.kaynaklar.manyetik_tohum = (d.koloni.kaynaklar.manyetik_tohum || 0) + 1;
    if (!d.kodeks.some((k) => k.id === 'monolit'))
      d.kodeks.push({ id: 'monolit', ad: 'Manyetik tersinme monoliti', tarif: 'Çevresinde manyetik kutupları durmadan yer değiştiren yabancı dikilitaş. Yüzeyindeki tohum materyali graviton dengeleyicisinin çekirdeği.', itibar: 8 });
    d.itibar += 8;
    return { metin: 'Kesicinin ucu taşa değince bir an bütün ses kesiliyor. Avucuna ağır, serin bir tozdan kabuk düşüyor: manyetik tohum materyali.', ses: 'topla' };
  }
  if (eylemId === 'k_dinle') return { metin: 'Mutlak, dingin bir sessizlik. Rüzgâr, sis, kristallerin çınlaması: hepsi kesilmiş. Yalnız kendi kalp atışın.' };
  if (id === 'vanguard_enkaz') return { metin: NOKTALAR[id].tarif + (g.firin ? ' Fırın jeneratörünün yeri boş.' : '') };
  return { metin: NOKTALAR[id] ? NOKTALAR[id].tarif : '' };
}

// Vahaya ilk giriş (harita.js vaha_yolu)
export function vahaBulundu(d) {
  const g = b(d);
  if (g.vahaBulundu) return false;
  g.vahaBulundu = true;
  d.koloni.moral = 100;
  d.itibar += 10;
  if (!d.kodeks.some((k) => k.id === 'vaha'))
    d.kodeks.push({ id: 'vaha', ad: 'Saklı jeotermal kseno-vaha', tarif: 'Kükürt fırtınalarının kalbinde, oksijence zengin kapalı bir mikro-vadi. Gezegendeki ilk maskesiz alan.', itibar: 10 });
  d.sahne = 'vaha_bulundu';
  return true;
}

// Monolitin etkisi: 'sessiz' (6 m), 'kaos' (30 m) ya da null
export function monolitEtkisi(d) {
  const n = NOKTALAR.monolit;
  if (d.mekan !== n.mekan) return null;
  const m = Math.hypot(d.oyuncu.x - n.x, d.oyuncu.y - n.y);
  if (m < 6) return 'sessiz';
  if (m < 30) return 'kaos';
  return null;
}
