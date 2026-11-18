// Otuz ikinci bölüm: İstanbul, Eylül 1924. Süleyman Kaptan'ın son gecesi.
import { expect, test } from 'bun:test';
import { BOLUM31 } from '../src/hikaye/bolum31';
import { BOLUM32 as B } from '../src/hikaye/bolum32';
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
    ad: 'Kemal kaldı; Neslihan anlatır, kaptan için, pusula Kemal\'e, ninni, kayıkhane Kemal\'in, zarf açılır',
    ek: { kemalKalir: true, neslihanTanik: 'evet', neslihanAd: 'baba', arifNeden: 'korktum', kuleSecim: 'kalip', rahelKarar: 'birlikte', gulceTevfik: 'yaz', cemilEleni: 'birlikte', mektupKarar: 'baba', suleymanUmut: 'soz', suleymanBag: 1 },
    once: 'suleyman',
    baba: 'Neslihan anlatsın', cevap: 'Senin için', pusula: 'ikiniz de kurtuldunuz', son: 'ninnisini', varis: 'Burada kayık', zarf: 'Aç',
    beklenen: { babaBildi: 'neslihan', arifCevap: 'kaptan', pusulaKime: 'kemal', suleymanSon: 'ninni', kayikhaneVaris: 'kemal', gulceZarf: 'acti' },
    metin: ['Kemal tezgâhta', 'Beyrut', 'Gazeteden öğrendim', 'tutulmak için', 'İsmail kızı', 'Tanımamaktan korktun', 'Biri geri geldi', 'Delorme\'u ittiği', 'Gömleğimle sarmıştım', 'Dandini', 'Arayan', 'Tevfik\'e yaz ve yaşa', 'Selim', 'oğlumu getirdin', 'Eleni ekimde'],
  },
  {
    ad: 'Kemal yok; Arif anlatır, onlar için, pusula Arif\'e, anlat, Gülce, sakla',
    ek: { neslihanTanik: 'hayir', arifNeden: 'inandim', kuleSecim: 'atil', gulceTevfik: 'affetme', rizaSon22: 'kirgin', gulceGuven: 2 },
    once: 'baba',
    baba: 'Sen anlat', cevap: 'Onlar için', pusula: 'Bana kaptan', son: 'ilk geceyi', varis: 'Gülce\'nin', zarf: 'Sakla',
    beklenen: { babaBildi: 'arif', arifCevap: 'onlar', pusulaKime: 'arif', suleymanSon: 'anlat', kayikhaneVaris: 'gulce', gulceZarf: 'sakla' },
    metin: ['Kemal Pire\'de', 'yastığının altına', 'o gün yağmur yoktu', 'dediler, inandım', 'Arayan da bulunur', 'tetiği çektiği', 'Hep bulur', 'ıhlamurdu', 'içeri girmiyor', 'affetmedim', 'Biliyorum aslında', 'Bir gün, diyor'],
  },
  {
    ad: 'el, kendim için, denize, sus, hepimiz',
    ek: { arifNeden: 'sucluluk' },
    once: 'suleyman',
    baba: 'Bu gece değil', cevap: 'Kendim için', pusula: 'Denize', son: 'Kimse konuşmasın', varis: 'hepimizin', zarf: 'Aç',
    beklenen: { babaBildi: 'el', arifCevap: 'kendim', pusulaKime: 'deniz', suleymanSon: 'sus', kayikhaneVaris: 'hepimiz' },
    metin: ['onları bıraktığını', 'en doğrusu', 'Herkes eve döndü', 'Belki bir ad', 'kalayla yazılmış'],
  },
];

for (const s of senaryolar) {
  test('otuz ikinci bölüm: ' + s.ad, () => {
    const s31 = { ...M.yeniDurum(BOLUM31), gorunum: { tur: 'sahne', id: 'son' }, deliller: ['belge', 'zarf', 'rahel_listesi'], cikarimlar: ['orgut'], bayraklar: { bolumBitti: true, ...s.ek } };
    expect(M.sahneBilgisi(BOLUM31, s31).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum32');
    let d = M.bolumeGec(B, s31);
    const metinler = [];
    const topla = () => metinler.push([].concat(M.sahneBilgisi(B, d).paragraflar).join(' '));
    topla();
    d = sahneGec(d);
    expect(d.mekan).toBe('kayikhane32');
    metinler.push(M.dugumBilgisi(B, M.konusmaBaslat(B, d, 'neslihan32')).soz);
    metinler.push(M.dugumBilgisi(B, M.konusmaBaslat(B, d, 'cemil32')).soz);
    metinler.push(M.dugumBilgisi(B, M.konusmaBaslat(B, d, 'suleyman32')).soz);
    if (s.ek.kemalKalir) expect(M.mekanBilgisi(B, d).kisiler).toContain('kemal32');
    else expect(M.mekanBilgisi(B, d).kisiler).not.toContain('kemal32');
    const babaYolu = () => {
      d = git(d, 'han32');
      d = incele(d, 'oda32');
      expect(d.gorunum.id).toBe('baba32');
      topla();
      d = sahneGec(d, s.baba);
      topla();
      d = sahneGec(d);
    };
    if (s.once === 'baba') {
      babaYolu();
      expect(d.gorunum.tur).toBe('mekan');
      d = konus(d, 'suleyman32', ['Bu gece']);
    } else {
      d = konus(d, 'suleyman32', ['Bu gece']);
      expect(d.gorunum.tur).toBe('mekan');
      babaYolu();
    }
    expect(d.gorunum.id).toBe('kayik32');
    for (const sec of [s.cevap, s.pusula, s.son, undefined, s.varis, s.zarf]) {
      topla();
      d = sahneGec(d, sec);
    }
    topla();
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
    for (const [k, v] of Object.entries(s.beklenen)) expect(M.bayrak(d, k)).toBe(v);
    const hepsi = metinler.join(' ');
    for (const m of s.metin) expect(hepsi).toContain(m);
  });
}

test('otuz ikinci bölümde boş paragraf yok', () => {
  for (const id of Object.keys(B.sahneler)) {
    const d = { ...M.yeniDurum(B), gorunum: { tur: 'sahne', id } };
    expect(M.sahneBilgisi(B, d).paragraflar.every((p) => typeof p === 'string' && p.length > 0)).toBe(true);
  }
});
