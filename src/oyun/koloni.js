// Koloni simülasyonu (belgeler/gelistirici-entegrasyon-rehberi Faz 2 "hammadde üretim döngüsü", savas-yetenek-ve-
// murettebat-mekanikleri.md bölüm 5 "nüfus artışı ve iş gücü", 5.2 "koloni morali"). Saf JavaScript.
//
//   koloniIlerle(d, dt) → olaylar: zaman geçtikçe
//     - kaynak yatakları yenilenir (maden ocakları; sanayi iş gücü hızlandırır),
//     - sondaj bacaları koloniye boru hattıyla ağır izotop pompalar,
//     - tesislerdeki üretim kuyruğu ilerler (sanayi iş gücü ve moral hızlandırır),
//     - tersanedeki kaynak işi ilerler (tersane mühendisleri hızlandırır; gemi.js montajIlerle),
//     - barınma yetiyorsa ve moral iyiyse nüfus doğal yoldan artar; barınma aşılırsa moral düşer.
//   İş gücü: nüfus üç sektöre paylaştırılır (sanayi, tersane, bilim); kalanı boşta.
import { NOKTALAR } from './yuzey/harita';
import { HAMMADDELER } from './veri/tesisler';
import { PARCALAR, TARIFLER } from './veri/uretim';
import { montajIlerle } from './gemi/gemi';

export const YENILENME_SN = 120; // bir yatağa bir birim dönmesi (sanayi 0'da)
export const BORU_SN = 150; // dengelenmiş bacalardan bir izotop
export const BORU_TAVAN = 20;
export const NUFUS_SN = 300; // doğal artış: bir kişi
export const KERVAN_SN = 180; // Demir Kervan: bir bazalt + bir titanyum
export const AKREP_SN = 120; // Akrep: yataklardan bir birim
export const SEKTORLER = {
  sanayi: { ad: 'Sanayi ve maden', tarif: 'Maden ocaklarında ve dökümhanede çalışır; üretimi ve yatakların yenilenmesini hızlandırır.' },
  tersane: { ad: 'Tersane mühendisleri', tarif: 'Kızakta çalışır; gemi montajındaki kaynak süresini kısaltır.' },
  bilim: { ad: 'Akademik ve teori personeli', tarif: 'Kadim verileri çözer; kaptanın kazandığı tecrübeyi artırır.' },
};

function nufus(d) {
  const n = d.koloni.nufus;
  for (const k of ['sanayi', 'tersane', 'bilim']) if (n[k] == null) n[k] = 0;
  const atanan = n.sanayi + n.tersane + n.bilim;
  if (n.toplam < atanan) n.toplam = atanan; // eski kayıtlar: tesislerle gelen işçiler nüfusa eklenir
  return n;
}

export function bosta(d) {
  const n = nufus(d);
  return n.toplam - n.sanayi - n.tersane - n.bilim;
}

export function isGucuDegis(d, sektor, fark) {
  const n = nufus(d);
  if (fark > 0 && bosta(d) < fark) return { metin: 'Boşta kimse yok. Nüfus arttıkça yeni işçiler gelir.', olmadi: true };
  if (fark < 0 && n[sektor] + fark < 0) return { metin: SEKTORLER[sektor].ad + ' sektöründe kimse yok.', olmadi: true };
  n[sektor] += fark;
  return { metin: SEKTORLER[sektor].ad + ': ' + n[sektor] + ' kişi. Boşta ' + bosta(d) + '.' };
}

export function moralCarpani(d) {
  const m = d.koloni.moral;
  if (m >= 75) return 1.2; // canlı şehir: üretim yüzde 20 hızlı
  if (m < 30) return 0.8;
  return 1;
}

export function uretimHizi(d) {
  // Jeotermal santral (lav koridorlarının enerjisi) ve Vanguard-01'in fırın jeneratörü üretimi hızlandırır
  const enerji = (d.koloni.binalar.includes('jeotermal_santral') ? 1.2 : 1) * (d.bayrak.firin ? 1.25 : 1);
  return (1 + 0.25 * nufus(d).sanayi) * moralCarpani(d) * enerji;
}
// İlaç dağıtımı: 10 doz yatıştırıcı → moral +5
export function ilacDagit(d) {
  const p = d.koloni.parcalar || {};
  if ((p.yatistirici || 0) < 10) return { metin: '10 doz sakinleştirici gerekir; elinde ' + (p.yatistirici || 0) + '. Biyo-kubbede kseno-sporlardan yapılır.', olmadi: true };
  p.yatistirici -= 10;
  d.koloni.moral = Math.min(100, d.koloni.moral + 5);
  return { metin: 'Revirden koloniye ilaç dağıtıldı. Moral yüzde ' + d.koloni.moral + '.' };
}

