// Uzay operasyonu motoru (uzay-oyunu-tasarim-ve-senaryo.md bölüm 4 "Operasyon sahası", derin-uzay-gorevleri.md
// bölüm 1 ve Cilt II bölüm 1 dokunsal kontroller). Saf JavaScript; adımlar veri/uzayGorevleri.js'te.
//
// Donanımı tam bir gemi ziyaret noktasına kenetlenince operasyon başlar. Şans ya da seçim penceresi yoktur:
// adımlar sırayla, oyuncunun kulağı ve parmaklarıyla icra edilir. Hata gövdeye hasar verir; gövde biterse gemi
// koloniye çekilir ve operasyon sonra yeniden denenebilir.
//
//   opBaslat(d, id), opGirdi(d, girdi) → olaylar, opIlerle(d, dt) → olaylar, opSes(d) → ses durumu, opDurum(d) → metin
//   girdi: { tur: 'dokun' | 'cift' | 'cift2' | 'uzun' | 'ac' } | { tur: 'kaydir', yon, parmak }
//          | { tur: 'surukle', dx, dy } (son karedeki fark, piksel) | { tur: 'dondur', f } (radyan)
//   olay: { soz, ses, nota: { frek, sure }, hasar, adim, bitti, basarisiz }
import { OPERASYONLAR } from '../veri/uzayGorevleri';
import { GEMI_SINIFLARI, SINIF_KATMANLARI } from '../veri/gemiler';

export const KILIT_ACI = 0.14; // rad (~8°)
export const KILIT_PAYI = 1.2;
const payi = (d) => KILIT_PAYI * (d.gemi && d.gemi.moduller.akustik_filtre ? 1.6 : 1); // akustik filtre
export const KILIT_SURESI = 2.5;
export const ALARM = 0.78;
const TONLAR = { kalin: 196, orta: 330, tiz: 523 };
const TON_ADI = { kalin: 'kalın', orta: 'orta', tiz: 'tiz' };

