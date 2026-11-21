// İkinci yüzey görevi "Jeotermal Sondaj ve İzotop Hasadı" (belgeler/uzay-oyunu-tasarim-ve-senaryo.md bölüm 1:
// "Manyetik sırtlardaki gaz bacalarına termal sondalar yerleştirme, aşırı basınç valflerini elle dengeleme ve
// gemi reaktörünü ateşleyecek graviton yakıt çekirdeği hammaddesini emniyete alma").
// Saf JavaScript. Bayraklar: sondaAlindi, maske, sonda_<baca>, valf_<baca> (başarı sayısı), baca_<baca> (bitti),
// sondaj (üç baca bitti), dokumhane. Dökümhane kurulunca koloni ikinci kademeye çıkar.
import { NOKTALAR } from './harita';
import { miniValfBitti } from './mini';
import { HAMMADDELER, TESISLER, maliyetMetni } from '../veri/tesisler';

const b = (d) => d.bayrak;
const ad = (d, rol) => (d.murettebat[rol] ? d.murettebat[rol].ad : '');
const ilkAd = (d, rol) => ad(d, rol).split(' ')[0];
const BACALAR = ['baca_1', 'baca_2', 'baca_3'];
export const IZOTOP_BACA_BASI = 2;
export const VALF_GEREKEN = 3;

export function bacaSayisi(d) {
  return BACALAR.filter((x) => b(d)['baca_' + x]).length;
}

// --- Sahneler ---
export const SAHNELER = {
  bayilma: {
    baslik: 'Kapsülde',
    ortam: 'ortam_kapsul',
    metin: (d) => [
      'Kulaklarında bir uğultu, ağzında metal tadı. Gözlerini açtığında kapsülün ranzasındasın.',
      d.bayilmaNedeni === 'soguk'
        ? 'Hekim ' + ad(d, 2) + ': "Donmak üzereydin. ' + ilkAd(d, 0) + ' seni halatla yukarı çekti. Termal giysi olmadan o mağarada uzun kalma."'
        : d.bayilmaNedeni === 'civa'
          ? 'Hekim ' + ad(d, 2) + ': "Cıva buharı maskeyi bile aşar. ' + ilkAd(d, 0) + ' seni sırtında taşıdı. Şelalelerde kısa kal."'
          : 'Hekim ' + ad(d, 2) + ': "Maske kükürdü süzer ama sonsuza dek değil. Sırtlarda fazla kaldın; ' + ilkAd(d, 0) + ' seni sırtında taşıdı. Bacaların dibinde oyalanma, arada temiz havaya çık."',
      'Taşıdığın her şey yanında. Yerleştirdiğin sondalar yerinde duruyor.',
    ],
    secenekler: () => [{ etiket: 'Kalk', sonra: null }],
    bitisSozu: 'Kapsülün içindesin. Maruziyet sıfırlandı.',
  },
  sondaj_tamam: {
    baslik: 'Graviton çekirdeği',
    ortam: 'ortam_sirtlar',
    efekt: ['sinyal'],
    metin: (d) => [
      'Üçüncü valf de dengede. Bacaların öfkeli fışkırması yerini düzenli bir nefese bırakıyor; sondaların ucunda ağır izotop birikiyor.',
      ilkAd(d, 0) + ' telsizden: "Kaptan, ölçüm geldi. Bu kadar saf izotopla bir graviton yakıt çekirdeği dökülür. Ama önce bir dökümhaneye ihtiyacımız var; bu sırtların bazaltı ve ağır metali tam aradığımız şey."',
      'Kapsül bilgisayarı: Graviton yakıt çekirdeği hammaddesi emniyete alındı. Ağır Alaşım Dökümhanesi planı açıldı.',
    ],
    secenekler: () => [{ etiket: 'Dökümhaneyi planla', sonra: null }],
    bitisSozu: 'Dökümhane için gerekenler: ' + maliyetMetni(TESISLER.dokumhane.maliyet) + '. Kapsüldeki merkez terminalinden kurulur.',
  },
  dokumhane: {
    baslik: 'Ağır Alaşım Dökümhanesi',
    ortam: 'ortam_vadi',
    efekt: ['jenerator', 'sinyal'],
    metin: (d) => [
      'Jeneratörün yanına üç bazalt duvar, bir ağır metal pota ve kapsülün ısı kalkanından sökülmüş bir fırın ağzı. ' + ilkAd(d, 0) + ' ilk ateşi yakıyor.',
      ilkAd(d, 0) + ', dökümhanenin ilk çelik kirişleriyle batı geçidindeki göçüğü açıyor.',
      'Gece boyunca vadide yeni bir ses var: ergimiş metalin derin fokurtusu ve soğuyan kalıpların çıtırtısı. İlk titanyum-karbon plaka sabaha karşı kalıptan çıkıyor.',
      'Kapsül bilgisayarı: Koloni kademesi yükseldi. Sağlamlaşmış Vaha.',
      'İkinci görev tamamlandı: Jeotermal Sondaj ve İzotop Hasadı.',
      ilkAd(d, 1) + ' kule başından: "Kaptan, batıdaki yarığın ardından düzenli bir uğultu geliyor. Rüzgâr değil. Bir makine sanki; ya da bir şarkı."',
    ],
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
    bitisSozu: 'Yeni görev: Antik Kseno-Laboratuvar Kazısı. Batı geçidi açıldı; önce jeneratörün başındaki mühendisle konuş.',
  },
};

