// Dördüncü yüzey görevi "Tersane Zemin Güçlendirmesi ve Şasi Rayları" (belgeler/uzay-oyunu-tasarim-ve-senaryo.md
// bölüm 1: "Uğultulu platosundaki gevşek zemin tabakasını polimer alaşımlarla sertleştirme, dev gemi kızağının
// hidrolik ayaklarını sabitleme ve fırlatma platformunu enerji hatlarıyla donatma"; gezegen-gelisimi-v2 2.3 kuzey
// sektörü: dolu, rüzgâr ulumaları, sonik ıslıklar). Saf JavaScript.
//
// Oynanış: mühendisten hidrolik el pompası ve kablo makarası alınır. Kızağın dört ayağının altına polimer dökülür
// (polimer Manyetik Sırtlar'daki kükürt çatlaklarından toplanır); sertleşmemiş zeminde ayak dengelenemez.
// Dengeleme kulakla yapılır: kulaklıkta iki ton, sabit referans ve ayağın tonu. Ayak yüksekse tonu incedir;
// aşağı sürükle. İki ton birleşince aradaki titreşim yavaşlar ve durur; 2 sn kıpırdamazsan ayak kilitlenir.
// Platoda ara sıra rüzgâr hamlesi gelir (dunya.js firtinaIlerle): ıslığı duyunca dur. Dengelerken hamle ayağı sarsar.
// Dört ayak kilitlenince dağıtım kutusuna kablo bağlanır → zemin; sonra terminalden tersane.
// Bayraklar: zeminHazir, sertlesti_<ayak>, kilitli_<ayak>, zemin, tersane.
import { NOKTALAR } from './harita';
import { HAMMADDELER, TESISLER, maliyetMetni } from '../veri/tesisler';

const b = (d) => d.bayrak;
const ad = (d, rol) => (d.murettebat[rol] ? d.murettebat[rol].ad : '');
const ilkAd = (d, rol) => ad(d, rol).split(' ')[0];
export const AYAKLAR = ['ayak_1', 'ayak_2', 'ayak_3', 'ayak_4'];

// Dengeleme sabitleri
export const DENGE_ESIGI = 0.05; // |sapma| bunun altındaysa dengede
export const KILIT_SURESI = 2; // dengede bu kadar kalınca kilitlenir (sn)
export const REFERANS_FREK = 330; // kulaklıktaki sabit ton (Hz); ayak tonu = 330 × 2^(sapma / 4)

export function ayakSayisi(d) {
  return AYAKLAR.filter((a) => b(d)['kilitli_' + a]).length;
}

// Ayağın başlangıç sapması tohumdan: 0,45-0,85 arası, yüksek ya da alçak
function baslangicSapma(d, ayak) {
  const i = AYAKLAR.indexOf(ayak);
  let x = ((d.tohum || 1) * 9301 + (i + 1) * 49297) % 233280;
  if (x < 0) x += 233280;
  const r = x / 233280;
  const isaret = Math.floor(r * 1000) % 2 === 0 ? 1 : -1;
  return isaret * (0.45 + r * 0.4);
}

