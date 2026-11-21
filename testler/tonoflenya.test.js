// Tonoflenya ve Malken medeniyeti (2.1): YGK frekansı, hiper-sıçrama, harita, asansör, izinler, dönüş
import { describe, expect, test } from 'bun:test';
import { yeniOyun } from '../src/oyun/durum';
import { MEKANLAR, KAPILAR, NOKTALAR } from '../src/oyun/yuzey/harita';
import { gec, yerlerListesi } from '../src/oyun/yuzey/dunya';
import { eylemUygula, noktaEylemleri, kenetlen, ayarBaslat, ayarIlerle, seferKosullari } from '../src/oyun/yuzey/gorevler';
import { gemiOlustur } from '../src/oyun/gemi/gemi';
import { yildizCarpani, NOBET_SN } from '../src/oyun/zaman';

function hazir() {
  const d = yeniOyun(5);
  d.sahne = null;
  Object.assign(d.bayrak, { kule: true, sondaj: true });
  gemiOlustur(d, 3);
  d.tamamlananOp = ['kadim_mezar', 'g13', 'g01', 'g02', 'g03', 'g04', 'g05', 'g06', 'g07', 'g08'];
  return d;
}
function kilitle(d) {
  d.ayar.frekans = d.ayar.hedef;
  for (let i = 0; i < 60 && d.ayar; i++) ayarIlerle(d, 0.1);
}
function git(d, kapi) {
  const k = KAPILAR[kapi];
  const i = k.uclar.findIndex((x) => x.mekan === d.mekan);
  d.oyuncu = { x: k.uclar[i].x, y: k.uclar[i].y, yon: 0 };
  return gec(d, kapi, i);
}

describe('Tonoflenya', () => {
  test('harita tutarlı: bütün geçit uçları ve noktalar kendi mekânlarının içinde', () => {
    for (const id of Object.keys(KAPILAR)) for (const u of KAPILAR[id].uclar) {
      const a = MEKANLAR[u.mekan].alan;
      expect(u.x >= a.bati && u.x <= a.dogu && u.y >= a.guney && u.y <= a.kuzey).toBe(true);
    }
    for (const id of Object.keys(NOKTALAR)) {
      const n = NOKTALAR[id];
      if (!MEKANLAR[n.mekan].tonoflenya) continue;
      const a = MEKANLAR[n.mekan].alan;
      expect(n.x >= a.bati && n.x <= a.dogu && n.y >= a.guney && n.y <= a.kuzey).toBe(true);
    }
  });

  test('YGK frekansı koşulları, frekans ayarı ve fener', () => {
    const d = yeniOyun(5);
    d.bayrak.kule = true;
    expect(seferKosullari(d).length).toBe(3);
    const h = hazir();
    expect(seferKosullari(h)).toEqual([]);
    expect(noktaEylemleri(h, 'tepe').some((e) => e.id === 'y_ygk')).toBe(true);
    const r = eylemUygula(h, 'tepe', 'y_ygk');
    expect(r.ayar).toBe(true);
    ayarBaslat(h, r.amac);
    kilitle(h);
    expect(h.bayrak.ygkFrekansi).toBe(true);
    expect(h.sahne).toBe('ygk_frekansi');
  });

  test('hiper-sıçrama: fenere kenetlenince YGK kat 5, sekiz saat geçer; dönüş', () => {
    const d = hazir();
    d.bayrak.ygkFrekansi = true;
    d.harita.poiler.push('ygk_feneri');
    d.gemi.yer = 'uzay';
    d.uzay = { x: 0, y: -1440, yon: 0, hiz: 0, yaklasilan: {}, kilitli: null };
    const once = d.zaman ? d.zaman.sn : 0;
    const r = kenetlen(d);
    expect(r.tonoflenya).toBe(true);
    expect(d.mekan).toBe('ygk_5');
    expect(d.sahne).toBe('tonoflenya_varis');
    expect(d.zaman.sn - once).toBeGreaterThanOrEqual(8 * 3600);
    expect(d.kodeks.some((k) => k.id === 'hekzat')).toBe(true);
    const e = eylemUygula(d, 'ygk_iskelesi', 'donus');
    expect(d.mekan).toBe('plato');
    expect(d.sahne).toBe('aethelis_donus');
    expect(d.gemi.liman).toBe(null);
  });

  test('asansör, kabul, arşiv izni, kayık; geçitler kilitli ve açık', () => {
    const d = hazir();
    d.mekan = 'ygk_5';
    const a = eylemUygula(d, 'asansor_ygk_5', 'kat_ygk_1');
    expect(a.kapat).toBe(true);
    expect(d.mekan).toBe('ygk_1');
    expect(eylemUygula(d, 'asansor_ygk_1', 'kat_ygk_m5').ses).toBe('red');
    eylemUygula(d, 'kabul_masasi', 'konus');
    expect(d.bayrak.ygkKayit).toBe(true);
    // Kara Göl izni arşivin ikinci küresinde
    eylemUygula(d, 'arsiv_kuresi', 'dinle');
    eylemUygula(d, 'arsiv_kuresi', 'dinle');
    expect(d.bayrak.karaGolIzni).toBe(true);
    // Akademiden şehre, Zhaor'dan Kara Göl'e
    expect(git(d, 'ygk_kuzeybati').kilitli).toBeFalsy();
    expect(d.mekan).toBe('halka_zhaor');
    expect(yerlerListesi(d).some((y) => y.id === 'bati_sur')).toBe(true);
    git(d, 'bati_sur');
    expect(d.mekan).toBe('kara_gol');
    git(d, 'bati_sur');
    // Halkalar boyunca saraya
    for (const k of ['zhaor_varek', 'varek_axira', 'axira_sinha', 'sinha_uma', 'uma_elyndra', 'elyndra_saray', 'cember_saray']) git(d, k);
    expect(d.mekan).toBe('tenohris');
    // Kayık: iskele görevlisi
    d.mekan = 'flee_plee';
    expect(git(d, 'fenrir_iskelesi').kilitli).toBe(true);
    eylemUygula(d, 'kayik_gorevlisi', 'konus');
    expect(d.bayrak.aetherKayigi).toBe(true);
    git(d, 'fenrir_iskelesi');
    expect(d.mekan).toBe('fenrir');
    git(d, 'arin_rotasi');
    expect(d.mekan).toBe('arin');
  });

  test('Zirve İğnesi Malazar\'ı açar; aether toplanır, mühür gemiyi güçlendirir', () => {
    const d = hazir();
    d.mekan = 'ygk_6';
    const r = eylemUygula(d, 'zirve_ignesi', 'hizala');
    ayarBaslat(d, r.amac);
    kilitle(d);
    expect(d.bayrak.malazarIzni).toBe(true);
    d.koloni.kaynaklar.aether = 2;
    const g = d.gemi.maxGovde;
    eylemUygula(d, 'magitech_tezgahi', 'muhur');
    expect(d.gemi.maxGovde).toBe(g + 40);
  });

  test('hâkim yıldız çarpanları', () => {
    const d = yeniOyun(1);
    d.zaman = { sn: 0 };
    expect(yildizCarpani(d, 'fener')).toBe(1.1); // Zhaor
    d.zaman.sn = NOBET_SN; // Varek
    expect(yildizCarpani(d, 'uretim')).toBe(1.15);
    d.zaman.sn = NOBET_SN * 5; // Uma
    expect(yildizCarpani(d, 'nufus')).toBe(1.2);
  });
});

