// Otuz dokuzuncu bölüm: Stella del Plata, Mart 1926. Yedinci kitabın açılışı.
import { expect, test } from 'bun:test';
import { BOLUM38 } from '../src/hikaye/bolum38';
import { BOLUM39 as B } from '../src/hikaye/bolum39';
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
import { GUN_SAYISI } from '../src/hikaye/bolum39';

const senaryolar = [
  {
    ad: 'Rıza gemide; kızlar Montevideo\'da iner',
    ek: { rizaKar: 'yol', kasa38: 'sayfa', brunoSonu: 'riza', neslihanRahel: 'ad', zehraSoru: 'yaz' },
    gunler: ['ucuncu', 'katip', 'salon'],
    ekvator: 'Buenos Aires\'e kadar gel', nazli: 'Sen söyle', zehra: 'Telsizle', karar: 'Montevideo\'da on bir',
    beklenen: { rizaEkvator: 'birlikte', neslihanNazli: 'anlat', zehraTelgraf: 'telgraf', testaKarar: 'indir', ekip_riza: true, ekip_cemil: false },
    metin: ['Haliç\'ten öteye', 'polizia', 'altı ad söylemiştim', 'jandarmaydı', 'dünyanın bir kemeri', 'Florina\'da bir hastane arabası', 'Ben senin gibi olmayacağım', 'Rıza Bey limandaki polisle', 'el sallıyor'],
  },
  {
    ad: 'Cemil gemide; Testa izlenir',
    ek: { rizaKar: 'kal', cemilEleni: 'veda', kasa38: 'birak', zehraSoru: 'suphe' },
    gunler: ['salon', 'telsiz', 'ucuncu'],
    ekvator: 'Gönder', nazli: 'Ben söyleyeyim', zehra: 'Buenos Aires bitince', karar: 'Testa\'yı izle',
    beklenen: { cemilEkvator: 'gonder', neslihanNazli: 'arif', zehraTelgraf: 'soz', testaKarar: 'izle', ekip_cemil: true, ekip_riza: false },
    metin: ['Kapıdayım', 'Klara\'nın kalemiyle', 'Veda eden mektup yazmaz', 'Calle Junín', 'Türkçe okuyorsun', 'Buenos Aires\'te sizinle'],
  },
  {
    ad: 'ihbar; Nazlı bilmez',
    ek: { rizaKar: 'yol' },
    gunler: ['telsiz', 'ucuncu', 'katip'],
    ekvator: 'Montevideo\'da in', nazli: 'Şimdi değil', zehra: 'Bir okyanus', karar: 'kaptana ihbar',
    beklenen: { rizaEkvator: 'montevideo', neslihanNazli: 'bekle', zehraTelgraf: 'sonra', testaKarar: 'ihbar' },
    metin: ['Turi', 'portakalı soyuyor', 'Arka kapı bende', 'Cenova valiliğinin'],
  },
];

for (const s of senaryolar) {
  test('otuz dokuzuncu bölüm: ' + s.ad, () => {
    const s38 = { ...M.yeniDurum(BOLUM38), gorunum: { tur: 'sahne', id: 'son' }, deliller: ['belge'], cikarimlar: ['orgut'], bayraklar: { bolumBitti: true, ...s.ek } };
    expect(M.sahneBilgisi(BOLUM38, s38).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum39');
    let d = M.bolumeGec(B, s38);
    const metinler = [];
    const topla = () => metinler.push([].concat(M.sahneBilgisi(B, d).paragraflar).join(' '));
    topla();
    d = sahneGec(d);
    expect(d.mekan).toBe('vapur39');
    expect(M.mekanBilgisi(B, d).nesneler.length).toBe(4);
    for (const k of M.mekanBilgisi(B, d).kisiler) metinler.push([].concat(M.dugumBilgisi(B, M.konusmaBaslat(B, d, k)).soz).join(' '));
    for (let g = 0; g < GUN_SAYISI; g++) {
      d = incele(d, s.gunler[g]);
      topla(); d = sahneGec(d);
      if (g === 0) { expect(d.gorunum.id).toBe('ekvator39'); topla(); d = sahneGec(d, s.ekvator); }
      if (g === 1) {
        expect(d.gorunum.id).toBe('neslihan39'); topla(); d = sahneGec(d, s.nazli);
        topla(); d = sahneGec(d, s.zehra);
      }
    }
    expect(d.gorunum.tur).toBe('mekan');
    const v = (x) => M.delilVar(d, x);
    if (v('sozlesme') && v('yolcu_listesi')) d = baglan(d, 'sozlesme', 'yolcu_listesi');
    if (v('testa_defteri') && v('telsiz_kaydi')) d = baglan(d, 'testa_defteri', 'telsiz_kaydi');
    d = incele(d, 'laplata');
    expect(d.gorunum.id).toBe('laplata39');
    topla(); d = sahneGec(d, s.karar);
    topla(); d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    for (const [k, v] of Object.entries(s.beklenen)) expect(M.bayrak(d, k)).toBe(v);
    const hepsi = metinler.join(' ');
    for (const m of s.metin) expect(hepsi).toContain(m);
  });
}

test('otuz dokuzuncu bölüm: çıkarım olmadan yalnız ihbar seçilebilir', () => {
  const d = { ...M.yeniDurum(B), gorunum: { tur: 'sahne', id: 'laplata39' } };
  expect(M.sahneBilgisi(B, d).secenekler.map((x) => x.etiket)).toEqual(['Testa\'yı kaptana ihbar et. Ne olursa olsun.']);
});

test('otuz dokuzuncu bölümde boş paragraf yok', () => {
  for (const id of Object.keys(B.sahneler)) {
    const d = { ...M.yeniDurum(B), gorunum: { tur: 'sahne', id } };
    expect(M.sahneBilgisi(B, d).paragraflar.every((p) => typeof p === 'string' && p.length > 0)).toBe(true);
  }
});
