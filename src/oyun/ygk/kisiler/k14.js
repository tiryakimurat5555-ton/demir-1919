// v6 karakter 25-30 (Xaela, Bayan Misket, "Sıfır" Makinist, Zahra Elmas Göz, Doktor Kıkırdak, Usta Çakal) ve Paket 15'in
// Keşiş Vaelor'u (Arin antik tapınağı, LAN-01 bu kişinin görevi). Hepsi Sınıf B; büyü öğretmezler, bağları şehir ve bölge
// avantajı verir (indirim, tehlike bağışıklığı, gizli geçitler). Paket 11 saha hazırlık ağının "şehir alternatifleri" ve
// Paket 14'ün dört büyü destekli saha aracı da bu kişilerden (ve akademideki Forges, Kaelis, Tixie, Trellis-7'den) alınır.
// Saha araçları normal savaşta kullanılmaz; yalnız bulmaca elemanıdır (buyu/veri.js aracEkle).
import { kisiEkle, kademe, KISI_EKLERI, puanEkle, kayit, gorevDurumu } from '../bag';
import { D, S, O } from '../yardim';
import * as ZN from '../../tonoflenya/zanaat';
import * as BY from '../../buyu/buyu';
import { aracEkle } from '../../buyu/veri';

Object.assign(ZN.ESYA, {
  sabit_yanki_muhru: { kat: 3, ad: 'Sabit Yankı Mührü', tarif: 'Fosil ve piezo kristalden; çift plakalı bulmacada ikinci plakayı altmış saniye basılı tutar. Yalnız bulmacada; savaşta işe yaramaz.' },
  lumina_feneri: { kat: 3, ad: 'Lumina İşaret Feneri', tarif: 'Beyaz Lumina şişesi ve rezonans lambasından; kör sis ve toz alanlarında kırk metrelik güvenli görüş koridoru açar.' },
  solis_kapsulu: { kat: 3, ad: 'Solis Eritici Kapsül', tarif: 'Sarı Solis şişesi ve gümüş tozundan; donmuş kilitleri, reçine mühürlerini ve kara buz kapaklarını tek hamlede sessizce çözer.' },
  denge_civisi: { kat: 3, ad: 'Aether Denge Çivisi', tarif: 'Demir cevheri ve fosforlu likenden; ışık ya da madde köprüsünün zeminine çakılır, dayanımını iki katına çıkarır.' },
  neon_rozet: { kat: 4, ad: 'Neon Veri Rozeti', tarif: 'Xaela\'nın tarikat kodlarıyla ışıldayan rozet: Makine-Ruh seni tanıyor.' },
  noral_cekirdek: { kat: 4, ad: 'Nöral Şifre Çekirdeği', tarif: 'Batık bir konteynerden; eski kaçakçı ağının şifre çekirdeği.' },
  uma_karti: { kat: 3, ad: 'Uma Sosyal Geçiş Kartı', tarif: 'Uma halkasının salonlarına açılan kabartmalı kart; pazarda soylu fiyatı.' },
  cay_seti: { kat: 4, ad: 'Gümüş İğneli Çay Seti', tarif: 'Bayan Misket\'in armağanı; kalıcı şehir prestiji.' },
  usta_anahtari: { kat: 4, ad: 'Usta İngiliz Anahtarı', tarif: '"Sıfır"ın yedek anahtarı; Filtra\'nın mekanik kapıları seni tanır.' },
  tarafsiz_muhur: { kat: 4, ad: 'Tarafsız Kervan Mühürü', tarif: 'Zahra\'nın mühürü: rakip fraksiyonların ambargolarını kırar; Büyük Ambargo\'da bile Magentor kapıları açılır.' },
  kikirdak_maskesi: { kat: 3, ad: 'Kireç maskesi ve panzehir', tarif: 'Doktor Kıkırdak\'ın formülü: Flee Plee gazlarına ve bataklık zehrine karşı.' },
  isaret_iksiri: { kat: 3, ad: 'Sabit İşaret İksiri', tarif: 'Turkuaz ışıklı iksir; karanlık tünellerde bulmaca plakalarını tetikler.' },
  kikirdak_sisesi: { kat: 4, ad: 'Kıkırdak\'ın Dengeleyici Şişesi', tarif: 'Lumina ve Solis şişelemesini hızlandıran yan alet: göğün tozu bir yerine iki şişe doldurur.' },
  sahte_gumruk_belgesi: { kat: 3, ad: 'Sahte Gümrük Geçiş Belgesi', tarif: 'Usta Çakal\'ın baskısı: bürokratik denetimler ve Tentran kapısında izinli yolcu muamelesi.' },
  sans_parasi: { kat: 4, ad: 'Tilki Mühürlü Şans Parası', tarif: 'Çakal\'ın şans parası; zar oyunlarında ve pazarlıkta göz kırpar.' },
  sicrama_muhru: { kat: 5, ad: 'Yıldız Sıçrama Mührü', tarif: 'Arin tapınağının tunç çanının saf rezonansı; filo kristallerini astral parazite karşı kilitler.' },
});
// Paket 14: büyü destekli saha araçları (tek kullanımlık bulmaca elemanları)
aracEkle('sabit_yanki_muhru', 'Sabit Yankı Mührünü karşı plakaya bas', 'sabit_yanki_muhru', 1);
aracEkle('lumina_feneri', 'Lumina İşaret Fenerini bırak', 'lumina_feneri', 1);
aracEkle('solis_kapsulu', 'Solis Eritici Kapsülü kır', 'solis_kapsulu', 1);
aracEkle('denge_civisi', 'Aether Denge Çivisini çak', 'denge_civisi', 1);

const k = (d, id) => kademe(d, id);
const muaf = (d, ...t) => {
  if (!d.bayrak.tehlikeMuaf) d.bayrak.tehlikeMuaf = {};
  for (const x of t) d.bayrak.tehlikeMuaf[x] = true;
};

