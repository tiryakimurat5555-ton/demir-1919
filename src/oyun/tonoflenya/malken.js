// Tonoflenya ve Malken medeniyeti (belgeler/tonoflenya-ve-malken-medeniyeti.md). Saf JavaScript.
//
//   Hikâye köprüsü (bölüm 8): Aethelis-IV'te YGK frekansı yakalanınca (Gözcü Tepesi'nde frekans ayarı; koşullar
//     final-gorevleri 1.1: Sınıf III ya da üstü gemi, çok ırklı koloni, derin uzay operasyonları) uzay haritasında
//     YGK feneri belirir. Fenere kenetlenince hiper-sıçrama: sekiz saat (Yıldız Zamanı ileri sarılır), gemi YGK'nin
//     5. katındaki yerçekimi iskelesine iner. Dönüş aynı iskeleden.
//   Malken'ler (bölüm 2) nokta olarak konuşulur (malken alanı): kabul, lonca, meclis, iskele, keşiş, gümrük.
//   Bayraklar: ygkFrekansi, tonoflenyada, ygkKayit, karaGolIzni, malazarIzni, aetherKayigi, malken_ciraklari,
//   ygk_simulasyon, ygk_kripto, ygk_biyodepo, ygk_harita, malken_muhur, t_hamam_<gün>.
import { T_NOKTALAR, YGK_KATLARI, T_MEKANLAR } from './harita';
import { NOBETLER, nobet } from '../zaman';
import * as KR from './kronik';
import * as ZN from './zanaat';

// Hiper-sıçrama süresi: sekiz saat Yıldız Zamanı (yönerge 4.B örneği 08:00:00; bir oyun saati 300 sn, gün 7200 sn).
// 2.4'e kadar yanlışlıkla 8 × 3600 sn (dört oyun günü) ileri sarıyordu.
export const SICRAMA_SN = 8 * 300;
export const GEREKEN_OP = 10;
const b = (d) => d.bayrak;
const ilk = (d, rol) => (d.murettebat[rol] ? d.murettebat[rol].ad.split(' ')[0] : '');

// --- Hikâye köprüsü: YGK frekansı ---
export function seferKosullari(d) {
  const eksik = [];
  const siniflar = [d.gemi, ...(d.filo || [])].filter(Boolean).map((g) => g.sinif || 1);
  if (!siniflar.some((s) => s >= 3)) eksik.push('Sınıf III ya da üstü bir gemi (Aethel Muhafızı bilim kruvazörü)');
  // Kaelith: kadim mezar ya da asteroit kuşağındaki maden ocağından kurtarma (v4 Aşama 2B)
  const op0 = d.tamamlananOp || [];
  const irklar = ['kadim_mezar', 'g13', 'g14', 'aethel9'].filter((x) => op0.includes(x) && !(x === 'kadim_mezar' && d.bayrak.kaelithKurtarildi)).length + (d.bayrak.kaelithKurtarildi ? 1 : 0);
  if (irklar < 2) eksik.push('çok ırklı bir koloni: en az iki kurtarılmış topluluk (Kaelith, Kithron, Vaelin ya da Aethel-9 madencileri)');
  const op = (d.tamamlananOp || []).length;
  if (op < GEREKEN_OP) eksik.push('derin uzayda en az ' + GEREKEN_OP + ' tamamlanmış operasyon (şimdi ' + op + ')');
  return eksik;
}
export function tepeEylemi(d) {
  if (!b(d).kule || b(d).ygkFrekansi) return [];
  return [{ id: 'y_ygk', etiket: 'YGK frekansını ara', ipucu: 'Seni fırlatan akademinin fenerini.' }];
}
export function ygkAra(d) {
  const e = seferKosullari(d);
  if (e.length) return { metin: 'Kuleyi en uzak bantlara çeviriyorsun; parazitin içinde bir an tanıdık bir ritim, sonra yok. Sinyal yetecek kadar güçlü değil. Eksik: ' + e.join('; ') + '.', ses: 'red' };
  return { ayar: true, amac: 'ygk' };
}

