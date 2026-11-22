// Karakter ağları, Tether-Key mekik protokolü, iki aşamalı mürettebat (belgeler/v4/karakter-aglari-murettebat-ve-ygk-
// akademi.txt bölüm 1, 3, 4). Veriler tonoflenya/kisiler.js'te. Saf JavaScript.
//
//   Noktalar k_<id>: haritada konuşulan karakterler (tanış: kodeks, bölge gücüne +5, taslak bilgisi).
//   Mekik (bölüm 4): köprü açıkken (Tonoflenya görülmüş) tanışılmış bir lider ya da usta çağrılır. Bedel: bir Malazar
//   kristal odaklayıcısı, elli birim Fenrir ışık tozu, yirmi beş litre jeotermal soğutucu. İki nöbet kolonide kalır;
//   sonra altı nöbet (T-04 rezonans halkası üretildiyse iki nöbet) bekler. Rıhtımda aynı anda bir misafir.
//   Seçkin kadro (bölüm 1): Akademiye kayıt olunca altı YGK subayı istasyonlara geçer; prosedürel ekip yedek kalır.
import { NOBET_SN } from '../zaman';
import * as ZN from './zanaat';
import * as SB from './subay';
import * as BL from './bolgesel';
import { KARAKTERLER, KARAKTER_SIRASI, karakterDurumu, misafir, GUCLER, GUC_SIRASI, gucItibari, gucBasamagi, gucEkle, evrenEtki, EVREN_ESIKLERI, XARATHIA_NOTU } from './kisiler';
import { K_NOKTALAR, MEKAN } from './karakterHarita';

export { KARAKTERLER, misafir, K_NOKTALAR };

export const MEKIK_BEDELI = { malazar_odagi: 1, isik_tozu: 50, jeotermal_sogutucu: 25 };
export const MEKIK_KALIS = 2; // nöbet
export const MEKIK_BEKLEME = 6;
export const MEKIK_BEKLEME_HALKA = 2;

const simdi = (d) => (d.zaman && d.zaman.sn) || 0;

export function noktaMi(id) {
  return !!K_NOKTALAR[id];
}
export function noktaEylemleri(d, id) {
  const k = KARAKTERLER[K_NOKTALAR[id].karakter];
  // YGK iç dengesi (akademi.js): ihbar edilen Tixie kaçtı
  if (K_NOKTALAR[id].karakter === 'tixie' && d.bayrak.tixieIhbar) return [{ id: 'incele', etiket: 'İncele' }];
  const e = [{ id: 'konus', etiket: 'Konuş' }];
  if (k.mekik && karakterDurumu(d).tanis[K_NOKTALAR[id].karakter]) e.push({ id: 'mekik', etiket: 'Mekikle koloniye davet et', ipucu: mekikIpucu(d, K_NOKTALAR[id].karakter) });
  e.push({ id: 'incele', etiket: 'İncele' });
  return e;
}
export function eylemUygula(d, id, eid) {
  const kid = K_NOKTALAR[id].karakter;
  if (eid === 'incele') return { metin: kid === 'tixie' && d.bayrak.tixieIhbar ? 'Havalandırma ızgarası boş; borulardan yalnız rüzgâr geçiyor. Tixie bir daha görünmedi.' : KARAKTERLER[kid].tarif };
  if (eid === 'mekik') return mekikCagir(d, kid);
  return konus(d, kid);
}

export function konus(d, id) {
  const k = KARAKTERLER[id];
  const kd = karakterDurumu(d);
  const ilk = !kd.tanis[id];
  kd.tanis[id] = true;
  let ek = '';
  if (ilk) {
    gucEkle(d, k.fraksiyon, 5);
    if (!d.kodeks.some((x) => x.id === 'kisi_' + id)) {
      d.kodeks.push({ id: 'kisi_' + id, ad: k.ad, tarif: k.unvan + '. ' + k.tarif, itibar: 10 });
      d.itibar += 10;
    }
    ek = ' ' + GUCLER[k.fraksiyon] + ' seni tanıdı.';
    if (k.taslak && ZN.TARIFLER[k.taslak]) ek += ' Taslak: ' + ZN.adi(k.taslak) + '. Başında ' + k.ad + ' olursa yüzde yirmi beş ucuz ve usta işi.';
    if (k.mekik) ek += ' Köprü açıksa mekikle koloniye davet edebilirsin.';
  }
  if (id === 'valen' && d.bayrak.valenKapali) return { metin: 'Valen Lazeria\'nın yeri boş. Konsey Vekili Morvenna Kael\'in sesi salonda: "Rektör eksi dördüncü kattaki stasis hücresinde, Kaptan. Akademi artık benim tutanaklarımla yönetiliyor; işlerin aksamayacak."' };
  return { metin: k.soz + ek, ses: ilk ? 'sinyal' : undefined };
}

