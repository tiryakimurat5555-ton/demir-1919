// Yerleşim sistemi (v5 paketi; Paket 1, Paket 8, Paket 3A takvimi). Görev aralarında koloniyi yaşatan katman:
// 12 sosyal mekân (Merkez Terminal'in Yerleşim sekmesinden kurulur), 16 yerleşimci (katılım koşulları, nöbet
// programları, 0-1000 ilişki puanı ve 10 kademe), günlük sohbet (üç ton), hediyeleşme, doğum günleri, Kaptanın
// Kamarası (uyku ve sesli dekorlar).
//
// d.yer = {
//   binalar: [bina kimliği],               ihtiyac: [ihtiyacı söylenmiş binalar]
//   katilan: [yerleşimci kimliği],         kisi: { id: { p, k, sohbetGun, hediyeGun, hediyeler [gün], sahneGun, selamNobet } }
//   dekorlar: [dekor kimliği],             dogumDendi: gün,   sonGun: son işlenen gün
// }
// Kademe Paket 8: puan/100; bir gün içinde en çok bir kademe atlanır (sahne bekleme kuralı); kademe hiç düşmez.
// Kademe 3, 6 ve 10 Paket 1'in K1/K2/K3 kazançları: bayrak yk_<id>_<kademe>.
import { YERLESIM_BINALARI, YERLESIM_SIRASI, YERLESIMCILER, YERLESIMCI_SIRASI, CEKIRDEK, MIZACLAR, KADEMELER, KADEME_KILIDI, SOHBETLER, MESGUL, DEKORLAR } from './veri';
import { katildiMi, yerVar, kisiKonumu, programAktif, kisiKimligi, yerlesimciKimligi } from './konum';
import * as Z from '../zaman';
import * as ZN from '../tonoflenya/zanaat';
import * as SB from '../tonoflenya/subay';
import { HAMMADDELER } from '../veri/tesisler';
import { PARCALAR, TARIFLER } from '../veri/uretim';
import { BITKILER, ISLEME } from '../tarim/bitkiler';
import { SAHNE_A } from './sahneA';
import { SAHNE_B } from './sahneB';
import { SAHNE_C } from './sahneC';
import { OLAYLAR, OLAY_SIRASI, SOSYAL_OCAKLAR, ocagi, ciftAnahtari } from './ikili';

// 4.1: Paket 8A-8C kademe sahneleri (her kademe atlanışında bekleyen sahne; kişiye çift dokununca ilk seçenek)
export const KADEME_SAHNELERI = { ...SAHNE_A, ...SAHNE_B, ...SAHNE_C };

export { katildiMi, yerVar, kisiKonumu, programAktif, kisiKimligi, yerlesimciKimligi };

// Paket 1'in "Cam" malzemesi: dökümhanede kristal ve bazalttan dökülen kalın cam
if (!PARCALAR.cam) {
  PARCALAR.cam = { ad: 'kalın cam levha', tarif: 'Kristal tozu ve bazalttan dökülen, ışığı süzen kalın cam. Yerleşim binalarının pencereleri ve kubbeleri.' };
  TARIFLER.dokumhane.push({ id: 'cam', ad: '4 kalın cam levha dök', girdi: { kristal: 1, bazalt: 2 }, cikti: { cam: 4 }, sure: 40 });
}

export const PUAN = { tam: 20, notr: 10, ters: -5, sever: 45, normal: 15, sevmez: -15, halka: 10 };
export const HEDIYE_GUNLUK = 1;
export const HEDIYE_HAFTALIK = 2;

export function hazirla(d) {
  if (!d.yer) d.yer = { binalar: [], ihtiyac: [], katilan: [], kisi: {}, dekorlar: [], dogumDendi: 0, sonGun: 0 };
  const y = d.yer;
  for (const k of ['binalar', 'ihtiyac', 'katilan', 'dekorlar']) if (!y[k]) y[k] = [];
  if (!y.kisi) y.kisi = {};
  for (const id of CEKIRDEK) katil(d, id, true);
  return y;
}

export function kayit(d, id) {
  const y = hazirla(d);
  if (!y.kisi[id]) y.kisi[id] = { p: 0, k: 0, sohbetGun: 0, hediyeGun: 0, hediyeler: [], sahneGun: 0, izlenen: [], sahne: null };
  const r = y.kisi[id];
  if (!r.izlenen) {
    // 4.0 kayıtları: ulaşılmış kademenin sahnesi bekler
    r.izlenen = [];
    r.sahne = r.k >= 1 ? r.k : null;
  }
  return r;
}

export function katil(d, id, sessiz) {
  const y = d.yer;
  if (y.katilan.includes(id)) return false;
  y.katilan.push(id);
  const r = kayit(d, id);
  // Başlangıç çekirdeği Kademe 1'den (Tanıdık, 100 puan) başlar
  if (CEKIRDEK.includes(id)) {
    r.p = Math.max(r.p, 100);
    r.k = Math.max(r.k, 1);
    if (!r.izlenen.includes(1)) r.sahne = 1; // tanışma sahnesi
  }
  if (!sessiz) {
    const k = YERLESIMCILER[id];
    SB.haber(d, 'Yerleşim: ' + k.ad + ' koloniye katıldı. ' + k.rol + '; ' + k.kisilik + ' Programına göre koloninin bir yerinde onu bulabilirsin.');
  }
  return true;
}

export const adi = (id) => YERLESIMCILER[id].ad;
export const kisaAdi = (id) => YERLESIMCILER[id].kisa;
export function puan(d, id) {
  return kayit(d, id).p;
}
export function kademe(d, id) {
  return kayit(d, id).k;
}
function bugun(d) {
  return Z.gun(d);
}
function hiz(id, k) {
  return YERLESIMCILER[id].hiz(k);
}

// Puan ekler. Olumlu kazanç karakterin bar hızıyla çarpılır; puan hiçbir zaman ulaşılmış kademenin tabanının altına
// düşmez (Paket 8 5.4). Kademe atlama kademeDenetle'de.
export function puanEkle(d, id, miktar, halkaYok) {
  const r = kayit(d, id);
  const m = miktar > 0 ? Math.round(miktar * hiz(id, r.k)) : miktar;
  r.p = Math.max(r.k * 100, Math.min(1000, r.p + m));
  const metin = kademeDenetle(d, id, halkaYok);
  return { kazanc: m, metin };
}

