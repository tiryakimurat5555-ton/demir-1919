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
export function soyle(metin, oncelik = 'istek', kes = true, zorla = false) {
  if (!metin) return;
  if (!ayar.rehberAcik && !zorla) return;
  if ((GEREKEN_DUZEY[oncelik] ?? 1) > ayar.ayrinti) return;
  const kritik = oncelik === 'kritik';
  // Kritik bir uyarı okunurken sıradan bildirimler onu kesmez, arkasına eklenir
  let kesilsin = kes;
  if (kritikNo && !kritik && oncelik !== 'istek') kesilsin = false;
  // Telsiz konuşurken sıradan bildirimler üstüne binmez, telsiz bitince okunur
  if (!kesilsin && !kritik && mesgulSorgu) {
    let kalan = 0;
    try {
      kalan = mesgulSorgu();
    } catch (e) {}
    if (kalan > 0) {
      setTimeout(() => soyle(metin, oncelik, kes, zorla), kalan * 1000 + 250);
      return;
    }
  }
  // Tehlike uyarıları telsizi de susturur
  if (kritik && !kesilsin) digerSesleriKes();
  if (kesilsin && suruyor) {
    try {
      Speech.stop();
    } catch (e) {}
  }
  if (kesilsin) digerSesleriKes();
  const no = ++sira;
  if (kritik) kritikNo = no;
  else if (kesilsin) kritikNo = 0;
  suruyor = true;
  const bitti = () => {
    if (no === sira) suruyor = false;
    if (no === kritikNo) kritikNo = 0;
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

export function sustur() {
  kritikNo = 0;
  digerSesleriKes();
  if (!suruyor) return;
  suruyor = false;
  try {
    Speech.stop();
  } catch (e) {}
}