export function tecrubeCarpani(d) {
  return 1 + 0.1 * nufus(d).bilim;
}

// Moral nabzı: koloniye dönüşte dinleme kulesinden duyulan uğultu
export function moralSesi(d) {
  const m = d.koloni.moral;
  if (m >= 60) return 'moral_yuksek';
  if (m < 35) return 'moral_dusuk';
  return null;
}
export function moralMetni(d) {
  const m = d.koloni.moral;
  if (m >= 75) return 'Koloni canlı: pazar yerinden kahkahalar, dökümhaneden ıslıklar. Üretim yüzde yirmi hızlı.';
  if (m >= 60) return 'Koloni neşeli; kalabalığın uğultusu sıcak.';
  if (m >= 35) return 'Koloni sakin; herkes işinde.';
  return 'Koloni huzursuz: siren sesleri, kırılan camlar. Üretim yavaşladı; yerel sorunlara el atmalısın.';
}

// --- Stok: hammadde ve parçalar ---
export function miktar(d, ad) {
  if (HAMMADDELER[ad]) return d.koloni.kaynaklar[ad] || 0;
  return (d.koloni.parcalar || {})[ad] || 0;
}
function ekle(d, ad, n) {
  if (ad === 'moral') {
    d.koloni.moral = Math.min(100, d.koloni.moral + n);
    return;
  }
  if (ad.indexOf('esya_') === 0) {
    const e = ad.slice(5);
    if (!d.envanter.includes(e)) d.envanter.push(e);
    return;
  }
  if (ad.indexOf('arac_') === 0) {
    // Araç: hangara girer
    if (!d.araclar) d.araclar = [];
    const id = ad.slice(5);
    if (!d.araclar.includes(id)) d.araclar.push(id);
    return;
  }
  if (HAMMADDELER[ad]) d.koloni.kaynaklar[ad] = (d.koloni.kaynaklar[ad] || 0) + n;
  else {
    if (!d.koloni.parcalar) d.koloni.parcalar = {};
    d.koloni.parcalar[ad] = (d.koloni.parcalar[ad] || 0) + n;
  }
}
export function harca(d, girdi) {
  for (const k of Object.keys(girdi)) ekle(d, k, -girdi[k]);
}
export function yeterMi(d, girdi) {
  return Object.keys(girdi).every((k) => miktar(d, k) >= girdi[k]);
}
export function adMetni(ad) {
  return HAMMADDELER[ad] ? HAMMADDELER[ad].ad : PARCALAR[ad] ? PARCALAR[ad].ad : ad;
}
export function girdiMetni(girdi) {
  return Object.keys(girdi)
    .map((k) => girdi[k] + ' ' + adMetni(k))
    .join(', ');
}
export function parcaMetni(d) {
  const p = d.koloni.parcalar || {};
  const v = Object.keys(p).filter((k) => p[k] > 0);
  return v.length ? v.map((k) => p[k] + ' ' + adMetni(k)).join(', ') : 'yok';
}

// --- Üretim ---
export function uretimListesi(d) {
  const liste = [];
  for (const tesis of Object.keys(TARIFLER)) {
    if (!d.koloni.binalar.includes(tesis)) continue;
    const is = (d.koloni.uretimler || []).find((u) => u.tesis === tesis);
    for (const t of TARIFLER[tesis]) {
      let durum;
      if (is && is.tarif === t.id) durum = 'Üretiliyor, yaklaşık ' + Math.ceil(is.kalan) + ' saniye kaldı.';
      else if (is) durum = 'Tesis meşgul.';
      else if (yeterMi(d, t.girdi)) durum = 'Üretilebilir. Girdi: ' + girdiMetni(t.girdi) + '.';
      else durum = 'Girdi: ' + girdiMetni(t.girdi) + '. Elinde: ' + Object.keys(t.girdi).map((k) => miktar(d, k) + ' ' + adMetni(k)).join(', ') + '.';
      liste.push({ tesis, id: t.id, ad: t.ad, durum, yapilabilir: !is && yeterMi(d, t.girdi), surer: !!(is && is.tarif === t.id) });
    }
  }
  return liste;
}

export function uretimBaslat(d, tesis, tarifId) {
  const t = (TARIFLER[tesis] || []).find((x) => x.id === tarifId);
  if (!t || !d.koloni.binalar.includes(tesis)) return { metin: 'Bu tesis kurulu değil.', ses: 'red' };
  if (!d.koloni.uretimler) d.koloni.uretimler = [];
  if (d.koloni.uretimler.some((u) => u.tesis === tesis)) return { metin: 'Bu tesis şu an başka bir iş yapıyor.', ses: 'red' };
  if (!yeterMi(d, t.girdi)) return { metin: 'Girdi yetmiyor: ' + girdiMetni(t.girdi) + '.', ses: 'red' };
  harca(d, t.girdi);
  const kalan = t.sure / uretimHizi(d);
  d.koloni.uretimler.push({ tesis, tarif: t.id, kalan });
  return { metin: t.ad + ': iş başladı. Yaklaşık ' + Math.ceil(kalan) + ' saniye.', ses: 'dugme' };
}

