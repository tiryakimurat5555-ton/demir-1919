// 4.4: gündelik eşya kataloğu, yerleşim binalarının tezgâhları, gündelik ekimler, rezonans sunağı (v5 Paket 10, 12, 5 bölüm 3)
import { describe, expect, test } from 'bun:test';
import { yeniOyun } from '../src/oyun/durum';
import * as KM from '../src/oyun/komuta';
import { zamanIlerle, eylemUygula, noktaEylemleri } from '../src/oyun/yuzey/gorevler';
import * as YR from '../src/oyun/yerlesim/yerlesim';
import * as PZ from '../src/oyun/yerlesim/pazar';
import * as IM from '../src/oyun/imalat/tezgah';
import { GUNLUK, GUNDELIK_BITKILER, rezonansMi } from '../src/oyun/imalat/esya';
import { BITKILER, yetisirMi } from '../src/oyun/tarim/bitkiler';
import * as ZN from '../src/oyun/tonoflenya/zanaat';
import * as Z from '../src/oyun/zaman';

function koloni(tohum = 5) {
  const d = yeniOyun(tohum);
  d.sahne = null;
  Object.assign(d.bayrak, { sondaj: true, kazi: true, dokumhane: true, kule: true });
  for (const r of Object.keys(d.koloni.kaynaklar)) d.koloni.kaynaklar[r] = 0;
  const k = KM.komuta(d);
  for (const s of Object.keys(k.sektor)) k.sektor[s] = { durum: 'guvenli', karakol: null };
  zamanIlerle(d, 1);
  d.haberKuyrugu = [];
  d.yer.binalar.push('meydan');
  d.koloni.binalar.push('yasam_blogu');
  return d;
}
const kur = (d, ...l) => {
  for (const b of l) if (!d.yer.binalar.includes(b)) d.yer.binalar.push(b);
};
const ver = (d, o) => {
  for (const k of Object.keys(o)) YR.varlikEkle(d, k, o[k]);
};

describe('Eşya kataloğu ve ekimler', () => {
  test('Paket 11 şablonlarındaki bütün eşya kimlikleri artık oyunda tanımlı', () => {
    for (const s of PZ.SABLONLAR) for (const [k] of s.es) expect(PZ.bilinir(k)).toBe(true);
  });
  test('gündelik eşyalar gemi ambarına girmez, envanterin beş kategorisinde görünmez', () => {
    const d = koloni();
    const once = ZN.kargo(d).hacim;
    ver(d, { tugla: 50, ekmek: 20 });
    expect(ZN.kargo(d).hacim).toBe(once);
    for (let i = 0; i < 5; i++) expect(ZN.kategoriOgeleri(d, i)).not.toContain('tugla');
  });
  test('altı gündelik bitki: Dünya üçlüsü terasta, Malken üçlüsü vahada ve terasta', () => {
    expect(GUNDELIK_BITKILER.length).toBe(6);
    for (const b of ['arpa', 'pamuk_keten', 'cay_yapragi']) expect(yetisirMi(b, 'teras')).toBe(true);
    for (const b of ['isik_otu', 'kristal_cicek', 'tatli_kok']) {
      expect(yetisirMi(b, 'vaha')).toBe(true);
      expect(yetisirMi(b, 'teras')).toBe(true);
    }
    expect(BITKILER.arpa.urun).toBe('arpa');
  });
  test('tohumlar: aşhane, atölye ve vaha bir kez tohum getirir', () => {
    const d = koloni();
    kur(d, 'ashane', 'atolye');
    zamanIlerle(d, 0.5);
    expect(d.tarim.tohumlar.arpa).toBe(4);
    expect(d.tarim.tohumlar.cay_yapragi).toBe(3);
    expect(d.tarim.tohumlar.pamuk_keten).toBe(4);
    zamanIlerle(d, 0.5);
    expect(d.tarim.tohumlar.arpa).toBe(4);
    d.gorulenMekanlar = [...(d.gorulenMekanlar || []), 'vaha'];
    zamanIlerle(d, 0.5);
    expect(d.tarim.tohumlar.kristal_cicek).toBe(3);
  });
  test('Ham Rezonans etiketi', () => {
    expect(rezonansMi('piezo')).toBe(true);
    expect(rezonansMi('urun_kristal_cicek')).toBe(true);
    expect(rezonansMi('ekmek')).toBe(false);
    const d = koloni();
    ver(d, { piezo: 3 });
    expect(IM.kalemSatiri(d, 'piezo')).toMatch(/Ham Rezonans/);
  });
});

