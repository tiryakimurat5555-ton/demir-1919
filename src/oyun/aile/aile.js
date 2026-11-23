// Koloni nesilleri: evlilik, çocuklar, büyüme evreleri (belgeler/v5 Paket 4 bölüm 2-3, 5-6) ve koloniye giriş anonsu
// (Paket 16 bölüm 3).
//
// d.aile = { es, evlilikGun, tebrikBitis, yatak, kamaraGenis, aileEvi { bina: true }, soru { gun, cevap }, hamile [{ cift,
//   bitis }], cocuklar [{ ad, cinsiyet, dogum (gün), cift, meslek }], ciftler [{ a, b, gun }], onay [çift anahtarı],
//   sonGun, sonNobet, festival }
// Kaptan evliliği: aday Kademe 8+, Veysel ve Tina hariç; genişletilmiş kamara ya da bir aile evi; kültüre uygun sembol
// (Dünya: düğün yüzüğü; Malken ve dış köken: Altı Yıldız bağ tılsımı). Çocuk: evlilikten üç gün sonra, çocuk yatağı
// kurulu, eşin sorusuna "Evet" → 14 gün. Bir çift en çok iki çocuk; ikincisi ilki öğrenciyken.
// Evreler: bebek 0-14 gün (+5 moral doğumda), öğrenci 14-42 (okulda), genç çırak 42+ (koloninin eksik alanına işçi).
// NPC-NPC evliliği yalnız Kaptan evlendikten sonra ya da Kaptan'ın arabuluculuk onayıyla; Kaptan'ın Kademe 5+ dostu
// Kaptan evlenmeden başkasıyla evlenmez.
import * as Z from '../zaman';
import * as ZN from '../tonoflenya/zanaat';
import * as SB from '../tonoflenya/subay';
import * as YR from '../yerlesim/yerlesim';
import { YERLESIMCILER, YERLESIMCI_SIRASI } from '../yerlesim/veri';
import { SOSYAL_OCAKLAR, ocagi, ciftAnahtari } from '../yerlesim/ikili';

export const EVLILIK_KADEMESI = 8;
export const ROMANTIK_DEGIL = ['veysel', 'tina'];
export const BEKLEME_GUN = 14;
export const EVRE_OGRENCI = 14;
export const EVRE_CIRAK = 42;
export const EN_COK_COCUK = 2;
export const AILE_EVI_BEDELI = { kereste: 12, tugla: 15, cam: 4 };
export const KAMARA_GENIS_BEDELI = { kereste: 8, tugla: 8 };
export const COCUK_YATAGI_BEDELI = { kereste: 4, bitkisel_lif: 3, urun_pamuk_keten: 2 };
const AD_DUNYA = { k: ['Ada', 'Deniz', 'Ela', 'Mira', 'Nehir', 'Yaren', 'Lale', 'Su'], e: ['Arda', 'Kerem', 'Ozan', 'Tuna', 'Emir', 'Yiğit', 'Can', 'Rüzgâr'] };
const AD_MALKEN = { k: ['Ilyra', 'Saveth', 'Naira', 'Elyra', 'Thalis', 'Vinna'], e: ['Kaedor', 'Varin', 'Soren', 'Zhael', 'Taren', 'Olun'] };
// Genç çırakların meslekleri (Paket 4 3.3): koloninin nüfus sektörüne bir işçi
export const MESLEKLER = {
  ciftci: { ad: 'Çiftçi', sektor: 'tarim' },
  madenci: { ad: 'Madenci', sektor: 'sanayi' },
  teknisyen: { ad: 'Teknisyen', sektor: 'tersane' },
  sifaci: { ad: 'Şifacı', sektor: 'bilim' },
  izci: { ad: 'İzci', sektor: 'bilim' },
};
const ROL_MESLEK = { sorya: 'ciftci', elara: 'ciftci', kaelon: 'teknisyen', brom: 'teknisyen', halvar: 'teknisyen', torvok: 'madenci', lyris: 'sifaci', siravel: 'sifaci', nerissa: 'sifaci', zarek: 'izci', marcus: 'izci', mateo: 'izci', defne: 'sifaci', julian: 'izci' };

