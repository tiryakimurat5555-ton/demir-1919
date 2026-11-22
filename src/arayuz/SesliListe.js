// Kendi kendini seslendiren liste (menüler, ayarlar, kayıtlar).
// VoiceOver'a benzer şekilde çalışır:
//   sağa kaydır: sonraki öğe, sola kaydır: önceki öğe
//   bir öğeye dokun: o öğeyi seç ve oku (parmağını ekranda yavaşça gezdirmek de öğeleri okur)
//   ekranın herhangi bir yerine çift dokun: okunan (odaktaki) öğeyi etkinleştir
//   uzun bas: odaktaki öğeyi ve varsa açıklamasını yeniden oku
//   iki parmakla dokun: konuşmayı sustur
//   iki parmakla çift dokun: geri
// Sesli rehber kapalıysa (gören oyuncular için) tek dokunuş öğeyi doğrudan etkinleştirir.
//
// Dokunma alanı bütün ekranı kaplayan tek bir saydam katmandır; böylece çift dokunuş
// ekranın neresine yapılırsa yapılsın odaktaki öğeye gider. Tek dokunuş, çift dokunuş
// olmadığı anlaşılana kadar bekletilir; bu sayede çift dokunuşun ilk dokunuşu odağı kaydırmaz.
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Easing } from 'react-native';
import { useAzHareket } from './hareket';
import { useJestler } from './jestler';
import { soyle, sustur } from '../ses/rehber';
import { cal } from '../ses/efektler';
import { RENK, UST_BOSLUK } from './tema';

function metinAl(deger) {
  return typeof deger === 'function' ? deger() : deger;
}

