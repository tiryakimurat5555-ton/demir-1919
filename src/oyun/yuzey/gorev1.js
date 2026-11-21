// Birinci yüzey görevi "Sinyal Arayışı" (belgeler/uzay-oyunu-tasarim-ve-senaryo.md bölüm 1:
// "İlk fırlatma kapsülünün enkazından kurtarılan iletişim antenini yüksek bir tepeye taşıma, enerji
// jeneratörünü devreye sokma ve yörüngedeki sahipsiz uydulardan ilk telemetri verilerini indirme").
// Saf JavaScript: sahneler, konuşmalar, nokta eylemleri, frekans ayarı ve Sinyal Kulesi inşası.
//
// Görev bayrakları (d.bayrak): kesiciAlindi, antenAlindi, hucreAlindi, jenerator, antenKuruldu,
// telemetri, kule. Envanter: kesici, anten, guc_hucresi.
import { NOKTALAR } from './harita';
import { miniKilitlendi } from './mini';
import * as SB from '../tonoflenya/subay';
import { HAMMADDELER, KOLONI_KADEMELERI, TESISLER, eksikMetni, karsilanirMi, maliyetMetni } from '../veri/tesisler';
import { bosta, moralMetni, parcaMetni } from '../koloni';

const b = (d) => d.bayrak;
const var_ = (d, esya) => d.envanter.includes(esya);
const ad = (d, rol) => (d.murettebat[rol] ? d.murettebat[rol].ad : '');
const ilkAd = (d, rol) => ad(d, rol).split(' ')[0];

export const ESYALAR = {
  kesici: { ad: 'plazma kesici', tarif: 'Avuç içi büyüklüğünde; tetiğe basınca mavi bir ark çıkarır.' },
  anten: { ad: 'iletişim anteni', tarif: 'Katlanır, üç metrelik faz dizili anten. Hafif ama hantal.' },
  guc_hucresi: { ad: 'füzyon güç hücresi', tarif: 'Silindir biçiminde, avucunu ısıtan ağır bir hücre.' },
  sonda: { ad: 'termal sonda', tarif: 'Kol boyu, ucu seramik bir çubuk; gaz bacasının ağzına çakılır.' },
  maske: { ad: 'filtre maskesi', tarif: 'Kükürt gazını süzen iki kartuşlu yüz maskesi.' },
  termal_giysi: { ad: 'termal giysi', tarif: 'Polimer levha ve helyum hatlı, kendi kendini ısıtan bir giysi. Donmaya karşı korur.' },
  pompa: { ad: 'hidrolik el pompası', tarif: 'Kızağın ayak pistonlarına takılan, kollu bir el pompası.' },
  kablo: { ad: 'kablo makarası', tarif: 'Omzuna asılı ağır bir güç kablosu makarası.' },
  rezonator: { ad: 'frekans rezonatörü', tarif: 'Titanyum bir çatala oturtulmuş iki kristal; beş perde çalar.' },
  veri_kristali: { ad: 'veri kristali', tarif: 'Soluk ışıklı, serin, steril bir kristal.' },
  yildiz_haritasi: { ad: 'kadim yıldız haritası', tarif: 'Avuç büyüklüğünde, ince oyuklarla kaplı ağır bir küre.' },
};

export const HAREKET_KISA =
  'Kulaklık tak. Parmağını ekranda yukarı sürükleyip tut: yürürsün; aşağı: geri. Sağa ya da sola sürükle: dönersin. Dokun: çevrende ne var. Uzun bas: radar; yankılar nesnelerin yönünden döner. Çift dokun: yanındaki şeyi kullan ya da kişiyle konuş. İki parmakla dokun: sustur. İki parmakla çift dokun: menü.';

