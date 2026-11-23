// Saha sistemi (v5 Paket 5, 6, 13): Derin Maden Ocağı (Kat 1-40), İç Deniz Kıyı Koruluğu, kişisel aletler, kara araçlarının
// sahadaki rolleri, ileri karakollar ve yeraltı/kıyı düşmanları. Balıkçılık balik.js'te.
//
// d.saha = {
//   alet: { kazma, balta, fener, olta, canta: 1-3 },  yip: { alet: kullanım },
//   duraklar: [açık asansör durakları],   temiz: { kat: o ziyarette kazılan düğüm },   kirilan: { düğüm: true },
//   tukenen: { düğüm: yıldız sn (bu ana kadar tükenmiş) },  vurus: { düğüm: vuruş },  canta: { eşya: adet },
//   karakollar: ['kat10' | 'kat20' | 'kat30' | 'kiyi'],  eslik: araç | null,  tehlike: { kat: 'var' | 'temiz' },
//   yag: 0-100 (fener yağı),  sonMekan,  sonGun (karakol akışı),  zar: sayaç
// }
// Düğüm kesilince ya da kazılınca tükenir; kıyıda 30-60 gerçek saniyede, madende bir nöbette yeniden belirir.
import * as Z from '../zaman';
import * as ZN from '../tonoflenya/zanaat';
import * as SB from '../tonoflenya/subay';
import { HAMMADDELER } from '../veri/tesisler';
import { MEKANLAR, NOKTALAR } from '../yuzey/harita';
import { ALETLER, ALET_SIRASI, ALET_BEDELI, BILEME_BEDELI, YIPRANMA_ESIGI, CANTA_KAPASITE, MADEN_DUGUMLERI, KIYI_DUGUMLERI, DURAKLAR, GALERILER, KARAKOL_DURAKLARI, MADEN_TEHLIKE, PUSU_IHTIMALI, bandi } from './veri';
import { S_NOKTALAR, galeriMekani, galeriMerkezi } from './harita';
import { ZAFER_KANCALARI } from '../kancalar';

const katildi = (d, id) => !!(d.yer && d.yer.katilan && d.yer.katilan.includes(id));
const kademeOf = (d, id) => (d.yer && d.yer.kisi && d.yer.kisi[id] ? d.yer.kisi[id].k : 0);
const aracVar = (d, a) => (d.araclar || []).includes(a);

