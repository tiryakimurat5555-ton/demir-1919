// YGK Akademisi gemi kadrosu (belgeler/tonoflenya-esya-zanaat-ve-murettebat-rehberi.md bölüm 1), Yıldız Ekolü
// Kıdemi (tonoflenya-ve-yeni-sistemler-gelistirici-yonergesi.md 5.A) ve prosedürel istasyon modeli (yönerge 6.C).
// Bağımlılığı yok: savaş, seyir, koloni, tarım, yüzey ve zanaat buradan okur. Saf JavaScript.
//
// d.istasyonlar = { istasyon: subay | null }; subay = { id, ad, cinsiyet, koken, ekol, kidem 1-4, puan, cekirdek,
//   anahtar (çekirdek subayın kimliği), bekleme (savaşta yetenek bekleme turu) }
// d.ekol = { ekol: puan } kaptanın kıdem puanları; d.haberKuyrugu: kademe ve kriz sözleri (gorevler.zamanIlerle söyler)

export const EKOLLER = {
  zhaor: { ad: 'Gümüş Yıldız Ekolü (Zhaor)', renk: 'Gümüş' },
  varek: { ad: 'Kırmızı Yıldız Ekolü (Varek)', renk: 'Kırmızı' },
  axira: { ad: 'Yeşil Yıldız Ekolü (Axira)', renk: 'Yeşil' },
  elyndra: { ad: 'Mor Yıldız Ekolü (Elyndra)', renk: 'Mor' },
  sinha: { ad: 'Mavi Yıldız Ekolü (Sinha)', renk: 'Mavi' },
  uma: { ad: 'Sarı Yıldız Ekolü (Uma)', renk: 'Sarı' },
};
export const EKOL_SIRASI = ['zhaor', 'varek', 'axira', 'elyndra', 'sinha', 'uma'];

// Kıdem basamakları (statik seviye yerine)
export const KIDEMLER = [
  { ad: 'Çırak / Öncü', esik: 0 },
  { ad: 'Seyrüsefer Uzmanı', esik: 100 },
  { ad: 'Yıldız Muhafızı', esik: 300 },
  { ad: 'Baş-Rezonatör', esik: 700 },
];

// Her kademe yeni bir operasyonel kabiliyet açar. belge: true olanlar yönergenin örnekleri; ötekiler aynı ilkeyle
// (sayısal can yerine yeni bir yetenek) her ekolün alanına göre eklendi.
export const KABILIYETLER = {
  zhaor_2: { ad: 'Gümüş rota', tarif: 'Tonoflenya yolculukları yüzde on beş kısa sürer.' },
  zhaor_3: { ad: 'Yıldız pusulası', tarif: 'Uzayda fener menzili yüzde yirmi artar.' },
  zhaor_4: { ad: 'Gümüş sıçrama', tarif: 'Hiper-sıçrama yarı sürede biter.' },
  varek_2: { ad: 'Talim refleksi', tarif: 'Savaşta her uyarıya yarım saniye daha tepki süresi.' },
  varek_3: { ad: 'Zırh delici aether mühimmatı', tarif: 'Dökümhane masasında zırh delici aether mühimmatı zanaatlanabilir.', belge: true },
  varek_4: { ad: 'Kızıl baskın', tarif: 'Her çatışmanın ilk isabetli atışı kritik vurur.' },
  axira_2: { ad: 'Yeşil el', tarif: 'Tarladaki bitkiler yüzde on beş hızlı büyür.' },
  axira_3: { ad: 'Şifa bilgisi', tarif: 'İmbik ünitesindeki ilaçlardan iki doz çıkar.' },
  axira_4: { ad: 'Yaşam çemberi', tarif: 'Koloninin nüfus artışı yüzde yirmi hızlanır.' },
  elyndra_2: { ad: 'Aether duyusu', tarif: 'Aether yataklarından iki kat kristal toplanır.' },
  elyndra_3: { ad: 'Mühür ustalığı', tarif: 'Aether laboratuvarı tariflerinde en çok gereken hammaddeden bir eksik harcanır.' },
  elyndra_4: { ad: 'Taktik teleport', tarif: 'Savaşta uyarı sesi gelince üç parmakla dokun: gemi kısa menzilli ışınlanır, darbe boşa gider (çatışma başına bir kez).', belge: true },
  sinha_2: { ad: 'Kör nokta dinlemesi', tarif: 'Sinyal analizinde pusuları yüzde yirmi beş daha uzaktan duyarsın: savaş uyarılarının süresi yüzde yirmi beş uzar.', belge: true },
  sinha_3: { ad: 'Derin dinleme', tarif: 'Yüzeyde radar menzili yüzde otuz artar.' },
  sinha_4: { ad: 'Kalp atışı', tarif: 'Düşman kalkanının tonuna silah frekansını eşlemek iki kat kolaylaşır.' },
  uma_2: { ad: 'Pazar dili', tarif: 'Ticaret masalarında fiyatlar yüzde on lehine.' },
  uma_3: { ad: 'Altın kervan', tarif: 'Geminin ambar hacmi yüzde elli artar.' },
  uma_4: { ad: 'Altın gece', tarif: 'Sürüklenen sandıklardan iki kat ganimet çıkar.' },
};

