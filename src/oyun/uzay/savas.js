// Evrensel savaş motoru: uzay, filo ve kara (yüzey) aynı reaktif akustik çekirdekte (belgeler/v4/evrensel-savas-
// sistemi-uzay-ve-kara.txt, dusman-davranis-modulleri-ve-item-karsiliklari.txt, somut-dusman-katalogu-ve-bosslar.txt;
// ilk sürüm belgeler/savas-yetenek-ve-murettebat-mekanikleri.md bölüm 1-4). Saf JavaScript.
//
// Tur: (1) oyuncu hamlesi: sağa-sola kaydır pruvayı ya da nişanı hedefin sesine çevir (birden çok düşmanda hangi sesin
// karşısındaysan o hedeftir); dokun birincil, yukarı kaydır ağır saldırı (iki tur dolum), iki parmakla çevir silah
// frekansını hedefin kalkan ya da zırh tonuna eşle. Kendi sırasında aşağı kaydır: yetenek ya da sarf seç, çift dokun:
// kullan. (2) etki. (3) sıradaki düşmanın uyarı sesi; pencere tehdit kademesine göre 3,0 ile 1,5 saniye arası: iki
// parmakla dokun kalkan/siper, sesin tersine kaydır kaçınma, mermi ya da torpidoya çift dokun karşı ateş, aşağı kaydır
// sahte gürültü (yetenek), üç parmakla dokun taktik ışınlanma (kabiliyet). (4) değerlendirme.
//
// Ortam: 'uzay' (amiral gemisi + destek yuvası; gövde ve kalkan) ya da 'kara' (kaptan + refakatçi subay ya da yüzey
// aracı; zırh bütünlüğü ve siper). Arızalar: itici/hareket (kaçınma yok), kalkan/siper (ısınır), reaktör (uzayda bütün
// savunma durur) ya da kask (karada stres iki kat hızlanır).
//
// d.savas = { ortam, gelis, dusmanlar [birim], hedef (dizin), dusman (etkin hedefe bağ; kayıttan sonra yeniden bağlanır),
//   silahFrek, evre, t, sonraki, uyari {kim, silah, kalan, toplam, yon, sesYon, savunma}, sistem, isi, raunt, stres (kara),
//   can/maxCan (kara), zehir, bagisiklik, tohum, sayac, bekleme, yetenekNo, cevre, sizma, tuzak, kacanlar, olenler }
// birim = { no, tur, ad, tier, govde, max, kalkan, kalkanFrek, delik, aci, mesafe, moduller [], kucuk, faz, kaciyor,
//   donma, kalkanKilit, teslim }
import * as E from '../tarim/etki';
import { nobet, yildizCarpani } from '../zaman';
import { kayitBul } from '../veri/seslendirme';
import { uretec } from '../veri/murettebat';
import { GEMI_SINIFLARI } from '../veri/gemiler';
import * as SB from '../tonoflenya/subay';
import { savasHazirligi } from '../binalar';
import { evrenEtki, misafir, gucItibari } from '../tonoflenya/kisiler';
import { TONOFLENYA_HAMMADDELERI } from '../tonoflenya/zanaat';
import { ZAFER_KANCALARI } from '../kancalar';

// --- Ortak yardımcılar ---
const kusan = (d, id) => !!(d.kusanilan && (d.kusanilan.silah === id || d.kusanilan.zirh === id));
const esya = (d, id) => (d.esya && d.esya[id]) || 0;
const parca = (d, id) => (d.koloni && d.koloni.parcalar && d.koloni.parcalar[id]) || 0;
const ozelVar = (d, ad) => !!(d.yan && d.yan.ozel && d.yan.ozel.some((x) => x.ad.indexOf(ad) >= 0));
const yet = (d, id) => !!(d.kaptan.yetenekler && d.kaptan.yetenekler[id]);
const mod = (d, id) => !!(d.gemi && d.gemi.moduller && d.gemi.moduller[id]);
const bina = (d, id) => !!(d.koloni && d.koloni.binalar && d.koloni.binalar.includes(id));
const kara = (s) => s && s.ortam === 'kara';
// Bir eşyaya, parçaya, modüle, araca ya da kalıcı kazanıma sahip mi (davranış modüllerini kıran karşılıklar için)
export function sahip(d, id) {
  if (kusan(d, id) || esya(d, id) > 0 || parca(d, id) > 0 || parca(d, 'mod_' + id) > 0 || mod(d, id)) return true;
  if ((d.envanter || []).includes(id) || (d.bayrak && d.bayrak[id])) return true;
  if ((d.araclar || []).includes(id)) return true;
  return !!(d.koloni && d.koloni.kaynaklar && d.koloni.kaynaklar[id] > 0);
}
function harca(d, id) {
  if (esya(d, id) > 0) d.esya[id] -= 1;
  else if (parca(d, id) > 0) d.koloni.parcalar[id] -= 1;
  else if (d.koloni.kaynaklar[id] > 0) d.koloni.kaynaklar[id] -= 1;
  else return false;
  return true;
}

const sinifi = (d) => (d.gemi && d.gemi.sinif) || 1;
const aethelisteMi = (d) => !(d.bayrak && d.bayrak.tonoflenyada);
// Akademiye teslim edilen gezegen numunesi sayısı (25 bina belgesi 4.1)
export const numuneSayisi = (d) => (d.numuneTeslim || []).length;
// Lamine titanyum zırh takımı (montaj parçası) karada ekip zırhıdır
const lamineVar = (d) => parca(d, 'mod_govde') > 0 || mod(d, 'govde');

