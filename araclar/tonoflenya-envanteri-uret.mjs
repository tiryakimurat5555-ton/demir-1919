import '/home/claude/demir-1919/src/oyun/yuzey/gorevler.js';
import * as FN from '/home/claude/demir-1919/src/oyun/tonoflenya/final.js';
import * as YN from '/home/claude/demir-1919/src/oyun/tonoflenya/yan.js';
import * as KS from '/home/claude/demir-1919/src/oyun/tonoflenya/kisiler.js';
import * as AK from '/home/claude/demir-1919/src/oyun/tonoflenya/akademi.js';
import * as HK from '/home/claude/demir-1919/src/oyun/hikaye.js';
import * as ML from '/home/claude/demir-1919/src/oyun/tonoflenya/malken.js';
import * as TH from '/home/claude/demir-1919/src/oyun/tonoflenya/harita.js';
import * as AT from '/home/claude/demir-1919/src/oyun/tonoflenya/atlas.js';
import * as SB from '/home/claude/demir-1919/src/oyun/tonoflenya/subay.js';
import * as KR from '/home/claude/demir-1919/src/oyun/tonoflenya/kronik.js';
import * as BL from '/home/claude/demir-1919/src/oyun/tonoflenya/bolgesel.js';
import { MEKANLAR, NOKTALAR } from '/home/claude/demir-1919/src/oyun/yuzey/harita.js';
import { yeniOyun } from '/home/claude/demir-1919/src/oyun/durum.js';
import fs from 'fs';

const d = yeniOyun(7);
Object.assign(d.bayrak, { ygkKayit: true, tonoflenyaGoruldu: true });
const metin = (x) => {
  if (x == null) return '';
  if (typeof x === 'function') { try { return metin(x(d)); } catch (e) { return '(oyunun durumuna göre değişen metin)'; } }
  if (Array.isArray(x)) return x.map(metin).filter(Boolean).join(' ');
  if (typeof x === 'object') return x.metin ? metin(x.metin) : '';
  return String(x);
};
const mekanAdi = (m) => (MEKANLAR[m] ? MEKANLAR[m].ad : m);
const noktaYeri = (n) => (NOKTALAR[n] ? NOKTALAR[n].ad + ' (' + mekanAdi(NOKTALAR[n].mekan) + ')' : n);
const md = [];
const H = (n, t) => md.push('', '#'.repeat(n) + ' ' + t, '');
const P = (t) => t && md.push(t, '');
const L = (a) => { for (const x of a) if (x) md.push('- ' + x); md.push(''); };
const opAdlari = (op) => (op || []).map((a) => a.ad + (a.tur ? ' (' + a.tur + ')' : '')).join('; ');

md.push('# Tonoflenya envanteri: karakterler, görevler, hikâye sekansları', '');
P('Bu belge oyunun şu anki kodundan (sürüm 4.8) otomatik çıkarıldı; oyunda olan her şey burada olduğu gibi yazılıdır. Yeni büyü kolu ve akademi içeriğini hazırlarken çakışma olmasın diye başvuru kaynağıdır. Bölümler: 1 Tonoflenya\'ya bağlantı ve dönüş, 2 Mekânlar, 3 Karakterler, 4 Ana hikâye (yirmi büyük görev ve son), 5 Zirve İğnesi (4B), 6 YGK Akademisi, 7 Bölgesel lider zincirleri ve ambargo, 8 Otuz yan görev, 9 Kronikler, 10 Sistemler, 11 Yeni içerik için boş ve güvenli bağlantı noktaları.');

// 1
H(2, '1. Tonoflenya\'ya ilk bağlantı ve dönüş');
P('Tonoflenya\'ya gitmek için gereken üç koşul (Aethelis\'teki koloniden):');
L(ML.seferKosullari(yeniOyun(1)));
L([
  'Koşullar sağlanınca Gözcü Tepesi\'nde "YGK frekansını ara" eylemi açılır: frekans ayarı (hedef 32-48). Kilitlenince ygk_frekansi sahnesi oynar ve uzay haritasında YGK Feneri belirir.',
  'Gemiyle YGK Feneri\'ne gidip kenetlenince sıçrama başlar (8 saat; yolda zaman akar). Gemi Tonoflenya limanına iner, kaptan YGK Akademisi\'nin beşinci katında (gemi iskelesi) başlar.',
  'İlk varışta tonoflenya_varis sahnesi; sonraki gelişlerde tonoflenya_tekrar. Aethelis\'e dönüş YGK beşinci kattaki gemi iskelesinden (aethelis_donus sahnesi; plato).',
  'İlk varışta kabul masasından YGK kaydı yapılır (ygkKayit). Büyük görevlerin çoğu, yan görevler ve akademi bu kayda bağlıdır.',
]);
for (const s of ['ygk_frekansi', 'tonoflenya_varis', 'tonoflenya_tekrar', 'aethelis_donus']) {
  const sh = ML.SAHNELER[s];
  if (sh) { H(3, 'Sahne: ' + (sh.baslik || s)); P(metin(sh.metin)); }
}

