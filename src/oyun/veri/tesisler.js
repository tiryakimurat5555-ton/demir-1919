// Koloni tesisleri ve hammaddeler (belgeler/uzay-oyunu-tasarim-ve-senaryo.md bölüm 2,
// belgeler/araclar-ve-gemi-filosu.md bölüm 4). Saf veri.

// Hammaddeler: kimlik → ad ve sesli tarif
export const HAMMADDELER = {
  bazalt: { ad: 'bazalt', tarif: 'Vadinin gevşek bazalt kayası. Dökümhanede eritilip temel plakaya döner.' },
  titanyum: { ad: 'titanyum', tarif: 'Titanyum-karbon: kopan modülün hurdasından ya da sırtlardaki ağır metal damarlarından.' },
  kristal: { ad: 'silikat kristali', tarif: 'Tıklandığında cam gibi tınlayan piezo-optik kristal. Sensörlerde ve kalkanlarda kullanılır.' },
  izotop: { ad: 'ağır izotop', tarif: 'Manyetik sırtların gaz bacalarından. Reaktör yakıtı.' },
  kseno: { ad: 'kadim kseno-kristal', tarif: 'Harabelerden; melodik tonlar yayan antik teknoloji.' },
  polimer: { ad: 'asit-direnç polimeri', tarif: 'Kükürt çatlaklarından; kimyasala dayanıklı yalıtım.' },
  sivi_metal: { ad: 'sıvı metal iletkeni', tarif: 'Cıva şelalelerinden; voltaj kaybını sıfırlayan olağanüstü iletken alaşım.' },
  civa_tortusu: { ad: 'manyetik cıva tortusu', tarif: 'Koloninin kalkan jeneratörlerine katılınca koruma bariyerini iki kat güçlendirir.' },
  foton_recinesi: { ad: 'organik foton reçinesi', tarif: 'Mantar ormanının fotonik yosunundan; gemi ve kubbe aydınlatmasında doğal ışık kaynağı.' },
  kseno_spor: { ad: 'sakinleştirici kseno-spor', tarif: 'Revirlerde ve uyum merkezlerinde yatıştırıcı ve antibakteriyel ilaç yapımında.' },
  kriyolit: { ad: 'süperiletken kriyolit', tarif: 'Metan mağaralarından; reaktör soğutma borularında ve hiper-sürücü çekirdeklerinde.' },
  metan: { ad: 'sıvılaştırılmış metan', tarif: 'Acil manevra roketleri ve yerel fırlatma yakıtı.' },
  plazma_cami: { ad: 'kusursuz plazma camı', tarif: 'Obsidyen ovasından; kokpit camları, teleskop mercekleri ve sensör prizmaları.' },
  obsidyen: { ad: 'obsidyen kompozit tabaka', tarif: 'Lazer ve enerji silahlarına karşı yansıtıcı zırh kaplaması.' },
  antigrav_tozu: { ad: 'antigravitasyon tozu ve çekirdek jeot', tarif: 'Asılı kulelerden; gravitasyon kalkanı ve iniş yakıtı tasarrufu.' },
  graviton: { ad: 'graviton minerali', tarif: 'Manyetik sırtların derin kuyularından; yalnız sondaj tankıyla çıkar. Graviton yakıtının hammaddesi.' },
};

export const HAMMADDE_SIRASI = ['bazalt', 'titanyum', 'kristal', 'izotop', 'kseno', 'polimer', 'graviton', 'sivi_metal', 'civa_tortusu', 'foton_recinesi', 'kseno_spor', 'kriyolit', 'metan', 'plazma_cami', 'obsidyen', 'antigrav_tozu'];