// Bir gün içinde en çok bir kademe (büyük sahneler arasında bir oyun günü)
export function kademeDenetle(d, id, halkaYok) {
  const r = kayit(d, id);
  if (r.k >= 10 || r.p < (r.k + 1) * 100) return null;
  if (r.sahneGun && r.sahneGun >= bugun(d)) return null;
  r.k += 1;
  r.sahneGun = bugun(d);
  r.sahne = r.k;
  const y = YERLESIMCILER[id];
  const sh = KADEME_SAHNELERI[id] && KADEME_SAHNELERI[id][r.k];
  const parca = [y.kisa + ' ile ilişkin derinleşti: Kademe ' + r.k + ', ' + KADEMELER[r.k] + '. Açılan: ' + KADEME_KILIDI[r.k] + '.' + (sh ? ' ' + y.kisa + ' seninle konuşmak istiyor: “' + sh.b + '”. Yanına gidip konuş.' : '')];
  if (y.kademe[r.k]) {
    d.bayrak['yk_' + id + '_' + r.k] = true;
    parca.push(kazancUygula(d, id, r.k) || y.kademe[r.k]);
  }
  if (d.koloni) d.koloni.moral = Math.min(100, d.koloni.moral + 2);
  // Dost halkası: en yakınları da sempati kazanır
  if (!halkaYok) {
    const ovenler = [];
    for (const yk of y.yakin) {
      if (!katildiMi(d, yk)) continue;
      puanEkle(d, yk, PUAN.halka, true);
      ovenler.push(kisaAdi(yk));
    }
    if (ovenler.length) parca.push(ovenler.join(' ve ') + ' de bunu duydu: "Kaptan, ' + y.kisa + ' senden övgüyle bahsetti."');
  }
  const metin = parca.join(' ');
  SB.haber(d, metin);
  return metin;
}

// K1/K2/K3 kazançlarından anında etkisi olanlar (öteki bayraklar ilgili sistemlerde okunur)
function kazancUygula(d, id, k) {
  const y = YERLESIMCILER[id];
  if (id === 'sorya' && k === 3) {
    d.koloni.moral = Math.min(100, d.koloni.moral + 10);
    return 'Sorya kayıp baharat kesesini buldu; aşhaneden yayılan kokuyla koloninin morali on arttı.';
  }
  if (id === 'veysel' && k === 6) return 'Usta Veysel\'in dekor dükkânı açıldı: Kaptanın Kamarası\'ndaki rafa müzik kutusu, kseno-akvaryum, kafes kuşu ve rüzgâr çanı yaptırabilirsin.';
  return y.kademe[k];
}

// --- Bina ihtiyacı, kurulum ---
export function binaDurumu(d, id) {
  const b = YERLESIM_BINALARI[id];
  if (b.baslangic) return 'kurulu';
  if (yerVar(d, id)) return 'kurulu';
  if (!b.kosul(d)) return 'kilitli';
  return eksikler(d, b.malzeme).length ? 'eksik' : 'hazir';
}
function malzemeAdi(k) {
  return ZN.adi(k);
}
export function eksikler(d, malzeme) {
  return Object.keys(malzeme || {})
    .filter((k) => ZN.miktar(d, k) < malzeme[k])
    .map((k) => malzeme[k] - ZN.miktar(d, k) + ' ' + malzemeAdi(k));
}
export function malzemeMetni(malzeme) {
  return Object.keys(malzeme || {})
    .map((k) => malzeme[k] + ' ' + malzemeAdi(k))
    .join(', ');
}
export function binaKur(d, id) {
  hazirla(d);
  const b = YERLESIM_BINALARI[id];
  const dur = binaDurumu(d, id);
  if (dur === 'kurulu') return { metin: b.ad + ' zaten kurulu.' };
  if (dur === 'kilitli') return { metin: b.ad + ' için henüz ihtiyaç doğmadı. Koşul: ' + b.kosulMetni, ses: 'red' };
  const e = eksikler(d, b.malzeme);
  if (e.length) return { metin: 'Eksik: ' + e.join(', ') + '.', ses: 'red' };
  for (const k of Object.keys(b.malzeme)) ZN.ekle(d, k, -b.malzeme[k]);
  d.yer.binalar.push(id);
  d.koloni.moral = Math.min(100, d.koloni.moral + 5);
  return { metin: b.ad + ' kuruldu. ' + (b.kurulus || '') + ' Koloninin morali beş arttı.', ses: 'kur' };
}

// --- Zamanla: ihtiyaçlar, katılımlar, gecikmiş kademeler, doğum günleri ---
export function yerlesimIlerle(d) {
  if (!d.yer) kaydiTamamla(d);
  const y = hazirla(d);
  for (const id of YERLESIM_SIRASI) {
    const b = YERLESIM_BINALARI[id];
    if (b.baslangic || yerVar(d, id) || y.ihtiyac.includes(id) || !b.kosul(d)) continue;
    y.ihtiyac.push(id);
    const veren = (b.veren || []).find((v) => katildiMi(d, v)) || 'sorya';
    SB.haber(d, adi(veren) + ': "' + b.ihtiyac + '" Merkez terminalinde Yerleşim sekmesinden kurulur: ' + malzemeMetni(b.malzeme) + '.');
  }
  for (const id of YERLESIMCI_SIRASI) {
    const k = YERLESIMCILER[id];
    if (katildiMi(d, id) || !k.katilim || !k.katilim(d)) continue;
    katil(d, id);
  }
  const g = bugun(d);
  if (y.sonGun !== g) {
    y.sonGun = g;
    for (const id of y.katilan) kademeDenetle(d, id);
    olayDenetle(d);
    const yg = Z.yilGunu(d);
    if (y.dogumDendi !== g) {
      const kim = y.katilan.filter((id) => YERLESIMCILER[id].dogum === yg);
      if (kim.length) {
        y.dogumDendi = g;
        SB.haber(d, 'Takvim: bugün ' + kim.map(adi).join(' ve ') + ' için doğum günü. Sevdiği bir hediye bugün iki kat sevindirir.');
      }
    }
  }
}

