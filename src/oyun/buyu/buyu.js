// Büyü sistemi: asa, rezonans odak havuzu, bilinen büyüler, şişeler, renkli taşlar, hava ve büyü defteri
// (belgeler/v6 Paket 1, Paket 2). Bulmaca motoru buyu/bulmaca.js; koloni bulmacaları ve tapınak buyu/koloni.js.
//
// d.buyu = { asa 0-3, odak, asiriYuk (bool), bilinen: [büyü ve türev kimlikleri], kullanim: {eleman: n},
//            sise: { lumina: [kalan salım...], solis: [...] }, taslar: {renk: n}, hava: {mekan, seviye, bitis} | null,
//            tozNobet: {yer: nöbet no}, biten: {bulmaca: gün}, notlar }
// Bulmaca dışında da kullanılan büyüler (disari): hava (bölgede üç nöbet), Zihin Arındırma, Sessiz Yankı Taraması,
// Kervan Ağırlık Sıfırlama. Hiçbiri savaşta açılmaz.
import * as Z from '../zaman';
import * as ZN from '../tonoflenya/zanaat';
import { BUYULER, BUYU_SIRASI, TUREVLER, TUREV_SIRASI, ELEMANLAR, HAVA, HAVA_ADIM_ODAK, TASLAR, TAS_SIRASI, ASA, ODAK_DOLDURUCU, ODAK_EN_COK, ASIRI_YUK, USTALIK, SISE_EN_COK, SISE_SALIM, EKOLLER } from './veri';

// Boş rezonans şişesi: atölyenin döküm fırınında kuvars kumundan (Paket 2 bölüm 3.1)
if (!ZN.ESYA.bos_sise) ZN.ESYA.bos_sise = { kat: 6, gunluk: true, sekme: 4, gk: 15, ad: 'Boş rezonans şişesi', tarif: 'Kuvars kumundan dökülmüş ince boyunlu şişe. Açık gökyüzünde süzülen Lumina ya da Solis tozunu hapseder.' };

export function hazirla(d) {
  let yeni = false;
  if (!d.buyu) {
    d.buyu = { asa: 0, odak: 0, asiriYuk: false, bilinen: [], kullanim: {}, sise: { lumina: [], solis: [] }, taslar: {}, hava: null, tozNobet: {}, biten: {}, notlar: {} };
    yeni = true;
  }
  const b = d.buyu;
  for (const r of TAS_SIRASI) if (b.taslar[r] == null) b.taslar[r] = 0;
  if (!b.biten) b.biten = {};
  if (!b.notlar) b.notlar = {};
  // Eski kayıt: büyü tozu üretilmiş ya da sunak açılmışsa asa uyanmıştır
  if (yeni && !b.asa && ((d.bayrak && d.bayrak.rezonansSunagi) || ZN.miktar(d, 'malazar_buyu_tozu') > 0)) asaUyandir(d, true);
  return b;
}
export const acikMi = (d) => !!(d.buyu && d.buyu.asa > 0);
export const biliyor = (d, k) => !!(d.buyu && d.buyu.bilinen.includes(k));
export function ogret(d, k) {
  const b = hazirla(d);
  if (!b.bilinen.includes(k)) b.bilinen.push(k);
}
export function adi(k) {
  return (BUYULER[k] && BUYULER[k].ad) || (TUREVLER[k] && TUREVLER[k].ad) || (ELEMANLAR[k] && ELEMANLAR[k].ad) || k;
}

// --- Asa ---
// Malazar asası iki kristalle büyü tozuna işlendiğinde (imalat/tezgah.js uret) asa uyanır: kaptanın Malken kanı ilk
// kez bir araç bulur.
export function asaUyandir(d, sessiz = false) {
  const b = d.buyu;
  if (b.asa > 0) return null;
  b.asa = 1;
  b.odak = ODAK_EN_COK;
  if (!d.bayrak) d.bayrak = {};
  d.bayrak.asaUyandi = true;
  if (sessiz) return null;
  d.sahne = 'asa_uyanis';
  return true;
}
export function asaYukselt(d, k) {
  const b = hazirla(d);
  if (b.asa >= k) return false;
  b.asa = k;
  return true;
}
export const asaAdi = (d) => (d.buyu && ASA[d.buyu.asa] ? ASA[d.buyu.asa].ad : 'Uyanmamış asa');