// Geminin istasyonları (yönerge 6.C) ve her istasyonun ekolü
export const ISTASYONLAR = {
  reaktor: { ad: 'Rezonans Çekirdeği ve Büyü-Reaktör Odası', unvan: 'Baş Büyü-Mühendisi', ekol: 'elyndra' },
  silah: { ad: 'Taktik Köprü ve Ağır Silah Bataryası', unvan: 'Taktik ve Silah Sistemleri Subayı', ekol: 'varek' },
  revir: { ad: 'Kseno-Laboratuvar, Biyo-Kubbeler ve Revir', unvan: 'Kseno-Biyolog ve Baştabip', ekol: 'axira' },
  dumen: { ad: 'Dümen ve Harita Masası', unvan: 'Seyrüsefer Subayı', ekol: 'zhaor' },
  sonar: { ad: 'Akustik Dinleme Odası ve Spektrum Analiz Masası', unvan: 'Akustik Sinyal ve Derin Sonar Analisti', ekol: 'sinha' },
  hangar: { ad: 'Hangar, Dökümhane ve Basınç Odaları', unvan: 'Hangar, Zırh ve İstihkâm Ustası', ekol: 'uma' },
};
export const ISTASYON_SIRASI = ['reaktor', 'silah', 'revir', 'dumen', 'sonar', 'hangar'];

