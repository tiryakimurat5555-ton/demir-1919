// Karaköy: yeni oyunun dikey dilimi. Sesle serbest dolaşma, gece-gündüz, kişilerin günlük rutinleri,
// kapılar ve iç mekânlar; birinci görev "Sudaki Adam": nesneleri inceleme, konuşma ve sorgu,
// fotoğraf ve karanlık oda, antrepoda gizlilik, serbest soruşturma panosu, para ve itibar.
//
// Hareketler:
//   tek parmakla sürükleyip tut: yukarı ileri yürür, aşağı geri; sağa-sola döner (parmak ne kadar uzaksa o kadar hızlı)
//   dokun: çevrende ne var          çift dokun: kapıdan geç, eşyayı incele ya da yanındakiyle konuş
//   uzun bas: saat, yer, yön         iki parmakla dokun: sustur
//   iki parmakla çift dokun: menü (görev, pano, defter, envanter, bekle, ana menü)
// Menülerde (SesliListe): sağa-sola kaydır gez, çift dokun seç, iki parmakla çift dokun geri.
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useJestler } from '../arayuz/jestler';
import SesliListe from '../arayuz/SesliListe';
import { soyle, sustur } from '../ses/rehber';
import { cal, ortamCal } from '../ses/efektler';
import { RENK, UST_BOSLUK } from '../arayuz/tema';
import KonumsalSes from '../ses/konumsal';
import { MEKANLAR, SESLER } from '../oyun/karakoy/harita';
import { bekle, cevreMetni, durumMetni, etkiles, eylemUygula, ilerle, kisiler, saatMetni, tramvayYeri, yeniDunya } from '../oyun/karakoy/dunya';
import {
  DELILLER,
  delilAdi,
  dugum,
  envanterMetni,
  gorevIpucu,
  konusmaBasla,
  konusmaVarMi,
  nesneBul,
  nesneEylemleri,
  panoIfadeleri,
  sec,
  teoriKur,
  teoriSil,
} from '../oyun/karakoy/gorev1';

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
  'Parmağını ekrana koyup yukarı kaydır ve tut: ileri yürürsün. Aşağı: geri. Sağa ya da sola: dönersin. Parmak ne kadar uzaksa o kadar hızlı; birinin yakınında yavaş yürü. Dokun: çevrende ne var. Çift dokun: kapıdan geç, eşyayı incele ya da yanındakiyle konuş. Uzun bas: saat ve yerin. İki parmakla dokun: sustur. İki parmakla çift dokun: menü; görev, soruşturma panosu, defter ve bekleme orada.';

const ACILIS =
  '4 Aralık 1918, Çarşamba, şafaktan önce. Karaköy rıhtımı. Leventis vapurunun yanında bağrışmalar: hamallar sudan bir adam çıkarmış. Ateşçi Sabri. Süleyman Kaptan cesedin başında, doğu tarafında, birkaç adım ötende. Kulaklık tak. ';

function guc(piksel) {
  const p = Math.abs(piksel);
  if (p < OLU_BOLGE) return 0;
  return Math.sign(piksel) * Math.min(1, (p - OLU_BOLGE) / (TAM_GUC - OLU_BOLGE));
}

function ortamOrani(d) {
  if (d.mekan !== 'dis') return 0.9;
  return d.gece ? 0.35 : 0.55;
}

function delilDuyurusu(yeni) {
  if (!yeni || !yeni.length) return '';
  return ' Yeni delil: ' + yeni.map(delilAdi).join(', ') + '.';
}

