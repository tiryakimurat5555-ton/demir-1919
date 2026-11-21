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
  // 2.4: envanter sayfa çevirme ve teçhizat sesleri (ElevenLabs)
  el_sayfa: require('../../assets/ses/el_sayfa.wav'),
  el_tufek: require('../../assets/ses/el_tufek.wav'),
  el_hancer: require('../../assets/ses/el_hancer.wav'),
  el_mizrak: require('../../assets/ses/el_mizrak.wav'),
  el_golge: require('../../assets/ses/el_golge.wav'),
  el_pelerin: require('../../assets/ses/el_pelerin.wav'),
  // 2.5: final görevleri
  el_koro: require('../../assets/ses/el_koro.wav'),
  el_cahelon: require('../../assets/ses/el_cahelon.wav'),
  el_sharon: require('../../assets/ses/el_sharon.wav'),
  el_mancinik: require('../../assets/ses/el_mancinik.wav'),
  // 2.6: yan görevler
  el_canavar: require('../../assets/ses/el_canavar.wav'),
  el_droid: require('../../assets/ses/el_droid.wav'),
  el_kus: require('../../assets/ses/el_kus.wav'),
  // Düğme sesleri (ElevenLabs, 1.18): onay, geri, devam et, yeni oyun
  el_secim: require('../../assets/ses/el_secim.wav'),
  el_geri: require('../../assets/ses/el_geri.wav'),
  // Tarım (ElevenLabs, 2.0; tarim-ve-kseno-botanik bölüm 8): çapa, ekme, vana, hasat, olgunluk zili, melezleme,
  // yatağın durumu (kuru, çürük, sağlıklı) ve kseno-habitat bölmelerinin ortamı
  tarim_capa: require('../../assets/ses/tarim_capa.wav'),
  tarim_ekme: require('../../assets/ses/tarim_ekme.wav'),
  tarim_vana: require('../../assets/ses/tarim_vana.wav'),
  tarim_hasat: require('../../assets/ses/tarim_hasat.wav'),
  tarim_hazir: require('../../assets/ses/tarim_hazir.wav'),
  tarim_melez: require('../../assets/ses/tarim_melez.wav'),
  tarim_kuru: require('../../assets/ses/tarim_kuru.wav'),
  tarim_curuk: require('../../assets/ses/tarim_curuk.wav'),
  tarim_saglikli: require('../../assets/ses/tarim_saglikli.wav'),
  ortam_kubbe: require('../../assets/ses/ortam_kubbe.wav'),
  // Tonoflenya ortamları (ElevenLabs, 2.1): YGK katları, Malkenia'nın altı halkası, saray, Kara Göl, kantonlar, güney
  // havzası, Malazar
  ortam_t_ygk: require('../../assets/ses/t/ortam_t_ygk.mp3'),
  ortam_t_ygk_alt: require('../../assets/ses/t/ortam_t_ygk_alt.mp3'),
  ortam_t_hangar: require('../../assets/ses/t/ortam_t_hangar.mp3'),
  ortam_t_igne: require('../../assets/ses/t/ortam_t_igne.mp3'),
  ortam_t_zhaor: require('../../assets/ses/t/ortam_t_zhaor.mp3'),
  ortam_t_varek: require('../../assets/ses/t/ortam_t_varek.mp3'),
  ortam_t_axira: require('../../assets/ses/t/ortam_t_axira.mp3'),
  ortam_t_sinha: require('../../assets/ses/t/ortam_t_sinha.mp3'),
  ortam_t_uma: require('../../assets/ses/t/ortam_t_uma.mp3'),
  ortam_t_elyndra: require('../../assets/ses/t/ortam_t_elyndra.mp3'),
  ortam_t_tenohris: require('../../assets/ses/t/ortam_t_tenohris.mp3'),
  ortam_t_karagol: require('../../assets/ses/t/ortam_t_karagol.mp3'),
  ortam_t_kanton: require('../../assets/ses/t/ortam_t_kanton.mp3'),
  ortam_t_sahil: require('../../assets/ses/t/ortam_t_sahil.mp3'),
  ortam_t_dock: require('../../assets/ses/t/ortam_t_dock.mp3'),
  ortam_t_fenrir: require('../../assets/ses/t/ortam_t_fenrir.mp3'),
  ortam_t_arin: require('../../assets/ses/t/ortam_t_arin.mp3'),
  ortam_t_veradon: require('../../assets/ses/t/ortam_t_veradon.mp3'),
  ortam_t_malazar: require('../../assets/ses/t/ortam_t_malazar.mp3'),
  ortam_t_ocak: require('../../assets/ses/t/ortam_t_ocak.mp3'),
  // Atlasın bölgeleri (ElevenLabs, 2.3)
  ortam_t_okyanus: require('../../assets/ses/t/ortam_t_okyanus.mp3'),
  ortam_t_mormon: require('../../assets/ses/t/ortam_t_mormon.mp3'),
  ortam_t_loran: require('../../assets/ses/t/ortam_t_loran.mp3'),
  ortam_t_liman: require('../../assets/ses/t/ortam_t_liman.mp3'),
  ortam_t_kale: require('../../assets/ses/t/ortam_t_kale.mp3'),
  ortam_t_sanayi: require('../../assets/ses/t/ortam_t_sanayi.mp3'),
  ortam_t_kukurt: require('../../assets/ses/t/ortam_t_kukurt.mp3'),
  ortam_t_col: require('../../assets/ses/t/ortam_t_col.mp3'),
  ortam_t_cam: require('../../assets/ses/t/ortam_t_cam.mp3'),
  ortam_t_kanyon: require('../../assets/ses/t/ortam_t_kanyon.mp3'),
  ortam_t_hardrin: require('../../assets/ses/t/ortam_t_hardrin.mp3'),
  ortam_t_kahergonat: require('../../assets/ses/t/ortam_t_kahergonat.mp3'),
  ortam_t_tundra: require('../../assets/ses/t/ortam_t_tundra.mp3'),
  ortam_t_zeris: require('../../assets/ses/t/ortam_t_zeris.mp3'),
  ortam_t_bataklik: require('../../assets/ses/t/ortam_t_bataklik.mp3'),
  ortam_t_orman: require('../../assets/ses/t/ortam_t_orman.mp3'),
  ortam_t_teras: require('../../assets/ses/t/ortam_t_teras.mp3'),
  ortam_t_koy: require('../../assets/ses/t/ortam_t_koy.mp3'),
  ortam_t_ada: require('../../assets/ses/t/ortam_t_ada.mp3'),
  ortam_t_cember: require('../../assets/ses/t/ortam_t_cember.mp3'),
  ortam_t_girdap: require('../../assets/ses/t/ortam_t_girdap.mp3'),
  el_devam: require('../../assets/ses/el_devam.wav'),
  el_yeni_oyun: require('../../assets/ses/el_yeni_oyun.wav'),
  el_deklansor: require('../../assets/ses/el_deklansor.wav'),
  polimer: require('../../assets/ses/polimer.wav'),
  ortam_uzay: require('../../assets/ses/ortam_uzay.wav'),
  ortam_kokpit: require('../../assets/ses/ortam_kokpit.mp3'),
  ortam_kargo: require('../../assets/ses/ortam_kargo.mp3'),
  ortam_reaktor: require('../../assets/ses/ortam_reaktor.wav'),
  ortam_revir: require('../../assets/ses/ortam_revir.mp3'),
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
  // İnilebilir gezegenlerin yüzey ortamları (Bahtiyar, 21 Kasım)
  ortam_gez_p01: require('../../assets/ses/gezegen/ortam_gez_p01.mp3'),
  ortam_gez_p02: require('../../assets/ses/gezegen/ortam_gez_p02.mp3'),
  ortam_gez_p03: require('../../assets/ses/gezegen/ortam_gez_p03.mp3'),
  ortam_gez_p04: require('../../assets/ses/gezegen/ortam_gez_p04.mp3'),
  ortam_gez_p05: require('../../assets/ses/gezegen/ortam_gez_p05.mp3'),
  ortam_gez_p06: require('../../assets/ses/gezegen/ortam_gez_p06.mp3'),
  ortam_gez_p07: require('../../assets/ses/gezegen/ortam_gez_p07.mp3'),
  ortam_gez_p08: require('../../assets/ses/gezegen/ortam_gez_p08.mp3'),
  ortam_gez_p09: require('../../assets/ses/gezegen/ortam_gez_p09.mp3'),
  ortam_gez_p10: require('../../assets/ses/gezegen/ortam_gez_p10.mp3'),
  ortam_gez_p11: require('../../assets/ses/gezegen/ortam_gez_p11.mp3'),
  ortam_gez_p12: require('../../assets/ses/gezegen/ortam_gez_p12.mp3'),
  ortam_gez_p13: require('../../assets/ses/gezegen/ortam_gez_p13.mp3'),
  ortam_gez_p14: require('../../assets/ses/gezegen/ortam_gez_p14.mp3'),
  ortam_gez_p15: require('../../assets/ses/gezegen/ortam_gez_p15.mp3'),
  ortam_gez_p16: require('../../assets/ses/gezegen/ortam_gez_p16.mp3'),
  ortam_gez_p17: require('../../assets/ses/gezegen/ortam_gez_p17.mp3'),
  ortam_gez_p18: require('../../assets/ses/gezegen/ortam_gez_p18.mp3'),
  ortam_gez_p19: require('../../assets/ses/gezegen/ortam_gez_p19.mp3'),
  ortam_gez_p20: require('../../assets/ses/gezegen/ortam_gez_p20.mp3'),
};

