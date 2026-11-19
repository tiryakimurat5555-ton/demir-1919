import { describe, expect, test } from 'bun:test';
import { yeniDunya, ilerle, etkiles, eylemUygula, bekle, kisiler, kapidanGec, yerlerListesi, otoBaslat, kayittanDunya, kayitTemizle } from '../src/oyun/karakoy/dunya';
import { CIKARIMLAR, konusmaBasla, konusmaVarMi, dugum, sec, teoriKur, gorevIpucu, mevcutNesneler, nesneEylemleri } from '../src/oyun/karakoy/gorev1';
import { G3_CIKARIMLAR, g3Tamam } from '../src/oyun/karakoy/gorev3';
import { MEKANLAR } from '../src/oyun/karakoy/harita';
import { TOPLANTI_BAS, TOPLANTI_BIT } from '../src/oyun/karakoy/pera';
import { SAHNELER, sahneParagraflari, sahneSec, sahneSecenekleri } from '../src/oyun/karakoy/sahneler';
import { readFileSync } from 'fs';

function konus(d, kisi, dugumId, etiketBasi) {
  const g = dugum(d, kisi, dugumId);
  const s = g.secenekler.find((x) => x.etiket.startsWith(etiketBasi));
  if (!s) throw new Error('Seçenek yok: ' + etiketBasi + ' / ' + g.secenekler.map((x) => x.etiket).join(' | '));
  return sec(d, kisi, dugumId, s.i);
}

function sahneSecEtiket(d, id, etiketBasi) {
  const s = sahneSecenekleri(d, id).find((x) => x.etiket.startsWith(etiketBasi));
  if (!s) throw new Error('Sahne seçeneği yok: ' + etiketBasi + ' / ' + sahneSecenekleri(d, id).map((x) => x.etiket).join(' | '));
  return sahneSec(d, id, s.i);
}

function cikis(mekan, id) {
  return MEKANLAR[mekan].cikislar.find((c) => c.id === id);
}

// İkinci görevi bitirmiş dünya (cuma sabahı, han)
function ikinciBitmis(karar1 = 'polis', ek = {}) {
  const d = yeniDunya();
  d.sahne = null;
  d.gorevBitti = true;
  d.gorev = 2;
  d.gorevGun = 2;
  d.gun = 3;
  d.dakika = 8 * 60;
  d.mekan = 'han';
  d.oyuncu = { x: 37, y: 19, yon: Math.PI };
  d.bayrak = { karar1, g2Gun: 2, g2Bitti: true, cemilTanisti: true, cemilEkipte: true, ...ek };
  d.deliller.push('ip_izi', 'belge', 'kanatli_anahtar', 'paltolu', 'mektup', 'manifest', 'tufek', 'fotograf', 'lavanta_not', 'jeton', 'bicak_yarasi', 'nazim_emri');
  return d;
}

// Üçüncü görevin başı: Cihangir, cumartesi 18.00
function ucuncuGorev(karar1 = 'polis', ek = {}, kimlik = 'Arif Bey') {
  const d = ikinciBitmis(karar1, ek);
  d.sahne = 'g3_cagri';
  sahneSec(d, 'g3_cagri', 0);
  sahneSecEtiket(d, 'g3_acilis', kimlik);
  sahneSec(d, 'g3_acilis_son', 0);
  return d;
}

function saate(d, dakika) {
  const gd = ((d.dakika % 1440) + 1440) % 1440;
  if (dakika > gd) bekle(d, dakika - gd);
}

function salona(d) {
  d.mekan = 'pera_cadde';
  d.oyuncu = { x: 230, y: 8.5, yon: 0 };
  return kapidanGec(d, cikis('pera_cadde', 'kulup_kapi'));
}

