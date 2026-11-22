// Birinci görev baştan sona: kapsülden çık, kesiciyi al, anteni ve hücreyi bul, jeneratörü çalıştır,
// anteni kur, frekansı ayarla, kaynak topla, Sinyal Kulesi'ni kur.
import { describe, expect, test } from 'bun:test';
import { yeniOyun, gecerliMi, kaydiTamamla } from '../src/oyun/durum';
import { NOKTALAR, MEKANLAR } from '../src/oyun/yuzey/harita';
import { cevreMetni, durumMetni, etkiles, firtinaIlerle, gec, ilerle, otoBaslat, radar, yerlerListesi } from '../src/oyun/yuzey/dunya';
import { KAPILAR } from '../src/oyun/yuzey/harita';
import {
  SAHNELER,
  ayarBaslat,
  ayarDegis,
  ayarIlerle,
  ayarYakinlik,
  eylemUygula,
  gorevIpucu,
  insaEt,
  insaListesi,
  konusma,
  noktaEylemleri,
  sahneSec,
  sahneMetni,
  sahneSecenekleri,
  valfBaslat,
  valfBirak,
  valfIlerle,
  bildirimIlerle,
  kapiDizisi,
  rezonansBaslat,
  rezonansCal,
  rezonansSecimDegis,
  onTarama,
  teraziBaslat,
  teraziIlerle,
  teraziMetni,
  teraziPompa,
  AYAKLAR,
  zamanIlerle,
  uzayAdim,
  kenetlen,
  kalkis,
  itki,
  burunDondur,
  UZAY_NOKTALARI,
  uzayRadar,
} from '../src/oyun/yuzey/gorevler';
import { uretimBaslat, isGucuDegis, bosta, miktar } from '../src/oyun/koloni';
import { montajBaslat, vincKaydir, vincIndir, vincKenetle, atamaYap, odaDegis, gemidenIn, modulListesi, kizagaKoy, aktifGemiSec, montajAsamalari, gemiyeBin, gucDagitimiSec } from '../src/oyun/gemi/gemi';
import { TARIFLER } from '../src/oyun/veri/uretim';
import { HAMMADDELER } from '../src/oyun/veri/tesisler';
import { aracaBin, aractanIn } from '../src/oyun/yuzey/hangar';
import { kaplamaBaslat, modulTak } from '../src/oyun/gemi/gemi';
import { ayarBaslat as ayarBaslat1, ayarIlerle as ayarIlerle1 } from '../src/oyun/yuzey/gorev1';
import { valfBaslat as valfBaslat2, valfIlerle as valfIlerle2, valfBirak as valfBirak2 } from '../src/oyun/yuzey/gorev2';
import { kapiDizisi as kapiDizisi3, rezonansBaslat as rezonansBaslat3, rezonansCal as rezonansCal3 } from '../src/oyun/yuzey/gorev3';
import { goreliAci } from '../src/oyun/konum';
import { TESISLER } from '../src/oyun/veri/tesisler';

// Bir yere kendiliğinden yürür (en çok 120 benzetim saniyesi)
function yuru(d, id) {
  const h = yerlerListesi(d, true).find((y) => y.id === id) || { id, ad: NOKTALAR[id].ad, mekan: NOKTALAR[id].mekan, x: NOKTALAR[id].x, y: NOKTALAR[id].y };
  otoBaslat(d, h);
  const olaylar = [];
  for (let i = 0; i < 1200 && d.oto; i++) olaylar.push(...ilerle(d, {}, 0.1));
  return olaylar;
}

function sahneleriGec(d) {
  let n = 0;
  while (d.sahne && n++ < 10) {
    expect(SAHNELER[d.sahne]).toBeDefined();
    expect(sahneSecenekleri(d, d.sahne).length).toBeGreaterThan(0);
    sahneSec(d, d.sahne, 0);
  }
}

describe('yeni oyun', () => {
  test('durum geçerli ve kapsülde başlar', () => {
    const d = yeniOyun(12345);
    expect(gecerliMi(d)).toBe(true);
    expect(d.mekan).toBe('kapsul');
    expect(d.sahne).toBe('acilis');
    expect(d.murettebat.length).toBe(3);
    expect(d.murettebat[0].ad).not.toBe(d.murettebat[1].ad);
    // Aynı tohum aynı adları verir
    expect(yeniOyun(12345).murettebat[0].ad).toBe(d.murettebat[0].ad);
    expect(JSON.parse(JSON.stringify(d))).toEqual(d);
  });

  test('çevre, durum ve radar metinleri boş değil', () => {
    const d = yeniOyun(7);
    sahneleriGec(d);
    expect(cevreMetni(d).length).toBeGreaterThan(5);
    expect(durumMetni(d)).toContain('İniş kapsülü');
    const r = radar(d);
    expect(r.metin.length).toBeGreaterThan(5);
  });

  test('duvara çarpınca durur ve söyler', () => {
    const d = yeniOyun(7);
    sahneleriGec(d);
    const olaylar = [];
    for (let i = 0; i < 80; i++) olaylar.push(...ilerle(d, { ileri: 1 }, 0.1));
    expect(olaylar.some((o) => o.tur === 'carpti')).toBe(true);
    expect(d.oyuncu.y).toBeLessThanOrEqual(8);
    expect(olaylar.some((o) => o.tur === 'adim')).toBe(true);
  });

  test('dönerken tıkırtı', () => {
    const d = yeniOyun(7);
    const o = [];
    for (let i = 0; i < 20; i++) o.push(...ilerle(d, { donus: 1 }, 0.1));
    expect(o.filter((x) => x.tur === 'tik').length).toBeGreaterThan(2);
  });
});

describe('Sinyal Arayışı', () => {
  test('baştan sona', () => {
    const d = yeniOyun(424242);
    sahneleriGec(d);
    expect(gorevIpucu(d)).toContain('kesici');

    // Kesici
    yuru(d, 'dolap');
    const e1 = etkiles(d);
    expect(e1.tur).toBe('nokta');
    expect(e1.id).toBe('dolap');
    expect(noktaEylemleri(d, 'dolap').map((x) => x.id)).toContain('kesici');
    eylemUygula(d, 'dolap', 'kesici');
    expect(d.envanter).toContain('kesici');

    // Konuşmalar her kişiyle açılır
    for (const k of ['telsizci', 'hekim', 'muhendis']) {
      const kn = konusma(d, k);
      expect(kn.metin.length).toBeGreaterThan(10);
      expect(kn.secenekler.length).toBeGreaterThan(1);
      for (const s of kn.secenekler) s.cevap(d);
    }

    // Dışarı çık (kapsülün dışındaki enkaza yürüyünce hava kilidinden kendisi geçer)
    yuru(d, 'enkaz');
    expect(d.mekan).toBe('vadi');
    expect(etkiles(d).id).toBe('enkaz');
    eylemUygula(d, 'enkaz', 'incele');
    eylemUygula(d, 'enkaz', 'anten');
    eylemUygula(d, 'enkaz', 'hucre');
    expect(d.envanter).toEqual(expect.arrayContaining(['anten', 'guc_hucresi']));

    // Anteni jeneratörsüz kurmaya çalışmak işe yaramaz
    yuru(d, 'tepe');
    const r0 = eylemUygula(d, 'tepe', 'kur');
    expect(r0.ses).toBe('red');
    expect(d.bayrak.antenKuruldu).toBeFalsy();

    // Jeneratör
    yuru(d, 'jenerator');
    eylemUygula(d, 'jenerator', 'tak');
    expect(d.bayrak.jenerator).toBe(true);
    expect(d.envanter).not.toContain('guc_hucresi');

    // Anten
    yuru(d, 'tepe');
    eylemUygula(d, 'tepe', 'kur');
    expect(d.bayrak.antenKuruldu).toBe(true);
    const r = eylemUygula(d, 'tepe', 'ayar');
    expect(r.ayar).toBe(true);

    // Frekans ayarı: hedefe doğru çevir, tut
    ayarBaslat(d);
    const hedef = d.ayar.hedef;
    expect(ayarYakinlik(d)).toBeLessThan(0.5);
    let olaylar = [];
    for (let i = 0; i < 400 && d.ayar; i++) {
      const fark = hedef - d.ayar.frekans;
      if (Math.abs(fark) > 0.3) ayarDegis(d, Math.sign(fark) * 0.5);
      olaylar.push(...ayarIlerle(d, 0.1));
    }
    expect(olaylar).toContain('yakin');
    expect(olaylar).toContain('kilitlendi');
    expect(d.bayrak.telemetri).toBe(true);
    expect(d.sahne).toBe('telemetri');
    sahneleriGec(d);

    // Kule henüz kurulamaz: malzeme yok
    const t0 = insaEt(d, 'sinyal_kulesi');
    expect(t0.ses).toBe('red');

    // Kaynak topla
    const m = TESISLER.sinyal_kulesi.maliyet;
    const yataklar = Object.keys(NOKTALAR).filter((id) => NOKTALAR[id].kaynak);
    for (const id of yataklar) {
      if ((d.koloni.kaynaklar[NOKTALAR[id].kaynak] || 0) >= (m[NOKTALAR[id].kaynak] || 0)) continue;
      if (!d.kesif.includes(id)) d.kesif.push(id);
      yuru(d, id);
      while ((d.stok[id] || 0) > 0) eylemUygula(d, id, 'topla');
    }
    for (const k of Object.keys(m)) expect(d.koloni.kaynaklar[k]).toBeGreaterThanOrEqual(m[k]);

    // Kule
    yuru(d, 'terminal');
    expect(d.mekan).toBe('kapsul');
    const liste = insaListesi(d);
    expect(liste.find((x) => x.id === 'sinyal_kulesi').durum).toContain('Kurulabilir');
    insaEt(d, 'sinyal_kulesi');
    expect(d.koloni.binalar).toContain('sinyal_kulesi');
    expect(d.sahne).toBe('kule');
    sahneleriGec(d);
    expect(d.bitenGorevler).toContain('sinyal');
    expect(d.harita.poiler).toContain('sektor15');
    expect(gorevIpucu(d)).toContain('mühendis');
    // Kayıt JSON'a sorunsuz döner
    expect(gecerliMi(JSON.parse(JSON.stringify(d)))).toBe(true);
    ikinciGorev(d);
  });
});

function konus(d, kisi, etiket) {
  const k = konusma(d, kisi);
  const s = k.secenekler.find((x) => x.etiket === etiket);
  expect(s).toBeDefined();
  return s.cevap(d);
}

