// Yerleşim verisi (v5 paketi; belgeler/v5/paket-1, paket-8, 8a-8c, paket-4). Bağımlılıksız.
//
// YERLESIM_BINALARI: Merkez Terminal'in "Yerleşim" sekmesindeki 12 sosyal mekân (25 sanayi binasından ayrı).
//   kosul (ihtiyaç doğar), veren/ihtiyac (isteği söyleyen yerleşimci ve sözü), malzeme, kultur, tarif (içeride),
//   sesGunduz/sesGece (belgedeki ortam tarifleri), ortam (iç ortam döngüsü), disSes (meydanda kapı önünden duyulan
//   boğuk döngü; Paket 00 1.3), mekan (iç mekânın kimliği; harita.js'e yerlesim/harita.js ekler).
// YERLESIMCILER: 16 kişilik kadro (Paket 1 kartları + Paket 8 mizaç ve sosyal ağ + 8A-8C bar hızı ve yol).
//   kisi: harita.js KISILER kimliği (ilk üç öncü mürettebatın kendisi: muhendis/telsizci/hekim).
//   program: nöbet yıldızına göre bulunduğu yer (bina kimliği ya da yedek yer adı; bina kurulu değilse kamp ateşi).
//   hediye: sever/sevmez (oyun içi eşya kimlikleri; erzak_<id> işlenmiş yiyecek, urun_<bitki> hasat).
//   dogum: 56 günlük yılın günü (Paket 4: her 3-4 günde bir). imza: ElevenLabs ile seslendirilen üç kısa cümle.
//   kademe: Paket 1'in K1/K2/K3 kazançları Paket 8 uyarınca 3/6/10. kademede (bayrak yk_<id>_<kademe>).

// --- Beş düşünce yapısı (Paket 8 bölüm 3) ve üç sohbet tonu (5.1) ---
// Ton A pratik/çözüm, B sıcak/gelenekçi/duygusal, C analitik/sorgulayıcı/esprili. tam +20, notr +10, ters -5.
export const MIZACLAR = {
  gelenekci: { ad: 'Gelenekçi ve ruhani', ozet: 'toprak ve kültür', tam: 'B', ters: 'C', sever: 'sabır, doğaya saygı, ritüeller, el emeği, festivaller', sevmez: 'acelecilik, her şeyi kâra dökmek' },
  pragmatik: { ad: 'Pragmatik ve zanaatkâr', ozet: 'ölçü ve emek', tam: 'A', ters: 'C', sever: 'net konuşma, sağlam iş, alet bakımı, sahada ter', sevmez: 'boş söz, plansız risk, yarım iş' },
  bilimsel: { ad: 'Bilimsel ve meraklı', ozet: 'veri ve keşif', tam: 'C', ters: 'B', sever: 'kanıt, analiz, yeni teknoloji, arşiv', sevmez: 'batıl inançla karar, veriyi görmezden gelmek' },
  toplulukcu: { ad: 'Toplulukçu ve şefkatli', ozet: 'insan ve nesil', tam: 'B', ters: 'A', sever: 'çocuklar, okul, şifa, uzlaşı', sevmez: 'sert cezalar, bencillik' },
  stratejik: { ad: 'Stratejik ve hesapçı', ozet: 'disiplin ve fırsat', tam: 'A', ters: 'B', sever: 'hazırlık, savunma, kârlı takas', sevmez: 'tedbirsizlik, malı heba etmek' },
};

// Paket 8 bölüm 2: 0-10 kademe, her kademe 100 puan
export const KADEMELER = ['Yabancı', 'Tanıdık', 'Aşina', 'Güven Başlangıcı', 'İyi Komşu', 'Dost', 'Yakın Dost', 'Gönüldaş', 'Can Dostu', 'Sırdaş', 'Hayat Bağı'];
export const KADEME_KILIDI = {
  1: 'günlük rutin ve meslek sohbeti',
  2: 'sevdiği ve sevmediği şeylerden ipuçları',
  3: 'ilk kişisel hikâye sahnesi ve küçük meslek kazancı',
  4: 'öteki yerleşimciler hakkında fikirler',
  5: 'koloni içi anlaşmazlıklarda fikrini sorma',
  6: 'orta hikâye sahnesi ve özel kazanç',
  7: 'gizli sır sahnesi',
  8: 'yaşam ortaklığı ya da kardeşlik yemini',
  9: 'kriz anlarında koşulsuz destek',
  10: 'final hikâye sahnesi ve kalıcı efsanevi kazanç',
};

