// YGK Akademi: gezilebilir on bir kat, on kürsü testi ve iç denge (belgeler/v4/ygk-akademi-gezilebilir-sistem-ve-10-kursu.txt).
// - Katların açılışı (bölüm 1): katKilidi(d, kat) asansörde denetlenir (malken.js). Faz A (Final #1): artı katlar;
//   Faz B (Final #3): eksi bir, iki, üç; Faz C: eksi dört (Final #13), eksi beş (Final #15 ya da Başmüfettiş mührü).
//   Kayıt için kabul masası (kat 1), Final #1 için Konsey (kat 6) ve sıradaki final görevinin katı her zaman açık.
// - Kürsü eğitmenleri (bölüm 2): AK_KISILER konuşma noktaları ak_<id>; testleri hikâye motoruyla (hikaye.js, tetik yok,
//   noktadan baslat) oynanır: operasyon adımları ve gerekirse kara savaşı. Bitince bayrak ak_<id> ve +50 Yıldız Ekolü kıdemi;
//   etkiler savas.js, zanaat.js, atlas.js, operasyon.js, dunya.js'te okunur.
// - Dört kilit figür (bölüm 3.1): Ignador'un askerî reformu (hikâye ak_darbe: darbe → valenKapali, Morvenna Kael yönetir /
//   Valen korunur → ignadorKirgin); Kefius'un güveni (d.tf.guven.kefius ≥ 30 → Final #18 öncesi Dünya Çivisi'nin zayıf
//   noktası); Tixie (beşinci kattaki boyut sabitleyici çip → tixieCip, T-03 açılır / ihbar → tixieIhbar, YGK +15).
// - Eksi dört stasis tutsakları (bölüm 3.2): Zephyra (Fırtına Kalkanı) ve Morwenna (Sharon'un zihin saldırıları).
import { hikayeEkle, baslat, bittiMi } from '../hikaye';
import * as ZN from './zanaat';
import * as SB from './subay';
import { gucEkle } from './kisiler';
import { tarim } from '../tarim/tarim';

const YGK = ['ygk_6', 'ygk_5', 'ygk_4', 'ygk_3', 'ygk_2', 'ygk_1', 'ygk_m1', 'ygk_m2', 'ygk_m3', 'ygk_m4', 'ygk_m5'];
const katX = (id) => 8200 + YGK.indexOf(id) * 40;
const A = (tur, ad, giris, bitis, ek) => ({ tur, ad, giris, bitis, ...(ek || {}) });
const b = (d) => d.bayrak;
const fb = (d, n) => !!(d.tf && d.tf.biten && d.tf.biten.includes(n));

// --- Kat açılışları ---
export function katKilidi(d, kat) {
  const sirada = d.tf && d.tf.biten ? siradakiNokta(d) : null;
  if (sirada && sirada === kat && (kat !== 'ygk_6' || b(d).ygkKayit)) return null;
  if (kat === 'ygk_5' || kat === 'ygk_1') return null;
  if (kat === 'ygk_6') return b(d).ygkKayit ? null : 'Asansör altıncı katta durmuyor: "Yüksek Konsey yalnız kayıtlı kaptanlara açık. Önce birinci kattaki kabul masası."';
  if (['ygk_4', 'ygk_3', 'ygk_2'].includes(kat)) return fb(d, 1) ? null : 'Asansör bu katta durmuyor: "Kat bir ile altı arası YGK Kayıt Mührü ister." Final görevi birden sonra açılır.';
  if (['ygk_m1', 'ygk_m2', 'ygk_m3'].includes(kat)) return fb(d, 3) ? null : 'Asansör yeraltına inmiyor: "Dehliz sızıntısı mühürlenene kadar eksi katlar kapalı." Final görevi üçten sonra açılır.';
  if (kat === 'ygk_m4') return fb(d, 13) ? null : 'Asansör eksi dörtte durmuyor: "Kadim stasis hücreleri. Kara Göl\'ün sırrı çözülmeden açılmaz." Final görevi on üçten sonra açılır.';
  if (kat === 'ygk_m5') return fb(d, 15) || b(d).basmufettis ? null : 'Asansör kat eksi beşte durmuyor: "Sıfırıncı Karanlık. Astral yankı duyulmadan ve Başmüfettiş mührü olmadan açılmaz."';
  return null;
}
// Sıradaki final görevinin başladığı kat (görevin kendisi her zaman ulaşılabilir kalsın)
const FINAL_KATLARI = { 1: 'ygk_6', 3: 'ygk_m3', 18: 'ygk_m5' };
function siradakiNokta(d) {
  for (let n = 1; n <= 20; n++) if (!fb(d, n)) return FINAL_KATLARI[n] && (n === 1 || fb(d, n - 1)) ? FINAL_KATLARI[n] : null;
  return null;
}