export const SAHNELER = {
  ygk_frekansi: {
    baslik: 'YGK frekansı',
    ortam: null,
    efekt: ['sinyal'],
    metin: (d) => [
      'Parazitin içinden altı ayrı ton yükseliyor; her biri başka bir yıldızın rengi. Sonra bir ses: YGK Akademi\'nin otomatik feneri, seni yıllar önce derin uzaya fırlatan akademinin çağrısı.',
      'Hafızanda bir kapı açılıyor: kat 5\'teki gravitasyonel katapult, alt-uzay sıçraması, dengesizlik, Aethelis-IV\'e düşüş. Görev emrin hiç bitmemişti.',
      ilk(d, 1) + ': "Kaptan, bu frekansın ardında bir hiper-sıçrama koridoru var. Haritaya işliyorum: YGK feneri."',
      'Uzay haritasında YGK feneri belirdi. Sınıf III ya da üstü bir gemiyle kenetlenince Tonoflenya\'ya sıçrarsın; yolculuk sekiz saat sürer, koloni o sürede kendi başına yaşar.',
    ],
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
  },
  tonoflenya_varis: {
    baslik: 'Tonoflenya',
    ortam: 'ortam_t_hangar',
    efekt: ['kalkis'],
    metin: (d) => [
      'Koridorun sonunda gökyüzü hiç kararmıyor: altı yıldız. Gümüşi Zhaor, kızıl Varek, zümrüt Axira, ametist Elyndra, mavi Sinha ve altın Uma; üç ikili çift birbirinin çevresinde dönüyor.',
      'Gemi YGK Akademi\'nin beşinci katındaki yerçekimi iskelesine kilitleniyor. Hoparlörlerden binlerce öğrencinin uğultusu ve uzak bir ilahi.',
      'Şu an ' + nobet(d).ad + ' nöbeti: gökyüzüne ' + nobet(d).yildiz + ' hâkim.',
      'Akademinin kabul masası birinci katta; asansör iskelenin yanında. Önce kendini bildir.',
    ],
    secenekler: () => [{ etiket: 'İskeleye in', sonra: null }],
  },
  tonoflenya_tekrar: {
    baslik: 'Tonoflenya',
    ortam: 'ortam_t_hangar',
    efekt: ['kalkis'],
    metin: (d) => ['Altı yıldızın altına yeniden çıkıyorsun; gemi YGK\'nin yerçekimi iskelesine kilitlendi. ' + nobet(d).ad + ' nöbeti.'],
    secenekler: () => [{ etiket: 'İskeleye in', sonra: null }],
  },
  aethelis_donus: {
    baslik: 'Aethelis-IV',
    ortam: 'ortam_plato',
    efekt: ['tislama', 'hidrolik'],
    metin: (d) => ['Sekiz saatlik sıçramanın sonunda Aethelis-IV\'ün fırtınası gövdeyi dövüyor; gemi plato kızağına oturuyor.', d.sicramaNotu || null],
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
  },
  igne_hizalandi: {
    baslik: 'Altı yıldız hizalandı',
    ortam: null,
    efekt: ['sinyal'],
    metin: () => [
      'Altıncı ton da iğnenin içine oturunca kule tek bir saf akorla çınlıyor; ışık derin uzaya fırlıyor.',
      'Gözlemevinin muhafızı: "İğneyi hizalayan bir YGK kaptanına Malazar\'ın yolu açılır. Kuzey sahil kapısına git."',
    ],
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
  },
};

