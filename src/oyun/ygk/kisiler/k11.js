// Paket 6B: Tonoflenya Kuzey (Zeris, Helgar) ve Güney (Fleeplee, Tentran, Uçan Arin Adası, Malazar), 10 kademeli bağlar ve
// büyüyle çözülen on iki görev. Var olan BL-mirelza/BL-barracuda zincirleri ve bölgeler aynen kalır. Paket 4'ün ikinci
// zincir örneği (Kat -4 gizli belgesi: Valen'e mi Mirelza'ya mı) ZIN-02 olarak Mirelza hattında.
// Belgede yalnız tema ve özel ödül var; kademe metinleri, hediyeler, sohbetler ve imza cümleleri bu temalardan yazıldı.
import { kisiEkle, kademe, KISI_EKLERI, kayit } from '../bag';
import { D, S, O } from '../yardim';
import * as ZN from '../../tonoflenya/zanaat';
import * as BY from '../../buyu/buyu';
import { gucEkle } from '../../tonoflenya/kisiler';

const tasVar = (d, r, n = 1) => !!(d.buyu && (d.buyu.taslar[r] || 0) >= n);

kisiEkle('mirelza', {
  ad: 'Mirelza', unvan: 'Zeris Dış Kulesi\'nin sonik sürgünü', nokta: 'k_mirelza', guc: 'kuzey', bolgeKisisi: true, yerAdi: 'Zeris Kulesi', sinif: 'B',
  hiz: [[0, 10, 1]],
  hizMetni: 'Sınıf B: yüzde elli beş sohbet, yüzde kırk beş görev.',
  kimlik: [
    'Bir zamanlar YGK\'nın en parlak ses büyücülerinden biriydi; bir gün akademiden kovuldu ve kuzeyin rüzgâr kulesine sürüldü.',
    'Rüzgâr şarkılarıyla konuşur; sesi bazen bir flüt gibi kırılır. Başkentin gizli alt kat projelerinden şüphelenir.',
  ],
  kademeler: [
    'Kule kapısı: rüzgârın içinden sana bakıyor, konuşmuyor.',
    'İlk şarkı: rüzgâra bir nota fısıldıyor; cevap vermeni bekliyor.',
    'Kule merdiveni: aşağı katlara inmene izin veriyor.',
    'Çanların derdi: donmuş çanların başını ağrıttığını söylüyor.',
    'Halyon: kuzey gözcülerinin eski adını anlatıyor.',
    'Sürgünün ilk izi: akademiden kovulduğunu ilk kez söylüyor.',
    'Rüzgâr uçuşu: Kuzey Rüzgârı Uçuşu gerektiren yüksek kule bulmacalarını açıyor.',
    'Kat -4: Başkentin alt kat projeleri hakkındaki şüphelerini paylaşıyor.',
    'Fırtına gecesi: kovuluşunun bütün hikâyesine hazırlanıyor.',
    'Son şarkı: geçmişinin yankısını seninle dindiriyor.',
    'Astral geçit: kuzeyin gizli astral geçidini sana açıyor.',
  ],
  sosyal: [['Zephyra', 'İkisi de rüzgâr ve ses sürgünü.', 'Zephyra serbest kalırsa birbirlerine rüzgâr selamı gönderirler.'], ['Valen Lazeria', 'Onu kovan Konsey\'in başı.', 'ZIN-02 seçimi ikisini karşı karşıya getirir.'], ['Zhaor Vel-Amin', 'Kule balkonundaki seyir haritası Zhaor\'un.', 'SUB-04 Zeris\'te geçer.']],
  sever: ['kristal_can', 'urun_isik_otu', 'sise_lumina', 'sakin_cay'], sevmez: ['komur', 'demir_cevheri'],
  hediyeNot: 'Rüzgârda ses veren ve hafif şeyleri sever; kuleyi kirleten ağır madenleri istemez.',
  severSoz: '"Bu bir nota gibi... Teşekkür ederim."', sevmezSoz: '"Bunun tozu çanlarımı susturur."',
  gorevler: [
    { id: 'KUZ-01', ad: 'Kule basamaklarındaki rüzgâr kilidi', tur: 'hiyerarsi', k: 0, puan: 0,
      durum: 'Zeris Dış Kulesi\'nin üst gözlem balkonu yıkılmış; merdivenle çıkılamıyor.',
      hikaye: ['Mirelza rüzgârın içinden sesleniyor: "Balkonda Halyon gözcülerinin aynası var. Oraya çıkabilen kuzeyin dostudur."'],
      cozum: 'Hafif Süzülme ve Canlı Sarmaşık ile duvardan tırman ya da havayı fırtınaya çevirip Rüzgâr Uçuşu ile doğrudan çık.',
      bulmaca: { hava: 0, dugumler: [D('balkon', 'Yıkık gözlem balkonu', 0, 'ruzgar', 'Merdivenin bittiği yerde uğuldayan bir boşluk.', [['suzulme', 'sarmasik'], ['hava_firtina', 'ruzgar_ucusu'], ['aether_adimi']], 'Balkona çıktın; Halyon aynası rüzgârla parlıyor.')] },
      secimler: [S('Aynayı Mirelza için yeniden çevir', { mirelza: 40, g_kuzey: 10 }, 'Mirelza\'nın sesi ilk kez yumuşuyor: "Rüzgârda uçmayı sana ben öğreteyim."', { odul: { ogret: ['ruzgar_ucusu'] } })] },
    { id: 'KUZ-02', ad: 'Donmuş çanların akordu', tur: 'bag', k: 3, once: ['KUZ-01'], puan: 20,
      durum: 'Kuledeki buz tutmuş rüzgâr çanları yanlış ses veriyor; Mirelza\'nın başı ağrıyor.',
      hikaye: ['Mirelza şakaklarını ovuyor: "Dört notalı kuzey melodisi bu çanlarla çalınırdı. Şimdi kırık bir hıçkırık gibi."'],
      cozum: 'Kıvılcım Dalgası ile buzları çöz, Ses ve Yankı Düğümü ile dört notalı melodiyi düzelt.',
      bulmaca: { dugumler: [
        D('buz', 'Buz tutmuş çanlar', -0.3, 'buz', 'Çanların ağzı buzla dolu.', [['kivilcim']], 'Buz eriyip damladı.'),
        D('melodi', 'Dört notalı kuzey melodisi', 0.4, 'kristal', 'Çanlar akortsuz çalıyor.', [['yanki_dugumu'], ['frekans_anahtari']], 'Dört nota sırayla, temiz çaldı.', { on: ['buz'] }),
      ] },
      secimSoru: 'Melodi bitince Mirelza konuşmaya başlıyor. Ne diyeceksin?',
      secimler: [
        S('"Bu şarkıyı sana kim öğretti?"', { mirelza: 30 }, '"Annem. Halyon gözcülerinin son şarkıcısıydı. Ben de YGK\'ya o şarkıyla girdim; o şarkıyla kovuldum."'),
        S('"Çanlar artık sessiz kalmasın."', { mirelza: 20 }, 'Mirelza başını sallıyor; rüzgâr çanları usulca çalıyor.'),
      ] },
    { id: 'ZIN-02', ad: 'Kat -4\'ün gizli belgesi', tur: 'zincir', k: 4, once: ['KUZ-01'], puan: 0, bolge: 'kuzey',
      durum: 'Kat -4\'te, stasis hücrelerinin arkasında Başkentin gizli bir proje belgesi bulunuyor.',
      hikaye: ['Mirelza: "Kat -4\'te bir kasada Halyon gözcülerinin neden dağıtıldığını yazan belge var. Onu bana getir; ya da Konsey\'e teslim et ve sadakatini göster. Seçim senin."', 'Kasa üç katmanlı bir rezonans mührüyle kapalı.'],
      cozum: 'Hakikat Yankısı ile mührü çöz ya da Frekans Anahtarı ve Devre Kıvılcımı ile kilidi aç.',
      bulmaca: { dugumler: [D('kasa', 'Kat -4\'ün mühürlü kasası', 0, 'elektrik', 'Üç katmanlı bir rezonans mührü vınlıyor.', [['hakikat_yankisi'], ['frekans_anahtari', 'devre']], 'Mühür çözüldü; içinde mühürlü bir belge.')] },
      secimSoru: 'Belgeyi kime vereceksin?',
      secimler: [
        S('Valen\'e teslim et', { valen: 20, mirelza: -10, g_ygk: 15 }, 'Valen belgeyi mühürlüyor: "Sadakat unutulmaz." YGK itibarın yükseldi; Mirelza bir süre sana küs.', { kosul: (d) => !d.bayrak.valenKapali }),
        S('Morvenna\'ya teslim et (Konsey vekili)', { morvenna: 20, mirelza: -10, g_ygk: 15 }, 'Morvenna belgeyi Konsey arşivine kaldırıyor. YGK itibarın yükseldi.', { kosul: (d) => !!d.bayrak.valenKapali }),
        S('Mirelza\'ya sızdır', { mirelza: 35, valen: -15, g_kuzey: 15, g_ygk: -10 }, 'Mirelza belgeyi okurken rüzgâr susuyor. Valen seni sorgulatacak; ama Zeris\'te Kuzey Rüzgârı Uçuşu yolu hızla açıldı.', { bayrak: ['kuzeyRuzgariHizli'], odul: { ogret: ['ruzgar_ucusu'] } }),
      ] },
    { id: 'KUZ-05', ad: 'Norvask gözcülerini dağıtma', tur: 'hiyerarsi', k: 5, once: ['KUZ-01'], puan: 30,
      durum: 'Kuzey sınırındaki dar geçidi Norvask gözcüleri tutmuş; Mirelza kan dökmeden geçidi boşaltmak istiyor.',
      hikaye: ['Mirelza: "Norvask\'lar soğuktan korkar. Kan dökme; kuzeyin havası onları kendisi kovsun."'],
      cozum: 'Havayı kademe kademe soğutup Şiddetli Boran çıkararak kampı dağıt ya da Yoğun Sis indirip mührü gizlice kapat.',
      bulmaca: { hava: 0, dugumler: [D('gecit', 'Norvask gözcülerinin kampı', 0, 'ruzgar', 'Kamp ateşi, nöbetçilerin konuşmaları.', [['hava_boran'], ['hava_sis']], 'Gözcüler kampı bırakıp güneye çekildi.')] },
      secimler: [S('Geçidi Zeris\'e teslim et', { mirelza: 25, g_kuzey: 10 }, 'Mirelza geçide bir rüzgâr çanı asıyor: "Bu çan çaldıkça burası bizim."')] },
    { id: 'KUZ-06', ad: 'Sürgünün son şarkısı', tur: 'bag', k: 8, once: ['KUZ-02'], puan: 60,
      durum: 'Fırtına gecesi Mirelza YGK\'dan neden kovulduğunu ilk kez bütün açıklığıyla anlatıyor.',
      hikaye: [
        'Kulenin tepesinde fırtına uğulduyor. Mirelza bir çanı avucunda tutuyor: "Kat -5\'te bir deney vardı. Sesle boyut açmayı deniyorlardı. Bana şarkı söyletiyorlardı; şarkım duvarları inceltiyordu."',
        '"Bir gece duvarın ardından bir ses cevap verdi. Kaçtım, raporladım. Ertesi sabah Konsey beni hayalci ilan edip kovdu. Deneyi gömdüler; şarkımı da benimle birlikte."',
        '"O sesi hâlâ duyuyorum. Rüzgâr dindiğinde, kulemde."',
      ],
      cozum: 'Zihin Arındırma ve Lumina salımıyla geçmişin yankısını dindir.',
      bulmaca: { dugumler: [D('yanki', 'Duvarın ardından gelen yankı', 0, 'fisilti', 'Fırtınanın içinde boğuk bir cevap sesi.', [['zihin_arindirma', 'lumina_salim'], ['zihin_arindirma', 'yanki_dugumu']], 'Yankı sustu; yalnız rüzgâr kaldı.')] },
      secimler: [S('Şarkıyı birlikte bitir', { mirelza: 40 }, 'Mirelza son notayı söylüyor; fırtına diniyor. "Yıllardır ilk kez kendi sesimi duydum."', { bayrak: ['mirelzaSarki'] })] },
  ],
  sohbetler: [
    { k: 1, ad: 'Rüzgârın notası', soz: 'Mirelza: "Rüzgâr bugün hangi notada esiyor, duyabiliyor musun?"',
      secenekler: [O('Bir süre dinle, sonra "Pes bir la" de.', 20, '"Kulağın var."'), O('"Rüzgâr nota bilmez."', -5, 'Kuleye dönüp susuyor.')] },
    { k: 5, ad: 'Konsey', soz: 'Mirelza: "Konsey senin için ne ifade ediyor? Düzen mi, kafes mi?"',
      secenekler: [O('"İkisi de; dengesi önemli."', { erken: 15, gec: 30, esik: 6 }, '"Denge... rüzgâr da öyle der."'), O('"Kafes."', 20, 'Acı bir gülüş.'), O('"Düzen."', 0, '"Senin düzenin benim sürgünümdü."')] },
  ],
  kademeEtki: (d, k) => {
    if (k === 6) d.bayrak.kuzeyUcus = true;
    if (k === 10) { d.bayrak.kuzeyAstralGecit = true; gucEkle(d, 'kuzey', 15); }
  },
  imza: { selam: 'Rüzgâr seni önceden haber verdi.', tesekkur: 'Kuzey bunu şarkıyla anacak.', kizgin: 'Sesini rüzgâra karşı yükseltme!' },
  ortam: 'Kule tepesinde uğuldayan rüzgâr, donmuş çanların kırık tınısı ve uzak bir flüt.',
});

