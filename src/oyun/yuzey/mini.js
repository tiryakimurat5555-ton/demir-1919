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
import { ZAFER_KANCALARI } from '../kancalar';
import { tarim } from '../tarim/tarim';
import { GUN_SN } from '../zaman';
//
// v4 derinleştirme (belgeler/v4/koloni-yerel-operasyonlar-ve-yuzey-derinlestirme.txt bölüm 1): her operasyona karakter,
// evrensel kara savaşı ve karar; #5, #7, #8'deki sabit cezalar seçime bağlandı. Operasyon içindeki çatışma
// m.savasta ile izlenir: zaferde sahne mini_savas kaldığı yerden sürdürür; yenilgi ya da kaçış eski sonucu getirir.

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
    karakter: 'Kseno-biyolog Dr. Selin',
    tamam: (d) => (d.mini.karar === 'iksir' ? ['Dr. Selin kristalleri iksir deneyine alıyor; eczanenin kazanları bir gün boyunca hızlı kaynayacak.', 'İki doz sakinleştirici, moral +2.'] : ['Kristaller laboratuvarda. Biyologlar onları kubbenin aydınlatma hatlarına işliyor; koridorlarda yumuşak, yeşil bir ışık. Gece nöbetlerinde koloni daha verimli.', 'Foton reçinesi +4, moral +5.']),
  },
  vana_donmasi: {
    ad: 'Kriyojenik Vana Donması',
    rol: 0,
    kosul: (d) => gorulen(d, 'kriyo'),
    cagri: () =>
      'Kaptan, metan mağarasındaki ana yakıt hattı soğuktan çatladı! Dört bağlantıdan biri kaçırıyor. Tıslamayı dinle, doğru bağlantıyı bul ve termal meşaleyle mühürle. Beş polimer levha yeter.',
    ipucu: () => 'Metan mağarasında kaçak tıslamasını bul; termal meşaleyle mühürle (5 polimer levha).',
    karakter: 'Baştekniker Kaya',
    tamam: (d) => ['Meşalenin mavi alevi çatlağı kapatıyor; tıslama kesiliyor. Kaya: "Gösterge yeniden oynuyor!" Hat basınç tutuyor.', 'Sıvı metan +3, itibar +10.' + (d.koloni.binalar.includes('kriyo_atolye') ? ' Kriyo atölyesinden bir tüp dondurucu köpük hediye.' : '')],
  },
  kayip_ekip: {
    ad: 'Obsidyen Çölünde Kayıp Keşif Aracı',
    rol: 1,
    kosul: (d) => gorulen(d, 'obsidyen'),
    cagri: () =>
      'Kaptan, obsidyen ovasındaki keşif ekibinden haber alamıyoruz! Manyetik parazit rotalarını şaşırtmış; radar orada işe yaramıyor. Araçlarının kornasını çalıyorlar. Camın yankıları arasından kornayı izle.',
    ipucu: () => 'Obsidyen ovasında kayıp ekibin korna sesini izle. Radar parazitte kör.',
    karakter: 'Keşif ekibi lideri Aras',
    tamam: () => ['Kornanın sahibi Aras\'ın üç kişilik ekibi; araçları camlaşmış bir yarığa saplanmış. Onları yola çıkarıyorsun. Aras yarığın dibinden iki kusursuz plazma camı getirdi.', 'Nüfus +3, moral +5, plazma camı +2.'],
  },
  vaha_kanali: {
    ad: 'Vaha Su Kanalı Tıkanması',
    rol: 2,
    kosul: (d) => !!d.bayrak.vahaBulundu,
    cagri: () =>
      'Kaptan, vahanın kaynağı kaya kaymasıyla tıkandı; su kesildi! Bentteki kayayı sonik patlatıcıyla parçalamak gerek, ama vadiye zarar vermeden: patlatıcının frekansını kayanın kendi rezonansına ayarla.',
    ipucu: () => 'Vahadaki bentte sonik patlatıcının frekansını kayanın rezonansına ayarla.',
    karakter: 'Tarım sorumlusu Lina',
    tamam: (d) => ['Kaya kendi frekansında ince bir çatırtıyla dağılıyor; su yeniden şırıldıyor.', d.mini.karar === 'yabani' ? 'Lina vahanın yabani tohum havuzunu suluyor: iki gece açan vaha hurması tohumu, moral +5.' : 'Lina suyu seralara yönlendiriyor: yirmi günlük rasyon (beş paket peksimet), moral +5.'],
  },
  ceviri_krizi: {
    ad: 'Akademi Kütüphanesinde Çeviri Krizi',
    rol: 1,
    kosul: (d) => bina(d, 'akademi'),
    cagri: () =>
      'Kaptan, akademide gergin bir tartışma var. Tapınaktan getirilen metinlerle Kaelith tarihi çelişiyor; iki taraf da birbirini sahtekârlıkla suçluyor. Terminalden kütüphaneye bağlan, ikisini de dinle.',
    ipucu: () => 'Kapsül terminalinden akademideki çeviri tartışmasını dinle.',
    karakter: 'Malken bilgini ve Kaelith tarihçisi',
    tamam: (d) => (d.mini.sonuc === 'dogru' ? ['İki metnin farklı çağları anlattığını kanıtladın; iki taraf da sentezi kabul ediyor. Akademinin ortak tarihi yazılıyor.', 'Moral +10, itibar +10, yüz bilim puanı.'] : ['Bir taraf haklı çıktı; kütüphane hızlı açıldı ama kaybeden taraf küstü. Kazanan taraf bir antik veri parçası bağışladı.', 'Moral -5, antik veri parçası +1.']),
  },
  basinc_dususu: {
    ad: 'Metan Kubbesinde Basınç Düşüşü',
    rol: 2,
    kosul: (d) => bina(d, 'kseno_habitat'),
    cagri: () =>
      'Kaptan, kseno-habitat kubbesinde basınç düşüyor! İçerideki canlılar boğuluyor. Kapsülün güneyindeki üç yedek kompresörü elle çalıştır; her birinde basıncı dinle, tam zamanında aç.',
    ipucu: (d) => 'Vadinin güneyindeki üç yedek kompresörü çalıştır: ' + (d.mini.bitenler || []).length + ' / 3.',
    karakter: 'Kubbe teknisyeni ve kseno-topluluk sözcüsü',
    tamam: (d) => (d.koloni.binalar.includes('kseno_eczane') ? ['Üç kompresör uğulduyor; kubbe dengede. Eczanenin hazırladığı ilaçlarla küf kimseyi hasta etmedi. Kseno-sözcü teşekkür olarak bir kseno-alaşım bıraktı.', 'İtibar +15, moral +10, kseno-alaşım +1.'] : ['Üç kompresör uğulduyor; kubbe dengede. Ama sızıntıdan yayılan zehirli küf ekibi yordu; kseno-eczane olsaydı kimse hastalanmazdı.', 'İtibar +10, moral +5; mürettebatın stresi arttı.']),
  },
  solucan_gocu: {
    ad: 'Kör Solucan Göç Dalgası',
    rol: 0,
    kosul: (d) => !!d.bayrak.sondaj && bina(d, 'tersane'),
    cagri: () =>
      'Kaptan, sismograflar çıldırıyor! Bir kör solucan sürüsü sırtların maden ocaklarına doğru geliyor. Sırtlardaki üç kayaya frekans kazığı dik; sürü boş kanyonlara sapsın. Her kazığa bir kristal. İki buçuk dakikamız var!',
    ipucu: (d) => 'Sırtlarda üç frekans kazığı dik (her biri bir kristal): ' + (d.mini.bitenler || []).length + ' / 3. Kalan süre ' + Math.max(0, Math.round(d.mini.kalan || 0)) + ' saniye.',
    karakter: 'Maden şefi Torvok ya da Başmühendis Kaya',
    tamam: (d) => (d.mini.sonuc === 'dogru' ? ['Sürü yön değiştirdi; yer altındaki gümbürtü batıya, boş kanyonlara kayıyor. Ocaklar kurtuldu!', 'Moral +10, titanyum +15, bazalt +10, kseno-kabuk +2, itibar +10.'] : ['Sürü ocakların altından geçti; galeriler çöktü. Sırtların yatakları bir süre boş.', 'Moral -5.']),
  },
  yagmaci_tuzagi: {
    ad: 'Vanguard Enkazında Yağmacı Tuzağı',
    rol: 1,
    kosul: (d) => !!d.bayrak.vanguardGunluk,
    cagri: () =>
      'Kaptan, Vanguard enkazında yabancı telsiz cızırtıları! Kaçak korsan kalıntıları enkazı yağmalıyor. Sessizce sız: yavaş yürü, cızırtıya yaklaş, plazma kesiciyle sersemlet. Hızlı yürürsen seni duyarlar.',
    ipucu: (d) => 'Vanguard enkazındaki korsanları sessizce etkisiz hale getir: ' + (d.mini.bitenler || []).length + ' / 3. Dikkat yüzde ' + Math.round(d.mini.dikkat || 0) + '.',
    karakter: 'Koloni telsiz subayı',
    tamam: (d) => (d.mini.sonuc === 'dogru' ? ['Yağmacılar yakalandı, kayıp yok. Çaldıkları ses günlükleri, parçalar ve tohum kasaları geri geldi.', 'İtibar +15, şasi çeliği +100, tohum kasaları.'] : ['Korsanlar alarm verip kaçtı; enkazdan bir miktar parça götürdüler.', 'İtibar -5.']),
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
const parcaEkle = (d, k, x) => (d.koloni.parcalar[k] = (d.koloni.parcalar[k] || 0) + x);
const parca = (d, k) => d.koloni.parcalar[k] || 0;

// --- Operasyon içi çatışmalar ---
const SAVASLAR = {
  mantar_pusu: { dusmanlar: ['mantar_pusucusu', 'mantar_pusucusu'], giris: 'Çürümüş mantarın içinden iki spor pusucusu uyandı!' },
  kriyo: { dusmanlar: ['kriyo_yaratigi'], giris: 'Buhar patlaması! Borudan bir kriyo yaratığı fırladı.' },
  akrep: { dusmanlar: ['kristal_akrep', 'kristal_akrep'], giris: 'Yarığın çevresini iki kristal çöl akrebi sarmış; ekibi koru!' },
  solucan_vaha: { dusmanlar: ['vaha_solucani'], giris: 'Heyelanın arkasından bir vaha kaya solucanı çıktı; zırhlı.' },
  solucan_dev: { dusmanlar: ['dev_kor_solucan'], giris: 'Sürünün başında dev bir kör solucan öncüsü! Onu durdurursan sürü yön değiştirir.', tier: 2 },
  yagmaci: { dusmanlar: ['yagmaci_lideri', 'vanguard_otomati'], gelis: 'oncu', giris: 'Alarm! Yağmacı lideri ve uyandırdığı Vanguard otomatı üstüne geliyor.', tier: 2 },
};
function miniSavas(d, ne, ek = {}) {
  const sp = SAVASLAR[ne];
  d.mini.savasta = ne;
  d.savasBekle = { dusmanlar: sp.dusmanlar.slice(), ortam: 'kara', tier: sp.tier || 1, gelis: sp.gelis || (sp.dusmanlar.length > 1 ? 'kiskac' : 'tek'), giris: sp.giris, ...ek };
  d.savasSonraSahne = 'mini_savas';
}
// Zaferden sonra operasyon kaldığı yerden sürer
function savasZafer(d) {
  const m = d.mini;
  const ne = m && m.savasta;
  if (!ne) return ['Çatışma bitti.'];
  m.savasta = null;
  if (ne === 'akrep') {
    kayipEkipKurtar(d);
    return ['Akrepler dağıldı; ekip yarıktan çıkıyor.'];
  }
  if (ne === 'solucan_vaha') {
    d.sahne = 'mini_vaha_karar';
    return ['Solucan kayaların arasına çekildi; bent açık.'];
  }
  if (ne === 'solucan_dev') {
    solucanBasari(d);
    return ['Dev öncü yere yığıldı; sürü onun titreşimini kaybedip batıya döndü.'];
  }
  if (ne === 'yagmaci') {
    yagmaciBasari(d);
    return ['Yağmacı lideri teslim oldu; otomat sustu.'];
  }
  return ['Çatışma bitti; işine dön.'];
}
// Çatışmadan yenik ya da kaçarak dönülürse eski sonuç
function savasYenilgi(d, ne) {
  const m = d.mini;
  m.savasta = null;
  if (ne === 'solucan_dev') {
    for (const id of Object.keys(NOKTALAR)) if (NOKTALAR[id].mekan === 'sirtlar' && NOKTALAR[id].kaynak) d.stok[id] = 0;
    moral(d, -5);
    bitir(d, 'yanlis');
  } else if (ne === 'yagmaci') {
    d.itibar = Math.max(0, d.itibar - 5);
    bitir(d, 'yanlis');
  }
}
function kayipEkipKurtar(d) {
  d.koloni.nufus.toplam += 3;
  d.koloni.nufus.barinma = (d.koloni.nufus.barinma || 0) + 1;
  moral(d, 5);
  kaynakEkle(d, 'plazma_cami', 2);
  bitir(d, 'dogru');
}
function solucanBasari(d) {
  moral(d, 10);
  kaynakEkle(d, 'titanyum', 15);
  kaynakEkle(d, 'bazalt', 10);
  kaynakEkle(d, 'kseno_kabuk', 2);
  d.itibar += 10;
  bitir(d, 'dogru');
}
function yagmaciBasari(d) {
  d.itibar += 15;
  parcaEkle(d, 'sasi_celigi', 100);
  for (const t of ['soya', 'noro_kahve', 'aloe']) tarim(d).tohumlar[t] = (d.tarim.tohumlar[t] || 0) + 1;
  d.bayrak.yagmaciYakalandi = true;
  bitir(d, 'dogru');
}

// Her karede (gorevler.js zamanIlerle). olaylar: { tur: 'mini', metin, acil }
export function miniIlerle(d, dt) {
  const m = miniDurum(d);
  const olaylar = [];
  // 3.16: zaman ileri sarılırken (yolculuk, şarj, dinlenme) yerel operasyonlar donar: yeni operasyon başlamaz, süren olan işlemez
  if (d.zamanSariliyor) return olaylar;
  if (m.aktif && m.savasta && !d.savas && !d.savasBekle && !d.sahne) {
    const ne = m.savasta;
    savasYenilgi(d, ne);
    if (m.aktif) olaylar.push({ tur: 'mini', metin: 'Çatışmadan çekildin; operasyon sürüyor.', acil: true });
    return olaylar;
  }
  if (m.savasta) return olaylar;
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
      // Sismik dengeleyici sürüyü saptırır; yoksa dev öncüyle çatışma (yalnız kaybedilirse galeriler çöker)
      if (parca(d, 'sismik_dengeleyici') > 0) {
        d.koloni.parcalar.sismik_dengeleyici -= 1;
        olaylar.push({ tur: 'mini', metin: 'Sismik dengeleyici zemini titreştirdi; sürü yön değiştiriyor!', acil: true });
        solucanBasari(d);
      } else if (!d.uzay && !d.gemide && !d.bayrak.tonoflenyada && !d.savas && !d.op) miniSavas(d, 'solucan_dev');
      else {
        // Koloniden uzaktayken sürüye karşı çıkacak kimse yok: eski sonuç
        for (const id of Object.keys(NOKTALAR)) if (NOKTALAR[id].mekan === 'sirtlar' && NOKTALAR[id].kaynak) d.stok[id] = 0;
        moral(d, -5);
        bitir(d, 'yanlis');
      }
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
        if (u < 14) artis += 45 * (1 - u / 14) * (d.kusanilan && d.kusanilan.zirh === 'isik_pelerini' ? 0.5 : 1);
      }
    }
    const once = m.dikkat || 0;
    m.dikkat = Math.max(0, once + (artis - (artis ? 0 : 6)) * dt);
    for (const e of [40, 70]) if (once < e && m.dikkat >= e) olaylar.push({ tur: 'mini', metin: e >= 70 ? 'Cızırtılar kesildi; biri "Kim var orada?" diye fısıldıyor. Dur!' : 'Bir korsan durdu, dinliyor. Yavaşla.', acil: true });
    if (m.dikkat >= DIKKAT_ESIK) {
      // Alarm: kaçmalarına izin verme, lideri ve otomatı kara savaşında yakala (asama-1-ve-2 Görev 1B ile birleşik)
      m.dikkat = 0;
      olaylar.push({ tur: 'mini', metin: 'Alarm verildi! Yağmacılar silahlanıyor.', acil: true });
      miniSavas(d, 'yagmaci');
    }
  }
  return olaylar;
}

