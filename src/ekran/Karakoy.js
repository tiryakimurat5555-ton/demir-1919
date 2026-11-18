// Karaköy: yeni oyunun dikey diliminin ilk adımı. Sesle serbest dolaşma, gece-gündüz,
// kişilerin günlük rutinleri, kapılar ve iç mekânlar. Hikâye bir sonraki adımda eklenecek.
//
// Hareketler:
//   tek parmakla sürükleyip tut: yukarı ileri yürür, aşağı geri; sağa-sola döner (parmak ne kadar uzaksa o kadar hızlı)
//   dokun: çevrende ne var          çift dokun: kapıdan geç ya da yanındakiyle konuş
//   uzun bas: saat, yer, yön         iki parmakla dokun: sustur
//   iki parmakla çift dokun: duraklatma menüsü (bekle, ana menü)
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useJestler } from '../arayuz/jestler';
import SesliListe from '../arayuz/SesliListe';
import { soyle, sustur } from '../ses/rehber';
import { ortamCal } from '../ses/efektler';
import { RENK, UST_BOSLUK } from '../arayuz/tema';
import KonumsalSes from '../ses/konumsal';
import { MEKANLAR, SESLER } from '../oyun/karakoy/harita';
import { bekle, cevreMetni, durumMetni, etkiles, ilerle, kisiler, saatMetni, tramvayYeri, yeniDunya } from '../oyun/karakoy/dunya';

const ADIM_MS = 100;
const OLU_BOLGE = 16; // piksel
const TAM_GUC = 140; // bu kadar sürükleyince tam hız

const DOSYALAR = {
  kopek: require('../../assets/ses/konumsal/kopek.wav'),
  vapur: require('../../assets/ses/konumsal/vapur_duduk.wav'),
  can: require('../../assets/ses/konumsal/kilise_cani.wav'),
  tramvay: require('../../assets/ses/konumsal/tramvay.wav'),
};

const HAREKET_YARDIMI =
  'Parmağını ekrana koyup yukarı kaydır ve tut: ileri yürürsün. Aşağı: geri. Sağa ya da sola: dönersin. Parmak ne kadar uzaksa o kadar hızlı. Dokun: çevrende ne var. Çift dokun: kapıdan geç ya da yanındakiyle konuş. Uzun bas: saat ve yerin. İki parmakla dokun: sustur. İki parmakla çift dokun: menü.';

function guc(piksel) {
  const p = Math.abs(piksel);
  if (p < OLU_BOLGE) return 0;
  return Math.sign(piksel) * Math.min(1, (p - OLU_BOLGE) / (TAM_GUC - OLU_BOLGE));
}

function ortamOrani(d) {
  if (d.mekan !== 'dis') return 0.9;
  return d.gece ? 0.35 : 0.55;
}