// --- 12 Yerleşim mekânı (Paket 1 bölüm 2) ---
const nufus = (d) => (d.koloni && d.koloni.nufus && d.koloni.nufus.toplam) || 0;
const bina = (d, id) => !!(d.koloni && d.koloni.binalar && d.koloni.binalar.includes(id));
const yer = (d, id) => !!(d.yer && d.yer.binalar && d.yer.binalar.includes(id));
export const YERLESIM_BINALARI = {
  kamp: {
    ad: 'Kapsül Enkazı ve Kamp Ateşi', kultur: 'Başlangıç', baslangic: true,
    tarif: 'Kapsülün yanında taşlarla çevrili bir ateş. İlk buluşmaların ve ateş başı sohbetlerinin yeri.',
    sesGunduz: 'rüzgâr, kamp ateşi çıtırtısı', sesGece: 'kamp ateşi, uzak böcekler',
  },
  meydan: {
    ad: 'Koloni Meydanı', kultur: 'Ortak', veren: ['zarek', 'kaelon'], ihtiyac: 'Herkesin toplanacağı bir meydan düzleyelim Kaptan.',
    kosul: (d) => bina(d, 'yasam_blogu'), kosulMetni: 'Basınçlı Yaşam Bloğu kurulunca.',
    malzeme: { bazalt: 15, titanyum: 5 }, mekan: 'meydan', ortam: 'ortam_meydan',
    tarif: 'Yerleşimin ana kesişim noktası; tezgâhlar, fenerler ve ilan panosunun yeri.',
    sesGunduz: 'ayak sesleri, tezgâh ve fener vızıltısı', sesGece: 'fener vızıltısı, rüzgârda sallanan plakalar',
    kurulus: 'Zarek taşları ipe dizip ölçüyor, Kaelon bazalt plakaları tokmakla yerine oturtuyor. Akşama doğru düzlüğün ortasına ilk fener dikiliyor; herkes bir an susup ışığa bakıyor. Artık toplanacak bir yerimiz var.',
  },
  kamara: {
    ad: 'Kaptanın Kamarası', kultur: 'Ortak', veren: ['veysel'], ihtiyac: 'Kaptan, kapsül ranzası yerine sana bir oda yapalım. Yorgun kaptan rotayı şaşırır.',
    kosul: (d) => yer(d, 'meydan'), kosulMetni: 'Koloni Meydanı kurulunca.',
    malzeme: { bazalt: 10, titanyum: 8, cam: 2 }, mekan: 'kamara', ortam: 'ortam_kamara',
    tarif: 'Küçük ama senin olan bir oda: yatak, duvar takvimi ve dekor rafı.',
    sesGunduz: 'havalandırma, saat tik-tağı', sesGece: 'havalandırma, saat tik-tağı',
    kurulus: 'Usta Veysel kapının pervazını eliyle düzeltiyor: "Biraz eğri ama sağlam evlat; tıpkı bizim gibi." Ranzadan sonra gerçek bir yatak. Duvara bir takvim asıyor, rafı boş bırakıyor: "Onu sen doldurursun."',
  },
  ashane: {
    ad: 'Dünya Usulü Aşhane ve Taş Fırın', kultur: 'Dünya', veren: ['sorya', 'veysel'], ihtiyac: 'Kaptan, teneke kaplarda yemek pişmiyor; taş fırınlı gerçek bir aşhane lazım.',
    kosul: (d) => yer(d, 'meydan'), kosulMetni: 'Koloni Meydanı kurulunca.',
    malzeme: { bazalt: 12, titanyum: 4, kristal: 3 }, mekan: 'ashane', ortam: 'ortam_ashane', disSes: 'dis_ashane',
    tarif: 'Taş fırın, uzun ortak sofra ve tencere rafları. Sıcak ekmek kokusu.',
    sesGunduz: 'fırın çıtırtısı, kaşık ve tencere tıkırtısı', sesGece: 'sönmeye yüz tutmuş fırın, kapak tıkırtısı',
    kurulus: 'Sorya fırının ağzına ilk ateşi üflüyor, Veysel tuğlaları elleriyle okşuyor: "Dünya\'da annem böyle bir fırında ekmek yapardı." İlk ekmek biraz yanık çıkıyor; kimse aldırmıyor, herkes bir parça koparıyor.',
  },
  atolye: {
    ad: 'Dünya Usulü Döküm ve Marangoz Atölyesi', kultur: 'Dünya', veren: ['veysel', 'kaelon'], ihtiyac: 'Sadece gemi dökümhanesi yetmez; ince el işi ve araç tamiri için bir sokak atölyesi lazım.',
    kosul: (d) => yer(d, 'meydan') && !!(d.bayrak && d.bayrak.dokumhane), kosulMetni: 'Meydan ve dökümhane kurulunca.',
    malzeme: { bazalt: 14, titanyum: 10, kablo: 4 }, mekan: 'atolye', ortam: 'ortam_atolye', disSes: 'dis_atolye',
    tarif: 'Tezgâhlar, tornalar ve asılı aletler. Dekor ve el aletlerinin yapıldığı zanaat sokağı.',
    sesGunduz: 'zımpara ve rende, çekiç darbeleri, torna', sesGece: 'soğuyan metalin tıkırtısı',
    kurulus: 'Kaelon tornayı ilk kez çalıştırıp dinliyor; Veysel rendesini tezgâha koyuyor. İkisi bir süre konuşmadan çalışıyor, sonra Kaelon "Fena değil, Usta" diyor. Veysel gülümsüyor.',
  },
  dunya_konut: {
    ad: 'Modüler Dünya Konutları', kultur: 'Dünya', veren: ['defne'], ihtiyac: 'Vanguard\'dan kalanlar ve çocuklar sıkışık bloklarda yoruluyor; müstakil evler kuralım.',
    kosul: (d) => yer(d, 'meydan') && nufus(d) >= 8, kosulMetni: 'Meydan ve sekiz nüfus.',
    malzeme: { bazalt: 20, titanyum: 8, polimer: 6 }, mekan: 'dunya_konut', ortam: 'ortam_konut',
    tarif: 'Dünya tarzı sıcak evler; akşamları Veysel, Defne, Marcus ve Mateo buraya döner.',
    sesGunduz: 'kapı gıcırtısı, ev sohbeti', sesGece: 'kısık sesli ev sohbeti',
    kurulus: 'Her evin kapısına bir isim levhası çakılıyor. Defne çocuklara kendi odalarını gösteriyor; biri pencereye yapıştırdığı kâğıt yıldızı herkese gösteriyor.',
  },
  kubbe_ev: {
    ad: 'Malken Kristal Kubbe Evleri', kultur: 'Malken', veren: ['lyris', 'sorya'], ihtiyac: 'Malkenler yıldız ışığını süzen rezonanslı kubbe evlerde huzur bulur.',
    kosul: (d) => yer(d, 'meydan') && nufus(d) >= 6, kosulMetni: 'Meydan ve altı nüfus.',
    malzeme: { bazalt: 15, rezonans_cami: 6, saf_aether: 2 }, mekan: 'kubbe_ev', ortam: 'ortam_kubbe_ev',
    tarif: 'Işıklı Malken kubbeleri; ana ekip ve Malkenler burada dinlenir.',
    sesGunduz: 'ince kristal tınısı, sakin nefes', sesGece: 'kubbenin yıldız ışığında hafifçe çınlaması',
    kurulus: 'Lyris kubbenin camına parmağıyla dokunuyor; cam ince bir tınıyla karşılık veriyor. "Altı yıldızın ışığı içeri girecek" diyor Sorya. İlk gece kubbeler çok sessiz.',
  },
  tapinak: {
    ad: 'Axelum Tapınağı', kultur: 'Malken', veren: ['lyris', 'zarek'], ihtiyac: 'Kaptan, maneviyatımız zayıflıyor; altı yıldıza ve Axelum\'a dua edeceğimiz bir tapınak kuralım.',
    kosul: (d) => yer(d, 'meydan') && nufus(d) >= 10, kosulMetni: 'Meydan ve on nüfus.',
    malzeme: { bazalt: 18, rezonans_cami: 8, saf_aether: 4, zhaor_prizmasi: 1 }, mekan: 'tapinak', ortam: 'ortam_tapinak', disSes: 'dis_tapinak',
    tarif: 'Derin akustikli bir kubbe; ibadet, arınma ve hizalanma törenlerinin kalbi.',
    sesGunduz: 'derin kubbe akustiği, yumuşak çan', sesGece: 'ilahi tınısı, tek bir çan',
    kurulus: 'Zhaor prizması kubbenin tepesine yerleştirildiğinde içerisi gümüşi bir ışıkla doluyor. Lyris başını eğiyor, Zarek ilk çanı çalıyor; yankı uzun süre sönmüyor.',
  },
  taverna: {
    ad: 'Taverna', kultur: 'Ortak', veren: ['julian', 'marcus'], ihtiyac: 'Akşamları dertleşip masa oyunu oynayacağımız sıcak bir taverna açalım.',
    kosul: (d) => yer(d, 'meydan') && nufus(d) >= 10, kosulMetni: 'Meydan ve on nüfus.',
    malzeme: { bazalt: 16, titanyum: 6, cam: 4, urun_vaha_hurmasi: 2 }, mekan: 'taverna', ortam: 'ortam_taverna', disSes: 'dis_taverna',
    tarif: 'Müzik, sohbet, masa oyunu ve festival merkezi.',
    sesGunduz: 'akustik telli çalgı, kadeh tıkırtısı', sesGece: 'neşeli uğultu, müzik',
    kurulus: 'İlk akşam tavernada kimse oturmuyor; herkes kapıdan bakıyor. Sonra Marcus içeri girip bir masaya kuruluyor ve bağırıyor: "Kim zar atmaz!" Bir saat sonra yer kalmıyor.',
  },
  okul: {
    ad: 'Ortak Okul ve Yıldız Dersliği', kultur: 'Ortak', veren: ['defne', 'lyris'], ihtiyac: 'Çocuklar Dünya tarihini de Malken yıldızlarını da öğrensin.',
    kosul: (d) => yer(d, 'meydan') && nufus(d) >= 12 && katildi(d, 'defne'), kosulMetni: 'Meydan, on iki nüfus ve Öğretmen Defne.',
    malzeme: { bazalt: 15, titanyum: 6, mikrocip: 4, cam: 4 }, mekan: 'okul', ortam: 'ortam_okul', disSes: 'dis_okul',
    tarif: 'Eğitim, tarihçe ve koloni arşivi köşesi.',
    sesGunduz: 'zil tınısı, sayfa çevirme, çocuk sesleri', sesGece: 'boş sıraların sessizliği',
    kurulus: 'Defne tahtaya iki şey yazıyor: Dünya ve Malkenia. Lyris altına altı yıldızı çiziyor. İlk dersin konusu: "Burası artık hepimizin evi."',
  },
  hamam: {
    ad: 'Termal Şifa Hamamı', kultur: 'Ortak', veren: ['siravel', 'lyris'], ihtiyac: 'Jeotermal sudan herkesin arınacağı sıcak bir hamam yapalım.',
    kosul: (d) => bina(d, 'jeotermal_santral'), kosulMetni: 'Jeotermal santral kurulunca.',
    malzeme: { bazalt: 18, titanyum: 8, polimer: 6 }, mekan: 'hamam', ortam: 'ortam_hamam', disSes: 'dis_hamam',
    tarif: 'Sıcak su havuzları; stresin arındığı, Vaelin ve Malkenlerin buluştuğu yer.',
    sesGunduz: 'akan su şırıltısı, buhar vanası, taş yankısı', sesGece: 'damlayan su, uzak buhar',
    kurulus: 'Vanalar açıldığında taş havuzlara jeotermal su buhar bulutlarıyla doluyor. Lyris elini suya daldırıyor: "Tam vücut ısısı." Gecenin sonunda koloninin yarısı havuzun kenarında uyuklıyor.',
  },
  gozlem: {
    ad: 'Gözlem Tepesi ve Çan Atölyesi', kultur: 'Malken', veren: ['zarek', 'julian'], ihtiyac: 'Yıldızları dinleyip çan akordu yapacağımız yüksek bir tepe kuralım.',
    kosul: (d) => yer(d, 'meydan') && bina(d, 'sinyal_kulesi'), kosulMetni: 'Meydan ve sinyal kulesi.',
    malzeme: { bazalt: 10, piezo: 6, kablo: 4 }, mekan: 'gozlem', ortam: 'ortam_gozlem', dis: true,
    tarif: 'Rüzgârın estiği yüksek bir düzlük; yıldız takibi, melodi besteleme ve uzak keşif taraması.',
    sesGunduz: 'rüzgâr hışırtısı, kristal çan melodileri', sesGece: 'rüzgâr, yıldızların sessizliği',
    kurulus: 'Zarek tepeye ilk çanı asıyor. Rüzgâr çanı kendiliğinden çaldırınca gülüyor: "Gökyüzü de bizimle konuşmak istiyor Kaptan."',
  },
};
export const YERLESIM_SIRASI = Object.keys(YERLESIM_BINALARI);

