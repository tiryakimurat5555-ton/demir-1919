// Otuz beşinci bölüm: İzmir, Eylül 1925. Üç gece gözetleme.
import { expect, test } from 'bun:test';
import { BOLUM34 } from '../src/hikaye/bolum34';
import { BOLUM35 as B } from '../src/hikaye/bolum35';
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
    ad: 'otel, han, kahve; senetler; Pendle tanık; Albrecht yakalanır',
    ek: { vollmerAjan: 'izmir', rahelKarar: 'birlikte', cemilRapor34: 'adli', hisseKarar: 'sat', rizaKorku: 'fark', pendleSonu: 'kacti_gazete' },
    yerler: [['otel_iz', 'otel35'], ['han_iz', 'han35'], ['kahve_iz', 'kahve35']], neslihan: 'Senetleri', pendle: 'son gemilerini',
    beklenen: { neslihanMiras: 'borc', pendleSon35: 'tanik', albrechtSonu: 'yakalandi' },
    metin: ['istasyonda görmüş', 'birlikte açmışlar', 'amirini götürdü', 'cep defteri', 'Kadir', 'Fikri değilsin', 'Rainer\'in hisse', 'Kadir\'e ödedim', 'Teminat', 'ifade yazacağım', 'Bankam sizi', 'senetsiz', 'tanımıyor'],
  },
  {
    ad: 'gemi, han, otel; para kendi; teslim; Albrecht kaçar',
    ek: { pendleSonu: 'mahkeme', rahelKarar: 'ayri', rizaKorku: 'sus' },
    yerler: [['gemi_iz', 'gemi35'], ['han_iz', 'han35'], ['otel_iz', 'otel35']], neslihan: 'Para senin', pendle: 'savcılığına',
    beklenen: { neslihanMiras: 'kendi', pendleSon35: 'teslim', albrechtSonu: 'kacti' },
    metin: ['kartpostal', 'mahkemeden döndü', 'Ambar boş', 'yemin etmişti', 'Pire yoluna', 'atkısı'],
  },
  {
    ad: 'kahve, gemi, otel; dokunma; bırak',
    ek: {},
    yerler: [['kahve_iz', 'kahve35'], ['gemi_iz', 'gemi35'], ['otel_iz', 'otel35']], neslihan: 'dokunma', pendle: 'bırak',
    beklenen: { neslihanMiras: 'dokunma', pendleSon35: 'birak', albrechtSonu: 'yakalandi' },
    metin: ['Viyana\'dan kalan', 'Bir şeye yarasın', 'doktorlar kış', 'mahkeme karar verecek'],
  },
];

for (const s of senaryolar) {
  test('otuz beşinci bölüm: ' + s.ad, () => {
    const s34 = { ...M.yeniDurum(BOLUM34), gorunum: { tur: 'sahne', id: 'son' }, deliller: ['belge'], cikarimlar: ['orgut'], bayraklar: { bolumBitti: true, ...s.ek } };
    expect(M.sahneBilgisi(BOLUM34, s34).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum35');
    let d = M.bolumeGec(B, s34);
    const metinler = [];
    const topla = () => metinler.push([].concat(M.sahneBilgisi(B, d).paragraflar).join(' '));
    topla();
    d = sahneGec(d);
    expect(d.mekan).toBe('kordon35');
    expect(M.mekanBilgisi(B, d).nesneler.length).toBe(4);
    s.yerler.forEach(([nesne, sahne], i) => {
      d = incele(d, nesne);
      expect(d.gorunum.id).toBe(sahne);
      topla();
      d = sahneGec(d);
      if (i === 1) {
        metinler.push([].concat(M.dugumBilgisi(B, M.konusmaBaslat(B, d, 'neslihan35')).soz).join(' '));
        d = konus(d, 'neslihan35', [s.neslihan]);
        if (M.delilVar(d, 'albrecht_defteri') && M.delilVar(d, 'rehin_senetleri')) d = baglan({ ...d, gorunum: { tur: 'mekan' } }, 'albrecht_defteri', 'rehin_senetleri');
      }
      if (i === 0 && s.neslihan === 'Senetleri') expect(M.dugumBilgisi(B, M.konusmaBaslat(B, d, 'neslihan35')).secenekler.map((x) => x.etiket).join('|')).not.toContain('Senetleri');
    });
    expect(d.gorunum.id).toBe('arethusa35');
    if (s.ek.hisseKarar === 'sat') expect(M.cikarimVar(d, 'imtiyaz')).toBe(true);
    for (const sec of [s.pendle, undefined, undefined]) { topla(); d = sahneGec(d, sec); }
    expect(d.gorunum.id).toBe('son');
    for (const [k, v] of Object.entries(s.beklenen)) expect(M.bayrak(d, k)).toBe(v);
    const hepsi = metinler.join(' ');
    for (const m of s.metin) expect(hepsi).toContain(m);
  });
}

test('çıkarım varken teminat satırı; Pendle tanıklığı için gözlem ya da çıkarım gerekir', () => {
  const d = { ...M.yeniDurum(B), gorunum: { tur: 'sahne', id: 'arethusa35' }, cikarimlar: ['imtiyaz'] };
  expect(M.sahneBilgisi(B, d).paragraflar.join(' ')).toContain('Teminat');
  const bos = { ...M.yeniDurum(B), gorunum: { tur: 'sahne', id: 'arethusa35' } };
  expect(M.sahneBilgisi(B, bos).secenekler.length).toBe(2);
});

test('otuz beşinci bölümde boş paragraf yok', () => {
  for (const id of Object.keys(B.sahneler)) {
    const d = { ...M.yeniDurum(B), gorunum: { tur: 'sahne', id } };
    expect(M.sahneBilgisi(B, d).paragraflar.every((p) => typeof p === 'string' && p.length > 0)).toBe(true);
  }
});