kisiEkle('xaela', {
  ad: 'Xaela', unvan: 'Neon İlahiyatçı, Makine-Ruh rahibesi', nokta: 'yg_xaela', guc: 'guney', bolgeKisisi: true, yerAdi: 'Tentran, Aether-Dock sunucu sunağı', sinif: 'B',
  hiz: [[0, 10, 1]],
  hizMetni: 'Sınıf B. Yavaş konuşanı sıkıcı bulur; hızlı, kısa cevaplar ve gürültülü hediyeler bağı hızlandırır.',
  kimlik: [
    'Bir gözü kırmızı lazer lens, saçının bir yanı kazınmış, öbür yanı neon mavisi. Omurgasından gümüşi kablolar iniyor; başının üstünde holografik bir veri halesi dönüyor.',
    'Tonoflenya\'ya ne YGK ne Konsey izniyle geldi: Aether-Dock\'un eski enerji rölelerinin şarkısını duyduğu için indi. Dua yerine kod okur.',
  ],
  kademeler: [
    'Gürültülü yabancı: seni "düşük bant genişlikli misafir" sayıyor; her cümleni kesip halesinden log okuyor.',
    'Hale okuması: kalp atışını ölçüp "eski protokol" diyor ama gitmene izin vermiyor.',
    'Veri çırağı: limandaki sahte gümrük taramalarını atlatman için geçici bir sinyal maskesi veriyor.',
    'Röle şarkısı: Aether-Dock\'un hangi vincinin hangi notayı çaldığını öğretiyor.',
    'Nyxara meselesi: Nyxara\'yı "eski sürüm işletim sistemi" diye küçümsüyor ama kablolarını gizlice dengelediğini itiraf ediyor.',
    'Makine-Ruh ortağı: Flee Plee ile Aether-Dock arasındaki gizli terminal kısayolunu açıyor.',
    'Barracuda\'nın vericileri: korsanın gemilerini neden bedelsiz şifrelediğini anlatıyor.',
    'Analog anten: asanın titreşimini dinleyip "fena değil" diyor; ilk kez sesini alçaltıyor.',
    'Yüksek bantlı rahip: güneydeki kristal kaçakçılığında hangi geminin kime mal taşıdığını anlık haritada gösteriyor.',
    'Hale paylaşımı: halesinin bir kanalını sana ayırıyor; liman trafiği kulağında.',
    'Güncelleme tamamlandı: seni tarikatın onursal düğümü ilan ediyor.',
  ],
  sosyal: [['Nyxara Vel\'din', 'Büyüyle kristali "eski sürüm" sayar; yine de bariyerlerinin kablolarını gizlice dengeler.', 'XAE-02 Nyxara\'nın bozucularını kırmadan yönlendirir.'], ['Kaptan Barracuda', 'Vericilerini bedelsiz şifreler, karşılığında sunucu hurdası alır.', 'XAE-03 iki kanadın kulesinde.'], ['Doktor Kıkırdak', 'Laboratuvarını ağ haritasında kırmızıyla işaretler; soğutma sıvısını ondan alır.', '']],
  sever: ['piezo', 'kavrulmus_kahve', 'rezonans_lambasi'], sevmez: ['huzur_tutsusu', 'sakin_cay', 'ekmek'],
  hediyeNot: 'Hızlandıran ve vızıldayan her şey; sakinleştiren her şeyden nefret eder.',
  severSoz: '"İşte bu! Beyin çekirdeklerim üç kat hızlandı!"', sevmezSoz: '"Iyy! O duman sensörlerimi tıkıyor! Kapat şunu!"',
  gorevler: [
    { id: 'XAE-01', ad: 'Sessiz rölelerin duası', tur: 'bag', k: 0, puan: 0,
      durum: 'Aether-Dock\'un üç yükleme vincindeki piezo alıcılar paslanmış; frekansları ayrı ayrı kaymış.',
      hikaye: ['Xaela halesini sana çeviriyor: "Analog bir çubuk mu? İçinde şaşırtıcı bir temizlikte titreşim var. Şu üç vinci bağla da sinyalini görelim."', 'Savaş yok; yalnız zamanlı sinyal kalibrasyonu.'],
      cozum: 'Üç vinçte alıcının frekansını Frekans Anahtarı ya da Yıldırım Rezonansı ile eşitle (piezo kristal yerleştirmek de olur).',
      bulmaca: { dugumler: [
        D('v1', 'Birinci yükleme vinci', -0.5, 'elektrik', 'Alıcı cızırdıyor; frekans kaymış.', [['frekans_anahtari'], ['yildirim_rez'], ['piezo']], 'Birinci vinç Xaela\'nın ağına bağlandı.'),
        D('v2', 'İkinci yükleme vinci', 0, 'elektrik', 'Alıcı tamamen sessiz.', [['frekans_anahtari'], ['yildirim_rez'], ['piezo']], 'İkinci vinç şarkı söylüyor.', { on: ['v1'] }),
        D('v3', 'Üçüncü yükleme vinci', 0.5, 'elektrik', 'Alıcı aşırı yüklü; kıvılcım saçıyor.', [['frekans_anahtari'], ['yildirim_rez'], ['piezo']], 'Üç vinç senkron; hale bir an maviye kesiyor.', { on: ['v2'] }),
      ] },
      secimler: [S('Halenin senkronunu izle', { xaela: 35, g_guney: 5 }, 'Xaela kahkahayı basıyor: "Bant genişliğin açıldı! Aether-Dock tezgâhları sana indirimli artık."', { bayrak: ['xaelaIndirim'] })] },
    { id: 'XAE-02', ad: 'Kırmızı lazerin kör noktası', tur: 'zincir', k: 3, once: ['XAE-01'], puan: 0, bolge: 'guney',
      durum: 'Flee Plee limanında Nyxara\'nın adamlarının yerleştirdiği iki gizli kristal bozucu Xaela\'nın ağını kör ediyor.',
      hikaye: ['Xaela: "Kırma onları! Nyxara anlar, savaş çıkar. Frekanslarını benim ağıma çevir; o fark etmeden veri sızsın."'],
      cozum: 'Bozucuları kırmadan Beyaz Lumina salımıyla (ya da Frekans Anahtarı ile) Xaela\'nın ağına yönlendir; düşen koordinattaki batık konteyneri Tele-Kaldırma ya da Sıvı Yönlendirme ile yüzeye al.',
      bulmaca: { dugumler: [
        D('b1', 'Birinci kristal bozucu', -0.5, 'kristal', 'Mor bir vızıltı; Xaela\'nın halesi bozuluyor.', [['lumina_salim'], ['frekans_anahtari']], 'Bozucu artık Xaela için çalışıyor.'),
        D('b2', 'İkinci kristal bozucu', 0, 'kristal', 'İskelenin altında, suya yakın.', [['lumina_salim'], ['frekans_anahtari']], 'İkinci bozucu döndü; ağda bir koordinat beliriyor.', { on: ['b1'] }),
        D('konteyner', 'Batık konteyner', 0.5, 'su', 'Sığ suyun dibinde paslı bir konteyner.', [['tele_kaldirma'], ['sivi']], 'Konteyner yüzeyde; içinde Nöral Şifre Çekirdeği.', { on: ['b2'] }),
      ] },
      secimler: [S('Çekirdeği Xaela\'ya ver', { xaela: 40, nyxara: -5 }, 'Xaela çekirdeği halesine bağlıyor: "Flee Plee\'nin gece terminalleri artık sana açık."', { bayrak: ['xaelaKisayol'], odul: { esya: { noral_cekirdek: 1 } } })] },
    { id: 'XAE-03', ad: 'Makine-Ruhun ilahisi', tur: 'hiyerarsi', k: 7, once: ['XAE-02'], puan: 0,
      durum: 'Barracuda ve Nyxara kanatlarının aynı anda bağlandığı ana dağıtım kulesi aşırı yükte; boşaltılmazsa bütün rıhtımın elektriği kesilecek.',
      hikaye: ['Xaela: "İki taraf da bilmeyecek. Asan ikinci kademe mi? Topraklamayı sen yap, ilahiyi ben okurum."'],
      cozum: 'Yükü Yıldırım Rezonansı ile topraklama taşına çek; fazlasını boş şişeye hapset ya da Kalkan Aşırtma ile söndür.',
      kosul: (d) => (d.buyu && d.buyu.asa >= 2), kosulMetni: 'en az ikinci kademe asa gerekir',
      bulmaca: { dugumler: [
        D('kule', 'Ana dağıtım kulesi', -0.3, 'simsek', 'Kule uğulduyor; iki kanadın kabloları kıvılcım saçıyor.', [['yildirim_rez']], 'Yük topraklama taşına aktı.'),
        D('fazla', 'Kalan aşırı yük', 0.4, 'elektrik', 'Taş da doldu; fazlası geri tepiyor.', [['bos_sise'], ['kalkan_asirtma']], 'Rıhtım ışıkları bir an titreyip sakinleşti.', { on: ['kule'] }),
      ] },
      secimSoru: 'Liman trafiği bilgisi kimde kalsın?',
      secimler: [
        S('Xaela\'da kalsın', { xaela: 45 }, 'Xaela halesini kapatıyor: "Güncelleme tamamlandı. Sen artık ağın bir düğümüsün."', { odul: { esya: { neon_rozet: 1 } }, bayrak: ['xaelaHarita'] }),
        S('YGK gözcüsü Sinha\'ya bir kopya ver', { xaela: 30, sinha: 15 }, 'Xaela gözlerini deviriyor ama kopyayı veriyor: "Eski protokolcülere de bir parça. Neyse."', { odul: { esya: { neon_rozet: 1 } }, bayrak: ['xaelaHarita'] }),
      ] },
  ],
  sohbetler: [
    { k: 0, ad: 'Bant genişliği', soz: 'Xaela: "Dur, konuşma! Nabzın eski protokol gibi atıyor. Ne istiyorsun, hızlı söyle!"',
      secenekler: [O('"[Büyü] Asamın rezonansı ağınla çakışıyor mu, ölç."', 20, '"Hah! Analog çubuk! Dur bakalım... vay, temiz titreşim. Sevdim."'), O('"[İkram] Sana kavrulmuş nöro-kahve getirdim."', 15, 'Bir dikişte içiyor: "Artık sıkıcı değilsin!"'), O('"[Alay] Huzur tütsüsü yakıp biraz yavaşlamak ister misin?"', -10, '"Iyy! Kapat şunu yoksa veri halemi üstüne atarım!"')] },
    { k: 5, ad: 'Sükûnet hatası', soz: 'Xaela: "Sence sessizlik bir hata mı, yoksa bir özellik mi?"',
      secenekler: [O('"Gürültü yaşadığını kanıtlar."', 30, '"İşte! Sonunda biri anladı!"'), O('"Bazen sessizlikte en iyi sinyal duyulur."', 10, 'Bir an duraklıyor: "...Bunu loglara yazıyorum. Ama katılmıyorum."')] },
  ],
  kademeEtki: (d, n) => {
    if (n === 2) muaf(d, 'denetim');
    if (n === 5) d.bayrak.xaelaKisayol = true;
    if (n === 8) d.bayrak.xaelaHarita = true;
  },
  imza: { selam: 'Yavaşlama! Sükûnet sistem hatasıdır, gürültü ise yaşadığının kanıtı!', tesekkur: 'Senin o büyülü değneğin benim gözümde sadece iyi lehimlenmiş bir anten, ama şarkısı fena değil.', kizgin: 'Makine-Ruh affetmez, sadece eski sürümleri silip yenisini yükler. Hazır mısın?' },
  ortam: 'Yüksek tempolu bas vuruşları, sunucu fanlarının vızıltısı, arada statik cızırtı ve ıslak iskelede ağır metal botlar.',
});

