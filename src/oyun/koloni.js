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
import { rolCarpani } from './binalar';
import { misafir } from './tonoflenya/kisiler';
import { NOKTALAR } from './yuzey/harita';
import { yildizCarpani, mevsimCarpani, etkiCarpani, etkiVar } from './zaman';
import * as SB from './tonoflenya/subay';
import { HAMMADDELER } from './veri/tesisler';
import { PARCALAR, TARIFLER } from './veri/uretim';
import { montajIlerle } from './gemi/gemi';
import { UZMANLIKLAR, uretec, uyeUret } from './veri/murettebat';
import { ARINDIRMA, BOLGE_DETAY, guvenliMi } from './yuzey/arindirma';
import { KATMANLAR, katmanTamamMi, seviye4Eksikleri } from './terraform';

export const YENILENME_SN = 120; // bir yatağa bir birim dönmesi (sanayi 0'da)
export const BORU_SN = 150; // dengelenmiş bacalardan bir izotop
export const BORU_TAVAN = 20;
export const NUFUS_SN = 300; // doğal artış: bir kişi
export const KERVAN_SN = 180; // Demir Kervan: bir bazalt + bir titanyum
export const AKREP_SN = 120; // Akrep: yataklardan bir birim
export const TICARET_SN = 180;
export const FIRTINA_SN = 600;
export const BESIN_SN = 240;
export const KARAKOL_SN = 180; // güvenli bölgenin ikmal karakolu: bölgenin yataklarından bir birim
export const SEKTORLER = {
  sanayi: { ad: 'Sanayi ve maden', tarif: 'Maden ocaklarında ve dökümhanede çalışır; üretimi ve yatakların yenilenmesini hızlandırır.' },
  tersane: { ad: 'Tersane mühendisleri', tarif: 'Kızakta çalışır; gemi montajındaki kaynak süresini kısaltır.' },
  bilim: { ad: 'Akademik ve teori personeli', tarif: 'Kadim verileri çözer; kaptanın kazandığı tecrübeyi artırır.' },
};

function nufus(d) {
  const n = d.koloni.nufus;
  for (const k of ['sanayi', 'tersane', 'bilim', 'tarim']) if (n[k] == null) n[k] = 0;
  const atanan = n.sanayi + n.tersane + n.bilim + n.tarim; // tarim: seralara atanan kolonistler (tarim/tarim.js)
  if (n.toplam < atanan) n.toplam = atanan; // eski kayıtlar: tesislerle gelen işçiler nüfusa eklenir
  return n;
}

export function bosta(d) {
  const n = nufus(d);
  return n.toplam - n.sanayi - n.tersane - n.bilim - n.tarim;
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
  const enerji = (d.koloni.binalar.includes('jeotermal_santral') ? 1.2 : 1) * (d.bayrak.firin ? 1.25 : 1) * (d.bayrak.g_fuzyon ? 1.15 : 1) * (d.bayrak.g_oron ? 1.2 : 1) * (d.bayrak.f_fuzyon ? 1.1 : 1) * (d.bayrak.f_fotosentez ? 1.1 : 1); // G-11 füzyon teorisi, G-16 Oron bilgini
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
  if (ad.indexOf('bayrak_') === 0) {
    d.bayrak[ad.slice(7)] = true;
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
// Piezo kristali silikat kristaliyle aynı sensör ve rezonans grubunda: kristal yetmezse eksik piezodan düşer (v4 25 bina 4.2)
export function harca(d, girdi) {
  for (const k of Object.keys(girdi)) {
    if (k === 'kristal' && miktar(d, 'kristal') < girdi[k]) {
      const eksik = girdi[k] - miktar(d, 'kristal');
      ekle(d, 'kristal', -miktar(d, 'kristal'));
      ekle(d, 'piezo', -eksik);
    } else ekle(d, k, -girdi[k]);
  }
}
export function yeterMi(d, girdi) {
  return Object.keys(girdi).every((k) => miktar(d, k) + (k === 'kristal' ? miktar(d, 'piezo') : 0) >= girdi[k]);
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
      if (t.bayrak && !d.bayrak[t.bayrak]) continue;
      let durum;
      if (is && is.tarif === t.id) durum = 'Üretiliyor, yaklaşık ' + Math.ceil(is.kalan) + ' saniye kaldı.';
      else if (is) durum = 'Tesis meşgul.';
      else if (yeterMi(d, t.girdi)) durum = 'Üretilebilir. Girdi: ' + girdiMetni(t.girdi) + '.';
      else durum = 'Girdi: ' + girdiMetni(t.girdi) + '. Elinde: ' + Object.keys(t.girdi).map((k) => miktar(d, k) + ' ' + adMetni(k)).join(', ') + '.';
      liste.push({ tesis, id: t.id, ad: t.ad, cikti: t.cikti, durum, yapilabilir: !is && yeterMi(d, t.girdi), surer: !!(is && is.tarif === t.id) });
    }
  }
  return liste;
}

