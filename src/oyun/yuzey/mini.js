// Yerel mini görevler (belgeler/gezegen-gelisimi-ve-yerel-gorevler-v2.md bölüm 8). Saf JavaScript.
//
// Koloni büyüdükçe telsizden dinamik operasyonlar gelir. Aynı anda bir tane sürer; biri bitince bir süre sonra
// koşulu sağlanan sıradaki gelir. Her biri belgedeki sırayla:
//   8.1.1 Fotonik mantar hasadı: olgun kristaller çınlar; olmamışı toplanmaz, aşırı olgunu spor döker. Spor yoğunluğu
//         yükselir; yüzde yüzde hekim seni dışarı çıkarır, toplananlar kaybolur. Üç kristal terminalden laboratuvara.
//   8.1.2 Kriyojenik vana donması: dört boru bağlantısından birinden kaçak tıslaması gelir; doğrusunu bulup termal
//         meşaleyle mühürle (polimer levha).
//   8.1.3 Obsidyen çölünde kayıp keşif ekibi: manyetik parazit radarı kör eder; ekibin korna sesini izle.
//   8.1.4 Vaha su kanalı tıkanması: bentte sonik patlatıcının frekansını kayanın rezonansına ayarla (frekans ayarı).
//   8.2.1 Akademide çeviri krizi: iki uzmanı dinle, iki anlatıyla da çelişmeyen sentezi seç (akademi gerekir).
//   8.2.2 Metan kubbesinde basınç düşüşü: üç yedek kompresörü sırayla çalıştır (valf dengeleme; kseno-habitat gerekir).
//   8.3.1 Kör solucan göç dalgası: sürü sırtların maden ocaklarına yürüyor; süre dolmadan üç frekans kazığı dik.
//   8.3.2 Vanguard enkazında yağmacı tuzağı: korsanlara sessizce yaklaş (yavaş yürü), kesiciyle sersemlet;
//         hızlı yürürsen dikkatleri artar, alarm verirlerse kaçarlar.
import { KAPILAR, NOKTALAR } from './harita';

export const MINI_BEKLEME = 150; // bir operasyon bitince sıradakine kadar (sn)
export const SPOR_HIZI = 1.4; // mantar ormanında, operasyon sürerken (yüzde/sn)
export const SOLUCAN_SURE = 150;
export const DIKKAT_ESIK = 100;

const ilkAd = (d, rol) => (d.murettebat[rol] ? d.murettebat[rol].ad.split(' ')[0] : '');
const gorulen = (d, m) => (d.gorulenMekanlar || []).includes(m);
const bina = (d, id) => d.koloni.binalar.includes(id);

