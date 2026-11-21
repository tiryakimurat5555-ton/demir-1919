// Aethelis — ekranlar arası geçiş, kayıt ve ekran okuyucu denetimi.
// Bahtiyar Cankurt'un uzay oyunu tasarımından (belgeler/). Görsel arayüzü olmayan, sesle ve dokunma
// hareketleriyle oynanan bir koloni ve uzay keşif oyunu. Dikey ekranda oynanır (app.json orientation).
//
// Erişilebilirlik: oyun VoiceOver / TalkBack KAPALIYKEN oynanır. Kendi Türkçe sesli rehberi (src/ses/rehber.js)
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
import Yuzey from './src/ekran/Yuzey';
import { ortamCal, ortamSesiAyarla, sesleriHazirla } from './src/ses/efektler';
import { ayarlarOku, ayarlarYaz, otoOku, otoSil, tarihMetni, VARSAYILAN_AYARLAR, yuvalariOku } from './src/oyun/kayit';
import { yeniOyun } from './src/oyun/durum';
import { durumKisa } from './src/oyun/yuzey/dunya';

const SURUM = '2.6';
const OYUN_ADI = 'Aethelis';

const HAKKINDA_METNI = [
  OYUN_ADI + '. İnsanlığın derin uzaydaki sığınağı Aethelis-IV\'te bir koloni kurup gemi inşa ettiğin, sesle oynanan bir uzay keşif oyunu.',
  'Tasarım: Bahtiyar Cankurt. Yapım: Murat ve Bahtiyar.',
  'Sürüm ' + SURUM + '. Görevler: Sinyal Arayışı, Jeotermal Sondaj, Antik Kseno-Laboratuvar Kazısı Tersane Zemin Güçlendirmesi, Kıvılcım ve İlk Uçuş. Vadi-i Sukût, iniş kapsülü, Gözcü Tepesi, Manyetik Sırtlar, Kadim Krater, Uğultulu Plato ve yörünge.',
  'Ortam sesleri ve efektler Bahtiyar\'ın ses arşivinden.',
];