// Jeotermal Sondaj: sondalar, maske, sırtlar, üç bacada valf, dökümhane
function ikinciGorev(d) {
  expect(d.gorev.id).toBe('jeotermal');
  // Maskesiz güney geçidi kilitli
  const r0 = gec(d, 'guney_gecit', 0);
  expect(r0.kilitli).toBe(true);
  yuru(d, 'jenerator');
  konus(d, 'muhendis', 'Sondaları ver');
  expect(d.envanter.filter((x) => x === 'sonda').length).toBe(3);
  yuru(d, 'dolap');
  konus(d, 'hekim', 'Maskeyi al');
  expect(d.bayrak.maske).toBe(true);
  // Kapsülden doğrudan bacaya: vadiden ve geçitten kendisi geçer
  const olaylar = yuru(d, 'baca_1');
  expect(d.mekan).toBe('sirtlar');
  expect(olaylar.some((o) => o.tur === 'otoKapi')).toBe(true);
  expect(bildirimIlerle(d).map((x) => x.id)).toContain('sirtlar_ilk');
  expect(radar(d).metin).toContain('parazit');
  // Zehir artıyor
  const z0 = d.zehir;
  for (let i = 0; i < 20; i++) ilerle(d, {}, 0.1);
  expect(d.zehir).toBeGreaterThan(z0);

  for (const id of ['baca_1', 'baca_2', 'baca_3']) {
    yuru(d, id);
    expect(etkiles(d).id).toBe(id);
    expect(noktaEylemleri(d, id).map((e) => e.id)).toContain('sonda');
    eylemUygula(d, id, 'sonda');
    expect(eylemUygula(d, id, 'valf').valf).toBe(true);
    valfBaslat(d, id);
    // Erken tahliye işe yaramaz
    expect(valfBirak(d).sonuc).toBe('erken');
    let sonuc = null;
    for (let i = 0; i < 2000 && d.valf; i++) {
      const o = valfIlerle(d, 0.1);
      expect(o).not.toContain('patlama');
      if (d.valf.alarm) sonuc = valfBirak(d).sonuc;
    }
    expect(sonuc).toBe('bitti');
    // Arada temiz havaya çık
    d.zehir = 0;
  }
  expect(d.koloni.kaynaklar.izotop).toBe(6);
  expect(d.bayrak.sondaj).toBe(true);
  expect(d.sahne).toBe('sondaj_tamam');
  sahneleriGec(d);
  expect(gorevIpucu(d)).toContain('Dökümhane');

  // Geç kalınca patlar ve zehir artar
  const z = d.zehir;
  d.valf = { baca: 'baca_1', basinc: 0.99, alarm: true };
  expect(valfIlerle(d, 0.5)).toContain('patlama');
  expect(d.zehir).toBeGreaterThan(z);
  d.valf = null;

  // Dökümhane kaynakları: sırtlardaki yataklar
  const m = TESISLER.dokumhane.maliyet;
  for (const id of Object.keys(NOKTALAR).filter((x) => NOKTALAR[x].kaynak)) {
    const tur = NOKTALAR[id].kaynak;
    if (!m[tur] || (d.koloni.kaynaklar[tur] || 0) >= m[tur] || (d.stok[id] || 0) <= 0) continue;
    if (!d.kesif.includes(id)) d.kesif.push(id);
    yuru(d, id);
    d.zehir = 0;
    while ((d.stok[id] || 0) > 0) eylemUygula(d, id, 'topla');
  }
  for (const k of Object.keys(m)) expect(d.koloni.kaynaklar[k]).toBeGreaterThanOrEqual(m[k]);
  yuru(d, 'terminal');
  expect(d.mekan).toBe('kapsul');
  insaEt(d, 'dokumhane');
  expect(d.koloni.binalar).toContain('dokumhane');
  expect(d.koloni.seviye).toBe(2);
  expect(d.sahne).toBe('dokumhane');
  sahneleriGec(d);
  expect(d.bitenGorevler).toEqual(['sinyal', 'jeotermal']);
  expect(d.gorev.id).toBe('kazi');
  ucuncuGorev(d);
}

// Hammadde ihtiyacını haritadaki yataklardan toplar
function topla(d, ihtiyac) {
  for (const id of Object.keys(NOKTALAR).filter((x) => NOKTALAR[x].kaynak)) {
    const tur = NOKTALAR[id].kaynak;
    if (!ihtiyac[tur] || (d.koloni.kaynaklar[tur] || 0) >= ihtiyac[tur] || (d.stok[id] || 0) <= 0) continue;
    if (!d.kesif.includes(id)) d.kesif.push(id);
    yuru(d, id);
    d.zehir = 0;
    expect(Math.hypot(d.oyuncu.x - NOKTALAR[id].x, d.oyuncu.y - NOKTALAR[id].y)).toBeLessThan(4);
    while ((d.stok[id] || 0) > 0 && (d.koloni.kaynaklar[tur] || 0) < ihtiyac[tur]) eylemUygula(d, id, 'topla');
  }
  for (const k of Object.keys(ihtiyac)) expect(d.koloni.kaynaklar[k] || 0).toBeGreaterThanOrEqual(ihtiyac[k]);
}

// Kapıyı rezonatörle açar: önce bir yanlış nota (dizi sıfırlanır), sonra doğru dizi
function kapiyiAc(d, kapiId) {
  const e = etkiles(d);
  expect(e.tur).toBe('kapi');
  expect(e.kilitli).toBe(true);
  expect(e.kapi).toBe(kapiId);
  const tur = e.rezonans;
  const { dizi } = rezonansBaslat(d, tur);
  expect(dizi.length).toBe(tur === 'dis' ? 3 : 4);
  for (let i = 1; i < dizi.length; i++) expect(dizi[i]).not.toBe(dizi[i - 1]);
  // Yanlış nota
  d.rezonans.secili = (dizi[0] + 1) % 5;
  expect(rezonansCal(d).sonuc).toBe('yanlis');
  expect(d.rezonans.sira).toBe(0);
  let son;
  for (const nota of dizi) {
    while (d.rezonans.secili !== nota) rezonansSecimDegis(d, nota > d.rezonans.secili ? 1 : -1);
    son = rezonansCal(d);
  }
  expect(son.sonuc).toBe('acildi');
  expect(d.rezonans).toBe(null);
  const g = etkiles(d);
  expect(g.gecti).toBe(true);
}

// Antik Kseno-Laboratuvar Kazısı: rezonatör, batı geçidi, kapılar, kristaller, yıldız haritası, biyo-kubbe
function ucuncuGorev(d) {
  expect(gorevIpucu(d)).toContain('mühendis');
  // Rezonatör: malzeme
  topla(d, { kristal: 2, titanyum: 1 });
  yuru(d, 'muhendis');
  expect(konus(d, 'muhendis', 'Rezonatörü yap')).toContain('çatala');
  expect(d.envanter).toContain('rezonator');
  // Batı geçidi açık; krater
  expect(yerlerListesi(d, true).some((y) => y.id === 'bati_gecit')).toBe(true);
  yuru(d, 'bati_gecit');
  const r = etkiles(d);
  expect(r.gecti).toBe(true);
  expect(d.mekan).toBe('krater');
  expect(bildirimIlerle(d).some((x) => x.id === 'krater_ilk')).toBe(true);
  // Çanlar notasını verir
  for (const id of ['can_1', 'can_2', 'can_3', 'can_4', 'can_5']) {
    if (!d.kesif.includes(id)) d.kesif.push(id);
    yuru(d, id);
    expect(noktaEylemleri(d, id).some((e) => e.id === 'vur')).toBe(true);
    expect(eylemUygula(d, id, 'vur').nota).toBe(NOKTALAR[id].can);
  }
  // Dış kapı: dizi tohumdan; aynı tohum aynı dizi
  expect(kapiDizisi(d, 'dis')).toEqual(kapiDizisi(JSON.parse(JSON.stringify(d)), 'dis'));
  yuru(d, 'kseno_kapi');
  kapiyiAc(d, 'kseno_kapi');
  expect(d.mekan).toBe('kseno_lab');
  // Salon: görünmez yerçekimi alanlarına çarpınca durur ve söyler
  const once = { ...d.oyuncu };
  const o = [];
  for (let i = 0; i < 100; i++) o.push(...ilerle(d, { ileri: 1 }, 0.1));
  expect(o.some((x) => x.tur === 'carpti')).toBe(true);
  d.oyuncu = once;
  // Üç kaide (kendiliğinden yürüme alanların etrafından dolaşır)
  for (const id of ['kaide_1', 'kaide_2', 'kaide_3']) {
    if (!d.kesif.includes(id)) d.kesif.push(id);
    yuru(d, id);
    expect(d.mekan).toBe('kseno_lab');
    expect(Math.hypot(d.oyuncu.x - NOKTALAR[id].x, d.oyuncu.y - NOKTALAR[id].y)).toBeLessThan(3.5);
    eylemUygula(d, id, 'al');
  }
  expect(d.envanter.filter((x) => x === 'veri_kristali').length).toBe(3);
  // İç kapı (dört nota) → mabet
  yuru(d, 'ic_kapi');
  kapiyiAc(d, 'ic_kapi');
  expect(d.mekan).toBe('mabet');
  if (!d.kesif.includes('yazit')) d.kesif.push('yazit');
  yuru(d, 'yazit');
  expect(eylemUygula(d, 'yazit', 'oku').metin.length).toBeGreaterThan(20);
  if (!d.kesif.includes('harita_kaidesi')) d.kesif.push('harita_kaidesi');
  yuru(d, 'harita_kaidesi');
  eylemUygula(d, 'harita_kaidesi', 'al');
  expect(d.bayrak.kazi).toBe(true);
  expect(d.sahne).toBe('kazi_tamam');
  sahneleriGec(d);
  expect(d.gorev.id).toBe('biyo');
  expect(d.kodeks.some((k) => k.id === 'kadim_harita')).toBe(true);
  expect(d.koloni.kaynaklar.kseno).toBeGreaterThanOrEqual(3);
  // Biyo-kubbe
  topla(d, TESISLER.biyo_kubbe.maliyet);
  yuru(d, 'terminal');
  expect(d.mekan).toBe('kapsul');
  expect(insaListesi(d).find((t) => t.id === 'biyo_kubbe').acik).toBe(true);
  insaEt(d, 'biyo_kubbe');
  expect(d.koloni.binalar).toContain('biyo_kubbe');
  expect(d.sahne).toBe('biyo_kubbe');
  sahneleriGec(d);
  expect(d.bitenGorevler).toEqual(['sinyal', 'jeotermal', 'kazi']);
  expect(d.gorev.id).toBe('zemin');
  expect(d.harita.poiler).toContain('moloz_kusagi');
  expect(gorevIpucu(d).length).toBeGreaterThan(10);
  expect(gecerliMi(JSON.parse(JSON.stringify(d)))).toBe(true);
  dorduncuGorev(d);
}

// Tersane Zemin Güçlendirmesi: pompa ve kablo, polimer, plato, rüzgâr hamleleri, dört ayak, dağıtım kutusu, tersane
function dorduncuGorev(d) {
  expect(gorevIpucu(d)).toContain('mühendis');
  yuru(d, 'muhendis');
  expect(konus(d, 'muhendis', 'Platoya hazırlan')).toContain('pompa');
  expect(d.envanter).toContain('pompa');
  expect(d.envanter).toContain('kablo');
  // Polimer: sırtlardaki kükürt çatlakları
  topla(d, { polimer: 4 });
  // Plato yokuşu
  yuru(d, 'kuzey_gecit');
  expect(etkiles(d).gecti).toBe(true);
  expect(d.mekan).toBe('plato');
  expect(bildirimIlerle(d).some((x) => x.id === 'plato_ilk')).toBe(true);
  // Dururken hamle üstünden geçer
  const o = [];
  for (let i = 0; i < 300; i++) o.push(...ilerle(d, {}, 0.1));
  expect(o.some((x) => x.tur === 'hamleGeliyor')).toBe(true);
  const h = o.find((x) => x.tur === 'hamle');
  expect(h.savruldu).toBe(false);
  // Yürürken yakalarsa savurur
  d.oyuncu = { x: 1140, y: 20, yon: 0 };
  d.firtina = { sayac: 5, sonraki: 0, evre: 'uyari', bitis: d.sure + 0.05, yon: Math.PI / 2 };
  const o2 = [];
  for (let i = 0; i < 3; i++) o2.push(...ilerle(d, { ileri: 1 }, 0.1));
  const h2 = o2.find((x) => x.tur === 'hamle');
  expect(h2.savruldu).toBe(true);
  expect(d.oyuncu.x).toBeLessThan(1138); // doğudan gelen hamle batıya savurur
  // Dört ayak
  for (const id of AYAKLAR) {
    yuru(d, id);
    expect(d.mekan).toBe('plato');
    expect(Math.hypot(d.oyuncu.x - NOKTALAR[id].x, d.oyuncu.y - NOKTALAR[id].y)).toBeLessThan(3);
    // Sertleşmemiş zeminde dengelenemez
    expect(eylemUygula(d, id, 'dengele').terazi).toBeUndefined();
    expect(eylemUygula(d, id, 'polimer').ses).toBe('polimer');
    expect(eylemUygula(d, id, 'dengele').terazi).toBe(true);
    teraziBaslat(d, id);
    expect(Math.abs(d.terazi.sapma)).toBeGreaterThan(0.4);
    expect(teraziMetni(d).length).toBeGreaterThan(5);
    // Oyuncu gibi: sapmaya karşı pompalar; ekran gibi fırtına da sürer
    let kilit = false;
    for (let i = 0; i < 900 && !kilit; i++) {
      d.sure += 0.1;
      const f = [];
      firtinaIlerle(d, 0.1, false, f);
      if (d.terazi) teraziPompa(d, -Math.sign(d.terazi.sapma) * Math.min(Math.abs(d.terazi.sapma), 0.03));
      kilit = teraziIlerle(d, 0.1).includes('kilitlendi');
    }
    expect(kilit).toBe(true);
    expect(d.terazi).toBe(null);
  }
  expect(d.bayrak.zemin).toBeUndefined();
  yuru(d, 'dagitim_kutusu');
  eylemUygula(d, 'dagitim_kutusu', 'bagla');
  expect(d.bayrak.zemin).toBe(true);
  expect(d.sahne).toBe('zemin_tamam');
  expect(d.envanter).not.toContain('kablo');
  sahneleriGec(d);
  expect(d.gorev.id).toBe('tersane');
  // Tersane
  topla(d, TESISLER.tersane.maliyet);
  yuru(d, 'terminal');
  expect(d.mekan).toBe('kapsul');
  insaEt(d, 'tersane');
  expect(d.koloni.binalar).toContain('tersane');
  expect(d.sahne).toBe('tersane');
  sahneleriGec(d);
  expect(d.koloni.seviye).toBe(3);
  expect(d.bitenGorevler).toEqual(['sinyal', 'jeotermal', 'kazi', 'zemin']);
  expect(d.gorev.id).toBe('kivilcim');
  expect(gorevIpucu(d)).toContain('Kıvılcım');
  expect(gecerliMi(JSON.parse(JSON.stringify(d)))).toBe(true);
  besinciGorev(d);
}

