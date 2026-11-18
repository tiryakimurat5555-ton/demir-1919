// Yirmi yedinci bölüm: "Moda". İstanbul, 8-9 Mart 1924.
// Kurgu: emekli Binbaşı Fikri (2. bölümde ekildi, 25'te F. E., 26'da oğlu Kenan) Moda'daki köşkünde; gözleri görmüyor.
// Kalıbı kır: bölümün ortası kör bir adamla bir sorgu. Fikri kâğıt göremez; ona okunur, anlatılır. Her doğru söz bir çatlak
// (fikriCatlak); CATLAK_ESIGI'ne ulaşırsa itirafı tam olur. Kırk yedinci sayfanın alt yarısındaki imza Ferrante'nin
// (1. bölümde ekildi, 11. bölümde kaçtı ya da tutuklandı): "satan" o.
// Karşılık verilen iplikler: kenanSonu (köşke giriş), cemilSelanik + cemilDefter (Cemil'in sorusu), zarfAcan (Neslihan'ın
// yolu), rizaSon22 (kirgin ise Rıza bir anda geri gelir), kemalKalir (kayık), ferranteSonu, davidItiraf.
// Yeni iplikler: neslihanYol (Neslihan Marsilya'ya nasıl gidecek), fikriKarar (Fikri'ye ne olacak), yabanciGeldi.
import { BOLUM26 } from './bolum26';
import { bayrak, cikarimVar, delilVar, sayi } from '../oyun/motor';

export const CATLAK_ESIGI = 3;
const rizaBurada = (d) => bayrak(d, 'rizaSon22') !== 'kirgin' || !!bayrak(d, 'rizaDondu');
const catlak = (n, bay) => ({ artir: { fikriCatlak: n }, bayrak: bay });

