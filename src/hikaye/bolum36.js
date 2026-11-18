// Otuz altıncı bölüm: "İhale". Ankara, 21 Ekim 1925. Altıncı kitabın ortası.
// Arka plan: Cumhuriyetin ilk yıllarında ihracat ve imtiyaz tartışmaları. Komisyon, salon ve kişiler kurgudur; gerçek
// kişiler ve gerçek bir ihale konuşturulmaz.
// Kurgu: Albert Vollmer (15. bölümden beri; kural 4) ilk kez Anadolu'da, kendisi. Saat 17'de bir komisyonun önünde
// ihracat imtiyazı ihalesi. Kalıbı kır: tek bir gün, saat saat. Her ziyaret iki saat (ZAMAN_SINIRI 8: dört ziyaret,
// beş yer). Kanıt sayısı KANIT_ESIGI'ne ulaşırsa komisyon Vollmer'i reddeder.
// Vollmer'in kozu: kırmızı sayfadaki "Kalıp: Manastırlı usta İ." satırı (23. bölüm). vollmerSonu itiraf ise baba bu kartı
// çoktan oynamıştır.
// Karşılık verilen iplikler: pendleSon35, albrechtSonu, sabitSon34, nerminKorku, cemilRapor34, neslihanMiras, vollmerSonu,
// babaItiraf, neslihanAd.
// Yeni iplikler: babaSayfa, vollmerIhale.
import { BOLUM35 } from './bolum35';
import { bayrak, cikarimVar, delilVar, sayi } from '../oyun/motor';

export const ZAMAN_SINIRI = 8;
export const KANIT_ESIGI = 4;
const saat = (d) => 9 + sayi(d, 'zaman36');
const vakitVar = (d) => sayi(d, 'zaman36') < ZAMAN_SINIRI;
const kozCoktan = (d) => bayrak(d, 'vollmerSonu') === 'itiraf';

export const kanitSayisi36 = (d) =>
  sayi(d, 'kanit36') +
  (delilVar(d, 'vollmer_ceki') ? 1 : 0) +
  (cikarimVar(d, 'imtiyaz') ? 1 : 0) +
  (delilVar(d, 'vollmer_ajani') ? 1 : 0);

const git = (yer, sahne, kanit) => (d) =>
  !vakitVar(d) || bayrak(d, 'gidildi_' + yer)
    ? null
    : { sahne, bayrak: { ['gidildi_' + yer]: true }, artir: { zaman36: 2, kanit36: typeof kanit === 'function' ? kanit(d) : kanit } };

