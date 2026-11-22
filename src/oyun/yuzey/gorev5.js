// Beşinci görev "Kıvılcım ve İlk Uçuş" (gelistirici-entegrasyon-rehberi Faz 3: tersane, gemi inşası, seyrüsefer;
// araclar-ve-gemi-filosu.md Kademe 1 Kıvılcım; uzay-oyunu-tasarim-ve-senaryo.md bölüm 2-4). Saf JavaScript.
//
// Akış: tersane kurulunca (gorev 'kivilcim') reaktör laboratuvarı kurulur; dökümhanede plaka ve kablo, laboratuvarda
// itki yakıtı ve minyatür iyon reaktörü üretilir (terminal → Üretim). Platodaki kızakta dört aşamalı montaj
// (gemi/gemi.js). Gemi hazır olunca (gorev 'ilk_ucus') gemiye binilir, mürettebat odalara atanır, kokpitten kalkılır.
// Uzayda fenerler dinlenir; en az bir ziyaret noktasına gidilip ön tarama yapılır ve Aethelis-IV'e kenetlenilir.
// İnişte koloninin moral nabzı duyulur. Sonra gorev 'filo' (Faz 4: uzay görevleri, daha büyük gemiler).
import { TESISLER, maliyetMetni } from '../veri/tesisler';
import { KIVILCIM_MONTAJ, gemiyeBin, yakitDoldur, filo, yeniGemiSiniflari } from '../gemi/gemi';
import { GEMI_SINIFLARI } from '../veri/gemiler';
import { PARCALAR } from '../veri/uretim';
import { moralMetni } from '../koloni';
import { projeMetni } from './gorev6';

const b = (d) => d.bayrak;
const ad = (d, rol) => (d.murettebat[rol] ? d.murettebat[rol].ad : '');
const ilkAd = (d, rol) => ad(d, rol).split(' ')[0];

