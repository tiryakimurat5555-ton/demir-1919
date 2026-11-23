// Paket 8B: göç ve kurtarma kadrosunun (Defne, Marcus, Torvok, Sira-Vel, Mateo, Julian) on kademe sahneleri.
// Biçim sahneA.js ile aynı.

export const SAHNE_B = {
  defne: {
    1: {
      b: `İlk zil`,
      m: [
        `Meydanın kenarında Defne yere bir halka çizmiş, içine çocukları oturtmuş. Elinde düz taşlar, her birinin üstüne tebeşirle bir harf. “A, ateş için. B, bazalt için. Bu gezegenin alfabesi de bizimki gibi olacak,” diyor gülerek.`,
        `Seni fark edince küçük pirinç zilini çalıyor: “Ders arası! Kaptanımız geldi.” Çocuklar dönüp bakıyor; Defne'nin gözlerinde bir davet var.`,
      ],
      s: [
        { e: `Halkaya otur ve derse katıl.`, c: `Çocuklar kıkırdıyor; Defne sana bir taş uzatıyor: “K, kaptan için.” Gözleri ışıl ışıl: “İşte böyle başlar okullar.”`, p: 18 },
        { e: `Çocuklar için erzak sözü ver.`, c: `“Aç karnına harf girmez, doğru,” diyor Defne. “Teşekkür ederim. Ama bir gün sen de otur, söz mü?”`, p: 12 },
      ],
    },
    2: {
      b: `Işık ve tablet`,
      m: [
        `Defne'nin elinde bir liste: “Akşamları ders yapamıyoruz Kaptan, karanlık çökünce çocuklar dağılıyor. Bir lamba, birkaç eski veri tableti... Vanguard enkazında hâlâ sağlam olanlar olabilir.”`,
        `Getirdiklerini masaya dizerken Defne her tableti tek tek açıp kapatıyor. Biri yanıp sönerek açılıyor; ekranında eski bir Dünya haritası. Defne bir an susuyor, sonra harita üstünde parmağını gezdiriyor: “Bunu da öğrenecekler.”`,
      ],
      s: [
        { e: `“Bu haritayı ilk derste anlat.”`, c: `“Anlatırım,” diyor. “Ama sonuna bu gezegenin haritasını da ekleyeceğim. İkisini de bilmeliler.”`, p: 18 },
        { e: `“Lambayı kim yaktıysa ona teşekkür et.”`, c: `Defne gülüyor: “Sana teşekkür ediyorum zaten.” Çocuklara dönüp sesleniyor: “Kaptana bir alkış!”`, p: 15 },
      ],
    },
    3: {
      b: `Boş sıralar`,
      m: [
        `Okul kapandıktan sonra Defne sıraları siliyor; bir tanesinin önünde duruyor, uzun süre. “Eski okulumun son günü de böyle bir akşamdı,” diyor yavaşça. “Mülteci gemisine binmeden önce. Yirmi üç öğrencim vardı.”`,
        `“Gemi ikiye bölündü. Benim yarım kurtuldu, öteki yarım...” Sözü yarıda kalıyor. “On bir sıra boş kaldı. Hâlâ her sabah yoklamada o isimleri okuyacak gibi oluyorum.”`,
      ],
      s: [
        { e: `Yargılamadan dinle, yanında kal.`, c: `Defne bezini masaya bırakıyor, yanına oturuyor. “Kimse sormadı bunu,” diyor. “Sen sormadın da; sadece dinledin. Bu daha iyi.”`, p: 25 },
        { e: `“Burada yeni sıralar dolacak.”`, c: `Defne gülümsüyor, gözleri ıslak: “Dolacak. Ama ben eskileri de unutmayacağım.”`, p: 18 },
      ],
    },
    4: {
      b: `Ortak okul`,
      m: [
        `Okulun ilk günü. Defne tahtaya iki başlık yazmış: Dünya tarihi ve Malken yıldızları. Lyris bir köşede altı yıldızı çiziyor; Zarek kapıdan kervan şarkısını mırıldanıyor.`,
        `“Bir çocuk Dünya'nın nerede olduğunu sordu,” diyor Defne sana. “Bilmiyorum dedim. Sonra öteki çocuk, Malken bir kız, gökyüzünü gösterdi: ‘Belki Zhaor'un arkasında.’ İşte bu okulun anlamı Kaptan.”`,
      ],
      s: [
        { e: `İlk derste sen de bir şey anlat.`, c: `Çocuklara kapsülün inişini anlatıyorsun. Defne arkada not alıyor: “Koloni Tarihi, Birinci Bölüm. Kaptanın ağzından.”`, p: 22 },
        { e: `“Bu okulu sen kurdun Defne.”`, c: `“Hepimiz kurduk,” diyor. “Ben sadece zili çalıyorum.”`, p: 15 },
      ],
    },
    5: {
      b: `Çalışsınlar mı, okusunlar mı?`,
      m: [
        `Tüccar Mateo okulun kapısında: “Büyük çocukları çıraklığa alalım. Tezgâhta hesap, atölyede el becerisi; koloniye hemen katkı.” Defne kapıyı kapatacak gibi duruyor: “Onlar daha çocuk Mateo. Önce okuyacaklar.”`,
        `İkisi de sana dönüyor. Mateo'nun sesinde gerçek bir ihtiyaç var; Defne'nin sesinde ise kaybedilmiş yirmi üç çocuğun yankısı.`,
      ],
      s: [
        { e: `Defne'ye hak ver: önce okul.`, c: `Defne derin bir nefes alıyor: “Teşekkürler.” Mateo omuz silkiyor ama bir şey demiyor.`, p: 25, diger: { kim: `mateo`, p: -10 } },
        { e: `Orta yol: öğleden önce ders, öğleden sonra isteyen çıraklık.`, c: `Defne düşünüyor, sonra başını sallıyor: “Seçim çocuğun olursa... olur.” Mateo da gülümsüyor: “Adil.”`, p: 20, diger: { kim: `mateo`, p: 15 }, moral: 3 },
      ],
    },
    6: {
      b: `Arşiv köşesi`,
      m: [
        `Okulun bir köşesi raflarla dolmuş: kurtarılan tabletler, el yazısı anılar, ilk ekmeğin tarifi, kapsülün iniş kaydı, Veysel'in çizdiği çardak. Defne her birine bir etiket yapıştırmış.`,
        `“Koloni Arşivi,” diyor. “Biri bir gün ‘biz kimdik’ diye sorarsa cevap burada olsun. Bağışları ben derleyeceğim; her biri koloninin itibarını yükseltir.” Rafın en üstüne bir boşluk bırakmış: “O da senin anıların için.”`,
      ],
      s: [
        { e: `Rafa kendi seyir defterini koy.`, c: `Defne defteri iki eliyle alıyor, en üst rafa yerleştiriyor. “Arşivin kalbi oldu bu.”`, p: 22 },
        { e: `“Bu arşiv senin eserin.”`, c: `“Bizim hafızamız,” diye düzeltiyor. Arşiv bağışları artık daha çok itibar getirecek.`, p: 20 },
      ],
    },
    7: {
      b: `İsim listesi`,
      m: [
        `Defne çantasından yıpranmış, köşeleri katlanmış bir yoklama defteri çıkarıyor. Sayfayı açıyor: yirmi üç isim, on birinin yanında küçük bir yıldız.`,
        `“Her akşam okuyorum,” diye fısıldıyor. “Unutulmasınlar diye. Ama ben gidersem kim okuyacak?” Defteri sana uzatıyor, eli titriyor.`,
      ],
      s: [
        { e: `İsimleri yüksek sesle birlikte oku.`, c: `Tek tek okuyorsunuz; on birinci isimde Defne'nin sesi kırılıyor, sen devam ediyorsun. Sonunda gülümsüyor: “Artık iki kişi biliyor.”`, p: 28 },
        { e: `“Bu isimleri arşive kazıyalım.”`, c: `Defne'nin gözleri doluyor: “Taşa... Evet. Taş unutmaz.”`, p: 25 },
      ],
    },
    8: {
      b: `Koloninin hafızası`,
      m: [
        `Okulun bahçesinde, akşam. Defne'nin elinde iki şey: okulun anahtarı ve küçük bir defter. “Kaptan, bu okul benim evim oldu. Sen bu evin bir parçasısın.”`,
        `“Belki birlikte bir hayat yazarız,” diyor, sesi utangaç. “Ya da beni baş öğretmen ve arşiv koruyucusu yap; sen de bu hafızanın yanımdaki bekçisi ol. İkisi de bana yeter.”`,
      ],
      s: [
        { e: `Hayatını onunla paylaşma yolunu aç.`, c: `Defne defteri sana veriyor: ilk sayfada ikinizin adı. “Acele etmeyelim. Ama yazdım bile.”`, p: 25, bayrak: { yp_defne: `es` } },
        { e: `Onu baş öğretmen ilan et.`, c: `Çocuklar alkışlıyor. Defne anahtarı göğsüne bastırıyor: “Arşiv ve okul emin ellerde.”`, p: 25, bayrak: { yp_defne: `bag` } },
      ],
    },
    9: {
      b: `Çocuk korosu`,
      m: [
        `Bir kriz akşamı, koloni yorgun ve sessizken okulun penceresinden bir şarkı yükseliyor. Defne'nin korosu: Dünya'dan bir türkü, sonra Malken'den bir yıldız ilahisi, sonra ikisinin karışımı.`,
        `İnsanlar kapılardan çıkıp dinlemeye geliyor. Defne sana göz kırpıyor: “Festivallerde de söyleyecekler. Morali ben değil, onlar yükseltiyor.”`,
      ],
      s: [
        { e: `Korosuna katılıp birlikte söyle.`, c: `Çocuklar kahkahalarla ritmi bozuyor; Defne gülerek yeniden başlatıyor. Koloninin morali yükseldi.`, p: 20, moral: 6 },
        { e: `“Bu şarkılar arşive girmeli.”`, c: `“Kaydediyorum zaten,” diyor. “Her biri.”`, p: 18, moral: 4 },
      ],
    },
    10: {
      b: `İlk mezunlar`,
      m: [
        `Meydanda bir sıra genç: kolonide büyüyen ilk çıraklar. Kaelon'un çırağı, Sorya'nın mutfak yardımcısı, Zarek'in izcisi. Defne her birine el yazısıyla bir belge veriyor.`,
        `“Burada öğrendiklerinizi sakın unutmayın,” diyor, sesi titriyor. “Ve unutulanları da unutmayın.” Sonra yoklama defterinden on bir ismi okuyor; gençler her isimde başlarını eğiyor.`,
        `Tören bitince Defne sana dönüyor: “Boş sıralar doldu Kaptan. Yeni yoklama defteri açıyorum.”`,
      ],
      s: [
        { e: `Mezunlara ilk görevlerini ver.`, c: `Gençler sevinç çığlıkları atıyor. Defne gururla izliyor. Eğitim ve beceri verimi kalıcı olarak arttı.`, p: 30, moral: 10 },
        { e: `Defne'ye bir yoklama defteri armağan et.`, c: `Defne defteri açıyor, ilk satıra senin adını yazıyor. “Yeni dönem, ilk öğrenci.”`, p: 30, moral: 10 },
      ],
    },
  },

  marcus: {
    1: {
      b: `Nöbet disiplini`,
      m: [
        `Kurtarıldığı akşam Marcus dinlenmek yerine kapsülün çevresini dolaşıyor, kayaların arkasına bakıyor, rüzgârın yönünü ölçüyor. Seni görünce kısa bir selam veriyor, eski bir askerin selamı.`,
        `“Çevre hattında üç kör nokta var Kaptan. Gece nöbeti tek kişi; yetersiz. Önerim: iki kişi, dört saatlik vardiya.” Bekliyor, gözleri sende.`,
      ],
      s: [
        { e: `“Onaylıyorum. Hemen uygula.”`, c: `Marcus başını eğiyor: “Emredersiniz.” Bir an yüzünde hoşnutluğa benzer bir şey beliriyor.`, p: 18 },
        { e: `“Önce dinlen Marcus, yarın konuşuruz.”`, c: `“Dinlenmek yarına kalır,” diyor kuru bir sesle. “Kör noktalar beklemez.”`, p: 5 },
      ],
    },
    2: {
      b: `Eski uçuş günlüğü`,
      m: [
        `Marcus keşif aracının enkazını gösteriyor: “Kokpitte bir kara kutu olmalı. Uçuş kayıtları, hava verileri. Bu gezegenin rüzgârlarını anlamak için gerekli.”`,
        `Kutuyu getirdiğinde Marcus onu açmıyor; önce elleriyle tozunu siliyor, uzun süre bakıyor. “Eski alışkanlık,” diyor. “Bir kara kutu açmadan önce saygı gösterilir. İçinde birilerinin son sesi olabilir.”`,
      ],
      s: [
        { e: `Sessizce bekle, onunla birlikte aç.`, c: `İçinden yalnızca rüzgâr kayıtları çıkıyor. Marcus rahat bir nefes veriyor: “İyi. Bu sefer kimsenin sesi yok.”`, p: 20 },
        { e: `“Hemen açalım, veriye ihtiyacımız var.”`, c: `Marcus bir an bakıyor, sonra açıyor: “Haklısın. Ama bir dahaki sefere bekle.”`, p: 10 },
      ],
    },
    3: {
      b: `Paslı rozet`,
      m: [
        `Marcus'un ceketinin iç cebinde bir rozet var; yıldızlı, kenarı paslanmış. Takmıyor, ama hiç de bırakmıyor. Sorduğunda kısa kesiyor: “Filo komutanlığı. Söktüm.”`,
        `“Bir emir verdim, yanlış bir irtifa. Rüzgâr kesmesi. İki pilot.” Rozeti cebine geri koyuyor. “Konu kapandı Kaptan. Nöbet çizelgesi hazır.”`,
      ],
      s: [
        { e: `Üstelemeden çizelgeyi al.`, c: `Marcus belirgin biçimde gevşiyor. “Teşekkürler.” Çizelgede senin için ayrılmış en rahat vardiyayı fark ediyorsun.`, p: 22 },
        { e: `“İstediğinde anlatırsın.”`, c: `“İstemem,” diyor. Sonra, daha yumuşak: “Ama söylediğin için sağ ol.”`, p: 15 },
      ],
    },
    4: {
      b: `İlk karakol hattı`,
      m: [
        `Marcus haritaya çizgiler çekmiş: maden girişi, kıyı, sırtlar. “Her biri bir karakol. Sinyal feneri, ikmal sandığı, sığınak. Birlikte kuracağız; ben yer seçerim, sen onaylarsın.”`,
        `İlk karakolun kazıkları çakılırken Marcus her birini tek tek kontrol ediyor. Sonunda feneri yakıyor, ışık gece boyunca vadide dönüyor. “İlk hat,” diyor. “Bundan sonra hiçbir ekip karanlıkta kaybolmaz.”`,
      ],
      s: [
        { e: `“Bu hat senin sorumluluğunda.”`, c: `Marcus dimdik duruyor: “Kabul.” Yıllardır ilk kez bir sorumluluk aldığını fark ediyorsun.`, p: 22 },
        { e: `Feneri birlikte izleyin.`, c: `Uzun süre konuşmuyorsunuz. Sonra Marcus: “Eskiden kulelerden izlerdim. Bu daha iyi.”`, p: 18 },
      ],
    },
    5: {
      b: `Özgürlük mü, düzen mi?`,
      m: [
        `Zarek ve Julian gece nöbetine itiraz ediyor: Zarek rüzgârla yürümek istiyor, Julian geceleri tavernada çalmak. Marcus kollarını kavuşturmuş: “Düzen bir kişi için bozulursa herkes için bozulur.”`,
        `Julian gülümsüyor: “Biraz müzik nöbetçileri uyanık tutar Kaptan.” Marcus'un çenesi kasılıyor; sana bakıyor.`,
      ],
      s: [
        { e: `Disiplin: çizelge herkes için geçerli.`, c: `Marcus başını sallıyor: “Teşekkürler.” Zarek ve Julian homurdanarak gidiyor.`, p: 25, diger: { kim: `julian`, p: -10 } },
        { e: `Esneklik: nöbet değişimleri serbest, ama boşluk yok.`, c: `Marcus uzun süre düşünüyor: “Boşluk olmadıkça...” Sonra isteksizce: “Olur.” Julian göz kırpıyor.`, p: 15, diger: { kim: `julian`, p: 10 } },
      ],
    },
    6: {
      b: `Kaçınma manevrası`,
      m: [
        `Marcus hangarda bir simülatör kurmuş: iki koltuk, bir kumanda kolu. “Filo akademisinde öğretirdim. Saldırı geliyorsa yarım saniye önce sezersin; gövdeyi yana değil, aşağı ve yana yatırırsın.”`,
        `Saatlerce çalışıyorsunuz. Her başarılı kaçışta Marcus kısa bir “Güzel” diyor; bu onun en büyük övgüsü. Sonunda koltuktan kalkarken ekliyor: “Bütün pilotlarımız bunu öğrenecek. Kaçınma pencereniz biraz daha geniş artık.”`,
      ],
      s: [
        { e: `“İyi bir öğretmensin Marcus.”`, c: `Marcus gözlerini kaçırıyor: “Öyleydim.” Sonra: “Belki hâlâ öyleyim.”`, p: 22 },
        { e: `Bir tur daha iste.`, c: `Marcus'un dudaklarında belli belirsiz bir gülümseme: “Hevesli öğrenci. En sevdiğim tür.”`, p: 20 },
      ],
    },
    7: {
      b: `İki kişilik kokpit`,
      m: [
        `Marcus seni sessizce hangarın arkasına çağırıyor. Elinde küçük bir kayıt cihazı. “Bunu kimseye dinletmedim,” diyor. Düğmeye basıyor.`,
        `Cızırtının içinden iki genç ses: “İrtifa onaylandı, komutanım... Rüzgâr kesmesi! Kontrol yok, kontrol yok...” Sonra sessizlik. Marcus cihazı kapatıyor, ellerinin titremesini saklamıyor. “Bir daha kimseyi benim hatam yüzünden kaybetmeyeceğim Kaptan. O yüzden bu kadar katıyım.”`,
      ],
      s: [
        { e: `“Bu yükü artık yalnız taşımıyorsun.”`, c: `Marcus uzun süre susuyor. Sonra kayıt cihazını sana uzatıyor: “Sende dursun. Benden daha iyi korursun.”`, p: 28 },
        { e: `“Katılığın bizi koruyor; teşekkür ederim.”`, c: `“Koruyor mu, boğuyor mu, bilemiyorum,” diyor. “Ama söylediğin iyi geldi.”`, p: 22 },
      ],
    },
    8: {
      b: `Silah arkadaşlığı`,
      m: [
        `Marcus karakol fenerinin altında seni bekliyor; üniforması temizlenmiş, ütülenmiş. “Kaptan, bir askerin söylemesi zor şeyler var. Bu koloni benim son görev yerim. Ve sen... komutanımdan fazlasısın.”`,
        `“Eğer istersen hayatımızı birlikte sürdürürüz. Ya da bana yemin ettir: Koloni Baş Muhafızı olarak, son nefesime kadar senin ve bu koloninin yanında.”`,
      ],
      s: [
        { e: `Hayatını onunla paylaşma yolunu aç.`, c: `Marcus'un yüzünde nadir bir gülümseme: “Buna hazırlıklı değildim. Ama... evet.”`, p: 25, bayrak: { yp_marcus: `es` } },
        { e: `Baş Muhafız yeminini al.`, c: `Marcus diz çöküyor, eski filo yeminini bu koloniye uyarlayarak okuyor. Fener ikinizin üzerinde dönüyor.`, p: 25, bayrak: { yp_marcus: `bag` } },
      ],
    },
    9: {
      b: `Tavernada zar ustası`,
      m: [
        `Akşamları Marcus artık tavernada. Önünde eski bir taktik zar oyunu: altı yıldız, üç filo, rüzgâr kartları. “Akademide subaylarla oynardık,” diyor. “Kazanan nöbet seçerdi.”`,
        `Seninle oynuyor ve kaybettiğinde bile gülüyor; Julian bile şaşkınlıkla bakıyor. Oyun sonunda sana bir kart uzatıyor: “Bu taktiği gerçek savaşta kullan. Beni hatırlarsın.”`,
      ],
      s: [
        { e: `Bir el daha oyna.`, c: `Marcus kahkahayı basıyor: “İşte bu! Kimse benimle ikinci el oynamazdı.”`, p: 20, moral: 3 },
        { e: `Julian'ı da masaya çağır.`, c: `Marcus bir an duraksıyor, sonra el sallıyor: “Gel bakalım müzisyen.” Gece boyunca gülüşmeler.`, p: 18, diger: { kim: `julian`, p: 10 } },
      ],
    },
    10: {
      b: `Son nöbet, ilk barış`,
      m: [
        `Bütün karakollar tam kapasitede; fenerler vadiyi, madeni, kıyıyı aydınlatıyor. Marcus son raporunu veriyor: “Hat tamam Kaptan. Kör nokta yok.”`,
        `Sonra cebinden paslı rozeti çıkarıyor. Uzun süre bakıyor. Ve göğsüne takıyor. “On beş yıl,” diyor. “Bu rozeti hak ettiğimi ilk kez hissediyorum.”`,
        `O gece Marcus nöbet tutmuyor; çardağın altında uyuyor. İlk kez.`,
      ],
      s: [
        { e: `Ona asker selamı ver.`, c: `Marcus aynı selamla karşılık veriyor; gözlerinde yaşlar. Koloninin savunması kalıcı olarak güçlendi.`, p: 30, moral: 8 },
        { e: `“Artık dinlenme sırası sende.”`, c: `“Emredersiniz,” diyor gülerek. Pusu koruması kalıcı oldu.`, p: 30, moral: 8 },
      ],
    },
  },

  torvok: {
    1: {
      b: `Taşın ağırlığı`,
      m: [
        `Torvok koloniye girerken eşikte durup kazmasını tartıyor; sapı avucunda çeviriyor, ağzına bakıyor. Sonra gür bir kahkaha: “Hafif! Burada kazmaları kâğıttan mı yapıyorlar?”`,
        `Kazmayı sana uzatıyor: “Tut bakalım Kaptan. Bir Kaelith madencisi, kazmayı tutuşundan tanır insanı.”`,
      ],
      s: [
        { e: `Kazmayı sıkıca, iki elle tut.`, c: `Torvok başını sallıyor: “Hah! Kolun var.” Sırtına bir şaplak indiriyor; nefesin kesiliyor.`, p: 18 },
        { e: `“Ben kaptanım, madenci değil.”`, c: `Torvok yine gülüyor ama biraz hayal kırıklığıyla: “Her kaptan bir gün kazma tutar. Göreceksin.”`, p: 8 },
      ],
    },
    2: {
      b: `İlk çelik tavı`,
      m: [
        `“Bu kömür ocak yakmaz, ancak çorba ısıtır!” Torvok dökümhanenin önünde homurdanıyor. “Bana kükürtlü, yüksek ısılı taş lazım. Maden girişinin sağ duvarında, sarı damarlar.”`,
        `Getirdiğin taşları ocağa atıyor; alev maviye dönüyor, sonra beyaza. Torvok'un yüzü aydınlanıyor: “İşte! Kaelith ateşi! Yıllardır bu rengi görmemiştim.”`,
      ],
      s: [
        { e: `Ocağın başında onunla dur.`, c: `İlk çelik tavını birlikte izliyorsunuz. Torvok fısıldıyor: “Atalarım bu rengi görünce şarkı söylerdi.”`, p: 20 },
        { e: `“Daha fazla lazımsa söyle.”`, c: `“Her zaman daha fazla lazım!” diye gülüyor. “Ama bu yeter. Bugünlük.”`, p: 15 },
      ],
    },
    3: {
      b: `Çöken galeri`,
      m: [
        `Torvok tavernada, önünde koca bir kupa. Sesi her zamanki gibi gür ama bu kez hüzünlü: “Kaelith'te son ocak, Derin Kalp. Yedi kuşak boyunca hiç sönmedi. Ben oradaydım, ustabaşıydım.”`,
        `“Bir sabah dağ inledi. Galeriler birbiri ardına çöktü. Herkesi dışarı çıkardım, herkesi. Ama ocak... Ocak sustu. Yedi kuşağın ateşi, benim nöbetimde.” Kupayı masaya vuruyor, sonra yavaşça bırakıyor.`,
      ],
      s: [
        { e: `“Herkesi kurtarmışsın Torvok.”`, c: `Torvok uzun süre bakıyor sana. “Kimse bunu söylemedi,” diyor. “Hep ocağı sordular.”`, p: 25 },
        { e: `“Burada yeni bir ocak yakacağız.”`, c: `Torvok'un gözleri parlıyor: “Söz mü Kaptan? Kaelith sözü ağırdır.” Elini uzatıyor.`, p: 22 },
      ],
    },
    4: {
      b: `Derinliklere iniş`,
      m: [
        `Madenin derin katlarına iniyorsunuz; Torvok önde, fenerini kayalara tutuyor. Her duvara elini koyuyor, dinliyor. “Taş konuşur Kaptan. Şurası boş, şurası dolu. Burada... kristal.”`,
        `Kazmayı vuruyor; kaya açılıyor, ardında ışıl ışıl bir damar. Torvok kahkahayla seni kucaklıyor: “Bunu bulmak için yirmi yıl kazdım Kaelith'te. Burada bir haftada!”`,
      ],
      s: [
        { e: `Damarın ilk parçasını ona ver.`, c: `Torvok parçayı ışığa tutuyor: “Bu yeni ocağın ilk taşı olacak.”`, p: 22 },
        { e: `“Burayı karakolla güvenceye alalım.”`, c: `“Akıllı,” diyor Torvok. “Madenci önce sığınağını kurar, sonra kazar.”`, p: 18 },
      ],
    },
    5: {
      b: `Dinlenmek mi, devam mı?`,
      m: [
        `Lyris, Torvok'un yaralı omzuna sargı sararken kesin bir sesle konuşuyor: “Üç gün maden yok. Yoksa kolunu kaybedebilirsin.” Torvok homurdanıyor.`,
        `Lyris gidince Torvok sana yanaşıyor, fısıldıyor: “Kaptan, sadece bir kat. Damar kapanmadan. Sen izin verirsen kimse karışmaz.”`,
      ],
      s: [
        { e: `“Lyris haklı. Üç gün dinlen.”`, c: `Torvok homurdanıyor, kollarını kavuşturuyor. Sonra, ertesi gün: “Kolum daha iyi. Haklıymışsınız.” Sana saygıyla bakıyor.`, p: 25, diger: { kim: `lyris`, p: 10 } },
        { e: `“Bir kat; ama yanında ben olacağım.”`, c: `Torvok sevinçle kazmasını kapıyor. Lyris duyunca yüzü kararıyor.`, p: 10, diger: { kim: `lyris`, p: -10 } },
      ],
    },
    6: {
      b: `Demir imzası`,
      m: [
        `Torvok seni maden ocağına götürüyor. “Kaelith madencileri bir vuruşla damarın kalbini bulur. Dinle: vuruşun yarısı kol, yarısı kulak.” Kazmayı kaldırıyor, indiriyor; kaya ince bir ses çıkarıyor.`,
        `“Duydun mu? Boş tını. Şimdi şurası.” Bir daha vuruyor; ses tok, derin. “İşte nadir cevher. Bu tekniğe ‘demir imzası’ derdik. Artık senin de imzan var.”`,
      ],
      s: [
        { e: `Tekniği dene.`, c: `İlk vuruşların boş çınlıyor; beşincide tok bir ses. Torvok kükrüyor: “İşte! Kaelith seni kabul etti!” Madende nadir cevher şansı arttı.`, p: 25 },
        { e: `“Bu tekniği bütün madencilere öğret.”`, c: `Torvok bir an düşünüyor: “Atalarım kızardı. Ama atalarım burada değil.” Gülüyor. “Olur.”`, p: 20 },
      ],
    },
    7: {
      b: `Soğuyan çekiç`,
      m: [
        `Ocak kapandıktan sonra Torvok örsün başında oturuyor, elinde atalarından kalma çekiç. Uzun süre konuşmuyor; sonra sesi hiç duymadığın kadar alçak: “Ölmekten korkmam Kaptan. Kaelith madencisi ölümle her gün kahvaltı eder.”`,
        `“Korktuğum başka. Ben ölünce bu çekici kim tutacak? Kaelith'ten kimse kalmadı. Çekiç soğuyacak, ocak susacak, yedi kuşak... benimle bitecek.”`,
      ],
      s: [
        { e: `“Çekici tutacak eller yetiştirelim.”`, c: `Torvok çekici sana uzatıyor, ağır: “Önce sen tut. Sonra çırak bulacağız.” Gözleri dolu.`, p: 28 },
        { e: `Hiçbir şey deme, yanında otur.`, c: `Ocağın közü sönene kadar oturuyorsunuz. Torvok sonunda kalkıyor: “Teşekkürler Kaptan. Söz gerekmez bazen.”`, p: 25 },
      ],
    },
    8: {
      b: `Ocak kardeşliği`,
      m: [
        `Dökümhanede ocak harlıyor. Torvok elinde bir kor maşası, yüzü ateşin ışığında kızıl. “Kaelith'te iki yol vardır Kaptan. Ya bir ocağı birlikte paylaşırsın, ömür boyu. Ya da kan ve demir kardeşliği: avuçlarımız aynı örste kızarır.”`,
        `Sana bakıyor, ilk kez çekingen: “Seçim senin. İkisi de Kaelith geleneğinde en büyük onurdur.”`,
      ],
      s: [
        { e: `Ocağı birlikte paylaşma yolunu aç.`, c: `Torvok gürleyen bir kahkahayla seni kaldırıyor: “Kaelith'in en şanslı madencisi benim!”`, p: 25, bayrak: { yp_torvok: `es` } },
        { e: `Kan ve demir kardeşliği.`, c: `Avuçlarınızı örse koyuyorsunuz; sıcak, ama yakmıyor. Torvok: “Kardeş. Artık sonsuza dek.”`, p: 25, bayrak: { yp_torvok: `bag` } },
      ],
    },
    9: {
      b: `Zırh ve alet indirimi`,
      m: [
        `Atölyede zırh plakaları üst üste. Torvok her birini kendi damgasıyla işaretlemiş. “Bunlar senin seferlerin için Kaptan. Kaelith usulü katlanmış çelik. Malzeme masrafını ben karşılarım; Kaelith kardeşine fatura kesilmez.”`,
        `Plakalardan birini kaldırıp vuruyor; tok, derin bir çınlama. “Bundan sonra ağır zırh ve maden aletleri daha ucuza. Benim ocağım, benim kuralım.”`,
      ],
      s: [
        { e: `Zırhı kuşan ve teşekkür et.`, c: `Torvok zırhı omuzlarına oturtuyor, kayışları sıkıyor: “Tam oldu. Artık daha zor öldürürler seni.”`, p: 20 },
        { e: `“Masrafı koloni karşılasın.”`, c: `Torvok kaşlarını çatıyor: “Kardeş kardeşe hesap sormaz!” Sonra gülüyor. “Ama sorduğun için incelik.”`, p: 15 },
      ],
    },
    10: {
      b: `Çekirdek ocağı`,
      m: [
        `Madenin en dibinde, gezegenin kalbine yakın bir yerde, Torvok çekirdek taşını çıkarmış. Taş sıcak, nabız atıyor gibi. Dökümhanede bütün koloni toplanmış; Brom körükte, Kaelon vanalarda.`,
        `Torvok çekici kaldırıyor. İlk vuruş, ikinci, üçüncü... Her vuruşta Kaelith'in eski bir madenci şarkısını haykırıyor. Taş yavaş yavaş bir örse dönüşüyor; ilk efsanevi Kaelith örsü.`,
        `Son vuruştan sonra çekici çırağına uzatıyor. “Yedi kuşak,” diyor, nefes nefese. “Şimdi sekizinci.”`,
      ],
      s: [
        { e: `Örse ilk sen dokun.`, c: `Örs ellerinin altında ılık. Torvok ağlıyor ve gülüyor aynı anda. Madenin verimi kalıcı olarak arttı.`, p: 30, moral: 10 },
        { e: `Madenci şarkısına eşlik et.`, c: `Bütün koloni şarkıya katılıyor; Torvok'un sesi hepsinin üstünde. Ocak artık hiç sönmeyecek.`, p: 30, moral: 10 },
      ],
    },
  },

  siravel: {
    1: {
      b: `Su damlası`,
      m: [
        `Sira-Vel hamamın kenarında, ayakları suda. Seni duyunca başını çevirmiyor; sadece elini kaldırıp bekle der gibi işaret ediyor. Bir damla tavandan düşüyor, havuza değiyor; halkalar yayılıyor.`,
        `Halkalar sönünce fısıldıyor: “Merhaba Kaptan. Suyun sesini dinlemeden konuşmak, bir halkı selamlamadan evine girmek gibidir.”`,
      ],
      s: [
        { e: `Sessizce bekle, sonra selam ver.`, c: `Sira-Vel ilk kez yüzünü sana dönüyor, gözleri suyun rengi: “Sabırlısın. Bu iyi.”`, p: 18 },
        { e: `“Merhaba! Hamamı nasıl buldun?”`, c: `Sira-Vel hafifçe irkiliyor, sonra gülümsüyor: “Hızlı konuşuyorsun. Su da bazen hızlı akar.”`, p: 5 },
      ],
    },
    2: {
      b: `Göl suyu analizi`,
      m: [
        `“Bu gezegenin suyunu tanımak istiyorum,” diyor Sira-Vel. “Kıyıdan temiz bir numune ve metan yosunu. Yosun suyun hafızasıdır; neler gördüğünü anlatır.”`,
        `Getirdiklerini cam bir kâseye koyuyor, ellerini üstüne tutup gözlerini kapatıyor. “Bu su eski,” diyor sonunda. “Çok eski. Ve sabırlı. Bizi bekliyormuş gibi.”`,
      ],
      s: [
        { e: `“Bizi neden beklesin?”`, c: `Sira-Vel gülümsüyor: “Su hep birini bekler. Kendini içecek, anlatacak birini.”`, p: 20 },
        { e: `“İçilebilir mi?”`, c: `“İçilebilir,” diyor, biraz kırgın. “Ama önce dinlenebilir.”`, p: 10 },
      ],
    },
    3: {
      b: `Kuruyan deniz`,
      m: [
        `Hamamın buharında Sira-Vel anlatmaya başlıyor; sesi akıntı gibi, hiç durmadan, hiç yükselmeden. “Vaelin'de yedi göl vardı. Her birinin bir şarkısı. Çocuklar doğduklarında gölün şarkısıyla adlandırılırdı.”`,
        `“Sonra güneş değişti. Göller birer birer sustu. Önce en küçüğü, sonra benim doğduğum Selen Gölü. Son göl kuruduğunda halkımın yarısı göç etti, yarısı kumda kaldı. Ben son şifacıyım Kaptan. Son su okuyucusu.”`,
      ],
      s: [
        { e: `Sözünü hiç kesmeden, sonuna kadar dinle.`, c: `Hikâye bitince uzun bir sessizlik. Sira-Vel: “Dinledin. Hiç kesmeden. Vaelin'de bu, bir yemin kadar değerlidir.”`, p: 28 },
        { e: `“Selen Gölü'nün şarkısını hatırlıyor musun?”`, c: `Sira-Vel gözlerini kapatıp mırıldanıyor; ince, dalgalı bir melodi. Buhar sanki dans ediyor.`, p: 22 },
      ],
    },
    4: {
      b: `Termal şifa hamamı`,
      m: [
        `Sıcak su kanalları taşla döşeniyor; Sira-Vel her taşı kendisi yerleştiriyor, suyun akışını avucuyla deniyor. “Su doğru akmazsa şifa vermez. Taş, suyun yatağıdır.”`,
        `Hamam açıldığında ilk gelenler yorgun işçiler. Sira-Vel her birinin omzuna dokunup bir şey fısıldıyor. Bir saat sonra çıktıklarında yüzleri değişmiş.`,
      ],
      s: [
        { e: `Sen de suya gir.`, c: `Sıcak su omuzlarındaki yükü alıyor. Sira-Vel uzaktan izliyor, memnun.`, p: 20, moral: 3 },
        { e: `“Bu hamam koloninin kalbi olacak.”`, c: `“Kalbi değil,” diyor Sira-Vel, “nefesi.”`, p: 18 },
      ],
    },
    5: {
      b: `Ateş ve su`,
      m: [
        `Sira-Vel'in yüzü ilk kez öfkeli: “Torvok'un dökümhanesinin atık suyu kaynağa karışıyor. Su ısındı, bulandı. Hamamın havuzları kirleniyor.”`,
        `Torvok gürlüyor: “Ocak suyla soğutulur! Başka nasıl olsun?” İki element karşı karşıya; ikisi de sana bakıyor.`,
      ],
      s: [
        { e: `Dengeli çözüm: soğutma havuzu ve ayrı kanal.`, c: `Sira-Vel ve Torvok birbirine bakıyor. Torvok: “Ayrı kanal... olur.” Sira-Vel: “Su da ateşi soğutsun, kirlenmeden.” İkisi de rahatlıyor.`, p: 28, diger: { kim: `torvok`, p: 15 }, moral: 3 },
        { e: `Ocak bir süre yavaşlasın.`, c: `Sira-Vel başını eğiyor: “Teşekkürler.” Torvok homurdanarak gidiyor.`, p: 20, diger: { kim: `torvok`, p: -10 } },
      ],
    },
    6: {
      b: `Akıntının şarkısı`,
      m: [
        `Sira-Vel seni göl kıyısına götürüyor; elinde ince bir olta. “Vaelin balıkçıları hiç oltayı sallamaz. Beklerler. Su sakinleşince balık gelir; çünkü balık da sessizliği sever.”`,
        `Saatlerce oturuyorsunuz; konuşmadan. Sonra olta hafifçe titriyor. Sira-Vel'in yüzünde bir gülümseme: “Gördün mü? Akıntının şarkısını duydun. Artık nadir balıkları da bulursun.”`,
      ],
      s: [
        { e: `Balığı nazikçe çek.`, c: `Parlak, gümüşi bir balık. Sira-Vel onu suya geri bırakıyor: “İlki her zaman suya aittir.” Nadir balık şansın arttı.`, p: 25 },
        { e: `“Bu yöntemi koloniye öğret.”`, c: `“Herkese öğretirim,” diyor. “Ama herkes öğrenemez. Sabır öğretilmez, bulunur.”`, p: 18 },
      ],
    },
    7: {
      b: `Yalnızlık yankısı`,
      m: [
        `Gece, hamam boş. Sira-Vel suyun içinde, gözleri kapalı, kulakları suyun altında. Yanına yaklaşınca yavaşça doğruluyor.`,
        `“Suyun içinde halkımın seslerini hâlâ duyuyorum,” diyor. “Annemi, kız kardeşimi, Selen'in şarkısını. Bazen o kadar yakınlar ki... geri dönmek istiyorum. Suyun içine, onlara. Ve bir gün geri çıkamamaktan korkuyorum Kaptan.”`,
      ],
      s: [
        { e: `Elini tut: “Ben seni yukarıdan çağırırım.”`, c: `Sira-Vel'in parmakları seninkileri sıkıyor. “Biri beni yukarıdan çağırsın... Evet. Bu yeter.”`, p: 28 },
        { e: `“Onları da burada yaşatalım; şarkılarıyla.”`, c: `Sira-Vel uzun süre düşünüyor: “Hamamda Selen'in şarkısını çalsak... Belki. Belki o zaman ben de burada kalırım.”`, p: 25 },
      ],
    },
    8: {
      b: `Durgun liman`,
      m: [
        `Sira-Vel seni göl kıyısına çağırıyor; suya iki yaprak bırakmış, yan yana yüzüyorlar. “Vaelin'de iki kişi bağ kurduğunda iki yaprak suya bırakılır. Birlikte yüzerlerse bağ kalıcıdır.”`,
        `Sana dönüyor: “Ya bir ömür birlikte yüzeriz Kaptan. Ya da su ve şifa bağı kurarız; ben senin şifacın, sen benim limanım. İkisi de durgun bir su.”`,
      ],
      s: [
        { e: `Bir ömür birlikte yüzme yolunu aç.`, c: `Yapraklar birbirine değiyor, birlikte uzaklaşıyor. Sira-Vel gülümsüyor: “Su onayladı.”`, p: 25, bayrak: { yp_siravel: `es` } },
        { e: `Su ve şifa bağı kur.`, c: `Sira-Vel alnına su damlatıyor: “Artık benim limanımsın.”`, p: 25, bayrak: { yp_siravel: `bag` } },
      ],
    },
    9: {
      b: `Tam arınma`,
      m: [
        `Sefer sonrası yorgun döndüğünde hamamda senin için ayrılmış bir havuz var; su tam vücut ısısında, buhar kokulu otlarla dolu. Sira-Vel kenarında bekliyor.`,
        `“Gir,” diyor. “Bu havuzda stres tek seferde akıp gider. Vaelin'in son arınma tekniği. Sadece benim insanlarım için.”`,
      ],
      s: [
        { e: `Suya gir ve gözlerini kapat.`, c: `Bütün yorgunluk çözülüyor. Uyandığında Sira-Vel hâlâ kenarda, şarkı mırıldanıyor.`, p: 20, moral: 3 },
        { e: `“Sen de gir; senin de arınman gerek.”`, c: `Sira-Vel bir an şaşırıyor, sonra gülüyor: “Şifacılar şifa almaz derler. Ama... bugün alırım.”`, p: 22 },
      ],
    },
    10: {
      b: `Yeni Vaelin pınarı`,
      m: [
        `Aylarca kanal kazıldı. İç Deniz ile Termal Vaha arasında bir su yolu: soğuk su vahada ısınıyor, sıcak su denize dönüp soğuyor. Kesintisiz bir döngü.`,
        `Sira-Vel kanalın başında, elinde bir kâse. “Selen Gölü kurudu,” diyor. “Ama burada... yeni bir göl doğdu.” Kâseyi suya boşaltıyor; içinde Vaelin'den getirdiği son toprak.`,
        `Sonra sana dönüp, yüksek sesle, ilk kez bir şarkı söylüyor: Selen'in şarkısı, bu yeni suya armağan.`,
      ],
      s: [
        { e: `Şarkının bitimine kadar dinle.`, c: `Şarkı bitince bütün koloni sessiz. Sira-Vel: “Vaelin yaşıyor.” Koloni genelinde kalıcı bir huzur.`, p: 30, moral: 12 },
        { e: `Yeni pınara bir ad ver: Selen.`, c: `Sira-Vel'in gözlerinden yaşlar süzülüyor: “Selen... Evet. Annem de böyle derdi.”`, p: 30, moral: 12 },
      ],
    },
  },

  mateo: {
    1: {
      b: `İlk hesap`,
      m: [
        `Mateo tezgâhın arkasında, parmaklarıyla bir sayı tahtasını tıkırdatıyor. “Hoş geldin Kaptan! Bazalt üç kredi, titanyum on iki, kristal... kristal pazarlık konusu.” Göz kırpıyor.`,
        `“Ben sadece tüccarım,” diyor gülerek. “Ama iyi bir tüccar, koloninin açlık çekmemesini sağlar. Sen kazan, ben satarım, herkes yer. Basit.”`,
      ],
      s: [
        { e: `Esprisine espriyle karşılık ver.`, c: `“Ha! Kaptanın da ticaret kafası var!” Mateo tahtaya bir çentik atıyor: “İlk müşteri, sadık müşteri.”`, p: 18 },
        { e: `“Fiyatlar biraz yüksek gibi.”`, c: `“Yüksek mi?” Mateo elini göğsüne koyuyor, sahte bir yarayla. “Kaptanım, beni yaraladınız. Ama haklısınız; size indirim.”`, p: 15 },
      ],
    },
    2: {
      b: `Kayıp kargo listesi`,
      m: [
        `“İskelenin yanında eski bir kargo kutusu olmalı,” diyor Mateo. “İçinde irsaliyeler var. Kim neyi kime borçlu, kim neyi taşıdı. Bilgi Kaptan, bilgi altındır.”`,
        `Kutuyu getirince Mateo kâğıtları hızla karıştırıyor; birinde bir an duruyor, yüzü değişiyor. Kâğıdı katlayıp cebine koyuyor, sonra gülümsüyor: “Harika. Teşekkürler.”`,
      ],
      s: [
        { e: `Cebine koyduğu kâğıdı sorma.`, c: `Mateo sana uzun uzun bakıyor: “Sormadın.” Bir şey eklemiyor ama tezgâhta sana hep en iyi fiyatı veriyor.`, p: 20 },
        { e: `“O kâğıt neydi?”`, c: `“Eski bir borç,” diyor hızla. “Önemli değil.” Konuyu kapatıyor.`, p: 8 },
      ],
    },
    3: {
      b: `Eski pazar kuralları`,
      m: [
        `Mateo tezgâhı kapatırken anlatıyor: “Babam tüccardı. İlk kuralı: hiçbir şeyi bedava verme. Bedava verilen şeyin değeri olmaz; insanlar onu korumaz.”`,
        `“İkinci kural: borç, zincirdir. Kimseye borçlanma, kimseyi de borçlandırma.” Sesi bir an sertleşiyor. “O yüzden her kuruşu sayarım Kaptan. Kimse bana kâr düşkünü demesin; ben sadece zincir sevmem.”`,
      ],
      s: [
        { e: `“Kurallarının arkasında bir hikâye var.”`, c: `Mateo bir an duraksıyor: “Her kuralın arkasında bir hikâye var Kaptan.” Ama gülümsüyor.`, p: 22 },
        { e: `“Bazen bedava vermek de yatırımdır.”`, c: `Mateo düşünüyor: “İlginç. Bunu not ediyorum.” Bir kâğıda yazıyor.`, p: 18 },
      ],
    },
    4: {
      b: `İlan panosu uzmanı`,
      m: [
        `Mateo meydandaki panoya beş sipariş asmış: birinin tuzu bitmiş, birinin aleti kırılmış, bir çocuk oyuncak istiyor. “Küçük işler Kaptan. Ama küçük işler bir koloniyi büyütür.”`,
        `Hepsini teslim ettiğinde Mateo panonun önünde gülümsüyor; her siparişin altına bir teşekkür notu iliştirilmiş. “Bak,” diyor. “Bunlar paradan değerli. Güven.”`,
      ],
      s: [
        { e: `“Sen de bunları topluyorsun demek.”`, c: `Mateo kızarıyor: “Bir tüccarın en büyük serveti, ona güvenenlerdir.”`, p: 22 },
        { e: `“Daha çok sipariş getir.”`, c: `“Getiririm!” Mateo şimdiden bir sonraki listeyi yazıyor.`, p: 15 },
      ],
    },
    5: {
      b: `Kâr mı, koloni mi?`,
      m: [
        `Meydanda bir tartışma: Mateo fazla hasadı Kaptan Orin'e satmak istiyor, Sorya ve Veysel bedava dağıtmak. “Satarsak kalkan bobini alırız!” “Satarsak çocuklar aç kalır!”`,
        `Mateo sana dönüyor: “Kaptan, aklın sesini dinle. Kalkan olmazsa ambar da gider.” Sorya'nın gözleri kızgın, Veysel'inkiler hayal kırıklığı dolu.`,
      ],
      s: [
        { e: `Adil pay: ihtiyaç kadar dağıt, fazlasını sat.`, c: `Mateo bir an şaşırıyor, sonra gülüyor: “Adil pay... Babam bunu hiç düşünmemişti.” Sorya ve Veysel de razı.`, p: 28, diger: { kim: `sorya`, p: 10 }, moral: 3 },
        { e: `Mateo haklı: hepsini satalım.`, c: `Mateo sevinçle hesap yapıyor. Ama Sorya ve Veysel sessizce uzaklaşıyor.`, p: 10, diger: { kim: `sorya`, p: -15 } },
      ],
    },
    6: {
      b: `Tüccar gemisi ihbarı`,
      m: [
        `Mateo seni tezgâhın arkasına çağırıyor, sesi fısıltı: “Kaptan Orin'in rotasını biliyorum. Hangi limana uğradığını, neyi ucuza aldığını. Bir gün önceden söylerim; hangi malı sakla, hangisini sat.”`,
        `Defterini açıyor: fiyat tabloları, rotalar, notlar. “Bunu kimseye göstermedim. Ama sen... sen adil davrandın. Adil olana adil davranırım.”`,
      ],
      s: [
        { e: `“Bu bilgiyi koloni için kullanacağız.”`, c: `Mateo gülümsüyor: “Öyle umuyordum.” Pazar gelirleri arttı; Orin'in stoğu bir gün önceden bilinecek.`, p: 22 },
        { e: `“Bu bilgiyle Orin'i dolandırabiliriz.”`, c: `Mateo kaşlarını çatıyor: “Dolandırmak değil Kaptan. Akıllı ticaret.” Defteri kapatıyor.`, p: 5 },
      ],
    },
    7: {
      b: `Yıpranmış kefalet makbuzu`,
      m: [
        `Mateo'yu gece tezgâhının arkasında buluyorsun; elinde o kâğıt, kargo kutusundan aldığı. Kenarları yıpranmış bir kefalet makbuzu; üzerinde bir isim: Tomas.`,
        `“Kardeşim,” diyor, sesi hiç bu kadar yorgun olmamıştı. “Korsanlar gemimizi bastığında onu rehin aldılar. Kefaleti ödemek için yıllardır her kuruşu sayıyorum. Zengin olmak istemiyorum Kaptan. Sadece onu geri istiyorum.”`,
      ],
      s: [
        { e: `“Kardeşini birlikte bulacağız.”`, c: `Mateo'nun gözleri doluyor. “Birlikte...” Makbuzu sana uzatıyor. “Bunu taşımak artık daha kolay.”`, p: 28 },
        { e: `“Koloninin kasasından katkı yapalım.”`, c: `Mateo başını sallıyor: “Hayır Kaptan. Bu benim borcum. Ama... teşekkür ederim. Kimse önermemişti.”`, p: 25 },
      ],
    },
    8: {
      b: `Ortak defter`,
      m: [
        `Mateo yeni bir defter açmış; deri kaplı, ilk sayfası boş. “Babamın ikinci kuralı: kimseye borçlanma. Ama bir şeyi atlamış: ortaklık borç değildir.”`,
        `“Bu defteri birlikte doldurabiliriz Kaptan. Bir hayat, iki imza. Ya da eşit ortaklık sözü veririz: senin kazancın benim, benim kazancım senin. İkisi de kârlı.” Göz kırpıyor ama sesi ciddi.`,
      ],
      s: [
        { e: `Hayatını onunla paylaşma yolunu aç.`, c: `Mateo defterin ilk sayfasına iki isim yazıyor, sonra gülüyor: “Hayatımın en iyi yatırımı.”`, p: 25, bayrak: { yp_mateo: `es` } },
        { e: `Eşit ortaklık sözü ver.`, c: `El sıkışıyorsunuz. Mateo: “Ortağım. Bu kelimeyi seviyorum.”`, p: 25, bayrak: { yp_mateo: `bag` } },
      ],
    },
    9: {
      b: `Kardeşlik indirimi`,
      m: [
        `Kaptan Orin'in gemisi indiğinde Mateo ilk o iskeleye koşuyor. Pazarlık sesleri, kahkahalar, sonra Mateo elinde bir kupon destesiyle dönüyor.`,
        `“Orin'le anlaştım,” diyor. “Koloniye özel indirim. Ona bir şey anlattım: kardeşimi. O da birini kaybetmiş. Tüccarlar birbirini anlar.”`,
      ],
      s: [
        { e: `“Sen artık sadece tüccar değilsin.”`, c: `Mateo kızarıyor: “Değil miyim? Belki.” Kaptan Orin'le takaslarda indirim açıldı.`, p: 22 },
        { e: `Kuponları adil paylaştır.`, c: `Mateo gülümsüyor: “Adil pay. Senden öğrendim.”`, p: 20 },
      ],
    },
    10: {
      b: `Kapanan borç`,
      m: [
        `Kaptan Orin'in gemisinden bir haber: korsan limanında bir rehine serbest bırakılmış. Adı Tomas. Kefaleti Mateo'nun son ödemesiyle tamamlanmış.`,
        `Mateo iskelede donup kalıyor. Sonra kahkahalarla ağlamaya başlıyor. “Kapandı Kaptan! Borç kapandı!”`,
        `O akşam meydanda bir şölen var; bütün masraf Mateo'dan. Hayatında ilk kez hiçbir şeyin hesabını tutmuyor. “Babamın bir kuralı daha vardı,” diyor sana. “Ben uydurdum ama: sevdiğin insanlar için hesap tutulmaz.”`,
      ],
      s: [
        { e: `Kadehini Tomas'a kaldır.`, c: `“Tomas'a!” Bütün koloni tekrarlıyor. Mateo'nun yüzü bir çocuk gibi parlıyor.`, p: 30, moral: 10 },
        { e: `“Sen bu koloninin kalbisin Mateo.”`, c: `Mateo kızarıyor: “Sus Kaptan, beni ağlatacaksın.” Ama zaten ağlıyor.`, p: 30, moral: 10 },
      ],
    },
  },

  julian: {
    1: {
      b: `Parmak şıklatma`,
      m: [
        `Meydanda Julian bir taşın üstüne oturmuş, parmaklarını şıklatarak bir melodi mırıldanıyor. Seni görünce şarkıyı değiştiriyor; neşeli, hızlı, sanki senin için uyduruluyor.`,
        `“Kaptan! Kulakların şen olsun!” Taştan atlıyor. “Her insanın bir melodisi vardır. Seninkini bulmaya çalışıyorum; biraz ağır, biraz umutlu. Doğru mu?”`,
      ],
      s: [
        { e: `“Belki. Benim melodimi bitir.”`, c: `Julian kahkahayı basıyor: “Bir ömür sürer! Ama başlarım.” Bir kristal çanı tıklatıyor.`, p: 18 },
        { e: `“Melodiden çok işe ihtiyacımız var.”`, c: `Julian omuz silkiyor, hâlâ gülümsüyor: “İş de bir ritimdir Kaptan.”`, p: 8 },
      ],
    },
    2: {
      b: `Kırık çan akordu`,
      m: [
        `Julian'ın elinde çatlak bir kristal çan. “Göçte kırıldı. Akordu yapmak için harmonik bir kristal parçası lazım; doğru frekansta titreyen.”`,
        `Getirdiğin kristali çanın içine yerleştiriyor, tıklatıyor. Çan uzun, berrak bir ses veriyor. Julian gözlerini kapatıyor, ama başını hafifçe eğiyor; sanki sesin bir kısmını kaçırmış gibi.`,
      ],
      s: [
        { e: `“Harika bir ses.”`, c: `Julian gülümsüyor: “Öyle mi? Güzel. Güzel.” Çanı tekrar tıklatıyor, kulağına yakın tutarak.`, p: 18 },
        { e: `Başını neden eğdiğini fark et, ama sorma.`, c: `Julian sana bakıyor, bir şeyi anladığını anlıyor. Bir şey demiyor, ama gülümsemesi biraz daha sıcak.`, p: 22 },
      ],
    },
    3: {
      b: `İlk taverna akşamı`,
      m: [
        `Tavernanın açıldığı akşam Julian sahnede. İlk şarkıyı söyledikten sonra sana dönüyor: “Neden müzik mi? Mülteci gemisinde üç ay aç kaldık Kaptan. Yemek yoktu ama müzik vardı.”`,
        `“Bir gece yaşlı bir kadın ölmek üzereydi. Ona eski bir ninni söyledim. Gülümsedi. Ertesi sabah hâlâ yaşıyordu. İnsanların yüzünü güldürmek yemek kadar önemli. Bazen daha önemli.”`,
      ],
      s: [
        { e: `“O ninniyi şimdi söyle.”`, c: `Julian bir an duraksıyor, sonra yumuşacık bir ninni. Taverna susuyor; herkes dinliyor.`, p: 25, moral: 3 },
        { e: `“Bu taverna senin sahnen.”`, c: `“Bizim sahnemiz,” diyor. “Ama ilk şarkı benden.”`, p: 18 },
      ],
    },
    4: {
      b: `Çan atölyesi`,
      m: [
        `Gözlem tepesindeki çan atölyesinde Julian yeni nota setleri döküyor; her biri farklı bir kristalden. “Bu Zhaor notası, gümüşi. Bu Varek, sıcak ve derin. Altı yıldız, altı nota.”`,
        `Bütün çanları sırayla çalıyor; tepeden aşağı bir akor yayılıyor. Meydandaki insanlar başlarını kaldırıp dinliyor. Julian bir çanı kulağına çok yaklaştırıyor; kimse fark etmiyor, sen hariç.`,
      ],
      s: [
        { e: `“Altı yıldızın şarkısı bu.”`, c: `Julian'ın gözleri parlıyor: “Evet! Bir gün tam bir senfoni olacak.”`, p: 20 },
        { e: `Çanların yanında onunla çal.`, c: `Birlikte çalıyorsunuz; sen her yanlış notada gülüyorsun, o da. “Kulağın var Kaptan,” diyor. Sonra sessizce: “Benimkinden iyi.”`, p: 22 },
      ],
    },
    5: {
      b: `Gürültü mü, moral mi?`,
      m: [
        `Kaelon ve Halvar atölyenin önünde; ikisinin de yüzü asık. “Julian atölyenin yanında çalgı çalıyor,” diyor Kaelon. “Vanaları duyamıyorum.” Halvar ekliyor: “Reaktör alarmı müzikle karışırsa...”`,
        `Julian ellerini kaldırıyor: “Ama işçiler müzikle daha hızlı çalışıyor!” Üçü de sana bakıyor.`,
      ],
      s: [
        { e: `Orta yol: müzik molada, atölyeden uzakta.`, c: `Kaelon ve Halvar başını sallıyor. Julian: “Mola şarkıları! Daha iyi bir fikir.” Herkes yumuşadı.`, p: 25, diger: { kim: `kaelon`, p: 10 }, moral: 3 },
        { e: `Güvenlik önce: atölyenin yanında müzik yok.`, c: `Julian omuz silkiyor ama gözleri üzgün. Kaelon minnetle bakıyor.`, p: 10, diger: { kim: `kaelon`, p: 15 } },
      ],
    },
    6: {
      b: `İlk festival şarkısı`,
      m: [
        `Julian günlerce çalıştı; bir festival şarkısı. Dünya'dan bir türkü ritmi, Malken'den bir yıldız ilahisi, Kithron'dan eski bir göç marşı. Hepsi birbirine örülmüş.`,
        `Tavernada ilk kez çaldığında herkes ayağa kalkıyor, dans ediyor. Julian sahneden sana bakıyor; yüzü ter içinde, gözleri ışıl ışıl. “Festivallerde çalınacak! Nota setleri hazır.”`,
      ],
      s: [
        { e: `Dans et.`, c: `Kalabalığa karışıyorsun. Julian şarkıyı senin için bir kez daha baştan alıyor.`, p: 22, moral: 5 },
        { e: `“Bu şarkının adı ne?”`, c: `Julian bir an düşünüyor: “Altı Yıldız Altında.” Festival morali artık daha yüksek.`, p: 20, moral: 3 },
      ],
    },
    7: {
      b: `Sessiz dakikalar`,
      m: [
        `Bir öğleden sonra Julian'a seslenirsin; dönmüyor. Bir daha seslenirsin; yine dönmüyor. Omzuna dokununca irkiliyor, sonra yüzü bembeyaz oluyor.`,
        `“Duymadım,” diyor fısıltıyla. “Gemideki patlama... kulaklarım her ay biraz daha az duyuyor. Kimseye söylemedim. Müzisyen sağır olursa ne olur Kaptan? Hiç. Hiçbir şey.” Gözlerinden yaşlar süzülüyor.`,
      ],
      s: [
        { e: `Ellerini tut, yavaşça yüzüne bakarak konuş.`, c: `Julian dudaklarını okuyor, gülümsüyor: “Böyle de anlıyorum.” İlk kez ağladığını kimseden saklamıyor.`, p: 28 },
        { e: `“Lyris'e gidelim; belki bir çaresi vardır.”`, c: `Julian bir an korkuyla bakıyor, sonra başını sallıyor: “Birlikte mi? Tamam. Birlikte.”`, p: 25, diger: { kim: `lyris`, p: 5 } },
      ],
    },
    8: {
      b: `Sesin ortağı`,
      m: [
        `Julian tepede, rüzgârın çaldığı çanların arasında. “Lyris bir tedavi deniyor,” diyor. “Belki kurtarır, belki yavaşlatır. Ama artık korkmuyorum.”`,
        `Sana dönüyor: “Kaptan, eğer bir gün tamamen duymazsam... senin sesini en son duymak istiyorum. Hayatımızı birlikte geçirebiliriz. Ya da ortak beste yemini ederiz: ben notaları, sen sözleri yazarsın.”`,
      ],
      s: [
        { e: `Hayatını onunla paylaşma yolunu aç.`, c: `Julian bir çanı tıklatıyor, sesi uzun ve berrak. “Bu ses ikimizin.”`, p: 25, bayrak: { yp_julian: `es` } },
        { e: `Ortak beste yemini et.`, c: `Julian bir defter açıyor, ilk satıra bir nota çiziyor. “Senin sıran. İlk söz.”`, p: 25, bayrak: { yp_julian: `bag` } },
      ],
    },
    9: {
      b: `İki kat moral`,
      m: [
        `Tavernada her akşam Julian'ın sahnesi; artık kulaklarına yakın küçük kristal çanlar asılı, titreşimleri parmak uçlarıyla hissediyor. Ritmi kaçırmıyor.`,
        `“Duymasam da hissediyorum,” diyor. “Müzik titreşimdir Kaptan. Tavernaya gelen herkes iki kat dinlenecek artık; bu bir söz.”`,
      ],
      s: [
        { e: `Sahneye çık ve onunla söyle.`, c: `Kalabalık alkışlıyor. Julian sana sarılıyor: “Senin sesini hissettim!”`, p: 22, moral: 5 },
        { e: `En ön masada oturup dinle.`, c: `Julian bütün akşam senin masana çalıyor.`, p: 18, moral: 3 },
      ],
    },
    10: {
      b: `Altı yıldızın senfonisi`,
      m: [
        `Büyük Festival gecesi. Meydanda bütün koloni toplanmış; tepede altı dev çan, çocuk korosu, Marcus'un davulu, Sorya'nın tencere kapakları. Julian ortada, yalınayak, ayakları yere değiyor.`,
        `İlk çan çalıyor; Julian titreşimi tabanlarından hissediyor, kollarını kaldırıyor. Bütün koloni aynı anda başlıyor. Altı yıldızın senfonisi: göçün, kayıpların, yeni yuvanın şarkısı.`,
        `Son notadan sonra Julian gözlerini açıyor; hiçbir şey duymuyor ama yüzünde dünyanın en mutlu gülümsemesi. “Duydum,” diyor. “Hepsini duydum.”`,
      ],
      s: [
        { e: `Ona sarıl.`, c: `Kalabalık alkışlıyor; Julian alkışları ellerinin titreşiminden sayıyor. Tavernanın moral gücü kalıcı olarak iki kat.`, p: 30, moral: 12 },
        { e: `Ellerini birleştirip son notayı birlikte çalın.`, c: `Çan uzun, uzun titreşiyor. Julian fısıldıyor: “Ölümsüz şarkı.”`, p: 30, moral: 12 },
      ],
    },
  },
};