export default function Karakoy({ onGeri }) {
  const motor = useRef(null);
  const dunya = useRef(yeniDunya());
  const surukle = useRef({ aktif: false, dx: 0, dy: 0 });
  const yuklu = useRef({});
  const calanlar = useRef({});
  const hazir = useRef(false);
  const durakli = useRef(false);
  const [menu, setMenu] = useState(false);
  const [yazi, setYazi] = useState('Karaköy yükleniyor');

  const m = () => motor.current;

  const sahneKur = () => {
    const s = m();
    if (!s) return;
    s.baslat();
    s.dinleyici(dunya.current.oyuncu);
    SESLER.deniz.forEach((n, i) => s.kaynak('deniz' + i, 'deniz', n));
    for (const ad of Object.keys(DOSYALAR)) s.yukle(ad, DOSYALAR[ad]);
    hazir.current = true;
    sesleriEsitle(true);
  };

  const kaynakAc = (id, tur, nokta) => {
    calanlar.current[id] = true;
    if (m()) m().kaynak(id, tur, nokta);
  };
  const kaynakKapat = (id) => {
    if (!calanlar.current[id]) return;
    delete calanlar.current[id];
    if (m()) m().sil(id);
  };

  // Benzetimdeki duruma göre sesleri kurar ya da kaldırır
  const sesleriEsitle = (ortamDa) => {
    const d = dunya.current;
    const s = m();
    if (!s || !hazir.current) return;
    s.dinleyici(d.oyuncu);
    const kisi = kisiler(d);
    for (const k of kisi) {
      const duyulur = k.yuruyor && (k.mekan === d.mekan || k.mekan === 'dis');
      if (duyulur) kaynakAc('ayak_' + k.id, 'ayak', k);
      else kaynakKapat('ayak_' + k.id);
    }
    for (const id of Object.keys(calanlar.current))
      if (id.startsWith('ayak_') && !kisi.some((k) => 'ayak_' + k.id === id)) kaynakKapat(id);
    const suleyman = kisi.find((k) => k.id === 'suleyman');
    if (suleyman && !suleyman.yuruyor && suleyman.mekan === 'dis') kaynakAc('cekic', 'cekic', SESLER.cekic);
    else kaynakKapat('cekic');
    const t = tramvayYeri(d.dakika);
    if (t && yuklu.current.tramvay) {
      if (!calanlar.current.tramvay) {
        calanlar.current.tramvay = true;
        s.dosyaKaynak('tramvay', 'tramvay', t, 4800);
      } else s.kaynak('tramvay', 'dosya', t);
    } else kaynakKapat('tramvay');
    if (ortamDa) {
      s.boguk(d.mekan !== 'dis');
      ortamCal(MEKANLAR[d.mekan].ortam, ortamOrani(d));
    }
  };

  const olaylariIsle = (olaylar) => {
    const d = dunya.current;
    for (const o of olaylar) {
      if (o.tur === 'adim') {
        if (m()) m().adim();
      } else if (o.tur === 'carpti') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
        if (o.neden === 'su') soyle('Rıhtımın kenarı. Önün deniz.', 'istek', true);
        else if (o.neden === 'sinir') soyle('Bu taraf bu denemede kapalı.', 'istek', true);
        else soyle('Duvar.', 'istek', true);
      } else if (o.tur === 'kapi') {
        Haptics.selectionAsync().catch(() => {});
        soyle(o.ad + ', saat ' + o.saat + ' yönünde. Çift dokun: geç.', 'istek', true);
      } else if (o.tur === 'kisi') {
        soyle(o.ad + ', saat ' + o.saat + ' yönünde. ' + o.eylem + '.', 'istek', true);
      } else if (o.tur === 'aksam') {
        soyle('Hava karardı. Rıhtımın fenerleri yanıyor.', 'istek', false);
        ortamCal(MEKANLAR[d.mekan].ortam, ortamOrani(d));
      } else if (o.tur === 'sabah') {
        soyle('Gün ağarıyor.', 'istek', false);
        ortamCal(MEKANLAR[d.mekan].ortam, ortamOrani(d));
      } else if (o.tur === 'saatBasi') {
        if (o.saat >= 7 && o.saat <= 21 && m() && yuklu.current.can) m().tek('can', SESLER.can, 0.9);
      } else if (o.tur === 'vapur') {
        if (m() && yuklu.current.vapur) m().tek('vapur', SESLER.vapur, 1);
      } else if (o.tur === 'yeniGun') {
        soyle('Gece yarısı. Yeni bir gün.', 'istek', false);
      }
    }
  };

  // Ana döngü
  useEffect(() => {
    let sayac = 0;
    const z = setInterval(() => {
      if (durakli.current) return;
      const d = dunya.current;
      const s = surukle.current;
      const girdi = s.aktif ? { ileri: guc(-s.dy), donus: guc(s.dx) } : {};
      const olaylar = ilerle(d, girdi, ADIM_MS / 1000);
      olaylariIsle(olaylar);
      if (m() && hazir.current) m().dinleyici(d.oyuncu);
      sayac++;
      if (sayac % 3 === 0) sesleriEsitle(false);
      if (d.gece && d.mekan === 'dis' && Math.random() < 0.0025 && m() && yuklu.current.kopek)
        m().tek('kopek', { x: SESLER.kopek.x - Math.random() * 30, y: SESLER.kopek.y }, 0.8);
      if (sayac % 10 === 0) setYazi('Saat ' + saatMetni(d.dakika) + ' · ' + (MEKANLAR[d.mekan].ad || 'Karaköy'));
    }, ADIM_MS);
    return () => clearInterval(z);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    ortamCal(MEKANLAR.dis.ortam, ortamOrani(dunya.current));
    soyle(
      'Karaköy. 4 Aralık 1918, Çarşamba, saat 15.00. Rıhtımdasın, doğuya bakıyorsun. Bu denemede hikâye yok; Karaköy\'ü kulağınla dolaş. Kulaklık tak. ' +
        HAREKET_YARDIMI,
      'istek',
      true,
    );
    return () => {
      if (m()) m().durdur();
      ortamCal(null);
      sustur();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const menuyuAc = () => {
    durakli.current = true;
    surukle.current = { aktif: false, dx: 0, dy: 0 };
    setMenu(true);
  };
  const menuyuKapat = () => {
    durakli.current = false;
    setMenu(false);
    soyle('Devam.', 'istek', true);
  };
  const beklet = (dakika) => {
    const d = dunya.current;
    const olaylar = bekle(d, dakika);
    durakli.current = false;
    setMenu(false);
    sesleriEsitle(true);
    const ek = [];
    if (olaylar.some((o) => o.tur === 'aksam')) ek.push('Bu arada hava karardı.');
    if (olaylar.some((o) => o.tur === 'sabah')) ek.push('Bu arada gün ağardı.');
    soyle('Bekledin. Saat ' + saatMetni(d.dakika) + '. ' + ek.join(' '), 'istek', true);
  };

  const jest = useJestler(
    {
      onSurukle: (mod, dx, dy) => {
        if (mod !== 'tek' || durakli.current) return;
        surukle.current = { aktif: true, dx, dy };
      },
      onSurukleBitti: () => {
        surukle.current = { aktif: false, dx: 0, dy: 0 };
      },
      onDokun: (parmak) => {
        if (parmak >= 2) {
          sustur();
          return;
        }
        soyle(cevreMetni(dunya.current), 'istek', true);
      },
      onCiftDokun: (parmak) => {
        if (parmak >= 2) {
          menuyuAc();
          return;
        }
        const d = dunya.current;
        const e = etkiles(d);
        if (e.tur === 'gecti') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
          sesleriEsitle(true);
          soyle(e.metin, 'istek', true);
        } else if (e.tur === 'konus') soyle(e.metin, 'istek', true);
        else soyle(e.metin, 'istek', true);
      },
      onUzunBas: () => soyle(durumMetni(dunya.current), 'istek', true),
    },
    { dokunmaBekle: true },
  );

  return (
    <View style={stiller.dis}>
      <View style={stiller.kap} {...(menu ? {} : jest)}>
        <KonumsalSes
          ref={motor}
          onMesaj={(x) => {
            if (x.tur === 'yuklendi') sahneKur();
            else if (x.tur === 'dosyaHazir') yuklu.current[x.ad] = true;
            else if (x.tur === 'hazir' && x.durum !== 'running') soyle('Ses motoru başlayamadı. Durum: ' + x.durum, 'istek', false);
            else if (x.tur === 'hata') soyle('Ses motorunda hata: ' + x.metin, 'istek', false);
          }}
        />
        <Text style={stiller.baslik}>Karaköy, Aralık 1918</Text>
        <Text style={stiller.yazi}>{yazi}</Text>
      </View>
      {menu ? (
        <View style={StyleSheet.absoluteFill}>
          <SesliListe
            baslik="Duraklatıldı"
            giris={'Duraklatıldı. Saat ' + saatMetni(dunya.current.dakika) + '.'}
            rehberAcik
            onGeri={menuyuKapat}
            ogeler={[
              { id: 'devam', etiket: 'Devam et', sec: menuyuKapat },
              { id: 'yarim', etiket: 'Yarım saat bekle', ipucu: 'Saati otuz dakika ilerletir.', sec: () => beklet(30) },
              { id: 'iki', etiket: 'İki saat bekle', ipucu: 'Saati iki saat ilerletir.', sec: () => beklet(120) },
              { id: 'alti', etiket: 'Altı saat bekle', ipucu: 'Geceyi ya da günü geçirmek için.', sec: () => beklet(360) },
              { id: 'yardim', etiket: 'Hareketler', ipucu: HAREKET_YARDIMI, sec: () => soyle(HAREKET_YARDIMI, 'istek', true) },
              { id: 'cik', etiket: 'Ana menüye dön', ipucu: 'Bu denemede kayıt yok; Karaköy baştan başlar.', sec: onGeri },
            ]}
          />
        </View>
      ) : null}
    </View>
  );
}

const stiller = StyleSheet.create({
  dis: { flex: 1, backgroundColor: RENK.zemin },
  kap: { flex: 1, backgroundColor: RENK.zemin, paddingTop: UST_BOSLUK, paddingHorizontal: 20 },
  baslik: { color: RENK.yazi, fontSize: 26, fontWeight: '700', marginBottom: 12 },
  yazi: { color: RENK.soluk, fontSize: 17 },
});
