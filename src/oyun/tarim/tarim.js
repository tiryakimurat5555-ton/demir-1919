// Tarım motoru (belgeler/tarim-ve-kseno-botanik-rehberi.md; geliştirici yönergesi bölüm 3). Saf JavaScript.
//
// d.tarim = {
//   kademe       sera kademesi 1-4 (bitkiler.js KADEMELER)
//   yataklar     seradaki yataklar [{ ortam: 'teras'|'kubbe', bitki, buyume 0-1, su %, isi °C, saglik 0-1, capa, capali,
//                isci, haber, durum }]
//   vaha         saklı vahanın açık toprak parselleri (aynı yapı, ortam 'vaha')
//   tohumlar     { bitki: adet }      urun  { bitki: hasat adedi }      erzak { tarif: hazır adet }
//   besin        { vaelin, kithron: öğün }   besli { topluluk: true|false }
//   kulucka      melez kuluçkası { id, kalan sn } | null
//   verilen      tohumu verilmiş uzay görevleri; kese, kasa: ilk tohumlar verildi mi; toplandi { nokta: d.sure }
// }
// d.tarla: tarla katmanı açıkken { alan: 'sera'|'vaha', i, sec }. d.melez: rezonans eşleme açıkken.
import { BITKILER, BITKI_SIRASI, KATEGORI_ADI, ORTAM_ADI, KADEMELER, VAHA_PARSEL, ISLEME, ISLEME_TESISI, TOPLULUKLAR, ISCI_TURLERI, SPOR_KRISTAL, HIBRITLER, yetisirMi, hibritBul } from './bitkiler';
import { nobetNo, yildizCarpani, mevsimCarpani, etkiCarpani } from '../zaman';
import * as SB from '../tonoflenya/subay';
import { misafir } from '../tonoflenya/kisiler';

export const DONGU_SN = 300; // bir koloni döngüsü (bitkilerin olgunlaşma birimi): nöbetin dörtte biri
const SU_KAYIP = 15; // döngü başına buharlaşma (yüzde)
const SU_PAY = 15;
const ISI_PAY = { teras: 5, vaha: 5, kubbe: 30 };
const ISI_ADIM = { teras: 2, vaha: 2, kubbe: 20 };
const ISI_SINIR = { teras: [0, 45], vaha: [0, 45], kubbe: [-200, 400] };
const ORTAM_ISI = 14; // ısıtılmayan terasın kendiliğinden soğuduğu sıcaklık (gece 6)
export const CAPA_VURUS = 3;
export const BESLEME_SN = 300;
export const TOPLAMA_SN = 600; // yabani bir bitkiden yeniden tohum toplanabilmesi

// Yabani tohum noktaları (harita.js NOKTALAR'da; tarım: id)
export const YABANI = {
  yabani_mantar: 'obsidyen_mantari',
  yabani_liken: 'fosforlu_liken',
  yabani_sarmasik: 'kukurt_sarmasigi',
  yabani_hurma: 'vaha_hurmasi',
  yabani_bazalt: 'bazalt_koku',
};

const bosYatak = (ortam) => ({ ortam, bitki: null, buyume: 0, su: 50, isi: ortam === 'kubbe' ? 20 : 18, saglik: 1, capa: 0, capali: false, isci: null, haber: false, durum: 'bos' });

export function tarim(d) {
  if (!d.tarim) d.tarim = { kademe: 1, yataklar: [], vaha: [], tohumlar: {}, urun: {}, erzak: {}, besin: {}, besli: {}, kulucka: null, verilen: [], toplandi: {} };
  const t = d.tarim;
  const k = KADEMELER[t.kademe];
  const teras = t.yataklar.filter((y) => y.ortam === 'teras').length;
  const kubbe = t.yataklar.filter((y) => y.ortam === 'kubbe').length;
  for (let i = teras; i < k.teras; i++) t.yataklar.push(bosYatak('teras'));
  for (let i = kubbe; i < k.kubbe; i++) t.yataklar.push(bosYatak('kubbe'));
  // Teraslar önce, bölmeler sonra
  t.yataklar.sort((a, b) => (a.ortam === b.ortam ? 0 : a.ortam === 'teras' ? -1 : 1));
  while (t.vaha.length < VAHA_PARSEL) t.vaha.push(bosYatak('vaha'));
  return t;
}

export function acikMi(d) {
  return !!d.bayrak.sondaj;
}
export function vahaAcikMi(d) {
  return !!d.bayrak.vahaBulundu;
}

const ad = (b) => (BITKILER[b] ? BITKILER[b].ad : b);
const kisaAd = (b) => ad(b).split(' (')[0];
function ekle(nesne, k, n) {
  nesne[k] = (nesne[k] || 0) + n;
}

