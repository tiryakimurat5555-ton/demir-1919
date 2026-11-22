// Tonoflenya bölgesel görevleri, seyahat kuralları ve Büyük Ambargo (belgeler/v4/tonoflenya-bolgesel-gorevler-ve-ambargo-
// entegrasyonu.txt).
// - Bölüm 1 seyahat ve geçit kuralları: seyahatKurali(d, y, hedef) (atlas.js seyahatEt çağırır) ve ygk_kuzeybati kapısının
//   koşulu (harita.js): Magentor Final 1 ister; Tentran izni ya da ışık tozu harcı; Arin hava izni (Atmosphere-X ya da YGK
//   kaydı; Barracuda korunduysa yalnız Atmosphere-X); Zorah fırtınası Ajmero küresi yoksa ağır; Mormon girdabı Sınıf II gemi
//   ve pusula/bağışıklık ister; Zinas fırtınasında Çöl Tilkisi ya da Sınıf II gemi avantaj.
// - Bölüm 2 dört bölge × üç aşama (hikâye motoru, bl_<lider>_<n>): 1. aşama Final 1 + o kuşakta olmak, 2. aşama Final 6,
//   3. aşama Final 10 ya da komuta merkezi; üçüncü aşama liderin taslağını ve Tether-Key mekik hakkını açar (bayrak
//   mekik_<lider>; karakter.js mekikKosulu bunu ister).
// - Bölüm 3 Büyük Ambargo (hikâye bl_ambargo): Final 12'den sonra, Final 16'dan önce; bayrak.ambargo 'merkez' | 'tasra'.
import { hikayeEkle, bittiMi } from '../hikaye';
import * as ZN from './zanaat';
import { gucEkle, gucItibari } from './kisiler';

const A = (tur, ad, giris, bitis, ek) => ({ tur, ad, giris, bitis, ...(ek || {}) });
const b = (d) => d.bayrak;
const fb = (d, n) => !!(d.tf && d.tf.biten && d.tf.biten.includes(n));
const S = (dusmanlar, adlar, tier, ek = {}) => ({ dusmanlar, adlar, ortam: ek.ortam || 'kara', tier, gelis: dusmanlar.length > 1 ? 'kiskac' : 'tek', ...ek });
const kaynak = (d, id, n) => {
  d.koloni.kaynaklar[id] = (d.koloni.kaynaklar[id] || 0) + n;
};

// Bölüm 1 seyahat kuralları bağımlılıksız gecitler.js'te (atlas.js döngüye girmesin diye)
export { magentorKapali, seyahatKurali, zinasAvantaji } from './gecitler';

