import { describe, expect, test } from 'bun:test';
import { yeniDunya, ilerle, etkiles, eylemUygula, bekle, kisiler, bekci, cevreMetni } from '../src/oyun/karakoy/dunya';
import {
  DELILLER,
  CIKARIMLAR,
  NESNELER,
  KONUSMALAR,
  konusmaBasla,
  dugum,
  sec,
  panoIfadeleri,
  teoriKur,
  gerekliCikarimlarTamam,
  nesneEylemleri,
  envanterMetni,
} from '../src/oyun/karakoy/gorev1';
import { MEKANLAR } from '../src/oyun/karakoy/harita';
import { sahneSec, sahneParagraflari } from '../src/oyun/karakoy/sahneler';
import { engel } from '../src/oyun/karakoy/dunya';

// Konuşmada etiketi verilen seçeneği seçer; cevabı ve sonraki düğümü döndürür
function konus(d, kisi, dugumId, etiketBasi) {
  const g = dugum(d, kisi, dugumId);
  const s = g.secenekler.find((x) => x.etiket.startsWith(etiketBasi));
  if (!s) throw new Error('Seçenek yok: ' + etiketBasi + ' / ' + g.secenekler.map((x) => x.etiket).join(' | '));
  return sec(d, kisi, dugumId, s.i);
}

function yerles(d, mekan, x, y) {
  d.mekan = mekan;
  d.oyuncu = { x, y, yon: 0 };
}

function dogruTeori(d, a, b) {
  const id = Object.keys(CIKARIMLAR).find((k) => {
    const [k1, k2] = CIKARIMLAR[k].kume;
    return (k1.includes(a) && k2.includes(b)) || (k1.includes(b) && k2.includes(a));
  });
  return teoriKur(d, a, b, CIKARIMLAR[id].ifade);
}

describe('veri', () => {
  test('bütün nesneler kendi mekânında geçilebilir bir yerde', () => {
    for (const n of NESNELER) expect(engel(n.mekan, n)).toBeNull();
  });
  test('çıkarımların delilleri tanımlı', () => {
    for (const c of Object.values(CIKARIMLAR)) for (const k of c.kume) for (const id of k) expect(DELILLER[id]).toBeDefined();
  });
  test('her konuşma düğümünün sonraki düğümü var', () => {
    for (const [kisi, k] of Object.entries(KONUSMALAR))
      for (const g of Object.values(k.dugumler))
        for (const s of g.secenekler) if (typeof s.sonra === 'string') expect(k.dugumler[s.sonra]).toBeDefined();
  });
});