export function aile(d) {
  if (!d.aile) d.aile = { es: null, cocuklar: [], ciftler: [], hamile: [], aileEvi: {}, onay: [] };
  const a = d.aile;
  for (const k of ['cocuklar', 'ciftler', 'hamile', 'onay']) if (!a[k]) a[k] = [];
  if (!a.aileEvi) a.aileEvi = {};
  return a;
}
const varlik = (d, k) => YR.varlik(d, k);
const ekle = (d, k, n) => YR.varlikEkle(d, k, n);
const adi = (k) => YR.varlikAdi(k);
const bedelMetni = (b) => Object.keys(b).map((k) => b[k] + ' ' + adi(k)).join(', ');
function harca(d, b) {
  const e = Object.keys(b).filter((k) => varlik(d, k) < b[k]);
  if (e.length) return 'Eksik: ' + e.map((k) => b[k] - varlik(d, k) + ' ' + adi(k)).join(', ') + '.';
  for (const k of Object.keys(b)) ekle(d, k, -b[k]);
  return null;
}
const kisa = (id) => YERLESIMCILER[id].kisa;
const dunyaliMi = (id) => /Dünya/.test(YERLESIMCILER[id].kok || '');
export const sembol = (id) => (dunyaliMi(id) ? 'dugun_yuzugu' : 'bag_tilsimi');
const aileEviSayisi = (d) => Object.keys(aile(d).aileEvi).filter((b) => aile(d).aileEvi[b]).length;
const evHazir = (d) => !!aile(d).kamaraGenis || aileEviSayisi(d) > 0;
const evliMi = (d, id) => aile(d).es === id || aile(d).ciftler.some((c) => c.a === id || c.b === id);

// --- Yükseltmeler: aile evi, kamara, çocuk yatağı ---
export function aileEviKur(d, bina) {
  const a = aile(d);
  if (a.aileEvi[bina]) return { metin: 'Bu konutlar zaten aile evine yükseltildi.' };
  const e = harca(d, AILE_EVI_BEDELI);
  if (e) return { metin: 'Aile evi için ' + bedelMetni(AILE_EVI_BEDELI) + '. ' + e, ses: 'red' };
  a.aileEvi[bina] = true;
  return { metin: (bina === 'kubbe_ev' ? 'Kubbelerden biri' : 'Konutlardan biri') + ' aile evine dönüştü: geniş odalar, çocuk odası, sıcak bir mutfak köşesi. Evlilik ve doğum için yer açıldı.', ses: 'kur' };
}
export function kamaraGenislet(d) {
  const a = aile(d);
  if (a.kamaraGenis) return { metin: 'Kamara zaten genişletildi.' };
  const e = harca(d, KAMARA_GENIS_BEDELI);
  if (e) return { metin: 'Kamarayı genişletmek için ' + bedelMetni(KAMARA_GENIS_BEDELI) + '. ' + e, ses: 'red' };
  a.kamaraGenis = true;
  return { metin: 'Usta Veysel kamaranın duvarını yıktı, yeni bir oda ekledi: "Tek kişilik kamara artık bir yuva evlat."', ses: 'kur' };
}
export function yatakKur(d) {
  const a = aile(d);
  if (a.yatak) return { metin: 'Çocuk yatağı zaten kurulu.' };
  const e = harca(d, COCUK_YATAGI_BEDELI);
  if (e) return { metin: 'Çocuk yatağı için ' + bedelMetni(COCUK_YATAGI_BEDELI) + '. ' + e, ses: 'red' };
  a.yatak = true;
  return { metin: 'Kamaraya küçük ahşap bir çocuk yatağı kuruldu.', ses: 'kur' };
}

