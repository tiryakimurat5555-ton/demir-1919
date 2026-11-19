// Karaköy oyununun otomatik kaydı (AsyncStorage). Önceki kayıt yedek olarak saklanır.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { kayitTemizle, kayittanDunya } from './dunya';

const KAYIT = 'demir1919.karakoy';
const YEDEK = 'demir1919.karakoy.yedek';

export async function karakoyOku() {
  for (const a of [KAYIT, YEDEK]) {
    try {
      const m = await AsyncStorage.getItem(a);
      if (!m) continue;
      const d = kayittanDunya(JSON.parse(m));
      if (d) return d;
    } catch (e) {}
  }
  return null;
}

let son = null;
export async function karakoyYaz(d) {
  try {
    const m = JSON.stringify(kayitTemizle(d));
    if (m === son) return;
    if (son) await AsyncStorage.setItem(YEDEK, son);
    await AsyncStorage.setItem(KAYIT, m);
    son = m;
  } catch (e) {}
}

export async function karakoySil() {
  son = null;
  try {
    await AsyncStorage.multiRemove([KAYIT, YEDEK]);
  } catch (e) {}
}