// Ayar ve valf kancaları (gorev1.js, gorev2.js)
export function miniKilitlendi(d, amac) {
  if (amac === 'mini_bent' && d.mini && d.mini.aktif === 'vaha_kanali') {
    d.stok.tohum_1 = NOKTALAR.tohum_1.stok;
    // Sismik dengeleyici vadiyi çökertmeden solucanı durdurur; yoksa heyelanın arkasından çıkan solucanla çatışma
    if (parca(d, 'sismik_dengeleyici') > 0) d.sahne = 'mini_vaha_karar';
    else miniSavas(d, 'solucan_vaha');
  }
}
export function miniValfBitti(d, id) {
  const m = d.mini;
  if (!m || m.aktif !== 'basinc_dususu') return { sonuc: 'bitti', metin: '' };
  if (!m.bitenler.includes(id)) m.bitenler.push(id);
  d.valf = null;
  if (m.bitenler.length >= 3) {
    // Kseno-eczane hazırsa içerideki küf kimseyi hasta etmez
    if (d.koloni.binalar.includes('kseno_eczane')) {
      d.itibar += 15;
      moral(d, 10);
      parcaEkle(d, 'kseno_alasim', 1);
    } else {
      d.itibar += 10;
      moral(d, 5);
      for (const u of d.murettebat) u.stres = Math.min(100, (u.stres || 0) + 15);
    }
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
    d.sahne = 'mini_mantar_karar';
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
      // Çürümüş mantara basınca spor pusucuları uyanır (bir kez); biyo-kubbe ya da biyo-karantina zehri işletmez
      if (!m.pusuDendi) {
        m.pusuDendi = true;
        miniSavas(d, 'mantar_pusu', d.koloni.binalar.includes('biyo_kubbe') || parca(d, 'biyo_karantina') > 0 ? { bagisik: true } : {});
        return { metin: 'Dokunur dokunmaz çatladı! Spor bulutunun içinden bir şey kıpırdıyor.', ses: 'red' };
      }
      return { metin: 'Dokunur dokunmaz çatladı! Yüzüne bir spor bulutu. Spor yüzde ' + Math.round(m.spor) + '.', ses: 'red' };
    }
    m.bitenler.push(id);
    m.toplanan = (m.toplanan || 0) + 1;
    return { metin: 'Kristal elinde ılık ılık çınlıyor. ' + m.toplanan + ' / 3.' + (m.toplanan >= 3 ? ' Yeter; laboratuvara götür (kapsül terminali).' : ''), ses: 'kristal' };
  }
  if (eylemId === 'm_muhurle') {
    if (n.secenek !== m.secim) {
      // Yanlış vana: buhar patlamasıyla bir kriyo yaratığı borudan fırlar (bir kez)
      if (!m.yaratikDendi) {
        m.yaratikDendi = true;
        miniSavas(d, 'kriyo');
        return { metin: 'Bu bağlantı sağlam ama meşale buzu çatlattı; buhar patlıyor!', ses: 'red' };
      }
      return { metin: 'Bu bağlantı sağlam; buz tutmuş ama kaçırmıyor. Tıslama başka yerden geliyor.', ses: 'red' };
    }
    if ((d.koloni.parcalar.polimer_levha || 0) < 5) return { metin: 'Kaçak burada! Mühürlemek için 5 polimer levha gerek; dökümhaneden.', ses: 'red' };
    d.koloni.parcalar.polimer_levha -= 5;
    kaynakEkle(d, 'metan', 3);
    d.itibar += 10;
    if (d.koloni.binalar.includes('kriyo_atolye')) parcaEkle(d, 'dondurucu_kopuk', 1);
    bitir(d, 'dogru');
    return { metin: '', ses: 'kaynak' };
  }
  if (eylemId === 'm_kurtar') {
    // Sonik kovucu akrepleri savaşmadan kaçırır; yoksa ekibi kara savaşıyla kurtar
    if (parca(d, 'sonik_kovucu') > 0) {
      d.koloni.parcalar.sonik_kovucu -= 1;
      kayipEkipKurtar(d);
      return { metin: 'Sonik kovucunun çığlığı yarığı doldurdu; akrepler kumun altına kaçtı.', ses: 'sonar' };
    }
    miniSavas(d, 'akrep');
    return { metin: 'Ekip yarığın dibinde, ama etrafları sarılmış!', ses: 'red' };
  }
  if (eylemId === 'm_patlat') return { ayar: true, amac: 'mini_bent' };
  if (eylemId === 'm_kompresor') return { valf: true, amac: 'mini_kompresor' };
  if (eylemId === 'm_kazik') {
    if ((d.koloni.kaynaklar.kristal || 0) < 1) return { metin: 'Kazığın ucuna bir kristal gerek.', ses: 'red' };
    d.koloni.kaynaklar.kristal -= 1;
    m.bitenler.push(id);
    if (m.bitenler.length >= 3) {
      solucanBasari(d);
      return { metin: '', ses: 'kur' };
    }
    return { metin: 'Kazık toprağa gömüldü; tepesinde pes bir uğultu başladı. ' + m.bitenler.length + ' / 3.', ses: 'kur' };
  }
  if (eylemId === 'm_etkisiz') {
    if (!d.envanter.includes('kesici')) return { metin: 'Elinde kesici yok; kapsüldeki dolaptan al.', ses: 'red' };
    m.bitenler.push(id);
    if (m.bitenler.length >= 3) {
      yagmaciBasari(d);
      return { metin: '', ses: 'kes' };
    }
    m.dikkat = Math.max(0, (m.dikkat || 0) - 10);
    return { metin: 'Kesicinin düşük ayarlı darbesi; korsan sessizce yere yığıldı. ' + m.bitenler.length + ' / 3.', ses: 'kes' };
  }
  return { metin: '' };
}

