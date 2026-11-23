// Xeno-fauna verisi (belgeler/v5 Paket 14 ve 15). Bağımlılıksız.
//
// GENLER: sekiz ana gen grubu (dört Dünya, dört Malken/dış gezegen); Kaptan Orin'den genom kapsülü olarak gelir.
// HAYVANLAR: 50 tür. koken dunya | malken | melez; nadir yaygin | nadir | mutasyon | efsanevi;
//   genler  bu türün çıkabildiği gen çifti: tek gen = çiftte o gen varsa; iki gen = çift tam bu ikisi;
//           boş = efsanevi, herhangi bir Dünya + Malken çifti
//   modul   üretim için gereken barınak modülü (null: üretim hattı yok, özel rol)
//   urun    günlük ürün { kimlik: adet } (1'den küçük adet = o ihtimalle bir tane)
//   ses     barınaktaki konumlu ses ailesi (assets/ses/konumsal/h_<ses>.wav)
//   rol     üretim dışı rol (hayvan.js): yoldas, kedi, aksam, horoz, alarm, esele, guve, yonca, festival, anka, moral, sofra
export const GENLER = {
  kanatli: { ad: 'Dünya kanatlı geni', koken: 'dunya' },
  yun: { ad: 'Dünya küçükbaş ve yün geni', koken: 'dunya' },
  sut: { ad: 'Dünya süt memelisi geni', koken: 'dunya' },
  ari: { ad: 'Dünya böcek ve arı geni', koken: 'dunya' },
  kristal: { ad: 'Malken kristal kabuk geni', koken: 'malken' },
  termal: { ad: 'Termal sürüngen geni', koken: 'malken' },
  yanki: { ad: 'Akustik yankı kuşu geni', koken: 'malken' },
  sis: { ad: 'Sis-yünü memeli geni', koken: 'malken' },
};
export const GEN_SIRASI = Object.keys(GENLER);
export const NADIR_ADI = { yaygin: 'Yaygın tür', nadir: 'Nadir alt tür', mutasyon: 'Beklenmedik mutasyon', efsanevi: 'Efsanevi mutasyon' };

