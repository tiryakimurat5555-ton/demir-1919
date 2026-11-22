// v4 Faz 3: karakter ağları, Tether-Key mekiği, iki aşamalı mürettebat, itibar; Komuta ve Genişleme Paneli,
// komşu halka baskısı ve Aşama 1-2 harekâtları
import { describe, expect, test } from 'bun:test';
import { yeniOyun } from '../src/oyun/durum';
import * as G from '../src/oyun/gemi/gemi';
import * as SV from '../src/oyun/uzay/savas';
import * as KM from '../src/oyun/komuta';
import * as KR from '../src/oyun/tonoflenya/karakter';
import * as KS from '../src/oyun/tonoflenya/kisiler';
import * as ZN from '../src/oyun/tonoflenya/zanaat';
import { seferKosullari } from '../src/oyun/tonoflenya/malken';
import { SAHNELER, zamanIlerle, noktaEylemleri, eylemUygula } from '../src/oyun/yuzey/gorevler';
import { NOKTALAR } from '../src/oyun/yuzey/harita';
import { TESISLER } from '../src/oyun/veri/tesisler';
import { NOBET_SN } from '../src/oyun/zaman';
import { koloniGirdisi } from '../src/oyun/koloni';
import { TARIFLER } from '../src/oyun/veri/uretim';

function oyun(t = 41) {
  const d = yeniOyun(t);
  d.sahne = null;
  d.zaman = { sn: 0 };
  return d;
}
// Sahnede i. seçeneği seç (Yuzey'in yaptığı gibi)
function sec(d, i = 0) {
  const c = SAHNELER[d.sahne].secenekler(d)[i];
  if (c.yap) c.yap();
  d.sahne = c.sonra;
}
// Bekleyen çatışmayı kazanmış say: zaferde savaş motorunun koyduğu sonraki sahne
function zafer(d) {
  const sonra = d.savasSonraSahne;
  d.savasBekle = null;
  d.savasSonraSahne = null;
  d.sahne = sonra;
}