// --- Sohbet (Paket 8 5.1) ---
function sohbetSozu(d, id) {
  const y = YERLESIMCILER[id];
  const g = bugun(d);
  const i = YERLESIMCI_SIRASI.indexOf(id);
  const miz = y.mizac[(g + i) % y.mizac.length];
  const liste = SOHBETLER[miz];
  return { miz, s: liste[(g * 3 + i) % liste.length] };
}
const TEPKI = {
  tam: ['gözleri parlıyor: "Tam da bunu düşünüyordum Kaptan."', 'gülümsüyor: "Sen beni anlıyorsun."', 'başını sallıyor: "İşte böyle konuşan biriyle çalışmak güzel."'],
  notr: ['omuz silkiyor: "Olabilir, bir düşüneyim."', 'kısa bir süre susuyor: "Hı, mantıklı."', '"Peki Kaptan," diyor, işine dönerek.'],
  ters: ['kaşlarını çatıyor: "Bugün pek anlaşamadık galiba."', 'soğuk bir sesle: "Neyse, işim var."', 'iç çekiyor: "Sen bilirsin Kaptan."'],
};
export function sohbetDurumu(d, id) {
  return kayit(d, id).sohbetGun === bugun(d) ? 'bugün konuştunuz' : 'bugün henüz konuşmadınız';
}
export function sohbetMenu(d, id) {
  const r = kayit(d, id);
  const y = YERLESIMCILER[id];
  if (r.sohbetGun === bugun(d)) {
    const i = (bugun(d) + YERLESIMCI_SIRASI.indexOf(id)) % MESGUL.length;
    return { baslik: 'Sohbet: ' + y.kisa, giris: y.kisa + ': "' + MESGUL[i] + '"', ogeler: [] };
  }
  const { miz, s } = sohbetSozu(d, id);
  const tonlar = ['A', 'B', 'C'];
  // Seçeneklerin sırası günden güne değişir (ton ipucu yok, Paket 8 bölüm 7)
  const kay = (bugun(d) + YERLESIMCI_SIRASI.indexOf(id)) % 3;
  const sirali = [...tonlar.slice(kay), ...tonlar.slice(0, kay)];
  return {
    baslik: 'Sohbet: ' + y.kisa,
    giris: y.kisa + ': "' + s.soz + '" Nasıl yanıt verirsin?',
    ogeler: sirali.map((t) => ({
      id: 'ton_' + t,
      etiket: s[t],
      geri: true,
      yap: (x) => sohbetYanitla(x, id, t, miz),
    })),
  };
}
export function sohbetYanitla(d, id, ton, miz) {
  const r = kayit(d, id);
  const y = YERLESIMCILER[id];
  if (r.sohbetGun === bugun(d)) return { metin: y.kisa + ' bugün seninle zaten konuştu.' };
  r.sohbetGun = bugun(d);
  const m = MIZACLAR[miz || y.mizac[0]];
  const tur = ton === m.tam ? 'tam' : ton === m.ters ? 'ters' : 'notr';
  const sonuc = puanEkle(d, id, PUAN[tur]);
  const tl = TEPKI[tur];
  const metin = y.kisa + ' ' + tl[(bugun(d) + ton.charCodeAt(0)) % tl.length] + (sonuc.kazanc ? ' İlişki ' + (sonuc.kazanc > 0 ? sonuc.kazanc + ' puan arttı' : -sonuc.kazanc + ' puan azaldı') + '.' : '') + (sonuc.metin ? ' ' + sonuc.metin : '');
  return { metin, tur, efekt: tur === 'tam' ? 'imza_' + id + '_tesekkur' : null };
}

// --- Hediye (Paket 8 5.2; günde 1, haftada 2) ---
export const yiyecekMi = (k) => k.indexOf('urun_') === 0 || k.indexOf('erzak_') === 0 || !!(ZN.ESYA[k] && ZN.ESYA[k].yiyecek);
export function varlik(d, k) {
  if (k.indexOf('erzak_') === 0) return (d.tarim && d.tarim.erzak && d.tarim.erzak[k.slice(6)]) || 0;
  return ZN.miktar(d, k);
}
export function varlikEkle(d, k, n) {
  if (k.indexOf('erzak_') === 0) {
    if (d.tarim && d.tarim.erzak) d.tarim.erzak[k.slice(6)] = Math.max(0, (d.tarim.erzak[k.slice(6)] || 0) + n);
    return;
  }
  ZN.ekle(d, k, n);
}
export function varlikAdi(k) {
  if (k.indexOf('erzak_') === 0) {
    const x = ISLEME.find((i) => i.id === k.slice(6));
    return x ? x.ad : k;
  }
  return ZN.adi(k);
}
export function tepkiTuru(id, k) {
  const y = YERLESIMCILER[id];
  if (y.sever.includes(k)) return 'sever';
  if (y.sevmez.includes(k) || (y.sevmez.includes('yiyecek') && yiyecekMi(k))) return 'sevmez';
  return 'normal';
}
// Elde olan verilebilir her şey, üç kümede
export function hediyeAdaylari(d) {
  const yiy = [];
  const ham = [];
  const par = [];
  if (d.tarim) {
    for (const b of Object.keys(d.tarim.urun || {})) if (d.tarim.urun[b] > 0 && BITKILER[b]) yiy.push('urun_' + b);
    for (const e of Object.keys(d.tarim.erzak || {})) if (d.tarim.erzak[e] > 0) yiy.push('erzak_' + e);
  }
  for (const h of Object.keys(d.koloni.kaynaklar || {})) if (HAMMADDELER[h] && d.koloni.kaynaklar[h] > 0) ham.push(h);
  for (const p of Object.keys(d.koloni.parcalar || {})) if (PARCALAR[p] && d.koloni.parcalar[p] > 0) par.push(p);
  for (const e of Object.keys(d.esya || {})) if (d.esya[e] > 0) (yiyecekMi(e) ? yiy : par).push(e);
  return { yiy, ham, par };
}
function haftaNo(g) {
  return Math.floor((g - 1) / Z.HAFTA);
}
export function hediyeEngeli(d, id) {
  const r = kayit(d, id);
  const g = bugun(d);
  if (r.hediyeGun === g) return 'Bugünlük bu kadar yeter Kaptan, teşekkürler.';
  const buHafta = (r.hediyeler || []).filter((x) => haftaNo(x) === haftaNo(g)).length;
  if (buHafta >= HEDIYE_HAFTALIK) return 'Bu haftalık bu kadar yeter Kaptan, teşekkürler.';
  return null;
}
export function ozelGunMu(d, id) {
  return YERLESIMCILER[id].dogum === Z.yilGunu(d) || !!(d.festival && d.festival.aktif);
}
export function hediyeVer(d, id, k) {
  const r = kayit(d, id);
  const y = YERLESIMCILER[id];
  const e = hediyeEngeli(d, id);
  if (e) return { metin: y.kisa + ': "' + e + '" Eşyayı almadı.' };
  if (varlik(d, k) < 1) return { metin: 'Elinde ' + varlikAdi(k) + ' kalmadı.', ses: 'red' };
  varlikEkle(d, k, -1);
  const g = bugun(d);
  r.hediyeGun = g;
  r.hediyeler = [...(r.hediyeler || []).filter((x) => haftaNo(x) === haftaNo(g)), g];
  const tur = tepkiTuru(id, k);
  // Dünya Işığı festivalinin çekilişi (v5 3A): talihlinin bir sonraki sevdiği hediyesi iki kat
  const cekilis = tur === 'sever' && r.cekilis;
  if (cekilis) r.cekilis = false;
  // 4.5: aşçılık ritminden altın kalite yemek (v5 Paket 3B hobi 3): sıradaki yemek hediyesi iki kat
  const altin = tur !== 'sevmez' && yiyecekMi(k) && (d.yer.altinHediye || 0) > 0;
  if (altin) d.yer.altinHediye -= 1;
  const carpan = (tur === 'sever' && (ozelGunMu(d, id) || cekilis)) || altin ? 2 : 1;
  const sonuc = puanEkle(d, id, PUAN[tur] * carpan);
  const soz = tur === 'sever' ? y.imza.tesekkur : tur === 'sevmez' ? y.imza.kizgin : 'Teşekkürler Kaptan, işime yarar.';
  const metin = y.kisa + ': "' + soz + '" ' + (carpan > 1 ? 'Özel bir günde sevdiği hediye: iki kat sevindi. ' : '') + 'İlişki ' + (sonuc.kazanc >= 0 ? sonuc.kazanc + ' puan arttı.' : -sonuc.kazanc + ' puan azaldı.') + (sonuc.metin ? ' ' + sonuc.metin : '');
  return { metin, tur, efekt: tur === 'sever' ? 'imza_' + id + '_tesekkur' : tur === 'sevmez' ? 'imza_' + id + '_kizgin' : null };
}
export function hediyeMenu(d, id) {
  const y = YERLESIMCILER[id];
  const e = hediyeEngeli(d, id);
  const a = hediyeAdaylari(d);
  const kume = (ad, liste) => ({
    id: 'k_' + ad,
    etiket: ad + ' (' + liste.length + ' çeşit)',
    alt: (x) => ({
      baslik: ad,
      giris: liste.length ? y.kisa + ' için bir hediye seç.' : 'Bu kümede elinde bir şey yok.',
      ogeler: liste
        .filter((k) => varlik(x, k) > 0)
        .map((k) => ({ id: 'h_' + k, etiket: varlikAdi(k) + ', elinde ' + varlik(x, k), geri: true, yap: (z) => hediyeVer(z, id, k) })),
    }),
  });
  return {
    baslik: 'Hediye ver: ' + y.kisa,
    giris: (e ? y.kisa + ': "' + e + '" ' : '') + 'Günde bir, haftada iki hediye. Sevdiği şeyi kendisiyle sohbet ederek ve kademen yükseldikçe öğrenirsin.',
    ogeler: e ? [] : [kume('Yiyecek ve erzak', a.yiy), kume('Hammadde', a.ham), kume('Parça ve eşya', a.par)],
  };
}

