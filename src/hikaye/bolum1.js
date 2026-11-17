// Birinci bölüm: "Sudaki Adam" — dikey dilim.
// Karaköy, Aralık 1918. İtilaf donanması Kasım ortasında İstanbul'a demirledi (tarihsel arka plan).
// Gizli örgüt, Ferrante ve Ortakları, Leventis vapuru ve bütün karakterler KURGUDUR.
//
// Anlatım ikinci tekil şahıs, şimdiki zaman: oyuncu Arif'in gözünden (çoğu zaman kulağından) dinler.
// Sahnelerde: ortam (çalacak ortam döngüsü; yoksa bulunulan mekânınki), ortamOran (0-1), efekt (sırayla çalan sesler).
// Mekân ortam sesleri 'ortam_' + mekân kimliği (oda, han, buro, kayikhane, rihtim).
import { bayrak, cikarimVar, delilVar, sayi } from '../oyun/motor';

const ucDelilCesette = (d) => delilVar(d, 'ip_izi') && delilVar(d, 'kopuk_yok') && delilVar(d, 'mum');

export const BOLUM1 = {
  id: 'bolum1',
  ad: 'Birinci bölüm: Sudaki Adam',
  baslangic: 'acilis',
  ilkMekan: 'rihtim',

  // -------------------------------------------------------------------------
  // Deliller (soruşturma panosu)
  // -------------------------------------------------------------------------
  deliller: {
    ip_izi: { ad: 'Bileklerdeki ip izi', tarif: 'Sabri\'nin iki bileğinde de ince, morarmış bir şerit var. Elleri bir süre sıkıca bağlı kalmış.' },
    kopuk_yok: { ad: 'Ağızda köpük yok', tarif: 'Boğulan adamın ağzında ve burnunda köpük olur; Arif bunu Seddülbahir kıyısında çok gördü. Sabri\'de yok.' },
    mum: { ad: 'Tırnak altındaki kırmızı mum', tarif: 'Sabri\'nin kömür karası tırnaklarının altında kırmızı, kırılgan kırıntılar: mühür mumu.' },
    motor: { ad: 'Gece yanaşan ışıksız motor', tarif: 'Kayıkçı Hüsnü, gece üç sularında ışıksız bir motorun Leventis\'in kıçına yanaştığını, iki adamın ağır bir çuvalı taşıdığını gördü.' },
    fransiz_aksan: { ad: 'Fransız ağızlı adam', tarif: 'Motordaki adamlardan biri Türkçe konuşuyordu, ama Hüsnü\'ye göre Frenk ağzıyla.' },
    belge: { ad: 'Şifreli belge', tarif: 'Yağlı beze sarılı kalın kâğıt: harf ve rakamlardan isimler, Fransızca şehir adları, tarihler ve Arif\'in okuyamadığı siyakat yazısıyla bir bölüm.' },
    kanatli_anahtar: { ad: 'Kanatlı anahtar işareti', tarif: 'Belgenin altına mürekkeple basılmış bir işaret: iki yanından kanat açmış bir anahtar.' },
    manifest: { ad: 'Leventis\'in yük kaydı', tarif: 'Liman bürosunun defterine göre Leventis, Ferrante ve Ortakları adına kırk sandık makine yedek parçası indirecek. Geminin sahibi: Pendle Shipping, Pire; İngiliz bir armatör.' },
    agirlik: { ad: 'Fazla ağır sandıklar', tarif: 'Vinç defterine göre her sandık iki adam ağırlığında. Gülce\'ye göre o boyda yedek parça bu kadar çekmez.' },
    ferrante_muhur: { ad: 'Kırmızı mumlu mühürler', tarif: 'Ferrante\'nin sandıklarının kapakları kırmızı mumla mühürlenmiş. Gülce\'nin işaret ettiği ayrıntı.' },
    paltolu: { ad: 'Odayı arayan paltolu adam', tarif: 'Hancı Ohannes Usta\'ya göre dün akşam Sabri\'nin kuzeniyim diyen, temiz paltolu, lavanta kokulu bir adam odaya girdi. Türkçeyi yabancı gibi, ama düzgün konuşuyordu.' },
    mektup: { ad: 'Sabri\'nin yarım mektubu', tarif: 'Trabzon\'daki kız kardeşine yazılmış, bitirilmemiş mektup: kırılan bir sandık, içinde tüfekler, deri bir çanta ve korku.' },
    fotograf: { ad: 'Manastır\'da çekilmiş fotoğraf', tarif: 'Bir kadının fotoğrafı. Arkasındaki damga: Manastır, Fotoğrafhane-i Hilal. Arif\'in içinde bir şey kıpırdatıyor.' },
    ferrante_damga: { ad: 'Ferrante mektubundaki işaret', tarif: 'Ferrante ve Ortakları\'nın antetli kâğıdının köşesinde, neredeyse görünmeyecek kadar küçük: kanatlı bir anahtar.' },
  },

  // -------------------------------------------------------------------------
  // Çıkarımlar: iki delil birleşince
  // -------------------------------------------------------------------------
  cikarimlar: {
    olduruldu: {
      a: 'ip_izi',
      b: 'kopuk_yok',
      ad: 'Sabri boğulmadı',
      metin: 'Sabri suya canlı düşmedi. Elleri bağlanmıştı; öldükten sonra suya atıldı. Bu bir kaza değil, bir cinayet.',
    },
    sandik_acti: {
      a: 'mum',
      b: 'ferrante_muhur',
      ad: 'Sabri sandığı açtı',
      metin: 'Tırnaklarının altındaki kırmızı mum, Ferrante\'nin sandıklarındaki mühürlerden. Sabri o sandıklardan birini açtı ve gördüğü şey onu öldürttü.',
    },
    silah: {
      a: 'agirlik',
      b: 'mektup',
      ad: 'Sandıklarda silah var',
      metin: 'Kırk sandık, yedek parça diye yazılmış ama her biri iki adam ağırlığında. Sabri\'nin mektubu boşluğu dolduruyor: sandıklarda tüfek var. İşgal altındaki bir şehre, kayıtlara yalan yazılarak silah indiriliyor.',
    },
    ayni_adam: {
      a: 'fransiz_aksan',
      b: 'paltolu',
      ad: 'Rıhtımdaki adam odayı aradı',
      metin: 'Gece motordaki Frenk ağızlı adam ile Sabri\'nin odasını arayan lavanta kokulu adam büyük ihtimalle aynı kişi. Çantayı arıyorlar; yani belgenin kayıp olduğunu biliyorlar.',
    },
    orgut: {
      a: 'kanatli_anahtar',
      b: 'ferrante_damga',
      ad: 'Belgenin sahibi Ferrante\'nin arkasında',
      metin: 'Belgenin altındaki kanatlı anahtar, Ferrante ve Ortakları\'nın kâğıdında da var. Bu bir tüccarın kaçakçılığından büyük bir şey: şehirlerin, tarihlerin ve isimlerin listesini tutan bir örgüt.',
    },
  },

  // Bölümün ilerleyişi: bütün temel çıkarımlar tamamlanınca karar sahnesi
  olaylar: [
    {
      id: 'karar',
      kosul: (d) => cikarimVar(d, 'olduruldu') && cikarimVar(d, 'silah') && cikarimVar(d, 'orgut'),
      etki: { mekan: 'kayikhane', sahne: 'karar_oncesi' },
    },
    {
      id: 'ceset_gitti',
      kosul: (d) => ucDelilCesette(d) && !bayrak(d, 'cesetGitti'),
      etki: { sahne: 'araba' },
    },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Birinci bölüm bitti.' },
    { kosul: (d) => !ucDelilCesette(d), metin: 'Rıhtımda Sabri\'nin cesedine bak: bilekleri, yüzü, elleri. Polis arabası gelmeden.' },
    { kosul: (d) => !bayrak(d, 'denkVerildi'), metin: 'Gördüklerini kayıkhanede Süleyman Kaptan\'a anlat.' },
    { kosul: (d) => !delilVar(d, 'belge'), metin: 'Süleyman Kaptan\'ın sakladığı denki, Sabri\'nin eşyalarını incele.' },
    {
      kosul: () => true,
      metin: 'Belgenin peşine düş. Sabri\'nin odası Tophane\'deki Kalafatçı Hanı\'nda, gemi kayıtları liman bürosunda. Delilleri soruşturma panosunda ikişer ikişer birleştir.',
    },
  ],

  // -------------------------------------------------------------------------
  // Sahneler
  // -------------------------------------------------------------------------
  sahneler: {
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
        {
          etiket: 'Nefesini say. Dörde kadar al, dörde kadar ver.',
          etki: { bayrak: { ilkNefes: 'say' } },
          sonra: 'ani1_nefes',
        },
        {
          etiket: 'Dişlerini sık. Kimse görmesin.',
          etki: { artir: { travma: 1 }, bayrak: { ilkNefes: 'bastir' } },
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
        'Sisin içinden çıplak ayak sesleri. Süleyman Kaptan\'ın tayfa çocuğu Ali, soluk soluğa önünde duruyor.',
        'Arif Ağabey, Kaptan seni çağırıyor. Kayıkhanede. Hemen gel dedi.',
        'Süleyman Kaptan\'ı on yıldır tanırsın. Kırk yıl gemilerde dolaşmış, şimdi rıhtımın ucundaki eski kayıkhanede kahve pişirip denizcilere akıl veren, sesini hiç yükseltmeyen bir adam. Seni bu limana o soktu. Bir şey istediğinde hemen istemez; demek ki önemli.',
        'Kayıkhanenin kapısını açtığında mangalın ışığında yüzünü görüyorsun. Gözleri kızarmış.',
        'Sabri\'yi sudan çıkardılar, diyor. Leventis\'in yanından. Polis sarhoştu, düştü diyor. Sabri ağzına içki koymazdı Arif. On iki yaşından beri benim yanımda büyüdü, bilirim.',
        'Sen savaşta çok ölü gördün. Git bir bak ona. Araba gelip götürmeden. Bana doğruyu söyle.',
      ],
      secenekler: [{ etiket: 'Rıhtıma git', etki: { mekan: 'rihtim', bayrak: { gorev: 1, 'gorüldü_rihtim': true } } }],
    },
    araba: {
      baslik: 'Polis arabası',
      paragraflar: [
        'Taşların üstünde tekerlek gürültüsü. Bir at kişniyor. İki polis neferi, yanlarında bir İngiliz çavuşu, Sabri\'yi bir branda gibi kaldırıp arabaya atıyorlar.',
        'Biri senin de orada dikildiğini görüyor. Ne bakıyorsun hamal? Sarhoşun biri işte. Yürü işine.',
        'Araba uzaklaşıyor. Sende Sabri\'den üç şey kalıyor: bileklerindeki iz, ağzındaki köpüğün yokluğu, tırnaklarının altındaki kırmızı. Sessiz bir ölü, sana ölüsünden fazlasını anlattı.',
        'Bunları Süleyman Kaptan\'a anlatmalısın.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { cesetGitti: true } } }],
    },
    belge: {
      baslik: 'Yağlı bezdeki kâğıt',
      paragraflar: [
        'Tütün tabakasının içinde, yağlı beze sıkı sıkı sarılmış bir paket. Bezi açınca kalın, pahalı bir kâğıt çıkıyor; denizci parasıyla alınacak cinsten değil.',
        'Mangalın ışığına tutuyorsun. Satır satır, harf ve rakamlardan oluşan isimler: K 7, M.R. 12, kimisinin yanında küçük bir çarpı. Arada Fransızca kelimeler: Salonique, Vienne, Berlin. Yanlarında tarihler.',
        'Kâğıdın alt yarısı başka bir yazıyla yazılmış. Harfler kıvrılıp birbirine giriyor, noktaları yok. Siyakat bu; defterdarların, maliye kâtiplerinin yazısı. Askerde bir kez görmüştün, çavuş bile okuyamamıştı.',
        'En altta mürekkeple basılmış bir işaret: bir anahtar. İki yanından kanat açmış bir anahtar.',
        'Süleyman Kaptan omzunun üstünden bakıyor. Uzun süre bir şey demiyor. Sonra alçak sesle: Bunu kimse görmesin Arif. Sabri\'yi bunun için öldürdüler.',
      ],
    },
    fotograf: {
      baslik: 'Fotoğraf',
      paragraflar: [
        'Mektubun arasından küçük, köşeleri kıvrılmış bir fotoğraf kayıyor. Genç bir kadın, bir sandalyenin yanında ayakta. Saçları örgülü. Gülümsemiyor.',
        'Arkasını çeviriyorsun. Mor bir damga: Manastır, Fotoğrafhane-i Hilal.',
        'Manastır. Kelime göğsüne bir taş gibi oturuyor.',
        'Bir avlu. Ayva ağacı. Annenin sesi, mutfaktan, adını çağırıyor: Arif, gel yemeğe. Kuyunun başında küçük bir kız, saçları örgülü, sana su serpiyor.',
        'Sonra her şey yine kayıyor: Balkan Savaşı, yollarda göçen arabalar, bir daha görmediğin yüzler. Ailenin hepsinin öldüğünü sana söylediler. Sen de inandın; inanmak, aramaktan kolaydı.',
        'Fotoğraftaki kadının yüzünde tanıdık bir şey var. Ya da sen öyle sanmak istiyorsun. Sabri\'nin bu fotoğrafla ne işi vardı?',
      ],
      secenekler: [
        { etiket: 'Nefesini say. Fotoğrafı dikkatle cebine koy.', sonra: null },
        { etiket: 'Fotoğrafı cebine tık. Şimdi bunun zamanı değil.', etki: { artir: { travma: 1 } }, sonra: null },
      ],
    },
    karar_oncesi: {
      baslik: 'Kayıkhanede gece',
      paragraflar: [
        'Akşam oluyor. Kayıkhanenin tahta duvarlarına dalgalar vuruyor. Süleyman Kaptan mangalı yeniden yakıyor, iki fincan kahve koyuyor.',
        'Bildiklerini bir bir anlatıyorsun. Sabri\'nin boğulmadığını. Kırk sandığın içinde tüfek olduğunu. Ferrante ve Ortakları\'nın kâğıdındaki küçük kanatlı anahtarı.',
        'Süleyman uzun süre susuyor. Kahvesinin telvesine bakıyor.',
        'Bu şehirde şimdi herkesin bir efendisi var, diyor sonunda. İngilizin, Fransızın, İtalyanın. Sarayın, paşaların. Bu kâğıdı kime götürürsen, onun efendisine götürmüş olursun. Dikkatli seç, evlat.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'gece_konusma' }],
    },
    gece_konusma: {
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
        {
          etiket: 'Öldüler dediler. İnandım. İnanmak, aramaktan kolaydı.',
          etki: { bayrak: { arifNeden: 'inandim' } },
          sonra: 'gece_suleyman',
        },
        {
          etiket: 'Korktum. Ya bulsaydım da beni tanımasalardı? Ya ben onları tanımasaydım?',
          etki: { bayrak: { arifNeden: 'korktum' } },
          sonra: 'gece_suleyman',
        },
        {
          etiket: 'Aramak, onları orada bırakıp gittiğimi kabul etmek demekti.',
          etki: { bayrak: { arifNeden: 'sucluluk' }, artir: { travma: 1 } },
          sonra: 'gece_suleyman',
        },
      ],
    },
    gece_suleyman: {
      baslik: 'Kemal',
      paragraflar: (d) => [
        bayrak(d, 'arifNeden') === 'inandim'
          ? 'Süleyman başını sallıyor. Kolay olanı seçen adamı ayıplamam, diyor. Ama kolay olan çoğu zaman doğru olan değildir; sen bunu benden iyi bilirsin.'
          : bayrak(d, 'arifNeden') === 'korktum'
            ? 'Süleyman bir an gülümsüyor. Tanımamaktan korkan adam, diyor, unutmamış adamdır. Unutan korkmaz.'
            : 'Süleyman uzun süre sana bakıyor. Sen kimseyi bırakmadın evlat, diyor. Seni bir savaş aldı götürdü. Savaşın günahını kendi sırtına yükleme; o sırt bir gün kırılır.',
        'Sonra duvardaki pusulayı gösteriyor. Bunu hiç sormadın, diyor. Ben de söylemedim. Nevres diye bir yük gemisinde ikinci kaptandım; Doksan Yedi\'de, Girit açığında fırtınaya tutulduk. Oğlum Kemal benimle gemideydi. On dört yaşındaydı; ilk seferiydi.',
        'Gemi battı. Ben bu pusulayla bir sandala tutundum. Kemal\'i bulamadım. Üç gün denizde aradım. Sonra herkes öldü dedi; ben de inandım.',
        'Süleyman sesini alçaltıyor. Yirmi bir yıl oldu, diyor. Hâlâ bazı geceler bir gemi Pire\'den gelince iskelenin başına çıkar, inenlerin yüzüne bakarım. Deliliktir, biliyorum. Ama aramayı bırakan adam, Arif, bir yanıyla kendini de gömer.',
        'Fincanını kaldırıp mangalın üstüne koyuyor. Sabri\'nin işini bitir, diyor. Sonra o fotoğrafın arkasındaki damgaya bak. Manastır, Fotoğrafhane-i Hilal. Bir dükkânın adı. Dükkânların defteri olur.',
      ],
      secenekler: [
        {
          etiket: 'Bulursam sana da haber vereceğim kaptan.',
          etki: { artir: { suleymanBag: 1 }, bayrak: { aramaSozu: true } },
          sonra: 'karar',
        },
        { etiket: 'Başını salla. Konuşacak gücün kalmadı.', sonra: 'karar' },
      ],
    },
    karar: {
      baslik: 'Karar',
      paragraflar: ['Belge cebinde. Ağır. Ne yapacaksın?'],
      secenekler: [
        { etiket: 'Belgeyi İngiliz askerî polisine götür. Silahlar onların şehrine iniyor.', etki: { bayrak: { karar1: 'ingiliz' } }, sonra: 'son_ingiliz' },
        { etiket: 'Süleyman\'ın güvendiği eski bir polise götür.', etki: { bayrak: { karar1: 'polis' } }, sonra: 'son_polis' },
        { etiket: 'Belgeyi sakla. Bu işi kendin çözeceksin.', etki: { bayrak: { karar1: 'sakla' } }, sonra: 'son_sakla' },
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
      paragraflar: (d) => [
        'Gece yarısı Kalafatçı Hanı\'ndaki odana dönüyorsun. Merdiven gıcırdıyor. Kapının önünde durup dinliyorsun; savaştan kalma bir alışkanlık.',
        'Kapının altında katlanmış bir kâğıt var. Kalın, pahalı kâğıt. Lavanta kokuyor.',
        'İçinde tek bir satır, düzgün bir Türkçeyle: ' +
          (bayrak(d, 'karar1') === 'ingiliz'
            ? 'Doğru kapıyı çaldığını sanıyorsun. Öyle değil.'
            : bayrak(d, 'karar1') === 'polis'
              ? 'Yaşlı adamlar uzun yaşamaz. Bulduğunu geri ver.'
              : 'Bulduğunu geri ver. Süleyman\'ın kayıkhanesi yanmasın.'),
        'Altında, mürekkeple basılmış: kanatlı bir anahtar.',
        sayi(d, 'travma') >= 2
          ? 'Ellerin titriyor. Uzun zamandır ilk kez, savaşın bittiğinden emin değilsin.'
          : 'Kâğıdı katlayıp cebine koyuyorsun. Korkuyorsun; ama bu korku tanıdık. Ne yapacağını bilen bir korku.',
        'Birinci bölümün sonu.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_oda',
      ortamOran: 0.5,
      baslik: 'Birinci bölüm bitti',
      paragraflar: [
        'Verdiğin kararlar kaydedildi: Sabri\'nin ölümünü nasıl karşıladığın, kime güvendiğin ve belgeyi ne yaptığın. Hikâye ikinci bölümde, ertesi sabah sürüyor.',
      ],
      secenekler: [
        { etiket: 'İkinci bölüme geç', sonrakiBolum: 'bolum2' },
        { etiket: 'Ana menüye dön', anaMenu: true },
      ],
    },
  },

  // -------------------------------------------------------------------------
  // Mekânlar
  // -------------------------------------------------------------------------
  mekanlar: {
    rihtim: {
      ad: 'Karaköy rıhtımı',
      tarif: (d) =>
        !bayrak(d, 'cesetGitti')
          ? 'Sis hâlâ kalkmadı. Leventis vapurunun kara gövdesi rıhtımın yanında yükselip alçalıyor. Sudan çıkarılan ceset, bir brandanın altında taşların üstünde yatıyor. Hamallar uzaktan bakıp fısıldaşıyor.'
          : 'Rıhtımda iş yeniden başladı: vinçler, zincirler, hamalların nara sesleri. Sabri\'nin yattığı yerde taşlar hâlâ ıslak.',
      nesneler: [
        {
          id: 'bilekler',
          etiket: 'Cesedin bilekleri',
          kosul: (d) => !bayrak(d, 'cesetGitti'),
          incele: 'Brandayı kaldırıp Sabri\'nin kollarını çeviriyorsun. Soğuk, ağır kollar. İki bileğinde de ince, morarmış bir şerit var; kenarları sıyrılmış. Böyle iz, ip birkaç saat sıkıca bağlı kalırsa olur. Sarhoş adam düşerken elini bağlamaz.',
          etki: { delil: ['ip_izi'] },
        },
        {
          id: 'yuz',
          etiket: 'Cesedin yüzü',
          kosul: (d) => !bayrak(d, 'cesetGitti'),
          incele: 'Sabri\'nin yüzü sakin, neredeyse uyuyor gibi. Dudakları mavi. Seddülbahir\'de kıyıya vuran boğulmuşları hatırlıyorsun: ağızlarında, burunlarında köpük olurdu, pembe ve ince. Sabri\'de hiçbiri yok. Suya girdiğinde nefes almıyordu.',
          etki: { delil: ['kopuk_yok'] },
        },
        {
          id: 'eller',
          etiket: 'Cesedin elleri',
          kosul: (d) => !bayrak(d, 'cesetGitti'),
          incele: 'Ateşçi elleri: nasırlı, kömür karası. Ama tırnaklarının altında kömürden başka bir şey var: kırmızı, kırılgan kırıntılar. Birini tırnağınla alıp ovuşturuyorsun; mum. Mühür mumu. Sabri ölmeden önce mühürlü bir şeyi açmış.',
          etki: { delil: ['mum'] },
        },
        {
          id: 'leventis',
          etiket: 'Leventis vapuru',
          incele: (d) =>
            delilVar(d, 'manifest')
              ? 'Leventis. Kırk sandık yedek parça. Ambar kapakları kapalı, iskelenin başında bir İngiliz nöbetçi. Sandıklar inmeden önce ne olacağını bilmiyorsun.'
              : 'Pire\'den gelen kara gövdeli bir yük vapuru. Bacasında beyaz bir şerit. Sabri burada ateşçiydi; kazanların başında, gemi karnının en sıcak yerinde. İskelenin başında bir İngiliz nöbetçi duruyor.',
        },
        {
          id: 'komur',
          etiket: 'Kömür yığınının başındaki hamallar',
          incele: (d) =>
            bayrak(d, 'hamalSoylenti')
              ? 'Hamallar işlerine döndü. Sabri\'nin adı geçince susuyorlar.'
              : 'Yanlarına çömeliyorsun. Biri tütününü uzatıyor. Sabri\'den konuşuyorlar, alçak sesle. Biri dün akşam onu kömürlükten çıkarken görmüş: beti benzi atmıştı, diyor, sanki hortlak görmüş gibi. Kimseyle konuşmadan Süleyman Kaptan\'ın kayıkhanesine gitmiş.',
          etki: { bayrak: { hamalSoylenti: true } },
        },
      ],
      kisiler: ['husnu', 'nobetci'],
      gecisler: [
        { hedef: 'kayikhane', etiket: 'Süleyman Kaptan\'ın kayıkhanesine git' },
        { hedef: 'buro', etiket: 'Liman kayıt bürosuna git', kosul: (d) => bayrak(d, 'gulceOnerildi') },
        { hedef: 'han', etiket: 'Tophane\'ye, Kalafatçı Hanı\'na git', kosul: (d) => bayrak(d, 'hanOgrenildi') },
      ],
    },

    kayikhane: {
      ad: 'Süleyman Kaptan\'ın kayıkhanesi',
      tarif: 'Rıhtımın ucunda, yarısı suya basan eski bir kayıkhane. Tahta duvarlara dalgalar vuruyor, mangalda kahve kaynıyor. Duvarda paslı bir pusula, köşede halatlar. Kokusu katran ve kahve.',
      nesneler: [
        {
          id: 'denk',
          etiket: 'Sabri\'nin denki',
          kosul: (d) => bayrak(d, 'denkVerildi'),
          incele: (d) =>
            delilVar(d, 'belge')
              ? 'Denkte bir kat yedek çamaşır, küçük bir dua kitabı ve boş tütün tabakası kaldı.'
              : 'Kalın bezden bir denizci denki. İçinde bir kat yedek çamaşır, kenarları yıpranmış küçük bir dua kitabı ve teneke bir tütün tabakası. Tabaka, tütün için fazla ağır.',
          etki: (d) => (delilVar(d, 'belge') ? null : { delil: ['belge', 'kanatli_anahtar'], sahne: 'belge' }),
        },
        {
          id: 'pusula',
          etiket: 'Duvardaki pusula',
          incele: 'Paslı pirinç bir pusula. İbresi titreyerek kuzeyi gösteriyor. Süleyman bunu batan bir gemiden almış; denizden yanına aldığı tek şey. Neden hiç sormadın, bilmiyorsun. Bazen insanın elinde yalnızca yönü kalır, demişti bir gece.',
        },
      ],
      kisiler: ['suleyman'],
      gecisler: [{ hedef: 'rihtim', etiket: 'Rıhtıma dön' }],
    },

    buro: {
      ad: 'Liman kayıt bürosu',
      ilkSahne: null,
      tarif: 'Gümrük binasının arkasında, tavanı yüksek, soğuk bir oda. Kâğıt ve mürekkep kokuyor. Kalemler cızırdıyor, bir köşede soba tıkırdıyor. Uzun masanın ucunda, yük defterlerinin arasında genç bir kadın çalışıyor.',
      nesneler: [
        {
          id: 'defter',
          etiket: 'Yük defteri',
          kosul: (d) => sayi(d, 'gulceGuven') >= 2,
          incele: 'Gülce defteri senin için çeviriyor. Leventis: Pire\'den, Kasım sonu. Alıcı: Ferrante ve Ortakları, Galata. Yük: makine yedek parçası, kırk sandık. Armatör: Pendle Shipping, Pire. Gülce omuz silkiyor: İngiliz bir efendi; gemilerinin yarısı Pire\'den, yarısı İskenderiye\'den gelir, hiçbirine kendisi binmez. Altında bir imza ve dün tarihli bir silinti: biri bir rakamı kazıyıp yeniden yazmış.',
          etki: { delil: ['manifest'] },
        },
        {
          id: 'vinc',
          etiket: 'Vinç defteri',
          kosul: (d) => delilVar(d, 'manifest'),
          incele: 'Vinççibaşının kaba el yazısı. Leventis\'ten iskeleye alınan ilk on sandık: her biri iki adam ağırlığında. Gülce parmağını satıra koyuyor: O boyda bir sandıkta yedek parça olsa bunun yarısı çekmez, diyor. Ben on yıldır bu defterleri tutuyorum.',
          etki: { delil: ['agirlik'] },
        },
      ],
      kisiler: ['gulce'],
      gecisler: [{ hedef: 'rihtim', etiket: 'Rıhtıma dön' }],
    },

    han: {
      ad: 'Kalafatçı Hanı, Tophane',
      tarif: 'Yokuşun ortasında, taş avlulu, iki katlı bir bekâr hanı. Avluda bir çeşme şırıldıyor, yukarıdan biri öksürüyor. Kalafat ziftinin ve ıslak yünün kokusu. Kapının yanında, küçük bir tezgâhın arkasında hancı oturuyor.',
      nesneler: [],
      kisiler: ['ohannes'],
      gecisler: [
        { hedef: 'oda', etiket: 'Sabri\'nin odasına çık', kosul: (d) => bayrak(d, 'odaAnahtari') },
        { hedef: 'rihtim', etiket: 'Rıhtıma dön' },
      ],
    },

    oda: {
      ad: 'Sabri\'nin odası',
      tarif: 'Dar bir oda. Biri burayı senden önce aramış: döşeğin yanı yarılmış, saman yere saçılmış, sandığın kapağı açık. Pencereden Boğaz görünüyor; camın çatlağından soğuk sızıyor.',
      nesneler: [
        {
          id: 'doseme',
          etiket: 'Yarılmış döşek',
          incele: 'Döşek baştan sona bıçakla yarılmış; titiz, düz bir kesik. Aceleci bir hırsız değil bu. Ne aradığını bilen biri.',
        },
        {
          id: 'pervaz',
          etiket: 'Pencere pervazı',
          incele: (d) =>
            delilVar(d, 'mektup')
              ? 'Gevşek tahtanın altındaki boşluk şimdi boş.'
              : 'Pervazın altındaki tahta oynuyor. Arayan adam pencereye hiç dokunmamış; demek ki denizci alışkanlıklarını bilmiyor. Tahtayı kaldırıyorsun. Altında katlanmış bir kâğıt: Sabri\'nin el yazısı.',
          etki: (d) => (delilVar(d, 'mektup') ? null : { delil: ['mektup'], sahne: 'mektup' }),
        },
        {
          id: 'sandik',
          etiket: 'Açık sandık',
          incele: 'Birkaç gömlek, bir çift yamalı çorap, annesinden kalma olduğu belli bir tespih. Hepsi yere dökülüp yeniden içine atılmış.',
        },
      ],
      kisiler: [],
      gecisler: [{ hedef: 'han', etiket: 'Avluya in' }],
    },
  },

  // -------------------------------------------------------------------------
  // Kişiler ve konuşmalar
  // -------------------------------------------------------------------------
  kisiler: {
    suleyman: {
      ad: 'Süleyman Kaptan',
      giris: (d) => {
        if (!ucDelilCesette(d)) return 'once';
        if (!bayrak(d, 'denkVerildi')) return 'anlat';
        return 'sonra';
      },
      dugumler: {
        once: {
          soz: 'Daha bakmadın mı ona, evlat? Git. Araba gelirse götürürler, bir daha göremeyiz.',
          secenekler: [{ etiket: 'Gidiyorum.' }],
        },
        anlat: {
          soz: 'Gördün mü? Söyle bana.',
          secenekler: [
            {
              etiket: 'Bilekleri bağlanmış, ağzında köpük yok, tırnaklarında kırmızı mum. Sabri boğulmamış, kaptan. Öldürülmüş.',
              sonra: 'yas',
            },
            { etiket: 'Bir şey belli değil. Ama kaza değil, eminim.', sonra: 'yas' },
          ],
        },
        yas: {
          soz: [
            'Süleyman uzun bir süre bir şey demiyor. Mangalın közüne bakıyor. Sonra gözlerini siliyor, yavaşça.',
            'Dün gece geldi buraya, diyor. Beti benzi atmıştı. Elinde denki vardı. Bunu sende tut kaptan, kimse sorarsa bende değil de, dedi. Sonra çıktı gitti. Sormadım. Sormam gerekirdi.',
          ],
          secenekler: [
            {
              etiket: 'Denki görebilir miyim?',
              etki: { bayrak: { denkVerildi: true, hanOgrenildi: true } },
              cevap: 'Süleyman köşedeki halatların arasından kalın bezden bir denk çıkarıp önüne koyuyor. Odası Tophane\'de, Kalafatçı Hanı\'ndaydı, diyor. Hancı Ohannes Usta iyi adamdır, benim adımı ver.',
            },
            { etiket: 'Sabri nasıl biriydi?', sonra: 'sabri' },
          ],
        },
        sabri: {
          soz: 'Trabzonluydu. Babası Karadeniz\'de batan bir motorla gitti, o zaman on iki yaşındaydı. Ben aldım yanıma. Ateşçi oldu, iyi ateşçi; kazanın sesinden derdini anlardı. Bir kız kardeşi var memlekette, ona para yollardı. Oruç tutardı, içki içmezdi, kimseye kötü söz söylemezdi. Böyle adam öldürülür mü Arif?',
          secenekler: [
            {
              etiket: 'Öldürülür kaptan. Savaşta en çok onlar öldü. Denki görebilir miyim?',
              etki: { bayrak: { denkVerildi: true, hanOgrenildi: true }, artir: { suleymanBag: 1 } },
              cevap: 'Süleyman köşedeki halatların arasından kalın bezden bir denk çıkarıp önüne koyuyor. Odası Tophane\'de, Kalafatçı Hanı\'ndaydı, diyor. Hancı Ohannes Usta iyi adamdır, benim adımı ver.',
            },
          ],
        },
        sonra: {
          soz: (d) =>
            delilVar(d, 'belge') && !bayrak(d, 'gulceOnerildi')
              ? 'O kâğıttaki sandıklar, tarihler... Gemi kayıtlarına bakmak lazım. Liman bürosunda Gülce Hanım var; defterleri o tutar. Kimseye kolay güvenmez, ama benim adımı verirsen seni dinler.'
              : 'Ne buldun evlat? Bir kahve iç, otur biraz.',
          secenekler: [
            {
              etiket: 'Gülce Hanım\'a gideceğim.',
              kosul: (d) => delilVar(d, 'belge') && !bayrak(d, 'gulceOnerildi'),
              etki: { bayrak: { gulceOnerildi: true } },
              cevap: 'Gümrük binasının arkasındaki büro. Sabah erken git, kalabalık olmadan.',
            },
            {
              etiket: 'Kanatlı anahtar sana bir şey söylüyor mu?',
              kosul: (d) => delilVar(d, 'kanatli_anahtar') && !bayrak(d, 'suleymanAnahtar'),
              etki: { bayrak: { suleymanAnahtar: true } },
              sonra: 'sonra',
              cevap: 'Süleyman başını sallıyor. Hayır. Ama kırk yıl limanlarda dolaştım; Selanik\'te, İskenderiye\'de, Marsilya\'da bazı tüccarlar vardı, kimse onlara kim olduklarını sormazdı. Bir yüzükte, bir mühürde böyle küçük işaretler taşırlardı. Belki aynısıdır, belki değil.',
            },
            {
              etiket: 'Sana bir şey sormak istiyorum: beni neden bu limana aldın?',
              kosul: (d) => !bayrak(d, 'suleymanNeden'),
              etki: { bayrak: { suleymanNeden: true }, artir: { suleymanBag: 1 } },
              sonra: 'sonra',
              cevap: 'Süleyman gülümsüyor, ilk kez bugün. İlk geldiğinde iskeleye oturmuş, iki saat denize baktın, diyor. Kimseye bir şey sormadın, kimseden bir şey istemedin. Öyle bakan adamı tanırım. Ben de bir zaman öyle baktım.',
            },
            { etiket: 'Sonra konuşuruz.' },
          ],
        },
      },
    },

    husnu: {
      ad: 'Kayıkçı Hüsnü',
      giris: (d) => (bayrak(d, 'husnuAnlatti') ? 'sonra' : bayrak(d, 'husnuKustu') ? 'kus' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'İhtiyar bir kayıkçı, sandalının içinde küreklerini bağlıyor. Seni görünce başını kaldırmıyor. Bir şey görmedim, bir şey bilmem, diyor sen bir şey sormadan.',
          secenekler: [
            { etiket: 'Süleyman Kaptan gönderdi beni. Sabri onun evladı gibiydi.', sonra: 'anlatir', etki: { artir: { husnuGuven: 1 } } },
            { etiket: 'Cebinden birkaç kuruş çıkarıp sandalın kenarına koy.', sonra: 'anlatir' },
            { etiket: 'Yakasından tut. Gördüğünü söyle.', sonra: 'tehdit' },
          ],
        },
        tehdit: {
          soz: 'Yaşlı adam irkiliyor, yüzü kapanıyor. Bırak beni! Senin gibi kabadayıları çok gördüm. Hiçbir şey görmedim, dedim!',
          secenekler: [
            { etiket: 'Bırak. Özür dile.', sonra: 'ilk2' },
            { etiket: 'Bırak ve uzaklaş.', etki: { bayrak: { husnuKustu: true } } },
          ],
        },
        ilk2: {
          soz: 'Hüsnü yakasını düzeltiyor, homurdanarak. Kimin adamısın sen?',
          secenekler: [{ etiket: 'Süleyman Kaptan\'ın. Sabri onun evladı gibiydi.', sonra: 'anlatir' }],
        },
        kus: {
          soz: 'Hüsnü sana sırtını dönüyor.',
          secenekler: [
            { etiket: 'Kusura bakma. Süleyman Kaptan için soruyorum.', sonra: 'anlatir', etki: { bayrak: { husnuKustu: false } } },
            { etiket: 'Uzaklaş.' },
          ],
        },
        anlatir: {
          soz: [
            'Hüsnü etrafına bakıyor, sesini alçaltıyor.',
            'Gece üç sularıydı. Ben sandalda uyurum, soğukta uyku tutmaz. Işıksız bir motor geldi, Leventis\'in kıçına yanaştı. İki adam ağır bir çuval indirdiler. Çuval değildi o, biliyorsun. Biri Türkçe konuşuyordu ama Frenk ağzıyla; öbürüne sus, diyordu, sus.',
            'İngiliz devriyesi de geçti oradan. Fenerini yaktı, baktı, söndürdü, gitti. Bir şey görmedi. Ya da görmek istemedi.',
          ],
          secenekler: [
            {
              etiket: 'Teşekkür ederim, Hüsnü Reis.',
              etki: { delil: ['motor', 'fransiz_aksan'], bayrak: { husnuAnlatti: true } },
            },
          ],
        },
        sonra: {
          soz: 'Ben ne söylediysem söyledim. Kimseye benden duyduğunu deme.',
          secenekler: [{ etiket: 'Demem.' }],
        },
      },
    },

    nobetci: {
      ad: 'İngiliz nöbetçi',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'İskelenin başındaki genç asker tüfeğini göğsüne çekiyor ve bir şey bağırıyor. Mu-ve a-long! Kelimeleri anlamıyorsun ama elinin hareketi açık: uzaklaş. Gözleri yorgun; senden çok daha genç.',
          secenekler: [
            { etiket: 'Başınla selam ver ve uzaklaş.' },
            { etiket: 'Gemiyi göster: Sabri. Ateşçi. Ölü.', sonra: 'sabri' },
          ],
        },
        sabri: {
          soz: 'Asker bir an duraksıyor. Ateşçi kelimesini anlamıyor ama ölü yüzünü anlıyor. Omzunun üstünden gemiye bakıyor, sonra hızlıca başını sallıyor ve yine eliyle uzaklaş diyor. Bu sefer bağırmadan.',
          secenekler: [{ etiket: 'Uzaklaş.' }],
        },
      },
    },

    gulce: {
      ad: 'Gülce',
      giris: (d) => (sayi(d, 'gulceGuven') >= 2 ? 'guvenli' : bayrak(d, 'gulceTanisti') ? 'tekrar' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Kadın başını defterden kaldırıyor. Otuzlarının başında; kalem tutan parmakları mürekkepli, bakışı temkinli. Burası yük kaydı, diyor. Hamalların işi kapıda.',
          secenekler: [
            {
              etiket: 'Beni Süleyman Kaptan gönderdi. Sabri\'yi tanırdın belki; ateşçi.',
              etki: { artir: { gulceGuven: 2 }, bayrak: { gulceTanisti: true } },
              sonra: 'sabri',
            },
            {
              etiket: 'Leventis\'in sahibi adına geldim. Kayıtlara bakmam lazım.',
              etki: { bayrak: { gulceTanisti: true, gulceYalan: true } },
              sonra: 'yalan',
            },
          ],
        },
        yalan: {
          soz: 'Gülce kalemini bırakıyor. Leventis\'in sahibi Pire\'de, vekili de kürk mantolu bir bey, diyor. Sen hamalsın; ellerin kömür. Yalan söyleyen adamla konuşmam.',
          secenekler: [
            {
              etiket: 'Haklısın. Özür dilerim. Beni Süleyman Kaptan gönderdi; Sabri dün gece öldürüldü.',
              etki: { bayrak: { gulceGuven: 2 } },
              sonra: 'sabri',
            },
            { etiket: 'Çık.' },
          ],
        },
        tekrar: {
          soz: 'Yine mi sen?',
          secenekler: [
            {
              etiket: 'Doğrusunu söyleyeceğim: Süleyman Kaptan gönderdi. Sabri dün gece öldürüldü.',
              etki: { bayrak: { gulceGuven: 2 } },
              sonra: 'sabri',
            },
            { etiket: 'Çık.' },
          ],
        },
        sabri: {
          soz: [
            'Gülce\'nin kalemi havada kalıyor. Sabri mi? Kömür fişlerini getiren çocuk? Bir an gözlerini kapatıyor.',
            'Ne istiyorsun?',
          ],
          secenekler: [{ etiket: 'Leventis\'in yük kaydını görmem lazım.', sonra: 'guvenli' }],
        },
        guvenli: {
          soz: (d) =>
            bayrak(d, 'ferranteAnlatti')
              ? 'Gülce sesini alçaltıyor. Bir şey bulursan bana da söyle. Bu defterlere ben imza atıyorum.'
              : 'Gülce etrafına bakıyor; kâtipler başlarını kaldırmıyor. Defteri masaya açıyor. Bak ama dokunma, diyor. Bir şey daha var. Dün Ferrante\'den bir bey geldi; bir kaydı düzeltmek istedi. Vermedim. Sandıkların mühürlerini de gördüm: hepsi kırmızı mumla mühürlü. Yedek parçaya mum basan görmedim.',
          secenekler: [
            {
              etiket: 'Ferrante\'nin adamı nasıl biriydi?',
              kosul: (d) => !bayrak(d, 'ferranteAnlatti'),
              etki: { delil: ['ferrante_muhur'], bayrak: { ferranteAnlatti: true } },
              sonra: 'guvenli',
              cevap: 'Temiz paltolu, eldivenli. Türkçesi düzgün ama yabancı. Kokusu lavanta. Bana gülümsedi; o gülümsemeyi sevmedim.',
            },
            {
              etiket: 'Sabri\'de bulunan belgedeki işareti çizerek göster: kanatlı bir anahtar.',
              kosul: (d) => delilVar(d, 'kanatli_anahtar') && bayrak(d, 'ferranteAnlatti') && !delilVar(d, 'ferrante_damga'),
              sonra: 'isaret',
            },
            { etiket: 'Teşekkür ederim, Gülce Hanım.' },
          ],
        },
        isaret: {
          soz: [
            'Gülce çizdiğin işarete bakıyor ve rengi atıyor. Hiçbir şey demeden çekmeceden bir mektup çıkarıyor: Ferrante ve Ortakları\'nın antetli kâğıdı, dünkü düzeltme isteği.',
            'Köşesini gösteriyor. Neredeyse görünmeyecek kadar küçük, kabartma: kanatlı bir anahtar.',
            'Bu işareti daha önce de gördüm, diyor fısıltıyla. Başka bir yerde. Ama nerede olduğunu sana söyleyemem. Şimdilik.',
          ],
          secenekler: [
            {
              etiket: 'Sana güveniyorum. Belgeyi anlatayım.',
              etki: { delil: ['ferrante_damga'], bayrak: { gulceyeAnlatti: true }, artir: { gulceGuven: 1 } },
              cevap: 'Anlattıkça Gülce\'nin yüzü sertleşiyor. Siyakatı okuyabilecek birini tanıyorum, diyor sonunda. Ama önce bu kâğıdın bir kopyasını çıkar. Asıl kâğıt kimin cebindeyse, o ölür.',
            },
            {
              etiket: 'Sorma. Bilmemen senin için daha iyi.',
              etki: { delil: ['ferrante_damga'], bayrak: { gulceyeAnlatti: false } },
              cevap: 'Gülce dudaklarını sıkıyor. Peki, diyor. Ama ben de sana her şeyi söylemeyeceğim.',
            },
          ],
        },
      },
    },

    ohannes: {
      ad: 'Hancı Ohannes Usta',
      giris: (d) => (bayrak(d, 'odaAnahtari') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Yaşlı, kalın kaşlı bir adam. Tespihini bırakıp seni süzüyor. Oda mı arıyorsun evlat? Yer yok.',
          secenekler: [
            {
              etiket: 'Süleyman Kaptan gönderdi. Sabri\'nin odasını görmem lazım.',
              sonra: 'sabri',
            },
          ],
        },
        sabri: {
          soz: [
            'Ohannes Usta\'nın yüzü değişiyor. Sabri, diyor. Duydum. Allah rahmet eylesin; iyi çocuktu, kirasını hiç geciktirmezdi.',
            'Dün akşam biri geldi, onun kuzeniyim dedi. Temiz paltolu, lavanta kokulu bir efendi. Türkçesi düzgün ama yabancıydı. Bir gümüş mecidiye verdi, odaya çıktı, yarım saat kaldı. Kuzeni değildi o. Sabri\'nin kimi kimsesi Trabzon\'daydı.',
          ],
          secenekler: [
            {
              etiket: 'Odanın anahtarını verir misin?',
              etki: { delil: ['paltolu'], bayrak: { odaAnahtari: true } },
              cevap: 'Ohannes tezgâhın altından paslı bir anahtar çıkarıyor. Yukarıda, sağdan üçüncü kapı. Bir şey bulursan bana söyleme. Bilmek istemiyorum.',
            },
          ],
        },
        sonra: {
          soz: 'Yukarıda, sağdan üçüncü kapı. Ben bir şey görmedim.',
          secenekler: [{ etiket: 'Sağ ol usta.' }],
        },
      },
    },
  },
};