// --- Hikâye sahneleri ---
// metin(d) paragraf dizisi; secenekler(d) [{ etiket, sonra (sahne kimliği ya da null), yap(d) }]
export const SAHNELER = {
  acilis: {
    baslik: 'Aethelis-IV',
    ortam: 'ortam_kapsul',
    metin: (d) => [
      'Önce sessizlik. Sonra metal gövde soğudukça çıtırdıyor; fanlar teker teker yeniden dönmeye başlıyor.',
      'Kapsül bilgisayarının sesi: Sistemler devrede. Gövde sağlam. Yaşam desteği yüzde altmış. Yörünge bağlantısı yok. Arka modülle bağlantı yok.',
      'İnsanlığın derin uzaydaki sığınağı Aethelis-IV. Kapsülünüz kanyonun en dibine, Vadi-i Sukût\'a indi. Paraşütlerden biri yırtıldı; arka modül koptu ve vadinin bir yerine düştü.',
      'Ranzadan bir ses. Telsiz subayı ' + ad(d, 1) + ': "Kaptan? İyi misin? Anten arka modüldeydi. Gemiyle de yörüngeyle de bağımız koptu."',
    ],
    secenekler: () => [{ etiket: 'Ayağa kalk', sonra: 'acilis2' }],
  },
  acilis2: {
    baslik: 'Kapsülün içi',
    ortam: 'ortam_kapsul',
    metin: (d) => [
      'Hekim ' + ad(d, 2) + ' kemerlerini çözüyor: "Dördümüz de hayattayız. ' + ilkAd(d, 0) + ' dışarıda, yedek jeneratöre bakıyor."',
      ilkAd(d, 1) + ': "Anteni bul, Kaptan. Yüksek bir yere kurmazsak burada kimse bizi duymaz."',
      HAREKET_KISA,
    ],
    secenekler: () => [{ etiket: 'Başla', sonra: null }],
    bitisSozu: 'İniş kapsülünün içindesin. Hava kilidi önünde, alet dolabı sağında, ranza solunda.',
  },
  telemetri: {
    baslik: 'Kestrel-7',
    ortam: 'ortam_vadi',
    efekt: ['sinyal'],
    metin: (d) => [
      'Parazit bir anda çekiliyor. Yerine temiz, düzenli bir ses: veri akıyor.',
      'Kapsül bilgisayarı: Yörünge bağlantısı kuruldu. Sahipsiz keşif uydusu Kestrel-7. Telemetri indiriliyor.',
      'Uydunun son kaydı eski bir acil durum çağrısı. Sektör 15, gaz bulutunun içindeki bir asteroitten, yoğun parazitle. Çağrının imzası tek bir kelime: Prometheus.',
      ilkAd(d, 1) + ' kapsülden telsize bağlanıyor: "Bu antenle ancak dinleriz, Kaptan. Gerçek bir dinleme kulesi kurarsak uzaydaki her fener haritamıza düşer."',
    ],
    secenekler: () => [{ etiket: 'Kuleyi planla', sonra: null }],
    bitisSozu: 'Görev güncellendi: Sinyal Kulesi\'ni kur. Malzeme: ' + maliyetMetni(TESISLER.sinyal_kulesi.maliyet) + '. Plan kapsüldeki merkez terminalinde.',
  },
  kule: {
    baslik: 'Sinyal Kulesi',
    ortam: 'ortam_vadi',
    efekt: ['sinyal'],
    metin: (d) => [
      ilkAd(d, 0) + ' ile iki gün boyunca bazalt bloklarını Gözcü Tepesi\'ne taşıyorsunuz. Titanyum direk, kristal alıcılar, kapsülden sökülen kablolar.',
      'Akşam rüzgârı dinerken kule ilk taramasını yapıyor. Uzaydan gelen uğultu, kulaklığında bir haritaya dönüşüyor.',
      'Kapsül bilgisayarı: Derin Uzay Dinleme ve Sinyal Kulesi devrede. Uzay haritasına bir ziyaret noktası eklendi: Sektör 15, gaz bulutunun içindeki asteroit üssü.',
      'Birinci görev tamamlandı: Sinyal Arayışı.',
      'Koloninin önünde uzun bir yol var: manyetik sırtlardaki gaz bacalarından reaktör yakıtı, kadim kraterdeki harabeler ve platoda bir tersane. Bir gün bu vadiden bir gemi kalkacak.',
    ],
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
    bitisSozu: 'Yeni görev: Jeotermal Sondaj ve İzotop Hasadı. Jeneratörün başındaki mühendisle konuş.',
  },
};

export function sahneMetni(d, id) {
  const s = SAHNELER[id];
  return s ? s.metin(d).filter(Boolean) : [];
}

export function sahneSecenekleri(d, id) {
  const s = SAHNELER[id];
  return s ? s.secenekler(d) : [];
}

