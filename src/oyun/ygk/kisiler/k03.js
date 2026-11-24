// karakter-08 Kefius Arateon, karakter-09 Zephyra (belgeler/v6). İkisi de akademide zaten vardı (tonoflenya/kisiler.js
// k_kefius, tonoflenya/akademi.js ak_zephyra); roller ve mevcut kararlar korunur, bağ ağı bunların üstüne eklenir.
import { kisiEkle, puanEkle } from '../bag';
import { D, S, O, P } from '../yardim';

const zephyraKarar = (d) => !!(d.hikaye && d.hikaye.biten && d.hikaye.biten.ak_zephyra != null);
const serbest = (d) => !!d.bayrak.zephyraSerbest;

kisiEkle('kefius', {
  ad: 'Kefius Arateon', unvan: 'Kartografya ve Alt-Evren Kıdemli Arkanisti (Kat 4 ve Kat -5)', nokta: 'k_kefius', kat: 'ygk_4', sinif: 'B',
  hiz: [[0, 10, 0.85]],
  hizMetni: 'Ağır ve ölçülü: boş övgü ya da acelecilikle ilerlemez. Sorumluluk bilinciyle yanıt verdiğinde ve alt katların tehlikelerinden kaçmadığında sana yeni çağın Arkanisti gibi davranır.',
  kimlik: [
    'Kat 4\'ün en sessiz çalışma odasında, tavana kadar yükselen boyut haritaları, dönen yıldız küreleri ve kadim parşömenler arasında yaşar. Sesine uzun taş koridorlardan geliyormuş gibi kadim bir rezonans karışır.',
    'Yüzlerce yılın yorgunluğunu taşır; krallık kavgalarını, kredi oyunlarını ve casuslukları "fırtına koparken karıncaların kavgası" sayar. Tek gerçek endişesi akademinin en altındaki Dünya Çivisi\'ndeki boyut kırılmasının büyümesi.',
    'Akademinin en ağır usta büyülerinin öğretmeni: Hakikat Yankısı, renkli taşlarla heykel canlandırma ve ileri Öz Bağlama.',
  ],
  kademeler: [
    'Haritaların gölgesi: seni odasına izinsiz giren meraklı bir yabancı sayar; iki cümleden fazla konuşmaz.',
    'Eksik koordinat: iki dünya arasındaki boyut kaymasını ölçen bozuk haritayı onarmanı ister.',
    'Rezonansın bedeli: asanı inceler; bir oyuncak değil, sorumluluk olduğunu hatırlatır.',
    'Sessiz koruyucu: Sora-9\'u ve Corinne\'i Palmi\'nin gözünden nasıl koruduğuna tanık olursun.',
    'Arkanist sınavı: eski bir Arkanist mührünü çözmen için kapı açar; Hakikat Yankısı.',
    'Valen ile kırılan yemin: bir zamanlar Valen ile omuz omuza çalıştıklarını, Kat -4 tutsakları yüzünden yollarının ayrıldığını anlatır.',
    'Uyanan taş muhafız: kadim heykellerin birer boyut çapası olduğunu öğretir; heykel canlandırma.',
    'Kat -5\'in fısıltısı: Dünya Çivisi\'ndeki yarığın neden büyüdüğünü ve Malazar kristalleriyle bağını itiraf eder.',
    'Arkanist mührü: kişisel çalışma odasının ve alt kat arşivlerinin şifresini verir.',
    'Büyü ve denge rehberi: dış bölgelerdeki kadim mühürler hakkında her zaman bedelsiz yorum yapar.',
    'Halefin yemini: seni kendi dengi bir Kıdemli Arkanist olarak kabul eder; ileri Öz Bağlama.',
  ],
  kademeEtki: (d, k) => {
    // Mevcut final bağı: Kefius'un güveni (d.tf.guven.kefius) bağ kademesiyle de yükselir
    if (!d.tf) return;
    if (!d.tf.guven) d.tf.guven = {};
    d.tf.guven.kefius = Math.max(d.tf.guven.kefius || 0, k * 6);
  },
  sosyal: [
    ['Valen Lazeria', 'Eski silah ve bilim arkadaşı; Valen otoriteyi, Kefius hakikati seçti.', 'Zincir kararlarında Valen ile Kefius arasında seçim akademinin iç dengesini değiştirir.'],
    ['Palmi', 'Palmi\'nin Dünya Çivisi\'ni Kral\'a raporlamasını önlemek için haritaları şifreler.', ''],
    ['Corinne, Sora-9 ve Püskül', 'Katın koruyucusu; Corinne\'in aynalarını korur, Sora-9\'u saklar.', 'COR-03, COR-04 ve AKD-05\'te destekçi.'],
    ['Jolkar Tectus', 'Rün ustası Jolkar ile heykellerin ve Malazar çatlağının dilini çözerler.', 'KEF-03\'te ortak çalışırlar.'],
    ['Zephyra ve Morwenna', 'Hapsedilmelerine engel olamadığı için derin bir vicdan azabı taşır.', 'Kat -4 kapısını açmada gizli anahtar.'],
  ],
  sever: ['fosil', 'muhur_kutusu', 'sakin_cay'], sevmez: ['borek', 'rezonans_lambasi'],
  hediyeNot: 'Kadim taş kayıtları ve sessizliği ister; gürültülü ya da gösterişli hediyeleri samimiyetsiz bulur.',
  severSoz: '"Taşın hafızası... teşekkür ederim."', sevmezSoz: '"Gösteriş bilgeliği örter. Kaldır bunu."',
  gorevler: [
    { id: 'KEF-01', ad: 'İki gezegenin kayıp çizgisi', tur: 'bag', k: 1, puan: 30,
      durum: 'Boyut küresi iki dünya arasındaki köprü kurulduğundan beri titriyor.',
      hikaye: ['Kefius gözlerini küreden ayırmadan konuşuyor: "İki dünyayı birbirine bağladın Kaptan. Bakalım bu bağın nereye bastığını görebiliyor musun?" Pirinç küre düşük bir uğultuyla, düzensiz titriyor.'],
      cozum: 'Sessiz Yankı Taraması ile kırık noktayı bul; Devre Kıvılcımı ve Frekans Anahtarı ile iki dünyanın titreşimini eşitle.',
      bulmaca: { dugumler: [
        D('kure', 'Boyut küresi', -0.3, 'kristal', 'Küre düzensiz titriyor; bir yerinde boşluk var.', [['yanki_tarama']], 'Kırık nokta bulundu.'),
        D('titresim', 'İki dünyanın titreşimi', 0.4, 'elektrik', 'İki ton birbirine sürtünüyor.', [['devre', 'frekans_anahtari']], 'Titreşimler eşitlendi.', { on: ['kure'] }),
      ] },
      bitisMetni: 'Kefius ilk kez başını kaldırıp sana bakıyor; boyut haritalarının temel okumasını açtı.' },
    { id: 'KEF-02', ad: 'Arkanist\'in çift mührü', tur: 'hiyerarsi', k: 4, once: ['KEF-01'], puan: 20, ogren: 'hakikat_yankisi',
      durum: 'Kat 4 altındaki eski Arkanist sınav odası üç katmanlı bir ses ve ışık mührüyle kapalı.',
      hikaye: [
        'Kefius seni Kat 4\'ün altındaki eski bir sınav odasına indiriyor. Kapı yalnız gerçeği arayanların açabileceği üç katmanlı bir mühürle kapalı: görünmez yazıtlar, iki taş kol ve sahte bir frekans.',
        'Bu sınav boyunca Hakikat Yankısı\'nın ilk tınısı asanda; mührü yenersen büyü senin olur.',
      ],
      cozum: 'Lumina salımı ya da Yankı Taraması ile yazıtları oku; Yankı İkizi ile iki taş kolu birlikte çek; sahte frekansı Frekans Anahtarı ile ele.',
      bulmaca: { dugumler: [
        D('yazit', 'Görünmez yazıtlar', -0.5, 'fisilti', 'Taşta parmak ucuyla hissedilen ama okunamayan oyuklar.', [['lumina_salim'], ['yanki_tarama'], ['hakikat_yankisi']], 'Yazıtlar okundu.'),
        D('kollar', 'İki taş kol', 0, 'tas', 'Odanın iki ucunda aynı anda çekilmesi gereken kollar.', [['yanki_ikizi'], ['tele_kaldirma', 'hakikat_yankisi']], 'İki kol birlikte indi.', { on: ['yazit'] }),
        D('frekans', 'Sahte frekans', 0.5, 'elektrik', 'İki ton; biri yalan.', [['frekans_anahtari'], ['hakikat_yankisi']], 'Sahte ton söndü; mühür kırıldı.', { on: ['kollar'] }),
      ] },
      bitisMetni: 'Kat -5 derin arşiv kapısının ilk kilidi açıldı.',
      odul: { ogret: ['hakikat_yankisi'] } },
    { id: 'KEF-03', ad: 'Taşın içindeki uyuyan muhafız', tur: 'bag', k: 6, once: ['KEF-02'], puan: 20, ogren: 'heykel',
      durum: 'Kat -3\'te, Jolkar Tectus\'un yanında, göğsü boş yüzlerce yıllık küçük bir deneme heykeli.',
      hikaye: ['Kefius seni Jolkar\'ın yanına yönlendiriyor. Deneme heykelinin göğsünde iki taş yuvası. "Taşlar rastgele değil, doğa dengesiyle yerleşir," diyor Kefius. "Kızıl ısıyı, mavi serinliği tutar. Dengeyi sen kur."'],
      cozum: 'Bir kızıl ve bir mavi taşı yerleştir; Kıvılcım Dalgası ve Buzul Mühür ile ısı dengesini kurarak heykeli uyandır.',
      bulmaca: { dugumler: [
        D('heykel', 'Deneme taş heykeli', 0, 'tas', 'Göğsü boş bir taş heykel; iki yuva.', [['heykel', 'kivilcim', 'buzul']], 'Heykel uyandı ve taş kapıyı kaldırdı; altından yeşil bir taş çıktı.', { tas: { kizil: 1, mavi: 1 }, ipucu: 'Önce taşları heykele koy, sonra sıcak ve soğukla dengele. Taşın yoksa maden derinlerinde kızıl, kıyı kayalarında mavi düşer; derslikte ve Kefius\'tan yedek de bulunur.' }),
      ] },
      basla: (d) => {
        // Taşı olmayan oyuncu takılmasın: Kefius sınav için eksik taşı kendi kesesinden verir
        const t = d.buyu.taslar;
        if ((t.kizil || 0) < 1) t.kizil = 1;
        if ((t.mavi || 0) < 1) t.mavi = 1;
      },
      bitisMetni: 'Heykel canlandırma artık senin.',
      odul: { ogret: ['heykel'], tas: { yesil: 1 } } },
    { id: 'KEF-04', ad: 'Dünya Çivisi\'nin gölgesi', tur: 'zincir', k: 8, once: ['KEF-03'], puan: 0, ogren: 'oz_baglama',
      durum: 'Dünya Çivisi\'ndeki yarıktan sızan kara akım akademi temellerini sarsıyor; Valen yarığın tamamen kapatılmasını emretti.',
      hikaye: [
        'Kat -5\'te soğuk boyut yarığından kara bir akım sızıyor; taş temeller inliyor. Kefius tek başına yetmiyor ve senden Malazar ile Aethelis bilginle yanında durmanı istiyor.',
        'Tam o sırada Valen Lazeria\'nın emri geliyor: yarık beton ve kalkanla tamamen kapatılacak. Kefius kapatılırsa basıncın bütün şehri patlatacağını savunuyor.',
      ],
      cozum: 'Ağır Toprak Yarma ya da Sıvı Yönlendirme ile basınç kanalını aç; Öz Bağlama ile bir taşı Çivi sunağına mühürle.',
      bulmaca: { dugumler: [
        D('kanal', 'Basınç kanalı', -0.3, 'tas', 'Taşın içinden yükselen derin bir basınç.', [['toprak_yarma'], ['sivi'], ['tele_kaldirma', 'kivilcim']], 'Basınç kanalı açıldı.'),
        D('sunak', 'Çivi sunağı', 0.3, 'fisilti', 'Soğuk, yutan bir boşluk.', [['oz_baglama']], 'Taş sunağa mühürlendi; yarık dengede.', { on: ['kanal'] }),
      ] },
      secimSoru: 'Valen\'in emri mi, Kefius\'un dengesi mi?',
      secimler: [
        S('Kefius\'un yanında dur, yarığı büyüyle dengele', { kefius: 60, valen: -20 }, 'Kefius seni Kıdemli Arkanist halefi ilan etti; Valen seni tehlikeli bulup Konsey gözetimi koydu.', { odul: { tas: { mor: 1 } }, bayrak: ['kefiusHalef', 'valenGozetim'], yap: (d) => { d.bayrak.kefiusK10 = true; } }),
        S('Valen\'in kalkan emrini uygula', { valen: 30, g_ygk: 15 }, 'Başkent itibarın yükseldi; yarık tam rahatlamadı ve Kefius sana kırgın.', { kirgin: ['kefius'], bayrak: ['civiKalkan'] }),
      ],
      odul: { ogret: ['oz_baglama'] } },
  ],
  sohbetler: [
    { k: 3, ad: 'Gücün sınırı', soz: 'Kefius (haritaya eğilmiş): "Gençler büyü öğrenince duvarları yıkmayı, kilitleri kırmayı marifet sanıyor. Söyle bakalım Kaptan: bir kapıyı açtığında içeride neyin beklediğini bilmiyorsan, o kapıyı açmak cesaret midir, kibir mi?"',
      secenekler: [
        O('"Ardında tehlike varsa önce dinleyip tartarım; körü körüne saldırmam."', P.cokYuksek, 'Yavaşça başını sallıyor: "Arkanist gibi konuştun."'),
        O('"Açılmayan her kapı bir sır saklar; öğrenmek için risk alınır."', P.orta, '"Risk cesurların işidir ama bedelini çoğu zaman başkaları öder."'),
        O('"Gücün varsa kimse önünde duramaz, kapı da durmaz."', P.eksiDusuk, '"Bu cümleyi Varek kışlasında alkışlarlar, burada değil."'),
      ] },
  ],
  imza: { selam: 'Zaman ve boyut seni buraya getirdi.', tesekkur: 'Bilgeliğin yerini buldu.', kizgin: 'Haddini aşan güç, sahibini yıkar.' },
  ortam: 'Derin taş kemerlerin boş yankısı, kadim taş tabletlerin sürtünmesi, dönen pirinç kürenin uğultusu ve ağır sessizlik.',
});

