import { describe, expect, test } from 'bun:test';
import { yeniDunya, ilerle, etkiles, eylemUygula, bekle, kisiler, kapidanGec, yerlerListesi, kayittanDunya, kayitTemizle } from '../src/oyun/karakoy/dunya';
import { CIKARIMLAR, konusmaBasla, konusmaVarMi, dugum, sec, teoriKur, gorevIpucu, mevcutNesneler } from '../src/oyun/karakoy/gorev1';
import { BASKI_SINIRI, G4_CIKARIMLAR } from '../src/oyun/karakoy/gorev4';
import { MEKANLAR } from '../src/oyun/karakoy/harita';
import { sahneParagraflari, sahneSec, sahneSecenekleri } from '../src/oyun/karakoy/sahneler';

function konus(d, kisi, dugumId, etiketBasi) {
  const g = dugum(d, kisi, dugumId);
  const s = g.secenekler.find((x) => x.etiket.startsWith(etiketBasi));
  if (!s) throw new Error('Seçenek yok: ' + etiketBasi + ' / ' + g.secenekler.map((x) => x.etiket).join(' | '));
  return sec(d, kisi, dugumId, s.i);
}
function secenekVar(d, kisi, dugumId, etiketBasi) {
  return dugum(d, kisi, dugumId).secenekler.some((x) => x.etiket.startsWith(etiketBasi));
}
function sahneSecEtiket(d, id, etiketBasi) {
  const s = sahneSecenekleri(d, id).find((x) => x.etiket.startsWith(etiketBasi));
  if (!s) throw new Error('Sahne seçeneği yok: ' + etiketBasi);
  return sahneSec(d, id, s.i);
}
function saate(d, dakika) {
  const gd = ((d.dakika % 1440) + 1440) % 1440;
  if (dakika > gd) bekle(d, dakika - gd);
}

// Üçüncü görevin son sahnesinden dördüncüye
function dorduncuGorev(ek = {}, deliller = []) {
  const d = yeniDunya();
  d.sahne = null;
  d.gorev = 3;
  d.gorevGun = 4;
  d.gun = 4;
  d.dakika = 23 * 60 + 50;
  d.gorevBitti = true;
  d.bayrak = { karar1: 'polis', g2Gun: 2, g2Bitti: true, gulceIzin: true, cemilEkipte: true, nerminEkipte: true, ...ek };
  d.deliller.push('bicak_yarasi', 'lavanta_not', ...deliller);
  sahneSec(d, 'g3_son', 0);
  return d;
}

function meyhaneye(d) {
  saate(d, 20 * 60 + 10);
  d.mekan = 'dis';
  d.oyuncu = { x: 55, y: 12.5, yon: 0 };
  return kapidanGec(d, MEKANLAR.dis.cikislar.find((c) => c.id === 'meyhane_kapi'));
}