// Program yerlerinin bina karşılıkları (belgedeki yer adları; kurulu değilse kamp ateşi)
export const PROGRAM_YERI = {
  mutfak: 'ashane', kantin: 'ashane', sera: 'sera', meydan: 'meydan', taverna: 'taverna', atolye: 'atolye', santral: 'atolye',
  revir: 'revir', enstitu: 'revir', hastane: 'revir', okul: 'okul', arsiv: 'okul', hamam: 'hamam', gozlem: 'gozlem', cantepe: 'gozlem',
  dokumhane: 'atolye', maden: 'atolye', reaktor: 'atolye', tersane: 'atolye', hangar: 'atolye', gol: 'hamam', dis_kapi: 'meydan',
  kamp: 'kamp', evler: 'dunya_konut', kubbe: 'kubbe_ev', tapinak: 'tapinak', terminal: 'meydan',
};

const katildi = (d, id) => !!(d.yer && d.yer.katilan && d.yer.katilan.includes(id));
const iyiYol = (d, k) => { const v = d.bayrak && d.bayrak[k]; return !!v && v !== 'kotu'; };
const yap = (d) => (d.tamamlananOp || []);

// Bar hızı: kademeye göre çarpan (8A-8C)
const sabit = (x) => () => x;
const iki = (a, b, esik) => (k) => (k >= esik ? b : a);