describe('Karakter ağı ve mekik', () => {
  test('karakter noktaları haritada; tanışmak kodeks, bölge gücü ve taslak bilgisi verir', () => {
    expect(NOKTALAR.k_oronte.mekan).toBe('filtra');
    expect(NOKTALAR.k_ignador.mekan).toBe('ygk_1');
    expect(NOKTALAR.k_barracuda.mekan).toBe('flee_plee');
    const d = oyun();
    const e = noktaEylemleri(d, 'k_oronte').map((x) => x.id);
    expect(e).toContain('konus');
    const r = eylemUygula(d, 'k_oronte', 'konus');
    expect(r.metin).toContain('Oronte');
    expect(r.metin).toContain('T-02');
    expect(d.kodeks.some((k) => k.id === 'kisi_oronte')).toBe(true);
    expect(KS.gucItibari(d, 'bati')).toBe(5);
    expect(noktaEylemleri(d, 'k_oronte').map((x) => x.id)).toContain('mekik');
  });

  test('gözetmen: akademidekiler YGK katlarındayken, ustalar kendi bölgelerinde, misafir kolonide', () => {
    const d = oyun();
    KR.konus(d, 'ignador');
    KR.konus(d, 'oronte');
    d.mekan = 'ygk_3';
    KR.gozetmenGuncelle(d);
    expect(d.gozetmen.ignador).toBe(true);
    expect(d.gozetmen.oronte).toBeFalsy();
    d.mekan = 'filtra';
    KR.gozetmenGuncelle(d);
    expect(d.gozetmen.oronte).toBe(true);
    expect(d.gozetmen.ignador).toBeFalsy();
  });

  test('mekik: köprü, tanışma ve bedel gerekir; iki nöbet kalır, altı nöbet (halkayla iki) bekler; rıhtımda bir misafir', () => {
    const d = oyun();
    expect(KR.mekikKosulu(d, 'zeno')).toContain('köprü');
    d.bayrak.tonoflenyaGoruldu = true;
    expect(KR.mekikKosulu(d, 'zeno')).toContain('tanış');
    KR.konus(d, 'zeno');
    KR.konus(d, 'mirelza');
    expect(KR.mekikKosulu(d, 'zeno')).toContain('bedel');
    ZN.ekle(d, 'malazar_odagi', 2);
    d.koloni.kaynaklar.isik_tozu = 100;
    d.koloni.parcalar.jeotermal_sogutucu = 50;
    const r = KR.mekikCagir(d, 'zeno');
    expect(d.karakter.misafir).toBe('zeno');
    expect(r.metin).toContain('İki nöbet');
    expect(ZN.miktar(d, 'malazar_odagi')).toBe(1);
    expect(KR.mekikKosulu(d, 'mirelza')).toContain('yer yok');
    // İki nöbet sonra döner, altı nöbet bekler
    d.zaman.sn = 2 * NOBET_SN + 1;
    KR.karakterIlerle(d);
    expect(d.karakter.misafir).toBe(null);
    expect(d.karakter.bekleme.zeno).toBe(d.zaman.sn + 6 * NOBET_SN);
    expect(KR.mekikKosulu(d, 'zeno')).toContain('nöbet sonra');
    // Rezonans halkasıyla dönüş beklemesi iki nöbet
    KR.mekikCagir(d, 'mirelza');
    ZN.ekle(d, 'rezonans_halkasi', 1);
    d.zaman.sn += 2 * NOBET_SN + 1;
    KR.karakterIlerle(d);
    expect(d.karakter.bekleme.mirelza).toBe(d.zaman.sn + 2 * NOBET_SN);
    // Malzeme bitince bedel eksik
    expect(KR.mekikKosulu(d, 'oronte')).toBeTruthy();
  });

  test('misafirlerin etkileri: Oronte zırh, araç ve bakımı yarıya indirir; Zeno kolonide baskın bırakmaz', () => {
    const d = oyun();
    G.gemiOlustur(d, 1);
    d.gemi.govde = d.gemi.maxGovde - 40;
    const once = ZN.bakimMaliyeti(d);
    const t = TARIFLER.arac_hangari[0];
    const g0 = koloniGirdisi(d, 'arac_hangari', t);
    d.karakter = { tanis: {}, misafir: 'oronte', bitis: 1e9, bekleme: {}, guc: {} };
    expect(ZN.bakimMaliyeti(d)).toBeLessThan(once);
    const g1 = koloniGirdisi(d, 'arac_hangari', t);
    for (const k of Object.keys(g0)) expect(g1[k]).toBeLessThanOrEqual(Math.ceil(g0[k] / 2));
    // Zeno: rutin baskın yok
    d.karakter.misafir = 'zeno';
    KM.komuta(d).sektor.guney = { durum: 'guvenli', karakol: null };
    for (let i = 0; i < 30; i++) {
      d.zaman.sn += 13 * NOBET_SN;
      d.karakter.bitis = d.zaman.sn + 1e6;
      KM.komutaIlerle(d);
    }
    expect(d.komuta.baskinlar.length).toBe(0);
  });

  test('iki aşamalı mürettebat: akademiye kayıt olunca altı seçkin subay istasyonlara geçer', () => {
    const d = oyun();
    G.gemiOlustur(d, 3);
    expect(KR.seckinKadro(d)).toBe(false);
    d.bayrak.ygkKayit = true;
    zamanIlerle(d, 0.1);
    expect(d.bayrak.seckinKadro).toBe(true);
    for (const ist of ['reaktor', 'silah', 'revir', 'dumen', 'sonar', 'hangar']) expect(d.istasyonlar[ist].cekirdek).toBe(true);
    expect(KR.zhaorDumende(d)).toBe(true);
  });
});

describe('İtibar', () => {
  test('evren itibarı: pazar avantajı, korsanları korkutma ve yüzde otuz beşte teslim, savunma', () => {
    const d = oyun();
    expect(KS.evrenEtki(d).pazar).toBe(0);
    d.itibar = 5000;
    const e = KS.evrenEtki(d);
    expect(e.pazar).toBe(0.15);
    expect(e.korsan).toBe(true);
    expect(KS.gucItibari(d, 'dogu')).toBe(10); // beş güce artı on
    G.gemiOlustur(d, 1);
    d.gemi.yer = 'uzay';
    d.uzay = { x: 0, y: 0, yon: 0, hiz: 0, yaklasilan: {} };
    const o = SV.savasBaslat(d, { dusmanlar: ['korsan_korvet'] });
    expect(o[0].soz).toContain('korkutup kaçır');
    SV.savasGirdi(d, { tur: 'kaydir', yon: 'yukari', parmak: 2 });
    expect(d.savas).toBe(null);
    expect(d.savasSon.sonuc).toBe('ateskes');
    d.itibar = 12000;
    expect(KS.evrenEtki(d).savunma).toBe(0.1);
  });

  test('bölge itibarı: yan görev fraksiyonları beş ana güce toplanır, basamaklar', () => {
    const d = oyun();
    d.yan = { itibar: { filtra_madencileri: 30, julithan: 35 } };
    expect(KS.gucItibari(d, 'bati')).toBe(65);
    expect(KS.gucBasamagi(65)).toBe('Müttefik');
    expect(KS.gucBasamagi(-70)).toBe('Düşman');
    expect(KS.gucBasamagi(0)).toBe('Tarafsız');
  });
});

