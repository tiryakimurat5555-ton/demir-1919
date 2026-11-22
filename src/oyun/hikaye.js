// Karakter merkezli hikâye motoru (belgeler/v4/gorev-ve-hikaye-harmanlama-mimarisi.txt bölüm 1 ve 4). Saf JavaScript.
//
//   Beş adımlı harman: karakter çağrısı → hazırlık → mücadele (sesli bulmaca ve/veya evrensel savaş) → karar →
//   kalıcı iz. Her hikâye: { kod, ad, veren, grup, ortam, tetik(d), giris(d) [satırlar], hazirlik(d), adimlar, kararlar,
//   odul (metin ya da işlev), bitince(d) }.
//   adimlar: { op: [operasyon adımları], bitis } | { savas: spec | (d) => spec, bitis } | { karar: [seçenekler], soru } ;
//     her adımın isteğe bağlı atla(d) ve atlaMetni'si var (doğru eşya ya da bina varsa adım geçilir).
//   kararlar: [{ etiket, kosul(d), kosulMetni, sonuc, yap(d) }] (son karar; yoksa hikâye zaferle biter).
//   d.hikaye = { biten: { id: karar sırası | -1 }, aktif, adim, bekleyen [id], ertele (sn), son (metin), notlar [] }
//   Tetik koşulu sağlanan hikâye telsizden duyurulur ve boşta olunca (sahne, operasyon, çatışma, uzay yokken) açılır;
//   "Sonra" denirse bir nöbet bekler. Menüde "Hikâye çağrıları": bekleyenler ve bitenler.
import { NOBET_SN } from './zaman';
import { OPERASYONLAR } from './veri/uzayGorevleri';
import * as SB from './tonoflenya/subay';
import * as ZN from './tonoflenya/zanaat';

export const HIKAYELER = {};
export const HIKAYE_SIRASI = [];
const simdi = (d) => (d.zaman && d.zaman.sn) || 0;
const metin = (x, d) => (typeof x === 'function' ? x(d) : x);

export function hikayeEkle(id, h) {
  HIKAYELER[id] = h;
  HIKAYE_SIRASI.push(id);
  h.adimlar = h.adimlar || [];
  h.adimlar.forEach((a, i) => {
    if (a.op) OPERASYONLAR['hk_' + id + '_' + i] = { yuzey: !a.uzay, final: true, hikaye: id, adimlar: a.op, sonuc: () => [], odul: {}, sahne: 'hk_ara' };
  });
}

export function hikaye(d) {
  if (!d.hikaye) d.hikaye = { biten: {}, aktif: null, adim: -1, bekleyen: [], ertele: 0, son: '', notlar: [] };
  return d.hikaye;
}
export function bittiMi(d, id) {
  return hikaye(d).biten[id] != null;
}
export function karari(d, id) {
  const k = hikaye(d).biten[id];
  return k == null ? null : k;
}

// Sıradaki adımı (atlanacakları geçerek) bulur; d'yi değiştirmez
function sonrakiAdim(d, h, i) {
  let j = i + 1;
  const atlanan = [];
  while (j < h.adimlar.length && h.adimlar[j].atla && h.adimlar[j].atla(d)) {
    atlanan.push(metin(h.adimlar[j].atlaMetni, d) || '');
    j++;
  }
  return { j, atlanan };
}
// Devam edince hangi sahneye geçileceği (saf)
function planla(d) {
  const hk = hikaye(d);
  const h = HIKAYELER[hk.aktif];
  if (!h) return null;
  const { j } = sonrakiAdim(d, h, hk.adim);
  if (j >= h.adimlar.length) return h.kararlar && h.kararlar.length ? 'hk_karar' : 'hk_sonuc';
  const a = h.adimlar[j];
  if (a.karar) return 'hk_karar';
  return null; // operasyon ya da çatışma bekler
}
// Planı uygular
function ilerle(d) {
  const hk = hikaye(d);
  const h = HIKAYELER[hk.aktif];
  const { j, atlanan } = sonrakiAdim(d, h, hk.adim);
  hk.adim = j;
  if (atlanan.filter(Boolean).length) hk.notlar.push(...atlanan.filter(Boolean));
  if (j >= h.adimlar.length) {
    hk.evre = 'karar';
    if (!(h.kararlar && h.kararlar.length)) bitir(d, null);
    return;
  }
  const a = h.adimlar[j];
  if (a.op) {
    hk.evre = 'op';
    d.opBekle = 'hk_' + hk.aktif + '_' + j;
  } else if (a.savas) {
    hk.evre = 'savas';
    d.savasBekle = { ...metin(a.savas, d) };
    d.savasSonraSahne = 'hk_ara';
  } else if (a.karar) hk.evre = 'ara_karar';
}
function bitir(d, karar) {
  const hk = hikaye(d);
  const id = hk.aktif;
  const h = HIKAYELER[id];
  const i = karar ? h.kararlar.indexOf(karar) : -1;
  if (karar && karar.yap) karar.yap(d);
  hk.biten[id] = i;
  if (h.bitince) h.bitince(d, i);
  hk.son = [hk.notlar.join(' '), karar ? karar.sonuc : '', metin(h.odul, d) || ''].filter(Boolean).join(' ');
  hk.notlar = [];
  hk.aktif = null;
  hk.adim = -1;
  hk.evre = null;
  hk.bekleyen = hk.bekleyen.filter((x) => x !== id);
  d.itibar += 25;
  d.kaptan.tecrube += 50;
}