// Tesisler. maliyet: hammadde kimliği → miktar. kosul(d): inşa edilebilmesi için hikâye koşulu.
export const TESISLER = {
  sinyal_kulesi: {
    ad: 'Derin Uzay Dinleme ve Sinyal Kulesi',
    kisa: 'Sinyal Kulesi',
    islev: 'Uzaydaki anomalileri, mors kodlarını ve acil durum fenerlerini tarar.',
    katki: 'Kripto-Anten ve Uzun Menzilli Telsiz birimlerini üretir.',
    acar: 'Uzay haritasında yeni ziyaret noktaları belirir.',
    maliyet: { bazalt: 6, titanyum: 3, kristal: 2 },
    kosul: (d) => !!d.bayrak.telemetri,
    kosulMetni: 'Önce Gözcü Tepesi\'ndeki anteni kurup yörüngeden telemetri indirmelisin.',
  },
  dokumhane: {
    ad: 'Ağır Alaşım Dökümhanesi',
    kisa: 'Dökümhane',
    islev: 'Bazalt, titanyum ve karbonu eritip zırh levhalarına dönüştürür.',
    katki: 'Geminin omurgasını, gövde plakalarını ve basınç perdelerini imal eder.',
    acar: 'Geminin meteorit ve plazma darbelerine dayanımı.',
    maliyet: { bazalt: 10, titanyum: 5 },
    kosul: (d) => !!d.bayrak.sondaj,
    kosulMetni: 'Önce Manyetik Sırtlar\'daki gaz bacalarından ağır izotop hasat edilmeli.',
  },
  reaktor_lab: {
    ad: 'Graviton ve Reaktör Laboratuvarı',
    kisa: 'Reaktör Laboratuvarı',
    islev: 'Jeotermal gazları plazma yakıt hücrelerine dönüştürür.',
    katki: 'Ana Enerji Çekirdeği ve İtki Motorları.',
    acar: 'Derin uzay sıçramaları için menzil ve güç.',
    maliyet: { izotop: 4, titanyum: 3, kristal: 2 },
    kosul: (d) => !!d.bayrak.tersane,
    kosulMetni: 'Önce tersane kurulmalı; laboratuvar geminin yakıtını ve reaktörünü yapar.',
  },
  yasam_blogu: {
    ad: 'Basınçlı Yaşam Bloğu',
    kisa: 'Yaşam Bloğu',
    islev: 'Öncüler ve yeni gelenler için basınçlı, ısıtmalı konutlar.',
    katki: 'Gemiye katkısı yok; koloninin taşıyabileceği nüfusu artırır.',
    acar: 'Barınma kapasitesi on kişi artar; nüfus büyüyebilir.',
    maliyet: { bazalt: 8, titanyum: 2, polimer: 1 },
    kosul: (d) => !!d.bayrak.dokumhane,
    kosulMetni: 'Önce dökümhane kurulmalı.',
  },
  biyo_kubbe: {
    ad: 'Kseno-Biyoloji Araştırma Kubbesi',
    kisa: 'Biyoloji Kubbesi',
    islev: 'Antik kalıntılardan ve uzaydan gelen yabancı örnekleri izole eder.',
    katki: 'Biyo-Karantina Bölmesi ve Plazma Dekontaminasyon kabinleri.',
    acar: 'Biyolojik tehlikeli uzay görevlerine giriş.',
    maliyet: { kseno: 3, kristal: 3, titanyum: 2 },
    kosul: (d) => !!d.bayrak.kazi,
    kosulMetni: 'Önce Kadim Krater\'deki gömülü yapıdan veri kristallerini ve yıldız haritasını getirmelisin.',
  },
  arac_hangari: {
    ad: 'Yüzey Araçları Montaj Hangarı',
    kisa: 'Araç Hangarı',
    islev: 'Yüzey araçlarının şasi montajı, zırh kaplaması ve motor entegrasyonu; şasi çeliği atölyesi.',
    katki: 'Şasi çeliği üretir.',
    acar: 'Çöl Tilkisi, Mammoth, Demir Kervan, Atmosphere-X ve Akrep.',
    maliyet: { bazalt: 10, titanyum: 6, kristal: 2 },
    kosul: (d) => !!d.bayrak.dokumhane && d.bayrak.jenerator,
    kosulMetni: 'Dökümhane ve temel elektrik şebekesi gerekir.',
  },
  tersane: {
    ad: 'Merkezi Montaj Tersanesi',
    kisa: 'Tersane',
    islev: 'Üretilen modülleri, motorları ve zırhı birleştiren açık hava kızağı.',
    katki: 'Geminin parça parça birleştirildiği ve fırlatıldığı tesis.',
    acar: 'Gemiyi tamamlamak, sefere çıkmak ve dönüşte onarım.',
    maliyet: { bazalt: 12, titanyum: 6, polimer: 2 },
    kosul: (d) => !!d.bayrak.zemin,
    kosulMetni: 'Uğultulu Plato\'nun zemini güçlendirilince kurulacak.',
  },
};