kisiEkle('kaelan', {
  ad: 'Kaelan', unvan: 'Helgar kara buz zırh ustası', nokta: 'k_kaelan', guc: 'kuzey', bolgeKisisi: true, yerAdi: 'Helgar Kara Buz Dükalığı', sinif: 'A',
  hiz: [[0, 10, 1]],
  hizMetni: 'Sınıf A: yüzde yetmiş beş görev; dövdüğün çelik konuşur.',
  kimlik: ['Erimeyen siyah buzu döven son büyük ustalardan; ocağı buzdan, örsü kara buzdan.', 'Az konuşur; her cümlesi bir çekiç vuruşu kadar ağır ve onurludur.'],
  kademeler: [
    'Örsün sesi: seni duymuyor bile.',
    'Su taşı: ocağa buz taşımana izin veriyor.',
    'Kara buz: buzun neden erimediğini anlatıyor.',
    'Helgar\'ın onuru: dükalığın şeref nöbetini anlatıyor.',
    'Ustanın eli: elini örsün üstünde tutmanı istiyor.',
    'Mavi rezonans: mavi taşı sana veriyor.',
    'Ocağın sırrı: buzu kızdırmanın yolunu gösteriyor.',
    'Ustasının mezarı: buzun altındaki mezarı gösteriyor.',
    'Ortak dövüm: aynı örste birlikte vuruyorsunuz.',
    'Onur kılıcı: dükalığın nöbet kılıcını sana gösteriyor.',
    'Kara buz muhafızı: heykel kilidini sana açıyor.',
  ],
  sosyal: [['Mirelza', 'Kuzeyin iki sürgünü; birbirlerine az konuşan bir saygı.', 'KUZ-04 ikisini birlikte çağırır.'], ['Başçavuş Drahmir', 'Drahmir onun ustalığını Filtra\'dan bilir.', '']],
  sever: ['demir_cevheri', 'komur', 'buzul_aether', 'dunya_cayi'], sevmez: ['bal', 'urun_kristal_cicek'],
  hediyeNot: 'Ocağı besleyen her şeyi sever; tatlı ve süs onun örsüne yakışmaz.',
  severSoz: '"Ocağa iyi gelir."', sevmezSoz: '"Bunu örse koyamam."',
  gorevler: [
    { id: 'KUZ-03', ad: 'Erimeyen kara buz kılıcı', tur: 'zincir', k: 3, puan: 0, bolge: 'kuzey',
      kosul: (d) => tasVar(d, 'mavi'), kosulMetni: 'kılıca mühürlemek için bir mavi taş gerekir (Flee Plee kadırgası ya da kıyının kayalık koyu)',
      durum: 'Kaelan, Helgar Dükalığı\'nın şeref nöbeti için kara buzdan bir görev kılıcı dövmeni istiyor.',
      hikaye: ['Kaelan örse bir kara buz kütlesi koyuyor: "Kılıç bana teslim edilecek; dükalığın nöbetçisi taşıyacak. Sen kuşanmayacaksın. Mavi taşı içine mühürle ki erimesin."'],
      cozum: 'Metal Şekillendirme ile kalıp, Buzul Mühür ile dondurma, Öz Bağlama ile mavi taşı kılıca mühürle.',
      bulmaca: { dugumler: [
        D('kalip', 'Kılıcın kalıbı', -0.4, 'metal', 'Kara buz biçimsiz bir kütle.', [['metal']], 'Kütle kılıç biçimini aldı.'),
        D('dondur', 'Kara buzun çekirdeği', 0, 'buz', 'Kılıç ocakta yumuşuyor.', [['buzul']], 'Kılıç simsiyah ve buz gibi sertleşti.', { on: ['kalip'] }),
        D('muhur', 'Kabzadaki taş yuvası', 0.4, 'kristal', 'Kabzada mavi taş için bir yuva.', [['oz_baglama']], 'Mavi taş kılıçla tek bir nefes gibi birleşti.', { on: ['dondur'] }),
      ] },
      secimler: [S('Kılıcı Kaelan\'a teslim et', { kaelan: 45, mirelza: 10, g_kuzey: 15, g_ygk: -5 }, 'Kaelan kılıcı nöbetçiye uzatıyor. Kuzey itibarın hızla yükseldi; ama Başkent Kuzey\'in büyüyle silahlanmasından şüphelenip bir denetçi gönderecek.', { bayrak: ['kuzeySilah', 'valenDenetim'], yap: (d) => { d.buyu.taslar.mavi = Math.max(0, (d.buyu.taslar.mavi || 0) - 1); } })] },
    { id: 'KUZ-04', ad: 'İkiz buz kapısı', tur: 'bag', k: 5, once: ['KUZ-03'], puan: 30,
      durum: 'Helgar buz mağarasındaki iki kol aynı anda çekilmeden maden odası açılmıyor.',
      hikaye: ['Kaelan ile Mirelza mağaranın ağzında. Kaelan: "Kollar on adım arayla. Ustam bu kapıyı bir yardımcıyla açardı." Mirelza: "Ya da muhafızla."'],
      cozum: 'Yankı İkizi bırakıp öbür kola koş ya da iki mavi ve bir kızıl taşla buz muhafız heykelini canlandır.',
      bulmaca: { dugumler: [D('kapi', 'İkiz buz kapısı', 0, 'buz', 'İki uzak kol; yanında buzla kaplı bir muhafız.', [['yanki_ikizi'], ['heykel']], 'Kapı çatırdayarak açıldı.', { tas: { mavi: 2, kizil: 1 } })] },
      secimler: [S('Maden odasını Kaelan ile paylaş', { kaelan: 25, mirelza: 15 }, 'Odada kara buz ve mavi aether damarları.', { odul: { esya: { buzul_aether: 3 } } })] },
  ],
  sohbetler: [
    { k: 2, ad: 'Ocak', soz: 'Kaelan: "Buz ocakta kızarmaz, kararır. Neden biliyor musun?"',
      secenekler: [O('"Bilmiyorum, anlat."', 20, 'Kısa ama uzun bir cevap.'), O('"Büyüyle mi?"', 5, '"Hayır; sabırla."')] },
  ],
  kademeEtki: (d, k) => {
    if (k === 5) BY.tasEkle(d, 'mavi', 1);
    if (k === 10) { BY.tasEkle(d, 'mor', 1); d.bayrak.karaBuzMuhafiz = true; }
  },
  imza: { selam: 'Ocak sıcak. Gir.', tesekkur: 'Onurlu bir iş.', kizgin: 'Örsüme dokunma!' },
  ortam: 'Kara buz örsüne inen ağır çekiç darbeleri, soğuk ocağın derin uğultusu ve çatlayan buz.',
});