import { KRONIKLER, kronikListesi, caglarListesi } from '../src/oyun/tonoflenya/kronik';
describe('Kadim tarihçe', () => {
  test('on bir bölüm kendi yerlerinde, sırayla açılır; çağlar dolar', () => {
    const d = hazir();
    // Önkoşullar
    Object.assign(d.bayrak, { malazarIzni: true, arinDersi: true });
    for (let i = 1; i <= 11; i++) {
      const k = KRONIKLER[i];
      expect(NOKTALAR[k.yer]).toBeDefined();
      const e = noktaEylemleri(d, k.yer).find((x) => x.id === 'kr_' + i);
      expect(e).toBeDefined();
      const r = eylemUygula(d, k.yer, 'kr_' + i);
      expect(r.metin.length).toBeGreaterThan(200);
    }
    expect(kronikListesi(d).every((k) => k.acik)).toBe(true);
    expect(caglarListesi(d).every((c) => c.acik)).toBe(true);
    expect(d.kodeks.filter((k) => k.id.indexOf('kronik_') === 0).length).toBe(11);
  });
  test('ikinci bölüm birinciden önce açılmaz; Kızıl Yutucu köprüsü', () => {
    const d = hazir();
    expect(noktaEylemleri(d, 'arsiv_kuresi').find((x) => x.id === 'kr_1')).toBeDefined();
    expect(noktaEylemleri(d, 'arsiv_kuresi').find((x) => x.id === 'kr_2')).toBeUndefined();
    eylemUygula(d, 'arsiv_kuresi', 'kr_1');
    d.tamamlananOp.push('kizil_yutucu');
    expect(eylemUygula(d, 'arsiv_kuresi', 'kr_2').metin).toContain('mancınık, Kaptan');
  });
});

import { seyahat, haritaListesi, bolgeSu, BOLGELER } from '../src/oyun/yuzey/gorevler';
import { NOBET_SN as NS } from '../src/oyun/zaman';
describe('Coğrafi atlas', () => {
  test('her bölgenin giriş mekânı var; bütün bölgelere Magentor\'dan yol var', () => {
    const d = hazir();
    d.bayrak.aetherKayigi = true;
    d.mekan = 'halka_zhaor';
    for (const id of Object.keys(BOLGELER)) expect(MEKANLAR[BOLGELER[id].giris]).toBeDefined();
    const l = haritaListesi(d);
    expect(l.filter((x) => !x.burada).every((x) => x.yol)).toBe(true);
  });
  test('yolculuk zaman harcar ve varır; Kahergonat Yolu yalnız Mavi Akşam\'da', () => {
    const d = hazir();
    d.mekan = 'halka_zhaor';
    d.zaman = { sn: 0 };
    const r = seyahat(d, 'julithan');
    expect(r.sn).toBeGreaterThanOrEqual(5.5 * 7200);
    expect(d.mekan).toBe('julithan');
    expect(d.sahne.indexOf('seyahat_')).toBe(0);
    d.mekan = 'hardrin';
    d.zaman.sn = Math.ceil(d.zaman.sn / (6 * NS)) * 6 * NS; // Gümüş Şafak
    expect(seyahat(d, 'kahergonat').ses).toBe('red');
    d.zaman.sn += 4 * NS; // Mavi Akşam
    expect(seyahat(d, 'kahergonat').ses).toBeUndefined();
    expect(bolgeSu(d)).toBe('kahergonat');
  });
  test('Merkez İstasyon yetki ister; Fenrir Kapısı herkese açık', () => {
    const d = hazir();
    d.mekan = 'tenohris';
    expect(eylemUygula(d, 'merkez_istasyon', 'ist_loran').ses).toBe('red');
    d.bayrak.karaGolIzni = true;
    eylemUygula(d, 'merkez_istasyon', 'ist_loran');
    expect(d.mekan).toBe('loran');
    d.mekan = 'halka_zhaor';
    eylemUygula(d, 'fenrir_istasyonu', 'ist_tentran');
    expect(d.mekan).toBe('aether_dock');
  });
});