// 2
H(2, '2. Mekânlar');
H(3, '2.1 Şehir ve akademi (yürünebilir mekânlar)');
L(Object.entries(TH.T_MEKANLAR).map(([id, m]) => '**' + m.ad + '** (' + id + '): ' + (m.tarif || '')));
H(3, '2.2 Atlas mekânları (bölge haritasıyla seyahat)');
L(Object.entries(AT.A_MEKANLAR).map(([id, m]) => '**' + m.ad + '** (' + id + '): ' + (m.tarif || '')));
H(3, '2.3 Atlas bölgeleri (34) kuşaklara göre');
for (const [k, ad] of Object.entries(AT.KUSAKLAR)) {
  const bl = Object.entries(AT.BOLGELER).filter(([, b]) => b.kusak === k);
  P('**' + ad + '**: ' + bl.map(([, b]) => b.ad).join(', ') + '.');
}
P('Seyahat rotaları: ' + Object.keys(AT.ROTALAR).length + ' rota (gün, yolculuk biçimi, tehlike). Tehlikeler: ' + Object.values(AT.TEHLIKELER).map((t) => t.ad || '').filter(Boolean).join(', ') + '.');

// 3
H(2, '3. Karakterler');
H(3, '3.1 Galaktik karakter ağı (14 kişi)');
L(KS.KARAKTER_SIRASI.map((id) => { const k = KS.KARAKTERLER[id]; return '**' + k.ad + '**, ' + k.unvan + ' (güç: ' + (KS.GUCLER[k.fraksiyon] || k.fraksiyon) + '; yer: ' + mekanAdi(k.yer && k.yer[0]) + (k.ygk ? '; akademiye misafir gelebilir' : '') + '). ' + (k.tarif || ''); }));
H(3, '3.2 Gemi subayları (altı ekol)');
L(SB.SUBAY_SIRASI.map((id) => { const s = SB.SUBAYLAR[id]; return '**' + s.ad + '** (' + s.koken + '; istasyon: ' + (SB.ISTASYONLAR[s.istasyon] ? SB.ISTASYONLAR[s.istasyon].ad : s.istasyon) + '). ' + (s.karakter || ''); }));
H(3, '3.3 YGK Akademisi kürsüleri ve tutsaklar (14)');
L(Object.entries(AK.AK_KISILER).map(([id, k]) => '**' + k.ad + '**, ' + k.unvan + ' (' + mekanAdi(k.kat) + (k.kosulMetni ? '; ' + k.kosulMetni : '') + '). ' + (k.tarif || '')));
H(3, '3.4 Şehirdeki görevliler (konuşulan noktalar)');
L(Object.values(NOKTALAR).filter((n) => n.malken).map((n) => '**' + n.ad + '** (' + mekanAdi(n.mekan) + ')' + (n.tarif ? ': ' + n.tarif : '')));
H(3, '3.5 Görev veren diğer kişiler');
P('Büyük görevlerde: ' + [...new Set(Object.values(FN.GOREVLER).map((g) => g.veren).filter(Boolean))].join('; ') + '.');
P('Yan görevlerde: ' + [...new Set(Object.values(YN.YAN).map((g) => g.npc).filter(Boolean))].join('; ') + '.');
H(3, '3.6 Güçler ve fraksiyonlar');
P('Beş büyük güç: ' + Object.values(KS.GUCLER).join(', ') + '. Yan görev fraksiyonları: ' + Object.values(YN.FRAKSIYONLAR).join(', ') + '.');