export function yatakListesi(d, alan) {
  const t = tarim(d);
  return alan === 'vaha' ? t.vaha : t.yataklar;
}
export function yatakAdi(y, i) {
  return (y.ortam === 'kubbe' ? 'Kseno-bölme ' : y.ortam === 'vaha' ? 'Parsel ' : 'Yatak ') + (i + 1);
}

// Yatağın sesi: ekran bunu çalar (kuru, curuk, saglikli, olgun, bos)
export function yatakSesi(y) {
  if (!y.bitki) return 'bos';
  if (y.buyume >= 1) return 'olgun';
  if (y.durum === 'kuru' || y.durum === 'soguk') return 'kuru';
  if (y.durum === 'curuk' || y.durum === 'sicak') return 'curuk';
  return 'saglikli';
}

export function yatakMetni(d, y, i) {
  const b = y.bitki ? BITKILER[y.bitki] : null;
  const p = [yatakAdi(y, i) + ':'];
  if (!b) {
    p.push(y.capali ? 'çapalanmış, boş; tohum ekilebilir.' : 'boş; ekmeden önce toprağı çapala.');
  } else if (y.buyume >= 1) {
    p.push(kisaAd(y.bitki) + ' hasada hazır: ' + b.olgun + '.');
  } else {
    p.push(kisaAd(y.bitki) + ', yüzde ' + Math.floor(y.buyume * 100) + ' büyüdü.');
    if (y.durum === 'kuru') p.push('Susuz kalıyor; toprak kuru yaprak gibi çatırdıyor.');
    else if (y.durum === 'curuk') p.push('Fazla su; kökler çürüyor, balçık şapırdıyor.');
    else if (y.durum === 'soguk') p.push('Çok soğuk; büyüme durdu.');
    else if (y.durum === 'sicak') p.push('Çok sıcak; yapraklar kavruluyor.');
    else p.push('Dengede; damla sulama şıpırdıyor.');
    if (y.saglik < 0.5) p.push('Sağlığı yüzde ' + Math.round(y.saglik * 100) + '.');
  }
  p.push('Su yüzde ' + Math.round(y.su) + ', ' + Math.round(y.isi) + ' derece' + (b ? ' (istediği su ' + b.su + ', sıcaklık ' + b.isi + ').' : '.'));
  if (y.isci) p.push('Otomatik bakımda: ' + ISCI_TURLERI[y.isci].ad + ' yönetiyor.');
  return p.join(' ');
}