export const SAHNELER = {
  kivilcim_hazir: {
    baslik: 'Kıvılcım',
    ortam: 'ortam_plato',
    efekt: ['kaynak', 'hidrolik', 'sinyal'],
    metin: (d) => [
      'Son kaynağın kıvılcımları sönüyor. Kızağın üstünde, rüzgârda hafifçe titreyen ince uzun bir gövde: Kıvılcım. Hafif izcilik firkateyni; iki bölme, bir kokpit ve bir kargo.',
      ilkAd(d, 0) + ' türbini bir kez deniyor: ince, yüksek devirli bir vızıltı yükselip sönüyor. "Duydun mu Kaptan? Hızlandıkça ıslık çalacak."',
      'Kızaktan gemiye binebilirsin. İçeride iki parmakla sağa ya da sola kaydırınca odalar arasında geçersin; odada dokununca terminal, basılı tutunca odadaki görevliyle konuşma.',
    ],
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
    bitisSozu: 'Görev güncellendi: İlk uçuş. Gemiye bin, mürettebatı odalara ata, kokpitten kalk. Uzayda bir ziyaret noktasını tara ve Aethelis-IV\'e geri kenetlen.',
  },
  kalkis: {
    baslik: 'Kalkış',
    ortam: 'ortam_uzay',
    efekt: ['kalkis'],
    metin: (d) => [
      'Türbin uluyarak tizleşiyor; kızağın kenetleri birer birer açılıyor. Kıvılcım fırtınanın içinden dikine yükseliyor; dolu taneleri gövdeyi dövüyor, sonra birden her şey susuyor.',
      'Yörüngedesin. Kulaklığında fenerler: Aethelis-IV\'ün pes, sıcak tonu ve haritadaki ziyaret noktalarının daha ince sesleri. Bir fenerin sesi iki kulağında eşitlenince pruvan ona dönüktür.',
      'Yukarı kaydır: itki. Aşağı: ters itici. Sağa ya da sola kaydır: burnu döndür. Basılı tut: radar. Çift dokun: kenetlen. Dokun: gemi terminali.',
      d.erzakNotu || null,
    ],
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
  },
  inis: {
    baslik: 'İniş',
    ortam: 'ortam_plato',
    efekt: ['tislama', 'hidrolik'],
    metin: (d) => [
      'Aethelis-IV\'ün çekim kılavuzuna kilitleniyorsun. Atmosfer gövdeyi sarsıyor, fırtına yeniden çevreni sarıyor; kızağın kenetleri tok bir sesle kapanıyor.',
      'Dinleme kulesinden koloninin uğultusu geliyor. ' + moralMetni(d),
      d.erzakNotu || null,
      ...(b(d).ilkUcusYeni ? ['Beşinci görev tamamlandı: Kıvılcım ve ilk uçuş.', ilkAd(d, 0) + ': "Gemi tek parça döndü, Kaptan. Şimdi sıra daha büyük gemilerde ve o noktaların istediği donanımlarda."'] : []),
    ],
    secenekler: () => [{ etiket: 'Devam', sonra: null, yap: (d) => (b(d).ilkUcusYeni = false) }],
  },
  yeni_gemi: {
    baslik: 'Yeni gemi',
    ortam: 'ortam_plato',
    efekt: ['kaynak', 'hidrolik', 'sinyal'],
    metin: (d) => {
      const s = GEMI_SINIFLARI[d.yeniGemiSinif || 2];
      return [
        'Son kaynak da soğuyor. Kızakta yeni bir gövde: ' + s.ad + ', ' + s.sinif + '. ' + s.ses,
        'Rolü: ' + s.rol + ' ' + s.odalar.length + ' bölme: ' + s.odalar.map((o) => o.ad).join(', ') + '.',
        'Filoya katıldı. Kızaktan "Aktif gemiyi seç" ile onunla uçabilirsin.',
      ];
    },
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
  },
  kurtarma: {
    baslik: 'Yakıt bitti',
    ortam: 'ortam_kokpit',
    efekt: ['red', 'sinyal'],
    metin: (d) => [
      'Türbin öksürüp susuyor. Kıvılcım sessizce sürükleniyor; yalnız göstergelerin bip sesleri kalıyor.',
      ilkAd(d, 1) + ' acil durum feneri yakıyor. Saatler sonra koloniden fırlatılan bir yakıt kapsülü kenetleniyor; son damlalarla Aethelis-IV\'e dönebiliyorsun.',
      'Kızaktasın. Tank boş: kalkmadan önce yakıt doldur.' + (d.kurtarmaNotu ? ' ' + d.kurtarmaNotu : ''),
    ],
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
  },
};

export function gorevIpucu(d) {
  const g = b(d);
  if (d.gorev.id === 'kivilcim') {
    const bas = 'Kıvılcım\'ın montajı. ';
    if (!d.koloni.binalar.includes('reaktor_lab'))
      return bas + 'Önce terminalden Graviton ve Reaktör Laboratuvarı\'nı kur: ' + maliyetMetni(TESISLER.reaktor_lab.maliyet) + '. Ağır izotop sırtlardaki bacalardan boru hattıyla zamanla gelir.';
    const t = d.tersane || { asamalar: {} };
    const sira = KIVILCIM_MONTAJ.find((a) => t.asamalar[a.id] !== 'bitti');
    if (t.kaynak) return bas + 'Mühendisler kızakta çalışıyor. Bekle ya da sıradaki parçaları üret.';
    const p = d.koloni.parcalar || {};
    const gerek = Object.keys(sira.gerek).map((k) => sira.gerek[k] + ' ' + PARCALAR[k].ad + ' (elinde ' + (p[k] || 0) + ')');
    return (
      bas +
      'Sıradaki aşama: ' +
      sira.ad +
      '. Gerekli: ' +
      gerek.join(', ') +
      '. Parçaları kapsüldeki terminalden, Üretim menüsünden üret; dökümhane plaka ve kablo, laboratuvar yakıt ve reaktör yapar. Sonra platodaki kızakta montajı başlat.'
    );
  }
  if (d.gorev.id === 'ilk_ucus') {
    if (!d.gemi) return 'Kıvılcım hazır değil.';
    if (d.gemi.yer !== 'uzay')
      return 'İlk uçuş. Platodaki kızaktan gemiye bin. Kokpit terminalinden mürettebat ata ve kalk.' + ((d.taranan || []).length ? ' Ön tarama yapıldı; geri döndün ama iniş kaydı tamam değil.' : '');
    if (!(d.taranan || []).length) return 'İlk uçuş. Haritadaki bir ziyaret noktasının fenerine dön, yanına git, yavaşla ve çift dokunup kenetlen: ön tarama raporu gelir.';
    return 'İlk uçuş. Ön tarama tamam. Aethelis-IV\'ün pes fenerine dön, yavaşla ve kenetlen.';
  }
  if (d.gorev.id === 'filo')
    return 'Beş görev tamamlandı. Uzaydaki görevler büyük gemiler ve özel donanım ister; noktaların ön taramaları neyin eksik olduğunu söyler. ' + projeMetni(d) + ' Uzay görevlerinin kendisi sonraki sürümlerde.';
  return '';
}

