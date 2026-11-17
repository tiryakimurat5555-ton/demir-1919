// Yirmi dördüncü bölüm: kulakla takip, Gubler, Rivière'in mektubu.
import { expect, test } from 'bun:test';
import { BOLUM23 } from '../src/hikaye/bolum23';
import { BOLUM24 as B, KAYIP_SINIRI } from '../src/hikaye/bolum24';
import * as M from '../src/oyun/motor';

function sahneGec(d, parca) {
  expect(d.gorunum.tur).toBe('sahne');
  const s = M.sahneBilgisi(B, d);
  const sec = parca ? s.secenekler.find((x) => x.etiket.includes(parca)) : s.secenekler[0];
  if (!sec) throw new Error('sahne ' + d.gorunum.id + ': seçenek yok: ' + parca + ' / var: ' + s.secenekler.map((x) => x.etiket).join(' | '));
  return M.sahneSec(B, d, sec).durum;
}

const senaryolar = [
  {
    ad: 'kusursuz takip, nefes say, teslim, babaya ver, babanın yanında yürü',
    ek: { cocukKarar: 'yanina', travma: 2, ilkNefes: 'say', babaItiraf: true, neslihanAd: 'baba', rizaSon22: 'devir' },
    yonler: ['Yokuş', 'Köpeğin', null, 'Kamondo'], davul: 'Nefesini', takip: 'yakalandi', gubler: 'Gubler\'i yeni', mektup: 'Babamıza', baba: 'koluna',
    beklenen: { takipSonu: 'yakalandi', gublerSonu: 'teslim', mektupKarar: 'baba', babaYaninda: true, kayip: undefined },
  },
  {
    ad: 'iki yanlış, Kemal kayığıyla durdurur, haberci, sakla',
    ek: { kemalKalir: true, travma: 0, rizaSon22: 'emekli' },
    yonler: ['Sağa', 'Güvercin', null, 'Kamondo'], davul: 'Devam', takip: 'kemal', gubler: 'Mektubu al', mektup: 'Sakla', baba: null,
    beklenen: { takipSonu: 'kemal', gublerSonu: 'haberci', mektupKarar: 'sakla', kayip: 2 },
  },
  {
    ad: 'dişlerini sık + bir yanlış, Rıza tahtanın başında, denize',
    ek: { travma: 3, ilkNefes: 'bastir', rizaSon22: 'kal' },
    yonler: ['Yokuş', 'Köpeğin', null, 'pasaja'], davul: 'Dişlerini', takip: 'riza', gubler: 'Gubler\'i yeni', mektup: 'Denize', baba: null,
    beklenen: { takipSonu: 'riza', mektupKarar: 'deniz', kayip: 2 },
  },
  {
    ad: 'kaybettin, kimse yok → Gubler kaçar',
    ek: { travma: 0, rizaSon22: 'kirgin', babaItiraf: true },
    yonler: ['Sola', 'iskeleye', null, 'Kamondo'], davul: 'Devam', takip: 'kacti', gubler: 'Devam', mektup: null, baba: 'Pencerede',
    beklenen: { takipSonu: 'kacti', gublerSonu: 'kacti', babaYaninda: false, travma: 1 },
  },
];

for (const s of senaryolar) {
  test('yirmi dördüncü bölüm: ' + s.ad, () => {
    const s23 = { ...M.yeniDurum(BOLUM23), gorunum: { tur: 'sahne', id: 'son' }, deliller: ['belge'], cikarimlar: ['orgut'], bayraklar: { bolumBitti: true, ...s.ek } };
    expect(M.sahneBilgisi(BOLUM23, s23).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum24');
    let d = M.bolumeGec(B, s23);
    expect(M.sahneBilgisi(B, d).paragraflar.join(' ').includes('Tık tık adam')).toBe(s.ek.cocukKarar === 'yanina');
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('takip1');
    d = sahneGec(d, s.yonler[0]);
    expect(d.gorunum.id).toBe('takip2');
    d = sahneGec(d, s.yonler[1]);
    expect(d.gorunum.id).toBe('takip3');
    const davulSecenek = M.sahneBilgisi(B, d).secenekler.map((x) => x.etiket);
    if (s.ek.travma >= 2) expect(davulSecenek.some((x) => x.includes('Nefesini'))).toBe(s.ek.ilkNefes === 'say');
    d = sahneGec(d, s.davul);
    expect(d.gorunum.id).toBe('takip3_yon');
    d = sahneGec(d, s.yonler[3]);
    expect(d.gorunum.id).toBe('takip4');
    d = sahneGec(d);
    expect(M.bayrak(d, 'takipSonu')).toBe(s.takip);
    expect(d.gorunum.id).toBe('rihtim24');
    d = sahneGec(d, s.gubler);
    if (s.mektup) {
      expect(d.gorunum.id).toBe('gubler24');
      d = sahneGec(d);
      expect(d.gorunum.id).toBe('mektup24');
      d = sahneGec(d, s.mektup);
    }
    expect(d.gorunum.id).toBe('son24');
    if (s.baba) {
      d = sahneGec(d, s.baba);
      expect(d.gorunum.id).toBe('son24_baba');
      d = sahneGec(d);
    } else {
      d = sahneGec(d);
    }
    expect(d.gorunum.id).toBe('kapanis24');
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    for (const [k, v] of Object.entries(s.beklenen)) {
      if (['kayip', 'travma'].includes(k)) expect(M.bayrak(d, k)).toBe(v);
      else expect(M.bayrak(d, k)).toBe(v);
    }
    expect(KAYIP_SINIRI).toBe(2);
  });
}