// Mektup sahnesi ayrı tanımlanır (fotoğraf sahnesine bağlanır)
BOLUM1.sahneler.mektup = {
  baslik: 'Sabri\'nin mektubu',
  paragraflar: [
    'Kâğıt bir mektup. Sabri\'nin iri, okul görmemiş harfleri. Yavaş yavaş, heceleyerek okuyorsun.',
    'Hatice kardeşim. Sana bu ay para yollayamadım, kusura bakma. Burada bir iş oldu, anlatamam ama içimde kalmasın diye yazıyorum.',
    'Kömürlükte, yedek parça diye yüklenen sandıklardan biri devrildi, kapağı kırıldı. İçi tüfek doluydu kardeşim. Yağlı kâğıda sarılmış, yepyeni tüfekler. Arasında deri bir çanta vardı. Çantadan birkaç kâğıt aldım, bir de resim. Neden aldım bilmiyorum. Allah affetsin.',
    'Kâğıtları Süleyman Reis\'e bırakacağım. O ne yapacağını bilir. Bu adamlar kimseye benzemiyor Hatice. Gülerek konuşuyorlar ama gözleri gülmüyor.',
    'Mektup burada bitiyor. Bir satır daha başlamış, yarım kalmış: Eğer bana bir şey olur',
  ],
  secenekler: [
    {
      etiket: 'Mektubu katlayıp göğüs cebine koy. Hatice\'ye bir gün sen götüreceksin.',
      etki: { delil: ['fotograf'], bayrak: { haticeSozu: true } },
      sonra: 'fotograf',
    },
    { etiket: 'Mektubu delillerin arasına koy. Şimdi duygunun sırası değil.', etki: { delil: ['fotograf'] }, sonra: 'fotograf' },
  ],
};
