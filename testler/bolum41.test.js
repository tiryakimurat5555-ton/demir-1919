// Kırk birinci bölüm: Selanik, Mayıs 1926.
import { expect, test } from 'bun:test';
import { BOLUM40 } from '../src/hikaye/bolum40';
import { BOLUM41 as B } from '../src/hikaye/bolum41';
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
import { VAPUR_SINIRI } from '../src/hikaye/bolum41';

function sor(d, kisi, parca) {
  d = M.konusmaBaslat(B, d, kisi);
  const sec = M.dugumBilgisi(B, d).secenekler.find((x) => x.etiket.startsWith(parca));
  if (!sec) throw new Error(kisi + ': ' + parca + ' / ' + M.dugumBilgisi(B, d).secenekler.map((x) => x.etiket).join(' | '));
  const r = M.secenekSec(B, d, sec);
  return { d: r.durum, cevap: r.cevap.join(' ') };
}
const bitir = (d) => (d.gorunum.tur === 'konusma' ? { ...d, gorunum: { tur: 'mekan' } } : d);

const senaryolar = [
  {
    ad: 'hızlı: doğru sorular; Melek mektubu; yanına otur; Saltiel dava',
    ek: { ekip_riza: true, zehraIz: 'taburcu_iskele', melekKarar: 'anne', bolunmeCevap: 'onun', brunoSon40: 'yakalandi', neslihanNazli: 'anlat' },
    deliller: ['ferrante_itirafi'],
    sorular: [['despina41', 'Hafız Efendi\'nin defterinde'], ['rebeka41', 'Neslihan ninniyi'], ['katip41', 'Ayşe']],
    saltiel: ['İfadeyi ona ver', 'Klara\'ya gönder'], iskele: 'Yanına otur',
    beklenen: { iskeleSecim: 'otur', saltielBruno: 'dava', yolculuk41: 'vapur', rosario41: false },
    metin: ['Arası boş', 'İstanbul vapuruna bindi', 'Rıza Bey yanında', 'Bir kadın bir kadına', 'Florina\'ya dönüyorum', 'Hane iki yüz on dört', 'bunu sen duymalıydın', 'Manastır\'daki gibi', 'Zehra teyze', 'Biletler cebinde'],
  },
  {
    ad: 'yavaş: yanlış sorular; Nazlı kayıp, Rıza Rosario\'da; Bruno\'nun sözü',
    ek: { ekip_riza: true, geceBolunme: 'ferrante', nazliIceri: 'evet', zehraIz: 'iskele', melekKarar: 'sus', brunoSon40: 'kacti' },
    deliller: [],
    sorular: [['despina41', 'Zehra Hanım bu eve'], ['despina41', 'Hafız Efendi neden'], ['despina41', 'Hafız Efendi\'nin defterinde'], ['katip41', 'Zehra'], ['katip41', 'Ayşe'], ['rebeka41', 'Neslihan ninniyi']],
    saltiel: ['İfade imzalanmadı'], iskele: 'Bruno\'nun sözünü',
    beklenen: { iskeleSecim: 'bruno', saltielBruno: 'ad', yolculuk41: 'kara', rosario41: true },
    metin: ['Rıza Bey Buenos Aires\'te kaldı', 'Despina Hanım\'a uğramak gerek', 'Bazı cümleler yolda kalır', 'listeleri Belgrad\'da', 'Kaçmadı', 'Kara yoluna', 'iki anne var'],
    yok: ['Rıza Bey yanında'],
  },
  {
    ad: 'Cemil; anlat',
    ek: { ekip_riza: false, melekKarar: 'zarf', travma: 2 },
    deliller: [],
    sorular: [['despina41', 'Hafız Efendi\'nin defterinde'], ['rebeka41', 'Adı Zehra'], ['rebeka41', 'Neslihan ninniyi'], ['katip41', 'Ayşe']],
    iskele: 'O bahar neredeydin',
    beklenen: { iskeleSecim: 'anlat', yolculuk41: 'vapur', travma: 1 },
    metin: ['Cemil Bey yanında', 'adlarını sormadık'.replace('a', 'A'), 'Kırk kilometre', 'Melek henüz gitmedi'],
  },
];

for (const s of senaryolar) {
  test('kırk birinci bölüm: ' + s.ad, () => {
    const s40 = { ...M.yeniDurum(BOLUM40), gorunum: { tur: 'sahne', id: 'son' }, deliller: ['belge', ...s.deliller], cikarimlar: ['orgut'], bayraklar: { bolumBitti: true, ...s.ek } };
    expect(M.sahneBilgisi(BOLUM40, s40).secenekler.find((x) => x.sonrakiBolum).sonrakiBolum).toBe('bolum41');
    let d = M.bolumeGec(B, s40);
    const metinler = [];
    const topla = () => metinler.push([].concat(M.sahneBilgisi(B, d).paragraflar).join(' '));
    topla();
    d = sahneGec(d);
    expect(d.mekan).toBe('selanik41');
    for (const k of M.mekanBilgisi(B, d).kisiler) metinler.push([].concat(M.dugumBilgisi(B, M.konusmaBaslat(B, d, k)).soz).join(' '));
    if (s.saltiel) {
      let r = sor(d, 'saltiel41', s.saltiel[0]); d = r.d; metinler.push(r.cevap);
      if (s.saltiel[1]) {
        const sec = M.dugumBilgisi(B, d).secenekler.find((x) => x.etiket.startsWith(s.saltiel[1]));
        r = M.secenekSec(B, d, sec); d = r.durum; metinler.push(r.cevap.join(' '));
      }
      d = bitir(d);
    }
    for (const [k, p] of s.sorular) { const r = sor(d, k, p); d = bitir(r.d); metinler.push(r.cevap); }
    expect(M.sayi(d, 'zaman41') < VAPUR_SINIRI).toBe(s.beklenen.yolculuk41 === 'vapur');
    d = baglan(d, 'rebeka_tanik', 'mubadele_kaydi');
    expect(d.gorunum.id).toBe('iskele41');
    topla(); d = sahneGec(d, s.iskele);
    topla(); d = sahneGec(d);
    topla(); d = sahneGec(d);
    expect(d.gorunum.id).toBe('son');
    for (const [k, v] of Object.entries(s.beklenen)) expect(k === 'travma' ? M.sayi(d, k) : M.bayrak(d, k)).toBe(v);
    const hepsi = metinler.join(' ');
    for (const m of s.metin) expect(hepsi).toContain(m);
    for (const m of s.yok || []) expect(hepsi).not.toContain(m);
  });
}

test('kırk birinci bölümde boş paragraf yok', () => {
  for (const id of Object.keys(B.sahneler)) {
    const d = { ...M.yeniDurum(B), gorunum: { tur: 'sahne', id } };
    expect(M.sahneBilgisi(B, d).paragraflar.every((p) => typeof p === 'string' && p.length > 0)).toBe(true);
  }
});
