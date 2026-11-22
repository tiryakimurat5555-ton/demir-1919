// Kanonik karakter ağı (belgeler/v4/karakter-aglari-murettebat-ve-ygk-akademi.txt bölüm 3, 4, 5).
// Bağımlılığı yok: savaş, seyir, zanaat, tarım, yüzey ve koloni buradan okur. Saf JavaScript.
//
//   d.karakter = { tanis: { id: true }, misafir: id | null, bitis: sn, bekleme: { id: sn }, guc: { guc: puan } }
//   misafir: Tether-Key mekiğiyle Aethelis-IV'e gelen lider ya da gözetmen (en çok bir; iki nöbet kalır).
//   Gözetmen: zanaat taslağının sahibi. Akademide çalışanlar (YGK katlarında) akademideyken, bölge liderleri ve
//   ustalar kendi bölgelerindeyken ya da mekikle koloniye geldiklerinde gözetmendir (d.gozetmen her karede güncellenir).

// fraksiyon: Tonoflenya'nın beş ana gücünden biri (bölüm 5.2)
// yer: haritadaki konuşma noktasının mekânı ve konumu; ygk: akademide çalışır; mekik: Tether-Key ile çağrılabilir
export const KARAKTERLER = {
  valen: {
    ad: 'Valen Lazeria', unvan: 'YGK Yüksek Konsey Rektörü', fraksiyon: 'ygk', yer: ['ygk_6', 14, 6], ygk: true,
    tarif: 'Uzun boylu, sakin; konuştukça salonun kristal duvarları hafifçe titriyor. Sekizler Konseyi\'nden kalan son dâhi; Akademinin Baş Yöneticisi.',
    soz: 'Valen: "Aethelis-IV ile Akademi arasındaki köprü bir çağın kapısı, Kaptan. Konsey bana güvendikçe sana da kapılar açılacak; ama Konsey bölünürse yerime vekilim Morvenna Kael bakar. Hikâye bir kişiye bağlı değil."',
  },
  morvenna: {
    ad: 'Morvenna Kael', unvan: 'Yüksek Konsey Vekili', fraksiyon: 'ygk', yer: ['ygk_6', 6, 14], ygk: true, vekil: true,
    tarif: 'Gri cüppeli, keskin bakışlı bir Malken; Konsey\'in tutanaklarını ezbere bilir.',
    soz: 'Morvenna: "Rektör yerinde olduğu sürece ben yalnızca tutanak tutarım, Kaptan. Ama Konsey bir gün başsız kalırsa ambargo kararını ben yürütürüm; şimdiden tanışmış olalım."',
  },
  kefius: {
    ad: 'Kefius Arateon', unvan: 'Kartografya ve Alt-Evren Kürsüsü Kıdemli Arkanisti', fraksiyon: 'ygk', yer: ['ygk_4', 6, 6], ygk: true,
    tarif: 'Kat dördün sessiz çalışma odasında, boyut haritalarının arasında; sesi kadim bir rezonansla karışıyor.',
    soz: 'Kefius: "Köprünün ilk sinyallerini ben dinledim, Kaptan. Haritalarım senin; eksi beşteki kürsüm ise henüz değil. Dünya Çivisi\'nin mührü sabır ister."',
  },
  ignador: {
    ad: 'Ignador', unvan: 'Ağır Plazma Talimgâhı Eğitmeni', fraksiyon: 'ygk', yer: ['ygk_1', 4, 16], ygk: true, taslak: 'geometrik_namlu',
    tarif: 'Kat birin dış muhafız amfisinde, plazma mermilerinin kokusu arasında; eski Zeris Kulesi muhafızı. Konuşkan, Konsey\'e diş bileyen bir taktik ustası.',
    soz: 'Ignador: "Konsey sana uzun nutuklar atar, ben sana namlu veririm! T-06 Geometrik Plazma Namlusu\'nun taslağı benim. Dökümhanende dökersen ve ben başında olursam her isabette kalkanın tazelenir. Dördüncü kademe dökümhane kilidi benim işim değil; o senin tersanene bağlı."',
  },
  tixie: {
    ad: 'Tixie', unvan: 'Zefiryum kökenli teknopat kaçak', fraksiyon: 'ygk', yer: ['ygk_2', 17, 3], ygk: true, taslak: 'cep_ambar',
    tarif: 'Kat ikinin cep-parkı ile havalandırma şebekesi arasında yaşayan, sesi borulardan yankılanan ufak bir kaçak.',
    soz: 'Tixie (havalandırma ızgarasının ardından): "Ssst! Oculon cep-boyutlarını bilirim ben. Beşinci kattan bana bir boyut sabitleyici çip getirirsen T-03 Katlanmış Cep-Ambar\'ı birlikte yaparız: ambarın üç kat büyür, korsan taramasından da gizli bir cebin olur."',
  },
  lyra: {
    ad: 'Lyra', unvan: 'Aether Simya Laboratuvarı optikçisi', fraksiyon: 'ygk', yer: ['ygk_5', 4, 4], ygk: true, taslak: 'sogut_nisangahi',
    tarif: 'Kat beşin laboratuvarında Loran söğüdü reçinesiyle mercek döken bir Malken.',
    soz: 'Lyra: "T-08 Gümüş Söğüt Nişangâhı benim elimden çıkar. Başında olursam reçine daha az gider; nişangâh zayıf noktanın sesini bile duyurur."',
  },
  nyxara: {
    ad: 'Nyxara Vel\'din', unvan: 'Arin\'den sürgün eski baş mucit', fraksiyon: 'guney', yer: ['aether_dock', 14, 52], taslak: 'rezonans_halkasi', mekik: true,
    tarif: 'Tentran kıyısında, platformun kuytusunda kendi atölyesinde çalışıyor. Resmî Arin elçisi değil; elçi Aethelgard.',
    soz: 'Nyxara: "Arin beni sürdü; ama Tether-Key benim buluşum, Kaptan. Kimin yanında durursan dur, T-04 Rezonans Halkası\'nın taslağını sana veririm: mekiklerin dönüşü altı nöbetten iki nöbete iner."',
  },
  oronte: {
    ad: 'Oronte', unvan: 'Filtra Maden Sendikası önderi (Batı Kuşağı)', fraksiyon: 'bati', yer: ['filtra', 30, 40], taslak: 'civa_plakasi', mekik: true,
    etki: 'Kolonideyken ağır zırh ve araç üretimi ile gemi bakımının maliyeti yarıya iner.',
    tarif: 'Yarı-sentetik bir maden önderi; sesi pistonlu bir göğüs kafesinden geliyor. Akademinin tutsağı değil, Batı\'nın lideri.',
    soz: 'Oronte: "Filtra\'nın cıvası benim sendikamın alın teri, Kaptan. T-02 Akışkan Cıva Plakası\'nın taslağını al. Mekiğini gönderirsen iki nöbet kolonine gelir, zırhını ve araçlarını yarı fiyatına döktürürüm."',
  },
  curetkar_cuce: {
    ad: 'Cüretkâr Cüce', unvan: 'Filtra madenlerinin sondaj ustası', fraksiyon: 'bati', yer: ['filtra', 44, 22], taslak: 'magma_matkap', mekik: true,
    etki: 'Kolonideyken yüzey madenciliği iki kat verir.',
    tarif: 'Omzunda koca bir matkap taşıyan, kahkahası kayaları titreten kısa boylu bir usta.',
    soz: 'Cüretkâr Cüce: "T-10 Magma Çekirdekli Matkap mı? Ha! Başında ben dururum, sen yeter ki lav orkidesini getir. Filtra Madenci Şartnamesi\'ni de unutma."',
  },
  kaelan: {
    ad: 'Kaelan', unvan: 'Helgar kara buz zırh ustası', fraksiyon: 'kuzey', yer: ['helgar', 30, 30], taslak: 'kemik_zirh', mekik: true,
    etki: 'Kolonideyken T-01 Kemik-Alaşım Zırhı yüzde yirmi beş ucuza dökülür.',
    tarif: 'Erimeyen siyah buzun yanında örs başında; zırhı kemik gibi esneten bir usta. Akademinin tutsağı değil, kendi bölgesinde yaşıyor.',
    soz: 'Kaelan: "Kemik esner, kırılmaz. T-01 Kemik-Alaşım Zırhı\'nın sırrı bu. Taslağı al; mekikle çağırırsan döküm başında dururum."',
  },
  barracuda: {
    ad: 'Kaptan Barracuda', unvan: 'Fleeplee Toz Sahili korsan kaptanı (Güney Kuşağı)', fraksiyon: 'guney', yer: ['flee_plee', 46, 44], taslak: 'plazma_pencesi', mekik: true,
    etki: 'Kolonideyken seferlerde kargo kaybı sıfırlanır, baskınlarda maden ambarları korunur.',
    tarif: 'Veradon Donanması\'na açıkça düşman; limana değil, toz sahilindeki batık bir kadırgaya kurulmuş. Sesi tuzlu ve alaycı.',
    soz: 'Barracuda: "Veradon\'un donanması beni asmak için yarışıyor, Kaptan; sen benim derdimi bilirsin. T-07 Plazma Pençeli Kesici\'nin taslağı senin. Mekiğini gönder, iki nöbet ambarlarına bekçilik ederim: tek bir külçe kaybolmaz."',
  },
  zeno: {
    ad: 'Silahşör Zeno', unvan: 'Zorah Kervan Yolu muhafızı (Doğu Kuşağı)', fraksiyon: 'dogu', yer: ['gri_yel', 40, 20], mekik: true,
    etki: 'Kolonideyken koloni savunması yüzde kırk güçlenir, dış sektörlerde yaratık pususu ve baskın olmaz.',
    tarif: 'Yolboyu Hanı\'nın gölgeli verandasında, kum büyücüleriyle kâğıt oynuyor; tabancasının horozu ara ara tıkırdıyor.',
    soz: 'Zeno: "Kervanlar benim yüzümden sağ varır, Kaptan. Mekiğini yollarsan iki nöbet kolonini beklerim; sektörlerinde tek bir yaratık pusu kuramaz."',
  },
  mirelza: {
    ad: 'Mirelza', unvan: 'Zeris Dış Kulesi sonik sürgünü (Kuzey Kuşağı)', fraksiyon: 'kuzey', yer: ['zeris', 20, 46], taslak: 'sonik_tufek', mekik: true,
    etki: 'Kolonideyken radar ve rezonans tarama menzili iki katına çıkar, seradaki bitkiler yüzde otuz hızlı büyür.',
    tarif: 'Zeris Kulesi\'nin dış basamaklarında, rüzgârın çığlığıyla şarkı söyleyen bir sürgün. Akademinin tutsağı değil.',
    soz: 'Mirelza: "Sesim kristali çatlatır, Kaptan. T-05 Sonik Çığlık Tüfeği\'nin taslağını sana veriyorum. Mekiğinle gelirsem radarın iki kat uzağı duyar, seran da şarkımla büyür."',
  },
  sarah: {
    ad: 'Sarah', unvan: 'Loran Vadisi botanikçisi', fraksiyon: 'bati', yer: ['loran', 24, 24], taslak: 'kseno_panzehir', mekik: true,
    etki: 'Kolonideyken T-09 Kseno-Panzehir yüzde yirmi beş ucuza hazırlanır.',
    tarif: 'Dalga enerjisi istasyonunun yanında, falezlerin kovuğunda kendi serası; ellerinden yosun kokusu eksik olmuyor.',
    soz: 'Sarah: "T-09 Evrensel Kseno-Panzehir zehiri, radyasyonu, kara aetherin lanetini siler. Taslak senin; Mycelia\'dan bir numune getirirsen bir kazandan iki kat çıkarırım."',
  },
};
export const KARAKTER_SIRASI = ['valen', 'morvenna', 'kefius', 'ignador', 'tixie', 'lyra', 'nyxara', 'oronte', 'curetkar_cuce', 'kaelan', 'barracuda', 'zeno', 'mirelza', 'sarah'];

