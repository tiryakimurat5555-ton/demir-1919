// 4.2: ilan panosu, istek havuzu, Kaptan Orin, koloni tezgâhı (v5 Paket 2, 11) ve festivaller (Paket 3A)
import { describe, expect, test } from 'bun:test';
import { yeniOyun } from '../src/oyun/durum';
import * as KM from '../src/oyun/komuta';
import { zamanIlerle, eylemUygula, noktaEylemleri, SAHNELER } from '../src/oyun/yuzey/gorevler';
import * as YR from '../src/oyun/yerlesim/yerlesim';
import * as PZ from '../src/oyun/yerlesim/pazar';
import * as FS from '../src/oyun/yerlesim/festival';
import { yakindakiler, kisiYeri } from '../src/oyun/yuzey/dunya';
import { OPERASYONLAR } from '../src/oyun/veri/uzayGorevleri';
import { opBaslat, opGirdi } from '../src/oyun/uzay/operasyon';
import * as Z from '../src/oyun/zaman';

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
  d.yer.binalar.push('meydan');
  d.koloni.binalar.push('yasam_blogu', 'koloni_mutfagi');
  d.tarim.urun.akifer = 40;
  d.tarim.erzak.serbet = 10;
  return d;
}
const gunBasi = (d, g) => {
  d.zaman.sn = (g - 1) * Z.GUN_SN + 1;
  zamanIlerle(d, 0.01);
};

describe('İlan panosu ve istekler', () => {
  test('pano Yaşam Bloğu ve meydanla açılır; en çok üç ilan, yalnız ulaşılabilir eşyalar', () => {
    const d = koloni();
    expect(PZ.panoAcik(d)).toBe(true);
    gunBasi(d, 2);
    const p = d.pazar.pano;
    expect(p.length).toBeGreaterThan(0);
    expect(p.length).toBeLessThanOrEqual(3);
    for (const x of p) for (const k of Object.keys(x.istenen)) expect(PZ.ulasilabilir(d, k)).toBe(true);
    // aşhane ve atölye kurulmadan ekmek ve tuğla istenmez (4.4 tezgâhları)
    expect(PZ.ulasilabilir(d, 'ekmek')).toBe(false);
    expect(PZ.ulasilabilir(d, 'tugla')).toBe(false);
    expect(yakindakiler({ ...d, mekan: 'meydan' }).some((n) => n.id === 'ilan_panosu')).toBe(true);
    const m = PZ.panoMenu(d);
    expect(m.ogeler.length).toBe(p.length);
    expect(m.ogeler[0].etiket).toMatch(/Ödül: .*Kalan süre/);
  });
  test('tümünü teslim et: kredi, yakınlık ya da moral; eksikse olmaz; iptal cezasız', () => {
    const d = koloni();
    gunBasi(d, 2);
    const x = d.pazar.pano[0];
    for (const k of Object.keys(x.istenen)) YR.varlikEkle(d, k, -999);
    expect(PZ.teslimEt(d, x.no).metin).toMatch(/Eksik/);
    for (const k of Object.keys(x.istenen)) YR.varlikEkle(d, k, x.istenen[k] + 1);
    const gk = d.para.gk || 0;
    const r = PZ.teslimEt(d, x.no);
    expect(r.metin).toMatch(/teslim edildi/);
    expect(d.para.gk).toBe(gk + x.odul.gk);
    for (const k of Object.keys(x.istenen)) expect(YR.varlik(d, k)).toBe(1);
    expect(d.pazar.pano.some((y) => y.no === x.no)).toBe(false);
    const y = d.pazar.pano[0];
    if (y) {
      PZ.iptalEt(d, y.no);
      expect(d.pazar.pano.some((z) => z.no === y.no)).toBe(false);
    }
    // ertesi sabah boş yerler dolar
    gunBasi(d, 3);
    expect(d.pazar.pano.length).toBe(3);
  });
  test('basamak günle artar; Basamak 4 kupon verir; süresi dolan ceza vermeden kalkar', () => {
    const d = koloni();
    expect(PZ.basamak(d)).toBe(1);
    gunBasi(d, 70);
    expect(PZ.basamak(d)).toBe(4);
    expect(d.pazar.pano.every((x) => x.odul.kupon === 1)).toBe(true);
    const moral = d.koloni.moral;
    gunBasi(d, 80);
    expect(d.pazar.pano.every((x) => x.bitisGun >= 80)).toBe(true);
    expect(d.koloni.moral).toBeGreaterThanOrEqual(moral - 5);
  });
  test('yerleşimciden Görev al: isimli istek panoya asılır ve teslimde yakınlık verir', () => {
    const d = koloni();
    gunBasi(d, 2);
    d.pazar.pano = [];
    const m = YR.kisiMenu(d, 'sorya');
    const g = m.ogeler.find((o) => o.id === 'gorev_al');
    expect(g).toBeTruthy();
    const r = g.yap(d);
    expect(r.metin).toMatch(/Sorya panoya bir istek astı/);
    const x = PZ.kisininIstegi(d, 'sorya');
    expect(x.kanal).toBe(1);
    expect(YR.kisiMenu(d, 'sorya').ogeler.some((o) => o.id === 'istek')).toBe(true);
    for (const k of Object.keys(x.istenen)) YR.varlikEkle(d, k, x.istenen[k]);
    const p0 = YR.puan(d, 'sorya');
    PZ.teslimEt(d, x.no);
    expect(YR.puan(d, 'sorya')).toBeGreaterThan(p0);
  });
});

