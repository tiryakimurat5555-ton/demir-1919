// 4.5: genom birleştirme, kuluçka, barınak, bakım, üretim ve roller (v5 Paket 14, 15); arşiv ve hobiler (Paket 3B)
import { describe, expect, test } from 'bun:test';
import { yeniOyun } from '../src/oyun/durum';
import * as KM from '../src/oyun/komuta';
import { zamanIlerle, eylemUygula, noktaEylemleri, SAHNELER } from '../src/oyun/yuzey/gorevler';
import * as YR from '../src/oyun/yerlesim/yerlesim';
import * as PZ from '../src/oyun/yerlesim/pazar';
import * as HV from '../src/oyun/hayvan/hayvan';
import * as HB from '../src/oyun/hobi/hobi';
import * as IM from '../src/oyun/imalat/tezgah';
import { HAYVANLAR, HAYVAN_SIRASI, GEN_SIRASI } from '../src/oyun/hayvan/veri';
import { OPERASYONLAR } from '../src/oyun/veri/uzayGorevleri';
import { opBaslat, opGirdi, opIlerle } from '../src/oyun/uzay/operasyon';
import { NOKTALAR, KAPILAR } from '../src/oyun/yuzey/harita';
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
  d.koloni.binalar.push('yasam_blogu', 'biyo_kubbe');
  return d;
}
const ver = (d, o) => {
  for (const k of Object.keys(o)) YR.varlikEkle(d, k, o[k]);
};
const gunAtla = (d) => {
  d.zaman.sn = (Z.gun(d)) * Z.GUN_SN + 1;
  return zamanIlerle(d, 0.01);
};

describe('Xeno-fauna veri', () => {
  test('elli tür, sekiz gen; her yaygın ve nadir tür bir genle, her mutasyon iki genle çıkabilir', () => {
    expect(HAYVAN_SIRASI.length).toBe(50);
    expect(GEN_SIRASI.length).toBe(8);
    for (const t of HAYVAN_SIRASI) {
      const x = HAYVANLAR[t];
      if (x.nadir === 'yaygin' || x.nadir === 'nadir') expect(x.genler.length).toBe(1);
      if (x.nadir === 'mutasyon') expect(x.genler.length).toBe(2);
    }
  });
  test('başlangıçta hayvan ürünleri kilitli; ilan panosu istemez', () => {
    const d = koloni();
    expect(PZ.ulasilabilir(d, 'xeno_sut')).toBe(false);
    expect(PZ.ulasilabilir(d, 'yun_battaniye')).toBe(false);
  });
});

