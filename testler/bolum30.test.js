// Otuzuncu bölüm: Cenevre, Haziran 1924. Tanıklar.
import { expect, test } from 'bun:test';
import { BOLUM29 } from '../src/hikaye/bolum29';
import { BOLUM30 as B } from '../src/hikaye/bolum30';
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

const temel = ['belge', 'zarf', 'alt_yari', 'makbuz_defteri'];
const senaryolar = [
  {
    ad: 'herkes konuşur: Neslihan, Cemil, Melek, Kenan, Nermin → ad',
    ek: { ferranteKarar: 'cenevre', klaraYardim: true, melekTanik: true, melekKarar: 'anne', fikriKarar: 'kenan', cemilDefter: 'durust', neslihanAd: 'kendi', nerminYemin: 'gazete', rizaKorku: 'fark' },
    sira: [['neslihan30', 'İnelim', 'Konuş.'], ['cemil30', 'Var', 'Yaz,'], ['melek30', 'Ellerini'], ['kenan30', 'Kalk'], ['nermin30', 'Yaz.'], ['klara30', 'Sağ ol'], ['riza30', 'Tamam']],
    ikna: 10, sonuc: 'ad', bruno: null,
    metin: ['iki aydır komitenin önünde', 'Klara Rainer hazırladı', 'Kendi seçtiğim ad', 'Kendi adımla. İzin istemiyorum', 'ölmemişsin', 'elimi tuttu', 'Kırk Yedinci Sayfa', 'Bu sefer delille', 'Kenan Bey kalkıyor', 'Danimarkalı hanım', 'Buenos Aires'],
  },
  {
    ad: 'Ferrante serbest, Bruno koridorda, konuşulur; Neslihan susar → genel',
    ek: { ferranteKarar: 'polis', melekTanik: true, fikriKarar: 'birak', cemilDefter: 'teselli' },
    sira: [['neslihan30', 'İnelim', 'Konuşma.'], ['cemil30', 'Var', 'Bu senin yükün'], ['nermin30', 'Bekle'], ['melek30', 'Ellerini']],
    bruno: 'Bruno\'yla konuş', ikna: 4, sonuc: 'genel',
    metin: ['Yanında avukatı Signor Borghi ve Bruno', 'Rıza Bey ile Nermin', 'Bu sefer değil', 'cebimde dursun', 'Marsilya\'daki okul', 'Buenos Aires. Orada bir yeğeni', 'Ad yok'],
  },
  {
    ad: 'kararı Neslihan verir (bağ yüksek), savcı ifadesi, Bruno Klara\'nın evine',
    ek: { ferranteKarar: 'birak', melekTanik: true, rainerSonu: 'serbest', fikriKarar: 'savci', neslihanBag: 4 },
    sira: [['neslihan30', 'İnelim', 'Ben söyleyemem'], ['melek30', 'Ellerini']],
    bruno: 'başka bir otele', ikna: 7, sonuc: 'ad',
    metin: ['Ferrante\'yi Napoli\'de bırakmıştın', 'Konuşacağım, diyor. Bir kez', 'bulunamamayı', 'savcılığına verdiği ifadenin'],
  },
];

for (const s of senaryolar) {
  test('otuzuncu bölüm: ' + s.ad, () => {
    const s29 = { ...M.yeniDurum(BOLUM29), gorunum: { tur: 'sahne', id: 'son' }, deliller: [...temel], cikarimlar: ['orgut'], bayraklar: { bolumBitti: true, ...s.ek } };
    expect(M.sahneBilgisi(BOLUM29, s29).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum30');
    let d = M.bolumeGec(B, s29);
    const metinler = [];
    const topla = (t) => metinler.push([].concat(t).join(' '));
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d);
    expect(d.mekan).toBe('otel30');
    expect(M.mekanBilgisi(B, d).nesneler.map((o) => o.id)).not.toContain('oturuma_git');
    for (const [kisi, ...parcalar] of s.sira) {
      expect(M.mekanBilgisi(B, d).kisiler).toContain(kisi);
      d = M.konusmaBaslat(B, d, kisi);
      topla(M.dugumBilgisi(B, d).soz);
      const r = M.secenekSec(B, d, M.dugumBilgisi(B, d).secenekler.find((x) => x.etiket.includes(parcalar[0])));
      topla(r.cevap);
      d = r.durum;
      if (d.gorunum.tur === 'sahne' && parcalar[1]) {
        topla(M.sahneBilgisi(B, d).paragraflar);
        d = sahneGec(d, parcalar[1]);
        topla(M.sahneBilgisi(B, d).paragraflar);
        d = sahneGec(d);
      }
      if (d.gorunum.id === 'bruno30') {
        topla(M.sahneBilgisi(B, d).paragraflar);
        d = sahneGec(d, s.bruno);
        topla(M.sahneBilgisi(B, d).paragraflar);
        d = sahneGec(d);
      }
      if (d.gorunum.tur === 'konusma') d = { ...d, gorunum: { tur: 'mekan' } };
    }
    expect(M.sayi(d, 'ikna')).toBe(s.ikna);
    d = incele(d, 'oturuma_git');
    expect(d.gorunum.id).toBe('oturum30');
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d);
    expect(M.bayrak(d, 'kurulSonu30')).toBe(s.sonuc);
    topla(M.sahneBilgisi(B, d).paragraflar);
    d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    const hepsi = metinler.join(' ');
    for (const m of s.metin) expect(hepsi).toContain(m);
  });
}

test('otuzuncu bölümde boş paragraf yok', () => {
  for (const id of Object.keys(B.sahneler)) {
    const d = { ...M.yeniDurum(B), gorunum: { tur: 'sahne', id } };
    expect(M.sahneBilgisi(B, d).paragraflar.every((p) => typeof p === 'string' && p.length > 0)).toBe(true);
  }
});
