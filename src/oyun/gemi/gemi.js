// Tersane, gemi montajı ve gemi içi (belgeler/araclar-ve-gemi-filosu.md bölüm 1.2, 2 ve 5; uzay-oyunu-tasarim-
// ve-senaryo.md bölüm 3; gelistirici-entegrasyon-rehberi Faz 3 "parça parça montaj arayüzü sesli geri bildirimle").
// Saf JavaScript.
//
// Montaj: Kıvılcım dört aşamada kızağa oturtulur: gövde (150 plaka), kokpit (40 birim kablo), reaktör (minyatür
// iyon reaktörü), itki (25 litre yakıt). İlk üçü vinçle: parça kulaklıkta sağa ya da sola kaymış sallanır; sesin
// iki kulakta eşitlendiği yerde parça tam yuvanın üstündedir. Aşağı kaydırınca indirilir; ortalanmamışsa kızağa
// çarpar ve geri kalkar. Oturunca çift dokun: kenetlenir; tersane mühendisleri kaynağa başlar (zamanla biter,
// tersane iş gücü kısaltır). Platodaki rüzgâr parçayı sürükler, hamle sarsar (dunya.js firtinaIlerle).
// Gemi içi: odalar arasında iki parmakla sağa-sola kaydırma, odada dokunma terminal, basılı tutma mürettebatla
// konuşma (bölüm 5). Mürettebat odalara atanır (savas-yetenek-ve-murettebat 4.2).
import { GEMI_SINIFLARI, SINIF_KATMANLARI } from '../veri/gemiler';
import { PARCALAR } from '../veri/uretim';

export { SINIF_KATMANLARI };
export const KIVILCIM_MONTAJ = GEMI_SINIFLARI[1].montaj;
export const ODALAR = Object.fromEntries(Object.keys(GEMI_SINIFLARI).map((k) => [k, GEMI_SINIFLARI[k].odalar]));

// --- Montaj (kızaktaki gemi; sınıfa göre aşamalar) ---
function tersane(d) {
  if (!d.tersane) d.tersane = { sinif: 1, asamalar: {}, kaynak: null };
  return d.tersane;
}
export function montajAsamalari(d) {
  return GEMI_SINIFLARI[tersane(d).sinif].montaj;
}
// Kızağın kademesi: tersane 1, Manyetik Beşik 2, Hisar Tersanesi 3
export function kizakKademesi(d) {
  const b = d.koloni.binalar;
  return b.includes('tersane_3') ? 3 : b.includes('tersane_2') ? 2 : b.includes('tersane') ? 1 : 0;
}
// Bütün gemiler (aktif + filodakiler)
export function filo(d) {
  return [d.gemi, ...(d.filo || [])].filter(Boolean);
}
// Kızağa yeni bir gemi sınıfı koy (kızaktaki iş bitmişse)
export function yeniGemiSiniflari(d) {
  const t = tersane(d);
  const sahip = filo(d).map((g) => g.sinif);
  return Object.keys(GEMI_SINIFLARI).map((k) => {
    const s = GEMI_SINIFLARI[k];
    const sinif = Number(k);
    let durum;
    if (sahip.includes(sinif)) durum = 'Filoda var.';
    else if (t.sinif === sinif && Object.keys(t.asamalar).length) durum = 'Kızakta, montaj sürüyor.';
    else if (kizakKademesi(d) < s.kizak) durum = 'Kademe ' + s.kizak + ' kızak gerekir.';
    else durum = 'Kızağa konabilir.';
    return { sinif, ad: s.ad + ', ' + s.sinif, durum, olur: durum === 'Kızağa konabilir.' && !(t.kaynak || (Object.keys(t.asamalar).length && !gemiBittiMi(d))) };
  });
}
function gemiBittiMi(d) {
  const t = tersane(d);
  return GEMI_SINIFLARI[t.sinif].montaj.every((a) => t.asamalar[a.id] === 'bitti');
}
export function kizagaKoy(d, sinif) {
  const x = yeniGemiSiniflari(d).find((y) => y.sinif === sinif);
  if (!x || !x.olur) return { metin: x ? x.ad + ': ' + x.durum : '', ses: 'red' };
  d.tersane = { sinif, asamalar: {}, kaynak: null };
  return { metin: GEMI_SINIFLARI[sinif].ad + ' kızağa kondu. Montaj aşamaları: ' + GEMI_SINIFLARI[sinif].montaj.map((a) => a.ad).join(', ') + '.', ses: 'zincir' };
}