// --- Zaman: büyüme, buharlaşma, soğuma, işçiler, kuluçka, beslenme, tohum hediyeleri ---
export function tarimIlerle(d, dt) {
  const olaylar = [];
  if (!acikMi(d)) return olaylar;
  const t = tarim(d);
  const nb = nobetNo(d);
  // Kolonistlerin getirdiği ilk tohum kesesi: tarım alanına ilk girişte
  if (!t.kese && d.mekan === 'tarim') {
    t.kese = true;
    ekle(t.tohumlar, 'don_kiran', 2);
    ekle(t.tohumlar, 'akifer', 2);
    olaylar.push({ acil: true, metin: 'Hekim telsizden: "Kapsülden getirdiğimiz tohum kesesini konsolun yanına bıraktım Kaptan: iki Don Kıran yumrusu, iki Akifer buğdayı. Vanguard enkazında daha fazlası olmalı."' });
  }
  // Derin uzay tohumları: görev tamamlanınca iki tohum
  for (const id of BITKI_SIRASI) {
    const b = BITKILER[id];
    if (!b.op || t.verilen.includes(b.op) || !(d.tamamlananOp || []).includes(b.op)) continue;
    t.verilen.push(b.op);
    ekle(t.tohumlar, id, 2);
    olaylar.push({ tur: 'tarim', metin: 'Kseno-botanik: görevden iki ' + b.ad + ' tohumu geldi. ' + (b.ortam === 'kubbe' ? 'Kseno-habitat bölmesinde yetişir.' : 'Jeotermal terasta yetişir.') });
  }
  const k4 = t.kademe >= 4;
  const yesil = nb === 2 ? 1.25 : 1;
  const gece = nb >= 4;
  const hepsi = [...t.yataklar, ...(vahaAcikMi(d) ? t.vaha : [])];
  hepsi.forEach((y) => {
    if (!y.bitki) return;
    const b = BITKILER[y.bitki];
    // Isıtılmayan teras (kademe 1) ortam sıcaklığına kayar; gece daha soğuk
    if (y.ortam === 'teras' && t.kademe < 2) {
      const hedef = gece ? ORTAM_ISI - 8 : ORTAM_ISI;
      const fark = hedef - y.isi;
      y.isi += Math.sign(fark) * Math.min(Math.abs(fark), (3 * dt) / DONGU_SN);
    }
    if (y.buyume >= 1) {
      // Kolonist olgun ürünü kendisi toplar ve aynı tohumdan yeniden eker
      if (y.isci) {
        const h = hasatEt(d, y);
        if (h) olaylar.push({ tur: 'tarimSessiz' });
      }
      return;
    }
    if (y.isci) {
      y.su = b.su;
      y.isi = b.isi;
    } else {
      y.su = Math.max(0, y.su - (SU_KAYIP * dt) / DONGU_SN);
    }
    const once = y.durum;
    const pay = ISI_PAY[y.ortam];
    if (y.su < b.su - SU_PAY) y.durum = 'kuru';
    else if (y.su > b.su + SU_PAY) y.durum = 'curuk';
    else if (y.isi < b.isi - pay) y.durum = 'soguk';
    else if (y.isi > b.isi + pay) y.durum = 'sicak';
    else y.durum = 'denge';
    if (y.durum === 'denge') {
      let c = yesil * (k4 && y.ortam !== 'vaha' ? 1 / 0.6 : 1);
      if (y.isci === 'insan' && b.kat === 'A') c *= 1.2;
      // Axira (büyüme süresi yüzde yirmi kısa), Yeşil el kabiliyeti, biyo-habitat iklim kubbesi
      c *= SB.tarimCarpani(d) * (d.gemi && d.gemi.moduller.iklim_kubbesi ? 1.3 : 1) * (d.bayrak.yan_gubre ? 1.25 : 1) * (misafir(d, 'mirelza') ? 1.3 : 1) * (d.bayrak.doguUzmanlari ? 1.1 : 1) * (d.bayrak.gz_enzim ? 1.15 : 1) * mevsimCarpani(d, 'tarla') * etkiCarpani(d, 'tarla'); // Filiz mevsimi (v5 3A); Mirelza'nın şarkısı; doğudan kurtarılan uzmanlar
      y.buyume = Math.min(1, y.buyume + (dt * c) / (b.dongu * DONGU_SN));
      y.saglik = Math.min(1, y.saglik + (0.1 * dt) / DONGU_SN);
      if (y.buyume >= 1 && !y.haber) {
        y.haber = true;
        olaylar.push({ tur: 'tarim', hazir: true, metin: 'Tarım: ' + kisaAd(y.bitki) + ' hasada hazır (' + (y.ortam === 'vaha' ? 'saklı vaha' : 'sera') + ').' });
      }
    } else {
      y.saglik -= (0.25 * dt) / DONGU_SN;
      if (once === 'denge' && !y.isci) olaylar.push({ tur: 'tarim', metin: 'Tarım: ' + kisaAd(y.bitki) + ' ' + ({ kuru: 'susuz kalıyor', curuk: 'fazla sudan çürüyor', soguk: 'üşüyor', sicak: 'aşırı ısınıyor' })[y.durum] + '.' });
      if (y.saglik <= 0) {
        olaylar.push({ tur: 'tarim', metin: 'Tarım: ' + kisaAd(y.bitki) + ' öldü; yatak boşaldı.' });
        Object.assign(y, { bitki: null, buyume: 0, saglik: 1, capali: false, capa: 0, haber: false, durum: 'bos' });
      }
    }
  });
  // Melez kuluçkası
  if (t.kulucka) {
    t.kulucka.kalan -= dt;
    if (t.kulucka.kalan <= 0) {
      ekle(t.tohumlar, t.kulucka.id, 2);
      olaylar.push({ tur: 'tarim', melez: true, metin: 'Kuluçka tüpü açıldı: iki ' + ad(t.kulucka.id) + ' tohumu hazır.' });
      t.kulucka = null;
    }
  }
  // Beslenme matrisi
  t.besleme = (t.besleme || 0) + dt;
  if (t.besleme >= BESLEME_SN) {
    t.besleme -= BESLEME_SN;
    olaylar.push(...besle(d));
  }
  return olaylar;
}

