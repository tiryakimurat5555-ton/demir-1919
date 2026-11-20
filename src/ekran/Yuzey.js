// Aethelis-IV yüzeyi: sesle serbest dolaşma, radar, kaynak toplama, kapsülün içi, kişilerle konuşma,
// birinci görev "Sinyal Arayışı" (Gözcü Tepesi'nde frekans ayarı), ikinci görev "Jeotermal Sondaj"
// (Manyetik Sırtlar, kükürt maruziyeti, gaz bacalarında valf dengeleme), üçüncü görev "Antik Kseno-Laboratuvar
// Kazısı" (Kadim Krater'in çanları, rezonatörle kapı dizisi, görünmez yerçekimi alanları), dördüncü görev "Tersane
// Zemin Güçlendirmesi" (Uğultulu Plato'da rüzgâr hamleleri, kulakla hidrolik ayak dengeleme), beşinci görev
// "Kıvılcım ve İlk Uçuş" (üretim, iş gücü, vinçle montaj, gemi içi, uzayda fenerlerle seyir) ve telsiz bildirimleri.
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
// Ayak dengelemede: yukarı-aşağı sürükle pompala (yukarı ayağı kaldırır); dokun: durumu söyler;
//   iki parmakla çift dokun: ayaktan çekil. Platoda rüzgâr ıslığı yükselince dur.
// Vinçte: sağa-sola sürükle (ses iki kulakta eşitlenince ortada); aşağı kaydır indir; çift dokun kenetle;
//   dokun durumu söyler; iki parmakla çift dokun çekil.
// Gemide: iki parmakla sağa-sola kaydır oda değiştir; dokun oda terminali; basılı tut görevliyle konuş.
//   Uzayda kokpitte: yukarı kaydır itki, aşağı ters itici, sağa-sola burun; basılı tut radar; çift dokun kenetlen.
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
import { cevreMetni, durumMetni, esyaMetni, etkiles, firtinaIlerle, ilerle, kisiAdi, otoBaslat, radar, yerlerListesi, zehirIlerle } from '../oyun/yuzey/dunya';
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
  ayakFrek,
  teraziBaslat,
  teraziIlerle,
  teraziMetni,
  teraziPompa,
  zamanIlerle,
  uzayAdim,
  kenetlen,
  kalkis,
  itki,
  burunDondur,
  uzayRadar,
  uzayDurumu,
  onTarama,
  UZAY_NOKTALARI,
  gorunurNoktalar,
  sesYeri,
  fenerMenzili,
} from '../oyun/yuzey/gorevler';
import { SEKTORLER, bosta, isGucuDegis, moralMetni, moralSesi, parcaMetni, uretimBaslat, uretimListesi } from '../oyun/koloni';
import {
  VINC_ESIGI,
  atamaYap,
  gemiDurumu,
  gemiOdalari,
  gemidenIn,
  modulListesi,
  modulTak,
  montajBaslat,
  montajListesi,
  odaDegis,
  odaKonusmasi,
  odaMetni,
  odaSu,
  vincIlerle,
  vincIndir,
  vincIptal,
  vincKaydir,
  vincKenetle,
  vincMetni,
} from '../oyun/gemi/gemi';
import { SES_OLCEK } from '../oyun/uzay/seyir';
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
  hamle: require('../../assets/ses/konumsal/hamle.wav'),
};

