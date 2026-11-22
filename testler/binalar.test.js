// v4 paketi Faz 2: evrensel bina rolleri, hazırlıklar, kilitli dört bina, Ar-Ge masası, dinamik yakıt, ikmal karakolu,
// yedek filo, melez zanaat, değer anonsu, alt kızak ve sınıf destekleri
import { describe, expect, test } from 'bun:test';
import { yeniOyun } from '../src/oyun/durum';
import * as G from '../src/oyun/gemi/gemi';
import * as BN from '../src/oyun/binalar';
import * as S from '../src/oyun/uzay/seyir';
import * as SV from '../src/oyun/uzay/savas';
import * as ZN from '../src/oyun/tonoflenya/zanaat';
import { filoGorevi, FILO_SN, harca, yeterMi } from '../src/oyun/koloni';
import { TESISLER } from '../src/oyun/veri/tesisler';
import { GEZEGENLER } from '../src/oyun/veri/gozlem';
import { acilImdat, kenetlen, zamanIlerle } from '../src/oyun/yuzey/gorevler';

describe('Evrensel bina sistemi', () => {
  test('roller, topluluk ve nöbet hızlandırması', () => {
    const d = yeniOyun(41);
    expect(BN.ROLLER.dokumhane).toEqual([3]);
    expect(Object.keys(BN.ROLLER).length).toBe(25);
    for (const k of Object.keys(BN.ROLLER)) expect(TESISLER[k]).toBeTruthy();
    const c0 = BN.rolCarpani(d, 'dokumhane');
    d.tamamlananOp = ['aethel9'];
    expect(BN.rolCarpani(d, 'dokumhane')).toBeCloseTo(c0 * 1.25, 5);
    d.zaman = { sn: 1200 }; // Kızıl Kuşluk: Varek, sanayi
    expect(BN.rolCarpani(d, 'dokumhane')).toBeCloseTo(1.25 * 1.15, 5);
  });

  test('sefer hazırlığı: ziyafet ve istihbarat bir sonraki çatışmada harcanır', () => {
    const d = yeniOyun(42);
    G.gemiOlustur(d, 1);
    d.koloni.binalar.push('koloni_mutfagi', 'kuantum_lab');
    expect(BN.hazirlikYap(d, 'ziyafet').ses).toBe('dugme');
    expect(BN.hazirlikYap(d, 'istihbarat').ses).toBe('dugme');
    expect(BN.hazirlikYap(d, 'kalibrasyon').ses).toBe('red');
    SV.savasBaslat(d, 'korsan_avci');
    expect(d.savas.ziyafet).toBe(2);
    expect(d.savas.sizma).toBe(true);
    expect(d.hazirlik.ziyafet).toBeFalsy();
  });

  test('kilitli dört bina büyük operasyonlarla açılır', () => {
    const d = yeniOyun(43);
    expect(TESISLER.akademi.kosul(d)).toBe(false);
    d.tamamlananOp = ['sektor15', 'xerad'];
    expect(TESISLER.akademi.kosul(d)).toBe(true);
    expect(TESISLER.kseno_habitat.kosul(d)).toBe(false);
    d.tamamlananOp.push('g14', 'moloz_kusagi');
    expect(TESISLER.kseno_habitat.kosul(d)).toBe(true);
    d.tamamlananOp.push('aethel9');
    expect(TESISLER.multeci_kampusu.kosul(d)).toBe(false);
    d.tamamlananOp.push('tarras');
    expect(TESISLER.multeci_kampusu.kosul(d)).toBe(true);
    d.tamamlananOp.push('yanan_gemi');
    expect(TESISLER.tina_cekirdegi.kosul(d)).toBe(true);
  });

  test('Ar-Ge masası: numune teslimi bilim puanı ve eşik bonusları verir', () => {
    const d = yeniOyun(44);
    d.numuneler = Object.keys(GEZEGENLER).slice(0, 5);
    expect(BN.numuneTeslim(d).ses).toBe('red');
    d.koloni.binalar.push('akademi');
    const r = BN.numuneTeslim(d);
    expect(r.metin).toContain('kalkan');
    expect(d.yan.bilim).toBe(1250);
    expect(SV.numuneSayisi(d)).toBe(5);
    d.numuneler = Object.keys(GEZEGENLER);
    BN.numuneTeslim(d);
    expect(d.bayrak.galaktikKasif).toBe(true);
  });

  test('dinleme kulesinin menzili gezegen halkalarını açar', () => {
    const d = yeniOyun(45);
    const sahip = SV.sahip;
    expect(BN.kuleMenzili(d, sahip)).toBe(0);
    d.koloni.binalar.push('sinyal_kulesi');
    expect(BN.kuleMenzili(d, sahip)).toBe(2);
    d.koloni.parcalar.mod_burun = 1;
    d.koloni.parcalar.mod_sinyal_cozucu = 1;
    expect(BN.kuleMenzili(d, sahip)).toBe(3);
    d.koloni.binalar.push('komuta_merkezi');
    d.koloni.parcalar.mod_arsivleyici = 1;
    expect(BN.kuleMenzili(d, sahip)).toBe(5);
  });
});