// Karakter ağı ve Kaelith (v4): Oronte kolonideyken araç üretimi yarı fiyat; Torvok dökümhanede metal ergitmeyi ucuzlatır
export function koloniGirdisi(d, tesis, t) {
  const g = { ...t.girdi };
  let c = 1;
  if (tesis === 'arac_hangari' && misafir(d, 'oronte')) c *= 0.5;
  if (tesis === 'dokumhane' && d.komuta && d.komuta.torvok) c *= 1 - d.komuta.torvok;
  if (tesis === 'dokumhane' && d.bayrak.gz_brom) c *= 0.9; // Ferros-Omega'dan usta Brom
  // Varek Ocak ve Çekiç Bayramı (v5 3A): üç gün dökümhane ve tersane maliyetleri yüzde on beş az
  if ((tesis === 'dokumhane' || tesis === 'tersane') && etkiVar(d, 'dokumIndirim')) c *= 0.85;
  // Forges'in Çelik Damar testi: zırh ve gemi gövdesi malzemesi (plaka, zırhlı plaka, gövde zırhı) yüzde on ucuz
  if (d.bayrak.ak_forges && tesis === 'dokumhane' && t.cikti && Object.keys(t.cikti).some((k) => /plaka|govde|alasim/.test(k))) for (const k of Object.keys(g)) g[k] = Math.max(1, Math.ceil(g[k] * 0.9));
  if (c < 1) for (const k of Object.keys(g)) if (['titanyum', 'bazalt', 'sasi_celigi', 'agir_metal', 'kizilkaya_titanyumu', 'oksit_celik'].includes(k) || tesis === 'arac_hangari') g[k] = Math.max(1, Math.ceil(g[k] * c));
  return g;
}
export function uretimBaslat(d, tesis, tarifId) {
  const t = (TARIFLER[tesis] || []).find((x) => x.id === tarifId);
  if (!t || !d.koloni.binalar.includes(tesis)) return { metin: 'Bu tesis kurulu değil.', ses: 'red' };
  if (t.bayrak && !d.bayrak[t.bayrak]) return { metin: 'Bu üretimin şeması henüz yok; bir uzay görevinden gelir.', ses: 'red' };
  if (!d.koloni.uretimler) d.koloni.uretimler = [];
  if (d.koloni.uretimler.some((u) => u.tesis === tesis)) return { metin: 'Bu tesis şu an başka bir iş yapıyor.', ses: 'red' };
  const girdi = koloniGirdisi(d, tesis, t);
  if (!yeterMi(d, girdi)) return { metin: 'Girdi yetmiyor: ' + girdiMetni(girdi) + '.', ses: 'red' };
  harca(d, girdi);
  // Vaelin topluluğu tokken metandan gaz yakıtı yüzde elli hızlı (tarim-ve-kseno-botanik bölüm 6)
  const kalan = t.sure / uretimHizi(d) / yildizCarpani(d, 'uretim') / (t.girdi.metan && d.tarim && d.tarim.besli.vaelin ? 1.5 : 1) / rolCarpani(d, tesis) / (tesis === 'dokumhane' ? mevsimCarpani(d, 'dokum') : 1) / (d.bayrak.yk_tina_10 ? 1.1 : 1) / etkiCarpani(d, 'uretim'); // evrensel bina rolü: topluluk ve nöbet
  d.koloni.uretimler.push({ tesis, tarif: t.id, kalan });
  return { metin: t.ad + ': iş başladı. Yaklaşık ' + Math.ceil(kalan) + ' saniye.', ses: 'dugme' };
}

// --- Zamanla ilerleme ---
// Yedek filo boşta yatmaz: destek yuvasındaki dışındaki gemiler yakın sistemlerden maden ve hurda taşır
// (gemiler-araclar-ve-filo-sistemi.txt bölüm 1). Sınıf başına: titanyum ve bazalt, Sınıf III ve üstü kristal de.
export const FILO_SN = 300;
export function filoGorevi(d, dt) {
  const f = d.filo || [];
  if (!f.length) return null;
  d.filoSayac = (d.filoSayac || 0) + dt;
  if (d.filoSayac < FILO_SN) return null;
  d.filoSayac -= FILO_SN;
  const k = d.koloni.kaynaklar;
  let say = 0;
  f.forEach((g, i) => {
    if (i === (d.destekNo || 0) && f.length > 1) return; // destek gemisi savaşa hazır bekler
    const sn = g.sinif || 1;
    k.titanyum = (k.titanyum || 0) + sn;
    k.bazalt = (k.bazalt || 0) + sn;
    if (sn >= 3) k.kristal = (k.kristal || 0) + 1;
    say++;
  });
  return say;
}

