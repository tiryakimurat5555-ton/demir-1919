// Ses, metin ve dokunma tabanlı büyü bulmacası motoru (belgeler/v6 Paket 17). Saf JavaScript; ekran Yuzey.js.
//
// Bir bulmaca düğümlerden oluşur. Her düğümün sağ-sol konumu (pan -1..+1), uzaklığı (0..1) ve boşta çalan sesi vardır;
// oyuncu sağa-sola kaydırarak düğümler arasında gezinir, düğümün durumunu dinler, çift dokunup büyü seçer.
// Doğru büyü seçilince kısa bir sesli rezonans ayarı yapılır (sağa-sola kaydırıp iki ton birleşince dokun; Paket 1
// bölüm 4.2); ayar Ayarlar'daki "Kolay büyü" açıkken atlanır.
//
// Düğüm: { id, ad, pan, mesafe, ses, durum, cozuldu, kombolar: [[eleman...]...], sirali, pencere (sn), ipucu,
//          tas: {renk: adet} (heykel), on: [önce çözülmesi gereken düğümler], tehlike: {eleman: {ceza, soz}} }
// Kombinasyon (Paket 17 validCombos): düğüme uygulanan elemanlar bir kombinasyonun hepsini içerince düğüm çözülür;
// sirali ise sıra da tutmalı. Pencere: bir kombinasyonun ilk elemanından sonra kalanlar bu kadar saniyede gelmeli
// (ekran okuyucu için en az 15 sn; Paket 17 bölüm 1.2.2), yoksa düğüm sıfırlanır.
// Sıfır kilitlenme (Paket 2 bölüm 4, Paket 17 1.2.4): yanlış büyü bulmacayı bozmaz, yalnız 5 odak düşer ve ipucu
// verilir; odak biterse "nefes al" bulmacayı sıfırlamadan odak verir; oyuncunun hiçbir kombinasyona gücü yetmiyorsa
// düğümün yedek yolu açılır (fazladan odak ve malzeme bedeli).
//
// d.bulmaca = { id, i (seçili düğüm), uyg: {düğüm: [eleman]}, cozulen: [düğüm], pencere: {düğüm: kalan},
//               hava (seviye), ayar: {el, adim, ref} | null, ogren, nefes, kaliciTas, takilanTas: {renk: n} }
import * as ZN from '../tonoflenya/zanaat';
import * as BY from './buyu';
import { ELEMANLAR, EKOLLER, HAVA, BUYULER, TUREVLER } from './veri';

export const BULMACALAR = {};
export function bulmacaEkle(id, tanim) {
  BULMACALAR[id] = { id, ...tanim };
}
let kolay = false;
export function kolayModAyarla(acik) {
  kolay = !!acik;
}
export const kolayMi = () => kolay;
export const PENCERE_EN_AZ = 15;
export const NEFES_ODAK = 25;

export const aktif = (d) => !!(d.bulmaca && BULMACALAR[d.bulmaca.id]);
export const tanim = (d) => d.bulmaca && BULMACALAR[d.bulmaca.id];
export function bittiMi(d, id) {
  return !!(d.buyu && d.buyu.biten && d.buyu.biten[id] != null);
}
export function dugumler(d) {
  return tanim(d).dugumler;
}
const dugum = (d) => dugumler(d)[d.bulmaca.i];
const uygulanan = (d, n) => d.bulmaca.uyg[n.id] || (d.bulmaca.uyg[n.id] = []);
export const cozulduMu = (d, n) => d.bulmaca.cozulen.includes(n.id);
function acikMi(d, n) {
  return !(n.on || []).some((x) => !d.bulmaca.cozulen.includes(x));
}

