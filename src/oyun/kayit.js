// Otomatik kayıt ve ayarlar (AsyncStorage). Oyun yalnızca otomatik kayıt kullanır:
// her durum değişikliğinde yazılır, önceki kayıt yedek olarak saklanır.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KAYIT_SURUMU } from './motor';

const KAYIT = 'demir1919.kayit';
const YEDEK = 'demir1919.kayit.yedek';
const AYARLAR = 'demir1919.ayarlar';

export const VARSAYILAN_AYARLAR = { konusmaHizi: 1.2, sesKimligi: '' };

function gecerli(d) {
  return d && d.surum === KAYIT_SURUMU && d.gorunum && Array.isArray(d.deliller) && d.bayraklar;
}

export async function kayitOku() {
  for (const anahtar of [KAYIT, YEDEK]) {
    try {
      const m = await AsyncStorage.getItem(anahtar);
      if (!m) continue;
      const d = JSON.parse(m);
      if (gecerli(d)) return d;
    } catch (e) {}
  }
  return null;
}

let sonYazilan = null;
export async function kayitYaz(d) {
  try {
    if (sonYazilan) await AsyncStorage.setItem(YEDEK, sonYazilan);
    const m = JSON.stringify(d);
    await AsyncStorage.setItem(KAYIT, m);
    sonYazilan = m;
  } catch (e) {}
}

export async function kayitSil() {
  sonYazilan = null;
  try {
    await AsyncStorage.multiRemove([KAYIT, YEDEK]);
  } catch (e) {}
}

export async function ayarlarOku() {
  try {
    const m = await AsyncStorage.getItem(AYARLAR);
    if (m) return { ...VARSAYILAN_AYARLAR, ...JSON.parse(m) };
  } catch (e) {}
  return { ...VARSAYILAN_AYARLAR };
}

export async function ayarlarYaz(a) {
  try {
    await AsyncStorage.setItem(AYARLAR, JSON.stringify(a));
  } catch (e) {}
}