// Xarathia yalnız Pyros-Prime'ın üç aşamalı görevinin ateş figürü (gezegen hikâyesi; konuşulacak bir NPC değil)
export const XARATHIA_NOTU = 'Xarathia: Pyros-Prime\'ın ateş figürü. YGK tutsağı da Malazar afeti de değil.';

export function karakterDurumu(d) {
  if (!d.karakter) d.karakter = { tanis: {}, misafir: null, bitis: 0, bekleme: {}, guc: {} };
  if (!d.karakter.guc) d.karakter.guc = {};
  return d.karakter;
}
export function misafir(d, id) {
  return !!(d.karakter && d.karakter.misafir === id);
}

// --- Evren itibarı (bölüm 5.1): harcanmaz, eşik açtıkça güçlendirir ---
export const EVREN_ESIKLERI = [0, 1000, 5000, 12000];
export function evrenKademe(d) {
  let k = 0;
  EVREN_ESIKLERI.forEach((e, i) => {
    if ((d.itibar || 0) >= e) k = i;
  });
  return k;
}
// pazar: alım-satımda lehine oran; tarama: akademi ve dinleme taramaları; bilim: araştırma hızı; savunma: alınan hasar
// azalması; korsan: korkutma ve erken teslim (yüzde otuz beş)
export function evrenEtki(d) {
  const k = evrenKademe(d);
  return {
    kademe: k,
    pazar: [0, 0.1, 0.15, 0.25][k],
    tarama: k >= 1 ? 0.15 : 0,
    bilim: [0, 0, 0.25, 0.35][k],
    savunma: k >= 3 ? 0.1 : 0,
    korsan: k >= 2,
  };
}