export const MINI = {
  mantar_hasadi: {
    ad: 'Fotonik Mantar Hasadı',
    rol: 2,
    kosul: (d) => gorulen(d, 'mantar') && bina(d, 'biyo_kubbe'),
    cagri: () =>
      'Kaptan, mantar ormanı spor dökme dönemine girdi. Fotonik kristaller olgunlaşıyor; olgun olanlar ince ince çınlar. Spor yoğunluğu artmadan üç olgun kristal topla, laboratuvara getir. Olmamışı koparma, çürümüşe dokunma.',
    ipucu: (d) => (d.mini.toplanan >= 3 ? 'Üç kristal elinde: kapsül terminalinden laboratuvara teslim et.' : 'Mantar ormanında çınlayan olgun kristalleri topla: ' + (d.mini.toplanan || 0) + ' / 3. Spor yüzde ' + Math.round(d.mini.spor || 0) + '.'),
    tamam: () => ['Kristaller laboratuvarda. Biyologlar onları kubbenin aydınlatma hatlarına işliyor; koridorlarda yumuşak, yeşil bir ışık.', 'Foton reçinesi +4, moral +5.'],
  },
  vana_donmasi: {
    ad: 'Kriyojenik Vana Donması',
    rol: 0,
    kosul: (d) => gorulen(d, 'kriyo'),
    cagri: () =>
      'Kaptan, metan mağarasındaki ana yakıt hattı soğuktan çatladı! Dört bağlantıdan biri kaçırıyor. Tıslamayı dinle, doğru bağlantıyı bul ve termal meşaleyle mühürle. Beş polimer levha yeter.',
    ipucu: () => 'Metan mağarasında kaçak tıslamasını bul; termal meşaleyle mühürle (5 polimer levha).',
    tamam: () => ['Meşalenin mavi alevi çatlağı kapatıyor; tıslama kesiliyor. Hat yeniden basınç tutuyor.', 'Sıvı metan +3, itibar +10.'],
  },
  kayip_ekip: {
    ad: 'Obsidyen Çölünde Kayıp Keşif Aracı',
    rol: 1,
    kosul: (d) => gorulen(d, 'obsidyen'),
    cagri: () =>
      'Kaptan, obsidyen ovasındaki keşif ekibinden haber alamıyoruz! Manyetik parazit rotalarını şaşırtmış; radar orada işe yaramıyor. Araçlarının kornasını çalıyorlar. Camın yankıları arasından kornayı izle.',
    ipucu: () => 'Obsidyen ovasında kayıp ekibin korna sesini izle. Radar parazitte kör.',
    tamam: () => ['Kornanın sahibi üç kişilik bir ekip; araçları camlaşmış bir yarığa saplanmış. Onları yola çıkarıyorsun.', 'Ekip koloniye katıldı: nüfus +2, moral +5.'],
  },
  vaha_kanali: {
    ad: 'Vaha Su Kanalı Tıkanması',
    rol: 2,
    kosul: (d) => !!d.bayrak.vahaBulundu,
    cagri: () =>
      'Kaptan, vahanın kaynağı kaya kaymasıyla tıkandı; su kesildi! Bentteki kayayı sonik patlatıcıyla parçalamak gerek, ama vadiye zarar vermeden: patlatıcının frekansını kayanın kendi rezonansına ayarla.',
    ipucu: () => 'Vahadaki bentte sonik patlatıcının frekansını kayanın rezonansına ayarla.',
    tamam: () => ['Kaya kendi frekansında ince bir çatırtıyla dağılıyor; su yeniden şırıldıyor. Otlar bir gecede kendine geliyor.', 'Moral +5; vahanın tohumları yeniden olgun.'],
  },
  ceviri_krizi: {
    ad: 'Akademi Kütüphanesinde Çeviri Krizi',
    rol: 1,
    kosul: (d) => bina(d, 'akademi'),
    cagri: () =>
      'Kaptan, akademide gergin bir tartışma var. Tapınaktan getirilen metinlerle Kaelith tarihi çelişiyor; iki taraf da birbirini sahtekârlıkla suçluyor. Terminalden kütüphaneye bağlan, ikisini de dinle.',
    ipucu: () => 'Kapsül terminalinden akademideki çeviri tartışmasını dinle.',
    tamam: (d) => (d.mini.sonuc === 'dogru' ? ['İki taraf da sentezi kabul ediyor. Akademinin ortak tarihi yazılıyor.', 'İtibar +15, moral +5.'] : ['Sentez taraflardan birini haksız çıkardı; tartışma kapanmadı ama kütüphane yeniden çalışıyor.', 'Moral -5.']),
  },
  basinc_dususu: {
    ad: 'Metan Kubbesinde Basınç Düşüşü',
    rol: 2,
    kosul: (d) => bina(d, 'kseno_habitat'),
    cagri: () =>
      'Kaptan, kseno-habitat kubbesinde basınç düşüyor! İçerideki canlılar boğuluyor. Kapsülün güneyindeki üç yedek kompresörü elle çalıştır; her birinde basıncı dinle, tam zamanında aç.',
    ipucu: (d) => 'Vadinin güneyindeki üç yedek kompresörü çalıştır: ' + (d.mini.bitenler || []).length + ' / 3.',
    tamam: () => ['Üç kompresör uğulduyor; kubbenin iç atmosferi dengede. İçeriden tuhaf, minnettar bir ıslık.', 'İtibar +10, moral +5.'],
  },
  solucan_gocu: {
    ad: 'Kör Solucan Göç Dalgası',
    rol: 0,
    kosul: (d) => !!d.bayrak.sondaj && bina(d, 'tersane'),
    cagri: () =>
      'Kaptan, sismograflar çıldırıyor! Bir kör solucan sürüsü sırtların maden ocaklarına doğru geliyor. Sırtlardaki üç kayaya frekans kazığı dik; sürü boş kanyonlara sapsın. Her kazığa bir kristal. İki buçuk dakikamız var!',
    ipucu: (d) => 'Sırtlarda üç frekans kazığı dik (her biri bir kristal): ' + (d.mini.bitenler || []).length + ' / 3. Kalan süre ' + Math.max(0, Math.round(d.mini.kalan || 0)) + ' saniye.',
    tamam: (d) => (d.mini.sonuc === 'dogru' ? ['Kazıkların uğultusu sürüyü döndürüyor; yer altındaki gümbürtü batıya, boş kanyonlara kayıyor.', 'Kabuk döken solucanlardan kseno-kabuk +2, itibar +10.'] : ['Sürü ocakların altından geçti; galeriler çöktü. Sırtların yatakları bir süre boş.', 'Moral -5.']),
  },
  yagmaci_tuzagi: {
    ad: 'Vanguard Enkazında Yağmacı Tuzağı',
    rol: 1,
    kosul: (d) => !!d.bayrak.vanguardGunluk,
    cagri: () =>
      'Kaptan, Vanguard enkazında yabancı telsiz cızırtıları! Kaçak korsan kalıntıları enkazı yağmalıyor. Sessizce sız: yavaş yürü, cızırtıya yaklaş, plazma kesiciyle sersemlet. Hızlı yürürsen seni duyarlar.',
    ipucu: (d) => 'Vanguard enkazındaki korsanları sessizce etkisiz hale getir: ' + (d.mini.bitenler || []).length + ' / 3. Dikkat yüzde ' + Math.round(d.mini.dikkat || 0) + '.',
    tamam: (d) => (d.mini.sonuc === 'dogru' ? ['Üç korsan bağlı. Çaldıkları ses günlükleri ve parçalar geri geldi; tarihi miras korundu.', 'İtibar +15, şasi çeliği +20.'] : ['Korsanlar alarm verip kaçtı; enkazdan bir miktar parça götürdüler.', 'İtibar -5.']),
  },
};
export const MINI_SIRASI = Object.keys(MINI);

