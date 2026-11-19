import { describe, expect, test } from 'bun:test';
import { yeniDunya, ilerle, etkiles, eylemUygula, bekle, kisiler, sesliKisiler, kayittanDunya, kayitTemizle, yerlerListesi, kapidanGec } from '../src/oyun/karakoy/dunya';
import { CIKARIMLAR, konusmaBasla, konusmaVarMi, dugum, sec, panoIfadeleri, teoriKur, gorevIpucu, mevcutNesneler } from '../src/oyun/karakoy/gorev1';
import { BULUSMA, G2_CIKARIMLAR, G2_YANLISLAR, dinleSatirlari, g2Tamam } from '../src/oyun/karakoy/gorev2';
import { MEKANLAR } from '../src/oyun/karakoy/harita';
import { SAHNELER, sahneParagraflari, sahneSec, sahneSecenekleri } from '../src/oyun/karakoy/sahneler';

function konus(d, kisi, dugumId, etiketBasi) {
  const g = dugum(d, kisi, dugumId);
  const s = g.secenekler.find((x) => x.etiket.startsWith(etiketBasi));
  if (!s) throw new Error('Seçenek yok: ' + etiketBasi + ' / ' + g.secenekler.map((x) => x.etiket).join(' | '));
  return sec(d, kisi, dugumId, s.i);
}

function dogruTeori(d, a, b) {
  const id = Object.keys(CIKARIMLAR).find((k) => {
    const [k1, k2] = CIKARIMLAR[k].kume;
    return (k1.includes(a) && k2.includes(b)) || (k1.includes(b) && k2.includes(a));
  });
  return teoriKur(d, a, b, CIKARIMLAR[id].ifade);
}

function sahneSecEtiket(d, id, etiketBasi) {
  const s = sahneSecenekleri(d, id).find((x) => x.etiket.startsWith(etiketBasi));
  if (!s) throw new Error('Sahne seçeneği yok: ' + etiketBasi);
  return sahneSec(d, id, s.i);
}

// Birinci görevi bitirmiş bir dünya; ikinci görevin gecesinden başlatılır
function ikinciGorev(karar1 = 'polis', ek = {}) {
  const d = yeniDunya();
  d.sahne = null;
  d.mekan = 'dis';
  d.dakika = 23 * 60;
  d.gorevBitti = true;
  d.bayrak = { karar1, denkAcik: true, gulceOnerildi: true, gulceIzin: true, odaAnahtari: true, cesetGitti: true, ...ek };
  d.deliller.push('ip_izi', 'mum', 'motor', 'fransiz_aksan', 'belge', 'kanatli_anahtar', 'paltolu', 'mektup', 'manifest', 'ferrante_damga');
  d.sahne = 'g2_gece';
  sahneSec(d, 'g2_gece', 0);
  return d;
}

function adimla(d, girdi, saniye) {
  const olaylar = [];
  for (let i = 0; i < Math.round(saniye * 10); i++) olaylar.push(...ilerle(d, girdi, 0.1));
  return olaylar;
}

function hanDan(d) {
  const c = MEKANLAR.han.cikislar.find((x) => x.id === 'han_cik');
  kapidanGec(d, c);
}