export function montajListesi(d) {
  const t = tersane(d);
  const asamalar = montajAsamalari(d);
  return asamalar.map((a, i) => {
    const durum = t.asamalar[a.id];
    const onceki = i === 0 || t.asamalar[asamalar[i - 1].id] === 'bitti';
    let metin;
    if (durum === 'bitti') metin = 'Tamam.';
    else if (t.kaynak && t.kaynak.asama === a.id) metin = (a.vinc ? 'Kaynak sürüyor' : 'Dolum sürüyor') + ', yaklaşık ' + Math.ceil(t.kaynak.kalan) + ' saniye.';
    else if (!onceki) metin = 'Sırası gelmedi.';
    else metin = 'Gerekli: ' + Object.keys(a.gerek).map((k) => a.gerek[k] + ' ' + PARCALAR[k].ad).join(', ') + '.';
    return { id: a.id, ad: a.ad, metin, acik: onceki && !durum && !(t.kaynak && t.kaynak.asama === a.id) };
  });
}

export function montajBaslat(d, asamaId) {
  const t = tersane(d);
  const asamalar = montajAsamalari(d);
  const i = asamalar.findIndex((a) => a.id === asamaId);
  const a = asamalar[i];
  if (!a) return { metin: '' };
  if (t.asamalar[a.id] === 'bitti') return { metin: a.ad + ' zaten tamam.' };
  if (kizakKademesi(d) < GEMI_SINIFLARI[t.sinif].kizak) return { metin: 'Bu gemi için kademe ' + GEMI_SINIFLARI[t.sinif].kizak + ' kızak gerekir.', ses: 'red' };
  if (t.kaynak) return { metin: 'Mühendisler önceki aşamanın kaynağında; bitmesini bekle.', ses: 'red' };
  if (i > 0 && t.asamalar[asamalar[i - 1].id] !== 'bitti') return { metin: 'Önce ' + asamalar[i - 1].ad + '.', ses: 'red' };
  const p = d.koloni.parcalar || {};
  const eksik = Object.keys(a.gerek).filter((k) => (p[k] || 0) < a.gerek[k]);
  if (eksik.length)
    return {
      metin:
        'Parça yetmiyor. Gerekli: ' + Object.keys(a.gerek).map((k) => a.gerek[k] + ' ' + PARCALAR[k].ad + ' (elinde ' + (p[k] || 0) + ')').join(', ') + '. ' +
        (eksik.some((k) => PARCALAR[k].uzaydan) ? 'Bu malzeme uzay görevlerinden gelir.' : 'Terminalden üretim yap.'),
      ses: 'red',
    };
  for (const k of Object.keys(a.gerek)) p[k] -= a.gerek[k];
  if (a.vinc) {
    vincBaslat(d, a.id);
    return { vinc: true };
  }
  t.kaynak = { asama: a.id, kalan: a.kaynak };
  return { metin: 'Yakıt hattını bağlıyorsun. Tanklar derinden tıslayarak doluyor.', ses: 'tislama' };
}

