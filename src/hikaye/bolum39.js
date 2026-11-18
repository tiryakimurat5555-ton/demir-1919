// Otuz dokuzuncu bölüm: "Ekvator". Stella del Plata vapuru, Cenova → Buenos Aires, 3-22 Mart 1926. Yedinci kitabın açılışı.
// Kurgu: Stella del Plata (kurgu vapur), Società Atlantica di Collocamento (kurgu "iş bulma" ajansı), Signor Testa (kurgu).
// Arka plan (gerçek): 1920'lerde Akdeniz limanlarından La Plata'ya büyük göç; vapurlarda Ekvator geçişinde Neptün töreni.
// Asıl karşıt Bruno (28., 30., 38. bölüm; kural 4): Buenos Aires'te bekliyor. Testa onun gemideki adamı; on bir genç kadını
// "hizmetçi" sözleşmesiyle taşıyor. Ajans hiçbir din ya da toplulukla özdeşleşmez; kızlar dört ayrı limandan.
// Kalıbı kır: yolculuk. Üç gün (GUN_SAYISI), dört yer; her gün yalnız birine gidilir.
// Karşılık verilen iplikler: rizaKar (Rıza gemide mi), zehraSoru (Zehra Hanım), neslihanRahel, kasa38, buenosAires,
// brunoSonu, cemilEleni.
// Yeni iplikler: testaKarar, neslihanNazli, rizaEkvator / cemilEkvator, zehraTelgraf.
import { BOLUM38 } from './bolum38';
import { bayrak, cikarimVar, delilVar, sayi } from '../oyun/motor';

export const GUN_SAYISI = 3;

const rizaGemide = (d) => bayrak(d, 'rizaKar') === 'yol';
const gunKaldi = (d) => sayi(d, 'gun39') < GUN_SAYISI;
const gunBitti = { artir: { gun39: 1 } };
const GUNLER = ['5 Mart, Cebelitarık', '12 Mart, Ekvator', '19 Mart, açık deniz'];

