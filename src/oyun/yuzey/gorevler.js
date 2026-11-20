// Yüzey görevlerinin tek giriş kapısı: ekran ve testler bu dosyadan alır.
// Birinci görev gorev1.js (Sinyal Arayışı), ikinci görev gorev2.js (Jeotermal Sondaj),
// üçüncü görev gorev3.js (Antik Kseno-Laboratuvar Kazısı), dördüncü görev gorev4.js (Tersane Zemin Güçlendirmesi),
// beşinci görev gorev5.js (Kıvılcım ve İlk Uçuş). Zamanla ilerleyen koloni (koloni.js), gemi (gemi/gemi.js) ve
// uzay (uzay/seyir.js) de görev kancalarıyla birlikte buradan sürülür.
import * as G1 from './gorev1';
import * as G2 from './gorev2';
import * as G3 from './gorev3';
import * as G4 from './gorev4';
import * as G5 from './gorev5';
import * as H from './hangar';
import * as G6 from './gorev6';
import * as B from './bolgeler';
import * as K from './kesifler';
import * as A from './arindirma';
import * as T from '../terraform';
import * as M from './mini';
import * as O from '../uzay/operasyon';
import * as F from '../uzay/fenomen';
import { HAMMADDELER } from '../veri/tesisler';
import { FENOMENLER } from '../veri/gozlem';
import { PARCALAR } from '../veri/uretim';
import { koloniIlerle } from '../koloni';
import * as S from '../uzay/seyir';
import { TESISLER } from '../veri/tesisler';

export const { ESYALAR, HAREKET_KISA, ayarBaslat, ayarDegis, ayarIlerle, ayarMetni, ayarYakinlik, koloniMetni, insaListesi } = G1;
export const { valfBaslat, valfIlerle, valfBirak, valfMetni, ALARM_ESIGI, bacaSayisi } = G2;
export const { NOTALAR, kapiDizisi, rezonansBaslat, rezonansSecimDegis, rezonansCal, kristalSayisi } = G3;

export const { AYAKLAR, ayakSayisi, ayakFrek, teraziBaslat, teraziPompa, teraziIlerle, teraziMetni, DENGE_ESIGI } = G4;

export const SAHNELER = { ...G1.SAHNELER, ...G2.SAHNELER, ...G3.SAHNELER, ...G4.SAHNELER, ...G5.SAHNELER, ...G6.SAHNELER, ...B.SAHNELER, ...K.SAHNELER, ...A.SAHNELER, ...M.SAHNELER, ...O.SAHNELER };

// Telsiz bildirimleri (belgeler/savas-yetenek-ve-murettebat-mekanikleri.md 4.3): koşulu sağlanınca bir kez kuyruğa
// girer. gorev alanı varsa yalnız o görev sürerken.
const BILDIRIMLER = [...G2.BILDIRIMLER, ...G3.BILDIRIMLER, ...G4.BILDIRIMLER, ...G5.BILDIRIMLER, ...B.BILDIRIMLER];
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
  const mi = d.mini && d.mini.aktif ? 'Yerel operasyon, ' + M.MINI[d.mini.aktif].ad + ': ' + M.MINI[d.mini.aktif].ipucu(d) + ' ' : '';
  return mi + ( G1.gorevIpucu(d) || G2.gorevIpucu(d) || G3.gorevIpucu(d) || G4.gorevIpucu(d) || G5.gorevIpucu(d) || (mi ? '' : 'Şu an bir görev yok.'));
}