// --- Başlat, sürdür, bırak ---
export function baslat(d, id, ek = {}) {
  BY.hazirla(d);
  const t = BULMACALAR[id];
  if (!t) return { metin: 'Bulmaca bulunamadı.', ses: 'red' };
  if (d.savas) return { metin: 'Savaşta büyü kullanılmaz.', ses: 'red' };
  // Yarım bırakılmış aynı bulmaca: kaldığı yerden
  const yarim = d.buyu.yarim && d.buyu.yarim[id];
  if (yarim) {
    d.bulmaca = yarim;
    delete d.buyu.yarim[id];
  } else {
    d.bulmaca = { id, i: 0, uyg: {}, cozulen: [], pencere: {}, hava: t.hava != null ? t.hava : ek.ogren ? 0 : BY.havaSeviyesi(d), ayar: null, ogren: ek.ogren || null, nefes: 0, takilanTas: {} };
    if (t.basla) t.basla(d);
  }
  return { metin: t.ad, buyu: true };
}
// Açılış sözü (katman açılınca)
export function girisMetni(d) {
  const t = tanim(d);
  const g = typeof t.giris === 'function' ? t.giris(d) : t.giris;
  return (Array.isArray(g) ? g.join(' ') : g || '') + ' ' + dugumSayisiMetni(d) + ' Sağa ya da sola kaydır: düğümler. Dokun: durum. Çift dokun: büyü seç. İki parmakla çift dokun: bulmacadan çık, kaldığın yer saklanır.';
}
function dugumSayisiMetni(d) {
  const l = dugumler(d);
  return l.length + ' düğüm: ' + l.map((n) => n.ad + ' ' + yonMetni(n.pan)).join(', ') + '.';
}
export function yonMetni(pan) {
  return pan <= -0.6 ? 'solda' : pan < -0.15 ? 'sol önde' : pan <= 0.15 ? 'tam önde' : pan < 0.6 ? 'sağ önde' : 'sağda';
}
export function birak(d) {
  if (!aktif(d)) return;
  const b = d.bulmaca;
  b.ayar = null;
  if (!b.ogren) {
    if (!d.buyu.yarim) d.buyu.yarim = {};
    d.buyu.yarim[b.id] = b;
  }
  d.bulmaca = null;
}

// --- Gezinti ---
export function dugumMetni(d, n = dugum(d)) {
  const b = d.bulmaca;
  if (cozulduMu(d, n)) return n.ad + ', ' + yonMetni(n.pan) + ': çözüldü. ' + (n.cozuldu || '');
  if (!acikMi(d, n)) return n.ad + ', ' + yonMetni(n.pan) + ': henüz ulaşılamıyor; önce ' + n.on.map((x) => dugumler(d).find((m) => m.id === x).ad).join(' ve ') + '.';
  const u = uygulanan(d, n);
  const durum = typeof n.durum === 'function' ? n.durum(d) : n.durum;
  return n.ad + ', ' + yonMetni(n.pan) + ': ' + durum + (u.length ? ' Uygulanan: ' + u.map((e) => ELEMANLAR[e].ad).join(', ') + '.' : '') + (b.pencere[n.id] != null ? ' Yankı penceresi ' + Math.ceil(b.pencere[n.id]) + ' saniye.' : '');
}
export function dugumDegis(d, yon) {
  const b = d.bulmaca;
  const l = dugumler(d);
  b.i = (b.i + yon + l.length) % l.length;
  b.ayar = null;
  return [{ soz: dugumMetni(d), odak: b.i, ses: 'tik' }];
}
export function durumMetni(d) {
  const b = d.bulmaca;
  const t = tanim(d);
  const kalan = dugumler(d).filter((n) => !cozulduMu(d, n)).length;
  return t.ad + '. ' + dugumMetni(d) + ' Odak ' + d.buyu.odak + '.' + (BY.biliyor(d, 'hava') || b.hava ? ' Hava: ' + BY.havaAdi(b.hava) + '.' : '') + ' Çözülecek ' + kalan + ' düğüm.';
}

