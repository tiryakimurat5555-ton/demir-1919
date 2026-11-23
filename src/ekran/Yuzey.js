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
import { AppState, Dimensions, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useJestler } from '../arayuz/jestler';
import SesliListe from '../arayuz/SesliListe';
import { soyle, sustur } from '../ses/rehber';
import { cal, calanOrtamAdi, ortamCal, onYukle, bosalt } from '../ses/efektler';
import { kayitCal, kayitVarMi } from '../ses/telsiz';
import { kayitBul } from '../oyun/veri/seslendirme';
import { olayKaydi } from '../oyun/uzay/sefer';
import * as ZN from '../oyun/tonoflenya/zanaat';
import * as YN from '../oyun/tonoflenya/yan';
import * as KR from '../oyun/tonoflenya/karakter';
import * as KM from '../oyun/komuta';
import * as HK from '../oyun/hikaye';
import { RENK, UST_BOSLUK } from '../arayuz/tema';
import KonumsalSes from '../ses/konumsal';
import { ALANLAR, KAPILAR, MEKANLAR, NOKTALAR } from '../oyun/yuzey/harita';
import { monolitEtkisi } from '../oyun/yuzey/kesifler';
import { FENOMENLER, GEZEGENLER, ITIBAR_KADEMELERI } from '../oyun/veri/gozlem';
import { OPERASYONLAR } from '../oyun/veri/uzayGorevleri';
import { DESTEK as SAVAS_DESTEK, egitimMenu, egitimEksikMi } from '../oyun/uzay/savas';
import { savasSesListesi } from '../oyun/uzay/savasSesleri';
import { binaMenu } from '../oyun/binalar';
import { aracYukle } from '../oyun/gemi/gemi';
import { degerCumlesi } from '../oyun/tonoflenya/zanaat';
import { TESISLER } from '../oyun/veri/tesisler';
import { harcanabilir, yetenekAc, yetenekListesi } from '../oyun/veri/yetenek';
import { fenerBirak, cevreMetni, durumMetni, esyaMetni, etkiles, firtinaIlerle, maruziyetAdi, ilerle, kisiAdi, otoBaslat, radar, yerlerListesi, zehirIlerle } from '../oyun/yuzey/dunya';
import {
  terraformListesi,
  terraformTeslim,
  savasGirdi,
  savasIlerle,
  savasSes,
  savasDurumu,
  salonListesi,
  itibarKademesi,
  opGirdi,
  opIlerle,
  opSes,
  opDurum,
  olgunMu,
  miniGorunur,
  bolgeListesi,
  kademeMetni,
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
  aractanIn,
  tarlaAc,
  tarlaYatak,
  tarlaGez,
  tohumSec,
  tarlaCapa,
  tarlaEk,
  tarlaVana,
  tarlaIsi,
  tarlaHasat,
  yatakMetni,
  yatakSesi,
  yatakListesi,
  yatakAdi,
  islemeListesi,
  isle,
  isciDegistir,
  kademeBilgi,
  kademeYukselt,
  melezListesi,
  melezBaslat,
  melezFrek,
  melezDondur,
  melezSurukle,
  melezIlerle,
  melezMetni,
  ansiklopedi,
  tarimDurumu,
  girdiMetniT,
  zamanNotu,
  zamanMetni,
  NOBETLER,
  kronikListesi,
  caglarListesi,
  kronikAc,
  haritaListesi,
  bolgeSu,
  BOLGELER,
  KUSAKLAR,
  seyahat,
} from '../oyun/yuzey/gorevler';
import { BITKILER, ISLEME_TESISI } from '../oyun/tarim/bitkiler';
import { UZMANLIKLAR, subayIstihdam, SEKTORLER, bosta, girdiMetni, harca, yeterMi, ilacDagit, isGucuDegis, moralMetni, moralSesi, parcaMetni, uretimBaslat, uretimListesi } from '../oyun/koloni';
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
  GUC_DAGITIMLARI,
  gucDagitimiSec,
  yeniGemiSiniflari,
  kizagaKoy,
  aktifGemiSec,
  kaplamaBaslat,
} from '../oyun/gemi/gemi';
import { ARACLAR } from '../oyun/veri/gemiler';
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
  adim_cam_1: require('../../assets/ses/konumsal/adim_cam_1.wav'),
  adim_cam_2: require('../../assets/ses/konumsal/adim_cam_2.wav'),
  adim_cam_3: require('../../assets/ses/konumsal/adim_cam_3.wav'),
  adim_cam_4: require('../../assets/ses/konumsal/adim_cam_4.wav'),
  vaha: require('../../assets/ses/konumsal/vaha.wav'),
};

// Eylem sesleri: gorev1.js'teki ses adlarını çalınacak efekte çevirir
const EYLEM_SESI = { sinyal: 'sinyal', el_kalkan: 'el_kalkan', capa: 'tarim_capa', ekme: 'tarim_ekme', hasat: 'tarim_hasat', bip: 'bip', red: 'red', tislama: 'tislama', jenerator: 'jenerator', kes: 'tislama', kur: 'kapi', topla: 'dugme', kristal: 'dugme', sonda: 'sonda', polimer: 'polimer', hidrolik: 'hidrolik', kaynak: 'kaynak', kapi_gemi: 'kapi_gemi', dugme: 'dugme' };
const BACALAR = ['baca_1', 'baca_2', 'baca_3'];
const CANLAR = ['can_1', 'can_2', 'can_3', 'can_4', 'can_5'];
// Rüzgârda kendiliğinden çınlayan kristaller (ses: 'kristal'): vadi, krater ve doğu sektörünün kuvars sütunları
const KRISTALLER = Object.keys(NOKTALAR).filter((id) => NOKTALAR[id].ses === 'kristal');
const FAUNA = Object.keys(NOKTALAR).filter((id) => NOKTALAR[id].fauna);
const NOTA_ARASI = 750; // kapının dizisindeki notalar arası (ms)

function guc(piksel) {
  const p = Math.abs(piksel);
  if (p < OLU_BOLGE) return 0;
  return Math.sign(piksel) * Math.min(1, (p - OLU_BOLGE) / (TAM_GUC - OLU_BOLGE));
}