// Kayıtlanabilir tohumlu zar
function zar(s) {
  s.sayac = (s.sayac || 0) + 1;
  const x = Math.sin(s.tohum * 0.0001 + s.sayac * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

// --- 3. Evrensel tehdit ölçeği (T1-T5) ---
export const TEHDIT = {
  1: { ad: 'T1', can: 1, hasar: 1, pencere: 3.0 },
  2: { ad: 'T2', can: 1.5, hasar: 1.3, pencere: 2.5 },
  3: { ad: 'T3', can: 2.2, hasar: 1.7, pencere: 2.0 },
  4: { ad: 'T4', can: 3.0, hasar: 2.2, pencere: 1.8 },
  5: { ad: 'T5', can: 3.5, hasar: 2.5, pencere: 1.5 },
};
// Oyuncunun ilerleyişi: gemi sınıfı, koloni kademesi, derin uzay operasyonları ve Tonoflenya
export function oyuncuKademesi(d) {
  const sinif = Math.max(d.gemi ? d.gemi.sinif || 1 : 1, ...(d.filo || []).map((g) => g.sinif || 1));
  const op = (d.tamamlananOp || []).length;
  if (d.bayrak && d.bayrak.tonoflenyaGoruldu) return 4;
  if (sinif >= 3 || op >= 10) return 3;
  if (sinif >= 2 || op >= 2 || (d.koloni && d.koloni.seviye >= 3)) return 2;
  return 1;
}
// Eski bölgelerdeki düşman bile oyuncunun en çok bir kademe gerisinde kalır
export function tehditKademesi(d, taban) {
  if (taban >= 5) return 5;
  return Math.min(4, Math.max(taban || 1, oyuncuKademesi(d) - 1));
}
// Oyuncunun kendi vuruş gücü de ilerleyişle büyür (gemi sınıfı; karada kaptanın kademesi)
function oyuncuGucu(d, s) {
  if (kara(s)) return 1 + 0.45 * (oyuncuKademesi(d) - 1);
  return { 1: 1, 2: 1.4, 3: 2.0, 4: 2.6, 5: 3.4 }[(d.gemi && d.gemi.sinif) || 1];
}

// --- 8 düşman davranış modülü; her biri için serbest çözüm ve onu kısaltan karşılıklar (bilgi ve anons için) ---
export const MODULLER = {
  frekans: { ad: 'Frekans kalkanı', serbest: 'İki turda bir kalkan tonunu değiştirir; iki parmakla çevirip yeni tonu yakala.', karsilik: ['Sonik çığlık tüfeği kalkanı iki tur kilitler', 'Geometrik plazma namlusu tonu yok sayar', 'K3 çift fazlı plazma bobini ve Mammoth direnci yarıya indirir'] },
  pusucu: { ad: 'Pusucu ve sahte sinyal', serbest: 'Her isabette yer değiştirir; sesi takip edip yeniden kilitlen. Sahte uyarıda motor nabzını dinle.', karsilik: ['Sinha akustik sonarı ve kozmik parazit sensörü sahte sesleri eler', 'Gümüş söğüt nişangâhı ilk atışı ve kilidi kolaylaştırır', 'Çöl Tilkisi ve Kıvılcım hızla döner'] },
  cagiran: { ad: 'Sürü ve takviye çağıran', serbest: 'Üç turda bir yardımcı çağırır; önce küçük birimleri indir.', karsilik: ['Sonik kovucu çağrılanları bir tur sersemletir (karada dağıtır)', 'Kahergonat gölge yayıcısı yan birimleri de yakar', 'Hisar-ı Kadim ve Akrep yan birimleri süpürür'] },
  karanlik: { ad: 'Karanlık ve zihin paraziti', serbest: 'Kinetik atışlara yüzde elli dirençli, darbeleri stres yükseltir; savunma penceresini kaçırma.', karsilik: ['Zhaor ışık mızrağı ve Tyzrakhel iki kat vurur', 'YGK baş-büyücü cübbesi zihin saldırılarına bağışıklık verir', 'Kseno-panzehir ve vaha şurubu stresi sıfırlar', 'Biyoloji kubbesi stres birikimini yüzde otuz azaltır'] },
  isi: { ad: 'Aşırı ısı ve plazma yüklemesi', serbest: 'Darbeleri kalkanı ve silahı ısıtır; kalkan yerine kaçınmayla kalkanı dinlendir.', karsilik: ['Dondurucu köpük kalkanı ve silahı anında soğutur', 'Termal giysi ve pasif termal karartma ısınmayı yarıya indirir', 'Kara buz hançeri ve süper-iletken soğutucu düşmanı iki tur dondurur'] },
  iyon: { ad: 'İyon kilidi ve elektrik şoku', serbest: 'İsabette iticileri bir tur kilitler; iyon ıslığında kaçınma yerine kalkan ya da karşı ateş.', karsilik: ['Topraklama çubuğu kilidi emer', 'EMP şok dalga topu düşmanın kendi sistemini kilitler'] },
  zehir: { ad: 'Zehir, asit ve yaralama', serbest: 'Her tur zırhı eritir; savaşı uzatmadan bitir, sonra revire uğra.', karsilik: ['Asit-direnç polimer zırhı ve Viridion panzehirleri eritmeyi azaltır', 'Kseno-panzehir ve radyasyon detoksu zehri siler, üç tur bağışıklık verir'] },
  kacis: { ad: 'Kaçış ve teslim', serbest: 'Yüzde otuzun altında kaçmaya çalışır, yüzde yirmi beşte teslim teklif eder; ağır atışla indir ya da teslimi kabul et.', karsilik: ['Plazma pençeli kesici ve ağır çekici kiriş kaçış motorlarını kilitler', 'Aşırı yüklü iyon iticileri kovalamada hız verir'] },
};

// --- Düşman silahları ve uyarı sesleri (kara silahları uzaydakilerin sesli karşılıkları) ---
// p: uyarı penceresinin kademe penceresine göre çarpanı; karsi: çift dokunuşla havada düşürülür; delici: kalkanı
// deler (yalnız kaçınma ya da ışınlanma kurtarır); ozel: zehir | iyon | isi | stres
export const SILAHLAR = {
  plazma: { ad: 'plazma topu', p: 1, hasar: 14, tarif: 'gitgide tizleşen bir bobin şarj vızıltısı' },
  torpido: { ad: 'kinetik torpido', p: 1.15, hasar: 22, karsi: true, tarif: 'ağır bir basınç tahliyesi ve yaklaşan roket kükremesi' },
  iyon: { ad: 'iyon ışını', p: 0.85, hasar: 10, ozel: 'iyon', tarif: 'sürekli yükselen bir rezonans ıslığı' },
  agir_plazma: { ad: 'kalkan delici ağır plazma', p: 1.25, hasar: 30, delici: true, tarif: 'ağır hidrolik gıcırtının ardından boğuk, uzun bir şarj' },
  isi_dalgasi: { ad: 'aşırı ısı dalgası', p: 1.1, hasar: 15, ozel: 'isi', tarif: 'kükreyen, kızgın bir hava dalgası' },
  sonik_dalga: { ad: 'sonik dalga', p: 1, hasar: 14, tarif: 'derinden yükselen bir basınç uğultusu' },
  pence: { ad: 'pençe darbesi', p: 0.9, hasar: 12, tarif: 'hızla yaklaşan tırnak tıkırtısı ve tıslama' },
  tukuruk: { ad: 'asit tükürüğü', p: 1, hasar: 9, ozel: 'zehir', tarif: 'gırtlaktan gelen ıslak bir hırıltı' },
  lazer: { ad: 'siper kıran lazer', p: 1, hasar: 13, tarif: 'servo sesi ve kesik lazer şarj bipleri' },
  mermi: { ad: 'tüfek atışı', p: 0.95, hasar: 11, karsi: true, tarif: 'tüfek kurma mekanizmasının şakırtısı' },
  golge_oku: { ad: 'gölge oku', p: 1, hasar: 12, ozel: 'stres', tarif: 'alçak bir ayin fısıltısı ve kristal çatırtısı' },
  kilic: { ad: 'gölge kılıcı', p: 0.9, hasar: 18, ozel: 'stres', tarif: 'havayı yaran çift kılıç ıslığı' },
};
// Uyarı sesinin dosyası (ekran çalar): uzayın üç ElevenLabs sesi ve efekt arşivi
export const UYARI_SESI = { plazma: 'el_plazma_sarj', torpido: 'el_torpido', iyon: 'el_iyon', agir_plazma: 'el_plazma_sarj', isi_dalgasi: 'magma', sonik_dalga: 'el_canavar', pence: 'el_canavar', tukuruk: 'tislama', lazer: 'el_droid', mermi: 'el_tufek', golge_oku: 'el_golge', kilic: 'el_golge' };

// --- Somut düşman kataloğu: 8 uzay, 5 kara, çağrılan yardımcılar ve aşamalı bosslar ---
// tier: taban tehdit kademesi; arketip: akinci | frekans | pusucu | cagiran | karanlik | zirhli; moduller: davranışlar;
// cagri: çağırdığı yardımcı; teslim: yüzde yirmi beşte teslim teklif eder; sahte: sahte uyarı sesi verir;
// fazlar: [{ esik, soz, ... }] can bu orana inince
export const DUSMANLAR = {
  // Uzay
  korsan_avci: { ad: 'korsan avcı gemisi', ortam: 'uzay', tier: 1, arketip: 'akinci', moduller: ['iyon'], govde: 40, kalkan: 0.3, silahlar: ['iyon', 'plazma'], frek: 260, ses: 'Yüksek devirli, hızla yaklaşan ince türbin ıslığı.', zayif: 'Kaçınmanın ardından birincil silaha açık.', ganimet: { plaka: 40 } },
  korsan_korvet: { ad: 'korsan korveti', ortam: 'uzay', tier: 1, arketip: 'pusucu', moduller: ['pusucu', 'kacis'], teslim: true, govde: 60, kalkan: 0.5, silahlar: ['plazma', 'torpido'], frek: 140, ses: 'Tok, çift pistonlu motor homurtusu; darbe aldıkça yer değiştirir.', zayif: 'Torpido ya da bordalama pençesi kaçış motorunu kilitler.', ganimet: { sasi_celigi: 30, mikrocip: 5 } },
  agir_maden_korsani: { ad: 'ağır maden korsanı', ortam: 'uzay', tier: 2, arketip: 'zirhli', moduller: [], agirPlazma: 3, govde: 90, kalkan: 0.4, silahlar: ['plazma', 'agir_plazma'], frek: 75, ses: 'Ağır hidrolik gıcırtı ve düşük frekanslı plazma şarjı.', zayif: 'Zırh frekansı tutturulunca tam hasar alır.', ganimet: { sasi_celigi: 40, plaka: 30 } },
  yabanci_firkateyn: { ad: 'tanımsız yabancı firkateyn', ortam: 'uzay', tier: 3, arketip: 'frekans', moduller: ['frekans', 'iyon'], govde: 110, kalkan: 0.6, silahlar: ['iyon', 'torpido', 'plazma'], frek: 90, ses: 'Metalik olmayan, melodik ve ürpertici bir rezonans vızıltısı.', zayif: 'Sonik tüfek ya da frekans eşlemesi kalkanını indirir.', ganimet: { kseno_alasim: 20, saf_kristal: 10 } },
  dron_tasiyici: { ad: 'korsan dron taşıyıcısı', ortam: 'uzay', tier: 3, arketip: 'cagiran', moduller: ['cagiran'], cagri: 'saldiri_dronu', govde: 100, kalkan: 0.35, silahlar: ['plazma'], frek: 110, ses: 'Kalın ana gemi uğultusunun yanında ince arı vızıltısı gibi dronlar.', zayif: 'Önce dronlar; Akrep ve alan atışları dronları süpürür.', ganimet: { mikrocip: 15, sasi_celigi: 30 } },
  golge_kanat: { ad: 'Alt Evren hava yaratıkları sürüsü', ortam: 'uzay', tier: 4, arketip: 'karanlik', moduller: ['karanlik', 'cagiran'], cagri: 'golge_dronu', karanlik: true, govde: 70, kalkan: 0.2, silahlar: ['iyon', 'plazma'], frek: 70, ses: 'Uzayda yankılanan organik çığlık ve kanat çırpınışı.', zayif: 'Işık mızrağı ve aether silahları iki kat vurur.', ganimet: { zirhli_plaka: 20 } },
  golge_gemisi: { ad: 'gölge korsan gemisi', ortam: 'uzay', tier: 4, arketip: 'pusucu', moduller: ['karanlik', 'pusucu'], sahte: true, karanlik: true, govde: 80, kalkan: 0.4, silahlar: ['torpido', 'plazma'], frek: 120, ses: 'Fısıltılı, kesik kesik kaybolup beliren karanlık motor sesi.', zayif: 'Sinha sonarı ve söğüt nişangâhı sahte sesleri eler.', ganimet: { zirhli_plaka: 30 } },
  kahergonat_zirhlisi: {
    ad: 'Kahergonat öncü zırhlısı', ortam: 'uzay', tier: 4, arketip: 'karanlik', moduller: ['karanlik', 'frekans'], karanlik: true, boss: true, govde: 140, kalkan: 0.65, silahlar: ['torpido', 'plazma', 'iyon'], frek: 40, ses: 'Ağır savaş davulu gibi atan kırk hertzlik reaktör nabzı.', zayif: 'İkinci aşamada zırhı açılır: ışık mızrağı ve torpido iki kat.', ganimet: { zirhli_plaka: 60, kseno_alasim: 15 },
    fazlar: [{ esik: 0.5, soz: 'Zırhlının kalkanı patlıyor! Gövdesinden iki gölge dronu ayrılıyor; reaktör nabzı hızlandı.', kalkan: 0, moduller: ['karanlik', 'cagiran'], cagir: ['golge_dronu', 'golge_dronu'], pencere: 1.5, zayif: { torpido: 2, isik: 2 } }],
  },
  // Kara / yüzey
  sulfur_akrebi: { ad: 'sülfür akrebi sürüsü', ortam: 'kara', tier: 1, arketip: 'akinci', moduller: ['zehir'], govde: 35, kalkan: 0.15, silahlar: ['pence', 'tukuruk'], frek: 330, ses: 'Taş üzerinde hızla tırmanan kitin tıkırtıları ve keskin tıslama.', zayif: 'Hızlı biter; asit için kseno-panzehir.', ganimet: { polimer: 2, kseno_kabuk: 1 } },
  kadim_otomat: { ad: 'kadim harabe muhafız otomatı', ortam: 'kara', tier: 2, arketip: 'frekans', moduller: ['frekans'], govde: 70, kalkan: 0.5, silahlar: ['lazer', 'lazer', 'sonik_dalga'], frek: 220, ses: 'Soğuk metalik servo sesleri ve lazer şarj bipleri.', zayif: 'Enerji kalkanının tonunu yakala.', ganimet: { kseno: 2, mikrocip: 5 } },
  biyom_yaratigi: { ad: 'gezegen biyom yaratığı', ortam: 'kara', tier: 2, arketip: 'cagiran', moduller: ['cagiran', 'pusucu'], cagri: 'yavru', govde: 60, kalkan: 0.25, silahlar: ['pence', 'sonik_dalga'], frek: 150, ses: 'Bulunduğu gezegene göre lav hırıltısı, buz çatırtısı ya da spor patlaması.', zayif: 'Mammoth zırhıyla ezilir; Çöl Tilkisi pusularından kaçar.', ganimet: { kseno_spor: 2 } },
  haydut_cetesi: { ad: 'Tonoflenya kaçakçı çetesi', ortam: 'kara', tier: 4, arketip: 'pusucu', moduller: ['pusucu', 'kacis'], teslim: true, govde: 60, kalkan: 0.3, silahlar: ['mermi', 'mermi', 'pence'], frek: 180, ses: 'Çizme sesleri, tüfek kurma mekanizması, kısa ıslık komutları.', zayif: 'Yüzde yirmi beşte teslim olup bilgi verir.', ganimet: { oksit_celik: 3 } },
  tarikat_muhafizi: { ad: 'Kahergonat tarikat muhafızı', ortam: 'kara', tier: 4, arketip: 'karanlik', moduller: ['karanlik'], karanlik: true, govde: 70, kalkan: 0.35, silahlar: ['golge_oku', 'golge_oku', 'kilic'], frek: 95, ses: 'Alçak sesli ayin fısıltıları ve kristal çatırtısı.', zayif: 'Işık mızrağı ve baş-büyücü cübbesi.', ganimet: { kara_aether: 1 } },
  // Aethelis-IV sektör harekâtları (v4 asama-1-ve-2): 1A güney, 1B batı, 1C doğu, 1D kuzey, 2B Kaelith ocağı
  yuva_ana_akrebi: { ad: 'yuva ana akrebi', ortam: 'kara', tier: 1, arketip: 'cagiran', moduller: ['cagiran', 'zehir'], cagri: 'yavru', govde: 50, kalkan: 0.2, silahlar: ['tukuruk', 'pence'], frek: 260, ses: 'Yuvanın dibinden gelen derin bir tıslama ve yumurta keselerinin çıtırtısı.', zayif: 'Sonik kovucu sürüyü bir tur sersemletir; önce yavruları indir.', ganimet: { polimer: 3, kseno_kabuk: 1 } },
  yagmaci_oncusu: { ad: 'yağmacı öncüsü', ortam: 'kara', tier: 1, arketip: 'pusucu', moduller: ['pusucu', 'kacis'], teslim: true, govde: 45, kalkan: 0.2, silahlar: ['mermi', 'mermi'], frek: 200, ses: 'Taş tünelde yankılanan çizme sesleri ve tüfek kurma şakırtısı.', zayif: 'Yüzde yirmi beş canda teslim olabilir.', ganimet: { mikrocip: 2, titanyum: 1 } },
  vanguard_otomati: { ad: 'kadim Vanguard otomatı', ortam: 'kara', tier: 1, arketip: 'frekans', moduller: ['frekans'], govde: 55, kalkan: 0.45, silahlar: ['lazer', 'lazer'], frek: 240, ses: 'Eski bir gemi bilgisayarının bozuk bipleri ve paslı servo gıcırtısı.', zayif: 'İki turda bir kalkan tonunu değiştirir; iki parmakla çevirip kır.', ganimet: { mikrocip: 4, titanyum: 1 } },
  bataklik_pusucusu: { ad: 'kristal bataklık pusucusu', ortam: 'kara', tier: 1, arketip: 'pusucu', moduller: ['pusucu'], govde: 40, kalkan: 0.2, silahlar: ['pence', 'sonik_dalga'], frek: 170, ses: 'Sisin içinde sağdan sola kayan ıslak bir şapırtı ve kristal çıtırtısı.', zayif: 'Her darbede yer değiştirir; sesini izleyip yeniden kilitlen.', ganimet: { civa_tortusu: 1, kristal: 1 } },
  kseno_avci: { ad: 'asit platosu kseno-avcısı', ortam: 'kara', tier: 2, arketip: 'akinci', moduller: ['zehir'], govde: 45, kalkan: 0.2, silahlar: ['pence', 'tukuruk'], frek: 420, ses: 'Gökten pike yapan bir çığlık ve deri kanat şaklaması.', zayif: 'Uyarı penceresi kısa; hızlı kaçın. Nötralizasyon kulesi asidi siler.', ganimet: { polimer: 2 } },
  magma_akrebi: { ad: 'magma sülfür akrebi', ortam: 'kara', tier: 2, arketip: 'akinci', moduller: ['isi'], govde: 45, kalkan: 0.25, silahlar: ['pence', 'isi_dalgasi'], frek: 300, ses: 'Kızgın taşta cızırdayan kitin ve lav fokurtusu.', zayif: 'Dondurucu köpük ve termal giysi ısısını keser.', ganimet: { kseno_kabuk: 1, izotop: 1 } },
  galeri_cagirani: { ad: 'galeri çağıranı', ortam: 'kara', tier: 2, arketip: 'cagiran', moduller: ['cagiran'], cagri: 'yavru', govde: 60, kalkan: 0.3, silahlar: ['sonik_dalga', 'pence'], frek: 130, ses: 'Sıcak galerilerin dibinden yankılanan uzun, boğuk bir çağrı.', zayif: 'Her üç turda yavru çağırır; önce küçükleri indir.', ganimet: { kseno_spor: 1, titanyum: 2 } },
  // Yerel operasyonlar ve Aşama 3 (v4 koloni-yerel-operasyonlar, asama-3)
  mantar_pusucusu: { ad: 'mantar sporu pusucusu', ortam: 'kara', tier: 1, arketip: 'pusucu', moduller: ['pusucu', 'zehir'], govde: 30, kalkan: 0.1, silahlar: ['tukuruk', 'pence'], frek: 280, ses: 'Spor bulutunun içinde ıslak bir hışırtı; yer değiştirdikçe kesecikler patlıyor.', zayif: 'Biyo-kubbe ya da biyo-karantina zehrini işletmez.', ganimet: { kseno_spor: 1 } },
  kriyo_yaratigi: { ad: 'kriyo yüzey yaratığı', ortam: 'kara', tier: 1, arketip: 'akinci', moduller: [], govde: 35, kalkan: 0.15, silahlar: ['pence', 'pence'], frek: 360, ses: 'Buz kırığı gibi çatırdayan eklemler ve soğuk bir tıslama.', zayif: 'Hızlı; termal giysi ve plazma ısısı onu yavaşlatır.', ganimet: { kriyolit: 1 } },
  kriyo_pusucusu: { ad: 'sülfür ve kriyo pusucusu', ortam: 'kara', tier: 2, arketip: 'pusucu', moduller: ['pusucu'], govde: 45, kalkan: 0.2, silahlar: ['pence', 'tukuruk'], frek: 310, ses: 'Metan buharının içinden gelen kesik bir hırıltı.', zayif: 'Her darbede yer değiştirir; sesi izle.', ganimet: { metan: 1, kriyolit: 1 } },
  kristal_akrep: { ad: 'kristal çöl akrebi', ortam: 'kara', tier: 1, arketip: 'akinci', moduller: [], govde: 32, kalkan: 0.2, silahlar: ['pence', 'tukuruk'], frek: 390, ses: 'Cam üstünde kayan kristal bacakların tınlaması.', zayif: 'Sonik kovucu savaşmadan kaçırır.', ganimet: { plazma_cami: 1 } },
  vaha_solucani: { ad: 'vaha kaya solucanı', ortam: 'kara', tier: 1, arketip: 'zirhli', moduller: [], govde: 60, kalkan: 0.5, silahlar: ['sonik_dalga', 'pence'], frek: 110, ses: 'Taşları ezen, derin, sürtünmeli bir gümbürtü.', zayif: 'Zırhlı; sismik dengeleyici vadiyi çökertmeden onu durdurur.', ganimet: { bazalt: 4 } },
  dev_kor_solucan: { ad: 'dev kör solucan öncüsü', ortam: 'kara', tier: 2, arketip: 'zirhli', moduller: [], govde: 80, kalkan: 0.5, silahlar: ['sonik_dalga', 'sonik_dalga', 'pence'], frek: 70, ses: 'Yerin altından yükselen, kemikleri titreten bir gürleme.', zayif: 'Onu durdurursan sürü yön değiştirir; sismik dengeleyici de saptırır.', ganimet: { kseno_kabuk: 2 } },
  yagmaci_lideri: { ad: 'yağmacı lideri', ortam: 'kara', tier: 2, arketip: 'pusucu', moduller: ['pusucu', 'kacis'], teslim: true, govde: 55, kalkan: 0.3, silahlar: ['mermi', 'mermi', 'lazer'], frek: 190, ses: 'Kalın bir ses komut veriyor; tüfek kurma şakırtısı.', zayif: 'Yüzde yirmi beşte teslim olur.', ganimet: { sasi_celigi: 20 } },
  // Çağrılan yardımcılar (küçük birimler: her tur üst üste ek hasar)
  saldiri_dronu: { ad: 'saldırı dronu', ortam: 'uzay', tier: 1, kucuk: true, moduller: [], govde: 14, kalkan: 0, silahlar: ['iyon'], frek: 880, ganimet: {} },
  golge_dronu: { ad: 'gölge dronu', ortam: 'uzay', tier: 1, kucuk: true, moduller: ['karanlik'], karanlik: true, govde: 16, kalkan: 0, silahlar: ['plazma'], frek: 660, ganimet: {} },
  yavru: { ad: 'yavru yaratık', ortam: 'kara', tier: 1, kucuk: true, moduller: [], govde: 12, kalkan: 0, silahlar: ['pence'], frek: 520, ganimet: {} },
  golge_muhafizi: { ad: 'gölge muhafızı', ortam: 'kara', tier: 1, kucuk: true, moduller: ['karanlik'], karanlik: true, govde: 18, kalkan: 0, silahlar: ['golge_oku'], frek: 420, ganimet: {} },
  abyssus_yaratigi: { ad: 'Alt Evren su yaratığı', ortam: 'uzay', tier: 1, kucuk: true, moduller: ['karanlik'], karanlik: true, govde: 18, kalkan: 0, silahlar: ['sonik_dalga'], frek: 300, ganimet: {} },
  // Aşamalı büyük bosslar
  xarathia: {
    ad: 'Xarathia, magma muhafızı', ortam: 'kara', tier: 5, arketip: 'zirhli', moduller: ['isi'], boss: true, govde: 160, kalkan: 0.45, silahlar: ['isi_dalgasi', 'isi_dalgasi', 'plazma'], frek: 55, ses: 'Lav göllerinin altından gelen derin, nefes alan bir gürleme.', zayif: 'İkinci aşamada buz silahlarına ve soğutmaya iki kat zayıf.', ganimet: { sivi_metal: 6, titanyum: 10 },
    fazlar: [{ esik: 0.5, soz: 'Xarathia lav sütununu açıyor; çekirdeğinin kızıllığı kulaklığını dolduruyor. Darbeleri ağırlaştı ama soğuğa açık!', hasarCarpani: 1.4, zayif: { buz: 2 } }],
  },
  lord_sharon: {
    ad: 'Lord Sharon, gölge formu', ortam: 'kara', tier: 5, arketip: 'karanlik', moduller: ['karanlik'], karanlik: true, boss: true, govde: 180, kalkan: 0.4, silahlar: ['kilic', 'golge_oku'], frek: 65, ses: 'Çifte gölge kılıcının ıslığı ve yankılı bir kahkaha.', zayif: 'Son aşamada yalnız Tyzrakhel mızrağı mührü kırar.', ganimet: { kara_aether: 4 },
    fazlar: [
      { esik: 0.66, soz: 'Sharon odayı karartıyor! İki gölge muhafızı çağırdı; artık sahte yönlerden saldırıyor.', moduller: ['karanlik', 'pusucu', 'cagiran'], sahte: true, cagir: ['golge_muhafizi', 'golge_muhafizi'] },
      { esik: 0.33, soz: 'Sharon ölümsüz gölge zırhına büründü. Sıradan silahlar onu ancak sıyırır; Tyzrakhel\'in ışığı gerek!', olumsuz: true, pencere: 1.4 },
    ],
  },
  cahelon: {
    ad: 'Cahelon, Okyanos-Abyssus Leviathan\'ı', ortam: 'uzay', tier: 5, arketip: 'cagiran', moduller: ['frekans'], boss: true, govde: 220, kalkan: 0.5, silahlar: ['sonik_dalga', 'sonik_dalga', 'torpido'], frek: 48, ses: 'Dev yüzgeç darbeleri ve suyun altından gelen sonik dalgalar.', zayif: 'Son aşamada frekans eşlemesi ve ışık atışları devasa hasar verir.', ganimet: { kseno_alasim: 30, saf_kristal: 20 },
    fazlar: [
      { esik: 0.66, soz: 'Cahelon suyun altına daldı! Yalnız infrasonik uğultusundan yerini bulabilirsin; çevresinde Alt Evren yaratıkları kaynaşıyor.', frek: 28, kilit: 0.7, moduller: ['cagiran'], cagir: ['abyssus_yaratigi', 'abyssus_yaratigi'] },
      { esik: 0.33, soz: 'Göğsündeki kadim çatlak parlıyor: Dünya Çivisi\'nin yankısı! Tonu eşle ve vur.', frek: 48, pencere: 1.5, zayif: { frekans: 3, isik: 2 } },
    ],
  },
};

// --- 6 geliş biçimi ---
export const GELISLER = {
  tek: { ad: 'Tek düşman' },
  kiskac: { ad: 'Çift yönlü kıskaç', soz: 'Kıskaç! Bir düşman solda, öteki sağda.' },
  oncu: { ad: 'Öncü ve destek ikilisi', soz: 'Önde zırhlı bir öncü yolu kapatıyor; arkada bir destekçi onu koruyor. Arkadaki inmeden öncü zor düşer.' },
  konvoy: { ad: 'Kaçan konvoy', soz: 'Kurye kaçmaya çalışıyor! Birkaç tur içinde ya indir ya kaçış motorlarını kilitle.' },
  cevre: { ad: 'Çevresel tehlike altında', soz: '' },
  sizma: { ad: 'Sessiz sızma', soz: 'Düşman seni fark etmedi. İlk atışın sessiz ve ağır olur; ıskalarsan alarm verir.' },
  tuzak: { ad: 'Sahte yardım sinyali', soz: 'Yardım sinyali bir tuzakmış!' },
};
export const CEVRELER = {
  iyon_firtinasi: { ad: 'iyon fırtınası', soz: 'Çevrede iyon fırtınası: iticiler ara ara kilitlenebilir.' },
  isi: { ad: 'aşırı ısı alanı', soz: 'Kızgın bir alan: kalkan ve silahlar hızla ısınıyor.' },
  asit: { ad: 'asit yağmuru', soz: 'Asit yağmuru: zırh her tur biraz eriyor.' },
  sarsinti: { ad: 'yer sarsıntısı', soz: 'Zemin titriyor: ara ara sarsıntı savurur. Sismik dengeleyici korur.', kara: true },
};
const IKINCIL = ['iyon', 'isi', 'zehir', 'pusucu', 'frekans'];

// Rastgele karşılaşma: bağlama ve tehdit kademesine göre düşman, geliş biçimi ve ikincil modül seçer
// baglam: { ortam: 'uzay' | 'kara', bolge: 'yakin' | 'derin' | 'tonoflenya' | 'koloni' | 'gezegen', no }
export function karsilasmaUret(d, baglam = {}) {
  const r = uretec((d.tohum || 1) * 97 + (baglam.no || 0) * 13 + (d.savasNo || 0) * 7);
  const k = oyuncuKademesi(d);
  const ortam = baglam.ortam || 'uzay';
  let havuz;
  if (ortam === 'kara') {
    if (baglam.bolge === 'tonoflenya') havuz = ['haydut_cetesi', 'tarikat_muhafizi'];
    else if (baglam.bolge === 'gezegen') havuz = ['biyom_yaratigi', 'kadim_otomat'];
    else havuz = k >= 2 ? ['sulfur_akrebi', 'sulfur_akrebi', 'biyom_yaratigi'] : ['sulfur_akrebi'];
  } else if (baglam.bolge === 'tonoflenya') havuz = ['golge_gemisi', 'golge_kanat', 'korsan_korvet'];
  else {
    havuz = ['korsan_avci', 'korsan_korvet'];
    if (k >= 2) havuz.push('agir_maden_korsani');
    if (k >= 3) havuz.push('dron_tasiyici');
    if (k >= 3 || (k >= 2 && bina(d, 'sinyal_kulesi') && baglam.bolge === 'derin')) {
      havuz.push('yabanci_firkateyn');
      if (parca(d, 'mod_burun') > 0 || mod(d, 'burun')) havuz.push('yabanci_firkateyn'); // kripto frekans anteni
    }
  }
  const sec = (l) => l[Math.floor(r() * l.length)];
  const ana = sec(havuz);
  const spec = { dusmanlar: [ana], ortam, gelis: 'tek' };
  if (k >= 2) {
    const g = sec(['tek', 'tek', 'kiskac', 'oncu', 'konvoy', 'cevre', 'sizma', 'tuzak']);
    spec.gelis = g;
    if (g === 'kiskac') spec.dusmanlar = ortam === 'kara' ? ['sulfur_akrebi', havuz.includes('haydut_cetesi') ? 'haydut_cetesi' : 'biyom_yaratigi'] : ['korsan_avci', 'korsan_korvet'];
    else if (g === 'oncu') spec.dusmanlar = ortam === 'kara' ? ['kadim_otomat', 'biyom_yaratigi'] : ['agir_maden_korsani', k >= 3 ? 'dron_tasiyici' : 'yabanci_firkateyn'];
    else if (g === 'konvoy') spec.dusmanlar = [ortam === 'kara' ? 'haydut_cetesi' : 'korsan_korvet'];
    else if (g === 'cevre') spec.cevre = sec(Object.keys(CEVRELER));
    // T2 ve üstünde ana düşmana bir ikincil davranış modülü eklenir
    spec.ikincil = sec(IKINCIL.filter((m) => !(DUSMANLAR[spec.dusmanlar[0]].moduller || []).includes(m)));
  }
  return spec;
}

// --- Subay yetenekleri, sarf malzemeleri ve teçhizat (tonoflenya-esya-zanaat-ve-murettebat-rehberi.md bölüm 1, 3) ---
// Kendi sırasında aşağı kaydır: sıradaki yetenek ya da sarf; çift dokun: kullan. Bekleme tur cinsinden.
// Karada liste kaptan, refakatçi subay ve sarf malzemeleriyle sınırlıdır.
export const SARF = [
  { id: 'dondurucu_kopuk', ad: 'Dondurucu köpük', tarif: 'Isınan kalkanı ve silahları anında soğutur.' },
  { id: 'sonik_kovucu', ad: 'Sonik kovucu', tarif: 'Çağrılan birimleri bir tur sersemletir; karada dağıtır.' },
  { id: 'kseno_panzehir', ad: 'Evrensel kseno-panzehir', tarif: 'Zehri ve stresi siler, üç tur bağışıklık.' },
  { id: 'vaha_surubu', ad: 'Jeotermal vaha şurubu', tarif: 'Stresi ve kara kristal lanetini sıfırlar.' },
  { id: 'detoks', ad: 'Kseno-radyasyon detoksu', tarif: 'Zehri siler, üç tur bağışıklık.' },
];
function refakatciAnahtari(d) {
  if (d.refakatci && d.istasyonlar && Object.values(d.istasyonlar).some((s) => s && (s.anahtar === d.refakatci || s.id === d.refakatci))) return d.refakatci;
  for (const ist of SB.ISTASYON_SIRASI) {
    const s = d.istasyonlar && d.istasyonlar[ist];
    if (s) return s.anahtar || s.id;
  }
  return null;
}
export function yetenekler(d) {
  const s = d.savas;
  const l = [{ id: 'odak', ad: SB.KAPTAN.aktif.ad, sahip: 'Kaptan', bekleme: SB.KAPTAN.aktif.bekleme }];
  const ref = kara(s) ? refakatciAnahtari(d) : null;
  for (const ist of SB.ISTASYON_SIRASI) {
    const st = d.istasyonlar && d.istasyonlar[ist];
    if (!st) continue;
    if (kara(s) && (st.anahtar || st.id) !== ref) continue;
    const k = st.cekirdek ? st.anahtar : SB.SUBAY_SIRASI.find((x) => SB.SUBAYLAR[x].istasyon === ist);
    const a = SB.SUBAYLAR[k].aktif;
    l.push({ id: a.id, ad: a.ad, sahip: st.ad.split(' ')[0] === 'Dr.' || st.ad.split(' ')[0] === 'Başçavuş' ? st.ad.split(' ')[1] : st.ad.split(' ')[0], bekleme: a.bekleme + (st.cekirdek ? 0 : 1) });
  }
  // Boyutsal atlama sıçrayıcısı (final görevi 8): acil kaçış
  if (!kara(s) && d.bayrak.tf_sicrayici) l.push({ id: 'atlama', ad: 'Boyutsal Atlama Sıçrayıcısı', sahip: 'Gemi', bekleme: 6 });
  if (kara(s) && s.arac === 'atmosphere_x') l.push({ id: 'gumus', ad: 'Atmosphere-X taktik tahliyesi', sahip: 'Mekik', bekleme: 5 });
  if (d.bayrak.yan_protokol) l.push({ id: 'atlama', ad: 'Magentor Acil Işınlanma Protokolü', sahip: kara(s) ? 'Kaptan' : 'Gemi', bekleme: 8 });
  for (const x of SARF) if (sahip(d, x.id) && (esya(d, x.id) > 0 || parca(d, x.id) > 0 || (d.koloni.kaynaklar[x.id] || 0) > 0)) l.push({ id: 'sarf_' + x.id, ad: x.ad + ' (' + (esya(d, x.id) || parca(d, x.id) || d.koloni.kaynaklar[x.id]) + ')', sahip: 'Sarf', bekleme: 1, sarf: x.id });
  return l;
}
function beklemeSuresi(d, y) {
  return Math.max(1, y.bekleme * 0.9 - (kusan(d, 'bas_buyucu_cubbesi') ? 1 : 0));
}
function yetenekSec(d) {
  const s = d.savas;
  const l = yetenekler(d);
  s.yetenekNo = ((s.yetenekNo || 0) + 1) % l.length;
  const y = l[s.yetenekNo];
  const b = s.bekleme[y.id] || 0;
  return [{ ses: 'tik', soz: y.sahip + ': ' + y.ad + (b > 0 ? ', ' + Math.ceil(b) + ' tur bekliyor.' : ', hazır. Çift dokun.') }];
}
function sarfKullan(d, id, o) {
  const s = d.savas;
  if (!harca(d, id)) return [{ soz: 'Elinde kalmadı.', ses: 'red' }];
  if (id === 'dondurucu_kopuk') {
    s.isi = 0;
    s.sistem.kalkan = 0;
    s.torpidoBekle = 0;
    o.push({ ses: 'tislama', soz: 'Dondurucu köpük: kalkan ve silahlar soğudu.' });
    // Xarathia ve ısı düşmanları buzla yavaşlar
    const h = s.dusman;
    if (h && (h.moduller.includes('isi') || h.zayifBuz)) {
      h.donma = Math.max(h.donma || 0, 1);
      if (h.zayifBuz) dusmanaHasar(d, 12, o, 'buz');
    }
  } else if (id === 'sonik_kovucu') {
    const yard = s.dusmanlar.filter((x) => x.kucuk && x.govde > 0);
    for (const x of etkin(s)) if (kara(s) && DUSMANLAR[x.tur].arketip === 'akinci') x.donma = Math.max(x.donma || 0, 1);
    if (!yard.length) o.push({ soz: kara(s) ? 'Sonik kovucu uğulduyor; akıncılar bir tur sersem.' : 'Sonik kovucu uğulduyor ama çağrılmış birim yok.' });
    else if (kara(s)) {
      for (const x of yard) x.govde = 0;
      o.push({ ses: 'sonar', soz: 'Sonik kovucu sürüyü dağıttı.' });
    } else {
      s.sersem = 1;
      o.push({ ses: 'sonar', soz: 'Sonik kovucu: çağrılan birimler bir tur sersem.' });
    }
  } else {
    s.zehir = 0;
    if (id !== 'detoks') stresSifirla(d);
    s.bagisiklik = id === 'vaha_surubu' ? 0 : 3;
    o.push({ ses: 'tislama', soz: id === 'vaha_surubu' ? 'Vaha şurubu: stres ve lanet silindi.' : 'Zehir temizlendi; üç tur bağışıklık.' + (id === 'kseno_panzehir' ? ' Stres de sıfırlandı.' : '') });
  }
  return null;
}
function yetenekKullan(d) {
  const s = d.savas;
  const l = yetenekler(d);
  const y = l[(s.yetenekNo || 0) % l.length];
  if ((s.bekleme[y.id] || 0) > 0) return [{ soz: y.ad + ' ' + Math.ceil(s.bekleme[y.id]) + ' tur daha bekliyor.', ses: 'red' }];
  const kat = d.astralOdak ? 2 : 1;
  const o = [];
  const yuzde = () => (kara(s) ? ' Zırh yüzde ' : ' Gövde yüzde ') + Math.round((100 * canAl(d)) / canMax(d)) + '.';
  if (y.sarf) {
    const r = sarfKullan(d, y.sarf, o);
    if (r) return r;
    s.yetenekNo = 0;
    if (d.savas) o.push(...sira(d));
    return o;
  }
  if (y.id === 'odak') {
    s.odak = 3 * kat;
    o.push({ ses: 'sinyal', soz: 'Odaklanmış Rezonans: ' + 3 * kat + ' tur boyunca atışların ve kalkanın iki kat.' });
  } else if (y.id === 'mor') {
    s.morKalkan = 2 * kat;
    s.silahYok = 1;
    o.push({ ses: 'el_kalkan', soz: y.sahip + ': "Aether kalkana!" Sonraki ' + 2 * kat + ' darbe yarı hasar; bir tur silah enerjisi yok.' });
  } else if (y.id === 'kizil') {
    if (!kilitliMi(d)) return [{ soz: 'Kızıl Odak için tam kilit gerekir.', ses: 'red' }];
    o.push({ soz: y.sahip + ': "Kızıl odak, ateş!"' });
    dusmanaHasar(d, 15 * kat, o, 'kizil');
  } else if (y.id === 'hucre') {
    stresSifirla(d);
    canEkle(d, Math.round(canMax(d) * 0.1 * kat));
    o.push({ ses: 'tislama', soz: y.sahip + ': organik sporlar havalandırmada; ekip soluklandı.' + yuzde() });
  } else if (y.id === 'karartma') {
    s.karartma = kat;
    o.push({ ses: 'sonar', soz: y.sahip + ': karşı frekans patlaması! Düşmanın sıradaki ' + (kat > 1 ? 'iki atışı' : 'atışı') + ' kör.' });
  } else if (y.id === 'kaynak') {
    canEkle(d, Math.round(canMax(d) * 0.25 * kat));
    o.push({ ses: 'kaynak', soz: y.sahip + (kara(s) ? ': zırh plakaları kelepçelendi, acil onarım.' : ': hidrolik kelepçeler sıkıldı, acil kaynak.') + yuzde() });
  } else if (y.id === 'gumus' || y.id === 'atlama') {
    o.push({ ses: 'tislama', soz: y.sahip + (kara(s) ? ': "Çekilme yolu açık." Ekip çatışmadan sıyrılıyor.' : ': "Çekilme rotası hazır." Gemi savaştan sıyrılıyor.') });
    d.astralOdak = false;
    s.bekleme[y.id] = beklemeSuresi(d, y);
    bitir(d, 'kacis', o);
    return o;
  }
  if (d.astralOdak) {
    d.astralOdak = false;
    o.push({ soz: 'Astral iksir: kritik büyü!' });
  }
  s.bekleme[y.id] = beklemeSuresi(d, y);
  if (d.savas) o.push(...sira(d));
  return o;
}

export const KILIT_ACI = 0.14;
// Kalkan ve silah frekansının duyulan tonu; frekans kalkanının üç tonu (kalın, orta, tiz)
export const tonFrek = (x) => Math.round(200 + x * 8);
const TONLAR = [{ ad: 'kalın', f: 25 }, { ad: 'orta', f: 60 }, { ad: 'tiz', f: 95 }];

// Bir görev yerine (Başçarkçı, Telsiz Subayı, Taktik Nişancı, Başhekim, İkmal Subayı) atanmış mürettebat
// Stres verimliliği düşürür (koloniye inince dinlenir). Kara savaşında gemideki görevliler yanında değildir.
export function verimlilik(u) {
  return Math.max(0.5, 1 - (u.stres || 0) / 200);
}
export function gorevli(d, gorevYeri) {
  const g = d.gemi;
  if (!g || kara(d.savas)) return null;
  const odalar = GEMI_SINIFLARI[g.sinif].odalar;
  for (const o of odalar) if (o.gorevYeri === gorevYeri && g.atamalar[o.id]) {
    const u = d.murettebat.find((x) => x.id === g.atamalar[o.id]);
    if (u) return u;
  }
  return null;
}

// --- Oyuncu tarafının dayanıklılığı: uzayda gemi gövdesi, karada kaptan ekibinin zırh bütünlüğü ---
function canAl(d) {
  return kara(d.savas) ? d.savas.can : d.gemi.govde;
}
function canMax(d) {
  return kara(d.savas) ? d.savas.maxCan : d.gemi.maxGovde;
}
function canKoy(d, v) {
  if (kara(d.savas)) d.savas.can = Math.max(0, Math.min(d.savas.maxCan, v));
  else d.gemi.govde = Math.max(0, Math.min(d.gemi.maxGovde, v));
}
function canEkle(d, x) {
  canKoy(d, canAl(d) + x);
}
function stresSifirla(d) {
  const s = d.savas;
  if (kara(s)) s.stres = 0;
  for (const u of d.murettebat) u.stres = 0;
}
function enYuksekStres(d) {
  const s = d.savas;
  if (kara(s)) return s.stres || 0;
  let m = 0;
  for (const id of Object.values((d.gemi && d.gemi.atamalar) || {})) {
    const u = d.murettebat.find((x) => x.id === id);
    if (u) m = Math.max(m, u.stres || 0);
  }
  return m;
}
function stresEkle(d, x) {
  const s = d.savas;
  if (kusan(d, 'bas_buyucu_cubbesi') && x > 0) return;
  let k = x * (bina(d, 'biyo_kubbe') ? 0.7 : 1) * (sahip(d, 'iklim_kubbesi') ? 0.7 : 1) * (d.hazirlik && d.hazirlik.ilac ? 0.5 : 1);
  if (kara(s)) {
    if (s.sistem.kask > 0) k *= 2; // kask hasarlı: solunum bozuk, stres hızlanır
    s.stres = Math.min(100, (s.stres || 0) + k);
    return;
  }
  for (const id of Object.values((d.gemi && d.gemi.atamalar) || {})) {
    const m0 = d.murettebat.find((u) => u.id === id);
    if (m0 && m0.nitelik !== 'sogukkanli' && !E.etkiVar(d, 'guvec')) m0.stres = Math.min(100, (m0.stres || 0) + k);
  }
}

// --- Birim üretimi ---
function birimUret(d, s, tur, r, ek = {}) {
  const t = DUSMANLAR[tur];
  const tier = t.kucuk ? tehditKademesi(d, ek.anaTier || 1) : ek.tier || tehditKademesi(d, t.tier);
  const T = TEHDIT[tier];
  const govde = Math.round(t.govde * T.can);
  const no = (s.birimNo = (s.birimNo || 0) + 1);
  return {
    no,
    tur,
    ad: t.ad,
    tier,
    govde,
    max: govde,
    kalkan: t.kalkan,
    kalkanFrek: t.moduller.includes('frekans') ? TONLAR[Math.floor(r() * 3)].f : Math.round(30 + r() * 60),
    delik: false,
    aci: ek.aci != null ? ek.aci : (r() < 0.5 ? -1 : 1) * (0.6 + r() * 1.4),
    mesafe: t.kucuk ? 25 : 40,
    moduller: [...(t.moduller || [])],
    kucuk: !!t.kucuk,
    karanlik: !!t.karanlik,
    faz: 0,
    frek: t.frek,
    teslim: !!t.teslim,
    sahte: !!t.sahte,
  };
}
function etkin(s) {
  return s.dusmanlar.filter((x) => x.govde > 0 && !x.kacti);
}
// Etkin hedef: pruvanın (nişanın) karşısındaki ses
function hedefSec(s) {
  const l = etkin(s);
  if (!l.length) return null;
  let en = l[0];
  for (const x of l) if (Math.abs(x.aci) < Math.abs(en.aci)) en = x;
  const eski = s.hedef;
  s.hedef = s.dusmanlar.indexOf(en);
  s.dusman = en;
  return eski !== s.hedef && eski != null ? en : null;
}
function bagla(s) {
  if (!s) return;
  if (!s.dusmanlar) {
    // Eski kayıt (tek düşmanlı 1.x savaşı): birim listesine çevir
    s.dusmanlar = [{ no: 1, tur: s.tur, tier: 1, moduller: [...((DUSMANLAR[s.tur] || {}).moduller || [])], faz: 0, frek: (DUSMANLAR[s.tur] || {}).frek || 140, delik: s.delik, ...s.dusman }];
    s.ortam = 'uzay';
    s.hedef = 0;
  }
  s.dusman = s.dusmanlar[s.hedef] && s.dusmanlar[s.hedef].govde > 0 ? s.dusmanlar[s.hedef] : etkin(s)[0] || s.dusmanlar[0];
  s.hedef = s.dusmanlar.indexOf(s.dusman);
}

// spec: düşman türü (string) ya da { dusmanlar: [tur], ortam, gelis, cevre, ikincil, tier }
export function savasBaslat(d, spec) {
  if (typeof spec === 'string') spec = { dusmanlar: [spec] };
  const ilk = DUSMANLAR[spec.dusmanlar[0]];
  const ortam = spec.ortam || ilk.ortam || 'uzay';
  const r = uretec((d.tohum || 1) * 31 + (d.savasNo = (d.savasNo || 0) + 1));
  const tohum = Math.floor(r() * 1e9);
  const s = {
    ortam,
    gelis: spec.gelis || (spec.dusmanlar.length > 1 ? 'kiskac' : 'tek'),
    cevre: spec.cevre || null,
    tur: spec.dusmanlar[0],
    dusmanlar: [],
    hedef: 0,
    silahFrek: 15,
    evre: 'oyuncu',
    t: 0,
    sonraki: 4,
    uyari: null,
    sistem: ortam === 'kara' ? { itici: 0, kalkan: 0, kask: 0 } : { itici: 0, kalkan: 0, reaktor: 0 },
    isi: 0,
    raunt: 0,
    stres: 0,
    zehir: 0,
    bagisiklik: 0,
    tohum, // kayda girebilsin diye üreteç değil tohum ve sayaç saklanır
    sayac: 0,
    kilitDendi: false,
    bekleme: {},
    yetenekNo: 0,
    kacanlar: [],
    olenler: [],
    siraNo: 0,
  };
  d.savas = s;
  // Karada ekibin zırh bütünlüğü: kademe, kuşanılan zırh ve yüzey aracı
  if (ortam === 'kara') {
    // Zırh katkıları (v4 eşya belgesi): oksit +350, lamine takım +200, termal giysi +150, kemik-alaşım +120, cıva +95 (binde)
    let m = 100 * (1 + 0.5 * (oyuncuKademesi(d) - 1));
    let ek = 0;
    if (kusan(d, 'oksit_zirhi')) ek += 0.35;
    if (lamineVar(d)) ek += 0.2;
    if (sahip(d, 'termal_giysi')) ek += 0.15;
    if (kusan(d, 'kemik_zirh')) ek += 0.12;
    if (kusan(d, 'civa_plakasi')) ek += 0.095;
    m *= 1 + ek;
    // Gezegen yüzeyinde geminin alt kızağındaki ya da hangarındaki araç eşlik eder; Aethelis'te bindiğin araç
    const tas = spec.gezegen && d.gemi && d.gemi.tasinan && d.gemi.tasinan.length ? d.gemi.tasinan[0] : null;
    s.arac = tas || d.arac || ((d.araclar || []).includes('akrep') ? 'akrep' : null);
    if (s.arac === 'mammoth') m *= 1.5;
    s.maxCan = Math.round(m);
    s.can = s.maxCan;
  }
  const n = spec.dusmanlar.length;
  spec.dusmanlar.forEach((tur, i) => {
    const aci = n === 1 ? null : spec.gelis === 'oncu' ? (i === 0 ? 0.4 : -0.9) : (i % 2 === 0 ? -1 : 1) * (0.7 + r() * 0.6);
    const b = birimUret(d, s, tur, r, { aci, tier: spec.tier });
    if (spec.gelis === 'oncu' && i > 0) b.mesafe = 60;
    if (i === 0 && spec.ikincil && !b.moduller.includes(spec.ikincil)) b.moduller.push(spec.ikincil);
    s.dusmanlar.push(b);
  });
  if (s.gelis === 'oncu' && n > 1) s.dusmanlar[0].onculuk = true;
  if (s.gelis === 'konvoy') s.dusmanlar[0].kaciyor = 4;
  if (s.gelis === 'sizma') {
    s.sizma = true;
    s.sonraki = 9;
  }
  if (s.gelis === 'tuzak') s.tuzak = true;
  if (spec.bagisik) s.bagisiklik = 99; // biyo-kubbe ya da karantina: zehir işlemez
  // Evrensel bina sistemi: sefer öncesi yapılan hazırlıklar bu çatışmada harcanır
  const hz = savasHazirligi(d);
  if (hz.tarama) s.taramaEk = 0.5;
  if (hz.ziyafet) s.ziyafet = 2;
  if (hz.istihbarat && !s.sizma) {
    s.sizma = true;
    s.sonraki = Math.max(s.sonraki, 9);
  }
  hedefSec(s);
  const h0 = s.dusmanlar[0];
  // Kahergonat gizli geçit haritası: zırhlılar hazırlıksız yakalanır
  if (h0.tur === 'kahergonat_zirhlisi' && esya(d, 'gecit_haritasi') > 0) {
    h0.govde = Math.round(h0.govde * 0.7);
    h0.max = h0.govde;
  }
  const ek = [];
  if (h0.karanlik || h0.tur === 'yabanci_firkateyn') {
    const k = SB.kriz(d, 'sinha');
    if (k) ek.push({ soz: k });
  }
  const g = GELISLER[s.gelis];
  const giris = spec.giris ? [spec.giris] : [];
  // Dinleme kulesi pusuları ve yabancı firkateyni önceden bildirir; tuzakta ilk saldırı erken gelir
  if (s.tuzak) {
    if (bina(d, 'sinyal_kulesi') || sahip(d, 'parazit_sensoru')) giris.push('Dinleme kulesi uyarmıştı: sinyal bir tuzak. Hazırsın.');
    else {
      giris.push(g.soz);
      s.sonraki = 0.8;
    }
  } else if (g.soz) giris.push(g.soz);
  if (h0.tur === 'yabanci_firkateyn' && bina(d, 'sinyal_kulesi')) giris.push('Dinleme kulesi bu imzayı tanıyor: tanımsız yabancı firkateyn.');
  if (s.cevre) giris.push(CEVRELER[s.cevre].soz);
  // Komuta merkezinin taktik harp dairesi düşmanın arketipini ve davranışlarını söyler; ilk uyarıya yarım saniye
  if (bina(d, 'komuta_merkezi')) {
    s.taktik = true;
    giris.push('Taktik harp dairesi: ' + s.dusmanlar.map((x) => x.ad + (x.moduller.length ? ' (' + x.moduller.map((m0) => MODULLER[m0].ad.toLowerCase()).join(', ') + ')' : '')).join('; ') + '.');
  }
  // Galaktik Öncü kademesi: korsanlar adını tanır; ilk sırada savaşmadan korkutup kaçırma (karakter ağı belgesi 5.1)
  if (evrenEtki(d).korsan && s.dusmanlar.every((x) => /korsan/.test(x.tur)) && !s.dusmanlar.some((x) => DUSMANLAR[x.tur].boss)) {
    s.korkut = true;
    giris.push('Korsanlar adını tanıdı. İlk sırada iki parmakla yukarı kaydır: savaşmadan korkutup kaçır.');
  }
  // Tonoflenya final cephesi (16-18): en az üç kuşak güvenliyse müttefik takviyesi, değilse cephe savunmasız
  if (d.tf && [16, 17, 18].includes(d.tf.aktif)) {
    const g = ['ygk', 'bati', 'guney', 'dogu', 'kuzey'].filter((k) => kusakGuvenli(d, k)).length;
    if (g >= 3) {
      s.isaret = 3;
      giris.push('Güvenli kuşaklardan müttefik takviyesi ve ikmal geldi: ' + g + ' kuşağın gemileri düşmanı işaretliyor.');
    } else {
      s.cephe = -0.2;
      giris.push('Cephe savunmasız: yalnız ' + g + ' kuşak güvenli, müttefik takviyesi yok.');
    }
  }
  const adlar = s.dusmanlar.map((x) => x.ad).join(' ve ');
  const nasil = ortam === 'kara'
    ? 'Sesi iki kulakta eşitle: sağa sola kaydır, nişan al. Kilit tonunda dokun: ateş; yukarı kaydır: ağır saldırı; iki parmakla çevir: silah frekansını kalkanına ya da zırhına eşle. Uyarı sesinde: iki parmakla dokun siper, ters yana kaydır kaçınma, mermiye çift dokun karşı ateş. Kendi sıranda aşağı kaydır: yetenek ya da sarf seç; çift dokun: kullan. Basılı tut: durum.'
    : 'Motor sesini iki kulakta eşitle: sağa sola kaydır. Kilit tonunda dokun: ateş; yukarı kaydır: torpido; iki parmakla çevir: silah frekansını kalkanına eşle. Uyarı sesinde: iki parmakla dokun kalkan, ters yana kaydır kaçınma, torpidoya çift dokun karşı ateş. Kendi sıranda aşağı kaydır: yetenek ya da sarf seç; çift dokun: kullan. Basılı tut: durum ve düşman kalkanının tonu.';
  const bas = (ortam === 'kara' ? 'Çatışma! ' : 'Savaş duruşu! ') + adlar + ' saldırıyor (' + TEHDIT[h0.tier].ad + '). ' + giris.join(' ') + ' ' + nasil;
  return [{ soz: bas, ses: 'alarm' }, { nota: { frek: tonFrek(h0.kalkanFrek), sure: 1.2 } }, ...ek];
}

function kilitPayi(d, h) {
  const s = d.savas;
  let p = KILIT_ACI * (yet(d, 'A1') ? 1.43 : 1) * (esya(d, 'feneri_kristali') > 0 ? 1.5 : 1);
  if (sahip(d, 'sogut_nisangahi')) p *= 1.6; // T-08 gümüş söğüt nişangâhı
  if (!kara(s) && d.gemi && d.gemi.sinif === 1) p *= 1.15; // Kıvılcım hızla döner
  if (kara(s) && s.arac === 'col_tilkisi') p *= 1.2;
  if (enYuksekStres(d) >= 100) p *= 0.6; // zihin paraziti: isabet bozulur
  if (h && h.kilitCarpani) p *= h.kilitCarpani;
  if (s.isaret > 0) p *= 1.3;
  return p;
}
export function kilitliMi(d) {
  bagla(d.savas);
  return Math.abs(d.savas.dusman.aci) < kilitPayi(d, d.savas.dusman);
}

// Silahın ışık/aether niteliği (karanlık düşmana karşı)
function isikliMi(d, tur) {
  if (tur === 'kizil' || tur === 'buz') return false;
  return kusan(d, 'isik_mizragi') || kusan(d, 'tyzrakhel_mizragi') || (tur === 'torpido' && esya(d, 'aether_muhimmati') > 0) || d.bayrak.tf_astral;
}

function dusmanaHasar(d, x, olaylar, tur, hedef) {
  const s = d.savas;
  const dm = hedef || s.dusman;
  if (!dm || dm.govde <= 0) return;
  const T = DUSMANLAR[dm.tur];
  let h = x * oyuncuGucu(d, s) * (d.bayrak && d.bayrak.akademiAskeri ? 1.05 : 1); // akademinin askerî Ar-Ge'si (3A)
  // Kuşanılan silah: karada doğrudan el silahı, uzayda kaptanın bataryasına odak
  if (tur === 'birincil') {
    if (kusan(d, 'plazma_tufegi')) h *= 1.8;
    else if (kusan(d, 'kara_buz_hancer')) {
      h *= 1.2;
      // Karada iki tur dondurur; uzayda hedefin bir sonraki uyarı penceresini yarım saniye yavaşlatır
      if (kara(s)) dm.donma = dm.moduller.includes('isi') ? 3 : 2;
      else if (dm.moduller.includes('isi')) dm.donma = 2;
      else s.yavas = 0.5;
    } else if (kusan(d, 'isik_mizragi')) h *= 2.4 * (dm.karanlik ? 2 : 1);
    else if (kusan(d, 'tyzrakhel_mizragi')) h *= 2.6 * (dm.karanlik ? 2 : 1);
    else if (kusan(d, 'golge_yayici')) s.dusmanMoral = true;
    else if (kusan(d, 'onur_kilici')) h *= 2 * (dm.karanlik ? 1.5 : 1);
    else if (kusan(d, 'haydut_tabancasi')) h *= 1.5;
    else if (kusan(d, 'sonik_tufek')) h *= 1.8;
    else if (kusan(d, 'geometrik_namlu')) h *= 2.4;
    if (kara(s) && s.arac === 'mammoth') h *= 1.3;
    if (numuneSayisi(d) >= 10) h *= 1.1; // akademi: on numune
    // Hisar-ı Kadim'in ağır bataryaları çoklu düşmana eşzamanlı vurur
  }
  if (!kara(s) && bina(d, 'askeri_tersane')) h *= 1.15; // askeri tersane: gemi silah hasarı
  if (tur === 'torpido' && (sahip(d, 'plazma_pencesi'))) h *= 1.5; // T-07 bordalama pençesi
  // Rüzgarkıran'ın madencilik lazerleri zırhı eritir
  if (!kara(s) && sinifi(d) === 2 && DUSMANLAR[dm.tur].arketip === 'zirhli') h *= 1.25;
  if (!kara(s) && mod(d, 'varek_bataryasi')) h *= 1.18; // yan görev 4
  // Yan görev ödülleri: cam akrebi zehri (asit kaplama), Deli Simyacı Malakor (torpido yarıçapı)
  if (tur === 'torpido' && esya(d, 'akrep_zehri') > 0) {
    d.esya.akrep_zehri -= 1;
    h *= 1.3;
  }
  if (tur === 'torpido' && ozelVar(d, 'Malakor')) h *= 1.2;
  let muhimmat = false;
  if (tur === 'torpido' && esya(d, 'aether_muhimmati') > 0) {
    d.esya.aether_muhimmati -= 1;
    muhimmat = true;
    h *= 1.5;
  }
  // Frekans kalkanı: yanlış tonda gelen atış yüzde yetmiş azalır; sonik tüfek ve geometrik namlu tonu çözer
  const frekansli = dm.moduller.includes('frekans');
  if (frekansli && tur === 'birincil' && sahip(d, 'sonik_tufek') && !dm.delik) {
    dm.delik = true;
    dm.kalkanKilit = 2;
    olaylar.push({ soz: 'Sonik çığlık kalkanı iki tur kilitledi.' });
  }
  const delik = dm.delik || (!kara(s) && mod(d, 'k3_plazma_bobini') && !frekansli) || tur === 'kizil' || muhimmat || (tur === 'birincil' && (kusan(d, 'golge_yayici') || kusan(d, 'geometrik_namlu')));
  if (!delik) {
    if (frekansli) {
      const yari = (!kara(s) && mod(d, 'k3_plazma_bobini')) || (kara(s) && s.arac === 'mammoth');
      h *= yari ? 0.65 : 0.3;
    } else h *= 1 - dm.kalkan * (tur === 'torpido' ? 0.5 : 1) * (tur === 'birincil' && kusan(d, 'plazma_tufegi') ? 0.85 : 1) * (kara(s) && bina(d, 'askeri_tersane') ? 0.85 : 1);
  }
  // Karanlık: kinetik ve plazma atışlara yüzde elli direnç (ışık ve aether hariç)
  if (dm.karanlik && !isikliMi(d, tur)) h *= 0.5;
  // Öncü, arkasındaki destekçi yaşarken korunur
  if (dm.onculuk && s.dusmanlar.some((x) => x !== dm && x.govde > 0 && !x.kucuk)) h *= 0.5;
  // Boss aşamalarının zayıf noktaları ve ölümsüzlük mühürleri
  if (dm.zayif) {
    if (dm.zayif.torpido && tur === 'torpido') h *= dm.zayif.torpido;
    if (dm.zayif.isik && isikliMi(d, tur)) h *= dm.zayif.isik;
    if (dm.zayif.buz && (tur === 'buz' || kusan(d, 'kara_buz_hancer') || E.etkiVar(d, 'super_iletken'))) h *= dm.zayif.buz;
    if (dm.zayif.frekans && dm.delik) h *= dm.zayif.frekans;
  }
  if (dm.olumsuz) {
    if (kusan(d, 'tyzrakhel_mizragi') || (tur === 'birincil' && esya(d, 'tyzrakhel_parcasi') > 0)) {
      h *= 3;
      olaylar.push({ soz: 'Tyzrakhel\'in ışığı gölge zırhını yarıyor!' });
    } else h *= 0.1;
  }
  if (tur === 'kizil') h *= 1.5;
  if (s.odak > 0) h *= 2;
  if (s.ziyafet > 0) h *= 1.15;
  // Yıldız Zamanı sinerjisi (gizli): Varek nöbetinde termal ve plazma, Elyndra nöbetinde aether ve ışık silahları güçlü
  const y = d.zaman ? nobet(d).yildiz : null;
  if (y === 'Varek' && (tur === 'kizil' || kusan(d, 'plazma_tufegi'))) h *= 1.1;
  if (y === 'Elyndra' && (isikliMi(d, tur) || muhimmat)) h *= 1.1;
  // Sessiz sızma: fark edilmeden atılan ilk atış iki kat
  if (s.sizma) {
    h *= 2;
    s.sizma = false;
    s.sonraki = s.t + 1.5;
    olaylar.push({ soz: 'Sessiz ilk vuruş!' });
  }
  // Final görevlerinin kalıcı ödülleri: saf astral ışık, efsanevi aether reaktörü
  if (d.bayrak.tf_astral) h *= 1.15;
  if (!kara(s) && mod(d, 'efsanevi_reaktor')) h *= 1.25;
  // Varek: kritik vuruş; Kızıl baskın (Kırmızı 4. kademe): ilk isabet kritik
  const kb = (esya(d, 'kara_buz_parcasi') > 0 ? 0.15 : 0) + (sahip(d, 'sogut_nisangahi') ? 0.3 : 0); // kara buz kaplaması, T-08 söğüt nişangâhı
  if ((SB.kritikIhtimal(d) + kb && zar(s) < SB.kritikIhtimal(d) + kb) || (SB.kabiliyet(d, 'varek', 4) && !s.ilkIsabet)) {
    h *= 2;
    if (esya(d, 'kara_buz_parcasi') > 0) d.esya.kara_buz_parcasi -= 1;
    olaylar.push({ soz: 'Kritik vuruş!' });
  }
  s.ilkIsabet = true;
  // A-2 rezonans ayırt etme: zayıf noktaya kritik vuruş (her üç isabette bir)
  if (yet(d, 'A2')) {
    s.isabet = (s.isabet || 0) + 1;
    if (s.isabet % 3 === 0) {
      h *= 2;
      olaylar.push({ soz: 'Kritik! Zayıf noktadan vurdun.' });
    }
  }
  const nis = gorevli(d, 'Taktik Nişancı');
  if (nis) h *= 1 + 0.3 * verimlilik(nis);
  h *= E.verilenHasarCarpani(d); // prizmatik odaklama lensi
  dm.govde = Math.max(0, dm.govde - Math.round(h));
  olaylar.push({ ses: 'patlama', hasar: true });
  // Hisar-ı Kadim'in bataryaları yan birimlere de yarım vurur
  if (tur === 'birincil' && !kara(s) && sinifi(d) === 5) for (const x of etkin(s)) if (x !== dm) x.govde = Math.max(0, x.govde - Math.round(h * 0.5));
  // T-06 geometrik namlu gözetmeni (Ignador): her isabette kalkan yeniler
  if (tur === 'birincil' && kusan(d, 'geometrik_namlu') && d.gozetmen && d.gozetmen.ignador) s.isi = Math.max(0, s.isi - 10);
  // Gölge yayıcının alevi yan birimleri de yakar
  if (tur === 'birincil' && kusan(d, 'golge_yayici')) for (const x of etkin(s)) if (x !== dm && x.kucuk) x.govde = Math.max(0, x.govde - Math.round(h * 0.5));
  // EMP şok dalga topu: torpido isabeti düşmanın sistemini bir tur kilitler
  if (tur === 'torpido' && !kara(s) && mod(d, 'emp_topu')) dm.donma = Math.max(dm.donma || 0, 1);
  if (dm.govde <= 0) {
    s.olenler.push(dm.tur);
    olaylar.push({ soz: dm.ad + ' etkisiz.' });
  } else {
    fazDenetle(d, dm, olaylar);
    // Pusucu: her isabette yer değiştirir (yeniden kilit ister)
    if (dm.moduller.includes('pusucu') && !dm.kucuk) {
      dm.aci = (dm.aci >= 0 ? -1 : 1) * (0.6 + zar(s) * 0.8);
      olaylar.push({ soz: dm.ad + ' yer değiştirdi.' });
    }
    kacisDenetle(d, dm, olaylar);
  }
  // B-2 bastırma ateşi: uyarı sürerken isabet, saldırıyı keser
  if (s.uyari && yet(d, 'B2') && s.uyari.kim === dm.no) {
    s.uyari = null;
    s.evre = 'oyuncu';
    s.sonraki = s.t + 3;
    olaylar.push({ soz: 'Bastırma ateşi: düşmanın saldırısı kesildi!' });
  }
  bitisDenetle(d, olaylar);
}

// Boss ve mini-boss aşama geçişleri
function fazDenetle(d, dm, olaylar) {
  const s = d.savas;
  const f = DUSMANLAR[dm.tur].fazlar;
  if (!f) return;
  while (dm.faz < f.length && dm.govde / dm.max <= f[dm.faz].esik) {
    const x = f[dm.faz];
    dm.faz += 1;
    olaylar.push({ soz: x.soz, ses: 'alarm', faz: dm.faz + 1 });
    if (x.kalkan != null) dm.kalkan = x.kalkan;
    if (x.moduller) dm.moduller = [...x.moduller];
    if (x.pencere) dm.pencere = x.pencere;
    if (x.zayif) dm.zayif = { ...(dm.zayif || {}), ...x.zayif };
    if (x.zayif && x.zayif.buz) dm.zayifBuz = true;
    if (x.hasarCarpani) dm.hasarCarpani = x.hasarCarpani;
    if (x.olumsuz) dm.olumsuz = true;
    if (x.sahte) dm.sahte = true;
    if (x.frek) dm.frek = x.frek;
    if (x.kilit) dm.kilitCarpani = x.kilit;
    if (x.cagir) for (const c of x.cagir) yardimciCagir(d, dm, c, olaylar, true);
    s.uyari = null;
    s.evre = 'oyuncu';
    s.sonraki = s.t + 3;
  }
}
function yardimciCagir(d, dm, tur, olaylar, sessiz) {
  const s = d.savas;
  if (s.dusmanlar.filter((x) => x.kucuk && x.govde > 0).length >= 3) return;
  const r = () => zar(s);
  const b = birimUret(d, s, tur, r, { anaTier: dm.tier, aci: (zar(s) < 0.5 ? -1 : 1) * (0.5 + zar(s) * 0.9) });
  s.dusmanlar.push(b);
  if (!sessiz) olaylar.push({ soz: dm.ad + ' bir ' + b.ad + ' çağırdı, ' + (b.aci > 0 ? 'solda' : 'sağda') + '.', ses: 'sonar' });
}
// Kaçış modülü: yüzde otuzun altında kaçmaya çalışır; yüzde yirmi beşte teslim teklif eder
function kacisDenetle(d, dm, olaylar) {
  const s = d.savas;
  const oran = dm.govde / dm.max;
  if (dm.moduller.includes('kacis') && oran < 0.3 && dm.kaciyor == null) {
    if (sahip(d, 'plazma_pencesi') || (!kara(s) && (mod(d, 'dis_a') || mod(d, 'cekici_isin')))) {
      dm.kaciyor = 0;
      dm.kilitli = true;
      olaylar.push({ soz: 'Çekici kiriş ' + dm.ad + ' adlı düşmanın kaçış motorlarını kilitledi; kaçamaz.' });
    } else {
      dm.kaciyor = mod(d, 'asiri_iyon_itici') ? 3 : 2;
      olaylar.push({ soz: dm.ad + ' motorlarını ısıtıyor, kaçmaya çalışıyor! ' + dm.kaciyor + ' tur içinde indir.', ses: 'hidrolik' });
    }
  }
  if (dm.teslim && oran <= (evrenEtki(d).korsan && /korsan|yagmaci/.test(dm.tur) ? 0.35 : 0.25) && !dm.teslimDendi) {
    dm.teslimDendi = true;
    s.teslimTeklif = dm.no;
    olaylar.push({ soz: dm.ad + ' teslim olmayı teklif ediyor. Kabul için iki parmakla yukarı kaydır.' });
  }
}
function kusakGuvenli(d, g) {
  return gucItibari(d, g) >= 20;
}
function bitisDenetle(d, olaylar) {
  const s = d.savas;
  if (!s) return;
  if (!etkin(s).length) {
    bitir(d, s.olenler.length ? 'zafer' : 'kacti', olaylar);
    return;
  }
  const yeni = hedefSec(s);
  if (yeni) olaylar.push({ soz: 'Hedef: ' + yeni.ad + '.' });
}

function bitir(d, sonuc, olaylar) {
  const s = d.savas;
  if (!s) return;
  bagla(s);
  const ana = s.dusmanlar[0];
  d.savasSon = { sonuc, ad: ana.ad, tur: ana.tur, ortam: s.ortam, kacan: s.kacanlar.length };
  const sonraSahne = d.savasSonraSahne;
  if (d.yan && d.yan.hardrinBariyer > 0) d.yan.hardrinBariyer -= 1;
  d.savasSonraSahne = null;
  if (sonuc === 'zafer') SB.ekolKazan(d, 'varek', 30);
  const kat = (t) => 1 + 0.3 * ((t || 1) - 1);
  if (sonuc === 'kacis') {
    d.sahne = 'savas_son';
  } else if (sonuc === 'zafer' || sonuc === 'ateskes' || sonuc === 'kacti') {
    // Ganimet: indirilen her düşmanın payı tehdit kademesiyle büyür; kaçanlar ve teslim yarısını bırakır
    const pay = {};
    for (const x of s.dusmanlar) {
      if (x.kucuk) continue;
      const g = DUSMANLAR[x.tur].ganimet || {};
      const oran = x.govde <= 0 ? 1 : x.teslimEtti ? 0.5 : x.kacti ? 0 : 0;
      for (const k of Object.keys(g)) pay[k] = (pay[k] || 0) + Math.round(g[k] * kat(x.tier) * oran);
    }
    if (sonuc === 'ateskes' && !Object.keys(pay).length) for (const k of Object.keys(DUSMANLAR[ana.tur].ganimet || {})) pay[k] = Math.round(DUSMANLAR[ana.tur].ganimet[k] / 2);
    // Rüzgarkıran destek gemisi enkazdan metal ve kristali yüzde otuz beş fazla toplar; Akrep ganimeti otomatik toplar;
    // T-07 plazma pençesi enkazdan yüzde elli fazla hurda
    const ganimetKat = (!kara(s) && destekSinifi(d) === 2 ? 1.35 : 1) * (s.arac === 'akrep' || (d.araclar || []).includes('akrep') ? 1.2 : 1);
    for (const k of Object.keys(pay)) pay[k] = Math.round(pay[k] * ganimetKat * (sahip(d, 'plazma_pencesi') && ['sasi_celigi', 'plaka', 'zirhli_plaka'].includes(k) ? 1.5 : 1));
    for (const k of Object.keys(pay)) if (pay[k] > 0) {
      if (d.koloni.kaynaklar[k] != null) d.koloni.kaynaklar[k] += pay[k];
      else d.koloni.parcalar[k] = (d.koloni.parcalar[k] || 0) + pay[k];
    }
    d.savasSon.ganimet = pay;
    const t = ana.tier || 1;
    d.kaptan.tecrube += sonuc === 'zafer' ? 80 + 20 * (t - 1) : sonuc === 'ateskes' ? 60 : 20;
    d.itibar += sonuc === 'zafer' ? 20 : sonuc === 'ateskes' ? 30 : 5;
    // C-3 hurda yamama: iticiler tersaneye dönmeden çalışır
    d.savasSon.yama = yet(d, 'C3') && !kara(s);
    if (d.savasSon.yama) d.gemi.govde = Math.min(d.gemi.maxGovde, d.gemi.govde + Math.round(d.gemi.maxGovde * 0.15));
    d.sahne = 'savas_son';
  } else {
    if (kara(s)) {
      // Ekip acil tahliye edilir: Aethelis'te kapsüle, Tonoflenya'da akademinin iskelesine
      if (!(d.bayrak && d.bayrak.tonoflenyada) && d.mekan) {
        d.mekan = 'kapsul';
        d.oyuncu = { x: 303, y: 3.5, yon: 0 };
      }
      d.oto = null;
    } else {
      d.gemi.govde = 1;
      d.gemi.yer = 'kizak';
      d.uzay = null;
      // Ambardaki Tonoflenya mallarının beşte biri enkazda kalır; Barracuda kolonideyse kayıp olmaz
      if (!misafir(d, 'barracuda')) {
        let kayip = 0;
        for (const k of TONOFLENYA_HAMMADDELERI) {
          const v = d.koloni.kaynaklar[k] || 0;
          const x = Math.floor(v * 0.2);
          if (x > 0) {
            d.koloni.kaynaklar[k] = v - x;
            kayip += x;
          }
        }
        d.savasSon.kargoKaybi = kayip;
      }
    }
    // Kriyojenik şok iğnesi: ağır yaralılar stasiste koloniye ulaşır, yas tutulmaz (bir kez)
    if (E.etkiVar(d, 'kriyo')) {
      d.seferEtki.kriyo = 0;
      d.savasSon.kriyo = true;
    } else if (bina(d, 'kseno_eczane') || (d.hazirlik && d.hazirlik.ilac)) d.savasSon.eczane = true; // eczane ya da tedavi iğneleri: kayıp yok
    else SB.moralKaybi(d, 5); // yenilgi kolonide yas (Axira yarıya indirir)
    d.sahne = 'savas_son';
  }
  // Bölge hastanesi: savaş sonrası yaralanma ve travma cezaları temizlenir
  if (bina(d, 'hastane')) for (const u of d.murettebat) u.stres = 0;
  // Uzayda sert kaçış manevrası ek yakıt yakar (dinamik yakıt belgesi bölüm 1 adım 3)
  if (sonuc === 'kacis' && !kara(s) && d.gemi) d.gemi.yakit = Math.max(0, d.gemi.yakit - 4);
  // Doku rejenerasyon merhemi: revirde yaralılar iyileşir, stres yarıya
  if (E.etkiVar(d, 'merhem')) for (const u of d.murettebat) u.stres = Math.round((u.stres || 0) / 2);
  // Final görevlerindeki çatışma: zaferde görevin sonraki sahnesi
  if ((sonuc === 'zafer' || sonuc === 'ateskes') && sonraSahne) {
    d.sahne = sonraSahne;
    if (ZAFER_KANCALARI[sonraSahne]) ZAFER_KANCALARI[sonraSahne](d);
  }
  d.savas = null;
  olaylar.push({ bitti: true });
}

export function savasGirdi(d, g) {
  const s = d.savas;
  if (!s) return [];
  bagla(s);
  const o = [];
  const dm = s.dusman;
  if (g.tur === 'kaydir' && (g.yon === 'sag' || g.yon === 'sol') && !s.uyari) {
    for (const x of s.dusmanlar) x.aci += g.yon === 'sag' ? 0.26 : -0.26;
    const yeni = hedefSec(s);
    if (yeni && etkin(s).length > 1) o.push({ soz: 'Hedef: ' + yeni.ad + '.' });
    const k = kilitliMi(d);
    if (k && !s.kilitDendi) o.push({ ses: 'kilitTonu' });
    s.kilitDendi = k;
    return o.length ? o : [{ ses: 'tik' }];
  }
  if (g.tur === 'dondur') {
    s.silahFrek = Math.max(0, Math.min(120, s.silahFrek + g.f * 7));
    const tol = (SB.kabiliyet(d, 'sinha', 4) ? 6 : 3) * (bina(d, 'kuantum_lab') ? 1.5 : 1) + (!kara(s) && destekSinifi(d) === 3 ? 2 : 0);
    if (!dm.delik && Math.abs(s.silahFrek - dm.kalkanFrek) < tol) {
      dm.delik = true;
      return [{ soz: 'Silah frekansı ' + (kara(s) ? 'zırhın tonuyla' : 'kalkanla') + ' eşleşti; ' + (kara(s) ? 'zırh' : 'kalkan') + ' delinebilir.', ses: 'sinyal' }];
    }
    if (Math.abs(s.silahFrek - (s.sonNota || 0)) >= 2) {
      s.sonNota = s.silahFrek;
      return [{ nota: { frek: tonFrek(s.silahFrek), sure: 0.25 } }];
    }
    return [];
  }
  if (s.uyari) {
    // Reaktif savunma penceresi
    const u = s.uyari;
    const sil = SILAHLAR[u.silah];
    if (!kara(s) && s.sistem.reaktor > 0 && !yet(d, 'C2')) return [{ soz: 'Reaktör kilitli; sistemler yanıt vermiyor!', ses: 'red' }];
    // Mor Yıldız 4. kademe: taktik teleport (çatışma başına bir kez)
    if (g.tur === 'dokun' && g.parmak >= 3 && SB.kabiliyet(d, 'elyndra', 4)) {
      if (s.teleport) return [{ soz: 'Teleport bobinleri bu çatışmada boşaldı.', ses: 'red' }];
      s.teleport = true;
      u.savunma = 'teleport';
      return [{ ses: 'el_kalkan', soz: 'Teleport!' }];
    }
    if (g.tur === 'dokun' && g.parmak >= 2) {
      if (s.sistem.kalkan > 0) return [{ soz: kara(s) ? 'Siper parçalandı; siper açılmıyor!' : 'Kalkan kondansatörü aşırı ısındı; kalkan açılmıyor!', ses: 'red' }];
      u.savunma = 'kalkan';
      return [{ ses: 'valf', soz: kara(s) ? 'Siper!' : 'Kalkan!' }];
    }
    if (g.tur === 'kaydir' && (g.yon === 'sag' || g.yon === 'sol')) {
      const dogru = u.yon === 'sag' ? 'sol' : 'sag';
      if (s.sistem.itici > 0) return [{ soz: kara(s) ? 'Bacak servoları kilitli; yana atlayamıyorsun!' : 'Yön iticileri kilitli; tepkisiz itki!', ses: 'red' }];
      if (g.yon === dogru) {
        u.savunma = 'kacinma';
        return [{ ses: 'tislama' }];
      }
      return [{ soz: 'Yanlış yöne!', ses: 'red' }];
    }
    if (g.tur === 'kaydir' && g.yon === 'asagi' && u.silah === 'torpido' && yet(d, 'D1')) {
      u.savunma = 'chaff';
      return [{ ses: 'tislama', soz: 'Sahte gürültü patlaması!' }];
    }
    if (g.tur === 'cift' && sil.karsi) {
      u.savunma = 'karsi';
      return [{ ses: 'patlama', soz: 'Karşı ateş!' }];
    }
    if (g.tur === 'dokun' && yet(d, 'B2')) {
      // Bastırma ateşi denemesi
      if (!kilitliMi(d)) return [{ soz: 'Iskaladın.', ses: 'red' }];
      dusmanaHasar(d, 8, o, 'birincil');
      return o;
    }
    return [];
  }
  // Oyuncu evresi: yetenekler ve sarf
  if (g.tur === 'kaydir' && g.yon === 'asagi' && g.parmak < 2) return yetenekSec(d);
  if (g.tur === 'cift' && (g.parmak || 1) < 2) return yetenekKullan(d);
  if (s.silahYok > 0 && (g.tur === 'dokun' && g.parmak < 2 || g.tur === 'kaydir' && g.yon === 'yukari')) return [{ soz: 'Silah enerjisi kalkanda; bu tur ateş yok.', ses: 'red' }];
  if (g.tur === 'dokun' && g.parmak < 2) {
    s.eylem = true;
    s.sonEylem = 'birincil';
    if (!kilitliMi(d)) {
      // Sessiz sızmada ıska gürültü yapar: düşman alarmda, takviyeyle gelir
      if (s.sizma) {
        s.sizma = false;
        s.sonraki = s.t + 0.8;
        yardimciCagir(d, dm, kara(s) ? 'yavru' : 'saldiri_dronu', o);
        return [{ soz: 'Iskaladın; gürültü alarmı tetikledi!', ses: 'alarm' }, ...o];
      }
      return [{ soz: 'Iskaladın; ' + (kara(s) ? 'nişan' : 'pruva') + ' hedefte değil.', ses: 'red' }, ...sira(d)];
    }
    const sil = d.kusanilan && d.kusanilan.silah;
    if (sil) o.push({ ses: { plazma_tufegi: 'el_tufek', kara_buz_hancer: 'el_hancer', isik_mizragi: 'el_mizrak', golge_yayici: 'el_golge' }[sil] });
    dusmanaHasar(d, 10, o, 'birincil');
    if (d.savas) o.push(...sira(d));
    return o;
  }
  if (g.tur === 'kaydir' && g.yon === 'yukari' && g.parmak < 2) {
    const ad = kara(s) ? 'Ağır saldırı' : 'Torpido';
    if (!kilitliMi(d)) return [{ soz: ad + ' için tam kilit gerekir.', ses: 'red' }];
    // Ağır saldırı iki turda dolar; B-1 salvo senkronizasyonu birincil ateşin ardından şarjsız ateşler
    if ((s.torpidoBekle || 0) > 0 && !(yet(d, 'B1') && s.sonEylem === 'birincil')) return [{ soz: kara(s) ? 'Ağır silah henüz dolmadı.' : 'Torpido tüpü henüz dolmadı.', ses: 'red' }];
    s.torpidoBekle = !kara(s) && sinifi(d) >= 4 && bina(d, 'yuksek_reaktor') ? 1 : 2;
    s.sonEylem = 'torpido';
    s.eylem = true;
    o.push({ ses: 'hidrolik' });
    dusmanaHasar(d, 30, o, 'torpido');
    if (d.savas) o.push(...sira(d));
    return o;
  }
  if (g.tur === 'kaydir' && g.yon === 'yukari' && g.parmak >= 2 && s.korkut && s.raunt === 0 && !s.teslimTeklif) {
    s.korkut = false;
    for (const x of s.dusmanlar) {
      x.kacti = true;
      x.teslimEtti = true;
    }
    o.push({ soz: 'Telsize adını söylüyorsun. Bir sessizlik; sonra korsan motorları geri dönüyor. Savaşmadan kaçtılar.' });
    bitir(d, 'ateskes', o);
    return o;
  }
  if (g.tur === 'kaydir' && g.yon === 'yukari' && g.parmak >= 2) {
    const t = s.dusmanlar.find((x) => x.no === s.teslimTeklif && x.govde > 0);
    if (t || (yet(d, 'D3') && dm.govde <= dm.max * 0.25 && !DUSMANLAR[dm.tur].boss)) {
      const kim = t || dm;
      kim.teslimEtti = true;
      kim.kacti = true;
      o.push({ soz: kara(s) ? kim.ad + ' silahlarını bıraktı; teslim oldu.' + (kim.tur === 'haydut_cetesi' ? ' Elebaşı saklı bir geçidin yerini fısıldıyor.' : '') : 'Ateşkes çağrısı kabul edildi; düşman teslim oluyor.' });
      if (kim.tur === 'haydut_cetesi') d.bayrak.haydutBilgisi = true;
      if (!etkin(s).length) bitir(d, 'ateskes', o);
      else bitisDenetle(d, o);
      return o;
    }
  }
  if (g.tur === 'dokun' && g.parmak >= 2) return [{ soz: durumMetni(d) }];
  return [];
}

// Oyuncunun hamlesinden sonra (ya da beklerken) düşman hazırlanır
function sira(d) {
  const s = d.savas;
  if (s.uyari) return [];
  if (!s.sizma) s.sonraki = s.t + 0.6;
  return [];
}

// Sıradaki saldırgan: küçük olmayan birimler sırayla; yalnız küçükler kaldıysa onlar
function saldirgan(s) {
  const l = etkin(s);
  const buyuk = l.filter((x) => !x.kucuk);
  const havuz = buyuk.length ? buyuk : l;
  s.siraNo = (s.siraNo || 0) + 1;
  return havuz[s.siraNo % havuz.length];
}
function pencere(d, x, silah) {
  const s = d.savas;
  const T = TEHDIT[x.tier];
  let p = (x.pencere || T.pencere) * SILAHLAR[silah].p * (0.9 + zar(s) * 0.2);
  if (DUSMANLAR[x.tur].arketip === 'akinci') p -= 0.5;
  p += (yet(d, 'A3') ? 1 : 0) + (!kara(s) && mod(d, 'k2_soguk_nozul') ? 0.6 : 0) + E.uyariEki(d, s) + (SB.kabiliyet(d, 'varek', 2) ? 0.5 : 0);
  if (kara(s) && s.arac === 'col_tilkisi') p += 0.5;
  if (bina(d, 'tina_cekirdegi')) p += 0.3; // Tina nöral çekirdeği
  if (!kara(s)) {
    if (bina(d, 'itki_hangari')) p += 0.2; // itki hangarı: kaçınma manevrası
    if (sahip(d, 'itki_yaglayici')) p += 0.3; // Arin girdap reçinesinden sürtünmesiz itki yağlayıcısı
    p += { 1: 0.3, 2: -0.1, 3: 0, 4: -0.3, 5: 0 }[sinifi(d)]; // gemi sınıfının çevikliği
  }
  if (s.isaret > 0) p += 0.4; // Kıvılcım destek gemisi düşmanı işaretledi
  if (s.cephe) p += s.cephe;
  if (d.bayrak && d.bayrak.tinaTaktik && bina(d, 'tina_cekirdegi')) p += 0.4; // Tina'nın taktik protokolü (3C)
  if (!kara(s) && d.istasyonlar && d.istasyonlar.dumen && d.istasyonlar.dumen.anahtar === 'zhaor') p += 0.3; // Zhaor dümende: kaçınma penceresi
  if (s.yavas) {
    p += s.yavas;
    s.yavas = 0;
  }
  if (s.taktik && s.raunt === 0) p += 0.5;
  if (s.taramaEk && s.raunt === 0) p += s.taramaEk;
  if (s.ziyafet > 0) p += 1;
  if (!kara(s) && d.hazirlik && d.hazirlik.kalibrasyon) p += 0.3;
  // Sinha nöbetinde akustik ve kaçınma ekipmanları biraz daha net duyulur
  if (d.zaman && nobet(d).yildiz === 'Sinha' && (sahip(d, 'sinha_sonari') || s.arac === 'col_tilkisi' || sahip(d, 'parazit_sensoru'))) p += 0.2;
  if (enYuksekStres(d) >= 100) p *= 0.8;
  p *= SB.kabiliyet(d, 'sinha', 2) ? 1.25 : 1;
  return Math.max(0.9, p);
}

function uyariBaslat(d) {
  const s = d.savas;
  const x = saldirgan(s);
  const t = DUSMANLAR[x.tur];
  // Fenrir ışık pelerini: ilk saldırı hedef bulamaz; donan düşman gecikir
  if (kusan(d, 'isik_pelerini') && !s.pelerin) {
    s.pelerin = true;
    s.sonraki = s.t + 4 * (esya(d, 'toz_pelerini') > 0 ? 1.2 : 1);
    return [{ soz: kara(s) ? 'Işık pelerini seni gözlerden sakladı; saldırı boşa gitti.' : 'Işık pelerini gemiyi düşman tarayıcılarından sakladı; hedef bulamadı.', ses: 'el_pelerin' }];
  }
  if (x.donma > 0) {
    x.donma -= 1;
    s.sonraki = s.t + 3;
    return [{ soz: x.ad + ' buzla kaplı ya da kilitli; saldıramıyor.', ses: 'el_hancer' }];
  }
  // Ağır maden korsanı üç turda bir kalkan delici ağır plazma yükler
  let silah = t.silahlar[Math.floor(zar(s) * t.silahlar.length)];
  if (t.agirPlazma) silah = (s.raunt + 1) % t.agirPlazma === 0 ? 'agir_plazma' : t.silahlar[0];
  else if (silah === 'agir_plazma') silah = t.silahlar[0];
  const sure = pencere(d, x, silah);
  const yon = x.aci > 0 ? 'sol' : 'sag';
  // Sahte uyarı: ses yanlış yandan gelir; gerçek yön motor nabzında. Sonar ve sensör eler.
  let sesYon = yon;
  const eler = sahip(d, 'sinha_sonari') || sahip(d, 'parazit_sensoru') || sahip(d, 'sogut_nisangahi');
  if (x.sahte && !eler && zar(s) < 0.35) sesYon = yon === 'sag' ? 'sol' : 'sag';
  s.uyari = { kim: x.no, silah, kalan: sure, toplam: sure, yon, sesYon, savunma: null };
  s.evre = 'uyari';
  const o = [{ uyari: silah, yon: sesYon, ses2: UYARI_SESI[silah] }];
  if (eler && x.sahte) o.push({ soz: 'Sonar: gerçek ses ' + (yon === 'sag' ? 'sağda' : 'solda') + '.' });
  // Telsiz subayı (ses hassasiyeti) ya da D-2 yabancı dil sezgisi silahı önceden söyler
  const tel = gorevli(d, 'Telsiz Subayı');
  if ((tel && tel.nitelik === 'ses_hassas') || yet(d, 'D2')) {
    const kayit = tel && SILAHLAR[silah] && ['plazma', 'torpido', 'iyon'].includes(silah) ? kayitBul(d, 'savas_' + silah + '_' + yon, tel) : null;
    o.push({ soz: (tel ? tel.ad.split(' ')[0] + ': ' : '') + SILAHLAR[silah].ad + ', ' + (yon === 'sag' ? 'sağdan' : 'soldan') + '!', kayit });
  } else if (etkin(s).length > 1) o.push({ soz: x.ad + '!' });
  return o;
}

// Tur sonu: arıza onarımı, bekleme, frekans değişimi, zehir, çağrılar, kaçış, çevre
function turSonu(d, o) {
  const s = d.savas;
  s.raunt += 1;
  if (s.torpidoBekle > 0) s.torpidoBekle -= 1;
  for (const k of Object.keys(s.bekleme || {})) s.bekleme[k] = Math.max(0, s.bekleme[k] - 1);
  if (s.odak > 0) s.odak -= 1;
  if (s.silahYok > 0) s.silahYok -= 1;
  if (s.bagisiklik > 0) s.bagisiklik -= 1;
  if (s.ziyafet > 0) s.ziyafet -= 1;
  // Arızalar tur geçtikçe onarılır (başçarkçı hızlandırır; soğukkanlı panik yapmaz)
  const carkci = gorevli(d, 'Başçarkçı');
  for (const k of Object.keys(s.sistem)) if (s.sistem[k] > 0) s.sistem[k] = Math.max(0, s.sistem[k] - (carkci ? (carkci.nitelik === 'sogukkanli' ? 2 : 1.5) : 1));
  // Zehir ve asit her tur zırhı eritir
  if (s.zehir > 0) {
    s.zehir -= 1;
    const h = Math.round(4 * TEHDIT[s.dusman.tier].hasar * (d.bayrak.g_panzehir ? 0.5 : 1) * (kusan(d, 'asit_zirhi') ? 0.2 : 1));
    canEkle(d, -h);
    o.push({ soz: 'Asit zırhı eritiyor.', hasar: true });
  }
  if (s.cevre === 'asit' && !s.bagisiklik && !sahip(d, 'notralizasyon_kulesi') && zar(s) < 0.5) s.zehir = Math.max(s.zehir, 1);
  // Yer sarsıntısı: sismik dengeleyici ve Mammoth korur
  if (s.cevre === 'sarsinti' && !sahip(d, 'sismik_dengeleyici') && s.arac !== 'mammoth' && zar(s) < 0.4) {
    canEkle(d, -Math.round(6 * TEHDIT[s.dusman.tier].hasar));
    o.push({ soz: 'Zemin sarsılıyor; ekip savruldu.', hasar: true });
  }
  if (s.cevre === 'iyon_firtinasi' && zar(s) < 0.3 && !harcaTopraklama(d)) {
    s.sistem.itici = Math.max(s.sistem.itici, 1);
    o.push({ soz: 'İyon fırtınası iticileri bir tur kilitledi.' });
  }
  if (s.cevre === 'isi') s.isi += 15 * isiCarpani(d);
  for (const x of etkin(s)) {
    if (x.kalkanKilit > 0) {
      x.kalkanKilit -= 1;
      if (!x.kalkanKilit) x.delik = false;
    }
    // Frekans kalkanı iki turda bir tonunu değiştirir
    if (x.moduller.includes('frekans') && !x.kalkanKilit && s.raunt % 2 === 0) {
      const eski = x.kalkanFrek;
      const yeni = TONLAR.filter((t) => t.f !== eski)[Math.floor(zar(s) * 2)];
      x.kalkanFrek = yeni.f;
      x.delik = false;
      if (!x.kucuk) o.push({ soz: x.ad + ' kalkan tonunu değiştirdi: ' + yeni.ad + '.', nota: { frek: tonFrek(yeni.f), sure: 0.8 } });
    }
    // Çağıran üç turda bir yardımcı çağırır
    const c = DUSMANLAR[x.tur].cagri;
    if (c && x.moduller.includes('cagiran') && s.raunt % 3 === 0) yardimciCagir(d, x, c, o);
    // Kaçmaya çalışan düşman
    if (x.kaciyor > 0) {
      x.kaciyor -= 1;
      if (x.kaciyor === 0 && !x.kilitli) {
        x.kacti = true;
        s.kacanlar.push(x.tur);
        o.push({ soz: x.ad + ' kaçtı!', ses: 'tislama' });
      }
    }
  }
  // Destek yuvası (uzay) ya da araç desteği (kara)
  destekTuru(d, o);
  // Çağrılan küçük birimler her tur üst üste ek hasar verir
  const yard = etkin(s).filter((x) => x.kucuk);
  if (yard.length && !s.sersem) {
    let h = 0;
    for (const x of yard) h += 2.5 * TEHDIT[x.tier].hasar;
    if (kara(s) && s.arac === 'akrep') h *= 0.5;
    canEkle(d, -Math.round(h));
    o.push({ soz: yard.length + ' yardımcı birim saldırıyor.', hasar: true });
  }
  if (s.sersem) s.sersem -= 1;
}
function isiCarpani(d) {
  const s = d.savas;
  let c = sahip(d, 'termal_giysi') || mod(d, 'termal_karartma') ? 0.5 : 1;
  if (bina(d, 'kriyo_atolye')) c *= 0.75; // kriyo-atölye
  if (sahip(d, 'lazer_sogutucu')) c *= 0.7; // Pyros lav orkidesi termal lazer soğutucusu
  if (kara(s) && aethelisteMi(d) && bina(d, 'jeotermal_santral')) c *= 0.5; // jeotermal santralin termal kalkanı
  if (kara(s) && s.arac === 'demir_kervan') c = 0; // Demir Kervan mobil siper
  if (!kara(s) && sinifi(d) === 5 && (E.etkiVar(d, 'super_iletken') || sahip(d, 'super_iletken'))) c = 0; // Hisar süper-soğutma
  return c;
}
function harcaTopraklama(d) {
  if (parca(d, 'topraklama_cubugu') > 0) {
    d.koloni.parcalar.topraklama_cubugu -= 1;
    return true;
  }
  return mod(d, 'iyon_paratoner') || kusan(d, 'paratoner_zirhi');
}
// Filo destek yuvası: seçilen yedek geminin sınıfına göre her üç turda bir katkı
// (gemiler-araclar-ve-filo-sistemi.txt bölüm 2)
export const DESTEK = {
  1: { ad: 'Kıvılcım işaretçisi', tarif: 'Üç turda bir düşmanı işaretler: kilit ve kaçınma penceresi 0,4 saniye uzar.' },
  2: { ad: 'Rüzgarkıran enkaz toplayıcısı', tarif: 'Zaferde metal ve kristal ganimeti yüzde otuz beş fazla.' },
  3: { ad: 'Aethel Muhafızı kalkan desteği', tarif: 'Üç turda bir kalkan enerjisini yüzde yirmi beş yeniler; frekans eşleme kolaylaşır.' },
  4: { ad: 'Gökdelen lojistik onarımı', tarif: 'Üç turda bir gövdenin yüzde onu onarılır, cephane ikmal edilir.' },
  5: { ad: 'Hisar-ı Kadim yaylımı', tarif: 'Üç turda bir ağır plazma yaylımı: hedefin kalkanı kırılır, yüksek gövde hasarı, yan birimler süpürülür.' },
};
function destekSinifi(d) {
  const g = destekGemisi(d);
  return g ? g.sinif : 0;
}
export function destekGemisi(d) {
  const f = d.filo || [];
  if (!f.length) return null;
  const i = d.destekNo != null && f[d.destekNo] ? d.destekNo : 0;
  return f[i];
}
function destekTuru(d, o) {
  const s = d.savas;
  if (kara(s)) {
    if (s.arac === 'akrep' && s.raunt % 2 === 0) {
      const y = etkin(s).find((x) => x.kucuk);
      if (y) {
        y.govde = 0;
        o.push({ soz: 'Akrep dronu bir ' + y.ad + ' birimini avladı.' });
      }
    }
    // Mammoth: iki turda bir matkapla zırh kırıcı ağır darbe (frekans ve zırhlı düşmana iki kat)
    if (s.arac === 'mammoth' && s.raunt % 2 === 0 && s.dusman && s.dusman.govde > 0) {
      const z = s.dusman.moduller.includes('frekans') || DUSMANLAR[s.dusman.tur].arketip === 'zirhli';
      s.dusman.govde = Math.max(0, s.dusman.govde - Math.round(15 * oyuncuGucu(d, s) * (z ? 2 : 1)));
      o.push({ soz: 'Mammoth matkabı ' + s.dusman.ad + ' zırhına saplandı!', ses: 'hidrolik' });
    }
    // Demir Kervan: savaş arasında ilaç ve cephane ikmali
    if (s.arac === 'demir_kervan' && s.raunt % 3 === 0) {
      canEkle(d, Math.round(canMax(d) * 0.05));
      o.push({ soz: 'Demir Kervan\'dan ikmal: zırh yamandı.' });
    }
    // Atmosphere-X: üç turda bir havadan çağrılan birimleri tarar
    if (s.arac === 'atmosphere_x' && s.raunt % 3 === 0) {
      const l = etkin(s).filter((x) => x.kucuk);
      for (const x of l) x.govde = 0;
      if (l.length) o.push({ soz: 'Atmosphere-X havadan taradı: ' + l.length + ' birim düştü.', ses: 'patlama' });
    }
    return;
  }
  if (s.isaret > 0) s.isaret -= 1;
  const g = destekGemisi(d);
  if (!g || s.raunt % 3 !== 0) return;
  const h = s.dusman;
  if (g.sinif === 1) {
    s.isaret = 1;
    o.push({ soz: g.ad + ' düşmanı işaretledi.' });
  } else if (g.sinif === 3) {
    s.isi = Math.max(0, s.isi - 25);
    if (s.sistem.kalkan > 0) s.sistem.kalkan -= 1;
    o.push({ soz: g.ad + ' kalkan enerjisini yeniledi.' });
  } else if (g.sinif === 4) {
    canEkle(d, Math.round(canMax(d) * 0.1));
    s.torpidoBekle = 0;
    o.push({ soz: g.ad + ' lojistik ekibi gövdeyi yamadı, cephane ikmal edildi.' });
  } else if (g.sinif === 5 && h) {
    h.delik = true;
    h.kalkanKilit = Math.max(h.kalkanKilit || 0, 1);
    for (const x of etkin(s)) {
      if (x.kucuk) x.govde = 0;
      else if (x === h) x.govde = Math.max(1, x.govde - Math.round(x.max * 0.15));
    }
    o.push({ soz: g.ad + ' ağır plazma yaylımı açtı: ' + h.ad + ' kalkanı kırıldı.', ses: 'patlama' });
  }
}

function darbe(d) {
  const s = d.savas;
  const u = s.uyari;
  const o = [];
  const sil = SILAHLAR[u.silah];
  const x = s.dusmanlar.find((b) => b.no === u.kim) || s.dusman;
  s.uyari = null;
  s.evre = 'oyuncu';
  s.sonraki = s.t + 3 + zar(s) * 2;
  turSonu(d, o);
  if (!d.savas) return o;
  if (canAl(d) <= 0) {
    bitir(d, 'yenilgi', o);
    return o;
  }
  // Kalkan delici ağır plazmaya yalnız kaçınma ya da ışınlanma
  const kacti = u.savunma === 'kacinma' || u.savunma === 'karsi' || u.savunma === 'chaff' || u.savunma === 'teleport';
  if (kacti) {
    SB.ekolKazan(d, 'sinha', 3);
    o.push({ soz: u.savunma === 'kacinma' ? (kara(s) ? 'Yana atladın; darbe boşa gitti.' : 'Kaçtın; mermi boş uzayı yırttı.') : u.savunma === 'karsi' ? 'İki patlama birbirini yok etti.' : u.savunma === 'teleport' ? 'Bir an yok olup yüz metre öteden çıktın; darbe boşa gitti.' : 'Füze şaşırdı.', ses: u.savunma === 'karsi' ? 'patlama' : 'tislama' });
    kacisSonrasi(d, o);
    return o;
  }
  // Akustik karartma ve morali kırılmış düşman ıskalar
  if (s.karartma > 0 || (s.dusmanMoral && zar(s) < 0.3)) {
    if (s.karartma > 0) s.karartma -= 1;
    o.push({ soz: 'Düşmanın atışı ıskaladı.', ses: 'tislama' });
    kacisSonrasi(d, o);
    return o;
  }
  let h = sil.hasar * TEHDIT[x.tier].hasar * (x.hasarCarpani || 1) * (x.kucuk ? 0.6 : 1);
  if (s.gelis === 'konvoy' && x.kaciyor > 0) h *= 0.5;
  if (s.morKalkan > 0) {
    s.morKalkan -= 1;
    h *= 0.5;
  }
  const kalkanli = u.savunma === 'kalkan' && !sil.delici;
  if (u.savunma === 'kalkan' && sil.delici) o.push({ soz: sil.ad + ' kalkanı delip geçti!' });
  if (kalkanli) {
    SB.ekolKazan(d, 'sinha', 3);
    // Aether kalkan amplifikatörü; ambardaki kara kristal fazlası kalkan frekansını bozar; odaklanmış rezonans
    h *= !kara(s) && mod(d, 'kalkan_amplifikatoru') ? 0.12 : 0.2;
    if ((d.koloni.kaynaklar.kara_aether || 0) > 4) h *= 1.75;
    if (s.odak > 0) h *= 0.5;
    if (d.bayrak.tf_kalkan && !kara(s)) h *= 0.9; // altı halkalı kalibrasyon: kalkan kapasitesi yüzde on
    // Isı düşmanları kalkanı daha hızlı ısıtır
    const isiEk = x.moduller.includes('isi') || sil.ozel === 'isi' ? 1.5 : 1;
    s.isi += 40 * SB.kalkanIsiCarpani(d) * (!kara(s) && mod(d, 'kalkan_amplifikatoru') ? 0.6 : 1) * isiEk * isiCarpani(d);
    if (s.isi >= 100) {
      s.isi = 0;
      s.sistem.kalkan = 2;
      o.push({ soz: kara(s) ? 'Siper parçalandı!' : 'Kalkan kondansatörü aşırı ısındı!' });
    }
    o.push({ ses: 'valf', soz: kara(s) ? 'Siper darbeyi karşıladı.' : 'Kalkan darbeyi sönümledi.' });
  }
  if (!kara(s)) {
    if (u.silah === 'torpido' && mod(d, 'k1_sonumleme')) h *= 0.6;
    if (mod(d, 'hisar_kalkani')) h *= 0.8;
    if (d.bayrak.tf_obsidyen && u.silah !== 'iyon') h *= 0.8; // Malazar obsidyen kaplaması: kinetik direnç
    const dg = destekGemisi(d);
    if (dg && dg.sinif === 3) h *= 0.85;
    if (kusan(d, 'oksit_zirhi') && u.silah === 'torpido') h *= 0.9; // oksit zırhı: torpido direnci
    if (sinifi(d) === 2) h *= 0.9; // Rüzgarkıran'ın kalın gövdesi
    if (sinifi(d) === 1) h *= 0.85; // Kıvılcım küçük hedeftir
    if (kalkanli && sinifi(d) === 5) h *= 0.6; // üç katmanlı kalkan
    if (kalkanli && numuneSayisi(d) >= 5) h *= 0.9; // akademi: beş numune
  } else {
    if (kusan(d, 'oksit_zirhi')) h *= 0.85;
    if (s.arac === 'mammoth') h *= 0.6;
    if (refakatciAnahtari(d)) h *= 0.9;
    // Koloni kalkan jeneratörü: Aethelis baskınlarında ilk darbe yarıya
    if (aethelisteMi(d) && bina(d, 'koloni_kalkani') && !s.ilkDarbe) h *= 0.5;
  }
  s.ilkDarbe = true;
  // T-02 akışkan cıva plakası: lazer ve plazmaya direnç (gözetmeni Oronte yansıtır)
  if (kusan(d, 'civa_plakasi') && ['plazma', 'lazer', 'agir_plazma', 'isi_dalgasi'].includes(u.silah)) {
    h *= 0.6;
    if (d.gozetmen && d.gozetmen.oronte) x.govde = Math.max(1, x.govde - Math.round(h * 0.2));
  }
  if (kusan(d, 'kemik_zirh') && u.silah === 'agir_plazma') h *= 0.75; // delici direnç
  // Galaktik Kâşif: Tonoflenya ve Alt Evren düşmanlarına karşı direnç
  if (numuneSayisi(d) >= 20 && (x.karanlik || x.tier >= 4)) h *= 0.85;
  // T-01 kemik-alaşım zırhı: can yüzde otuzun altına inince hasar almadığın turlar (karada iki, uzayda bir)
  if (s.kemik > 0) {
    s.kemik -= 1;
    h = 0;
  }
  if (yet(d, 'C1')) h *= 0.9;
  if (kusan(d, 'drahmir_kalkani')) h *= 0.85;
  if (ozelVar(d, 'Gareth')) h *= 0.87;
  if (d.yan && d.yan.hardrinBariyer > 0) h *= 0.5;
  if (sil.ozel === 'isi') h *= isiCarpani(d);
  // Akrep dronu bir kez sahte ses yayıp atışı şaşırtır
  if (!kalkanli && s.arac === 'akrep' && !s.akrepSahte && kara(s)) {
    s.akrepSahte = true;
    h = 0;
    o.push({ soz: 'Akrep dronu sahte bir ses yaydı; atış onu vurdu.', ses: 'tislama' });
  }
  h *= E.alinanHasarCarpani(d) * yildizCarpani(d, 'hasar'); // Kaelith kalkan kristali, zaman-kristal koruyucu tabakası
  h *= 1 - evrenEtki(d).savunma; // Evrenin Muhafızı: yüzde on savunma
  if (kara(s) && misafir(d, 'zeno') && !(d.bayrak && d.bayrak.tonoflenyada)) h /= 1.4; // Silahşör Zeno kolonide: savunma yüzde kırk
  canEkle(d, -Math.round(h));
  if (kusan(d, 'kemik_zirh') && !s.kemikKullanildi && canAl(d) > 0 && canAl(d) < canMax(d) * 0.3) {
    s.kemikKullanildi = true;
    s.kemik = kara(s) ? 2 : 1;
    o.push({ soz: 'Kemik-alaşım zırhı kilitlendi: ' + (kara(s) ? 'iki tur' : 'bir tur') + ' hasar işlemez.', ses: 'el_kalkan' });
  }
  // Karanlık saldırılar kalkan tutsa bile zihni yorar
  if (x.moduller.includes('karanlik') || sil.ozel === 'stres') stresEkle(d, kalkanli ? 5 : 15);
  // Isı düşmanının darbesi kalkanı ve silahları ısıtır
  if ((x.moduller.includes('isi') || sil.ozel === 'isi') && !kalkanli) {
    s.isi += 20 * isiCarpani(d);
    if (s.isi >= 100) {
      s.isi = 0;
      s.sistem.kalkan = 2;
      s.torpidoBekle = Math.max(s.torpidoBekle || 0, 1);
      o.push({ soz: kara(s) ? 'Isı siperini ve silahını kızdırdı!' : 'Isı kalkan kondansatörünü ve torpido tüpünü kızdırdı!' });
    }
  }
  const g = d.gemi;
  if (!kalkanli) {
    if (!(x.moduller.includes('karanlik') || sil.ozel === 'stres')) stresEkle(d, 8); // darbe ekibi strese sokar
    o.push({ ses: 'patlama', hasar: true, soz: sil.ad + ' isabet etti! ' + (kara(s) ? 'Zırh' : 'Gövde') + ' yüzde ' + Math.round((100 * canAl(d)) / canMax(d)) + '.' });
    // Esnek gövde macunu: gövde yarının altına inince delikleri kendiliğinden kapatır (seferde bir kez)
    if (!kara(s) && E.etkiVar(d, 'macun') && !d.macunKullanildi && g.govde > 0 && g.govde < g.maxGovde / 2) {
      d.macunKullanildi = true;
      g.govde = Math.min(g.maxGovde, g.govde + Math.round(g.maxGovde * 0.3));
      o.push({ soz: 'Canlı gövde macunu delikleri kapattı. Gövde yüzde ' + Math.round((100 * g.govde) / g.maxGovde) + '.' });
    }
    // Zehir ve asit bulaşır
    if ((sil.ozel === 'zehir' || x.moduller.includes('zehir')) && !s.bagisiklik && !sahip(d, 'notralizasyon_kulesi')) {
      s.zehir = 2;
      o.push({ soz: 'Asit bulaştı; zırh iki tur eriyecek.' });
    }
    // İyon kilidi: iticiler bir tur kilitlenir (topraklama çubuğu emer)
    if (sil.ozel === 'iyon' || x.moduller.includes('iyon')) {
      if (harcaTopraklama(d)) o.push({ soz: 'Topraklama iyon yükünü emdi.' });
      else {
        s.sistem.itici = Math.max(s.sistem.itici, 1);
        o.push({ soz: kara(s) ? 'Elektrik şoku: bir tur yana atlayamazsın!' : 'İyon kilidi: iticiler bir tur kilitli!' });
      }
    }
    // Savunmasız darbe bir sistemi bozar
    const sistemler = Object.keys(s.sistem);
    const k = sistemler[s.raunt % 3];
    if (zar(s) < 0.5) {
      s.sistem[k] = Math.max(s.sistem[k], 2);
      if (k === 'reaktor' && mod(d, 'k4_tahliye_valfi')) s.sistem[k] = 1;
      o.push({ soz: kara(s) ? { itici: 'Bacak servoları hasarlı!', kalkan: 'Siper parçalandı!', kask: 'Kask filtresi çatladı; nefesin daralıyor!' }[k] : { itici: 'Yön iticileri hasarlı!', kalkan: 'Kalkan kondansatörü hasarlı!', reaktor: 'Reaktör basıncı kritik!' }[k] });
    }
  }
  // Subayların kriz sözleri (bir sefer boyunca birer kez)
  const kz = [];
  const c = canAl(d);
  const m = canMax(d);
  if (!kalkanli && c > 0) kz.push(SB.kriz(d, 'varek'));
  if (c > 0 && c < m * 0.5) kz.push(SB.kriz(d, 'drahmir'));
  if (c > 0 && c < m * 0.2) kz.push(SB.kriz(d, 'elyndra'));
  if (s.sistem.itici > 0) kz.push(SB.kriz(d, 'zhaor'));
  for (const k of kz) if (k) o.push({ soz: k });
  // Axira hayat muskası: ölümcül darbede bir kez yarı canla diriliş
  if (canAl(d) <= 0 && esya(d, 'hayat_muskasi') > 0) {
    d.esya.hayat_muskasi -= 1;
    canKoy(d, Math.round(m / 2));
    o.push({ soz: 'Axira\'nın hayat muskası parladı: ' + (kara(s) ? 'ekip' : 'gemi ve mürettebat') + ' yarı canla ayakta!', ses: 'sinyal' });
  }
  if (canAl(d) <= 0) bitir(d, 'yenilgi', o);
  else kacisSonrasi(d, o);
  return o;
}
function kacisSonrasi(d, o) {
  const s = d.savas;
  if (!s) return;
  bitisDenetle(d, o);
}

export function savasIlerle(d, dt) {
  const s = d.savas;
  if (!s) return [];
  bagla(s);
  s.t += dt;
  // Düşmanlar yavaşça manevra yapar; K5 karadutu modeli çözünce manevra küçülür
  for (const x of etkin(s)) x.aci += Math.sin(s.t * 0.4 + x.no) * 0.05 * dt * (!kara(s) && mod(d, 'k5_karadutu') && s.raunt >= 2 ? 0.3 : 1);
  const o = [];
  const yeni = hedefSec(s);
  if (yeni && etkin(s).length > 1 && !s.uyari) o.push({ soz: 'Hedef: ' + yeni.ad + '.' });
  const k = kilitliMi(d);
  if (k && !s.kilitDendi && !s.uyari) o.push({ ses: 'kilitTonu' });
  s.kilitDendi = k;
  if (!s.uyari && s.t >= s.sonraki) o.push(...uyariBaslat(d));
  else if (s.uyari) {
    s.uyari.kalan -= dt;
    if (s.uyari.kalan <= 0) o.push(...darbe(d));
  }
  return o;
}

// Ekran için: bütün düşmanların konumlu sesleri (etkin hedef yakında ve önde, ötekiler arka planda)
export function savasSes(d) {
  const s = d.savas;
  if (!s) return {};
  bagla(s);
  const konum = (x, aktif) => {
    const m = aktif ? x.mesafe : x.mesafe + 30;
    return { id: x.no, x: Math.sin(-x.aci) * m, y: Math.cos(x.aci) * m, frek: x.frek || DUSMANLAR[x.tur].frek, aktif };
  };
  const l = etkin(s).map((x) => konum(x, x === s.dusman));
  const a = l.find((x) => x.aktif) || l[0];
  return { dusman: a, dusmanlar: l, uyari: s.uyari ? { silah: s.uyari.silah, oran: 1 - s.uyari.kalan / (s.uyari.toplam || 2) } : null };
}

export function durumMetni(d) {
  const s = d.savas;
  if (!s) return '';
  bagla(s);
  const dm = s.dusman;
  const ar = Object.keys(s.sistem).filter((k) => s.sistem[k] > 0);
  const adlar = { itici: kara(s) ? 'bacak servoları' : 'iticiler', kalkan: kara(s) ? 'siper' : 'kalkan', reaktor: 'reaktör', kask: 'kask' };
  const ob = etkin(s).filter((x) => x !== dm);
  return dm.ad + ' (' + TEHDIT[dm.tier].ad + '): ' + (kara(s) ? 'can' : 'gövde') + ' yüzde ' + Math.round((100 * dm.govde) / dm.max) + (dm.delik ? ', ' + (kara(s) ? 'zırhı' : 'kalkanı') + ' delik' : '') + (dm.kaciyor > 0 ? ', kaçıyor' : '') + '. ' + (kilitliMi(d) ? 'Kilitli.' : 'Hedef ' + (dm.aci > 0 ? 'solda' : 'sağda') + '.') +
    (ob.length ? ' Öteki düşmanlar: ' + ob.map((x) => x.ad + ' ' + (x.aci > 0 ? 'solda' : 'sağda')).join(', ') + '.' : '') +
    (kara(s) ? ' Zırhın' : ' Gövden') + ' yüzde ' + Math.round((100 * canAl(d)) / canMax(d)) + '.' + (s.zehir > 0 ? ' Asit eritiyor.' : '') + (enYuksekStres(d) >= 70 ? ' Ekip stresi yüksek.' : '') + (ar.length ? ' Arızalı: ' + ar.map((k) => adlar[k]).join(', ') + '.' : '');
}

export const SAHNELER = {
  savas_son: {
    baslik: 'Çatışma bitti',
    metin: (d) => {
      const x = d.savasSon || {};
      const kara0 = x.ortam === 'kara';
      const gan = x.ganimet && Object.keys(x.ganimet).length ? ' Ganimet: ' + Object.entries(x.ganimet).filter(([, v]) => v > 0).map(([k, v]) => v + ' ' + k.replace(/_/g, ' ')).join(', ') + '.' : '';
      if (x.sonuc === 'zafer') return [x.ad + ' etkisiz.' + (kara0 ? ' Ekip soluklanıyor.' : ' Enkazdan parçalar ambara alındı.') + gan + (x.kacan ? ' Bir düşman kaçtı.' : ''), x.yama ? 'Hurda yamayla iticiler çalışır hâlde.' : ''];
      if (x.sonuc === 'kacis') return [(kara0 ? 'Çekilme yolundan ' : 'Gümüş rotayla ') + x.ad + ' geride kaldı. Ganimet yok ama ' + (kara0 ? 'ekip sağ.' : 'gövde sağlam.')];
      if (x.sonuc === 'ateskes') return [x.ad + ' teslim oldu; ganimetin yarısı ve diplomatik itibar.' + gan];
      if (x.sonuc === 'kacti') return [x.ad + ' kaçtı. Geriye birkaç enkaz parçası kaldı.' + gan];
      if (kara0) return [x.kriyo ? 'Zırhın dayanamadı. Ekip acil tahliye edildi; ağır yaralılar kriyojenik şok iğneleriyle stasiste, hepsi kurtuldu.' : 'Zırhın dayanamadı. Ekip acil tahliye edildi; revir yaraları sarıyor. Kolonide moral düştü.'];
      return [x.kriyo ? 'Gövde dayanamadı. Acil iticilerle koloniye çekildin. Ağır yaralılar kriyojenik şok iğneleriyle stasiste; hepsi canlı ulaştı, yas tutulmuyor.' : 'Gövde dayanamadı. Acil iticilerle koloniye çekildin; tersane gemiyi onarıyor. Kolonide yas havası: moral düştü.', x.kargoKaybi ? 'Ambardaki Tonoflenya mallarının beşte biri enkazda kaldı: ' + x.kargoKaybi + ' birim.' : ''];
    },
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
  },
};
