// Yirmi dokuzuncu bölüm: "Melek". Marsilya, 3-4 Mayıs 1924. Neslihan'ın bölümü.
// Kalıbı kır: neredeyse bütün bölüm tek bir konuşma. Melek (Florinalı; 26. bölümde listede, 27'de Neslihan'ın sözü,
// 28'de makbuz defterinde "hâlâ orada") on iki yıldır Madeleine adıyla bir okulda öğretmen. Güveni (melekGuven) yavaş
// kazanılır; acele eden kapıyı kapatır. Gerçek: 1923-24 mübadelesinde Florina'nın Müslümanları Anadolu'ya göçtü.
// Fikri'nin yalanı burada geri döner: sağlık dairesi defterinde kızlar "tifodan öldü" yazıyordu; aileler buna inandı.
// Karşılık verilen iplikler: neslihanYol, ferranteKarar, arifGece (Neslihan'ın hikâyesi), neslihanAd, davidItiraf,
// cocukKarar (Zehra), kardesGecesi. Yeni iplikler: melekKarar, melekTanik, neslihanTavsiye.
import { BOLUM28 } from './bolum28';
import { bayrak, cikarimVar, delilVar, sayi } from '../oyun/motor';

export const GUVEN_ESIGI = 2;
const guvenli = (d) => sayi(d, 'melekGuven') >= GUVEN_ESIGI;