// --- Kızak (platoda) ---
export function noktaMi(id) {
  return id === 'kizak';
}
export function noktaEylemleri(d, id) {
  if (!d.koloni.binalar.includes('tersane')) return [{ id: 'incele', etiket: 'Kızağı incele' }];
  const e = [];
  if (!d.gemi) e.push({ id: 'montaj', etiket: 'Montaj', ipucu: 'Kıvılcım\'ın aşamaları.' });
  if (d.gemi) {
    if (d.gemi.yer === 'kizak') e.push({ id: 'bin', etiket: d.gemi.ad + '\'ya bin' });
    e.push({ id: 'modul', etiket: 'Modül tak' });
    e.push({ id: 'yakit', etiket: 'Yakıt doldur' });
    const t = d.tersane;
    const surer = t && Object.keys(t.asamalar).length && !filo(d).some((g) => g.sinif === t.sinif);
    if (surer) e.push({ id: 'montaj', etiket: 'Montaj: ' + GEMI_SINIFLARI[t.sinif].ad });
    else if (yeniGemiSiniflari(d).some((x) => x.olur)) e.push({ id: 'yeni', etiket: 'Kızağa yeni gemi koy' });
    else if (t && !Object.keys(t.asamalar).length && t.sinif > 1) e.push({ id: 'montaj', etiket: 'Montaj: ' + GEMI_SINIFLARI[t.sinif].ad });
    if ((d.filo || []).length) e.push({ id: 'filo', etiket: 'Aktif gemiyi seç' });
  }
  e.push({ id: 'incele', etiket: 'Kızağı incele' });
  return e;
}
export function eylemUygula(d, id, eylemId) {
  if (eylemId === 'montaj') return { montaj: true };
  if (eylemId === 'modul') return { modul: true };
  if (eylemId === 'yeni') return { yeniGemi: true };
  if (eylemId === 'filo') return { filo: true };
  if (eylemId === 'yakit') return yakitDoldur(d);
  if (eylemId === 'bin') {
    const r = gemiyeBin(d);
    return { ...r, gemi: true, ses: 'kapi_gemi' };
  }
  if (!d.koloni.binalar.includes('tersane')) return { metin: 'Dört ayağı kilitli, raylarına enerji gelen boş bir kızak. Tersane kurulunca üstünde gemi yükselecek.' };
  return { metin: d.gemi ? 'Kızakta Kıvılcım duruyor; gövdesi rüzgârda ince ince vızıldıyor.' : 'Kızağın iki yanında iskeleler ve vinçler. Montajı buradan başlatırsın.' };
}

export function gemiHazir(d, sinif = 1) {
  d.kaptan.tecrube += 40 * sinif;
  d.itibar += 10 * sinif;
  if (sinif === 1) {
    if (d.gorev.id === 'kivilcim') d.gorev = { id: 'ilk_ucus' };
    d.sahne = 'kivilcim_hazir';
  } else {
    d.yeniGemiSinif = sinif;
    d.sahne = 'yeni_gemi';
  }
}

// İniş sonrası: ilk uçuş tamamlandı mı?
export function inisSonrasi(d) {
  if (d.gorev.id === 'ilk_ucus' && (d.taranan || []).length) {
    if (!d.bitenGorevler.includes('kivilcim')) d.bitenGorevler.push('kivilcim');
    d.gorev = { id: 'filo' };
    d.kaptan.tecrube += 50;
    d.itibar += 15;
    d.koloni.moral = Math.min(100, d.koloni.moral + 10);
    b(d).ilkUcusYeni = true;
  }
}