// --- Kaptanın evliliği ---
export function evlilikEngeli(d, id) {
  const a = aile(d);
  if (ROMANTIK_DEGIL.includes(id)) return id === 'veysel' ? 'Usta Veysel senin manevi baban; bağınız aile bağı.' : 'Tina koloninin resmi bireyi ve baş danışmanı; bağınız güven ve danışmanlık.';
  if (a.es) return a.es === id ? null : 'Evlisin; ' + kisa(id) + ' ile bağın dostluk yolundan sürüyor.';
  if (evliMi(d, id)) return kisa(id) + ' evli.';
  if (YR.kademe(d, id) < EVLILIK_KADEMESI) return 'Evlilik için Kademe ' + EVLILIK_KADEMESI + ' (Can Dostu) gerekir; şimdi ' + YR.kademe(d, id) + '.';
  if (!evHazir(d)) return 'Önce kamarayı genişlet ya da konutlardan birini aile evine yükselt.';
  if (varlik(d, sembol(id)) < 1) return kisa(id) + ' için ' + adi(sembol(id)) + ' gerekir: ' + (sembol(id) === 'dugun_yuzugu' ? 'atölyenin örsünde' : 'tapınağın tılsım masasında') + ' yapılır.';
  return null;
}
export function evlen(d, id) {
  const a = aile(d);
  const e = evlilikEngeli(d, id);
  if (e) return { metin: e, ses: 'red' };
  ekle(d, sembol(id), -1);
  a.es = id;
  a.evlilikGun = Z.gun(d);
  a.tebrikBitis = Z.gun(d) + 3;
  d.koloni.moral = Math.min(100, d.koloni.moral + 10);
  const oc = ocagi(id);
  const dostlar = oc ? SOSYAL_OCAKLAR[oc].uyeler.filter((x) => x !== id && YR.katildiMi(d, x)) : [];
  for (const x of dostlar) YR.puanEkle(d, x, 25, true);
  const zit = (YERLESIMCILER[id].catisma || []).filter((x) => YR.katildiMi(d, x));
  d.aileSon = (dunyaliMi(id) ? 'Meydanda Dünya usulü bir düğün: ' : 'Axelum Tapınağı\'nda altı yıldızın kutsaması: ') + kisa(id) + ' ' + adi(sembol(id)).toLowerCase() + ' karşısında gülümsüyor; çanlar çalıyor, koloni alkışlıyor. Koloninin morali on arttı.' + (dostlar.length ? ' ' + dostlar.map(kisa).join(', ') + ' küçük düğün hediyeleriyle geldi; sempatileri arttı.' : '') + (zit.length ? ' ' + kisa(zit[0]) + ' göz kırpıyor: "Onu idare etmek kolay olmayacak Kaptan."' : '') + ' Eşin akşamları kamaraya döner; sabahları seferden önce çay ve sıcak yemekle uğurlar.';
  d.sahne = 'aile_dugun';
  return { metin: '', ses: 'el_dugun' };
}