// --- Kürsü eğitmenleri, mahkumlar ve yerler ---
export const AK_KISILER = {
  korvinus: { ad: 'Korvinus Vael', unvan: 'Anti-Büyü Kürsüsü', kat: 'ygk_3', x: 6, y: 4, ekol: 'sinha', kosul: (d) => fb(d, 3), kosulMetni: 'final görevi üçten sonra',
    tarif: 'Kat üçün köşesinde, bozuk rezonans kalkanlarının arasında kuru, dikkatli bir öğretmen.',
    soz: 'Korvinus: "Her kalkanın bir yalanı vardır, Kaptan. Kusursuz görünen bir rezonansın içinde bir hata frekansı saklıdır; onu duyan kalkanı kapatır."' },
  silas: { ad: 'Silas Vex', unvan: 'Gölge ve Psikometri Kürsüsü', kat: 'ygk_m2', x: 6, y: 4, ekol: 'elyndra', kosul: (d) => fb(d, 3), kosulMetni: 'final görevi üçten sonra',
    tarif: 'Eksi ikinin sessiz arşivlerinde, disiplin odasının gölgesinde; varlığını ancak konuşunca fark ediyorsun.',
    soz: 'Silas (fısıltıyla): "Ses çıkaran kaybeder. Konsey katibinin odasına benden habersiz girebilirsen sana pusunun nasıl sezildiğini öğretirim."' },
  forges: { ad: 'Forges', unvan: 'Mekanik ve Enerji Kürsüsü', kat: 'ygk_3', x: 16, y: 4, ekol: 'varek', kosul: (d) => fb(d, 1), kosulMetni: 'final görevi birden sonra',
    tarif: 'Kat üçün zanaat atölyesinde çekiç sesleri arasında; kolları kristal tozuyla kaplı, iri bir usta.',
    soz: 'Forges: "Aether kristali dövülmez derler. Dövülür; yeter ki üç kez doğru anda soğutasın. Dördüncü kademe dökümhane senin tersanene bağlı ama bende verim var."' },
  jolkar: { ad: 'Jolkar Tectus', unvan: 'Rünler ve Antik Dil Kürsüsü', kat: 'ygk_m3', x: 16, y: 4, ekol: 'uma', kosul: (d) => fb(d, 6), kosulMetni: 'final görevi altıdan sonra',
    tarif: 'Eksi üçteki Malazar çatlağının ağzında, kristal çatırtıları arasında yazıtlara eğilmiş yaşlı bir rünbilim ustası.',
    soz: 'Jolkar: "Taş konuşur, Kaptan; yanlış ritimle okursan uyanır. Çatlağın dibindeki lanetli yazıt öyle bir taş."' },
  faelan: { ad: 'Faelan Cinder', unvan: 'Hata Büyüsü Kürsüsü', kat: 'ygk_2', x: 6, y: 16, ekol: 'varek', kosul: (d) => fb(d, 1), kosulMetni: 'final görevi birden sonra',
    tarif: 'Kat ikinin amfilerinden birinde, eli hep biraz yanık, gülerek konuşan bir genç usta.',
    soz: 'Faelan: "Hata da bir büyüdür! Ateşle buzu aynı anda yükle, dengede tut; patlamazsa silahların kızdığında bile kritik vurmayı öğrenirsin."' },
  trellis: { ad: 'Trellis-7', unvan: 'Kseno-Botanik ve Zehir Kürsüsü', kat: 'ygk_5', x: 16, y: 4, ekol: 'axira', kosul: (d) => fb(d, 3), kosulMetni: 'final görevi üçten sonra',
    tarif: 'Kat beşin kseno-seralarında, sporlu odanın camının ardında nefes ritmiyle konuşan bitkimsi bir eğitmen.',
    soz: 'Trellis-7: "Sporlu oda nefes alır, Kaptan. Onunla birlikte nefes ver; panzehir bitkisi ancak öyle avucuna düşer."' },
  seraphine: { ad: 'Seraphine \'Işık Yolu\' Rael', unvan: 'Şifa ve Empati Kürsüsü', kat: 'ygk_5', x: 6, y: 16, ekol: 'axira', kosul: (d) => fb(d, 3), kosulMetni: 'final görevi üçten sonra',
    tarif: 'Kat beşin sera fıskiyelerinin yanında; sesi yumuşak, elleri ılık bir şifacı.',
    soz: 'Seraphine: "Acıyı paylaşan iyileştirir. Yaralı bir askerin nabzıyla aynı ritimde kalabilirsen, mürettebatın savaştan iki kat hızlı toparlanır."' },
  caelum: { ad: 'Caelum Nokturnus', unvan: 'Astral Seyahat Kürsüsü', kat: 'ygk_m3', x: 6, y: 16, ekol: 'zhaor', kosul: (d) => fb(d, 6), kosulMetni: 'final görevi altıdan sonra',
    tarif: 'Eksi üçteki astral geçidin kıyısında; konuşurken sesi bir yakından bir uzaktan geliyor.',
    soz: 'Caelum: "Haritaya bakan kaybolur. Mormon Denizi\'nin fırtınasını yalnız kulağınla geç; sonra bütün yolların kısalır."' },
  kaelis: { ad: 'Kaelis \'Echo\' Duman', unvan: 'Ses ve İllüzyon Kürsüsü', kat: 'ygk_2', x: 16, y: 16, ekol: 'sinha', kosul: (d) => fb(d, 1), kosulMetni: 'final görevi birden sonra',
    tarif: 'Kat ikinin akustik odasında; senin sesini senden önce taklit eden bir illüzyon ustası.',
    soz: 'Kaelis (senin sesinle): "Kendinle hiç savaştın mı, Kaptan? Akustik odaya gel; kendi saldırının sesini taklit eden bir yankıyı yen."' },
  zeva: { ad: 'Zeva \'Kılavuz\' Thorne', unvan: 'Mekik ve Denge Kürsüsü', kat: 'ygk_3', x: 8, y: 16, ekol: 'zhaor', kosul: (d) => fb(d, 3), kosulMetni: 'final görevi üçten sonra',
    tarif: 'Kat üçteki denge platformunun başında; mekik pilotlarının hocası, sakin ve kesin.',
    soz: 'Zeva: "Ağırlık merkezini sesle bul. Bulursan engebeli arazi araçlarını da mekiklerini de daha az yorar."' },
  puskul: { ad: 'Profesör Püskül', unvan: 'Kütüphane ve Kartografya', kat: 'ygk_4', x: 16, y: 16,
    tarif: 'Kat dördün kütüphanesinde, sayfa hışırtıları ve saat tiktakları arasında yaşlı, dalgın bir profesör.',
    soz: 'Profesör Püskül: "Ah, Aethelis\'in kaptanı! Kefius haritaları çizer, ben onları okurum. Bir gün okuyacak bir şey getirirsen kapım açık."' },
  maelis: { ad: 'Maelis', unvan: 'Röle ve Mekik İskelesi Görevlisi', kat: 'ygk_m1', x: 6, y: 4,
    tarif: 'Eksi birin kırk hertzlik röle uğultusunda, Tether-Key mekik terminalinin başında.',
    soz: 'Maelis: "Tether-Key terminali burada, Kaptan. Tanıştığın kişileri mekikle koloniye davet etmek istersen karakter ağından çağır; ben rıhtımı hazır tutarım."' },
  zephyra: { ad: 'Zephyra, Göğün Hiddeti', unvan: 'Stasis tutsağı', kat: 'ygk_m4', x: 6, y: 4, mahkum: true,
    tarif: 'Dar bir kriyo hücresinde kanatlarını açamayan bir atmokinezi ustası; nefesi hızlı, hücrenin camı buğulu.',
    soz: 'Zephyra (camın ardından, kesik kesik): "Duvarlar... üstüme geliyor. Gökyüzünü bir kez daha duyabilsem..."' },
  morwenna: { ad: 'Morwenna', unvan: 'Stasis tutsağı, eski Tyzrakhel rahibesi adayı', kat: 'ygk_m4', x: 16, y: 16, mahkum: true,
    tarif: 'Sessiz bir kriyo tüpünde; sesi duvarların içinden, bir sağdan bir soldan geliyor.',
    soz: 'Morwenna: "Sharon\'un sesini bilirim, Kaptan. Beni burada bırakırsan sana yalnız verimi verebilirim; çıkarırsan onun fısıltısını sana karşı bükmeyi öğretirim."' },
};
export const AK_NOKTALAR = {};
for (const [id, k] of Object.entries(AK_KISILER)) {
  AK_NOKTALAR['ak_' + id] = { mekan: k.kat, x: katX(k.kat) + k.x, y: k.y, ad: k.ad + ', ' + k.unvan, yaricap: 2, akademi: id, tarif: k.tarif };
}
AK_NOKTALAR.ak_cip = { mekan: 'ygk_5', x: katX('ygk_5') + 16, y: 16, ad: 'Simya laboratuvarı, boyut sabitleyici rafı', yaricap: 1.8, akademi: 'cip', tarif: 'Melez zanaat laboratuvarının rafında, cep-boyut deneylerinden kalma küçük çipler; her biri parmaklarının altında hafifçe vınlıyor.' };

