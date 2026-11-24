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
import './kisiler/k10';
import './kisiler/k11';
import './kisiler/k12';
import { techizatMenu } from './kisiler/k13';
import './kisiler/k14';
import './kisiler/k15';
import { finalEksikleri } from './kisiler/k16';
import * as SE from './sehir';
import * as SY from './siyaset';
import * as AG from './akademiGorev';
import { YG_NOKTALAR } from './harita';

AG.arsivBulmacalariKur();

export const SAHNELER = Y.SAHNELER;
export { Y, AG, SY, SE };

export function noktaMi(id) {
  return !!YG_NOKTALAR[id];
}
export function noktaEylemleri(d, id) {
  const n = YG_NOKTALAR[id];
  if (n.gorev) {
    const g = Y.GOREVLER[n.gorev];
    return [{ id: 'yg_gorev', etiket: (Y.TUR_ETIKET[g.tur] || '') + g.id + ': ' + g.ad + ' görevini başlat' }, { id: 'incele', etiket: 'İncele' }];
  }
  if (id === 'ygk_arsiv') return [{ id: 'yg_arsiv', etiket: 'Arşiv notlarından yedek öğrenme' }, { id: 'incele', etiket: 'İncele' }];
  const k = Y.KISILER[n.ygk];
  return [{ id: 'yg_bag', etiket: 'Yanına git: sohbet, görevler, hediye' + bekleyenEk(d, n.ygk) }, { id: 'incele', etiket: 'İncele' }];
}
// Var olan akademi noktalarına (k_kefius, ak_forges …) bağ eylemi
export function ekEylemler(d, id) {
  const l = [...SE.ekEylemler(d, id)];
  for (const kid of Y.KISI_SIRASI) {
    const k = Y.KISILER[kid];
    if (k.nokta === id && !(k.ulasilamaz && k.ulasilamaz(d))) l.push({ id: 'yg_bag_' + kid, etiket: k.ad + ' ile bağ: sohbet, görevler, hediye' + bekleyenEk(d, kid) });
  }
  return l;
}
export function ekEylemMi(eid) {
  return eid === 'yg_bag' || eid === 'yg_gorev' || eid === 'yg_arsiv' || eid === 'yg_sehir' || eid.indexOf('yg_bag_') === 0;
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
  if (eid === 'yg_sehir') return SE.eylemUygula(d, id);
  if (eid === 'incele') return { metin: YG_NOKTALAR[id].tarif };
  if (eid === 'yg_gorev') {
    const r = Y.gorevBaslat(d, YG_NOKTALAR[id].gorev);
    return r.metin ? r : { metin: '' };
  }
  if (eid === 'yg_arsiv') return { agac: (x) => AG.arsivMenu(x) };
  if (eid === 'yg_bag') return kisiAc(d, YG_NOKTALAR[id].ygk);
  if (eid.indexOf('yg_bag_') === 0) return kisiAc(d, eid.slice(7));
  return { metin: '' };
}
export function ygkIlerle(d) {
  return [...Y.ygkIlerle(d).map((x) => x.soz), ...SY.tepkiIlerle(d)];
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
  // Açık yerinde görevlerin işaretleri: ilk düğümün sesi
  for (const gid of Object.keys((d.ygk && d.ygk.acikYer) || {})) {
    const n = noktalar['yg_yer_' + gid];
    if (n && n.mekan === d.mekan) l.push({ id: 'yer_' + gid, n, dosya: 'bd_' + (n.ses || GOREV_SESI(gid)) });
  }
  return l;
}

function GOREV_SESI(gid) {
  const y = Y.gorevYeri(gid);
  return (y && y.ses) || 'kristal';
}
// Gemi subaylarıyla bağ (Paket 7): seçkin kadro gemiye katılınca ana menüden; kişiler istasyonlarında
export function subayMenu(d) {
  const l = Y.KISI_SIRASI.filter((k) => Y.KISILER[k].subay);
  return {
    baslik: 'Seçkin subaylarla bağ',
    giris: d.bayrak.seckinKadro ? 'Altı seçkin YGK subayı istasyonlarında. Odalarındaki sohbetler aynen sürüyor; burada bağ, görev ve hediye.' : 'Seçkin subay kadrosu henüz gemine katılmadı: YGK kaydı ve bir gemi gerekir.',
    ogeler: d.bayrak.seckinKadro ? l.map((k) => {
      const ki = Y.KISILER[k];
      return { id: 'k_' + k, etiket: ki.ad + ', ' + ki.unvan + ': kademe ' + Y.kademe(d, k) + bekleyenEk(d, k), alt: (z) => Y.kisiMenu(z, k) };
    }) : [],
  };
}
// Tonoflenya bölge kişileri (Paket 6A, 6B): rehber
export function bolgeMenu(d) {
  const l = Y.KISI_SIRASI.filter((k) => Y.KISILER[k].bolgeKisisi);
  return {
    baslik: 'Tonoflenya bölge bağları',
    giris: 'Beş güç odağının lider ve ustaları. Kişiler kendi bölgelerinde; görevlerin bir kısmı yerinde yapılır.',
    ogeler: [
      { id: 'siyaset', etiket: 'Hiyerarşi ve siyasi pozisyonun', alt: (z) => SY.siyasetMenu(z) },
      { id: 'saha', etiket: 'Saha büyü görevleri: su, ışık, taş, hava hatları, Kara Göl, kıyı ve kanyonlar' + bekleyenEk(d, 'saha'), alt: (z) => Y.gorevlerMenu(z, 'saha') },
      { id: 'techizat', etiket: 'Saha hazırlık ağı: büyü dışı teçhizat', alt: (z) => techizatMenu(z) },
      { id: 'buyu_finali', etiket: 'Büyü finali: Tenohris altındaki kadim sunak' + (Y.gorevDurumu(d, 'BF-01') === 'bitti' ? ', tamamlandı' : finalEksikleri(d).length ? ', henüz kapalı' : ', açık'), ipucu: 'Beş renkli taşla dev muhafızlar ve siyasi kapanış. İsteğe bağlı; büyük final görevleri aynen sürer.', yap: (z) => ({ metin: Y.gorevDurumu(z, 'BF-01') === 'bitti' ? 'Kadim sunak mühürlendi; Malazar Büyük Ustası sensin.' : finalEksikleri(z).length ? 'Açılması için: ' + finalEksikleri(z).join('; ') + '.' : 'Kadim sunak seni bekliyor: Tenohris Sarayı\'nın altına in.' }) },
      ...l.map((k) => {
        const ki = Y.KISILER[k];
        return { id: 'k_' + k, etiket: ki.ad + ': kademe ' + Y.kademe(d, k) + bekleyenEk(d, k), ipucu: ki.unvan + '. ' + (ki.yerAdi || ''), alt: (z) => Y.profilMenu(z, k) };
      }),
    ],
  };
}