// Seçeneği uygular; sonraki sahnenin kimliğini (ya da null) döndürür
export function sahneSec(d, id, i) {
  const x = sahneSecenekleri(d, id)[i];
  if (!x) return null;
  if (x.yap) x.yap(d);
  d.sahne = x.sonra || null;
  return d.sahne;
}

// --- Görev ipucu (menüde "Görev") ---
export function gorevIpucu(d) {
  const g = b(d);
  if (d.gorev.id !== 'sinyal') return '';
  const bas = 'Sinyal Arayışı. ';
  if (!g.kesiciAlindi && !g.antenAlindi) return bas + 'Kapsüldeki alet dolabından plazma kesiciyi al. Anten kopan modülde, kirişlere sıkışmış olabilir.';
  if (!g.antenAlindi || !g.hucreAlindi)
    return bas + 'Kopan arka modüle git; acil durum fenerinin bip sesini izle, kapsülün kuzeybatısında. ' + (!g.antenAlindi ? 'Anteni kes. ' : '') + (!g.hucreAlindi ? 'Güç hücresini çıkar.' : '');
  if (!g.jenerator) return bas + 'Güç hücresini kapsülün kuzeydoğusundaki yedek jeneratöre tak.';
  if (!g.antenKuruldu) return bas + 'Anteni vadinin kuzeyindeki Gözcü Tepesi\'ne taşı ve kur. ' + ilkAd(d, 0) + ' güç hattını oraya çekti.';
  if (!g.telemetri) return bas + 'Gözcü Tepesi\'nde antenin başında frekansı ayarla: parazitin içindeki ince sesi bul.';
  const m = TESISLER.sinyal_kulesi.maliyet;
  const k = d.koloni.kaynaklar;
  return (
    bas +
    'Sinyal Kulesi\'ni kur: kapsüldeki merkez terminalinden. Gerekenler: ' +
    maliyetMetni(m) +
    '. Elinde: ' +
    Object.keys(m)
      .map((x) => (k[x] || 0) + ' ' + HAMMADDELER[x].ad)
      .join(', ') +
    '. Bazalt yığınları vadinin her yanında, titanyum hurdası kopan modülün çevresinde, kristaller doğuda ve batıda; çınlamalarını dinle.'
  );
}

// --- Nokta eylemleri ---
// noktaEylemleri(d, id) → [{ id, etiket, ipucu }]; eylemUygula(d, id, eylemId) → { metin, ses, sahne, olaylar }
export function noktaEylemleri(d, id) {
  const g = b(d);
  const n = NOKTALAR[id];
  const e = [];
  if (n && n.kaynak) {
    const kalan = d.stok[id] || 0;
    if (kalan > 0) e.push({ id: 'topla', etiket: 'Topla', ipucu: kalan + ' parça kaldı.' });
    else e.push({ id: 'bos', etiket: 'Burada toplanacak bir şey kalmadı' });
    return e;
  }
  if (id === 'dolap') {
    if (!g.kesiciAlindi) e.push({ id: 'kesici', etiket: 'Plazma kesiciyi al' });
    e.push({ id: 'bak', etiket: 'Dolaba bak' });
  } else if (id === 'enkaz') {
    e.push({ id: 'incele', etiket: 'Modülü incele' });
    if (!g.antenAlindi) e.push({ id: 'anten', etiket: 'Anteni kes ve al', ipucu: var_(d, 'kesici') ? '' : 'Plazma kesici gerekir.' });
    if (!g.hucreAlindi) e.push({ id: 'hucre', etiket: 'Güç hücresini çıkar' });
  } else if (id === 'jenerator') {
    e.push({ id: 'incele', etiket: 'Jeneratörü incele' });
    if (!g.jenerator) e.push({ id: 'tak', etiket: 'Güç hücresini tak', ipucu: var_(d, 'guc_hucresi') ? '' : 'Önce güç hücresini bul.' });
  } else if (id === 'tepe') {
    e.push({ id: 'incele', etiket: 'Çevreyi dinle' });
    if (!g.antenKuruldu) e.push({ id: 'kur', etiket: 'Anteni kur', ipucu: var_(d, 'anten') ? '' : 'Önce anteni bul.' });
    else if (!g.telemetri) e.push({ id: 'ayar', etiket: 'Frekansı ayarla', ipucu: 'Parazitin içinde ince bir ses ara.' });
    else e.push({ id: 'dinle', etiket: 'Anteni dinle' });
  } else if (id === 'terminal') {
    e.push({ id: 'durum', etiket: 'Koloni durumu' });
    e.push({ id: 'insa', etiket: 'İnşa' });
    if (d.koloni.binalar.includes('dokumhane')) e.push({ id: 'uretim', etiket: 'Üretim', ipucu: 'Tesislerde gemi parçası ve modül üret.' });
    e.push({ id: 'isgucu', etiket: 'Koloni yönetimi', ipucu: 'Nüfusu sanayi, tersane ve bilime paylaştır.' });
    e.push({ id: 'kaydet', etiket: 'Elle kaydet', ipucu: 'Üç kayıt yuvası.' });
  } else if (id === 'kapsul_dis') {
    e.push({ id: 'incele', etiket: 'Kapsülü incele' });
  } else if (NOKTALAR[id]) {
    e.push({ id: 'incele', etiket: 'İncele' });
  }
  return e;
}

