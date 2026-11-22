// Tonoflenya büyük final görevleri (belgeler/tonoflenya-buyuk-final-gorevleri.md): yirmi ana operasyon, mühür
// sekansları, Lord Sharon ve Cahelon. Saf JavaScript.
//
// Akış (her görev): görev yerindeki nokta "Görev N: …" → giriş sahnesi (ekran okuyucu dizini: [Görev] - [Konum] -
//   [Tehlike] - [Gerekli jest], belge 3.3) → yüzey operasyonu (operasyon.js; yuzey: true: hasar kaptanın
//   dayanıklılığına; biterse geri çekilinir, yeniden denenir) → gerekirse akustik çatışma (savas.js) → karar sahnesi
//   (dallanan kararlar) → ödül. Görevler sırayla açılır.
// Durum: d.tf = { aktif, evre ('giris'|'op'|'savas'|'karar'), biten [no], karar { no: 'A'|'B' }, rez [halka] (Görev 2),
//   catlak (titanların bedenindeki çatlak yüzdesi), unvan [], guven { kefius, valen, halk } }.
//   d.opBekle / d.savasBekle: sahne kapanınca gorevler.zamanIlerle operasyonu ya da çatışmayı başlatır.
import { OPERASYONLAR } from '../veri/uzayGorevleri';
import { F_NOKTALAR } from './finalHarita';
import * as ZN from './zanaat';
import * as SB from './subay';
import * as KR from './karakter';

const A = (tur, ad, giris, bitis, ek) => ({ tur, ad, giris, bitis, ...(ek || {}) });

// Görev yadigârları ve ödül eşyaları (zanaat.js ESYA'ya eklenir)
Object.assign(ZN.ESYA, {
  kidemli_brove: { kat: 5, ad: 'YGK Kıdemli Kaptan Brövesi', tarif: 'Akademinin kıdemli kaptanlarına verilen gümüş rozet; iskele bakımında yüzde elli indirim.' },
  gizli_parsomen: { kat: 5, ad: 'Kefius\'un gizli büyü parşömeni', tarif: 'Kara işaretlerin okunuşu; Kefius\'tan bir güven nişanesi.' },
  sehir_berati: { kat: 5, ad: 'Malkenia Şehir Teşekkür Beratı', tarif: 'Altı halkanın kalkanını akortlayan kaptana.' },
  tenos_fermani: { kat: 5, ad: 'Kral Tenos\'un Son Fermanı', tarif: 'Yasak arşivden çıkan ses kaydı: kralın son sözleri.' },
  lonca_nisani: { kat: 5, ad: 'Madenciler Loncası Nişanı', tarif: 'Malazar madencilerinin bakır nişanı.' },
  titan_kemigi: { kat: 5, ad: 'Taşlaşmış Titan Kemik Parçası', tarif: 'Sıfır noktası fayından; Alt Evren savaşından kalma, hâlâ ılık bir kemik. Egzotik laboratuvar inceleme öğesi.' },
  kseno_sedef: { kat: 3, ad: 'Kseno-sedef', tarif: 'Fenrir batıklarından ışıldayan sedef; pazarlarda iyi para eder.', deger: 20 },
  nabiz_kaydi: { kat: 5, ad: 'Koruyucuların Nabız Kaydı', tarif: 'Arin gözlemevinin monolitinden: yerin binlerce kilometre altından gelen çift kalp atışı.' },
  col_tomari: { kat: 5, ad: 'Antik Çöl Büyüsü Tomarı', tarif: 'Dikilitaşların altından; rüzgârı okumayı öğreten tomar.' },
  kseno_baharat: { kat: 3, ad: 'Kseno-baharat', tarif: 'Doğu kantonlarının baharatı.', deger: 5 },
  tyzrakhel_parcasi: { kat: 5, ad: 'Tyzrakhel Mızrağının Parçası', tarif: 'Rahip Malok\'tan: Lord Sharon\'un kritik zayıflığı. Dünya Çivisi savaşında mızrak bununla saplanır.' },
  harees_taci: { kat: 5, ad: 'Kraliçe Harees\'in Tacı', tarif: 'Kara Göl krateri tabanından antik kraliyet yadigârı.' },
  kirmizi_muhur: { kat: 5, ad: 'Kırmızı Mühür Parçası', tarif: 'Varek\'in kan fırtınasında Runahar\'ın göğüs kafesinden; titanın uyanışını geciktirir.' },
  kara_plazma: { kat: 5, ad: 'Kara Plazma Çekirdeği', tarif: 'Kahergonat zırhlılarının yüreği; YGK laboratuvarına emanet.' },
  onur_kilici: { kat: 1, yuva: 'silah', ad: 'Kraliyet Onur Kılıcı', tarif: 'Tenohris kuşatmasının kahramanına IV. Bagrius\'tan.', etki: 'Birincil atış iki kat; karanlık düşmanlara bir buçuk kat daha.' },
  zirve_brovesi: { kat: 5, ad: 'Kozmik Seyrüsefer Zirve Brövesi', tarif: 'Hiper-uzay koridorunu geçen kaptana.' },
  ygk_muhru: { kat: 5, ad: 'YGK Kayıt Mührü', tarif: 'Akademinin mührü: YGK Kat 1-5 ve şehir pazarlarına erişim izni.' },
  tyzrakhel_mizragi: { kat: 1, yuva: 'silah', ad: 'Tyzrakhel Işık Mızrağı', tarif: 'Rahip Malok\'un mızrak parçası ve astral kulenin prizması birleşince: Lord Sharon\'un ölümsüz gölge zırhını yaran ışık.', etki: 'Birincil atış iki buçuk kat, karanlık düşmanlara iki kat daha; gölge zırhını yarar.' },
  efsanevi_reaktor: { kat: 2, yuva: 'reaktor', ad: 'Efsanevi Aether Reaktörü', tarif: 'Dünya Çivisi savaşından sonra Akademinin hediyesi.', etki: 'Yakıt tüketimi yarı; savaşta verilen hasar yüzde yirmi beş fazla.' },
});

