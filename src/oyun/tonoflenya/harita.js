// Tonoflenya'nın yüzey haritası (belgeler/tonoflenya-ve-malken-medeniyeti.md). Saf veri; yuzey/harita.js birleştirir.
// Bütün mekânlar tonoflenya: true (Yerler'de bütün geçit uçları ve noktalar bilinir; Malkenia tabelalı bir şehir).
// Koordinatlar Aethelis-IV'ünkilerle çakışmasın diye x 6000'den başlar.
//
//   YGK Akademi (bölüm 5): on bir kat (ygk_6 … ygk_1 yüzey, ygk_m1 … ygk_m5 yeraltı); katlar arası asansörle.
//     Gemi kat 5'teki fırlatma hangarına iner ve oradan kalkar (bölüm 8: kahraman buradan fırlatılmıştı).
//   Malkenia (bölüm 3): dıştan içe altı halka (Zhaor, Varek, Axira, Sinha, Uma, Elyndra) ve merkezde Tenohris Sarayı;
//     batı surundan Kara Göl, doğu yolundan çöl kantonları. Akademi Zhaor halkasının kuzeybatı kapısında.
//   Güney havzası (bölüm 4): güney karavan hattıyla Flee Plee sahili; doğu ucunda faz kapısıyla Aether-Dock; rezonans
//     kayığıyla Fenrir Işık ve Toz Denizi, Uçan Arin Adası ve Veradon limanı.
//   Malazar Dağı (bölüm 6): Akademinin kuzey sahil kapısından; tepesinde mor şimşekler (statik), altında ocaklar.

const ic = (ad, tarif, bati, ortam, ek = {}) => ({ ad, tarif, alan: { bati, dogu: bati + 20, guney: 0, kuzey: 20 }, ortam, zemin: 'tas', dis: false, tonoflenya: true, ...ek });
const dis = (ad, tarif, bati, ortam, ek = {}) => ({ ad, tarif, alan: { bati, dogu: bati + 60, guney: 0, kuzey: 60 }, ortam, zemin: 'tas', dis: true, tonoflenya: true, ...ek });

// YGK katları: sıra yukarıdan aşağı (asansör listesi bu sırayla)
export const YGK_KATLARI = ['ygk_6', 'ygk_5', 'ygk_4', 'ygk_3', 'ygk_2', 'ygk_1', 'ygk_m1', 'ygk_m2', 'ygk_m3', 'ygk_m4', 'ygk_m5'];
const katX = (id) => 8200 + YGK_KATLARI.indexOf(id) * 40;

