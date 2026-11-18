// Kırkıncı bölüm: Buenos Aires, Mart 1926.
import { expect, test } from 'bun:test';
import { BOLUM39 } from '../src/hikaye/bolum39';
import { BOLUM40 as B } from '../src/hikaye/bolum40';
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
    ad: 'bölünme; Nazlı içeri girer; Rıza Bruno\'yu yakalar; Neslihan Ferrante\'yi duyar',
    ek: { ekip_riza: true, rizaEkvator: 'gorev', testaKarar: 'izle', neslihanNazli: 'anlat', zehraTelgraf: 'telgraf', neslihanBag: 2 },
    nazli: 'Git', telgraf: true, gece: 'Bölünelim', junin: 'Bruno. Üstüne', son: 'Bunu sen duymalıydın',
    beklenen: { nazliIceri: 'evet', geceBolunme: 'bolun', brunoSon40: 'yakalandi', ferranteSon40: 'neslihan', bolunmeCevap: 'onun', zehraIz: 'taburcu_iskele', travma: 1 },
    deliller: ['kizlar_yeri', 'despina_telgrafi', 'ferrante_itirafi'],
    metin: ['Bruno\'nun yüzü bende', 'Nazlı yanında', 'Stella del Plata\'nın kızları bu avludan', 'annem o hastaneden yürüyerek', 'Napoli, diyor. Polizia', 'Rıza Bey\'in bastonu', 'Yalnızdım abi', 'Zehra Hanım yaşıyordu', 'Buenos Aires cezaevinde'],
  },
  {
    ad: 'birlikte Ferrante; imza; Junín kaçırılır',
    ek: { ekip_riza: false, testaKarar: 'indir', neslihanNazli: 'anlat', cemilEkvator: 'gonder' },
    telgraf: true, gece: 'Birlikte San Isidro', ferrante: 'İmzala',
    beklenen: { geceBolunme: 'ferrante', ferranteSon40: 'imza', brunoSon40: 'gitti' },
    deliller: ['ferrante_itirafi'],
    metin: ['Dokuz kız Montevideo', 'Cemil Bey yanında', 'Evet, diyor yalnızca', 'Bu gece, diyor alçak sesle', 'Bruno ona baktı ve dedi ki: Tifo', 'Tomás kapıda', 'Rosario treninde'],
    yok: ['Nazlı yanında'],
  },
  {
    ad: 'birlikte Junín; Bruno konuşur; Ferrante ölür',
    ek: { ekip_riza: true, rizaEkvator: 'montevideo', testaKarar: 'ihbar', neslihanNazli: 'arif' },
    nazli: 'Hayır', gece: 'Birlikte Junín', junin: 'Konuş',
    beklenen: { nazliIceri: 'hayir', geceBolunme: 'junin', brunoSon40: 'konustu', ferranteSon40: 'olu', zehraIz: 'iskele' },
    deliller: [],
    metin: ['Bienvenidos', 'arka kapı', 'Selanik. İskele. Büyümüşsün', 'kız bitmez', 'Tek satır: 1913 baharı', 'Telgrafhaneye uğramadınız'],
  },
];

for (const s of senaryolar) {
  test('kırkıncı bölüm: ' + s.ad, () => {
    const s39 = { ...M.yeniDurum(BOLUM39), gorunum: { tur: 'sahne', id: 'son' }, deliller: ['belge'], cikarimlar: ['orgut'], bayraklar: { bolumBitti: true, ...s.ek } };
    expect(M.sahneBilgisi(BOLUM39, s39).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum40');
    let d = M.bolumeGec(B, s39);
    const metinler = [];
    const topla = () => metinler.push([].concat(M.sahneBilgisi(B, d).paragraflar).join(' '));
    const soz = () => metinler.push([].concat(M.dugumBilgisi(B, d).soz).join(' '));
    topla();
    d = sahneGec(d);
    expect(d.mekan).toBe('boca40');
    if (s.nazli) {
      d = M.konusmaBaslat(B, d, 'nazli40'); soz();
      const r = M.secenekSec(B, d, M.dugumBilgisi(B, d).secenekler.find((x) => x.etiket.startsWith(s.nazli)));
      d = r.durum; metinler.push(r.cevap.join(' '));
    } else expect(M.mekanBilgisi(B, d).kisiler).not.toContain('nazli40');
    if (s.telgraf) { d = incele(d, 'telgrafhane40'); topla(); d = sahneGec(d); }
    d = incele(d, 'junin'); topla(); d = sahneGec(d);
    expect(d.gorunum.tur).toBe('mekan');
    d = incele(d, 'persembe'); topla(); d = sahneGec(d, s.gece);
    for (let i = 0; i < 6 && d.gorunum.id !== 'son'; i++) {
      topla();
      const id = d.gorunum.id;
      const parca = id === 'junin40' ? s.junin : id === 'ferrante40' ? s.ferrante : id === 'ferrante40_anlat' ? s.son : undefined;
      d = sahneGec(d, parca);
    }
    expect(d.gorunum.id).toBe('son');
    for (const [k, v] of Object.entries(s.beklenen)) expect(k === 'travma' ? M.sayi(d, k) : M.bayrak(d, k)).toBe(v);
    for (const x of s.deliller) expect(M.delilVar(d, x)).toBe(true);
    const hepsi = metinler.join(' ');
    for (const m of s.metin) expect(hepsi).toContain(m);
    for (const m of s.yok || []) expect(hepsi).not.toContain(m);
  });
}

test('kırkıncı bölümde boş paragraf yok', () => {
  for (const id of Object.keys(B.sahneler)) {
    const d = { ...M.yeniDurum(B), gorunum: { tur: 'sahne', id } };
    expect(M.sahneBilgisi(B, d).paragraflar.every((p) => typeof p === 'string' && p.length > 0)).toBe(true);
  }
});