// --- Çocuk ---
const kaptanCocuklari = (d) => aile(d).cocuklar.filter((c) => c.cift === 'kaptan');
export const yasi = (d, c) => Z.gun(d) - c.dogum;
export function evre(d, c) {
  const y = yasi(d, c);
  return y < EVRE_OGRENCI ? 'bebek' : y < EVRE_CIRAK ? 'ogrenci' : 'cirak';
}
export const EVRE_ADI = { bebek: 'bebek', ogrenci: 'öğrenci', cirak: 'genç çırak' };
function cocukEngeli(d, cift) {
  const a = aile(d);
  const l = a.cocuklar.filter((c) => c.cift === cift);
  if (l.length >= EN_COK_COCUK) return 'En çok iki çocuk.';
  if (l.length && evre(d, l[l.length - 1]) === 'bebek') return 'İkinci çocuk, ilki öğrenci olunca.';
  if (a.hamile.some((h) => h.cift === cift)) return 'Bir bebek zaten yolda.';
  return null;
}
export function cocukSorusuHazir(d) {
  const a = aile(d);
  if (!a.es || !a.yatak) return false;
  if (Z.gun(d) - a.evlilikGun < 3) return false;
  return !cocukEngeli(d, 'kaptan');
}
export function cocukCevap(d, evet) {
  const a = aile(d);
  a.soru = { gun: Z.gun(d), cevap: evet };
  if (!evet) return { metin: kisa(a.es) + ' elini tutuyor: "Acelemiz yok Kaptan. Hazır olduğunda yine konuşuruz."' };
  if (!cocukSorusuHazir(d)) return { metin: cocukEngeli(d, 'kaptan') || 'Şimdi değil.', ses: 'red' };
  a.hamile.push({ cift: 'kaptan', bitis: Z.gun(d) + BEKLEME_GUN });
  return { metin: kisa(a.es) + ' gözleri dolu: "O zaman bir mevsim sonra yeni bir ses olacak bu kamarada." Dr. Lyris rutin kontrollere başlayacak; ' + BEKLEME_GUN + ' gün sonra.', ses: 'el_secim' };
}
function adUret(d, kok, cinsiyet) {
  const a = aile(d);
  const l = (kok === 'Dünya' ? AD_DUNYA : AD_MALKEN)[cinsiyet];
  const kullanilan = a.cocuklar.map((c) => c.ad);
  return l.find((x, i) => !kullanilan.includes(x) && ((d.tohum || 0) + a.cocuklar.length + i) % 2 === 0) || l.find((x) => !kullanilan.includes(x)) || l[0] + ' ' + (a.cocuklar.length + 1);
}
function dogum(d, h) {
  const a = aile(d);
  const ebeveyn = h.cift === 'kaptan' ? [a.es] : h.cift.split('|');
  const cinsiyet = (Z.gun(d) + a.cocuklar.length) % 2 ? 'k' : 'e';
  const ad = adUret(d, ebeveyn.some(dunyaliMi) ? 'Dünya' : 'Malken', cinsiyet);
  const c = { ad, cinsiyet, dogum: Z.gun(d), yilGunu: Z.yilGunu(d), cift: h.cift, meslek: null };
  a.cocuklar.push(c);
  d.koloni.nufus.toplam += 1;
  d.koloni.moral = Math.min(100, d.koloni.moral + 5);
  const kim = h.cift === 'kaptan' ? 'Senin ve ' + kisa(a.es) + '\'in' : ebeveyn.map(kisa).join(' ile ') + '\'nın';
  return { tur: 'dogum', metin: 'Kolonide sevinç anonsu: ' + kim + ' ' + (cinsiyet === 'k' ? 'kızı' : 'oğlu') + ' ' + ad + ' dünyaya geldi! Doğum günü takvime ' + Z.takvimMetni(d) + ' olarak yazıldı. Koloninin morali beş arttı.' };
}
// Genç çırak: ebeveynin mesleği ya da kolonide en az işçisi olan alan
function meslekSec(d, c) {
  const ebeveyn = c.cift === 'kaptan' ? [aile(d).es] : c.cift.split('|');
  const m = ebeveyn.map((x) => ROL_MESLEK[x]).find(Boolean);
  if (m && (Z.gun(d) + c.ad.length) % 2 === 0) return m;
  const n = d.koloni.nufus;
  return Object.keys(MESLEKLER).sort((x, y) => (n[MESLEKLER[x].sektor] || 0) - (n[MESLEKLER[y].sektor] || 0))[0];
}

// --- NPC-NPC evliliği ---
export function ciftAday(d, a, b) {
  const A = aile(d);
  if (a === b || !YR.katildiMi(d, a) || !YR.katildiMi(d, b)) return false;
  if (ROMANTIK_DEGIL.includes(a) || ROMANTIK_DEGIL.includes(b)) return false;
  if (evliMi(d, a) || evliMi(d, b)) return false;
  const onay = A.onay.includes(ciftAnahtari(a, b));
  if (!A.es && !onay && (YR.kademe(d, a) >= 5 || YR.kademe(d, b) >= 5)) return false;
  return !!(A.es || onay);
}
function ciftKapasitesi(d) {
  return aileEviSayisi(d) * 3 - (aile(d).es && !aile(d).kamaraGenis ? 1 : 0);
}
export function arabuluculukAdaylari(d) {
  const l = [];
  const kat = (d.yer && d.yer.katilan) || [];
  for (let i = 0; i < kat.length; i++)
    for (let j = i + 1; j < kat.length; j++) {
      const a = kat[i];
      const b = kat[j];
      if (ROMANTIK_DEGIL.includes(a) || ROMANTIK_DEGIL.includes(b) || evliMi(d, a) || evliMi(d, b)) continue;
      const u = (d.yer.uyum && d.yer.uyum[ciftAnahtari(a, b)]) || 0;
      if (u >= 20 || (YERLESIMCILER[a].yakin || []).includes(b)) l.push([a, b]);
    }
  return l;
}
export function arabuluculukOnayla(d, a, b) {
  const A = aile(d);
  const k = ciftAnahtari(a, b);
  if (!A.onay.includes(k)) A.onay.push(k);
  return { metin: kisa(a) + ' ile ' + kisa(b) + ' arasında arabuluculuk ettin; birbirlerine yakınlar. Aile evinde yer olunca evlenebilirler.' };
}