// Çekirdek kadro. ses: belgedeki seslendirme kimliği (TTS ID; telefonda ekran okuyucu okur, kayıt yok)
export const SUBAYLAR = {
  elyndra: {
    ad: 'Elyndra Val-Tarek', cinsiyet: 'k', istasyon: 'reaktor', ekol: 'elyndra', koken: 'Malkenia 4. Halka', ses: 'voice_elyndra_alto',
    karakter: 'Mor aether akımları ve kristal enerji hatlarında dahi bir kuramcı; YGK eksi üçüncü kattaki reaktör tasarım ekibinden. Soğukkanlı, analitik ve iğneleyici konuşur.',
    pasif: 'Kalkanların enerji tüketimi yüzde on beş düşer; reaktöre atılan aether kristali yüzde yirmi beş fazla güç verir.',
    aktif: { id: 'mor', ad: 'Mor Aşırı Yük', bekleme: 4, tarif: 'Reaktörün aetherini kalkana pompalar: sonraki iki darbe yarı hasar, ama bir tur silah enerjisi kesilir.' },
    kriz: 'Kaptan, rezonans kafesimiz kırk iki saniye içinde çöküyor. Kalkanları boşaltıp iticilere vermenizi öneririm.',
  },
  varek: {
    ad: 'Varek Kaelon', cinsiyet: 'e', istasyon: 'silah', ekol: 'varek', koken: 'Malkenia 2. Halka', ses: 'voice_varek_bass',
    karakter: 'Askerî akademiden; savaş büyüleri ve ağır plazma bataryalarında uzman sert bir Malken askeri. Saldırgan stratejileri ve hızlı baskınları savunur.',
    pasif: 'Bütün kinetik ve plazma silahlarında kritik vuruş ihtimali yüzde on iki artar.',
    aktif: { id: 'kizil', ad: 'Kızıl Odak Atışı', bekleme: 4, tarif: 'Düşmanın kalkan frekansını kırıp doğrudan gövdeye yüzde yüz elli hasarlı odaklanmış plazma ışını (kilit gerekir).' },
    kriz: 'Gövdede sızıntı var ama bataryalar hâlâ sağlam! Geri adım atmıyoruz, burnumuzu hedefe çevirin!',
  },
  axira: {
    ad: 'Dr. Axira Nerys', cinsiyet: 'k', istasyon: 'revir', ekol: 'axira', koken: 'Malkenia 3. Halka', ses: 'voice_axira_soprano',
    karakter: 'Canlı dokular, kseno-botanik, yabancı ekosistemler ve mikrobiyoloji uzmanı; Aethelis-IV tohumlarının evcilleştirilmesinde başrolde. İnsancıl, şefkatli; biyolojik tehditte acımasızca rasyonel.',
    pasif: 'Mürettebatın ve koloninin moral kaybı yarıya iner; seradaki bitkilerin büyüme süresi yüzde yirmi kısalır.',
    aktif: { id: 'hucre', ad: 'Hücresel Yenilenme / Biyo-Kalkan', bekleme: 3, tarif: 'Organik sporları havalandırmaya yayar: mürettebatın stresi silinir, gövde yüzde on onarılır; yüzeyde bir saat zehirli atmosfer tamamen süzülür.' },
    kriz: 'Kaptan, kseno-sporlar filtreyi aşıyor. Laboratuvarı mühürlememe izin verin, gerekirse beni de içeride bırakın!',
  },
  zhaor: {
    ad: 'Zhaor Vel-Amin', cinsiyet: 'e', istasyon: 'dumen', ekol: 'zhaor', koken: 'Malkenia 1. Halka', ses: 'voice_zhaor',
    karakter: 'Gümüş Yıldız ekolünden bir dümenci; şemadaki seyrüsefer istasyonunun subayı. Rota hesaplarını yüksek sesle, sakin bir sayımla yapar.',
    pasif: 'Tonoflenya yolculukları ve uzaydaki yakıt tüketimi yüzde on azalır.',
    aktif: { id: 'gumus', ad: 'Gümüş Rota', bekleme: 5, tarif: 'Çatışmadan çekilme rotası çizer: gemi ganimetsiz ama hasarsız savaştan çıkar.' },
    kriz: 'Kaptan, rota hâlâ elimizde. Bana bir pencere verin, bizi buradan çıkarırım.',
  },
  sinha: {
    ad: 'Sinha Mar-Zul', cinsiyet: 'e', istasyon: 'sonar', ekol: 'sinha', koken: 'Malkenia 5. Halka', ses: 'voice_sinha_tenor',
    karakter: 'Doğuştan kör; Malken\'lerin ses ve rezonans duyusunu doruğa taşımış. Uzayın yerçekimi dalgalarını ve yıldız frekanslarını piyano notaları gibi ayırır. Melodik, fısıltılı, tane tane konuşur.',
    pasif: 'Gizli düşmanları, mayınları ve uzay anomalilerini tespit menzili yüzde otuz beş artar.',
    aktif: { id: 'karartma', ad: 'Akustik Karartma / Şok Dalgası', bekleme: 4, tarif: 'Düşman sonarını sağır eden karşı frekans patlaması: düşmanın sıradaki atışı ıskalar.' },
    kriz: 'Karanlığın içinde bir ritim var kaptan... Bu sıradan bir motor sesi değil; suyun altından gelen bir kalp atışı duyuyorum.',
  },
  drahmir: {
    ad: 'Başçavuş Drahmir Oksid', cinsiyet: 'e', istasyon: 'hangar', ekol: null, koken: 'Batı Kıtası Filtra Oksit Dağları ve Kuzey Drahmir Sınırı karması', ses: 'voice_drahmir_gravel',
    karakter: 'Kristal büyüleriyle uğraşmayan; çekiçte, çelikte, hidrolikte ve kaynakta ustalaşmış emektar bir usta. Ağır zırh kaplamalarından ve yüzey keşif araçlarından sorumlu.',
    pasif: 'Gövde tamirlerinin maliyeti yüzde yirmi azalır; araçların ve kalkış iticilerinin yakıt verimi yüzde on beş artar.',
    aktif: { id: 'kaynak', ad: 'Zırh Kademeleme / Acil Kaynak', bekleme: 4, tarif: 'Hasarlı gövde plakalarını hidrolik kelepçelerle sıkar: gövde anında yüzde yirmi beş onarılır.' },
    kriz: 'Plakalar inliyor ama omurga sağlam! Bana beş dakika ve bir plazma pürmüzü verin, o yarığı kapatırım!',
  },
};
export const SUBAY_SIRASI = ['elyndra', 'varek', 'axira', 'zhaor', 'sinha', 'drahmir'];

// Kaptanın kendi komuta yeteneği
export const KAPTAN = {
  unvan: 'YGK Kıdemli Seyrüsefer Öncüsü ve Filo Komutanı',
  istasyon: 'Merkezi Komuta Köprüsü',
  pasif: 'Komuta aurası: bütün mürettebatın yetenek bekleme süreleri yüzde on kısalır.',
  aktif: { id: 'odak', ad: 'Odaklanmış Rezonans', bekleme: 6, tarif: 'Üç tur boyunca atış isabeti ve kalkan yenilemesi iki katına çıkar: ateş hasarı iki kat, kalkan darbeleri iki kat sönümlenir.' },
};

