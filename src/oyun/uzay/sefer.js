// Seferde rastgele olaylar ve kararlar (savas-yetenek-ve-murettebat-mekanikleri.md bölüm 4.3), korsan karşılaşmaları
// (bölüm 1: uzayda tehditle karşılaşınca savaş duruşu) ve mürettebat nitelikleri (4.1: klostrofobik). Saf JavaScript.
//
// Seyir sürerken doksan saniyede bir yüzde otuz ihtimalle bir subay telsizden haber verir (üç tonlu zil): iyi haber,
// mekanik arıza, moral olayı ya da dış tehdit. Haber bir karar sahnesidir. Kırk beş saniyede bir, iki operasyon
// tamamlandıktan sonra yüzde on iki ihtimalle korsan saldırır.
import { kayitBul } from '../veri/seslendirme';
import { savasBaslat, gorevli } from './savas';
import { OPERASYONLAR } from '../veri/uzayGorevleri';
import { opBaslat as opBaslatF } from './operasyon';
import * as SB from '../tonoflenya/subay';

// --- Görev dışı rastgele karşılaşmalar (tonoflenya-ve-yeni-sistemler-gelistirici-yonergesi.md 5.B) ---
// Seyirde yetmiş beş saniyede bir yüzde yirmi beş ihtimalle: sürüklenen sandık (sesli kilit), astral fırtına
// (frekans tut: kalıcı aether verimi), kaçak mülteci filikası (kurtar: itibar ve iş gücü). Korsan pususu yukarıda.
// Karşılaşmalar tekrar eden operasyonlardır (tekrar: true): tamamlanan operasyon sayısına girmez.
export const KARSILASMA_SN = 75;
export const KARSILASMA_IHTIMAL = 0.25;
const A = (tur, ad, giris, bitis, ek) => ({ tur, ad, giris, bitis, ...(ek || {}) });
const SANDIK_GANIMETI = [
  { kaynak: { saf_aether: 1, kristal: 3 }, metin: 'Bir saf aether taşı ve üç silikat kristali.' },
  { kaynak: { zhaor_prizmasi: 1 }, metin: 'Bir Zhaor gümüş prizması.' },
  { tohum: ['kar_lalesi', 'zaman_tozu'], metin: 'Buzlu bir çekmece: iki nadir tohum.' },
  { kaynak: { isik_tozu: 150 }, metin: 'Yüz elli gram Fenrir ışık tozu.' },
];
OPERASYONLAR.k_sandik = {
  tekrar: true,
  adimlar: [
    A('yaklas', 'Sandığa yaklaş', 'Boşlukta yavaşça dönen bir kargo kapsülünün tıkırtısı. Sesi iki kulakta eşitle; yukarı kaydırıp sokul.', 'Kapsül burnunda; kilit panelinin üç notası duyuluyor.', { mesafe: 40 }),
    A('ton', 'Sesli kilidi aç', 'Basılı tut: kilit dört tonunu çalar. Sonra sırayla: kalın aşağı kaydır, tiz yukarı kaydır, orta çift dokun.', 'Kilit çözüldü; kapak tıslayarak açılıyor.', { n: 4 }),
  ],
  sonuc: (d) => ['Sürüklenen sandık ambarda. ' + (d.sandikMetni || '')],
  odulFn: (d) => {
    const g = SANDIK_GANIMETI[(d.karsilasmaNo || 0) % SANDIK_GANIMETI.length];
    const kat = SB.kabiliyet(d, 'uma', 4) ? 2 : 1;
    d.sandikMetni = g.metin + (kat > 1 ? ' Altın gece: iki katı.' : '');
    const kaynak = {};
    if (g.tohum) {
      if (d.tarim) for (const t of g.tohum) d.tarim.tohumlar[t] = (d.tarim.tohumlar[t] || 0) + kat;
      else kaynak.tohum = 2 * kat;
    }
    for (const k of Object.keys(g.kaynak || {})) kaynak[k] = g.kaynak[k] * kat;
    return { kaynak, itibar: 5 };
  },
};
OPERASYONLAR.k_firtina = {
  tekrar: true,
  adimlar: [
    A('frekans', 'Fırtınanın rezonansını tut', 'Manyetik girdap kalkanları zorluyor. İki parmakla çevir: fırtınanın uğultusunun içindeki ince tonu bul ve tut.', 'Kalkanlar fırtınanın frekansına oturdu; aether akımı motorlara aktı.'),
  ],
  sonuc: (d) => ['Astral fırtına dindi. Motorların aether verimi kalıcı olarak arttı: yakıt tüketimi yüzde ' + Math.round(((d.gemi && d.gemi.aetherVerimi) || 0) * 100) + ' az.'],
  odulFn: (d) => {
    if (d.gemi) d.gemi.aetherVerimi = Math.min(0.25, (d.gemi.aetherVerimi || 0) + 0.05);
    return { itibar: 5 };
  },
};
OPERASYONLAR.k_multeci = {
  tekrar: true,
  adimlar: [
    A('yaklas', 'Filikaya yaklaş', 'Zayıf, kesik bir imdat sinyali. İki kulakta eşitle; yukarı kaydırıp yavaşça sokul.', 'Filika burnunda; içeriden vuruşlar.', { mesafe: 45 }),
    A('tut', 'Çekme kirişi', 'Basılı tut: filikayı ambara çek.', 'Filika ambarda; mahsur kalan yolcular sarsılmış ama canlı.'),
  ],
  sonuc: (d) => ['Kaçak yolcular kurtarıldı. ' + (d.multeciMetni || '')],
  odulFn: (d) => {
    // Tonoflenya'daysa kantonlara yerleşir (itibar ve lira), değilse koloniye (iş gücü)
    if (d.gemi && d.gemi.liman === 'tonoflenya') {
      if (!d.para) d.para = { ml: 0, gk: 0 };
      d.para.ml += 100;
      d.multeciMetni = 'Doğu kantonlarına yerleştiler; kanton meclisi yüz lira teşekkür gönderdi.';
      return { itibar: 30 };
    }
    d.multeciMetni = 'Üç kişi Aethelis-IV\'e yerleşmeye gönüllü: koloninin nüfusu ve iş gücü arttı.';
    return { nufus: 3, itibar: 15, moral: 3 };
  },
};
const KARSILASMALAR = ['sandik', 'firtina', 'multeci'];

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
  // Rastgele karşılaşmalar (sandık, fırtına, mülteci)
  if (d.olayOp) {
    const id = d.olayOp;
    d.olayOp = null;
    u.hiz = 0;
    o.push({ tur: 'op', olaylar: opBaslatF(d, id) });
    return o;
  }
  d.karsilasmaSayac = (d.karsilasmaSayac || 0) + dt;
  if (d.karsilasmaSayac >= KARSILASMA_SN) {
    d.karsilasmaSayac = 0;
    d.karsilasmaNo = (d.karsilasmaNo || 0) + 1;
    const ihtimal = KARSILASMA_IHTIMAL * (d.gemi && d.gemi.moduller.sinha_sonari ? 1.5 : 1);
    if (u.hiz > 0 && rastgele(d, 1700 + d.karsilasmaNo) < ihtimal) {
      const id = KARSILASMALAR[Math.floor(rastgele(d, 1800 + d.karsilasmaNo) * KARSILASMALAR.length)];
      d.olay = { id: 'k_' + id };
      d.sahne = 'sefer_olay';
      o.push({ tur: 'olay' });
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

// Seslendirilmiş olay konuşması: konuşan öncüyse { kayit, kim } (önce rehber kim'i söyler, sonra kayıt çalar)
const OLAY_KONUSAN = { ikmal: ['Telsiz Subayı', 1], ariza: ['Başçarkçı', 0], ortaklik: ['Başhekim', 2], tehdit: ['Telsiz Subayı', 1] };
export function olayKaydi(d) {
  if (!d.olay || !OLAY_KONUSAN[d.olay.id]) return null;
  const [yer, rol] = OLAY_KONUSAN[d.olay.id];
  const u = gorevli(d, yer) || d.murettebat[rol];
  const kayit = kayitBul(d, 'sefer_' + d.olay.id, u);
  return kayit ? { kayit, kim: yer + ' ' + ilk(u) } : null;
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
  k_sandik: {
    metin: (d) => [kim(d, 'Telsiz Subayı', 1) + ': "Kaptanım, sensörlerde boşlukta sürüklenen terk edilmiş bir kargo kapsülü. Kilidi sesli; açabilirsek içinde bir şeyler olabilir."'],
    secenekler: (d) => [
      { etiket: 'Sandığa yaklaş, kilidi aç', yap: () => { d.olayOp = 'k_sandik'; d.olaySonuc = 'Rota sandığa.'; } },
      { etiket: 'Geç', yap: () => { d.olaySonuc = 'Sandık karanlıkta kayboldu.'; } },
    ],
  },
  k_firtina: {
    metin: (d) => [kim(d, 'Telsiz Subayı', 1) + ': "Kaptan! Önümüzde manyetik bir girdap, astral fırtına. Kalkanlar zorlanacak; ama frekansını tutturursak aetherini motorlara alabiliriz."'],
    secenekler: (d) => [
      { etiket: 'Fırtınaya gir, frekansı tut', yap: () => { d.olayOp = 'k_firtina'; d.olaySonuc = 'Kalkanlar fırtınaya açılıyor.'; } },
      {
        etiket: 'Fırtınanın çevresinden dolan',
        yap: () => {
          if (d.gemi) d.gemi.govde = Math.max(1, d.gemi.govde - Math.round(d.gemi.maxGovde * 0.05));
          d.olaySonuc = 'Kenarından geçerken bir dalga gövdeyi sıyırdı: yüzde beş hasar.';
        },
      },
    ],
  },
  k_multeci: {
    metin: (d) => [kim(d, 'Telsiz Subayı', 1) + ': "Kaptanım, kesik bir imdat sinyali: küçük bir filika, içinde mahsur yolcular. Yakıtları bitmiş."'],
    secenekler: (d) => [
      { etiket: 'Kurtar', yap: () => { d.olayOp = 'k_multeci'; d.olaySonuc = 'Filikaya dönüyorsun.'; } },
      { etiket: 'Konumlarını sektör devriyesine bildir', yap: () => { d.itibar += 3; d.olaySonuc = 'Devriye yola çıktı; yolcular kurtarılacak.'; } },
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
