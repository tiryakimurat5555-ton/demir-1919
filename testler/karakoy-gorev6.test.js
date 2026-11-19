import { describe, expect, test } from 'bun:test';
import { yeniDunya, ilerle, etkiles, eylemUygula, bekle, kisiler, kapidanGec, kayittanDunya, kayitTemizle, yerlerListesi, bekci } from '../src/oyun/karakoy/dunya';
import { konusmaBasla, dugum, sec, gorevIpucu, mevcutNesneler, teoriKur, panoIfadeleri, CIKARIMLAR, envanterMetni } from '../src/oyun/karakoy/gorev1';
import { MEKANLAR } from '../src/oyun/karakoy/harita';
import { sahneParagraflari, sahneSec, sahneSecenekleri, SAHNELER } from '../src/oyun/karakoy/sahneler';
import { rotaKur } from '../src/oyun/karakoy/yol';

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
const cikis = (mekan, id) => MEKANLAR[mekan].cikislar.find((c) => c.id === id);

// Beşinci görevi bitirmiş dünya, kapanış sahnesinde
function besinciBitmis(ek = {}, deliller = []) {
  const d = yeniDunya();
  d.sahne = 'g5_kapanis';
  d.gorevBitti = true;
  d.gorev = 5;
  d.gorevGun = 8;
  d.gun = 8;
  d.dakika = 23 * 60 + 55;
  d.mekan = 'han';
  d.oyuncu = { x: 37, y: 19, yon: Math.PI };
  d.bayrak = { karar1: 'polis', g2Bitti: true, g3Bitti: true, g4Bitti: true, rizaEkipte: true, g5Yuzlesti: true, yuzlesmeSecim: 'oyala', ...ek };
  d.deliller.push('fotograf', 'belge', 'ip_izi', 'salonique_n', ...deliller);
  return d;
}

// Altıncı görev açıldı, Gülce'yle konuşuldu, köprü yolu biliniyor
function altinciGorev(ek = {}, secim = 'Babanı', deliller = []) {
  const d = besinciBitmis(ek, deliller);
  sahneSec(d, 'g5_kapanis', 0);
  sahneSecEtiket(d, 'g6_acilis', secim);
  sahneSec(d, 'g6_kamil', 0);
  return d;
}

function evrakOdasina(d) {
  d.mekan = 'dis';
  d.oyuncu = { x: -58.5, y: 12, yon: -Math.PI / 2 };
  return kapidanGec(d, cikis('dis', 'kopru_gec'));
}
function saat(d, s, dk = 0) {
  const hedef = s * 60 + dk;
  const gd = ((d.dakika % 1440) + 1440) % 1440;
  if (hedef > gd) bekle(d, hedef - gd);
}
function panoyaKur(d, a, b, cikarim) {
  const ifade = CIKARIMLAR[cikarim].ifade;
  expect(panoIfadeleri(d, a, b)).toContain(ifade);
  teoriKur(d, a, b, ifade);
}