function besle(d) {
  const t = tarim(d);
  const o = [];
  for (const id of Object.keys(TOPLULUKLAR)) {
    const tp = TOPLULUKLAR[id];
    if (!tp.var(d)) continue;
    let yedi = false;
    if (tp.besin && (t.besin[tp.besin] || 0) > 0) {
      t.besin[tp.besin] -= 1;
      yedi = true;
    } else {
      const secim = tp.yiyebilir.filter((x) => (t.urun[x] || 0) > 0).sort((a, b) => t.urun[b] - t.urun[a])[0];
      if (secim) {
        t.urun[secim] -= 1;
        yedi = true;
      }
    }
    const once = t.besli[id];
    t.besli[id] = yedi;
    if (yedi) d.koloni.moral = Math.min(100, d.koloni.moral + 1);
    else if (id !== 'insan') {
      d.koloni.moral = Math.max(0, d.koloni.moral - 2);
      if (once !== false) o.push({ tur: 'tarim', metin: 'Beslenme: ' + tp.ad + ' aç. Uygun gıda yok; işler aksıyor, moral düşüyor. Yiyebildikleri: ' + tp.yiyebilir.map(kisaAd).join(', ') + '.' });
    }
  }
  return o;
}
export function besliMi(d, id) {
  return !!(d.tarim && d.tarim.besli[id]);
}

export function besinMetni(d) {
  const t = tarim(d);
  const p = [];
  for (const id of Object.keys(TOPLULUKLAR)) {
    const tp = TOPLULUKLAR[id];
    if (!tp.var(d)) continue;
    p.push(tp.ad + ': ' + (t.besli[id] ? 'tok. ' + tp.katki : t.besli[id] === false ? 'aç.' : 'henüz öğün yok.') + ' Yiyebildikleri: ' + tp.yiyebilir.map(kisaAd).join(', ') + '.' + (tp.yasak.length ? ' Ölümcül: ' + tp.yasak.map(kisaAd).join(', ') + '.' : ''));
  }
  return 'Her beş dakikada her topluluk bir öğün yer; koloni bilgisayarı uygun hasadı kendisi seçer, yasak gıdayı asla vermez. ' + p.join(' ');
}

// --- Tarla katmanı (bölüm 4: dokunsal jestler) ---
export function tarlaAc(d, alan) {
  tarim(d);
  d.tarla = { alan, i: 0, sec: 0 };
  return d.tarla;
}
export function tarlaYatak(d) {
  const l = yatakListesi(d, d.tarla.alan);
  return l[d.tarla.i];
}
export function tarlaGez(d, fark) {
  const l = yatakListesi(d, d.tarla.alan);
  d.tarla.i = (d.tarla.i + fark + l.length) % l.length;
  return yatakMetni(d, l[d.tarla.i], d.tarla.i);
}
export function uygunTohumlar(d, y) {
  const t = tarim(d);
  return BITKI_SIRASI.filter((b) => (t.tohumlar[b] || 0) > 0 && yetisirMi(b, y.ortam));
}
export function tohumSec(d) {
  const y = tarlaYatak(d);
  const l = uygunTohumlar(d, y);
  if (!l.length) return { metin: 'Bu yatağa uygun tohum yok. ' + tohumMetni(d), ses: 'red' };
  d.tarla.sec = (d.tarla.sec + 1) % l.length;
  const b = l[d.tarla.sec];
  return { metin: 'Seçili tohum: ' + ad(b) + ', ' + d.tarim.tohumlar[b] + ' tane. İstediği su ' + BITKILER[b].su + ', sıcaklık ' + BITKILER[b].isi + ' derece.' };
}
export function tarlaCapa(d) {
  const y = tarlaYatak(d);
  if (y.bitki) return { metin: 'Bu yatakta ' + kisaAd(y.bitki) + ' var; çapa köklere zarar verir.', ses: 'red' };
  if (y.capali) return { metin: 'Toprak zaten havalandı. Çift dokun: tohum ek.' };
  y.capa += 1;
  if (y.capa >= CAPA_VURUS) {
    y.capali = true;
    return { metin: 'Toprak gevşedi, havalandı. Çift dokun: tohum ek.', ses: 'capa', bitti: true };
  }
  return { metin: '', ses: 'capa' };
}
export function tarlaEk(d) {
  const y = tarlaYatak(d);
  if (y.bitki) return { metin: 'Yatak dolu: ' + kisaAd(y.bitki) + '.', ses: 'red' };
  if (!y.capali) return { metin: 'Önce toprağı çapala: iki parmakla üç kez yukarı ya da aşağı sürt.', ses: 'red' };
  const l = uygunTohumlar(d, y);
  if (!l.length) return { metin: 'Bu yatağa uygun tohum yok. ' + tohumMetni(d), ses: 'red' };
  const b = l[Math.min(d.tarla.sec, l.length - 1)];
  d.tarim.tohumlar[b] -= 1;
  Object.assign(y, { bitki: b, buyume: 0, saglik: 1, haber: false, durum: 'denge' });
  return { metin: ad(b) + ' ekildi. İstediği su yüzde ' + BITKILER[b].su + ', sıcaklık ' + BITKILER[b].isi + ' derece. ' + BITKILER[b].dongu + ' döngüde olgunlaşır.', ses: 'ekme' };
}
export function tarlaVana(d, radyan) {
  const y = tarlaYatak(d);
  const once = Math.round(y.su);
  y.su = Math.max(0, Math.min(100, y.su + radyan * 12));
  return Math.round(y.su) !== once ? Math.round(y.su) : null;
}
export function tarlaIsi(d, yon) {
  const y = tarlaYatak(d);
  const [a, b] = ISI_SINIR[y.ortam];
  y.isi = Math.max(a, Math.min(b, Math.round(y.isi) + yon * ISI_ADIM[y.ortam]));
  return { metin: Math.round(y.isi) + ' derece.', ses: yon > 0 ? 'isitici' : 'sogutucu' };
}
function hasatEt(d, y) {
  const t = tarim(d);
  const b = BITKILER[y.bitki];
  const n = b.kat === 'A' ? 3 : 2;
  ekle(t.urun, y.bitki, n);
  let tohum = 1;
  if (y.isci === 'kaelith') {
    if (SPOR_KRISTAL.includes(y.bitki)) tohum += 1;
    t.kaelithSayac = (t.kaelithSayac || 0) + 1;
    if (t.kaelithSayac % 3 === 0) tohum += 1; // yüzde otuz fazla geri kazanım
  }
  ekle(t.tohumlar, y.bitki, tohum);
  const bitki = y.bitki;
  Object.assign(y, { bitki: null, buyume: 0, saglik: 1, capali: !!y.isci, capa: 0, haber: false, durum: 'bos' });
  // İşçi aynı tohumdan yeniden eker
  if (y.isci && (t.tohumlar[bitki] || 0) > 0) {
    t.tohumlar[bitki] -= 1;
    Object.assign(y, { bitki, durum: 'denge' });
  }
  return { bitki, n, tohum };
}
export function tarlaHasat(d) {
  const y = tarlaYatak(d);
  if (!y.bitki) return { metin: 'Yatak boş.', ses: 'red' };
  if (y.buyume < 1) return { metin: kisaAd(y.bitki) + ' henüz olgun değil: yüzde ' + Math.floor(y.buyume * 100) + '.', ses: 'red' };
  const h = hasatEt(d, y);
  SB.ekolKazan(d, 'axira', 3);
  return { metin: 'Hasat: ' + h.n + ' ' + BITKILER[h.bitki].urun + ', ' + h.tohum + ' tohum geri kazanıldı.', ses: 'hasat' };
}