kisiEkle('barracuda', {
  ad: 'Kaptan Barracuda', unvan: 'Fleeplee Toz Sahili korsan kaptanı', nokta: 'k_barracuda', guc: 'guney', bolgeKisisi: true, yerAdi: 'Flee Plee sahili', sinif: 'A',
  hiz: [[0, 10, 1]],
  hizMetni: 'Sınıf A: yüzde yetmiş görev; korsan sözü değil iş ister.',
  kimlik: ['Batık kadırgaların ve ışıldayan toz sahilinin kaptanı; bir gözü aether merceği.', 'Veradon gümrüğünden ve YGK kurallarından nefret eder; kendi kanunu vardır.'],
  kademeler: [
    'İskele: seni bir gümrük casusu sanıyor.',
    'İlk kadeh: rom yerine toz şurubu ikram ediyor.',
    'Kadırga hikâyesi: batık kadırgasının nasıl battığını anlatıyor.',
    'Veradon: gümrüğe olan kinini açıyor.',
    'Tayfa: tayfasıyla tanıştırıyor.',
    'Gizli koylar: Lumina ve Solis şişeleme koylarını gösteriyor.',
    'Kaçak devreler: Nyxara ile işlerini anlatıyor.',
    'Ölü tayfa: kaybettiği adamları anıyor.',
    'Korsan yemini: seni tayfanın onur üyesi sayıyor.',
    'Haritanın arkası: mor taşın izini anlatıyor.',
    'Mor taş ipucu: mor taşın yerini sana söylüyor.',
  ],
  sosyal: [['Nyxara Vel\'din', 'Kaçak teknoloji ortağı.', ''], ['Oronte', 'El altından parça değişimi.', '']],
  sever: ['bal', 'deniz_tuzu', 'kavrulmus_kahve', 'sise_solis'], sevmez: ['huzur_tutsusu', 'sakin_cay'],
  hediyeNot: 'Denizde işe yarayan, tatlı ya da patlayan şeyleri sever; sakinleştirici şeyleri uyuşukluk sayar.',
  severSoz: '"Ha! İşte korsan hediyesi!"', sevmezSoz: '"Beni uyutup gemimi mi çalacaksın?"',
  gorevler: [
    { id: 'GUN-01', ad: 'Parlayan toz koyları', tur: 'hiyerarsi', k: 0, puan: 0,
      durum: 'Flee Plee sahilindeki batık kadırganın ambarı görünmez bir aether mührüyle kapalı.',
      hikaye: ['Barracuda sahilde yürüyor: "Ambarda babamın haritaları var. Mühür görünmüyor; görünmeyeni kıramazsın, değil mi büyücü?"'],
      cozum: 'Sahilden Lumina ve Solis tozu şişele; Lumina ile mührü görünür kıl, sonra bir Solis şişesini fırlatıp patlatarak kilidi kır.',
      bulmaca: { dugumler: [
        D('muhur', 'Görünmez aether mührü', -0.3, 'toz', 'Ambar kapağında bir vınlama; ama görünen bir şey yok.', [['lumina_salim']], 'Beyaz ışıkta mühür görünür oldu.'),
        D('kilit', 'Kadırganın kilidi', 0.4, 'metal', 'Paslı, ağır bir kilit.', [['solis_firlat'], ['kivilcim', 'tele_kaldirma']], 'Kilit patladı; ambar açık.', { on: ['muhur'] }),
      ] },
      secimler: [S('Haritaları Barracuda\'ya ver', { barracuda: 40, g_guney: 10 }, 'Barracuda haritaları göğsüne bastırıyor: "Sahilin gizli toz koyları artık senin de koyların."', { odul: { tas: { mavi: 1 }, sise: { lumina: 1, solis: 1 } }, bayrak: ['sahilSise'] })] },
    { id: 'GUN-05', ad: 'Veradon gümrük geçişi', tur: 'zincir', k: 4, once: ['GUN-01'], puan: 0, bolge: 'guney',
      durum: 'Barracuda Veradon gümrüğünden ilaç ve parça geçirmek istiyor.',
      hikaye: ['Barracuda: "Güney köylerinde ateşli bir hastalık var; ilaç sandıkları gümrükte. Memurlar rüşvet istiyor. Sis indirirsen sandıkları gece alırız."', 'Gümrük kulesinin defterinde bir şey kokuyor.'],
      cozum: 'Yoğun Sis ve buhar perdesi indirip gizlice geçir ya da Hakikat Yankısı ile gümrükteki sahte rüşvet kaydını ortaya çıkar.',
      bulmaca: { hava: 0, dugumler: [D('gumruk', 'Veradon gümrük kulesi', 0, 'su', 'Memurlar, mühürler ve kilitli ilaç sandıkları.', [['hava_sis', 'buzul', 'kivilcim'], ['hakikat_yankisi'], ['hava_sis']], 'Yolu açtın; sandıklar artık senin elinde.')] },
      secimSoru: 'Sandıkları nasıl geçireceksin?',
      secimler: [
        S('A) Korsan yolu: sisin içinde gizlice geçir', { barracuda: 35, g_ygk: -15 }, 'Sandıklar gece köylere ulaştı. Barracuda kahkaha atıyor; Başkentin gözünde yasal itibarın düştü.', { bayrak: ['gumrukKacak'] }),
        S('B) Açık çözüm: sahte rüşvet kaydını ortaya çıkar, yasal izin al', { barracuda: 10, g_guney: 25 }, 'Veradon valisi memurları görevden alıyor; ilaçlar resmî kervanla gidiyor. Barracuda söyleniyor ama sana saygıyla bakıyor.', { bayrak: ['gumrukYasal'] }),
      ] },
  ],
  sohbetler: [
    { k: 1, ad: 'Rom', soz: 'Barracuda: "Korsanla içen korsandır derler. İçer misin?"',
      secenekler: [O('"Bir yudum, dostluk için."', 15, 'Gürültülü bir kahkaha.'), O('"Görevdeyim."', 5, '"Sıkıcı!"')] },
  ],
  kademeEtki: (d, k) => {
    if (k === 5) { BY.siseEkle(d, 'lumina', 2); BY.siseEkle(d, 'solis', 2); }
    if (k === 10) { BY.tasEkle(d, 'mor', 1); d.bayrak.barracudaMorIpucu = true; }
  },
  imza: { selam: 'Ahoy! Gümrükçü değilsen gel.', tesekkur: 'Tayfamın en iyisi!', kizgin: 'Beni Veradon memuru gibi kandırma!' },
  ortam: 'Kuma vuran dalgalar, ışıldayan tozun cızırtısı, gıcırdayan kadırga halatları.',
});

