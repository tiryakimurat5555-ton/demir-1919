// Oyun motoru: saf JS, ekrandan bağımsız (bun ile test edilir).
// Durum değişmez nesne olarak ele alınır; her işlem yeni bir durum döndürür.
//
// Etki biçimi (hikâye verisinde kullanılır):
//   { delil: ['id', ...], bayrak: { ad: deger }, artir: { ad: sayi }, sahne: 'id', mekan: 'id' }

export const KAYIT_SURUMU = 1;

export function yeniDurum(bolum) {
  return {
    surum: KAYIT_SURUMU,
    bolum: bolum.id,
    gorunum: { tur: 'sahne', id: bolum.baslangic },
    mekan: bolum.ilkMekan,
    deliller: [],
    cikarimlar: [],
    bayraklar: {},
    gunluk: [],
  };
}

export const delilVar = (d, id) => d.deliller.includes(id);
export const cikarimVar = (d, id) => d.cikarimlar.includes(id);
export const bayrak = (d, ad) => d.bayraklar[ad];
export const sayi = (d, ad) => d.bayraklar[ad] || 0;

export function deger(x, d) {
  return typeof x === 'function' ? x(d) : x;
}

function uygun(oge, d) {
  return !oge.kosul || !!oge.kosul(d);
}

// Etkiyi uygular. Dönen 'yeniDeliller' arayüzün duyurması içindir.
export function etkiUygula(bolum, d, etki) {
  if (!etki) return { durum: d, yeniDeliller: [] };
  let n = { ...d, bayraklar: { ...d.bayraklar }, deliller: [...d.deliller], gunluk: [...d.gunluk] };
  const yeniDeliller = [];
  for (const id of etki.delil || []) {
    if (!n.deliller.includes(id) && bolum.deliller[id]) {
      n.deliller.push(id);
      yeniDeliller.push(id);
      n.gunluk.push('Delil: ' + bolum.deliller[id].ad);
    }
  }
  for (const [k, v] of Object.entries(etki.bayrak || {})) n.bayraklar[k] = v;
  for (const [k, v] of Object.entries(etki.artir || {})) n.bayraklar[k] = (n.bayraklar[k] || 0) + v;
  if (etki.mekan) {
    n.mekan = etki.mekan;
    n.gorunum = { tur: 'mekan' };
  }
  if (etki.sahne) n.gorunum = { tur: 'sahne', id: etki.sahne };
  return { durum: n, yeniDeliller };
}

// ---------------------------------------------------------------------------
// Mekân
// ---------------------------------------------------------------------------
export function mekanBilgisi(bolum, d) {
  const m = bolum.mekanlar[d.mekan];
  return {
    id: d.mekan,
    ad: deger(m.ad, d),
    tarif: deger(m.tarif, d),
    nesneler: (m.nesneler || []).filter((o) => uygun(o, d)),
    kisiler: (m.kisiler || []).filter((id) => uygun(bolum.kisiler[id], d)),
    gecisler: (m.gecisler || []).filter((g) => uygun(g, d)),
  };
}

export function mekanaGir(bolum, d, hedef) {
  const ilk = !d.bayraklar['gorüldü_' + hedef];
  let { durum } = etkiUygula(bolum, d, { mekan: hedef, bayrak: { ['gorüldü_' + hedef]: true } });
  const m = bolum.mekanlar[hedef];
  if (ilk && m.ilkSahne) durum = { ...durum, gorunum: { tur: 'sahne', id: m.ilkSahne } };
  return durum;
}

// Bir nesneyi incelemek: metin + etki. Sonuç metni arayüzde okunur.
export function incele(bolum, d, nesneId) {
  const m = bolum.mekanlar[d.mekan];
  const o = (m.nesneler || []).find((x) => x.id === nesneId);
  if (!o || !uygun(o, d)) return { durum: d, metin: [], yeniDeliller: [] };
  const metin = [].concat(deger(o.incele, d));
  const sonuc = etkiUygula(bolum, d, { ...(deger(o.etki, d) || {}), bayrak: { ...((deger(o.etki, d) || {}).bayrak || {}), ['incelendi_' + nesneId]: true } });
  return { durum: sonrakiOlay(bolum, sonuc.durum), metin, yeniDeliller: sonuc.yeniDeliller };
}

// ---------------------------------------------------------------------------
// Konuşma
// ---------------------------------------------------------------------------
export function konusmaBaslat(bolum, d, kisiId) {
  const k = bolum.kisiler[kisiId];
  const dugum = deger(k.giris, d);
  return { ...d, gorunum: { tur: 'konusma', kisi: kisiId, dugum } };
}