// --- Görev ipucu ---
export function gorevIpucu(d) {
  const g = b(d);
  if (d.gorev.id === 'jeotermal') {
    const bas = 'Jeotermal Sondaj ve İzotop Hasadı. ';
    if (!g.sondaAlindi) return bas + 'Jeneratörün başındaki mühendisle konuş; termal sondaları o hazırlıyor.';
    if (!g.maske) return bas + 'Güneydeki kükürt gazına karşı kapsüldeki hekimden filtre maskesi iste.';
    const kalan = BACALAR.filter((x) => !g['baca_' + x]).map((x) => NOKTALAR[x].ad);
    if (kalan.length)
      return bas + 'Vadinin güneyindeki kanyon ağzından Manyetik Sırtlar\'a in. Gaz bacalarına sonda yerleştir ve valfleri dengele. Kalan: ' + kalan.join(', ') + '. Bacaların dibinde kükürt maruziyetin hızla artar; arada uzaklaş.';
    return bas + 'Bacalar dengede.';
  }
  if (d.gorev.id === 'dokumhane') {
    const m = TESISLER.dokumhane.maliyet;
    const k = d.koloni.kaynaklar;
    return (
      'Ağır Alaşım Dökümhanesi\'ni kur: kapsüldeki merkez terminalinden. Gerekenler: ' +
      maliyetMetni(m) +
      '. Elinde: ' +
      Object.keys(m)
        .map((x) => (k[x] || 0) + ' ' + HAMMADDELER[x].ad)
        .join(', ') +
      '. Sırtlarda bazalt yığınları ve ağır metal damarları var.'
    );
  }
  return '';
}

// --- Gaz bacaları ---
export function bacaMi(id) {
  return !!(NOKTALAR[id] && NOKTALAR[id].baca);
}

export function noktaEylemleri(d, id) {
  const g = b(d);
  const e = [{ id: 'incele', etiket: 'Bacayı dinle' }];
  if (g['baca_' + id]) return e;
  if (!g['sonda_' + id]) e.push({ id: 'sonda', etiket: 'Termal sondayı yerleştir', ipucu: d.envanter.includes('sonda') ? '' : 'Termal sonda gerekir.' });
  else e.push({ id: 'valf', etiket: 'Basınç valfini dengele', ipucu: (g['valf_' + id] || 0) + ' / ' + VALF_GEREKEN + ' tahliye.' });
  return e;
}

