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

const ADIM_ADLARI = ['Öncü keşif ve akustik profil', 'Tehdit izolasyonu', 'Stabilizasyon', 'İleri karakol ve lojistik yolu'];

export const ARINDIRMA = {
  sirtlar: { ad: 'Manyetik Sırtlar', tehdit: 'asidik kükürt dumanları ve kontrolsüz gaz sızıntıları', izolasyon: { ad: 'Sızıntıları dondurucu köpükle kapat', gerek: { dondurucu_kopuk: 2 } }, stabilizasyon: { ad: 'Gaz nötralizasyon kulesi dik', gerek: { notralizasyon_kulesi: 1 } }, etki: 'Kükürt maruziyeti kalktı.' },
  dogu: { ad: 'Kristal bataklıkları', tehdit: 'zemin statik boşalmaları ve çıplak arklar', izolasyon: { ad: 'Topraklama çubuklarını çak', gerek: { topraklama_cubugu: 3 } }, stabilizasyon: { ad: 'Sismik dengeleyiciyi kur', gerek: { sismik_dengeleyici: 1 } }, etki: 'Statik boşalmalar sustu.' },
  lav: { ad: 'Lav koridorları', tehdit: 'magma fışkırmaları ve plazma sızıntıları', izolasyon: { ad: 'Menfezleri dondurucu köpükle kapat', gerek: { dondurucu_kopuk: 3 } }, stabilizasyon: { ad: 'Fay hattına sismik dengeleyiciler çak', gerek: { sismik_dengeleyici: 2 } }, etki: 'Magma kabarmaları durdu, gaz kalktı.' },
  plato: { ad: 'Uğultulu Plato', tehdit: 'fırtına hamleleri ve iyonosferik statik', izolasyon: { ad: 'Topraklama çubuklarını çak', gerek: { topraklama_cubugu: 2 } }, stabilizasyon: { ad: 'Fırtına hattına nötralizasyon kulesi dik', gerek: { notralizasyon_kulesi: 1 } }, etki: 'Hamleler artık kimseyi savurmuyor.' },
  civa: { ad: 'Cıva şelaleleri', tehdit: 'zehirli cıva buharı', izolasyon: { ad: 'Buhar ceplerini dondurucu köpükle kapat', gerek: { dondurucu_kopuk: 1 } }, stabilizasyon: { ad: 'Nötralizasyon kulesi dik', gerek: { notralizasyon_kulesi: 1 } }, etki: 'Cıva buharı süzülüyor; maruziyet kalktı.' },
  mantar: { ad: 'Mantar ormanı', tehdit: 'saldırgan kör yarasa sürüleri', izolasyon: { ad: 'Sonik kovucuları kur', gerek: { sonik_kovucu: 2 } }, stabilizasyon: { ad: 'Tavana sismik dengeleyici çak', gerek: { sismik_dengeleyici: 1 } }, etki: 'Yarasalar karakoldan uzak duruyor.' },
};
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
    return ilerlet(d, mekan, null, 'Bölgenin akustik profili kaydedildi: ' + a.tehdit + ' haritalandı.');
  }
  if (eylemId === 'a_izole') return ilerlet(d, mekan, a.izolasyon.gerek, a.izolasyon.ad + ': tamam. Tehditler izole edildi.');
  if (eylemId === 'a_stabil') return ilerlet(d, mekan, a.stabilizasyon.gerek, a.stabilizasyon.ad + ': tamam. Bölge dengelendi.');
  if (eylemId === 'a_karakol') return ilerlet(d, mekan, KARAKOL, 'İkmal karakolu kuruldu; otonom taşıyıcılar için radar koridoru açıldı.');
  return { metin: '' };
}

export const SAHNELER = {
  bolge_guvenli: {
    baslik: 'Bölge güvenli',
    efekt: ['sinyal'],
    metin: (d) => {
      const a = ARINDIRMA[d.sonGuvenliBolge] || ARINDIRMA.sirtlar;
      return [a.ad + ' artık koloniye bağlı, güvenli bir üretim bölgesi. ' + a.etki, 'İkmal karakolunun taşıyıcıları bölgenin madenlerini düzenli olarak koloniye getirecek.'];
    },
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
  },
};
