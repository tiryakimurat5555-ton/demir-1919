// İç deniz balıkçılığı (v5 Paket 13 bölüm 4; Paket 3B hobi 1): dört adımlı sesli mekanik.
//   1. Olta atışı (ıslık + "cup").  2. Bekleyiş 3-8 sn (dalga şırıltısı).  3. Isırma: "ŞLAP" + titreşim; oltanın
//   kademesine göre 1,5 / 2 / 2,4 sn içinde dokun.  4. Çekme: parmağını aşağı sürükledikçe misina çekilir, gerginlik tonu
//   yükselir; balık çırpındığında ton tizleşir: parmağını kaldır, ses yumuşayınca yeniden çek. Gerginlik dolarsa misina
//   kopar, ilerleme dolarsa balık kıyıda.
// Basit Balıkçılık Modu (Ayarlar): yalnız ısırma anında tek dokunuş yeter.
//
// d.olta = { nokta, evre 'bekle' | 'isirma' | 'cekme', t, bekle, pencere, p, g, cirpinma, buyuk }
import { BALIK_NOKTALARI, OLTA } from './veri';
import { hazirla } from './saha';
import * as Z from '../zaman';
import { HAMMADDELER } from '../veri/tesisler';

let basitMod = false;
export function basitModAyarla(acik) {
  basitMod = !!acik;
}
export const basitModMu = () => basitMod;

const kademeOf = (d, id) => (d.yer && d.yer.kisi && d.yer.kisi[id] ? d.yer.kisi[id].k : 0);
function zar(d) {
  const s = hazirla(d);
  s.zar += 1;
  const x = Math.sin(((d.tohum || 7) % 99991) * 0.029 + s.zar * 78.233) * 43758.5453;
  return x - Math.floor(x);
}
const adi = (k) => (HAMMADDELER[k] ? HAMMADDELER[k].ad : k);

