// Otuz sekizinci bölüm: Zürih, Ocak 1926. Altıncı kitabın sonu.
import { expect, test } from 'bun:test';
import { BOLUM37 } from '../src/hikaye/bolum37';
import { BOLUM38 as B } from '../src/hikaye/bolum38';
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
import { AGIRLIK_ESIGI, agirlik38 } from '../src/hikaye/bolum38';

const senaryolar = [
  {
    ad: 'güçlü terazi; Klara konuşur; defteri kurtar; düşürüldü',
    ek: { vollmerIhale: 'red', nuriSon33: 'imza', pendleSon35: 'tanik', klaraYardim: true, rizaMezar: 'sus', babaYuz: 'yaninda', defterSonu: 'satildi', kurulSonu30: 'ad', neslihanMiras: 'borc' },
    konusmaci: 'Sen konuş Klara', kasa: 'ateşten çek',
    beklenen: { konusmaci38: 'klara', vollmerSon38: 'dusuruldu', kasa38: 'kurtar', buenosAires: true },
    delil: 'vollmer_defteri',
    metin: ['istasyonda bekliyor', 'bastonsuz', 'Bir bankacıya bir yüz göster', 'A. V.', 'Defterini kaybetmez', 'Albrecht\'in temsil ettiği', 'Seddülbahir', 'savcılığından', 'Bruno', 'Ferrante de orada', 'Altıncı kitabın sonu', 'üç yüz bahçeyi'],
  },
  {
    ad: 'zayıf terazi; Neslihan konuşur; sayfa; kaldı',
    ek: { neslihanTanik: 'evet', babaYuz: 'savun', defterSonu: 'arsiv', rizaMezar: 'dua' },
    konusmaci: 'Neslihan konuşsun', kasa: 'Neslihan konuşsun. Sayfayı',
    beklenen: { konusmaci38: 'neslihan', vollmerSon38: 'kaldi', kasa38: 'sayfa' },
    delil: 'makbuz_sayfasi',
    metin: ['korunmak istemiyordu', 'iskeleden satıldım', 'yetmiyor', 'Federal Arşiv', 'Hâlâ yaşıyor', 'başkan koltuğunda', 'izini kaybetmiştiniz', 'uyuyorum'],
  },
  {
    ad: 'Rıza konuşur; Klara yakın değil, bırak seçeneği yok',
    ek: { rizaMezar: 'tas' },
    konusmaci: 'Rıza Bey konuşsun', kasa: 'ateşten çek',
    beklenen: { konusmaci38: 'riza', kasa38: 'kurtar' },
    metin: ['Kendimi tanıtmadığım', 'Delille', 'taşçının makbuzu'],
  },
];

for (const s of senaryolar) {
  test('otuz sekizinci bölüm: ' + s.ad, () => {
    const s37 = { ...M.yeniDurum(BOLUM37), gorunum: { tur: 'sahne', id: 'son' }, deliller: ['belge'], cikarimlar: ['orgut'], bayraklar: { bolumBitti: true, ...s.ek } };
    expect(M.sahneBilgisi(BOLUM37, s37).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum38');
    let d = M.bolumeGec(B, s37);
    const metinler = [];
    const topla = () => metinler.push([].concat(M.sahneBilgisi(B, d).paragraflar).join(' '));
    const soz = (k) => metinler.push([].concat(M.dugumBilgisi(B, M.konusmaBaslat(B, d, k)).soz).join(' '));
    topla();
    d = sahneGec(d);
    expect(d.mekan).toBe('zurih38');
    expect(M.mekanBilgisi(B, d).nesneler.length).toBe(0);
    soz('klara38'); soz('neslihan38'); soz('riza38');
    d = konus(d, 'klara38', [s.konusmaci]);
    d = incele(d, 'banka38');
    expect(d.gorunum.id).toBe('genel38');
    if (s.beklenen.vollmerSon38 === 'dusuruldu') expect(agirlik38(d)).toBeGreaterThanOrEqual(AGIRLIK_ESIGI);
    topla(); d = sahneGec(d);
    topla(); d = sahneGec(d);
    expect(d.gorunum.id).toBe('kasa38');
    const kasaSec = M.sahneBilgisi(B, d).secenekler.map((x) => x.etiket).join('|');
    if (!s.ek.klaraYardim) expect(kasaSec).not.toContain('Bırak yaksın');
    topla(); d = sahneGec(d, s.kasa);
    topla(); d = sahneGec(d);
    topla(); d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    for (const [k, v] of Object.entries(s.beklenen)) expect(M.bayrak(d, k)).toBe(v);
    if (s.delil) expect(M.delilVar(d, s.delil)).toBe(true);
    const hepsi = metinler.join(' ');
    for (const m of s.metin) expect(hepsi).toContain(m);
  });
}

test('otuz sekizinci bölümde boş paragraf yok', () => {
  for (const id of Object.keys(B.sahneler)) {
    const d = { ...M.yeniDurum(B), gorunum: { tur: 'sahne', id } };
    expect(M.sahneBilgisi(B, d).paragraflar.every((p) => typeof p === 'string' && p.length > 0)).toBe(true);
  }
});
