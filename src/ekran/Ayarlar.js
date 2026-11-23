// Ayarlar: konuşma hızı, ortam sesi düzeyi, nöbet uzunluğu ve Türkçe ses seçimi. Değişiklikler hemen uygulanır ve kaydedilir.
import React from 'react';
import SesliListe from '../arayuz/SesliListe';
import { soyle, turkceSesListesi } from '../ses/rehber';
import { NOBET_DAKIKA_EN_AZ, NOBET_DAKIKA_EN_COK } from '../oyun/zaman';

const EN_AZ = 0.6;
const EN_COK = 3.5; // Murat (1.13): yüzde 350'ye kadar
// Yüzde 200'e kadar onar, üstünde yirmi beşer artar (çok basmak gerekmesin)
const adim = (h, yon) => (yon > 0 ? (h >= 2 - 1e-6 ? 0.25 : 0.1) : h > 2 + 1e-6 ? 0.25 : 0.1);

const yuzde = (h) => 'yüzde ' + Math.round(h * 100);

export default function Ayarlar({ ayarlar, ayarDegistir, onGeri }) {
  const sesler = turkceSesListesi();
  const secili = sesler.find((s) => s.kimlik === ayarlar.sesKimligi) || sesler[0];
  const sesAdi = secili ? secili.ad + (secili.gelismis ? ', gelişmiş' : '') : 'telefonun varsayılan sesi';

  const hiz = (yeni) => {
    const h = Math.round(Math.max(EN_AZ, Math.min(EN_COK, yeni)) * 100) / 100;
    ayarDegistir({ konusmaHizi: h });
    // Yeni hız hemen duyulsun diye değer yeni hızla okunur
    setTimeout(() => soyle(h === ayarlar.konusmaHizi ? (h >= EN_COK ? 'En hızlı: ' : 'En yavaş: ') + yuzde(h) : yuzde(h), 'istek', true), 60);
    return 'sessiz';
  };

  const ortam = (yeni) => {
    const o = Math.round(Math.max(0, Math.min(1, yeni)) * 10) / 10;
    ayarDegistir({ ortamDuzeyi: o });
    setTimeout(() => soyle(o === 0 ? 'Ortam sesi kapalı' : yuzde(o), 'istek', true), 60);
    return 'sessiz';
  };

  // 3.17: nöbet uzunluğu 10-30 dakika, beşer (bir oyun günü altı nöbet)
  const nobetDk = ayarlar.nobetDakika || 10;
  const nobetMetni = (dk) => dk + ' dakika, bir oyun günü ' + (dk * 6 >= 60 ? (dk * 6) / 60 + ' saat' : dk * 6 + ' dakika');
  const nobet = (yeni) => {
    const dk = Math.max(NOBET_DAKIKA_EN_AZ, Math.min(NOBET_DAKIKA_EN_COK, yeni));
    ayarDegistir({ nobetDakika: dk });
    setTimeout(() => soyle((dk === nobetDk ? (dk >= NOBET_DAKIKA_EN_COK ? 'En uzun: ' : 'En kısa: ') : '') + nobetMetni(dk), 'istek', true), 60);
    return 'sessiz';
  };

  const ogeler = [
    {
      id: 'hiz',
      etiket: 'Konuşma hızı: ' + yuzde(ayarlar.konusmaHizi),
      ipucu: 'Alttaki Artır ve Azalt ile değiştir.',
    },
    { id: 'artir', etiket: 'Artır', sec: () => hiz(ayarlar.konusmaHizi + adim(ayarlar.konusmaHizi, 1)) },
    { id: 'azalt', etiket: 'Azalt', sec: () => hiz(ayarlar.konusmaHizi - adim(ayarlar.konusmaHizi, -1)) },
    {
      id: 'ortam',
      etiket: 'Ortam sesi: ' + yuzde(ayarlar.ortamDuzeyi),
      ipucu: 'Vadinin rüzgârı, kapsülün fanları gibi arka plan sesleri. Alttaki Artır ve Azalt ile değiştir.',
    },
    { id: 'ortamArtir', etiket: 'Artır', sec: () => ortam(ayarlar.ortamDuzeyi + 0.1) },
    { id: 'ortamAzalt', etiket: 'Azalt', sec: () => ortam(ayarlar.ortamDuzeyi - 0.1) },
    {
      id: 'nobet',
      etiket: 'Nöbet uzunluğu: ' + nobetMetni(nobetDk),
      ipucu: 'Oyun içi günün döngüsü: bir gün altı nöbet. Uzun nöbette gün yavaş akar; üretim ve bitkiler gerçek dakikayla aynı kalır. Alttaki Artır ve Azalt ile beşer dakika.',
    },
    { id: 'nobetArtir', etiket: 'Artır', sec: () => nobet(nobetDk + 5) },
    { id: 'nobetAzalt', etiket: 'Azalt', sec: () => nobet(nobetDk - 5) },
    {
      id: 'ses',
      etiket: 'Ses: ' + sesAdi,
      ipucu: sesler.length > 1 ? 'Çift dokununca sıradaki Türkçe sese geçer.' : 'Telefonda başka Türkçe ses yok. iPhone Ayarlar, Erişilebilirlik, Seslendirilen İçerik, Sesler bölümünden yenilerini indirebilirsin.',
      sec: () => {
        if (sesler.length < 2) {
          soyle('Telefonda başka Türkçe ses yok.', 'istek', true);
          return 'sessiz';
        }
        const i = sesler.findIndex((s) => s.kimlik === (secili && secili.kimlik));
        const yeni = sesler[(i + 1) % sesler.length];
        ayarDegistir({ sesKimligi: yeni.kimlik });
        setTimeout(() => soyle('Ses: ' + yeni.ad + (yeni.gelismis ? ', gelişmiş' : ''), 'istek', true), 60);
        return 'sessiz';
      },
    },
    {
      id: 'dene',
      etiket: 'Sesi dene',
      sec: () => {
        soyle('Rüzgâr kanyonun duvarlarında uğulduyor. Kopan modülün feneri hâlâ bipliyor.', 'istek', true);
        return 'sessiz';
      },
    },
    { id: 'geri', etiket: 'Ana menüye dön', sec: onGeri },
  ];

  return <SesliListe baslik="Ayarlar" rehberAcik onGeri={onGeri} ogeler={ogeler} />;
}