// Eylem sesleri: gorev1.js'teki ses adlarını çalınacak efekte çevirir
const EYLEM_SESI = { bip: 'bip', red: 'red', tislama: 'tislama', jenerator: 'jenerator', kes: 'tislama', kur: 'kapi', topla: 'dugme', kristal: 'dugme', sonda: 'sonda', polimer: 'polimer', hidrolik: 'hidrolik', kaynak: 'kaynak', kapi_gemi: 'kapi_gemi', dugme: 'dugme' };
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
  const [teraziAcik, setTeraziAcik] = useState(false);
  const [vincAcik, setVincAcik] = useState(false);
  const [gemiAcik, setGemiAcik] = useState(false);
  const sonDx = useRef(0);
  const pompaZamani = useRef(0);
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
    if (d.gemide && d.gemi && d.gemi.yer === 'uzay') {
      uzaySesleri(ortamDa);
      return;
    }
    for (const id of Object.keys(calanlar.current)) if (id.indexOf('fener_') === 0) kaynakKapat(id);
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
      s.boguk(d.mekan === 'kapsul' || !!d.gemide);
      const oda = odaSu(d);
      if (oda) ortamCal(oda.ortam, 0.8);
      else ortamCal(mk.ortam, ortamOrani(d));
    }
  };

  // Uzayda: yüzey sesleri kapanır; dinleyici gemi, fenerler ziyaret noktalarında (20 birim = 1 metre)
  const uzaySesleri = (ortamDa) => {
    const d = dunya.current;
    const s = m();
    const u = d.uzay;
    if (!s || !u) return;
    for (const id of Object.keys(calanlar.current)) if (id.indexOf('fener_') !== 0) kaynakKapat(id);
    s.dinleyici({ x: u.x / SES_OLCEK, y: u.y / SES_OLCEK, yon: u.yon });
    const menzil = fenerMenzili(d);
    for (const id of Object.keys(UZAY_NOKTALARI)) {
      const n = UZAY_NOKTALARI[id];
      const kid = 'fener_' + id;
      if (gorunurNoktalar(d).includes(id) && Math.hypot(n.x - u.x, n.y - u.y) < menzil) {
        if (!calanlar.current[kid]) {
          calanlar.current[kid] = true;
          s.kaynak(kid, 'fener', sesYeri(n), null, n.frek);
        }
      } else kaynakKapat(kid);
    }
    if (ortamDa) {
      s.boguk(false);
      const oda = odaSu(d);
      ortamCal(oda ? oda.ortam : 'ortam_uzay', 0.6);
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
      } else if (o.tur === 'hamleGeliyor') {
        // Rüzgâr hamlesi: geldiği yönden, uzaktan yükselen ıslık
        if (m() && yuklu.current.hamle) m().tek('hamle', o.kaynak, 0.55);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
        sozler.push(o.metin);
      } else if (o.tur === 'hamle') {
        if (m() && yuklu.current.hamle) m().tek('hamle', o.kaynak, 1);
        Haptics.impactAsync(o.savruldu || o.sarsti ? Haptics.ImpactFeedbackStyle.Heavy : Haptics.ImpactFeedbackStyle.Light).catch(() => {});
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
      // Koloni zamanla ilerler (üretim, yenilenme, nüfus, tersane), her modda
      const ko = zamanIlerle(d, ADIM_MS / 1000);
      if (ko.length) koloniOlaylari(ko);
      if (d.ayar) {
        frekansAdimi();
        return;
      }
      if (d.valf) {
        valfAdimi();
        return;
      }
      if (d.rezonans) return;
      if (d.terazi) {
        teraziAdimi();
        return;
      }
      if (d.vinc) {
        vincAdimi();
        return;
      }
      if (durakli.current) return;
      if (d.gemide) {
        if (sayac % 10 === 0) bildirimKontrol();
        gemiAdimi(sayac);
        if (d.sahne) {
          sesleriEsitle(true);
          sahneGoster(d.sahne);
        }
        if (sayac % KAYIT_ARALIGI === 0) kaydet();
        return;
      }
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
    if (d.terazi) d.terazi = null;
    if (d.vinc) vincIptal(d);
    if (d.gemide) gemiModuAc(true);
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
    if (id === 'inis') {
      // Moral nabzı: dinleme kulesinden koloninin uğultusu
      const ms = moralSesi(d);
      if (ms) setTimeout(() => cal(ms, 0.9), 2500);
      if (m()) m().motorSil();
    }
    if (id === 'kalkis' && m()) {
      m().motorKur();
      m().motorAyar(4);
      setTimeout(() => m() && m().motorAyar(0), 9000);
    }
    if (id === 'kurtarma' && m()) m().motorSil();
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
            if (r.terazi) {
              katmanKapatSessiz();
              teraziAc(id);
              return 'sessiz';
            }
            if (d.sahne) {
              katmanKapatSessiz();
              sahneGoster(d.sahne, r.metin || null);
              return 'sessiz';
            }
            if (r.insa) return insaGoster(), 'sessiz';
            if (r.uretim) return uretimGoster(), 'sessiz';
            if (r.isgucu) return isGucuGoster(), 'sessiz';
            if (r.montaj) return montajGoster(), 'sessiz';
            if (r.modul) return modulGoster(), 'sessiz';
            if (r.gemi) {
              katmanKapatSessiz();
              durakli.current = false;
              gemiModuAc(false, r.metin);
              return 'sessiz';
            }
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

  // --- Koloni olayları: üretim, montaj, nüfus (telsiz çağrısı olarak) ---
  const koloniOlaylari = (olaylar) => {
    const d = dunya.current;
    const sozler = olaylar.filter((o) => o.metin).map((o) => o.metin);
    if (!sozler.length) return;
    if (!d.bildirimler) d.bildirimler = [];
    d.bildirimler.push({ id: 'koloni_' + Date.now(), kim: 'Koloni bilgisayarı', metin: sozler.join(' ') });
    cal('telsiz_zil', 0.7);
    Haptics.selectionAsync().catch(() => {});
    if (!durakli.current) setTimeout(() => soyle('Koloniden haber. Dinlemek için çift dokun.', 'istek', false), 700);
  };

  // --- Terminal: üretim ve iş gücü ---
  const uretimGoster = (onEk) => {
    const d = dunya.current;
    const liste = uretimListesi(d);
    katmanAc({
      baslik: 'Üretim',
      giris: (onEk ? onEk + ' ' : '') + 'Elindeki parçalar: ' + parcaMetni(d) + '. Bir iş seç; tesis meşgul değilse başlar ve zamanla biter.',
      onGeri: () => noktaGoster('terminal'),
      ogeler: [
        ...liste.map((t) => ({
          id: t.tesis + t.id,
          etiket: t.ad + '. ' + t.durum,
          sec: () => {
            if (!t.yapilabilir) {
              soyle(t.ad + '. ' + t.durum, 'istek', true);
              return 'sessiz';
            }
            const r = uretimBaslat(d, t.tesis, t.id);
            kaydet();
            if (r.ses) cal(EYLEM_SESI[r.ses] || r.ses, 0.8);
            uretimGoster(r.metin);
            return 'sessiz';
          },
        })),
        { id: 'geri', etiket: 'Terminale dön', sec: () => (noktaGoster('terminal'), 'sessiz') },
      ],
    });
  };
  const isGucuGoster = (onEk) => {
    const d = dunya.current;
    const n = d.koloni.nufus;
    const ogeler = [];
    for (const k of Object.keys(SEKTORLER)) {
      ogeler.push({
        id: k + '+',
        etiket: SEKTORLER[k].ad + ': ' + (n[k] || 0) + ' kişi. Bir kişi ver.',
        ipucu: SEKTORLER[k].tarif,
        sec: () => {
          const r = isGucuDegis(d, k, 1);
          kaydet();
          if (r.olmadi) cal('red', 0.6);
          isGucuGoster(r.metin);
          return 'sessiz';
        },
      });
      ogeler.push({
        id: k + '-',
        etiket: SEKTORLER[k].ad + ': bir kişi al.',
        sec: () => {
          const r = isGucuDegis(d, k, -1);
          kaydet();
          if (r.olmadi) cal('red', 0.6);
          isGucuGoster(r.metin);
          return 'sessiz';
        },
      });
    }
    katmanAc({
      baslik: 'Koloni yönetimi',
      giris: (onEk ? onEk + ' ' : '') + 'Nüfus ' + n.toplam + ', barınma ' + n.barinma + ', boşta ' + bosta(d) + '. Moral yüzde ' + d.koloni.moral + '. ' + moralMetni(d),
      onGeri: () => noktaGoster('terminal'),
      ogeler: [...ogeler, { id: 'geri', etiket: 'Terminale dön', sec: () => (noktaGoster('terminal'), 'sessiz') }],
    });
  };

  // --- Kızak: montaj ve modüller ---
  const montajGoster = (onEk) => {
    const d = dunya.current;
    katmanAc({
      baslik: 'Kıvılcım montajı',
      giris: (onEk ? onEk + ' ' : '') + 'Dört aşama, sırayla. Elindeki parçalar: ' + parcaMetni(d) + '.',
      onGeri: () => noktaGoster('kizak'),
      ogeler: [
        ...montajListesi(d).map((a) => ({
          id: a.id,
          etiket: a.ad + '. ' + a.metin,
          sec: () => {
            const r = montajBaslat(d, a.id);
            kaydet();
            if (r.vinc) {
              katmanKapatSessiz();
              vincAc();
              return 'sessiz';
            }
            if (r.ses) cal(EYLEM_SESI[r.ses] || r.ses, 0.8);
            montajGoster(r.metin);
            return 'sessiz';
          },
        })),
        { id: 'geri', etiket: 'Kızağa dön', sec: () => (noktaGoster('kizak'), 'sessiz') },
      ],
    });
  };
  const modulGoster = (onEk) => {
    const d = dunya.current;
    katmanAc({
      baslik: 'Modül tak',
      giris: (onEk ? onEk + ' ' : '') + 'Üretilmiş modüller geminin uygun katmanına takılır.',
      onGeri: () => noktaGoster('kizak'),
      ogeler: [
        ...modulListesi(d).map((x) => ({
          id: x.id,
          etiket: x.ad + '. ' + x.durum,
          sec: () => {
            const r = modulTak(d, x.id);
            kaydet();
            if (r.ses) cal(EYLEM_SESI[r.ses] || r.ses, 0.8);
            modulGoster(r.metin);
            return 'sessiz';
          },
        })),
        { id: 'geri', etiket: 'Kızağa dön', sec: () => (noktaGoster('kizak'), 'sessiz') },
      ],
    });
  };

  // --- Vinç: parçayı sesle ortalayıp indirme ---
  const vincAc = () => {
    const d = dunya.current;
    durakli.current = true;
    sonDx.current = 0;
    if (m()) {
      m().vincKur();
      m().vincAyar(d.vinc.x, d.vinc.yukseklik, false);
    }
    ortamCal(MEKANLAR.plato.ortam, 0.35);
    cal('zincir', 0.7);
    setVincAcik(true);
    soyle(
      'Vinç. Parça kulaklığında bir yana kaymış sallanıyor. Parmağını sağa ya da sola sürükle; ses iki kulağında eşitlenince ve düzenli bir tık duyunca parça yuvanın tam üstünde. Aşağı kaydır: bir basamak indir; üç basamakta oturur. Oturunca çift dokun: kenetle. Dokun: durumu söylerim. İki parmakla çift dokun: vinçten çekil.',
      'istek',
      true,
    );
  };
  const vincKapat = (soz) => {
    const d = dunya.current;
    if (m()) m().vincSil();
    if (d.vinc) vincIptal(d);
    setVincAcik(false);
    durakli.current = false;
    kaydet();
    sesleriEsitle(true);
    if (soz) soyle(soz, 'istek', true);
  };
  const vincAdimi = () => {
    const d = dunya.current;
    if (!d.vinc) return;
    d.sure = (d.sure || 0) + ADIM_MS / 1000;
    const f = [];
    firtinaIlerle(d, ADIM_MS / 1000, false, f);
    if (f.length) olaylariIsle(f);
    vincIlerle(d, ADIM_MS / 1000);
    if (m() && d.vinc) m().vincAyar(d.vinc.x, d.vinc.yukseklik, Math.abs(d.vinc.x) < VINC_ESIGI);
  };
  const vincJest = useJestler(
    {
      onSurukle: (mod, dx) => {
        if (mod !== 'tek') return;
        vincKaydir(dunya.current, (dx - sonDx.current) * 0.004);
        sonDx.current = dx;
      },
      onSurukleBitti: () => {
        sonDx.current = 0;
      },
      onKaydir: (yon, parmak) => {
        if (parmak > 1 || yon !== 'asagi') return;
        const r = vincIndir(dunya.current);
        if (r.sonuc === 'carpti') {
          cal('zincir', 1);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
        } else if (r.sonuc === 'indi') cal('hidrolik', 0.5);
        else if (r.sonuc === 'oturdu') {
          cal('zincir', 0.6);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
        }
        soyle(r.metin, 'istek', true);
      },
      onDokun: (parmak) => {
        if (parmak >= 2) sustur();
        else soyle(vincMetni(dunya.current), 'istek', true);
      },
      onCiftDokun: (parmak) => {
        const d = dunya.current;
        if (parmak >= 2) {
          vincKapat('Vinçten çekildin; parça depoya döndü.');
          return;
        }
        const r = vincKenetle(d);
        if (r.sonuc !== 'kenetlendi') {
          cal('red', 0.6);
          soyle(r.metin, 'istek', true);
          return;
        }
        cal('kaynak', 1);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
        if (m()) m().vincSil();
        setVincAcik(false);
        durakli.current = false;
        kaydet();
        sesleriEsitle(true);
        soyle(r.metin, 'istek', true);
      },
    },
    { dokunmaBekle: true },
  );

  // --- Gemi içi ve uzay ---
  const gemiModuAc = (yuklemeden, soz) => {
    const d = dunya.current;
    setGemiAcik(true);
    if (d.uzay && m()) {
      m().motorKur();
      m().motorAyar(d.uzay.hiz);
    }
    sesleriEsitle(true);
    if (!yuklemeden) {
      cal('kapi_gemi', 0.9);
      soyle((soz ? soz + ' ' : '') + 'Odalar arasında iki parmakla sağa ya da sola kaydır. Dokun: oda terminali. Basılı tut: görevliyle konuş.', 'istek', true);
    }
  };
  const gemiModuKapat = (soz) => {
    setGemiAcik(false);
    if (m()) m().motorSil();
    durakli.current = false;
    sesleriEsitle(true);
    if (soz) soyle(soz, 'istek', true);
  };
  const gemiAdimi = (sayac) => {
    const d = dunya.current;
    if (!d.uzay) {
      if (sayac % 5 === 0) sesleriEsitle(false);
      return;
    }
    const olaylar = uzayAdim(d, ADIM_MS / 1000);
    if (m()) {
      if (d.uzay) m().dinleyici({ x: d.uzay.x / SES_OLCEK, y: d.uzay.y / SES_OLCEK, yon: d.uzay.yon });
      m().motorAyar(d.uzay ? d.uzay.hiz : 0);
    }
    const sozler = [];
    for (const o of olaylar) {
      if (o.tur === 'pruvaKilit') {
        cal('arayuz', 0.7);
        Haptics.selectionAsync().catch(() => {});
        sozler.push(o.metin);
      } else if (o.tur === 'yaklasti') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
        sozler.push(o.metin);
      } else if (o.tur === 'yakitAz' || o.tur === 'sinir') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
        sozler.push(o.metin);
      }
    }
    if (sozler.length) soyle(sozler.join(' '), 'istek', true);
    if (sayac % 5 === 0) sesleriEsitle(false);
  };
  const ucustaKokpitte = () => {
    const d = dunya.current;
    const o = odaSu(d);
    return !!(d.uzay && o && o.id === 'kokpit');
  };

  const gemiTerminali = (onEk) => {
    const d = dunya.current;
    const o = odaSu(d);
    if (!o) return;
    const ogeler = [];
    if (o.id === 'kokpit') {
      ogeler.push({ id: 'durum', etiket: 'Gemi durumu', sec: () => (soyle(gemiDurumu(d), 'istek', true), 'sessiz') });
      if (d.uzay) ogeler.push({ id: 'seyir', etiket: 'Seyir durumu', sec: () => (soyle(uzayDurumu(d), 'istek', true), 'sessiz') });
      ogeler.push({ id: 'harita', etiket: 'Uzay haritası ve ön tarama', ipucu: 'Bir noktayı seç: tehlike analizi ve gerekli donanım.', sec: () => (haritaGoster(), 'sessiz') });
      if (!d.uzay)
        ogeler.push({
          id: 'kalk',
          etiket: 'Kalkış',
          sec: () => {
            const r = kalkis(d);
            kaydet();
            if (r.ses) {
              cal('red', 0.7);
              soyle(r.metin, 'istek', true);
              return 'sessiz';
            }
            katmanKapatSessiz();
            sahneGoster('kalkis');
            return 'sessiz';
          },
        });
      ogeler.push({ id: 'ata', etiket: 'Mürettebat ata', sec: () => (atamaGoster(), 'sessiz') });
      if (!d.uzay)
        ogeler.push({
          id: 'in',
          etiket: 'Gemiden in',
          sec: () => {
            const r = gemidenIn(d);
            kaydet();
            cal('kapi_gemi', 0.8);
            katmanKapatSessiz();
            gemiModuKapat(r.metin);
            return 'sessiz';
          },
        });
    } else {
      ogeler.push({ id: 'kasa', etiket: 'Numune kasası', sec: () => (soyle(d.gemi.kargo.length ? 'Kasada: ' + d.gemi.kargo.join(', ') + '.' : 'Numune kasası boş.', 'istek', true), 'sessiz') });
      ogeler.push({ id: 'dolap', etiket: 'İlk yardım dolabı', sec: () => (soyle('Dolap dolu: sargılar, yanık jeli, iki doz radyasyon ilacı.', 'istek', true), 'sessiz') });
      ogeler.push({ id: 'ranza', etiket: 'Acil durum ranzası', sec: () => (soyle('İki kişilik dar bir ranza. Bir süre uzanıp gözlerini kapatıyorsun; türbinin vızıltısı uzaklaşıyor.', 'istek', true), 'sessiz') });
    }
    ogeler.push({ id: 'konus', etiket: 'Görevliyle konuş', sec: () => (soyle(odaKonusmasi(d), 'istek', true), 'sessiz') });
    ogeler.push({ id: 'geri', etiket: 'Kapat', sec: () => (katmanKapat(), 'sessiz') });
    cal('arayuz', 0.6);
    katmanAc({ baslik: o.ad, giris: onEk || null, onGeri: () => katmanKapat(), ogeler });
  };
  const haritaGoster = () => {
    const d = dunya.current;
    katmanAc({
      baslik: 'Uzay haritası',
      giris: 'Ziyaret noktaları. Birini seç: ön tarama raporu.',
      onGeri: () => gemiTerminali(),
      ogeler: [
        ...gorunurNoktalar(d).map((id) => ({ id, etiket: UZAY_NOKTALARI[id].ad, sec: () => (soyle(onTarama(d, id), 'istek', true), 'sessiz') })),
        { id: 'geri', etiket: 'Terminale dön', sec: () => (gemiTerminali(), 'sessiz') },
      ],
    });
  };
  const atamaGoster = (onEk) => {
    const d = dunya.current;
    const ogeler = [];
    for (const o of gemiOdalari(d)) {
      for (const u of d.murettebat) {
        const burada = d.gemi.atamalar[o.id] === u.id;
        ogeler.push({
          id: o.id + u.id,
          etiket: o.ad + ': ' + u.rol + ' ' + u.ad + (burada ? ', atanmış' : ''),
          ipucu: o.gorevYeri + ' görevi.',
          sec: () => {
            const r = atamaYap(d, o.id, burada ? null : u.id);
            kaydet();
            atamaGoster(r.metin);
            return 'sessiz';
          },
        });
      }
    }
    katmanAc({
      baslik: 'Mürettebat ata',
      giris: (onEk ? onEk + ' ' : '') + 'Her odaya bir görevli. Kokpitteki telsiz subayı fenerleri daha uzaktan duyar.',
      onGeri: () => gemiTerminali(),
      ogeler: [...ogeler, { id: 'geri', etiket: 'Terminale dön', sec: () => (gemiTerminali(), 'sessiz') }],
    });
  };

  const gemiJest = useJestler(
    {
      onKaydir: (yon, parmak) => {
        const d = dunya.current;
        if (parmak >= 2 && (yon === 'sag' || yon === 'sol')) {
          const r = odaDegis(d, yon === 'sol' ? 1 : -1);
          if (!r) return;
          if (r.sinir) {
            cal('red', 0.4);
            soyle(r.metin, 'istek', true);
            return;
          }
          cal('tislama', 0.6);
          setTimeout(() => cal('kilit', 0.6), 350);
          sesleriEsitle(true);
          kaydet();
          soyle(r.metin, 'istek', true);
          return;
        }
        if (parmak >= 2 && yon === 'asagi') {
          bildirimErtele();
          return;
        }
        if (!ucustaKokpitte()) return;
        if (yon === 'yukari' || yon === 'asagi') {
          const r = itki(d, yon === 'yukari' ? 1 : -1);
          cal(r.ses ? 'red' : 'dugme', 0.5);
          soyle(r.metin, 'istek', true);
        } else {
          burunDondur(d, (yon === 'sag' ? 1 : -1) * (Math.PI / 12));
          cal('tik', 0.5);
        }
      },
      onDokun: (parmak) => {
        if (parmak >= 2) {
          sustur();
          return;
        }
        gemiTerminali();
      },
      onUzunBas: () => {
        const d = dunya.current;
        if (ucustaKokpitte()) {
          const r = uzayRadar(d);
          cal('sonar', 0.7);
          const s = m();
          if (s) r.pingler.forEach((p) => setTimeout(() => s.nota(p.frek, sesYeri(p), 0.5, 0.8), 600 + p.gecikme));
          setTimeout(() => soyle(r.metin, 'istek', true), 900);
          return;
        }
        soyle(odaKonusmasi(d), 'istek', true);
      },
      onCiftDokun: (parmak) => {
        const d = dunya.current;
        if (parmak >= 2) {
          menuyuAc();
          return;
        }
        if (d.bildirimler && d.bildirimler.length && bildirimDinle()) return;
        if (!d.uzay) {
          soyle('Gemi kızakta. Kalkmak ya da inmek için kokpit terminali: dokun.', 'istek', true);
          return;
        }
        const r = kenetlen(d);
        kaydet();
        if (r.inis) {
          cal('hidrolik', 0.9);
          sahneGoster('inis');
          return;
        }
        if (r.ses) cal('red', 0.6);
        else cal('kilit', 0.8);
        soyle(r.metin, 'istek', true);
      },
      onDondur: () => {
        const d = dunya.current;
        if (!ucustaKokpitte() || d.telsizTarandi) return;
        d.telsizTarandi = true;
        cal('dugme', 0.5);
        soyle('Telsiz taraması: bu bölgede yalnız fenerler ve kozmik parazit var.', 'istek', true);
        setTimeout(() => (dunya.current.telsizTarandi = false), 4000);
      },
    },
    { dokunmaBekle: true },
  );

  // --- Hidrolik ayak dengeleme (kulakla) ---
  const teraziAc = (id) => {
    const d = dunya.current;
    durakli.current = true;
    teraziBaslat(d, id);
    if (m()) {
      m().teraziKur(330);
      m().teraziAyar(ayakFrek(d.terazi.sapma), false);
    }
    ortamCal(MEKANLAR.plato.ortam, 0.35);
    setTeraziAcik(true);
    cal('hidrolik', 0.7);
    soyle(
      'Pompayı ayağa taktın. Kulaklığında iki ton: sabit olan referans, öteki ayağın tonu. Ayak yüksekse tonu ince; parmağını aşağı sürükle. Alçaksa kalın; yukarı sürükle. Tonlar birleşince aradaki titreşim yavaşlayıp durur; o an kıpırdama, iki saniyede kilitlenir. Dokun: durumu söylerim. İki parmakla çift dokun: ayaktan çekil.',
      'istek',
      true,
    );
  };
  const teraziKapat = (soz) => {
    if (m()) m().teraziSil();
    dunya.current.terazi = null;
    setTeraziAcik(false);
    durakli.current = false;
    sesleriEsitle(true);
    if (soz) soyle(soz, 'istek', true);
  };
  const teraziAdimi = () => {
    const d = dunya.current;
    if (!d.terazi) return;
    d.sure = (d.sure || 0) + ADIM_MS / 1000;
    // Fırtına sürer: hamle gelirse ayak sarsılır
    const f = [];
    firtinaIlerle(d, ADIM_MS / 1000, false, f);
    if (f.length) olaylariIsle(f);
    const olaylar = teraziIlerle(d, ADIM_MS / 1000);
    if (olaylar.includes('kilitlendi')) {
      cal('kilit', 1);
      cal('hidrolik', 0.8);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      if (m()) m().teraziSil();
      setTeraziAcik(false);
      durakli.current = false;
      kaydet();
      sesleriEsitle(true);
      const hepsi = olaylar.includes('hepsi');
      soyle('Ayak kilitlendi; topuk sertleşmiş zemine oturdu. ' + (hepsi ? 'Dört ayak da kilitli. Şimdi kızağın ortasındaki dağıtım kutusuna kabloyu bağla.' : 'Sıradaki ayağa geç.'), 'istek', true);
      return;
    }
    if (!d.terazi) return;
    if (m()) m().teraziAyar(ayakFrek(d.terazi.sapma), Date.now() - pompaZamani.current < 250);
    if (olaylar.includes('dengede')) Haptics.selectionAsync().catch(() => {});
    if (olaylar.includes('yakin')) soyle('Tonlar yaklaşıyor; titreşimi dinle.', 'istek', false);
  };
  const teraziJest = useJestler(
    {
      onSurukle: (mod, dx, dy) => {
        if (mod !== 'tek') return;
        const s = surukle.current;
        teraziPompa(dunya.current, -(dy - s.sonDy) * 0.004);
        s.sonDy = dy;
        pompaZamani.current = Date.now();
      },
      onSurukleBitti: () => {
        surukle.current = { aktif: false, dx: 0, dy: 0, sonDy: 0 };
      },
      onDokun: (parmak) => {
        if (parmak >= 2) sustur();
        else soyle(teraziMetni(dunya.current), 'istek', true);
      },
      onCiftDokun: (parmak) => {
        if (parmak >= 2) teraziKapat('Ayaktan çekildin.');
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
      <View style={stiller.kap} {...(katman || ayarAcik || valfAcik || rezAcik || teraziAcik || vincAcik || gemiAcik ? {} : jest)}>
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
      {gemiAcik ? (
        <View style={[StyleSheet.absoluteFill, stiller.ayar]} {...gemiJest}>
          <Text style={stiller.baslik}>{(dunya.current.gemi && dunya.current.gemi.ad) || 'Gemi'}</Text>
          <Text style={stiller.yazi}>İki parmakla sağa-sola: oda. Dokun: terminal.</Text>
        </View>
      ) : null}
      {vincAcik ? (
        <View style={[StyleSheet.absoluteFill, stiller.ayar]} {...vincJest}>
          <Text style={stiller.baslik}>Vinç</Text>
          <Text style={stiller.yazi}>Sağa-sola sürükle, aşağı kaydır, çift dokun</Text>
        </View>
      ) : null}
      {teraziAcik ? (
        <View style={[StyleSheet.absoluteFill, stiller.ayar]} {...teraziJest}>
          <Text style={stiller.baslik}>Ayak dengeleme</Text>
          <Text style={stiller.yazi}>Yukarı-aşağı sürükle; iki ton birleşince dur</Text>
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
