// Demir 1919 — ekranlar arası geçiş ve ekran okuyucu denetimi.
//
// Erişilebilirlik kararı (17 Kasım 2026, Murat: A seçeneği):
// Oyun VoiceOver / TalkBack KAPALIYKEN oynanır. Kendi Türkçe sesli rehberi (src/ses/rehber.js)
// ve VoiceOver'a benzeyen hareketleri vardır (src/arayuz/SesliListe.js):
//   sağa / sola kaydır: sonraki / önceki öğe
//   dokun: parmağın altındaki öğeyi oku      çift dokun: odaktaki öğeyi seç
//   uzun bas: öğeyi açıklamasıyla oku        iki parmakla dokun: sustur
//   iki parmakla çift dokun: geri
// Ekran okuyucu açıksa bir uyarı ekranı çıkar; kapanınca oyun kendiliğinden başlar.
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import SesliListe from './src/arayuz/SesliListe';
import { rehberAyarla, rehberHazirla, soyle, sustur } from './src/ses/rehber';
import { RENK } from './src/arayuz/tema';
import Ayarlar from './src/ekran/Ayarlar';
import Karakoy from './src/ekran/Karakoy';
import { ortamCal, ortamSesiAyarla, sesleriHazirla } from './src/ses/efektler';
import { ayarlarOku, ayarlarYaz, VARSAYILAN_AYARLAR } from './src/oyun/kayit';
import { karakoyOku, karakoySil } from './src/oyun/karakoy/kayit';
import { durumKisa } from './src/oyun/karakoy/dunya';

const HAKKINDA_METNI = [
  'Demir 1919. 1918 ile 1923 arasında, işgal altındaki İstanbul\'da başlayan bir tarihsel macera ve dedektiflik oyunu.',
  'Oyundaki gizli örgüt ve olay örgüsü kurgudur. Gerçek tarihî olaylar arka plan olarak kullanılır.',
  'Sürüm 0.80. Birinci perde, birinci görev: Sudaki Adam. Karaköy, Aralık 1918.',
];

const HAREKETLER = [
  'Oyunda: parmağını ekrana koyup yukarı kaydır ve tut, ileri yürürsün. Aşağı kaydırırsan geri, sağa ya da sola kaydırırsan dönersin. Parmak ne kadar uzaksa o kadar hızlı.',
  'Dokun: çevrende ne var; yerler, kişiler ve eşyalar saat yönüyle söylenir. Saat 12 önün, 3 sağın, 6 arkan, 9 solun.',
  'Çift dokun: kapıdan geç, eşyayı incele ya da yanındakiyle konuş.',
  'Uzun bas: saat, yer ve baktığın yön.',
  'İki parmakla dokun: konuşmayı sustur.',
  'İki parmakla çift dokun: oyun menüsü. Görev, Yerler, soruşturma panosu, defter, üstündekiler, bekleme ve ana menü orada. Yerler\'den bir yer seçersen Arif oraya kendisi yürür; yolda ekrana dokunursan durur.',
  'Menülerde: sağa ya da sola kaydır, sonraki ya da önceki öğe. Çift dokun, seç. Uzun bas, açıklama. İki parmakla çift dokun, geri.',
  'Kulaklık takarak oyna: sesler bulundukları yönden gelir.',
];

// Paragrafları okunabilir liste öğelerine çevirir; sona "geri" öğesi eklenir
function metinOgeleri(paragraflar, geriEtiket, geri) {
  return [
    ...paragraflar.map((p, i) => ({ id: 'p' + i, etiket: p, ikincil: true })),
    { id: 'geri', etiket: geriEtiket, sec: geri },
  ];
}

