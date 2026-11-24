// Paket 9, 10, 11, 12, 13: karakter bağından bağımsız saha büyü görevleri. Gizli bir "saha" kaydına bağlıdır (bağ ağı
// menülerinde görünmez); her görev yerinde, işaretli noktadan başlar (ygk/harita.js GOREV_YERLERI_SAHA). Görev listesi
// "Tonoflenya bölge bağları ve siyaset" menüsünde "Saha büyü görevleri".
//   Paket 9-10: dört evrimsel hat (SU, ISIK, TAS, HAVA) × üç basamak. Kural: önceki basamak yapılmadan sonraki kilitlenmez
//   (zero-deadlock); yapıldıysa kolaylık (odak iadesi, tehlike muafiyeti, kalıcı bayrak). Faz kapıları büyük final
//   görevlerinden (d.tf.biten): Faz 1 Tonoflenya'ya varış, Faz 2 bir final, Faz 3 altı final.
//   Paket 11: büyü dışı saha teçhizatı (akademi yolu, şehir alternatifi) ve Kara Göl zinciri KG-01..03.
//   Paket 12-13: Nerya, Fenrir, Tharal, Gümüş Tüy, Julithan, Anitor, Oredan, Kuzey Gölge Hattı.
// Paket 8 (dev heykeller, 5.5) bu dosyanın bayraklarını okur: akisMuhru, isikIpucu, toprakMuhafizi, tamRezonans,
// suDengesi (SU-03 + KG-03).
import { kisiEkle, kademe } from '../bag';
import { D, S } from '../yardim';
import * as ZN from '../../tonoflenya/zanaat';
import * as BY from '../../buyu/buyu';
import * as Z from '../../zaman';
import { tarim } from '../../tarim/tarim';

Object.assign(ZN.ESYA, {
  koruma_muhru: { kat: 3, ad: 'Birinci Çağ karantina beratı', tarif: 'Kara Göl\'ün batı sur kapısındaki karantina nöbetçisini geçirir. Konsey mührü ya da eşdeğeri.' },
  fisilti_filtresi: { kat: 3, ad: 'Zift ve fısıltı filtresi', tarif: 'Zift gazını ve sudan yükselen fısıltıları süzen maske.' },
  runahar_plani: { kat: 3, ad: 'Runahar taban planı ve şamandıra', tarif: 'Birinci Çağ başkentinin batış haritası ve derinlik tarayıcısı.' },
  yildiz_pusulasi: { kat: 3, ad: 'Bozulmayan mekanik yıldız pusulası', tarif: 'Manyetik sapmaya dirençli antik pusula; Hardrin ve Gölge Hattı\'nda yön verir.' },
  topraklama_pelerini: { kat: 3, ad: 'Topraklamalı termal pelerin', tarif: 'İletkenliği kesen alaşım ya da kauçuk yalıtımlı pelerin; Hâle ve Norvask için.' },
  golge_sifre: { kat: 3, ad: 'Gölge mühür şifre çözücü', tarif: 'Eski Konsey kilitlerini açan şifre anahtarı; Kahergonat ve Halyon kilitleri.' },
  bakir_valf: { kat: 2, ad: 'Yosunlu bakır valf', tarif: 'Axira Irmağı\'nın dibinden çıkan eski bir valf.' },
  gozlem_mercegi: { kat: 3, ad: 'Akademi gözlem merceği', tarif: 'Kristal Teraslar\'ın alt terasından.' },
  bazalt_kalip: { kat: 3, ad: 'Sertleştirilmiş bazalt kalıp', tarif: 'Filtra\'nın eski döküm odasından; Karanlık Bazalt Çekirdeği\'ni hasarsız çıkarır.' },
  karanlik_bazalt: { kat: 4, ad: 'Karanlık Bazalt Çekirdeği', tarif: 'Kırık Vadi\'nin antik kalıntısından; Kahergonat sunağındaki heykelin parçası.' },
  ruzgar_pusulasi: { kat: 3, ad: 'Rüzgâr pusulası taşı', tarif: 'İç Dune\'un kumları altından.' },
  akis_muhru: { kat: 5, ad: 'Akış Mührü', tarif: 'Keralon\'un kadim pompa odasında kendiliğinden parlayan su mührü; Su ve Kristal heykeline hazır.' },
  sehir_muhru: { kat: 4, ad: 'Birinci Çağ şehir mührü parçası', tarif: 'Runahar\'ın kaburgasındaki kapsülden.' },
  toz_pusulasi: { kat: 3, ad: 'Toz pusulası', tarif: 'Fenrir tozunu depolayan özel pusula.' },
  ilk_sefer_notlari: { kat: 4, ad: 'İlk Malazar seferinin el yazması notları', tarif: 'Gümüş Tüy sazlıklarındaki YGK sandığından.' },
  korsan_harita_parcasi: { kat: 3, ad: 'Gizli deniz haritası parçası', tarif: 'Korzel Burnu\'nda kurtardığın korsan kaptanından.' },
  brastion_izni: { kat: 3, ad: 'Brastion hisar geçiş izni', tarif: 'Anitor\'un hisar ve limanlarından serbest geçiş.' },
});

const final = (d) => ((d.tf && d.tf.biten) || []).length;
const bitti = (d, g) => !!(d.ygk && d.ygk.k.saha && d.ygk.k.saha.gorev[g] === 'bitti');
const FAZ = {
  1: { kosul: (d) => !!d.bayrak.tonoflenyaGoruldu, metin: 'Tonoflenya\'ya varınca açılır' },
  2: { kosul: (d) => !!d.bayrak.tonoflenyaGoruldu && final(d) >= 1, metin: 'ilk büyük final görevinden sonra açılır' },
  3: { kosul: (d) => !!d.bayrak.tonoflenyaGoruldu && final(d) >= 6, metin: 'altı büyük final görevinden sonra açılır' },
};
const muaf = (d, t) => {
  if (!d.bayrak.tehlikeMuaf) d.bayrak.tehlikeMuaf = {};
  d.bayrak.tehlikeMuaf[t] = true;
};
// Önceki basamak ya da teçhizat varsa harcanan odağın bir kısmı geri gelir (Paket 9 bölüm 1.2: kolaylık, kilit değil)
const iade = (d, n) => BY.odakEkle(d, n);
const esyaVar = (d, k) => ZN.miktar(d, k) > 0;
const G = (id, ad, tur, faz, durum, hikaye, cozum, dugumler, secimler, ek = {}) => ({
  id, ad, tur, k: 0, puan: 0, durum, hikaye, cozum, bulmaca: { dugumler, hava: ek.hava }, secimler,
  kosul: ek.kosul || FAZ[faz].kosul, kosulMetni: ek.kosulMetni || FAZ[faz].metin, ...ek,
});

