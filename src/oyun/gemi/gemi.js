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
import { GEMI_SINIFLARI } from '../veri/gemiler';
import { PARCALAR } from '../veri/uretim';

const b = (d) => d.bayrak;

export const KIVILCIM_MONTAJ = [
  { id: 'govde', ad: 'Omurga ve gövde iskeleti', gerek: { plaka: 150 }, vinc: true, kaynak: 90, parca: 'iskelet kirişleri' },
  { id: 'kokpit', ad: 'Kokpit ve kablo demeti', gerek: { kablo: 40 }, vinc: true, kaynak: 60, parca: 'basınçlı kokpit kabuğu' },
  { id: 'reaktor', ad: 'Minyatür iyon reaktörü', gerek: { iyon_reaktoru: 1 }, vinc: true, kaynak: 60, parca: 'reaktör çekirdeği' },
  { id: 'itki', ad: 'İtki hattı ve yakıt dolumu', gerek: { itki_yakiti: 25 }, vinc: false, kaynak: 30, parca: 'yakıt hattı' },
];

// Gemi sınıflarının odaları (bölüm 2 ve 5): ortam sesi ve odadaki görev yeri
export const ODALAR = {
  1: [
    { id: 'kokpit', ad: 'Kokpit ve seyrüsefer istasyonu', ortam: 'ortam_kokpit', gorevYeri: 'Telsiz Subayı', tarif: 'Pilot koltuğu, radyo dalgası alıcıları, dokunsal itki kolları ve dış ses hidrofonları. Telsiz cızırdıyor, göstergeler bipliyor.' },
    { id: 'kargo', ad: 'Kompakt kargo ve acil durum ranzası', ortam: 'ortam_kargo', gorevYeri: 'İkmal Subayı', tarif: 'İki kişilik acil yaşam alanı, ilk yardım dolabı ve küçük bir numune kasası. Sesin metal duvarlardan yankılanıyor.' },
  ],
};

// Sınıfa göre takılabilen modül katmanları (Kıvılcım küçük: yalnız burun, gövde zırhı)
export const SINIF_KATMANLARI = {
  1: ['burun', 'govde'],
  2: ['burun', 'komuta', 'govde', 'makine', 'dis_a'],
  3: ['burun', 'komuta', 'govde', 'bolme_a', 'makine', 'tahrik', 'dis_b'],
  4: ['burun', 'komuta', 'govde', 'bolme_a', 'bolme_b', 'makine', 'tahrik', 'dis_a'],
  5: ['burun', 'komuta', 'govde', 'bolme_a', 'bolme_b', 'makine', 'tahrik', 'dis_a', 'dis_b'],
};

// --- Montaj ---
function tersane(d) {
  if (!d.tersane) d.tersane = { sinif: 1, asamalar: {}, kaynak: null };
  return d.tersane;
}

