// Komuta ve Genişleme Paneli, komşu halka baskısı (belgeler/v4/bolge-genisletme-panel-ve-ilerleme-sistemi.txt) ve
// Aşama 1-2 hikâyeleri (asama-1-ve-2-aethelis-fetih-ve-kaelith-hikayeleri.txt). Saf JavaScript.
//
//   Halkalar: 1 Aethelis-IV'ün dört sektörü (güney, batı, doğu, kuzey; merkez vadi baştan güvenli), 2 yörünge ablukası
//   ve yakın asteroit kuşağındaki Kaelith madeni, 3 derin uzay koridorları (yirmi gezegen hattı; Sınıf III), 4 beş
//   Tonoflenya kuşağı. Durumlar: sisli (taranmadı), dusman, baskin, guvenli.
//   d.komuta = { sektor: { id: { durum, karakol, muhur, devriye, akrepBitis } }, aktif, evre, sonMetin, baskinlar
//     [{ id, bitis }], sonrakiBaskin, sonAktarim, tamGuvence, hikaye: [] }
//   Panel üç sekme (iki parmakla sağa sola): Bölge haritası, Savunma hattı, İleri karakollar. Üç parmakla dokun:
//   en acil bölge. Her bölgenin satırına gelince durum sesi çalar.
import { NOBET_SN } from './zaman';
import { OPERASYONLAR } from './veri/uzayGorevleri';
import { GEZEGENLER } from './veri/gozlem';
import * as SB from './tonoflenya/subay';
import * as ZN from './tonoflenya/zanaat';
import { GUCLER, GUC_SIRASI, gucItibari, gucBasamagi, misafir } from './tonoflenya/kisiler';

export const GUN = 6 * NOBET_SN;
const A = (tur, ad, giris, bitis, ek) => ({ tur, ad, giris, bitis, ...(ek || {}) });
const simdi = (d) => (d.zaman && d.zaman.sn) || 0;
const b = (d) => d.bayrak;
const bina = (d, id) => (d.koloni.binalar || []).includes(id);
const gemiSinifi = (d) => (d.gemi && d.gemi.sinif) || 0;

// --- Halka 1-2 bölgeleri ve hikâyeleri ---
// kosul: hikâyenin tetiklendiği an (görevler.txt yerleşim haritası); aktarim: karakolun her gün koloniye verdiği
export const BOLGELER = {
  guney: {
    halka: 1, ad: 'Güney Kükürt ve Lav Çatlakları', mekanlar: ['sirtlar', 'lav', 'mantar'], tehdit: 'Sülfür Akrebi Yuvası', kademe: 1,
    kosul: (d) => !!b(d).sondaj, kosulMetni: 'Jeotermal sondaj bitince güney hatlarından ses gelecek.',
    aktarim: { titanyum: 3, izotop: 1 }, baskinDusman: ['sulfur_akrebi'],
  },
  bati: {
    halka: 1, ad: 'Batı Harabeler ve Vanguard Tünelleri', mekanlar: ['krater', 'kseno_lab', 'mabet', 'vanguard', 'tuneller', 'obsidyen'], tehdit: 'Vanguard yağmacıları ve uyanmış otomatlar', kademe: 1,
    kosul: (d) => !!b(d).kazi, kosulMetni: 'Antik laboratuvar kazısı bitince batıdan bir mors sinyali düşecek.',
    aktarim: { titanyum: 2, mikrocip: 2 }, baskinDusman: ['yagmaci_oncusu'],
  },
  dogu: {
    halka: 1, ad: 'Doğu Manyetik Sis ve Cıva Şelaleleri', mekanlar: ['dogu', 'civa'], tehdit: 'Kristal bataklık pusucuları', kademe: 1,
    kosul: (d) => !!b(d).kazi, kosulMetni: 'Antik laboratuvar kazısından sonra doğuya bir keşif ekibi gidecek.',
    aktarim: { civa_tortusu: 1, kristal: 2 }, baskinDusman: ['bataklik_pusucusu'],
  },
  kuzey: {
    halka: 1, ad: 'Kuzey Asit ve Fırtına Platosu', mekanlar: ['plato', 'kriyo', 'kuleler'], tehdit: 'Asit platosu kseno-avcıları', kademe: 2,
    kosul: (d) => !!d.gemi, kosulMetni: 'Kıvılcım ilk uçuşunu yapınca platodan haber gelecek.',
    aktarim: { polimer: 2, bazalt: 4 }, baskinDusman: ['kseno_avci'],
  },
  yorunge: {
    halka: 2, ad: 'Aethelis alçak yörüngesi', mekanlar: [], tehdit: 'Korsan ablukası: avcı gemisi ve korvet', kademe: 2, uzay: true,
    kosul: (d) => sektorlerGuvenli(d) && !!d.gemi && ((d.tamamlananOp || []).includes('g02') || bina(d, 'sinyal_kulesi')),
    kosulMetni: 'Yüzeydeki dört sektör güvenli olunca ve ilk uçuşlar yapılınca yörünge sesleri duyulacak.',
    aktarim: { itki_yakiti: 10 }, baskinDusman: ['korsan_avci'],
  },
  kaelith: {
    halka: 2, ad: 'Yakın asteroit kuşağı, Kaelith maden ocağı', mekanlar: [], tehdit: 'Korsan zırhlısı ve sıcak galeri yaratıkları', kademe: 2, uzay: true,
    kosul: (d) => durum(d, 'yorunge') === 'guvenli' && gemiSinifi(d) >= 2,
    kosulMetni: 'Yörünge ablukası kırılınca ve Sınıf 2 bir gemin olunca asteroit kuşağından bir çağrı gelecek.',
    aktarim: { titanyum: 4, sasi_celigi: 10 }, baskinDusman: ['korsan_korvet'],
  },
};
export const SEKTORLER = ['guney', 'bati', 'dogu', 'kuzey'];
export const HALKA2 = ['yorunge', 'kaelith'];