Object.assign(ZN.ESYA, {
  boyut_cipi: { kat: 5, ad: 'Boyut Sabitleyici Çip', tarif: 'Beşinci kat simya laboratuvarından; cep-boyutları sabitler. Tixie bunu arıyor.' },
  firtina_kalkani: { kat: 5, ad: 'Fırtına Kalkanı', tarif: 'Zephyra\'nın hediyesi: hava ve yıldırım saldırılarına direnç; Arin ve Güney rotalarında rüzgâr sana yardım eder.' },
});
// T-03 Cep-Ambar ancak Tixie çipi alınca
if (ZN.TARIFLER.cep_ambar) {
  ZN.TARIFLER.cep_ambar.kosul = (d) => !!d.bayrak.tixieCip;
  ZN.TARIFLER.cep_ambar.kosulMetni = 'Tixie\'ye beşinci kattan boyut sabitleyici çip götür; taslağı ancak o zaman birlikte açarsınız.';
}

// --- Kürsü testleri (hikâye motoru) ---
const TESTLER = {
  korvinus: { ad: 'Kusursuz Hata', ortam: 'ortam_t_ygk', giris: ['Korvinus kat üçün test odasında bozuk bir rezonans kalkanı açıyor; kalkan kusursuz bir tonla vınlıyor, ama içinde bir yerde titreyen bir hata var.'],
    adimlar: [{ op: [A('frekans', 'Hata frekansı', 'Kalkanın sesini dinle; iki parmakla çevirerek zayıf frekansı bul ve üstüne otur: kalkan kapanır.', 'Kalkan bir iç çekişle söndü. Korvinus: "Gördün mü? Hata oradaydı."')] }],
    odul: 'Artı elli Mavi Yıldız Ekolü kıdemi. Düşmanın frekans kalkanını kırdığın her atış yüzde yirmi beş daha sert vurur.' },
  silas: { ad: 'Gölge Şantajı', ortam: 'ortam_t_ygk_alt', giris: ['Eksi ikinin uzak kapı sürgüleri. Silas: "Katibin odası koridorun sonunda. Hızlı yürürsen sürgüler seni ele verir."'],
    adimlar: [{ op: [A('yaklas', 'Sessiz sızma', 'Koridor tamamen sessiz. Kapının sesine dön, sağa sola kaydır; ilerlemek için yalnız tek dokun, yavaş adım. Yukarı kaydırma koşar: yakalanırsın.', 'Katibin odasındasın; kimse duymadı. Silas gölgeden çıkıyor: "İyi."', { mesafe: 24, frek: 180, sessiz: true })] }],
    odul: 'Artı elli Mor Yıldız Ekolü kıdemi. Karada ve uzayda pusuları önceden sezersin: tuzaklarda ilk saldırı erken gelmez, ilk uyarıdan önce bir nefes payın olur.' },
  forges: { ad: 'Çelik Damar', ortam: 'ortam_t_ygk', giris: ['Forges örsün başında patlamak üzere olan dengesiz bir aether kristali tutuyor: "Isı yükselir, çatlama sesi gelir; tam o an soğut. Üç kez."'],
    adimlar: [{ op: [A('basinc', 'Üç aşamalı soğutma', 'Kristal kızıyor; çatlama alarmını duyar duymaz çift dokun: soğut. Üç kez.', 'Kristal soğuyup sertleşti; Forges çekici bırakıyor: "Çelik damar. Aferin."')] }],
    odul: 'Artı elli Kırmızı Yıldız Ekolü kıdemi. Bütün zırh ve gemi gövdesi üretim maliyetlerinde kalıcı yüzde on indirim.' },
  jolkar: { ad: 'Konuşan Taş', ortam: 'ortam_t_ygk_alt', giris: ['Malazar çatlağının dibinde lanetli yazıt. Jolkar: "Ritmi kaçırma. Yanlış okursan uyanan muhafızla sen uğraşırsın; doğru okusan da taş bir kez sınar."'],
    adimlar: [
      { op: [A('ritim', 'Yazıtın ritmi', 'Yazıtın rünleri sırayla çınlıyor; her çınlamada tek dokun, aksatmadan dört kez.', 'Yazıt okundu; ama taşın içinden bir şey kalkıyor.', { n: 4 })] },
      { savas: { dusmanlar: ['kadim_otomat'], adlar: ['uyanan yazıt muhafızı'], ortam: 'kara', tier: 4, giris: 'Taştan bir kadim otomat ve gölge muhafızı uyandı: kalkan tonunu yakala, sonra vur.' }, bitis: 'Muhafız taşa geri çöktü. Jolkar: "Taş seni tanıdı."' },
    ],
    odul: 'Artı elli Sarı Yıldız Ekolü kıdemi. Karanlık düşmanların zihin ve stres saldırılarına kalıcı yüzde yirmi direnç.' },
  faelan: { ad: 'Kontrollü İnfilak', ortam: 'ortam_t_ygk', giris: ['Faelan iki kristal tutuyor, biri ateş, biri buz: "İkisini aynı anda yükle; tonlar birleşince dengede tut. Kaçırırsan yanağım yine yanar!"'],
    adimlar: [{ op: [A('denge', 'Ateş ve buz', 'İki ton birbirinden kaçıyor: sürükleyerek iki tonu birleştir ve sabit tut.', 'Ateş ve buz tek tonda; infilak kontrol altında. Faelan alkışlıyor.')] }],
    odul: 'Artı elli Kırmızı Yıldız Ekolü kıdemi. Glitch Atışı: gemi silahların ya da siperin aşırı ısınınca bir sonraki atışın kritik vurur.' },
  trellis: { ad: 'Zehirli Nefes', ortam: 'ortam_kubbe', giris: ['Sporlu oda. Trellis-7: "Oda nefes veriyor... nefes alıyor... Nefes verdiği anda dokun; panzehir bitkisi o an açılır."'],
    adimlar: [{ op: [A('refleks', 'Nefes ritmi', 'Odanın nefes sesini duyar duymaz tek dokun. Üç kez.', 'Panzehir bitkisi avucunda.', { n: 3 })] }],
    odul: 'Artı elli Yeşil Yıldız Ekolü kıdemi. Zehir ve asit hasarına kalıcı yüzde yirmi beş direnç; iki nadir kükürt sarmaşığı tohumu.' },
  seraphine: { ad: 'Acıyı Paylaş', ortam: 'ortam_revir', giris: ['Seraphine yaralı bir askerin elini eline veriyor: "Nabzını duy. Aynı ritimde kal; acısı yarıya iner."'],
    adimlar: [{ op: [A('ritim', 'Nabız senkronu', 'Askerin nabzı atıyor; her atışta tek dokun, aksatmadan beş kez.', 'Askerin nabzı yavaşladı, nefesi düzeldi. Seraphine gülümsüyor.', { n: 5 })] }],
    odul: 'Artı elli Yeşil Yıldız Ekolü kıdemi. Savaştan sonra mürettebatın stresi ve yaraları yarı sürede iyileşir.' },
  caelum: { ad: 'Kör Uçuş', ortam: 'ortam_t_okyanus', giris: ['Caelum astral geçitte seni Mormon Denizi\'nin fırtınasına taşıyor: "Harita yok. Yalnız rüzgâr ve dalga; tehlike hangi yandan gelirse ters yana kaç."'],
    adimlar: [{ op: [A('kacin', 'Fırtına rotası', 'Dalga hangi yandan vurursa ters yana kaydır. Beş kez.', 'Fırtınanın öbür yakasındasın. Caelum: "Gözsüz uçan yolu kısaltır."', { n: 5 })] }],
    odul: 'Artı elli Gümüş Yıldız Ekolü kıdemi. Derin uzay ile Tonoflenya arası sıçrama ve Tonoflenya içi seyahat süreleri yüzde yirmi kısa.' },
  kaelis: { ad: 'Kendi Sesinle Savaş', ortam: 'ortam_t_ygk', giris: ['Akustik oda. Kaelis: "Şimdi duyduğun ses senin saldırın. Ama onu ben çalıyorum."'],
    adimlar: [{ savas: { dusmanlar: ['ses_illuzyonu'], ortam: 'kara', tier: 3, giris: 'Ses illüzyonu senin saldırı sesini taklit ediyor ve sahte yönlerden vuruyor: gerçek nefesi bul.' }, bitis: 'İllüzyon dağıldı. Kaelis kendi sesine dönüyor: "Artık sahte gürültüyü daha çabuk kurarsın."' }],
    odul: 'Artı elli Mavi Yıldız Ekolü kıdemi. Savaşta yetenekler, sahte gürültü ve şaşırtma bir tur daha hızlı dolar.' },
  zeva: { ad: 'Ağırlık Merkezi', ortam: 'ortam_t_hangar', giris: ['Zeva denge platformunu açıyor: "Ağırlık bir yana kayıyor; sesini dinle ve merkeze çek."'],
    adimlar: [{ op: [A('denge', 'Denge platformu', 'Platformun tonu kayıyor: sürükleyerek merkeze çek ve sabit tut.', 'Platform dengede. Zeva başını sallıyor: "Mekiklerin sana teşekkür edecek."')] }],
    odul: 'Artı elli Gümüş Yıldız Ekolü kıdemi. Yüzey araçların ve mekiklerin engebeli, tehlikeli arazide aldığı hasar yüzde otuz az.' },
};
for (const [id, t] of Object.entries(TESTLER)) {
  const k = AK_KISILER[id];
  hikayeEkle('ak_' + id, {
    kod: 'K-' + id, ad: 'Kürsü testi: ' + t.ad, veren: k.ad + ', ' + k.unvan, grup: 'akademi', ortam: t.ortam,
    tetik: () => false,
    giris: t.giris,
    adimlar: t.adimlar,
    odul: t.odul,
    bitince: (d) => {
      b(d)['ak_' + id] = true;
      SB.ekolKazan(d, k.ekol, 50);
      if (id === 'trellis') {
        const ta = tarim(d);
        ta.tohumlar.kukurt_sarmasigi = (ta.tohumlar.kukurt_sarmasigi || 0) + 2;
      }
    },
  });
}