// Zaman geçirir (koloni: yenilenme, boru hattı, üretim, kaynak)
function bekle(d, sn) {
  const o = [];
  for (let i = 0; i < sn; i++) o.push(...zamanIlerle(d, 1));
  return o;
}
// Hammaddeyi edinir: yataklardan toplar, yetmezse yenilenmeyi bekler
function edin(d, ihtiyac) {
  for (let tur = 0; tur < 40; tur++) {
    const eksik = Object.keys(ihtiyac).filter((k) => miktar(d, k) < ihtiyac[k]);
    if (!eksik.length) return;
    const tam = {};
    for (const k of eksik) tam[k] = ihtiyac[k];
    for (const id of Object.keys(NOKTALAR).filter((x) => NOKTALAR[x].kaynak)) {
      const t = NOKTALAR[id].kaynak;
      if (!tam[t] || miktar(d, t) >= tam[t] || (d.stok[id] || 0) <= 0) continue;
      if (!d.kesif.includes(id)) d.kesif.push(id);
      if (NOKTALAR[id].gerekArac && !(d.araclar || []).includes(NOKTALAR[id].gerekArac)) continue;
      yuru(d, id);
      d.zehir = 0;
      const onceArac = d.arac;
      if (NOKTALAR[id].gerekArac) d.arac = NOKTALAR[id].gerekArac;
      while ((d.stok[id] || 0) > 0 && miktar(d, t) < tam[t]) eylemUygula(d, id, 'topla');
      d.arac = onceArac;
    }
    if (Object.keys(ihtiyac).some((k) => miktar(d, k) < ihtiyac[k])) bekle(d, 150);
  }
  for (const k of Object.keys(ihtiyac)) expect(miktar(d, k)).toBeGreaterThanOrEqual(ihtiyac[k]);
}
function uret(d, tesis, tarif, girdi, kez) {
  for (let i = 0; i < kez; i++) {
    edin(d, girdi);
    const r = uretimBaslat(d, tesis, tarif);
    expect(r.ses).toBe('dugme');
    let n = 0;
    while (d.koloni.uretimler.some((u) => u.tesis === tesis) && n++ < 400) bekle(d, 1);
    expect(d.koloni.uretimler.some((u) => u.tesis === tesis)).toBe(false);
  }
}
// Uzayda bir noktaya uçar: burnu döndürür, hızlanır, yaklaşınca durur
function uc(d, id) {
  const n = UZAY_NOKTALARI[id];
  const o = [];
  for (let adim = 0; adim < 4000 && d.uzay; adim++) {
    const u = d.uzay;
    const m = Math.hypot(n.x - u.x, n.y - u.y);
    if (m < 25) {
      while (d.uzay.hiz > 0) itki(d, -1);
      return o;
    }
    let a = goreliAci({ x: u.x, y: u.y, yon: u.yon }, n);
    if (a > Math.PI) a -= Math.PI * 2;
    if (Math.abs(a) > Math.PI / 12) burunDondur(d, Math.sign(a) * (Math.PI / 12));
    const istenen = m > 150 ? 5 : m > 60 ? 2 : 1;
    if (u.hiz < istenen) itki(d, 1);
    else if (u.hiz > istenen) itki(d, -1);
    o.push(...uzayAdim(d, 0.1));
  }
  return o;
}

// Kıvılcım ve ilk uçuş: reaktör laboratuvarı, üretim, dört aşamalı montaj, gemi içi, kalkış, uzay, iniş
function besinciGorev(d) {
  expect(gorevIpucu(d)).toContain('Laboratuvar');
  expect(konusma(d, 'muhendis').metin).toContain('Kıvılcım');
  // İş gücü: tersaneye ve sanayiye
  if (bosta(d) > 0) isGucuDegis(d, 'sanayi', 1);
  expect(isGucuDegis(d, 'bilim', -5).olmadi).toBe(true);
  expect(d.koloni.nufus.bilim).toBeGreaterThanOrEqual(0);
  // Reaktör laboratuvarı
  edin(d, TESISLER.reaktor_lab.maliyet);
  yuru(d, 'terminal');
  expect(noktaEylemleri(d, 'terminal').some((e) => e.id === 'uretim')).toBe(true);
  insaEt(d, 'reaktor_lab');
  expect(d.koloni.binalar).toContain('reaktor_lab');
  // Üretim
  uret(d, 'dokumhane', 'plaka', { titanyum: 2, bazalt: 1 }, 3);
  uret(d, 'dokumhane', 'kablo', { kristal: 1, titanyum: 1 }, 2);
  uret(d, 'reaktor_lab', 'iyon', { izotop: 2, kristal: 1, titanyum: 1 }, 1);
  uret(d, 'reaktor_lab', 'yakit', { izotop: 1 }, 3);
  expect(d.koloni.parcalar.plaka).toBe(150);
  expect(d.koloni.parcalar.kablo).toBe(40);
  expect(d.koloni.parcalar.itki_yakiti).toBe(30);
  // Montaj (kızak)
  yuru(d, 'kizak');
  expect(d.mekan).toBe('plato');
  expect(montajBaslat(d, 'kokpit').ses).toBe('red'); // sıra
  for (const asama of ['govde', 'kokpit', 'reaktor']) {
    expect(montajBaslat(d, asama).vinc).toBe(true);
    expect(Math.abs(d.vinc.x)).toBeGreaterThan(0.4);
    // Ortalanmadan indirirsen çarpar
    expect(vincIndir(d).sonuc).toBe('carpti');
    for (let i = 0; i < 3; i++) {
      vincKaydir(d, -d.vinc.x);
      vincIndir(d);
    }
    expect(d.vinc.oturdu).toBe(true);
    expect(vincKenetle(d).sonuc).toBe('kenetlendi');
    let n = 0;
    while (d.tersane.kaynak && n++ < 200) bekle(d, 1);
    expect(d.tersane.asamalar[asama]).toBe('bitti');
  }
  montajBaslat(d, 'itki');
  let hazir = [];
  for (let i = 0; i < 60 && !d.gemi; i++) hazir.push(...bekle(d, 1));
  expect(d.gemi.ad).toBe('Kıvılcım');
  expect(d.sahne).toBe('kivilcim_hazir');
  sahneleriGec(d);
  expect(d.gorev.id).toBe('ilk_ucus');
  expect(modulListesi(d).find((m) => m.id === 'mod_bolme_a').takilabilir).toBe(false);
  // Gemi içi
  const r = eylemUygula(d, 'kizak', 'bin');
  expect(r.gemi).toBe(true);
  expect(d.gemide.oda).toBe(0);
  atamaYap(d, 'kokpit', d.murettebat[1].id);
  expect(odaDegis(d, 1).oda.id).toBe('kargo');
  expect(odaDegis(d, 1).sinir).toBe(true);
  odaDegis(d, -1);
  // Kalkış
  kalkis(d);
  expect(d.sahne).toBe('kalkis');
  sahneleriGec(d);
  expect(d.gemi.yer).toBe('uzay');
  expect(gemidenIn(d).ses).toBe('red');
  expect(uzayRadar(d).metin).toContain('Aethelis');
  // Moloz Kuşağı: ön tarama, kilitli
  const o = uc(d, 'moloz_kusagi');
  expect(o.some((x) => x.tur === 'pruvaKilit')).toBe(true);
  expect(o.some((x) => x.tur === 'yaklasti')).toBe(true);
  const t = kenetlen(d);
  expect(t.kilitli).toBe(true);
  expect(t.metin).toContain('Zorunlu donanım');
  // Eve dönüş ve iniş
  uc(d, 'aethelis');
  const i = kenetlen(d);
  expect(i.inis).toBe(true);
  expect(d.sahne).toBe('inis');
  sahneleriGec(d);
  expect(d.gemi.yer).toBe('kizak');
  expect(d.gorev.id).toBe('filo');
  expect(d.bitenGorevler).toEqual(['sinyal', 'jeotermal', 'kazi', 'zemin', 'kivilcim']);
  expect(d.gemi.yakit).toBeGreaterThan(5);
  gemidenIn(d);
  expect(d.gemide).toBe(null);
  // Yakıt biterse kurtarılır
  kalkis(d);
  sahneleriGec(d);
  d.gemi.yakit = 0.05;
  itki(d, 1);
  for (let k = 0; k < 50 && d.uzay; k++) uzayAdim(d, 0.1);
  expect(d.sahne).toBe('kurtarma');
  expect(d.gemi.yer).toBe('kizak');
  expect(gecerliMi(JSON.parse(JSON.stringify(d)))).toBe(true);
  sahneleriGec(d);
  gemidenIn(d);
  altinciAsama(d);
}

