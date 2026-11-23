// Altı festival (v5 Paket 3A bölüm 3-6). Festivaller takvimde kendiliğinden geçmez: oyuncu Koloni Meydanı'nın
// terminalinden, kamaradaki duvar takviminden ya da Yerleşim sekmesinden başlatır.
//   Kurallar: bir festival bittikten sonra en az 5 oyun günü; her festivalin kendi döngüsü (mevsim / gün aralığı);
//   başlatmak için yiyecek ve malzeme katkısı; festival bir nöbet sürer.
//   Festival süresince: bütün katılmış yerleşimciler meydanda toplanır (konum.js), hediyeler iki kat sevindirir
//   (yerlesim.js ozelGunMu), meydanda "Festival alanı" açılır: yarışma (yüzey operasyonu ya da seçim), Sihirli Fener
//   Çarkı ve Büyülü İllüzyon Tahmini standları. Ana gezegenin dış mekânlarında mekânın ortam sesi yerine festivalin
//   kendi müziği döngüyle çalar (mekanOrtami; bina içleri, maden, vaha gibi girilen yerler hariç).
//
// d.festival = { aktif: id | null, bitis: yıldız sn, kazandi, yarismaYapildi, stand {cark, illuzyon}, son { id: { gun, yil } },
//                sonBitisGun }
import * as Z from '../zaman';
import { YERLESIMCILER, YERLESIMCI_SIRASI, DEKORLAR } from './veri';
import { katildiMi, yerVar } from './konum';
import * as YR from './yerlesim';
import * as ZN from '../tonoflenya/zanaat';
import * as SB from '../tonoflenya/subay';
import { OPERASYONLAR } from '../veri/uzayGorevleri';
import { HIBRITLER, BITKILER } from '../tarim/bitkiler';
import { MEKANLAR } from '../yuzey/harita';

export const GENEL_BEKLEME_GUN = 5;

// Ana gezegenin festival müziğinin çaldığı dış mekânlar (bina içleri, mağara, tünel, vaha, kapsül hariç)
export const DIS_MEKANLAR = ['vadi', 'sirtlar', 'krater', 'plato', 'dogu', 'civa', 'lav', 'mantar', 'obsidyen', 'kuleler', 'vanguard', 'meydan', 'gozlem', 'iskele'];

const tesisVar = (d, t) => d.koloni.binalar.includes(t);
const katilanSayisi = (d) => (d.yer ? d.yer.katilan.length : 0);
const A = (tur, ad, giris, bitis, ek = {}) => ({ tur, ad, giris, bitis, ...ek });

// Yiyecek katkısı: elindeki erzak ve hasat ürünlerinden, en bol olandan başlayarak
function yiyecekler(d) {
  const l = [];
  const t = d.tarim;
  if (t && t.erzak) for (const k of Object.keys(t.erzak)) if (t.erzak[k] > 0) l.push({ k: 'erzak_' + k, n: t.erzak[k] });
  if (t && t.urun) for (const k of Object.keys(t.urun)) if (t.urun[k] > 0) l.push({ k: 'urun_' + k, n: t.urun[k] });
  return l.sort((a, b) => b.n - a.n);
}
export function yiyecekToplam(d) {
  return yiyecekler(d).reduce((a, x) => a + x.n, 0);
}
function yiyecekHarca(d, n) {
  for (const x of yiyecekler(d)) {
    if (n <= 0) break;
    const al = Math.min(n, x.n);
    YR.varlikEkle(d, x.k, -al);
    n -= al;
  }
}