// --- Dört kilit figür: Ignador'un askerî reformu ---
hikayeEkle('ak_darbe', {
  kod: 'K-ignador', ad: 'Konsey mi, reform mu?', veren: 'Ağır Plazma Talimgâhı Eğitmeni Ignador', grup: 'akademi', ortam: 'ortam_t_ygk',
  tetik: () => false,
  giris: [
    'Talimgâhta plazma mermilerinin kokusu. Ignador sesini alçaltıyor: "Konsey nutuk atarken sınırlarımız yanıyor, Kaptan. Muhafızların yarısı benimle. Valen\'i görevden alalım; Akademiyi bir ordu gibi yönetelim."',
    'Uzaktan, altıncı katın kubbesinde Valen Lazeria\'nın sakin sesi yankılanıyor.',
  ],
  adimlar: [],
  kararSoru: 'Kimin yanında duracaksın?',
  kararlar: [
    { etiket: 'Ignador\'la darbeye katıl', sonuc: 'Valen Lazeria eksi dördüncü kattaki stasis hücrelerine kapatıldı; Konsey Vekili Morvenna Kael yönetimi devraldı. Ignador\'un ağır talimi senin: karada birincil atış yüzde on güçlü, T-06 gözetmen indirimi sürüyor. Konsey desteği zayıfladı.',
      yap: (d) => { b(d).valenKapali = true; b(d).morvennaYonetim = true; gucEkle(d, 'ygk', -20); } },
    { etiket: 'Valen\'i koru, darbeyi Konsey\'e bildir', sonuc: 'Valen yerinde; diplomatik erişim ve Konsey desteği tam. Ignador kırgın: T-06 taslağını yine verir ama başında durduğunda indirim yapmaz.',
      yap: (d) => { b(d).ignadorKirgin = true; gucEkle(d, 'ygk', 15); } },
  ],
  odul: '',
});