describe('Dinamik yakıt ve ikmal', () => {
  test('zincirleme mesafe, sınıf tabanı, Sinha nöbeti, yük ve Zephyr teknolojisi', () => {
    const d = yeniOyun(46);
    G.gemiOlustur(d, 1);
    d.uzay = { x: 0, y: 0, yon: 0, hiz: 0, yaklasilan: {}, halka: 0 };
    d.zaman = { sn: 0 };
    expect(S.halka('p13')).toBe(4);
    expect(S.rotaYakiti(d, 'p13')).toBe(20); // 4 birim × 5 L
    d.uzay.halka = 3;
    expect(S.rotaYakiti(d, 'p13')).toBe(5); // fark 1
    d.uzay.halka = 4;
    expect(S.rotaYakiti(d, 'p14')).toBe(5); // aynı halkada komşu 1 birim
    expect(S.rotaYakiti(d, 'p14', 0.9)).toBe(6.3); // ağır ambar +%25 (yuvarlanmış)
    d.zaman.sn = 4 * 1200; // Mavi Akşam
    expect(S.rotaYakiti(d, 'p14')).toBe(4.5);
    d.tamamlananOp = ['p07'];
    expect(S.rotaYakiti(d, 'p14')).toBeCloseTo(3.8, 1);
  });

  test('yakıt yetmeyince imdat: 10 kredi ya da korsan ateşi; kızağa çekilir', () => {
    const d = yeniOyun(47);
    G.gemiOlustur(d, 1);
    d.gemi.yer = 'uzay';
    d.uzay = { x: 0, y: 0, yon: 0, hiz: 0, yaklasilan: {} };
    d.para = { ml: 0, gk: 30 };
    acilImdat(d);
    expect(d.para.gk).toBe(20);
    expect(d.sahne).toBe('kurtarma');
    expect(d.gemi.yer).toBe('kizak');
    d.para.gk = 0;
    const g0 = d.gemi.govde;
    acilImdat(d);
    expect(d.gemi.govde).toBeLessThan(g0);
  });

  test('ikmal karakolu: görevi bitmiş noktaya kurulur, uğrayınca yakıt ve onarım', () => {
    const d = yeniOyun(48);
    G.gemiOlustur(d, 3);
    d.gemi.yer = 'uzay';
    const n = S.UZAY_NOKTALARI.g01;
    d.harita.poiler.push(n.poi);
    d.uzay = { x: n.x, y: n.y - 10, yon: 0, hiz: 0, yaklasilan: {}, halka: 1 };
    d.tamamlananOp = ['g01'];
    d.koloni.parcalar.ikmal_karakolu = 1;
    d.gemi.yakit = 30;
    const r = kenetlen(d);
    expect(d.karakollar).toContain('g01');
    expect(r.metin).toContain('ikmal karakolu');
    expect(d.gemi.yakit).toBe(d.gemi.maxYakit);
    d.gemi.yakit = 5;
    d.gemi.govde = 10;
    kenetlen(d);
    expect(d.gemi.yakit).toBe(d.gemi.maxYakit);
    expect(d.gemi.govde).toBe(d.gemi.maxGovde);
  });

  test('yedek filo boşta yatmaz: destek gemisi dışındakiler maden taşır', () => {
    const d = yeniOyun(49);
    d.filo = [{ sinif: 2, ad: 'A' }, { sinif: 3, ad: 'B' }];
    d.destekNo = 0;
    const t0 = d.koloni.kaynaklar.titanyum || 0;
    filoGorevi(d, FILO_SN);
    expect(d.koloni.kaynaklar.titanyum).toBe(t0 + 3);
    expect(d.koloni.kaynaklar.kristal).toBeGreaterThanOrEqual(1);
  });
});

