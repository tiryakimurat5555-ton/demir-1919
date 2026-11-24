// YGK Akademi bağ ağı (belgeler/v6 Paket 5 bölüm 4, karakter-01 … karakter-24): her hoca, yetkili ve öğrenciyle 0-10
// kademeli bağ; günde bir puanlı sohbet (seçimli konuşma sekansları), günde bir hediye, görevler (büyü bulmacaları ve
// kararlar). Büyük kademe sahneleri arasında en az bir oyun günü (bir günde en çok bir kademe).
//   Sınıf A (görev ağırlıklı %70): sohbet ve hediye yarı, görev 1,4 kat. Sınıf B (karma): olduğu gibi.
//   Bar hızı karakterin kendi eğrisi: hiz [[ilk kademe, son kademe, çarpan]].
//
// d.ygk = { k: { id: { p, k, sonKGun, sohbetGun, hediyeGun, sohbet: {sekans: seçim}, gorev: {gid: 'bitti'}, karar: {gid: i},
//          kirgin, selamNobet } }, aktif: gid | null, sonuc, haber: [] }
// Kişi verisi ygk/kisiler/*.js'te: kisiEkle(id, veri). Görev akışı: ygk_gorev sahnesi (hikâye) → büyü bulmacası (buyu/
// bulmaca.js, 'yg_<gid>') → ygk_secim sahnesi (kararlar) → sonuç. Bulmacasız görev doğrudan karara gider.
import * as Z from '../zaman';
import * as ZN from '../tonoflenya/zanaat';
import * as BY from '../buyu/buyu';
import * as BM from '../buyu/bulmaca';
import { gucEkle } from '../tonoflenya/kisiler';
import * as SY from './siyaset';
import { GOREV_YERLERI } from './harita';

export const KISILER = {};
export const KISI_SIRASI = [];
export const GOREVLER = {};
export function kisiEkle(id, v) {
  KISILER[id] = { id, ...v, gorevler: [] };
  KISI_SIRASI.push(id);
  for (const g of v.gorevler || []) gorevEkle(id, g);
}
// Bir kişiye görev ekle (paket 3 kürsü sınavları ve paket 5 AKD görevleri kişi dosyalarından ayrı eklenir)
export function gorevEkle(id, g) {
  KISILER[id].gorevler.push(g);
  GOREVLER[g.id] = { ...g, kisi: id };
  if (g.bulmaca) {
    BM.bulmacaEkle('yg_' + g.id, {
      ad: g.ad,
      giris: g.bulmaca.giris || g.durum || g.ad,
      dugumler: g.bulmaca.dugumler,
      hava: g.bulmaca.hava,
      bitis: g.bulmaca.bitis || 'Büyü yerini buldu.',
      odul: null,
      tekrar: true,
      basla: g.basla,
      kaliciTas: !!g.bulmaca.kaliciTas,
      sonra: (d) => {
        d.ygk.aktif = g.id;
        d.sahne = 'ygk_secim';
        return '';
      },
    });
  }
}
// Hediye kimlikleri (karakter-24 ve öğrenci dosyaları; v5 Paket 10 kataloğu): şişeler büyü çantasından gelir
export const HEDIYE_ADI = { sise_lumina: 'Beyaz Lumina şişesi', sise_solis: 'Sarı Solis şişesi' };

