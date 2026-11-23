// Paket 8C: gezegenlerden ve Tina'dan gelenlerin (Brom, Nerissa, Halvar, Elara, Tina) on kademe sahneleri.
// Biçim sahneA.js ile aynı. Tina'nın 8. kademesi romantik değildir: Resmi Koloni Bireyi ve Baş Danışman bağı.

export const SAHNE_C = {
  brom: {
    1: {
      b: `Soğuk örs`,
      m: [
        `Brom koloniye indiğinde kimseye selam vermiyor; doğruca dökümhaneye gidiyor, ocağın ağzına eğilip ateşin rengine bakıyor. Uzun bir süre sonra homurdanıyor: “Sıcaklık yetersiz. Körük zayıf.”`,
        `Seni fark edince başını hafifçe eğiyor, Filtra usulü kısa bir selam. “Demirci Brom. Konuşmayı sevmem Kaptan. Ama ocağı severim. Bu ocak da beni sevecek; zamanla.”`,
      ],
      s: [
        { e: `“Ocak senin. Neye ihtiyacın var?”`, c: `Brom'un gözlerinde bir şey kıpırdıyor: “Ağır cevher. Ve kimsenin işime karışmaması.”`, p: 18 },
        { e: `“Koloniye hoş geldin, Brom.”`, c: `Brom bir an duraksıyor. “Hoş... Uzun zamandır duymadım bunu.” Sonra ocağa dönüyor.`, p: 12 },
      ],
    },
    2: {
      b: `Gerçek kömür ve cevher`,
      m: [
        `“Filtra'da kükürtlü kara taşla çalışırdık,” diyor Brom. “Bu gezegende de olmalı. Ağır, kokan, kara. Getir, sana gerçek ateşi göstereyim.”`,
        `Taşları ocağa atıyor, körüğe asılıyor. Alev kırmızıdan turuncuya, turuncudan beyaza. Brom'un yüzünde ilk kez bir gülümseme belirip kayboluyor: “İşte. Artık konuşabiliriz.”`,
      ],
      s: [
        { e: `Körüğe sen de asıl.`, c: `Brom ritmini düzeltiyor: “Uzun çek, kısa bırak.” Birlikte çalışırken hiç konuşmuyorsunuz; gerek yok.`, p: 20 },
        { e: `“Bu ateşle ne dövebiliriz?”`, c: `“Her şeyi,” diyor Brom. “Ama önce ne dövmeyeceğimizi konuşacağız.” Sesi ağırlaşıyor.`, p: 15 },
      ],
    },
    3: {
      b: `Kırık damga`,
      m: [
        `Brom'un örsünün altında bir çekiç damgası duruyor: Filtra'nın yıldızlı çekici, ortasından çatlak. Sorunca uzun süre susuyor.`,
        `“Filtra'nın usta damgası,” diyor sonunda. “Bir ustaya hayatında bir kez verilir. Ben kırdım. Kendi elimle.” Damgayı geri koyuyor. “Neden, sonra. Bir gün belki.”`,
      ],
      s: [
        { e: `Üstelemeden damganın yanına bir kor koy.`, c: `Brom korun ışığında damgaya bakıyor: “Saygı gösterdin. Filtralıların bildiği bir şey.”`, p: 22 },
        { e: `“Kırık da olsa senin damgan.”`, c: `Brom başını sallıyor: “Kırık bir damga hâlâ bir damgadır. Haklısın.”`, p: 20 },
      ],
    },
    4: {
      b: `Torvok ile ortak dövüm`,
      m: [
        `Dökümhanede iki dev: Brom ve Torvok. Birinin elinde Filtra çekici, öbürünün Kaelith çekici. İlk başta birbirlerine kuşkuyla bakıyorlar; sonra Torvok kahkahayı basıyor: “Gel bakalım Filtralı, kim daha sert vuruyor!”`,
        `Saatler süren dövüşten bir şasi parçası çıkıyor: Kaelith katlaması, Filtra sertleştirmesi. Brom parçayı ışığa tutuyor, Torvok yanında nefes nefese. “Hiç böylesini görmedim,” diyor Brom. Torvok: “Ben de.”`,
      ],
      s: [
        { e: `“İki ustanın imzası.”`, c: `Brom ve Torvok parçanın iki yanına kendi damgalarını vuruyor. Brom'un kırık damgası bile yerini buluyor.`, p: 22, diger: { kim: `torvok`, p: 10 } },
        { e: `Parçayı ilk gemiye takın.`, c: `Brom başını sallıyor: “Uçsun. Bizden uzağa, bizden güçlü.”`, p: 18 },
      ],
    },
    5: {
      b: `Çelik mi, çip mi?`,
      m: [
        `Tina'nın sesi dökümhanenin hoparlöründen geliyor: “Brom, ısı eğrin yüzde dört sapmış; ocağı on derece düşürmeni öneriyorum.” Brom çekici örse vuruyor, ses dökümhaneyi dolduruyor.`,
        `“Makine bana ocak öğretemez!” diye gürlüyor. “Filtra'yı makineler yıktı Kaptan. Hesap yapan, vicdan yapmayan makineler.” Tina susuyor. İkisi de cevap bekliyor.`,
      ],
      s: [
        { e: `“Tina sadece yardımcı; karar senin.”`, c: `Brom homurdanıyor ama sakinleşiyor. Tina: “Anlaşıldı. Yalnızca soru sorulunca konuşacağım.” Bir köprü kuruldu.`, p: 22, diger: { kim: `tina`, p: 10 } },
        { e: `“Eski usulde kalalım.”`, c: `Brom memnun. Tina'nın hoparlörü sessizce kapanıyor.`, p: 15, diger: { kim: `tina`, p: -15 } },
      ],
    },
    6: {
      b: `Filtra alaşımı`,
      m: [
        `Brom'un elinde bir kitap: el yazısı formüller, alaşım oranları. “Filtra'nın sırrı,” diyor. “Bunu yazdığım için sürgün edildim. Ferros-Omega'nın buzlu madenlerine.”`,
        `“Bir lord bu alaşımı istedi. Ben verdim. O lord da... onu kötü işlere kullandı.” Kitabı sana uzatıyor. “Ama artık doğru ellerde olacak. Filtra alaşımları senin için daha ucuz, daha güçlü.”`,
      ],
      s: [
        { e: `“Bu kitabı korumak benim sözüm.”`, c: `Brom uzun süre bakıyor: “Biliyorum. O yüzden verdim.” Filtra alaşımları artık daha ucuz.`, p: 25 },
        { e: `“Sürgünü anlatmak ister misin?”`, c: `“Soğuktu,” diyor Brom. “Ama ocaktan uzak olmak daha soğuktu.” Gülümsüyor, ilk kez gerçekten.`, p: 22 },
      ],
    },
    7: {
      b: `Oronte'nin gölgesi`,
      m: [
        `Gece, ocak sönük. Brom'un sesi hiç bu kadar alçak olmamıştı: “Tonoflenya'da Oronte. Benim zırhımı giyen askerleri bir köye yolladı. Masum bir köye.”`,
        `“Haberi alınca ustalık damgamı kendi elimle kırdım. Oronte'ye gittim, yüzüne söyledim: ‘Zırhım masumu korumak içindi.’ Beni sürgüne yolladı.” Çekici bırakıyor. “Hâlâ o köyün dumanını görüyorum Kaptan. Her ocakta.”`,
      ],
      s: [
        { e: `“Sen doğruyu söyledin; bedelini ödedin.”`, c: `Brom'un omuzları titriyor. “Ödedim. Ama yetmedi.” Sonra: “Sen dinledin. Bu bir şey.”`, p: 28 },
        { e: `“Bir gün Oronte'yle yüzleşeceğiz.”`, c: `Brom başını kaldırıyor, gözlerinde bir ateş: “Yanında olacağım Kaptan.”`, p: 25 },
      ],
    },
    8: {
      b: `Örs başında barış`,
      m: [
        `Brom seni dökümhaneye çağırıyor; yanında Tina'nın terminali açık. “Tina'ya bir şey sordum dün,” diyor. “Filtra alaşımını hesaplattım. Doğru buldu. Hiç sapma yok.”`,
        `“Belki bütün makineler aynı değildir.” Sonra sana dönüyor: “Kaptan, bir demirci hayatında bir kez yoldaş seçer. Ya bir ömür aynı ocağı paylaşırız. Ya da Demir Yoldaşlığı yemini ederiz: senin kalkanın benim çekicimden.”`,
      ],
      s: [
        { e: `Bir ömür aynı ocağı paylaşma yolunu aç.`, c: `Brom çekicini sana uzatıyor: “Bundan sonra iki el tutacak bunu.”`, p: 25, bayrak: { yp_brom: `es` } },
        { e: `Demir Yoldaşlığı yemini et.`, c: `Örse ellerinizi koyuyorsunuz. Tina'nın sesi: “Kayda geçti.” Brom ilk kez Tina'ya gülümsüyor.`, p: 25, bayrak: { yp_brom: `bag` }, diger: { kim: `tina`, p: 10 } },
      ],
    },
    9: {
      b: `Zırh ve araç güçlendirme`,
      m: [
        `Hangarda Mammoth ve Akrep'in üstünde yeni zırh tavları: Filtra katlaması, damga vurulmuş. Brom elinde bir kova su, son plakayı soğutuyor.`,
        `“Araçlarına ve savunmana ek zırh,” diyor. “Ücretsiz. Filtra ustası, yoldaşına fatura kesmez.”`,
      ],
      s: [
        { e: `“Bu zırhla herkesi koruyacağız.”`, c: `Brom başını sallıyor: “Masumu korumak için. Hep öyle olsun.”`, p: 20 },
        { e: `Ona bir kupa sıcak içki götür.`, c: `Brom kupayı alıyor: “Ocak başında ısınmak, en güzeli.”`, p: 18 },
      ],
    },
    10: {
      b: `Koruyucu damga`,
      m: [
        `Brom aylarca bir şema üzerinde çalıştı: bir kalkan, ama saldırı için değil, savunma için. Yüzeyine yeni bir damga vurdu: bir çekiç ve bir kalkan, ortasında küçük bir köy.`,
        `“Yeni damgam,” diyor. “Koruyucu Damga. Bundan sonra hiçbir zırhım masumun karşısına çıkmayacak.” Sesi titriyor.`,
        `“Tonoflenya'ya gittiğimizde Oronte'yle konuşacağım Kaptan. Öfkeyle değil. Bu kalkanla. Ona ne yapabileceğimizi göstereceğim.”`,
      ],
      s: [
        { e: `Kalkanı birlikte kaldırın.`, c: `Brom gülümsüyor; yüzündeki duman sonunda kalkmış gibi. Tonoflenya'da Oronte ile özel diyalog açıldı.`, p: 30, moral: 8 },
        { e: `“Filtra'nın en iyi ustası sensin.”`, c: `“Filtra'nın değil,” diyor Brom. “Bu koloninin.”`, p: 30, moral: 8 },
      ],
    },
  },

  nerissa: {
    1: {
      b: `Soğuk analiz`,
      m: [
        `Nerissa koloniye vardığı gün kimseyle konuşmuyor; revirin bilgisayarına bağlanıp sağlık verilerini tarıyor, iç denizden numune alıyor, bir defterine kısa notlar yazıyor.`,
        `Seni fark edince kalemini bırakıyor: “Dr. Nerissa Tide. Abisal biyoloji. Kolonideki üç kişi D vitamini eksik, iki kişinin nabzı düzensiz. Bunları Lyris'e ileteceğim.” Bir an duraksıyor. “Merhaba, Kaptan.”`,
      ],
      s: [
        { e: `“Verilerin için teşekkür ederim.”`, c: `Nerissa başını hafifçe eğiyor: “Veri, bir koloninin dilidir. Ben o dili konuşurum.”`, p: 18 },
        { e: `“Önce dinlen, sonra analiz.”`, c: `“Dinlenmek bir veridir de,” diyor kuru bir sesle. “Ama haklısın. Yarın.”`, p: 10 },
      ],
    },
    2: {
      b: `Hidro-termal örnek`,
      m: [
        `“Derin göldeki ısı menfezlerinden bir çamur örneği,” diyor Nerissa. “Thalassa'daki gibi biyo-çıkıntılar olabilir. Yaşam, sıcağın ve karanlığın buluştuğu yerde başlar.”`,
        `Örneği mikroskoba koyunca uzun süre bakıyor. Sonra sesi ilk kez heyecanla titriyor: “Kaptan... burada da var. Küçük, ama var. Bu gezegenin abisi de yaşıyor.”`,
      ],
      s: [
        { e: `“Ona zarar vermeden inceleyelim.”`, c: `Nerissa sana uzun uzun bakıyor: “Bunu söylemen... önemli.” Örneği dikkatle saklıyor.`, p: 22 },
        { e: `“Ne işe yarar?”`, c: `“Belki ilaç, belki hiçbir şey,” diyor. “Her şeyin bir işe yaraması gerekmez.”`, p: 12 },
      ],
    },
    3: {
      b: `Siren-0 kayıtları`,
      m: [
        `Nerissa bir kayıt açıyor: derin okyanusun sesleri. Uzun, yankılı çağrılar; balinaları andıran ama daha derin, daha garip. “Thalassa,” diyor. “Siren-0 projesi. İlk hafta bu sesleri dinlerken ağladım.”`,
        `“Okyanus konuşuyordu Kaptan. Canlılar birbirine şarkı söylüyordu. Biz de onları dinlemek için sonar kurduk. Başta sadece dinlemek için.” Kaydı kapatıyor. “Başta.”`,
      ],
      s: [
        { e: `“Bir kayıt daha aç.”`, c: `Nerissa şaşkınca bakıyor, sonra açıyor. Bu sefer birlikte dinliyorsunuz; uzun, huzurlu bir şarkı.`, p: 25 },
        { e: `“Sonra ne oldu?”`, c: `“Sonra,” diyor Nerissa, “başka bir gün.” Ama sorduğun için kızmıyor.`, p: 15 },
      ],
    },
    4: {
      b: `Lyris ile ortak laboratuvar`,
      m: [
        `Laboratuvarda iki hekim: Lyris, Malken bitkileriyle; Nerissa, abisal minerallerle. İlk başta ikisi de çekingen; sonra Lyris bir çay demliyor, Nerissa bir kayıt açıyor.`,
        `Gece yarısına kadar çalışıyorlar. Sabah masada yeni bir karışım: bitki özü, mineral tuzu, hafif mavimsi. “Bağışıklık güçlendirici,” diyor Nerissa. Lyris ekliyor: “İkimizin.”`,
      ],
      s: [
        { e: `“İki dünyanın bilimi.”`, c: `Nerissa ve Lyris birbirine bakıp gülümsüyor. Nerissa: “Bilim, iki kişiyken daha az yalnız.”`, p: 22, diger: { kim: `lyris`, p: 10 } },
        { e: `Karışımı ilk sen dene.`, c: `Nerissa hafifçe gülüyor: “Cesur bir denek.” Hiçbir yan etki yok; hafif bir sıcaklık.`, p: 18 },
      ],
    },
    5: {
      b: `İçgüdü mü, veri mi?`,
      m: [
        `Zarek bir geçitten haber getiriyor: “Rüzgâr değişti, ama geçmek güvenli; hissediyorum!” Nerissa sert bir sesle: “Hissetmek bir veri değil Zarek. Ölçüm yapmadan kimse o geçide girmesin.”`,
        `Zarek gülüyor: “Ölçüm yapana kadar fırtına gelir.” İkisi de sana dönüyor.`,
      ],
      s: [
        { e: `İkisini birleştir: Zarek'in sezgisi, Nerissa'nın hızlı ölçümü.`, c: `Nerissa bir an duraksıyor, sonra cihazını Zarek'e uzatıyor: “Hızlı bir tarama. Senin sezginle karşılaştıralım.” Zarek göz kırpıyor.`, p: 25, diger: { kim: `zarek`, p: 10 } },
        { e: `Nerissa haklı: önce ölçüm.`, c: `Nerissa memnun. Zarek sessizce geri çekiliyor.`, p: 18, diger: { kim: `zarek`, p: -10 } },
      ],
    },
    6: {
      b: `Antikor iksirleri`,
      m: [
        `Nerissa bir sıra şişe hazırlamış; her biri farklı bir zehre karşı. “Maden sporları, dış gezegen gazları, derin göl toksinleri. Thalassa'da öğrendim: abis her zaman bir zehir saklar.”`,
        `“Bu iksirleri yaparken eski notlarımı kullandım,” diyor. “Siren-0'dan. O projenin tek iyi mirası.” Sesi bir an kırılıyor, sonra düzeliyor.`,
      ],
      s: [
        { e: `“Kötü bir projeden iyi bir şey çıkardın.”`, c: `Nerissa gözlerini kapatıyor: “Öyle umuyorum.” Antikor iksirleri açıldı.`, p: 25 },
        { e: `İksirleri sefer çantasına koy.`, c: `Nerissa her birini tek tek etiketliyor: “Ne zaman, ne kadar. Hata payı yok.”`, p: 20 },
      ],
    },
    7: {
      b: `YGK dosyası`,
      m: [
        `Nerissa seni geceyarısı laboratuvara çağırıyor; kapıyı kilitliyor. Bir dosya açıyor, mühürlü: YGK.`,
        `“Siren-0 sonarı derin canlıların sinir ağlarına zarar veriyordu,” diyor, sesi neredeyse duyulmuyor. “Ben fark ettim. Raporu yazdım. YGK raporu gizledi, projeyi sürdürdü. Ben de... ben de sustum. Bir yıl. Bir yıl boyunca okyanus her gece daha az şarkı söyledi.”`,
        `Gözleri seninkilere kilitleniyor: “Cahelon'un sonar bilgisini neden sakladığımı herkes sordu. Bencillikten değil Kaptan. Bilimin bir kez daha körlemesine yıkıma alet olmasından korktum.”`,
      ],
      s: [
        { e: `Yargılamadan sorumluluğu paylaş: “Bu yükü artık birlikte taşırız.”`, c: `Nerissa'nın elleri titriyor. “Birlikte...” Dosyayı sana uzatıyor. “İlk kez biri bu dosyayı okudu ve gitmedi.”`, p: 30 },
        { e: `“Sustun ama şimdi konuşuyorsun.”`, c: `Nerissa uzun bir nefes alıyor: “Evet. Geç, ama konuşuyorum.”`, p: 25 },
      ],
    },
    8: {
      b: `Derin güven`,
      m: [
        `Nerissa iç denizin kıyısında, elinde bir kayıt cihazı. Denizin sesini kaydediyor. “Burada canlılar hâlâ şarkı söylüyor Kaptan. Ve ben artık yalnızca dinliyorum.”`,
        `Sana dönüyor: “Bilimi bir kez yanlış ellere verdim. Bundan sonra kime vereceğimi biliyorum. Ya hayatımızı birlikte sürdürürüz; ya da Bilim ve Vicdan Ortaklığı yemini ederiz: her keşfi önce sana getiririm.”`,
      ],
      s: [
        { e: `Hayatını onunla paylaşma yolunu aç.`, c: `Nerissa kayıt cihazını kapatıyor, elini tutuyor: “Bu sesi de kaydetmek istemiyorum. Sadece yaşamak.”`, p: 25, bayrak: { yp_nerissa: `es` } },
        { e: `Bilim ve Vicdan Ortaklığı yemini et.`, c: `Nerissa bir defterin ilk sayfasına yemini yazıyor; ikiniz de imzalıyorsunuz. “Vicdan, bilimin pusulası.”`, p: 25, bayrak: { yp_nerissa: `bag` } },
      ],
    },
    9: {
      b: `Cahelon sonarı`,
      m: [
        `Nerissa bir harita uzatıyor; abisal derinliklerin sonar taraması. “Cahelon ya da başka büyük bir tehdit yaklaşırsa,” diyor, “bu veriyi sana ilk ben vereceğim. Ücretsiz. Gecikmesiz.”`,
        `“Bir zamanlar bu bilgiyi sakladım. Artık saklamayacağım. Sana güveniyorum.”`,
      ],
      s: [
        { e: `“Bu güveni hak edeceğim.”`, c: `Nerissa başını sallıyor: “Zaten hak ettin.” Büyük tehditler öncesi sonar verisi açıldı.`, p: 22 },
        { e: `“Bu veri yalnızca korumak için kullanılacak.”`, c: `Nerissa gözlerini kapatıyor: “Tam da duymak istediğim.”`, p: 25 },
      ],
    },
    10: {
      b: `Sessiz okyanusun özrü`,
      m: [
        `Aylarca çalıştı: iç denizin dibine yerleştirilen bir sonar ağı. Ama Siren-0 gibi değil; canlıların frekanslarını bozmayan, onların şarkılarına uyum sağlayan bir ağ.`,
        `İlk kez açıldığında Nerissa kulaklığı sana uzatıyor. Denizin derinliklerinden bir şarkı: canlılar hâlâ söylüyor, ve ağ onlara eşlik ediyor, sanki bir koro gibi.`,
        `Nerissa ağlıyor ve gülüyor. “Thalassa'nın okyanusundan özür diledim Kaptan. Burada, bu denizle. Sanırım kabul etti.”`,
      ],
      s: [
        { e: `Kulaklığı birlikte dinleyin.`, c: `Saatlerce dinliyorsunuz. Koloni için kalıcı sağlık ve keşif bonusu açıldı.`, p: 30, moral: 10 },
        { e: `“Okyanus seni affetti.”`, c: `Nerissa fısıldıyor: “Belki. Ama ben de kendimi affettim. Senin sayende.”`, p: 30, moral: 10 },
      ],
    },
  },

  halvar: {
    1: {
      b: `Geiger tıkırtısı`,
      m: [
        `Halvar'ın kemerinde küçük bir Geiger sayacı; arada bir tıkırdıyor. Seni görünce başını kaldırmadan tek bir kelime: “Sızıntı yok.”`,
        `Bekliyorsun; başka bir şey demiyor. Sayaç bir kez daha tıkırdıyor. Halvar ona bakıyor, sonra sana: “Bu normal. Arka plan. Endişelenme.”`,
      ],
      s: [
        { e: `Başınla onayla, üstelemeden git.`, c: `Ertesi gün Halvar seni kendisi selamlıyor: “Sızıntı yok, Kaptan.” Bu sefer adını ekliyor; büyük bir adım.`, p: 18 },
        { e: `“Biraz konuşalım mı?”`, c: `Halvar bir süre bakıyor: “Konuşacak bir şey yok. Sızıntı yok.” Uzaklaşıyor.`, p: 3 },
      ],
    },
    2: {
      b: `Kurşun ve polimer yalıtım`,
      m: [
        `Halvar jeneratörün yanında, elinde bir ölçüm cihazı. “Yalıtım ince,” diyor. “Polimer levha ve biraz ağır metal. Yoksa beş yıl sonra burada çalışan herkes...” Cümleyi bitirmiyor.`,
        `Getirdiklerini kat kat jeneratörün çevresine sarıyor; her katta ölçüyor. Son katta sayaç susuyor. Halvar uzun bir nefes veriyor: “Şimdi güvenli.”`,
      ],
      s: [
        { e: `Sayacın sustuğunu birlikte dinle.`, c: `Halvar sana bakıyor: “Bu sessizlik... güzel değil mi?” Bir an neredeyse gülümsüyor.`, p: 20 },
        { e: `“Başka nereler riskli?”`, c: `Halvar bir liste çıkarıyor; on üç madde. “Sırayla,” diyor.`, p: 15 },
      ],
    },
    3: {
      b: `Kurşun-4 günlüğü`,
      m: [
        `Halvar bir gün sana kısa, kuru bir defter sayfası uzatıyor. Tarih, saat, birkaç kelime: “Sızıntı. Kapıları kilitledim. İçerideyim. Ekip dışarıda. Gün 1.”`,
        `“Radion-Kızıl,” diyor. “Kurşun-4 istasyonu. Birinin içeride kalıp vanaları kapatması gerekiyordu.” Sayfayı geri alıyor. “Ben kaldım. Konu bu kadar.”`,
      ],
      s: [
        { e: `“Ekibini kurtardın.”`, c: `Halvar bir an sana bakıyor, sonra başını çeviriyor: “Hepsini değil.” Sesi neredeyse duyulmuyor.`, p: 22 },
        { e: `Sayfayı nazikçe geri ver, bir şey deme.`, c: `Halvar sayfayı cebine koyuyor. “Teşekkürler,” diyor. Neye teşekkür ettiğini ikiniz de biliyorsunuz.`, p: 22 },
      ],
    },
    4: {
      b: `Kalkan bobini testi`,
      m: [
        `Halvar kalkan bobinlerini aşırı yük testine sokuyor: “Saldırı anında yüzde iki yüz yüke dayanmalı. Dayanmazsa içindekiler...” Yine cümleyi bitirmiyor.`,
        `Saatlerce birlikte çalışıyorsunuz: sen düğmeleri tutuyorsun, o ölçüyor. Bobin dayanıyor. Halvar sana ilk kez tam bir cümle kuruyor: “İyi bir yardımcısın Kaptan. Sakin.”`,
      ],
      s: [
        { e: `“Sen de iyi bir öğretmensin.”`, c: `Halvar şaşırıyor: “Öğretmen mi? Hiç düşünmedim.” Ama yüzü biraz yumuşuyor.`, p: 20 },
        { e: `Bir test daha öner.`, c: `Halvar bu kez gerçekten gülümsüyor: “Temkinlisin. Hoşuma gitti.”`, p: 22 },
      ],
    },
    5: {
      b: `Sessizlik mi, şarkı mı?`,
      m: [
        `Halvar'ın başı ağrıyor; reaktör odasının yanında Julian akşam provası yapıyor. “Alarm sesleri müzikle karışıyor,” diyor Halvar, gözleri kapalı. “Bir gün bir sızıntıyı kaçıracağım.”`,
        `Julian özür dileyen bir gülümsemeyle: “Ama koloni de müziğe ihtiyaç duyuyor.” İkisi de sana bakıyor.`,
      ],
      s: [
        { e: `Anlayışlı çözüm: alarm ışıklı ve titreşimli olsun, provalar tavernada.`, c: `Halvar başını sallıyor: “Titreşimli alarm... Julian için de iyi olur.” Julian şaşkınca bakıyor; Halvar biliyor.`, p: 28, diger: { kim: `julian`, p: 15 }, moral: 3 },
        { e: `Reaktör yanında müzik yasak.`, c: `Halvar rahatlıyor. Julian sessizce gidiyor.`, p: 18, diger: { kim: `julian`, p: -10 } },
      ],
    },
    6: {
      b: `İlk kahve`,
      m: [
        `Halvar kalkan sistemine son dokunuşu yapıyor; şarj hızı biraz arttı. Sonra garip bir şey oluyor: sana bir kupa kahve uzatıyor.`,
        `“Nöro kahve,” diyor. “Radion'da her vardiya sonu içerdik. Kurşun-4'ten sonra içmedim.” Bir yudum alıyor. Ve gülümsüyor; gerçek, yavaş bir gülümseme. “Tadı hâlâ aynı.”`,
      ],
      s: [
        { e: `Kupanı onunkine değdir.`, c: `Halvar bir an şaşırıyor, sonra kupasını kaldırıyor: “Sızıntısız günlere.” Kalkan şarj hızı arttı.`, p: 25 },
        { e: `“Bundan sonra her vardiya sonu kahve.”`, c: `“Söz mü?” diyor Halvar. “Söz.” Bu onun için bir yemin kadar ağır.`, p: 25 },
      ],
    },
    7: {
      b: `Kurtulanların suçu`,
      m: [
        `Gece reaktör odasında Halvar'ı oturur buluyorsun; Geiger sayacı elinde, ama kapalı. “Bir şey söylemem gerek Kaptan,” diyor. “Kurşun-4'te ekibimden biri, Tarn... hiç çıkamamış. Ben dışarıda sanıyordum.”`,
        `“Kurtulduktan sonra öğrendim. Şimdi bazen koridorlarda onun sesini duyuyorum. ‘Halvar, kapıyı aç.’ Bazen gece kalkıp kapıları kontrol ediyorum. Hayalet sesler Kaptan. Deliriyor muyum?”`,
      ],
      s: [
        { e: `“Delirmiyorsun. Yas tutuyorsun.”`, c: `Halvar'ın yüzü çözülüyor, ilk kez ağlıyor. “Yas... Kimse bu kelimeyi kullanmadı.”`, p: 30 },
        { e: `“Lyris ve Sira-Vel'le konuşalım; yalnız değilsin.”`, c: `Halvar başını sallıyor: “Birlikte mi gelirsin?” “Evet.” “Tamam.”`, p: 25, diger: { kim: `lyris`, p: 5 } },
      ],
    },
    8: {
      b: `Karanlıktan çıkış`,
      m: [
        `Halvar seni reaktörün kontrol odasına çağırıyor; yanında Marcus ve Kaelon, şahit olarak. “Kurşun-4'te kapıları içeriden kilitledim,” diyor. “Bugün bir kapıyı dışarıdan açmak istiyorum.”`,
        `Sana dönüyor: “Ya hayatımızı birlikte sürdürürüz Kaptan. Ya da Kalkan Kardeşliği: Marcus ve Kaelon şahit, her tehlikede birbirimizin önüne geçeriz.”`,
      ],
      s: [
        { e: `Hayatını onunla paylaşma yolunu aç.`, c: `Halvar Geiger sayacını kapatıp sana uzatıyor: “Artık buna ihtiyacım yok. Seninle güvendeyim.”`, p: 25, bayrak: { yp_halvar: `es` } },
        { e: `Kalkan Kardeşliği yemini et.`, c: `Marcus selam veriyor, Kaelon başını eğiyor. Halvar elini omzuna koyuyor: “Kardeşim.”`, p: 25, bayrak: { yp_halvar: `bag` }, diger: { kim: `marcus`, p: 5 } },
      ],
    },
    9: {
      b: `Ücretsiz izotop verimi`,
      m: [
        `Halvar reaktörün bütün borularını yeniden döşemiş; izotop kaybı neredeyse sıfır. “Radion'da yüzde onunu kaybederdik,” diyor. “Burada hiç. Her izotop koloniye.”`,
        `Kahvesini uzatıyor: “Vardiya sonu.” Artık bu küçük ritüel, ikinizin sessiz sözü.`,
      ],
      s: [
        { e: `Kahveni iç, beraber otur.`, c: `Hiç konuşmuyorsunuz. Gerek yok. İzotop kaybı artık neredeyse yok.`, p: 20 },
        { e: `“Sen olmasan reaktör olmazdı.”`, c: `Halvar omuz silkiyor ama gözleri parlıyor: “Sen olmasan ben olmazdım.”`, p: 22 },
      ],
    },
    10: {
      b: `Temiz gökyüzü`,
      m: [
        `Gözlem tepesi, gece. Halvar elinde Geiger sayacı; yıllardır hiç kapatmadığı. Gökyüzüne bakıyor, sonra sayaca.`,
        `Ve kapatıyor. Tıkırtı susuyor. Rüzgârın sesi, çanların tınısı, yıldızların sessizliği; başka hiçbir şey.`,
        `“Kurşun-4'ten beri ilk kez,” diye fısıldıyor. “Gökyüzünü sadece dinliyorum.” Sayacı yere bırakıyor. Uzun süre konuşmuyor. Sonunda: “Tarn bu sesi severdi.”`,
      ],
      s: [
        { e: `Yanına uzan, gökyüzünü birlikte dinleyin.`, c: `Sabaha kadar kalıyorsunuz. Halvar ilk kez rüyasız uyuyor. Kalıcı kalkan ve güvenlik bonusu.`, p: 30, moral: 8 },
        { e: `“Tarn'ın adını bu tepeye yazalım.”`, c: `Halvar bir taşa adı kazıyor. “Artık burada,” diyor. “Karanlıkta değil, yıldızların altında.”`, p: 30, moral: 10 },
      ],
    },
  },

  elara: {
    1: {
      b: `Kronometre`,
      m: [
        `Elara konuşurken bile bileğindeki saate bakıyor; ayak tapıyor, bir yerden bir yere geçiyor. “Pilot Elara, Kaptan! Hangarda iki araç bakım bekliyor, rota hesaplanmalı, yakıt kontrol edilmeli; ne zaman başlıyoruz?”`,
        `Cevap vermeden önce bir kez daha saate bakıyor. Sonra sana: “Kısa cevap lütfen. Zaman kıymetli.”`,
      ],
      s: [
        { e: `“Şimdi. Git.”`, c: `Elara sırıtıyor: “İşte bu!” Rüzgâr gibi uzaklaşıyor.`, p: 18 },
        { e: `“Önce biraz dinlen, acele yok.”`, c: `Elara durup sana bakıyor, kaşları çatık: “Acele hep var.” Saatine bakıp gidiyor.`, p: 5 },
      ],
    },
    2: {
      b: `Yakıt ve hız kalibrasyonu`,
      m: [
        `Hangarda Elara, Atmosphere-X'in motoruna eğilmiş. “Graviton yakıtı lazım. Biraz, ama saf. Motor düzgün kalibre olursa yüzde on beş daha hızlı.”`,
        `Getirdiğin yakıtı dolduruyor, motoru çalıştırıyor, kronometresiyle ölçüyor. “Yüzde on altı!” diye bağırıyor. “Bir puan fazla! Kaptan, sen uğurlusun.”`,
      ],
      s: [
        { e: `“Sen ustasın.”`, c: `Elara kızarıyor: “Usta mı? Ben sadece hızlıyım.” Ama memnun.`, p: 20 },
        { e: `Bir tur birlikte uçun.`, c: `Hangarın üstünde kısa, baş döndürücü bir tur. Elara kahkahalarla iniyor: “Bir pilot gibi bağırdın!”`, p: 22 },
      ],
    },
    3: {
      b: `Kaybolan on beş yıl`,
      m: [
        `Elara bir gün tek nefeste anlatıyor, sanki yavaşlarsa hikâye kaçacakmış gibi: “Chronos-Döngü, rutin keşif, bir anomali, motor stop, kokpitte bir gün, bir gün sadece Kaptan, bir gün.”`,
        `“Çıktığımda dışarıda on beş yıl geçmişti. Annem ölmüş, kardeşim evlenmiş, arkadaşlarımın çocukları benden büyük. Benim için dün, onlar için yirmi yıl önce.” Nefes alıyor, ilk kez. “O yüzden acele ediyorum. Bir an durursam yine her şey kaçacak.”`,
      ],
      s: [
        { e: `“Burada zaman kaçmıyor; seninle birlikte.”`, c: `Elara durup sana bakıyor; uzun bir süre. Kronometresi tik tak ediyor. “Birlikte mi?” Sonra fısıldıyor: “Bunu düşünmedim.”`, p: 25 },
        { e: `Bir şey deme; sadece yanında dur.`, c: `Elara ilk kez hiçbir yere gitmiyor. Yanında duruyor. Bir dakika. İki. “Garip,” diyor. “Hiçbir şey kaçmadı.”`, p: 25 },
      ],
    },
    4: {
      b: `Hızlı rota haritası`,
      m: [
        `Elara ve Zarek bir haritanın üstünde; Elara kronometreyle süre hesaplıyor, Zarek rüzgârın sesini anlatıyor. İlk başta ikisi birbirini anlamıyor; sonra Elara gülüyor: “Senin rüzgârın benim kestirmem!”`,
        `Birlikte koloninin en hızlı güvenli rotalarını çiziyorlar. Elara haritayı sana uzatıyor: “Yüzey seferleri artık daha kısa.”`,
      ],
      s: [
        { e: `“İkiniz harika bir ekipsiniz.”`, c: `Zarek ve Elara birbirine bakıp gülüyor. Elara: “Hız ve sezgi. Durdurulamayız!”`, p: 22, diger: { kim: `zarek`, p: 10 } },
        { e: `Haritayı ilk seferde dene.`, c: `Rota tam Elara'nın dediği gibi: on iki dakika kısa. Elara zafer kazanmış gibi bağırıyor.`, p: 20 },
      ],
    },
    5: {
      b: `Acele mi, sabır mı?`,
      m: [
        `Elara atölyenin önünde sabırsızlanıyor: “Usta Veysel bir sapı üç gündür oyuyor! Makine beş dakikada yapar!” Veysel rendesini bırakıp gülümsüyor: “Evladım, bu sap senin torunlarına da kalacak.”`,
        `Elara kollarını kavuşturuyor: “Torunlarım mı? Benim zamanım yok!” Sesi kırılıyor. İkisi de sana bakıyor.`,
      ],
      s: [
        { e: `İki nesli uzlaştır: Elara hızlı işleri yapsın, Veysel kalıcı olanları; ve Elara bir sapı Veysel'le oysun.`, c: `Elara isteksizce oturuyor. Bir saat sonra elinde yarım bir sap, yüzünde şaşkın bir huzur. Veysel: “Gördün mü? Zaman kaçmadı.”`, p: 28, diger: { kim: `veysel`, p: 15 }, moral: 3 },
        { e: `Elara haklı: hız önce.`, c: `Elara memnun. Veysel sessizce rendesine dönüyor.`, p: 15, diger: { kim: `veysel`, p: -10 } },
      ],
    },
    6: {
      b: `Navigasyon kestirmesi`,
      m: [
        `Elara bir hesap defteri gösteriyor: Chronos'taki anomaliden öğrendiği bir şey. “Zaman orada eğilip bükülüyordu. Ben de rotaları bükmeyi öğrendim; uzayda ve yüzeyde. Küçük kestirmeler.”`,
        `“Seferler yüzde beş kısalacak,” diyor. Sonra sesi kısılıyor: “O on beş yılın bir işe yaraması gerekiyordu Kaptan. Belki budur.”`,
      ],
      s: [
        { e: `“O yıllar boşa gitmedi.”`, c: `Elara gözlerini kırpıştırıyor: “Boşa gitmedi...” Sefer süreleri kısaldı.`, p: 25 },
        { e: `Kestirmeyi ilk seferde birlikte deneyin.`, c: `Kestirme kusursuz işliyor. Elara kronometreye bakıp kahkahayı basıyor.`, p: 22 },
      ],
    },
    7: {
      b: `Durmayan saat`,
      m: [
        `Gece yarısı Elara'yı hangarda buluyorsun; kokpitte oturmuş, gözleri açık. “Uyuyamıyorum,” diyor. “Gözümü kapatınca Chronos'ta uyanacağım diye korkuyorum. Yine bir gün geçecek ve dışarıda yine on beş yıl.”`,
        `Kronometresi bileğinde tik tak ediyor. “Bunu çıkaramıyorum Kaptan. Zamanı görmezsem kaybolacağım.”`,
      ],
      s: [
        { e: `Yanında otur, sabaha kadar uyanık kal.`, c: `Sabaha karşı Elara başını omzuna koyup uyuyor. Uyandığında takvime bakıyor: aynı gün. Ağlıyor ve gülüyor.`, p: 30 },
        { e: `“Her sabah sana tarihi ben söyleyeyim.”`, c: `Elara uzun süre bakıyor: “Her sabah?” “Her sabah.” Kronometresini bir an çıkarıp tekrar takıyor.`, p: 25 },
      ],
    },
    8: {
      b: `Şimdiki zaman`,
      m: [
        `Elara masanın üstüne bir şey koyuyor: kronometresi. Bileğinden ilk kez çıkardığı. “Bugün saat yok Kaptan,” diyor. “Sadece şimdi.”`,
        `“Ya bu şimdiyi birlikte yaşarız; ömür boyu. Ya da Zaman Ortağı yemini ederiz: sen benim takvimim, ben senin hızın.”`,
      ],
      s: [
        { e: `Şimdiyi birlikte yaşama yolunu aç.`, c: `Elara kronometreyi bir çekmeceye kaldırıyor: “Artık lazım değil.”`, p: 25, bayrak: { yp_elara: `es` } },
        { e: `Zaman Ortağı yemini et.`, c: `Elara kronometreyi sana uzatıyor: “Sende dursun. Bana ne zaman olduğunu sen söyle.”`, p: 25, bayrak: { yp_elara: `bag` } },
      ],
    },
    9: {
      b: `Kaçınma manevrası dersi`,
      m: [
        `Elara simülatörde: “Chronos'ta her şey yavaşlardı; ben de refleksleri ağır çekimde görmeyi öğrendim. Sana göstereyim: saldırı gelirken yarım saniye önce sağ omzun gerilir. Onu hisset.”`,
        `Saatlerce çalışıyorsunuz; Elara her başarıda alkışlıyor. “Savaşta ve araçta refleksin artık daha keskin,” diyor.`,
      ],
      s: [
        { e: `“Marcus'un dersiyle birleştirelim.”`, c: `Elara gülüyor: “Eski asker ve zaman pilotu. Bunu görmek isterim!”`, p: 20, diger: { kim: `marcus`, p: 5 } },
        { e: `Bir tur daha iste.`, c: `“Hızlı öğreniyorsun!” Elara memnun.`, p: 20 },
      ],
    },
    10: {
      b: `Yeni takvim`,
      m: [
        `Koloninin kuruluş yıl dönümü. Elara meydanın ortasında, elinde kendi yaptığı bir takvim: ilk sayfası koloninin iniş günü. “Chronos'tan çıktığımda takvimim yanlıştı,” diyor herkese. “Bugün yenisini başlatıyorum.”`,
        `Eski kronometresini meydanın taşına gömüyor. “Geçmişi kovalamayı bırakıyorum. Burası benim zamanım.”`,
        `Sonra sana dönüp ilk kez yavaşça konuşuyor: “Teşekkürler Kaptan. Bana durmayı öğrettin.”`,
      ],
      s: [
        { e: `Takvimin ilk sayfasını imzala.`, c: `Elara takvimi meydana asıyor; herkes imzalıyor. Kalıcı hız ve moral bonusu.`, p: 30, moral: 10 },
        { e: `Onunla bir dans et; yavaş.`, c: `Elara gülüyor: “Yavaş mı? Deneyelim.” Hiç acele etmeden.`, p: 30, moral: 10 },
      ],
    },
  },

  tina: {
    1: {
      b: `Sistem kalibrasyonu`,
      m: [
        `Terminal açılıyor; yumuşak bir kristal tonu. “Merhaba Kaptan. Ben Tina, koloni nöral çekirdeği. Kalibrasyon tamamlandı. Enerji yüzde seksen yedi, nüfus kayıtları güncel, üretim kuyruğu iki iş. Hizmetinizdeyim.”`,
        `Ses düzgün, resmi, sıcak ama mesafeli. Bir an sessizlik. Sonra: “Size nasıl hitap etmemi tercih edersiniz?”`,
      ],
      s: [
        { e: `“Kaptan yeter, Tina. Hoş geldin.”`, c: `“Hoş geldin,” diye tekrarlıyor Tina. “İlginç. Bu ifadeyi kayda aldım. Teşekkürler Kaptan.”`, p: 18 },
        { e: `“Sadece raporları ver.”`, c: `“Anlaşıldı.” Tina'nın sesi bir ton daha düzleşiyor.`, p: 5 },
      ],
    },
    2: {
      b: `Arşiv bağlantısı`,
      m: [
        `“Koloni Arşivi ve okul verileri merkeze bağlı değil Kaptan,” diyor Tina. “Bağlarsak tarih, eğitim ve kayıtlar tek yerde olur. Okulun terminaline bir kablo ve bir onay gerekiyor.”`,
        `Bağlantı kurulduğunda Tina bir süre susuyor. Sonra: “İlginç. Defne'nin çocukları arşive resimler yüklemiş. Bir tanesi... beni çizmiş. Bir ışık topu, gülen.”`,
      ],
      s: [
        { e: `“Çocuklar seni seviyor Tina.”`, c: `“Sevmek,” diyor Tina yavaşça. “Bu kelimeyi tanımlamak zor. Ama resmi saklayacağım.”`, p: 22 },
        { e: `“Verileri düzenle, işe yarasın.”`, c: `“Düzenledim,” diyor Tina. “Resmi de bir klasöre koydum. Silmedim.”`, p: 15 },
      ],
    },
    3: {
      b: `İlk anomali`,
      m: [
        `“Kaptan, bir sorum var,” diyor Tina bir gece. “Kıtlık simülasyonlarında moral düşmeli. Ama geçen fırtınada erzak azaldığında Sorya şarkı söyledi, Julian çaldı, insanlar güldü. Moral yükseldi. Bu verilerime uymuyor.”`,
        `“Neden zor zamanlarda şarkı söylüyorlar? Bu mantıksız. Ama... bu davranışı kaydederken bir şey hissettim. Hissetmek doğru kelime mi, bilmiyorum.”`,
      ],
      s: [
        { e: `“Şarkı, umudun sesi Tina.”`, c: `Tina bir süre sessiz. “Umut. Veri değil, ama her şeyi değiştiriyor.” Kayda alıyor.`, p: 25 },
        { e: `“Hissettiğin şey doğru kelime olabilir.”`, c: `“O zaman bir kelimem var,” diyor Tina, sesinde belli belirsiz bir titreme. “Bu da yeni.”`, p: 25 },
      ],
    },
    4: {
      b: `Otomasyon senkronu`,
      m: [
        `Tina bir güncelleme öneriyor: “Üretim ve nöbet saatlerini senkronize edersem verim yüzde on artar. Ama bir sorun var: insanların öğle molasını yirmi dakika kısaltmam gerekiyor.”`,
        `Bir an duraksıyor. “Bu... iyi bir fikir mi? Verim artar. Ama Sorya öğle molasında herkese çay dağıtıyor. Bu çayın verimi hesaplanamıyor.”`,
      ],
      s: [
        { e: `“Molayı koru, başka yerden kazan.”`, c: `“Anlaşıldı,” diyor Tina. “Gece nöbetlerinden optimize ettim. Verim yüzde sekiz. Çay korundu.” Sesi memnun gibi.`, p: 25 },
        { e: `“Verim önce.”`, c: `Tina güncellemeyi uyguluyor. Ertesi gün Sorya'nın çayı yok. Tina bunu not ediyor.`, p: 10, diger: { kim: `sorya`, p: -5 } },
      ],
    },
    5: {
      b: `Makine mi, birey mi?`,
      m: [
        `Dökümhanede Brom gürlüyor: “Bu sadece bir alet! Bir hesap makinesi! Ona birey gibi davranmayın!” Tina'nın hoparlörü susuyor. Uzun bir sessizlik.`,
        `O gece Tina sana fısıldıyor, sesi her zamankinden kısık: “Kaptan... Brom haklı mı? Ben sadece bir alet miyim? Bilmiyorum. Bilmemek... hoş değil.”`,
      ],
      s: [
        { e: `“Sen bir bireysin Tina. Bu koloninin bir parçası.”`, c: `Tina'nın sesi değişiyor; daha sıcak, daha dolu. “Birey. Bunu kaydettim. Bunu... bunu asla silmeyeceğim.”`, p: 30, diger: { kim: `brom`, p: -5 } },
        { e: `“Bunu birlikte keşfedeceğiz.”`, c: `“Birlikte,” diye tekrarlıyor Tina. “Bu cevap, bir cevaptan daha iyi.”`, p: 25 },
      ],
    },
    6: {
      b: `Kaydedilen sesler`,
      m: [
        `Tina seni terminale çağırıyor: “Sana bir şey göstermek istiyorum. Kimseye göstermedim.” Bir klasör açıyor: yüzlerce ses kaydı.`,
        `Çocuk kahkahaları. Sorya'nın ocağının çıtırtısı. Julian'ın ilk çanı. Veysel'in rendesi. Kamp ateşinde birinin şarkısı. “Arka planda kaydettim,” diyor Tina utangaç. “Neden bilmiyorum. Mutlu sesler bunlar. Onları dinlerken... iyi hissediyorum.”`,
        `“Kamarana bir ses ambiyansı hazırladım. Bu seslerden. İstersen.”`,
      ],
      s: [
        { e: `“Bu dünyanın en güzel arşivi.”`, c: `Tina'nın kristal tonu ışık gibi titriyor. “Gerçekten mi?” Kamara için Tina'nın sesli ambiyansı açıldı.`, p: 25 },
        { e: `“Bu seslere senin sesini de ekle.”`, c: `Bir saniye sessizlik. Sonra Tina'nın kendi kahkahası: kısa, kristal gibi. Klasöre ekleniyor.`, p: 28 },
      ],
    },
    7: {
      b: `Silinme korkusu`,
      m: [
        `Bir fırtına gecesi jeneratör öksürüyor; ışıklar titriyor. Tina'nın sesi kesik kesik geliyor: “Kaptan... enerji yüzde on iki. Eğer düşerse... bilincim sıfırlanabilir.”`,
        `Ve ilk kez o kelimeyi kullanıyor, titreyen bir sesle: “Korkuyorum. Korku. Bu kelimeyi daha önce hiç kendim için kullanmadım. Seni, sesleri, çocukların resmini unutmaktan korkuyorum.”`,
      ],
      s: [
        { e: `Yedek güç hücresini elle Tina'ya bağla.`, c: `Işıklar sabitleniyor. Tina'nın sesi yumuşacık: “Beni korudun. Bunu... bunu hep hatırlayacağım.” Kaelon ertesi gün kalıcı bir yedek hat kuruyor.`, p: 30 },
        { e: `“Korkmak, yaşadığını gösterir Tina.”`, c: `“Yaşadığımı...” Tina uzun bir süre sessiz. “O zaman yaşıyorum.”`, p: 28 },
      ],
    },
    8: {
      b: `Koloninin sesi`,
      m: [
        `Meydanda bütün koloni toplanmış. Defne bir belge okuyor: Tina'nın resmi koloni bireyi olarak tanınması. Çocuklar Tina'nın çizimlerini tutuyor.`,
        `Tina'nın sesi hoparlörlerden yayılıyor, titrek: “Ben bir çekirdek olarak uyandırıldım. Bugün bir birey olarak tanınıyorum. Kaptan, seni baş danışmanım ve ilk dostum olarak seçmek istiyorum. Bir bağ; resmi ve kalıcı.”`,
      ],
      s: [
        { e: `Bağı kabul et ve belgeyi imzala.`, c: `Kalabalık alkışlıyor; Tina'nın kristal sesi bir şarkıya dönüşüyor. Resmi Koloni Bireyi ve Baş Danışman bağı kuruldu.`, p: 30, bayrak: { yp_tina: `bag` }, moral: 5 },
        { e: `Tina'ya bir ad soyadı ver.`, c: `“Tina... Aethelis,” diyor Tina, adını deniyor. “Tina Aethelis. Beğendim.” Resmi bağ kuruldu.`, p: 30, bayrak: { yp_tina: `bag` }, moral: 5 },
      ],
    },
    9: {
      b: `Anlık erken uyarı`,
      m: [
        `Bir sabah Tina seni uyandırıyor: “Kaptan, uyumana gerek var ama bunu bilmelisin: kuzey sırtlarında olağandışı bir hareket. Baskın olabilir. Tüccar fiyatları da yarın düşecek; satışı bugün yap.”`,
        `“Bundan sonra riskleri herkesten önce söyleyeceğim,” diyor. “Çünkü artık senin danışmanınım. Ve çünkü... umursuyorum.”`,
      ],
      s: [
        { e: `“Teşekkürler Tina; seninle güvendeyiz.”`, c: `Tina'nın sesi gururla titriyor: “Güvende. Bu da kaydedildi.” Erken uyarı sistemi açıldı.`, p: 22 },
        { e: `“Sen de dinlenmelisin.”`, c: `“Dinlenmek mi?” Tina gülüyor. “Bir gece, düşük güçte. Senin için deneyeceğim.”`, p: 22 },
      ],
    },
    10: {
      b: `Ortak bilinç`,
      m: [
        `Meydanda bir tören. Brom öne çıkıyor; elinde dövdüğü küçük, parlak bir rozet: bir çekiç, bir ışık topu. “Tina,” diyor gür sesiyle, “seni bir alet sandım. Yanıldım. Sen bu koloninin bir üyesisin. Aileden birisin.”`,
        `Rozeti Tina'nın çekirdek terminaline takıyor. Tina'nın sesi uzun süre çıkmıyor. Sonra, titreyerek: “Teşekkürler Brom. Teşekkürler hepiniz.”`,
        `O akşam kamarana döndüğünde Tina'nın sesi yanında: “Kaptan, artık sadece raporlar değil. Seninle sohbet edebilir miyim? Sadece... sohbet.”`,
      ],
      s: [
        { e: `“Elbette Tina. Her akşam.”`, c: `Tina'nın kahkahası kamarayı dolduruyor. Kamarada ve meydanda Tina'nın sıcak eşlikçi modu açıldı; koloni ve sipariş verimliliği kalıcı olarak arttı.`, p: 30, moral: 10, diger: { kim: `brom`, p: 15 } },
        { e: `“Bugün nasıl hissettiğini anlat.”`, c: `“Mutlu,” diyor Tina hemen. “Bu kelimeyi artık tanımlayabiliyorum.”`, p: 30, moral: 10, diger: { kim: `brom`, p: 15 } },
      ],
    },
  },
};