// --- Odak ---
export const odakTavani = (d) => (d.buyu.asiriYuk ? ASIRI_YUK : ODAK_EN_COK);
export function ustalikSeviyesi(d, el) {
  const n = (d.buyu.kullanim || {})[el] || 0;
  return n >= USTALIK[2].n ? 3 : n >= USTALIK[1].n ? 2 : 1;
}
export function maliyet(d, el) {
  const e = ELEMANLAR[el];
  if (!e) return 0;
  let taban = e.odak || 0;
  if (e.tur === 'hava' && !e.ozel) taban = HAVA_ADIM_ODAK;
  if (!taban) return 0;
  const asa = ASA[d.buyu.asa] ? ASA[d.buyu.asa].indirim : 0;
  const u = USTALIK[ustalikSeviyesi(d, el) - 1].indirim;
  return Math.max(1, Math.round(taban * (1 - asa) * (1 - u)));
}
export function odakHarca(d, n) {
  const b = d.buyu;
  b.odak = Math.max(0, b.odak - n);
  if (b.odak <= ODAK_EN_COK) b.asiriYuk = false;
}
export function odakEkle(d, n) {
  const b = d.buyu;
  b.odak = Math.min(odakTavani(d), b.odak + n);
}
// Tapınakta ya da kamarada dinlenince havuz dolar (aşırı yükleme düşer)
export function dinlenince(d) {
  if (!acikMi(d)) return '';
  const b = d.buyu;
  b.asiriYuk = false;
  const once = b.odak;
  b.odak = Math.max(b.odak, ODAK_EN_COK);
  return once < ODAK_EN_COK ? ' Asanın rezonans havuzu doldu.' : '';
}
export function odakDoldur(d, id) {
  const b = hazirla(d);
  if (id === 'malazar_buyu_tozu') {
    if (ZN.miktar(d, id) < 1) return { metin: 'Malazar büyü tozu yok.', ses: 'red' };
    ZN.ekle(d, id, -1);
    b.asiriYuk = true;
    b.odak = ASIRI_YUK;
    return { metin: 'Büyü tozunu asanın oyuğuna serptin. Mor ışık kabarıyor: odak geçici olarak ' + ASIRI_YUK + '. Dinlenince yüze döner.', ses: 'by_odak' };
  }
  const x = ODAK_DOLDURUCU.find((o) => o.id === id);
  if (!x || ZN.miktar(d, id) < 1) return { metin: ZN.adi(id) + ' yok.', ses: 'red' };
  if (b.odak >= odakTavani(d)) return { metin: 'Odak havuzu zaten dolu.' };
  ZN.ekle(d, id, -1);
  const once = b.odak;
  odakEkle(d, x.odak);
  return { metin: ZN.adi(id) + ' asanın ucunda eriyor. Odak ' + once + ' iken ' + b.odak + ' oldu.', ses: 'by_odak' };
}