function ortamOrani(d) {
  const mk = MEKANLAR[d.mekan];
  // Monolitin dibinde her şey susar (kesifler.js 4.4)
  const mo = monolitEtkisi(d);
  if (mo === 'sessiz') return 0.02;
  if (mo === 'kaos') return 0.35;
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
  const [tarlaAcik, setTarlaAcik] = useState(false);
  const [melezAcik, setMelezAcik] = useState(false);
  const vanaZamani = useRef(0);
  const [vincAcik, setVincAcik] = useState(false);
  const [gemiAcik, setGemiAcik] = useState(false);
  const [opAcik, setOpAcik] = useState(false);
  const [savasAcik, setSavasAcik] = useState(false);
  const savasRef = useRef({ acik: false, dusman: false });
  const opRef = useRef({ acik: false, ses: {}, hedef: null, sonDx: 0, sonDy: 0 });
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
    const d = dunya.current;
    if (d.gemide && d.uzay) {
      s.motorKur(d.gemi.motorSesi);
      s.motorAyar(d.uzay.hiz);
    } else if (!d.gemide) aracSesiEsitle();
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
    // Vanguard-01'in mors feneri: doğudayken kanyonun ağzından, enkazdayken enkazın kendisinden
    const morsYeri = d.mekan === 'dogu' ? KAPILAR.sarp_kanyon.uclar[0] : d.mekan === 'vanguard' ? NOKTALAR.vanguard_enkaz : null;
    const morsId = morsYeri ? 'mors_' + d.mekan : null;
    for (const id of ['mors_dogu', 'mors_vanguard']) if (id !== morsId) kaynakKapat(id);
    if (morsId && g.morsBulundu && yuklu.current.bip && !calanlar.current[morsId]) {
      calanlar.current[morsId] = true;
      s.dosyaKaynak(morsId, 'bip', morsYeri, 700);
    }
    // Saklı vaha: sırtlarda kalsit aralığından kuş ve su sesleri sızar
    if (d.mekan === 'sirtlar' && yuklu.current.vaha) {
      if (!calanlar.current.vaha) {
        calanlar.current.vaha = true;
        s.dongu('vaha', 'vaha', KAPILAR.vaha_yolu.uclar[0], 0.7);
      }
    } else kaynakKapat('vaha');
    // Yerel fauna (gezegen-gelisimi-v2: elektromanyetik sülükler, iplik böcekleri, tünel sürüngenleri)
    for (const id of FAUNA) {
      const n = NOKTALAR[id];
      const k = 'fauna_' + id;
      if (n.mekan === d.mekan) {
        if (!calanlar.current[k]) {
          if (n.fauna === 'suluk' && yuklu.current.parazit) s.dosyaKaynak(k, 'parazit', n, 3300);
          else if (n.fauna === 'iplik') s.kaynak(k, 'kristal', n);
          else if (n.fauna === 'surungen') s.kaynak(k, 'ayak', n);
          else continue;
          calanlar.current[k] = true;
        }
      } else kaynakKapat(k);
    }
    // Çöl Tilkisi'nin sinyal fenerleri
    (d.fenerler || []).forEach((f, i) => {
      const k = 'isaret_' + i + '_' + f.x;
      if (f.mekan === d.mekan && yuklu.current.bip) {
        if (!calanlar.current[k]) {
          calanlar.current[k] = true;
          s.dosyaKaynak(k, 'bip', f, 2500);
        }
      } else kaynakKapat(k);
    });
    // Yerel mini görevlerin konumlu sesleri (mini.js)
    const istenen = {};
    const mi = d.mini && d.mini.aktif;
    if (mi) {
      for (const id of Object.keys(NOKTALAR)) {
        const n = NOKTALAR[id];
        if (n.mini !== mi || n.mekan !== d.mekan || !miniGorunur(d, id)) continue;
        if (mi === 'mantar_hasadi' && olgunMu(d, id)) istenen['mini_' + id] = () => s.kaynak('mini_' + id, 'kristal', n);
        if (mi === 'vana_donmasi' && n.secenek === d.mini.secim && yuklu.current.baca) istenen['mini_' + id] = () => s.dongu('mini_' + id, 'baca', n, 0.9);
        if (mi === 'kayip_ekip') istenen['mini_' + id] = () => s.kaynak('mini_' + id, 'fener', n, null, 311);
        if (mi === 'yagmaci_tuzagi' && yuklu.current.parazit) istenen['mini_' + id] = () => s.dosyaKaynak('mini_' + id, 'parazit', n, 2600);
        if ((mi === 'basinc_dususu' || mi === 'solucan_gocu' || mi === 'vaha_kanali') && yuklu.current.bip) istenen['mini_' + id] = () => s.dosyaKaynak('mini_' + id, 'bip', n, 3000);
      }
      if (mi === 'solucan_gocu' && d.mekan === 'sirtlar') istenen.mini_suru = () => s.kaynak('mini_suru', 'yercekimi', { x: 540, y: -62 });
    }
    for (const id of Object.keys(calanlar.current)) if (id.indexOf('mini_') === 0 && !istenen[id]) kaynakKapat(id);
    for (const id of Object.keys(istenen))
      if (!calanlar.current[id]) {
        calanlar.current[id] = true;
        istenen[id]();
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
    if (ortamDa && !(terminalAcik.current && durakli.current)) {
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
    // Yol üstü fenomen: kendine has tonuyla, uzaydaki yerinden
    const fid = d.fenomen ? 'fener_fenomen_' + d.fenomen.id : null;
    for (const id of Object.keys(calanlar.current)) if (id.indexOf('fener_fenomen_') === 0 && id !== fid) kaynakKapat(id);
    if (fid && !calanlar.current[fid]) {
      calanlar.current[fid] = true;
      s.kaynak(fid, 'fener', sesYeri(d.fenomen), null, FENOMENLER[d.fenomen.id].frek);
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
      } else if (o.tur === 'zehir') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
        sozler.push(maruziyetAdi(d) + ' yüzde ' + o.duzey + '.' + (o.duzey >= 90 ? ' Hemen çık!' : ''));
      } else if (o.tur === 'statikGeliyor') {
        cal('statik', 0.35);
        if (m()) m().nota(2400, o.kaynak, 0.25, 1.8);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
        sozler.push(o.metin);
      } else if (o.tur === 'statik') {
        cal('statik', o.carpti ? 1 : 0.6);
        if (o.carpti) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
        sozler.push(o.metin);
      } else if (o.tur === 'magmaGeliyor') {
        if (m()) m().nota(48, o.kaynak, 0.9, 3);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
        sozler.push(o.metin);
      } else if (o.tur === 'magma') {
        cal('magma', o.yandi ? 1 : 0.6);
        if (o.yandi) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
        sozler.push(o.metin);
      } else if (o.tur === 'yarasa') {
        // Kör yarasa sürüsü: kısa, tiz cıvıltılar bir yandan öbür yana geçer
        const s = m();
        if (s) for (let i = 0; i < 9; i++) setTimeout(() => s.nota(3000 + Math.random() * 1500, { x: o.bas.x + ((o.son.x - o.bas.x) * i) / 8, y: o.bas.y + ((o.son.y - o.bas.y) * i) / 8 }, 0.18, 0.12), i * 160);
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
      if (d.melez) {
        melezAdimi();
        return;
      }
      if (d.tarla) return;
      if (d.vinc) {
        vincAdimi();
        return;
      }
      if (d.savas && savasRef.current.acik) {
        savasAdimi();
        return;
      }
      if (d.op && opRef.current.acik) {
        opAdimi();
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
      if (sayac % 3 === 0 && d.arac && m()) m().motorAyar(s.aktif || d.oto ? 3 : 0.4);
      // Kriyo mağaralarında ara sıra buz çatlar
      if (d.mekan === 'kriyo' && sayac % 10 === 0 && Math.random() < 0.08) cal('buz_catlak', 0.4 + Math.random() * 0.4);
      if (sayac % 10 === 0 && (d.mekan === 'vadi' || d.mekan === 'dogu')) ortamCal(MEKANLAR[d.mekan].ortam, ortamOrani(d));
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
    if (d.tarla) d.tarla = null;
    if (d.melez) d.melez = null;
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
    terminalAcik.current = false;
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
    const sahneOrtami = typeof sahne.ortam === 'function' ? sahne.ortam(d) : sahne.ortam;
    if (sahneOrtami) {
      terminalAcik.current = false;
      ortamCal(sahneOrtami, 0.8);
    }
    if (id === 'inis') {
      // Moral nabzı: dinleme kulesinden koloninin uğultusu
      const ms = moralSesi(d);
      if (ms) setTimeout(() => cal(ms, 0.9), 2500);
      if (m()) m().motorSil();
    }
    if (id === 'kalkis' && m()) {
      m().motorKur(d.gemi ? d.gemi.motorSesi : 'turbin');
      m().motorAyar(4);
      setTimeout(() => m() && m().motorAyar(0), 9000);
    }
    if (id === 'kurtarma' && m()) m().motorSil();
    if (sahne.efekt) sahne.efekt.forEach((e, i) => setTimeout(() => cal(e, 1), i * 400));
    const ok = id === 'sefer_olay' ? olayKaydi(d) : null;
    if (ok && kayitVarMi(ok.kayit)) {
      // Seslendirilmiş sefer olayı: rehber başlığı ve konuşanı söyler, kayıt çalar, sonra ilk seçenek okunur
      const secenekler = sahneSecenekleri(d, id);
      const sonra = () => secenekler.length && soyle(secenekler[0].etiket + (secenekler.length > 1 ? ', 1 / ' + secenekler.length : ''), 'istek', false);
      setTimeout(() => soyle([onEk, sahne.baslik, ok.kim + ' interkomda.'].filter(Boolean).join('. '), 'istek', true, false, () => {
        if (!kayitCal(ok.kayit, 1, sonra)) soyle(sahneMetni(d, id).join(' '), 'istek', true, false, sonra);
      }), 150);
    }
    katmanAc({
      sessizAc: !!(ok && kayitVarMi(ok.kayit)),
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

  // Merkez terminali açıkken kendi ortam sesi çalar (Murat, 1.14); terminalden açılan bütün menülerde sürer,
  // katman tamamen kapanınca mekânın ortamı geri gelir (katmanKapat → sesleriEsitle)
  const terminalAcik = useRef(false);
  const noktaGoster = (id, onEk) => {
    const d = dunya.current;
    const n = NOKTALAR[id];
    if (id === 'terminal' && !terminalAcik.current) {
      terminalAcik.current = true;
      ortamCal('ortam_terminal', 1);
    }
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
              frekansAc(r.amac);
              return 'sessiz';
            }
            if (r.valf) {
              katmanKapatSessiz();
              valfAc(id, r.amac);
              return 'sessiz';
            }
            if (r.rezonans) {
              katmanKapatSessiz();
              durakli.current = false;
              rezonansAc(id, r.rezonans);
              return 'sessiz';
            }
            if (r.kaplama) {
              const k = kaplamaBaslat(d);
              kaydet();
              if (k.vinc) {
                katmanKapatSessiz();
                vincAc();
                return 'sessiz';
              }
              cal('red', 0.7);
              noktaGoster(id, k.metin);
              return 'sessiz';
            }
            if (r.terazi) {
              katmanKapatSessiz();
              teraziAc(id);
              return 'sessiz';
            }
            if (r.tarla) {
              katmanKapatSessiz();
              tarlaGir(r.tarla);
              return 'sessiz';
            }
            if (r.tarimMenu) return tarimMenuGoster(r.tarimMenu, id), 'sessiz';
            if (r.agac) return agacGoster(r.agac, (soz) => noktaGoster(id, soz)), 'sessiz';
            if (r.opDevam && d.op) {
              katmanKapatSessiz();
              opAc([{ soz: 'Göreve dönüyorsun. ' + opDurum(d) }]);
              return 'sessiz';
            }
            // Aether Çekirdeği: altı yıldızın akoru
            if (r.akor && m()) NOBETLER.forEach((n, i) => setTimeout(() => m() && m().nota(n.akor[0], null, 0.45, 6), i * 260));
            // YGK asansörü: başka bir kata taşındın
            if (r.kapat) {
              katmanKapatSessiz();
              durakli.current = false;
              sesleriEsitle(true);
              soyle(r.metin, 'istek', true);
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
            if (r.yeniGemi) return yeniGemiGoster(), 'sessiz';
            if (r.filo) return filoGoster(), 'sessiz';
            if (id === 'hangar' && (e.id === 'in' || e.id.indexOf('bin_') === 0)) aracSesiEsitle();
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

  // Ağaç menüler (tonoflenya/zanaat.js: envanter, zanaat, ticaret, subaylar, ekol): uret(d) → { baslik, giris,
  // ogeler: [{ id, etiket, ipucu, alt(d) | yap(d) }], ikiParmak: { sag, sol, ses } }. Bir eylemden sonra menü
  // aynı satırda sessizce yenilenir, sonuç okunur.
  const agacGoster = (uret, geri, odak = 0, soz = null) => {
    const d = dunya.current;
    const mn = uret(d);
    const kendi = (o2, s2) => agacGoster(uret, geri, o2, s2);
    const ogeler = [
      ...mn.ogeler.map((o, i) => ({
        id: o.id,
        etiket: o.etiket,
        ipucu: o.ipucu,
        sec: () => {
          if (o.efekt) cal(o.efekt, 0.7);
          if (o.alt) {
            agacGoster(o.alt, () => kendi(i));
            return 'sessiz';
          }
          const r = (o.yap && o.yap(dunya.current)) || {};
          kaydet();
          if (r.ses) cal(EYLEM_SESI[r.ses] || r.ses, 0.8);
          if (r.efekt) setTimeout(() => cal(r.efekt, 0.8), 400);
          if (dunya.current.sahne) {
            katmanKapatSessiz();
            sahneGoster(dunya.current.sahne, r.metin || null);
            return 'sessiz';
          }
          // Harekât ya da savunma başladı: menü kapanır, oyun akar (bekleyen çatışma zamanIlerle'de başlar)
          if (r.kapat) {
            katmanKapat(r.metin || null);
            return 'sessiz';
          }
          if (o.geri) {
            geri(r.metin);
            return 'sessiz';
          }
          kendi(i, r.metin);
          return 'sessiz';
        },
      })),
      { id: 'geri', etiket: 'Geri', sec: () => (geri(), 'sessiz') },
    ];
    const ik = mn.ikiParmak;
    const sesler = mn.ogeler.map((o) => o.ses || null);
    katmanAc({
      // Satıra gelince durum sesi (komuta paneli: sisli, düşman, baskın, güvenli)
      onOdak: sesler.some(Boolean) ? (i) => sesler[i] && cal(sesler[i], 0.35) : null,
      ucParmak: mn.ucParmak ? () => soyle(mn.ucParmak(dunya.current), 'istek', true) : null,
      baslik: mn.baslik,
      giris: mn.giris,
      onGeri: () => geri(),
      ogeler,
      ilkOdak: Math.min(odak, ogeler.length - 1),
      sessizAc: !!soz,
      ikiParmak: ik
        ? (yon) => {
            const f = yon === 'sag' ? ik.sag : yon === 'sol' ? ik.sol : null;
            if (!f) return;
            if (ik.ses) cal(ik.ses, 0.7);
            agacGoster(f, geri);
          }
        : null,
    });
    if (soz) soyle(soz, 'istek', true);
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
          // "Niye yapayım?" kuralı: çıktının ne işe yaradığı tek cümlede
          etiket: t.ad + '. ' + Object.keys(t.cikti || {}).map((k) => degerCumlesi(k)).filter(Boolean).join(' ') + ' ' + t.durum,
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
  // dogrudan: menüden değil, iki parmakla yukarı kaydırarak açıldı; geri dönünce oyuna döner
  const katGezNo = useRef(null);
  const yerlerGoster = (dogrudan = false) => {
    const d = dunya.current;
    const liste = yerlerListesi(d);
    const geri = () => (dogrudan ? katmanKapat() : menuyuAc());
    katmanAc({
      baslik: 'Yerler',
      giris: (MEKANLAR[d.mekan] ? MEKANLAR[d.mekan].ad + ': ' : '') + (liste.length ? 'burada bildiğin ' + liste.length + ' yer ve kişi. Birini seç; oraya kendin yürürsün. Yolda ekrana dokunursan durursun. Yeni yerleri radarla bulursun.' : 'burada henüz bildiğin bir yer yok. Radarla ara.'),
      onGeri: geri,
      ogeler: [
        ...liste.map((y) => ({
          id: y.tur + y.id,
          etiket: y.ad + (y.uzaklik != null ? ', ' + y.uzaklik + ' metre' : ''),
          sec: () => {
            const r = otoBaslat(d, y);
            katmanKapat(r.metin);
            return 'sessiz';
          },
        })),
        { id: 'geri', etiket: dogrudan ? 'Oyuna dön' : 'Menüye dön', sec: () => (geri(), 'sessiz') },
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
        { id: 'egitim', etiket: 'Savaş eğitimi' + (egitimEksikMi(dunya.current) ? ', zorunlu, tamamlanmadı' : ''), ipucu: 'Temel kara ve uzay savaşı hareketleri. Tamamlanmadan o ortamdaki çatışmalara girilemez.', sec: () => (agacGoster((x) => egitimMenu(x), () => menuyuAc()), 'sessiz') },
        { id: 'yerler', etiket: 'Yerler', ipucu: 'Bir yer ya da kişi seç; oraya kendin yürürsün.', sec: () => (yerlerGoster(), 'sessiz') },
        ...(MEKANLAR[dunya.current.mekan] && MEKANLAR[dunya.current.mekan].tonoflenya ? [{ id: 'tharita', etiket: 'Tonoflenya haritası', ipucu: 'Beş kuşak; uzak bölgelere yolculuk.', sec: () => (tonoflenyaHaritasi(), 'sessiz') }] : []),
        { id: 'durum', etiket: 'Neredeyim', sec: () => (soyle(durumMetni(dunya.current), 'istek', true), 'sessiz') },
        { id: 'tasinan', etiket: 'Taşıdıkların ve hammadde', sec: () => (soyle(tasinanMetni(), 'istek', true), 'sessiz') },
        { id: 'koloni', etiket: 'Koloni', sec: () => (soyle(koloniMetni(dunya.current), 'istek', true), 'sessiz') },
        { id: 'murettebat', etiket: 'Mürettebat', sec: () => (murettebatGoster(), 'sessiz') },
        { id: 'envanter', etiket: 'Envanter', ipucu: 'Beş kategori; iki parmakla sağa kaydır: sonraki kategori. Çift dokun: eylem menüsü.', sec: () => (agacGoster((x) => ZN.envanterMenu(x, 0), () => menuyuAc()), 'sessiz') },
        ...(dunya.current.gemi ? [{ id: 'zanaat', etiket: 'Zanaat tezgâhları', ipucu: 'Gemideki dökümhane masası, aether laboratuvarı ve imbik ünitesi.', sec: () => (agacGoster((x) => ZN.zanaatMenu(x), () => menuyuAc()), 'sessiz') }] : []),
        ...(dunya.current.bayrak.tonoflenyaGoruldu ? [{ id: 'subaylar', etiket: 'Subaylar ve istasyonlar', sec: () => (agacGoster((x) => ZN.subayMenu(x), () => menuyuAc()), 'sessiz') }] : []),
        { id: 'komuta', etiket: 'Komuta ve Genişleme Paneli', ipucu: 'Bölge haritası, savunma hattı, ileri karakollar. İki parmakla sağa sola: sekme; üç parmakla dokun: en acil bölge.', sec: () => (agacGoster((x) => KM.panel(x, 'harita'), () => menuyuAc()), 'sessiz') },
        { id: 'hikaye', etiket: 'Hikâye çağrıları', ipucu: 'Karakterlerin telsiz çağrıları: bekleyenler ve bitenler.', sec: () => (agacGoster((x) => HK.hikayeMenu(x), () => menuyuAc()), 'sessiz') },
        { id: 'karakter', etiket: 'Karakter ağı, mekik ve itibar', ipucu: 'Kilit karakterler, Tether-Key mekiği, beş ana güç ve evren itibarı.', sec: () => (agacGoster((x) => KR.karakterMenu(x), () => menuyuAc()), 'sessiz') },
        ...(dunya.current.bayrak.tonoflenyaGoruldu ? [{ id: 'yan', etiket: 'Yan görevler ve itibar', ipucu: 'Otuz yan görev, bölgesel itibar, özel mürettebat.', sec: () => (agacGoster((x) => YN.yanMenu(x), () => menuyuAc()), 'sessiz') }] : []),
        { id: 'ekol', etiket: 'Yıldız Ekolü kıdemi', ipucu: 'Altı ekolde kıdem ve açılan kabiliyetler.', sec: () => (agacGoster((x) => ZN.ekolMenu(x), () => menuyuAc()), 'sessiz') },
        { id: 'harita', etiket: 'Uzay haritası', sec: () => (soyle(haritaMetni(), 'istek', true), 'sessiz') },
        ...(dunya.current.arac === 'col_tilkisi'
          ? [
              {
                id: 'fener',
                etiket: 'Sinyal feneri bırak',
                ipucu: 'Bulunduğun yere ötüp duran bir fener saplanır; Yerler menüsünden ona dönebilirsin.',
                sec: () => {
                  const r = fenerBirak(dunya.current);
                  kaydet();
                  cal(r.ses === 'red' ? 'red' : 'bip', 0.8);
                  sesleriEsitle(false);
                  katmanKapat(r.metin);
                  return 'sessiz';
                },
              },
            ]
          : []),
        ...(dunya.current.arac
          ? [
              {
                id: 'arac',
                etiket: ARACLAR[dunya.current.arac].ad + '\'dan in',
                sec: () => {
                  const r = aractanIn(dunya.current);
                  kaydet();
                  cal('tislama', 0.6);
                  aracSesiEsitle();
                  katmanKapat(r.metin);
                  return 'sessiz';
                },
              },
            ]
          : []),
        { id: 'zaman', etiket: 'Yıldız Zamanı', ipucu: 'Gün ve nöbet. Yürürken ekranın sağ üst köşesine çift dokun.', sec: () => (soyle(zamanMetni(dunya.current, zamanNotu(dunya.current)), 'istek', true), 'sessiz') },
        ...(dunya.current.bayrak.tonoflenyaGoruldu || (dunya.current.kronik || []).length ? [{ id: 'kronik', etiket: 'Tonoflenya kronikleri', ipucu: 'Kadim tarihçenin bulduğun bölümleri ve çağlar.', sec: () => (kronikGoster(), 'sessiz') }] : []),
        { id: 'kodeks', etiket: 'Evren Kütüphanesi', ipucu: 'Kodeks: buluntular, gözlemler, itibar kademesi.', sec: () => (kodeksGoster(), 'sessiz') },
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

  // Tonoflenya haritası (atlas): kuşaklar → bölgeler; seçilen bölgeye yolculuk (zaman akar, tehlikeler işler)
  const tonoflenyaHaritasi = (kusak) => {
    const d = dunya.current;
    const bas = bolgeSu(d);
    const liste = haritaListesi(d);
    if (!kusak) {
      katmanAc({
        baslik: 'Tonoflenya haritası',
        giris: 'Buradasın: ' + (bas ? BOLGELER[bas].ad : 'bilinmeyen bir yer') + '. Bir kuşak seç; bölgelerin yol süreleri ve rotaları okunur.',
        onGeri: () => menuyuAc(),
        ogeler: [...Object.keys(KUSAKLAR).map((k) => ({ id: k, etiket: KUSAKLAR[k] + ', ' + liste.filter((x) => x.kusak === k).length + ' bölge', sec: () => (tonoflenyaHaritasi(k), 'sessiz') })), { id: 'geri', etiket: 'Menüye dön', sec: () => (menuyuAc(), 'sessiz') }],
      });
      return;
    }
    katmanAc({
      baslik: KUSAKLAR[kusak],
      giris: 'Bir bölge seç; çift dokununca yola çıkarsın.',
      onGeri: () => tonoflenyaHaritasi(),
      ogeler: [
        ...liste
          .filter((x) => x.kusak === kusak)
          .map((x) => ({
            id: x.id,
            etiket: x.metin,
            sec: () => {
              if (x.burada || !x.yol) {
                soyle(x.metin, 'istek', true);
                return 'sessiz';
              }
              const r = seyahat(d, x.id);
              kaydet();
              if (r.ses) {
                cal('red', 0.6);
                soyle(r.metin, 'istek', true);
                return 'sessiz';
              }
              katmanKapatSessiz();
              sesleriEsitle(true);
              sahneGoster(d.sahne);
              return 'sessiz';
            },
          })),
        { id: 'geri', etiket: 'Kuşaklara dön', sec: () => (tonoflenyaHaritasi(), 'sessiz') },
      ],
    });
  };

  // Tonoflenya kronikleri (kadim tarihçe): bulunan bölümler okunur, bulunmayanların yeri söylenir; çağlar matrisi
  const kronikGoster = () => {
    const d = dunya.current;
    const l = kronikListesi(d);
    katmanAc({
      baslik: 'Tonoflenya kronikleri',
      giris: 'On bir bölümün ' + l.filter((k) => k.acik).length + ' tanesini buldun. Bölümler Tonoflenya\'da onları saklayan yerlerde dinlenir.',
      onGeri: () => menuyuAc(),
      ogeler: [
        ...l.map((k) => ({
          id: 'k' + k.no,
          etiket: k.no + '. ' + (k.acik ? k.baslik : 'Henüz bulunmadı'),
          ipucu: k.acik ? null : k.ipucu,
          sec: () => (soyle(k.acik ? kronikAc(d, k.no).metin : 'Bu bölüm: ' + k.ipucu, 'istek', true), 'sessiz'),
        })),
        {
          id: 'caglar',
          etiket: 'Tarihsel çağlar ve dönüm noktaları',
          sec: () => {
            katmanAc({
              baslik: 'Tarihsel çağlar',
              giris: 'Sekiz çağ; bulduğun bölümlere göre doluyor.',
              onGeri: () => kronikGoster(),
              ogeler: [...caglarListesi(d).map((c, i) => ({ id: 'c' + i, etiket: c.ad + (c.acik ? '' : ', kapalı'), sec: () => (soyle(c.metin, 'istek', true), 'sessiz') })), { id: 'geri', etiket: 'Kroniklere dön', sec: () => (kronikGoster(), 'sessiz') }],
            });
            return 'sessiz';
          },
        },
        { id: 'geri', etiket: 'Menüye dön', sec: () => (menuyuAc(), 'sessiz') },
      ],
    });
  };

  // Evren Kütüphanesi (Kodeks): dört salon, her kayıt bir ses imzasıyla (derin-uzay-kesifleri bölüm 5)
  const sesImzasi = (x) => {
    const s = m();
    if (!s) return;
    const f = x.frek || 262;
    [1, 1.25, 1.5, 2, 1.5, 1.25].forEach((k, i) => setTimeout(() => m() && m().nota(f * k, null, 0.6, 1.4), 300 + i * 600));
  };
  const kodeksGoster = () => {
    const d = dunya.current;
    const k = itibarKademesi(d);
    const kad = ITIBAR_KADEMELERI[k];
    katmanAc({
      baslik: 'Evren Kütüphanesi',
      giris: d.kodeks.length + ' kayıt. Evren itibarı ' + d.itibar + ', kademe ' + (k + 1) + ': ' + kad.ad + '. ' + (ITIBAR_KADEMELERI[k + 1] ? 'Sıradaki kademe ' + ITIBAR_KADEMELERI[k + 1].esik + ' itibarda.' : ''),
      onGeri: () => menuyuAc(),
      ogeler: [
        ...salonListesi(d).map((sl) => ({ id: sl.id, etiket: sl.ad + ': ' + sl.kayitlar.length + ' kayıt', sec: () => (salonGoster(sl.id), 'sessiz') })),
        { id: 'geri', etiket: 'Menüye dön', sec: () => (menuyuAc(), 'sessiz') },
      ],
    });
  };
  const salonGoster = (salonId) => {
    const d = dunya.current;
    const sl = salonListesi(d).find((x) => x.id === salonId);
    katmanAc({
      baslik: sl.ad,
      giris: sl.kayitlar.length ? 'Bir panoyu seç: kaydın ses imzası çalar, makalesi okunur.' : 'Bu salon henüz boş.',
      onGeri: () => kodeksGoster(),
      ogeler: [
        ...sl.kayitlar.map((x) => ({
          id: x.id,
          etiket: x.ad,
          sec: () => {
            sesImzasi(x);
            soyle(x.ad + '. ' + x.tarif, 'istek', true);
            return 'sessiz';
          },
        })),
        { id: 'geri', etiket: 'Kütüphaneye dön', sec: () => (kodeksGoster(), 'sessiz') },
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
    const kayit = kayitBul(d, x.id);
    d.telsizKayitlari.push({ kim: x.kim, metin: x.metin, kayit });
    cal('tislama', 0.3);
    telsizOku(x.kim, x.metin, kayit);
    kaydet();
    return true;
  };
  // Seslendirilmiş kayıt varsa rehber yalnız konuşanı söyler, sonra kişinin kendi sesi çalar
  const telsizOku = (kim, metin, kayit) => {
    if (kayit && kayitVarMi(kayit)) {
      soyle(kim + '.', 'istek', true, false, () => {
        if (!kayitCal(kayit, 1)) soyle(metin, 'istek', true);
      });
    } else soyle(kim + ': ' + metin, 'istek', true);
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
          sec: () => (telsizOku(x.kim, x.metin, x.kayit), 'sessiz'),
        })),
        { id: 'geri', etiket: 'Menüye dön', sec: () => (menuyuAc(), 'sessiz') },
      ],
    });
  };

  // --- Valf dengeleme (gaz bacası) ---
  const valfAc = (id, amac) => {
    const d = dunya.current;
    durakli.current = true;
    const r = valfBaslat(d, id, amac);
    if (m()) m().basincKur();
    setValfAcik(true);
    if (amac === 'mini_kompresor') {
      soyle('Yedek kompresör. Basınç yükseldikçe tıslama tizleşir. Kesik alarm başlayınca çift dokun: kompresörü devreye al. Erken açarsan boşa gider; geç kalırsan emniyet atar. Üç kez gerekir; şu ana dek ' + r.basari + '. İki parmakla çift dokun: çekil.', 'istek', true);
      return;
    }
    ortamCal(MEKANLAR.sirtlar.ortam, 0.4);
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
      if (d.valf.amac === 'mini_kompresor') soyle('Geç kaldın! Emniyet attı; basınç yeniden doluyor.', 'istek', true);
      else soyle('Geç kaldın! Baca patladı, sıcak gaz yüzüne çarptı. Kükürt maruziyeti yüzde ' + Math.round(d.zehir) + '. Basınç yeniden doluyor.', 'istek', true);
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
    if (!KAPILAR[kapiId]) return NOKTALAR[kapiId] ? { x: NOKTALAR[kapiId].x, y: NOKTALAR[kapiId].y } : { x: d.oyuncu.x, y: d.oyuncu.y };
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
      (tur === 'kalibre' ? 'Rezonatörü sütuna tutuyorsun. Sütun ' : tur === 'sifre' ? 'Rezonatörü yazıta tutuyorsun. Yazıt ' : 'Rezonatörü kapıya tutuyorsun. Kapı ') + r.dizi.length + ' notalık dizisini çalacak; dinle. Sonra yukarı ya da aşağı kaydırıp notayı seç, çift dokunup kapıya çal. Yukarı kaydırmak notayı inceltir. Dokun: diziyi yeniden çalar. İki parmakla çift dokun: kapıdan çekil.',
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
        sustur(false);
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
            if (dunya.current.sahne) {
              rezonansKapat();
              sahneGoster(dunya.current.sahne, r.metin);
            } else rezonansKapat(r.metin + ' Çift dokun: içeri gir.');
          }, 900);
        }
      },
    },
    { dokunmaBekle: true },
  );

  // --- Koloni olayları: üretim, montaj, nüfus (telsiz çağrısı olarak) ---
  const koloniOlaylari = (olaylar) => {
    const d = dunya.current;
    // Final görevi: sahne kapanınca operasyon ya da çatışma
    const fo = olaylar.find((x) => x.tur === 'op' || x.tur === 'savas');
    if (fo) {
      setKatman(null);
      if (fo.tur === 'op') opAc(fo.olaylar);
      else savasAc(fo.olaylar);
      return;
    }
    // Yıldız Zamanı: nöbet değişiminde o nöbetin yıldızının rezonans çanı (yönerge 4.B)
    const nb = olaylar.find((x) => x.tur === 'nobet');
    if (nb) {
      if (m()) nb.akor.forEach((f, i) => setTimeout(() => m() && m().nota(f, null, 0.5, 5), i * 180));
      if (!durakli.current) setTimeout(() => soyle(nb.nobetMetni, 'istek', false), 900);
    }
    if (olaylar.some((x) => x.hazir)) cal('tarim_hazir', 0.8);
    if (olaylar.some((x) => x.melez)) cal('tarim_melez', 0.8);
    // Yerel operasyonlar: acil uyarılar hemen söylenir, yeni operasyon telsiz çağrısıdır
    for (const o of olaylar.filter((x) => x.acil)) {
      soyle(o.metin, 'istek', true);
      if (o.tasindi) sesleriEsitle(true);
    }
    if (olaylar.some((x) => x.tur === 'miniBasladi')) {
      cal('telsiz_zil', 0.9);
      Haptics.selectionAsync().catch(() => {});
      if (!durakli.current) setTimeout(() => soyle('Telsiz çağrısı: yerel operasyon. Dinlemek için çift dokun.', 'istek', false), 700);
    }
    const sozler = olaylar.filter((o) => o.metin && !o.acil).map((o) => o.metin);
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
      giris: (onEk ? onEk + ' ' : '') + 'Nüfus ' + n.toplam + ', barınma ' + n.barinma + ', boşta ' + bosta(d) + '. Moral yüzde ' + d.koloni.moral + '. ' + moralMetni(d) + ' ' + kademeMetni(d),
      onGeri: () => noktaGoster('terminal'),
      ogeler: [
        ...ogeler,
        { id: 'istihdam', etiket: 'Subay istihdam et', ipucu: 'Boştaki bir kolonist gemi mürettebatına katılır.', sec: () => (istihdamGoster(), 'sessiz') },
        { id: 'yetenek', etiket: 'Kaptan yetenekleri', sec: () => (yetenekGoster(null, () => isGucuGoster()), 'sessiz') },
        { id: 'binalar', etiket: 'Binalar, sefer hazırlığı ve Ar-Ge masası', sec: () => (agacGoster((x) => binaMenu(x, TESISLER, GEZEGENLER), () => isGucuGoster()), 'sessiz') },
        { id: 'terraform', etiket: 'Terraforming katmanları', sec: () => (terraformGoster(), 'sessiz') },
        { id: 'bolgeler', etiket: 'Bölge arındırma durumu', sec: () => (bolgeGoster(), 'sessiz') },
        {
          id: 'ilac',
          etiket: 'Koloniye ilaç dağıt',
          ipucu: '10 doz sakinleştirici; moral artar.',
          sec: () => {
            const r = ilacDagit(d);
            kaydet();
            if (r.olmadi) cal('red', 0.6);
            isGucuGoster(r.metin);
            return 'sessiz';
          },
        },
        { id: 'geri', etiket: 'Terminale dön', sec: () => (noktaGoster('terminal'), 'sessiz') },
      ],
    });
  };

  // Kaptan yetenek ağacı (veri/yetenek.js)
  const yetenekGoster = (onEk, geri) => {
    const d = dunya.current;
    const don = geri || (() => gemiTerminali());
    katmanAc({
      baslik: 'Kaptan yetenekleri',
      giris: (onEk ? onEk + ' ' : '') + 'Harcanabilir sefer tecrübesi: ' + harcanabilir(d) + '. Her dalda sırayla açılır.',
      onGeri: don,
      ogeler: [
        ...yetenekListesi(d).map((x) => ({
          id: x.id,
          etiket: x.ad + '. ' + x.durum,
          ipucu: x.tarif,
          sec: () => {
            const r = yetenekAc(d, x.id);
            kaydet();
            if (r.ses) cal(EYLEM_SESI[r.ses] || r.ses, 0.8);
            yetenekGoster(r.metin, geri);
            return 'sessiz';
          },
        })),
        { id: 'geri', etiket: 'Geri', sec: () => (don(), 'sessiz') },
      ],
    });
  };
  const istihdamGoster = (onEk) => {
    const d = dunya.current;
    katmanAc({
      baslik: 'Subay istihdamı',
      giris: (onEk ? onEk + ' ' : '') + 'Mürettebat ' + d.murettebat.length + ' kişi. Boşta kolonist: ' + bosta(d) + '. Bir uzmanlık seç.',
      onGeri: () => isGucuGoster(),
      ogeler: [
        ...Object.keys(UZMANLIKLAR).map((k) => ({
          id: k,
          etiket: UZMANLIKLAR[k].ad + ': ' + UZMANLIKLAR[k].rol,
          sec: () => {
            const r = subayIstihdam(d, k);
            kaydet();
            if (r.ses) cal(EYLEM_SESI[r.ses] || r.ses, 0.8);
            istihdamGoster(r.metin);
            return 'sessiz';
          },
        })),
        { id: 'geri', etiket: 'Koloni yönetimine dön', sec: () => (isGucuGoster(), 'sessiz') },
      ],
    });
  };

  // Terraforming (terraform.js): her katmana yerel girdi teslim edilir; uzay girdisi görevden gelir
  const terraformGoster = (onEk) => {
    const d = dunya.current;
    katmanAc({
      baslik: 'Terraforming',
      giris: (onEk ? onEk + ' ' : '') + 'Dört yaşanabilirlik katmanı. Her biri yerel bir biyomdan malzeme ve bir uzay görevinden girdi ister.',
      onGeri: () => isGucuGoster(),
      ogeler: [
        ...terraformListesi(d).map((k) => ({
          id: k.id,
          etiket: k.ad + '. ' + k.durum,
          sec: () => {
            if (!k.teslim) {
              soyle(k.ad + '. ' + k.durum, 'istek', true);
              return 'sessiz';
            }
            const r = terraformTeslim(d, k.id);
            kaydet();
            if (r.ses) cal(EYLEM_SESI[r.ses] || r.ses, 0.8);
            terraformGoster(r.metin);
            return 'sessiz';
          },
        })),
        { id: 'geri', etiket: 'Koloni yönetimine dön', sec: () => (isGucuGoster(), 'sessiz') },
      ],
    });
  };
  const bolgeGoster = () => {
    const d = dunya.current;
    katmanAc({
      baslik: 'Bölge arındırma',
      giris: 'Her tehlikeli bölgenin karakol yerinde dört adım: keşif, izolasyon, stabilizasyon, ikmal karakolu.',
      onGeri: () => isGucuGoster(),
      ogeler: [
        ...bolgeListesi(d).map((b) => ({ id: b.id, etiket: b.durum, sec: () => (soyle(b.durum, 'istek', true), 'sessiz') })),
        { id: 'geri', etiket: 'Koloni yönetimine dön', sec: () => (isGucuGoster(), 'sessiz') },
      ],
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

  const yeniGemiGoster = (onEk) => {
    const d = dunya.current;
    katmanAc({
      baslik: 'Kızağa yeni gemi',
      giris: (onEk ? onEk + ' ' : '') + 'Gemi sınıfları. Kızak kademesi yetenler kızağa konur.',
      onGeri: () => noktaGoster('kizak'),
      ogeler: [
        ...yeniGemiSiniflari(d).map((x) => ({
          id: 's' + x.sinif,
          etiket: x.ad + '. ' + x.durum,
          sec: () => {
            const r = kizagaKoy(d, x.sinif);
            kaydet();
            if (r.ses) cal(r.ses === 'red' ? 'red' : r.ses, 0.8);
            if (r.ses === 'red') yeniGemiGoster(r.metin);
            else montajGoster(r.metin);
            return 'sessiz';
          },
        })),
        { id: 'geri', etiket: 'Kızağa dön', sec: () => (noktaGoster('kizak'), 'sessiz') },
      ],
    });
  };
  const filoGoster = (onEk) => {
    const d = dunya.current;
    katmanAc({
      baslik: 'Filo',
      giris: (onEk ? onEk + ' ' : '') + 'Kızaktaki gemi: ' + (d.gemi ? d.gemi.ad : 'yok') + '. Filodakiler aşağıda.',
      onGeri: () => noktaGoster('kizak'),
      ogeler: [
        ...(d.filo || []).map((g) => ({
          id: 'g' + g.sinif,
          etiket: g.ad,
          sec: () => {
            const r = aktifGemiSec(d, g.sinif);
            kaydet();
            if (r.ses) cal(r.ses === 'red' ? 'red' : r.ses, 0.8);
            filoGoster(r.metin);
            return 'sessiz';
          },
        })),
        { id: 'geri', etiket: 'Kızağa dön', sec: () => (noktaGoster('kizak'), 'sessiz') },
      ],
    });
  };

  // Yüzey aracı: binince motor sesi (profil araca göre), inince susar
  const aracSesiEsitle = () => {
    const d = dunya.current;
    if (!m()) return;
    if (d.arac && ARACLAR[d.arac] && ARACLAR[d.arac].motor) {
      m().motorKur(ARACLAR[d.arac].motor);
      m().motorAyar(1);
    } else m().motorSil();
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
      m().motorKur(d.gemi.motorSesi);
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
    aracSesiEsitle();
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
      } else if (o.tur === 'savas') {
        savasAc(o.olaylar);
        return;
      } else if (o.tur === 'op') {
        opAc(o.olaylar);
        return;
      } else if (o.tur === 'haber') {
        sozler.push(o.metin);
      } else if (o.tur === 'fenomen') {
        cal('el_kesif_zili', 0.9);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
        sozler.push(o.metin);
      } else if (o.tur === 'fenomenGitti') {
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
    return !!(d.uzay && o && o.id === d.gemi.odalar[0]);
  };

  const gemiTerminali = (onEk) => {
    const d = dunya.current;
    const o = odaSu(d);
    if (!o) return;
    const ogeler = [];
    if (o.id === d.gemi.odalar[0]) {
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
      ogeler.push({ id: 'yetenek', etiket: 'Kaptan yetenekleri', ipucu: 'Sefer tecrübesiyle dört dalda yetenek aç.', sec: () => (yetenekGoster(), 'sessiz') });
      // Evrensel savaş: filo destek yuvası ve kara refakatçisi (seçtikçe sıradakine geçer)
      if ((d.filo || []).length)
        ogeler.push({
          id: 'destek',
          etiket: 'Savaşta destek yuvası',
          ipucu: 'Seçince sıradaki yedek gemiye geçer.',
          sec: () => {
            d.destekNo = ((d.destekNo == null ? 0 : d.destekNo) + 1) % d.filo.length;
            const g = d.filo[d.destekNo];
            const x = SAVAS_DESTEK[g.sinif];
            kaydet();
            soyle('Destek yuvası: ' + g.ad + '. ' + (x ? x.ad + ': ' + x.tarif : ''), 'istek', true);
            return 'sessiz';
          },
        });
      if ((d.araclar || []).length)
        ogeler.push({
          id: 'tasima',
          etiket: 'Alt kızak ya da hangar: araç yükle',
          ipucu: 'Gezegen yüzeyindeki çatışmalarda araç ekibine eşlik eder.',
          sec: () => {
            const r = aracYukle(d);
            kaydet();
            if (r.ses === 'red') cal('red', 0.6);
            else cal('zincir', 0.6);
            soyle(r.metin, 'istek', true);
            return 'sessiz';
          },
        });
      const refler = Object.values(d.istasyonlar || {}).filter(Boolean);
      if (refler.length)
        ogeler.push({
          id: 'refakat',
          etiket: 'Kara çatışmasında refakatçi',
          ipucu: 'Seçince sıradaki subaya geçer; yeteneğiyle yanında savaşır.',
          sec: () => {
            const i = refler.findIndex((x) => (x.anahtar || x.id) === d.refakatci);
            const y = refler[(i + 1) % refler.length];
            d.refakatci = y.anahtar || y.id;
            kaydet();
            soyle('Refakatçi: ' + y.ad + '.', 'istek', true);
            return 'sessiz';
          },
        });
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
    } else if (o.ortam === 'ortam_reaktor') {
      // Reaktör odası: güç dağıtımı menüsü (belge bölüm 5)
      for (const k of Object.keys(GUC_DAGITIMLARI)) {
        const g = GUC_DAGITIMLARI[k];
        ogeler.push({
          id: 'guc_' + k,
          etiket: 'Güç: ' + g.ad + ((d.gemi.guc || 'dengeli') === k ? ', seçili' : ''),
          ipucu: g.tarif,
          sec: () => {
            const r = gucDagitimiSec(d, k);
            kaydet();
            cal('dugme', 0.6);
            gemiTerminali(r.metin);
            return 'sessiz';
          },
        });
      }
      ogeler.push({ id: 'reaktor', etiket: 'Reaktörü dinle', sec: () => (soyle('Reaktör sakin çalışıyor. Gövde yüzde ' + Math.round((d.gemi.govde / d.gemi.maxGovde) * 100) + ', kalkan ' + d.gemi.kalkan + '.', 'istek', true), 'sessiz') });
    } else if (o.ortam === 'ortam_revir') {
      ogeler.push({
        id: 'tarama',
        etiket: 'Tıbbi tarama',
        sec: () => (soyle('Mürettebat: ' + d.murettebat.map((u) => u.rol + ' ' + u.ad + ', stres ' + Math.round(u.stres || 0)).join('; ') + '. Herkes sağlıklı.', 'istek', true), 'sessiz'),
      });
      ogeler.push({ id: 'ranza', etiket: 'Ranzada dinlen', sec: () => (soyle('Bir süre uzanıyorsun. Monitörlerin düzenli bipleri seni uyuşturuyor.', 'istek', true), 'sessiz') });
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
        if (d.op) {
          opAc([{ soz: 'Operasyona dönüyorsun. ' + opDurum(d) }]);
          return;
        }
        const r = kenetlen(d);
        kaydet();
        // YGK feneri: Tonoflenya'ya hiper-sıçrama
        if (r.tonoflenya) {
          gemiModuKapat();
          cal('kalkis', 1);
          sahneGoster(d.sahne);
          return;
        }
        if (r.inis) {
          cal('hidrolik', 0.9);
          sahneGoster('inis');
          return;
        }
        if (r.ses) cal('red', 0.6);
        else cal('kilit', 0.8);
        if (r.op) {
          opAc([{ soz: r.metin + ' Operasyon sahası. Dokun: durum. İki parmakla çift dokun: operasyonu duraklat.' }, ...r.op]);
          return;
        }
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

  // --- Uzay operasyonu (uzay/operasyon.js): kulakla ve parmakla icra edilen adımlar ---
  const OP_SESI = { hamle: 'tislama', tik: 'tik' };
  const opAc = (olaylar) => {
    const d = dunya.current;
    const s = m();
    for (const id of Object.keys(calanlar.current)) if (id.indexOf('fener_') === 0) kaynakKapat(id);
    if (s) {
      s.dinleyici({ x: 0, y: 0, yon: 0 });
      s.boguk(false);
    }
    opRef.current = { acik: true, ses: {}, hedef: null, sonDx: 0, sonDy: 0 };
    setOpAcik(true);
    opOlaylari(olaylar);
    kaydet();
    if (!d.op) opKapat();
  };
  const opSesleriSil = () => {
    const s = m();
    const o = opRef.current;
    if (!s) return;
    if (o.hedef) s.sil(o.hedef);
    if (o.ses.telsiz) s.telsizSil();
    if (o.ses.basinc) s.basincSil();
    if (o.ses.terazi) s.teraziSil();
    o.hedef = null;
    o.ses = {};
  };
  const opKapat = (soz) => {
    opSesleriSil();
    opRef.current.acik = false;
    setOpAcik(false);
    const d = dunya.current;
    sesleriEsitle(true);
    if (d.sahne) sahneGoster(d.sahne);
    else if (soz) soyle(soz, 'istek', true);
  };
  const opOlaylari = (olaylar) => {
    const d = dunya.current;
    const s = m();
    const sozler = [];
    let bitti = false;
    for (const o of olaylar) {
      if (o.soz) sozler.push(o.soz);
      if (o.ses) cal(OP_SESI[o.ses] || o.ses, o.ses === 'tik' ? 0.4 : 0.85);
      if (o.nota && s) s.nota(o.nota.frek, null, 0.7, o.nota.sure);
      if (o.ton && s) o.ton.forEach((f, i) => setTimeout(() => m() && m().nota(f, null, 0.8, 0.6), 400 + i * 750));
      if (o.tehlike && s && yuklu.current.hamle) s.tek('hamle', { x: o.tehlike === 'sag' ? 8 : o.tehlike === 'sol' ? -8 : 0, y: o.tehlike === 'on' ? 10 : 2 }, 1);
      if (o.tehlike) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
      if (o.hasar) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
      if (o.adim) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      if (o.bitti || o.basarisiz) bitti = true;
    }
    if (sozler.length) soyle(sozler.join(' '), 'istek', true);
    if (bitti || !d.op) {
      kaydet();
      opKapat();
    }
  };
  const opSesEsitle = () => {
    const d = dunya.current;
    const s = m();
    if (!s || !d.op) return;
    // Gezegen yüzeyi: inişten sonra o gezegenin ortam sesi (opKapat sesleriEsitle ile oda sesine döner)
    const tanim = OPERASYONLAR[d.op.id];
    const yuzeyOrtami = tanim && tanim.ortam && d.op.adim >= tanim.ortamAdim ? tanim.ortam : null;
    if (yuzeyOrtami && calanOrtamAdi() !== yuzeyOrtami) ortamCal(yuzeyOrtami, 0.8);
    const x = opSes(d);
    const o = opRef.current;
    const anahtar = x.hedef ? 'op_hedef_' + d.op.adim : null;
    if (o.hedef && o.hedef !== anahtar) {
      s.sil(o.hedef);
      o.hedef = null;
    }
    if (anahtar) {
      if (!o.hedef) {
        o.hedef = anahtar;
        s.kaynak(anahtar, 'fener', { x: x.hedef.x, y: x.hedef.y }, null, x.hedef.frek);
      } else s.kaynak(anahtar, 'fener', { x: x.hedef.x, y: x.hedef.y });
    }
    if (x.telsiz) {
      if (!o.ses.telsiz) s.telsizKur();
      s.telsizAyar(x.telsiz.yakinlik, x.telsiz.kayma);
    } else if (o.ses.telsiz) s.telsizSil();
    if (x.basinc) {
      if (!o.ses.basinc) s.basincKur();
      s.basincAyar(x.basinc.b, x.basinc.alarm);
    } else if (o.ses.basinc) s.basincSil();
    if (x.terazi != null) {
      if (!o.ses.terazi) s.teraziKur(330);
      s.teraziAyar(ayakFrek(x.terazi), false);
    } else if (o.ses.terazi) s.teraziSil();
    if (x.motor != null && d.gemi) s.motorAyar(x.motor);
    o.ses = { telsiz: !!x.telsiz, basinc: !!x.basinc, terazi: x.terazi != null };
  };
  const opAdimi = () => {
    const d = dunya.current;
    opOlaylari(opIlerle(d, ADIM_MS / 1000));
    if (d.op) opSesEsitle();
  };
  const opVer = (g) => {
    const d = dunya.current;
    if (!d.op) return [];
    const r = opGirdi(d, g);
    opOlaylari(r);
    return r;
  };
  const opJest = useJestler(
    {
      onDokun: (parmak) => {
        const d = dunya.current;
        // Üç parmakla basma (mühür) adımı
        if (parmak >= 3 && opVer({ tur: 'dokun', parmak }).length) return;
        if (parmak >= 2 || !opVer({ tur: 'dokun', parmak: 1 }).length) if (d.op) soyle(opDurum(d), 'istek', true);
      },
      onCiftDokun: (parmak) => {
        const d = dunya.current;
        if (parmak >= 2) {
          if (opVer({ tur: 'cift2' }).length) return;
          kaydet();
          opKapat(d.op && (d.op.id.indexOf('tf') === 0 || d.op.id.indexOf('yan') === 0) ? 'Görev duraklatıldı. Görevin yerinde "Göreve dön" ile kaldığın yerden sürer.' : 'Operasyon duraklatıldı. Kokpitte çift dokununca kaldığın yerden sürer.');
          return;
        }
        if (d.bildirimler && d.bildirimler.length && bildirimDinle()) return;
        opVer({ tur: 'cift' });
      },
      onUzunBas: () => opVer({ tur: 'uzun' }),
      onKaydir: (yon, parmak) => opVer({ tur: 'kaydir', yon, parmak }),
      onKistirAc: () => opVer({ tur: 'ac' }),
      onSurukle: (mod, dx, dy) => {
        if (mod !== 'tek') return;
        const o = opRef.current;
        opVer({ tur: 'surukle', dx: dx - o.sonDx, dy: dy - o.sonDy });
        o.sonDx = dx;
        o.sonDy = dy;
      },
      onSurukleBitti: () => {
        opRef.current.sonDx = 0;
        opRef.current.sonDy = 0;
      },
      onDondur: (f) => opVer({ tur: 'dondur', f }),
    },
    { dokunmaBekle: true },
  );

  // --- Reaktif akustik savaş (uzay/savas.js) ---
  const SAVAS_SESI = { alarm: 'red', tik: 'tik' };
  const savasAc = (olaylar) => {
    const s = m();
    for (const id of Object.keys(calanlar.current)) if (id.indexOf('fener_') === 0) kaynakKapat(id);
    if (s) {
      s.dinleyici({ x: 0, y: 0, yon: 0 });
      s.boguk(false);
    }
    // Uzayda dolaşım sesleri geri plana; karada bulunulan yerin ortamı kısılarak sürer
    const ds = dunya.current.savas;
    if (ds && ds.ortam === 'kara') {
      const mk = MEKANLAR[dunya.current.mekan];
      if (mk && mk.ortam) ortamCal(mk.ortam, 0.3);
    } else ortamCal('ortam_uzay', 0.25);
    savasRef.current = { acik: true, dusman: false, kaynaklar: {}, zamanlar: [] };
    // 3.9: bu savaşın düşman, silah ve vuruş seslerini belleğe al
    if (ds) onYukle(savasSesListesi((ds.dusmanlar || []).map((x) => x.tur).concat(['yavru', 'saldiri_dronu', 'golge_dronu', 'golge_muhafizi']), ds.ortam === 'kara'));
    setSavasAcik(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
    savasOlaylari(olaylar);
  };
  const savasKapat = () => {
    const s = m();
    if (s) for (const id of Object.keys(savasRef.current.kaynaklar || {})) s.sil(id);
    // Zafer ya da yenilgi sesi bitsin diye oynatıcılar biraz sonra bırakılır
    setTimeout(() => {
      if (!savasRef.current.acik) bosalt();
    }, 8000);
    savasRef.current = { acik: false, dusman: false, kaynaklar: {} };
    setSavasAcik(false);
    kaydet();
    sesleriEsitle(true);
    const d = dunya.current;
    if (d.sahne) sahneGoster(d.sahne);
  };
  const savasOlaylari = (olaylar) => {
    const d = dunya.current;
    const s = m();
    const sozler = [];
    let bitti = false;
    let kayitli = false;
    for (const o of olaylar) {
      if (o.kayit && kayitVarMi(o.kayit)) {
        // Telsiz subayının kendi sesi; uyarı sesinin üstüne binmesin diye bir an sonra
        const k = o.kayit;
        setTimeout(() => { if (!kayitCal(k, 1)) soyle(o.soz, 'istek', false); }, 350);
        kayitli = true;
      } else if (o.soz) sozler.push(o.soz);
      if (o.ses === 'kilitTonu') {
        if (s) s.nota(1760, null, 0.7, 0.35);
        Haptics.selectionAsync().catch(() => {});
      } else if (o.ses) cal(SAVAS_SESI[o.ses] || o.ses, o.ses === 'tik' ? 0.4 : 0.9);
      // 3.9: sıralı savaş sesleri (geliş, hasar, ölüm, aşama, atış, vuruş); gecikmeli olanlar zamanlanır
      if (o.sesler) for (const x of o.sesler) {
        if (!x || !x.ad) continue;
        const duz = x.duzey == null ? 0.95 : x.duzey;
        if (x.gecikme) setTimeout(() => cal(x.ad, duz), x.gecikme);
        else cal(x.ad, duz);
      }
      if (o.hasar) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
      if (o.nota && s) s.nota(o.nota.frek, null, 0.6, o.nota.sure);
      if (o.uyari && s) {
        // Uyarı sesi (telegraph): silahın kendi sesi, düşmanın yanından
        const yan = { x: o.yon === 'sag' ? 8 : -8, y: 3 };
        // ElevenLabs uyarı sesleri; konumlu ek: düşmanın yanından kısa notalar
        cal(o.ses2 || (o.uyari === 'plazma' ? 'el_plazma_sarj' : o.uyari === 'torpido' ? 'el_torpido' : 'el_iyon'), 1);
        [660, 880].forEach((f, i) => setTimeout(() => m() && m().nota(f, yan, 0.4, 0.3), i * 300));
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
      }
      if (o.bitti) bitti = true;
      // 3.13: eğitim bitti, bekleyen gerçek çatışma başladı; onun seslerini belleğe al
      if (o.yeniSavas && d.savas) onYukle(savasSesListesi((d.savas.dusmanlar || []).map((x) => x.tur).concat(['yavru', 'saldiri_dronu', 'golge_dronu', 'golge_muhafizi']), d.savas.ortam === 'kara'));
    }
    if (sozler.length) {
      // Telsiz kaydı çalacaksa öteki sözler kayıt bitince okunur (rehber kaydı beklesin diye bir an sonra)
      if (kayitli) setTimeout(() => soyle(sozler.join(' '), 'istek', false), 450);
      else soyle(sozler.join(' '), 'istek', true);
    }
    if (bitti || !d.savas) savasKapat();
  };
  const savasAdimi = () => {
    const d = dunya.current;
    savasOlaylari(savasIlerle(d, ADIM_MS / 1000));
    const s = m();
    if (!s || !d.savas) return;
    const x = savasSes(d);
    // Her düşmanın konumlu motor ya da adım sesi; etkin hedef önde, ötekiler arka planda
    const ref = savasRef.current;
    if (!ref.kaynaklar) ref.kaynaklar = {};
    const simdi = {};
    for (const b of x.dusmanlar || []) {
      const id = 'savas_dusman_' + b.id;
      simdi[id] = true;
      s.kaynak(id, 'fener', { x: b.x, y: b.y }, null, b.frek);
      ref.kaynaklar[id] = true;
    }
    for (const id of Object.keys(ref.kaynaklar)) if (!simdi[id]) {
      s.sil(id);
      delete ref.kaynaklar[id];
    }
    ref.dusman = !!x.dusman;
  };
  const savasVer = (g) => {
    const d = dunya.current;
    if (!d.savas) return [];
    const r = savasGirdi(d, g);
    savasOlaylari(r);
    return r;
  };
  const savasJest = useJestler(
    {
      onDokun: (parmak) => {
        const d = dunya.current;
        if (!savasVer({ tur: 'dokun', parmak }).length && d.savas) soyle(savasDurumu(d), 'istek', true);
      },
      onCiftDokun: (parmak) => {
        const d = dunya.current;
        if (parmak >= 2) {
          if (d.savas) soyle(savasDurumu(d), 'istek', true);
          return;
        }
        savasVer({ tur: 'cift' });
      },
      onUzunBas: () => {
        const d = dunya.current;
        if (!d.savas) return;
        if (m()) m().nota(200 + d.savas.dusman.kalkanFrek * 8, null, 0.6, 1.2);
        soyle(savasDurumu(d), 'istek', true);
      },
      onKaydir: (yon, parmak) => savasVer({ tur: 'kaydir', yon, parmak }),
      onDondur: (f) => savasVer({ tur: 'dondur', f }),
    },
    { dokunmaBekle: false },
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


  // --- Tarım: ekim yatakları (tarim-ve-kseno-botanik bölüm 4) ---
  // 3.10 (Bahtiyar): vahanın parselleri tarım müziğini, sera binasının yatakları binanın ortamını çalar
  const tarlaOrtami = (y) => (y.ortam === 'vaha' ? 'ortam_tarim' : 'ortam_sera');
  const yatakDinlet = (y) => {
    const ses = yatakSesi(y);
    if (ses === 'olgun') {
      if (m()) m().nota(BITKILER[y.bitki].frek, null, 0.7, 3);
      cal('tarim_hazir', 0.6);
    } else if (ses === 'kuru') cal('tarim_kuru', 0.7);
    else if (ses === 'curuk') cal('tarim_curuk', 0.7);
    else if (ses === 'saglikli') cal('tarim_saglikli', 0.6);
    else cal('tik', 0.4);
  };
  const tarlaGir = (alan) => {
    const d = dunya.current;
    durakli.current = true;
    tarlaAc(d, alan);
    const y = tarlaYatak(d);
    ortamCal(tarlaOrtami(y), 0.8);
    setTarlaAcik(true);
    yatakDinlet(y);
    soyle(
      (alan === 'vaha' ? 'Vahanın parsellerindesin, ' : 'Ekim yataklarındasın, ') +
        yatakListesi(d, alan).length +
        ' yatak. Aşağı kaydır: sonraki yatak; iki parmakla sola kaydır: önceki. Dokun: yatağın durumu. İki parmakla üç kez yukarı ya da aşağı sürt: çapala. Basılı tut: tohum seç. Çift dokun: ek. İki parmakla saat yönünde çevir: suyu aç, tersine: kıs. Sağa ya da sola kaydır: sıcaklık. Yukarı kaydır: hasat. İki parmakla çift dokun: çık. ' +
        yatakMetni(d, y, d.tarla.i),
      'istek',
      true,
    );
  };
  const tarlaCik = () => {
    dunya.current.tarla = null;
    setTarlaAcik(false);
    durakli.current = false;
    kaydet();
    sesleriEsitle(true);
    soyle('Yataklardan çekildin.', 'istek', true);
  };
  const tarlaSonuc = (r) => {
    if (r.ses) cal(EYLEM_SESI[r.ses] || r.ses, 0.8);
    if (r.ses === 'hasat') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    else if (r.ses === 'capa') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
    else if (r.ses === 'ekme') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    if (r.metin) soyle(r.metin, 'istek', true);
    kaydet();
  };
  const tarlaGezSes = (fark) => {
    const d = dunya.current;
    const once = tarlaYatak(d);
    const metin = tarlaGez(d, fark);
    const y = tarlaYatak(d);
    if (y.ortam !== once.ortam) ortamCal(tarlaOrtami(y), 0.8);
    yatakDinlet(y);
    soyle(metin, 'istek', true);
  };
  const tarlaJest = useJestler(
    {
      onDokun: (parmak) => {
        if (parmak >= 2) sustur();
        else soyle(yatakMetni(dunya.current, tarlaYatak(dunya.current), dunya.current.tarla.i), 'istek', true);
      },
      onCiftDokun: (parmak) => {
        if (parmak >= 2) tarlaCik();
        else tarlaSonuc(tarlaEk(dunya.current));
      },
      onUzunBas: () => tarlaSonuc(tohumSec(dunya.current)),
      onKaydir: (yon, parmak) => {
        const d = dunya.current;
        if (parmak >= 2) {
          if (yon === 'yukari' || yon === 'asagi') tarlaSonuc(tarlaCapa(d));
          else tarlaGezSes(yon === 'sol' ? -1 : 1);
          return;
        }
        if (yon === 'asagi') tarlaGezSes(1);
        else if (yon === 'yukari') tarlaSonuc(tarlaHasat(d));
        else {
          const r = tarlaIsi(d, yon === 'sag' ? 1 : -1);
          cal(r.ses === 'isitici' ? 'dugme' : 'tislama', 0.4);
          Haptics.selectionAsync().catch(() => {});
          soyle(r.metin, 'istek', true);
        }
      },
      onDondur: (radyan) => {
        const su = tarlaVana(dunya.current, radyan);
        if (su == null) return;
        const simdi = Date.now();
        if (simdi - vanaZamani.current > 700) {
          vanaZamani.current = simdi;
          cal('tarim_vana', 0.6);
          Haptics.selectionAsync().catch(() => {});
        }
        if (su % 10 === 0) soyle('Su yüzde ' + su + '.', 'istek', true);
      },
    },
    { dokunmaBekle: true },
  );

  // --- Tarım: melezleme (bölüm 7: iki tohumun biyo-titreşimini tek harmonide birleştir) ---
  const melezAc = () => {
    const d = dunya.current;
    durakli.current = true;
    if (m()) {
      m().teraziKur(d.melez.ref);
      m().teraziAyar(melezFrek(d), false);
    }
    setMelezAcik(true);
    soyle('Rezonans yuvası. Kulaklığında iki biyo-titreşim: sabit olan birinci tohumun, öteki ikincinin. İki parmakla saat yönünde çevir: ikinci tonu incelt; tersine: kalınlaştır. Tek parmakla yukarı-aşağı sürükle: ince ayar. Tonlar birleşince titreşim durur; iki saniye kıpırdama. Dokun: durum. İki parmakla çift dokun: vazgeç.', 'istek', true);
  };
  const melezKapat = (soz) => {
    if (m()) m().teraziSil();
    dunya.current.melez = null;
    setMelezAcik(false);
    durakli.current = false;
    sesleriEsitle(true);
    if (soz) soyle(soz, 'istek', true);
  };
  const melezAdimi = () => {
    const d = dunya.current;
    const o = melezIlerle(d, ADIM_MS / 1000);
    if (o.includes('tamam')) {
      if (m()) m().teraziSil();
      cal('tarim_melez', 0.9);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      setMelezAcik(false);
      durakli.current = false;
      kaydet();
      sesleriEsitle(true);
      soyle('İki titreşim tek harmonide kaynaştı. Melez tohum kuluçka tüpünde; iki döngü sonra hazır.', 'istek', true);
      return;
    }
    if (!d.melez) return;
    if (m()) m().teraziAyar(melezFrek(d), false);
    if (o.includes('dengede')) Haptics.selectionAsync().catch(() => {});
    if (o.includes('yakin')) soyle('Tonlar yaklaşıyor.', 'istek', false);
  };
  const melezJest = useJestler(
    {
      onDondur: (radyan) => melezDondur(dunya.current, radyan),
      onSurukle: (mod, dx, dy) => {
        if (mod !== 'tek') return;
        const s = surukle.current;
        melezSurukle(dunya.current, -(dy - s.sonDy));
        s.sonDy = dy;
      },
      onSurukleBitti: () => {
        surukle.current = { aktif: false, dx: 0, dy: 0, sonDy: 0 };
      },
      onDokun: (parmak) => {
        if (parmak >= 2) sustur();
        else soyle(melezMetni(dunya.current), 'istek', true);
      },
      onCiftDokun: (parmak) => {
        if (parmak >= 2) melezKapat('Melezlemeden vazgeçtin; tohumlar ambarda.');
      },
    },
    { dokunmaBekle: true },
  );

  // --- Tarım: konsol menüleri ---
  const tarimMenuGoster = (tur, noktaId, onEk) => {
    const d = dunya.current;
    const yenile = (metin) => tarimMenuGoster(tur, noktaId, metin);
    const geri = { id: 'geri', etiket: 'Konsola dön', sec: () => (noktaGoster(noktaId), 'sessiz') };
    if (tur === 'isle') {
      katmanAc({
        baslik: 'Hasat işleme',
        giris: (onEk ? onEk + ' ' : '') + 'Mutfak, eczane ve biyo-dökümhane tarifleri. Hazır sefer erzaklarından biri her kalkışta gemiye yüklenir.',
        onGeri: () => noktaGoster(noktaId),
        ogeler: [
          ...islemeListesi(d).map((x) => ({
            id: x.id,
            etiket: x.ad + (x.hazir ? ', hazır ' + x.hazir : '') + (x.yeter && x.tesisVar ? '' : x.tesisVar ? ', hasat yetmiyor' : ', ' + ISLEME_TESISI[x.tesis] + ' yok'),
            ipucu: girdiMetniT(x.girdi) + '. ' + x.tarif,
            sec: () => {
              const r = isle(d, x.id);
              kaydet();
              if (r.ses) cal(EYLEM_SESI[r.ses] || r.ses, 0.8);
              yenile(r.metin);
              return 'sessiz';
            },
          })),
          geri,
        ],
      });
      return;
    }
    if (tur === 'isci') {
      const ogeler = [];
      for (const alan of ['sera', 'vaha']) {
        if (alan === 'vaha' && !d.bayrak.vahaBulundu) continue;
        yatakListesi(d, alan).forEach((y, i) => {
          ogeler.push({
            id: alan + i,
            etiket: (alan === 'vaha' ? 'Vaha, ' : '') + yatakAdi(y, i) + ': ' + (y.bitki ? BITKILER[y.bitki].ad.split(' (')[0] : 'boş') + ', ' + (y.isci ? 'kolonist var' : 'kolonist yok'),
            sec: () => {
              const r = isciDegistir(d, alan, i, bosta(d));
              kaydet();
              if (r.ses) cal('red', 0.6);
              yenile(r.metin);
              return 'sessiz';
            },
          });
        });
      }
      katmanAc({
        baslik: 'Kolonist ata',
        giris: (onEk ? onEk + ' ' : '') + 'Boşta kolonist: ' + bosta(d) + '. Bir yatağı seçtikçe sıradaki uzman atanır, sonunda geri çekilir. Atanan kolonist sular, ısıyı ayarlar, olgun ürünü toplar ve aynı tohumdan yeniden eker.',
        onGeri: () => noktaGoster(noktaId),
        ogeler: [...ogeler, geri],
      });
      return;
    }
    if (tur === 'kademe') {
      const k = kademeBilgi(d);
      katmanAc({
        baslik: 'Serayı genişlet',
        giris: (onEk ? onEk + ' ' : '') + tarimDurumu(d) + ' ' + k.metin + (k.s ? ' Maliyet: ' + (Object.keys(k.s.maliyet).length ? girdiMetni(k.s.maliyet) : 'yok') + '.' : ''),
        onGeri: () => noktaGoster(noktaId),
        ogeler: [
          ...(k.son
            ? []
            : [
                {
                  id: 'genislet',
                  etiket: 'Genişlet: ' + k.s.ad,
                  sec: () => {
                    const r = kademeYukselt(d, harca, yeterMi, girdiMetni);
                    kaydet();
                    if (r.ses) cal(EYLEM_SESI[r.ses] || r.ses, 0.8);
                    yenile(r.metin);
                    return 'sessiz';
                  },
                },
              ]),
          geri,
        ],
      });
      return;
    }
    if (tur === 'melez') {
      katmanAc({
        baslik: 'Melezleme',
        giris: (onEk ? onEk + ' ' : '') + (d.tarim && d.tarim.kulucka ? 'Kuluçkada: ' + BITKILER[d.tarim.kulucka.id].ad + '. ' : '') + 'İki uyumlu tohumu rezonans yuvasına koy, biyo-titreşimlerini tek harmonide birleştir; melez iki döngü kuluçkada bekler.',
        onGeri: () => noktaGoster(noktaId),
        ogeler: [
          ...melezListesi(d).map((h) => ({
            id: h.id,
            etiket: h.ad + (h.olur ? '' : ', tohum eksik'),
            ipucu: h.girdi + '. ' + BITKILER[h.id].kaynak,
            sec: () => {
              const r = melezBaslat(d, h.id);
              if (r.melez) {
                katmanKapatSessiz();
                melezAc();
                return 'sessiz';
              }
              cal('red', 0.6);
              yenile(r.metin);
              return 'sessiz';
            },
          })),
          geri,
        ],
      });
      return;
    }
    if (tur === 'ansiklopedi') {
      katmanAc({
        baslik: 'Bitki ansiklopedisi',
        giris: 'Yirmi bir tür: koloni ürünleri, yabani flora, kseno-bitkiler ve melezler. Her birinin ipucunda ortamı, süresi, istediği su ve sıcaklık, olgunluk sesi ve tohumunun nereden geldiği.',
        onGeri: () => noktaGoster(noktaId),
        ogeler: [...ansiklopedi().map((x) => ({ ...x, sec: () => (soyle(x.etiket + '. ' + x.ipucu, 'istek', true), 'sessiz') })), geri],
      });
    }
  };

  // --- Frekans ayarı ---
  const frekansAc = (amac) => {
    const d = dunya.current;
    durakli.current = true;
    ayarBaslat(d, amac);
    if (m()) m().telsizKur();
    ortamCal(MEKANLAR[d.mekan].ortam, 0.3);
    setAyarAcik(true);
    soyle('Frekans ayarı. Kulaklığında parazit. İçinde ince, kesik kesik bir ses ara. Parmağını yukarı ya da aşağı sürükle, ya da iki parmakla çevir: kanal değişir. Sağa ya da sola hızlı kaydır: ince ayar. Ses netleşince kıpırdama, kilitlenene kadar bekle. Dokun: kanalı söylerim. İki parmakla çift dokun: ayardan çık. ' + ayarMetni(d), 'istek', true);
  };

  const frekansKapat = (soz) => {
    if (m()) m().telsizSil();
    dunya.current.ayar = null;
    setAyarAcik(false);
    durakli.current = false;
    ortamCal(MEKANLAR[dunya.current.mekan].ortam, ortamOrani(dunya.current));
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
      onCiftDokun: (parmak, konum) => {
        if (parmak >= 2) {
          menuyuAc();
          return;
        }
        const d = dunya.current;
        // Sağ üst köşe: Yıldız Zamanı sorgusu (geliştirici yönergesi 4.B)
        if (konum && konum.y < 120 && konum.x > Dimensions.get('window').width - 140) {
          cal('bip', 0.5);
          soyle(zamanMetni(d, zamanNotu(d)), 'istek', true);
          return;
        }
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
        // Murat (1.19): iki parmakla yukarı kaydırma, yürürken başka işe yaramadığı için Yerler'i doğrudan açar
        else if (parmak >= 2 && yon === 'yukari') {
          cal('el_secim', 0.7);
          yerlerGoster(true);
        }
        // YGK Akademi katlarında iki parmakla sağa ya da sola: kattaki kişiler ve odalar arasında sırayla yürü (akademi belgesi bölüm 1)
        else if (parmak >= 2 && (yon === 'sag' || yon === 'sol')) {
          const d = dunya.current;
          if (!d.mekan || d.mekan.indexOf('ygk_') !== 0) return;
          const liste = yerlerListesi(d).filter((y) => y.tur !== 'kapi' && y.mekan === d.mekan);
          if (!liste.length) {
            soyle('Bu katta bildiğin bir yer yok. Radarla ara.', 'istek', true);
            return;
          }
          katGezNo.current = (((katGezNo.current == null ? -1 : katGezNo.current) + (yon === 'sag' ? 1 : -1)) % liste.length + liste.length) % liste.length;
          const y = liste[katGezNo.current];
          cal('el_secim', 0.6);
          const r = otoBaslat(d, y);
          soyle(y.ad + '. ' + (r.metin || ''), 'istek', true);
        }
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
      <View style={stiller.kap} {...(katman || ayarAcik || valfAcik || rezAcik || teraziAcik || tarlaAcik || melezAcik || vincAcik || gemiAcik || opAcik || savasAcik ? {} : jest)}>
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
      {savasAcik ? (
        <View style={[StyleSheet.absoluteFill, stiller.ayar]} {...savasJest}>
          <Text style={stiller.baslik}>Savaş duruşu</Text>
          <Text style={stiller.yazi}>Dokun: ateş. Uyarıda iki parmakla dokun: kalkan.</Text>
        </View>
      ) : null}
      {opAcik ? (
        <View style={[StyleSheet.absoluteFill, stiller.ayar]} {...opJest}>
          <Text style={stiller.baslik}>Operasyon</Text>
          <Text style={stiller.yazi}>Dokun: durum. İki parmakla çift dokun: duraklat.</Text>
        </View>
      ) : null}
      {teraziAcik ? (
        <View style={[StyleSheet.absoluteFill, stiller.ayar]} {...teraziJest}>
          <Text style={stiller.baslik}>Ayak dengeleme</Text>
          <Text style={stiller.yazi}>Yukarı-aşağı sürükle; iki ton birleşince dur</Text>
        </View>
      ) : null}
      {tarlaAcik ? (
        <View style={[StyleSheet.absoluteFill, stiller.ayar]} {...tarlaJest}>
          <Text style={stiller.baslik}>Ekim yatakları</Text>
          <Text style={stiller.yazi}>Aşağı kaydır: sonraki yatak. Dokun: durum.</Text>
        </View>
      ) : null}
      {melezAcik ? (
        <View style={[StyleSheet.absoluteFill, stiller.ayar]} {...melezJest}>
          <Text style={stiller.baslik}>Melezleme</Text>
          <Text style={stiller.yazi}>İki parmakla çevir; tonlar birleşince dur</Text>
        </View>
      ) : null}
      {katman ? (
        <View style={StyleSheet.absoluteFill}>
          <SesliListe key={'k' + katman.no} baslik={katman.baslik} giris={katman.giris} rehberAcik onGeri={katman.onGeri} ogeler={katman.ogeler} sessizAc={!!katman.sessizAc} ilkOdak={katman.ilkOdak || 0} onIkiParmak={katman.ikiParmak || null} onUcParmak={katman.ucParmak || null} onOdak={katman.onOdak || undefined} />
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
