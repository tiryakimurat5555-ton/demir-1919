// Paket 7: altı seçkin YGK gemi subayı (Elyndra Val-Tarek, Varek Kaelon, Dr. Axira Nerys, Zhaor Vel-Amin, Sinha Mar-Zul,
// Başçavuş Drahmir Oksid). Mevcut istasyonlar (tonoflenya/subay.js) ve odalardaki sohbetler aynen kalır; burada 0-10 bağ,
// kişisel görevler, hediyeler ve imza replikleri. Kadro gemiye katılınca (karakter.js seckinKadro) ana menüden "Seçkin
// subaylarla bağ". Büyü yalnız zanaat ocağında ve bulmacada; savaşta yok (Paket 7 SUB-02).
import { kisiEkle } from '../bag';
import { D, S, O } from '../yardim';
import * as BY from '../../buyu/buyu';
import { gucEkle } from '../../tonoflenya/kisiler';
import { puanEkle as yrPuan } from '../../yerlesim/yerlesim';

const kadroYok = (d) => !d.bayrak.seckinKadro;
// Kolonideki yerleşimcilere yansıyan bağ (Paket 7 SUB-03 Lyris ve Sorya, SUB-05 Julian)
function koloniBag(d, id, n) {
  try { yrPuan(d, id, n, true); } catch (e) { /* yerleşim yok */ }
}
const ORTAK = { sinif: 'B', subay: true, ulasilamaz: kadroYok, guc: 'ygk' };

