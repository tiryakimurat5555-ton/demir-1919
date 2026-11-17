// Sekizinci bölüm: farklı ekipler, Neslihan'ın yanında olup olmaması, babanın tanıması ve Hasler'in sonu.
import { expect, test } from 'bun:test';
import { BOLUM7 } from '../src/hikaye/bolum7';
import { BOLUM8 as B } from '../src/hikaye/bolum8';
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
const incele = (d, id) => M.incele(B, d, id).durum;
const git = (d, hedef) => {
  expect(M.mekanBilgisi(B, d).gecisler.map((g) => g.hedef)).toContain(hedef);
  return M.mekanaGir(B, d, hedef);
};
const baglan = (d, a, b) => {
  const r = M.baglan(B, d, a, b);
  if (!r.basarili) throw new Error(a + ' + ' + b + ': ' + r.metin);
  return r.durum;
};
const sahneBitir = (d) => {
  while (d.gorunum.tur === 'sahne') d = sahneGec(d);
  return d;
};

function yedinciBolumSonu(ek) {
  return {
    ...M.yeniDurum(BOLUM7),
    gorunum: { tur: 'sahne', id: 'son' },
    deliller: ['belge', 'fotograf', 'hafiz_tanik', 'defter_yarisi', 'riviere_mektubu', 'siyakat_okundu'],
    cikarimlar: ['orgut', 'kardes', 'baba_yasiyor', 'isimler'],
    bayraklar: { bolumBitti: true, ...ek },
  };
}

const senaryolar = [
  { ad: 'Cemil+Rıza, Neslihan geldi, takım ve ritim, tutuklat', ek: { ekip_cemil: true, ekip_riza: true, neslihanSecim: 'geldi' }, takim: true, hasler: 'Tutuklayın', tanidi: true },
  { ad: 'Cemil+Nermin, Neslihan gitti (avluda), takımsız, bırak', ek: { ekip_cemil: true, ekip_nermin: true, neslihanSecim: 'gitti', fransizBag: true }, takim: false, hasler: 'Bırakın', tanidi: true },
  { ad: 'Nermin+Rıza, Neslihan kaldı, eve gitmeden, tutuklat', ek: { ekip_nermin: true, ekip_riza: true, neslihanSecim: 'kaldi' }, takim: true, ev: false, hasler: 'Tutuklayın', tanidi: false },
];

for (const s of senaryolar) {
  test('sekizinci bölüm: ' + s.ad, () => {
    const s7 = yedinciBolumSonu(s.ek);
    expect(M.sahneBilgisi(BOLUM7, s7).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum8');
    let d = M.bolumeGec(B, s7);
    expect(d.gorunum).toEqual({ tur: 'sahne', id: 'acilis' });
    d = sahneGec(d);
    expect(d.mekan).toBe('carsi');
    expect(M.mekanBilgisi(B, d).kisiler).not.toContain('yusuf');
    d = incele(d, 'dukkan');
    if (s.takim) d = konus(d, 'yusuf', ['Babam', 'Dükkân']);
    else d = konus(d, 'yusuf', ['Babam']);
    expect(M.delilVar(d, 'kalay_takimi')).toBe(s.takim);
    if (s.ev !== false) {
      d = git(d, 'baba_evi');
      if (s.ek.neslihanSecim === 'geldi') expect(d.gorunum.id).toBe('ani4');
      else {
        expect(d.gorunum.id).toBe('avlu_neslihan');
        d = sahneGec(d);
        expect(d.gorunum.id).toBe('ani4');
      }
      d = sahneGec(d);
      expect(d.gorunum.tur).toBe('mekan');
      expect(M.bayrak(d, 'ritimBilindi')).toBe(true);
      expect(M.mekanBilgisi(B, d).kisiler).toContain('neslihan');
      d = git(d, 'carsi');
      d = git(d, 'baba_evi');
      expect(d.gorunum.tur).toBe('mekan');
      d = git(d, 'carsi');
    }
    d = git(d, 'cezaevi');
    expect(M.mekanBilgisi(B, d).gecisler.map((g) => g.hedef)).not.toContain('hucre');
    d = konus(d, 'stojan', ['Babam', 'Kayıt', 'Beş dakika']);
    expect(M.delilVar(d, 'cezaevi_kaydi')).toBe(true);
    d = git(d, 'hucre');
    d = incele(d, 'goz');
    expect(M.delilVar(d, 'afyon')).toBe(!!s.ek.ekip_cemil);
    const babaAdim = [];
    if (s.takim) babaAdim.push('Kalay');
    if (s.ev !== false) babaAdim.push('Ritmi');
    babaAdim.push('Benim', 'çıkaracağım');
    d = konus(d, 'baba', babaAdim);
    d = git(d, 'cezaevi');
    d = git(d, 'revir');
    if (s.ek.ekip_nermin && !s.ek.ekip_riza) d = konus(d, 'hasler', ['Nermin', 'Teşekkürler']);
    d = incele(d, 'dosyalar');
    d = incele(d, 'dolap');
    expect(M.delilVar(d, 'afyon')).toBe(true);
    expect(M.delilVar(d, 'hasler_raporu')).toBe(true);
    d = baglan(d, 'cezaevi_kaydi', 'riviere_mektubu');
    d = baglan(d, 'hasler_raporu', 'afyon');
    expect(d.gorunum).toEqual({ tur: 'sahne', id: 'yuzbasi' });
    d = sahneGec(d, s.hasler);
    expect(M.delilVar(d, 'viyana_ipucu')).toBe(true);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('tahliye');
    const metin = M.sahneBilgisi(B, d).paragraflar.join(' ');
    expect(metin.includes('Oğlum')).toBe(s.tanidi);
    d = sahneGec(d);
    expect(M.bayrak(d, 'babaTanidi')).toBe(s.tanidi);
    expect(d.gorunum.id).toBe('han');
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
    expect(M.bayrak(d, 'kalipSirri')).toBe(true);
  });
}

test('sekizinci bölüm: Nermin+Rıza, Hasler oyalanmadan Rıza dolabı açar', () => {
  let d = M.bolumeGec(B, yedinciBolumSonu({ ekip_nermin: true, ekip_riza: true, neslihanSecim: 'gitti' }));
  d = sahneBitir(d);
  d = git(d, 'cezaevi');
  d = git(d, 'revir');
  d = incele(d, 'dolap');
  expect(M.delilVar(d, 'afyon')).toBe(true);
});

test('sekizinci bölüm: Cemil+Nermin, Nermin oyalamazsa dolap kilitli kalır', () => {
  let d = M.bolumeGec(B, yedinciBolumSonu({ ekip_cemil: true, ekip_nermin: true, neslihanSecim: 'geldi' }));
  d = sahneBitir(d);
  d = git(d, 'cezaevi');
  d = git(d, 'revir');
  d = incele(d, 'dolap');
  expect(M.delilVar(d, 'afyon')).toBe(false);
  d = konus(d, 'hasler', ['Nermin', 'Teşekkürler']);
  d = incele(d, 'dolap');
  expect(M.delilVar(d, 'afyon')).toBe(true);
});
