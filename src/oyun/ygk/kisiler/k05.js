// karakter-12 Morwenna, karakter-13 Kat 3 hocaları Forges, Korvinus Vael, Zeva Thorne (belgeler/v6). Hepsi akademide zaten
// vardı (ak_morwenna kararı, ak_forges/ak_korvinus/ak_zeva kürsü testleri); bunlar korunur, bağ ağı üstlerine eklenir.
import { kisiEkle, puanEkle } from '../bag';
import { D, S, O, P } from '../yardim';

const morKarar = (d) => (d.hikaye && d.hikaye.biten ? d.hikaye.biten.ak_morwenna : null);
const kademeler = (l) => l;

kisiEkle('morwenna', {
  ad: 'Morwenna', unvan: 'Karanlık Ses Bükücü, eski Tyzrakhel rahibesi adayı (Kat -4; serbestse alt dehlizler)', nokta: 'ak_morwenna', yer: ['ygk_m3', 10, 10], yerKosul: (d) => morKarar(d) === 0, kat: 'ygk_m4', sinif: 'B',
  hiz: [[0, 10, 0.8]],
  hizCarpani: (d) => {
    const k = morKarar(d);
    if (k === 0) return 1.25;
    if (k === 2 && !(d.ygk && d.ygk.k.morwenna && d.ygk.k.morwenna.gorev['MOR-01'] === 'bitti')) return 0.5;
    return 1;
  },
  hizMetni: 'Yavaş ve tekinsiz: korku ya da sahte ahlak dersi puan düşürür; soğukkanlılık, dürüstlük ve zihinsel güçle ilerler. Serbest bıraktıysan hızlı; yalnız verisini aldıysan ilk yüzleşmeye kadar çok yavaş.',
  kimlik: [
    'Bir zamanlar Lord Sharon\'un beş sesinden birini öğrenmeye aday olan eski bir Tyzrakhel rahibesi adayı; tehlikeli bulunup Kat -4\'teki sessiz bir kriyo tüpüne kapatılmış.',
    'Konuşurken sesi hiç tek bir noktadan gelmez: hücre duvarlarının içinden bir sağdan, bir soldan, bazen arkadan kayan bir fısıltı.',
    'Karanlıkla barışmış bir kadın. Korkularını ve zihnindeki çatlakları sesindeki tek bir titreşimden okur; ikiyüzlü nezaketten nefret eder, kendi karanlığından korkmadan dürüstçe duranı uyanık zihin sayar.',
  ],
  kademeler: [
    'Duvarların içindeki fısıltı: her yerden gelen sesiyle niyetini ölçer.',
    'Sahte sesin testi: iki hoparlörden hangisinin gerçek, hangisinin illüzyon olduğunu bulmanı ister.',
    'Tyzrakhel ilahisi: Sharon\'un beş sesini ve ışığın neden bazen zayıf kaldığını anlatır.',
    'Zihin gölgesi: kendi geçmişindeki korkuları yoklar; dürüst yanıt bekler.',
    'Komşu duvar: yan tüpteki Zephyra ile yalnız duvar titreşimleriyle nasıl konuştuklarını paylaşır.',
    'Kırılma anı: hücre kararının ardından aranızdaki yeni gerçeklik.',
    'Karanlık mühür okuma: Lumina\'nın bile gösteremediği gölge yazıtları sesle okumayı öğretir.',
    'Çatlağın dili: Malazar Çatlağı\'ndan gelen fısıltıların bir çağrı olduğunu söyler.',
    'Karanlıkta denk zihin: sesini saklamayı bırakır, doğrudan karşından konuşur.',
    'Parazit koruması: karanlık harabelerdeki zihin ve illüzyon tuzaklarına karşı önceden uyarır.',
    'Beşinci sesin ötesi: Sharon\'un gölgesi değil, kendi sesinin sahibi olur.',
  ],
  kademeEtki: (d, k) => { if (k >= 9) d.bayrak.morwennaUyari = true; },
  sosyal: [
    ['Zephyra', 'Biri göğün fırtınası, öteki yeraltının fısıltısı; iki tutsak birbirini ayakta tutmuş.', 'ZEP-04 ve MOR-04\'te güçleri birleşir.'],
    ['Caelum Nokturnus ve Nox', 'Caelum astral geçitten, Nox uykusuz gecelerden onun fısıltılarını duyar; Nox ondan ödü kopar.', ''],
    ['Kefius Arateon', 'Onun Dünya Çivisi\'ne inmesini tehlikeli bulur ama bilgisini küçümsemez.', ''],
    ['Sinha Mar-Zul', 'Kör akustik dehası Sinha, Morwenna\'nın duvar seslerini bir nota gibi çözer.', ''],
  ],
  sever: ['urun_fosforlu_liken', 'sise_lumina', 'fosil'], sevmez: ['borek', 'kavrulmus_kahve'],
  hediyeNot: 'Karanlıkta parlayan likenler ve saf ışık şişeleriyle ilgilenir; sıradan yiyeceklere ilgisi yok.',
  severSoz: '"Karanlıkta yanan bir şey... ilginç."', sevmezSoz: '"Midenin sesini dinlemiyorum, Kaptan."',
  gorevler: [
    { id: 'MOR-01', ad: 'Sağdaki ve soldaki yalan', tur: 'bag', k: 0, puan: 30,
      durum: 'Morwenna sesini dört duvardan birden yankılatıyor; sahte alarm kilitlendi, çıkış kapısı açılmıyor.',
      hikaye: ['Sesi dört duvardan birden geliyor: "Hangisi benim, Kaptan? Kapı ancak gerçeği bulana açılır." Odadaki sahte alarm ritmik bir tıkırtıyla kilidi tutuyor.'],
      cozum: 'Sessiz Yankı Taraması ile gerçek ses kaynağını bul ya da Ses ve Yankı Düğümü ile sahte yankıyı tersine çevir.',
      bulmaca: { dugumler: [
        D('sesler', 'Dört duvardaki ses', 0, 'fisilti', 'Dört yönden gelen aynı fısıltı.', [['yanki_tarama'], ['yanki_dugumu'], ['hakikat_yankisi']], 'Gerçek ses tüpün içinden; sahte yankılar söndü, kapı açıldı.'),
      ] },
      bitisMetni: 'Morwenna yumuşakça gülüyor: "Kulakların korkaklarınki gibi titremiyor Kaptan."' },
    { id: 'MOR-02', ad: 'Gölge yazıtlı taş', tur: 'bag', k: 6, once: ['MOR-01'], puan: 20,
      durum: 'Kat -3 ile -4 arasındaki eski bir rahibe taşı Lumina ışığını bile yutuyor.',
      hikaye: ['Taş elinin altında buz gibi ve ölü. Morwenna fısıldıyor: "Işık burada işe yaramaz. Soğuk, sessizlik ve hakikat."'],
      cozum: 'Buzul Mühür ile taşı soğut, Zihin Arındırma ile paraziti kes, Hakikat Yankısı ile mührü çöz.',
      bulmaca: { dugumler: [
        D('tas', 'Rahibe taşı', 0, 'tas', 'Işığı yutan taş.', [['buzul', 'zihin_arindirma', 'hakikat_yankisi'], ['buzul', 'zihin_arindirma', 'yanki_tarama']], 'Gölge yazıt sesle okunabilir hâle geldi.', { sirali: true }),
      ] },
      bitisMetni: 'Karanlık bulmaca odalarında Morwenna\'dan sesli yön ipuçları.',
      odul: { tas: { mor: 1 } }, yap: (d) => { d.bayrak.morwennaIpucu = true; } },
    { id: 'MOR-03', ad: 'Malazar Çatlağı\'ndan gelen çağrı', tur: 'zincir', k: 7, once: ['MOR-02'], puan: 0,
      durum: 'Kat -3 uğultusunun kaynağında eski bir Karanlık Muhafız Heykeli; Morwenna uyandırılmasını, Kefius ve Valen mühürlü kalmasını istiyor.',
      hikaye: ['Nox\'un ve Jolkar\'ın duyduğu uğultu taşın içinden geliyor. Heykelin göğsünde iki yuva: biri mor, biri mavi ışığı bekliyor.'],
      cozum: 'Bir mor ve bir mavi taşı takıp heykeli geçici uyandır; Zihin Arındırma ve Yankı İkizi ile içindeki karanlık kaydı çıkar.',
      bulmaca: { dugumler: [
        D('heykel', 'Karanlık Muhafız Heykeli', -0.3, 'tas', 'Taş bir muhafız; göğsünde iki yuva.', [['heykel']], 'Heykel bir anlığına gözlerini açtı.', { tas: { mor: 1, mavi: 1 }, ipucu: 'Heykel canlandırmayı Kefius öğretir; taşlar takılır, bitince geri gelir.', yedek: { odak: 40, bedel: {}, metin: 'Kefius\'un çizdiği eski bir rün haritasıyla heykelin kaydına taş takmadan, uzun yoldan ulaştın.' } }),
        D('kayit', 'Karanlık kayıt', 0.4, 'fisilti', 'Heykelin içinde dönen bir fısıltı.', [['zihin_arindirma', 'yanki_ikizi'], ['zihin_arindirma', 'hakikat_yankisi']], 'Kayıt çıkarıldı.', { on: ['heykel'] }),
      ] },
      secimler: [
        S('Kaydı yalnız Morwenna\'ya ver', { morwenna: 45, kefius: -10 }, 'Gizli Tyzrakhel bilgisi açıldı; Kefius endişeli.', { bayrak: ['tyzrakhelSirri'] }),
        S('Kaydı Kefius ile paylaş', { morwenna: 15, kefius: 20 }, 'Morwenna hafif kırıldı: "Senin yolun senin seçimin."'),
      ] },
    { id: 'MOR-04', ad: 'Beşinci sesin ötesi', tur: 'final', k: 8, once: ['MOR-03'], puan: 60, ogren: 'aether_adimi',
      durum: 'Morwenna Sharon\'un gölgesinden artık korkmuyor.',
      hikaye: ['Morwenna, Zephyra ile birlikte hücre duvarlarının arasındaki zaman mührünü kırıp kendi gerçek sesini dünyaya duyurmak istiyor. Duvarın içinden ilk kez tek bir yönden, tam karşından konuşuyor.'],
      cozum: 'Yankı İkizi ile iki hücre arasındaki mührü eşitle; Aether Adımı ile zaman mührünü bük.',
      bulmaca: { dugumler: [
        D('muhur', 'Zaman mührü', 0, 'fisilti', 'Duvarın içinde donmuş bir an.', [['aether_adimi'], ['yanki_ikizi', 'zihin_arindirma']], 'Zaman mührü kırıldı; Morwenna\'nın kendi sesi duvarları doldurdu.'),
      ] },
      bitisMetni: 'Aether Adımı ustalığı ve Tonoflenya\'daki zihin ve gölge mühürlü bulmacalarda kalıcı kolaylık senin.',
      odul: { ogret: ['aether_adimi'], tas: { mor: 1 } }, yap: (d) => { d.bayrak.morwennaK10 = true; puanEkle(d, 'zephyra', 15); } },
  ],
  sohbetler: [
    { k: 3, ad: 'İçindeki karanlık', soz: 'Morwenna (sesi önce sol omzunun, sonra sağ kulağının arkasından): "Herkes ışığı övüyor Kaptan. Ama söyle bana: karanlıkta kimse bakmıyorken içinden geçen o ilk düşünce ne kadar aydınlıktı?"',
      secenekler: [
        O('"Benim de karanlık yanlarım var; ama onlara teslim olmamayı seçiyorum."', P.cokYuksek, 'Ses ilk kez tam önünde birleşiyor: "İşte yalan söylemeyen tek ses."'),
        O('"İçimde karanlık yok; hep doğru olanı yaparım."', P.eksiDusuk, 'Duvarlardan alaycı bir kahkaha kayıyor: "En tehlikeli yalancılar kendi yalanına inananlardır."'),
        O('"Felsefeye vaktim yok, işimize bakalım."', P.orta, '"Korkup kaçmak da bir cevaptır."'),
      ] },
  ],
  imza: { selam: 'Sesim duvarların her yerinden gelir...', tesekkur: 'Karanlığımdan korkmadın, ilginç.', kizgin: 'Kendi fısıltında boğulacaksın!' },
  ortam: 'Sağdan sola kayan boğuk fısıltı yankıları ve düşük frekanslı karanlık stasis vızıltısı.',
});