describe('Kaptan Orin ve koloni tezgâhı', () => {
  const iskele = () => {
    const d = koloni();
    d.koloni.binalar.push('tersane');
    YR.katil(d, 'mateo', true);
    return d;
  };
  test('iskele tersane ve Mateo ile açılır; Orin 7. gün iner, Yeşil Öğle sonunda kalkar', () => {
    const d = koloni();
    expect(PZ.iskeleAcik(d)).toBe(false);
    d.koloni.binalar.push('tersane');
    YR.katil(d, 'mateo', true);
    expect(PZ.iskeleAcik(d)).toBe(true);
    gunBasi(d, 6);
    expect(PZ.orinBurada(d)).toBe(false);
    d.zaman.sn = 6 * Z.GUN_SN + 5;
    const ol = zamanIlerle(d, 0.01);
    expect(ol.some((o) => o.tur === 'orin')).toBe(true);
    expect(PZ.orinBurada(d)).toBe(true);
    expect(yakindakiler({ ...d, mekan: 'iskele' }).some((n) => n.id === 'orin_gemisi')).toBe(true);
    for (const g of Object.keys(d.pazar.orin.carpan)) {
      expect(d.pazar.orin.carpan[g]).toBeGreaterThanOrEqual(0.7);
      expect(d.pazar.orin.carpan[g]).toBeLessThanOrEqual(1.4);
    }
    d.zaman.sn = 6 * Z.GUN_SN + 3 * Z.NOBET_SN + 5;
    zamanIlerle(d, 0.01);
    expect(PZ.orinBurada(d)).toBe(false);
  });
  test('satış dalgalı fiyatla; satın alma kredi ve kuponla; takas', () => {
    const d = iskele();
    d.zaman.sn = 6 * Z.GUN_SN + 5;
    zamanIlerle(d, 0.01);
    const f = PZ.orinSatisFiyati(d, 'urun_akifer');
    const gk = d.para.gk;
    PZ.orinSat(d, 'urun_akifer', false);
    expect(d.para.gk).toBeCloseTo(gk + f, 5);
    expect(PZ.satilir('mod_govde')).toBe(false);
    d.para.gk = 1000;
    const r = PZ.orinAl(d, 'titanyum');
    expect(r.metin).toMatch(/ambara girdi/);
    const dek = d.pazar.orin.stok.find((s) => s.dekor);
    if (dek) {
      expect(PZ.orinAl(d, dek.id).metin).toMatch(/takas kuponu gerekiyor/);
      d.pazar.kupon = 5;
      expect(PZ.orinAl(d, dek.id).metin).toMatch(/rafa kondu/);
      expect(d.yer.dekorlar).toContain(dek.dekor);
    }
    const t = d.pazar.orin.takas[0];
    for (const k of Object.keys(t.ver)) YR.varlikEkle(d, k, t.ver[k]);
    expect(PZ.orinTakas(d, t.id).metin).toMatch(/Takas tamam/);
  });
  test('Mateo Kademe 3 pahalı grubu bir gün önce söyler', () => {
    const d = iskele();
    YR.kayit(d, 'mateo').k = 3;
    d.haberKuyrugu = [];
    d.zaman.sn = 5 * Z.GUN_SN + 5;
    const ol = zamanIlerle(d, 0.01);
    expect(ol.some((o) => o.tur === 'haber' && /Orin .* için iyi para/.test(o.metin))).toBe(true);
  });
  test('tezgâh: en çok dört çeşit; her nöbet satış ve gelir', () => {
    const d = iskele();
    expect(PZ.tezgahKoy(d, 'urun_akifer', 10).metin).toMatch(/tezgâha kondu/);
    PZ.tezgahKoy(d, 'erzak_serbet', 2);
    PZ.tezgahKoy(d, 'bazalt', 5);
    PZ.tezgahKoy(d, 'titanyum', 5);
    expect(PZ.tezgahKoy(d, 'kristal', 5).metin).toMatch(/dört çeşit/);
    const gk = d.para.gk || 0;
    d.zaman.sn += Z.NOBET_SN;
    zamanIlerle(d, 0.01);
    d.zaman.sn += Z.NOBET_SN;
    zamanIlerle(d, 0.01);
    expect(d.para.gk).toBeGreaterThan(gk);
    expect(d.pazar.tezgahGelir).toBeGreaterThan(0);
  });
});

