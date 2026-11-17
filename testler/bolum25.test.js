// Yirmi beşinci bölüm: önizleme (Cemil), itiraz kartlı mezat, defterin sonu.
import { expect, test } from 'bun:test';
import { BOLUM24 } from '../src/hikaye/bolum24';
import { BOLUM25 as B, ITIRAZ_ESIGI, KARTLAR } from '../src/hikaye/bolum25';
import * as M from '../src/oyun/motor';

function sahneGec(d, parca) {
  expect(d.gorunum.tur).toBe('sahne');
  const s = M.sahneBilgisi(B, d);
  const sec = parca ? s.secenekler.find((x) => x.etiket.includes(parca)) : s.secenekler[0];
  if (!sec) throw new Error('sahne ' + d.gorunum.id + ': seçenek yok: ' + parca + ' / var: ' + s.secenekler.map((x) => x.etiket).join(' | '));
  return M.sahneSec(B, d, sec).durum;
}

const incele = (d, id) => {
  expect(M.mekanBilgisi(B, d).nesneler.map((o) => o.id)).toContain(id);
  return M.incele(B, d, id).durum;
};

const senaryolar = [
  {
    ad: 'baba mektubu, damga, Klara → durdu, arşiv',
    ek: { mektupKarar: 'baba', vollmerSonu: 'damga', klaraYardim: true, cemilRapor: 'dogru', neslihanAd: 'baba', cocukKarar: 'yanina' },
    kartlar: ['kart_mektup', 'kart_damga', 'kart_klara'], cemil: 'Bilmemek', defter: 'arşive', itiraz: 5, mezat: 'durdu', defterSonu: 'arsiv',
  },
  {
    ad: 'Gubler + kurye + negatif → tam eşik, yak',
    ek: { gublerSonu: 'teslim', vollmerSonu: 'kurye', defter14: 'kopya', rizaSon22: 'devir', cemilRapor: 'sitma' },
    kartlar: ['kart_gubler', 'kart_kurye', 'kart_negatif'], cemil: 'Emir satın', defter: 'Yakılsın', itiraz: 3, mezat: 'durdu', defterSonu: 'yak',
  },
  {
    ad: 'tek kart ve bekleme → satıldı',
    ek: { mektupKarar: 'sakla', vollmerSonu: 'imza', rizaSon22: 'emekli' },
    kartlar: ['kart_mektup', 'bekle', 'bekle'], cemil: 'Bir şey söyleme', defter: 'Devam', itiraz: 1, mezat: 'satildi', defterSonu: 'satildi',
  },
];

for (const s of senaryolar) {
  test('yirmi beşinci bölüm: ' + s.ad, () => {
    const s24 = { ...M.yeniDurum(BOLUM24), gorunum: { tur: 'sahne', id: 'son' }, deliller: ['belge'], cikarimlar: ['orgut'], bayraklar: { bolumBitti: true, ...s.ek } };
    expect(M.sahneBilgisi(BOLUM24, s24).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum25');
    let d = M.bolumeGec(B, s24);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('onizleme');
    d = sahneGec(d, s.cemil);
    d = sahneGec(d);
    expect(d.mekan).toBe('mezat25');
    expect(M.bayrak(d, 'sayfa47')).toBe(true);
    const mevcut = M.mekanBilgisi(B, d).nesneler.map((o) => o.id);
    for (const k of Object.keys(KARTLAR)) expect(mevcut.includes('kart_' + k)).toBe(KARTLAR[k].var(d));
    for (const k of s.kartlar) {
      d = incele(d, k);
      expect(d.gorunum.id).toBe('kart_sahne');
      d = sahneGec(d);
    }
    expect(d.gorunum.id).toBe('tokmak25');
    expect(M.sayi(d, 'itiraz')).toBe(s.itiraz);
    d = sahneGec(d);
    expect(M.bayrak(d, 'mezatSonu')).toBe(s.mezat);
    expect(d.gorunum.id).toBe('mahkeme25');
    d = sahneGec(d, s.defter);
    expect(M.bayrak(d, 'defterSonu')).toBe(s.defterSonu);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
    expect(ITIRAZ_ESIGI).toBe(3);
  });
}