export const T_MEKANLAR = {
  ygk_6: ic('YGK Kat 6: Gözlemevi ve Zirve İğnesi', 'Akademinin tepesindeki kristal kule. Altı yıldızın ışığını odaklayıp derin uzaya şifreli sinyaller gönderen iğne başının üstünde vınlıyor; camlara gümüşi rüzgâr vuruyor.', katX('ygk_6'), 'ortam_t_igne'),
  ygk_5: ic('YGK Kat 5: Fırlatma hangarları', 'Keşif gemilerinin bakım gördüğü devasa hava kapakları ve gravitasyonel hızlandırıcı raylar. Seni yıllar önce derin uzaya fırlatan katapult burada.', katX('ygk_5'), 'ortam_t_hangar'),
  ygk_4: ic('YGK Kat 4: Taktik simülasyon salonları', 'Akustik körleme odaları ve it dalaşı simülatörleri. Duvarlar sesi yutuyor; yalnız kulaklıklarda savaş var.', katX('ygk_4'), 'ortam_t_ygk'),
  ygk_3: ic('YGK Kat 3: Magitech laboratuvarları', 'Büyü mühürlerinin gemi gövdelerine kazındığı, plazma motorlarının rezonans testlerinin yapıldığı atölyeler. Havada ozon ve sıcak kristal kokusu.', katX('ygk_3'), 'ortam_t_ygk'),
  ygk_2: ic('YGK Kat 2: Astrogasyon fakültesi', 'Yirmi yıldız sektörünün holografik ve akustik haritalarının çıkarıldığı, rotaların çizildiği salonlar; kseno-dilbilim derslerinin fısıltıları.', katX('ygk_2'), 'ortam_t_ygk'),
  ygk_1: ic('YGK Kat 1: Kabul meydanı', 'Beyaz sütunlu devasa kabul meydanı, diplomatik salonlar ve öğrenci kapıları. Seksen bin kişilik akademinin kalbi burada atıyor.', katX('ygk_1'), 'ortam_t_ygk'),
  ygk_m1: ic('YGK Kat -1: Yeraltı arşivleri', 'Milyonlarca yıllık galaktik kayıtların parşömen, kristal disk ve sesli küreler hâlinde saklandığı labirent. Ses kendiliğinden kısılıyor.', katX('ygk_m1'), 'ortam_t_ygk_alt'),
  ygk_m2: ic('YGK Kat -2: Rezonans kriptoları', 'Malken öğrencilerin aether frekanslarını duymayı öğrendiği sessiz yalıtım odaları. Duvarlar kendi kalbinin sesini geri veriyor.', katX('ygk_m2'), 'ortam_t_ygk_alt'),
  ygk_m3: ic('YGK Kat -3: Kriyojenik biyo-depo', 'Uzaydan toplanıp henüz incelenmemiş kseno-örneklerin dondurulduğu karantina hücreleri. Buz gibi, bip sesleriyle dolu.', katX('ygk_m3'), 'ortam_revir'),
  ygk_m4: ic('YGK Kat -4: Enerji çekirdeği', 'Akademinin bütün elektriğini ve kalkanını taşıyan, lav ve soğuk füzyonla beslenen reaktör; manyetik soğutma havuzları köpürüyor.', katX('ygk_m4'), 'ortam_reaktor'),
  ygk_m5: ic('YGK Kat -5: Yasaklı tonozlar', 'Uzay-zaman kırılmalarının incelendiği, tehlikeli kadim kalıntıların mühürlendiği en derin nokta. Boyut yarığı test kuyusundan soğuk bir çekim geliyor.', katX('ygk_m5'), 'ortam_t_ygk_alt', { ortamOran: 0.6 }),
  // Malkenia'nın altı halkası, dıştan içe
  halka_zhaor: dis('Malkenia, 6. halka: Zhaor', 'Gümüş dış savunma ve kalkan kuleleri. Şehri saran enerji bariyeri derin bir uğultuyla titreşiyor; devriyelerin adımları taş surlarda yankılanıyor.', 7000, 'ortam_t_zhaor'),
  halka_varek: dis('Malkenia, 5. halka: Varek', 'Kızıl dökümhaneler ve ağır sanayi ağı. Fırınların kükremesi, uzaktan çekiç ritmi, plazma meşalelerinin cızırtısı.', 7100, 'ortam_t_varek'),
  halka_axira: dis('Malkenia, 4. halka: Axira', 'Zümrüt asma bahçeler ve hidroponik teraslar. Sulama kanallarının şırıltısı, yabancı kuşların ötüşü, yaprak hışırtısı.', 7200, 'ortam_t_axira'),
  halka_sinha: dis('Malkenia, 3. halka: Sinha', 'Mavi kuantum iletişim ve ticaret halkası. Kalabalık uğultusu, dijital çanlar, üstünden süzülen hava araçları.', 7300, 'ortam_t_sinha'),
  halka_uma: dis('Malkenia, 2. halka: Uma', 'Altın meydanlar ve sosyal yaşam. Fıskiyeler, gevşek sohbetler, taş zeminde adımlar.', 7400, 'ortam_t_uma'),
  halka_elyndra: dis('Malkenia, 1. halka: Elyndra', 'Mor kadim loncalar ve Yüksek Konsey. Uzaktan koro mırıltısı, tütsü mangallarının çıtırtısı, derin taş salonların yankısı.', 7500, 'ortam_t_elyndra'),
  tenohris: ic('Tenohris Sarayı', 'Şehrin geometrik merkezinde bin beş yüz metre yükselen saray: köşesi, sütunu yok; sanki yukarı doğru donmuş tek bir sıvı kristal damlası. Malken Yüksek Meclisi ve Gezegenler Arası Egemenlik Makamı burada.', 7600, 'ortam_t_tenohris'),
  kara_gol: dis('Kara Göl ve Büyük Krater', 'Batı surlarının hemen ardında kilometrelerce genişlikte bir krater; dibi görünmeyen, zift gibi koyu mor-siyah sular. Birinci Çağ\'ın başkenti bir aether patlamasıyla burada yok olmuştu. Sudan fısıltılar yükseliyor.', 7700, 'ortam_t_karagol'),
  dogu_kanton: dis('Doğu çöl kantonları', 'Altın kumulların başladığı kurak platolarda soylu ve tüccar klanlarının malikâneleri: yerçekimi sönümleyicili özel vahalar, aether hamamları, yüksek kuleler.', 7900, 'ortam_t_kanton'),
  // Güney havzası
  flee_plee: dis('Flee Plee sahil şeridi', 'Malkenia ile Fenrir Denizi arasında kıvrılan beyaz kumlu sahil: kavisli organik villalar, balıkçı köyleri, aether fenerleri. Kumun üstünde ışıldayan bir toz sürükleniyor.', 6200, 'ortam_t_sahil'),
  aether_dock: dis('Tentran platform kenti (Aether-Dock)', 'Kıyıdan fersahlarca uzakta, Fenrir\'in derin sularının üstünde yükselen metal ve kristal platform. Karadan köprü yok; Tonoflenya\'nın yıldız gemileri burada monte edilip fırlatılıyor.', 6000, 'ortam_t_dock'),
  fenrir: dis('Fenrir Işık ve Toz Denizi', 'Sıvılaşmış aether kristalleri, foton tozu ve minerallerle kaplı bir deniz. Kayığın manyetik kalkanı ışıldayan tozun üstünde süzülüyor; metal bir gemi burada batardı.', 6400, 'ortam_t_fenrir'),
  arin: ic('Uçan Arin Adası', 'Denizin onlarca metre üstünde havada asılı bir kaya ve orman kütlesi; ters-yerçekimi kristalleriyle dolu. Malken keşişlerinin inzivaya çekildiği antik tapınaklar burada.', 6600, 'ortam_t_arin', { dis: true }),
  veradon: dis('Veradon liman kasabası', 'Malken topraklarının bittiği son resmî sınır: taş rıhtımlar, gümrük kuleleri, hanlar. Ötesinde güney kıtasının bağımsız ve tekinsiz krallıkları.', 6800, 'ortam_t_veradon'),
  // Malazar Dağı
  malazar: dis('Malazar Dağı', 'Okyanusun sert dalgaları arasında yükselen sarp, sisli zirve. Havaya karışan kristal tozları yüzünden tepesinde durmadan mor şimşekler çakıyor.', 9000, 'ortam_t_malazar', { statik: true }),
  malazar_ocaklari: ic('Malazar\'ın aether ocakları', 'Dağın altına yüzlerce kilometre oyulmuş tüneller. Duvarlarda mor titreşen aether kristalleri, havada büyü tozu; uzakta kazmaların yankısı.', 9200, 'ortam_t_ocak'),
};