// Görev metinleri ve akışları
export const GOREVLER = {
  guney: {
    kod: '1A', ad: 'Kızgın Boruların Gölgesinde', veren: 'Koloni Başteknikeri Kaya',
    ortam: 'ortam_lav',
    giris: [
      'Sağında yüksek basınçlı buhar tıslıyor, altında lav fokurduyor; taşların üstünde hızla gezen kitin ayaklarının tıkırtısı.',
      'Kaya, nefes nefese: "Kaptan! Dört numaralı jeotermal hattın basıncı sıfıra düşüyor. İlk başta boru çatladı sandık ama keşif ekibi geri dönemedi. Lavın içinden çıkan dev sülfür akrepleri sıcak boruların etrafına yuva örmüş. Orayı temizlemezsek ne santral kurabiliriz ne de kışın seraları ısıtabiliriz!"',
    ],
    hazirlik: (d) => 'Önerilen hazırlık: ' + [ZN.miktar(d, 'termal_giysi') > 0 || (d.esya && d.esya.termal_giysi) ? 'termal giysin hazır' : 'kriyo atölyesinden termal giysi', (d.araclar || []).some((a) => a === 'col_tilkisi' || a === 'mammoth') ? 'hangarda aracın hazır' : 'araç hangarından Çöl Tilkisi ya da Mammoth'].join(', ') + '.',
    op: [A('basinc', 'Patlamak üzere üç vana', 'Lav çatlakları arasında vanaların ıslığı yükseliyor; en tizine varınca çift dokun: kapat. Üç kez.', 'Üç vana da kapandı; hat sustu.')],
    savas: { dusmanlar: ['sulfur_akrebi', 'yuva_ana_akrebi', 'sulfur_akrebi'], ortam: 'kara', gelis: 'kiskac', tier: 1, giris: 'Asit tükürüğü iki tur zırhını eritir; sonik kovucun varsa sürüyü bir tur sersemletir.' },
    kararlar: [
      { etiket: 'Yuva çekirdeğini patlat', sonuc: 'Çatlak tamamen mühürlendi. Güney sektörüne bir daha baskın gelmeyecek.', yap: (d) => { sek(d, 'guney').muhur = true; } },
      { etiket: 'Yumurtaları canlı izolasyona al', kosul: (d) => bina(d, 'biyo_kubbe'), kosulMetni: 'Biyoloji kubbesi gerekir.', sonuc: 'Altı asit-direnç polimeri ve dört sakinleştirici spor biyoloji kubbesinde. Üç gün boyunca güneye küçük akrep baskınları gelebilir.', yap: (d) => { ekle(d, 'polimer', 6); ekle(d, 'kseno_spor', 4); sek(d, 'guney').akrepBitis = simdi(d) + 3 * GUN; } },
    ],
    odul: 'Güney sektörü güvenli: Jeotermal Santral ve otomatik ikmal karakolu kurulabilir.',
  },
  bati: {
    kod: '1B', ad: 'Vanguard\'ın Hayaletleri', veren: 'Koloni Telsiz Subayı',
    ortam: 'ortam_tunel',
    giris: [
      'Derin taş mağara yankısı, uzaktan metal kesen bir testere ve eski bir gemi bilgisayarının bozuk açılış bipi.',
      'Telsiz subayı: "Kaptan, bu sinyal yıllar önce düşen ilk koloni gemisi Vanguard-01\'in enkazından geliyor. Ama yalnız değiliz; enkazdaki eski savunma otomatları yeniden uyanmış ve dışarıdan gelen silahlı bir yağmacı grubu tohum kasalarımızı söküyor!"',
    ],
    hazirlik: (d) => 'Önerilen hazırlık: ' + ((d.araclar || []).includes('mammoth') ? 'Mammoth enkaz kapısını kırar' : 'araç hangarından Mammoth (enkaz kapısı için)') + ' ya da Akrep dronu.',
    op: [A('ton', 'Enkaz kapısının güvenlik kilidi', 'Karanlık tünelde kapının dört notalı kilidi. Basılı tut: tonları dinle. Sonra sırayla: kalın aşağı kaydır, tiz yukarı kaydır, orta çift dokun.', 'Kilit açıldı; enkazın içi soğuk ve tozlu.', { n: 4 })],
    savas: { dusmanlar: ['yagmaci_oncusu', 'vanguard_otomati'], ortam: 'kara', gelis: 'oncu', tier: 1, giris: 'Otomat iki turda bir kalkan tonunu değiştirir: iki parmakla çevirerek kır. Yağmacı yüzde yirmi beş canda teslim olabilir.' },
    kararlar: [
      { etiket: 'Teslim olan yağmacıları koloniye affet', sonuc: 'On beş insan iş gücü koloniye katıldı; ama koloninin morali geçici olarak beş düştü.', yap: (d) => { nufus(d, 15); d.koloni.moral = Math.max(0, d.koloni.moral - 5); } },
      { etiket: 'Onları sür, tohum ve veri kasalarını kurtar', sonuc: 'Soya-kazein, nöro-kahve ve aloe-silika tohum kasaları ile akademi için bir ön veri diski kurtarıldı. Moral on arttı.', yap: (d) => { tohumKasasi(d); b(d).vanguardVeriDiski = true; d.koloni.moral = Math.min(100, d.koloni.moral + 10); } },
    ],
    odul: 'Batı sektörü güvenli: Vanguard-01 enkazından düzenli titanyum ve mikroçip ikmal hattı açıldı (ileri karakolla günlük).',
  },
  dogu: {
    kod: '1C', ad: 'Sisin İçindeki Fısıltı', veren: 'Kseno-biyoloji ve malzeme araştırmacısı Dr. Selin',
    ortam: 'ortam_civa',
    giris: [
      'Kulaklığında sürekli sağdan sola kayan elektrikli cıva uğultusu, bataklık baloncukları ve çok uzaktan bir imdat düdüğü.',
      'Dr. Selin: "Doğu bataklıklarına giden üç kişilik keşif ekibi iki nöbettir dönmedi. Manyetik sis pusulaları tamamen kör etti. Cıva şelalelerinin orada bir şeyler ekibin etrafını sarmış durumda. Sesleri bile manyetik dalga yüzünden parçalanıyor!"',
    ],
    hazirlik: (d) => 'Önerilen hazırlık: ' + ((d.araclar || []).includes('col_tilkisi') ? 'Çöl Tilkisi bataklığın üstünden kayar' : 'Çöl Tilkisi (bataklık için)') + (bina(d, 'sinyal_kulesi') ? '; sinyal kulesi taramaya hazır.' : ' ya da sinyal kulesi taraması.'),
    op: [A('frekans', 'Parazitli imdat sinyali', 'İmdat sinyalini netleştir: parmağını yukarı aşağı gezdir; bipler hızlanınca çift dokun. Kayıp ekibin yönü bulunur.', 'Ekibin yeri belli: şelalenin dibindeki tortu havuzu.', { cift: true })],
    savas: { dusmanlar: ['bataklik_pusucusu', 'bataklik_pusucusu'], ortam: 'kara', gelis: 'kiskac', tier: 1, giris: 'Pusucular her darbede sisin içinde sağdan sola yer değiştirir; sesi izle, yeniden kilitlen.' },
    kararlar: [
      { etiket: 'Önce yaralı ekibi tahliye et', sonuc: 'Üç uzman sağ salim döndü; enstitü ve seranın hızı kalıcı yüzde on arttı. Cıva tortusu az toplandı.', yap: (d) => { b(d).doguUzmanlari = true; ekle(d, 'civa_tortusu', 1); } },
      { etiket: 'Tortu havuzunu da mühürle', sonuc: 'Beş manyetik cıva tortusu ve dört silikat kristali alındı; ama bir ekip üyesi yaralandı, revirde tedavi gerekiyor.', yap: (d) => { ekle(d, 'civa_tortusu', 5); ekle(d, 'kristal', 4); const u = (d.murettebat || [])[0]; if (u) u.stres = Math.min(100, (u.stres || 0) + 40); } },
    ],
    odul: 'Doğu sektörü güvenli: Koloni Kalkan Jeneratörü için manyetik cıva tortusu hattı açıldı.',
  },
  kuzey: {
    kod: '1D', ad: 'Asit Yağmuru Altında', veren: 'Tersane ve hangar sorumlusu',
    ortam: 'ortam_plato',
    giris: [
      'Metal çatıya çarpan yakıcı asit yağmuru, şiddetli rüzgâr ve gökten pike yapan kanatlı kseno-avcıların çığlıkları.',
      'Hangar sorumlusu: "Kaptan, tersaneyi tam kapasiteye almadan önce kuzey sırtlarındaki rüzgâr kulelerini temizlemeliyiz. Asit fırtınasında görüş sıfır, üstelik havadan saldıran kseno-avcılar vinç kablolarını kemiriyor!"',
    ],
    hazirlik: (d) => 'Önerilen hazırlık: ' + (ZN.miktar(d, 'notralizasyon_kulesi') > 0 ? 'nötralizasyon kulen asit hasarını sıfırlar' : 'nötralizasyon kulesi (asit hasarını sıfırlar)') + ', ya da Demir Kervan veya Atmosphere-X.',
    op: [A('kacin', 'Pike yapan avcılar', 'Kanat sesi hangi yandan inerse ters yana kaydır. Dört kez.', 'Rüzgâr kulelerinin dibine vardın.', { n: 4 })],
    savas: { dusmanlar: ['kseno_avci', 'kseno_avci'], ortam: 'kara', gelis: 'kiskac', tier: 2, cevre: 'asit', giris: 'Avcıların uyarı penceresi kısa; hızlı kaçın.' },
    kararlar: [
      { etiket: 'Rüzgâr kulelerini savunma ağına bağla', sonuc: 'Kuzey platosu için kalıcı erken uyarı açıldı: platoya gelen baskınlar bir nöbet önceden bildirilir ve kendiliğinden püskürtülür.', yap: (d) => { sek(d, 'kuzey').erkenUyari = true; } },
      { etiket: 'Polimer toplama bacalarını kur', sonuc: 'Platodan koloniye her gün düzenli asit-direnç polimeri akacak.', yap: (d) => { sek(d, 'kuzey').polimerBacasi = true; } },
    ],
    odul: 'Aethelis-IV\'ün dört ana sektörü de güvenli olunca Aşama 2, yörünge ve yakın uzay açılır.',
  },
  yorunge: {
    kod: '2A', ad: 'Kırık Çember', veren: 'Taktik subay',
    giris: [
      'Yörünge sessizliğini yırtan çift motorlu bir korsan taraması; ikmal uydularının telemetrisi bir anda kesildi.',
      'Taktik subay: "Kaptan, Aethelis\'in alçak yörüngesine iki korsan gemisi çökmüş. Uzaya açılan tek ikmal kapımızı tutuyorlar. Motorları ateşlemeden önce onları temizlemeliyiz!"',
    ],
    hazirlik: () => 'Kıvılcım ya da Rüzgarkıran hazır; varsa K1 ve K2 modüllerini tak, mutfaktan sefer rasyonu yükle. Önce hızlı saldıran avcıyı indir, sonra yüzde otuzda kaçmaya çalışan korveti torpidoyla durdur.',
    savas: { dusmanlar: ['korsan_avci', 'korsan_korvet'], ortam: 'uzay', gelis: 'kiskac', tier: 2 },
    kararlar: null,
    odul: 'Aethelis yörüngesi güvenli; yedek filo devriyesi açıldı. Dinleme kulesi asteroit kuşağından boğuk bir çağrı yakalıyor.',
  },
  kaelith: {
    kod: '2B', ad: 'Kül ve Çekiç: Kaelith\'in Son Ocağı', veren: 'Kaelith ustabaşı Torvok',
    ortam: 'ortam_lav',
    giris: [
      'Aşırı ısınmış metal gıcırtısı, arkada patlayan maden ocakları ve kalın, taşları titreten bir bas sesin ağır nefesi.',
      'Torvok: "Burada bizi duyan var mı? Ben Kaelith ocağından Torvok! Dışarıda bir korsan zırhlısı çıkış kapımızı kilitledi, içeride ise sıcak galerilerden uyanan yaratıklar işçilerimizi köşeye sıkıştırdı. Soğutma çekirdeğimiz patlamak üzere, kimse gelmezse hepimiz eriyeceğiz!"',
    ],
    hazirlik: (d) => 'Önerilen hazırlık: termal plazma kesici ya da kriyo atölyesinden iki tüp dondurucu köpük ve termal giysi. Ambarda ' + ZN.miktar(d, 'dondurucu_kopuk') + ' tüp köpük var.',
    savasOnce: { dusmanlar: ['agir_maden_korsani'], ortam: 'uzay', tier: 2, giris: 'Zırhlı korsan istasyonun dış kapısını tutuyor; iki parmakla çevirip zırh frekansını kır.' },
    op: [A('basinc', 'Aşırı ısınmış hava kilidi', 'Üç aşamalı basınç tahliye vanası: ıslık en tize varınca çift dokun. Üç kez.', 'Hava kilidi açıldı; içeride kızıl bir sıcaklık.')],
    savas: { dusmanlar: ['magma_akrebi', 'galeri_cagirani', 'magma_akrebi'], ortam: 'kara', gelis: 'kiskac', tier: 2, giris: 'Torvok\'un ekibi arkanda; galeri çağıranı yaratık çağırıyor, önce küçükleri indir.' },
    kararlar: [
      { etiket: 'Bütün Kaelith ailelerini ve ustaları tahliye et', sonuc: 'Korsan cephaneliği lavın altında kaldı ama herkes kurtuldu. Yirmi beş Kaelith koloniye yerleşti; Torvok dökümhanene geçti, metal ergitme kalıcı yüzde otuz ucuz.', yap: (d) => { kaelithYerles(d, 25, 0.3); } },
      { etiket: 'Önce korsan zırh deposunu sök, kalanları son anda al', sonuc: 'Dört yüz titanyum-karbon, yüz elli şasi çeliği ve iki gemi zırh modülü ganimet; ama beş Kaelith işçisi geride kaldı. On beş Kaelith koloniye yerleşti; Torvok mesafeli, dökümhane yalnız yüzde on beş ucuz.', yap: (d) => { kaelithYerles(d, 15, 0.15); ekle(d, 'titanyum_karbon', 400); ekle(d, 'sasi_celigi', 150); ekle(d, 'zirhli_plaka', 100); } },
    ],
    odul: 'Kaelith topluluğu resmen Aethelis-IV\'e yerleşti: Tonoflenya köprüsünün kurtarılmış topluluk şartlarından biri tamam. Yakın asteroit sektörü güvenli; Aşama 3, derin uzay ve yirmi gezegen hattı açıldı.',
  },
};