describe('Komuta ve Genişleme Paneli', () => {
  test('üç sekme, iki parmakla geçiş, üç parmakla en acil bölge, durum sesleri', () => {
    const d = oyun();
    const p = KM.panel(d);
    expect(p.baslik).toContain('Bölge haritası');
    expect(p.ogeler.length).toBe(4);
    expect(p.ogeler[0].ses).toBe('statik');
    expect(p.ikiParmak.sag(d).baslik).toContain('Savunma');
    expect(p.ikiParmak.sol(d).baslik).toContain('İleri karakol');
    expect(p.ucParmak(d)).toContain('Acil');
  });

  test('Görev 1A: tara, saldır, vanalar, akrep yuvası, karar; güney güvenli ve santral açılır', () => {
    const d = oyun();
    d.koloni.binalar.push('sinyal_kulesi');
    expect(KM.tara(d, 'guney').metin).toContain('sessiz');
    d.bayrak.sondaj = true;
    expect(KM.tara(d, 'guney').ses).toBe('sonar');
    expect(KM.durum(d, 'guney')).toBe('dusman');
    expect(KM.enAcil(d)).toContain('Güney');
    const r = KM.saldir(d, 'guney');
    expect(r.kapat).toBe(true);
    expect(d.sahne).toBe('kom_giris');
    expect(SAHNELER.kom_giris.metin(d).join(' ')).toContain('Kaya');
    sec(d, 0);
    expect(d.opBekle).toBe('kom_guney');
    // Operasyon başlar ve biter (operasyon motoru sahneyi koyar)
    zamanIlerle(d, 0.1);
    expect(d.op).toBeTruthy();
    d.op = null;
    d.sahne = 'kom_ara';
    sec(d, 0);
    expect(d.savasBekle.dusmanlar).toContain('yuva_ana_akrebi');
    expect(d.savasBekle.ortam).toBe('kara');
    // Gerçek savaş başlatılabilir
    SV.savasBaslat(d, d.savasBekle);
    expect(d.savas.dusmanlar.length).toBe(3);
    d.savas = null;
    zafer(d);
    expect(d.sahne).toBe('kom_karar');
    // B seçeneği biyo-kubbe ister
    const c = SAHNELER.kom_karar.secenekler(d);
    expect(c[1].etiket).toContain('Biyoloji kubbesi');
    sec(d, 0);
    expect(d.sahne).toBe('kom_sonuc');
    expect(KM.durum(d, 'guney')).toBe('guvenli');
    expect(d.komuta.sektor.guney.muhur).toBe(true);
    d.gorulenMekanlar = ['lav'];
    expect(TESISLER.jeotermal_santral.kosul(d)).toBe(true);
    // Karakol kurulur, günlük aktarım yapar
    d.koloni.kaynaklar.bazalt = 20;
    d.koloni.kaynaklar.titanyum = 20;
    d.koloni.kaynaklar.kristal = 5;
    expect(KM.karakolKur(d, 'guney', 'sondaj').ses).toBe('kaynak');
    const ti = d.koloni.kaynaklar.titanyum;
    d.zaman.sn += KM.GUN + 1;
    KM.komutaIlerle(d);
    d.zaman.sn += KM.GUN + 1;
    KM.komutaIlerle(d);
    expect(d.koloni.kaynaklar.titanyum).toBeGreaterThan(ti);
  });

  test('yarım kalan harekât sıfırlanır; bölge düşman elinde kalır', () => {
    const d = oyun();
    d.koloni.binalar.push('sinyal_kulesi');
    d.bayrak.kazi = true;
    KM.tara(d, 'bati');
    KM.saldir(d, 'bati');
    sec(d, 0);
    d.opBekle = null; // operasyondan geri çekildi
    KM.komutaIlerle(d);
    expect(d.komuta.aktif).toBe(null);
    expect(KM.durum(d, 'bati')).toBe('dusman');
    expect(KM.saldiriKosulu(d, 'bati')).toBe(null);
  });

  test('komşu halka baskısı: dört sektör ve yörünge güvenli olunca Tam Güvence', () => {
    const d = oyun();
    const km = KM.komuta(d);
    for (const id of KM.SEKTORLER) km.sektor[id] = { durum: 'guvenli', karakol: null };
    // Yörünge ablukası kırılmadıkça yörüngeden sızıntı baskını gelebilir
    let baskin = false;
    for (let i = 0; i < 30 && !baskin; i++) {
      d.zaman.sn += 13 * NOBET_SN;
      KM.komutaIlerle(d);
      baskin = km.baskinlar.length > 0;
    }
    expect(baskin).toBe(true);
    // Otomatik savunma: kalkan jeneratörü
    d.koloni.binalar.push('koloni_kalkani');
    const id = km.baskinlar[0].id;
    expect(KM.otomatikSavun(d, id).metin).toContain('püskürttü');
    km.sektor.yorunge = { durum: 'guvenli', karakol: null };
    km.baskinlar = [];
    for (let i = 0; i < 30; i++) {
      d.zaman.sn += 13 * NOBET_SN;
      KM.komutaIlerle(d);
    }
    expect(km.tamGuvence).toBe(true);
    expect(km.baskinlar.length).toBe(0);
    expect(KM.enAcil(d)).toContain('Tam Güvence');
  });

  test('karşılık verilmeyen baskın ambarı yağmalar; Barracuda kolonideyse kayıp yok', () => {
    const d = oyun();
    const km = KM.komuta(d);
    km.sektor.bati = { durum: 'guvenli', karakol: null };
    d.koloni.kaynaklar.titanyum = 30;
    km.baskinlar.push({ id: 'bati', bitis: 10 });
    d.zaman.sn = 20;
    KM.komutaIlerle(d);
    expect(d.koloni.kaynaklar.titanyum).toBeLessThan(30);
    const d2 = oyun();
    d2.karakter = { tanis: {}, misafir: 'barracuda', bitis: 1e9, bekleme: {}, guc: {} };
    KM.komuta(d2).sektor.bati = { durum: 'guvenli', karakol: null };
    d2.koloni.kaynaklar.titanyum = 30;
    d2.komuta.baskinlar.push({ id: 'bati', bitis: 10 });
    d2.zaman.sn = 20;
    KM.komutaIlerle(d2);
    expect(d2.koloni.kaynaklar.titanyum).toBe(30);
  });

  test('Aşama 2: yörünge ablukası (uzay, 1v2) ve Kaelith kurtarma; topluluk sayılır', () => {
    const d = oyun();
    G.gemiOlustur(d, 2);
    const km = KM.komuta(d);
    for (const id of KM.SEKTORLER) km.sektor[id] = { durum: 'guvenli', karakol: null };
    d.koloni.binalar.push('sinyal_kulesi');
    expect(KM.panel(d).ogeler.length).toBe(6);
    expect(KM.tara(d, 'yorunge').ses).toBe('sonar');
    KM.saldir(d, 'yorunge');
    sec(d, 0);
    expect(d.savasBekle.dusmanlar).toEqual(['korsan_avci', 'korsan_korvet']);
    expect(d.savasBekle.ortam).toBe('uzay');
    zafer(d);
    expect(d.sahne).toBe('kom_sonuc_hazir');
    SAHNELER.kom_sonuc_hazir.metin(d);
    expect(KM.durum(d, 'yorunge')).toBe('guvenli');
    // Kaelith: önce dış kapıdaki zırhlı korsan, sonra hava kilidi (köpük yoksa vana), sonra galeriler
    d.sahne = null;
    expect(KM.tara(d, 'kaelith').ses).toBe('sonar');
    KM.saldir(d, 'kaelith');
    expect(SAHNELER.kom_giris.metin(d).join(' ')).toContain('Torvok');
    sec(d, 0);
    expect(d.savasBekle.dusmanlar).toEqual(['agir_maden_korsani']);
    zafer(d);
    expect(d.sahne).toBe('kom_savas_sonra');
    d.koloni.parcalar.dondurucu_kopuk = 1;
    sec(d, 0);
    expect(d.koloni.parcalar.dondurucu_kopuk).toBe(0);
    expect(d.savasBekle.dusmanlar).toContain('galeri_cagirani');
    zafer(d);
    const nufus = d.koloni.nufus.toplam;
    sec(d, 0);
    expect(d.koloni.nufus.toplam).toBe(nufus + 25);
    expect(d.bayrak.kaelithKurtarildi).toBe(true);
    expect(KM.dokumIndirimi(d)).toBe(0.3);
    // Tonoflenya köprüsünün topluluk şartı: Kaelith bir topluluk sayılır
    d.tamamlananOp = ['g13'];
    expect(seferKosullari(d).some((x) => x.includes('topluluk'))).toBe(false);
  });

  test('yeni sektör düşmanları savaşta kurulabilir', () => {
    const d = oyun();
    for (const t of ['yuva_ana_akrebi', 'yagmaci_oncusu', 'vanguard_otomati', 'bataklik_pusucusu', 'kseno_avci', 'magma_akrebi', 'galeri_cagirani']) {
      SV.savasBaslat(d, { dusmanlar: [t], ortam: 'kara' });
      expect(d.savas.dusmanlar[0].tur).toBe(t);
      d.savas = null;
    }
  });
});
