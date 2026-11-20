// Üçüncü yüzey görevi "Antik Kseno-Laboratuvar Kazısı" (belgeler/uzay-oyunu-tasarim-ve-senaryo.md bölüm 1:
// "Kadim kraterde gömülü bir kseno-yapının kilitli kapılarını frekans rezonatörüyle açma, içerideki steril veri
// kristallerini kurtarma ve gemi navigasyon sistemlerine entegre edilecek kadim yıldız haritası parçalarını elde etme";
// gezegen-gelisimi-v2 4.2 Kadim Kseno-Rezonans Çanları, 2.4 batı sektörü: mutlak sessizlik, yerçekimsel kilitler).
// Saf JavaScript.
//
// Oynanış: kraterdeki beş çan beş notayı öğretir (pesten tize). Gömülü yapının kapıları bir nota dizisi çalar;
// frekans rezonatörüyle aynı diziyi çalınca açılır (dış kapı 3, iç kapı 4 nota). Salonda görünmez yerçekimi
// alanları var (dunya.js ALANLAR; uğultuları duyulur). Üç kaideden veri kristali, iç mabetten yıldız haritası.
// Bayraklar: rezonator, kapi_dis, kapi_ic, kristal_<kaide>, harita, kazi, biyo_kubbe.
import { NOKTALAR } from './harita';
import { uretec } from '../veri/murettebat';
import { HAMMADDELER, TESISLER, maliyetMetni } from '../veri/tesisler';

const b = (d) => d.bayrak;
const ad = (d, rol) => (d.murettebat[rol] ? d.murettebat[rol].ad : '');
const ilkAd = (d, rol) => ad(d, rol).split(' ')[0];
const KAIDELER = ['kaide_1', 'kaide_2', 'kaide_3'];
export const REZONATOR_MALIYET = { kristal: 2, titanyum: 1 };

// Beş nota (pentatonik): çanlarla rezonatör aynı perdeleri çalar
export const NOTALAR = [
  { ad: 'birinci çan', frek: 196 },
  { ad: 'ikinci çan', frek: 220 },
  { ad: 'üçüncü çan', frek: 262 },
  { ad: 'dördüncü çan', frek: 294 },
  { ad: 'beşinci çan', frek: 330 },
];

// Dizi uzunlukları: dış kapı 3, iç kapı 4; rezonatör kalibrasyonu 5, kadim şifre 6 (gorev6.js)
const DIZI_UZUNLUGU = { dis: 3, ic: 4, kalibre: 5, sifre: 6 };
const KAPI_TOHUM = { dis: 104729, ic: 7919, kalibre: 15485863, sifre: 32452843 };
// Dizi tamamlanınca konan bayrak ve açılan sahne
const DIZI_BITIS = { dis: { bayrak: 'kapi_dis' }, ic: { bayrak: 'kapi_ic' }, kalibre: { bayrak: 'kalibrasyon', sahne: 'kalibrasyon_tamam' }, sifre: { bayrak: 'sifre', sahne: 'sifre_tamam' } };
// Kapının dizisi oyunun tohumundan gelir: aynı nota art arda gelmez
export function kapiDizisi(d, kapi) {
  const r = uretec(d.tohum + (KAPI_TOHUM[kapi] || 104729));
  const uzun = DIZI_UZUNLUGU[kapi] || 3;
  const dizi = [];
  while (dizi.length < uzun) {
    const n = Math.floor(r() * NOTALAR.length);
    if (n !== dizi[dizi.length - 1]) dizi.push(n);
  }
  return dizi;
}

export function kristalSayisi(d) {
  return KAIDELER.filter((k) => b(d)['kristal_' + k]).length;
}

