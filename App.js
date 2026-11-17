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
import Oyun from './src/ekran/Oyun';
import Ayarlar from './src/ekran/Ayarlar';
import { BOLUMLER, ILK_BOLUM } from './src/hikaye';
import { bolumeGec, yeniDurum } from './src/oyun/motor';
import { ortamCal, ortamSesiAyarla, sesleriHazirla } from './src/ses/efektler';
import { ayarlarOku, ayarlarYaz, kayitOku, kayitSil, VARSAYILAN_AYARLAR } from './src/oyun/kayit';

const HAKKINDA_METNI = [
  'Demir 1919. 1918 ile 1923 arasında, işgal altındaki İstanbul\'da başlayan bir tarihsel macera ve dedektiflik oyunu.',
  'Oyundaki gizli örgüt ve olay örgüsü kurgudur. Gerçek tarihî olaylar arka plan olarak kullanılır.',
  'Sürüm 0.27 (derinleştirme): Sudaki Adam, Ölüler Konuşur, On Yedi Numara, Kül, Kalliope, Hotel Olympos, Montaigne, Kalay, Imperial, Kurşun Mühür, Kordon, İmza, Satranç, Que sais-je?, Genel Kurul, 16 Mart, Kağnı, Kinin, Yeşil Mürekkep, Tarife.',
];

const HAREKETLER = [
  'Sağa kaydır: sonraki öğe. Sola kaydır: önceki öğe.',
  'Bir öğeye dokun: o öğeyi oku. Parmağını ekranda yavaşça gezdirmek de öğeleri okur.',
  'Ekranın herhangi bir yerine çift dokun: okunan öğeyi seç.',
  'Uzun bas: okunan öğeyi açıklamasıyla yeniden oku.',
  'İki parmakla dokun: konuşmayı sustur.',
  'İki parmakla çift dokun: bir önceki ekrana dön.',
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
  const [oyunDurumu, setOyunDurumu] = useState(null);

  useEffect(() => {
    (async () => {
      const a = await ayarlarOku();
      ayarRef.current = a;
      setAyarlar(a);
      await rehberHazirla();
      rehberAyarla({ konusmaHizi: a.konusmaHizi, sesKimligi: a.sesKimligi });
      await sesleriHazirla();
      ortamSesiAyarla(a.ortamDuzeyi);
      setKayit(await kayitOku());
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

  // Oyunun en son durumu (ekran okuyucu açılıp kapanınca ya da menüye dönünce kullanılır)
  const sonDurum = useRef(null);
  const oyunuBaslat = useCallback((d) => {
    sonDurum.current = d;
    setOyunDurumu(d);
    setEkran('oyun');
  }, []);

  const oyundanCik = useCallback(() => {
    sustur();
    if (sonDurum.current) {
      setKayit(sonDurum.current);
      setOyunDurumu(sonDurum.current);
    }
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
    if (hazir && ekran !== 'oyun') ortamCal('ortam_rihtim', 0.45);
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
            ? [{ id: 'devam', etiket: 'Devam et', ipucu: 'Kaldığın yerden sürdürürsün.', sec: () => oyunuBaslat(kayit) }]
            : []),
          {
            id: 'yeni',
            etiket: 'Yeni oyun',
            ipucu: 'Hikâyeyi birinci bölümden başlatır.',
            sec: () => (kayit ? setEkran('yeniOnay') : oyunuBaslat(yeniDurum(ILK_BOLUM))),
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
              kayitSil();
              setKayit(null);
              oyunuBaslat(yeniDurum(ILK_BOLUM));
            },
          },
        ]}
      />
    );
  } else if (ekran === 'ayarlar') {
    icerik = <Ayarlar key={'ayar' + girisNo} ayarlar={ayarlar} ayarDegistir={ayarDegistir} onGeri={menuyeDon} />;
  } else if (ekran === 'oyun' && oyunDurumu) {
    icerik = (
      <Oyun
        key={'oyun' + girisNo + (sonDurum.current || oyunDurumu).bolum}
        bolum={BOLUMLER[(sonDurum.current || oyunDurumu).bolum] || ILK_BOLUM}
        baslangicDurumu={sonDurum.current || oyunDurumu}
        onDurum={(d) => {
          sonDurum.current = d;
        }}
        onAnaMenu={oyundanCik}
        onBolumGec={(bolumId, d) => {
          const yeni = bolumeGec(BOLUMLER[bolumId], d);
          sustur();
          oyunuBaslat(yeni);
        }}
      />
    );
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