// Görevlerin noktaları (harita.js NOKTALAR'da mini: id): yalnız görev sürerken vardır
export function miniGorunur(d, id) {
  const n = NOKTALAR[id];
  const m = d.mini;
  if (!m || m.aktif !== n.mini) return false;
  if ((m.bitenler || []).includes(id)) return false;
  // Kayıp ekip: yalnız seçilen yer; vana: dört bağlantının hepsi var, yalnız biri kaçırır
  if (n.secenek != null && n.mini !== 'vana_donmasi' && m.secim !== n.secenek) return false;
  return true;
}
function noktalari(id) {
  return Object.keys(NOKTALAR).filter((x) => NOKTALAR[x].mini === id);
}

export function miniDurum(d) {
  if (!d.mini) d.mini = { aktif: null, bekle: 0, bitenGorevler: [] };
  return d.mini;
}

export function miniBaslat(d, id) {
  const m = miniDurum(d);
  const biten = m.bitenGorevler || [];
  d.mini = { aktif: id, bekle: 0, bitenGorevler: biten, basla: d.sure || 0, bitenler: [], toplanan: 0, spor: 0, dikkat: 0 };
  const t = MINI[id];
  if (id === 'vana_donmasi') d.mini.secim = d.tohum % 4;
  if (id === 'kayip_ekip') d.mini.secim = (d.tohum * 7) % 3;
  if (id === 'solucan_gocu') d.mini.kalan = SOLUCAN_SURE;
  if (id === 'mantar_hasadi') d.mini.olgunluk = { foton_olgun_1: 0.2, foton_olgun_2: 0.45, foton_olgun_3: 0.05 };
  if (!d.bildirimler) d.bildirimler = [];
  const u = d.murettebat[t.rol];
  d.bildirimler.push({ id: 'mini_' + id, kim: u.rol + ' ' + u.ad, metin: t.cagri(d) });
  return d.mini;
}