const gun = (d) => Z.gun(d);
export function hazirla(d) {
  if (!d.ygk) d.ygk = { k: {}, aktif: null, sonuc: null, haber: [] };
  return d.ygk;
}
export function kayit(d, id) {
  const y = hazirla(d);
  if (!y.k[id]) y.k[id] = { p: 0, k: 0, sonKGun: -1, sohbetGun: -1, hediyeGun: -1, sohbet: {}, gorev: {}, karar: {}, kirgin: false, selamNobet: -1 };
  return y.k[id];
}
export const kademe = (d, id) => (d.ygk && d.ygk.k[id] ? d.ygk.k[id].k : 0);
function hiz(kisi, k) {
  for (const [a, b2, c] of kisi.hiz || []) if (k >= a && k <= b2) return c;
  return 1;
}
// Puan ekle: tur 'sohbet' | 'hediye' | 'gorev'. Kademe günde en çok bir artar; artınca haber kuyruğu.
export function puanEkle(d, id, n, tur = 'gorev') {
  const kisi = KISILER[id];
  if (!kisi) return 0;
  const r = kayit(d, id);
  let x = n;
  if (n > 0) {
    x *= hiz(kisi, r.k) * (kisi.hizCarpani ? kisi.hizCarpani(d) : 1);
    if (kisi.sinif === 'A') x *= tur === 'gorev' ? 1.4 : 0.5;
    if (r.kirgin && tur !== 'gorev') x *= 0.5;
    x *= SY.carpan(d, kisi, tur);
  }
  x = Math.round(x);
  r.p = Math.max(0, Math.min(1000, r.p + x));
  kademeDenetle(d, id);
  return x;
}
export function kademeDenetle(d, id) {
  const r = kayit(d, id);
  const kisi = KISILER[id];
  const g = gun(d);
  let yeni = Math.min(10, Math.floor(r.p / 100));
  if (yeni > r.k && r.sonKGun !== g) {
    r.k += 1;
    r.sonKGun = g;
    hazirla(d).haber.push(kisi.ad + ' ile bağın kademe ' + r.k + ': ' + (kisi.kademeler[r.k] || '') );
    if (kisi.kademeEtki) kisi.kademeEtki(d, r.k);
  }
}
// Gün başında birikmiş puan bir kademe daha açabilir
export function ygkIlerle(d) {
  if (!d.ygk) return [];
  for (const id of Object.keys(d.ygk.k)) kademeDenetle(d, id);
  yerleriGuncelle(d);
  const h = d.ygk.haber;
  d.ygk.haber = [];
  return h.map((soz) => ({ tur: 'ygk', soz }));
}

// --- Sohbet (günde bir; Sınıf B seçimli sekans) ---
function sekansPuani(o, k) {
  if (typeof o.puan === 'number') return o.puan;
  return k >= (o.puan.esik || 5) ? o.puan.gec : o.puan.erken;
}
export function sohbetMenu(d, id) {
  const kisi = KISILER[id];
  const r = kayit(d, id);
  const g = gun(d);
  if (r.sohbetGun === g) return { baslik: kisi.ad, giris: kisi.ad + ' bugün seninle konuştu; yarın yine uğra.', ogeler: [] };
  const s = (kisi.sohbetler || []).find((x, i) => r.k >= (x.k || 0) && r.sohbet[i] == null);
  const i = s ? kisi.sohbetler.indexOf(s) : -1;
  if (!s) {
    return {
      baslik: kisi.ad + ' ile sohbet',
      giris: (kisi.gunluk || kisi.ad + ' seninle kısa bir sohbet ediyor.'),
      ogeler: [{ id: 'dinle', etiket: 'Dinle ve günün haberini sor', yap: (z) => {
        kayit(z, id).sohbetGun = gun(z);
        const n = puanEkle(z, id, 6, 'sohbet');
        return { metin: kisi.ad + ' biraz daha açıldı. Bağ artı ' + n + '.' };
      }, geri: true }],
    };
  }
  return {
    baslik: kisi.ad + ': ' + (s.ad || 'sohbet'),
    giris: s.soz,
    ogeler: s.secenekler.map((o, j) => ({ o, j })).filter(({ o }) => !o.kosul || o.kosul(d)).map(({ o, j }) => ({
      id: 's' + j,
      etiket: o.etiket,
      yap: (z) => {
        const rr = kayit(z, id);
        rr.sohbetGun = gun(z);
        rr.sohbet[i] = j;
        const n = puanEkle(z, id, sekansPuani(o, rr.k), 'sohbet');
        if (o.yap) o.yap(z);
        return { metin: (o.yanit || '') + ' Bağ ' + (n >= 0 ? 'artı ' + n : 'eksi ' + -n) + '.', efekt: n > 0 ? null : 'imza_yg_' + id + '_kizgin' };
      },
      geri: true,
    })),
  };
}

