// On ikinci bölüm: Gülce, arşivde Rumi yıl bulmacası, yalıda imza ve altının kaderi.
import { expect, test } from 'bun:test';
import { BOLUM11 } from '../src/hikaye/bolum11';
import { BOLUM12 as B } from '../src/hikaye/bolum12';
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

function onBirinciBolumSonu(ek) {
  return {
    ...M.yeniDurum(BOLUM11),
    gorunum: { tur: 'sahne', id: 'son' },
    deliller: ['belge', 'rainer_bilgi', 'ferrante_defteri', 'iki_yana'],
    cikarimlar: ['orgut', 'aurora', 'yeni_adam'],
    bayraklar: { bolumBitti: true, nazimBulundu: true, ekip_cemil: true, ekip_nermin: true, ekip_riza: true, ...ek },
  };
}

const senaryolar = [
  { ad: 'mektupla doğru raf, eli tut, İngilizler', ek: { gulceGuven: 2, auroraSonu: 'batti', karar3: 'ihbar' }, mektup: true, raflar: ['1329, Gümrük'], yali: 'elini tut', altin: 'İngiliz', uyarildi: false },
  { ad: 'mektupsuz iki yanlış raf, bırak, gazete', ek: { gulceGuven: 0, auroraSonu: 'ihbar' }, mektup: false, raflar: ['1913', '1330', '1329, Gümrük'], yali: 'Bırak', altin: 'Nermin', uyarildi: false },
  { ad: 'üç yanlış raf, kâtip yakalar', ek: { gulceyeAnlatti: true }, mektup: false, raflar: ['1913', '1330', 'Mülkiye', 'Kâtip'], yali: 'elini tut', altin: 'Nermin', uyarildi: true },
];

for (const s of senaryolar) {
  test('on ikinci bölüm: ' + s.ad, () => {
    const s11 = onBirinciBolumSonu(s.ek);
    expect(M.sahneBilgisi(BOLUM11, s11).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum12');
    let d = M.bolumeGec(B, s11);
    d = sahneGec(d);
    expect(d.mekan).toBe('rihtim');
    expect(M.delilVar(d, 'tasfiye_satiri')).toBe(true);
    expect(M.mekanBilgisi(B, d).gecisler.map((g) => g.hedef)).not.toContain('maliye');
    d = git(d, 'buro');
    expect(d.gorunum.id).toBe('gulce_ogrenir');
    d = sahneGec(d);
    expect(M.bayrak(d, 'gulceBildi')).toBe(true);
    d = konus(d, 'gulce', ['Columbia', 'Hiçbir']);
    expect(M.delilVar(d, 'agir_sandik')).toBe(true);
    d = git(d, 'rihtim');
    if (s.mektup) {
      d = git(d, 'gulce_ev');
      d = incele(d, 'baba_sandigi');
      expect(M.delilVar(d, 'baba_mektubu')).toBe(true);
      d = git(d, 'rihtim');
    }
    d = git(d, 'maliye');
    d = incele(d, 'arsiv_kapisi');
    expect(d.gorunum.id).toBe('arsiv');
    for (const raf of s.raflar) {
      d = sahneGec(d, raf);
      if (d.gorunum.id === 'arsiv_yanlis') d = sahneGec(d);
    }
    d = sahneGec(d);
    expect(d.gorunum.tur).toBe('mekan');
    expect(M.delilVar(d, 'kamil_raporu')).toBe(true);
    expect(!!M.bayrak(d, 'nazimUyarildi')).toBe(s.uyarildi);
    d = git(d, 'rihtim');
    d = git(d, 'pera');
    d = incele(d, 'pera_palas');
    expect(M.delilVar(d, 'whitlock_nazim')).toBe(true);
    d = baglan(d, 'tasfiye_satiri', 'kamil_raporu');
    d = baglan(d, 'agir_sandik', 'whitlock_nazim');
    expect(d.gorunum.id).toBe('yali_yol');
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('yali');
    d = sahneGec(d, s.yali);
    if (d.gorunum.id === 'namlu') d = sahneGec(d);
    expect(d.gorunum.id).toBe('imza');
    d = sahneGec(d);
    expect(M.delilVar(d, 'nazim_itirafi')).toBe(true);
    expect(d.gorunum.id).toBe('columbia');
    d = sahneGec(d, s.altin);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son_sabah');
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
    expect(M.bayrak(d, 'rainerGeliyor')).toBe(true);
  });
}
