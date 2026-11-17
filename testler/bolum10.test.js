// Onuncu bölüm: babanın itirafı, mühür dökümü, sandıkların kaderi ve Kız Kulesi'nde üç son.
import { expect, test } from 'bun:test';
import { BOLUM9 } from '../src/hikaye/bolum9';
import { BOLUM10 as B } from '../src/hikaye/bolum10';
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

function dokuzuncuBolumSonu(ek) {
  return {
    ...M.yeniDurum(BOLUM9),
    gorunum: { tur: 'sahne', id: 'son' },
    deliller: ['belge', 'defter_yarisi', 'siyakat_okundu', 'viyana_ipucu', 'rainer_bilgi'],
    cikarimlar: ['orgut', 'isimler', 'buyuk_usta', 'tuzak'],
    bayraklar: { bolumBitti: true, ekip_cemil: true, ekip_riza: true, neslihanSecim: 'geldi', babaTanidi: true, ...ek },
  };
}

const senaryolar = [
  { ad: 'İngilizler, kalıbı uzat (defter saklandı)', ek: { defterKarar: 'sakla', karar3: 'ihbar' }, hasan: false, sevk: 'İngilizlere', kule: 'Kalıbı', son: 'denizde' },
  { ad: 'Anadolu, atıl (yaralı kol)', ek: { defterKarar: 'gazete', yaraKol: true }, hasan: true, sevk: 'Anadolu', kule: 'atıl', son: 'vuruldu' },
  { ad: 'Boğaz, konuş (Fransızlar)', ek: { defterKarar: 'fransiz' }, hasan: true, sevk: 'Boğaz', kule: 'Rainer', son: 'tutuklu' },
];

for (const s of senaryolar) {
  test('onuncu bölüm: ' + s.ad, () => {
    const s9 = dokuzuncuBolumSonu(s.ek);
    expect(M.sahneBilgisi(BOLUM9, s9).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum10');
    let d = M.bolumeGec(B, s9);
    expect(d.gorunum).toEqual({ tur: 'sahne', id: 'acilis' });
    d = sahneGec(d);
    expect(d.mekan).toBe('rihtim');
    expect(M.delilVar(d, 'kalay_takimi')).toBe(true);
    expect(M.mekanBilgisi(B, d).gecisler.map((g) => g.hedef)).not.toContain('antrepo');
    d = konus(d, 'suleyman', ['Santa Lucia', 'Sağ ol']);
    d = git(d, 'buro');
    d = konus(d, 'gulce', ['manifesto']);
    expect(M.delilVar(d, 'gumruk_listesi')).toBe(true);
    d = git(d, 'rihtim');
    d = git(d, 'han');
    d = konus(d, 'baba', ['Anlat']);
    expect(M.delilVar(d, 'baba_itirafi')).toBe(true);
    d = baglan(d, 'gumruk_listesi', 'viyana_ipucu');
    d = baglan(d, 'baba_itirafi', 'kalay_takimi');
    expect(d.gorunum).toEqual({ tur: 'sahne', id: 'dokum' });
    d = sahneGec(d);
    expect(M.bayrak(d, 'sahteMuhur')).toBe(true);
    d = git(d, 'rihtim');
    d = git(d, 'antrepo');
    if (s.hasan) d = konus(d, 'hasan', ['Kayık']);
    d = incele(d, 'sandiklar');
    expect(d.gorunum.id).toBe('sevkiyat_karari');
    const etiketler = M.sahneBilgisi(B, d).secenekler.map((x) => x.etiket).join(' | ');
    expect(etiketler.includes('Anadolu')).toBe(s.hasan);
    d = sahneGec(d, s.sevk);
    d = sahneGec(d);
    expect(d.gorunum).toEqual({ tur: 'sahne', id: 'kacirildi' });
    expect(d.mekan).toBe('han');
    d = sahneGec(d);
    expect(M.delilVar(d, 'delorme_notu')).toBe(true);
    expect(d.gorunum.id).toBe('kayik');
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('kule');
    d = sahneGec(d, s.kule);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('safak10');
    expect(M.bayrak(d, 'delormeSonu')).toBe(s.son);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
  });
}