export function eylemUygula(d, id, eylemId) {
  const g = b(d);
  const n = NOKTALAR[id];
  if (eylemId === 'incele') {
    if (g['baca_' + id]) return { metin: n.ad + ' dengede: düzenli, derin bir nefes. Sondanın ucunda izotop tortusu.' };
    return { metin: n.tarif + (g['sonda_' + id] ? ' Sonda ağızda; valf göstergesi her fışkırmada tıkırdıyor.' : ' Ağzında sondanın oturacağı bir boşluk var.') };
  }
  if (eylemId === 'sonda') {
    if (!d.envanter.includes('sonda')) return { metin: 'Elinde sonda kalmadı.', ses: 'red' };
    if (!d.bayrak.maske) return { metin: 'Maskesiz burada duramazsın.', ses: 'red' };
    d.envanter.splice(d.envanter.indexOf('sonda'), 1);
    g['sonda_' + id] = true;
    return { metin: 'Sondayı bacanın ağzına dayayıp çakıyorsun. Seramik uç ısıyla tıslıyor, valf kolu yerine oturuyor. Basınç birikecek; doğru anda tahliye etmelisin.', ses: 'sonda' };
  }
  if (eylemId === 'valf') return { metin: '', valf: true };
  return { metin: '' };
}

// --- Valf dengeleme ---
// Basınç 0'dan 1'e yükselir. 0,78'den sonra alarm çalar: o pencerede tahliye edersen (çift dokun) başarı.
// Erken tahliye basıncı boşa harcar; 1'e ulaşırsa baca patlar: kükürt maruziyeti +20. Üç başarı = baca dengede.
export const ALARM_ESIGI = 0.78;
const VALF_BAS = 0.15;
const VALF_HIZ = 0.07; // saniyede; her başarıda hızlanır

// amac: 'sondaj' (ikinci görev) ya da 'sikistirma' (gorev6.js, izotop sıkıştırma: aynı dengeleme, ayrı sayaç)
const sayacAnahtari = (v) => (v.amac === 'sikistirma' ? 'sikistir_' : v.amac === 'mini_kompresor' ? 'kompresor_' : 'valf_') + v.baca;
export function valfBaslat(d, id, amac = 'sondaj') {
  d.valf = { baca: id, basinc: VALF_BAS, alarm: false, amac };
  const basari = b(d)[sayacAnahtari(d.valf)] || 0;
  return { basari };
}

export function valfIlerle(d, dt) {
  const v = d.valf;
  if (!v) return [];
  const olaylar = [];
  const basari = b(d)[sayacAnahtari(v)] || 0;
  v.basinc += VALF_HIZ * (1 + basari * 0.3) * dt;
  if (!v.alarm && v.basinc >= ALARM_ESIGI) {
    v.alarm = true;
    olaylar.push('alarm');
  }
  if (v.basinc >= 1) {
    v.basinc = VALF_BAS;
    v.alarm = false;
    if (v.amac !== 'mini_kompresor') d.zehir = Math.min(99, (d.zehir || 0) + 20);
    olaylar.push('patlama');
  }
  return olaylar;
}

