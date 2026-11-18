// On dokuzuncu bölüm: "Yeşil Mürekkep". İstanbul, 2-9 Nisan 1921.
// Gülce'nin gümrük bürosundan Anadolu'ya giden ilaçların parti numaraları sızıyor. Baş harfleri M. T. olan üç şüpheli:
// Müdür Muhsin Tahir Efendi, genç kâtip Mehmet Tevfik, İngiliz kontrol bürosunun kâtibi Matthew Turner.
// Yeni oynanış: şüpheli suçlama. Yanlış suçlama Gülce'nin güvenini azaltır; şüpheli listeden düşer.
// Gerçek suçlu Tevfik; kardeşi Bursa'da bir aracının elinde rehine. Karar: teslim etmek ya da çift taraflı kullanmak.
// Bütün kişiler ve olaylar KURGUDUR; hiçbir topluluk hain olarak gösterilmez.
import { BOLUM18 } from './bolum18';
import { bayrak, cikarimVar, delilVar } from '../oyun/motor';

const SUPHELILER = { muhsin: 'Muhsin Tahir Efendi', tevfik: 'Mehmet Tevfik', turner: 'Matthew Turner' };

export const BOLUM19 = {
  id: 'bolum19',
  ad: 'On dokuzuncu bölüm: Yeşil Mürekkep',
  baslangic: 'acilis',
  ilkMekan: 'rihtim',

  deliller: {
    ...BOLUM18.deliller,
    kurye_notu: { ad: 'Kuryenin notu', tarif: 'Süleyman\'ın tayfalarının Galata\'da yakaladığı bir kuryenin astarından: yeşil mürekkeple, düzgün bir el yazısıyla, nisan sevkiyatının parti numaraları ve kalkış gecesi. Altında iki harf: M. T.' },
    yesil_murekkep: { ad: 'Müdürün hokkası', tarif: 'Büroda yeşil mürekkep yalnızca bir masada var: Müdür Muhsin Tahir Efendi\'nin. Müdürler imzalarını yeşille atar.' },
    el_yazisi: { ad: 'Kayıt defterindeki yazılar', tarif: 'Gülce kuryenin notunu büronun kayıt defterindeki el yazılarıyla karşılaştırdı. Müdürün yazısı titrek ve köşeli; Turner\'ınki İngiliz harfleriyle. Mehmet Tevfik\'in yazısı düzgün, yuvarlak; notunkiyle aynı.' },
    nobet_cizelgesi: { ad: 'Gece nöbeti çizelgesi', tarif: 'Martta sızan iki sevkiyatın önceki gecelerinde büroda nöbetçi kâtip: Mehmet Tevfik. Müdür o geceler Kadıköy\'deki evinde. Nöbetçi, müdürün odasını kullanır; soba orada.' },
    turner_ifadesi: { ad: 'Turner\'ın ifadesi', tarif: 'Matthew Turner: Benim adım da M. T., biliyorum. Ama ben Türkçe yazamam; konuşurum, o kadar. Büronuzdan bize gelen bazı kâğıtlar yeşil mürekkeple; müdürünüzün imzasıyla değil.' },
  },

  cikarimlar: {
    ...BOLUM18.cikarimlar,
    kalem: {
      a: 'kurye_notu',
      b: 'el_yazisi',
      ad: 'Kimin kalemi',
      metin: 'Kuryenin notundaki düzgün, yuvarlak yazı Mehmet Tevfik\'in yazısı. Mürekkep yeşil ama el müdürün eli değil.',
    },
    gece_nobeti: {
      a: 'nobet_cizelgesi',
      b: 'yesil_murekkep',
      ad: 'Müdürün masası',
      metin: 'Yeşil mürekkep müdürün masasında. Ama sızıntı gecelerinde müdür evindeydi; nöbetçi kâtip onun odasında, onun sobasının başında, onun hokkasıyla yazıyordu. Yeşil mürekkep bir tuzak değil; bir alışkanlık.',
    },
  },

  olaylar: [
    {
      id: 'suclama',
      kosul: (d) => cikarimVar(d, 'kalem') && cikarimVar(d, 'gece_nobeti'),
      etki: { mekan: 'buro', sahne: 'suclama' },
    },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'On dokuzuncu bölüm bitti.' },
    { kosul: (d) => !delilVar(d, 'kurye_notu'), metin: 'Rıhtımda Süleyman Kaptan\'la konuş.' },
    { kosul: (d) => !delilVar(d, 'yesil_murekkep') || !delilVar(d, 'el_yazisi'), metin: 'Gülce\'nin bürosunda masalara ve kayıt defterine bak.' },
    { kosul: (d) => !delilVar(d, 'nobet_cizelgesi'), metin: 'Gece nöbetlerini kimin tuttuğunu öğren.' },
    { kosul: () => true, metin: 'Bulduklarını soruşturma panosunda birleştir.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_rihtim',
      baslik: '2 Nisan 1921, Karaköy',
      paragraflar: (d) => [
        'İstanbul\'a döndüğünde rıhtım değişmiş: İngiliz bayrakları, İtalyan ve Fransız devriyeleri, her köşede bir kontrol. Ama Süleyman Kaptan\'ın kayıkhanesi yerinde; ve gece, kayıkhaneden Anadolu\'ya yükler çıkıyor.',
        'Gülce ve Süleyman bir yıldır kurdukları ağı fısıltıyla anlatıyorlar: gümrükten bir damga, rıhtımdan bir kayık, Beykoz\'dan bir motor, İnebolu\'dan bir kağnı. İlaç, kitap, mektup; bazen bir insan.',
        bayrak(d, 'sabitSonu') === 'konustu'
          ? 'Ama bir halka çürük. Sabit Bey konuşmuştu: İstanbul\'da Gümrük\'te biri, baş harfleri M. T.'
          : 'Ama bir halka çürük. Sabit Bey konuşmadı; ama son iki sevkiyatın bilgisi önceden Bursa\'ya gitmiş. Kaynak gümrük olmalı.',
        'Neslihan yanında; cepheden seninle döndü. Rıza Bey de. Cemil Bey hastanesinin başında kaldı.',
        'Gülce bürosunda, kapıyı kapatarak konuşuyor: Bizim büroda baş harfleri M. T. olan üç kişi var. Müdür Muhsin Tahir Efendi. Kâtip Mehmet Tevfik. Ve İngiliz kontrol bürosundan bize her gün gelen bir kâtip: Matthew Turner. Biri bizi satıyor.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'rihtim', bayrak: { 'gorüldü_rihtim': true, ekip_riza: true, ekip_cemil: false, ekip_nermin: false } } }],
    },
    suclama: {
      ortam: 'ortam_buro',
      baslik: 'Suçlama',
      paragraflar: (d) => [
        'Akşamüstü. Büro boşalmak üzere. Gülce kapıyı kilitliyor. Masada kuryenin notu, kayıt defteri, nöbet çizelgesi.',
        bayrak(d, 'rizaHikaye') ? 'Rıza Bey kapının yanında. Dudakları sessizce bir isim söylüyor; seninle göz göze gelince susuyor. Yakup.' : '',
        'Müdür Muhsin Tahir Efendi şaşkın, kızgın. Mehmet Tevfik kapının yanında, elleri cebinde. ' + (bayrak(d, 'yanlis_turner') ? 'Turner gelmedi; geçen sefer kırıldı.' : 'Matthew Turner kapı eşiğinde, şapkası elinde.'),
        bayrak(d, 'yanlis_muhsin') || bayrak(d, 'yanlis_turner')
          ? 'Gülce sana bakıyor; bu kez gözlerinde kuşku. Bir yanlış daha yapma, der gibi.'
          : 'Gülce sana bakıyor. Sen söyle, der gibi.',
      ].filter(Boolean),
      secenekler: [
        { etiket: 'Muhsin Tahir Efendi. Yeşil mürekkep onun.', kosul: (d) => !bayrak(d, 'yanlis_muhsin'), etki: { bayrak: { yanlis_muhsin: true }, artir: { gulceGuven: -1 } }, sonra: 'yanlis_muhsin_sahne' },
        { etiket: 'Matthew Turner. İngilizler için çalışıyor.', kosul: (d) => !bayrak(d, 'yanlis_turner'), etki: { bayrak: { yanlis_turner: true }, artir: { gulceGuven: -1 } }, sonra: 'yanlis_turner_sahne' },
        { etiket: 'Mehmet Tevfik. Yazı onun, nöbet onun.', etki: { bayrak: { haindogru: true } }, sonra: 'tevfik' },
      ],
    },
    yanlis_muhsin_sahne: {
      ortam: 'ortam_buro',
      baslik: 'Müdür',
      paragraflar: (d) => [
        'Muhsin Tahir Efendi kıpkırmızı oluyor. Otuz yıl bu devlete hizmet ettim, diyor; sesi titriyor. Bu hokka benim; doğru. Ama benim elim titrer, evlat. Bak. Defterdeki imzasını gösteriyor: köşeli, sarsak harfler.',
        'Gülce dudağını ısırıyor. Notun yazısı düzgün, yuvarlak. Müdürün değil.',
        'Muhsin Efendi şapkasını alıp çıkıyor. Kapıyı çarpmıyor; ama kapanışı çarpmaktan ağır.',
        bayrak(d, 'rizaHikaye') ? 'Rıza Bey bir şey demiyor. Yalnızca şapkasını çıkarıp elinde döndürüyor; Kasımpaşa\'daki gecenin sabahında yaptığı gibi, belki. Sonra sana bakıyor: Bir kez daha bak evlat. Kâğıda.' : '',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Yeniden düşün', sonra: 'suclama' }],
    },
    yanlis_turner_sahne: {
      ortam: 'ortam_buro',
      baslik: 'Turner',
      paragraflar: (d) => [
        'Turner\'ın yüzü bir an sararıyor; sonra kızarıyor. I can\'t even write Turkish, diyor; Neslihan çeviriyor: Türkçe yazamam bile. Bunu herkes bilir.',
        'Neslihan ekliyor, alçak sesle: Doğru söylüyor abi. Notun yazısı eski harflerle, kusursuz.',
        'Turner şapkasını takıyor. Size yardım etmeye çalışmıştım, diyor, kapıdan çıkarken. Bir daha etmem.',
        bayrak(d, 'rizaHikaye') ? 'Rıza Bey bir şey demiyor. Yalnızca şapkasını çıkarıp elinde döndürüyor; Kasımpaşa\'daki gecenin sabahında yaptığı gibi, belki. Sonra sana bakıyor: Bir kez daha bak evlat. Kâğıda.' : '',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Yeniden düşün', sonra: 'suclama' }],
    },
    tevfik: {
      ortam: 'ortam_buro',
      baslik: 'Mehmet Tevfik',
      paragraflar: [
        'Mehmet Tevfik bir an kıpırdamıyor. Sonra omuzları çöküyor. Yirmi iki yaşında, ince, gözlüklü bir delikanlı. Gülce\'nin en güvendiği kâtip.',
        'Kardeşim, diyor. Kardeşim Bursa\'da. On altı yaşında. Geçen yaz evden çıktı, dağa gitti; yakaladılar. Bir aracı geldi: Ya sayıları verirsin, ya kardeşini bir daha görmezsin. Bursa\'daki adam her iki tarafa da satıyor; benim kardeşim onun elinde bir rehine, bir mal.',
        'Gülce dönüp pencereden dışarı bakıyor. Ben sana güvenmiştim, diyor. Sesi kırık değil; daha kötüsü, düz.',
        'Tevfik ağlamıyor. Ben de kendime güvenmiştim abla, diyor.',
        'Rıza Bey sana bakıyor. Ağ seni bekliyor. Karar senin.',
      ],
      secenekler: [
        { etiket: 'Teslim edin. Ağdan çıksın, Anadolu\'ya gitsin; orada hesap versin.', etki: { bayrak: { tevfikKarar: 'teslim' } }, sonra: 'gulce19' },
        { etiket: 'Kalsın. Bundan sonra Bursa\'ya yanlış sayılar yazsın.', etki: { bayrak: { tevfikKarar: 'cift' } }, sonra: 'gulce19' },
      ],
    },
    // Derinleştirme: Gülce'nin ipliği. Babasının katiline "İmzala ve yaşa" dedi; yetiştirdiği çocuk onu sattı.
    // Süleyman'ın onu 1913'ten beri koruduğu ve Kemal söylentisi (21. bölüm Arethusa) burada ekilir.
    gulce19: {
      ortam: 'ortam_rihtim',
      ortamOran: 0.5,
      baslik: 'Rıhtımda gece',
      paragraflar: (d) => [
        'Gece yarısı. Gülce rıhtımın ucunda, Süleyman Kaptan\'ın yeni kayıkhanesinin önünde oturuyor. Elinde bir defter; Tevfik\'in ilk kâtiplik defteri. Kapağında çocuk eliyle yazılmış bir ad.',
        'Ona okumayı ben öğrettim, diyor sen yanına oturunca. On dört yaşındaydı; annesi ölmüştü, büronun kapısında kâğıt toplardı. Babam ölünce bana kimse kalmamıştı; ona da. Birbirimizi büyüttük sandım.',
        'Nazım Bey\'e İmzala ve yaşa dedim, diyor. Babamı öldürtene. Kolaydı; ondan nefret ediyordum. Tevfik\'ten nefret edemiyorum. Bu daha zor, Arif. Ona ne diyeceğimi bilmiyorum.',
        'Arkanızda ayak sesleri. Süleyman Kaptan elinde iki fincan kahveyle geliyor; birini Gülce\'ye uzatıyor. On Üç\'te babası ölünce, diyor sana, bu kız kayıkhaneme geldi. Bir şey istemedi. İskelede oturdu, denize baktı. Senin gibi. Ben de bir şey sormadım.',
        bayrak(d, 'aramaSozu')
          ? 'Süleyman sesini alçaltıyor. Geçen hafta Pire\'den gelen bir aşçı yamağı anlattı, diyor. Bir İngiliz armatörün gemilerinde Kemal Reis diye bir süvari varmış. Kırk yaşlarında. Gülüyor; kısa, acı. Limanda her üç kaptandan biri Kemal\'dir. Bulursam haber veririm demiştin; ben de sana söylüyorum. Hepsi bu.'
          : 'Süleyman bir şey ekleyecek gibi oluyor; vazgeçiyor. Pire\'den gelen gemilere bakar gibi denize bakıyor.',
      ],
      secenekler: [
        {
          etiket: 'Ona babanın sözünü söyle: Yaz ve yaşa. Bildiği her şeyi yazsın; sonra ona bir yol aç.',
          etki: { bayrak: { gulceTevfik: 'yaz', kemalSoylenti: true }, artir: { gulceGuven: 1 } },
          sonra: 'gulce19_son',
        },
        {
          etiket: 'Onu affetmek zorunda değilsin. Kimse senden bunu isteyemez.',
          etki: { bayrak: { gulceTevfik: 'affetme', kemalSoylenti: true }, artir: { gulceGuven: 1 } },
          sonra: 'gulce19_son',
        },
        {
          etiket: 'Bir şey söyleme. Defteri onun elinden al, kapat, dizine koy.',
          etki: { bayrak: { gulceTevfik: 'sessiz', kemalSoylenti: true } },
          sonra: 'gulce19_son',
        },
      ],
    },
    gulce19_son: {
      ortam: 'ortam_rihtim',
      ortamOran: 0.5,
      baslik: 'Defter',
      paragraflar: (d) => [
        bayrak(d, 'gulceTevfik') === 'yaz'
          ? 'Gülce defteri açıyor; boş bir sayfa buluyor. Kalemi çıkarıp bir satır yazıyor: Bildiğin her şeyi yaz, Tevfik. Adlarını, tarihlerini, kimin kime ne verdiğini. Sonra yaşa. Kâğıdı yırtıp katlıyor. Babam bana bir kâğıt bıraktı, diyor. Ben de ona bırakayım.'
          : bayrak(d, 'gulceTevfik') === 'affetme'
            ? 'Gülce uzun süre sana bakıyor. Sonra başını sallıyor. Herkes bana affet diyor, diyor. Babamın cenazesinde de öyle dediler. Sen ilk diyen değil, demeyen oldun. Gözleri doluyor; ilk kez ağlıyor. Sessizce, kısa.'
            : 'Defteri dizine koyuyorsun. Gülce ellerine bakıyor; boş kalan ellerine. Bir süre sonra başını omzuna yaslıyor. Süleyman kahvesini bitirip fincanını ters çeviriyor; telveye bakmadan.',
        'Süleyman ikinize bakıyor. Bir kayıkhanede üç yetim, diyor. Kayıkhane yeni, yetimler eski. Kalkıyor. Yarın gece sevkiyat var. Uyuyun.',
      ],
      secenekler: [{ etiket: 'Devam', sonra: 'gece19' }],
    },
    gece19: {
      ortam: 'ortam_kayik',
      baslik: '8 Nisan, gece',
      paragraflar: (d) => [
        'Kayıkhanenin önünde Süleyman Kaptan\'ın mavnası. Yirmi sandık ilaç, beş sandık kitap, iki yolcu. Beykoz\'a, oradan Karadeniz\'e.',
        bayrak(d, 'tevfikKarar') === 'cift'
          ? 'Tevfik bu sabah Bursa\'ya yeni bir not gönderdi; yeşil mürekkeple, düzgün yazısıyla: sevkiyat on bir Nisan, Tuzla\'dan. Yanlış gün, yanlış yer.'
          : 'Tevfik dün gece bir motorla Anadolu\'ya gitti. Gitmeden Gülce\'ye bir mektup bıraktı; Gülce açmadı.',
        'Mavna sessizce Sarayburnu\'nu dönüyor. Ne bir devriye ne bir projektör.',
        bayrak(d, 'tevfikKarar') === 'cift'
          ? 'Üç gün sonra Tuzla\'da bir İtalyan devriyesi Bursa\'daki aracının adamlarını, boş bir iskelede, bir sevkiyatı beklerken yakalıyor. Aracının ağı çöküyor. Ve bir hafta sonra Bursa\'dan bir haber: on altı yaşında bir çocuk, bir gece kaçıp Ankara tarafına geçmiş.'
          : 'Bir hafta sonra Bursa\'daki aracının adamları iki sevkiyatı daha bekliyor; ama sayılar artık gelmiyor. Ağ susuyor. Tevfik\'in kardeşinden haber yok.',
        bayrak(d, 'yanlis_muhsin') ? 'Muhsin Tahir Efendi o günden beri seninle konuşmuyor; ama damgasını Gülce\'nin masasında unutmaya devam ediyor.' : 'Muhsin Tahir Efendi bir şey bilmiyor; ya da bilmezden geliyor. Damgasını Gülce\'nin masasında unutmaya devam ediyor.',
        bayrak(d, 'yanlis_turner') ? 'Turner artık büroya gelmiyor. Yerine sert, asık suratlı bir İngiliz çavuş geliyor.' : 'Turner bir akşam Gülce\'ye bir İngilizce gazete bırakıyor: Yunanistan\'da yeni bir taarruz hazırlığı. Hiçbir şey söylemiyor; yalnızca bırakıyor.',
        'Gülce rıhtımda, mavnanın gidişini seyrediyor. Bir ağ bir halkası çürüyünce dağılmaz, diyor. Yeniden örülür. Ama artık her ilmeğe bakarak.',
        'On dokuzuncu bölümün sonu.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_rihtim',
      ortamOran: 0.45,
      baslik: 'On dokuzuncu bölüm bitti',
      paragraflar: ['Sıradaki: yirminci bölüm, 1921 yazı, Sakarya. Kararların kaydedildi.'],
      secenekler: [{ etiket: 'Yirminci bölüme geç', sonrakiBolum: 'bolum20' }, { etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    rihtim: {
      ad: 'Karaköy rıhtımı',
      tarif: 'Bahar. İngiliz devriyeleri, kontrol noktaları. Süleyman Kaptan\'ın kayıkhanesi, kapısında ağlar.',
      nesneler: [],
      kisiler: ['suleyman', 'neslihan', 'riza'],
      gecisler: [
        { hedef: 'buro', etiket: 'Gümrük bürosuna git' },
        { hedef: 'kontrol', etiket: 'İngiliz kontrol bürosuna git' },
      ],
    },
    buro: {
      ad: 'Gümrük bürosu',
      ortam: 'ortam_buro',
      tarif: 'Damga, toz, mürekkep. Üç masa: Gülce\'nin, genç kâtip Mehmet Tevfik\'in ve içerideki odada müdür Muhsin Tahir Efendi\'nin. Bir köşede soba.',
      nesneler: [
        {
          id: 'mudur_masasi',
          etiket: 'Müdürün masası',
          incele: (d) =>
            delilVar(d, 'yesil_murekkep')
              ? 'Yeşil mürekkep hokkası yerinde.'
              : 'İçerideki odada müdürün masası. Bir yeşil mürekkep hokkası; büroda yeşil mürekkep yalnızca burada. Müdürler imzalarını yeşille atar. Hokkanın yanında bir kalem; ucu hâlâ ıslak.',
          etki: (d) => (delilVar(d, 'yesil_murekkep') ? null : { delil: ['yesil_murekkep'] }),
        },
        {
          id: 'kayit_defteri19',
          etiket: 'Kayıt defteri',
          kosul: (d) => delilVar(d, 'kurye_notu'),
          incele: (d) =>
            delilVar(d, 'el_yazisi')
              ? 'Defter kapalı.'
              : 'Gülce kayıt defterini açıyor; kuryenin notunu yanına koyuyor. Üç el yazısı. Müdürünki titrek ve köşeli. Turner\'ın defterdeki tek satırı Latin harfleriyle. Mehmet Tevfik\'in yazısı düzgün, yuvarlak. Gülce bir süre bakıyor; sonra defteri kapatıyor. Elleri titriyor.',
          etki: (d) => (delilVar(d, 'el_yazisi') ? null : { delil: ['el_yazisi'] }),
        },
        {
          id: 'nobet19',
          etiket: 'Duvardaki nöbet çizelgesi',
          incele: (d) =>
            delilVar(d, 'nobet_cizelgesi')
              ? 'Çizelge duvarda.'
              : 'Kapının yanında bir çizelge: gece nöbetleri. Martta sızan iki sevkiyatın önceki geceleri: Mehmet Tevfik. Müdür o geceler Kadıköy\'de. Gülce fısıldıyor: Nöbetçi kâtip müdürün odasında oturur; soba orada.',
          etki: (d) => (delilVar(d, 'nobet_cizelgesi') ? null : { delil: ['nobet_cizelgesi'] }),
        },
      ],
      kisiler: ['gulce', 'tevfik', 'muhsin'],
      gecisler: [{ hedef: 'rihtim', etiket: 'Rıhtıma dön' }],
    },
    kontrol: {
      ad: 'İngiliz kontrol bürosu',
      ortam: 'ortam_telgraf',
      tarif: 'Gümrüğün yanındaki taş binada İngilizlerin kontrol bürosu. Daktilolar, telgraf tıkırtısı, damgalar. Bir masada genç, kızıl saçlı, çilli bir kâtip: Matthew Turner.',
      nesneler: [],
      kisiler: ['turner'],
      gecisler: [{ hedef: 'rihtim', etiket: 'Rıhtıma dön' }],
    },
  },

  kisiler: {
    suleyman: {
      ad: 'Süleyman Kaptan',
      giris: (d) => (delilVar(d, 'kurye_notu') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Süleyman Kaptan ağını bırakıyor. Geçen hafta Galata\'da bir kurye yakaladık, diyor. Tayfalarım bir meyhanede sızdırdı. Astarında bu vardı.',
          secenekler: [
            {
              etiket: 'Göster.',
              etki: { delil: ['kurye_notu'] },
              sonra: 'sonra',
              cevap: 'Süleyman ceketinden katlanmış bir kâğıt çıkarıyor. Yeşil mürekkep, düzgün bir el yazısı: nisan sevkiyatının parti numaraları, kalkış gecesi, Beykoz. Altında iki harf: M. T. Kurye Bursa\'ya gidiyormuş, diyor Süleyman. Ağzını açmadı; ama korkusundan titriyordu.',
            },
          ],
        },
        sonra: {
          soz: 'Süleyman Kaptan ağını örüyor. Bir ilmek kaçtı, diyor. Bulursan ağ yine tutar.',
          secenekler: [{ etiket: 'Bulacağım kaptan.' }],
        },
      },
    },
    gulce: {
      ad: 'Gülce',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'haindogru')
              ? 'Gülce masasında oturmuş, Tevfik\'in boş sandalyesine bakıyor. Ona kâtipliği ben öğrettim, diyor.'
              : 'Gülce bir dosyayı kapatıyor. Üç M. T., diyor. Birini yanlış suçlarsak bütün büro bize sırtını döner. İyi bak, Arif.',
          secenekler: [{ etiket: 'Bakacağım.' }],
        },
      },
    },
    tevfik: {
      ad: 'Mehmet Tevfik',
      kosul: (d) => !bayrak(d, 'haindogru'),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Mehmet Tevfik başını defterden kaldırıyor; gözlüğünü düzeltiyor. Buyurun efendim, diyor; kibar, biraz telaşlı. Gülce Hanım\'ın misafirisiniz. Bir şey lazım olursa ben buradayım; her gece buradayım zaten.',
          secenekler: [{ etiket: 'Sağ ol Tevfik.' }],
        },
      },
    },
    muhsin: {
      ad: 'Muhsin Tahir Efendi',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'yanlis_muhsin')
              ? 'Muhsin Efendi seninle konuşmuyor. Kâğıtlarını imzalıyor; titrek, köşeli harflerle.'
              : 'Muhsin Tahir Efendi gözlüğünün üstünden bakıyor. Otuz yıl, diyor; üç padişah, dört nazır. Ben bir şey görmem evlat. Görmemek de bir hizmettir bu devirde. Ama damgam Gülce\'nin masasında hep unutulur; dikkat edin de çalınmasın.',
          secenekler: [{ etiket: 'Teşekkürler Muhsin Efendi.' }],
        },
      },
    },
    turner: {
      ad: 'Matthew Turner',
      kosul: (d) => !bayrak(d, 'yanlis_turner'),
      giris: (d) => (delilVar(d, 'turner_ifadesi') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Turner başını kaldırıyor; gülümsüyor. Neslihan çeviriyor. Manchester\'lıyım, diyor. Savaştan önce bir pamuk şirketinde kâtiptim. Şimdi burada damga vuruyorum. Çok heyecanlı, değil mi?',
          secenekler: [
            {
              etiket: 'Senin adın da M. T.',
              etki: { delil: ['turner_ifadesi'] },
              sonra: 'sonra',
              cevap: 'Turner gülüyor; sonra ciddileşiyor. Biliyorum, diyor. Benim adım da M. T. Ama ben Türkçe yazamam; konuşurum, o kadar. Sesini alçaltıyor. Size bir şey söyleyeyim: büronuzdan bize gelen bazı kâğıtlar yeşil mürekkeple. Müdürünüzün imzası yok altında. Bu bana tuhaf geldi. Ben bir şey demedim.',
            },
          ],
        },
        sonra: {
          soz: 'Turner damgasını vuruyor. Bu savaş bitince Manchester\'a döneceğim, diyor. Ve kimseye burada ne gördüğümü anlatmayacağım; kimse inanmaz.',
          secenekler: [{ etiket: 'İyi günler Turner.' }],
        },
      },
    },
    neslihan: {
      ad: 'Neslihan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Neslihan rıhtımda, sandıklara bakıyor. Bir yıl önce kırk iki isim, diyor. Şimdi üç. Hep bir liste, abi. Hep birileri.',
          secenekler: [{ etiket: 'Bu sefer doğru ismi bulacağız.' }],
        },
      },
    },
    riza: {
      ad: 'Rıza Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Rıza Bey bıyığını sıvazlıyor. Üç şüpheli, diyor. Kırk yıl bir şey öğrendim: en kolay suçlanacak adam ya en güçlüsüdür ya en yabancısı. Çoğu zaman ikisi de değildir. El yazısına bak, nöbete bak. İnsana değil, kâğıda.',
          secenekler: [
            {
              etiket: 'Hep "döverek değil, delille" dersin. Neden?',
              kosul: (d) => !bayrak(d, 'rizaHikaye'),
              etki: { bayrak: { rizaHikaye: true }, artir: { rizaBag: 1 } },
              sonra: 'yakup',
            },
            { etiket: 'Tamam.' },
          ],
        },
        yakup: {
          soz: (d) => [
            'Rıza Bey uzun süre bir şey demiyor. Sonra rıhtımın kenarına oturuyor; dizleri çatırdıyor.',
            ...({
              bekle: ['Gureba\'da, iki yıl önce, bir gün anlatırım demiştim, diyor. Sen de beklerim demiştin. Beklemeyi bilen adama borç ödenir.'],
              sor: ['Gureba\'da sormuştun, çocuğa ne oldu diye. Bugünlük bu kadar demiştim. Bugün gerisi.'],
            }[bayrak(d, 'rizaBaba')] || []),
            'Doksan Sekiz\'de Kasımpaşa\'da bir kuyumcu öldürüldü. Ben otuz beş yaşındaydım; hızlı, hırslı, herkesin övdüğü bir komiser. Bir fırın çırağını yakaladık: Yakup. On yedi yaşında. Dükkânın önünde görülmüştü, o kadar.',
            'Bir gece boyunca konuştum onunla. Sopayla. Sabaha karşı her şeyi söyledi; benim duymak istediğim her şeyi. Bekirağa\'ya gönderdim. İki yıl sonra veremden öldü.',
            'Ertesi yıl başka bir hırsızlıktan bir adam yakaladık. Kuyumcuyu da o öldürmüş. Nasıl yaptığını anlattı; Yakup\'un hiç bilmediği ayrıntılarla.',
            'O gün sopayı dizimde kırdım. Bir daha kimseye el kaldırmadım. Halim\'i de bundan sonra yetiştirdim; ona ilk öğrettiğim kural buydu: döverek değil, delille.',
            'Rıza Bey denize bakıyor. Ama Halim o gece karakolun kapısında nöbetçiydi, diyor. Yakup\'un seslerini duydu. Sonra ona öğrettiğim hiçbir şeye inanmadı. Çünkü benden önce gördüğüne inandı.',
          ],
          secenekler: [
            {
              etiket: 'Halim\'in ölümünü de sırtında taşıyorsun.',
              sonra: 'yakup_son',
              cevap: 'Taşıyorum, diyor. Yakup\'u da, Halim\'i de. Bir adamın sırtı kaç kişiyi taşır, bilmiyorum. Ama bugün Gülce\'nin bürosunda bir delikanlı daha var. Onu yanlış suçlarsak bir kişi daha. İnsana değil, kâğıda bak evlat. Benim yapamadığımı sen yap.',
            },
            {
              etiket: 'Bir şey söyleme. Yanına otur.',
              sonra: 'yakup_son',
              cevap: 'Yanına oturuyorsun. Bir vapur geçiyor; dalgası taşlara vuruyor. Rıza Bey bir süre sonra kalkıyor. Bunu kimseye anlatmadım, diyor. Halim\'e bile. Belki ona anlatsaydım.',
            },
          ],
        },
        yakup_son: {
          soz: (d) => [
            bayrak(d, 'halimKarar') === 'tutukla'
              ? 'Rıza Bey başını sallıyor. Halim\'i tutuklattık, diyor. Delille, kuralına göre. Ertesi sabah hücresinde asılı buldular. Kurala uymak onu kurtarmadı. Ama başka türlüsünü yapsaydım, Yakup\'u bir kez daha öldürmüş olurdum.'
              : bayrak(d, 'halimKarar') === 'birak'
                ? 'Rıza Bey başını sallıyor. Halim\'i bıraktık, diyor; kaçsın diye. Depoda bıçaklı buldular. Belki tutuklatsaydık yaşardı. Belki. Bu belkiyle de yaşıyorum.'
                : 'Rıza Bey başını sallıyor. Taşıyorum, diyor. Herkes bir şey taşır.',
            'Sonra şapkasını düzeltiyor. Hadi, diyor. Kâğıtlar bekliyor.',
          ],
          secenekler: [{ etiket: 'Hadi.' }],
        },
      },
    },
  },
};

export { SUPHELILER };