// --- Profil kartı (Paket 8 bölüm 7) ---
export function profilMetni(d, id) {
  const y = YERLESIMCILER[id];
  const r = kayit(d, id);
  const sonraki = r.k >= 10 ? 'Bütün kademeler açık.' : 'Kademe ' + (r.k + 1) + '\'de ' + KADEME_KILIDI[r.k + 1] + '.';
  const miz = y.mizac.map((m) => MIZACLAR[m].ad).join(' ve ');
  const yakin = y.yakin.map((x) => YERLESIMCILER[x].kisa).join(', ');
  const cat = y.catisma.map((x) => YERLESIMCILER[x].kisa).join(', ');
  const ipucu = r.k >= 2 ? ' Sever: ' + y.sever.map((k) => (k === 'yiyecek' ? 'yiyecek' : varlikAdi(k))).join(', ') + '. Sevmez: ' + y.sevmez.map((k) => (k === 'yiyecek' ? 'hiçbir yiyecek' : varlikAdi(k))).join(', ') + '.' : '';
  const dogum = r.k >= 1 ? ' Doğum günü yılın ' + y.dogum + '. günü.' : '';
  return y.ad + ', ' + y.rol + '. Kademe ' + r.k + ' / 10, ' + KADEMELER[r.k] + ', ' + r.p + ' / ' + Math.min(1000, (r.k + 1) * 100) + ' puan. Mizaç: ' + miz + '. Yakın: ' + yakin + '; tartıştığı: ' + cat + '. ' + sosyalSatir(d, id) + ' ' + sonraki + ipucu + dogum;
}
export function nerede(d, id) {
  const k = kisiKonumu(d, id);
  const y = YERLESIMCILER[id];
  if (!katildiMi(d, id)) return y.kisa + ' henüz koloniye katılmadı. Koşul: ' + (y.katilimMetni || 'başlangıç kadrosu') + '.';
  if (!k) return y.kisa + ' görevdeki yerinde.';
  const yer = k.bina === 'kamp' ? 'kamp ateşinin başında' : k.bina === 'sera' ? 'Koloni Sera Binası\'nda' : k.bina === 'revir' ? 'kapsülün revirinde' : YERLESIM_BINALARI[k.bina] ? YERLESIM_BINALARI[k.bina].ad + ' içinde' : 'koloninin bir yerinde';
  return y.kisa + ' bu nöbette ' + yer + ', ' + k.eylem + '.';
}

// Konuşma menüsü (kişiye çift dokununca; öncü mürettebatta görev konuşmasının yanında)
// Nöbet başına bir selam (Paket 8 5.5: mekân değişimi selamı, puansız)
export function selamla(d, id) {
  hazirla(d);
  const r = kayit(d, id);
  const n = Z.nobetNo(d) + Z.gun(d) * 6;
  if (r.selamNobet === n) return false;
  r.selamNobet = n;
  return true;
}
export function kisiMenu(d, id, selam) {
  const y = YERLESIMCILER[id];
  hazirla(d);
  const r = kayit(d, id);
  return {
    baslik: y.ad,
    giris: (selam ? y.kisa + ': "' + y.imza.selam + '" ' : '') + y.rol + '. Kademe ' + r.k + ', ' + KADEMELER[r.k] + '. ' + sohbetDurumu(d, id) + '.',
    ogeler: [
      ...(r.sahne && KADEME_SAHNELERI[id] && KADEME_SAHNELERI[id][r.sahne] ? [{ id: 'sahne', etiket: 'Kademe ' + r.sahne + ' sahnesi: ' + KADEME_SAHNELERI[id][r.sahne].b, alt: (x) => sahneMenu(x, id) }] : []),
      ...bekleyenOlayOgesi(d, id),
      ...KISI_EKLERI.flatMap((f) => f(d, id)),
      { id: 'sohbet', etiket: 'Konuş', ipucu: 'Günlük sohbet; günde bir kez ilişki puanı verir.', alt: (x) => sohbetMenu(x, id) },
      { id: 'hediye', etiket: 'Hediye ver', alt: (x) => hediyeMenu(x, id) },
      { id: 'profil', etiket: 'Profil kartı', yap: (x) => ({ metin: profilMetni(x, id) }) },
      ...(r.izlenen.length ? [{ id: 'anilar', etiket: 'Anılar (' + r.izlenen.length + ' sahne)', alt: (x) => anilarMenu(x, id) }] : []),
    ],
  };
}