// --- Büyü seçimi ---
// Bir eleman şu an kullanılabilir mi (biliniyor mu, şişesi, taşı, eşyası var mı)?
export function elemanHazir(d, el, n) {
  const e = ELEMANLAR[el];
  if (!e) return false;
  const og = d.bulmaca && d.bulmaca.ogren;
  if (e.bilgi && !BY.biliyor(d, e.bilgi) && og !== e.bilgi) return false;
  if (e.tur === 'sise') return BY.siseVarMi(d, e.renk);
  if (e.tur === 'arac') return ZN.miktar(d, e.esya) >= Math.max(1, e.tuketir || 0);
  if (el === 'heykel' && n && n.tas) return Object.keys(n.tas).every((r) => (d.buyu.taslar[r] || 0) + ((d.bulmaca.takilanTas || {})[r] || 0) >= n.tas[r]);
  return true;
}
// Hava elemanı kademe kademe yürünerek elde edilir: bilgi yeterlidir
export function elemanUlasilir(d, el, n) {
  const e = ELEMANLAR[el];
  if (!e) return false;
  if (e.tur === 'hava' || e.tur === 'yildirim') return BY.biliyor(d, 'hava') || (d.bulmaca && d.bulmaca.ogren === 'hava');
  // Şişe: şişeleme biliniyor ve elde şişe ya da boş şişe varsa (toz toplanabilir)
  if (e.tur === 'sise') return BY.biliyor(d, 'siseleme') && (BY.siseVarMi(d, e.renk) || ZN.miktar(d, 'bos_sise') > 0);
  if (el === 'heykel') return BY.biliyor(d, 'heykel');
  return elemanHazir(d, el, n);
}
export function kombinasyonUlasilir(d, n) {
  return n.kombolar.some((c) => c.every((el) => elemanUlasilir(d, el, n)));
}
// Elemanın bu düğümde geçerli olup olmadığı: bir kombinasyonda var, henüz uygulanmamış ve (sıralıysa) öncekiler tamam
function gecerliMi(d, n, el) {
  const u = uygulanan(d, n);
  return n.kombolar.some((c) => {
    if (!c.includes(el)) return false;
    const gereken = c.filter((x) => x === el).length;
    if (u.filter((x) => x === el).length >= gereken) return false;
    if (!u.every((x) => c.includes(x))) return false; // bu kombinasyonla uyuşmayan bir şey uygulanmış
    if (n.sirali) {
      const i = c.indexOf(el);
      return c.slice(0, i).every((x) => u.includes(x));
    }
    return true;
  });
}
function tamamMi(d, n) {
  const u = uygulanan(d, n);
  return n.kombolar.some((c) => {
    const kopya = [...u];
    for (const el of c) {
      const i = kopya.indexOf(el);
      if (i < 0) return false;
      kopya.splice(i, 1);
    }
    return true;
  });
}
// Çift dokununca açılan liste: bilinen büyüler, hava hamleleri, şişeler, araçlar; sonda nefes ve yedek yol
export function secenekler(d) {
  const n = dugum(d);
  const b = d.bulmaca;
  const l = [];
  const ekle = (el, etiket) => {
    if (!elemanHazir(d, el, n)) return;
    const m = BY.maliyet(d, el);
    l.push({ id: el, etiket: etiket || ELEMANLAR[el].ad, ipucu: (m ? m + ' odak.' : ELEMANLAR[el].tur === 'sise' ? 'Şişe: ' + (ELEMANLAR[el].firlat ? 'tamamı tek anda patlar, şişe kırılır.' : 'bir salım.') : '') + (BUYULER[el] ? ' ' + BUYULER[el].islev : '') });
  };
  for (const k of Object.keys(BUYULER)) ekle(k);
  if (BY.biliyor(d, 'hava') || b.ogren === 'hava') {
    const adim = d.buyu.asa >= 2 ? 2 : 1;
    if (b.hava > -4) l.push({ id: 'h_sogut', etiket: 'Havayı soğut: ' + BY.havaAdi(b.hava) + ' iken ' + BY.havaAdi(Math.max(-4, b.hava - adim)), ipucu: BY.maliyet(d, 'hava_serin') * Math.min(adim, b.hava + 4) + ' odak.' });
    if (b.hava < 4) l.push({ id: 'h_isit', etiket: 'Havayı ısıt: ' + BY.havaAdi(b.hava) + ' iken ' + BY.havaAdi(Math.min(4, b.hava + adim)), ipucu: BY.maliyet(d, 'hava_gunes') * Math.min(adim, 4 - b.hava) + ' odak.' });
    for (const k of ['hava_durgun', 'hava_ruzgar', 'hava_kubbe', 'yildirim_dusur']) ekle(k);
  }
  for (const k of ['lumina_salim', 'lumina_firlat', 'solis_salim', 'solis_firlat']) ekle(k, ELEMANLAR[k].ad + ' (' + BY.siseSayisi(d, ELEMANLAR[k].renk) + ' şişe)');
  for (const k of Object.keys(ELEMANLAR)) if (ELEMANLAR[k].tur === 'turev') ekle(k, ELEMANLAR[k].ad + (k === 'heykel' && n.tas ? ': heykel ' + tasIstegi(n.tas) + ' istiyor' : ''));
  for (const k of Object.keys(ELEMANLAR)) if (ELEMANLAR[k].tur === 'arac') ekle(k, ELEMANLAR[k].ad + ' (' + ZN.miktar(d, ELEMANLAR[k].esya) + ')');
  if (d.buyu.odak < 40) l.push({ id: 'nefes', etiket: 'Nefes al ve odak topla', ipucu: 'Bulmacayı sıfırlamadan artı ' + NEFES_ODAK + ' odak; biraz zaman geçer.' });
  if (!cozulduMu(d, n) && acikMi(d, n) && !kombinasyonUlasilir(d, n)) {
    const y = yedek(d, n);
    l.push({ id: 'yedek', etiket: 'Yedek yol: ' + y.ad, ipucu: y.odak + ' odak' + (Object.keys(y.bedel).length ? ' ve ' + bedelMetni(y.bedel) : '') + '. Gereken büyüler sende olmadığında açılır.' });
  }
  return l;
}
function tasIstegi(tas) {
  return Object.keys(tas).map((r) => tas[r] + ' ' + (r === 'kizil' ? 'kızıl' : r === 'sari' ? 'sarı' : r === 'yesil' ? 'yeşil' : r)).join(', ') + ' taş';
}
function bedelMetni(b) {
  return Object.keys(b).map((k) => b[k] + ' ' + ZN.adi(k)).join(', ');
}
function yedek(d, n) {
  const t = tanim(d);
  const y = n.yedek || t.yedek || {};
  return { ad: y.ad || 'Arşiv notlarındaki eski yöntemle, sabırla', odak: y.odak != null ? y.odak : 40, bedel: y.bedel || {}, metin: y.metin || 'Daha yavaş, daha zahmetli ama işe yarıyor.' };
}

