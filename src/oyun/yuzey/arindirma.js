// Güvensiz bölgeleri arındırma ve ehlileştirme protokolü (belgeler/gezegen-gelisimi-ve-yerel-gorevler-v2.md bölüm 5).
// Saf JavaScript.
//
// Her tehlikeli bölgenin bir karakol yeri vardır. Dört adım sırayla:
//   1. Öncü keşif ve akustik profil: bölgedeki bütün noktalar radarla bulunmuş olmalı.
//   2. Tehdit izolasyonu: saldırgan fauna sonik kovucuyla uzaklaştırılır, sızıntılar dondurucu köpükle kapatılır,
//      statik arklar topraklama çubuklarıyla söndürülür.
//   3. Stabilizasyon: fay hatlarına sismik dengeleyiciler, gaz ve fırtına hatlarına nötralizasyon kuleleri.
//   4. İleri karakol ve lojistik yolu: otomatik ikmal karakolu kurulur; bölge güvenli olur.
// Güvenli bölgede tehlike kalkar (maruziyet, statik, magma, hamle, yarasa) ve karakol üç dakikada bir bölgenin
// yataklarından koloniye bir birim taşır (koloni.js lojistik).
import { NOKTALAR } from './harita';
import { PARCALAR } from '../veri/uretim';
import { ZAFER_KANCALARI } from '../kancalar';

const ADIM_ADLARI = ['Öncü keşif ve akustik profil', 'Tehdit izolasyonu', 'Stabilizasyon', 'İleri karakol ve lojistik yolu'];

