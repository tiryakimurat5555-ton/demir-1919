// YGK Akademi bağ ağının yeni kişi noktaları (belgeler/v6 karakter-01 … karakter-23). Var olan akademi figürleri kendi
// noktalarında kalır (k_tixie, k_kefius, ak_forges …); burada yalnız ilk kez yerleşen kişiler, koşullu ikinci yerler
// (serbest Zephyra, serbest Morwenna, hücredeki Valen) ve Kat 4 arşivi. Bağımlılıksız (yuzey/harita.js birleştirir).
import { YGK_KATLARI } from '../tonoflenya/harita';

const katX = (id) => 8200 + YGK_KATLARI.indexOf(id) * 40;
const N = (ygk, kat, x, y, ad, tarif, gorunur) => ({ mekan: kat, x: katX(kat) + x, y, ad, yaricap: 2, ygk, tarif, ...(gorunur ? { gorunur } : {}) });
const hk = (d) => (d.hikaye && d.hikaye.biten ? d.hikaye.biten : {});

export const YG_NOKTALAR = {
  yg_lasiraxi: N('lasiraxi', 'ygk_2', 4, 10, 'Lasiraxi Jolt, Tu ağının sinyal tanrıçası', 'Omurgasından ağa uzanan ışıldayan kablolar; gözlerinde kayan veri rünleri. Etrafında sessiz Dijital Çıraklar.'),
  yg_veyra: N('veyra', 'ygk_2', 12, 10, 'Veyra-K, burslu akustik öğrencisi', 'Ön sırada, defterine kapanmış; mırıldandığı nota tekrarları ve hızlı kalem cızırtısı.'),
  yg_zynae: N('zynae', 'ygk_3', 14, 10, 'Zynae, Pembe Prizma', 'Avucunda dönen bir prizmanın cam gibi tiz çınlaması; inci beyazı ipek hışırtısı.'),
  yg_dren: N('dren', 'ygk_3', 12, 6, 'Dren, örs çırağı', 'Yan tezgâhta düzensiz çekiç vuruşları, körük üflemesi ve arada bir "Tüh, yine olmadı!"'),
  yg_palmi: N('palmi', 'ygk_4', 14, 8, 'Palmi, Sarayın Gözü', 'Ayak sesi hiç duyulmuyor; yalnız havada süzülen ağır ipek hışırtısı ve kristal korsenin soğuk vınlaması.'),
  yg_corinne: N('corinne', 'ygk_4', 6, 14, 'Corinne, Sırçanın Bekçisi', 'Hızlı sayfa çevirme, deri çanta gıcırtısı ve arada telaşlı bir cam şıngırtısı.'),
  yg_sora: N('sora', 'ygk_4', 10, 12, 'Sora-9, kütüphane çırağı', 'Merdiven tıkırtıları, kitap yerleştirme sesleri ve neşeli bir ıslık.'),
  ygk_arsiv: N(null, 'ygk_4', 3, 18, 'Kat 4 arşivi, yedek öğrenme rafları', 'Tozlu raflar; ustaların eski ders notları ve küçük sınav taşları. Kırgın bir ustanın büyüsü burada notlardan öğrenilebilir.'),
  yg_miranda: N('miranda', 'ygk_5', 10, 10, 'Miranda Caledor, İhtişamın Gölgesi', 'İnce kristal kadeh çınlaması, ağır ipek hışırtısı ve tembel bir arp tınısı.'),
  yg_elian: N('elian', 'ygk_5', 12, 14, 'Elian, sera asistanı', 'Su püskürtme sesi, toprak kazıma ve ince yaprak hışırtısı.'),
  yg_sirilla: N('sirilla', 'ygk_6', 4, 4, 'Sirilla, Sırça Göz', 'Soğuk bir ayna salonu; yavaş topuk sesleri ve ince cam titremesi.'),
  yg_zephyra: N('zephyra', 'ygk_6', 10, 18, 'Zephyra, dış rüzgâr balkonunda', 'Uğuldayan yüksek rüzgâr ve geniş kanat çırpışları.', (d) => !!d.bayrak.zephyraSerbest),
  yg_valen: N('valen', 'ygk_m4', 10, 10, 'Valen Lazeria, stasis hücresinde', 'Kendi elleriyle kurduğu hücrelerden birinde; vakarlı, sessiz bir kriyo nabzı.', (d) => !!d.bayrak.valenKapali),
  yg_nox: N('nox', 'ygk_m2', 14, 14, 'Nox, gece stajyeri', 'Merdiven köşesinde hızlı kalp atışı, titrek nefes ve bardağa çarpan bir çay kaşığı.'),
  yg_morwenna: N('morwenna', 'ygk_m3', 10, 10, 'Morwenna, karanlık dehlizlerde', 'Sağdan sola kayan boğuk fısıltılar.', (d) => hk(d).ak_morwenna === 0),
};