kisiEkle('forges', {
  ad: 'Forges', unvan: 'Mekanik ve Enerji Kürsüsü (Kat 3)', nokta: 'ak_forges', kat: 'ygk_3', sinif: 'A',
  hiz: [[0, 10, 1]],
  hizMetni: 'Görev ağırlıklı: sadelikten ve ter dökmekten yana; soylu laflardan ve casusluktan nefret eder. Atölyede elini taşın altına koyduğunda bar dolar.',
  kimlik: [
    'Kolları dirseklerine kadar kristal tozuyla kaplı, dev gibi iri, gür sesli bir örs ustası. Kat 3\'ün bir ucunda durmadan çekiç sallar; ozon ve sıcak metal kokusu onun evi.',
    'Ona göre büyü yalnız "çekicin yetişemediği yerde metali kıvama getiren bir körük". Palmi ve Sirilla\'nın atölyesine sızmasından nefret eder.',
  ],
  kademeler: kademeler([
    'Çırağın elini ölçer: "Çekiç tutamayan asa da tutmasın."',
    'İlk tezgâh: soğutma kanalını açınca omzuna vurur.',
    'Örsün başında: seni tezgâha çağırır, çırak gibi değil yardımcı gibi.',
    'Kalıpsız çelik: büyüyle metal kalıbı dökmeyi öğretir.',
    'Usta işi: döktüğün dişliyi atölyenin duvarına asar.',
    'Ocağın sırrı: Varek dökümhanelerinden gelme eski alaşım tarifini paylaşır.',
    'Denetim baskısı: Palmi\'nin çıraklarına karşı atölyesini korur.',
    'Kapalı kapı: atölyenin arka odasını sana açar.',
    'Ustanın güveni: kendi çekicini sana uzatır.',
    'Çırağın mezuniyeti: Dren\'in mezuniyetine seni tanık çağırır.',
    'Eski küskünlüğün sonu: Korvinus ile aynı masada çay içer.',
  ]),
  sosyal: [
    ['Korvinus Vael', 'Aynı katın zıt uçları: sıcak örs ile anti-büyü disiplini; yıllardır konuşmazlar.', 'K3-ORT-01\'de iki ustayı birleştirme şansı.'],
    ['Dren', 'Çırağı; iki usta arasında eziliyor.', 'AKD-03 ile kesişir.'],
    ['Palmi', 'Dövülen her silah onun masasından geçer.', ''],
    ['Zynae', 'Zarif kristallerini "süs taşı" sanır.', ''],
  ],
  sever: ['demir_cevheri', 'komur', 'tamir_kiti'], sevmez: ['urun_kristal_cicek', 'huzur_tutsusu'],
  hediyeNot: 'Demirci ocağına yakıt ve hammadde ister; kırılgan çiçek ya da tütsüyle alay eder.',
  severSoz: '"İşte örs bunu sever!"', sevmezSoz: '"Bunu örse koysam erir, kaptan. Gül müsün sen?"',
  gorevler: [
    { id: 'K3-FOR-01', ad: 'Çatlayan magitech tezgâhı', tur: 'bag', k: 0, puan: 35,
      durum: 'Ana örsün büyü soğutma kanalı tıkandı, kristal tozu alev aldı; Forges çıplak elle müdahale etmeye kalkıyor.',
      hikaye: ['Tezgâhın üstünde mavi-beyaz kıvılcımlar; kristal tozu cızırdayarak yanıyor. Forges kollarını sıvamış, eldivensiz.'],
      cozum: 'Buzul Mühür ya da hava soğutmasıyla tezgâhı soğut; Sıvı Yönlendirme ile soğutma sıvısını geri akıt.',
      bulmaca: { dugumler: [
        D('tezgah', 'Yanan tezgâh', -0.3, 'lav', 'Kristal tozu alev almış.', [['buzul'], ['hava_serin']], 'Tezgâh soğudu.'),
        D('kanal', 'Tıkalı soğutma kanalı', 0.4, 'su', 'Sıvı yolunu kaybetmiş.', [['sivi'], ['tele_kaldirma'], ['buzul', 'kivilcim']], 'Soğutma sıvısı geri aktı.', { on: ['tezgah'] }),
      ] },
      bitisMetni: 'Forges kahkaha atıp omzuna vuruyor.' },
    { id: 'K3-FOR-02', ad: 'Kalıpsız çelik', tur: 'hiyerarsi', k: 3, once: ['K3-FOR-01'], puan: 25, ogren: 'metal',
      durum: 'Çekiçle ulaşılamayacak kadar ince iç kıvrımlı eski bir kapı dişlisini tek seferde dökmen gerekiyor.',
      hikaye: ['Forges önüne çok ince iç kıvrımlı eski bir kapı dişlisinin parçalarını koyuyor: "Bunu çekiçle yapamam. Büyünle dök; doğru tonu yakalarsan metal sana uyar."'],
      cozum: 'Kıvılcım Dalgası ile metali erit, Metal Şekillendirme ile kalıba dök, Buzul Mühür ile sabitle.',
      bulmaca: { dugumler: [
        D('disli', 'Eski kapı dişlisi', 0, 'metal', 'Ham, soğuk metal.', [['kivilcim', 'metal', 'buzul']], 'Dişli tek seferde döküldü; iç kıvrımlar kusursuz.', { sirali: true }),
      ] },
      bitisMetni: 'Metal Şekillendirme artık senin.',
      odul: { ogret: ['metal'] } },
    { id: 'K3-ORT-01', ad: 'Kat 3\'ün ortak imzası', tur: 'final', k: 8, once: ['K3-FOR-02'], kosul: (d) => (d.ygk.k.korvinus || {}).k >= 6 && (d.ygk.k.zeva || {}).k >= 6, kosulMetni: 'Korvinus ve Zeva ile bağın en az kademe 6 olmalı',
      puan: 50,
      durum: 'Forges, Korvinus ve Zeva denge platformu için ortak bir Yıldız Pusulası yapmak istiyor; ama eski inatları tutuyor.',
      hikaye: ['Dren sayesinde yumuşayan iki usta ve Zeva aynı tezgâhın başında; her biri ötekinin işine burun kıvırıyor. Pusulanın üç aşaması var ve her biri ayrı bir ustanın.'],
      cozum: 'Metal Şekillendirme, Öz Bağlama ve Kervan Ağırlık Sıfırlama ile üç aşamayı birleştir.',
      bulmaca: { dugumler: [
        D('govde', 'Pusula gövdesi (Forges)', -0.5, 'metal', 'Ham pirinç.', [['metal'], ['kivilcim', 'tele_kaldirma']], 'Gövde döküldü.'),
        D('cekirdek', 'Pusula çekirdeği (Korvinus)', 0, 'kristal', 'Kalkanlı bir çekirdek.', [['oz_baglama'], ['frekans_anahtari', 'buzul']], 'Çekirdek bağlandı.', { on: ['govde'] }),
        D('denge', 'Denge çapası (Zeva)', 0.5, 'ruzgar', 'Ağırlık bir yana kayıyor.', [['agirlik_sifir'], ['tele_kaldirma', 'suzulme']], 'Pusula dengede.', { on: ['cekirdek'] }),
      ] },
      bitisMetni: 'Üç hoca yıllar sonra aynı masada çay içiyor. Kat 3 dövme ve denge işlerinde kalıcı ustalık senin.',
      odul: { tas: { kizil: 1, sari: 1 } }, yap: (d) => { puanEkle(d, 'korvinus', 50); puanEkle(d, 'zeva', 50); d.bayrak.kat3Ortak = true; } },
  ],
  imza: { selam: 'Örs sıcak, çekicini hazırla!', tesekkur: 'İşte usta işi!', kizgin: 'Çürük metalle gelme!' },
  ortam: 'Döküm ocağının harlı ateşi ve örse vuran çekiç sesleri.',
});