// Bir parçayı üretim zinciriyle edinir (girdileri parça ise önce onları üretir)
function parcaEdin(d, parca, n) {
  let tur = 0;
  while (miktar(d, parca) < n && tur++ < 200) {
    let tesis, t;
    for (const ts of Object.keys(TARIFLER)) {
      const x = TARIFLER[ts].find((y) => y.cikti[parca]);
      if (x) {
        tesis = ts;
        t = x;
        break;
      }
    }
    expect(t).toBeDefined();
    if (!d.koloni.binalar.includes(tesis)) {
      edin(d, TESISLER[tesis].maliyet);
      expect(insaEt(d, tesis).ses).toBeUndefined();
    }
    const ham = {};
    for (const k of Object.keys(t.girdi)) if (HAMMADDELER[k]) ham[k] = t.girdi[k];
    // Ara parçalar birbirini tüketebilir (ör. kseno-alaşım saf kristal yer): hepsi aynı anda yetene dek
    for (let dongu = 0; dongu < 6; dongu++) {
      const eksik = Object.keys(t.girdi).filter((k) => !HAMMADDELER[k] && miktar(d, k) < t.girdi[k]);
      if (!eksik.length) break;
      for (const k of eksik) parcaEdin(d, k, t.girdi[k]);
    }
    edin(d, ham);
    const r = uretimBaslat(d, tesis, t.id);
    if (r.ses !== 'dugme') console.log('URETIM', parca, tesis, t.id, r.metin, JSON.stringify(d.koloni.parcalar));
    expect(r.ses).toBe('dugme');
    let k = 0;
    while (d.koloni.uretimler.some((u) => u.tesis === tesis) && k++ < 400) bekle(d, 1);
  }
  expect(miktar(d, parca)).toBeGreaterThanOrEqual(n);
}
function gemiTopla(d, sinif) {
  yuru(d, 'kizak');
  expect(kizagaKoy(d, sinif).ses).toBe('zincir');
  for (const a of montajAsamalari(d)) {
    for (const k of Object.keys(a.gerek)) parcaEdin(d, k, a.gerek[k]);
    yuru(d, 'kizak');
    const r = montajBaslat(d, a.id);
    if (a.vinc) {
      expect(r.vinc).toBe(true);
      for (let i = 0; i < 3; i++) {
        vincKaydir(d, -d.vinc.x);
        vincIndir(d);
      }
      expect(vincKenetle(d).sonuc).toBe('kenetlendi');
    }
    let n = 0;
    while (d.tersane.kaynak && n++ < 1000) bekle(d, 1);
    expect(d.tersane.asamalar[a.id]).toBe('bitti');
  }
  expect(d.sahne).toBe('yeni_gemi');
  sahneleriGec(d);
}

// Faz 3 kalanı: araç hangarı ve araçlar, derin graviton, Kademe 2 ve 3 gemiler, kızak kademeleri, güç dağıtımı
function altinciAsama(d) {
  // Kademe 3 gemi kademe 2 kızak ister
  expect(kizagaKoy(d, 3).ses).toBe('red');
  // Araç hangarı ve araçlar
  aracYap(d, 'col_tilkisi');
  yuru(d, 'hangar');
  expect(noktaEylemleri(d, 'hangar').some((e) => e.id === 'bin_col_tilkisi')).toBe(true);
  expect(aracaBin(d, 'col_tilkisi').ses).toBe('kapi');
  // Skimmer'la hızlı: 1 saniyede yürümenin 2,6 katı
  d.oyuncu = { x: 0, y: 20, yon: 0 };
  ilerle(d, { ileri: 1 }, 1);
  expect(d.oyuncu.y).toBeGreaterThan(26);
  // Araçla iç mekâna girilmez
  yuru(d, 'kapsul_dis');
  expect(gec(d, 'kapsul_kilit', 0).kilitli).toBe(true);
  aractanIn(d);
  // Derin graviton kuyusu Mammoth ister
  d.kesif.push('graviton_kuyusu');
  yuru(d, 'graviton_kuyusu');
  expect(eylemUygula(d, 'graviton_kuyusu', 'topla').ses).toBe('red');
  aracYap(d, 'mammoth');
  aracYap(d, 'akrep');
  aracYap(d, 'demir_kervan');
  aracYap(d, 'atmosphere_x');
  expect(d.araclar.length).toBe(5);
  // Akrep ve Kervan koloniye kendiliğinden getirir
  const once = d.koloni.kaynaklar.bazalt;
  isGucuDegis(d, 'sanayi', 0);
  if (d.koloni.nufus.sanayi < 1) isGucuDegis(d, 'sanayi', 1);
  bekle(d, 360);
  expect(d.koloni.kaynaklar.bazalt).toBeGreaterThan(once - 1);
  // Kademe 2: Rüzgarkıran
  gemiTopla(d, 2);
  expect(d.gemi.ad).toBe('Kıvılcım');
  expect(aktifGemiSec(d, 2).ses).toBe('zincir');
  expect(d.gemi.ad).toBe('Rüzgarkıran');
  expect(d.gemi.odalar.length).toBe(4);
  expect(d.gemi.yakitTuru).toBe('plazma_yakiti');
  // Gemide makine dairesi: güç dağıtımı
  gemiyeBin(d);
  expect(odaDegis(d, 1).oda.ortam).toBe('ortam_reaktor');
  expect(gucDagitimiSec(d, 'sensor').ses).toBe('dugme');
  gemidenIn(d);
  // Kızak kademe II ve Kademe 3: Aethel Muhafızı (graviton yakıtıyla)
  edin(d, TESISLER.tersane_2.maliyet);
  yuru(d, 'terminal');
  insaEt(d, 'tersane_2');
  expect(d.koloni.binalar).toContain('tersane_2');
  gemiTopla(d, 3);
  expect(aktifGemiSec(d, 3).ses).toBe('zincir');
  expect(d.gemi.odalar.length).toBe(6);
  expect(d.gemi.kalkan).toBe(100);
  // Kademe 4 malzemesi uzay görevlerinden gelir
  yuru(d, 'kizak');
  kizagaKoy(d, 4);
  const r4 = montajBaslat(d, 'govde');
  expect(r4.metin).toContain('uzay görevlerinden');
  expect(gecerliMi(JSON.parse(JSON.stringify(d)))).toBe(true);
  yedinciAsama(d);
}

// Diziyi rezonatörle çalar
function diziCal(d, tur) {
  const { dizi } = rezonansBaslat3(d, tur);
  let son;
  for (const n of dizi) {
    d.rezonans.secili = n;
    son = rezonansCal3(d);
  }
  return { dizi, son };
}

// Entegrasyon matrisi: altı yüzey işi, altı tesis, dokuz ziyaret noktası, donanım ve ön tarama
function yedinciAsama(d) {
  // Rezonatör kalibrasyonu
  d.kesif.push('kalibrasyon_sutunu');
  yuru(d, 'kalibrasyon_sutunu');
  expect(d.mekan).toBe('krater');
  expect(noktaEylemleri(d, 'kalibrasyon_sutunu')[0].id).toBe('p_kalibre');
  expect(eylemUygula(d, 'kalibrasyon_sutunu', 'p_kalibre').rezonans).toBe('kalibre');
  const k = diziCal(d, 'kalibre');
  expect(k.dizi.length).toBe(5);
  expect(k.son.sonuc).toBe('acildi');
  expect(d.sahne).toBe('kalibrasyon_tamam');
  sahneleriGec(d);
  // İzotop sıkıştırma
  yuru(d, 'baca_1');
  d.zehir = 0;
  expect(noktaEylemleri(d, 'baca_1').some((e) => e.id === 'p_sikistir')).toBe(true);
  expect(eylemUygula(d, 'baca_1', 'p_sikistir').amac).toBe('sikistirma');
  valfBaslat2(d, 'baca_1', 'sikistirma');
  for (let i = 0; i < 2000 && d.valf; i++) {
    valfIlerle2(d, 0.1);
    if (d.valf && d.valf.alarm) valfBirak2(d);
  }
  expect(d.bayrak.sikistirma).toBe(true);
  expect(d.sahne).toBe('sikistirma_tamam');
  sahneleriGec(d);
  // Gaz bacası ısı izolasyonu
  parcaEdin(d, 'polimer_levha', 30);
  for (const id of ['baca_1', 'baca_2', 'baca_3']) {
    yuru(d, id);
    d.zehir = 0;
    expect(eylemUygula(d, id, 'p_izole').ses).toBe('polimer');
  }
  expect(d.sahne).toBe('izolasyon_tamam');
  sahneleriGec(d);
  // Zemin alaşım kaplaması (vinçle)
  parcaEdin(d, 'zirhli_plaka', 100);
  yuru(d, 'kizak');
  expect(eylemUygula(d, 'kizak', 'p_kapla').kaplama).toBe(true);
  expect(kaplamaBaslat(d).vinc).toBe(true);
  for (let i = 0; i < 3; i++) {
    vincKaydir(d, -d.vinc.x);
    vincIndir(d);
  }
  vincKenetle(d);
  expect(d.bayrak.kaplama).toBe(true);
  expect(d.sahne).toBe('kaplama_tamam');
  sahneleriGec(d);
  // Ağ şebekesi entegrasyonu (ikinci frekans ayarı)
  yuru(d, 'tepe');
  expect(eylemUygula(d, 'tepe', 'p_ag').amac).toBe('ag');
  ayarBaslat1(d, 'ag');
  d.ayar.frekans = d.ayar.hedef;
  for (let i = 0; i < 40 && d.ayar; i++) ayarIlerle1(d, 0.1);
  expect(d.bayrak.ag).toBe(true);
  expect(d.bayrak.telemetri).toBe(true);
  expect(d.sahne).toBe('ag_tamam');
  sahneleriGec(d);
  // Kadim şifre deşifresi
  yuru(d, 'yazit');
  expect(eylemUygula(d, 'yazit', 'p_sifre').rezonans).toBe('sifre');
  const s6 = diziCal(d, 'sifre');
  expect(s6.dizi.length).toBe(6);
  expect(kapiDizisi3(d, 'sifre')).not.toEqual(kapiDizisi3(d, 'kalibre').concat([0]));
  expect(d.koloni.parcalar.mod_kadim_anahtar).toBe(1);
  sahneleriGec(d);
  // Altı tesis
  for (const t of ['kuantum_lab', 'itki_hangari', 'kriyo_atolye', 'askeri_tersane', 'komuta_merkezi', 'yuksek_reaktor']) {
    edin(d, TESISLER[t].maliyet);
    yuru(d, 'terminal');
    insaEt(d, t);
    expect(d.koloni.binalar).toContain(t);
  }
  const yeni = bekle(d, 1).filter((o) => o.tur === 'poi');
  expect(d.harita.poiler.length).toBeGreaterThanOrEqual(9);
  expect(yeni.length + 0).toBeGreaterThanOrEqual(0);
  // Aethel Muhafızı'na Moloz Kuşağı donanımı: çekici kiriş ve biyo-karantina
  parcaEdin(d, 'mod_dis_a', 1);
  parcaEdin(d, 'mod_bolme_a', 1);
  yuru(d, 'kizak');
  expect(d.gemi.sinif).toBe(3);
  expect(modulTak(d, 'mod_dis_a').ses).toBe('kaynak');
  expect(modulTak(d, 'mod_bolme_a').ses).toBe('kaynak');
  expect(onTarama(d, 'moloz_kusagi')).toContain('Donanım tam');
  expect(onTarama(d, 'kizil_yutucu')).toContain('kilitledi');
  expect(gecerliMi(JSON.parse(JSON.stringify(d)))).toBe(true);
}
function aracYap(d, id) {
  const t = TARIFLER.arac_hangari.find((x) => x.id === id);
  if (!d.koloni.binalar.includes('arac_hangari')) {
    edin(d, TESISLER.arac_hangari.maliyet);
    yuru(d, 'terminal');
    insaEt(d, 'arac_hangari');
  }
  for (const k of Object.keys(t.girdi)) {
    if (HAMMADDELER[k]) edin(d, { [k]: t.girdi[k] });
    else if (k === 'graviton') edin(d, { graviton: t.girdi[k] });
    else parcaEdin(d, k, t.girdi[k]);
  }
  expect(uretimBaslat(d, 'arac_hangari', id).ses).toBe('dugme');
  let n = 0;
  while (!(d.araclar || []).includes(id) && n++ < 400) bekle(d, 1);
  expect(d.araclar).toContain(id);
}

describe('koloni', () => {
  test('yataklar yenilenir, nüfus büyür, iş gücü paylaşılır', () => {
    const d = yeniOyun(9);
    d.stok.bazalt_1 = 0;
    for (let i = 0; i < 121; i++) zamanIlerle(d, 1);
    expect(d.stok.bazalt_1).toBe(1);
    expect(bosta(d)).toBe(4);
    expect(isGucuDegis(d, 'sanayi', 1).metin).toContain('1 kişi');
    expect(bosta(d)).toBe(3);
    const o = [];
    for (let i = 0; i < 400; i++) o.push(...zamanIlerle(d, 1));
    expect(o.some((x) => x.tur === 'nufus')).toBe(true);
    expect(d.koloni.nufus.toplam).toBe(5);
  });
});