// --- Eksi dört stasis tutsakları ---
hikayeEkle('ak_zephyra', {
  kod: 'K-zephyra', ad: 'Göğün Hiddeti', veren: 'Stasis tutsağı Zephyra', grup: 'akademi', ortam: 'ortam_reaktor',
  tetik: () => false,
  giris: ['Zephyra\'nın hücresinde kriyo-tüp nabızları hızlanıyor; dar camın ardında klostrofobik bir kriz. Kanatlarının duvara sürtünmesi, kesik nefesler.'],
  adimlar: [{ op: [A('ritim', 'Hücreyi yatıştır', 'Kriyo-tüpün nabzına eşlik et: her atışta tek dokun, dört kez; Zephyra\'nın nefesi seninkine uysun.', 'Zephyra\'nın nefesi yavaşladı. "Teşekkür ederim... şimdi ne olacak?"', { n: 4 })] }],
  kararSoru: 'Zephyra\'yı ne yapacaksın?',
  kararlar: [
    { etiket: 'Hücreyi aç, serbest bırak', sonuc: 'Zephyra kanatlarını açıp gökyüzüne yükseldi; giderken sana Fırtına Kalkanı\'nı bıraktı: hava ve yıldırım saldırılarına direnç, Arin ve Güney rotalarında rüzgâr senden yana.', yap: (d) => { b(d).zephyraSerbest = true; ZN.ekle(d, 'firtina_kalkani', 1); } },
    { etiket: 'Hücrede bırak; yalnız krizini yatıştırmak yeterli', sonuc: 'Zephyra camın ardında sessizce sana bakıyor. Akademi minnettar; YGK itibarı arttı.', yap: (d) => { gucEkle(d, 'ygk', 10); } },
  ],
  odul: '',
});
hikayeEkle('ak_morwenna', {
  kod: 'K-morwenna', ad: 'Karanlık Ses Bükücü', veren: 'Stasis tutsağı Morwenna', grup: 'akademi', ortam: 'ortam_reaktor',
  tetik: () => false,
  giris: ['Morwenna\'nın tüpünden duvarlar boyunca kayan bir fısıltı: "Sharon\'un sesi beş sestir, Kaptan. Ben o seslerden birini öğrenmeye adaydım. Beni ne yapacaksın?"'],
  adimlar: [],
  kararSoru: 'Morwenna\'yla ne yapacaksın?',
  kararlar: [
    { etiket: 'Serbest bırak', sonuc: 'Morwenna tüpten çıktı ve Dünya Çivisi\'nde Sharon\'un fısıltısını sana karşı bükeceğine söz verdi: Final on sekizde Sharon\'un zihin saldırıları yüzde yirmi beş zayıf.', yap: (d) => { b(d).morwennaYanda = true; } },
    { etiket: 'Hücreden konuşarak ikna et, tüpte kalsın', kosul: (d) => (d.tf && d.tf.guven && d.tf.guven.kefius >= 30) || !!b(d).ak_silas, kosulMetni: 'İkna için Kefius\'un güveni ya da Silas Vex\'in gölge dersi gerekir', sonuc: 'Morwenna tüpün içinden sana Sharon\'un seslerini öğretti; serbest kalmadan da Final on sekizde zihin saldırıları yüzde yirmi beş zayıf.', yap: (d) => { b(d).morwennaYanda = true; gucEkle(d, 'ygk', 5); } },
    { etiket: 'Hücrede bırak, yalnız verisini al', sonuc: 'Morwenna\'nın kara aether verisi YGK laboratuvarında: iki kara aether ve yüz elli bilim puanı.', yap: (d) => { ZN.ekle(d, 'kara_aether', 2); if (!d.yan) d.yan = { aktif: null, biten: [], karar: {}, itibar: {}, bilim: 0, ozel: [] }; d.yan.bilim = (d.yan.bilim || 0) + 150; } },
  ],
  odul: '',
});