kisiEkle('misket', {
  ad: 'Bayan Misket', unvan: 'Uma salonlarının casusu', nokta: 'yg_misket', guc: 'ygk', bolgeKisisi: true, yerAdi: 'Malkenia, 2. halka Uma, kadife perdeli çay salonu', sinif: 'B',
  hiz: [[0, 10, 1]],
  hizMetni: 'Sınıf B. Kibar ama duvar örer; doğrudan ve keskin cevaplar ilgisini çeker, kabalık bağı geriletir.',
  kimlik: [
    'Sıkı korseli ipek ve dantel elbiseler; elinde uçları zehirli iğneli gümüş saplı bir yelpaze, eteğinde tek atışlık bir cep tabancası.',
    'Kimin için çalıştığı asla kesinleşmez. Hem Sirilla\'nın ayna ağından hem Valen\'in gözcü raporlarından haberdardır, ikisine de tam teslim olmaz.',
  ],
  kademeler: [
    'Zarif mesafe: seni sıradan bir taşra elçisi sanıyor; kibarca duvar örüyor.',
    'İlk fincan: hangi soylunun hangi fincandan içtiğini izlemeyi öğretiyor.',
    'Salon davetlisi: Uma halkasının soylu dedikodularını ve sahte davetiyeleri açıyor.',
    'Yelpaze dili: yelpazenin kaç açılışının ne anlama geldiğini anlatıyor.',
    'Zahra\'nın notları: doğulu tacirle mühürlü notlarla yazıştığını ima ediyor.',
    'Yelpaze sırdaşı: çay içtiğin rakiplerin zayıf noktalarını ve ikna açıklarını söylüyor.',
    'Sirilla\'nın aynaları: Sirilla ile gizli bir diyalog kapısı açıyor.',
    'Gerçek ad: ilk kez sana bir adın yarısını söylüyor; öbür yarısını saklıyor.',
    'Satranç ortağı: karşı tarafın gizli mühür kopyasını, savaşsız çözüm anahtarını sağlıyor.',
    'Maskesiz bir an: yelpazeyi tamamen kapatıp seninle düz konuşuyor.',
    'Son hamle: Tonoflenya satranç tahtasında seni piyon değil, eş oyuncu sayıyor.',
  ],
  sosyal: [['Zahra Elmas Göz', 'Sosyete zehirlerini Zahra\'nın çöl seralarından alır; birbirlerine sırt dönmezler.', ''], ['Usta Çakal', '"Fazla gürültülü" bulur ama sahte mühürler için kapısını çalar.', ''], ['Sirilla', 'Ayna ağını bilir; ona tam teslim olmaz.', 'MIS-02 gizli diyaloğu açar.']],
  sever: ['sakin_cay', 'gumus_tozu', 'urun_kristal_cicek'], sevmez: ['ekmek', 'komur', 'demir_cevheri'],
  hediyeNot: 'Zarif ve nadir olanı sever; kaba, taşra kokan hediyeyi yelpazesiyle iter.',
  severSoz: '"Zarif bir seçim. İlk kez bir taşralı zevk sahibi çıktı."', sevmezSoz: '"Bunu bir çay salonuna mı getirdin şekerim?"',
  gorevler: [
    { id: 'MIS-01', ad: 'Çay fincanındaki gümüş iğne', tur: 'bag', k: 0, puan: 0,
      durum: 'Salondaki üç masadan birinde mektup taşıyıcısı oturuyor; köşedeki genç muhafız birazdan zehirli fincanı içecek.',
      hikaye: ['Bayan Misket yelpazesinin ardından: "Ne kadar keskin... Şu köşedeki genç muhafız birazdan yanlış fincanı yudumlayacak. Bakalım elin dilin kadar hızlı mı?"'],
      cozum: 'Hakikat Yankısı ile üç masadan gerçek taşıyıcıyı ayır; fincanı gümüş tozuyla ya da Lumina salımıyla dene; Tele-Kaldırma ile fark ettirmeden fincanı değiştir.',
      bulmaca: { dugumler: [
        D('masalar', 'Üç masadaki fısıltılar', -0.5, 'fisilti', 'Üç masa, üç alçak ses.', [['hakikat_yankisi'], ['yanki_tarama']], 'Ortadaki masadaki kadın mektubu taşıyor.'),
        D('fincan', 'Sahte mühürlü fincan', 0, 'kristal', 'Fincanın kenarında ince bir parıltı.', [['lumina_salim'], ['zihin_arindirma']], 'Fincanın içinde gümüş iğne zehri var.', { on: ['masalar'] }),
        D('degis', 'Muhafızın masası', 0.5, 'metal', 'Muhafız fincanı dudaklarına götürüyor.', [['tele_kaldirma'], ['yanki_ikizi']], 'Fincanlar yer değiştirdi; muhafız hiçbir şey fark etmedi.', { on: ['fincan'] }),
      ] },
      secimler: [S('Misket\'e rapor ver', { misket: 35, g_ygk: 5 }, 'Yelpaze yavaşça kapanıyor: "Hızlı ve sessiz. Uma\'nın salonları artık sana açık, tatlım."', { odul: { esya: { uma_karti: 1 } } })] },
    { id: 'MIS-02', ad: 'Dantelin altındaki mektup', tur: 'zincir', k: 3, once: ['MIS-01'], puan: 0, bolge: 'ygk',
      durum: 'Şehir arşivinden çalınan bir ticaret fermanı şehir dışı kapısında bekleyen bir kuryenin çantasında.',
      hikaye: ['Misket: "Dövmek yok. Gürültü yok. Yalnız balmumu kopyası."'],
      cozum: 'Kuryeyi Yankı İkizi ya da Sarı Solis parıltısıyla oyala; çantadaki mührün balmumu kopyasını Metal Şekillendirme ya da Buzul ile al.',
      bulmaca: { dugumler: [
        D('kurye', 'Kapıdaki kurye', -0.3, 'ruzgar', 'Kurye etrafına kaygıyla bakınıyor.', [['yanki_ikizi'], ['solis_firlat'], ['solis_salim']], 'Kurye başka yöne döndü.'),
        D('muhur', 'Çantadaki mühür', 0.4, 'metal', 'Kırmızı balmumu, taze.', [['metal'], ['buzul']], 'Mührün kusursuz kopyası elinde.', { on: ['kurye'] }),
      ] },
      secimSoru: 'Mühür kopyası Misket\'te; o kimin aleyhine kullanacağını seçecek. Sen ne öneriyorsun?',
      secimler: [
        S('Konsey\'e karşı kullanılsın', { misket: 40, g_ygk: -5 }, 'Misket gülümsüyor: "Konsey biraz terlesin." Sirilla seninle gizlice konuşmak istiyor.', { bayrak: ['misketSirilla'] }),
        S('Kraliyet\'e karşı kullanılsın', { misket: 40, g_ygk: 5 }, 'Misket: "Taht biraz sallansın." Sirilla seninle gizlice konuşmak istiyor.', { bayrak: ['misketSirilla'] }),
        S('Kararı ona bırak', { misket: 45 }, '"Akıllıca, tatlım. Kararı veren değil, kararı bekleten kazanır." Sirilla seninle gizlice konuşmak istiyor.', { bayrak: ['misketSirilla'] }),
      ] },
    { id: 'MIS-03', ad: 'Maskeli baloda son hamle', tur: 'hiyerarsi', k: 7, once: ['MIS-02'], puan: 0,
      durum: 'Uma konağındaki gece resepsiyonunda iki rakip elçi aynı odaya kilitlendi: bir şantaj tuzağı.',
      hikaye: ['Misket fısıldıyor: "Odada bir ayna var. Ayna olan yerde kulak vardır."'],
      cozum: 'Hakikat Yankısı ile aynanın arkasındaki dinleyiciyi bul; kilidi Metal Şekillendirme ya da Tele-Kaldırma ile aç.',
      bulmaca: { dugumler: [
        D('ayna', 'Gizli ayna', -0.3, 'kristal', 'Duvar boyu bir ayna; arkasından belli belirsiz bir nefes.', [['hakikat_yankisi'], ['yanki_tarama']], 'Aynanın ardında üçüncü bir elçinin kâtibi dinliyor.'),
        D('kilit', 'Kilitli kapı', 0.4, 'metal', 'İki elçi içeride, birbirine bağırıyor.', [['metal'], ['tele_kaldirma']], 'Kapı sessizce açıldı.', { on: ['ayna'] }),
      ] },
      secimSoru: 'Elçilerle ne yapılsın? Misket ikisinde de kendi çıkarını korur.',
      secimler: [
        S('Elçileri barıştır', { misket: 45, g_ygk: 5, g_bati: 5 }, 'Elçiler el sıkışıyor. Misket\'in yelpazesi hafifçe kapanıyor: "Barış da bir hamledir."', { odul: { esya: { cay_seti: 1 } }, bayrak: ['misketMuhur'] }),
        S('Birbirlerine düşür', { misket: 45, g_ygk: -5 }, 'Elçiler ayrı kapılardan çıkıyor. Misket: "Bazen satranç tahtasından iki taş birden düşer."', { odul: { esya: { cay_seti: 1 } }, bayrak: ['misketMuhur'] }),
      ] },
  ],
  sohbetler: [
    { k: 0, ad: 'Salona giriş', soz: 'Misket: "Bu salona çay içmeye mi geldin, yoksa birilerinin sırrını satın almaya mı?"',
      secenekler: [O('"[Doğrudan] Sır almıyorum; kimin zehirli fincandan içtiğini bilmek istiyorum."', 20, 'Hafifçe gülüyor: "Ne kadar keskin. Hoşuma gitti."'), O('"[İkram] Size nadide bir kristal çiçek getirdim."', 15, '"İpek yakama pek yakışacak."'), O('"[Kaba] Elinde neden silah saklıyorsun, kimin casususun?"', -15, 'Yelpazeyi tek hamlede kapatıyor: "Sorularını bu kadar gürültülü sorarsan, cevapları mezar taşında okursun şekerim."')] },
    { k: 6, ad: 'Yalanın dokusu', soz: 'Misket: "Sence yalan mı daha zarif, yoksa söylenmemiş bir gerçek mi?"',
      secenekler: [O('"Söylenmemiş gerçek; yalan iz bırakır."', 30, '"Öğreniyorsun, tatlım."'), O('"İkisi de seninle konuşurken aynı şey."', 20, 'Gülüyor: "Ah, iltifat mı bu, suçlama mı?"')] },
  ],
  kademeEtki: (d, n) => {
    if (n === 2) d.bayrak.misketSalon = true;
    if (n === 8) d.bayrak.misketMuhur = true;
  },
  imza: { selam: 'Yalanı herkes söyler tatlım; ama onu ipek gibi dokuyup gerçeğin yerine giydirmek sanattır.', tesekkur: 'Küçük bir çay, küçük bir gülümseme ve doğru anda kapanan bir yelpaze. Bazen bir ordudan daha etkilidir.', kizgin: 'Bu salonda kimse göründüğü kişi değil. Ben bile... özellikle ben.' },
  ortam: 'Porselen fincan şıngırtısı, ipek elbise hışırtısı, uzaktan yaylı çalgılar ve kısık fısıltılar.',
});