// --- Tohum ambarı, hasat deposu ---
export function tohumMetni(d) {
  const t = tarim(d);
  const l = BITKI_SIRASI.filter((b) => (t.tohumlar[b] || 0) > 0);
  return l.length ? 'Tohum ambarı: ' + l.map((b) => t.tohumlar[b] + ' ' + kisaAd(b)).join(', ') + '.' : 'Tohum ambarı boş.';
}
export function depoMetni(d) {
  const t = tarim(d);
  const l = BITKI_SIRASI.filter((b) => (t.urun[b] || 0) > 0);
  const e = ISLEME.filter((x) => (t.erzak[x.id] || 0) > 0);
  return (l.length ? 'Hasat deposu: ' + l.map((b) => t.urun[b] + ' ' + BITKILER[b].urun).join(', ') + '.' : 'Hasat deposu boş.') + (e.length ? ' Hazır erzak: ' + e.map((x) => t.erzak[x.id] + ' ' + x.ad).join(', ') + '. Kalkışta her birinden biri gemiye yüklenir.' : '');
}
export function ansiklopedi() {
  return BITKI_SIRASI.map((b) => {
    const x = BITKILER[b];
    return { id: b, etiket: x.ad, ipucu: KATEGORI_ADI[x.kat] + '. ' + ORTAM_ADI[x.ortam] + '; ' + x.dongu + ' döngü; su ' + x.su + ', ' + x.isi + ' derece. Olgunluk sesi: ' + x.olgun + '. Tohumu: ' + x.kaynak };
  });
}

export function durumMetni(d) {
  const t = tarim(d);
  const say = (l) => {
    const ekili = l.filter((y) => y.bitki);
    const hazir = ekili.filter((y) => y.buyume >= 1).length;
    const sorun = ekili.filter((y) => y.buyume < 1 && y.durum !== 'denge').length;
    return l.length + ' yatağın ' + ekili.length + ' tanesi ekili' + (hazir ? ', ' + hazir + ' hasada hazır' : '') + (sorun ? ', ' + sorun + ' bakım istiyor' : '') + '.';
  };
  return KADEMELER[t.kademe].ad + ' (kademe ' + t.kademe + '). Sera: ' + say(t.yataklar) + (vahaAcikMi(d) ? ' Saklı vaha: ' + say(t.vaha) : '') + (t.kulucka ? ' Kuluçkada ' + ad(t.kulucka.id) + '.' : '');
}
// Zaman sorgusuna eklenen tarla notu (yönerge 4.B)
export function zamanNotu(d) {
  if (!d.tarim) return '';
  const l = [...d.tarim.yataklar, ...d.tarim.vaha].filter((y) => y.bitki);
  if (l.some((y) => y.buyume >= 1)) return 'Tarlalarda hasat bekleyen ürün var.';
  if (l.some((y) => y.buyume >= 0.8)) return 'Tarlalarda hasat vakti yaklaşıyor.';
  return '';
}