kisiEkle('elyndra', {
  ...ORTAK, ad: 'Elyndra Val-Tarek', unvan: 'Rezonans Çekirdeği subayı',
  hiz: [[0, 10, 1]], hizMetni: 'Sınıf B: yüzde elli beş sohbet, yüzde kırk beş görev.',
  kimlik: [
    'Parlak ama bilimsel kibri yüksek bir enerji fizikçisi. Duygularını sayıların ve soğuk mantığın arkasına gizler.',
    'Yıllar önce YGK Kat -3\'teki gizli aether sızıntısında kendi hesap hatasının payı olduğunu sakladı. Gerçek bulunduğunda ilk kez savunmasız kalır.',
  ],
  kademeler: [
    'Saha kaptanı: seni yalnız gemi çekirdeğini kurcalayan biri sayıyor.',
    'Ölçüm: titreşim değerlerini sesli okuyor, yorum yapmıyor.',
    'Hata payı: senin hesap hatanı düzeltiyor, alay etmeden.',
    'Lumina ve Solis: rezonans analizlerini paylaşıyor.',
    'Kat -3: o geceden ilk kez üstü kapalı bahsediyor.',
    'Reaktörün başında: gece nöbetine seni çağırıyor.',
    'Kibrin çatlağı: SUB-01 yüzleşmesinden sonra bilimsel kibrini kırıyor.',
    'Özür: kendi hatasını yüksek sesle söylüyor.',
    'Ortak hesap: çekirdek hesaplarını seninle birlikte yapıyor.',
    'Çekirdek enerji sırrı: gemi çekirdeğinin gerçek formülünü açıyor.',
    'Malazar dalgaları: Malazar rezonans dalgalarını gemiden izlemene izin veriyor; Kat -3 itibarın onun sözüyle yükseliyor.',
  ],
  sosyal: [['Başçavuş Drahmir', 'Mühür ve çelik inatlaşması.', 'SUB-06 ikisini barıştırabilir.'], ['Nox', 'Kat -3\'ün gece stajyeri dolabın yerini bilir.', 'SUB-01\'de bağlantılı.']],
  sever: ['piezo', 'sise_lumina', 'kavrulmus_kahve'], sevmez: ['ekmek', 'huzur_tutsusu'],
  hediyeNot: 'Ölçülebilir, iletken ve uyarıcı şeyleri sever; dumanı sensörler için kirlilik sayar.',
  severSoz: '"Hmm... Kusursuz iletkenlik ve yüksek kafein. Belki de sandığım kadar dikkatsiz değilsin."', sevmezSoz: '"Duman optik sensörleri kirletiyor. Uzak tut onu."',
  gorevler: [
    { id: 'SUB-01', ad: 'Eksi üçüncü katın hayaleti', tur: 'zincir', k: 3, puan: 0, bolge: 'ygk',
      durum: 'Kat -3 Malazar Çatlağı\'ndaki terk edilmiş eski reaktör dolabında kilitli bir veri çekirdeği var.',
      hikaye: [
        'Elyndra: "Çekirdek titreşimi binde üç sapıyor ve sen hâlâ elindeki o ahşap-kristal çubuğa güveniyorsun. Veri olmadan varsayım yapmam."',
        'Sen: "O çubuk Kat -3\'teki eski reaktör dolabının kilidini açabilir. Orada ne sakladığını biliyorum." Elyndra bir an donuyor.',
      ],
      cozum: 'Kilidi zorlamadan Hakikat Yankısı ve Devre Kıvılcımı ile aç.',
      bulmaca: { dugumler: [D('dolap', 'Eski reaktör dolabı', 0, 'elektrik', 'Paslı kilit; içinde zayıf bir veri çekirdeği vızıltısı.', [['hakikat_yankisi', 'devre'], ['hibrit_cozucu']], 'Dolap açıldı; veri çekirdeği avucunda.')] },
      secimSoru: 'Çekirdekteki sızıntı raporunu okudun. Kime vereceksin?',
      secimler: [
        S('Elyndra\'ya geri ver', { elyndra: 40, nox: 10 }, 'Elyndra raporu uzun süre tutuyor: "O gece -3. Kat\'ta herkes rakamları suçladı. Kimse benim geç kaldığımı söylemedi." Sonra çok sessiz bir özür.'),
        S('Valen\'e teslim et', { valen: 15, elyndra: -15, g_ygk: 15 }, 'YGK itibarın arttı. Elyndra kırıldı; Başçavuş Drahmir ile ortak kilit (SUB-06 Denge Yolu) bu yarayı sarabilir.', { kosul: (d) => !d.bayrak.valenKapali, kirgin: ['elyndra'], bayrak: ['elyndraRapor'] }),
        S('Morvenna\'ya teslim et (Konsey vekili)', { morvenna: 15, elyndra: -15, g_ygk: 15 }, 'YGK itibarın arttı. Elyndra kırıldı; SUB-06 Denge Yolu bunu telafi edebilir.', { kosul: (d) => !!d.bayrak.valenKapali, kirgin: ['elyndra'], bayrak: ['elyndraRapor'] }),
      ] },
  ],
  sohbetler: [
    { k: 1, ad: 'Binde üç', soz: 'Elyndra: "Çekirdek titreşimi binde üç sapıyor. Sence neden?"',
      secenekler: [O('"Ölçelim; tahmin etmeyelim."', 20, '"Doğru yaklaşım."'), O('"Asam biraz fazla parladı galiba."', 10, '"En azından dürüstsün."'), O('"Önemsizdir."', -10, '"Hiçbir sapma önemsiz değildir."')] },
    { k: 5, ad: 'Hata payı', soz: 'Elyndra: "Duygular ölçülemez kaptan; ama hata payı her zaman hesaplanır. Senin en büyük hatan neydi?"',
      secenekler: [O('Dürüstçe anlat', 30, 'Uzun süre susuyor: "Benimki de... bir gün anlatırım."'), O('"Hata yapmam."', -5, '"Herkes yapar."')] },
  ],
  kademeEtki: (d, k) => { if (k === 10) { d.bayrak.elyndraCekirdek = true; gucEkle(d, 'ygk', 10); } },
  imza: { selam: 'Duygular ölçülemez kaptan; ama hata payı her zaman hesaplanır.', tesekkur: 'Asan benim reaktörümden daha gürültülü ama kabul edeyim... işe yarıyor.', kizgin: 'O gece -3. Kat\'ta herkes rakamları suçladı. Kimse benim geç kaldığımı söylemedi.' },
  ortam: 'Reaktör çekirdeğinin düşük frekanslı düzenli uğultusu, cam tüplerde ince sıvı akışı ve soğutma fanlarının metalik vızıltısı.',
});