const KAYNAK_METNI = {
  bazalt: ['Bazalt bir bloğu yerinden söküyorsun; gevşek kaya kuru bir çıtırtıyla ayrılıyor.', 'Bir blok daha. Avuçlarında ince, kara bir toz.', 'Son sağlam blok. Yığının geri kalanı ufalanmış çakıl.'],
  titanyum: ['Kesici olmadan da sökülüyor: iniş darbesiyle yamulmuş titanyum-karbon bir plaka.', 'Bir parça daha; kenarları hâlâ yanık kokuyor.'],
  kristal: ['Kristali tabanından kırıyorsun. Kopunca uzun, cam gibi bir tını bırakıyor; tını kanyon duvarlarında sönüyor.', 'İkinci kristal. Elinde hafifçe titriyor; parmaklarına karıncalanma yayılıyor.'],
};

export function eylemUygula(d, id, eylemId) {
  const g = b(d);
  const n = NOKTALAR[id];
  if (n && n.kaynak) {
    if (eylemId !== 'topla' || (d.stok[id] || 0) <= 0) return { metin: 'Burada toplanacak bir şey kalmadı.' };
    if (n.gerekArac && d.arac !== n.gerekArac)
      return { metin: 'Bu damar elle kazılamayacak kadar derinde. Titreşimli rezonans matkabı olan bir sondaj tankı gerekir: Mammoth.', ses: 'red' };
    const tur = n.kaynak;
    const sira = n.stok - d.stok[id];
    d.stok[id] -= 1;
    // Fosil kabuk delici uç: derin damarda çift verim
    d.koloni.kaynaklar[tur] = (d.koloni.kaynaklar[tur] || 0) + (n.gerekArac && b(d).deliciUc ? 2 : 1);
    // Mor Yıldız 2. kademe (aether duyusu): aether damarlarından iki kat
    if (['aether', 'saf_aether', 'buzul_aether', 'mavi_aether', 'kara_aether'].includes(tur) && SB.kabiliyet(d, 'elyndra', 2)) d.koloni.kaynaklar[tur] += 1;
    // Klipsomanyak (toplayıcı) mürettebat: her dördüncü toplamada beklenmedik fazladan bir parça
    let ek = '';
    const toplayici = d.murettebat.find((u) => u.nitelik === 'toplayici');
    d.toplamaSayac = (d.toplamaSayac || 0) + 1;
    if (toplayici && d.toplamaSayac % 4 === 0) {
      d.koloni.kaynaklar[tur] += 1;
      ek = ' ' + toplayici.ad.split(' ')[0] + ' yanındaki kayanın altından bir parça daha çıkardı.';
    }
    const metin = ((KAYNAK_METNI[tur] || [])[sira] || 'Bir parça daha.') + ek;
    return { metin: metin + (n.gerekArac ? ' Matkap derinden gümbürdüyor.' : '') + ' ' + HAMMADDELER[tur].ad[0].toUpperCase() + HAMMADDELER[tur].ad.slice(1) + ': ' + d.koloni.kaynaklar[tur] + '.', ses: tur === 'kristal' ? 'kristal' : 'topla' };
  }
  switch (id + '.' + eylemId) {
    case 'dolap.kesici':
      g.kesiciAlindi = true;
      if (!var_(d, 'kesici')) d.envanter.push('kesici');
      return { metin: 'Dolabın kilidi iniş darbesiyle gevşemiş. İçeride sabitlenmiş aletler; plazma kesiciyi alıp kemerine takıyorsun. Tetiğe hafifçe dokununca kısa bir cızırtı: şarjı dolu.', ses: 'bip' };
    case 'dolap.bak':
      return { metin: 'Kaynak maskeleri, yedek oksijen kartuşları, bir kutu kablo bağı.' + (g.kesiciAlindi ? ' Plazma kesicinin yeri boş.' : ' Ortada bir plazma kesici.') };
    case 'enkaz.incele':
      return {
        metin:
          'Arka modül yan yatmış; dış kaplaması yırtılmış, içinden soğumuş köpük taşıyor. Acil durum feneri her iki saniyede bir bipliyor.' +
          (g.antenAlindi ? '' : ' Katlanmış iletişim anteni iki kirişin arasında, sıkışmış.') +
          (g.hucreAlindi ? '' : ' Yan panelin ardında güç hücresinin yuvası; hücre yerinde, hâlâ ılık.') +
          ' Çevrede saçılmış titanyum hurdası var.',
      };
    case 'enkaz.anten':
      if (!var_(d, 'kesici')) return { metin: 'Anten iki kirişin arasında sıkışmış; elle çekince kirişler gıcırdıyor ama bırakmıyor. Kapsüldeki dolapta bir plazma kesici vardı.', ses: 'red' };
      g.antenAlindi = true;
      d.envanter.push('anten');
      return { metin: 'Kesiciyi kirişe dayıyorsun. Mavi ark metali kemiriyor; bir dakika sonra kiriş çatırdayarak ayrılıyor. Anteni katlanmış hâliyle sırtına alıyorsun. Hafif ama uzun; yürürken rüzgâr ona tutunuyor.', ses: 'kes' };
    case 'enkaz.hucre':
      g.hucreAlindi = true;
      d.envanter.push('guc_hucresi');
      return { metin: 'Paneli söküyorsun. Güç hücresi yuvasından tıslayarak çıkıyor; ağır, avucunu ısıtıyor. Yedek jeneratör kapsülün kuzeydoğusunda.', ses: 'tislama' };
    case 'jenerator.incele':
      return { metin: g.jenerator ? 'Jeneratör derin, düzenli bir uğultuyla çalışıyor. Bir kablo makarası buradan kuzeye, Gözcü Tepesi\'ne uzanıyor.' : 'Füzyon jeneratörü sağlam görünüyor ama ölü. Yan kapağında boş bir hücre yuvası.' };
    case 'jenerator.tak':
      if (!var_(d, 'guc_hucresi')) return { metin: 'Yuvaya takacak bir hücren yok. Hücre kopan modüldeydi.', ses: 'red' };
      g.jenerator = true;
      d.envanter = d.envanter.filter((x) => x !== 'guc_hucresi');
      return {
        metin: 'Hücreyi yuvasına itiyorsun; kilit tık diye oturuyor. Bir an hiçbir şey. Sonra derinden, giderek yükselen bir uğultu: jeneratör çalışıyor. ' + ilkAd(d, 0) + ': "İşte bu! Hattı Gözcü Tepesi\'ne çekiyorum; anteni orada kur, vadinin kuzeyinde."',
        ses: 'jenerator',
      };
    case 'tepe.incele':
      return { metin: 'Rüzgâr burada kanyonun içindekinden sert; kulaklarında uğulduyor. Kanyon duvarlarının ardında açık gökyüzü. ' + (g.antenKuruldu ? 'Anten direği rüzgârda hafifçe titriyor.' : g.jenerator ? 'Güç hattının ucu bir kayaya bağlanmış.' : 'Burada güç yok.') };
    case 'tepe.kur':
      if (!var_(d, 'anten')) return { metin: 'Kuracak bir antenin yok. Anten kopan modülde.', ses: 'red' };
      if (!g.jenerator) return { metin: 'Anteni kurabilirsin ama güç yok; sinyali yükseltemez. Önce jeneratörü çalıştır.', ses: 'red' };
      g.antenKuruldu = true;
      d.envanter = d.envanter.filter((x) => x !== 'anten');
      return { metin: 'Anteni açıyorsun; üç bölüm tık tık uzuyor. ' + ilkAd(d, 0) + ' direği tutarken sen güç hattını bağlıyorsun. Kulaklığına parazit doluyor: uzayın uğultusu. Şimdi frekansı ayarlamalısın.', ses: 'kur' };
    case 'tepe.ayar':
      return { metin: '', ayar: true };
    case 'tepe.dinle':
      return { metin: 'Kestrel-7\'nin taşıyıcı sinyali düzenli, sakin bir nabız gibi atıyor.' };
    case 'terminal.durum':
      return { metin: koloniMetni(d) };
    case 'terminal.insa':
      return { metin: '', insa: true };
    case 'terminal.kaydet':
      return { metin: '', kaydet: true };
    case 'terminal.uretim':
      return { metin: '', uretim: true };
    case 'terminal.isgucu':
      return { metin: '', isgucu: true };
    case 'kapsul_dis.incele':
      return { metin: 'Kapsülün gövdesi iniş ısısından kararmış. Kuzey yüzünde hava kilidi; içeriden fanların sesi geliyor.' };
    default:
      return { metin: (n && n.tarif) || '' };
  }
}

