// Seferde rastgele olaylar ve kararlar (savas-yetenek-ve-murettebat-mekanikleri.md bölüm 4.3), korsan karşılaşmaları
// (bölüm 1: uzayda tehditle karşılaşınca savaş duruşu) ve mürettebat nitelikleri (4.1: klostrofobik). Saf JavaScript.
//
// Seyir sürerken doksan saniyede bir yüzde otuz ihtimalle bir subay telsizden haber verir (üç tonlu zil): iyi haber,
// mekanik arıza, moral olayı ya da dış tehdit. Haber bir karar sahnesidir. Kırk beş saniyede bir, iki operasyon
// tamamlandıktan sonra yüzde on iki ihtimalle korsan saldırır.
import { savasBaslat, gorevli } from './savas';

export const HABER_SN = 90;
export const HABER_IHTIMAL = 0.3;
export const KORSAN_SN = 45;
export const KORSAN_IHTIMAL = 0.12;
const OLAY_SIRASI = ['ikmal', 'ariza', 'ortaklik', 'tehdit'];

function rastgele(d, i) {
  const x = Math.sin((d.tohum || 1) * 7.31 + i * 53.9) * 43758.5453;
  return x - Math.floor(x);
}
const ilk = (u) => (u ? u.ad.split(' ')[0] : '');
const yet = (d, id) => !!(d.kaptan.yetenekler && d.kaptan.yetenekler[id]);

function kim(d, gorevYeri, rol) {
  const u = gorevli(d, gorevYeri) || d.murettebat[rol];
  return u ? (gorevYeri + ' ' + ilk(u)) : gorevYeri;
}

export function seferIlerle(d, dt) {
  const u = d.uzay;
  const o = [];
  if (!u || d.savas || d.op || d.sahne) return o;
  if (d.olaySavas) {
    const t = d.olaySavas;
    d.olaySavas = null;
    u.hiz = 0;
    o.push({ tur: 'savas', olaylar: savasBaslat(d, t) });
    return o;
  }
  d.seferSure = (d.seferSure || 0) + dt;
  if (u.hizSiniri && d.seferSure > u.hizSiniri.bitis) {
    u.hizSiniri = null;
    o.push({ tur: 'haber', metin: 'Başçarkçı: valf soğudu; tam hız serbest.' });
  }
  if (u.hizSiniri && u.hiz > u.hizSiniri.en) u.hiz = u.hizSiniri.en;
  // Korsan karşılaşması
  d.korsanSayac = (d.korsanSayac || 0) + dt;
  if (d.korsanSayac >= KORSAN_SN) {
    d.korsanSayac = 0;
    d.korsanNo = (d.korsanNo || 0) + 1;
    if ((d.tamamlananOp || []).length >= 2 && u.hiz > 0 && rastgele(d, 900 + d.korsanNo) < KORSAN_IHTIMAL) {
      u.hiz = 0;
      o.push({ tur: 'savas', olaylar: savasBaslat(d, rastgele(d, 950 + d.korsanNo) < 0.5 ? 'korsan_korvet' : 'korsan_avci') });
      return o;
    }
  }
  // Klostrofobik mürettebat uzun seferde bunalır
  const kl = d.murettebat.find((x) => x.nitelik === 'klostrofobik' && Object.values(d.gemi.atamalar || {}).includes(x.id));
  if (kl && d.seferSure > 240 && !d.klostrofobiDendi) {
    d.klostrofobiDendi = true;
    kl.stres = Math.min(100, (kl.stres || 0) + 40);
    d.olay = { id: 'klostrofobi', uye: kl.ad };
    d.sahne = 'sefer_olay';
    o.push({ tur: 'olay' });
    return o;
  }
  // Haber nitelikli olaylar
  d.haberSayac = (d.haberSayac || 0) + dt;
  if (d.haberSayac >= HABER_SN) {
    d.haberSayac = 0;
    d.haberNo = (d.haberNo || 0) + 1;
    if (rastgele(d, d.haberNo) < HABER_IHTIMAL) {
      const id = OLAY_SIRASI[Math.floor(rastgele(d, 300 + d.haberNo) * OLAY_SIRASI.length)];
      d.olay = { id };
      d.sahne = 'sefer_olay';
      o.push({ tur: 'olay' });
    }
  }
  return o;
}