// Bir seçim: büyü ya da hamle. Geçerliyse rezonans ayarı açılır (kolay modda doğrudan uygulanır).
export function sec(d, el) {
  const b = d.bulmaca;
  const n = dugum(d);
  if (el === 'nefes') return nefes(d);
  if (el === 'yedek') return yedekUygula(d, n);
  if (cozulduMu(d, n)) return [{ soz: n.ad + ' zaten çözüldü. Başka bir düğüme geç.', ses: 'tik' }];
  if (!acikMi(d, n)) return [{ soz: dugumMetni(d), ses: 'red' }];
  if (el === 'h_sogut' || el === 'h_isit') return havaHamlesi(d, n, el === 'h_sogut' ? -1 : 1);
  const e = ELEMANLAR[el];
  const m = BY.maliyet(d, el);
  if (!b.ogren && d.buyu.odak < m) return [{ soz: 'Odak yetmiyor: ' + m + ' gerekir, ' + d.buyu.odak + ' var. Listeden nefes al ya da odak doldurucu kullan.', ses: 'red', haptik: 'hata' }];
  if (el === 'yildirim_dusur' && b.hava < 3) return [{ soz: 'Yıldırım için önce hava en az Şiddetli Yağmur kademesine çekilmeli. Şimdi ' + BY.havaAdi(b.hava) + '.', ses: 'red', haptik: 'hata' }];
  // Tehlikeli eleman (ör. metanlı tavana kıvılcım): ceza ve sıfırlama
  if (n.tehlike && n.tehlike[el]) {
    const x = n.tehlike[el];
    BY.odakHarca(d, x.ceza || 15);
    b.uyg[n.id] = [];
    delete b.pencere[n.id];
    return [{ soz: x.soz || 'Tehlike! Düğüm sarsıldı ve başa döndü.', ses: 'by_patlama', haptik: 'hata' }];
  }
  if (!gecerliMi(d, n, el)) return yanlis(d, n, el);
  if (kolay || b.ogrenAyarsiz) return uygula(d, n, el);
  const ekol = EKOLLER.find((x) => x.id === (e.ekol || 'ozel'));
  const sapma = 3 + Math.floor(rastgele(d, n.id.length + el.length) * 3);
  b.ayar = { el, adim: rastgele(d, el.length) < 0.5 ? -sapma : sapma, ref: ekol.ref };
  return [{ soz: e.ad + ': rezonans ayarı. Asanın tonu referans tonla çarpışıyor. Sağa ya da sola kaydır; titreşim durulup iki ton tek sese dönünce dokun.', ayar: true, ses: e.ses || 'by_secim' }];
}
function rastgele(d, k) {
  const b = d.buyu;
  b.zar = (b.zar || 0) + 1;
  const x = Math.sin((d.tohum || 1) * 12.9898 + b.zar * 78.233 + k * 1.7) * 43758.5453;
  return x - Math.floor(x);
}
export function ayarFrek(d) {
  const a = d.bulmaca && d.bulmaca.ayar;
  return a ? a.ref * Math.pow(2, a.adim / 24) : 0;
}
export function ayarKaydir(d, yon) {
  const a = d.bulmaca.ayar;
  if (!a) return [];
  a.adim += yon;
  return [{ ayarOldu: true, haptik: a.adim === 0 ? 'tik' : null }];
}
export function ayarDene(d) {
  const b = d.bulmaca;
  const a = b.ayar;
  if (!a) return [];
  if (a.adim !== 0) return [{ soz: Math.abs(a.adim) > 2 ? 'Tonlar hâlâ çok ayrı; titreşim hızlı.' : 'Yaklaştın; titreşim yavaşladı ama durmadı.', ses: 'tik' }];
  b.ayar = null;
  return uygula(d, dugum(d), a.el);
}
export function ayarIptal(d) {
  if (d.bulmaca) d.bulmaca.ayar = null;
  return [{ soz: 'Ayardan vazgeçtin; odak harcanmadı. ' + dugumMetni(d) }];
}