// --- Hediye (günde bir; sever iki kat; sevmez geri çevrilir, puan düşmez) ---
export function hediyeAdi(k) {
  return HEDIYE_ADI[k] || ZN.adi(k);
}
function hediyeVar(d, k) {
  if (k === 'sise_lumina') return BY.acikMi(d) && BY.siseVarMi(d, 'lumina');
  if (k === 'sise_solis') return BY.acikMi(d) && BY.siseVarMi(d, 'solis');
  return ZN.miktar(d, k) > 0;
}
function hediyeHarca(d, k) {
  if (k === 'sise_lumina') d.buyu.sise.lumina.shift();
  else if (k === 'sise_solis') d.buyu.sise.solis.shift();
  else ZN.ekle(d, k, -1);
}
const SIK_HEDIYELER = ['dunya_cayi', 'kavrulmus_kahve', 'sakin_cay', 'ekmek', 'borek', 'bal', 'urun_vaha_hurmasi', 'urun_kristal_cicek', 'urun_isik_otu', 'urun_fosforlu_liken', 'kristal_can', 'rezonans_lambasi', 'huzur_tutsusu', 'tamir_kiti', 'muhur_kutusu', 'gumus_tozu', 'fosil', 'piezo', 'komur', 'demir_cevheri', 'oyuncak', 'sise_lumina', 'sise_solis'];
export function hediyeMenu(d, id) {
  const kisi = KISILER[id];
  const r = kayit(d, id);
  if (r.hediyeGun === gun(d)) return { baslik: 'Hediye: ' + kisi.ad, giris: 'Bugün ' + kisi.ad + '\'a hediye verdin. Günde bir.', ogeler: [] };
  const l = [...new Set([...(kisi.sever || []), ...SIK_HEDIYELER])].filter((k) => hediyeVar(d, k));
  return {
    baslik: 'Hediye: ' + kisi.ad,
    giris: l.length ? 'Ne vereceksin?' + (kisi.hediyeNot ? ' ' + kisi.hediyeNot : '') : 'Çantanda verecek uygun bir şey yok.',
    ogeler: l.map((k) => ({ id: 'h_' + k, etiket: hediyeAdi(k), yap: (z) => hediyeVer(z, id, k), geri: true })),
  };
}
export function hediyeVer(d, id, k) {
  const kisi = KISILER[id];
  const r = kayit(d, id);
  if (r.hediyeGun === gun(d)) return { metin: 'Bugün hediye verdin.', ses: 'red' };
  if (!hediyeVar(d, k)) return { metin: 'Elinde yok.', ses: 'red' };
  r.hediyeGun = gun(d);
  if ((kisi.sevmez || []).includes(k)) return { metin: kisi.ad + ' ' + hediyeAdi(k).toLocaleLowerCase('tr') + ' hediyeni kenara itti: ' + (kisi.sevmezSoz || 'hiç ilgisini çekmedi.') + ' Güven düşmedi ama bugünkü hakkın gitti.', efekt: 'imza_yg_' + id + '_kizgin' };
  hediyeHarca(d, k);
  const sever = (kisi.sever || []).includes(k);
  const n = puanEkle(d, id, sever ? 30 : 12, 'hediye');
  return { metin: kisi.ad + (sever ? ' gözleri parlayarak aldı: ' + (kisi.severSoz || 'tam istediği şeydi.') : ' teşekkür ederek aldı.') + ' Bağ artı ' + n + '.', efekt: sever ? 'imza_yg_' + id + '_tesekkur' : null };
}