export const ARINDIRMA = {
  sirtlar: { ad: 'Manyetik Sırtlar', tehdit: 'asidik kükürt dumanları ve kontrolsüz gaz sızıntıları', izolasyon: { ad: 'Sızıntıları dondurucu köpükle kapat', gerek: { dondurucu_kopuk: 2 } }, stabilizasyon: { ad: 'Gaz nötralizasyon kulesi dik', gerek: { notralizasyon_kulesi: 1 } }, etki: 'Kükürt maruziyeti kalktı.' },
  dogu: { ad: 'Kristal bataklıkları', tehdit: 'zemin statik boşalmaları ve çıplak arklar', izolasyon: { ad: 'Topraklama çubuklarını çak', gerek: { topraklama_cubugu: 3 } }, stabilizasyon: { ad: 'Sismik dengeleyiciyi kur', gerek: { sismik_dengeleyici: 1 } }, etki: 'Statik boşalmalar sustu.' },
  lav: { ad: 'Lav koridorları', tehdit: 'magma fışkırmaları ve plazma sızıntıları', izolasyon: { ad: 'Menfezleri dondurucu köpükle kapat', gerek: { dondurucu_kopuk: 3 } }, stabilizasyon: { ad: 'Fay hattına sismik dengeleyiciler çak', gerek: { sismik_dengeleyici: 2 } }, etki: 'Magma kabarmaları durdu, gaz kalktı.' },
  plato: { ad: 'Uğultulu Plato', tehdit: 'fırtına hamleleri ve iyonosferik statik', izolasyon: { ad: 'Topraklama çubuklarını çak', gerek: { topraklama_cubugu: 2 } }, stabilizasyon: { ad: 'Fırtına hattına nötralizasyon kulesi dik', gerek: { notralizasyon_kulesi: 1 } }, etki: 'Hamleler artık kimseyi savurmuyor.' },
  civa: { ad: 'Cıva şelaleleri', tehdit: 'zehirli cıva buharı', izolasyon: { ad: 'Buhar ceplerini dondurucu köpükle kapat', gerek: { dondurucu_kopuk: 1 } }, stabilizasyon: { ad: 'Nötralizasyon kulesi dik', gerek: { notralizasyon_kulesi: 1 } }, etki: 'Cıva buharı süzülüyor; maruziyet kalktı.' },
  mantar: { ad: 'Mantar ormanı', tehdit: 'saldırgan kör yarasa sürüleri', izolasyon: { ad: 'Sonik kovucuları kur', gerek: { sonik_kovucu: 2 } }, stabilizasyon: { ad: 'Tavana sismik dengeleyici çak', gerek: { sismik_dengeleyici: 1 } }, etki: 'Yarasalar karakoldan uzak duruyor.' },
  // v4 koloni-yerel-operasyonlar bölüm 2: dokuz yüzey bölgesinin kalan beşi
  kriyo: { ad: 'Kriyo-mağaralar', tehdit: 'donma hasarı ve kriyo yaratıkları', izolasyon: { ad: 'Donmuş menfezleri dondurucu köpükle kapat', gerek: { dondurucu_kopuk: 2 } }, stabilizasyon: { ad: 'Buz tavana sismik dengeleyici çak', gerek: { sismik_dengeleyici: 1 } }, etki: 'Mağaranın soğuğu artık kimseyi dondurmuyor.' },
  obsidyen: { ad: 'Obsidyen ovası', tehdit: 'cam kırığı fırtınaları ve kristal çöl akrepleri', izolasyon: { ad: 'Akrep yuvalarına sonik kovucu kur', gerek: { sonik_kovucu: 1 } }, stabilizasyon: { ad: 'Cam faylarına sismik dengeleyici çak', gerek: { sismik_dengeleyici: 1 } }, etki: 'Cam fırtınaları karakolun çevresinde diniyor.' },
  kuleler: { ad: 'Bazalt kuleleri', tehdit: 'yüksek irtifa ve antigravitasyon rüzgârları', izolasyon: { ad: 'Kulelere topraklama çubukları çak', gerek: { topraklama_cubugu: 2 } }, stabilizasyon: { ad: 'Rüzgâr hattına nötralizasyon kulesi dik', gerek: { notralizasyon_kulesi: 1 } }, etki: 'Antigravitasyon rüzgârları sakinledi.' },
  tuneller: { ad: 'Kadim tüneller', tehdit: 'karanlık ve uyanan kadim otomatlar', izolasyon: { ad: 'Galeri ağzına sonik kovucu kur', gerek: { sonik_kovucu: 1 } }, stabilizasyon: { ad: 'Çökük tavanlara sismik dengeleyiciler çak', gerek: { sismik_dengeleyici: 2 } }, etki: 'Tüneller aydınlık ve sessiz.' },
  vaha: { ad: 'Saklı vaha', tehdit: 'heyelanlar ve vaha kaya solucanları', izolasyon: { ad: 'Yamaçlara sismik dengeleyici çak', gerek: { sismik_dengeleyici: 1 } }, stabilizasyon: { ad: 'Kükürt buharına nötralizasyon kulesi dik', gerek: { notralizasyon_kulesi: 1 } }, etki: 'Vahanın yamaçları sağlam; su kesilmiyor.' },
};
// Dokuz bölgenin kara düşmanı (izolasyonda çatışma), önerilen araç ve eşya, karakol kurulunca gelen sürekli kazanç
export const BOLGE_DETAY = {
  dogu: { dusman: ['bataklik_pusucusu', 'bataklik_pusucusu'], arac: 'col_tilkisi', esya: 'kripto anten', kazanc: { piezo: 1, kristal: 1 } },
  civa: { dusman: null, arac: 'demir_kervan', esya: 'sıvı metal kabı', kazanc: { sivi_metal: 1, civa_tortusu: 1 } },
  lav: { dusman: ['sulfur_akrebi', 'sulfur_akrebi'], arac: 'mammoth', esya: 'termal giysi', kazanc: { izotop: 1 } },
  mantar: { dusman: ['mantar_pusucusu', 'mantar_pusucusu'], arac: null, esya: 'biyo-karantina ve sonik kovucu', kazanc: { foton_recinesi: 1, kseno_spor: 1 } },
  kriyo: { dusman: ['kriyo_yaratigi', 'kriyo_yaratigi'], arac: null, esya: 'dondurucu köpük ve termal giysi', kazanc: { kriyolit: 1, metan: 1 } },
  obsidyen: { dusman: ['kristal_akrep', 'kristal_akrep'], arac: 'col_tilkisi', esya: 'lamine zırh', kazanc: { plazma_cami: 1, obsidyen: 1 } },
  kuleler: { dusman: null, arac: 'atmosphere_x', esya: 'topraklama çubuğu', kazanc: { antigrav_tozu: 1, bazalt: 1 } },
  tuneller: { dusman: ['kadim_otomat'], arac: 'akrep', esya: 'sismik dengeleyici', kazanc: { kseno: 1, kseno_kabuk: 1 } },
  vaha: { dusman: ['vaha_solucani'], arac: null, esya: 'nötralizasyon kulesi ve sismik dengeleyici', kazanc: { bazalt: 1, tohum: 1 } },
};
const ARAC_ADI = { col_tilkisi: 'Çöl Tilkisi', demir_kervan: 'Demir Kervan', mammoth: 'Mammoth', atmosphere_x: 'Atmosphere-X', akrep: 'Akrep dronu' };
export const KARAKOL = { ikmal_karakolu: 1 };