export const FESTIVALLER = {
  alti_yildiz: {
    ad: 'Altı Yıldızın Büyük Hizalanması',
    tur: 'Malken Büyük Şöleni',
    ses: 'festival_alti_yildiz',
    donem: 'Yılda bir kez, Ayaz Yörüngesi içinde (en güzeli 50-56. günler). En az 8 yerleşimci, meydan ve akademi gerekir.',
    kosul: (d) => (Z.mevsimNo(d) !== 3 ? 'Yalnız Ayaz Yörüngesi\'nde (yılın 43-56. günleri) yapılır.' : katilanSayisi(d) < 8 ? 'Kolonide en az sekiz yerleşimci olmalı; şimdi ' + katilanSayisi(d) + '.' : !tesisVar(d, 'akademi') && !(d.bayrak && d.bayrak.koloniArsivi) ? 'Akademi ya da koloni arşivi kurulu olmalı.' : null),
    dongu: 'yil',
    katki: { yiyecek: 12, kristal: 4 },
    atmosfer: 'Altı yıldız gökte tek bir çizgiye yaklaşıyor. Sorya, Kaelon, Lyris ve Zarek altı yıldızın renklerinde fenerler yakıyor; gökten altı notalı dev bir çan akoru iniyor, meydanda yüzlerce ses tek bir ilahide birleşiyor.',
    onculer: ['sorya', 'kaelon', 'lyris', 'zarek', 'torvok', 'nerissa'],
    yarisma: { ad: 'Yıldız Akordu', tarif: 'Altı notalı yıldız melodisini dinleyip aynı sırayla tekrar et.', op: 'fs_alti_yildiz' },
    odulMetni: 'Bütün yerleşimcilere elli yakınlık, moral yüzde yüz, beş yüz evren itibarı ve bir hafta Altı Yıldız Bereketi (üretim, tarım ve savaş hasarı yüzde on fazla).',
  },
  varek: {
    ad: 'Varek Ocak ve Çekiç Bayramı',
    tur: 'Malken sanayi ve dayanıklılık festivali',
    ses: 'festival_varek',
    donem: 'Her Kor Yörüngesi\'nde ya da on dört günde bir. Atölye ya da dökümhane gerekir.',
    kosul: (d) => (!yerVar(d, 'atolye') && !tesisVar(d, 'dokumhane') ? 'Atölye ya da dökümhane kurulu olmalı.' : null),
    dongu: 'kor14',
    katki: { yiyecek: 6, bazalt: 10 },
    atmosfer: 'Kaelon ve Torvok örsleri meydana çekmiş. Çekiç darbeleri bir davul temposu tutuyor, körükler üflüyor, naralar yükseliyor; ateşin ve dövülen demirin bayramı.',
    onculer: ['kaelon', 'torvok', 'brom'],
    yarisma: { ad: 'En Sağlam Dövme Yarışması', tarif: 'Üç aşama: kızdır, döv, suya daldır. Ritmi tut.', op: 'fs_varek' },
    odulMetni: 'Yarışmayı kazanırsan Kaelon, Torvok ve Brom\'a otuz yakınlık, bir nadir alaşım ve üç gün dökümhane ile tersane maliyetleri yüzde on beş az.',
  },
  axira: {
    ad: 'Axira Işık ve Tohum Gecesi',
    tur: 'Malken biyo-yenilenme festivali',
    ses: 'festival_axira',
    donem: 'Yılda bir kez, Filiz Yörüngesi içinde. Sera ya da mutfak gerekir.',
    kosul: (d) => (Z.mevsimNo(d) !== 0 ? 'Yalnız Filiz Yörüngesi\'nde (yılın 1-14. günleri) yapılır.' : !tesisVar(d, 'sera') && !tesisVar(d, 'koloni_mutfagi') && !(d.bayrak && d.bayrak.sondaj) ? 'Sera ya da koloni mutfağı gerekir.' : null),
    dongu: 'yil',
    katki: { yiyecek: 6, tohum: 1 },
    atmosfer: 'Lyris ve Sorya yeni tohumları kutsuyor. Fosforlu mantarlar ve çiçekler meydanı aydınlatıyor; yapraklar hışırdıyor, su şırıldıyor, kristal çanlar sakin sakin tınlıyor.',
    onculer: ['lyris', 'sorya', 'siravel', 'julian'],
    yarisma: { ad: 'En İyi Hibrit Meyve ve İksir Sergisi', tarif: 'Serandan ya da mutfağından en iyi bir ürünü seç ve sun.', sergi: true },
    odulMetni: 'Sunduğun ürüne göre Lyris, Sorya, Sira-Vel ve Julian\'a otuz beşe kadar yakınlık, iki nadir hibrit tohum ve üç gün tarım yüzde otuz hızlı.',
  },
  elyndra: {
    ad: 'Elyndra ve Uma Sessiz Yankı Gecesi',
    tur: 'Malken anma ve seyyah festivali',
    ses: 'festival_elyndra',
    donem: 'Yılda bir kez, Sis Yörüngesi içinde. Gözlem Tepesi ya da taverna gerekir.',
    kosul: (d) => (Z.mevsimNo(d) !== 2 ? 'Yalnız Sis Yörüngesi\'nde (yılın 29-42. günleri) yapılır.' : !yerVar(d, 'gozlem') && !yerVar(d, 'taverna') ? 'Gözlem Tepesi ya da taverna kurulu olmalı.' : null),
    dongu: 'yil',
    katki: { yiyecek: 4, kristal: 3 },
    atmosfer: 'Zarek ve Julian\'ın önünde, uzayda kaybolanların ve Tonoflenya\'da geride kalanların anısına sesli fenerler göğe bırakılıyor. Rüzgârda fener kâğıtları süzülüyor; hüzünlü bir çan melodisi, sonra derin sessizlik anları.',
    onculer: ['zarek', 'julian'],
    yarisma: { ad: 'Karanlıkta Yankı Bulma', tarif: 'Gözler kapalı; fenerin sesini önüne al ve üç feneri göğe bırak.', op: 'fs_elyndra' },
    odulMetni: 'Mürettebatın stresi sıfırlanır; bütün yerleşimcilere yirmi beş yakınlık, iki yüz elli evren itibarı ve bir Astral Odak İksiri.',
  },
  ekmek: {
    ad: 'Eski Dünya Ekmek ve Hasat Şükranı',
    tur: 'Vanguard-01 Dünya geleneği',
    ses: 'festival_ekmek',
    donem: 'Yirmi bir günde bir. Usta Veysel ya da Öğretmen Defne ve koloni mutfağı gerekir.',
    kosul: (d) => (!katildiMi(d, 'veysel') && !katildiMi(d, 'defne') ? 'Usta Veysel ya da Öğretmen Defne kolonide olmalı.' : !tesisVar(d, 'koloni_mutfagi') ? 'Koloni mutfağı kurulu olmalı.' : null),
    dongu: 21,
    katki: { yiyecek: 10 },
    atmosfer: 'Veysel, Defne ve Kaptan Marcus Eski Dünya\'nın hasat sofralarını hatırlıyor ve Malken komşularına tanıtıyor. Fırından çıkan ekmeğin çıtırtısı, büyük tahta masada tabak ve kaşık sesleri, çocuk gülüşmeleri.',
    onculer: ['veysel', 'defne', 'marcus', 'sorya'],
    yarisma: { ad: 'Ortak Sofra: Çorba ve Ekmek Ritmi', tarif: 'Sorya ile Veysel\'in iki mutfağı birleşiyor: hamuru ritimle yoğur, çorbayı ritimle karıştır.', op: 'fs_ekmek' },
    odulMetni: 'Dünya kökenlilere kırk, ötekilere yirmi yakınlık, beş yüksek kalorili sefer rasyonu ve yirmi beş moral.',
  },
  dunya_isigi: {
    ad: 'Dünya Işığı ve Yeni Yörünge Gecesi',
    tur: 'Vanguard-01 yıl dönümü',
    ses: 'festival_dunya_isigi',
    donem: 'Yirmi sekiz günde bir. Taverna ya da kamp ateşi yeter.',
    kosul: () => null,
    dongu: 28,
    katki: { yiyecek: 6 },
    atmosfer: 'Eski Dünya\'nın yılbaşı ve ateş başında hikâye geleneği. Müzik kutusu çalıyor, hediyeler el değiştiriyor, yeni yılın hedefleri konuşuluyor; kadeh tokuşturmaları ve kahkahalar.',
    onculer: ['marcus', 'mateo', 'julian'],
    yarisma: { ad: 'Taverna Zar Turnuvası', tarif: 'Kaptan Marcus ve Tüccar Mateo ile üç el zar.', zar: true },
    odulMetni: 'Turnuvayı kazanırsan beş yüz ile bin arası Galaktik Keşif Kredisi ve bir sesli kamara dekoru. Gecenin sonunda çekiliş: talihli bir yerleşimcinin bir sonraki sevdiği hediyesi iki kat sevindirir.',
  },
};
export const FESTIVAL_SIRASI = Object.keys(FESTIVALLER);