// 5.2 (Paket 6A, 6B, 7): Doğu çöl kantonlarında Şeyh Kasım ve yerinde yapılan görevlerin işaretleri. İşaret görev açıkken
// görünür (bag.js yerleriGuncelle → d.ygk.acikYer); ses: düğüm ailesinin konumlu döngüsü (Yuzey ygkSesleri).
YG_NOKTALAR.yg_kasim = { mekan: 'dogu_kanton', x: 7922, y: 30, ad: 'Şeyh Kasım, Çöl Loncası reisi', yaricap: 2, ygk: 'kasim', tarif: 'Kervansaray gölgesinde bakır cezve fokurtusu, tespih şıkırtısı ve kumda sürüklenen ağır bir asa.' };
const Y = (mekan, x, y, ad, tarif, ses) => ({ mekan, x, y, ad, tarif, ses });
export const GOREV_YERLERI = {
  'FIL-01': Y('filtra', 11610, 52, 'Çöken Kızılkaya tüneli', 'Sendikanın ana maden galerisi; kadim bir kristal damar ağzı kapatmış, matkap uçları kırık yatıyor.', 'kristal'),
  'FIL-03': Y('filtra', 11652, 8, 'Derin galerinin dev pres kapısı', 'İki uzak kolla açılan, sıkışmış bir taş pres kapısı; köşede tozlu bir taş muhafız heykeli.', 'tas'),
  'FIL-04': Y('loran', 11342, 52, 'Falez kovuğundaki susuz sera', 'Tuzla kabuk bağlamış toprak; solan nadir bitkilerin kuru hışırtısı.', 'bitki'),
  'FIL-05': Y('kara_gol', 7722, 22, 'Kara Göl\'ün ortasındaki sunak', 'Zift gibi sular; ortadaki sunaktan fısıltılar yükseliyor. Tekne giremiyor.', 'fisilti'),
  'ZOR-01': Y('gri_yel', 11822, 50, 'Kayan kumlara saplanan kervan', 'Kum çukurunda yarı gömülü arabalar, korkmuş yük hayvanları, kayan kumun hışırtısı.', 'toz'),
  'ZOR-03': Y('gri_yel', 11852, 52, 'Kanyon ağzındaki gözcü kampı', 'Kanunsuz gözcülerin ateşi ve kum fırtınasının uğultusu.', 'ruzgar'),
  'ZOR-04': Y('dogu_kanton', 7940, 42, 'Kum tepesine gömülü çöl dikilitaşı', 'Dev bir kum tepesinin altından yalnız ucu görünen kadim taş; karanlıkta okunmayan bir yazıt.', 'tas'),
  'ZOR-05': Y('dogu_kanton', 7912, 18, 'Kanton kuyusunun taş muhafızı', 'Kuruyan kuyunun başında tıkanmış yeraltı kapağını tutan eski bir taş heykel.', 'su'),
  'ZOR-06': Y('gri_yel', 11836, 36, 'Gri Yel Burcu verandası', 'Gece; gökten süzülen sarı toz ve yanan bir kervan ateşi.', 'toz'),
  'KUZ-01': Y('zeris', 10642, 56, 'Dış kulenin yıkık gözlem balkonu', 'Merdivenin bittiği yerde uğuldayan boşluk; yukarıda kırık bir balkon.', 'ruzgar'),
  'KUZ-02': Y('zeris', 10612, 30, 'Donmuş rüzgâr çanları', 'Buz tutmuş çanlar yanlış, kırık notalar veriyor.', 'buz'),
  'KUZ-04': Y('helgar', 10946, 50, 'Helgar buz mağarasının ikiz kapısı', 'İki uzak kol; yanında buzla kaplı bir muhafız heykeli.', 'buz'),
  'KUZ-05': Y('helgar', 10914, 56, 'Kuzey sınırındaki dar geçit', 'Norvask gözcülerinin kamp ateşi ve kar fırtınasının ıslığı.', 'ruzgar'),
  'GUN-01': Y('flee_plee', 6232, 10, 'Batık kadırganın ambarı', 'Kumda yarı gömülü bir kadırga; ambar kapağında görünmez bir aether mührü vınlıyor.', 'toz'),
  'GUN-02': Y('arin', 6611, 10, 'Uçan Arin Adası\'nın eski tapınağı', 'Denizin onlarca metre üstünde; ters yerçekimi kristallerinin uğultusu.', 'ruzgar'),
  'GUN-03': Y('aether_dock', 6030, 30, 'Nyxara\'nın kilitli Arin çekirdeği', 'Hibrit bir Arin-Malken kapsülü; içinde kilitli bir devrenin kalp atışı.', 'elektrik'),
  'GUN-04': Y('malazar_ocaklari', 9214, 16, 'Malazar ocaklarının en alt galerisi', 'Mor şimşek fırtınası ve erimiş enerji akıntısı galeriyi kapatmış; tepede bir paratoner sunağı.', 'simsek'),
  'GUN-05': Y('veradon', 6832, 22, 'Veradon gümrük kulesi', 'Taş rıhtım, gümrük memurlarının mühürleri ve sis çanı.', 'su'),
  'ZIN-02': Y('ygk_m4', katX('ygk_m4') + 4, 16, 'Kat -4\'teki mühürlü kasa', 'Stasis hücrelerinin ardında, üç katmanlı rezonans mührüyle kapalı bir kasa.', 'elektrik'),
  'SUB-01': Y('ygk_m3', katX('ygk_m3') + 15, 4, 'Kat -3\'teki terk edilmiş reaktör dolabı', 'Malazar Çatlağı\'nın kenarında paslı bir dolap; içinden zayıf bir veri çekirdeği vızıltısı.', 'elektrik'),
  'SUB-04': Y('zeris', 10652, 58, 'Rüzgâr kulesinin yüksek balkonundaki sandık', 'Solmuş bir yıldız mührüyle kapalı eski bir sandık; içinde Zhaor\'un seyir haritası.', 'ruzgar'),
  'SUB-05': Y('arin', 6604, 18, 'Arin ile Malazar arasındaki rüzgâr noktası', 'Adanın kenarı; aşağıda deniz, uzakta Malazar. Rüzgârda dört notalı sessiz bir yankı.', 'kristal'),
};
// 5.4 (karakter 25-30): şehir ve bölge kişileri
const P = (ygk, mekan, x, y, ad, tarif) => ({ mekan, x, y, ad, yaricap: 2, ygk, tarif });
Object.assign(YG_NOKTALAR, {
  yg_xaela: P('xaela', 'aether_dock', 6046, 48, 'Xaela, Neon İlahiyatçı', 'Neon vinçlerin altında sunucu sunağı; bas vuruşları, fan vızıltısı ve dönen bir veri halesinin cızırtısı.'),
  yg_misket: P('misket', 'halka_uma', 7418, 18, 'Bayan Misket, kadife perdeli çay salonu', 'Porselen fincan şıngırtısı, ipek hışırtısı ve kısık fısıltılar.'),
  yg_sifir: P('sifir', 'filtra', 11652, 34, '"Sıfır" Makinist, buhar atölyesi', 'Tıslayan buhar boruları, ritmik çekiç ve saat dişlilerinin tık tıkı.'),
  yg_zahra: P('zahra', 'dogu_kanton', 7926, 50, 'Zahra Elmas Göz, ipek tenteli kervan köşkü', 'Tentelerde çöl rüzgârı, deve çanları ve bakır tartıların şıngırtısı.'),
  yg_kikirdak: P('kikirdak', 'flee_plee', 6212, 54, 'Doktor Kıkırdak, Patlamaz Laboratuvar', 'Fokurdayan cam balonlar, küçük puf patlamaları ve tırmalayıcı bir kıkırtı.'),
  yg_cakal: P('cakal', 'veradon', 6816, 26, 'Usta Çakal, Veradon Hanı köşe masası', 'Şömine çıtırtısı, zar sesi ve taş zeminde bir bastonun tıkırtısı.'),
});