// --- Görevler ---
export function gorevDurumu(d, gid) {
  const g = GOREVLER[gid];
  const r = kayit(d, g.kisi);
  if (r.gorev[gid] === 'bitti') return 'bitti';
  if (r.k < (g.k || 0)) return 'kademe';
  if ((g.once || []).some((x) => kayit(d, GOREVLER[x].kisi).gorev[x] !== 'bitti')) return 'once';
  if (g.kosul && !g.kosul(d)) return 'kosul';
  if (g.bulmaca && !BY.acikMi(d)) return 'asa';
  return 'acik';
}
const TUR_ADI = { bag: 'Bağ, güvenli', hiyerarsi: 'Hiyerarşi', zincir: 'Zincir, domino', final: 'Final', evrim: 'Evrimsel büyü hattı' };
// Paket 4 bölüm 5: her görevin başında sınıf etiketi okunur
export const TUR_ETIKET = { bag: '[Bağ, güvenli] ', hiyerarsi: '[Hiyerarşi] ', zincir: '[Zincir] ', final: '[Final] ', evrim: '[Evrimsel] ' };
// Yerinde yapılan görevler (ygk/harita.js GOREV_YERLERI): kişiden alınır, işaretli yerde başlar. Açık olanlar
// d.ygk.acikYer'de (harita noktası görünür ve konumlu ses verir).
export function yerleriGuncelle(d) {
  const y = hazirla(d);
  const a = {};
  for (const gid of Object.keys(GOREV_YERLERI)) if (GOREVLER[gid] && gorevDurumu(d, gid) === 'acik' && !ulasilamaz(d, GOREVLER[gid].kisi)) a[gid] = true;
  y.acikYer = a;
}
const ulasilamaz = (d, id) => !!(KISILER[id].ulasilamaz && KISILER[id].ulasilamaz(d));
export const gorevYeri = (gid) => GOREV_YERLERI[gid] || null;
export function gorevlerMenu(d, id) {
  const kisi = KISILER[id];
  const l = (kisi.gorevler || []).map((g) => {
    const s = gorevDurumu(d, g.id);
    const yer = GOREV_YERLERI[g.id];
    const not = (yer && s === 'acik' ? ', yerinde: ' + yer.ad : '') + (s === 'bitti' ? ', tamamlandı' : s === 'kademe' ? ', kademe ' + g.k + ' gerekir' : s === 'once' ? ', önce ' + g.once.join(' ve ') : s === 'kosul' ? ', ' + (g.kosulMetni || 'henüz değil') : s === 'asa' ? ', uyanmış bir asa gerekir' : ', açık');
    return { id: g.id, etiket: (TUR_ETIKET[g.tur] || '') + g.id + ': ' + g.ad + not, ipucu: TUR_ADI[g.tur] + '. ' + (g.durum || ''), yap: (z) => gorevBaslat(z, g.id) };
  });
  return { baslik: kisi.ad + ': görevler', giris: l.length ? '' : 'Bu kişinin görevi yok.', ogeler: l };
}
export function gorevBaslat(d, gid) {
  const s = gorevDurumu(d, gid);
  const g = GOREVLER[gid];
  if (s === 'bitti') return { metin: g.ad + ' tamamlandı.' };
  if (s !== 'acik') return { metin: 'Henüz açılmadı.', ses: 'red' };
  if (d.savas) return { metin: 'Önce çatışmayı bitir.', ses: 'red' };
  const yer = GOREV_YERLERI[gid];
  if (yer && d.mekan !== yer.mekan) {
    yerleriGuncelle(d);
    return { metin: g.ad + ' yerinde yapılır: ' + yer.ad + '. Oraya git; Yerler listesinde ve haritada işaretli, yaklaşınca sesini duyarsın.' };
  }
  hazirla(d).aktif = gid;
  d.sahne = 'ygk_gorev';
  return { metin: '' };
}
// Bulmaca ya da karar sonrası
function secimUygula(d, g, i) {
  const o = (g.secimler || [])[i];
  const r = kayit(d, g.kisi);
  const sozler = [];
  if (o) {
    r.karar[g.id] = i;
    for (const k of Object.keys(o.puan || {})) {
      if (KISILER[k]) {
        const n = puanEkle(d, k, o.puan[k]);
        sozler.push(KISILER[k].ad + ' ' + (n >= 0 ? 'artı ' + n : 'eksi ' + -n));
      } else if (k.indexOf('g_') === 0) gucEkle(d, k.slice(2), o.puan[k]);
    }
    if (o.yap) o.yap(d);
    if (o.bayrak) for (const b of o.bayrak) d.bayrak[b] = true;
    if (o.kirgin) for (const k of o.kirgin) kayit(d, k).kirgin = true;
  }
  if (g.tur === 'zincir') SY.tepkiEkle(d, g.bolge || KISILER[g.kisi].guc || 'ygk');
  r.gorev[g.id] = 'bitti';
  if (g.puan) {
    const n = puanEkle(d, g.kisi, g.puan);
    sozler.unshift(KISILER[g.kisi].ad + ' artı ' + n);
  }
  // Seçeneğin kendi ödülü (5.3'e kadar uygulanmıyordu) ve kodeks kaydı
  const od = [BM.odulVer(d, g.odul), o ? BM.odulVer(d, o.odul) : ''].filter(Boolean).join(' ');
  const kod = (o && o.kodeks) || g.kodeks;
  if (kod && d.kodeks && !d.kodeks.some((k) => k.id === kod)) d.kodeks.push({ id: kod, ad: g.ad, tarif: (g.durum || '') + ' ' + ((o && typeof o.sonuc === 'string' && o.sonuc) || ''), itibar: 10 });
  if (g.yap) g.yap(d);
  const son = [(o && o.sonuc) || g.sonuc, g.bitisMetni].filter(Boolean).map((m) => (typeof m === 'function' ? m(d) : m)).join(' ');
  return son + (od ? ' ' + od : '') + (sozler.length ? ' Bağ: ' + sozler.join(', ') + '.' : '');
}
export const SAHNELER = {
  ygk_gorev: {
    baslik: (d) => (d.ygk && d.ygk.aktif ? GOREVLER[d.ygk.aktif].id + ': ' + GOREVLER[d.ygk.aktif].ad : 'Görev'),
    metin: (d) => {
      const g = GOREVLER[d.ygk.aktif];
      return [...(g.hikaye || [g.durum || '']).map((m) => (typeof m === 'function' ? m(d) : m)), g.bulmaca ? 'Büyü çözümü: ' + (g.cozum || 'asanla düğümleri çöz.') : ''].filter(Boolean);
    },
    secenekler: (d) => {
      const g = GOREVLER[d.ygk.aktif];
      if (g.bulmaca) return [
        { etiket: 'Asanı kaldır: bulmacaya başla', yap: (z) => BM.baslat(z, 'yg_' + g.id, { ogren: g.ogren || null }), sonra: null, buyu: true },
        { etiket: 'Sonra', yap: (z) => { z.ygk.aktif = null; }, sonra: null },
      ];
      return [{ etiket: 'Devam', sonra: 'ygk_secim' }, { etiket: 'Sonra', yap: (z) => { z.ygk.aktif = null; }, sonra: null }];
    },
  },
  ygk_secim: {
    baslik: (d) => GOREVLER[d.ygk.aktif].ad,
    metin: (d) => {
      const g = GOREVLER[d.ygk.aktif];
      return [g.secimSoru || (g.secimler && g.secimler.length ? 'Ne yapacaksın?' : 'Büyü yerini buldu.')];
    },
    secenekler: (d) => {
      const g = GOREVLER[d.ygk.aktif];
      const l = (g.secimler || []).map((o, i) => ({ o, i })).filter(({ o }) => !o.kosul || o.kosul(d));
      const sec = (i) => (z) => {
        z.ygk.sonuc = secimUygula(z, g, i);
        z.ygk.aktif = null;
      };
      if (!l.length) return [{ etiket: 'Devam', yap: sec(-1), sonra: 'ygk_sonuc' }];
      return l.map(({ o, i }) => ({ etiket: typeof o.etiket === 'function' ? o.etiket(d) : o.etiket, yap: sec(i), sonra: 'ygk_sonuc' }));
    },
  },
  ygk_sonuc: {
    baslik: 'Sonuç',
    efekt: ['by_basari'],
    metin: (d) => [d.ygk.sonuc || ''],
    // Bir seçenek kendi kapanış sahnesini isteyebilir (Paket 8 büyü finali: bf_akor)
    secenekler: (d) => [{ etiket: 'Devam', yap: (z) => { z.ygk.sonraSahne = null; }, sonra: (d.ygk && d.ygk.sonraSahne) || null }],
  },
};