function yanlis(d, n, el) {
  const b = d.bulmaca;
  const ceza = b.ogren ? 0 : Math.min(d.buyu.odak, 5);
  BY.odakHarca(d, ceza);
  return [{ soz: (ceza ? 'Yanlış rezonans; ' + ceza + ' odak boşa gitti. ' : 'Bu düğümde işe yaramıyor. ') + ipucu(d, n, el), ses: 'by_yanlis', haptik: 'hata' }];
}
// Sesli ipucu: düğümün kendi ipucu ya da ulaşılabilir ilk kombinasyonun ekolünden çıkarılan yön
function ipucu(d, n) {
  if (n.ipucu) return typeof n.ipucu === 'function' ? n.ipucu(d) : n.ipucu;
  const c = n.kombolar.find((k) => k.every((el) => elemanUlasilir(d, el, n))) || n.kombolar[0];
  const e = ELEMANLAR[c[0]];
  const ek = EKOLLER.find((x) => x.id === e.ekol);
  return 'Bu düğüm daha çok ' + (ek ? ek.ipucu : 'başka bir şeye') + ' tepki veriyor.';
}

// Hava hamlesi: kademe değişir; yeni kademe bu düğümün bir kombinasyonundaysa sayılır (ara kademeler ceza almaz)
function havaHamlesi(d, n, yon) {
  const b = d.bulmaca;
  const adim = d.buyu.asa >= 2 ? 2 : 1;
  const olaylar = [];
  let kalan = adim;
  while (kalan-- > 0) {
    const yeni = b.hava + yon;
    if (yeni < -4 || yeni > 4) break;
    const el = 'hava_' + HAVA[yeni].id;
    const m = BY.maliyet(d, el);
    if (!b.ogren && d.buyu.odak < m) {
      olaylar.push({ soz: 'Odak yetmiyor: hava hamlesi ' + m + ' odak.', ses: 'red', haptik: 'hata' });
      break;
    }
    if (!b.ogren) BY.odakHarca(d, m);
    b.hava = yeni;
    const soz = 'Hava: ' + BY.havaAdi(yeni) + '.';
    if (gecerliMi(d, n, el)) olaylar.push(...uygula(d, n, el, soz, true));
    else olaylar.push({ soz, ses: yeni >= 3 ? 'by_hava_yagmur' : yon < 0 ? 'by_hava_sogut' : 'by_hava_isit', hava: yeni });
    if (!d.bulmaca || cozulduMu(d, n)) break;
  }
  return olaylar;
}