kisiEkle('sifir', {
  ad: '"Sıfır" Makinist', unvan: 'Kızılkaya buhar atölyesinin cüce ustası', nokta: 'yg_sifir', guc: 'bati', bolgeKisisi: true, yerAdi: 'Filtra, Kızılkaya maden girişi', sinif: 'B',
  hiz: [[0, 10, 1]],
  hizMetni: 'Sınıf B. Uzun lafa tahammülü yok; kısa ve iş gören cevaplar, demir ve alet hediyeleri bağı ilerletir.',
  kimlik: [
    'Yüz yirmi santim boyunda, yağ ve kurum içinde bir cüce; yüzünün yarısını kalın camlı yuvarlak gözlükler kaplıyor.',
    'Elinde çok amaçlı bir İngiliz anahtarı, sırtında içinden buhar sızan bir parça çantası. Büyüye güvenmez; tek pişmanlığı hasta bir çocuk için yapıp çalıştıramadığı buhar golemi.',
  ],
  kademeler: [
    'Yağlı bakış: sana bakmadan "Vida tut. Konuşma." diyor.',
    'İlk vida: tuttuğun vidayı alıp başını hafifçe sallıyor.',
    'Çırak anahtarı: Kızılkaya\'nın sıkışmış asansör ve kapı kilitlerini açan anahtar şemasını veriyor.',
    'Basınç dili: kazanın tıslamasından basıncı okumayı öğretiyor.',
    'Golemin adı: çizimlerin üstünde bir çocuğun adı yazıyor; ne olduğunu sormana izin vermiyor.',
    'Sessiz ortak: atölyedeki hassas basınç tezgâhını ücretsiz kullanmana izin veriyor.',
    'Cüce ile kardeşlik: Cüretkâr Cüce\'nin kaba dökümünü neden kendisinin inceltiğini anlatıyor.',
    'Gözlüksüz: gözlüklerini ilk kez çıkarıp siliyor; gözleri yorgun.',
    'Kalp ustası: yarım kalan golemin çekirdeğini birlikte tamamlıyorsunuz.',
    'Usta anahtarı: kendi yedek anahtarını sana uzatıyor.',
    'Durmayan kalp: golem atölyenin köşesinde saat gibi tıkırdıyor; Filtra\'nın mekanik kapıları seni tanıyor.',
  ],
  sosyal: [['Cüretkâr Cüce', 'Kaba döküm Cüce\'den, hassas dişli Sıfır\'dan.', ''], ['Oronte', 'Savaş makinelerine yalnız parası ödendiği için bakar; siyasetine karışmaz.', '']],
  sever: ['tamir_kiti', 'demir_cevheri', 'komur'], sevmez: ['urun_kristal_cicek', 'huzur_tutsusu', 'borek'],
  hediyeNot: 'Çelik, kömür ve alet; süs ve tatlıya bakmaz bile.',
  severSoz: '"Saf. İyi mal. Sağ ol."', sevmezSoz: '"Bu ne? Dişliye girmez."',
  gorevler: [
    { id: 'SIF-01', ad: 'Üç dişli, sıfır hata', tur: 'bag', k: 0, puan: 0,
      durum: 'Kazanın basıncı düşüyor; on iki milimetrelik üç basınç dişlisi gerek ve hepsi paslı.',
      hikaye: ['"Sıfır" yağlı parmağıyla kırık halkayı gösteriyor: "On iki milimetre. Çatlak. Üç tane. Rayların orada var. Acele et."'],
      cozum: 'Raylardan dişlileri Tele-Kaldırma ile topla; pası Kıvılcım ya da sıcak buharla (Sıvı Yönlendirme) kazı; eğik dişi Metal Şekillendirme ile düzelt.',
      bulmaca: { dugumler: [
        D('ray', 'Maden rayları', -0.5, 'metal', 'Raylar arasında üç dişli, yarı gömülü.', [['tele_kaldirma'], ['toprak_yarma']], 'Üç dişli avucunda.'),
        D('pas', 'Paslı dişliler', 0, 'lav', 'Kalın bir pas tabakası.', [['kivilcim'], ['sivi']], 'Pas döküldü.', { on: ['ray'] }),
        D('dis', 'Eğik diş', 0.5, 'metal', 'Bir dişin ucu bükük.', [['metal']], 'Diş tam on iki milimetre.', { on: ['pas'] }),
      ] },
      secimler: [S('Dişlileri uzat', { sifir: 35, g_bati: 5 }, '"Sıfır" tek kelime etmeden kazanı çalıştırıyor; masaya bir maden asansörü şeması bırakıyor.', { bayrak: ['sifirAsansor'] })] },
    { id: 'SIF-02', ad: 'Eski çekirdeğin sesi', tur: 'zincir', k: 3, once: ['SIF-01'], puan: 0, bolge: 'bati',
      durum: 'Buhar golemi çizimleri kilitli sandıkta. Çekirdeğin deneme atımında valf basıncı yetmiş ile seksen arasında tutulmalı.',
      hikaye: ['"Sıfır": "Pirinç yay. Tavlanmış çelik. Basınç yetmiş-seksen. Fazlası patlar, azı durur."', (d) => (k(d, 'forges') >= 3 || k(d, 'cuce') >= 3 ? 'Forges ya da Cüce tezgâhından tavlanmış çelik plakayı getirdin.' : 'Tavlanmış çeliği kendin döveceksin.')],
      cozum: 'Pirinç yayı Metal Şekillendirme ile tavla; deneme atımında basıncı Sıvı Yönlendirme ya da Buzul soğutmasıyla aralıkta tut.',
      bulmaca: { dugumler: [
        D('yay', 'Pirinç yay ve çelik plaka', -0.3, 'metal', 'Ham pirinç ve yumuşak çelik.', [['metal'], ['kivilcim', 'buzul']], 'Yay ve plaka tavlandı.'),
        D('valf', 'Deneme atımı valfi', 0.4, 'su', 'Basınç tırmanıyor: altmış, yetmiş beş, doksan...', [['sivi'], ['buzul']], 'Basınç yetmiş sekizde dengelendi; çekirdek ilk kez nefes aldı.', { on: ['yay'], pencere: 20 }),
      ] },
      secimler: [S('Çekirdeğin nefesini dinle', { sifir: 40, cuce: 10 }, '"Sıfır" gözlüklerinin ardından uzun uzun bakıyor: "Tezgâh senin. Zırh ve silah tamirinde malzemeyi az harcarsın artık."', { bayrak: ['sifirTamir'] })] },
    { id: 'SIF-03', ad: 'Durmayan kalp', tur: 'bag', k: 7, once: ['SIF-02'], puan: 0,
      durum: 'Kızılkaya\'nın alt galerisinde yarım kalmış küçük buhar golemi; göğüs kafesindeki buhar kanalı tıkalı.',
      hikaye: ['"Sıfır" sesini alçaltıyor: "Bir kalp yapacaktım. Pirinçten, buhardan. Durdu. Bu sefer... durmayacak."'],
      cozum: 'Golemi Tele-Kaldırma ya da Ağırlık Sıfırlama ile atölyeye taşı; kanalı Sıvı Yönlendirme ya da Kıvılcım ile aç; göğsüne piezo kristal ve zembereği yerleştir.',
      bulmaca: { dugumler: [
        D('golem', 'Yarım buhar golemi', -0.5, 'metal', 'Ağır, hareketsiz, göğsü açık.', [['tele_kaldirma'], ['agirlik_sifir']], 'Golem atölyede.'),
        D('kanal', 'Tıkalı buhar kanalı', 0, 'su', 'Kanal tortu ve pasla dolu.', [['sivi'], ['kivilcim']], 'Kanal açıldı.', { on: ['golem'] }),
        D('kalp', 'Göğüs yuvası', 0.5, 'kristal', 'Zemberek bekliyor; piezo yuvası boş.', [['piezo'], ['frekans_anahtari']], 'Golem iki adım atıyor; saat gibi tıkırdıyor.', { on: ['kanal'] }),
      ] },
      secimler: [S('Anahtarı al', { sifir: 50 }, '"Sıfır" gözlüklerini çıkarıp siliyor ve yedek usta anahtarını sana uzatıyor. Filtra\'nın mekanik kapıları artık kendiliğinden açılıyor.', { odul: { esya: { usta_anahtari: 1 } }, bayrak: ['filtraKapi'] })] },
  ],
  sohbetler: [
    { k: 0, ad: 'Beş saniye', soz: '"Sıfır": "Basınç düşüyor. Beş saniyen var. Parça mı getirdin, yoksa boş laf mı?"',
      secenekler: [O('"[Doğrudan] Hangi dişli eksik? Göster, getireyim."', 20, '"On iki milimetre. Üç tane. Acele et."'), O('"[İkram] Demir cevheri ve tamir kiti."', 15, 'Cevheri avucunda tartıyor: "Saf. İyi mal."'), O('"[Sohbet] Büyüyle bu boruları bir saniyede onarabilirim."', -10, '"Büyü metali gevşetir. Kaynağı bozar. İstemem."')] },
    { k: 6, ad: 'Golemin adı', soz: '"Sıfır" çizimin köşesindeki silik adı başparmağıyla siliyor. Hiçbir şey söylemiyor.',
      secenekler: [O('Yanına otur, sessizce bir vida uzat.', 35, 'Vidayı alıyor. Bir süre ikiniz de konuşmuyorsunuz.'), O('"Kimdi o çocuk?"', 5, '"Sonra." Gözlüklerini indiriyor.')] },
  ],
  kademeEtki: (d, n) => {
    if (n === 2) d.bayrak.sifirAsansor = true;
    if (n === 5) d.bayrak.sifirTezgah = true;
  },
  imza: { selam: 'Çok konuşan usta değil, boş konuşan müşteridir. Vidayı ver.', tesekkur: 'Bir kalp yapacaktım... pirinçten ve buhardan. Durdu. Bu sefer durmayacak.', kizgin: 'Büyünüzü kendinize saklayın. Dişli kırıldı mı, onu sadece çelik ve sabır toplar.' },
  ortam: 'Ritmik çekiç vuruşları, buhar valfi tıslaması, saat dişlilerinin tık tıkı ve kömür ocağının uğultusu.',
});