describe('İkinci görev: İkinci Adım Sesi', () => {
  test('birinci görevin kapanışı ikinci görevin gecesine, gece sabaha bağlanır', () => {
    const d = ikinciGorev();
    expect(d.gorev).toBe(2);
    expect(d.gun).toBe(2);
    expect(d.gorevGun).toBe(2);
    expect(d.mekan).toBe('han');
    expect(d.deliller).toContain('lavanta_not');
    expect(d.sahne).toBe('g2_sabah');
    expect(sahneParagraflari(d, 'g2_sabah').join(' ')).toContain('Cihangir');
    sahneSec(d, 'g2_sabah', 0);
    expect(d.sahne).toBeNull();
    expect(SAHNELER.g2_sabah.bitisSozu).toContain('İkinci görev');
    expect(gorevIpucu(d)).toContain('Saat onda');
  });

  test('karar gece yarısından sonra verildiyse sabah aynı gündür', () => {
    const d = yeniDunya();
    d.gun = 2;
    d.dakika = 2 * 60;
    d.gorevBitti = true;
    d.bayrak.karar1 = 'sakla';
    sahneSec(d, 'g2_gece', 0);
    expect(d.gun).toBe(2);
    expect(d.dakika).toBe(7 * 60 + 25);
  });

  test('takipçi: adımları duyulur, durunca durur, dönüp bakınca görülür, yaklaşınca kaçar', () => {
    const d = ikinciGorev();
    sahneSec(d, 'g2_sabah', 0);
    bekle(d, 8 * 60 + 5 - d.dakika);
    hanDan(d);
    d.oyuncu = { ...d.oyuncu, yon: -Math.PI / 2 }; // batıya
    adimla(d, { ileri: 1 }, 15);
    // görünmez ama sesi var
    expect(kisiler(d).some((k) => k.id === 'takipci')).toBe(false);
    const t = sesliKisiler(d).find((k) => k.id === 'takipci');
    expect(t).toBeTruthy();
    const ara = Math.hypot(t.x - d.oyuncu.x, t.y - d.oyuncu.y);
    expect(ara).toBeGreaterThan(9);
    expect(ara).toBeLessThan(16);
    expect(t.yuruyor).toBe(true);
    // dur: o da durur, ipucu gelir
    const durunca = adimla(d, {}, 7);
    expect(sesliKisiler(d).find((k) => k.id === 'takipci').yuruyor).toBe(false);
    expect(durunca.some((o) => o.tur === 'anlatim' && o.metin.includes('aynı anda'))).toBe(true);
    // dön ve bak
    const tk = sesliKisiler(d).find((k) => k.id === 'takipci');
    d.oyuncu = { ...d.oyuncu, yon: Math.atan2(tk.x - d.oyuncu.x, tk.y - d.oyuncu.y) };
    const bakinca = adimla(d, {}, 2);
    expect(d.deliller).toContain('takipci');
    expect(bakinca.some((o) => o.tur === 'anlatim' && o.yeniDeliller.includes('takipci'))).toBe(true);
    expect(kisiler(d).some((k) => k.id === 'takipci')).toBe(true);
    // listede yok
    expect(yerlerListesi(d).some((y) => y.id === 'kisi_takipci')).toBe(false);
    // ona doğru yürü: kaçar
    const kacinca = adimla(d, { ileri: 1 }, 6);
    expect(kacinca.some((o) => o.tur === 'anlatim' && o.metin.includes('koşmaya'))).toBe(true);
    adimla(d, {}, 30);
    expect(d.takip.durum).toBe('kacti');
    expect(sesliKisiler(d).some((k) => k.id === 'takipci')).toBe(false);
  });

  test('takipçi içerideyken kapıdan uzakta bekler, başka kapıdan çıkınca yine arkadadır', () => {
    const d = ikinciGorev();
    sahneSec(d, 'g2_sabah', 0);
    bekle(d, 8 * 60 + 5 - d.dakika);
    hanDan(d);
    d.oyuncu = { ...d.oyuncu, yon: -Math.PI / 2 };
    adimla(d, { ileri: 1 }, 10);
    d.mekan = 'buro';
    d.oyuncu = { x: -1, y: 16, yon: 0 };
    adimla(d, {}, 20);
    const t = sesliKisiler(d).find((k) => k.id === 'takipci');
    expect(t.yuruyor).toBe(false);
    kapidanGec(d, MEKANLAR.kayikhane.cikislar[0]); // kayıkhaneden çıkmış gibi (başka kapı)
    d.oyuncu = { ...d.oyuncu, yon: Math.PI / 2 }; // doğuya
    adimla(d, { ileri: 1 }, 3);
    expect(sesliKisiler(d).some((k) => k.id === 'takipci')).toBe(false); // henüz kapının karşısında bekliyor
    adimla(d, { ileri: 1 }, 12);
    const t2 = sesliKisiler(d).find((k) => k.id === 'takipci');
    const u = Math.hypot(t2.x - d.oyuncu.x, t2.y - d.oyuncu.y);
    expect(u).toBeGreaterThan(9);
    expect(u).toBeLessThan(16);
  });

  test('takipçi akşam altıdan sonra gider; Süleyman akşam onu görmüş olur', () => {
    const d = ikinciGorev();
    sahneSec(d, 'g2_sabah', 0);
    bekle(d, 17 * 60 + 10 - d.dakika);
    expect(konusmaBasla(d, 'suleyman')).toBe('gun');
    dugum(d, 'suleyman', 'gun');
    const r = konus(d, 'suleyman', 'gun', 'Bugün bir tuhaflık');
    expect(r.metin).toContain('Kasketli');
    expect(d.deliller).toContain('takipci');
  });

  test('Doktor Cemil: saat onda rıhtımda; jeton, bıçak yarası ve kişisel an', () => {
    const d = ikinciGorev('polis');
    sahneSec(d, 'g2_sabah', 0);
    bekle(d, 10 * 60 + 30 - d.dakika);
    const c = kisiler(d).find((k) => k.id === 'cemil');
    expect(c.mekan).toBe('dis');
    expect(konusmaVarMi('cemil', d)).toBe(true);
    expect(konusmaBasla(d, 'cemil')).toBe('ilk');
    konus(d, 'cemil', 'ilk', 'Sen kimin');
    let r = konus(d, 'cemil', 'ilk', 'Ne buldun');
    expect(r.sonra).toBe('bulgu');
    dugum(d, 'cemil', 'bulgu');
    r = konus(d, 'cemil', 'bulgu', 'Yutmuş');
    expect(r.yeniDeliller).toEqual(['jeton', 'bicak_yarasi']);
    konus(d, 'cemil', 'neden', 'Bunu neden');
    r = konus(d, 'cemil', 'kisisel', 'Sekiz kişi');
    expect(d.bayrak.cemilFikri).toBe('sert');
    expect(d.cemilBag).toBe(1);
    r = konus(d, 'cemil', 'sonra', 'Şu belgeye');
    expect(d.deliller).toContain('belge_tarihi');
    expect(r.metin).toContain('kopyayı');
    expect(dugum(d, 'cemil', 'sonra').secenekler.some((s) => s.etiket.startsWith('Şu belgeye'))).toBe(false);
    expect(konusmaBasla(d, 'cemil')).toBe('sonra');
    d.mekan = 'dis';
    d.oyuncu = { x: -30, y: 5, yon: 0 };
    expect(yerlerListesi(d).some((y) => y.id === 'kisi_cemil')).toBe(true);
    // akşam kayıkhanede
    bekle(d, 18 * 60 - d.dakika);
    expect(kisiler(d).find((k) => k.id === 'cemil').mekan).toBe('kayikhane');
  });

  test('İngiliz yolunda Cemil yüzbaşıyı sorgular, Hüsnü motoru görmüştür', () => {
    const d = ikinciGorev('ingiliz');
    sahneSec(d, 'g2_sabah', 0);
    d.bayrak.cemilTanisti = true;
    expect(dugum(d, 'cemil', 'sonra').secenekler.some((s) => s.etiket.startsWith('Şu belgeye'))).toBe(false);
    const r = konus(d, 'cemil', 'sonra', 'Belgeyi İngiliz');
    expect(r.metin).toContain('tanımıştır');
    expect(konusmaBasla(d, 'husnu')).toBe('g2');
    dugum(d, 'husnu', 'g2');
    expect(d.deliller).toContain('yuzbasi_motor');
    expect(teoriKur(d, 'yuzbasi_motor', 'kanatli_anahtar', G2_CIKARIMLAR.ihanet.ifade).yeniTeori).toBe(true);
    expect(d.teoriler[0].dogru).toBe(true);
  });

  test('Hüsnü kasketliyi tanır; Ohannes taş ve mektup seçimi; Gülce Nazım Bey\'in emrini anlatır', () => {
    const d = ikinciGorev('sakla');
    sahneSec(d, 'g2_sabah', 0);
    d.deliller.push('takipci');
    expect(dugum(d, 'husnu', 'g2').metin).toContain('Köpekler');
    konus(d, 'husnu', 'g2', 'Kasketli');
    expect(d.deliller).toContain('halimin_adami');
    konus(d, 'ohannes', 'g2', 'Mezarına');
    expect(d.bayrak.sabriTasi).toBe(true);
    expect(d.para).toBe(20);
    konus(d, 'ohannes', 'g2', 'Sabri\'nin mektubunu');
    expect(d.bayrak.haticeKarar).toBe('yolla');
    expect(dugum(d, 'ohannes', 'g2').secenekler.some((s) => s.etiket.startsWith('Mektubu'))).toBe(false);
    expect(konusmaBasla(d, 'gulce')).toBe('g2');
    konus(d, 'gulce', 'g2', 'Kiminle');
    expect(d.deliller).toContain('nazim_emri');
    konus(d, 'gulce', 'g2', 'Nazım Bey\'i');
    expect(d.bayrak.gulceNazim).toBe(true);
    expect(teoriKur(d, 'halimin_adami', 'nazim_emri', G2_CIKARIMLAR.halim_bagli.ifade).yeniTeori).toBe(true);
  });

  test('Gülce\'yle birinci görevde tanışılmadıysa birinci görevin konuşması sürer', () => {
    const d = ikinciGorev('sakla', { gulceIzin: false });
    sahneSec(d, 'g2_sabah', 0);
    expect(konusmaBasla(d, 'gulce')).toBe('ilk');
    konus(d, 'gulce', 'ilk', 'Beni Süleyman');
    // sabri düğümü izin verir; konuşma ortasında kaynak değişse de düğüm bulunur
    const r = konus(d, 'gulce', 'sabri', 'Teşekkür');
    expect(r.sonra).toBe('guvenli');
    expect(dugum(d, 'gulce', 'guvenli').metin).toContain('imza');
  });

  test('geçitteki buluşma: yakında ve kıpırdamadan dinleyen her şeyi duyar', () => {
    const d = ikinciGorev();
    sahneSec(d, 'g2_sabah', 0);
    bekle(d, 18 * 60 + 40 - d.dakika);
    d.mekan = 'dis';
    d.oyuncu = { x: 48, y: 19, yon: 0 };
    d.yakin = {};
    const olaylar = adimla(d, {}, 300); // 50 oyun dakikası
    const dinlenen = olaylar.filter((o) => o.tur === 'anlatim' && o.dinle);
    expect(dinlenen.length).toBe(6);
    expect(dinlenen[2].metin).toContain('Delorme');
    expect(d.deliller).toContain('halim_bulusma');
    expect(d.deliller).toContain('kulak_misafiri');
    expect(d.bayrak.delormeAdi).toBe(true);
    expect(d.bayrak.bulusmaBozuldu).toBeUndefined();
    expect(dinleSatirlari(d)[1]).not.toContain('Beni fark etti');
  });

  test('buluşmada uzakta duran yalnızca fısıltı duyar; hızlı yaklaşan görülür', () => {
    const d = ikinciGorev();
    sahneSec(d, 'g2_sabah', 0);
    bekle(d, 19 * 60 + 3 - d.dakika);
    d.mekan = 'dis';
    d.oyuncu = { x: 48, y: 13, yon: 0 };
    d.yakin = {};
    let olaylar = adimla(d, {}, 20);
    expect(olaylar.some((o) => o.tur === 'anlatim' && o.metin.includes('fısıltılar'))).toBe(true);
    expect(d.deliller).not.toContain('halim_bulusma');
    // koşarak yaklaş
    olaylar = adimla(d, { ileri: 1 }, 6);
    expect(d.bayrak.bulusmaBozuldu).toBe(true);
    expect(d.bayrak.halimGordu2).toBe(true);
    expect(d.deliller).toContain('halim_bulusma');
    expect(d.deliller).not.toContain('kulak_misafiri');
    expect(kisiler(d).some((k) => k.id === 'halim' || k.id === 'kasketli')).toBe(false);
  });

  test('buluşma yerinde bekleme de dinlemedir', () => {
    const d = ikinciGorev();
    sahneSec(d, 'g2_sabah', 0);
    bekle(d, 18 * 60 + 50 - d.dakika);
    d.mekan = 'dis';
    d.oyuncu = { x: BULUSMA.x, y: BULUSMA.y - 5, yon: 0 };
    const olaylar = bekle(d, 60);
    expect(olaylar.filter((o) => o.tur === 'anlatim').length).toBeGreaterThanOrEqual(6);
    expect(d.deliller).toContain('kulak_misafiri');
  });

  test('gaz tenekeleri akşam görünür ve denize dökülebilir; geçit Yerler\'e girer', () => {
    const d = ikinciGorev();
    sahneSec(d, 'g2_sabah', 0);
    d.mekan = 'dis';
    expect(mevcutNesneler(d).some((n) => n.id === 'gaz')).toBe(false);
    konus(d, 'suleyman', 'gun', 'Komiser Halim');
    expect(yerlerListesi(d).some((y) => y.id === 'gecit')).toBe(true);
    bekle(d, 19 * 60 + 45 - d.dakika);
    d.oyuncu = { x: -54.5, y: 6, yon: Math.PI / 2 };
    const e = etkiles(d);
    expect(e.tur).toBe('nesne');
    expect(e.id).toBe('gaz');
    eylemUygula(d, 'gaz', 'bak');
    expect(d.deliller).toContain('gaz');
    eylemUygula(d, 'gaz', 'denize');
    expect(d.bayrak.gazAtildi).toBe(true);
  });

  test('pano: ikinci görevin yanlış teorileri kendi havuzundan; üç bağ kararı açar', () => {
    const d = ikinciGorev();
    sahneSec(d, 'g2_sabah', 0);
    d.deliller.push('jeton', 'bicak_yarasi', 'takipci');
    const ifadeler = panoIfadeleri(d, 'jeton', 'kanatli_anahtar');
    expect(ifadeler).toContain(G2_CIKARIMLAR.toplanti.ifade);
    const g2Yanlis = G2_YANLISLAR.map((y) => y.ifade);
    expect(ifadeler.filter((x) => x !== G2_CIKARIMLAR.toplanti.ifade).every((x) => g2Yanlis.includes(x))).toBe(true);
    teoriKur(d, 'jeton', 'takipci', 'Kasketli adam İngilizlerin adamı.');
    dogruTeori(d, 'jeton', 'kanatli_anahtar');
    dogruTeori(d, 'bicak_yarasi', 'paltolu');
    expect(g2Tamam(d)).toBe(false);
    dogruTeori(d, 'lavanta_not', 'takipci');
    expect(g2Tamam(d)).toBe(true);
    expect(gorevIpucu(d)).toContain('üç bağ');
    expect(konusmaBasla(d, 'suleyman')).toBe('karar');
    const g = dugum(d, 'suleyman', 'karar');
    expect(g.metin).toContain('üniforma');
    expect(d.teoriler.every((t) => t.dogru)).toBe(true);
    konus(d, 'suleyman', 'karar', 'Kayıkhaneye');
    expect(d.sahne).toBe('g2_karar_oncesi');
  });

  function karara(karar1, ek = {}) {
    const d = ikinciGorev(karar1, ek);
    sahneSec(d, 'g2_sabah', 0);
    d.sahne = 'g2_karar_oncesi';
    sahneSec(d, 'g2_karar_oncesi', 0);
    return d;
  }

  test('pusu: Rıza Bey gelir, Topal Hasan Delorme\'un adını verir', () => {
    const d = karara('polis');
    d.bayrak.cemilFikri = 'teselli';
    sahneSecEtiket(d, 'g2_karar', 'Kayıkhanede pusu');
    expect(d.bayrak.pusuYardim).toBe('riza');
    expect(d.bayrak.pusuSonuc).toBe('yakalandi');
    expect(d.bayrak.delormeAdi).toBe(true);
    expect(d.bayrak.rizaTanisti).toBe(true);
    expect(sahneParagraflari(d, 'g2_son_pusu').join(' ')).toContain('Delille');
    sahneSec(d, 'g2_son_pusu', 0);
    expect(sahneParagraflari(d, 'g2_kapanis').join(' ')).toContain('Delorme, diyorsun');
    sahneSecEtiket(d, 'g2_kapanis', 'Gel doktor');
    expect(d.bayrak.cemilEkipte).toBe(true);
    sahneSec(d, 'g2_son', 0);
    expect(d.sahne).toBeNull();
    expect(d.bayrak.g2Bitti).toBe(true);
    expect(d.gun).toBe(3);
    expect(gorevIpucu(d)).toContain('İkinci görev bitti');
    expect(konusmaBasla(d, 'suleyman')).toBe('bitti');
  });

  test('pusu yalnız ve tenekeler yerindeyse adam kaçar, kol yanar', () => {
    const d = karara('sakla');
    d.itibar = 0;
    const travma = d.travma;
    sahneSecEtiket(d, 'g2_karar', 'Kayıkhanede pusu');
    expect(d.bayrak.pusuSonuc).toBe('kacti');
    expect(d.bayrak.yaraKol).toBe(true);
    expect(d.travma).toBe(travma + 1);
    expect(d.bayrak.kayikhaneYandi).toBe('kismen');
    expect(d.bayrak.delormeAdi).toBeUndefined();
  });

  test('pusu yalnız ama tenekeler denizdeyse adam yakalanır', () => {
    const d = karara('sakla', { gazAtildi: true });
    sahneSecEtiket(d, 'g2_karar', 'Kayıkhanede pusu');
    expect(d.bayrak.pusuSonuc).toBe('yakalandi');
  });

  test('haber verip beklemek: kayıkhane yanar, Süleyman yaralanır ve ertesi gün handadır', () => {
    const d = karara('ingiliz');
    sahneSecEtiket(d, 'g2_karar', 'İngiliz devriyesine');
    expect(d.bayrak.suleymanYarali).toBe(true);
    expect(d.bayrak.kayikhaneYandi).toBe('tam');
    expect(sahneParagraflari(d, 'g2_son_haber').join(' ')).toContain('kaydı bile yok');
    sahneSec(d, 'g2_son_haber', 0);
    sahneSecEtiket(d, 'g2_kapanis', 'Bu iş');
    expect(sahneParagraflari(d, 'g2_son').join(' ')).toContain('sargılı');
    sahneSec(d, 'g2_son', 0);
    bekle(d, 10 * 60 - d.dakika);
    const s = kisiler(d).find((k) => k.id === 'suleyman');
    expect(s.mekan).toBe('han');
    expect(s.eylem).toContain('sargılı');
    // yanık kayıkhanede denk ve karanlık oda yok, kül var
    d.mekan = 'kayikhane';
    const n = mevcutNesneler(d).map((x) => x.id);
    expect(n).toContain('kul');
    expect(n).not.toContain('denk');
    expect(n).not.toContain('karanlik_oda');
  });

  test('taşımak: kayıkhane yanar ama kimse yaralanmaz', () => {
    const d = karara('polis', { gazAtildi: true });
    sahneSecEtiket(d, 'g2_karar', 'Kaptanı ve');
    expect(d.bayrak.kayikhaneYandi).toBe('kismen');
    expect(d.bayrak.suleymanYarali).toBeUndefined();
    expect(sahneParagraflari(d, 'g2_son_tasi').join(' ')).toContain('bir duvarı');
  });

  test('birinci görevin ikinci günü (görev 1 sürerken) Cemil ve buluşma yoktur', () => {
    const d = yeniDunya();
    d.sahne = null;
    d.gun = 2;
    d.dakika = 11 * 60;
    expect(kisiler(d).some((k) => k.id === 'cemil')).toBe(false);
    d.dakika = 19 * 60 + 10;
    expect(kisiler(d).some((k) => k.id === 'kasketli')).toBe(false);
    expect(kisiler(d).find((k) => k.id === 'halim')).toBeFalsy();
  });

  test('kayıt: ikinci görev saklanır; birinci görevi bitmiş eski kayıt ikinci göreve geçer', () => {
    const d = ikinciGorev();
    sahneSec(d, 'g2_sabah', 0);
    const k = kayittanDunya(JSON.parse(JSON.stringify(kayitTemizle(d))));
    expect(k.gorev).toBe(2);
    expect(k.takip.durum).toBe('bekliyor');
    const eski = yeniDunya();
    eski.sahne = null;
    eski.gorevBitti = true;
    delete eski.gorev;
    const e = kayittanDunya(JSON.parse(JSON.stringify(kayitTemizle(eski))));
    expect(e.sahne).toBe('g2_gece');
  });
});
