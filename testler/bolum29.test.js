// Yirmi dokuzuncu bölüm: Marsilya, Mayıs 1924. Melek.
import { expect, test } from 'bun:test';
import { BOLUM28 } from '../src/hikaye/bolum28';
import { BOLUM29 as B } from '../src/hikaye/bolum29';
import * as M from '../src/oyun/motor';

function sahneGec(d, parca) {
  expect(d.gorunum.tur).toBe('sahne');
  const s = M.sahneBilgisi(B, d);
  const sec = parca ? s.secenekler.find((x) => x.etiket.includes(parca)) : s.secenekler[0];
  if (!sec) throw new Error('sahne ' + d.gorunum.id + ': seçenek yok: ' + parca + ' / var: ' + s.secenekler.map((x) => x.etiket).join(' | '));
  return M.sahneSec(B, d, sec).durum;
}
function konus(d, kisi, parcalar) {
  expect(M.mekanBilgisi(B, d).kisiler).toContain(kisi);
  d = M.konusmaBaslat(B, d, kisi);
  for (const p of parcalar) {
    expect(d.gorunum.tur).toBe('konusma');
    const b = M.dugumBilgisi(B, d);
    const sec = b.secenekler.find((x) => x.etiket.includes(p));
    if (!sec) throw new Error(kisi + ': seçenek yok: ' + p + ' / var: ' + b.secenekler.map((x) => x.etiket).join(' | '));
    d = M.secenekSec(B, d, sec).durum;
  }
  return d;
}
const incele = (d, id) => {
  expect(M.mekanBilgisi(B, d).nesneler.map((o) => o.id)).toContain(id);
  return M.incele(B, d, id).durum;
};
const git = (d, hedef) => {
  expect(M.mekanBilgisi(B, d).gecisler.map((g) => g.hedef)).toContain(hedef);
  return M.mekanaGir(B, d, hedef);
};
const baglan = (d, a, b) => {
  const r = M.baglan(B, d, a, b);
  if (!r.basarili) throw new Error(a + ' + ' + b + ': ' + r.metin);
  return r.durum;
};

const senaryolar = [
  {
    ad: 'yalnız gelen Neslihan, kendi hikâyesini anlatır, anne, Cenevre tanığı',
    ek: { neslihanYol: 'yalniz', ferranteKarar: 'cenevre', arifGece: 'kardes', neslihanAd: 'kendi', davidItiraf: false, cocukKarar: 'yanina', rizaKorku: 'yanında' },
    tavsiye: 'Kendi hikâyeni', sorular: ['Neslihan kendi'], karar: 'Söyle.',
    beklenen: { neslihanTavsiye: 'anlat', melekKarar: 'anne', melekTanik: true, davidItiraf: 'sonra' },
    metin: ['üç haftadır burada', 'Klara', 'Zehra\'ya mektup', 'provasını', 'göl kıyısında', 'Bir adı kendim seçtim', 'Tekirdağ nerede', 'Gelirim', 'Selanik\'ten beri bende'],
  },
  {
    ad: 'acele: liste gösterilir, dinle, Florina, zarf',
    ek: { neslihanYol: 'birlikte', ferranteKarar: 'polis', neslihanAd: 'baba' },
    tavsiye: 'Konuşma; dinle', sorular: ['Listeyi göster', 'Florina', 'Bugünlük'], karar: 'Bir zarf',
    beklenen: { neslihanTavsiye: 'dinle', melekKarar: 'zarf', melekTanik: false },
    metin: ['önümde dur', 'altı gün sonra serbest', 'Kâğıdı kaldırın', 'Dut', 'Açmıyor. Henüz'],
  },
  {
    ad: 'ben de geleyim, sus',
    ek: { neslihanYol: 'bekle', ferranteKarar: 'birak' },
    tavsiye: 'Ben de yanında', sorular: ['Florina', 'Neslihan kendi'], karar: 'Söyleme',
    beklenen: { neslihanTavsiye: 'ben', melekKarar: 'sus' },
    metin: ['yastığının altında', 'Kapıda dur', 'kapıda duran bir adam', 'Abime bile anlatmadım', 'Madame Madeleine'],
  },
];

for (const s of senaryolar) {
  test('yirmi dokuzuncu bölüm: ' + s.ad, () => {
    const s28 = { ...M.yeniDurum(BOLUM28), gorunum: { tur: 'sahne', id: 'son' }, deliller: ['belge', 'zarf', 'alt_yari', 'makbuz_defteri'], cikarimlar: ['orgut'], bayraklar: { bolumBitti: true, ...s.ek } };
    expect(M.sahneBilgisi(BOLUM28, s28).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum29');
    let d = M.bolumeGec(B, s28);
    const metinler = [];
    const topla = (t) => metinler.push([].concat(t).join(' '));
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d);
    expect(d.mekan).toBe('liman29');
    expect(M.mekanBilgisi(B, d).gecisler.length).toBe(0);
    d = M.konusmaBaslat(B, d, 'riza29');
    topla(M.dugumBilgisi(B, d).soz);
    d = M.secenekSec(B, d, M.dugumBilgisi(B, d).secenekler[0]).durum;
    d = konus(d, 'neslihan29', ['Sor']);
    expect(d.gorunum.id).toBe('neslihan_hazir');
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d, s.tavsiye);
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d);
    d = incele(d, 'telgrafhane29');
    d = baglan(d, 'makbuz_defteri', 'gulce_telgrafi');
    d = git(d, 'okul29');

    d = M.konusmaBaslat(B, d, 'melek');
    topla(M.dugumBilgisi(B, d).soz);
    for (const p of s.sorular) {
      const r = M.secenekSec(B, d, M.dugumBilgisi(B, d).secenekler.find((x) => x.etiket.includes(p)));
      topla(r.cevap);
      d = r.durum;
      if (d.gorunum.tur === 'konusma' && d.gorunum.dugum === 'neslihan_hikaye') {
        topla(M.dugumBilgisi(B, d).soz);
        d = M.secenekSec(B, d, M.dugumBilgisi(B, d).secenekler[0]).durum;
      }
      if (d.gorunum.tur === 'mekan') d = M.konusmaBaslat(B, d, 'melek');
    }
    if (d.gorunum.tur === 'mekan') d = M.konusmaBaslat(B, d, 'melek');
    expect(M.sayi(d, 'melekGuven')).toBeGreaterThanOrEqual(2);
    const r = M.secenekSec(B, d, M.dugumBilgisi(B, d).secenekler.find((x) => x.etiket.includes('Gemiyi')));
    d = r.durum;
    expect(M.delilVar(d, 'melek_tanikligi')).toBe(true);
    if (d.gorunum.tur === 'konusma') d = M.secenekSec(B, d, M.dugumBilgisi(B, d).secenekler[0]).durum;
    expect(d.gorunum.id).toBe('karar29');
    d = sahneGec(d, s.karar);
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
    for (const [k, v] of Object.entries(s.beklenen)) expect(M.bayrak(d, k)).toBe(v);
    const hepsi = metinler.join(' ');
    for (const m of s.metin) expect(hepsi).toContain(m);
  });
}

test('yirmi dokuzuncu bölümde boş paragraf yok', () => {
  for (const id of Object.keys(B.sahneler)) {
    const d = { ...M.yeniDurum(B), gorunum: { tur: 'sahne', id } };
    expect(M.sahneBilgisi(B, d).paragraflar.every((p) => typeof p === 'string' && p.length > 0)).toBe(true);
  }
});