// --- Sahneler ---
export const SAHNELER = {
  kazi_tamam: {
    baslik: 'Kadim yıldız haritası',
    ortam: 'ortam_harabe',
    efekt: ['sinyal'],
    metin: (d) => [
      'Küreyi kaidesinden kaldırdığın anda bütün yapı bir kez, derinden çınlıyor; salondaki çekim uğultusu sönüp gidiyor. Yerçekimi alanları kapandı.',
      'Kürenin içinde, avucunu ısıtan ince bir titreşim: yüzlerce nokta, her biri farklı bir perdede. Bir yıldız haritası; sesle yazılmış.',
      'Mabedin yazıtında son bir satır var, parmaklarınla seçebildiğin kadarıyla: "Bizden sonra gelen, haritayı dinle. Mezarımız buzun içinde."',
      ilkAd(d, 1) + ' telsizden, heyecandan kekeleyerek: "Kaptan, kuleye bağlarsan haritayı okuyabilirim. Kristallerdeki veriyle birlikte, bu bir navigasyon sistemi demek."',
    ],
    secenekler: () => [{ etiket: 'Koloniye dön', sonra: null }],
    bitisSozu: 'Görev güncellendi: Kseno-Biyoloji Araştırma Kubbesi\'ni kur. Gerekenler: ' + maliyetMetni(TESISLER.biyo_kubbe.maliyet) + '. Kapsüldeki merkez terminalinden. Kodekse yeni kayıt eklendi.',
  },
  biyo_kubbe: {
    baslik: 'Kseno-Biyoloji Araştırma Kubbesi',
    ortam: 'ortam_yuzey',
    efekt: ['kapi', 'sinyal'],
    metin: (d) => [
      'Kapsülün yanında, jeneratörün sıcaklığına sığınan şeffaf bir kubbe. İçinde steril tezgâhlar, veri kristallerinin okuyucuları ve bir karantina bölmesi.',
      'Hekim ' + ad(d, 2) + ' ilk kristali okuyucuya yerleştiriyor. Kubbe, kristalin sesiyle doluyor: bir dil değil, bir biyoloji. Kadimlerin kendi genomu.',
      'Kapsül bilgisayarı: Kseno-Biyoloji Araştırma Kubbesi devrede. Biyo-Karantina Bölmesi planı açıldı. Uzay haritasına bir ziyaret noktası eklendi: Buzlu Moloz Kuşağı, sürüklenen biyo-kapsül enkazı.',
      'Üçüncü görev tamamlandı: Antik Kseno-Laboratuvar Kazısı.',
      ilkAd(d, 0) + ': "Kristaller, izotop, harita... Kaptan, artık eksik olan tek şey bir gemi. Platoyu tersane için hazırlamamız gerek."',
    ],
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
    bitisSozu: 'Yeni görev: Tersane Zemin Güçlendirmesi. Gözcü Tepesi\'nin ardındaki plato yokuşu açıldı; önce jeneratörün başındaki mühendisle konuş.',
  },
};

// --- Görev ipucu ---
export function gorevIpucu(d) {
  const g = b(d);
  if (d.gorev.id === 'kazi') {
    const bas = 'Antik Kseno-Laboratuvar Kazısı. ';
    if (!g.rezonator) return bas + 'Jeneratörün başındaki mühendis bir frekans rezonatörü yapabilir: ' + maliyetMetni(REZONATOR_MALIYET) + ' gerekir. Batı geçidinin ardındaki kraterde de kristal var.';
    if (!g.kapi_dis)
      return bas + 'Batı geçidinden Kadim Krater\'e geç. Ortadaki gömülü yapının kapısı bir nota dizisi çalar; rezonatörle aynısını çal. Kraterdeki beş çanı bul ve dinle: her biri bir nota, pesten tize birden beşe.';
    const kalan = KAIDELER.filter((k) => !g['kristal_' + k]).map((k) => NOKTALAR[k].ad);
    if (kalan.length || !g.harita)
      return (
        bas +
        (kalan.length ? 'Salondaki kaidelerden veri kristallerini al: ' + kalan.join(', ') + '. ' : '') +
        (!g.harita ? (g.kapi_ic ? 'İç mabetteki yıldız haritasını al. ' : 'Salonun dibindeki iç kapıyı rezonatörle aç; dizisi dört nota. ') : '') +
        'Salonda görünmez yerçekimi alanları var; derin uğultularını dinle ve uzak dur.'
      );
    return bas;
  }
  if (d.gorev.id === 'biyo') {
    const m = TESISLER.biyo_kubbe.maliyet;
    const k = d.koloni.kaynaklar;
    return (
      'Kseno-Biyoloji Araştırma Kubbesi\'ni kur: kapsüldeki merkez terminalinden. Gerekenler: ' +
      maliyetMetni(m) +
      '. Elinde: ' +
      Object.keys(m)
        .map((x) => (k[x] || 0) + ' ' + HAMMADDELER[x].ad)
        .join(', ') +
      '. Kraterde silikat kristali var.'
    );
  }
  return '';
}