// Ortam döngülerinin kendi düzeyleri (konuşmanın altında kalsınlar diye düşük)
const DONGULER = {
  ortam_yuzey: 0.55,
  ortam_vadi: 0.55,
  ortam_terminal: 0.55,
  ortam_tarim: 0.55,
  ortam_kubbe: 0.55,
  ortam_t_ygk: 0.55,
  ortam_t_ygk_alt: 0.55,
  ortam_t_hangar: 0.55,
  ortam_t_igne: 0.55,
  ortam_t_zhaor: 0.55,
  ortam_t_varek: 0.55,
  ortam_t_axira: 0.55,
  ortam_t_sinha: 0.55,
  ortam_t_uma: 0.55,
  ortam_t_elyndra: 0.55,
  ortam_t_tenohris: 0.55,
  ortam_t_karagol: 0.55,
  ortam_t_kanton: 0.55,
  ortam_t_sahil: 0.55,
  ortam_t_dock: 0.55,
  ortam_t_fenrir: 0.6,
  ortam_t_arin: 0.55,
  ortam_t_veradon: 0.55,
  ortam_t_malazar: 0.55,
  ortam_t_ocak: 0.55,
  ortam_t_okyanus: 0.55,
  ortam_t_mormon: 0.55,
  ortam_t_loran: 0.55,
  ortam_t_liman: 0.55,
  ortam_t_kale: 0.55,
  ortam_t_sanayi: 0.55,
  ortam_t_kukurt: 0.55,
  ortam_t_col: 0.55,
  ortam_t_cam: 0.55,
  ortam_t_kanyon: 0.55,
  ortam_t_hardrin: 0.55,
  ortam_t_kahergonat: 0.55,
  ortam_t_tundra: 0.55,
  ortam_t_zeris: 0.55,
  ortam_t_bataklik: 0.6,
  ortam_t_orman: 0.55,
  ortam_t_teras: 0.55,
  ortam_t_koy: 0.55,
  ortam_t_ada: 0.55,
  ortam_t_cember: 0.55,
  ortam_t_girdap: 0.6,
  ortam_krater: 0.55,
  ortam_kapsul: 0.6,
  ortam_harabe: 0.55,
  ortam_menu: 0.45,
  giris_muzik: 0.6,
  ortam_sirtlar: 0.6,
  ortam_plato: 0.6,
  ortam_uzay: 0.55,
  ortam_kokpit: 0.6,
  ortam_kargo: 0.6,
  ortam_reaktor: 0.5,
  ortam_revir: 0.6,
  ortam_dogu: 0.5,
  ortam_civa: 0.55,
  ortam_lav: 0.6,
  ortam_mantar: 0.55,
  ortam_kriyo: 0.5,
  ortam_obsidyen: 0.5,
  ortam_kuleler: 0.55,
  ortam_vaha: 0.55,
  ortam_tunel: 0.6,
  ortam_gez_p01: 0.6,
  ortam_gez_p02: 0.6,
  ortam_gez_p03: 0.6,
  ortam_gez_p04: 0.6,
  ortam_gez_p05: 0.6,
  ortam_gez_p06: 0.6,
  ortam_gez_p07: 0.6,
  ortam_gez_p08: 0.6,
  ortam_gez_p09: 0.6,
  ortam_gez_p10: 0.6,
  ortam_gez_p11: 0.6,
  ortam_gez_p12: 0.6,
  ortam_gez_p13: 0.6,
  ortam_gez_p14: 0.6,
  ortam_gez_p15: 0.6,
  ortam_gez_p16: 0.6,
  ortam_gez_p17: 0.6,
  ortam_gez_p18: 0.6,
  ortam_gez_p19: 0.6,
  ortam_gez_p20: 0.6,
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

// Şu an çalan ortam döngüsünün adı (yoksa null)
export function calanOrtamAdi() {
  return calanOrtam;
}

export function ortamSesiAyarla(duzey) {
  ortamDuzeyi = duzey;
  if (calanOrtam) sol(calanOrtam, hedefDuzey(calanOrtam), 300);
}
