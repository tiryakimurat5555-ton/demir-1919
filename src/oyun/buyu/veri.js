// Büyü sisteminin verisi (belgeler/v6 Paket 1, Paket 2, Paket 17). Bağımlılıksız.
//
// Büyü yalnız bulmacalarda, YGK sınavlarında, Tonoflenya büyü görevlerinde ve zanaatta kullanılır; Evrensel Savaş'ta
// büyü menüsü açılmaz (Paket 2 bölüm 5). Kaptan Malken kökenlidir ama büyü aracı olmadığı için asası uyanana kadar
// büyü yapamaz: Malazar Asası iki büyü kristaliyle Malazar büyü tozuna işlenince asa uyanır (T1).
//
// Bulmaca motorunun (buyu/bulmaca.js) "eleman"ı, bir düğüme uygulanabilen her şeydir: 16 ekol büyüsü, 10 özel türevin
// alt hamleleri (şişe salımı ya da fırlatması, hava kademeleri, yıldırım, heykel canlandırma, köprüler...), saha araçları
// ve bazı eşyalar. Paket 17'deki "validCombos" bu eleman kimlikleriyle yazılır.

export const EKOLLER = [
  { id: 'element', ad: 'Element büyüleri', tarif: 'ateş, buz, toprak, yıldırım', ref: 220, ipucu: 'sıcağa, soğuğa ya da taşa' },
  { id: 'tasima', ad: 'Taşıma ve uçma büyüleri', tarif: 'süzülme, kaldırma, rüzgâr, ağırlık', ref: 294, ipucu: 'ağırlığa ve boşluğa' },
  { id: 'tekno', ad: 'Tekno-büyü', tarif: 'devre, frekans, hibrit mühür, otomasyon', ref: 392, ipucu: 'tekno-frekansa ve devreye' },
  { id: 'yanki', ad: 'Yankı, mühür ve zihin', tarif: 'algı, arınma, mühür kırma, zaman', ref: 330, ipucu: 'yankıya ve zihne' },
  { id: 'ozel', ad: 'Özel türevler: şişe, hava, taş ve şekillendirme', tarif: 'şişeleme, hava, heykel, köprü, ikiz, sarmaşık, sıvı, metal, öz bağlama', ref: 262, ipucu: 'özel bir türeve' },
];

