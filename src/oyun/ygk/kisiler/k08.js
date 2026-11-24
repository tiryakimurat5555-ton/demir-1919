// karakter-18 Profesör Püskül ve Morvenna Kael, karakter-19 öğrenci Veyra-K (belgeler/v6). Mevcut roller korunur:
// ak_puskul (Kat 4), k_morvenna (Kat 6 vekili; K-ignador darbesinde Rektör).
import { kisiEkle, puanEkle } from '../bag';
import { D, S, O, P } from '../yardim';
import * as ZN from '../../tonoflenya/zanaat';

const darbe = (d) => !!d.bayrak.valenKapali;
const gordu = (d, m) => (d.gorulenMekanlar || []).includes(m) || (d.mekan === m);

kisiEkle('puskul', {
  ad: 'Profesör Püskül', unvan: 'Kütüphane ve Kartografya (Kat 4); Sfenks ırkından yaşlı bir profesör', nokta: 'ak_puskul', kat: 'ygk_4', sinif: 'B',
  hiz: [[0, 10, 1.1]],
  hizMetni: 'Merak, sabır ve unutkanlık: siyaseti hiç anlamaz; ona sabırla yardım eden ve kitaplarına özen gösteren seçimlerle hızla ısınır.',
  kimlik: [
    'Kedi Adam, Sfenks ırkından. Kulakları büyük, bıyıkları kâğıt tozuna bulanmış; gözlüğünü sürekli alnında unutup "Gözlüğüm nerede?" diye arayan yaşlı, dalgın ama altın kalpli bir kütüphane profesörü.',
    'Biri darbe yapsa bile "Yeter ki rafların yerini değiştirmesinler," der. Önemli bir haritayı çay fincanının altına koyup unutabilir. Corinne\'e ve Sora-9\'a dede şefkatiyle yaklaşır.',
  ],
  kademeler: [
    'Kayıp gözlük: gözlüğünü bulmana sevinir.',
    'Unutulan anahtar: raf anahtarını birlikte ararsınız.',
    'Çay saati: sana bir fincan çay koyar.',
    'Kronikler: Sora-9 ve Corinne ile eski kronikleri eşleştirirsiniz.',
    'Asma raf: yüksek raflardaki kitaplara seni yollar.',
    'Profesörün hikâyesi: gençliğinden bir anı anlatır.',
    'Yarım harita: Kefius ile gençken yarım bıraktığı yıldız haritasından söz eder.',
    'Tiktaklar: saatlerin arasındaki gizli kutuyu birlikte ararsınız.',
    'Çocukluk anahtarı: şifreyi çocukluk anısında bulur.',
    'Sesli mühür: kütüphanenin en eski sesli mühürlü kitabını seninle açar.',
    'Tarihî sır: akademinin tarihî sırrını paylaşır.',
  ],
  sosyal: [
    ['Corinne ve Sora-9', 'Dede şefkatiyle yaklaşır.', 'K4-PUS-01.'],
    ['Kefius Arateon', 'Gençken yarım bıraktıkları bir yıldız haritası.', 'K4-PUS-02.'],
  ],
  sever: ['dunya_cayi', 'sazan', 'fosil', 'bal'], sevmez: ['huzur_tutsusu', 'piezo'],
  hediyeNot: 'Demli çay, kızarmış göl sazanı, fosil ve bal sever; tütsü onu hapşırtır, keskin metalik sesli cihazlardan hoşlanmaz.',
  severSoz: '"Hafızama ışık tuttun!"', sevmezSoz: '"Hap... hapşu! Uzak tut evladım."',
  gorevler: [
    { id: 'K4-PUS-01', ad: 'Çay fincanının altındaki harita', tur: 'bag', k: 1, puan: 35,
      durum: 'Püskül yüksek asma rafa çıkardığı eski bir yıldız haritasını unuttu; merdiven kilitli, çay dökülen köşede mürekkep akıyor.',
      hikaye: ['Püskül bıyıklarını sıvazlıyor: "Haritayı oraya koymuştum... ya da buraya." Yukarıdan bir damla sesi: çay rafın kenarından süzülüyor.'],
      cozum: 'Hafif Süzülme ya da Canlı Sarmaşık ile rafa çık; Buzul Mühür ya da serin hava ile parşömeni kurut; Beyaz Lumina ile silinen koordinatları okunur kıl.',
      bulmaca: { dugumler: [
        D('raf', 'Yüksek asma raf', -0.5, 'ruzgar', 'Merdiven kilitli; raf çok yüksekte.', [['suzulme'], ['sarmasik'], ['tele_kaldirma'], ['ruzgar_ucusu']], 'Rafa ulaştın.'),
        D('parsomen', 'Islanan parşömen', 0, 'su', 'Mürekkep akıyor.', [['buzul'], ['hava_serin']], 'Mürekkep sabitlendi.', { on: ['raf'] }),
        D('koordinat', 'Silinen koordinatlar', 0.5, 'kristal', 'Rakamlar solmuş.', [['lumina_salim'], ['yanki_tarama'], ['hakikat_yankisi']], 'Koordinatlar yeniden okunur.', { on: ['parsomen'] }),
      ] },
      bitisMetni: 'Kat 4 kütüphanesinde eski dünya ve Malken efsanelerine erişim.',
      odul: { tas: { sari: 1 } } },
    { id: 'K4-PUS-02', ad: 'Tiktakların arasındaki kutu', tur: 'bag', k: 5, once: ['K4-PUS-01'], puan: 60,
      durum: 'Kat 4 saatlerinin tiktakları arasında gizli bir mekanik kitaplık kilidi; Püskül şifreyi unuttuğunu sanıyor.',
      hikaye: ['Kütüphanede yedi saat tiktaklıyor; biri ötekilerden çok az geride. Püskül gülümsüyor: "Çocukken o saati ben kurmuştum... ama nasıl?"'],
      cozum: 'Ses ve Yankı Düğümü ile tiktakların arasındaki gizli üç vuruşluk ritmi bul; Metal Şekillendirme ile kırık kilit dilini düzelt.',
      bulmaca: { dugumler: [
        D('ritim', 'Saatlerin ritmi', -0.3, 'metal', 'Yedi tiktak; biri geride.', [['yanki_dugumu'], ['yanki_tarama'], ['frekans_anahtari']], 'Üç vuruşluk gizli ritim bulundu.'),
        D('kilit', 'Kırık kilit dili', 0.4, 'metal', 'İnce, kırık bir dil.', [['metal'], ['tele_kaldirma', 'kivilcim']], 'Kilit dili düzeldi; kitaplık açıldı.', { on: ['ritim'] }),
      ] },
      bitisMetni: 'Püskül\'ün son kademelerinin yolu açıldı; Sora-9 için kalıcı arşiv bursu.',
      odul: { tas: { mavi: 1 } }, yap: (d) => { d.bayrak.soraBurs = true; puanEkle(d, 'sora', 20); } },
  ],
  sohbetler: [
    { k: 2, ad: 'Gözlüğüm ve bıyıklarım', soz: 'Püskül (gözlüğü tam alnında, rafları karıştırarak): "Miyav— öhöm, affedersin evladım. Gözlüğümü nereye koydum yine? Sora-9 az önce çok önemli bir şey söyledi ama çayımı tazelerken uçup gitti... Sen gençsin, hafızan tazedir!"',
      secenekler: [
        O('"Gözlüğün alnında Profesör; al, bir fincan demli çay da getirdim."', P.cokYuksek, 'Kulaklarını oynatıp gülüyor: "Ah! Hem gözü hem gönlü açık bir öğrenci!"', { kosul: (d) => ZN.miktar(d, 'dunya_cayi') > 0 }),
        O('"Gözlüğün alnında; istersen notlarını düzenlemene yardım edeyim."', P.yuksek, '"Çok naziksin; Corinne de hep böyle söyler..."'),
        O('"Bu kadar dağınık biri nasıl profesör olmuş, şaşırtıcı."', P.eksiDusuk, 'Kulakları düşüyor: "Benim dağınıklığım kitapların arasındadır, kalbimde değil."'),
      ] },
  ],
  imza: { selam: 'Hoş geldin evladım, gözlüğümü gördün mü?', tesekkur: 'Hafızama ışık tuttun!', kizgin: 'Kitaplarıma dokunma lütfen!' },
  ortam: 'Yavaş saat tiktakları, sayfa hışırtısı, patilerin taş zemindeki yumuşak tıkırtısı ve arada bir mırıltı.',
});