// --- Telafi (paket 2 bölüm 4: kırgın usta yolu). Kırgınlık sohbet ve hediyeyi yarıya indirir, hiçbir görevi kilitlemez;
// telafi kişinin sevdiği bir eşyadan iki tane ya da 40 GK ister.
export const KISI_EKLERI = [];
function telafiBedeli(d, id) {
  const k = (KISILER[id].sever || []).find((x) => !x.startsWith('sise_') && ZN.miktar(d, x) >= 2);
  if (k) return { esya: k };
  if (d.para && (d.para.gk || 0) >= 40) return { gk: 40 };
  return null;
}
export function telafiMetni(d, id) {
  const b = telafiBedeli(d, id);
  if (!b) return 'Telafi için sevdiği bir eşyadan iki tane ya da 40 GK gerekir.';
  return b.esya ? 'Bedel: iki ' + hediyeAdi(b.esya) + '.' : 'Bedel: 40 GK.';
}
export function telafi(d, id) {
  const b = telafiBedeli(d, id);
  if (!b) return { metin: telafiMetni(d, id), ses: 'red' };
  if (b.esya) ZN.ekle(d, b.esya, -2);
  else d.para.gk -= 40;
  kayit(d, id).kirgin = false;
  puanEkle(d, id, 10, 'gorev');
  return { metin: KISILER[id].ad + ' kırgınlığını bir kenara bıraktı.', efekt: 'imza_yg_' + id + '_tesekkur' };
}