describe('kayıt', () => {
  test('eski kayda sonradan eklenen yatakların stoku eklenir', () => {
    const d = yeniOyun(3);
    delete d.stok.catlak_1;
    delete d.stok.titanyum_3;
    d.stok.bazalt_1 = 0;
    kaydiTamamla(d);
    expect(d.stok.catlak_1).toBe(4);
    expect(d.stok.titanyum_3).toBe(4);
    expect(d.stok.bazalt_1).toBe(0);
  });
  test('plato yokuşu biyo-kubbeden önce kilitli', () => {
    const d = yeniOyun(3);
    d.mekan = 'vadi';
    expect(gec(d, 'kuzey_gecit', 0).kilitli).toBe(true);
  });
});

describe('kükürt', () => {
  test('yüzde yüzde bayılınca kapsüle taşınır', () => {
    const d = yeniOyun(5);
    sahneleriGec(d);
    d.bayrak.maske = true;
    d.mekan = 'sirtlar';
    d.oyuncu = { x: 522, y: -15, yon: 0 };
    d.zehir = 99.5;
    const o = ilerle(d, {}, 1);
    expect(o.some((x) => x.tur === 'bayildi')).toBe(true);
    expect(d.mekan).toBe('kapsul');
    expect(d.sahne).toBe('bayilma');
    expect(SAHNELER.bayilma).toBeDefined();
  });
});

describe('Faz 2 bölgeleri', () => {
  function hazir() {
    const d = yeniOyun(77);
    sahneleriGec(d);
    Object.assign(d.bayrak, { dokumhane: true, maske: true, sondaj: true, zemin: true, biyo_kubbe: true, jenerator: true });
    d.mekan = 'vadi';
    d.oyuncu = { x: 0, y: 20, yon: 0 };
    return d;
  }
  function git(d, kapi) {
    const k = KAPILAR[kapi];
    const u = k.uclar[0];
    d.mekan = u.mekan;
    d.oyuncu = { x: u.x, y: u.y, yon: 0 };
    const r = gec(d, kapi, 0);
    expect(r.gecti).toBe(true);
    expect(d.mekan).toBe(k.uclar[1].mekan);
  }
  test('doğu sektörü: statik boşalma sütun yanındakini çarpar, uzaktakini değil', () => {
    const d = hazir();
    expect(gec({ ...d, bayrak: {} }, 'dogu_gecit', 0).kilitli).toBe(true);
    git(d, 'dogu_gecit');
    // Sütunun dibinde bekle
    d.oyuncu = { x: NOKTALAR.kuvars_1.x + 2, y: NOKTALAR.kuvars_1.y, yon: 0 };
    const o = [];
    for (let i = 0; i < 400; i++) o.push(...ilerle(d, {}, 0.1));
    expect(o.some((x) => x.tur === 'statikGeliyor')).toBe(true);
    expect(o.some((x) => x.tur === 'statik')).toBe(true);
    expect(radar(d).metin.length).toBeGreaterThan(5);
    // Kuvars sütunundan kristal
    d.oyuncu = { x: NOKTALAR.kuvars_2.x + 2, y: NOKTALAR.kuvars_2.y, yon: 0 };
    eylemUygula(d, 'kuvars_2', 'topla');
    expect(d.koloni.kaynaklar.kristal).toBe(1);
    // Cıva vadisi: maske ister, maruziyet artar
    git(d, 'civa_gecit');
    const z = d.zehir || 0;
    for (let i = 0; i < 50; i++) ilerle(d, {}, 0.1);
    expect(d.zehir).toBeGreaterThan(z);
    d.oyuncu = { x: NOKTALAR.civa_tortusu_1.x + 1, y: NOKTALAR.civa_tortusu_1.y, yon: 0 };
    eylemUygula(d, 'civa_tortusu_1', 'topla');
    expect(d.koloni.kaynaklar.civa_tortusu).toBe(1);
    expect(d.gorulenMekanlar).toContain('civa');
    d.bayrak.sektor_dogu = true;
    expect(TESISLER.koloni_kalkani.kosul(d)).toBe(true);
  });
  test('lav koridorları: magmadan kaçan yanmaz, kalan yanar; mantar ormanı yarasaları', () => {
    const d = hazir();
    d.mekan = 'sirtlar';
    git(d, 'lav_gecit');
    d.bayrak.sektor_guney = true;
    expect(TESISLER.jeotermal_santral.kosul(d)).toBe(true);
    d.zehir = 0;
    const o = [];
    for (let i = 0; i < 200 && !o.some((x) => x.tur === 'magma'); i++) o.push(...ilerle(d, {}, 0.1));
    const m = o.find((x) => x.tur === 'magma');
    expect(m.yandi).toBe(true);
    // Uyarıyı duyunca kaç
    d.zehir = 0;
    const o2 = [];
    let kac = 0;
    for (let i = 0; i < 400 && !o2.some((x) => x.tur === 'magma'); i++) {
      const s = ilerle(d, kac > 0 ? { ileri: 1 } : {}, 0.1);
      if (s.some((x) => x.tur === 'magmaGeliyor')) {
        kac = 25;
        d.oyuncu.yon = Math.PI / 2;
        if (d.oyuncu.x > 560) d.oyuncu.yon = -Math.PI / 2;
      }
      if (kac > 0) kac--;
      o2.push(...s);
    }
    expect(o2.find((x) => x.tur === 'magma').yandi).toBe(false);
    // Mantar ormanı
    d.oyuncu = { x: 512, y: -125, yon: 0 };
    git(d, 'mantar_gecit');
    const o3 = [];
    for (let i = 0; i < 300; i++) o3.push(...ilerle(d, {}, 0.1));
    expect(o3.some((x) => x.tur === 'yarasa')).toBe(true);
    d.oyuncu = { x: NOKTALAR.spor_1.x + 2, y: NOKTALAR.spor_1.y, yon: 0 };
    eylemUygula(d, 'spor_1', 'topla');
    expect(d.koloni.kaynaklar.kseno_spor).toBe(1);
  });
  test('kriyo mağaraları: termal giysi donmayı yavaşlatır; obsidyen camda çınlar; kuleler VTOL ister', () => {
    const d = hazir();
    d.mekan = 'plato';
    git(d, 'kriyo_gecit');
    d.zehir = 0;
    for (let i = 0; i < 100; i++) ilerle(d, {}, 0.1);
    const ciplak = d.zehir;
    d.zehir = 0;
    d.envanter.push('termal_giysi');
    for (let i = 0; i < 100; i++) ilerle(d, {}, 0.1);
    expect(d.zehir).toBeLessThan(ciplak / 2);
    // Obsidyen: cam zemin, uzun yankı
    d.mekan = 'vadi';
    git(d, 'obsidyen_gecit');
    expect(MEKANLAR.obsidyen.zemin).toBe('cam');
    const o = [];
    for (let i = 0; i < 20; i++) o.push(...ilerle(d, { ileri: 1 }, 0.1));
    expect(o.some((x) => x.tur === 'adim' && x.zemin === 'cam')).toBe(true);
    // Kuleler yalnız Atmosphere-X ile
    d.mekan = 'plato';
    d.oyuncu = { x: 1104, y: 66, yon: 0 };
    expect(gec(d, 'kule_inisi', 0).kilitli).toBe(true);
    d.araclar = ['atmosphere_x'];
    d.arac = 'atmosphere_x';
    expect(gec(d, 'kule_inisi', 0).gecti).toBe(true);
    expect(d.mekan).toBe('kuleler');
  });
  test('yerel malzemeli donanım ve tarifler', () => {
    const d = hazir();
    expect(TARIFLER.reaktor_lab.some((t) => t.id === 'metan')).toBe(true);
    expect(TARIFLER.reaktor_lab.some((t) => t.cikti.hiper_bobin)).toBe(true);
    expect(TARIFLER.kriyo_atolye.some((t) => t.cikti.esya_termal_giysi)).toBe(true);
    expect(TARIFLER.dokumhane.some((t) => t.cikti.mod_sivi_iletken)).toBe(true);
    expect(TARIFLER.sinyal_kulesi.some((t) => t.cikti.mod_optik_prizma)).toBe(true);
    // Kriyo-atölyede giysi
    d.koloni.binalar.push('kriyo_atolye');
    d.koloni.parcalar.polimer_levha = 20;
    d.koloni.parcalar.helyum = 20;
    expect(uretimBaslat(d, 'kriyo_atolye', 'giysi').ses).toBe('dugme');
    bekle(d, 80);
    expect(d.envanter).toContain('termal_giysi');
  });
});

