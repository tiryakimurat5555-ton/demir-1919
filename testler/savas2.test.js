// Evrensel savaş motoru (v4 paketi Faz 1): tehdit ölçeği, çoklu düşman, davranış modülleri, geliş biçimleri,
// aşamalı bosslar ve kara savaşı
import { describe, expect, test } from 'bun:test';
import { yeniOyun } from '../src/oyun/durum';
import * as G from '../src/oyun/gemi/gemi';
import * as SV from '../src/oyun/uzay/savas';
import { zamanIlerle } from '../src/oyun/yuzey/gorevler';
import * as KM from '../src/oyun/komuta';
import { NOBET_SN } from '../src/oyun/zaman';

function uzaydaOyun(tohum = 21, sinif = 1) {
  const d = yeniOyun(tohum);
  G.gemiOlustur(d, sinif);
  d.gemi.yer = 'uzay';
  d.uzay = { x: 0, y: 0, yon: 0, hiz: 0, yaklasilan: {} };
  return d;
}
// Hedefe kilitlen, ateş et; uyarıda doğru yana kaç
function oyna(d, adim = 4000) {
  for (let i = 0; i < adim && d.savas; i++) {
    const s = d.savas;
    if (s.uyari) {
      if (!s.uyari.savunma) SV.savasGirdi(d, { tur: 'kaydir', yon: s.uyari.yon === 'sag' ? 'sol' : 'sag', parmak: 1 });
    } else if (!SV.kilitliMi(d)) SV.savasGirdi(d, { tur: 'kaydir', yon: s.dusman.aci > 0 ? 'sol' : 'sag', parmak: 1 });
    else SV.savasGirdi(d, { tur: 'dokun', parmak: 1 });
    if (d.savas) SV.savasIlerle(d, 0.1);
  }
}