// --- Noktalar: çanlar, kaideler, yazıt, harita ---
export function noktaMi(id) {
  const n = NOKTALAR[id];
  return !!(n && (n.can != null || n.kaide || id === 'yazit' || id === 'harita_kaidesi'));
}

export function noktaEylemleri(d, id) {
  const g = b(d);
  const n = NOKTALAR[id];
  if (n.can != null) return [{ id: 'vur', etiket: 'Çana vur', ipucu: 'Notasını duyarsın.' }, { id: 'incele', etiket: 'Çanı incele' }];
  if (n.kaide) return g['kristal_' + id] ? [{ id: 'incele', etiket: 'Kaideyi incele' }] : [{ id: 'al', etiket: 'Veri kristalini al' }, { id: 'incele', etiket: 'Kaideyi incele' }];
  if (id === 'yazit') return [{ id: 'oku', etiket: 'Yazıtı parmaklarınla oku' }];
  if (id === 'harita_kaidesi') return g.harita ? [{ id: 'incele', etiket: 'Boş kaideyi incele' }] : [{ id: 'al', etiket: 'Küreyi al' }, { id: 'incele', etiket: 'Küreyi incele' }];
  return [];
}

export function eylemUygula(d, id, eylemId) {
  const g = b(d);
  const n = NOKTALAR[id];
  if (n.can != null) {
    if (eylemId === 'vur') return { metin: n.ad[0].toUpperCase() + n.ad.slice(1) + '. Tını uzun süre kraterde asılı kalıyor.', nota: n.can };
    return { metin: n.tarif };
  }
  if (n.kaide) {
    if (eylemId === 'al' && !g['kristal_' + id]) {
      g['kristal_' + id] = true;
      d.envanter.push('veri_kristali');
      const kac = kristalSayisi(d);
      const r = { metin: 'Kristali kaideden kaldırıyorsun. Soluk ışığı parmaklarının arasında sönmüyor; avucunda serin, steril bir ağırlık. Veri kristali: ' + kac + ' / 3.', ses: 'kristal' };
      bitisDenetle(d);
      return r;
    }
    return { metin: n.tarif + (g['kristal_' + id] ? ' Kristal alındı; kaide boş.' : '') };
  }
  if (id === 'yazit') return { metin: 'Çizgiler dalgalı, birbirine dolanan bir yazı. Ortada beş çentik, pesten tize dizilmiş gibi; kraterdeki beş çan. Altında, sanki bir uyarı: kapılar ancak kendi şarkılarıyla açılır. Ve en altta bir ad ya da bir yer: buzun içindeki mezar.' };
  if (id === 'harita_kaidesi') {
    if (eylemId === 'al' && !g.harita) {
      g.harita = true;
      d.envanter.push('yildiz_haritasi');
      const r = { metin: 'Küreyi iki elinle kaldırıyorsun.', ses: 'kristal' };
      if (!bitisDenetle(d)) r.metin += ' Ama salonda hâlâ alınmamış veri kristalleri var.';
      return r;
    }
    return { metin: g.harita ? 'Kaidenin üstü boş; küre sende.' : n.tarif + ' Yüzeyinde sayısız ince oyuk; parmağını gezdirince hafifçe ötüyor.' };
  }
  return { metin: '' };
}