// --- Kademe sahneleri (Paket 8A-8C; 00-okuma 1.2: 2-4 paragraf) ---
export function sahneMenu(d, id) {
  const r = kayit(d, id);
  const sh = r.sahne && KADEME_SAHNELERI[id] && KADEME_SAHNELERI[id][r.sahne];
  if (!sh) return { baslik: kisaAdi(id), giris: 'Şu an anlatacağı bir şey yok.', ogeler: [] };
  return {
    baslik: 'Kademe ' + r.sahne + ': ' + sh.b,
    giris: sh.m.join(' '),
    ogeler: sh.s.map((x, i) => ({ id: 'ss_' + i, etiket: x.e, geri: true, yap: (z) => sahneSec(z, id, i) })),
  };
}
export function sahneSec(d, id, i) {
  const r = kayit(d, id);
  const k = r.sahne;
  const sh = k && KADEME_SAHNELERI[id] && KADEME_SAHNELERI[id][k];
  if (!sh || !sh.s[i]) return { metin: '' };
  const x = sh.s[i];
  r.sahne = null;
  if (!r.izlenen.includes(k)) r.izlenen.push(k);
  if (!r.secimler) r.secimler = {};
  r.secimler[k] = i;
  const ek = [];
  const sonuc = puanEkle(d, id, x.p || 0, true);
  if (sonuc.kazanc) ek.push('İlişki ' + (sonuc.kazanc > 0 ? sonuc.kazanc + ' puan arttı' : -sonuc.kazanc + ' puan azaldı') + '.');
  if (x.diger && katildiMi(d, x.diger.kim)) {
    puanEkle(d, x.diger.kim, x.diger.p, true);
    ek.push(kisaAdi(x.diger.kim) + (x.diger.p >= 0 ? ' memnun.' : ' kırgın.'));
  }
  if (x.bayrak) Object.assign(d.bayrak, x.bayrak);
  if (x.moral) {
    d.koloni.moral = Math.min(100, d.koloni.moral + x.moral);
    ek.push('Moral ' + x.moral + ' arttı.');
  }
  return { metin: x.c + ' ' + ek.join(' '), efekt: (x.p || 0) >= 20 ? 'imza_' + id + '_tesekkur' : (x.p || 0) < 0 ? 'imza_' + id + '_kizgin' : null };
}
export function anilarMenu(d, id) {
  const r = kayit(d, id);
  return {
    baslik: 'Anılar: ' + kisaAdi(id),
    giris: 'Yaşadığınız sahneler. Seçince yeniden dinlersin.',
    ogeler: [...r.izlenen].sort((a, b) => a - b).map((k) => {
      const sh = KADEME_SAHNELERI[id][k];
      const sec = r.secimler && r.secimler[k] != null ? sh.s[r.secimler[k]] : null;
      return { id: 'a_' + k, etiket: 'Kademe ' + k + ': ' + sh.b, yap: () => ({ metin: sh.m.join(' ') + (sec ? ' Sen: ' + sec.e + ' ' + sec.c : '') }) };
    }),
  };
}

// --- İkili ve üçlü olaylar (Paket 9) ---
export function uyum(d, a, b) {
  const y = hazirla(d);
  if (!y.uyum) y.uyum = {};
  const k = ciftAnahtari(a, b);
  if (y.uyum[k] == null) {
    const A = YERLESIMCILER[a];
    const B = YERLESIMCILER[b];
    y.uyum[k] = A.yakin.includes(b) || B.yakin.includes(a) ? 35 : A.catisma.includes(b) || B.catisma.includes(a) ? -35 : 0;
  }
  return y.uyum[k];
}
export function uyumEkle(d, a, b, n) {
  const v = uyum(d, a, b);
  d.yer.uyum[ciftAnahtari(a, b)] = Math.max(-100, Math.min(100, v + n));
}
export const UYUM_DURUMU = (v) => (v <= -30 ? 'kırgın' : v < 0 ? 'gergin' : v < 30 ? 'mesafeli saygı' : v < 70 ? 'dost' : 'tam sinerji');
// Tanık: belgedeki kişi kolonideyse o, yoksa aynı Sosyal Ocak'tan kolonide olan başka biri
export function tanik(d, o) {
  if (!o.tanik) return null;
  if (katildiMi(d, o.tanik)) return o.tanik;
  const oc = SOSYAL_OCAKLAR[ocagi(o.tanik)];
  return (oc ? oc.uyeler : []).find((x) => x !== o.a && x !== o.b && katildiMi(d, x)) || ['veysel', 'lyris'].find((x) => x !== o.a && x !== o.b && katildiMi(d, x)) || null;
}
function olayHazirMi(d, id) {
  const o = OLAYLAR[id];
  return katildiMi(d, o.a) && katildiMi(d, o.b) && kademe(d, o.a) >= 5 && kademe(d, o.b) >= 5;
}
// Günde en çok bir büyük olay; bekleyen olay bitmeden yenisi gelmez (kaçırma cezası yok)
export function olayDenetle(d) {
  const y = hazirla(d);
  if (!y.olaylar) y.olaylar = [];
  if (y.olay || y.olayGun === bugun(d)) return null;
  const id = OLAY_SIRASI.find((x) => !y.olaylar.includes(x) && olayHazirMi(d, x));
  if (!id) return null;
  y.olay = id;
  y.olayGun = bugun(d);
  const o = OLAYLAR[id];
  SB.haber(d, (o.tur === 'catisma' ? 'Yerleşim: bir tartışma sesi duyuluyor. ' : 'Yerleşim: bir toplanma var. ') + kisaAdi(o.a) + ' ve ' + kisaAdi(o.b) + ': “' + o.b_ + '”. Katılmak için ikisinden birine ya da Yerleşim sekmesine git; acelesi yok.');
  return id;
}
export function bekleyenOlayOgesi(d, kim) {
  const y = d.yer;
  const o = y && y.olay && OLAYLAR[y.olay];
  if (!o || (kim && o.a !== kim && o.b !== kim)) return [];
  return [{ id: 'olay', etiket: (o.tur === 'catisma' ? 'Tartışmaya katıl: ' : 'Toplanmaya katıl: ') + o.b_, alt: (x) => olayMenu(x) }];
}
export function olayMenu(d) {
  const y = hazirla(d);
  const o = y.olay && OLAYLAR[y.olay];
  if (!o) return { baslik: 'Olay', giris: 'Bekleyen bir olay yok.', ogeler: [] };
  const t = tanik(d, o);
  const tanikNotu = o.tanik && t && t !== o.tanik ? ' (' + kisaAdi(o.tanik) + ' kolonide olmadığı için ' + kisaAdi(t) + ' tanık.)' : '';
  return {
    baslik: o.b_,
    giris: o.m.join(' ') + tanikNotu,
    ogeler: o.s.map((x, i) => {
      const kilitli = x.kosul && !x.kosul(d);
      return { id: 'o_' + i, etiket: x.e + (kilitli ? ' (' + (x.kosulMetni || 'koşul eksik') + ')' : ''), geri: true, yap: (z) => (kilitli ? { metin: x.kosulMetni || 'Bu yol için koşul eksik.', ses: 'red' } : olaySec(z, i)) };
    }),
  };
}
export function olaySec(d, i) {
  const y = hazirla(d);
  const id = y.olay;
  const o = OLAYLAR[id];
  if (!o) return { metin: '' };
  const x = o.s[i];
  y.olay = null;
  y.olaylar.push(id);
  if (!y.olaySecim) y.olaySecim = {};
  y.olaySecim[id] = i;
  const t = tanik(d, o);
  const ek = [];
  for (const kim of Object.keys(x.p || {})) {
    const hedef = kim === o.tanik ? t : kim;
    if (!hedef || !katildiMi(d, hedef)) continue;
    const r = puanEkle(d, hedef, x.p[kim], true);
    if (r.kazanc) ek.push(kisaAdi(hedef) + ' ' + (r.kazanc > 0 ? '+' : '') + r.kazanc);
  }
  if (x.uyum) uyumEkle(d, o.a, o.b, x.uyum);
  if (x.bayrak) d.bayrak[x.bayrak] = true;
  // Veysel + Kaelon sinerjisi: kamaraya otomatik yıldız müzik kutusu
  if (x.bayrak === 'sin_veysel_kaelon' && !y.dekorlar.includes('muzik_kutusu')) y.dekorlar.push('muzik_kutusu');
  if (x.moral) d.koloni.moral = Math.min(100, d.koloni.moral + x.moral);
  const u = uyum(d, o.a, o.b);
  return { metin: x.c + (ek.length ? ' İlişki: ' + ek.join(', ') + '.' : '') + ' ' + kisaAdi(o.a) + ' ile ' + kisaAdi(o.b) + ' arası artık ' + UYUM_DURUMU(u) + '.', efekt: x.uyum > 0 ? 'imza_' + o.a + '_tesekkur' : null };
}
export function sosyalSatir(d, id) {
  const iyi = [];
  const kotu = [];
  for (const x of hazirla(d).katilan) {
    if (x === id) continue;
    const v = uyum(d, id, x);
    if (v >= 30) iyi.push(kisaAdi(x));
    else if (v < 0) kotu.push(kisaAdi(x));
  }
  return 'Şu an arası iyi: ' + (iyi.join(', ') || 'kimse') + '. Tartıştığı: ' + (kotu.join(', ') || 'kimse') + '.';
}