// --- Gün başı ve nöbet ---
export function aileIlerle(d) {
  if (!d.koloni || !d.zaman || !d.yer) return [];
  const a = aile(d);
  const olaylar = [];
  const g = Z.gun(d);
  if (a.sonGun !== g) {
    const ilk = a.sonGun == null;
    a.sonGun = g;
    if (!ilk) olaylar.push(...gunBasi(d));
  }
  const n = Z.nobetNo(d);
  if (a.sonNobet !== n) {
    const once = a.sonNobet;
    a.sonNobet = n;
    // Gümüş Şafak: eş seferden önce destek verir
    if (once != null && n === 0 && a.es) {
      if (d.saha) d.saha.yorgunluk = 0;
      if (!d.seferEtki) d.seferEtki = {};
      d.seferEtki.peksimet = Math.max(d.seferEtki.peksimet || 0, 1);
      SB.haber(d, kisa(a.es) + ' sabah çayını demledi, çantana sıcak ekmek koydu: yorgunluğun gitti, seferde besin yorgunluğu olmaz.');
    }
    // Akşam: çocuk sorusu (bir kez haber; cevap kamarada)
    if (once != null && n === 4 && cocukSorusuHazir(d) && !(a.soru && a.soru.gun === g) && a.soruHaber !== g) {
      a.soruHaber = g;
      SB.haber(d, kisa(a.es) + ' akşam kamarada seninle konuşmak istiyor.');
    }
  }
  // Festival başında çocuk korosu (Paket 4 bölüm 5)
  const f = d.festival && d.festival.aktif;
  if (f && a.festival !== f) {
    a.festival = f;
    const koro = a.cocuklar.filter((c) => evre(d, c) !== 'bebek').length;
    if (koro) {
      const ek = koro * (f === 'ekmek' || f === 'alti_yildiz' ? 3 : 2);
      d.koloni.moral = Math.min(100, d.koloni.moral + ek);
      SB.haber(d, 'Çocuk korosu festivalin şarkısını söylüyor; moral ' + ek + ' arttı.');
    }
  } else if (!f) a.festival = null;
  return olaylar;
}
function gunBasi(d) {
  const a = aile(d);
  const g = Z.gun(d);
  const olaylar = [];
  // Doğumlar
  for (const h of a.hamile.slice()) {
    if (g >= h.bitis) {
      a.hamile = a.hamile.filter((x) => x !== h);
      olaylar.push(dogum(d, h));
    }
  }
  // Evre geçişleri ve doğum günleri
  for (const c of a.cocuklar) {
    const e = evre(d, c);
    if (e === 'cirak' && !c.meslek) {
      c.meslek = meslekSec(d, c);
      const s = MESLEKLER[c.meslek].sektor;
      d.koloni.nufus[s] = (d.koloni.nufus[s] || 0) + 1;
      SB.haber(d, c.ad + ' okuldan mezun oldu! Öğretmen Defne gururlu. Artık genç ' + MESLEKLER[c.meslek].ad.toLowerCase() + ' olarak koloniye çalışıyor.');
    }
    if (c.dogum !== g && Z.yilGunu(d) === c.yilGunu) {
      d.koloni.moral = Math.min(100, d.koloni.moral + 15);
      SB.haber(d, 'Bugün ' + c.ad + '\'nın doğum günü! Meydanda kutlama; moral on beş arttı. Ahşap oyuncak ya da börek iyi bir hediye olur.');
    }
  }
  // Düğün tebrikleri (üç gün)
  if (a.es && a.tebrikBitis && g <= a.tebrikBitis) {
    const l = (d.yer.katilan || []).filter((x) => x !== a.es && !ROMANTIK_DEGIL.includes(x));
    if (l.length) SB.haber(d, kisa(l[g % l.length]) + ': "Mutluluklar Kaptan! ' + kisa(a.es) + ' ile çok yakışıyorsunuz."');
  }
  // NPC çiftleri: evlilik (haftada en çok bir) ve çocuk
  if (ciftKapasitesi(d) > a.ciftler.length && g % 7 === 0) {
    const aday = arabuluculukAdaylari(d).find(([x, y]) => ciftAday(d, x, y));
    if (aday) {
      a.ciftler.push({ a: aday[0], b: aday[1], gun: g });
      d.koloni.moral = Math.min(100, d.koloni.moral + 10);
      olaylar.push({ tur: 'dugun', metin: kisa(aday[0]) + ' ile ' + kisa(aday[1]) + ' evlendi! Meydanda çanlar, alkışlar; koloninin morali on arttı.' });
    }
  }
  for (const c of a.ciftler) {
    const k = ciftAnahtari(c.a, c.b);
    if (g - c.gun >= 3 && !cocukEngeli(d, k) && (g + c.a.length) % 5 === 0) a.hamile.push({ cift: k, bitis: g + BEKLEME_GUN });
  }
  // İlan panosunun "evlilik hazırlığı dedikodusu" şablonu
  a.yakinEvlilik = !a.es && (d.yer.katilan || []).some((x) => !ROMANTIK_DEGIL.includes(x) && YR.kademe(d, x) >= EVLILIK_KADEMESI - 1);
  return olaylar;
}