// Yarışma operasyonları (yüzey; tamamlanınca kazanılır, dayanıklılık biterse geri çekilinir ve festival sürdükçe yeniden denenir)
const yarismaKazanildi = (d) => {
  const f = durum(d);
  f.kazandi = true;
  f.yarismaYapildi = true;
  return {};
};
OPERASYONLAR.fs_alti_yildiz = {
  yuzey: true, final: 'festival', tekrar: true, sahne: 'fest_yarisma',
  adimlar: [A('ton', 'Yıldız Akordu', 'Gökten altı yıldızın çanları sırayla inecek. Basılı tutup dinle; sonra aynı sırayla aşağı kaydır kalın, çift dokun orta, yukarı kaydır tiz.', 'Altı nota gökte tamamlandı; meydan tek ses alkışlıyor.', { n: 6 })],
  sonuc: () => ['Yıldız akordunu kusursuz çaldın.'],
  odulFn: yarismaKazanildi,
};
OPERASYONLAR.fs_varek = {
  yuzey: true, final: 'festival', tekrar: true, sahne: 'fest_yarisma',
  adimlar: [
    A('ritim', 'Kızdırma', 'Körüğü bas: kısa aralıklarla dört kez tek dokun, ritmi bozma.', 'Demir kor gibi kızardı.', { n: 4 }),
    A('ritim', 'Dövme', 'Çekiç davulun temposunda: beş vuruş, aralıksız tek dokunuş.', 'Demir biçimini aldı.', { n: 5 }),
    A('ritim', 'Suya daldırma', 'Üç kısa dokunuşla demiri suya daldır, çıkar, daldır.', 'Tıslayarak sertleşti; en sağlam dövme senin.', { n: 3 }),
  ],
  sonuc: () => ['Torvok çekici omzuna atıyor: "Bu yılın en sağlam demiri Kaptan\'ın!"'],
  odulFn: (d) => {
    yarismaKazanildi(d);
    varekOdulu(d);
    return {};
  },
};
OPERASYONLAR.fs_elyndra = {
  yuzey: true, final: 'festival', tekrar: true, sahne: 'fest_yarisma',
  adimlar: [A('nisan', 'Sessiz Yankı', 'Gözlerin kapalı. Fenerin sesini sağa sola kaydırarak tam önüne al; önündeyken çift dokunup göğe bırak. Üç fener.', 'Üç fener de göğe yükseldi; meydan derin bir sessizliğe gömüldü.', { n: 3 })],
  sonuc: () => ['Üç fenerin sesi uzaklaşıp yıldızlara karıştı.'],
  odulFn: yarismaKazanildi,
};
OPERASYONLAR.fs_ekmek = {
  yuzey: true, final: 'festival', tekrar: true, sahne: 'fest_yarisma',
  adimlar: [
    A('ritim', 'Hamur', 'Veysel\'in taş fırını için hamuru yoğur: dört dokunuş, aynı ritimde.', 'Hamur fırına girdi.', { n: 4 }),
    A('ritim', 'Çorba', 'Sorya\'nın kazanı: üç dokunuşla karıştır.', 'Çorba kaynadı; iki mutfak tek sofrada.', { n: 3 }),
  ],
  sonuc: () => ['Veysel ekmeği bölüyor, Sorya çorbayı dağıtıyor; sofra iki dünyanın sofrası oldu.'],
  odulFn: yarismaKazanildi,
};