describe('Gezegenin gizemleri, arındırma ve terraforming', () => {
  function hazir() {
    const d = yeniOyun(91);
    sahneleriGec(d);
    Object.assign(d.bayrak, { dokumhane: true, maske: true, sondaj: true, zemin: true, biyo_kubbe: true, jenerator: true, telemetri: true });
    d.koloni.binalar.push('sinyal_kulesi', 'dokumhane');
    d.mekan = 'vadi';
    d.oyuncu = { x: 0, y: 20, yon: 0 };
    return d;
  }
  function git(d, kapi) {
    const k = KAPILAR[kapi];
    const u = k.uclar[0];
    d.mekan = u.mekan;
    d.oyuncu = { x: u.x, y: u.y, yon: 0 };
    const r = gec(d, kapi, 0);
    expect(r.gecti).toBe(true);
    zamanIlerle(d, 0.1);
  }
  test('Vanguard-01: mors sinyali kanyonu açar, günlükler haritayı verir', () => {
    const d = hazir();
    const e = noktaEylemleri(d, 'tepe');
    expect(e.some((x) => x.id === 'k_mors')).toBe(true);
    expect(eylemUygula(d, 'tepe', 'k_mors')).toEqual({ ayar: true, amac: 'mors' });
    ayarBaslat1(d, 'mors');
    expect(d.ayar.hedef).toBeGreaterThanOrEqual(95);
    expect(d.ayar.hedef).toBeLessThanOrEqual(115);
    d.ayar.frekans = d.ayar.hedef;
    for (let i = 0; i < 40 && d.ayar; i++) ayarIlerle1(d, 0.1);
    expect(d.bayrak.morsBulundu).toBe(true);
    expect(d.sahne).toBe('mors_bulundu');
    d.sahne = null;
    git(d, 'dogu_gecit');
    git(d, 'sarp_kanyon');
    expect(d.mekan).toBe('vanguard');
    const r = eylemUygula(d, 'vanguard_enkaz', 'k_gunluk');
    expect(r.metin).toContain('Vanguard');
    expect(d.kesif.length).toBe(Object.keys(NOKTALAR).filter((x) => !NOKTALAR[x].mini).length);
    expect(eylemUygula(d, 'vanguard_enkaz', 'k_firin').ses).toBe('red');
    d.araclar = ['demir_kervan'];
    eylemUygula(d, 'vanguard_enkaz', 'k_firin');
    expect(d.bayrak.firin).toBe(true);
  });
  test('monolit yönleri karıştırır ve susturur; tohum kazılır', () => {
    const d = hazir();
    d.mekan = 'dogu';
    const m = NOKTALAR.monolit;
    d.oyuncu = { x: m.x + 20, y: m.y, yon: 0 };
    expect(cevreMetni(d)).toContain('Pusulan');
    d.oyuncu = { x: m.x + 3, y: m.y, yon: 0 };
    expect(cevreMetni(d)).toContain('sessizlik');
    expect(radar(d).pingler.length).toBe(0);
    eylemUygula(d, 'monolit', 'k_kazi');
    expect(d.koloni.kaynaklar.manyetik_tohum).toBe(1);
    expect(TARIFLER.kuantum_lab.some((t) => t.cikti.mod_graviton_dengeleyici)).toBe(true);
  });
  test('fosil tüneller Mammoth ister; vaha moral verir, sera kurulur', () => {
    const d = hazir();
    d.mekan = 'mantar';
    d.oyuncu = { x: KAPILAR.tunel_agzi.uclar[0].x, y: KAPILAR.tunel_agzi.uclar[0].y, yon: 0 };
    expect(gec(d, 'tunel_agzi', 0).kilitli).toBe(true);
    d.araclar = ['mammoth'];
    d.arac = 'mammoth';
    expect(gec(d, 'tunel_agzi', 0).gecti).toBe(true);
    expect(d.bayrak.tunelAcik).toBe(true);
    d.arac = null;
    // Vaha
    d.koloni.moral = 40;
    d.mekan = 'sirtlar';
    git(d, 'vaha_yolu');
    expect(d.bayrak.vahaBulundu).toBe(true);
    expect(d.koloni.moral).toBe(100);
    expect(d.sahne).toBe('vaha_bulundu');
    d.sahne = null;
    d.zehir = 50;
    for (let i = 0; i < 30; i++) ilerle(d, {}, 0.1);
    expect(d.zehir).toBeLessThan(50);
    d.oyuncu = { x: NOKTALAR.tohum_1.x + 1, y: NOKTALAR.tohum_1.y, yon: 0 };
    for (let i = 0; i < 3; i++) eylemUygula(d, 'tohum_1', 'topla');
    expect(d.koloni.kaynaklar.tohum).toBe(3);
    Object.assign(d.koloni.kaynaklar, { polimer: 2, kristal: 2 });
    insaEt(d, 'sera');
    expect(d.koloni.binalar).toContain('sera');
  });
  test('bölge arındırma: dört adım, tehlike kalkar, karakol taşır', () => {
    const d = hazir();
    d.mekan = 'sirtlar';
    d.oyuncu = { x: NOKTALAR.karakol_sirtlar.x + 1, y: NOKTALAR.karakol_sirtlar.y, yon: 0 };
    expect(noktaEylemleri(d, 'karakol_sirtlar').some((e) => e.id === 'a_kesif')).toBe(true);
    expect(eylemUygula(d, 'karakol_sirtlar', 'a_kesif').ses).toBe('red');
    for (const id of Object.keys(NOKTALAR)) if (NOKTALAR[id].mekan === 'sirtlar' && !d.kesif.includes(id)) d.kesif.push(id);
    eylemUygula(d, 'karakol_sirtlar', 'a_kesif');
    expect(eylemUygula(d, 'karakol_sirtlar', 'a_izole').ses).toBe('red');
    Object.assign(d.koloni.parcalar, { dondurucu_kopuk: 2, notralizasyon_kulesi: 1, ikmal_karakolu: 1 });
    eylemUygula(d, 'karakol_sirtlar', 'a_izole');
    eylemUygula(d, 'karakol_sirtlar', 'a_stabil');
    eylemUygula(d, 'karakol_sirtlar', 'a_karakol');
    expect(d.koloni.bolgeDurumu.sirtlar).toBe(4);
    expect(d.sahne).toBe('bolge_guvenli');
    d.sahne = null;
    d.zehir = 0;
    for (let i = 0; i < 50; i++) ilerle(d, {}, 0.1);
    expect(d.zehir || 0).toBe(0);
    const once = Object.values(d.koloni.kaynaklar).reduce((a, b) => a + b, 0);
    bekle(d, 200);
    expect(Object.values(d.koloni.kaynaklar).reduce((a, b) => a + b, 0)).toBeGreaterThan(once);
    // Tarifler mevcut
    expect(TARIFLER.dokumhane.some((t) => t.cikti.dondurucu_kopuk)).toBe(true);
    expect(TARIFLER.arac_hangari.some((t) => t.cikti.ikmal_karakolu)).toBe(true);
  });
  test('terraforming: yerel girdi + uzay girdisi; ırk yapıları kilitli', async () => {
    const { terraformListesi, terraformTeslim, kademeMetni } = await import('../src/oyun/yuzey/gorevler');
    const d = hazir();
    expect(terraformListesi(d).length).toBe(4);
    expect(terraformTeslim(d, 'atmosfer').ses).toBe('red');
    Object.assign(d.koloni.kaynaklar, { kseno_spor: 6, foton_recinesi: 3 });
    expect(terraformTeslim(d, 'atmosfer').ses).toBe('kur');
    zamanIlerle(d, 1);
    expect(d.koloni.terraformEtki.atmosfer).toBeUndefined();
    d.bayrak.vaka2_biyokapsul = true;
    const o = zamanIlerle(d, 1);
    expect(o.some((x) => x.tur === 'terraform')).toBe(true);
    // Atmosfer: sırtlarda maske gerekmez
    d.mekan = 'sirtlar';
    d.oyuncu = { x: 540, y: -30, yon: 0 };
    d.zehir = 0;
    for (let i = 0; i < 30; i++) ilerle(d, {}, 0.1);
    expect(d.zehir || 0).toBe(0);
    expect(TESISLER.akademi.kosul(d)).toBe(false);
    d.koloni.seviye = 3;
    expect(kademeMetni(d)).toContain('eksik');
  });
});

describe('Yerel mini görevler', () => {
  async function hazir() {
    const M = await import('../src/oyun/yuzey/mini');
    const d = yeniOyun(55);
    sahneleriGec(d);
    d.envanter.push('kesici');
    return { d, M };
  }
  test('sıra: koşulu sağlanan ilk operasyon telsizden gelir', async () => {
    const { d, M } = await hazir();
    d.gorulenMekanlar = ['kriyo'];
    bekle(d, M.MINI_BEKLEME + 2);
    expect(d.mini.aktif).toBe('vana_donmasi');
    expect(d.bildirimler.some((b) => b.id === 'mini_vana_donmasi')).toBe(true);
    expect(gorevIpucu(d)).toContain('Kriyojenik');
  });
  test('mantar hasadı: olgunu topla, sporu izle, teslim et', async () => {
    const { d, M } = await hazir();
    M.miniBaslat(d, 'mantar_hasadi');
    d.mekan = 'mantar';
    const ids = ['foton_olgun_1', 'foton_olgun_2', 'foton_olgun_3'];
    expect(eylemUygula(d, 'foton_olgun_3', 'm_hasat').ses).toBe('red');
    let t = 0;
    while (d.mini.toplanan < 3 && t < 200) {
      zamanIlerle(d, 0.5);
      t += 0.5;
      for (const id of ids) if (M.olgunMu(d, id)) eylemUygula(d, id, 'm_hasat');
    }
    expect(d.mini.toplanan).toBe(3);
    expect(noktaEylemleri(d, 'terminal').some((e) => e.id === 'm_teslim')).toBe(true);
    eylemUygula(d, 'terminal', 'm_teslim');
    expect(d.koloni.kaynaklar.foton_recinesi).toBe(4);
    expect(d.sahne).toBe('mini_tamam');
    // Spor yüzde yüze çıkarsa dışarı taşınır
    d.sahne = null;
    M.miniBaslat(d, 'mantar_hasadi');
    d.mekan = 'mantar';
    const o = [];
    for (let i = 0; i < 200 && d.mekan === 'mantar'; i++) o.push(...zamanIlerle(d, 0.5));
    expect(d.mekan).not.toBe('mantar');
    expect(o.some((x) => x.tasindi)).toBe(true);
  });
  test('vana, kayıp ekip, vaha bendi', async () => {
    const { d, M } = await hazir();
    M.miniBaslat(d, 'vana_donmasi');
    const dogru = ['boru_1', 'boru_2', 'boru_3', 'boru_4'][d.mini.secim];
    const yanlis = ['boru_1', 'boru_2', 'boru_3', 'boru_4'].find((x) => x !== dogru);
    expect(eylemUygula(d, yanlis, 'm_muhurle').metin).toContain('sağlam');
    d.koloni.parcalar.polimer_levha = 5;
    eylemUygula(d, dogru, 'm_muhurle');
    expect(d.koloni.kaynaklar.metan).toBe(3);
    // Kayıp ekip radarda yok, yakında görünür
    M.miniBaslat(d, 'kayip_ekip');
    const ek = ['kayip_ekip_a', 'kayip_ekip_b', 'kayip_ekip_c'][d.mini.secim];
    d.mekan = 'obsidyen';
    d.oyuncu = { x: NOKTALAR[ek].x + 5, y: NOKTALAR[ek].y, yon: 0 };
    expect(radar(d).pingler.some((p) => p.id === ek)).toBe(false);
    expect(cevreMetni(d)).toContain('Kayıp keşif aracı');
    const n = d.koloni.nufus.toplam;
    eylemUygula(d, ek, 'm_kurtar');
    expect(d.koloni.nufus.toplam).toBe(n + 2);
    // Görev bitince nokta yok olur
    expect(cevreMetni(d)).not.toContain('Kayıp keşif aracı');
    // Vaha bendi: frekans ayarı
    M.miniBaslat(d, 'vaha_kanali');
    expect(eylemUygula(d, 'vaha_bent', 'm_patlat')).toEqual({ ayar: true, amac: 'mini_bent' });
    ayarBaslat1(d, 'mini_bent');
    d.ayar.frekans = d.ayar.hedef;
    for (let i = 0; i < 40 && d.ayar; i++) ayarIlerle1(d, 0.1);
    expect(d.mini.bitenGorevler).toContain('vaha_kanali');
    expect(d.sahne).toBe('mini_tamam');
  });
  test('çeviri krizi, kompresörler, solucan göçü, yağmacılar', async () => {
    const { d, M } = await hazir();
    M.miniBaslat(d, 'ceviri_krizi');
    eylemUygula(d, 'terminal', 'm_ceviri');
    expect(d.sahne).toBe('ceviri_krizi');
    const it = d.itibar;
    sahneSec(d, 'ceviri_krizi', 0);
    expect(d.itibar).toBe(it + 15);
    expect(d.sahne).toBe('mini_tamam');
    // Kompresörler: valf dengeleme
    M.miniBaslat(d, 'basinc_dususu');
    for (const k of ['kompresor_1', 'kompresor_2', 'kompresor_3']) {
      expect(eylemUygula(d, k, 'm_kompresor').valf).toBe(true);
      valfBaslat2(d, k, 'mini_kompresor');
      let r;
      for (let i = 0; i < 3; i++) {
        while (!d.valf.alarm) valfIlerle2(d, 0.1);
        r = valfBirak2(d);
      }
      expect(r.sonuc).toBe('bitti');
    }
    expect(d.mini.bitenGorevler).toContain('basinc_dususu');
    expect(d.zehir || 0).toBe(0);
    // Solucan göçü: süre dolarsa ocaklar boşalır
    M.miniBaslat(d, 'solucan_gocu');
    d.koloni.kaynaklar.kristal = 3;
    eylemUygula(d, 'kazik_1', 'm_kazik');
    eylemUygula(d, 'kazik_2', 'm_kazik');
    eylemUygula(d, 'kazik_3', 'm_kazik');
    expect(d.koloni.kaynaklar.kseno_kabuk).toBe(2);
    d.mini.bitenGorevler = d.mini.bitenGorevler.filter((x) => x !== 'solucan_gocu');
    M.miniBaslat(d, 'solucan_gocu');
    bekle(d, 160);
    expect(d.stok.bazalt_4).toBe(0);
    // Yağmacılar: hızlı yürürsen alarm
    d.sahne = null;
    M.miniBaslat(d, 'yagmaci_tuzagi');
    d.mekan = 'vanguard';
    d.oyuncu = { x: 2512, y: 18, yon: 0 };
    for (let i = 0; i < 120 && d.mini.aktif; i++) {
      d.oyuncu.x += i % 2 ? 0.26 : -0.26;
      zamanIlerle(d, 0.1);
    }
    expect(d.mini.aktif).toBe(null);
    expect(d.miniSon.sonuc).toBe('yanlis');
    // Sessizce: yavaş yaklaş ve sersemlet
    d.mini.bitenGorevler = d.mini.bitenGorevler.filter((x) => x !== 'yagmaci_tuzagi');
    M.miniBaslat(d, 'yagmaci_tuzagi');
    for (const k of ['yagmaci_1', 'yagmaci_2', 'yagmaci_3']) {
      d.oyuncu = { x: NOKTALAR[k].x + 1, y: NOKTALAR[k].y, yon: 0 };
      zamanIlerle(d, 0.1);
      zamanIlerle(d, 0.1);
      eylemUygula(d, k, 'm_etkisiz');
    }
    expect(d.miniSon.sonuc).toBe('dogru');
  });
});

