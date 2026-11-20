// Aethelis-IV yüzeyi: sesle serbest dolaşma, radar, kaynak toplama, kapsülün içi, kişilerle konuşma,
// birinci görev "Sinyal Arayışı" (Gözcü Tepesi'nde frekans ayarı), ikinci görev "Jeotermal Sondaj"
// (Manyetik Sırtlar, kükürt maruziyeti, gaz bacalarında valf dengeleme), üçüncü görev "Antik Kseno-Laboratuvar
// Kazısı" (Kadim Krater'in çanları, rezonatörle kapı dizisi, görünmez yerçekimi alanları) ve telsiz bildirimleri.
//
// Hareketler (yüzeyde):
//   tek parmakla sürükleyip tut: yukarı ileri, aşağı geri; sağa-sola döner (parmak ne kadar uzaksa o kadar hızlı)
//   dokun: çevrende ne var            çift dokun: yanındakini kullan, kapıdan geç ya da konuş
//   uzun bas: radar (yankılar nesnelerin yönünden döner)
//   iki parmakla dokun: sustur        iki parmakla çift dokun: menü
// Telsiz çağrısı gelince: çift dokun dinle, iki parmakla aşağı kaydır ertele.
// Valf dengelemede: alarm çalınca çift dokun; dokun basıncı söyler; iki parmakla çift dokun çekil.
// Rezonansta: yukarı-aşağı kaydır nota seç (seçilen nota çalar); çift dokun notayı kapıya çal;
//   dokun: kapının dizisini yeniden dinle; iki parmakla çift dokun: kapıdan çekil.
// Frekans ayarında: yukarı-aşağı sürükle ya da iki parmakla çevir: kanal; sağa-sola hızlı kaydır: ince ayar;
//   dokun: kanalı söyler; iki parmakla çift dokun: ayardan çık.
// Menülerde (SesliListe): sağa-sola kaydır gez, çift dokun seç, iki parmakla çift dokun geri.
import React, { useEffect, useRef, useState } from 'react';
import { AppState, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useJestler } from '../arayuz/jestler';
import SesliListe from '../arayuz/SesliListe';
import { soyle, sustur } from '../ses/rehber';
import { cal, ortamCal } from '../ses/efektler';
import { RENK, UST_BOSLUK } from '../arayuz/tema';
import KonumsalSes from '../ses/konumsal';
import { ALANLAR, KAPILAR, MEKANLAR, NOKTALAR } from '../oyun/yuzey/harita';
import { cevreMetni, durumMetni, esyaMetni, etkiles, ilerle, kisiAdi, otoBaslat, radar, yerlerListesi, zehirIlerle } from '../oyun/yuzey/dunya';
import {
  ESYALAR,
  HAREKET_KISA,
  SAHNELER,
  ayarBaslat,
  ayarDegis,
  ayarIlerle,
  ayarMetni,
  ayarYakinlik,
  eylemUygula,
  gorevIpucu,
  insaEt,
  insaListesi,
  koloniMetni,
  konusma,
  noktaEylemleri,
  sahneMetni,
  sahneSec,
  sahneSecenekleri,
  valfBaslat,
  valfBirak,
  valfIlerle,
  valfMetni,
  bildirimIlerle,
  NOTALAR,
  kapiDizisi,
  rezonansBaslat,
  rezonansCal,
  rezonansSecimDegis,
} from '../oyun/yuzey/gorevler';
import { HAMMADDELER, HAMMADDE_SIRASI } from '../oyun/veri/tesisler';
import { NITELIKLER } from '../oyun/veri/murettebat';
import { otoYaz, tarihMetni, yuvalariOku, yuvayaYaz } from '../oyun/kayit';

const ADIM_MS = 100;
const OLU_BOLGE = 16;
const TAM_GUC = 140;
const KAYIT_ARALIGI = 100; // adım (10 sn)

const DOSYALAR = {
  adim_tas_1: require('../../assets/ses/konumsal/adim_tas_1.wav'),
  adim_tas_2: require('../../assets/ses/konumsal/adim_tas_2.wav'),
  adim_tas_3: require('../../assets/ses/konumsal/adim_tas_3.wav'),
  adim_tas_4: require('../../assets/ses/konumsal/adim_tas_4.wav'),
  adim_tas_5: require('../../assets/ses/konumsal/adim_tas_5.wav'),
  adim_tas_6: require('../../assets/ses/konumsal/adim_tas_6.wav'),
  adim_tas_7: require('../../assets/ses/konumsal/adim_tas_7.wav'),
  adim_tas_8: require('../../assets/ses/konumsal/adim_tas_8.wav'),
  bip: require('../../assets/ses/konumsal/bip.wav'),
  jenerator: require('../../assets/ses/konumsal/jenerator_ugultu.wav'),
  parazit: require('../../assets/ses/konumsal/parazit.wav'),
  sonar: require('../../assets/ses/konumsal/sonar.wav'),
  baca: require('../../assets/ses/konumsal/baca.wav'),
};

// Eylem sesleri: gorev1.js'teki ses adlarını çalınacak efekte çevirir
const EYLEM_SESI = { bip: 'bip', red: 'red', tislama: 'tislama', jenerator: 'jenerator', kes: 'tislama', kur: 'kapi', topla: 'dugme', kristal: 'dugme', sonda: 'sonda' };
const BACALAR = ['baca_1', 'baca_2', 'baca_3'];
const CANLAR = ['can_1', 'can_2', 'can_3', 'can_4', 'can_5'];
const KRISTALLER = ['kristal_1', 'kristal_2', 'kristal_3', 'kristal_4'];
const NOTA_ARASI = 750; // kapının dizisindeki notalar arası (ms)

