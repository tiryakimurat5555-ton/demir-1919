// Kırk birinci bölüm: "İskele Taşı". Selanik, 3-6 Mayıs 1926.
// Zehra Hanım'ın izi (29 → 38 → 39 → 40): Şubat 1913'te Florina hastanesinden çıktı, baharda Selanik iskelesinde kızını
// sordu, Bruno "tifo" dedi. Bu bölümde iz Florina'ya geri döner: hastanede ona bakan Florinalı Ayşe Hanım (Melek'in annesi,
// 29. bölüm; o da kızının "tifodan" öldüğünü sanıyordu). 1924 mübadelesinde ikisi aynı hanede Tekirdağ'a gitti.
// Arka plan (gerçek): Karma Mübadele Komisyonu'nun Selanik bürosu; 1924'te Müslüman nüfus Selanik'ten ayrılmış, şehir değişmiş.
// Kalıbı kır: tanık zinciri. Her tanığa doğru soruyu sormak gerekir; yanlış soru zaman yer (zaman41), vapuru kaçırırsın.
// Karşılık verilen iplikler: zehraIz, brunoSon40, geceBolunme, nazliIceri, melekKarar (ve Ferrante'nin ifadesi).
// Yeni iplikler: iskeleSecim, saltielBruno, yolculuk41, rosario41.
import { BOLUM40 } from './bolum40';
import { bayrak, cikarimVar, delilVar, sayi } from '../oyun/motor';

export const VAPUR_SINIRI = 2; // zaman41 bu sayıdan küçükse perşembe vapuruna yetişirsin
const nazliKayip = (d) => bayrak(d, 'geceBolunme') === 'ferrante' && bayrak(d, 'nazliIceri') === 'evet';
const rizaVar = (d) => !!bayrak(d, 'ekip_riza') && !nazliKayip(d);
const cemilVar = (d) => !bayrak(d, 'ekip_riza') && !nazliKayip(d);
const yanlis = { artir: { zaman41: 1 } };