// Ekol büyüleri (Paket 1 bölüm 3). odak: temel 10-15, ileri 25-35. ogrenme: tapinak (Axelum Tapınağı, koloni) ya da
// akademi (YGK hocası; kaynak alanı kimden ve hangi görevle). disari: bulmaca dışında da kullanılır (buyu.js disariKullan).
const B = (ad, ekol, odak, ogrenme, kaynak, islev, ek = {}) => ({ ad, ekol, odak, ogrenme, kaynak, islev, ...ek });
export const BUYULER = {
  kivilcim: B('Kıvılcım Dalgası', 'element', 10, 'tapinak', 'Axelum Tapınağı', 'Donmuş kilitleri ve buz kapılarını eritir; karanlık ya da soğuk odalarda ısı verir.', { ses: 'by_kivilcim' }),
  buzul: B('Buzul Mühür', 'element', 12, 'tapinak', 'Axelum Tapınağı', 'Aşırı sıcak reaktör ve lav geçitlerini geçici soğutup yürünür kılar; suyu anında dondurur.', { ses: 'by_buzul' }),
  toprak_yarma: B('Ağır Toprak Yarma', 'element', 30, 'akademi', 'YGK Akademi, Kat -3: Jolkar Tectus (Damarın İzin Verdiği Yer)', 'Kazmanın açamadığı kadim kaya ve enkaz duvarlarını yarar.', { ses: 'by_toprak' }),
  yildirim_rez: B('Yıldırım Rezonansı', 'element', 28, 'akademi', 'YGK Akademi, Kat 1: Ignador (Ölü Bobini Uyandır)', 'Yüksek enerjili eski bobinleri ve Tonoflenya enerji kilitlerini çalıştırır.', { ses: 'by_yildirim' }),
  suzulme: B('Hafif Süzülme', 'tasima', 12, 'tapinak', 'Axelum Tapınağı', 'Yıkık köprü, yarık ve tuzaklı zeminlerin üzerinden hasar almadan süzülerek geçirir.', { ses: 'by_suzulme' }),
  tele_kaldirma: B('Tele-Kaldırma', 'tasima', 15, 'tapinak', 'Axelum Tapınağı', 'Çok ağır kaya bloklarını, enkaz kapaklarını ve sandıkları uzaktan kaldırır.', { ses: 'by_tele' }),
  ruzgar_ucusu: B('Kuzey Rüzgârı Uçuşu', 'tasima', 32, 'akademi', 'YGK Akademi, Kat -4: Zephyra (Rüzgârla Dans)', 'Yüksek kulelere, asılı istasyonlara ve uçurum üstü platformlara uçarak erişir.', { ses: 'by_ruzgar' }),
  agirlik_sifir: B('Kervan Ağırlık Sıfırlama', 'tasima', 26, 'akademi', 'YGK Akademi, Kat 3: Zeva Thorne (Sıfır Denge Platformu)', 'Dev yükleri ve eserleri taşır; gemi ambarındaki ağırlık cezasını bir nöbet sıfırlar.', { ses: 'by_agirlik', disari: true }),
  devre: B('Devre Kıvılcımı', 'tekno', 10, 'tapinak', 'Axelum Tapınağı', 'Enerjisi kesilmiş eski bilgisayarları, kapıları ve asansörleri geçici olarak uyandırır.', { ses: 'by_devre' }),
  frekans_anahtari: B('Frekans Anahtarı', 'tekno', 12, 'tapinak', 'Axelum Tapınağı', 'Ses ya da ton şifreli güvenlik kapılarını doğru frekansı yakalayarak açar.', { ses: 'by_frekans' }),
  hibrit_cozucu: B('Arin–Malken Hibrit Çözücü', 'tekno', 34, 'akademi', 'YGK Akademi, Kat 1-3: Lasiraxi Jolt', 'Normal teknolojinin kıramadığı en karmaşık Arin ve Malken tekno-mühürlerini çözer.', { ses: 'by_hibrit' }),
  kalkan_asirtma: B('Otonom Kalkan Aşırtma', 'tekno', 28, 'akademi', 'YGK Akademi, Kat 2: Tixie (Oculon\'un Kalbi)', 'Havalandırma tünellerini, lazer bariyerlerini ve kilitli cep-ambar kapılarını sessizce aşar.', { ses: 'by_kalkan' }),
  yanki_tarama: B('Sessiz Yankı Taraması', 'yanki', 10, 'tapinak', 'Axelum Tapınağı', 'Görünmez mühürleri, gizli odaları ve pusudaki tehlikeleri üç boyutlu ses yankısıyla ortaya çıkarır.', { ses: 'by_yanki', disari: true }),
  zihin_arindirma: B('Zihin Arındırma', 'yanki', 15, 'tapinak', 'Axelum Tapınağı', 'Karanlık ve zihin paraziti etkilerini, halüsinasyon engellerini ve yüksek stresi temizler.', { ses: 'by_zihin', disari: true }),
  hakikat_yankisi: B('Hakikat Yankısı', 'yanki', 30, 'akademi', 'YGK Akademi, Kat 4 ve -5: Kefius Arateon (Arkanist\'in Çift Mührü)', 'Kadim YGK ve Arkanist mühürlü arşiv kapılarını ve yasak kat kilitlerini kırar.', { ses: 'by_hakikat' }),
  aether_adimi: B('Aether Adımı', 'yanki', 35, 'akademi', 'YGK Akademi, Kat -4: Morwenna (Beşinci Sesin Ötesi)', 'Kısa bir zaman bükümü: zaman döngüsüyle kilitli odalara girer, hızlı kapanan geçitleri aşar.', { ses: 'by_aether' }),
};
export const BUYU_SIRASI = Object.keys(BUYULER);