// --- Koloni durumu (terminal ve menü) ---
export function koloniMetni(d) {
  const k = d.koloni;
  const kaynak = Object.keys(k.kaynaklar)
    .filter((x) => k.kaynaklar[x] > 0)
    .map((x) => k.kaynaklar[x] + ' ' + HAMMADDELER[x].ad);
  const binalar = k.binalar.map((x) => TESISLER[x].kisa);
  return [
    'Koloni kademesi ' + k.seviye + ': ' + KOLONI_KADEMELERI[k.seviye].unvan + '.',
    'Nüfus ' + k.nufus.toplam + ', barınma ' + k.nufus.barinma + '. Sanayide ' + (k.nufus.sanayi || 0) + ', tersanede ' + (k.nufus.tersane || 0) + ', bilimde ' + (k.nufus.bilim || 0) + ', boşta ' + bosta(d) + '.',
    'Moral yüzde ' + k.moral + '. ' + moralMetni(d),
    'Parçalar: ' + parcaMetni(d) + '.',
    'Hammadde: ' + (kaynak.length ? kaynak.join(', ') : 'yok') + '.',
    'Tesisler: ' + (binalar.length ? binalar.join(', ') : 'yok') + '.',
    'Galaktik itibar: ' + d.itibar + '.',
  ].join(' ');
}