export const BOLUM27 = {
  id: 'bolum27',
  ad: 'Yirmi yedinci bölüm: Moda',
  baslangic: 'acilis',
  ilkMekan: 'kayikhane27',

  deliller: {
    ...BOLUM26.deliller,
    fikri_itirafi: {
      ad: 'Fikri\'nin sözleri',
      tarif: 'Binbaşı Fikri: On İki\'nin Kasım\'ında on yedi kızı sağlık dairesinin defterine tifodan ölmüş diye yazdım. Kimse ölüyü aramaz. Listeyi ben yazdım; altını ben imzalamadım. Satan başkası.',
    },
    napoli_zarfi: {
      ad: 'Napoli\'den gelen zarf',
      tarif: 'Fikri\'nin masasında açılmamış bir zarf; Napoli postası, Ocak 1924. Arkasında kabartma bir mühür: Ferrante e Soci, Via Marina. Kenarında kurşun kalemle tek bir sayı: 47.',
    },
  },

  cikarimlar: {
    ...BOLUM26.cikarimlar,
    satan: {
      a: 'fikri_itirafi',
      b: 'napoli_zarfi',
      ad: 'Alt yarı',
      metin: 'Fikri listeyi yazdı; kızları satan imzayı başkası attı. Napoli\'den, Ferrante e Soci\'den, kenarında 47 yazan bir zarf. Rivière sayfanın alt yarısını On Sekiz\'de imzanın sahibine geri sattı: Ferrante\'ye. Altı yıl önce Karaköy\'de yedek parça diye tüfek indiren adama.',
    },
  },

  olaylar: [
    { id: 'karar', kosul: (d) => cikarimVar(d, 'satan'), etki: { sahne: 'fikri_karar' } },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Yirmi yedinci bölüm bitti.' },
    { kosul: (d) => !bayrak(d, 'kayikHazir27'), metin: 'Süleyman Kaptan\'la konuş; Moda\'ya denizden gidilecek.' },
    { kosul: (d) => !bayrak(d, 'koskeGirildi'), metin: 'Kayığa bin. Moda\'ya git.' },
    { kosul: (d) => !delilVar(d, 'fikri_itirafi'), metin: (d) => 'Fikri\'yle konuş. Kör bir adama kâğıt gösterilmez; okunur. Çatlak: ' + sayi(d, 'fikriCatlak') + ' / ' + CATLAK_ESIGI + '.' },
    { kosul: (d) => !delilVar(d, 'napoli_zarfi'), metin: 'Fikri\'nin masasına bak.' },
    { kosul: () => true, metin: 'Fikri\'nin sözlerini masadaki zarfla birleştir.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_kayikhane',
      baslik: '8 Mart 1924, Karaköy',
      paragraflar: (d) => [
        'Selanik\'ten döneli üç hafta oldu. Kayıkhanenin ocağında çay kaynıyor; Süleyman Kaptan bir küreği zımparalıyor, kendi kendine şarkı söylüyor.',
        'Masada Selanik\'ten gelen sayfa, bir mendile sarılı. Neslihan her sabah açıp bakıyor; adları yüksek sesle okumadan. Sonra yine sarıyor.',
        {
          goster: 'Dün kayıkhanenin kapısına bir zarf bırakıldı: Kenan Bey\'den. Babam sizi kabul edecek, diye yazmış. Cumartesi akşamı. Moda, iskelenin üstündeki sarı köşk. Ona yakmadım dedim. Neden diye sordum. Cevap vermedi; size vermek istiyor.',
          uyar: 'Rıza Bey\'in eski bir tanıdığı haber getirdi: Moda\'daki sarı köşke iki hafta önce iki yeni bekçi alınmış. İkisi de eski asker; ikisi de silahlı.',
          sakla: 'Gülce bürodan bir haber getirdi: Selanik vapurundan inen bir adam, kayıtlarda adı yok, gümrükte kimseye bir şey sormadan geçmiş. Moda\'ya gitmiş. Ertesi sabah sarı köşkün bekçisi işten ayrılmış.',
        }[bayrak(d, 'kenanSonu')] || 'Moda\'da, iskelenin üstündeki sarı köşk. Fikri orada.',
        ['emekli', 'kirgin'].includes(bayrak(d, 'rizaSon22'))
          ? (bayrak(d, 'rizaSon22') === 'emekli'
            ? 'Rıza Bey kayıkhanenin köşesinde, bir sandalyede. Bastonu sende; o bir şemsiyeye dayanıyor. Emekliyim, diyor; ama kulaklarım emekli olmadı.'
            : 'Rıza Bey yok. Lozan\'dan beri yazmıyor. Süleyman Kaptan bir şey söylemiyor; ama ocağın başında bir fincan fazla duruyor.')
          : 'Rıza Bey masanın başında, haritaya bakıyor. Moda iskelesi, diyor; denizden gidersek kimse kapıdan girdiğimizi görmez.',
      ],
      secenekler: [{ etiket: 'Kayıkhaneye otur', etki: { mekan: 'kayikhane27', bayrak: { 'gorüldü_kayikhane27': true, ekip_cemil: true, ekip_nermin: false } } }],
    },

    neslihan_yol: {
      ortam: 'ortam_kayikhane',
      baslik: 'Marsilya',
      paragraflar: (d) => [
        'Neslihan mendili açıyor. Parmağı ikinci satırda: Marsilya. Bu kızın adı Melek, diyor. Florinalı. On beş yaşındaymış. Marsilya\'da bir manastır okulu var, Rivière\'in defterinde adı geçiyordu. Oraya gideceğim.',
        bayrak(d, 'zarfAcan') === 'arif'
          ? 'Sesi yumuşak ama kesin. Selanik\'te zarfı sen açtın abi. Bunu da ben açmalıyım. Yalnız gitmek istiyorum.'
          : 'Sana bakıyor. Selanik\'te zarfı bana verdin. Bunu ben yöneteceğim. Ama yanımda olmanı isterim; sen istersen.',
        bayrak(d, 'davidItiraf') === false
          ? 'Cüzdanındaki kâğıt hâlâ orada; Saltiel\'in kopyası. Neslihan hâlâ bilmiyor.'
          : '',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Git. Her hafta bir mektup yaz; yeter.',
          etki: { bayrak: { neslihanYol: 'yalniz' }, artir: { neslihanBag: 1 } },
          sonra: 'neslihan_yol_son',
        },
        {
          etiket: 'Seninle geleceğim. Sen yönet; ben arkanda dururum.',
          etki: { bayrak: { neslihanYol: 'birlikte' } },
          sonra: 'neslihan_yol_son',
        },
        {
          etiket: 'Fikri\'den sonra. Önce alt yarıyı bulalım; sonra birlikte gideriz.',
          etki: { bayrak: { neslihanYol: 'bekle' } },
          sonra: 'neslihan_yol_son',
        },
      ],
    },
    neslihan_yol_son: {
      ortam: 'ortam_kayikhane',
      baslik: 'Marsilya',
      paragraflar: (d) => [
        {
          yalniz: 'Neslihan bir an şaşırıyor; sonra gülümsüyor. Kimse bana git dememişti, diyor. Ya kal derlerdi ya gel. Her hafta. Söz.',
          birlikte: 'Neslihan başını sallıyor. Arkamda dur, diyor. Ama önüme geçme. Bunu bir kez yapmıştın, Selanik\'te. Bir daha yapma.',
          bekle: 'Neslihan mendili katlıyor. Peki, diyor. Ama Melek on iki yıldır bekliyor abi. Bunu unutma.',
        }[bayrak(d, 'neslihanYol')] || '',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'kayikhane27' } }],
    },

    kayik27: {
      ortam: 'ortam_kayik',
      baslik: 'Denizden',
      paragraflar: (d) => [
        'Akşam. Süleyman Kaptan\'ın kayığı Salacak\'ı geçip Kadıköy koyuna giriyor. Deniz yağ gibi.',
        bayrak(d, 'kemalKalir')
          ? 'Kürekte Kemal. Babası kıçta, dümende. Yirmi beş yıl önce ben ona kürek çekmeyi öğrettim, diyor Süleyman; şimdi o bana çekiyor. Kemal gülüyor; kulağının üstündeki yanık izi fenerde parlıyor.'
          : 'Kürekte Süleyman Kaptan; yaşına rağmen düzgün, sabırlı. Kemal İskenderiye\'den mektup yazdı, diyor kimse sormadan. Bir gün dönecekmiş. Ben de bir gün diyorum.',
        rizaBurada(d) ? 'Rıza Bey baş tarafta, gözü kıyıda.' : '',
        'Cemil Bey hiç konuşmuyor. Göğüs cebinde bir şey var; arada bir eliyle yokluyor.',
        'Moda iskelesinin üstünde, ağaçların arasında sarı bir köşk. Tek bir pencerede ışık.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'İskeleye yanaş', sonra: 'moda27' }],
    },
    moda27: {
      ortam: 'ortam_kosk_bahce',
      baslik: 'Sarı köşk',
      paragraflar: (d) => [
        {
          goster: 'İskelede Kenan Bey bekliyor; elinde bir fener. Babam yukarıda, diyor. Sizi bekliyor. Bana bir şey söylemedi. Size söyleyecek. Ben de dinleyeceğim; kapının yanında.',
          uyar: 'Köşkün bahçe kapısında iki bekçi. Biri sigara içiyor; öbürü karanlığa bakıyor. Yüzleri eski asker yüzü.',
          sakla: 'Bahçe kapısı açık. Bekçi kulübesi boş. İçeriden bir ses gelmiyor. Kapının önündeki çakılda yeni ayak izleri, denize doğru; biri bu akşam sizden önce gelip gitmiş.',
        }[bayrak(d, 'kenanSonu')] || 'Bahçe kapısı aralık.',
        bayrak(d, 'rizaSon22') === 'kirgin'
          ? 'Karanlıkta bir baston sesi. Ağaçların arasından Rıza Bey çıkıyor; şapkası gözlerinde. Gülce söyledi, diyor sana bakmadan. Kızgınlığım bekleyebilir. Bu adam beklemez.'
          : '',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Kenan\'ın peşinden yukarı çık.',
          kosul: (d) => bayrak(d, 'kenanSonu') === 'goster',
          etki: (d) => ({ mekan: 'kosk27', bayrak: { koskeGirildi: true, kenanIceride: true, rizaDondu: bayrak(d, 'rizaSon22') === 'kirgin', ekip_riza: true } }),
        },
        {
          etiket: 'Rıza Bey konuşsun. Eski polisin sesi hâlâ kapı açar.',
          kosul: (d) => bayrak(d, 'kenanSonu') === 'uyar',
          etki: (d) => ({ mekan: 'kosk27', bayrak: { koskeGirildi: true, giris27: 'riza', rizaDondu: bayrak(d, 'rizaSon22') === 'kirgin', ekip_riza: true } }),
        },
        {
          etiket: 'Kemal kayığı köşkün deniz tarafına çeksin; mutfak kapısından girin.',
          kosul: (d) => bayrak(d, 'kenanSonu') === 'uyar' && !!bayrak(d, 'kemalKalir'),
          etki: (d) => ({ mekan: 'kosk27', bayrak: { koskeGirildi: true, giris27: 'kemal', rizaDondu: bayrak(d, 'rizaSon22') === 'kirgin', ekip_riza: true } }),
        },
        {
          etiket: 'Cemil Bey kapıyı çalsın. Bir hekim, kör bir ihtiyara bakmaya gelmiş.',
          kosul: (d) => bayrak(d, 'kenanSonu') === 'uyar',
          etki: (d) => ({ mekan: 'kosk27', bayrak: { koskeGirildi: true, giris27: 'cemil', rizaDondu: bayrak(d, 'rizaSon22') === 'kirgin', ekip_riza: true } }),
        },
        {
          etiket: 'İçeri gir. Ayak izlerine dikkat et.',
          kosul: (d) => !['goster', 'uyar'].includes(bayrak(d, 'kenanSonu')),
          etki: (d) => ({ mekan: 'kosk27', bayrak: { koskeGirildi: true, yabanciGeldi: bayrak(d, 'kenanSonu') === 'sakla', rizaDondu: bayrak(d, 'rizaSon22') === 'kirgin', ekip_riza: true } }),
        },
      ],
    },

    cemil_soru27: {
      ortam: 'ortam_kosk_ic',
      baslik: 'Bir soru',
      paragraflar: (d) => [
        'Cemil Bey Fikri\'nin karşısındaki sandalyeye oturuyor. Kendini tanıtmıyor; Fikri onu sesinden tanıyor. Doktor Cemil, diyor. Selanik. Sen iyi bir hekimdin. Hızlı yazardın.',
        {
          teselli: 'Cemil Bey\'in elleri titriyor. Bana kaza yaz dedin, diyor. İki yüz kere. Sesi yükseliyor; Rıza Bey bir adım atıyor. Biliyor muydun? O arabalarda kim vardı, biliyor muydun?',
          durust: 'Cemil Bey sesini yükseltmiyor. Sana bir hesap sormaya gelmedim, diyor. Hesabımı Eleni\'ye yazdım; kendim ödüyorum. Bir şey soracağım yalnızca.',
          sessiz: 'Cemil Bey bir süre konuşmuyor. Sonra sana bakıyor; sen başını sallıyorsun. Cemil Bey bir nefes alıyor.',
        }[bayrak(d, 'cemilDefter')] || 'Cemil Bey bir süre konuşmuyor.',
        bayrak(d, 'cemilSelanik') === 'soz'
          ? 'Selanik\'te sana söylemişti: Tek bir soru. Şimdi soruyor. Bu, bütün hayatını değiştirdi mi Binbaşım? Benimkini değiştirdi.'
          : bayrak(d, 'cemilSelanik') === 'gir'
            ? 'Göğüs cebinden bir kâğıt çıkarıyor: Selanik\'te bir çocuğun tebeşirle çizdiği gemi. Masaya, Fikri\'nin elinin yanına koyuyor. Göremezsin, diyor. Bir gemi. O okul şimdi o binada. Senin masanın yerinde bir soba yanıyor.'
            : 'Neden, diye soruyor sadece. Neden ben?',
        'Fikri uzun süre susuyor. Sonra elini masada gezdiriyor; ' + (bayrak(d, 'cemilSelanik') === 'gir' ? 'kâğıdı buluyor, parmaklarıyla tebeşirin izini okuyor.' : 'boşluğu yokluyor.') +
          ' Değiştirdi, diyor. Ama senin sandığın gibi değil. Ben o gece uyudum, Cemil. Sen uyuyamadın. Ben hep uyudum. Gözlerim görmemeye başlayınca uyuyamadım. Karanlıkta o defteri görüyorum.',
      ],
      secenekler: [
        {
          etiket: 'Devam',
          etki: (d) => catlak(bayrak(d, 'cemilSelanik') === 'soz' || bayrak(d, 'cemilSelanik') === 'gir' ? 2 : 1, { cemilSordu: true }),
        },
      ],
    },

    fikri_karar: {
      ortam: 'ortam_kosk_ic',
      baslik: 'Kör adam',
      paragraflar: (d) => [
        'Kâğıtları masaya yan yana koyuyorsun. Ferrante. Altı yıl önce Karaköy rıhtımında, sisin içinde, Leventis\'ten indirilen kırk sandık. Sabri\'nin yarım mektubu. Hepsinin başı bu.',
        bayrak(d, 'ferranteSonu') === 'tutuklu'
          ? 'Ferrante İzmir\'de tutuklanmıştı, diyor Rıza Bey. İki yıl yattı; İtalyan konsolosu çıkardı. Napoli\'ye gitmiş demek.'
          : 'Ferrante İzmir\'den kaçmıştı, diyor Rıza Bey. Senin elinden, Kemeraltı\'nda. Demek Napoli\'ye.',
        sayi(d, 'fikriCatlak') >= CATLAK_ESIGI
          ? 'Fikri başını kaldırıyor; görmeyen gözleri tam sana dönük. Via Marina, on dört, diyor. İkinci kat. Alt yarı bir Dante cildinin içinde; Cehennem, otuz üçüncü kanto. Ferrante şakayı sever. Rivière bunu bana kendisi anlatmıştı; gülerek.'
          : 'Fikri başka bir şey söylemiyor. Ağzını bir kez daha açacak gibi oluyor; vazgeçiyor. Adresi zarftan okuyorsunuz: Via Marina.',
        bayrak(d, 'kenanIceride') ? 'Kenan kapının yanında, duvara yaslanmış. Babasına bakıyor; babasının göremediği bir bakışla.' : '',
        bayrak(d, 'yabanciGeldi') ? 'Fikri titriyor. Bu akşam biri geldi, diyor. Hiçbir şey sormadı. Sadece masama bir zarf bıraktı ve Ferrante selam söylüyor dedi. Napoli\'deki zarf; açmaya korktum.' : '',
        'Şimdi ne olacak? Bir kör adam, bir köşk, bir sayfanın yarısı.',
      ].filter(Boolean),
      secenekler: [
        {
          etiket: 'Savcılığa. Yeni devletin mahkemesinde, on yedi adı kendi ağzıyla söylesin.',
          etki: { bayrak: { fikriKarar: 'savci' } },
          sonra: 'fikri_son',
        },
        {
          etiket: 'Oğluna bırak. Kenan babasını ne yapacağına kendi karar versin.',
          kosul: (d) => !!bayrak(d, 'kenanIceride'),
          etki: { bayrak: { fikriKarar: 'kenan' } },
          sonra: 'fikri_son',
        },
        {
          etiket: 'Bırak onu. Karanlık ona yeter. Biz Napoli\'ye gidiyoruz.',
          etki: { bayrak: { fikriKarar: 'birak' }, artir: { travma: 1 } },
          sonra: 'fikri_son',
        },
      ],
    },
    fikri_son: {
      ortam: 'ortam_kosk_ic',
      baslik: 'Kör adam',
      paragraflar: (d) => [
        {
          savci: 'Rıza Bey bastonuyla doğruluyor. Kadıköy savcısını tanırım, diyor; yeni, genç, inatçı. Fikri karşı çıkmıyor. Ellerini dizlerine koyuyor. On yedi ad, diyor. Hepsini ezbere biliyorum. Hiç unutmadım. Bunu kimse bilmiyordu.',
          kenan: 'Kenan babasının önüne diz çöküyor. Bir şey söylemiyor; babasının elini alıp kendi yüzüne koyuyor. Fikri oğlunun yüzünü parmaklarıyla okuyor; uzun uzun. Sonra Kenan sana dönüyor. Yarın sabah savcılığa ben götüreceğim, diyor. Babamın avukatı olarak değil. Oğlu olarak.',
          birak: 'Köşkten çıkıyorsunuz. Kimse arkanızdan gelmiyor. Bahçede Cemil Bey bir an duruyor, pencereye bakıyor. Fikri pencerede değil. Karanlıkta oturuyor, diye düşünüyorsun. Hep oturacak.',
        }[bayrak(d, 'fikriKarar')] || '',
        'Kayığa dönüyorsunuz. Süleyman Kaptan dümende; bir şey sormuyor.',
        sayi(d, 'fikriCatlak') >= CATLAK_ESIGI ? 'Cebinde bir adres: Via Marina, on dört, ikinci kat. Bir Dante cildinin içinde, bir sayfanın yarısı.' : 'Cebinde bir zarf: Via Marina. Gerisini Napoli söyleyecek.',
        {
          yalniz: 'Neslihan kayıkta, senin yanında. Ben Marsilya\'ya, sen Napoli\'ye, diyor. Haftaya. Her hafta bir mektup.',
          birlikte: 'Neslihan kayıkta, senin yanında. Önce Napoli, diyor. Sonra Marsilya. Ben öndeyim abi; sen arkamda.',
          bekle: 'Neslihan kayıkta, senin yanında. Napoli, diyor. Sonra Marsilya. Melek bekliyor.',
        }[bayrak(d, 'neslihanYol')] || 'Neslihan kayıkta, senin yanında. Napoli, diyor.',
        'Yirmi yedinci bölümün sonu.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_kayikhane',
      ortamOran: 0.45,
      baslik: 'Yirmi yedinci bölüm bitti',
      paragraflar: ['Kararların kaydedildi.'],
      secenekler: [{ etiket: 'Yirmi sekizinci bölüme geç', sonrakiBolum: 'bolum28' }, { etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    kayikhane27: {
      ad: 'Süleyman Kaptan\'ın kayıkhanesi',
      ortam: 'ortam_kayikhane',
      tarif: 'Yeniden kurulan kayıkhane. Tezgâhta yarım bir kayık, ocakta çay, duvarda eski bir pusula. Masada mendile sarılı bir sayfa.',
      nesneler: [
        {
          id: 'kayik_bin',
          etiket: 'Kayığa bin, Moda\'ya git',
          kosul: (d) => !!bayrak(d, 'kayikHazir27') && !bayrak(d, 'koskeGirildi'),
          incele: 'Süleyman Kaptan küreklere uzanıyor.',
          etki: { sahne: 'kayik27' },
        },
      ],
      kisiler: ['suleyman27', 'neslihan27', 'kemal27', 'riza27', 'cemil27'],
      gecisler: [],
    },
    kosk27: {
      ad: 'Fikri\'nin çalışma odası',
      ortam: 'ortam_kosk_ic',
      tarif: (d) =>
        'Kitaplarla dolu, ısıtılmamış bir oda. Perdeler kapalı; bir kör için ışığın ne önemi var. Pencerenin önünde bir koltuk, koltukta ak saçlı bir adam. Önünde bir masa, masada mektuplar. Çatlak: ' +
        sayi(d, 'fikriCatlak') + ' / ' + CATLAK_ESIGI + '.',
      nesneler: [
        {
          id: 'masa27',
          etiket: 'Fikri\'nin masası',
          incele: (d) =>
            delilVar(d, 'napoli_zarfi')
              ? 'Masada başka mektuplar da var; hepsi açılmamış. Kimse okumuyor ona.'
              : 'Fikri sesini duyuyor ama bir şey demiyor. Mektupların arasında Napoli pullu, açılmamış bir zarf.',
          etki: (d) => (delilVar(d, 'napoli_zarfi') ? null : { delil: ['napoli_zarfi'] }),
        },
      ],
      kisiler: ['fikri', 'kenan27'],
      gecisler: [],
    },
  },

  kisiler: {
    suleyman27: {
      ad: 'Süleyman Kaptan',
      giris: (d) => (bayrak(d, 'kayikHazir27') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Süleyman zımparayı bırakıyor. Moda\'ya kara yolundan gidersen köşk seni bir saat önceden görür, diyor. Denizden gidersen kapıyı çalana kadar görmez. Akşam ezanında kayık hazır.',
          secenekler: [
            { etiket: 'Akşam ezanında.', etki: { bayrak: { kayikHazir27: true } } },
          ],
        },
        sonra: {
          soz: 'Süleyman kürekleri yağlıyor. Ben yaşlandım, diyor. Ama kürek yaşlanmaz.',
          secenekler: [{ etiket: 'Sağ ol kaptan.' }],
        },
      },
    },
    neslihan27: {
      ad: 'Neslihan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Neslihan mendile sarılı sayfanın başında. Abi, diyor. Bir şey konuşmamız lazım.',
          secenekler: [
            { etiket: 'Dinliyorum.', kosul: (d) => !bayrak(d, 'neslihanYol'), etki: { sahne: 'neslihan_yol' } },
            { etiket: 'Sonra.', kosul: (d) => !bayrak(d, 'neslihanYol') },
            { etiket: 'Hadi.', kosul: (d) => !!bayrak(d, 'neslihanYol') },
          ],
        },
      },
    },
    kemal27: {
      ad: 'Kemal',
      kosul: (d) => !!bayrak(d, 'kemalKalir'),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Kemal tezgâhta yarım kayığın kaburgasını rendeliyor. Babam bana kayık yapmayı öğretiyor, diyor. Kırk yaşında çırak oldum. Bu akşam küreği ben çekerim; o dümen tutsun.',
          secenekler: [{ etiket: 'Sağ ol Kemal.' }],
        },
      },
    },
    riza27: {
      ad: 'Rıza Bey',
      kosul: (d) => bayrak(d, 'rizaSon22') !== 'kirgin',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'rizaSon22') === 'emekli'
              ? 'Rıza Bey şemsiyesine dayanıyor. Bastonumu sana verdim, diyor. Ama bu gece bir polisin kulağı lazım olacak. Geliyorum.'
              : 'Rıza Bey haritayı katlıyor. Kör bir adamı sorgulamak, diyor; hayatımda yapmadığım bir iş. Gözlerine bakamazsın. Sesine bakacaksın.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
    cemil27: {
      ad: 'Cemil Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'cemilSelanik') === 'gir'
              ? 'Cemil Bey göğüs cebinden bir kâğıt çıkarıp bakıyor: Selanik\'teki çocuğun gemisi. Bunu ona göstereceğim, diyor. Göremeyecek. Ama dokunabilir.'
              : bayrak(d, 'cemilSelanik') === 'soz'
                ? 'Cemil Bey çayını karıştırıyor. Tek bir soru, diyor. Üç haftadır cümleyi düzeltiyorum. Bir hekim gibi: kısa, kesin.'
                : 'Cemil Bey pencereden denize bakıyor. On iki yıl, diyor. Bir köşkte, bir koltukta. Ben de bir koltukta oturuyorum. Aynı koltukmuş meğer.',
          secenekler: [{ etiket: 'Hadi Cemil Bey.' }],
        },
      },
    },
    fikri: {
      ad: 'Binbaşı Fikri',
      giris: (d) => (delilVar(d, 'fikri_itirafi') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: (d) => [
            'Ak saçlı adam başını sesine çeviriyor. Gözleri açık, bulanık. Kalaycının oğlu, diyor. Sesin babana benziyor. Babanı tanımazdım; ama sesini tahmin ederim.',
            sayi(d, 'fikriCatlak') >= CATLAK_ESIGI
              ? 'Fikri\'nin elleri koltuğun kolunda kenetli. Artık susmuyor; sadece nereden başlayacağını bilmiyor.'
              : 'Kâğıt mı getirdiniz? Ben kâğıt okuyamam artık. Bana bir şey okuyun ya da gidin. Çatlak: ' + sayi(d, 'fikriCatlak') + ' / ' + CATLAK_ESIGI + '.',
          ],
          secenekler: [
            {
              etiket: 'Neslihan listeyi okusun. On yedi adı; tek tek.',
              kosul: (d) => !bayrak(d, 'okundu_liste'),
              etki: catlak(1, { okundu_liste: true }),
              sonra: 'ilk',
              cevap: (d) => [
                'Neslihan sayfayı açıyor. Okuyor; adları ve şehirleri. Melek, Florina, Marsilya. Rahel, Serez, İskenderiye. Sesi titremiyor.',
                'On birinci satıra gelince bir an duruyor. Neslihan, diyor. İsmail kızı. Manastır. Viyana. Fikri\'nin elleri koltuğun koluna kenetleniyor. Neslihan devam ediyor; sonuna kadar.',
                bayrak(d, 'neslihanAdSoyledi') === 'kendi' ? 'Bitirince ekliyor: Kalaycının kızı Neslihan. Bu adı kendim seçtim. Sizin yazdığınız ad değil.' : '',
              ].filter(Boolean),
            },
            {
              etiket: 'Rıhtımdaki kâtibi hatırlıyor musun? David Saltiel. Defterini getirdim.',
              kosul: (d) => delilVar(d, 'david_defteri') && !bayrak(d, 'okundu_david'),
              etki: catlak(1, { okundu_david: true }),
              sonra: 'ilk',
              cevap: 'Fikri\'nin yüzü değişiyor. Mühür basmadı, diyor. Genç bir çocuktu. Ben onu ölü defterine yazdım; ölmeden bir gün önce. Sabahına doğru çıktı. Kaza diye.',
            },
            {
              etiket: 'Kırmızı sayfalar gazetelerde çıktı. Binbaşı F. E. Adın orada; her limanda okundu.',
              kosul: (d) => bayrak(d, 'defterSonu') === 'gazete' && !bayrak(d, 'okundu_gazete'),
              etki: catlak(1, { okundu_gazete: true }),
              sonra: 'ilk',
              cevap: 'Fikri bir an susuyor. Biliyorum, diyor. Kenan okudu bana; bir sabah, kahvaltıda. Sesini değiştirmeden okudu. O günden beri bana kahvaltıyı hizmetçi getiriyor.',
            },
            {
              etiket: 'Kuruluş defterini yaktık. Senin adınla birlikte. Yine de buradayız.',
              kosul: (d) => bayrak(d, 'defterSonu') === 'yak' && !bayrak(d, 'okundu_gazete'),
              etki: catlak(1, { okundu_gazete: true }),
              sonra: 'ilk',
              cevap: 'Fikri gülüyor; kısa, kuru. Yaktınız ve geldiniz, diyor. Demek kâğıt için değil. Bu beni kâğıttan daha çok korkutuyor.',
            },
            {
              etiket: 'Cemil Bey seninle konuşmak istiyor.',
              kosul: (d) => !bayrak(d, 'cemilSordu'),
              etki: { sahne: 'cemil_soru27' },
            },
            {
              etiket: 'Oğlun burada, kapının yanında. Ona da anlat.',
              kosul: (d) => !!bayrak(d, 'kenanIceride') && !bayrak(d, 'okundu_kenan'),
              etki: catlak(1, { okundu_kenan: true }),
              sonra: 'ilk',
              cevap: 'Fikri başını kapıya çeviriyor. Kenan, diyor; ilk kez sesi kırılıyor. Sana okumayı ben öğrettim. O eli. Kenan bir şey demiyor; ama kapının yanından ayrılıp babasının koltuğunun yanına geliyor.',
            },
            {
              etiket: 'Sayfanın alt yarısı nerede? Kimin imzası?',
              sonra: 'itiraf',
            },
          ],
        },
        itiraf: {
          soz: (d) =>
            sayi(d, 'fikriCatlak') >= CATLAK_ESIGI
              ? [
                  'Fikri uzun bir nefes alıyor. On İki\'nin Kasım\'ında on yedi kızı sağlık dairesinin defterine tifodan ölmüş diye yazdım, diyor. Kimse ölüyü aramaz. Bunun için para aldım; bir ev, bu köşk.',
                  'Listeyi ben yazdım. Altını ben imzalamadım. İmzayı satan attı; kızları gemiye o bindirdi. Rivière alt yarıyı On Sekiz\'in yazında ona geri sattı. Bana üst yarıyı satmadı; bende kalsın istemedi. Belki doğru yaptı.',
                ]
              : [
                  'Fikri başını sallıyor. Listeyi ben yazdım, diyor sadece. Kızları tifodan ölmüş diye yazdım. Altını ben imzalamadım. Kimin imzaladığını söylemem. O adam hâlâ yaşıyor; benim oğlum da.',
                ],
          secenekler: [
            {
              etiket: 'Devam',
              etki: { delil: ['fikri_itirafi'], bayrak: { fikriItiraf: 'tam' } },
              kosul: (d) => sayi(d, 'fikriCatlak') >= CATLAK_ESIGI,
            },
            {
              etiket: 'Devam',
              etki: { delil: ['fikri_itirafi'], bayrak: { fikriItiraf: 'kismi' } },
              kosul: (d) => sayi(d, 'fikriCatlak') < CATLAK_ESIGI,
            },
          ],
        },
        sonra: {
          soz: 'Fikri koltuğunda, gözleri kapalı. Söyledim, diyor. Gerisini masamda bulursunuz.',
          secenekler: [{ etiket: 'Peki.' }],
        },
      },
    },
    kenan27: {
      ad: 'Kenan Bey',
      kosul: (d) => !!bayrak(d, 'kenanIceride'),
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Kenan kapının yanında, kollarını kavuşturmuş. Ben buradayım, diyor alçak sesle. Avukat olarak değil. Dinliyorum.',
          secenekler: [{ etiket: 'Peki.' }],
        },
      },
    },
  },
};
