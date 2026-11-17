// On birinci bölüm: İzmir. Geçiş izni, Ferrante'ye güven, Aurora'nın sonu ve son sayfa.
import { expect, test } from 'bun:test';
import { BOLUM10 } from '../src/hikaye/bolum10';
import { BOLUM11 as B } from '../src/hikaye/bolum11';
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

function onuncuBolumSonu(ek) {
  return {
    ...M.yeniDurum(BOLUM10),
    gorunum: { tur: 'sahne', id: 'son' },
    deliller: ['belge', 'defter_yarisi', 'siyakat_okundu', 'viyana_ipucu', 'rainer_bilgi', 'gumruk_listesi', 'baba_itirafi'],
    cikarimlar: ['orgut', 'buyuk_usta', 'ikinci_sevkiyat', 'kalip'],
    bayraklar: { bolumBitti: true, ekip_cemil: true, ekip_nermin: true, ekip_riza: true, ...ek },
  };
}

const senaryolar = [
  { ad: 'Ferrante\'ye güven, ambarı su bastır', ek: { delormeSonu: 'tutuklu' }, ferrante: 'Anlaştık', aurora: 'Stavros', sonuc: 'kacti', auroraSonu: 'batti' },
  { ad: 'Ferrante\'yi teslim et, ihbar', ek: { delormeSonu: 'denizde' }, ferrante: 'Hayır', aurora: 'ihbar', sonuc: 'tutuklu', auroraSonu: 'ihbar' },
];

for (const s of senaryolar) {
  test('on birinci bölüm: ' + s.ad, () => {
    const s10 = onuncuBolumSonu(s.ek);
    expect(M.sahneBilgisi(BOLUM10, s10).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum11');
    let d = M.bolumeGec(B, s10);
    expect(d.gorunum).toEqual({ tur: 'sahne', id: 'acilis' });
    d = sahneGec(d);
    expect(d.mekan).toBe('kordon');
    expect(M.mekanBilgisi(B, d).gecisler.map((g) => g.hedef)).not.toContain('kemeralti');
    d = incele(d, 'otel_levant');
    expect(M.delilVar(d, 'whitlock_kaydi')).toBe(true);
    d = git(d, 'klinik');
    expect(M.mekanBilgisi(B, d).kisiler).not.toContain('kadir');
    d = konus(d, 'eleni', ['Kemeraltı']);
    d = konus(d, 'kadir', ['Kim vurdu']);
    expect(M.delilVar(d, 'aurora_adi')).toBe(true);
    d = git(d, 'kordon');
    d = git(d, 'yazihane');
    d = incele(d, 'tas_sandik');
    d = incele(d, 'kagitlar');
    d = git(d, 'kordon');
    d = git(d, 'kemeralti');
    expect(M.mekanBilgisi(B, d).kisiler).not.toContain('ferrante');
    d = incele(d, 'han_kapisi');
    d = konus(d, 'ferrante', ['Ne istiyorsun', s.ferrante]);
    expect(M.delilVar(d, 'ferrante_defteri')).toBe(true);
    d = git(d, 'kordon');
    d = konus(d, 'neslihan', ['defterini', 'Hadi']);
    expect(M.delilVar(d, 'iki_yana')).toBe(true);
    d = baglan(d, 'aurora_adi', 'iki_yana');
    d = baglan(d, 'whitlock_kaydi', 'rainer_bilgi');
    expect(d.gorunum).toEqual({ tur: 'sahne', id: 'gece_plani' });
    d = sahneGec(d, s.aurora);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('whitlock');
    d = sahneGec(d);
    expect(M.bayrak(d, 'ferranteSonu')).toBe(s.sonuc);
    expect(M.bayrak(d, 'auroraSonu')).toBe(s.auroraSonu);
    expect(d.gorunum.id).toBe('son_sayfa');
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
    expect(M.bayrak(d, 'nazimBulundu')).toBe(true);
  });
}