// Zamanla: kaynak / dolum işi (carpan: tersane mühendisleri)
export function montajIlerle(d, dt, carpan) {
  const t = d.tersane;
  if (!t || !t.kaynak) return [];
  t.kaynak.kalan -= dt * carpan;
  if (t.kaynak.kalan > 0) return [];
  const asamalar = GEMI_SINIFLARI[t.sinif].montaj;
  const a = asamalar.find((x) => x.id === t.kaynak.asama);
  t.asamalar[a.id] = 'bitti';
  t.kaynak = null;
  const olaylar = [{ tur: 'montaj', metin: 'Tersane: ' + a.ad + ' tamam.' }];
  if (asamalar.every((x) => t.asamalar[x.id] === 'bitti') && !filo(d).some((g) => g.sinif === t.sinif)) {
    gemiOlustur(d, t.sinif);
    olaylar.push({ tur: 'gemiHazir', sinif: t.sinif, metin: GEMI_SINIFLARI[t.sinif].ad + ' hazır; kızakta.' });
  }
  return olaylar;
}

// --- Vinç (sesle hizalama) ---
export const VINC_ESIGI = 0.08; // |x| bundan küçükse yuvanın tam üstünde
function tohumSayi(d, n) {
  let x = ((d.tohum || 1) * 1103515245 + n * 12345) % 2147483647;
  if (x < 0) x += 2147483647;
  return x / 2147483647;
}
export function vincBaslat(d, asama) {
  const i = montajAsamalari(d).findIndex((a) => a.id === asama) + tersane(d).sinif * 5;
  const r = tohumSayi(d, i + 7);
  d.vinc = { asama, x: (r < 0.5 ? -1 : 1) * (0.5 + r * 0.4), yukseklik: 3, sure: 0, oturdu: false };
  return d.vinc;
}
export function vincKaydir(d, fark) {
  const v = d.vinc;
  if (!v || v.oturdu) return null;
  v.x = Math.max(-1, Math.min(1, v.x + fark));
  return v.x;
}
// Rüzgâr parçayı yavaşça sürükler
export function vincIlerle(d, dt) {
  const v = d.vinc;
  if (!v || v.oturdu) return [];
  v.sure += dt;
  v.x = Math.max(-1, Math.min(1, v.x + 0.04 * Math.sin(v.sure * 0.6 + 1) * dt));
  return [];
}
// Bir basamak indirir (üç basamakta oturur)
export function vincIndir(d) {
  const v = d.vinc;
  if (!v) return { sonuc: 'yok' };
  if (v.oturdu) return { sonuc: 'oturdu', metin: 'Parça oturdu. Çift dokun: kenetle.' };
  if (Math.abs(v.x) >= VINC_ESIGI) {
    v.yukseklik = 3;
    return { sonuc: 'carpti', metin: 'Parça kızağın kenarına çarptı, zincirler gerildi; vinç onu yeniden kaldırdı. Ses iki kulağında eşitlenene kadar kaydır.' };
  }
  v.yukseklik -= 1;
  if (v.yukseklik <= 0) {
    v.oturdu = true;
    return { sonuc: 'oturdu', metin: 'Parça yuvasına oturdu. Çift dokun: kenetle.' };
  }
  return { sonuc: 'indi', metin: v.yukseklik === 2 ? 'İniyor.' : 'Biraz daha. Hâlâ ortada mı, dinle.' };
}
// Zemin alaşım kaplaması (gorev6.js): kızağın zeminine vinçle zırhlı plaka oturtulur
export const KAPLAMA = { id: 'kaplama', ad: 'Zemin alaşım kaplaması', gerek: { zirhli_plaka: 100 }, vinc: true, parca: 'alaşım kaplama levhaları' };
function asamaBul(d, id) {
  return id === 'kaplama' ? KAPLAMA : montajAsamalari(d).find((x) => x.id === id);
}
export function kaplamaBaslat(d) {
  const p = d.koloni.parcalar || {};
  if ((p.zirhli_plaka || 0) < 100) return { metin: '100 zırhlı şasi metali ve titanyum plaka gerekir; elinde ' + (p.zirhli_plaka || 0) + '. Dökümhanede üretilir.', ses: 'red' };
  p.zirhli_plaka -= 100;
  vincBaslat(d, 'kaplama');
  return { vinc: true };
}
// Vinçten çekilince parça depoya döner (harcanan parçalar geri eklenir)
export function vincIptal(d) {
  const v = d.vinc;
  if (!v) return;
  const a = asamaBul(d, v.asama);
  if (!d.koloni.parcalar) d.koloni.parcalar = {};
  for (const k of Object.keys(a.gerek)) d.koloni.parcalar[k] = (d.koloni.parcalar[k] || 0) + a.gerek[k];
  d.vinc = null;
}
export function vincKenetle(d) {
  const v = d.vinc;
  if (!v || !v.oturdu) return { sonuc: 'yok', metin: 'Parça daha oturmadı.' };
  if (v.asama === 'kaplama') {
    d.vinc = null;
    d.bayrak.kaplama = true;
    d.sahne = 'kaplama_tamam';
    return { sonuc: 'kenetlendi', metin: 'Son levha da kenetlendi; kızağın zemini zırhlı alaşımla kaplandı.' };
  }
  const a = asamaBul(d, v.asama);
  tersane(d).kaynak = { asama: a.id, kalan: a.kaynak };
  d.vinc = null;
  return { sonuc: 'kenetlendi', metin: a.ad + ' kenetlendi. Mühendisler kaynağa başladı; bitince haber verirler.' };
}
export function vincMetni(d) {
  const v = d.vinc;
  if (!v) return '';
  const m = Math.abs(v.x);
  if (v.oturdu) return 'Parça oturdu. Çift dokun: kenetle.';
  const yon = v.x > 0 ? 'sağda; sola kaydır' : 'solda; sağa kaydır';
  const yer = m < VINC_ESIGI ? 'Yuvanın tam üstünde; aşağı kaydır.' : m < 0.25 ? 'Az ' + yon + '.' : 'Epey ' + yon + '.';
  return yer + ' Yükseklik: ' + v.yukseklik + ' basamak.';
}

