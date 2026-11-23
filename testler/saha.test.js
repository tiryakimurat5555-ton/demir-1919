// 4.3: Derin Maden Ocağı, Kıyı Koruluğu, aletler, karakollar, balıkçılık (v5 Paket 5, 6, 13)
import { describe, expect, test } from 'bun:test';
import { yeniOyun } from '../src/oyun/durum';
import * as KM from '../src/oyun/komuta';
import { zamanIlerle, eylemUygula, noktaEylemleri } from '../src/oyun/yuzey/gorevler';
import * as YR from '../src/oyun/yerlesim/yerlesim';
import * as SH from '../src/oyun/saha/saha';
import * as BK from '../src/oyun/saha/balik';
import { yakindakiler } from '../src/oyun/yuzey/dunya';
import { NOKTALAR, MEKANLAR } from '../src/oyun/yuzey/harita';
import * as Z from '../src/oyun/zaman';
import * as ZN from '../src/oyun/tonoflenya/zanaat';

function koloni(tohum = 5) {
  const d = yeniOyun(tohum);
  d.sahne = null;
  Object.assign(d.bayrak, { sondaj: true, kazi: true, dokumhane: true, kule: true });
  for (const r of Object.keys(d.koloni.kaynaklar)) d.koloni.kaynaklar[r] = 60;
  const k = KM.komuta(d);
  for (const s of Object.keys(k.sektor)) k.sektor[s] = { durum: 'guvenli', karakol: null };
  zamanIlerle(d, 1);
  d.haberKuyrugu = [];
  if (!d.koloni.binalar.includes('dokumhane')) d.koloni.binalar.push('dokumhane');
  return d;
}
const madendeKat = (d, kat) => {
  d.bayrak.madenAcik = true;
  SH.hazirla(d);
  if (!d.saha.duraklar.includes(kat)) d.saha.duraklar.push(kat);
  const m = SH.asansorMenu(d, true);
  const o = m.ogeler.find((x) => x.id === 'k' + kat);
  return o.yap(d);
};
const vurBitir = (d, id) => {
  let r;
  for (let i = 0; i < 10; i++) {
    r = SH.vur(d, id);
    if (!/^\d+ \/ \d+/.test(r.metin)) break;
  }
  return r;
};