export default function Karakoy({ onGeri }) {
  const motor = useRef(null);
  const dunya = useRef(yeniDunya());
  const surukle = useRef({ aktif: false, dx: 0, dy: 0 });
  const yuklu = useRef({});
  const calanlar = useRef({});
  const hazir = useRef(false);
  const durakli = useRef(false);
  const katmanNo = useRef(0);
  const [katman, setKatman] = useState(null); // { baslik, giris, ogeler, onGeri, no }
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
    if (suleyman && !suleyman.yuruyor && suleyman.mekan === 'dis' && suleyman.eylem === 'kayığını kalafatlıyor') kaynakAc('cekic', 'cekic', SESLER.cekic);
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

  // Olayların sözleri; sessizMi ise söylenmez, metin olarak döner
  const olaylariIsle = (olaylar, sessizMi = false) => {
    const d = dunya.current;
    const sozler = [];
    for (const o of olaylar) {
      if (o.tur === 'adim') {
        if (m()) m().adim();
      } else if (o.tur === 'carpti') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
        if (o.neden === 'su') sozler.push('Rıhtımın kenarı. Önün deniz.');
        else if (o.neden === 'sinir') sozler.push('Bu taraf bu denemede kapalı.');
        else sozler.push('Duvar.');
      } else if (o.tur === 'kapi') {
        Haptics.selectionAsync().catch(() => {});
        sozler.push(o.ad + ', saat ' + o.saat + ' yönünde. Çift dokun: geç.');
      } else if (o.tur === 'nesne') {
        Haptics.selectionAsync().catch(() => {});
        sozler.push(o.ad + ', saat ' + o.saat + ' yönünde. Çift dokun: incele.');
      } else if (o.tur === 'kisi') {
        sozler.push(o.ad + ', saat ' + o.saat + ' yönünde. ' + o.eylem + '.');
      } else if (o.tur === 'aksam') {
        sozler.push('Hava karardı. Rıhtımın fenerleri yanıyor.');
        ortamCal(MEKANLAR[d.mekan].ortam, ortamOrani(d));
      } else if (o.tur === 'sabah') {
        sozler.push('Gün ağarıyor.');
        ortamCal(MEKANLAR[d.mekan].ortam, ortamOrani(d));
      } else if (o.tur === 'saatBasi') {
        if (o.saat >= 7 && o.saat <= 21 && m() && yuklu.current.can) m().tek('can', SESLER.can, 0.9);
      } else if (o.tur === 'vapur') {
        if (m() && yuklu.current.vapur) m().tek('vapur', SESLER.vapur, 1);
      } else if (o.tur === 'yeniGun') {
        sozler.push('Gece yarısı. Yeni bir gün.');
      } else if (o.tur === 'cesetGitti') {
        sozler.push('Rıhtımdan araba tekerleri. Komiser Halim\'in adamları Sabri\'yi götürdü; kimsesizler mezarlığına.');
      } else if (o.tur === 'suphe') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
        sozler.push('Bekçinin adımları duruyor. Bir şey duydu. Kıpırdama.');
      } else if (o.tur === 'yakalandi') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
        sozler.push('Bir fener yüzüne vuruyor. Bekçi yakandan tutup seni arka kapıdan dışarı atıyor. Bu gece bir daha giremezsin; limanda da konuşulacak.');
        sesleriEsitle(true);
      }
    }
    if (sozler.length && !sessizMi) soyle(sozler.join(' '), 'istek', true);
    return sozler.join(' ');
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
      if (sayac % 10 === 0) setYazi('Saat ' + saatMetni(d.dakika) + ' · ' + (MEKANLAR[d.mekan].ad || 'Karaköy') + ' · ' + d.deliller.length + ' delil');
    }, ADIM_MS);
    return () => clearInterval(z);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    ortamCal(MEKANLAR.dis.ortam, ortamOrani(dunya.current));
    soyle(ACILIS + HAREKET_YARDIMI, 'istek', true);
    return () => {
      if (m()) m().durdur();
      ortamCal(null);
      sustur();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Katmanlar (menüler) ---
  const katmanAc = (k) => {
    durakli.current = true;
    surukle.current = { aktif: false, dx: 0, dy: 0 };
    katmanNo.current += 1;
    setKatman({ ...k, no: katmanNo.current });
  };
  const katmanKapat = (soz) => {
    durakli.current = false;
    setKatman(null);
    if (soz) soyle(soz, 'istek', true);
  };

  const beklet = (dakika) => {
    const d = dunya.current;
    const olaylar = bekle(d, dakika);
    sesleriEsitle(true);
    const ek = olaylariIsle(olaylar.filter((o) => o.tur !== 'kisi' && o.tur !== 'kapi'), true);
    katmanKapat('Bekledin. Saat ' + saatMetni(d.dakika) + '. ' + ek);
  };

  // Bir konuşma düğümünü gösterir. onEk: önceki cevabın metni
  const konusmaGoster = (kisiId, ad, dugumId, onEk = '') => {
    const d = dunya.current;
    const g = dugum(d, kisiId, dugumId);
    katmanAc({
      baslik: ad,
      giris: [onEk, g.metin].filter(Boolean).join(' '),
      onGeri: () => katmanKapat('Konuşmayı bitirdin.'),
      ogeler: g.secenekler.map((s) => ({
        id: 's' + s.i,
        etiket: s.etiket,
        sec: () => {
          const r = sec(d, kisiId, dugumId, s.i);
          if (r.yeniDeliller.length) cal('delil', 0.8);
          const cevap = r.metin + delilDuyurusu(r.yeniDeliller);
          if (d.bekleme) {
            const dk = d.bekleme;
            d.bekleme = 0;
            bekle(d, dk);
            sesleriEsitle(true);
          }
          if (r.sonra) konusmaGoster(kisiId, ad, r.sonra, cevap);
          else katmanKapat(cevap || null);
          return 'sessiz';
        },
      })),
    });
  };

  const nesneGoster = (id, onEk) => {
    const d = dunya.current;
    const n = nesneBul(id);
    const eylemler = nesneEylemleri(d, id);
    katmanAc({
      baslik: n.ad,
      giris: onEk || n.giris,
      onGeri: () => katmanKapat(),
      ogeler: [
        ...eylemler.map((e) => ({
          id: e.id,
          etiket: e.etiket,
          sec: () => {
            const r = eylemUygula(d, id, e.id);
            if (r.yeniDeliller && r.yeniDeliller.length) cal('delil', 0.8);
            if (r.ses === 'deklansor') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
            const olaySoz = olaylariIsle(r.olaylar || [], true);
            const metin = [r.metin + delilDuyurusu(r.yeniDeliller), olaySoz].filter(Boolean).join(' ');
            if ((r.olaylar || []).some((o) => o.tur === 'yakalandi')) katmanKapat(metin);
            else nesneGoster(id, metin);
            return 'sessiz';
          },
        })),
        { id: 'geri', etiket: 'Geri dön', sec: () => (katmanKapat(), 'sessiz') },
      ],
    });
  };

  // --- Soruşturma panosu ---
  const panoGoster = (onEk) => {
    const d = dunya.current;
    const ogeler = [
      {
        id: 'bagla',
        etiket: 'İki delili bağla',
        ipucu: 'Önce bir delil, sonra ikincisini seçersin; aralarındaki bağı kendin kurarsın.',
        sec: () => (d.deliller.length < 2 ? soyle('Bağlamak için en az iki delil gerekir.', 'istek', true) : delilSec(null), 'sessiz'),
      },
      ...d.teoriler.map((t, i) => ({
        id: 't' + i,
        etiket: t.ifade,
        ipucu: delilAdi(t.a) + ' ile ' + delilAdi(t.b) + '.',
        sec: () => (teoriGoster(t), 'sessiz'),
      })),
      { id: 'geri', etiket: 'Menüye dön', sec: () => (menuyuAc(), 'sessiz') },
    ];
    katmanAc({
      baslik: 'Soruşturma panosu',
      giris: (onEk ? onEk + ' ' : '') + (d.teoriler.length ? d.teoriler.length + ' teori iğneli.' : 'Pano boş.') + ' ' + d.deliller.length + ' delil.',
      onGeri: () => menuyuAc(),
      ogeler,
    });
  };

  const delilSec = (ilk) => {
    const d = dunya.current;
    const liste = d.deliller.filter((x) => x !== ilk);
    katmanAc({
      baslik: ilk ? 'İkinci delil' : 'Birinci delil',
      giris: ilk ? delilAdi(ilk) + ' ile neyi bağlayacaksın?' : 'Hangi delille başlıyorsun?',
      onGeri: () => panoGoster(),
      ogeler: liste.map((id) => ({
        id,
        etiket: delilAdi(id),
        ipucu: DELILLER[id].tarif,
        sec: () => (ilk ? ifadeSec(ilk, id) : delilSec(id), 'sessiz'),
      })),
    });
  };

  const ifadeSec = (a, b) => {
    const d = dunya.current;
    katmanAc({
      baslik: 'Bağ',
      giris: delilAdi(a) + ' ve ' + delilAdi(b) + '. Bunlar sana ne söylüyor?',
      onGeri: () => panoGoster(),
      ogeler: panoIfadeleri(d, a, b).map((ifade, i) => ({
        id: 'i' + i,
        etiket: ifade,
        sec: () => {
          const r = teoriKur(d, a, b, ifade);
          if (r.yeniTeori) cal('delil', 0.5);
          panoGoster(r.metin);
          return 'sessiz';
        },
      })),
    });
  };

  const teoriGoster = (t) => {
    katmanAc({
      baslik: 'Teori',
      giris: t.ifade + ' Dayanağı: ' + delilAdi(t.a) + ' ve ' + delilAdi(t.b) + '.',
      onGeri: () => panoGoster(),
      ogeler: [
        { id: 'kalsin', etiket: 'Panoda kalsın', sec: () => (panoGoster(), 'sessiz') },
        {
          id: 'sok',
          etiket: 'Panodan sök',
          ipucu: 'Yanlış olduğunu düşündüğün bir bağı kaldırırsın.',
          sec: () => (teoriSil(dunya.current, t.ifade), panoGoster('Teoriyi söktün.'), 'sessiz'),
        },
      ],
    });
  };

  const defterGoster = () => {
    const d = dunya.current;
    katmanAc({
      baslik: 'Defter',
      giris: d.deliller.length ? d.deliller.length + ' delil. Birini seçince tamamı okunur.' : 'Henüz delil yok.',
      onGeri: () => menuyuAc(),
      ogeler: [
        ...d.deliller.map((id) => ({
          id,
          etiket: delilAdi(id),
          sec: () => (soyle(delilAdi(id) + '. ' + DELILLER[id].tarif, 'istek', true), 'sessiz'),
        })),
        { id: 'geri', etiket: 'Menüye dön', sec: () => (menuyuAc(), 'sessiz') },
      ],
    });
  };

  const menuyuAc = () => {
    const d = dunya.current;
    katmanAc({
      baslik: 'Menü',
      giris: 'Saat ' + saatMetni(d.dakika) + '.',
      onGeri: () => katmanKapat('Devam.'),
      ogeler: [
        { id: 'devam', etiket: 'Devam et', sec: () => (katmanKapat('Devam.'), 'sessiz') },
        { id: 'gorev', etiket: 'Görev', ipucu: 'Şu an ne yapabileceğini söyler.', sec: () => (soyle(gorevIpucu(d), 'istek', true), 'sessiz') },
        { id: 'pano', etiket: 'Soruşturma panosu', ipucu: 'Delilleri bağla, teorilerini gözden geçir.', sec: () => (panoGoster(), 'sessiz') },
        { id: 'defter', etiket: 'Defter', ipucu: 'Topladığın deliller.', sec: () => (defterGoster(), 'sessiz') },
        { id: 'envanter', etiket: 'Üstündekiler', ipucu: 'Envanter, para ve itibar.', sec: () => (soyle(envanterMetni(d), 'istek', true), 'sessiz') },
        { id: 'yarim', etiket: 'Yarım saat bekle', sec: () => (beklet(30), 'sessiz') },
        { id: 'iki', etiket: 'İki saat bekle', sec: () => (beklet(120), 'sessiz') },
        { id: 'alti', etiket: 'Altı saat bekle', ipucu: 'Geceyi ya da günü geçirmek için.', sec: () => (beklet(360), 'sessiz') },
        { id: 'yardim', etiket: 'Hareketler', sec: () => (soyle(HAREKET_YARDIMI, 'istek', true), 'sessiz') },
        { id: 'cik', etiket: 'Ana menüye dön', ipucu: 'Bu denemede kayıt yok; Karaköy baştan başlar.', sec: () => (onGeri(), 'sessiz') },
      ],
    });
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
          soyle(e.metin + (d.mekan === 'antrepo' ? ' Burada yavaş yürü; bekçinin adımlarını dinle.' : ''), 'istek', true);
        } else if (e.tur === 'nesne') nesneGoster(e.id);
        else if (e.tur === 'konus' && !e.yuruyor && konusmaVarMi(e.kisiId)) konusmaGoster(e.kisiId, e.ad, konusmaBasla(d, e.kisiId));
        else soyle(e.metin, 'istek', true);
      },
      onUzunBas: () => soyle(durumMetni(dunya.current), 'istek', true),
    },
    { dokunmaBekle: true },
  );

  return (
    <View style={stiller.dis}>
      <View style={stiller.kap} {...(katman ? {} : jest)}>
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
  baslik: { color: RENK.yazi, fontSize: 26, fontWeight: '700', marginBottom: 12 },
  yazi: { color: RENK.soluk, fontSize: 17 },
});