// --- Yerleşim sekmesi (Merkez Terminal ve meydan terminali) ---
export function binaMenusu(d) {
  hazirla(d);
  return {
    baslik: 'Yerleşim binaları',
    giris: 'Koloninin sosyal mekânları. Bir yerleşimci ihtiyaç duyunca kurulabilir olur.',
    ogeler: YERLESIM_SIRASI.filter((id) => !YERLESIM_BINALARI[id].baslangic).map((id) => {
      const b = YERLESIM_BINALARI[id];
      const dur = binaDurumu(d, id);
      const durum = dur === 'kurulu' ? 'kurulu' : dur === 'kilitli' ? 'henüz ihtiyaç yok; ' + b.kosulMetni : dur === 'hazir' ? 'kurulabilir: ' + malzemeMetni(b.malzeme) : 'malzeme eksik: ' + eksikler(d, b.malzeme).join(', ');
      return { id: 'b_' + id, etiket: b.ad + ', ' + durum, ipucu: b.tarif, yap: (x) => (binaDurumu(x, id) === 'kurulu' ? { metin: b.ad + '. ' + b.tarif + ' Gündüz ' + b.sesGunduz + '; gece ' + b.sesGece + '.' } : binaKur(x, id)) };
    }),
  };
}
export function yerlesimciMenusu(d) {
  hazirla(d);
  const ogeler = YERLESIMCI_SIRASI.map((id) => {
    const y = YERLESIMCILER[id];
    if (!katildiMi(d, id)) return { id: 'y_' + id, etiket: y.ad + ', henüz katılmadı', yap: () => ({ metin: y.ad + ', ' + y.rol + '. Katılma koşulu: ' + y.katilimMetni }) };
    return {
      id: 'y_' + id,
      etiket: y.ad + ', Kademe ' + kademe(d, id) + ', ' + sohbetDurumu(d, id),
      alt: (x) => ({ baslik: y.ad, giris: profilMetni(x, id), ogeler: [{ id: 'nerede', etiket: 'Şu an nerede?', yap: (z) => ({ metin: nerede(z, id) }) }] }),
    };
  });
  return { baslik: 'Yerleşimciler', giris: d.yer.katilan.length + ' yerleşimci kolonide. Konuşmak ve hediye vermek için yanlarına git; yerlerini nöbet programları belirler.', ogeler };
}
export function takvimMenusu(d) {
  hazirla(d);
  const yg = Z.yilGunu(d);
  const yakin = d.yer.katilan
    .map((id) => ({ id, kalan: (YERLESIMCILER[id].dogum - yg + Z.YIL_GUN) % Z.YIL_GUN }))
    .sort((a, b) => a.kalan - b.kalan)
    .slice(0, 3)
    .map((x) => adi(x.id) + (x.kalan === 0 ? ' bugün' : ', ' + x.kalan + ' gün sonra'));
  return {
    baslik: 'Takvim',
    giris: Z.takvimMetni(d),
    ogeler: [
      { id: 'dogum', etiket: 'Yaklaşan doğum günleri', yap: () => ({ metin: yakin.length ? yakin.join('; ') + '.' : 'Kayıtlı doğum günü yok.' }) },
      { id: 'mevsimler', etiket: 'Dört mevsim', yap: () => ({ metin: Z.MEVSIMLER.map((m, i) => m.ad + ', ' + (i * 14 + 1) + '-' + (i + 1) * 14 + '. günler: ' + m.etki).join(' ') }) },
      { id: 'nobet', etiket: 'Bugün', yap: (x) => ({ metin: Z.zamanMetni(x) }) },
      ...TAKVIM_EKLERI.flatMap((f) => f(d)),
    ],
  };
}
export function bagMetni(d) {
  hazirla(d);
  const k = d.yer.katilan;
  const ort = k.length ? k.reduce((a, id) => a + kayit(d, id).p, 0) / k.length : 0;
  return 'Ortalama yakınlık ' + Math.round(ort) + ' puan. Her kademe atlayışı koloniye iki moral katar.';
}
// 4.2: festival.js ve pazar.js kendi öğelerini buraya ekler (döngüsel içe aktarma olmasın diye)
export const PANEL_EKLERI = [];
export const KISI_EKLERI = [];
export const TAKVIM_EKLERI = [];
export function panel(d) {
  hazirla(d);
  return {
    baslik: 'Yerleşim',
    giris: 'Kolonide ' + d.yer.katilan.length + ' yerleşimci, ' + d.yer.binalar.length + ' yerleşim binası. ' + bagMetni(d),
    ogeler: [
      { id: 'binalar', etiket: 'Yerleşim binaları', alt: binaMenusu },
      { id: 'kisiler', etiket: 'Yerleşimciler ve profil kartları', alt: yerlesimciMenusu },
      { id: 'takvim', etiket: 'Takvim', alt: takvimMenusu },
      ...bekleyenOlayOgesi(d, null),
      ...PANEL_EKLERI.flatMap((f) => f(d)),
    ],
  };
}