describe('Tezgâhlar', () => {
  test('bina köşesinde standart sıra: tezgâhlar, buradakiler, durum', () => {
    const d = koloni();
    kur(d, 'ashane');
    const l = noktaEylemleri(d, 'yb_ashane').map((e) => e.id);
    expect(l.slice(0, 3)).toEqual(['tezgah', 'kimler', 'durum']);
    expect(l).toContain('yemek');
    expect(l[l.length - 1]).toBe('incele');
    const r = eylemUygula(d, 'yb_ashane', 'tezgah');
    expect(r.agac(d).ogeler.map((o) => o.id)).toEqual(['tz_firin', 'tz_ocak']);
    expect(eylemUygula(d, 'yb_ashane', 'durum').metin).toMatch(/kurulu/);
  });
  test('ekmek: arpa yoksa akifer; bir, beş kez; eksikse olmaz', () => {
    const d = koloni();
    kur(d, 'ashane');
    expect(IM.uret(d, 'ekmek').metin).toMatch(/Eksik/);
    ver(d, { urun_akifer: 10, deniz_tuzu: 5 });
    expect(IM.uret(d, 'ekmek').metin).toMatch(/3 Taş fırın ekmeği üretildi/);
    expect(d.tarim.urun.akifer).toBe(8);
    expect(IM.uret(d, 'ekmek', 5).metin).toMatch(/Eksik/);
    ver(d, { urun_arpa: 8 });
    expect(IM.uret(d, 'ekmek', 4).metin).toMatch(/üretildi/);
    expect(YR.varlik(d, 'ekmek')).toBe(15);
    expect(d.tarim.urun.arpa).toBe(0);
  });
  test('bina yoksa üretilmez; kişi şartı', () => {
    const d = koloni();
    ver(d, { ham_kil: 10, komur: 10, kereste: 4, bakir: 4, kristal: 2 });
    expect(IM.uret(d, 'tugla').metin).toMatch(/gerekir/);
    kur(d, 'atolye');
    expect(IM.uret(d, 'tugla').metin).toMatch(/4 Pişmiş tuğla/);
    d.yer.katilan = d.yer.katilan.filter((k) => k !== 'veysel');
    expect(IM.uret(d, 'muzik_kutusu').metin).toMatch(/kolonideyken/);
    d.yer.katilan.push('veysel', 'kaelon');
    expect(IM.uret(d, 'muzik_kutusu').metin).toMatch(/üretildi/);
  });
  test('yün battaniye kilitli (hayvan yok); börek soya-kazeinle olur', () => {
    const d = koloni();
    kur(d, 'atolye', 'ashane');
    expect(IM.kisiEngeli(d, 'yun_battaniye')).toMatch(/hayvan/);
    ver(d, { urun_arpa: 2, urun_soya: 1, urun_vaha_hurmasi: 1 });
    expect(IM.uret(d, 'borek').metin).toMatch(/2 Peynirli börek/);
    expect(PZ.ulasilabilir(d, 'yun_battaniye')).toBe(false);
  });
  test('ilan panosu: tezgâh kurulunca gündelik eşya ulaşılabilir; eksik istek kadar üret', () => {
    const d = koloni();
    expect(PZ.ulasilabilir(d, 'tugla')).toBe(false);
    kur(d, 'atolye');
    ver(d, { ham_kil: 1, komur: 1 });
    expect(PZ.ulasilabilir(d, 'tugla')).toBe(true);
    ZN.ekle(d, 'ham_kil', 20);
    ZN.ekle(d, 'komur', 20);
    PZ.durum(d).pano.push({ no: 99, sablon: 25, ad: 'Duvar Örme', istenen: { tugla: 10 }, kanal: 2, vatandas: 'x', bitisGun: 99, odul: { gk: 10 } });
    expect(IM.istekIcinKat(d, 'tugla')).toBe(3);
    const m = IM.tarifMenu(d, 'tugla', 'atolye');
    const o = m.ogeler.find((x) => x.id === 'istek');
    expect(o.etiket).toMatch(/3 kez/);
    o.yap(d);
    expect(YR.varlik(d, 'tugla')).toBe(12);
    expect(PZ.teslimEt(d, 99).metin).toMatch(/teslim/);
  });
  test('taverna ikramı ve evde dinlenme günde bir', () => {
    const d = koloni();
    kur(d, 'taverna', 'dunya_konut');
    ver(d, { borek: 2 });
    d.koloni.moral = 50;
    expect(IM.ikramVer(d).metin).toMatch(/moral/);
    expect(d.koloni.moral).toBe(54);
    expect(IM.ikramVer(d).metin).toMatch(/yapıldı/);
    d.murettebat[0].stres = 30;
    expect(IM.evdeDinlen(d, 'dunya_konut').metin).toMatch(/on azaldı/);
    expect(d.murettebat[0].stres).toBe(20);
  });
});