describe('Kuluçka ve barınak', () => {
  test('iki gen + su, bir gün sonra çatlama; barınak yoksa bekler, kurulunca yerleşir', () => {
    const d = koloni();
    ver(d, { gen_kanatli: 2, saf_su: 1 });
    expect(HV.kuluckaBaslat(d, 'kanatli', 'kanatli').metin).toMatch(/kuluçkaya/);
    expect(HV.kuluckaBaslat(d, 'kanatli', 'kanatli').metin).toMatch(/dolu/);
    d.zaman.sn += Z.GUN_SN + 5;
    const o = HV.hayvanIlerle(d);
    expect(o[0].tur).toBe('catlama');
    expect(o[0].metin).toMatch(/Çatlama sesi/);
    expect(d.hayvan.bekleyen.length).toBe(1);
    expect(HAYVANLAR[d.hayvan.bekleyen[0]].genler).toContain('kanatli');
    ver(d, { kereste: 10, tugla: 10, bitkisel_lif: 6 });
    expect(HV.barinakKur(d).metin).toMatch(/kuruldu/);
    expect(d.hayvan.barinak.length).toBe(1);
    expect(KAPILAR.barinak_kapi.kosul(d)).toBe(true);
  });
  test('çapraz gen çifti zamanla mutasyon ve efsanevi de verir; keşfedilmemişler önce', () => {
    const d = koloni();
    HV.hazirla(d);
    const goruldu = new Set();
    for (let i = 0; i < 200; i++) {
      const t = HV.sonucSec(d, ['kanatli', 'kristal']);
      goruldu.add(HAYVANLAR[t].nadir);
      if (!d.hayvan.kesif.includes(t)) d.hayvan.kesif.push(t);
    }
    expect(goruldu.has('mutasyon')).toBe(true);
    expect(goruldu.has('yaygin')).toBe(true);
    expect(d.hayvan.kesif).toContain('piezo_tavuk');
  });
  test('modül olmadan üretim yok; modül planı tür keşfedilince açılır; mutlu hayvan gün başı ürün verir', () => {
    const d = koloni();
    HV.hazirla(d);
    d.bayrak.barinak = true;
    d.hayvan.kademe = 0;
    d.hayvan.kesif.push('sut_kecisi');
    d.hayvan.barinak.push({ no: 1, tur: 'sut_kecisi', durum: 'mutlu' });
    d.hayvan.sonGun = Z.gun(d);
    gunAtla(d);
    expect(YR.varlik(d, 'xeno_sut')).toBe(0);
    expect(HV.modulKur(d, 'kovan').metin).toMatch(/planı/);
    ver(d, { kereste: 8, demir_cevheri: 4, seramik_canak: 2 });
    expect(HV.modulKur(d, 'agil').metin).toMatch(/kuruldu/);
    d.hayvan.barinak[0].durum = 'mutlu';
    gunAtla(d);
    expect(YR.varlik(d, 'xeno_sut')).toBeGreaterThan(0);
    expect(PZ.ulasilabilir(d, 'xeno_sut')).toBe(true);
  });
  test('bakım: aç olana yem, hastaya ilaç; yanlış bakım işe yaramaz', () => {
    const d = koloni();
    HV.hazirla(d);
    d.hayvan.barinak.push({ no: 1, tur: 'vanguard_tavugu', durum: 'ac' }, { no: 2, tur: 'dag_koyunu', durum: 'hasta' });
    expect(HV.bakim(d, 1, 'ilac').metin).toMatch(/hasta değil/);
    expect(HV.bakim(d, 1, 'yem').metin).toMatch(/Yem yok/);
    ver(d, { urun_akifer: 2, sifali_mantar: 1 });
    expect(HV.bakim(d, 1, 'yem').metin).toMatch(/yedi/);
    expect(HV.bakim(d, 2, 'ilac').metin).toMatch(/geçti/);
    expect(d.hayvan.barinak.every((x) => x.durum === 'mutlu')).toBe(true);
    const m = HV.hayvanlarMenu(d);
    expect(m.ogeler[0].ses).toBe('el_hayvan_mutlu');
  });
  test('roller: köpek yoldaş pusuyu bildirir; kedi stres azaltır; güve ve alarm bayrakları', () => {
    const d = koloni();
    HV.hazirla(d);
    d.hayvan.barinak.push({ no: 1, tur: 'kopek', durum: 'mutlu' }, { no: 2, tur: 'miril_kedi', durum: 'mutlu' }, { no: 3, tur: 'yildiz_guvesi', durum: 'mutlu' }, { no: 4, tur: 'yanki_kazi', durum: 'mutlu' });
    HV.bayraklar(d);
    expect(d.bayrak.hayvan_guve).toBe(true);
    expect(d.bayrak.hayvan_alarm).toBe(true);
    expect(HV.yoldasYap(d, 1).metin).toMatch(/havlayarak/);
    d.murettebat[0].stres = 30;
    expect(HV.bakim(d, 2, 'sev').metin).toMatch(/on azaldı/);
    expect(d.murettebat[0].stres).toBe(20);
    expect(HV.kediSev(d).metin).toMatch(/yeter/);
  });
  test('Orin stoğunda genom kapsülü çıkar', () => {
    const d = koloni();
    const l = PZ.ORIN_STOK_EKLERI[0](d, 3, (k) => ((k * 0.37) % 1));
    expect(l.length).toBeGreaterThan(0);
    expect(l[0].esya).toMatch(/^gen_|donmus/);
  });
  test('yün battaniye barınakla açılır', () => {
    const d = koloni();
    d.yer.binalar.push('atolye');
    ver(d, { xeno_yun: 3 });
    expect(IM.uret(d, 'yun_battaniye').metin).toMatch(/barınak/);
    d.bayrak.barinak = true;
    expect(IM.uret(d, 'yun_battaniye').metin).toMatch(/üretildi/);
  });
});

