// Otuz yedinci bölüm: "Taş". İstanbul, 14-15 Kasım 1925. Kişisel bir bölüm; karşıt yok (kural 6).
// Kurgu: İki iz bir günde. Sabah babanın kapısı: kırmızı sayfadaki ad (36. bölüm babaSayfa) ve Manastırlı Hüseyin Efendi,
// oğlu 1912'de o mühürlü sandıklardan çıkan bir tüfekle ölmüş (10. bölüm baba_itirafi). Öğleden sonra Rıza Bey'in Yakup'u:
// Bekirağa'nın eski kayıt defteri, sonra Gureba Mezarlığı'nın kimsesizler sırası (2. bölümde Sabri'nin gömüldüğü yer).
// Rıza'nın imam babasının sorusu (4. bölüm rizaBaba): Bu çocuğa adil olacak mısın?
// Karşılık verilen iplikler: babaSayfa, rizaKorku, rizaBaba, rizaHikaye, rizaSon22, nerminKorku, vollmerIhale, kayikhaneVaris.
// Yeni iplikler: babaYuz, rizaMezar, klaraTelgraf.
import { BOLUM36 } from './bolum36';
import { bayrak, delilVar } from '../oyun/motor';

export const BOLUM37 = {
  id: 'bolum37',
  ad: 'Otuz yedinci bölüm: Taş',
  baslangic: 'acilis',
  ilkMekan: 'kayikhane37',

  deliller: {
    ...BOLUM36.deliller,
    yakup_kaydi: {
      ad: 'Bekirağa defteri',
      tarif: 'Bekirağa Bölüğü\'nün 1900 yılı defteri, sayfa 211: Yakup, Kasımpaşalı fırın çırağı, verem. Defnedildiği yer: Gureba, kimsesizler, on dördüncü sıra. Kenarda soluk bir kurşun kalem notu: Suçu sabit değil. Kimin yazdığı belli değil.',
    },
  },

  cikarimlar: { ...BOLUM36.cikarimlar },

  olaylar: [
    { id: 'aksam', kosul: (d) => !!bayrak(d, 'babaYuz') && !!bayrak(d, 'rizaMezar') && d.mekan === 'kayikhane37', etki: { sahne: 'aksam37' } },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Otuz yedinci bölüm bitti.' },
    { kosul: (d) => !bayrak(d, 'babaYuz'), metin: 'Kalafatçı Hanı\'na, babanın yanına git.' },
    { kosul: (d) => !bayrak(d, 'rizaMezar'), metin: 'Rıza Bey\'le Yakup\'un izini sür.' },
    { kosul: () => true, metin: 'Akşam kayıkhaneye dön.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_kayikhane',
      baslik: '14 Kasım 1925, Karaköy',
      paragraflar: (d) => [
        'Ankara\'dan üç hafta sonra. Kayıkhanede soba yanıyor. ' +
          (bayrak(d, 'nerminKorku') === 'istanbul'
            ? 'Nermin Süleyman\'ın eski masasında; daktilosunun yanında Gülce\'nin defterleri. Kayıkhane bir süredir iki kadının bürosu.'
            : 'Gülce masada; defterler, dosyalar.'),
        {
          ifsa: 'Gazeteler babanın adını yazalı üç hafta oldu. Kalafatçı Hanı\'nın kapısına bir genç muhabir iki kez geldi; Ohannes Usta iki kez kapıyı kapattı.',
          yayimla: 'Babanın adını gazeteler yazalı üç hafta oldu; senin seçtiğin bir satır. Kalafatçı Hanı\'nın kapısına bir genç muhabir iki kez geldi.',
          korundu: 'Gazeteler babanın adını yazmadı. Ama dün hana adsız bir zarf gelmiş; Zürih damgalı. Ohannes Usta zarfı açmadan sana getirdi.',
          coktan: 'Babanın adı Ankara\'da masaya konmadı; o kartı baban iki yıl önce kendisi oynamıştı. Yine de hana bir mektup gelmiş: Manastır\'dan.',
        }[bayrak(d, 'babaSayfa')] || 'Hana bir mektup gelmiş: Manastır\'dan.',
        'Rıza Bey kapıda. Bastonu elinde, şapkası elinde. Bugün bir yere gideceğim, diyor. Yirmi beş yıldır gitmediğim bir yere. Yanımda olur musun?',
        bayrak(d, 'vollmerIhale') === 'red'
          ? 'Ankara\'da Vollmer\'in teklifi reddedildi. Zürih\'te görüşürüz, demişti.'
          : 'Ankara\'da Vollmer imtiyazı aldı. Bir devletin ilk yılları, demişti.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'kayikhane37', bayrak: { ekip_riza: true } } }],
    },

    baba37: {
      ortam: 'ortam_han',
      baslik: 'Babanın odası',
      paragraflar: (d) => [
        'Ocağın üstündeki oda. Baban pencerenin önünde; elinde bir kalay kaşık, parlatıyor, parlatıyor.',
        {
          ifsa: 'Gazete yatağın üstünde, katlanmış. Okudum, diyor; Ohannes okudu. Kanatlı anahtarın kalıbını döken Manastırlı kalaycı. Doğru. Yalan olsaydı daha kolay olurdu.',
          yayimla: 'Gazete yatağın üstünde. Sen istemişsin, diyor; Neslihan yazdı. İyi yapmışsın. Ben sofrada söylemiştim; şimdi bütün İstanbul\'a söyledim. Sesi kırgın değil; yorgun.',
          korundu: 'Zürih damgalı zarf masada; açılmış. İçinde bir fotoğraf: kırmızı sayfa. Benim adım, diyor. Biri beni korumak istemiş; biri de korumanın işe yaramadığını göstermek. Neslihan anlattı; Ankara\'da bir kanıtı benim için geri çekmişsin. Yapmamalıydın.',
          coktan: 'Masada Manastır\'dan gelen mektup. Ben kendi adımı kendim söyledim, diyor. Ama birinin cevabını beklemedim. İşte cevap.',
        }[bayrak(d, 'babaSayfa')] || 'Masada Manastır\'dan gelen bir mektup.',
        'Merdivende ayak sesleri. Ohannes Usta kapıyı aralıyor: Bir ihtiyar, diyor. Manastır\'dan. Adı Hüseyin. Seni soruyor, İsmail.',
        'Kapıda bembeyaz sakallı bir adam; elinde bir baston, bir de sararmış bir fotoğraf: on dokuz yaşında bir delikanlı, asker kaputu içinde. Oğlum, diyor Hüseyin Efendi. Bin dokuz yüz on iki. Kendi tüfeğiyle değil; bir komitacının tüfeğiyle. Sandığın üstünde bir kanat varmış. Gazetede okudum.',
      ],
      secenekler: [
        {
          etiket: 'Babanın yanında dur. Konuşacak olan o; sen yalnızca orada ol.',
          etki: { bayrak: { babaYuz: 'yaninda' } },
          sonra: 'baba37_son',
        },
        {
          etiket: 'Araya gir: Babam o kalıbı bir banka mührü sanarak döktü. Sonra Rivière\'den çaldı; bir daha kullanılmasın diye.',
          etki: { bayrak: { babaYuz: 'savun' } },
          sonra: 'baba37_son',
        },
        {
          etiket: 'İki yaşlı adamı yalnız bırak. Kapıyı çek, merdivende bekle.',
          etki: { bayrak: { babaYuz: 'yalniz' } },
          sonra: 'baba37_son',
        },
      ],
    },
    baba37_son: {
      ortam: 'ortam_han',
      baslik: 'İki ihtiyar',
      paragraflar: (d) => [
        {
          yaninda: 'Baban kaşığı bırakıyor. Hüseyin Efendi\'nin karşısına oturuyor. Benim oğlum da o yıl esir düştü, diyor; döndüğünde evini yanmış buldu. Seninki dönmedi. Bunu terazinin hiçbir kefesine koyamam. Yalnızca söylerim: O kalıbı ben döktüm. Kanat benim. Hüseyin Efendi uzun süre bakıyor. Sonra fotoğrafı babanın avucuna koyuyor. Bunu sen sakla, diyor. Benim bakacak gözüm kalmadı.',
          savun: 'Hüseyin Efendi sana dönüyor. Sen kimsin? Oğlu mu? Sesinde öfke yok. Babanı koruyorsun; iyi. Ben de oğlumu koruyamadım. Baban elini kaldırıyor; seni susturmak için değil, durdurmak için. Haklı, diyor. Bana bir mühür dedirler; ben bir kanat döktüm. Kimin elinde ne olacağını sormadım. Sormamak da bir döküm.',
          yalniz: 'Kapıyı çekiyorsun. Merdivende oturuyorsun; içeriden ses gelmiyor. Bir saat. Sonra bir kaşığın masaya konduğu ses; sonra iki yaşlı adamın birlikte Manastır türküsü mırıldandığı ses, yarım, kırık. Kapı açılıyor; Hüseyin Efendi çıkıyor. Omzuna dokunuyor geçerken. Babanın yanında kal, diyor. Benim kalacak kimsem yok.',
        }[bayrak(d, 'babaYuz')] || '',
        'Neslihan aşağıda, Ohannes Usta\'nın ocağının başında; her şeyi duymuş. Sana bakıyor; bir şey demiyor.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Kayıkhaneye dön', etki: { mekan: 'kayikhane37' } }],
    },

    riza37: {
      ortam: 'ortam_yagmur',
      baslik: 'Gureba, kimsesizler sırası',
      paragraflar: (d) => [
        'Gureba Mezarlığı. Yedi yıl önce Sabri\'yi buraya gömmüştünüz. Kimsesizlerin taşları adsız; yalnızca birer sayı. On dördüncü sıra, Bin Dokuz Yüz.',
        'Rıza Bey bir taşın başında duruyor; çamurda, bastonuna dayanmış. Yirmi beş yıl, diyor. Kasımpaşa\'dan buraya bir saat. Yirmi beş yıl.',
        {
          fark: 'Napoli\'de bana Fikri değilsin demiştin, diyor. Bugün bunu bir taşa söylemek istiyorum.',
          'yanında': 'Bir gün koltukta oturursam yanımda olacağını söylemiştin, diyor. Koltuktan önce bir taş geldi.',
          sus: 'Rıza Bey bir şey söylemiyor; Napoli\'de de söylememişti.',
        }[bayrak(d, 'rizaKorku')] || '',
        bayrak(d, 'rizaBaba') === 'sor'
          ? 'Babam sormuştu, diyor; o gece karakolun kapısında. Bu çocuğa adil olacak mısın, Rıza? Sana anlatmıştım. Cevap vermedim. Şimdi veriyorum: Olmadım.'
          : 'Babam imamdı, diyor. Kasımpaşa\'da. Bir gece karakolun kapısında bekledi. Bana bir şey sordu; ben cevap vermedim. Şimdi bu taşa cevap vermem lazım.',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Babasının duasını okusun. Bir imamın oğlu; bir çırağın başında.',
          etki: { bayrak: { rizaMezar: 'dua' }, artir: { rizaBag: 1 } },
          sonra: 'riza37_son',
        },
        {
          etiket: 'Taşa bir ad yazdıralım. Yakup. Kasımpaşalı. Suçsuzdu.',
          etki: { bayrak: { rizaMezar: 'tas' }, artir: { rizaBag: 1 } },
          sonra: 'riza37_son',
        },
        {
          etiket: 'Bir şey söyleme. Yağmurun altında yanında dur.',
          etki: { bayrak: { rizaMezar: 'sus' } },
          sonra: 'riza37_son',
        },
      ],
    },
    riza37_son: {
      ortam: 'ortam_yagmur',
      baslik: 'Taş',
      paragraflar: (d) => [
        {
          dua: 'Rıza Bey şapkasını çıkarıyor. Yağmur ak saçlarına iniyor. Fatiha\'yı okuyor; babasının sesiyle, Kasımpaşa ağzıyla, yavaş. Bitirince taşa dokunuyor. Babam bunu benden yirmi yedi yıl önce bekledi, diyor. Geç kaldım. Ama geldim.',
          tas: 'Bir taşçı buluyorsunuz; mezarlığın kapısında. Üç gün, diyor. Rıza Bey harfleri kendisi yazıyor, bir kâğıda: Yakup. Kasımpaşalı fırın çırağı. 1881-1900. Suçsuzdu. Taşçı son kelimeye bakıyor; bir şey sormuyor. Rıza Bey parayı veriyor; fazlasını.',
          sus: 'Yağmur. Bir martı. Uzakta Haliç\'te bir vapur düdüğü. Rıza Bey uzun süre duruyor; sonra bastonunu taşın yanına, toprağa saplıyor ve bırakıyor. Kendi bastonunu. Yürüyorsunuz; Rıza Bey ilk kez bastonsuz, senin koluna girerek.',
        }[bayrak(d, 'rizaMezar')] || '',
        bayrak(d, 'mezarSozu')
          ? 'Dönerken üç sıra ötede bir başka taş: Sabri. Yedi yıl önce verdiğin söz; taşın üstünde hâlâ bir kuru gül.'
          : 'Dönerken üç sıra ötede bir başka taş: Sabri. Adı var; Süleyman yazdırmıştı.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'kayikhane37' } }],
    },

    aksam37: {
      ortam: 'ortam_kayikhane',
      ortamOran: 0.5,
      baslik: 'Akşam, kayıkhane',
      paragraflar: (d) => [
        'Akşam. Soba, çay, ıslak paltolar. ' + (bayrak(d, 'rizaMezar') === 'sus' ? 'Rıza Bey bastonsuz; bir sandalyenin kenarına ilişmiş.' : 'Rıza Bey bastonunu kapının yanına dayamış.'),
        bayrak(d, 'babaYuz') === 'yaninda'
          ? 'Neslihan babanın getirdiği bir fotoğrafı masaya koyuyor: asker kaputlu bir delikanlı. Babam bunu saklayacak, diyor. Her sabah bakacakmış.'
          : bayrak(d, 'babaYuz') === 'savun'
            ? 'Neslihan sana bakıyor. Babamı korudun, diyor. Ama babam korunmak istemedi. Bunu ikimiz de öğrendik bugün.'
            : 'Neslihan çayını karıştırıyor. Bir türkü duydum merdivende, diyor. Annem de söylerdi o türküyü.',
        'Kapı çalınıyor. Bir telgraf. Cenevre\'den. ' +
          (bayrak(d, 'vollmerIhale') === 'red'
            ? 'Klara Rainer: VOLLMER OLAĞANÜSTÜ GENEL KURUL 15 OCAK ZÜRİH STOP DEFTERİN SONUNU KARARA BAĞLAYACAK STOP GELİN STOP'
            : 'Klara Rainer: VOLLMER İMTİYAZI TEMİNAT GÖSTERİP ZÜRİH\'TE YENİ KREDİ İSTİYOR STOP 15 OCAK GENEL KURUL STOP GELİN STOP'),
        'Gülce telgrafı okuyor, sonra Nermin. Zürih, diyor Rıza Bey. ' +
          (bayrak(d, 'rizaSon22') === 'emekli' ? 'Emekli bir polis Zürih\'e gitmez. ' : 'Benim yaşımda bir adam Zürih\'e gitmez. ') +
          'Sonra çayını bitiriyor. Ama ben giderim.',
        'Otuz yedinci bölümün sonu.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true, klaraTelgraf: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_kayikhane',
      ortamOran: 0.45,
      baslik: 'Otuz yedinci bölüm bitti',
      paragraflar: ['Kararların kaydedildi. Sırada otuz sekizinci bölüm: Kar.'],
      secenekler: [
        { etiket: '38. bölüme geç', sonrakiBolum: 'bolum38' },
        { etiket: 'Ana menüye dön', anaMenu: true },
      ],
    },
  },

  mekanlar: {
    kayikhane37: {
      ad: 'Kayıkhane',
      ortam: 'ortam_kayikhane',
      tarif: 'Soba, tezgâh, Süleyman\'ın eski masası. Kapıda Rıza Bey bekliyor.',
      nesneler: [],
      kisiler: ['riza37k', 'gulce37'],
      gecisler: [
        { hedef: 'han37', etiket: 'Kalafatçı Hanı\'na, babanın yanına' },
        { hedef: 'arsiv37', etiket: 'Rıza Bey\'le eski Bekirağa defterlerine' },
      ],
    },
    han37: {
      ad: 'Kalafatçı Hanı',
      ortam: 'ortam_han',
      tarif: 'Ohannes Usta\'nın ocağı. Ocağın üstünde babanın odası.',
      nesneler: [
        {
          id: 'oda37',
          etiket: 'Babanın odası',
          kosul: (d) => !bayrak(d, 'babaYuz'),
          incele: 'Kapıyı tıklatıyorsun.',
          etki: { sahne: 'baba37' },
        },
      ],
      kisiler: [],
      gecisler: [{ hedef: 'kayikhane37', etiket: 'Kayıkhaneye dön' }],
    },
    arsiv37: {
      ad: 'Eski kayıtlar',
      ortam: 'ortam_arsiv',
      tarif: 'Sultanahmet\'te, eski bir hapishanenin bodrumunda kayıt defterleri; rutubet ve fare kokusu. Yaşlı bir memur fener tutuyor.',
      nesneler: [
        {
          id: 'defter37',
          etiket: '1900 yılı defteri',
          incele: (d) =>
            delilVar(d, 'yakup_kaydi')
              ? 'Sayfa 211. Rıza Bey kurşun kalem notuna bir kez daha bakıyor: Suçu sabit değil. Bunu ben yazmışım, diyor. Unutmuşum. Bir kalemle yazmışım; bir sopayla silmişim.'
              : 'Rıza Bey sayfaları çeviriyor; parmakları titremiyor, bu daha kötü. Sayfa 211. Yakup. Verem. Gureba, kimsesizler, on dördüncü sıra.',
          etki: (d) => (delilVar(d, 'yakup_kaydi') ? null : { delil: ['yakup_kaydi'] }),
        },
      ],
      kisiler: [],
      gecisler: [
        { hedef: 'gureba37', etiket: 'Gureba Mezarlığı\'na', kosul: (d) => delilVar(d, 'yakup_kaydi') },
        { hedef: 'kayikhane37', etiket: 'Kayıkhaneye dön' },
      ],
    },
    gureba37: {
      ad: 'Gureba Mezarlığı',
      ortam: 'ortam_yagmur',
      tarif: 'Yağmur. Adsız taşlar, sayılar. On dördüncü sıra.',
      nesneler: [
        {
          id: 'mezar37',
          etiket: 'On dördüncü sıradaki taş',
          kosul: (d) => !bayrak(d, 'rizaMezar'),
          incele: 'Rıza Bey önden yürüyor.',
          etki: { sahne: 'riza37' },
        },
      ],
      kisiler: [],
      gecisler: [{ hedef: 'kayikhane37', etiket: 'Kayıkhaneye dön' }],
    },
  },

  kisiler: {
    riza37k: {
      ad: 'Rıza Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'rizaMezar')
              ? 'Rıza Bey sobanın başında. Bir taş, diyor. Yirmi yedi yılın sonunda bir taş. Az mı, çok mu, bilmiyorum.'
              : bayrak(d, 'rizaHikaye')
                ? 'Rıza Bey şapkasını evirip çeviriyor. Yakup, diyor. Sana anlatmıştım. Nereye gömüldüğünü hiç sormadım. Bugün soracağım.'
                : 'Rıza Bey şapkasını evirip çeviriyor. Bir çocuk, diyor. Yirmi beş yıl önce öldü; benim yüzümden. Nereye gömüldüğünü bilmiyorum. Bugün öğreneceğim.',
          secenekler: [{ etiket: 'Seninleyim Rıza Bey.' }],
        },
      },
    },
    gulce37: {
      ad: 'Gülce',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'kayikhaneVaris') === 'hepimiz'
              ? 'Gülce kapıdaki levhaya bakıyor. Kim kaybolduysa, buradan aranır, diyor. Rıza Bey\'in kaybettiği biri de sayılır mı? Sayılır.'
              : 'Gülce defterini kapatıyor. Bugün kimse gelmedi, diyor. Belki bugün biz gideriz.',
          secenekler: [{ etiket: 'Gidiyoruz.' }],
        },
      },
    },
  },
};
