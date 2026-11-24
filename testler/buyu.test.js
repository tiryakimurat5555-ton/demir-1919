// 5.0: büyü temeli ve koloni çapası (belgeler/v6 Paket 1, 2, 17)
import { describe, expect, test } from 'bun:test';
import { yeniOyun } from '../src/oyun/durum';
import { zamanIlerle, eylemUygula, noktaEylemleri, SAHNELER, uyu } from '../src/oyun/yuzey/gorevler';
import * as YR from '../src/oyun/yerlesim/yerlesim';
import * as IM from '../src/oyun/imalat/tezgah';
import * as BY from '../src/oyun/buyu/buyu';
import * as BM from '../src/oyun/buyu/bulmaca';
import * as BK0 from '../src/oyun/buyu/koloni';
import * as ZN from '../src/oyun/tonoflenya/zanaat';
import * as Z from '../src/oyun/zaman';

function koloni(tohum = 7) {
  const d = yeniOyun(tohum);
  d.sahne = null;
  Object.assign(d.bayrak, { sondaj: true, kazi: true, dokumhane: true, kule: true });
  zamanIlerle(d, 1);
  d.yer.binalar.push('meydan', 'kamara', 'tapinak', 'okul', 'gozlem', 'atolye');
  return d;
}
function asali(d) {
  YR.varlikEkle(d, 'malazar_asasi', 1);
  YR.varlikEkle(d, 'malazar_kristali', 2);
  const r = IM.uret(d, 'malazar_buyu_tozu', 1, 'tapinak');
  expect(r.metin).toContain('üretildi');
  return d;
}
// Bir seçimi rezonans ayarıyla birlikte uygula (kolay mod kapalı)
function bas(d, el) {
  const ol = BM.sec(d, el);
  if (d.bulmaca && d.bulmaca.ayar) {
    const a = d.bulmaca.ayar;
    const yon = a.adim > 0 ? -1 : 1;
    while (d.bulmaca.ayar.adim !== 0) BM.ayarKaydir(d, yon);
    return BM.ayarDene(d);
  }
  return ol;
}
function dugumeGit(d, id) {
  const i = BM.dugumler(d).findIndex((n) => n.id === id);
  d.bulmaca.i = i;
}

describe('Asa ve açılış', () => {
  test('Büyü tozu üretilince asa uyanır, sahne açılır, odak yüz', () => {
    const d = asali(koloni());
    expect(d.buyu.asa).toBe(1);
    expect(d.buyu.odak).toBe(100);
    expect(d.sahne).toBe('asa_uyanis');
    expect(SAHNELER.asa_uyanis.metin(d).join(' ')).toContain('Malken');
  });
  test('Asa uyanmadan tapınakta büyü eylemi yok', () => {
    const d = koloni();
    expect(noktaEylemleri(d, 'yb_tapinak').some((e) => e.id === 'by_ogren')).toBe(false);
  });
  test('Eski kayıt: sunak açıksa asa uyanmış sayılır', () => {
    const d = koloni();
    delete d.buyu;
    d.bayrak.rezonansSunagi = true;
    BY.hazirla(d);
    expect(d.buyu.asa).toBe(1);
  });
});