kisiEkle('zahra', {
  ad: 'Zahra Elmas Göz', unvan: 'Zorah Vaha Pazarı\'nın kervan hanımı', nokta: 'yg_zahra', guc: 'dogu', bolgeKisisi: true, yerAdi: 'Doğu çöl kantonları, ipek tenteli kervan köşkü', sinif: 'B',
  hiz: [[0, 10, 1]],
  hizMetni: 'Sınıf B. Tatlı dilli ve adil görünür; tehdit bağı kırar, ince hediye ve sabırlı pazarlık ilerletir.',
  kimlik: [
    'Altın kahvesi, keskin gözler; siyah örgülerle süslü saçlar ve kat kat ipek tacir giysileri.',
    'Dışarıdan dürüst ve saygılı bir tüccar; gerçekte yasaklı malların, zehirlerin ve kaçak silah parçalarının ana tedarikçisi. Batı ile Doğu arasındaki gerilimden iki taraf için de kâr eder.',
  ],
  kademeler: [
    'Tatlı dilli ev sahibi: hurma ve çay ikram ediyor; yalnız standart kervan malları satıyor.',
    'Terazinin dili: adil fiyatın nasıl tartıldığını anlatıyor.',
    'Kervan ortağı: tezgâhının altındaki nadir piezo kristal, ışık otu ve hediye stoklarını açıyor.',
    'Çöl bitkileri: hangi çiçeğin şifa, hangisinin uyku verdiğini öğretiyor.',
    'Kasım\'ın kredisi: Şeyh Kasım\'ın kervanlarının yarısının kendi kredisiyle yürüdüğünü söylüyor.',
    'Elmas Göz\'ün sırdaşı: Filtra ile Zorah arasındaki kaçak sevkiyat rotalarını haritana işliyor.',
    'Misket\'in notları: Malkenia\'daki mühürlü yazışmasını ima ediyor.',
    'Peçesiz: ilk kez peçesini indiriyor; yüzünde eski bir yanık izi.',
    'İki tarafın taciri: hem Zorah hem Filtra görevlerinde rakip ambargolarını kıran mühürü veriyor.',
    'Terazinin öbür kefesi: ticaretinin hangi kısmını kimsenin bilmediğini anlatıyor.',
    'Ortak ya da vicdan: seni ya ortağı ya da onu dizginleyen tek kişi sayıyor.',
  ],
  sosyal: [['Şeyh Kasım', 'Önünde saygılı, vergisini gününde ödeyen örnek bir kervan hanımı.', ''], ['Silahşör Zeno', 'Kervanlarının baharat taşımadığından şüphelenir ama kanıt bulamaz.', 'ZAH-02\'de ihbar seçeneği.'], ['Bayan Misket', 'Sosyete zehirlerini ondan alır.', '']],
  sever: ['urun_vaha_hurmasi', 'sise_solis', 'gumus_tozu'], sevmez: ['ekmek', 'komur', 'tamir_kiti'],
  hediyeNot: 'Çölün bereketi ve parlayan ışık; kaba ekmek ve alet kokusu onu sıkar.',
  severSoz: '"Çölün bereketini bilen yolcular her zaman baş tacıdır."', sevmezSoz: '"Bunu kervanıma yük diye mi koyayım yolcu?"',
  gorevler: [
    { id: 'ZAH-01', ad: 'Altın çölün iki yüzlü baharatı', tur: 'bag', k: 0, puan: 0,
      durum: 'Zahra\'nın kum fırtınasında kaybolan "baharat sandığı" doğu kumullarındaki bir harabede.',
      hikaye: ['Zahra hiç bozulmayan gülümsemesiyle: "İnsanlar çöl rüzgârı gibidir, her duyduklarına isim takarlar. Git o sandığı çıkar; içindekinin değerini gözlerinle gör."'],
      cozum: 'Sandığın çevresindeki aşırı ışığı Sarı Solis şişesine çek (şişeleme) ya da Hava Kontrolü ile kum perdesini dağıt; sandığı Tele-Kaldırma ile çıkar.',
      bulmaca: { hava: 0, dugumler: [
        D('perde', 'Kum perdesi ve kızgın ışık', -0.3, 'toz', 'Sandığın üstünde göz alan bir ışık ve dönen kum.', [['bos_sise'], ['hava_ruzgar'], ['hava_durgun']], 'Kum yattı; ışık sakinleşti.'),
        D('sandik', 'Yarı gömülü sandık', 0.4, 'tas', 'Maun sandık; kilidi mühürlü.', [['tele_kaldirma'], ['toprak_yarma']], 'Sandık açık: baharat değil, zehirli çöl çiçekleri.', { on: ['perde'] }),
      ] },
      secimler: [S('Zahra\'ya sor', { zahra: 35, g_dogu: 5 }, 'Zahra gülümsüyor, sana sus payı ve özel ticaret indirimi uzatıyor. Gizli hediye ve iksir tezgâhı artık açık.', { odul: { esya: { piezo: 2, gumus_tozu: 2 } }, bayrak: ['zahraTezgah'] })] },
    { id: 'ZAH-02', ad: 'Rakip kervanın sessiz çöküşü', tur: 'zincir', k: 3, once: ['ZAH-01'], puan: 0, bolge: 'dogu',
      durum: 'Zahra\'nın ticaretini baltalayan sahtekâr bir kaçakçı kervanı Zorah\'ın kuzey kuyularında kamp kurmuş.',
      hikaye: ['Zahra: "Saldırma. Kan dökmek kervana yakışmaz. Biraz acı su, iki gün uyku... yeter."'],
      cozum: 'Fıçıları Sıvı Yönlendirme ile acı tuzlu kuyu suyuyla karıştır ya da Canlı Sarmaşık ile kuyuyu kapat (ölümcül değil); ya da hiç dokunmadan Zeno\'ya ihbar et.',
      bulmaca: { dugumler: [
        D('kuyu', 'Kervanın su fıçıları', 0, 'su', 'Fıçılar tatlı suyla dolu; yanda acı tuzlu bir kuyu.', [['sivi'], ['sarmasik']], 'Fıçılardaki su acılaştı; kervan iki gün yerinden kıpırdamayacak.'),
      ] },
      secimSoru: 'Kervanla ne yapılsın?',
      secimler: [
        S('Sabotajı tamamla', { zahra: 40 }, 'Zahra Filtra ile Zorah arasındaki gizli geçidi haritana işliyor; kaçak kristal ve hediye tedarikinde indirim.', { bayrak: ['zahraIndirim', 'zahraGecit'] }),
        S('Kervanı Zeno\'ya ihbar et', { zahra: 30, zeno: 20 }, 'Zeno kervanı kan dökmeden kuşatıyor. Zahra kaşını kaldırıyor ama sözünü tutuyor: geçit ve indirim senin.', { bayrak: ['zahraIndirim', 'zahraGecit'] }),
      ] },
    { id: 'ZAH-03', ad: 'İki krala aynı kılıç', tur: 'hiyerarsi', k: 7, once: ['ZAH-02'], puan: 0,
      durum: 'Hem Oronte\'ye hem Şeyh Kasım\'a gönderilecek iki mühürlü kervan sandığı; sınır gümrüklerinden taratmadan geçmeli.',
      hikaye: ['Zahra: "Ben kimseyi seçmem yolcu. Batı da altın öder, Doğu da."'],
      cozum: 'Hakikat Yankısı ile gümrük memurunun gerçekte ne aradığını bul; sandığın mührünü Öz Bağlama ile sahte kervan beratına eşle.',
      bulmaca: { dugumler: [
        D('gumruk', 'Sınır gümrüğü', -0.3, 'fisilti', 'Memur sandıkları tek tek açtırıyor.', [['hakikat_yankisi'], ['zihin_arindirma']], 'Memur aslında yalnız silah barutunu arıyor.'),
        D('berat', 'Mühürlü sandıklar', 0.4, 'metal', 'İki mühür, iki krallık.', [['oz_baglama'], ['metal']], 'Mühürler berata eşlendi; sandıklar taranmadan geçti.', { on: ['gumruk'] }),
      ] },
      secimSoru: 'Zahra\'nın savaştan nasıl kâr ettiğini gördün.',
      secimler: [
        S('Ortağı ol', { zahra: 45, g_dogu: 5, g_bati: 5 }, 'Zahra peçesini indiriyor: "Terazinin iki kefesi artık bizim." Tarafsız Kervan Mühürü senin.', { odul: { esya: { tarafsiz_muhur: 1 } } }),
        S('Ticareti barışçıl mallarla sınırlamasını şart koş', { zahra: 40, g_dogu: 5, zeno: 10 }, 'Zahra uzun uzun bakıyor: "Bir vicdan ortağım olmamıştı." Tarafsız Kervan Mühürü yine senin.', { odul: { esya: { tarafsiz_muhur: 1 } }, bayrak: ['zahraBaris'] }),
      ] },
  ],
  sohbetler: [
    { k: 0, ad: 'Hurma tepsisi', soz: 'Zahra: "Ruhun için mi mal arıyorsun, yoksa rakiplerinin uykusunu kaçıracak bir sır mı?"',
      secenekler: [O('"[Doğrudan] Kayıp sandığı soruyorum; içinde baharat olmadığı söyleniyor."', 15, '"Madem bu kadar meraklısın, git o sandığı çıkar."'), O('"[İkram] Taze vaha hurması ve gümüş tozu getirdim."', 20, '"Ne ince bir düşünce. Sana özel fiyat listemi açayım."'), O('"[Tehdit] Kaçakçılığını Şeyh Kasım\'a söylersem?"', -15, 'Gözleri buz gibi parlıyor: "Kervanlarının yarısının benim kredimle yürüdüğünü hatırlatırım yolcu."')] },
    { k: 6, ad: 'Dürüstlüğün ipeği', soz: 'Zahra: "Dürüstlük en pahalı ipektir. Sen hangi ipeği giyiyorsun?"',
      secenekler: [O('"Altında hançer olmayanı."', 25, '"Ah, ender bir kumaş."'), O('"Kervanın ihtiyacı olanı."', 30, 'Gülümsüyor: "Tacir gibi konuştun."')] },
  ],
  kademeEtki: (d, n) => {
    if (n === 2) d.bayrak.zahraTezgah = true;
    if (n === 5) d.bayrak.zahraGecit = true;
  },
  imza: { selam: 'Ben kimseyi seçmem yolcu. Batı da altın öder, Doğu da... benim terazim sadece ağırlığı tartar.', tesekkur: 'Dürüstlük en pahalı ipektir; onu herkesin önünde giyerim ki kimse altındaki hançeri sormasın.', kizgin: 'Çölde bir bitki ya şifa verir ya da sessizce uyutur. Hangisini alacağın, ödediğin fiyata bağlı.' },
  ortam: 'İpek tentelerde çöl rüzgârı, uzaktan deve çanları, bakır tartıların şıngırtısı ve hafif ud tınıları.',
});