// Hiper-sıçrama: gemi iskelede, kaptan kat 5'te
export function sicrama(d) {
  const ilkKez = !b(d).tonoflenyaGoruldu;
  b(d).tonoflenyaGoruldu = true;
  b(d).tonoflenyada = true;
  d.gemi.liman = 'tonoflenya';
  d.gemi.yer = 'kizak';
  d.uzay = null;
  d.gemide = null;
  d.mekan = 'ygk_5';
  d.oyuncu = { x: T_NOKTALAR.ygk_iskelesi.x - 4, y: 6, yon: 0 };
  if (!d.gorulenMekanlar) d.gorulenMekanlar = [];
  if (!d.gorulenMekanlar.includes('ygk_5')) d.gorulenMekanlar.push('ygk_5');
  if (ilkKez) {
    d.itibar += 50;
    kodeksEkle(d, 'hekzat', 'Altı Yıldızlı Hekzat Sistemi', 'Tonoflenya üç ikili yıldız çiftinin ortak çekiminde döner; gökyüzü hiç kararmaz. Zhaor gümüşi (zihin ve telepati), Varek kızıl (dökümhane, plazma), Axira yeşil (bitki, yenilenme), Elyndra mor (aether, uzay-zaman), Sinha mavi (kalkan, iletişim, itki), Uma altın sarı (yaşam, iklim). Yıldız Zamanı\'nın altı nöbeti onların adını taşır; hâkim yıldız o nöbetin işlerini güçlendirir.', 30);
  }
  d.sahne = ilkKez ? 'tonoflenya_varis' : 'tonoflenya_tekrar';
}
export function donus(d) {
  b(d).tonoflenyada = false;
  d.gemi.liman = null;
  d.gemi.yer = 'kizak';
  d.mekan = 'plato';
  d.oyuncu = { x: 1140, y: 44, yon: 0 };
  d.sahne = 'aethelis_donus';
}

function kodeksEkle(d, id, ad, tarif, itibar = 10) {
  if (d.kodeks.some((k) => k.id === id)) return false;
  d.kodeks.push({ id, ad, tarif, itibar });
  d.itibar += itibar;
  return true;
}

// --- Noktalar ---
export function noktaMi(id) {
  return !!(T_NOKTALAR[id] && (T_NOKTALAR[id].tonEylem || T_NOKTALAR[id].malken));
}

const KATLAR_ADI = (id) => T_MEKANLAR[id].ad.split(':')[0];

export function noktaEylemleri(d, id) {
  const n = T_NOKTALAR[id];
  const e = [...KR.kronikEylemi(d, id)];
  if (n.malken) e.push({ id: 'konus', etiket: 'Konuş' });
  const t = n.tonEylem;
  if (t === 'asansor') {
    for (const k of YGK_KATLARI) if (k !== n.mekan) e.push({ id: 'kat_' + k, etiket: KATLAR_ADI(k), ipucu: T_MEKANLAR[k].ad.split(': ')[1] });
    return e;
  }
  if (t === 'iskele') {
    e.push({ id: 'bakim', etiket: 'Geminin bakımını yaptır', ipucu: 'Yakıt Akademiden; gövde onarımı ' + ZN.bakimMaliyeti(d) + ' kredi.' }, { id: 'donus', etiket: 'Aethelis-IV\'e sıçra', ipucu: ZN.sureMetni(ZN.sicramaSuresi(d)) + ', ' + ZN.sicramaYakiti(d) + ' litre yakıt.' });
    if (ZN.sarjKalan(d) > 0) e.push({ id: 'sarj', etiket: 'Sıçrama motorunun şarjını bekle', ipucu: ZN.sureMetni(ZN.sarjKalan(d)) + ' kaldı.' });
  }
  if (t === 'igne' && !b(d).malazarIzni) e.push({ id: 'hizala', etiket: 'Altı yıldızı hizala', ipucu: 'İğnenin frekansını ayarla.' });
  if (t === 'simulator' && !b(d).ygk_simulasyon) e.push({ id: 'simule', etiket: 'Simülasyona otur' });
  if (t === 'magitech') {
    if (!b(d).malken_ciraklari) e.push({ id: 'cirak', etiket: 'Koloni için çırak iste' });
    if (!b(d).malken_muhur) e.push({ id: 'muhur', etiket: 'Gemine büyü mühürleri kazıt', ipucu: '2 aether kristali.' });
  }
  if (t === 'harita' && !b(d).ygk_harita) e.push({ id: 'kopyala', etiket: 'Rota haritalarını kopyala' });
  if (t === 'arsiv') e.push({ id: 'dinle', etiket: 'Kürelerden birini dinle' });
  if (t === 'kripto' && !b(d).ygk_kripto) e.push({ id: 'otur', etiket: 'Hücrede otur, aether akımını dinle' });
  if (t === 'biyodepo' && !b(d).ygk_biyodepo) e.push({ id: 'takas', etiket: 'Tohum takası' });
  if (t === 'dokumhane') e.push({ id: 'isle', etiket: 'Aether kristali dök', ipucu: '1 aether → 30 zırhlı plaka.' });
  if (t === 'bahce') e.push({ id: 'dolas', etiket: 'Bahçede dolaş' });
  if (t === 'pilon') e.push({ id: 'koloni', etiket: 'Aethelis-IV\'le konuş' });
  if (t === 'meydan') e.push({ id: 'dinle', etiket: 'Halkı dinle' });
  if (t === 'cekirdek') e.push({ id: 'dinle', etiket: 'Çekirdeği dinle' });
  if (t === 'batik') e.push({ id: 'dinle', etiket: 'Fısıltıları dinle' });
  if (t === 'hamam') e.push({ id: 'yikan', etiket: 'Mürettebatla hamamda dinlen' });
  if (t === 'dock') e.push({ id: 'izle', etiket: 'Montajı dinle' });
  if (t === 'toz') e.push({ id: 'topla', etiket: 'Kovayla foton tozu al' });
  if (t === 'sinir') e.push({ id: 'oku', etiket: 'Levhayı oku' });
  e.push({ id: 'incele', etiket: 'İncele' });
  return e;
}

