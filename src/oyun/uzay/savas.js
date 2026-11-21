// Reaktif akustik savaş modu (belgeler/savas-yetenek-ve-murettebat-mekanikleri.md bölüm 1, 2, 3.1 savaş yetenekleri,
// 3.2 gemi modifikasyonları, 4.2 görev yerleri). Saf JavaScript.
//
// Savaş duruşu: dolaşım durur, ses sahnesi yalnız düşmanla gemi arasındaki it dalaşına odaklanır.
// Tur: (1) oyuncu hamlesi: sağa-sola kaydırıp pruvayı düşmanın motor sesine kilitle; dokun birincil ateş, yukarı
// kaydır torpido (kilit şart), iki parmakla çevir silah frekansını düşman kalkanının tonuna eşle (kalkan delinir).
// (2) etki. (3) düşmanın uyarı sesi (plazma şarjı, torpido kükremesi, iyon ıslığı; 1,5-3 sn): reaktif savunma
// penceresi: iki parmakla dokun kalkan, sesin ters yönüne kaydır kaçınma, torpidoya çift dokun karşı ateş.
// Hasarlı sistem savunmayı kısıtlar: iticiler giderse kaçınma yok, kalkan ısınırsa kalkan yok, reaktör kritikse
// tepkisiz kilitlenme. (4) değerlendirme.
import * as E from '../tarim/etki';
import { yildizCarpani } from '../zaman';
import { kayitBul } from '../veri/seslendirme';
import { uretec } from '../veri/murettebat';
import { GEMI_SINIFLARI } from '../veri/gemiler';
import * as SB from '../tonoflenya/subay';

// --- Subay yetenekleri ve teçhizat (tonoflenya-esya-zanaat-ve-murettebat-rehberi.md bölüm 1, 3) ---
// Oyuncu evresinde aşağı kaydır: sıradaki yetenek; çift dokun: kullan. Bekleme tur cinsinden (kaptanın komuta aurası
// yüzde on kısaltır, baş-büyücü cübbesi bir tur). Astral iksir sonraki yeteneği iki kat etkili yapar.
const kusan = (d, id) => !!(d.kusanilan && (d.kusanilan.silah === id || d.kusanilan.zirh === id));
const esya = (d, id) => (d.esya && d.esya[id]) || 0;
export function yetenekler(d) {
  const l = [{ id: 'odak', ad: SB.KAPTAN.aktif.ad, sahip: 'Kaptan', bekleme: SB.KAPTAN.aktif.bekleme }];
  for (const ist of SB.ISTASYON_SIRASI) {
    const s = d.istasyonlar && d.istasyonlar[ist];
    if (!s) continue;
    const k = s.cekirdek ? s.anahtar : SB.SUBAY_SIRASI.find((x) => SB.SUBAYLAR[x].istasyon === ist);
    const a = SB.SUBAYLAR[k].aktif;
    l.push({ id: a.id, ad: a.ad, sahip: s.ad.split(' ')[0] === 'Dr.' || s.ad.split(' ')[0] === 'Başçavuş' ? s.ad.split(' ')[1] : s.ad.split(' ')[0], bekleme: a.bekleme + (s.cekirdek ? 0 : 1) });
  }
  return l;
}
function beklemeSuresi(d, y) {
  return Math.max(1, y.bekleme * 0.9 - (kusan(d, 'bas_buyucu_cubbesi') ? 1 : 0));
}
function yetenekSec(d) {
  const s = d.savas;
  const l = yetenekler(d);
  s.yetenekNo = ((s.yetenekNo || 0) + 1) % l.length;
  const y = l[s.yetenekNo];
  const b = s.bekleme[y.id] || 0;
  return [{ ses: 'tik', soz: y.sahip + ': ' + y.ad + (b > 0 ? ', ' + Math.ceil(b) + ' tur bekliyor.' : ', hazır. Çift dokun.') }];
}
function yetenekKullan(d) {
  const s = d.savas;
  const l = yetenekler(d);
  const y = l[(s.yetenekNo || 0) % l.length];
  if ((s.bekleme[y.id] || 0) > 0) return [{ soz: y.ad + ' ' + Math.ceil(s.bekleme[y.id]) + ' tur daha bekliyor.', ses: 'red' }];
  const kat = d.astralOdak ? 2 : 1;
  const o = [];
  const g = d.gemi;
  const yuzde = () => ' Gövde yüzde ' + Math.round((100 * g.govde) / g.maxGovde) + '.';
  if (y.id === 'odak') {
    s.odak = 3 * kat;
    o.push({ ses: 'sinyal', soz: 'Odaklanmış Rezonans: ' + 3 * kat + ' tur boyunca atışların ve kalkanın iki kat.' });
  } else if (y.id === 'mor') {
    s.morKalkan = 2 * kat;
    s.silahYok = 1;
    o.push({ ses: 'el_kalkan', soz: y.sahip + ': "Aether kalkana!" Sonraki ' + 2 * kat + ' darbe yarı hasar; bir tur silah enerjisi yok.' });
  } else if (y.id === 'kizil') {
    if (!kilitliMi(d)) return [{ soz: 'Kızıl Odak için tam kilit gerekir.', ses: 'red' }];
    o.push({ soz: y.sahip + ': "Kızıl odak, ateş!"' });
    dusmanaHasar(d, 15 * kat, o, 'kizil');
  } else if (y.id === 'hucre') {
    for (const u of d.murettebat) u.stres = 0;
    g.govde = Math.min(g.maxGovde, g.govde + Math.round(g.maxGovde * 0.1 * kat));
    o.push({ ses: 'tislama', soz: y.sahip + ': organik sporlar havalandırmada; mürettebat soluklandı.' + yuzde() });
  } else if (y.id === 'karartma') {
    s.karartma = kat;
    o.push({ ses: 'sonar', soz: y.sahip + ': karşı frekans patlaması! Düşmanın sıradaki ' + (kat > 1 ? 'iki atışı' : 'atışı') + ' kör.' });
  } else if (y.id === 'kaynak') {
    g.govde = Math.min(g.maxGovde, g.govde + Math.round(g.maxGovde * 0.25 * kat));
    o.push({ ses: 'kaynak', soz: y.sahip + ': hidrolik kelepçeler sıkıldı, acil kaynak.' + yuzde() });
  } else if (y.id === 'gumus') {
    o.push({ ses: 'tislama', soz: y.sahip + ': "Çekilme rotası hazır." Gemi savaştan sıyrılıyor.' });
    d.astralOdak = false;
    s.bekleme[y.id] = beklemeSuresi(d, y);
    bitir(d, 'kacis', o);
    return o;
  }
  if (d.astralOdak) {
    d.astralOdak = false;
    o.push({ soz: 'Astral iksir: kritik büyü!' });
  }
  s.bekleme[y.id] = beklemeSuresi(d, y);
  if (d.savas) o.push(...sira(d));
  return o;
}