// Kızak kademeleri (araclar-ve-gemi-filosu.md 1.2) tersanenin yükseltmeleridir
TESISLER.tersane_2 = {
  ad: 'Kademe II Manyetik Beşik',
  kisa: 'Manyetik Beşik',
  islev: 'Kızağı manyetik bir beşikle genişletir.',
  katki: 'Taktik fırkateyn (Aethel Muhafızı) ve ağır lojistik kruvazörü (Gökdelen) inşası.',
  acar: 'Kademe 3 ve 4 gemiler.',
  maliyet: { bazalt: 20, titanyum: 12, kristal: 6, polimer: 4 },
  kosul: (d) => !!d.bayrak.tersane && !!d.gemi,
  kosulMetni: 'Önce tersane kurulmalı ve ilk gemi bitmeli.',
};
TESISLER.tersane_3 = {
  ad: 'Kademe III Yörüngesel Hisar Tersanesi',
  kisa: 'Hisar Tersanesi',
  islev: 'Yerçekimsiz montaj halkalarıyla göğe uzanan dev kızak.',
  katki: 'Süper ağır sancak zırhlısı (Hisar-ı Kadim) inşası.',
  acar: 'Kademe 5 gemi.',
  maliyet: { bazalt: 40, titanyum: 25, kseno: 6, graviton: 4 },
  kosul: (d) => d.koloni.binalar.includes('tersane_2'),
  kosulMetni: 'Önce Kademe II Manyetik Beşik kurulmalı.',
};

// Entegrasyon matrisi tesisleri (uzay-oyunu-tasarim-ve-senaryo.md bölüm 6): her biri bir yüzey işiyle açılır
const matrisTesisi = (id, ad, kisa, islev, katki, acar, maliyet, bayrak, kosulMetni) => {
  TESISLER[id] = { ad, kisa, islev, katki, acar, maliyet, kosul: (d) => !!d.bayrak[bayrak], kosulMetni };
};
matrisTesisi('kuantum_lab', 'Kuantum İtki ve Reaktör Kalibrasyon Laboratuvarı', 'Kuantum Laboratuvarı', 'Reaktörlerin frekans ayarını yapar, sürücü bobinlerini sızıntı testinden geçirir.', 'Kuantum rezonans sürücüsü, zaman çapası, takonik çözücü, ters itki bobinleri.', 'Uzay haritasında Zaman Döngüsü Havzası.', { bazalt: 12, titanyum: 8, kristal: 6, kseno: 2 }, 'kalibrasyon', 'Önce Kadim Krater\'deki kalibrasyon sütununda rezonatörü kalibre et.');
matrisTesisi('itki_hangari', 'İtki Hangarı', 'İtki Hangarı', 'Sıkıştırılmış izotopla ağır itki ve çekim sistemlerini sınar.', 'Ağır çekici kiriş ve aşırı yüklü iyon iticileri.', 'Uzay haritasında Xerad Boyut Yarığı.', { bazalt: 14, titanyum: 8, izotop: 3 }, 'sikistirma', 'Önce bir gaz bacasında izotop sıkıştırması yap.');
matrisTesisi('kriyo_atolye', 'Kriyo-Atölye', 'Kriyo-Atölye', 'Isı yalıtımı ve soğutma sistemleri üretir.', 'Yangın bastırma kalkanı ve kriyo-plazma pompaları.', 'Uzay haritasında yanan araştırma gemisi.', { bazalt: 10, titanyum: 6, polimer: 3 }, 'izolasyon', 'Önce sırtlardaki üç gaz bacasını ısıya karşı yalıt.');
matrisTesisi('askeri_tersane', 'Askeri Tersane', 'Askeri Tersane', 'Zırh ve silah donanımı için alaşım kaplı ağır kızak.', 'Ağır hisar bataryası, hisar zırhı, termal karartma, tahliye ambarı.', 'Uzay haritasında Aethel-9 yörünge hattı.', { bazalt: 20, titanyum: 12, polimer: 4 }, 'kaplama', 'Önce platodaki kızağın zeminini zırhlı alaşımla kapla.');
matrisTesisi('komuta_merkezi', 'Komuta Merkezi', 'Komuta Merkezi', 'Kule, dökümhane ve jeneratörü tek bir ağda yönetir.', 'Karadutu analizörü, optik kripto-bellek, jammer kalkanı.', 'Uzay haritasında Tarras Boğazı.', { bazalt: 12, titanyum: 8, kristal: 6 }, 'ag', 'Önce Gözcü Tepesi\'nde koloninin ağ şebekesini kur.');
matrisTesisi('yuksek_reaktor', 'Yüksek Enerji Reaktörü', 'Yüksek Enerji Reaktörü', 'Kadim şifreyle çalışan dev graviton reaktörü.', 'Graviton mancınık sürücüsü.', 'Uzay haritasında Kızıl Yutucu olay ufku.', { bazalt: 20, titanyum: 14, kseno: 4, graviton: 4 }, 'sifre', 'Önce iç mabetteki yazıtın kadim şifresini çöz.');