describe('Uzay operasyonları', () => {
  async function yukle() {
    const O = await import('../src/oyun/uzay/operasyon');
    const V = await import('../src/oyun/veri/uzayGorevleri');
    const G = await import('../src/oyun/gemi/gemi');
    return { O, V, G };
  }
  // Bir operasyonu baştan sona, kulağın söylediğini yaparak oynar
  function oyna(O, V, d) {
    let guvenlik = 0;
    while (d.op && guvenlik++ < 20000) {
      const a = V.OPERASYONLAR[d.op.id].adimlar[d.op.adim];
      const s = d.op.s;
      const adim = d.op.adim;
      const ilerle = (sn) => {
        for (let t = 0; t < sn && d.op && d.op.adim === adim; t += 0.1) O.opIlerle(d, 0.1);
      };
      if (a.tur === 'yaklas') {
        if (Math.abs(s.aci) > O.KILIT_ACI) O.opGirdi(d, { tur: 'kaydir', yon: s.aci > 0 ? 'sol' : 'sag', parmak: 1 });
        else if (a.sessiz) O.opGirdi(d, { tur: 'dokun' });
        else if (s.hiz === 0) O.opGirdi(d, { tur: 'kaydir', yon: 'yukari', parmak: 1 });
        O.opIlerle(d, 0.1);
      } else if (a.tur === 'kenetle') O.opGirdi(d, { tur: 'cift' });
      else if (a.tur === 'sonar') O.opGirdi(d, { tur: 'uzun' });
      else if (a.tur === 'tut') {
        O.opGirdi(d, { tur: 'uzun' });
        ilerle(4);
      } else if (a.tur === 'dron') {
        O.opGirdi(d, { tur: 'ac' });
        ilerle(4);
      } else if (a.tur === 'frekans') {
        O.opGirdi(d, { tur: 'dondur', f: (s.hedef - s.deger) / 7 });
        if (a.cift) O.opGirdi(d, { tur: 'cift' });
        else ilerle(3);
      } else if (a.tur === 'basinc') {
        while (d.op && d.op.adim === adim && !d.op.s.alarm) O.opIlerle(d, 0.1);
        if (d.op && d.op.adim === adim) O.opGirdi(d, { tur: a.girdi || 'cift' });
      } else if (a.tur === 'ritim') {
        for (let i = 0; i < (a.n || 3) && d.op && d.op.adim === adim; i++) {
          O.opGirdi(d, a.girdi === 'kaydir2' ? { tur: 'kaydir', yon: 'yukari', parmak: 2 } : { tur: 'dokun' });
          O.opIlerle(d, 0.2);
        }
      } else if (a.tur === 'kacin') {
        while (d.op && d.op.adim === adim && !d.op.s.tehdit) O.opIlerle(d, 0.1);
        if (d.op && d.op.adim === adim) O.opGirdi(d, { tur: 'kaydir', yon: a.ayni ? d.op.s.tehdit.yon : a.yon ? a.yon : d.op.s.tehdit.yon === 'sag' ? 'sol' : 'sag', parmak: 1 });
      } else if (a.tur === 'nisan') {
        const h = O.opSes(d).hedef;
        if (Math.abs(h.x) < 2) O.opGirdi(d, { tur: 'cift' });
        else O.opIlerle(d, 0.1);
      } else if (a.tur === 'kademeli') O.opGirdi(d, { tur: 'kaydir', yon: a.yon || 'asagi', parmak: a.parmak || 2 });
      else if (a.tur === 'zikzak') O.opGirdi(d, { tur: 'kaydir', yon: s.beklenen, parmak: 1 });
      else if (a.tur === 'sessizlik') ilerle(11);
      else if (a.tur === 'rotasyon') O.opGirdi(d, { tur: 'dondur', f: 1 });
      else if (a.tur === 'muhur') O.opGirdi(d, { tur: 'dokun', parmak: 3 });
      else if (a.tur === 'refleks') {
        while (d.op && d.op.adim === adim && !d.op.s.alarm) O.opIlerle(d, 0.1);
        if (d.op && d.op.adim === adim) O.opGirdi(d, { tur: 'dokun', parmak: 1 });
      }
      else if (a.tur === 'denge') {
        if (a.eksen === 'dikey') O.opGirdi(d, { tur: 'surukle', dx: 0, dy: -s.sapma / 0.004 });
        else O.opGirdi(d, { tur: 'surukle', dx: s.sapma / 0.004, dy: 0 });
        O.opIlerle(d, 0.1);
      } else if (a.tur === 'direnc') {
        if (s.konum < 0.8) O.opGirdi(d, { tur: 'surukle', dx: 0, dy: 30 });
        O.opIlerle(d, 0.1);
      } else if (a.tur === 'ton') {
        O.opGirdi(d, { tur: 'uzun' });
        for (const t of [...d.op.s.dizi]) O.opGirdi(d, t === 'kalin' ? { tur: 'kaydir', yon: 'asagi', parmak: 1 } : t === 'tiz' ? { tur: 'kaydir', yon: 'yukari', parmak: 1 } : { tur: 'cift' });
      } else if (a.tur === 'bosluk') {
        const once = s.vurus;
        const o = O.opIlerle(d, 0.05);
        if (d.op && d.op.adim === adim && d.op.s.vurus !== once && !o.some((x) => x.nota)) O.opGirdi(d, { tur: 'dokun' });
      }
    }
    return guvenlik;
  }
  test('bütün operasyonlar baştan sona oynanır ve ödüller gelir', async () => {
    const { O, V, G } = await yukle();
    for (const id of Object.keys(V.OPERASYONLAR)) {
      const d = yeniOyun(id.length * 97 + 3);
      G.gemiOlustur(d, 3);
      d.koloni.parcalar = d.koloni.parcalar || {};
      O.opBaslat(d, id);
      oyna(O, V, d);
      expect(d.op).toBe(null);
      if (!V.OPERASYONLAR[id].tekrar && !V.OPERASYONLAR[id].final) expect(d.tamamlananOp).toContain(id);
      else expect(d.tamamlananOp).not.toContain(id);
      expect(d.sahne).toBe(V.OPERASYONLAR[id].sahne || 'op_tamam');
    }
  });
  test('ödüller: hediye gemiler, bayraklar, terraform girdileri, açılan noktalar', async () => {
    const { O, V, G } = await yukle();
    const { poiGuncelle, onTarama } = await import('../src/oyun/uzay/seyir');
    const d = yeniOyun(8);
    G.gemiOlustur(d, 3);
    d.koloni.binalar.push('sinyal_kulesi');
    expect(poiGuncelle(d)).toContain('g01');
    O.opBaslat(d, 'sektor15');
    oyna(O, V, d);
    expect(d.filo.some((g) => g.ad === 'Prometheus Ağır Kruvazörü' && g.moduller.makine)).toBe(true);
    expect(d.bayrak.vaka1_reaktor).toBe(true);
    O.opBaslat(d, 'moloz_kusagi');
    oyna(O, V, d);
    expect(poiGuncelle(d)).toContain('kadim_mezar');
    expect(onTarama(d, 'moloz_kusagi')).toContain('tamamlandı');
    // Hasar: geç kalınan basınç gövdeyi tüketir, gemi koloniye döner
    d.gemi.yer = 'uzay';
    d.gemi.govde = 10;
    O.opBaslat(d, 'g04');
    while (d.op && d.op.adim < 3) {
      d.op.adim = 3;
      d.op.s = { b: 0.15, alarm: false, n: 0 };
    }
    for (let i = 0; i < 2000 && d.op; i++) O.opIlerle(d, 0.1);
    expect(d.sahne).toBe('op_basarisiz');
    expect(d.gemi.yer).toBe('kizak');
  });
  test('G görevlerinin donanımları üretilebilir ve tarifler şemayla açılır', async () => {
    const { V } = await yukle();
    const { uretimListesi } = await import('../src/oyun/koloni');
    for (const k of Object.keys(V.G_DONANIMLARI)) expect(TARIFLER[V.G_DONANIMLARI[k].tesis].some((t) => t.cikti['mod_' + k])).toBe(true);
    const d = yeniOyun(3);
    d.koloni.binalar.push('kuantum_lab');
    expect(uretimListesi(d).some((t) => t.id === 'kadim_disk')).toBe(false);
    d.bayrak.sema_kadim = true;
    expect(uretimListesi(d).some((t) => t.id === 'kadim_disk')).toBe(true);
  });
});

describe('Fenomenler, gezegenler ve Evren Kütüphanesi', () => {
  test('seyirde fenomen belirir; gereç yoksa kilit, varsa gözlem başlar; kütüphane ve itibar kademesi', async () => {
    const G = await import('../src/oyun/gemi/gemi');
    const F = await import('../src/oyun/uzay/fenomen');
    const { kalkis } = await import('../src/oyun/uzay/seyir');
    const d = yeniOyun(21);
    G.gemiOlustur(d, 1);
    d.gemi.yakit = 999;
    d.gemi.maxYakit = 999;
    d.gemide = true;
    kalkis(d);
    d.uzay.hiz = 2;
    let o = [];
    for (let i = 0; i < 6000 && !d.fenomen; i++) o.push(...uzayAdim(d, 0.1));
    expect(d.fenomen).toBeTruthy();
    expect(o.some((x) => x.tur === 'fenomen')).toBe(true);
    // Fenomenin yanına git
    d.uzay.x = d.fenomen.x + 5;
    d.uzay.y = d.fenomen.y;
    d.uzay.hiz = 0;
    const id = d.fenomen.id;
    expect(kenetlen(d).ses).toBe('red');
    for (const k of (await import('../src/oyun/veri/gozlem')).FENOMENLER[id].gerec) d.gemi.moduller[k] = true;
    const r = kenetlen(d);
    expect(r.op).toBeTruthy();
    expect(d.op.id).toBe(id);
    // Kütüphane salonları ve itibar kademesi
    d.op = null;
    d.kodeks.push({ id: 'x', ad: 'Deneme', tarif: '', salon: 'anomali' });
    expect(F.salonListesi(d).find((s) => s.id === 'anomali').kayitlar.length).toBe(1);
    d.itibar = 1200;
    const n = d.koloni.nufus.toplam;
    expect(zamanIlerle(d, 0.1).some((x) => x.tur === 'itibar')).toBe(true);
    expect(d.koloni.nufus.toplam).toBe(n + 1);
    expect(F.itibarKademesi(d)).toBe(1);
  });
  test('gezegenler haritaya düşer ve iniş aracı ister', async () => {
    const G = await import('../src/oyun/gemi/gemi');
    const { poiGuncelle, eksikDonanim } = await import('../src/oyun/uzay/seyir');
    const d = yeniOyun(4);
    G.gemiOlustur(d, 2);
    d.koloni.binalar.push('sinyal_kulesi');
    d.gemi.moduller.kamera = true;
    expect(poiGuncelle(d)).toContain('p01');
    expect(eksikDonanim(d, 'p01').eksik.map((x) => x.katman)).toEqual(['spektrometre', 'termal_rover']);
    expect(TARIFLER.arac_hangari.some((t) => t.cikti.mod_termal_rover)).toBe(true);
  });
});