kisiEkle('zephyra', {
  ad: 'Zephyra', unvan: 'Göğün Hiddeti, atmokinezi ustası (Kat -4; serbestse Kat 6 rüzgâr balkonu)', nokta: 'ak_zephyra', yer: ['ygk_6', 10, 18], yerKosul: serbest, kat: 'ygk_m4', sinif: 'B',
  hiz: [[0, 10, 1]], hizCarpani: (d) => (serbest(d) ? 1.25 : 1),
  hizMetni: 'Sert ve değişken: emredici ya da üstten konuşan yanıtlarda camı yumruklayıp susar; gökyüzü, özgürlük ve dürüst meydan okumayla hızla açılır. Hücreden serbest bıraktıysan bağ daha hızlı ilerler.',
  kimlik: [
    'Kurak topraklarda yağmur getiren bir varlık olarak saygı görmüş; gökyüzüne hükmedebildiği anlaşılınca karanlık örgütler ve YGK tarafından canlı bir atmosfer silahına dönüştürülmek için kaçırılıp Kat -4 kriyo hücresine kapatılmış kadim bir atmokinezi ustası.',
    'Dar cam hücrede kanatlarını açamadığı için tüyleri sürekli duvara sürtünür; nefesi hızlı ve kesik, hücre camı hep buğulu.',
    'Kapalı duvarlardan, kelepçelerden ve kurallardan nefret eder; acınmaktan tiksinir. Ona yaltaklanarak değil, nefesini açıp gökyüzünden söz ederek ulaşılır.',
  ],
  kademeler: [
    'Buğulu camın ardındaki hırıltı: yaklaşan herkese "YGK köpekleri!" diye tıslar.',
    'Nefes penceresi: tıkanan havalandırmayı açınca ilk kez derin bir nefes alır.',
    'Rüzgârın kokusu: dışarıda hangi mevsimin estiğini senden dinlemek ister.',
    'Atmosferin nabzı: ısı ve basıncı zorla değil kademeli çekmeyi öğretir.',
    'Valen ve Kefius hesabı: onu hücreye kimin koyduğunu ve Kefius\'un neden sustuğunu sorar.',
    'Kırılan ya da açılan kafes: hücre kararının ve ardından gelen ilk büyük yüzleşmenin kademesi.',
    'Kanatların öğretisi: uçmanın rüzgâra güvenmek olduğunu öğretir.',
    'Komşu hücredeki fısıltı: Morwenna ile yıllarca duvarların içinden nasıl konuştuklarını anlatır.',
    'Fırtınanın sözü: seni rüzgârı taşıyan tek dostu olarak kabul eder.',
    'Gökyüzü ihbarı: Zeris, Arin ve Malazar\'da yaklaşan fırtınaları önceden haber verir.',
    'Özgür göklerin efendisi: Morwenna ile ortak Aether Adımı sırrını tamamlar.',
  ],
  kademeEtki: (d, k) => { if (k >= 9) d.bayrak.zephyraIhbar = true; },
  sosyal: [
    ['Morwenna', 'Yıllarca yan yana hücrelerde birbirlerinin aklını korumuşlar; iki yaralı ama tehlikeli müttefik.', 'ZEP-04\'te güçleri birleşir.'],
    ['Kefius Arateon', 'Kefius vicdan azabı taşır; Zephyra ona hâlâ kızgın.', 'Arabuluculuk ikisiyle de derin hikâye açar.'],
    ['Valen Lazeria', 'Onu Kat -4\'te tutan otorite; bir numaralı düşmanı.', 'Serbest bırakırsan Valen ile gerilim doğar.'],
    ['Mirelza', 'İkisi de rüzgâr ve ses sürgünü; serbest kalırsa Zeris rüzgârlarını Mirelza\'ya selam olarak gönderir.', ''],
  ],
  sever: ['kristal_can', 'urun_isik_otu', 'huzur_tutsusu'], sevmez: ['demir_cevheri', 'komur'],
  hediyeNot: 'Rüzgârda ses çıkaran çanları ve hafif otları sever; ağır, boğucu madenleri hücre havasını kirlettiği için reddeder.',
  severSoz: '"Bir çan... rüzgârı duyabiliyorum."', sevmezSoz: '"Bu ağır pas kokusu nefesimi kesiyor. Götür!"',
  gorevler: [
    { id: 'ZEP-01', ad: 'Tıkanan soğutma borusu', tur: 'bag', k: 1, puan: 30,
      durum: 'Kat -4\'teki soğutma havuzlarından biri köpürüp Zephyra\'nın taze hava kanalını tıkadı.',
      hikaye: ['Hücrenin önünde kanatların cama çarpma sesi, boğuk ve hızlı bir nefes. Yandaki manyetik soğutma havuzu köpürüp taşmış; havalandırma ağzı köpükle dolu.'],
      cozum: 'Buzul Mühür ile köpüren havuzu dondur ya da Tele-Kaldırma ve Devre Kıvılcımı ile acil hava kapağını aç.',
      bulmaca: { dugumler: [
        D('havuz', 'Köpüren soğutma havuzu', 0, 'su', 'Köpük havalandırmaya doluyor.', [['buzul'], ['tele_kaldirma', 'devre'], ['hava_ayaz']], 'Hava kanalı açıldı; taze hava hücreye doldu.'),
      ] },
      bitisMetni: 'Zephyra derin bir nefes alıp başını cama yaslıyor: "Bana nefes verdin... adını unutmayacağım."' },
    { id: 'ZEP-02', ad: 'Sıcaklığı çekme sınavı', tur: 'bag', k: 3, once: ['ZEP-01'], puan: 25, ogren: 'hava',
      durum: 'Enerji çekirdeğinin aşırı ısınan yan odasında atmosferi adım adım eğmen gerekiyor.',
      hikaye: ['Oda kızgın bir güneş gibi. Zephyra camın ardından fısıldıyor: "Kaba güç değil. Bir adım soğut, dinle. Bir adım daha. Sis olana kadar. Sonra basıncı yükselt, bulutu ağırlaştır ve şu paratonere yıldırımı indir."'],
      cozum: 'Üç kademeli soğutmayla odayı Yoğun Sis\'e çek; sonra Şiddetli Yağmur\'a ısıtıp test paratonerine Yıldırım Düşür.',
      bulmaca: { hava: 1, dugumler: [
        D('oda', 'Aşırı ısınan oda', -0.3, 'lav', 'Hava kavruluyor: Sıcak Güneş.', [['hava_sis']], 'Oda Yoğun Sis\'e çekildi.', { ipucu: 'Havayı adım adım soğut: Sıcak Güneş, Normal, Serin, Yoğun Sis.' }),
        D('paratoner', 'Test paratoneri', 0.4, 'elektrik', 'Bakır bir uç; boşta bekliyor.', [['yildirim_dusur']], 'Yıldırım paratonere indi; oda titredi.', { on: ['oda'], ipucu: 'Yıldırım için havayı Şiddetli Yağmur\'a kadar ısıt, sonra yıldırımı düşür.' }),
      ] },
      bitisMetni: 'Kademeli hava kontrolü ve yıldırım düşürme artık senin.',
      odul: { ogret: ['hava'] } },
    { id: 'ZEP-03', ad: 'Rüzgârla dans', tur: 'zincir', k: 5, once: ['ZEP-02'], puan: 20, ogren: 'ruzgar_ucusu', kosul: zephyraKarar, kosulMetni: 'önce Zephyra\'nın hücresi için karar ver (Göğün Hiddeti)',
      durum: 'Üç yüksek rüzgâr halkasından düşmeden geçmelisin.',
      hikaye: [(d) => (serbest(d)
        ? 'Kat 6\'nın dış rüzgâr kulesinin tepesinde, fırtınanın ortasında Zephyra kanatlarını açmış seni bekliyor: "Yere bakma. Rüzgâra bak."'
        : 'Kat -4\'teki dev dikey soğutma şaftının başındasın; Zephyra camın ardından seni yönlendiriyor: "Akımı hisset. Düşme korkusu rüzgârı keser."')],
      cozum: 'Hafif Süzülme ile fırtına akımını yakalayıp üç rüzgâr halkasından geç.',
      bulmaca: { dugumler: [
        D('h1', 'Birinci rüzgâr halkası', -0.5, 'ruzgar', 'Alçak, düzenli bir akım.', [['suzulme'], ['ruzgar_ucusu']], 'Birinci halkadan geçtin.'),
        D('h2', 'İkinci rüzgâr halkası', 0, 'ruzgar', 'Dönerek yükselen bir akım.', [['suzulme', 'hava_ruzgar'], ['ruzgar_ucusu']], 'İkinci halkadan geçtin.', { on: ['h1'] }),
        D('h3', 'Üçüncü rüzgâr halkası', 0.5, 'ruzgar', 'Fırtınanın gözü; çok yüksekte.', [['ruzgar_ucusu'], ['suzulme', 'agirlik_sifir']], 'Üçüncü halkadan geçtin; rüzgâr seni taşıdı.', { on: ['h2'], pencere: 20 }),
      ] },
      secimler: [
        S('Rüzgâra teşekkür et', { zephyra: 20, tixie: 5 }, (d) => (serbest(d) ? 'Valen seni sorguya çekti ama Mirelza ve Tixie hayran kaldı.' : 'Zephyra camın ardında ilk kez güldü.')),
      ],
      odul: { ogret: ['ruzgar_ucusu'] } },
    { id: 'ZEP-04', ad: 'İki hücrenin zaman yankısı', tur: 'final', k: 8, once: ['ZEP-03'], puan: 60, ogren: 'aether_adimi',
      durum: 'Kat -4\'ün duvarlarına sıkışmış eski bir stasis kilidi hâlâ Morwenna\'nın bilincini yaralıyor.',
      hikaye: ['Zephyra iki hücrenin arasındaki duvara avucunu dayıyor; öbür yanda Morwenna\'nın fısıltısı aynı anda başlıyor. İki eski tutsak ve senin asan ilk kez birlikte çalışıyor.'],
      cozum: 'Yankı İkizi ile iki hücre kilidini eşitle; Zihin Arındırma ve Beyaz Lumina salımıyla stasis izini temizle.',
      bulmaca: { dugumler: [
        D('kilit', 'İki hücre kilidi', -0.3, 'buz', 'Biri soğuk, biri titrek; aynı anda çözülmeli.', [['yanki_ikizi'], ['heykel']], 'İki kilit birlikte çözüldü.', { tas: { mavi: 1 } }),
        D('iz', 'Stasis izi', 0.4, 'fisilti', 'Morwenna\'nın bilincinde kalmış donuk bir yankı.', [['zihin_arindirma', 'lumina_salim'], ['zihin_arindirma', 'hakikat_yankisi']], 'Stasis izi temizlendi.', { on: ['kilit'] }),
      ] },
      bitisMetni: 'Aether Adımı artık senin. Zephyra Tonoflenya dış saha fırtına bulmacalarında kalıcı rüzgâr desteği veriyor.',
      odul: { ogret: ['aether_adimi'], tas: { yesil: 1 } }, yap: (d) => { d.bayrak.zephyraK10 = true; d.bayrak.zephyraRuzgar = true; puanEkle(d, 'morwenna', 20); } },
  ],
  sohbetler: [
    { k: 2, ad: 'Gökyüzü hâlâ orada mı?', soz: 'Zephyra (alnını cama dayamış): "Söyle bana dış dünyalı: bugün yukarıda rüzgâr ne yönden esiyor? Toprak kokusu var mı, yoksa buradaki gibi sadece soğuk metal ve korku mu?"',
      secenekler: [
        O('"Sert bir kuzey rüzgârı var; yağmur yaklaşıyor, toprak kokuyor."', P.cokYuksek, 'Gözlerini kapatıp gülümsüyor: "Yağmur... bir gün o bulutları yine ellerimle tutacağım."'),
        O('"Dışarısı da tehlikeli; bazen duvarların içi daha güvenli."', P.eksiDusuk, 'Kanadı cama çarpıyor: "Güvenlik dediğin mezardır! Bir daha bana kafesi övme!"'),
        O('"Bilmem, yukarıda göğe pek bakmadım."', P.dusuk, '"Gözleri olan ama göğe bakmayan biri... ne yazık."'),
      ] },
  ],
  imza: { selam: 'Duvarların ardından bile rüzgârı duyarım.', tesekkur: 'Gökyüzü seninle esiyor.', kizgin: 'Fırtınayı kafese koyamazsın!' },
  ortam: 'Hücre kapısından sızan keskin rüzgâr ıslığı, asılı kristal çanların titremesi ve uzaktan gelen fırtına uğultusu.',
});