function bitir(d, sonuc) {
  const m = d.mini;
  const id = m.aktif;
  m.sonuc = sonuc;
  d.miniSon = { id, sonuc, metin: MINI[id].tamam(d) };
  if (!m.bitenGorevler.includes(id)) m.bitenGorevler.push(id);
  m.aktif = null;
  m.bekle = 0;
  d.sahne = 'mini_tamam';
  d.kaptan.tecrube += sonuc === 'dogru' ? 30 : 10;
}
const moral = (d, x) => (d.koloni.moral = Math.max(0, Math.min(100, d.koloni.moral + x)));
const kaynakEkle = (d, k, x) => (d.koloni.kaynaklar[k] = (d.koloni.kaynaklar[k] || 0) + x);

// Her karede (gorevler.js zamanIlerle). olaylar: { tur: 'mini', metin, acil }
export function miniIlerle(d, dt) {
  const m = miniDurum(d);
  const olaylar = [];
  if (!m.aktif) {
    m.bekle = (m.bekle || 0) + dt;
    if (m.bekle >= MINI_BEKLEME) {
      const id = MINI_SIRASI.find((x) => !m.bitenGorevler.includes(x) && MINI[x].kosul(d));
      if (id) {
        miniBaslat(d, id);
        olaylar.push({ tur: 'miniBasladi', id });
      } else m.bekle = MINI_BEKLEME * 0.8;
    }
    return olaylar;
  }
  if (m.aktif === 'mantar_hasadi') {
    for (const k of Object.keys(m.olgunluk)) {
      m.olgunluk[k] += dt / 40; // kırk saniyede olgunlaşır
      if (m.olgunluk[k] > 1.15) {
        // Aşırı olgun: spor döker, yeniden filizlenir
        m.olgunluk[k] = 0.1;
        if (d.mekan === 'mantar') {
          m.spor = Math.min(100, (m.spor || 0) + 12);
          olaylar.push({ tur: 'mini', metin: 'Yakında bir kristal patladı; spor bulutu yayılıyor. Spor yüzde ' + Math.round(m.spor) + '.', acil: true });
        }
      }
    }
    const once = m.spor || 0;
    if (d.mekan === 'mantar') m.spor = Math.min(100, once + SPOR_HIZI * dt);
    else m.spor = Math.max(0, once - 5 * dt);
    for (const e of [50, 75, 90]) if (once < e && m.spor >= e) olaylar.push({ tur: 'mini', metin: ilkAd(d, 2) + ': "Spor yüzde ' + e + '! ' + (e >= 90 ? 'Hemen çık!' : 'Acele et.') + '"', acil: true });
    if (m.spor >= 100) {
      const k = KAPILAR.mantar_gecit.uclar.find((u) => u.mekan !== 'mantar');
      d.mekan = k.mekan;
      d.oyuncu = { x: k.x, y: k.y, yon: 0 };
      d.oto = null;
      m.spor = 0;
      m.toplanan = 0;
      m.bitenler = [];
      olaylar.push({ tur: 'mini', metin: ilkAd(d, 2) + ' seni spor bulutundan sürükleyip çıkardı. Topladığın kristaller düştü. Biraz soluklan; kristaller yeniden olgunlaşıyor.', acil: true, tasindi: true });
    }
  }
  if (m.aktif === 'solucan_gocu') {
    const once = m.kalan;
    m.kalan -= dt;
    for (const e of [90, 60, 30]) if (once > e && m.kalan <= e) olaylar.push({ tur: 'mini', metin: 'Sürü yaklaşıyor: ' + e + ' saniye.', acil: true });
    if (m.kalan <= 0) {
      for (const id of Object.keys(NOKTALAR)) if (NOKTALAR[id].mekan === 'sirtlar' && NOKTALAR[id].kaynak) d.stok[id] = 0;
      moral(d, -5);
      bitir(d, 'yanlis');
    }
  }
  if (m.aktif === 'yagmaci_tuzagi') {
    const hiz = m.sonKonum && m.sonKonum.mekan === d.mekan ? Math.hypot(d.oyuncu.x - m.sonKonum.x, d.oyuncu.y - m.sonKonum.y) / Math.max(dt, 0.001) : 0;
    m.sonKonum = { mekan: d.mekan, x: d.oyuncu.x, y: d.oyuncu.y };
    let artis = 0;
    if (d.mekan === 'vanguard' && hiz > 1.3) {
      for (const id of noktalari('yagmaci_tuzagi')) {
        if (!miniGorunur(d, id)) continue;
        const u = Math.hypot(d.oyuncu.x - NOKTALAR[id].x, d.oyuncu.y - NOKTALAR[id].y);
        if (u < 14) artis += 45 * (1 - u / 14);
      }
    }
    const once = m.dikkat || 0;
    m.dikkat = Math.max(0, once + (artis - (artis ? 0 : 6)) * dt);
    for (const e of [40, 70]) if (once < e && m.dikkat >= e) olaylar.push({ tur: 'mini', metin: e >= 70 ? 'Cızırtılar kesildi; biri "Kim var orada?" diye fısıldıyor. Dur!' : 'Bir korsan durdu, dinliyor. Yavaşla.', acil: true });
    if (m.dikkat >= DIKKAT_ESIK) {
      kaynakEkle(d, 'titanyum', 0);
      d.itibar = Math.max(0, d.itibar - 5);
      bitir(d, 'yanlis');
    }
  }
  return olaylar;
}