describe('Derin Maden Ocağı', () => {
  test('Kaelon madeni açar; maden ağzı vadide görünür; asansör Kat 1', () => {
    const d = koloni();
    d.mekan = 'vadi';
    expect(yakindakiler(d).some((n) => n.id === 'maden_agzi')).toBe(false);
    const m = YR.kisiMenu(d, 'kaelon');
    const o = m.ogeler.find((x) => x.id === 'maden_ac');
    expect(o).toBeTruthy();
    expect(o.yap(d).metin).toMatch(/asansör/);
    expect(d.bayrak.madenAcik).toBe(true);
    expect(yakindakiler(d).some((n) => n.id === 'maden_agzi')).toBe(true);
    const r = eylemUygula(d, 'maden_agzi', 'sh_asansor');
    expect(r.agac(d).ogeler.some((x) => x.id === 'k1')).toBe(true);
  });
  test('Kat 1: taş kazma ile vuruşlar, çanta, tükenme, merdiven ve Kat 5', () => {
    const d = koloni();
    madendeKat(d, 1);
    expect(d.mekan).toBe('maden_1');
    const ids = yakindakiler(d).filter((n) => NOKTALAR[n.id] && NOKTALAR[n.id].saha === 'damar').map((n) => n.id);
    expect(ids.length).toBe(3);
    expect(yakindakiler(d).some((n) => NOKTALAR[n.id] && NOKTALAR[n.id].saha === 'merdiven')).toBe(false);
    expect(SH.vur(d, 'md_1_0').metin).toBe('1 / 3.');
    SH.vur(d, 'md_1_0');
    const r = SH.vur(d, 'md_1_0');
    expect(r.metin).toMatch(/çantaya/);
    expect(SH.cantaDolu(d)).toBeGreaterThan(0);
    expect(yakindakiler(d).some((n) => n.id === 'md_1_0')).toBe(false);
    vurBitir(d, 'md_1_1');
    expect(yakindakiler(d).some((n) => n.id === 'md_1_3')).toBe(true);
    const ines = eylemUygula(d, 'md_1_3', 'sh_in');
    expect(ines.metin).toMatch(/Kat 5/);
    expect(d.mekan).toBe('maden_5');
    expect(d.saha.duraklar).toContain(5);
    // Yüzeye çıkış: çanta depoya
    const once = d.koloni.kaynaklar.bazalt + (d.koloni.kaynaklar.komur || 0) + (d.koloni.kaynaklar.ham_kil || 0) + (d.koloni.kaynaklar.demir_cevheri || 0) + (d.koloni.kaynaklar.bakir || 0);
    const y = SH.asansorMenu(d, false).ogeler.find((x) => x.id === 'yuzey').yap(d);
    expect(y.metin).toMatch(/deposuna/);
    expect(d.mekan).toBe('vadi');
    const sonra = d.koloni.kaynaklar.bazalt + (d.koloni.kaynaklar.komur || 0) + (d.koloni.kaynaklar.ham_kil || 0) + (d.koloni.kaynaklar.demir_cevheri || 0) + (d.koloni.kaynaklar.bakir || 0);
    expect(sonra).toBeGreaterThan(once);
    expect(SH.cantaDolu(d)).toBe(0);
  });
  test('kademe denetimi: Kat 15 gümüş damarı demir kazma ister; yükseltme bedeli', () => {
    const d = koloni();
    madendeKat(d, 15);
    d.saha.tehlike[15] = 'temiz';
    d.savasBekle = null;
    expect(SH.vur(d, 'md_15_0').metin).toMatch(/Kademe 2/);
    Object.assign(d.koloni.kaynaklar, { demir_cevheri: 0, komur: 0 });
    expect(SH.aletYukselt(d, 'kazma').metin).toMatch(/Eksik/);
    Object.assign(d.koloni.kaynaklar, { demir_cevheri: 20, komur: 10, kiyi_kerestesi: 5 });
    expect(SH.aletYukselt(d, 'kazma').metin).toMatch(/demir döküm kazma hazır/);
    expect(d.saha.alet.kazma).toBe(2);
    let n = 0;
    let r;
    do {
      r = SH.vur(d, 'md_15_0');
      n++;
    } while (/^\d+ \/ \d+/.test(r.metin));
    expect(n).toBe(4);
  });
  test('kaya duvarı: Mammoth tek darbe, gizli oda ve kestirme merdiven', () => {
    const d = koloni();
    d.araclar = ['mammoth'];
    d.bayrak.madenAcik = true;
    SH.hazirla(d);
    d.saha.duraklar.push(15);
    const m1 = SH.asansorMenu(d, true);
    expect(m1.giris).toMatch(/eşlik/);
    m1.ogeler.find((x) => x.id === 'mammoth').alt(d);
    expect(d.saha.eslik).toBe('mammoth');
    SH.asansorMenu(d, true).ogeler.find((x) => x.id === 'k15').yap(d);
    d.savasBekle = null;
    const r = SH.vur(d, 'md_15_3');
    expect(r.metin).toMatch(/tek darbede/);
    expect(SH.merdivenAcik(d, 15)).toBe(true);
  });
  test('çanta sınırı 25; Demir Kervan sınırı kaldırır', () => {
    const d = koloni();
    madendeKat(d, 1);
    d.saha.canta = { bazalt: 25 };
    expect(vurBitir(d, 'md_1_0').metin).toMatch(/Çantan dolu/);
    d.saha.eslik = 'demir_kervan';
    expect(vurBitir(d, 'md_1_0').metin).toMatch(/çantaya/);
  });
  test('tehlike: akrep dronu ya da akustik fener uyarır; saldırınca kara çatışması, zaferde temizlenir', () => {
    const d = koloni();
    d.araclar = ['akrep'];
    d.bayrak.madenAcik = true;
    SH.hazirla(d);
    d.saha.eslik = 'akrep';
    d.saha.eslikSoruldu = true;
    d.saha.duraklar.push(20);
    const r = SH.asansorMenu(d, true).ogeler.find((x) => x.id === 'k20').yap(d);
    expect(r.metin).toMatch(/hareket var/);
    expect(d.savasBekle).toBeFalsy();
    expect(yakindakiler(d).some((n) => n.id === 'md_20_3')).toBe(true);
    const s = eylemUygula(d, 'md_20_3', 'sh_saldir');
    expect(s.kapat).toBe(true);
    expect(d.savasBekle.dusmanlar).toContain('tunel_pusucusu');
    expect(d.savasBekle.arac).toBe('akrep');
    // zafer kancası
    const { ZAFER_KANCALARI } = require('../src/oyun/kancalar');
    ZAFER_KANCALARI.saha_zafer(d);
    expect(d.saha.tehlike[20]).toBe('temiz');
    expect(yakindakiler(d).some((n) => n.id === 'md_20_3')).toBe(false);
  });
  test('karakol: kurulur, dinlenme, Demir Kervan ile günlük akış', () => {
    const d = koloni();
    madendeKat(d, 10);
    d.savasBekle = null;
    Object.assign(d.koloni.kaynaklar, { kiyi_kerestesi: 20, demir_cevheri: 10 });
    d.esya = { ...(d.esya || {}), tugla: 10 };
    const r = eylemUygula(d, 'maden_karakol_10', 'sh_karakol');
    expect(r.metin).toMatch(/kuruldu/);
    expect(d.saha.karakollar).toContain('kat10');
    d.zehir = 40;
    eylemUygula(d, 'maden_karakol_10', 'sh_dinlen');
    expect(d.zehir).toBe(0);
    d.araclar = ['demir_kervan'];
    const once = d.koloni.kaynaklar.komur || 0;
    d.zaman.sn += Z.GUN_SN;
    zamanIlerle(d, 0.01);
    expect(d.koloni.kaynaklar.komur).toBe(once + 2);
  });
});