kisiEkle('korvinus', {
  ad: 'Korvinus Vael', unvan: 'Anti-Büyü Kürsüsü (Kat 3)', nokta: 'ak_korvinus', kat: 'ygk_3', sinif: 'B',
  hiz: [[0, 10, 0.9]],
  hizMetni: 'Seçimli ve disiplinli: aşırı güven puan düşürür. Dürüst hatayı düzelttiğinde gizlice arkanı kollar.',
  kimlik: [
    'Kat 3\'ün en sessiz köşesinde, bozuk rezonans kalkanlarının arasında oturan kuru, titiz, keskin dilli bir hoca. Cübbesinde tek bir toz lekesi yok.',
    'Büyünün en büyük tehlikesinin aşırı güven olduğuna inanır; her öğrencinin önce büyüsüz ya da kırık kalkanla hayatta kalmasını sınar. Forges\'in örsünü kaba, Zynae\'nin prizmasını gösteriş budalalığı bulur.',
  ],
  kademeler: kademeler([
    'Bozuk kalkan: seni kırık bir kalkanla sınar.',
    'İkinci deneme: hatanı yüzüne söyler ama çıkış yolunu da gösterir.',
    'Sahte mühürler: sahte büyü mühürlerini ayıklamanı ister.',
    'Ölçülü öğrenci: notlarında adını ilk kez yazar.',
    'Aşırı güven dersi: kendi gençliğindeki bir kalkan kazasını anlatır.',
    'Kalkan atölyesi: geliştirdiği sessiz rezonans kalkanını gösterir.',
    'Denetime karşı: Palmi\'nin çıraklarını atölyeden uzak tutar.',
    'Sessiz kollama: senin adına bir raporu geciktirir.',
    'Eski not: yasak yerine kontrollü öğretimi savunan eski bir notunu paylaşır.',
    'Güvenilir el: kalkanlarının bakımını sana bırakır.',
    'Ortak masa: Forges ile yıllar sonra aynı masada.',
  ]),
  sosyal: [
    ['Forges', 'Sıcak örs ile anti-büyü disiplini; yıllardır konuşmazlar.', ''],
    ['Palmi', 'Kraliyet Çırakları\'nın zihin okumasını engelleyen bir kalkan geliştirdi.', 'K3-KOR-01\'de denetçiden saklama ya da açık rapor.'],
    ['Zynae', 'Pembe prizmasını gösteriş budalalığı bulur.', ''],
  ],
  sever: ['gumus_tozu', 'muhur_kutusu', 'ekmek'], sevmez: ['bal', 'urun_fosforlu_liken'],
  hediyeNot: 'Ölçülü, geleneksel ve sade; tuhaf mağara otlarını ve çocuksu tatlıları sevmez.',
  severSoz: '"Ölçülü ve temiz bir seçim."', sevmezSoz: '"Bu çocuk işi. Ciddi ol."',
  gorevler: [
    { id: 'K3-KOR-01', ad: 'Kaçak anti-büyü kalkanı', tur: 'zincir', k: 3, puan: 0,
      durum: 'Korvinus\'un Kraliyet Çırakları\'nın zihin okumasını engelleyen sessiz kalkanının tek kristali bozuk; Palmi yarım saat içinde denetime geliyor.',
      hikaye: ['Korvinus\'un sesi ilk kez aceleci: "Yarım saat. Kalkan ya çalışacak ya da hiç var olmamış olacak."'],
      cozum: 'Frekans Anahtarı ve Devre Kıvılcımı ile kalkanı onar ya da Otonom Kalkan Aşırtma ile denetim cihazını kör et.',
      bulmaca: { dugumler: [
        D('kristal', 'Bozuk enerji kristali', 0, 'kristal', 'Kristal sönük ve çatlak tonlu.', [['frekans_anahtari', 'devre'], ['kalkan_asirtma']], 'Kalkan sessizce yeniden açıldı.', { pencere: 40 }),
      ] },
      secimler: [
        S('Kalkanı onar ve Palmi\'den sakla', { korvinus: 45, palmi: -5 }, 'Kat 3 hocaları seni korur; Palmi şüphesini not etti.', { odul: { tas: { mavi: 1 } } }),
        S('Projeyi Palmi\'ye açıkça rapor et', { palmi: 25, korvinus: -20 }, 'Palmi memnun; Korvinus\'un güvenini kaybettin.', { kirgin: ['korvinus'] }),
      ] },
    { id: 'K3-KOR-02', ad: 'Sahte mühürler', tur: 'bag', k: 5, once: ['K3-KOR-01'], puan: 25,
      durum: 'Korvinus masasına beş mühür diziyor; ikisi sahte.',
      hikaye: ['"Büyücüler kendi gördüklerine güvenir," diyor Korvinus. "Bu yüzden ölürler. Gördüğüne değil, duyduğuna güven."'],
      cozum: 'Hakikat Yankısı ya da Yankı Taraması ile sahte mühürleri ayıkla.',
      bulmaca: { dugumler: [
        D('muhurler', 'Beş mühür', 0, 'metal', 'Beşi de aynı görünüyor.', [['hakikat_yankisi'], ['yanki_tarama']], 'İki sahte mühür boş tınladı.'),
      ] },
      bitisMetni: 'Korvinus notlarına adını yazdı.' },
  ],
  sohbetler: [
    { k: 2, ad: 'Aşırı güven', soz: 'Korvinus: "Kalkanını açtın mı? Yoksa yine asana güvenip yürüdün mü?"',
      secenekler: [
        O('"Asaya değil, hazırlığıma güveniyorum."', P.yuksek, '"Ölçülü. Devam et."'),
        O('"Asa yeter, kalkana gerek yok."', P.eksiOrta, '"Kibirli büyücü uzun yaşamaz."'),
        O('"Henüz açmadım; açayım."', P.orta, '"Dürüst bir cevap; hayatta kalanların cevabı."'),
      ] },
  ],
  imza: { selam: 'Kalkanın açık mı, yoksa yine dikkatsiz misin?', tesekkur: 'Ölçülü ve temiz.', kizgin: 'Kibirli büyücü uzun yaşamaz.' },
  ortam: 'Bozuk kalkanların cızırtısı ve titiz, ağır adımlar.',
});