export function noktaEylemleri(d, id) {
  const ek = [...G6.ekEylemler(d, id), ...K.ekEylemler(d, id), ...M.ekEylemler(d, id)];
  if (G6.noktaMi(id)) return [...ek, { id: 'incele', etiket: 'Sütunu incele' }];
  const temel = temelEylemler(d, id);
  if (!ek.length) return temel;
  // Ek proje eylemleri "incele"den önce
  const i = temel.findIndex((e) => e.id === 'incele');
  return i < 0 ? [...temel, ...ek] : [...temel.slice(0, i), ...ek, ...temel.slice(i)];
}
function temelEylemler(d, id) {
  if (M.noktaMi(id)) return M.noktaEylemleri(d, id);
  if (K.noktaMi(id)) return K.noktaEylemleri(d, id);
  if (A.noktaMi(id)) return A.noktaEylemleri(d, id);
  if (G2.bacaMi(id)) return G2.noktaEylemleri(d, id);
  if (G3.noktaMi(id)) return G3.noktaEylemleri(d, id);
  if (G4.noktaMi(id)) return G4.noktaEylemleri(d, id);
  if (G5.noktaMi(id)) return G5.noktaEylemleri(d, id);
  if (H.noktaMi(id)) return H.noktaEylemleri(d, id);
  return G1.noktaEylemleri(d, id);
}

export function eylemUygula(d, id, eylemId) {
  if (G6.ekEylemMi(eylemId) || G6.noktaMi(id)) return G6.eylemUygula(d, id, eylemId);
  if (M.ekEylemMi(eylemId) || M.noktaMi(id)) return M.eylemUygula(d, id, eylemId);
  if (K.ekEylemMi(eylemId) || K.noktaMi(id)) return K.eylemUygula(d, id, eylemId);
  if (A.noktaMi(id)) return A.eylemUygula(d, id, eylemId);
  if (G2.bacaMi(id)) return G2.eylemUygula(d, id, eylemId);
  if (G3.noktaMi(id)) return G3.eylemUygula(d, id, eylemId);
  if (G4.noktaMi(id)) return G4.eylemUygula(d, id, eylemId);
  if (G5.noktaMi(id)) return G5.eylemUygula(d, id, eylemId);
  if (H.noktaMi(id)) return H.eylemUygula(d, id, eylemId);
  return G1.eylemUygula(d, id, eylemId);
}

export function konusma(d, kisiId) {
  if (d.gorev.id !== 'sinyal') {
    const k = G5.konusma(d, kisiId) || G4.konusma(d, kisiId) || G3.konusma(d, kisiId) || G2.konusma(d, kisiId);
    if (k) return k;
  }
  return G1.konusma(d, kisiId);
}