kisiEkle('varek', {
  ...ORTAK, sinif: 'A', ad: 'Varek Kaelon', unvan: 'Taktik köprü subayı',
  hiz: [[0, 10, 1]], hizMetni: 'Sınıf A: yüzde yetmiş görev.',
  kimlik: ['Soğukkanlı, kısa cümleli eski filo taktik subayı; sivil kayıplardan ağır vicdan azabı duyar.', 'Büyünün kontrolsüz silaha dönüşmesinden nefret eder; ama teknolojinin yetmediği anlarda saha gerçekçiliğini kabul eder.'],
  kademeler: [
    'Brifing: yalnız görev konuşuyor.', 'Kısa onay: başıyla selam veriyor.', 'Harita: kırmızı sınırları açıklıyor.',
    'Eski arkadaş: SUB-02 ile akademi arkadaşının anısını paylaşıyor.', 'Kırık kalkan: arkadaşının nasıl öldüğünü anlatıyor.', 'Çelik onur: büyüyü yalnız ocakta kullanmana saygı duyuyor.',
    'Kriz analizi: Tonoflenya krizlerinde keskin değerlendirmeler.', 'Sivil kayıp: neden filo komutasını bıraktığını anlatıyor.', 'Güven: köprüyü sana bırakıyor.',
    'Yemin hazırlığı: onur yemininin sözlerini söylüyor.', 'Onur yemini: son kuşak kararlarında koşulsuz yanında.',
  ],
  sosyal: [['Başçavuş Drahmir', 'Kalkanı birlikte döverler.', 'SUB-02 Drahmir ve Forges gözetiminde.']],
  sever: ['dunya_cayi', 'tamir_kiti', 'demir_cevheri'], sevmez: ['urun_kristal_cicek', 'borek'],
  hediyeNot: 'Gösterişsiz, sağlam şeyleri sever.',
  severSoz: '"Teşekkürler kaptan. Gösterişsiz, sağlam. Tam sevdiğim gibi."', sevmezSoz: '"Taktik konsolunda süs eşyası tutmam. Yine de niyetini anladım."',
  gorevler: [
    { id: 'SUB-02', ad: 'Kırık kalkanın onuru', tur: 'bag', k: 2, puan: 30,
      durum: 'Varek, eski arkadaşının anısına büyüsüz saf çelik bir görev kalkanı dövülmesini istiyor.',
      hikaye: [
        'Varek: "Harita kırmızı. Sınırlar gergin. Buraya sadece rapor vermeye geldiysen kısa tut."',
        'Sen: "Eski arkadaşının kırık kalkanını yeniden dövmek istiyorum. Büyüyü silah olarak değil, yalnız çelik ocağında kullanacağım." Varek ilk kez başını kaldırıyor.',
        'Drahmir ve Forges ocağın başında gözetiyor.',
      ],
      cozum: 'Kıvılcım Dalgası ile ocağı ısıt, Metal Şekillendirme ile biçimlendir, Buzul Mühür ile su ver.',
      bulmaca: { dugumler: [
        D('ocak', 'Zanaat ocağı', -0.5, 'lav', 'Ocak soğuk.', [['kivilcim']], 'Ocak kızardı.'),
        D('kalip', 'Kalkanın biçimi', 0, 'metal', 'Çelik levha düz ve biçimsiz.', [['metal']], 'Kalkan kavisini aldı.', { on: ['ocak'] }),
        D('su', 'Su verme', 0.5, 'su', 'Kalkan kızgın.', [['buzul']], 'Çelik sertleşti.', { on: ['kalip'] }),
      ] },
      secimler: [S('Kalkanı köprüye teslim et', { varek: 30, drahmir: 10, forges: 10 }, 'Varek kalkanı köprü duvarına asıyor: "Çelik kırılır ama eğilmez. Onur da öyledir." Sana taktik günlüğünü açıyor.', { bayrak: ['varekGunluk'] })] },
  ],
  sohbetler: [
    { k: 1, ad: 'Rapor', soz: 'Varek: "Rapor ver. Kısa."',
      secenekler: [O('Kısa ve net rapor ver', 15, '"Anlaşıldı."'), O('Uzun uzun anlat', -5, '"Kısa dedim."')] },
    { k: 6, ad: 'Bedel', soz: 'Varek: "Savaşı başlatanlar haritaya bakar; bedelini ödeyenler çamura basar. Sen hangisisin?"',
      secenekler: [O('"Çamura basan."', 30, 'Uzun bir sessizlik, sonra bir baş selamı.'), O('"Haritaya bakan; birinin bakması lazım."', 15, '"Dürüst cevap."')] },
  ],
  kademeEtki: (d, k) => { if (k === 10) d.bayrak.varekYemin = true; },
  imza: { selam: 'Savaşı başlatanlar haritaya bakar; bedelini ödeyenler ise çamura basar.', tesekkur: 'Çelik kırılır ama eğilmez. Onur da öyledir.', kizgin: 'Büyüyle adam öldürmeyi reddettiğin sürece bu köprüde her zaman yerin var.' },
  ortam: 'Taktik radarın düzenli sonar bipi, harita konsolunun statik cızırtısı ve ağır zırhlı botların metal zemindeki adımları.',
});

