// Prosedürel mürettebat üretimi (belgeler/savas-yetenek-ve-murettebat-mekanikleri.md bölüm 4.1).
// Tohumlu rastgele sayı: aynı oyun her açılışta aynı isimleri verir.

import { ERKEK_ADLAR, KADIN_ADLAR } from './seslendirme';
const SOYADLAR = ['Kaya', 'Thorne', 'Yıldız', 'Vale', 'Akın', 'Soykan', 'Erdem', 'Okyay', 'Varol', 'Karan', 'Ilgaz', 'Tunç'];

export const UZMANLIKLAR = {
  muhendis: { ad: 'Mühendislik', rol: 'Başçarkçı' },
  telsiz: { ad: 'Telsiz ve Keşif', rol: 'Telsiz Subayı' },
  muharebe: { ad: 'Muharebe', rol: 'Taktik Nişancı' },
  tip: { ad: 'Biyo-Tıp', rol: 'Başhekim' },
  // Beşinci istasyon uzmanı (v4 karakter ağı belgesi bölüm 1): geminin ambarını düzenler, kargo kapasitesi yüzde yirmi
  ikmal: { ad: 'İkmal ve Lojistik', rol: 'İkmal Subayı' },
};

export const NITELIKLER = {
  sogukkanli: { ad: 'Soğukkanlı', tarif: 'Çatışmada panik yapmaz, tamir hızını korur.' },
  toplayici: { ad: 'Klipsomanyak (toplayıcı)', tarif: 'Hurda toplarken beklenmedik fazladan malzeme bulur.' },
  ses_hassas: { ad: 'Ses hassasiyeti', tarif: 'Frekans değişimlerini kaptandan önce duyar.' },
  klostrofobik: { ad: 'Klostrofobik', tarif: 'Uzun seferlerde morali çabuk düşer; geniş koğuş ister.' },
};

// Basit tohumlu üreteç (mulberry32)
export function uretec(tohum) {
  let a = tohum >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function sec(r, dizi) {
  return dizi[Math.floor(r() * dizi.length)];
}

// Yeni bir mürettebat üyesi. kullanilan: aynı adın iki kez çıkmaması için
// cinsiyet: 'e' | 'k' (verilmezse rastgele); öncülerin cinsiyeti seslendirilmiş kayıtların sesine uyar
export function uyeUret(r, uzmanlik, kullanilan = [], cinsiyet = null) {
  const c = cinsiyet || (r() < 0.5 ? 'e' : 'k');
  let ad;
  for (let i = 0; i < 20; i++) {
    ad = sec(r, c === 'e' ? ERKEK_ADLAR : KADIN_ADLAR) + ' ' + sec(r, SOYADLAR);
    if (!kullanilan.includes(ad)) break;
  }
  const nitelikler = Object.keys(NITELIKLER);
  return {
    id: 'm' + Math.floor(r() * 1e9).toString(36),
    ad,
    cinsiyet: c,
    uzmanlik,
    rol: UZMANLIKLAR[uzmanlik].rol,
    nitelik: sec(r, nitelikler),
    oda: null,
    verimlilik: 1,
    stres: 0,
    tecrube: 0,
    kayit: [],
  };
}

// Kapsülden sağ çıkan öncüler: bir mühendis ve bir telsizci hikâyede konuşur
export function oncuUret(tohum) {
  const r = uretec(tohum);
  const muhendis = uyeUret(r, 'muhendis', [], 'e');
  const telsizci = uyeUret(r, 'telsiz', [muhendis.ad], 'e');
  const hekim = uyeUret(r, 'tip', [muhendis.ad, telsizci.ad], 'k');
  // Hikâye kişilerinin nitelikleri sabittir: telsizcinin kulağı iyidir
  telsizci.nitelik = 'ses_hassas';
  muhendis.nitelik = 'sogukkanli';
  // v5 Paket 1: öncü ekip belgedeki adlarıyla (baştekniker, izci-telsizci, hekim)
  muhendis.ad = 'Kaelon Vex-Tar';
  telsizci.ad = 'Zarek Sol-Zhaor';
  hekim.ad = 'Lyris Mar-Axira';
  return [muhendis, telsizci, hekim];
}