// --- Sahneler ---
export const SAHNELER = {
  zemin_tamam: {
    baslik: 'Kızak oturdu',
    ortam: 'ortam_plato',
    efekt: ['hidrolik', 'jenerator'],
    metin: (d) => [
      'Kablonun ucunu dağıtım kutusuna oturtuyorsun. Bir an hiçbir şey olmuyor; sonra kızağın dört ayağından derin bir hidrolik inilti yükseliyor ve aynı anda susuyor.',
      'Ayağının altında kızak titriyor: raylara enerji geldi. Rüzgâr hâlâ uluyor ama çelik artık sarsılmıyor.',
      ilkAd(d, 0) + ' telsizden: "Ölçümler temiz, Kaptan! Zemin bir geminin ağırlığını taşır. Terminalden tersaneyi kurabiliriz."',
    ],
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
    bitisSozu: 'Görev güncellendi: Merkezi Montaj Tersanesi\'ni kur. Gerekenler: ' + maliyetMetni(TESISLER.tersane.maliyet) + '. Kapsüldeki merkez terminalinden.',
  },
  tersane: {
    baslik: 'Merkezi Montaj Tersanesi',
    ortam: 'ortam_plato',
    efekt: ['kapi', 'hidrolik', 'sinyal'],
    metin: (d) => [
      'Günler süren bir çalışma. Kızağın iki yanında çelik iskeleler göğe doğru yükseliyor; vinçlerin zincirleri rüzgârda çınlıyor.',
      'Kapsül bilgisayarı: Merkezi Montaj Tersanesi devrede. Kademe bir kızak: hafif izcilik gemisi inşa edilebilir. Koloni üçüncü kademeye çıktı: Endüstriyel Koloni.',
      'Dördüncü görev tamamlandı: Tersane Zemin Güçlendirmesi.',
      ilkAd(d, 0) + ': "İlk geminin adı hazır, Kaptan: Kıvılcım. İki bölme; bir kokpit, bir kargo. Küçük ama yıldızlara yeter."',
    ],
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
    bitisSozu: 'Yeni görev: Kıvılcım\'ın montajı. Jeneratörün başındaki mühendisle konuş.',
  },
};

// --- Görev ipucu ---
export function gorevIpucu(d) {
  const g = b(d);
  if (d.gorev.id === 'zemin') {
    const bas = 'Tersane Zemin Güçlendirmesi. ';
    if (!g.zeminHazir) return bas + 'Jeneratörün başındaki mühendisle konuş. Gözcü Tepesi\'nin ardındaki plato yokuşu açık.';
    const sertlesmemis = AYAKLAR.filter((a) => !g['sertlesti_' + a]).length;
    const kalan = AYAKLAR.filter((a) => !g['kilitli_' + a]).map((a) => NOKTALAR[a].ad);
    if (kalan.length) {
      const polimer = d.koloni.kaynaklar.polimer || 0;
      return (
        bas +
        'Uğultulu Plato\'daki kızağın kalan ayakları: ' +
        kalan.join(', ') +
        '. ' +
        (sertlesmemis ? 'Her ayağın altına bir polimer dök; elinde ' + polimer + ' polimer var' + (polimer < sertlesmemis ? '. Polimer Manyetik Sırtlar\'daki kükürt çatlaklarından toplanır' : '') + '. ' : '') +
        'Sonra ayağı kulakla dengele. Rüzgâr hamlesinin ıslığını duyunca dur.'
      );
    }
    return bas + 'Dört ayak kilitli. Kızağın ortasındaki dağıtım kutusuna kabloyu bağla.';
  }
  if (d.gorev.id === 'tersane') {
    const m = TESISLER.tersane.maliyet;
    const k = d.koloni.kaynaklar;
    return (
      'Merkezi Montaj Tersanesi\'ni kur: kapsüldeki merkez terminalinden. Gerekenler: ' +
      maliyetMetni(m) +
      '. Elinde: ' +
      Object.keys(m)
        .map((x) => (k[x] || 0) + ' ' + HAMMADDELER[x].ad)
        .join(', ') +
      '. Platoda bazalt ve titanyum, sırtlarda polimer var.'
    );
  }
  return '';
}

// --- Noktalar: ayaklar ve dağıtım kutusu ---
export function noktaMi(id) {
  const n = NOKTALAR[id];
  return !!(n && (n.ayak || id === 'dagitim_kutusu'));
}