const kapi = (ad, a, b, ek = {}) => ({ ad, uclar: [a, b], ...ek });
const u = (mekan, x, y, yon, ad) => ({ mekan, x, y, yon, ad });
const b = (d) => d.bayrak;

export const T_KAPILAR = {
  ygk_kuzeybati: kapi('Yıldız Yolu ve Kuzeyboğaz Köprüsü', u('ygk_1', katX('ygk_1') + 10, 1.5, Math.PI, 'Malkenia\'ya inen yol'), u('halka_zhaor', 7008, 58.5, 0, 'Kuzeybatı kapısı: YGK Akademi')),
  zhaor_varek: kapi('Varek halkasının kapısı', u('halka_zhaor', 7030, 30, 0, 'İç kapı: Varek halkası'), u('halka_varek', 7130, 1.5, Math.PI, 'Dış kapı: Zhaor halkası')),
  varek_axira: kapi('Axira halkasının kapısı', u('halka_varek', 7130, 58.5, 0, 'İç kapı: Axira halkası'), u('halka_axira', 7230, 1.5, Math.PI, 'Dış kapı: Varek halkası')),
  axira_sinha: kapi('Sinha halkasının kapısı', u('halka_axira', 7230, 58.5, 0, 'İç kapı: Sinha halkası'), u('halka_sinha', 7330, 1.5, Math.PI, 'Dış kapı: Axira halkası')),
  sinha_uma: kapi('Uma halkasının kapısı', u('halka_sinha', 7330, 58.5, 0, 'İç kapı: Uma halkası'), u('halka_uma', 7430, 1.5, Math.PI, 'Dış kapı: Sinha halkası')),
  uma_elyndra: kapi('Elyndra halkasının kapısı', u('halka_uma', 7430, 58.5, 0, 'İç kapı: Elyndra halkası'), u('halka_elyndra', 7530, 1.5, Math.PI, 'Dış kapı: Uma halkası')),
  elyndra_saray: kapi('Axira Çemberi\'nin kapısı', u('halka_elyndra', 7530, 58.5, 0, 'Axira Çemberi ve saray'), u('axira_cemberi', 10030, 1.5, Math.PI, 'Elyndra halkasına dönüş')),
  bati_sur: kapi('Batı suru', u('halka_zhaor', 7001.5, 30, -Math.PI / 2, 'Batı suru: Kara Göl'), u('kara_gol', 7730, 1.5, Math.PI, 'Batı suruna dönen yol'), {
    kosul: (d) => !!b(d).karaGolIzni,
    kilitMetni: 'Surun kapısında iki muhafız: "Kara Göl yasaklı bölge, Kaptan. Yalnız koruma büyüsüyle donatılmış araştırmacılar geçer. Akademinin arşivinden izin al."',
    gecisMetni: ['Muhafızlar koruma mührüne bakıp kenara çekiliyor. Surun ötesinde krater açılıyor; hava birden soğuyor, sudan fısıltılar yükseliyor.', 'Krateri arkanda bırakıp surun içine dönüyorsun.'],
  }),
  dogu_yolu: kapi('Zorah Kapıları Yolu', u('halka_zhaor', 7058.5, 30, Math.PI / 2, 'Doğu yolu: çöl kantonları'), u('dogu_kanton', 7930, 1.5, Math.PI, 'Malkenia\'ya dönen yol')),
  karavan_hatti: kapi('Güneygeçit Köprüsü ve Fenrir Caddesi', u('halka_zhaor', 7030, 1.5, Math.PI, 'Güney karavan hattı: Flee Plee'), u('flee_plee', 6230, 58.5, 0, 'Karavan hattı: Malkenia'), {
    gecisMetni: ['Manyetik karavanın kapısı kapanıyor; şehir arkanda kalıyor, rüzgâr tuzlanıyor. Flee Plee sahilindesin.', 'Karavan seni Malkenia\'nın Zhaor halkasına bırakıyor.'],
  }),
  faz_kapisi: kapi('Kuantum faz kapısı', u('flee_plee', 6258.5, 30, Math.PI / 2, 'Doğu ucu: kuantum faz kapısı'), u('aether_dock', 6030, 1.5, Math.PI, 'Faz kapısı: Flee Plee'), {
    gecisMetni: ['Pilonların arasına adım atıyorsun; kulaklarında bir an her şey ters akıyor, sonra tuzlu rüzgâr ve metal: Aether-Dock\'tasın.', 'Faz kapısından sahile sıçrıyorsun.'],
  }),
  fenrir_iskelesi: kapi('Kayık iskelesi', u('flee_plee', 6201.5, 30, -Math.PI / 2, 'Kayık iskelesi: Fenrir Denizi'), u('fenrir', 6430, 58.5, 0, 'Flee Plee iskelesi'), {
    kosul: (d) => !!b(d).aetherKayigi,
    kilitMetni: 'İskelede bekleyen kayıkların hepsi kilitli. Fenrir\'de yalnız manyetik rezonans kalkanlı kayıklar yüzebilir; iskele görevlisinden kirala.',
    gecisMetni: ['Rezonans kayığına biniyorsun; kalkan açılınca tekne ışıldayan tozun üstünde hafifçe yükseliyor. Fenrir Denizi\'ndesin.', 'Kayığı iskeleye bağlıyorsun.'],
  }),
  arin_rotasi: kapi('Arin\'e yükselen rota', u('fenrir', 6430, 30, 0, 'Uçan Arin Adası\'na yükselen rota'), u('arin', 6610, 1.5, Math.PI, 'Kayığın bağlı olduğu kaya'), {
    gecisMetni: ['Kayığın kaldırma kristallerini sonuna kadar açıyorsun; deniz altında küçülüyor, rüzgâr güçleniyor. Arin\'in kayalarına bağlanıyorsun.', 'Kayıkla Fenrir\'e süzülüyorsun.'],
  }),
  veradon_rotasi: kapi('Güney rotası', u('fenrir', 6430, 1.5, Math.PI, 'Güneye: Veradon limanı'), u('veradon', 6830, 58.5, 0, 'Rıhtım: Fenrir Denizi'), {
    gecisMetni: ['Kayık güneye süzülüyor; toz denizi bitip taş rıhtımlar beliriyor. Veradon\'dasın.', 'Kayıkla Fenrir Denizi\'ne açılıyorsun.'],
  }),
  malazar_yolu: kapi('Kuzey sahil kapısı', u('ygk_1', katX('ygk_1') + 18.5, 10, Math.PI / 2, 'Kuzey sahil kapısı: Malazar Dağı'), u('malazar', 9030, 1.5, Math.PI, 'Akademiye dönen sahil yolu'), {
    kosul: (d) => !!b(d).malazarIzni,
    kilitMetni: 'Kapıda Başkent Muhafızları: "Malazar en üst düzey askeri protokolle korunuyor, Kaptan. Zirve İğnesi\'nde altı yıldızı hizalayan kişiye yol açılır."',
    gecisMetni: ['Sahil yolu sisin içinde dağa tırmanıyor. Havada kristal tozu; tepede mor şimşekler. Şimşeğin yüklendiğini duyunca uzaklaş.', 'Dağdan akademiye iniyorsun.'],
  }),
  ocak_agzi: kapi('Ocak ağzı', u('malazar', 9030, 58.5, 0, 'Aether ocaklarının ağzı'), u('malazar_ocaklari', 9210, 1.5, Math.PI, 'Dağa çıkış')),
};