function guc(piksel) {
  const p = Math.abs(piksel);
  if (p < OLU_BOLGE) return 0;
  return Math.sign(piksel) * Math.min(1, (p - OLU_BOLGE) / (TAM_GUC - OLU_BOLGE));
}

function ortamOrani(d) {
  const mk = MEKANLAR[d.mekan];
  if (mk.ortamOran != null) return mk.ortamOran;
  if (d.mekan === 'sirtlar') return 0.8;
  if (d.mekan !== 'vadi') return 0.75;
  return d.oyuncu.y > 38 ? 0.95 : 0.6;
}

export default function Yuzey({ onGeri, baslangic, yeniOyunUret }) {
  const motor = useRef(null);
  const dunya = useRef(baslangic || yeniOyunUret());
  const surukle = useRef({ aktif: false, dx: 0, dy: 0, sonDy: 0 });
  const yuklu = useRef({});
  const calanlar = useRef({});
  const hazir = useRef(false);
  const durakli = useRef(false);
  const katmanNo = useRef(0);
  const [katman, setKatman] = useState(null);
  const [ayarAcik, setAyarAcik] = useState(false);
  const [valfAcik, setValfAcik] = useState(false);
  const [rezAcik, setRezAcik] = useState(false);
  const melodiNo = useRef(0);
  const [yazi, setYazi] = useState('Yükleniyor');

  const m = () => motor.current;
  const kaydet = () => otoYaz(dunya.current);

  // --- Ses sahnesi ---
  const sahneKur = () => {
    const s = m();
    if (!s) return;
    s.baslat();
    for (const ad of Object.keys(DOSYALAR)) s.yukle(ad, DOSYALAR[ad]);
    hazir.current = true;
    sesleriEsitle(true);
  };

  const kaynakKapat = (id) => {
    if (!calanlar.current[id]) return;
    delete calanlar.current[id];
    if (m()) m().sil(id);
  };

  // Benzetimdeki duruma göre konumlu sesleri kurar ya da kaldırır
  const sesleriEsitle = (ortamDa) => {
    const d = dunya.current;
    const s = m();
    if (!s || !hazir.current) return;
    const mk = MEKANLAR[d.mekan];
    // Kapsülün içindeyken vadinin sesleri gövdenin ardından, kapsülün yerinden duyulur
    s.dinleyici(kulakYeri(d));
    const g = d.bayrak;
    // Kopan modülün acil durum feneri
    if (yuklu.current.bip && !calanlar.current.fener) {
      calanlar.current.fener = true;
      s.dosyaKaynak('fener', 'bip', NOKTALAR.enkaz, 2000);
    }
    // Jeneratör uğultusu
    if (g.jenerator && yuklu.current.jenerator) {
      calanlar.current.jenerator = true;
      s.dongu('jenerator', 'jenerator', NOKTALAR.jenerator, 0.9);
    } else kaynakKapat('jenerator');
    // Kristal kümeleri rüzgârda çınlar
    for (const id of KRISTALLER) {
      if ((d.stok[id] || 0) > 0 && NOKTALAR[id].mekan === kulakMekani(d)) {
        if (!calanlar.current[id]) {
          calanlar.current[id] = true;
          s.kaynak(id, 'kristal', NOKTALAR[id]);
        }
      } else kaynakKapat(id);
    }
    // Gaz bacaları (yalnız sırtlardayken): dengede olanlar daha sakin
    for (const id of BACALAR) {
      if (d.mekan === 'sirtlar' && yuklu.current.baca) {
        calanlar.current[id] = true;
        s.dongu(id, 'baca', NOKTALAR[id], g['baca_' + id] ? 0.35 : 1);
      } else kaynakKapat(id);
    }
    // Kraterin çanları: her biri kendi notasıyla, seyrek ve kısık çınlar
    for (const id of CANLAR) {
      if (d.mekan === 'krater') {
        if (!calanlar.current[id]) {
          calanlar.current[id] = true;
          s.kaynak(id, 'can', NOKTALAR[id], null, NOTALAR[NOKTALAR[id].can].frek);
        }
      } else kaynakKapat(id);
    }
    // Salondaki görünmez yerçekimi alanları: ağır, nabız atan uğultu
    ALANLAR.forEach((a, i) => {
      const id = 'alan_' + i;
      if (d.mekan === a.mekan) {
        if (!calanlar.current[id]) {
          calanlar.current[id] = true;
          s.kaynak(id, 'yercekimi', a);
        }
      } else kaynakKapat(id);
    });
    if (ortamDa) {
      s.boguk(d.mekan === 'kapsul');
      ortamCal(mk.ortam, ortamOrani(d));
    }
  };

  // Kapalı mekânda (kapsül) dinleyici dışarıdaki konumda; o mekânın kaynaklarını duyar
  // Kapsülün içindeyken dinleyici kapsülün vadideki yerinde (sesler gövdenin ardından); öteki iç mekânlarda (salon, mabet)
  // dinleyici oyuncunun kendisi.
  const kulakMekani = (d) => (d.mekan === 'kapsul' ? 'vadi' : d.mekan);
  const kulakYeri = (d) => {
    const mk = MEKANLAR[d.mekan];
    return d.mekan === 'kapsul' ? { x: mk.disariKonum.x, y: mk.disariKonum.y, yon: d.oyuncu.yon } : d.oyuncu;
  };

  const olaylariIsle = (olaylar, sessizMi = false) => {
    const d = dunya.current;
    const sozler = [];
    for (const o of olaylar) {
      if (o.tur === 'tik') cal('tik', o.guc);
      else if (o.tur === 'adim') {
        if (m()) m().adim(o.zemin || 'tas', 0.45);
      } else if (o.tur === 'carpti') {
        Haptics.impactAsync(o.alan ? Haptics.ImpactFeedbackStyle.Heavy : Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
        sozler.push(o.metin);
      } else if (o.tur === 'yakin') {
        Haptics.selectionAsync().catch(() => {});
        sozler.push(o.metin);
      } else if (o.tur === 'otoVardi') {
        Haptics.selectionAsync().catch(() => {});
        sozler.push('Vardın: ' + o.ad + '. Çift dokun.');
      } else if (o.tur === 'otoKapi') {
        cal('tislama', 0.8);
        sesleriEsitle(true);
        sozler.push(o.metin);
      } else if (o.tur === 'otoTakildi') sozler.push('Yol kapandı; durdun.');
      else if (o.tur === 'otoIptal') sozler.push('Durdun.');
    }
    if (sozler.length && !sessizMi) soyle(sozler.join(' '), 'istek', true);
    return sozler.join(' ');
  };

  // --- Ana döngü ---
  useEffect(() => {
    let sayac = 0;
    const z = setInterval(() => {
      const d = dunya.current;
      sayac++;
      if (d.ayar) {
        frekansAdimi();
        return;
      }
      if (d.valf) {
        valfAdimi();
        return;
      }
      if (d.rezonans) return;
      if (durakli.current) return;
      if (sayac % 10 === 0) bildirimKontrol();
      const s = surukle.current;
      const girdi = s.aktif ? { ileri: guc(-s.dy), donus: guc(s.dx) } : {};
      olaylariIsle(ilerle(d, girdi, ADIM_MS / 1000));
      if (d.sahne) {
        sesleriEsitle(true);
        sahneGoster(d.sahne);
        return;
      }
      if (m() && hazir.current) {
        m().dinleyici(kulakYeri(d));
      }
      if (sayac % 5 === 0) sesleriEsitle(false);
      if (sayac % 10 === 0 && d.mekan === 'vadi') ortamCal(MEKANLAR.vadi.ortam, ortamOrani(d));
      if (sayac % KAYIT_ARALIGI === 0) kaydet();
      if (sayac % 10 === 0) setYazi(MEKANLAR[d.mekan].ad + ' · ' + d.koloni.binalar.length + ' tesis');
    }, ADIM_MS);
    return () => clearInterval(z);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Açılış, çıkışta ve arka plana atılınca otomatik kayıt
  useEffect(() => {
    const d = dunya.current;
    ortamCal(MEKANLAR[d.mekan].ortam, ortamOrani(d));
    if (d.ayar) d.ayar = null;
    if (d.valf) d.valf = null;
    if (d.rezonans) d.rezonans = null;
    if (d.sahne) sahneGoster(d.sahne);
    else if (baslangic) soyle('Sistemler devrede. Kaldığın yerden: ' + durumMetni(d) + ' Menü için iki parmakla çift dokun.', 'istek', true);
    const abone = AppState.addEventListener('change', (durum) => {
      if (durum !== 'active') kaydet();
    });
    return () => {
      abone.remove();
      kaydet();
      if (m()) m().durdur();
      ortamCal(null);
      sustur();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Katmanlar ---
  const katmanAc = (k) => {
    durakli.current = true;
    surukle.current = { aktif: false, dx: 0, dy: 0, sonDy: 0 };
    katmanNo.current += 1;
    setKatman({ ...k, no: katmanNo.current });
  };
  const katmanKapat = (soz) => {
    const d = dunya.current;
    if (d.sahne) {
      sahneGoster(d.sahne, soz);
      return;
    }
    durakli.current = false;
    setKatman(null);
    sesleriEsitle(true);
    if (soz) soyle(soz, 'istek', true);
  };

  const sahneGoster = (id, onEk) => {
    const d = dunya.current;
    const sahne = SAHNELER[id];
    if (!sahne) {
      d.sahne = null;
      katmanKapat(onEk);
      return;
    }
    d.sahne = id;
    if (sahne.ortam) ortamCal(sahne.ortam, 0.8);
    if (sahne.efekt) sahne.efekt.forEach((e, i) => setTimeout(() => cal(e, 1), i * 400));
    katmanAc({
      baslik: sahne.baslik,
      giris: [onEk, ...sahneMetni(d, id)].filter(Boolean).join(' '),
      onGeri: null,
      ogeler: sahneSecenekleri(d, id).map((x, i) => ({
        id: 's' + i,
        etiket: x.etiket,
        sec: () => {
          const sonraki = sahneSec(d, id, i);
          kaydet();
          if (sonraki) sahneGoster(sonraki);
          else katmanKapat(sahne.bitisSozu || null);
          return 'sessiz';
        },
      })),
    });
  };

  const noktaGoster = (id, onEk) => {
    const d = dunya.current;
    const n = NOKTALAR[id];
    const eylemler = noktaEylemleri(d, id);
    katmanAc({
      baslik: n.ad,
      giris: onEk || (n.tarif || n.ad) + (n.kaynak ? ' ' + HAMMADDELER[n.kaynak].tarif : ''),
      onGeri: () => katmanKapat(),
      ogeler: [
        ...eylemler.map((e) => ({
          id: e.id,
          etiket: e.etiket,
          ipucu: e.ipucu,
          sec: () => {
            const r = eylemUygula(d, id, e.id);
            kaydet();
            if (r.ses && EYLEM_SESI[r.ses]) cal(EYLEM_SESI[r.ses], 0.9);
            if (r.nota != null && m()) m().nota(NOTALAR[r.nota].frek, NOKTALAR[id], 0.9, 4);
            if (r.ayar) {
              katmanKapatSessiz();
              frekansAc();
              return 'sessiz';
            }
            if (r.valf) {
              katmanKapatSessiz();
              valfAc(id);
              return 'sessiz';
            }
            if (r.insa) return insaGoster(), 'sessiz';
            if (r.kaydet) return kayitGoster(), 'sessiz';
            sesleriEsitle(false);
            noktaGoster(id, r.metin);
            return 'sessiz';
          },
        })),
        { id: 'geri', etiket: 'Geri dön', sec: () => (katmanKapat(), 'sessiz') },
      ],
    });
  };

  const katmanKapatSessiz = () => {
    setKatman(null);
  };

  const konusmaGoster = (kisiId, onEk) => {
    const d = dunya.current;
    const k = konusma(d, kisiId);
    const ad = kisiAdi(d, kisiId);
    katmanAc({
      baslik: ad,
      giris: [onEk, onEk ? null : ad + ': ' + k.metin].filter(Boolean).join(' '),
      onGeri: () => katmanKapat('Konuşmayı bitirdin.'),
      ogeler: k.secenekler.map((s, i) => ({
        id: 'k' + i,
        etiket: s.etiket,
        sec: () => {
          const cevap = s.cevap(d);
          if (cevap) konusmaGoster(kisiId, ad + ': ' + cevap);
          else katmanKapat('Konuşmayı bitirdin.');
          return 'sessiz';
        },
      })),
    });
  };

  // --- Terminal: inşa ve elle kayıt ---
  const insaGoster = (onEk) => {
    const d = dunya.current;
    const liste = insaListesi(d);
    katmanAc({
      baslik: 'İnşa',
      giris: (onEk ? onEk + ' ' : '') + 'Koloni tesisleri. Birini seç; kurulabiliyorsa inşa başlar.',
      onGeri: () => noktaGoster('terminal'),
      ogeler: [
        ...liste.map((t) => ({
          id: t.id,
          etiket: t.ad + '. ' + t.durum,
          ipucu: t.tarif,
          sec: () => {
            if (t.kurulu || !t.acik) {
              soyle(t.ad + '. ' + t.durum, 'istek', true);
              return 'sessiz';
            }
            const r = insaEt(d, t.id);
            kaydet();
            if (r.ses) cal(EYLEM_SESI[r.ses] || r.ses, 0.9);
            if (d.sahne) {
              katmanKapatSessiz();
              sahneGoster(d.sahne);
            } else insaGoster(r.metin);
            return 'sessiz';
          },
        })),
        { id: 'geri', etiket: 'Terminale dön', sec: () => (noktaGoster('terminal'), 'sessiz') },
      ],
    });
  };

  const kayitGoster = async (onEk) => {
    const yuvalar = await yuvalariOku();
    katmanAc({
      baslik: 'Elle kayıt',
      giris: (onEk ? onEk + ' ' : '') + 'Bir yuva seç; oyun oraya kaydedilir. Doluysa üstüne yazılır.',
      onGeri: () => noktaGoster('terminal'),
      ogeler: [
        ...yuvalar.map((y) => ({
          id: 'y' + y.no,
          etiket: 'Yuva ' + y.no + (y.d ? ': ' + tarihMetni(y.tarih) : ': boş'),
          sec: () => {
            yuvayaYaz(y.no, dunya.current).then((oldu) => kayitGoster(oldu ? 'Yuva ' + y.no + '\'e kaydedildi.' : 'Kaydedilemedi.'));
            cal('bip', 0.8);
            return 'sessiz';
          },
        })),
        { id: 'geri', etiket: 'Terminale dön', sec: () => (noktaGoster('terminal'), 'sessiz') },
      ],
    });
  };

  // --- Menü ---
  const yerlerGoster = () => {
    const d = dunya.current;
    const liste = yerlerListesi(d);
    katmanAc({
      baslik: 'Yerler',
      giris: 'Bildiğin yerler ve kişiler. Birini seç; oraya kendin yürürsün. Yolda ekrana dokunursan durursun. Yeni yerleri radarla bulursun.',
      onGeri: () => menuyuAc(),
      ogeler: [
        ...liste.map((y) => ({
          id: y.tur + y.id,
          etiket: y.ad + (y.uzaklik != null ? ', ' + y.uzaklik + ' metre' : ''),
          ipucu: y.mekan !== d.mekan ? 'Hava kilidinden geçerek gidersin.' : '',
          sec: () => {
            const r = otoBaslat(d, y);
            katmanKapat(r.metin);
            return 'sessiz';
          },
        })),
        { id: 'geri', etiket: 'Menüye dön', sec: () => (menuyuAc(), 'sessiz') },
      ],
    });
  };

  const tasinanMetni = () => {
    const d = dunya.current;
    const esya = d.envanter.length ? [esyaMetni(d)] : [];
    const k = d.koloni.kaynaklar;
    const ham = HAMMADDE_SIRASI.filter((x) => k[x] > 0).map((x) => k[x] + ' ' + HAMMADDELER[x].ad);
    return 'Taşıdığın: ' + (esya.length ? esya.join(', ') : 'hiçbir şey') + '. Hammadde: ' + (ham.length ? ham.join(', ') : 'yok') + '.';
  };

  const murettebatGoster = () => {
    const d = dunya.current;
    katmanAc({
      baslik: 'Mürettebat',
      giris: d.murettebat.length + ' öncü kapsülden sağ çıktı.',
      onGeri: () => menuyuAc(),
      ogeler: [
        ...d.murettebat.map((u) => ({
          id: u.id,
          etiket: u.rol + ' ' + u.ad,
          ipucu: NITELIKLER[u.nitelik].ad + ': ' + NITELIKLER[u.nitelik].tarif,
          sec: () => (soyle(u.rol + ' ' + u.ad + '. ' + NITELIKLER[u.nitelik].ad + '. ' + NITELIKLER[u.nitelik].tarif, 'istek', true), 'sessiz'),
        })),
        { id: 'geri', etiket: 'Menüye dön', sec: () => (menuyuAc(), 'sessiz') },
      ],
    });
  };

  const haritaMetni = () => {
    const d = dunya.current;
    if (!d.harita.poiler.length) return 'Uzay haritası boş. Yörüngeyle bağlantı yok.';
    const satirlar = [];
    if (d.harita.poiler.includes('sektor15')) satirlar.push('Sektör 15, gaz bulutunun içindeki asteroit üssü. Prometheus adlı bir acil durum çağrısı.');
    if (d.harita.poiler.includes('moloz_kusagi')) satirlar.push('Moloz Kuşağı: kadim yıldız haritasının gösterdiği, gezegenin yörüngesindeki enkaz halkası.');
    return 'Uzay haritası. ' + satirlar.join(' ') + ' Oralara gitmek için bir gemi gerekir; tersane henüz yok.';
  };

  const menuyuAc = () => {
    katmanAc({
      baslik: 'Menü',
      giris: null,
      onGeri: () => katmanKapat('Devam.'),
      ogeler: [
        { id: 'devam', etiket: 'Devam et', sec: () => (katmanKapat('Devam.'), 'sessiz') },
        { id: 'gorev', etiket: 'Görev', ipucu: 'Şu an ne yapabileceğini söyler.', sec: () => (soyle(gorevIpucu(dunya.current), 'istek', true), 'sessiz') },
        { id: 'yerler', etiket: 'Yerler', ipucu: 'Bir yer ya da kişi seç; oraya kendin yürürsün.', sec: () => (yerlerGoster(), 'sessiz') },
        { id: 'durum', etiket: 'Neredeyim', sec: () => (soyle(durumMetni(dunya.current), 'istek', true), 'sessiz') },
        { id: 'tasinan', etiket: 'Taşıdıkların ve hammadde', sec: () => (soyle(tasinanMetni(), 'istek', true), 'sessiz') },
        { id: 'koloni', etiket: 'Koloni', sec: () => (soyle(koloniMetni(dunya.current), 'istek', true), 'sessiz') },
        { id: 'murettebat', etiket: 'Mürettebat', sec: () => (murettebatGoster(), 'sessiz') },
        { id: 'harita', etiket: 'Uzay haritası', sec: () => (soyle(haritaMetni(), 'istek', true), 'sessiz') },
        { id: 'kodeks', etiket: 'Kodeks', ipucu: 'Kaydettiğin buluntular.', sec: () => (kodeksGoster(), 'sessiz') },
        { id: 'telsiz', etiket: 'Telsiz kayıtları', ipucu: 'Dinlediğin ve ertelediğin telsiz çağrıları.', sec: () => (telsizGoster(), 'sessiz') },
        { id: 'hareket', etiket: 'Hareketler', sec: () => (soyle(HAREKET_KISA, 'istek', true), 'sessiz') },
        {
          id: 'cik',
          etiket: 'Ana menüye dön',
          ipucu: 'Oyun kendiliğinden kaydedilir; Devam et ile kaldığın yerden sürersin.',
          sec: () => (kaydet(), onGeri(), 'sessiz'),
        },
      ],
    });
  };

  const kodeksGoster = () => {
    const d = dunya.current;
    katmanAc({
      baslik: 'Kodeks',
      giris: d.kodeks.length ? d.kodeks.length + ' kayıt.' : 'Kodeks boş. Kadim buluntular buraya yazılır.',
      onGeri: () => menuyuAc(),
      ogeler: [
        ...d.kodeks.map((x) => ({ id: x.id, etiket: x.ad, sec: () => (soyle(x.ad + '. ' + x.tarif, 'istek', true), 'sessiz') })),
        { id: 'geri', etiket: 'Menüye dön', sec: () => (menuyuAc(), 'sessiz') },
      ],
    });
  };

  // --- Telsiz bildirimleri ---
  const bildirimKontrol = () => {
    const d = dunya.current;
    const yeni = bildirimIlerle(d);
    if (!yeni.length) return;
    cal('telsiz_zil', 0.9);
    Haptics.selectionAsync().catch(() => {});
    setTimeout(() => soyle('Telsiz çağrısı: ' + yeni[0].kim + '. Dinlemek için çift dokun; ertelemek için iki parmakla aşağı kaydır.', 'istek', true), 700);
  };
  const bildirimDinle = () => {
    const d = dunya.current;
    const x = d.bildirimler.shift();
    if (!x) return false;
    d.duyulanBildirimler.push(x.id);
    if (!d.telsizKayitlari) d.telsizKayitlari = [];
    d.telsizKayitlari.push({ kim: x.kim, metin: x.metin });
    cal('tislama', 0.3);
    soyle(x.kim + ': ' + x.metin, 'istek', true);
    kaydet();
    return true;
  };
  const bildirimErtele = () => {
    const d = dunya.current;
    const x = (d.bildirimler || []).shift();
    if (!x) return false;
    d.duyulanBildirimler.push(x.id);
    if (!d.telsizKayitlari) d.telsizKayitlari = [];
    d.telsizKayitlari.push({ kim: x.kim, metin: x.metin, ertelendi: true });
    cal('dugme', 0.6);
    soyle('Arşive alındı. Menüdeki telsiz kayıtlarından dinleyebilirsin.', 'istek', true);
    kaydet();
    return true;
  };
  const telsizGoster = () => {
    const d = dunya.current;
    const liste = (d.telsizKayitlari || []).slice().reverse();
    katmanAc({
      baslik: 'Telsiz kayıtları',
      giris: liste.length ? liste.length + ' kayıt; en yenisi başta.' : 'Henüz telsiz kaydı yok.',
      onGeri: () => menuyuAc(),
      ogeler: [
        ...liste.map((x, i) => ({
          id: 't' + i,
          etiket: x.kim + (x.ertelendi ? ', ertelendi' : ''),
          sec: () => (soyle(x.kim + ': ' + x.metin, 'istek', true), 'sessiz'),
        })),
        { id: 'geri', etiket: 'Menüye dön', sec: () => (menuyuAc(), 'sessiz') },
      ],
    });
  };

  // --- Valf dengeleme (gaz bacası) ---
  const valfAc = (id) => {
    const d = dunya.current;
    durakli.current = true;
    const r = valfBaslat(d, id);
    if (m()) m().basincKur();
    ortamCal(MEKANLAR.sirtlar.ortam, 0.4);
    setValfAcik(true);
    soyle(
      'Valf dengeleme. Basınç yükseldikçe gazın tıslaması tizleşip güçlenir. Kesik bir alarm başlayınca çift dokun: valfi açarsın. Erken açarsan basınç boşa gider; geç kalırsan baca patlar. Üç tahliye gerekir; şu ana dek ' +
        r.basari +
        '. Dokun: basıncı söylerim. İki parmakla çift dokun: valften çekil.',
      'istek',
      true,
    );
  };

  const valfKapat = (soz) => {
    if (m()) m().basincSil();
    dunya.current.valf = null;
    setValfAcik(false);
    durakli.current = false;
    sesleriEsitle(true);
    if (soz) soyle(soz, 'istek', true);
  };

  const valfAdimi = () => {
    const d = dunya.current;
    const olaylar = valfIlerle(d, ADIM_MS / 1000);
    const z = [];
    zehirIlerle(d, ADIM_MS / 1000, 0.25, z);
    if (z.some((o) => o.tur === 'bayildi')) {
      if (m()) m().basincSil();
      setValfAcik(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
      kaydet();
      sesleriEsitle(true);
      sahneGoster(d.sahne);
      return;
    }
    const uyari = z.find((o) => o.tur === 'zehir');
    if (uyari) soyle('Kükürt maruziyeti yüzde ' + uyari.duzey + '.', 'istek', false);
    if (!d.valf) return;
    if (m()) m().basincAyar(d.valf.basinc, d.valf.alarm);
    if (olaylar.includes('alarm')) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
    if (olaylar.includes('patlama')) {
      cal('patlama', 1);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
      soyle('Geç kaldın! Baca patladı, sıcak gaz yüzüne çarptı. Kükürt maruziyeti yüzde ' + Math.round(d.zehir) + '. Basınç yeniden doluyor.', 'istek', true);
    }
  };

  const valfJest = useJestler(
    {
      onCiftDokun: (parmak) => {
        const d = dunya.current;
        if (parmak >= 2) {
          valfKapat('Valften çekildin. ' + (d.zehir ? 'Kükürt maruziyeti yüzde ' + Math.round(d.zehir) + '.' : ''));
          return;
        }
        const r = valfBirak(d);
        kaydet();
        if (r.sonuc === 'erken') {
          cal('red', 0.7);
          soyle(r.metin, 'istek', true);
        } else if (r.sonuc === 'iyi') {
          cal('valf', 1);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
          soyle(r.metin, 'istek', true);
        } else if (r.sonuc === 'bitti') {
          cal('valf', 1);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
          if (m()) m().basincSil();
          setValfAcik(false);
          sesleriEsitle(true);
          if (d.sahne) sahneGoster(d.sahne, r.metin);
          else {
            durakli.current = false;
            soyle(r.metin, 'istek', true);
          }
        }
      },
      onDokun: (parmak) => {
        if (parmak >= 2) sustur();
        else soyle(valfMetni(dunya.current), 'istek', true);
      },
    },
    { dokunmaBekle: true },
  );

  // --- Rezonans: kapının nota dizisini rezonatörle çalmak ---
  const kapiYeri = (kapiId) => {
    const d = dunya.current;
    const u = KAPILAR[kapiId].uclar.find((x) => x.mekan === d.mekan) || d.oyuncu;
    return { x: u.x, y: u.y };
  };
  const melodiCal = (sonra) => {
    const d = dunya.current;
    if (!d.rezonans || !m()) return;
    const no = ++melodiNo.current;
    const dizi = kapiDizisi(d, d.rezonans.kapi);
    const yer = kapiYeri(d.rezonans.kapiId);
    dizi.forEach((nota, i) =>
      setTimeout(() => {
        if (melodiNo.current === no && dunya.current.rezonans) m().nota(NOTALAR[nota].frek, yer, 0.8, 2.2);
      }, i * NOTA_ARASI),
    );
    if (sonra) setTimeout(() => melodiNo.current === no && sonra(), dizi.length * NOTA_ARASI + 600);
  };
  const seciliMetni = () => {
    const r = dunya.current.rezonans;
    return 'Seçili: ' + NOTALAR[r.secili].ad + '. ' + (r.sira ? r.sira + ' nota tuttu.' : '');
  };
  const rezonansAc = (kapiId, tur) => {
    const d = dunya.current;
    durakli.current = true;
    const r = rezonansBaslat(d, tur);
    d.rezonans.kapiId = kapiId;
    setRezAcik(true);
    soyle(
      'Rezonatörü kapıya tutuyorsun. Kapı ' + r.dizi.length + ' notalık dizisini çalacak; dinle. Sonra yukarı ya da aşağı kaydırıp notayı seç, çift dokunup kapıya çal. Yukarı kaydırmak notayı inceltir. Dokun: diziyi yeniden çalar. İki parmakla çift dokun: kapıdan çekil.',
      'istek',
      true,
    );
    // Konuşma bitince diziyi çal (yaklaşık süre)
    setTimeout(() => melodiCal(() => soyle(seciliMetni(), 'istek', true)), 9000);
  };
  const rezonansKapat = (soz) => {
    melodiNo.current++;
    dunya.current.rezonans = null;
    setRezAcik(false);
    durakli.current = false;
    sesleriEsitle(true);
    if (soz) soyle(soz, 'istek', true);
  };
  const rezJest = useJestler(
    {
      onKaydir: (yon, parmak) => {
        const d = dunya.current;
        if (parmak > 1 || !d.rezonans) return;
        if (yon !== 'yukari' && yon !== 'asagi') return;
        const once = d.rezonans.secili;
        const yeni = rezonansSecimDegis(d, yon === 'yukari' ? 1 : -1);
        if (yeni === once) cal('red', 0.4);
        melodiNo.current++;
        if (m()) m().nota(NOTALAR[yeni].frek, null, 0.5, 1.6);
        Haptics.selectionAsync().catch(() => {});
        soyle(NOTALAR[yeni].ad, 'istek', true);
      },
      onDokun: (parmak) => {
        if (parmak >= 2) {
          sustur();
          return;
        }
        sustur();
        melodiCal(() => soyle(seciliMetni(), 'istek', true));
      },
      onCiftDokun: (parmak) => {
        const d = dunya.current;
        if (parmak >= 2) {
          rezonansKapat('Kapıdan çekildin.');
          return;
        }
        if (!d.rezonans) return;
        melodiNo.current++;
        const yer = kapiYeri(d.rezonans.kapiId);
        const frek = NOTALAR[d.rezonans.secili].frek;
        if (m()) m().nota(frek, yer, 0.9, 2.6);
        const r = rezonansCal(d);
        kaydet();
        if (r.sonuc === 'dogru') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
          setTimeout(() => soyle(r.metin, 'istek', true), 500);
        } else if (r.sonuc === 'yanlis') {
          setTimeout(() => {
            if (m()) m().inleme(yer);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
            soyle(r.metin + ' Dizi yeniden çalıyor.', 'istek', true);
            setTimeout(() => melodiCal(() => soyle(seciliMetni(), 'istek', true)), 3500);
          }, 700);
        } else if (r.sonuc === 'acildi') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
          setTimeout(() => {
            cal('kapi', 1);
            rezonansKapat(r.metin + ' Çift dokun: içeri gir.');
          }, 900);
        }
      },
    },
    { dokunmaBekle: true },
  );

  // --- Frekans ayarı ---
  const frekansAc = () => {
    const d = dunya.current;
    durakli.current = true;
    ayarBaslat(d);
    if (m()) m().telsizKur();
    ortamCal(MEKANLAR.vadi.ortam, 0.3);
    setAyarAcik(true);
    soyle('Frekans ayarı. Kulaklığında parazit. İçinde ince, kesik kesik bir ses ara. Parmağını yukarı ya da aşağı sürükle, ya da iki parmakla çevir: kanal değişir. Sağa ya da sola hızlı kaydır: ince ayar. Ses netleşince kıpırdama, kilitlenene kadar bekle. Dokun: kanalı söylerim. İki parmakla çift dokun: ayardan çık. ' + ayarMetni(d), 'istek', true);
  };

  const frekansKapat = (soz) => {
    if (m()) m().telsizSil();
    dunya.current.ayar = null;
    setAyarAcik(false);
    durakli.current = false;
    ortamCal(MEKANLAR.vadi.ortam, ortamOrani(dunya.current));
    if (soz) soyle(soz, 'istek', true);
  };

  const frekansAdimi = () => {
    const d = dunya.current;
    if (!d.ayar) return;
    const y = ayarYakinlik(d);
    if (m()) m().telsizAyar(y, d.ayar.frekans - d.ayar.hedef);
    const olaylar = ayarIlerle(d, ADIM_MS / 1000);
    if (olaylar.includes('yakin')) {
      Haptics.selectionAsync().catch(() => {});
      soyle(kisiAdi(d, 'telsizci').split(' ')[0] + ' telsizden: "Bir şey var! Yavaş, çok yavaş."', 'istek', true);
    }
    if (olaylar.includes('kilitlendi')) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      if (m()) m().telsizSil();
      setAyarAcik(false);
      kaydet();
      sahneGoster(d.sahne);
    }
  };

  const ayarJest = useJestler(
    {
      onSurukle: (mod, dx, dy) => {
        if (mod !== 'tek') return;
        const s = surukle.current;
        ayarDegis(dunya.current, -(dy - s.sonDy) * 0.06);
        s.sonDy = dy;
      },
      onSurukleBitti: () => {
        surukle.current = { aktif: false, dx: 0, dy: 0, sonDy: 0 };
      },
      onDondur: (f) => ayarDegis(dunya.current, f * 7),
      onKaydir: (yon, parmak) => {
        if (parmak > 1) return;
        if (yon === 'sag') ayarDegis(dunya.current, 0.2);
        else if (yon === 'sol') ayarDegis(dunya.current, -0.2);
        if (yon === 'sag' || yon === 'sol') cal('dugme', 0.5);
      },
      onDokun: (parmak) => {
        if (parmak >= 2) sustur();
        else soyle(ayarMetni(dunya.current), 'istek', true);
      },
      onCiftDokun: (parmak) => {
        if (parmak >= 2) frekansKapat('Ayardan çıktın. Antenin başındasın.');
      },
    },
    { dokunmaBekle: true },
  );

  // --- Yüzey hareketleri ---
  const jest = useJestler(
    {
      onSurukle: (mod, dx, dy) => {
        if (mod !== 'tek' || durakli.current) return;
        surukle.current = { aktif: true, dx, dy, sonDy: dy };
      },
      onSurukleBitti: () => {
        surukle.current = { aktif: false, dx: 0, dy: 0, sonDy: 0 };
      },
      onDokun: (parmak) => {
        if (parmak >= 2) {
          sustur();
          return;
        }
        const d = dunya.current;
        if (d.oto) {
          d.oto = null;
          soyle('Durdun.', 'istek', true);
          return;
        }
        soyle(cevreMetni(d), 'istek', true);
      },
      onCiftDokun: (parmak) => {
        if (parmak >= 2) {
          menuyuAc();
          return;
        }
        const d = dunya.current;
        if (d.bildirimler && d.bildirimler.length && bildirimDinle()) return;
        const e = etkiles(d);
        if (e.tur === 'kapi' && e.kilitli && e.rezonans && d.envanter.includes('rezonator')) {
          cal('bip', 0.6);
          rezonansAc(e.kapi, e.rezonans);
        } else if (e.tur === 'kapi' && e.kilitli) {
          cal('red', 0.8);
          soyle(e.metin + (e.rezonans ? ' Mühendis bir frekans rezonatörü yapabilir.' : ''), 'istek', true);
        } else if (e.tur === 'kapi') {
          cal('tislama', 0.9);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
          sesleriEsitle(true);
          kaydet();
          soyle(e.metin, 'istek', true);
        } else if (e.tur === 'nokta') noktaGoster(e.id);
        else if (e.tur === 'kisi') konusmaGoster(e.id);
        else soyle(e.metin, 'istek', true);
      },
      onKaydir: (yon, parmak) => {
        if (parmak >= 2 && yon === 'asagi') bildirimErtele();
      },
      onUzunBas: () => {
        const d = dunya.current;
        const r = radar(d);
        cal('sonar', 0.7);
        const s = m();
        const mk = MEKANLAR[d.mekan];
        // Yankılar: dışarıdaysan nesnelerin yönünden, uzaklığa göre gecikmeyle döner
        if (s && yuklu.current.bip && d.mekan !== 'kapsul')
          r.pingler.forEach((p) => setTimeout(() => s.tek('bip', p, 0.8), 600 + p.gecikme));
        setTimeout(() => soyle(r.metin, 'istek', true), 900);
      },
    },
    { dokunmaBekle: true },
  );

  return (
    <View style={stiller.dis}>
      <View style={stiller.kap} {...(katman || ayarAcik || valfAcik || rezAcik ? {} : jest)}>
        <KonumsalSes
          ref={motor}
          onMesaj={(x) => {
            if (x.tur === 'yuklendi') sahneKur();
            else if (x.tur === 'dosyaHazir') {
              yuklu.current[x.ad] = true;
              sesleriEsitle(false);
            } else if (x.tur === 'hazir' && x.durum !== 'running') soyle('Ses motoru başlayamadı. Durum: ' + x.durum, 'istek', false);
            else if (x.tur === 'hata') soyle('Ses motorunda hata: ' + x.metin, 'istek', false);
          }}
        />
        <Text style={stiller.baslik}>Aethelis-IV</Text>
        <Text style={stiller.yazi}>{yazi}</Text>
      </View>
      {ayarAcik ? (
        <View style={[StyleSheet.absoluteFill, stiller.ayar]} {...ayarJest}>
          <Text style={stiller.baslik}>Frekans ayarı</Text>
          <Text style={stiller.yazi}>Yukarı-aşağı sürükle ya da iki parmakla çevir</Text>
        </View>
      ) : null}
      {valfAcik ? (
        <View style={[StyleSheet.absoluteFill, stiller.ayar]} {...valfJest}>
          <Text style={stiller.baslik}>Valf dengeleme</Text>
          <Text style={stiller.yazi}>Alarm çalınca çift dokun</Text>
        </View>
      ) : null}
      {rezAcik ? (
        <View style={[StyleSheet.absoluteFill, stiller.ayar]} {...rezJest}>
          <Text style={stiller.baslik}>Rezonans</Text>
          <Text style={stiller.yazi}>Yukarı-aşağı kaydır nota seç, çift dokun çal</Text>
        </View>
      ) : null}
      {katman ? (
        <View style={StyleSheet.absoluteFill}>
          <SesliListe key={'k' + katman.no} baslik={katman.baslik} giris={katman.giris} rehberAcik onGeri={katman.onGeri} ogeler={katman.ogeler} />
        </View>
      ) : null}
    </View>
  );
}

const stiller = StyleSheet.create({
  dis: { flex: 1, backgroundColor: RENK.zemin },
  kap: { flex: 1, backgroundColor: RENK.zemin, paddingTop: UST_BOSLUK, paddingHorizontal: 20 },
  ayar: { backgroundColor: RENK.zemin, paddingTop: UST_BOSLUK, paddingHorizontal: 20 },
  baslik: { color: RENK.yazi, fontSize: 26, fontWeight: '700', marginBottom: 12 },
  yazi: { color: RENK.soluk, fontSize: 17 },
});
