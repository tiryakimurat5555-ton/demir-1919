// 4.0: yerleşim (v5 Paket 1, Paket 8, Paket 3A takvimi)
import { describe, expect, test } from 'bun:test';
import { yeniOyun } from '../src/oyun/durum';
import * as KM from '../src/oyun/komuta';
import { zamanIlerle, eylemUygula, noktaEylemleri, zamanSar, uyu } from '../src/oyun/yuzey/gorevler';
import * as YR from '../src/oyun/yerlesim/yerlesim';
import { YERLESIMCILER, YERLESIM_BINALARI, CEKIRDEK } from '../src/oyun/yerlesim/veri';
import { OLAYLAR } from '../src/oyun/yerlesim/ikili';
import { yakindakiler, yerlerListesi, kisiYeri, gec, kisiAdi } from '../src/oyun/yuzey/dunya';
import { KAPILAR, KISILER } from '../src/oyun/yuzey/harita';
import * as Z from '../src/oyun/zaman';
import * as ZN from '../src/oyun/tonoflenya/zanaat';

function koloni(tohum = 5) {
  const d = yeniOyun(tohum);
  d.sahne = null;
  Object.assign(d.bayrak, { sondaj: true, kazi: true, dokumhane: true, kule: true });
  for (const r of Object.keys(d.koloni.kaynaklar)) d.koloni.kaynaklar[r] = 60;
  d.koloni.parcalar.cam = 20;
  d.koloni.parcalar.kablo = 20;
  const k = KM.komuta(d);
  for (const s of Object.keys(k.sektor)) k.sektor[s] = { durum: 'guvenli', karakol: null };
  zamanIlerle(d, 1);
  d.haberKuyrugu = [];
  return d;
}
const birGun = (d) => {
  d.zaman.sn += Z.GUN_SN;
  zamanIlerle(d, 0.01);
};