kisiEkle('morvenna', {
  ad: 'Morvenna Kael', unvan: 'Konsey Vekili (Kat 6); darbe olduysa Rektör', nokta: 'k_morvenna', kat: 'ygk_6', sinif: 'B',
  hiz: [[0, 10, 0.9]],
  hizMetni: 'Pragmatik siyaset ve tutanak: dostluk değil, kanıt ve sonuç ister.',
  kimlik: [
    'Gri cüppeli, keskin bakışlı; Konsey\'in bütün tutanaklarını tarih ve satır numarasıyla ezbere bilen bir Malken.',
    'Eski çağların felaketinden değil, bugünün verimsizliğinden nefret eder. Valen koltuktayken sessizce tutanak tutar; darbe olursa tek gün tereddüt etmeden Rektörlüğe oturup akademiyi sıkı bir disiplinle yönetir.',
  ],
  kademeler: [
    'Eksik satır: küçük bir tutanak eksiği üzerinden seni sınar.',
    'Satır numarası: senin söylediğini satır numarasıyla tekrar eder.',
    'Kâğıt ve güç: kalemin ordudan hızlı olduğunu anlatır.',
    'Yönetim farkı: Valen ile arasındaki farkı tartışır.',
    'Darbe gerilimi: Ignador\'un reformunu soğukkanlılıkla değerlendirir.',
    'Kanıt ortağı: bir kanıt dosyasını sana emanet eder.',
    'Silinen satır: kırk yıllık eksik sayfayı birlikte ararsınız.',
    'Bütçe masası: seni bütçe toplantısına çağırır.',
    'Düzenin dili: akademinin yeni düzenini seninle kurar.',
    'Tutanağa geçen ad: adını resmî tutanağa yazar.',
    'Vazgeçilmez ortak: seni Konsey\'in dış denge ortağı olarak resmen kaydeder.',
  ],
  sosyal: [
    ['Valen Lazeria', 'Valen eski felaketten korkar; Morvenna bugünün verimsizliğinden.', ''],
    ['Ignador', 'Darbede yönetimi o alır; askerî harcamalarla bütçe kavgası.', 'K6-MOK-02.'],
    ['Miranda Caledor', 'Lüks bütçesini denetler.', 'K6-MOK-02.'],
  ],
  sever: ['kavrulmus_kahve', 'sakin_cay', 'muhur_kutusu', 'gumus_tozu'], sevmez: ['oyuncak', 'rezonans_lambasi'],
  hediyeNot: 'Kahve, sakin çay, mühür kutusu ve gümüş tozu sever; ucuz süs eşyalarından ve düzensiz kâğıtlardan hoşlanmaz.',
  severSoz: '"Kayıtlara uygun, temiz iş."', sevmezSoz: '"Bu bir süs. Tutanakta yeri yok."',
  gorevler: [
    { id: 'K6-MOK-01', ad: 'Tutanaklardaki silinen satır', tur: 'zincir', k: 4, puan: 0,
      durum: 'Kırk yıllık bir tutanak sayfası eksik ve mühürle yakılmış; Morvenna bunun Valen ya da Sirilla tarafından gizlendiğinden şüpheleniyor.',
      hikaye: ['Morvenna yanık bir sayfa kalıntısını önüne koyuyor: "Satır yüz on yedi ile yüz kırk arası. Kanıt istiyorum, tahmin değil."'],
      cozum: 'Hakikat Yankısı ile yanmış mührün kalıntısını oku; Lumina salımıyla gizli imzayı açığa çıkar.',
      bulmaca: { dugumler: [
        D('muhur', 'Yanmış mühür', -0.3, 'lav', 'Kömürleşmiş bir mühür kalıntısı.', [['hakikat_yankisi'], ['yanki_tarama']], 'Mührün kalıntısı okundu.'),
        D('imza', 'Gizli imza', 0.4, 'kristal', 'Kâğıdın lifinde silik bir iz.', [['lumina_salim'], ['hakikat_yankisi']], 'Gizli imza ortaya çıktı.', { on: ['muhur'] }),
      ] },
      secimler: [
        S('Tam raporu Morvenna Kael\'e ver', { morvenna: 45, valen: -10, sirilla: -10 }, 'Konsey içinde onun gücü arttı; Valen ve Sirilla gerildi.', { odul: { tas: { mor: 1 } } }),
        S('Kritik adı sansürle, yalnız teknik özeti ver', { morvenna: 20 }, 'Kriz çıkmadı; Morvenna eksikliği not etti.'),
      ] },
    { id: 'K6-MOK-02', ad: 'İki yönetimin bütçe masası', tur: 'final', k: 8, once: ['K6-MOK-01'], puan: 60,
      durum: 'Kat 6 mühürlü arşiv kasasındaki gerçek harcama belgeleri.',
      hikaye: [(d) => (darbe(d)
        ? 'Rektör Morvenna Kael, Ignador\'un askerî harcamalarını dengelemek istiyor. Masada sınır muhafızlarının zırh listesi ile revirin ilaç listesi yan yana.'
        : 'Morvenna, Valen adına Miranda\'nın lüks bütçesini denetliyor. Masada şölen faturaları ile laboratuvar ödenekleri yan yana.')],
      cozum: 'Frekans Anahtarı ve Devre Kıvılcımı ile mühürlü kasayı aç; toplantıda son sözü söyle.',
      bulmaca: { dugumler: [
        D('kasa', 'Mühürlü arşiv kasası', 0, 'metal', 'Elektronik mühür, iki katmanlı.', [['frekans_anahtari', 'devre'], ['hibrit_cozucu']], 'Kasa açıldı; gerçek harcama belgeleri önünde.'),
      ] },
      secimSoru: 'Toplantıda son söz senin.',
      secimler: [
        S((d) => (darbe(d) ? 'Muhafızların zırhını koru, kesintiyi lükse kaydır' : 'Laboratuvar ödeneklerini koru, şöleni kıs'), { morvenna: 40, ignador: 10, miranda: -10 }, 'Morvenna seni resmen tutanaklara işledi: Konsey\'in dış denge ortağı.'),
        S('Her iki tarafa eşit kesinti öner', { morvenna: 30 }, '"Dengeli bir yanıt." Kat 6 resmî geçişlerinde tam yetki senin.'),
      ],
      odul: { tas: { mor: 1 } }, yap: (d) => { d.bayrak.morvennaK10 = true; } },
  ],
  sohbetler: [
    { k: 3, ad: 'Kâğıt ve güç', soz: 'Morvenna Kael (tutanağı kapatarak): "İnsanlar akademiyi büyülerin ve kalkanların yönettiğini sanır Kaptan. Oysa bir kalem darbesiyle kesilen ödenek yüz plazma topundan hızlı ordu dağıtır. Yanılıyor muyum?"',
      secenekler: [
        O('"Haklısın; kurallar ve kayıtlar olmadan güç yalnız gürültüdür."', P.cokYuksek, '"Tutanaklara güvenen bir kaptan. Nadir bulunur."'),
        O('"Kâğıt önemli; ama krizde o kalemi koruyacak cesaret de gerekir."', P.yuksek, '"Dengeli bir yanıt. Ignador kadar kör, Valen kadar ağır değilsin."'),
        O('"Bürokrasi yalnız işleri yavaşlatır."', P.eksiDusuk, '"Düzensizlik isteyenler taşraya gitsin."'),
      ] },
  ],
  imza: { selam: 'Tutanaklar hazır, konuya gir.', tesekkur: 'Kayıtlara uygun, temiz iş.', kizgin: 'Kuralları çiğneyeni arşivden silerim!' },
  ortam: 'Keskin kâğıt mühürleme sesi ve dosya hışırtısı.',
});

