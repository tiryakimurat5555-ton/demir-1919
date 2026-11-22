// Aşama 3 bölüm 2: on sekiz keşif gezegeninin (03-20) hikâyeleri (belgeler/v4/gezegen-03 … gezegen-20-*-hikayesi.txt,
// asama-3 gezegen matrisi, gorev-ve-hikaye-harmanlama 2.2). Saf veri; hikaye.js motoruyla oynanır.
//
//   Her gezegen: gezegen keşif operasyonu (numune) bitince yörüngedeyken o gezegenin karakterinden telsiz çağrısı gelir.
//   Aşama 1 sesli bulmaca ve ilk karar, Aşama 2 evrensel savaş (doğru eşyayla kısalır ya da atlanır) ve büyük karar,
//   Aşama 3 kalıcı son (d.bayrak.gz_<pid> 'iyi' | 'kotu' ya da yol harfi) ve atıl kalmama: belgedeki Yıldız Nöbeti'nde
//   gezegene yeniden kenetlenince hasat (gezegenHasat, gorevler.kenetlen).
//   Çapraz bağlar: Thalassa mührü → Mycelia; Mycelia sporu → Miasma; Sol-Kharra merceği → Lithos; Lithos anahtarı →
//   Necron; Necron şifresi → Automata; Ferros matkabı → Carbonis; Zephyr akustik haritası → Fulgur ve Aero-Flora.
//   Kalıcı kazanımlar savaş ve seyir kodunun okuduğu bayraklarla (bazıları mevcut eşya kimlikleri: sahip() bayrağı da sayar).
import { hikayeEkle, secimi } from './hikaye';
import { GEZEGENLER } from './veri/gozlem';
import { PARCALAR, TARIFLER } from './veri/uretim';
import { nobet, nobetNo } from './zaman';
import * as ZN from './tonoflenya/zanaat';
import { gucEkle } from './tonoflenya/kisiler';

const A = (tur, ad, giris, bitis, ek) => ({ tur, ad, giris, bitis, ...(ek || {}) });
const opBitti = (d, id) => (d.tamamlananOp || []).includes(id);
const b = (d) => d.bayrak;
const p = (d, k) => (d.koloni.parcalar[k] || 0) + ((d.esya && d.esya[k]) || 0);
const moral = (d, x) => (d.koloni.moral = Math.max(0, Math.min(100, d.koloni.moral + x)));
const S = (dusmanlar, adlar, ortam = 'kara', tier = 3, ek = {}) => ({ dusmanlar, adlar, ortam, tier, gelis: dusmanlar.length > 1 ? 'kiskac' : 'tek', ...ek });

// Gezegenlerden gelen yeni malzemeler; her birinin işe yaradığı bir tarif var (item-deger-garantisi kuralı)
const MALZEMELER = {
  hidro_camur: ['hidro-termal mineral çamuru', 'Thalassa\'nın kara bacalarından; biyo-kubbede antikor ve panzehire işlenir.'],
  miselyum_sporu: ['ana miselyum sporu', 'Mycelia\'nın kovanından; Miasma-9\'un asit krizinde doğal panzehir anahtarı.'],
  sol_mercek: ['işlenmiş Sol-Kharra merceği', 'Yeşil camdan; Lithos-Echo\'nun ses-ışık bulmacasını kendiliğinden hizalar.'],
  filtra_damgasi: ['Filtra çekiç damgası', 'Brom\'un damgası; Batı Kuşağı\'nda güven kapısı açar.'],
  helyum3: ['sıvı helyum-3 tüpü', 'Zephyr-Major\'dan; reaktör laboratuvarında yüksek verimli itki yakıtına dönüşür.'],
  elmas: ['elmas kristali', 'Dökümhanede saf kristale kesilir.'],
  yanki_anahtari: ['kadim yankı anahtarı', 'Lirael\'in ses şifresi; Necron-Sıfır\'ın akustik kapısını ilk denemede açar.'],
  mor_kristal: ['saf mor harmonik kristal', 'Lithos-Echo monolitinden; dökümhanede saf kristale işlenir.'],
  otomat_sifresi: ['otomat kontrol şifresi', 'Kael-Or\'un çözdüğü şifre; Automata-Enkaz\'ın kapısını ve savunmasını açar.'],
  nadir_termal: ['nadir termal mineral', 'Janus-Split\'ten; dökümhanede zırhlı plakaya katılır.'],
  fulgurit: ['fulgurit tüpü', 'Fulgur-3\'ün yıldırım camı; reaktör laboratuvarında yüksek voltaj kablosuna dönüşür.'],
  kalsiyum_ksenon: ['kalsiyum-ksenon bileşiği', 'Miasma-9\'un fosillerinden; biyo-kubbede asit ilacına işlenir.'],
  kseno_bakteri: ['kseno-bakteri kolonisi', 'Umbra-Kayıp\'ın sıcak bacalarından; biyo-kubbede ilaca işlenir.'],
  fosfor_liken: ['fosforlu damar likeni', 'Kendi ışığını üreten liken; biyo-kubbede sakinleştiriciye işlenir.'],
  manyetik_platin: ['saf manyetik platin', 'Fractura\'dan; dökümhanede plakaya dökülür.'],
  dogal_izotop: ['zengin doğal izotop', 'Radion-Kızıl\'ın kraterinden; reaktör laboratuvarında bol yakıt verir.'],
  kuantum_cip: ['sağlam kuantum çipi', 'Automata-Enkaz\'dan; kuantum laboratuvarında mikroçipe çoğaltılır.'],
  takyon: ['takyon partikülü', 'Chronos-Döngü\'den; reaktör laboratuvarında sıçrama yakıtına dönüşür.'],
  zaman_tozu: ['zaman tozu meyvesi', 'Hızlı zaman çemberinden; biyo-kubbede sakinleştirici iksire işlenir.'],
  gunes_plazmasi: ['yoğun güneş plazması', 'Corona-Lux\'tan; en üst seviye yakıt.'],
};
for (const k of Object.keys(MALZEMELER)) if (!PARCALAR[k]) PARCALAR[k] = { ad: MALZEMELER[k][0], tarif: MALZEMELER[k][1] };
const tarif = (tesis, id, ad, girdi, cikti, sure = 60) => {
  if (!TARIFLER[tesis]) TARIFLER[tesis] = [];
  TARIFLER[tesis].push({ id, ad, girdi, cikti, sure });
};
tarif('reaktor_lab', 'g_helyum3', '40 litre helyum-3 yakıtı', { helyum3: 1 }, { itki_yakiti: 40 });
tarif('reaktor_lab', 'g_takyon', '60 litre takyon sıçrama yakıtı', { takyon: 1 }, { itki_yakiti: 60 });
tarif('reaktor_lab', 'g_plazma', '80 litre güneş plazması yakıtı', { gunes_plazmasi: 1 }, { itki_yakiti: 80 });
tarif('reaktor_lab', 'g_izotop', '50 litre doğal izotop yakıtı', { dogal_izotop: 1 }, { itki_yakiti: 50 });
tarif('reaktor_lab', 'g_fulgurit', '40 yüksek voltaj kablosu (fulgurit)', { fulgurit: 1 }, { kablo: 40 });
tarif('dokumhane', 'g_elmas', '6 saf kristal (elmas kesimi)', { elmas: 1 }, { saf_kristal: 6 });
tarif('dokumhane', 'g_mor', '4 saf kristal (mor harmonik)', { mor_kristal: 1 }, { saf_kristal: 4 });
tarif('dokumhane', 'g_platin', '60 plaka (manyetik platin)', { manyetik_platin: 2 }, { plaka: 60 });
tarif('dokumhane', 'g_termal', '30 zırhlı plaka (termal mineral)', { nadir_termal: 1 }, { zirhli_plaka: 30 });
tarif('biyo_kubbe', 'g_camur', '10 doz sakinleştirici (hidro-termal çamur)', { hidro_camur: 1 }, { yatistirici: 10 });
tarif('biyo_kubbe', 'g_kalsiyum', '10 doz asit ilacı (kalsiyum-ksenon)', { kalsiyum_ksenon: 1 }, { yatistirici: 10 });
tarif('biyo_kubbe', 'g_bakteri', '10 doz sakinleştirici (kseno-bakteri)', { kseno_bakteri: 2 }, { yatistirici: 10 });
tarif('biyo_kubbe', 'g_liken', '8 doz sakinleştirici (fosforlu liken)', { fosfor_liken: 2 }, { yatistirici: 8 });
tarif('biyo_kubbe', 'g_zaman', '12 doz zaman tozu iksiri', { zaman_tozu: 1 }, { yatistirici: 12 });
tarif('dokumhane', 'g_cip', '20 mikroçip (kuantum çipinden)', { kuantum_cip: 1 }, { mikrocip: 20 });

// Ödül verme: hammadde, parça, eşya; itibar; GK; bilim puanı
export function ver(d, o) {
  for (const k of Object.keys(o)) {
    const n = o[k];
    if (k === 'itibar') d.itibar += n;
    else if (k === 'gk') {
      ZN.hazirla(d);
      d.para.gk += n;
    } else if (k === 'bilim') {
      if (!d.yan) d.yan = { aktif: null, biten: [], karar: {}, itibar: {}, bilim: 0, ozel: [] };
      d.yan.bilim = (d.yan.bilim || 0) + n;
    } else if (k === 'moral') moral(d, n);
    else {
      const once = ZN.miktar(d, k);
      ZN.ekle(d, k, n);
      if (ZN.miktar(d, k) === once) d.koloni.parcalar[k] = (d.koloni.parcalar[k] || 0) + n;
    }
  }
}