// --- Bölüm 2: dört bölge × üç aşama ---
const KUSAK_MEKAN = (d, kusak, bolgeler) => !!d.tBolge && bolgeler[d.tBolge] && bolgeler[d.tBolge].kusak === kusak;
let BOLGELER_REF = {};
export function bolgeleriTanit(B) {
  BOLGELER_REF = B;
}
const asama = (lider, n) => 'bl_' + lider + '_' + n;
function tetik(lider, kusak, n) {
  return (d) => {
    if (!b(d).tonoflenyaGoruldu) return false;
    if (n === 1) return fb(d, 1) && KUSAK_MEKAN(d, kusak, BOLGELER_REF);
    if (!bittiMi(d, asama(lider, n - 1))) return false;
    if (n === 2) return fb(d, 6);
    return fb(d, 10) || (d.koloni.binalar || []).includes('komuta_merkezi');
  };
}
const ZINCIR = {
  oronte: { kusak: 'bati', guc: 'bati', ad: 'Oronte', taslak: 'civa_plakasi', ortam: 'ortam_t_sanayi', asamalar: [
    { ad: 'Filtra Çarklarının Yağlanması', veren: 'Oronte, Filtra Maden Sendikası', giris: ['Galeri dördün derinliğinden sıkışmış bir maden vagonunun gıcırtısı ve basınç tıslaması. Oronte: "Vagon kilitlendi, içerideki otomat da çıldırdı. Basıncı dengele, otomatı indir."'],
      adimlar: [{ op: [A('basinc', 'Vagon basıncı', 'Vagonun hidrolikleri dolarken basınç alarmını duy; tam eşikte çift dokun. Üç kez.', 'Vagon kurtuldu; ama galeride bir şey kıpırdıyor.')] }, { savas: S(['kadim_otomat'], ['zırhlı maden otomatı'], 3), bitis: 'Otomat sustu; galeri açık.' }],
      odul: 'Batı itibarı artı yirmi, elli kızılkaya titanyumu.', bitince: (d) => { gucEkle(d, 'bati', 20); kaynak(d, 'kizilkaya_titanyumu', 50); } },
    { ad: 'Julithan Ambargosu', veren: 'Oronte', giris: ['Oronte: "Şifreli kargomuz Julithan gemilerinin hedefinde. Konvoyu koru; sonra kargo kimin olacak, sen karar ver."'],
      adimlar: [{ savas: S(['korsan_korvet'], ['Julithan korveti'], 3, { ortam: 'uzay' }), bitis: 'Julithan korveti geri çekildi; konvoy güvende.' }],
      kararSoru: 'Şifreli kargo kimin olacak?',
      kararlar: [
        { etiket: 'Kargoyu sendikaya ver', sonuc: 'Oronte minnettar; Batı kuşağı seni tanıyor.', yap: (d) => gucEkle(d, 'bati', 30) },
        { etiket: 'Kargoyu başkente bildir', sonuc: 'YGK minnettar; Oronte küstü.', yap: (d) => { gucEkle(d, 'ygk', 25); gucEkle(d, 'bati', -10); b(d).oronteKus = true; } },
      ] },
    { ad: 'Demir ve Cıva İttifakı', veren: 'Oronte', giris: ['Filtra barikatının önünde ağır hidrolik gıcırtılar. Oronte: "İki ağır maden korsanı barikatı kırıyor. Onları temizle; sendika seninle ittifak kurar."'],
      adimlar: [{ savas: S(['agir_maden_korsani', 'agir_maden_korsani'], null, 4, { ortam: 'uzay' }), bitis: 'Barikat temizlendi.' }],
      odul: 'T-02 Akışkan Cıva Plakası taslağı ve Oronte\'nin Tether-Key mekik hakkı: kolonideyken Aethelis\'te zırh ve araç maliyeti yarı.' },
  ] },
  barracuda: { kusak: 'guney', guc: 'guney', ad: 'Kaptan Barracuda', taslak: 'plazma_pencesi', ortam: 'ortam_t_liman', asamalar: [
    { ad: 'Parlayan Sığlıkların Baskını', veren: 'Kaptan Barracuda, Fleeplee', giris: ['Parlayan toz sığlıklarında dalga sesi. Barracuda: "Veradon devriye botu peşimizde. Sesle atlat ya da avcı botunu sustur."'],
      adimlar: [{ op: [A('kacin', 'Sığlıklarda kaçış', 'Devriyenin sonar darbesi hangi yandan gelirse ters yana kaydır. Dört kez.', 'Devriye seni kaybetti; ama bir avcı botu hâlâ peşinde.', { n: 4 })] }, { savas: S(['korsan_avci'], ['Veradon avcı botu'], 3, { ortam: 'uzay' }), bitis: 'Avcı botu etkisiz.' }],
      odul: 'Güney itibarı artı yirmi, yüz gram Fenrir ışık tozu.', bitince: (d) => { gucEkle(d, 'guney', 20); kaynak(d, 'isik_tozu', 100); } },
    { ad: 'Arin Göksel Ambargosu', veren: 'Barracuda ve Arin elçisi Aethelgard', giris: ['Arin\'in resmî elçisi Aethelgard gizlice yaklaşıyor: "Korsan iskelesini sabote et, Kaptan; Arin hava sahası sana sonsuza dek açık olur." Barracuda arkadan sesleniyor: "Bizi satacak mısın?"'],
      adimlar: [],
      kararSoru: 'Kimin yanındasın?',
      kararlar: [
        { etiket: 'Aethelgard\'a yardım et, iskeleyi sabote et', sonuc: 'Arin minnettar; Barracuda öfkeli ama zincir sürüyor.', yap: (d) => { gucEkle(d, 'guney', 10); b(d).arinDostu = true; } },
        { etiket: 'Barracuda\'yı koru', sonuc: 'Arin hava sahası sana kapandı (yalnız Atmosphere-X ile inilir). Sürgün mucit Nyxara Vel\'din Fleeplee\'de olduğu için Tether-Key yine üretilebilir.', yap: (d) => { gucEkle(d, 'guney', 25); b(d).arinKapali = true; } },
      ] },
    { ad: 'Fenrir Hayalet Filosu', veren: 'Kaptan Barracuda', giris: ['Fleeplee açıklarında kaybolup beliren karanlık motor sesleri. Barracuda: "Gölge korsanı ve bir dron taşıyıcısı pusuda. Bu benim denizim; birlikte temizleyelim."'],
      adimlar: [{ savas: S(['golge_gemisi', 'dron_tasiyici'], ['gölge korsanı', null], 4, { ortam: 'uzay' }), bitis: 'Hayalet filo dağıldı.' }],
      odul: 'T-07 Plazma Pençeli Kesici taslağı ve Barracuda\'nın Tether-Key mekik hakkı: kolonideyken kargo kaybı sıfır, maden ambarları korunur.' },
  ] },
  zeno: { kusak: 'dogu', guc: 'dogu', ad: 'Silahşör Zeno', ortam: 'ortam_t_col', asamalar: [
    { ad: 'Cam Kumların Fırtınası', veren: 'Silahşör Zeno, Zorah Kervan Yolu', giris: ['Çöl fırtınası; kum camda tıslıyor. Zeno: "Kervan kayboldu. Sesli pusulanı aç, onları bul; kumdan çıkanlarla ben ilgilenmem, sen ilgilenirsin."'],
      adimlar: [{ op: [A('yaklas', 'Sesli pusula', 'Kervan çanının sesine dön: sağa sola kaydır, iki kulakta eşitle; yukarı kaydırıp ilerle.', 'Kervan bulundu; ama kumun altında bir şey bekliyor.', { mesafe: 28, frek: 330 })] }, { savas: S(['cam_akrebi', 'haydut_cetesi'], ['kum akrebi', 'çöl haydudu'], 3), bitis: 'Pusu dağıldı; kervan yola çıktı.' }],
      odul: 'Doğu itibarı artı yirmi, otuz rezonans camı.', bitince: (d) => { gucEkle(d, 'dogu', 20); kaynak(d, 'rezonans_cami', 30); } },
    { ad: 'Vaha Kuşatması', veren: 'Silahşör Zeno', giris: ['Doğu vahasında hurma yaprakları arasında tüfek kurma şakırtıları. Zeno: "Paralı askerler vahayı kuşattı. Kır onları; sonra vaha kimin, sen söyle."'],
      adimlar: [{ savas: S(['haydut_cetesi', 'haydut_cetesi'], ['paralı asker', 'paralı asker'], 4), bitis: 'Paralı askerler kaçtı; vaha kurtuldu.' }],
      kararSoru: 'Vaha kimin olacak?',
      kararlar: [
        { etiket: 'Vahayı Çöl Loncası\'na bırak', sonuc: 'Lonca seni kardeş bildi.', yap: (d) => gucEkle(d, 'dogu', 25) },
        { etiket: 'Vahayı başkent ve Anitor vergi hattına bağla', sonuc: 'Başkent ve Anitor memnun; çöl kabileleri kırgın.', yap: (d) => { gucEkle(d, 'ygk', 15); gucEkle(d, 'bati', 10); gucEkle(d, 'dogu', -10); } },
      ] },
    { ad: 'Mavi Hardrin Kanunsuzları', veren: 'Silahşör Zeno', giris: ['Nirdol Boynu\'nda alçak ayin fısıltıları. Zeno: "Haydut lideri bir tarikat muhafızıyla birlikte. Düello onların, son kurşun bizim."'],
      adimlar: [{ savas: S(['haydut_cetesi', 'tarikat_muhafizi'], ['haydut lideri', null], 4), bitis: 'Kanunsuzlar düştü.' }],
      odul: 'Doğu itibarı artı otuz beş ve Zeno\'nun Tether-Key mekik hakkı: kolonideyken koloni savunması yüzde kırk, Aethelis\'te pusu riski sıfır.', bitince: (d) => gucEkle(d, 'dogu', 35) },
  ] },
  mirelza: { kusak: 'kuzey', guc: 'kuzey', ad: 'Mirelza', taslak: 'sonik_tufek', ortam: 'ortam_t_zeris', asamalar: [
    { ad: 'Donmuş Frekansların Kaydı', veren: 'Mirelza, Zeris Dış Kulesi', giris: ['Kule eteklerinde donmuş rezonans kristallerinin kırık tınıları. Mirelza: "Her biri bir kayıt. Akort et, sesleri geri gelsin."'],
      adimlar: [{ op: [A('frekans', 'Donmuş kristal', 'Kristalin tınısını dinle; iki parmakla çevirerek akort et.', 'Kristal yeniden çınlıyor.'), A('frekans', 'İkinci kristal', 'Bir kristal daha: iki parmakla çevir, akort et.', 'Kayıtlar geri geldi.')] }],
      odul: 'Kuzey itibarı artı yirmi, otuz Norvask kara buzu.', bitince: (d) => { gucEkle(d, 'kuzey', 20); kaynak(d, 'kara_buz', 30); } },
    { ad: 'Norvask Lordlarının Kazısı', veren: 'Mirelza', giris: ['Buzun altından servo gıcırtıları. Mirelza: "Norvask lordları kadim bir şey kazdı ve uyandırdı. İki otomat tonunu değiştiriyor."'],
      adimlar: [{ savas: S(['kadim_otomat', 'kadim_otomat'], null, 4), bitis: 'Otomatlar buzda kıpırtısız.' }],
      kararSoru: 'Kazı ne olacak?',
      kararlar: [
        { etiket: 'Kazıyı durdur, buzu yeniden mühürle', sonuc: 'Mirelza memnun; Kuzey güveniyor.', yap: (d) => gucEkle(d, 'kuzey', 25) },
        { etiket: 'Kazıyı ele geçir', sonuc: 'Kadim parçalar senin; Norvask lordları kırgın.', yap: (d) => { gucEkle(d, 'kuzey', -10); d.koloni.parcalar.mikrocip = (d.koloni.parcalar.mikrocip || 0) + 10; kaynak(d, 'kara_buz', 20); } },
      ] },
    { ad: 'Zeris\'in Göksel Şarkısı', veren: 'Mirelza', giris: ['Kule tepesinde sonik bir parazit; şarkıyı boğan kanat çırpınışları. Mirelza: "Alt Evren sürüsü kuleme yuva yaptı. Temizle; şarkı senin olsun."'],
      adimlar: [{ savas: S(['yildiz_paraziti'], ['Alt Evren sürüsü'], 4), bitis: 'Sürü dağıldı; kule yeniden şarkı söylüyor.' }],
      odul: 'T-05 Sonik Çığlık Tüfeği taslağı ve Mirelza\'nın Tether-Key mekik hakkı: kolonideyken radar menzili iki kat, sera yüzde otuz hızlı.' },
  ] },
};
export const LIDER_SIRASI = ['oronte', 'barracuda', 'zeno', 'mirelza'];
for (const [lider, z] of Object.entries(ZINCIR)) {
  z.asamalar.forEach((a, i) => {
    const n = i + 1;
    hikayeEkle(asama(lider, n), {
      kod: 'BL-' + lider + '-' + n, ad: z.ad + ', ' + n + '. aşama: ' + a.ad, veren: a.veren, grup: 'bolgesel', ortam: z.ortam,
      tetik: tetik(lider, z.kusak, n),
      giris: a.giris,
      adimlar: a.adimlar,
      kararSoru: a.kararSoru,
      kararlar: a.kararlar,
      odul: a.odul || '',
      bitince: (d, k) => {
        if (a.bitince) a.bitince(d, k);
        if (n === 3) {
          b(d)['mekik_' + lider] = true;
          if (z.taslak) b(d)['taslak_' + z.taslak] = true;
        }
      },
    });
  });
}
// Taslak kilitleri: bölgesel zincirin üçüncü aşaması
for (const [lider, z] of Object.entries(ZINCIR)) {
  if (!z.taslak || !ZN.TARIFLER[z.taslak]) continue;
  const t = ZN.TARIFLER[z.taslak];
  const eski = t.kosul;
  t.kosul = (d) => !!b(d)['taslak_' + z.taslak] && (!eski || eski(d));
  t.kosulMetni = z.ad + ' ile bölgesel ittifak zincirinin üçüncü aşaması bitince taslak açılır.' + (t.kosulMetni ? ' ' + t.kosulMetni : '');
}
export function mekikKilidi(d, lider) {
  if (!ZINCIR[lider]) return null;
  if (b(d).ambargoAski === lider && !fb(d, 20)) return ZINCIR[lider].ad + ' ambargo yüzünden yollarını kesti; mekik hakkı finalden sonraya kadar askıda.';
  if (!b(d)['mekik_' + lider]) return ZINCIR[lider].ad + ' ile bölgesel ittifak zinciri bitmeden Tether-Key mekik hattı kurulmaz.';
  return null;
}