kisiEkle('nyxara', {
  ad: 'Nyxara Vel\'din', unvan: 'Arin\'den sürgün baş mucit', nokta: 'k_nyxara', guc: 'guney', bolgeKisisi: true, yerAdi: 'Tentran, Aether-Dock', sinif: 'B',
  hiz: [[0, 10, 1]],
  hizMetni: 'Sınıf B: yarı sohbet, yarı görev.',
  kimlik: ['Uçan Arin Adası\'nın eski baş mucidi; Arin-Malken hibrit deneyleri yüzünden sürgün edildi.', 'Tentran platformunda kaçak bir atölye kurmuş; serbest bilimin son kalesi.'],
  kademeler: [
    'Atölye kapısı: seni Konsey müfettişi sanıyor.',
    'Devre takası: bir devre parçasını incelemeni istiyor.',
    'Arin\'in gölgesi: adadan neden ayrıldığını üstü kapalı söylüyor.',
    'Aethelgard: elçisinin bile açamadığı kapsülden bahsediyor.',
    'Serbest bilim: Konsey kurallarına neden uymadığını anlatıyor.',
    'Tixie\'nin devresi: Tixie ile uzaktan çalıştığını söylüyor.',
    'Gizli Arin projeleri: Hibrit Çözücü ile açılan projeleri gösteriyor.',
    'Sürgün gecesi: Arin\'den kovulduğu geceyi anlatıyor.',
    'Gönderilmemiş mektup: bir mektuptan bahsediyor.',
    'Çekirdek asa: Çekirdek Yıldız Asası\'nın şemasını açıyor.',
    'T3 onayı: Çekirdek Yıldız Asası\'nı mühürlemene onay veriyor.',
  ],
  sosyal: [['Tixie', 'İki sürgün tekno-dahi.', 'TIX-03 verisi GUN-03\'ü kolaylaştırır.'], ['Kaptan Barracuda', 'Kaçak teknoloji ortağı.', ''], ['Elyndra Val-Tarek', 'Elyndra onu bilimsel olarak kıskanır.', '']],
  sever: ['piezo', 'rezonans_lambasi', 'gumus_tozu', 'kavrulmus_kahve'], sevmez: ['ekmek', 'huzur_tutsusu'],
  hediyeNot: 'Atölyede işe yarayan her şeyi sever.',
  severSoz: '"Bu iletkenliği görüyor musun? Mükemmel."', sevmezSoz: '"Atölyeme kırıntı istemem."',
  gorevler: [
    { id: 'GUN-02', ad: 'Uçan Arin Adası\'na çıkış', tur: 'bag', k: 1, puan: 30,
      durum: 'Denizin onlarca metre üstünde asılı Arin Adası\'ndaki eski tapınağa gemisiz çıkılması gerekiyor.',
      hikaye: ['Nyxara: "Tapınakta eski bir Arin şeması var; benim imzam altında. Oraya gemiyle çıkarsan muhafızlar görür."'],
      cozum: 'Rüzgâr Uçuşu ile doğrudan uç ya da Geçici Işık Köprüsü ve Canlı Sarmaşık ile gökyüzü merdiveni kur.',
      bulmaca: { dugumler: [D('ada', 'Havada asılı ada', 0, 'ruzgar', 'Ada onlarca metre yukarıda; ters yerçekimi uğultusu.', [['ruzgar_ucusu'], ['isik_koprusu', 'sarmasik'], ['aether_adimi']], 'Tapınağın eşiğindesin.')] },
      secimler: [S('Şemayı Nyxara\'ya getir', { nyxara: 30 }, 'Nyxara şemayı okşuyor: "İmzam hâlâ orada."', { odul: { tas: { yesil: 1 } }, bayrak: ['arinSemasi'] })] },
    { id: 'GUN-03', ad: 'Kilitli Arin çekirdeği', tur: 'zincir', k: 4, once: ['GUN-02'], puan: 0, bolge: 'guney',
      kosul: (d) => kademe(d, 'nyxara') >= 6 || !!d.bayrak.tixieNyxara, kosulMetni: 'Nyxara ile kademe 6 ya da Tixie\'nin Oculon verisi (TIX-03) gerekir',
      durum: 'Nyxara, elçisi Aethelgard\'ın bile açamadığı hibrit bir Arin-Malken kapsülünü açarsan Hibrit Çözücü\'yü öğretecek.',
      hikaye: ['Nyxara kapsülü masaya koyuyor: "Üç kilit: devre, frekans, kalkan. Aethelgard ikincide takıldı."', (d) => (d.bayrak.tixieNyxara ? 'Tixie\'nin Oculon verisi kapsülün kalkan katmanını önceden haritalamış; Nyxara gülümsüyor: "O şımarık deha işimizi kolaylaştırdı."' : '')],
      cozum: 'Devre Kıvılcımı, Frekans Anahtarı ve Otonom Kalkan Aşırtma.',
      bulmaca: { dugumler: [
        D('devre', 'Birinci kilit: devre', -0.4, 'elektrik', 'Ölü bir devre.', [['devre']], 'Devre uyandı.'),
        D('frekans', 'İkinci kilit: frekans', 0, 'kristal', 'Kapsül yabancı bir frekansta titriyor.', [['frekans_anahtari']], 'Frekans eşlendi.', { on: ['devre'] }),
        D('kalkan', 'Üçüncü kilit: kalkan', 0.4, 'elektrik', 'Otonom bir kalkan kapsülü sarıyor.', [['kalkan_asirtma'], ['hakikat_yankisi', 'devre']], 'Kalkan aşıldı; kapsül açıldı.', { on: ['frekans'] }),
      ] },
      secimler: [S('Kapsülü Nyxara ile birlikte aç', { nyxara: 50, g_guney: 10, g_ygk: -10 }, (d) => 'Nyxara sana Hibrit Çözücü\'yü öğretiyor; tekno-büyün açıldı. Ama YGK kaçak Arin teknolojisini güçlendirdiğin için tepkili' + (d.bayrak.tixieNyxara ? '; Tixie bağlantısı yüzünden akademi denetimi sıkılaştı.' : '.'), { odul: { ogret: ['hibrit_cozucu'] }, yap: (d) => { if (d.bayrak.tixieNyxara) d.bayrak.akademiDenetim = true; } })] },
    { id: 'GUN-04', ad: 'Malazar Dağı\'nın mor şimşekleri', tur: 'hiyerarsi', k: 3, once: ['GUN-02'], puan: 30,
      durum: 'Malazar ocaklarının en alt galerisi mor şimşek fırtınası ve erimiş enerji akıntısıyla kapanmış.',
      hikaye: ['Nyxara: "Çekirdek Yıldız Asası\'nın bir parçası o galeride; eski bir Arin sandığında. Akıntıyı çevir, fırtınayı paratonere düşür."'],
      cozum: 'Sıvı Yönlendirme ile akıntıyı yan havuza çevir; Hava Kontrolü ile tepedeki fırtınayı tut ve paratoner sunağına Yıldırım Düşür.',
      bulmaca: { hava: 0, dugumler: [
        D('akinti', 'Erimiş enerji akıntısı', -0.3, 'lav', 'Mor bir akıntı galerinin ağzını kapatıyor.', [['sivi']], 'Akıntı yan havuza döndü.'),
        D('paratoner', 'Paratoner sunağı', 0.4, 'simsek', 'Tepede mor şimşekler; sunak boş.', [['yildirim_dusur'], ['yildirim_rez', 'kalkan_asirtma']], 'Şimşek sunağa düştü; galeri sustu.', { on: ['akinti'], tehlike: { kivilcim: { ceza: 10, soz: 'Kıvılcım şimşeği sana çekti!' } } }),
      ] },
      secimler: [S('Sandığı aç', { nyxara: 25, barracuda: 10 }, 'Sandıktan mor bir taş, avuç avuç Malazar büyü tozu ve Çekirdek Yıldız Asası\'nın bir parçası çıkıyor.', { odul: { tas: { mor: 1 }, esya: { malazar_buyu_tozu: 3 } }, bayrak: ['t3Parca'] })] },
    { id: 'GUN-06', ad: 'Sürgün mucidin mektubu', tur: 'bag', k: 8, once: ['GUN-03'], puan: 60,
      durum: 'Nyxara, Arin\'den sürgün edilmeden önce yazdığı ama hiç gönderemediği mektubu paylaşıyor.',
      hikaye: [
        'Atölyenin ışıkları kısık. Nyxara sararmış bir zarfı açıyor: "Kızıma yazdım. Adada kaldı; sürgünle birlikte adım da silindi. Mektubu göndermeye cesaret edemedim."',
        '"Hibrit deneyleri onun için yaptım. Arin\'in çocukları yükseklik hastalığıyla doğuyordu; Malken kristali bunu iyileştirebilirdi. Konsey buna sapkınlık dedi."',
        '"Şimdi onu sana veriyorum. Bir gün adaya çıkarsan, belki..." Cümlesini bitiremiyor.',
      ],
      cozum: 'Mektubu Öz Bağlama ile bir hatıra kristaline mühürle.',
      bulmaca: { dugumler: [D('mektup', 'Sararmış mektup', 0, 'kristal', 'Kâğıt ufalanmak üzere.', [['oz_baglama'], ['lumina_salim', 'zihin_arindirma']], 'Mektup ışıklı bir kristale dönüştü; hiç solmayacak.')] },
      secimler: [S('Kristali Arin Adası\'na götürmeye söz ver', { nyxara: 40 }, 'Nyxara gözlerini siliyor: "Asanı getir. Çekirdek Yıldız Asası\'nı birlikte mühürleyelim."', { bayrak: ['nyxaraMektup'] })] },
  ],
  sohbetler: [
    { k: 1, ad: 'Serbest bilim', soz: 'Nyxara: "Konsey bilime izin verir; ama yalnız kendi izin verdiği kadar. Sence bilim kimin malı?"',
      secenekler: [O('"Kimsenin; herkesin."', 20, '"Doğru cevap."'), O('"Konsey\'in; düzen gerek."', -5, 'Kaşlarını çatıyor.')] },
  ],
  kademeEtki: (d, k) => {
    if (k === 6) d.bayrak.arinProjeleri = true;
    if (k === 10) d.bayrak.nyxaraT3Onay = true;
  },
  imza: { selam: 'Atölye açık; bir şeye dokunma, patlar.', tesekkur: 'Serbest bilim senin sayende yaşıyor.', kizgin: 'Konsey müfettişi gibi davranma!' },
  ortam: 'Atölye tezgâhında vızıldayan devreler, kaynak cızırtısı ve platformun altından gelen deniz.',
});