const H = (no, ad, koken, nadir, genler, modul, urun, ses, ek = {}) => ({ no, ad, koken, nadir, genler, modul, urun, ses, ...ek });
export const HAYVANLAR = {
  // A. Dünya kökenli
  vanguard_tavugu: H(1, 'Vanguard Tavuğu', 'dunya', 'yaygin', ['kanatli'], 'kumes', { xeno_yumurta: 1 }, 'tavuk', { tarif: 'Günlük yumurta.' }),
  gumus_tavuk: H(2, 'Gümüş Tepeli Tavuk', 'dunya', 'nadir', ['kanatli'], 'kumes', { xeno_yumurta: 1.5 }, 'tavuk', { tarif: 'Çift yumurta şansı.' }),
  kaya_bildircini: H(3, 'Kaya Bıldırcını', 'dunya', 'yaygin', ['kanatli'], 'kumes', { xeno_yumurta: 1 }, 'tavuk', { tarif: 'Küçük yumurta; kuluçkayı yarım gün kısaltır.', rol: 'hizli' }),
  ordek: H(4, 'Sığ Göl Ördeği', 'dunya', 'yaygin', ['kanatli'], 'kumes', { xeno_yumurta: 1, uyku_tuyu: 0.3 }, 'su_kusu', { tarif: 'Göl kenarı yumurtası ve tüy.' }),
  kizil_kaz: H(5, 'Kızıl Kaz', 'dunya', 'nadir', ['kanatli'], 'kumes', { uyku_tuyu: 1 }, 'su_kusu', { tarif: 'Kalın uyku tüyü; kamara yastığı.' }),
  sut_kecisi: H(6, 'Cüce Süt Keçisi', 'dunya', 'yaygin', ['sut'], 'agil', { xeno_sut: 1 }, 'keci', { tarif: 'Günlük xeno-süt.' }),
  dag_koyunu: H(7, 'Dağ Koyunu', 'dunya', 'yaygin', ['yun'], 'agil', { xeno_yun: 1 }, 'keci', { tarif: 'Günlük yumuşak yün.' }),
  altin_koc: H(8, 'Altın Postlu Koç', 'dunya', 'nadir', ['yun'], 'agil', { xeno_yun: 2 }, 'keci', { tarif: 'Çift yün, yüksek değer.' }),
  minik_inek: H(9, 'Minik Süt İneği', 'dunya', 'nadir', ['sut'], 'agil', { xeno_sut: 2 }, 'inek', { tarif: 'İki kat xeno-süt.' }),
  keten_tavsani: H(10, 'Keten Tavşanı', 'dunya', 'yaygin', ['yun'], 'teraryum', { bitkisel_lif: 1 }, 'tavsan', { tarif: 'İnce dokuma tüyü.' }),
  bal_arisi: H(11, 'Dünya Bal Arısı Kolonisi', 'dunya', 'yaygin', ['ari'], 'kovan', { bal: 1 }, 'ari', { tarif: 'Günlük bal.' }),
  yonca_arisi: H(12, 'Vaha Yonca Arısı', 'dunya', 'nadir', ['ari'], 'kovan', { bal: 1 }, 'ari', { tarif: 'Aromatik bal; seradaki ekim yüzde beş hızlı.', rol: 'yonca' }),
  guvercin: H(13, 'Evcil Güvercin', 'dunya', 'yaygin', ['kanatli'], null, {}, 'kus', { tarif: 'Hobi kuşu; ötüşüyle mektup taşır gibi kanat çırpar. Arşiv ve atmosfer.', rol: 'prestij' }),
  hindi: H(14, 'Benekli Hindi', 'dunya', 'nadir', ['kanatli'], 'kumes', { xeno_yumurta: 1 }, 'tavuk', { tarif: 'Festival şölenine destek: festivalde moral üç fazla.', rol: 'sofra' }),
  ren_kecisi: H(15, 'Kuzey Ren-Keçisi', 'dunya', 'nadir', ['sut'], 'agil', { xeno_sut: 1 }, 'keci', { tarif: 'Ayaz mevsiminde verimi düşmez.', ayaz: 1 }),
  // B. Malken kökenli
  kristal_ibikli: H(16, 'Kristal İbikli Kuş', 'malken', 'yaygin', ['yanki'], 'kumes', { kristal_tuy: 1 }, 'kus', { tarif: 'Kristal tüy; akşamları öter, moral verir.', rol: 'aksam' }),
  yanki_bulbulu: H(17, 'Yankı Bülbülü', 'malken', 'nadir', ['yanki'], null, {}, 'kus', { tarif: 'Julian\'ın çan atölyesine esin verir: her beste iki kat sevindirir. Akşam morali.', rol: 'aksam' }),
  termal_kertenkele: H(18, 'Termal Kertenkele', 'malken', 'yaygin', ['termal'], 'teraryum', { isi_yagi: 1 }, 'surungen', { tarif: 'Işık otu yerine geçen doğal ısı yağı.' }),
  fosforlu_geko: H(19, 'Fosforlu Geko', 'malken', 'nadir', ['termal'], 'teraryum', { urun_fosforlu_liken: 1 }, 'surungen', { tarif: 'Gece parlayan liken salgısı.' }),
  ipek_bocegi: H(20, 'Vaha İpek Böceği', 'malken', 'yaygin', ['sis'], 'teraryum', { malken_ipegi: 1 }, 'tavsan', { tarif: 'İnce Malken ipek lifi.' }),
  sis_kecisi: H(21, 'Sis-Yünü Keçisi', 'malken', 'yaygin', ['sis'], 'agil', { xeno_yun: 1 }, 'keci', { tarif: 'Hafif, soğuğa dayanıklı yün; ayazda verimi düşmez.', ayaz: 1 }),
  mantar_porsuk: H(22, 'Mantar Yiyen Porsuk', 'malken', 'nadir', ['sis'], null, {}, 'kazici', { tarif: 'Barınak tabanında eşelenip bazen şifalı mantar bulur.', rol: 'esele', esele: [['sifali_mantar', 0.5]] }),
  rezonans_kaplumbaga: H(23, 'Rezonans Kaplumbağası', 'malken', 'nadir', ['kristal'], 'havuz', { rezonans_kabugu: 0.5 }, 'kaplumbaga', { tarif: 'Kabuğu Ham Rezonans tınısı çıkarır.' }),
  termal_kugu: H(24, 'Termal Kuğu', 'malken', 'nadir', ['termal'], 'havuz', {}, 'su_kusu', { tarif: 'Sıcak göl suyuyla uyumlu; her gün moral bir artar.', rol: 'moral' }),
  yengec_kusu: H(25, 'Göl Yengeç-Kuşu', 'malken', 'yaygin', ['kristal'], null, {}, 'su_kusu', { tarif: 'Kıyı tuzu ve kabuk toplar.', rol: 'esele', esele: [['deniz_tuzu', 1], ['rezonans_kabugu', 0.15]] }),
  yildiz_guvesi: H(26, 'Yıldız Güvesi', 'malken', 'nadir', ['kristal'], null, {}, 'ari', { tarif: 'Geceleri vahada uçuşur: kristal çiçek ve ışık otu yüzde on beş hızlı büyür.', rol: 'guve' }),
  buzul_tilkisi: H(27, 'Buzul Tilkisi', 'malken', 'nadir', ['sis'], null, {}, 'tilki', { tarif: 'Evcil; kışın kürk ve yün döker.', rol: 'esele', esele: [['xeno_yun', 0.5]], ayazEsele: true }),
  miril_kedi: H(28, 'Sakinleştirici Mırıl-Kedi', 'malken', 'yaygin', ['sis'], null, {}, 'kedi', { tarif: 'Kamarada ya da hamamda yaşar; sevince mırlar, günde bir mürettebatın stresi on azalır.', rol: 'kedi' }),
  armadillo: H(29, 'Kaya Armadillosu', 'malken', 'yaygin', ['kristal'], null, {}, 'kazici', { tarif: 'Küçük taş ve kil parçaları eşeler.', rol: 'esele', esele: [['ham_kil', 1], ['ham_kil', 0.5]] }),
  sifa_kecisi: H(30, 'Malken Şifa Keçisi', 'malken', 'nadir', ['termal'], 'agil', { sifali_sut: 1 }, 'keci', { tarif: 'Stres azaltıcı şifalı süt.' }),
  // C. İki gezegen melezi (mutasyon) ve efsanevi
  piezo_tavuk: H(31, 'Piezo-Tavuk', 'melez', 'mutasyon', ['kanatli', 'kristal'], 'kumes', { piezo_yumurta: 1 }, 'tavuk', { tarif: 'Altın sarısı kristal kabuklu yumurta.' }),
  yildiz_yunlu: H(32, 'Yıldız-Yünlü Koyun', 'melez', 'mutasyon', ['yun', 'sis'], 'agil', { isildayan_yun: 1 }, 'keci', { tarif: 'Işıldayan yün.' }),
  aether_arisi: H(33, 'Aether-Arısı', 'melez', 'mutasyon', ['ari', 'kristal'], 'kovan', { aether_bali: 1 }, 'ari', { tarif: 'Şifalı aether balı.' }),
  termal_ordek: H(34, 'Termal-Ördek', 'melez', 'mutasyon', ['kanatli', 'termal'], 'havuz', { xeno_yumurta: 1 }, 'su_kusu', { tarif: 'Sıcak suda bile yumurtlar.' }),
  can_guvercin: H(35, 'Çan-Kanatlı Güvercin', 'melez', 'mutasyon', ['kanatli', 'yanki'], null, {}, 'kus', { tarif: 'Uçarken kristal çan sesi; akşam morali.', rol: 'aksam' }),
  kristal_inek: H(36, 'Kristal-Süt İneği', 'melez', 'mutasyon', ['sut', 'kristal'], 'agil', { xeno_sut: 2 }, 'inek', { tarif: 'Zengin mineralli süt.' }),
  zirhli_keci: H(37, 'Zırhlı Keçi', 'melez', 'mutasyon', ['sut', 'kristal'], null, {}, 'keci', { tarif: 'Dış çitte dolaşır; baskın yaklaşınca meler: savunma süresi uzar.', rol: 'alarm' }),
  ipek_tavsan: H(38, 'İpek-Tavşan', 'melez', 'mutasyon', ['yun', 'sis'], 'teraryum', { malken_ipegi: 1, bitkisel_lif: 1 }, 'tavsan', { tarif: 'Ultra yumuşak dokuma lifi.' }),
  kivilcim_bildircin: H(39, 'Kıvılcım Bıldırcını', 'melez', 'mutasyon', ['kanatli', 'termal'], 'kumes', { xeno_yumurta: 1 }, 'tavuk', { tarif: 'Sıcak yuva yumurtası.' }),
  yanki_kazi: H(40, 'Yankı Kazı', 'melez', 'mutasyon', ['kanatli', 'yanki'], null, {}, 'su_kusu', { tarif: 'Yabancı yaklaşınca alarm verir: baskın uyarı süresi uzar.', rol: 'alarm' }),
  liken_koyunu: H(41, 'Liken-Koyunu', 'melez', 'mutasyon', ['yun', 'termal'], 'agil', { isildayan_yun: 1 }, 'keci', { tarif: 'Karanlıkta parlayan yeşil yün.' }),
  gol_ejderi: H(42, 'Göl-Ejderi', 'melez', 'mutasyon', ['termal', 'yanki'], null, {}, 'surungen', { tarif: 'Minik evcil; su kıyısı neşesi. Arşiv ve atmosfer.', rol: 'prestij' }),
  bal_kaplumbaga: H(43, 'Bal-Kaplumbağası', 'melez', 'mutasyon', ['ari', 'kristal'], 'havuz', { bal: 1 }, 'kaplumbaga', { tarif: 'Kabuğunda doğal bal peteği.' }),
  gumus_sulun: H(44, 'Gümüş-Sülün', 'melez', 'mutasyon', ['kanatli', 'yanki'], 'kumes', { kristal_tuy: 1 }, 'tavuk', { tarif: 'Nadir gümüşi tüy.' }),
  kar_lalesi_keci: H(45, 'Kar-Lalesi Keçisi', 'melez', 'mutasyon', ['sut', 'sis'], 'agil', { xeno_sut: 1 }, 'keci', { tarif: 'Ayaz mevsiminde iki kat süt.', ayaz: 2 }),
  safak_horozu: H(46, 'Şafak Horozu', 'melez', 'mutasyon', ['kanatli', 'yanki'], null, {}, 'tavuk', { tarif: 'Her Zhaor nöbetinin başında öter; günü, mevsimi ve havayı müjdeler.', rol: 'horoz' }),
  tavus: H(47, 'Mistik Tavus Kuşu (Altı Yıldız)', 'melez', 'efsanevi', [], null, {}, 'efsane', { tarif: 'Festival morali beş fazla.', rol: 'festival' }),
  cekirdek_porsuk: H(48, 'Çekirdek Porsuğu', 'melez', 'efsanevi', [], null, {}, 'kazici', { tarif: 'Arada piezo ya da gümüş kırıntısı bulur.', rol: 'esele', esele: [['piezo', 0.4], ['gumus_tozu', 0.4]] }),
  kopek: H(49, 'Kaptan\'ın Sesli Xeno-Köpeği', 'melez', 'efsanevi', [], null, {}, 'kopek', { tarif: 'Sadık dost. Yoldaş olarak yanına alınca korulukta ve madenin ilk on katında pusuyu bir tur önce havlayarak bildirir.', rol: 'yoldas' }),
  anka: H(50, 'Aethelis Anka-Kuşu', 'melez', 'efsanevi', ['termal', 'kristal'], null, {}, 'efsane', { tarif: 'Kuluçkanın zirvesi: barınakta hastalık olmaz, koloniye kalıcı moral.', rol: 'anka' }),
};
export const HAYVAN_SIRASI = Object.keys(HAYVANLAR).sort((a, b) => HAYVANLAR[a].no - HAYVANLAR[b].no);