function rastgele(d, i) {
  const x = Math.sin((d.tohum || 1) * 12.9898 + i * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function opVarMi(id) {
  return !!OPERASYONLAR[id];
}
export function opTamamMi(d, id) {
  return (d.tamamlananOp || []).includes(id);
}

export function opBaslat(d, id) {
  d.op = { id, adim: -1, t: 0, s: {}, can: 100 };
  return adimaGec(d);
}
function op(d) {
  return d.op && OPERASYONLAR[d.op.id];
}
function adimTanim(d) {
  const o = op(d);
  return o && o.adimlar[d.op.adim];
}

function adimaGec(d) {
  const o = op(d);
  d.op.adim += 1;
  d.op.t = 0;
  const a = o.adimlar[d.op.adim];
  if (!a) return bitir(d);
  const r = (k) => rastgele(d, d.op.adim * 7 + k + d.op.id.length + (o.tekrar ? (d.karsilasmaNo || 0) * 37 : 0));
  const s = {};
  if (a.tur === 'yaklas') Object.assign(s, { aci: (r(1) < 0.5 ? -1 : 1) * (0.7 + r(2) * 1.2), mesafe: a.mesafe || 60, hiz: 0, kayma: (r(3) - 0.5) * 0.06 });
  if (a.tur === 'frekans') Object.assign(s, { deger: 20, hedef: Math.round((40 + r(1) * 60) * 10) / 10, kilit: 0, yakin: false });
  if (a.tur === 'basinc') Object.assign(s, { b: 0.15, alarm: false, n: 0 });
  if (a.tur === 'tut') Object.assign(s, { aktif: false, kalan: 3 });
  if (a.tur === 'ritim') Object.assign(s, { n: 0, son: -9 });
  if (a.tur === 'kacin') Object.assign(s, { n: 0, sonraki: 2.5, tehdit: null, sayac: 0 });
  if (a.tur === 'dron') Object.assign(s, { aktif: false, kalan: 3 });
  if (a.tur === 'nisan') Object.assign(s, { burun: 0, vurus: 0, faz: r(1) * 6 });
  if (a.tur === 'kademeli') Object.assign(s, { n: 0 });
  if (a.tur === 'denge') Object.assign(s, { sapma: (r(1) < 0.5 ? -1 : 1) * (0.4 + r(2) * 0.3), sure: 0, yon: r(3) < 0.5 ? -1 : 1 });
  if (a.tur === 'direnc') Object.assign(s, { konum: 0.6, sure: 0 });
  if (a.tur === 'ton') {
    const adlar = ['kalin', 'tiz', 'orta'];
    const dizi = [];
    for (let i = 0; i < (a.n || 3); i++) {
      let t = adlar[Math.floor(r(10 + i) * 3)];
      if (dizi.length && dizi[dizi.length - 1] === t) t = adlar[(adlar.indexOf(t) + 1) % 3];
      dizi.push(t);
    }
    Object.assign(s, { dizi, i: 0, dinlendi: false });
  }
  if (a.tur === 'bosluk') Object.assign(s, { n: 0, vurus: -1 });
  // 2.5 final görevleri için: zikzak (sağ-sol sırayla), sessizlik (dokunmadan bekle), rotasyon (kesintisiz çevir),
  // refleks (alarm sesinde hemen dokun), muhur (üç parmakla bas)
  if (a.tur === 'zikzak') Object.assign(s, { n: 0, beklenen: 'sag' });
  if (a.tur === 'sessizlik') Object.assign(s, { sure: 0 });
  if (a.tur === 'rotasyon') Object.assign(s, { toplam: 0, son: 0 });
  if (a.tur === 'refleks') Object.assign(s, { n: 0, alarm: null, sonraki: 2 + r(1) * 3 });
  d.op.s = s;
  return [...(a.efekt ? [{ ses: a.efekt }] : []), { soz: 'Adım ' + (d.op.adim + 1) + ' / ' + o.adimlar.length + ': ' + a.ad + '. ' + a.giris, adim: a.tur }];
}

function adimBitti(d, ses) {
  const a = adimTanim(d);
  const olaylar = [{ soz: a.bitis, ses: ses || 'kilit' }];
  olaylar.push(...adimaGec(d));
  return olaylar;
}

// Gövde hasarı; biterse operasyon başarısız
function hasar(d, x, soz) {
  // Yüzey operasyonları (final görevleri): gemi değil kaptanın dayanıklılığı; biterse geri çekilinir
  if (op(d) && op(d).yuzey) {
    d.op.can = Math.max(0, (d.op.can == null ? 100 : d.op.can) - x);
    const o = [{ soz: soz + ' Dayanıklılık yüzde ' + d.op.can + '.', ses: 'patlama', hasar: true }];
    if (d.op.can <= 0) {
      d.opSon = d.op.id;
      d.op = null;
      d.sahne = 'op_geri_cekil';
      o.push({ basarisiz: true });
    }
    return o;
  }
  const g = d.gemi;
  g.govde = Math.max(0, g.govde - x);
  const o = [{ soz: soz + ' Gövde yüzde ' + Math.round((100 * g.govde) / g.maxGovde) + '.', ses: 'patlama', hasar: true }];
  if (g.govde <= 0) {
    g.govde = 1;
    d.op = null;
    d.gemi.yer = 'kizak';
    d.uzay = null;
    d.sahne = 'op_basarisiz';
    o.push({ basarisiz: true });
  }
  return o;
}

function bitir(d) {
  const id = d.op.id;
  const o = OPERASYONLAR[id];
  if (!d.tamamlananOp) d.tamamlananOp = [];
  // Tekrarlanan seyir karşılaşmaları (sefer.js) tamamlanan operasyon sayılmaz; ödülleri o an belirlenir
  if (!o.tekrar && !o.final && !d.tamamlananOp.includes(id)) d.tamamlananOp.push(id);
  odulVer(d, o.odulFn ? o.odulFn(d) : o.odul || {});
  if (d.gemi && d.gemi.moduller.toplama_dronu && !o.fenomen) {
    d.koloni.kaynaklar.titanyum = (d.koloni.kaynaklar.titanyum || 0) + 2;
    d.koloni.kaynaklar.bazalt = (d.koloni.kaynaklar.bazalt || 0) + 2;
  }
  d.opSon = id;
  d.op = null;
  d.sahne = o.sahne || 'op_tamam';
  return [{ bitti: true, ses: 'sinyal' }];
}

export function odulVer(d, od) {
  const k = d.koloni;
  for (const b of od.bayrak || []) d.bayrak[b] = true;
  for (const x of Object.keys(od.kaynak || {})) k.kaynaklar[x] = (k.kaynaklar[x] || 0) + od.kaynak[x];
  for (const x of Object.keys(od.parca || {})) k.parcalar[x] = (k.parcalar[x] || 0) + od.parca[x];
  if (od.nufus) k.nufus.toplam += od.nufus;
  if (od.barinma) k.nufus.barinma += od.barinma;
  if (od.bilim) k.nufus.bilim = (k.nufus.bilim || 0) + od.bilim;
  if (od.tersane) k.nufus.tersane = (k.nufus.tersane || 0) + od.tersane;
  if (od.moral) k.moral = Math.min(100, k.moral + od.moral);
  if (od.itibar) d.itibar += od.itibar;
  if (od.kalkan) k.kalkan = (k.kalkan || 1) + od.kalkan;
  d.kaptan.tecrube += 60;
  if (od.kodeks && !d.kodeks.some((x) => x.id === od.kodeks.id)) d.kodeks.push({ ...od.kodeks, itibar: od.itibar || 0 });
  // Hediye gemiler: sınıfının bütün katmanları takılı gelir
  for (const gm of od.gemi || []) {
    const s = GEMI_SINIFLARI[gm.sinif];
    const yeni = {
      sinif: gm.sinif, ad: gm.ad, odalar: s.odalar.map((o) => o.id), govde: s.govde, maxGovde: s.govde, kalkan: s.kalkan, silahlar: [], kargo: [],
      moduller: Object.fromEntries(SINIF_KATMANLARI[gm.sinif].map((x) => [x, true])), yakit: s.yakit.tank, maxYakit: s.yakit.tank,
      yakitTuru: s.yakit.parca, motorSesi: s.motor, yer: 'kizak', atamalar: {}, odul: true,
    };
    if (!d.filo) d.filo = [];
    d.filo.push(yeni);
  }
}

// --- Girdi ---
export function opGirdi(d, g) {
  const a = adimTanim(d);
  if (!a) return [];
  const s = d.op.s;
  const t = a.tur;
  if (t === 'yaklas') {
    if (g.tur === 'kaydir' && (g.yon === 'sag' || g.yon === 'sol')) {
      s.aci += g.yon === 'sag' ? 0.26 : -0.26;
      return [{ ses: 'tik' }];
    }
    if (a.sessiz) {
      if (g.tur === 'kaydir' && g.yon === 'yukari') return hasar(d, 8, 'Kıvılcım! Motoru ateşledin; ' + (s.mesafe < 30 ? 'gaz tutuştu.' : 'alarm çalıyor.'));
      if (g.tur === 'dokun') {
        if (Math.abs(s.aci) > KILIT_ACI) return [{ soz: 'Pruva hedefte değil; soğuk gaz boşa gitti.', ses: 'red' }];
        s.mesafe = Math.max(0, s.mesafe - 4);
        return [{ ses: 'tislama' }, ...yaklasDenetle(d)];
      }
    } else if (g.tur === 'kaydir' && (g.yon === 'yukari' || g.yon === 'asagi')) {
      s.hiz = Math.max(0, Math.min(3, s.hiz + (g.yon === 'yukari' ? 1 : -1)));
      return [{ soz: 'Hız ' + s.hiz + '.', ses: 'dugme' }];
    }
  }
  if (t === 'kenetle' && g.tur === 'cift') return adimBitti(d, a.ses || 'kilit');
  if ((t === 'sonar' && g.tur === 'uzun')) return [{ ses: 'sonar' }, ...adimBitti(d, 'sonar')];
  if (t === 'frekans') {
    // Lidar benzeri: hedefin üstündeyken çift dokunulur
    if (a.cift && g.tur === 'cift') {
      if (Math.abs(s.deger - s.hedef) <= payi(d) * 1.6) return adimBitti(d, 'sinyal');
      return [{ soz: 'Burada bir şey yok.', ses: 'red' }];
    }
    if (g.tur === 'dondur') s.deger += g.f * 7;
    else if (g.tur === 'surukle') s.deger -= g.dy * 0.06;
    else if (g.tur === 'kaydir' && (g.yon === 'sag' || g.yon === 'sol')) s.deger += g.yon === 'sag' ? 0.5 : -0.5;
    else return [];
    s.deger = Math.max(0, Math.min(120, s.deger));
    return [];
  }
  if (t === 'basinc' && g.tur === (a.girdi || 'cift')) {
    if (s.b < ALARM) {
      s.b = 0.15;
      return [{ soz: 'Erken; basınç boşa gitti.', ses: 'red' }];
    }
    s.n += 1;
    s.b = 0.15;
    s.alarm = false;
    if (s.n >= 3) return adimBitti(d, 'valf');
    return [{ soz: 'Tam zamanında. ' + s.n + ' / 3.', ses: 'valf' }];
  }
  if ((t === 'tut' && g.tur === 'uzun') || (t === 'dron' && (g.tur === 'ac' || (g.tur === 'kaydir' && g.yon === 'yukari' && g.parmak >= 2) || g.tur === 'cift2'))) {
    if (s.aktif) return [];
    s.aktif = true;
    return [{ ses: t === 'tut' ? 'kaynak' : 'kapi_gemi', soz: t === 'dron' ? 'Dron fırladı.' : '' }];
  }
  if (t === 'ritim' && (a.girdi === 'kaydir2' ? g.tur === 'kaydir' && g.yon === 'yukari' && g.parmak >= 2 : g.tur === 'dokun')) {
    s.n = d.op.t - s.son < 0.9 || s.n === 0 ? s.n + 1 : 1;
    s.son = d.op.t;
    if (s.n >= (a.n || 3)) return adimBitti(d, 'kilit');
    return [{ ses: 'tik' }];
  }
  if (t === 'kacin' && g.tur === 'kaydir') {
    if (!s.tehdit) return [];
    const dogru = a.ayni ? s.tehdit.yon : a.yon ? a.yon : s.tehdit.yon === 'sag' ? 'sol' : 'sag';
    s.tehdit = null;
    s.sonraki = d.op.t + 2 + rastgele(d, ++s.sayac) * 2;
    if (g.yon !== dogru) return hasar(d, 8, 'Yanlış yana! İsabet aldın.');
    s.n += 1;
    if (s.n >= (a.n || 3)) return adimBitti(d, 'hamle');
    return [{ soz: 'Kurtuldun. ' + s.n + ' / ' + (a.n || 3) + '.', ses: 'hamle' }];
  }
  if (t === 'nisan') {
    if (g.tur === 'kaydir' && (g.yon === 'sag' || g.yon === 'sol')) {
      s.burun += g.yon === 'sag' ? -0.2 : 0.2;
      return [{ ses: 'tik' }];
    }
    if (g.tur === 'cift' || (g.tur === 'kaydir' && g.yon === 'yukari')) {
      if (Math.abs(nisanAci(d)) > KILIT_ACI * 1.5) return [{ soz: 'Iskaladın.', ses: 'red' }];
      s.vurus += 1;
      s.faz += 2.1;
      if (s.vurus >= (a.n || 1)) return [{ ses: 'patlama' }, ...adimBitti(d, 'patlama')];
      return [{ soz: 'İsabet! ' + s.vurus + ' / ' + a.n + '. Sıradaki hedef.', ses: 'patlama' }];
    }
  }
  if (t === 'kademeli' && g.tur === 'kaydir' && g.yon === (a.yon || 'asagi') && g.parmak >= (a.parmak || 2)) {
    s.n += 1;
    if (s.n >= (a.n || 1)) return adimBitti(d, 'hidrolik');
    return [{ soz: s.n + ' / ' + a.n + '.', ses: 'kilit' }];
  }
  if (t === 'kademeli' && g.tur === 'kaydir' && g.yon === (a.yon || 'asagi')) return [{ soz: 'İki ya da üç parmakla kaydır.', ses: 'red' }];
  if (t === 'denge' && g.tur === 'surukle') {
    s.sapma -= (a.eksen === 'dikey' ? -g.dy : g.dx) * 0.004;
    return [];
  }
  if (t === 'direnc' && g.tur === 'surukle' && g.dy > 0) {
    s.konum = Math.min(1, s.konum + g.dy * 0.003);
    return [];
  }
  if (t === 'ton') {
    if (g.tur === 'uzun') {
      s.dinlendi = true;
      s.i = 0;
      return [{ ton: s.dizi.map((x) => TONLAR[x]), soz: '' }];
    }
    const secim = g.tur === 'kaydir' && g.yon === 'asagi' ? 'kalin' : g.tur === 'kaydir' && g.yon === 'yukari' ? 'tiz' : g.tur === 'cift' ? 'orta' : null;
    if (!secim) return [];
    if (!s.dinlendi) return [{ soz: 'Önce basılı tutup tonları dinle.', ses: 'red' }];
    if (s.dizi[s.i] !== secim) {
      s.i = 0;
      return [{ nota: { frek: TONLAR[secim], sure: 0.5 } }, { soz: 'Yanlış ton; kilit sıfırlandı. Basılı tutup yeniden dinleyebilirsin.', ses: 'red' }];
    }
    s.i += 1;
    if (s.i >= s.dizi.length) return [{ nota: { frek: TONLAR[secim], sure: 0.5 } }, ...adimBitti(d, 'kapi')];
    return [{ nota: { frek: TONLAR[secim], sure: 0.5 } }];
  }
  if (t === 'zikzak' && g.tur === 'kaydir' && (g.yon === 'sag' || g.yon === 'sol')) {
    if (g.yon !== s.beklenen) return [{ soz: 'Bariyer koptu; ' + (s.beklenen === 'sag' ? 'sağa' : 'sola') + ' çek.', ses: 'red' }];
    s.n += 1;
    s.beklenen = s.beklenen === 'sag' ? 'sol' : 'sag';
    if (s.n >= (a.n || 6)) return adimBitti(d, 'el_kalkan');
    return [{ nota: { frek: 440 + s.n * 60, sure: 0.2 } }];
  }
  if (t === 'sessizlik' && g.tur !== 'surukle') {
    s.sure = 0;
    return [{ soz: 'Dokundun; odak dağıldı. Yeniden yalnız nefesi dinle.', ses: 'red' }];
  }
  if (t === 'rotasyon' && g.tur === 'dondur') {
    s.toplam += Math.abs(g.f);
    s.son = d.op.t;
    const hedef = a.radyan || 12;
    if (s.toplam >= hedef) return adimBitti(d, 'sinyal');
    const yuzde = Math.floor((s.toplam / hedef) * 10);
    if (yuzde !== s.yuzde) {
      s.yuzde = yuzde;
      return [{ nota: { frek: 300 + yuzde * 40, sure: 0.2 } }];
    }
    return [];
  }
  if (t === 'refleks' && g.tur === 'dokun') {
    if (!s.alarm) {
      s.sonraki = d.op.t + 1.5;
      return [{ soz: 'Erken!', ses: 'red' }];
    }
    s.alarm = null;
    s.n += 1;
    s.sonraki = d.op.t + 2 + rastgele(d, 900 + s.n) * 3;
    if (s.n >= (a.n || 1)) return adimBitti(d, 'kilit');
    return [{ soz: s.n + ' / ' + a.n + '.', ses: 'kilit' }];
  }
  if (t === 'muhur' && g.tur === 'dokun' && (g.parmak || 1) >= 3) return adimBitti(d, 'el_kalkan');
  if (t === 'muhur' && g.tur === 'dokun') return [{ soz: 'Üç parmakla aynı anda bas.', ses: 'red' }];
  if (t === 'bosluk' && g.tur === 'dokun') {
    const k = Math.round(d.op.t / 0.7);
    const fark = Math.abs(d.op.t - k * 0.7);
    if (eksikMi(d, k) && fark < 0.3) {
      if (s.sonEksik === k) return [];
      s.sonEksik = k;
      s.n += 1;
      if (s.n >= (a.n || 3)) return adimBitti(d, 'kilit');
      return [{ nota: { frek: 880, sure: 0.15 }, soz: s.n + ' / ' + (a.n || 3) + '.' }];
    }
    return [{ soz: 'Orada boşluk yok.', ses: 'red' }];
  }
  return [];
}

function eksikMi(d, k) {
  return k > 3 && rastgele(d, 500 + k) < 0.3;
}
function nisanAci(d) {
  const s = d.op.s;
  return Math.sin(d.op.t * 0.35 + s.faz) * 0.8 - s.burun;
}
function yaklasDenetle(d) {
  const s = d.op.s;
  const a = adimTanim(d);
  if (s.mesafe > 6) return [];
  if (!a.sessiz && s.hiz > 1) {
    s.mesafe = 14;
    s.hiz = 0;
    return hasar(d, 6, 'Çok hızlı geldin, sürtündün! Geri çekildin; yavaşça yeniden yaklaş.');
  }
  return adimBitti(d, 'kilit');
}

// --- Zaman ---
export function opIlerle(d, dt) {
  if (!d.op) return [];
  const a = adimTanim(d);
  if (!a) return [];
  const s = d.op.s;
  d.op.t += dt;
  const t = a.tur;
  if (t === 'yaklas') {
    s.aci += s.kayma * dt;
    if (!a.sessiz && s.hiz > 0) {
      if (Math.abs(s.aci) < KILIT_ACI) {
        s.mesafe -= s.hiz * 4 * dt;
        return yaklasDenetle(d);
      }
      s.uyari = (s.uyari || 0) + dt;
      if (s.uyari > 4) {
        s.uyari = 0;
        return [{ soz: 'Pruva hedefte değil; ses iki kulakta eşit değil.' }];
      }
    }
  }
  if (t === 'frekans') {
    const fark = Math.abs(s.deger - s.hedef);
    if (fark <= payi(d)) s.kilit += dt;
    else s.kilit = Math.max(0, s.kilit - dt * 2);
    const o = [];
    if (!s.yakin && fark < 4) {
      s.yakin = true;
      o.push({ soz: 'Çok yakın. Yavaş.' });
    }
    if (!a.cift && s.kilit >= KILIT_SURESI) o.push(...adimBitti(d, 'sinyal'));
    return o;
  }
  if (t === 'sessizlik') {
    s.sure += dt;
    if (s.sure >= (a.sure || 10)) return adimBitti(d, 'sinyal');
    const k = Math.floor(s.sure / 2.5);
    if (k !== s.nefes) {
      s.nefes = k;
      return [{ nota: { frek: 110, sure: 1.6 } }];
    }
  }
  if (t === 'rotasyon' && s.toplam > 0 && d.op.t - s.son > 1.5) {
    // Kesintisiz olmalı: duraksayınca çember söner
    s.toplam = Math.max(0, s.toplam - dt * 2);
  }
  if (t === 'refleks') {
    if (!s.alarm && d.op.t >= s.sonraki) {
      s.alarm = { kalan: 1.3 };
      return [{ nota: { frek: 1568, sure: 0.3 }, tehlike: 'on' }];
    }
    if (s.alarm) {
      s.alarm.kalan -= dt;
      if (s.alarm.kalan <= 0) {
        s.alarm = null;
        s.sonraki = d.op.t + 2 + rastgele(d, 950 + s.n) * 3;
        return hasar(d, 10, 'Geç kaldın!');
      }
    }
  }
  if (t === 'basinc') {
    s.b += 0.07 * (1 + 0.3 * s.n) * dt;
    if (!s.alarm && s.b >= ALARM) s.alarm = true;
    if (s.b >= 1) {
      s.b = 0.15;
      s.alarm = false;
      return hasar(d, 8, 'Geç kaldın! Aşırı basınç.');
    }
  }
  if ((t === 'tut' || t === 'dron') && s.aktif) {
    s.kalan -= dt;
    if (s.kalan <= 0) return adimBitti(d, t === 'dron' ? 'hidrolik' : 'kilit');
  }
  if (t === 'kacin') {
    if (!s.tehdit && d.op.t >= s.sonraki) {
      s.tehdit = { yon: a.yon === 'asagi' || a.yon === 'yukari' ? 'on' : rastgele(d, 300 + s.sayac) < 0.5 ? 'sag' : 'sol', kalan: 1.8 };
      return [{ tehlike: s.tehdit.yon }];
    }
    if (s.tehdit) {
      s.tehdit.kalan -= dt;
      if (s.tehdit.kalan <= 0) {
        s.tehdit = null;
        s.sonraki = d.op.t + 2 + rastgele(d, ++s.sayac) * 2;
        return hasar(d, 10, 'Geç kaldın! İsabet.');
      }
    }
  }
  if (t === 'denge') {
    s.sapma += s.yon * 0.05 * dt;
    if (Math.abs(s.sapma) > 0.9) {
      s.sapma = 0.5 * Math.sign(s.sapma);
      s.sure = 0;
      return hasar(d, 5, 'Denge kaçtı!');
    }
    if (Math.abs(s.sapma) < 0.08) s.sure += dt;
    else s.sure = Math.max(0, s.sure - dt);
    if (s.sure >= 2.5) return adimBitti(d, 'kilit');
  }
  if (t === 'direnc') {
    s.konum -= (0.08 + 0.05 * Math.sin(d.op.t * 0.9)) * dt;
    if (s.konum <= 0) {
      s.konum = 0.5;
      return hasar(d, 10, 'Çekim seni yakaladı!');
    }
    if (s.konum > 0.25) s.sure += dt;
    if (s.sure >= (a.sure || 10)) return adimBitti(d, 'kilit');
  }
  if (t === 'bosluk') {
    const k = Math.floor(d.op.t / 0.7);
    if (k !== s.vurus) {
      s.vurus = k;
      if (!eksikMi(d, k)) return [{ nota: { frek: 1200, sure: 0.05 } }];
    }
  }
  return [];
}

// --- Ses durumu (ekran her karede eşitler) ---
export function opSes(d) {
  const a = adimTanim(d);
  if (!a) return {};
  const s = d.op.s;
  const t = a.tur;
  if (t === 'yaklas') return { hedef: { x: Math.sin(-s.aci) * s.mesafe, y: Math.cos(s.aci) * s.mesafe, frek: a.frek || 440 }, motor: a.sessiz ? 0 : s.hiz };
  if (t === 'nisan') {
    const x = nisanAci(d);
    return { hedef: { x: Math.sin(-x) * 30, y: Math.cos(x) * 30, frek: 180 } };
  }
  if (t === 'frekans') return { telsiz: { yakinlik: Math.max(0, 1 - Math.abs(s.deger - s.hedef) / 15), kayma: s.deger - s.hedef } };
  if (t === 'basinc') return { basinc: { b: s.b, alarm: s.alarm } };
  if (t === 'denge') return { terazi: s.sapma };
  if (t === 'direnc') return { terazi: 0.6 - s.konum, motor: 3 };
  return {};
}

export function opDurum(d) {
  const a = adimTanim(d);
  if (!a) return '';
  const s = d.op.s;
  const o = op(d);
  let x = 'Adım ' + (d.op.adim + 1) + ' / ' + o.adimlar.length + ': ' + a.ad + '. ';
  if (a.tur === 'yaklas') x += 'Mesafe ' + Math.round(s.mesafe) + ' metre. ' + (Math.abs(s.aci) < KILIT_ACI ? 'Pruva hedefte.' : 'Hedef ' + (s.aci > 0 ? 'solda' : 'sağda') + '.') + (a.sessiz ? '' : ' Hız ' + s.hiz + '.');
  else if (a.tur === 'frekans') x += Math.abs(s.deger - s.hedef) < 4 ? 'Çok yakın.' : Math.abs(s.deger - s.hedef) < 15 ? 'Bir şey duyuluyor.' : 'Yalnız parazit.';
  else if (a.tur === 'basinc') x += 'Basınç yüzde ' + Math.round(s.b * 100) + '. ' + s.n + ' / 3.';
  else if (a.tur === 'kacin') x += s.n + ' / ' + (a.n || 3) + '.';
  else if (a.tur === 'denge') x += Math.abs(s.sapma) < 0.08 ? 'Dengede; tut.' : 'Sapma yüzde ' + Math.round(Math.abs(s.sapma) * 100) + '.';
  else if (a.tur === 'direnc') x += 'Konum yüzde ' + Math.round(s.konum * 100) + '; ' + Math.max(0, Math.round((a.sure || 10) - s.sure)) + ' saniye daha.';
  else if (a.tur === 'ton') x += s.dinlendi ? s.i + ' / ' + s.dizi.length + ' ton doğru.' : 'Basılı tut, tonları dinle.';
  else if (a.tur === 'nisan') x += s.vurus + ' / ' + (a.n || 1) + ' isabet.';
  else if (a.tur === 'zikzak') x += s.n + ' / ' + (a.n || 6) + '; sıradaki ' + (s.beklenen === 'sag' ? 'sağa.' : 'sola.');
  else if (a.tur === 'sessizlik') x += Math.max(0, Math.round((a.sure || 10) - s.sure)) + ' saniye daha, dokunma.';
  else if (a.tur === 'rotasyon') x += 'Çember yüzde ' + Math.round((s.toplam / (a.radyan || 12)) * 100) + '.';
  else if (a.tur === 'refleks') x += s.n + ' / ' + (a.n || 1) + '.';
  else x += a.giris;
  if (o.yuzey) return x + ' Dayanıklılık yüzde ' + d.op.can + '.';
  return x + ' Gövde yüzde ' + Math.round((100 * d.gemi.govde) / d.gemi.maxGovde) + '.';
}

export const TON_ADLARI = TON_ADI;

export const SAHNELER = {
  op_tamam: {
    baslik: 'Operasyon tamam',
    efekt: ['sinyal'],
    metin: (d) => (d.opSon ? (typeof OPERASYONLAR[d.opSon].sonuc === 'function' ? OPERASYONLAR[d.opSon].sonuc(d) : OPERASYONLAR[d.opSon].sonuc) : []),
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
  },
  op_geri_cekil: {
    baslik: 'Geri çekildin',
    metin: () => ['Dayanamadın; yaralı ama canlı geri çekildin. Görevin yerine dönüp yeniden deneyebilirsin.'],
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
  },
  op_basarisiz: {
    baslik: 'Geri çekilme',
    metin: () => ['Gövde dayanamadı. Acil durum iticileriyle koloniye çekildin; gemi kızakta, tersane gövdeyi onarıyor.', 'Operasyonu yeniden deneyebilirsin.'],
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
  },
};
