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
};

export const HAMMADDE_SIRASI = ['bazalt', 'titanyum', 'kristal', 'izotop', 'kseno', 'polimer'];

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

export const TESIS_SIRASI = ['sinyal_kulesi', 'dokumhane', 'yasam_blogu', 'reaktor_lab', 'biyo_kubbe', 'tersane'];

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