// --- Şişeler ---
export function siseSayisi(d, renk) {
  return (d.buyu.sise[renk] || []).length;
}
export function siseVarMi(d, renk) {
  return siseSayisi(d, renk) > 0;
}
// Aralama bir salım yer; üçüncüsünde şişe boşalır (çantaya boş şişe döner). Fırlatma şişeyi kırar.
export function siseKullan(d, renk, firlat) {
  const l = d.buyu.sise[renk];
  if (!l || !l.length) return false;
  if (firlat) {
    l.shift();
    return true;
  }
  l[0] -= 1;
  if (l[0] <= 0) {
    l.shift();
    ZN.ekle(d, 'bos_sise', 1);
  }
  return true;
}
export function siseEkle(d, renk, adet = 1) {
  const b = hazirla(d);
  let n = 0;
  for (let i = 0; i < adet && b.sise[renk].length < SISE_EN_COK; i++) {
    b.sise[renk].push(SISE_SALIM);
    n++;
  }
  return n;
}
// Yıldız tozu toplama (Paket 2 bölüm 3.1): Zhaor ve Elyndra nöbetinde beyaz Lumina, Sinha nöbetinde sarı Solis.
const nobetSayaci = (d) => Math.floor(((d.zaman && d.zaman.sn) || 0) / Z.NOBET_SN);
export const TOZ_NOBETI = { 0: 'lumina', 3: 'lumina', 4: 'solis' };
export function tozRengi(d) {
  return TOZ_NOBETI[Z.nobetNo(d)] || null;
}
export function tozToplanabilir(d, yer) {
  if (!acikMi(d) || !biliyor(d, 'siseleme')) return false;
  const renk = tozRengi(d);
  if (!renk) return false;
  return d.buyu.tozNobet[yer] !== nobetSayaci(d);
}
export function tozTopla(d, yer) {
  const b = hazirla(d);
  if (!acikMi(d)) return { metin: 'Asan uyanmadan toz şişeye girmez.', ses: 'red' };
  if (!biliyor(d, 'siseleme')) return { metin: 'Havada bir şey parlıyor ama şişelemeyi bilmiyorsun. Axelum Tapınağı\'nda öğrenilir.', ses: 'red' };
  const renk = tozRengi(d);
  if (!renk) return { metin: 'Şimdi havada toz yok. Beyaz Lumina Gümüş Şafak ve Mor İkindi\'de, sarı Solis Mavi Akşam\'da süzülür.' };
  if (b.tozNobet[yer] === nobetSayaci(d)) return { metin: 'Bu nöbette buradaki tozu topladın; bir sonraki uygun nöbeti bekle.' };
  if (ZN.miktar(d, 'bos_sise') < 1) return { metin: 'Boş rezonans şişen yok. Atölyenin döküm fırınında kuvars kumundan yapılır.', ses: 'red' };
  if (siseSayisi(d, renk) >= SISE_EN_COK) return { metin: 'Çantada en çok beş ' + (renk === 'lumina' ? 'Lumina' : 'Solis') + ' şişesi taşınır.' };
  ZN.ekle(d, 'bos_sise', -1);
  siseEkle(d, renk, 1);
  b.tozNobet[yer] = nobetSayaci(d);
  let ek = '';
  // Gözlem tepesinde sarı Solis toplarken bazen sarı rezonans taşı kırıntısı düşer
  if (yer === 'yb_gozlem' && renk === 'solis' && zar(d, 7) < 0.25) {
    tasEkle(d, 'sari', 1);
    ek = ' Tozla birlikte asanın ucuna küçük sarı bir rezonans taşı yapıştı.';
  }
  return { metin: (renk === 'lumina' ? 'Havada süzülen beyaz tozu asanın ucuyla şişeye çektin. Şişe soğuk bir ışıkla doldu: Lumina ' : 'Sarı, ılık bir toz şişeye aktı. Solis ') + siseSayisi(d, renk) + ' şişe.' + ek, ses: 'by_toz_toplama' };
}

// --- Renkli taşlar ---
export function tasEkle(d, renk, n = 1) {
  const b = hazirla(d);
  b.taslar[renk] = (b.taslar[renk] || 0) + n;
}
export function tasMetni(d) {
  const b = d.buyu;
  const l = TAS_SIRASI.filter((r) => b.taslar[r] > 0).map((r) => b.taslar[r] + ' ' + TASLAR[r].ad.toLocaleLowerCase('tr'));
  return l.length ? l.join(', ') : 'taş yok';
}
function zar(d, k) {
  const b = d.buyu;
  b.zar = (b.zar || 0) + 1;
  const x = Math.sin((d.tohum || 1) * 91.3 + b.zar * 17.7 + k * 3.1) * 43758.5453;
  return x - Math.floor(x);
}
// Saha ve toplama kancaları: asa uyandıysa renkli taş seyrek düşer (Paket 2 bölüm 3.3 kaynakları)
export function tasDusur(d, renk, ihtimal, metin) {
  if (!acikMi(d) || zar(d, renk.length) >= ihtimal) return '';
  tasEkle(d, renk, 1);
  return ' ' + metin;
}