// On özel türev (Paket 1 bölüm 5). Her türev bir "bilgi"dir; bulmacada uygulanan alt hamleleri ELEMANLAR'da.
export const TUREVLER = {
  siseleme: { ad: 'Yıldız ışığı şişeleme', ogrenme: 'tapinak', kaynak: 'Axelum Tapınağı (temel şişeleme)', islev: 'Beyaz Lumina ve Sarı Solis tozunu şişeye hapseder; şişe aralanarak ya da fırlatılarak kullanılır.' },
  hava: { ad: 'Kademeli hava durumu kontrolü ve yıldırım düşürme', ogrenme: 'akademi', kaynak: 'YGK Akademi, Kat -4: Zephyra (Sıcaklığı Çekme Sınavı)', islev: 'Bulunduğun bölgenin sıcaklığını ve basıncını kademe kademe çeker; yağmurdan sonra yıldırım indirir.' },
  heykel: { ad: 'Renkli taşlarla heykel ve golem canlandırma', ogrenme: 'akademi', kaynak: 'YGK Akademi, Kat -5 ve -3: Kefius Arateon ve Jolkar Tectus (Taşın İçindeki Uyuyan Muhafız)', islev: 'Göğsüne istediği renkte rezonans taşları takılan kadim heykeli uyandırır.' },
  yanki_dugumu: { ad: 'Ses ve yankı düğümü', ogrenme: 'akademi', kaynak: 'YGK Akademi, Kat 2: Kaelis Echo Duman', islev: 'Kapılarda duyulan üç dört notalı diziyi havada yakalayıp doğru ya da ters sırayla çalar.' },
  kopru: { ad: 'Geçici madde ve ışık köprüsü şekillendirme', ogrenme: 'akademi', kaynak: 'YGK Akademi (Zeva Thorne ve Zynae\'nin kristal tekniği)', islev: 'Kumu, donmuş suyu ya da yıldız ışığını geçiş süresince köprüye ve rampaya çevirir.' },
  yanki_ikizi: { ad: 'Yankı ikizi', ogrenme: 'akademi', kaynak: 'YGK Akademi, Kat 2: Kaelis Echo Duman (İki Ses Arasındaki İkiz)', islev: 'Durduğun yerde kalp atışı gibi tıkırdayan bir ikiz bırakır; iki kola aynı anda basılır.' },
  sarmasik: { ad: 'Canlı kök ve sarmaşık büyütme', ogrenme: 'koloni', kaynak: 'Koloni: Sorya ya da Dr. Lyris (Malken doğa büyüsü), Axelum Tapınağı', islev: 'Bir tohum ya da kök parçasını tırmanılabilir sarmaşık merdivene ya da taşı çatlatan köke çevirir.' },
  sivi: { ad: 'Sıvı ve akıntı yönlendirme', ogrenme: 'akademi', kaynak: 'YGK Akademi, Kat 5: Trellis-7 (Taşan Besin Kanalı)', islev: 'Şelaleyi, zehirli göleti ya da lav akıntısını yan kanala çevirir.' },
  metal: { ad: 'Metal ve madde şekillendirme', ogrenme: 'akademi', kaynak: 'YGK Akademi, Kat 3: Forges (Kalıpsız Çelik)', islev: 'Eritilmiş madeni ya da kırık metali kalıba döküp dişliye, kola, kilit parçasına çevirir.' },
  oz_baglama: { ad: 'Öz ve taş bağlama', ogrenme: 'akademi', kaynak: 'YGK Akademi, Kat 4: Kefius Arateon (İleri Mühürleme)', islev: 'Bir görev eşyasına rezonans taşını ya da Lumina, Solis tozunu kalıcı olarak kaynatır.' },
};
export const TUREV_SIRASI = Object.keys(TUREVLER);

// Hava kademeleri (Paket 2 bölüm 3.2): soğutma -1..-4, ısıtma +1..+4. Her hamle 10 odak.
export const HAVA = {
  '-4': { id: 'boran', ad: 'Şiddetli Boran', derece: -18 },
  '-3': { id: 'ayaz', ad: 'Ayaz', derece: -8 },
  '-2': { id: 'sis', ad: 'Yoğun Sis', derece: 0 },
  '-1': { id: 'serin', ad: 'Serin', derece: 8 },
  0: { id: 'normal', ad: 'Normal', derece: 18 },
  1: { id: 'gunes', ad: 'Sıcak Güneş', derece: 30 },
  2: { id: 'nemli', ad: 'Nemli Basınç', derece: 34 },
  3: { id: 'yagmur', ad: 'Şiddetli Yağmur', derece: 26 },
  4: { id: 'firtina', ad: 'Fırtına', derece: 22 },
};
export const HAVA_ADIM_ODAK = 10;
export const YILDIRIM_ODAK = 25;