export function insaEt(d, id) {
  if (id === 'koloni_kalkani' || id === 'jeotermal_santral') {
    const kurulu = d.koloni.binalar.includes(id);
    const r = G1.insaEt(d, id);
    if (!kurulu && d.koloni.binalar.includes(id)) {
      if (id === 'koloni_kalkani') d.koloni.kalkan = 2;
      return { metin: TESISLER[id].ad + ' kuruldu. ' + TESISLER[id].katki, ses: 'kur' };
    }
    return r;
  }
  if (id === 'sera') {
    const kurulu = d.koloni.binalar.includes(id);
    const r = G1.insaEt(d, id);
    if (!kurulu && d.koloni.binalar.includes(id)) {
      d.koloni.moral = Math.min(100, d.koloni.moral + 10);
      return { metin: 'Sera Hubu kuruldu. Kseno-tahıllar filizleniyor; koloni kendi ekmeğini yetiştirecek. Nüfus artışı hızlandı.', ses: 'kur' };
    }
    return r;
  }
  if (id === 'yasam_blogu') {
    const kurulu = d.koloni.binalar.includes(id);
    const r = G1.insaEt(d, id);
    if (!kurulu && d.koloni.binalar.includes(id)) {
      d.koloni.nufus.barinma += 10;
      d.koloni.moral = Math.min(100, d.koloni.moral + 5);
      return { metin: 'Yaşam Bloğu kuruldu. Barınma ' + d.koloni.nufus.barinma + ' kişi.', ses: 'kur' };
    }
    return r;
  }
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

// --- Terraforming ve arındırma (terraform.js, arindirma.js) ---
export function terraformListesi(d) {
  return T.terraformListesi(d);
}
export function terraformTeslim(d, id) {
  return T.yerelTeslim(d, id, (x) => (HAMMADDELER[x] ? HAMMADDELER[x].ad : x));
}
export function bolgeListesi(d) {
  return Object.keys(A.ARINDIRMA).map((m) => ({ id: m, ad: A.ARINDIRMA[m].ad, durum: A.durumMetni(d, m) }));
}
export function kademeMetni(d) {
  if (d.koloni.seviye >= 4) return 'Koloni Galaktik Başkent.';
  if (d.koloni.seviye < 3) return '';
  const e = T.seviye4Eksikleri(d, A.guvenliMi);
  return 'Galaktik Başkent için eksik: ' + e.join('; ') + '.';
}

// --- Zaman: koloni, üretim, tersane (her karede çağrılır) ---
export const { aracaBin, aractanIn, aracListesi } = H;
export const { projeMetni, projeListesi } = G6;
export const { miniBaslat, MINI, olgunMu, miniGorunur } = M;

export function zamanIlerle(d, dt) {
  const olaylar = koloniIlerle(d, dt);
  olaylar.push(...M.miniIlerle(d, dt));
  olaylar.push(...F.itibarIlerle(d));
  if (d.vahaGirisi) {
    d.vahaGirisi = false;
    K.vahaBulundu(d);
  }
  for (const o of olaylar) if (o.tur === 'gemiHazir') G5.gemiHazir(d, o.sinif);
  for (const id of S.poiGuncelle(d)) olaylar.push({ tur: 'poi', id, metin: 'Sinyal kulesi yeni bir nokta yakaladı: ' + S.UZAY_NOKTALARI[id].ad + '. Uzay haritasında.' });
  return olaylar;
}

// --- Uzay: kalkış, ilerleme, kenetlenme (görev kancalarıyla) ---
export const { UZAY_NOKTALARI, gorunurNoktalar, itki, burunDondur, uzayRadar, uzayDurumu, onTarama, kalkis, kalkisOlur, sesYeri, enYakin, fenerMenzili, HIZ_EN_COK } = S;
export function uzayAdim(d, dt) {
  const olaylar = S.uzayIlerle(d, dt);
  olaylar.push(...F.fenomenIlerle(d, dt));
  if (olaylar.some((o) => o.tur === 'yakitBitti')) {
    // Yakıt bitti: koloni bir yakıt kapsülü yollar, gemi kızağa döner
    d.gemi.yer = 'kizak';
    d.uzay = null;
    d.sahne = 'kurtarma';
  }
  return olaylar;
}
export function kenetlen(d) {
  // Yol üstü fenomen: gereçler tamsa gözlem operasyonu
  if (F.fenomenYakinMi(d) && d.uzay.hiz <= 1) {
    const id = d.fenomen.id;
    const eksik = F.fenomenEksik(d, id);
    if (O.opTamamMi(d, id)) return { metin: FENOMENLER[id].ad + ': keşfedildi mührü var. ' + FENOMENLER[id].imza + ' Dilediğin kadar dinle.' };
    if (eksik.length) return { metin: FENOMENLER[id].ad + '. Gözlem için gereken gereç eksik: ' + eksik.map((k) => (PARCALAR['mod_' + k] ? PARCALAR['mod_' + k].ad : k)).join(', ') + '.', ses: 'red' };
    d.uzay.hiz = 0;
    return { metin: FENOMENLER[id].ad + '. Gözlem başlıyor.', op: O.opBaslat(d, id), id };
  }
  const r = S.kenetlen(d);
  if (r.inis) G5.inisSonrasi(d);
  // Donanım tamsa ve operasyon yapılmadıysa doğrudan operasyon sahasına girilir
  if (r.id && !r.kilitli && O.opVarMi(r.id) && !O.opTamamMi(d, r.id)) r.op = O.opBaslat(d, r.id);
  return r;
}
export const { salonListesi, itibarKademesi } = F;
export const { opGirdi, opIlerle, opSes, opDurum, opBaslat, opTamamMi } = O;