describe('Altıncı görev: Siyakat', () => {
  test('beşinci görevin kapanışı altıncıyı açar: Gülce zimmeti okur, babasının dosyası', () => {
    const d = besinciBitmis({ gulceKamil: 'sakla' });
    sahneSec(d, 'g5_kapanis', 0);
    expect(d.gorev).toBe(6);
    expect(d.gun).toBe(9);
    expect(d.sahne).toBe('g6_acilis');
    const p = sahneParagraflari(d, 'g6_acilis').join(' ');
    expect(p).toContain('Göz nezdinde');
    expect(p).toContain('dört yüz on yedi');
    expect(p).toContain('saklamıştın');
    sahneSecEtiket(d, 'g6_acilis', 'Sakladığım');
    expect(d.bayrak.gulceKamil).toBe('soyle');
    const k = sahneParagraflari(d, 'g6_kamil').join(' ');
    expect(k).toContain('Halim');
    expect(k).toContain('aynı ince');
    sahneSec(d, 'g6_kamil', 0);
    expect(d.sahne).toBeNull();
    expect(d.bayrak.g6Pusula).toBe(true);
    expect(SAHNELER.g6_kamil.bitisSozu).toContain('Galata Köprüsü');
    expect(gorevIpucu(d)).toContain('584');
  });

  test('gelecek kaydı: beşinci görev bitmiş eski kayıt altıncı görevin açılışıyla sürer', () => {
    const d = besinciBitmis();
    sahneSec(d, 'g5_kapanis', 0);
    d.gorev = 5;
    d.sahne = null;
    d.dakika = 15 * 60;
    const k = kayittanDunya(JSON.parse(JSON.stringify(kayitTemizle(d))));
    ilerle(k, {}, 0.05);
    expect(k.sahne).toBe('g6_acilis');
    expect(k.gorev).toBe(6);
    expect(k.dakika).toBe(8 * 60);
    expect(k.gun).toBe(10);
  });

  test('köprü Nezaret saatlerinde açık; Yerler\'de köprü ve evrak odası; mahzen kapısı Tahsin Efendi\'nin arkasında', () => {
    const d = altinciGorev();
    d.mekan = 'dis';
    d.oyuncu = { x: -58.5, y: 12, yon: -Math.PI / 2 };
    expect(etkiles(d).tur).toBe('kilitli'); // sekiz buçuk: Nezaret kapalı
    saat(d, 9, 5);
    expect(evrakOdasina(d).tur).toBe('gecti');
    expect(d.mekan).toBe('evrak_odasi');
    const ad = yerlerListesi(d).map((y) => y.id);
    expect(ad).toContain('kopru');
    const ks = kisiler(d).filter((k) => k.mekan === 'evrak_odasi').map((k) => k.id);
    expect(ks).toContain('tahsin');
    expect(ks).toContain('gulce');
    d.oyuncu = { x: 317, y: 10.5, yon: 0 };
    expect(cikis('evrak_odasi', 'mahzen_kapi').acik(d)).toBe(false);
    // Yerler'den Karaköy'den evrak odasına yol kurulur
    const e = altinciGorev();
    saat(e, 9, 30);
    e.mekan = 'kayikhane';
    e.oyuncu = { x: -41, y: 5, yon: 0 };
    const hedef = yerlerListesi(e).find((y) => y.id === 'evrak');
    expect(hedef).toBeTruthy();
    expect(rotaKur(e, () => null, hedef).hata).toBeFalsy();
  });

  test('Tahsin Efendi\'ye pusula: çıkış defteri; ama adını yazar ve iki buçukta Nazım Bey öğrenir', () => {
    const d = altinciGorev();
    saat(d, 9, 10);
    evrakOdasina(d);
    expect(konusmaBasla(d, 'tahsin')).toBe('ilk');
    const r = konus(d, 'tahsin', 'ilk', 'Gülce Hanım');
    expect(r.yeniDeliller).toEqual(['evrak_kaydi']);
    expect(r.metin).toContain('Dokuz Nisan');
    d.oyuncu = { x: 311, y: 7, yon: 0 };
    saat(d, 14, 25);
    const olaylar = [];
    for (let i = 0; i < 200 && !d.deliller.includes('nazim_sozu'); i++) olaylar.push(...ilerle(d, {}, 0.6));
    const a = olaylar.find((o) => o.tur === 'anlatim');
    expect(a.metin).toContain('Nazım Bey');
    expect(a.metin).toContain('pusulayı');
    expect(d.bayrak.nazimUyarildi).toBe(true);
  });

  test('Tahsin\'e sormadan iki buçukta dinlemek: Nazım Bey uyanmaz', () => {
    const d = altinciGorev();
    saat(d, 14, 25);
    evrakOdasina(d);
    d.oyuncu = { x: 311, y: 7, yon: 0 };
    for (let i = 0; i < 200 && !d.deliller.includes('nazim_sozu'); i++) ilerle(d, {}, 0.6);
    expect(d.deliller).toContain('nazim_sozu');
    expect(d.bayrak.nazimUyarildi).toBeFalsy();
  });

  test('Gülce oyalarken mahzen açılır; yanlış raf zaman yer, doğru raf dosyayı ve pusulayı verir', () => {
    const d = altinciGorev();
    saat(d, 9, 15);
    evrakOdasina(d);
    d.oyuncu = { x: 305, y: 5, yon: 0 };
    const r = konus(d, 'gulce', 'g6', 'Tahsin Efendi');
    expect(r.metin).toContain('Yirmi dakikan');
    expect(cikis('evrak_odasi', 'mahzen_kapi').acik(d)).toBe(true);
    d.oyuncu = { x: 317, y: 10.5, yon: 0 };
    expect(kapidanGec(d, cikis('evrak_odasi', 'mahzen_kapi')).tur).toBe('gecti');
    expect(d.mekan).toBe('evrak_mahzeni');
    expect(mevcutNesneler(d).length).toBe(5);
    // Rüştü Efendi uzaktayken
    d.oyuncu = { x: 302.5, y: 22, yon: 0 };
    d.suphe = 0;
    const y = eylemUygula(d, 'raf_1328', 'ara');
    expect(y.metin).toContain('Bu yıl değil');
    expect(d.deliller).not.toContain('kamil_dosyasi');
    d.oyuncu = { x: 309, y: 28, yon: 0 };
    d.suphe = 0;
    const dogru = eylemUygula(d, 'raf_1329_gumruk', 'ara');
    expect(dogru.yeniDeliller).toEqual(['kamil_dosyasi']);
    expect(d.sahne).toBe('g6_dosya');
    expect(sahneParagraflari(d, 'g6_dosya').join(' ')).toContain('Kont S.');
    sahneSecEtiket(d, 'g6_dosya', 'Aç');
    expect(d.sahne).toBe('g6_not');
    expect(sahneParagraflari(d, 'g6_not').join(' ')).toContain('İmzala ve yaşa');
    sahneSec(d, 'g6_not', 0);
    expect(envanterMetni(d)).toContain('Dosya 417');
  });

  test('öğle namazında kapı kendiliğinden açık; mahzende yakalanan Nezaret\'ten atılır, o gün giremez', () => {
    const d = altinciGorev();
    saat(d, 12, 5);
    evrakOdasina(d);
    expect(kisiler(d).some((k) => k.id === 'tahsin' && k.mekan === 'evrak_odasi')).toBe(false);
    expect(cikis('evrak_odasi', 'mahzen_kapi').acik(d)).toBe(true);
    // öğleden sonra Rüştü döner; yanına sokulan yakalanır
    saat(d, 13, 0);
    d.oyuncu = { x: 317, y: 10.5, yon: 0 };
    d.mekan = 'evrak_mahzeni';
    d.oyuncu = { x: 316.5, y: 15.5, yon: 0 };
    const r = kisiler(d).find((k) => k.id === 'rustu');
    expect(r.mekan).toBe('evrak_mahzeni');
    expect(bekci(d).id).toBe('rustu');
    const olaylar = [];
    for (let i = 0; i < 30 && d.mekan === 'evrak_mahzeni'; i++) {
      const b = bekci(d);
      if (b) d.oyuncu = { x: b.x + 1, y: b.y, yon: 0 };
      olaylar.push(...ilerle(d, { ileri: 0.01 }, 0.3));
    }
    const y = olaylar.find((o) => o.tur === 'yakalandi');
    expect(y.metin).toContain('Bugün bir daha giremezsin');
    expect(d.mekan).toBe('dis');
    expect(d.bayrak.nazimUyarildi).toBe(true);
    expect(cikis('dis', 'kopru_gec').acik(d)).toBe(false);
    expect(gorevIpucu(d)).toContain('Yarın');
    bekle(d, 24 * 60);
    saat(d, 9, 30);
    expect(cikis('dis', 'kopru_gec').acik(d)).toBe(true);
  });

  test('üç bağ, Gülce\'ye anlatmak, pusula ve yüzleşme kararı; görevin sonu', () => {
    const d = altinciGorev({}, 'Elini', ['evrak_kaydi', 'kamil_dosyasi']);
    d.bayrak.notKarar = 'ver';
    d.bayrak.dosyaAlindi6 = true;
    expect(d.deliller).toContain('kamil_olumu');
    expect(d.deliller).toContain('siyakat_satirlari');
    panoyaKur(d, 'siyakat_satirlari', 'kamil_dosyasi', 'dorduncu_dis');
    panoyaKur(d, 'kamil_olumu', 'ip_izi', 'ayni_yontem');
    teoriKur(d, 'kamil_olumu', 'belge', 'Kâmil Efendi\'yi Halim öldürdü.');
    panoyaKur(d, 'evrak_kaydi', 'kamil_dosyasi', 'emri_veren');
    expect(gorevIpucu(d)).toContain('üç bağ');
    saat(d, 18, 0);
    expect(kisiler(d).find((k) => k.id === 'gulce').mekan).toBe('han');
    konus(d, 'gulce', 'g6', 'Bildiklerimi');
    expect(d.sahne).toBe('g6_karar_oncesi');
    const p = sahneParagraflari(d, 'g6_karar_oncesi').join(' ');
    expect(p).toContain('bıyığı yeni terlemiş');
    expect(p).toContain('İnatçı');
    sahneSec(d, 'g6_karar_oncesi', 0);
    sahneSecEtiket(d, 'g6_karar', 'Nazım Bey');
    expect(sahneParagraflari(d, 'g6_son_yuzles').join(' ')).toContain('Selanik\'te sizi soruyorlar');
    sahneSec(d, 'g6_son_yuzles', 0);
    expect(d.bayrak.nazimUyarildi).toBe(true);
    expect(sahneParagraflari(d, 'g6_kapanis').join(' ')).toContain('Atina: Mühür');
    const gun = d.gorevGun;
    sahneSec(d, 'g6_kapanis', 0);
    expect(d.bayrak.g6Bitti).toBe(true);
    expect(d.gun).toBe(gun + 2);
    expect(gorevIpucu(d)).toContain('Altıncı görev bitti');
    expect(kisiler(d).some((k) => k.id === 'tahsin')).toBe(false);
  });

  test('Rıza\'ya ve gazeteye giden yollar; saklanan pusula', () => {
    const d = altinciGorev({}, 'Bu iş', ['kamil_dosyasi', 'nazim_sozu']);
    expect(d.gulceGuven).toBe(-1);
    d.bayrak.notKarar = 'sakla';
    panoyaKur(d, 'siyakat_satirlari', 'kamil_dosyasi', 'dorduncu_dis');
    panoyaKur(d, 'kamil_olumu', 'ip_izi', 'ayni_yontem');
    panoyaKur(d, 'nazim_sozu', 'kamil_dosyasi', 'emri_veren');
    saat(d, 18, 0);
    konus(d, 'gulce', 'g6', 'Bildiklerimi');
    expect(sahneParagraflari(d, 'g6_karar_oncesi').join(' ')).toContain('cesaretin yok');
    sahneSec(d, 'g6_karar_oncesi', 0);
    const e = JSON.parse(JSON.stringify(d));
    sahneSecEtiket(d, 'g6_karar', 'Dosyayı Rıza');
    expect(sahneParagraflari(d, 'g6_son_riza').join(' ')).toContain('Ben imzalattım');
    sahneSec(d, 'g6_son_riza', 0);
    expect(d.bayrak.dosyaRizada).toBe(true);
    expect(sahneParagraflari(d, 'g6_kapanis').join(' ')).toContain('Çıkarmıyorsun');
    sahneSecEtiket(e, 'g6_karar', 'Nermin');
    expect(sahneParagraflari(e, 'g6_son_gazete').join(' ')).toContain('Bir Gümrük Kâtibinin Ölümü');
    sahneSec(e, 'g6_son_gazete', 0);
    expect(e.bayrak.kollarUyarildi).toBe(true);
    sahneSec(e, 'g6_kapanis', 0);
    expect(e.gun).toBe(e.gorevGun + 3);
  });
});