// Atıl kalmama: gezegenin nöbeti ve hasadı (iyi / kötü son ya da yol)
export const NOBET_HASADI = {};
const SON = {};
function G(pid, o) {
  const id = 'gz_' + pid;
  NOBET_HASADI[pid] = o.hasat;
  SON[pid] = o.sonAdi;
  hikayeEkle(id, {
    grup: 'gezegen',
    uzayda: true,
    kod: GEZEGENLER[pid].ad,
    ad: o.ad,
    veren: o.veren,
    ortam: 'ortam_gez_' + pid,
    tetik: (d) => opBitti(d, pid) && (!o.tetik || o.tetik(d)),
    giris: (d) => [...(o.numune ? ['Numuneyi isteyen: ' + o.numune + '.'] : []), ...(typeof o.giris === 'function' ? o.giris(d) : o.giris)],
    hazirlik: o.hazirlik,
    adimlar: o.adimlar,
    kararSoru: o.kararSoru,
    kararlar: o.kararlar,
    odul: o.odul,
    bitince: (d, i) => {
      b(d)[id] = o.son ? o.son(d, i) : i === 0 ? 'iyi' : 'kotu';
      galaktikKasif(d);
    },
  });
}
// Yirmi gezegenin hepsi keşfedilip numuneleri akademide birleşince: Galaktik Kâşif
function galaktikKasif(d) {
  const hepsi = Object.keys(GEZEGENLER).every((x) => opBitti(d, x));
  if (hepsi && (d.koloni.binalar || []).includes('akademi') && !b(d).galaktikKasif) {
    b(d).galaktikKasif = true;
    d.itibar += 1000;
  }
}
export function gezegenHasat(d, pid) {
  const h = NOBET_HASADI[pid];
  const son = b(d)['gz_' + pid];
  if (!h || !son) return null;
  const x = h[son] || h.her;
  if (!x) return null;
  const y = nobet(d).yildiz;
  if (x.nobet && !x.nobet.includes(y)) return { metin: GEZEGENLER[pid].ad + ': hasat penceresi ' + x.nobet.join(' ya da ') + ' nöbetinde.' };
  const no = nobetNo(d);
  if (b(d)['hasat_' + pid] === no) return { metin: GEZEGENLER[pid].ad + ': bu nöbetin hasadı alındı.' };
  b(d)['hasat_' + pid] = no;
  ver(d, x.odul);
  if (x.yap) x.yap(d);
  return { metin: GEZEGENLER[pid].ad + ' hasadı: ' + x.metin, ses: 'sinyal' };
}

// --- 03 Thalassa-Derinlik ---
G('p03', {
  ad: 'Derinlerin Mührü ve Siren-0', veren: 'Dr. Nerissa Tide (YGK Biyo-Akustik)', numune: 'Dr. Axira ve Dr. Selin',
  giris: [
    'Kabin dışını derin, rahatlatıcı bir sualtı bas uğultusu sarıyor; yüzeydeki planktonların harmonik çan tınısı. Harmoninin altından kesik kesik bir YGK acil feneri.',
    'Dr. Nerissa, boğuk ve basınçlı bir mikrofondan: "Kapsülüm dört bin metrede, kara bacaların dibine sıkıştı! Yukarıdaki yüzen yosun adaları sıradan bitki değil, zehirli abis akıntısını tutan canlı bir mühür! Korsan toplayıcılar o jeli kesiyor. Mühür yırtılırsa bu okyanusun zehri komşu sistemlere taşacak!"',
  ],
  hazirlik: 'Derin dalış sondası hazır. Biyo-karantina ya da nötralizasyon kulesi avantaj sağlar.',
  adimlar: [
    { op: [A('frekans', 'Plankton harmonisi', 'Yosun adalarının altındaki yarığı bul: parmağını yukarı aşağı gezdir; tını en yoğunken çift dokun.', 'Doğal bir yarık açıldı.', { cift: true })] },
    { karar: [
      { etiket: 'Mühre dokunmadan dar yarıktan sız, toplayıcı dronları durdur', sonuc: 'Mühür sağlam; Nerissa güveniyor, Vaelin itibarı arttı.', yap: (d) => { d.itibar += 15; } },
      { etiket: 'Yosunu termal kesiciyle yar, bacalardan hızlı çek', sonuc: 'Yüz elli titanyum, seksen kseno-alaşım ve hidro-termal çamur; ama mühür çatladı, zehir uzaya sızdı.', yap: (d) => { ver(d, { titanyum: 150, kseno_alasim: 80, hidro_camur: 2 }); b(d).thalassaKirik = true; } },
    ], soru: 'Mühre nasıl yaklaşacaksın?' },
    { op: [A('basinc', 'Dört bin metrede basınç', 'Sonda iniyor; basınç alarmı çaldığında tam eşikte çift dokun: denge valflerini aç. Üç kez.', 'Siren-0 enkazı önünde.')] },
    { savas: S(['biyom_yaratigi', 'biyom_yaratigi', 'biyom_yaratigi'], ['abisal baca muhafızı', 'biyo-ışıldayan parazit sürüsü', 'biyo-ışıldayan parazit sürüsü']), bitis: 'Muhafız karanlığa çekildi; kapsülün kapağı açık.' },
  ],
  kararSoru: 'Kapsülün çekirdeğinde iki şey var: mühürlü abis veri çekirdeği ve kararsız bir saf aether biyo-reaktörü. Sökersen kapsül patlar.',
  kararlar: [
    { etiket: 'Nerissa\'yı ve abis veri çekirdeğini kurtar, reaktörü bırak', sonuc: 'Dr. Nerissa Aethelis\'e katıldı: kalıcı antikor sentezi (maruziyet ve zehir direnci). Abis veri çekirdeği Cahelon\'un su altı konumunu gösterecek; YGK 5. kat itibarı +25.', yap: (d) => { ver(d, { itibar: 700 }); b(d).g_panzehir = true; b(d).abisVeri = true; b(d).nerissa = true; gucEkle(d, 'ygk', 25); } },
    { etiket: 'Reaktördeki saf aetheri zorla sök', sonuc: 'Üç saf aether, iki kuantum çipi ve kırk sekiz GK değerinde enkaz. Nerissa kırgın, YGK\'ya kaçtı; YGK itibarı -25.', yap: (d) => { ver(d, { itibar: 700, saf_aether: 3, kuantum_cip: 2, gk: 48 }); gucEkle(d, 'ygk', -25); } },
  ],
  son: (d, i) => (i === 0 && !b(d).thalassaKirik ? 'iyi' : 'kotu'),
  hasat: { iyi: { nobet: ['Sinha'], odul: { hidro_camur: 2 }, metin: 'akıntılar durgun; iki hidro-termal çamur.' }, kotu: { nobet: ['Sinha'], odul: { kseno_spor: 2, bilim: 50 }, metin: 'toksik abisten mutasyonlu kseno-dokular.' } },
});

// --- 04 Mycelia-IV ---
G('p04', {
  ad: 'Nefes Alan Kovan ve Miselyum Ağı', veren: 'Botanikçi Mara', numune: 'Dr. Axira ve Dr. Selin',
  giris: (d) => [
    b(d).thalassaKirik ? 'Havada boğucu bir asit tıslaması: Thalassa\'dan sızan abisal toksin vadiye çökmüş.' : 'Orman berrak, armonik seslerle nefes alıp veriyor; Thalassa\'nın mührü sağlam.',
    'Mara, nefes nefese: "Kaptan! Bu orman tek bir devasa zihin gibi tepki veriyor! Korsan madenci artıkları Kovan Mantarı\'nın köklerine plazma sondaları saplamış. Ana kökü yakarlarsa tarımımızı kurtaracak enzimler de yok olacak!"',
  ],
  hazirlik: 'Yüzen hava filtreli rover hazır. Biyo-karantina ve sonik kovucu avantaj sağlar.',
  adimlar: [
    { op: [A('refleks', 'Ormanın nefesi', 'Orman nefes verirken ilerle: nefes sesi duyulur duyulmaz tek dokun. Üç kez.', 'Kovanın dibine vardın.', { n: 3 })] },
    { karar: [
      { etiket: 'Sporlara zarar vermeden rover\'la sessizce sız', sonuc: 'Mara güveniyor; kovanın iç tünelleri dostça açıldı.' },
      { etiket: 'Yosunu yakarak hızlı yol aç', sonuc: 'Kovan bunu saldırı saydı; içeride fazladan bir dev spor sürüsü uyandı.' },
    ], soru: 'Kovana nasıl gireceksin?' },
    {
      savas: (d) => {
        const uyut = p(d, 'sonik_kovucu') >= 2 || ZN.kusanildiMi(d, 'sonik_tufek');
        const n = uyut ? 0 : secimi(d, 'gz_p04', 1) === 1 ? 3 : 2;
        return S(['kadim_otomat', ...Array(n).fill('biyom_yaratigi')], ['korsan maden sondaj ekibi', ...Array(n).fill('dev spor sürüsü')], 'kara', 3, { cevre: b(d).thalassaKirik && p(d, 'biyo_karantina') < 1 ? 'asit' : null, giris: uyut ? 'Sonik kovucu spor sürülerini uyuttu; yalnız korsan sondaj ekibi kaldı.' : '' });
      },
      bitis: 'Korsan sondaları söküldü; Ana Miselyum Çekirdeği açığa çıktı.',
    },
  ],
  kararSoru: 'Ana Miselyum Çekirdeği önünde.',
  kararlar: [
    { etiket: 'Çekirdeği iyileştir, yalnız doğal spor hasadı al', sonuc: 'Kovan seni koruyucu saydı: tarım teraslarında kalıcı enzim verimi; ana miselyum sporu (Miasma-9\'un panzehir anahtarı). YGK 5. kat itibarı +25.', yap: (d) => { ver(d, { itibar: 650, miselyum_sporu: 1 }); b(d).gz_enzim = true; gucEkle(d, 'ygk', 25); } },
    { etiket: 'Çekirdeği aşırı uyarıp bütün özü tek seferde sömür', sonuc: 'Elli kseno-spor, yirmi foton reçinesi, on beş sakinleştirici, bin beş yüz bilim puanı. Kovan kurudu; YGK 5. kat itibarı -25.', yap: (d) => { ver(d, { itibar: 650, kseno_spor: 50, foton_recinesi: 20, yatistirici: 15, bilim: 1500 }); gucEkle(d, 'ygk', -25); } },
  ],
  hasat: { iyi: { nobet: ['Axira'], odul: { kseno_spor: 3, foton_recinesi: 2, yatistirici: 5 }, metin: 'spor keseleri olgun.' }, kotu: { odul: { kseno_kabuk: 2, bazalt: 4 }, metin: 'taşlaşmış gövdeden kabuk ve bazalt.' } },
});

