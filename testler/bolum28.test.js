// Yirmi sekizinci bölüm: Napoli, Nisan 1924. Ferrante, gece araması, Bruno.
import { expect, test } from 'bun:test';
import { BOLUM27 } from '../src/hikaye/bolum27';
import { BOLUM28 as B } from '../src/hikaye/bolum28';
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
    ad: 'Kemal ile, tam itiraf: doğrudan Dante, pencere, Cenevre',
    ek: { kemalKalir: true, fikriItiraf: 'tam', neslihanYol: 'yalniz', fikriKarar: 'kenan', ferranteSonu: 'kacti', rizaHikaye: true, klaraYardim: true, yabanciGeldi: true },
    riza: 'sopayı dizinde', kitaplar: [], bruno: 'Pencere', karar: 'Cenevre',
    beklenen: { rizaKorku: 'fark', brunoSonu: 'kemal', ferranteKarar: 'cenevre', aramaSonu: 'dante' },
    metin: ['Marsilya\'dan', 'babamı tanımayı', 'Pire\'de aynı gemideydik', 'Kemeraltı\'nda bana anlaştık', 'Moda\'daki çakıl', 'Kayıkla peşinden', 'Dedemin örgütünün', 'Biliyorum'],
    alarm: 0,
  },
  {
    ad: 'kısmi itiraf, iki yanlış kitap, kavga, polis',
    ek: { fikriItiraf: 'kismi', neslihanYol: 'birlikte', fikriKarar: 'savci', ferranteSonu: 'tutuklu' },
    riza: 'koltukta oturursan', kitaplar: ['Petrarca', 'Boccaccio'], bruno: 'Üstüne yürü', karar: 'İtalyan polisine',
    beklenen: { rizaKorku: 'yanında', brunoSonu: 'kavga', ferranteKarar: 'polis', travma: 1 },
    metin: ['gerçekten önde', 'Kadıköy savcısına', 'Rıza Bey\'in Fransızcası', 'İki yıl yattım', 'Artık seçecek zaman yok', 'Bir hafta, diyor', 'Avucunu'.toLowerCase()],
    alarm: 2,
  },
  {
    ad: 'bir yanlış kitap, Rıza\'nın sesi, bırak',
    ek: { fikriItiraf: 'kismi', neslihanYol: 'bekle', fikriKarar: 'birak' },
    riza: 'Kahveni iç', kitaplar: ['Petrarca'], bruno: 'Rıza Bey\'in sesini', karar: 'Git Ferrante',
    beklenen: { rizaKorku: 'sus', brunoSonu: 'riza', ferranteKarar: 'birak' },
    metin: ['yastığının altına', 'perdeleri kapalı', 'Henüz', 'polizia', 'fazla cömertsin', 'Melek on iki yıldır'],
    alarm: 1,
  },
];

for (const s of senaryolar) {
  test('yirmi sekizinci bölüm: ' + s.ad, () => {
    const s27 = { ...M.yeniDurum(BOLUM27), gorunum: { tur: 'sahne', id: 'son' }, deliller: ['belge', 'zarf', 'fikri_itirafi', 'napoli_zarfi'], cikarimlar: ['orgut', 'satan'], bayraklar: { bolumBitti: true, ...s.ek } };
    expect(M.sahneBilgisi(BOLUM27, s27).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum28');
    let d = M.bolumeGec(B, s27);
    const metinler = [];
    const topla = (t) => metinler.push([].concat(t).join(' '));
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d);
    expect(d.mekan).toBe('liman28');
    expect(M.mekanBilgisi(B, d).kisiler.includes('neslihan28')).toBe(s.ek.neslihanYol !== 'yalniz');

    d = konus(d, 'riza28', ['Dinliyorum']);
    expect(d.gorunum.id).toBe('riza_korku');
    d = sahneGec(d, s.riza);
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d);

    d = M.konusmaBaslat(B, d, 'gennaro');
    topla(M.dugumBilgisi(B, d).soz);
    d = M.secenekSec(B, d, M.dugumBilgisi(B, d).secenekler[0]).durum;
    d = { ...d, gorunum: { tur: 'mekan' } };
    d = git(d, 'via_marina');
    expect(M.mekanBilgisi(B, d).nesneler.map((o) => o.id)).not.toContain('arka_merdiven');
    d = incele(d, 'ferrante_kapisi');
    expect(d.gorunum.id).toBe('pazarlik28');
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d);
    expect(d.mekan).toBe('via_marina');
    d = baglan(d, 'gennaro_ifadesi', 'ferrante_teklifi');
    d = incele(d, 'arka_merdiven');
    expect(d.gorunum.id).toBe('gece28');
    expect(M.sahneBilgisi(B, d).secenekler.length).toBe(s.ek.fikriItiraf === 'tam' ? 1 : 3);
    for (const k of s.kitaplar) {
      d = sahneGec(d, k);
      topla(M.sahneBilgisi(B, d).paragraflar);
      d = sahneGec(d);
    }
    expect(M.sayi(d, 'alarm28')).toBe(s.alarm);
    d = sahneGec(d, 'Dante');
    expect(d.gorunum.id).toBe('gece28_bulundu');
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('bruno28');
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d, s.bruno);
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('ferrante28');
    d = sahneGec(d, s.karar);
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
    for (const [k, v] of Object.entries(s.beklenen)) expect(M.bayrak(d, k)).toBe(v);
    const hepsi = metinler.join(' ');
    for (const m of s.metin) expect(hepsi.toLowerCase()).toContain(m.toLowerCase());
  });
}

test('yirmi sekizinci bölümde boş paragraf yok', () => {
  for (const id of Object.keys(B.sahneler)) {
    const d = { ...M.yeniDurum(B), gorunum: { tur: 'sahne', id } };
    expect(M.sahneBilgisi(B, d).paragraflar.every((p) => typeof p === 'string' && p.length > 0)).toBe(true);
  }
});