kisiEkle('axira', {
  ...ORTAK, ad: 'Dr. Axira Nerys', unvan: 'Kseno-laboratuvar ve revir subayı',
  hiz: [[0, 10, 1]], hizMetni: 'Sınıf B: yarı sohbet yarı görev.',
  kimlik: ['Meraklı, şefkatli ama laboratuvar disiplininde tavizsiz bir kseno-biyolog.', 'Aethelis-IV ile Tonoflenya ekosistemlerini birleştirmeyi hayat amacı sayar.'],
  kademeler: [
    'Mikroskop: koşturuyor, seni fark etmiyor.', 'Steril oda: botlarını sildiriyor.', 'Numune: bir kültürü gösteriyor.',
    'İki gezegen: SUB-03 ile ilk canlı bağı kuruyor.', 'Filiz: fidan filizlenince ağlıyor.', 'Gece deneyi: ışık otuyla çalışıyor.',
    'Ortak reçete: Trellis-7 ve Sarah ile biyo-reçeteleri paylaşıyor.', 'Kayıp hasta: kurtaramadığı birini anlatıyor.', 'Toprağın hafızası: yeşil taşı anlatıyor.',
    'Umut: koloniye dönüşteki biyolojik umudu açıyor.', 'Yeşil taş sırrı: biyo-reçeteyi ve yeşil taşı sana veriyor.',
  ],
  sosyal: [['Sarah', 'Loran botanikçisiyle yazışır.', 'SUB-03 Sarah\'nın fidesiyle başlar.'], ['Dr. Lyris ve Sorya', 'Kolonideki hekim ve aşçı.', 'SUB-03 bitince koloniye yeni bir sohbet dalı açılır.']],
  sever: ['urun_isik_otu', 'urun_fosforlu_liken', 'sakin_cay'], sevmez: ['komur', 'sise_solis'],
  hediyeNot: 'Canlı kültürleri koruyan şeyleri sever; tozu ve oynak patlayıcıları laboratuvardan uzak tutar.',
  severSoz: '"Harika! Hem gece deneyleri için ışık hem de uykusuzluk için çay. Teşekkürler!"', sevmezSoz: '"Aman sakın! Kömür tozu kültürleri öldürür, Solis ise burada fazla oynak!"',
  gorevler: [
    { id: 'SUB-03', ad: 'İki dünyanın tohumu', tur: 'bag', k: 3, once: ['FIL-04'], puan: 30,
      durum: 'Loran Vadisi\'nden Sarah\'nın tuzlu suya dirençli fidesi Aethelis vaha toprağıyla birleşecek.',
      hikaye: ['Dr. Axira eldivenlerini çıkarıp gülümsüyor: "Yine tozlu botlarla steril odama girdin kaptan. Ama elinde yeni bir bitki örneği varsa affedebilirim."', 'Sen: "Loran Vadisi\'nden bir fide getirdim; Aethelis toprağıyla tutturmayı deneyelim."'],
      cozum: 'Kök çevresindeki suyu Sıvı Yönlendirme ile dengele, Canlı Sarmaşık ile fidanın damarlarını güçlendir.',
      bulmaca: { dugumler: [
        D('kok', 'Fidanın kökleri', -0.3, 'su', 'Kökler fazla tuzlu suda boğuluyor.', [['sivi']], 'Su dengelendi.'),
        D('damar', 'Fidanın damarları', 0.4, 'bitki', 'Damarlar zayıf, yapraklar sarkık.', [['sarmasik']], 'İlk filiz göründü.', { on: ['kok'] }),
      ] },
      secimler: [S('Filizi koloniye haber ver', { axira: 30, sarah: 15 }, 'Axira kolonideki Dr. Lyris ve Sorya\'ya yazıyor: yeni bir sohbet dalı açıldı.', { bayrak: ['ikiDunyaFidani'], yap: (d) => { koloniBag(d, 'lyris', 20); koloniBag(d, 'sorya', 20); } })] },
  ],
  sohbetler: [
    { k: 1, ad: 'Steril oda', soz: 'Axira: "Botların! Hayır, kapıda dur. Şu örtüyü giy."',
      secenekler: [O('Örtüyü giy, özür dile', 15, '"İşte böyle."'), O('"Biraz toz bir şey yapmaz."', -10, '"Kültürlerime söyle bunu."')] },
  ],
  kademeEtki: (d, k) => { if (k === 10) { BY.tasEkle(d, 'yesil', 1); d.bayrak.axiraRecete = true; } },
  imza: { selam: 'Bir tohum iki gezegeni birbirine bağlayabiliyorsa, biz neden başaramayalım?', tesekkur: 'Korkma, canlı olan her şey doğru dengeyi bulduğunda iyileşir.', kizgin: 'Yeşil taş sadece bir maden değil; toprağın hafızasıdır.' },
  ortam: 'Cam deney tüplerinde hafif kabarcıklar, steril hava filtresinin yumuşak uğultusu ve sera lambalarının ince vızıltısı.',
});