// --- Yirmi görev ---
// tehlike 1-5, jest: ekran okuyucu dizininin gerekli jesti; nokta: görevin başladığı yer; op: operasyon adımları;
// savas: operasyondan sonra çatışma; kararlar: [{ etiket, sonuc, yap(d) }]; odul(d) → ödül metni
export const GOREVLER = [
  {
    no: 1, ad: 'Sürgünün Sonu ve Yıldız Odası Raporu', konum: 'YGK Akademi, Kat 6, Yüksek Konsey Salonu', nokta: 'konsey_salonu', tehlike: 1, jest: 'iki parmakla sola kaydırma ve basılı tutma',
    veren: 'Baş Yönetici Valen Lazeria ve Antik Büyü Ustası Kefius Arateon',
    kosul: (d) => !!d.bayrak.ygkKayit, kosulMetni: 'Önce kabul masasına kendini bildir.',
    giris: [
      'Telsizden binlerce Malken öğrencisinin alkışı ve ilahisi geliyor; ama sağ kulağında Valen Lazeria\'nın sesi tok ve ciddi: "Evrenin öte ucundan sağ döndün, Kaptan. Ancak yıldızlarımız eski huzurunda değil."',
      'Sol kulağına Kefius Arateon\'un fısıltısı, kadim bir rezonansla karışıyor: "Getirdiğin verilerde bir şey var. Bir karanlık."',
      'Arka planda mırıldanan korolar, uzaktan geçen gemilerin iyon fısıltısı, kule camlarına vuran gümüşi rüzgâr.',
    ],
    op: [
      A('kademeli', 'Veri çekirdeği aktarımı', 'Aethelis-IV\'ün ve keşfettiğin gezegenlerin verilerini kristal konsola yükle: iki parmakla sola kaydır, üç kez.', 'Veriler konsolda.', { n: 3, yon: 'sol', parmak: 2 }),
      A('sonar', 'Ses spektrumunu dinle', 'Yıldız Odası\'ndaki anormal titreşimi duymak için ekrana basılı tut.', 'Spektrumun dibinde, kayıtlarda olmaması gereken bir kara kod titriyor.'),
      A('refleks', 'Güvenlik duvarı', 'Kara kod sızıyor! Alarm tonunu duyar duymaz tek dokunuşla güvenlik duvarını kilitle.', 'Sızıntı mühürlendi.', { n: 2 }),
    ],
    kararlar: [
      { etiket: 'Verilerin hepsini halka açık arşive sun', sonuc: 'Malkenia\'nın halkı coşuyor; itibarın arttı.', yap: (d) => { d.itibar += 40; guven(d).halk += 20; } },
      { etiket: 'Önce Kefius kara işaretleri gizlice incelesin', sonuc: 'Kefius bir süre susuyor; sonra mühürlü bir parşömen uzatıyor. Güveni arttı.', yap: (d) => { guven(d).kefius += 30; ZN.ekle(d, 'gizli_parsomen', 1); } },
    ],
    odul: (d) => {
      d.para.ml += 500;
      d.para.gk += 100;
      ZN.ekle(d, 'ygk_muhru', 1);
      ZN.ekle(d, 'kidemli_brove', 1);
      const kadro = KR.seckinKadro(d);
      return '500 Malken Lirası, 100 Galaktik Keşif Kredisi, YGK Kayıt Mührü (Akademi Kat 1-5 ve şehir pazarlarına erişim) ve YGK Kıdemli Kaptan Brövesi; Akademinin hangarında tamir yüzde elli indirimli.' + (kadro ? ' Altı YGK Seçkin Subayı, Elyndra, Varek, Axira, Zhaor, Sinha ve Başçavuş Drahmir, resmen komuta kadronda.' : '');
    },
  },
  {
    no: 2, ad: 'Altı Halkalı Savunma Kalibrasyonu', konum: 'Malkenia, altı halka', nokta: 'rezonator_zhaor', tehlike: 2, jest: 'iki parmakla çevirme',
    veren: 'Başkent Savunma Mareşali Elyon Vane',
    giris: [
      'Mareşal Elyon Vane: "Halkaların kalkan rezonatörlerinde faz kayması var, Kaptan. Altı yıldızın enerjisi kalkanlara eşit dağılmıyor."',
      'Her halkada bir rezonatör: Zhaor\'un gümüşi tiz çınlaması, Varek\'in kalın bas zonklaması, Axira\'nın melodik rüzgâr fısıltısı. Her birinde referans sesini dinleyip iki parmakla çevirerek kalkan tonunu eşle; altısı bitince Mareşal\'e karar ver.',
    ],
    rezonator: true,
    kararlar: [
      { etiket: 'Enerjiyi dış halkalara, halk pazarlarına yönlendir', sonuc: 'Pazarlar aydınlık; halk sana minnettar.', yap: (d) => { guven(d).halk += 20; d.itibar += 20; } },
      { etiket: 'Enerjiyi iç halkada Tenohris Sarayı\'na yoğunlaştır', sonuc: 'Saray kalkanı kusursuz; Meclis memnun.', yap: (d) => { guven(d).valen += 20; d.itibar += 20; } },
    ],
    odul: (d) => {
      d.bayrak.tf_kalkan = true;
      ZN.ekle(d, 'sehir_berati', 1);
      return 'Gemi kalkan kapasitesi yüzde on arttı; Malkenia Şehir Teşekkür Beratı.';
    },
  },
  {
    no: 3, ad: 'Akademi Dehlizlerinde Sızıntı', konum: 'YGK Akademi, Kat eksi 3, yasak kronikler ve kseno-arşiv', nokta: 'yasak_dolaplar', tehlike: 3, jest: 'ileri yürüme, üç parmakla basma, hedefe dokunma',
    veren: 'Kütüphane Muhafızı Archivist Oron',
    giris: [
      'Oron: "Hava kanallarından fısıltılar yükseliyor, Kaptan. Eski Axelum inancının mühürlü parşömenlerinin dolapları kendiliğinden titriyor."',
      'Damlayan su, eski metal rafların gıcırtısı; sağ ve sol kanallardan anlaşılmaz kadim fısıltılar.',
    ],
    op: [
      A('yaklas', 'Karanlıkta adım takibi', 'Fısıltının en yoğun olduğu yöne dön: sesi iki kulakta eşitle, sağa sola kaydır; yukarı kaydırıp ilerle.', 'Titreyen dolabın önündesin.', { mesafe: 30, frek: 150 }),
      A('muhur', 'Mühür basma', 'Parşömenin mor enerjisini toprakla: üç parmakla ekrana aynı anda bas.', 'Mor ışık söndü; mühür tuttu.'),
      A('nisan', 'Gölge parazitleri', 'İki gölge paraziti uyandı! Sesin geldiği yöne dön, sağa sola kaydır; tam önündeyken çift dokun: şok silahı.', 'İki parazit de dağıldı.', { n: 2 }),
    ],
    odul: (d) => {
      ZN.ekle(d, 'tenos_fermani', 1);
      d.koloni.kaynaklar.buyu_tozu = (d.koloni.kaynaklar.buyu_tozu || 0) + 250;
      kodeks(d, 'tenos_fermani', 'Kral Tenos\'un Son Fermanı', 'Yasak arşivden: "Sırtımdan vuran el benim değil, bir fısıltının elidir. Kara suyu mühürleyin; altındakini uyandırmayın."');
      return 'Kral Tenos\'un Son Fermanı ses kaydı (kodekste) ve 250 aether tozu.';
    },
  },
  {
    no: 4, ad: 'Aether Kristallerinin Ağlayışı', konum: 'Malazar Dağı, derin ocaklar', nokta: 'derin_ocak', tehlike: 3, jest: 'çatlama sesinde çift dokunma',
    veren: 'Baş Maden Mühendisi Bront',
    kosul: (d) => !!d.bayrak.zirveHizasi, kosulMetni: 'Önce Kefius\'un çağrısıyla Akademinin altıncı katında Zirve İğnesi\'ni hizala (Hikâye çağrıları).',
    giris: [
      'Bront: "İşçiler aletleri bıraktı. Kristallerden melodi yerine tiz bir ağlama geliyor; madencilerin burnundan siyah kan damlıyor."',
      'Tünellerde derin kazma sesleri; araya yüksek frekanslı kristal inlemeleri giriyor. Maden derinliği sekiz yüz metre.',
    ],
    op: [
      A('basinc', 'Sonik matkap', 'Matkap çalışıyor; kristalin gerilimi yükseliyor. Çatlama alarmını duyar duymaz çift dokun: matkabı kes. Geç kalırsan kristal patlar. Üç kez.', 'Siyah damar yerinde, kristaller sağlam.'),
    ],
    kararlar: [
      { etiket: 'Zehirlenen madencileri hemen yüzeye tahliye et', sonuc: 'Herkes sağ; ama kazı yavaşladı, kristallerin bir kısmı kayıp.', yap: (d) => { d.koloni.moral = Math.min(100, d.koloni.moral + 10); d.koloni.kaynaklar.saf_aether = (d.koloni.kaynaklar.saf_aether || 0) - 50; d.itibar += 20; } },
      { etiket: 'Kazıyı durdurma, siyah damarı hemen mühürle', sonuc: 'Kristaller kurtuldu; ama iki madenci ağır yaralı. Lonca bunu unutmayacak.', yap: (d) => { d.itibar = Math.max(0, d.itibar - 20); } },
    ],
    odul: (d) => {
      d.koloni.kaynaklar.saf_aether = Math.max(0, (d.koloni.kaynaklar.saf_aether || 0) + 150);
      ZN.ekle(d, 'lonca_nisani', 1);
      return '150 saf aether kristali, Madenciler Loncası Nişanı.';
    },
  },
  {
    no: 5, ad: 'Siyah Damar Kazısı', konum: 'Malazar Dağı, Sıfır Noktası Fayı (I. Bagrius\'un ilk kazı yeri)', nokta: 'sifir_fayi', tehlike: 3, jest: 'sağa sola zikzak kaydırma',
    veren: 'Kefius Arateon (telsiz aktarımı)',
    giris: [
      'Kefius telsizden: "Kristalleri zehirleyen bu kırık, Kaptan. Dağın dibinde Alt Evren savaşından kalma taşlaşmış bir kemiğe değiyor."',
      'Derinden ritmik, kalp atışı gibi bas darbeleri: dum... dum... dum...',
    ],
    op: [
      A('zikzak', 'Spektral ayırıcı', 'Siyah duman yayılıyor. Koruyucu bariyeri ör: sağa, sola, sağa… sırayla kaydır, altı kez.', 'Bariyer örüldü; duman kırığın içine geri çekiliyor.', { n: 6 }),
    ],
    odul: (d) => {
      ZN.ekle(d, 'titan_kemigi', 1);
      d.kaptan.tecrube += 1000;
      return 'Taşlaşmış Titan Kemik Parçası, 1000 tecrübe.';
    },
  },
  {
    no: 6, ad: 'Kadim Körüklerin Uyanışı', konum: 'Malazar zirvesi, terk edilmiş Bagrius dökümhanesi', nokta: 'bagrius_dokumhanesi', tehlike: 3, jest: 'üç parmakla aşağı kaydırma, ıslıkta çift dokunma',
    veren: 'YGK Baş Mühendisi Taelis',
    giris: ['Taelis: "Yaklaşan savaşa karşı zırhları güçlendirmeliyiz. I. Bagrius\'un dağ dökümhanesinin jeotermal körükleri yeniden ateşlenmeli."'],
    op: [
      A('kademeli', 'Buhar kolları', 'Dev buhar kollarını çek: üç parmakla aşağı kaydır, üç kez.', 'Kollar yerinde; körükler soluyor.', { n: 3, yon: 'asagi', parmak: 3 }),
      A('basinc', 'Ritmik tahliye', 'Buhar tahliye ıslığı yükseldiğinde çift dokun; üç kez.', 'Ocak kızıl; dökümhane yeniden çalışıyor.'),
    ],
    odul: (d) => {
      d.bayrak.tf_obsidyen = true;
      return 'Gemi zırhına Malazar obsidyen kaplaması: kinetik darbelere yüzde yirmi direnç.';
    },
  },
  {
    no: 7, ad: 'Flee Plee Sahilinde Telsiz Karartması', konum: 'Güney sahil, Flee Plee balıkçı yerleşkesi', nokta: 'miria_kulesi', tehlike: 2, jest: 'parmağı gezdirip çift dokunma',
    veren: 'Sahil Muhafız Kaptanı Miria',
    giris: [
      'Miria: "Fenrir\'in ışıldayan tozları söndü; deniz zifiri karanlık. Telsizler kör; yalnız derinden bir su fokurtusu."',
      'Kıyıya vuran toz dalgalarının köpüklü hışırtısı; uzakta deniz yaratıklarının boğuk çığlıkları.',
    ],
    op: [
      A('frekans', 'Lidar taraması', 'Parmağını yukarı aşağı gezdir: batığın üstüne gelince bipler hızlanır; orada çift dokun, kargoyu çıkar.', 'Batığın ambarı açıldı.', { cift: true }),
      A('frekans', 'İkinci batık', 'Bir batık daha; aynı yolla bul ve çift dokun.', 'Kargo kıyıda; telsizler yeniden konuşuyor.', { cift: true }),
    ],
    odul: (d) => {
      ZN.ekle(d, 'kseno_sedef', 80);
      d.bayrak.tf_deniz_haritasi = true;
      return '80 kseno-sedef ve Fenrir deniz haritası güncellemesi: deniz yolculukları kısalır.';
    },
  },
  {
    no: 8, ad: 'Deniz Üstü Teleportasyon Kenti Protokolü', konum: 'Tentran (Nadir-Port), yüzen tekno-kent', nokta: 'kaelen_platformu', tehlike: 3, jest: 'parmağı sağa sola sürükleyip iki tonu ortalama',
    veren: 'Baş Teknisyen Kaelen',
    giris: ['Kaelen: "Teleportasyon kapıları arızalı. Uzay istasyonundan inen silah konteynerleri boyutsal arafta asılı kaldı."'],
    op: [
      A('denge', 'Portal faz eşleme', 'Sol kulakta sinyal tonu, sağda portal vızıltısı. Sürükleyerek iki tonu tam merkezde birleştir.', 'Birinci konteyner arafta değil, iskelede.', { eksen: 'yatay' }),
      A('denge', 'İkinci portal', 'Bir kapı daha; aynı yolla.', 'Bütün konteynerler kurtarıldı.', { eksen: 'yatay' }),
    ],
    odul: (d) => {
      d.bayrak.tf_sicrayici = true;
      return 'Gemiye Boyutsal Atlama Sıçrayıcısı: savaşta acil kaçış yeteneği (yetenek listesinde).';
    },
  },
  {
    no: 9, ad: 'Uçan Arin Adası\'nın Kozmik Nabzı', konum: 'Fenrir Denizi, Uçan Arin Adası, Koruyucu Gözlemevi', nokta: 'arin_gozlemevi', tehlike: 4, jest: 'akustik it dalaşı; iki parmakla çevirme',
    veren: 'Valen Lazeria',
    giris: [
      'Valen: "Arin\'deki Koruyucu Gözlemevi kendiliğinden uyandı. Gezegen kurulurken konulan izleme kulesi bu."',
      'Şiddetli rüzgâr uğultusu, yerçekimi bozulma sesleri; yerin binlerce kilometre altından çift kalp atışı.',
    ],
    op: [A('rotasyon', 'Monolitin şifresi', 'Monolit üstünde: iki ya da üç parmakla saat yönünde kesintisiz çevir; çember dolunca şifre çözülür.', 'Şifre çözüldü. Monolit taranıyor...', { radyan: 10 })],
    savasOnce: true,
    savas: 'golge_kanat',
    savasMetni: 'Gözlemeve giderken Alt Evren hava yaratıkları adaya çullanıyor! Gemine koş: akustik it dalaşı.',
    sonrasi: (d) => {
      d.tf.catlak = 60;
      ZN.ekle(d, 'cahelon_anahtari', 1);
      return 'Monolitin taraması korkunç bir şey gösteriyor: Runahar ve Runashar\'ın taşlaşmış bedenlerindeki çatlaklar yüzde altmışa ulaşmış. Mekanizmanın kalbinden spiral dönen bir kristal anahtar çıkıyor: Cahelon Girdap Anahtarı.';
    },
    odul: (d) => {
      ZN.ekle(d, 'nabiz_kaydi', 1);
      d.itibar += 500;
      return 'Koruyucuların Nabız Kaydı, Cahelon Girdap Anahtarı, 500 evren itibarı.';
    },
  },
  {
    no: 10, ad: 'Kayıp Çöl Dikilitaşları', konum: 'Doğu çöl kantonları, Akrep Vadisi', nokta: 'akrep_vadisi', tehlike: 2, jest: 'rüzgârın tonunu dinleyerek yön bulma',
    veren: 'Çöl Loncası Reisi Şeyh Kasım',
    giris: ['Şeyh Kasım: "Dikilitaşlar kumun altına battı; kum fırtınası bütün pusulaları bozdu. Yalnız rüzgârın ıslığı yol gösterir: ton inceldikçe doğru yoldasın."'],
    op: [
      A('yaklas', 'Akustik pusula', 'Rüzgârın ıslığını iki kulakta eşitle; sağa sola kaydır, yukarı kaydırıp ilerle.', 'Birinci dikilitaşın tepesi ayağının altında.', { mesafe: 40, frek: 880 }),
      A('yaklas', 'İkinci dikilitaş', 'Islık yine yön değiştirdi; aynı yolla.', 'Dikilitaşlar kumdan çıkıyor; kantonlar seviniyor.', { mesafe: 40, frek: 990 }),
    ],
    odul: (d) => {
      ZN.ekle(d, 'col_tomari', 1);
      ZN.ekle(d, 'kseno_baharat', 300);
      return 'Antik Çöl Büyüsü Tomarı, 300 kseno-baharat.';
    },
  },
  {
    no: 11, ad: 'Münzevi Büyücünün Kehaneti', konum: 'Doğu kanyonları, Çökük Mağara', nokta: 'cokuk_magara', tehlike: 2, jest: 'üç tonu sırasıyla çalma',
    veren: 'Münzevi Rahip Malok (eski Axelum tarikatının sağ kalanı)',
    giris: ['Mağaranın dibinden yaşlı bir ses adını söylüyor: "Geldin demek, gezgin... Mancınığın fırlattığı Kızıl Yutucu\'yu ve gökten düşen beyaz küreyi yalnız ben hatırlarım. Rünlerin tonlarını tekrarla; hafızan sağlam mı görelim."'],
    op: [A('ton', 'Rünlerin hafızası', 'Basılı tut: üç ton çalar. Sonra sırayla: kalın aşağı kaydır, tiz yukarı kaydır, orta çift dokun.', 'Malok gülümsüyor; mağaranın duvarındaki rünler parlıyor.', { n: 3 })],
    odul: (d) => {
      ZN.ekle(d, 'tyzrakhel_parcasi', 1);
      return 'Tyzrakhel Mızrağının Parçası: Lord Sharon\'a karşı kritik zayıflık.';
    },
  },
  {
    no: 12, ad: 'Veradon Limanı Tahliye Hattı', konum: 'Veradon liman kasabası', nokta: 'liman_baskani', tehlike: 4, jest: 'tehdidin geldiği yana hızla kaydırma',
    veren: 'Liman Başkanı Varis',
    giris: [
      'Varis: "Deniz çekildi, yerini çamur ve kükürt aldı. Dış krallıklardan kaçan binlerce mülteci limanda sıkıştı. Gökten korsanlar ve gölge gemileri saldırıyor!"',
      'Mülteci gemilerinin motorlarını dinle; torpido hangi yandan gelirse kalkanını o yana sür.',
    ],
    op: [A('kacin', 'Taktiksel koruma', 'Torpido sesi hangi yandan gelirse kalkanı o yana sür: aynı yana hızla kaydır. Beş kez.', 'Mülteci gemileri açık denizde.', { n: 5, ayni: true })],
    savas: 'golge_gemisi',
    savasMetni: 'Son gölge gemisi kaçanların peşinde. Önünü kes!',
    odul: (d) => {
      d.koloni.nufus.toplam += 1200;
      d.koloni.nufus.barinma += 1200;
      d.itibar += 100;
      guven(d).halk += 30;
      return 'Koloni nüfusu bin iki yüz mülteci iş gücüyle büyüdü (çadır kentleriyle birlikte barınma); yüksek halk sadakati.';
    },
  },
  {
    no: 13, ad: 'Kara Suların Çekilişi', konum: 'Malkenia batısı, dipsiz Kara Göl krateri', nokta: 'krater_tabani', tehlike: 4, jest: 'bataklık sesinde yukarı kaydırma',
    veren: 'Kefius Arateon',
    kosul: (d) => !!d.bayrak.karaGolIzni, kosulMetni: 'Kara Göl\'e girmek için koruma mührü gerekir.',
    giris: [
      'Kefius: "Kara sular bir gecede yer altına çekildi. Kral Tenos ile Kraliçe Harees\'in parçalanmış saray kuleleri ve çamurda yatan devasa taş eller ortaya çıktı."',
      'Balçık fokurtuları, göl yatağında uğuldayan zehirli rüzgâr, metalik sürtünmeler.',
    ],
    op: [A('kacin', 'Çamurda ilerleme', 'Önünde derin bataklığın emme sesini duyunca hemen yukarı kaydır: zıpla. Dört kez.', 'Kraterin tabanındasın; çamurun içinde bir taç parlıyor.', { n: 4, yon: 'yukari' })],
    odul: (d) => {
      ZN.ekle(d, 'harees_taci', 1);
      ZN.ekle(d, 'runahar_tasi', 1);
      d.koloni.kaynaklar.aether = (d.koloni.kaynaklar.aether || 0) + 800;
      d.tf.catlak = Math.max(d.tf.catlak || 60, 70);
      return 'Kraliçe Harees\'in Tacı, 800 aether kristali ve saray enkazından Alt Evren rünleriyle oyulmuş soğuk bir silindir: Runahar Kara Mühür Taşı. Titanların çatlağı yüzde yetmiş.';
    },
  },
  {
    no: 14, ad: 'Kırmızı Yıldız Varek\'in Kan Fırtınası', konum: 'Kara Göl tabanı, Titan Runahar\'ın göğüs kafesi', nokta: 'runahar_gogsu', tehlike: 5, jest: 'iki parmakla basılı tutup dengede sabitleme',
    veren: '(Kendiliğinden)',
    giris: ['Kraterin dibine inince gökteki Kırmızı Yıldız Varek kan rengine bürünüyor. Taşlaşmış göğüs kafesinden siyah alevler fışkırıyor: Runahar uyanmak üzere.'],
    op: [
      A('tut', 'Ters kutup', 'Geminin plazma jeneratörünü ters kutba çevir: basılı tut.', 'Jeneratör ters kutupta.'),
      A('denge', 'Kozmik mühürleme', 'Varek\'in titreşimine karşı siyah alevleri bastır: sürükleyerek iki tonu birleştir ve sabit tut.', 'Siyah alevler söndü.', { eksen: 'dikey' }),
    ],
    odul: (d) => {
      ZN.ekle(d, 'kirmizi_muhur', 1);
      d.tf.catlak = Math.round((d.tf.catlak || 70) * 0.75);
      return 'Kırmızı Mühür Parçası; titanın uyanışı yüzde yirmi beş geciktirildi: çatlak yüzde ' + d.tf.catlak + '.';
    },
  },
  {
    no: 15, ad: 'Tyzrakhel Kulesi\'nin Astral Yankısı', konum: 'Kara Göl üzeri, astral düzlem geçişi', nokta: 'astral_gecit', tehlike: 3, jest: 'on saniye dokunmadan dinleme',
    veren: 'Rahibenin astral silueti',
    giris: ['Kral Tenos\'u sırtından vuran hain rahibenin astral hayaleti beliriyor. Ağlayarak af diliyor ve ihanetin arkasındaki Alt Evren fısıltısını anlatıyor: bir ses onun aklına girmiş, elini o ses yönetmiş.'],
    op: [A('sessizlik', 'Zihinsel odaklanma', 'Rahibenin uzattığı astral mızrak ucunu almak için on saniye ekrana hiç dokunma; yalnız nefes sesini dinle.', 'Mızrak ucu avucunda; ılık, saf bir ışık.', { sure: 10 })],
    odul: (d) => {
      d.bayrak.tf_astral = true;
      ZN.ekle(d, 'tyzrakhel_prizmasi', 1);
      return 'Saf astral ışık enerjisi: bütün gemi sistemlerine kalıcı yüzde on beş enerji (atış, fener, yakıt). Astral ışık kulesinin prizması: Tyzrakhel Işık Prizması.';
    },
  },
  {
    no: 16, ad: 'Kara Şehrin Uyanan Kuleleri', konum: 'Kuzeydoğu sınırı, Kahergonat', nokta: 'kara_kuleler', tehlike: 5, jest: 'akustik savaş',
    veren: 'Mareşal Elyon Vane ve Valen Lazeria',
    giris: [
      'Mareşal Elyon Vane: "Kaptan, Doğu dağlarının ardındaki Kahergonat kuleleri yüzyıllardır ilk kez kara aether ateşi yakıyor. Şehirde kimse yaşamıyor sanırdık ama gölge zırhlıları göğe yükseldi. Oraya ilk sen sızacaksın!"',
      'Kahergonat\'ın siyah sivri kuleleri göğe mor yıldırımlar fırlatıyor. Beş müridin birleşimi Lord Sharon, kulelerin tepesinde devasa bir gölge olarak yükseliyor; beş sesin üst üste bindiği metalik bir kahkaha.',
      'Metalik savaş boruları, binlerce Alt Evren yaratığının hırıltılı yürüyüşü, gök gürültüsü.',
    ],
    op: [
      A('kacin', 'Karanlık sızma', 'Mavi Hardrin geçidindesin. Kulaklıkta rüzgâr ve kırk hertzlik savaş davulu; davulun nabzı hangi yandan vurursa ters yana kaydır, kule radarlarından sıyrıl. Dört kez.', 'Kule radarlarının altından geçtin.', { n: 4, frek: 40 }),
    ],
    savas: 'kahergonat_zirhlisi',
    savasMetni: 'Kahergonat öncü zırhlısı göğe yükseldi! Birinci aşamada kalkan tonunu değiştirir, ağır plazma atar; yarıya inince kalkanını patlatıp gölge dronları çağırır.',
    kararlar: [
      { etiket: 'Zırhlının yüz elli kara aetherini ambara al', sonuc: 'Yüz elli kara aether ambarda. Dikkat: ambarda dörtten fazla kara kristal kalkan frekansını bozar; reaktörde ya da zanaatta harca.', yap: (d) => { ZN.ekle(d, 'kara_aether', 150); } },
      { etiket: 'Kara aetheri YGK laboratuvarında arıtma hakkına çevir', sonuc: 'Akademi yüz elli kara kristali arıttı: altmış saf aether senin.', yap: (d) => { ZN.ekle(d, 'saf_aether', 60); guven(d).kefius += 10; } },
    ],
    sonrasi: (d) => {
      ZN.ekle(d, 'runashar_tasi', 1);
      return 'Zırhlıların ardından Lord Sharon\'un taht odasına dalıyorsun; taht boş, yalnız titreşen dişi bir mühür taşı kalmış: Runashar Kara Mühür Taşı. ' + (ZN.miktar(d, 'runahar_tasi') ? 'Ambardaki ikiziyle yan yana gelince yüksek bir rezonans ıslığı çalıyor.' : '');
    },
    odul: (d) => {
      d.para.gk += 2000;
      ZN.ekle(d, 'kara_plazma', 1);
      return '2000 savaş ganimeti kredisi, Kara Plazma Çekirdeği, Runashar Kara Mühür Taşı.';
    },
  },
  {
    no: 17, ad: 'Tenohris Sarayı Kuşatması', konum: 'Malkenia, Tenohris Sarayı ön avlusu', nokta: 'saray_avlusu', tehlike: 5, jest: 'ıslık tam tepedeyken çift dokunma',
    veren: 'IV. Bagrius',
    giris: ['Kara ordular dış halkaları aşmış, sarayın oval kapılarına dayanmış. IV. Bagrius balkondan halka sesleniyor; gökten kara mancınık kayaları yağıyor. Hava savunma bataryası senin.'],
    op: [A('basinc', 'Hava savunma bataryaları', 'Yaklaşan kayanın ıslığı yükseliyor; tam tependeyken çift dokun: vur. Üç kez.', 'Gökyüzü temiz; mancınıklar sustu.', { efekt: 'el_mancinik' })],
    kararlar: [
      { etiket: 'Sarayı ve halkı koru: muhafızları Akademiye ve halkın yanına gönder', sonuc: 'Akademi sağlam, öğrenciler ve halk kurtuldu. Mareşal Elyon Vane hayatta; Dünya Çivisi\'nde yanında savaşacak.', yap: (d) => { guven(d).valen += 20; guven(d).halk += 10; d.bayrak.tfElyon = true; } },
      { etiket: 'Doğrudan kuşatma merkezine saldır', sonuc: 'Saray hasar aldı ama Sharon\'un gölge ordusu kırıldı; IV. Bagrius omzuna elini koyuyor. Sharon artık daha az muhafız çağırabilir.', yap: (d) => { d.itibar += 50; d.bayrak.tfKusatma = true; } },
    ],
    odul: (d) => {
      ZN.ekle(d, 'onur_kilici', 1);
      unvan(d, 'Malken Kahramanı');
      d.bayrak.basmufettis = true;
      return 'Kraliyet Onur Kılıcı, Malken Kahramanı unvanı. Valen ve Kefius Başmüfettiş mührünü veriyor: YGK kat eksi beş açık.';
    },
  },
  {
    no: 18, ad: 'Dünya Çivisi Savunması', konum: 'YGK Akademi, Kat eksi 5, gezegenin omurgası', nokta: 'dunya_civisi', tehlike: 5, jest: 'yön takibi, iki parmakla ileri itme, kesintisiz üç parmak rotasyonu',
    veren: 'Valen Lazeria ve Kefius Arateon',
    kosul: (d) => (ZN.miktar(d, 'tyzrakhel_mizragi') > 0 || (ZN.miktar(d, 'tyzrakhel_parcasi') > 0 && ZN.miktar(d, 'tyzrakhel_prizmasi') > 0)) && ZN.miktar(d, 'runahar_tasi') > 0 && ZN.miktar(d, 'runashar_tasi') > 0,
    kosulMetni: 'Lord Sharon\'u durdurmak için Tyzrakhel mızrağının parçası (Final 11), Tyzrakhel Işık Prizması (Final 15) ve zemindeki yuvalara iki mühür taşı (Runahar, Runashar) gerekir.',
    giris: (d) => [
      'Akademinin eksi beşinci katı, Sıfırıncı Karanlık. Valen Lazeria ve Kefius Arateon mühür sütununun başında nefes nefese bekliyor: "Sızma birlikleri sütuna ulaştı. Sütun kırılırsa Runahar ve Runashar tamamen canlanır; Tonoflenya bir yumurta gibi çatlar."',
      'Sütunun önünden bir gölge yükseliyor. Lord Sharon\'un sesi yankılı, soğuk ve çok katmanlı: "Beyaz Kıyamet beni parçaladı sandınız... Ama Kara Göl beni besledi! Şimdi Runahar ve Runashar yeniden birleşecek!"',
      'Hazırlık: Malok\'un mızrak parçası ile astral kulenin prizması birleşiyor; Tyzrakhel Işık Mızrağı elinde.' + (ZN.miktar(d, 'kirmizi_muhur') > 0 ? ' Kırmızı Mühür Parçası sütunu geçici olarak sabitliyor: Sharon\'un karanlık darbeleri yüzde yirmi zayıf.' : ''),
      d.bayrak.tfElyon ? 'Mareşal Elyon Vane yanında: ilk üç turda zırhın yüzde yirmi güçlü, her atışında o da ateş edecek.' : d.bayrak.tfKusatma ? 'Kuşatmada gölge ordusu kırıldığı için Sharon ikinci aşamada yalnız bir muhafız çağırabilecek.' : '',
    ].filter(Boolean),
    hazirla: (d) => mizrakBirlestir(d),
    savasOnce: true,
    savas: 'lord_sharon',
    savasMetni: 'Lord Sharon\'un gölgesi sana yöneldi! Birinci aşamada çifte gölge kılıcı ve siper kıran patlamalar; sonra karanlık ve muhafızlar; son aşamada yalnız Tyzrakhel\'in ışığı işler.',
    op: [
      A('kademeli', 'Mühür taşları', 'Sharon\'un gölge zırhı yarıldı. Runahar ve Runashar taşlarını Dünya Çivisi\'nin yuvalarına it: iki parmakla yukarı, iki kez.', 'İki taş yuvalarında; ikisi birden ıslık çalıyor.', { n: 2, yon: 'yukari', parmak: 2 }),
      A('rotasyon', 'Büyü çemberi', 'Valen ve Kefius\'un mühür çemberini besle: iki ya da üç parmakla kesintisiz çevir.', 'Çember kapandı; Sharon kalıcı olarak mühürlendi.', { radyan: 14 }),
    ],
    sonrasi: (d) => {
      d.tf.catlak = 0;
      return 'Lord Sharon\'un bedeni dağılıyor. Ama ölürken son büyüsünü yapıyor: komşu gezegendeki Cahelon\'a bir uyanış sinyali fırlıyor. Altı yıldız titriyor.';
    },
    odul: (d) => {
      d.bayrak.tonoflenyaKurtuldu = true;
      ZN.ekle(d, 'efsanevi_reaktor', 1);
      unvan(d, 'Malken Kahramanı');
      return 'Tonoflenya kurtarıldı. Akademinin hediyesi: Efsanevi Aether Reaktörü (Okyanos-Abyssus sıçramasının tek anahtarı; envanterden gemiye tak) ve Malken Kahramanı unvanı.';
    },
  },
  {
    no: 19, ortam: 'ortam_t_girdap', ad: 'Lanetli Gezegene Hiper-Sıçrama', konum: 'Tonoflenya yörüngesi → Okyanos-Abyssus', nokta: 'ygk_iskelesi', tehlike: 4, jest: 'sesli yönlendirmeyle sola sağa kaçış',
    veren: '(Bütün filo)',
    kosul: (d) => ZN.miktar(d, 'cahelon_anahtari') > 0 && ZN.miktar(d, 'efsanevi_reaktor') > 0, kosulMetni: 'Okyanos-Abyssus sıçraması için Efsanevi Aether Reaktörü (Final 18) ve kalkana takılacak Cahelon Girdap Anahtarı (Arin gözlemevi) gerekir.',
    giris: ['Bütün okyanusun tek noktaya toplandığı bir girdap: komşu gezegende Cahelon uyanıyor. Filon son sefer için hiper-sıçrama motorlarını ateşliyor; Cahelon Girdap Anahtarı kalkana takılı.'],
    op: [A('kacin', 'Hiper-uzay koridoru', 'Asteroitler ve boyutsal yırtıklar! Tehlike hangi yandansa ters yana kaydır. Altı kez.', 'Koridorun sonunda mavi bir dünya: Okyanos-Abyssus.', { n: 6 })],
    uzay: true,
    odul: (d) => {
      ZN.ekle(d, 'zirve_brovesi', 1);
      return 'Kozmik Seyrüsefer Zirve Brövesi.';
    },
  },
  {
    no: 20, ortam: 'ortam_t_girdap', ad: 'Su Mezarında Cahelon ile Hesaplaşma', konum: 'Okyanos-Abyssus, dipsiz girdabın kalbi', nokta: 'ygk_iskelesi', tehlike: 5, jest: 'infrasonik merkezde ateş, iki parmakla ritmik yukarı kaydırma, uzun basma',
    veren: '(Büyük final)',
    giris: (d) => [
      'Okyanos-Abyssus\'un sonsuz okyanusunda dev bir girdabın uğultusu. Gezegenin bütün suyu gökyüzüne yükselen devasa bir su kulesi olmuş; su altından yükselen balina benzeri infrasonik bir çığlık gövdeni titretiyor.',
      'Valen Lazeria telsizden: "Kaptan, Cahelon uyanıyor! Arin\'den getirdiğin Girdap Anahtarı\'nı kalkan rezonatörüne tak. Bu sadece Tonoflenya\'nın değil, Aethelis-IV\'ün de kader savaşı!"',
      'Girdap Anahtarı kalkan rezonatöründe dönüyor; birinci aşamada yüzgeç darbelerini ve sonik dalgaları dengeleyecek.' + (d.bayrak.abisVeri ? ' Thalassa\'nın abis veri çekirdeği Cahelon\'un dalış rotasını biliyor: derin aşamada yerini kaçırmazsın.' : ''),
    ],
    savas: 'cahelon',
    savasMetni: 'Cahelon yüzeye çıktı! Birinci aşama yüzey girdabı; ikinci aşamada dalar ve yalnız infrasonik nabzından bulunur; üçüncü aşamada göğsündeki çatlak açılır, uyarı penceresi bir buçuk saniye: tonu eşle ve ışıkla vur.',
    uzay: true,
    odul: (d) => {
      unvan(d, 'Evrenin Muhafızı');
      d.bayrak.serbestKesif = true;
      d.bayrak.kopruBarisi = true;
      d.itibar += 1000;
      return '"Evrenin Muhafızı" efsanevi unvanı. Sonsuz serbest keşif modu açıldı: galaksi senin.';
    },
  },
];
export const GOREV = Object.fromEntries(GOREVLER.map((g) => [g.no, g]));
const REZONATORLER = ['rezonator_zhaor', 'rezonator_varek', 'rezonator_axira', 'rezonator_elyndra', 'rezonator_sinha', 'rezonator_uma'];

