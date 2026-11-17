// Demir 1919 — başlangıç iskeleti.
// Amaç: GitHub → Expo yayın hattının çalıştığını doğrulamak ve oyunun sesli,
// erişilebilir menü düzenine ilk adımı atmak.
//
// Erişilebilirlik:
//  - VoiceOver / TalkBack AÇIKSA: her öğe normal erişilebilir düğmedir; duyurular
//    ekran okuyucuya iletilir (oyun kendisi konuşmaz, iki ses üst üste binmez).
//  - Ekran okuyucu KAPALIYSA: oyunun kendi sesli rehberi (telefonun Türkçe sesi) konuşur.
//    Bir düğmeye bir kez dokunmak adını okur; aynı düğmeye 3 saniye içinde yeniden
//    dokunmak onu seçer (VoiceOver alışkanlığına benzesin diye).
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';

const RENK = {
  zemin: '#1A140E',
  kart: '#2A2118',
  kartSecili: '#4A3A26',
  yazi: '#F2E6D0',
  soluk: '#BFAE90',
  vurgu: '#D9A441',
};

const GIRIS_METNI = [
  'İstanbul. Mondros Mütarekesi imzalanalı çok olmadı. Boğaz\'da yabancı savaş gemileri demirli, rıhtımlarda yabancı askerler dolaşıyor.',
  'Arif Demir, Çanakkale\'de savaşmış eski bir asker. Üniformasını çoktan çıkardı; şimdi limanda yük taşıyarak geçiniyor ve geçmişini konuşmamaya çalışıyor.',
  'Bir sabah, limandaki en yakın dostu Süleyman Kaptan onu bir kenara çekiyor. Gece bir denizci ölü bulunmuş. Ölüm doğal görünmüyor ve kimse eşyalarına bakmaya cesaret edemiyor.',
  'Arif\'in sessiz hayatı burada sona erecek.',
  'Bu, oyunun ilk taslağıdır. Hikâye ve oynanış bir sonraki aşamada başlayacak.',
];

const HAKKINDA_METNI = [
  'Demir 1919. 1918 ile 1923 arasında, işgal altındaki İstanbul\'da başlayan bir tarihsel macera ve dedektiflik oyunu.',
  'Oyundaki gizli örgüt ve olay örgüsü kurgudur. Gerçek tarihî olaylar arka plan olarak kullanılır.',
  'Sürüm 0.1, başlangıç iskeleti.',
];

// ---------------------------------------------------------------------------
// Sesli rehber
// ---------------------------------------------------------------------------
let ekranOkuyucuAcik = false;
let turkceSes;

async function rehberHazirla() {
  try {
    const sesler = await Speech.getAvailableVoicesAsync();
    const tr = sesler.filter((s) => (s.language || '').toLowerCase().startsWith('tr'));
    tr.sort((a, b) => (b.quality === 'Enhanced' ? 1 : 0) - (a.quality === 'Enhanced' ? 1 : 0));
    turkceSes = tr.length ? tr[0].identifier : undefined;
  } catch (e) {
    turkceSes = undefined;
  }
}

function soyle(metin) {
  if (!metin) return;
  if (ekranOkuyucuAcik) {
    AccessibilityInfo.announceForAccessibility(metin);
    return;
  }
  Speech.stop();
  Speech.speak(metin, { language: 'tr-TR', voice: turkceSes, rate: 1.0 });
}

function sustur() {
  Speech.stop();
}

// ---------------------------------------------------------------------------
// Düğme: ekran okuyucu kapalıyken "dokun = oku, yeniden dokun = seç"
// ---------------------------------------------------------------------------
function Dugme({ etiket, ipucu, onSec, secili, onOdak }) {
  const bas = () => {
    if (ekranOkuyucuAcik || secili) {
      Haptics.selectionAsync().catch(() => {});
      onSec();
      return;
    }
    onOdak();
    soyle(etiket + (ipucu ? '. ' + ipucu : '') + '. Seçmek için yeniden dokun.');
  };
  return (
    <Pressable
      onPress={bas}
      accessibilityRole="button"
      accessibilityLabel={etiket}
      accessibilityHint={ipucu}
      style={[stil.dugme, secili && !ekranOkuyucuAcik ? stil.dugmeSecili : null]}
    >
      <Text style={stil.dugmeYazi}>{etiket}</Text>
    </Pressable>
  );
}

// Ekrandaki seçili düğmeyi tutar; 3 saniye sonra seçim düşer.
function useSecim() {
  const [secili, setSecili] = useState(null);
  const zaman = useRef(null);
  const odakla = useCallback((ad) => {
    setSecili(ad);
    clearTimeout(zaman.current);
    zaman.current = setTimeout(() => setSecili(null), 3000);
  }, []);
  const temizle = useCallback(() => {
    clearTimeout(zaman.current);
    setSecili(null);
  }, []);
  useEffect(() => () => clearTimeout(zaman.current), []);
  return [secili, odakla, temizle];
}