export function konusma(d, kisiId) {
  if (!['kivilcim', 'ilk_ucus', 'filo'].includes(d.gorev.id)) return null;
  if (kisiId === 'muhendis') {
    const secenekler = [
      {
        etiket: 'Montaj nasıl yapılır?',
        cevap: () =>
          'Dört aşama: gövde, kokpit, reaktör, itki. İlk üçünü vinçle oturturuz. Parça kulaklığında bir yana kaymış sallanır; sağa ya da sola kaydır, ses iki kulağında eşit olunca tam yuvanın üstündedir. Sonra aşağı kaydır, üç basamakta iner. Ortalanmadan indirirsen kızağa çarpar. Oturunca çift dokun, kenetlenir; kaynağı biz yaparız. Tersaneye işçi verirsen daha çabuk biter.',
      },
      {
        etiket: 'Parçalar nereden?',
        cevap: () =>
          'Terminalde Üretim menüsü var. Dökümhane bir dökümde elli plaka ve yirmi birim kablo yapar; laboratuvar on litre yakıt ve minyatür iyon reaktörü. Hammadde azalırsa yataklar zamanla yenilenir, bacalardan da izotop gelir. Koloni yönetiminden sanayiye işçi verirsen hepsi hızlanır.',
      },
    ];
    secenekler.push({ etiket: 'Konuşmayı bitir', cevap: () => null });
    let metin;
    if (d.gorev.id === 'kivilcim') metin = 'Tersane hazır, Kaptan. İlk gemi Kıvılcım: yüz elli plaka, kırk birim kablo, yirmi beş litre yakıt ve bir minyatür iyon reaktörü. ' + (d.koloni.binalar.includes('reaktor_lab') ? 'Laboratuvar da kurulu; üretime başlayabiliriz.' : 'Yakıtla reaktör için önce reaktör laboratuvarı lazım.');
    else if (d.gorev.id === 'ilk_ucus') metin = 'Kıvılcım hazır. Kokpitte bir telsiz subayı olursa fenerleri daha uzaktan duyarsın; ' + ilkAd(d, 1) + '\'in kulağı bu işte iyidir.';
    else metin = 'Kıvılcım küçük ama sağlam. Sektör 15\'e ve Moloz Kuşağı\'na gidecek gemi için yeni tesisler ve modüller gerekecek.';
    return { metin, secenekler };
  }
  if (kisiId === 'telsizci') {
    return {
      metin:
        d.gorev.id === 'kivilcim'
          ? 'Kule iki noktayı izliyor, Kaptan: Sektör 15\'teki Prometheus çağrısı ve Moloz Kuşağı. Gemi bitince ikisinin de fenerini duyacaksın.'
          : 'Uzayda her noktanın kendi perdesi var. Aethelis en pes olanı; Sektör 15 orta, Moloz Kuşağı en ince. Fenerin sesi iki kulağında eşitlenince pruva ona kilitlenir; bir tık duyarsın.',
      secenekler: [{ etiket: 'Konuşmayı bitir', cevap: () => null }],
    };
  }
  if (kisiId === 'hekim') {
    return {
      metin: 'Yörüngede yalnız gibi hissedeceksin, Kaptan. Kargo bölmesindeki ranza iki kişilik; uzun yolda dinlen. Ve yakıtı dinle: yarı yolda biterse eve dönemezsin.',
      secenekler: [{ etiket: 'Konuşmayı bitir', cevap: () => null }],
    };
  }
  return null;
}

export const BILDIRIMLER = [
  {
    id: 'lab_kuruldu',
    gorev: 'kivilcim',
    rol: 0,
    kosul: (d) => d.koloni.binalar.includes('reaktor_lab'),
    metin: (d) => 'Kaptan, ' + ilkAd(d, 0) + '. Laboratuvar çalışıyor. Terminalden üretime başla; plakalar en uzun süren iş.',
  },
];
