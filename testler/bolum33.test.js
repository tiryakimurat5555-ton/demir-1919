// Otuz üçüncü bölüm: Bursa, Nisan 1925. Tevfik kayıp.
import { expect, test } from 'bun:test';
import { BOLUM32 } from '../src/hikaye/bolum32';
import { BOLUM33 as B } from '../src/hikaye/bolum33';
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
    ad: 'zarf açık, Gülce birlikte, Gülce konuşur, bildi',
    ek: { gulceZarf: 'acti', gulceTevfik: 'yaz', kayikhaneVaris: 'hepimiz', nuriSonu: 'yakalandi', tevfikKarar: 'teslim', pusulaKime: 'arif', rahelKarar: 'birlikte', gulceGuven: 2 },
    gulce: 'Gel.', kayhan: 'Gülce konuşsun', tevfik: 'On Üç',
    beklenen: { gulceArama: 'birlikte', nuriSon33: 'imza', gulceSon33: 'bildi', vollmerCek: 'ifade' },
    delil: 'vollmer_ceki',
    metin: ['Kim kaybolduysa', 'pusulası', 'Beyrut', 'Kaptanın zarfını okudum', 'Sana soruyorum', 'hastanesinde bulan', 'salıverilmiş', 'Zürih, diye yazıyor', 'yaz ve yaşa demişti', 'Hepimiz geç kaldık', 'Albert Vollmer', 'tebeşirle', 'Ödeştik mi'],
  },
  {
    ad: 'zarf kapalı, Gülce kalır, Rıza delille, zarf avluda açılır',
    ek: { gulceZarf: 'sakla', gulceTevfik: 'affetme', kayikhaneVaris: 'gulce', nuriSonu: 'kacti', tevfikKarar: 'cift', rizaSon22: 'kirgin' },
    gulce: 'Kal.', kayhan: 'Rıza Bey konuşsun', tevfik: 'zarfı şimdi açsın',
    beklenen: { gulceArama: 'yalniz', nuriSon33: 'teslim', gulceSon33: 'acti', gulceZarf: 'acti33', vollmerCek: 'soru' },
    metin: ['boynunda bir iple', 'açılmamış zarfı', 'Moda\'dan beri', 'kaçmıştı', 'merdivenin başında', 'kaçacak kâğıdınız yok', 'affetmeyeceğini', 'yanlış adrese', 'cezaevinde', 'kendim için geldim'],
  },
  {
    ad: 'zarfı kayıkhanede aç, kavga, sus',
    ek: { gulceZarf: 'sakla', gulceTevfik: 'sessiz', rizaSon22: 'emekli', travma: 0 },
    gulce: 'Zarfı aç', kayhan: 'Üstüne yürü', tevfik: 'bir şey söylemesin',
    beklenen: { gulceArama: 'birlikte', gulceZarf: 'acti33', nuriSon33: 'kavga', gulceSon33: 'sus' },
    metin: ['balık tutuyor', 'Seddülbahir', 'sessizliği', 'Tren dokuzda', 'Nuri kaçtı'],
  },
];

for (const s of senaryolar) {
  test('otuz üçüncü bölüm: ' + s.ad, () => {
    const s32 = { ...M.yeniDurum(BOLUM32), gorunum: { tur: 'sahne', id: 'son' }, deliller: ['belge'], cikarimlar: ['orgut'], bayraklar: { bolumBitti: true, ...s.ek } };
    expect(M.sahneBilgisi(BOLUM32, s32).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum33');
    let d = M.bolumeGec(B, s32);
    const metinler = [];
    const topla = () => metinler.push([].concat(M.sahneBilgisi(B, d).paragraflar).join(' '));
    const soz = (k) => metinler.push([].concat(M.dugumBilgisi(B, M.konusmaBaslat(B, d, k)).soz).join(' '));
    topla();
    d = sahneGec(d);
    expect(d.mekan).toBe('kayikhane33');
    expect(M.mekanBilgisi(B, d).gecisler.length).toBe(0);
    soz('selim33'); soz('gulce33'); soz('riza33');
    d = konus(d, 'selim33', ['hangi han', 'Bulacağız']);
    d = konus(d, 'gulce33', [s.gulce]);
    d = git(d, 'bursa33');
    d = konus(d, 'rasim33', ['kim alıyor']);
    d = { ...d, gorunum: { tur: 'mekan' } };
    d = baglan(d, 'koza_defteri', 'selim_ifadesi');
    d = git(d, 'oda33');
    d = incele(d, 'masa33');
    d = baglan(d, 'mudanya_kaydi', 'selim_ifadesi');
    expect(d.gorunum.id).toBe('kayhan33');
    for (const sec of [s.kayhan, undefined, s.tevfik, undefined, undefined]) {
      topla();
      d = sahneGec(d, sec);
    }
    expect(d.gorunum.id).toBe('son');
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
    for (const [k, v] of Object.entries(s.beklenen)) expect(M.bayrak(d, k)).toBe(v);
    if (s.delil) expect(M.delilVar(d, s.delil)).toBe(true);
    const hepsi = metinler.join(' ');
    for (const m of s.metin) expect(hepsi).toContain(m);
  });
}

test('otuz üçüncü bölümde boş paragraf yok', () => {
  for (const id of Object.keys(B.sahneler)) {
    const d = { ...M.yeniDurum(B), gorunum: { tur: 'sahne', id } };
    expect(M.sahneBilgisi(B, d).paragraflar.every((p) => typeof p === 'string' && p.length > 0)).toBe(true);
  }
});