export function baslat(d, id) {
  const hk = hikaye(d);
  if (hk.aktif || bittiMi(d, id)) return false;
  hk.aktif = id;
  hk.adim = -1;
  hk.evre = 'giris';
  hk.notlar = [];
  d.sahne = 'hk_giris';
  return true;
}

// Her karede (gorevler.zamanIlerle): yeni çağrılar, yarım kalanlar, boşta olunca açılış
export function hikayeIlerle(d) {
  const hk = hikaye(d);
  const t = simdi(d);
  for (const id of HIKAYE_SIRASI) {
    if (bittiMi(d, id) || hk.bekleyen.includes(id) || hk.aktif === id) continue;
    let ok = false;
    try {
      ok = !!HIKAYELER[id].tetik(d);
    } catch (e) {
      ok = false;
    }
    if (ok) {
      hk.bekleyen.push(id);
      SB.haber(d, 'Telsiz çağrısı, ' + HIKAYELER[id].veren + ': ' + HIKAYELER[id].ad + '.');
    }
  }
  // Yarım kalan (operasyondan çekilme ya da yenilgi): hikâye bekleyenlere döner
  if (hk.aktif && !d.sahne && !d.op && !d.opBekle && !d.savas && !d.savasBekle && (hk.evre === 'op' || hk.evre === 'savas')) {
    SB.haber(d, HIKAYELER[hk.aktif].ad + ' yarım kaldı. Menüdeki hikâye çağrılarından yeniden başlayabilirsin.');
    hk.aktif = null;
    hk.adim = -1;
    hk.evre = null;
    hk.ertele = t + NOBET_SN;
  }
  if (!hk.aktif && hk.bekleyen.length && t >= (hk.ertele || 0) && bosta(d)) baslat(d, hk.bekleyen[0]);
}
function bosta(d) {
  return !d.sahne && !d.op && !d.opBekle && !d.savas && !d.savasBekle && !d.uzay && !d.valf && !d.ayar && !d.terazi && !(d.komuta && d.komuta.aktif) && !(d.tf && d.tf.aktif) && !(d.yan && d.yan.aktif);
}

