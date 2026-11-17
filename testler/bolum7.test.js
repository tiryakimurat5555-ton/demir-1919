// Yedinci bölüm: farklı ekipler, anahtar var/yok, yakalanma yolu ve üç son seçimi.
import { expect, test } from 'bun:test';
import { BOLUM6 } from '../src/hikaye/bolum6';
import { BOLUM7 as B } from '../src/hikaye/bolum7';
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
const sahnedeyse = (d) => (d.gorunum.tur === 'sahne' ? sahneGec(d) : d);

function altinciBolumSonu(ek) {
  return {
    ...M.yeniDurum(BOLUM6),
    gorunum: { tur: 'sahne', id: 'son' },
    deliller: ['belge', 'kanatli_anahtar', 'fotograf', 'telgraf', 'talimat_metni', 'hafiz_tanik', 'otel_kaydi', 'riviere_bilgi'],
    cikarimlar: ['orgut', 'talimat', 'kardes', 'randevu', 'riviere'],
    bayraklar: { bolumBitti: true, ...ek },
  };
}

const senaryolar = [
  { ad: 'Cemil+Rıza, anahtar, Neslihan\'ı koru', ek: { ekip_cemil: true, ekip_riza: true, anahtarAlindi: true, neslihanBag: 2 }, kim: 'riza', sor: 'Babamı', son: 'Neslihan', alarm: 0, secim: 'geldi' },
  { ad: 'Cemil+Nermin, anahtarsız, kapı zorla, atıl', ek: { ekip_cemil: true, ekip_nermin: true, neslihanBag: 1, fransizBag: true }, kim: 'nermin', sor: 'talimat', son: 'atıl', alarm: 1, secim: 'gitti' },
  { ad: 'Nermin+Rıza, köpek havlar, kaç', ek: { ekip_nermin: true, ekip_riza: true, neslihanBag: 3, yaraKol: true }, kim: 'riza', sor: 'Babamı', son: 'kaç', alarm: 1, secim: 'kaldi' },
];

for (const s of senaryolar) {
  test('yedinci bölüm: ' + s.ad, () => {
    const s6 = altinciBolumSonu(s.ek);
    expect(M.sahneBilgisi(BOLUM6, s6).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum7');
    let d = M.bolumeGec(B, s6);
    d = sahneGec(d);
    expect(d.mekan).toBe('ev');
    expect(M.hedef(B, d)).toContain('köşke');
    d = konus(d, s.kim, ['Tamam']);
    d = incele(d, 'kroki');
    d = git(d, 'kosk_bahce');
    d = sahnedeyse(incele(d, 'kopek'));
    d = sahnedeyse(incele(d, 'bekci'));
    d = git(d, 'kosk_ic');
    d = incele(d, 'calisma_kapisi');
    expect(M.sayi(d, 'alarm')).toBe(s.alarm);
    d = git(d, 'calisma');
    expect(M.mekanBilgisi(B, d).nesneler.map((n) => n.id)).not.toContain('kasa');
    d = incele(d, 'kitaplik');
    const ilk = M.incele(B, d, 'kasa');
    expect(M.delilVar(ilk.durum, 'defter_yarisi')).toBe(false);
    d = incele(d, 'cerceve');
    d = incele(d, 'kasa');
    expect(M.delilVar(d, 'defter_yarisi')).toBe(true);
    expect(d.gorunum).toEqual({ tur: 'sahne', id: 'riviere' });
    d = sahneGec(d, s.sor);
    d = sahneGec(d);
    expect(M.delilVar(d, 'riviere_mektubu')).toBe(true);
    expect(d.gorunum.id).toBe('delorme_gelir');
    d = sahneGec(d, s.son);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('kacis');
    expect(M.bayrak(d, 'neslihanSecim')).toBe(s.secim);
    d = sahneGec(d);
    expect(d.gorunum.tur).toBe('mekan');
    expect(d.mekan).toBe('ev');
    expect(M.mekanBilgisi(B, d).gecisler.map((g) => g.hedef)).not.toContain('kosk_bahce');
    if (s.secim === 'geldi') d = konus(d, 'neslihan', ['yaşıyor', 'Dinlen']);
    d = konus(d, 'hafiz', ['Oku']);
    expect(M.delilVar(d, 'siyakat_okundu')).toBe(true);
    d = baglan(d, 'riviere_mektubu', 'hafiz_tanik');
    d = baglan(d, 'siyakat_okundu', 'defter_yarisi');
    expect(d.gorunum).toEqual({ tur: 'sahne', id: 'safak' });
    const metin = M.sahneBilgisi(B, d).paragraflar.join(' ');
    expect(metin).toContain(s.kim === 'riza' ? 'Rıza Bey' : 'Cemil Bey');
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
  });
}

test('yedinci bölüm: alarm üçe çıkınca yakalanırsın, bölüm sürer', () => {
  let d = M.bolumeGec(B, altinciBolumSonu({ ekip_nermin: true, ekip_riza: true, neslihanBag: 0 }));
  d = sahneGec(d);
  d = git(d, 'kosk_bahce');
  d = incele(d, 'kopek');
  expect(d.gorunum.id).toBe('havlama');
  d = sahneGec(d);
  d = incele(d, 'bekci');
  expect(M.sayi(d, 'alarm')).toBe(1);
  d = incele(d, 'pencere');
  d = incele(d, 'pencere');
  expect(M.sayi(d, 'alarm')).toBe(2);
  d = git(d, 'kosk_ic');
  d = incele(d, 'merdiven');
  expect(d.gorunum).toEqual({ tur: 'sahne', id: 'yakalandi' });
  expect(d.mekan).toBe('calisma');
  d = sahneGec(d);
  expect(d.gorunum.id).toBe('riviere');
  expect(M.delilVar(d, 'defter_yarisi')).toBe(true);
  expect(M.sahneBilgisi(B, d).paragraflar[0]).toContain('bekçilere');
  d = sahneGec(d, 'talimat');
  d = sahneGec(d);
  d = sahneGec(d, 'Neslihan');
  d = sahneGec(d);
  expect(M.bayrak(d, 'neslihanSecim')).toBe('gitti');
  d = sahneGec(d);
  expect(M.mekanBilgisi(B, d).kisiler).toContain('hafiz');
  expect(M.mekanBilgisi(B, d).kisiler).not.toContain('neslihan');
});