// Kaelith ustalarının dökümhane indirimi (koloni.js okur)
export function dokumIndirimi(d) {
  return (d.komuta && d.komuta.torvok) || 0;
}
function kaelithYerles(d, n, indirim) {
  nufus(d, n);
  b(d).kaelithKurtarildi = true;
  komuta(d).torvok = indirim;
  d.itibar += indirim >= 0.3 ? 30 : 10;
}
function nufus(d, n) {
  const nu = d.koloni.nufus;
  nu.toplam = (nu.toplam || 0) + n;
  nu.barinma = (nu.barinma || 0) + n; // yeni gelenler kendi barınaklarını kurar
}
function ekle(d, k, n) {
  ZN.ekle(d, k, n);
  if (!ZN.miktar(d, k)) d.koloni.parcalar[k] = (d.koloni.parcalar[k] || 0) + n; // bilinmeyen malzeme parça olarak
}
function tohumKasasi(d) {
  if (!d.tarim) return;
  for (const t of ['soya', 'noro_kahve', 'aloe']) d.tarim.tohumlar[t] = (d.tarim.tohumlar[t] || 0) + 2;
}

// --- Durum ---
export function komuta(d) {
  if (!d.komuta) d.komuta = { sektor: {}, aktif: null, evre: null, sonMetin: '', baskinlar: [], sonrakiBaskin: 0, sonAktarim: 0, tamGuvence: false, hikaye: [] };
  return d.komuta;
}
function sek(d, id) {
  const k = komuta(d);
  if (!k.sektor[id]) k.sektor[id] = { durum: 'sisli', karakol: null };
  return k.sektor[id];
}
export function durum(d, id) {
  const s = sek(d, id);
  if (s.durum === 'guvenli' && komuta(d).baskinlar.some((x) => x.id === id)) return 'baskin';
  return s.durum;
}
export function sektorlerGuvenli(d) {
  return SEKTORLER.every((id) => sek(d, id).durum === 'guvenli');
}
export const DURUM_ADI = { sisli: 'Keşfedilmemiş, sisli', dusman: 'Düşman kontrolünde', baskin: 'Baskın altında', guvenli: 'Güvenli ve üretimde' };
export const DURUM_SESI = { sisli: 'statik', dusman: 'red', baskin: 'telsiz_zil', guvenli: 'jenerator' };