// Bütün kristaller ve harita alınınca görev biter
function bitisDenetle(d) {
  const g = b(d);
  if (g.kazi || !g.harita || kristalSayisi(d) < KAIDELER.length) return false;
  g.kazi = true;
  d.envanter = d.envanter.filter((x) => x !== 'veri_kristali' && x !== 'yildiz_haritasi');
  d.koloni.kaynaklar.kseno = (d.koloni.kaynaklar.kseno || 0) + 3;
  d.kaptan.tecrube += 40;
  d.itibar += 15;
  if (!d.kodeks.some((k) => k.id === 'kadim_harita'))
    d.kodeks.push({
      id: 'kadim_harita',
      ad: 'Kadim yıldız haritası',
      tarif: 'Aethelis-IV\'ün kadim sakinlerinden kalan, sesle yazılmış bir yıldız haritası. Yazıta göre onların mezarı buzun içinde.',
      itibar: 15,
    });
  d.gorev = { id: 'biyo' };
  d.sahne = 'kazi_tamam';
  return true;
}

export function biyoKubbeKuruldu(d) {
  b(d).biyo_kubbe = true;
  d.koloni.moral = Math.min(100, d.koloni.moral + 10);
  d.koloni.nufus.bilim = 1;
  d.itibar += 10;
  d.kaptan.tecrube += 50;
  if (!d.harita.poiler.includes('moloz_kusagi')) d.harita.poiler.push('moloz_kusagi');
  if (!d.bitenGorevler.includes('kazi')) d.bitenGorevler.push('kazi');
  d.gorev = { id: 'zemin' };
  d.sahne = 'biyo_kubbe';
}

// --- Rezonans: kapının dizisini çalmak ---
// rezonansBaslat(d, kapi) → { dizi }; rezonansCal(d, nota) → { sonuc: 'dogru' | 'yanlis' | 'acildi', ... }
export function rezonansBaslat(d, kapi) {
  d.rezonans = { kapi, sira: 0, secili: 2 };
  return { dizi: kapiDizisi(d, kapi) };
}

export function rezonansSecimDegis(d, fark) {
  if (!d.rezonans) return null;
  d.rezonans.secili = Math.max(0, Math.min(NOTALAR.length - 1, d.rezonans.secili + fark));
  return d.rezonans.secili;
}

export function rezonansCal(d) {
  const r = d.rezonans;
  if (!r) return { sonuc: 'yok' };
  const dizi = kapiDizisi(d, r.kapi);
  if (dizi[r.sira] !== r.secili) {
    r.sira = 0;
    return { sonuc: 'yanlis', metin: 'Kapı derinden inliyor ve susuyor. Dizi bozuldu; baştan.' };
  }
  r.sira += 1;
  if (r.sira < dizi.length) return { sonuc: 'dogru', metin: r.sira + '. nota tuttu.' };
  const bitis = DIZI_BITIS[r.kapi] || DIZI_BITIS.dis;
  b(d)[bitis.bayrak] = true;
  d.kaptan.tecrube += 10;
  d.rezonans = null;
  if (bitis.sahne) {
    if (r.kapi === 'sifre') {
      if (!d.koloni.parcalar) d.koloni.parcalar = {};
      d.koloni.parcalar.mod_kadim_anahtar = (d.koloni.parcalar.mod_kadim_anahtar || 0) + 1;
    }
    d.sahne = bitis.sahne;
    return { sonuc: 'acildi', metin: 'Son nota yerine oturuyor; bütün dizi bir an tek bir tını olup çınlıyor.' };
  }
  return { sonuc: 'acildi', metin: 'Son nota kapının tınısıyla birleşiyor. Bir an iki ses tek ses oluyor; sonra kapı açılıyor.' };
}

