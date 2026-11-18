// Yirmi yedinci bölüm: Moda, Mart 1924. Kör binbaşının sorgusu.
import { expect, test } from 'bun:test';
import { BOLUM26 } from '../src/hikaye/bolum26';
import { BOLUM27 as B } from '../src/hikaye/bolum27';
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

const senaryolar = [
  {
    ad: 'Kenan kapıyı açar, tam itiraf, oğluna bırak',
    ek: { kenanSonu: 'goster', cemilSelanik: 'soz', cemilDefter: 'durust', zarfAcan: 'arif', kemalKalir: true, neslihanAdSoyledi: 'kendi', ferranteSonu: 'kacti' },
    deliller: ['zarf', 'david_defteri'],
    yol: 'Git.', giris: 'Kenan', sor: ['Neslihan listeyi', 'Rıhtımdaki kâtibi', 'Oğlun burada'], cemil: true, karar: 'Oğluna',
    beklenen: { neslihanYol: 'yalniz', fikriItiraf: 'tam', fikriKarar: 'kenan', kenanIceride: true },
    metin: ['Babam sizi kabul edecek', 'Ben de dinleyeceğim', 'Kırk yaşında çırak', 'bütün hayatını değiştirdi', 'Dante', 'Oğlu olarak', 'Ben Marsilya', 'kendim seçtim'],
    catlak: 5,
  },
  {
    ad: 'bekçiler, Rıza kırgın döner, kısmi itiraf, savcı',
    ek: { kenanSonu: 'uyar', rizaSon22: 'kirgin', cemilDefter: 'teselli', zarfAcan: 'neslihan', ferranteSonu: 'tutuklu' },
    deliller: ['zarf'],
    yol: 'Fikri\'den sonra', giris: 'Cemil Bey kapıyı', sor: ['Neslihan listeyi'], cemil: true, karar: 'Savcılığa',
    beklenen: { neslihanYol: 'bekle', fikriItiraf: 'kismi', fikriKarar: 'savci', rizaDondu: true, giris27: 'cemil' },
    metin: ['bir fincan fazla', 'Kızgınlığım bekleyebilir', 'İki yüz kere', 'İki yıl yattı', 'Kadıköy savcısını', 'Melek bekliyor'],
    catlak: 2,
  },
  {
    ad: 'yabancı önce gelmiş, Cemil sormadan, bırak',
    ek: { kenanSonu: 'sakla', cemilSelanik: 'bak' },
    deliller: ['zarf', 'david_defteri'],
    yol: 'Seninle', giris: 'İçeri gir', sor: ['Neslihan listeyi', 'Rıhtımdaki kâtibi'], cemil: true, karar: 'Bırak onu',
    beklenen: { neslihanYol: 'birlikte', fikriItiraf: 'tam', fikriKarar: 'birak', yabanciGeldi: true },
    metin: ['gümrükte kimseye', 'yeni ayak izleri', 'Ferrante selam söylüyor', 'Hep oturacak', 'Ben öndeyim'],
    catlak: 3,
  },
];

for (const s of senaryolar) {
  test('yirmi yedinci bölüm: ' + s.ad, () => {
    const s26 = { ...M.yeniDurum(BOLUM26), gorunum: { tur: 'sahne', id: 'son' }, deliller: ['belge', ...s.deliller], cikarimlar: ['orgut'], bayraklar: { bolumBitti: true, ...s.ek } };
    expect(M.sahneBilgisi(BOLUM26, s26).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum27');
    let d = M.bolumeGec(B, s26);
    const metinler = [];
    const topla = (t) => metinler.push([].concat(t).join(' '));
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d);
    expect(d.mekan).toBe('kayikhane27');
    expect(M.mekanBilgisi(B, d).nesneler.map((o) => o.id)).not.toContain('kayik_bin');

    for (const k of ['kemal27', 'riza27', 'cemil27']) {
      if (M.mekanBilgisi(B, d).kisiler.includes(k)) {
        d = M.konusmaBaslat(B, d, k);
        topla(M.dugumBilgisi(B, d).soz);
        d = M.secenekSec(B, d, M.dugumBilgisi(B, d).secenekler[0]).durum;
      }
    }
    d = konus(d, 'neslihan27', ['Dinliyorum']);
    expect(d.gorunum.id).toBe('neslihan_yol');
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d, s.yol);
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d);
    d = konus(d, 'suleyman27', ['Akşam']);
    d = incele(d, 'kayik_bin');
    expect(d.gorunum.id).toBe('kayik27');
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('moda27');
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d, s.giris);
    expect(d.mekan).toBe('kosk27');

    d = M.konusmaBaslat(B, d, 'fikri');
    for (const p of s.sor) {
      const sec = M.dugumBilgisi(B, d).secenekler.find((x) => x.etiket.includes(p));
      const r = M.secenekSec(B, d, sec);
      topla(r.cevap);
      d = r.durum;
    }
    if (s.cemil) {
      d = M.secenekSec(B, d, M.dugumBilgisi(B, d).secenekler.find((x) => x.etiket.includes('Cemil Bey'))).durum;
      expect(d.gorunum.id).toBe('cemil_soru27');
      topla(M.sahneBilgisi(B, d).paragraflar);
      d = sahneGec(d);
      expect(d.gorunum.tur).toBe('mekan');
      d = M.konusmaBaslat(B, d, 'fikri');
    }
    expect(M.sayi(d, 'fikriCatlak')).toBe(s.catlak);
    d = M.secenekSec(B, d, M.dugumBilgisi(B, d).secenekler.find((x) => x.etiket.includes('alt yarısı'))).durum;
    topla(M.dugumBilgisi(B, d).soz);
    d = M.secenekSec(B, d, M.dugumBilgisi(B, d).secenekler[0]).durum;
    expect(M.delilVar(d, 'fikri_itirafi')).toBe(true);
    d = incele(d, 'masa27');
    d = baglan(d, 'fikri_itirafi', 'napoli_zarfi');
    expect(d.gorunum.id).toBe('fikri_karar');
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d, s.karar);
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
    for (const [k, v] of Object.entries(s.beklenen)) expect(M.bayrak(d, k)).toBe(v);
    const hepsi = metinler.join(' ');
    for (const m of s.metin) expect(hepsi).toContain(m);
  });
}

test('yirmi yedinci bölümde boş paragraf yok', () => {
  for (const id of Object.keys(B.sahneler)) {
    const d = { ...M.yeniDurum(B), gorunum: { tur: 'sahne', id } };
    expect(M.sahneBilgisi(B, d).paragraflar.every((p) => typeof p === 'string' && p.length > 0)).toBe(true);
  }
});