// Elemanı uygula: bedeli öde, düğüme ekle, tamamlandıysa çöz
function uygula(d, n, el, onSoz, havaZaten) {
  const b = d.bulmaca;
  const e = ELEMANLAR[el];
  const olaylar = [];
  if (!havaZaten) {
    const m = BY.maliyet(d, el);
    if (!b.ogren && m) BY.odakHarca(d, m);
    if (e.tur === 'sise') BY.siseKullan(d, e.renk, e.firlat);
    if (e.tur === 'arac' && e.tuketir) ZN.ekle(d, e.esya, -e.tuketir);
    if (el === 'heykel' && n.tas) {
      for (const r of Object.keys(n.tas)) {
        d.buyu.taslar[r] -= n.tas[r];
        b.takilanTas[r] = (b.takilanTas[r] || 0) + n.tas[r];
      }
    }
    if (e.tur === 'hava' && e.ozel && el === 'hava_durgun') b.hava = 0;
  }
  if (e.bilgi || BUYULER[el]) d.buyu.kullanim[el] = (d.buyu.kullanim[el] || 0) + 1;
  const u = uygulanan(d, n);
  u.push(el);
  if (n.pencere && u.length === 1) b.pencere[n.id] = Math.max(PENCERE_EN_AZ, n.pencere);
  const sesi = e.ses || (e.tur === 'hava' ? (b.hava >= 3 ? 'by_hava_yagmur' : b.hava < 0 ? 'by_hava_sogut' : 'by_hava_isit') : 'by_secim');
  if (tamamMi(d, n)) {
    b.cozulen.push(n.id);
    delete b.pencere[n.id];
    const coz = typeof n.cozuldu === 'function' ? n.cozuldu(d) : n.cozuldu;
    olaylar.push({ soz: (onSoz ? onSoz + ' ' : '') + e.ad + '. ' + (coz || n.ad + ' çözüldü.'), ses: sesi, ses2: 'by_basari', haptik: 'basari', cozuldu: n.id });
    if (dugumler(d).every((m) => cozulduMu(d, m))) olaylar.push(...bitir(d));
    else {
      const sonraki = dugumler(d).findIndex((m) => !cozulduMu(d, m) && acikMi(d, m));
      if (sonraki >= 0) {
        b.i = sonraki;
        olaylar.push({ soz: 'Sıradaki: ' + dugumMetni(d), odak: b.i });
      }
    }
  } else {
    olaylar.push({ soz: (onSoz ? onSoz + ' ' : '') + e.ad + ' tuttu. ' + (n.ara ? (typeof n.ara === 'function' ? n.ara(d, u) : n.ara) : 'Düğüm tepki verdi ama tamamlanmadı; bir hamle daha gerekiyor.'), ses: sesi, haptik: 'tik' });
  }
  return olaylar;
}
function nefes(d) {
  const b = d.bulmaca;
  if (b.nefes >= 3) return [{ soz: 'Burada yeterince nefeslendin. Bulmacadan çıkıp tapınakta ya da kamarada dinlenmen gerek.', ses: 'red' }];
  b.nefes += 1;
  BY.odakEkle(d, NEFES_ODAK);
  d.zaman.sn += 300; // beş yıldız dakikası
  return [{ soz: 'Gözlerini kapayıp asanın titreşimini dinledin. Odak ' + d.buyu.odak + '.', ses: 'by_odak' }];
}
function yedekUygula(d, n) {
  const b = d.bulmaca;
  if (kombinasyonUlasilir(d, n)) return [{ soz: 'Bu düğüm için elinde bir yol var; yedek yola gerek yok.', ses: 'red' }];
  const y = yedek(d, n);
  if (d.buyu.odak < y.odak) return [{ soz: 'Yedek yol ' + y.odak + ' odak ister.', ses: 'red' }];
  const eks = Object.keys(y.bedel).filter((k) => ZN.miktar(d, k) < y.bedel[k]);
  if (eks.length) return [{ soz: 'Yedek yol için eksik: ' + bedelMetni(Object.fromEntries(eks.map((k) => [k, y.bedel[k] - ZN.miktar(d, k)]))) + '.', ses: 'red' }];
  BY.odakHarca(d, y.odak);
  for (const k of Object.keys(y.bedel)) ZN.ekle(d, k, -y.bedel[k]);
  b.cozulen.push(n.id);
  const ol = [{ soz: y.metin + ' ' + (typeof n.cozuldu === 'function' ? n.cozuldu(d) : n.cozuldu || n.ad + ' çözüldü.'), ses: 'by_basari', haptik: 'basari', cozuldu: n.id }];
  if (dugumler(d).every((m) => cozulduMu(d, m))) ol.push(...bitir(d));
  return ol;
}