// --- Kademe yükseltme ---
export function kademeBilgi(d) {
  const t = tarim(d);
  const s = KADEMELER[t.kademe + 1];
  if (!s) return { metin: 'Seralar en üst kademede: ' + KADEMELER[t.kademe].ad + '.', son: true };
  return { metin: 'Sıradaki kademe: ' + s.ad + '. ' + s.tarif, s };
}
export function kademeYukselt(d, harca, yeterMi, girdiMetni) {
  const t = tarim(d);
  const s = KADEMELER[t.kademe + 1];
  if (!s) return { metin: 'Seralar en üst kademede.', ses: 'red' };
  if (s.kosul && !s.kosul(d)) return { metin: s.kosulMetni, ses: 'red' };
  if (!yeterMi(d, s.maliyet)) return { metin: 'Malzeme yetmiyor: ' + girdiMetni(s.maliyet) + ' gerekir.', ses: 'red' };
  harca(d, s.maliyet);
  t.kademe += 1;
  tarim(d);
  return { metin: s.ad + ' kuruldu. ' + s.tarif, ses: 'kur' };
}

// --- Kolonist atama (yönerge 3.B) ---
export function isciTurleri(d) {
  return Object.keys(ISCI_TURLERI).filter((k) => ISCI_TURLERI[k].var(d));
}
export function isciSayisi(d) {
  if (!d.tarim) return 0;
  return [...d.tarim.yataklar, ...d.tarim.vaha].filter((y) => y.isci).length;
}
// Yatağın işçisini sıradaki türe geçirir: yok → insan → kaelith → malken → yok. bosta: boştaki kolonist sayısı
export function isciDegistir(d, alan, i, bosta) {
  const y = yatakListesi(d, alan)[i];
  const turler = isciTurleri(d);
  const sira = [null, ...turler];
  const j = sira.indexOf(y.isci);
  const yeni = sira[(j + 1) % sira.length];
  if (!y.isci && yeni && bosta <= 0) return { metin: 'Boşta kolonist yok. Sanayiden ya da tersaneden birini çek ya da nüfusun artmasını bekle.', ses: 'red' };
  y.isci = yeni;
  d.koloni.nufus.tarim = isciSayisi(d);
  if (!yeni) return { metin: yatakAdi(y, i) + ': kolonist geri çekildi; bakım artık sende.' };
  return { metin: yatakAdi(y, i) + ': ' + ISCI_TURLERI[yeni].ad + ' atandı. ' + ISCI_TURLERI[yeni].bonus + ' Sulama, sıcaklık ve hasat onda.' };
}
export function malkenVarMi(d) {
  return !!d.tarim && [...d.tarim.yataklar, ...d.tarim.vaha].some((y) => y.isci === 'malken');
}