// Ayar ve valf kancaları (gorev1.js, gorev2.js)
export function miniKilitlendi(d, amac) {
  if (amac === 'mini_bent' && d.mini && d.mini.aktif === 'vaha_kanali') {
    moral(d, 5);
    d.stok.tohum_1 = NOKTALAR.tohum_1.stok;
    bitir(d, 'dogru');
  }
}
export function miniValfBitti(d, id) {
  const m = d.mini;
  if (!m || m.aktif !== 'basinc_dususu') return { sonuc: 'bitti', metin: '' };
  if (!m.bitenler.includes(id)) m.bitenler.push(id);
  d.valf = null;
  if (m.bitenler.length >= 3) {
    d.itibar += 10;
    moral(d, 5);
    bitir(d, 'dogru');
    return { sonuc: 'bitti', metin: 'Son kompresör de devrede.' };
  }
  return { sonuc: 'bitti', metin: NOKTALAR[id].ad + ' çalışıyor. Kalan kompresör: ' + (3 - m.bitenler.length) + '.' };
}

// Noktalardaki eylemler
export function noktaMi(id) {
  return !!(NOKTALAR[id] && NOKTALAR[id].mini);
}
export function ekEylemler(d, id) {
  const m = d.mini;
  if (!m || !m.aktif || id !== 'terminal') return [];
  if (m.aktif === 'mantar_hasadi' && m.toplanan >= 3) return [{ id: 'm_teslim', etiket: 'Fotonik kristalleri laboratuvara teslim et' }];
  if (m.aktif === 'ceviri_krizi') return [{ id: 'm_ceviri', etiket: 'Akademideki çeviri tartışmasını dinle' }];
  return [];
}
export function ekEylemMi(eylemId) {
  return eylemId.indexOf('m_') === 0;
}
export function noktaEylemleri(d, id) {
  const n = NOKTALAR[id];
  if (!miniGorunur(d, id)) return [];
  const e = [];
  if (n.mini === 'mantar_hasadi') e.push({ id: 'm_hasat', etiket: 'Kristali kopar' });
  if (n.mini === 'vana_donmasi') e.push({ id: 'm_muhurle', etiket: 'Termal meşaleyle mühürle', ipucu: '5 polimer levha.' });
  if (n.mini === 'kayip_ekip') e.push({ id: 'm_kurtar', etiket: 'Ekibi kurtar' });
  if (n.mini === 'vaha_kanali') e.push({ id: 'm_patlat', etiket: 'Sonik patlatıcıyı ayarla' });
  if (n.mini === 'basinc_dususu') e.push({ id: 'm_kompresor', etiket: 'Kompresörü çalıştır' });
  if (n.mini === 'solucan_gocu') e.push({ id: 'm_kazik', etiket: 'Frekans kazığını dik', ipucu: '1 kristal.' });
  if (n.mini === 'yagmaci_tuzagi') e.push({ id: 'm_etkisiz', etiket: 'Kesiciyle sersemlet' });
  e.push({ id: 'incele', etiket: 'İncele' });
  return e;
}