// Bulmaca elemanları: bir düğüme uygulanabilen her şey.
//   tur: buyu | sise | hava | yildirim | turev | arac
//   bilgi: hangi büyü ya da türev bilinirse kullanılabilir (buyu/turev); arac: hangi eşya gerekir (tuketir: kaç tane)
const L = (ad, tur, ek) => ({ ad, tur, ...ek });
export const ELEMANLAR = {
  ...Object.fromEntries(Object.keys(BUYULER).map((k) => [k, L(BUYULER[k].ad, 'buyu', { bilgi: k, ekol: BUYULER[k].ekol, odak: BUYULER[k].odak, ses: BUYULER[k].ses })])),
  lumina_salim: L('Beyaz Lumina şişesini arala', 'sise', { bilgi: 'siseleme', ekol: 'ozel', renk: 'lumina', firlat: false, ses: 'by_sise_salim' }),
  lumina_firlat: L('Beyaz Lumina şişesini fırlat', 'sise', { bilgi: 'siseleme', ekol: 'ozel', renk: 'lumina', firlat: true, ses: 'by_sise_kir' }),
  solis_salim: L('Sarı Solis şişesini arala', 'sise', { bilgi: 'siseleme', ekol: 'ozel', renk: 'solis', firlat: false, ses: 'by_sise_salim' }),
  solis_firlat: L('Sarı Solis şişesini fırlat', 'sise', { bilgi: 'siseleme', ekol: 'ozel', renk: 'solis', firlat: true, ses: 'by_sise_kir' }),
  ...Object.fromEntries(Object.keys(HAVA).filter((k) => k !== '0').map((k) => ['hava_' + HAVA[k].id, L('Hava: ' + HAVA[k].ad, 'hava', { bilgi: 'hava', ekol: 'ozel', seviye: Number(k) })])),
  hava_durgun: L('Hava: Durgun (rüzgârı ve basıncı yatıştır)', 'hava', { bilgi: 'hava', ekol: 'ozel', odak: 10, ozel: true, ses: 'by_hava_durgun' }),
  hava_ruzgar: L('Hava: Güçlü rüzgâr', 'hava', { bilgi: 'hava', ekol: 'ozel', odak: 10, ozel: true, ses: 'by_hava_ruzgar' }),
  hava_kubbe: L('Hava: Basınç kubbesi', 'hava', { bilgi: 'hava', ekol: 'ozel', odak: 12, ozel: true, ses: 'by_hava_durgun' }),
  yildirim_dusur: L('Yıldırım düşür', 'yildirim', { bilgi: 'hava', ekol: 'ozel', odak: YILDIRIM_ODAK, ses: 'by_yildirim_dusur' }),
  heykel: L('Renkli taşlarla heykeli canlandır', 'turev', { bilgi: 'heykel', ekol: 'ozel', odak: 25, ses: 'by_heykel' }),
  yanki_dugumu: L('Ses ve yankı düğümü', 'turev', { bilgi: 'yanki_dugumu', ekol: 'ozel', odak: 18, ses: 'by_dugum' }),
  isik_koprusu: L('Işık köprüsü', 'turev', { bilgi: 'kopru', ekol: 'ozel', odak: 20, ses: 'by_kopru' }),
  madde_koprusu: L('Geçici madde köprüsü', 'turev', { bilgi: 'kopru', ekol: 'ozel', odak: 20, ses: 'by_kopru' }),
  yanki_ikizi: L('Yankı ikizi bırak', 'turev', { bilgi: 'yanki_ikizi', ekol: 'ozel', odak: 18, ses: 'by_ikiz' }),
  sarmasik: L('Canlı kök ve sarmaşık büyüt', 'turev', { bilgi: 'sarmasik', ekol: 'ozel', odak: 16, ses: 'by_sarmasik' }),
  sivi: L('Sıvı ve akıntı yönlendir', 'turev', { bilgi: 'sivi', ekol: 'ozel', odak: 20, ses: 'by_sivi' }),
  metal: L('Metal ve madde şekillendir', 'turev', { bilgi: 'metal', ekol: 'ozel', odak: 22, ses: 'by_metal' }),
  oz_baglama: L('Öz ve taş bağla', 'turev', { bilgi: 'oz_baglama', ekol: 'ozel', odak: 24, ses: 'by_oz' }),
};
// Saha araçları ve eşyalar sonraki paketlerde (Paket 11, 14) aracEkle ile eklenir: { ad, esya, tuketir }
export function aracEkle(id, ad, esya, tuketir = 0) {
  ELEMANLAR[id] = { ad, tur: 'arac', esya, tuketir, ekol: 'ozel', ses: 'by_arac' };
}
aracEkle('piezo', 'Piezo kristal yerleştir', 'piezo', 1);
aracEkle('bos_sise', 'Boş rezonans şişesiyle sızıntıyı çek', 'bos_sise', 1);