const HAREKETLER = [
  'Yüzeyde: parmağını ekrana koyup yukarı sürükle ve tut, ileri yürürsün. Aşağı sürüklersen geri, sağa ya da sola sürüklersen dönersin. Parmak ne kadar uzaksa o kadar hızlı; az sürüklersen sessizce, yavaş yürürsün. Dönerken her otuz derecede bir tık duyarsın.',
  'Dokun: çevrende ne var; yerler ve kişiler saat yönüyle söylenir. Saat 12 önün, 3 sağın, 6 arkan, 9 solun.',
  'Uzun bas: radar. Bir dalga gönderirsin; yankılar nesnelerin yönünden, uzaklarsa geç döner. En yakın üç şey söylenir.',
  'Çift dokun: yanındaki şeyi kullan, hava kilidinden geç ya da yanındakiyle konuş.',
  'İki parmakla dokun: konuşmayı sustur.',
  'İki parmakla çift dokun: oyun menüsü. Görev, Yerler, koloni, mürettebat, uzay haritası ve ana menü orada. Yerler\'den bir yer seçersen oraya kendin yürürsün; yolda ekrana dokunursan durursun. Yürürken iki parmakla yukarı kaydırırsan Yerler doğrudan açılır.',
  'Yıldız Zamanı: yürürken ekranın sağ üst köşesine çift dokun; gün, nöbet ve sıradaki nöbete kalan süre okunur. Menüde de var. Her nöbet değişiminde o nöbetin yıldızının çanı çalar.',
  'Ekim yatakları (tarım alanında ve saklı vahada): aşağı kaydır sonraki yatak, iki parmakla sola kaydır önceki. Dokun: yatağın durumu; her yatak kendi sesini çalar: kuru çatırtı, çürük şapırtı, sağlıklı damla, olgun bitkinin zili. İki parmakla üç kez yukarı ya da aşağı sürt: çapala. Basılı tut: tohum seç. Çift dokun: ek. İki parmakla çevir: su vanası. Sağa ya da sola kaydır: sıcaklık. Yukarı kaydır: hasat. İki parmakla çift dokun: çık.',
  'Telsiz çağrısı gelince üç tonlu bir zil çalar: çift dokun, dinle. İki parmakla aşağı kaydırırsan ertelenir; menüdeki telsiz kayıtlarından sonra dinlersin. Telsiz konuşurken rehber araya girmez, söyleyeceğini telsiz bitince söyler; yalnız menüde gezinirken öğeler telsiz kısılarak hemen okunur. Telsizi susturmak için iki parmakla dokun.',
  'Valf dengelemede: basınç yükseldikçe gazın tıslaması tizleşir. Kesik alarm başlayınca çift dokun. Dokun: basıncı söyler. İki parmakla çift dokun: valften çekil.',
  'Ayak dengelemede: kulaklıkta iki ton. Ayak yüksekse tonu ince: aşağı sürükle; alçaksa yukarı. Tonlar birleşip titreşim durunca kıpırdama. Dokun: durumu söyler. İki parmakla çift dokun: çekil.',
  'Uğultulu Plato\'da rüzgâr ıslığı yükselince dur: yürürken hamle yakalarsa savrulursun.',
  'Doğudaki kristal bataklıklarında bir sütun çıtırdayarak yüklenirse ondan uzaklaş. Lav koridorlarında ayağının altında gümbürtü duyarsan tam tersine hemen yer değiştir. Cıva şelalelerinde ve metan mağaralarında maruziyetini dinle; mağaralarda termal giysi korur.',
  'Savaş duruşunda: düşmanın motor sesini iki kulakta eşitle, sağa sola kaydır; kilit tonu çalınca dokun: ateş, yukarı kaydır: torpido. İki parmakla çevir: silah tonunu düşman kalkanının tonuna eşle, kalkan delinir. Düşman şarj olurken uyarı sesi gelir: iki parmakla dokun kalkan, sesin ters yanına kaydır kaçınma, torpidoya çift dokun karşı ateş. Basılı tut: durum ve kalkan tonu.',
  'Uzay operasyonunda (donanımı tam bir noktaya kenetlenince başlar): her adımın ne istediği söylenir. Hedefin sesi iki kulakta eşitlenene dek sağa-sola kaydır, yukarı kaydırıp yaklaş; sessiz yaklaşmada yalnız dokun. İki parmakla çevir: frekans. Alarmda çift dokun: basınç. Basılı tut: sonar, kiriş, tonları dinle. Tehlike bir yandan gelince ters yana kaydır. İki parmağını ayır: dron. İki ya da üç parmakla kaydır: kademeli işler. Dokun: durum. İki parmakla çift dokun: duraklat; kokpitte çift dokununca sürer.',
  'Vinçte: parça kulaklığında bir yana kaymış sallanır. Sağa ya da sola sürükle; ses iki kulakta eşitlenip düzenli tık duyulunca parça ortada. Aşağı kaydır: bir basamak indir. Oturunca çift dokun: kenetle. Dokun: durum. İki parmakla çift dokun: çekil.',
  'Yüzey araçları: vadideki araç hangarından binilir. Çöl Tilkisi hızlı kayar ve zehirden az etkilenir; Mammoth derin damarları kazar; Atmosphere-X uçar; Demir Kervan ve Akrep koloniye kendiliğinden malzeme getirir. İnmek için menüde aracın adı.',
  'Gemide: iki parmakla sağa ya da sola kaydır, odalar arasında geç. Dokun: odanın terminali; reaktör odasında güç dağıtımı, revirde tıbbi tarama. Basılı tut: odadaki görevliyle konuş.',
  'Uzayda, kokpitteyken: yukarı kaydır itki, aşağı ters itici; sağa ya da sola kaydır, burnu çevir. Her noktanın feneri kendi perdesinde çalar; ses iki kulakta eşitlenince pruva kilitlenir. Basılı tut: radar. Çift dokun: yakındaki noktaya kenetlen. Aethelis-IV\'e kenetlenince inersin.',
  'Rezonansta (kilitli kadim kapılarda): kapı nota dizisini çalar. Yukarı ya da aşağı kaydır: nota seçilir ve çalar; yukarı inceltir. Çift dokun: notayı kapıya çal. Dokun: diziyi yeniden dinle. İki parmakla çift dokun: kapıdan çekil.',
  'Frekans ayarında: yukarı ya da aşağı sürükle, ya da iki parmakla çevir; kanal değişir. Sağa ya da sola hızlı kaydır: ince ayar. Dokun: kanalı söyler. İki parmakla çift dokun: ayardan çık.',
  'Menülerde: sağa ya da sola kaydır, sonraki ya da önceki öğe. Yukarı kaydır, listenin başı; aşağı kaydır, listenin sonu. Çift dokun, seç. Uzun bas, açıklama. İki parmakla çift dokun, geri.',
  'Oyun kendiliğinden kaydedilir; telefonu kilitlesen ya da uygulamadan çıksan da kaldığın yerden sürer. Kapsüldeki merkez terminalinden üç yuvaya elle de kaydedebilirsin.',
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
  const [yuvalar, setYuvalar] = useState([]);

  useEffect(() => {
    (async () => {
      const a = await ayarlarOku();
      ayarRef.current = a;
      setAyarlar(a);
      await rehberHazirla();
      rehberAyarla({ konusmaHizi: a.konusmaHizi, sesKimligi: a.sesKimligi });
      await sesleriHazirla();
      ortamSesiAyarla(a.ortamDuzeyi);
      setKayit(await otoOku());
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
    setEkran('oyun');
  }, []);

  const oyundanCik = useCallback(async () => {
    sustur();
    setKayit(await otoOku());
    setEkran('menu');
  }, []);

  const yuvalariAc = useCallback(async () => {
    setYuvalar(await yuvalariOku());
    setEkran('yuvalar');
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

  // Menülerde giriş melodisi; oyunda ortamı Yüzey ekranı yönetir
  useEffect(() => {
    if (hazir && ekran !== 'oyun') ortamCal('giris_muzik', 0.7);
  }, [hazir, ekran]);

  let icerik = null;
  if (ekran === 'menu') {
    icerik = (
      <SesliListe
        key={'menu' + girisNo}
        baslik={OYUN_ADI}
        giris="Ana menü"
        rehberAcik
        ogeler={[
          ...(kayit
            ? [{ id: 'devam', etiket: 'Devam et', efekt: 'el_devam', ipucu: () => 'Kaldığın yer: ' + durumKisa(kayit), sec: () => oyunuBaslat(kayit) }]
            : []),
          {
            id: 'yeni',
            etiket: 'Yeni oyun',
            efekt: kayit ? 'el_secim' : 'el_yeni_oyun',
            ipucu: 'Aethelis-IV, Vadi-i Sukût. Birinci görev: Sinyal Arayışı. Kulaklık tak.',
            sec: () => (kayit ? setEkran('yeniOnay') : oyunuBaslat(null)),
          },
          { id: 'yukle', etiket: 'Kayıt yükle', ipucu: 'Elle kaydettiğin üç yuva.', sec: yuvalariAc },
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
        giris="Otomatik kayıt silinecek ve oyun baştan başlayacak. Elle kaydettiğin yuvalar kalır. Emin misin?"
        rehberAcik
        onGeri={menuyeDon}
        ogeler={[
          { id: 'hayir', etiket: 'Hayır, ana menüye dön', sec: menuyeDon },
          {
            id: 'evet',
            etiket: 'Evet, baştan başla',
            efekt: 'el_yeni_oyun',
            sec: () => {
              otoSil();
              setKayit(null);
              oyunuBaslat(null);
            },
          },
        ]}
      />
    );
  } else if (ekran === 'oyun') {
    icerik = <Yuzey key={'oyun' + girisNo} baslangic={baslangic} onGeri={oyundanCik} yeniOyunUret={() => yeniOyun()} />;
  } else if (ekran === 'yuvalar') {
    icerik = (
      <SesliListe
        key={'yuva' + girisNo}
        baslik="Kayıt yükle"
        giris={yuvalar.some((y) => y.d) ? 'Bir yuva seç.' : 'Henüz elle kayıt yok. Kapsüldeki merkez terminalinden kaydedebilirsin.'}
        rehberAcik
        onGeri={menuyeDon}
        ogeler={[
          ...yuvalar.map((y) => ({
            id: 'y' + y.no,
            etiket: 'Yuva ' + y.no + (y.d ? ': ' + tarihMetni(y.tarih) : ': boş'),
            ipucu: y.d ? durumKisa(y.d) : '',
            sec: () => (y.d ? oyunuBaslat(y.d) : soyle('Bu yuva boş.', 'istek', true)),
          })),
          { id: 'geri', etiket: 'Ana menüye dön', sec: menuyeDon },
        ]}
      />
    );
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
            {OYUN_ADI} kendi Türkçe sesli rehberini kullanır ve dokunma hareketlerini doğrudan algılar. Oynamak için
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
              setTimeout(() => soyle(OYUN_ADI + '.', 'istek', true), 300);
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