export const KILIT_ACI = 0.14;
// Kalkan ve silah frekansının duyulan tonu
export const tonFrek = (x) => Math.round(200 + x * 8);
export const SILAHLAR = {
  plazma: { ad: 'plazma topu', uyari: 2.2, hasar: 14, tarif: 'gitgide tizleşen bir bobin şarj vızıltısı' },
  torpido: { ad: 'kinetik torpido', uyari: 2.6, hasar: 22, tarif: 'ağır bir basınç tahliyesi ve yaklaşan roket kükremesi' },
  iyon: { ad: 'iyon ışını', uyari: 1.8, hasar: 10, tarif: 'sürekli yükselen bir rezonans ıslığı' },
};
export const DUSMANLAR = {
  korsan_korvet: { ad: 'korsan korveti', govde: 60, kalkan: 0.5, silahlar: ['plazma', 'torpido'], frek: 140, ganimet: { sasi_celigi: 30, mikrocip: 5 } },
  korsan_avci: { ad: 'korsan avcı gemisi', govde: 40, kalkan: 0.3, silahlar: ['iyon', 'plazma'], frek: 260, ganimet: { plaka: 40 } },
  yabanci_firkateyn: { ad: 'tanımsız yabancı firkateyn', govde: 110, kalkan: 0.6, silahlar: ['iyon', 'torpido', 'plazma'], frek: 90, ganimet: { kseno_alasim: 20, saf_kristal: 10 } },
};