export const BOLUM36 = {
  id: 'bolum36',
  ad: 'Otuz altıncı bölüm: İhale',
  baslangic: 'acilis',
  ilkMekan: 'ankara36',

  deliller: { ...BOLUM35.deliller },
  cikarimlar: { ...BOLUM35.cikarimlar },

  olaylar: [
    { id: 'ihale', kosul: (d) => !vakitVar(d) && d.mekan === 'ankara36', etki: { sahne: 'ihale36' } },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Otuz altıncı bölüm bitti.' },
    { kosul: (d) => vakitVar(d), metin: (d) => 'Saat ' + saat(d) + '. İhale on yedide. Kanıt: ' + kanitSayisi36(d) + ' / ' + KANIT_ESIGI + '.' },
    { kosul: () => true, metin: 'Saat on yedi. Komisyon salonu.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_telgraf',
      baslik: '21 Ekim 1925, Ankara',
      paragraflar: (d) => [
        'Sabah dokuz. Ankara istasyonunda soğuk bir rüzgâr; bozkırdan geliyor. Bugün saat on yedide bir komisyon bir ihracat imtiyazını karara bağlayacak. Tek teklif sahibi: Anadolu Ticaret Ortaklığı. Arkasında Zürih.',
        'Albert Vollmer dün akşam gelmiş. İlk kez kendisi. Yetmişlerinde, ince, gümüş saçlı; bastonunun başı fildişi. Mezatta sesini duymuştun, yüzünü değil.',
        'Rıza Bey saatini çıkarıyor. Sekiz saat, diyor. Her kapı iki saat; dördüne yetişiriz. Beşinciye değil.',
        bayrak(d, 'neslihanMiras') === 'borc'
          ? 'Neslihan\'ın cebinde üç yüz incircinin ödenmiş senetleri. Vollmer\'in teminatının yarısı artık kâğıt.'
          : 'Neslihan yanında; bu sabah hiç konuşmadı.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'ankara36', bayrak: { ekip_riza: true, ekip_cemil: true } } }],
    },

    telgraf36: {
      ortam: 'ortam_telgraf',
      baslik: 'Telgrafhane',
      paragraflar: (d) =>
        bayrak(d, 'pendleSon35') === 'tanik'
          ? ['Telgraf memuru bir zarf uzatıyor: İzmir\'den, yirmi iki sayfa. Sir Henry Pendle\'in ifadesi; noter mühürlü. Son sayfada titrek bir imza ve bir satır: Columbia, Aurora, Santa Lucia. Ben taşıdım. O ödedi.']
          : bayrak(d, 'pendleSon35') === 'teslim'
            ? ['İzmir\'den bir telgraf: Pendle hastane odasında, tutuklu. Komisyona yazmayı reddetti. Atkıyı istemiş yine.']
            : ['İzmir\'den bir telgraf: Pendle Arethusa\'da, ağır hasta. Kimseyle konuşmuyor.'],
      secenekler: [{ etiket: 'Çık', etki: { mekan: 'ankara36' } }],
    },
    cezaevi36: {
      ortam: 'ortam_cezaevi',
      baslik: 'Ankara Hapishanesi',
      paragraflar: (d) =>
        [
          bayrak(d, 'albrechtSonu') === 'yakalandi'
            ? 'Albrecht İzmir\'den getirilmiş. Zürih onu tanımadığını söyledi, diyorsun. Albrecht\'in yüzü değişiyor. Bankam beni tanımıyorsa, diyor, ben de bankamı tanımayabilirim. Bir kalem istiyor.'
            : 'Albrecht yok; Pire\'den Zürih\'e kaçtı.',
          ['mahkeme', 'cemil'].includes(bayrak(d, 'sabitSon34'))
            ? 'Sabit Bey de burada, iki hücre ötede. ' + (bayrak(d, 'sabitSon34') === 'cemil' ? 'Cemil Bey\'in koğuşlarında bir hafta geçirdi. Ben bir şey yazacağım, diyor; çocukların adlarını hatırlamıyorum ama yüzlerini.' : 'Mahkemesi gelecek ay. Bir ifade, diyor; hafifletir mi? Hafifletmez, diyorsun. Yine de yazıyor.')
            : 'Sabit Bey burada değil.',
        ],
      secenekler: [{ etiket: 'Çık', etki: { mekan: 'ankara36' } }],
    },
    matbaa36: {
      ortam: 'ortam_matbaa',
      baslik: 'Taşhan',
      paragraflar: (d) =>
        bayrak(d, 'nerminKorku') === 'istanbul'
          ? ['Matbaa kapalı; Nermin İstanbul\'da, kayıkhanede. Kapıda bir telgraf: Akşam baskısı Gülce\'nin elinde; ihale saatinde İstanbul\'da dağıtılacak. Ankara\'ya yetişmez.']
          : [
              'Nermin dizgi kasasının başında; arkasında jandarma uyuyor. Akşam baskısı, diyor. Koza, kinin, incir: bir zincir. Saat dörtte sokakta olur.',
              bayrak(d, 'cemilRapor34') === 'gazete' ? 'Tebeşir haberinden sonra kimse bana inanmamazlık edemez, diyor. Bu sefer manşet.' : 'Komisyon gazete okur mu, bilmiyorum. Ama koridorlar okur.',
            ],
      secenekler: [{ etiket: 'Çık', etki: { mekan: 'ankara36' } }],
    },
    hastane36: {
      ortam: 'ortam_hastane',
      baslik: 'Hastane',
      paragraflar: (d) =>
        ({
          adli: ['Cemil Bey raporunun bir suretini çıkarıyor; Sıhhiye mühürlü. Adlarla, diyor. Tebeşir, firma, memurlar. Komisyonun önüne bunu da koyun. Ben gelemem; koğuş dolu. Ama kâğıdım gelir.'],
          adsiz: ['Cemil Bey raporunun suretini veriyor; memurların adı yok. Yetmez, diyor; biliyorum. Ama yine de bir şey.'],
          gazete: ['Cemil Bey Taşhan\'ın eski sayısını uzatıyor: Sıtmalıya Tebeşir. Gazete bir kez bastı, diyor. Komisyon onu bir kez okudu. İkinci kez okutun.'],
        }[bayrak(d, 'cemilRapor34')] || ['Cemil Bey koğuşta. Bir rapor yazmadım, diyor; şimdi pişmanım.']),
      secenekler: [{ etiket: 'Çık', etki: { mekan: 'ankara36' } }],
    },
    vollmer36: {
      ortam: 'ortam_otel',
      baslik: 'Otel lobisi',
      paragraflar: (d) => [
        'Otel lobisinde bir koltuk. Vollmer çayını karıştırıyor; kaşığı fincanın kenarına hiç değdirmeden. Bay Demir, diyor. Mezatta size bir şey satamadım. Bugün bir şey vermek istiyorum.',
        kozCoktan(d)
          ? 'Bir fotoğrafı masaya koyuyor; kırmızı sayfa. Kalıp: Manastırlı usta İ. Sonra gülümsüyor. Ama babanız bu kartı benden önce oynadı, değil mi? Sofrasında. Gazetede. Saygı duyarım; kartsız oynamak zorunda kalacağım.'
          : 'Bir fotoğrafı masaya koyuyor; kırmızı sayfa. Kalıp: Manastırlı usta İ., bedeli ödendi. Bu akşam komisyonda kanıtlarınızın birini geri çekin, diyor. Yoksa bu satır yarın Ankara\'nın bütün gazetelerinde. Kanatlı anahtarı döken kalaycı; kızının hikâyesiyle birlikte.',
        bayrak(d, 'neslihanAd') === 'baba'
          ? 'Neslihan fotoğrafa bakıyor. İsmail kızı Neslihan, diyor yalnızca. Cenevre\'de de böyle başladım.'
          : 'Neslihan fotoğrafa bakıyor; bir şey söylemiyor.',
      ],
      secenekler: [
        {
          etiket: 'Kartın yok Vollmer. Çayını iç.',
          kosul: (d) => kozCoktan(d),
          etki: { bayrak: { babaSayfa: 'coktan' }, artir: { kanit36: 1 } },
          sonra: 'vollmer36_son',
        },
        {
          etiket: 'Yayımla. Babamın günahı benim kalkanım değil.',
          kosul: (d) => !kozCoktan(d),
          etki: (d) => ({ bayrak: { babaSayfa: 'yayimla' }, artir: { kanit36: 1, travma: bayrak(d, 'babaItiraf') ? 0 : 1 } }),
          sonra: 'vollmer36_son',
        },
        {
          etiket: 'Bir kanıtı geri çekerim. Babamın adı çıkmasın.',
          kosul: (d) => !kozCoktan(d),
          etki: { bayrak: { babaSayfa: 'korundu' }, artir: { kanit36: -1 } },
          sonra: 'vollmer36_son',
        },
      ],
    },
    vollmer36_son: {
      ortam: 'ortam_otel',
      baslik: 'Lobi',
      paragraflar: (d) => [
        {
          coktan: 'Vollmer fotoğrafı cebine geri koyuyor. Bir bankacı kaybettiği kartı saklar, diyor. Bir gün başka bir masada işe yarar.',
          yayimla: bayrak(d, 'babaItiraf')
            ? 'Vollmer kaşlarını kaldırıyor. Babanız sofrada söylemişti, diyorsun; bize. Şimdi bütün Ankara duyacak. O zaten hazır. Vollmer ilk kez çayını bitirmeden kalkıyor.'
            : 'Vollmer başını eğiyor; saygı mı, alay mı, belli değil. Babanız bunu bilmiyor, değil mi, diyor. Yarın sabah bilecek. Neslihan senin kolunu tutuyor.',
          korundu: 'Vollmer fotoğrafı ikiye katlıyor, sana uzatıyor. Bir pazarlık, diyor. İkimiz de bir şey kaybettik. Neslihan gözlerini senden kaçırıyor.',
        }[bayrak(d, 'babaSayfa')] || '',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Çık', etki: { mekan: 'ankara36' } }],
    },

    ihale36: {
      ortam: 'ortam_genelkurul',
      efekt: ['tokmak'],
      baslik: 'Saat on yedi, komisyon salonu',
      paragraflar: (d) => [
        'Uzun bir masa, yedi sandalye, yeşil çuha. Bir kâtip tutanak tutuyor. Vollmer en önde; bastonu dizinde.',
        'Sıra sizde. Rıza Bey kâğıtları tek tek masaya koyuyor; bir zabıt kâtibinin sabrıyla.',
        bayrak(d, 'gidildi_otel') || kozCoktan(d)
          ? ''
          : 'Vollmer söz istiyor. Bir fotoğraf; kırmızı sayfa. Kalıp: Manastırlı usta İ. Bu ekibin kanıtları, diyor, bir zehir kalıbı dökenin oğlundan geliyor. Salonda bir kıpırtı.',
        'Kanıt: ' + kanitSayisi36(d) + ' / ' + KANIT_ESIGI + '. Başkan tokmağı vuruyor.',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Kararı dinle',
          etki: (d) => ({
            bayrak: {
              vollmerIhale: kanitSayisi36(d) >= KANIT_ESIGI ? 'red' : 'kabul',
              babaSayfa: bayrak(d, 'babaSayfa') || (kozCoktan(d) ? 'coktan' : 'ifsa'),
            },
          }),
          sonra: 'ihale36_son',
        },
      ],
    },
    ihale36_son: {
      ortam: 'ortam_genelkurul',
      baslik: 'Karar',
      paragraflar: (d) => [
        bayrak(d, 'vollmerIhale') === 'red'
          ? 'Komisyon teklifi reddediyor: teminatın kaynağı şüpheli, firmanın ortakları soruşturmada. Vollmer ayağa kalkıyor; bastonunu yere bir kez vuruyor. Zürih\'te görüşürüz, Bay Demir, diyor. Bu kez benim masamda.'
          : 'Komisyon teklifi kabul ediyor: tek teklif, kanıtlar yetersiz, soruşturma ayrıca yürüsün. Vollmer bastonunu dizinden indiriyor. Bir devletin ilk yılları, diyor sana geçerken; ortak olmak için en iyi zaman.',
        {
          ifsa: 'Ertesi sabah gazetelerde bir satır: Kanatlı anahtarın kalıbını döken Manastırlı kalaycı. Baban İstanbul\'da okuyacak; belki okumuştur bile.',
          yayimla: 'Ertesi sabah gazetelerde bir satır: Kanatlı anahtarın kalıbını döken Manastırlı kalaycı. Senin seçtiğin bir satır.',
          korundu: 'Ertesi sabah gazetelerde babanın adı yok. Senin seçtiğin bir sessizlik.',
          coktan: 'Ertesi sabah gazetelerde babanın adı yok; çünkü baban onu bir yıl önce kendisi söyledi.',
        }[bayrak(d, 'babaSayfa')] || '',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', sonra: 'son36' }],
    },
    son36: {
      ortam: 'ortam_telgraf',
      baslik: 'Gece, telgrafhane',
      paragraflar: (d) => [
        'Gece. Telgrafhanenin tahta sırasında Neslihan babasına bir telgraf yazıyor; yazıyor, siliyor.',
        {
          ifsa: 'Ne yazayım abi, diyor. Babam gazeteden mi öğrensin, benden mi? Bir kere gazeteden öğrendi zaten.',
          yayimla: bayrak(d, 'babaItiraf') ? 'Babam hazır, diyor. Sofrada söylemişti. Ben hazır mıyım, bilmiyorum.' : 'Babamın adını sen verdin, diyor; kızgın değil, yorgun. Ona sen yazacaksın.',
          korundu: 'Bir kanıtı geri çektin, diyor. Babam için. Teşekkür edeyim mi, kızayım mı, bilmiyorum.',
          coktan: 'Babam bir yıl önce kendi adını kendi söyledi, diyor. Bugün Vollmer elinde boş bir kâğıtla kaldı. Bunu ona yazayım.',
        }[bayrak(d, 'babaSayfa')] || '',
        bayrak(d, 'vollmerIhale') === 'red'
          ? 'Rıza Bey kapıda; gülümsüyor. Zürih, diyor. Benim yaşımda bir adam Zürih\'e gitmez. Ama ben giderim.'
          : 'Rıza Bey kapıda. Kaybettik, diyor; bugün. Bir dava bir gün değildir.',
        'Otuz altıncı bölümün sonu.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_telgraf',
      ortamOran: 0.45,
      baslik: 'Otuz altıncı bölüm bitti',
      paragraflar: ['Kararların kaydedildi. Otuz yedinci bölüm yazılıyor.'],
      secenekler: [{ etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    ankara36: {
      ad: 'Ankara',
      ortam: 'ortam_telgraf',
      tarif: (d) =>
        'İstasyon, Hükümet Meydanı, Taşhan, hastane, hapishane. ' +
        (vakitVar(d) ? 'Saat ' + saat(d) + '. İhale on yedide. Kanıt: ' + kanitSayisi36(d) + ' / ' + KANIT_ESIGI + '.' : 'Saat on yedi.'),
      nesneler: [
        { id: 'telgraf_git', etiket: 'Telgrafhane: İzmir\'den bir şey geldi mi?', kosul: (d) => vakitVar(d) && !bayrak(d, 'gidildi_telgraf'), incele: 'Telgrafhaneye yürüyorsun.', etki: git('telgraf', 'telgraf36', (d) => (bayrak(d, 'pendleSon35') === 'tanik' ? 2 : 0)) },
        { id: 'cezaevi_git', etiket: 'Hapishane: Albrecht, Sabit', kosul: (d) => vakitVar(d) && !bayrak(d, 'gidildi_cezaevi'), incele: 'Hapishaneye yürüyorsun.', etki: git('cezaevi', 'cezaevi36', (d) => (bayrak(d, 'albrechtSonu') === 'yakalandi' ? 1 : 0) + (['mahkeme', 'cemil'].includes(bayrak(d, 'sabitSon34')) ? 1 : 0)) },
        { id: 'matbaa_git', etiket: 'Taşhan: Nermin\'in akşam baskısı', kosul: (d) => vakitVar(d) && !bayrak(d, 'gidildi_matbaa'), incele: 'Taşhan\'a yürüyorsun.', etki: git('matbaa', 'matbaa36', (d) => (bayrak(d, 'nerminKorku') === 'istanbul' ? 0 : 1)) },
        { id: 'hastane_git', etiket: 'Hastane: Cemil Bey\'in raporu', kosul: (d) => vakitVar(d) && !bayrak(d, 'gidildi_hastane'), incele: 'Hastaneye yürüyorsun.', etki: git('hastane', 'hastane36', (d) => ({ adli: 2, adsiz: 1, gazete: 1 }[bayrak(d, 'cemilRapor34')] || 0)) },
        { id: 'otel_git', etiket: 'Otel: Vollmer\'le konuş', kosul: (d) => vakitVar(d) && !bayrak(d, 'gidildi_otel'), incele: 'Vollmer\'in oteline yürüyorsun.', etki: git('otel', 'vollmer36', 0) },
      ],
      kisiler: ['neslihan36', 'riza36'],
      gecisler: [],
    },
  },

  kisiler: {
    neslihan36: {
      ad: 'Neslihan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            kozCoktan(d)
              ? 'Neslihan istasyonun önünde. Vollmer\'in elinde babamızın sayfası var, diyor. Ama babam onu çoktan kendi söyledi. Bu bizi koruyor mu, bilmiyorum.'
              : 'Neslihan istasyonun önünde. Vollmer\'in elinde babamızın sayfası var, diyor. Bugün onu oynayacak; ya bize, ya komisyona. Ne yapacağız abi?',
          secenekler: [{ etiket: 'Göreceğiz.' }],
        },
      },
    },
    riza36: {
      ad: 'Rıza Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) => 'Rıza Bey saatine bakıyor. Saat ' + saat(d) + ', diyor. Kanıt: ' + kanitSayisi36(d) + '. Komisyon ' + KANIT_ESIGI + ' ister. Kapıları iyi seç.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
  },
};
