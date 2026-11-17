// Yirmi ikinci bölüm: Lozan, üç akşam, alt komisyon. Rıza ve Neslihan sahneleri.
import { expect, test } from 'bun:test';
import { BOLUM21 } from '../src/hikaye/bolum21';
import { BOLUM22 as B, kanitSayisi } from '../src/hikaye/bolum22';
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

function aksam(d, nesne) {
  expect(d.gorunum.tur).toBe('mekan');
  d = incele(d, nesne);
  expect(d.gorunum.tur).toBe('sahne');
  return sahneGec(d);
}

const senaryolar = [
  {
    ad: 'Klara tanıdık, Kemal yolcu, Eleni → red; Rıza dosyaları verir; ad baba',
    ek: { klaraTanisti: true, kemalSonu: 'yolcu', cocukKarar: 'aile', rizaSorgu: 'delil', cemilRapor: 'sitma', pendleSonu: 'gazete', kardesGecesi: 'durust' },
    yerler: ['kutuphane', 'iskele', 'kizilhac'], riza: 'Dosyaları al', ad: 'İsmail kızı',
    beklenen: { tazminatSonu: 'red', rizaSon22: 'devir', neslihanAd: 'baba', klaraYardim: true }, kanit: 3, metin: 'Rina',
  },
  {
    ad: 'Kemal tereddüt iki akşam ister, basın kanıt değil → askıda; Rıza emekli',
    ek: { kemalSonu: 'tereddut', rizaSorgu: 'sopa', pendleSonu: 'kacti_mahkeme', cocukKarar: 'yanina' },
    yerler: ['iskele', 'iskele', 'basin'], riza: 'Bastonu al', ad: 'Rivière adını',
    beklenen: { tazminatSonu: 'askida', rizaSon22: 'emekli', neslihanAd: 'iki', klaraYardim: undefined }, kanit: 1, metin: 'Zehra',
  },
  {
    ad: 'Klara iki akşam, basın gazete kanıtı → red; Rıza kırgın; ad kendi',
    ek: { rizaSorgu: 'kalabalik', pendleSonu: 'kacti_gazete', kemalSonu: 'tereddut' },
    yerler: ['kutuphane', 'kutuphane', 'basin'], riza: 'başka yolu', ad: 'Ben söyleyemem',
    beklenen: { tazminatSonu: 'red', rizaSon22: 'kirgin', neslihanAd: 'kendi', klaraYardim: true }, kanit: 2, metin: 'Gazette de Lausanne',
  },
];

for (const s of senaryolar) {
  test('yirmi ikinci bölüm: ' + s.ad, () => {
    const s21 = { ...M.yeniDurum(BOLUM21), gorunum: { tur: 'sahne', id: 'son' }, deliller: ['belge'], cikarimlar: ['orgut'], bayraklar: { bolumBitti: true, ...s.ek } };
    expect(M.sahneBilgisi(BOLUM21, s21).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum22');
    let d = M.bolumeGec(B, s21);
    d = sahneGec(d);
    expect(d.mekan).toBe('otel22');
    expect(M.delilVar(d, 'dilekce')).toBe(true);
    expect(M.mekanBilgisi(B, d).nesneler.length).toBe(4);
    d = konus(d, 'riza', ['Sayıyorum']);
    let tumMetin = '';
    for (let i = 0; i < 3; i++) {
      d = aksam(d, s.yerler[i]);
      if (i === 0) {
        expect(d.gorunum.id).toBe('riza22');
        d = sahneGec(d, s.riza);
        d = sahneGec(d);
      }
      if (i === 1) {
        expect(d.gorunum.id).toBe('neslihan22');
        d = sahneGec(d, s.ad);
        tumMetin += M.sahneBilgisi(B, d).paragraflar.join(' ');
        d = sahneGec(d);
      }
    }
    expect(d.gorunum.id).toBe('komisyon');
    expect(kanitSayisi(d)).toBe(s.kanit);
    tumMetin += M.sahneBilgisi(B, d).paragraflar.join(' ');
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('koridor');
    expect(M.sahneBilgisi(B, d).paragraflar.join(' ')).toContain('Vollmer');
    d = sahneGec(d);
    tumMetin += M.sahneBilgisi(B, d).paragraflar.join(' ');
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    for (const [k, v] of Object.entries(s.beklenen)) expect(M.bayrak(d, k)).toBe(v);
    expect(M.bayrak(d, 'vollmerIpucu')).toBe(true);
    if (s.metin === 'Rina') expect(M.delilVar(d, 'kemal_ifadesi')).toBe(true);
    else expect(tumMetin).toContain(s.metin);
  });
}
