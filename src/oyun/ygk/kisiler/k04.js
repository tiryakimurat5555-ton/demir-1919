// karakter-10 Valen Lazeria, karakter-11 Ignador (belgeler/v6). İkisi akademide zaten vardı (k_valen, k_ignador) ve
// K-ignador darbe kararı (ak_darbe: valenKapali | ignadorKirgin) korunur; bağ ağı iki sonuçta da sürer.
import { kisiEkle } from '../bag';
import { D, S, O, P } from '../yardim';

const kapali = (d) => !!d.bayrak.valenKapali;

kisiEkle('valen', {
  ad: 'Valen Lazeria', unvan: 'Yüksek Konsey Rektörü (Kat 6; darbe olduysa Kat -4 hücresinde)', nokta: 'k_valen', yer: ['ygk_m4', 10, 10], yerKosul: kapali, kat: 'ygk_6', sinif: 'B',
  hiz: [[0, 10, 0.8]],
  hizMetni: 'Ağır ve resmî: şahsi samimiyete kolay geçmez. Tutarlı devlet aklı, kriz anında soğukkanlılık ve dürüst eleştiriyle saygısını kazanırsın.',
  kimlik: [
    'Sekizler Konseyi\'nden kalan son dâhi. Uzun boylu, sarsılmaz duruşlu; sesi yüksek değildir ama tınısının ağırlığından Kat 6 salonunun kristal duvarları titrer. Konsey cübbesi Zirve İğnesi\'nin gümüşi ışığını yansıtır.',
    'Kaostan ödü kopan bir düzen mimarı. Birinci Çağ\'ın başkentini yok eden Kara Göl aether patlamasını Sekizler Konseyi kayıtlarından okumuş; kontrolsüz büyüyü, Malazar deneylerini ve taşra isyanlarını ikinci bir kıyamet olarak görür.',
    'Zephyra\'yı Kat -4\'e kapatırken de, Kefius ile yollarını ayırırken de hep aynı şeyi söylemiş: "Birkaç kişinin özgürlüğü, seksen bin öğrencinin hayatından değerli olamaz."',
  ],
  kademeler: [
    'Kristal kubbenin mesafesi: seni Aethelis\'ten gelen kontrolsüz bir değişken sayar.',
    'Zirve İğnesi\'nin yankısı: kubbedeki yıldız çanlarında küçük bir rezonans sapması.',
    'Sekizler Konseyi\'nin gölgesi: eski yedi üyenin nasıl dağıldığını üstü kapalı anlatır.',
    'Yasak müfredat tartışması: Malazar büyüsünün yayılmasından duyduğu endişeyi paylaşır.',
    'Palmi ve Morvenna Kael: tahtın ajanı ile kendi vekili arasındaki sessiz iktidar gerilimi.',
    'Kefius\'la kırılan köprü: Kat -4 kararını savunur; haklı mıydı, korkak mı?',
    'Konsey mührü: gözlemevi arşivine ve dış saha tehdit raporlarına tam erişim.',
    'Kara Göl korkusu: asıl korkusunun tahtı kaybetmek değil, Malazar yarığının Tonoflenya\'yı ikinci kez patlatması olduğunu itiraf eder.',
    'Eşit otorite: sana Konsey\'in dış dünyadaki eşit ortağı diye hitap eder.',
    'Başkent dokunulmazlığı: gümrük ve YGK denetim noktalarında resmî geçiş önceliği.',
    'Kapanan defter, yeni düzen: büyüyü yasaklamak yerine sorumlu bir düzene açmayı kabul eder.',
  ],
  sosyal: [
    ['Kefius Arateon', 'Eski dostluk Kat -4 ve -5 kararlarıyla dondu; ikisi de gizlice birbirine saygı duyar ama konuşmaz.', 'KEF-04 ve VAL-04\'te ikisini barıştırma ya da taraf seçme şansı.'],
    ['Morvenna Kael', 'Konsey tutanaklarını ezbere bilir, daha sert ve pragmatik bir yönetim ister; darbede yönetimi o alır.', ''],
    ['Ignador', 'Konsey\'i fazla yavaş ve kibirli bulur; K-ignador darbesinin baş aktörü.', 'Darbe kararı Valen\'in yerini belirler.'],
    ['Sirilla ve Palmi', 'Sirilla\'nın masaya koyduğu cam tozundan habersiz; Palmi\'nin raporlarına mecburen katlanır.', 'SIR-03 seçimi büyük kırılma yaratır.'],
    ['Zephyra', 'Zephyra için Valen kafesin gardiyanı; darbeyle Kat -4\'e düşerse roller tersine döner.', ''],
  ],
  sever: ['dunya_cayi', 'tamir_kiti', 'gumus_tozu'], sevmez: ['bal', 'urun_kristal_cicek'],
  hediyeNot: 'Pratik, sade ve disiplinli; süs eşyası ve gereksiz şekerli ikramları ciddiyetsiz bulur.',
  severSoz: '"Pratik. Takdir ettim."', sevmezSoz: '"Süs düzen getirmez, Kaptan."',
  gorevler: [
    { id: 'VAL-01', ad: 'Zirve İğnesi\'nin çatlak tonu', tur: 'bag', k: 1, puan: 30,
      durum: 'Kubbenin tepesindeki altı yıldız çanı dış fırtınadan akort kaybetti; camlarda ince bir uğultu.',
      hikaye: [(d) => (kapali(d) ? 'Valen hücresinin camından, eski bir Konsey kanalıyla sana yön veriyor: kubbe onsuz da akortsuz kalmış.' : 'Valen kubbenin altında elleri arkasında bekliyor. Altı çan birbirinden çok az ayrı tonlarda inliyor; camlar ince ince titriyor.')],
      cozum: 'Ses ve Yankı Düğümü ile Frekans Anahtarı ile altı yıldız tonunu düzelt ya da serin veya durgun havayla camlara vuran rüzgârı yatıştır.',
      bulmaca: { dugumler: [
        D('canlar', 'Altı yıldız çanı', 0, 'kristal', 'Altı ton birbirine sürtünüyor.', [['yanki_dugumu', 'frekans_anahtari'], ['hava_durgun'], ['hava_serin']], 'Kubbe yeniden berrak bir çan sesi verdi.'),
      ] },
      bitisMetni: 'Valen senin yalnız kılıç değil, denge de bildiğini gördü.' },
    { id: 'VAL-02', ad: 'Konsey\'in iki gölgesi', tur: 'zincir', k: 4, once: ['VAL-01'], puan: 0,
      durum: 'Kat 6 tutanaklarından bir bölüm kayboldu; Palmi Kral\'a bildirmekle tehdit ediyor, Morvenna Kael suçu taşra casuslarına yıkmak istiyor.',
      hikaye: ['Konsey salonunda gizli bir mühür izi, parmak ucunda bile hissedilmeyecek kadar silik. İz, tutanak dolabından kapıya doğru ilerliyor.'],
      cozum: 'Beyaz Lumina salımı ve Hakikat Yankısı ile gizli mühür izini takip et.',
      bulmaca: { dugumler: [
        D('iz', 'Silik mühür izi', 0, 'fisilti', 'Dolaptan kapıya uzanan bir iz.', [['lumina_salim', 'hakikat_yankisi'], ['yanki_tarama', 'hakikat_yankisi'], ['lumina_salim', 'yanki_tarama']], 'İz bir Kraliyet Çırağı\'na çıktı: tutanağı kopyalamaya çalışmış.'),
      ] },
      secimler: [
        S('Çırağı Valen\'in önünde ifşa et', { valen: 45, palmi: -15 }, 'Valen ve Morvenna Kael rahatladı; Palmi sana karşı soğuk bir duvar ördü.', { kirgin: ['palmi'] }),
        S('Belgeyi gizlice yerine koy, krizi sessizce kapat', { valen: 20, palmi: 15 }, 'Palmi sana borçlu; Valen neden tam gerçeği söylemediğini merak ediyor.', { bayrak: ['palmiBorclu'] }),
      ] },
    { id: 'VAL-03', ad: 'Dış saha tehdit raporları', tur: 'hiyerarsi', k: 6, once: ['VAL-02'], puan: 35,
      durum: 'Filtra, Zorah ve Zeris sınırlarında eski Malazar mühürleri zayıflıyor; Valen güvenilir bir elçi arıyor.',
      hikaye: [(d) => (kapali(d) ? 'Hücresindeki eski Konsey kanalından dört bölgenin şifreli harita verileri cızırdıyor.' : 'Gözlem masasında dört bölgenin şifreli harita verileri; her biri ayrı bir dilde cızırdıyor.')],
      cozum: 'Sessiz Yankı Taraması ve Devre Kıvılcımı ile dört bölgenin şifreli harita verisini birleştir.',
      bulmaca: { dugumler: [
        D('kuzey', 'Kuzey ve Zeris verisi', -0.6, 'ruzgar', 'Rüzgârla bozulmuş bir sinyal.', [['yanki_tarama'], ['frekans_anahtari']], 'Kuzey verisi okundu.'),
        D('dogu', 'Doğu ve Zorah verisi', -0.2, 'ruzgar', 'Kum gürültüsüyle kaplı.', [['yanki_tarama'], ['frekans_anahtari']], 'Doğu verisi okundu.'),
        D('bati', 'Batı ve Filtra verisi', 0.2, 'elektrik', 'Filtra makinelerinin uğultusu.', [['devre'], ['frekans_anahtari']], 'Batı verisi okundu.'),
        D('birlestir', 'Dört verinin birleşimi', 0.6, 'kristal', 'Dört parça tek haritaya oturmayı bekliyor.', [['devre', 'yanki_tarama'], ['hibrit_cozucu']], 'Harita birleşti: tehdit hatları açık.', { on: ['kuzey', 'dogu', 'bati'] }),
      ] },
      bitisMetni: 'Tonoflenya\'nın dış bölgelerindeki tehdit hatlarına akademinin resmî görevlendirmesiyle çıkabilirsin.',
      odul: { tas: { mor: 1 } }, yap: (d) => { d.bayrak.valenElci = true; } },
    { id: 'VAL-04', ad: 'İki eski dostun masası', tur: 'final', k: 8, once: ['VAL-03'], puan: 60,
      durum: 'Sekizler Konseyi\'nden kalma çatlak bir saat ve eski bir Konsey mühür kutusu.',
      hikaye: [(d) => (kapali(d)
        ? 'Valen hücresinin camının ardında, Kefius ve Zephyra ile yüzleşiyor. İlk kez "Belki de her şeyi duvarların ardına kilitleyerek koruyamazdım," diyerek hatasını kabul ediyor.'
        : 'Kat 6\'nın sessiz akşamında Valen sana Sekizler Konseyi\'nden kalma çatlak bir saati gösteriyor ve Kefius\'u yıllar sonra ilk kez aynı masaya çağırmanı istiyor.')],
      cozum: 'Zihin Arındırma ve Lumina salımıyla eski Konsey mühür kutusunu aç, içindeki ortak yemini ortaya çıkar.',
      bulmaca: { dugumler: [
        D('kutu', 'Eski Konsey mühür kutusu', 0, 'metal', 'Kutu iki kişinin birlikte açması için yapılmış; kilidi ağır bir öfkeyle kapanmış.', [['zihin_arindirma', 'lumina_salim'], ['zihin_arindirma', 'hakikat_yankisi']], 'Kutu açıldı: Valen ile Kefius\'un gençken yazdığı ortak yemin.'),
      ] },
      bitisMetni: 'Valen büyüyü yasaklamak yerine sorumlu eğitimle serbest bırakıyor. Akademinin bütün katlarında tam saygınlık senin.',
      sonuc: (d) => (kapali(d) ? 'Morvenna Kael ile resmî af ve uzlaşı imzalandı.' : 'Kefius ve Valen aynı masada.'),
      odul: { tas: { mor: 1 } }, yap: (d) => { d.bayrak.valenK10 = true; } },
  ],
  sohbetler: [
    { k: 3, ad: 'Korkunun adı', soz: 'Valen (kristal kubbeden aşağı bakarak): "Aşağıda seksen bin genç var Kaptan. Bir gün Malazar\'dan gelen o tozun içindeki güç kontrolden çıkarsa bunun hesabını kim verecek? Sen mi?"',
      secenekler: [
        O('"Gücü yasaklamak kontrol etmez; öğretmek ve sınırını göstermek eder."', P.cokYuksek, 'Duvarlardaki titreşim hafifliyor: "Kefius da gençken tam böyle konuşurdu..."'),
        O('"Haklısın, tehlikeli her şey kilit altında tutulmalı."', P.orta, '"Tedbirli bir kaptan. Konsey\'de böylelerine ihtiyacımız var."'),
        O('"Korkuyorsan bu koltukta oturma."', P.eksiDusuk, '"Cesaret ile körlük arasındaki farkı yaşın ilerleyince anlarsın."'),
      ] },
  ],
  imza: { selam: 'Düzen, her şeyin temelidir Kaptan.', tesekkur: 'Sorumluluk bilincin takdire şayan.', kizgin: 'Kaosu Akademi\'ye sokmana izin vermem!' },
  ortam: 'Rektörlük camlarına vuran yüksek irtifa rüzgârı, altı yıldızın düzenli saat tıkırtısı ve ağır ahşap masa gıcırtısı.',
});