describe('Sudaki Adam baştan sona', () => {
  test('ceset incelenir, Süleyman denki ve Kodak\'ı verir', () => {
    const d = yeniDunya();
    yerles(d, 'dis', 28, 3);
    const e = etkiles(d);
    expect(e.tur).toBe('nesne');
    expect(e.id).toBe('ceset');
    for (const x of ['bilek', 'yuz', 'el']) eylemUygula(d, 'ceset', x);
    expect(d.deliller).toEqual(['ip_izi', 'kopuk_yok', 'mum']);
    expect(konusmaBasla(d, 'suleyman')).toBe('rapor');
    konus(d, 'suleyman', 'rapor', 'Sabri boğulmadı');
    expect(d.envanter.kamera).toBe(true);
    expect(d.film).toBe(6);
    expect(d.bayrak.denkAcik).toBe(true);
  });

  test('karanlıkta fotoğraf çekilmez; gün ağarınca çekilir, banyoda mühür izi çıkar', () => {
    const d = yeniDunya();
    d.envanter.kamera = true;
    d.film = 6;
    yerles(d, 'dis', 28, 3);
    const k = eylemUygula(d, 'ceset', 'foto');
    expect(k.metin).toContain('karanlık');
    expect(d.film).toBe(6);
    bekle(d, 40); // 07.20, gün doğdu
    expect(d.gece).toBe(false);
    eylemUygula(d, 'ceset', 'foto');
    expect(d.film).toBe(5);
    yerles(d, 'kayikhane', -50, 3);
    const b = eylemUygula(d, 'karanlik_oda', 'banyo');
    expect(b.yeniDeliller).toContain('mum_izi');
    expect(d.fotograflar).toContain('ceset_el');
  });

  test('ceset dokuzda kaldırılır; Halim yanındayken incelenemez', () => {
    const d = yeniDunya();
    bekle(d, 8 * 60 + 30 - d.dakika);
    yerles(d, 'dis', 29.5, 3);
    const r = eylemUygula(d, 'ceset', 'bilek');
    expect(r.metin).toContain('Halim');
    expect(d.deliller.length).toBe(0);
    bekle(d, 40);
    expect(d.bayrak.cesetGitti).toBe(true);
    expect(NESNELER.find((n) => n.id === 'ceset').mevcut(d)).toBe(false);
    // Süleyman bilekleri gördüğünü söyler
    konus(d, 'suleyman', 'rapor', 'Sabri boğulmadı');
    expect(d.deliller).toContain('ip_izi');
  });

  test('Hüsnü: tehdit itibarı düşürür, para ile anlatır', () => {
    const d = yeniDunya();
    konus(d, 'husnu', 'ilk', 'Yakasından');
    expect(d.itibar).toBe(-1);
    const d2 = yeniDunya();
    const r = konus(d2, 'husnu', 'ilk', 'Beş kuruşu');
    expect(r.sonra).toBe('anlatir');
    expect(d2.para).toBe(30);
    konus(d2, 'husnu', 'anlatir', 'Teşekkür');
    expect(d2.deliller).toEqual(['motor', 'fransiz_aksan']);
  });

  test('Gülce: yalan izin vermez; Süleyman\'ın adıyla defterler açılır', () => {
    const d = yeniDunya();
    konus(d, 'gulce', 'ilk', 'Leventis\'in sahibi');
    expect(konusmaBasla(d, 'gulce')).toBe('tekrar');
    yerles(d, 'buro', 4, 23);
    expect(eylemUygula(d, 'yuk_defteri', 'oku').metin).toContain('izni');
    d.bayrak.gulceOnerildi = true;
    const r = konus(d, 'gulce', 'tekrar', 'Doğrusunu');
    expect(r.sonra).toBe('sabri');
    dugum(d, 'gulce', 'sabri');
    eylemUygula(d, 'yuk_defteri', 'oku');
    yerles(d, 'buro', -7, 23);
    eylemUygula(d, 'vinc_defteri', 'oku');
    expect(d.deliller).toEqual(['manifest', 'agirlik']);
  });

  test('antrepo: kapı gündüz kilitli, gece açık; bekçinin yanında koşmak yakalatır', () => {
    const d = yeniDunya();
    bekle(d, 10 * 60 - d.dakika);
    yerles(d, 'dis', 25.2, 22);
    expect(etkiles(d).tur).toBe('kilitli');
    bekle(d, 22 * 60 - d.dakika);
    yerles(d, 'dis', 25.2, 22);
    expect(etkiles(d).tur).toBe('gecti');
    expect(d.mekan).toBe('antrepo');
    expect(bekci(d)).not.toBeNull();
    // bekçinin dibine koş
    const b = bekci(d);
    d.oyuncu = { x: b.x + 1, y: b.y, yon: 0 };
    const olaylar = ilerle(d, { ileri: 1 }, 0.5);
    expect(olaylar.some((o) => o.tur === 'yakalandi')).toBe(true);
    expect(d.mekan).toBe('dis');
    expect(d.itibar).toBe(-1);
    yerles(d, 'dis', 25.2, 22);
    expect(etkiles(d).tur).toBe('kilitli');
  });

  test('antrepo: sessizce sandığa ulaşılır, tüfekler bulunur', () => {
    const d = yeniDunya();
    bekle(d, 22 * 60 - d.dakika);
    yerles(d, 'antrepo', 18, 21);
    for (let i = 0; i < 50; i++) ilerle(d, {}, 0.1);
    expect(d.mekan).toBe('antrepo');
    const r = eylemUygula(d, 'sandiklar', 'ac');
    expect(d.deliller).toContain('tufek');
    expect(r.metin).toContain('Mauser');
  });

  test('Ohannes anahtarı verir; odada mektup ve fotoğraf', () => {
    const d = yeniDunya();
    konus(d, 'ohannes', 'ilk', 'Sabri\'nin odasını');
    expect(d.bayrak.odaAnahtari).toBe(true);
    expect(d.deliller).toContain('paltolu');
    yerles(d, 'oda', 41, 27.5);
    eylemUygula(d, 'doseme', 'ara');
    yerles(d, 'oda', 45, 25);
    eylemUygula(d, 'pervaz', 'kaldir');
    expect(d.deliller).toEqual(['paltolu', 'mektup', 'fotograf']);
    expect(d.sahne).toBe('fotograf');
  });

  test('kötü itibarla Ohannes ancak parayla verir', () => {
    const d = yeniDunya();
    d.itibar = -1;
    konus(d, 'ohannes', 'ilk', 'Sabri\'nin odasını');
    expect(d.bayrak.odaAnahtari).toBeUndefined();
    konus(d, 'ohannes', 'ilk', 'On kuruşu');
    expect(d.bayrak.odaAnahtari).toBe(true);
    expect(d.para).toBe(25);
  });

  test('hamallara yardım para ve itibar kazandırır, günde bir kez', () => {
    const d = yeniDunya();
    konus(d, 'hamallar', 'ilk', 'Yüke yardım');
    expect(d.para).toBe(43);
    expect(d.itibar).toBe(1);
    expect(d.bekleme).toBe(60);
    expect(dugum(d, 'hamallar', 'ilk').secenekler.some((s) => s.etiket.startsWith('Yüke'))).toBe(false);
  });

  test('pano: doğru ifade her zaman seçeneklerde; yanlış teori kaydedilir, Süleyman düzeltir; karar görevi bitirir', () => {
    const d = yeniDunya();
    d.deliller.push('ip_izi', 'mum', 'mektup', 'manifest', 'kanatli_anahtar', 'ferrante_damga');
    const ifadeler = panoIfadeleri(d, 'ip_izi', 'mum');
    expect(ifadeler).toContain(CIKARIMLAR.olduruldu.ifade);
    expect(ifadeler.length).toBe(3);
    teoriKur(d, 'ip_izi', 'mum', 'Sabri sarhoştu; gece düşüp boğuldu.');
    expect(d.teoriler[0].dogru).toBe(false);
    dogruTeori(d, 'ip_izi', 'mum');
    dogruTeori(d, 'mektup', 'manifest');
    expect(gerekliCikarimlarTamam(d)).toBe(false);
    dogruTeori(d, 'kanatli_anahtar', 'ferrante_damga');
    expect(gerekliCikarimlarTamam(d)).toBe(true);
    d.bayrak.denkAcik = true;
    expect(konusmaBasla(d, 'suleyman')).toBe('karar');
    const g = dugum(d, 'suleyman', 'karar');
    expect(g.metin).toContain('içki koymazdı');
    expect(d.teoriler.every((t) => t.dogru)).toBe(true);
    konus(d, 'suleyman', 'karar', 'Bildiklerimi');
    expect(d.sahne).toBe('karar_oncesi');
    expect(d.mekan).toBe('kayikhane');
    sahneSec(d, 'karar_oncesi', 0);
    sahneSec(d, 'gece_konusma', 1);
    expect(d.bayrak.arifNeden).toBe('korktum');
    sahneSec(d, 'gece_suleyman', 0);
    sahneSec(d, 'karar', 1);
    expect(d.bayrak.karar1).toBe('polis');
    expect(sahneParagraflari(d, 'kapanis').join(' ')).toContain('Yaşlı adamlar');
    sahneSec(d, d.sahne, 0);
    sahneSec(d, 'kapanis', 0);
    expect(d.gorevBitti).toBe(true);
    expect(d.sahne).toBeNull();
  });

  test('ilgisiz iki delil için "bağ yok" seçeneği sunulur', () => {
    const d = yeniDunya();
    const ifadeler = panoIfadeleri(d, 'fotograf', 'agirlik');
    expect(ifadeler).toContain('Bu ikisi arasında bir bağ yok.');
  });

  test('fotoğraf eylemi Kodak olmadan görünmez', () => {
    const d = yeniDunya();
    expect(nesneEylemleri(d, 'ceset').some((e) => e.id === 'foto')).toBe(false);
    d.envanter.kamera = true;
    d.film = 6;
    expect(nesneEylemleri(d, 'ceset').find((e) => e.id === 'foto').etiket).toContain('6 poz');
  });

  test('çevre tarifi nesneleri anar; envanter parayı söyler', () => {
    const d = yeniDunya();
    yerles(d, 'dis', 26, 3);
    expect(cevreMetni(d)).toContain('Sabri\'nin cesedi');
    expect(envanterMetni(d)).toContain('35 kuruş');
  });

  test('bekçi yalnızca gece antrepoda', () => {
    const d = yeniDunya();
    bekle(d, 12 * 60 - d.dakika);
    expect(kisiler(d).some((k) => k.id === 'bekci')).toBe(false);
    bekle(d, 23 * 60 - d.dakika);
    const b = kisiler(d).find((k) => k.id === 'bekci');
    expect(b.mekan).toBe('antrepo');
    expect(MEKANLAR.antrepo).toBeDefined();
  });
});