// --- Hasat işleme (bölüm 5) ---
export function tesisVarMi(d, tesis) {
  const b = d.koloni.binalar;
  if (tesis === 'mutfak') return b.includes('koloni_mutfagi');
  if (tesis === 'revir') return b.includes('kseno_eczane') || b.includes('hastane');
  return b.includes('dokumhane');
}
export function girdiMetniT(girdi) {
  return Object.keys(girdi).map((k) => girdi[k] + ' ' + (BITKILER[k] ? BITKILER[k].urun : k)).join(', ');
}
export function islemeListesi(d) {
  const t = tarim(d);
  return ISLEME.map((x) => {
    const yeter = Object.keys(x.girdi).every((k) => (t.urun[k] || 0) >= x.girdi[k]);
    return { ...x, yeter, tesisVar: tesisVarMi(d, x.tesis), hazir: t.erzak[x.id] || 0 };
  });
}
export function isle(d, id) {
  const t = tarim(d);
  const x = ISLEME.find((r) => r.id === id);
  if (!x) return { metin: '', ses: 'red' };
  if (!tesisVarMi(d, x.tesis)) return { metin: ISLEME_TESISI[x.tesis] + ' gerekir. ' + (x.tesis === 'mutfak' ? 'Terminalden Koloni Mutfağı kurulabilir.' : x.tesis === 'revir' ? 'Terminalden Kseno-Eczane kurulabilir.' : 'Önce dökümhane.'), ses: 'red' };
  if (!Object.keys(x.girdi).every((k) => (t.urun[k] || 0) >= x.girdi[k])) return { metin: 'Hasat yetmiyor: ' + girdiMetniT(x.girdi) + ' gerekir.', ses: 'red' };
  for (const k of Object.keys(x.girdi)) t.urun[k] -= x.girdi[k];
  const e = x.etki;
  const iki = (x.id === 'optik_lens' || x.id === 'fotonik_pasta') && besliMi(d, 'kithron') ? 2 : 1;
  const p = [x.ad + (iki > 1 ? ', iki tane (Kithron ustalığı)' : '') + ' hazır.'];
  if (e.sefer) {
    ekle(t.erzak, x.id, iki);
    p.push('Kalkışta gemiye yüklenir.');
  }
  if (e.koloni) {
    if (e.koloni.stres === 0) for (const u of d.murettebat) u.stres = 0;
    if (e.koloni.moral) d.koloni.moral = Math.min(100, d.koloni.moral + e.koloni.moral);
    if (e.koloni.maruziyet === 0) d.zehir = 0;
    if (e.koloni.maruziyetYari) d.zehir = Math.round((d.zehir || 0) / 2);
    p.push(e.koloni.moral ? 'Koloni morali yüzde ' + Math.round(d.koloni.moral) + '.' : e.koloni.stres === 0 ? 'Mürettebatın stresi sıfırlandı.' : 'Maruziyet yüzde ' + Math.round(d.zehir || 0) + '.');
  }
  if (e.kaynak) for (const k of Object.keys(e.kaynak)) d.koloni.kaynaklar[k] = (d.koloni.kaynaklar[k] || 0) + e.kaynak[k];
  if (e.itibar) d.itibar += e.itibar;
  if (e.besin) for (const k of Object.keys(e.besin)) ekle(t.besin, k, e.besin[k]);
  if (e.kalici) {
    if (e.kalici.bayrak) d.bayrak[e.kalici.bayrak] = true;
    const g = d.gemi;
    const art = e.kalici.govde || (e.kalici.halat ? 5 : 0);
    if (art) {
      if (g) {
        g.maxGovde += art;
        g.govde += art;
        p.push('Geminin gövdesi ' + g.maxGovde + '.');
      } else {
        ekle(t.erzak, x.id, 1);
        p.push('Gemi yok; depoda bekliyor.');
      }
    }
  }
  return { metin: p.join(' '), ses: 'kur' };
}

// Kalkışta her hazır erzaktan biri yüklenir; etkisi tarifindeki sefer sayısı kadar (Malken çırağı +1)
export function erzakYukle(d) {
  const t = tarim(d);
  if (!d.seferEtki) d.seferEtki = {};
  const yuk = [];
  const ek = malkenVarMi(d) ? 1 : 0;
  for (const x of ISLEME) {
    if (!x.etki.sefer || !(t.erzak[x.id] > 0)) continue;
    t.erzak[x.id] -= 1;
    for (const k of Object.keys(x.etki.sefer)) d.seferEtki[k] = Math.max(d.seferEtki[k] || 0, x.etki.sefer[k] + ek);
    yuk.push(x.ad);
  }
  if (d.gemi && d.gemi.bekleyenGovde) delete d.gemi.bekleyenGovde;
  d.macunKullanildi = false;
  d.erzakNotu = yuk.length ? 'Gemiye yüklenen erzak: ' + yuk.join(', ') + '.' : '';
  return yuk;
}
// Eve kenetlenince: sentetik küp yorgunluğu ve etki sayaçları
export function seferBitti(d) {
  const e = d.seferEtki || {};
  const notlar = [];
  if (e.rasyon > 0) {
    d.koloni.moral = Math.min(100, d.koloni.moral + 2);
    notlar.push('Malken sefer rasyonları mürettebatı tok ve neşeli tuttu.');
  } else if ((d.seferSure || 0) > 300 && !(e.peksimet > 0)) {
    SB.moralKaybi(d, 3);
    notlar.push('Uzun sefer boyunca sentetik besin küpleri: mürettebat yorgun, moral biraz düştü. Peksimet olsaydı olmazdı.');
  }
  if (d.gemi && d.gemi.moduller.iklim_kubbesi) {
    d.koloni.moral = Math.min(100, d.koloni.moral + 3);
    notlar.push('Geminin iklim kubbesinde yetişenler yabancı yolcuların yüzünü güldürdü.');
  }
  for (const k of Object.keys(e)) if (e[k] > 0) e[k] -= 1;
  d.erzakNotu = notlar.join(' ');
  return notlar;
}