export const BOLUM41 = {
  id: 'bolum41',
  ad: 'Kırk birinci bölüm: İskele Taşı',
  baslangic: 'acilis',
  ilkMekan: 'selanik41',

  deliller: {
    ...BOLUM40.deliller,
    goc_defteri: {
      ad: 'Hafız Efendi\'nin göç defteri',
      tarif: 'Tavan arasından çıkan, nemden kabarmış bir defter. 1912 kışı, Florina: Zehra Hanım ateşler içinde hastane arabasına verildi. Yanında bir kadın: Florinalı Ayşe, hastanenin çamaşırcısı. Kızı Ekim\'de kaybolmuş. Zehra\'ya ben bakarım dedi.',
    },
    rebeka_tanik: {
      ad: 'Rebeka Hanım\'ın hatırladıkları',
      tarif: '1913 baharı, Talmud Tora\'nın avlusunda çorba kuyruğu. Manastırlı, zayıf bir kadın; kucağındaki başkasının bebeğine Dandini dastana söylüyordu. İskeleden gelmişti; konuşmuyordu. Ertesi gün dedi ki: Florina\'ya dönüyorum. Orada bir kadın var; onun da kızı tifodan ölmüş.',
    },
    mubadele_kaydi: {
      ad: 'Mübadele komisyonunun listesi',
      tarif: 'Karma Mübadele Komisyonu, Florina kazası, Aralık 1923. Hane 214: Ayşe, Florina doğumlu, dul. Hanesinde: Zehra, Manastır doğumlu, akrabası değil, "kız kardeşi" diye yazdırılmış. Gönderildikleri yer: Tekirdağ.',
    },
  },

  cikarimlar: {
    ...BOLUM40.cikarimlar,
    tekirdag: {
      a: 'rebeka_tanik',
      b: 'mubadele_kaydi',
      ad: 'İki anne',
      metin: 'Zehra Hanım iskeleden Florina\'ya döndü; onu hastanede bakan Ayşe Hanım\'ın yanına. İkisinin de kızına tifo denmişti. On bir yıl aynı evde; 1924\'te aynı vapurla Tekirdağ\'a. Melek\'in annesi ile senin annen. Aynı evde.',
    },
  },

  olaylar: [{ id: 'iskele', kosul: (d) => cikarimVar(d, 'tekirdag'), etki: { sahne: 'iskele41' } }],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Kırk birinci bölüm bitti.' },
    {
      kosul: () => true,
      metin: (d) =>
        'Zehra Hanım\'ın izi. Tanıklara doğru soruyu sor. ' +
        (sayi(d, 'zaman41') < VAPUR_SINIRI ? 'Perşembe vapuruna yetişebilirsin.' : 'Perşembe vapuru kaçtı; kara yolu uzun.'),
    },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_yanik_sehir',
      baslik: '3 Mayıs 1926, Selanik',
      paragraflar: (d) => [
        'Selanik. İki yıl önce mübadele bu rıhtımı boşaltmıştı; şimdi rıhtımda başka diller. Minarelerin bazısı yıkılmış, bazısının şerefesinde güvercinler. Yeni gelenler eski evlerde oturuyor; eski oturanlar başka bir denizin kıyısında.',
        'Neslihan iskeleye bakıyor. Bir yerde bir taş var, diyor. Annem oturdu, sonra kalktı. Hangi taş?',
        {
          taburcu_iskele: 'Elinizde iki parça var: Florina hastanesinin defteri, Şubat 1913, yürüyerek çıktı; Ferrante\'nin sözü, bahar 1913, bu iskele. Arası boş.',
          iskele: 'Elinizde Ferrante\'nin sözü var: bahar 1913, bu iskele, tifo. Florina\'yı bilmiyorsunuz; Despina Hanım\'a uğramak gerek.',
        }[bayrak(d, 'zehraIz')] || 'Elinizde bir söz var: bahar 1913, bu iskele.',
        nazliKayip(d)
          ? (bayrak(d, 'ekip_riza') ? 'Rıza Bey' : 'Cemil Bey') + ' Buenos Aires\'te kaldı. Nazlı Rosario\'da bir yerde; Ben bulmadan dönmem, demişti. Vapurdan her limanda telgraf çektin; cevap yok.'
          : bayrak(d, 'nazliIceri') === 'evet' || ['anlat', 'arif'].includes(bayrak(d, 'neslihanNazli'))
            ? 'Nazlı Cenova\'da sizden ayrıldı; İstanbul vapuruna bindi, annesine. Rıhtımda Neslihan\'ın elini bırakmadan önce bir şey söyledi: Ben de sizin gibi birini arayacağım bir gün.'
            : '',
        rizaVar(d) ? 'Rıza Bey yanında; bastonuyla kaldırım taşlarını sayıyor. Tanık zinciri, diyor. Bir halkayı yanlış sorarsan zincir kopar.' : '',
        cemilVar(d) ? 'Cemil Bey yanında. Bu şehirde doğmadım, diyor; ama burada büyüdüm. Selanik\'te bir soru yanlış sorulursa cevap üç gün gecikir.' : '',
        'Perşembe günü İstanbul\'a bir vapur var. Ondan sonrakine on gün.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'selanik41', bayrak: { 'gorüldü_selanik41': true } } }],
    },

    iskele41: {
      ortam: 'ortam_rihtim',
      efekt: ['vapur_duduk'],
      baslik: 'İskele taşı',
      paragraflar: (d) => [
        'Akşamüstü. İskelenin en eski bölümü; yeni betonun bitip eski taşın başladığı yer. Neslihan bir taşın önünde duruyor; ötekilerden farkı yok. Belki bu, diyor. Belki değil. Oturuyor.',
        'Rüzgâr. Martılar. Bir balıkçı ağ topluyor; Rumca bir şarkı.',
        {
          ozur: 'Buenos Aires\'te yanımda olmalıydım demiştin, diyor Neslihan. Burada oldun. Bu yeter.',
          onun: 'Buenos Aires\'te bunu sen duymalıydın demiştin, diyor Neslihan. Ferrante\'yi yalnız duydum. Bu taşı da yalnız mı duymalıyım?',
        }[bayrak(d, 'bolunmeCevap')] || 'Neslihan avuçlarını taşa koyuyor; sıcak.',
        'Annem burada oturdu, diyor. Bir adam ona kızın öldü dedi. Sonra kalktı, yürüdü, Florina\'ya döndü; ona bakan kadının yanına. On bir yıl. Ben Viyana\'da operadaydım, abi.',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Yanına otur. Bir şey söyleme.',
          etki: { bayrak: { iskeleSecim: 'otur' }, artir: { neslihanBag: 1 } },
          sonra: 'iskele41_son',
        },
        {
          etiket: 'O bahar neredeydin, onu söyle: esir kampında; kırk kilometre ötede.',
          etki: (d) => ({ bayrak: { iskeleSecim: 'anlat' }, artir: { travma: sayi(d, 'travma') > 0 ? -1 : 0 } }),
          sonra: 'iskele41_son',
        },
        {
          etiket: 'Bruno\'nun sözünü söyle: Annesi de böyle kaçmıştı.',
          kosul: (d) => bayrak(d, 'brunoSon40') === 'kacti',
          etki: { bayrak: { iskeleSecim: 'bruno' } },
          sonra: 'iskele41_son',
        },
      ],
    },
    iskele41_son: {
      ortam: 'ortam_rihtim',
      baslik: 'İskele taşı',
      paragraflar: (d) => [
        {
          otur: 'Yanına oturuyorsun. Taş ikinizi de alıyor. Bir süre sonra Neslihan başını omzuna yaslıyor; Manastır\'daki gibi. Güneş batana kadar kimse konuşmuyor. Kalktığınızda ikinizin de dizleri tutulmuş.',
          anlat: 'Anlatıyorsun. Bin dokuz yüz on üç baharı: dikenli tel, bir kamp, kuru ekmek, her sabah sayım. Kırk kilometre. Annem buradaydı, diyorsun; ben oradaydım. Neslihan elini tutuyor. İkimiz de bir yerdeydik abi, diyor. Hiçbirimiz onun yanında değildik. Ama o yürüdü.',
          bruno: 'Söylüyorsun. Neslihan uzun süre denize bakıyor. Kaçmadı, diyor sonunda. Kaçmak başka bir şey. O döndü; onu bekleyen tek kapıya. Bruno bunu bilemez; onu kimse beklemedi.',
        }[bayrak(d, 'iskeleSecim')] || '',
        delilVar(d, 'goc_defteri')
          ? 'Hafız Efendi\'nin defteri Neslihan\'ın çantasında. Zehra\'ya ben bakarım dedi. Bir kadının bir kadına sözü.'
          : '',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', sonra: 'son41' }],
    },
    son41: {
      ortam: 'ortam_rihtim',
      baslik: 'Rıhtım',
      paragraflar: (d) => [
        sayi(d, 'zaman41') < VAPUR_SINIRI
          ? 'Perşembe. İstanbul vapuru rıhtımda; bacası tütüyor. Biletler cebinde. Tekirdağ\'a İstanbul\'dan bir günlük yol.'
          : 'Perşembe vapuru sabah kalktı; soruların uzun sürdü. Kara yoluna çıkıyorsunuz: Drama, Dedeağaç, Edirne, Tekirdağ. On gün.',
        {
          anne: 'Pansiyonda bir mektup bekliyor; Gülce yollamış, Tekirdağ damgalı bir zarfın içinde. Melek yazmış; Türkçesi yeni, eğri. Annemin yanındayım, diyor. Annemle bir kadın daha yaşıyor; Manastırlı, Zehra teyze. Geceleri bir ninni söylüyor: Dandini dastana. Sizin ninniniz. Ona sizi anlatmadım. Siz gelin.',
          zarf: 'Pansiyonda Gülce\'nin telgrafı: Marsilya\'dan bir mektup gelmiş, Melek\'ten. Zarfı açmış, diyor; adresi okumuş. Tekirdağ\'a gitmeyi düşünüyor. Melek henüz gitmedi.',
          sus: 'Melek\'e hiçbir şey söylememiştiniz, Marsilya\'da. Annesinin Tekirdağ\'da yaşadığını bilmiyor. Şimdi o evde iki anne var; ikisi de kızlarını ölü sanıyor.',
        }[bayrak(d, 'melekKarar')] || 'Tekirdağ. Hükümet Konağı\'nın arkasında bir ev.',
        'Neslihan biletleri, mektupları, Hafız Efendi\'nin defterini bir mendile sarıyor. On dört yıl, diyor. Bir haftaya daha dayanırım.',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Devam',
          etki: (d) => ({ bayrak: { bolumBitti: true, yolculuk41: sayi(d, 'zaman41') < VAPUR_SINIRI ? 'vapur' : 'kara', rosario41: nazliKayip(d) } }),
          sonra: 'son',
        },
      ],
    },
    son: {
      ortam: 'ortam_rihtim',
      ortamOran: 0.45,
      baslik: 'Kırk birinci bölüm bitti',
      paragraflar: ['Kararların kaydedildi. Yedinci kitap sürüyor: Tekirdağ.'],
      secenekler: [{ etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    selanik41: {
      ad: 'Selanik',
      ortam: 'ortam_yanik_sehir',
      tarif: (d) =>
        'Kalamarya\'da Rebeka Hanım\'ın evi, eski mahallede Hafız Efendi\'nin evi (şimdi Despina\'nın), Beyaz Kule\'nin yakınında Karma Mübadele Komisyonu\'nun bürosu. ' +
        (sayi(d, 'zaman41') < VAPUR_SINIRI ? 'Perşembeye zaman var.' : 'Perşembe vapuru kaçtı.'),
      nesneler: [],
      kisiler: ['despina41', 'rebeka41', 'saltiel41', 'katip41', 'neslihan41', 'riza41', 'cemil41'],
      gecisler: [],
    },
  },

  kisiler: {
    despina41: {
      ad: 'Despina Hanım (Hafız Efendi\'nin eski evi)',
      giris: (d) => (delilVar(d, 'goc_defteri') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Despina kapıyı açıyor; bebek artık yürüyor, eteğine tutunuyor. Mektubumu aldınız mı, diyor; Kapadokya ağzıyla. Tavan arasında bir sandık vardı; Hafız Efendi\'nin. Ne sormak istiyorsunuz?',
          secenekler: [
            {
              etiket: 'Hafız Efendi\'nin defterinde Zehra\'nın yanında kim vardı?',
              etki: { delil: ['goc_defteri'] },
              sonra: 'sonra',
              cevap: 'Despina defteri getiriyor; parmağıyla bir satırı gösteriyor. Florinalı Ayşe, diyor; hastanenin çamaşırcısı. Kızı kaybolmuş. Zehra\'ya ben bakarım demiş. Bir kadın bir kadına.',
            },
            {
              etiket: 'Zehra Hanım bu eve hiç geldi mi?',
              etki: yanlis,
              sonra: 'ilk',
              cevap: 'Despina başını sallıyor. Ben iki yıl önce geldim, diyor. Bu evin eski hikâyelerini bilmem; yalnızca sandığını. Bir gün geçti.',
            },
            {
              etiket: 'Hafız Efendi neden cümlesini bitirmedi?',
              etki: yanlis,
              sonra: 'ilk',
              cevap: 'Despina bir süre düşünüyor. Benim babam da Niğde\'den çıkarken bir şey demedi, diyor. Bazı cümleler yolda kalır. Bir gün geçti.',
            },
          ],
        },
        sonra: {
          soz: 'Despina bebeği kucağına alıyor. Bulursanız selamımı söyleyin, diyor. Bu evin eski sahiplerine; hepsine.',
          secenekler: [{ etiket: 'Söylerim.' }],
        },
      },
    },
    rebeka41: {
      ad: 'Rebeka Hanım',
      giris: (d) => (delilVar(d, 'rebeka_tanik') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Rebeka Hanım yaşlanmış; ama kahvesi aynı. 1913 baharı, diyor. O bahar Talmud Tora\'nın avlusunda çorba dağıttım; her gün yüz kadın. Hepsi Manastırlı, hepsi zayıf, hepsi bir çocuk arıyordu. Hangisi sizin anneniz?',
          secenekler: [
            {
              etiket: 'Neslihan ninniyi söylesin. Annemizin ninnisini.',
              etki: { delil: ['rebeka_tanik'], artir: { neslihanBag: 1 } },
              sonra: 'sonra',
              cevap: 'Neslihan sesini alçaltıyor: Dandini dandini dastana. Rebeka Hanım\'ın fincanı havada kalıyor. Bu, diyor. Bunu söyleyen biri vardı. Kucağındaki başkasının bebeğine. İskeleden gelmişti, konuşmuyordu. Ertesi gün dedi ki: Florina\'ya dönüyorum. Orada bir kadın var; onun da kızı tifodan ölmüş.',
            },
            {
              etiket: 'Uzun boylu, kara gözlü; ellerinde kalay yanığı.',
              etki: yanlis,
              sonra: 'ilk',
              cevap: 'Rebeka Hanım üzgün bir gülümsemeyle bakıyor. O bahar yüz kadının yüzü vardı, diyor. Hepsinin elleri yanıktı; yoldan, soğuktan. Bir gün geçti.',
            },
            {
              etiket: 'Adı Zehra. Zehra Hanım.',
              etki: yanlis,
              sonra: 'ilk',
              cevap: 'Rebeka Hanım başını iki yana sallıyor. Adlarını sormadık, diyor; çorba sorardı mı? Bir gün geçti.',
            },
          ],
        },
        sonra: {
          soz: 'Rebeka Hanım Neslihan\'ın elini tutuyor. O ninniyi söyleyen kadın, diyor, bebeği bırakırken bebek ağladı. Kadın ağlamadı. Ben ağladım.',
          secenekler: [{ etiket: 'Teşekkür ederim.' }],
        },
      },
    },
    saltiel41: {
      ad: 'Saltiel',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            delilVar(d, 'ferrante_itirafi')
              ? 'Saltiel Rebeka\'nın verandasında; tütün kokusu. Ferrante\'nin ifadesini getirdiğinizi duydum, diyor. Kardeşimin adı orada mı?'
              : 'Saltiel Rebeka\'nın verandasında; tütün kokusu. Buenos Aires\'te Ferrante öldü, dediler. Kardeşimin katilini söyledi mi?',
          secenekler: [
            {
              etiket: 'İfadeyi ona ver. Oku; David\'in adı üçüncü sayfada.',
              kosul: (d) => delilVar(d, 'ferrante_itirafi') && !bayrak(d, 'saltielBruno'),
              sonra: 'david',
            },
            {
              etiket: 'İfade imzalanmadı. Ama Ferrante bir ad söyledi: Bruno.',
              kosul: (d) => !delilVar(d, 'ferrante_itirafi') && !bayrak(d, 'saltielBruno'),
              etki: { bayrak: { saltielBruno: 'ad' } },
              cevap: 'Saltiel başını sallıyor. Bir ad, diyor. On dört yıl bir ad bekledim. Kâğıdı yoksa bir ad da yeter; ben onu ölene kadar söylerim.',
            },
            { etiket: 'Sonra konuşalım.' },
          ],
        },
        david: {
          soz: 'Saltiel okuyor; dudakları kıpırdıyor. Kasım 1912, diyor. Gümrük kâtibi D. S. mührü basmadı. Bruno halletti. Halletti. Kardeşimin adı bir fiil olmuş. Bu kâğıdı ne yapayım, Arif?',
          secenekler: [
            {
              etiket: 'Klara\'ya gönder. Buenos Aires\'te bir dava açılsın; David\'in adıyla.',
              etki: { bayrak: { saltielBruno: 'dava' } },
              cevap: 'Saltiel kâğıdı katlıyor, ceketinin iç cebine koyuyor. Bir davada kardeşimin adı okunsun, diyor. Bir kez. Bir mahkemede. Yeter.',
            },
            {
              etiket: 'Sakla. Bruno\'yu biz bulacağız; kâğıt sonra.',
              etki: { bayrak: { saltielBruno: 'sakla' } },
              cevap: 'Saltiel kâğıdı geri veriyor. Sizde kalsın, diyor. Ben on dört yıl bir kâğıt sakladım; yetti.',
            },
          ],
        },
      },
    },
    katip41: {
      ad: 'Mübadele komisyonunun kâtibi',
      giris: (d) => (delilVar(d, 'mubadele_kaydi') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Beyaz Kule\'nin yanındaki büroda, tozlu raflar arasında genç bir Rum kâtip; Fransızca konuşuyor. Florina kazası, diyor; yirmi bin hane. Bir adla, bir köyle ararız. Hangi adla?',
          secenekler: [
            {
              etiket: 'Ayşe. Florina doğumlu, dul; hastanenin çamaşırcısı.',
              kosul: (d) => delilVar(d, 'goc_defteri'),
              etki: { delil: ['mubadele_kaydi'] },
              sonra: 'sonra',
              cevap: 'Kâtip bir defter indiriyor, sayfaları çeviriyor. Hane iki yüz on dört, diyor. Ayşe, Florina. Hanesinde: Zehra, Manastır doğumlu. Akrabası değil; kız kardeşi diye yazdırmış. Tekirdağ\'a gönderilmişler, Aralık 1923. Kâtip başını kaldırıyor. Bu kadını mı arıyordunuz? Neslihan cevap veremiyor.',
            },
            {
              etiket: 'Zehra. Manastır doğumlu.',
              etki: yanlis,
              sonra: 'ilk',
              cevap: 'Kâtip omuz silkiyor. Manastır artık bizim değil, diyor; onların listeleri Belgrad\'da. Florina\'da Zehra adında üç yüz kadın var. Bir gün geçti.',
            },
            {
              etiket: 'Kalaycı İsmail Usta\'nın karısı.',
              etki: yanlis,
              sonra: 'ilk',
              cevap: 'Kâtip kalemini bırakıyor. Listelerde meslek yok, diyor; yalnızca adlar. Kocası yanında değilse, kocasının adı da yok. Bir gün geçti.',
            },
          ],
        },
        sonra: {
          soz: 'Kâtip listenin bir kopyasını mühürlüyor. Annem de Kapadokya\'dan geldi, diyor. Birini bulursanız, bana da haber verin. Bu büroda kimse kimseyi bulmaz.',
          secenekler: [{ etiket: 'Veririm.' }],
        },
      },
    },
    neslihan41: {
      ad: 'Neslihan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            cikarimVar(d, 'tekirdag')
              ? 'Neslihan hiçbir şey söylemiyor. Yalnızca iskeleye doğru yürüyor.'
              : delilVar(d, 'goc_defteri')
                ? 'Neslihan Hafız Efendi\'nin defterini okşuyor. Ayşe, diyor. Melek\'in annesinin adı da Ayşe, abi. Florinalı.'
                : 'Neslihan sokakta duraklıyor. Despina\'ya git abi, diyor. Hafız Efendi\'nin sandığı orada.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
    riza41: {
      ad: 'Rıza Bey',
      kosul: (d) => rizaVar(d),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Rıza Bey bastonuyla yere üç çizgi çiziyor. Bir defter, bir hatıra, bir liste, diyor. Defter bir ad verir; hatıra bir yön; liste bir kapı. Sırayla sor.',
          secenekler: [{ etiket: 'Sırayla.' }],
        },
      },
    },
    cemil41: {
      ad: 'Cemil Bey',
      kosul: (d) => cemilVar(d),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Cemil Bey Beyaz Kule\'ye bakıyor. 1912\'de buradan kaç cenaze geçti, sayamazdım, diyor. Şimdi bir canlıyı arıyoruz. Tuhaf; elim titriyor.',
          secenekler: [{ etiket: 'Benimki de.' }],
        },
      },
    },
  },
};
