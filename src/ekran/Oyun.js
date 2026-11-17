// Oyun ekranı: sahneler (anlatı), mekânlar, konuşmalar, soruşturma panosu ve defter.
// Bütün görünümler SesliListe ile kurulur: kaydır = gez, dokun = oku, çift dokun = seç,
// iki parmakla çift dokun = geri. Her durum değişikliği otomatik kaydedilir.
import React, { useEffect, useRef, useState } from 'react';
import SesliListe from '../arayuz/SesliListe';
import { cal, ortamCal } from '../ses/efektler';
import { soyle } from '../ses/rehber';
import * as M from '../oyun/motor';
import { kayitYaz } from '../oyun/kayit';

const birlestir = (parcalar) => parcalar.filter(Boolean).join(' ');

export default function Oyun({ bolum, baslangicDurumu, onAnaMenu, onDurum, onBolumGec }) {
  const [durum, setDurumIc] = useState(baslangicDurumu);
  // ekran: 'oyun' (durum.gorunum'a göre), 'pano', 'defter'
  const [ekran, setEkran] = useState('oyun');
  // Bir sonraki görünümün başında okunacak metin (inceleme sonucu, cevap, yeni delil)
  const [onEk, setOnEk] = useState('');
  const [sayac, setSayac] = useState(0);
  const [panoSecili, setPanoSecili] = useState(null);
  const okunanMekan = useRef(null);
  const mekanOdak = useRef({});

  // Ortam sesi: sahnenin kendi ortamı ya da bulunulan mekânınki
  const sahneVerisi = durum.gorunum.tur === 'sahne' ? bolum.sahneler[durum.gorunum.id] : null;
  const ortamAdi = (sahneVerisi && sahneVerisi.ortam) || 'ortam_' + durum.mekan;
  const ortamOran = sahneVerisi && sahneVerisi.ortamOran !== undefined ? sahneVerisi.ortamOran : 1;
  useEffect(() => {
    ortamCal(ortamAdi, ortamOran);
  }, [ortamAdi, ortamOran]);

  // Sahne efektleri (ör. düşen sandık, ardından savaş anısı) sahne açılınca sırayla çalar
  const sahneId = durum.gorunum.tur === 'sahne' ? durum.gorunum.id : null;
  useEffect(() => {
    if (!sahneId) return undefined;
    const efektler = (bolum.sahneler[sahneId] && bolum.sahneler[sahneId].efekt) || [];
    const zamanlar = efektler.map((ad, i) => setTimeout(() => cal(ad, 0.9), i * 1400));
    return () => zamanlar.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sahneId]);

  useEffect(() => {
    kayitYaz(durum);
    if (onDurum) onDurum(durum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durum]);

  const ilerle = (yeniDurum, ek = '', yeniDeliller = []) => {
    const delilMetni = yeniDeliller.length
      ? (yeniDeliller.length > 1 ? 'Yeni deliller: ' : 'Yeni delil: ') +
        yeniDeliller.map((id) => bolum.deliller[id].ad).join(', ') +
        '. Soruşturma panosuna eklendi.'
      : '';
    if (yeniDeliller.length) {
      cal('delil', 0.8);
      setTimeout(() => cal('secim'), 50);
    }
    if (yeniDurum.mekan !== durum.mekan) okunanMekan.current = null;
    setDurumIc(yeniDurum);
    setOnEk(birlestir([ek, delilMetni]));
    setEkran('oyun');
    setSayac((s) => s + 1);
  };

  const gorunumAc = (ad) => {
    setOnEk('');
    setEkran(ad);
    setSayac((s) => s + 1);
  };

  const anahtar = (ad) => ad + '-' + sayac;

  // -------------------------------------------------------------------------
  // Soruşturma panosu
  // -------------------------------------------------------------------------
  if (ekran === 'pano') {
    const cikarimlar = durum.cikarimlar.map((id) => bolum.cikarimlar[id]);
    const ogeler = [
      {
        id: 'cikarimlar',
        etiket: 'Çıkarımlar: ' + (cikarimlar.length || 'henüz yok'),
        sec: () => {
          setTimeout(
            () =>
              soyle(
                cikarimlar.length ? cikarimlar.map((c) => c.ad + '. ' + c.metin).join(' ') : 'Henüz bir çıkarım yapmadın.',
                'istek',
                true
              ),
            60
          );
          return 'sessiz';
        },
      },
      ...durum.deliller.map((id) => ({
        id,
        etiket: bolum.deliller[id].ad + (panoSecili === id ? ', seçili' : ''),
        ipucu: bolum.deliller[id].tarif,
        sec: () => {
          if (!panoSecili) {
            setPanoSecili(id);
            setTimeout(() => soyle(bolum.deliller[id].ad + ' seçildi. Şimdi bağlamak istediğin ikinci delili seç.', 'istek', true), 60);
            return 'sessiz';
          }
          const r = M.baglan(bolum, durum, panoSecili, id);
          setPanoSecili(null);
          if (!r.basarili) {
            cal('dip');
            setTimeout(() => soyle(r.metin, 'istek', true), 60);
            return 'sessiz';
          }
          cal('secim');
          const ek = 'Yeni çıkarım: ' + r.ad + '. ' + r.metin;
          if (r.durum.gorunum.tur === 'sahne') {
            ilerle(r.durum, ek);
          } else {
            setDurumIc(r.durum);
            setOnEk(ek);
            setSayac((s) => s + 1);
          }
          return 'sessiz';
        },
      })),
      ...(panoSecili
        ? [{ id: 'birak', etiket: 'Seçimi bırak', sec: () => { setPanoSecili(null); setTimeout(() => soyle('Seçim bırakıldı.', 'istek', true), 60); return 'sessiz'; } }]
        : []),
      { id: 'cik', etiket: 'Panodan çık', sec: () => gorunumAc('oyun') },
    ];
    const ilk = !durum.bayraklar.panoAnlatildi;
    return (
      <SesliListe
        key={anahtar('pano')}
        baslik="Soruşturma panosu"
        giris={birlestir([
          onEk,
          ilk
            ? 'Bulduğun deliller burada. Bir delili seç, sonra bağlamak istediğin ikinci delili seç. Doğru iki parça birleşirse yeni bir çıkarım yaparsın. Uzun basınca delilin ayrıntısı okunur.'
            : durum.deliller.length + ' delil, ' + durum.cikarimlar.length + ' çıkarım.',
        ])}
        rehberAcik
        ilkOdak={0}
        onGeri={() => gorunumAc('oyun')}
        ogeler={ogeler}
        onOdak={() => {
          if (ilk) setDurumIc((d) => ({ ...d, bayraklar: { ...d.bayraklar, panoAnlatildi: true } }));
        }}
      />
    );
  }

  // -------------------------------------------------------------------------
  // Defter: hedef ve günlük
  // -------------------------------------------------------------------------
  if (ekran === 'defter') {
    const gunluk = [...durum.gunluk].reverse().slice(0, 15);
    return (
      <SesliListe
        key={anahtar('defter')}
        baslik="Defter"
        rehberAcik
        onGeri={() => gorunumAc('oyun')}
        ogeler={[
          { id: 'hedef', etiket: 'Şimdi: ' + M.hedef(bolum, durum), ikincil: true },
          ...gunluk.map((g, i) => ({ id: 'g' + i, etiket: g, ikincil: true })),
          { id: 'geri', etiket: 'Defteri kapat', sec: () => gorunumAc('oyun') },
        ]}
      />
    );
  }

  const g = durum.gorunum;

  // -------------------------------------------------------------------------
  // Sahne (anlatı): önce seçenekler, ardından paragraflar (yeniden dinlemek için)
  // -------------------------------------------------------------------------
  if (g.tur === 'sahne') {
    const s = M.sahneBilgisi(bolum, durum);
    const ogeler = [
      ...s.secenekler.map((sec, i) => ({
        id: 's' + i,
        etiket: sec.etiket,
        sec: () => {
          if (sec.anaMenu) {
            onAnaMenu();
            return 'sessiz';
          }
          if (sec.sonrakiBolum && onBolumGec) {
            onBolumGec(sec.sonrakiBolum, durum);
            return 'sessiz';
          }
          const r = M.sahneSec(bolum, durum, sec);
          ilerle(r.durum, '', r.yeniDeliller);
          return 'sessiz';
        },
      })),
      ...s.paragraflar.map((p, i) => ({ id: 'p' + i, etiket: p, ikincil: true })),
    ];
    return (
      <SesliListe
        key={anahtar('sahne-' + g.id)}
        baslik={s.baslik}
        giris={birlestir([onEk, ...s.paragraflar])}
        rehberAcik
        ilkOdak={0}
        onGeri={null}
        ogeler={ogeler}
      />
    );
  }

  // -------------------------------------------------------------------------
  // Konuşma
  // -------------------------------------------------------------------------
  if (g.tur === 'konusma') {
    const k = M.dugumBilgisi(bolum, durum);
    const ogeler = k.secenekler.map((sec, i) => ({
      id: 'k' + i,
      etiket: sec.etiket,
      sec: () => {
        const r = M.secenekSec(bolum, durum, sec);
        ilerle(r.durum, birlestir(r.cevap), r.yeniDeliller);
        return 'sessiz';
      },
    }));
    return (
      <SesliListe
        key={anahtar('konusma-' + g.kisi + '-' + g.dugum)}
        baslik={k.kisiAd}
        giris={birlestir([onEk, ...k.soz])}
        rehberAcik
        ilkOdak={0}
        onGeri={() => ilerle({ ...durum, gorunum: { tur: 'mekan' } }, 'Konuşmayı bitirdin.')}
        ogeler={ogeler}
      />
    );
  }

  // -------------------------------------------------------------------------
  // Mekân
  // -------------------------------------------------------------------------
  const m = M.mekanBilgisi(bolum, durum);
  const ilkOkuma = okunanMekan.current !== m.id;
  okunanMekan.current = m.id;
  const ogeler = [
    {
      id: 'bak',
      etiket: 'Çevrene bak',
      sec: () => {
        setTimeout(() => soyle(m.tarif, 'istek', true), 60);
        return 'sessiz';
      },
    },
    ...m.nesneler.map((o) => ({
      id: 'n-' + o.id,
      etiket: o.etiket,
      ipucu: 'İncele',
      sec: () => {
        const r = M.incele(bolum, durum, o.id);
        ilerle(r.durum, birlestir(r.metin), r.yeniDeliller);
        return 'sessiz';
      },
    })),
    ...m.kisiler.map((id) => ({
      id: 'k-' + id,
      etiket: 'Konuş: ' + M.deger(bolum.kisiler[id].ad, durum),
      sec: () => {
        ilerle(M.konusmaBaslat(bolum, durum, id));
        return 'sessiz';
      },
    })),
    ...m.gecisler.map((gc) => ({
      id: 'g-' + gc.hedef,
      etiket: gc.etiket,
      sec: () => {
        ilerle(M.mekanaGir(bolum, durum, gc.hedef));
        return 'sessiz';
      },
    })),
    {
      id: 'pano',
      etiket: 'Soruşturma panosu: ' + durum.deliller.length + ' delil',
      sec: () => {
        setPanoSecili(null);
        gorunumAc('pano');
        return 'sessiz';
      },
    },
    { id: 'defter', etiket: 'Defter', ipucu: 'Şu anki hedefin ve olanlar.', sec: () => { gorunumAc('defter'); return 'sessiz'; } },
    { id: 'menu', etiket: 'Ana menü', ipucu: 'Oyun kendiliğinden kaydedilir.', sec: () => { onAnaMenu(); return 'sessiz'; } },
  ];
  const sonOdak = mekanOdak.current[m.id] || 0;
  return (
    <SesliListe
      key={anahtar('mekan-' + m.id)}
      baslik={m.ad}
      giris={birlestir([onEk, ilkOkuma ? m.tarif : ''])}
      rehberAcik
      ilkOdak={ilkOkuma ? 0 : Math.min(sonOdak, ogeler.length - 1)}
      onOdak={(i) => {
        mekanOdak.current[m.id] = i;
      }}
      onGeri={onAnaMenu}
      ogeler={ogeler}
    />
  );
}