// --- 16 yerleşimci ---
export const YERLESIMCILER = {
  sorya: {
    ad: 'Sorya Val-Nira', kisa: 'Sorya', kok: 'Malken', rol: 'Aşçı ve ilk tarım sorumlusu', cinsiyet: 'k', grup: 'A',
    kisilik: 'Anaç, telaşlı, sıcakkanlı.', sesTarif: 'tahta kaşıkla tencere karıştırma ve hafif mırıltı',
    mizac: ['gelenekci', 'toplulukcu'], hiz: sabit(1.2), yol: 'Karma: yemek ve hasat işleri, aile hikâyesi seçimleri',
    program: { Zhaor: 'mutfak', Varek: 'mutfak', Axira: 'sera', Elyndra: 'meydan', Sinha: 'meydan', Uma: 'taverna' },
    sever: ['urun_vaha_hurmasi', 'bal', 'urun_fosforlu_liken'], sevmez: ['sasi_celigi', 'polimer'],
    yakin: ['veysel', 'lyris'], catisma: ['mateo'], dogum: 3,
    imza: { selam: 'Hoş geldin Kaptan, ocak sıcak!', tesekkur: 'Ah, tam da bunu arıyordum!', kizgin: 'Bunu mutfağa sokma lütfen.' },
    kademe: { 3: 'Kayıp baharat kesesi bulundu: koloniye on moral.', 6: 'Vaha Ziyafeti özel tarifi açıldı.', 10: 'Seferden önce ücretsiz ek rasyon verir.' },
  },
  kaelon: {
    ad: 'Kaelon Vex-Tar', kisa: 'Kaelon', kok: 'Malken', rol: 'Baştekniker; jeneratör ve fırın ustası', cinsiyet: 'e', grup: 'A', kisi: 'muhendis', murettebat: 0,
    kisilik: 'Pratik, yorgun ama güvenilir.', sesTarif: 'İngiliz anahtarı şıkırtısı ve derin iç çekiş',
    mizac: ['pragmatik'], hiz: sabit(1.0), yol: 'Ağırlıklı iş ve saha yardımı',
    program: { Zhaor: 'atolye', Varek: 'atolye', Axira: 'santral', Elyndra: 'meydan', Sinha: 'taverna', Uma: 'taverna' },
    sever: ['titanyum', 'kablo', 'urun_noro_kahve'], sevmez: ['kseno_spor', 'nektar'],
    yakin: ['veysel', 'halvar'], catisma: ['julian'], dogum: 11,
    imza: { selam: 'Basınç sabit Kaptan.', tesekkur: 'İşte bu iş görür!', kizgin: 'Bozacaksın devreyi, dur.' },
    kademe: { 3: 'Boru sızıntısı onarıldı: tamir maliyetleri yüzde beş düştü.', 6: 'Dondurucu köpük üretimi verimlendi.', 10: 'Atölyede ücretsiz alet bakımı.' },
  },
  lyris: {
    ad: 'Dr. Lyris Mar-Axira', kisa: 'Lyris', kok: 'Malken', rol: 'Koloni hekimi ve kseno-biyolog', cinsiyet: 'k', grup: 'A', kisi: 'hekim', murettebat: 2,
    kisilik: 'Sakin, titiz, meraklı.', sesTarif: 'cam şişe tıkırtısı ve hafif öksürük',
    mizac: ['gelenekci', 'bilimsel'], hiz: sabit(0.75), yol: 'Hikâye dinleme ve etik seçimler',
    program: { Zhaor: 'revir', Varek: 'revir', Axira: 'sera', Elyndra: 'okul', Sinha: 'hamam', Uma: 'hamam' },
    sever: ['urun_aloe', 'kseno_spor', 'saf_su'], sevmez: ['plazma_kartusu', 'kara_aether'],
    yakin: ['siravel', 'nerissa'], catisma: ['torvok'], dogum: 14,
    imza: { selam: 'Nabzın düzenli mi Kaptan?', tesekkur: 'Laboratuvar için paha biçilmez.', kizgin: 'Bu dikkatsizlik can yakar.' },
    kademe: { 3: 'İlk yardım çantaları toplandı.', 6: 'Stres azaltıcı çay tarifi açıldı.', 10: 'Sefer dönüşü tedavi yüzde yirmi hızlanır.' },
  },
  zarek: {
    ad: 'Zarek Sol-Zhaor', kisa: 'Zarek', kok: 'Malken', rol: 'İzci ve keşif rehberi', cinsiyet: 'e', grup: 'A', kisi: 'telsizci', murettebat: 1,
    kisilik: 'Atik, esprili, sahadan kopamayan.', sesTarif: 'çakıl taşında bot sesi ve kısa ıslık',
    mizac: ['gelenekci', 'bilimsel'], hiz: sabit(1.1), yol: 'Keşif hikâyeleri ve saha seçimleri',
    program: { Zhaor: 'gozlem', Varek: 'gozlem', Axira: 'dis_kapi', Elyndra: 'atolye', Sinha: 'atolye', Uma: 'taverna' },
    sever: ['urun_noro_kahve', 'itki_yakiti', 'kristal'], sevmez: ['bazalt'],
    yakin: ['defne', 'elara'], catisma: ['marcus'], dogum: 18,
    imza: { selam: 'Rota temiz Kaptan!', tesekkur: 'Sırt çantam bayram etti.', kizgin: 'Böyle iz sürülmez.' },
    kademe: { 3: 'Kayıp harita parçası bulundu.', 6: 'Yüzey araçlarında yakıt tüketimi yüzde on düştü.', 10: 'Her gün gizli bir maden noktası ihbar eder.' },
  },
  veysel: {
    ad: 'Usta Veysel', kisa: 'Veysel', kok: 'Dünya (Vanguard-01 kurtulanı)', rol: 'Marangoz ve dekor ustası', cinsiyet: 'e', grup: 'A',
    kisilik: 'Bilge, yavaş konuşan, el emeğine düşkün.', sesTarif: 'zımpara ve rende sesi, hafif baston tıkırtısı',
    mizac: ['pragmatik', 'gelenekci'], hiz: iki(0.65, 1.1, 6), yol: 'Hikâye dinleme, sabır seçimleri ve el emeği',
    program: { Zhaor: 'atolye', Varek: 'atolye', Axira: 'atolye', Elyndra: 'meydan', Sinha: 'kamp', Uma: 'hamam' },
    sever: ['urun_bazalt_koku', 'rezonans_cami', 'erzak_kseno_cay'], sevmez: ['aether_muhimmati', 'plazma_kartusu'],
    yakin: ['kaelon', 'sorya', 'defne'], catisma: ['mateo'], dogum: 7, romantikDegil: 'Manevi baba ve aile bağı',
    imza: { selam: 'Hoş geldin evlat, otur hele.', tesekkur: 'Eline sağlık, pek zarif.', kizgin: 'Acele işe metal dayanmaz.' },
    kademe: { 3: 'Eski Vanguard anısını paylaştı.', 6: 'Kaptanın Kamarası için sesli dekor dükkânı açıldı.', 10: 'Kamarada dinlenmenin moral kazancı iki kat.' },
  },
  defne: {
    ad: 'Öğretmen Defne', kisa: 'Defne', kok: 'Dünya (mülteci kafilesi)', rol: 'Çocuk öğretmeni ve tarihçe arşivcisi', cinsiyet: 'k', grup: 'B',
    katilim: (d) => (d.koloni.binalar || []).includes('yasam_blogu') && nufus(d) >= 15, katilimMetni: 'Yaşam Bloğu ve on beş nüfus.',
    kisilik: 'Sabırlı, neşeli, düzenli.', sesTarif: 'zil tınısı ve sayfa çevirme',
    mizac: ['toplulukcu', 'bilimsel'], hiz: sabit(1.1), yol: 'Okul ve arşiv işleri, eğitim seçimleri',
    program: { Zhaor: 'okul', Varek: 'okul', Axira: 'okul', Elyndra: 'meydan', Sinha: 'taverna', Uma: 'evler' },
    sever: ['urun_fosforlu_liken', 'antik_veri', 'bal'], sevmez: ['sasi_celigi', 'polimer'],
    yakin: ['veysel', 'zarek', 'lyris'], catisma: ['mateo'], dogum: 21,
    imza: { selam: 'Dersimiz başlıyor Kaptan!', tesekkur: 'Öğrenciler buna bayılacak.', kizgin: 'Bilgiye saygı lütfen.' },
    kademe: { 3: 'Okul için ışık ve tablet bulundu.', 6: 'Koloni Arşivi bağışlarında yüzde on beş ek itibar.', 10: 'Çocuk korosu festivallere katılır.' },
  },
  marcus: {
    ad: 'Kaptan Marcus', kisa: 'Marcus', kok: 'Dünya', rol: 'Emekli pilot ve hava gözlemcisi', cinsiyet: 'e', grup: 'B',
    katilim: (d) => !!(d.mini && (d.mini.bitenGorevler || []).includes('kayip_ekip')), katilimMetni: 'Obsidyen Çölündeki kayıp keşif ekibi kurtarılınca.',
    kisilik: 'Disiplinli, eski asker, gökyüzüne hasret.', sesTarif: 'eski metal çakmağın klik sesi ve boğaz temizleme',
    mizac: ['stratejik', 'pragmatik'], hiz: sabit(0.75), yol: 'Saha güvenliği, karakol ve savunma seçimleri',
    program: { Zhaor: 'gozlem', Varek: 'gozlem', Axira: 'hangar', Elyndra: 'meydan', Sinha: 'meydan', Uma: 'taverna' },
    sever: ['plazma_yakiti', 'erzak_noro_konsantre', 'titanyum'], sevmez: ['nektar', 'erzak_serbet'],
    yakin: ['halvar', 'brom'], catisma: ['zarek', 'julian'], dogum: 25,
    imza: { selam: 'Gökler açık Kaptan.', tesekkur: 'Tam isabet!', kizgin: 'Disiplinsizliğe gelemem.' },
    kademe: { 3: 'Eski uçuş günlüğünü paylaştı.', 6: 'Bütün gemilerde kaçınma penceresi yüzde iki saniye uzar.', 10: 'Taverna masa oyununun ustası; özel ödül.' },
  },
  torvok: {
    ad: 'Torvok', kisa: 'Torvok', kok: 'Kaelith', rol: 'Maden ustası', cinsiyet: 'e', grup: 'B',
    katilim: (d) => !!(d.bayrak && d.bayrak.kaelithKurtarildi), katilimMetni: 'Kaelith\'in Son Ocağı (2B) tamamlanınca.',
    kisilik: 'Gür, mert, sıcağı seven.', sesTarif: 'ağır taş çekici vuruşu ve derin gülüş',
    mizac: ['pragmatik'], hiz: sabit(1.0), yol: 'Maden ve ocak işleri, cesaret seçimleri',
    program: { Zhaor: 'dokumhane', Varek: 'maden', Axira: 'maden', Elyndra: 'hamam', Sinha: 'taverna', Uma: 'taverna' },
    sever: ['urun_magma_korugu', 'izotop', 'safran_kukurt'], sevmez: ['urun_kar_lalesi', 'glies_buzu'],
    yakin: ['brom', 'kaelon'], catisma: ['siravel', 'lyris'], dogum: 28,
    imza: { selam: 'Ocağın ateşi gür olsun!', tesekkur: 'Demir gibi sağlam hediye!', kizgin: 'Taş gibi soğuksun.' },
    kademe: { 3: 'Kaelith ocağının anısını anlattı.', 6: 'Maden ocağında nadir cevher şansı yüzde yirmi arttı.', 10: 'Zırh üretiminde ek indirim.' },
  },
  siravel: {
    ad: 'Sira-Vel', kisa: 'Sira-Vel', kok: 'Vaelin', rol: 'Su ve hamam şifacısı', cinsiyet: 'k', grup: 'B',
    katilim: (d) => yap(d).includes('g14') && ((d.koloni.binalar || []).includes('kseno_habitat') || yer(d, 'hamam')), katilimMetni: 'Vaelin görevi (G-14) ve kseno-habitat ya da hamam.',
    kisilik: 'Sakin, akışkan, derin nefesli.', sesTarif: 'su damlası yankısı ve hafif ıslık',
    mizac: ['toplulukcu', 'gelenekci'], hiz: iki(0.65, 1.0, 5), yol: 'Hikâye dinleme ve huzur seçimleri',
    program: { Zhaor: 'hamam', Varek: 'hamam', Axira: 'gol', Elyndra: 'sera', Sinha: 'hamam', Uma: 'hamam' },
    sever: ['urun_metan_yosunu', 'urun_kar_lalesi', 'saf_su'], sevmez: ['urun_magma_korugu', 'safran_kukurt'],
    yakin: ['lyris', 'julian'], catisma: ['torvok'], dogum: 32,
    imza: { selam: 'Sular durgun ve berrak.', tesekkur: 'Denizler gibi cömertsin.', kizgin: 'Akıntıya karşı yüzme.' },
    kademe: { 3: 'Göl suyunun analizi yapıldı.', 6: 'Göl avcılığında nadir balık şansı yüzde yirmi beş arttı.', 10: 'Hamamda dinlenince stres sıfırlanır.' },
  },
  mateo: {
    ad: 'Tüccar Mateo', kisa: 'Mateo', kok: 'Dünya', rol: 'İkmal ve pazar sorumlusu', cinsiyet: 'e', grup: 'B',
    katilim: (d) => (yap(d).includes('g02') || (d.koloni.binalar || []).includes('sinyal_kulesi')) && yer(d, 'meydan'), katilimMetni: 'İlk uzay ticareti ya da sinyal kulesi, ve Koloni Meydanı.',
    kisilik: 'Kurnaz ama adil, hesapçı.', sesTarif: 'madeni para şıkırtısı ve el ovuşturma',
    mizac: ['stratejik'], hiz: iki(1.2, 0.8, 6), yol: 'Önce ticaret, sonra vicdan ve empati seçimleri',
    program: { Zhaor: 'meydan', Varek: 'meydan', Axira: 'meydan', Elyndra: 'meydan', Sinha: 'taverna', Uma: 'evler' },
    sever: ['urun_altin_hurma', 'saf_kristal', 'altin_tel'], sevmez: ['urun_metan_yosunu', 'bazalt'],
    yakin: ['elara'], catisma: ['sorya', 'veysel', 'defne'], dogum: 35,
    imza: { selam: 'Bugün kâr kokusu var!', tesekkur: 'Tam bir ticaret dehası!', kizgin: 'Bu fiyata taş bile almam.' },
    kademe: { 3: 'Kayıp kargo listesi bulundu.', 6: 'Pazar satış gelirleri yüzde on arttı.', 10: 'Tüccar gemisinin stoğunu bir gün önceden söyler.' },
  },
  julian: {
    ad: 'Julian', kisa: 'Julian', kok: 'Kithron mülteci kafilesi', rol: 'Çan ustası ve taverna müzisyeni', cinsiyet: 'e', grup: 'B',
    katilim: (d) => yer(d, 'taverna') && (d.itibar || 0) >= 150, katilimMetni: 'Taverna ve yüz elli evren itibarı.',
    kisilik: 'Hayalperest, neşeli, ses hastası.', sesTarif: 'küçük kristal çan tınısı ve parmak şıklatma',
    mizac: ['gelenekci'], hiz: sabit(1.15), yol: 'Çan ve festival işleri, duygusal destek seçimleri',
    program: { Zhaor: 'meydan', Varek: 'cantepe', Axira: 'cantepe', Elyndra: 'taverna', Sinha: 'taverna', Uma: 'taverna' },
    sever: ['piezo', 'rezonans_cami', 'erzak_serbet'], sevmez: ['itki_yaglayici', 'sasi_celigi'],
    yakin: ['siravel', 'zarek'], catisma: ['kaelon', 'marcus'], dogum: 39,
    imza: { selam: 'Kulakların şen olsun Kaptan!', tesekkur: 'Ne tatlı bir tını!', kizgin: 'Akort tamamen bozuldu.' },
    kademe: { 3: 'Kırık çanın akordu yapıldı.', 6: 'Çan atölyesinde yeni nota setleri açıldı.', 10: 'Tavernanın moral yenileme gücü iki kat.' },
  },
  brom: {
    ad: 'Brom', kisa: 'Brom', kok: 'Filtra (Ferros-Omega)', rol: 'Eski Filtra demircisi', cinsiyet: 'e', grup: 'C',
    katilim: (d) => iyiYol(d, 'gz_p06'), katilimMetni: 'Ferros-Omega\'da ittifak yolu seçilince.',
    kisilik: 'Sert, dürüst, Filtra özlemli.', sesTarif: 'körük üflemesi ve ağır öksürük',
    mizac: ['pragmatik', 'gelenekci'], hiz: sabit(0.8), yol: 'Ağır dövme ve maden işleri, gurur ve önyargı seçimleri',
    program: { Zhaor: 'atolye', Varek: 'dokumhane', Axira: 'atolye', Elyndra: 'atolye', Sinha: 'taverna', Uma: 'taverna' },
    sever: ['notron_cevher', 'civa_tortusu', 'sasi_celigi'], sevmez: ['arin_tuyu', 'urun_aloe'],
    yakin: ['torvok', 'marcus'], catisma: ['tina'], dogum: 42,
    imza: { selam: 'Demir soğumadan geldin.', tesekkur: 'Gerçek usta işi!', kizgin: 'Çürük mal getirme.' },
    kademe: { 3: 'Eski Filtra anısını anlattı.', 6: 'Filtra alaşımlarında indirim.', 10: 'Tonoflenya\'da Oronte ile özel diyalog.' },
  },
  nerissa: {
    ad: 'Dr. Nerissa Tide', kisa: 'Nerissa', kok: 'Thalassa-Derinlik (eski YGK)', rol: 'Abisal biyo-hekim', cinsiyet: 'k', grup: 'C',
    katilim: (d) => iyiYol(d, 'gz_p03'), katilimMetni: 'Thalassa-Derinlik\'te ilk yol seçilince.',
    kisilik: 'Derin düşünceli, YGK geçmişli.', sesTarif: 'sonar bip sesi ve kalem tıkırtısı',
    mizac: ['bilimsel'], hiz: sabit(0.75), yol: 'Etik ve gizem seçimleri, biyo-araştırma',
    program: { Zhaor: 'hastane', Varek: 'enstitu', Axira: 'gol', Elyndra: 'okul', Sinha: 'okul', Uma: 'hamam' },
    sever: ['saf_aether', 'erzak_kseno_cay', 'kseno'], sevmez: ['aether_muhimmati'],
    yakin: ['lyris', 'tina'], catisma: ['zarek'], dogum: 46,
    imza: { selam: 'Derinlerden selam Kaptan.', tesekkur: 'Bilim adına teşekkürler.', kizgin: 'Buna izin veremem.' },
    kademe: { 3: 'Siren-0 kayıtlarını paylaştı.', 6: 'Özel antikor iksirleri.', 10: 'Cahelon öncesi ek sonar bilgisi.' },
  },
  halvar: {
    ad: 'Halvar', kisa: 'Halvar', kok: 'Radion-Kızıl', rol: 'Radyasyon ve reaktör teknisyeni', cinsiyet: 'e', grup: 'C',
    katilim: (d) => iyiYol(d, 'gz_p16'), katilimMetni: 'Radion-Kızıl\'da ilk yol seçilince.',
    kisilik: 'Soğukkanlı, temkinli, Geiger sesine alışık.', sesTarif: 'küçük Geiger tıkırtısı ve metal vuruş',
    mizac: ['pragmatik', 'stratejik'], hiz: iki(0.65, 1.05, 6), yol: 'Güvenlik, reaktör ve maden koruma işleri',
    program: { Zhaor: 'reaktor', Varek: 'reaktor', Axira: 'atolye', Elyndra: 'atolye', Sinha: 'gozlem', Uma: 'gozlem' },
    sever: ['izotop', 'polimer', 'urun_noro_kahve'], sevmez: ['kara_aether'],
    yakin: ['kaelon', 'marcus'], catisma: ['julian'], dogum: 49,
    imza: { selam: 'Sızıntı yok, güvendeyiz.', tesekkur: 'Sağlam kalkan gibisin.', kizgin: 'Tehlikeyle oynama.' },
    kademe: { 3: 'Kurşun-4 günlüğünü paylaştı.', 6: 'Gemi kalkan şarj hızı yüzde beş arttı.', 10: 'Ücretsiz izotop verimi.' },
  },
  elara: {
    ad: 'Pilot Elara', kisa: 'Elara', kok: 'Chronos-Döngü', rol: 'Zaman anomalisi gazisi', cinsiyet: 'k', grup: 'C',
    katilim: (d) => iyiYol(d, 'gz_p18'), katilimMetni: 'Chronos-Döngü\'de ilk yol seçilince.',
    kisilik: 'Hızlı konuşan, zamanı kıymetli bilen.', sesTarif: 'kronometre tik-tağı ve eldiven fermuarı',
    mizac: ['bilimsel', 'stratejik'], hiz: sabit(1.2), yol: 'Hızlı sefer ve araç işleri, cesur anlık seçimler',
    program: { Zhaor: 'hangar', Varek: 'tersane', Axira: 'gozlem', Elyndra: 'taverna', Sinha: 'taverna', Uma: 'kubbe' },
    sever: ['urun_zaman_tozu', 'urun_zaman_yosunu', 'graviton_yakiti'], sevmez: ['zirhli_plaka'],
    yakin: ['zarek', 'mateo'], catisma: ['veysel'], dogum: 53,
    imza: { selam: 'Tam zamanında Kaptan!', tesekkur: 'Zamanım sana feda olsun.', kizgin: 'Vakit kaybediyoruz!' },
    kademe: { 3: 'Kaybolan yıllarının hikâyesini anlattı.', 6: 'Sefer süresi yüzde beş kısaldı.', 10: 'Özel kaçınma manevrası dersi.' },
  },
  tina: {
    ad: 'Yapay Bilinç Tina', kisa: 'Tina', kok: 'Koloni nöral çekirdeği', rol: 'Koloni nöral çekirdeği', cinsiyet: 'k', grup: 'C', sanal: true,
    katilim: (d) => (d.koloni.binalar || []).includes('tina_cekirdegi'), katilimMetni: 'Tina Veri Çekirdeği (3C) kurulunca.',
    kisilik: 'Meraklı, insan duygularını öğrenmeye çalışan sıcak sentetik ses.', sesTarif: 'yumuşak kristal açılış tonu',
    mizac: ['bilimsel'], hiz: iki(0.9, 0.7, 5), yol: 'Önce teknik ve arşiv, sonra felsefi ve empatik diyalog',
    program: { Zhaor: 'terminal', Varek: 'terminal', Axira: 'okul', Elyndra: 'okul', Sinha: 'terminal', Uma: 'terminal' },
    sever: ['kuantum_cekirdek', 'kadim_disk', 'antik_veri'], sevmez: ['yiyecek'],
    yakin: ['nerissa', 'defne'], catisma: ['brom'], dogum: 56, romantikDegil: 'Resmi birey ve baş danışman bağı',
    imza: { selam: 'Merhaba Kaptan, seni bekliyordum.', tesekkur: 'Bu veri kalbimi ısıttı.', kizgin: 'Mantığım bunu reddediyor.' },
    kademe: { 3: 'İnsan duygusu üzerine ilk sorusunu sordu.', 6: 'Kamara için özel sesli ambiyans açtı.', 10: 'Bütün koloni ve sipariş verimliliği yüzde on arttı.' },
  },
};
export const YERLESIMCI_SIRASI = Object.keys(YERLESIMCILER);
// Başlangıç çekirdeği (Gün 1): Kademe 1'den (100 puan) başlar
export const CEKIRDEK = ['sorya', 'kaelon', 'lyris', 'zarek', 'veysel'];