// --- 05 Sol-Kharra ---
G('p05', {
  ad: 'Kırılan Mercekler ve Çölün Şarkısı', veren: 'Kaptan Daro ve Haris (Kum-Yelkeni 4)', numune: 'Aras ve Başçavuş Drahmir',
  giris: [
    'Kabini zımparalayan kum fırtınasının tiz cızırtısı; kumullar rüzgârda org gibi ötüyor.',
    'Daro, çatlamış bir sesle: "Haris, dur! O kumulun altını patlatırsan cam duvar sığınağımızın üstüne çökecek!" Haris: "Sizinle bu fırında ölmeyeceğim Daro! Bu yeşil damar beni tek seferde zengin eder."',
  ],
  hazirlik: 'Manyetik süspansiyonlu rover ya da Çöl Tilkisi. Termal giysi ve vaha şurubu avantaj sağlar.',
  adimlar: [
    { op: [A('sonar', 'Kumulların armonisi', 'Radar fırtınada kör: basılı tut, kumulların ötüşünü lidarla tara.', 'Gölgeli geçidin sessiz koridoru bulundu.')] },
    { karar: [
      { etiket: 'Önce Daro\'nun sığınağına su ve soğutma götür', sonuc: 'Daro ve dört kişilik ekibi kurtuldu; moral +10. Daro gölge rotasını paylaştı: kraterde ısı hasarı yok.', yap: (d) => { moral(d, 10); } },
      { etiket: 'Doğrudan Haris\'in kazı alanına bas', sonuc: 'Haris patlamadan önce yakalandı: kırk silikat kristali. Daro\'nun sığınağı kısmen hasar gördü; kırgın.', yap: (d) => { ver(d, { kristal: 40 }); } },
    ], soru: 'Kimi önceleyeceksin?' },
    { savas: (d) => S(['kristal_akrep', 'kristal_akrep', 'kadim_otomat'], ['cam çölü akrebi', 'cam çölü akrebi', 'hurda lazer kulesi'], 'kara', 3, { cevre: secimi(d, 'gz_p05', 1) === 1 && !ZN.kusanildiMi(d, 'termal_giysi') ? 'isi' : null }), bitis: 'Haris yeşil cam damarının ortasında köşeye sıkıştı.' },
  ],
  kararSoru: 'Yeşil cam damarı önünde Haris\'le yüzleşme.',
  kararlar: [
    { etiket: 'Haris\'i durdur, damarı Daro\'yla kontrollü işlemeye aç', sonuc: 'Kırılmaz optik cam teknolojisi: uzay savaşlarında kokpit ve sensör hasarı azalır. Daro işlenmiş Sol-Kharra merceği verdi.', yap: (d) => { ver(d, { itibar: 500, sol_mercek: 1 }); b(d).gz_optik = true; } },
    { etiket: 'Haris\'le anlaş, damarı köküne kadar sök', sonuc: 'Yüz yirmi kristal, seksen plazma camı, altı yüz GK değerinde kargo. Krater çatladı; Daro ekibi ayrıldı.', yap: (d) => { ver(d, { itibar: 500, kristal: 120, plazma_cami: 80, gk: 600 }); } },
  ],
  hasat: { iyi: { nobet: ['Varek'], odul: { kristal: 6 }, metin: 'taze saf silikat cam kristali.' }, kotu: { odul: { piezo: 3, titanyum: 3 }, metin: 'enkazdan hurda metal ve piezo.' } },
});

// --- 06 Ferros-Omega ---
G('p06', {
  ad: '3,5G Altındaki Demirci ve Cıva Kanyonu', veren: 'Usta demirci Brom (Filtra) ve Kaelith madenci Korgath', numune: 'Torvok',
  giris: [
    'Kabini inleten ağır 3,5G bas uğultusu; demir tozu bulutlarının elektrikli çıtırtısı, jiroskop sapma sinyali.',
    'Brom, körük gibi hırıltılı bir sesle: "Manyetit kulelerinin üstünden dikine inersen 3,5G seni yere yapıştırır! Ben Filtra\'dan Brom. Çırağım Korgath\'ın bacağı kırık. Hurda korsanları cıva kanyonundaki nötron-demir külçelerimize çöküyor!"',
  ],
  hazirlik: 'Ağır hidrolik ekskavatör ya da Mammoth. Sismik dengeleyici ve topraklama çubuğu avantaj sağlar.',
  adimlar: [
    { op: [A('denge', 'Manyetik iniş koridoru', 'Pusula kilitli; iki tonu sürükleyerek merkezde birleştir: çıtırtının azaldığı koridor.', 'Güvenle indin.', { eksen: 'yatay' })], atla: (d) => p(d, 'topraklama_cubugu') > 0, atlaMetni: 'Topraklama çubuğu jiroskop kilidini önledi; iniş kendiliğinden düzgün.' },
    { karar: [
      { etiket: 'Kulelerin etrafından dolanıp Brom ve Korgath\'a destek indir', sonuc: 'Sismik denge bozulmadı; Brom ve Kaelith güveni arttı.' },
      { etiket: 'Manyetit kulesinin güç düğümünü patlat', sonuc: 'Kırk titanyum toplandı; ama sarsıntı kanyonu taşırmak üzere.', yap: (d) => ver(d, { titanyum: 40 }) },
    ], soru: 'Nasıl ilerleyeceksin?' },
    { savas: (d) => S(['yagmaci_lideri', 'kadim_otomat'], ['ağır maden korsanı', 'Ferros manyetik otomatı'], 'kara', 3, { cevre: secimi(d, 'gz_p06', 1) === 1 && p(d, 'sismik_dengeleyici') < 1 ? 'sarsinti' : null }), bitis: 'Korsanlar püskürtüldü; Filtra cıva-alaşım şemaları ve nötron-yoğun demir külçesi.' },
  ],
  kararSoru: 'Brom\'un şemaları ve kanyon damarı.',
  kararlar: [
    { etiket: 'Brom ve Korgath\'ı Aethelis\'e al, damarı düzenli üretime aç', sonuc: 'Süper-ağır gövde plakası teknolojisi; Brom dökümhanede ustabaşı yardımcısı (metal yüzde on ucuz). Carbonis-V matkap formülü ve Filtra çekiç damgası (Batı itibarı +10).', yap: (d) => { ver(d, { itibar: 800, filtra_damgasi: 1 }); b(d).gz_brom = true; b(d).ferrosMatkap = true; gucEkle(d, 'bati', 10); } },
    { etiket: 'Şemayı zorla al, bütün nötron cevherini tek seferde sök', sonuc: 'Beş nötron cevheri, üç yüz şasi çeliği. Cıva taştı; Brom Tonoflenya\'ya kaçtı: Batı itibarı -20.', yap: (d) => { ver(d, { itibar: 800, notron_cevher: 5, sasi_celigi: 300 }); gucEkle(d, 'bati', -20); } },
  ],
  hasat: { iyi: { nobet: ['Varek'], odul: { notron_cevher: 1, civa_tortusu: 2 }, metin: 'manyetik akıntılar dengede.' }, kotu: { odul: { civa_tortusu: 1 }, metin: 'zehirli buhar arasında biraz cıva.' } },
});

// --- 07 Zephyr-Major ---
G('p07', {
  ad: 'Siklon Gözündeki İstasyon ve Elmas Yağmuru', veren: 'Kaptan Vess (Bulut-9) ve Kithron gözlemci Tiz-Kanat', numune: 'Zhaor ve Sinha',
  giris: [
    'Sekiz yüz kilometrelik amonyak fırtınasının kükremesi; siklon gözünün duvarı aşılınca bıçak gibi bir sessizlik ve uzakta dikey iyon şimşekleri.',
    'Vess: "Ben Bulut-9\'dan Kaptan Vess. Denge balonlarımızdan ikisi delindi, elmas yağmuru katmanına düşüyoruz. Tepemizde o melodik sesli yabancı gemi bekliyor; tahliye kapsüllerimizi fırlattırmıyor!"',
  ],
  hazirlik: 'Yüksek irtifa mekiği ya da Atmosphere-X. Topraklama çubuğu dikey şimşeği emer.',
  adimlar: [
    { karar: [
      { etiket: 'Firkateyni püskürtürken denge balonlarını onar', sonuc: 'Şimşek uyarılarına dikkat: istasyon havada kalacak.' },
      { etiket: 'Bütün güçle firkateyni patlat, Vess\'i tahliye et', sonuc: 'Kolay savaş; seksen kseno-alaşım ve kırk piezo. Bulut-9 elmas katmanına düştü.', yap: (d) => ver(d, { kseno_alasim: 80, piezo: 40 }) },
    ], soru: 'İstasyon mu, hızlı çatışma mı?' },
    { savas: (d) => S(['yabanci_firkateyn'], ['tanımsız yabancı firkateyn'], 'uzay', 3, { cevre: secimi(d, 'gz_p07', 0) === 0 && p(d, 'topraklama_cubugu') < 1 ? 'iyon_firtinasi' : null }), bitis: 'Firkateyn çekildi; elmas yağmuru katmanına dalış.' },
    { savas: (d) => S(['korsan_avci', 'korsan_avci'], ['Alt-Evren hava yaratığı', 'Alt-Evren hava yaratığı'], 'uzay', 3, { cevre: secimi(d, 'gz_p07', 0) === 1 ? 'iyon_firtinasi' : null }), bitis: 'Yaratıklar dağıldı; kepçe uzanıyor.' },
  ],
  kararSoru: 'Tiz-Kanat: "Kepçeyi zorlarsan katman zincirleme patlar."',
  kararlar: [
    { etiket: 'Tiz-Kanat\'ın akustik kepçesiyle katmanı bozmadan helyum-3 çek', sonuc: 'Verimli helyum-3 yakıt teknolojisi: derin uzayda yakıt tüketimi kalıcı yüzde on beş az. Tiz-Kanat iyon-hava akustik haritasını verdi (Fulgur-3 ve Aero-Flora).', yap: (d) => { ver(d, { itibar: 750, helyum3: 2 }); b(d).gz_helyum = true; b(d).iyonHarita = true; } },
    { etiket: 'Kepçeyi sonuna kadar zorla', sonuc: 'Yüz elli helyum, yüz litre yakıt, sekiz yüz GK değerinde ham elmas. Vess ve Tiz-Kanat öfkeyle ayrıldı.', yap: (d) => { ver(d, { itibar: 750, helyum: 150, itki_yakiti: 100, gk: 800 }); } },
  ],
  son: (d, i) => (i === 0 && secimi(d, 'gz_p07', 0) === 0 ? 'iyi' : 'kotu'),
  hasat: { iyi: { nobet: ['Zhaor'], odul: { helyum3: 2, elmas: 1, itki_yakiti: 20 }, metin: 'siklon gözü sakin.' }, kotu: { odul: { elmas: 1 }, metin: 'fırtınaya dalış; ham elmas.' } },
});