// Renkli rezonans taşları (Paket 2 bölüm 3.3)
export const TASLAR = {
  kizil: { ad: 'Kızıl taş', kaynak: 'Maden kat 26-40, Filtra ve Oronte hattı', rol: 'Saldırı, güç ve ağır taş kapı itme heykelleri.' },
  mavi: { ad: 'Mavi taş', kaynak: 'İç Deniz kayalık koyu, Thalassa ve Flee Plee hattı', rol: 'Soğutma, köprü tutma ve su mührü heykelleri.' },
  sari: { ad: 'Sarı taş', kaynak: 'Gözlem Tepesi, Zorah ve Zeno hattı', rol: 'Işık, elektrik ve tekno devre taşıyan heykeller.' },
  yesil: { ad: 'Yeşil taş', kaynak: 'Termal vaha, Zeris ve Mirelza hattı', rol: 'Şifa, zehir temizleme ve canlandırma dengesi.' },
  mor: { ad: 'Mor taş', kaynak: 'YGK Kat -4 ve -5, Malazar\'ın nadir kalıntıları', rol: 'Lider ve büyük muhafız heykellerinin çekirdek taşı.' },
};
export const TAS_SIRASI = Object.keys(TASLAR);

// Asa kademeleri (Paket 2 bölüm 2.1)
export const ASA = [
  null,
  { ad: 'Malazar Kök Asası', indirim: 0, tarif: 'Malazar asası iki büyü kristaliyle Malazar büyü tozuna işlenince uyandı. Sekiz temel tapınak büyüsünü ve şişelemeyi açar.' },
  { ad: 'YGK Rezonans Asası', indirim: 0.15, tarif: 'Üç kürsü büyü sınavı ve Kefius Arateon\'un onayıyla, piezo ve gümüşle işlendi. Bütün büyülerde odak yüzde on beş az; iki adımlı hava müdahalesini tek hamlede yapar.' },
  { ad: 'Çekirdek Yıldız Asası', indirim: 0.25, tarif: 'Tonoflenya\'da çekirdek taşı ve saf aetherle, Nyxara ve tapınakta işlendi. Bütün büyülerde odak yüzde yirmi beş az; şişe ve heykel gücü artar.' },
];

// Odak doldurucular (Paket 1 bölüm 4.1, Paket 2 bölüm 2.2)
export const ODAK_DOLDURUCU = [
  { id: 'urun_isik_otu', odak: 15 },
  { id: 'urun_kristal_cicek', odak: 20 },
  { id: 'piezo', odak: 30 },
  { id: 'saf_aether', odak: 50 },
  { id: 'cekirdek_tasi', odak: 100 },
];
export const ODAK_EN_COK = 100;
export const ASIRI_YUK = 120; // bir Malazar büyü tozuyla

// Ustalık (Paket 2 bölüm 4): 5 kullanım seviye 2 (odak yüzde on az), 15 kullanım seviye 3 (yüzde yirmi az)
export const USTALIK = [{ n: 0, indirim: 0 }, { n: 5, indirim: 0.1 }, { n: 15, indirim: 0.2 }];
export const SISE_EN_COK = 5;
export const SISE_SALIM = 3; // bir şişe üç salım
export const YANLIS_CEZA = 5;