// Çift dokunuş: { sonuc: 'erken' | 'iyi' | 'bitti', metin }
export function valfBirak(d) {
  const v = d.valf;
  if (!v) return { sonuc: 'yok', metin: '' };
  const g = b(d);
  const anahtar = sayacAnahtari(v);
  if (v.basinc < ALARM_ESIGI) {
    const yuzde = Math.round(v.basinc * 100);
    v.basinc = VALF_BAS;
    return { sonuc: 'erken', metin: 'Erken. Basınç yüzde ' + yuzde + '; tahliye boşa gitti, baştan dolması gerek.' };
  }
  g[anahtar] = (g[anahtar] || 0) + 1;
  v.basinc = VALF_BAS;
  v.alarm = false;
  if (g[anahtar] < VALF_GEREKEN) return { sonuc: 'iyi', metin: 'Tam zamanında. Gaz kontrollü tıslayarak çıkıyor. ' + g[anahtar] + ' / ' + VALF_GEREKEN + '. Basınç yeniden yükseliyor, bu sefer daha hızlı.' };
  if (v.amac === 'mini_kompresor') return miniValfBitti(d, v.baca);
  if (v.amac === 'sikistirma') {
    // İzotop sıkıştırması tamam: itki hangarı açılır
    g.sikistirma = true;
    d.valf = null;
    d.kaptan.tecrube += 15;
    d.sahne = 'sikistirma_tamam';
    return { sonuc: 'bitti', metin: 'Sıkıştırma odası doldu; izotop yoğun bir kristale dönüştü.' };
  }
  // Baca dengede
  g['baca_' + v.baca] = true;
  d.koloni.kaynaklar.izotop = (d.koloni.kaynaklar.izotop || 0) + IZOTOP_BACA_BASI;
  d.kaptan.tecrube += 15;
  d.valf = null;
  let metin = NOKTALAR[v.baca].ad + ' dengede. Sondanın ucunda ağır izotop birikti: +' + IZOTOP_BACA_BASI + '.';
  if (bacaSayisi(d) >= BACALAR.length) {
    g.sondaj = true;
    d.gorev = { id: 'dokumhane' };
    d.sahne = 'sondaj_tamam';
  } else metin += ' Kalan baca: ' + (BACALAR.length - bacaSayisi(d)) + '.';
  return { sonuc: 'bitti', metin };
}

export function valfMetni(d) {
  if (!d.valf) return '';
  const y = Math.round(d.valf.basinc * 100);
  return 'Basınç yüzde ' + y + '. ' + (d.valf.alarm ? 'Kırmızı bölge: şimdi tahliye et.' : 'Bekle; alarmı dinle.') + ' Kükürt maruziyeti yüzde ' + Math.round(d.zehir || 0) + '.';
}

// --- İnşa sonrası ---
export function dokumhaneKuruldu(d) {
  b(d).dokumhane = true;
  d.koloni.seviye = Math.max(d.koloni.seviye, 2);
  d.koloni.moral = Math.min(100, d.koloni.moral + 10);
  d.koloni.nufus.sanayi = 2;
  d.itibar += 10;
  d.kaptan.tecrube += 50;
  if (!d.bitenGorevler.includes('jeotermal')) d.bitenGorevler.push('jeotermal');
  d.gorev = { id: 'kazi' };
  d.sahne = 'dokumhane';
}

