// Birinci görev baştan sona: kapsülden çık, kesiciyi al, anteni ve hücreyi bul, jeneratörü çalıştır,
// anteni kur, frekansı ayarla, kaynak topla, Sinyal Kulesi'ni kur.
import { describe, expect, test } from 'bun:test';
import { yeniOyun, gecerliMi, kaydiTamamla } from '../src/oyun/durum';
import { NOKTALAR } from '../src/oyun/yuzey/harita';
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
  sahneSecenekleri,
  valfBaslat,
  valfBirak,
  valfIlerle,
  bildirimIlerle,
  kapiDizisi,
  rezonansBaslat,
  rezonansCal,
  rezonansSecimDegis,
  teraziBaslat,
  teraziIlerle,
  teraziMetni,
  teraziPompa,
  AYAKLAR,
} from '../src/oyun/yuzey/gorevler';
import { TESISLER } from '../src/oyun/veri/tesisler';

// Bir yere kendiliğinden yürür (en çok 120 benzetim saniyesi)
function yuru(d, id) {
  const h = yerlerListesi(d).find((y) => y.id === id) || { id, ad: NOKTALAR[id].ad, mekan: NOKTALAR[id].mekan, x: NOKTALAR[id].x, y: NOKTALAR[id].y };
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
  expect(yerlerListesi(d).some((y) => y.id === 'bati_gecit')).toBe(true);
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
}

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