export function noktaEylemleri(d, id) {
  const g = b(d);
  const n = NOKTALAR[id];
  if (n.ayak) {
    if (g['kilitli_' + id]) return [{ id: 'incele', etiket: 'Ayağı incele' }];
    const e = [];
    if (!g['sertlesti_' + id]) e.push({ id: 'polimer', etiket: 'Zemine polimer dök', ipucu: 'Bir polimer harcar; gevşek bazaltı sertleştirir.' });
    e.push({ id: 'dengele', etiket: 'Ayağı dengele', ipucu: 'Hidrolik pompayla, kulakla.' });
    e.push({ id: 'incele', etiket: 'Ayağı incele' });
    return e;
  }
  if (id === 'dagitim_kutusu') {
    if (g.zemin) return [{ id: 'incele', etiket: 'Kutuyu incele' }];
    return [
      { id: 'bagla', etiket: 'Kabloyu bağla' },
      { id: 'incele', etiket: 'Kutuyu incele' },
    ];
  }
  return [];
}

export function eylemUygula(d, id, eylemId) {
  const g = b(d);
  const n = NOKTALAR[id];
  if (n.ayak) {
    if (eylemId === 'incele') {
      if (g['kilitli_' + id]) return { metin: n.ad + ' kilitli; topuğu sertleşmiş zemine oturmuş. Rüzgârda bile kıpırdamıyor.' };
      return { metin: n.tarif + (g['sertlesti_' + id] ? ' Altındaki polimer katılaşmış; zemin artık taş gibi.' : '') };
    }
    if (eylemId === 'polimer') {
      if (g['sertlesti_' + id]) return { metin: 'Bu ayağın zemini zaten sertleşti.' };
      if ((d.koloni.kaynaklar.polimer || 0) < 1) return { metin: 'Polimerin yok. Manyetik Sırtlar\'daki kükürt çatlaklarından topla.', ses: 'red' };
      d.koloni.kaynaklar.polimer -= 1;
      g['sertlesti_' + id] = true;
      return { metin: 'Reçineyi topuğun çevresindeki çatlaklara döküyorsun. Fokurdayıp tıslıyor, sonra birkaç saniyede taş gibi katılaşıyor.', ses: 'polimer' };
    }
    if (eylemId === 'dengele') {
      if (!d.envanter.includes('pompa')) return { metin: 'Pistonu oynatacak bir pompan yok. Mühendis bir hidrolik el pompası verebilir.', ses: 'red' };
      if (!g['sertlesti_' + id])
        return { metin: 'Pompayı çalıştırıyorsun ama ayak, gevşek bazaltın içine gömülüyor; ne kadar pompalasan batıyor. Önce zemine polimer dök.', ses: 'red' };
      return { terazi: true };
    }
  }
  if (id === 'dagitim_kutusu') {
    if (eylemId === 'incele') return { metin: g.zemin ? 'Kutu uğulduyor; raylara enerji akıyor.' : n.tarif };
    if (eylemId === 'bagla') {
      if (!d.envanter.includes('kablo')) return { metin: 'Bağlayacak bir kablon yok. Mühendiste kablo makarası var.', ses: 'red' };
      const kalan = AYAKLAR.filter((a) => !g['kilitli_' + a]).map((a) => NOKTALAR[a].ad);
      if (kalan.length) return { metin: 'Ayaklar kilitlenmeden enerji verirsen kızak yan yatar. Kilitlenmemiş: ' + kalan.join(', ') + '.', ses: 'red' };
      d.envanter = d.envanter.filter((x) => x !== 'kablo' && x !== 'pompa');
      g.zemin = true;
      d.koloni.bolgeler.kuzey = 'acik';
      d.kaptan.tecrube += 30;
      d.itibar += 10;
      d.gorev = { id: 'tersane' };
      d.sahne = 'zemin_tamam';
      return { metin: '', ses: 'hidrolik' };
    }
  }
  return { metin: 'Bir şey olmadı.' };
}

// --- Dengeleme (kulakla) ---
// teraziBaslat(d, ayak); teraziPompa(d, fark): yukarı pozitif (ayağı kaldırır);
// teraziIlerle(d, dt) → olaylar: 'yakin' (ilk kez dengeye yaklaşınca), 'dengede', 'kaydi', 'kilitlendi', 'hepsi'
export function teraziBaslat(d, ayak) {
  d.terazi = { ayak, sapma: baslangicSapma(d, ayak), kilit: 0, sure: 0, yakin: false, dengede: false };
  return d.terazi;
}