export function olgunlukMetni(o) {
  if (o < 0.7) return 'henüz sönük ve sessiz; olmamış';
  if (o <= 1) return 'ince ince çınlıyor; olgun';
  return 'şişmiş, çatlamak üzere';
}
export function olgunMu(d, id) {
  const m = d.mini;
  return !!(m && m.aktif === 'mantar_hasadi' && m.olgunluk && m.olgunluk[id] >= 0.7 && m.olgunluk[id] <= 1 && miniGorunur(d, id));
}

export function eylemUygula(d, id, eylemId) {
  const m = miniDurum(d);
  const n = NOKTALAR[id];
  // Görev bitmiş ya da başka görev sürüyorsa nokta yoktur
  if (n && n.mini && !miniGorunur(d, id)) return { metin: 'Burada artık bir şey yok.' };
  if ((eylemId === 'm_teslim' && !(m.aktif === 'mantar_hasadi' && m.toplanan >= 3)) || (eylemId === 'm_ceviri' && m.aktif !== 'ceviri_krizi')) return { metin: '' };
  if (eylemId === 'm_teslim') {
    kaynakEkle(d, 'foton_recinesi', 4);
    moral(d, 5);
    bitir(d, 'dogru');
    return { metin: '' };
  }
  if (eylemId === 'm_ceviri') {
    d.sahne = 'ceviri_krizi';
    return { metin: '' };
  }
  if (eylemId === 'incele') {
    if (n.mini === 'mantar_hasadi') return { metin: n.tarif + ' Kristal ' + olgunlukMetni(m.olgunluk[id]) + '.' };
    return { metin: n.tarif || n.ad };
  }
  if (eylemId === 'm_hasat') {
    const o = m.olgunluk[id];
    if (o < 0.7) return { metin: 'Kristal henüz sönük; olmamış. Koparırsan ölür. Çınlayanları ara.', ses: 'red' };
    if (o > 1) {
      m.spor = Math.min(100, (m.spor || 0) + 15);
      m.olgunluk[id] = 0.1;
      return { metin: 'Dokunur dokunmaz çatladı! Yüzüne bir spor bulutu. Spor yüzde ' + Math.round(m.spor) + '.', ses: 'red' };
    }
    m.bitenler.push(id);
    m.toplanan = (m.toplanan || 0) + 1;
    return { metin: 'Kristal elinde ılık ılık çınlıyor. ' + m.toplanan + ' / 3.' + (m.toplanan >= 3 ? ' Yeter; laboratuvara götür (kapsül terminali).' : ''), ses: 'kristal' };
  }
  if (eylemId === 'm_muhurle') {
    if (n.secenek !== m.secim) return { metin: 'Bu bağlantı sağlam; buz tutmuş ama kaçırmıyor. Tıslama başka yerden geliyor.', ses: 'red' };
    if ((d.koloni.parcalar.polimer_levha || 0) < 5) return { metin: 'Kaçak burada! Mühürlemek için 5 polimer levha gerek; dökümhaneden.', ses: 'red' };
    d.koloni.parcalar.polimer_levha -= 5;
    kaynakEkle(d, 'metan', 3);
    d.itibar += 10;
    bitir(d, 'dogru');
    return { metin: '', ses: 'kaynak' };
  }
  if (eylemId === 'm_kurtar') {
    d.koloni.nufus.toplam += 2;
    moral(d, 5);
    bitir(d, 'dogru');
    return { metin: '' };
  }
  if (eylemId === 'm_patlat') return { ayar: true, amac: 'mini_bent' };
  if (eylemId === 'm_kompresor') return { valf: true, amac: 'mini_kompresor' };
  if (eylemId === 'm_kazik') {
    if ((d.koloni.kaynaklar.kristal || 0) < 1) return { metin: 'Kazığın ucuna bir kristal gerek.', ses: 'red' };
    d.koloni.kaynaklar.kristal -= 1;
    m.bitenler.push(id);
    if (m.bitenler.length >= 3) {
      kaynakEkle(d, 'kseno_kabuk', 2);
      d.itibar += 10;
      bitir(d, 'dogru');
      return { metin: '', ses: 'kur' };
    }
    return { metin: 'Kazık toprağa gömüldü; tepesinde pes bir uğultu başladı. ' + m.bitenler.length + ' / 3.', ses: 'kur' };
  }
  if (eylemId === 'm_etkisiz') {
    if (!d.envanter.includes('kesici')) return { metin: 'Elinde kesici yok; kapsüldeki dolaptan al.', ses: 'red' };
    m.bitenler.push(id);
    if (m.bitenler.length >= 3) {
      d.itibar += 15;
      d.koloni.parcalar.sasi_celigi = (d.koloni.parcalar.sasi_celigi || 0) + 20;
      bitir(d, 'dogru');
      return { metin: '', ses: 'kes' };
    }
    m.dikkat = Math.max(0, (m.dikkat || 0) - 10);
    return { metin: 'Kesicinin düşük ayarlı darbesi; korsan sessizce yere yığıldı. ' + m.bitenler.length + ' / 3.', ses: 'kes' };
  }
  return { metin: '' };
}

