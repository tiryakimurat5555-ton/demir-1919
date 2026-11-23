// Paket 8A: başlangıç çekirdek kadrosunun (Sorya, Kaelon, Lyris, Zarek, Veysel) on kademe sahneleri.
// Her sahne: b başlık, m paragraflar (00-okuma 1.2: 2-4 paragraf), s seçenekler { e etiket, c karakterin yanıtı,
// p ilişki puanı (bar hızıyla çarpılır), diger { kim, p } öteki yerleşimciye etkisi, bayrak, moral }.
// Kademe 8 seçimleri bayrak yp_<kimlik> = 'es' (yaşam ortaklığı yolu, Paket 4) ya da 'bag' (kardeşlik / aile bağı) yazar.

export const SAHNE_A = {
  sorya: {
    1: {
      b: `İlk sıcak çorba`,
      m: [
        `Kamp ateşinin başında Sorya bir tencereyi karıştırıyor; kapsülden kurtardığı son kuru sebzelerle, bir avuç Malken otuyla. Buharın kokusu rüzgârı bile yumuşatıyor sanki. Seni görünce kepçeyi kaldırıyor, ilk tası sana uzatıyor: “Önce kaptan içer, sonra mürettebat. Eski usul.”`,
        `Tas elinde ılık. Sorya bir an yüzüne bakıyor, ne diyeceğini bekliyor; sanki bu çorbadan çok daha fazlası sorulmuş gibi.`,
      ],
      s: [
        { e: `Tadı harika, eline sağlık.`, c: `Sorya'nın omuzları gevşiyor: “Hah! Bu gezegende de bir şeylerin tadı varmış demek. Yarın daha iyisini yaparım.”`, p: 15 },
        { e: `Güzel ama daha çok erzak gerek.`, c: `Sorya başını sallıyor, gülümsemesi biraz soluyor: “Haklısın. Ben de onu düşünüyordum. Sen bul, ben pişireyim; anlaştık mı?”`, p: 8 },
      ],
    },
    2: {
      b: `Kayıp baharat kesesi`,
      m: [
        `Sorya telaşla çantalarını boşaltıyor: “Kesem yok! Annemin karıştırdığı kesesi; kırmızı kök, gümüş yaprak, bir tutam Varek tuzu. Düşüşte kapsülün arkasına savrulmuş olmalı.”`,
        `Enkazın yanındaki kayalıkta, bazalt tozunun altında, ipi kopmuş küçük bir deri kese buluyorsun. Açınca keskin, sıcak bir koku yayılıyor; Sorya kokuyu duyar duymaz koşarak geliyor.`,
      ],
      s: [
        { e: `Keseyi ona ver.`, c: `“Ah, kokusu duruyor!” Keseyi göğsüne bastırıyor. “Bu akşamki yahni koloninin aklında kalacak, söz.”`, p: 18 },
        { e: `Keseyi ver ve hikâyesini sor.`, c: `“Annem her hasattan bir tutam ayırırdı,” diyor, sesi yumuşayarak. “Kıtlıkta bile. Derdi ki baharat umuttur, kızım; yemek yoksa bile kokusu kalır.”`, p: 22 },
      ],
    },
    3: {
      b: `Eski toprağın kokusu`,
      m: [
        `Gece, ateş sönmeye yüz tutmuşken Sorya yanına oturuyor. Uzun süre konuşmuyor; sonra avucundaki toprağı koklayarak başlıyor: “Benim köyümde, Axira'nın yeşil ışığı altında tarlalar hiç bitmezdi sanırdık. Bir yıl yağmur gelmedi. Sonra bir yıl daha.”`,
        `“Ambarları ben yönetiyordum. Herkese eşit pay verdim, kendime en azını ayırdım. Yine de yetmedi. Kış bittiğinde sofraya oturanların yarısı yoktu.” Gözlerini ateşe dikiyor. “O günden beri bir tencere boş kalınca nefesim daralıyor Kaptan.”`,
      ],
      s: [
        { e: `Teselli et: “Elinden geleni yapmışsın.”`, c: `Sorya uzun uzun nefes alıyor. “Bunu yüksek sesle ilk kez biri söyledi. Sağ ol Kaptan.” Elini kısa bir an omzuna koyuyor.`, p: 20, moral: 5 },
        { e: `Pratik çözüm: “Burada ambarları birlikte planlayalım.”`, c: `“Birlikte,” diye tekrarlıyor, sanki kelimeyi tadıyormuş gibi. “Evet. Tek başıma değil bu sefer.” Koloniye on moral ekleyecek bir yahni sözü veriyor.`, p: 20, moral: 10 },
      ],
    },
    4: {
      b: `Aşhanenin ilk ekmeği`,
      m: [
        `Taş fırının ağzında ateş harlıyor. Sorya hamuru yoğururken Usta Veysel tuğlaları kontrol ediyor: “Dünya'da annem böyle yapardı; hamuru üç kez katlar, bir kez dua ederdi.” Sorya gülüyor: “Bizde altı kez katlarız, her yıldıza bir kez.”`,
        `İlk ekmek fırından biraz yanık çıkıyor. İkisi birden sana bakıyor; ilk lokma senin hakkın.`,
      ],
      s: [
        { e: `Ekmeği ikiye böl, ikisine de uzat.`, c: `Sorya ile Veysel aynı anda kahkahayı basıyor. “İki dünyanın ilk ekmeği,” diyor Veysel. Sorya gözlerini siliyor: “Yanığı bile güzel.”`, p: 20, diger: { kim: 'veysel', p: 10 } },
        { e: `Bir ısırık al: “Biraz daha pişse olurmuş.”`, c: `“Haklısın,” diyor Sorya, alınmadan. “Fırın daha yeni; o da bizi tanıyor. Yarın tam kıvamında.”`, p: 10 },
      ],
    },
    5: {
      b: `Erzak paylaşımı`,
      m: [
        `Meydanda sesler yükseliyor. Tüccar Mateo fazla tahılı Kaptan Orin'e satmak istiyor: “Bu fiyatla iki ayda kalkan bobini alırız!” Sorya ellerini beline koymuş: “Fazla diye bir şey yok Mateo. Yarın ne olacağını kim bilir? Ambarda dursun, aç kalanla bölüşülsün.”`,
        `İkisi de sana dönüyor. Sorya'nın sesinde bir titreme var; bu konu onun için tahıldan çok daha fazlası.`,
      ],
      s: [
        { e: `Sorya'ya hak ver: ambar dolu kalsın.`, c: `Sorya derin bir nefes alıyor: “Teşekkür ederim Kaptan. Mateo kızacak, biliyorum; ama kış gelince anlayacak.”`, p: 25, diger: { kim: 'mateo', p: -10 } },
        { e: `Orta yol: yarısı ambara, yarısı takasa.`, c: `Sorya bir an susuyor, sonra başını sallıyor: “Yarısı... Yeter ki kimse aç kalmasın.” Mateo da homurdanarak razı oluyor.`, p: 18, diger: { kim: 'mateo', p: 10 }, moral: 3 },
      ],
    },
    6: {
      b: `Vaha ziyafeti`,
      m: [
        `Sorya bir liste uzatıyor: vaha hurması, ışık otu, bir sepet fosforlu liken. “Koloninin ilk büyük sofrası olacak Kaptan. Herkes aynı masada; Malken de, Dünya da, yeni gelenler de.”`,
        `Akşam olunca aşhanenin uzun masası doluyor. Sorya'nın elleri hiç durmuyor; tencereler, tepsiler, buğulanan kâseler. En son kendisi oturuyor, en az o yiyor; ama yüzü kimseninkine benzemiyor, aydınlık.`,
        `“Bu tarif artık koloninin,” diyor kadeh kaldırırken. “Ben gitsem de kalır.”`,
      ],
      s: [
        { e: `“Sen gitmeyeceksin; bu sofra seninle güzel.”`, c: `Sorya kızarıyor, kepçeyi sallıyor: “Hadi oradan! Ye bakalım, soğuyor.” Ama gözleri parlıyor.`, p: 20, moral: 5 },
        { e: `Kadehini kaldır: “Sorya'nın ocağına!”`, c: `Bütün masa aynı anda tekrarlıyor. Sorya ilk kez sofrada oturup sonuna kadar kalıyor.`, p: 18, moral: 8 },
      ],
    },
    7: {
      b: `Kırık tahta kaşık`,
      m: [
        `Aşhane boşalmış, yalnız ocağın közü kalmış. Sorya önlüğünün cebinden ince, ortasından çatlamış bir tahta kaşık çıkarıyor; sapına küçük bir yıldız oyulmuş.`,
        `“Kız kardeşim Nira'nın,” diyor fısıltıyla. “Kıtlığın son haftası payını bana verdi; ‘Sen ambarı yönetiyorsun, sen ayakta kalmalısın’ dedi. Ben de aldım Kaptan. Aldım.” Sesi kırılıyor. “O yüzden kimsenin aç kalmasına dayanamıyorum. Her kâse onun payı.”`,
      ],
      s: [
        { e: `Kaşığı nazikçe tut ve sus.`, c: `Uzun bir sessizlik. Sonra Sorya kaşığı geri alıp cebine koyuyor: “Sustuğun için sağ ol. Bunu bir kez söylemem gerekiyordu.”`, p: 28 },
        { e: `“Nira seni yaşatmak istedi; başarmış.”`, c: `Sorya'nın gözlerinden yaşlar süzülüyor ama gülümsüyor: “Başarmış... Evet. Her sabah ocağı yaktığımda onu da yakıyorum.”`, p: 25 },
      ],
    },
    8: {
      b: `Kalbin kapısı`,
      m: [
        `Bir sabah Sorya aşhanenin kapısında seni bekliyor; önlüğü yok, saçları özenle örülmüş. “Kaptan, uzun zamandır bir şey söylemek istiyorum. Bu koloni benim evim oldu. Sen de... sen de bu evin parçasısın.”`,
        `Elinde iki küçük kase var, Malken geleneğinde paylaşılan ilk sofranın kaseleri. “İstersen bunu birlikte taşıyalım. Ya da istersen, kardeşlik yemini edelim; ben koloninin anası, sen de kardeşim olursun. İkisi de benim için kıymetli.”`,
      ],
      s: [
        { e: `Yaşam ortaklığına kapı aç.`, c: `Sorya kaseyi eline bırakıyor, parmakları titriyor: “Acele yok. Ama bu kapı artık açık.”`, p: 25, bayrak: { yp_sorya: 'es' } },
        { e: `Kardeşlik yemini et.`, c: `“Koloninin baş anası ve kardeşi,” diyor Sorya, gururla. “Bütün sofralarda yerin hep sağımda olacak.”`, p: 25, bayrak: { yp_sorya: 'bag' } },
      ],
    },
    9: {
      b: `Fırtına gecesi`,
      m: [
        `Ayaz rüzgârı kapıları zorluyor; jeneratör bir kez öksürüp susuyor. Kolonide herkes battaniyelere sarınmışken aşhanenin bacası tütmeye devam ediyor. Sorya bütün gece çorba kazanlarının başında, kepçe kepçe sıcak dağıtıyor.`,
        `Şafağa doğru yanına geliyor, yorgun ama dimdik: “Sefere çıktığında çantana ek rasyon koyacağım. Tartışma; bu benim işim.”`,
      ],
      s: [
        { e: `Kazanın başına geçip ona yardım et.`, c: `Yan yana kepçe sallıyorsunuz. “Bir kaptanın çorba dağıttığını kimse görmedi,” diye gülüyor Sorya. “Ben gördüm. Yeter.”`, p: 20, moral: 5 },
        { e: `“Biraz dinlen, ben nöbeti alırım.”`, c: `“Dinlenmek mi?” Gülüyor, sonra tabureye çöküyor. “Peki. Beş dakika. Ama kepçeyi bırakmam.”`, p: 15 },
      ],
    },
    10: {
      b: `İki dünyanın sofrası`,
      m: [
        `Meydanın ortasına uzun masalar dizilmiş. Sorya ile Veysel yıllardır üzerinde çalıştıkları tarifi tamamlamış: Dünya arpasından ekmek, vaha hurmasıyla tatlandırılmış, ışık otuyla kokulandırılmış bir şölen.`,
        `Sorya masanın başında sesleniyor: “Kıtlıkta kaybettiklerimiz için bir lokma, burada bulduklarımız için bir lokma.” Herkes aynı anda ekmeği bölüyor. Bir an kimse konuşmuyor; sonra kahkahalar, şarkılar.`,
        `Sorya senin yanına oturuyor ve ilk kez yemeğini sonuna kadar yiyor. “Ocak artık hiç sönmez Kaptan,” diyor. “Çünkü onu tek bir el değil, hepimiz tutuyoruz.”`,
      ],
      s: [
        { e: `“Bu sofra senin eserin.”`, c: `“Bizim eserimiz,” diye düzeltiyor, gözleri ışıl ışıl. Koloninin yemek ve moral verimi kalıcı olarak yükseldi.`, p: 30, moral: 10 },
        { e: `Sessizce elini tut.`, c: `Sorya avucunu sıkıyor, cebindeki tahta kaşığı masanın ortasına bırakıyor: “Nira da burada artık.”`, p: 30, moral: 10 },
      ],
    },
  },

  kaelon: {
    1: {
      b: `Basınç kontrolü`,
      m: [
        `Kaelon jeneratörün kapağına eğilmiş, göstergeyi parmağıyla tıklatıyor. Seni duyunca başını kaldırmadan konuşuyor: “Basınç sabit. Soğutucu yarı dolu. Bir haftaya yeter.”`,
        `Sonra kısa bir sessizlik. Sana bakıyor, ölçüp tartıyor: “Laf kalabalığı sevmem Kaptan. Bir şey bozulursa söyle, ben düzeltirim. Benden başka bir şey bekleme.”`,
      ],
      s: [
        { e: `“Anlaştık. Neye ihtiyacın var?”`, c: `Kaelon'un kaşları hafifçe kalkıyor: “Contalar. Ve sessizlik.” Belki bir gülümseme; ama emin olamıyorsun.`, p: 15 },
        { e: `“Biraz sohbet etsek fena olmaz.”`, c: `“Sohbet,” diye tekrarlıyor, sanki yabancı bir kelime. “Jeneratör çalışırken konuşuruz. Belki.”`, p: 5 },
      ],
    },
    2: {
      b: `Boru sızıntısı`,
      m: [
        `Atölyenin dibinde bir boru tıslıyor. Kaelon elinde anahtar, yüzü buhardan kızarmış: “Conta çürümüş. Biri vanayı tutsun, ben sıkıyorum. Yavaş; çok yavaş.”`,
        `Vanayı tutuyorsun. Metal ısınmış, ellerin yanıyor ama bırakmıyorsun. Kaelon son turu atıyor ve tıslama kesiliyor.`,
      ],
      s: [
        { e: `Elini çekmeden sonuna kadar tut.`, c: `“İyi el,” diyor Kaelon, ilk kez sesinde bir sıcaklıkla. “Tamir masraflarımız azalır artık; sen de bil.”`, p: 20 },
        { e: `“Bir dahakine eldiven alayım.”`, c: `“Akıllıca.” Rafından eski bir eldiven alıp sana atıyor. “Benimki. Geri vermene gerek yok.”`, p: 15 },
      ],
    },
    3: {
      b: `Eski İngiliz anahtarı`,
      m: [
        `Kaelon'un hep elinde taşıdığı ağır anahtar, sapı yıpranmış, ucu ayna gibi parlamış. Sen sormadan söylüyor: “Bunu ben yapmadım. Usta Rhen'indi. Benim ustamın.”`,
        `Anahtarı tezgâha bırakıyor, sonra geri alıyor, sanki bırakamıyormuş gibi. “Ustam derdi ki iyi alet sahibini hatırlar. Ben de hatırlamak istemediklerimi.” Konuşmayı orada kesiyor: “Neyse. Contalar geldi mi?”`,
      ],
      s: [
        { e: `Üstelemeden konuyu değiştir.`, c: `Kaelon belirgin biçimde rahatlıyor. “Geldi. İyi.” Anahtarı sana uzatıp tutmana izin veriyor; bu, onun dilinde çok şey demek.`, p: 22 },
        { e: `“Ustanı anlatmak istersen dinlerim.”`, c: `“Bir gün,” diyor, gözlerini kaçırarak. “Bugün değil.” Yine de teşekkür eder gibi başını eğiyor.`, p: 12 },
      ],
    },
    4: {
      b: `Alet testi`,
      m: [
        `Atölyede yeni dövülmüş bir kazma ve balta duruyor. Kaelon bunları sana uzatıyor: “Sahada dene. Sap titreşiyor mu, ağız dönüyor mu, bana söyle. Teoride iyi; teori bir şey değil.”`,
        `Dönüşte raporunu dinlerken not alıyor, her kelimeye başını sallıyor. Sonra bir şey fark ediyorsun: senin söylediklerini kendi yazısıyla deftere geçiriyor, altına adını da ekliyor.`,
      ],
      s: [
        { e: `Ayrıntılı ve dürüst rapor ver.`, c: `“Sap gevşekmiş, haklısın. Kimse söylemezdi bunu.” Kaelon sapı söküp yeniden takıyor. “Sana güvenebilirim.”`, p: 22 },
        { e: `“İyi gibi, sorun yok.”`, c: `Kaelon kaşlarını çatıyor: “‘İyi gibi’ bir ölçü değil Kaptan.” Yine de aleti rafa kaldırıyor.`, p: 5 },
      ],
    },
    5: {
      b: `Hız mı, güvenlik mi?`,
      m: [
        `Jeneratörün devrini artırırsan dökümhane yüzde yirmi hızlanacak. Kaelon panelin önüne geçip seni durduruyor: “Hayır. Contalar bu basınca dayanmaz. Bugün dayanır, yarın dayanır; bir gün dayanmaz ve o gün biri ölür.”`,
        `Gözleri sert ama sesi titriyor. Bu, bir makineden çok daha fazlası hakkında.`,
      ],
      s: [
        { e: `“Güvenliği seçiyorum. Devri yükseltmeyelim.”`, c: `Kaelon'un omuzları düşüyor, sanki yıllardır tuttuğu bir yükü bıraktı: “Teşekkür ederim. Bunu duymaya ihtiyacım vardı.”`, p: 30 },
        { e: `“Hız lazım Kaelon; risk alacağız.”`, c: `Kaelon bir süre bakıyor, sonra sessizce paneli kapatıyor: “Emir senin.” Ama sesi buz gibi.`, p: -5 },
      ],
    },
    6: {
      b: `Geçmişin valfi`,
      m: [
        `Kaelon bir kutu açıyor; içinde sararmış bir rapor. “Talvara reaktör istasyonu. On iki yıl önce. Ustam Rhen hastaydı; tamiri ben onayladım. Acelem vardı, takvim gecikmişti.”`,
        `Raporu sana uzatıyor: basınç eğrileri, bir valfin çizimi, kırmızıyla daire içine alınmış bir conta. “İki çırağım içerideydi. Ben dışarıdaydım.” Bir süre susuyor. “O günden beri her contayı üç kez kontrol ederim. Ve kimseye iş vermem.”`,
        `Sonra raporun arkasından bir sayfa daha çıkarıyor: dondurucu köpüğün daha verimli karışımı. “Bunu o kazadan sonra buldum. Artık senin.”`,
      ],
      s: [
        { e: `“Bunu paylaştığın için teşekkür ederim.”`, c: `Kaelon raporu kutuya geri koyuyor ama kapağını kilitlemiyor. “Paylaşmak... garip. Hafifletiyor.”`, p: 25 },
        { e: `“Bu hata seni tanımlamıyor.”`, c: `“Tanımlıyor,” diyor yavaşça. “Ama belki tek tanımım değildir.”`, p: 25 },
      ],
    },
    7: {
      b: `İki isim`,
      m: [
        `Anahtarın sapını ışığa tutuyor. Yıpranmış metalin içine kazınmış iki küçük isim: Tav ve Mirel. “Çıraklarım,” diyor. “Tav on yedi yaşındaydı. Mirel her sabah bana çay getirirdi, ben hiç teşekkür etmezdim.”`,
        `Sesi kesiliyor. Atölyenin uğultusu içinde ilk kez Kaelon'un ellerinin titrediğini görüyorsun.`,
      ],
      s: [
        { e: `“Tek başına suçlu değilsin.”`, c: `Kaelon bir süre hiçbir şey demiyor. Sonra fısıldıyor: “On iki yıldır biri bunu söylesin diye bekliyormuşum.”`, p: 28 },
        { e: `“Bu yükü artık bırakmalısın.”`, c: `“Bırakırsam unuturum diye korkuyorum,” diyor. “Ama belki... taşımakla hatırlamak aynı şey değildir.”`, p: 25 },
      ],
    },
    8: {
      b: `Çırak kabulü`,
      m: [
        `Okulun önünde bir genç bekliyor; elinde paslı bir vida, gözleri meraklı. Kaelon yanında, kollarını kavuşturmuş: “Defne bu çocuğun makinelere yatkın olduğunu söylüyor. Bilmiyorum Kaptan. On iki yıldır kimseyi yanıma almadım.”`,
        `Sana dönüyor, sesi her zamankinden yumuşak: “Ya da belki başka bir şey düşünmeliyim. Sen... sen de burada olacaksan, bu atölyeyi birlikte taşırız. Nasıl istersen.”`,
      ],
      s: [
        { e: `Hayatını onunla paylaşma yolunu aç.`, c: `Kaelon kısa bir süre şaşkın bakıyor, sonra anahtarı sana uzatıyor: “Bunu tutmana ilk kez izin veriyorum. Bundan sonra hep.”`, p: 25, bayrak: { yp_kaelon: 'es' } },
        { e: `“Çırağı al; ben her zaman yanındayım.”`, c: `Kaelon gence dönüyor: “Adın ne? Pekâlâ. İlk ders: contayı üç kez kontrol et.” Sana bakıp başını eğiyor; bir dostluk yemini.`, p: 25, bayrak: { yp_kaelon: 'bag' } },
      ],
    },
    9: {
      b: `Sessiz nöbet`,
      m: [
        `Sabahları aletlerin rafında hep aynı düzen var: bilenmiş, yağlanmış, sapları sıkılmış. Kimse görmeden Kaelon gece gelip hepsinin bakımını yapıyor.`,
        `Sorduğunda omuz silkiyor: “Maden asansörü dün gece gıcırdıyordu, halattan bir tel kopmuş. Değiştirdim. Senin aletlerin de bundan sonra benim işim. Ücretsiz. Tartışma.”`,
      ],
      s: [
        { e: `“Gece uyumalısın Kaelon.”`, c: `“Uyurum,” diyor, “Bu koloni güvende olduğunda.” Sonra ekliyor: “Artık daha çok uyuyorum. Senin sayende.”`, p: 18 },
        { e: `Sabah ona sıcak çay götür.`, c: `Kaelon çayı alıyor ve uzun süre bakıyor. “Mirel de böyle yapardı,” diyor. Ve bu sefer, teşekkür ediyor.`, p: 25 },
      ],
    },
    10: {
      b: `Kusursuz çekirdek`,
      m: [
        `Bütün gece çalışmışlar: Kaelon, çırağı, Halvar, Veysel. Koloninin bütün enerji hatları, dökümhane, atölye ve santral tek bir akışa bağlanmış. Kaelon son vanayı çeviriyor; borulardan tek bir ses yükseliyor, uyumlu, temiz bir uğultu.`,
        `Ekrana bakıyor: kayıp yok, sızıntı yok. Uzun süre sessiz kalıyor. Sonra anahtarı çırağına uzatıyor. “Bu artık senin. Sapındaki isimlere bak; onlar da bu çekirdeğin parçası.”`,
        `Sana dönüp ilk kez kahkahayla gülüyor: “Kusursuz bir makine yok Kaptan. Ama kusursuz bir ekip olabilirmiş.”`,
      ],
      s: [
        { e: `“Bu senin eserin, Kaelon.”`, c: `“Bizim,” diyor. Atölyede alet bakımı artık kalıcı olarak ücretsiz.`, p: 30, moral: 8 },
        { e: `Çırağın omzuna dokun: “İyi bir ustası var.”`, c: `Kaelon kızarıyor, başını çeviriyor; ama omuzları dimdik.`, p: 30, moral: 8 },
      ],
    },
  },

  lyris: {
    1: {
      b: `Nabız kontrolü`,
      m: [
        `Lyris iki parmağını bileğine koyuyor, gözlerini kapatıp sayıyor. Kapsülün revirinde yalnızca monitörün bip sesi var. “Altmış sekiz. İyi. Uyku düzensiz ama.”`,
        `Gözlerini açıp seni süzüyor, bir hekimin dikkatiyle ve bir yabancının mesafesiyle: “Kaptanlar kendilerini en son düşünür. Ben düşüneceğim. Bunu bil.”`,
      ],
      s: [
        { e: `“Haklısın, daha çok dinleneceğim.”`, c: `Lyris başını hafifçe eğiyor: “Söz vermek kolay. Göreceğiz.” Ama sesi bir parça yumuşuyor.`, p: 15 },
        { e: `“Önce koloni, sonra ben.”`, c: `“Tipik,” diyor kuru bir sesle. “Kaptan düşerse koloni de düşer. Bunu not ediyorum.”`, p: 5 },
      ],
    },
    2: {
      b: `İlk yardım çantası`,
      m: [
        `Lyris'in elinde bir liste: aloe yaprağı, temiz silika tozu, sargı lifi olarak kullanılabilecek sert kökler. “İlaç kutularımız yarıda. Her binaya bir çanta asmalıyız. Kaza sormadan gelir.”`,
        `Topladıklarını revire getirdiğinde onları tek tek inceliyor, birini geri ayırıyor: “Bu yaprak zehirli; bir dahakine kenarındaki kırmızı damarlara bak.” Sonra hafif bir gülümseme: “Ama gerisi mükemmel.”`,
      ],
      s: [
        { e: `“Öğrettiğin için sağ ol.”`, c: `“Öğrenmek isteyen birine öğretmek kolay,” diyor Lyris. Çantaları dikmeye başlıyor; ilk çantayı sana veriyor.`, p: 18 },
        { e: `“Yanlışlık oldu, kusura bakma.”`, c: `“Kusur değil, bilgi eksiği.” Kırmızı damarlı yaprağı bir kavanoza koyuyor. “Bunu da inceleyeceğim. Zehir de bir öğretmendir.”`, p: 15 },
      ],
    },
    3: {
      b: `Eski laboratuvar yaka kartı`,
      m: [
        `Lyris'in masasında, ilaç şişelerinin arasında solmuş bir yaka kartı duruyor: üzerinde bir akademi mührü, bir fotoğraf ve ‘Kıdemli Araştırmacı’ unvanı. Kartı fark ettiğini görünce çekmeceye kaldırmıyor; sadece eliyle üzerini örtüyor.`,
        `“Büyük bir akademideydim,” diyor yavaşça. “Hücreleri iyileştirmeyi öğreniyorduk. Sonra birileri onları başka bir şey için kullanmak istedi.” Bir süre susuyor. “Ben de ayrıldım. Hikâyenin geri kalanı... başka bir gün.”`,
      ],
      s: [
        { e: `“Hazır olduğunda dinlerim.”`, c: `Lyris başını kaldırıp ilk kez gözlerinin içine bakıyor: “Bunu söylemen yeterli.”`, p: 22 },
        { e: `“Ne yaptılar? Silah mı?”`, c: `Lyris'in yüzü kapanıyor: “Başka bir gün dedim Kaptan.” Kartı çekmeceye kaldırıyor.`, p: 0 },
      ],
    },
    4: {
      b: `Numune ikilemi`,
      m: [
        `Madenden getirilen bir kavanozda mor, yavaşça nabız atan bir spor kümesi. Lyris'in sesi her zamankinden gergin: “Bunu bulan işçinin elleri kızarmış. Bulaşıcı mı bilmiyorum. Yakarız; hiçbir şey kalmaz. Ya da incelersek belki bir panzehir buluruz. Belki de bir felaket.”`,
        `Kavanozu ışığa tutuyor. Sporlar ışığa doğru kıpırdıyor. “Karar senin Kaptan. Ama nasıl karar verdiğini dikkatle izleyeceğim.”`,
      ],
      s: [
        { e: `Karantinada, sıkı kurallarla incele.`, c: `“Kilitli bölme, iki kat filtre, kayıt altında her adım,” diye tekrarlıyor Lyris, kendine söyler gibi. “Evet. Bilim böyle yapılır. Dikkatle.”`, p: 28 },
        { e: `Hemen yakalım, risk almayalım.`, c: `Lyris başını sallıyor ama bir parça hayal kırıklığıyla: “Güvenli. Ama belki bir hayatı da yaktık.” Kavanozu ateşe veriyor.`, p: 12 },
        { e: `İnceleyelim; işe yararsa silah da olur.`, c: `Lyris kavanozu masaya bırakıp geri çekiliyor. Yüzü bembeyaz: “Bunu bir daha söyleme Kaptan.”`, p: -5 },
      ],
    },
    5: {
      b: `Ruhun şifası`,
      m: [
        `Lyris revirin önünde, ellerinde bir liste: uykusuzluk, kabus, sebepsiz ağlama nöbetleri. “Bedenleri iyileştiriyorum Kaptan. Ama insanlar yorgun. Malkenler kendi tapınaklarını, Dünyalılar sıcak suyu özlüyor.”`,
        `“Bir hekim olarak söylüyorum: bir tapınak, bir hamam, bir yerde oturup ağlayabilecekleri sessiz bir oda... Bunlar da ilaçtır. Belki en iyisi.”`,
      ],
      s: [
        { e: `“Haklısın; tapınak ve hamam öncelik olsun.”`, c: `Lyris rahatlıyor: “Bilim ve inanç düşman değil. Biri bedeni, öteki ruhu taşıyor.” Listeyi sana veriyor.`, p: 22 },
        { e: `“Önce savunma, sonra bunlar.”`, c: `“Anlıyorum,” diyor, ama sesi soğuk. “Duvarları sağlam, içi çökmüş bir koloni de savunulamaz Kaptan.”`, p: 5 },
      ],
    },
    6: {
      b: `Stres azaltıcı çay`,
      m: [
        `Revirde bir kazan kaynıyor; içinde mor çiçekli bir Axira otu, bir tutam kök, bal. Lyris bir kupa uzatıyor: “Annemin tarifi. Malken şifacıları sınavdan önce içerdi. Kalbi yavaşlatır, düşünceyi bulandırmaz.”`,
        `Masasında eski, yıpranmış bir defter açık. “Salgın günlüğü,” diyor. “Akademiden ayrılmadan önce bir köyde çalıştım; bu çay o zaman doğdu. Kırk gün boyunca kimse uyumadı. Bu çay sayesinde hiçbirimiz aklını kaybetmedi.”`,
        `Tarifi deftere senin için de yazıyor. “Revir artık bunu herkese verebilir.”`,
      ],
      s: [
        { e: `Çayı yudumla: “Ilık bir huzur gibi.”`, c: `Lyris gülümsüyor, gerçek bir gülümseme: “Tam da öyle olması gerekiyordu.”`, p: 22 },
        { e: `“Kırk günü anlatır mısın?”`, c: `Lyris defteri sana uzatıyor. Satırlarda yorgun bir el, ama hiç vazgeçmeyen bir yazı. “Oku. Ben anlatamam ama okuyabilirsin.”`, p: 25 },
      ],
    },
    7: {
      b: `Silahlanan biyoloji`,
      m: [
        `Gece, revirin ışığı kısık. Lyris pencerenin önünde, sırtı sana dönük. “Hücre onarıcı bir virüs geliştirmiştik. Yaraları saatler içinde kapatan. Sonra bir gün yönetim bir değişiklik istedi: aynı virüs, ters yönde.”`,
        `“Durduramadım. Raporlarımı yaktılar, ekibimi dağıttılar. Ben de kaçtım; yeminimi alıp kaçtım. Sonra duydum: bir sınır kasabası, bir sabah, hepsi.” Sesi bir an tamamen kayboluyor. “Bilmeden bir silahın annesi oldum Kaptan.”`,
        `Sana dönüyor. Yüzünde yargıyı bekleyen birinin sertliği var.`,
      ],
      s: [
        { e: `Yargılamadan dinle: “Anlattığın için teşekkürler.”`, c: `Lyris'in yüzündeki sertlik yavaşça çözülüyor. “Yargılamadın,” diyor şaşkınlıkla. “Bunu beklemiyordum.” Bir süre birlikte susuyorsunuz.`, p: 30 },
        { e: `“Sen durdurmaya çalıştın; suç onların.”`, c: `“Belki,” diyor. “Ama ben yine de her gün burada iyileştirerek ödeyeceğim.” Gözleri dolu ama dimdik.`, p: 25 },
      ],
    },
    8: {
      b: `Yeni yemin`,
      m: [
        `Lyris revirin kapısına küçük bir levha asmış: ‘Bu odada bilim yalnızca iyileştirir.’ Altında koloni hekimlerinin, Nerissa'nın ve çıraklarının imzaları.`,
        `“Yeminimi tazeledim,” diyor. “Ama bir şey eksik.” Sana dönüyor, her zamanki ölçülü sesiyle ama gözleri farklı: “Kaptan... hayatımı bir ilke etrafında kurdum. Belki artık bir insan etrafında da kurabilirim. Ya da bu yemine tanık olursun; sonsuza dek ortak bir sözün bekçisi oluruz.”`,
      ],
      s: [
        { e: `Hayatını onunla paylaşma yolunu aç.`, c: `Lyris derin bir nefes alıyor: “Bunu yüksek sesle söylemek, bir virüsü çözmekten zormuş.” Elini tutuyor; nabzı hızlı.`, p: 25, bayrak: { yp_lyris: 'es' } },
        { e: `Yemine tanık ol ve imzala.`, c: `İmzanı levhanın en altına atıyorsun. Lyris: “Artık bu sözün iki bekçisi var.”`, p: 25, bayrak: { yp_lyris: 'bag' } },
      ],
    },
    9: {
      b: `Tam şifa`,
      m: [
        `Seferden döndüğünde revirde senin için hazırlanmış bir yatak var; yanında çay, temiz sargı, bir liste. Lyris kapıda bekliyor: “Her dönüşünde böyle olacak. Yaraları, stresi, yorgunluğu daha hızlı çözeceğiz. Yüzde yirmi daha hızlı; hesapladım.”`,
        `Seni muayene ederken sessizce ekliyor: “Hekimler hasta beklemez Kaptan. Ama ben seni bekliyorum. Her seferinde.”`,
      ],
      s: [
        { e: `“Döndüğümde ilk seni göreceğim.”`, c: `Lyris başını çevirip saklamaya çalışıyor ama gülümsediğini görüyorsun.`, p: 20 },
        { e: `Ona da dinlenmesini söyle.`, c: `“Hekim tavsiyesi mi?” diye gülüyor. “Kabul. Bu akşam hamamda bir saat. Sadece senin için.”`, p: 18 },
      ],
    },
    10: {
      b: `İki dünyanın şifası`,
      m: [
        `Laboratuvarda üç hekim: Lyris, Nerissa ve Defne'nin getirdiği eski Dünya tıp kitapları. Aylarca süren çalışmanın sonunda bir şişe berrak, hafif ışıldayan iksir masada duruyor.`,
        `“Malken bitkileri, abis mineralleri, Dünya'nın bağışıklık bilgisi,” diyor Lyris. “Zehirlere, sporlara, yabancı hastalıklara karşı kalıcı direnç. Ve hiçbir şekilde ters çevrilemez; bunu üç kez kontrol ettim.”`,
        `Şişeyi sana uzatıyor. Sesi titriyor: “Bir zamanlar bir silahın annesiydim. Bugün bir kalkanın annesiyim. Bunu senin yanında yapabildim.”`,
      ],
      s: [
        { e: `“Yeminini tuttun Lyris.”`, c: `Lyris gözlerini kapatıyor, uzun bir nefes. “Evet. Sonunda.” Koloninin direnci kalıcı olarak arttı.`, p: 30, moral: 10 },
        { e: `Şişeyi birlikte kaldırın.`, c: `Nerissa ve Defne de katılıyor; dört el, bir şişe. Lyris ilk kez yüksek sesle gülüyor.`, p: 30, moral: 10 },
      ],
    },
  },

  zarek: {
    1: {
      b: `Rüzgârın yönü`,
      m: [
        `Zarek kapsülün üstüne çıkmış, gözleri kapalı, başını bir o yana bir bu yana çeviriyor. “Dinle Kaptan. Rüzgâr kuzeyden kayaları yalıyor; ıslık sesi yüksekse geçit dar demek. Batıdan gelen uğultu boş bir vadi. Gözlerin yalan söyleyebilir; kulakların söylemez.”`,
        `Yanına çıkmanı işaret ediyor. Rüzgâr ikinizin arasından geçiyor ve bir an gerçekten kayaların sesini duyuyorsun.`,
      ],
      s: [
        { e: `Gözlerini kapat ve dinle.`, c: `Zarek gülüyor: “İşte! Doğuştan izcisin. Yarın seni sırtlara götüreyim.”`, p: 18 },
        { e: `“Radar daha güvenilir.”`, c: `“Radar da iyidir,” diyor Zarek, omuz silkerek. “Ama piller biter. Kulaklar bitmez.”`, p: 8 },
      ],
    },
    2: {
      b: `Kayıp harita parçası`,
      m: [
        `Zarek telaşlı: “Ailemin izci işaretli harita parçası. Kapsülden fırlayan çantamdaydı.” Bir tarifle seni sırtların girişine yolluyor: üç taş, ortadakinde oyulmuş bir yıldız.`,
        `Taşları buluyorsun; ortadakinin altında rüzgârın korumaya aldığı, deriye çizilmiş küçük bir harita. Getirince Zarek haritayı yere seriyor; çizgilerin bir kısmı, burada, bu gezegende bildiğin yollara benziyor.`,
      ],
      s: [
        { e: `“Bu işaretler burada da işe yarıyor gibi.”`, c: `Zarek'in gözleri parlıyor: “Atalarım belki buradan geçti Kaptan! Bunu anlamak için yıllarım var.”`, p: 20 },
        { e: `Haritayı ver, dinlemeye otur.`, c: `Zarek parmağını çizgilerde gezdiriyor, her birinin hikâyesini anlatıyor. Saat nasıl geçti fark etmiyorsun.`, p: 18 },
      ],
    },
    3: {
      b: `Göçebe kervanı`,
      m: [
        `Gözlem tepesinde, gece, yıldızların altında Zarek sırtüstü uzanmış. “Biz hiç duvarın içinde uyumadık. Kervanımız Zhaor'un gümüş ışığıyla yola çıkar, Uma'nın sarı ışığında konaklardı. Annem her geceye bir yıldız adı verirdi.”`,
        `Gülüyor ama sesinde bir sızı var. “Sonra kervanlar dağıldı. Herkes şehirlere, kulelere. Ben de... ben son izcilerdenim sanırım. Duvarlar bazen boğazımı sıkıyor Kaptan.”`,
      ],
      s: [
        { e: `“Hangi yıldızın adını en çok severdin?”`, c: `Zarek doğrulup gökyüzünü gösteriyor: “Şu, solgun mavi olan. Annem ona ‘dönüş’ derdi; hep oradaydı, kaybolanlar onu takip ederdi.”`, p: 25 },
        { e: `“Koloni sana dar geliyorsa söyle.”`, c: `“Henüz değil,” diyor. “Ama sorduğun için sağ ol. Burada biri anlıyor demek.”`, p: 18 },
      ],
    },
    4: {
      b: `Gözlem tepesi`,
      m: [
        `Zarek tepeye kristal bir çan asmış; rüzgâr çaldıkça notaları sayıyor. “Her nota bir yön, her ritim bir hava değişimi. Fırtına gelmeden iki saat önce çan dörtlüye geçiyor. Dinle.”`,
        `Gece boyunca birlikte tarama yapıyorsunuz: rüzgârın hızı, yıldızların titreşimi, uzaktaki kayaların uğultusu. Sabaha karşı Zarek defterine son satırı yazıyor: “Kuzeydoğu geçidi açık. Üç gün güvenli.”`,
      ],
      s: [
        { e: `Notaları sen de say, ona yardım et.`, c: `“Kulak çabuk öğreniyor,” diyor Zarek. “Bir gün bu tepeyi sana emanet edebilirim.”`, p: 20 },
        { e: `“Bunu terminale de kaydedelim.”`, c: `Zarek bir an duraksıyor, sonra başını sallıyor: “Peki. Ama çanı da dinlemeye devam et; terminal rüzgârı koklamaz.”`, p: 12 },
      ],
    },
    5: {
      b: `Kural mı, içgüdü mü?`,
      m: [
        `Kaptan Marcus yeni bir devriye çizelgesi asmış: her izci her gece aynı rotada, aynı saatte. Zarek çizelgeyi parmağıyla vuruyor: “Bu bir rota değil, bir kafes. Rüzgâr her gece başka yerden eser; ben de öyle yürümeliyim.”`,
        `Marcus kollarını kavuşturmuş: “Düzen yoksa kimin nerede kaybolduğunu bilemeyiz.” İkisi de sana bakıyor.`,
      ],
      s: [
        { e: `Zarek'e esneklik tanı.`, c: `Zarek kahkahayı basıyor: “Rüzgâr kazandı!” Marcus homurdanıyor ama Zarek her dönüşte rapor vermeyi kabul ediyor.`, p: 25, diger: { kim: 'marcus', p: -10 } },
        { e: `Orta yol: sabit saat, serbest rota.`, c: `Zarek bir an düşünüyor: “Saat sabit, yol benim. Olur.” Marcus da isteksizce başını sallıyor.`, p: 18, diger: { kim: 'marcus', p: 10 } },
        { e: `Marcus'un çizelgesi geçerli.`, c: `Zarek sessizce çizelgeyi alıp gidiyor. Ertesi gün tepede yalnız oturuyor.`, p: -5, diger: { kim: 'marcus', p: 15 } },
      ],
    },
    6: {
      b: `Sessiz iz`,
      m: [
        `Zarek seni gece yarısı uyandırıyor, parmağını dudağına götürüyor. Birlikte vadinin kuzeyine yürüyorsunuz; iki kaya arasında, rüzgârın neredeyse hiç girmediği dar bir geçit.`,
        `“Atalarımın sessiz izi,” diye fısıldıyor. “Rüzgâr burada yön değiştirir; araçlar daha az yakıt yakar, ses de uzağa gitmez.” Haritana küçük bir işaret koyuyor. “Bunu yalnızca aileme gösterirdim. Artık sen de bilirsin.”`,
      ],
      s: [
        { e: `“Bu sırrı koruyacağım.”`, c: `Zarek gözlerini kırpıştırıyor: “Biliyorum. Yoksa göstermezdim.” Yüzey araçlarının yakıt tüketimi düştü.`, p: 22 },
        { e: `“Bunu bütün koloni bilmeli.”`, c: `Zarek bir an duraksıyor. “Haklısın, can kurtarır.” Ama izin sesi biraz soğuyor.`, p: 10 },
      ],
    },
    7: {
      b: `Gitme isteği`,
      m: [
        `Zarek'in çantası hazır. Ufkun ötesine bakan bir yüzle duruyor. “Kimseye söylemedim Kaptan. Her şey yoluna girince, koloni kendi ayakları üzerinde durunca... gideceğim. Yalnız. Haritanın bittiği yere.”`,
        `Sesi kararlı ama gözleri değil. “Kök salmak beni korkutuyor. Bir yere bağlanırsam, bir gün o yeri kaybetmekten korkarım. Annem gibi. Kervan gibi.”`,
      ],
      s: [
        { e: `“Senin yerin burası Zarek.”`, c: `Zarek'in çenesi titriyor: “Burası mı? Hiç bir yer bana ‘yerin burası’ dememişti.” Çantasını yere bırakıyor.`, p: 25 },
        { e: `“Özgürsün. Ama her zaman geri dön.”`, c: `Zarek gülümsüyor, gözleri dolu: “Geri dönülecek bir yer... İşte bu yeni bir şey.” Çanta bir süre kapının yanında kalıyor ama açılmıyor.`, p: 28 },
      ],
    },
    8: {
      b: `Kök salan izci`,
      m: [
        `Zarek meydanın kenarına bir fidan dikiyor; kervanın yıldız adlarını kökün çevresine taşlarla dizmiş. “Bir izci hiçbir yere ağaç dikmez,” diyor. “Ama ben dikiyorum. Kalıyorum Kaptan.”`,
        `Sonra sana dönüyor, ellerinde toprak: “Kalırken bir şeyi de sormak istiyorum. Bu yolu birlikte mi yürürüz? Ya da yol kardeşi olur muyuz; nereye gidersek gidelim, birbirimizin dönüş yıldızı?”`,
      ],
      s: [
        { e: `Hayatını onunla paylaşma yolunu aç.`, c: `Zarek fidanın yanına diz çöküyor, elini tutuyor: “O zaman bu ağaç ikimizin.”`, p: 25, bayrak: { yp_zarek: 'es' } },
        { e: `Yol kardeşi ol.`, c: `“Dönüş yıldızı,” diye tekrarlıyor Zarek. “Annem buna razı olurdu.” Alnını alnına değdiriyor, eski göçebe selamı.`, p: 25, bayrak: { yp_zarek: 'bag' } },
      ],
    },
    9: {
      b: `Gizli damar ihbarı`,
      m: [
        `Her sabah kapının altında küçük, katlanmış bir kâğıt: “Maden, üçüncü tünel, sol duvar, kristal kokusu.” Ya da: “Kıyıda sabah sisinde, yosun yatağı.” İmza yok ama el yazısını tanıyorsun.`,
        `Zarek'e sorduğunda göz kırpıyor: “Gece yürüyüşleri. Duvarın içinde uyuyamayınca toprağı dinliyorum. Toprak da bana sırlarını söylüyor; ben de sana.”`,
      ],
      s: [
        { e: `“Her sabah ilk o kâğıdı okuyorum.”`, c: `Zarek'in yüzü aydınlanıyor: “O zaman her gece yürümeye değer.”`, p: 20 },
        { e: `“Bir gece sana katılabilir miyim?”`, c: `“Ses çıkarmazsan,” diye gülüyor. O gece birlikte yürüyorsunuz; toprak gerçekten konuşuyor gibi.`, p: 22 },
      ],
    },
    10: {
      b: `Altı yıldızın kaydı`,
      m: [
        `Zarek'in aylardır çalıştığı şey nihayet bitti: koloninin ilk tam sesli keşif haritası. Her geçit bir nota, her yatak bir tını, her tehlike bir uyarı sesi. Terminale bağlandığında bütün bölgeler bir şarkı gibi duyuluyor.`,
        `Ve haritanın sonunda bir ilahi: kervanın eski yıldız adları, bu gezegenin altı yıldızına bağlanmış. “Büyük Festival'de söylensin,” diyor Zarek. “Göçebelerin şarkısı artık yerleşiklerin de şarkısı.”`,
        `Sana bakıyor, gözleri ışıl ışıl: “Haritanın bittiği yere gitmek istiyordum. Meğer harita burada başlıyormuş.”`,
      ],
      s: [
        { e: `“Senin haritan bizim yolumuz.”`, c: `Zarek kahkahayla seni kucaklıyor. Koloninin keşif ve radar verimi kalıcı olarak arttı.`, p: 30, moral: 8 },
        { e: `İlahinin ilk dizesini birlikte mırıldanın.`, c: `Tepeden çanlar eşlik ediyor. Zarek fısıldıyor: “Annem duyuyor.”`, p: 30, moral: 10 },
      ],
    },
  },

  veysel: {
    1: {
      b: `Çay demleme`,
      m: [
        `Kamp ateşinin kenarında Usta Veysel küçük, kulpu kırık bir demlik ısıtıyor. Yanına gelince başını kaldırmadan bir tabure gösteriyor: “Otur evlat. Acele işe şeytan karışır; çay demlenmeden konuşulmaz.”`,
        `Demlik yavaşça fokurduyor. Veysel'in elleri yaşlı, nasırlı ama hiç titremiyor. Bekliyor; senin de bekleyip beklemeyeceğini görmek ister gibi.`,
      ],
      s: [
        { e: `Sessizce otur ve demlenmesini bekle.`, c: `Uzun bir süre sonra Veysel çayı dolduruyor: “Sabırlısın. Bu gezegende sabır altından kıymetli.” İlk kez sana gülümsüyor.`, p: 18 },
        { e: `“Usta, işler bekliyor; kısa kesebilir miyiz?”`, c: `Veysel kaşlarını kaldırıyor: “Kısa kesilen çay acı olur.” Yine de bir bardak uzatıyor; ama sohbet orada bitiyor.`, p: -5 },
      ],
    },
    2: {
      b: `Kamaranın ilk ranzası`,
      m: [
        `Veysel kalasları yan yana dizmiş, ölçüyor, işaretliyor, bir daha ölçüyor. “Kaptan kapsülde, sert bir sedirde yatıyor. Olmaz. Kaptanın yatağı sağlam olmalı ki kararları da sağlam olsun.”`,
        `Rendeyi sana uzatıyor: “Hadi bakalım. Elinle tanı ahşabı. Damara karşı değil, damarla birlikte.” İlk birkaç sürtüşte tahta yırtılıyor; Veysel elini elinin üstüne koyup yönü düzeltiyor.`,
      ],
      s: [
        { e: `Sabırla, damarı izleyerek rendele.`, c: `“İşte,” diyor Veysel, kıvrılan ince talaşı göstererek. “Bak, ahşap da teşekkür ediyor.”`, p: 15 },
        { e: `“Usta, sen yapsan daha hızlı olur.”`, c: `“Hızlı olur,” diyor, “ama senin olmaz.” Rendeyi geri vermiyor; devam etmeni bekliyor.`, p: 5 },
      ],
    },
    3: {
      b: `Vanguard güvertesi`,
      m: [
        `Bir akşam Veysel konuşmaya kendisi başlıyor; ateşe bakarak, sanki çok uzaklara: “Vanguard-01'in son gecesiydi. Gövdeden bir inilti geldi; sonra kırmızı ışıklar. Kaptan herkesi kurtarma kapsüllerine çağırdı.”`,
        `“Ben atölyedeydim. Torunum için bir müzik kutusu oyuyordum, bitirmeme bir akşam kalmıştı. Kutuyu aldım, kapsüle koştum. Kapsülün kapısı kapanırken arkama baktım evlat: atölyem, aletlerim, Dünya'dan getirdiğim son meşe kalası... Hepsi ışığın içinde yandı.”`,
        `Bir süre susuyor. “Bazı şeyleri kurtarırsın, bazılarını bırakırsın. Ben bir kutu kurtardım.”`,
      ],
      s: [
        { e: `Sözünü kesmeden, sonuna kadar dinle.`, c: `Veysel sana döndüğünde gözleri ıslak ama yüzü huzurlu: “Dinlemeyi bilen az kişi var. Sen biliyorsun.”`, p: 25 },
        { e: `“Torununa ne oldu?”`, c: `Veysel uzun süre susuyor. “Başka bir kapsüldeydi. Hangisi, bilmiyorum.” Sonra ateşi karıştırıp konuyu kapatıyor.`, p: 12 },
      ],
    },
    4: {
      b: `İlk alet sapı`,
      m: [
        `Atölyede rende ve zımpara sesleri. Veysel bir parça yabancı ağaç uzatıyor: kızıl, sert, kokusu tatlı. “Bu gezegenin ağacı. Daha önce kimse onunla çalışmadı. Bir kazma sapı oyalım; sen oy, ben izleyeyim.”`,
        `Saatler geçiyor. Sap yavaş yavaş şekilleniyor; Veysel arada bir elini sapın üzerinde gezdirip bir yeri işaret ediyor: “Burası avucun yeri. Bırak avucun karar versin.”`,
      ],
      s: [
        { e: `Sapı bitirip ona göster.`, c: `Veysel sapı avucunda tartıyor, uzun uzun bakıyor: “Bunu bir ustanın elinden çıkmış sanarlar.” Senin için bu bir madalya.`, p: 18 },
        { e: `“Bunu atölyede makineyle yapsak?”`, c: `“Yapardık,” diyor. “Ama o zaman avucunu tanımazdı.” Sapı sana geri veriyor; bitirmeni bekliyor.`, p: 8 },
      ],
    },
    5: {
      b: `Eski mi, yeni mi?`,
      m: [
        `Kaelon atölyeye yeni bir torna tezgâhı kurmuş; tek düğmeyle yüz sap. Veysel tezgâhın önünde, kollarını kavuşturmuş. “Hızlı,” diyor. “Hepsi aynı. Hiçbirinin hikâyesi yok.”`,
        `Kaelon omuz silkiyor: “Hikâye madende işe yaramaz Usta.” İkisi de sana bakıyor: koloninin aletleri tezgâhtan mı çıksın, elden mi?`,
      ],
      s: [
        { e: `İkisi de: günlük aletler tezgâhtan, özel işler elden.`, c: `Veysel başını sallıyor, Kaelon da: “Olur.” Veysel sana dönüp göz kırpıyor: “Ellerin kıymetini bilen bir kaptan.”`, p: 25, diger: { kim: 'kaelon', p: 5 } },
        { e: `El emeği: her alet elde oyulsun.`, c: `Veysel'in gözleri parlıyor: “Sağ ol evlat.” Kaelon homurdanıyor ama Veysel'e saygıyla bakıyor.`, p: 28, diger: { kim: 'kaelon', p: -5 } },
        { e: `Tezgâh yeter; zaman kıymetli.`, c: `Veysel bir şey demiyor. Sadece rendesini alıp atölyenin en ucuna çekiliyor.`, p: -5, diger: { kim: 'kaelon', p: 10 } },
      ],
    },
    6: {
      b: `Torunun müzik kutusu`,
      m: [
        `Veysel seni atölyenin arka odasına çağırıyor. Bir bezin altından küçük, ceviz rengi bir kutu çıkarıyor; kapağında oyma bir çınar. Kurmalı kolu çevirince eski bir Dünya ninnisi yükseliyor, aksak, tatlı.`,
        `“Vanguard'dan kurtardığım kutu,” diyor. “Torunum Elif için. Hiç veremedim.” Kutuyu kapatıyor. “Burada bir şey anladım evlat: yaptığın şey birine ulaşmazsa yarım kalır.”`,
        `Kutuyu sana uzatıyor. “Kamarana koy. Ve bundan sonra raf boş kalmasın; rüzgâr çanı, akvaryum, kafes kuşu... Ben yapacağım. Sen de benim ailemsin artık.”`,
      ],
      s: [
        { e: `Kutuyu iki elinle al: “Onu hep koruyacağım.”`, c: `Veysel boğazını temizliyor, gözlerini siliyor: “Biliyorum.” Sesli dekor dükkânı açıldı.`, p: 25 },
        { e: `“Belki bir gün Elif'i buluruz.”`, c: `Veysel uzun uzun bakıyor: “Umut da bir alet evlat. Paslanmasın.” Sesli dekor dükkânı açıldı.`, p: 25 },
      ],
    },
    7: {
      b: `Dünya'dan kalan tohum`,
      m: [
        `Bir gece Veysel'i kamp ateşinin yanında yalnız buluyorsun. Avucunda kurumuş, kahverengi bir kozalak. “Dünya'dan,” diyor. “Atölyemin önündeki meşenin değil; yolun karşısındaki çamın. Çocukken toplardım.”`,
        `Kozalağı ateşe yaklaştırıyor, sonra geri çekiyor. Bir şey söylemek istiyor ama sesi çıkmıyor. Çenesi titriyor; ağlamamak için dişlerini sıkıyor.`,
      ],
      s: [
        { e: `Yanına otur, sessizce omzuna dokun.`, c: `Veysel uzun bir süre hiçbir şey demiyor. Sonra kozalağı avucuna bırakıyor: “Sende dursun. Ben bakamıyorum ona.”`, p: 30 },
        { e: `“Onu toprağa dikelim mi?”`, c: `“Bu toprak onu kabul etmez,” diyor. Sonra bir an düşünüyor: “Ama belki... Lyris'e soralım.” Gözlerinde ilk kez bir umut.`, p: 25 },
      ],
    },
    8: {
      b: `Usta ve evlat`,
      m: [
        `Veysel bütün yerleşimcileri atölyenin önünde toplamış. Elinde kendi rendesi, yarım asırlık. “Dünya'da bir gelenek vardı,” diyor. “Usta, elindeki ilk aletini çırağına verirdi; ‘Benden sonra sen’ derdi.”`,
        `Rendeyi sana uzatıyor. “Kanımdan değilsin. Ama bu gezegende kanın önemi yok evlat. Sen benim evladımsın, varisimsin. Kamaran benim kamaramdır, derdin benim derdim.”`,
      ],
      s: [
        { e: `Rendeyi al ve elini öp.`, c: `Veysel seni kucaklıyor; yaşlı kollarında beklenmedik bir güç. Toplananlar alkışlıyor.`, p: 30, bayrak: { yp_veysel: 'bag' }, moral: 5 },
        { e: `“Usta, bu onuru taşıyacağım.”`, c: `“Taşırsın,” diyor Veysel. “Ağırlığını ben bilirim; sen de bileceksin.” Manevi baba bağı kuruldu.`, p: 30, bayrak: { yp_veysel: 'bag' }, moral: 5 },
      ],
    },
    9: {
      b: `Sessiz tamir`,
      m: [
        `Kamarana her döndüğünde bir şey değişmiş oluyor: kapının gıcırtısı gitmiş, yatağın başına bir rüzgâr çanı asılmış, rafın kenarına küçük bir çınar oyulmuş. Veysel hiçbir şey söylemiyor.`,
        `Sorunca gülüyor: “Usta işi böyledir evlat; görünmez. Sen dinlenince ben dinleniyorum. Artık kamarada yattığın gece iki kat dinleneceksin; çivisini ben çaktım.”`,
      ],
      s: [
        { e: `“Usta, sen de dinlenmelisin.”`, c: `“Dinleniyorum,” diyor, “Senin yüzün güldükçe.” Çayını uzatıyor.`, p: 18 },
        { e: `Ona da bir şey oy: küçük bir çınar.`, c: `Veysel avucundaki çınara uzun süre bakıyor. “Çırak ustasını geçti,” diyor, sesi kırık.`, p: 25 },
      ],
    },
    10: {
      b: `Yeni dünyanın çınarı`,
      m: [
        `Meydanın ortasında bir çardak yükseliyor: direkleri bu gezegenin kızıl ağacından, çatısı Malken kristal kubbelerinin ince camlarından. Orta direğin içine, kimsenin görmediği bir oyuğa Veysel o eski kozalağı yerleştirmiş.`,
        `Bütün koloni toplanıyor. Veysel elini direğe koyuyor: “Dünya'yı geride bıraktık. Ama Dünya'yı taşıdık. Bu çardak bir yas değil evlat; bir yemin. Burada çocuklar oynayacak, sevdalılar buluşacak, yaşlılar çay içecek.”`,
        `Sana dönüyor, yıllardır ilk kez yüzünde hiçbir hüzün yok: “Son çınar ben değilmişim. Sen varsın.”`,
      ],
      s: [
        { e: `“Usta, bu çardak senin adını taşısın.”`, c: `“Adımı değil,” diyor, “hepimizin adını.” Çardak koloninin kalıcı huzur simgesi oldu.`, p: 30, moral: 12 },
        { e: `Çardağın altında ona çay demle.`, c: `Veysel oturuyor, gülümseyerek bekliyor: “Bu sefer acele etmiyorsun.” Çay demlenirken bütün koloni sessizce izliyor.`, p: 30, moral: 12 },
      ],
    },
  },
};