// Operasyonları kaydet
for (const g of GOREVLER) {
  if (!g.op) continue;
  OPERASYONLAR['tf' + g.no] = { yuzey: !g.uzay, final: g.no, adimlar: g.op, sonuc: (d) => [g.ad + ': tamam.'], odul: {}, sahne: 'tf_ara' };
}
REZONATORLER.forEach((id, i) => {
  OPERASYONLAR['tf2_' + i] = {
    yuzey: true,
    final: 2,
    tekrar: true,
    adimlar: [A('frekans', 'Kalkan rezonatörü ' + (i + 1), 'Referans sesini dinle; iki parmakla çevirerek kalkan tonunu eşle. Eşleşince ekran titrer.', 'Rezonatör ' + (i + 1) + ' akortlandı.')],
    sonuc: () => [],
    odulFn: (d) => {
      const t = tf(d);
      if (!t.rez.includes(i)) t.rez.push(i);
      t.rezSira = i;
      return {};
    },
    sahne: 'tf_rez',
  };
});

// --- Yardımcılar ---
export function tf(d) {
  if (!d.tf) d.tf = { aktif: null, evre: null, biten: [], karar: {}, rez: [], catlak: 0, unvan: [], guven: { kefius: 0, valen: 0, halk: 0 } };
  ZN.hazirla(d);
  return d.tf;
}
function guven(d) {
  return tf(d).guven;
}
function unvan(d, ad) {
  if (!tf(d).unvan.includes(ad)) d.tf.unvan.push(ad);
}
function kodeks(d, id, ad, tarif) {
  if (!d.kodeks.some((k) => k.id === id)) d.kodeks.push({ id, ad, tarif, itibar: 15 });
}
export function bittiMi(d, no) {
  return tf(d).biten.includes(no);
}
export function acikMi(d, no) {
  return no === 1 ? true : bittiMi(d, no - 1);
}
// Ekran okuyucu dizini (belge 3.3)
export function dizin(g) {
  return g.ad + ' - ' + g.konum + ' - Tehlike seviyesi: ' + g.tehlike + ' - Gerekli jest: ' + g.jest;
}
export function siradaki(d) {
  const t = tf(d);
  return GOREVLER.find((g) => !t.biten.includes(g.no)) || null;
}
export function gorevMetni(d) {
  const t = tf(d);
  const s = siradaki(d);
  if (!s) return 'Bütün final görevleri tamam. ' + (t.unvan.length ? 'Unvanların: ' + t.unvan.join(', ') + '.' : '');
  return 'Final görevi ' + s.no + ': ' + dizin(s) + '. ' + (s.kosul && !s.kosul(d) ? s.kosulMetni : 'Başladığı yer: ' + F_NOKTALAR_AD(s.nokta) + '.') + (t.aktif === s.no && t.evre === 'rezonator' ? ' Akortlanan rezonatör: ' + t.rez.length + ' / 6.' : '');
}
function F_NOKTALAR_AD(id) {
  return (F_NOKTALAR[id] && F_NOKTALAR[id].ad) || (id === 'ygk_iskelesi' ? 'YGK kat 5, yerçekimi iskelesi' : id);
}