describe('Yerleşim', () => {
  test('öncü mürettebat belgedeki adlarla; başlangıç çekirdeği Kademe 1', () => {
    const d = koloni();
    expect(d.murettebat.map((u) => u.ad)).toEqual(['Kaelon Vex-Tar', 'Zarek Sol-Zhaor', 'Lyris Mar-Axira']);
    expect(d.yer.katilan.sort()).toEqual([...CEKIRDEK].sort());
    for (const id of CEKIRDEK) expect(YR.kademe(d, id)).toBe(1);
    expect(kisiAdi(d, 'y_sorya')).toBe('Sorya Val-Nira');
    expect(kisiYeri(d, 'y_defne')).toBe(null); // katılmadı
  });

  test('eski kayıt: öncüler yeniden adlandırılır, yerleşim kurulur', () => {
    const d = yeniOyun(9);
    d.murettebat[0].ad = 'Eski Ad';
    delete d.yer;
    zamanIlerle(d, 1);
    expect(d.murettebat[0].ad).toBe('Kaelon Vex-Tar');
    expect(d.yer.katilan.length).toBe(5);
  });

  test('ihtiyaç doğar, meydan kurulur, kapı açılır, binalar sıradan açılır', () => {
    const d = koloni();
    expect(YR.binaDurumu(d, 'meydan')).toBe('kilitli');
    d.koloni.binalar.push('yasam_blogu');
    const o = zamanIlerle(d, 1);
    expect(d.yer.ihtiyac).toContain('meydan');
    expect(o.some((x) => x.tur === 'haber' && x.metin.includes('meydan'))).toBe(true);
    d.mekan = 'vadi';
    d.oyuncu = { x: 32, y: -7, yon: 0 };
    expect(yakindakiler(d).some((n) => n.id === 'meydan_kapi')).toBe(false); // gizli
    const r = YR.binaKur(d, 'meydan');
    expect(d.yer.binalar).toContain('meydan');
    expect(r.metin).toContain('kuruldu');
    expect(yakindakiler(d).some((n) => n.id === 'meydan_kapi')).toBe(true);
    const g = gec(d, 'meydan_kapi', 0);
    expect(g.gecti).toBe(true);
    expect(d.mekan).toBe('meydan');
    // Kamara ve aşhane artık kurulabilir
    zamanIlerle(d, 1);
    expect(d.yer.ihtiyac).toEqual(expect.arrayContaining(['kamara', 'ashane', 'atolye']));
    YR.binaKur(d, 'kamara');
    expect(d.yer.binalar).toContain('kamara');
    expect(yerlerListesi(d).some((y) => y.id === 'yk_kamara')).toBe(true);
  });

  test('malzeme eksikse kurulmaz; cam dökümhanede dökülür', () => {
    const d = koloni();
    d.koloni.binalar.push('yasam_blogu');
    YR.binaKur(d, 'meydan');
    d.koloni.parcalar.cam = 0;
    const r = YR.binaKur(d, 'kamara');
    expect(r.ses).toBe('red');
    expect(r.metin).toContain('cam');
    expect(d.yer.binalar).not.toContain('kamara');
  });

  test('nöbet programı: meydan kurulunca öncüler programa geçer, bina yoksa kamp ateşi', () => {
    const d = koloni();
    expect(kisiYeri(d, 'y_sorya').mekan).toBe('vadi'); // kamp
    d.koloni.binalar.push('yasam_blogu');
    YR.binaKur(d, 'meydan');
    YR.binaKur(d, 'ashane');
    d.zaman.sn = 0; // Gümüş Şafak (Zhaor): Sorya mutfakta
    const k = kisiYeri(d, 'y_sorya');
    expect(k.mekan).toBe('ashane');
    const kaelon = kisiYeri(d, 'muhendis');
    expect(kaelon.mekan).toBe('vadi'); // atölye yok: kamp ateşi
    YR.binaKur(d, 'atolye');
    expect(kisiYeri(d, 'muhendis').mekan).toBe('atolye');
    d.mekan = 'ashane';
    expect(yakindakiler(d).some((n) => n.tur === 'kisi' && n.id === 'y_sorya')).toBe(true);
  });

  test('sohbet: günde bir puan; tam ton +20 × bar hızı, ters ton -5, kademe düşmez', () => {
    const d = koloni();
    const p0 = YR.puan(d, 'sorya'); // 100
    const m = YR.sohbetMenu(d, 'sorya');
    expect(m.ogeler.length).toBe(3);
    const r = YR.sohbetYanitla(d, 'sorya', 'B', 'gelenekci'); // gelenekçinin tam tonu B
    expect(r.tur).toBe('tam');
    expect(YR.puan(d, 'sorya')).toBe(p0 + 24); // Sorya bar hızı 1,2
    expect(YR.sohbetMenu(d, 'sorya').ogeler.length).toBe(0); // bugün konuşuldu
    birGun(d);
    const r2 = YR.sohbetYanitla(d, 'sorya', 'C', 'gelenekci');
    expect(r2.tur).toBe('ters');
    expect(YR.puan(d, 'sorya')).toBe(p0 + 19);
    // Taban: Kademe 1'in altına inmez
    d.yer.kisi.lyris.p = 102;
    birGun(d);
    YR.sohbetYanitla(d, 'lyris', 'B', 'bilimsel');
    expect(YR.puan(d, 'lyris')).toBe(100);
  });

  test('hediye: günde bir, haftada iki; sevdiği +45, sevmediği -15, doğum gününde iki kat', () => {
    const d = koloni();
    ZN.ekle(d, 'titanyum', 10);
    const p0 = YR.puan(d, 'kaelon');
    const r = YR.hediyeVer(d, 'kaelon', 'titanyum'); // Kaelon titanyumu sever
    expect(r.tur).toBe('sever');
    expect(YR.puan(d, 'kaelon')).toBe(p0 + 45);
    expect(YR.hediyeVer(d, 'kaelon', 'titanyum').metin).toContain('Bugünlük');
    // Aynı hafta ikinci hediye (ertesi gün) olur, üçüncüsü olmaz
    const g = Z.haftaGunu(d);
    if (g <= 5) {
      birGun(d);
      expect(YR.hediyeVer(d, 'kaelon', 'bazalt').tur).toBe('normal');
      birGun(d);
      expect(YR.hediyeVer(d, 'kaelon', 'bazalt').metin).toContain('haftalık');
    }
    // Sevmediği
    const v0 = YR.puan(d, 'veysel');
    ZN.ekle(d, 'plazma_kartusu', 1);
    const rv = YR.hediyeVer(d, 'veysel', 'plazma_kartusu');
    expect(rv.tur).toBe('sevmez');
    expect(YR.puan(d, 'veysel')).toBe(Math.max(100, v0 - 15));
    // Doğum günü: Sorya yılın 3. günü
    d.zaman.sn = 2 * Z.GUN_SN + 10;
    zamanIlerle(d, 0.01);
    d.tarim = d.tarim || { urun: {}, erzak: {} };
    ZN.ekle(d, 'urun_vaha_hurmasi', 2);
    const s0 = YR.puan(d, 'sorya');
    YR.hediyeVer(d, 'sorya', 'urun_vaha_hurmasi');
    expect(YR.puan(d, 'sorya')).toBe(s0 + Math.round(90 * 1.2));
    // Tina hiçbir yiyeceği sevmez
    expect(YR.tepkiTuru('tina', 'urun_aloe')).toBe('sevmez');
  });

  test('kademe: günde en çok bir; K3 kazancı, dost halkası', () => {
    const d = koloni();
    d.yer.kisi.sorya.p = 395;
    const l0 = YR.puan(d, 'lyris');
    YR.puanEkle(d, 'sorya', 10);
    expect(YR.kademe(d, 'sorya')).toBe(2);
    expect(YR.kademe(d, 'sorya')).toBe(2); // aynı gün üçe geçmez
    birGun(d);
    expect(YR.kademe(d, 'sorya')).toBe(3);
    expect(d.bayrak.yk_sorya_3).toBe(true);
    expect(YR.puan(d, 'lyris')).toBeGreaterThan(l0); // dost halkası
  });

  test('katılım koşulları: Torvok Kaelith kurtarılınca, Defne Yaşam Bloğu ve 15 nüfus', () => {
    const d = koloni();
    expect(YR.katildiMi(d, 'torvok')).toBe(false);
    d.bayrak.kaelithKurtarildi = true;
    zamanIlerle(d, 1);
    expect(YR.katildiMi(d, 'torvok')).toBe(true);
    d.koloni.binalar.push('yasam_blogu');
    d.koloni.nufus.toplam = 15;
    zamanIlerle(d, 1);
    expect(YR.katildiMi(d, 'defne')).toBe(true);
    expect(YR.katildiMi(d, 'brom')).toBe(false);
    d.bayrak.gz_p06 = 'kotu';
    zamanIlerle(d, 1);
    expect(YR.katildiMi(d, 'brom')).toBe(false);
  });

  test('kamara: uyku Gümüş Şafak\'a; dekor dükkânı Veysel Kademe 6 ile', () => {
    const d = koloni();
    d.koloni.binalar.push('yasam_blogu');
    YR.binaKur(d, 'meydan');
    YR.binaKur(d, 'kamara');
    d.mekan = 'kamara';
    d.oyuncu = { x: 3306, y: 13, yon: 0 };
    d.zaman.sn = Z.NOBET_SN * 2 + 30;
    d.murettebat[0].stres = 40;
    const m0 = d.koloni.moral = 50;
    expect(noktaEylemleri(d, 'kamara_yatak').some((e) => e.id === 'uyu')).toBe(true);
    d.koloni.uretimler = [{ tesis: 'dokumhane', tarif: 'cam', kalan: 500 }];
    const r = eylemUygula(d, 'kamara_yatak', 'uyu');
    expect(d.koloni.uretimler[0].kalan).toBe(500); // uykuda üretim ilerlemez (00-okuma 1.4)
    expect(r.kapat).toBe(true);
    expect(Z.nobetNo(d)).toBe(0);
    expect(d.murettebat[0].stres).toBe(0);
    expect(d.koloni.moral).toBeGreaterThan(m0);
    expect(YR.dekorMenusu(d).ogeler[0].id).toBe('kapali');
    d.bayrak.yk_veysel_6 = true;
    d.koloni.parcalar.piezo = 2;
    const dk = YR.dekorKoy(d, 'muzik_kutusu');
    expect(d.yer.dekorlar).toContain('muzik_kutusu');
    expect(dk.metin).toContain('Müzik kutusu');
  });

  test('terminalde Yerleşim sekmesi; meydan terminali; takvim', () => {
    const d = koloni();
    expect(noktaEylemleri(d, 'terminal').some((e) => e.id === 'yerlesim')).toBe(true);
    const r = eylemUygula(d, 'terminal', 'yerlesim');
    const p = r.agac(d);
    expect(p.ogeler.map((o) => o.id)).toEqual(['binalar', 'kisiler', 'takvim', 'festivaller', 'aile']);
    expect(YR.binaMenusu(d).ogeler.length).toBe(11);
    expect(YR.yerlesimciMenusu(d).ogeler.length).toBe(16);
    expect(YR.profilMetni(d, 'veysel')).toContain('Kademe 1');
    d.zaman.sn = 16 * Z.GUN_SN; // 17. gün: Kor mevsimi
    expect(Z.mevsim(d).id).toBe('kor');
    expect(Z.mevsimCarpani(d, 'dokum')).toBe(1.15);
    expect(Z.haftaGunu(d)).toBe(3);
    expect(Z.takvimMetni(d)).toContain('Kor');
  });

  test('bütün mekânlar ve kapılar tutarlı; yerleşimcilerin hediye kimlikleri gerçek', () => {
    for (const id of Object.keys(YERLESIM_BINALARI)) {
      const b = YERLESIM_BINALARI[id];
      if (b.mekan) expect(KAPILAR['yk_' + id] || id === 'meydan').toBeTruthy();
    }
    for (const id of Object.keys(YERLESIMCILER)) {
      const y = YERLESIMCILER[id];
      expect(KISILER[y.kisi || 'y_' + id]).toBeTruthy();
      for (const k of [...y.sever, ...y.sevmez]) if (k !== 'yiyecek') expect(YR.varlikAdi(k).length).toBeGreaterThan(2);
      expect(y.dogum).toBeGreaterThan(0);
      expect(y.dogum).toBeLessThanOrEqual(56);
    }
  });

  test('4.1 kademe sahneleri: 16 kişi × 10 kademe, 2-4 paragraf, en az iki seçenek', () => {
    for (const id of Object.keys(YERLESIMCILER)) {
      for (let k = 1; k <= 10; k++) {
        const sh = YR.KADEME_SAHNELERI[id][k];
        expect(sh).toBeTruthy();
        expect(sh.m.length).toBeGreaterThanOrEqual(2);
        expect(sh.m.length).toBeLessThanOrEqual(4);
        expect(sh.s.length).toBeGreaterThanOrEqual(1);
        if (k !== 8 || id !== 'veysel') for (const x of sh.s) expect(typeof x.c).toBe('string');
      }
      // Kademe 8: yaşam ortaklığı ya da bağ (Veysel ve Tina yalnız bağ)
      const s8 = YR.KADEME_SAHNELERI[id][8].s.map((x) => x.bayrak && x.bayrak['yp_' + id]);
      if (id === 'veysel' || id === 'tina') expect(s8.every((v) => v === 'bag')).toBe(true);
      else expect(s8.sort()).toEqual(['bag', 'es']);
    }
  });

  test('4.1 tanışma sahnesi bekler; seçilince anılara geçer; kademe atlayınca yeni sahne', () => {
    const d = koloni();
    const m = YR.kisiMenu(d, 'sorya', true);
    expect(m.ogeler[0].id).toBe('sahne');
    const sm = YR.sahneMenu(d, 'sorya');
    expect(sm.ogeler.length).toBe(2);
    const p0 = YR.puan(d, 'sorya');
    const r = YR.sahneSec(d, 'sorya', 0);
    expect(r.metin.length).toBeGreaterThan(20);
    expect(YR.puan(d, 'sorya')).toBeGreaterThan(p0);
    expect(YR.kisiMenu(d, 'sorya').ogeler[0].id).toBe('sohbet');
    expect(YR.anilarMenu(d, 'sorya').ogeler.length).toBe(1);
    d.yer.kisi.sorya.p = 199;
    birGun(d);
    YR.puanEkle(d, 'sorya', 5);
    expect(YR.kademe(d, 'sorya')).toBe(2);
    expect(YR.kisiMenu(d, 'sorya').ogeler[0].etiket).toContain('Kayıp baharat');
  });

  test('4.1 Paket 9: iki taraf Kademe 5+ olunca olay; orta yol uyumu dosta çıkarır', () => {
    const d = koloni();
    d.bayrak.kaelithKurtarildi = true;
    d.bayrak.g14_ok = true;
    d.tamamlananOp = [...(d.tamamlananOp || []), 'g14'];
    d.koloni.binalar.push('kseno_habitat');
    zamanIlerle(d, 1);
    expect(YR.katildiMi(d, 'torvok') && YR.katildiMi(d, 'siravel')).toBe(true);
    for (const id of ['torvok', 'siravel', 'lyris']) {
      d.yer.kisi[id].k = 5;
      d.yer.kisi[id].p = 500;
    }
    d.yer.olaylar = Object.keys(OLAYLAR).filter((x) => x !== 'c_torvok_siravel');
    birGun(d);
    expect(d.yer.olay).toBe('c_torvok_siravel');
    expect(YR.uyum(d, 'torvok', 'siravel')).toBe(-35);
    expect(YR.kisiMenu(d, 'torvok').ogeler.some((o) => o.id === 'olay')).toBe(true);
    const om = YR.olayMenu(d);
    expect(om.ogeler.length).toBe(3);
    const r = YR.olaySec(d, 2);
    expect(r.metin).toContain('arası artık');
    expect(YR.uyum(d, 'torvok', 'siravel')).toBe(10);
    expect(d.bayrak.uyum_torvok_siravel).toBe(true);
    expect(d.yer.olay).toBe(null);
    // aynı gün yeni olay yok
    expect(YR.olayDenetle(d)).toBe(null);
  });

  test('4.1 tanık kolonide yoksa aynı ocaktan biri devralır', () => {
    const d = koloni();
    const o = OLAYLAR.c_brom_tina;
    d.yer.katilan.push('brom', 'tina', 'julian');
    expect(YR.tanik(d, o)).toBe('julian');
    expect(YR.sosyalSatir(d, 'brom')).toContain('Tartıştığı: Tina');
  });
});