// --- Menüler ---
export function cocuklarMetni(d, sadece) {
  const l = aile(d).cocuklar.filter((c) => !sadece || evre(d, c) === sadece);
  if (!l.length) return 'Kolonide henüz çocuk yok.';
  return l.map((c) => c.ad + ', ' + EVRE_ADI[evre(d, c)] + ', ' + yasi(d, c) + ' günlük' + (c.meslek ? ', ' + MESLEKLER[c.meslek].ad.toLowerCase() : evre(d, c) === 'ogrenci' ? ', ' + MESLEKLER[meslekSec(d, c)].ad.toLowerCase() + ' olmaya hazırlanıyor' : '')).join('; ') + '.';
}
export function aileMenu(d) {
  const a = aile(d);
  const o = [];
  o.push({ id: 'es', etiket: a.es ? 'Eşin: ' + YERLESIMCILER[a.es].ad : 'Evli değilsin', yap: () => ({ metin: a.es ? kisa(a.es) + ' ile ' + (Z.gun(d) - a.evlilikGun) + ' gündür evlisin.' : 'Kademe 8\'deki bir yerleşimciyle, uygun sembolle ve hazır bir evle evlenebilirsin.' }) });
  o.push({ id: 'cocuklar', etiket: 'Çocuklar: ' + a.cocuklar.length + (a.hamile.length ? ', ' + a.hamile.length + ' bebek yolda' : ''), yap: (x) => ({ metin: cocuklarMetni(x) }) });
  o.push({ id: 'ciftler', etiket: 'Evli çiftler: ' + a.ciftler.length, yap: () => ({ metin: a.ciftler.length ? a.ciftler.map((c) => kisa(c.a) + ' ve ' + kisa(c.b)).join('; ') + '.' : 'Henüz evli çift yok.' }) });
  o.push({ id: 'evler', etiket: 'Aile evleri: ' + aileEviSayisi(d) + (a.kamaraGenis ? ', kamara genişletildi' : ''), yap: () => ({ metin: 'Konut ve kubbelerin köşesinden aile evine yükseltilir: ' + bedelMetni(AILE_EVI_BEDELI) + '. Her aile evi üç çifte yuva.' }) });
  const ad = arabuluculukAdaylari(d).filter(([x, y]) => !a.onay.includes(ciftAnahtari(x, y)));
  if (ad.length) o.push({ id: 'arabulucu', etiket: 'Arabuluculuk: birbirine yakın çiftler (' + ad.length + ')', alt: (x) => ({ baslik: 'Arabuluculuk', giris: 'Onay verdiğin çiftler, aile evinde yer olunca evlenebilir.', ogeler: ad.map(([p, q]) => ({ id: p + q, etiket: kisa(p) + ' ve ' + kisa(q), yap: (z) => arabuluculukOnayla(z, p, q), geri: true })) }) });
  return { baslik: 'Aile ve nesiller', giris: 'Nüfus ' + d.koloni.nufus.toplam + '. ' + cocuklarMetni(d), ogeler: o };
}
// Yerleşimcinin konuşma menüsü: evlilik teklifi
YR.KISI_EKLERI.push((d, id) => {
  const a = aile(d);
  if (a.es || ROMANTIK_DEGIL.includes(id) || evliMi(d, id) || YR.kademe(d, id) < EVLILIK_KADEMESI) return [];
  return [{ id: 'evlen', etiket: 'Evlenme teklif et (' + adi(sembol(id)) + ')', ipucu: evlilikEngeli(d, id) || 'Her şey hazır.', yap: (x) => evlen(x, id) }];
});
YR.PANEL_EKLERI.push((d) => [{ id: 'aile', etiket: 'Aile ve nesiller', alt: (x) => aileMenu(x) }]);