// --- Mekik ---
export function mekikKosulu(d, id) {
  const k = KARAKTERLER[id];
  const kd = karakterDurumu(d);
  if (!k.mekik) return k.ad + ' akademiden ayrılmaz.';
  if (!d.bayrak.tonoflenyaGoruldu) return 'Kuantum köprüsü henüz açılmadı: önce Tonoflenya\'ya sıçra.';
  if (!kd.tanis[id]) return 'Önce ' + k.ad + ' ile tanış.';
  const bl = BL.mekikKilidi(d, id);
  if (bl) return bl;
  if (kd.misafir === id) return k.ad + ' zaten kolonide.';
  if (kd.misafir) return 'Mekik rıhtımında yer yok: ' + KARAKTERLER[kd.misafir].ad + ' kolonide.';
  const b = kd.bekleme[id] || 0;
  if (b > simdi(d)) return k.ad + ' Tonoflenya\'da işlerine döndü; ' + Math.ceil((b - simdi(d)) / NOBET_SN) + ' nöbet sonra yeniden çağrılabilir.';
  const eksik = Object.keys(MEKIK_BEDELI).filter((x) => ZN.miktar(d, x) < MEKIK_BEDELI[x]);
  if (eksik.length) return 'Mekik bedeli eksik: ' + eksik.map((x) => MEKIK_BEDELI[x] + ' ' + ZN.adi(x)).join(', ') + '.';
  return null;
}
function mekikIpucu(d, id) {
  const k = mekikKosulu(d, id);
  return k || 'Bedel: bir Malazar kristal odaklayıcısı, elli ışık tozu, yirmi beş litre jeotermal soğutucu. İki nöbet kalır. ' + (KARAKTERLER[id].etki || '');
}
export function mekikCagir(d, id) {
  const k = mekikKosulu(d, id);
  if (k) return { metin: k, ses: 'red' };
  for (const x of Object.keys(MEKIK_BEDELI)) ZN.ekle(d, x, -MEKIK_BEDELI[x]);
  const kd = karakterDurumu(d);
  kd.misafir = id;
  kd.bitis = simdi(d) + MEKIK_KALIS * NOBET_SN;
  gozetmenGuncelle(d);
  const c = KARAKTERLER[id];
  return { metin: 'Tether-Key mekiği aether rölesinden koptu. ' + c.ad + ' Aethelis-IV\'ün mekik rıhtımında. İki nöbet kalacak. ' + (c.etki || ''), ses: 'kalkis' };
}
// Her karede: misafirin süresi dolunca Tonoflenya'ya döner (gorevler.zamanIlerle)
export function karakterIlerle(d) {
  const kd = karakterDurumu(d);
  if (kd.misafir && simdi(d) >= kd.bitis) {
    const id = kd.misafir;
    kd.misafir = null;
    const halka = ZN.miktar(d, 'rezonans_halkasi') > 0 || (d.gemi && d.gemi.moduller && d.gemi.moduller.rezonans_halkasi);
    kd.bekleme[id] = simdi(d) + (halka ? MEKIK_BEKLEME_HALKA : MEKIK_BEKLEME) * NOBET_SN;
    SB.haber(d, KARAKTERLER[id].ad + ' mekikle Tonoflenya\'ya döndü. ' + (halka ? 'Rezonans halkası sayesinde iki nöbet sonra yeniden çağrılabilir.' : 'Altı nöbet sonra yeniden çağrılabilir.'));
  }
  gozetmenGuncelle(d);
  seckinKadro(d);
}

// Gözetmenler: misafir; akademidekiler YGK katlarındayken; bölge ustaları kendi bölgelerindeyken
export function gozetmenGuncelle(d) {
  const kd = karakterDurumu(d);
  const g = { ...(d.gozetmenAta || {}) };
  if (kd.misafir) g[kd.misafir] = true;
  const m = d.mekan || '';
  for (const id of Object.keys(kd.tanis)) {
    const k = KARAKTERLER[id];
    if (!k) continue;
    if (k.ygk && m.indexOf('ygk_') === 0) g[id] = true;
    else if (!k.ygk && m === k.yer[0]) g[id] = true;
  }
  d.gozetmen = g;
  return g;
}