// --- Zamanla ilerleme ---
export function koloniIlerle(d, dt) {
  const olaylar = [];
  const k = d.koloni;
  const n = nufus(d);
  // Yatakların yenilenmesi
  if (!d.yenilenme) d.yenilenme = {};
  const yenilenmeSuresi = YENILENME_SN / (1 + 0.15 * n.sanayi);
  for (const id of Object.keys(NOKTALAR)) {
    const nk = NOKTALAR[id];
    if (!nk.kaynak) continue;
    if ((d.stok[id] || 0) >= nk.stok) {
      d.yenilenme[id] = 0;
      continue;
    }
    d.yenilenme[id] = (d.yenilenme[id] || 0) + dt;
    if (d.yenilenme[id] >= yenilenmeSuresi) {
      d.yenilenme[id] -= yenilenmeSuresi;
      d.stok[id] = (d.stok[id] || 0) + 1;
    }
  }
  // İzotop boru hattı (dengelenmiş bacalar)
  if (d.bayrak.sondaj && (k.kaynaklar.izotop || 0) < BORU_TAVAN) {
    k.boru = (k.boru || 0) + dt;
    if (k.boru >= BORU_SN) {
      k.boru -= BORU_SN;
      k.kaynaklar.izotop = (k.kaynaklar.izotop || 0) + 1;
    }
  }
  // Demir Kervan: ocaklardan dökümhaneye düzenli cevher (sanayide en az bir kişi gerekir)
  if ((d.araclar || []).includes('demir_kervan') && n.sanayi > 0) {
    k.kervan = (k.kervan || 0) + dt;
    if (k.kervan >= KERVAN_SN) {
      k.kervan -= KERVAN_SN;
      k.kaynaklar.bazalt = (k.kaynaklar.bazalt || 0) + 1;
      k.kaynaklar.titanyum = (k.kaynaklar.titanyum || 0) + 1;
    }
  }
  // Akrep: yataklardan sırayla bir birim toplar (derin damarlar hariç)
  if ((d.araclar || []).includes('akrep')) {
    k.akrep = (k.akrep || 0) + dt;
    if (k.akrep >= AKREP_SN) {
      k.akrep -= AKREP_SN;
      const ids = Object.keys(NOKTALAR).filter((id) => NOKTALAR[id].kaynak && !NOKTALAR[id].gerekArac && (d.stok[id] || 0) > 0);
      if (ids.length) {
        const id = ids[(k.akrepSira = ((k.akrepSira || 0) + 1) % ids.length)];
        d.stok[id] -= 1;
        k.kaynaklar[NOKTALAR[id].kaynak] = (k.kaynaklar[NOKTALAR[id].kaynak] || 0) + 1;
      }
    }
  }
  // Üretim kuyruğu
  if (k.uretimler && k.uretimler.length) {
    for (const u of k.uretimler) u.kalan -= dt; // hız iş başlarken süreye işlendi
    const biten = k.uretimler.filter((u) => u.kalan <= 0);
    k.uretimler = k.uretimler.filter((u) => u.kalan > 0);
    for (const u of biten) {
      const t = TARIFLER[u.tesis].find((x) => x.id === u.tarif);
      for (const c of Object.keys(t.cikti)) ekle(d, c, t.cikti[c]);
      olaylar.push({ tur: 'uretim', metin: 'Üretim tamam: ' + girdiMetni(t.cikti) + '.' });
    }
  }
  // Tersane kaynak işi
  olaylar.push(...montajIlerle(d, dt, 1 + 0.5 * n.tersane));
  // Nüfus ve moral
  if (n.toplam < n.barinma) {
    const carpan = (d.koloni.binalar.includes('biyo_kubbe') ? 1.5 : 1) * (k.moral >= 50 ? 1 : 0.3);
    k.buyume = (k.buyume || 0) + dt * carpan;
    if (k.buyume >= NUFUS_SN) {
      k.buyume -= NUFUS_SN;
      n.toplam += 1;
      olaylar.push({ tur: 'nufus', metin: 'Kolonide yeni bir kişi var. Nüfus ' + n.toplam + '; boşta ' + bosta(d) + '.' });
    }
  } else if (n.toplam > n.barinma) {
    k.kalabalik = (k.kalabalik || 0) + dt;
    if (k.kalabalik >= 60) {
      k.kalabalik = 0;
      k.moral = Math.max(0, k.moral - 1);
    }
  }
  return olaylar;
}