// --- Yardımcılar ---
export function istasyonlar(d) {
  if (!d.istasyonlar) d.istasyonlar = { reaktor: null, silah: null, revir: null, dumen: null, sonar: null, hangar: null };
  return d.istasyonlar;
}
// İstasyondaki subayın gücü: çekirdek subay 1, prosedürel subay kıdemine göre 0,5-0,8; boşsa 0
export function guc(d, ist) {
  const s = d.istasyonlar && d.istasyonlar[ist];
  if (!s) return 0;
  if (s.cekirdek) return 1;
  return 0.4 + 0.1 * kidemNo(s.puan || 0, s.kidem || 1);
}
// Çekirdek subay ya da o istasyonun ekolünden biri: pasif katkının ölçeği
export function pasif(d, anahtar) {
  const ist = anahtar === 'drahmir' ? 'hangar' : SUBAYLAR[anahtar].istasyon;
  const s = d.istasyonlar && d.istasyonlar[ist];
  if (!s) return 0;
  if (s.cekirdek) return s.anahtar === anahtar ? 1 : 0;
  return guc(d, ist);
}
const ol = (g, x) => 1 + (x - 1) * g; // çarpanı gücüyle ölçekle

export const kalkanIsiCarpani = (d) => ol(pasif(d, 'elyndra'), 0.85);
export const aetherGucCarpani = (d) => ol(pasif(d, 'elyndra'), 1.25);
export const kritikIhtimal = (d) => 0.12 * pasif(d, 'varek');
export const moralKaybiCarpani = (d) => ol(pasif(d, 'axira'), 0.5);
export const tarimCarpani = (d) => ol(pasif(d, 'axira'), 1.25) * (kabiliyet(d, 'axira', 2) ? 1.15 : 1);
export const taramaCarpani = (d) => ol(pasif(d, 'sinha'), 1.35);
export const seyahatCarpani = (d) => ol(pasif(d, 'zhaor'), 0.9) * (kabiliyet(d, 'zhaor', 2) ? 0.85 : 1);
export const yakitCarpani = (d) => ol(pasif(d, 'zhaor'), 0.9);
export const tamirCarpani = (d) => ol(pasif(d, 'drahmir'), 0.8);
export const kalkisYakitCarpani = (d) => ol(pasif(d, 'drahmir'), 0.85);

// Kaptanın bir moral kaybı: Axira yarıya indirir
export function moralKaybi(d, x) {
  d.koloni.moral = Math.max(0, d.koloni.moral - x * moralKaybiCarpani(d));
}

// --- Ekol kıdemi ---
export function kidemNo(puan, taban = 1) {
  let k = 1;
  for (let i = 0; i < KIDEMLER.length; i++) if (puan >= KIDEMLER[i].esik) k = i + 1;
  return Math.max(k, taban);
}
export function ekolPuani(d, e) {
  return (d.ekol && d.ekol[e]) || 0;
}
export function ekolKademe(d, e) {
  return kidemNo(ekolPuani(d, e));
}
export function kabiliyet(d, e, k) {
  return ekolKademe(d, e) >= k;
}
// Kaptan kıdem puanı kazanır; o ekolün istasyonundaki subay da yarısını. Kademe atlanınca söz kuyruğa girer.
export function ekolKazan(d, e, puan) {
  if (!EKOLLER[e] || !puan) return null;
  if (!d.ekol) d.ekol = {};
  const once = ekolKademe(d, e);
  d.ekol[e] = (d.ekol[e] || 0) + puan;
  const sonra = ekolKademe(d, e);
  for (const ist of ISTASYON_SIRASI) {
    const s = d.istasyonlar && d.istasyonlar[ist];
    if (s && s.ekol === e) s.puan = (s.puan || 0) + Math.round(puan / 2);
  }
  if (sonra > once) {
    const kb = KABILIYETLER[e + '_' + sonra];
    const metin = EKOLLER[e].ad + ': kıdemin ' + KIDEMLER[sonra - 1].ad + ' oldu. Yeni kabiliyet: ' + kb.ad + '. ' + kb.tarif;
    haber(d, metin);
    return metin;
  }
  return null;
}
export function haber(d, metin) {
  if (!d.haberKuyrugu) d.haberKuyrugu = [];
  d.haberKuyrugu.push(metin);
}
// Bir subayın kriz sözü (bir sefer boyunca bir kez)
export function kriz(d, anahtar) {
  const ist = SUBAYLAR[anahtar].istasyon;
  const s = d.istasyonlar && d.istasyonlar[ist];
  if (!s || !s.cekirdek || s.anahtar !== anahtar) return null;
  if (!d.krizDendi) d.krizDendi = {};
  if (d.krizDendi[anahtar]) return null;
  d.krizDendi[anahtar] = true;
  return SUBAYLAR[anahtar].ad.split(' ').slice(-2)[0] + ': "' + SUBAYLAR[anahtar].kriz + '"';
}
export function ekolMetni(d, e) {
  const p = ekolPuani(d, e);
  const k = ekolKademe(d, e);
  const son = KIDEMLER[k];
  return EKOLLER[e].ad + ': ' + KIDEMLER[k - 1].ad + ', ' + p + ' puan.' + (son ? ' ' + son.ad + ' için ' + (son.esik - p) + ' puan.' : ' En yüksek kademe.');
}