// --- İnşa ---
export function insaListesi(d) {
  return Object.keys(TESISLER).map((id) => {
    const t = TESISLER[id];
    const kurulu = d.koloni.binalar.includes(id);
    const acik = t.kosul(d);
    let durum;
    if (kurulu) durum = 'Kurulu.';
    else if (!acik) durum = t.kosulMetni;
    else if (karsilanirMi(d.koloni.kaynaklar, t.maliyet)) durum = 'Kurulabilir. ' + maliyetMetni(t.maliyet) + '.';
    else durum = 'Gerekenler: ' + maliyetMetni(t.maliyet) + '. ' + eksikMetni(d.koloni.kaynaklar, t.maliyet);
    return { id, ad: t.ad, kurulu, acik, durum, tarif: t.islev + ' ' + t.katki };
  });
}

export function insaEt(d, id) {
  const t = TESISLER[id];
  if (!t) return { metin: '' };
  if (d.koloni.binalar.includes(id)) return { metin: t.kisa + ' zaten kurulu.' };
  if (!t.kosul(d)) return { metin: t.kosulMetni, ses: 'red' };
  if (!karsilanirMi(d.koloni.kaynaklar, t.maliyet)) return { metin: eksikMetni(d.koloni.kaynaklar, t.maliyet), ses: 'red' };
  for (const k of Object.keys(t.maliyet)) d.koloni.kaynaklar[k] -= t.maliyet[k];
  d.koloni.binalar.push(id);
  if (id === 'sinyal_kulesi') {
    b(d).kule = true;
    d.koloni.moral = Math.min(100, d.koloni.moral + 10);
    d.itibar += 10;
    d.kaptan.tecrube += 50;
    if (!d.harita.poiler.includes('sektor15')) d.harita.poiler.push('sektor15');
    d.bitenGorevler.push('sinyal');
    d.gorev = { id: 'jeotermal' };
    d.sahne = 'kule';
  }
  return { metin: '', sahne: d.sahne };
}

