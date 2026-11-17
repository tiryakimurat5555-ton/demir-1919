// Ortam sesleri ve efektler. Bütün sesler uygulamanın içindedir (internet gerekmez).
// Ortam döngüleri ve efektler ElevenLabs (eleven_text_to_sound_v2) ile üretildi;
// adresler araclar/indirilecek-sesler.json, dönüştürme CLAUDE.md'de.
// Arayüz sesleri (tik, secim, dip) için ses dosyası yok; telefon titreşimi kullanılır.
import { createAudioPlayer, setAudioModeAsync, setIsAudioActiveAsync } from 'expo-audio';
import * as Haptics from 'expo-haptics';

const KAYNAKLAR = {
  sessiz: require('../../assets/ses/sessiz.wav'),
  ortam_rihtim: require('../../assets/ses/ortam_rihtim.wav'),
  ortam_kayikhane: require('../../assets/ses/ortam_kayikhane.wav'),
  ortam_buro: require('../../assets/ses/ortam_buro.wav'),
  ortam_han: require('../../assets/ses/ortam_han.wav'),
  ortam_oda: require('../../assets/ses/ortam_oda.wav'),
  ortam_cemil_ev: require('../../assets/ses/ortam_cemil_ev.wav'),
  ortam_pera: require('../../assets/ses/ortam_pera.wav'),
  ortam_kulup: require('../../assets/ses/ortam_kulup.wav'),
  ortam_servis: require('../../assets/ses/ortam_servis.wav'),
  yangin: require('../../assets/ses/yangin.wav'),
  ortam_hastane: require('../../assets/ses/ortam_hastane.wav'),
  ortam_meyhane: require('../../assets/ses/ortam_meyhane.wav'),
  ortam_depo: require('../../assets/ses/ortam_depo.wav'),
  silah: require('../../assets/ses/silah.wav'),
  ortam_guverte: require('../../assets/ses/ortam_guverte.wav'),
  ortam_salon: require('../../assets/ses/ortam_salon.wav'),
  ortam_kamara: require('../../assets/ses/ortam_kamara.wav'),
  ortam_firtina: require('../../assets/ses/ortam_firtina.wav'),
  vapur_duduk: require('../../assets/ses/vapur_duduk.wav'),
  ortam_yanik_sehir: require('../../assets/ses/ortam_yanik_sehir.wav'),
  ortam_otel: require('../../assets/ses/ortam_otel.wav'),
  ortam_ev: require('../../assets/ses/ortam_ev.wav'),
  ortam_kosk_bahce: require('../../assets/ses/ortam_kosk_bahce.wav'),
  ortam_kosk_ic: require('../../assets/ses/ortam_kosk_ic.wav'),
  kopek: require('../../assets/ses/kopek.wav'),
  kilise_cani: require('../../assets/ses/kilise_cani.wav'),
  ortam_tren: require('../../assets/ses/ortam_tren.wav'),
  ortam_manastir: require('../../assets/ses/ortam_manastir.wav'),
  ortam_cezaevi: require('../../assets/ses/ortam_cezaevi.wav'),
  ortam_revir: require('../../assets/ses/ortam_revir.wav'),
  tren_duduk: require('../../assets/ses/tren_duduk.wav'),
  demir_kapi: require('../../assets/ses/demir_kapi.wav'),
  ortam_viyana: require('../../assets/ses/ortam_viyana.wav'),
  ortam_kahve: require('../../assets/ses/ortam_kahve.wav'),
  ortam_mutfak: require('../../assets/ses/ortam_mutfak.wav'),
  tramvay: require('../../assets/ses/tramvay.wav'),
  ortam_kule: require('../../assets/ses/ortam_kule.wav'),
  ortam_kayik: require('../../assets/ses/ortam_kayik.wav'),
  dokum: require('../../assets/ses/dokum.wav'),
  ortam_kordon: require('../../assets/ses/ortam_kordon.wav'),
  ortam_kemeralti: require('../../assets/ses/ortam_kemeralti.wav'),
  ortam_arsiv: require('../../assets/ses/ortam_arsiv.wav'),
  ortam_yali: require('../../assets/ses/ortam_yali.wav'),
  ortam_yagmur: require('../../assets/ses/ortam_yagmur.wav'),
  ortam_zurih: require('../../assets/ses/ortam_zurih.wav'),
  ortam_banka: require('../../assets/ses/ortam_banka.wav'),
  ortam_genelkurul: require('../../assets/ses/ortam_genelkurul.wav'),
  tokmak: require('../../assets/ses/tokmak.wav'),
  sandik: require('../../assets/ses/sandik.wav'),
  ani_savas: require('../../assets/ses/ani_savas.wav'),
  delil: require('../../assets/ses/delil.wav'),
};

// Ortam döngülerinin kendi düzeyleri (konuşmanın altında kalsınlar diye düşük)
const DONGULER = {
  ortam_rihtim: 0.55,
  ortam_kayikhane: 0.6,
  ortam_buro: 0.6,
  ortam_han: 0.6,
  ortam_oda: 0.65,
  ortam_cemil_ev: 0.6,
  ortam_pera: 0.5,
  ortam_kulup: 0.5,
  ortam_servis: 0.65,
  ortam_hastane: 0.6,
  ortam_meyhane: 0.5,
  ortam_depo: 0.65,
  ortam_guverte: 0.55,
  ortam_salon: 0.5,
  ortam_kamara: 0.6,
  ortam_firtina: 0.55,
  ortam_yanik_sehir: 0.55,
  ortam_otel: 0.5,
  ortam_ev: 0.55,
  ortam_kosk_bahce: 0.6,
  ortam_kosk_ic: 0.65,
  ortam_tren: 0.55,
  ortam_manastir: 0.6,
  ortam_cezaevi: 0.6,
  ortam_revir: 0.6,
  ortam_viyana: 0.55,
  ortam_kahve: 0.5,
  ortam_mutfak: 0.5,
  ortam_kule: 0.6,
  ortam_kayik: 0.6,
  ortam_kordon: 0.55,
  ortam_kemeralti: 0.55,
  ortam_arsiv: 0.6,
  ortam_yali: 0.6,
  ortam_yagmur: 0.55,
  ortam_zurih: 0.55,
  ortam_banka: 0.6,
  ortam_genelkurul: 0.55,
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