kisiEkle('zeva', {
  ad: 'Zeva Thorne', unvan: 'Kılavuz; Mekik ve Denge Kürsüsü (Kat 3)', nokta: 'ak_zeva', kat: 'ygk_3', sinif: 'A',
  hiz: [[0, 10, 1]],
  hizMetni: 'Görev ve refleks ağırlıklı: panik yapan pilotu sevmez; tek ölçüsü denge ve ağırlık merkezi.',
  kimlik: [
    'Kat 3\'teki manyetik denge platformunun başında duran, sesi ne yükselen ne titreyen, sakin ve kesin bir mekik pilotu eğitmeni.',
    'Panik yapan pilotun ölü pilot olduğunu bilir. Yükün dağılımını anlamadan uçmaya kalkanlara asla geçer not vermez.',
  ],
  kademeler: kademeler([
    'Denge platformu: yerçekimi testi.',
    'İlk adım: platformda düşmeden durursun.',
    'Yükün sesi: ağırlığın kaydığını sesten okumayı öğretir.',
    'Ağır yük: büyülü dengeyle taşımayı gösterir.',
    'Merkez: ağırlık sıfırlamayı öğretir.',
    'Kervan hesabı: Aethelis ve Zorah kervanlarının ağırlık hesaplarını birlikte yaparsınız.',
    'Yüklü mekik: seni gerçek bir mekik yüklemesine götürür.',
    'Pilot yemini: Akademi pilotlarının yeminini sana okur.',
    'Kılavuzun güveni: platformu sana bırakır.',
    'Eski kaza: kurtaramadığı tek yolcuyu kısa ve sarsıcı bir dürüstlükle anlatır.',
    'Tam merkezinde: seni kendi kılavuzu olarak anar.',
  ]),
  sosyal: [
    ['Forges ve Korvinus', 'İkisinin arasında sakin bir terazi.', 'K3-ORT-01.'],
    ['Zynae', 'Zynae\'nin denge kontrolünü takdir eder.', ''],
  ],
  sever: ['urun_vaha_hurmasi', 'tamir_kiti', 'rezonans_lambasi'], sevmez: ['demir_cevheri', 'muhur_kutusu'],
  hediyeNot: 'Kervan yollarından gelen pratik enerji yiyeceklerini ve fenerleri sever; ağır taş ve kâğıt yükünden nefret eder.',
  severSoz: '"Hafif ve işe yarar. Tam merkezinde."', sevmezSoz: '"Bu bir yük, hediye değil."',
  gorevler: [
    { id: 'K3-ZEV-01', ad: 'Sıfır denge platformu', tur: 'hiyerarsi', k: 3, puan: 25, ogren: 'agirlik_sifir',
      durum: 'Platformun bir yanında ağır bir gemi motoru, öbür yanında tüy ağırlığında bir kristal.',
      hikaye: ['Zeva seni dev manyetik denge platformuna çıkarıyor: "Ağırlığı yok edemezsin Kaptan; ama yönünü ve merkezini büyüyle bükebilirsin."'],
      cozum: 'Tele-Kaldırma ile ağırlığı kaldır, denge tonunda tam merkezi bulup Kervan Ağırlık Sıfırlama uygula.',
      bulmaca: { dugumler: [
        D('motor', 'Ağır gemi motoru', -0.4, 'metal', 'Platform motor yanına eğiliyor.', [['tele_kaldirma'], ['suzulme']], 'Motor bir parmak kalktı.'),
        D('merkez', 'Ağırlık merkezi', 0.3, 'ruzgar', 'Platform yalpalıyor.', [['agirlik_sifir']], 'Platform tam merkezinde durdu.', { on: ['motor'] }),
      ] },
      bitisMetni: 'Kervan Ağırlık Sıfırlama artık senin.',
      odul: { ogret: ['agirlik_sifir'], tas: { sari: 1 } } },
  ],
  sohbetler: [
    { k: 2, ad: 'Panik', soz: 'Zeva: "Mekik yalpalıyor, alarm çalıyor, yolcu bağırıyor. İlk ne yaparsın?"',
      secenekler: [
        O('"Nefes alırım, yükün nereye kaydığını dinlerim."', P.cokYuksek, '"Tam merkezinde."'),
        O('"Motoru tam güce veririm."', P.eksiDusuk, '"Ağırlığını bilmeyen düşer."'),
        O('"Yolcuyu susturur, sonra bakarım."', P.dusuk, '"Yolcu değil, yük önemli. Ama yakındın."'),
      ] },
  ],
  imza: { selam: 'Dengeyi bozma, adımını ölç.', tesekkur: 'Tam merkezinde.', kizgin: 'Ağırlığını bilmeyen düşer.' },
  ortam: 'Denge platformunun derin manyetik vınlaması ve kayış, kanca tıkırtıları.',
});