// Pencere sayaçları (yankı ikizi ve eşzamanlı işlemler)
export function ilerle(d, dt) {
  if (!aktif(d)) return [];
  const b = d.bulmaca;
  const olaylar = [];
  for (const k of Object.keys(b.pencere)) {
    b.pencere[k] -= dt;
    if (b.pencere[k] <= 0) {
      delete b.pencere[k];
      b.uyg[k] = [];
      const n = dugumler(d).find((m) => m.id === k);
      olaylar.push({ soz: 'Senkron kaçtı: ' + n.ad + ' iki ayrı tonda çınlayıp başa döndü.', ses: 'by_senkron', haptik: 'hata' });
    }
  }
  return olaylar;
}

// Bitiş: ödül, bayrak, bulmacaya özgü sonrası
function bitir(d) {
  const b = d.bulmaca;
  const t = tanim(d);
  const olaylar = [];
  const sozler = [typeof t.bitis === 'function' ? t.bitis(d) : t.bitis || 'Bulmaca çözüldü.'];
  // Bulmaca heykelinin taşları geri sökülür; büyük final muhafızlarında kalıcıdır (Paket 2 bölüm 3.3)
  const takili = Object.keys(b.takilanTas || {}).filter((r) => b.takilanTas[r] > 0);
  if (takili.length && !t.kaliciTas) {
    for (const r of takili) d.buyu.taslar[r] += b.takilanTas[r];
    sozler.push('Heykelin göğsündeki taşları söküp çantana geri aldın.');
  }
  const ilk = !bittiMi(d, t.id);
  if (!b.ogren) d.buyu.biten[t.id] = Math.floor(d.zaman.sn / 3600);
  if (ilk || t.tekrar) {
    const o = typeof t.odul === 'function' ? t.odul(d) : t.odul;
    const m = odulVer(d, o);
    if (m) sozler.push(m);
  }
  if (t.sonra) {
    const r = t.sonra(d, ilk);
    if (r) sozler.push(r);
  }
  d.bulmaca = null;
  olaylar.push({ soz: sozler.join(' '), ses: t.bitisSesi || 'by_bitis', haptik: 'uzun', bitti: true });
  return olaylar;
}
export function odulVer(d, o) {
  if (!o) return '';
  const l = [];
  for (const k of Object.keys(o.esya || {})) {
    ZN.ekle(d, k, o.esya[k]);
    l.push(o.esya[k] + ' ' + ZN.adi(k));
  }
  for (const r of Object.keys(o.tas || {})) {
    BY.tasEkle(d, r, o.tas[r]);
    l.push(o.tas[r] + ' ' + (r === 'kizil' ? 'kızıl' : r === 'sari' ? 'sarı' : r === 'yesil' ? 'yeşil' : r) + ' taş');
  }
  for (const r of Object.keys(o.sise || {})) {
    const n = BY.siseEkle(d, r, o.sise[r]);
    if (n) l.push(n + ' dolu ' + (r === 'lumina' ? 'Lumina' : 'Solis') + ' şişesi');
  }
  if (o.odak) {
    BY.odakEkle(d, o.odak);
    l.push('odak artı ' + o.odak);
  }
  if (o.ogret) for (const k of o.ogret) {
    BY.ogret(d, k);
    l.push('yeni bilgi: ' + BY.adi(k));
  }
  if (o.bayrak) for (const k of o.bayrak) d.bayrak[k] = true;
  if (o.moral) {
    d.koloni.moral = Math.min(100, d.koloni.moral + o.moral);
    l.push('moral artı ' + o.moral);
  }
  return l.length ? 'Kazanç: ' + l.join(', ') + '.' : '';
}

