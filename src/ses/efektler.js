// Ortam sesleri ve efektler. Bütün sesler uygulamanın içindedir (internet gerekmez).
// Kaynak: Bahtiyar'ın Google Drive'ındaki Efektler klasörü (ortam döngüleri ve kısa efektler);
// döngüler çapraz geçişle kesintisiz yapıldı. Hangi dosyadan geldikleri CLAUDE.md'de.
// tik.wav Kayıp Okyanus'tan. Ses dosyası olmayan adlar (secim, dip) titreşimle karşılanır.
import { createAudioPlayer, setAudioModeAsync, setIsAudioActiveAsync } from 'expo-audio';
import * as Haptics from 'expo-haptics';

const KAYNAKLAR = {
  tik: require('../../assets/ses/tik.wav'),
  sessiz: require('../../assets/ses/sessiz.wav'),
  ortam_yuzey: require('../../assets/ses/ortam_yuzey.wav'),
  ortam_kapsul: require('../../assets/ses/ortam_kapsul.wav'),
  ortam_harabe: require('../../assets/ses/ortam_harabe.wav'),
  ortam_menu: require('../../assets/ses/ortam_menu.wav'),
  bip: require('../../assets/ses/bip.wav'),
  dugme: require('../../assets/ses/dugme.wav'),
  jenerator: require('../../assets/ses/jenerator_calis.wav'),
  kapi: require('../../assets/ses/kapi.wav'),
  red: require('../../assets/ses/reddedildi.wav'),
  sinyal: require('../../assets/ses/sinyal.wav'),
  sonar: require('../../assets/ses/sonar.wav'),
  tislama: require('../../assets/ses/tislama.wav'),
};

// Ortam döngülerinin kendi düzeyleri (konuşmanın altında kalsınlar diye düşük)
const DONGULER = {
  ortam_yuzey: 0.55,
  ortam_kapsul: 0.6,
  ortam_harabe: 0.55,
  ortam_menu: 0.45,
};

const oynaticilar = {};
let hazir = false;
let ortamDuzeyi = 0.6;
let calanOrtam = null;
let ortamOrani = 1;
const solmalar = {};

export async function sesleriHazirla() {
  if (hazir) return;
  try {
    await setAudioModeAsync({ playsInSilentMode: true, interruptionMode: 'mixWithOthers', shouldPlayInBackground: false });
  } catch (e) {}
  try {
    await setIsAudioActiveAsync(true);
  } catch (e) {}
  for (const ad of Object.keys(KAYNAKLAR)) {
    try {
      // keepAudioSessionActive: kısa bir ses bitince iPhone'un ses kanalı kapanıp konuşmayı kısmasın
      const p = createAudioPlayer(KAYNAKLAR[ad], { keepAudioSessionActive: true });
      if (DONGULER[ad] !== undefined || ad === 'sessiz') p.loop = true;
      oynaticilar[ad] = p;
    } catch (e) {}
  }
  hazir = true;
  oturumuAcikTut();
}

// Sürekli çalan sessiz döngü: iOS'ta konuşmanın kısık başlamasını önler
export function oturumuAcikTut() {
  const p = oynaticilar.sessiz;
  if (!p) return;
  try {
    p.volume = 1;
    if (!p.playing) p.play();
  } catch (e) {}
}

function titret(ad) {
  try {
    if (ad === 'tik') Haptics.selectionAsync().catch(() => {});
    else if (ad === 'secim') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    else if (ad === 'dip') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
  } catch (e) {}
}

// iOS'ta seekTo eşzamansızdır: sarma bitmeden play() çağrılırsa ses çalmayabilir (Kayıp Okyanus'taki düzeltme)
function basaSarVeCal(p) {
  let oldu = false;
  const oynat = () => {
    if (oldu) return;
    oldu = true;
    try {
      p.play();
    } catch (e) {}
  };
  try {
    if (p.playing) p.pause();
    const s = p.seekTo(0);
    if (s && typeof s.then === 'function') {
      s.then(oynat, oynat);
      setTimeout(oynat, 120);
    } else oynat();
  } catch (e) {
    oynat();
  }
}

export function cal(ad, duzey = 1) {
  const p = oynaticilar[ad];
  if (!p) {
    titret(ad);
    return;
  }
  try {
    p.volume = Math.max(0, Math.min(1, duzey));
    basaSarVeCal(p);
  } catch (e) {}
}

function hedefDuzey(ad) {
  return (DONGULER[ad] ?? 0.5) * ortamDuzeyi * ortamOrani;
}

// Bir döngünün düzeyini yumuşakça değiştirir; 0'a inince duraklatır
function sol(ad, hedef, sure = 900) {
  const p = oynaticilar[ad];
  if (!p) return;
  clearInterval(solmalar[ad]);
  let bas = 0;
  try {
    bas = p.playing ? p.volume : 0;
    if (!p.playing && hedef > 0) {
      p.volume = 0;
      p.play();
    }
  } catch (e) {}
  const adim = 12;
  let i = 0;
  solmalar[ad] = setInterval(() => {
    i++;
    const v = bas + (hedef - bas) * (i / adim);
    try {
      p.volume = Math.max(0, Math.min(1, v));
    } catch (e) {}
    if (i >= adim) {
      clearInterval(solmalar[ad]);
      if (hedef <= 0) {
        try {
          p.pause();
        } catch (e) {}
      }
    }
  }, sure / adim);
}

// Mekânın ortam sesini çalar; öncekini yavaşça kısar. ad null ise ortam susar.
export function ortamCal(ad, oran = 1) {
  ortamOrani = oran;
  if (ad && !oynaticilar[ad]) ad = null;
  if (calanOrtam && calanOrtam !== ad) sol(calanOrtam, 0);
  calanOrtam = ad;
  if (ad) sol(ad, hedefDuzey(ad));
}

export function ortamSesiAyarla(duzey) {
  ortamDuzeyi = duzey;
  if (calanOrtam) sol(calanOrtam, hedefDuzey(calanOrtam), 300);
}