describe('Dördüncü görev: Kül', () => {
  test('üçüncü görevin sonundan pazartesi sabahına; Rıza Bey avluda, Yaşar rıhtımda, Halim cesedin başında', () => {
    const d = dorduncuGorev();
    expect(d.gorev).toBe(4);
    expect(d.gun).toBe(6);
    expect(d.sahne).toBe('g4_acilis');
    expect(sahneParagraflari(d, 'g4_acilis').join(' ')).toContain('Cihangir');
    sahneSec(d, 'g4_acilis', 0);
    expect(d.sahne).toBeNull();
    const ks = kisiler(d);
    expect(ks.find((k) => k.id === 'riza').mekan).toBe('han');
    expect(ks.find((k) => k.id === 'halim').eylem).toContain('Yaşar');
    d.mekan = 'dis';
    expect(mevcutNesneler(d).some((n) => n.id === 'yasar')).toBe(true);
    expect(gorevIpucu(d)).toContain('Rıza Bey');
    expect(yerlerListesi(d).some((y) => y.id === 'meyhane')).toBe(true);
    bekle(d, 10);
    d.mekan = 'han';
    expect(yerlerListesi(d).some((y) => y.id === 'kisi_riza')).toBe(true);
  });

  test('Yaşar\'ın yarası, Hüsnü\'nün motoru, Gülce\'nin dilekçesi; panoda isteğe bağlı bağlar', () => {
    const d = dorduncuGorev();
    sahneSec(d, 'g4_acilis', 0);
    d.mekan = 'dis';
    eylemUygula(d, 'yasar', 'sirt');
    eylemUygula(d, 'yasar', 'cep');
    expect(d.para).toBe(38);
    expect(d.deliller).toContain('yasar_yarasi');
    dugum(d, 'husnu', 'g4');
    expect(d.deliller).toContain('ikinci_motor');
    expect(konusmaBasla(d, 'husnu')).not.toBe('g4');
    dugum(d, 'gulce', 'g4');
    expect(d.deliller).toContain('halim_dilekce');
    expect(teoriKur(d, 'yasar_yarasi', 'bicak_yarasi', G4_CIKARIMLAR.ayni_el.ifade).yeniTeori).toBe(true);
    expect(teoriKur(d, 'halim_dilekce', 'ikinci_motor', G4_CIKARIMLAR.kacis.ifade).yeniTeori).toBe(true);
    expect(d.teoriler.every((t) => t.dogru)).toBe(true);
    bekle(d, 11 * 60 - ((d.dakika % 1440) + 1440) % 1440);
    expect(mevcutNesneler(d).some((n) => n.id === 'yasar')).toBe(false);
  });

  test('Rıza Bey: tanışma, kural, kişisel soru, meyhaneye gelir', () => {
    const d = dorduncuGorev();
    sahneSec(d, 'g4_acilis', 0);
    expect(konusmaVarMi('riza', d)).toBe(true);
    expect(konusmaBasla(d, 'riza')).toBe('ilk');
    expect(dugum(d, 'riza', 'ilk').metin).toContain('Cihangir');
    konus(d, 'riza', 'ilk', 'Anlatayım');
    konus(d, 'riza', 'kural', 'Sözüm var');
    expect(d.bayrak.rizaHalim4).toBe('soz');
    expect(d.rizaBag).toBe(1);
    konus(d, 'riza', 'sonra', 'Babanı');
    konus(d, 'riza', 'sonra', 'Bu akşam');
    expect(d.bayrak.rizaGelir).toBe(true);
    meyhaneye(d);
    expect(d.mekan).toBe('meyhane');
    const r = kisiler(d).find((k) => k.id === 'riza');
    expect(r.mekan).toBe('meyhane');
  });

  test('meyhane sabah kapalı; Halim akşam orada; gündüz konuşmaz', () => {
    const d = dorduncuGorev();
    sahneSec(d, 'g4_acilis', 0);
    d.mekan = 'dis';
    const kapi = MEKANLAR.dis.cikislar.find((c) => c.id === 'meyhane_kapi');
    expect(kapi.acik(d)).toBe(false);
    expect(konusmaBasla(d, 'halim')).toBe('gun');
    meyhaneye(d);
    expect(kisiler(d).find((k) => k.id === 'halim').mekan).toBe('meyhane');
    expect(konusmaBasla(d, 'halim')).toBe('sorgu');
  });

  test('sorgu: delillerle baskı birikir; eşik aşılınca itiraf, sonra karar', () => {
    const d = dorduncuGorev({ sabriTasi: true }, ['rusvet_defteri', 'kulak_misafiri']);
    sahneSec(d, 'g4_acilis', 0);
    d.mekan = 'dis';
    eylemUygula(d, 'yasar', 'sirt');
    meyhaneye(d);
    dugum(d, 'halim', 'sorgu');
    expect(secenekVar(d, 'halim', 'sorgu', 'Delorme seni de temizleyecek, Halim. Sana')).toBe(false);
    let r = konus(d, 'halim', 'sorgu', 'Delorme seni de temizleyecek, Halim. Anlat');
    expect(r.metin).toContain('hamal');
    r = konus(d, 'halim', 'sorgu', 'Sabri\'yi kimsesiz');
    expect(r.metin).toContain('Trabzonlu');
    konus(d, 'halim', 'sorgu', 'Nazım Bey\'in defterinde');
    expect(d.baski).toBe(3);
    expect(d.baski).toBeGreaterThanOrEqual(BASKI_SINIRI);
    expect(secenekVar(d, 'halim', 'sorgu', 'Sabri\'yi kimsesiz')).toBe(false);
    r = konus(d, 'halim', 'sorgu', 'Delorme seni de temizleyecek, Halim. Sana');
    expect(r.sonra).toBe('itiraf');
    const g = dugum(d, 'halim', 'itiraf');
    expect(g.metin).toContain('Kâmil Efendi');
    expect(d.deliller).toContain('halim_itirafi');
    konus(d, 'halim', 'itiraf', 'Devam');
    expect(d.sahne).toBe('g4_halim_karar');
  });

  test('tehdit: Rıza yanındaysa engeller, bağ düşer; yalnızken baskı verir ama travma ve itibar bedeli', () => {
    const a = dorduncuGorev({ rizaGelir: true });
    sahneSec(a, 'g4_acilis', 0);
    meyhaneye(a);
    const r = konus(a, 'halim', 'sorgu', 'Yakasına');
    expect(r.metin).toContain('Döverek değil');
    expect(a.rizaBag).toBe(-1);
    expect(a.baski || 0).toBe(0);
    const b = dorduncuGorev();
    sahneSec(b, 'g4_acilis', 0);
    meyhaneye(b);
    const t = b.travma;
    konus(b, 'halim', 'sorgu', 'Yakasına');
    expect(b.baski).toBe(1);
    expect(b.travma).toBe(t + 1);
    expect(b.itibar).toBe(-1);
  });

  function karara(ek = {}) {
    const d = dorduncuGorev(ek, ['halim_itirafi']);
    sahneSec(d, 'g4_acilis', 0);
    d.bayrak.halimItiraf = true;
    d.sahne = 'g4_halim_karar';
    return d;
  }

  test('saklamak: Halim yaşar, mahzende; Rıza ekibe katılır', () => {
    const d = karara();
    sahneSecEtiket(d, 'g4_halim_karar', 'Ohannes');
    expect(d.bayrak.halimSonu).toBe('sakli');
    expect(kisiler(d).some((k) => k.id === 'halim')).toBe(false);
    sahneSec(d, 'g4_son_sakla', 0);
    expect(sahneParagraflari(d, 'g4_kapanis').join(' ')).toContain('mahzende');
    sahneSecEtiket(d, 'g4_kapanis', 'Şartın');
    expect(d.bayrak.rizaEkipte).toBe(true);
    sahneSec(d, 'g4_son', 0);
    expect(d.bayrak.g4Bitti).toBe(true);
    expect(d.sahne).toBeNull();
    d.mekan = 'han';
    expect(mevcutNesneler(d).some((n) => n.id === 'mahzen')).toBe(true);
    expect(gorevIpucu(d)).toContain('Dördüncü görev bitti');
  });

  test('teslim: Halim hücrede asılı bulunur; bırakmak: antrepoda bıçaklı', () => {
    const a = karara();
    sahneSecEtiket(a, 'g4_halim_karar', 'Karakola');
    expect(a.bayrak.halimSonu).toBe('asildi');
    expect(sahneParagraflari(a, 'g4_son_teslim').join(' ')).toContain('kemerine');
    const b = karara();
    sahneSecEtiket(b, 'g4_halim_karar', 'Bırak gitsin');
    expect(b.bayrak.halimSonu).toBe('bicaklandi');
    sahneSec(b, 'g4_son_birak', 0);
    sahneSecEtiket(b, 'g4_kapanis', 'Delorme\'a delil');
    expect(sahneParagraflari(b, 'g4_son').join(' ')).toContain('seni ben yakalarım');
  });

  test('Halim konuşturulmazsa ertesi sabah ölü bulunur', () => {
    const d = dorduncuGorev();
    sahneSec(d, 'g4_acilis', 0);
    bekle(d, 24 * 60);
    expect(d.sahne).toBe('g4_sabah_olu');
    sahneSec(d, 'g4_sabah_olu', 0);
    expect(d.bayrak.halimSonu).toBe('bicaklandi');
    expect(d.sahne).toBe('g4_kapanis');
    expect(sahneParagraflari(d, 'g4_kapanis').join(' ')).toContain('bir ölü daha');
  });

  test('Gülce: itiraftan sonra babası Kâmil Efendi', () => {
    const d = dorduncuGorev({ gulceNazim: true }, ['halim_itirafi']);
    sahneSec(d, 'g4_acilis', 0);
    dugum(d, 'gulce', 'g4');
    expect(konusmaBasla(d, 'gulce')).toBe('sonra');
    konus(d, 'gulce', 'sonra', 'Kâmil Efendi');
    expect(dugum(d, 'gulce', 'kamil').metin).toContain('söyleyememiştim');
    konus(d, 'gulce', 'kamil', 'Halim söyledi');
    expect(d.bayrak.gulceKamil).toBe('soyle');
    expect(d.bayrak.gulceyeAnlatti).toBe(true);
  });

  test('kayıt: baskı ve görev saklanır', () => {
    const d = dorduncuGorev();
    d.baski = 2;
    const k = kayittanDunya(JSON.parse(JSON.stringify(kayitTemizle(d))));
    expect(k.gorev).toBe(4);
    expect(k.baski).toBe(2);
  });
});