export function durum(d) {
  if (!d.festival) d.festival = { aktif: null, son: {}, sonBitisGun: -99 };
  if (!d.festival.son) d.festival.son = {};
  if (d.festival.sonBitisGun == null) d.festival.sonBitisGun = -99;
  return d.festival;
}
export function aktifMi(d) {
  return !!(d.festival && d.festival.aktif);
}

// Döngü şartı: null = hazır, metin = neden hazır değil
function donguEngeli(d, id) {
  const F = FESTIVALLER[id];
  const s = durum(d).son[id];
  const g = Z.gun(d);
  if (F.dongu === 'yil') return s && s.yil === Z.yil(d) ? 'Bu yıl zaten kutlandı; yılda bir kez.' : null;
  if (F.dongu === 'kor14') {
    if (!s) return null;
    if (Z.mevsimNo(d) === 1 && !(s.yil === Z.yil(d) && s.mevsim === 1)) return null;
    return g - s.gun >= 14 ? null : 'On dört günde bir; ' + (14 - (g - s.gun)) + ' gün daha var (Kor Yörüngesi\'nde ise mevsimde bir kez).';
  }
  if (!s) return null;
  return g - s.gun >= F.dongu ? null : F.dongu + ' günde bir; ' + (F.dongu - (g - s.gun)) + ' gün daha var.';
}
function katkiEksigi(d, id) {
  const k = FESTIVALLER[id].katki;
  const e = [];
  for (const m of Object.keys(k)) {
    const var_ = m === 'yiyecek' ? yiyecekToplam(d) : ZN.miktar(d, m);
    if (var_ < k[m]) e.push(k[m] - var_ + ' ' + (m === 'yiyecek' ? 'yiyecek' : ZN.adi(m)));
  }
  return e;
}
export function katkiMetni(id) {
  const k = FESTIVALLER[id].katki;
  return Object.keys(k).map((m) => k[m] + ' ' + (m === 'yiyecek' ? 'yiyecek (erzak ya da hasat ürünü)' : ZN.adi(m))).join(', ');
}
export function engel(d, id) {
  const f = durum(d);
  if (f.aktif) return FESTIVALLER[f.aktif].ad + ' sürüyor.';
  if (!yerVar(d, 'meydan')) return 'Festivaller Koloni Meydanı\'nda yapılır; önce meydan kurulmalı.';
  const g = Z.gun(d);
  if (g - f.sonBitisGun < GENEL_BEKLEME_GUN) return 'Son festivalden bu yana ' + (g - f.sonBitisGun) + ' gün geçti; en az beş gün geçmeli.';
  const k = FESTIVALLER[id].kosul(d);
  if (k) return k;
  const dg = donguEngeli(d, id);
  if (dg) return dg;
  const e = katkiEksigi(d, id);
  if (e.length) return 'Katkı eksik: ' + e.join(', ') + '.';
  return null;
}
export function hazirlar(d) {
  return FESTIVAL_SIRASI.filter((id) => !engel(d, id));
}

export function baslat(d, id) {
  const e = engel(d, id);
  if (e) return { metin: e, ses: 'red' };
  const F = FESTIVALLER[id];
  const f = durum(d);
  for (const m of Object.keys(F.katki)) {
    if (m === 'yiyecek') yiyecekHarca(d, F.katki[m]);
    else ZN.ekle(d, m, -F.katki[m]);
  }
  Object.assign(f, { aktif: id, bitis: d.zaman.sn + Z.NOBET_SN, kazandi: false, yarismaYapildi: false, stand: {}, sergi: null });
  f.son[id] = { gun: Z.gun(d), yil: Z.yil(d), mevsim: Z.mevsimNo(d) };
  return { metin: F.ad + ' başladı. ' + F.atmosfer + ' Bütün yerleşimciler meydanda; bu nöbet boyunca hediyeler iki kat sevindirir. Meydandaki festival alanında yarışma ve standlar seni bekliyor.', festival: id, kapat: true };
}