describe('Üçüncü görev: On Yedi Numara', () => {
  test('ikinci görev bitince cumartesi akşamüstü çağrı kendiliğinden gelir; bekleme orada durur', () => {
    const d = ikinciBitmis();
    const olaylar = bekle(d, 36 * 60);
    expect(d.sahne).toBe('g3_cagri');
    expect(d.gun).toBe(4);
    expect(((d.dakika % 1440) + 1440) % 1440).toBeLessThan(17 * 60 + 30);
    expect(Array.isArray(olaylar)).toBe(true);
  });

  test('Cemil\'le konuşarak da beklenmeden gidilir', () => {
    const d = ikinciBitmis();
    d.bayrak.g2Bitti = true;
    expect(konusmaBasla(d, 'cemil')).toBe('bitti');
    konus(d, 'cemil', 'bitti', 'Hazırım');
    expect(d.sahne).toBe('g3_cagri');
    expect(sahneParagraflari(d, 'g3_cagri').join(' ')).toContain('Yorgo');
    sahneSec(d, 'g3_cagri', 0);
    expect(d.gorev).toBe(3);
    expect(d.gun).toBe(4);
    expect(d.mekan).toBe('cihangir');
    expect(d.kilik).toBe('bey');
    expect(d.sahne).toBe('g3_acilis');
  });

  test('açılış: kimlik seçimi; kişiler yerinde; Karaköy\'den Pera\'ya yokuş yalnız üçüncü görevde açık', () => {
    const d = ucuncuGorev('polis', {}, 'Kendi adımla');
    expect(d.bayrak.kimlik).toBe('gercek');
    expect(d.sahne).toBeNull();
    expect(kisiler(d).find((k) => k.id === 'nermin').mekan).toBe('cihangir');
    expect(kisiler(d).find((k) => k.id === 'cemil').mekan).toBe('cihangir');
    saate(d, 20 * 60 + 40);
    const ks = kisiler(d);
    expect(ks.find((k) => k.id === 'nermin').mekan).toBe('kulup_salon');
    expect(ks.find((k) => k.id === 'cemil').mekan).toBe('kulup_salon');
    expect(ks.find((k) => k.id === 'yorgo').mekan).toBe('kulup_salon');
    expect(ks.find((k) => k.id === 'achille').mekan).toBe('kulup_salon');
    expect(cikis('dis', 'pera_cik').acik(d)).toBe(true);
    const e = ikinciBitmis();
    expect(cikis('dis', 'pera_cik').acik(e)).toBe(false);
    expect(gorevIpucu(d)).toContain('Panoda');
  });

  test('Yerler: Pera\'daki yerler listede, Cihangir\'den kulübe kendiliğinden yürünür', () => {
    const d = ucuncuGorev();
    const liste = yerlerListesi(d);
    expect(liste.some((y) => y.id === 'kulup')).toBe(true);
    expect(liste.some((y) => y.id === 'leventis')).toBe(true);
    const h = liste.find((y) => y.id === 'kulup');
    expect(otoBaslat(d, h).tamam).toBe(true);
    for (let i = 0; i < 600 && d.oto; i++) ilerle(d, {}, 0.1);
    expect(d.mekan).toBe('pera_cadde');
    expect(Math.hypot(d.oyuncu.x - 230, d.oyuncu.y - 8.3)).toBeLessThan(1.2);
  });

  test('kapılar: bey ön kapıdan girer, servis kapısına giremez; Nermin baş garsonu oyalayınca geçer', () => {
    const d = ucuncuGorev();
    saate(d, 20 * 60 + 40);
    expect(salona(d).tur).toBe('gecti');
    expect(d.mekan).toBe('kulup_salon');
    const servis = cikis('kulup_salon', 'salon_servis');
    expect(servis.acik(d)).toBe(false);
    expect(cikis('pera_cadde', 'servis_kapi').acik(d)).toBe(false);
    konus(d, 'nermin', 'ilk', 'Baş garsonu');
    expect(servis.acik(d)).toBe(true);
    const a = kisiler(d).find((k) => k.id === 'achille');
    expect(a.eylem).toContain('Nermin');
    bekle(d, 20);
    expect(servis.acik(d)).toBe(false);
  });

  test('Yorgo: Süleyman\'ın adı güven verir, garson ceketi; yanık kayıkhane anahtarı da getirir', () => {
    const d = ucuncuGorev('polis', { kayikhaneYandi: 'tam', suleymanYarali: true });
    saate(d, 20 * 60 + 40);
    salona(d);
    expect(konusmaVarMi('yorgo', d)).toBe(true);
    const r = konus(d, 'yorgo', 'ilk', 'Süleyman');
    expect(r.metin).toContain('yaktılar');
    konus(d, 'yorgo', 'guven', 'Bir garson ceketi');
    expect(d.kilik).toBe('usak');
    expect(cikis('kulup_salon', 'salon_servis').acik(d)).toBe(true);
    expect(cikis('pera_cadde', 'kulup_kapi').acik(d)).toBe(false);
    konus(d, 'yorgo', 'guven', 'On yedinin anahtarı');
    expect(d.bayrak.anahtar17).toBe(true);
  });

  test('anahtar panosu: baş garson yakındayken alınmaz, oyalanırken alınır', () => {
    const d = ucuncuGorev();
    saate(d, 20 * 60);
    salona(d);
    d.oyuncu = { x: 238.5, y: 28, yon: 0 };
    // Achille panoya 7 metreden yakın olana kadar bekle
    let yakin = false;
    for (let i = 0; i < 60 && !yakin; i++) {
      const a = kisiler(d).find((k) => k.id === 'achille');
      yakin = a && Math.hypot(a.x - 238.5, a.y - 28) < 6;
      if (!yakin) bekle(d, 1);
    }
    expect(yakin).toBe(true);
    const r = eylemUygula(d, 'pano17', 'al');
    expect(r.metin).toContain('Achille');
    expect(d.bayrak.anahtar17).toBeUndefined();
    konus(d, 'nermin', 'ilk', 'Baş garsonu');
    eylemUygula(d, 'pano17', 'al');
    expect(d.bayrak.anahtar17).toBe(true);
  });

  test('yemek asansörü: toplantıdan önce sessiz; toplantıda dinlenir, nefes sayan halatı tutar', () => {
    const d = ucuncuGorev();
    d.travma = 2;
    d.bayrak.ilkNefes = 'say';
    saate(d, 21 * 60);
    d.mekan = 'servis_koridoru';
    d.oyuncu = { x: 244.5, y: 15.5, yon: 0 };
    expect(eylemUygula(d, 'asansor', 'dinle').metin).toContain('sessiz');
    saate(d, TOPLANTI_BAS + 5);
    eylemUygula(d, 'asansor', 'dinle');
    expect(d.sahne).toBe('g3_dinle');
    expect(sahneParagraflari(d, 'g3_dinle').join(' ')).toContain('Arif Demir');
    sahneSecEtiket(d, 'g3_dinle', 'Nefesini say');
    expect(d.travma).toBe(1);
    sahneSecEtiket(d, 'g3_dinle2', 'Halatı tut');
    expect(d.bayrak.asansorSecim).toBe('tuttu');
    sahneParagraflari(d, 'g3_dinle_son');
    expect(d.deliller).toContain('dinle_toplanti');
    expect(d.deliller).toContain('santa_lucia');
    expect(d.deliller).toContain('madam_n');
    sahneSec(d, 'g3_dinle_son', 0);
    expect(d.sahne).toBeNull();
    expect(eylemUygula(d, 'asansor', 'dinle').metin).toContain('söylendi');
  });

  test('asansörde: travması yüksek ve nefesi bastıranın eli kayar; şüphe yükselir', () => {
    const d = ucuncuGorev();
    d.travma = 1;
    saate(d, TOPLANTI_BAS + 5);
    d.mekan = 'servis_koridoru';
    d.oyuncu = { x: 244.5, y: 15.5, yon: 0 };
    eylemUygula(d, 'asansor', 'dinle');
    sahneSecEtiket(d, 'g3_dinle', 'Dişlerini sık');
    sahneSecEtiket(d, 'g3_dinle2', 'Halatı tut');
    expect(d.bayrak.asansorSecim).toBe('kaydi');
    expect(d.suphe).toBeGreaterThanOrEqual(60);
  });

  test('koridorda merdivendeki adama yaklaşan kulüpten atılır; Nermin eksik delilleri arka sokağa getirir', () => {
    const d = ucuncuGorev();
    saate(d, 21 * 60 + 30);
    d.mekan = 'servis_koridoru';
    d.oyuncu = { x: 247.5, y: 24, yon: 0 };
    const olaylar = [];
    for (let i = 0; i < 60; i++) olaylar.push(...ilerle(d, { ileri: 1 }, 0.1));
    expect(olaylar.some((o) => o.tur === 'yakalandi')).toBe(true);
    expect(d.mekan).toBe('pera_cadde');
    expect(d.bayrak.kulupKapali).toBe(true);
    expect(cikis('pera_cadde', 'kulup_kapi').acik(d)).toBe(false);
    expect(gorevIpucu(d)).toContain('arka sokakta');
    saate(d, 23 * 60);
    const n = kisiler(d).find((k) => k.id === 'nermin');
    expect(n.mekan).toBe('pera_cadde');
    expect(konusmaBasla(d, 'nermin')).toBe('disari');
    dugum(d, 'nermin', 'disari');
    expect(d.deliller).toEqual(expect.arrayContaining(['delorme_kart', 'santa_lucia', 'hargreaves_zarf']));
  });

  test('on yedi: anahtar olsa da toplantıda kilitli; dağılınca açılır; defter, kül tablası, telgraf, dosya', () => {
    const d = ucuncuGorev();
    d.bayrak.anahtar17 = true;
    saate(d, TOPLANTI_BAS + 10);
    const m = cikis('servis_koridoru', 'merdiven17');
    expect(m.acik(d)).toBe(false);
    saate(d, TOPLANTI_BIT + 10);
    expect(m.acik(d)).toBe(true);
    d.mekan = 'servis_koridoru';
    d.oyuncu = { x: 248.5, y: 28.5, yon: 0 };
    expect(kisiler(d).some((k) => k.id === 'nobetci' || k.id === 'lavantali')).toBe(false);
    kapidanGec(d, m);
    expect(d.mekan).toBe('oda17');
    const ids = mevcutNesneler(d).map((n) => n.id);
    expect(ids).toEqual(expect.arrayContaining(['defter17', 'kul17', 'telgraf17', 'dosya17']));
    eylemUygula(d, 'defter17', 'oku');
    eylemUygula(d, 'defter17', 'al');
    eylemUygula(d, 'kul17', 'bak');
    eylemUygula(d, 'telgraf17', 'ac');
    eylemUygula(d, 'dosya17', 'ac');
    expect(d.sahne).toBe('g3_dosya');
    sahneSecEtiket(d, 'g3_dosya', 'Dosyayı al');
    expect(d.bayrak.dosyaKarar).toBe('al');
    sahneSec(d, 'g3_dosya_son', 0);
    expect(mevcutNesneler(d).some((n) => n.id === 'dosya17')).toBe(false);
    expect(d.deliller).toEqual(expect.arrayContaining(['rusvet_defteri', 'kul_tablasi', 'madam_n', 'arif_dosyasi']));
    expect(d.bayrak.defterAlindi).toBe(true);
  });

  test('Hargreaves ve Cemil: on yedinin kiracısı, cumartesi zarfları, Delorme\'un Selanik\'teki çadırı', () => {
    const d = ucuncuGorev('polis', { cemilFikri: 'sert' });
    saate(d, 21 * 60 + 30);
    salona(d);
    konus(d, 'hargreaves', 'ilk', 'Bu kulüp');
    expect(d.deliller).toContain('oda17_kira');
    konus(d, 'hargreaves', 'ilk', 'Size bir viski');
    expect(d.deliller).toContain('hargreaves_zarf');
    expect(d.para).toBe(25);
    d.deliller.push('delorme_kart');
    expect(konusmaBasla(d, 'cemil')).toBe('ilk');
    const r = konus(d, 'cemil', 'ilk', 'Lavantalı adamın');
    expect(r.metin).toContain('Fikri');
    expect(r.metin).toContain('Onuncusu');
    konus(d, 'nermin', 'ilk', 'Ağabeyini');
    konus(d, 'nermin', 'cevdet', 'Ben Seddülbahir');
    expect(d.bayrak.nerminCevdet).toBe('anlat');
    expect(d.nerminBag).toBe(1);
  });

  function panoTamam(d) {
    const ek = ['dinle_toplanti', 'santa_lucia', 'rusvet_defteri'];
    ek.forEach((x) => !d.deliller.includes(x) && d.deliller.push(x));
    teoriKur(d, 'dinle_toplanti', 'bicak_yarasi', G3_CIKARIMLAR.delorme.ifade);
    teoriKur(d, 'santa_lucia', 'tufek', G3_CIKARIMLAR.sevkiyat.ifade);
    expect(g3Tamam(d)).toBe(false);
    teoriKur(d, 'rusvet_defteri', 'nazim_emri', G3_CIKARIMLAR.rusvet.ifade);
    expect(g3Tamam(d)).toBe(true);
  }

  test('pano ve karar: Cihangir\'deki masa kararı açar; ihbar İngiliz yolunda sızar', () => {
    const d = ucuncuGorev('ingiliz');
    panoTamam(d);
    expect(gorevIpucu(d)).toContain('üç bağ');
    d.mekan = 'cihangir';
    eylemUygula(d, 'masa_cemil', 'anlat');
    expect(d.sahne).toBe('g3_karar_oncesi');
    sahneSec(d, 'g3_karar_oncesi', 0);
    sahneSecEtiket(d, 'g3_karar', 'Santa Lucia');
    expect(d.bayrak.karar3).toBe('ihbar');
    expect(d.bayrak.sevkiyatSonuc).toBe('kacti');
    expect(sahneParagraflari(d, 'g3_son_ihbar').join(' ')).toContain('altı saat önce');
    sahneSec(d, 'g3_son_ihbar', 0);
    sahneSecEtiket(d, 'g3_kapanis', 'Seninleyim');
    expect(d.bayrak.nerminEkipte).toBe(true);
    expect(sahneParagraflari(d, 'g3_son').join(' ')).toContain('Yaşar');
    sahneSec(d, 'g3_son', 0);
    expect(d.bayrak.g3Bitti).toBe(true);
    expect(d.mekan).toBe('han');
    expect(d.gun).toBe(6);
    expect(d.kilik).toBeNull();
    expect(gorevIpucu(d)).toContain('Üçüncü görev bitti');
    expect(konusmaBasla(d, 'nermin')).toBe('bitti');
  });

  test('ihbar polis yolunda gemiye el konur; gazete Nermin\'i yakınlaştırır; saklamak Halim\'e götürür', () => {
    const a = ucuncuGorev('polis');
    panoTamam(a);
    konus(a, 'nermin', 'ilk', 'Bildiklerimi');
    expect(a.sahne).toBe('g3_karar_oncesi');
    sahneSec(a, 'g3_karar_oncesi', 0);
    sahneSecEtiket(a, 'g3_karar', 'Santa Lucia');
    expect(a.bayrak.sevkiyatSonuc).toBe('el_konuldu');
    const b = ucuncuGorev('sakla');
    panoTamam(b);
    b.sahne = 'g3_karar';
    sahneSecEtiket(b, 'g3_karar', 'Nermin yazsın');
    expect(b.nerminBag).toBe(1);
    expect(sahneParagraflari(b, 'g3_son_gazete').join(' ')).toContain('Cumartesi Zarfları');
    const c = ucuncuGorev('sakla');
    panoTamam(c);
    c.sahne = 'g3_karar';
    sahneSecEtiket(c, 'g3_karar', 'Saklayalım');
    expect(sahneParagraflari(c, 'g3_son_sakla').join(' ')).toContain('Önce Halim');
  });

  test('Karaköy sahnelerinin ve mekânlarının ortam ve efekt sesleri efektler.js\'te var', () => {
    const kaynak = readFileSync(new URL('../src/ses/efektler.js', import.meta.url), 'utf8');
    const adlar = new Set();
    for (const s of Object.values(SAHNELER)) {
      if (s.ortam) adlar.add(s.ortam);
      (s.efekt || []).forEach((e) => adlar.add(e));
    }
    for (const m of Object.values(MEKANLAR)) if (m.ortam) adlar.add(m.ortam);
    for (const a of adlar) expect(kaynak.includes('  ' + a + ':')).toBe(true);
  });

  test('kayıt: üçüncü görev kılığıyla saklanır', () => {
    const d = ucuncuGorev();
    d.kilik = 'usak';
    const k = kayittanDunya(JSON.parse(JSON.stringify(kayitTemizle(d))));
    expect(k.gorev).toBe(3);
    expect(k.kilik).toBe('usak');
    expect(k.mekan).toBe('cihangir');
  });
});
