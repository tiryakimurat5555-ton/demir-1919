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
  // Vadi-i Sukût'un ortamı (Murat, 21 Kasım: telefondan gönderdiği kayıt; 5 dakikalık kesintisiz döngü)
  ortam_vadi: require('../../assets/ses/ortam_vadi.mp3'),
  // Merkez terminalinin ortamı (Murat, 21 Kasım: telefondan gönderdiği kayıt; 5 dakikalık döngü)
  ortam_terminal: require('../../assets/ses/ortam_terminal.mp3'),
  // Jeotermal tarım alanının ortamı (Murat, 21 Kasım: telefondan gönderdiği kayıt; 5 dakikalık döngü)
  ortam_tarim: require('../../assets/ses/ortam_tarim.mp3'),
  // Kadim Krater'in müziği: Murat'ın gönderdiği kayıt (tarım alanınınkiyle aynı dosya; 21 Kasım 12:58)
  ortam_krater: require('../../assets/ses/ortam_tarim.mp3'),
  ortam_kapsul: require('../../assets/ses/ortam_kapsul.wav'),
  ortam_harabe: require('../../assets/ses/ortam_harabe.wav'),
  ortam_menu: require('../../assets/ses/ortam_menu.wav'),
  // Giriş melodisi (Murat, 21 Kasım: telefondan gönderdiği ses kaydı); ana menü ve ayarlarda döner
  giris_muzik: require('../../assets/ses/giris_muzik.mp3'),
  bip: require('../../assets/ses/bip.wav'),
  dugme: require('../../assets/ses/dugme.wav'),
  jenerator: require('../../assets/ses/jenerator_calis.wav'),
  kapi: require('../../assets/ses/kapi.wav'),
  red: require('../../assets/ses/reddedildi.wav'),
  sinyal: require('../../assets/ses/sinyal.wav'),
  sonar: require('../../assets/ses/sonar.wav'),
  tislama: require('../../assets/ses/tislama.wav'),
  ortam_sirtlar: require('../../assets/ses/ortam_sirtlar.wav'),
  valf: require('../../assets/ses/valf.wav'),
  sonda: require('../../assets/ses/sonda.wav'),
  patlama: require('../../assets/ses/patlama.wav'),
  telsiz_zil: require('../../assets/ses/telsiz_zil.wav'),
  ortam_plato: require('../../assets/ses/ortam_plato.wav'),
  hidrolik: require('../../assets/ses/hidrolik.wav'),
  kilit: require('../../assets/ses/kilit.wav'),
  // ElevenLabs (1.5): savaş uyarıları, kalkan, keşif zili, deklanşör
  el_plazma_sarj: require('../../assets/ses/el_plazma_sarj.wav'),
  el_torpido: require('../../assets/ses/el_torpido.wav'),
  el_iyon: require('../../assets/ses/el_iyon.wav'),
  el_kalkan: require('../../assets/ses/el_kalkan.wav'),
  el_kesif_zili: require('../../assets/ses/el_kesif_zili.wav'),
  el_deklansor: require('../../assets/ses/el_deklansor.wav'),
  polimer: require('../../assets/ses/polimer.wav'),
  ortam_uzay: require('../../assets/ses/ortam_uzay.wav'),
  ortam_kokpit: require('../../assets/ses/ortam_kokpit.wav'),
  ortam_kargo: require('../../assets/ses/ortam_kargo.wav'),
  ortam_reaktor: require('../../assets/ses/ortam_reaktor.wav'),
  ortam_revir: require('../../assets/ses/ortam_revir.wav'),
  kapi_gemi: require('../../assets/ses/kapi_gemi.wav'),
  kalkis: require('../../assets/ses/kalkis.wav'),
  kaynak: require('../../assets/ses/kaynak.wav'),
  zincir: require('../../assets/ses/zincir.wav'),
  arayuz: require('../../assets/ses/arayuz.wav'),
  moral_yuksek: require('../../assets/ses/moral_yuksek.wav'),
  moral_dusuk: require('../../assets/ses/moral_dusuk.wav'),
  ortam_dogu: require('../../assets/ses/ortam_dogu.wav'),
  ortam_civa: require('../../assets/ses/ortam_civa.wav'),
  ortam_lav: require('../../assets/ses/ortam_lav.wav'),
  ortam_mantar: require('../../assets/ses/ortam_mantar.wav'),
  ortam_kriyo: require('../../assets/ses/ortam_kriyo.wav'),
  ortam_obsidyen: require('../../assets/ses/ortam_obsidyen.wav'),
  ortam_kuleler: require('../../assets/ses/ortam_kuleler.wav'),
  ortam_vaha: require('../../assets/ses/ortam_vaha.wav'),
  ortam_tunel: require('../../assets/ses/ortam_tunel.wav'),
  statik: require('../../assets/ses/statik.wav'),
  buz_catlak: require('../../assets/ses/buz_catlak.wav'),
  magma: require('../../assets/ses/magma.wav'),
};

// Ortam döngülerinin kendi düzeyleri (konuşmanın altında kalsınlar diye düşük)
const DONGULER = {
  ortam_yuzey: 0.55,
  ortam_vadi: 0.55,
  ortam_terminal: 0.55,
  ortam_tarim: 0.55,
  ortam_krater: 0.55,
  ortam_kapsul: 0.6,
  ortam_harabe: 0.55,
  ortam_menu: 0.45,
  giris_muzik: 0.6,
  ortam_sirtlar: 0.6,
  ortam_plato: 0.6,
  ortam_uzay: 0.55,
  ortam_kokpit: 0.5,
  ortam_kargo: 0.5,
  ortam_reaktor: 0.5,
  ortam_revir: 0.45,
  ortam_dogu: 0.5,
  ortam_civa: 0.55,
  ortam_lav: 0.6,
  ortam_mantar: 0.55,
  ortam_kriyo: 0.5,
  ortam_obsidyen: 0.5,
  ortam_kuleler: 0.55,
  ortam_vaha: 0.55,
  ortam_tunel: 0.6,
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