kisiEkle('ignador', {
  ad: 'Ignador', unvan: 'Ağır Plazma Talimgâhı Eğitmeni (Kat 1)', nokta: 'k_ignador', kat: 'ygk_1', sinif: 'A',
  hiz: [[0, 10, 1]], hizCarpani: (d) => (d.bayrak.ignadorKirgin && !(d.ygk && d.ygk.k.ignador && d.ygk.k.ignador.gorev['IGN-04'] === 'bitti') ? 0.6 : 1),
  hizMetni: 'Görev ağırlıklı: süslü sözlerden ve ağlak hikâyelerden puan vermez; işi hızlı, temiz ve bahanesiz yaptığında bar istikrarla dolar. Darbe kararında Valen\'i koruduysan bir süre kırgın kalır; final görevi kırgınlığı tamamen giderir.',
  kimlik: [
    'Eskiden kuzey sınırındaki Zeris Kulesi\'nde donarak nöbet tutmuş bir sınır muhafızı; şimdi Kat 1 amfisinde plazma mermileri ve ozon kokusu arasında öğrenci eğitiyor.',
    'Konuşkan, sert ama açık sözlü; arkandan iş çevirmez, yüzüne söyler. Valen\'den nefretinin sebebi şahsi kin değil: "Sınırlar yanarken altıncı katta nutuk atılması."',
    'Önce asanı "Konsey\'in süslü çıngırağı" sanıp alay eder; büyünün gerçek bir saha aracı olduğunu görünce Yıldırım Rezonansı\'nı öğretir.',
  ],
  kademeler: [
    'Acemi er muamelesi: botlarına bakar, "Siviller ilk kapıdan çıkabilir," der.',
    'Hedef kalibrasyonu: talimgâhın hedef dronlarının enerji hattı kesilmiş.',
    'Zeris nöbetinden anılar: donan nöbet arkadaşlarını anar.',
    'Çelik mi, yıldırım mı: ölü bobini tek kurşun atmadan çalıştırmanı ister; Yıldırım Rezonansı.',
    'Tixie baskını: Tixie talimgâh hoparlörlerinden çocuk şarkısı çaldırınca küplere biner.',
    'Kırılma noktası: Konsey mi reform mu kararının ağırlığını taşır.',
    'Sınır ikmal hattı: dış bölgelere giden acil ekipman desteklerini yönetir.',
    'Mirelza mesajı: Zeris\'teki eski yoldaşından gelen şifreli bir kaydı paylaşır.',
    'Kışla kardeşliği: seni doğrudan saha komutanı olarak selamlar.',
    'Talimgâh önceliği: Kat 1 mekanik ve taktik hazırlıklarında tam öncelik.',
    'Son siperin sözü: askerlerin geleceğini güvenceye alır.',
  ],
  sosyal: [
    ['Valen Lazeria', 'Baş düşmanı: Ignador hız ve sert önlem, Valen temkin ve yasak ister.', 'K-ignador ve IGN-04\'te karşı karşıya.'],
    ['Mirelza', 'İkisi de Zeris Kulesi kökenli; sürgünden önce aynı sınır hattında omuz omuza durmuşlar.', 'Mirelza hakkında en insani cümleleri o kurar.'],
    ['Varek Kaelon', 'İki asker kafa dengi.', 'Gemiye döndüğünde Varek onun taktiklerini över.'],
    ['Tixie', 'Şakalarından ve çıplak ayakla süzülmesinden nefret eder.', 'Komik asker ile şımarık çatışması.'],
  ],
  sever: ['piezo', 'sise_solis', 'kavrulmus_kahve'], sevmez: ['sakin_cay', 'huzur_tutsusu'],
  hediyeNot: 'Kıvılcım, yüksek voltaj ve sert kahveyle yaşar; uyuşukluk veren çay ve tütsüleri hakaret sayar.',
  severSoz: '"İşte bu! Bir asker buna ihtiyaç duyar."', sevmezSoz: '"Uyku ilacı mı? Burası talimgâh, kaptan."',
  gorevler: [
    { id: 'IGN-01', ad: 'Ölü talimgâh hattı', tur: 'bag', k: 1, puan: 30,
      durum: 'Talim şebekesi Tixie\'nin bir boru şakası yüzünden kısa devre yaptı; öğrenciler boş bekliyor.',
      hikaye: ['Kabul meydanının yanındaki talim şebekesi karanlık; bir alarm boşa ötüyor, öğrenciler sıkıntıyla ayak değiştiriyor.'],
      cozum: 'Devre Kıvılcımı ile üç talim istasyonunu ayağa kaldır; Frekans Anahtarı ile sahte alarmı sustur.',
      bulmaca: { dugumler: [
        D('istasyon', 'Üç talim istasyonu', -0.3, 'elektrik', 'Üç istasyon sönük.', [['devre'], ['kivilcim', 'tele_kaldirma']], 'İstasyonlar vınlayarak açıldı.'),
        D('alarm', 'Sahte alarm', 0.4, 'elektrik', 'Bitmeyen, kulak tırmalayan bir alarm.', [['frekans_anahtari'], ['yanki_dugumu']], 'Alarm sustu.', { on: ['istasyon'] }),
      ] },
      bitisMetni: 'Ignador kaşlarını kaldırıp başını sallıyor: "İyi, en azından kablodan anlıyorsun."' },
    { id: 'IGN-02', ad: 'Ölü bobini uyandır', tur: 'hiyerarsi', k: 3, once: ['IGN-01'], puan: 25, ogren: 'yildirim_rez',
      durum: 'Köşedeki dev paslı bobin jeneratörle bile çalışmıyor.',
      hikaye: ['Ignador kollarını kavuşturuyor: "Bu bobini büyünle çalıştır, ben de o asaya saygı duyayım." Bobinin tepesi gökyüzüne açık bir çatı penceresine bakıyor.'],
      cozum: 'Havayı Şiddetli Yağmur\'a çekip bobin tepesine Yıldırım Düşür ya da Sarı Solis şişesi ve Kıvılcım Dalgası ile çekirdeği ateşle.',
      bulmaca: { dugumler: [
        D('bobin', 'Paslı enerji bobini', 0, 'elektrik', 'Ölü, soğuk bir bobin.', [['yildirim_dusur'], ['solis_salim', 'kivilcim'], ['yildirim_rez'], ['devre', 'kivilcim']], 'Bobin gürleyerek uyandı!', { ipucu: 'Yıldırım ister: ya havayı yağmura çekip yıldırım düşür, ya güneş ışığıyla kıvılcımı birleştir. Hiçbiri yoksa kıvılcım ve devre de bobini zorlar.' }),
      ] },
      bitisMetni: 'Ignador kahkaha atıp sırtına vuruyor; Yıldırım Rezonansı artık senin.',
      odul: { ogret: ['yildirim_rez'] } },
    { id: 'IGN-03', ad: 'Zeris\'ten gelen soğuk mektup', tur: 'bag', k: 6, once: ['IGN-02'], puan: 20,
      durum: 'Zeris\'ten donmuş aether buzuyla kapalı mühürlü bir kutu geldi.',
      hikaye: ['Kutunun içinden Mirelza\'nın eski bir ses kaydı çıkacak. Ignador sert kabuğunu biraz indiriyor: "Zeris\'te kalanların yarısı dondu, diğer yarısı unutuldu."'],
      cozum: 'Kıvılcım Dalgası ile kutuyu erit; Ses ve Yankı Düğümü ile bozuk kaydı temizle.',
      bulmaca: { dugumler: [
        D('kutu', 'Donmuş kutu', -0.3, 'buz', 'Aether buzuyla kaplı.', [['kivilcim'], ['hava_gunes']], 'Buz eridi.'),
        D('kayit', 'Bozuk ses kaydı', 0.4, 'fisilti', 'Cızırtılı, parçalı bir ses.', [['yanki_dugumu'], ['frekans_anahtari', 'zihin_arindirma']], 'Mirelza\'nın sesi net çıktı.', { on: ['kutu'] }),
      ] },
      bitisMetni: 'Mirelza ve Zeris görevlerinde ek güven ve ipucu kazandın.',
      odul: { tas: { kizil: 1 } }, yap: (d) => { d.bayrak.ignadorMirelza = true; } },
    { id: 'IGN-04', ad: 'Yeni muhafız yemini', tur: 'final', k: 8, once: ['IGN-03'], puan: 60,
      durum: 'Sınır muhafızlarının hakkı ya da Kat 1 duvarı dışındaki gizli sızma.',
      hikaye: [(d) => (d.bayrak.valenKapali
        ? 'Morvenna Kael ile bütçe kesintisi yüzünden tartışan Ignador, sınır muhafızlarının maaş ve zırh hakkını korumak için senden destek istiyor. Kat 1 duvarının dışındaki eski ikmal kapısı kilitli; açarsan muhafızların payı doğrudan yola çıkar.'
        : 'Kırgın Ignador, Kat 1 duvarının dışındaki gizli bir sızmayı göstermek için seni çağırıyor: Flee Plee kaçakçıları kayanın altından tünel açmış. "Bunu büyünle kapatırsan," diyor, "geçmişi geride bırakırız."')],
      cozum: 'Yıldırım Rezonansı ve Ağır Toprak Yarma ile tüneli ya da kapıyı halle.',
      bulmaca: { dugumler: [
        D('tunel', 'Duvar dışındaki geçit', 0, 'tas', 'Kayanın altında oyuk bir boşluk; içeride çelik kapı.', [['yildirim_rez', 'toprak_yarma'], ['yildirim_rez', 'tele_kaldirma'], ['kivilcim', 'toprak_yarma']], 'Geçit halledildi.'),
      ] },
      bitisMetni: 'Kat 1 tam erişimi ve saha hazırlıklarında kalıcı saygınlık senin.',
      odul: { tas: { kizil: 1 } }, yap: (d) => { d.bayrak.ignadorK10 = true; d.bayrak.ignadorKirgin = false; } },
  ],
  sohbetler: [
    { k: 2, ad: 'Nutuk mu, zırh mı?', soz: 'Ignador (plazma tüfeğini silerken): "Altıncı katta oturup yıldız haritası çizmek kolay Kaptan. Sence sınırı koruyan şey kalın kanun kitapları mı, soğukta nöbet tutan askerin botları mı?"',
      secenekler: [
        O('"Botlar olmadan kitapların hepsi yanar; sahadaki askeri unutmayız."', P.cokYuksek, '"İşte lafı dolandırmayan bir kaptan!"'),
        O('"İkisi de lazım; plansız asker kendi sonunu hızlandırır."', P.orta, '"Kısmen haklısın; ama planı yapanın da bir kez barut koklaması gerekir."'),
        O('"Asker emir alır, tartışmaz."', P.eksiDusuk, '"Ben emir kulu değilim; körü körüne itaat edenlere gülüyorum."'),
      ] },
  ],
  imza: { selam: 'Hazır ol Kaptan, burası laf yeri değil.', tesekkur: 'Sağlam iş çıkardın!', kizgin: 'Bahane duymak istemiyorum!' },
  ortam: 'Dev plazma bobininin alçak elektrik uğultusu, arada çakan kıvılcımlar ve zırh ile çelik çarpışması.',
});
