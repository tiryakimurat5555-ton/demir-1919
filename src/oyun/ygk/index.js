// YGK Akademi bağ ağı girişi (5.1, belgeler/v6 Paket 3, Paket 5, karakter-01 … karakter-24). Kişi dosyaları yüklenince
// KISILER dolar; görevler.js buradan alır: SAHNELER, nokta ve ek eylemler, ygkIlerle (gün başı kademe ve haberler).
import * as Y from './bag';
import './kisiler/k01';
import './kisiler/k02';
import './kisiler/k03';
import './kisiler/k04';
import './kisiler/k05';
import './kisiler/k06';
import './kisiler/k07';
import './kisiler/k08';
import './kisiler/k09';
import * as AG from './akademiGorev';
import { YG_NOKTALAR } from './harita';

AG.arsivBulmacalariKur();

export const SAHNELER = Y.SAHNELER;
export { Y, AG };

export function noktaMi(id) {
  return !!YG_NOKTALAR[id];
}
export function noktaEylemleri(d, id) {
  const n = YG_NOKTALAR[id];
  if (id === 'ygk_arsiv') return [{ id: 'yg_arsiv', etiket: 'Arşiv notlarından yedek öğrenme' }, { id: 'incele', etiket: 'İncele' }];
  const k = Y.KISILER[n.ygk];
  return [{ id: 'yg_bag', etiket: 'Yanına git: sohbet, görevler, hediye' + bekleyenEk(d, n.ygk) }, { id: 'incele', etiket: 'İncele' }];
}
// Var olan akademi noktalarına (k_kefius, ak_forges …) bağ eylemi
export function ekEylemler(d, id) {
  const l = [];
  for (const kid of Y.KISI_SIRASI) {
    const k = Y.KISILER[kid];
    if (k.nokta === id && !(k.ulasilamaz && k.ulasilamaz(d))) l.push({ id: 'yg_bag_' + kid, etiket: k.ad + ' ile bağ: sohbet, görevler, hediye' + bekleyenEk(d, kid) });
  }
  return l;
}
export function ekEylemMi(eid) {
  return eid === 'yg_bag' || eid === 'yg_arsiv' || eid.indexOf('yg_bag_') === 0;
}
function bekleyenEk(d, kid) {
  const k = Y.KISILER[kid];
  const n = (k.gorevler || []).filter((g) => Y.gorevDurumu(d, g.id) === 'acik').length;
  return n ? ', ' + n + ' açık görev' : '';
}
function kisiAc(d, kid) {
  return { ses: Y.selamla(d, kid), agac: (x) => Y.kisiMenu(x, kid) };
}
export function eylemUygula(d, id, eid) {
  if (eid === 'incele') return { metin: YG_NOKTALAR[id].tarif };
  if (eid === 'yg_arsiv') return { agac: (x) => AG.arsivMenu(x) };
  if (eid === 'yg_bag') return kisiAc(d, YG_NOKTALAR[id].ygk);
  if (eid.indexOf('yg_bag_') === 0) return kisiAc(d, eid.slice(7));
  return { metin: '' };
}
export function ygkIlerle(d) {
  return Y.ygkIlerle(d).map((x) => x.soz);
}
// Akademi rehberi (menüde): üç giriş yolu ve her kişinin bağ kademesi
export function rehberMenu(d) {
  return {
    baslik: 'YGK Akademi bağ ağı',
    giris: 'Üç giriş yolu var; hiçbiri ötekini kilitlemez. Kürsü büyü sınavı: ' + AG.sinavSayisi(d) + ' tamam.',
    ogeler: AG.YOLLAR.map((y) => ({
      id: 'yol_' + y.id, etiket: y.ad + ', ' + y.kat, ipucu: y.tarif,
      alt: (x) => ({
        baslik: y.ad,
        giris: y.tarif,
        ogeler: y.kisiler.filter((k) => Y.KISILER[k]).map((k) => {
          const ki = Y.KISILER[k];
          const r = x.ygk && x.ygk.k[k];
          return { id: 'k_' + k, etiket: ki.ad + ': kademe ' + (r ? r.k : 0) + bekleyenEk(x, k), ipucu: ki.unvan, alt: (z) => Y.profilMenu(z, k) };
        }),
      }),
    })),
  };
}
// Konumlu imza döngüleri (Yuzey.js ygkSesleri): oyuncunun bulunduğu kattaki ulaşılabilir kişilerin noktaları.
// noktalar: yuzey/harita.js NOKTALAR (döngüsel içe aktarma olmasın diye Yuzey geçirir).
export function sesYerleri(d, noktalar) {
  const l = [];
  for (const kid of Y.KISI_SIRASI) {
    const k = Y.KISILER[kid];
    if (k.ulasilamaz && k.ulasilamaz(d)) continue;
    const n = noktalar[k.nokta || 'yg_' + kid];
    if (!n || n.mekan !== d.mekan) continue;
    if (n.gorunur && !n.gorunur(d)) continue;
    l.push({ id: kid, n });
  }
  return l;
}