// Yerel biyomlardan beslenen tesisler (gezegen-gelisimi-v2 2.1 ve 3.4)
TESISLER.jeotermal_santral = {
  ad: 'Jeotermal Enerji Santrali',
  kisa: 'Jeotermal Santral',
  islev: 'Lav koridorlarının derin ısısını koloninin şebekesine verir.',
  katki: 'Bütün tesislerde üretim yüzde yirmi hızlanır.',
  acar: 'Koloniye bol enerji.',
  maliyet: { bazalt: 10, titanyum: 6, polimer: 2 },
  kosul: (d) => (d.gorulenMekanlar || []).includes('lav'),
  kosulMetni: 'Önce güneydeki lav koridorlarını keşfet.',
};
TESISLER.koloni_kalkani = {
  ad: 'Koloni Kalkan Jeneratörü',
  kisa: 'Kalkan Jeneratörü',
  islev: 'Koloniyi radyasyon fırtınalarına ve saldırılara karşı bir enerji bariyeriyle örter; manyetik cıva tortusu bariyeri iki kat güçlendirir.',
  katki: 'Manyetosfer terraformingi ve savunma için.',
  acar: 'Koloni kalkanı.',
  maliyet: { civa_tortusu: 3, titanyum: 6, kristal: 4 },
  kosul: (d) => (d.gorulenMekanlar || []).includes('civa'),
  kosulMetni: 'Önce cıva şelalelerini keşfet; tortusu gerekir.',
};

export const TESIS_SIRASI = ['sinyal_kulesi', 'dokumhane', 'yasam_blogu', 'arac_hangari', 'reaktor_lab', 'biyo_kubbe', 'tersane', 'tersane_2', 'tersane_3', 'kuantum_lab', 'itki_hangari', 'kriyo_atolye', 'askeri_tersane', 'komuta_merkezi', 'yuksek_reaktor', 'jeotermal_santral', 'koloni_kalkani'];

// Koloni kademeleri (gezegen-gelisimi-ve-yerel-gorevler-v2.md bölüm 9)
export const KOLONI_KADEMELERI = [
  null,
  { unvan: 'Düşmüş İskelet', tarif: 'Yalnızca ana vadi. Hayatta kalan ilk öncüler.' },
  { unvan: 'Sağlamlaşmış Vaha', tarif: 'Kükürt vadisi temiz, ilk madenciler ve teknisyenler.' },
  { unvan: 'Endüstriyel Koloni', tarif: 'Bütün sektörler güvenli, gemi tersanesi ve akademi.' },
  { unvan: 'Galaktik Başkent', tarif: 'Bütün gezegen ve yörünge istasyonları açık.' },
];

export function maliyetMetni(maliyet) {
  return Object.keys(maliyet)
    .map((k) => maliyet[k] + ' ' + HAMMADDELER[k].ad)
    .join(', ');
}

export function karsilanirMi(kaynaklar, maliyet) {
  return Object.keys(maliyet).every((k) => (kaynaklar[k] || 0) >= maliyet[k]);
}

export function eksikMetni(kaynaklar, maliyet) {
  const eksik = Object.keys(maliyet)
    .filter((k) => (kaynaklar[k] || 0) < maliyet[k])
    .map((k) => maliyet[k] - (kaynaklar[k] || 0) + ' ' + HAMMADDELER[k].ad);
  return eksik.length ? 'Eksik: ' + eksik.join(', ') + '.' : '';
}