// --- Tonoflenya bölge itibarı (bölüm 5.2): beş ana güç, -100 … +100 ---
export const GUCLER = {
  ygk: 'YGK Akademi',
  bati: 'Batı ve Filtra Sendikası',
  guney: 'Güney, Fleeplee ve Veradon',
  dogu: 'Doğu, Zorah Çöl Loncası',
  kuzey: 'Kuzey, Zeris ve Mormon',
};
export const GUC_SIRASI = ['ygk', 'bati', 'guney', 'dogu', 'kuzey'];
// Yan görevlerin mikro fraksiyonları (tonoflenya/yan.js FRAKSIYONLAR) beş güce toplanır
export const FRAKSIYON_GUCU = {
  akademi: 'ygk', ygk_astronomi: 'ygk', bilim_enstitusu: 'ygk', magentor_konseyi: 'ygk', malken_sarayi: 'ygk', varek_muhafiz: 'ygk',
  sehir_guvenligi: 'ygk', sehir_halki: 'ygk', uma_aristokrasi: 'ygk', botanikciler: 'ygk', karaborsa: 'ygk', yasal: 'ygk',
  julithan: 'bati', julithan_senatosu: 'bati', anitor: 'bati', filtra_madencileri: 'bati', safran_gocebeleri: 'bati',
  fleeplee: 'guney', tentran: 'guney', arin: 'guney', veradon: 'guney', tharal: 'guney', keralon: 'guney',
  col_kabileleri: 'dogu', kervan_loncasi: 'dogu', dogu_kesisleri: 'dogu', sinir_muhafiz: 'dogu', drahmir: 'kuzey', avcilar: 'dogu',
  g_ygk: 'ygk', g_bati: 'bati', g_dogu: 'dogu', g_kuzey: 'kuzey', g_guney: 'guney',
  mormon_muhafiz: 'kuzey', norvask: 'kuzey', helgar: 'kuzey', doga_koruma: 'kuzey',
};
export const ITIBAR_BASAMAKLARI = [
  { esik: -100, ad: 'Düşman' },
  { esik: -59, ad: 'Soğuk' },
  { esik: -19, ad: 'Tarafsız' },
  { esik: 20, ad: 'Dost' },
  { esik: 60, ad: 'Müttefik' },
];
export function gucItibari(d, guc) {
  let p = (d.karakter && d.karakter.guc && d.karakter.guc[guc]) || 0;
  const it = (d.yan && d.yan.itibar) || {};
  for (const k of Object.keys(it)) if (FRAKSIYON_GUCU[k] === guc) p += it[k];
  // Galaktik Öncü kademesi: beş ana güç başlangıçta +10 saygınlık tanır
  if (evrenKademe(d) >= 2) p += 10;
  return Math.max(-100, Math.min(100, p));
}
export function gucBasamagi(p) {
  let a = ITIBAR_BASAMAKLARI[0].ad;
  for (const b of ITIBAR_BASAMAKLARI) if (p >= b.esik) a = b.ad;
  return a;
}
export function gucEkle(d, guc, n) {
  const k = karakterDurumu(d);
  k.guc[guc] = (k.guc[guc] || 0) + n;
}