// --- Gemi ---
export function gemiOlustur(d, sinif) {
  const s = GEMI_SINIFLARI[sinif];
  const yeni = {
    sinif,
    ad: s.ad,
    odalar: s.odalar.map((o) => o.id),
    govde: s.govde,
    maxGovde: s.govde,
    kalkan: s.kalkan,
    silahlar: [],
    kargo: [],
    moduller: {},
    yakit: s.yakit.tank,
    maxYakit: s.yakit.tank,
    yakitTuru: s.yakit.parca,
    motorSesi: s.motor,
    yer: 'kizak',
    atamalar: {},
  };
  // İlk gemi aktif olur; sonrakiler filoya katılır (kızaktan "Aktif gemiyi seç")
  if (!d.gemi) d.gemi = yeni;
  else {
    if (!d.filo) d.filo = [];
    d.filo.push(yeni);
  }
  return yeni;
}
// Filodan aktif gemi seç (kızaktayken)
export function aktifGemiSec(d, sinif) {
  if (d.gemide) return { metin: 'Önce gemiden in.', ses: 'red' };
  const i = (d.filo || []).findIndex((g) => g.sinif === sinif);
  if (i < 0) return { metin: d.gemi && d.gemi.sinif === sinif ? d.gemi.ad + ' zaten kızakta.' : '' };
  const g = d.filo.splice(i, 1)[0];
  if (d.gemi) d.filo.push(d.gemi);
  d.gemi = g;
  return { metin: g.ad + ' kızağa alındı; artık onunla uçarsın.', ses: 'zincir' };
}

export function gemiOdalari(d) {
  return d.gemi ? GEMI_SINIFLARI[d.gemi.sinif].odalar : [];
}

export function gemiDurumu(d) {
  const g = d.gemi;
  if (!g) return 'Gemi yok.';
  const mod = Object.keys(g.moduller).map((k) => PARCALAR['mod_' + k].ad);
  return (
    g.ad + ', ' + GEMI_SINIFLARI[g.sinif].sinif + '. Gövde yüzde ' + Math.round((g.govde / g.maxGovde) * 100) + '. Yakıt ' + Math.round(g.yakit) + ' litre, ' + g.maxYakit + ' litrelik tankta. ' +
    'Modüller: ' + (mod.length ? mod.join(', ') : 'yok') + '. ' +
    'Yer: ' + (g.yer === 'uzay' ? 'uzayda' : 'tersanede, kızakta') + '.'
  );
}