// --- 08 Lithos-Echo ---
G('p08', {
  ad: 'Çan Kulesinin Yankısı ve Mor Monolitler', veren: 'Akustik keşiş Lirael-9', numune: 'Sinha Mar-Zul',
  giris: [
    'Ayaklarının altında çıngıraklı kristal yüzey çınlıyor; rüzgâr estikçe her yönden org ve çan melodileri.',
    'Lirael, müzik tonunda: "Sessiz ol yabancı... Amfitiyatroda yüksek ses çıkarırsan yankı bin kat büyür. Aşağıdaki Monolit Ormanı\'nda korsanlar mor kristalleri kesiyor. Köklerini patlatırlarsa bu gezegenin şarkısı sonsuza dek susacak!"',
  ],
  hazirlik: 'Akustik denge roverı ya da Çöl Tilkisi. Sonik kovucu avantaj sağlar.',
  adimlar: [
    { op: [A('ton', 'Amfitiyatronun akordu', 'Dört notalı sonik darbe. Basılı tut: tonları dinle. Sonra sırayla: kalın aşağı kaydır, tiz yukarı kaydır, orta çift dokun.', 'Amfitiyatro akortlu.', { n: 4 })], atla: (d) => p(d, 'sol_mercek') > 0, atlaMetni: 'Sol-Kharra merceği ses-ışık odağını kendiliğinden hizaladı.' },
    { karar: [
      { etiket: 'Amfitiyatrodan korsanlara odaklanmış ses dalgası gönder', sonuc: 'Korsanların telsizi ve sensörleri bozuldu; sersem yakalanacaklar.' },
      { etiket: 'Monolit Ormanı\'na gizlice sız', sonuc: 'Yolda otuz piezo saf kristal kasası; ama düşman tam güçle bekliyor.', yap: (d) => ver(d, { piezo: 30 }) },
    ], soru: 'Akustik tuzak mı, sessiz baskın mı?' },
    { savas: (d) => S(['yagmaci_oncusu', 'vanguard_otomati'], ['korsan sinyal avcısı', 'kristal rezonans muhafızı'], 'kara', 3, { gelis: secimi(d, 'gz_p08', 1) === 0 ? 'sizma' : 'oncu' }), bitis: 'Muhafız sustu; mor kristallerin arasında rüzgâr.' },
  ],
  kararSoru: 'Numune için bir mor kristal ucu.',
  kararlar: [
    { etiket: 'Yalnız tek bir monolitin ucunu çatlat, ormanı koru', sonuc: 'Gelişmiş kalkan frekans modülatörleri: pusucuların sahte sesleri zayıflar. Lirael kadim yankı anahtarını ve bir saf mor harmonik kristal verdi.', yap: (d) => { ver(d, { itibar: 700, yanki_anahtari: 1, mor_kristal: 1 }); b(d).parazit_sensoru = true; } },
    { etiket: 'Ağır lazerle üç büyük monoliti kökünden kes', sonuc: 'Yüz yirmi piezo, altmış kseno-alaşım. Çan melodileri sustu; Lirael ayrıldı.', yap: (d) => { ver(d, { itibar: 700, piezo: 120, kseno_alasim: 60 }); } },
  ],
  hasat: { iyi: { nobet: ['Sinha'], odul: { piezo: 3, mor_kristal: 1 }, metin: 'amfitiyatro en temiz tonunda.' }, kotu: { odul: { kristal: 2, piezo: 1 }, metin: 'kırık kristal parçaları.' } },
});

// --- 09 Necron-Sıfır ---
G('p09', {
  ad: 'Taşlaşmış Sessizlik ve Gömülü Arşiv', veren: 'Arkeolog Kael-Or', numune: 'Sinha ve akademi',
  giris: [
    'Tüyler ürperten bir sessizlik; piramitlerden geçen rüzgârın iniltisi ve bir lahitin içinden boğuk metal vuruşlar.',
    'Kael-Or, kapalı taş oda akustiğiyle: "Ben Kael-Or! Vexis lahitin denge taşını kaydırıp beni buraya mühürledi! Mezar otomatları uyandı, o dehliz kapısına gitti. Arşivi patlatarak açarsa milyon yıllık hiper-sürücü haritaları çökecek!"',
  ],
  hazirlik: 'Otonom keşif robotu ya da Akrep. Sismik dengeleyici ve Lithos\'un yankı anahtarı avantaj sağlar.',
  adimlar: [
    { op: [A('sonar', 'Hiyeroglif tarama', 'Lahitlerin kabartmalarını dinle: basılı tut.', 'Tuzağın mekanik kilit noktası bulundu.')] },
    { karar: [
      { etiket: 'Önce tuzaklı lahiti açıp Kael-Or\'u kurtar', sonuc: 'Kael-Or güveniyor, dehlizdeki gizli yolu gösterdi; ama Vexis savunma kurdu.' },
      { etiket: 'Doğrudan arşiv girişine koşup Vexis\'i bas', sonuc: 'Vexis hazırlıksız: kırk kadim kseno-kristal. Kael-Or havasız odada ağır yaralandı.', yap: (d) => ver(d, { kseno: 40 }) },
    ], soru: 'Kael-Or mu, Vexis mi?' },
    { op: [A('ton', 'Altı notalı taş blok dizisi', 'Dehlizin akustik kapısı. Basılı tut: tonları dinle; kalın aşağı, tiz yukarı, orta çift dokun.', 'Kapı açıldı.', { n: 6 })], atla: (d) => p(d, 'yanki_anahtari') > 0, atlaMetni: 'Kadim yankı anahtarı: kapı tek dokunuşta berrak bir çanla açıldı.' },
    { savas: (d) => S(['yagmaci_lideri', 'kadim_otomat', 'kadim_otomat'], ['Vexis', 'kadim mezar otomatı', 'kadim mezar otomatı'], 'kara', secimi(d, 'gz_p09', 1) === 0 ? 4 : 3), bitis: 'Arşivin kalbinde kseno-metalik mühür tableti.' },
  ],
  kararSoru: 'Kadim hiper-sürücü ve otomasyon arşivi.',
  kararlar: [
    { etiket: 'Arşivi koru, mührü ve rota şemalarını dikkatle kopyala', sonuc: 'Kadim hiper-sürücü rota şemaları: derin uzayda kalıcı yüzde on beş hız. İki kadim kseno-kristal.', yap: (d) => { ver(d, { itibar: 900, kseno: 2 }); b(d).gz_hiper = true; if (secimi(d, 'gz_p09', 1) === 0) { ver(d, { otomat_sifresi: 1, bilim: 500 }); } } },
    { etiket: 'Patlayıcıyla duvardaki bütün mühürleri sök', sonuc: 'Altı kadim kseno-kristal, bin GK değerinde kalıntı. Dehlizin tavanı çöktü; otomat şifresi yok oldu.', yap: (d) => { ver(d, { itibar: 900, kseno: 6, gk: 1000 }); } },
  ],
  hasat: { iyi: { nobet: ['Uma'], odul: { kseno: 1, fosfor_liken: 2 }, metin: 'dehliz akustik taramaya açık.' }, kotu: { odul: { bazalt: 4, mikrocip: 2 }, metin: 'yıkık anıtlardan bazalt ve otomat hurdası.' } },
});