describe('İç Deniz Kıyı Koruluğu ve balıkçılık', () => {
  const kiyi = () => {
    const d = koloni();
    d.gorulenMekanlar = [...(d.gorulenMekanlar || []), 'sirtlar'];
    const o = YR.kisiMenu(d, 'zarek').ogeler.find((x) => x.id === 'kiyi_ac');
    expect(o).toBeTruthy();
    o.yap(d);
    d.mekan = 'kiyi';
    d.oyuncu = { x: 4605, y: 25, yon: 0 };
    zamanIlerle(d, 0.01);
    d.savasBekle = null;
    return d;
  };
  test('Zarek kıyıyı açar; ağaç kesimi, yaşlı ağaç çelik balta ister, düğüm yeniden belirir', () => {
    const d = kiyi();
    expect(d.bayrak.kiyiAcik).toBe(true);
    expect(MEKANLAR.kiyi).toBeTruthy();
    const ag = Object.keys(NOKTALAR).find((k) => NOKTALAR[k].dugum === 'orta_agac');
    let n = 0;
    let r;
    do {
      r = SH.vur(d, ag);
      n++;
    } while (/^\d+ \/ \d+/.test(r.metin));
    expect(n).toBe(4);
    expect(r.metin).toMatch(/devrildi/);
    expect(d.saha.canta.kiyi_kerestesi).toBeGreaterThanOrEqual(3);
    expect(yakindakiler(d).some((x) => x.id === ag)).toBe(false);
    d.zaman.sn += 400;
    expect(yakindakiler(d).some((x) => x.id === ag)).toBe(true);
    const yasli = Object.keys(NOKTALAR).find((k) => NOKTALAR[k].dugum === 'yasli_agac');
    expect(SH.vur(d, yasli).metin).toMatch(/Kademe 2/);
  });
  test('balık: bekle, şlap, tasma, çekme, gerginlikte kopma, yakalama', () => {
    const d = kiyi();
    const r = eylemUygula(d, 'balik_sig', 'sh_olta');
    expect(r.olta).toBe('sig_kiyi');
    BK.oltaBaslat(d, 'sig_kiyi');
    expect(BK.oltaDokun(d)[0].soz).toMatch(/Çok erken/);
    let ol = [];
    for (let i = 0; i < 100 && d.olta.evre === 'bekle'; i++) ol = BK.oltaIlerle(d, 0.1, false);
    expect(ol.some((x) => x.ses === 'balik_slap')).toBe(true);
    BK.oltaDokun(d);
    // av hurda değilse çekme evresi
    if (d.olta.evre === 'cekme') {
      // hep çekersen ip kopar
      let kopma = false;
      for (let i = 0; i < 200 && !kopma; i++) kopma = BK.oltaIlerle(d, 0.1, true).some((x) => x.ses === 'misina_kop');
      expect(kopma).toBe(true);
    }
    // ikinci deneme: gerginliğe göre çek ve bırak
    let yakalandi = false;
    for (let tur = 0; tur < 5 && !yakalandi; tur++) {
      for (let i = 0; i < 100 && d.olta.evre === 'bekle'; i++) BK.oltaIlerle(d, 0.1, false);
      BK.oltaDokun(d);
      if (d.olta.evre !== 'cekme') {
        yakalandi = true;
        break;
      }
      for (let i = 0; i < 400 && !yakalandi; i++) {
        const ol2 = BK.oltaIlerle(d, 0.1, d.olta.g < 0.6);
        if (ol2.some((x) => x.yakalandi)) yakalandi = true;
      }
    }
    expect(yakalandi).toBe(true);
  });
  test('basit mod: ısırmada tek dokunuş yakalar; termal akıntı ve kayalık koy kilitleri', () => {
    const d = kiyi();
    BK.basitModAyarla(true);
    BK.oltaBaslat(d, 'sig_kiyi');
    for (let i = 0; i < 100 && d.olta.evre === 'bekle'; i++) BK.oltaIlerle(d, 0.1, false);
    const ol = BK.oltaDokun(d);
    expect(ol.some((x) => x.yakalandi)).toBe(true);
    BK.basitModAyarla(false);
    expect(eylemUygula(d, 'balik_termal', 'sh_olta').metin).toMatch(/Kat 10/);
    expect(eylemUygula(d, 'balik_kayalik', 'sh_olta').metin).toMatch(/Kademe 2/);
    d.araclar = ['atmosphere_x'];
    expect(eylemUygula(d, 'balik_kayalik', 'sh_olta').olta).toBe('kayalik');
  });
  test('yorgunluk: vuruşlarla artar; aşhanede yemek giderir', () => {
    const d = kiyi();
    d.saha.yorgunluk = 100;
    const ag = Object.keys(NOKTALAR).find((k) => NOKTALAR[k].dugum === 'tuz');
    expect(SH.vur(d, ag).metin).toMatch(/yorgunsun/);
    d.yer.binalar.push('meydan', 'ashane');
    d.tarim.urun.akifer = 3;
    expect(noktaEylemleri(d, 'yb_ashane').some((e) => e.id === 'yemek')).toBe(true);
    eylemUygula(d, 'yb_ashane', 'yemek');
    expect(d.saha.yorgunluk).toBe(0);
  });
  test('aletler menüsü terminalde; bileme', () => {
    const d = koloni();
    expect(noktaEylemleri(d, 'terminal').some((e) => e.id === 'sh_aletler')).toBe(true);
    const m = eylemUygula(d, 'terminal', 'sh_aletler').agac(d);
    expect(m.ogeler.length).toBe(5);
    SH.hazirla(d).yip.kazma = 70;
    Object.assign(d.koloni.kaynaklar, { demir_cevheri: 5 });
    expect(SH.aletBile(d, 'kazma').metin).toMatch(/bilendi/);
    void ZN;
  });
});