// Festival bitişi: katılım ödülleri ve özet (gorevler.zamanIlerle → ilerle)
export function ilerle(d) {
  const f = d.festival;
  if (!f || !f.aktif || d.zaman.sn < f.bitis) return null;
  const id = f.aktif;
  const metin = bitisOdulu(d, id);
  f.aktif = null;
  f.sonBitisGun = Z.gun(d);
  SB.haber(d, FESTIVALLER[id].ad + ' sona erdi. ' + metin);
  return { festivalBitti: id };
}
const yakinlik = (d, kim, n) => {
  for (const id of kim) if (katildiMi(d, id)) YR.puanEkle(d, id, n, true);
};
const herkes = (d) => (d.yer ? d.yer.katilan.slice() : []);
function bitisOdulu(d, id) {
  const f = d.festival;
  const k = d.koloni;
  if (id === 'alti_yildiz') {
    yakinlik(d, herkes(d), 50);
    k.moral = 100;
    d.itibar = (d.itibar || 0) + 500;
    Z.etkiKoy(d, 'bereket', 7 * Z.GUN_SN);
    let ek = '';
    if (d.bayrak.tonoflenyaGoruldu) {
      ZN.ekle(d, 'saf_aether', 2);
      ek = ' Tonoflenya köprüsünden gelen Malken misafirler sunağa iki saf aether bıraktı.';
    }
    return 'Bütün yerleşimcilerin yakınlığı arttı, moral doruğa çıktı, evren itibarı beş yüz arttı; bir hafta Altı Yıldız Bereketi.' + ek;
  }
  if (id === 'varek') return f.kazandi ? 'Dövme yarışmasının ödülleri alındı.' : 'Dövme yarışmasını kazanamadın; bayram yine de gönülleri ısıttı.';
  if (id === 'axira') return f.sergi ? 'Sergi ödülleri alındı; üç gün tarlalar daha hızlı.' : 'Sergiye ürün sunmadın; tohumlar yine de kutsandı.';
  if (id === 'elyndra') {
    for (const u of d.murettebat || []) u.stres = 0;
    yakinlik(d, herkes(d), 25);
    d.itibar = (d.itibar || 0) + 250;
    ZN.ekle(d, 'astral_iksir', 1);
    return 'Mürettebatın stresi sıfırlandı; herkesin yakınlığı arttı, iki yüz elli itibar ve bir Astral Odak İksiri.';
  }
  if (id === 'ekmek') {
    for (const x of herkes(d)) YR.puanEkle(d, x, /Dünya/.test(YERLESIMCILER[x].kok) ? 40 : 20, true);
    if (d.tarim && d.tarim.erzak) d.tarim.erzak.peksimet = (d.tarim.erzak.peksimet || 0) + 5;
    k.moral = Math.min(100, k.moral + 25);
    return 'Dünya kökenliler kırk, ötekiler yirmi yakınlık kazandı; beş sefer rasyonu ambara girdi, moral yirmi beş arttı.';
  }
  if (id === 'dunya_isigi') {
    const l = herkes(d).filter((x) => !YERLESIMCILER[x].sanal);
    if (!l.length) return '';
    const talihli = l[(Z.gun(d) * 7 + l.length) % l.length];
    YR.kayit(d, talihli).cekilis = true;
    return 'Çekilişin talihlisi ' + YR.adi(talihli) + ': bir sonraki sevdiği hediye iki kat sevindirecek.';
  }
  return '';
}
function varekOdulu(d) {
  yakinlik(d, ['kaelon', 'torvok', 'brom'], 30);
  d.koloni.parcalar.guclu_alasim = (d.koloni.parcalar.guclu_alasim || 0) + 10;
  Z.etkiKoy(d, 'dokumIndirim', 3 * Z.GUN_SN);
}

// --- Sergi (Axira): ürünün değeri yakınlığı belirler ---
function sergiAdaylari(d) {
  const l = [];
  const t = d.tarim;
  if (!t) return l;
  for (const k of Object.keys(t.urun || {})) if (t.urun[k] > 0) l.push({ k: 'urun_' + k, puan: HIBRITLER.some((h) => h.id === k) ? 35 : 20 });
  for (const k of Object.keys(t.erzak || {})) if (t.erzak[k] > 0) l.push({ k: 'erzak_' + k, puan: 28 });
  return l.sort((a, b) => b.puan - a.puan);
}
export function sergiSun(d, k, p) {
  const f = durum(d);
  if (f.yarismaYapildi) return { metin: 'Sergiye zaten bir ürün sundun.' };
  if (YR.varlik(d, k) < 1) return { metin: 'Elinde kalmadı.', ses: 'red' };
  YR.varlikEkle(d, k, -1);
  f.yarismaYapildi = true;
  f.kazandi = p >= 28;
  f.sergi = k;
  yakinlik(d, ['lyris', 'sorya', 'siravel', 'julian'], p);
  for (let i = 0; i < 2; i++) {
    const h = HIBRITLER[(Z.gun(d) + i) % HIBRITLER.length].id;
    if (d.tarim) d.tarim.tohumlar[h] = (d.tarim.tohumlar[h] || 0) + 1;
  }
  Z.etkiKoy(d, 'tarimHiz', 3 * Z.GUN_SN);
  const not = p >= 35 ? 'Lyris hayranlıkla eğiliyor: "Bu bir melez! Axira bunu görse gülümserdi."' : p >= 28 ? 'Sorya kokluyor: "Elinin emeği belli Kaptan."' : 'Sira-Vel nazikçe başını sallıyor: "Sade ama temiz."';
  return { metin: YR.varlikAdi(k) + ' sergide. ' + not + ' Dört yerleşimcinin yakınlığı arttı; iki nadir hibrit tohum aldın, üç gün tarlalar yüzde otuz hızlı.', ses: 'tarim_hasat' };
}