export function oltaBaslat(d, nokta) {
  const s = hazirla(d);
  const o = OLTA[s.alet.olta];
  d.olta = { nokta, evre: 'bekle', t: 0, bekle: 3 + zar(d) * 5, pencere: o.pencere, p: 0, g: 0, cirpinma: 2 + zar(d) * 1.5, buyuk: false };
  return [{ ses: 'olta_atis' }];
}
function avSec(d) {
  const s = hazirla(d);
  const n = BALIK_NOKTALARI[d.olta.nokta];
  // Nadir olanlar: Sira-Vel K6 +%25, usta olta batık fosil ve gümüşü iki kat
  const nadirler = ['gol_baligi', 'hamam_minerali', 'nadir', 'kseno_eti'];
  const agirlik = n.av.map(([k, p]) => [k, p * (nadirler.includes(k) ? (kademeOf(d, 'siravel') >= 6 ? 1.25 : 1) * (k === 'nadir' && s.alet.olta >= 3 ? 2 : 1) : 1)]);
  const top = agirlik.reduce((a, x) => a + x[1], 0);
  let r = zar(d) * top;
  for (const [k, p] of agirlik) {
    r -= p;
    if (r <= 0) return k;
  }
  return agirlik[0][0];
}
// Dokunuş: bekleyişte erken (olta boşa çekilir), ısırmada tasma
export function oltaDokun(d) {
  const o = d.olta;
  if (!o) return [];
  if (o.evre === 'bekle') {
    o.t = 0;
    o.bekle = 3 + zar(d) * 5;
    return [{ soz: 'Çok erken; olta boşa çekildi. Yeniden attın, bekle.', ses: 'olta_atis' }];
  }
  if (o.evre === 'isirma') {
    o.av = avSec(d);
    o.buyuk = o.av === 'yilan_baligi' || o.av === 'yengec';
    if (basitMod || o.av === 'hurda' || o.av === 'deniz_tuzu' || o.av === 'hamam_minerali') return yakalandi(d);
    o.evre = 'cekme';
    o.t = 0;
    return [{ soz: 'Tasmayı attın! Çek: parmağını aşağı sürükle. Ton tizleşince bırak.', ses: 'makara' }];
  }
  return [];
}
// Her karede; cekiyor: son 0,35 sn içinde sürükleme var mı
export function oltaIlerle(d, dt, cekiyor) {
  const o = d.olta;
  if (!o) return [];
  o.t += dt;
  if (o.evre === 'bekle') {
    if (o.t >= o.bekle) {
      o.evre = 'isirma';
      o.t = 0;
      return [{ ses: 'balik_slap', titresim: true }];
    }
    return [];
  }
  if (o.evre === 'isirma') {
    if (o.t > o.pencere) {
      o.evre = 'bekle';
      o.t = 0;
      o.bekle = 3 + zar(d) * 5;
      return [{ soz: 'Kaçırdın; yem gitti. Olta yeniden suda, bekle.' }];
    }
    return [];
  }
  // Çekme
  const s = hazirla(d);
  const kat = OLTA[s.alet.olta].gerginlik * (o.buyuk ? (s.alet.olta >= 2 ? 1.05 : 1.35) : 1);
  const ol = [];
  if (cekiyor) {
    o.p = Math.min(1, o.p + 0.22 * dt);
    o.g = Math.min(1.2, o.g + 0.3 * kat * dt);
  } else {
    o.g = Math.max(0, o.g - 0.55 * dt);
    o.p = Math.max(0, o.p - 0.03 * dt);
  }
  o.cirpinma -= dt;
  if (o.cirpinma <= 0) {
    o.g = Math.min(1.2, o.g + 0.28 * kat);
    o.cirpinma = 2 + zar(d) * 1.5;
    ol.push({ cirpinma: true });
  }
  if (o.g >= 1) {
    d.olta = { ...o, evre: 'bekle', t: 0, bekle: 3 + zar(d) * 5, p: 0, g: 0 };
    ol.push({ soz: 'Misina koptu; balık kaçtı. Yeni misina bağladın, olta yeniden suda.', ses: 'misina_kop', titresim: true });
    return ol;
  }
  if (o.p >= 1) return [...ol, ...yakalandi(d)];
  return ol;
}
function yakalandi(d) {
  const s = hazirla(d);
  const o = d.olta;
  const av = o.av || avSec(d);
  (s.avlanan || (s.avlanan = {}))[av] = 1; // 4.7: görev ağı (usta balıkçı)
  const koy = (k, n) => {
    const yer = (s.eslik === 'demir_kervan' ? Infinity : [0, 25, 50, 100][s.alet.canta]) - Object.values(s.canta).reduce((a, b) => a + b, 0);
    const al = Math.max(0, Math.min(n, yer));
    if (al) s.canta[k] = (s.canta[k] || 0) + al;
    return al;
  };
  let m;
  if (av === 'hurda') m = 'Yosun ve eski bir teneke. Olsun.';
  else {
    const k = av === 'nadir' ? (zar(d) < 0.5 ? 'fosil' : 'batik_gumus') : av;
    let n = 1;
    // Usta olta: yüzde yirmi beş çift av ya da ek deniz tuzu
    let ek = '';
    if (s.alet.olta >= 3 && zar(d) < 0.25) {
      if (zar(d) < 0.5) n = 2;
      else if (koy('deniz_tuzu', 1)) ek = ' Ağda bir avuç deniz tuzu da var.';
    }
    const al = koy(k, n);
    m = al ? 'Yakalandı: ' + al + ' ' + adi(k) + '!' + ek : 'Yakaladın ama çantan dolu; ' + adi(k) + ' suya geri döndü.';
  }
  s.yip.olta = (s.yip.olta || 0) + 1;
  d.olta = { nokta: o.nokta, evre: 'bekle', t: 0, bekle: 3 + zar(d) * 5, pencere: o.pencere, p: 0, g: 0, cirpinma: 2.5, buyuk: false };
  return [{ soz: m + ' Olta yeniden suda.', ses: 'balik_yakalandi', yakalandi: av }];
}
export function oltaMetni(d) {
  const o = d.olta;
  if (!o) return '';
  if (o.evre === 'bekle') return 'Olta suda; bekle. Şlap sesini duyunca hemen dokun.';
  if (o.evre === 'isirma') return 'Isırdı! Dokun!';
  return 'Çekiyorsun: kıyıya yüzde ' + Math.round(o.p * 100) + ', gerginlik yüzde ' + Math.round(Math.min(1, o.g) * 100) + '.';
}
void Z;