export function eylemUygula(d, id, eid) {
  const n = T_NOKTALAR[id];
  if (eid === 'incele') return { metin: n.tarif || n.ad };
  if (eid === 'konus') return { metin: konus(d, n.malken) };
  if (eid.indexOf('kr_') === 0) return KR.kronikAc(d, Number(eid.slice(3)));
  if (eid.indexOf('kat_') === 0) {
    const k = eid.slice(4);
    if (k === 'ygk_m5' && !b(d).basmufettis) return { metin: 'Asansör kat eksi beşte durmuyor: "Yasaklı tonozlar. Başmüfettiş mührü gerekir."', ses: 'red' };
    d.mekan = k;
    const a = T_NOKTALAR['asansor_' + k];
    d.oyuncu = { x: a.x + 2, y: a.y, yon: Math.PI / 2 };
    if (!d.gorulenMekanlar) d.gorulenMekanlar = [];
    if (!d.gorulenMekanlar.includes(k)) d.gorulenMekanlar.push(k);
    return { metin: 'Asansör sessizce kayıyor. ' + T_MEKANLAR[k].ad + '. ' + T_MEKANLAR[k].tarif, kapat: true, ses: 'kapi_gemi' };
  }
  switch (eid) {
    case 'bakim':
      return ZN.bakimYap(d);
    case 'donus': {
      const k = ZN.sicramaDurumu(d);
      if (k) return { metin: k, ses: 'red' };
      ZN.sicramaYakitiHarca(d);
      donus(d);
      return { metin: '', sicrama: true };
    }
    case 'sarj':
      return { metin: '', bekle: ZN.sarjKalan(d) };
    case 'hizala':
      return { ayar: true, amac: 'igne' };
    case 'simule':
      b(d).ygk_simulasyon = true;
      d.kaptan.tecrube += 120;
      return { metin: 'Kulaklık takılıyor, dünya susuyor. Akustik körleme simülasyonu: sağdan bir plazma şarjı, soldan torpido basıncı; refleksin YGK yıllarını hatırlıyor. Kaptanlık tecrüben arttı: 120.', ses: 'el_kalkan' };
    case 'cirak':
      if (!b(d).ygkKayit) return { metin: 'Çırak: "Önce kabul masasına kendini bildir, Kaptan."', ses: 'red' };
      b(d).malken_ciraklari = true;
      d.koloni.nufus.toplam += 2;
      return { metin: 'İki Malken çırağı Aethelis-IV\'e gelmeye gönüllü oluyor. Dönüşte koloninin nüfusuna katılırlar; tarım alanında yataklara atanabilirler (aether aşılaması: erzaklar bir sefer fazla sürer).', ses: 'topla' };
    case 'muhur':
      if ((d.koloni.kaynaklar.aether || 0) < 2) return { metin: 'Mühürleri beslemek için iki aether kristali gerekir; Malazar\'ın ocaklarından.', ses: 'red' };
      d.koloni.kaynaklar.aether -= 2;
      b(d).malken_muhur = true;
      d.gemi.maxGovde += 40;
      d.gemi.govde += 40;
      return { metin: 'Ustalar geminin gövdesine kristal sinir ağıyla büyü mühürleri kazıyor. Gövde kalıcı olarak kırk puan güçlendi: ' + d.gemi.maxGovde + '.', ses: 'kaynak' };
    case 'kopyala':
      b(d).ygk_harita = true;
      b(d).g_haritalar = true;
      return { metin: 'Yirmi sektörün akustik haritaları seyir bilgisayarına aktarılıyor. Fenerleri daha uzaktan duyacaksın.', ses: 'sinyal' };
    case 'otur':
      b(d).ygk_kripto = true;
      kodeksEkle(d, 'malken_irki', 'Malken ırkı', 'İki metre on ile otuz arası, ince ama dayanıklı, süt beyazı tenli, yaşlanmayan insansılar. Karanlıkta parlayan ametist gözleri aether akımlarını ve kuantum iplikçiklerini çıplak görür. Büyü onlar için bir fizik disiplinidir; gemilerini kristal sinir ağlarıyla döşer, büyüyü teknolojinin çekirdeğine koyarlar.', 20);
      return { metin: 'Hücrenin sessizliğinde önce kendi kalbini, sonra altında akan bir uğultuyu duyuyorsun: aether. Malken öğrenciler bunu gözleriyle görür. Kodekse işlendi: Malken ırkı.', ses: 'sinyal' };
    case 'takas':
      b(d).ygk_biyodepo = true;
      if (!d.tarim) return { metin: 'Bekçi: "Önce kendi tarlan olsun, Kaptan."', ses: 'red' };
      for (const t of ['don_kiran', 'akifer', 'soya', 'noro_kahve', 'aloe']) d.tarim.tohumlar[t] = (d.tarim.tohumlar[t] || 0) + 2;
      return { metin: 'Depo bekçisi buzlu çekmeceleri açıyor: beş Eski Dünya ürününden ikişer tohum. Aethelis\'in tarım alanında ekebilirsin.', ses: 'topla' };
    case 'isle':
      if ((d.koloni.kaynaklar.aether || 0) < 1) return { metin: 'Potaya atacak aether kristali yok.', ses: 'red' };
      d.koloni.kaynaklar.aether -= 1;
      d.koloni.parcalar.zirhli_plaka = (d.koloni.parcalar.zirhli_plaka || 0) + 30;
      return { metin: 'Varek\'in ustaları kristali plazmayla eritip mühürle odaklıyor: otuz zırhlı plaka depoya.', ses: 'kaynak' };
    case 'dolas':
      return { metin: 'Axira\'nın yeşil ışığında yapraklar ılık; sulama kanalları şırıldıyor. ' + (nobet(d).yildiz === 'Axira' ? 'Şu an Yeşil Öğle: fotosentez zirvede, bitkiler neredeyse büyürken duyuluyor.' : 'Bahçıvan: "Yeşil Öğle nöbetinde gel; o vakit her şey daha hızlı büyür."'), ses: 'dugme' };
    case 'koloni': {
      const k = d.koloni;
      return { metin: 'Kuantum pilonu Aethelis-IV\'e bağlanıyor. Koloni bilgisayarı: nüfus ' + k.nufus.toplam + ', moral yüzde ' + Math.round(k.moral) + ', ' + k.binalar.length + ' tesis.' + (d.tarim ? ' Tarlada ' + [...d.tarim.yataklar, ...d.tarim.vaha].filter((y) => y.bitki).length + ' ekili yatak.' : ''), ses: 'sinyal' };
    }
    case 'dinle':
      return dinle(d, n);
    case 'yikan': {
      const gun = Math.floor(((d.zaman && d.zaman.sn) || 0) / 7200);
      if (b(d)['t_hamam_' + gun]) return { metin: 'Hamam bugünlük kapandı; yarın yine gel.', ses: 'red' };
      b(d)['t_hamam_' + gun] = true;
      for (const u of d.murettebat) u.stres = 0;
      return { metin: 'Sıcak, ışıldayan suyun içinde yerçekimi gevşiyor. Mürettebatın bütün stresi akıp gidiyor.', ses: 'tislama' };
    }
    case 'izle':
      return { metin: 'Kızakta yarım bir yıldız kadırgası: kristal sinir ağları kablo yerine döşeniyor, gövdeye mühürler kazınıyor. Fenrir\'in manyetik kaldırma gücü dev iskeleti sudan hafifçe yukarıda tutuyor.', ses: 'kaynak' };
    case 'topla': {
      const g = Math.floor(((d.zaman && d.zaman.sn) || 0) / 1200);
      if (b(d).t_toz === g) return { metin: 'Kova dolu; toz bu nöbet yeniden dalgalanacak.', ses: 'red' };
      b(d).t_toz = g;
      d.koloni.kaynaklar.foton_recinesi = (d.koloni.kaynaklar.foton_recinesi || 0) + 2;
      d.koloni.kaynaklar.isik_tozu = (d.koloni.kaynaklar.isik_tozu || 0) + 100;
      return { metin: 'Kova ışıldayan tozla doluyor; ellerinin arasında ılık bir parıltı. İki birim foton reçinesi ve yüz gram Fenrir ışık tozu: Tentran ve Arin\'de para yerine geçer, gramı elli lira.', ses: 'topla' };
    }
    case 'oku':
      kodeksEkle(d, 'cevre_krallik', 'Tonoflenya\'nın sınırları', 'Kuzeyde daimi kar fırtınalı dağlarda buz kuleli Donmuş Krallıklar (sibernetik alaşımlar, kriyojenik silahlar). Doğuda piramidal kaleli, güneş kuleli Çöl Krallıkları (altın, baharat, güneş enerjisi). Kuzeydoğu ucunda Kahergonat, Kara Şehir: volkanik bazalt, sürgün büyücüler, karaborsa, tarikatlar; mor ve yeşil dumanlar. Batıda ve güneyde okyanus ötesi özerk krallıklar.', 15);
      return { metin: 'Levha: kuzeyde Donmuş Krallıklar, doğuda Çöl Krallıkları, kuzeydoğu ucunda Kahergonat, batıda ve güneyde okyanus ötesi diyarlar. Kodekse işlendi.', ses: 'dugme' };
  }
  return { metin: '' };
}

