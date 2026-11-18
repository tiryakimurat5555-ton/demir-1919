// Konumsal ses denemesi. Amaç: Expo Go'da, WebView'daki Web Audio ile sağ-sol ve ön-arka
// ayrımının iPhone'da (kulaklıkla) duyulup duyulmadığını sınamak. Açık dünyanın ilk taşı.
//
// Hareketler:
//   tek parmakla sağa-sola sürükle: dön        yukarı-aşağı sürükle: ileri-geri yürü
//   dokun: zil nerede? (rehber gerçek yönü söyler; duyduğunla karşılaştır)
//   çift dokun: zili rastgele yeni bir yere taşı
//   uzun bas: ses modelini değiştir (HRTF / eşit güç)
//   iki parmakla dokun: sustur              iki parmakla çift dokun: ana menüye dön
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useJestler } from '../arayuz/jestler';
import { soyle, sustur } from '../ses/rehber';
import { ortamCal } from '../ses/efektler';
import { RENK, UST_BOSLUK } from '../arayuz/tema';
import KonumsalSes from '../ses/konumsal';
import { don, saatYonu, goreliAci, sinirla, tarif, yuru } from '../oyun/konum';

const ALAN = { bati: -20, dogu: 20, guney: -20, kuzey: 20 };
const DONUS_HIZI = 0.008; // radyan / piksel
const YURUME_HIZI = 0.03; // metre / piksel
const ADIM_BOYU = 0.7;
const CEKIC = { x: 12, y: 4 };
const DENIZ = { x: 0, y: -18 };

// İkinci deneme: ElevenLabs'la üretilmiş gerçek ses dosyaları (tek kanala çevrilmiş kopyalar)
const DOSYALAR = [
  { id: 'kopek', ad: 'Köpek', modul: require('../../assets/ses/konumsal/kopek.wav'), nokta: { x: -8, y: 6 }, aralik: 5000, tasinir: true },
  { id: 'vapur', ad: 'Vapur düdüğü', modul: require('../../assets/ses/konumsal/vapur_duduk.wav'), nokta: { x: 3, y: -16 }, aralik: 14000 },
  { id: 'can', ad: 'Kilise çanı', modul: require('../../assets/ses/konumsal/kilise_cani.wav'), nokta: { x: 14, y: 12 }, aralik: 16000 },
];

function rastgeleNokta() {
  const a = Math.random() * Math.PI * 2;
  const r = 5 + Math.random() * 10;
  return { x: Math.round(Math.sin(a) * r), y: Math.round(Math.cos(a) * r) };
}