// --- Noktalar ---
export function noktaMi(id) {
  return !!F_NOKTALAR[id];
}
export function ekEylemler(d, id) {
  if (!d.bayrak.tonoflenyaGoruldu) return [];
  const t = tf(d);
  const e = [];
  for (const g of GOREVLER) {
    if (t.biten.includes(g.no) || !acikMi(d, g.no)) continue;
    const yer = g.rezonator ? (t.aktif === 2 && t.evre === 'rezonator' ? null : g.nokta) : g.nokta;
    if (yer === id) {
      if (t.aktif === g.no && d.op && d.op.id === 'tf' + g.no) e.push({ id: 'f_devam_' + g.no, etiket: 'Göreve dön: ' + g.ad });
      else if (t.aktif === g.no && t.evre === 'savas') e.push({ id: 'f_savas_' + g.no, etiket: 'Çatışmaya yeniden gir: ' + g.ad });
      else e.push({ id: 'f_bas_' + g.no, etiket: 'Final görevi ' + g.no + ': ' + g.ad, ipucu: dizin(g) });
    }
    if (g.rezonator && t.aktif === 2 && t.evre === 'rezonator') {
      const i = REZONATORLER.indexOf(id);
      if (i >= 0 && !t.rez.includes(i)) e.push({ id: 'f_rez_' + i, etiket: 'Kalkan rezonatörünü akortla', ipucu: 'Kalkan Rezonatörü ' + (i + 1) + '. Referans sesini dinleyin ve iki parmağınızı çevirerek frekansı eşleştirin.' });
    }
    break; // yalnız sıradaki görev
  }
  return e;
}
export function ekEylemMi(eid) {
  return eid.indexOf('f_') === 0;
}
export function noktaEylemleri(d, id) {
  return [...ekEylemler(d, id), { id: 'incele', etiket: 'İncele' }];
}
export function eylemUygula(d, id, eid) {
  const t = tf(d);
  if (eid === 'incele') return { metin: F_NOKTALAR[id].tarif || F_NOKTALAR[id].ad };
  const no = Number(eid.split('_').pop());
  if (eid.indexOf('f_bas_') === 0) {
    const g = GOREV[no];
    if (!acikMi(d, no)) return { metin: 'Önce önceki görevi bitir.', ses: 'red' };
    if (g.kosul && !g.kosul(d)) return { metin: g.kosulMetni, ses: 'red' };
    t.aktif = no;
    t.evre = 'giris';
    d.sahne = 'tf_giris';
    return { metin: '' };
  }
  if (eid.indexOf('f_devam_') === 0) return { opDevam: true, metin: '' };
  if (eid.indexOf('f_savas_') === 0) {
    savasKur(d, GOREV[no]);
    return { metin: GOREV[no].savasMetni, ses: 'red' };
  }
  if (eid.indexOf('f_rez_') === 0) {
    t.rezSira = no;
    d.opBekle = 'tf2_' + no;
    return { metin: '', kapat: true };
  }
  return { metin: '' };
}
// Final #18 hazırlığı: Malok'un mızrak parçası (#11) ve Tyzrakhel Işık Prizması (#15) birleşir, mızrak kuşanılır
export function mizrakBirlestir(d) {
  if (ZN.miktar(d, 'tyzrakhel_mizragi') < 1 && ZN.miktar(d, 'tyzrakhel_parcasi') > 0 && ZN.miktar(d, 'tyzrakhel_prizmasi') > 0) {
    ZN.ekle(d, 'tyzrakhel_mizragi', 1); // parça ve prizma yadigâr olarak envanterde kalır
  }
  if (ZN.miktar(d, 'tyzrakhel_mizragi') > 0 && !ZN.kusanildiMi(d, 'tyzrakhel_mizragi')) ZN.kusan(d, 'tyzrakhel_mizragi');
}
function savasKur(d, g) {
  const t = tf(d);
  t.evre = 'savas';
  d.savasBekle = g.savas;
  d.savasSonraSahne = g.savasOnce ? 'tf_savas_sonra' : 'tf_karar';
}