// --- Konuşmalar ---
export function konusma(d, kisiId) {
  const g = b(d);
  if (d.gorev.id !== 'kazi' && d.gorev.id !== 'biyo') return null;
  if (kisiId === 'muhendis') {
    const secenekler = [];
    let metin;
    if (!g.rezonator) {
      metin = 'Göçüğü dökümhanenin kirişleriyle açtım; batı geçidi artık yürünür. ' + ilkAd(d, 1) + ' oradan gelen uğultunun bir nota dizisi olduğunu söylüyor. Bir frekans rezonatörü yapabilirim; istediğin notayı çalar. ' + maliyetMetni(REZONATOR_MALIYET) + ' lazım.';
      secenekler.push({
        etiket: 'Rezonatörü yap',
        cevap: (dd) => {
          const k = dd.koloni.kaynaklar;
          const eksik = Object.keys(REZONATOR_MALIYET).filter((x) => (k[x] || 0) < REZONATOR_MALIYET[x]);
          if (eksik.length) return 'Malzeme yetmiyor: ' + maliyetMetni(REZONATOR_MALIYET) + ' lazım. Kraterde ve vadinin doğusunda kristal var.';
          for (const x of Object.keys(REZONATOR_MALIYET)) k[x] -= REZONATOR_MALIYET[x];
          dd.bayrak.rezonator = true;
          dd.envanter.push('rezonator');
          return 'İki kristali titanyum bir çatala oturtuyorum... işte. Beş perde çalar, kraterdeki çanlar gibi. Yukarı ya da aşağı kaydırınca nota değişir, çift dokununca çalar. Kapının dizisini önce iyice dinle.';
        },
      });
    } else if (!g.kazi) metin = 'Rezonatör yanında mı? Kapı ne çalarsa sen de onu çal. Ve dikkat et; ' + ilkAd(d, 1) + ' yapının içinden ağır bir uğultu duyduğunu söylüyor.';
    else if (!g.biyo_kubbe) metin = 'Kristaller ve harita kapsülde. Hekim onları okuyacak bir kubbe istiyor; terminalden planı açabilirsin.';
    else metin = 'Sıra tersanede, Kaptan. Platonun zemini gevşek; bir geminin ağırlığını taşıması için önce güçlendirmeliyiz.';
    secenekler.push({ etiket: 'Krater nasıl bir yer?', cevap: () => 'Rüzgâr girmiyor, ses yutuluyor. Kendi ayak seslerini bile uzaktan duyuyor gibi olursun. Çanları radarla bul; birine vurunca notası kraterin her yerinden duyulur.' });
    secenekler.push({ etiket: 'Konuşmayı bitir', cevap: () => null });
    return { metin, secenekler };
  }
  if (kisiId === 'telsizci') {
    return {
      metin: g.kazi
        ? 'Haritayı dinliyorum, Kaptan. Noktaların çoğu bildiğimiz yıldızlar, ama biri değil: buzlu bir moloz kuşağında, hiçbir kayıtta olmayan bir yer.'
        : 'Batıdaki uğultu bir dizi, Kaptan; her gece aynı notalar. Kraterde beş çan olmalı, kulenin yankısı beş perde gösteriyor. Kapının dizisini çalmadan önce çanların sesini ezberle.',
      secenekler: [
        { etiket: 'Notaları nasıl ayırırım?', cevap: () => 'Birinci çan en pes, beşinci en tiz. Kapı çalarken her notanın bir öncekinden ince mi kalın mı olduğunu dinle.' },
        { etiket: 'Konuşmayı bitir', cevap: () => null },
      ],
    };
  }
  if (kisiId === 'hekim') {
    return {
      metin: g.kazi ? 'Bu kristaller steril, Kaptan; ama içlerindeki şey bir genom. Okumadan önce karantina şart. Kubbe kurulmadan dokunmayacağım.' : 'Krater zehirli değil, ama o yapının içinden geldiği söylenen çekim... Bacakların ağırlaşırsa hemen geri çekil.',
      secenekler: [{ etiket: 'Konuşmayı bitir', cevap: () => null }],
    };
  }
  return null;
}

// --- Telsiz bildirimleri ---
export const BILDIRIMLER = [
  {
    id: 'krater_ilk',
    gorev: 'kazi',
    rol: 1,
    kosul: (d) => d.mekan === 'krater',
    metin: (d) => 'Kaptan, ' + ilkAd(d, 1) + '. Sesini zor duyuyorum; krater sesi yutuyor. Yankıdan beş çan sayıyorum: batıdan başlayıp saat yönünde, en pesten en tize. Kapı kraterin tam ortasında.',
  },
  {
    id: 'lab_ilk',
    gorev: 'kazi',
    rol: 0,
    kosul: (d) => d.mekan === 'kseno_lab',
    metin: (d) => 'Kaptan, ' + ilkAd(d, 0) + '. Cihazlarım çıldırdı; o salonun içinde yerçekimi yer yer üç katına çıkıyor. Derin uğultuları duyduğun yere basma.',
  },
];
