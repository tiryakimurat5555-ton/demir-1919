// Hikâye sahneleri (Karaköy, birinci görev). Saf veri.
// Sahne: { baslik, ortam?, ortamOran?, efekt?: [ad], paragraflar: [metin] | (d) => [metin],
//          secenekler: [{ etiket, kosul?(d), yap?(d), sonra: sahneId | null }] }
// sonra null ise sahne kapanır, serbest dolaşma sürer. Seçeneği olmayan sahnede tek "Devam" vardır.
// d.sahne o an açık olan sahnedir (kayıtta saklanır; oyun yeniden açılınca sahne kaldığı yerden okunur).

import { G2_SAHNELER } from './gorev2';

const bayrak = (d, k) => d.bayrak[k];
const delilVar = (d, id) => d.deliller.includes(id);

export const SAHNELER = {
  acilis: {
    ortam: 'ortam_rihtim',
    baslik: 'Karaköy, Aralık 1918',
    paragraflar: [
      'Şafak sökmedi daha. Haliç\'ten sis yükseliyor; Galata\'nın lambaları sütlü bir camın arkasında gibi titriyor. Martılar karanlıkta bağırıyor, bir yerde zincir gıcırdıyor, bir vapur uzun ve kalın bir sesle öttürüyor.',
      'Sırtında kömür çuvalı, rıhtım taşlarının üstünde yürüyorsun. Altmış okka. Saymayı bırakalı çok oldu. Ayaklarının altında taşlar buz gibi, ıslak; nefesin önünde buhar oluyor.',
      'Körfezde yabancı savaş gemileri yatıyor. Bir ay önce geldiler. Rıhtımın başında İngiliz askerlerinin postalları taşlara vuruyor; ne dediklerini anlamıyorsun, anlamak da istemiyorsun.',
      'Adın Arif. Askerdeki arkadaşların sana Demir derdi, sırtın bükülmüyor diye. Çanakkale\'den döneli üç yıl oldu. Üniformayı çıkardın, madalyayı bir sandığın dibine koydun. Burada kimse geçmişini sormaz. İyi de olur.',
      'Tam o sırada, tepende vinç zinciri boşanıyor. Bir sandık taşlara çarpıyor. Patlama gibi bir ses.',
    ],
    secenekler: [{ etiket: 'Devam', sonra: 'ani1' }],
  },
  ani1: {
    ortam: 'ortam_rihtim',
    ortamOran: 0.15,
    efekt: ['sandik', 'ani_savas'],
    baslik: 'Seddülbahir',
    paragraflar: [
      'Kum. Ağzında kum, gözlerinde kum. Hava yanık barut kokuyor ve deniz kırmızı.',
      'Biri adını bağırıyor: Demir! Kalk, Demir! Ama bacakların seni dinlemiyor. Başının üstünden bir şey ıslık çalarak geçiyor, toprak yağıyor.',
      'Sonra yine rıhtım. Yine sis. Elindeki çuval yere düşmüş, kömür taşlara saçılmış. Yanındaki hamal sana bakıyor. Kalbin göğsünü yumrukluyor.',
    ],
    secenekler: [
      { etiket: 'Nefesini say. Dörde kadar al, dörde kadar ver.', yap: (d) => (d.bayrak.ilkNefes = 'say'), sonra: 'ani1_nefes' },
      {
        etiket: 'Dişlerini sık. Kimse görmesin.',
        yap: (d) => {
          d.bayrak.ilkNefes = 'bastir';
          d.travma = (d.travma || 0) + 1;
        },
        sonra: 'ani1_bastir',
      },
    ],
  },
  ani1_nefes: {
    ortam: 'ortam_rihtim',
    baslik: 'Rıhtım',
    paragraflar: [
      'Bir, iki, üç, dört. Soğuk hava ciğerlerine doluyor. Bir, iki, üç, dört. Martı sesleri geri geliyor, sonra zincirin gıcırtısı, sonra hamalların küfürleri.',
      'Eğilip kömürü avuçlarınla çuvala dolduruyorsun. Ellerin hâlâ titriyor ama artık senin.',
    ],
    secenekler: [{ etiket: 'Devam', sonra: 'cagri' }],
  },
  ani1_bastir: {
    ortam: 'ortam_rihtim',
    baslik: 'Rıhtım',
    paragraflar: [
      'Çeneni öyle sıkıyorsun ki dişlerin gıcırdıyor. Hiçbir şey olmamış gibi eğilip kömürü çuvala küreklemeye başlıyorsun.',
      'Hamal bir şey diyecek oluyor, yüzüne bakınca vazgeçiyor. Göğsündeki yumruk geçmiyor. Geçmeyecek de, biliyorsun. Sadece derine iniyor.',
    ],
    secenekler: [{ etiket: 'Devam', sonra: 'cagri' }],
  },
  cagri: {
    ortam: 'ortam_kayikhane',
    baslik: 'Süleyman Kaptan',
    paragraflar: [
      'Sisin içinden çıplak ayak sesleri. Süleyman Kaptan\'ın tayfa çocuğu Ali, soluk soluğa önünde duruyor. Arif Ağabey, Kaptan seni çağırıyor. Kayıkhanede. Hemen gel dedi.',
      'Süleyman Kaptan\'ı on yıldır tanırsın. Kırk yıl gemilerde dolaşmış, şimdi rıhtımın batı ucundaki eski kayıkhanede kahve pişirip denizcilere akıl veren, sesini hiç yükseltmeyen bir adam. Seni bu limana o soktu.',
      'Kayıkhanenin kapısını açtığında mangalın ışığında yüzünü görüyorsun. Gözleri kızarmış.',
      'Sabri\'yi sudan çıkardılar, diyor. Leventis\'in yanından. Polis sarhoştu, düştü diyor. Sabri ağzına içki koymazdı Arif. On iki yaşından beri benim yanımda büyüdü, bilirim.',
      'Sen savaşta çok ölü gördün. Git bir bak ona. Araba gelip götürmeden. Bana doğruyu söyle.',
    ],
    secenekler: [{ etiket: 'Rıhtıma git', sonra: 'baslangic_yardim' }],
  },
  baslangic_yardim: {
    ortam: 'ortam_kayikhane',
    baslik: 'Karaköy',
    paragraflar: [
      'Kayıkhanenin içindesin, doğuya bakıyorsun. Kapı tam önünde, iki adım ötede. Sabri\'nin cesedi rıhtımın doğu ucunda, Leventis vapurunun yanında; yetmiş adım kadar ötede. Saat 8.30 sularında polis gelir, 9\'da ceset götürülür.',
      'Parmağını ekrana koyup yukarı kaydır ve tut: ileri yürürsün. Sağa ya da sola kaydırırsan dönersin. Dokun: çevrende ne var. Çift dokun: kapıdan geç, eşyayı incele ya da yanındakiyle konuş. Uzun bas: saat ve yerin. İki parmakla çift dokun: menü. Menüdeki Yerler\'den bir yer seçersen kendin yürürsün.',
    ],
    secenekler: [{ etiket: 'Başla', sonra: null }],
  },

  belge: {
    ortam: 'ortam_kayikhane',
    baslik: 'Yağlı bezdeki kâğıt',
    paragraflar: [
      'İki gömlek, bir tespih, Trabzon\'dan gelmiş bir mektup. En dipte, tütün tabakasının içinde yağlı beze sıkı sıkı sarılmış bir paket. Bezi açınca kalın, pahalı bir kâğıt çıkıyor; denizci parasıyla alınacak cinsten değil.',
      'Mangalın ışığına tutuyorsun. Satır satır, harf ve rakamlardan oluşan isimler: K 7, M.R. 12, kimisinin yanında küçük bir çarpı. Arada Fransızca kelimeler: Salonique, Vienne, Berlin. Yanlarında tarihler.',
      'Kâğıdın alt yarısı başka bir yazıyla yazılmış. Harfler kıvrılıp birbirine giriyor, noktaları yok. Siyakat bu; defterdarların, maliye kâtiplerinin yazısı. Askerde bir kez görmüştün, çavuş bile okuyamamıştı.',
      'En altta mürekkeple basılmış bir işaret: bir anahtar. İki yanından kanat açmış bir anahtar.',
      'Bunu kimse görmesin Arif, diyor Süleyman\'ın sesi aklında. Sabri\'yi bunun için öldürdüler.',
    ],
    secenekler: [{ etiket: 'Belgeyi koynuna koy', sonra: null }],
  },

  fotograf: {
    ortam: 'ortam_oda',
    baslik: 'Fotoğraf',
    paragraflar: [
      'Pervazın altında küçük, köşeleri kıvrılmış bir fotoğraf. Genç bir kadın, bir bahçe kapısının önünde ayakta. Saçları örgülü. Gülümsemiyor.',
      'Arkasını çeviriyorsun. Mor bir damga: Manastır, Fotoğrafhane-i Hilal.',
      'Manastır. Kelime göğsüne bir taş gibi oturuyor.',
      'Bir avlu. Ayva ağacı. Annenin sesi, mutfaktan, adını çağırıyor: Arif, gel yemeğe. Kuyunun başında küçük bir kız, saçları örgülü, sana su serpiyor.',
      'Sonra her şey yine kayıyor: Balkan Savaşı, yollarda göçen arabalar, bir daha görmediğin yüzler. Ailenin hepsinin öldüğünü sana söylediler. Sen de inandın; inanmak, aramaktan kolaydı.',
      'Fotoğraftaki kadının yüzünde tanıdık bir şey var. Ya da sen öyle sanmak istiyorsun. Sabri\'nin bu fotoğrafla ne işi vardı?',
    ],
    secenekler: [
      { etiket: 'Nefesini say. Fotoğrafı dikkatle cebine koy.', sonra: null },
      { etiket: 'Fotoğrafı cebine tık. Şimdi bunun zamanı değil.', yap: (d) => (d.travma = (d.travma || 0) + 1), sonra: null },
    ],
  },

  karar_oncesi: {
    ortam: 'ortam_kayikhane',
    baslik: 'Kayıkhanede',
    paragraflar: (d) => [
      d.gece
        ? 'Kayıkhanenin tahta duvarlarına dalgalar vuruyor. Süleyman Kaptan mangalı yeniden yakıyor, iki fincan kahve koyuyor.'
        : 'Süleyman kayıkhanenin kapısını kapatıyor; dışarıdaki rıhtım gürültüsü uzaklaşıyor. Mangalı yakıp iki fincan kahve koyuyor.',
      'Bildiklerini bir bir anlatıyorsun. Sabri\'nin boğulmadığını. Sandıkların içinde silah olduğunu. Belgenin altındaki kanatlı anahtarın, Ferrante\'nin işinin arkasında da durduğunu.',
      'Süleyman uzun süre susuyor. Kahvesinin telvesine bakıyor.',
      'Bu şehirde şimdi herkesin bir efendisi var, diyor sonunda. İngilizin, Fransızın, İtalyanın. Sarayın, paşaların. Bu kâğıdı kime götürürsen, onun efendisine götürmüş olursun. Dikkatli seç, evlat.',
    ],
    secenekler: [{ etiket: 'Devam', sonra: 'gece_konusma' }],
  },
  gece_konusma: {
    ortam: 'ortam_kayikhane',
    baslik: 'Mangalın başında',
    paragraflar: (d) => [
      'Bir süre ikiniz de konuşmuyorsunuz. Dışarıda bir motor geçiyor; dalgası kayıkhanenin direklerini sallıyor. Süleyman kahvesini bitiriyor, fincanı ters çeviriyor.',
      delilVar(d, 'fotograf')
        ? 'O fotoğraf, diyor sonunda. Cebine koyarken yüzünü gördüm, Arif. On yıldır bu limandasın; senin yüzünün öyle değiştiğini hiç görmedim. Manastır\'da kimin vardı?'
        : 'On yıldır bu limandasın, diyor sonunda. Bir kez olsun memleketinden söz etmedin. Manastır\'da kimin vardı?',
      'Bir baban vardı: Kalaycı İsmail Usta. Elleri hep yanık, hep kalay kokardı. Bir annen: Zehra Hanım. Bir de kız kardeşin; senden beş yaş küçük, ayva ağacına tırmanıp inemeyen. Balkan Harbi\'nde esir düştün. Döndüğünde ev yanmıştı. Komşular hepsi öldü dedi.',
      'Süleyman başını kaldırıyor. Hiç aramadın mı onları?',
    ],
    secenekler: [
      { etiket: 'Öldüler dediler. İnandım. İnanmak, aramaktan kolaydı.', yap: (d) => (d.bayrak.arifNeden = 'inandim'), sonra: 'gece_suleyman' },
      {
        etiket: 'Korktum. Ya bulsaydım da beni tanımasalardı? Ya ben onları tanımasaydım?',
        yap: (d) => (d.bayrak.arifNeden = 'korktum'),
        sonra: 'gece_suleyman',
      },
      {
        etiket: 'Aramak, onları orada bırakıp gittiğimi kabul etmek demekti.',
        yap: (d) => {
          d.bayrak.arifNeden = 'sucluluk';
          d.travma = (d.travma || 0) + 1;
        },
        sonra: 'gece_suleyman',
      },
    ],
  },
  gece_suleyman: {
    ortam: 'ortam_kayikhane',
    baslik: 'Kemal',
    paragraflar: (d) => [
      bayrak(d, 'arifNeden') === 'inandim'
        ? 'Süleyman başını sallıyor. Kolay olanı seçen adamı ayıplamam, diyor. Ama kolay olan çoğu zaman doğru olan değildir; sen bunu benden iyi bilirsin.'
        : bayrak(d, 'arifNeden') === 'korktum'
          ? 'Süleyman bir an gülümsüyor. Tanımamaktan korkan adam, diyor, unutmamış adamdır. Unutan korkmaz.'
          : 'Süleyman uzun süre sana bakıyor. Sen kimseyi bırakmadın evlat, diyor. Seni bir savaş aldı götürdü. Savaşın günahını kendi sırtına yükleme; o sırt bir gün kırılır.',
      'Sonra duvardaki pusulayı gösteriyor. Bunu hiç sormadın, diyor. Ben de söylemedim. Nevres diye bir yük gemisinde ikinci kaptandım; Doksan Yedi\'de, Girit açığında fırtınaya tutulduk. Oğlum Kemal benimle gemideydi. On dört yaşındaydı; ilk seferiydi.',
      'Gemi battı. Ben bu pusulayla bir sandala tutundum. Kemal\'i bulamadım. Üç gün denizde aradım. Sonra herkes öldü dedi; ben de inandım.',
      'Yirmi bir yıl oldu, diyor sesini alçaltarak. Hâlâ bazı geceler bir gemi Pire\'den gelince iskelenin başına çıkar, inenlerin yüzüne bakarım. Deliliktir, biliyorum. Ama aramayı bırakan adam, Arif, bir yanıyla kendini de gömer.',
      'Fincanını mangalın üstüne koyuyor. Sabri\'nin işini bitir, diyor. Sonra o fotoğrafın arkasındaki damgaya bak. Bir dükkânın adı. Dükkânların defteri olur.',
    ],
    secenekler: [
      {
        etiket: 'Bulursam sana da haber vereceğim kaptan.',
        yap: (d) => {
          d.suleymanBag = (d.suleymanBag || 0) + 1;
          d.bayrak.aramaSozu = true;
        },
        sonra: 'karar',
      },
      { etiket: 'Başını salla. Konuşacak gücün kalmadı.', sonra: 'karar' },
    ],
  },
  karar: {
    ortam: 'ortam_kayikhane',
    baslik: 'Karar',
    paragraflar: ['Süleyman belgeyi avucunda tartıyor. Bunu kime götüreceğiz, evlat?'],
    secenekler: [
      { etiket: 'İngiliz askerî polisine. Silahlar onların şehrine iniyor.', yap: (d) => (d.bayrak.karar1 = 'ingiliz'), sonra: 'son_ingiliz' },
      { etiket: 'Süleyman\'ın güvendiği eski bir polise.', yap: (d) => (d.bayrak.karar1 = 'polis'), sonra: 'son_polis' },
      { etiket: 'Kimseye. Saklayacağız; bu işi ben çözeceğim.', yap: (d) => (d.bayrak.karar1 = 'sakla'), sonra: 'son_sakla' },
    ],
  },
  son_ingiliz: {
    ortam: 'ortam_buro',
    baslik: 'Askerî polis',
    paragraflar: [
      'Sabah, Galata\'daki askerî polis karakolunda bir tercüman seni dinliyor, sonra bir yüzbaşıya İngilizce bir şeyler anlatıyor. Yüzbaşı belgeyi alıp ışığa tutuyor. Kanatlı anahtarı görünce kaşı hafifçe kalkıyor; sadece bir an.',
      'Teşekkür ederiz, diyor tercüman. İlgileneceğiz. Adresin?',
      'Kapıdan çıkarken belgenin bir kopyası olmadığını düşünüyorsun. Ve yüzbaşının, sen konuşurken ikinci bir kez, çok kısa, pencereden rıhtıma baktığını.',
    ],
    secenekler: [{ etiket: 'Devam', sonra: 'kapanis' }],
  },
  son_polis: {
    ortam: 'ortam_cemil_ev',
    baslik: 'Eski bir polis',
    paragraflar: [
      'Süleyman seni Cihangir\'de, yokuşun dibinde bir eve götürüyor. Kapıyı açan adam yaşlı ama dimdik; bakışı seni baştan aşağı tartıyor.',
      'Belgeyi okumuyor; önce senin anlatmanı istiyor. Her ayrıntıyı iki kez sordurtuyor. Sonra kâğıdı alıp lambaya tutuyor.',
      'Bunu bana getirmekle iyi ettin, diyor. Ama bundan sonra kimseye güvenme. Bana da.',
      'Belge onda kalıyor. Sen ondan kopya etmesini istiyorsun; ediyor. Kopyası senin cebinde.',
    ],
    secenekler: [{ etiket: 'Devam', sonra: 'kapanis' }],
  },
  son_sakla: {
    ortam: 'ortam_kayikhane',
    baslik: 'Saklanan kâğıt',
    paragraflar: [
      'Belgeyi yağlı beze geri sarıyorsun. Kayıkhanenin döşemesinde, Süleyman\'ın gösterdiği gevşek tahtanın altına koyuyorsun.',
      'Siyakatı okuyacak birini bulmalısın. Fransızca isimleri çözecek birini. Ve kanatlı anahtarın kime ait olduğunu.',
      'Süleyman başını sallıyor. Yalnız yapamazsın bunu, diyor. Ama kime güveneceğini de bilmiyorsun. İkisi birden doğru.',
    ],
    secenekler: [{ etiket: 'Devam', sonra: 'kapanis' }],
  },
  kapanis: {
    ortam: 'ortam_oda',
    baslik: 'Kapının altındaki not',
    paragraflar: (d) =>
      [
        'Gece yarısı Kalafatçı Hanı\'ndaki odana dönüyorsun. Merdiven gıcırdıyor. Kapının önünde durup dinliyorsun; savaştan kalma bir alışkanlık.',
        'Kapının altında katlanmış bir kâğıt var. Kalın, pahalı kâğıt. Lavanta kokuyor.',
        'İçinde tek bir satır, düzgün bir Türkçeyle: ' +
          (bayrak(d, 'karar1') === 'ingiliz'
            ? 'Doğru kapıyı çaldığını sanıyorsun. Öyle değil.'
            : bayrak(d, 'karar1') === 'polis'
              ? 'Yaşlı adamlar uzun yaşamaz. Bulduğunu geri ver.'
              : 'Bulduğunu geri ver. Süleyman\'ın kayıkhanesi yanmasın.'),
        'Altında, mürekkeple basılmış: kanatlı bir anahtar.',
        (d.travma || 0) >= 2
          ? 'Ellerin titriyor. Uzun zamandır ilk kez, savaşın bittiğinden emin değilsin.'
          : 'Kâğıdı katlayıp cebine koyuyorsun. Korkuyorsun; ama bu korku tanıdık. Ne yapacağını bilen bir korku.',
        'Birinci görevin sonu: Sudaki Adam.',
      ].filter(Boolean),
    secenekler: [{ etiket: 'Devam', yap: (d) => (d.gorevBitti = true), sonra: 'g2_gece' }],
  },
  ...G2_SAHNELER,
};

export function sahneParagraflari(d, id) {
  const s = SAHNELER[id];
  return typeof s.paragraflar === 'function' ? s.paragraflar(d) : s.paragraflar;
}

export function sahneSecenekleri(d, id) {
  const s = SAHNELER[id];
  const liste = s.secenekler && s.secenekler.length ? s.secenekler : [{ etiket: 'Devam', sonra: null }];
  return liste.map((x, i) => ({ ...x, i })).filter((x) => !x.kosul || x.kosul(d));
}

// Seçeneği uygular; d.sahne bir sonraki sahne ya da null olur
export function sahneSec(d, id, i) {
  const s = SAHNELER[id];
  const liste = s.secenekler && s.secenekler.length ? s.secenekler : [{ etiket: 'Devam', sonra: null }];
  const x = liste[i];
  if (x.yap) x.yap(d);
  d.sahne = x.sonra || null;
  return d.sahne;
}