function dinle(d, n) {
  if (n.tonEylem === 'arsiv') {
    const l = [
      ['arsiv_malazar', 'Malazar efsanesi', 'Birinci Çağ\'ın sonunda Malken\'ler Malazar Dağı\'nın mağaralarında ilk kez mor titreşen aether kristallerini ve havada uçuşan büyü tozunu buldu. İlkel büyü çağı kapandı; teknolojiyle büyünün birleştiği Altın Çağ başladı.'],
      ['arsiv_karagol', 'Kara Göl', 'Birinci Çağ\'ın başkenti kontrolsüz bir aether patlaması ve boyut yarığıyla yok oldu; geride dibi görünmeyen mor-siyah sularla kaplı bir krater kaldı. Gölün derinlerinde batık kuleler ve fısıltılı aether kalıntıları var.'],
      ['arsiv_ygk', 'YGK Akademi', 'Yüksek Gezginler ve Keşif Akademisi: kuzeybatı sahilinde seksen bin kişilik bir bilim, büyü ve askerî teknoloji metropolü. On bir katı var; altısı yeryüzünde, beşi yeraltında.'],
    ];
    const x = l.find((k) => !d.kodeks.some((y) => y.id === k[0])) || l[0];
    kodeksEkle(d, x[0], x[1], x[2], 10);
    if (x[0] === 'arsiv_karagol' && b(d).ygkKayit && !b(d).karaGolIzni) {
      b(d).karaGolIzni = true;
      return { metin: 'Küre fısıldıyor: ' + x[2] + ' Arşivci: "Bu kaydı dinleyen bir YGK kaptanına koruma mührü verilir." Kara Göl izni ve koruma mührü sende.', ses: 'sinyal' };
    }
    return { metin: 'Küre fısıldıyor: ' + x[2] + ' Kodekse işlendi.', ses: 'dugme' };
  }
  if (n.tonEylem === 'meydan') {
    const nb = nobet(d);
    return { metin: 'Halk ' + nb.ad + ' nöbetini konuşuyor: "' + nb.etki + '" Yaşlı bir kadın gökyüzünü gösteriyor: "Tonoflenya\'da gece yoktur yabancı; yalnız yıldızlar yer değiştirir."', ses: 'dugme' };
  }
  if (n.tonEylem === 'cekirdek') {
    kodeksEkle(d, 'tenohris', 'Tenohris Sarayı ve Aether Çekirdeği', 'Malkenia\'nın merkezinde bin beş yüz metre yükselen, köşesiz ve sütunsuz beyaz ametist ve plasteel saray; Yüksek Meclis ve Gezegenler Arası Egemenlik Makamı. Altındaki Aether Çekirdeği altı halkanın hepsine aether akıtır.', 15);
    return { metin: 'Kristale yaklaştıkça altı ayrı tonun tek bir akorda birleştiğini duyuyorsun; çekirdek halkaları besliyor. Kodekse işlendi.', ses: 'sinyal', akor: true };
  }
  if (n.tonEylem === 'batik') {
    kodeksEkle(d, 'batik_kule', 'Kara Göl\'ün batık kulesi', 'Birinci Çağ başkentinin sudan çıkan tek ucu. Taşın içinden hâlâ bir ses geliyor: aether kalıntılarının fısıltısı.', 20);
    return { metin: 'Kulenin taşına elini koyunca fısıltılar birleşiyor; anlamadığın, çok eski bir dilde biri bir isim tekrarlıyor. Kodekse işlendi.', ses: 'sinyal' };
  }
  return { metin: n.tarif };
}