describe('Evrensel savaş motoru', () => {
  test('tehdit ölçeği: düşmanlar oyuncunun ilerleyişiyle güçlenir', () => {
    const d = uzaydaOyun(22);
    expect(SV.oyuncuKademesi(d)).toBe(1);
    SV.savasBaslat(d, 'korsan_avci');
    const g1 = d.savas.dusman.max;
    expect(d.savas.dusman.tier).toBe(1);
    d.savas = null;
    d.tamamlananOp = Array.from({ length: 10 }, (_, i) => 'x' + i);
    expect(SV.oyuncuKademesi(d)).toBe(3);
    SV.savasBaslat(d, 'korsan_avci');
    expect(d.savas.dusman.tier).toBe(2); // en çok bir kademe geride
    expect(d.savas.dusman.max).toBe(Math.round(40 * SV.TEHDIT[2].can));
    expect(d.savas.dusman.max).toBeGreaterThan(g1);
    d.savas = null;
    SV.savasBaslat(d, 'lord_sharon');
    expect(d.savas.dusman.tier).toBe(5);
  });

  test('çoklu düşman: kıskaçta hedef sesin yönüne göre değişir; ikisi de inince zafer', () => {
    const d = uzaydaOyun(23);
    const o = SV.savasBaslat(d, { dusmanlar: ['korsan_avci', 'korsan_korvet'], gelis: 'kiskac' });
    expect(o[0].soz).toContain('Kıskaç');
    expect(d.savas.dusmanlar.length).toBe(2);
    const sol = d.savas.dusmanlar.find((x) => x.aci > 0);
    const sag = d.savas.dusmanlar.find((x) => x.aci < 0);
    expect(sol && sag).toBeTruthy();
    // Sola dön: soldaki hedef olur
    let soz = '';
    for (let i = 0; i < 12 && Math.abs(sol.aci) > 0.1; i++) for (const x of SV.savasGirdi(d, { tur: 'kaydir', yon: 'sol', parmak: 1 })) soz += x.soz || '';
    expect(d.savas.dusman.no).toBe(sol.no);
    const ses = SV.savasSes(d);
    expect(ses.dusmanlar.length).toBe(2);
    expect(ses.dusmanlar.filter((x) => x.aktif).length).toBe(1);
    d.gemi.govde = d.gemi.maxGovde = 5000;
    oyna(d, 20000);
    expect(['zafer', 'ateskes', 'kacti']).toContain(d.savasSon.sonuc);
  });

  test('frekans kalkanı: yanlış tonda atış zayıf; iki turda bir ton değişir', () => {
    const d = uzaydaOyun(24);
    d.tamamlananOp = Array.from({ length: 10 }, (_, i) => 'x' + i);
    SV.savasBaslat(d, 'yabanci_firkateyn');
    const h = d.savas.dusman;
    h.aci = 0;
    const g0 = h.govde;
    SV.savasGirdi(d, { tur: 'dokun', parmak: 1 });
    const yanlis = g0 - h.govde;
    // Tonu eşle, sonra vur
    SV.savasGirdi(d, { tur: 'dondur', f: (h.kalkanFrek - d.savas.silahFrek) / 7 });
    expect(h.delik).toBe(true);
    const g1 = h.govde;
    h.aci = 0;
    SV.savasGirdi(d, { tur: 'dokun', parmak: 1 });
    expect(g1 - h.govde).toBeGreaterThan(yanlis * 2);
    // İki tur sonra ton değişir ve kalkan yeniden kapanır
    const ton = h.kalkanFrek;
    d.gemi.govde = d.gemi.maxGovde = 9999;
    for (let i = 0; i < 400 && d.savas && d.savas.raunt < 2; i++) SV.savasIlerle(d, 0.1);
    expect(h.kalkanFrek).not.toBe(ton);
    expect(h.delik).toBe(false);
  });

  test('çağıran: üç turda bir yardımcı çağırır; karada sonik kovucu sürüyü dağıtır', () => {
    const d = uzaydaOyun(25);
    d.tamamlananOp = Array.from({ length: 10 }, (_, i) => 'x' + i);
    SV.savasBaslat(d, 'dron_tasiyici');
    d.gemi.govde = d.gemi.maxGovde = 9999;
    for (let i = 0; i < 2000 && d.savas && d.savas.raunt < 3; i++) SV.savasIlerle(d, 0.1);
    expect(d.savas.dusmanlar.some((x) => x.kucuk && x.govde > 0)).toBe(true);
    // Kara
    const k = yeniOyun(26);
    k.koloni.parcalar.sonik_kovucu = 1;
    SV.savasBaslat(k, { dusmanlar: ['biyom_yaratigi'], ortam: 'kara' });
    expect(k.savas.ortam).toBe('kara');
    k.savas.can = k.savas.maxCan = 9999;
    for (let i = 0; i < 2000 && k.savas && k.savas.raunt < 3; i++) SV.savasIlerle(k, 0.1);
    expect(k.savas.dusmanlar.some((x) => x.kucuk && x.govde > 0)).toBe(true);
    const l = SV.yetenekler(k);
    k.savas.uyari = null;
    k.savas.yetenekNo = l.findIndex((y) => y.sarf === 'sonik_kovucu');
    expect(k.savas.yetenekNo).toBeGreaterThan(0);
    SV.savasGirdi(k, { tur: 'cift', parmak: 1 });
    expect(k.savas.dusmanlar.some((x) => x.kucuk && x.govde > 0)).toBe(false);
    expect(k.koloni.parcalar.sonik_kovucu).toBe(0);
  });

  test('kaçış ve teslim: korvet yüzde otuzda kaçar; çekici kiriş kilitler; teslim kabul edilir', () => {
    const d = uzaydaOyun(27);
    SV.savasBaslat(d, 'korsan_korvet');
    const h = d.savas.dusman;
    h.govde = Math.round(h.max * 0.32);
    h.aci = 0;
    const o = SV.savasGirdi(d, { tur: 'dokun', parmak: 1 });
    expect(h.kaciyor).toBeGreaterThan(0);
    expect(o.some((x) => (x.soz || '').includes('kaçmaya'))).toBe(true);
    expect(o.some((x) => (x.soz || '').includes('teslim'))).toBe(true);
    d.gemi.govde = d.gemi.maxGovde = 9999;
    for (let i = 0; i < 3000 && d.savas; i++) SV.savasIlerle(d, 0.1);
    expect(d.savasSon.sonuc).toBe('kacti');
    // Çekici kirişle kaçamaz; teslim kabul edilir
    const d2 = uzaydaOyun(28);
    d2.gemi.moduller.cekici_isin = 1;
    SV.savasBaslat(d2, 'korsan_korvet');
    const h2 = d2.savas.dusman;
    h2.govde = Math.round(h2.max * 0.32);
    h2.aci = 0;
    SV.savasGirdi(d2, { tur: 'dokun', parmak: 1 });
    expect(h2.kilitli).toBe(true);
    SV.savasGirdi(d2, { tur: 'kaydir', yon: 'yukari', parmak: 2 });
    expect(d2.savasSon.sonuc).toBe('ateskes');
  });

  test('aşamalı bosslar: Kahergonat zırhlısı ikinci aşamada kalkanını patlatıp dron çağırır', () => {
    const d = uzaydaOyun(29, 3);
    SV.savasBaslat(d, 'kahergonat_zirhlisi');
    const h = d.savas.dusman;
    h.govde = Math.round(h.max * 0.52);
    h.aci = 0;
    const o = SV.savasGirdi(d, { tur: 'kaydir', yon: 'yukari', parmak: 1 });
    expect(h.faz).toBe(1);
    expect(h.kalkan).toBe(0);
    expect(o.some((x) => x.faz === 2)).toBe(true);
    expect(d.savas.dusmanlar.filter((x) => x.tur === 'golge_dronu').length).toBe(2);
    expect(h.pencere).toBe(1.5);
  });

  test('Lord Sharon üçüncü aşamada ölümsüz: yalnız Tyzrakhel ışığı işler', () => {
    const d = yeniOyun(30);
    SV.savasBaslat(d, 'lord_sharon');
    expect(d.savas.ortam).toBe('kara');
    const h = d.savas.dusman;
    h.govde = Math.round(h.max * 0.3);
    h.aci = 0;
    d.savas.can = d.savas.maxCan = 99999;
    SV.savasGirdi(d, { tur: 'dokun', parmak: 1 });
    expect(h.olumsuz).toBe(true);
    expect(h.faz).toBe(2);
    for (const x of d.savas.dusmanlar) if (x.kucuk) x.govde = 0; // çağrılan muhafızlar düştü
    const g0 = h.govde;
    h.aci = 0;
    d.savas.sizma = false;
    SV.savasGirdi(d, { tur: 'dokun', parmak: 1 });
    const zayif = g0 - h.govde;
    d.esya = { ...(d.esya || {}), tyzrakhel_parcasi: 1 };
    const g1 = h.govde;
    h.aci = 0;
    SV.savasGirdi(d, { tur: 'dokun', parmak: 1 });
    expect(g1 - h.govde).toBeGreaterThan(zayif * 10);
  });

  test('kara savaşı: gemisiz başlar, asit zırhı eritir, yenilgide ekip kapsüle tahliye edilir', () => {
    const d = yeniOyun(31);
    d.mekan = 'sirtlar';
    d.oyuncu = { x: 540, y: -10, yon: 0 };
    const o = SV.savasBaslat(d, 'sulfur_akrebi');
    expect(o[0].soz).toContain('Çatışma');
    expect(d.savas.maxCan).toBeGreaterThan(0);
    for (let i = 0; i < 40000 && d.savas; i++) SV.savasIlerle(d, 0.1);
    expect(d.savasSon.sonuc).toBe('yenilgi');
    expect(d.savasSon.ortam).toBe('kara');
    expect(d.mekan).toBe('kapsul');
  });

  test('karşılaşma üretimi: kademe arttıkça yabancı firkateyn, karada akrep sürüsü', () => {
    const d = uzaydaOyun(32);
    const k = SV.karsilasmaUret(d, { ortam: 'kara', bolge: 'koloni', no: 1 });
    expect(k.dusmanlar[0]).toBe('sulfur_akrebi');
    d.tamamlananOp = Array.from({ length: 10 }, (_, i) => 'x' + i);
    d.koloni.binalar.push('sinyal_kulesi');
    let firkateyn = false;
    const gelisler = new Set();
    for (let n = 0; n < 200; n++) {
      d.savasNo = n;
      const sp = SV.karsilasmaUret(d, { ortam: 'uzay', bolge: 'derin', no: n });
      if (sp.dusmanlar.includes('yabanci_firkateyn')) firkateyn = true;
      gelisler.add(sp.gelis);
      if (sp.gelis !== 'tek') expect(sp.ikincil).toBeTruthy();
      // Her üretilen karşılaşma başlatılabilir
      SV.savasBaslat(d, sp);
      d.savas = null;
    }
    expect(firkateyn).toBe(true);
    expect(gelisler.size).toBeGreaterThanOrEqual(5);
  });

  test('koloni baskını: komşu halka baskısı; panelden bizzat savunulan baskın kara çatışması başlatır; karakol korur', () => {
    const d = yeniOyun(33);
    d.sahne = null;
    d.mekan = 'vadi';
    // Güney güvenli, öteki sektörler hâlâ düşman elinde: baskın komşudan gelir
    KM.komuta(d).sektor.guney = { durum: 'guvenli', karakol: null };
    let oldu = false;
    for (let i = 0; i < 40 && !oldu; i++) {
      (d.zaman = d.zaman || { sn: 0 }).sn += NOBET_SN * 13;
      KM.komutaIlerle(d);
      oldu = d.komuta.baskinlar.length > 0;
    }
    expect(oldu).toBe(true);
    KM.bizzatSavun(d, 'guney');
    expect(d.savasBekle.ortam).toBe('kara');
    zamanIlerle(d, 0.1);
    expect(d.savas && d.savas.ortam).toBe('kara');
    // İkmal karakolu bağlı bölge baskını kendiliğinden püskürtür
    const d2 = yeniOyun(34);
    d2.sahne = null;
    KM.komuta(d2).sektor.guney = { durum: 'guvenli', karakol: 'ikmal' };
    for (let i = 0; i < 40; i++) {
      (d2.zaman = d2.zaman || { sn: 0 }).sn += NOBET_SN * 13;
      KM.komutaIlerle(d2);
    }
    expect(d2.komuta.baskinlar.length).toBe(0);
    expect(d2.savasBekle).toBeFalsy();
  });

  test('kayıt uyumu: savaş JSON\'dan dönünce hedef yeniden bağlanır; eski tek düşmanlı kayıt çevrilir', () => {
    const d = uzaydaOyun(35);
    SV.savasBaslat(d, { dusmanlar: ['korsan_avci', 'korsan_korvet'], gelis: 'kiskac' });
    const d2 = JSON.parse(JSON.stringify(d));
    d2.savas.dusman.aci = 0; // kopyaya dokunulsa bile
    const h = d2.savas.dusmanlar[d2.savas.hedef];
    h.aci = 0;
    const g0 = h.govde;
    SV.savasGirdi(d2, { tur: 'dokun', parmak: 1 });
    expect(d2.savas.dusmanlar[d2.savas.hedef].govde).toBeLessThan(g0);
    // 1.x biçiminde kayıt
    const e = uzaydaOyun(36);
    e.savas = { tur: 'korsan_avci', dusman: { ad: 'korsan avcı gemisi', govde: 40, max: 40, kalkan: 0.3, kalkanFrek: 50, aci: 0, mesafe: 40 }, silahFrek: 15, delik: false, evre: 'oyuncu', t: 0, sonraki: 4, uyari: null, sistem: { itici: 0, kalkan: 0, reaktor: 0 }, isi: 0, raunt: 0, tohum: 5, sayac: 0, bekleme: {}, yetenekNo: 0 };
    expect(SV.durumMetni(e)).toContain('korsan');
    SV.savasGirdi(e, { tur: 'dokun', parmak: 1 });
    expect(e.savas.dusmanlar[0].govde).toBeLessThan(40);
    for (let i = 0; i < 200; i++) SV.savasIlerle(e, 0.1);
  });

  test('sahte uyarı: gölge korsanında ses yanlış yandan gelebilir; Sinha sonarı gerçeği söyler', () => {
    const d = uzaydaOyun(37, 3);
    d.bayrak.tonoflenyaGoruldu = true;
    let sahte = 0;
    for (let n = 0; n < 30; n++) {
      SV.savasBaslat(d, 'golge_gemisi');
      d.gemi.govde = d.gemi.maxGovde = 99999;
      for (let i = 0; i < 300 && d.savas && !d.savas.uyari; i++) SV.savasIlerle(d, 0.1);
      if (d.savas && d.savas.uyari && d.savas.uyari.sesYon !== d.savas.uyari.yon) sahte++;
      d.savas = null;
    }
    expect(sahte).toBeGreaterThan(0);
    d.esya = { sinha_sonari: 1 };
    for (let n = 0; n < 20; n++) {
      SV.savasBaslat(d, 'golge_gemisi');
      for (let i = 0; i < 300 && d.savas && !d.savas.uyari; i++) SV.savasIlerle(d, 0.1);
      if (d.savas && d.savas.uyari) expect(d.savas.uyari.sesYon).toBe(d.savas.uyari.yon);
      d.savas = null;
    }
  });
});