export const SAHNELER = {
  hk_giris: {
    baslik: 'Telsiz çağrısı',
    efekt: ['telsiz_zil'],
    ortam: (d) => {
      const h = HIKAYELER[hikaye(d).aktif];
      return (h && h.ortam) || null;
    },
    metin: (d) => {
      const h = HIKAYELER[hikaye(d).aktif];
      if (!h) return [];
      return [(h.kod ? h.kod + ': ' : '') + h.ad + '.', 'Konuşan: ' + h.veren + '.', ...metin(h.giris, d), ...(h.hazirlik ? [metin(h.hazirlik, d)] : [])];
    },
    secenekler: (d) => {
      const hk = hikaye(d);
      if (!HIKAYELER[hk.aktif]) return [{ etiket: 'Devam', sonra: null }];
      const h = HIKAYELER[hk.aktif];
      // Hikâyenin hazırlık bedeli (ör. kubbe vanaları için metan): eksikse başlamaz
      const g = metin(h.gerek, d) || {};
      const eksik = Object.keys(g).filter((k) => ZN.miktar(d, k) < g[k]);
      const bas = eksik.length
        ? { etiket: 'Başla (eksik: ' + eksik.map((k) => g[k] + ' ' + ZN.adi(k)).join(', ') + ')', sonra: 'hk_giris' }
        : { etiket: 'Başla', yap: () => { for (const k of Object.keys(g)) ZN.ekle(d, k, -g[k]); ilerle(d); }, sonra: planla(d) };
      return [
        bas,
        { etiket: 'Sonra', yap: () => { hk.aktif = null; hk.evre = null; hk.ertele = simdi(d) + NOBET_SN; }, sonra: null },
      ];
    },
  },
  hk_ara: {
    baslik: 'Adım tamam',
    efekt: ['sinyal'],
    metin: (d) => {
      const hk = hikaye(d);
      const h = HIKAYELER[hk.aktif];
      if (!h) return [];
      const a = h.adimlar[hk.adim];
      const son = a && a.op ? a.op[a.op.length - 1].bitis : 'Çatışma kazanıldı.';
      const l = [a && a.bitis ? metin(a.bitis, d) : son];
      const { j } = sonrakiAdim(d, h, hk.adim);
      const s = h.adimlar[j];
      if (s && s.giris) l.push(metin(s.giris, d));
      return l;
    },
    secenekler: (d) => {
      const hk = hikaye(d);
      const h = HIKAYELER[hk.aktif];
      if (!h) return [{ etiket: 'Devam', sonra: null }];
      const { j } = sonrakiAdim(d, h, hk.adim);
      const s = h.adimlar[j];
      return [{ etiket: s && s.savas ? 'Çatışmaya gir' : 'Devam', yap: () => ilerle(d), sonra: planla(d) }];
    },
  },
  hk_karar: {
    baslik: 'Karar anı',
    metin: (d) => {
      const hk = hikaye(d);
      const h = HIKAYELER[hk.aktif];
      if (!h) return [];
      const a = h.adimlar[hk.adim];
      if (a && a.karar) return [metin(a.soru, d) || 'Karar senin.'];
      return [metin(h.kararSoru, d) || 'Karar senin.'];
    },
    secenekler: (d) => {
      const hk = hikaye(d);
      const h = HIKAYELER[hk.aktif];
      if (!h) return [{ etiket: 'Devam', sonra: null }];
      const a = h.adimlar[hk.adim];
      // Ara karar: seçimin etkisi uygulanır, hikâye sürer
      if (a && a.karar) {
        return a.karar.map((c) => {
          const ok = !c.kosul || c.kosul(d);
          return {
            etiket: c.etiket + (ok ? '' : ' (' + c.kosulMetni + ')'),
            yap: () => {
              if (!ok) return;
              if (c.yap) c.yap(d);
              if (c.sonuc) hk.notlar.push(metin(c.sonuc, d));
              hk.secim = { ...(hk.secim || {}), [hk.aktif + '_' + hk.adim]: a.karar.indexOf(c) };
              ilerle(d);
            },
            sonra: ok ? planlaSonra(d) : 'hk_karar',
          };
        });
      }
      return h.kararlar.map((c) => {
        const ok = !c.kosul || c.kosul(d);
        return { etiket: c.etiket + (ok ? '' : ' (' + c.kosulMetni + ')'), yap: () => { if (ok) bitir(d, c); }, sonra: ok ? 'hk_sonuc' : 'hk_karar' };
      });
    },
  },
  hk_sonuc: {
    baslik: 'Hikâye tamam',
    efekt: ['sinyal'],
    metin: (d) => [hikaye(d).son],
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
  },
};
// Ara karardan sonra nereye (saf): ara kararın kendisi geçilmiş sayılır
function planlaSonra(d) {
  const hk = hikaye(d);
  const h = HIKAYELER[hk.aktif];
  const { j } = sonrakiAdim(d, h, hk.adim);
  if (j >= h.adimlar.length) return h.kararlar && h.kararlar.length ? 'hk_karar' : 'hk_sonuc';
  return h.adimlar[j].karar ? 'hk_karar' : null;
}
// Ara kararın seçilen sırası (sonraki adımlar ve sonuç buna göre dallanır)
export function secimi(d, id, adim) {
  const s = hikaye(d).secim || {};
  const k = s[id + '_' + adim];
  return k == null ? null : k;
}

// Menü: bekleyen ve biten hikâyeler
export function hikayeMenu(d) {
  const hk = hikaye(d);
  const biten = HIKAYE_SIRASI.filter((id) => bittiMi(d, id));
  return {
    baslik: 'Hikâye çağrıları',
    giris: (hk.aktif ? 'Süren: ' + HIKAYELER[hk.aktif].ad + '. ' : '') + hk.bekleyen.length + ' bekleyen, ' + biten.length + ' biten hikâye.',
    ogeler: [
      ...hk.bekleyen.map((id) => ({ id, etiket: 'Bekliyor: ' + HIKAYELER[id].ad + ', ' + HIKAYELER[id].veren + '.', ipucu: 'Çift dokun: başla.', yap: (x) => (baslat(x, id) ? { metin: '' } : { metin: 'Önce süren hikâye bitsin.', ses: 'red' }) })),
      ...biten.map((id) => ({ id: 'b_' + id, etiket: 'Bitti: ' + HIKAYELER[id].ad + (karari(d, id) >= 0 && HIKAYELER[id].kararlar ? ', seçimin: ' + HIKAYELER[id].kararlar[karari(d, id)].etiket : '') + '.' })),
    ],
  };
}