export default function App() {
  const [hazir, setHazir] = useState(false);
  const [ekran, setEkran] = useState('menu');
  const [voAcik, setVoAcik] = useState(false);
  const [voIzin, setVoIzin] = useState(false);
  const [girisNo, setGirisNo] = useState(0);
  const [ayarlar, setAyarlar] = useState(VARSAYILAN_AYARLAR);
  const [kayit, setKayit] = useState(null);
  const [baslangic, setBaslangic] = useState(null);

  useEffect(() => {
    (async () => {
      const a = await ayarlarOku();
      ayarRef.current = a;
      setAyarlar(a);
      await rehberHazirla();
      rehberAyarla({ konusmaHizi: a.konusmaHizi, sesKimligi: a.sesKimligi });
      await sesleriHazirla();
      ortamSesiAyarla(a.ortamDuzeyi);
      setKayit(await karakoyOku());
      setHazir(true);
    })();
  }, []);

  const ayarRef = useRef(VARSAYILAN_AYARLAR);
  ayarRef.current = ayarlar;
  const ayarDegistir = useCallback((degisen) => {
    const yeni = { ...ayarRef.current, ...degisen };
    ayarRef.current = yeni;
    rehberAyarla({ konusmaHizi: yeni.konusmaHizi, sesKimligi: yeni.sesKimligi });
    ortamSesiAyarla(yeni.ortamDuzeyi);
    ayarlarYaz(yeni);
    setAyarlar(yeni);
  }, []);

  const oyunuBaslat = useCallback((d) => {
    setBaslangic(d);
    setEkran('karakoy');
  }, []);

  const oyundanCik = useCallback(async () => {
    sustur();
    setKayit(await karakoyOku());
    setEkran('menu');
  }, []);

  // Ekran okuyucu açık mı? Oyun kendi sesli rehberini kullandığı için kapalıyken oynanır.
  useEffect(() => {
    AccessibilityInfo.isScreenReaderEnabled()
      .then((acik) => setVoAcik(!!acik))
      .catch(() => {});
    const abone = AccessibilityInfo.addEventListener('screenReaderChanged', (acik) => {
      setVoAcik(!!acik);
      if (acik) sustur();
      else {
        setVoIzin(false);
        setGirisNo((n) => n + 1);
      }
    });
    return () => abone.remove();
  }, []);

  const menuyeDon = useCallback(() => setEkran('menu'), []);

  // Menülerde rıhtımın sesi uzaktan duyulur; oyunda ortamı Oyun ekranı yönetir
  useEffect(() => {
    if (hazir && ekran !== 'karakoy') ortamCal('ortam_rihtim', 0.45);
  }, [hazir, ekran]);

  let icerik = null;
  if (ekran === 'menu') {
    icerik = (
      <SesliListe
        key={'menu' + girisNo}
        baslik="Demir 1919"
        giris="Ana menü"
        rehberAcik
        ogeler={[
          ...(kayit
            ? [{ id: 'devam', etiket: 'Devam et', ipucu: () => 'Kaldığın yer: ' + durumKisa(kayit), sec: () => oyunuBaslat(kayit) }]
            : []),
          {
            id: 'yeni',
            etiket: 'Yeni oyun',
            ipucu: 'Karaköy, 4 Aralık 1918. Birinci görev: Sudaki Adam. Kulaklık tak.',
            sec: () => (kayit ? setEkran('yeniOnay') : oyunuBaslat(null)),
          },
          { id: 'ayarlar', etiket: 'Ayarlar', ipucu: 'Konuşma hızı ve ses.', sec: () => setEkran('ayarlar') },
          { id: 'hareket', etiket: 'Hareketler', ipucu: 'Oyunu nasıl kullanacağını anlatır.', sec: () => setEkran('hareketler') },
          { id: 'hakkinda', etiket: 'Hakkında', sec: () => setEkran('hakkinda') },
        ]}
      />
    );
  } else if (ekran === 'yeniOnay') {
    icerik = (
      <SesliListe
        key={'onay' + girisNo}
        baslik="Yeni oyun"
        giris="Kayıtlı oyunun silinecek ve hikâye baştan başlayacak. Emin misin?"
        rehberAcik
        onGeri={menuyeDon}
        ogeler={[
          { id: 'hayir', etiket: 'Hayır, ana menüye dön', sec: menuyeDon },
          {
            id: 'evet',
            etiket: 'Evet, baştan başla',
            sec: () => {
              karakoySil();
              setKayit(null);
              oyunuBaslat(null);
            },
          },
        ]}
      />
    );
  } else if (ekran === 'karakoy') {
    icerik = <Karakoy key={'karakoy' + girisNo} baslangic={baslangic} onGeri={oyundanCik} onDurum={setBaslangic} />;
  } else if (ekran === 'ayarlar') {
    icerik = <Ayarlar key={'ayar' + girisNo} ayarlar={ayarlar} ayarDegistir={ayarDegistir} onGeri={menuyeDon} />;
  } else if (ekran === 'hareketler') {
    icerik = (
      <SesliListe
        key={'hareket' + girisNo}
        baslik="Hareketler"
        giris="Oyun VoiceOver kapalıyken, kendi sesiyle oynanır"
        rehberAcik
        onGeri={menuyeDon}
        ogeler={metinOgeleri(HAREKETLER, 'Ana menüye dön', menuyeDon)}
      />
    );
  } else if (ekran === 'hakkinda') {
    icerik = (
      <SesliListe
        key={'hakkinda' + girisNo}
        baslik="Hakkında"
        rehberAcik
        onGeri={menuyeDon}
        ogeler={metinOgeleri(HAKKINDA_METNI, 'Ana menüye dön', menuyeDon)}
      />
    );
  }

  const voEngeli = voAcik && !voIzin;

  if (!hazir) {
    return (
      <View style={[stiller.kap, stiller.orta]}>
        <StatusBar style="light" />
        <Text style={stiller.yukleniyor}>Yükleniyor</Text>
      </View>
    );
  }

  return (
    <View style={stiller.kap}>
      <StatusBar style="light" />
      <View
        style={stiller.icerik}
        accessibilityElementsHidden={voEngeli}
        importantForAccessibility={voEngeli ? 'no-hide-descendants' : 'auto'}
      >
        {voEngeli ? null : icerik}
      </View>
      {voEngeli ? (
        <View style={stiller.voKatman} accessibilityViewIsModal>
          <Text style={stiller.voBaslik} accessibilityRole="header">
            Ekran okuyucu açık
          </Text>
          <Text style={stiller.voYazi}>
            Demir 1919 kendi Türkçe sesli rehberini kullanır ve dokunma hareketlerini doğrudan algılar. Oynamak için
            VoiceOver'ı kapat: yan tuşa üç kez bas ya da Siri'ye "VoiceOver'ı kapat" de. Android'de TalkBack'i
            kısayoluyla kapat. Ekran okuyucu kapanınca oyun kendiliğinden başlar.
          </Text>
          <Text style={stiller.voYazi}>
            Oyundan çıkınca ekran okuyucuyu aynı yolla yeniden açabilirsin. Yan tuş kısayolu ayarlı değilse iPhone
            Ayarlar, Erişilebilirlik, Erişilebilirlik Kısayolu bölümünden VoiceOver'ı seç.
          </Text>
          <Pressable
            accessibilityRole="button"
            style={stiller.voDugme}
            onPress={() => {
              setVoIzin(true);
              setTimeout(() => soyle('Demir 1919.', 'istek', true), 300);
            }}
          >
            <Text style={stiller.voDugmeYazi}>Ekran okuyucu açıkken devam et</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

const stiller = StyleSheet.create({
  kap: { flex: 1, backgroundColor: RENK.zemin },
  orta: { alignItems: 'center', justifyContent: 'center' },
  icerik: { flex: 1 },
  yukleniyor: { color: RENK.soluk, fontSize: 17 },
  voKatman: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: RENK.zemin,
    paddingTop: 80,
    paddingHorizontal: 24,
  },
  voBaslik: { color: RENK.yazi, fontSize: 30, fontWeight: '700', marginBottom: 18 },
  voYazi: { color: RENK.yazi, fontSize: 19, lineHeight: 27, marginBottom: 16 },
  voDugme: {
    marginTop: 18,
    backgroundColor: RENK.kutuOdak,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 18,
  },
  voDugmeYazi: { color: RENK.yazi, fontSize: 19, fontWeight: '600', textAlign: 'center' },
});