// Barınak bakım modülleri (Paket 15 bölüm 2): kurulum malzemeleri belgedeki örneklere göre, adetler seçildi
export const MODULLER = {
  kovan: { ad: 'Arı kovanı', bedel: { kiyi_kerestesi: 6, recine: 3, bitkisel_lif: 3 } },
  kumes: { ad: 'Kümes ve tünek', bedel: { kereste: 6, bitkisel_lif: 4, tugla: 6 } },
  agil: { ad: 'Ağıl ve sağım bölmesi', bedel: { kereste: 8, demir_cevheri: 4, seramik_canak: 2 } },
  teraryum: { ad: 'İpek ve teraryum bölmesi', bedel: { cam: 4, kereste: 4, urun_isik_otu: 2 } },
  havuz: { ad: 'Su ve kabuk havuzu', bedel: { tugla: 8, kirec_tasi: 6, saf_su: 4 } },
};
// Barınak: 6 → 12 → 20 hayvan (Paket 14 bölüm 4). Kurulum ve yükseltme bedelleri seçildi.
export const BARINAK = [
  { kapasite: 6, bedel: { kereste: 10, tugla: 10, bitkisel_lif: 6 } },
  { kapasite: 12, bedel: { kereste: 15, tugla: 15, demir_cevheri: 6 } },
  { kapasite: 20, bedel: { kereste: 20, tugla: 20, cam: 6 } },
];
export const KULUCKA_SUVU = ['saf_su', 'aether'];
// Bakım: aç olana yem, hastaya ilaç (Paket 3B hobi 5)
export const YEMLER = ['urun_arpa', 'urun_akifer', 'bitkisel_lif', 'urun_tatli_kok', 'urun_soya'];
export const ILACLAR = ['sifali_mantar', 'antikor_iksiri', 'sifali_sut'];
// Ansiklopedi dönüm noktaları (Paket 14 bölüm 4; ödüller seçildi)
export const DONUM = [
  { n: 15, ad: 'On beş tür', odul: { gk: 300 }, metin: 'Lyris ansiklopedinin ilk cildini kapattı: üç yüz kredi bilim bursu.' },
  { n: 30, ad: 'Otuz tür', odul: { gk: 800, barinak: true }, metin: 'Nerissa barınağı genişletti: bir sonraki barınak kademesi bedelsiz.' },
  { n: 50, ad: 'Elli tür', odul: { gk: 2000, moral: 20 }, metin: 'Elli türün hepsi! Koloni Arşivi\'nin hayvan ansiklopedisi tamamlandı; koloninin morali yirmi arttı.' },
];