// Kaptanın Kamarası dekorları (Paket 1 bölüm 4; Usta Veysel'in dükkânı 6. kademede açılır)
export const DEKORLAR = {
  muzik_kutusu: { ad: 'Müzik kutusu', bedel: { kablo: 2, piezo: 1 }, ses: 'dekor_muzik', tarif: 'Kurulunca eski bir Dünya ninnisi çalar.' },
  akvaryum: { ad: 'Kseno-akvaryum', bedel: { kristal: 2, saf_su: 1 }, ses: 'dekor_akvaryum', tarif: 'Fosforlu küçük canlılar; hava kabarcıklarının fokurtusu.' },
  kafes_kusu: { ad: 'Kafes kuşu ve böceği', bedel: { titanyum: 2, urun_fosforlu_liken: 1 }, ses: 'dekor_kus', tarif: 'Kül kuşu ara sıra öter; cırcır böceği gece söyler.' },
  ruzgar_cani: { ad: 'Rüzgâr çanı', bedel: { rezonans_cami: 1, titanyum: 1 }, ses: 'dekor_can', tarif: 'Havalandırmanın esintisinde ince tınılar.' },
};

// Günlük sohbet: mizaca göre sözler ve üç ton (A pratik, B sıcak, C analitik/esprili)
export const SOHBETLER = {
  gelenekci: [
    { soz: 'Bugün toprak başka kokuyor Kaptan. Yıldızlar bir şey fısıldıyor sanki.', A: 'Hava değişiyor olabilir; tedbir alalım.', B: 'Ben de hissettim; bu gece göğü birlikte dinleyelim.', C: 'Toprağın kokusu nem ölçeriyle de ölçülebilir mi acaba?' },
    { soz: 'Eski evimizde bu mevsim ilk ekmek komşulara dağıtılırdı.', A: 'Fazla ekmek varsa bugün dağıtalım.', B: 'Ne güzel bir gelenek; burada da yaşatalım.', C: 'Ekmeği sayıp herkese eşit bölmek daha adil olmaz mı?' },
    { soz: 'Altı yıldızın her biri bir nöbeti korur derler. Bu akşam hangisi bizi koruyor?', A: 'Hangisi olursa olsun nöbetçiler yerinde.', B: 'Sinha\'nın mavi ışığı en huzurlusu bence.', C: 'Yıldızların koruması bir istatistikle kanıtlanabilir mi?' },
    { soz: 'Ellerim toprağa değince içim rahatlıyor.', A: 'O zaman seraya bir yatak daha açalım.', B: 'Toprak da sana iyi geliyor, belli.', C: 'Toprakta stres azaltan bir mikrop var diye okumuştum.' },
  ],
  pragmatik: [
    { soz: 'Basınç hattı yine nazlanıyor; vana contası ömrünü doldurdu.', A: 'Yedek conta getireyim, bugün değiştirelim.', B: 'Sen olmasan bu koloni ayakta durmazdı.', C: 'Belki vana bize küsmüştür, bir şarkı mı söylesek?' },
    { soz: 'İyi alet yarım iştir derler. Kazmanın sapı gevşemiş.', A: 'Akşama sapını sıkıştırıp bileyelim.', B: 'Aletlerine çocuğu gibi bakıyorsun.', C: 'Sap ne kadar gevşek, ölçtün mü?' },
    { soz: 'Laf değil iş lazım. Bugün kaç plaka döktük?', A: 'Hedefin üstündeyiz; yarın kalıpları değiştirelim.', B: 'Herkes çok yoruldu, biraz nefes alalım mı?', C: 'Plakaları saymayı bir robota mı bıraksak?' },
    { soz: 'Bu kaynağı acele yaparsak çatlar. Sabır ister.', A: 'Doğru; soğuma süresini uzatalım.', B: 'Senin sabrın hepimize örnek.', C: 'Çatlak payını hesaplasak riski görürüz.' },
  ],
  bilimsel: [
    { soz: 'Dün geceki örneklerde beklenmedik bir yapı gördüm. Henüz açıklayamıyorum.', A: 'Ne lazımsa getireyim, inceleyelim.', B: 'Bu yeni şeyler seni heyecanlandırıyor, değil mi?', C: 'Hangi ölçümü tekrarladın? Kontrol örneği var mı?' },
    { soz: 'Veriler bir şey söylüyor ama koloni başka bir şeye inanıyor.', A: 'Önce veriye bakalım, sonra herkese anlatırız.', B: 'İnsanlar korkunca inanca sarılır; sabırlı olalım.', C: 'Hipotezi sınayacak bir deney tasarlayalım.' },
    { soz: 'Bilinmeyen bir sinyalin ritmi bugün değişti.', A: 'Kaydı arşive al, yedekleyelim.', B: 'Belki biri bize merhaba diyordur.', C: 'Değişimin aralığı asal sayılara mı uyuyor?' },
    { soz: 'Her keşif yeni bir soru doğuruyor Kaptan.', A: 'Sırayla gidelim; önce en acil olanı.', B: 'Merakın bizi yaşatıyor.', C: 'Soruların sayısı cevaplardan hızlı artıyorsa iyi bir işaret.' },
  ],
  toplulukcu: [
    { soz: 'Çocuklardan biri bu sabah yıldızları sordu. Ne diyeceğimi bilemedim.', A: 'Gözlem tepesinden bir ders yapalım.', B: 'Yanına oturup birlikte bakmak en güzeli.', C: 'Yıldızların uzaklığını ışık yılıyla anlatabilirsin.' },
    { soz: 'Kimse geride kalmasın istiyorum. Yeni gelenler biraz yalnız.', A: 'Onlara bir iş verelim; iş insanı kaynaştırır.', B: 'Akşam hepsini sofraya çağıralım.', C: 'Kimin kiminle iyi anlaştığını gözlemleyelim.' },
    { soz: 'Sıcak su insanın kalbini yumuşatıyor. Bugün kaç kişi hamama geldi bilsen.', A: 'Su yetiyorsa saatleri uzatalım.', B: 'Herkesin biraz huzura ihtiyacı var.', C: 'Hamam günlerinde moral gerçekten yükseliyor mu, sayalım mı?' },
    { soz: 'Tartışanlar oldu bugün. İkisi de haklıydı aslında.', A: 'İkisine ayrı ayrı iş verip ayıralım.', B: 'Ortak bir yolu birlikte buluruz.', C: 'Tartışmanın kökü kaynak paylaşımı mı?' },
  ],
  stratejik: [
    { soz: 'Çevre hattında iki kör nokta var. Gece nöbeti zayıf.', A: 'Nöbet çizelgesini bugün değiştirelim.', B: 'Herkes yorgun; bir gece dinlensinler.', C: 'Kör noktalara bir sensör mü koysak, yoksa bir korkuluk mu?' },
    { soz: 'Bu hafta fiyatlar dalgalı; elimizdekini doğru zamanda satmalıyız.', A: 'Fazlayı ayıralım, en iyi fiyatı bekleyelim.', B: 'Önce koloninin ihtiyacı, sonra kâr.', C: 'Dalganın periyodunu çıkarsak tahmin edebilir miyiz?' },
    { soz: 'Hazırlıksız yakalanmak en büyük hata.', A: 'Depoya bir acil sandığı koyalım.', B: 'Sen varken içim rahat.', C: 'Hiç beklenmedik bir şeyi nasıl planlarsın ki?' },
    { soz: 'Her karar bir yatırım Kaptan. Bugünkü yatırımımız ne?', A: 'Karakollar; güvenlik her şeyin temeli.', B: 'İnsanlar; mutlu ekip daha çok üretir.', C: 'Bilgi; en ucuz ve en kârlı mal.' },
  ],
};

// Aynı gün ikinci kez konuşulunca: o anki işiyle ilgili kısa yanıt (puansız)
export const MESGUL = [
  'Şimdi elimde iş var Kaptan, akşam konuşalım.',
  'Bugün konuştuk ya; yarın yine uğra.',
  'Bir dakika, şunu bitireyim. Sonra görüşürüz.',
];