describe('Melez zanaat, değer anonsu ve araçlar', () => {
  test('melez taslak üretim yeri, gözetmen indirimi ve nöbet kuyruğu', () => {
    const d = yeniOyun(50);
    G.gemiOlustur(d, 1);
    ZN.hazirla(d);
    expect(ZN.uretimYeri(d, 'sonik_tufek')).toBeTruthy();
    d.koloni.binalar.push('dokumhane');
    d.koloni.seviye = 3;
    expect(ZN.uretimYeri(d, 'sonik_tufek')).toBe(null);
    const g = ZN.tarifGirdisi(d, 'sonik_tufek');
    d.gozetmen = { mirelza: true };
    const g2 = ZN.tarifGirdisi(d, 'sonik_tufek');
    expect(g2.rezonans_cami).toBeLessThan(g.rezonans_cami);
    Object.assign(d.koloni.kaynaklar, { rezonans_cami: 30, oksit_celik: 20 });
    Object.assign(d.koloni.parcalar, { polimer_levha: 30, mikrocip: 10 });
    d.zaman = { sn: 0 };
    const r = ZN.zanaatEt(d, 'sonik_tufek');
    expect(r.metin).toContain('3 Yıldız Nöbeti');
    expect(ZN.miktar(d, 'sonik_tufek')).toBe(0);
    d.zaman.sn = 3 * 1200;
    const s = ZN.zanaatIlerle(d);
    expect(s[0]).toContain('usta işi');
    expect(ZN.miktar(d, 'sonik_tufek')).toBe(1);
    // Savaşta: frekans kalkanını iki tur kilitler
    d.kusanilan.silah = 'sonik_tufek';
    d.tamamlananOp = Array.from({ length: 10 }, (_, i) => 'x' + i);
    SV.savasBaslat(d, 'yabanci_firkateyn');
    d.savas.dusman.aci = 0;
    SV.savasGirdi(d, { tur: 'dokun', parmak: 1 });
    expect(d.savas.dusman.kalkanKilit).toBe(2);
  });

  test('her eşya ne işe yaradığını tek cümlede söyler', () => {
    for (const k of ['dondurucu_kopuk', 'topraklama_cubugu', 'sonik_kovucu', 'ikmal_karakolu', 'sismik_dengeleyici', 'notralizasyon_kulesi', 'mod_burun', 'mod_bolme_a', 'esya_termal_giysi', 'mod_govde', 'plazma_tufegi', 'kemik_zirh', 'kseno_panzehir']) {
      expect(ZN.degerCumlesi(k).length).toBeGreaterThan(20);
    }
    const d = yeniOyun(51);
    G.gemiOlustur(d, 1);
    const m = ZN.zanaatMenu(d, 'melez');
    expect(m.ogeler.length).toBe(10);
    expect(m.ogeler[0].etiket).toContain('Kemik-Alaşım');
  });

  test('alt kızak: sınıfa göre araç taşır; gezegen çatışmasında eşlik eder', () => {
    const d = yeniOyun(52);
    G.gemiOlustur(d, 1);
    d.araclar = ['mammoth', 'akrep'];
    G.aracYukle(d);
    expect(d.gemi.tasinan).toEqual(['akrep']); // Kıvılcım yalnız Akrep taşır
    const k = yeniOyun(53);
    G.gemiOlustur(k, 3);
    k.araclar = ['mammoth'];
    G.aracYukle(k);
    expect(k.gemi.tasinan).toEqual(['mammoth']);
    SV.savasBaslat(k, { dusmanlar: ['biyom_yaratigi'], ortam: 'kara', gezegen: true });
    expect(k.savas.arac).toBe('mammoth');
  });

  test('piezo kristali silikat kristalinin yerine geçer; 1 GK = 25 ML', () => {
    const d = yeniOyun(54);
    d.koloni.kaynaklar.kristal = 0;
    d.koloni.kaynaklar.piezo = 2;
    expect(yeterMi(d, { kristal: 2 })).toBe(true);
    harca(d, { kristal: 2 });
    expect(d.koloni.kaynaklar.piezo).toBe(0);
    expect(ZN.GK_ML).toBe(25);
  });

  test('sınıf destekleri: Hisar yaylımı kalkanı kırar, Rüzgarkıran ganimeti artırır', () => {
    const d = yeniOyun(55);
    G.gemiOlustur(d, 3);
    d.filo = [{ sinif: 5, ad: 'Hisar' }];
    SV.savasBaslat(d, 'korsan_korvet');
    d.gemi.govde = d.gemi.maxGovde = 99999;
    for (let i = 0; i < 3000 && d.savas && d.savas.raunt < 3; i++) SV.savasIlerle(d, 0.1);
    expect(d.savas.dusman.delik).toBe(true);
    const e = yeniOyun(56);
    G.gemiOlustur(e, 3);
    e.filo = [{ sinif: 2, ad: 'R' }];
    SV.savasBaslat(e, 'korsan_avci');
    const kat = 1 + 0.3 * (e.savas.dusman.tier - 1);
    e.savas.dusman.govde = 1;
    e.savas.dusman.aci = 0;
    SV.savasGirdi(e, { tur: 'dokun', parmak: 1 });
    expect(e.savasSon.ganimet.plaka).toBe(Math.round(Math.round(40 * kat) * 1.35));
  });
});