// --- Nokta eylemleri ---
export function ekEylemler(d, id) {
  const a = aile(d);
  const l = [];
  if ((id === 'yb_dunya_konut' || id === 'yb_kubbe_ev') && !a.aileEvi[id.slice(3)]) l.push({ id: 'ai_ev', etiket: 'Aile evine yükselt: ' + bedelMetni(AILE_EVI_BEDELI) });
  if (id === 'kamara_yatak') {
    if (!a.kamaraGenis) l.push({ id: 'ai_kamara', etiket: 'Kamarayı genişlet: ' + bedelMetni(KAMARA_GENIS_BEDELI) });
    if (a.es && !a.yatak) l.push({ id: 'ai_yatak', etiket: 'Çocuk yatağı kur: ' + bedelMetni(COCUK_YATAGI_BEDELI) });
    if (cocukSorusuHazir(d) && !(a.soru && a.soru.gun === Z.gun(d))) l.push({ id: 'ai_soru', etiket: kisa(a.es) + ' seninle konuşmak istiyor' });
  }
  if ((id === 'yb_okul' || id === 'yb_dunya_konut' || id === 'yb_kubbe_ev') && a.cocuklar.length) l.push({ id: 'ai_cocuk', etiket: 'Çocuklar' });
  return l;
}
export const ekEylemMi = (e) => e.indexOf('ai_') === 0;
export function eylemUygula(d, id, e) {
  const a = aile(d);
  if (e === 'ai_ev') return aileEviKur(d, id.slice(3));
  if (e === 'ai_kamara') return kamaraGenislet(d);
  if (e === 'ai_yatak') return yatakKur(d);
  if (e === 'ai_cocuk') return { metin: cocuklarMetni(d, id === 'yb_okul' ? 'ogrenci' : null) };
  if (e === 'ai_soru')
    return {
      agac: () => ({
        baslik: kisa(a.es),
        giris: '"Artık bu koloniye kendi çocuğumuzu katmaya hazır mıyız Kaptan?"',
        ogeler: [
          { id: 'evet', etiket: 'Evet, hazırız', yap: (x) => cocukCevap(x, true), geri: true },
          { id: 'bekle', etiket: 'Şimdilik bekleyelim', yap: (x) => cocukCevap(x, false), geri: true },
        ],
      }),
    };
  return { metin: '' };
}
export const SAHNELER = {
  aile_dugun: {
    baslik: 'Düğün',
    efekt: ['el_dugun'],
    metin: (d) => [d.aileSon || ''],
    secenekler: () => [{ etiket: 'Kutlamaya katıl', sonra: null }],
  },
};

// --- Paket 16: ilk koloni adımında tanıtım anonsu ---
export function tanitim(d) {
  if (d.bayrak.p16Tanitim || !d.koloni.binalar.includes('yasam_blogu')) return;
  d.bayrak.p16Tanitim = true;
  SB.haber(d, 'Usta Veysel: "Kaptan, uzay uzun ve tehlikeli. Burayı sadece sığınak değil, bizi her seferden sonra ayağa kaldıracak gerçek bir yuva yaparsak gökyüzünde de sırtımız yere gelmez."');
}
void ZN;
void YERLESIMCI_SIRASI;