kisiEkle('zhaor', {
  ...ORTAK, ad: 'Zhaor Vel-Amin', unvan: 'Dümen ve harita subayı',
  hiz: [[0, 10, 1]], hizMetni: 'Sınıf B: yarı sohbet yarı görev.',
  kimlik: ['Gümüş Yıldız ekolünün son dümencisi; şiirsel, sabırlı, yıldız nöbetlerini bir müzik gibi okur.', 'Gözleri yıldız parlamalarından kısmen zayıfladı; haritaları dokunarak ve ışık kırılımıyla okur.'],
  kademeler: [
    'Mırıltı: yıldız saatlerini sayıyor.', 'Nöbet adı: şu an hangi yıldızların döndüğünü söylüyor.', 'Dokunarak okuma: haritanın kabartmasını parmaklarına veriyor.',
    'Kayıp harita: SUB-04 ile eski seyir haritasına kavuşuyor.', 'Gümüş nöbet: ekolünün dağılışını anlatıyor.', 'Gözler: gözlerinin nasıl zayıfladığını anlatıyor.',
    'Şişeleme saatleri: Flee Plee ve Gözlem Tepesi\'nde Lumina ve Solis saatlerini nokta atışı söylüyor.', 'Rota şarkısı: rotaları şarkıyla ezberletiyor.', 'Dümen: dümeni sana bırakıyor.',
    'Kayıp yıldız rotası: rotayı tamamlıyor.', 'Dümen şifresi: gemi dümenindeki gizli koordinatı paylaşıyor.',
  ],
  sosyal: [['Mirelza', 'Haritası Zeris balkonunda kaldı.', 'SUB-04 Mirelza\'nın kulesinde.'], ['Silahşör Zeno', 'Zeno yıldızla yol bulmayı ondan öğrendi.', '']],
  sever: ['urun_vaha_hurmasi', 'rezonans_lambasi', 'gumus_tozu'], sevmez: ['komur', 'kavrulmus_kahve'],
  hediyeNot: 'Sıcaklığı ve tadı hissedilen şeyleri sever; eli titreten kahveyi istemez.',
  severSoz: '"Ah, tatlı hurma ve sıcak bir ışık... Gözlerim seçmese de sıcaklığını hissediyorum."', sevmezSoz: '"Benim elim titrerse yıldız rotası kayar dostum; o kahve bana göre değil."',
  gorevler: [
    { id: 'SUB-04', ad: 'Kör dümencinin şarkısı', tur: 'bag', k: 3, puan: 30,
      durum: 'Zeris rüzgâr kulesinin yüksek balkonundaki sandıkta Zhaor\'un eski seyir haritası kalmış.',
      hikaye: ['Zhaor: "Şu an gökte Zhaor ve Sinha çifti dönüyor. Sen geldin geleli dümen hiç olmadığı kadar uyanık."', 'Sen: "Zeris Kulesi\'ndeki kayıp seyir haritanı geri almaya gidiyorum."'],
      cozum: 'Balkona Rüzgâr Uçuşu (ya da Canlı Sarmaşık) ile çık; solmuş yıldız mührünü Lumina salımıyla parlatıp sandığı aç.',
      bulmaca: { dugumler: [
        D('balkon', 'Yüksek balkon', -0.3, 'ruzgar', 'Rüzgâr uğulduyor; merdiven yok.', [['ruzgar_ucusu'], ['sarmasik'], ['aether_adimi']], 'Balkondasın.'),
        D('muhur', 'Solmuş yıldız mührü', 0.4, 'kristal', 'Sandığın mührü sönük.', [['lumina_salim']], 'Mühür parladı; sandık açıldı.', { on: ['balkon'] }),
      ] },
      secimler: [S('Haritayı dümen odasına getir', { zhaor: 30, mirelza: 10 }, 'Zhaor haritanın kabartmalarını parmaklarıyla okuyor: "Harita sadece kâğıt değildir; bizden önce geçenlerin ayak izidir."', { bayrak: ['zhaorHarita'] })] },
  ],
  sohbetler: [
    { k: 1, ad: 'Yıldız saati', soz: 'Zhaor: "Bu nöbetin yıldızını duyuyor musun? Gökyüzü sana fısıldar, yeter ki dinle."',
      secenekler: [O('Dinle', 20, 'Birlikte susuyorsunuz.'), O('"Yıldız duyulmaz."', -5, 'Gülümsüyor: "Henüz."')] },
  ],
  kademeEtki: (d, k) => {
    if (k === 6) d.bayrak.zhaorSiseSaati = true;
    if (k === 10) d.bayrak.zhaorKoordinat = true;
  },
  imza: { selam: 'Gümüş nöbeti geldiğinde gökyüzü sana fısıldar, yeter ki dinle.', tesekkur: 'Harita sadece kâğıt değildir; bizden önce geçenlerin ayak izidir.', kizgin: 'Yıldızları görmek için göze değil, sabra ihtiyacın vardır.' },
  ortam: 'Dümen çarkının hafif mekanik tıkırtısı, kubbeden süzülen derin gökyüzü uğultusu ve parşömen haritaların hışırtısı.',
});

