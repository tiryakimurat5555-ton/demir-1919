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
import * as SV from '../uzay/savas';
import * as BN from '../binalar';
import * as SF from '../uzay/sefer';
import { HAMMADDELER } from '../veri/tesisler';
import { FENOMENLER, GEZEGENLER } from '../veri/gozlem';
import { PARCALAR } from '../veri/uretim';
import { koloniIlerle } from '../koloni';
import * as S from '../uzay/seyir';
import * as TA from '../tarim/eylemler';
import * as TR from '../tarim/tarim';
import * as Z from '../zaman';
import * as TM from '../tonoflenya/malken';
import * as AT from '../tonoflenya/atlas';
import { TESISLER } from '../veri/tesisler';
import * as ZN from '../tonoflenya/zanaat';
import * as SB from '../tonoflenya/subay';
import * as FN from '../tonoflenya/final';
import * as YN from '../tonoflenya/yan';
import * as KR from '../tonoflenya/karakter';
import * as AK from '../tonoflenya/akademi';
import '../tonoflenya/yanDerin';
import * as KM from '../komuta';
import * as HK from '../hikaye';
import '../hikayeKoloni';
import '../tonoflenya/asama4';
import * as GZ from '../gezegenHikayeleri';
import { MEKANLAR } from './harita';

export const { ESYALAR, HAREKET_KISA, ayarBaslat, ayarDegis, ayarIlerle, ayarMetni, ayarYakinlik, koloniMetni, insaListesi } = G1;
export const { valfBaslat, valfIlerle, valfBirak, valfMetni, ALARM_ESIGI, bacaSayisi } = G2;
export const { NOTALAR, kapiDizisi, rezonansBaslat, rezonansSecimDegis, rezonansCal, kristalSayisi } = G3;

export const { AYAKLAR, ayakSayisi, ayakFrek, teraziBaslat, teraziPompa, teraziIlerle, teraziMetni, DENGE_ESIGI } = G4;

export const SAHNELER = { ...G1.SAHNELER, ...G2.SAHNELER, ...G3.SAHNELER, ...G4.SAHNELER, ...G5.SAHNELER, ...G6.SAHNELER, ...B.SAHNELER, ...K.SAHNELER, ...A.SAHNELER, ...M.SAHNELER, ...O.SAHNELER, ...SV.SAHNELER, ...SF.SAHNELER, ...TM.SAHNELER, ...AT.SAHNELER, ...FN.SAHNELER, ...YN.SAHNELER, ...KM.SAHNELER, ...HK.SAHNELER };

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
  const yn = d.yan && d.yan.aktif ? 'Süren yan görev: ' + YN.YAN_GOREV[d.yan.aktif].ad + ', ' + YN.YAN_GOREV[d.yan.aktif].yer + '. ' : '';
  if (d.bayrak.tonoflenyaGoruldu && d.mekan && MEKANLAR[d.mekan] && MEKANLAR[d.mekan].tonoflenya) return mi + yn + FN.gorevMetni(d);
  return mi + ( G1.gorevIpucu(d) || G2.gorevIpucu(d) || G3.gorevIpucu(d) || G4.gorevIpucu(d) || G5.gorevIpucu(d) || (mi ? '' : 'Şu an bir görev yok.'));
}