// --- Hava (bölgesel; Paket 2 bölüm 3.2: mevsimi bozmaz, yalnız bulunduğun bölgeyi üç nöbet etkiler) ---
export function havaSeviyesi(d, mekan = d.mekan) {
  const h = d.buyu && d.buyu.hava;
  if (!h || h.mekan !== mekan || h.bitis <= d.zaman.sn) return 0;
  return h.seviye;
}
export function havaAdi(seviye) {
  const h = HAVA[seviye] || HAVA[0];
  return h.ad + ', ' + (h.derece > 0 ? 'artı ' : h.derece < 0 ? 'eksi ' : '') + Math.abs(h.derece) + ' derece';
}
// Etkiler: dunya.js maruziyet çarpanı (soğukta güneş, sıcakta serinlik), tarım (yağmur sular)
export function maruziyetCarpani(d, tur) {
  const s = havaSeviyesi(d);
  if (!s) return 1;
  if (tur === 'soguk' && s >= 1) return 0.5;
  if (tur !== 'soguk' && s <= -1) return 0.7;
  return 1;
}

// --- Büyü defteri (Paket 1 bölüm 7, Paket 2 bölüm 6): asa → odak → şişeler → taşlar → ekoller ---
export function ozetMetni(d) {
  const b = hazirla(d);
  return asaAdi(d) + '. Odak ' + b.odak + ' / ' + odakTavani(d) + '. Şişeler: Lumina ' + siseSayisi(d, 'lumina') + ', Solis ' + siseSayisi(d, 'solis') + ', boş ' + ZN.miktar(d, 'bos_sise') + '. Taşlar: ' + tasMetni(d) + '.';
}
function buyuSatiri(d, k) {
  const x = BUYULER[k];
  const bil = biliyor(d, k);
  const u = bil ? ', ustalık ' + ustalikSeviyesi(d, k) : '';
  return { id: 'b_' + k, etiket: x.ad + ', ' + maliyet(d, k) + ' odak' + (bil ? u : ', bilinmiyor'), ipucu: x.islev + (bil ? '' : ' Öğrenileceği yer: ' + x.kaynak + '.'), alt: (z) => buyuKarti(z, k) };
}
function turevSatiri(d, k) {
  const x = TUREVLER[k];
  const bil = biliyor(d, k);
  return { id: 't_' + k, etiket: x.ad + (bil ? '' : ', bilinmiyor'), ipucu: x.islev + (bil ? '' : ' Öğrenileceği yer: ' + x.kaynak + '.'), alt: (z) => turevKarti(z, k) };
}
function buyuKarti(d, k) {
  const x = BUYULER[k];
  const bil = biliyor(d, k);
  const ek = bil && x.disari ? [{ id: 'kullan', etiket: 'Şimdi kullan', ipucu: maliyet(d, k) + ' odak.', yap: (z) => disariKullan(z, k), geri: true }] : [];
  return {
    baslik: x.ad,
    giris: x.islev + ' Ekol: ' + EKOLLER.find((e) => e.id === x.ekol).ad + '. Odak ' + maliyet(d, k) + '. ' + (bil ? 'Biliyorsun; ustalık ' + ustalikSeviyesi(d, k) + ', ' + ((d.buyu.kullanim || {})[k] || 0) + ' kullanım.' : 'Henüz bilmiyorsun. ' + x.kaynak + '.') + (bil && !x.disari ? ' Bulmacalarda düğüme dönüp çift dokununca seçilir.' : ''),
    ogeler: ek,
  };
}
function turevKarti(d, k) {
  const x = TUREVLER[k];
  const bil = biliyor(d, k);
  const ogeler = [];
  if (bil && k === 'hava') {
    ogeler.push({ id: 'sogut', etiket: 'Bölgeyi bir kademe soğut', ipucu: maliyet(d, 'hava_serin') + ' odak.', yap: (z) => havaDisari(z, -1) });
    ogeler.push({ id: 'isit', etiket: 'Bölgeyi bir kademe ısıt', ipucu: maliyet(d, 'hava_gunes') + ' odak.', yap: (z) => havaDisari(z, 1) });
    ogeler.push({ id: 'normal', etiket: 'Havayı serbest bırak', ipucu: 'Odak harcamaz.', yap: (z) => havaBirak(z) });
  }
  return {
    baslik: x.ad,
    giris: x.islev + ' ' + (bil ? 'Biliyorsun.' : 'Henüz bilmiyorsun. ' + x.kaynak + '.') + (k === 'hava' ? ' Şu an bölgede: ' + havaAdi(havaSeviyesi(d)) + '.' : ''),
    ogeler,
  };
}
export function defterMenu(d, sekme = 0) {
  const b = hazirla(d);
  const SEK = [...EKOLLER.map((e) => e.ad), 'Şişeler, taşlar ve odak'];
  const s = ((sekme % SEK.length) + SEK.length) % SEK.length;
  let ogeler;
  if (s < 4) ogeler = BUYU_SIRASI.filter((k) => BUYULER[k].ekol === EKOLLER[s].id).map((k) => buyuSatiri(d, k));
  else if (s === 4) ogeler = TUREV_SIRASI.map((k) => turevSatiri(d, k));
  else ogeler = odakOgeleri(d);
  return {
    baslik: 'Büyü defteri: ' + SEK[s],
    giris: (s === 0 ? ozetMetni(d) + ' ' : '') + (s < 4 ? EKOLLER[s].tarif + '.' : '') + ' İki parmakla sağa ya da sola kaydır: sekme değiştir.',
    ogeler,
    ikiParmak: { sag: (z) => defterMenu(z, s + 1), sol: (z) => defterMenu(z, s - 1) },
  };
}
// Defterin şişe sekmesine başka modüllerin eklediği satırlar (koloni.js: Tonoflenya'nın açık gökyüzünde toz toplama)
export const DEFTER_EKLERI = [];
function odakOgeleri(d) {
  const b = d.buyu;
  const l = [
    ...DEFTER_EKLERI.flatMap((f) => f(d)),
    { id: 'ozet', etiket: 'Durum: ' + ozetMetni(d), ipucu: 'Büyü yalnız bulmacalarda, sınavlarda ve büyü görevlerinde kullanılır; savaşta açılmaz.', yap: () => ({ metin: ozetMetni(d) }) },
  ];
  for (const r of TAS_SIRASI) l.push({ id: 'tas_' + r, etiket: TASLAR[r].ad + ': ' + (b.taslar[r] || 0), ipucu: 'Nereden: ' + TASLAR[r].kaynak + '. Heykelde rolü: ' + TASLAR[r].rol, yap: () => ({ metin: TASLAR[r].ad + ': ' + (b.taslar[r] || 0) + '. ' + TASLAR[r].kaynak + '.' }) });
  for (const o of [...ODAK_DOLDURUCU, { id: 'malazar_buyu_tozu', odak: 0 }]) {
    const n = ZN.miktar(d, o.id);
    if (n > 0) l.push({ id: 'od_' + o.id, etiket: 'Odak doldur: ' + ZN.adi(o.id) + ' (' + n + ')' + (o.odak ? ', artı ' + o.odak : ', aşırı yükleme ' + ASIRI_YUK), yap: (z) => odakDoldur(z, o.id) });
  }
  return l;
}