export default function SesDenemesi({ onGeri, gercek = false }) {
  const motor = useRef(null);
  const [durum, setDurum] = useState('Motor yükleniyor');
  const dinleyici = useRef({ x: 0, y: 0, yon: 0 });
  const zil = useRef({ x: 0, y: 8 });
  const noktalar = useRef(Object.fromEntries(DOSYALAR.map((f) => [f.id, f.nokta])));
  const hazirSayisi = useRef(0);
  const model = useRef('HRTF');
  const onceki = useRef({ dx: 0, dy: 0 });
  const yurunen = useRef(0);

  const guncelle = () => {
    if (motor.current) motor.current.dinleyici(dinleyici.current);
  };

  const sahneKur = () => {
    const m = motor.current;
    if (!m) return;
    m.baslat();
    m.dinleyici(dinleyici.current);
    if (gercek) {
      for (const f of DOSYALAR) m.yukle(f.id, f.modul);
      return;
    }
    m.kaynak('zil', 'zil', zil.current);
    m.kaynak('cekic', 'cekic', CEKIC);
    m.kaynak('deniz', 'deniz', DENIZ);
  };

  useEffect(() => {
    ortamCal(null);
    if (gercek)
      soyle(
        'Gerçek seslerle deneme. Kulaklık tak. Bir köpek, bir vapur düdüğü ve bir kilise çanı var; sesler yükleniyor. Sağa sola sürükleyerek dön, yukarı aşağı sürükleyerek yürü. Dokun: sesler nerede. Çift dokun: köpeği taşı. Uzun bas: ses modelini değiştir. İki parmakla çift dokun: geri.',
        'istek',
        true,
      );
    else soyle(
      'Konumsal ses denemesi. Kulaklık tak. Bir zil, bir çekiç ve deniz var. Sağa sola sürükleyerek dön, yukarı aşağı sürükleyerek yürü. Dokun: zil nerede. Çift dokun: zili taşı. Uzun bas: ses modelini değiştir. İki parmakla çift dokun: geri.',
      'istek',
      true,
    );
    return () => {
      if (motor.current) motor.current.durdur();
      sustur();
    };
  }, []);

  const jest = useJestler(
    {
      onSurukle: (mod, dx, dy) => {
        if (mod !== 'tek') return;
        const ddx = dx - onceki.current.dx;
        const ddy = dy - onceki.current.dy;
        onceki.current = { dx, dy };
        let d = dinleyici.current;
        if (Math.abs(ddx) > Math.abs(ddy)) d = don(d, ddx * DONUS_HIZI);
        else {
          const metre = -ddy * YURUME_HIZI;
          d = sinirla(yuru(d, metre), ALAN);
          yurunen.current += Math.abs(metre);
          if (yurunen.current >= ADIM_BOYU) {
            yurunen.current = 0;
            if (motor.current) motor.current.adim();
          }
        }
        dinleyici.current = d;
        guncelle();
      },
      onSurukleBitti: () => {
        onceki.current = { dx: 0, dy: 0 };
        const d = dinleyici.current;
        if (gercek) soyle('Köpek saat ' + saatYonu(goreliAci(d, noktalar.current.kopek)) + ' yönünde.', 'istek', true);
        else soyle('Önün saat 12. Zil saat ' + saatYonu(goreliAci(d, zil.current)) + ' yönünde.', 'istek', true);
      },
      onDokun: (parmak) => {
        if (parmak >= 2) {
          sustur();
          return;
        }
        const d = dinleyici.current;
        if (gercek) soyle(DOSYALAR.map((f) => tarif(f.ad, d, noktalar.current[f.id])).join(' '), 'istek', true);
        else soyle([tarif('Zil', d, zil.current), tarif('Çekiç', d, CEKIC), tarif('Deniz', d, DENIZ)].join(' '), 'istek', true);
      },
      onCiftDokun: (parmak) => {
        if (parmak >= 2) {
          onGeri();
          return;
        }
        if (gercek) {
          const f = DOSYALAR[0];
          noktalar.current.kopek = rastgeleNokta();
          if (motor.current) motor.current.dosyaKaynak(f.id, f.id, noktalar.current.kopek, f.aralik);
          soyle('Köpek taşındı. Nerede duyuyorsun? Sonra dokunup karşılaştır.', 'istek', true);
          return;
        }
        zil.current = rastgeleNokta();
        if (motor.current) motor.current.kaynak('zil', 'zil', zil.current);
        soyle('Zil taşındı. Nerede duyuyorsun? Sonra dokunup karşılaştır.', 'istek', true);
      },
      onUzunBas: () => {
        model.current = model.current === 'HRTF' ? 'equalpower' : 'HRTF';
        if (motor.current) motor.current.model(model.current);
        soyle(model.current === 'HRTF' ? 'Model: HRTF, baş modeli. Ön ve arka ayrılmalı.' : 'Model: eşit güç. Yalnız sağ ve sol.', 'istek', true);
      },
    },
    { dokunmaBekle: true },
  );

  return (
    <View style={stiller.kap} {...jest}>
      <KonumsalSes
        ref={motor}
        onMesaj={(m) => {
          if (m.tur === 'yuklendi') {
            sahneKur();
            setDurum('Motor yüklendi');
          } else if (m.tur === 'dosyaHazir') {
            const f = DOSYALAR.find((x) => x.id === m.ad);
            if (f && motor.current) motor.current.dosyaKaynak(f.id, f.id, noktalar.current[f.id], f.aralik);
            hazirSayisi.current += 1;
            setDurum('Yüklenen ses: ' + hazirSayisi.current + ' / ' + DOSYALAR.length);
            if (hazirSayisi.current === DOSYALAR.length) soyle('Sesler hazır.', 'istek', false);
          } else if (m.tur === 'hazir') {
            setDurum('Ses bağlamı: ' + m.durum);
            if (m.durum !== 'running') soyle('Ses motoru başlayamadı. Durum: ' + m.durum, 'istek', false);
          } else if (m.tur === 'hata') {
            setDurum('Hata: ' + m.metin);
            soyle('Ses motorunda hata: ' + m.metin, 'istek', false);
          }
        }}
      />
      <Text style={stiller.baslik}>{gercek ? 'Gerçek seslerle deneme' : 'Konumsal ses denemesi'}</Text>
      <Text style={stiller.yazi}>{durum}</Text>
    </View>
  );
}

const stiller = StyleSheet.create({
  kap: { flex: 1, backgroundColor: RENK.zemin, paddingTop: UST_BOSLUK, paddingHorizontal: 20 },
  baslik: { color: RENK.yazi, fontSize: 26, fontWeight: '700', marginBottom: 12 },
  yazi: { color: RENK.soluk, fontSize: 17 },
});