describe('Festivaller', () => {
  test('Dünya Işığı: katkı, herkes meydanda, dış mekânda festival müziği, iç mekânda değil; zar ve çekiliş', () => {
    const d = koloni();
    gunBasi(d, 6);
    expect(FS.engel(d, 'dunya_isigi')).toBe(null);
    const yiy = FS.yiyecekToplam(d);
    const r = FS.baslat(d, 'dunya_isigi');
    expect(r.festival).toBe('dunya_isigi');
    expect(FS.yiyecekToplam(d)).toBe(yiy - 6);
    expect(kisiYeri(d, 'y_sorya').mekan).toBe('meydan');
    expect(FS.mekanOrtami(d, 'vadi')).toBe('festival_dunya_isigi');
    expect(FS.mekanOrtami(d, 'kapsul')).toBe('ortam_kapsul');
    expect(FS.mekanOrtami(d, 'taverna')).toBe('ortam_taverna');
    expect(YR.ozelGunMu(d, 'sorya')).toBe(true);
    expect(yakindakiler({ ...d, mekan: 'meydan' }).some((n) => n.id === 'festival_alani')).toBe(true);
    expect(FS.engel(d, 'ekmek')).toMatch(/sürüyor/);
    let z;
    for (let i = 0; i < 3 && !d.festival.yarismaYapildi; i++) z = FS.zarOyna(d, i % 2 === 0);
    expect(d.festival.yarismaYapildi).toBe(true);
    expect(z.metin).toMatch(/Turnuva/);
    expect(FS.cark(d).metin).toMatch(/Fener Çarkı/);
    expect(FS.cark(d).metin).toMatch(/çevirdin/);
    d.zaman.sn += Z.NOBET_SN + 1;
    const ol = zamanIlerle(d, 0.01);
    expect(ol.some((o) => o.tur === 'festivalBitti')).toBe(true);
    expect(FS.aktifMi(d)).toBe(false);
    expect(FS.mekanOrtami(d, 'vadi')).toBe('ortam_vadi');
    expect(d.yer.katilan.some((id) => YR.kayit(d, id).cekilis)).toBe(true);
    // beş gün kuralı
    expect(FS.engel(d, 'ekmek')).toMatch(/beş gün/);
  });
  test('Varek yarışması yüzey operasyonu: ritim üç aşama; kazanınca ödüller ve üç gün indirim', () => {
    const d = koloni();
    gunBasi(d, 20); // Kor Yörüngesi
    d.yer.binalar.push('atolye');
    expect(FS.engel(d, 'varek')).toBe(null);
    FS.baslat(d, 'varek');
    const r = FS.alanMenu(d).ogeler.find((o) => o.id === 'yarisma').yap(d);
    expect(r.kapat).toBe(true);
    expect(d.opBekle).toBe('fs_varek');
    zamanIlerle(d, 0.01);
    expect(d.op && d.op.id).toBe('fs_varek');
    for (let a = 0; a < 3; a++) {
      const n = OPERASYONLAR.fs_varek.adimlar[a].n;
      for (let i = 0; i < n; i++) {
        d.op && (d.op.t += 0.3);
        opGirdi(d, { tur: 'dokun' });
      }
    }
    expect(d.festival.kazandi).toBe(true);
    expect(d.sahne).toBe('fest_yarisma');
    expect(SAHNELER.fest_yarisma.metin(d).join(' ')).toMatch(/Kazandın/);
    expect(d.koloni.parcalar.guclu_alasim).toBeGreaterThanOrEqual(10);
    expect(Z.etkiVar(d, 'dokumIndirim')).toBe(true);
  });
  test('mevsim kuralları: Axira yalnız Filiz, Elyndra Sis, Altı Yıldız Ayaz + 8 yerleşimci; yılda bir', () => {
    const d = koloni();
    gunBasi(d, 20);
    expect(FS.engel(d, 'axira')).toMatch(/Filiz/);
    expect(FS.engel(d, 'elyndra')).toMatch(/Sis/);
    expect(FS.engel(d, 'alti_yildiz')).toMatch(/Ayaz/);
    gunBasi(d, 58); // ikinci yılın Filiz'i
    d.koloni.kaynaklar.tohum = 3;
    expect(FS.engel(d, 'axira')).toBe(null);
    FS.baslat(d, 'axira');
    d.tarim.urun.gunes_buz = 2;
    const r = FS.sergiSun(d, 'urun_gunes_buz', 35);
    expect(r.metin).toMatch(/melez/);
    expect(Z.etkiVar(d, 'tarimHiz')).toBe(true);
    expect(Z.etkiCarpani(d, 'tarla')).toBeCloseTo(1.3);
    d.zaman.sn += Z.NOBET_SN + 1;
    zamanIlerle(d, 0.01);
    gunBasi(d, 66);
    expect(FS.engel(d, 'axira')).toMatch(/Bu yıl zaten|Filiz/);
  });
  test('Altı Yıldız: bütün yerleşimcilere yakınlık, moral yüzde yüz, itibar, bir hafta bereket', () => {
    const d = koloni();
    d.koloni.binalar.push('akademi');
    for (const id of ['defne', 'marcus', 'torvok', 'siravel', 'mateo', 'julian', 'veysel']) YR.katil(d, id, true);
    gunBasi(d, 50);
    expect(FS.engel(d, 'alti_yildiz')).toBe(null);
    const it = d.itibar || 0;
    const p = YR.puan(d, 'defne');
    FS.baslat(d, 'alti_yildiz');
    d.zaman.sn += Z.NOBET_SN + 1;
    zamanIlerle(d, 0.01);
    expect(d.itibar).toBe(it + 500);
    expect(d.koloni.moral).toBeGreaterThanOrEqual(95);
    expect(YR.puan(d, 'defne')).toBeGreaterThan(p);
    expect(Z.etkiCarpani(d, 'uretim')).toBeCloseTo(1.1);
  });
  test('meydan terminali ve kamara takviminde Festivaller', () => {
    const d = koloni();
    expect(noktaEylemleri(d, 'meydan_terminali').some((e) => e.id === 'fs_menu')).toBe(true);
    expect(noktaEylemleri(d, 'kamara_yatak').some((e) => e.id === 'fs_menu')).toBe(true);
    const m = eylemUygula(d, 'meydan_terminali', 'fs_menu').agac(d);
    expect(m.ogeler.length).toBe(6);
    expect(noktaEylemleri(d, 'meydan_terminali').some((e) => e.id === 'pz_pano')).toBe(true);
  });
});
void opBaslat;