describe('Arşiv ve hobiler', () => {
  test('arşiv: parça bağışla, set tamam, ödül bayrağı; okuldan arşiv kapısı', () => {
    const d = koloni();
    d.yer.binalar.push('okul');
    expect(KAPILAR.arsiv_kapi.kosul(d)).toBe(true);
    ver(d, { kristal: 1, piezo: 1, mor_kristal: 1, elmas_kirintisi: 1, saf_aether: 1 });
    for (const p of ['silikat', 'piezo', 'mor', 'elmas']) expect(HB.bagisla(d, 'kristal', p).metin).toMatch(/vitrine/);
    expect(HB.bagisla(d, 'kristal', 'aether').metin).toMatch(/tamamlandı/);
    expect(d.bayrak.arsiv_kristal).toBe(true);
    expect(HB.bagisla(d, 'fosil', 'kovan').metin).toMatch(/yok/);
  });
  test('aşçılık ritmi: hatasız pişirme bir porsiyon fazla ve altın kalite', () => {
    const d = koloni();
    d.yer.binalar.push('ashane');
    if (!d.yer.katilan.includes('sorya')) d.yer.katilan.push('sorya');
    ver(d, { urun_akifer: 2, deniz_tuzu: 1 });
    expect(HB.asciBaslat(d, 'ekmek', 'ashane').kapat).toBe(true);
    expect(d.opBekle).toBe('hb_asci');
    d.opBekle = null;
    opBaslat(d, 'hb_asci');
    d.op.s.hata = 0;
    // doğrudan ödülü çalıştır
    OPERASYONLAR.hb_asci.odulFn(d);
    expect(YR.varlik(d, 'ekmek')).toBe(4);
    expect(d.yer.altinHediye).toBe(1);
    expect(SAHNELER.hb_asci_son.metin(d)[0]).toMatch(/Altın kalite/);
  });
  test('beste: altı yıldız notası, kaydet; Julian yakınlığı', () => {
    const d = koloni();
    if (!d.yer.katilan.includes('julian')) d.yer.katilan.push('julian');
    const h = HB.hobi(d);
    h.taslak = [0, 2, 4, 5];
    const r = HB.besteKaydet(d);
    expect(r.metin).toMatch(/kaydedildi/);
    expect(r.notalar.length).toBe(4);
    expect(r.metin).toMatch(/Julian/);
    expect(HB.besteKaydet(d).metin).toMatch(/zaten/);
  });
  test('Altı Yıldız Zarı: üç tur, bahis', () => {
    const d = koloni();
    d.para = { gk: 500, ml: 0 };
    expect(HB.zarBaslat(d, 100).metin).toMatch(/Birinci tur/);
    HB.zarTekrar(d);
    HB.zarDur(d);
    HB.zarDur(d);
    const r = HB.zarDur(d);
    expect(r.bitti).toBe(true);
    expect([400, 500, 600]).toContain(d.para.gk);
  });
  test('jeotermal göl iskelesi oltayla çalışır', () => {
    const d = koloni();
    expect(NOKTALAR.gol_iskelesi.balik).toBe('jeotermal_gol');
    d.mekan = 'jeotermal_gol';
    const e = noktaEylemleri(d, 'gol_iskelesi').map((x) => x.id);
    expect(e).toContain('sh_olta');
    expect(eylemUygula(d, 'gol_iskelesi', 'sh_olta').olta).toBe('jeotermal_gol');
  });
  test('terminalde genom birleştirme; barınak noktasında yönetim', () => {
    const d = koloni();
    expect(noktaEylemleri(d, 'terminal').some((e) => e.id === 'hv_kulucka')).toBe(true);
    expect(eylemUygula(d, 'terminal', 'hv_kulucka').agac(d).baslik).toMatch(/Genom/);
    expect(eylemUygula(d, 'bakim_panosu', 'hv_barinak').agac(d).baslik).toMatch(/barınağı/);
  });
});