describe('Kullanım ve kancalar', () => {
  test('aşhanede sıcak yemek önce pişmiş yemeği yer; çorba yorgunluğu sıfırlar', () => {
    const d = koloni();
    kur(d, 'ashane');
    ver(d, { balik_corbasi: 1 });
    d.saha = { yorgunluk: 80 };
    const r = eylemUygula(d, 'yb_ashane', 'yemek');
    expect(r.metin).toMatch(/Balık çorbası/);
    expect(YR.varlik(d, 'balik_corbasi')).toBe(0);
    expect(d.saha.yorgunluk).toBe(0);
  });
  test('fener yağı, tamir kiti, konserve, dekor', () => {
    const d = koloni();
    kur(d, 'kamara');
    ver(d, { fener_yagi: 1, tamir_kiti: 1, balik_konservesi: 1, muzik_kutusu: 1 });
    IM.kullan(d, 'tamir_kiti'); // sağlamken harcanmaz
    expect(YR.varlik(d, 'tamir_kiti')).toBe(1);
    d.saha.yag = 10;
    d.saha.yip.kazma = 40;
    expect(IM.kullan(d, 'fener_yagi').metin).toMatch(/yüzde yüz/);
    expect(IM.kullan(d, 'tamir_kiti').metin).toMatch(/onarıldı/);
    expect(d.saha.yip.kazma).toBe(0);
    IM.kullan(d, 'balik_konservesi');
    expect(d.seferEtki.peksimet).toBe(1);
    IM.kullan(d, 'muzik_kutusu');
    expect(d.yer.dekorlar).toContain('muzik_kutusu');
  });
  test('hamamda aroma yağı stresi tamamen siler', () => {
    const d = koloni();
    kur(d, 'hamam');
    ver(d, { aroma_yagi: 1 });
    d.murettebat[0].stres = 60;
    eylemUygula(d, 'yb_hamam', 'yikan');
    expect(d.murettebat[0].stres).toBe(0);
    expect(YR.varlik(d, 'aroma_yagi')).toBe(0);
  });
  test('çanta beş bölme, iki parmakla döner', () => {
    const d = koloni();
    ver(d, { ekmek: 2, tugla: 3, huzur_tutsusu: 1, dugun_yuzugu: 1, bakir: 2 });
    expect(IM.cantaMenu(d, 0).ogeler.some((o) => o.id === 'c_bakir')).toBe(true);
    expect(IM.cantaMenu(d, 1).ogeler.some((o) => o.id === 'c_ekmek')).toBe(true);
    expect(IM.cantaMenu(d, 2).ogeler.some((o) => o.id === 'c_tugla')).toBe(true);
    expect(IM.cantaMenu(d, 3).ogeler.some((o) => o.id === 'c_huzur_tutsusu')).toBe(true);
    expect(IM.cantaMenu(d, 4).ogeler.some((o) => o.id === 'c_dugun_yuzugu')).toBe(true);
    expect(IM.cantaMenu(d, 4).ikiParmak.sag(d).baslik).toMatch(/1\. Hammaddeler/);
  });
  test('gündelik yemek hediyede yiyecek sayılır; Veysel çayı sever', () => {
    expect(YR.yiyecekMi('ekmek')).toBe(true);
    expect(YR.tepkiTuru('veysel', 'dunya_cayi')).toBe('sever');
  });
});

describe('Rezonans sunağı', () => {
  test('Malazar büyü tozu sunağı açar; tılsımlar süreli etki koyar', () => {
    const d = koloni();
    kur(d, 'tapinak');
    expect(IM.binaDurumu(d, 'tapinak').metin).toMatch(/kilitli/);
    expect(IM.sunagiAc(d).metin).toMatch(/Önce/);
    ver(d, { malazar_asasi: 1, malazar_kristali: 2 });
    expect(IM.uret(d, 'malazar_buyu_tozu').metin).toMatch(/üretildi/);
    expect(IM.sunagiAc(d).metin).toMatch(/açıldı/);
    expect(d.bayrak.rezonansSunagi).toBe(true);
    ver(d, { urun_kristal_cicek: 2, urun_isik_otu: 2, aether: 1 });
    expect(IM.tilsimIsle(d, 'bereket').metin).toMatch(/işlendi/);
    expect(Z.etkiVar(d, 'tarimHiz')).toBe(true);
    expect(Z.etkiCarpani(d, 'tarla')).toBeCloseTo(1.3);
  });
});