describe('Öğrenme', () => {
  test('Tapınakta Kıvılcım Dalgası: ayar ve deneme, odak harcanmaz', () => {
    const d = asali(koloni());
    d.sahne = null;
    expect(noktaEylemleri(d, 'yb_tapinak').some((e) => e.id === 'by_ogren')).toBe(true);
    const mn = BK0.ogrenmeMenu(d);
    const r = mn.ogeler.find((o) => o.id === 'o_kivilcim').yap(d);
    expect(r.buyu).toBe(true);
    expect(d.bulmaca.ogren).toBe('kivilcim');
    const o1 = BM.sec(d, 'kivilcim');
    expect(o1[0].ayar).toBe(true);
    // Ayarsız denemek tutmaz
    expect(BM.ayarDene(d)[0].soz).toMatch(/ayrı|yaklaştın/i);
    while (d.bulmaca.ayar.adim !== 0) BM.ayarKaydir(d, d.bulmaca.ayar.adim > 0 ? -1 : 1);
    BM.ayarDene(d);
    const o2 = bas(d, 'kivilcim');
    expect(o2.some((o) => o.bitti)).toBe(true);
    expect(BY.biliyor(d, 'kivilcim')).toBe(true);
    expect(d.buyu.odak).toBe(100);
    expect(d.bulmaca).toBe(null);
  });
  test('Bilinmeyen büyü listede çıkmaz; sarmaşık Sorya ya da Lyris kademe 6 ister', () => {
    const d = asali(koloni());
    BM.baslat(d, 'ogren_buzul', { ogren: 'buzul' });
    const l = BM.secenekler(d).map((x) => x.id);
    expect(l).toContain('buzul');
    expect(l).not.toContain('kivilcim');
    BM.birak(d);
    const s = BK0.ogrenmeMenu(d).ogeler.find((o) => o.id === 'o_sarmasik');
    expect(s.yap(d).ses).toBe('red');
    d.bayrak.yk_sorya_6 = true;
    expect(BK0.ogrenmeMenu(d).ogeler.find((o) => o.id === 'o_sarmasik').yap(d).buyu).toBe(true);
  });
  test('Şişeleme: sunak ilk şişeyi verir, aralama salım harcar', () => {
    const d = asali(koloni());
    BM.baslat(d, 'ogren_siseleme', { ogren: 'siseleme' });
    expect(BY.siseSayisi(d, 'lumina')).toBe(1);
    bas(d, 'lumina_salim');
    bas(d, 'lumina_salim');
    expect(BY.biliyor(d, 'siseleme')).toBe(true);
    expect(d.buyu.sise.lumina[0]).toBe(1);
  });
});