// Çeviri krizi seçimi ve bitiş sahnesi
function ceviriSec(d, dogru) {
  if (dogru) {
    d.itibar += 15;
    moral(d, 5);
  } else moral(d, -5);
  bitir(d, dogru ? 'dogru' : 'yanlis');
  return 'mini_tamam';
}
export const SAHNELER = {
  mini_tamam: {
    baslik: 'Yerel operasyon',
    efekt: ['sinyal'],
    metin: (d) => (d.miniSon ? [MINI[d.miniSon.id].ad + (d.miniSon.sonuc === 'dogru' ? ': başarılı.' : ': başarısız.'), ...d.miniSon.metin] : []),
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
  },
  ceviri_krizi: {
    baslik: 'Çeviri krizi',
    metin: () => [
      'Tapınak dilbilimcisi: "Yazıt açık: Kadimler gezegeni terk etmedi, kendilerini çanların frekansına aktardılar. Kaelith\'in \'kaçış\' diye anlattığı şey bir dönüşüm."',
      'Kaelith tarihçisi: "Bizim kayıtlarımız kesin: Kadimler bir yıldız gemisiyle ayrıldı. Gemiyi biz gördük, gidişlerine tanık olduk."',
      'İki anlatı da kendi kanıtına dayanıyor. Hangi sentezi kütüphaneye yazdırırsın?',
    ],
    secenekler: (d) => [
      { etiket: 'Kadimlerin bir kısmı gemiyle ayrıldı, kalanlar kendilerini çanların frekansına aktardı', sonra: 'mini_tamam', yap: () => ceviriSec(d, true) },
      { etiket: 'Tapınak metni doğru; Kaelith kayıtları yanlış hatırlanmış', sonra: 'mini_tamam', yap: () => ceviriSec(d, false) },
      { etiket: 'Kaelith kayıtları doğru; yazıt mecazi bir dua', sonra: 'mini_tamam', yap: () => ceviriSec(d, false) },
    ],
  },
};
