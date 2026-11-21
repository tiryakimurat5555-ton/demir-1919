// Oyunun kendi sesli rehberi. Telefonun yerleşik Türkçe sesini kullanır (internet gerekmez).
// Oyun VoiceOver/TalkBack kapalıyken oynanır; bu rehber menüleri, anlatımı ve uyarıları okur.
//
// Öncelikler:
//   'kritik'  : tehlike ve önemli keşifler; ayrıntı düzeyi ne olursa olsun okunur
//   'istek'   : oyuncunun kendisinin istediği bilgi (tarif, durum, menü); her zaman okunur
//   'normal'  : olağan bildirimler; ayrıntı düzeyi "yalnızca kritik" ise okunmaz
//   'ayrinti' : ek bilgiler; yalnızca "ayrıntılı" düzeyde okunur
//
// Ses kısılıp açılma sorunu: ses kütüphanesi kısa bir efekt bitince iPhone'un ses
// kanalını kapatıyordu; o sırada süren konuşma kısılıp yeniden açılıyordu. efektler.js
// bütün oynatıcıları kanalı açık tutacak biçimde kurar ve sürekli sessiz bir döngü çalar.
// Konuşma yalnızca gerçekten sürerken durdurulur.
import * as Speech from 'expo-speech';

const GEREKEN_DUZEY = { kritik: 0, istek: 0, normal: 1, ayrinti: 2 };

let ayar = { rehberAcik: true, ayrinti: 1, konusmaHizi: 1.0, sesKimligi: '' };
let turkceSesler = [];
let varsayilanSes;
let sira = 0; // son konuşmanın numarası
let suruyor = false; // şu an konuşuluyor mu
let kritikNo = 0; // okunmakta olan kritik uyarının numarası (0: yok)

// Rehber konuşmaya başlarken ya da susturulunca çağrılacak işlev (telsiz konuşmasını keser)
let kesinceIslev = null;
export function kesinceCagir(f) {
  kesinceIslev = f;
}
// Başka bir ses kaydı (telsiz) çalarken sıradan bildirimlerin bekleyeceği süreyi söyleyen işlev
let mesgulSorgu = null;
let bekleyenNo = 0; // telsiz bitince okunacak son kesen sözün numarası
// Kritik uyarı okunurken telsizi kısıp açan işlev (true: kıs, false: aç)
let kisIslev = null;
export function kisinceCagir(f) {
  kisIslev = f;
}
export function mesgulSorgula(f) {
  mesgulSorgu = f;
}
export function konusuyorMu() {
  return suruyor;
}

function digerSesleriKes() {
  if (!kesinceIslev) return;
  try {
    kesinceIslev();
  } catch (e) {}
}

export async function rehberHazirla() {
  try {
    const sesler = await Speech.getAvailableVoicesAsync();
    turkceSesler = sesler
      .filter((s) => (s.language || '').toLowerCase().startsWith('tr'))
      .map((s) => ({ kimlik: s.identifier, ad: s.name || 'Türkçe ses', gelismis: s.quality === 'Enhanced' }));
    turkceSesler.sort((a, b) => (b.gelismis ? 1 : 0) - (a.gelismis ? 1 : 0));
    varsayilanSes = turkceSesler.length ? turkceSesler[0].kimlik : undefined;
  } catch (e) {
    turkceSesler = [];
    varsayilanSes = undefined;
  }
}

export function turkceSesListesi() {
  return turkceSesler;
}

export function rehberAyarla(yeni) {
  ayar = { ...ayar, ...yeni };
}

function secilenSes() {
  if (ayar.sesKimligi && turkceSesler.some((s) => s.kimlik === ayar.sesKimligi)) return ayar.sesKimligi;
  return varsayilanSes;
}

// kes: önceki konuşmayı kesip hemen başla (false ise arkasına eklenir)
// zorla: rehber kapalı olsa bile söyle (örneğin "rehber kapatıldı" bilgisi)
// bitince: konuşma bitince (ya da hiç başlamazsa) bir kez çağrılır
export function soyle(metin, oncelik = 'istek', kes = true, zorla = false, bitince = null) {
  let cagrildi = false;
  const son = () => {
    if (cagrildi || !bitince) return;
    cagrildi = true;
    try {
      bitince();
    } catch (e) {}
  };
  if (!metin) return son();
  if (!ayar.rehberAcik && !zorla) return son();
  if ((GEREKEN_DUZEY[oncelik] ?? 1) > ayar.ayrinti) return son();
  const kritik = oncelik === 'kritik';
  // Kritik bir uyarı okunurken sıradan bildirimler onu kesmez, arkasına eklenir
  let kesilsin = kes;
  if (kritikNo && !kritik && oncelik !== 'istek') kesilsin = false;
  // Murat (1.8): telsiz konuşurken rehber onu kesmez. Sıradan sözler telsiz bitince okunur; kesen sözlerden
  // yalnız en sonuncusu bekler (eskisi geçersizdir). Kritik tehlike uyarısı hemen okunur, telsiz o sırada kısılır.
  if (!kritik && mesgulSorgu) {
    let kalan = 0;
    try {
      kalan = mesgulSorgu();
    } catch (e) {}
    if (kalan > 0) {
      if (kesilsin) {
        const no = ++bekleyenNo;
        setTimeout(() => {
          if (no === bekleyenNo) soyle(metin, oncelik, kes, zorla, bitince);
        }, kalan * 1000 + 250);
      } else setTimeout(() => soyle(metin, oncelik, kes, zorla, bitince), kalan * 1000 + 350);
      return;
    }
  }
  if (kesilsin && suruyor) {
    try {
      Speech.stop();
    } catch (e) {}
  }
  if (kritik && kisIslev) {
    try {
      kisIslev(true);
    } catch (e) {}
  }
  const no = ++sira;
  if (kritik) kritikNo = no;
  else if (kesilsin) kritikNo = 0;
  suruyor = true;
  const bitti = () => {
    if (no === sira) suruyor = false;
    if (no === kritikNo) kritikNo = 0;
    if (kritik && kisIslev) {
      try {
        kisIslev(false);
      } catch (e) {}
    }
    son();
  };
  try {
    Speech.speak(metin, {
      language: 'tr-TR',
      voice: secilenSes(),
      rate: ayar.konusmaHizi,
      onDone: bitti,
      onStopped: bitti,
      onError: bitti,
    });
  } catch (e) {
    bitti();
  }
}

// Oyuncunun kendisi susturur (iki parmakla dokunma): telsiz de susar. telsizDe false ise yalnız rehber susar.
export function sustur(telsizDe = true) {
  kritikNo = 0;
  bekleyenNo++;
  if (telsizDe) digerSesleriKes();
  if (!suruyor) return;
  suruyor = false;
  try {
    Speech.stop();
  } catch (e) {}
}

// Söyler ve konuşma bitince çözülen bir söz döndürür (seslendirilmiş sahnelerde anlatıcı için)
export function soyleBekle(metin) {
  return new Promise((coz) => soyle(metin, 'istek', true, false, coz));
}