// Noktalar: malken (konuşulan Malken'ler), tonEylem (eylemler tonoflenya/malken.js'te), kaynak (yataklar)
export const T_NOKTALAR = {
  // YGK
  asansor_ygk_6: { mekan: 'ygk_6', x: katX('ygk_6') + 2, y: 10, ad: 'Asansör', yaricap: 1.8, tonEylem: 'asansor' },
  asansor_ygk_5: { mekan: 'ygk_5', x: katX('ygk_5') + 2, y: 10, ad: 'Asansör', yaricap: 1.8, tonEylem: 'asansor' },
  asansor_ygk_4: { mekan: 'ygk_4', x: katX('ygk_4') + 2, y: 10, ad: 'Asansör', yaricap: 1.8, tonEylem: 'asansor' },
  asansor_ygk_3: { mekan: 'ygk_3', x: katX('ygk_3') + 2, y: 10, ad: 'Asansör', yaricap: 1.8, tonEylem: 'asansor' },
  asansor_ygk_2: { mekan: 'ygk_2', x: katX('ygk_2') + 2, y: 10, ad: 'Asansör', yaricap: 1.8, tonEylem: 'asansor' },
  asansor_ygk_1: { mekan: 'ygk_1', x: katX('ygk_1') + 2, y: 10, ad: 'Asansör', yaricap: 1.8, tonEylem: 'asansor' },
  asansor_ygk_m1: { mekan: 'ygk_m1', x: katX('ygk_m1') + 2, y: 10, ad: 'Asansör', yaricap: 1.8, tonEylem: 'asansor' },
  asansor_ygk_m2: { mekan: 'ygk_m2', x: katX('ygk_m2') + 2, y: 10, ad: 'Asansör', yaricap: 1.8, tonEylem: 'asansor' },
  asansor_ygk_m3: { mekan: 'ygk_m3', x: katX('ygk_m3') + 2, y: 10, ad: 'Asansör', yaricap: 1.8, tonEylem: 'asansor' },
  asansor_ygk_m4: { mekan: 'ygk_m4', x: katX('ygk_m4') + 2, y: 10, ad: 'Asansör', yaricap: 1.8, tonEylem: 'asansor' },
  asansor_ygk_m5: { mekan: 'ygk_m5', x: katX('ygk_m5') + 2, y: 10, ad: 'Asansör', yaricap: 1.8, tonEylem: 'asansor' },
  zirve_ignesi: { mekan: 'ygk_6', x: katX('ygk_6') + 10, y: 12, ad: 'Zirve İğnesi', yaricap: 2.2, engel: 1, tonEylem: 'igne', tarif: 'Altı yıldızın ışığını tek bir kristal iğnede toplayan dev kule. Odaklama halkası parmaklarının altında ılık.' },
  ygk_iskelesi: { mekan: 'ygk_5', x: katX('ygk_5') + 12, y: 12, ad: 'Geminin yerçekimi iskelesi', yaricap: 3, engel: 1.5, tonEylem: 'iskele', tarif: 'Gemin akademinin yerçekimi iskelesine kilitli. Bakım kolları gövdende dolaşıyor.' },
  simulator: { mekan: 'ygk_4', x: katX('ygk_4') + 12, y: 10, ad: 'Akustik körleme simülatörü', yaricap: 2, tonEylem: 'simulator', tarif: 'Kulaklıklı bir koltuk; oturunca dünya susuyor, yalnız simülasyonun sesleri kalıyor.' },
  magitech_tezgahi: { mekan: 'ygk_3', x: katX('ygk_3') + 12, y: 10, ad: 'Magitech tezgâhı', yaricap: 2, tonEylem: 'magitech', tarif: 'Gövde levhalarına kazınmış büyü mühürleri; bir çırak plazma bobininin rezonansını dinliyor.' },
  astro_harita: { mekan: 'ygk_2', x: katX('ygk_2') + 12, y: 10, ad: 'Akustik yıldız haritası', yaricap: 2, tonEylem: 'harita', tarif: 'Yirmi sektörün her biri ayrı bir ses kümesi; elini uzattığın yerde o sektörün fenerleri çalıyor.' },
  kabul_masasi: { mekan: 'ygk_1', x: katX('ygk_1') + 10, y: 12, ad: 'Kabul masası', yaricap: 2, malken: 'kabul', tarif: 'Uzun, beyaz bir masa; arkasında mor gözleri karanlıkta parlayan bir Malken görevli.' },
  arsiv_kuresi: { mekan: 'ygk_m1', x: katX('ygk_m1') + 12, y: 10, ad: 'Sesli arşiv küreleri', yaricap: 2, tonEylem: 'arsiv', tarif: 'Avuç büyüklüğünde, ılık küreler; dokununca içlerindeki kayıt fısıldamaya başlıyor.' },
  rezonans_hucresi: { mekan: 'ygk_m2', x: katX('ygk_m2') + 12, y: 10, ad: 'Rezonans hücresi', yaricap: 2, tonEylem: 'kripto', tarif: 'Taş bir oda; ortasında oturunca aether akımlarının uğultusu duyuluyor.' },
  tohum_kasasi_ygk: { mekan: 'ygk_m3', x: katX('ygk_m3') + 12, y: 10, ad: 'Kriyojenik tohum depoları', yaricap: 2, tonEylem: 'biyodepo', tarif: 'Buzlu çekmeceler; her birinde başka bir dünyanın tohumu.' },
  kurulus_kitabesi: { mekan: 'ygk_1', x: katX('ygk_1') + 16, y: 16, ad: 'Kuruluş kitabesi', yaricap: 2, engel: 0.8, tonEylem: 'kitabe', tarif: 'Meydanın kuzey duvarına oyulmuş uzun bir yazıt; harfleri parmaklarının altında ılık. Bagrius hanedanının adları sırayla.' },
  enerji_cekirdegi: { mekan: 'ygk_m4', x: katX('ygk_m4') + 12, y: 10, ad: 'Reaktör çekirdeği', yaricap: 3, engel: 2, tarif: 'Lavla ve soğuk füzyonla beslenen reaktör; manyetik soğutma havuzları köpürüyor. Akademinin bütün kalkanı buradan.' },
  yarik_kuyusu: { mekan: 'ygk_m5', x: katX('ygk_m5') + 12, y: 10, ad: 'Boyut yarığı test kuyusu', yaricap: 3, engel: 2, tarif: 'Mühürlü bir kuyu; kenarından aşağıya ses gitmiyor, yukarıya ise soğuk bir çekim geliyor. Başmüfettişlerin mühürleri dokunulmamış.' },
  // Malkenia
  sinir_kapilari: { mekan: 'halka_zhaor', x: 7045, y: 50, ad: 'Sınır yolları levhası', yaricap: 2, tonEylem: 'sinir', tarif: 'Dört yola ayrılan bir levha: kuzeyde donmuş krallıklar, doğuda çöl krallıkları ve kuzeydoğu ucunda Kahergonat, batıda ve güneyde okyanus ötesi diyarlar.' },
  kalkan_kulesi: { mekan: 'halka_zhaor', x: 7015, y: 15, ad: 'Gümüş kalkan kulesi', yaricap: 2.5, engel: 1.2, tarif: 'Şehrin enerji bariyerini besleyen kule; dokununca derin bir titreşim kemiklerine iniyor.' },
  varek_dokumhanesi: { mekan: 'halka_varek', x: 7120, y: 30, ad: 'Kızıl dökümhane', yaricap: 3, engel: 1.5, tonEylem: 'dokumhane', tarif: 'Plazma meşaleleri ve büyü mühürleriyle odaklanan dev potalar.' },
  asma_bahce: { mekan: 'halka_axira', x: 7215, y: 30, ad: 'Asma bahçeler', yaricap: 3, tonEylem: 'bahce', tarif: 'Teras teras sarkan bahçeler; Axira\'nın ışığında yapraklar ılık.' },
  kuantum_pilonu: { mekan: 'halka_sinha', x: 7345, y: 30, ad: 'Kuantum iletişim pilonu', yaricap: 2.5, engel: 1, tonEylem: 'pilon', tarif: 'Sinha\'nın ışığından beslenen iletişim kulesi; tüccarların mesajları içinden geçiyor.' },
  altin_meydan: { mekan: 'halka_uma', x: 7430, y: 30, ad: 'Altın meydanın fıskiyesi', yaricap: 3, engel: 1.5, tonEylem: 'meydan', tarif: 'Altın taşlı, geniş bir havuz; çevresinde halk oturmuş, konuşuyor.' },
  konsey_sozcusu: { mekan: 'halka_elyndra', x: 7515, y: 30, ad: 'Lonca ihtiyarı', yaricap: 2, malken: 'lonca', tarif: 'Mor cüppeli, yaşı belirsiz bir Malken; gözleri loş salonda iki ametist gibi.' },
  aether_cekirdegi: { mekan: 'tenohris', x: 7610, y: 12, ad: 'Aether Çekirdeği', yaricap: 2.5, engel: 1.2, tonEylem: 'cekirdek', tarif: 'Sarayın altındaki kalp: başkentin bütün halkalarına aether akıtan, insan boyunda titreşen bir kristal.' },
  meclis_kursusu: { mekan: 'tenohris', x: 7605, y: 6, ad: 'Yüksek Meclis\'in kürsüsü', yaricap: 2, malken: 'meclis', tarif: 'Sıvı kristal bir kürsü; arkasında Meclis\'in sözcüsü.' },
  batik_kule: { mekan: 'kara_gol', x: 7740, y: 40, ad: 'Batık kulenin tepesi', yaricap: 3, engel: 1.5, tonEylem: 'batik', tarif: 'Kara suyun yüzeyinden çıkan kırık bir kule ucu. Birinci Çağ başkentinden geriye kalan.' },
  aether_hamami: { mekan: 'dogu_kanton', x: 7930, y: 30, ad: 'Aether hamamı', yaricap: 2.5, tonEylem: 'hamam', tarif: 'Yerçekimi sönümleyicili bir vahanın ortasında sıcak, ışıldayan bir havuz.' },
  // Güney havzası
  kayik_gorevlisi: { mekan: 'flee_plee', x: 6208, y: 26, ad: 'İskele görevlisi', yaricap: 2, malken: 'iskele', tarif: 'Tuzlu rüzgârda pelerini dalgalanan bir Malken; elinde kayıkların kristal anahtarları.' },
  aether_feneri: { mekan: 'flee_plee', x: 6240, y: 10, ad: 'Aether feneri', yaricap: 2, engel: 1, tarif: 'Kumsalın ucunda mor ışıklı bir fener; ritmik bir uğultu çıkarıyor.' },
  montaj_kizagi: { mekan: 'aether_dock', x: 6030, y: 40, ad: 'Yıldız kadırgası montaj kızağı', yaricap: 4, engel: 2, tonEylem: 'dock', tarif: 'Fenrir\'in manyetik kaldırma gücünün en yüksek olduğu noktada dev bir kızak; yarım bir kadırganın iskeleti üstünde.' },
  isik_tozu: { mekan: 'fenrir', x: 6450, y: 30, ad: 'Işık tozu dalgası', yaricap: 3, tonEylem: 'toz', tarif: 'Kayığın yanından geçen ışıldayan toz dalgası.' },
  arin_tapinagi: { mekan: 'arin', x: 6610, y: 14, ad: 'Antik tapınak', yaricap: 3, engel: 1.5, malken: 'kesis', tarif: 'Kayaya oyulmuş, rüzgârın içinden çan sesleri gelen bir tapınak; kapısında yaşlı bir keşiş.' },
  gumruk_kulesi: { mekan: 'veradon', x: 6830, y: 30, ad: 'Gümrük kulesi ve han', yaricap: 2.5, malken: 'gumruk', tarif: 'Taş bir kule; altında kalabalık bir han. Güneyden gelen kervanların kokusu.' },
  // Malazar
  simsek_kayasi: { mekan: 'malazar', x: 9040, y: 40, ad: 'Şimşek kayası', yaricap: 2.5, engel: 1.2, sutun: true, tarif: 'Zirvenin altında, üstüne durmadan mor şimşek düşen kararmış bir kaya.' },
  bagrius_aniti: { mekan: 'malazar_ocaklari', x: 9205, y: 4, ad: 'I. Bagrius anıtı', yaricap: 2, engel: 0.8, tonEylem: 'kitabe', tarif: 'İlk kazının yapıldığı yerde, kristal damarının dibinde yüksük büyüklüğünde bir taş anıt. Üstünde bir kral adı ve bir tarih.' },
  aether_1: { mekan: 'malazar_ocaklari', x: 9205, y: 12, ad: 'Aether kristali damarı', yaricap: 2, kaynak: 'aether', stok: 4, ses: 'kristal', tarif: 'Duvarda mor titreşen bir kristal damarı.' },
  aether_2: { mekan: 'malazar_ocaklari', x: 9215, y: 16, ad: 'Aether kristali damarı', yaricap: 2, kaynak: 'aether', stok: 4, ses: 'kristal' },
  buyu_tozu_1: { mekan: 'malazar_ocaklari', x: 9212, y: 6, ad: 'Büyü tozu birikintisi', yaricap: 2, kaynak: 'buyu_tozu', stok: 3, tarif: 'Havada asılı duran, parmaklara ılık değen ince bir toz.' },
};