kisiEkle('veyra', {
  ad: 'Veyra-K', unvan: 'Burslu akustik öğrencisi (Kat 2)', yer: ['ygk_2', 12, 10], kat: 'ygk_2', sinif: 'B', ogrenci: true,
  hiz: [[0, 10, 1.15]],
  hizMetni: 'Hızlı: akademide herkes birbirinin açığını ararken ona yargılamadan yardım eden ilk kişi sen olduğun için çabuk güvenir. Bütün görevleri isteğe bağlıdır; ana hikâyeyi ya da büyüleri kilitlemez.',
  kimlik: [
    'Malkenia 5. Halka Varek\'in gürültülü dökümhanelerinde büyümüş bir işçi ailesinin çocuğu; üstün işitme yeteneği sayesinde akademiye burslu girmiş.',
    'Sınavlardan kalırsa bursu kesilecek ve Lasiraxi\'nin Tu kredi borcu ailesinin sırtına binecek. Ailesi üzülmesin diye her hafta "Her şey harika" diye yalan mektuplar yazıyor; geceleri elleri titriyor.',
  ],
  kademeler: [
    'Ön sıradaki yorgun gölge: her sesten irkilir.',
    'Yırtılan ses kaydı: Tixie\'nin şakası yüzünden ders kaydı bozuldu.',
    'Burs korkusu: ilk kez ailesinden söz eder.',
    'Yalan mektup: gönderemediği bir paket için yardım ister.',
    'Tixie ile gizli anlaşma: Tixie\'nin ona gizlice kopya fısıldamaya çalıştığını anlatır.',
    'Sınav gecesi paniği: vize sınavından önceki gece panik atak geçirir.',
    'İlk geçer not: sınavı kendi emeğiyle geçer, ailesine ilk kez doğruyu yazar.',
    'Kardeşin hayali: küçük kardeşi için bir ses küresi hazırladığını anlatır.',
    'Kendi sesin: kendi akustik projesine başlar.',
    'Kat 2 kulağı: amfide dönen şakaları sana önceden fısıldar.',
    'Bursun ötesinde: mezuniyet projesini sunar; özgüvenli bir akustik uzmanı olur.',
  ],
  sosyal: [
    ['Kaelis \'Echo\' Duman', 'Mükemmeliyetçi hocası.', ''],
    ['Tixie', 'Amfiyi sabote ettiğinde fatura ona kesilir; ama Tixie gizlice ona yardım etmeye çalışır.', 'AKD-01.'],
    ['Lasiraxi Jolt', 'Kredi borcu korkusu.', ''],
  ],
  sever: ['sakin_cay', 'ekmek', 'kristal_can', 'oyuncak'], sevmez: ['kavrulmus_kahve'],
  hediyeNot: 'Sakin çay, taş fırın ekmeği, küçük çan ve kardeşi için ahşap oyuncak sever; kahve kalbini aşırı çarptırır.',
  severSoz: '"Bu... kardeşim çok sevinecek!"', sevmezSoz: '"Kahve kalbimi çarptırıyor, kusura bakma."',
  gorevler: [
    { id: 'VEY-01', ad: 'Gürültüdeki temiz nota', tur: 'bag', k: 1, puan: 35,
      durum: 'Veyra-K\'nın ders kaydı yan amfideki patlamalar ve boru uğultusuyla bozuldu; sabaha teslim etmezse ceza alacak.',
      hikaye: ['Kristalden çıkan ses bir kakofoni: Faelan\'ın "puf!"ları, Tixie\'nin boru uğultusu ve arada Veyra-K\'nın titreyen notası.'],
      cozum: 'Ses ve Yankı Düğümü ile gürültüyü ayıkla ya da sis veya durgun havayla yankıyı bastırıp baştan kaydet.',
      bulmaca: { dugumler: [
        D('kayit', 'Bozuk ses kristali', 0, 'kristal', 'Gürültüye gömülmüş bir nota.', [['yanki_dugumu'], ['hava_sis'], ['hava_durgun'], ['frekans_anahtari', 'zihin_arindirma']], 'Temiz nota geri geldi.'),
      ] },
      bitisMetni: 'Küçük bir Tu teşekkür notu ve amfi kestirme kapısı bilgisi.' },
    { id: 'VEY-02', ad: 'Varek Halkası\'na giden paket', tur: 'bag', k: 3, once: ['VEY-01'], puan: 40, kosul: (d) => gordu(d, 'halka_varek'), kosulMetni: 'paketi Varek Halkası\'ndaki ailesine götür: önce Varek\'e git',
      durum: 'Veyra-K\'nın babasının elleri dökümhanede yandı; akademiden çıkma izni yok.',
      hikaye: ['Paketi Varek\'teki ailesine bıraktın: bir merhem, bir çay ve kardeşine küçük bir hediye. Dönüşte ailenin doldurduğu sesli mesaj küresi soğuk havada donmuş.'],
      cozum: 'Kıvılcım Dalgası ile küresinin donmuş kilidini aç, Veyra-K\'ya dinlet.',
      bulmaca: { dugumler: [
        D('kure', 'Donmuş mesaj küresi', 0, 'buz', 'Kilit buz tutmuş.', [['kivilcim'], ['hava_gunes'], ['solis_salim']], 'Küre açıldı: babasının ve kardeşinin sesi.'),
      ] },
      bitisMetni: 'Veyra-K küreyi kulağına bastırıp ağlıyor ve gülüyor; ailesiyle ilk kez sıcak bir konuşma.' },
    { id: 'VEY-03', ad: 'Sınav öncesi çınlama', tur: 'bag', k: 5, once: ['VEY-02'], puan: 0,
      durum: 'Sınavdan önceki gece Veyra-K\'nın kulakları stresten aşırı hassas; en ufak damla sesi beyninde çan gibi patlıyor.',
      hikaye: ['Veyra-K iki eliyle kulaklarını kapatmış: "Damla... yine damla..."'],
      cozum: 'Zihin Arındırma ile çınlamayı sustur; Frekans Anahtarı ile sınav odasının duvar seslerini prova ettir.',
      bulmaca: { dugumler: [
        D('cinlama', 'Stres çınlaması', -0.3, 'fisilti', 'Tiz bir çınlama.', [['zihin_arindirma'], ['hava_durgun']], 'Çınlama sustu.'),
        D('prova', 'Sınav odasının sesleri', 0.4, 'kristal', 'Duvarların tınısı.', [['frekans_anahtari'], ['yanki_dugumu']], 'Prova bitti; Veyra-K hazır.', { on: ['cinlama'] }),
      ] },
      secimler: [
        S('Sınavda yanında sessizce dur, moral ver', { veyra: 40 }, 'Sınavı alnının akıyla geçti; özgüveni kalıcı arttı.', { bayrak: ['veyraKendi'] }),
        S('Tixie\'den küçük bir akustik destek almasını öner', { veyra: 15, tixie: 10 }, 'Sınavı geçti ama suçluluk duyuyor.'),
      ] },
    { id: 'VEY-04', ad: 'Kardeşim için yıldız şarkısı', tur: 'final', k: 8, once: ['VEY-03'], puan: 60,
      durum: 'Veyra-K\'nın dönem projesindeki kristal çanın ayağı kırıldı.',
      hikaye: ['Veyra-K Varek\'in çekiç sesleriyle Kat 2\'nin kristal çanlarını birleştiren özgün bir beste hazırladı. Ama projenin ortasındaki çanın ayağı kırık.'],
      cozum: 'Metal Şekillendirme ile yeni ayağı dök; Lumina salımıyla amfideki ilk dinletiyi aydınlat.',
      bulmaca: { dugumler: [
        D('ayak', 'Kırık çan ayağı', -0.3, 'metal', 'Kırık pirinç.', [['metal'], ['tele_kaldirma', 'oz_baglama']], 'Yeni ayak döküldü.'),
        D('dinleti', 'İlk dinleti', 0.4, 'kristal', 'Amfi karanlık, dinleyiciler bekliyor.', [['lumina_salim'], ['solis_salim'], ['kivilcim', 'frekans_anahtari']], 'Çekiç ve çan aynı şarkıda; amfi ayakta.', { on: ['ayak'] }),
      ] },
      bitisMetni: 'Aethelis tavernasında Julian için özel ortak bir beste notası.',
      odul: { tas: { sari: 1 } }, yap: (d) => { d.bayrak.veyraBeste = true; } },
  ],
  sohbetler: [
    { k: 2, ad: 'Yüksek not baskısı', soz: 'Veyra-K (gözlerini ovuşturarak): "Sen de bazen herkesin senden kusursuz olmanı beklediğini hissediyor musun Kaptan? Kaelis hocaya tek bir yanlış nota versem sanki Varek\'teki bütün mahallemi hayal kırıklığına uğratacakmışım gibi."',
      secenekler: [
        O('"Kimse ilk seferde kusursuz olamaz. Hata yaptığında da buradasın, başarırken de."', P.cokYuksek, '"Bunu Faelan hocadan başka kimseden duymamıştım... sağ ol."'),
        O('"Gel şu zor bölümü beş dakika birlikte tekrar edelim."', P.yuksek, '"Gerçekten vaktin var mı? Çok teşekkürler!"'),
        O('"Bursluysan daha çok çalışman gerek; ağlamak çözüm değil."', P.eksiDusuk, 'Defterini kapatıp başını eğiyor: "Haklısın, vaktini aldım."'),
      ] },
  ],
  imza: { selam: 'Şşşt... lütfen biraz sessiz, notayı kaçırıyorum!', tesekkur: 'Bursumu senin sayende kurtardım, çok sağ ol!', kizgin: 'Zaten stresliyim, üstüme gelme!' },
  ortam: 'Akort edilen kristal bir aletin ince tınısı, hızlı kalem cızırtısı ve derin iç çekişler.',
});