// Takılabilir modüller (üretilmiş ve sınıfa uygun)
export function modulListesi(d) {
  const g = d.gemi;
  if (!g) return [];
  const p = d.koloni.parcalar || {};
  return Object.keys(PARCALAR)
    .filter((k) => PARCALAR[k].katman)
    .map((k) => {
      const katman = PARCALAR[k].katman;
      // Katman modülleri sınıfın katmanlarına; ek donanımlar en az belli kademedeki gemiye takılır
      const uygun = PARCALAR[k].ek ? g.sinif >= PARCALAR[k].minSinif : SINIF_KATMANLARI[g.sinif].includes(katman);
      let durum;
      if (g.moduller[katman]) durum = 'Takılı.';
      else if (!uygun) durum = PARCALAR[k].ek ? 'En az kademe ' + PARCALAR[k].minSinif + ' gemi gerekir.' : g.ad + '\'da bu katman için yer yok.';
      else if ((p[k] || 0) < 1) durum = 'Üretilmedi.';
      else durum = 'Takılabilir.';
      return { id: k, ad: PARCALAR[k].ad, durum, takilabilir: uygun && !g.moduller[katman] && (p[k] || 0) >= 1 };
    });
}
export function modulTak(d, parcaId) {
  const g = d.gemi;
  const m = modulListesi(d).find((x) => x.id === parcaId);
  if (!g || !m || !m.takilabilir) return { metin: m ? m.ad + ': ' + m.durum : '', ses: 'red' };
  d.koloni.parcalar[parcaId] -= 1;
  g.moduller[PARCALAR[parcaId].katman] = true;
  return { metin: m.ad + ' takıldı; mühendisler bağlantıları kaynakladı.', ses: 'kaynak' };
}

export function yakitDoldur(d) {
  const g = d.gemi;
  if (!g) return { metin: '' };
  const p = d.koloni.parcalar || {};
  const bos = g.maxYakit - g.yakit;
  if (bos < 0.5) return { metin: 'Tank dolu.' };
  const tur = g.yakitTuru || 'itki_yakiti';
  const al = Math.min(bos, p[tur] || 0);
  if (al <= 0) return { metin: 'Yakıt yok: ' + g.ad + ' ' + PARCALAR[tur].ad + ' yakar. Reaktör laboratuvarında üret.', ses: 'red' };
  p[tur] -= al;
  g.yakit += al;
  return { metin: Math.round(al) + ' litre yakıt aldın; tank ' + Math.round(g.yakit) + ' litre.', ses: 'tislama' };
}

// --- Güç dağıtımı (reaktör odası terminali, araclar-ve-gemi-filosu.md bölüm 5) ---
export const GUC_DAGITIMLARI = {
  dengeli: { ad: 'Dengeli', tarif: 'Güç itkiye, sensörlere ve kalkana eşit.', hiz: 1, fener: 1, kalkan: 1 },
  itki: { ad: 'İtkiye öncelik', tarif: 'Hız yüzde yirmi artar; sensörler biraz körleşir.', hiz: 1.2, fener: 0.85, kalkan: 0.8 },
  sensor: { ad: 'Sensörlere öncelik', tarif: 'Fenerler yüzde otuz daha uzaktan duyulur; hız biraz düşer.', hiz: 0.9, fener: 1.3, kalkan: 0.8 },
  kalkan: { ad: 'Kalkana öncelik', tarif: 'Kalkan güçlenir (çatışmalar için); hız ve sensörler düşer.', hiz: 0.85, fener: 0.9, kalkan: 1.5 },
};
export function gucDagitimi(d) {
  return GUC_DAGITIMLARI[(d.gemi && d.gemi.guc) || 'dengeli'];
}
export function gucDagitimiSec(d, id) {
  if (!d.gemi || !GUC_DAGITIMLARI[id]) return { metin: '' };
  d.gemi.guc = id;
  return { metin: 'Güç dağıtımı: ' + GUC_DAGITIMLARI[id].ad + '. ' + GUC_DAGITIMLARI[id].tarif, ses: 'dugme' };
}