kisiEkle('sinha', {
  ...ORTAK, ad: 'Sinha Mar-Zul', unvan: 'Akustik dinleme subayı',
  hiz: [[0, 10, 1]], hizMetni: 'Sınıf B: yüzde altmış beş sohbet, yüzde otuz beş görev. Yavaş konuşur; acele ettirme.',
  kimlik: ['Doğuştan kör, sakin ve zamanı sesten ölçen bir akustik dehâ. Kelimelerin arasındaki boşluğu bile dinler.', 'Evrenin ve Malazar\'ın sessiz notasını duymaya çalışır.'],
  kademeler: [
    'Ayak sesi: kapı açılmadan geldiğini biliyor.', 'Nefes: nefesinden yorgunluğunu söylüyor.', 'Çanlar: odasındaki kristal çanları tanıtıyor.',
    'Yerçekimi yankısı: SUB-05 ile yankıyı kaydetmek istiyor.', 'Julian: koloninin müzisyenine kaydı ulaştırıyor.', 'Körlük: gözlerinin hiç görmediğini, bunun bir eksik olmadığını anlatıyor.',
    'Gizli notalar: Ses ve Yankı Düğümü bulmacalarında ipucu veriyor.', 'Sessizlik: birlikte tam bir dakika susuyorsunuz.', 'Malazar\'ın notası: dağın sessiz notasını duyduğunu söylüyor.',
    'Büyük kayıt: akustik kaydı tamamlıyor.', 'Altı yıldız akoru: finaldeki altı yıldız akorunu sana öğretiyor.',
  ],
  sosyal: [['Julian', 'Kolonideki müzisyen.', 'SUB-05 kaydı ona ulaşır.']],
  sever: ['kristal_can', 'huzur_tutsusu', 'sakin_cay'], sevmez: ['sise_solis', 'tamir_kiti'],
  hediyeNot: 'Sessizliği ve temiz tınıyı sever; gürültülü ve patlayıcı şeyleri istemez.',
  severSoz: '"Dinle... şu tınıyı duyuyor musun? İşte evrenin en temiz notası bu."', sevmezSoz: '"Çok parlak... ve çok gürültülü bir patlama taşır. Benim odamda sessizlik gerek."',
  gorevler: [
    { id: 'SUB-05', ad: 'Yıldızların sessiz notası', tur: 'bag', k: 3, puan: 30,
      durum: 'Uçan Arin Adası ile Malazar arasındaki yüksek rüzgâr noktasında dört notalı bir yerçekimi yankısı var.',
      hikaye: ['Sinha, yavaş ve huzurlu: "Adımların... bugün daha kararlı. Asanın içindeki kristal bile... daha berrak çınlıyor. Ne duydun?"', 'Sen: "Arin ve Malazar arasındaki dört notalı sessiz yankıyı kaydetmeye hazırım." Sinha sana küçük bir kristal çan veriyor: "Şaşırırsan... bu tonu dinle."'],
      cozum: 'Ses ve Yankı Düğümü ile dört notalı yankıyı sırayla kaydet.',
      bulmaca: { dugumler: [D('yanki', 'Dört notalı yerçekimi yankısı', 0, 'kristal', 'Rüzgârın içinde dört alçak nota; sırası kayıyor.', [['yanki_dugumu'], ['frekans_anahtari', 'zihin_arindirma']], 'Dört nota sırayla kayda geçti.')] },
      secimler: [S('Kaydı Sinha\'ya getir', { sinha: 35 }, 'Sinha kaydı dinliyor, gözleri kapalı: "Gözler... bazen en büyük gürültüdür. Kapatırsan... gerçek sesi duyarsın." Kayıt Julian\'a da gidiyor.', { bayrak: ['sinhaKayit'], yap: (d) => koloniBag(d, 'julian', 20) })] },
  ],
  sohbetler: [
    { k: 1, ad: 'Sessizlik', soz: 'Sinha: "Bir dakika... hiç konuşmadan... dinleyelim mi?"',
      secenekler: [O('Susup dinle', 30, 'Dakika bitince Sinha gülümsüyor: "Sen de duydun."'), O('"Ne dinleyeceğiz?"', 5, '"İşte... bunu."')] },
  ],
  kademeEtki: (d, k) => { if (k === 10) d.bayrak.sinhaAkor = true; },
  imza: { selam: 'Gözler... bazen en büyük gürültüdür. Kapatırsan... gerçek sesi duyarsın.', tesekkur: 'Altı yıldız... sadece ışık değil... gökyüzüne yazılmış bir akordur.', kizgin: 'Acele etme... nota kaçmaz... sadece senin ona yetişmeni bekler.' },
  ortam: 'Oda duvarlarından gelen derin sonar yankıları, yavaşça sallanan kristal çanlar ve kalp atışı gibi düzenli bir alt frekans.',
});

