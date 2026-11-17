// Ayarlar: konuşma hızı ve Türkçe ses seçimi. Değişiklikler hemen uygulanır ve kaydedilir.
import React from 'react';
import SesliListe from '../arayuz/SesliListe';
import { soyle, turkceSesListesi } from '../ses/rehber';

const EN_AZ = 0.6;
const EN_COK = 2.0;
const ADIM = 0.1;

const yuzde = (h) => 'yüzde ' + Math.round(h * 100);

export default function Ayarlar({ ayarlar, ayarDegistir, onGeri }) {
  const sesler = turkceSesListesi();
  const secili = sesler.find((s) => s.kimlik === ayarlar.sesKimligi) || sesler[0];
  const sesAdi = secili ? secili.ad + (secili.gelismis ? ', gelişmiş' : '') : 'telefonun varsayılan sesi';

  const hiz = (yeni) => {
    const h = Math.round(Math.max(EN_AZ, Math.min(EN_COK, yeni)) * 10) / 10;
    ayarDegistir({ konusmaHizi: h });
    // Yeni hız hemen duyulsun diye değer yeni hızla okunur
    setTimeout(() => soyle(h === ayarlar.konusmaHizi ? (h >= EN_COK ? 'En hızlı: ' : 'En yavaş: ') + yuzde(h) : yuzde(h), 'istek', true), 60);
    return 'sessiz';
  };

  const ogeler = [
    {
      id: 'hiz',
      etiket: 'Konuşma hızı: ' + yuzde(ayarlar.konusmaHizi),
      ipucu: 'Alttaki Artır ve Azalt ile değiştir.',
    },
    { id: 'artir', etiket: 'Artır', sec: () => hiz(ayarlar.konusmaHizi + ADIM) },
    { id: 'azalt', etiket: 'Azalt', sec: () => hiz(ayarlar.konusmaHizi - ADIM) },
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
        soyle('Sis hâlâ kalkmadı. Leventis vapurunun kara gövdesi rıhtımın yanında yükselip alçalıyor.', 'istek', true);
        return 'sessiz';
      },
    },
    { id: 'geri', etiket: 'Ana menüye dön', sec: onGeri },
  ];

  return <SesliListe baslik="Ayarlar" rehberAcik onGeri={onGeri} ogeler={ogeler} />;
}