// 5.3 (Paket 9-13): saha büyü görevleri (ygk/kisiler/k13.js)
Object.assign(GOREV_YERLERI, {
  'SU-01': Y('tas_cember', 10246, 12, 'Axira Irmağı\'nın taşkın kolu', 'Köyün ortasından akan kabarmış ırmak; sıkışmış değirmen çarklarının gıcırtısı.', 'su'),
  'SU-02': Y('norvask', 10848, 50, 'Fiyort kapısının kara buz duvarı', 'Buz kıran gemisinin gövdesine vuran dalgalar; buzun derin çatırtısı.', 'buz'),
  'SU-03': Y('keralon', 12846, 14, 'Batık kadim pompa odası', 'Bataklığın derinliğinde kabarcıklanan zehirli gaz; ölü bir tribünün ağır sessizliği.', 'fisilti'),
  'ISIK-01': Y('kristal_teraslar', 10146, 46, 'Dört büyük kristal sütun', 'Rüzgârla çınlayan ama akordu bozulmuş sütunlar; şehre yayılan rahatsız bir uğultu.', 'kristal'),
  'ISIK-02': Y('cam_duzlukleri', 12114, 14, 'Cam levhalar arasındaki uçurum', 'Ayaklarının altında çıtırdayan cam; aşağıdan yükselen rüzgâr.', 'kristal'),
  'ISIK-03': Y('hardrin', 12346, 16, 'Morluk Kapısı', 'Pusulaları saptıran mavi bir uğultu; iki gerçeklik katmanı arasında titreyen koridorlar.', 'elektrik'),
  'TAS-01': Y('filtra', 11618, 22, 'Eğilmiş cevher rayları ve buhar vanaları', 'Basınçlı buharın ıslığı; bükülmüş rayların metalik inlemesi.', 'metal'),
  'TAS-02': Y('kirik_vadi', 12246, 46, 'Taşlaşmış antik su kemeri', 'Kükürt kokusu; kemerin altındaki cüruf duvarından sıcak bir tıslama.', 'tas'),
  'TAS-03': Y('kahergonat', 12448, 14, 'Beş basamaklı sunak', 'Işığı yutan kanyonda beş kırık sütun; ortada hareketsiz bir bazalt muhafız.', 'tas'),
  'HAVA-01': Y('gozlem_adalari', 10446, 48, 'Sönen ana deniz feneri', 'Spiral akıntının uğultusu; kule tepesinde sessiz üç bakır bobin.', 'elektrik'),
  'HAVA-02': Y('ajmero', 11946, 46, 'Kum girdabındaki kervan', 'Dört bir yandan dönen kum; ortada çaresiz bir kervanın çanları.', 'ruzgar'),
  'HAVA-03': Y('malazar_hale', 11148, 50, 'Hâle Denge Düğümü', 'Dönen büyü fırtınası ve iyonize şimşeklerin çatırtısı.', 'simsek'),
  'KG-01': Y('kara_gol', 7708, 52, 'Krater kenarındaki üç gözetleme direği', 'Sesini başka sözlerle geri yollayan direkler; zift kokusu.', 'fisilti'),
  'KG-02': Y('kara_gol', 7750, 12, 'Titan Runahar\'ın kaburgası', 'Zift içindeki taşlaşmış dev kaburgalar; çatırdayan kadim bir kemer.', 'metal'),
  'KG-03': Y('kara_gol', 7752, 50, 'Krater merkez yarığı', 'Nefes alır gibi açılıp kapanan yarıktan mor bir fısıltı.', 'elektrik'),
  'NER-01': Y('nerya', 12614, 12, 'Çöken kemer köprü', 'İki yakada silahlı muhafızlar; arada kanal girdabı.', 'su'),
  'NER-02': Y('nerya', 12648, 48, 'Sular altındaki lonca mahzeni', 'Yosunlu basamaklar; suda sürüklenen pirinç bir sandığın tıngırtısı.', 'su'),
  'FEN-01': Y('fenrir', 6434, 14, 'Karaya oturmuş toz mavnası', 'Parlayan tozun hışırtısı; uzaktan çalan bir metal çan.', 'toz'),
  'FEN-02': Y('fenrir', 6446, 52, 'Gömülü rasathane kubbesi', 'Toz altından yükselen boğuk bir yankı; kırık bir döner merdiven.', 'kristal'),
  'THA-01': Y('tharal', 12546, 14, 'Orman kenarındaki su oluğu', 'Gri, tortulu bir su; yaşlı köklerin kuru hışırtısı.', 'bitki'),
  'THA-02': Y('tharal', 12548, 46, 'Kraliyet tahıl ambarı kulesi', 'Kurumuş bir sarmaşık kilidi; iki ağır ağırlık kolu.', 'bitki'),
  'GUM-01': Y('gumus_tuy', 10346, 12, 'Gümüş sazlıktaki batık iskele', 'Rüzgârda metalik fısıldayan jilet gibi sazlar.', 'ruzgar'),
  'JUL-01': Y('julithan', 11446, 14, 'Meclis arşiv odası', 'Gece; kasada iki ferman ve titreyen bir mum.', 'fisilti'),
  'JUL-02': Y('julithan', 11448, 48, 'Liman kulesinin çatlak çanı', 'Çatlak bir bronz nota; sisin içinde kayalıklara sürüklenen gemiler.', 'metal'),
  'ANI-01': Y('anitor', 11546, 12, 'Korzel Burnu fener kayası', 'Fırtına; kayalıklara sürüklenen iki geminin gıcırtısı.', 'elektrik'),
  'ANI-02': Y('anitor', 11548, 46, 'Darnak Limanı zincir vinci', 'Gergin bir su altı zincirinin inlemesi.', 'metal'),
  'ORE-01': Y('oredan', 12714, 14, 'Asılı kaya ve buz kütlesi', 'Damla damla eriyen buz; tepeden çatırdayan bir kütle.', 'buz'),
  'ORE-02': Y('oredan', 12748, 48, 'Kanyon burçlarının sis boruları', 'Hırıltılı bir bakır boru; karşı burçtan cevapsız kalan bir çağrı.', 'metal'),
  'GOL-01': Y('golge_hatti', 12014, 44, 'Soğuk sisteki kaya dairesi', 'Üç yönden gelen sahte yankılar; donmak üzere olan bir devriyenin sesi.', 'fisilti'),
  // 5.4 (Paket 14-15)
  'AXI-01': Y('axira_cemberi', 10040, 44, 'Axira Çemberi\'nin yıldız karoları', 'Taş karoların altında sönmüş bir kristal çınlaması; oval meydanda geniş bir rüzgâr yankısı.', 'kristal'),
  'AXI-02': Y('axira_cemberi', 10048, 12, 'Eski Muhafız Bakım Odası kapısı', 'Saray duvarının dibinde paslı bir kapı; ardında Tenohris\'in kristal tabanının uğultusu.', 'metal'),
  'KAR-01a': Y('kahergonat', 12412, 34, 'Kuzey İğnesi kulesinin dibi', 'Kuleden yükselen düşük frekanslı mekanik uğultu; üç bakır kapak.', 'metal'),
  'KAR-01b': Y('kahergonat', 12452, 30, 'Bazalt Kapı Kulesi', 'İki karşıt sütun; ağır bir topraklama kolunun gıcırtısı.', 'tas'),
  'KAR-01c': Y('kahergonat', 12430, 8, 'Çatlak Çan Kulesi', 'Aşırı ısınmış bir çekirdeğin tıslaması; çatlak bir çanın titreşimi.', 'lav'),
  'CAH-01': Y('keralon', 12816, 30, 'Su Mezarı dış eşik galerisi', 'Derin su altı basıncının kalp atışı gibi boğuk vuruşları; taş kabartmalardan süzülen eski sesler.', 'su'),
  // 5.5 (Paket 8): büyü finali
  'BF-01': Y('tenohris', 7612, 3, 'Tenohris altındaki kadim sunak', 'Sarayın altına inen dar bir merdiven; ışık girmeyen salonda beş dev taş muhafız ve nefes alır gibi titreşen kara bir mühür.', 'tas'),

});
for (const gid of Object.keys(GOREV_YERLERI)) {
  const y = GOREV_YERLERI[gid];
  YG_NOKTALAR['yg_yer_' + gid] = { mekan: y.mekan, x: y.x, y: y.y, ad: y.ad + ' (' + gid + ')', yaricap: 2.5, gorev: gid, tarif: y.tarif, gorunur: (d) => !!(d.ygk && d.ygk.acikYer && d.ygk.acikYer[gid]) };
}