// --- 10 Janus-Split: üç eşit yol ---
const JANUS_C = (d) => ZN.kusanildiMi(d, 'termal_giysi') || p(d, 'termal_giysi') > 0 || p(d, 'dondurucu_kopuk') > 0 || !!b(d).termal_giysi;
G('p10', {
  ad: 'Alacakaranlık Çizgisinde İki Kardeş', veren: 'İkiz kardeşler Soren ve Nadia', numune: 'Baştekniker Kaya',
  giris: [
    'Sağ kulakta artı beş yüz derecelik güneş fırtınası, sol kulakta eksi iki yüz derecelik buz ıslığı; ortada iki havanın çarpışmasından doğan hortumların uğultusu.',
    'Soren: "Güneş duvarına son aynayı da dikersem buzulları eritip bize sıcak bir vadi açacağım!" Nadia: "Aynaları açtığın an beş yüz kilometrelik hortumlar doğar! Kaptan, onun güç kablosunu kesip bu gezegeni soğuk ama sabit bir sığınağa çevirelim."',
    'İki kardeşi tek tek dinledin; ortak geçmişleri aynı hortumda.',
  ],
  hazirlik: 'İki kutuplu keşif aracı. Termal giysi ya da dondurucu köpük üçüncü bir yol açar.',
  adimlar: [
    { op: [A('denge', 'Termal çizgi', 'Sıcak ve soğuk rüzgârın ortasındaki ince sessiz çizgiyi tut: iki tonu sürükleyerek merkezde birleştir.', 'Gölge Duvarı\'na vardın.', { eksen: 'yatay' })] },
    { karar: [
      { etiket: 'Soren\'in güneş aynalarını aç (termal yol)', sonuc: 'Nadia buz tarafındaki savunma dronlarını gönderiyor.' },
      { etiket: 'Nadia\'nın buz kilidini indir (kriyo yol)', sonuc: 'Soren\'in tamir otomatı direniyor.' },
      { etiket: 'Hortumları aurora türbinine bağla (hibrit yol)', kosul: JANUS_C, kosulMetni: 'termal giysi ya da dondurucu köpük gerekir', sonuc: '"İkinizin de ihtiyacı sıcaklık ya da soğuk değil; bu hortumun gücünü auroraya boşaltmak!"' },
    ], soru: 'Üç yol, üç felsefe; doğrusu yok.' },
    { savas: S(['saldiri_dronu', 'saldiri_dronu'], ['koruyucu dron', 'koruyucu dron'], 'kara', 3), atla: (d) => secimi(d, 'gz_p10', 1) !== 0, bitis: 'Dronlar düştü; üç dev ayna güneşe döndü.' },
    { savas: S(['vaha_solucani'], ['Soren\'in tamir otomatı'], 'kara', 3), atla: (d) => secimi(d, 'gz_p10', 1) !== 1, bitis: 'Otomat sustu; ısı kablosu mühürlendi.' },
    { op: [A('basinc', 'Aurora türbini', 'İki zıt frekansı aynı anda türbine kilitle: gerilim zirveye çıkınca çift dokun. Üç kez.', 'Aurora Çizgi İstasyonu doğdu; kardeşler barıştı.')], atla: (d) => secimi(d, 'gz_p10', 1) !== 2 },
  ],
  son: (d) => ['a', 'b', 'c'][secimi(d, 'gz_p10', 1) || 0],
  odul: (d) => {
    const y = secimi(d, 'gz_p10', 1) || 0;
    ver(d, { itibar: 650 });
    if (y === 0) b(d).gz_termal = true;
    else if (y === 1) b(d).gz_kriyo = true;
    else b(d).gz_cift = true;
    return ['Termal enerji krateri: aşırı ısı ve plazma zırh kaplaması (ısı yüzde otuz az). Soren Varek nöbetinde mineral ve yakıt çıkarır.', 'Kriyo-vadi: kriyojenik yalıtım ve iyon savunma kaplaması (iyon hasarı yüzde otuz az). Nadia Sinha nöbetinde kriyolit sağlar.', 'Aurora istasyonu: çift-kutuplu zırh (ısı ve iyona yüzde yirmi direnç). Kardeşler her nöbette termal mineral üretir.'][y];
  },
  hasat: { a: { nobet: ['Varek'], odul: { nadir_termal: 1, itki_yakiti: 10 }, metin: 'Soren\'in krateri.' }, b: { nobet: ['Sinha'], odul: { kriyolit: 2, nadir_termal: 1 }, metin: 'Nadia\'nın kriyo-vadisi.' }, c: { odul: { nadir_termal: 2 }, metin: 'aurora istasyonu.' } },
});

// --- 11 Fulgur-3 ---
G('p11', {
  ad: 'Yıldırım Senfonisi ve Kıvılcım-7', veren: 'Maestro Kıvılcım-7 (bakım robotu)', numune: 'Varek Kaelon',
  giris: (d) => [
    'Saniyede yüzlerce şimşeğin gümbürtüsü, ozon çıtırtısı, soğuyan fulgurit camlarının ince çınlaması.' + (b(d).iyonHarita ? ' Zephyr\'in akustik haritası statiği yarım saniye erken duyuruyor.' : ''),
    'Kıvılcım-7: "Bzzzzt! Sahneye izinsiz girdiniz! Ben Maestro Kıvılcım-7! Gökyüzü her saniye nota yağıyor ama beşinci sütunum kırık... Senfonim yarım kaldı! Beni kapatmaya geldiysen üç bin voltluk bir alkışla uğurlarım!"',
  ],
  hazirlik: 'Paratoner zırhlı rover. Topraklama çubuğu iyon kilidini emer.',
  adimlar: [
    { op: [A('kacin', 'Yıldırım ritmi', 'Statik yükselince ters yana kaydır. Dört kez.', 'Paratoner platolarına vardın.', { n: 4 })], atla: (d) => p(d, 'topraklama_cubugu') >= 3, atlaMetni: 'Üç topraklama çubuğuyla yıldırımların üstüne sürdün; araç yüzde iki yüz şarjlı.' },
    { karar: [
      { etiket: 'Yıldırım senfonisini tamamla', sonuc: 'Beş süperiletken sütun ve gökyüzünün notaları.' },
      { etiket: 'Çekirdeği aşırı yükleyip sök', sonuc: 'Kıvılcım-7 platonun savunma dronlarını uyandırdı!' },
    ], soru: 'Senfoni mi, düello mu?' },
    { op: [A('ton', 'Beş sütun', 'Şimşeklerin tonunu dinle: basılı tut. Sonra kalın aşağı, tiz yukarı, orta çift dokun; beş nota.', 'Senfoni tamamlandı; Kıvılcım-7\'nin statiği boşaldı.', { n: 5 })], atla: (d) => secimi(d, 'gz_p11', 1) !== 0 },
    { savas: S(['vanguard_otomati', 'vanguard_otomati', 'vanguard_otomati'], ['iyon fırtına dronu', 'iyon fırtına dronu', 'iyon fırtına dronu'], 'kara', 3), atla: (d) => secimi(d, 'gz_p11', 1) !== 1, bitis: 'Dronlar düştü; Kıvılcım-7 devre dışı.' },
  ],
  son: (d) => (secimi(d, 'gz_p11', 1) === 0 ? 'iyi' : 'kotu'),
  odul: (d) => {
    const a = secimi(d, 'gz_p11', 1) === 0;
    ver(d, { itibar: 700, fulgurit: a ? 1 : 4, iyon_reaktoru: 1, ...(a ? {} : { kablo: 100 }) });
    b(d).gz_emp = true;
    if (a) b(d).kivilcim7 = true;
    return 'EMP ve iyon topu mühimmatı teknolojisi.' + (a ? ' Kıvılcım-7 dinleme ağına neşeli bir sinyal yardımcısı olarak bağlandı: iyon hasarı azalır.' : ' Enkazdan fulgurit ve yüz bakır-optik kablo.') + ' Paratoner platosu artık bir yıldırım şarj istasyonu: kenetlenince sonraki savaşa aşırı şarjlı başlarsın.';
  },
  hasat: { her: { nobet: ['Varek', 'Zhaor'], odul: { fulgurit: 1 }, metin: 'taze fulgurit tüpü.' } },
});

// --- 12 Miasma-9 ---
const MIASMA_SIFA = (d) => p(d, 'notralizasyon_kulesi') > 0 || ZN.miktar(d, 'kseno_panzehir') > 0 || p(d, 'miselyum_sporu') > 0;
G('p12', {
  ad: 'Kemik Flütleri ve Bataklık Hekimi', veren: 'Dr. Veyra (yazılı telsiz)', numune: 'Dr. Axira ve Sarah',
  giris: [
    'Fokurdayan yeşil asit gölleri, eriyen kayaların kimyasal fıslaması ve dev fosil kaburgalarından geçen rüzgârın hüzünlü flüt melodileri.',
    'Dr. Veyra, yazılı telsizden: "Sesim çıkmıyor; tıklamalarımı duyabiliyorsanız dikkatli yaklaşın. Fosil kafatasının altında acı çeken dev bir bataklık canlısı var; asit onu canlı canlı yakıyor. İhtiyacımız vahşet değil, bu asidi durduracak bir çözüm..."',
  ],
  hazirlik: 'Korozyon korumalı dron. Nötralizasyon kulesi, T-09 panzehir ya da Mycelia\'nın miselyum sporu şifa yolunu açar.',
  adimlar: [
    { op: [A('refleks', 'Gayzer ritmi', 'Fokurtu zirveye çıkınca tek dokun: püskürme arasında ilerle. Üç kez.', 'Kafatasının altına vardın.', { n: 3 })], atla: (d) => p(d, 'notralizasyon_kulesi') > 0, atlaMetni: 'Nötralizasyon kulesi gayzer buharını süzdü.' },
    { karar: [
      { etiket: 'Asidi nötralize et, canlıyı sakinleştir', kosul: MIASMA_SIFA, kosulMetni: 'nötralizasyon kulesi, panzehir ya da miselyum sporu gerekir', sonuc: 'Fokurtu kesildi; canavarın iniltisi sakin bir nefese döndü.' },
      { etiket: 'Bataklık canavarını temizle, kemik iliğini sök', sonuc: 'Canavar kafatasının önünde doğruluyor.' },
    ], soru: 'Şifa mı, av mı?' },
    { savas: (d) => S(['vaha_solucani'], ['asit bataklık canavarı'], 'kara', b(d).gz_p04 === 'kotu' ? 4 : 3, { ikincil: 'zehir' }), atla: (d) => secimi(d, 'gz_p12', 1) !== 1, bitis: 'Canavar devrildi.' },
  ],
  son: (d) => (secimi(d, 'gz_p12', 1) === 0 ? 'iyi' : 'kotu'),
  odul: (d) => {
    const a = secimi(d, 'gz_p12', 1) === 0;
    ver(d, { itibar: 600, ...(a ? {} : { kalsiyum_ksenon: 4, kseno_kabuk: 4 }) });
    b(d).notralizasyon_kulesi = true; // korozyona mutlak bağışık gövde verniği: savaşta asit işlemez
    if (a) b(d).asitRecetesi = true;
    return 'Kimyasal korozyona bağışık gövde verniği: asit ortamları artık işlemez.' + (a ? ' Dr. Veyra\'nın asit-kemik şifa reçetesi eczanede.' : ' İki kat kalsiyum-ksenon ve dört fosil kseno-kabuk; Veyra üzgün ayrıldı.');
  },
  hasat: { iyi: { nobet: ['Sinha', 'Zhaor'], odul: { kalsiyum_ksenon: 1, kseno_kabuk: 1 }, metin: 'rüzgârlı fosil havzası.' }, kotu: { nobet: ['Sinha', 'Zhaor'], odul: { kalsiyum_ksenon: 1, kseno_kabuk: 1 }, metin: 'rüzgârlı fosil havzası.' } },
});