export function koloniIlerle(d, dt) {
  const olaylar = [];
  const k = d.koloni;
  const n = nufus(d);
  filoGorevi(d, dt);
  // Yatakların yenilenmesi
  if (!d.yenilenme) d.yenilenme = {};
  // Aethel-9 madenci aileleri tokken grev olmaz, ocaklar daha hızlı (tarim-ve-kseno-botanik bölüm 6)
  const yenilenmeSuresi = YENILENME_SN / (1 + 0.15 * n.sanayi) / (d.tarim && d.tarim.besli.aethel9 ? 1.25 : 1);
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
    const akrepSn = AKREP_SN / (d.bayrak.gz_tamir ? 1.5 : 1); // Automata-Enkaz otonom dron zekâsı
    if (k.akrep >= akrepSn) {
      k.akrep -= akrepSn;
      const ids = Object.keys(NOKTALAR).filter((id) => NOKTALAR[id].kaynak && !NOKTALAR[id].gerekArac && (d.stok[id] || 0) > 0);
      if (ids.length) {
        const id = ids[(k.akrepSira = ((k.akrepSira || 0) + 1) % ids.length)];
        d.stok[id] -= 1;
        k.kaynaklar[NOKTALAR[id].kaynak] = (k.kaynaklar[NOKTALAR[id].kaynak] || 0) + 1;
      }
    }
  }
  // İkmal karakolları (arındırılmış bölgeler)
  const guvenli = Object.keys(ARINDIRMA).filter((m) => guvenliMi(d, m));
  if (guvenli.length) {
    k.karakol = (k.karakol || 0) + dt;
    if (k.karakol >= KARAKOL_SN) {
      k.karakol -= KARAKOL_SN;
      for (const m of guvenli) {
        const id = Object.keys(NOKTALAR).find((x) => NOKTALAR[x].mekan === m && NOKTALAR[x].kaynak && (d.stok[x] || 0) > 0);
        if (!id) continue;
        d.stok[id] -= 1;
        k.kaynaklar[NOKTALAR[id].kaynak] = (k.kaynaklar[NOKTALAR[id].kaynak] || 0) + 1;
      }
      // Dokuz bölgenin karakol kazancı (v4 koloni-yerel-operasyonlar bölüm 2)
      for (const m of guvenli) {
        const det = BOLGE_DETAY[m];
        if (!det) continue;
        for (const r of Object.keys(det.kazanc)) {
          if (PARCALAR[r]) d.koloni.parcalar[r] = (d.koloni.parcalar[r] || 0) + det.kazanc[r];
          else k.kaynaklar[r] = (k.kaynaklar[r] || 0) + det.kazanc[r];
        }
      }
    }
  }
  // Güvenli ticaret rotası (G-06, G-22, G-24): üç dakikada bir tüccarlar kristal ve titanyum getirir
  if (d.bayrak.g_ticaret) {
    k.ticaret = (k.ticaret || 0) + dt;
    if (k.ticaret >= TICARET_SN) {
      k.ticaret -= TICARET_SN;
      const kat = d.bayrak.g_tarafsiz ? 2 : 1;
      k.kaynaklar.kristal = (k.kaynaklar.kristal || 0) + kat;
      k.kaynaklar.titanyum = (k.kaynaklar.titanyum || 0) + kat;
    }
  }
  // Terraforming katmanları tamamlanınca etkileri bir kez başlar (terraform.js)
  if (!k.terraformEtki) k.terraformEtki = {};
  for (const id of Object.keys(KATMANLAR)) {
    if (k.terraformEtki[id] || !katmanTamamMi(d, id)) continue;
    k.terraformEtki[id] = true;
    k.moral = Math.min(100, k.moral + 10);
    d.itibar += 15;
    if (id === 'hidroloji') k.nufus.barinma += 20;
    if (id === 'manyetosfer') k.kalkan = Math.max(k.kalkan || 1, 3);
    olaylar.push({ tur: 'terraform', id, metin: 'Terraforming: ' + KATMANLAR[id].ad + ' tamamlandı. ' + KATMANLAR[id].sonuc });
  }
  // Moralin düşme nedenleri (savas-yetenek 5.2): radyasyon fırtınaları (kalkan jeneratörü yoksa) ve yetersiz besin
  k.firtina = (k.firtina || 0) + dt;
  if (k.firtina >= FIRTINA_SN) {
    k.firtina = 0;
    if ((k.kalkan || 1) < 2 && n.toplam >= 8) {
      SB.moralKaybi(d, 5);
      olaylar.push({ tur: 'moral', metin: 'Radyasyon fırtınası koloniyi dövdü; insanlar sığınaklarda. Moral düştü. Bir kalkan jeneratörü bunu önler.' });
    }
  }
  if (n.toplam > 20 && !k.binalar.includes('sera') && !(d.tarim && d.tarim.besli.insan)) {
    k.besin = (k.besin || 0) + dt;
    if (k.besin >= BESIN_SN) {
      k.besin = 0;
      SB.moralKaybi(d, 2);
      olaylar.push({ tur: 'moral', metin: 'Yirmiden fazla insana sentetik gıda yetmiyor; moral düşüyor. Bir sera hubu gerek.' });
    }
  }
  // Kademe 4: Galaktik Başkent
  if (k.seviye === 3 && !seviye4Eksikleri(d, guvenliMi).length) {
    k.seviye = 4;
    d.itibar += 50;
    olaylar.push({ tur: 'kademe', metin: 'Koloni Galaktik Başkent oldu: bütün gezegen ve yörünge istasyonları açık.' });
  }
  // Üretim kuyruğu
  if (k.uretimler && k.uretimler.length) {
    // v5 (00 1.4): Kaptanın Kamarası'nda uyurken üretim ve inşaat kendi gerçek zamanlayıcısında kalır (ilerlemez)
    if (!d.uykuda) for (const u of k.uretimler) u.kalan -= dt; // hız iş başlarken süreye işlendi
    const biten = k.uretimler.filter((u) => u.kalan <= 0);
    k.uretimler = k.uretimler.filter((u) => u.kalan > 0);
    for (const u of biten) {
      const t = TARIFLER[u.tesis].find((x) => x.id === u.tarif);
      for (const c of Object.keys(t.cikti)) ekle(d, c, t.cikti[c]);
      olaylar.push({ tur: 'uretim', metin: 'Üretim tamam: ' + girdiMetni(t.cikti) + '.' });
    }
  }
  // Tersane kaynak işi
  if (!d.uykuda) olaylar.push(...montajIlerle(d, dt, 1 + 0.5 * n.tersane));
  // Nüfus ve moral
  if (n.toplam < n.barinma) {
    const carpan = (d.koloni.binalar.includes('biyo_kubbe') ? 1.5 : 1) * (d.koloni.binalar.includes('sera') ? 1.5 : 1) * (katmanTamamMi(d, 'biyosfer') ? 1.5 : 1) * (d.bayrak.g_tarim ? 1.2 : 1) * (d.bayrak.p_tarim ? 1.3 : 1) * (d.koloni.binalar.includes('hastane') ? 1.2 : 1) * (k.moral >= 50 ? 1 : 0.3) * yildizCarpani(d, 'nufus') * (SB.kabiliyet(d, 'axira', 4) ? 1.2 : 1);
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

// Tersanede yeni subay istihdamı (savas-yetenek bölüm 7): boştaki bir kolonist gemi mürettebatına katılır
export function subayIstihdam(d, uzmanlik) {
  if (bosta(d) < 1) return { metin: 'Boşta kolonist yok; önce iş gücünden birini al ya da nüfusun büyümesini bekle.', ses: 'red' };
  if (d.murettebat.length >= 12) return { metin: 'Mürettebat on iki kişiyle dolu.', ses: 'red' };
  const r = uretec((d.tohum || 1) * 101 + d.murettebat.length * 17);
  const u = uyeUret(r, uzmanlik, d.murettebat.map((x) => x.ad));
  d.murettebat.push(u);
  d.koloni.nufus.toplam -= 1; // kolonist gemiye geçti
  return { metin: u.rol + ' ' + u.ad + ' mürettebata katıldı. Nitelik: ' + NITELIK_ADI(u.nitelik) + '. Gemide bir odaya ata.', ses: 'kur' };
}
import { NITELIKLER } from './veri/murettebat';
const NITELIK_ADI = (k) => (NITELIKLER[k] ? NITELIKLER[k].ad : k);
export { UZMANLIKLAR };