// --- Yabani tohumlar ve tohum kasası ---
export function yabaniMi(id) {
  return !!YABANI[id];
}
export function yabaniTopla(d, id) {
  const t = tarim(d);
  const b = YABANI[id];
  const son = t.toplandi[id];
  if (son != null && (d.sure || 0) - son < TOPLAMA_SN) return { metin: 'Bu bitkiden yakın zamanda tohum aldın; yeniden tohum vermesi için zaman gerek.', ses: 'red' };
  t.toplandi[id] = d.sure || 0;
  ekle(t.tohumlar, b, 2);
  return { metin: 'İki ' + ad(b) + ' tohumu topladın. ' + (acikMi(d) ? 'Tarım alanında ya da saklı vahada ekebilirsin.' : 'Tarım alanı açılınca ekilir.'), ses: 'topla' };
}
export function kasaAc(d) {
  const t = tarim(d);
  if (t.kasa) return { metin: 'Kasalar boş.' };
  t.kasa = true;
  for (const b of ['don_kiran', 'akifer', 'soya', 'noro_kahve', 'aloe']) ekle(t.tohumlar, b, 3);
  return { metin: 'Vanguard-01\'in genetik tohum kasaları: soğuk zincir hâlâ çalışıyor. Don Kıran, Akifer, Soya-Kazein, Nöro-Kahve ve Aloe-Silika; her birinden üç tohum.', ses: 'topla' };
}

// --- Melezleme (bölüm 7) ---
export function melezListesi(d) {
  const t = tarim(d);
  return HIBRITLER.map((h) => ({ ...h, ad: ad(h.id), olur: (t.tohumlar[h.a] || 0) > 0 && (t.tohumlar[h.b] || 0) > 0, girdi: ad(h.a) + ' ve ' + ad(h.b) }));
}
export const MELEZ_ESIK = 0.012; // oktav: tonlar bu kadar yakınsa harmonide
export function melezBaslat(d, id) {
  const t = tarim(d);
  if (!d.koloni.binalar.includes('biyo_kubbe')) return { metin: 'Melezleme için Kseno-Biyoloji Kubbesi gerekir.', ses: 'red' };
  if (t.kulucka) return { metin: 'Kuluçka tüpü dolu: ' + ad(t.kulucka.id) + '.', ses: 'red' };
  const h = HIBRITLER.find((x) => x.id === id);
  if (!h || !((t.tohumlar[h.a] || 0) > 0 && (t.tohumlar[h.b] || 0) > 0)) return { metin: 'İki tohum da gerekli: ' + ad(h.a) + ' ve ' + ad(h.b) + '.', ses: 'red' };
  // Ayarlanan ton ikinci tohumun kendi frekansından başlar; hedef birincinin frekansı
  d.melez = { id, ref: BITKILER[h.a].frek, oktav: Math.log2(BITKILER[h.b].frek / BITKILER[h.a].frek), dengede: 0, yakinDendi: false };
  return { melez: true };
}
export function melezFrek(d) {
  return d.melez.ref * Math.pow(2, d.melez.oktav);
}
export function melezDondur(d, radyan) {
  d.melez.oktav += radyan * 0.25;
}
export function melezSurukle(d, px) {
  d.melez.oktav += px * 0.0015;
}
export function melezIlerle(d, dt) {
  const m = d.melez;
  const o = [];
  const sapma = Math.abs(m.oktav);
  if (sapma < 0.08 && !m.yakinDendi) {
    m.yakinDendi = true;
    o.push('yakin');
  }
  if (sapma < MELEZ_ESIK * yildizCarpani(d, 'aether')) {
    if (m.dengede === 0) o.push('dengede');
    m.dengede += dt;
    if (m.dengede >= 2) {
      const t = tarim(d);
      const h = HIBRITLER.find((x) => x.id === m.id);
      t.tohumlar[h.a] -= 1;
      t.tohumlar[h.b] -= 1;
      t.kulucka = { id: m.id, kalan: 2 * DONGU_SN };
      d.melez = null;
      SB.ekolKazan(d, 'axira', 40);
      o.push('tamam');
    }
  } else m.dengede = 0;
  return o;
}
export function melezMetni(d) {
  const m = d.melez;
  const s = m.oktav;
  if (Math.abs(s) < MELEZ_ESIK) return 'Harmonide; kıpırdama.';
  return (s > 0 ? 'İkinci tohumun tonu ince' : 'İkinci tohumun tonu kalın') + (Math.abs(s) > 1 ? ', birden fazla oktav uzakta.' : Math.abs(s) > 0.2 ? ', uzakta.' : ', yakın.');
}

export { hibritBul, BITKILER };
