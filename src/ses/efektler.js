// Arayüz geri bildirimleri. Şimdilik ses dosyası yok; telefonun titreşimi kullanılır.
// İleride gerçek sesler eklenince aynı adlar (tik, secim, dip) korunacak.
import * as Haptics from 'expo-haptics';

export function cal(ad) {
  try {
    if (ad === 'tik') Haptics.selectionAsync().catch(() => {});
    else if (ad === 'secim') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    else if (ad === 'dip') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
  } catch (e) {}
}
