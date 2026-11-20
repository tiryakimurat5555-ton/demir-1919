// Yüzey görevlerinin tek giriş kapısı: ekran ve testler bu dosyadan alır.
// Birinci görev gorev1.js (Sinyal Arayışı), ikinci görev gorev2.js (Jeotermal Sondaj),
// üçüncü görev gorev3.js (Antik Kseno-Laboratuvar Kazısı), dördüncü görev gorev4.js (Tersane Zemin Güçlendirmesi).
import * as G1 from './gorev1';
import * as G2 from './gorev2';
import * as G3 from './gorev3';
import * as G4 from './gorev4';
import { TESISLER } from '../veri/tesisler';

export const { ESYALAR, HAREKET_KISA, ayarBaslat, ayarDegis, ayarIlerle, ayarMetni, ayarYakinlik, koloniMetni, insaListesi } = G1;
export const { valfBaslat, valfIlerle, valfBirak, valfMetni, ALARM_ESIGI, bacaSayisi } = G2;
export const { NOTALAR, kapiDizisi, rezonansBaslat, rezonansSecimDegis, rezonansCal, kristalSayisi } = G3;

export const { AYAKLAR, ayakSayisi, ayakFrek, teraziBaslat, teraziPompa, teraziIlerle, teraziMetni, DENGE_ESIGI } = G4;

export const SAHNELER = { ...G1.SAHNELER, ...G2.SAHNELER, ...G3.SAHNELER, ...G4.SAHNELER };

// Telsiz bildirimleri (belgeler/savas-yetenek-ve-murettebat-mekanikleri.md 4.3): koşulu sağlanınca bir kez kuyruğa
// girer. gorev alanı varsa yalnız o görev sürerken.
const BILDIRIMLER = [...G2.BILDIRIMLER, ...G3.BILDIRIMLER, ...G4.BILDIRIMLER];
export function bildirimIlerle(d) {
  if (!d.bildirimler) d.bildirimler = [];
  if (!d.duyulanBildirimler) d.duyulanBildirimler = [];
  const yeni = [];
  for (const bl of BILDIRIMLER) {
    if (d.duyulanBildirimler.includes(bl.id) || d.bildirimler.some((x) => x.id === bl.id)) continue;
    if (bl.gorev && d.gorev.id !== bl.gorev) continue;
    if (bl.kosul(d)) {
      const u = d.murettebat[bl.rol];
      const x = { id: bl.id, kim: u.rol + ' ' + u.ad, metin: bl.metin(d) };
      d.bildirimler.push(x);
      yeni.push(x);
    }
  }
  return yeni;
}

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
  return G1.gorevIpucu(d) || G2.gorevIpucu(d) || G3.gorevIpucu(d) || G4.gorevIpucu(d) || 'Şu an bir görev yok.';
}

export function noktaEylemleri(d, id) {
  if (G2.bacaMi(id)) return G2.noktaEylemleri(d, id);
  if (G3.noktaMi(id)) return G3.noktaEylemleri(d, id);
  if (G4.noktaMi(id)) return G4.noktaEylemleri(d, id);
  return G1.noktaEylemleri(d, id);
}

export function eylemUygula(d, id, eylemId) {
  if (G2.bacaMi(id)) return G2.eylemUygula(d, id, eylemId);
  if (G3.noktaMi(id)) return G3.eylemUygula(d, id, eylemId);
  if (G4.noktaMi(id)) return G4.eylemUygula(d, id, eylemId);
  return G1.eylemUygula(d, id, eylemId);
}

export function konusma(d, kisiId) {
  if (d.gorev.id !== 'sinyal') {
    const k = G4.konusma(d, kisiId) || G3.konusma(d, kisiId) || G2.konusma(d, kisiId);
    if (k) return k;
  }
  return G1.konusma(d, kisiId);
}

export function insaEt(d, id) {
  if (id === 'tersane') {
    const kurulu = d.koloni.binalar.includes(id);
    const r = G1.insaEt(d, id);
    if (!kurulu && d.koloni.binalar.includes(id)) {
      G4.tersaneKuruldu(d);
      return { metin: '', sahne: d.sahne };
    }
    return r;
  }
  if (id === 'biyo_kubbe') {
    const kurulu = d.koloni.binalar.includes(id);
    const r = G1.insaEt(d, id);
    if (!kurulu && d.koloni.binalar.includes(id)) {
      G3.biyoKubbeKuruldu(d);
      return { metin: '', sahne: d.sahne };
    }
    return r;
  }
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