kisiEkle('kikirdak', {
  ad: 'Doktor Kıkırdak', unvan: 'Flee Plee\'nin goblin kimyageri', nokta: 'yg_kikirdak', guc: 'guney', bolgeKisisi: true, yerAdi: 'Flee Plee, Çöplük İskelesi\'nin arkasındaki Patlamaz Laboratuvar', sinif: 'B',
  hiz: [[0, 10, 1]],
  hizMetni: 'Sınıf B. Merak ve cesaret onu mutlu eder; sakinlik ve çay önerisi bağı geriletir.',
  kimlik: [
    'Kısa, kambur, iskelet gibi zayıf bir goblin; asit lekeli yeşil derisi ve sürekli burnunun ucuna kayan kocaman miyop gözlükler.',
    'Elinde titreyen, renkli duman çıkaran bir şişe ve paslanmaz çelik bir maşa. Laboratuvarı günde en az iki kez küçük bir şeyi patlatır; kötü niyetli değil ama güvenlik kavramı sıfır.',
  ],
  kademeler: [
    'Kobay adayı: eline bir maşa tutuşturup "Patlarsa sağa atla!" diyor.',
    'Köpük okuması: hangi rengin ne zaman patlayacağını kıkırdayarak anlatıyor.',
    'Duman çırağı: Flee Plee kanallarındaki zehirli gazı nötralize eden kireç maskesi ve panzehir veriyor.',
    'Mantar defteri: bataklık mantarlarının kimyasını paylaşıyor.',
    'Xaela\'nın kırmızı işareti: laboratuvarının ağ haritasında neden kırmızı olduğuna gülüyor.',
    'Reaksiyon ortağı: bulmacalar için renkli işaret dumanı şişeleri üretiyor.',
    'Barracuda\'nın bombaları: korsanın kükürt bombalarının tarifini fısıldıyor.',
    'Gözlüksüz bir an: gözlükleri düşüyor; seni ilk kez net görüyor ve kahkahayı kesiyor.',
    'Patlamaz efsane: kararsız kristal reaksiyonlarını güvenceye alan dengeleyici özü buluyor.',
    'Konfeti: Flee Plee halkı ilk kez laboratuvarı alkışlıyor.',
    'En nadir şişe: koleksiyonunun en kıymetlisini sana veriyor.',
  ],
  sosyal: [['Xaela', 'Laboratuvarını kırmızıyla işaretler, soğutma sıvısını yine de ondan alır.', ''], ['Kaptan Barracuda', 'Güverte farelerini kaçıran kükürt bombalarını ondan alır.', ''], ['Nyxara Vel\'din', 'Adamlarının attığı kristal tortusunu gübreye çevirmek ister.', 'KIK-03']],
  sever: ['urun_fosforlu_liken', 'sise_solis', 'sise_lumina'], sevmez: ['huzur_tutsusu', 'dunya_cayi', 'muhur_kutusu'],
  hediyeNot: 'Parlayan, kaşındıran, köpüren her şey; çay ve tütsü onu öldüresiye sıkar.',
  severSoz: '"Ooooh! Parlak! Kaşıntılı! Harika!"', sevmezSoz: '"Çay mı?! İçinde köpük yoksa sıcak sudur!"',
  gorevler: [
    { id: 'KIK-01', ad: 'Yeşil köpük ve kaçan mantarlar', tur: 'bag', k: 0, puan: 0,
      durum: 'Devrilen kazandan üç fosforlu liken özütü sızıyor; dumanı nötrleştirmek için iki acı bataklık mantarı gerek.',
      hikaye: ['Kıkırdak: "Hıhıhı! Şu yeşil olukları kapat, yoksa mantarlar canlı canlı dans etmeye başlar!"'],
      cozum: 'Sızıntıyı Sıvı Yönlendirme ile oluklara çek; bataklık mantarlarını Tele-Kaldırma ile kazana at; dumanı Hava Kontrolü ile süpür.',
      bulmaca: { dugumler: [
        D('sizinti', 'Yerdeki yeşil özüt', -0.5, 'su', 'Üç ince yeşil dere yere yayılıyor.', [['sivi']], 'Özüt oluklara aktı.'),
        D('mantar', 'Acı bataklık mantarları', 0, 'bitki', 'Pencere dışında, bataklık kenarında.', [['tele_kaldirma'], ['sarmasik']], 'Mantarlar kazanda; duman sarıya döndü.', { on: ['sizinti'] }),
        D('duman', 'Sarı duman', 0.5, 'ruzgar', 'Laboratuvar dumanla doldu.', [['hava_ruzgar'], ['zihin_arindirma']], 'Duman çekildi.', { on: ['mantar'] }),
      ] },
      secimler: [S('Formülü al', { kikirdak: 35, g_guney: 5 }, 'Kıkırdak tırmalayıcı bir kahkaha atıp sana kireç maskesini ve panzehir formülünü veriyor: Flee Plee gazları ve bataklık zehri artık seni yormaz.', { odul: { esya: { kikirdak_maskesi: 1 } }, yap: (d) => muaf(d, 'toz_sisi', 'bataklik') })] },
    { id: 'KIK-02', ad: 'Şişedeki güneşin kimyası', tur: 'zincir', k: 3, once: ['KIK-01'], puan: 0, bolge: 'guney',
      durum: 'Kıkırdak\'ın gizemli şişesinin basıncı kritik; sakinleştirmek için bir Beyaz Lumina ve gümüş tozu gerek, ateşin rengi sabit kalmalı.',
      hikaye: ['Kıkırdak şişeyi sallıyor: "Ya su altı fenerine dönüşecek ya da iskelenin yarısını yeşile boyayacak!"'],
      cozum: 'Lumina salımıyla şişeyi besle; ateşi Sarı Solis salımı ya da Kıvılcım ile sabit tut.',
      bulmaca: { dugumler: [
        D('sise', 'Titreyen şişe', -0.3, 'kristal', 'Şişe tıslıyor, renk değiştiriyor.', [['lumina_salim']], 'Şişe turkuaza döndü, sakinleşiyor.'),
        D('ates', 'Bunsen ateşi', 0.4, 'lav', 'Ateş titriyor; renk sabit kalmalı.', [['solis_salim'], ['kivilcim']], 'Şişeden turkuaz bir ışık yükseliyor: Sabit İşaret İksiri.', { on: ['sise'], pencere: 25 }),
      ] },
      secimler: [S('İksiri test et', { kikirdak: 40 }, '"Patlamadı! Neden patlamadı? Harika!" Tarifi sana veriyor; işaret iksirleri karanlık tünellerde bulmaca plakalarını tetikler.', { odul: { esya: { isaret_iksiri: 2 } } })] },
    { id: 'KIK-03', ad: 'Büyük deney: çatıyı uçurma!', tur: 'bag', k: 7, once: ['KIK-02'], puan: 0,
      durum: 'Nyxara\'nın adamlarının attığı atık kristal tortusu güvenli taş havuzda; Kıkırdak onu zararsız gübreye çevireceğini iddia ediyor.',
      hikaye: ['Kıkırdak: "Ya gübre olacak ya da gökyüzü altın olacak! İkisi de güzel!"'],
      cozum: 'Tortuyu Toprak Yarma ya da Sıvı Yönlendirme ile seyrelt; köpüğün patlamasını Kalkan Aşırtma ya da Buzul ile yumuşat.',
      bulmaca: { dugumler: [
        D('tortu', 'Kristal tortusu', -0.3, 'kristal', 'Mor, kararsız bir çamur.', [['toprak_yarma'], ['sivi']], 'Tortu seyreldi.'),
        D('kopuk', 'Kabaran köpük', 0.4, 'lav', 'Köpük kabarıyor, kabarıyor...', [['kalkan_asirtma'], ['buzul']], 'Puf! Gökyüzüne zararsız altın konfeti yükseliyor.', { on: ['tortu'] }),
      ] },
      secimler: [S('Alkışlara katıl', { kikirdak: 50, g_guney: 5 }, 'Flee Plee halkı alkışlıyor. Kıkırdak en nadir şişesini sana veriyor: şişeleme artık iki kat hızlı.', { odul: { esya: { kikirdak_sisesi: 1 } } })] },
  ],
  sohbetler: [
    { k: 0, ad: 'Maşa', soz: 'Kıkırdak: "Tam zamanında geldin uzun bacaklı! Maşayı tutar mısın?"',
      secenekler: [O('"[Kabul] Ver maşayı, önce şu sızıntıyı durduralım."', 20, '"Harika! Ölümden korkmayan asistan!"'), O('"[İkram] Fosforlu liken ve Solis şişesi getirdim."', 20, '"Bugün kesin yeni bir renk icat edeceğim, hıhıhı!"'), O('"[Ciddiyet] Sakin olup bir çay içsen?"', -10, '"Git başımdan, deneyimi soğutuyorsun!"')] },
    { k: 6, ad: 'Güvenlik', soz: 'Kıkırdak: "Güvenlik mi? O da hangi kimyasalın adı?"',
      secenekler: [O('"Seni sağ tutan kimyasal."', 25, 'Kahkahası bir an duruyor: "...Bunu not alacağım. Sonra patlatırım."'), O('"Hiç duymadım."', 20, '"İşte benim asistanım!"')] },
  ],
  kademeEtki: (d, n) => {
    if (n === 2) muaf(d, 'toz_sisi', 'bataklik');
    if (n === 5) ZN.ekle(d, 'isaret_iksiri', 1);
  },
  imza: { selam: 'Hıhıhı! Patlamadıysa henüz yeterince karıştırmamışız demektir!', tesekkur: 'Senin o büyülü ışığını şu yeşil sıvıyla birleştirelim... merak etme, en fazla kaşların yanar!', kizgin: 'Güvenlik mi? O da hangi kimyasalın adı? Hiç duymadım!' },
  ortam: 'Fokurdayan cam balonlar, şişe şıngırtısı, arada küçük puf patlamaları ve tırmalayıcı bir kıkırtı.',
});