// --- Bölüm 3: Büyük Tonoflenya Ambargosu ---
hikayeEkle('bl_ambargo', {
  kod: 'BL-ambargo', ad: 'Büyük Tonoflenya Ambargosu', veren: 'YGK Yönetimi', grup: 'bolgesel', ortam: 'ortam_t_ygk',
  tetik: (d) => fb(d, 12) && !fb(d, 16),
  giris: (d) => [
    (b(d).valenKapali ? 'Konsey Vekili Morvenna Kael' : 'Valen Lazeria') + ' Yüksek Konsey kubbesinden bütün kuşaklara sesleniyor: "Taşradaki isyanlar ve kaçakçılık bitecek. Bugünden itibaren Büyük Tonoflenya Ambargosu yürürlükte: dış kuşaklar vergilerini ve malzemelerini başkente aktaracak."',
    'Telsizinde dört kuşağın liderlerinin sesleri birbirine karışıyor: Oronte, Barracuda, Zeno, Mirelza. Herkes senin ne yapacağını bekliyor.',
  ],
  adimlar: [],
  kararSoru: 'Kimin yanında duracaksın?',
  kararlar: [
    { etiket: 'Başkenti ve YGK merkezini destekle', sonuc: 'Magentor ve Akademi kapıları sonuna kadar açık; Final on yedi ve on sekizde YGK büyücü takviyesi ve tam aether ikmali gelecek.',
      yap: (d) => {
        b(d).ambargo = 'merkez';
        gucEkle(d, 'ygk', 20);
        // İtibarı daha düşük olan dış lider yollarını keser
        const kim = gucItibari(d, 'bati') <= gucItibari(d, 'guney') ? 'oronte' : 'barracuda';
        b(d).ambargoAski = kim;
        gucEkle(d, kim === 'oronte' ? 'bati' : 'guney', -15);
      } },
    { etiket: 'Taşra ittifakını, dört bölgeyi destekle', sonuc: 'Dört kuşağın mekik hatları, pazarları ve Tether-Key ikmalleri açık; Final on yedide dört bölgenin gönüllü filosu kuşatmayı dışarıdan kıracak. Bedeli: Magentor kapıları geçici olarak kapalı; Akademiye yalnız eksi birinci kattaki Kör Rıhtım\'dan gizlice girilir.',
      yap: (d) => {
        b(d).ambargo = 'tasra';
        gucEkle(d, 'ygk', -20);
        for (const g of ['bati', 'guney', 'dogu', 'kuzey']) gucEkle(d, g, 10);
      } },
  ],
  odul: (d) => (b(d).ambargo === 'merkez' && b(d).ambargoAski ? ZINCIR[b(d).ambargoAski].ad + ' yollarını kesti: mekik hakkı finalden sonraya kadar askıda.' : ''),
});
// Final 17-18 cephesi: ambargo kararı (savas.js okur)
export function ambargoCephesi(d) {
  if (!d.tf || ![17, 18].includes(d.tf.aktif)) return null;
  if (b(d).ambargo === 'merkez') return { isaret: 3, soz: 'YGK büyücü takviyesi yanında; aether ikmali tam.' };
  if (b(d).ambargo === 'tasra' && d.tf.aktif === 17) return { isaret: 3, soz: 'Dört bölgenin gönüllü filosu kuşatmayı dışarıdan kırıyor!' };
  return null;
}