// --- Noktalar ---
export function noktaMi(id) {
  return !!AK_NOKTALAR[id];
}
function testDurumu(d, id) {
  const k = AK_KISILER[id];
  if (!TESTLER[id]) return null;
  if (bittiMi(d, 'ak_' + id)) return 'bitti';
  return k.kosul && !k.kosul(d) ? 'kilitli' : 'acik';
}
export function noktaEylemleri(d, id) {
  const n = AK_NOKTALAR[id];
  if (n.akademi === 'cip') return [...(ZN.miktar(d, 'boyut_cipi') || b(d).tixieCip ? [] : [{ id: 'ak_al', etiket: 'Bir boyut sabitleyici çip al' }]), { id: 'incele', etiket: 'İncele' }];
  const k = AK_KISILER[n.akademi];
  const e = [{ id: 'konus', etiket: 'Konuş' }];
  const t = testDurumu(d, n.akademi);
  if (t === 'acik') e.push({ id: 'ak_test', etiket: 'Kürsü testi: ' + TESTLER[n.akademi].ad });
  if (t === 'kilitli') e.push({ id: 'ak_test', etiket: 'Kürsü testi: ' + TESTLER[n.akademi].ad + ' (' + k.kosulMetni + ')' });
  if (k.mahkum && !bittiMi(d, 'ak_' + n.akademi)) e.push({ id: 'ak_hucre', etiket: n.akademi === 'zephyra' ? 'Hücreye yaklaş' : 'Tüple konuş' });
  e.push({ id: 'incele', etiket: 'İncele' });
  return e;
}
export function eylemUygula(d, id, eid) {
  const n = AK_NOKTALAR[id];
  if (eid === 'incele') return { metin: n.tarif };
  if (eid === 'ak_al') {
    ZN.ekle(d, 'boyut_cipi', 1);
    return { metin: 'Raftan bir boyut sabitleyici çip aldın; avucunda vınlıyor. Kat ikideki Tixie bunu arıyordu.', ses: 'bip' };
  }
  const kid = n.akademi;
  const k = AK_KISILER[kid];
  if (eid === 'konus') {
    if (!d.kodeks.some((x) => x.id === 'kisi_' + kid)) {
      d.kodeks.push({ id: 'kisi_' + kid, ad: k.ad, tarif: k.unvan + '. ' + k.tarif, itibar: 10 });
      d.itibar += 10;
    }
    const t = testDurumu(d, kid);
    return { metin: k.soz + (t === 'bitti' ? ' Testini geçtin; kürsü seni tanıyor.' : '') };
  }
  if (eid === 'ak_test') {
    const t = testDurumu(d, kid);
    if (t === 'kilitli') return { metin: k.ad + ': "Henüz değil, Kaptan." Test ' + k.kosulMetni + ' açılır.', ses: 'red' };
    if (t === 'bitti') return { metin: 'Bu testi geçtin.', ses: 'red' };
    if (!baslat(d, 'ak_' + kid)) return { metin: 'Önce süren hikâyeyi bitir.', ses: 'red' };
    return { metin: '' };
  }
  if (eid === 'ak_hucre') {
    if (!baslat(d, 'ak_' + kid)) return { metin: 'Önce süren hikâyeyi bitir.', ses: 'red' };
    return { metin: '' };
  }
  return { metin: '' };
}
// Var olan karakter noktalarına (Ignador, Tixie) ek eylemler
export function ekEylemler(d, id) {
  if (id === 'k_ignador' && b(d).ygkKayit && fb(d, 1) && !bittiMi(d, 'ak_darbe')) return [{ id: 'akd_reform', etiket: 'Ignador\'un askerî reformunu dinle' }];
  if (id === 'k_tixie' && !b(d).tixieIhbar && !b(d).tixieCip) {
    const e = [];
    if (ZN.miktar(d, 'boyut_cipi') > 0) e.push({ id: 'akd_cip', etiket: 'Boyut sabitleyici çipi Tixie\'ye ver' });
    e.push({ id: 'akd_ihbar', etiket: 'Tixie\'yi YGK muhafızlarına ihbar et' });
    return e;
  }
  return [];
}
export function ekEylemMi(eid) {
  return eid.indexOf('akd_') === 0;
}
export function ekEylemUygula(d, id, eid) {
  if (eid === 'akd_reform') {
    if (!baslat(d, 'ak_darbe')) return { metin: 'Önce süren hikâyeyi bitir.', ses: 'red' };
    return { metin: '' };
  }
  if (eid === 'akd_cip') {
    ZN.ekle(d, 'boyut_cipi', -1);
    b(d).tixieCip = true;
    return { metin: 'Tixie çipi ızgaradan kapıyor: "Oho! Gerçek bir Oculon sabitleyicisi!" T-03 Katlanmış Cep-Ambar taslağı açıldı; melez tezgâhta üretebilirsin.', ses: 'sinyal' };
  }
  if (eid === 'akd_ihbar') {
    b(d).tixieIhbar = true;
    gucEkle(d, 'ygk', 15);
    return { metin: 'Muhafızlar havalandırmaya iniyor; borulardan hızlı, küçük adımların uzaklaşan sesi. Tixie kaçtı ve kayboldu. YGK itibarı arttı; T-03 Cep-Ambar taslağı artık yok.', ses: 'alarm' };
  }
  return { metin: '' };
}