// --- Kaptanın Kamarası (Paket 1 bölüm 4) ---
export function dekorMenusu(d) {
  hazirla(d);
  const acik = !!d.bayrak.yk_veysel_6;
  return {
    baslik: 'Dekor rafı',
    giris: d.yer.dekorlar.length ? 'Rafta: ' + d.yer.dekorlar.map((k) => DEKORLAR[k].ad).join(', ') + '.' : 'Raf boş.',
    ogeler: acik || Object.keys(DEKORLAR).some((k) => ZN.miktar(d, k) > 0)
      ? Object.keys(DEKORLAR).map((k) => {
          const x = DEKORLAR[k];
          const var_ = d.yer.dekorlar.includes(k);
          return { id: 'd_' + k, etiket: x.ad + (var_ ? ', rafta' : ZN.miktar(d, k) > 0 ? ', elinde hazır' : acik ? ', ' + malzemeMetni(x.bedel) : ', atölyede yapılır'), ipucu: x.tarif, yap: (z) => dekorKoy(z, k) };
        })
      : [{ id: 'kapali', etiket: 'Dekor dükkânı kapalı', yap: () => ({ metin: 'Usta Veysel ile Kademe 6\'ya ulaşınca sesli dekor dükkânını açar.' }) }],
  };
}
export function dekorKoy(d, k) {
  const x = DEKORLAR[k];
  if (d.yer.dekorlar.includes(k)) return { metin: x.ad + ' zaten rafta. ' + x.tarif };
  // 4.4: atölyede yapılmış dekor (Paket 10 3.5) elde varsa onu koy
  if (ZN.miktar(d, k) > 0) {
    ZN.ekle(d, k, -1);
    d.yer.dekorlar.push(k);
    return { metin: x.ad + ' rafa yerleştirildi. ' + x.tarif, ses: 'kur' };
  }
  if (!d.bayrak.yk_veysel_6) return { metin: x.ad + ' atölyede yapılır; Veysel\'in dekor dükkânı altıncı kademede açılır.', ses: 'red' };
  const e = eksikler(d, x.bedel);
  if (e.length) return { metin: 'Usta Veysel: "Bunun için ' + e.join(', ') + ' daha lazım evlat."', ses: 'red' };
  for (const m of Object.keys(x.bedel)) ZN.ekle(d, m, -x.bedel[m]);
  d.yer.dekorlar.push(k);
  return { metin: 'Usta Veysel ' + x.ad + ' rafa yerleştirdi. ' + x.tarif, ses: 'kur' };
}
// Uykudan uyanınca: moral (dekor başına ek; Veysel K10 iki kat), mürettebatın stresi sıfırlanır
export function uyandin(d) {
  const ek = 3 + 2 * d.yer.dekorlar.length + (d.bayrak.kamaraTuy ? 2 : 0); // 4.5: kaz tüyü yastık
  const moral = ek * (d.bayrak.yk_veysel_10 ? 2 : 1);
  d.koloni.moral = Math.min(100, d.koloni.moral + moral);
  for (const u of d.murettebat || []) u.stres = 0;
  if (d.saha) d.saha.yorgunluk = 0;
  return 'Gümüş Şafak. Dinlenmiş uyandın; mürettebatın stresi atıldı, koloninin morali ' + moral + ' arttı.';
}
export function kamaraEylemleri(d, id) {
  if (id === 'kamara_yatak') return [{ id: 'uyu', etiket: 'Dinlen ve yeni güne başla', ipucu: 'Bir sonraki Gümüş Şafak\'a kadar uyursun.' }, { id: 'takvim', etiket: 'Duvar takvimine bak' }];
  if (id === 'kamara_raf') return [{ id: 'dekor', etiket: 'Dekorlar' }];
  return [];
}