// ---------------------------------------------------------------------------
// Ekranlar
// ---------------------------------------------------------------------------
function AnaMenu({ git }) {
  const [secili, odakla, temizle] = useSecim();
  useEffect(() => {
    soyle('Demir 1919. Ana menü. Yeni oyun ve Hakkında düğmeleri var.');
  }, []);
  const sec = (hedef) => {
    temizle();
    git(hedef);
  };
  return (
    <View style={stil.ortala}>
      <Text style={stil.baslik} accessibilityRole="header">
        Demir 1919
      </Text>
      <Text style={stil.altBaslik}>İşgal altındaki İstanbul'da bir soruşturma</Text>
      <Dugme
        etiket="Yeni oyun"
        ipucu="Hikâyenin başlangıcını dinlersin"
        secili={secili === 'yeni'}
        onOdak={() => odakla('yeni')}
        onSec={() => sec('giris')}
      />
      <Dugme
        etiket="Hakkında"
        secili={secili === 'hakkinda'}
        onOdak={() => odakla('hakkinda')}
        onSec={() => sec('hakkinda')}
      />
    </View>
  );
}

function MetinEkrani({ baslik, paragraflar, git }) {
  const [secili, odakla, temizle] = useSecim();
  const tumu = paragraflar.join(' ');
  useEffect(() => {
    soyle(baslik + '. ' + tumu);
    return () => sustur();
  }, [baslik, tumu]);
  return (
    <ScrollView contentContainerStyle={stil.metinKap}>
      <Text style={stil.baslik} accessibilityRole="header">
        {baslik}
      </Text>
      {paragraflar.map((p, i) => (
        <Text key={i} style={stil.paragraf}>
          {p}
        </Text>
      ))}
      <Dugme
        etiket="Yeniden dinle"
        secili={secili === 'tekrar'}
        onOdak={() => odakla('tekrar')}
        onSec={() => {
          temizle();
          soyle(tumu);
        }}
      />
      <Dugme
        etiket="Ana menüye dön"
        secili={secili === 'geri'}
        onOdak={() => odakla('geri')}
        onSec={() => {
          temizle();
          git('menu');
        }}
      />
    </ScrollView>
  );
}

// ---------------------------------------------------------------------------
// Uygulama
// ---------------------------------------------------------------------------
export default function App() {
  const [ekran, setEkran] = useState(null);

  useEffect(() => {
    let abone;
    (async () => {
      try {
        ekranOkuyucuAcik = await AccessibilityInfo.isScreenReaderEnabled();
      } catch (e) {
        ekranOkuyucuAcik = false;
      }
      await rehberHazirla();
      setEkran('menu');
    })();
    abone = AccessibilityInfo.addEventListener('screenReaderChanged', (acik) => {
      ekranOkuyucuAcik = acik;
      if (acik) sustur();
    });
    return () => {
      sustur();
      if (abone && abone.remove) abone.remove();
    };
  }, []);

  let icerik = null;
  if (ekran === 'menu') icerik = <AnaMenu git={setEkran} />;
  else if (ekran === 'giris')
    icerik = <MetinEkrani baslik="Başlangıç" paragraflar={GIRIS_METNI} git={setEkran} />;
  else if (ekran === 'hakkinda')
    icerik = <MetinEkrani baslik="Hakkında" paragraflar={HAKKINDA_METNI} git={setEkran} />;

  return (
    <View style={stil.kok}>
      <StatusBar style="light" />
      {icerik}
    </View>
  );
}

const stil = StyleSheet.create({
  kok: { flex: 1, backgroundColor: RENK.zemin, paddingTop: 50, paddingBottom: 24 },
  ortala: { flex: 1, justifyContent: 'center', padding: 24 },
  metinKap: { padding: 24, paddingTop: 48 },
  baslik: { color: RENK.vurgu, fontSize: 34, fontWeight: '700', textAlign: 'center', marginBottom: 8 },
  altBaslik: { color: RENK.soluk, fontSize: 17, textAlign: 'center', marginBottom: 40 },
  paragraf: { color: RENK.yazi, fontSize: 19, lineHeight: 28, marginBottom: 16 },
  dugme: {
    backgroundColor: RENK.kart,
    borderRadius: 14,
    paddingVertical: 22,
    paddingHorizontal: 20,
    marginTop: 14,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  dugmeSecili: { backgroundColor: RENK.kartSecili, borderColor: RENK.vurgu },
  dugmeYazi: { color: RENK.yazi, fontSize: 22, fontWeight: '600', textAlign: 'center' },
});