// --- 13 Umbra-Kayıp ---
G('p13', {
  ad: 'Güneşsiz Dünyanın Sıcak Kalbi', veren: 'Kör Kaptan Mira', numune: 'Zhaor ve Tina',
  giris: [
    'Ne rüzgâr ne güneş: yalnız uzayın mutlak sessizliği, çekirdekten boğuk gürültüler ve soğuktan tabanca gibi patlayan buzullar. Sıcak bacaların yanından taşa vurulan bir sinyal: tık-tık... tık.',
    'Mira, fısıltıyla: "Fenerlerini kapat yabancı... Burada ışık yakarsan gölgeler seni bir kilometre öteden görür. Ben Mira. Yıllardır bu güneşsiz taşın üstünde sesleri dinleyerek yaşıyorum. Benimle sessizce yürümeye var mısın, yoksa silahlarınla mı geleceksin?"',
  ],
  hazirlik: 'Kızılötesi sondaj aracı. Işık mızrağı ve ışık pelerini ışık yolunda avantaj sağlar.',
  adimlar: [
    { op: [A('sonar', 'Kızılötesi tarama', 'Karanlık kanyonu dinle: basılı tut.', 'Liken mağarasının girişi; çıkışta iki gölge pusucusu.')] },
    { karar: [
      { etiket: 'Mira\'nın karanlık yöntemi: sessiz sızma', sonuc: 'Bütün farlar ve aktif radarlar kapandı.' },
      { etiket: 'Projektörleri ve ışık silahlarını ateşle', sonuc: 'Işığı gören yaratıklar öfkeyle saldırıyor!' },
    ], soru: 'Sessizlik mi, ışık mı?' },
    { op: [A('sessizlik', 'Mira\'nın çakıl taşları', 'On saniye ekrana hiç dokunma; yaratıkların nefesini ve Mira\'nın çakıllarını dinle.', 'Sıcak bacadan kseno-bakteri kolonisi vakumlandı.', { sure: 10 })], atla: (d) => secimi(d, 'gz_p13', 1) !== 0 },
    { savas: S(['tarikat_muhafizi', 'tarikat_muhafizi'], ['gölge pusucusu', 'gölge pusucusu'], 'kara', 4), atla: (d) => secimi(d, 'gz_p13', 1) !== 1, bitis: 'Mağara temizlendi.' },
  ],
  son: (d) => (secimi(d, 'gz_p13', 1) === 0 ? 'iyi' : 'kotu'),
  odul: (d) => {
    const a = secimi(d, 'gz_p13', 1) === 0;
    ver(d, { itibar: 850, ...(a ? {} : { kseno_bakteri: 40, fosfor_liken: 30, saf_aether: 1 }) });
    b(d).gz_karanlik = true;
    if (a) b(d).sinha_sonari = true; // kör kılavuz pusulası: sahte sesleri eler
    else b(d).mira = true;
    return 'Işıksız derin uzayda enerji tasarrufu: dördüncü ve beşinci halkada yakıt yüzde yirmi az.' + (a ? ' Mira\'nın kör kılavuz pusulası: pusucuların sahte sesleri elenir.' : ' Bacaların dibinden kseno-bakteri, liken ve aether; Mira koloniye taşındı.');
  },
  hasat: { iyi: { odul: { kseno_bakteri: 2, fosfor_liken: 2 }, metin: 'yetim gezegenin sıcak bacaları (nöbetten bağımsız).' }, kotu: { odul: { kseno_bakteri: 2, fosfor_liken: 2 }, metin: 'yetim gezegenin sıcak bacaları (nöbetten bağımsız).' } },
});

// --- 14 Fractura ---
G('p14', {
  ad: 'Kırılan Kıtanın Halatı', veren: 'Kaptan Oskar (Çapa-3)', numune: 'Başçavuş Drahmir ve Torvok',
  giris: [
    'Kayaları büken yerçekiminin metalik iniltisi; sağdan sola fırlayan kaya bloklarının gümbürtüsü ve kopan manyetik halatların gerilim çığlıkları.',
    'Oskar, yaşlı ve inatçı: "Tahliye falan etmiyorum! Kırk yıllık platin konteynerlerimi o korsan leş kargalarına bırakmam! Son halat da kopmak üzere; mekiğinde çekici kiriş ya da çapa varsa şu plakanın ucundan tut!"',
  ],
  hazirlik: 'Manyetik itki çapalı mekik ya da Atmosphere-X ve dron.',
  adimlar: [
    { op: [A('kacin', 'Savrulan kayalar', 'Kaya bloğu hangi yandan gelirse ters yana kaydır. Dört kez.', 'İstasyon iskelesine yanaştın.', { n: 4 })] },
    { karar: [
      { etiket: 'Plakayı çekirdeğe yeniden bağla, korsanları püskürt', sonuc: 'Önce platin konteynerlerine kanca atan korsanlar.' },
      { etiket: 'Plakayı bırak, Oskar\'ı zorla tahliye et, magmadan platin çek', sonuc: 'Oskar\'ın kapsülü çekici kirişle gemide; plaka düşmeye başladı.' },
    ], soru: 'Plaka mı, yük mü?' },
    { savas: S(['dron_tasiyici', 'saldiri_dronu', 'saldiri_dronu'], ['korsan dron taşıyıcısı', 'saldırı dronu', 'saldırı dronu'], 'uzay', 4, { gelis: 'oncu' }), atla: (d) => secimi(d, 'gz_p14', 1) !== 0, bitis: 'Taşıyıcı geri çekildi.' },
    { op: [A('denge', 'Halat sabitleme', 'Yerçekimi dalgasını iki tonu birleştirerek merkezle; çapa kırığa oturacak.', 'Plaka yeniden sabit.', { eksen: 'yatay' })], atla: (d) => secimi(d, 'gz_p14', 1) !== 0 || !!(d.gemi && d.gemi.moduller && d.gemi.moduller.cekici_isin), atlaMetni: '' },
    { op: [A('tut', 'Çekirdek kırığından vakum', 'Düşen kabuktan maden vakumla: basılı tut.', 'Platin ambarda.')], atla: (d) => secimi(d, 'gz_p14', 1) !== 1 },
  ],
  son: (d) => (secimi(d, 'gz_p14', 1) === 0 ? 'iyi' : 'kotu'),
  odul: (d) => {
    const a = secimi(d, 'gz_p14', 1) === 0;
    ver(d, { itibar: 800, ...(a ? {} : { manyetik_platin: 150, sasi_celigi: 40 }) });
    b(d).gz_yercekimi = true;
    return 'Yerçekimi sönümleme ve itki çapası: operasyonlarda alınan çarpışma ve çekim hasarı yüzde otuz az.' + (a ? ' Oskar her Sinha nöbetinde manyetik platin tedarik eder.' : ' Yüz elli manyetik platin; Çapa-3 gaz devinde kayboldu.');
  },
  hasat: { iyi: { nobet: ['Sinha'], odul: { manyetik_platin: 3, antigrav_tozu: 2 }, metin: 'Oskar\'ın istasyonu.' }, kotu: { odul: { titanyum: 3 }, metin: 'enkaz halkasından hurda.' } },
});

// --- 15 Carbonis-V ---
G('p15', {
  ad: 'Sürtünmesiz Labirent ve Elmas Çekirdeği', veren: 'Madenciler Bram ve Kaelith Sera-K', numune: 'Torvok ve Oronte',
  giris: [
    'Kuru grafit rüzgârının ıslığı, zırha çarpan mikro elmas tozunun ince çınlaması ve kapkara yağlı duvarlarda sürtünmesiz bir kayma.',
    'Bram, titreyerek: "Frenlere basma Kaptan! Grafit buzdan bile kaygandır, ters itkiyle yavaşla! Robotlarımız elmas tozundan çıldırdı, bizi kanyonun dibine kıstırdılar!"',
  ],
  hazirlik: 'Sonik kesicili madenci. Kripto anten ya da T-05 sonik tüfek otomatları savaşsız kapatır; Ferros matkap formülü kesimi kolaylaştırır.',
  adimlar: [
    { op: [A('zikzak', 'Kaygan labirent', 'Duvarlardan dönen yankıya göre ters itki ver: sağa, sola, sağa… sırayla kaydır, altı kez.', 'Bram ve Sera-K\'nın çukurundasın.', { n: 6 })] },
    { savas: S(['kadim_otomat', 'kadim_otomat'], ['ağır maden otomatı', 'ağır maden otomatı'], 'kara', 4), atla: (d) => !!(d.gemi && d.gemi.moduller && d.gemi.moduller.burun) || ZN.kusanildiMi(d, 'sonik_tufek'), atlaMetni: 'Otomatların şaşmış frekansı uzaktan sıfırlandı; savaşsız kapandılar.', bitis: 'Otomatlar sustu.' },
    { op: [A('basinc', 'Elmas sütun kesimi', 'Kesim ısınıyor; çatlama alarmında çift dokun. Üç kez.', 'Elmas çekirdek kesildi.')], atla: (d) => !!b(d).ferrosMatkap, atlaMetni: 'Brom\'un sertleştirilmiş matkap ucu: kesim sıçramasız ve yarı sürede bitti.' },
  ],
  kararSoru: 'Elmas Sütunlar Ovası.',
  kararlar: [
    { etiket: 'Hassas sonik kesimle tek saf çekirdek al, kırılmayı koru', sonuc: 'Aşınmaz lazer odaklama lensleri: bütün lazerlerin ısınması kalıcı yüzde otuz az. Bram ve Sera-K lens üretimine destek veriyor.', yap: (d) => { ver(d, { itibar: 750, elmas: 1 }); b(d).lazer_sogutucu = true; } },
    { etiket: 'Bütün gücü ver, birden fazla sütunu parçalayarak yükle', sonuc: 'Bin iki yüz GK değerinde ham elmas, yüz saf kristal; yalnız tek seferlik sertleştirilmiş matkap ucu.', yap: (d) => { ver(d, { itibar: 750, gk: 1200, saf_kristal: 100 }); b(d).deliciUc = true; } },
  ],
  hasat: { iyi: { nobet: ['Varek'], odul: { elmas: 2, saf_kristal: 5 }, metin: 'yeni elmas damarları.' }, kotu: { nobet: ['Varek'], odul: { elmas: 1, saf_kristal: 3 }, metin: 'kırık sütunların arasından elmas.' } },
});

