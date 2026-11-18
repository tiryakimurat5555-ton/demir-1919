// Otuz altıncı bölüm: Ankara, 21 Ekim 1925. İhale, saat saat.
import { expect, test } from 'bun:test';
import { BOLUM35 } from '../src/hikaye/bolum35';
import { BOLUM36 as B } from '../src/hikaye/bolum36';
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
import { KANIT_ESIGI, kanitSayisi36 } from '../src/hikaye/bolum36';

const senaryolar = [
  {
    ad: 'telgraf, hapishane, hastane, otel; yayımla (baba itiraf etmiş); red',
    ek: { pendleSon35: 'tanik', albrechtSonu: 'yakalandi', sabitSon34: 'cemil', cemilRapor34: 'adli', babaItiraf: true, neslihanAd: 'baba', neslihanMiras: 'borc' },
    yerler: [['telgraf_git', 'telgraf36'], ['cezaevi_git', 'cezaevi36'], ['hastane_git', 'hastane36'], ['otel_git', 'vollmer36']], vollmer: 'Yayımla',
    beklenen: { vollmerIhale: 'red', babaSayfa: 'yayimla' },
    metin: ['ödenmiş senetleri', 'Ben taşıdım', 'bankamı tanımayabilirim', 'yüzlerini', 'Adlarla', 'İsmail kızı', 'O zaten hazır', 'Zürih\'te görüşürüz', 'Senin seçtiğin bir satır', 'Sofrada söylemişti', 'Ama ben giderim'],
  },
  {
    ad: 'otel, matbaa, hastane, telgraf; kanıtı geri çek; kabul',
    ek: { cemilRapor34: 'adsiz', nerminKorku: 'kal' },
    yerler: [['otel_git', 'vollmer36'], ['matbaa_git', 'matbaa36'], ['hastane_git', 'hastane36'], ['telgraf_git', 'telgraf36']], vollmer: 'geri çekerim',
    beklenen: { vollmerIhale: 'kabul', babaSayfa: 'korundu' },
    metin: ['kanıtlarınızın birini', 'pazarlık', 'Saat dörtte', 'memurların adı yok', 'Arethusa\'da', 'ortak olmak için', 'Senin seçtiğin bir sessizlik', 'Teşekkür edeyim mi'],
  },
  {
    ad: 'babanın kartı çoktan oynanmış; otele gidilmez',
    ek: { vollmerSonu: 'itiraf', nerminKorku: 'istanbul' },
    yerler: [['matbaa_git', 'matbaa36'], ['telgraf_git', 'telgraf36'], ['cezaevi_git', 'cezaevi36'], ['hastane_git', 'hastane36']],
    beklenen: { vollmerIhale: 'kabul', babaSayfa: 'coktan' },
    metin: ['çoktan kendi söyledi', 'Gülce\'nin elinde', 'Pire\'den Zürih', 'bir yıl önce kendisi'],
    yok: ['zehir kalıbı dökenin oğlundan'],
  },
  {
    ad: 'otele gidilmez; Vollmer kartı salonda oynar',
    ek: {},
    yerler: [['matbaa_git', 'matbaa36'], ['telgraf_git', 'telgraf36'], ['cezaevi_git', 'cezaevi36'], ['hastane_git', 'hastane36']],
    beklenen: { vollmerIhale: 'kabul', babaSayfa: 'ifsa' },
    metin: ['zehir kalıbı dökenin oğlundan', 'belki okumuştur bile', 'gazeteden mi öğrensin'],
  },
];

for (const s of senaryolar) {
  test('otuz altıncı bölüm: ' + s.ad, () => {
    const s35 = { ...M.yeniDurum(BOLUM35), gorunum: { tur: 'sahne', id: 'son' }, deliller: ['belge'], cikarimlar: ['orgut'], bayraklar: { bolumBitti: true, ...s.ek } };
    expect(M.sahneBilgisi(BOLUM35, s35).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum36');
    let d = M.bolumeGec(B, s35);
    const metinler = [];
    const topla = () => metinler.push([].concat(M.sahneBilgisi(B, d).paragraflar).join(' '));
    topla();
    d = sahneGec(d);
    expect(d.mekan).toBe('ankara36');
    metinler.push([].concat(M.dugumBilgisi(B, M.konusmaBaslat(B, d, 'neslihan36')).soz).join(' '));
    s.yerler.forEach(([nesne, sahne], i) => {
      expect(M.mekanBilgisi(B, d).nesneler.length).toBe(5 - i);
      d = incele(d, nesne);
      expect(d.gorunum.id).toBe(sahne);
      topla();
      d = sahneGec(d, sahne === 'vollmer36' ? s.vollmer : undefined);
      if (sahne === 'vollmer36') { topla(); d = sahneGec(d); }
    });
    expect(d.gorunum.id).toBe('ihale36');
    topla();
    if (s.beklenen.vollmerIhale === 'red') expect(kanitSayisi36(d)).toBeGreaterThanOrEqual(KANIT_ESIGI);
    for (let i = 0; i < 3; i++) { d = sahneGec(d); topla(); }
    expect(d.gorunum.id).toBe('son');
    for (const [k, v] of Object.entries(s.beklenen)) expect(M.bayrak(d, k)).toBe(v);
    const hepsi = metinler.join(' ');
    for (const m of s.metin) expect(hepsi).toContain(m);
    for (const m of s.yok || []) expect(hepsi).not.toContain(m);
  });
}

test('otuz altıncı bölümde boş paragraf yok', () => {
  for (const id of Object.keys(B.sahneler)) {
    const d = { ...M.yeniDurum(B), gorunum: { tur: 'sahne', id } };
    expect(M.sahneBilgisi(B, d).paragraflar.every((p) => typeof p === 'string' && p.length > 0)).toBe(true);
  }
});