export const BOLUM39 = {
  id: 'bolum39',
  ad: 'Otuz dokuzuncu bölüm: Ekvator',
  baslangic: 'acilis',
  ilkMekan: 'vapur39',

  deliller: {
    ...BOLUM38.deliller,
    sozlesme: {
      ad: 'Nazlı\'nın sözleşmesi',
      tarif: 'Società Atlantica di Collocamento. İtalyanca, altında Türkçe bir özet. Buenos Aires\'te "iyi bir ailenin yanında hizmetçilik", iki yıl. Yol parası ajanstan; borç olarak. Borç ödenmeden iş bırakılamaz. İmza yerinde bir parmak izi.',
    },
    yolcu_listesi: {
      ad: 'Üçüncü mevki yolcu listesi',
      tarif: 'Kâtibin defterinden: on bir genç kadın, on altı ile yirmi yaş arası. Dördü İstanbul\'dan, üçü Pire\'den, ikisi Napoli\'den, ikisi Marsilya\'dan. Hepsinin yanında aynı not: S. A. C., hizmetçi. Hepsinin yol parasını aynı kişi ödemiş: G. Testa.',
    },
    testa_defteri: {
      ad: 'Testa\'nın cep defteri',
      tarif: 'Kart masasında açık kalan küçük bir defter. On bir ad, yanlarında rakamlar: boy, yaş, "Türkçe", "Rumca". Son sayfada bir adres: Calle Junín, Buenos Aires. Altında tek harf: B.',
    },
    telsiz_kaydi: {
      ad: 'Telsiz kaydı',
      tarif: 'Marconi odasının defterinden: G. Testa\'nın her üç günde bir gönderdiği telgraf. Alıcı: B., Calle Junín. Hep aynı metin: Mal sağlam. Son telgraf farklı: Üç yolcu soru soruyor. Biri yaşlı bir kadın değil; bir kız kardeş.',
    },
  },

  cikarimlar: {
    ...BOLUM38.cikarimlar,
    on_bir_kiz: {
      a: 'sozlesme',
      b: 'yolcu_listesi',
      ad: 'On bir kız',
      metin: 'Nazlı tek değil. On bir kız, dört liman, tek bir ajans, tek bir ödeyen. Borç sözleşmesi; iş bırakılamaz. Bir iskele daha; bu kez okyanusun öbür yakasında.',
    },
    bruno_bekliyor: {
      a: 'testa_defteri',
      b: 'telsiz_kaydi',
      ad: 'Calle Junín',
      metin: 'Testa bir tüccar değil; bir kurye. Defterdeki adres ile telgrafın alıcısı aynı: B., Calle Junín. Bruno bekliyor. Ve artık sizi de bekliyor: bir kız kardeş.',
    },
  },

  olaylar: [
    { id: 'ekvator', kosul: (d) => sayi(d, 'gun39') >= 1, etki: { sahne: 'ekvator39' } },
    { id: 'nazli', kosul: (d) => sayi(d, 'gun39') >= 2, etki: { sahne: 'neslihan39' } },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Otuz dokuzuncu bölüm bitti.' },
    {
      kosul: (d) => gunKaldi(d),
      metin: (d) => 'La Plata\'ya ' + (GUN_SAYISI - sayi(d, 'gun39')) + ' gün. Her gün gemide bir yere gidebilirsin.',
    },
    { kosul: () => true, metin: 'La Plata ağzı. Delilleri soruşturma panosunda bağla; sonra güverteye çık.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_guverte',
      efekt: ['vapur_duduk'],
      baslik: '3 Mart 1926, Cenova',
      paragraflar: (d) => [
        'Stella del Plata Cenova\'dan kalkıyor. Üç bacalı, iki bin yolcu; çoğu üçüncü mevkide, ambarın üstündeki koğuşlarda. İtalyanca, Rumca, Türkçe, İspanyolca; bavullar, sepetler, bir keman. Buenos Aires\'e on dokuz gün.',
        {
          kurtar: 'Vollmer\'in yanık defteri bavulunun dibinde. Son sayfalarda her yıl aynı satır: Buenos Aires, F. ve B.',
          sayfa: 'Neslihan\'ın çantasında Vollmer\'in kendi eliyle kopardığı sayfa: Kasım 1912, kız N., aracı B. Altında: B. hâlâ yaşıyor. Buenos Aires.',
          birak: 'Vollmer\'in defteri Zürih\'te yandı. Elinizde yalnızca bir ad ve bir şehir: Bruno, Buenos Aires. Klara\'nın kalemiyle yazılmış.',
        }[bayrak(d, 'kasa38')] || 'Elinizde bir ad ve bir şehir: Bruno, Buenos Aires.',
        rizaGemide(d)
          ? 'Rıza Bey güvertede, küpeşteye yapışmış. Ömrümde Haliç\'ten öteye gitmedim, diyor. Şimdi bir okyanus. Bavulunu kendisi taşıdı; söz vermişti.'
          : {
              kal: 'Rıza Bey İstanbul\'da; kayıkhanenin kapısında. İskelede bir telgraf getirdiler: Kapıdayım. Bekliyorum. R. Cemil Bey seninle; hekim çantasıyla.',
              dinlen: 'Rıza Bey İstanbul\'da; bahçesinde. İskelede bir telgraf getirdiler: Gülleri suluyorum. Döndüğünde say. R. Cemil Bey seninle; hekim çantasıyla.',
            }[bayrak(d, 'rizaKar')] || 'Rıza Bey İstanbul\'da kaldı. Cemil Bey seninle; hekim çantasıyla, Ankara\'dan izin alarak.',
        {
          riza: 'Neslihan Napoli\'yi hatırlıyor: Rıza Bey\'in tek bir kelimesi; polizia. Bruno o gün durmuştu.',
          kemal: 'Neslihan Napoli\'yi hatırlıyor: pencerede duran Bruno, kayığın kürekleri. Atlamamıştı.',
          kavga: 'Neslihan Napoli\'yi hatırlıyor: merdivenden inerken titreyen ellerini. Bruno\'yu yere sermiştin.',
        }[bayrak(d, 'brunoSonu')] || '',
        bayrak(d, 'neslihanRahel') === 'ad'
          ? 'Zürih\'te altı ad söylemiştim, diyor Neslihan. Ezberden. Hâlâ ezberimde.'
          : '',
        'Üç gün, diye düşünüyorsun. Cebelitarık, Ekvator, açık deniz. Her gün gemide bir kapı.',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Devam',
          etki: (d) => ({
            mekan: 'vapur39',
            bayrak: { ekip_riza: rizaGemide(d), ekip_cemil: !rizaGemide(d), ekip_nermin: false, 'gorüldü_vapur39': true },
          }),
        },
      ],
    },

    // --- Günler ------------------------------------------------------------
    nazli39: {
      ortam: 'ortam_kamara',
      baslik: 'Üçüncü mevki',
      paragraflar: [
        'Ambarın üstündeki kadınlar koğuşu. Çamaşır ipleri, bebek ağlamaları. Bir ranzanın ucunda on yedi yaşında bir kız; başörtüsünün ucunu çekiştiriyor. Türkçe duyunca başını kaldırıyor.',
        'Adı Nazlı. Kavalalı; mübadeleyle Tuzla\'ya, oradan İstanbul\'a. Babası yolda öldü, annesi bir çamaşırhanede. Bir adam gelmiş, diyor; Galata\'da. Buenos Aires\'te zengin bir aile hizmetçi arıyormuş. Yol parası onlardan.',
        'Sözleşmesini gösteriyor; gururla. İtalyanca, okuyamıyor. Neslihan okuyor. Yüzünü bir an çeviriyor, sonra geri döndürüyor.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'vapur39', delil: ['sozlesme'], ...gunBitti } }],
    },
    liste39: {
      ortam: 'ortam_salon',
      baslik: 'Kâtip odası',
      paragraflar: (d) => [
        'Geminin kâtibi yaşlı bir Cenevizli; gözlüğü burnunun ucunda. Yolcu listesine kimse bakmaz, diyor. Bakan da bir şey bulmaz.',
        rizaGemide(d)
          ? 'Rıza Bey şapkasını çıkarıyor. İstanbul polisi, diyor; emekli, ama bir polis emekli olmaz. Kâtip ona uzun uzun bakıyor. Benim babam da jandarmaydı, diyor. Defteri çeviriyor.'
          : 'Cemil Bey koğuşta ateşlenen bir çocuğa baktığını söylüyor; adını, yaşını bilmesi gerek. Kâtip bir hekime hayır demiyor. Defteri çeviriyor.',
        'On bir ad. On bir genç kadın. Hepsinin yanında aynı üç harf: S. A. C. Ve aynı ödeyen.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'vapur39', delil: ['yolcu_listesi'], ...gunBitti } }],
    },
    testa39: {
      ortam: 'ortam_salon',
      baslik: 'Birinci mevki salonu',
      paragraflar: (d) => [
        'Kristal avizeler, yeşil çuha masalar. Signor Testa kırk yaşlarında, kır bıyıklı, nazik; her akşam aynı masada iskambil oynuyor. Kazandığında gülümsüyor, kaybettiğinde daha çok.',
        'Masaya oturuyorsun. Testa seni süzüyor. Türk, diyor; İzmir mi? Ticaret mi? Tütün, diyorsun; Saltiel\'in öğrettiği gibi. Testa başını sallıyor.',
        rizaGemide(d)
          ? 'Rıza Bey arkadaki koltukta gazete okuyor gibi yapıyor. Testa kalkıp bir içki almaya gittiğinde Rıza Bey\'in eli masada bir an duruyor. Defter açık kalıyor.'
          : 'Cemil Bey Testa\'ya bir sigara uzatıyor; Viyana\'yı, operayı anlatıyor. Testa dinlerken defteri masada açık kalıyor.',
        'Bir sayfa: on bir ad. Rakamlar. Son sayfada bir adres ve tek bir harf.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'vapur39', delil: ['testa_defteri'], ...gunBitti } }],
    },
    telsiz39: {
      ortam: 'ortam_telgraf',
      baslik: 'Marconi odası',
      paragraflar: [
        'Güvertenin üstünde, bacaların arasında, küçük bir oda: kulaklıklar, cızırtı, mors. Telsizci genç bir Sicilyalı; adı Turi. Annesine her hafta telgraf çekiyor, kendi parasıyla.',
        'Neslihan İtalyanca konuşuyor; Viyana\'da operada öğrendiği kadarıyla. Turi gülüyor, sonra ciddileşiyor. Kardeşim de Buenos Aires\'e gitti, diyor. Hizmetçi olarak. Üç yıl oldu; tek mektup yazmadı.',
        'Defteri açıyor. Bakın, diyor. Ben okumadım. Siz okuyun.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'vapur39', delil: ['telsiz_kaydi'], ...gunBitti } }],
    },

    // --- Ekvator: kişisel sahne ---------------------------------------------
    ekvator39: {
      ortam: 'ortam_guverte',
      efekt: ['vapur_duduk'],
      baslik: '12 Mart, Ekvator',
      paragraflar: (d) =>
        rizaGemide(d)
          ? [
              'Neptün töreni. Tayfalar yüzlerini boyamış; biri sakallı bir deniz tanrısı, elinde çatal. Ekvator\'u ilk kez geçenler bir küvet suya batırılıyor. Çocuklar çığlık atıyor; Nazlı bile gülüyor.',
              'Rıza Bey de ilk kez geçiyor. Tayfalar onu da istiyor; Rıza Bey şapkasını çıkarıp veriyor. Suya batırılıyor, çıkıyor; bıyıkları sırılsıklam. Herkes alkışlıyor.',
              'Akşam, küpeştede. Rıza Bey hâlâ ıslak. Babam derdi ki, diyor, dünyanın bir kemeri var; onu geçen adam bir daha aynı adam olmaz. Kırk yıl inanmadım.',
              'Sonra sesini alçaltıyor. Ben yavaşlıyorum, Arif. Merdivenleri sayıyorum. Buenos Aires\'te bir gece koşmamız gerekirse sizi bekleteceğim. Montevideo\'da inip seni orada bekleyeyim mi?',
            ]
          : [
              'Neptün töreni. Tayfalar yüzlerini boyamış; biri sakallı bir deniz tanrısı, elinde çatal. Ekvator\'u ilk kez geçenler bir küvet suya batırılıyor. Çocuklar çığlık atıyor; Nazlı bile gülüyor.',
              'Cemil Bey tören bitince kamarasına çekiliyor. Akşam onu küpeştede buluyorsun; elinde bir zarf.',
              {
                birlikte: 'Eleni\'ye yazıyorum, diyor. İskenderiye\'den beri her ay. Birlikte deriz ama hep ayrı şehirlerdeyiz. Bu mektupta bir soru var. Göndereyim mi?',
                mektup: 'Eleni\'ye yazıyorum, diyor. İskenderiye\'de bir mektup demiştim; bir mektup daha. Bu sefer içinde bir soru var. Göndereyim mi?',
                veda: 'Eleni\'ye yazıyorum, diyor. İskenderiye\'de veda etmiştim. Veda eden mektup yazmaz. Ben yazıyorum. Göndereyim mi?',
              }[bayrak(d, 'cemilEleni')] || 'Bir hekime yazıyorum, diyor. İzmir\'den bir hekime. İçinde bir soru var. Göndereyim mi?',
            ],
      secenekler: [
        {
          etiket: 'Buenos Aires\'e kadar gel. Yavaş yürürsen biz de yavaş yürürüz.',
          kosul: (d) => rizaGemide(d),
          etki: { bayrak: { rizaEkvator: 'birlikte' }, artir: { rizaBag: 1 }, mekan: 'vapur39' },
        },
        {
          etiket: 'Bruno\'nun yüzünü bir polis tanır. Sana ihtiyacımız var; hızına değil.',
          kosul: (d) => rizaGemide(d),
          etki: { bayrak: { rizaEkvator: 'gorev' }, mekan: 'vapur39' },
        },
        {
          etiket: 'Montevideo\'da in. Telsizle haber veririz; arka kapıyı sen tut.',
          kosul: (d) => rizaGemide(d),
          etki: { bayrak: { rizaEkvator: 'montevideo' }, mekan: 'vapur39' },
        },
        {
          etiket: 'Gönder. Bir soru bir ömür bekletilmez.',
          kosul: (d) => !rizaGemide(d),
          etki: { bayrak: { cemilEkvator: 'gonder' }, artir: { cemilBag: 1 }, mekan: 'vapur39' },
        },
        {
          etiket: 'Buenos Aires\'ten dönünce kendin sor. Yüzüne.',
          kosul: (d) => !rizaGemide(d),
          etki: { bayrak: { cemilEkvator: 'yuz' }, mekan: 'vapur39' },
        },
        {
          etiket: 'Bilmiyorum Cemil Bey. Bu sizin sorunuz.',
          kosul: (d) => !rizaGemide(d),
          etki: { bayrak: { cemilEkvator: 'kendi' }, mekan: 'vapur39' },
        },
      ],
    },

    // --- Neslihan ve Nazlı -----------------------------------------------------
    neslihan39: {
      ortam: 'ortam_kamara',
      baslik: 'Kamarada',
      paragraflar: (d) => [
        'Gece. Neslihan kamaranın lombozundan karanlığa bakıyor. Nazlı\'yı gördüm bugün, diyor. Ranzasında saçlarını örüyordu. On yedi yaşında. Ben de on yedi yaşındaydım.',
        delilVar(d, 'sozlesme')
          ? 'Sözleşmesini okudum abi. Borç. İş bırakılamaz. Ona hiçbir şey söylemedim; yüzünü çevirdim. Sonra çevirdiğim için utandım.'
          : 'Ona ne yaptıklarını bilmiyor. Ben de bilmiyordum.',
        'Ona söyleyeyim mi? Ne olduğunu, kim olduğumu? Ya korkarsa, ya Testa\'ya koşarsa? Ya söylemezsem?',
      ],
      secenekler: [
        {
          etiket: 'Sen söyle. Kendi hikâyenle. Bir kız ancak bir kıza inanır.',
          etki: { bayrak: { neslihanNazli: 'anlat' }, artir: { neslihanBag: 1 } },
          sonra: 'neslihan39_son',
        },
        {
          etiket: 'Ben söyleyeyim. Senin hikâyen senin; onu her limanda harcama.',
          etki: { bayrak: { neslihanNazli: 'arif' } },
          sonra: 'neslihan39_son',
        },
        {
          etiket: 'Şimdi değil. Testa öğrenirse on bir kızı da kaybederiz.',
          etki: { bayrak: { neslihanNazli: 'bekle' } },
          sonra: 'neslihan39_son',
        },
      ],
    },
    neslihan39_son: {
      ortam: 'ortam_kamara',
      baslik: 'Kamarada',
      paragraflar: (d) => [
        {
          anlat: 'Sabah Neslihan üçüncü mevkiye iniyor. Bir saat sonra dönüyor; gözleri kırmızı, ama dik. Anlattım, diyor. Selanik\'i, iskeleyi, Viyana\'yı. Nazlı hiçbir şey demedi. Sonra sözleşmeyi bana verdi, katladı, verdi. Ben senin gibi olmayacağım, dedi. Öyle olmayacak, dedim.',
          arif: 'Sabah üçüncü mevkiye iniyorsun. Nazlı\'ya sözleşmeyi Türkçe okuyorsun; kelime kelime. Borç. İş bırakılamaz. Nazlı uzun süre susuyor. Sonra: Annem bilsin mi, diyor. Bilmesin. Ben dönerim.',
          bekle: 'Bir şey söylemiyorsunuz. Sabah Nazlı güvertede, Testa\'nın ona uzattığı bir portakalı soyuyor. Neslihan uzaktan bakıyor; elleri titriyor. Üç gün, diyor. Üç gün daha.',
        }[bayrak(d, 'neslihanNazli')] || '',
        'Neslihan bir süre susuyor. Sonra başka bir şeyden söz ediyor; gerçekten başka bir şeyden değil.',
        {
          yaz: 'Despina\'nın mektubu çantamda, diyor. Florina\'da bir hastane arabası. Annemiz bir arabaya bindirildi; ölümünü kimse görmedi. Ben burada bir kızı bir gemiden indirmeye çalışıyorum; annem belki bir arabadan hiç inmedi.',
          suphe: 'Tifo, diyor. Hâlâ o kelime. Annemiz için de mi yazdılar?',
          birak: 'Annemizi düşünüyorum, diyor. Bırakalım demiştin. Bırakamıyorum.',
        }[bayrak(d, 'zehraSoru')] || 'Annemizi düşünüyorum, diyor. Florina\'yı.',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Telsizle Despina\'ya yaz. Florina hastanesinin 1912 defterlerini sorsun.',
          etki: { bayrak: { zehraTelgraf: 'telgraf' }, artir: { neslihanBag: 1 }, mekan: 'vapur39' },
        },
        {
          etiket: 'Buenos Aires bitince Florina\'ya gideriz. Birlikte. Söz.',
          etki: { bayrak: { zehraTelgraf: 'soz' }, mekan: 'vapur39' },
        },
        {
          etiket: 'Bir okyanus bir seferde geçilir, Neslihan. Önce bu kızlar.',
          etki: { bayrak: { zehraTelgraf: 'sonra' }, mekan: 'vapur39' },
        },
      ],
    },

    // --- La Plata: karar ---------------------------------------------------------
    laplata39: {
      ortam: 'ortam_guverte',
      baslik: '22 Mart, La Plata ağzı',
      paragraflar: (d) => [
        'Su kahverengiye dönüyor; nehir ile okyanus burada karışıyor. Ufukta Montevideo\'nun tepesi. Yarın sabah Buenos Aires.',
        cikarimVar(d, 'on_bir_kiz')
          ? 'On bir kız. Montevideo\'da gemi altı saat yatacak. Uruguay\'ın limanında Testa\'nın sözleşmeleri bir şey ifade etmez; bir konsolos, bir hekim raporu, bir polis yeter.'
          : 'Nazlı\'nın sözleşmesi bir kâğıt; ama ötekileri bilmiyorsun. Kaç kız, hangi kamaralar?',
        cikarimVar(d, 'bruno_bekliyor')
          ? 'Calle Junín. Testa\'nın telgrafları Bruno\'ya gidiyor; son telgrafta bir kız kardeşten söz ediyor. Bruno biliyor. Testa bilmediğinizi sanıyor. Testa\'yı izlersen seni doğrudan kapısına götürür.'
          : 'Bruno\'nun nerede beklediğini bilmiyorsun. Buenos Aires büyük bir şehir.',
        bayrak(d, 'neslihanNazli') === 'bekle'
          ? 'Nazlı hiçbir şey bilmiyor. Testa\'nın portakalını soyuyor.'
          : 'Nazlı biliyor. Ranzasında bavulunu topluyor; kimseye bir şey söylemeden.',
        'Kaptan İtalyan, Testa\'nın kart arkadaşı. Ne yapacaksın?',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Montevideo\'da on bir kızı indir. Konsolosluğa, hekime, kim varsa.',
          kosul: (d) => cikarimVar(d, 'on_bir_kiz'),
          etki: { bayrak: { testaKarar: 'indir' } },
          sonra: 'laplata39_son',
        },
        {
          etiket: 'Testa\'yı izle. Bırak, seni Calle Junín\'e o götürsün.',
          kosul: (d) => cikarimVar(d, 'bruno_bekliyor'),
          etki: { bayrak: { testaKarar: 'izle' } },
          sonra: 'laplata39_son',
        },
        {
          etiket: 'Testa\'yı kaptana ihbar et. Ne olursa olsun.',
          etki: { bayrak: { testaKarar: 'ihbar' } },
          sonra: 'laplata39_son',
        },
      ],
    },
    laplata39_son: {
      ortam: 'ortam_guverte',
      efekt: ['vapur_duduk'],
      baslik: 'Montevideo',
      paragraflar: (d) => [
        {
          indir: 'Montevideo iskelesi. ' + (rizaGemide(d) ? 'Rıza Bey limandaki polisle bir saat konuşuyor; dil yok, ama deliller var.' : 'Cemil Bey on bir kızın her birine bir hekim raporu yazıyor: bulaşıcı şüphesi, karantina.') + ' Konsolosluk görevlisi sözleşmeleri okuyor, yüzü değişiyor. On bir kızdan dokuzu iniyor; ikisi korkudan kamarasından çıkmıyor. Testa iskelede, sigarasını yakarken sana bakıyor. Bir şey söylemiyor. Söylemesi gerekmiyor: Bruno artık biliyor.',
          izle: 'Hiçbir şey yapmıyorsun. Montevideo\'da kimse inmiyor. Testa güvertede, kızlara portakal dağıtıyor. Bir ara göz göze geliyorsunuz; gülümsüyor. Bilmediğini sanıyor. Neslihan dişlerini sıkıyor. Bir gün, diyor. Yalnızca bir gün.',
          ihbar: 'Kaptan seni dinliyor; sabırla, nazikçe. Sonra Testa\'yı çağırıyor. Testa güler yüzle bir kâğıt gösteriyor: ajansın izni, Cenova valiliğinin mührü. Kaptan özür diliyor; Testa\'dan, senden değil. Akşam Marconi odasından bir telgraf daha gidiyor. Turi sana yalnızca bakıyor.',
        }[bayrak(d, 'testaKarar')] || '',
        bayrak(d, 'neslihanNazli') !== 'bekle'
          ? (bayrak(d, 'testaKarar') === 'indir'
            ? 'Nazlı inenlerin arasında. İskelede dönüp Neslihan\'a el sallıyor; bir kez.'
            : 'Nazlı iskelede değil. Neslihan\'ın yanında, güvertede; bavulu ayağının dibinde. Ben sizinle kalacağım, diyor. Buenos Aires\'te sizinle.')
          : '',
        bayrak(d, 'rizaEkvator') === 'montevideo' ? 'Rıza Bey Montevideo\'da iniyor; şapkasını kaldırıyor. Arka kapı bende, diyor.' : '',
        'Ertesi sabah, sisin içinden, Buenos Aires: limanın vinçleri, Dock Sud\'un depoları, bir şehir.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_guverte',
      ortamOran: 0.45,
      baslik: 'Otuz dokuzuncu bölüm bitti',
      paragraflar: ['Kararların kaydedildi. Yedinci kitap sürüyor: Calle Junín.'],
      secenekler: [{ etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    vapur39: {
      ad: 'Stella del Plata',
      ortam: 'ortam_guverte',
      tarif: (d) =>
        'Üç bacalı bir yolcu vapuru. Aşağıda üçüncü mevki, ortada kâtip odası, yukarıda birinci mevki salonu, bacaların arasında Marconi odası. ' +
        (gunKaldi(d) ? 'Bugün ' + GUNLER[sayi(d, 'gun39')] + '. Bugün nereye gideceksin?' : 'La Plata ağzı. Yarın Buenos Aires. Önce bildiklerini bağla.'),
      nesneler: [
        {
          id: 'ucuncu',
          etiket: 'Üçüncü mevkiye in, kadınlar koğuşuna',
          kosul: (d) => gunKaldi(d) && !delilVar(d, 'sozlesme'),
          incele: 'Ambar merdivenlerinden iniyorsun.',
          etki: { sahne: 'nazli39' },
        },
        {
          id: 'katip',
          etiket: 'Kâtip odasına, yolcu listesine',
          kosul: (d) => gunKaldi(d) && !delilVar(d, 'yolcu_listesi'),
          incele: 'Kâtip odasının kapısını çalıyorsun.',
          etki: { sahne: 'liste39' },
        },
        {
          id: 'salon',
          etiket: 'Birinci mevki salonuna, Signor Testa\'nın masasına',
          kosul: (d) => gunKaldi(d) && !delilVar(d, 'testa_defteri'),
          incele: 'Salona çıkıyorsun; ceketini düzelterek.',
          etki: { sahne: 'testa39' },
        },
        {
          id: 'telsiz',
          etiket: 'Marconi odasına, telsizciye',
          kosul: (d) => gunKaldi(d) && !delilVar(d, 'telsiz_kaydi'),
          incele: 'Bacaların arasındaki dar merdiveni tırmanıyorsun.',
          etki: { sahne: 'telsiz39' },
        },
        {
          id: 'laplata',
          etiket: 'Güverteye çık. La Plata ağzı; karar zamanı',
          kosul: (d) => !gunKaldi(d),
          incele: 'Kahverengi suya bakıyorsun.',
          etki: { sahne: 'laplata39' },
        },
      ],
      kisiler: ['neslihan39k', 'riza39', 'cemil39'],
      gecisler: [],
    },
  },

  kisiler: {
    neslihan39k: {
      ad: 'Neslihan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            gunKaldi(d)
              ? 'Neslihan güvertede, rüzgârda. Dört kapı, üç gün, diyor. Rıza Bey olsa sayardı. Kızları bul abi; Bruno sonra.'
              : 'Neslihan küpeştede. Yarın, diyor.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
    riza39: {
      ad: 'Rıza Bey',
      kosul: (d) => rizaGemide(d),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Rıza Bey güvertede adım sayıyor. Kâtip listeyi bilir, diyor; bir kurye defterini taşır; telsizci her şeyi duyar. Bir de kız. Kız her şeyi bilir, kimse ona sormaz.',
          secenekler: [{ etiket: 'Tamam Rıza Bey.' }],
        },
      },
    },
    cemil39: {
      ad: 'Cemil Bey',
      kosul: (d) => !rizaGemide(d),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Cemil Bey revirden çıkıyor. Üçüncü mevkide iki çocuk kızamık, diyor. Bir hekim her kamaraya girebilir; bunu unutma.',
          secenekler: [{ etiket: 'Unutmam.' }],
        },
      },
    },
  },
};