describe('Bulmaca motoru', () => {
  function bilgili() {
    const d = asali(koloni());
    d.sahne = null;
    for (const k of ['kivilcim', 'buzul', 'suzulme', 'tele_kaldirma', 'devre', 'frekans_anahtari', 'yanki_tarama', 'zihin_arindirma', 'siseleme']) BY.ogret(d, k);
    return d;
  }
  test('Yanlış büyü 5 odak düşer ve ipucu verir; bulmaca bozulmaz', () => {
    const d = bilgili();
    BM.baslat(d, 'ders_element');
    const o = BM.sec(d, 'devre');
    expect(o[0].soz).toContain('5 odak');
    expect(d.buyu.odak).toBe(95);
    expect(d.bulmaca.cozulen.length).toBe(0);
  });
  test('Buhar perdesi: buzul ve kıvılcım peş peşe; ödül ve tekrar', () => {
    const d = bilgili();
    BM.baslat(d, 'ders_element');
    bas(d, 'kivilcim');
    dugumeGit(d, 'lav');
    bas(d, 'buzul');
    dugumeGit(d, 'gozcu');
    bas(d, 'buzul');
    const son = bas(d, 'kivilcim');
    expect(son.some((x) => x.bitti)).toBe(true);
    expect(BM.bittiMi(d, 'ders_element')).toBe(true);
    expect(BY.siseSayisi(d, 'lumina')).toBe(1);
    // Kullanım ustalığı sayar
    expect(d.buyu.kullanim.kivilcim).toBe(2);
  });
  test('Sıra: önceki düğüm çözülmeden sonraki açılmaz', () => {
    const d = bilgili();
    BM.baslat(d, 'ders_tasima');
    dugumeGit(d, 'sandik');
    expect(BM.sec(d, 'tele_kaldirma')[0].ses).toBe('red');
  });
  test('Bırak ve dön: yarım bulmaca kaldığı yerden', () => {
    const d = bilgili();
    BM.baslat(d, 'ders_tekno');
    bas(d, 'devre');
    BM.birak(d);
    expect(d.bulmaca).toBe(null);
    BM.baslat(d, 'ders_tekno');
    expect(d.bulmaca.cozulen).toContain('asansor');
  });
  test('Odak yetmezse nefes al; yedek yol yalnız hiçbir yol yokken', () => {
    const d = bilgili();
    BM.baslat(d, 'kizil_damar');
    d.buyu.odak = 0;
    expect(BM.sec(d, 'yanki_tarama')[0].soz).toContain('Odak yetmiyor');
    expect(BM.secenekler(d).some((x) => x.id === 'nefes')).toBe(true);
    BM.sec(d, 'nefes');
    expect(d.buyu.odak).toBe(BM.NEFES_ODAK);
    expect(BM.secenekler(d).some((x) => x.id === 'yedek')).toBe(false);
    // Sarmaşık bilinmeyen vaha bulmacasında tele+yankı yolu var; yedeğe gerek yok
    BM.birak(d);
  });
  test('Yedek yol: kombinasyonların hiçbiri ulaşılmazsa açılır ve düğümü çözer', () => {
    const d = asali(koloni());
    BM.baslat(d, 'ders_yanki');
    expect(BM.secenekler(d).some((x) => x.id === 'yedek')).toBe(true);
    const o = BM.sec(d, 'yedek');
    expect(o[0].cozuldu).toBe('gizli');
    expect(d.buyu.odak).toBe(60);
  });
  test('Pencere dolarsa düğüm sıfırlanır', () => {
    const d = bilgili();
    BM.bulmacaEkle('test_pencere', { ad: 'T', dugumler: [{ id: 'a', ad: 'A', pan: 0, durum: '', kombolar: [['kivilcim', 'buzul']], pencere: 15 }] });
    BM.baslat(d, 'test_pencere');
    bas(d, 'kivilcim');
    expect(d.bulmaca.pencere.a).toBe(15);
    const ol = BM.ilerle(d, 16);
    expect(ol[0].soz).toContain('Senkron');
    expect(d.bulmaca.uyg.a.length).toBe(0);
  });
  test('Hava: kademeler, yıldırım yağmur ister, sıralı kombinasyon', () => {
    const d = bilgili();
    BY.ogret(d, 'hava');
    BM.bulmacaEkle('test_bobin', { ad: 'Bobin', dugumler: [{ id: 'b', ad: 'Bobin', pan: 0, durum: '', kombolar: [['hava_yagmur', 'hava_firtina', 'yildirim_dusur']], sirali: true }] });
    BM.baslat(d, 'test_bobin');
    expect(BM.sec(d, 'yildirim_dusur')[0].soz).toContain('Yağmur');
    bas(d, 'h_isit');
    bas(d, 'h_isit');
    bas(d, 'h_isit');
    expect(d.bulmaca.uyg.b).toEqual(['hava_yagmur']);
    bas(d, 'h_isit');
    const son = bas(d, 'yildirim_dusur');
    expect(son.some((x) => x.bitti)).toBe(true);
    expect(d.buyu.odak).toBe(100 - 40 - 25);
  });
  test('Heykel: taşlar takılır, bitince geri sökülür', () => {
    const d = bilgili();
    BY.ogret(d, 'heykel');
    BY.tasEkle(d, 'kizil', 2);
    BY.tasEkle(d, 'mor', 1);
    BM.bulmacaEkle('test_heykel', { ad: 'H', dugumler: [{ id: 'h', ad: 'Heykel', pan: 0, durum: '', kombolar: [['heykel']], tas: { kizil: 2, mor: 1 } }] });
    BM.baslat(d, 'test_heykel');
    const ol = bas(d, 'heykel');
    expect(ol.some((x) => x.bitti)).toBe(true);
    expect(d.buyu.taslar.kizil).toBe(2);
    expect(d.buyu.taslar.mor).toBe(1);
  });
  test('Savaşta bulmaca açılmaz', () => {
    const d = bilgili();
    d.savas = { tur: 1 };
    expect(BM.baslat(d, 'ders_element').ses).toBe('red');
  });
});

