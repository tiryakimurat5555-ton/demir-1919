// Eşya, zanaat ve mürettebat (2.4): subaylar, istasyonlar, envanter, zanaat, ticaret, kargo, ekol kıdemi,
// savaşta subay yetenekleri ve teçhizat, rastgele seyir karşılaşmaları
import { describe, expect, test } from 'bun:test';
import { yeniOyun } from '../src/oyun/durum';
import { MEKANLAR, NOKTALAR } from '../src/oyun/yuzey/harita';
import { eylemUygula, noktaEylemleri, zamanIlerle } from '../src/oyun/yuzey/gorevler';
import { gemiOlustur } from '../src/oyun/gemi/gemi';
import * as ZN from '../src/oyun/tonoflenya/zanaat';
import * as SB from '../src/oyun/tonoflenya/subay';
import { Z_NOKTALAR } from '../src/oyun/tonoflenya/zanaatHarita';
import { savasBaslat, savasGirdi, savasIlerle, yetenekler } from '../src/oyun/uzay/savas';
import { seferIlerle, SAHNELER as SEFER } from '../src/oyun/uzay/sefer';
import { OPERASYONLAR } from '../src/oyun/veri/uzayGorevleri';

function hazir() {
  const d = yeniOyun(11);
  d.sahne = null;
  gemiOlustur(d, 3);
  d.bayrak.ygkKayit = true;
  d.bayrak.tonoflenyaGoruldu = true;
  ZN.hazirla(d);
  return d;
}