// Görevin bir sonraki evresine
function sonrakiEvre(d) {
  const t = tf(d);
  const g = GOREV[t.aktif];
  if (g.savas && !t.savasBitti && !g.savasOnce) {
    savasKur(d, g);
    return null;
  }
  t.evre = 'karar';
  sonrasiHazirla(d);
  return 'tf_karar';
}
// Görevin operasyon/çatışma sonrası olayları (bir kez): karar sahnesinin metni ya da görev bitişi çağırır
function sonrasiHazirla(d) {
  const t = tf(d);
  const g = GOREV[t.aktif];
  if (g && g.sonrasi && !t.sonrasiDendi) {
    t.sonrasiMetni = g.sonrasi(d);
    t.sonrasiDendi = true;
  }
}
function tamamla(d) {
  const t = tf(d);
  sonrasiHazirla(d);
  t.sonrasiDendi = false;
  t.sonrasiMetni = null;
  const g = GOREV[t.aktif];
  d.tfOdulMetni = g.odul(d);
  if (!t.biten.includes(g.no)) t.biten.push(g.no);
  SB.ekolKazan(d, 'zhaor', 30);
  d.itibar += 25;
  t.aktif = null;
  t.evre = null;
  t.savasBitti = false;
  t.rez = [];
}

export const SAHNELER = {
  tf_giris: {
    baslik: 'Final görevi',
    ortam: (d) => (GOREV[tf(d).aktif] && GOREV[tf(d).aktif].ortam) || null,
    efekt: ['telsiz_zil'],
    metin: (d) => {
      const g = GOREV[tf(d).aktif];
      if (!g) return [];
      return ['Görev ' + g.no + ': ' + dizin(g) + '.', 'Görev veren: ' + g.veren + '.', ...(typeof g.giris === 'function' ? g.giris(d) : g.giris)];
    },
    secenekler: (d) => {
      const t = tf(d);
      const g = GOREV[t.aktif];
      if (!g) return [{ etiket: 'Devam', sonra: null }];
      if (g.rezonator) return [{ etiket: 'Halkalara git', yap: () => { t.evre = 'rezonator'; t.rez = []; }, sonra: null }];
      const hz = () => g.hazirla && g.hazirla(d);
      if (g.savasOnce) return [{ etiket: g.uzay ? 'Gemine koş' : 'Savaşa gir', yap: () => { hz(); savasKur(d, g); }, sonra: null }];
      if (!g.op) return [{ etiket: 'Saldırıya geç', yap: () => { hz(); savasKur(d, g); }, sonra: null }];
      return [
        { etiket: 'Başla', yap: () => { t.evre = 'op'; d.opBekle = 'tf' + g.no; }, sonra: null },
        { etiket: 'Sonra', yap: () => { t.aktif = null; t.evre = null; }, sonra: null },
      ];
    },
  },
  tf_savas_sonra: {
    baslik: 'Çatışma bitti',
    metin: (d) => ['Saldırganlar dağıldı.', ...(GOREV[tf(d).aktif] && GOREV[tf(d).aktif].op ? ['Şimdi asıl iş: ' + GOREV[tf(d).aktif].op[0].ad + '.'] : [])],
    secenekler: (d) => [{ etiket: 'Devam', yap: () => { const t = tf(d); t.savasBitti = true; t.evre = 'op'; d.opBekle = 'tf' + t.aktif; }, sonra: null }],
  },
  tf_ara: {
    baslik: 'Operasyon tamam',
    efekt: ['sinyal'],
    metin: (d) => {
      const g = GOREV[tf(d).aktif];
      if (!g) return [];
      const l = [g.op[g.op.length - 1].bitis];
      if (g.savas && !g.savasOnce && !tf(d).savasBitti) l.push(g.savasMetni);
      return l;
    },
    secenekler: (d) => {
      const g = GOREV[tf(d).aktif];
      const savasVar = g && g.savas && !g.savasOnce && !tf(d).savasBitti;
      return [{ etiket: savasVar ? 'Çatışmaya gir' : 'Devam', yap: () => sonrakiEvre(d), sonra: savasVar ? null : 'tf_karar' }];
    },
  },
  tf_rez: {
    baslik: 'Rezonatör',
    efekt: ['sinyal'],
    metin: (d) => {
      const t = tf(d);
      return ['Rezonatör ' + (t.rezSira + 1) + ' akortlandı. Kalkanın tonu halkanın yıldızına oturdu.', t.rez.length >= 6 ? 'Altı halka da akortlu. Mareşal Elyon Vane enerjinin nereye verileceğini soruyor.' : 'Akortlanan: ' + t.rez.length + ' / 6. Sıradaki halkaya git.'];
    },
    secenekler: (d) => (tf(d).rez.length >= 6 ? [{ etiket: 'Mareşale karar ver', yap: () => { tf(d).evre = 'karar'; }, sonra: 'tf_karar' }] : [{ etiket: 'Devam', sonra: null }]),
  },
  tf_karar: {
    baslik: 'Karar',
    metin: (d) => {
      const t = tf(d);
      const g = GOREV[t.aktif];
      if (!g) return [];
      t.savasBitti = false;
      const l = [];
      sonrasiHazirla(d);
      if (t.sonrasiMetni) l.push(t.sonrasiMetni);
      if (g.kararlar) l.push('Kararını ver.');
      return l;
    },
    secenekler: (d) => {
      const t = tf(d);
      const g = GOREV[t.aktif];
      if (!g) return [{ etiket: 'Devam', sonra: null }];
      const bitis = () => {};
      if (g.kararlar) return g.kararlar.map((k, i) => ({ etiket: k.etiket, yap: () => { k.yap(d); t.karar[g.no] = i ? 'B' : 'A'; d.tfKararMetni = k.sonuc; bitis(); tamamla(d); }, sonra: g.no === 20 ? 'tf_epilog' : 'tf_odul' }));
      return [{ etiket: 'Devam', yap: () => { d.tfKararMetni = null; bitis(); tamamla(d); }, sonra: g.no === 20 ? 'tf_epilog' : 'tf_odul' }];
    },
  },
  tf_odul: {
    baslik: 'Görev tamam',
    efekt: ['sinyal'],
    metin: (d) => [d.tfKararMetni, 'Ödül: ' + d.tfOdulMetni, siradaki(d) ? 'Sıradaki: ' + siradaki(d).ad + '.' : null].filter(Boolean),
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
  },
  tf_epilog: {
    baslik: 'Epilog',
    ortam: 'giris_muzik',
    efekt: ['el_koro'],
    metin: (d) => [
      'Cahelon ebediyen su mezarına kilitleniyor; suyun dibinde ebedî bir kristal heykele dönüşüyor. Gökyüzüne yükselen okyanus yavaşça gezegenin yüzeyine geri dökülüyor.',
      'Altı yıldız gökyüzünde yeniden sabit bir uyum akoru çalıyor.',
      'Telsizden Valen Lazeria\'nın, Kefius Arateon\'un ve kurtardığın bütün ırkların ortak zafer marşı yükseliyor.',
      'Galaksi, Alt Evren\'in Kızıl Kıyamet tehdidinden tamamen temizlendi. Aethelis-IV, Galaktik Başkent, ile Tonoflenya arasındaki köprü kalıcı barış dönemine geçti; kalan yan görevler, melez zanaatlar ve gezegen keşifleri için serbest keşif sürüyor.',
      'Ödül: ' + d.tfOdulMetni,
    ],
    secenekler: () => [{ etiket: 'Kredileri dinle', sonra: 'tf_krediler' }],
  },
  tf_krediler: {
    baslik: 'Aethelis',
    ortam: 'giris_muzik',
    metin: () => [
      'Aethelis. Yapımcı: Bahtiyar Cankurt.',
      'Sesler: Bahtiyar\'ın efekt arşivi ve ElevenLabs. Ses motoru: üç boyutlu kulaklık sesi.',
      'Oynadığın için teşekkürler, Evrenin Muhafızı. Serbest keşif modunda dilediğin gibi dolaşabilirsin.',
    ],
    secenekler: () => [{ etiket: 'Serbest keşfe dön', sonra: null }],
  },
};