// --- Frekans ayarı (Gözcü Tepesi) ---
// Kanal 0-120. Hedef kanal oyunun tohumundan gelir. 1,2 kanal içinde 2,5 saniye tutunca kilitlenir.
export const KANAL_EN = 0;
export const KANAL_EN_COK = 120;
const KILIT_PAYI = 1.2;
const KILIT_SURESI = 2.5;
const DUYMA_ARALIGI = 25;

// amac: 'telemetri' (birinci görev) ya da 'ag' (gorev6.js ağ şebekesi entegrasyonu: hedef 10-40 arası)
export function ayarBaslat(d, amac = 'telemetri') {
  // 'mors' (kesifler.js Vanguard-01): hedef 95-115
  const hedef = amac === 'ygk' ? 40 + (((d.tohum * 11) % 160) / 10 - 8) : amac === 'igne' ? 100 + (((d.tohum * 17) % 160) / 10 - 8) : amac === 'ag' ? 25 + (((d.tohum * 7) % 300) / 10 - 15) : amac === 'mors' ? 105 + (((d.tohum * 13) % 200) / 10 - 10) : 70 + ((d.tohum % 400) / 10 - 20); // 50-90 arası
  d.ayar = { frekans: amac === 'ygk' ? 90 : amac === 'igne' ? 50 : amac === 'ag' ? 90 : amac === 'mors' ? 60 : 30, hedef: Math.round(hedef * 10) / 10, kilit: 0, yakinDendi: false, amac };
  return d.ayar;
}

export function ayarDegis(d, fark) {
  if (!d.ayar) return;
  d.ayar.frekans = Math.max(KANAL_EN, Math.min(KANAL_EN_COK, d.ayar.frekans + fark));
}

// 0 (yalnız parazit) .. 1 (temiz sinyal)
export function ayarYakinlik(d) {
  if (!d.ayar) return 0;
  const f = Math.abs(d.ayar.frekans - d.ayar.hedef);
  return Math.max(0, 1 - f / DUYMA_ARALIGI);
}

// Her adımda çağrılır; olaylar: 'yakin' (ilk kez iyice yaklaşınca), 'kilitlendi'
export function ayarIlerle(d, dt) {
  const a = d.ayar;
  if (!a) return [];
  const olaylar = [];
  const fark = Math.abs(a.frekans - a.hedef);
  if (fark <= KILIT_PAYI) a.kilit += dt;
  else a.kilit = Math.max(0, a.kilit - dt * 2);
  if (!a.yakinDendi && fark < 4) {
    a.yakinDendi = true;
    olaylar.push('yakin');
  }
  if (a.kilit >= KILIT_SURESI) {
    d.ayar = null;
    d.kaptan.tecrube += 20;
    if (a.amac === 'ag') {
      b(d).ag = true;
      d.sahne = 'ag_tamam';
    } else if (a.amac.indexOf('mini_') === 0) {
      miniKilitlendi(d, a.amac);
    } else if (a.amac === 'ygk') {
      b(d).ygkFrekansi = true;
      SB.ekolKazan(d, 'elyndra', 30);
      d.sahne = 'ygk_frekansi';
    } else if (a.amac === 'igne') {
      b(d).malazarIzni = true;
      SB.ekolKazan(d, 'elyndra', 50);
      d.sahne = 'igne_hizalandi';
    } else if (a.amac === 'mors') {
      b(d).morsBulundu = true;
      d.sahne = 'mors_bulundu';
    } else {
      b(d).telemetri = true;
      d.sahne = 'telemetri';
    }
    olaylar.push('kilitlendi');
  }
  return olaylar;
}

export function ayarMetni(d) {
  if (!d.ayar) return '';
  const y = ayarYakinlik(d);
  const kanal = d.ayar.frekans.toFixed(1).replace('.', ',');
  const durum = y > 0.95 ? 'Sinyal temiz; bırakma, kilitleniyor.' : y > 0.8 ? 'Sinyal çok yakın.' : y > 0.5 ? 'Parazitin içinde bir ses var.' : y > 0 ? 'Uzaktan bir şey duyuluyor gibi.' : 'Yalnız parazit.';
  return 'Kanal ' + kanal + '. ' + durum;
}