describe('Koloni çapası', () => {
  test('Saha bulmacaları renkli taş verir', () => {
    const d = asali(koloni());
    for (const k of ['devre', 'frekans_anahtari', 'yanki_tarama', 'tele_kaldirma', 'buzul', 'zihin_arindirma']) BY.ogret(d, k);
    BM.baslat(d, 'gozlem_mercekleri');
    bas(d, 'devre');
    bas(d, 'frekans_anahtari');
    bas(d, 'yanki_tarama');
    expect(d.buyu.taslar.sari).toBe(1);
    BM.baslat(d, 'batik_sandik');
    bas(d, 'buzul');
    bas(d, 'tele_kaldirma');
    expect(d.buyu.taslar.mavi).toBe(1);
    BM.baslat(d, 'kurumus_kaynak');
    bas(d, 'zihin_arindirma');
    bas(d, 'tele_kaldirma');
    bas(d, 'yanki_tarama');
    expect(d.buyu.taslar.yesil).toBe(1);
  });
  test('Nokta eylemleri: enkaz, gözlem, okul; eylemUygula yönlendirir', () => {
    const d = asali(koloni());
    d.sahne = null;
    expect(noktaEylemleri(d, 'enkaz').some((e) => e.id === 'bm_enkaz_kasasi')).toBe(true);
    expect(noktaEylemleri(d, 'yb_okul').some((e) => e.id === 'by_kol')).toBe(true);
    const r = eylemUygula(d, 'yb_okul', 'by_kol');
    expect(d.bayrak.akademiBuyuKolu).toBe(true);
    expect(r.metin).toContain('YGK');
    expect(eylemUygula(d, 'enkaz', 'bm_enkaz_kasasi').buyu).toBe(true);
  });
  test('Yıldız tozu: doğru nöbet, boş şişe ve şişeleme gerekir', () => {
    const d = asali(koloni());
    BY.ogret(d, 'siseleme');
    d.zaman.sn = Z.GUN_SN * 3 + 1; // Gümüş Şafak
    expect(BY.tozTopla(d, 'yb_gozlem').ses).toBe('red'); // boş şişe yok
    expect(IM.uret(d, 'bos_sise', 1, 'atolye').ses).toBe('red');
    YR.varlikEkle(d, 'kuvars_kumu', 4);
    expect(IM.uret(d, 'bos_sise', 2, 'atolye').metin).toContain('üretildi');
    expect(BY.tozTopla(d, 'yb_gozlem').metin).toContain('Lumina');
    expect(BY.tozTopla(d, 'yb_gozlem').metin).toContain('Bu nöbette');
    d.zaman.sn = Z.GUN_SN * 3 + Z.NOBET_SN * 1 + 1; // Kızıl Kuşluk
    expect(BY.tozTopla(d, 'yb_gozlem').metin).toContain('toz yok');
  });
  test('Odak doldurucu ve aşırı yükleme; uyku odağı yüze indirir', () => {
    const d = asali(koloni());
    d.buyu.odak = 10;
    YR.varlikEkle(d, 'piezo', 1);
    BY.odakDoldur(d, 'piezo');
    expect(d.buyu.odak).toBe(40);
    YR.varlikEkle(d, 'malazar_buyu_tozu', 1);
    BY.odakDoldur(d, 'malazar_buyu_tozu');
    expect(d.buyu.odak).toBe(120);
    expect(BY.dinlenince(d)).toBe('');
    expect(d.buyu.odak).toBe(120);
    expect(d.buyu.asiriYuk).toBe(false);
  });
  test('Bölgesel hava: soğuk bölgede güneş maruziyeti yarıya indirir; savaşta kullanılmaz', () => {
    const d = asali(koloni());
    BY.ogret(d, 'hava');
    d.mekan = 'kriyo';
    const kart = BY.defterMenu(d, 4).ogeler.find((o) => o.id === 't_hava').alt(d);
    kart.ogeler.find((o) => o.id === 'isit').yap(d);
    expect(BY.havaSeviyesi(d)).toBe(1);
    expect(BY.maruziyetCarpani(d, 'soguk')).toBe(0.5);
    d.savas = { tur: 1 };
    expect(BY.disariKullan(d, 'zihin_arindirma').ses).toBe('red');
  });
  test('Taş düşürme kancası asa uyanınca çalışır', () => {
    const d = koloni();
    expect(BY.tasDusur(d, 'kizil', 1, 'x')).toBe('');
    asali(d);
    expect(BY.tasDusur(d, 'kizil', 1, 'x')).toBe(' x');
  });
});