// --- Konuşmalar (ikinci görevden itibaren) ---
export function konusma(d, kisiId) {
  const g = b(d);
  if (kisiId === 'muhendis') {
    const secenekler = [];
    let metin;
    if (!g.sondaAlindi) {
      metin = 'Kule ayakta; şimdi sıra reaktörde. Gemi yakıtı için ağır izotop lazım. Güneydeki Manyetik Sırtlar\'da yerden gaz fışkırıyor; o bacaların dibinde izotop birikir. Üç termal sonda hazırladım.';
      secenekler.push({
        etiket: 'Sondaları ver',
        cevap: (dd) => {
          dd.bayrak.sondaAlindi = true;
          dd.envanter.push('sonda', 'sonda', 'sonda');
          return 'Al. Sondayı bacanın ağzına çak; valf kolu kendiliğinden oturur. Basınç birikirken bir alarm duyacaksın. Alarm çalınca tahliye et; önce değil, sonra hiç değil. Bir de: maskesiz inme. Hekim bir tane hazırlıyordu.';
        },
      });
    } else if (!g.sondaj) metin = 'Sondalar ' + bacaSayisi(d) + ' bacada dengede. Valflerde acele etme; alarmı bekle.';
    else if (!g.dokumhane) metin = 'İzotop elimizde. Dökümhane için bazalt ve ağır metal lazım; sırtlarda ikisi de bol. Terminalden planı açabilirsin.';
    else metin = 'Dökümhane çalışıyor, Kaptan. İlk plakalar soğuyor. Bir gün bunlardan bir geminin omurgası olacak.';
    secenekler.push({ etiket: 'Sırtlar nasıl bir yer?', cevap: () => 'Dağlık, sıcak, gürültülü. Manyetik parazit pusulayı da radarı da şaşırtır; radar orada ancak yirmi metre görür. Bacaların sesini izle.' });
    secenekler.push({ etiket: 'Konuşmayı bitir', cevap: () => null });
    return { metin, secenekler };
  }
  if (kisiId === 'hekim') {
    const secenekler = [];
    let metin;
    if (!g.maske) {
      metin = 'Güneye mi ineceksin? Oradan gelen kükürt bir saatte ciğerlerini yakar. Kapsülün yedek kartuşlarından bir filtre maskesi yaptım.';
      secenekler.push({
        etiket: 'Maskeyi al',
        cevap: (dd) => {
          dd.bayrak.maske = true;
          if (!dd.envanter.includes('maske')) dd.envanter.push('maske');
          return 'Kartuşlar gazı süzer ama doyar. Sırtlarda maruziyetin yavaşça artar; bacaların dibinde hızla. Menüden "Neredeyim"e bakarsan yüzdesini söylerim. Yüzde yüze varırsan bayılırsın; o zaman seni buraya taşırız.';
        },
      });
    } else metin = 'Maske yanında mı? İyi. Sırtlardan döndüğünde nefesin hırıltılıysa uğra.';
    secenekler.push({ etiket: 'Ne kadar dayanırız?', cevap: () => 'Kule kurulduğundan beri herkesin morali yerinde. Ama barınak ve sera olmadan bu kapsül uzun süre ev olmaz.' });
    secenekler.push({ etiket: 'Konuşmayı bitir', cevap: () => null });
    return { metin, secenekler };
  }
  if (kisiId === 'telsizci') {
    return {
      metin: g.dokumhane
        ? 'Batıdaki uğultuyu dinliyorum, Kaptan. Her gece aynı saatte başlıyor ve aynı ritimle. Bunu yapan her neyse, bizden çok önce buradaydı.'
        : 'Kule her saat bir tarama yapıyor. Sektör 15\'teki çağrı hâlâ orada, zayıf ama inatçı. Sırtlara inersen telsizim açık; manyetik parazit sesimi bozarsa kusura bakma.',
      secenekler: [
        { etiket: 'Prometheus hakkında ne biliyoruz?', cevap: () => 'Hiçbir resmî kayıtta yok. Çağrıdaki imza askerî bir şifreleme kullanıyor. Biri o istasyonu saklamak istemiş.' },
        { etiket: 'Konuşmayı bitir', cevap: () => null },
      ],
    };
  }
  return null;
}

// --- Telsiz bildirimleri (belgeler/savas-yetenek-ve-murettebat-mekanikleri.md 4.3) ---
// Koşulu sağlanınca bir kez kuyruğa girer: üç tonlu zil, sonra dinlemek için çift dokun.
export const BILDIRIMLER = [
  {
    id: 'sirtlar_ilk',
    gorev: 'jeotermal',
    rol: 1,
    kosul: (d) => d.mekan === 'sirtlar',
    metin: (d) => 'Kaptan, ' + ilkAd(d, 1) + ' konuşuyor. Sesin kesik geliyor; manyetik parazit. Radarın burada kısa menzilli olacak, bacaların fışkırmasını kulağınla izle. Batı, doğu ve sırtın dibinde üç baca saydım.',
  },
  {
    id: 'zehir_yarim',
    gorev: 'jeotermal',
    rol: 2,
    kosul: (d) => (d.zehir || 0) >= 50,
    metin: (d) => 'Kaptan, hekim ' + ilkAd(d, 2) + '. Maskenin kartuşları yarıya indi. Bacalardan uzaklaşırsan nefesin düzelir; vadiye dönersen tamamen temizlenir.',
  },
  {
    id: 'ilk_baca',
    rol: 0,
    kosul: (d) => bacaSayisi(d) >= 1,
    metin: (d) => 'Kaptan, başçarkçı ' + ilkAd(d, 0) + '! İlk sondadan ölçüm geldi, izotop saflığı beklediğimizden yüksek. İki baca daha, ve bu gezegende ilk kez kendi yakıtımızı dökeriz.',
  },
];
