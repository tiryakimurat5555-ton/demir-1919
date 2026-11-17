// Arayüz canlandırmaları için ortak yardımcılar.
// iPhone'da Ayarlar > Erişilebilirlik > Hareket > "Hareketi Azalt" açıksa arayüz canlandırmaları yapılmaz.
import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

let bilinen = false;

export function useAzHareket() {
  const [az, setAz] = useState(bilinen);
  useEffect(() => {
    let iptal = false;
    AccessibilityInfo.isReduceMotionEnabled()
      .then((a) => {
        bilinen = !!a;
        if (!iptal) setAz(!!a);
      })
      .catch(() => {});
    const abone = AccessibilityInfo.addEventListener('reduceMotionChanged', (a) => {
      bilinen = !!a;
      setAz(!!a);
    });
    return () => {
      iptal = true;
      abone.remove();
    };
  }, []);
  return az;
}