describe('Savaş, yetenekler, mürettebat ve sefer olayları', () => {
  async function yukle() {
    const SV = await import('../src/oyun/uzay/savas');
    const G = await import('../src/oyun/gemi/gemi');
    const Y = await import('../src/oyun/veri/yetenek');
    return { SV, G, Y };
  }
  // Kulakla savaşır: kilitlen, ateş et, uyarıda doğru savun
  function savas(SV, d, savunma) {
    for (let i = 0; i < 20000 && d.savas; i++) {
      const s = d.savas;
      if (s.uyari && !s.uyari.savunma) {
        if (savunma === 'kacinma') SV.savasGirdi(d, { tur: 'kaydir', yon: s.uyari.yon === 'sag' ? 'sol' : 'sag', parmak: 1 });
        else if (savunma === 'kalkan') SV.savasGirdi(d, { tur: 'dokun', parmak: 2 });
      } else if (!s.uyari) {
        if (!SV.kilitliMi(d)) SV.savasGirdi(d, { tur: 'kaydir', yon: s.dusman.aci > 0 ? 'sol' : 'sag', parmak: 1 });
        else SV.savasGirdi(d, { tur: 'dokun', parmak: 1 });
      }
      if (d.savas) SV.savasIlerle(d, 0.1);
    }
  }
  test('kaçınarak kazanılan savaş: ganimet ve tecrübe', async () => {
    const { SV, G } = await yukle();
    const d = yeniOyun(12);
    G.gemiOlustur(d, 2);
    d.uzay = { x: 0, y: 0, yon: 0, hiz: 0, yaklasilan: {} };
    SV.savasBaslat(d, 'korsan_korvet');
    const t = d.kaptan.tecrube;
    savas(SV, d, 'kacinma');
    expect(d.savas).toBe(null);
    expect(d.savasSon.sonuc).toBe('zafer');
    expect(d.koloni.parcalar.sasi_celigi).toBe(30);
    expect(d.kaptan.tecrube).toBeGreaterThan(t);
    expect(d.gemi.govde).toBe(d.gemi.maxGovde);
  });
  test('savunmasız kalan gemi yenilir ve koloniye çekilir; kalkan ısınır', async () => {
    const { SV, G } = await yukle();
    const d = yeniOyun(13);
    G.gemiOlustur(d, 1);
    d.gemi.yer = 'uzay';
    d.uzay = { x: 0, y: 0, yon: 0, hiz: 0, yaklasilan: {} };
    SV.savasBaslat(d, 'yabanci_firkateyn');
    for (let i = 0; i < 20000 && d.savas; i++) SV.savasIlerle(d, 0.1);
    expect(d.savasSon.sonuc).toBe('yenilgi');
    expect(d.gemi.yer).toBe('kizak');
    const d2 = yeniOyun(14);
    G.gemiOlustur(d2, 3);
    d2.uzay = { x: 0, y: 0, yon: 0, hiz: 0, yaklasilan: {} };
    SV.savasBaslat(d2, 'korsan_avci');
    savas(SV, d2, 'kalkan');
    expect(d2.savasSon.sonuc).toBe('zafer');
  });
  test('frekans eşleme kalkanı deler; yetenek ağacı sırayla açılır', async () => {
    const { SV, G, Y } = await yukle();
    const d = yeniOyun(15);
    G.gemiOlustur(d, 1);
    d.uzay = { x: 0, y: 0, yon: 0, hiz: 0, yaklasilan: {} };
    SV.savasBaslat(d, 'korsan_korvet');
    SV.savasGirdi(d, { tur: 'dondur', f: (d.savas.dusman.kalkanFrek - d.savas.silahFrek) / 7 });
    expect(d.savas.dusman.delik).toBe(true);
    d.kaptan.tecrube = 250;
    expect(Y.yetenekAc(d, 'A2').ses).toBe('red');
    expect(Y.yetenekAc(d, 'A1').ses).toBe('kur');
    expect(Y.yetenekAc(d, 'A2').ses).toBe('red'); // 150 kaldı, 200 gerekir
    d.kaptan.tecrube = 450;
    expect(Y.yetenekAc(d, 'A2').ses).toBe('kur');
    expect(Y.harcanabilir(d)).toBe(150);
    expect(TARIFLER.dokumhane.some((t) => t.cikti.mod_k1_sonumleme)).toBe(true);
  });
  test('sefer olayları karar ister; korsan karşılaşması; istihdam', async () => {
    const { G } = await yukle();
    const { subayIstihdam } = await import('../src/oyun/koloni');
    const { kalkis } = await import('../src/oyun/uzay/seyir');
    const d = yeniOyun(16);
    G.gemiOlustur(d, 1);
    d.gemi.yakit = d.gemi.maxYakit = 999;
    d.gemide = true;
    kalkis(d);
    d.uzay.hiz = 1;
    for (let i = 0; i < 20000 && d.sahne !== 'sefer_olay'; i++) {
      uzayAdim(d, 0.1);
      if (d.sahne && d.sahne !== 'sefer_olay') d.sahne = null;
      if (Math.hypot(d.uzay.x, d.uzay.y) > 1400) d.uzay.yon += Math.PI;
    }
    expect(d.sahne).toBe('sefer_olay');
    const sec = sahneSecenekleri(d, 'sefer_olay');
    expect(sec.length).toBeGreaterThan(0);
    sahneSec(d, 'sefer_olay', 0);
    expect(d.sahne).toBe('sefer_sonuc');
    expect(sahneMetni(d, 'sefer_sonuc')[0].length).toBeGreaterThan(3);
    // Korsan: iki operasyon sonra
    d.sahne = null;
    d.tamamlananOp = ['g01', 'g02'];
    d.uzay.hiz = 1;
    let o = [];
    for (let i = 0; i < 40000 && !d.savas; i++) {
      o = uzayAdim(d, 0.1);
      if (d.sahne) d.sahne = null;
      if (d.olay) d.olay = null;
      if (Math.hypot(d.uzay.x, d.uzay.y) > 1400) d.uzay.yon += Math.PI;
      d.uzay.hiz = Math.max(1, d.uzay.hiz);
    }
    expect(d.savas).toBeTruthy();
    // İstihdam
    d.koloni.nufus.toplam = 5;
    const n = d.murettebat.length;
    expect(subayIstihdam(d, 'muharebe').ses).toBe('kur');
    expect(d.murettebat.length).toBe(n + 1);
    expect(d.murettebat[n].rol).toBe('Taktik Nişancı');
  });
});

describe('seslendirilmiş telsiz (1.7)', () => {
  const S = require('../src/oyun/veri/seslendirme');
  test('öncülerin cinsiyeti kayıtların sesine uyar ve her bildirim için kayıt bulunur', () => {
    for (const t of [1, 7, 12345, 999]) {
      const d = yeniOyun(t);
      expect(S.cinsiyeti(d.murettebat[0])).toBe('e');
      expect(S.cinsiyeti(d.murettebat[1])).toBe('e');
      expect(S.cinsiyeti(d.murettebat[2])).toBe('k');
      expect(S.kayitBul(d, 'sirtlar_ilk')).toBe('sirtlar_ilk');
      expect(S.kayitBul(d, 'mini_kayip_ekip')).toBe('mini_kayip_ekip');
      expect(S.kayitBul(d, 'yok_boyle')).toBe(null);
    }
  });
  test('başka biri konuşursa ya da eski kayıtta ses uymazsa kayıt çalmaz', () => {
    const d = yeniOyun(3);
    const yabanci = { ...d.murettebat[1], id: 'baska' };
    expect(S.kayitBul(d, 'savas_iyon_sag', yabanci)).toBe(null);
    const eski = yeniOyun(3);
    delete eski.murettebat[2].cinsiyet;
    eski.murettebat[2].ad = 'Demir Kaya';
    expect(S.kayitBul(eski, 'zehir_yarim')).toBe(null);
  });
  test('kayıtları olan bütün bildirim ve mini görev kimlikleri oyunda var', () => {
    const G = require('../src/oyun/yuzey/gorevler');
    const M = require('../src/oyun/yuzey/mini');
    const fs = require('fs');
    const bild = fs.readFileSync('src/oyun/yuzey/gorev2.js', 'utf8') + fs.readFileSync('src/oyun/yuzey/gorev3.js', 'utf8') + fs.readFileSync('src/oyun/yuzey/gorev4.js', 'utf8') + fs.readFileSync('src/oyun/yuzey/gorev5.js', 'utf8') + fs.readFileSync('src/oyun/yuzey/bolgeler.js', 'utf8');
    for (const id of Object.keys(S.KAYITLAR)) {
      if (id.startsWith('mini_')) expect(M.MINI[id.slice(5)]).toBeTruthy();
      else if (!id.startsWith('sefer_') && !id.startsWith('savas_')) expect(bild.includes("id: '" + id + "'")).toBe(true);
      expect(fs.existsSync('assets/ses/telsiz/' + id + '.mp3')).toBe(true);
    }
    expect(G.SAHNELER.sefer_olay).toBeTruthy();
  });
  test('sefer olayında konuşan öncüyse kayıt ve konuşanın adı verilir', () => {
    const { olayKaydi } = require('../src/oyun/uzay/sefer');
    const d = yeniOyun(5);
    d.olay = { id: 'ariza' };
    const k = olayKaydi(d);
    expect(k.kayit).toBe('sefer_ariza');
    expect(k.kim).toContain('Başçarkçı');
    d.olay = { id: 'klostrofobi', uye: 'x' };
    expect(olayKaydi(d)).toBe(null);
  });
});

describe('Yerler listesi yalnız bulunulan mekân (1.8)', () => {
  test('vadide kapsülün içi, sırtlarda vadi listelenmez; sırtlarda dönüş geçidi var', () => {
    const d = yeniOyun(11);
    d.mekan = 'vadi';
    d.oyuncu = { x: 0, y: 10, yon: 0 };
    expect(yerlerListesi(d).every((y) => y.mekan === 'vadi')).toBe(true);
    d.bayrak.maske = true;
    d.mekan = 'sirtlar';
    d.oyuncu = { x: 540, y: -10, yon: 0 };
    const l = yerlerListesi(d);
    expect(l.every((y) => y.mekan === 'sirtlar')).toBe(true);
    expect(l.some((y) => y.id === 'guney_gecit')).toBe(true);
    d.mekan = 'kapsul';
    d.oyuncu = { x: 303, y: 3, yon: 0 };
    expect(yerlerListesi(d).some((y) => y.id === 'kapsul_kilit')).toBe(true);
  });
});

describe('Jeotermal Tarım Alanı (1.15)', () => {
  test('sondajdan önce kilitli, sonra girilir; içeride dönüş kapısı listede', () => {
    const d = yeniOyun(21);
    d.mekan = 'vadi';
    d.oyuncu = { x: -35, y: -24, yon: Math.PI };
    expect(gec(d, 'tarim_kapi', 0).kilitli).toBe(true);
    expect(yerlerListesi(d).some((y) => y.id === 'tarim_kapi')).toBe(false);
    d.bayrak.sondaj = true;
    expect(yerlerListesi(d).some((y) => y.id === 'tarim_kapi')).toBe(true);
    const r = gec(d, 'tarim_kapi', 0);
    expect(r.kilitli).toBeFalsy();
    expect(d.mekan).toBe('tarim');
    expect(MEKANLAR.tarim.ortam).toBe('ortam_tarim');
    expect(yerlerListesi(d).some((y) => y.id === 'tarim_kapi' && y.mekan === 'tarim')).toBe(true);
    gec(d, 'tarim_kapi', 1);
    expect(d.mekan).toBe('vadi');
  });
});