export function teraziPompa(d, fark) {
  const t = d.terazi;
  if (!t) return null;
  t.sapma = Math.max(-1, Math.min(1, t.sapma + fark));
  return t.sapma;
}

export function teraziIlerle(d, dt) {
  const t = d.terazi;
  const olaylar = [];
  if (!t) return olaylar;
  t.sure += dt;
  // Gevşemiş eski hidrolik: ayak yavaşça kayar (yönü zamanla değişir)
  t.sapma = Math.max(-1, Math.min(1, t.sapma + 0.03 * Math.sin(t.sure * 0.8 + AYAKLAR.indexOf(t.ayak)) * dt));
  const m = Math.abs(t.sapma);
  if (!t.yakin && m < 0.2) {
    t.yakin = true;
    olaylar.push('yakin');
  }
  if (m < DENGE_ESIGI) {
    if (!t.dengede) olaylar.push('dengede');
    t.dengede = true;
    t.kilit += dt;
    if (t.kilit >= KILIT_SURESI) {
      b(d)['kilitli_' + t.ayak] = true;
      d.terazi = null;
      olaylar.push('kilitlendi');
      if (ayakSayisi(d) === AYAKLAR.length) olaylar.push('hepsi');
    }
  } else {
    if (t.dengede) olaylar.push('kaydi');
    t.dengede = false;
    t.kilit = 0;
  }
  return olaylar;
}

// Ayağın tonu (Hz): yüksek ayak ince ton
export function ayakFrek(sapma) {
  return REFERANS_FREK * Math.pow(2, sapma / 4);
}

export function teraziMetni(d) {
  const t = d.terazi;
  if (!t) return '';
  const m = Math.abs(t.sapma);
  const yon = t.sapma > 0 ? 'yüksek; aşağı sürükle' : 'alçak; yukarı sürükle';
  let soz;
  if (m < DENGE_ESIGI) soz = 'Dengede. Kıpırdama.';
  else if (m < 0.15) soz = 'Neredeyse dengede, çok az ' + yon + '.';
  else if (m < 0.4) soz = 'Biraz ' + yon + '.';
  else soz = 'Çok ' + yon + '.';
  return NOKTALAR[t.ayak].ad + ': ' + soz + ' Kilitli ayak: ' + ayakSayisi(d) + ' / 4.';
}

// --- Tersane kurulunca ---
export function tersaneKuruldu(d) {
  b(d).tersane = true;
  d.koloni.seviye = Math.max(d.koloni.seviye, 3);
  d.koloni.nufus.tersane = (d.koloni.nufus.tersane || 0) + 2;
  d.koloni.moral = Math.min(100, d.koloni.moral + 10);
  d.itibar += 10;
  d.kaptan.tecrube += 40;
  if (!d.bitenGorevler.includes('zemin')) d.bitenGorevler.push('zemin');
  d.gorev = { id: 'kivilcim' };
  d.sahne = 'tersane';
}