// --- Malken'lerle konuşma ---
function konus(d, kim) {
  const g = b(d);
  if (kim === 'kabul') {
    if (!g.ygkKayit) {
      g.ygkKayit = true;
      d.itibar += 20;
      ZN.hazirla(d);
      d.para.ml += 300;
      d.para.gk += 100;
      return 'Görevli mor gözlerini kaldırıyor: "Kayıtlarımızda adın var, Kaptan; prototip keşif gemisiyle kat 5\'ten fırlatılmış, alt-uzay sıçramasında kaybolmuş. Evrensel Keşif ve Hayat Kurtarma Yemini hâlâ geçerli. Akademi senin evin: asansörle bütün katlara inebilirsin, yalnız eksi beş yasak. Arşivde Kara Göl kaydını dinlersen koruma mührü alırsın; Zirve İğnesi\'ni hizalarsan Malazar açılır. Kayık için Flee Plee iskelesine söyledim. Şehir güneyde: Zhaor halkasından içeri altı halka, merkezde Tenohris." Masaya bir kese ve bir veri kartı bırakıyor: üç yüz Malken Lirası harçlık, yüz Galaktik Keşif Kredisi. "Subay kurulu bu meydanda; gemin için kadro ister misin, onlara sor. Derin uzay verilerini ikinci kattaki veri masası satın alır."';
    }
    return 'Görevli: "Asansör iskelenin yanında, Kaptan. Malkenia güney kapıdan; Malazar kuzey sahil kapısından. Yıldızlar seninle."';
  }
  if (kim === 'lonca') {
    return 'İhtiyar: "Biz Elyndra\'nın çocuklarıyız; mor yıldızın aetheri gözlerimizde. Büyü bizde hurafe değil, fiziktir: atomun bağını esnetir, yerçekimini bükeriz. Teknolojiyi büyüyle değiştirmedik; büyüyü onun kalbine koyduk." Bir an susuyor. "Şimdi ' + nobet(d).ad + '. ' + nobet(d).etki + '"';
  }
  if (kim === 'meclis') {
    return 'Meclis\'in sözcüsü: "Gezegenler Arası Egemenlik Makamı seni tanıyor, Aethelis\'in kaptanı. Kurtardığın ırklar, kurduğun kule, ördüğün kalkan: hepsi Akademinin yemininin uzantısı. Meclis bunu unutmaz." Sözcünün sesinde bir gölge var: "Yıldızlar eski huzurunda değil. Vakti gelince seni çağıracağız."';
  }
  if (kim === 'iskele') {
    if (!g.ygkKayit) return 'Görevli: "Kayıklar yalnız Akademinin kayıtlı kaptanlarına, yabancı. Önce YGK\'ye bildir."';
    if (!g.aetherKayigi) {
      g.aetherKayigi = true;
      return 'Görevli kristal bir anahtar uzatıyor: "Akademi haber verdi, Kaptan. Rezonans kayığı senin. Metal bir tekne bu denizde batar; bunun kalkanı tozun üstünde süzülür. Kaldırma kristallerini sonuna kadar açarsan Arin\'e bile yükselir. Güneyde Veradon."';
    }
    return 'Görevli: "Kayığın iskelede. Geceleri deniz mavi ve mor parlar; o vakit en güzelidir."';
  }
  if (kim === 'kesis') {
    if (!g.arinDersi) {
      g.arinDersi = true;
      d.kaptan.tecrube += 80;
      kodeksEkle(d, 'arin', 'Uçan Arin Adası', 'Fenrir Denizi\'nin en ıssız ortasında, suyun onlarca metre üstünde asılı, ters-yerçekimi kristalleriyle dolu kaya ve orman; Malken keşişlerinin ve büyü üstatlarının inziva tapınakları. Yalnız aetherik uçan araçlarla ya da rüzgâr büyüsüyle ulaşılır.', 20);
      return 'Keşiş gözlerini açmadan konuşuyor: "Kulaklarınla görüyorsun, yabancı; bu bizim gözlerimizle gördüğümüzden az değil. Rüzgârı dinle: her yıldızın kendi rüzgârı var." Uzun bir sessizlik; sonra çanlar. Kaptanlık tecrüben arttı; kodekse işlendi.';
    }
    return 'Keşiş: "Rüzgâr bugün ' + nobet(d).yildiz + '\'nın rüzgârı."';
  }
  if (kim === 'gumruk') {
    kodeksEkle(d, 'veradon', 'Veradon', 'Fenrir Denizi\'nin güney kıyısında, Malken egemenliğinin bittiği son resmî sınır kasabası: taş rıhtımlar, gümrük kuleleri, hanlar. Ötesinde güney kıtasının bağımsız ve bazen tekinsiz krallıkları.', 10);
    return 'Gümrük memuru: "Buradan ötesi Malken toprağı değil, Kaptan. Güney kıtasının krallıklarına giden kervanlar buradan kalkar; yolları her zaman dost değildir. Handa bir şeyler iç, hikâyeleri dinle."';
  }
  return '';
}

// Hiper-sıçrama sonrası Tonoflenya'dayken nöbet notu
export function tonoflenyaMi(d) {
  return !!(T_MEKANLAR[d.mekan]);
}
export { NOBETLER };