export function noktaEylemleri(d, id) {
  const ek = [...G6.ekEylemler(d, id), ...K.ekEylemler(d, id), ...M.ekEylemler(d, id), ...TA.ekEylemler(d, id), ...(id === 'tepe' ? TM.tepeEylemi(d) : []), ...ZN.ekEylemler(d, id), ...FN.ekEylemler(d, id), ...AK.ekEylemler(d, id)];
  if (G6.noktaMi(id)) return [...ek, { id: 'incele', etiket: 'Sütunu incele' }];
  const temel = temelEylemler(d, id);
  if (!ek.length) return temel;
  // Ek proje eylemleri "incele"den önce
  const i = temel.findIndex((e) => e.id === 'incele');
  return i < 0 ? [...temel, ...ek] : [...temel.slice(0, i), ...ek, ...temel.slice(i)];
}
function temelEylemler(d, id) {
  if (AK.noktaMi(id)) return AK.noktaEylemleri(d, id);
  if (KR.noktaMi(id)) return KR.noktaEylemleri(d, id);
  if (FN.noktaMi(id)) return [{ id: 'incele', etiket: 'İncele' }];
  if (YN.noktaMi(id)) return YN.noktaEylemleri(d, id);
  if (ZN.noktaMi(id)) return ZN.noktaEylemleri(d, id);
  if (TA.noktaMi(id)) return TA.noktaEylemleri(d, id);
  if (TM.noktaMi(id)) return TM.noktaEylemleri(d, id);
  if (AT.noktaMi(id)) return AT.noktaEylemleri(d, id);
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
  if (eylemId === 'y_ygk') return TM.ygkAra(d);
  if (AK.ekEylemMi(eylemId)) return AK.ekEylemUygula(d, id, eylemId);
  if (AK.noktaMi(id)) return AK.eylemUygula(d, id, eylemId);
  if (KR.noktaMi(id) && !FN.ekEylemMi(eylemId)) return KR.eylemUygula(d, id, eylemId);
  if (FN.ekEylemMi(eylemId) || FN.noktaMi(id)) return FN.eylemUygula(d, id, eylemId);
  if (YN.noktaMi(id)) return YN.eylemUygula(d, id, eylemId);
  if (eylemId === 'z_sarj' || ZN.noktaMi(id)) return beklemeyiUygula(d, ZN.eylemUygula(d, id, eylemId));
  if (TM.noktaMi(id)) {
    const r = TM.eylemUygula(d, id, eylemId);
    if (r.sicrama) {
      sicramaZamani(d, ZN.sicramaSuresi(d));
      ZN.sarjBaslat(d);
    }
    return beklemeyiUygula(d, r);
  }
  if (AT.noktaMi(id)) return AT.eylemUygula(d, id, eylemId);
  if (TA.ekEylemMi(eylemId) || TA.noktaMi(id)) return TA.eylemUygula(d, id, eylemId);
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

// Koloni baskınları artık komşu halka baskısıyla (komuta.js komutaIlerle): sonsuz rastgele dalga yok.
export function zamanIlerle(d, dt) {
  const olaylar = koloniIlerle(d, dt);
  olaylar.push(...Z.zamanAkit(d, dt));
  olaylar.push(...TR.tarimIlerle(d, dt));
  olaylar.push(...M.miniIlerle(d, dt));
  olaylar.push(...F.itibarIlerle(d));
  if (d.vahaGirisi) {
    d.vahaGirisi = false;
    K.vahaBulundu(d);
  }
  for (const o of olaylar) if (o.tur === 'gemiHazir') G5.gemiHazir(d, o.sinif);
  // Ekol kıdemi, ambar dengesi, subayların kriz sözleri (tonoflenya/zanaat.js, subay.js)
  ZN.ekolDenetle(d, MEKANLAR, FENOMENLER);
  ZN.kargoDenetle(d);
  for (const x of ZN.zanaatIlerle(d)) SB.haber(d, x);
  YN.yanIlerle(d);
  if ((d.zehir || 0) >= 75) {
    const k = SB.kriz(d, 'axira');
    if (k) SB.haber(d, k);
  }
  // Karakter ağı (mekik, gözetmen, seçkin kadro) ve komuta paneli (komşu halka baskısı, karakol aktarımı)
  KR.karakterIlerle(d);
  KM.komutaIlerle(d);
  HK.hikayeIlerle(d);
  // Final görevleri: sahne kapanınca bekleyen operasyon ya da çatışma başlar (tonoflenya/final.js)
  if (!d.sahne && !d.op && !d.savas) {
    // Bekleyen çatışma önce (ör. yörüngedeki devriye), ardından bekleyen operasyon
    const sb = d.savasBekle;
    const karaSavas = sb && ((typeof sb === 'object' && sb.ortam === 'kara') || (typeof sb === 'string' && SV.DUSMANLAR[sb] && SV.DUSMANLAR[sb].ortam === 'kara'));
    if (sb && (d.gemi || karaSavas)) {
      d.savasBekle = null;
      olaylar.push({ tur: 'savas', olaylar: SV.savasBaslat(d, sb) });
    } else if (d.opBekle) {
      const id = d.opBekle;
      d.opBekle = null;
      olaylar.push({ tur: 'op', olaylar: O.opBaslat(d, id) });
    }
  }
  if (d.haberKuyrugu && d.haberKuyrugu.length) {
    for (const m of d.haberKuyrugu) olaylar.push({ tur: 'haber', metin: m, acil: true });
    d.haberKuyrugu = [];
  }
  for (const id of S.poiGuncelle(d)) olaylar.push({ tur: 'poi', id, metin: 'Sinyal kulesi yeni bir nokta yakaladı: ' + S.UZAY_NOKTALARI[id].ad + '. Uzay haritasında.' });
  return olaylar;
}

// --- Uzay: kalkış, ilerleme, kenetlenme (görev kancalarıyla) ---
// Kalkış: hazır sefer erzakları gemiye yüklenir (tarim/tarim.js erzakYukle)
export function kalkis(d) {
  const r = S.kalkis(d);
  if (d.gemi && d.gemi.yer === 'uzay') TR.erzakYukle(d);
  return r;
}
export const { UZAY_NOKTALARI, gorunurNoktalar, itki, burunDondur, uzayRadar, uzayDurumu, onTarama, kalkisOlur, sesYeri, enYakin, fenerMenzili, HIZ_EN_COK } = S;
export function uzayAdim(d, dt) {
  if (d.savas) return [];
  const olaylar = S.uzayIlerle(d, dt);
  const fo = F.fenomenIlerle(d, dt);
  if (fo.some((o) => o.tur === 'fenomen')) {
    const k = SB.kriz(d, 'sinha');
    if (k) fo.push({ tur: 'haber', metin: k });
  }
  olaylar.push(...fo);
  olaylar.push(...SF.seferIlerle(d, dt));
  if (olaylar.some((o) => o.tur === 'yakitBitti')) {
    // Yakıt bitti: koloni bir yakıt kapsülü yollar, gemi kızağa döner
    acilImdat(d);
  }
  return olaylar;
}
// Yakıt sıfırlanırsa oyun kilitlenmez: imdat sinyali, çekici gemi; bedel 10 Galaktik Keşif Kredisi ya da (kredi yoksa)
// çekilirken korsan ateşi: gövde yüzde yirmi
export function acilImdat(d) {
  if (!d.para) d.para = { ml: 0, gk: 0 };
  if ((d.para.gk || 0) >= 10) {
    d.para.gk -= 10;
    d.kurtarmaNotu = 'Çekici gemi 10 Galaktik Keşif Kredisi bedel kesti.';
  } else {
    d.gemi.govde = Math.max(1, d.gemi.govde - Math.round(d.gemi.maxGovde * 0.2));
    d.kurtarmaNotu = 'Kredin olmadığından çekici gemi sessiz rotayı seçemedi; yolda korsan ateşi gövdeyi yüzde yirmi yaraladı.';
  }
  d.gemi.yer = 'kizak';
  d.uzay = null;
  d.sahne = 'kurtarma';
  return { metin: '', imdat: true };
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
  // Dinamik yakıt: kenetlenince zincirleme rotanın yakıtı düşer (son kenetlendiğin halkadan hedefin halkasına).
  // Yalnız ön tarama (kilitli) yakıt yakmaz; eve dönüşte eksik kalan yakıt çekiciyle tamamlanır.
  const e0 = S.enYakin(d);
  let ucret = 0;
  if (e0 && d.uzay && d.gemi) {
    const kg = ZN.kargo(d);
    ucret = (d.karakollar || []).includes(e0.id) ? 0 : S.rotaYakiti(d, e0.id, kg.kapasite ? kg.hacim / kg.kapasite : 0);
  }
  const r = S.kenetlen(d);
  if (ucret > 0 && (r.inis || (r.id && !r.kilitli))) {
    if (d.gemi.yakit < ucret && !r.inis) {
      d.gemi.yakit = 0;
      return acilImdat(d);
    }
    d.gemi.yakit = Math.max(0, d.gemi.yakit - ucret);
    if (r.metin != null && !r.inis) r.metin += ' Rota yakıtı ' + String(ucret).replace('.', ',') + ' litre; tankta ' + Math.round(d.gemi.yakit) + ' litre.';
  }
  if (r.id && !r.kilitli && d.uzay) d.uzay.halka = S.halka(r.id);
  // Otomatik ikmal karakolu: operasyonu bitmiş bir noktaya kurulur; uğrayınca ücretsiz yakıt ve gövde onarımı
  if (r.id && (!r.kilitli || O.opTamamMi(d, r.id)) && d.gemi) {
    if (!d.karakollar) d.karakollar = [];
    if (d.karakollar.includes(r.id)) {
      d.gemi.yakit = d.gemi.maxYakit;
      d.gemi.govde = d.gemi.maxGovde;
      r.metin = (r.metin || '') + ' İkmal karakolu: tank dolduruldu, gövde onarıldı.';
    } else if (O.opTamamMi(d, r.id) && (d.koloni.parcalar.ikmal_karakolu || 0) > 0) {
      d.koloni.parcalar.ikmal_karakolu -= 1;
      d.karakollar.push(r.id);
      d.gemi.yakit = d.gemi.maxYakit;
      r.metin = (r.metin || '') + ' Buraya otomatik ikmal karakolu kuruldu; bundan sonra uğradıkça ücretsiz yakıt ve onarım.';
    } else if (d.bayrak.gz_tamir && O.opTamamMi(d, r.id)) {
      // Automata-Enkaz onarım algoritması: karakolsuz noktada da yüzde on beş ücretsiz onarım
      d.gemi.govde = Math.min(d.gemi.maxGovde, d.gemi.govde + Math.round(d.gemi.maxGovde * 0.15));
    }
  }
  // Gezegen hikâyesi bittiyse atıl kalmaz: belgedeki nöbette yeniden kenetlenince hasat (gezegenHikayeleri.js)
  if (r.id && GEZEGENLER[r.id] && O.opTamamMi(d, r.id) && d.bayrak['gz_' + r.id]) {
    const h = GZ.gezegenHasat(d, r.id);
    if (h) r.metin = (r.metin || '') + ' ' + h.metin;
    if (r.id === 'p11') {
      d.bayrak.yildirimSarj = true;
      r.metin = (r.metin || '') + ' Paratoner platosunda yıldırım toplandı: sonraki savaşa aşırı şarjlı başlarsın.';
    }
  }
  if (r.inis) {
    BN.seferHazirligiBitti(d);
    // Biyo-karantina bölmesi: seferden dönen enfekte ya da lanetli mürettebat anında temizlenir (maruziyet ve kara aether laneti)
    if (SV.sahip(d, 'bolme_a')) {
      d.zehir = 0;
      if ((d.koloni.kaynaklar.kara_aether || 0) > 4) d.koloni.kaynaklar.kara_aether = 4;
    }
    G5.inisSonrasi(d);
    TR.seferBitti(d); // sentetik küp yorgunluğu, erzak etkilerinin sayaçları
    // Kolonide dinlenme: mürettebatın stresi silinir, sefer sayaçları sıfırlanır
    for (const u of d.murettebat) u.stres = 0;
    d.seferSure = 0;
    d.klostrofobiDendi = false;
    d.krizDendi = {};
  }
  // YGK feneri: Tonoflenya'ya hiper-sıçrama (tonoflenya/malken.js)
  if (r.id === 'ygk_feneri' && !r.kilitli) {
    const engel = ZN.sicramaDurumu(d);
    if (engel) return { metin: engel, ses: 'red' };
    ZN.sicramaYakitiHarca(d);
    TM.sicrama(d);
    d.krizDendi = {};
    sicramaZamani(d, ZN.sicramaSuresi(d));
    ZN.sarjBaslat(d);
    return { metin: '', tonoflenya: true };
  }
  // Donanım tamsa ve operasyon yapılmadıysa doğrudan operasyon sahasına girilir
  if (r.id && !r.kilitli && O.opVarMi(r.id) && !O.opTamamMi(d, r.id)) {
    // Keşfedilebilir gezegen yörüngelerinde tanımsız yabancı firkateyn devriyesi (T3+, dinleme kulesi): önce çatışma
    const gez = GEZEGENLER[r.id];
    if (gez && d.bayrak.firkateynTemas && SV.oyuncuKademesi(d) >= 3 && d.koloni.binalar.includes('sinyal_kulesi') && !d.bayrak['devriye_' + r.id] && ((d.tohum || 1) * 7 + r.id.charCodeAt(2)) % 3 === 0) {
      d.bayrak['devriye_' + r.id] = true;
      d.uzay.hiz = 0;
      d.savasBekle = 'yabanci_firkateyn';
      d.opBekle = r.id;
      return { metin: 'Dinleme kulesi uyarıyor: ' + gez.ad + ' yörüngesinde tanımsız yabancı firkateyn devriyesi! Melodik bir rezonans vızıltısı yaklaşıyor.', ses: 'red' };
    }
    r.op = O.opBaslat(d, r.id);
  }
  return r;
}
export const { salonListesi, itibarKademesi } = F;
export const { savasBaslat, savasGirdi, savasIlerle, savasSes } = SV;
export const savasDurumu = SV.durumMetni;
export const { opGirdi, opIlerle, opSes, opDurum, opBaslat, opTamamMi } = O;

// --- Tarım ve Yıldız Zamanı (tarim/tarim.js, zaman.js) ---
export const {
  tarlaAc, tarlaYatak, tarlaGez, tohumSec, tarlaCapa, tarlaEk, tarlaVana, tarlaIsi, tarlaHasat, yatakMetni, yatakSesi, yatakListesi, yatakAdi,
  islemeListesi, isle, isciDegistir, isciTurleri, kademeBilgi, kademeYukselt, melezListesi, melezBaslat, melezFrek, melezDondur, melezSurukle,
  melezIlerle, melezMetni, ansiklopedi, durumMetni: tarimDurumu, girdiMetniT, zamanNotu, CAPA_VURUS,
} = TR;
export const { zamanMetni, nobet, NOBETLER } = Z;

// Hiper-sıçrama: sekiz saat geçer; koloni, tarlalar ve atölyeler o sürede kendi başına ilerler (yönerge 4.B)
export function sicramaZamani(d, sn = TM.SICRAMA_SN) {
  const once = d.koloni.nufus.toplam;
  for (let t = 0; t < sn; t += 60) zamanIlerle(d, 60);
  d.sicramaNotu = 'Yolculuk ' + ZN.sureMetni(sn) + ' sürdü. ' + Z.zamanMetni(d) + (d.koloni.nufus.toplam > once ? ' Koloninin nüfusu ' + d.koloni.nufus.toplam + '.' : '');
}
export const { seferKosullari } = TM;
// Bekleme (sıçrama şarjı): zaman ileri sarılır
function beklemeyiUygula(d, r) {
  if (r && r.bekle) {
    const sn = r.bekle;
    for (let t = 0; t < sn; t += 60) zamanIlerle(d, 60);
    r.metin = ZN.sureMetni(sn) + ' bekledin. Sıçrama motoru şarjlı. ' + Z.zamanMetni(d);
    r.ses = 'sinyal';
    delete r.bekle;
  }
  return r;
}
export { kronikListesi, caglarListesi, kronikAc, KRONIKLER } from '../tonoflenya/kronik';

// Tonoflenya haritası (atlas): uzak yolculuk, Yıldız Zamanı'nı oyun günü olarak ileri sarar
export const { haritaListesi, bolgeSu, BOLGELER, KUSAKLAR, yolBul } = AT;
export function seyahat(d, hedef) {
  const r = AT.seyahatEt(d, hedef);
  if (r.sn) for (let t = 0; t < r.sn; t += 60) zamanIlerle(d, 60);
  return r;
}