export const BOLUM29 = {
  id: 'bolum29',
  ad: 'Yirmi dokuzuncu bölüm: Melek',
  baslangic: 'acilis',
  ilkMekan: 'liman29',

  deliller: {
    ...BOLUM28.deliller,
    gulce_telgrafi: {
      ad: 'Gülce\'nin telgrafı',
      tarif: 'İstanbul, 1 Mayıs 1924: Florinalı Ayşe Hanım, kızı Melek. Mübadil olarak Ocak\'ta Tekirdağ\'a yerleşmiş; Hükümet Konağı\'nın arkasında bir evde. Nüfus kaydında kızının adının karşısında: 1912, Selanik, tifo, vefat. Gülce.',
    },
    melek_tanikligi: {
      ad: 'Melek\'in anlattıkları',
      tarif: 'Melek: Kasım 1912, Selanik limanı, bir geminin ambarı. On yedi kız. Bir İtalyan her birinin çenesini tutup yüzüne baktı, bir deftere yazdı. Rahel İskenderiye\'de indirildi. Ben Marsilya\'da. Ferrante\'nin yüzünü hâlâ görüyorum.',
    },
  },

  cikarimlar: {
    ...BOLUM28.cikarimlar,
    anne_yasiyor: {
      a: 'makbuz_defteri',
      b: 'gulce_telgrafi',
      ad: 'Tifo',
      metin: 'Ferrante\'nin defterinde Melek hâlâ Marsilya\'da. Tekirdağ\'daki nüfus kaydında ise on iki yıldır ölü: 1912, tifo. Fikri\'nin yalanı. Ayşe Hanım kızının öldüğünü sanıyor; on iki yıldır onun için dua ediyor.',
    },
  },

  olaylar: [
    { id: 'karar', kosul: (d) => cikarimVar(d, 'anne_yasiyor') && guvenli(d) && !!bayrak(d, 'melekKonustu'), etki: { sahne: 'karar29' } },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Yirmi dokuzuncu bölüm bitti.' },
    { kosul: (d) => !bayrak(d, 'neslihanTavsiye'), metin: 'Okula gitmeden önce Neslihan\'la konuş.' },
    { kosul: (d) => !delilVar(d, 'gulce_telgrafi'), metin: 'Telgrafhaneye uğra; Gülce\'den haber var mı?' },
    { kosul: (d) => !guvenli(d), metin: (d) => 'Okulda Melek\'le konuş. Acele etme. Güven: ' + sayi(d, 'melekGuven') + ' / ' + GUVEN_ESIGI + '.' },
    { kosul: (d) => !cikarimVar(d, 'anne_yasiyor'), metin: 'Makbuz defteriyle Gülce\'nin telgrafını birleştir.' },
    { kosul: () => true, metin: 'Melek\'le bir kez daha konuş.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_napoli',
      efekt: ['vapur_duduk'],
      baslik: '3 Mayıs 1924, Marsilya',
      paragraflar: (d) => [
        'Vieux-Port. Balıkçı tekneleri, sabun kokusu, rıhtımda Rumca, İtalyanca, Ermenice, Arapça konuşan hamallar. Bir liman daha; senin bildiğin bütün limanlar gibi ve hiçbiri gibi.',
        {
          yalniz: 'Neslihan üç haftadır burada. Rıhtımda seni bekliyor; zayıflamış, gözleri parlak. Okulu buldum, diyor. Melek orada. Adı Madeleine; çocuklara Fransızca okuma öğretiyor. Onu iki kez uzaktan gördüm. Yanına gidemedim abi. Seni bekledim.',
          birlikte: 'Neslihan vapurdan ilk iniyor. Napoli\'de önümde dur demiştin, diyor gülümseyerek; ben de durdum. Şimdi sıra bende. Okul burada, tepede.',
          bekle: 'Neslihan vapurdan inerken elindeki kâğıdı katlıyor: Melek\'in adı, yazdığı ve yastığının altında taşıdığı kâğıt. On iki yıl, diyor. Ve üç hafta daha. Hadi.',
        }[bayrak(d, 'neslihanYol')] || 'Neslihan yanında.',
        {
          cenevre: 'Cenevre\'den Klara\'nın kısa bir mektubu: dosya komitede; Ferrante\'nin İtalyan avukatları itiraz edecek. Bir tanık lazım, yazmış. Yaşayan bir tanık.',
          polis: 'Napoli\'den kısa bir haber: Ferrante altı gün sonra serbest bırakıldı. Bruno da kayıp.',
          birak: 'Ferrante\'den haber yok. Makbuz defteri Rıza Bey\'in çantasında; her gece başında oturup okuyor.',
        }[bayrak(d, 'ferranteKarar')] || '',
        'Rıza Bey liman kahvesinde kalıyor. Bu iş benim işim değil, diyor. Bir polis bir kapıyı çalarsa kapı kapanır. Siz gidin.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Rıhtıma çık', etki: { mekan: 'liman29', bayrak: { 'gorüldü_liman29': true, ekip_riza: true, ekip_cemil: false, ekip_nermin: false } } }],
    },

    neslihan_hazir: {
      ortam: 'ortam_napoli',
      baslik: 'Ne söyleyeceğim?',
      paragraflar: (d) => [
        'Neslihan iskele babasının üstüne oturuyor. Ona ne söyleyeceğim, abi? diyor. Seni arıyordum mu? Kimse onu aramadı. Seni kurtarmaya geldim mi? On iki yıl kendi kendini kurtarmış.',
        ['kardes', 'nefes'].includes(bayrak(d, 'arifGece')) || ['durust', 'sonra_durust'].includes(bayrak(d, 'kardesGecesi'))
          ? 'Bana Viyana\'yı anlatmıştın, diyorsun; Zürih\'te, göl kıyısında. Hiç kimseye anlatmadığın şeyleri.'
          : 'Neslihan sana Viyana yıllarını hiç anlatmadı. Belki bugün de anlatmayacak.',
        {
          kurye: 'Olympos\'ta bana ilk ne dediğini hatırlıyor musun? Herr Brenner\'in yerine geldim. Bir mektup uzattın. Abim olduğunu iki saat sonra söyledin.',
          hamal: 'Olympos\'ta bana ilk ne dediğini hatırlıyor musun? Ben beklediğiniz hamalım. Bir hamalın yüzüne bakmadım bile; sonra baktım.',
          abi: 'Olympos\'ta bana ilk ne dediğini hatırlıyor musun? Neslihan. Ben Arif. Abin. Üç kelime. Melek\'e de üç kelime mi söylemeliyim?',
        }[bayrak(d, 'yaklasim')] || '',
        bayrak(d, 'cocukKarar') === 'yanina'
          ? 'Zehra\'ya mektup yazdım dün, diyor Neslihan. Annemizin adını taşıyan kıza. Bir gün bana neden bu adı verdin diye sorarsa ona anlatacağım. Melek\'e de öyle mi anlatmalıyım?'
          : '',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Kendi hikâyeni anlat. Onu sorgulamaya değil, yanına oturmaya git.',
          etki: { bayrak: { neslihanTavsiye: 'anlat' }, artir: { neslihanBag: 1 } },
          sonra: 'neslihan_hazir_son',
        },
        {
          etiket: 'Konuşma; dinle. On iki yıldır kimse onu dinlememiştir.',
          etki: { bayrak: { neslihanTavsiye: 'dinle' } },
          sonra: 'neslihan_hazir_son',
        },
        {
          etiket: 'Ben de yanında olacağım. Bir şey olursa ben konuşurum.',
          etki: { bayrak: { neslihanTavsiye: 'ben' } },
          sonra: 'neslihan_hazir_son',
        },
      ],
    },
    neslihan_hazir_son: {
      ortam: 'ortam_napoli',
      baslik: 'Ne söyleyeceğim?',
      paragraflar: (d) => [
        {
          anlat: 'Neslihan başını sallıyor. Yanına oturmak, diyor. Bunu yapabilirim. Rivière bana bunu hiç yapmadı; hep karşıma oturdu.',
          dinle: 'Neslihan bir süre düşünüyor. Dinlemek, diyor. Bana da kimse sormadı on iki yılda. Sorsalar ne derdim, bilmiyorum. Belki o da bilmiyordur.',
          ben: 'Neslihan sana uzun uzun bakıyor. Napoli\'de önüme geçme demiştim, diyor yumuşakça. Ama gel. Kapıda dur. Bir kardeş kapıda durursa insan daha cesur olur.',
        }[bayrak(d, 'neslihanTavsiye')] || '',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'liman29' } }],
    },

    karar29: {
      ortam: 'ortam_kosk_bahce',
      baslik: 'Tifo',
      paragraflar: (d) => [
        'Okulun avlusunda bir çınar. Çocuklar içeride şarkı söylüyor. Neslihan Gülce\'nin telgrafını avucunda tutuyor; buruşturmadan.',
        'Annesi yaşıyor, diyor sana alçak sesle. Tekirdağ\'da. On iki yıldır onu ölü biliyor. Fikri tifo yazdı; annesi de tifoya inandı. Her bayram bir mezar arıyor ki yok.',
        'Melek\'e ne söyleyeceğim abi? Bu senin de kararın. Ben yalnız veremem.',
      ],
      secenekler: [
        {
          etiket: 'Söyle. Annesi yaşıyor ve onu ölü sanıyor. Bunu bilmeye hakkı var.',
          etki: { bayrak: { melekKarar: 'anne' } },
          sonra: 'melek_son',
        },
        {
          etiket: 'Bir zarf. Adresi bir zarfa koy, ver. Açıp açmamak onun kararı; Hafız Efendi\'nin zarfı gibi.',
          etki: { bayrak: { melekKarar: 'zarf' }, artir: { neslihanBag: 1 } },
          sonra: 'melek_son',
        },
        {
          etiket: 'Söyleme. On iki yılda kurduğu hayatı yıkmaya hakkımız yok.',
          etki: { bayrak: { melekKarar: 'sus' } },
          sonra: 'melek_son',
        },
      ],
    },
    melek_son: {
      ortam: 'ortam_kosk_bahce',
      baslik: 'Madeleine',
      paragraflar: (d) => [
        {
          anne: 'Neslihan anlatıyor. Melek bir süre hiç kıpırdamıyor. Sonra çınarın dibine çömeliyor; elleri yüzünde. Annem, diyor; Türkçe. Annem. On iki yıl önce son kez söylediği kelime gibi, paslı. Tekirdağ nerede, diye soruyor sonra. Deniz var mı? Annem denizi hiç görmemişti.',
          zarf: 'Neslihan telgrafı bir zarfa koyuyor, kapatıyor, Melek\'e uzatıyor. İçinde bir adres var, diyor. Kimin adresi olduğunu açınca bileceksin. Açmazsan da bir şey değişmez. Melek zarfı alıyor; uzun uzun bakıyor. Göğsüne bastırıyor. Açmıyor. Henüz.',
          sus: 'Neslihan telgrafı katlıyor; çantasına koyuyor. Melek bir şey sezmiş gibi bakıyor ona; sonra bakışını kaçırıyor. Çocuklar dışarı koşuyor. Madame Madeleine, diye bağırıyorlar. Melek onlara dönüyor. Neslihan da dönüyor; gidiyor.',
        }[bayrak(d, 'melekKarar')] || '',
        bayrak(d, 'ferranteKarar') === 'cenevre'
          ? (guvenli(d) && delilVar(d, 'melek_tanikligi')
            ? 'Melek kalkarken Neslihan\'ın kolunu tutuyor. Cenevre, diyor. O adamın yüzünü görmek istemiyorum. Ama sesimi duysun. Gelirim.'
            : 'Klara\'nın istediği tanık için Melek\'e bir şey sormuyorsunuz. Bugün değil.')
          : '',
        bayrak(d, 'davidItiraf') === false
          ? 'Dönüş yolunda cüzdanındaki kâğıdı çıkarıyorsun: Saltiel\'in kopyası. Neslihan\'a uzatıyorsun. Selanik\'ten beri bende, diyorsun. Neslihan alıyor; okuyor; bir şey söylemiyor. Sonra kâğıdı Melek\'in zarfının yanına, kalbinin üstüne koyuyor.'
          : '',
        'Vieux-Port\'ta akşam. Rıza Bey kahvede, makbuz defterinin başında. On beş ad kaldı, diyor. Neslihan sana bakıyor: On beş kapı.',
        'Yirmi dokuzuncu bölümün sonu.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: (d) => ({ bayrak: { bolumBitti: true, melekTanik: bayrak(d, 'ferranteKarar') === 'cenevre' && guvenli(d) && delilVar(d, 'melek_tanikligi'), davidItiraf: bayrak(d, 'davidItiraf') === false ? 'sonra' : bayrak(d, 'davidItiraf') } }), sonra: 'tifo29' }],
    },
    // Derinleştirme 17. adım: Fikri'nin "tifo" yalanı Neslihan'a annesini düşündürür (6. bölüm Hafız Efendi'nin yarım cümlesi).
    tifo29: {
      ortam: 'ortam_napoli',
      ortamOran: 0.4,
      baslik: 'Tifo',
      paragraflar: [
        'Gece, pansiyonun balkonu. Neslihan elinde Gülce\'nin telgrafıyla oturuyor. Tifo, diyor. Bin dokuz yüz on iki. Fikri bir kızın ölümünü bir kâğıda tifo diye yazdırmış.',
        'Annemiz de tifodan öldü, dediler. Selanik\'te Hafız Efendi anlatmıştı, hatırlıyor musun? Florina\'yı geçmeden ateşlendi, dedi. Bir sabah arabada... Sonra Allah rahmet eylesin. Cümlesini bitirmedi abi. Hiç bitirmedi.',
        'Hafız Efendi geçen kış öldü. O arabada başka kim vardı?',
      ],
      secenekler: [
        {
          etiket: 'Despina Hanım\'a yazalım. Hafız Efendi\'nin evinde oturuyor; evde bir şey kalmıştır.',
          etki: { bayrak: { zehraSoru: 'yaz' }, artir: { neslihanBag: 1 } },
          sonra: 'son',
        },
        {
          etiket: 'Hafız Efendi gördüyse gördü. Bırak, Neslihan. Bunu taşıyamayız.',
          etki: { bayrak: { zehraSoru: 'birak' } },
          sonra: 'son',
        },
        {
          etiket: 'Bilmiyorum. Ama bir binbaşı bir kâğıda tifo yazabiliyorsa, başkası da yazmış olabilir.',
          etki: { bayrak: { zehraSoru: 'suphe' } },
          sonra: 'son',
        },
      ],
    },
    son: {
      ortam: 'ortam_napoli',
      ortamOran: 0.45,
      baslik: 'Yirmi dokuzuncu bölüm bitti',
      paragraflar: ['Kararların kaydedildi.'],
      secenekler: [{ etiket: 'Otuzuncu bölüme geç', sonrakiBolum: 'bolum30' }, { etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    liman29: {
      ad: 'Vieux-Port',
      ortam: 'ortam_napoli',
      tarif: 'Eski liman. Balıkçı tekneleri, ağ kurutan kadınlar. Rıhtımın arkasında telgrafhane; tepede, çınarların arasında manastır okulunun çan kulesi.',
      nesneler: [
        {
          id: 'telgrafhane29',
          etiket: 'Telgrafhane',
          incele: (d) =>
            delilVar(d, 'gulce_telgrafi')
              ? 'Memur başını sallıyor: başka telgraf yok.'
              : 'Memur bir zarf uzatıyor; İstanbul\'dan, Gülce\'den.',
          etki: (d) => (delilVar(d, 'gulce_telgrafi') ? null : { delil: ['gulce_telgrafi'] }),
        },
      ],
      kisiler: ['neslihan29', 'riza29'],
      gecisler: [{ hedef: 'okul29', kosul: (d) => !!bayrak(d, 'neslihanTavsiye'), etiket: 'Tepeye, okula çık' }],
    },
    okul29: {
      ad: 'Okulun avlusu',
      ortam: 'ortam_kosk_bahce',
      tarif: 'Taş duvarlı bir avlu; ortasında yaşlı bir çınar. Pencerelerden çocuk sesleri, Fransızca bir alfabe. Çınarın dibinde bir bank.',
      nesneler: [],
      kisiler: ['melek'],
      gecisler: [{ hedef: 'liman29', etiket: 'Limana in' }],
    },
  },

  kisiler: {
    neslihan29: {
      ad: 'Neslihan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'neslihanTavsiye')
              ? 'Neslihan tepeye, çan kulesine bakıyor. Hadi, diyor. Hadi, Neslihan.'
              : 'Neslihan iskelenin ucunda. Abi, diyor. Gitmeden önce bir şey sormam lazım.',
          secenekler: [
            { etiket: 'Sor.', kosul: (d) => !bayrak(d, 'neslihanTavsiye'), etki: { sahne: 'neslihan_hazir' } },
            { etiket: 'Hadi.', kosul: (d) => !!bayrak(d, 'neslihanTavsiye') },
          ],
        },
      },
    },
    riza29: {
      ad: 'Rıza Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'rizaKorku') === 'yanında'
              ? 'Rıza Bey kahvesini kaldırıyor. İki yaşlı adam, bir koltuk, demiştin, diyor. Ben provasını yapıyorum. Siz gidin; ben buradayım.'
              : 'Rıza Bey makbuz defterinin bir sayfasını çeviriyor. Bu adam her şeyi yazmış, diyor. Bir polisin rüyası. Bir insanın kâbusu.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
    melek: {
      ad: 'Madeleine',
      giris: (d) => (bayrak(d, 'melekKonustu') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: (d) => [
            'Çınarın dibindeki bankta otuzuna yakın bir kadın; kucağında bir yığın defter, kırmızı mürekkeple düzeltiyor. Sizi görünce kalemini bırakıyor.',
            bayrak(d, 'neslihanTavsiye') === 'ben'
              ? 'İki yabancı, diyor Fransızca. Bir kadın ve kapıda duran bir adam. Sonra Neslihan Türkçe bir şey söylüyor; kadının yüzü bembeyaz oluyor.'
              : 'Neslihan yanına oturuyor; bankın öbür ucuna. Türkçe, çok yavaş bir şey söylüyor. Kadının yüzü bembeyaz oluyor.',
            'On iki yıldır bu dili konuşmadım, diyor. Türkçesi bir çocuğun Türkçesi; on beş yaşında kalmış. Kimsiniz?',
            'Güven: ' + sayi(d, 'melekGuven') + ' / ' + GUVEN_ESIGI + '.',
          ],
          secenekler: [
            {
              etiket: 'Neslihan kendi hikâyesini anlatsın.',
              kosul: (d) => !bayrak(d, 'melek_hikaye'),
              etki: (d) => ({ artir: { melekGuven: bayrak(d, 'neslihanTavsiye') === 'anlat' ? 2 : 1 }, bayrak: { melek_hikaye: true } }),
              sonra: 'neslihan_hikaye',
            },
            {
              etiket: 'Florina\'yı sor. Kiraz ağaçlarını, evini.',
              kosul: (d) => !bayrak(d, 'melek_florina'),
              etki: (d) => ({ artir: { melekGuven: bayrak(d, 'neslihanTavsiye') === 'dinle' ? 2 : 1 }, bayrak: { melek_florina: true } }),
              sonra: 'ilk',
              cevap: 'Melek uzun süre susuyor. Sonra anlatıyor: avludaki dut, annesinin yaptığı tarhana, kardeşi Hasan\'ın tahta kılıcı. Kiraz değil, diyor gülümseyerek. Dut. Florina\'da herkes dut sever. Anlatırken Türkçesi açılıyor; kelimeler geri geliyor, birer birer.',
            },
            {
              etiket: 'Listeyi göster. Adın onda yazılı.',
              kosul: (d) => !bayrak(d, 'melek_liste'),
              etki: { artir: { melekGuven: -1 }, bayrak: { melek_liste: true } },
              sonra: 'ilk',
              cevap: 'Melek sayfaya bakıyor; sola yatık harflere. Geri çekiliyor. Kim yazdı bunu, diyor; sesi çatlak. Beni bir kâğıda yazdılar, sonra bir deftere, sonra bir gemiye. Bir kâğıt daha istemiyorum. Kâğıdı kaldırın.',
            },
            {
              etiket: 'Gemiyi anlatır mısın? Ferrante\'yi.',
              kosul: (d) => guvenli(d) && !delilVar(d, 'melek_tanikligi'),
              etki: { delil: ['melek_tanikligi'], bayrak: { melekKonustu: true } },
              sonra: 'sonra',
              cevap: 'Melek gözlerini kapatıyor. Selanik limanı, diyor. Bir ambar. On yedi kız; Rahel benim yanımdaydı, bir ninni söylüyordu. Bir İtalyan geldi; her birimizin çenesini tuttu, yüzümüze baktı, bir deftere yazdı. Rahel İskenderiye\'de indi. Ben burada. Gözlerini açıyor. O adamın yüzünü hâlâ görüyorum. Ama artık uyuyabiliyorum. On iki yıl sürdü.',
            },
            {
              etiket: 'Bugünlük bu kadar. Yarın yine geliriz.',
              kosul: (d) => !guvenli(d),
              etki: { artir: { melekGuven: 1 } },
              cevap: 'Melek başını sallıyor. Yarın, diyor. Yarın da bu banktayım. Her gün bu banktayım.',
            },
          ],
        },
        neslihan_hikaye: {
          soz: (d) => [
            'Neslihan anlatıyor. Manastır, Kasım 1912. Çadırlar. Bir bankerin adamları; okul, yemek, iş. Viyana. Bir kütüphane, dört dil, opera. Ve bir adam ki onu kızı gibi sevdi; bu en kötüsüydü, diyor, çünkü ondan nefret edemedim.',
            ['kardes'].includes(bayrak(d, 'arifGece'))
              ? 'Bunu ilk kez abime anlattım, diyor Melek\'e; bir göl kıyısında, geçen kış. Sen ikincisin.'
              : 'Bunu ilk kez anlatıyorum, diyor Melek\'e. Abime bile anlatmadım. Sen ilksin. Arkanda duruyorsun; bir şey söylemiyorsun.',
            {
              baba: 'Artık İsmail kızı Neslihan diye yazılıyorum. Babam bunu duyunca ağladı.',
              iki: 'İki adla yaşıyorum; ikisini de taşıyorum. Sen de taşıyabilirsin. Melek ve Madeleine.',
              kendi: 'Bir adı kendim seçtim. Kalaycının kızı. Sen de seçebilirsin.',
            }[bayrak(d, 'neslihanAd') || bayrak(d, 'neslihanAdSoyledi') || 'kendi'],
            'Melek ağlıyor; sessizce, defterlerin üstüne. Neslihan defterleri ıslanmasın diye kucağından alıyor.',
          ],
          secenekler: [{ etiket: 'Devam', sonra: 'ilk' }],
        },
        sonra: {
          soz: 'Melek defterlerini topluyor. Yarın da buradayım, diyor. Bir şey söyleyecekseniz, söyleyin. Ben artık kaçmıyorum.',
          secenekler: [{ etiket: 'Yarın.' }],
        },
      },
    },
  },
};