// --- Zar turnuvası (Dünya Işığı): üç el; her elde "güvenli at" ya da "riske gir" ---
function zarAt(d, n) {
  return 1 + Math.floor((Math.abs(Math.sin((d.tohum || 7) * 0.37 + Z.gun(d) * 13.1 + n * 7.7)) * 10000) % 6);
}
export function zarOyna(d, risk) {
  const f = durum(d);
  if (f.yarismaYapildi) return { metin: 'Turnuva bitti.' };
  if (!f.zar) f.zar = { el: 0, sen: 0, onlar: 0 };
  const z = f.zar;
  const i = z.el * 4;
  const a = zarAt(d, i + 1) + zarAt(d, i + 2);
  const b = zarAt(d, i + 3) + zarAt(d, i + 4);
  const sen = risk ? (a >= 7 ? a + 3 : a - 2) : a;
  z.el += 1;
  if (sen > b) z.sen += 1;
  else if (sen < b) z.onlar += 1;
  let m = (z.el) + '. el: zarların ' + a + (risk ? (a >= 7 ? ', risk tuttu: ' + sen : ', risk tutmadı: ' + sen) : '') + '; Marcus ile Mateo ' + b + '. ';
  m += sen > b ? 'Eli sen aldın.' : sen < b ? 'Eli onlar aldı.' : 'Berabere.';
  if (z.el >= 3 || z.sen >= 2 || z.onlar >= 2) {
    f.yarismaYapildi = true;
    if (z.sen > z.onlar) {
      f.kazandi = true;
      const gk = 500 + 100 * ((Z.gun(d) * 3) % 6);
      ZN.hazirla(d);
      d.para.gk += gk;
      const yok = Object.keys(DEKORLAR).filter((k) => !d.yer.dekorlar.includes(k));
      let ek;
      if (yok.length) {
        d.yer.dekorlar.push(yok[0]);
        ek = 'Mateo\'nun ödülü ' + DEKORLAR[yok[0]].ad + ' kamarandaki rafa kondu.';
      } else {
        d.koloni.parcalar.guclu_alasim = (d.koloni.parcalar.guclu_alasim || 0) + 10;
        ek = 'Rafın dolu; ödül yerine on nadir alaşım.';
      }
      return { metin: m + ' Turnuvayı kazandın! ' + gk + ' Galaktik Keşif Kredisi. ' + ek, ses: 'el_kasa' };
    }
    return { metin: m + ' Turnuvayı Marcus kazandı; kahkahalar tavanı sarsıyor. Çekiliş gecenin sonunda.', ses: 'imza_marcus_selam' };
  }
  return { metin: m + ' Skor ' + z.sen + ' - ' + z.onlar + '.', ses: 'dugme' };
}

// --- Standlar (bölüm 6): her festivalde birer kez ---
export function cark(d) {
  const f = durum(d);
  if (f.stand.cark) return { metin: 'Fener Çarkı\'nı bu festivalde çevirdin.' };
  f.stand.cark = true;
  const n = Math.floor(Math.abs(Math.sin(d.zaman.sn * 0.013 + 3)) * 4);
  let m;
  if (n === 0) {
    d.koloni.moral = Math.min(100, d.koloni.moral + 3);
    m = 'Mavi fener: kalabalık alkışlıyor, moral üç arttı.';
  } else if (n === 1 && d.yer.katilan.length) {
    const kim = d.yer.katilan[Math.floor(d.zaman.sn) % d.yer.katilan.length];
    YR.puanEkle(d, kim, 10, true);
    m = 'Altın fener: ' + YR.kisaAdi(kim) + ' sana bir fener hediye etti; yakınlığınız arttı.';
  } else if (n === 2) {
    ZN.hazirla(d);
    d.para.gk += 50;
    m = 'Kızıl fener: elli Galaktik Keşif Kredisi.';
  } else {
    d.koloni.kaynaklar.kristal = (d.koloni.kaynaklar.kristal || 0) + 1;
    m = 'Mor fener: içinden bir silikat kristali çıktı.';
  }
  return { metin: 'Sihirli Fener Çarkı dönüyor, yavaşlıyor, duruyor. ' + m, ses: 'el_cark' };
}
const ILLUZYON = ['sol', 'orta', 'sag'];
export function illuzyon(d, secim) {
  const f = durum(d);
  if (f.stand.illuzyon) return { metin: 'İllüzyon standında bu festivalde şansını denedin.' };
  f.stand.illuzyon = true;
  const dogru = ILLUZYON[Math.floor(Math.abs(Math.sin(Z.gun(d) * 5.3 + 1)) * 3) % 3];
  if (secim === dogru) {
    ZN.hazirla(d);
    d.para.gk += 60;
    d.koloni.moral = Math.min(100, d.koloni.moral + 2);
    return { metin: 'Kapak kalkıyor: ışık oradaydı! Altmış kredi ve iki moral.', ses: 'el_illuzyon' };
  }
  return { metin: 'Kapak kalkıyor: boş. Işık ' + (dogru === 'sol' ? 'soldaki' : dogru === 'orta' ? 'ortadaki' : 'sağdaki') + ' kapaktaydı. Kalabalık gülüşüyor.', ses: 'el_illuzyon' };
}