const GOREVLER = [
  // --- Paket 9, Hat 1: Su ---
  G('SU-01', 'Axira Irmağı\'nın taşan bentleri', 'evrim', 1,
    'İlkbahar erimesiyle Axira Irmağı yükselmiş; Taş Çember köylerinin üç değirmen çarkı sıkışmış.',
    ['Basamak 1, tekil kullanım. Değirmencinin kızı nefes nefese: "Çarklar dönmezse bu yıl un yok!" Irmağın taşkın kolu köyün ortasından akıyor.', 'Kıyıda üç eski kapak taşı var; su yönünü sırayla değiştirmek gerekiyor.'],
    'Sıvı Yönlendirme ile taşkın kolunu üç kapak taşında sırayla yan kanallara böl.',
    [D('kapak1', 'Birinci kapak taşı', -0.5, 'su', 'Su kapağın üstünden taşıyor.', [['sivi']], 'Birinci kol yan kanala döndü.'),
      D('kapak2', 'İkinci kapak taşı', 0, 'su', 'Ortadaki kapak çamurla dolu.', [['sivi']], 'İkinci kol tarlalara aktı.', { on: ['kapak1'] }),
      D('kapak3', 'Üçüncü kapak taşı', 0.5, 'su', 'Son kapak değirmen arkının önünde.', [['sivi']], 'Değirmen çarkları dönmeye başladı.', { on: ['kapak2'] })],
    [S('Değirmenleri köylülere teslim et', { g_ygk: 5 }, 'Çarklar dönüyor; nehir yatağının dibinde yosunlu bir bakır valf açığa çıktı. Kuzeydeki akıntı dengeli kalacak; Malkenia pazarında un kıtlığı olmayacak, Keralon\'a sızan çamur azalacak.', { odul: { esya: { bakir_valf: 1 } }, bayrak: ['su01'] })]),
  G('SU-02', 'Norvask fiyordunun donmuş kilidi', 'evrim', 2,
    'Norvask tersanesindeki dev buz kıran gemisi, fiyort kapısını kilitleyen kara buz duvarının ardında mahsur.',
    ['Basamak 2, evrimsel form: su buhara ve buza dönüşür. Kaba güç kara buzu çatlatamıyor.', (d) => (bitti(d, 'SU-01') ? 'Axira\'dan gelen ılık akıntı fiyorda ulaşmış; buz daha kolay çatlayacak, odağının yarısı geri gelecek.' : 'Axira akıntısı dengelenmediği için buz çok soğuk; iki Solis ısısı gerekebilir.'), (d) => (esyaVar(d, 'topraklama_pelerini') ? 'Topraklamalı pelerinin seni fiyortun soğuğundan koruyor.' : '')],
    'Fiyort tabanındaki sıcak suyu Sıvı Yönlendirme ile çatlaklara it; Sarı Solis şişesinin ısısıyla ani buhar basıncına çevir.',
    [D('catlak', 'Kara buzdaki kılcal çatlaklar', -0.3, 'buz', 'Sıcak su yarığı aşağıda kaynıyor; buz duvarı kapkara.', [['sivi']], 'Sıcak su çatlaklara doldu.'),
      D('buhar', 'Buhar basıncı', 0.4, 'buz', 'Su çatlaklarda; ısı gerekiyor.', [['solis_salim'], ['solis_firlat'], ['kivilcim']], 'Buhar genleşti; kara buz tek parça yerinden oynadı, soğuyan buhar donmuş bir geçit oldu.', { on: ['catlak'] })],
    [S('Buz kıranı fiyorttan çıkar', { g_kuzey: 10, kaelan: 10 }, (d) => 'Norvask ile Helgar arasındaki buz gemisi ikmal rotası açıldı.' + (bitti(d, 'SU-01') ? ' Ilık akıntı sayesinde odağının yarısı geri geldi.' : ''), { bayrak: ['su02'], yap: (d) => { muaf(d, 'kara_buz'); if (bitti(d, 'SU-01')) iade(d, 20); if (esyaVar(d, 'topraklama_pelerini')) iade(d, 10); } })],
    { hava: -2 }),
  G('SU-03', 'Keralon\'un zehirli nabzı', 'evrim', 3,
    'Keralon\'un derinliklerinde batık bir kadim pompa odası zehirli gaz ve çamurlu suyla tıkanmış; Su Mezarı\'na giden gizli yan yol görünmüyor.',
    ['Basamak 3, çoklu büyü sentezi.', (d) => (bitti(d, 'SU-01') ? 'Axira akıntısı dengelendiği için bataklığa sızan çamur azalmış; gaz bir kademe hafif.' : 'Gaz yoğun; dikkatli ol.')],
    'Hava Kontrolü ile metan sisini dağıt, Canlı Sarmaşık ile duvarları ör, Sıvı Yönlendirme ve Yıldırım Rezonansı ile pompayı çalıştır.',
    [D('sis', 'Zehirli metan sisi', -0.5, 'fisilti', 'Ağır, tatlımsı bir gaz odayı doldurmuş.', [['hava_ruzgar'], ['hava_kubbe']], 'Sis yukarı çekilip dağıldı.'),
      D('duvar', 'Çökmek üzere olan bataklık duvarları', 0, 'bitki', 'İki çamur duvarı çatırdıyor.', [['sarmasik']], 'Kökler duvarları sardı.', { on: ['sis'] }),
      D('pompa', 'Kadim su tribünü', 0.5, 'elektrik', 'Kirli su ve ölü bir tribün.', [['sivi', 'yildirim_rez']], 'Kirli su yan çukura aktı; tribün vınlayarak döndü.', { on: ['duvar'] })],
    [S('Pompayı kalıcı çalıştır', { g_guney: 10 }, (d) => 'Su Mezarı\'na güvenli ikinci bir giriş tüneli açıldı; bataklık tortusu Doktor Kıkırdak için simya örneği olacak.' + (bitti(d, 'SU-01') && bitti(d, 'SU-02') ? ' Pompa odasındaki kadim su mührü kendiliğinden parladı: Akış Mührü artık sende.' : ''),
      { bayrak: ['su03', 'suMezariGiris'], yap: (d) => { if (bitti(d, 'SU-01') && bitti(d, 'SU-02')) { ZN.ekle(d, 'akis_muhru', 1); d.bayrak.akisMuhru = true; } if (bitti(d, 'KG-03')) d.bayrak.suDengesi = true; } })],
    { hava: 0 }),
  // --- Paket 9, Hat 2: Işık ---
  G('ISIK-01', 'Kristal Teraslar\'ın akort edilmesi', 'evrim', 1,
    'Kristal Teraslar\'da rüzgârla çınlayan dört büyük kristal sütunun akordu bozulmuş; şehre rahatsız edici bir uğultu yayılıyor.',
    ['Basamak 1, tekil kullanım. Sütunlar aşırı ışık yüklenmiş; karşılıklı iki sütunun titreşim plakası aynı anda basılmalı.'],
    'Fazla ışığı boş şişeye ya da Lumina salımıyla dengele; Yankı İkizi ile karşıt iki plakaya aynı anda bas.',
    [D('isik', 'Aşırı yüklenmiş kristaller', -0.3, 'kristal', 'Kristaller göz alıcı ve tiz.', [['bos_sise'], ['lumina_salim']], 'Fazla ışık söndü.'),
      D('akort', 'Karşıt iki titreşim plakası', 0.4, 'kristal', 'İki plaka on adım arayla.', [['yanki_ikizi'], ['yanki_dugumu']], 'Teraslar berrak bir melodiyle çınlıyor.', { on: ['isik'] })],
    [S('Terasları dinle', { g_ygk: 5 }, 'Alt terasta gizli bir Akademi gözlem merceği açıldı. Akademi dehlizlerindeki kristal parazitleri azalacak; Gözlem Adaları fenerlerinin menzili uzayacak.', { odul: { esya: { gozlem_mercegi: 1 } }, bayrak: ['isik01'] })]),
  G('ISIK-02', 'Cam Düzlüklerin aynalı köprüsü', 'evrim', 2,
    'Antik büyü patlamalarında eriyip dev cam levhalara dönüşmüş Güney Cam Düzlükleri\'nin ortasında bir uçurum.',
    ['Basamak 2, kırılım ve akustik rezonans.', (d) => (bitti(d, 'ISIK-01') ? 'Kristal Teraslar\'dan temiz frekans alan prizmalar ek kalibrasyon istemiyor.' : ''), (d) => (bitti(d, 'HAVA-02') ? 'Kum fırtınası dindiği için cam levhalar tertemiz.' : '')],
    'Sarı Solis ışığını cam levhalara açıyla vur, kırılmış huzmeye Işık Köprüsü kur; Ajmero sunağında rüzgârın sesini Yankı Düğümü ile üçüncü sütuna aktar.',
    [D('kirilim', 'Cam levhalar', -0.5, 'kristal', 'Levhalar güneşi dağınık yansıtıyor.', [['solis_salim'], ['lumina_salim']], 'Çoklu bir huzme uçurumun üstüne uzandı.'),
      D('kopru', 'Uçurum', 0, 'ruzgar', 'Aşağısı görünmüyor.', [['isik_koprusu']], 'Işık köprüsü kuruldu.', { on: ['kirilim'] }),
      D('sunak', 'Ajmero taş sunağı', 0.5, 'ruzgar', 'Rüzgâr sunakta tek bir nota çalıyor.', [['yanki_dugumu']], 'Üçüncü sütun çınladı; gizli çöl haritası belirdi.', { on: ['kopru'] })],
    [S('Haritayı kopyala', { g_dogu: 10 }, (d) => 'Kayıp çöl dikilitaşlarının koordinatları haritaya işlendi; Zahra\'nın kervanları cam düzlüklerinde yol kaybetmeyecek.' + (bitti(d, 'ISIK-01') && bitti(d, 'HAVA-02') ? ' Toz tutmayan levhaların ardında Morluk Kapısı\'nın prizma anahtarı duruyordu.' : ''),
      { bayrak: ['isik02'], yap: (d) => { muaf(d, 'cam'); if (bitti(d, 'ISIK-01')) iade(d, 15); if (bitti(d, 'ISIK-01') && bitti(d, 'HAVA-02')) d.bayrak.prizmaAnahtari = true; } })]),
  G('ISIK-03', 'Morluk Kapısı\'nda katlanan gerçeklik', 'evrim', 3,
    'Mavi Hardrin\'de büyü pusulaları sapıyor; koridorlar iki gerçeklik katmanına bölünmüş. Yanlış kapı seni başa döndürür.',
    ['Basamak 3, çoklu büyü sentezi.', (d) => (d.bayrak.prizmaAnahtari ? 'Cam Düzlükleri\'nden aldığın prizma anahtarı gerçek geçidi zaten gösteriyor.' : ''), (d) => (esyaVar(d, 'yildiz_pusulasi') ? 'Yıldız pusulan sapmıyor.' : '')],
    'Hakikat Yankısı ile gerçek geçidi bul; Yankı İkizi ve Işık Köprüsü ile karşıya köprüle; Aether Adımı ile son yarıktan faz kaydır.',
    [D('gercek', 'Üç geçit', -0.5, 'fisilti', 'Üç geçit, üç farklı yankı.', [['hakikat_yankisi']], 'Ortadaki geçit gerçek.'),
      D('kopru', 'Karşıdaki boşluk', 0, 'kristal', 'Giriş taşı ile karşı kıyı arasında boşluk.', [['yanki_ikizi', 'isik_koprusu']], 'İkizin taşta, ışık karşıda.', { on: ['gercek'] }),
      D('yarik', 'Kırık gerçeklik yarığı', 0.5, 'elektrik', 'Köprünün koptuğu yerde titreyen bir yarık.', [['aether_adimi']], 'Faz kaydırdın; Hardrin mühür taşı uyandı.', { on: ['kopru'] })],
    [S('Mühür taşını aktive et', { g_kuzey: 5, g_dogu: 5 }, (d) => 'Morluk Kapısı kalıcı olarak açıldı: Doğu ile Kuzey arasındaki en hızlı güvenli dağ geçidi. Drahmir ile Zorah kervanları dağ yolunu kullanacak.' + (bitti(d, 'ISIK-01') && bitti(d, 'ISIK-02') ? ' Işık hattının tamamı bitti: final heykellerinden Işık ve Ses Muhafızı\'nın bilmeceleri ipuçlu açılacak.' : ''),
      { bayrak: ['isik03', 'morlukKapisi'], yap: (d) => { muaf(d, 'anomali'); if (d.bayrak.prizmaAnahtari) iade(d, 20); if (esyaVar(d, 'yildiz_pusulasi')) iade(d, 10); if (bitti(d, 'ISIK-01') && bitti(d, 'ISIK-02')) d.bayrak.isikIpucu = true; } })]),
  // --- Paket 10, Hat 3: Taş ve Metal ---
  G('TAS-01', 'Oksit Dağlarının eğilmiş rayları', 'evrim', 1,
    'Filtra madenindeki aşırı basınç ana cevher raylarını ve üç buhar tahliye vanasını eğip kilitlemiş.',
    ['Basamak 1, tekil kullanım. Savaş yok; zamanlı ve hassas bir kalibrasyon.'],
    'Metal Şekillendirme ile rayları düzelt, ardından vanaları basınç yükselmeden hizala.',
    [D('ray', 'Eğilmiş cevher rayları', -0.3, 'metal', 'Raylar yay gibi bükülmüş.', [['metal']], 'Raylar dümdüz.'),
      D('vana', 'Üç buhar tahliye vanası', 0.4, 'lav', 'Basınç her an artıyor.', [['metal']], 'Vanalar hizalandı; basınç düştü.', { on: ['ray'], pencere: 25 })],
    [S('Tüneli madencilere aç', { oronte: 15, cuce: 15, g_bati: 5 }, 'Tünelin sonundaki eski döküm odasından sertleştirilmiş bir bazalt kalıp çıktı. Kadim körükler arızasız çalışacak; Filtra atölyelerinde akış hızlanacak.', { odul: { esya: { bazalt_kalip: 1 } }, bayrak: ['tas01'] })]),
  G('TAS-02', 'Safran ve Kırık Vadi\'nin taş hafızası', 'evrim', 2,
    'Doğu Kırık Vadi tabanındaki antik su kemeri, kükürtlü kaya çökmesiyle taşlaşmış bir cüruf duvarıyla kapanmış.',
    ['Basamak 2, kükürtlü cüruf ve kanyon kilidi.', (d) => (esyaVar(d, 'bazalt_kalip') ? 'Filtra\'dan getirdiğin bazalt kalıp çekirdeği hasarsız çıkarmana yarayacak.' : '')],
    'Ağır Toprak Yarma ile gevşek tortuyu yararak sıcak damarı aç; buharla yumuşayan cürufu Metal Şekillendirme ile kemerin yan desteğine çevir.',
    [D('tortu', 'Gevşek kükürt tortusu', -0.3, 'tas', 'Kükürt kokusu, sıcak bir damar.', [['toprak_yarma']], 'Sıcak damar açıldı; cüruf yumuşuyor.'),
      D('curuf', 'Metalik cüruf tabakası', 0.4, 'metal', 'Cüruf yumuşak ama ağır.', [['metal']], 'Cüruf bükülüp kemerin desteği oldu; kapı açıldı.', { on: ['tortu'] })],
    [S('Antik kalıntıya gir', { g_dogu: 5, g_bati: 5 }, (d) => 'Karanlık Bazalt Çekirdeği\'ni aldın' + (esyaVar(d, 'bazalt_kalip') ? ', kalıp sayesinde hasarsız.' : '.') + ' Kemerin altındaki kuru nehir yatağı Veradon\'dan kaçan kervanlar için gizli bir kara yolu olacak.', { odul: { esya: { karanlik_bazalt: 1 } }, bayrak: ['tas02', 'veradonKacisYolu'], yap: (d) => { if (esyaVar(d, 'bazalt_kalip')) iade(d, 15); } })]),
  G('TAS-03', 'Kahergonat\'ın beş basamaklı sunağı', 'evrim', 3,
    'Kahergonat\'ın ışığı yutan kanyonunda beş kırık taş sütun ve merkezde hareketsiz bir siyah bazalt muhafız heykeli.',
    ['Basamak 3, çoklu büyü sentezi.', (d) => (esyaVar(d, 'karanlik_bazalt') ? 'Karanlık Bazalt Çekirdeği heykelin göğsüne tam oturuyor; ek parça gerekmiyor.' : ''), (d) => (esyaVar(d, 'golge_sifre') ? 'Gölge mühür şifre çözücün sunağın eski Konsey kilidini tanıdı.' : '')],
    'Ağır Toprak Yarma ile gömülü sütunları çıkar, Metal Şekillendirme ile bronz dişlileri bağla, heykeli canlandırıp Öz Bağlama ile komut özü bağla.',
    [D('sutun', 'Gömülü iki sütun', -0.5, 'tas', 'Toprağın altında iki kırık sütun.', [['toprak_yarma']], 'Sütunlar yüzeye çıktı.'),
      D('disli', 'Kopmuş bronz dişliler', 0, 'metal', 'Dişliler kırık.', [['metal']], 'Dişliler döküldü ve bağlandı.', { on: ['sutun'] }),
      D('heykel', 'Siyah bazalt muhafız', 0.5, 'tas', 'Muhafızın göğsünde üç taş yuvası.', [['heykel', 'oz_baglama']], 'Muhafız beş tonluk sunak kapağını kendi elleriyle çevirdi.', { on: ['disli'], tas: { kizil: 1, sari: 1, mor: 1 } })],
    [S('Alt Evren arşivine gir', { valen: 10, kefius: 10 }, (d) => 'Kahergonat Alt Evren arşivine giriş açıldı; eski mühür kayıtları sende. Halyon\'daki sürgün bilginler sunağın açıldığını hissetti; Valen ve Kefius ile ilgili gizli bir sayfa açıldı.' + (bitti(d, 'TAS-01') && bitti(d, 'TAS-02') ? ' Taş hattının tamamı bitti: final heykellerinden Toprak ve Metal Muhafızı asa frekansını hemen tanıyacak.' : ''),
      { bayrak: ['tas03', 'halyonSayfasi'], kodeks: 'kahergonat_arsivi', yap: (d) => { if (esyaVar(d, 'karanlik_bazalt')) iade(d, 20); if (esyaVar(d, 'golge_sifre')) iade(d, 10); if (bitti(d, 'TAS-01') && bitti(d, 'TAS-02')) d.bayrak.toprakMuhafizi = true; } })]),
  // --- Paket 10, Hat 4: Hava ---
  G('HAVA-01', 'Gözlem Adalarının sönen feneri', 'evrim', 1,
    'Malazar ile Zeris arasındaki spiral akıntı bölgesinde ana deniz fenerinin kondansatörü fırtınada sönmüş.',
    ['Basamak 1, tekil kullanım. Kule tepesinde üç bakır bobin; aşırı yükleme kondansatörü yakar.', (d) => (bitti(d, 'ISIK-01') ? 'Kristal Teraslar\'ın temiz ışık sinyali fenerin camına ulaşıyor.' : '')],
    'Üç bakır bobine Yıldırım Rezonansı ile sırayla, ritmik yükleme yap.',
    [D('b1', 'Birinci bakır bobin', -0.5, 'elektrik', 'Bobin soğuk.', [['yildirim_rez']], 'Birinci bobin vınlıyor.'),
      D('b2', 'İkinci bakır bobin', 0, 'elektrik', 'Bobin soğuk.', [['yildirim_rez']], 'İkinci bobin vınlıyor.', { on: ['b1'] }),
      D('b3', 'Üçüncü bakır bobin', 0.5, 'elektrik', 'Bobin soğuk.', [['yildirim_rez']], 'Fener yeniden yandı.', { on: ['b2'] })],
    [S('Güvenli koridoru aydınlat', { barracuda: 15, g_guney: 5 }, (d) => 'Spiral akıntıdaki gemi koridoru aydınlandı; deniz rotalarındaki kayıplar duruyor, Barracuda ve Gümüş Tüy tekneleri güvenle geçiyor.' + (bitti(d, 'ISIK-01') ? ' Teras ışığıyla birleşen sinyal Norvask fiyortlarına kadar ulaşıyor.' : ''), { bayrak: ['hava01'], yap: (d) => muaf(d, 'korsan') })]),
  G('HAVA-02', 'İç Dune\'un nefes alan kubbesi', 'evrim', 2,
    'Çölün ortasında bir kervan ve eski rasat ekibi 360 derecelik öldürücü bir kum girdabına hapsolmuş; rüzgârı tek yöne itmek kumu öbür yana yığıyor.',
    ['Basamak 2, basınç kubbesi.', (d) => (bitti(d, 'SU-02') ? 'Kuzeyden gelen nem fırtınayı biraz yumuşatmış.' : '')],
    'Hava Kontrolü\'nü bu kez kubbe formunda kullan: merkezin üstünde düşük basınçlı sakin bir hava kubbesi kur, girdabı yukarı dağıt.',
    [D('girdap', 'Kum girdabı', 0, 'ruzgar', 'Dört bir yandan kum dönüyor.', [['hava_kubbe']], 'Girdap sarmal hâlinde yukarı dağıldı.')],
    [S('Kervanı ve rasat ekibini çıkar', { zeno: 10, g_dogu: 10 }, (d) => 'Kum örtüsü kalktı; kervanın yanında yarı gömülü bir rüzgâr pusulası taşı buldun. Ajmero çevresindeki kum fırtınası üç gün dinecek.' + (bitti(d, 'SU-02') ? ' Kuzey nemiyle birleşen denge Malazar Hâle\'sindeki iyonize fırtınayı bir kademe hafifletti.' : ''),
      { odul: { esya: { ruzgar_pusulasi: 1 } }, bayrak: ['hava02'], yap: (d) => { Z.etkiKoy(d, 'kumDindi', 3 * Z.GUN_SN); if (bitti(d, 'SU-02')) d.bayrak.haleHafif = true; } })],
    { hava: 0 }),
  G('HAVA-03', 'Malazar Hâle\'sinin iyonize kalbi', 'evrim', 3,
    'Malazar\'ın tepesine giden yolda dönen büyü fırtınaları ve iyonize şimşekler bir gökyüzü duvarı örmüş.',
    ['Basamak 3, çoklu büyü sentezi.', (d) => (d.bayrak.haleHafif ? 'Fırtına bir kademe hafif; koridor daha uzun açık kalacak.' : ''), (d) => (esyaVar(d, 'topraklama_pelerini') ? 'Topraklamalı pelerinin şimşekleri üstünden akıtıyor.' : 'Pelerinsiz her yanlış adım iki kat can yakar.')],
    'Hava Kontrolü ile fırtına gözünde sakin bir geçit aç; Yıldırım Rezonansı ile yükü paratonerlere çek, fazlasını boş şişelere hapset; Aether Adımı ile geçip Hâle Denge Düğümü\'nü mühürle.',
    [D('koridor', 'Fırtına gözü', -0.5, 'ruzgar', 'Dönen bir gökyüzü duvarı.', [['hava_durgun'], ['hava_kubbe']], 'Fırtına gözünde sakin bir koridor açıldı.', { pencere: 25 }),
      D('yuk', 'Paratoner taşları', 0, 'simsek', 'İnen yıldırım yükü taşlarda birikiyor.', [['yildirim_rez', 'bos_sise'], ['yildirim_rez', 'lumina_salim']], 'Yük taşlara çekildi, fazlası şişede.', { on: ['koridor'], tehlike: { kivilcim: { ceza: 15, soz: 'Kıvılcım iyonize havayı ateşledi; şimşek sana döndü!' } } }),
      D('dugum', 'Hâle Denge Düğümü', 0.5, 'elektrik', 'Parçalanmış aether akımlarının ötesinde.', [['aether_adimi']], 'Düğüm mühürlendi; fırtına sustu.', { on: ['yuk'] })],
    [S('Zirve yolunu güvenli kıl', { axira: 15, g_kuzey: 10 }, (d) => 'Malazar\'ın zirve yolu güvenli; Dünya Çivisi savunmasında gökyüzünden şimşek inmeyecek. Şişelenen Hâle enerjisi Axira için eşsiz bir veri.' + (bitti(d, 'SU-03') && bitti(d, 'ISIK-03') && bitti(d, 'TAS-03') ? ' Dört hattın sonu tamam: finaldeki beş dev muhafız kusursuz uyumla uyanacak.' : ''),
      { bayrak: ['hava03', 'haleGuvenli'], yap: (d) => { if (d.bayrak.haleHafif) iade(d, 15); if (esyaVar(d, 'topraklama_pelerini')) iade(d, 10); if (bitti(d, 'SU-03') && bitti(d, 'ISIK-03') && bitti(d, 'TAS-03')) d.bayrak.tamRezonans = true; } })],
    { hava: 0 }),
  // --- Paket 11: Kara Göl ---
  G('KG-01', 'Krater kenarında iki mühür, bir maske', 'hiyerarsi', 1,
    'Zift sularına inmeden önce fiziksel ve zihinsel sızdırmazlık gerekiyor.',
    ['Batı sur kapısındaki karantina nöbetçisi beratını gösteriyorsun; fısıltı filtresini takıyorsun.', 'Krater kenarındaki üç eski gözetleme direğinde sahte yankılar birikmiş.'],
    'Hakikat Yankısı ve Beyaz Lumina şişesiyle direklerdeki sahte yankıları temizle.',
    [D('direk', 'Üç gözetleme direği', 0, 'fisilti', 'Direkler senin sesini başka sözlerle geri yolluyor.', [['hakikat_yankisi', 'lumina_salim'], ['zihin_arindirma', 'lumina_salim']], 'Yankılar sustu; ilk güvenli iniş iskelesi açıldı.')],
    [S('İniş iskelesini aç', { sarah: 10, g_ygk: 5 }, 'Kara Göl\'e inen ilk güvenli iskele açıldı. Zift sisi artık odağını emmeyecek; Sarah için güvenli bir numune noktası oldu.', { bayrak: ['kg01', 'karaGolIskele'] })],
    { kosul: (d) => !!d.bayrak.tonoflenyaGoruldu && esyaVar(d, 'koruma_muhru') && esyaVar(d, 'fisilti_filtresi'), kosulMetni: 'karantina beratı ve fısıltı filtresi gerekir ("Saha hazırlık ağı")' }),
  G('KG-02', 'Titan Runahar\'ın kaburgasında zaman', 'zincir', 1,
    'Birinci Çağ başkentinin batık kalıntıları arasında sıkışmış kadim taşıyıcı kemer çökmek üzere.',
    [(d) => (esyaVar(d, 'runahar_plani') ? 'Corinne\'in batış haritası ve şamandıra göğüs kafesinin üç zayıf eklemini anında işaretliyor.' : 'Haritan yok; eklemleri Hakikat Yankısı ile tek tek arayacaksın.')],
    'Eklemleri bul, zift akıntısını Sıvı Yönlendirme ile yan yarığa çek, paslı kirişi Metal Şekillendirme ile kelepçele.',
    [D('tarama', 'Göğüs kafesinin eklemleri', -0.5, 'fisilti', 'Taşlaşmış kaburgalar zift içinde.', [['hakikat_yankisi'], ['yanki_tarama']], 'Üç zayıf eklem bulundu.'),
      D('akinti', 'Ağır zift akıntısı', 0, 'su', 'Zift eklemleri oyuyor.', [['sivi']], 'Zift yan yarığa aktı.', { on: ['tarama'] }),
      D('kiris', 'Paslı Birinci Çağ kirişi', 0.5, 'metal', 'Kiriş çatırdıyor.', [['metal']], 'Kiriş kelepçelendi; kemer sağlam.', { on: ['akinti'] })],
    [S('Şehir mührünü Corinne\'e ver', { corinne: 25 }, 'Kat 4 arşivinde Birinci Çağ hakkında yeni bir tarih sayfası açıldı.', { bayrak: ['kg02', 'runaharSabit'], kodeks: 'birinci_cag_sayfasi', yap: (d) => { if (esyaVar(d, 'runahar_plani')) iade(d, 20); } }),
      S('Şehir mührünü Valen\'e ver', { valen: 25, g_ygk: 5 }, 'Konsey\'in Malazar üzerindeki paranoyası azaldı.', { kosul: (d) => !d.bayrak.valenKapali, bayrak: ['kg02', 'runaharSabit', 'valenParanoyaAz'], yap: (d) => { if (esyaVar(d, 'runahar_plani')) iade(d, 20); } }),
      S('Şehir mührünü kendinde tut', {}, 'Mühür parçası çantanda.', { bayrak: ['kg02', 'runaharSabit'], odul: { esya: { sehir_muhru: 1 } } })],
    { kosul: (d) => !!d.bayrak.tonoflenyaGoruldu && (bitti(d, 'KG-01') || ((d.tf && d.tf.biten) || []).includes(13)), kosulMetni: 'KG-01 ya da 13. büyük görev (suların çekilişi) gerekir' }),
  G('KG-03', 'Ziftin altındaki çatlağı mühürlemek', 'zincir', 1,
    'Taban mücadelesi sonrası krater dibinde yeniden açılan mikro aether sızıntısı.',
    [(d) => (d.bayrak.karaGolSirri || kademe(d, 'lyra') >= 6 ? 'Sarah\'nın arındırma sırrı ya da Lyra\'nın fidesi elinde; yarığa kök saldırabilirsin.' : 'Tohum yoksa kurşun ve bazalt bir kapak dökeceksin.')],
    'Sızan enerjiyi boş şişelere çek; sarmaşık ve Öz Bağlama ile (ya da Toprak Yarma ve Metal ile) yarığı kilitle.',
    [D('sizinti', 'Sarı ve mor sızıntı', -0.3, 'elektrik', 'Kararsız enerji yarıktan fışkırıyor.', [['bos_sise'], ['lumina_salim'], ['solis_salim']], 'Basınç düştü.'),
      D('kilit', 'Krater merkez yarığı', 0.4, 'tas', 'Yarık nefes alır gibi açılıp kapanıyor.', [['sarmasik', 'oz_baglama'], ['toprak_yarma', 'metal']], 'Yarık kilitlendi; mor fısıltı dindi.', { on: ['sizinti'] })],
    [S('Gölün yüzüne bak', { valen: 15, sarah: 15 }, (d) => 'Kara Göl\'ün yüzeyi ilk kez berrak gece göğünü yansıtıyor. Valen\'in ikinci bir Kara Göl kıyameti korkusu yatıştı.' + (bitti(d, 'SU-03') ? ' Keralon ve Kara Göl aynı anda dengelendi: finalde su ve kristal dengesi ek rezonans verecek.' : ''),
      { bayrak: ['kg03', 'karaGolMuhur'], yap: (d) => { if (bitti(d, 'SU-03')) d.bayrak.suDengesi = true; } })],
    { kosul: (d) => !!d.bayrak.tonoflenyaGoruldu && (bitti(d, 'KG-02') || ((d.tf && d.tf.biten) || []).includes(14)), kosulMetni: 'KG-02 ya da 14. büyük görev gerekir' }),
  // --- Paket 12 ---
  G('NER-01', 'Çöken kemerin iki yakası', 'bag', 2,
    'Tuz ve Baharat loncaları arasındaki taş kemer köprü çöktü; iki taraf birbirini suçluyor. Sabaha kadar ilaç geçmezse salgın başlar.',
    ['Kanalın altındaki kemer taşlarına bakıyorsun: çökme sabotaj değil, gelgitin oyduğu temelden.'],
    'Geçici Madde Köprüsü kur, altındaki girdabı Sıvı Yönlendirme ile yan kanala dağıt (ya da Metal Şekillendirme ile kemeri tuttur).',
    [D('kopru', 'Çöken kemer', 0, 'su', 'İki yakada silahlı muhafızlar; arada girdap.', [['madde_koprusu', 'sivi'], ['metal', 'sivi']], 'Köprü kuruldu; ilaç sandıkları geçti.')],
    [S('İki lonca başkanına ortak rapor', { g_guney: 10 }, 'İki taraf silahları indirdi; ortak onarım fonu kuruldu. Veradon tahliye hattına iki ikmal teknesi fazladan ulaşacak.', { bayrak: ['ner01', 'neryaOrtak'] }),
      S('Raporu Zahra Elmas Göz\'e ver', { g_dogu: 10 }, 'Zahra onarım ihalesini sessizce aldı; sana Nerya karaborsa geçidini açtı.', { bayrak: ['ner01', 'neryaKaraborsa'] })]),
  G('NER-02', 'Gümrük defterindeki tuzlu mühür', 'zincir', 2,
    'Sular altındaki eski lonca mahzeninde mühürlü bir pirinç sandık.',
    ['Islak merdivenler yosunlu ve çökmeye hazır.'],
    'Hafif Süzülme ile basamaklara değmeden geç; sandığın çevresindeki suyu Buzul ile dondur, Öz Bağlama ile lonca mühür taşına eşle.',
    [D('merdiven', 'Yosunlu merdivenler', -0.3, 'su', 'Basamaklar kayıyor.', [['suzulme']], 'Su yüzeyinin üstünden iç odaya süzüldün.'),
      D('sandik', 'Yüzen pirinç sandık', 0.4, 'metal', 'Sandık sürükleniyor.', [['buzul', 'oz_baglama'], ['lumina_salim', 'oz_baglama']], 'Sandık açıldı: Kayıp Deniz Ticaret Beratı.', { on: ['merdiven'] })],
    [S('Beratı genç kaptan kızına ver', { g_guney: 10 }, 'Nerya kanallarında ömür boyu ücretsiz geçiş ve bir paket gümüş tozu.', { odul: { esya: { gumus_tozu: 3 } }, bayrak: ['ner02', 'neryaGecis'] }),
      S('Beratı Lonca Konseyi\'ne ver', { g_guney: 5, g_ygk: 5 }, 'Konsey beratı kayda geçirdi; kanallarda ücretsiz geçiş ve gümüş tozu.', { odul: { esya: { gumus_tozu: 3 } }, bayrak: ['ner02', 'neryaGecis'] })],
    { kosul: (d) => FAZ[2].kosul(d) && bitti(d, 'NER-01'), kosulMetni: 'NER-01 gerekir' }),
  G('FEN-01', 'Toz üstünde yedi adım', 'bag', 2,
    'Tharal\'dan gelen bir toz mavnası Fenrir\'in ortasında karaya oturmuş; mürettebat toza batmaktan korkuyor.',
    ['Parlayan toz diz boyu; ağır adım insanı içine çeker.'],
    'Hafif Süzülme ile üç kılavuz şamandıra arasında ilerle; toz bulutunda Hakikat Yankısı ile mavnanın çanını bul, Lumina ile dönüş çizgisini göster.',
    [D('samandira', 'Kılavuz şamandıraları', -0.3, 'toz', 'Şamandıralar tozun üstünde.', [['suzulme']], 'Üç şamandırayı geçtin.'),
      D('yon', 'Toz bulutu', 0.4, 'toz', 'Göz gözü görmüyor; uzakta bir metal çan.', [['hakikat_yankisi', 'lumina_salim'], ['yanki_tarama', 'lumina_salim']], 'Mürettebat ışık çizgisinden iskeleye yürüdü.', { on: ['samandira'] })],
    [S('Mavnayı iskeleye çek', { g_guney: 10 }, 'Tharal\'a giden toz sevkiyatı kurtuldu; mürettebat sana Fenrir tozunu depolayan bir toz pusulası verdi.', { odul: { esya: { toz_pusulasi: 1 } }, bayrak: ['fen01'] })]),
  G('FEN-02', 'Gömülü fenerin altındaki ışık', 'zincir', 2,
    'Fenrir\'in ortasında yüzyıllardır toz altında kalmış eski bir rasathane kubbesi.',
    ['Kubbe kapağının üstünde ağır bir toz tabakası; içeride kırık bir döner merdiven.'],
    'Hava Kontrolü (rüzgâr) ile tozu it ya da Toprak Yarma ile kapağı aç; Geçici Madde Köprüsü ile merdiveni tamamla; prizma yuvasına Işık Köprüsü kur.',
    [D('toz', 'Kubbe kapağındaki toz', -0.5, 'toz', 'Toz kapağı gömmüş.', [['hava_ruzgar'], ['toprak_yarma']], 'Toz kenara itildi.'),
      D('merdiven', 'Kırık döner merdiven', 0, 'metal', 'Basamakların yarısı yok.', [['madde_koprusu']], 'Merdiven tamamlandı.', { on: ['toz'] }),
      D('prizma', 'Merkez prizma yuvası', 0.5, 'kristal', 'Yuvada solgun bir prizma.', [['isik_koprusu'], ['lumina_salim']], 'Kadim yıldız haritası duvara yansıdı.', { on: ['merdiven'] })],
    [S('Koordinatları kopyala', { kefius: 10 }, 'Malazar ile Arin Adası arasındaki eski güvenli hava koridoru haritanda.', { bayrak: ['fen02', 'guvenliHavaKoridoru'], kodeks: 'fenrir_rasathanesi' })],
    { kosul: (d) => FAZ[2].kosul(d) && bitti(d, 'FEN-01'), kosulMetni: 'FEN-01 gerekir', hava: 0 }),
  G('THA-01', 'Köklerin sessiz çığlığı', 'bag', 2,
    'Tharal lordunun toz yıkama kanalları yaşlı ormanın köklerine mineral tortusu sızdırıyor.',
    ['Köylüler tesisin kapanmasını, tüccarlar üretimin sürmesini istiyor.'],
    'Canlı Sarmaşık ile kök ve yosun filtre duvarı ör; tortulu suyu Sıvı Yönlendirme ile boş taş ocağına aktar.',
    [D('filtre', 'Orman kenarındaki su oluğu', -0.3, 'bitki', 'Su gri ve tortulu.', [['sarmasik']], 'Canlı bir filtre duvarı örüldü.'),
      D('akis', 'Tortulu su', 0.4, 'su', 'Tortu köklere iniyor.', [['sivi']], 'Tortu taş ocağına aktı.', { on: ['filtre'] })],
    [S('Doğal filtreyi köylülere öğret', { lyra: 20, elian: 20, g_guney: 5 }, 'Tarım ve orman kurtuldu; Lyra ve Elian bu tekniği duydu.', { bayrak: ['tha01', 'tharalFiltre'] }),
      S('Lorddan ticari imtiyaz al', { g_guney: 10 }, 'Tesis sürüyor; lord sana düzenli ışık otu ve bal gönderecek.', { bayrak: ['tha01', 'tharalImtiyaz'], yap: (d) => tarim(d), odul: { esya: { urun_isik_otu: 3, bal: 2 } } })]),
  G('THA-02', 'Kraliyet tahıl ambarının canlı kilidi', 'hiyerarsi', 2,
    'Kıtlık için saklanan eski kraliyet tohum ambarının anahtarı kayıp; kapı iki ağırlık koluna aynı anda basılıp kök kilidi çözülünce açılır.',
    ['Ambar kulesinin kapısında kurumuş bir sarmaşık kilidi.'],
    'Yankı İkizi ile ikinci kola basarken Canlı Sarmaşık ile kilidi canlandır, Öz Bağlama ile yeni bir mühür anahtarına bağla.',
    [D('kilit', 'Canlı kök kilidi', 0, 'bitki', 'İki ağırlık kolu ve kuru bir sarmaşık.', [['yanki_ikizi', 'sarmasik', 'oz_baglama']], 'Ambar kapısı açıldı.')],
    [S('Tohumları Taş Çember köylerine dağıt', { g_ygk: 5 }, 'Dayanıklı tahıl tohumları Taş Çember\'de; ilk hasat bol olacak. Bir kısmı koloniye.', { odul: { esya: { tohum: 5 } }, bayrak: ['tha02'] }),
      S('Tohumları Tharal çiftçilerine dağıt', { g_guney: 10 }, 'Tharal\'ın kıtlık korkusu bitti. Çiftçiler bir kısmını sana verdi.', { odul: { esya: { tohum: 5 } }, bayrak: ['tha02'] })],
    { kosul: (d) => FAZ[2].kosul(d) && bitti(d, 'THA-01'), kosulMetni: 'THA-01 gerekir' }),
  G('GUM-01', 'Gümüş sazlıkların unuttuğu sandık', 'zincir', 2,
    'İlk YGK keşif gemilerinden biri Malazar dönüşü bu sazlıklara gizli bir ölçüm sandığı bırakmış. Sazlar jilet gibi, altı bataklık.',
    ['Uzun gümüş sazlıklar rüzgârda metalik fısıldıyor.'],
    'Hafif Süzülme ile batık iskeleye ulaş, Lumina ile solmuş YGK işaretini parlat, sandığı Öz Bağlama ile aç.',
    [D('sazlik', 'Keskin sazlık', -0.5, 'ruzgar', 'Sazlar kesiyor, altı batak.', [['suzulme']], 'Su yüzünden süzülüp iskeleye vardın.'),
      D('isaret', 'Solmuş YGK işareti', 0, 'kristal', 'Direkteki işaret okunmuyor.', [['lumina_salim']], 'İşaret parladı; dalış noktası belli.', { on: ['sazlik'] }),
      D('sandik', 'Eski YGK sandığı', 0.5, 'metal', 'Kilit mühürlü.', [['oz_baglama']], 'Sandık kırılmadan açıldı.', { on: ['isaret'] })],
    [S('Notları Dr. Axira\'ya götür', { axira: 25 }, 'Axira notlarda Malazar Hâle\'si hakkında kimsenin bilmediği ölçümler buldu.', { bayrak: ['gum01', 'ilkSeferNotu'], kodeks: 'ilk_malazar_seferi' }),
      S('Notları Kefius\'a götür', { kefius: 25 }, 'Kefius notlardan finaldeki heykeller için bir ipucu çıkardı.', { bayrak: ['gum01', 'ilkSeferNotu'], kodeks: 'ilk_malazar_seferi' }),
      S('Notları kendinde tut', {}, 'El yazması çantanda.', { bayrak: ['gum01'], odul: { esya: { ilk_sefer_notlari: 1 } } })]),
  // --- Paket 13 ---
  G('JUL-01', 'Meclis salonunda iki mühür, tek gerçek', 'bag', 2,
    'Malkenia ile Filtra arasındaki gümrüğü iki katına çıkaran kararname oylanacak; genç bir kâtip mührün sahte olduğundan şüpheleniyor.',
    ['Gece arşiv odasındasın; kasada iki eski ferman.'],
    'Hakikat Yankısı ile mühürlerdeki yoğunluk farkını bul, Lumina ile silinmiş gerçek imzayı görünür kıl, Öz Bağlama ile gerçek belgeyi başkanın mühür taşına mühürle.',
    [D('belge', 'İki ferman', -0.5, 'fisilti', 'Balmumu kusursuz görünüyor.', [['hakikat_yankisi']], 'Sahte mührün yoğunluğu farklı.'),
      D('imza', 'Silinmiş kâtip imzası', 0, 'kristal', 'Parşömenin köşesi boş.', [['lumina_salim']], 'Gerçek imza belirdi.', { on: ['belge'] }),
      D('kilit', 'Başkanın mühür taşı', 0.5, 'metal', 'Sabah dosyayı herkes değiştirebilir.', [['oz_baglama']], 'Belge mühürlendi.', { on: ['imza'] })],
    [S('Sahte kararnameyi meclise göster', { oronte: 10, g_bati: 10 }, 'Julithan haksız vergi koymayacak; Malkenia ile Filtra arasındaki ticaret sürüyor. Sahte mührün izi birilerinin dikkatini çekti; bir istihbarat notu bekleyebilirsin.', { bayrak: ['jul01', 'julithanMuhur'] })]),
  G('JUL-02', 'Liman kulesinin çatlak çanı', 'zincir', 2,
    'Sisli gecelerde gemilere liman girişini bildiren bronz çan çatlamış; iki gemi sığ kayalıklara sürükleniyor.',
    ['Kulenin tepesinde rüzgâr ve yanlış bir nota.'],
    'Metal Şekillendirme ile bronzu kaynaksız birleştir; Yankı Düğümü ile sesi liman ağzına yönlendir.',
    [D('can', 'Çatlak bronz çan', -0.3, 'metal', 'Çan çatlak bir nota veriyor.', [['metal']], 'Bronz birleşti.'),
      D('yon', 'Rüzgâra karışan ses', 0.4, 'ruzgar', 'Ses dağılıyor.', [['yanki_dugumu']], 'Çanın sesi liman ağzına ulaştı; gemiler döndü.', { on: ['can'] })],
    [S('Denizciler Loncası\'na haber ver', { g_bati: 10 }, 'Julithan limanından ücretsiz geçiş; gümüş tozu ve tamir kiti ikmali.', { odul: { esya: { gumus_tozu: 2, tamir_kiti: 1 } }, bayrak: ['jul02', 'julithanLiman'] })],
    { kosul: (d) => FAZ[2].kosul(d) && bitti(d, 'JUL-01'), kosulMetni: 'JUL-01 gerekir' }),
  G('ANI-01', 'Korzel Burnu\'nda iki geminin kaderi', 'bag', 2,
    'Fırtınada bir Anitor devriye fırkateyni ile bir korsan teknesi aynı anda Korzel Burnu kayalıklarına sürükleniyor.',
    ['Hisar komutanı korsanların batmasını istiyor; ama iki gemi çarpışırsa boğaz kapanır.'],
    'Hafif Süzülme ile dalgaların üstünden sönmüş fener kayasına geç; fenerin bobinini Yıldırım Rezonansı ile (ya da Solis patlatarak) ateşle.',
    [D('falez', 'Kırık taş iskele', -0.3, 'su', 'Dalgalar iskeleyi dövüyor.', [['suzulme']], 'Fener kayasındasın.'),
      D('fener', 'Paslı fener bobini', 0.4, 'elektrik', 'Fener sönük.', [['yildirim_rez'], ['solis_firlat']], 'Fener parladı.', { on: ['falez'] })],
    [S('A) Feneri devriye gemisine odakla', { g_bati: 10 }, 'Anitor filosu limana girdi, korsanlar açık denize kaçtı; Brastion hisarında itibarın arttı.', { bayrak: ['ani01', 'brastionItibar'] }),
      S('B) İki gemiye de eşit sinyal ver', { barracuda: 20 }, 'Korsan kaptanı sana gizli bir deniz haritası parçası bıraktı; Barracuda bunu duydu.', { bayrak: ['ani01'], odul: { esya: { korsan_harita_parcasi: 1 } } })]),
  G('ANI-02', 'Darnak Limanı\'nın kilitlenen demir zinciri', 'zincir', 2,
    'Liman girişini kapatan dev su altı zincirinin dişlisi pas ve kayayla yarı açık kilitlenmiş.',
    ['Hiçbir gemi çıkamıyor.'],
    'Çark yuvasındaki kumu Sıvı Yönlendirme (ya da Toprak Yarma) ile temizle; Metal Şekillendirme ile bükülmüş baklayı düzelt.',
    [D('cark', 'Çark yuvası', -0.3, 'su', 'Kum ve akıntı yuvayı doldurmuş.', [['sivi'], ['toprak_yarma']], 'Yuva temiz.'),
      D('zincir', 'Bükülmüş ana bakla', 0.4, 'metal', 'Zincir gergin ve eğri.', [['metal']], 'Vinç kolu serbest; zincir indi.', { on: ['cark'] })],
    [S('Limanı aç', { g_bati: 10 }, 'Brastion hisar geçiş izni, demir cevheri ve tamir kiti.', { odul: { esya: { brastion_izni: 1, demir_cevheri: 3, tamir_kiti: 1 } }, bayrak: ['ani02'] })],
    { kosul: (d) => FAZ[2].kosul(d) && bitti(d, 'ANI-01'), kosulMetni: 'ANI-01 gerekir' }),
  G('ORE-01', 'Mor Anzelon\'un asılı kayası', 'bag', 3,
    'Sarsıntıdan sonra dev bir kaya ve buz kütlesi garnizonun ve kervan yolunun üstünde asılı kalmış. Alttan kazmak onu kampın üstüne düşürür.',
    ['Çığ riskli patika; kayanın yanında yüksek bir çıkıntı.'],
    'Aether Adımı ile çıkıntıya geç, Buzul ile eriyen su damarını dondur, Toprak Yarma ile kütleyi boş uçuruma düşür.',
    [D('cikinti', 'Yüksek çıkıntı', -0.5, 'ruzgar', 'Patika çığ dolu.', [['aether_adimi'], ['ruzgar_ucusu']], 'Çıkıntıdasın.'),
      D('damar', 'Eriyen su damarı', 0, 'buz', 'Kütle damla damla kayıyor.', [['buzul']], 'Damar dondu; kütle sabit.', { on: ['cikinti'] }),
      D('kesim', 'Uçuruma bakan yüz', 0.5, 'tas', 'Kütlenin boş vadiye bakan tarafı.', [['toprak_yarma']], 'Kaya kampın uzağına, boş vadiye düştü.', { on: ['damar'] })],
    [S('Geçidi aç', { g_guney: 10 }, 'Oredan geçidi açıldı; Tharal ve Veradon kervanları güvenli kara yolunu kullanacak.', { bayrak: ['ore01', 'oredanGecidi'] })]),
  G('ORE-02', 'Kanyonun unutulmuş uyarı borusu', 'zincir', 3,
    'İki burçtaki dev bakır sis boruları korozyona uğramış; senkronu bozuk. Sis çöktüğünde kervanlar uçurum yolunu şaşırıyor.',
    ['Karşı burç kanyonun öbür yanında.'],
    'Borunun çatlak ağzını Metal Şekillendirme ile onar; karşı burçtaki boruyu aynı anda çalmak için Yankı İkizi kullan.',
    [D('boru', 'Çatlak sis borusu', -0.3, 'metal', 'Boru hırıltılı bir ses veriyor.', [['metal']], 'Boru onarıldı.'),
      D('ikiz', 'Karşı burç', 0.4, 'ruzgar', 'İki borunun aynı anda çalması gerek.', [['yanki_ikizi']], 'İki ses kanyonda birleşip doğru yön akorunu verdi.', { on: ['boru'] })],
    [S('Kervanlara haber ver', { g_guney: 10, zeno: 5 }, 'Sisli gecelerde kervanlar artık yollarını şaşırmayacak.', { bayrak: ['ore02'] })],
    { kosul: (d) => FAZ[3].kosul(d) && bitti(d, 'ORE-01'), kosulMetni: 'ORE-01 gerekir' }),
  G('GOL-01', 'Gölge Hattı\'ndaki üçüncü ayak izi', 'zincir', 3,
    'Zorah ile Drahmir arasında haber taşıyan üç kişilik devriye Kuzey Gölge Hattı\'nın soğuk sisinde yönünü kaybetmiş.',
    ['Pusulaları dönüyor; kendi ayak izlerini takip edip aynı kaya dairesinde dolaşıyorlar.', (d) => (esyaVar(d, 'yildiz_pusulasi') ? 'Yıldız pusulan sapmıyor; gerçek yön hemen belli.' : '')],
    'Hakikat Yankısı ile gerçek rüzgâr boşluğunu bul, Lumina ile sis içinde ışık koridoru aç, Aether Adımı ile buz yarığını geç.',
    [D('yon', 'Üç sahte yankı', -0.5, 'fisilti', 'Üç yönden üç ses.', [['hakikat_yankisi'], ['yanki_tarama']], 'Gerçek kaya boşluğu bulundu.'),
      D('sis', 'Soğuk kum sisi', 0, 'buz', 'Göz gözü görmüyor; biri donmak üzere.', [['lumina_salim']], 'Otuz metrelik bir ışık koridoru; son üyeyi buldun.', { on: ['yon'] }),
      D('yarik', 'Buz ve gerçeklik yarığı', 0.5, 'elektrik', 'Dönüş yolunu kesen dar bir yarık.', [['aether_adimi']], 'Devriye güvenli sınıra çıktı.', { on: ['sis'] })],
    [S('Devriyeyi Drahmir\'e teslim et', { kefius: 10, g_kuzey: 5, g_dogu: 5 }, 'Devriye sana Hardrin\'in gizli kamp yerini ve Kefius\'un yıllar önce bıraktığı bir gözlem notunu verdi.', { bayrak: ['gol01', 'hardrinKampi'], yap: (d) => { if (esyaVar(d, 'yildiz_pusulasi')) iade(d, 15); } })]),
];