export function bolgeAdimi(d, mekan) {
  return ((d.koloni.bolgeDurumu || {})[mekan]) || 0;
}
export function guvenliMi(d, mekan) {
  return bolgeAdimi(d, mekan) >= 4;
}

// Öncü keşif: bölgenin bütün noktaları bilinmeli
function kesifTamamMi(d, mekan) {
  return Object.keys(NOKTALAR).filter((id) => NOKTALAR[id].mekan === mekan && !NOKTALAR[id].karakol && !NOKTALAR[id].mini).every((id) => d.kesif.includes(id));
}

function gerekMetni(gerek) {
  return Object.keys(gerek).map((k) => gerek[k] + ' ' + PARCALAR[k].ad).join(', ');
}
function yeterli(d, gerek) {
  const p = d.koloni.parcalar || {};
  return Object.keys(gerek).every((k) => (p[k] || 0) >= gerek[k]);
}

export function noktaMi(id) {
  return !!(NOKTALAR[id] && NOKTALAR[id].karakol);
}

export function durumMetni(d, mekan) {
  const a = ARINDIRMA[mekan];
  const adim = bolgeAdimi(d, mekan);
  if (adim >= 4) return a.ad + ' güvenli. ' + a.etki + ' Karakol bölgenin madenlerini koloniye taşıyor.';
  return a.ad + ': tehlike ' + a.tehdit + '. Tamamlanan adım: ' + adim + ' / 4. Sıradaki: ' + ADIM_ADLARI[adim] + '.';
}

export function noktaEylemleri(d, id) {
  const mekan = NOKTALAR[id].karakol;
  const a = ARINDIRMA[mekan];
  const adim = bolgeAdimi(d, mekan);
  const e = [{ id: 'a_durum', etiket: 'Arındırma durumu' }];
  if (adim === 0) e.push({ id: 'a_kesif', etiket: 'Akustik profili kaydet', ipucu: 'Bölgedeki bütün noktalar radarla bulunmuş olmalı.' });
  else if (adim === 1) e.push({ id: 'a_izole', etiket: a.izolasyon.ad, ipucu: gerekMetni(a.izolasyon.gerek) });
  else if (adim === 2) e.push({ id: 'a_stabil', etiket: a.stabilizasyon.ad, ipucu: gerekMetni(a.stabilizasyon.gerek) });
  else if (adim === 3) e.push({ id: 'a_karakol', etiket: 'İkmal karakolunu kur', ipucu: gerekMetni(KARAKOL) });
  return e;
}

function ilerlet(d, mekan, gerek, metin) {
  if (gerek) {
    if (!yeterli(d, gerek)) return { metin: 'Gerekli: ' + gerekMetni(gerek) + '. Terminaldeki üretim menüsünden.', ses: 'red' };
    for (const k of Object.keys(gerek)) d.koloni.parcalar[k] -= gerek[k];
  }
  if (!d.koloni.bolgeDurumu) d.koloni.bolgeDurumu = {};
  d.koloni.bolgeDurumu[mekan] = bolgeAdimi(d, mekan) + 1;
  d.kaptan.tecrube += 10;
  if (d.koloni.bolgeDurumu[mekan] >= 4) {
    d.itibar += 5;
    d.koloni.moral = Math.min(100, d.koloni.moral + 5);
    d.sahne = 'bolge_guvenli';
    d.sonGuvenliBolge = mekan;
  }
  return { metin, ses: 'kur' };
}