// Kayıtlanabilir tohumlu zar
function zar(s) {
  s.sayac = (s.sayac || 0) + 1;
  const x = Math.sin(s.tohum * 0.0001 + s.sayac * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}
const yet = (d, id) => !!(d.kaptan.yetenekler && d.kaptan.yetenekler[id]);
const mod = (d, id) => !!(d.gemi && d.gemi.moduller[id]);

// Bir görev yerine (Başçarkçı, Telsiz Subayı, Taktik Nişancı, Başhekim, İkmal Subayı) atanmış mürettebat
// Stres verimliliği düşürür (koloniye inince dinlenir)
export function verimlilik(u) {
  return Math.max(0.5, 1 - (u.stres || 0) / 200);
}
export function gorevli(d, gorevYeri) {
  const g = d.gemi;
  if (!g) return null;
  const odalar = GEMI_SINIFLARI[g.sinif].odalar;
  for (const o of odalar) if (o.gorevYeri === gorevYeri && g.atamalar[o.id]) {
    const u = d.murettebat.find((x) => x.id === g.atamalar[o.id]);
    if (u) return u;
  }
  return null;
}

export function savasBaslat(d, tur) {
  const t = DUSMANLAR[tur];
  const r = uretec((d.tohum || 1) * 31 + (d.savasNo = (d.savasNo || 0) + 1));
  const tohum = Math.floor(r() * 1e9);
  d.savas = {
    tur,
    dusman: { ad: t.ad, govde: t.govde, max: t.govde, kalkan: t.kalkan, kalkanFrek: Math.round(30 + r() * 60), aci: (r() < 0.5 ? -1 : 1) * (0.6 + r() * 1.4), mesafe: 40 },
    silahFrek: 15,
    delik: false,
    evre: 'oyuncu',
    t: 0,
    sonraki: 4,
    uyari: null,
    sistem: { itici: 0, kalkan: 0, reaktor: 0 }, // 0: sağlam; >0: kaç tur daha arızalı
    isi: 0,
    raunt: 0,
    tohum, // kayda girebilsin diye üreteç değil tohum ve sayaç saklanır
    sayac: 0,
    kilitDendi: false,
    bekleme: {},
    yetenekNo: 0,
  };
  const ek = [];
  if (DUSMANLAR[tur].karanlik || tur === 'yabanci_firkateyn') {
    const k = SB.kriz(d, 'sinha');
    if (k) ek.push({ soz: k });
  }
  return [{ soz: 'Savaş duruşu! ' + t.ad + ' saldırıyor. Motor sesini iki kulakta eşitle: sağa sola kaydır. Kilit tonunda dokun: ateş; yukarı kaydır: torpido; iki parmakla çevir: silah frekansını kalkanına eşle. Uyarı sesinde: iki parmakla dokun kalkan, ters yana kaydır kaçınma, torpidoya çift dokun karşı ateş. Kendi sıranda aşağı kaydır: subay yeteneği seç; çift dokun: kullan. Basılı tut: durum ve düşman kalkanının tonu.', ses: 'alarm' }, { nota: { frek: tonFrek(d.savas.dusman.kalkanFrek), sure: 1.2 } }, ...ek];
}

function kilitPayi(d) {
  return KILIT_ACI * (yet(d, 'A1') ? 1.43 : 1);
}
export function kilitliMi(d) {
  return Math.abs(d.savas.dusman.aci) < kilitPayi(d);
}

function dusmanaHasar(d, x, olaylar, tur) {
  const s = d.savas;
  const dm = s.dusman;
  let h = x;
  // Kuşanılan silah kaptanın bataryasına odak olarak bağlanır
  if (tur === 'birincil') {
    if (kusan(d, 'plazma_tufegi')) h *= 1.8;
    else if (kusan(d, 'kara_buz_hancer')) {
      h *= 1.2;
      s.donma = 2;
    } else if (kusan(d, 'isik_mizragi')) h *= 2.4 * (DUSMANLAR[s.tur].karanlik ? 2 : 1);
    else if (kusan(d, 'golge_yayici')) s.dusmanMoral = true;
  }
  let muhimmat = false;
  if (tur === 'torpido' && esya(d, 'aether_muhimmati') > 0) {
    d.esya.aether_muhimmati -= 1;
    muhimmat = true;
    h *= 1.5;
  }
  const delik = s.delik || mod(d, 'k3_plazma_bobini') || tur === 'kizil' || muhimmat || (tur === 'birincil' && kusan(d, 'golge_yayici'));
  if (!delik) h *= 1 - dm.kalkan * (tur === 'torpido' ? 0.5 : 1) * (tur === 'birincil' && kusan(d, 'plazma_tufegi') ? 0.85 : 1);
  if (tur === 'kizil') h *= 1.5;
  if (s.odak > 0) h *= 2;
  // Varek: kritik vuruş; Kızıl baskın (Kırmızı 4. kademe): ilk isabet kritik
  if ((SB.kritikIhtimal(d) && zar(s) < SB.kritikIhtimal(d)) || (SB.kabiliyet(d, 'varek', 4) && !s.ilkIsabet)) {
    h *= 2;
    olaylar.push({ soz: 'Kritik vuruş!' });
  }
  s.ilkIsabet = true;
  // A-2 rezonans ayırt etme: zayıf noktaya kritik vuruş (her üç isabette bir)
  if (yet(d, 'A2')) {
    s.isabet = (s.isabet || 0) + 1;
    if (s.isabet % 3 === 0) {
      h *= 2;
      olaylar.push({ soz: 'Kritik! Zayıf noktadan vurdun.' });
    }
  }
  const nis = gorevli(d, 'Taktik Nişancı');
  if (nis) h *= 1 + 0.3 * verimlilik(nis);
  h *= E.verilenHasarCarpani(d); // prizmatik odaklama lensi
  dm.govde = Math.max(0, dm.govde - Math.round(h));
  olaylar.push({ ses: 'patlama', hasar: true });
  // B-2 bastırma ateşi: uyarı sürerken isabet, saldırıyı keser
  if (s.uyari && yet(d, 'B2')) {
    s.uyari = null;
    s.evre = 'oyuncu';
    s.sonraki = s.t + 3;
    olaylar.push({ soz: 'Bastırma ateşi: düşmanın saldırısı kesildi!' });
  }
  if (dm.govde <= 0) bitir(d, 'zafer', olaylar);
}

function bitir(d, sonuc, olaylar) {
  const s = d.savas;
  d.savasSon = { sonuc, ad: s.dusman.ad, tur: s.tur };
  if (sonuc === 'zafer') SB.ekolKazan(d, 'varek', 30);
  if (sonuc === 'kacis') {
    d.sahne = 'savas_son';
  } else if (sonuc === 'zafer' || sonuc === 'ateskes') {
    const g = DUSMANLAR[s.tur].ganimet;
    for (const k of Object.keys(g)) d.koloni.parcalar[k] = (d.koloni.parcalar[k] || 0) + (sonuc === 'zafer' ? g[k] : Math.round(g[k] / 2));
    d.kaptan.tecrube += sonuc === 'zafer' ? 80 : 60;
    d.itibar += sonuc === 'zafer' ? 20 : 30;
    // C-3 hurda yamama: iticiler tersaneye dönmeden çalışır
    d.savasSon.yama = yet(d, 'C3');
    if (d.savasSon.yama) d.gemi.govde = Math.min(d.gemi.maxGovde, d.gemi.govde + Math.round(d.gemi.maxGovde * 0.15));
    d.sahne = 'savas_son';
  } else {
    d.gemi.govde = 1;
    d.gemi.yer = 'kizak';
    d.uzay = null;
    // Kriyojenik şok iğnesi: ağır yaralılar stasiste koloniye ulaşır, yas tutulmaz (bir kez)
    if (E.etkiVar(d, 'kriyo')) {
      d.seferEtki.kriyo = 0;
      d.savasSon.kriyo = true;
    } else SB.moralKaybi(d, 5); // seferde alınan yenilgi kolonide yas (Axira yarıya indirir)
    d.sahne = 'savas_son';
  }
  // Doku rejenerasyon merhemi: revirde yaralılar iyileşir, stres yarıya
  if (E.etkiVar(d, 'merhem')) for (const u of d.murettebat) u.stres = Math.round((u.stres || 0) / 2);
  d.savas = null;
  olaylar.push({ bitti: true });
}

export function savasGirdi(d, g) {
  const s = d.savas;
  if (!s) return [];
  const o = [];
  const dm = s.dusman;
  if (g.tur === 'kaydir' && (g.yon === 'sag' || g.yon === 'sol') && !s.uyari) {
    dm.aci += g.yon === 'sag' ? 0.26 : -0.26;
    const k = kilitliMi(d);
    if (k && !s.kilitDendi) o.push({ ses: 'kilitTonu' });
    s.kilitDendi = k;
    return o.length ? o : [{ ses: 'tik' }];
  }
  if (g.tur === 'dondur') {
    s.silahFrek = Math.max(0, Math.min(120, s.silahFrek + g.f * 7));
    if (!s.delik && Math.abs(s.silahFrek - dm.kalkanFrek) < (SB.kabiliyet(d, 'sinha', 4) ? 6 : 3)) {
      s.delik = true;
      return [{ soz: 'Silah frekansı kalkanla eşleşti; kalkan delinebilir.', ses: 'sinyal' }];
    }
    if (Math.abs(s.silahFrek - (s.sonNota || 0)) >= 2) {
      s.sonNota = s.silahFrek;
      return [{ nota: { frek: tonFrek(s.silahFrek), sure: 0.25 } }];
    }
    return [];
  }
  if (s.uyari) {
    // Reaktif savunma penceresi
    const u = s.uyari;
    if (s.sistem.reaktor > 0 && !yet(d, 'C2')) return [{ soz: 'Reaktör kilitli; sistemler yanıt vermiyor!', ses: 'red' }];
    // Mor Yıldız 4. kademe: taktik teleport (çatışma başına bir kez)
    if (g.tur === 'dokun' && g.parmak >= 3 && SB.kabiliyet(d, 'elyndra', 4)) {
      if (s.teleport) return [{ soz: 'Teleport bobinleri bu çatışmada boşaldı.', ses: 'red' }];
      s.teleport = true;
      u.savunma = 'teleport';
      return [{ ses: 'el_kalkan', soz: 'Teleport!' }];
    }
    if (g.tur === 'dokun' && g.parmak >= 2) {
      if (s.sistem.kalkan > 0) return [{ soz: 'Kalkan kondansatörü aşırı ısındı; kalkan açılmıyor!', ses: 'red' }];
      u.savunma = 'kalkan';
      return [{ ses: 'valf', soz: 'Kalkan!' }];
    }
    if (g.tur === 'kaydir' && (g.yon === 'sag' || g.yon === 'sol')) {
      const dogru = u.yon === 'sag' ? 'sol' : 'sag';
      if (s.sistem.itici > 0) return [{ soz: 'Yön iticileri parçalandı; tepkisiz itki!', ses: 'red' }];
      if (g.yon === dogru) {
        u.savunma = 'kacinma';
        return [{ ses: 'tislama' }];
      }
      return [{ soz: 'Yanlış yöne!', ses: 'red' }];
    }
    if (g.tur === 'kaydir' && g.yon === 'asagi' && u.silah === 'torpido' && yet(d, 'D1')) {
      u.savunma = 'chaff';
      return [{ ses: 'tislama', soz: 'Sahte gürültü patlaması!' }];
    }
    if (g.tur === 'cift' && u.silah === 'torpido') {
      u.savunma = 'karsi';
      return [{ ses: 'patlama', soz: 'Karşı ateş!' }];
    }
    if (g.tur === 'dokun' && yet(d, 'B2')) {
      // Bastırma ateşi denemesi
      if (!kilitliMi(d)) return [{ soz: 'Iskaladın.', ses: 'red' }];
      dusmanaHasar(d, 8, o, 'birincil');
      return o;
    }
    return [];
  }
  // Oyuncu evresi: subay yetenekleri
  if (g.tur === 'kaydir' && g.yon === 'asagi' && g.parmak < 2) return yetenekSec(d);
  if (g.tur === 'cift' && (g.parmak || 1) < 2) return yetenekKullan(d);
  if (s.silahYok > 0 && (g.tur === 'dokun' && g.parmak < 2 || g.tur === 'kaydir' && g.yon === 'yukari')) return [{ soz: 'Silah enerjisi kalkanda; bu tur ateş yok.', ses: 'red' }];
  if (g.tur === 'dokun' && g.parmak < 2) {
    s.eylem = true;
    s.sonEylem = 'birincil';
    if (!kilitliMi(d)) return [{ soz: 'Iskaladın; pruva hedefte değil.', ses: 'red' }, ...sira(d)];
    const sil = d.kusanilan && d.kusanilan.silah;
    if (sil) o.push({ ses: { plazma_tufegi: 'el_tufek', kara_buz_hancer: 'el_hancer', isik_mizragi: 'el_mizrak', golge_yayici: 'el_golge' }[sil] });
    dusmanaHasar(d, 10, o, 'birincil');
    if (d.savas) o.push(...sira(d));
    return o;
  }
  if (g.tur === 'kaydir' && g.yon === 'yukari' && g.parmak < 2) {
    if (!kilitliMi(d)) return [{ soz: 'Torpido için tam kilit gerekir.', ses: 'red' }];
    // Torpido tüpü iki turda dolar; B-1 salvo senkronizasyonu birincil ateşin ardından şarjsız ateşler
    if ((s.torpidoBekle || 0) > 0 && !(yet(d, 'B1') && s.sonEylem === 'birincil')) return [{ soz: 'Torpido tüpü henüz dolmadı.', ses: 'red' }];
    s.torpidoBekle = 2;
    s.sonEylem = 'torpido';
    s.eylem = true;
    o.push({ ses: 'hidrolik' });
    dusmanaHasar(d, 30, o, 'torpido');
    if (d.savas) o.push(...sira(d));
    return o;
  }
  if (g.tur === 'kaydir' && g.yon === 'yukari' && g.parmak >= 2 && yet(d, 'D3') && dm.govde <= dm.max * 0.25) {
    o.push({ soz: 'Ateşkes çağrısı kabul edildi; düşman teslim oluyor.' });
    bitir(d, 'ateskes', o);
    return o;
  }
  if (g.tur === 'dokun' && g.parmak >= 2) return [{ soz: durumMetni(d) }];
  return [];
}

// Oyuncunun hamlesinden sonra (ya da beklerken) düşman hazırlanır
function sira(d) {
  const s = d.savas;
  if (s.uyari) return [];
  s.sonraki = s.t + 0.6;
  return [];
}

function uyariBaslat(d) {
  const s = d.savas;
  const t = DUSMANLAR[s.tur];
  // Fenrir ışık pelerini: ilk saldırı hedef bulamaz; kara buz hançeri: donan düşman gecikir
  if (kusan(d, 'isik_pelerini') && !s.pelerin) {
    s.pelerin = true;
    s.sonraki = s.t + 4;
    return [{ soz: 'Işık pelerini gemiyi düşman tarayıcılarından sakladı; hedef bulamadı.', ses: 'el_pelerin' }];
  }
  if (s.donma > 0) {
    s.donma -= 1;
    s.sonraki = s.t + 3;
    return [{ soz: 'Düşman buzla kaplı; iticileri donmuş.', ses: 'el_hancer' }];
  }
  const silah = t.silahlar[Math.floor(zar(s) * t.silahlar.length)];
  const sure = SILAHLAR[silah].uyari * (zar(s) * 0.5 + 0.75) + (yet(d, 'A3') ? 1 : 0) + (mod(d, 'k2_soguk_nozul') ? 0.6 : 0) + E.uyariEki(d, s) + (SB.kabiliyet(d, 'varek', 2) ? 0.5 : 0);
  s.uyari = { silah, kalan: sure * (SB.kabiliyet(d, 'sinha', 2) ? 1.25 : 1), yon: s.dusman.aci > 0 ? 'sol' : 'sag', savunma: null };
  s.evre = 'uyari';
  const o = [{ uyari: silah, yon: s.uyari.yon }];
  // Telsiz subayı (ses hassasiyeti) ya da D-2 yabancı dil sezgisi silahı önceden söyler
  const tel = gorevli(d, 'Telsiz Subayı');
  if ((tel && tel.nitelik === 'ses_hassas') || yet(d, 'D2')) {
    // Telsiz subayı öncü telsizciyse kendi sesiyle bağırır (seslendirme.js); değilse rehber okur
    const kayit = tel ? kayitBul(d, 'savas_' + silah + '_' + s.uyari.yon, tel) : null;
    o.push({ soz: (tel ? tel.ad.split(' ')[0] + ': ' : '') + SILAHLAR[silah].ad + ', ' + (s.uyari.yon === 'sag' ? 'sağdan' : 'soldan') + '!', kayit });
  }
  return o;
}

function darbe(d) {
  const s = d.savas;
  const u = s.uyari;
  const o = [];
  const sil = SILAHLAR[u.silah];
  s.uyari = null;
  s.evre = 'oyuncu';
  s.raunt += 1;
  if (s.torpidoBekle > 0) s.torpidoBekle -= 1;
  s.sonraki = s.t + 3 + zar(s) * 2;
  for (const k of Object.keys(s.bekleme || {})) s.bekleme[k] = Math.max(0, s.bekleme[k] - 1);
  if (s.odak > 0) s.odak -= 1;
  if (s.silahYok > 0) s.silahYok -= 1;
  // Arızalar tur geçtikçe onarılır (başçarkçı hızlandırır; soğukkanlı panik yapmaz)
  const carkci = gorevli(d, 'Başçarkçı');
  for (const k of Object.keys(s.sistem)) if (s.sistem[k] > 0) s.sistem[k] = Math.max(0, s.sistem[k] - (carkci ? (carkci.nitelik === 'sogukkanli' ? 2 : 1.5) : 1));
  if (u.savunma === 'kacinma' || u.savunma === 'karsi' || u.savunma === 'chaff' || u.savunma === 'teleport') {
    SB.ekolKazan(d, 'sinha', 3);
    o.push({ soz: u.savunma === 'kacinma' ? 'Kaçtın; mermi boş uzayı yırttı.' : u.savunma === 'karsi' ? 'İki patlama birbirini yok etti.' : u.savunma === 'teleport' ? 'Gemi bir an yok olup yüz metre öteden çıktı; darbe boşa gitti.' : 'Füze şaşırdı.', ses: u.savunma === 'karsi' ? 'patlama' : 'tislama' });
    return o;
  }
  // Akustik karartma ve morali kırılmış düşman ıskalar
  if (s.karartma > 0 || (s.dusmanMoral && zar(s) < 0.3)) {
    if (s.karartma > 0) s.karartma -= 1;
    o.push({ soz: 'Düşmanın atışı ıskaladı.', ses: 'tislama' });
    return o;
  }
  let h = sil.hasar;
  if (s.morKalkan > 0) {
    s.morKalkan -= 1;
    h *= 0.5;
  }
  if (u.savunma === 'kalkan') {
    SB.ekolKazan(d, 'sinha', 3);
    // Aether kalkan amplifikatörü; ambardaki kara kristal fazlası kalkan frekansını bozar; odaklanmış rezonans
    h *= mod(d, 'kalkan_amplifikatoru') ? 0.12 : 0.2;
    if ((d.koloni.kaynaklar.kara_aether || 0) > 4) h *= 1.75;
    if (s.odak > 0) h *= 0.5;
    s.isi += 40 * SB.kalkanIsiCarpani(d) * (mod(d, 'kalkan_amplifikatoru') ? 0.6 : 1);
    if (s.isi >= 100) {
      s.isi = 0;
      s.sistem.kalkan = 2;
      o.push({ soz: 'Kalkan kondansatörü aşırı ısındı!' });
    }
    o.push({ ses: 'valf', soz: 'Kalkan darbeyi sönümledi.' });
  }
  if (u.silah === 'torpido' && mod(d, 'k1_sonumleme')) h *= 0.6;
  if (yet(d, 'C1')) h *= 0.9;
  if (mod(d, 'hisar_kalkani')) h *= 0.8;
  h *= E.alinanHasarCarpani(d) * yildizCarpani(d, 'hasar'); // Kaelith kalkan kristali, zaman-kristal koruyucu tabakası
  const g = d.gemi;
  g.govde = Math.max(0, g.govde - Math.round(h));
  if (u.savunma !== 'kalkan') {
    // Darbe mürettebatı strese sokar (soğukkanlı etkilenmez)
    for (const id of Object.values(g.atamalar || {})) {
      const m0 = d.murettebat.find((x) => x.id === id);
      if (m0 && m0.nitelik !== 'sogukkanli' && !E.etkiVar(d, 'guvec')) m0.stres = Math.min(100, (m0.stres || 0) + 8);
    }
    o.push({ ses: 'patlama', hasar: true, soz: sil.ad + ' isabet etti! Gövde yüzde ' + Math.round((100 * g.govde) / g.maxGovde) + '.' });
    // Esnek gövde macunu: gövde yarının altına inince delikleri kendiliğinden kapatır (seferde bir kez)
    if (E.etkiVar(d, 'macun') && !d.macunKullanildi && g.govde > 0 && g.govde < g.maxGovde / 2) {
      d.macunKullanildi = true;
      g.govde = Math.min(g.maxGovde, g.govde + Math.round(g.maxGovde * 0.3));
      o.push({ soz: 'Canlı gövde macunu delikleri kapattı. Gövde yüzde ' + Math.round((100 * g.govde) / g.maxGovde) + '.' });
    }
    // Savunmasız darbe bir sistemi bozar
    const sistemler = ['itici', 'kalkan', 'reaktor'];
    const k = sistemler[s.raunt % 3];
    if (zar(s) < 0.5) {
      s.sistem[k] = 2;
      if (k === 'reaktor' && mod(d, 'k4_tahliye_valfi')) s.sistem[k] = 1;
      o.push({ soz: k === 'itici' ? 'Yön iticileri hasarlı!' : k === 'kalkan' ? 'Kalkan kondansatörü hasarlı!' : 'Reaktör basıncı kritik!' });
    }
  }
  // Subayların kriz sözleri (bir sefer boyunca birer kez)
  const kz = [];
  if (u.savunma !== 'kalkan' && g.govde > 0) kz.push(SB.kriz(d, 'varek'));
  if (g.govde > 0 && g.govde < g.maxGovde * 0.5) kz.push(SB.kriz(d, 'drahmir'));
  if (g.govde > 0 && g.govde < g.maxGovde * 0.2) kz.push(SB.kriz(d, 'elyndra'));
  if (s.sistem.itici > 0) kz.push(SB.kriz(d, 'zhaor'));
  for (const k of kz) if (k) o.push({ soz: k });
  if (g.govde <= 0) bitir(d, 'yenilgi', o);
  return o;
}

export function savasIlerle(d, dt) {
  const s = d.savas;
  if (!s) return [];
  s.t += dt;
  // Düşman yavaşça manevra yapar; K5 karadutu modeli çözünce manevra küçülür
  s.dusman.aci += Math.sin(s.t * 0.4) * 0.05 * dt * (mod(d, 'k5_karadutu') && s.raunt >= 2 ? 0.3 : 1);
  const k = kilitliMi(d);
  const o = [];
  if (k && !s.kilitDendi && !s.uyari) o.push({ ses: 'kilitTonu' });
  s.kilitDendi = k;
  if (!s.uyari && s.t >= s.sonraki) o.push(...uyariBaslat(d));
  else if (s.uyari) {
    s.uyari.kalan -= dt;
    if (s.uyari.kalan <= 0) o.push(...darbe(d));
  }
  return o;
}

export function savasSes(d) {
  const s = d.savas;
  if (!s) return {};
  const a = s.dusman.aci;
  return { dusman: { x: Math.sin(-a) * s.dusman.mesafe, y: Math.cos(a) * s.dusman.mesafe, frek: DUSMANLAR[s.tur].frek }, uyari: s.uyari ? { silah: s.uyari.silah, oran: 1 - s.uyari.kalan / SILAHLAR[s.uyari.silah].uyari } : null };
}

export function durumMetni(d) {
  const s = d.savas;
  if (!s) return '';
  const dm = s.dusman;
  const ar = Object.keys(s.sistem).filter((k) => s.sistem[k] > 0);
  return dm.ad + ': gövde yüzde ' + Math.round((100 * dm.govde) / dm.max) + (s.delik ? ', kalkanı delik' : '') + '. ' + (kilitliMi(d) ? 'Kilitli.' : 'Düşman ' + (dm.aci > 0 ? 'solda' : 'sağda') + '.') + ' Gövden yüzde ' + Math.round((100 * d.gemi.govde) / d.gemi.maxGovde) + '.' + (ar.length ? ' Arızalı: ' + ar.map((k) => (k === 'itici' ? 'iticiler' : k === 'kalkan' ? 'kalkan' : 'reaktör')).join(', ') + '.' : '');
}

export const SAHNELER = {
  savas_son: {
    baslik: 'Çatışma bitti',
    metin: (d) => {
      const x = d.savasSon || {};
      if (x.sonuc === 'zafer') return [x.ad + ' etkisiz. Enkazdan parçalar ambara alındı.', x.yama ? 'Hurda yamayla iticiler çalışır hâlde.' : ''];
      if (x.sonuc === 'kacis') return ['Gümüş rotayla ' + x.ad + ' geride kaldı. Ganimet yok ama gövde sağlam.'];
      if (x.sonuc === 'ateskes') return [x.ad + ' teslim oldu; ganimetin yarısı ve diplomatik itibar.'];
      return [x.kriyo ? 'Gövde dayanamadı. Acil iticilerle koloniye çekildin. Ağır yaralılar kriyojenik şok iğneleriyle stasiste; hepsi canlı ulaştı, yas tutulmuyor.' : 'Gövde dayanamadı. Acil iticilerle koloniye çekildin; tersane gemiyi onarıyor. Kolonide yas havası: moral düştü.'];
    },
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
  },
};
