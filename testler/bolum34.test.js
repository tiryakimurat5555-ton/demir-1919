// Otuz dördüncü bölüm: Ankara, Haziran 1925. Tebeşirli kinin.
import { expect, test } from 'bun:test';
import { BOLUM33 } from '../src/hikaye/bolum33';
import { BOLUM34 as B } from '../src/hikaye/bolum34';
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
    ad: 'Eleni burada, tart+tat sonra erit, itiraf, adlarla, İstanbul',
    ek: { cemilEleni: 'birlikte', nerminImza: 'ad', vollmerCek: 'ifade', sabitSonu: 'teslim', cemilRapor: 'sitma', cemilDefter: 'durust' },
    deney: ['Tart', 'Başka', 'Tadına', 'Başka', 'Suda'], nermin: 'İstanbul', sabit: 'Açığı kim', rapor: 'Adlarla',
    beklenen: { sabitSon34: 'itiraf', cemilRapor34: 'adli', nerminKorku: 'istanbul', vollmerAjan: 'izmir' },
    metin: ['Türkçesi Cemil', 'jandarma geldi', 'Nuri Bey', 'Yalan suya', 'Yarım gram', 'kibar', 'sıtma diye yazmıştım', 'Moda\'da Fikri', 'bir buçuğunu', 'Bay Albrecht', 'İzmir\'de de böyle', 'amiri İstanbul', 'Kayıkhane bir süre', 'İzmir trenine'],
  },
  {
    ad: 'mektup, doğrudan erit, mahkeme, adsız, kal',
    ek: { cemilEleni: 'mektup', nerminImza: 'takma', sabitSonu: 'konustu', cemilRapor: 'dogru' },
    deney: ['Suda'], nermin: 'Kal', sabit: 'Mahkemeye', rapor: 'Adsız',
    beklenen: { sabitSon34: 'mahkeme', cemilRapor34: 'adsiz', nerminKorku: 'kal', vollmerAjan: 'bilinmiyor' },
    metin: ['İskenderiye pullu', 'mürekkep kokuyordu', 'Kostas için doğruyu', 'bir hayat verdiniz', 'bir adım geride', 'bir şeyi de kurtardım', 'Kalıyorum'],
  },
  {
    ad: 'veda, Cemil karar verir, gazete',
    ek: { cemilEleni: 'veda', nerminImza: 'ad', cemilDefter: 'sessiz' },
    deney: ['Tadına', 'Başka', 'Suda'], nermin: 'Sonra', sabit: 'Cemil Bey karar', rapor: 'Nermin bassın',
    beklenen: { sabitSon34: 'cemil', cemilRapor34: 'gazete' },
    metin: ['İyi bir mezar', 'sıtmalı çocukların başında', 'Sıtmalıya Tebeşir', 'iki kişi oluyor'],
  },
];

for (const s of senaryolar) {
  test('otuz dördüncü bölüm: ' + s.ad, () => {
    const s33 = { ...M.yeniDurum(BOLUM33), gorunum: { tur: 'sahne', id: 'son' }, deliller: ['belge'], cikarimlar: ['orgut'], bayraklar: { bolumBitti: true, ...s.ek } };
    expect(M.sahneBilgisi(BOLUM33, s33).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum34');
    let d = M.bolumeGec(B, s33);
    const metinler = [];
    const topla = () => metinler.push([].concat(M.sahneBilgisi(B, d).paragraflar).join(' '));
    const soz = (k) => metinler.push([].concat(M.dugumBilgisi(B, M.konusmaBaslat(B, d, k)).soz).join(' '));
    topla();
    d = sahneGec(d);
    expect(d.mekan).toBe('hastane34');
    soz('cemil34');
    if (s.ek.cemilEleni === 'birlikte') expect(M.mekanBilgisi(B, d).kisiler).toContain('eleni34');
    else expect(M.mekanBilgisi(B, d).kisiler).not.toContain('eleni34');
    d = incele(d, 'dolap34');
    expect(d.gorunum.id).toBe('deney34');
    for (const p of s.deney) { topla(); d = sahneGec(d, p); }
    topla();
    d = sahneGec(d);
    expect(M.delilVar(d, 'sahte_kinin')).toBe(true);
    d = git(d, 'matbaa34');
    d = konus(d, 'nermin34', ['Arşive']);
    soz('nermin34');
    d = konus(d, 'nermin34', [s.nermin]);
    d = { ...d, gorunum: { tur: 'mekan' } };
    d = baglan(d, 'sahte_kinin', 'ihale_kaydi');
    d = git(d, 'hastane34');
    d = git(d, 'istasyon34');
    d = incele(d, 'sevk34');
    d = baglan(d, 'ihale_kaydi', 'sevk_belgesi');
    expect(d.gorunum.id).toBe('sabit34');
    for (const sec of [s.sabit, undefined, s.rapor, undefined]) { topla(); d = sahneGec(d, sec); }
    expect(d.gorunum.id).toBe('son');
    for (const [k, v] of Object.entries(s.beklenen)) expect(M.bayrak(d, k)).toBe(v);
    const hepsi = metinler.join(' ');
    for (const m of s.metin) expect(hepsi).toContain(m);
  });
}

test('otuz dördüncü bölümde boş paragraf yok', () => {
  for (const id of Object.keys(B.sahneler)) {
    const d = { ...M.yeniDurum(B), gorunum: { tur: 'sahne', id } };
    expect(M.sahneBilgisi(B, d).paragraflar.every((p) => typeof p === 'string' && p.length > 0)).toBe(true);
  }
});