kisiEkle('drahmir', {
  ...ORTAK, sinif: 'A', ad: 'Başçavuş Drahmir Oksid', unvan: 'Hangar ve dökümhane subayı',
  hiz: [[0, 10, 1]], hizMetni: 'Sınıf A: yüzde yetmiş beş görev; ter ve çelik.',
  kimlik: ['Sert, huysuz ama dürüst eski Filtra zırh ustası. Kristal büyülere şüpheyle bakar.', 'Gerçek emek ona göre ter, çekiç ve kızgın çeliktir; büyünün yalnız zanaatta kullanıldığını görünce saygısı derinleşir.'],
  kademeler: [
    'Büyücü çırağı: seni böyle terslıyor.', 'Çekiç: elinden çekici almana izin vermiyor.', 'Kömür taşı: ocağa kömür taşıtıyor.',
    'Çeliğe saygı: SUB-02 ile çeliğe olan saygını görüyor.', 'Ortak kilit: SUB-06 ile Elyndra meselesine el atıyor.', 'Filtra: Oronte\'yi ve Brom\'u tanıdığını söylüyor.',
    'Ustalık: Oronte ve Zeno için dövülen görev silahlarına ince ayar katıyor.', 'Su verme: çeliğe su vermenin sırrını öğretiyor.', 'Eski yara: kolundaki yanığı anlatıyor.',
    'Miras: kızıl taş mirasını anlatıyor.', 'Usta çekici: kızıl taş mirasını ve kendi eski çekicini sana emanet ediyor.',
  ],
  sosyal: [['Elyndra Val-Tarek', 'Mühür ve çelik inatlaşması.', 'SUB-06.'], ['Oronte', 'Filtra\'dan eski tanıdık.', 'Kademe 6\'dan sonra FIL-02 ve ZOR-02 dövümüne ince ayar.']],
  sever: ['demir_cevheri', 'komur', 'ekmek'], sevmez: ['urun_kristal_cicek', 'bal'],
  hediyeNot: 'Elini taşın altına koyanın hediyesini sever.',
  severSoz: '"Hah! İşte elini taşın altına koyan bir kaptan! Gel bakalım, ocağın başı senin."', sevmezSoz: '"Yapışkan tatlılar ve kırılgan çiçekler mi? Burası dökümhane evlat, çay bahçesi değil!"',
  gorevler: [
    { id: 'SUB-06', ad: 'Çelik ve rezonans inatlaşması', tur: 'zincir', k: 3, puan: 0, bolge: 'ygk',
      durum: 'Drahmir, Elyndra\'nın hangardaki bir mühimmat kapağına büyü mührü koymasına öfkelenmiş; iki subay konuşmayı kesmiş.',
      hikaye: ['Drahmir elindeki ağır çekici örse vuruyor: "Çekilin şuradan! Yine hangara parlayan taşlar mı soktunuz? Demir sesini bastırıyorsunuz!"', 'Kapağın üstünde Elyndra\'nın rezonans mührü vınlıyor; yanında Drahmir\'in sürgüsü kırık.'],
      cozum: 'Kapağı incele: Metal Şekillendirme ve Devre Kıvılcımı ile hem mekanik sürgülü hem rezonans korumalı bir ortak kilit kurulabilir.',
      bulmaca: { dugumler: [D('kapak', 'Mühimmat kapağı', 0, 'metal', 'Kırık bir sürgü ve vınlayan bir mühür üst üste.', [['metal', 'devre']], 'Kapak ve mühür artık aynı kilidin iki parçası.', { yedek: { ad: 'Sürgüyü elle onar, mührü olduğu gibi bırak', odak: 20, metin: 'Kapak kapanıyor; ortak bir kilit değil ama iş görüyor.' } })] },
      secimSoru: 'İki subay sana bakıyor. Hangi yolu seçiyorsun?',
      secimler: [
        S('A) Drahmir\'i tut: mühür kırılsın', { drahmir: 30, elyndra: -15 }, 'Drahmir mührü çekiciyle kırıyor. Elyndra sessizce reaktöre dönüyor.'),
        S('B) Elyndra\'yı tut: mühür kalsın', { elyndra: 30, drahmir: -15 }, 'Mühür kalıyor. Drahmir homurdanarak hangarın öbür ucuna gidiyor.'),
        S('C) Denge Yolu: ortak kilidi göster', { drahmir: 25, elyndra: 25 }, 'Drahmir kilide bakıp uzun uzun düşünüyor: "Tamam, kabul... ateşin iyiymiş." Elyndra gülümsüyor. İkisi yeniden konuşuyor.', { bayrak: ['ortakKilit'], yap: (d) => { if (d.ygk && d.ygk.k.elyndra) d.ygk.k.elyndra.kirgin = false; } }),
      ] },
  ],
  sohbetler: [
    { k: 1, ad: 'Büyücü çırağı', soz: 'Drahmir: "Yine mi sen, büyücü çırağı? Kömür taşıyacak mısın, yoksa asanı mı parlatacaksın?"',
      secenekler: [O('Kömürü taşı', 20, '"Hah! Belki adam olursun."'), O('"Asamı parlatacağım."', -5, '"Defol hangarımdan."')] },
  ],
  kademeEtki: (d, k) => { if (k === 10) { BY.tasEkle(d, 'kizil', 2); d.bayrak.drahmirCekic = true; } },
  imza: { selam: 'Büyü dediğin bir gün söner ama iyi dövülmüş çelik yüz yıl dayanır!', tesekkur: 'Tamam, kabul... ateşin iyiymiş. Ama çekici hâlâ benden iyi tutamazsın.', kizgin: 'Kapağıma büyü mührü mü? Bir daha yaparsa o asayı örste dümdüz ederim!' },
  ortam: 'Örse inen ağır çekiç darbeleri, döküm ocağının kükreyen ateşi ve kızgın demirin suya daldırılırken çıkardığı keskin tıslama.',
});