// --- Gemi içi ---
export function gemiyeBin(d) {
  if (!d.gemi) return { metin: 'Kızakta gemi yok.' };
  d.gemide = { oda: 0 };
  return { metin: d.gemi.ad + '\'a biniyorsun. ' + odaMetni(d) };
}
export function gemidenIn(d) {
  if (d.gemi && d.gemi.yer === 'uzay') return { metin: 'Uzaydasın; önce Aethelis-IV\'e in.', ses: 'red' };
  d.gemide = null;
  return { metin: 'Gemiden iniyorsun. Rüzgâr yeniden yüzünde.' };
}
export function odaDegis(d, fark) {
  if (!d.gemide) return null;
  const odalar = gemiOdalari(d);
  const yeni = d.gemide.oda + fark;
  if (yeni < 0 || yeni >= odalar.length) return { sinir: true, metin: fark > 0 ? 'Geminin en arkasındasın.' : 'Geminin en önündesin.' };
  d.gemide.oda = yeni;
  return { oda: odalar[yeni], metin: odaMetni(d) };
}
export function odaSu(d) {
  return d.gemide ? gemiOdalari(d)[d.gemide.oda] : null;
}
export function odaMetni(d) {
  const o = odaSu(d);
  if (!o) return '';
  const uyeId = d.gemi.atamalar[o.id];
  const u = d.murettebat.find((x) => x.id === uyeId);
  return o.ad + '. ' + o.tarif + (u ? ' ' + o.gorevYeri + ' olarak ' + u.rol + ' ' + u.ad + ' burada.' : ' Bu odada görevli yok.');
}
// Mürettebatı odalara ata (her oda bir kişi; bir kişi bir oda)
export function atamaYap(d, odaId, uyeId) {
  const g = d.gemi;
  if (!g) return { metin: '' };
  for (const k of Object.keys(g.atamalar)) if (g.atamalar[k] === uyeId) delete g.atamalar[k];
  if (uyeId) g.atamalar[odaId] = uyeId;
  else delete g.atamalar[odaId];
  const o = gemiOdalari(d).find((x) => x.id === odaId);
  const u = d.murettebat.find((x) => x.id === uyeId);
  return { metin: u ? u.rol + ' ' + u.ad + ', ' + o.ad + ' odasına ' + o.gorevYeri + ' olarak atandı.' : o.ad + ' boşaltıldı.' };
}
// Kokpitteki telsiz subayı (ses hassasiyeti olan telsizci en iyisi) fenerleri uzaktan duyar
export function telsizSubayiCarpani(d) {
  const g = d.gemi;
  if (!g) return 1;
  const u = d.murettebat.find((x) => x.id === g.atamalar[g.odalar[0]]);
  if (!u) return gucDagitimi(d).fener;
  return (u.nitelik === 'ses_hassas' ? 1.6 : 1.25) * gucDagitimi(d).fener;
}
// Odada basılı tutma: görevli mürettebatla konuşma
export function odaKonusmasi(d) {
  const o = odaSu(d);
  if (!o) return '';
  const u = d.murettebat.find((x) => x.id === d.gemi.atamalar[o.id]);
  if (!u) return 'Bu odada kimse yok. Kokpit terminalinden mürettebat atayabilirsin.';
  const ilk = u.ad.split(' ')[0];
  if (o.id === d.gemi.odalar[0])
    return ilk + ': "Telsiz açık, Kaptan. ' + (d.gemi.yer === 'uzay' ? 'Fenerleri dinliyorum; hangisine gideceğimizi söyle, rotayı sesten tutarız."' : 'Kalkışa hazırız; komut sende."');
  return ilk + ': "Kasa bağlı, ranza hazır, Kaptan. Numune alırsak buraya istiflerim."';
}