export function eylemUygula(d, id, eylemId) {
  const mekan = NOKTALAR[id].karakol;
  const a = ARINDIRMA[mekan];
  if (eylemId === 'a_durum') return { metin: durumMetni(d, mekan) };
  if (eylemId === 'a_kesif') {
    if (!kesifTamamMi(d, mekan)) {
      const eksik = Object.keys(NOKTALAR).filter((x) => NOKTALAR[x].mekan === mekan && !NOKTALAR[x].karakol && !NOKTALAR[x].mini && !d.kesif.includes(x)).length;
      return { metin: 'Bölgenin akustik profili eksik: ' + eksik + ' nokta henüz bulunmadı. Bölgeyi dolaşıp radarı kullan.', ses: 'red' };
    }
    const det = BOLGE_DETAY[mekan];
    const onerilen = det ? [det.arac ? ARAC_ADI[det.arac] : null, det.esya].filter(Boolean).join(' ve ') : '';
    const aracla = det && det.arac && d.arac === det.arac;
    if (aracla) d.kaptan.tecrube += 10;
    return ilerlet(d, mekan, null, 'Bölgenin akustik profili kaydedildi: ' + a.tehdit + ' haritalandı.' + (onerilen ? ' Önerilen: ' + onerilen + '.' : '') + (aracla ? ' Doğru araçla geldin; keşif hızlı bitti.' : ''));
  }
  if (eylemId === 'a_izole') {
    const det = BOLGE_DETAY[mekan];
    // Dokuz bölgede izolasyon: önce bölgenin kara düşmanı temizlenir, zaferde malzeme yerleştirilir
    if (det && det.dusman) {
      if (!yeterli(d, a.izolasyon.gerek)) return { metin: 'Gerekli: ' + gerekMetni(a.izolasyon.gerek) + '. Terminaldeki üretim menüsünden.', ses: 'red' };
      d.izoleMekan = mekan;
      d.savasBekle = { dusmanlar: det.dusman.slice(), ortam: 'kara', tier: 1, gelis: det.dusman.length > 1 ? 'kiskac' : 'tek', giris: a.ad + ': ' + a.tehdit + '. Önce bölgeyi temizle.' };
      d.savasSonraSahne = 'bolge_izole';
      return { metin: a.ad + ' için ekip yola çıktı.', ses: 'red', kapat: true };
    }
    return ilerlet(d, mekan, a.izolasyon.gerek, a.izolasyon.ad + ': tamam. Tehditler izole edildi.');
  }
  if (eylemId === 'a_stabil') return ilerlet(d, mekan, a.stabilizasyon.gerek, a.stabilizasyon.ad + ': tamam. Bölge dengelendi.');
  if (eylemId === 'a_karakol') return ilerlet(d, mekan, KARAKOL, 'İkmal karakolu kuruldu; otonom taşıyıcılar için radar koridoru açıldı.');
  return { metin: '' };
}

export const SAHNELER = {
  bolge_izole: {
    baslik: 'Tehdit izole edildi',
    metin: (d) => [d.izoleSonuc || 'Bölge temizlendi.'],
    secenekler: (d) => [{ etiket: 'Devam', sonra: d.izoleSonra || null }],
  },
  bolge_guvenli: {
    baslik: 'Bölge güvenli',
    efekt: ['sinyal'],
    metin: (d) => {
      const a = ARINDIRMA[d.sonGuvenliBolge] || ARINDIRMA.sirtlar;
      const det = BOLGE_DETAY[d.sonGuvenliBolge];
      return [a.ad + ' artık koloniye bağlı, güvenli bir üretim bölgesi. ' + a.etki, 'İkmal karakolunun taşıyıcıları bölgenin madenlerini düzenli olarak koloniye getirecek.' + (det ? ' Sürekli kazanç: ' + Object.keys(det.kazanc).map((k) => (PARCALAR[k] ? PARCALAR[k].ad : k.replace(/_/g, ' '))).join(', ') + '.' : '')];
    },
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
  },
};

// İzolasyon çatışmasının zaferi: malzeme yerleştirilir, bölge bir adım ilerler
ZAFER_KANCALARI.bolge_izole = (d) => {
  const mekan = d.izoleMekan;
  d.izoleMekan = null;
  const a = mekan && ARINDIRMA[mekan];
  if (!a) {
    d.izoleSonuc = 'Bölge temizlendi.';
    d.izoleSonra = null;
    return;
  }
  const r = yeterli(d, a.izolasyon.gerek) ? ilerlet(d, mekan, a.izolasyon.gerek, a.izolasyon.ad + ': tamam. Tehditler izole edildi.') : { metin: 'Düşman temizlendi ama malzeme eksik kaldı; ' + gerekMetni(a.izolasyon.gerek) + ' getirip yeniden izole et.' };
  d.izoleSonuc = r.metin;
  d.izoleSonra = d.sahne && d.sahne !== 'bolge_izole' ? d.sahne : null;
  d.sahne = 'bolge_izole';
};