export function hazirla(d) {
  if (!d.saha) d.saha = {};
  const s = d.saha;
  if (!s.alet) s.alet = { kazma: 1, balta: 1, fener: 1, olta: 1, canta: 1 };
  for (const k of ['yip', 'temiz', 'kirilan', 'tukenen', 'vurus', 'canta', 'tehlike']) if (!s[k]) s[k] = {};
  if (!s.duraklar) s.duraklar = [1];
  if (!s.karakollar) s.karakollar = [];
  if (s.yag == null) s.yag = 100;
  if (s.zar == null) s.zar = 0;
  return s;
}
function zar(d) {
  const s = hazirla(d);
  s.zar += 1;
  const x = Math.sin(((d.tohum || 7) % 99991) * 0.013 + s.zar * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}
const ara = (d, lo, hi) => lo + Math.floor(zar(d) * (hi - lo + 1));
const adi = (k) => (HAMMADDELER[k] ? HAMMADDELER[k].ad : ZN.adi(k));
export const madenMi = (mekan) => !!(MEKANLAR[mekan] && MEKANLAR[mekan].saha === 'maden');
export const sahaMi = (mekan) => !!(MEKANLAR[mekan] && MEKANLAR[mekan].saha);

// --- Görünürlük: tükenmiş düğüm, tehlike, merdiven ---
function tukenmis(d, id) {
  return !!(d.saha && d.saha.tukenen[id] > ((d.zaman && d.zaman.sn) || 0));
}
for (const id of Object.keys(S_NOKTALAR)) {
  const n = S_NOKTALAR[id];
  if (n.saha === 'damar' || n.saha === 'kiyi') n.gorunur = (d) => !tukenmis(d, id);
  if (n.saha === 'tehlike') n.gorunur = (d) => !!(d.saha && d.saha.tehlike[n.kat] === 'var');
  if (n.saha === 'merdiven') n.gorunur = (d) => merdivenAcik(d, n.kat);
}
export function merdivenAcik(d, kat) {
  const s = d.saha;
  if (!s) return false;
  if ((s.temiz[kat] || 0) >= 2) return true;
  return GALERILER[kat].some((t, i) => t === 'kaya_duvari' && s.kirilan['md_' + kat + '_' + i]);
}

// --- Çanta (Paket 6: saha taşıma kapasitesi; koloniye dönünce depoya) ---
export function cantaDolu(d) {
  const s = hazirla(d);
  return Object.values(s.canta).reduce((a, b) => a + b, 0);
}
export function cantaKapasitesi(d) {
  const s = hazirla(d);
  if (s.eslik === 'demir_kervan') return Infinity;
  return CANTA_KAPASITE[s.alet.canta];
}
function cantayaKoy(d, k, n) {
  const s = hazirla(d);
  if (n <= 0) return 0;
  const yer = cantaKapasitesi(d) - cantaDolu(d);
  const al = Math.max(0, Math.min(n, yer));
  if (al > 0) s.canta[k] = (s.canta[k] || 0) + al;
  return al;
}
export function cantaBosalt(d) {
  const s = hazirla(d);
  const l = Object.keys(s.canta).filter((k) => s.canta[k] > 0);
  if (!l.length) return null;
  const m = l.map((k) => s.canta[k] + ' ' + adi(k));
  for (const k of l) ZN.ekle(d, k, s.canta[k]);
  s.canta = {};
  return 'Saha çantasındakiler koloni deposuna aktarıldı: ' + m.join(', ') + '.';
}
export function yorgunlukMetni(d) {
  const y = Math.round(hazirla(d).yorgunluk || 0);
  return y >= 100 ? 'Çok yorgunsun.' : y >= 60 ? 'Yorgunsun (yüzde ' + y + ').' : y > 0 ? 'Biraz yorgunsun (yüzde ' + y + ').' : 'Dinçsin.';
}
export function cantaMetni(d) {
  const s = hazirla(d);
  const l = Object.keys(s.canta).filter((k) => s.canta[k] > 0);
  const kap = cantaKapasitesi(d);
  return (l.length ? 'Çantada: ' + l.map((k) => s.canta[k] + ' ' + adi(k)).join(', ') + '. ' : 'Çanta boş. ') + (kap === Infinity ? 'Demir Kervan yanında; yük sınırı yok.' : cantaDolu(d) + ' / ' + kap + ' birim.');
}

// --- Aletler ---
function yipranmis(d, a) {
  return (hazirla(d).yip[a] || 0) >= YIPRANMA_ESIGI;
}
function kullan(d, a) {
  const s = hazirla(d);
  s.yip[a] = (s.yip[a] || 0) + 1;
  if (s.yip[a] === YIPRANMA_ESIGI) return ' ' + ALETLER[a].ad + ' köreldi; atölyede bilenmeli.';
  return '';
}
export function aletMetni(d, a) {
  const s = hazirla(d);
  const k = s.alet[a];
  return ALETLER[a].kademeler[k - 1] + ' (Kademe ' + k + ')' + (yipranmis(d, a) ? ', körelmiş' : '') + ': ' + ALETLER[a].etki[k - 1];
}
function bedelMetni(b) {
  return Object.keys(b).map((k) => b[k] + ' ' + adi(k)).join(', ');
}
function eksik(d, b) {
  return Object.keys(b).filter((k) => ZN.miktar(d, k) < b[k]);
}
export function aletYukselt(d, a) {
  const s = hazirla(d);
  const k = s.alet[a];
  if (k >= 3) return { metin: ALETLER[a].kademeler[2] + ' zaten en üst kademe.' };
  const b = ALET_BEDELI[a][k + 1];
  const e = eksik(d, b);
  if (e.length) return { metin: 'Eksik: ' + e.map((x) => b[x] - Math.floor(ZN.miktar(d, x)) + ' ' + adi(x)).join(', ') + '.', ses: 'red' };
  for (const x of Object.keys(b)) ZN.ekle(d, x, -b[x]);
  s.alet[a] = k + 1;
  s.yip[a] = 0;
  return { metin: ALETLER[a].kademeler[k] + ' hazır. ' + ALETLER[a].etki[k], ses: 'kaynak' };
}
export function aletBile(d, a) {
  const s = hazirla(d);
  if (!(s.yip[a] > 0)) return { metin: ALETLER[a].ad + ' keskin, bilemeye gerek yok.' };
  const usta = kademeOf(d, 'kaelon') >= 3 || kademeOf(d, 'veysel') >= 3;
  if (!usta) {
    const b = BILEME_BEDELI[a];
    const e = eksik(d, b);
    if (e.length) return { metin: 'Bilemek için ' + bedelMetni(b) + ' gerekir.', ses: 'red' };
    for (const x of Object.keys(b)) ZN.ekle(d, x, -b[x]);
  }
  s.yip[a] = 0;
  return { metin: ALETLER[a].ad + ' bilendi' + (usta ? '; ustalar bakımı ücretsiz yaptı.' : '.'), ses: 'kaynak' };
}
export function aletMenu(d) {
  hazirla(d);
  return {
    baslik: 'Aletler',
    giris: 'Kademe 2 dökümle, Kademe 3 kristal alaşımla yapılır. Envanterdeki alet sahaya girince kendiliğinden takılır.',
    ogeler: ALET_SIRASI.map((a) => ({
      id: a,
      etiket: aletMetni(d, a),
      alt: (x) => {
        const s = hazirla(x);
        const k = s.alet[a];
        return {
          baslik: ALETLER[a].ad,
          giris: aletMetni(x, a),
          ogeler: [
            ...(k < 3 ? [{ id: 'yukselt', etiket: ALETLER[a].kademeler[k] + ' yap: ' + bedelMetni(ALET_BEDELI[a][k + 1]), ipucu: ALETLER[a].etki[k], geri: true, yap: (z) => aletYukselt(z, a) }] : []),
            { id: 'bile', etiket: 'Bile' + (s.yip[a] ? ', kullanım ' + s.yip[a] : ''), geri: true, yap: (z) => aletBile(z, a) },
          ],
        };
      },
    })),
  };
}

// --- Vuruş: kaz, kır, kes, topla ---
function dugumTanimi(n) {
  return n.saha === 'damar' ? MADEN_DUGUMLERI[n.dugum] : KIYI_DUGUMLERI[n.dugum];
}
function yenidenBelirme(d, n) {
  // Kıyı: 30-60 gerçek saniye; maden: bir nöbet (yıldız saniyesi)
  return n.saha === 'kiyi' ? (30 + zar(d) * 30) * Z.zamanOrani() : Z.NOBET_SN;
}
export function vur(d, id) {
  const s = hazirla(d);
  const n = NOKTALAR[id];
  const t = dugumTanimi(n);
  if (tukenmis(d, id)) return { metin: 'Burası tükenmiş; biraz sonra yeniden belirir.' };
  const alet = n.saha === 'damar' ? 'kazma' : t.alet;
  const k = s.alet[alet];
  // Kaya duvarı: Mammoth tek darbe
  const mammoth = t.mammoth && s.eslik === 'mammoth';
  const gerek = mammoth ? 1 : t.vurus[k - 1];
  if (gerek == null) {
    const en = t.vurus.findIndex((x) => x != null) + 1;
    return { metin: 'Bu ' + t.ad + ' için en az ' + ALETLER[alet].kademeler[en - 1] + ' (Kademe ' + en + ') gerekir' + (t.mammoth ? '; ya da Mammoth eşliğinde gel' : '') + '.', ses: 'red' };
  }
  // Günlük yorgunluk (Paket 5 bölüm 4): aşhanede sıcak yemek, hamam ya da uyku giderir; karakolda yarıya iner
  if ((s.yorgunluk || 0) >= 100) return { metin: 'Kolların titriyor; çok yorgunsun. Aşhanede sıcak bir yemek, termal hamam ya da uyku iyi gelir; karakolda da nefeslenebilirsin.', ses: 'red' };
  s.yorgunluk = Math.min(100, (s.yorgunluk || 0) + (s.alet.canta >= 3 ? 1.1 : 1.5));
  const toplam = gerek + (yipranmis(d, alet) ? 1 : 0);
  s.vurus[id] = (s.vurus[id] || 0) + 1;
  const ek = kullan(d, alet);
  const vurusSesi = mammoth ? 'kaya_kirilma' : alet === 'balta' ? 'balta_vurus' : 'kazma_vurus';
  if (s.vurus[id] < toplam) return { metin: s.vurus[id] + ' / ' + toplam + '.' + ek, ses: vurusSesi, titresim: true };
  s.vurus[id] = 0;
  return dugumBitti(d, id, n, t, mammoth, ek);
}
function dugumBitti(d, id, n, t, mammoth, ek) {
  const s = d.saha;
  const alinan = [];
  const koy = (k, adet) => {
    if (adet <= 0) return true;
    const a = cantayaKoy(d, k, adet);
    if (a > 0) alinan.push(a + ' ' + adi(k));
    return a >= adet;
  };
  let dolu = false;
  if (n.dugum === 'kaya_duvari') {
    // Gizli oda: banda göre zengin damar; merdiven de açılır
    s.kirilan[id] = true;
    const b = bandi(n.kat);
    if (b === 'derin') {
      dolu = !koy('aether', ara(d, 1, 2)) || !koy('fosil', 1);
    } else {
      dolu = !koy('demir_cevheri', 3) || !koy('piezo', ara(d, 1, 2));
    }
    s.tukenen[id] = d.zaman.sn + Z.GUN_SN;
    s.temiz[n.kat] = (s.temiz[n.kat] || 0) + 1;
    return { metin: (mammoth ? 'Mammoth\'un matkabı duvarı tek darbede deldi. ' : 'Duvar çöktü. ') + 'Arkasında gizli bir damar odası ve aşağı inen bir kestirme: ' + (alinan.join(', ') || 'çantaya yer yok') + '.' + (dolu ? ' Çantan doldu.' : '') + ek, ses: 'kaya_kirilma', titresim: true };
  }
  const [liste, lo, hi] = t.urun;
  const k = liste[Math.floor(zar(d) * liste.length)];
  let adet = ara(d, lo, hi);
  if (s.eslik === 'akrep') adet += 1; // Akrep kırılan taşları toplar
  if (Z.etkiVar(d, 'madenSansi')) adet += 1; // 4.4: sunaktaki maden şansı tılsımı (Paket 12 bölüm 4)
  if (n.dugum === 'kuvars_gumus' && s.alet.kazma >= 2 && zar(d) < 0.3) adet += 1; // demir kazma yüzde otuz verimli
  dolu = !koy(k, adet);
  for (const [ek2, a, b] of t.ek || []) if (!dolu) dolu = !koy(ek2, ara(d, a, b));
  // Nadir: çekirdek damarında elmas/altın; Torvok K6 nadir şansı +%20
  if (t.nadir && !dolu && zar(d) < t.nadir[1] * (kademeOf(d, 'torvok') >= 6 ? 1.2 : 1)) dolu = !koy(t.nadir[0], 1);
  if (t.kalas && !dolu && zar(d) < t.kalas) dolu = !koy('kereste', 1);
  // T3 balta: ekstra reçine
  if (n.saha === 'kiyi' && t.alet === 'balta' && s.alet.balta >= 3 && !dolu) dolu = !koy('recine', 1);
  if (!alinan.length) return { metin: 'Çantan dolu (' + cantaDolu(d) + ' birim). Koloniye dönüp depoya boşalt' + (aracVar(d, 'demir_kervan') ? ' ya da Demir Kervan\'ı yanında getir' : '') + '.', ses: 'red' };
  s.tukenen[id] = d.zaman.sn + yenidenBelirme(d, n);
  if (n.saha === 'damar') s.temiz[n.kat] = (s.temiz[n.kat] || 0) + 1;
  const merdiven = n.saha === 'damar' && s.temiz[n.kat] === 2 && GALERILER[n.kat].includes('merdiven');
  return {
    metin: (t.devrilir ? 'Gövde gıcırdıyor... devrildi! ' : '') + alinan.join(', ') + ' çantaya.' + (dolu ? ' Çantan doldu.' : '') + (merdiven ? ' Galerinin dibinden rüzgâr uğultusu: aşağı iniş merdiveni açıldı.' : '') + ek,
    ses: t.devrilir ? 'agac_devrilme' : n.saha === 'kiyi' ? 'kaya_kirilma' : 'kaya_kirilma',
    titresim: true,
  };
}

// --- Maden asansörü ve galeriler ---
function galeriyeGit(d, kat) {
  const s = hazirla(d);
  const g = galeriMerkezi(kat);
  d.mekan = galeriMekani(kat);
  d.oyuncu = { x: g.x, y: 3, yon: 0 };
  if (!d.gorulenMekanlar) d.gorulenMekanlar = [];
  if (!d.gorulenMekanlar.includes(d.mekan)) d.gorulenMekanlar.push(d.mekan);
  s.temiz[kat] = s.temiz[kat] || 0;
  return galeriyeGiris(d, kat);
}
// Galeriye girişte tehlike ve pusu (Paket 6 4.1, Paket 13 2.3)
function galeriyeGiris(d, kat) {
  const s = d.saha;
  const b = bandi(kat);
  const tehlike = MADEN_TEHLIKE[kat];
  const notlar = [];
  // Temizlenen galerinin tehlikesi ertesi gün geri gelir
  if (tehlike) s.tehlike[kat] = s.tehlikeGun && s.tehlikeGun[kat] === Z.gun(d) ? 'temiz' : 'var';
  let p = PUSU_IHTIMALI[b];
  if (s.karakollar.includes('kat' + kat)) p *= 0.3;
  if (b === 'derin' && s.alet.fener >= 3 && s.yag > 0) p *= 0.5;
  if (s.eslik === 'col_tilkisi' && b === 'ust') p = 0;
  const kopek = !!(d.hayvan && d.hayvan.yoldas) && kat <= 10; // 4.5: Kaptan'ın xeno-köpeği (v5 Paket 15 4.1)
  const uyarici = s.eslik === 'akrep' || kopek || (s.alet.fener >= 2 && s.yag > 0 && b !== 'ust');
  if (s.tehlike[kat] === 'var' && uyarici) {
    notlar.push((s.eslik === 'akrep' ? 'Akrep önden döndü ve tıkırdadı: ' : kopek ? 'Köpeğin kulaklarını dikip havladı: ' : 'Fenerin akustik lambası bir yankı yakaladı: ') + 'İleride taşların arasında hareket var, ' + tehlike.ad + '. Savaşmak için ona yürü; kaçınmak için uzak dur.');
  } else if (s.tehlike[kat] !== 'temiz' && zar(d) < p) {
    const sp = tehlike || { dusmanlar: ['kaya_bocegi'], giris: 'Taşların arasından kaya böcekleri fırladı!' };
    d.savasBekle = { dusmanlar: sp.dusmanlar.slice(), ortam: 'kara', tier: b === 'derin' ? 2 : 1, gelis: sp.dusmanlar.length > 1 ? 'kiskac' : 'pusu', giris: 'Pusu! ' + sp.giris, arac: s.eslik || null };
    d.savasSonraSahne = 'saha_zafer';
    s.savasKat = kat;
    notlar.push('Pusu!');
  }
  return notlar.join(' ');
}
export function asansorMenu(d, yuzeyde) {
  const s = hazirla(d);
  const araclar = ['mammoth', 'demir_kervan', 'akrep', 'col_tilkisi'].filter((a) => aracVar(d, a));
  const durakOgeleri = s.duraklar.slice().sort((a, b) => a - b).map((kat) => ({
    id: 'k' + kat,
    etiket: 'Kat ' + kat + (s.karakollar.includes('kat' + kat) ? ', karakol' : ''),
    yap: (x) => {
      const n = galeriyeGit(x, kat);
      return { metin: 'Asansör gıcırdayarak iniyor. Kat ' + kat + '. ' + MEKANLAR[galeriMekani(kat)].tarif + (n ? ' ' + n : ''), ses: 'asansor', kapat: true, tasindi: true };
    },
  }));
  if (yuzeyde && araclar.length && !s.eslikSoruldu) {
    return {
      baslik: 'Maden asansörü',
      giris: 'Yürüyerek mi inilsin, yoksa bir araç eşlik etsin mi?',
      ogeler: [
        { id: 'yuru', etiket: 'Yürüyerek', alt: (x) => { hazirla(x).eslik = null; hazirla(x).eslikSoruldu = true; return asansorMenu(x, true); } },
        ...araclar.map((a) => ({ id: a, etiket: ARAC_ADI[a] + ' eşlik etsin', ipucu: ARAC_ROLU[a], alt: (x) => { hazirla(x).eslik = a; hazirla(x).eslikSoruldu = true; (hazirla(x).eslikGecmis || (hazirla(x).eslikGecmis = {}))[a] = 1; return asansorMenu(x, true); } })),
      ],
    };
  }
  return {
    baslik: 'Maden asansörü',
    giris: (s.eslik ? ARAC_ADI[s.eslik] + ' seninle. ' : '') + 'Açık duraklar: ' + s.duraklar.join(', ') + '. ' + cantaMetni(d),
    ogeler: [...durakOgeleri, ...(yuzeyde ? [] : [{ id: 'yuzey', etiket: 'Yüzeye çık', yap: (x) => yuzeyeCik(x) }])],
  };
}
export const ARAC_ADI = { mammoth: 'Mammoth', demir_kervan: 'Demir Kervan', akrep: 'Akrep', col_tilkisi: 'Çöl Tilkisi', atmosphere_x: 'Atmosphere-X' };
export const ARAC_ROLU = {
  mammoth: 'Kat 11-40 kalın kaya duvarlarını tek darbede deler; savaşta ağır zırh ve matkap.',
  demir_kervan: 'Maden ağzında park eder; çanta sınırını kaldırır, baskında siper olur.',
  akrep: 'Önden gidip pusuyu ve gaz cebini haber verir; kırılan taşları toplar.',
  col_tilkisi: 'Üst tünellerde (Kat 1-10) böceklerden sıyrılır; kıyıda yolu kısaltır.',
};
function yuzeyeCik(d) {
  const s = hazirla(d);
  d.mekan = 'vadi';
  d.oyuncu = { x: NOKTALAR.maden_agzi.x + 2.5, y: NOKTALAR.maden_agzi.y, yon: 0 };
  s.yag = 100;
  s.eslikSoruldu = false;
  const b = cantaBosalt(d);
  return { metin: 'Asansör seni yüzeye çıkardı. ' + (b || 'Çanta boştu.'), ses: 'asansor', kapat: true, tasindi: true };
}
function merdivenIn(d, kat) {
  const s = hazirla(d);
  const i = DURAKLAR.indexOf(kat);
  const sonraki = DURAKLAR[i + 1];
  if (!sonraki) return { metin: 'Daha aşağısı yok.' };
  if (!s.duraklar.includes(sonraki)) s.duraklar.push(sonraki);
  const n = galeriyeGit(d, sonraki);
  return { metin: 'Merdivenlerden iniyorsun. Kat ' + sonraki + '; asansör durağı artık açık. ' + MEKANLAR[galeriMekani(sonraki)].tarif + (n ? ' ' + n : ''), ses: 'adim', kapat: true, tasindi: true };
}
function tehlikeSaldir(d, kat) {
  const s = hazirla(d);
  const t = MADEN_TEHLIKE[kat];
  d.savasBekle = { dusmanlar: t.dusmanlar.slice(), ortam: 'kara', tier: bandi(kat) === 'derin' ? 2 : 1, gelis: t.dusmanlar.length > 1 ? 'kiskac' : 'tek', giris: t.giris, arac: s.eslik || null };
  d.savasSonraSahne = 'saha_zafer';
  s.savasKat = kat;
  return { metin: t.ad + ' üstüne yürüyorsun.', kapat: true };
}
function gazdanGec(d, kat) {
  const korunma = ZN.miktar(d, 'esya_termal_giysi') > 0 || d.bayrak.g_panzehir;
  d.zehir = Math.min(99, (d.zehir || 0) + (korunma ? 8 : 30));
  const s = hazirla(d);
  s.tehlike[kat] = 'temiz';
  if (!s.tehlikeGun) s.tehlikeGun = {};
  s.tehlikeGun[kat] = Z.gun(d);
  return { metin: 'Nefesini tutup gaz cebinin içinden geçtin' + (korunma ? '; giysin gazı büyük ölçüde kesti.' : '. Ciğerlerin yanıyor; maruziyet arttı.') + ' Pusucu karanlıkta kayboldu.', ses: 'tislama' };
}
ZAFER_KANCALARI.saha_zafer = (d) => {
  const s = hazirla(d);
  const kat = s.savasKat;
  if (kat != null) {
    s.tehlike[kat] = 'temiz';
    if (!s.tehlikeGun) s.tehlikeGun = {};
    s.tehlikeGun[kat] = Z.gun(d);
  }
  s.savasKat = null;
};

// --- İleri karakollar (Paket 6 4.2) ---
// Belgede: kıyı odunu + tuğla + demir + fener/kalkan. Tuğla Paket 10 ile gelene kadar bazalt.
export const KARAKOL_BEDELI = { kiyi_kerestesi: 12, tugla: 10, demir_cevheri: 6, kristal: 1 }; // 4.4: tuğla atölyenin fırınından
const KARAKOL_AKISI = { kat10: { bazalt: 3, komur: 2, ham_kil: 2 }, kat20: { demir_cevheri: 2, bakir: 1, komur: 2 }, kat30: { gumus_tozu: 1, piezo: 1 }, kiyi: { kiyi_kerestesi: 3, deniz_tuzu: 2, bitkisel_lif: 1 } };
export function karakolKur(d, yer) {
  const s = hazirla(d);
  if (s.karakollar.includes(yer)) return { metin: 'Karakol zaten kurulu.' };
  const e = eksik(d, KARAKOL_BEDELI);
  if (e.length) return { metin: 'İleri karakol için ' + bedelMetni(KARAKOL_BEDELI) + ' gerekir. Eksik: ' + e.map((x) => KARAKOL_BEDELI[x] - Math.floor(ZN.miktar(d, x)) + ' ' + adi(x)).join(', ') + '.', ses: 'red' };
  for (const x of Object.keys(KARAKOL_BEDELI)) ZN.ekle(d, x, -KARAKOL_BEDELI[x]);
  s.karakollar.push(yer);
  return { metin: 'İleri karakol kuruldu: fener direği, koruma bariyeri, sandık. Pusu ihtimali yüzde yetmiş azaldı; burada dinlenip fener yağını tazeleyebilirsin.' + (aracVar(d, 'demir_kervan') ? ' Demir Kervan her gün buradan koloniye malzeme taşıyacak.' : ' Bir Demir Kervan olunca her gün buradan malzeme taşınır.'), ses: 'kur' };
}
function karakolDinlen(d) {
  const s = hazirla(d);
  s.yag = 100;
  d.zehir = 0;
  s.yorgunluk = Math.round((s.yorgunluk || 0) / 2);
  return { metin: 'Karakolun bariyerinin ardında nefeslendin. Fener yağı doldu, ciğerlerin temizlendi, yorgunluğun yarıya indi.' };
}

// --- Nokta eylemleri ---
export function noktaMi(id) {
  return !!(id && NOKTALAR[id] && NOKTALAR[id].saha);
}
export function noktaEylemleri(d, id) {
  const n = NOKTALAR[id];
  const s = hazirla(d);
  if (n.saha === 'asansor') return [{ id: 'sh_asansor', etiket: 'Asansöre bin' }, { id: 'sh_canta', etiket: 'Saha çantası' }, { id: 'incele', etiket: 'İncele' }];
  if (n.saha === 'merdiven') return [{ id: 'sh_in', etiket: 'Merdivenlerden in' }, { id: 'incele', etiket: 'İncele' }];
  if (n.saha === 'tehlike') {
    const t = MADEN_TEHLIKE[n.kat];
    return [{ id: 'sh_saldir', etiket: 'Saldır: ' + t.ad }, ...(t.tur === 'gaz' ? [{ id: 'sh_gaz', etiket: 'Nefesini tutup gaz cebinden geç' }] : []), { id: 'incele', etiket: 'İncele' }];
  }
  if (n.saha === 'karakol') {
    const kurulu = s.karakollar.includes(n.karakol);
    return kurulu ? [{ id: 'sh_dinlen', etiket: 'Karakolda dinlen' }, { id: 'sh_canta', etiket: 'Saha çantası' }, { id: 'incele', etiket: 'İncele' }] : [{ id: 'sh_karakol', etiket: 'İleri karakol kur: ' + bedelMetni(KARAKOL_BEDELI) }, { id: 'incele', etiket: 'İncele' }];
  }
  if (n.saha === 'balik') return [{ id: 'sh_olta', etiket: 'Olta at' }, { id: 'sh_canta', etiket: 'Saha çantası' }, { id: 'incele', etiket: 'İncele' }];
  const t = dugumTanimi(n);
  const fiil = n.saha === 'damar' ? (n.dugum === 'kaya_duvari' ? 'Kır' : 'Kaz') : t.alet === 'balta' ? (n.dugum === 'lif_calisi' ? 'Kes ve topla' : 'Kes') : 'Kır';
  return [{ id: 'sh_vur', etiket: fiil + (s.vurus[id] ? ', ' + s.vurus[id] + ' vuruş' : '') }, { id: 'incele', etiket: 'İncele' }];
}
export function balikEngeli(d, nokta) {
  const s = hazirla(d);
  if (nokta === 'termal' && !s.duraklar.includes(10) && !s.karakollar.includes('kiyi')) return 'Sıcak akıntıya inen yol bilinmiyor. Madende Kat 10\'a in ya da kıyı kampını kur.';
  if (nokta === 'kayalik' && s.alet.olta < 2 && !aracVar(d, 'atmosphere_x')) return 'Kayalık koyun ucuna basit oltayla erişemezsin; güçlü olta (Kademe 2) ya da Atmosphere-X gerekir.';
  return null;
}
export function eylemUygula(d, id, eylemId) {
  const n = NOKTALAR[id];
  const s = hazirla(d);
  if (eylemId === 'sh_asansor') return { agac: (x) => asansorMenu(x, !madenMi(x.mekan)) };
  if (eylemId === 'sh_canta') return { metin: cantaMetni(d) + ' ' + yorgunlukMetni(d) + (madenMi(d.mekan) ? ' Fener yağı yüzde ' + Math.round(s.yag) + '.' : '') };
  if (eylemId === 'sh_in') return merdivenIn(d, n.kat);
  if (eylemId === 'sh_saldir') return tehlikeSaldir(d, n.kat);
  if (eylemId === 'sh_gaz') return gazdanGec(d, n.kat);
  if (eylemId === 'sh_karakol') return karakolKur(d, n.karakol);
  if (eylemId === 'sh_dinlen') return karakolDinlen(d);
  if (eylemId === 'sh_vur') return vur(d, id);
  if (eylemId === 'sh_olta') {
    const e = balikEngeli(d, n.balik);
    if (e) return { metin: e, ses: 'red' };
    return { olta: n.balik };
  }
  if (n.saha === 'damar') {
    const t = MADEN_DUGUMLERI[n.dugum];
    return { metin: t.ad + ', ' + n.yon + '. ' + (t.vurus[s.alet.kazma - 1] ? 'Kazman ' + t.vurus[s.alet.kazma - 1] + ' vuruşta açar.' : 'Kazman yetmez.') + (n.dugum === 'kaya_duvari' ? ' Tok bir yankı; ardında boşluk var gibi.' : '') };
  }
  return { metin: n.tarif || n.ad };
}

// --- Açılış: maden (dökümhane + Torvok ya da Kaelon), kıyı (Zarek, sırtlar görülünce) ---
export function madenKosulu(d) {
  return d.koloni.binalar.includes('dokumhane') && (katildi(d, 'torvok') || katildi(d, 'kaelon'));
}
export function kiyiKosulu(d) {
  return (d.gorulenMekanlar || []).includes('sirtlar') && katildi(d, 'zarek');
}
export function madenAc(d) {
  if (d.bayrak.madenAcik) return { metin: 'Maden ağzı zaten açık; vadide.' };
  if (!madenKosulu(d)) return { metin: '"Önce dökümhane kurulmalı Kaptan; kazdığımızı işleyecek bir yer lazım."' };
  d.bayrak.madenAcik = true;
  hazirla(d);
  return { metin: '"Vadinin güneybatısında, kayanın içinde eski bir kuyu buldum. Halatlı bir asansör kurdum; ilk durak Kat 1. Taş, kömür, kil, demir. Derinlere indikçe kristal ve gümüş; en dipte çekirdek taşı. Yanına kazma ve fener al." Maden ağzı vadide; Yerler listesinde.', ses: 'kur' };
}
export function kiyiAc(d) {
  if (d.bayrak.kiyiAcik) return { metin: 'Kıyıya inen yol zaten biliniyor; Manyetik Sırtlar\'ın doğu ucunda.' };
  if (!kiyiKosulu(d)) return { metin: '"Önce Manyetik Sırtlar\'ı birlikte görelim Kaptan; ötesini oradan ararım."' };
  d.bayrak.kiyiAcik = true;
  hazirla(d);
  return { metin: '"Sırtların doğusunda tuzlu bir rüzgâr var Kaptan. İzini sürdüm: aşağıda bir iç deniz! Kıyısında tuz, kayalık, sert yapraklı bir koru. Balık bile var." Kıyıya inen yokuş sırtların doğu ucunda.', ses: 'kur' };
}

// --- Her karede: saha çıkışında çanta, fener yağı, karakol akışı, kıyı akşam pusuları ---
export function sahaIlerle(d, dt) {
  const s = hazirla(d);
  const olaylar = [];
  const once = s.sonMekan;
  if (once !== d.mekan) {
    s.sonMekan = d.mekan;
    if (sahaMi(once) && !sahaMi(d.mekan)) {
      const b = cantaBosalt(d);
      s.yag = 100;
      s.eslikSoruldu = false;
      if (b) SB.haber(d, b);
    }
    if (d.mekan === 'kiyi' && once && !sahaMi(once)) {
      // Akşamları (Mavi Akşam, Altın Gece) kıyı mağaralarından yengeç sürüleri
      const aksam = Z.nobetNo(d) >= 4;
      let p = aksam ? 0.3 : 0;
      if (s.karakollar.includes('kiyi')) p *= 0.3;
      if (p && zar(d) < p) {
        const kopek = !!(d.hayvan && d.hayvan.yoldas);
        d.savasBekle = { dusmanlar: ['kiyi_yengec_surusu'], ortam: 'kara', tier: 1, gelis: kopek ? 'sizma' : 'kiskac', giris: (kopek ? 'Köpeğin bir tur önce havladı; hazırsın. ' : '') + 'Akşam karanlığında kıyı mağaralarından bir yengeç sürüsü çıktı!', arac: s.eslik || null };
        d.savasSonraSahne = 'saha_zafer';
      } else if (aksam) olaylar.push({ tur: 'haber', metin: 'Akşam oldu; kıyı mağaralarından tıkırtılar geliyor.' });
    }
  }
  // Fener yağı: orta ve derin katlarda yanar (gerçek saniye)
  if (madenMi(d.mekan) && bandi(MEKANLAR[d.mekan].maden) !== 'ust' && s.yag > 0) {
    const once2 = s.yag;
    s.yag = Math.max(0, s.yag - dt / 9);
    if (once2 > 25 && s.yag <= 25) SB.haber(d, 'Fenerin yağı azalıyor; karakolda ya da yüzeyde doldur.');
    if (once2 > 0 && s.yag <= 0) SB.haber(d, 'Fenerin yağı bitti; erken uyarı ve pusu koruması yok.');
  }
  // Karakol akışı: Demir Kervan varsa her gün
  const g = Z.gun(d);
  if (s.sonGun !== g) {
    const ilk = s.sonGun == null;
    s.sonGun = g;
    if (!ilk && aracVar(d, 'demir_kervan') && s.karakollar.length) {
      const top = {};
      for (const k of s.karakollar) for (const x of Object.keys(KARAKOL_AKISI[k] || {})) top[x] = (top[x] || 0) + KARAKOL_AKISI[k][x];
      for (const x of Object.keys(top)) ZN.ekle(d, x, top[x]);
      SB.haber(d, 'Demir Kervan karakollardan döndü: ' + Object.keys(top).map((x) => top[x] + ' ' + adi(x)).join(', ') + ' depoda.');
    }
  }
  return olaylar;
}

export const SAHNELER = {
  saha_zafer: {
    baslik: 'Galeri temizlendi',
    metin: () => ['Tehlike geçti. Taşların arası sessiz; kazmaya devam edebilirsin.'],
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
  },
};
void KARAKOL_DURAKLARI;

// Aletler: merkez terminalinde ve atölyede
export function ekEylemler(d, id) {
  if (id === 'terminal' || id === 'yb_atolye') return [{ id: 'sh_aletler', etiket: 'Aletler', ipucu: 'Kazma, balta, fener, olta, saha çantası: yükselt ve bile.' }];
  return [];
}
// Yerleşimcilerden açılış: Kaelon ya da Torvok madeni, Zarek kıyıyı açar (Paket 5 bölüm 2)
import * as YR from '../yerlesim/yerlesim';
YR.KISI_EKLERI.push((d, id) => {
  const l = [];
  if ((id === 'kaelon' || id === 'torvok') && !d.bayrak.madenAcik && madenKosulu(d)) l.push({ id: 'maden_ac', etiket: 'Maden kuyusunu aç', ipucu: 'Vadinin güneybatısında eski bir kuyu.', yap: (x) => madenAc(x) });
  if (id === 'zarek' && !d.bayrak.kiyiAcik && kiyiKosulu(d)) l.push({ id: 'kiyi_ac', etiket: 'Sırtların ötesini keşfet', ipucu: 'Doğudan tuzlu bir rüzgâr geliyor.', yap: (x) => kiyiAc(x) });
  return l;
});