// --- Noktalar: kamp ateşi, meydan terminali, kamara, binaların köşeleri ---
export function noktaMi(id) {
  return id === 'kamp_atesi' || id === 'meydan_terminali' || id === 'kamara_yatak' || id === 'kamara_raf' || (id && id.indexOf('yb_') === 0);
}
// 4.4 (Paket 12 bölüm 5): bina köşesinde standart sıra — tezgâhlar, buradakiler, bina durumu; sonra binaya özgü
// eylemler. Tezgâh menüsü imalat/tezgah.js'ten bu kancayla gelir (döngüsel içe aktarma olmasın).
export const TEZGAH = { menu: null, durum: null, yemek: null, kullan: null };
const BINA_STANDART = [{ id: 'tezgah', etiket: 'Üretim ve işlev tezgâhları' }, { id: 'kimler', etiket: 'Şu an binadaki yerleşimciler' }, { id: 'durum', etiket: 'Bina durumu ve yükseltme' }];
export function noktaEylemleri(d, id) {
  const l = noktaEylemleriTemel(d, id);
  if (!TEZGAH.menu || !(id === 'kamp_atesi' || (id && id.indexOf('yb_') === 0))) return l;
  const ozel = l.filter((e) => e.id !== 'kimler' && e.id !== 'incele');
  return [...BINA_STANDART, ...ozel, { id: 'incele', etiket: 'İncele' }];
}
function noktaEylemleriTemel(d, id) {
  if (id === 'meydan_terminali') return [{ id: 'yerlesim', etiket: 'Yerleşim' }, { id: 'incele', etiket: 'İncele' }];
  if (id === 'kamara_yatak' || id === 'kamara_raf') return [...kamaraEylemleri(d, id), { id: 'incele', etiket: 'İncele' }];
  if (id === 'yb_hamam') return [{ id: 'yikan', etiket: 'Sıcak suya gir' }, { id: 'incele', etiket: 'İncele' }];
  if (id === 'yb_taverna') return [{ id: 'otur', etiket: 'Bir masaya otur' }, { id: 'incele', etiket: 'İncele' }];
  if (id === 'yb_ashane') return [{ id: 'yemek', etiket: 'Sıcak bir yemek ye', ipucu: 'Bir yiyecek; yorgunluğu giderir.' }, { id: 'kimler', etiket: 'Burada kimler var?' }, { id: 'incele', etiket: 'İncele' }];
  if (id === 'kamp_atesi') return [{ id: 'isin', etiket: 'Ateşin başında ısın' }, { id: 'incele', etiket: 'İncele' }];
  return [{ id: 'kimler', etiket: 'Burada kimler var?' }, { id: 'incele', etiket: 'İncele' }];
}
function buradakiler(d) {
  return (d.yer ? d.yer.katilan : []).filter((id) => {
    const k = kisiKonumu(d, id);
    return k && k.mekan === d.mekan;
  });
}
export function eylemUygula(d, id, eylemId) {
  hazirla(d);
  if (eylemId === 'yerlesim') return { agac: (x) => panel(x) };
  const binaId = id === 'kamp_atesi' ? 'kamp' : (id || '').replace('yb_', '');
  if (eylemId === 'tezgah' && TEZGAH.menu) return { agac: (x) => TEZGAH.menu(x, binaId) };
  if (eylemId === 'durum' && TEZGAH.durum) return TEZGAH.durum(d, binaId);
  if (eylemId === 'uyu') return { uyku: true };
  if (eylemId === 'takvim') return { agac: (x) => takvimMenusu(x) };
  if (eylemId === 'dekor') return { agac: (x) => dekorMenusu(x) };
  if (eylemId === 'kimler') {
    const b = buradakiler(d);
    return { metin: b.length ? 'Burada: ' + b.map((x) => kisaAdi(x) + ', ' + kisiKonumu(d, x).eylem).join('; ') + '.' : 'Bu nöbette burada kimse yok.' };
  }
  if (eylemId === 'yikan') {
    const g = bugun(d);
    if (d.yer.hamamGun === g) return { metin: 'Bugün zaten yıkandın; su seni bekler, yarın yine gel.' };
    d.yer.hamamGun = g;
    // 4.4: hamam aroma yağı tam arınma bonusu (Paket 10 3.4)
    const aroma = ZN.miktar(d, 'aroma_yagi') > 0;
    if (aroma) ZN.ekle(d, 'aroma_yagi', -1);
    const sifir = !!(d.bayrak.yk_siravel_10 || d.bayrak.sin_lyris_siravel || aroma);
    for (const u of d.murettebat || []) u.stres = sifir ? 0 : Math.max(0, (u.stres || 0) - 20);
    if (d.saha) d.saha.yorgunluk = 0;
    d.zehir = 0; // v5 Paket 16: hamam zehri de tek ziyarette sıfırlar
    d.koloni.moral = Math.min(100, d.koloni.moral + 2);
    return { metin: 'Sıcak, mineralli su omuzlarındaki yükü alıyor. ' + (aroma ? 'Aroma yağının kokusu buharla yayılıyor; mürettebatın stresi tamamen silindi.' : sifir ? 'Sira-Vel\'in şifasıyla mürettebatın stresi tamamen silindi.' : 'Mürettebatın stresi yirmi azaldı.') + ' Moral iki arttı.', ses: 'tislama' };
  }
  if (eylemId === 'otur') {
    const g = bugun(d);
    if (d.yer.tavernaGun === g) return { metin: 'Bu akşam masandasın zaten; müzik sürüyor.' };
    d.yer.tavernaGun = g;
    const m = 3 * (d.bayrak.yk_julian_10 ? 2 : 1);
    d.koloni.moral = Math.min(100, d.koloni.moral + m);
    const b = buradakiler(d);
    return { metin: 'Bir masaya oturuyorsun. ' + (b.length ? b.map(kisaAdi).join(', ') + ' da burada. ' : '') + 'Müzik, kahkaha, zar sesi. Koloninin morali ' + m + ' arttı.' };
  }
  if (eylemId === 'yemek') {
    const pis = TEZGAH.yemek && TEZGAH.yemek(d);
    if (pis) {
      const r = TEZGAH.kullan(d, pis);
      if (d.saha) d.saha.yorgunluk = 0;
      return { metin: 'Sorya önüne sıcak bir tabak koydu. ' + r.metin + ' Sıcak yemekle yorgunluğun tamamen geçti.' };
    }
    const l = [];
    const t = d.tarim;
    if (t) for (const k of Object.keys(t.erzak || {})) if (t.erzak[k] > 0) l.push('erzak_' + k);
    if (t) for (const k of Object.keys(t.urun || {})) if (t.urun[k] > 0) l.push('urun_' + k);
    if (!l.length) return { metin: 'Ambarda yenecek bir şey yok.', ses: 'red' };
    varlikEkle(d, l[0], -1);
    if (d.saha) d.saha.yorgunluk = 0;
    d.koloni.moral = Math.min(100, d.koloni.moral + 1);
    return { metin: 'Sorya önüne sıcak bir tabak koydu: ' + varlikAdi(l[0]) + '. Yorgunluğun geçti.' };
  }
  if (eylemId === 'isin') {
    const b = buradakiler(d);
    return { metin: 'Ateşin sıcaklığı yüzüne vuruyor. ' + (b.length ? 'Etrafında ' + b.map(kisaAdi).join(', ') + '.' : 'Bu nöbette ateşin başında kimse yok.') };
  }
  const n = id === 'kamp_atesi' ? YERLESIM_BINALARI.kamp : YERLESIM_BINALARI[(id || '').replace('yb_', '')];
  return { metin: n ? n.tarif + ' Gündüz ' + n.sesGunduz + '; gece ' + n.sesGece + '.' : '' };
}

// Terminal ve meydan terminalindeki "Yerleşim" eylemi
export function ekEylemler(d, id) {
  if (id === 'terminal') return [{ id: 'yerlesim', etiket: 'Yerleşim', ipucu: 'Yerleşim binaları, yerleşimciler ve takvim.' }];
  return [];
}
export function ekEylemMi(eylemId) {
  return eylemId === 'yerlesim';
}

// Eski kayıtlar: öncü mürettebat belgedeki adlarını alır (Paket 1)
export const ONCU_ADLARI = [
  { ad: 'Kaelon Vex-Tar', cinsiyet: 'e' },
  { ad: 'Zarek Sol-Zhaor', cinsiyet: 'e' },
  { ad: 'Lyris Mar-Axira', cinsiyet: 'k' },
];
export function kaydiTamamla(d) {
  if (!d || !d.murettebat) return d;
  if (!d.yer) {
    ONCU_ADLARI.forEach((x, i) => {
      if (d.murettebat[i]) {
        d.murettebat[i].ad = x.ad;
        d.murettebat[i].cinsiyet = x.cinsiyet;
      }
    });
  }
  if (d.koloni && d.bayrak) hazirla(d);
  return d;
}