// --- 16 Radion-Kızıl ---
G('p16', {
  ad: 'Geiger Gölgesindeki Son Nöbet', veren: 'Teknisyen Halvar (Kurşun-4)', numune: 'Dr. Vael',
  giris: [
    'İyonlaşmış havanın fosforlu vızıltısı, sıcak radyoaktif toz ve konumuna göre hızlanıp yavaşlayan bir Geiger sayacı: tık... tık... tık-tık-tık!',
    'Halvar, bitkin: "Kaptan... Benim için geliyorsan kurşun kayalarının gölgesinden ayrılma. Kraterdeki doğal reaktör kaynamaya başladı. Kurşun kapakları kilitlemezsek bütün vadi havaya uçacak; güvenlik robotları radyasyondan delirdi."',
  ],
  hazirlik: 'Kurşun zırhlı sondaj robotu. Lamine zırh, T-09 panzehir ve kseno-radyasyon detoksu gama hasarını engeller.',
  adimlar: [
    { op: [A('yaklas', 'Kurşun gölgeleri', 'Geiger tıkırtısının seyreldiği yöne dön: sesi iki kulakta eşitle, sağa sola kaydır; yukarı kaydırıp ilerle.', 'Uranyum Krateri\'nin kenarındasın.', { mesafe: 30, frek: 300 })] },
    { karar: [
      { etiket: 'Robotları aş, kurşun kapakları kilitle', sonuc: 'Krater çevresinde iki radyasyon korumalı otomat.' },
      { etiket: 'Savaşmadan Halvar\'ı çek, ham izotopları al', sonuc: 'Yüksek Geiger tıkırtısı altında hızlı zamanlama.' },
    ], soru: 'Stabilizasyon mu, tahliye mi?' },
    { savas: S(['kadim_otomat', 'kadim_otomat'], ['radyasyon korumalı otomat', 'radyasyon korumalı otomat'], 'kara', 4, { ikincil: 'zehir' }), atla: (d) => secimi(d, 'gz_p16', 1) !== 0, bitis: 'Otomatlar sustu.' },
    { op: [A('basinc', 'Üç kurşun kapak', 'Kapakları senkron kilitle: gerilim zirvede çift dokun. Üç kez.', 'Krater sakinledi.')], atla: (d) => secimi(d, 'gz_p16', 1) !== 0 },
    { op: [A('refleks', 'Hızlı tahliye', 'Geiger çıldırdığında tek dokun: kapsülü ve izotop kayasını çek. Üç kez.', 'Halvar gemide; krater arkanda çöküyor.', { n: 3 })], atla: (d) => secimi(d, 'gz_p16', 1) !== 1 },
  ],
  son: (d) => (secimi(d, 'gz_p16', 1) === 0 ? 'iyi' : 'kotu'),
  odul: (d) => {
    const a = secimi(d, 'gz_p16', 1) === 0;
    ver(d, { itibar: 850, ...(a ? {} : { izotop: 15, itki_yakiti: 80, dogal_izotop: 1 }) });
    if (a) {
      b(d).gz_nukleer = true;
      b(d).halvar = true;
    }
    return a ? 'Süper nükleer piller ve kalkan reaktörleri: uzay savaşlarında kalkan yenilemesi yüzde yirmi güçlü. Halvar reaktör laboratuvarına katıldı.' : 'On beş ağır izotop, seksen litre yakıt, bir zengin doğal izotop. Krater çöktü.';
  },
  hasat: { iyi: { nobet: ['Zhaor'], odul: { izotop: 3, dogal_izotop: 1 }, metin: 'Kurşun-4 nükleer üssü.' }, kotu: { odul: { izotop: 1 }, metin: 'tepelerin gölgesinden izotop kırıntısı.' } },
});

// --- 17 Automata-Enkaz ---
G('p17', {
  ad: 'Milyon Yıllık Vardiya', veren: 'Fabrika bilinci Ünite-0', numune: 'Tina',
  giris: (d) => [
    'Sağdan ve soldan senkronize hidrolik presler: BAM-tsss... BAM-tsss... Dev dişliler ve her dört vuruşta bir tiz buhar düdüğü.',
    'Ünite-0, kibar bir anons sesiyle: "Dikkat. Vardiya 942-milyon-112. Hammadde kritik. İzin verilmeyen organik kütle tespit edildi. Lütfen söküm için montaj bandına yatınız. Veya... yetkili yönetici kodunu giriniz."',
    ...(p(d, 'otomat_sifresi') > 0 ? ['Kael-Or\'un otomat şifresi: ilk kapı "Yetkili Mühendis" onayıyla açılıyor.'] : (d.koloni.binalar || []).includes('tina_cekirdegi') ? ['Tina makine koduyla Ünite-0\'ı oyalıyor.'] : []),
  ],
  hazirlik: 'Siber-müdahale dronu. Kripto anten ya da Necron şifresi kule savunmasını yarıya indirir.',
  adimlar: [
    { op: [A('ritim', 'Vardiya ritmi', 'Pres kolu açıldığı anda dokun; aksatmadan dört kez.', 'Kontrol kulesine vardın.', { n: 4 })], atla: (d) => p(d, 'otomat_sifresi') > 0, atlaMetni: '' },
    { savas: (d) => {
      const yari = p(d, 'otomat_sifresi') > 0 || !!(d.gemi && d.gemi.moduller && d.gemi.moduller.burun);
      return S(yari ? ['galeri_cagirani'] : ['galeri_cagirani', 'saldiri_dronu', 'saldiri_dronu'], yari ? ['fabrika güvenlik çağıranı'] : ['fabrika güvenlik çağıranı', 'tamir dronu', 'saldırı dronu'], 'kara', 4, { giris: yari ? 'Şifre kule savunmasını yarıya indirdi.' : '' });
    }, bitis: 'Kule sustu; sağlam kuantum çipi önünde.' },
  ],
  kararSoru: 'Ünite-0\'ın ana işlemcisi.',
  kararlar: [
    { etiket: 'Vardiyayı sonlandır, onarım algoritmasını Aethelis\'e aktar', sonuc: 'Otomatik gemi tamir algoritmaları: üsse ya da karakola dönen gemi yüzde on beş ücretsiz onarılır; Akrep yüzde elli hızlı toplar. Bir sağlam kuantum çipi.', yap: (d) => { ver(d, { itibar: 900, kuantum_cip: 1 }); b(d).gz_tamir = true; } },
    { etiket: 'Fabrikayı Aethelis için parça basmaya programla', sonuc: 'İki yüz şasi çeliği, altmış mikroçip, iki kuantum çipi; gezegen otomatik sanayi üssü.', yap: (d) => { ver(d, { itibar: 900, sasi_celigi: 200, mikrocip: 60, kuantum_cip: 2 }); } },
  ],
  hasat: { iyi: { nobet: ['Varek'], odul: { kuantum_cip: 1, mikrocip: 5 }, metin: 'hurda piramidinden çip.' }, kotu: { nobet: ['Varek'], odul: { sasi_celigi: 20, mikrocip: 5 }, metin: 'fabrikanın hazır stoğu.' } },
});

// --- 18 Chronos-Döngü ---
G('p18', {
  ad: 'Patlamadan Önceki Son Yankı', veren: 'Pilot Elara', numune: 'Kefius ve Zhaor',
  giris: [
    'Sağda henüz düşmemiş şarapnellerin titreşimi; solda dakikalar önceki bir patlamanın ağır çekimde ve tersten gelen uğultusu. Bozuk bir telsiz kaydı önce yankılanıyor, sonra tersten bir ses.',
  ],
  hazirlik: 'Zaman-yalıtımlı kapsül.',
  adimlar: [
    { op: [A('rotasyon', 'Zaman kırılması', 'Zaman kırılmasının frekansını tersine çevir: iki ya da üç parmakla kesintisiz çevir.', 'Elara, düzeltilmiş kayıtta: "...motor patladı... zaman duruyor... bu kaydı düz duyabiliyorsan döngünün dışındasın! Kapsülün yanına gelirsen beni çekebilirsin... ama çemberin kenarında zamandan beslenen bir şey var!"', { radyan: 10 })] },
    { savas: S(['tarikat_muhafizi'], ['zaman çatlağı muhafızı'], 'kara', 4, { gelis: 'tek' }), bitis: 'Muhafız dağıldı; hızlı zaman çemberi elinde.' },
  ],
  kararSoru: 'Hızlı zaman çemberinin ayarı.',
  kararlar: [
    { etiket: 'Döngüyü dondur, Elara\'yı çek, takyon teknolojisini al', sonuc: 'Sıçrama motorunun şarj beklemesi kalıcı olarak sıfırlandı. Pilot Elara Aethelis\'e katıldı.', yap: (d) => { ver(d, { itibar: 1000, takyon: 1 }); b(d).gz_takyon = true; b(d).elara = true; } },
    { etiket: 'Döngüyü hızlandır, saniyeler içinde nadir hasat yap', sonuc: 'Üç takyon, beş zaman tozu meyvesi; şarj beklemesi yarıya indi. Elara başka bir zaman dilimine savruldu.', yap: (d) => { ver(d, { itibar: 1000, takyon: 3, zaman_tozu: 5 }); b(d).gz_yarimSarj = true; } },
  ],
  hasat: { iyi: { nobet: ['Elyndra'], odul: { takyon: 1, zaman_tozu: 1 }, metin: 'güvenli araştırma halkası.' }, kotu: { nobet: ['Elyndra'], odul: { takyon: 1 }, metin: 'kararsız halkadan takyon.' } },
});