kisiEkle('cakal', {
  ad: 'Usta Çakal', unvan: 'Veradon Hanı\'nın yarı-tilki düzenbazı', nokta: 'yg_cakal', guc: 'guney', bolgeKisisi: true, yerAdi: 'Veradon Hanı, şömine yanındaki köşe masa', sinif: 'B',
  hiz: [[0, 10, 1]],
  hizMetni: 'Sınıf B. Eğlenceli ve cesur cevapları sever; aşırı ciddiyet ve vaaz bağı geriletir.',
  kimlik: [
    'İnsan gövdesi, dik ve hareketli tilki kulakları, kalın kırmızımsı bir kuyruk; yıpranmış ama kusursuz kesimli eski moda bir smokin.',
    'Gizli bıçaklı bir baston ve onlarca sahte mühürle dolu bir koleksiyon taşır. Fakirden asla çalmaz; tek hedefi kibirli zenginler ve yolsuz memurlar.',
  ],
  kademeler: [
    'Masa arkadaşı: zar oyunu teklif ediyor; bilgiyi hemen vermiyor, önce şaka yapıyor.',
    'Ses taklidi: gümrük kâtibinin sesini birebir taklit edip seni güldürüyor.',
    'Tilki kardeş: Veradon pazarındaki kazıkçıları atlatmanı ve arka kapıları kullanmanı sağlıyor.',
    'Bastonun sırrı: bastonunun gizli kilidini gösteriyor.',
    'Miranda\'nın şamdanı: altın şamdan hikâyesini kendi ağzından anlatıyor.',
    'Mühür ortağı: savaşmadan geçebileceğin sahte gümrük izin belgesi basıyor.',
    'Misket\'le dans: Bayan Misket\'le eski bir balo hikâyesi.',
    'Kuyruk ve gurur: kuyruğuyla alay eden bir soyluya neler yaptığını anlatıyor.',
    'Büyük oyuncu: kibirli soyluların nadir eşyalarını "sessizce ödünç almanın" tam ağını açıyor.',
    'Tilki kartı: kartvizitlerinden birini senin adınla basıyor.',
    'Şans parası: gülümseyen tilkinin mühürlü parasını sana veriyor.',
  ],
  sosyal: [['Bayan Misket', 'Onu "fazla gürültülü" bulur ama sahte mühür için kapısını çalar.', ''], ['Miranda Caledor', 'Akrabasının altın şamdanını tahta kopyasıyla değiştirdiği söylenir.', ''], ['Corinne', 'CAK-03\'teki arşiv anahtarı ona da gidebilir.', 'CAK-03']],
  sever: ['borek', 'muhur_kutusu', 'bal'], sevmez: ['demir_cevheri', 'komur', 'sakin_cay'],
  hediyeNot: 'Sofrayı ve mühürü sever; ağır, kömür kokan ve uyutan şeyleri sıkıcı bulur.',
  severSoz: '"İşte asalet! Seninle büyük işler çevireceğiz dostum!"', sevmezSoz: '"Bununla mı yolculuk ediyorsun? Ne sıkıcı!"',
  gorevler: [
    { id: 'CAK-01', ad: 'Üç ses, bir mühür', tur: 'bag', k: 0, puan: 0,
      durum: 'Hanın kapısında kibirli bir Veradon vergi tahsildarı; üç köylünün son ekmeğini almaya gidiyor.',
      hikaye: ['Çakal kuyruğunu sallıyor: "Gel, beş dakikada ona kendi sesiyle kendi emrini iptal ettirelim!"'],
      cozum: 'Tahsildarın imza mührünü Hakikat Yankısı ile uzaktan oku; Yankı İkizi ile koridorda sahte bir ses çıkar ya da şerbeti Tele-Kaldırma ile cübbesine çarptır.',
      bulmaca: { dugumler: [
        D('tahsildar', 'Kibirli tahsildar', -0.3, 'fisilti', 'Mühür yüzüğünü parmağında çeviriyor.', [['hakikat_yankisi'], ['yanki_tarama']], 'Mührün deseni aklında.'),
        D('oyalama', 'Koridor', 0.4, 'ruzgar', 'Tahsildar mührü bir an bile bırakmıyor.', [['yanki_ikizi'], ['tele_kaldirma']], 'Tahsildar arkasını döndü; Çakal balmumu kalıbını saniyede kopyaladı.', { on: ['tahsildar'] }),
      ] },
      secimler: [S('Ganimeti paylaş', { cakal: 35, g_guney: 5 }, 'Ganimet altın değil: üç köylünün borcu silinmiş tapuları. Çakal sana Veradon\'un arka sokak kısayollarını öğretiyor.', { bayrak: ['cakalKisayol'] })] },
    { id: 'CAK-02', ad: 'Kuyruğu yakalanmayan hırsız', tur: 'zincir', k: 3, once: ['CAK-01'], puan: 0, bolge: 'guney',
      durum: 'Çakal\'ın eski ortağı onu Malkenia muhafızlarına ihbar etmek üzere; buluşma yeri Veradon saat kulesi.',
      hikaye: ['Çakal: "Saati on beş dakika kaydırırsak muhafızlar boş kuleye baskın yapar. Saat mekanizması inatçıdır ama."'],
      cozum: 'Saat mekanizmasını Metal Şekillendirme ya da Sıvı Yönlendirme ile şaşırt; kule ışığını Lumina ile yanılt.',
      bulmaca: { dugumler: [
        D('saat', 'Saat kulesi mekanizması', -0.3, 'metal', 'Dev dişliler; tik tak.', [['metal'], ['sivi']], 'Saat on beş dakika geri kaldı.'),
        D('isik', 'Kule feneri', 0.4, 'kristal', 'Muhafızlar fenere bakarak saat tutuyor.', [['lumina_salim'], ['solis_salim']], 'Muhafızlar boş kuleye baskın yaptı; çanta kurtuldu.', { on: ['saat'] }),
      ] },
      secimler: [S('Çantayı Çakal\'a ver', { cakal: 40 }, 'Çakal çantayı göğsüne bastırıyor: "Dostum! Al şunu, bir daha hiçbir kâtip yolunu kesemeyecek." Sahte gümrük geçiş belgesi.', { odul: { esya: { sahte_gumruk_belgesi: 1 } }, yap: (d) => muaf(d, 'denetim') })] },
    { id: 'CAK-03', ad: 'Kibirli baronun altın kafesi', tur: 'bag', k: 7, once: ['CAK-02'], puan: 0,
      durum: 'Veradon dışındaki bir baron akademi öğrencilerine ait eski bir arşiv anahtarını süs diye kasasına kilitlemiş.',
      hikaye: ['Çakal sahte davetiyeyi uzatıyor: "Baloya gir, baronu oyala, kasayı aç. Yerine tilki kartımı bırakırız."'],
      cozum: 'Baronun dikkatini Yankı İkizi ya da kristal çan sesiyle dağıt; kasayı Metal Şekillendirme ya da Öz Bağlama ile mührü kırmadan aç.',
      bulmaca: { dugumler: [
        D('baron', 'Balodaki baron', -0.3, 'kristal', 'Baron kasanın önünden ayrılmıyor.', [['yanki_ikizi'], ['zihin_arindirma']], 'Baron salonun öbür ucunda bir sesi arıyor.'),
        D('kasa', 'Altın kafesli kasa', 0.4, 'metal', 'Ağır bir kilit, üstünde aile mührü.', [['metal'], ['oz_baglama']], 'Kasa açık; içinde arşiv anahtarı. Yerine gülümseyen bir tilki kartı bıraktın.', { on: ['baron'] }),
      ] },
      secimSoru: 'Arşiv anahtarı kime gitsin? İkisi de görevi tamamlar.',
      secimler: [
        S('Çakal\'a ver', { cakal: 50 }, 'Çakal anahtarı havaya atıp yakalıyor: "Ortağım!" Tilki mühürlü şans parası senin.', { odul: { esya: { sans_parasi: 1 } } }),
        S('Corinne\'e ulaştır', { cakal: 40, corinne: 25 }, 'Corinne gözyaşlarıyla anahtarı arşivine geri koyuyor. Çakal omuz silkiyor: "Kitap kurtları da insan." Şans parası yine senin.', { odul: { esya: { sans_parasi: 1 } } }),
      ] },
  ],
  sohbetler: [
    { k: 0, ad: 'Pahalı yalan', soz: 'Çakal: "Sana bedava bir tavsiye mi vereyim, yoksa pahalı bir yalan mı satayım?"',
      secenekler: [O('"[Eğlenceli] Yalanın ne kadar eğlenceli olduğuna bağlı."', 20, 'Kuyruğu heyecanla sallanıyor: "İşte benim dilimden konuşan biri!"'), O('"[İkram] Masaya börek ve şerbet söyledim."', 20, '"İşte asalet!"'), O('"[Ciddiyet] Sahte belge suç değil mi?"', -10, '"Burada tek suçlu şakadan anlamayan sıkıcı tiplerdir. Rahatla biraz."')] },
    { k: 6, ad: 'Kimden çalmalı', soz: 'Çakal: "Söyle dostum, kibirli bir baronla aç bir çocuk aynı ekmeğe uzansa?"',
      secenekler: [O('"Ekmek çocuğun; baronun cüzdanı senin."', 35, 'Kahkahayı basıyor: "Sana kartvizit basmalıyım!"'), O('"Ekmeği bölüştürürüm."', 20, '"Ah, dürüst biri. Nadir tür."')] },
  ],
  kademeEtki: (d, n) => {
    if (n === 2) d.bayrak.cakalKisayol = true;
    if (n === 8) d.bayrak.cakalAg = true;
  },
  imza: { selam: 'Çalmak mı? Haşa! Ben sadece kibirli insanların fazlalıklarını daha neşeli ellere aktarıyorum.', tesekkur: 'Bir mühür, iyi bir ses taklidi ve zamanında atılan bir adım... koca bir muhafız birliğini çay molasına gönderir!', kizgin: 'Ciddiyet en büyük tuzaktır dostum; gülümse ki kimse elindeki kartları sayamasın!' },
  ortam: 'Şömine çıtırtısı, han kalabalığının uğultusu, ahşap masada yuvarlanan zarlar ve taş zeminde bir baston.',
});

