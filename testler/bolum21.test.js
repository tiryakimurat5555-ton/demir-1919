// Yirmi birinci bölüm: İzmir, Eylül 1922. Kemal, yangın, Fenwick, Pendle; önceki ipliklerin karşılıkları.
import { expect, test } from 'bun:test';
import { BOLUM20 } from '../src/hikaye/bolum20';
import { BOLUM21 as B } from '../src/hikaye/bolum21';
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
    ad: 'bütün iplikler sıcak: söz, Neslihan\'ın sesi, Rıza delille, Kemal yolcu, gazete',
    ek: { aramaSozu: true, kemalSoylenti: true, kardesGecesi: 'durust', travma: 2, rizaHikaye: true, nerminYemin: 'gazete', nerminCevdet: true, cemilRapor: 'dogru', cemilBag: 1, suleymanBag: 1 },
    kopru: 'Senin sözündü', cocuk: 'Ailesini', yangin: 'Neslihan', sorgu: 'bekle', kemal: 'yirmi beş yıl', pendle: 'Sözümüz gibi: gazeteye',
    beklenen: { suleymanUmut: 'soz', cocukKarar: 'aile', yanginAni: 'neslihan', rizaSorgu: 'delil', kemalSonu: 'yolcu', pendleSonu: 'gazete' }, travma: 1, metin: 'atkı',
  },
  {
    ad: 'soğuk yol: sessiz, yalnız, kalabalık, Kemal tereddüt, Pendle kaçar',
    ek: { travma: 3 },
    kopru: 'Bir şey söyleme', cocuk: 'Yanımızda', yangin: 'Dişlerini', sorgu: 'Kalabalığa', kemal: 'Baba ile oğulu', pendle: 'Bir hâkimin',
    beklenen: { suleymanUmut: 'sessiz', cocukKarar: 'yanina', yanginAni: 'yalniz', rizaSorgu: 'kalabalik', kemalSonu: 'tereddut', pendleSonu: 'kacti_mahkeme' }, travma: 5, metin: 'motorla karanlığa',
  },
  {
    ad: 'orta yol: anı yok, Rıza\'ya bırakma, görev, mahkeme sözü',
    ek: { travma: 0, nerminYemin: 'mahkeme', cemilRapor: 'sitma', cemilYuk: true },
    kopru: 'Belki değildir', cocuk: 'Ailesini', yangin: null, sorgu: 'bana bırak', kemal: 'Kızılhaç', pendle: 'Sözümüz gibi: bir hâkimin',
    beklenen: { suleymanUmut: 'bak', cocukKarar: 'aile', yanginAni: undefined, rizaSorgu: 'sen', kemalSonu: 'yolcu', pendleSonu: 'mahkeme' }, travma: 0, metin: 'İngiliz tebaası',
  },
];

for (const s of senaryolar) {
  test('yirmi birinci bölüm: ' + s.ad, () => {
    const s20 = { ...M.yeniDurum(BOLUM20), gorunum: { tur: 'sahne', id: 'son' }, deliller: ['belge'], cikarimlar: ['orgut'], bayraklar: { bolumBitti: true, ...s.ek } };
    expect(M.sahneBilgisi(BOLUM20, s20).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum21');
    let d = M.bolumeGec(B, s20);
    expect(d.gorunum.id).toBe('acilis');
    d = sahneGec(d);
    expect(d.mekan).toBe('kordon21');

    d = incele(d, 'durbun');
    expect(d.gorunum.id).toBe('kopru');
    expect(M.sahneBilgisi(B, d).secenekler.length).toBe(s.ek.aramaSozu ? 3 : 2);
    d = sahneGec(d, s.kopru);
    d = sahneGec(d);
    expect(d.gorunum.tur).toBe('mekan');
    expect(M.delilVar(d, 'suvari')).toBe(true);
    expect(M.mekanBilgisi(B, d).nesneler.map((o) => o.id)).not.toContain('durbun');

    d = konus(d, 'cocuk21', ['Neslihan']);
    expect(d.gorunum.id).toBe('cocuk');
    d = sahneGec(d, s.cocuk);
    d = sahneGec(d);
    expect(M.mekanBilgisi(B, d).kisiler).not.toContain('cocuk21');

    d = incele(d, 'acente');
    d = konus(d, 'nermin', ['Yaz']);
    d = git(d, 'klinik21');
    d = konus(d, 'cemil', ['Kolay']);
    d = konus(d, 'eleni', ['Sandıklara']);
    d = baglan(d, 'ajan_defteri', 'eleni_tanikligi');
    expect(d.gorunum.id).toBe('yangin');
    if (s.yangin) {
      d = sahneGec(d, s.yangin);
      expect(d.gorunum.id).toBe('yangin_ses');
      d = sahneGec(d);
    } else {
      expect(M.sahneBilgisi(B, d).secenekler.length).toBe(1);
      d = sahneGec(d);
    }
    expect(d.gorunum.id).toBe('sorgu21');
    d = sahneGec(d, s.sorgu);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('kemal');
    d = sahneGec(d, s.kemal);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('pendle21');
    const pm = M.sahneBilgisi(B, d);
    expect(pm.secenekler.length).toBe(2);
    d = sahneGec(d, s.pendle);
    expect(d.gorunum.id).toBe('kalkis');
    const metin = M.sahneBilgisi(B, d).paragraflar.join(' ') + ' ' + pm.paragraflar.join(' ');
    expect(metin).toContain(s.metin);
    for (const [k, v] of Object.entries(s.beklenen)) expect(M.bayrak(d, k)).toBe(v);
    expect(M.sayi(d, 'travma')).toBe(s.travma);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
  });
}