const OLAYLAR = {
  ikmal: {
    metin: (d) => [kim(d, 'Telsiz Subayı', 1) + ': "Kaptanım, yakındaki asteroit gölgesinde terk edilmiş bir ikmal mekiği sinyali yakaladım. Rotayı iki derece kaydırırsak sağlam yakıt kapsülleri alabiliriz."'],
    secenekler: (d) => [
      { etiket: 'Rotayı kaydır, kapsülleri al', yap: () => { d.gemi.yakit = Math.min(d.gemi.maxYakit, d.gemi.yakit + 10); d.olaySonuc = 'On litre yakıt ambarda.'; } },
      { etiket: 'Rotada kal', yap: () => { d.olaySonuc = 'Mekiği geride bıraktınız.'; } },
    ],
  },
  ariza: {
    metin: (d) => [kim(d, 'Başçarkçı', 0) + ': "Kaptanım! Sol plazma hattındaki rezonans valfi aşındı, motor dairesine gaz sızıyor. Ya hızı yarıya düşürmeliyiz ya da bir yedek parça yakıp valfi mühürlemeliyim!"'],
    secenekler: (d) => [
      { etiket: 'Hızı yarıya düşür (bir dakika)', yap: () => { d.uzay.hizSiniri = { en: 2, bitis: (d.seferSure || 0) + 60 }; d.olaySonuc = 'Hız iki kademeyle sınırlı, bir dakika.'; } },
      {
        etiket: 'Yedek parçayı yak (50 plaka)',
        yap: () => {
          if ((d.koloni.parcalar.plaka || 0) >= 50) {
            d.koloni.parcalar.plaka -= 50;
            d.olaySonuc = 'Valf mühürlendi; tam hız.';
          } else {
            d.uzay.hizSiniri = { en: 2, bitis: (d.seferSure || 0) + 60 };
            d.olaySonuc = 'Ambarda yedek plaka yok; hız bir dakika sınırlı.';
          }
        },
      },
    ],
  },
  ortaklik: {
    metin: (d) => [kim(d, 'Başhekim', 2) + ': "Kaptanım, madenci mürettebatla biyoloğumuz laboratuvarı paylaşma konusunda anlaştı; ortaklaşa yeni bir soğutucu alaşım geliştirdiler."'],
    secenekler: (d) => [{ etiket: 'Tebrik et', yap: () => { d.koloni.parcalar.helyum = (d.koloni.parcalar.helyum || 0) + 20; d.koloni.moral = Math.min(100, d.koloni.moral + 5); d.olaySonuc = 'Yirmi helyum tüpü; moral yükseldi.'; } }],
  },
  tehdit: {
    metin: (d) => [kim(d, 'Telsiz Subayı', 1) + ': "Kaptan! Sektör devriyesinden şifreli telsiz: bölgede korsan karartması başlamış. Sinyal kulesi rotamızı değiştirmemizi öneriyor."'],
    secenekler: (d) => [
      { etiket: 'Rotayı değiştir', yap: () => { d.uzay.yon += Math.PI / 2; d.olaySonuc = 'Rota doksan derece döndü; korsanlardan uzaklaştınız.'; } },
      { etiket: 'Rotada kal', yap: () => { d.olaySonuc = 'Rotada kaldınız. Ufukta motor sesleri!'; d.olaySavas = 'korsan_avci'; } },
    ],
  },
  klostrofobi: {
    metin: (d) => ['Başhekim: "Kaptanım, ' + d.olay.uye + ' daralıyor; uzun sefer ona ağır geliyor. Nefesi hızlandı, ellerini yumruk yapmış."'],
    secenekler: (d) => [
      {
        etiket: yet(d, 'B3') ? 'Filo lideri narası: telsizden sakinleştir' : 'Telsizden konuş, sakinleştir',
        yap: () => {
          if (yet(d, 'B3')) d.olaySonuc = 'Tek bir komutla soluğu düzeldi.';
          else {
            d.koloni.moral = Math.max(0, d.koloni.moral - 3);
            d.olaySonuc = 'Biraz rahatladı ama morali bozuk; haberi koloniye de ulaştı.';
          }
        },
      },
      { etiket: 'Eve dön', yap: () => { d.olaySonuc = 'Rotayı Aethelis\'e çevir; geniş koğuşta dinlenecek.'; } },
    ],
  },
};

export const SAHNELER = {
  sefer_olay: {
    baslik: 'Telsiz',
    efekt: ['telsiz_zil'],
    metin: (d) => (d.olay ? OLAYLAR[d.olay.id].metin(d) : []),
    secenekler: (d) =>
      d.olay
        ? OLAYLAR[d.olay.id].secenekler(d).map((x) => ({
            etiket: x.etiket,
            yap: () => {
              x.yap();
              d.olay = null;
            },
            sonra: 'sefer_sonuc',
          }))
        : [{ etiket: 'Devam', sonra: null }],
  },
  sefer_sonuc: {
    baslik: 'Telsiz',
    metin: (d) => [d.olaySonuc || ''],
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
  },
};