export function montajListesi(d) {
  const t = tersane(d);
  return KIVILCIM_MONTAJ.map((a, i) => {
    const durum = t.asamalar[a.id];
    const onceki = i === 0 || t.asamalar[KIVILCIM_MONTAJ[i - 1].id] === 'bitti';
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
  const i = KIVILCIM_MONTAJ.findIndex((a) => a.id === asamaId);
  const a = KIVILCIM_MONTAJ[i];
  if (!a) return { metin: '' };
  if (t.asamalar[a.id] === 'bitti') return { metin: a.ad + ' zaten tamam.' };
  if (t.kaynak) return { metin: 'Mühendisler önceki aşamanın kaynağında; bitmesini bekle.', ses: 'red' };
  if (i > 0 && t.asamalar[KIVILCIM_MONTAJ[i - 1].id] !== 'bitti') return { metin: 'Önce ' + KIVILCIM_MONTAJ[i - 1].ad + '.', ses: 'red' };
  const p = d.koloni.parcalar || {};
  const eksik = Object.keys(a.gerek).filter((k) => (p[k] || 0) < a.gerek[k]);
  if (eksik.length)
    return { metin: 'Parça yetmiyor. Gerekli: ' + Object.keys(a.gerek).map((k) => a.gerek[k] + ' ' + PARCALAR[k].ad + ' (elinde ' + (p[k] || 0) + ')').join(', ') + '. Terminalden üretim yap.', ses: 'red' };
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
  const a = KIVILCIM_MONTAJ.find((x) => x.id === t.kaynak.asama);
  t.asamalar[a.id] = 'bitti';
  t.kaynak = null;
  const olaylar = [{ tur: 'montaj', metin: 'Tersane: ' + a.ad + ' tamam.' }];
  if (KIVILCIM_MONTAJ.every((x) => t.asamalar[x.id] === 'bitti') && !d.gemi) {
    gemiOlustur(d, 1);
    olaylar.push({ tur: 'gemiHazir' });
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
  const i = KIVILCIM_MONTAJ.findIndex((a) => a.id === asama);
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
// Vinçten çekilince parça depoya döner (harcanan parçalar geri eklenir)
export function vincIptal(d) {
  const v = d.vinc;
  if (!v) return;
  const a = KIVILCIM_MONTAJ.find((x) => x.id === v.asama);
  if (!d.koloni.parcalar) d.koloni.parcalar = {};
  for (const k of Object.keys(a.gerek)) d.koloni.parcalar[k] = (d.koloni.parcalar[k] || 0) + a.gerek[k];
  d.vinc = null;
}
export function vincKenetle(d) {
  const v = d.vinc;
  if (!v || !v.oturdu) return { sonuc: 'yok', metin: 'Parça daha oturmadı.' };
  const a = KIVILCIM_MONTAJ.find((x) => x.id === v.asama);
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
  d.gemi = {
    sinif,
    ad: s.ad,
    odalar: ODALAR[sinif].map((o) => o.id),
    govde: 100,
    maxGovde: 100,
    kalkan: 0,
    silahlar: [],
    kargo: [],
    moduller: {},
    yakit: 25,
    maxYakit: 25,
    motorSesi: 'turbin',
    yer: 'kizak',
    atamalar: {},
  };
  return d.gemi;
}

export function gemiOdalari(d) {
  return d.gemi ? ODALAR[d.gemi.sinif] : [];
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
      const uygun = SINIF_KATMANLARI[g.sinif].includes(katman);
      let durum;
      if (g.moduller[katman]) durum = 'Takılı.';
      else if (!uygun) durum = g.ad + '\'da bu katman için yer yok.';
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
  const al = Math.min(bos, p.itki_yakiti || 0);
  if (al <= 0) return { metin: 'Yakıt yok. Reaktör laboratuvarında itki yakıtı üret.', ses: 'red' };
  p.itki_yakiti -= al;
  g.yakit += al;
  return { metin: Math.round(al) + ' litre yakıt aldın; tank ' + Math.round(g.yakit) + ' litre.', ses: 'tislama' };
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
  const u = d.murettebat.find((x) => x.id === g.atamalar.kokpit);
  if (!u) return 1;
  return u.nitelik === 'ses_hassas' ? 1.6 : 1.25;
}
// Odada basılı tutma: görevli mürettebatla konuşma
export function odaKonusmasi(d) {
  const o = odaSu(d);
  if (!o) return '';
  const u = d.murettebat.find((x) => x.id === d.gemi.atamalar[o.id]);
  if (!u) return 'Bu odada kimse yok. Kokpit terminalinden mürettebat atayabilirsin.';
  const ilk = u.ad.split(' ')[0];
  if (o.id === 'kokpit')
    return ilk + ': "Telsiz açık, Kaptan. ' + (d.gemi.yer === 'uzay' ? 'Fenerleri dinliyorum; hangisine gideceğimizi söyle, rotayı sesten tutarız."' : 'Kalkışa hazırız; komut sende."');
  return ilk + ': "Kasa bağlı, ranza hazır, Kaptan. Numune alırsak buraya istiflerim."';
}