kisiEkle('saha', {
  ad: 'Saha büyü görevleri', unvan: 'Karakter bağından bağımsız saha bulmacaları', gizli: true, sinif: 'B', guc: 'ygk',
  hiz: [[0, 10, 1]], kimlik: [], kademeler: Array(11).fill(''), sever: [], imza: { selam: '', tesekkur: '', kizgin: '' },
  gorevler: GOREVLER,
});
// Gizli kaydın kademesi görev durumunu etkilemesin
export const SAHA_GOREVLERI = GOREVLER.map((g) => g.id);

// Paket 11 bölüm 1: büyü dışı saha teçhizatı. Akademi yolu: ilgili kişilerden biriyle bağ kademesi 3 (ücretsiz). Şehir
// alternatifi: Malken lirası (ML) ile. Üçüncü yol her görevde: teçhizatsız daha zahmetli prosedür (kilitlenmez).
export const TECHIZAT = [
  { id: 'koruma_muhru', hedef: 'Kara Göl', akademi: ['valen', 'palmi'], akademiMetni: 'Valen Lazeria (Kat 6) ya da Palmi (Kat 3-4): Birinci Çağ karantina beratı.', sehir: 'Usta Çakal (Veradon) sahte Konsey mührü basar ya da Bayan Misket (Uma) sosyal nüfuzuyla sur kapısını açtırır.', ml: 120 },
  { id: 'fisilti_filtresi', hedef: 'Kara Göl', akademi: ['trellis', 'axira'], akademiMetni: 'Trellis-7 (Kat 5) ve Dr. Axira: zift gazı ve fısıltı süzücü maske.', sehir: 'Doktor Kıkırdak (Flee Plee): kükürt-kireç solunum şişesi; görüşü hafif buğular ama aynı korumayı verir.', ml: 90 },
  { id: 'runahar_plani', hedef: 'Kara Göl tabanı', akademi: ['corinne', 'tixie', 'sora'], akademiMetni: 'Corinne (Kat 4): Birinci Çağ başkent batış haritası; Tixie ya da Sora-9: derinlik tarayıcısı.', sehir: 'Harita yoksa krater tabanında Hakikat Yankısı ile kör tarama (daha fazla odak).', ml: null },
  { id: 'yildiz_pusulasi', hedef: 'Mavi Hardrin ve Ajmero', akademi: ['kefius', 'puskul'], akademiMetni: 'Kefius ya da Profesör Püskül (Kat 4): manyetik sapmaya dirençli antik pusula.', sehir: 'Xaela (Aether-Dock): lazer lens kalibrasyonuyla geçici dijital yön ağı.', ml: 110 },
  { id: 'topraklama_pelerini', hedef: 'Malazar Hâle ve Norvask', akademi: ['forges', 'zeva'], akademiMetni: 'Forges (Kat 3) ya da Zeva Thorne: iletkenliği kesen alaşım kaplama.', sehir: '"Sıfır" Makinist (Filtra): pirinç ve kauçuk yalıtımlı buhar pelerini.', ml: 130 },
  { id: 'golge_sifre', hedef: 'Kahergonat ve Halyon', akademi: ['sirilla', 'nox'], akademiMetni: 'Sirilla (Kat 5-6) ya da Nox (Kat -1/-2): eski Konsey kilit şifre anahtarı.', sehir: 'Zahra Elmas Göz (Zorah): karaborsadan tek kullanımlık asit teli.', ml: 100 },
];
export function techizatMenu(d) {
  return {
    baslik: 'Saha hazırlık ağı',
    giris: 'Büyü olmayan teçhizat: akademi kişilerinden (bağ kademesi 3) ya da şehirden. Teçhizatsız da görevler yapılır; yalnız daha zahmetlidir.',
    ogeler: TECHIZAT.map((t) => {
      const var_ = esyaVar(d, t.id);
      const k = t.akademi.find((x) => kademe(d, x) >= 3);
      return {
        id: 't_' + t.id, etiket: ZN.adi(t.id) + ' (' + t.hedef + ')' + (var_ ? ', sende' : ''), ipucu: t.akademiMetni,
        alt: (z) => ({
          baslik: ZN.adi(t.id),
          giris: t.akademiMetni + ' Şehir alternatifi: ' + t.sehir,
          ogeler: [
            { id: 'ak', etiket: k ? 'Akademiden al (' + k + ' ile bağın yeterli)' : 'Akademi yolu: ' + t.akademi.join(' ya da ') + ' ile kademe 3 gerekir', yap: (x) => {
              if (esyaVar(x, t.id)) return { metin: 'Zaten sende.' };
              if (!t.akademi.some((y) => kademe(x, y) >= 3)) return { metin: 'Önce ' + t.akademi.join(' ya da ') + ' ile bağını üçüncü kademeye çıkar.', ses: 'red' };
              ZN.ekle(x, t.id, 1);
              return { metin: ZN.adi(t.id) + ' çantanda.' };
            }, geri: true },
            ...(t.ml ? [{ id: 'sehir', etiket: 'Şehirden temin et: ' + t.ml + ' ML', yap: (x) => {
              if (esyaVar(x, t.id)) return { metin: 'Zaten sende.' };
              if (!x.para || (x.para.ml || 0) < t.ml) return { metin: t.ml + ' ML gerekir.', ses: 'red' };
              x.para.ml -= t.ml;
              ZN.ekle(x, t.id, 1);
              return { metin: ZN.adi(t.id) + ' çantanda.' };
            }, geri: true }] : [{ id: 'sehir', etiket: 'Şehir alternatifi: ' + t.sehir, yap: () => ({ metin: t.sehir }), geri: true }]),
          ],
        }),
      };
    }),
  };
}