// --- Kişi menüsü ---
export function kisiMenu(d, id) {
  const kisi = KISILER[id];
  const r = kayit(d, id);
  return {
    baslik: kisi.ad,
    giris: kisi.unvan + '. Bağ kademesi ' + r.k + ': ' + (kisi.kademeler[r.k] || '') + (r.kirgin ? ' Sana kırgın; telafi gerekir.' : ''),
    ogeler: [
      { id: 'sohbet', etiket: 'Sohbet' + (r.sohbetGun === gun(d) ? ', bugün konuştunuz' : ''), alt: (z) => sohbetMenu(z, id) },
      { id: 'gorev', etiket: 'Görevler', alt: (z) => gorevlerMenu(z, id) },
      { id: 'hediye', etiket: 'Hediye ver' + (r.hediyeGun === gun(d) ? ', bugün verdin' : ''), alt: (z) => hediyeMenu(z, id) },
      { id: 'profil', etiket: 'Profil', alt: (z) => profilMenu(z, id) },
      ...(r.kirgin ? [{ id: 'telafi', etiket: 'Telafi et', ipucu: telafiMetni(d, id), yap: (z) => telafi(z, id), geri: true }] : []),
      ...(KISI_EKLERI.flatMap((f) => f(d, id) || [])),
    ],
  };
}
export function profilMenu(d, id) {
  const kisi = KISILER[id];
  const r = kayit(d, id);
  const l = [
    { id: 'kim', etiket: 'Kim', ipucu: (kisi.kimlik || []).join(' '), yap: () => ({ metin: (kisi.kimlik || []).join(' ') }) },
    { id: 'sinif', etiket: 'Bağ sınıfı: ' + (kisi.sinif === 'A' ? 'A, görev ağırlıklı' : 'B, sohbet ve görev'), ipucu: kisi.hizMetni || '', yap: () => ({ metin: kisi.hizMetni || '' }) },
    { id: 'sever', etiket: 'Sever: ' + (kisi.sever || []).map(hediyeAdi).join(', ') + '. Sevmez: ' + (kisi.sevmez || []).map(hediyeAdi).join(', '), yap: () => ({ metin: kisi.hediyeNot || '' }) },
    ...(kisi.sosyal || []).map((s, i) => ({ id: 'so' + i, etiket: s[0] + ': ' + s[1], yap: () => ({ metin: s[2] || s[1] }) })),
    ...kisi.kademeler.slice(0, r.k + 1).map((m, i) => ({ id: 'k' + i, etiket: 'Kademe ' + i + ': ' + m, yap: () => ({ metin: m }) })),
  ];
  return { baslik: kisi.ad + ': profil', giris: '', ogeler: l };
}
// Selam: nöbette bir kez imza sesi
export function selamla(d, id) {
  const r = kayit(d, id);
  const n = Math.floor(d.zaman.sn / Z.NOBET_SN);
  if (r.selamNobet === n) return null;
  r.selamNobet = n;
  return 'imza_yg_' + id + '_selam';
}