// disaridanJest: true ise liste kendi dokunma katmanını kurmaz; dokunmaları dışarıdaki
// bileşen ref üzerinden iletir (dalış ekranı gibi tek dokunma katmanı olan yerler için).
function SesliListe({ baslik, giris, ogeler, onGeri, rehberAcik, ilkOdak = 0, gezinmeSesi = true, onOdak, disaridanJest = false, ust = null, sessizAc = false, onIkiParmak = null, onUcParmak = null }, ref) {
  const [odak, setOdak] = useState(Math.max(0, Math.min(ilkOdak, ogeler.length - 1)));
  const odakRef = useRef(odak);
  odakRef.current = Math.max(0, Math.min(odakRef.current, ogeler.length - 1));
  const ogeRef = useRef(ogeler);
  ogeRef.current = ogeler;
  const satirlar = useRef([]);
  const listeY = useRef(0);
  const kaydirma = useRef(null);
  const kaydirmaY = useRef(0);
  const yukseklik = useRef(600);
  const gezinmeRef = useRef(gezinmeSesi);
  gezinmeRef.current = gezinmeSesi;
  const [, yenile] = useState(0);
  // Canlandırmalar: ekran açılırken beliriş, odak değişince satırın kısa bir nabız atışı
  const az = useAzHareket();
  const belir = useRef(new Animated.Value(az ? 1 : 0)).current;
  const nabiz = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (az) {
      belir.setValue(1);
      return;
    }
    Animated.timing(belir, { toValue: 1, duration: 240, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (az) return;
    nabiz.setValue(0.965);
    Animated.spring(nabiz, { toValue: 1, friction: 5, tension: 160, useNativeDriver: true }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [odak]);

  const oku = (i, onEk, ipucuyla) => {
    const oge = ogeRef.current[i];
    if (!oge) {
      if (onEk) soyle(onEk, 'menu', true);
      return;
    }
    const n = ogeRef.current.length;
    const sira = n > 1 ? ', ' + (i + 1) + ' / ' + n : '';
    const ipucu = ipucuyla && oge.ipucu ? '. ' + metinAl(oge.ipucu) : '';
    soyle((onEk ? onEk + '. ' : '') + metinAl(oge.etiket) + sira + ipucu, 'menu', true);
  };

  useEffect(() => {
    // Başlık değişince (yeni ekran) baştan okunur. Ekran açılırken yapılan ses
    // değişiklikleri konuşmayı kesmesin diye okuma bir an sonra başlar.
    // sessizAc: ekran açılırken hiçbir şey okunmaz (seslendirilmiş sahne çalarken)
    if (sessizAc) return undefined;
    const z = setTimeout(() => oku(odakRef.current, [baslik, giris].filter(Boolean).join('. ')), 150);
    return () => clearTimeout(z);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baslik]);

  // Odaktaki satır ekranda görünsün diye liste kendiliğinden kaydırılır
  const gorunurYap = (i) => {
    const s = satirlar.current[i];
    if (!s || !kaydirma.current) return;
    const ust = kaydirmaY.current;
    const alt = ust + yukseklik.current;
    let y = null;
    if (s.y < ust + 10) y = Math.max(0, s.y - 20);
    else if (s.y + s.h > alt - 10) y = Math.max(0, s.y + s.h - yukseklik.current + 40);
    if (y === null) return;
    kaydirmaY.current = y;
    kaydirma.current.scrollTo({ y, animated: false });
  };

  const odakla = (i, sesli = true) => {
    const n = ogeRef.current.length;
    if (n === 0) return;
    const yeni = Math.max(0, Math.min(n - 1, i));
    const degisti = yeni !== odakRef.current;
    odakRef.current = yeni;
    setOdak(yeni);
    gorunurYap(yeni);
    if (onOdak) onOdak(yeni);
    if (sesli) {
      if (degisti && gezinmeRef.current) cal('tik', 0.35);
      oku(yeni);
    }
  };

  const etkinlestir = (i) => {
    const oge = ogeRef.current[i];
    if (!oge) return;
    if (!oge.sec) {
      oku(i);
      return;
    }
    cal('secim', 0.5); // titreşim
    // ElevenLabs düğme sesleri (1.18): öğe kendi efektini söyleyebilir; geri öğeleri geri sesi, öteki her şey onay sesi
    cal(oge.efekt || (oge.id === 'geri' || oge.id === 'hayir' ? 'el_geri' : 'el_secim'), 0.7);
    const sonuc = oge.sec();
    // Değeri değişen öğeler (ayarlar) yeni haliyle okunur
    if (sonuc !== 'sessiz') {
      yenile((v) => v + 1);
      setTimeout(() => oku(odakRef.current), 80);
    }
  };

  // Ekrandaki bir noktanın hangi satıra denk geldiğini bulur (-1: hiçbiri, -2: başlık)
  const satirBul = (y) => {
    if (y < listeY.current) return -2;
    const icerikY = y - listeY.current + kaydirmaY.current;
    for (let i = 0; i < satirlar.current.length; i++) {
      const s = satirlar.current[i];
      if (s && icerikY >= s.y && icerikY <= s.y + s.h) return i;
    }
    return -1;
  };

  const kenar = () => {
    cal('dip', 0.25);
    oku(odakRef.current);
  };

  const isleyiciler = {
      onKaydir: (yon, parmak) => {
        // İki parmakla kaydırma: listenin sahibine (ör. envanterde sonraki kategori)
        if (parmak >= 2) {
          if (onIkiParmak) onIkiParmak(yon);
          return;
        }
        const n = ogeRef.current.length;
        if (yon === 'sag') {
          if (odakRef.current >= n - 1) kenar();
          else odakla(odakRef.current + 1);
        } else if (yon === 'sol') {
          if (odakRef.current <= 0) kenar();
          else odakla(odakRef.current - 1);
        } else if (yon === 'yukari') {
          // Murat (1.8): yukarı kaydırma listenin başına
          if (odakRef.current <= 0) kenar();
          else odakla(0);
        } else if (yon === 'asagi') {
          // aşağı kaydırma listenin sonuna
          if (odakRef.current >= n - 1) kenar();
          else odakla(n - 1);
        }
      },
      onSurukle: (mod, dx, dy, bilgi) => {
        // Yavaş sürükleme: parmağın altındaki öğeyi okur (hızlı kaydırmayla karışmasın diye gecikmeli)
        if (mod !== 'tek' || bilgi.sure < 450) return;
        const i = satirBul(bilgi.y);
        if (i >= 0 && i !== odakRef.current) odakla(i);
      },
      onDokun: (parmak, konum) => {
        // Üç parmakla dokunma: listenin sahibinin kısayolu (ör. komuta panelinde en acil bölge)
        if (parmak >= 3 && onUcParmak) {
          onUcParmak();
          return;
        }
        if (parmak >= 2) {
          sustur();
          return;
        }
        const i = satirBul(konum.y);
        if (i === -2) {
          soyle([baslik, giris].filter(Boolean).join('. '), 'menu', true);
          return;
        }
        if (i < 0) return;
        if (!rehberAcik) {
          odakla(i, false);
          etkinlestir(i);
        } else {
          odakla(i);
        }
      },
      onCiftDokun: (parmak) => {
        if (parmak >= 2) {
          if (onGeri) {
            cal('secim', 0.5);
            cal('el_geri', 0.7);
            onGeri();
          } else {
            soyle('Bu ekrandan geri dönülmez.', 'menu', true);
          }
          return;
        }
        etkinlestir(odakRef.current);
      },
      onUzunBas: () => {
        oku(odakRef.current, null, true);
      },
  };
  const isleyiciRef = useRef(isleyiciler);
  isleyiciRef.current = isleyiciler;
  const jest = useJestler(isleyiciler, { dokunmaBekle: true });

  // Dışarıdaki dokunma katmanı hareketleri bu işlevlerle iletir
  useImperativeHandle(ref, () => ({
    kaydir: (yon, parmak) => isleyiciRef.current.onKaydir(yon, parmak),
    surukle: (mod, dx, dy, bilgi) => isleyiciRef.current.onSurukle(mod, dx, dy, bilgi),
    dokun: (parmak, konum) => isleyiciRef.current.onDokun(parmak, konum),
    ciftDokun: (parmak, konum) => isleyiciRef.current.onCiftDokun(parmak, konum),
    uzunBas: (konum) => isleyiciRef.current.onUzunBas(konum),
  }));

  return (
    <Animated.View style={[stiller.kap, { opacity: belir, transform: [{ translateY: belir.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) }] }]}>
      {ust}
      {baslik ? <Text style={stiller.baslik}>{baslik}</Text> : null}
      <View
        style={stiller.liste}
        onLayout={(e) => {
          listeY.current = e.nativeEvent.layout.y;
          yukseklik.current = e.nativeEvent.layout.height;
        }}
      >
        <ScrollView
          ref={kaydirma}
          scrollEnabled={false}
          contentContainerStyle={stiller.icerik}
          onScroll={(e) => {
            kaydirmaY.current = e.nativeEvent.contentOffset.y;
          }}
          scrollEventThrottle={32}
        >
          {ogeler.map((oge, i) => (
            <Animated.View
              key={oge.id || String(i)}
              onLayout={(e) => {
                const { y, height } = e.nativeEvent.layout;
                satirlar.current[i] = { y, h: height };
              }}
              style={[stiller.satir, oge.ikincil && stiller.ikincil, i === odak && stiller.odakli, i === odak && { transform: [{ scale: nabiz }] }]}
            >
              <Text style={[stiller.satirYazi, i === odak && stiller.odakliYazi]}>{metinAl(oge.etiket)}</Text>
            </Animated.View>
          ))}
        </ScrollView>
      </View>
      {disaridanJest ? null : <View style={StyleSheet.absoluteFill} {...jest} />}
    </Animated.View>
  );
}

export default forwardRef(SesliListe);

const stiller = StyleSheet.create({
  kap: { flex: 1, paddingTop: UST_BOSLUK },
  baslik: {
    color: RENK.yazi,
    fontSize: 30,
    fontWeight: '700',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 14,
  },
  liste: { flex: 1 },
  icerik: { paddingHorizontal: 14, paddingBottom: 80 },
  satir: {
    minHeight: 64,
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginBottom: 10,
    borderRadius: 14,
    backgroundColor: RENK.kutu,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  ikincil: { backgroundColor: RENK.kutuIkincil },
  odakli: { borderColor: RENK.vurgu, backgroundColor: RENK.kutuOdak },
  satirYazi: { color: RENK.yazi, fontSize: 19, lineHeight: 25 },
  odakliYazi: { color: '#FFFFFF', fontWeight: '600' },
});