// --- Menüler ---
function durumSatiri(d, id) {
  const e = engel(d, id);
  return e ? 'Hazır değil: ' + e : 'Hazır. Katkı: ' + katkiMetni(id) + '. Başlatmak için çift dokun.';
}
export function festivalMenu(d) {
  const f = durum(d);
  const g = Z.gun(d);
  const gecen = g - f.sonBitisGun;
  const hz = hazirlar(d);
  return {
    baslik: 'Festivaller',
    giris: Z.takvimMetni(d) + ' ' + (f.aktif ? FESTIVALLER[f.aktif].ad + ' sürüyor. ' : hz.length ? 'Başlatılabilir: ' + hz.map((x) => FESTIVALLER[x].ad).join(', ') + '. ' : 'Şu an başlatılabilecek festival yok. ') + (f.sonBitisGun > 0 ? 'Son festivalden ' + gecen + ' gün geçti' + (gecen >= GENEL_BEKLEME_GUN ? ', hazır.' : '.') : ''),
    ogeler: [
      ...(f.aktif ? [{ id: 'alan', etiket: 'Festival alanı: ' + FESTIVALLER[f.aktif].ad, alt: (x) => alanMenu(x) }] : []),
      ...FESTIVAL_SIRASI.map((id) => ({
        id,
        etiket: FESTIVALLER[id].ad + '. ' + durumSatiri(d, id),
        ipucu: FESTIVALLER[id].tur + '. ' + FESTIVALLER[id].donem,
        alt: (x) => festivalKarti(x, id),
      })),
    ],
  };
}
function festivalKarti(d, id) {
  const F = FESTIVALLER[id];
  const e = engel(d, id);
  return {
    baslik: F.ad,
    giris: F.tur + '. ' + F.donem + ' ' + F.atmosfer + ' Etkinlik: ' + F.yarisma.ad + ', ' + F.yarisma.tarif + ' Ödül: ' + F.odulMetni,
    ogeler: [e ? { id: 'neden', etiket: 'Hazır değil: ' + e, yap: () => ({ metin: e }) } : { id: 'baslat', etiket: 'Festivali başlat. Katkı: ' + katkiMetni(id), yap: (x) => baslat(x, id) }],
  };
}
export function alanMenu(d) {
  const f = durum(d);
  if (!f.aktif) return { baslik: 'Festival alanı', giris: 'Şu an festival yok.', ogeler: [] };
  const F = FESTIVALLER[f.aktif];
  const kalan = Math.max(0, Math.ceil(Z.gercekSn(f.bitis - d.zaman.sn) / 60));
  const ogeler = [];
  if (!f.yarismaYapildi) {
    if (F.yarisma.op) ogeler.push({ id: 'yarisma', etiket: F.yarisma.ad + ': katıl', ipucu: F.yarisma.tarif, yap: (x) => yarismaBaslat(x) });
    if (F.yarisma.sergi) ogeler.push({ id: 'sergi', etiket: F.yarisma.ad + ': ürün sun', alt: (x) => sergiMenu(x) });
    if (F.yarisma.zar) ogeler.push({ id: 'zar', etiket: F.yarisma.ad + (f.zar ? ', skor ' + f.zar.sen + ' - ' + f.zar.onlar : ''), alt: (x) => zarMenu(x) });
  } else ogeler.push({ id: 'yapildi', etiket: F.yarisma.ad + ': ' + (f.kazandi ? 'kazandın' : 'tamamlandı'), yap: () => ({ metin: f.kazandi ? 'Yarışmanın birincisi sensin.' : 'Yarışmaya katıldın.' }) });
  if (!f.stand.cark) ogeler.push({ id: 'cark', etiket: 'Sihirli Fener Çarkı\'nı çevir', yap: (x) => cark(x), ses: 'el_cark' });
  if (!f.stand.illuzyon) ogeler.push({ id: 'illuzyon', etiket: 'Büyülü İllüzyon Tahmini', ipucu: 'Üç kapaktan birinin altında ışık var.', alt: (x) => illuzyonMenu(x) });
  ogeler.push({ id: 'kimler', etiket: 'Kutlamada kimler var?', yap: (x) => ({ metin: 'Meydanda: ' + (x.yer.katilan.map(YR.kisaAdi).join(', ') || 'kimse yok') + '. Onlara meydanda yürüyüp hediye verebilirsin; bugün hediyeler iki kat sevindirir.' }) });
  return { baslik: F.ad, giris: F.atmosfer + ' Bitmesine yaklaşık ' + kalan + ' dakika.', ogeler };
}
function yarismaBaslat(d) {
  const f = durum(d);
  if (!f.aktif || f.yarismaYapildi) return { metin: 'Yarışma yok.' };
  d.opBekle = FESTIVALLER[f.aktif].yarisma.op;
  return { metin: FESTIVALLER[f.aktif].yarisma.ad + ' başlıyor.', kapat: true };
}
function sergiMenu(d) {
  const l = sergiAdaylari(d);
  return {
    baslik: 'Sergi',
    giris: l.length ? 'Sunacağın ürünü seç. Melez ürünler en çok, işlenmiş ürünler daha çok beğenilir.' : 'Elinde sunacak hasat ürünü ya da erzak yok.',
    ogeler: l.slice(0, 12).map((x) => ({ id: x.k, etiket: YR.varlikAdi(x.k) + ', elinde ' + YR.varlik(d, x.k), geri: true, yap: (z) => sergiSun(z, x.k, x.puan) })),
  };
}
function zarMenu(d) {
  const f = durum(d);
  return {
    baslik: 'Zar turnuvası',
    giris: 'Üç el, iki eli alan kazanır. Güvenli atış zarın neyse odur; riskte yedi ve üstüne üç eklenir, altına iki düşülür.' + (f.zar ? ' Skor ' + f.zar.sen + ' - ' + f.zar.onlar + '.' : ''),
    ogeler: f.yarismaYapildi ? [] : [
      { id: 'guvenli', etiket: 'Güvenli at', yap: (x) => zarOyna(x, false) },
      { id: 'risk', etiket: 'Riske gir', yap: (x) => zarOyna(x, true) },
    ],
  };
}
function illuzyonMenu() {
  return {
    baslik: 'Büyülü İllüzyon Tahmini',
    giris: 'Sihirbaz üç kapağı karıştırıyor. Işık hangisinin altında?',
    ogeler: ILLUZYON.map((k) => ({ id: k, etiket: k === 'sol' ? 'Soldaki kapak' : k === 'orta' ? 'Ortadaki kapak' : 'Sağdaki kapak', geri: true, yap: (x) => illuzyon(x, k) })),
  };
}