// Paket 2 bölüm 2.1 ve Paket 6B: Çekirdek Yıldız Asası (T3) Tonoflenya'da çekirdek taşı ve saf aetherle, Nyxara'nın yanında
// mühürlenir. Asa T2 olmalı; GUN-04'ün asa parçası ve GUN-06 (ya da Nyxara kademe 10) gerekir.
export const T3_BEDELI = { cekirdek_tasi: 1, saf_aether: 1 };
export function t3Durumu(d) {
  if (!d.buyu || d.buyu.asa >= 3) return 'tamam';
  if (d.buyu.asa < 2) return 'Önce YGK Rezonans Asası (ikinci kademe) gerekir: üç kürsü sınavı ya da Kefius onayı.';
  if (!d.bayrak.t3Parca) return 'Malazar ocaklarındaki asa parçası gerekir (GUN-04).';
  if (!(d.bayrak.nyxaraMektup || d.bayrak.nyxaraT3Onay)) return 'Nyxara\'nın onayı gerekir (GUN-06 ya da kademe 10).';
  const eksik = Object.keys(T3_BEDELI).filter((k) => ZN.miktar(d, k) < T3_BEDELI[k]);
  if (eksik.length) return 'Gerekenler: bir çekirdek taşı (maden kat 26 ve altı) ve bir arıtılmış saf aether. Eksik: ' + eksik.map((k) => ZN.adi(k)).join(', ') + '.';
  return null;
}
export function t3Yap(d) {
  const e = t3Durumu(d);
  if (e === 'tamam') return { metin: 'Asan zaten Çekirdek Yıldız Asası.' };
  if (e) return { metin: e, ses: 'red' };
  for (const k of Object.keys(T3_BEDELI)) ZN.ekle(d, k, -T3_BEDELI[k]);
  BY.asaYukselt(d, 3);
  kayit(d, 'nyxara');
  return { metin: 'Nyxara çekirdek taşını asanın ucuna oturtuyor; saf aether damar damar akıyor. Asan artık Çekirdek Yıldız Asası: bütün büyülerde odak yüzde yirmi beş az.', efekt: 'by_asa_uyanis' };
}
KISI_EKLERI.push((d, id) => {
  if (id !== 'nyxara' || !d.buyu || d.buyu.asa >= 3 || !d.bayrak.t3Parca) return [];
  return [{ id: 't3', etiket: 'Çekirdek Yıldız Asası\'nı mühürle', ipucu: t3Durumu(d) || 'Hazır: bir çekirdek taşı ve bir saf aether.', yap: (z) => t3Yap(z), geri: true }];
});