// Paket 15 Durak 2: Keşiş Vaelor (Arin antik tapınağı). LAN-01 onun görevi; Yol B (Xaela ya da Ignador ile zorla senkron)
// büyüsüz de yapılır (zero-deadlock).
kisiEkle('vaelor', {
  ad: 'Keşiş Vaelor', unvan: 'Arin antik tapınağının kör keşişi', nokta: 'arin_tapinagi', guc: 'guney', bolgeKisisi: true, yerAdi: 'Uçan Arin Adası, kayaya oyulmuş tapınak', sinif: 'B',
  hiz: [[0, 10, 1]],
  hizMetni: 'Sınıf B. Acele edeni kibarca yavaşlatır; sabır ve ciddiyet bağı ilerletir, acelecilik geriletir.',
  kimlik: [
    'Rüzgârdan solmuş gümüşi bir cüppe, boynunda üç küçük tunç rüzgâr çanı; gözleri körleşmiş ama kulakları keskin.',
    'Ne YGK\'nın askerî acelesini ne Malkenia sosyetesinin entrikasını umursar. Zamanı rüzgârın ve tunç çanların yankısıyla ölçer.',
  ],
  kademeler: [
    'Rüzgârdaki yolcu: seni adımlarının sesinden tanıyor; acele ettiğini söylüyor.',
    'Çanların sayısı: boynundaki üç çanın neden üç olduğunu anlatıyor.',
    'Sessiz nefes: tapınak basamaklarında birlikte oturup rüzgârı dinliyorsunuz.',
    'Köprü yarığı: kırık taş köprünün hikâyesini anlatıyor.',
    'Tunç çanın sesi: iç sunaktaki kadim çanı bir kez çalıyor; yankısı adayı dolaşıyor.',
    'Rüzgârın yönü: fırtınanın senden ne sakladığını ancak sessiz kalınca duyacağını söylüyor.',
    'Zephyra\'nın göğü: rüzgâr cadısının adını saygıyla anıyor.',
    'Gözsüz bakış: kör gözlerini sana çeviriyor; "Yükün hafiflemiş," diyor.',
    'Çanın özü: sunağın kilidini senin için kendi elleriyle aralıyor.',
    'Dönüş sözü: lanetli göğe sıçrayana kendi sesini kaybetmemesini öğütlüyor.',
    'Rüzgâr kardeşliği: boynundaki çanlardan birini sana veriyor.',
  ],
  sosyal: [['Zephyra', 'Rüzgârı onun kadar iyi dinleyen kimse yok, der.', ''], ['Elyndra ve Drahmir', 'Yıldız Sıçrama Mührünü filoya onlar taşır.', 'LAN-01']],
  sever: ['huzur_tutsusu', 'kristal_can', 'sakin_cay'], sevmez: ['kavrulmus_kahve', 'piezo', 'komur'],
  hediyeNot: 'Sükûneti çağıran her şey; hızlandıran ve vızıldayan her şeyi geri çevirir.',
  severSoz: '"Bakırın ve kristal çanın sesini birbirine yakıştırmışsın. Rüzgâr seni dost bildi."', sevmezSoz: '"Bu vızıltıyı rüzgâr sevmez yolcu."',
  gorevler: [
    { id: 'LAN-01', ad: 'Uçan Arin tapınağı ve Yıldız Sıçrama Mührü', tur: 'zincir', k: 0, puan: 0, bolge: 'guney',
      kosul: (d) => ((d.tf && d.tf.biten) || []).includes(18), kosulMetni: '18. büyük görevden (Dünya Çivisi) sonra açılır',
      durum: 'Filo Lanetli Gezegen\'e sıçramaya hazırlanırken navigasyon kristalleri astral parazit yüzünden on iki derece sapıyor; bu sapmayla sıçramak filoyu dağıtır.',
      hikaye: [
        'Keşiş Vaelor başını rüzgâra çeviriyor; boynundaki küçük çanlar çınlıyor: "Aşağıdaki rıhtımda gemilerin demirleri gıcırdıyor. Lanetli bir kıyıya giderken pusulan mı kırıldı, yoksa sabrın mı?"',
        (d) => (k(d, 'vaelor') >= 2 ? 'Vaelor sunağın ilk kilidini senin için aralıyor: köprü geçişi kolay.' : ''),
        'Yol A: kırık taş köprüden Aether Adımı ile geç, kadim tunç çanın rezonansını Beyaz Lumina şişesine çek ve Öz Bağlama ile mühüre çevir. Yol B: büyün yetmiyorsa Aether-Dock\'ta Xaela ya da Ignador ile Yıldırım Rezonansı ve tamir kitiyle kristalleri zorla senkronla; kristallerin ömrü kısalır, yirmi beş odak gider.',
      ],
      cozum: 'Aether Adımı (ya da Rüzgâr Uçuşu) ile köprüyü geç; çanın sesini Lumina salımıyla şişeye çek ve Öz Bağlama ile mühürle. Ya da Yıldırım Rezonansı ile zorla senkronla.',
      bulmaca: { dugumler: [
        D('kopru', 'Rüzgâra açık kırık taş köprü', -0.4, 'ruzgar', 'Köprünün ortası yok; aşağıda bulutlar.', [['aether_adimi'], ['ruzgar_ucusu'], ['isik_koprusu', 'denge_civisi']], 'Boşluğu geçtin; sunak önünde.'),
        D('can', 'Kadim tunç çan', 0.4, 'kristal', 'Çana vurduğunda saf bir rezonans adayı dolaşıyor.', [['lumina_salim', 'oz_baglama'], ['yildirim_rez']], 'Çanın sesi kristale işlendi.', { on: ['kopru'] }),
      ] },
      secimSoru: 'Mühür kime teslim edilsin?',
      secimler: [
        S('Yol A: mühürü Elyndra\'ya ver', { vaelor: 30, elyndra: 20 }, 'Elyndra mührü dümen kristaline bastırıyor; bütün filo kristalleri sarsıntısız kilitleniyor.', { odul: { esya: { sicrama_muhru: 1 } }, bayrak: ['sicramaMuhru'] }),
        S('Yol A: mühürü Drahmir\'e ver', { vaelor: 30, drahmir: 20 }, 'Drahmir mührü topçu kristaline bağlıyor: "Bu sefer kimse kaybolmayacak."', { odul: { esya: { sicrama_muhru: 1 } }, bayrak: ['sicramaMuhru'] }),
      ] },
  ],
  sohbetler: [
    { k: 0, ad: 'Pusula mı sabır mı', soz: 'Vaelor: "Söyle bakalım yolcu; pusulan mı kırıldı, yoksa sabrın mı?"',
      secenekler: [O('"[Ciddiyet] Pusulamız sağlam ama parazit filo kristallerini saptırıyor."', 20, '"En azından ne aradığını biliyorsun. Sunaktaki çan seni bekler."'), O('"[İkram] Huzur tütsüsü ve küçük bir kristal çan getirdim."', 30, 'Hafifçe gülümsüyor: "Rüzgâr seni dost bildi."'), O('"[Aceleci] Felsefe yapacak vaktimiz yok ihtiyar, kapıyı aç."', -10, '"Acele eden rüzgâr kendi sesini duymaz."')] },
    { k: 5, ad: 'Bin motor', soz: 'Vaelor: "Bir tunç çanın yankısı bazen bin motordan daha uzağa gider. İnanır mısın?"',
      secenekler: [O('"Duyduğum en uzak ses buydu."', 30, 'Çanlarından biri kendiliğinden çınlıyor.'), O('"Motorlar da çalar ama."', 10, '"Çalarlar. Ama dinlemezler."')] },
  ],
  kademeEtki: (d, n) => {
    if (n === 2) d.bayrak.vaelorKopru = true;
    if (n === 10) ZN.ekle(d, 'kristal_can', 1);
  },
  imza: { selam: 'Rüzgârın yönünü değiştirebilirsin ama fırtınanın senden ne sakladığını ancak sessiz kaldığında duyarsın.', tesekkur: 'Aşağıdaki filolar göğü demirle fethetmeye çalışıyor; oysa bir tunç çanın yankısı bazen bin motordan daha uzağa gider.', kizgin: 'Git, o lanetli göğe sıçra... ama dönerken kulaklarında kendi sesini kaybetmediğinden emin ol.' },
  ortam: 'Kaya koridorlarında rüzgârın çaldığı derin tunç çanlar ve keşişin boynundaki küçük çanların ince tınısı.',
});

// --- Paket 14 bölüm 1: saha araçları zanaatı (akademi ve bölge ustalarının yanında) ---
export const SAHA_ARACLARI = [
  { id: 'sabit_yanki_muhru', ustalar: ['kaelis', 'forges'], girdi: { fosil: 1, piezo: 1 }, metin: '1 fosil + 1 piezo kristal' },
  { id: 'lumina_feneri', ustalar: ['tixie', 'kikirdak'], girdi: { rezonans_lambasi: 1 }, sise: 'lumina', metin: '1 Beyaz Lumina şişesi + 1 rezonans lambası' },
  { id: 'solis_kapsulu', ustalar: ['zahra', 'kikirdak'], girdi: { gumus_tozu: 1 }, sise: 'solis', metin: '1 Sarı Solis şişesi + 1 gümüş tozu' },
  { id: 'denge_civisi', ustalar: ['sifir', 'trellis'], girdi: { demir_cevheri: 1, urun_fosforlu_liken: 1 }, metin: '1 demir cevheri + 1 fosforlu liken' },
];
export function aracYap(d, id) {
  const t = SAHA_ARACLARI.find((x) => x.id === id);
  BY.hazirla(d);
  const eksik = Object.keys(t.girdi).filter((g) => ZN.miktar(d, g) < t.girdi[g]).map((g) => ZN.adi(g));
  if (t.sise && !BY.siseVarMi(d, t.sise)) eksik.push(t.sise === 'lumina' ? 'dolu Lumina şişesi' : 'dolu Solis şişesi');
  if (eksik.length) return { metin: 'Eksik: ' + eksik.join(', ') + '.', ses: 'red' };
  for (const g of Object.keys(t.girdi)) ZN.ekle(d, g, -t.girdi[g]);
  if (t.sise) BY.siseKullan(d, t.sise, true);
  ZN.ekle(d, id, 1);
  return { metin: ZN.adi(id) + ' hazır. Yalnız bulmacalarda ve yol olaylarında işe yarar; savaşta değil.', efekt: 'el_saha_araci' };
}
KISI_EKLERI.push((d, id) => {
  const l = SAHA_ARACLARI.filter((t) => t.ustalar.includes(id));
  if (!l.length) return [];
  return [{
    id: 'saha_araci', etiket: 'Saha aracı yaptır (büyü destekli, yalnız bulmaca için)',
    alt: () => ({
      baslik: 'Saha araçları',
      giris: 'Tek kullanımlık; bulmaca odalarında, harabe kapılarında ve yol engellerinde çalışır. Normal savaşta kullanılmaz.',
      ogeler: l.map((t) => ({ id: t.id, etiket: ZN.adi(t.id) + ': ' + t.metin + '. Elinde ' + ZN.miktar(d, t.id), ipucu: ZN.ESYA[t.id].tarif, yap: (z) => aracYap(z, t.id) })),
    }),
  }];
});

// Paket 11 bölüm 1: şehir alternatifleri artık kişilerin yanında (menüdeki satın alma da sürüyor)
const SEHIR_TECHIZAT = { cakal: ['koruma_muhru', 120], misket: ['koruma_muhru', 120], kikirdak: ['fisilti_filtresi', 90], xaela: ['yildiz_pusulasi', 110], sifir: ['topraklama_pelerini', 130], zahra: ['golge_sifre', 100] };
KISI_EKLERI.push((d, id) => {
  const t = SEHIR_TECHIZAT[id];
  if (!t || ZN.miktar(d, t[0]) > 0) return [];
  const [esya, ml] = t;
  const bedava = kademe(d, id) >= 5;
  return [{ id: 'sehir_techizat', etiket: ZN.adi(esya) + ' iste' + (bedava ? ' (bağınız yeterli, ücretsiz)' : ', ' + ml + ' ML'), ipucu: ZN.ESYA[esya] && ZN.ESYA[esya].tarif, yap: (z) => {
    if (!bedava) {
      if (!z.para || (z.para.ml || 0) < ml) return { metin: ml + ' ML gerekir.', ses: 'red' };
      z.para.ml -= ml;
    }
    ZN.ekle(z, esya, 1);
    puanEkle(z, id, 5, 'sohbet');
    return { metin: ZN.adi(esya) + ' çantanda.' };
  }, geri: true }];
});

// Paket 15 LAN-01 Yol B: büyü yetmiyorsa Aether-Dock'ta Xaela ya da Akademide Ignador kristalleri zorla senkronlar
// (filo sıçrar, kristallerin ömrü kısalır, yirmi beş odak gider). Görev tamamlanmış sayılır; Yol A sonradan kapanır.
KISI_EKLERI.push((d, id) => {
  if (id !== 'xaela' && id !== 'ignador') return [];
  if (gorevDurumu(d, 'LAN-01') !== 'acik') return [];
  return [{ id: 'lan_b', etiket: 'Filo kristallerini zorla senkronla (LAN-01 Yol B: 1 tamir kiti, 25 odak)', ipucu: 'Keşiş Vaelor\'un çanı yerine yüksek voltaj; filo sıçrar ama kristallerin ömrü kısalır.', yap: (z) => {
    if (ZN.miktar(z, 'tamir_kiti') < 1) return { metin: 'Bir tamir kiti gerekir.', ses: 'red' };
    ZN.ekle(z, 'tamir_kiti', -1);
    BY.hazirla(z);
    z.buyu.odak = Math.max(0, z.buyu.odak - 25);
    z.bayrak.sicramaZorla = true;
    kayit(z, 'vaelor').gorev['LAN-01'] = 'bitti';
    return { metin: (id === 'xaela' ? 'Xaela kahkahayla şalteri indiriyor: "Kristal ömrü mü? Sonra güncelleriz!"' : 'Ignador plazma kablolarını kristallere bağlıyor: "Isınacaklar ama tutacaklar."') + ' Filo kristalleri kilitli; sıçrama mümkün, ama sarsıntılı olacak.', ses: 'kaynak' };
  }, geri: true }];
});