// --- 19 Aero-Flora ---
G('p19', {
  ad: 'Gökyüzünün Balina Şarkısı', veren: 'Ana Kese (hidrofon) ve Vaelin sözcüsü Sira-Vel', numune: 'Sira-Vel',
  giris: (d) => [
    'Hidrojen atmosferinde yüzen dev keselerin derin, hüzünlü balina iniltileri; yükselen gaz baloncuklarının tok patlamaları.' + (b(d).iyonHarita ? ' Zephyr\'in akustik haritası şarkının notalarını kulaklıkta vurguluyor.' : ''),
    'Sira-Vel: "Kaptan... Ana Kese acı içinde şarkı söylüyor. Alt-Evren hava parazitleri sırtına yapışıp yerçekimsiz gazını emiyor. Ortam yanıcı hidrojen dolu: patlayıcı değil, keskin atış!"',
  ],
  hazirlik: 'Atmosferik kepçeli mekik ya da Atmosphere-X. Işık mızrağı, sonik kovucu ya da T-08 nişangâh keskin atış sağlar.',
  adimlar: [
    { op: [A('ton', 'Ana Kese\'nin şarkısı', 'Hidrofon açık: dört notalı şarkıyı dinle (basılı tut), sonra kalın aşağı, tiz yukarı, orta çift dokun.', 'Şarkı kaydedildi.', { n: 4 })], atla: (d) => !!b(d).iyonHarita, atlaMetni: 'Akustik harita notaları kendiliğinden ayırdı.' },
    { savas: S(['golge_kanat', 'saldiri_dronu', 'saldiri_dronu'], ['ana parazit çağıranı', 'Alt-Evren hava paraziti', 'Alt-Evren hava paraziti'], 'uzay', 4), bitis: 'Parazitler temizlendi; emiş valfi hazır.' },
  ],
  kararSoru: 'Anti-yerçekimi gazı.',
  kararlar: [
    { etiket: 'Hidrofonla şarkıya eşlik et, gönüllü gazı al', sonuc: 'Hafif yerçekimsiz kargo ambarları: kargo kapasitesi kalıcı yüzde otuz beş fazla. Canlı resif tohumu serada; moral +10.', yap: (d) => { ver(d, { itibar: 750, moral: 10 }); b(d).gz_kargo = 0.35; } },
    { etiket: 'Şarkısız, valfi saplayıp zorla gaz çek', sonuc: 'Yüz antigravitasyon tozu, altmış litre yakıt, kargo kapasitesi yüzde yirmi fazla. Ana Kese ürkerek kaçtı.', yap: (d) => { ver(d, { itibar: 750, antigrav_tozu: 100, itki_yakiti: 60 }); b(d).gz_kargo = 0.2; } },
  ],
  hasat: { iyi: { nobet: ['Axira', 'Uma'], odul: { antigrav_tozu: 3 }, metin: 'şarkıyla ücretsiz gaz ve şarkı terapisi: mürettebatın stresi silindi.', yap: (d) => { for (const u of d.murettebat || []) u.stres = 0; } }, kotu: { nobet: ['Axira', 'Uma'], odul: { antigrav_tozu: 1 }, metin: 'hızlı dalışla biraz gaz.' } },
});

// --- 20 Corona-Lux ---
G('p20', {
  ad: 'Güneşin Kalbindeki Kapan', veren: 'Fizikçi Dr. Kaelen-Sol (Helios-1)', numune: 'Varek ve Ignador',
  giris: [
    'Ana yıldızın kükreyen fırtınası; buharlaşan kayaların cızırtısı ve gökkuşağı plazma kuyusunun elektrikli vızıltısı.',
    'Dr. Sol, statik arasında: "Kaptan, sakın ana gemiyle yaklaşma, kalkanların saniyeler içinde buharlaşır! Sondanla beni duyuyorsan kapanın merkezine in. Kalkanım son yüzde beşte; kuyunun ağzında saf plazmadan doğmuş bir anomali nöbet tutuyor!"',
  ],
  hazirlik: 'Süper termal intihar sondası. Termal giysi, dondurucu köpük ya da Janus\'un termal zırhı alev dalgalarını hafifletir.',
  adimlar: [
    { op: [A('kacin', 'Alev dalgaları', 'Alev dalgası hangi yandan gelirse ters yana kaydır, siper al. Dört kez.', 'Kapanın merkezindesin.', { n: 4 })], atla: (d) => !!(b(d).gz_termal || b(d).gz_cift), atlaMetni: 'Janus\'un zırh kaplaması alev dalgalarını yuttu.' },
    { savas: S(['kadim_otomat'], ['yıldız plazma muhafızı'], 'kara', 5, { ikincil: 'isi' }), bitis: 'Muhafız söndü; yoğun güneş plazması kuyudan çekiliyor.' },
  ],
  kararSoru: 'Helios-1 ve kuyunun enerjisi.',
  kararlar: [
    { etiket: 'Helios-1\'i çek, Dr. Sol\'ü kurtar, plazma kalkanlarını çöz', sonuc: 'Yıkılmaz yıldız kalkanları ve nihai plazma motorları: uzay savaşında alınan hasar azaldı, seyir yüzde yirmi hızlı. Dr. Sol koloniye katıldı.', yap: (d) => { ver(d, { itibar: 1000, gunes_plazmasi: 1 }); b(d).gz_yildizKalkan = true; b(d).gz_plazmaMotor = true; } },
    { etiket: 'Helios-1\'in kalkanını kuyuya bağla, dev plazma hasadı yap', sonuc: 'İki yüz elli litre yakıt, üç yoğun güneş plazması ve nihai plazma motorları; Dr. Sol araştırması yandığı için üzgün ayrıldı.', yap: (d) => { ver(d, { itibar: 1000, itki_yakiti: 250, gunes_plazmasi: 3 }); b(d).gz_plazmaMotor = true; } },
  ],
  hasat: { iyi: { nobet: ['Varek'], odul: { gunes_plazmasi: 1 }, metin: 'kuyu kenarından güneş plazması.' }, kotu: { nobet: ['Varek'], odul: { gunes_plazmasi: 1 }, metin: 'kuyu kenarından güneş plazması.' } },
});

// --- 01 Pyros-Prime: Xarathia (v4 karakter ağı 10, düşman kataloğu Boss 1; ayrıntılı gezegen belgesi yok, taslak) ---
// "İttifak yolunda savaşılmaz": soğuk bir armağanla (iki dondurucu köpük ya da beş kriyolit) Xarathia'yla konuşulursa
// çatışma atlanır; yoksa iki aşamalı boss savaşı (ikinci aşamada buz silahlarına ve soğutmaya iki kat zayıf).
const sogukArmagan = (d) => p(d, 'dondurucu_kopuk') >= 2 || (d.koloni.kaynaklar.kriyolit || 0) >= 5;
G('p01', {
  ad: 'Kızıl Kalbin Muhafızı', veren: 'Pyros-Prime\'ın ateş figürü Xarathia', numune: 'Torvok ve Ignador',
  giris: [
    'Derin bas homurtuları, menfezlerden fışkıran kükürt tıslamaları; kabin tavanına sıvı cam damlaları çarpıyor.',
    'Kızıl Kalp Kalderası\'nın dibinden, lav göllerinin altından nefes alan bir ses yükseliyor: "Isı kalkanlı küçük böcek... Kalbime matkap saplayan yağmacıların akrabası mısın, yoksa ateşi anlayan biri mi?" Bu, Xarathia: ne YGK tutsağı ne Malazar afeti; Pyros-Prime\'ın kendi ateşi.',
  ],
  hazirlik: 'Ağır termal rover hazır. Soğuk bir armağan (iki dondurucu köpük ya da beş kriyolit) Xarathia\'yla konuşmanın yolunu açar; termal giysi ve buz silahları savaşta işe yarar.',
  adimlar: [
    { op: [A('kacin', 'Isı dalgaları', 'Kalderanın kenarında ısı dalgaları vuruyor: dalga hangi yandan gelirse ters yana kaydır. Üç kez.', 'Kızıl Kalp\'in kıyısındasın; lav sütunu nabız gibi atıyor.', { n: 3 })] },
    { karar: [
      { etiket: 'Soğuk bir armağanla Xarathia\'yla konuş', sonuc: 'Armağanı lavın kıyısına bıraktın.' },
      { etiket: 'Lav sütununa saldır, çekirdeğini söndür', sonuc: 'Termal rover silahlarını kalderaya çevirdin.' },
    ], soru: 'Kızıl Kalp\'in muhafızına nasıl yaklaşacaksın?' },
    {
      savas: S(['xarathia'], null, 'kara', 5),
      atla: (d) => secimi(d, 'gz_p01', 1) === 0 && sogukArmagan(d),
      atlaMetni: 'Xarathia soğuk armağanı kabul etti: "Ateşi söndürmeye değil, dengelemeye gelmişsin." Savaşılmadı.',
      bitis: 'Xarathia lavın derinine çekildi; Kızıl Kalp\'in ağzı açık.',
    },
  ],
  kararSoru: 'Kızıl Kalp Kalderası\'nın sıvı titanyum-kobalt damarı önünde.',
  kararlar: [
    { etiket: 'Xarathia\'yla ittifak: damardan yalnız payına düşeni al', kosul: (d) => secimi(d, 'gz_p01', 1) === 0 && sogukArmagan(d), kosulMetni: 'İttifak ancak soğuk armağanla, savaşmadan kurulur.', sonuc: 'Xarathia ateşin dengesini öğretti: dökümhane termal manyetik çekirdeği; ısı düşmanlarına karşı kalkan daha yavaş ısınır. Pyros yağmacılara kapalı.', yap: (d) => { if ((d.koloni.parcalar.dondurucu_kopuk || 0) >= 2) d.koloni.parcalar.dondurucu_kopuk -= 2; else if (p(d, 'dondurucu_kopuk') >= 2) d.esya.dondurucu_kopuk -= 2; else d.koloni.kaynaklar.kriyolit -= 5; ver(d, { itibar: 600, titanyum: 10, sivi_metal: 4 }); b(d).xarathiaIttifak = true; } },
    { etiket: 'Damarı boşalt: bütün sıvı titanyum-kobaltı çek', sonuc: 'Kalderanın kalbi söndü; ambar sıvı metal ve titanyumla dolu. Pyros artık yalnız taş ve küldür.', yap: (d) => { ver(d, { itibar: 600, titanyum: 25, sivi_metal: 8 }); } },
  ],
  son: (d, i) => (i === 0 ? 'iyi' : 'kotu'),
  hasat: { iyi: { nobet: ['Varek'], odul: { sivi_metal: 1, titanyum: 2 }, metin: 'Xarathia damardan payını ayırdı.' }, kotu: { odul: { bazalt: 4 }, metin: 'sönmüş kalderadan bazalt.' } },
});
