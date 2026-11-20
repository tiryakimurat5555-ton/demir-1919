// Yüzey görevlerinin tek giriş kapısı: ekran ve testler bu dosyadan alır.
// Birinci görev gorev1.js (Sinyal Arayışı), ikinci görev gorev2.js (Jeotermal Sondaj).
import * as G1 from './gorev1';
import * as G2 from './gorev2';
import { TESISLER } from '../veri/tesisler';

export const { ESYALAR, HAREKET_KISA, ayarBaslat, ayarDegis, ayarIlerle, ayarMetni, ayarYakinlik, koloniMetni, insaListesi } = G1;
export const { valfBaslat, valfIlerle, valfBirak, valfMetni, ALARM_ESIGI, bacaSayisi, bildirimIlerle } = G2;

export const SAHNELER = { ...G1.SAHNELER, ...G2.SAHNELER };

export function sahneMetni(d, id) {
  const s = SAHNELER[id];
  return s ? s.metin(d).filter(Boolean) : [];
}

export function sahneSecenekleri(d, id) {
  const s = SAHNELER[id];
  return s ? s.secenekler(d) : [];
}

export function sahneSec(d, id, i) {
  const x = sahneSecenekleri(d, id)[i];
  if (!x) return null;
  if (x.yap) x.yap(d);
  d.sahne = x.sonra || null;
  return d.sahne;
}

export function gorevIpucu(d) {
  return G1.gorevIpucu(d) || G2.gorevIpucu(d) || 'Şu an bir görev yok.';
}

export function noktaEylemleri(d, id) {
  if (G2.bacaMi(id)) return G2.noktaEylemleri(d, id);
  return G1.noktaEylemleri(d, id);
}

export function eylemUygula(d, id, eylemId) {
  if (G2.bacaMi(id)) return G2.eylemUygula(d, id, eylemId);
  return G1.eylemUygula(d, id, eylemId);
}

export function konusma(d, kisiId) {
  if (d.gorev.id !== 'sinyal') {
    const k = G2.konusma(d, kisiId);
    if (k) return k;
  }
  return G1.konusma(d, kisiId);
}

export function insaEt(d, id) {
  if (id === 'dokumhane') {
    const kurulu = d.koloni.binalar.includes(id);
    const r = G1.insaEt(d, id);
    if (!kurulu && d.koloni.binalar.includes(id)) {
      G2.dokumhaneKuruldu(d);
      return { metin: '', sahne: d.sahne };
    }
    return r;
  }
  return G1.insaEt(d, id);
}

export { TESISLER };
