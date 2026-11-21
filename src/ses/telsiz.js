// Seslendirilmiş telsiz ve gemi içi konuşmalarını çalar (ElevenLabs kayıtları, 1.7).
// Kayıtlar yer kaplamasın diye önceden yüklenmez: çalınacağı an bir oynatıcı açılır, bitince bırakılır.
// Rehber (sesli anlatım) kes=true ile konuşmaya başlarsa çalan kayıt susar; sıradan bildirimler
// kaydın bitmesini bekler (rehber.js mesgulSorgula).
import { createAudioPlayer } from 'expo-audio';
import { kesinceCagir, kisinceCagir, mesgulSorgula } from './rehber';
import { SURELER } from './telsizSureleri';

const DOSYALAR = {
  sirtlar_ilk: require('../../assets/ses/telsiz/sirtlar_ilk.mp3'),
  zehir_yarim: require('../../assets/ses/telsiz/zehir_yarim.mp3'),
  ilk_baca: require('../../assets/ses/telsiz/ilk_baca.mp3'),
  krater_ilk: require('../../assets/ses/telsiz/krater_ilk.mp3'),
  lab_ilk: require('../../assets/ses/telsiz/lab_ilk.mp3'),
  plato_ilk: require('../../assets/ses/telsiz/plato_ilk.mp3'),
  ilk_ayak: require('../../assets/ses/telsiz/ilk_ayak.mp3'),
  lab_kuruldu: require('../../assets/ses/telsiz/lab_kuruldu.mp3'),
  dogu_acik: require('../../assets/ses/telsiz/dogu_acik.mp3'),
  obsidyen_acik: require('../../assets/ses/telsiz/obsidyen_acik.mp3'),
  civa_haber: require('../../assets/ses/telsiz/civa_haber.mp3'),
  lav_acik: require('../../assets/ses/telsiz/lav_acik.mp3'),
  mantar_haber: require('../../assets/ses/telsiz/mantar_haber.mp3'),
  kriyo_acik: require('../../assets/ses/telsiz/kriyo_acik.mp3'),
  kule_haber: require('../../assets/ses/telsiz/kule_haber.mp3'),
  mini_mantar_hasadi: require('../../assets/ses/telsiz/mini_mantar_hasadi.mp3'),
  mini_vana_donmasi: require('../../assets/ses/telsiz/mini_vana_donmasi.mp3'),
  mini_kayip_ekip: require('../../assets/ses/telsiz/mini_kayip_ekip.mp3'),
  mini_vaha_kanali: require('../../assets/ses/telsiz/mini_vaha_kanali.mp3'),
  mini_ceviri_krizi: require('../../assets/ses/telsiz/mini_ceviri_krizi.mp3'),
  mini_basinc_dususu: require('../../assets/ses/telsiz/mini_basinc_dususu.mp3'),
  mini_solucan_gocu: require('../../assets/ses/telsiz/mini_solucan_gocu.mp3'),
  mini_yagmaci_tuzagi: require('../../assets/ses/telsiz/mini_yagmaci_tuzagi.mp3'),
  sefer_ikmal: require('../../assets/ses/telsiz/sefer_ikmal.mp3'),
  sefer_ariza: require('../../assets/ses/telsiz/sefer_ariza.mp3'),
  sefer_ortaklik: require('../../assets/ses/telsiz/sefer_ortaklik.mp3'),
  sefer_tehdit: require('../../assets/ses/telsiz/sefer_tehdit.mp3'),
  savas_plazma_sag: require('../../assets/ses/telsiz/savas_plazma_sag.mp3'),
  savas_plazma_sol: require('../../assets/ses/telsiz/savas_plazma_sol.mp3'),
  savas_torpido_sag: require('../../assets/ses/telsiz/savas_torpido_sag.mp3'),
  savas_torpido_sol: require('../../assets/ses/telsiz/savas_torpido_sol.mp3'),
  savas_iyon_sag: require('../../assets/ses/telsiz/savas_iyon_sag.mp3'),
  savas_iyon_sol: require('../../assets/ses/telsiz/savas_iyon_sol.mp3'),
};

let calan = null; // { p, bitis (ms), zamanlayici }

export function kayitVarMi(id) {
  return !!DOSYALAR[id];
}

export function kayitSus() {
  if (!calan) return;
  const c = calan;
  calan = null;
  clearTimeout(c.zamanlayici);
  try {
    c.p.pause();
  } catch (e) {}
  try {
    c.p.remove();
  } catch (e) {}
}

// Kalan süre (saniye); rehber sıradan bildirimleri bu kadar bekletir
export function kayitKalan() {
  if (!calan) return 0;
  return Math.max(0, (calan.bitis - Date.now()) / 1000);
}

// Kaydı çalar. Çalamazsa false döner (çağıran metni rehberle okur).
export function kayitCal(id, duzey = 1, bitince = null) {
  const kaynak = DOSYALAR[id];
  if (!kaynak) return false;
  kayitSus();
  let p;
  try {
    p = createAudioPlayer(kaynak, { keepAudioSessionActive: true });
    p.volume = Math.max(0, Math.min(1, duzey));
    p.play();
  } catch (e) {
    try {
      p && p.remove();
    } catch (e2) {}
    return false;
  }
  const sure = (SURELER[id] || 6) * 1000 + 300;
  const c = { p, duzey: Math.max(0, Math.min(1, duzey)), bitis: Date.now() + sure, zamanlayici: null };
  c.zamanlayici = setTimeout(() => {
    if (calan === c) kayitSus();
    if (bitince) {
      try {
        bitince();
      } catch (e) {}
    }
  }, sure);
  calan = c;
  return true;
}

// Kritik uyarı okunurken kayıt kısılır, sonra eski düzeyine döner
function kayitKis(kis) {
  if (!calan) return;
  try {
    calan.p.volume = kis ? calan.duzey * 0.3 : calan.duzey;
  } catch (e) {}
}

// Rehberle bağlantı: rehber telsizi kesmez, kayıt bitene kadar bekler (rehber.js soyle). Yalnız oyuncu
// iki parmakla dokunup susturursa (sustur) kayıt da susar.
kesinceCagir(kayitSus);
kisinceCagir(kayitKis);
mesgulSorgula(kayitKalan);