// --- Konuşmalar ---
// konusma(d, kisiId) → { metin, secenekler: [{ etiket, cevap(d) → metin }] }
export function konusma(d, kisiId) {
  const g = b(d);
  if (kisiId === 'muhendis') {
    let metin;
    if (!g.hucreAlindi && !g.jenerator)
      metin = 'Kaptan. Jeneratör sağlam ama boş. Güç hücresi arka modüldeydi; modül iniş sırasında koptu, kuzeybatıya savruldu. Fenerini duyuyor musun? O bip sesi. Anten de oradaydı; kirişlere sıkışmıştır, dolaptaki plazma kesiciyi almadan gitme.';
    else if (!g.jenerator) metin = 'Hücreyi buldun mu? Jeneratöre tak, gerisini ben hallederim.';
    else if (!g.antenKuruldu) metin = 'Hattı tepeye çektim. Anteni şu kayaya oturt; direği ben tutarım.';
    else if (!g.telemetri) metin = 'Anten ayakta. Kulaklığını iyi dinle; parazitin içinde bir yerde ince bir ses olmalı.';
    else if (!g.kule) metin = 'Duydum o sesi. Kanyonun dışında bir şey var, değil mi? Kule için malzeme lazım: bazalt, titanyum, biraz da kristal. Terminalden planı açabilirsin.';
    else metin = 'Kule ayakta. Bundan sonra gökyüzü bize konuşacak, Kaptan.';
    return {
      metin,
      secenekler: [
        { etiket: 'Kopan modül nerede?', cevap: () => 'Otuz metre kadar, kuzeybatı. Uzun bas, radar gönder; yankısı yerini söyler.' },
        { etiket: 'Bu jeneratör ne kadar dayanır?', cevap: () => 'Bir hücreyle bir yıl. Kule, terminal ve yaşam desteği için yeter; bir dökümhane için yetmez.' },
        { etiket: 'Konuşmayı bitir', cevap: () => null },
      ],
    };
  }
  if (kisiId === 'telsizci') {
    let metin;
    if (!g.antenKuruldu) metin = 'Anten olmadan ben de bir işe yaramam, Kaptan. Anteni bulursan Gözcü Tepesi\'ne kur; kanyonun duvarları sinyali yutuyor, gökyüzünü oradan başka yer görmüyor.';
    else if (!g.telemetri) metin = 'Anten kuruldu, uzayın uğultusunu buradan bile duyuyorum. Frekansı sen ayarlayacaksın; ben bu bacakla tepeye çıkamam.';
    else metin = 'Kestrel-7... O uydu bizden önce gelen keşif filosunundu. Sektör 15\'teki sinyal, Prometheus. Bu adı hiçbir kayıtta görmedim.';
    return {
      metin,
      secenekler: [
        {
          etiket: 'Frekans nasıl ayarlanır?',
          cevap: () => 'Parazitin içinde ince, düzenli bir ses ara. Parmağını yukarı ya da aşağı sürükle, ya da iki parmakla çevir gibi döndür; kanal değişir. Ses netleşince bırakma, kilitlenene kadar tut. Dokunursan kanalı söylerim.',
        },
        { etiket: 'Bacağın nasıl?', cevap: () => 'Kırık değil, burkulmuş. Hekimimiz öyle diyor. Birkaç güne yürürüm.' },
        { etiket: 'Konuşmayı bitir', cevap: () => null },
      ],
    };
  }
  if (kisiId === 'hekim') {
    return {
      metin: 'Herkes hayatta, Kaptan. Yaşam desteği altmışta. Kule kurulursa yörüngeden yardım çağırabiliriz. Kendine dikkat et; dışarıda hava ince.',
      secenekler: [
        { etiket: 'Ne kadar dayanırız?', cevap: () => 'Kapsülün yaşam desteği on gün yeter. Sonrası için gerçek bir koloni kurmamız gerek: barınak, su, sera.' },
        { etiket: 'Dışarıda ne var?', cevap: () => 'Güneyden kükürt kokusu geliyor, batıdaki yarıktan hiç rüzgâr girmiyor. İkisinden de hoşlanmadım.' },
        { etiket: 'Konuşmayı bitir', cevap: () => null },
      ],
    };
  }
  return { metin: '', secenekler: [] };
}