// --- Eylemler ---
export function tara(d, id) {
  const bl = BOLGELER[id];
  const s = sek(d, id);
  if (s.durum !== 'sisli') return { metin: bl.ad + ' zaten tarandı.' };
  if (!bl.uzay && !bina(d, 'sinyal_kulesi') && !(d.araclar || []).length) return { metin: 'Taramak için dinleme kulesi ya da bir keşif aracı gerekir.', ses: 'red' };
  if (bl.uzay && !d.gemi) return { metin: 'Yörüngeyi taramak için bir gemi gerekir.', ses: 'red' };
  if (!bl.kosul(d)) return { metin: bl.ad + ' sessiz; henüz bir tehdit yok. ' + bl.kosulMetni };
  s.durum = 'dusman';
  return { metin: bl.ad + ': ' + bl.tehdit + '. Tehdit kademe ' + bl.kademe + '. Saldırı başlatabilirsin.', ses: 'sonar' };
}
export function saldiriKosulu(d, id) {
  const bl = BOLGELER[id];
  if (sek(d, id).durum !== 'dusman') return 'Bu bölge şu an hedef değil.';
  if (komuta(d).aktif) return 'Süren bir harekât var: ' + GOREVLER[komuta(d).aktif].ad + '.';
  if (b(d).tonoflenyada) return 'Aethelis-IV\'e dönmeden bu harekât başlamaz.';
  if (d.savas || d.op) return 'Önce süren çatışma ya da operasyon bitsin.';
  if (bl.uzay && !d.gemi) return 'Gemin yok.';
  if (!bl.uzay && d.uzay) return 'Uzaydasın; önce koloniye in.';
  return null;
}
export function saldir(d, id) {
  const k = saldiriKosulu(d, id);
  if (k) return { metin: k, ses: 'red' };
  const km = komuta(d);
  km.aktif = id;
  km.evre = 'giris';
  d.sahne = 'kom_giris';
  return { metin: '', kapat: true };
}
// Karakol: otomatik ikmal karakolu, sinyal rölesi ya da maden sondajı (bir parça ya da hammaddeyle)
export const KARAKOL_TURLERI = {
  ikmal: { ad: 'Otomatik ikmal karakolu', tarif: 'Her gün yakıt ve hammadde aktarır; baskınları kendiliğinden püskürtür.', bedel: { ikmal_karakolu: 1 }, yedek: { bazalt: 8, titanyum: 4, kristal: 2 } },
  role: { ad: 'Sinyal rölesi', tarif: 'Her gün aktarım; bir sonraki halkanın sinyallerini erken yakalar, dinleme menzilini bir halka uzatır.', bedel: { bazalt: 6, kristal: 3, kablo: 10 } },
  sondaj: { ad: 'Maden sondajı', tarif: 'Her gün bölgenin hammaddesinden iki kat aktarır.', bedel: { bazalt: 8, titanyum: 6 } },
};
export function karakolKur(d, id, tur) {
  const s = sek(d, id);
  const bl = BOLGELER[id];
  if (s.durum !== 'guvenli') return { metin: 'Karakol yalnız güvenli bölgeye kurulur.', ses: 'red' };
  if (s.karakol) return { metin: bl.ad + ' zaten bir ' + KARAKOL_TURLERI[s.karakol].ad.toLowerCase() + ' taşıyor.', ses: 'red' };
  const t = KARAKOL_TURLERI[tur];
  let bedel = t.bedel;
  const yeter = (g) => Object.keys(g).every((x) => ZN.miktar(d, x) >= g[x]);
  if (!yeter(bedel) && t.yedek) bedel = t.yedek;
  if (!yeter(bedel)) return { metin: 'Eksik: ' + Object.keys(t.bedel).map((x) => t.bedel[x] + ' ' + ZN.adi(x)).join(', ') + (t.yedek ? ' ya da ' + Object.keys(t.yedek).map((x) => t.yedek[x] + ' ' + ZN.adi(x)).join(', ') : '') + '.', ses: 'red' };
  for (const x of Object.keys(bedel)) ZN.ekle(d, x, -bedel[x]);
  s.karakol = tur;
  return { metin: t.ad + ' ' + bl.ad + ' üzerinde kuruldu. ' + t.tarif, ses: 'kaynak' };
}
export function devriyeAta(d, id) {
  const s = sek(d, id);
  if (!(d.filo || []).length) return { metin: 'Yedek filoda gemi yok.', ses: 'red' };
  if (sek(d, 'yorunge').durum !== 'guvenli') return { metin: 'Yedek filo devriyesi yörünge ablukası kırılınca açılır.', ses: 'red' };
  for (const x of Object.values(komuta(d).sektor)) if (x.devriye) x.devriye = false;
  s.devriye = true;
  return { metin: 'Yedek filodan bir gemi ' + BOLGELER[id].ad + ' üzerinde devriyeye çıktı.', ses: 'kalkis' };
}
function bagli(d, id) {
  const s = sek(d, id);
  return s.karakol === 'ikmal' || s.devriye || s.erkenUyari || (bina(d, 'koloni_kalkani') && BOLGELER[id].halka === 1);
}

