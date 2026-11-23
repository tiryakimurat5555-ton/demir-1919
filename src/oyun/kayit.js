// Kayıt sistemi (belgeler/gelistirici-entegrasyon-rehberi-ve-yol-haritasi.md bölüm 2):
//  - Otomatik kayıt: oyunda 10 saniyede bir, her eylemde, uygulama arka plana atılınca ve çıkışta.
//    Önceki otomatik kayıt yedek olarak saklanır.
//  - Elle kayıt: 3 yuva; yalnızca kapsülün içinde (merkez üs), güvenli yerde.
// Ayarlar ayrı tutulur. Aynı Expo projesindeki eski oyundan (Demir 1919) kalan konuşma hızı ayarı ilk açılışta taşınır.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { gecerliMi, kaydiTamamla } from './durum';

const OTO = 'aethelis.oto';
const OTO_YEDEK = 'aethelis.oto.yedek';
const YUVA = (n) => 'aethelis.yuva' + n;
const AYARLAR = 'aethelis.ayarlar';
const ESKI_AYARLAR = 'demir1919.ayarlar';

export const YUVA_SAYISI = 3;
export const VARSAYILAN_AYARLAR = { konusmaHizi: 1.2, sesKimligi: '', ortamDuzeyi: 0.6, nobetDakika: 10, basitBalik: false };

async function oku(anahtar) {
  try {
    const m = await AsyncStorage.getItem(anahtar);
    if (!m) return null;
    const d = JSON.parse(m);
    return gecerliMi(d) ? kaydiTamamla(d) : null;
  } catch (e) {
    return null;
  }
}

export async function otoOku() {
  return (await oku(OTO)) || (await oku(OTO_YEDEK));
}

let sonYazilan = null;
export async function otoYaz(d) {
  try {
    const m = JSON.stringify(d);
    if (m === sonYazilan) return;
    if (sonYazilan) await AsyncStorage.setItem(OTO_YEDEK, sonYazilan);
    await AsyncStorage.setItem(OTO, m);
    sonYazilan = m;
  } catch (e) {}
}

export async function otoSil() {
  sonYazilan = null;
  try {
    await AsyncStorage.multiRemove([OTO, OTO_YEDEK]);
  } catch (e) {}
}

// Elle kayıt yuvaları: { no, tarih, d } ya da boş yuva için { no, d: null }
export async function yuvalariOku() {
  const sonuc = [];
  for (let n = 1; n <= YUVA_SAYISI; n++) {
    try {
      const m = await AsyncStorage.getItem(YUVA(n));
      const k = m ? JSON.parse(m) : null;
      sonuc.push(k && gecerliMi(k.d) ? { no: n, tarih: k.tarih, d: kaydiTamamla(k.d) } : { no: n, d: null });
    } catch (e) {
      sonuc.push({ no: n, d: null });
    }
  }
  return sonuc;
}

export async function yuvayaYaz(n, d) {
  try {
    await AsyncStorage.setItem(YUVA(n), JSON.stringify({ tarih: Date.now(), d }));
    return true;
  } catch (e) {
    return false;
  }
}

export async function ayarlarOku() {
  try {
    const m = (await AsyncStorage.getItem(AYARLAR)) || (await AsyncStorage.getItem(ESKI_AYARLAR));
    if (m) return { ...VARSAYILAN_AYARLAR, ...JSON.parse(m) };
  } catch (e) {}
  return { ...VARSAYILAN_AYARLAR };
}

export async function ayarlarYaz(a) {
  try {
    await AsyncStorage.setItem(AYARLAR, JSON.stringify(a));
  } catch (e) {}
}

// "21 Kasım, 14.05" biçiminde tarih
const AYLAR = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
export function tarihMetni(ms) {
  const t = new Date(ms);
  const iki = (x) => String(x).padStart(2, '0');
  return t.getDate() + ' ' + AYLAR[t.getMonth()] + ', ' + iki(t.getHours()) + '.' + iki(t.getMinutes());
}
