// Yirmi altıncı bölüm: Selanik, Şubat 1924. Zarf, Emine, Kenan Bey.
import { expect, test } from 'bun:test';
import { BOLUM25 } from '../src/hikaye/bolum25';
import { BOLUM26 as B } from '../src/hikaye/bolum26';
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
    ad: 'Neslihan kendi adını söyler, o açar, Kenan okur, Cemil söz',
    ek: { neslihanAd: 'kendi', saltielDavid: 'anlat', davidNotu: 'verdi', cemilSaltiel: true, arifGece: 'kardes', cemilDefter: 'durust', cemilFikri: 'teselli' },
    yanlis: [], emine: 'Neslihan kendisi', acan: 'Neslihan alsın', icerik: 'Devam', cemil: 'Fikri\'yi bulacağız', kenan: 'Okuyun',
    beklenen: { emineAd: 'neslihan', neslihanAdSoyledi: 'kendi', zarfAcan: 'neslihan', cemilSelanik: 'soz', kenanSonu: 'goster' },
    metin: ['Viyana\'nın ilk kışını', 'Kendim seçtim', 'Artık nereye bakacağımı', 'Bu sefer cevabını'],
  },
  {
    ad: 'iki yanlış ad, Neslihan söyler, Arif açar, sakladığı listeyi itiraf eder, uyar',
    ek: { neslihanAd: 'baba', saltielDavid: 'anlat', davidNotu: 'sakla', arifGece: 'yalniz', rizaSon22: 'emekli' },
    yanlis: ['Rivière', 'Kırk yedi'], emine: 'Neslihan kendisi', acan: 'Ben açayım', icerik: 'Evet', cemil: 'Uzaktan', kenan: 'Babanıza söyleyin',
    beklenen: { emineAd: 'neslihan', zarfAcan: 'arif', davidItiraf: true, cemilSelanik: 'bak', kenanSonu: 'uyar' },
    metin: ['bastonu sende', 'Nüfusta da öyle', 'Bir daha yapma', 'bir ömür'],
  },
  {
    ad: 'Arif doğru adı söyler, saltielDavid sus, sakla',
    ek: { saltielDavid: 'sus' },
    yanlis: [], emine: 'Kalaycı İsmail', acan: 'Neslihan alsın', icerik: 'Devam', cemil: 'İçeri girelim', kenan: 'Bir şey söylemeyeceğim',
    beklenen: { emineAd: 'arif', zarfAcan: 'neslihan', cemilSelanik: 'gir', kenanSonu: 'sakla' },
    metin: ['Bir şey dememiştin', 'tebeşirle çizdiği', 'soru sormaz'],
  },
];

for (const s of senaryolar) {
  test('yirmi altıncı bölüm: ' + s.ad, () => {
    const s25 = { ...M.yeniDurum(BOLUM25), gorunum: { tur: 'sahne', id: 'son' }, deliller: ['belge'], cikarimlar: ['orgut'], bayraklar: { bolumBitti: true, ...s.ek } };
    expect(M.sahneBilgisi(BOLUM25, s25).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum26');
    let d = M.bolumeGec(B, s25);
    expect(d.gorunum.id).toBe('acilis');
    const metinler = [];
    const topla = (t) => metinler.push([].concat(t).join(' '));
    topla(M.sahneBilgisi(B, d).paragraflar);
    expect(M.sahneBilgisi(B, d).paragraflar.every((p) => p && p.length > 0)).toBe(true);
    d = sahneGec(d);
    expect(d.mekan).toBe('rebeka26');
    expect(M.delilVar(d, 'saltiel_telgrafi')).toBe(true);
    expect(M.bayrak(d, 'ekip_nermin')).toBe(false);

    d = M.konusmaBaslat(B, d, 'saltiel26');
    topla(M.dugumBilgisi(B, d).soz);
    d = M.secenekSec(B, d, M.dugumBilgisi(B, d).secenekler[0]).durum;
    expect(M.delilVar(d, 'david_defteri')).toBe(true);
    d = { ...d, gorunum: { tur: 'mekan' } };

    d = git(d, 'mahalle26');
    d = incele(d, 'kapi26');
    d = konus(d, 'despina', ['İkisini']);
    expect(M.delilVar(d, 'hafiz_notu') && M.delilVar(d, 'kenan_mektubu')).toBe(true);
    d = { ...d, gorunum: { tur: 'mekan' } };
    d = git(d, 'rihtim26');
    expect(M.mekanBilgisi(B, d).kisiler).not.toContain('emine');
    d = baglan(d, 'saltiel_telgrafi', 'hafiz_notu');
    expect(M.mekanBilgisi(B, d).kisiler).toContain('emine');

    d = incele(d, 'eski_daire');
    expect(d.gorunum.id).toBe('cemil26');
    d = sahneGec(d, s.cemil);
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d);
    expect(d.mekan).toBe('rihtim26');

    d = M.konusmaBaslat(B, d, 'emine');
    for (const y of s.yanlis) d = M.secenekSec(B, d, M.dugumBilgisi(B, d).secenekler.find((x) => x.etiket.includes(y))).durum;
    if (s.yanlis.length >= 2) expect(M.dugumBilgisi(B, d).secenekler.length).toBe(1);
    d = M.secenekSec(B, d, M.dugumBilgisi(B, d).secenekler.find((x) => x.etiket.includes(s.emine))).durum;
    if (d.gorunum.tur === 'konusma') {
      topla(M.dugumBilgisi(B, d).soz);
      d = M.secenekSec(B, d, M.dugumBilgisi(B, d).secenekler[0]).durum;
    }
    expect(d.gorunum.id).toBe('zarf_teslim');
    d = sahneGec(d, s.acan);
    expect(M.delilVar(d, 'zarf')).toBe(true);
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d, s.icerik);
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d);
    expect(d.gorunum.tur).toBe('mekan');
    expect(M.mekanBilgisi(B, d).kisiler).not.toContain('emine');

    d = baglan(d, 'david_defteri', 'kenan_mektubu');
    expect(d.gorunum.id).toBe('kenan26');
    d = sahneGec(d, s.kenan);
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('vapur26');
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    expect(M.bayrak(d, 'bolumBitti')).toBe(true);
    for (const [k, v] of Object.entries(s.beklenen)) expect(M.bayrak(d, k)).toBe(v);
    const hepsi = metinler.join(' ');
    for (const m of s.metin) expect(hepsi).toContain(m);
  });
}

test('yirmi altıncı bölümde boş paragraf yok', () => {
  for (const [id, sh] of Object.entries(B.sahneler)) {
    const d = { ...M.yeniDurum(B), gorunum: { tur: 'sahne', id } };
    expect(M.sahneBilgisi(B, d).paragraflar.every((p) => typeof p === 'string' && p.length > 0)).toBe(true);
  }
});