// Mekânın ortam sesi: festival sürüyorsa ana gezegenin dış mekânlarında festivalin müziği; iskele gece ayrı
export function mekanOrtami(d, mekan) {
  const m = MEKANLAR[mekan];
  if (!m) return null;
  if (d && d.festival && d.festival.aktif && DIS_MEKANLAR.includes(mekan)) return FESTIVALLER[d.festival.aktif].ses;
  if (m.ortamGece && d && d.zaman && Z.nobetNo(d) >= 4) return m.ortamGece;
  return m.ortam;
}

// --- Noktalar ve eylemler ---
export function noktaMi(id) {
  return id === 'festival_alani';
}
export function noktaEylemleri() {
  return [{ id: 'fs_alan', etiket: 'Festival alanı' }, { id: 'incele', etiket: 'İncele' }];
}
export function ekEylemler(d, id) {
  if (id === 'meydan_terminali' || id === 'kamara_yatak' || id === 'terminal') return [{ id: 'fs_menu', etiket: 'Festivaller', ipucu: hazirlar(d).length ? 'Başlatılabilir festival var.' : '' }];
  return [];
}
export function ekEylemMi(eylemId) {
  return eylemId === 'fs_menu' || eylemId === 'fs_alan';
}
export function eylemUygula(d, id, eylemId) {
  if (eylemId === 'fs_menu') return { agac: (x) => festivalMenu(x) };
  if (eylemId === 'fs_alan') return { agac: (x) => alanMenu(x) };
  const f = durum(d);
  return { metin: f.aktif ? FESTIVALLER[f.aktif].atmosfer : 'Meydanın festival alanı; şu an sessiz.' };
}

export const SAHNELER = {
  fest_yarisma: {
    baslik: 'Festival yarışması',
    efekt: ['sinyal'],
    metin: (d) => {
      const f = durum(d);
      const F = f.aktif && FESTIVALLER[f.aktif];
      const op = d.opSon && OPERASYONLAR[d.opSon];
      return [...(op && op.sonuc ? op.sonuc(d) : []), F ? 'Kazandın. ' + (f.aktif === 'varek' ? 'Kaelon, Torvok ve Brom\'un yakınlığı arttı; on nadir alaşım ve üç gün dökümhane ile tersane yüzde on beş ucuz.' : 'Festivalin ödülleri gecenin sonunda dağıtılacak.') : ''];
    },
    secenekler: () => [{ etiket: 'Kutlamaya dön', sonra: null }],
  },
};

// Yerleşim panosu ve takvime festival öğesi
YR.PANEL_EKLERI.push((d) => [{ id: 'festivaller', etiket: 'Festivaller' + (aktifMi(d) ? ', ' + FESTIVALLER[d.festival.aktif].ad + ' sürüyor' : hazirlar(d).length ? ', başlatılabilir var' : ''), alt: (x) => festivalMenu(x) }]);
YR.TAKVIM_EKLERI.push((d) => [{ id: 'festivaller', etiket: 'Festivaller', alt: (x) => festivalMenu(x) }]);

// Kullanılmayan içe aktarmalar uyarı vermesin
void BITKILER;
void YERLESIMCI_SIRASI;