// --- Bulmaca dışı kullanım ---
export function disariEngeli(d) {
  if (!acikMi(d)) return 'Asan uyanmadı.';
  if (d.savas) return 'Savaşta büyü kullanılmaz; yalnız teknoloji.';
  if (d.gemide && d.gemi && d.gemi.yer === 'uzay') return 'Açık uzayda bu büyü işe yaramaz.';
  return null;
}
export function disariKullan(d, k) {
  const e = disariEngeli(d);
  if (e) return { metin: e, ses: 'red' };
  const m = maliyet(d, k);
  if (d.buyu.odak < m) return { metin: 'Odak yetmiyor: ' + m + ' gerekir, ' + d.buyu.odak + ' var. Tapınakta ya da kamarada dinlen, ya da odak doldurucu kullan.', ses: 'red' };
  odakHarca(d, m);
  d.buyu.kullanim[k] = (d.buyu.kullanim[k] || 0) + 1;
  if (k === 'zihin_arindirma') {
    for (const u of d.murettebat || []) u.stres = 0;
    if (d.saha) d.saha.yorgunluk = Math.round((d.saha.yorgunluk || 0) / 2);
    return { metin: 'Asanın ucundan serin bir tını yayıldı; zihinlerdeki parazit dindi. Mürettebatın stresi silindi, yorgunluğun yarıya indi.', ses: BUYULER[k].ses };
  }
  if (k === 'yanki_tarama') return { metin: 'Sessiz yankı taraması. Asanın vuruşu duvarlardan, taşlardan geri dönüyor.', ses: BUYULER[k].ses, radar: true };
  if (k === 'agirlik_sifir') {
    d.buyu.agirlikBitis = d.zaman.sn + Z.NOBET_SN;
    return { metin: 'Yüklerin ağırlığı bir nöbet boyunca sıfırlandı: ambarın ağırlık cezası yok.', ses: BUYULER[k].ses };
  }
  return { metin: 'Bu büyü yalnız bulmacalarda kullanılır.' };
}
export const agirlikSifirMi = (d) => !!(d.buyu && d.buyu.agirlikBitis > d.zaman.sn);
function havaDisari(d, yon) {
  const e = disariEngeli(d);
  if (e) return { metin: e, ses: 'red' };
  const b = d.buyu;
  const once = havaSeviyesi(d);
  const adim = b.asa >= 2 ? 2 : 1; // T2 asa: iki adımlı müdahaleyi tek hamlede yapar
  const yeni = Math.max(-4, Math.min(4, once + yon * adim));
  if (yeni === once) return { metin: 'Hava daha fazla ' + (yon < 0 ? 'soğumaz' : 'ısınmaz') + ': ' + havaAdi(once) + '.' };
  const m = maliyet(d, yon < 0 ? 'hava_serin' : 'hava_gunes') * Math.abs(yeni - once);
  if (b.odak < m) return { metin: 'Odak yetmiyor: ' + m + ' gerekir.', ses: 'red' };
  odakHarca(d, m);
  b.hava = { mekan: d.mekan, seviye: yeni, bitis: d.zaman.sn + 3 * Z.NOBET_SN };
  let ek = '';
  // Yağmur tarım yataklarını sular
  if (yeni >= 3 && d.tarim) {
    for (const y of d.tarim.yataklar || []) if (y && y.su != null) y.su = 100;
    ek = ' Yağmur ekim yataklarını suladı.';
  }
  return { metin: havaAdi(once) + ' iken ' + havaAdi(yeni) + '. Bölgede üç nöbet sürer; mevsimi bozmaz.' + ek, ses: yeni >= 3 ? 'by_hava_yagmur' : yeni <= -2 ? 'by_hava_sogut' : yeni > once ? 'by_hava_isit' : 'by_hava_sogut' };
}
function havaBirak(d) {
  d.buyu.hava = null;
  return { metin: 'Havayı serbest bıraktın; bölge kendi hâline döndü.' };
}

// Büyü defteri ana menüde: asa uyanınca
export function menuMetni(d) {
  return 'Büyü defteri, odak ' + d.buyu.odak;
}