// Çeviri krizi seçimi ve bitiş sahnesi
function ceviriSec(d, dogru) {
  // Ortak uzlaşma sentezi: moral +10, itibar +10, yüz bilim puanı; bir tarafı haklı çıkarmak: moral -5, antik veri
  if (dogru) {
    d.itibar += 10;
    moral(d, 10);
    if (!d.yan) d.yan = { aktif: null, biten: [], karar: {}, itibar: {}, bilim: 0, ozel: [] };
    d.yan.bilim = (d.yan.bilim || 0) + 100;
  } else {
    moral(d, -5);
    parcaEkle(d, 'antik_veri', 1);
  }
  bitir(d, dogru ? 'dogru' : 'yanlis');
  return 'mini_tamam';
}
export const SAHNELER = {
  mini_savas: {
    baslik: 'Çatışma bitti',
    metin: (d) => d.miniSavasMetin || ['Çatışma bitti.'],
    secenekler: (d) => [{ etiket: 'Devam', sonra: d.miniSavasSonra || null }],
  },
  mini_mantar_karar: {
    baslik: 'Fotonik kristaller',
    metin: () => ['Dr. Selin: "Üç kristal elimizde. Onları kubbenin aydınlatma hatlarına mı işleyelim, yoksa iksir deneyime mi vereyim?"'],
    secenekler: (d) => [
      { etiket: 'Aydınlatma hatlarına işle', yap: () => { kaynakEkle(d, 'foton_recinesi', 4); moral(d, 5); d.bayrak.fotonHat = true; d.mini.karar = 'hat'; bitir(d, 'dogru'); }, sonra: 'mini_tamam' },
      { etiket: 'Dr. Selin\'in iksir deneyine ver', yap: () => { parcaEkle(d, 'yatistirici', 2); moral(d, 2); d.bayrak.eczaneHizBitis = ((d.zaman && d.zaman.sn) || 0) + GUN_SN; d.mini.karar = 'iksir'; bitir(d, 'dogru'); }, sonra: 'mini_tamam' },
    ],
  },
  mini_vaha_karar: {
    baslik: 'Vahanın suyu',
    metin: () => ['Lina: "Su geri geldi, Kaptan. Doğrudan seralara mı yönlendirelim, yoksa vahanın yabani tohum havuzunu mu sulayalım?"'],
    secenekler: (d) => [
      { etiket: 'Suyu doğrudan seralara yönlendir', yap: () => { moral(d, 5); tarim(d).erzak.peksimet = (d.tarim.erzak.peksimet || 0) + 5; d.mini.karar = 'sera'; bitir(d, 'dogru'); }, sonra: 'mini_tamam' },
      { etiket: 'Vahanın yabani tohum havuzunu sula', yap: () => { moral(d, 5); tarim(d).tohumlar.vaha_hurmasi = (d.tarim.tohumlar.vaha_hurmasi || 0) + 2; d.mini.karar = 'yabani'; bitir(d, 'dogru'); }, sonra: 'mini_tamam' },
    ],
  },
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

// Zaferde (savas.js): operasyon kaldığı yerden sürer; bitirdiyse sonraki sahne tamam ya da karar
ZAFER_KANCALARI.mini_savas = (d) => {
  d.miniSavasMetin = savasZafer(d);
  d.miniSavasSonra = d.sahne === 'mini_savas' ? null : d.sahne;
  d.sahne = 'mini_savas';
};