// İki aşamalı mürettebat: Akademiye kaydolunca altı seçkin subay köprüye geçer (bir kez)
export function seckinKadro(d) {
  if (!d.bayrak.ygkKayit || d.bayrak.seckinKadro || !d.gemi) return false;
  d.bayrak.seckinKadro = true;
  for (const k of SB.SUBAY_SIRASI) {
    const v = SB.istasyonlar(d)[SB.SUBAYLAR[k].istasyon];
    if (!(v && v.anahtar === k)) ZN.cekirdekAl(d, k);
  }
  SB.haber(d, 'YGK Seçkin Subay Kadrosu gemine katıldı: Elyndra, Varek, Axira, Zhaor, Sinha ve Başçavuş Drahmir. Aethelis\'in prosedürel ekibi yedek ve yardımcı ekibe geçti.');
  return true;
}
export function zhaorDumende(d) {
  const v = d.istasyonlar && d.istasyonlar.dumen;
  return !!(v && v.anahtar === 'zhaor');
}

// --- Menü (ağaç) ---
export function karakterMenu(d) {
  const kd = karakterDurumu(d);
  const ee = evrenEtki(d);
  const sonraki = EVREN_ESIKLERI[ee.kademe + 1];
  return {
    baslik: 'Karakter ağı, mekik ve itibar',
    giris: (kd.misafir ? KARAKTERLER[kd.misafir].ad + ' mekik rıhtımında, ' + Math.max(0, Math.ceil((kd.bitis - simdi(d)) / NOBET_SN)) + ' nöbet daha kalacak. ' : 'Mekik rıhtımı boş. ') + 'Evren itibarı ' + d.itibar + (sonraki ? ', sıradaki kademe ' + sonraki : '') + '.',
    ogeler: [
      { id: 'kisiler', etiket: 'Kilit karakterler', alt: (x) => ({
        baslik: 'Kilit karakterler',
        giris: XARATHIA_NOTU,
        ogeler: KARAKTER_SIRASI.map((id) => {
          const k = KARAKTERLER[id];
          const t = karakterDurumu(x).tanis[id];
          const yer = MEKAN(k.yer[0]);
          return {
            id,
            etiket: k.ad + ', ' + k.unvan + '. ' + (yer ? yer.ad : '') + '. ' + (t ? 'Tanışıldı.' : 'Henüz tanışılmadı.') + (k.etki ? ' Mekikte: ' + k.etki : ''),
            ipucu: k.mekik && t ? mekikIpucu(x, id) : undefined,
            yap: k.mekik && t ? (y) => mekikCagir(y, id) : (y) => ({ metin: k.tarif }),
          };
        }),
      }) },
      { id: 'guc', etiket: 'Tonoflenya bölge itibarı', alt: (x) => ({
        baslik: 'Beş ana güç',
        giris: 'Eksi yüz ile artı yüz arası.',
        ogeler: GUC_SIRASI.map((g) => {
          const p = gucItibari(x, g);
          return { id: g, etiket: GUCLER[g] + ': ' + p + ', ' + gucBasamagi(p) + '.' };
        }),
      }) },
      { id: 'evren', etiket: 'Evren itibarı kademesi ' + (ee.kademe + 1), alt: (x) => ({
        baslik: 'Evren itibarı',
        giris: 'Harcanmaz; eşik açtıkça güçlenir.',
        ogeler: [
          { id: 'k1', etiket: 'Kademe 1, sıfır: Bilinmeyen Kazazede. Ek bonus yok.' },
          { id: 'k2', etiket: 'Kademe 2, bin: Tanınan Kâşif. Taramalar yüzde on beş hızlı, pazarlarda yüzde on avantaj, koloni moraline artı beş.' },
          { id: 'k3', etiket: 'Kademe 3, beş bin: Galaktik Öncü. Araştırma yüzde yirmi beş hızlı, pazar yüzde on beş; korsanlar adını tanır: korkutup kaçırma ya da yüzde otuz beş canda teslim. Beş ana güç artı on.' },
          { id: 'k4', etiket: 'Kademe 4, on iki bin: Evrenin Muhafızı. Pazar yüzde yirmi beş, araştırma yüzde otuz beş, bütün savaşlarda yüzde on savunma; Konsey ve ambargo ikna testlerinde sözün geçer.' },
        ],
      }) },
    ],
  };
}