export function dugumBilgisi(bolum, d) {
  const g = d.gorunum;
  const k = bolum.kisiler[g.kisi];
  const n = k.dugumler[g.dugum];
  return {
    kisiAd: deger(k.ad, d),
    soz: [].concat(deger(n.soz, d)),
    secenekler: (n.secenekler || []).filter((s) => uygun(s, d)),
  };
}

// Seçeneği uygular. Konuşma bitince (sonra yoksa) mekâna dönülür.
export function secenekSec(bolum, d, secenek) {
  const sonuc = etkiUygula(bolum, d, deger(secenek.etki, d));
  let n = sonuc.durum;
  const etkiSahne = n.gorunum.tur === 'sahne' && n.gorunum !== d.gorunum;
  if (!etkiSahne) {
    if (secenek.sonra) n = { ...n, gorunum: { ...d.gorunum, dugum: secenek.sonra } };
    else n = { ...n, gorunum: { tur: 'mekan' } };
  }
  return { durum: sonrakiOlay(bolum, n), yeniDeliller: sonuc.yeniDeliller, cevap: [].concat(deger(secenek.cevap, d) || []) };
}

// ---------------------------------------------------------------------------
// Sahne (anlatı)
// ---------------------------------------------------------------------------
export function sahneBilgisi(bolum, d) {
  const s = bolum.sahneler[d.gorunum.id];
  return {
    baslik: deger(s.baslik, d),
    paragraflar: [].concat(deger(s.paragraflar, d)),
    secenekler: (s.secenekler || [{ etiket: 'Devam' }]).filter((x) => uygun(x, d)),
  };
}

export function sahneSec(bolum, d, secenek) {
  const sonuc = etkiUygula(bolum, d, deger(secenek.etki, d));
  let n = sonuc.durum;
  if (n.gorunum === d.gorunum || (n.gorunum.tur === 'sahne' && n.gorunum.id === d.gorunum.id)) {
    n = { ...n, gorunum: secenek.sonra ? { tur: 'sahne', id: secenek.sonra } : { tur: 'mekan' } };
  }
  return { durum: sonrakiOlay(bolum, n), yeniDeliller: sonuc.yeniDeliller };
}

// ---------------------------------------------------------------------------
// Soruşturma panosu
// ---------------------------------------------------------------------------
export function cikarimBul(bolum, a, b) {
  return Object.entries(bolum.cikarimlar).find(([, c]) => (c.a === a && c.b === b) || (c.a === b && c.b === a));
}

export function baglan(bolum, d, a, b) {
  if (a === b) return { durum: d, basarili: false, metin: 'Aynı delili kendisiyle bağlayamazsın.' };
  const bulunan = cikarimBul(bolum, a, b);
  if (!bulunan) {
    return { durum: d, basarili: false, metin: 'Bu iki delil arasında bir bağ kuramıyorsun. Belki başka bir parça eksik.' };
  }
  const [id, c] = bulunan;
  if (d.cikarimlar.includes(id)) return { durum: d, basarili: false, metin: 'Bunu zaten çıkardın: ' + c.ad + '.' };
  let n = { ...d, cikarimlar: [...d.cikarimlar, id], gunluk: [...d.gunluk, 'Çıkarım: ' + c.ad] };
  n = etkiUygula(bolum, n, c.etki).durum;
  return { durum: sonrakiOlay(bolum, n), basarili: true, metin: c.metin, ad: c.ad };
}

// Bölümün kendi olayları (ör. bütün çıkarımlar tamamlanınca karar sahnesi)
function sonrakiOlay(bolum, d) {
  for (const o of bolum.olaylar || []) {
    if (d.bayraklar['olay_' + o.id]) continue;
    if (d.gorunum.tur === 'sahne') continue; // bir sahne sürerken olay araya girmez
    if (o.kosul(d)) {
      const n = etkiUygula(bolum, d, o.etki).durum;
      return { ...n, bayraklar: { ...n.bayraklar, ['olay_' + o.id]: true } };
    }
  }
  return d;
}

export function olaylariDenetle(bolum, d) {
  return sonrakiOlay(bolum, d);
}

export function hedef(bolum, d) {
  const h = (bolum.hedefler || []).find((x) => x.kosul(d));
  return h ? deger(h.metin, d) : '';
}