// --- Komşu halka baskısı (bölüm 4) ---
// Saldırı yalnız ele geçirilmemiş komşu halkadan gelir; karakol, kalkan ya da devriye bağlıysa kendiliğinden püskürtülür;
// dört sektör ve yörünge güvenliyse Tam Güvence: rutin baskın yok.
export function tamGuvence(d) {
  return sektorlerGuvenli(d) && sek(d, 'yorunge').durum === 'guvenli';
}
function zar(d, i) {
  const x = Math.sin((d.tohum || 1) * 0.73 + i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}
function baskinAdaylari(d) {
  const l = [];
  const birDusman = SEKTORLER.some((id) => sek(d, id).durum !== 'guvenli');
  for (const id of SEKTORLER) {
    const s = sek(d, id);
    if (s.durum !== 'guvenli' || s.muhur) continue;
    if (birDusman || (sektorlerGuvenli(d) && sek(d, 'yorunge').durum !== 'guvenli')) l.push(id);
    else if (id === 'guney' && s.akrepBitis > simdi(d)) l.push(id);
  }
  if (sek(d, 'yorunge').durum === 'guvenli' && sek(d, 'kaelith').durum !== 'guvenli' && BOLGELER.kaelith.kosul(d)) l.push('yorunge');
  return l;
}
export function komutaIlerle(d) {
  const k = komuta(d);
  const t = simdi(d);
  const olaylar = [];
  // Yarım kalan harekât (operasyondan geri çekilme ya da yenilgi): bölge düşman elinde kalır, panelden yeniden saldırılır
  if (k.aktif && !d.sahne && !d.op && !d.opBekle && !d.savas && !d.savasBekle && (k.evre === 'op' || k.evre === 'savas')) {
    olaylar.push(GOREVLER[k.aktif].ad + ' yarım kaldı; bölge hâlâ düşman elinde. Komuta panelinden yeniden saldırabilirsin.');
    k.aktif = null;
    k.evre = null;
  }
  if (k.savunulan && !d.savas && !d.savasBekle && !d.sahne) k.savunulan = null;
  if (!k.sonrakiBaskin) k.sonrakiBaskin = t + (6 + Math.floor(zar(d, 1) * 7)) * NOBET_SN;
  // Süresi dolan baskın: püskürtülemedi
  for (const x of k.baskinlar.slice()) {
    if (t < x.bitis) continue;
    k.baskinlar = k.baskinlar.filter((y) => y !== x);
    const bl = BOLGELER[x.id];
    if (misafir(d, 'barracuda')) olaylar.push('Baskıncılar ' + bl.ad + ' üzerinden geçti; Barracuda\'nın adamları ambarları korudu, kayıp yok.');
    else {
      for (const r of Object.keys(bl.aktarim)) ZN.ekle(d, r, -Math.min(ZN.miktar(d, r), bl.aktarim[r] * 2));
      d.koloni.moral = Math.max(0, d.koloni.moral - 5);
      olaylar.push(bl.ad + ' baskınına karşılık verilmedi: ambarlardan mal yağmalandı, koloni morali beş düştü.');
    }
  }
  // Tam Güvence ilanı (bir kez)
  if (tamGuvence(d) && !k.tamGuvence) {
    k.tamGuvence = true;
    olaylar.push('Koloni bilgisayarı: Aethelis-IV\'ün dört sektörü ve yörüngesi güvenli. Tam Güvence: rutin baskınlar durdu.');
  }
  if (t >= k.sonrakiBaskin) {
    k.no = (k.no || 0) + 1;
    k.sonrakiBaskin = t + (6 + Math.floor(zar(d, k.no + 7) * 7)) * NOBET_SN;
    const l = baskinAdaylari(d);
    if (l.length && !misafir(d, 'zeno')) {
      const id = l[Math.floor(zar(d, k.no) * l.length)];
      const bl = BOLGELER[id];
      if (bagli(d, id)) {
        const s = sek(d, id);
        const kim = s.karakol === 'ikmal' ? 'otomatik ikmal karakolu' : s.devriye ? 'yedek filo devriyesi' : s.erkenUyari ? 'rüzgâr kulelerinin erken uyarı ağı' : 'koloni kalkan jeneratörü';
        olaylar.push(bl.ad + ' üzerine bir baskın geldi; ' + kim + ' saldırıyı uzaktan püskürttü.');
      } else if (!k.baskinlar.some((x) => x.id === id)) {
        k.baskinlar.push({ id, bitis: t + NOBET_SN });
        olaylar.push('Koloni bilgisayarı: ' + bl.ad + ' baskın altında! Komuta panelinin savunma hattından bizzat savun ya da otomatik savunma ata. Bir nöbet içinde.');
      }
    } else if (l.length && misafir(d, 'zeno')) olaylar.push('Silahşör Zeno sektörlerde nöbette; yaratıklar pusu kuramadı.');
  }
  // İleri karakolların günlük aktarımı
  if (!k.sonAktarim) k.sonAktarim = t;
  if (t - k.sonAktarim >= GUN) {
    k.sonAktarim = t;
    const top = {};
    for (const id of Object.keys(k.sektor)) {
      const s = k.sektor[id];
      const bl = BOLGELER[id];
      if (!bl || s.durum !== 'guvenli') continue;
      const kat = s.karakol === 'sondaj' ? 2 : s.karakol ? 1 : 0;
      for (const r of Object.keys(bl.aktarim)) if (kat) top[r] = (top[r] || 0) + bl.aktarim[r] * kat;
      if (s.polimerBacasi) top.polimer = (top.polimer || 0) + 2;
    }
    for (const r of Object.keys(top)) ekle(d, r, top[r]);
    if (Object.keys(top).length) olaylar.push('İleri karakollar günlük aktarımı yaptı: ' + Object.keys(top).map((r) => top[r] + ' ' + ZN.adi(r)).join(', ') + '.');
  }
  for (const m of olaylar) SB.haber(d, m);
  return olaylar;
}
// Savunma hattı: bizzat savun (evrensel savaş, tam ödül) ya da otomatik savunma ata (karakol, kalkan, yedek gemi)
export function bizzatSavun(d, id) {
  const bl = BOLGELER[id];
  if (b(d).tonoflenyada) return { metin: 'Tonoflenya\'dan bizzat müdahale edemezsin; otomatik savunma ata.', ses: 'red' };
  if (bl.uzay && !d.gemi) return { metin: 'Gemin yok.', ses: 'red' };
  const k = komuta(d);
  k.savunulan = id;
  d.savasBekle = { dusmanlar: bl.baskinDusman.slice(), ortam: bl.uzay ? 'uzay' : 'kara', tier: bl.kademe, giris: bl.ad + ' baskını! Ekibinle savun.' };
  d.savasSonraSahne = 'kom_savunma';
  return { metin: bl.ad + ' için ekip yola çıktı.', kapat: true };
}
export function otomatikSavun(d, id) {
  const k = komuta(d);
  const s = sek(d, id);
  let kim = null;
  if (bina(d, 'koloni_kalkani')) kim = 'Koloni kalkan jeneratörü';
  else if (Object.values(k.sektor).some((x) => x.karakol === 'ikmal')) kim = 'Otomatik ikmal karakolu';
  else if ((d.filo || []).length) {
    kim = 'Yedek filodan bir gemi';
    s.devriye = true;
  }
  if (!kim) return { metin: 'Atanacak bir savunma yok: kalkan jeneratörü, ikmal karakolu ya da yedek filoda bir gemi gerekir.', ses: 'red' };
  k.baskinlar = k.baskinlar.filter((x) => x.id !== id);
  d.kaptan.tecrube += 10;
  return { metin: kim + ' ' + BOLGELER[id].ad + ' baskınını uzaktan püskürttü. Ödül az, ama ekip yerinde kaldı.', ses: 'kalkis' };
}
// Nadir hikâye baskını (Tam Güvence'den sonra yalnız yeni bir kapı açıldığında; ör. yabancı firkateyn izimizi sürdüğünde)
export function hikayeBaskini(d, anahtar, spec) {
  const k = komuta(d);
  if (k.hikaye.includes(anahtar)) return false;
  k.hikaye.push(anahtar);
  d.savasBekle = spec;
  return true;
}

// --- Halka 3 ve 4 (bilgi; ilerleme kendi sistemlerinden) ---
function koridorDurumu(d, pid) {
  if ((d.tamamlananOp || []).includes(pid)) return 'guvenli';
  const poi = (d.harita && d.harita.poiler) || [];
  if (!poi.includes(pid)) return 'sisli';
  return 'dusman';
}
function kusakDurumu(d, g) {
  if (!b(d).tonoflenyaGoruldu) return 'sisli';
  return gucItibari(d, g) >= 20 ? 'guvenli' : 'dusman';
}
export function guvenliKusakSayisi(d) {
  return GUC_SIRASI.filter((g) => kusakDurumu(d, g) === 'guvenli').length;
}

// --- Panel (ağaç menü; Yuzey agacGoster) ---
function satir(d, id) {
  const bl = BOLGELER[id];
  const dz = durum(d, id);
  const s = sek(d, id);
  let e = bl.ad + '. Durum: ' + DURUM_ADI[dz];
  if (dz === 'dusman') e += ', ' + bl.tehdit;
  e += '. Tehdit: kademe ' + bl.kademe + '.';
  if (s.karakol) e += ' Karakol: ' + KARAKOL_TURLERI[s.karakol].ad + '.';
  if (s.devriye) e += ' Devriye var.';
  const ipucu = dz === 'sisli' ? 'Çift dokun: tara.' : dz === 'dusman' ? 'Saldırı başlatmak için çift dokunun.' : dz === 'baskin' ? 'Çift dokun: savun.' : 'Çift dokun: karakol ve bilgi.';
  return { e, dz, ipucu };
}
function bolgeEylemleri(d, id) {
  const bl = BOLGELER[id];
  const dz = durum(d, id);
  const o = [];
  if (dz === 'sisli') o.push({ id: 'tara', etiket: 'Tara', yap: (x) => tara(x, id) });
  if (dz === 'dusman') o.push({ id: 'saldir', etiket: 'Saldırı başlat' + (bl.uzay ? ' (uzay savaşı)' : ' (kara savaşı)'), ipucu: saldiriKosulu(d, id) || GOREVLER[id].hazirlik(d), yap: (x) => saldir(x, id) });
  if (dz === 'baskin') o.push({ id: 'bizzat', etiket: 'Bizzat savun', ipucu: 'Tam ödül, kaptan tecrübesi, yüksek moral.', yap: (x) => bizzatSavun(x, id) }, { id: 'oto', etiket: 'Otomatik savunma ata', yap: (x) => otomatikSavun(x, id) });
  if (dz === 'guvenli' || dz === 'baskin') {
    if (!sek(d, id).karakol) for (const t of Object.keys(KARAKOL_TURLERI)) o.push({ id: 'k_' + t, etiket: KARAKOL_TURLERI[t].ad + ' kur', ipucu: KARAKOL_TURLERI[t].tarif, yap: (x) => karakolKur(x, id, t) });
    if ((d.filo || []).length && !sek(d, id).devriye) o.push({ id: 'devriye', etiket: 'Yedek gemiyi devriyeye ata', yap: (x) => devriyeAta(x, id) });
  }
  o.push({ id: 'bilgi', etiket: 'Bilgi oku', yap: (x) => ({ metin: bilgi(x, id) }) });
  return o;
}
function bilgi(d, id) {
  const bl = BOLGELER[id];
  const g = GOREVLER[id];
  const s = sek(d, id);
  const l = [bl.ad + '.', g.kod + ': ' + g.ad + ', ' + g.veren + '.'];
  if (s.durum === 'sisli') l.push(bl.kosul(d) ? 'Sinyal var; taramayı bekliyor.' : bl.kosulMetni);
  if (s.durum === 'guvenli') l.push(g.odul);
  l.push('Günlük karakol aktarımı: ' + Object.keys(bl.aktarim).map((r) => bl.aktarim[r] + ' ' + ZN.adi(r)).join(', ') + '.');
  return l.join(' ');
}
export function enAcil(d) {
  const k = komuta(d);
  if (k.baskinlar.length) {
    const x = k.baskinlar.slice().sort((a, c) => a.bitis - c.bitis)[0];
    return 'En acil: ' + BOLGELER[x.id].ad + ' baskın altında, ' + Math.max(1, Math.ceil((x.bitis - simdi(d)) / 60)) + ' dakika içinde savun.';
  }
  const dus = [...SEKTORLER, ...HALKA2].find((id) => sek(d, id).durum === 'dusman');
  if (dus) return 'En acil: ' + BOLGELER[dus].ad + ', düşman kontrolünde. Saldırı hedefi.';
  return k.tamGuvence ? 'Acil bir tehdit yok; koloni Tam Güvence\'de.' : 'Acil bir tehdit yok.';
}
const sekmeler = ['harita', 'savunma', 'karakol'];
export function panel(d, sekme = 'harita') {
  komuta(d);
  const i = sekmeler.indexOf(sekme);
  const ikiParmak = { sag: (x) => panel(x, sekmeler[(i + 1) % 3]), sol: (x) => panel(x, sekmeler[(i + 2) % 3]), ses: 'el_sayfa' };
  const ust = 'İki parmakla sağa ya da sola kaydır: sekme değiştir. Üç parmakla dokun: en acil bölge.';
  const bolgeOgesi = (id) => {
    const s = satir(d, id);
    return { id, etiket: s.e, ipucu: s.ipucu, ses: DURUM_SESI[s.dz], alt: (x) => ({ baslik: BOLGELER[id].ad, giris: satir(x, id).e, ogeler: bolgeEylemleri(x, id) }) };
  };
  if (sekme === 'savunma') {
    const k = komuta(d);
    return {
      baslik: 'Komuta paneli: Savunma hattı',
      giris: (k.baskinlar.length ? k.baskinlar.length + ' bölge baskın altında. ' : (k.tamGuvence ? 'Tam Güvence: rutin baskın yok. ' : 'Şu an baskın yok. ')) + ust,
      ikiParmak, ucParmak: enAcil,
      ogeler: k.baskinlar.map((x) => bolgeOgesi(x.id)).concat([...SEKTORLER, ...HALKA2].filter((id) => sek(d, id).durum === 'guvenli' && !k.baskinlar.some((x) => x.id === id)).map((id) => {
        const o = bolgeOgesi(id);
        o.etiket = BOLGELER[id].ad + ': ' + (bagli(d, id) ? 'bağlı savunma var, baskınlar kendiliğinden püskürtülür.' : sek(d, id).muhur ? 'mühürlü, baskın gelmez.' : 'savunmasız; karakol, kalkan ya da devriye bağla.');
        return o;
      })),
    };
  }
  if (sekme === 'karakol') {
    const l = [...SEKTORLER, ...HALKA2].filter((id) => sek(d, id).durum === 'guvenli');
    return {
      baslik: 'Komuta paneli: İleri karakol ve genişleme',
      giris: (l.length ? l.length + ' güvenli bölge. ' : 'Henüz güvenli bir bölge yok; temizlenen bölgeye karakol kurulur. ') + 'Karakollar her gün koloniye aktarım yapar. ' + ust,
      ikiParmak, ucParmak: enAcil,
      ogeler: l.map((id) => bolgeOgesi(id)),
    };
  }
  const ogeler = SEKTORLER.map(bolgeOgesi);
  if (sektorlerGuvenli(d) || sek(d, 'yorunge').durum !== 'sisli') ogeler.push(...HALKA2.map(bolgeOgesi));
  if (gemiSinifi(d) >= 3) ogeler.push({ id: 'derin', etiket: 'Derin uzay koridorları: yirmi gezegen hattı. ' + Object.keys(GEZEGENLER).filter((p) => koridorDurumu(d, p) === 'guvenli').length + ' güvenli.', alt: (x) => ({
    baslik: 'Derin uzay koridorları',
    giris: 'Varek ve Sinha: gezegen sektörlerini yabancı firkateyn ve dron taşıyıcısı tutuyor. Yörüngede hattı kır, in, numuneyi al, yörüngeye ikmal karakolu kur. Uzay haritasından uç.',
    ogeler: Object.keys(GEZEGENLER).map((p) => {
      const dz = koridorDurumu(x, p);
      return { id: p, etiket: GEZEGENLER[p].ad + ': ' + DURUM_ADI[dz] + ((x.karakollar || []).includes(p) ? ', ikmal karakolu kurulu' : '') + '.', ses: DURUM_SESI[dz] };
    }),
  }) });
  if (b(d).tonoflenyaGoruldu) ogeler.push({ id: 'tonoflenya', etiket: 'Tonoflenya kuşakları: ' + guvenliKusakSayisi(d) + ' / 5 güvenli müttefik.', alt: (x) => ({
    baslik: 'Tonoflenya kuşakları',
    giris: 'Kahergonat sızmaları, Alt-Evren sürüleri ve haydut barikatları kuşakları tehdit ediyor. Yan görevler ve bölge itibarı kuşağı müttefik yapar. En az üç kuşak güvenli olmadan final cephesi savunmasız kalır; güvenli kuşaklardan takviye gelir.',
    ogeler: GUC_SIRASI.map((g) => {
      const dz = kusakDurumu(x, g);
      return { id: g, etiket: GUCLER[g] + ': ' + (dz === 'guvenli' ? 'Güvenli müttefik bölgesi' : 'Tehdit altında') + ', itibar ' + gucItibari(x, g) + ', ' + gucBasamagi(gucItibari(x, g)) + '.', ses: DURUM_SESI[dz] };
    }),
  }) });
  return { baslik: 'Komuta paneli: Bölge haritası', giris: ust, ikiParmak, ucParmak: enAcil, ogeler };
}

// --- Harekâtın operasyonları ve sahneleri ---
for (const id of Object.keys(GOREVLER)) {
  const g = GOREVLER[id];
  if (g.op) OPERASYONLAR['kom_' + id] = { yuzey: true, final: true, komuta: id, adimlar: g.op, sonuc: () => [], odul: {}, sahne: 'kom_ara' };
}
function gorev(d) {
  const k = komuta(d);
  return k.aktif ? GOREVLER[k.aktif] : null;
}
function savasKur(d, spec, sonra) {
  komuta(d).evre = 'savas';
  d.savasBekle = { ...spec };
  d.savasSonraSahne = sonra;
}
function bitir(d, karar) {
  const k = komuta(d);
  const id = k.aktif;
  const g = GOREVLER[id];
  const s = sek(d, id);
  s.durum = 'guvenli';
  b(d)['sektor_' + id] = true;
  if (karar && karar.yap) karar.yap(d);
  k.sonMetin = [karar ? karar.sonuc : '', g.odul].filter(Boolean).join(' ');
  d.itibar += 40;
  d.kaptan.tecrube += 60;
  SB.ekolKazan(d, 'varek', 20);
  k.aktif = null;
  k.evre = null;
  if (id === 'yorunge') sek(d, 'kaelith');
}
export const SAHNELER = {
  kom_giris: {
    baslik: 'Harekât',
    efekt: ['telsiz_zil'],
    ortam: (d) => (gorev(d) && gorev(d).ortam) || null,
    metin: (d) => {
      const g = gorev(d);
      if (!g) return [];
      return [g.kod + ': ' + g.ad + '.', 'Telsizde: ' + g.veren + '.', ...g.giris, g.hazirlik(d)];
    },
    secenekler: (d) => {
      const g = gorev(d);
      const k = komuta(d);
      if (!g) return [{ etiket: 'Devam', sonra: null }];
      const basla = () => {
        if (g.savasOnce) savasKur(d, g.savasOnce, 'kom_savas_sonra');
        else if (g.op) {
          k.evre = 'op';
          d.opBekle = 'kom_' + k.aktif;
        } else savasKur(d, g.savas, g.kararlar ? 'kom_karar' : 'kom_sonuc_hazir');
      };
      return [
        { etiket: g.savasOnce || !g.op ? 'Saldırıya geç' : 'Başla', yap: basla, sonra: null },
        { etiket: 'Sonra', yap: () => { k.aktif = null; k.evre = null; }, sonra: null },
      ];
    },
  },
  kom_savas_sonra: {
    baslik: 'Dış kapı temiz',
    metin: (d) => {
      const g = gorev(d);
      if (!g) return [];
      const kopuk = ZN.miktar(d, 'dondurucu_kopuk') >= 1;
      return ['Zırhlı korsan sustu; istasyonun kapısı önünde.', kopuk ? 'Dondurucu köpük hava kilidini anında soğuttu; kapı açıldı.' : 'Hava kilidi aşırı ısınmış; basınç tahliye vanasını sesle dengele.'];
    },
    secenekler: (d) => {
      const k = komuta(d);
      const g = gorev(d);
      const kopuk = ZN.miktar(d, 'dondurucu_kopuk') >= 1;
      return [{ etiket: kopuk ? 'İçeri gir' : 'Vanaya geç', yap: () => {
        if (kopuk) {
          ZN.ekle(d, 'dondurucu_kopuk', -1);
          savasKur(d, g.savas, 'kom_karar');
        } else {
          k.evre = 'op';
          d.opBekle = 'kom_' + k.aktif;
        }
      }, sonra: null }];
    },
  },
  kom_ara: {
    baslik: 'Adım tamam',
    efekt: ['sinyal'],
    metin: (d) => {
      const g = gorev(d);
      if (!g) return [];
      return [g.op[g.op.length - 1].bitis, g.savas.giris || ''];
    },
    secenekler: (d) => {
      const g = gorev(d);
      return [{ etiket: 'Çatışmaya gir', yap: () => g && savasKur(d, g.savas, g.kararlar ? 'kom_karar' : 'kom_sonuc_hazir'), sonra: null }];
    },
  },
  kom_karar: {
    baslik: 'Karar anı',
    metin: (d) => {
      const g = gorev(d);
      if (!g) return [];
      return ['Çatışma bitti. ' + (g.kod === '2B' ? 'İstasyon çökmeye başlıyor; iki iş için aynı anda vakit yok.' : 'Karar senin.')];
    },
    secenekler: (d) => {
      const g = gorev(d);
      if (!g) return [{ etiket: 'Devam', sonra: null }];
      return g.kararlar.map((c) => {
        const ok = !c.kosul || c.kosul(d);
        return { etiket: c.etiket + (ok ? '' : ' (' + c.kosulMetni + ')'), yap: () => { if (ok) bitir(d, c); }, sonra: ok ? 'kom_sonuc' : 'kom_karar' };
      });
    },
  },
  kom_sonuc_hazir: {
    baslik: 'Zafer',
    metin: (d) => {
      if (gorev(d)) bitir(d, null);
      return [komuta(d).sonMetin];
    },
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
  },
  kom_sonuc: {
    baslik: 'Bölge güvenli',
    efekt: ['sinyal'],
    metin: (d) => [komuta(d).sonMetin],
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
  },
  kom_savunma: {
    baslik: 'Baskın püskürtüldü',
    metin: (d) => {
      const k = komuta(d);
      const id = k.savunulan;
      if (id) {
        k.baskinlar = k.baskinlar.filter((x) => x.id !== id);
        k.savunulan = null;
        d.koloni.moral = Math.min(100, d.koloni.moral + 5);
        d.kaptan.tecrube += 40;
      }
      return [(id ? BOLGELER[id].ad + ' yeniden güvende. ' : '') + 'Koloni seni alkışlıyor; moral beş arttı.'];
    },
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
  },
};