describe('Eşya, zanaat ve mürettebat', () => {
  test('yeni noktalar kendi mekânlarının içinde; noktalar menü ağacı açar', () => {
    for (const id of Object.keys(Z_NOKTALAR)) {
      const n = NOKTALAR[id];
      const a = MEKANLAR[n.mekan].alan;
      expect(n.x >= a.bati && n.x <= a.dogu && n.y >= a.guney && n.y <= a.kuzey).toBe(true);
    }
    const d = hazir();
    expect(noktaEylemleri(d, 'subay_kurulu').some((e) => e.id === 'z_kurul')).toBe(true);
    const r = eylemUygula(d, 'uma_pazari', 'z_pazar');
    expect(typeof r.agac).toBe('function');
    const m = r.agac(d);
    expect(m.ogeler.length).toBeGreaterThan(1);
  });

  test('çekirdek subay kurulu ve prosedürel istihdam; pasif katkılar', () => {
    const d = hazir();
    expect(SB.taramaCarpani(d)).toBe(1);
    ZN.cekirdekAl(d, 'sinha');
    expect(d.istasyonlar.sonar.anahtar).toBe('sinha');
    expect(SB.taramaCarpani(d)).toBeCloseTo(1.35);
    ZN.cekirdekAl(d, 'axira');
    d.koloni.moral = 50;
    SB.moralKaybi(d, 10);
    expect(d.koloni.moral).toBe(45);
    // Limandan aday: ücret ister, istasyonuna oturur
    d.para.ml = 10000;
    const a = ZN.adaylar(d, 'julithan_limani');
    expect(a.length).toBe(2);
    const ist = SB.ISTASYON_SIRASI.find((x) => SB.ISTASYONLAR[x].ekol === a[0].ekol);
    if (ist !== 'sonar' && ist !== 'revir') {
      const r = ZN.istihdamEt(d, 'julithan_limani', 0);
      expect(r.ses).not.toBe('red');
      expect(d.istasyonlar[ist].ad).toBe(a[0].ad);
      expect(SB.guc(d, ist)).toBeGreaterThan(0.4);
      expect(SB.guc(d, ist)).toBeLessThan(1);
    }
    expect(ZN.istasyonMetni(d, 'sonar')).toContain('Sinha');
  });

  test('zanaat, envanter, kuşanma, modül, kullanma, reaktör ve dökümhane', () => {
    const d = hazir();
    const k = d.koloni.kaynaklar;
    Object.assign(k, { oksit_celik: 30, kizilkaya_titanyumu: 10, safran_kukurt: 2, izotop: 2, titanyum: 10, aether: 5 });
    expect(ZN.zanaatEt(d, 'plazma_tufegi').ses).toBe('red');
    ZN.zanaatEt(d, 'plazma_kartusu');
    expect(ZN.miktar(d, 'plazma_kartusu')).toBe(2);
    expect(ZN.zanaatEt(d, 'plazma_tufegi').ses).toBe('kaynak');
    expect(ZN.miktar(d, 'plazma_tufegi')).toBe(1);
    expect(ZN.kategoriOgeleri(d, 0)).toContain('plazma_tufegi');
    ZN.kusan(d, 'plazma_tufegi');
    expect(d.kusanilan.silah).toBe('plazma_tufegi');
    // Zırh delici mühimmat Kırmızı 3. kademe ister
    expect(ZN.zanaatEt(d, 'aether_muhimmati').ses).toBe('red');
    SB.ekolKazan(d, 'varek', 300);
    expect(SB.kabiliyet(d, 'varek', 3)).toBe(true);
    expect(ZN.zanaatEt(d, 'aether_muhimmati').ses).toBe('kaynak');
    expect(ZN.miktar(d, 'aether_muhimmati')).toBe(3);
    // Gemi modülü: Filtra plakaları azami gövdeyi 1,5 katına çıkarır
    const once = d.gemi.maxGovde;
    ZN.zanaatEt(d, 'filtra_plakalari');
    ZN.kusan(d, 'filtra_plakalari');
    expect(d.gemi.maxGovde).toBe(Math.round(once * 1.5));
    ZN.kusan(d, 'filtra_plakalari');
    expect(d.gemi.maxGovde).toBe(once);
    // Reaktöre yükle: Elyndra yüzde yirmi beş fazla
    d.gemi.yakit = 0;
    ZN.reaktoreYukle(d, 'aether');
    expect(d.gemi.yakit).toBe(10);
    ZN.cekirdekAl(d, 'elyndra');
    ZN.reaktoreYukle(d, 'aether');
    expect(d.gemi.yakit).toBe(10 + 13);
    // Dökümhane
    const p = d.koloni.parcalar.zirhli_plaka || 0;
    ZN.dokumhaneyeGonder(d, 'oksit_celik');
    expect(d.koloni.parcalar.zirhli_plaka).toBe(p + 20);
    // İmbik ve kullanma
    d.esya.bal = 1;
    d.tarim = d.tarim || { urun: {}, tohumlar: {} };
    d.tarim.urun.akifer = 1;
    d.tarim.urun.soya = 1;
    ZN.zanaatEt(d, 'malken_rasyonu');
    ZN.kullan(d, 'malken_rasyonu');
    expect(d.seferEtki.rasyon).toBe(1);
    // Envanter menüsü beş kategoride döner
    const m = ZN.envanterMenu(d, 4);
    expect(m.ikiParmak.sag(d).baslik).toContain('1.');
  });

  test('para: veri paketleri, bakım, ticaret ve kur', () => {
    const d = hazir();
    d.tamamlananOp = ['g01', 'g02'];
    d.kodeks.push({ id: 'x1', ad: 'x' });
    const r = ZN.veriSat(d);
    expect(d.para.gk).toBe(2 * 150 + d.kodeks.length * 25);
    expect(ZN.veriSat(d).ses).toBe('red');
    d.gemi.govde = d.gemi.maxGovde - 40;
    ZN.cekirdekAl(d, 'drahmir');
    expect(ZN.bakimMaliyeti(d)).toBe(16);
    const gk = d.para.gk;
    ZN.bakimYap(d);
    expect(d.gemi.govde).toBe(d.gemi.maxGovde);
    expect(d.para.gk).toBe(gk - 16);
    ZN.krediBoz(d, 100);
    expect(d.para.ml).toBe(200);
    ZN.satinAl(d, 'uma_pazari', 'deri_astar');
    expect(ZN.miktar(d, 'deri_astar')).toBe(1);
    expect(d.para.ml).toBe(160);
    d.koloni.kaynaklar.aether = 5;
    ZN.sat(d, 'uma_pazari', 'aether', true);
    expect(d.para.ml).toBe(260);
    ZN.kurIslem(d, 2);
    expect(d.koloni.kaynaklar.isik_tozu).toBe(2);
    expect(ZN.satinAl(d, 'tentran_tuccari', 'tentran_rolesi').ses).toBe('red');
  });

  test('kargo taşkını sıçrama yakıtını artırır; kara kristal Sinha uyarısı; şarj', () => {
    const d = hazir();
    expect(ZN.sicramaYakiti(d)).toBe(10);
    d.koloni.kaynaklar.oksit_celik = 500;
    expect(ZN.kargo(d).asim).toBe(true);
    expect(ZN.sicramaYakiti(d)).toBe(15);
    d.koloni.kaynaklar.kara_aether = 6;
    ZN.kargoDenetle(d);
    expect(d.haberKuyrugu.some((x) => x.includes('kara kristal'))).toBe(true);
    ZN.sarjBaslat(d);
    expect(ZN.sicramaDurumu(d)).toContain('şarj');
    d.esya.tentran_modulatoru = 1;
    ZN.kusan(d, 'tentran_modulatoru');
    ZN.sarjBaslat(d);
    expect(ZN.sarjKalan(d)).toBe(7200);
  });

  test('ekol kıdemi: kademe atlayınca kabiliyet açılır, haber düşer; türetilen puanlar', () => {
    const d = hazir();
    expect(SB.ekolKademe(d, 'sinha')).toBe(1);
    const m = SB.ekolKazan(d, 'sinha', 120);
    expect(m).toContain('Seyrüsefer Uzmanı');
    expect(SB.kabiliyet(d, 'sinha', 2)).toBe(true);
    d.tamamlananOp = ['g01'];
    d.gorulenMekanlar = ['ygk_5', 'ygk_1'];
    const o = zamanIlerle(d, 1);
    expect(SB.ekolPuani(d, 'zhaor')).toBe(20 + 20);
    expect(o.some((x) => x.tur === 'haber' && x.acil)).toBe(true);
    expect(ZN.ekolMenu(d).ogeler.length).toBe(6);
  });

  test('savaşta subay yetenekleri, teçhizat ve teleport', () => {
    const d = hazir();
    ZN.cekirdekAl(d, 'varek');
    ZN.cekirdekAl(d, 'drahmir');
    savasBaslat(d, 'korsan_avci');
    expect(yetenekler(d).map((y) => y.id)).toEqual(['odak', 'kizil', 'kaynak']);
    const s = d.savas;
    s.dusman.aci = 0;
    // Aşağı kaydır: Kızıl Odak seçilir; çift dokun: kalkanı yok sayan atış
    savasGirdi(d, { tur: 'kaydir', yon: 'asagi', parmak: 1 });
    const g0 = s.dusman.govde;
    savasGirdi(d, { tur: 'cift' });
    expect(s.dusman.govde).toBeLessThan(g0);
    expect(s.bekleme.kizil).toBeGreaterThan(0);
    expect(savasGirdi(d, { tur: 'cift' })[0].ses).toBe('red');
    // Acil kaynak gövdeyi onarır
    d.gemi.govde = 10;
    savasGirdi(d, { tur: 'kaydir', yon: 'asagi', parmak: 1 });
    savasGirdi(d, { tur: 'cift' });
    expect(d.gemi.govde).toBeGreaterThan(10);
    // Mor 4. kademe teleport: uyarıda üç parmakla dokun
    SB.ekolKazan(d, 'elyndra', 700);
    for (let i = 0; i < 200 && d.savas && !d.savas.uyari; i++) savasIlerle(d, 0.1);
    if (d.savas && d.savas.uyari) {
      const r = savasGirdi(d, { tur: 'dokun', parmak: 3 });
      expect(r[0].soz).toBe('Teleport!');
      const gv = d.gemi.govde;
      for (let i = 0; i < 60 && d.savas && d.savas.uyari; i++) savasIlerle(d, 0.1);
      expect(d.gemi.govde).toBe(gv);
    }
  });

  test('Gümüş Rota savaştan çeker; zafer Kırmızı kıdem verir', () => {
    const d = hazir();
    ZN.cekirdekAl(d, 'zhaor');
    savasBaslat(d, 'korsan_korvet');
    const l = yetenekler(d);
    d.savas.yetenekNo = l.findIndex((y) => y.id === 'gumus');
    savasGirdi(d, { tur: 'cift' });
    expect(d.savas).toBe(null);
    expect(d.savasSon.sonuc).toBe('kacis');
    savasBaslat(d, 'korsan_avci');
    d.savas.dusman.govde = 1;
    d.savas.dusman.aci = 0;
    savasGirdi(d, { tur: 'dokun', parmak: 1 });
    expect(d.savasSon.sonuc).toBe('zafer');
    expect(SB.ekolPuani(d, 'varek')).toBe(30);
  });

  test('rastgele karşılaşmalar: sahne, operasyon, tekrar', () => {
    const d = hazir();
    d.gemi.yer = 'uzay';
    d.uzay = { x: 0, y: 0, yon: 0, hiz: 2, yaklasilan: {}, kilitli: null };
    let bulundu = null;
    for (let i = 0; i < 400 && !bulundu; i++) {
      d.sahne = null;
      d.olay = null;
      d.korsanSayac = 0;
      d.haberSayac = 0;
      seferIlerle(d, 75);
      if (d.olay && d.olay.id.indexOf('k_') === 0) bulundu = d.olay.id;
    }
    expect(bulundu).not.toBe(null);
    const sc = SEFER.sefer_olay.secenekler(d);
    sc[0].yap();
    d.sahne = null;
    const o = seferIlerle(d, 0.1);
    expect(o[0].tur).toBe('op');
    expect(d.op.id).toBe(bulundu);
    expect(OPERASYONLAR[bulundu].tekrar).toBe(true);
  });
});