// --- Konuşmalar ---
export function konusma(d, kisiId) {
  const g = b(d);
  if (d.gorev.id !== 'zemin' && d.gorev.id !== 'tersane') return null;
  if (kisiId === 'muhendis') {
    const secenekler = [];
    let metin;
    if (!g.zeminHazir) {
      metin =
        'Kaptan, gemi için yer hazır: Gözcü Tepesi\'nin ardındaki Uğultulu Plato. Eski bir kızak var orada, dört hidrolik ayak üstünde; ama zemin gevşek bazalt, ayaklar batmış. Altlarını polimerle sertleştirip ayakları dengelememiz, sonra kızağa enerji vermemiz gerek.';
      secenekler.push({
        etiket: 'Platoya hazırlan',
        cevap: (dd) => {
          dd.bayrak.zeminHazir = true;
          if (!dd.envanter.includes('pompa')) dd.envanter.push('pompa');
          if (!dd.envanter.includes('kablo')) dd.envanter.push('kablo');
          return 'Al: hidrolik el pompası ve kablo makarası. Her ayağa bir polimer lazım, dört tane; polimer sırtlardaki kükürt çatlaklarından sızıyor, maskeni unutma. Ayakları dengeledikten sonra kabloyu ortadaki dağıtım kutusuna bağla.';
        },
      });
    } else if (!g.zemin) metin = 'Ayaklar nasıl, Kaptan? Kilitli olanlar: ' + ayakSayisi(d) + ' / 4.';
    else if (!g.tersane) metin = 'Kızak taş gibi oturdu. Terminalden tersaneyi kur; ' + maliyetMetni(TESISLER.tersane.maliyet) + ' gerekir.';
    else metin = 'Kıvılcım\'ın planlarını çıkarıyorum. Gövde plakaları dökümhaneden, reaktör laboratuvarından çekirdek... Bir sonraki adım bu.';
    if (g.zeminHazir && !g.zemin) {
      secenekler.push({
        etiket: 'Dengelemeyi anlat',
        cevap: () =>
          'Kulaklığında iki ton duyacaksın. Biri sabit: kızağın referansı. Öteki ayağın tonu. Ayak yüksekse tonu ince; parmağını aşağı sürükle. Alçaksa kalın; yukarı sürükle. İki ton yaklaştıkça aralarında bir titreşim duyarsın; titreşim yavaşlayıp durunca ayak dengede. İki saniye kıpırdamazsan kilitlenir.',
      });
      secenekler.push({ etiket: 'Polimer nereden?', cevap: () => 'Manyetik Sırtlar\'daki kükürt çatlaklarından. İki çatlak var; radarla bul. Bacalardan uzak, ama yine de maruziyetine dikkat et.' });
    }
    secenekler.push({ etiket: 'Konuşmayı bitir', cevap: () => null });
    return { metin, secenekler };
  }
  if (kisiId === 'telsizci') {
    return {
      metin: g.zemin
        ? 'Platodan kuleye temiz bir hat çektim, Kaptan. Fırtına bile artık parazit yapmıyor.'
        : 'Platoda rüzgâr hamleler hâlinde gelir, Kaptan. Önce ince bir ıslık yükselir; iki buçuk saniye sonra hamle vurur. Islığı duyunca dur, çömel; yürürken yakalarsa seni savurur. Islığın hangi yönden geldiğini de söylerim.',
      secenekler: [
        { etiket: 'Dengelerken hamle gelirse?', cevap: () => 'Kızak sarsılır, ayak dengeden kayar. Telaşlanma; tonları yeniden birleştir.' },
        { etiket: 'Konuşmayı bitir', cevap: () => null },
      ],
    };
  }
  if (kisiId === 'hekim') {
    return {
      metin: 'Plato zehirli değil, Kaptan; ama dolu taneleri keskin ve rüzgâr insanı yere çalar. Kükürt çatlaklarına inersen maskeni tak ve maruziyetini dinle.',
      secenekler: [{ etiket: 'Konuşmayı bitir', cevap: () => null }],
    };
  }
  return null;
}

// --- Telsiz bildirimleri ---
export const BILDIRIMLER = [
  {
    id: 'plato_ilk',
    gorev: 'zemin',
    rol: 1,
    kosul: (d) => d.mekan === 'plato',
    metin: (d) => 'Kaptan, ' + ilkAd(d, 1) + '. Rüzgâr ölçerim hamleleri gösteriyor; yaklaşık her on beş, yirmi saniyede bir. Islığı duyunca dur. Kızağın dört ayağı platonun ortasında; dağıtım kutusu tam ortalarında.',
  },
  {
    id: 'ilk_ayak',
    gorev: 'zemin',
    rol: 0,
    kosul: (d) => ayakSayisi(d) >= 1,
    metin: (d) => 'Kaptan, ' + ilkAd(d, 0) + '. Bir ayak oturdu, kızağın o köşesi artık sarsılmıyor! Üç ayak daha.',
  },
];