// 4
H(2, '4. Ana hikâye: yirmi büyük görev');
P('Görevler sırayla açılır; her biri bir önceki bitince ve kendi koşulu sağlanınca başlar. Yer, verenin adı, koşul, giriş metni, mini oyun adımları ve kararlar aşağıda.');
for (const g of Object.values(FN.GOREVLER)) {
  H(3, 'Büyük görev ' + g.no + ': ' + g.ad);
  L([
    'Yer: ' + g.konum + (g.nokta ? ' (nokta: ' + noktaYeri(g.nokta) + ')' : ''),
    g.veren && 'Veren: ' + g.veren,
    g.kosulMetni && 'Koşul: ' + g.kosulMetni,
    g.op && g.op.length && 'Mini oyun adımları: ' + opAdlari(g.op),
    g.savas && 'Çatışma: var' + (g.savasOnce ? ' (görevden önce)' : ''),
    'Tehlike: ' + g.tehlike + ' / 5',
  ]);
  P(metin(g.giris));
  if (g.kararlar && g.kararlar.length) L(g.kararlar.map((k) => 'Karar: ' + k.etiket + ' → ' + (k.sonuc || '')));
}
for (const s of ['tf_epilog', 'tf_krediler']) {
  const sh = FN.SAHNELER[s];
  if (sh) { H(3, 'Son sahne: ' + (sh.baslik || s)); P(metin(sh.metin)); }
}

// 5-7 hikâyeler
const hk = (id) => {
  const h = HK.HIKAYELER[id];
  H(3, (h.kod ? h.kod + ': ' : '') + h.ad);
  L([h.veren && 'Veren: ' + h.veren, h.gerek && 'Gerek: ' + metin(h.gerek), h.odul && 'Ödül: ' + metin(h.odul)]);
  P(metin(h.giris));
  (h.adimlar || []).forEach((a, i) => {
    const parca = a.op ? 'mini oyun (' + opAdlari(a.op) + ')' : a.savas ? 'çatışma' : a.karar ? 'karar' : 'adım';
    md.push('- Adım ' + (i + 1) + ': ' + parca + (a.bitis ? '. Sonu: ' + metin(a.bitis) : ''));
  });
  md.push('');
  if (h.kararlar) L(h.kararlar.map((k) => 'Karar: ' + k.etiket + (k.sonuc ? ' → ' + metin(k.sonuc) : '')));
};
H(2, '5. Zirve İğnesi (Aşama 4B)');
hk('zirve_ignesi');
H(2, '6. YGK Akademisi');
P('Katlar (yukarıdan aşağı): ' + TH.YGK_KATLARI.map(mekanAdi).join(', ') + '. Asansörle gezilir; bazı katlar büyük görev ilerledikçe açılır.');
P('Kürsü sınavları ve akademi hikâyeleri (her biri bir kez):');
for (const id of HK.HIKAYE_SIRASI.filter((x) => x.startsWith('ak_'))) hk(id);
H(2, '7. Bölgesel lider zincirleri ve ambargo');
for (const id of HK.HIKAYE_SIRASI.filter((x) => x.startsWith('bl_'))) hk(id);

// 8
H(2, '8. Otuz yan görev');
for (const g of Object.values(YN.YAN)) {
  H(3, g.kod + ': ' + g.ad);
  L([
    'Tür: ' + g.tur,
    'Yer: ' + (g.harita || g.yer),
    g.npc && 'Kişi: ' + g.npc,
    g.onkosul && g.onkosul.length && 'Ön koşul: ' + g.onkosul.map((o) => o[0]).join('; '),
    g.nobetMetni && 'Zaman: ' + g.nobetMetni,
    g.op && g.op.length && 'Mini oyun adımları: ' + opAdlari(g.op),
    g.savas && 'Çatışma: var',
  ]);
  P(metin(g.giris));
  if (g.kararlar) L(g.kararlar.map((k) => 'Karar: ' + k.etiket + ' → ' + (k.sonuc || '')));
}

// 9
H(2, '9. Kronikler (kadim tarihçe)');
L(Object.values(KR.KRONIKLER).filter(Boolean).map((k) => '**Bölüm ' + k.no + ': ' + k.baslik + '** (yer: ' + noktaYeri(k.yer) + '). ' + (k.ipucu || '')));
P('Çağlar: ' + Object.values(KR.CAGLAR).map((c) => c.ad || c.baslik || '').filter(Boolean).join(', ') + '.');

fs.writeFileSync('/tmp/env/govde.md', md.join('\n'));
console.log(md.length, 'satır');