// Ekranın ses durumu: düğümlerin konumu ve boşta çalan sesleri, ayar tonu
export function sesDurumu(d) {
  if (!aktif(d)) return null;
  const b = d.bulmaca;
  return {
    dugumler: dugumler(d).map((n, i) => ({ id: n.id, ses: n.ses || 'kristal', x: n.pan * 7, y: 3 + (n.mesafe != null ? n.mesafe : 0.5) * 8, cozuldu: cozulduMu(d, n), secili: i === b.i })),
    ayar: b.ayar ? { ref: b.ayar.ref, frek: ayarFrek(d) } : null,
    hava: b.hava,
  };
}

// Öğrenme (Paket 2 bölüm 4): ön şart açılınca (1) sesli frekans ayarı ve (2) tek seferlik pratik deneme. Öğrenme
// bulmacası iki düğümdür: asanın ucunda ayar, sonra hedefte deneme. Odak harcamaz.
export function ogrenmeBulmacasi(id, el, hedefAd, hedefDurum, sonra) {
  const kim = BUYULER[id] ? BUYULER[id].ad : TUREVLER[id] ? TUREVLER[id].ad : id;
  bulmacaEkle('ogren_' + id, {
    ad: kim + ': öğrenme',
    giris: 'Asanı kaldırdın. Önce asanın ucundaki tonu büyünün frekansına oturtacaksın, sonra hedefte bir kez deneyeceksin.',
    dugumler: [
      { id: 'asa', ad: 'Asanın ucu', pan: 0, mesafe: 0.1, ses: 'kristal', durum: 'Ucu titreşiyor, bir frekans bekliyor.', kombolar: el.map((x) => [x]), cozuldu: 'Frekans asaya işlendi.' },
      { id: 'hedef', ad: hedefAd, pan: 0.4, mesafe: 0.6, ses: 'kristal', durum: hedefDurum, kombolar: el.map((x) => [x]), on: ['asa'], cozuldu: 'Deneme başarılı.' },
    ],
    bitis: kim + ' artık senin.',
    odul: { ogret: [id] },
    tekrar: true,
    sonra,
  });
}
