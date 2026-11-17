// Yirmi ikinci bölüm: "Üç Akşam". Lozan, 22 Kasım 1922 - 4 Şubat 1923.
// Arka plan (gerçek): Lozan'da barış konferansı 20 Kasım 1922'de açıldı, 4 Şubat 1923'te kesildi. Heyetler ve gerçek
// kişiler yalnızca arka plandır; hiçbiri kurguya karışmaz, konuşturulmaz. "Kayıp mallar alt komisyonu" ve dilekçe KURGUDUR.
// Kurgu: Pendle Shipping İzmir'de "kaybettiği" yükler için tazminat istiyor; ambar listesinde Kızılhaç'ın ilaçları kendi
// malı gibi yazılı. Dilekçeyi Cenevre'de avukatlık yapan Klara Rainer hazırladı; masrafları Banque Vollmer ödüyor (yeni kötü,
// 14. ve 15. bölümlerde ekildi).
// Yeni oynanış: üç akşam. Her akşam yalnızca bir yere gidebilirsin; bazı tanıklar iki akşam ister. Kanıt sayısı sonucu belirler.
// Karşılık verilen iplikler: pendleSonu, kemalSonu, rizaSorgu, cocukKarar, cemilRapor, kardesGecesi.
// Yeni iplikler: neslihanAd (Neslihan'ın kâğıtlardaki adı), vollmerIpucu (Banque Vollmer).
import { BOLUM21 } from './bolum21';
import { bayrak, delilVar, sayi } from '../oyun/motor';

export const AKSAM_SAYISI = 3;

// Kurula sunulacak kanıt: üç tanıklık; Pendle gazeteye düştüyse basın da bir kanıt sayılır.
export function kanitSayisi(d) {
  return (
    ['sahte_manifest', 'kemal_ifadesi', 'kizilhac_fisi'].filter((x) => delilVar(d, x)).length +
    (bayrak(d, 'basinYardim') ? 1 : 0)
  );
}

const pendleBurada = (d) => bayrak(d, 'pendleSonu') !== 'mahkeme';
const aksamBitti = { artir: { aksam: 1 } };

export const BOLUM22 = {
  id: 'bolum22',
  ad: 'Yirmi ikinci bölüm: Üç Akşam',
  baslangic: 'acilis',
  ilkMekan: 'otel22',

  deliller: {
    ...BOLUM21.deliller,
    dilekce: { ad: 'Pendle Shipping\'in dilekçesi', tarif: 'Kayıp mallar alt komisyonuna verilen dilekçe: Arethusa\'nın İzmir\'de bıraktığı kırk sandık "Pendle Shipping malı tıbbi malzeme" için on iki bin sterlin tazminat. İmza: Dr. Klara Rainer, avukat, Cenevre.' },
    sahte_manifest: { ad: 'İki ambar listesi', tarif: 'Klara\'nın elindeki asıl liste ile dilekçeye eklenen liste farklı. Asıl listede kırk sandığın yanında el yazısıyla: "Croix-Rouge, Smyrne". Dilekçedekinde bu satır yok.' },
    kemal_ifadesi: { ad: 'Kemal Reis\'in yeminli ifadesi', tarif: 'Arethusa\'nın süvarisi: sandıklar Kızılhaç\'ındı; Fenwick "kurtarılmış mal" diye yükletti; sahibi Pendle değildi. Kemal Reis\'in imzası ve gemi mührü.' },
    kizilhac_fisi: { ad: 'Kızılhaç\'ın teslim fişi', tarif: 'Cenevre\'deki Kızılhaç bürosunun kayıtlarından: kırk sandık ilaç, Ağustos 1922, İzmir kliniğine; teslim alan Dr. E. Mavrou. Ve Eylül\'de, Arethusa\'dan geri teslim: yine Dr. E. Mavrou.' },
  },

  cikarimlar: { ...BOLUM21.cikarimlar },

  olaylar: [
    { id: 'riza22', kosul: (d) => sayi(d, 'aksam') >= 1, etki: { sahne: 'riza22' } },
    { id: 'neslihan22', kosul: (d) => sayi(d, 'aksam') >= 2, etki: { sahne: 'neslihan22' } },
    { id: 'komisyon', kosul: (d) => sayi(d, 'aksam') >= AKSAM_SAYISI, etki: { sahne: 'komisyon' } },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Yirmi ikinci bölüm bitti.' },
    {
      kosul: () => true,
      metin: (d) =>
        'Alt komisyon ' + (AKSAM_SAYISI - sayi(d, 'aksam')) + ' akşam sonra toplanacak. Her akşam bir yere gidebilirsin. Elindeki kanıt: ' + kanitSayisi(d) + '. En az iki gerekir.',
    },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_lozan_otel',
      baslik: '22 Kasım 1922, Lozan',
      paragraflar: (d) => [
        'Göl kıyısında, Ouchy\'de, kar yağıyor. Otelin lobisinde on dil konuşuluyor; hepsi alçak sesle. İki gün önce barış konferansı açıldı. Koridorlarda heyetler, kâtipler, gazeteciler, tercümanlar; bir de onların arasında görünmeden dolaşanlar.',
        'Nermin, Ankara\'daki gazetesinin muhabiri olarak geldi; kartı göğsünde. Rıza Bey ve Neslihan seninle. Cemil Bey cephe gerisindeki hastanesinin başında kaldı; giderken bir zarf verdi: Eleni\'ye, diyor yalnızca.',
        'Nermin bir kâğıdı masaya koyuyor. Kayıp mallar alt komisyonuna verilen bir dilekçe. Pendle Shipping, İzmir\'de bıraktığı kırk sandık tıbbi malzeme için tazminat istiyor. On iki bin sterlin.',
        'Kırk sandık, diyor Nermin. Eleni\'nin sandıkları. Kızılhaç\'ın. Şimdi onları kendi malı gibi yazıp bir de parasını istiyor.',
        bayrak(d, 'pendleSonu') === 'mahkeme'
          ? 'Pendle Londra\'da, kefaletle, davasını bekliyor. Buraya avukatını göndermiş.'
          : bayrak(d, 'pendleSonu') === 'gazete'
            ? 'Pendle\'in sigortacıları onu bıraktı; Pendle Shipping batmak üzere. Bu dilekçe onun son can simidi. Kendisi de burada; üçüncü kattaki bir odada.'
            : 'Pendle burada. Üçüncü kattaki bir odada. İzmir\'den kaçtığı motordan bu otelin süitine; iki ay.',
        'Dilekçenin altındaki imza: Dr. Klara Rainer, avukat, Cenevre.',
        'Alt komisyon üç akşam sonra toplanacak. Rıza Bey parmaklarıyla sayıyor: Üç akşam, diyor. Üç kapı. Her akşam yalnız birini çalabiliriz; otel küçük, göz çok. İyi seç.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'otel22', delil: ['dilekce'], bayrak: { 'gorüldü_otel22': true, ekip_cemil: false, ekip_riza: true, ekip_nermin: true } } }],
    },

    // --- Akşamlar ---------------------------------------------------------
    klara22: {
      ortam: 'ortam_lozan_otel',
      baslik: 'Kütüphane',
      paragraflar: (d) => {
        const ilk = !bayrak(d, 'klaraZiyaret');
        const hazir = bayrak(d, 'klaraTanisti') || !ilk;
        const p = ['Otelin kütüphanesi. Yeşil abajurlu bir lamba, dosyalar. Klara Rainer gözlüklerini çıkarıp sana bakıyor; Zürih\'teki gibi düzgün, Zürih\'tekinden yorgun.'];
        if (!hazir) {
          p.push('Sizi tanımıyorum, diyor. Müvekkilimin belgeleri tamdır. Bir avukat belgeye bakar; size değil.');
          p.push('Kâğıtlarını topluyor. Ama kapıdan çıkarken duruyor: Yarın akşam da buradayım, diyor. Belgelerinizi getirin. Hikâyelerinizi değil.');
        } else {
          p.push(bayrak(d, 'klaraTanisti') ? 'Zürih\'te bana doğruyu söylemiştiniz, diyor. Dedem hakkında. O yüzden dinliyorum.' : 'Klara bu kez kapıyı kendisi açıyor. Belgeleri getirdiniz mi? Fenwick\'in defterini ve Eleni\'nin sözlerini masaya koyuyorsun.');
          p.push('Klara dosyasından bir liste çıkarıyor; Pendle\'in avukatlarının ona gönderdiği asıl ambar listesi. Dilekçedekiyle yan yana koyuyor. Lambanın altında, kırk sandığın yanında, asıl listede el yazısıyla bir satır: Croix-Rouge, Smyrne.');
          p.push('Klara uzun süre bakıyor. Bana verilen kopyada bu satır yoktu, diyor. Sesi düz. Dedemin de böyle kopyaları vardı. Bunu biliyorum. Bilmek istemiyordum.');
        }
        return p;
      },
      secenekler: [
        {
          etiket: 'Devam',
          etki: (d) => {
            const hazir = bayrak(d, 'klaraTanisti') || bayrak(d, 'klaraZiyaret');
            return hazir ? { ...aksamBitti, delil: ['sahte_manifest'], bayrak: { klaraZiyaret: true, klaraYardim: true } } : { ...aksamBitti, bayrak: { klaraZiyaret: true } };
          },
        },
      ],
    },
    kemal22: {
      ortam: 'ortam_gol',
      baslik: 'İskele',
      paragraflar: (d) => {
        const p = [];
        if (bayrak(d, 'kemalSonu') === 'yolcu') {
          p.push('Ouchy iskelesi. Göl karanlık; karşı kıyıda Fransız dağlarının üstünde ay. Bir adam iskelenin ucunda, kasketi elinde: Kemal Reis. Pire\'den trenle, üç günde gelmiş.');
          p.push('Babam yazdı, diyor; ilk kez babam dediğini fark ediyor, duraksıyor. Babam yazdı: Lozan\'da bir dilekçe var, git, doğruyu söyle. Ben de geldim. Ne imzalamam gerekiyorsa imzalarım.');
          p.push('Yeminli ifadesini Nermin yazıyor; Kemal Reis imzalıyor, gemi mührünü basıyor.');
          if (bayrak(d, 'cocukKarar') === 'aile') p.push('Cebinden bir zarf daha çıkarıyor. Pire\'de bir kadın verdi, diyor; Rina adında bir kızın ninesi. Neslihan Hanım\'a. Zarfın içinde bir çocuk çizimi: bir gemi, bir rıhtım, bir ayva.');
        } else if (!bayrak(d, 'kemalZiyaret')) {
          p.push('Ouchy iskelesi. Pendle\'in özel motoru burada bağlı; yanında, kasketi elinde, Kemal Reis. Hâlâ Pendle Shipping\'in kaptanı.');
          p.push('Beni ondan ayırma, diyor sen bir şey sormadan. Sir Henry\'nin babası beni denizden çıkardı. Bir adamın sana hayatını verdiğini bilmek; bunu nasıl ödersin? Pusulayı cebinden çıkarıyor; Süleyman\'ın pusulası. İbre titriyor. Yarın gel, diyor. Belki.');
        } else {
          p.push('Ouchy iskelesi, ikinci akşam. Kemal Reis bu kez kasketini takmış. Pusula elinde.');
          p.push('Dün gece bütün gece bunu izledim, diyor. Kuzeyi gösteriyor; her zaman. Sir Henry beni denizden çıkardı. Ama o kırk sandığı rıhtıma ben indirdim; Eleni Hanım\'ın elleriyle saydık. Şimdi onları kendi malı diye satıyor. Bir adamın sana hayatını vermesi, onun adına yalan söylemeni gerektirmez. Bunu babam öğretti; yirmi beş yıl geç ama öğretti.');
          p.push('Yeminli ifadesini Nermin yazıyor; Kemal imzalıyor.');
        }
        return p;
      },
      secenekler: [
        {
          etiket: 'Devam',
          etki: (d) =>
            bayrak(d, 'kemalSonu') === 'yolcu' || bayrak(d, 'kemalZiyaret')
              ? { ...aksamBitti, delil: ['kemal_ifadesi'], bayrak: { kemalZiyaret: true } }
              : { ...aksamBitti, bayrak: { kemalZiyaret: true } },
        },
      ],
    },
    eleni22: {
      ortam: 'ortam_lozan_otel',
      baslik: 'Kızılhaç',
      paragraflar: (d) => [
        'Akşam treniyle Cenevre\'ye gidiyorsun; bir saat. Kızılhaç\'ın bürosunda, gece yarısına doğru, Eleni seni bekliyor. Pire\'den buraya gelmiş; mülteci kamplarının ilaç listelerini getirmiş.',
        'Cemil Bey\'in zarfını veriyorsun. Eleni açıyor, okuyor. ' +
          (bayrak(d, 'cemilRapor') === 'sitma'
            ? 'Yüzü değişiyor. Kostas\'ı yazmış, diyor; bütün gerçeğiyle. Raporun aslını yanına iliştirmiş: Sıtma. Ve altına bir satır: Bunu da senin bilmeni istedim. Eleni kâğıdı göğsüne bastırıyor. Kendini affetmemiş, diyor. Ama bana yazmış; bu bir başlangıç.'
            : bayrak(d, 'cemilRapor')
              ? 'Gülümsüyor. Yine Kostas\'ı yazmış, diyor; sanki ben bilmiyormuşum gibi. Bir de Paris\'teki amfiyi. İkisini aynı mektupta. Cemil böyledir.'
              : 'Gülümsüyor. Paris\'teki amfiyi yazmış, diyor. İlk dikişimi. Yirmi yıl olmuş.'),
        'Sonra kayıt defterlerini açıyor. Kırk sandık, Ağustos 1922, İzmir kliniğine; teslim alan: E. Mavrou. Ve Eylül\'de, Arethusa\'dan kayıklarla geri teslim: yine E. Mavrou. Fişin bir kopyasını çıkarıp mühürletiyor.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { ...aksamBitti, delil: ['kizilhac_fisi'] } }],
    },
    basin22: {
      ortam: 'ortam_lozan_otel',
      baslik: 'Basın salonu',
      paragraflar: (d) =>
        bayrak(d, 'pendleSonu') === 'gazete' || bayrak(d, 'pendleSonu') === 'kacti_gazete'
          ? [
              'Basın salonunda duman, daktilo, kahve. Nermin\'in yanına Amerikalı, Fransız, İsviçreli muhabirler toplanıyor. Pendle adını duyunca hepsi başını kaldırıyor; İzmir haberi onların gazetelerinde de çıkmıştı.',
              'Bir İsviçreli muhabir not alıyor: Yanan kentten bilet satan armatör, şimdi o kentin ilaçlarını tazminat diye istiyor. Yarın sabah Gazette de Lausanne\'ın üçüncü sayfasında. Komisyon üyeleri de gazete okur, diyor Nermin.',
            ]
          : [
              'Basın salonunda duman, daktilo, kahve. Nermin muhabirlere Pendle\'i anlatıyor. Dinliyorlar; ama İzmir\'den bir haber çıkmamış, Pendle adını kimse bilmiyor. Bir İngiliz muhabir omuz silkiyor: Kanıtınız var mı, hanımefendi? Gazetelerde değil; elinizde.',
              'Nermin defterini kapatıyor. Gazete kâğıt ister, diyor sana. Kâğıdımız yok. Bir akşam gitti.',
            ],
      secenekler: [
        {
          etiket: 'Devam',
          etki: (d) => ({ ...aksamBitti, bayrak: { basinYardim: ['gazete', 'kacti_gazete'].includes(bayrak(d, 'pendleSonu')), basinGidildi: true } }),
        },
      ],
    },

    // --- Kişisel sahneler (akşamların arasında) ---------------------------
    riza22: {
      ortam: 'ortam_gol',
      baslik: 'Rıza Bey',
      paragraflar: (d) => {
        const s = bayrak(d, 'rizaSorgu');
        if (s === 'sopa')
          return [
            'Gece yarısı Rıza Bey seni göl kıyısına çağırıyor. Bastonunu iki eliyle tutuyor.',
            'İzmir\'de bir adamın omzuna indi bu, diyor. Yirmi dört yıl sonra. Kasımpaşa\'da sopayı dizimde kırdım; demek ki kırılan sopa değilmiş. Ben kırılmamışım.',
            'Bastonu sana uzatıyor. Ankara\'ya dönünce istifamı vereceğim. Bir polis yorulunca eli kalkar evlat. Benim elim kalktı.',
          ];
        if (s === 'kalabalik')
          return [
            'Gece yarısı Rıza Bey seni göl kıyısına çağırıyor. Bastonuna dayanmış; sana bakmıyor.',
            'İzmir\'de o adamı kalabalığa bıraktın, diyor. Ben bir gece Yakup\'u sopaya bıraktım. Sen bir kalabalığa. Arada fark yok; elin değil, ağzın bıraktı, o kadar.',
            'Sana güvenim sarsıldı Arif. Bunu söylemem lazımdı. Söyledim.',
          ];
        return [
          'Gece yarısı Rıza Bey seni göl kıyısına çağırıyor. Elinde, iple bağlanmış, iki kalın dosya.',
          'Halim\'in dosyası, diyor. Ve Yakup\'un. Kırk yıl taşıdım. İzmir\'de o gece bastonumu yere koydum; ' + (s === 'sen' ? 'sen benden önce koydun. ' : 'kimse görmedi ama sen gördün. ') + 'Artık bunları taşıyacak birine verebilirim.',
          'Dosyaları sana uzatıyor.',
        ];
      },
      secenekler: [
        {
          etiket: 'Bastonu geri ver. Seni kırk yıl delil taşıdı; bir gece taşımadı. Kal Rıza Bey.',
          kosul: (d) => bayrak(d, 'rizaSorgu') === 'sopa',
          etki: { bayrak: { rizaSon22: 'kal' }, artir: { rizaBag: 1 } },
          sonra: 'riza22_son',
        },
        {
          etiket: 'Bastonu al. Haklısın; dinlenmeyi hak ettin.',
          kosul: (d) => bayrak(d, 'rizaSorgu') === 'sopa',
          etki: { bayrak: { rizaSon22: 'emekli' } },
          sonra: 'riza22_son',
        },
        {
          etiket: 'Hata yaptım. Biliyorum.',
          kosul: (d) => bayrak(d, 'rizaSorgu') === 'kalabalik',
          etki: { bayrak: { rizaSon22: 'baris' }, artir: { rizaBag: 1 } },
          sonra: 'riza22_son',
        },
        {
          etiket: 'O gece başka yolu yoktu.',
          kosul: (d) => bayrak(d, 'rizaSorgu') === 'kalabalik',
          etki: { bayrak: { rizaSon22: 'kirgin' }, artir: { rizaBag: -1 } },
          sonra: 'riza22_son',
        },
        {
          etiket: 'Dosyaları al.',
          kosul: (d) => !['sopa', 'kalabalik'].includes(bayrak(d, 'rizaSorgu')),
          etki: { bayrak: { rizaSon22: 'devir' }, artir: { rizaBag: 1 } },
          sonra: 'riza22_son',
        },
        {
          etiket: 'Sende kalsın Rıza Bey. Daha işin bitmedi.',
          kosul: (d) => !['sopa', 'kalabalik'].includes(bayrak(d, 'rizaSorgu')),
          etki: { bayrak: { rizaSon22: 'tasi' } },
          sonra: 'riza22_son',
        },
      ],
    },
    riza22_son: {
      ortam: 'ortam_gol',
      baslik: 'Göl',
      paragraflar: (d) => [
        {
          kal: 'Rıza Bey bastonu alıyor. Uzun süre gölün karanlığına bakıyor. Kırk yıl, diyor; bir gece. Peki. Bir yıl daha. Sonra bakarız.',
          emekli: 'Bastonu alıyorsun. Ağır; meşe, gümüş başlı. Rıza Bey ellerini ceplerine sokuyor. İlk kez bu kadar yaşlı görünüyor. Ve ilk kez bu kadar hafif.',
          baris: 'Rıza Bey başını sallıyor. Bilmek yetmez, diyor. Ama başlangıç. Ben bilmeyi yirmi dört yıl erteledim. Sen bir haftada. Daha iyisin benden.',
          kirgin: 'Rıza Bey bir şey demiyor. Bastonuna dayanıp otele dönüyor. Kar ayak izlerini hemen dolduruyor.',
          devir: 'Dosyaları alıyorsun. Kâğıtların kokusu: toz, tütün, eski mürekkep. Rıza Bey hafifçe gülümsüyor. Döverek değil, diyor. Biliyorum, diyorsun: delille.',
          tasi: 'Rıza Bey dosyaları koltuğunun altına geri sıkıştırıyor. Haklısın, diyor. Bir iş daha. Belki iki.',
        }[bayrak(d, 'rizaSon22') || 'tasi'],
      ],
      secenekler: [{ etiket: 'Devam' }],
    },
    neslihan22: {
      ortam: 'ortam_lozan_otel',
      baslik: 'Pasaport',
      paragraflar: (d) => [
        'Sabah İsviçre polisinden bir memur geliyor: bütün yabancıların kâğıtları denetleniyor. Neslihan\'ın elindeki pasaport Fransız; adı: Neslihan Rivière.',
        'Memur gidince Neslihan pasaportu masaya bırakıyor. Dört yıldır bu adı taşıyorum, diyor. Viyana\'da, Zürih\'te, Ankara\'da bile. Kâğıtlarda hâlâ onun kızıyım.',
        bayrak(d, 'cocukKarar') === 'yanina'
          ? 'Cebinden bir mektup çıkarıyor: Gülce\'den, İstanbul\'dan. Ayva iyi; Gülce\'nin bürosunda kâğıtlara gemi çiziyor. Altına Gülce yazmış: Okulda adını soruyorlar; ne yazalım? Neslihan gülümsüyor. Ona bir ad vermem gerek, diyor. Bir de kendime.'
          : bayrak(d, 'cocukKarar') === 'aile'
            ? 'Cebinde Rina\'nın çizimi: bir gemi, bir rıhtım, bir ayva. Bir çocuğun bir adı var, diyor Neslihan. Ninesi biliyor. Benim adımı kim biliyor?'
            : 'Bir adım olmalı, diyor. Kendi adım.',
        ['durust', 'sonra_durust'].includes(bayrak(d, 'kardesGecesi'))
          ? 'Sana bakıyor. Sen bana Viyana\'da doğruyu söyledin, diyor. Şimdi sana soruyorum, çünkü bana doğruyu söylersin: Hangi adı taşımalıyım?'
          : 'Sana bakıyor. Hangi adı taşımalıyım, diye soruyor; cevabı senden mi, kendinden mi beklediğini bilmeden.',
      ],
      secenekler: [
        {
          etiket: 'İsmail kızı Neslihan. Manastırlı. Babamızın adı.',
          etki: { bayrak: { neslihanAd: 'baba' }, artir: { neslihanBag: 1 } },
          sonra: 'neslihan22_son',
        },
        {
          etiket: 'Rivière adını da sen kazandın. Onu da taşı; ikisini birden.',
          etki: { bayrak: { neslihanAd: 'iki' } },
          sonra: 'neslihan22_son',
        },
        {
          etiket: 'Ben söyleyemem. Bu adı sen seçeceksin.',
          etki: { bayrak: { neslihanAd: 'kendi' }, artir: { neslihanBag: 1 } },
          sonra: 'neslihan22_son',
        },
      ],
    },
    neslihan22_son: {
      ortam: 'ortam_lozan_otel',
      baslik: 'Ad',
      paragraflar: (d) => [
        {
          baba: 'Neslihan pasaportun adı yazılı sayfasını parmağıyla örtüyor. İsmail kızı, diye tekrarlıyor. Babam bunu duyunca ağlar. Ankara\'ya dönünce nüfusa gideceğim.',
          iki: 'Neslihan uzun süre düşünüyor. Sonra gülüyor. İki adla yaşamak, diyor; iki dille, iki şehirle. Bunu yapabilirim. Ben zaten öyle yaşıyorum.',
          kendi: 'Neslihan sana bakıyor; şaşkın, sonra minnettar. Kimse bana bunu söylememişti, diyor. Ne babam, ne Rivière, ne sen. Peki. Seçeceğim. Ama bugün değil.',
        }[bayrak(d, 'neslihanAd') || 'kendi'],
        bayrak(d, 'cocukKarar') === 'yanina' ? 'Gülce\'ye cevap yazıyor. Kızın adı Zehra olsun, diyor; annemizin adı. Ayva da kalsın; evde.' : '',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam' }],
    },

    // --- Alt komisyon -----------------------------------------------------
    komisyon: {
      ortam: 'ortam_lozan_otel',
      efekt: 'tokmak',
      baslik: 'Alt komisyon',
      paragraflar: (d) => {
        const k = kanitSayisi(d);
        const p = [
          'Küçük bir salon; yeşil çuha kaplı bir masa. Kayıp mallar alt komisyonu: üç hukukçu, iki kâtip, bir tercüman. Sen dinleyicilerin arasındasın; Nermin basın sırasında.',
          pendleBurada(d)
            ? 'Pendle ön sırada. Viyana\'dakinden zayıf; ceketi bol gelmiş. Seni görünce başını çeviriyor.'
            : 'Pendle\'in yerinde, Londra\'dan gelmiş bir avukat. Pendle\'in adı yalnızca kâğıtlarda.',
        ];
        if (bayrak(d, 'klaraYardim')) p.push('Dilekçeyi sunması gereken Klara Rainer ayağa kalkıyor. Müvekkilimin dilekçesini geri çekiyorum, diyor. Bana verilen ambar listesi ile asıl liste farklı. İkisini de komisyona sunuyorum. Salonda bir uğultu.');
        if (delilVar(d, 'kemal_ifadesi')) p.push('Kemal Reis\'in yeminli ifadesi okunuyor. Pendle\'in yüzü bembeyaz.');
        if (delilVar(d, 'kizilhac_fisi')) p.push('Kızılhaç\'ın mühürlü teslim fişi masaya konuyor. Kırk sandık: Ağustos\'ta Eleni\'ye, Eylül\'de yine Eleni\'ye.');
        if (bayrak(d, 'basinYardim')) p.push('Hukukçulardan birinin önünde, katlanmış, o sabahki Gazette de Lausanne. Üçüncü sayfa.');
        p.push(
          k >= 2
            ? 'Komisyon başkanı kâğıtları topluyor. Dilekçe reddedilmiştir, diyor. Ve belgelerin İsviçre savcılığına iletilmesine karar verilmiştir. Tokmak.'
            : k === 1
              ? 'Komisyon başkanı kâğıtları topluyor. Dilekçe, ek belgeler gelene dek askıya alınmıştır. Tokmak. Pendle\'in avukatı gülümsüyor; askı, bu otelde, çoğu zaman unutmak demektir.'
              : 'Komisyon başkanı dilekçeyi okuyor, başını sallıyor. Karşı belge sunulmamıştır. Dilekçe incelemeye alınmıştır. Tokmak. Pendle\'in avukatı not alıyor.',
        );
        return p;
      },
      secenekler: [
        {
          etiket: 'Devam',
          etki: (d) => ({ bayrak: { tazminatSonu: kanitSayisi(d) >= 2 ? 'red' : kanitSayisi(d) === 1 ? 'askida' : 'inceleme' } }),
          sonra: 'koridor',
        },
      ],
    },
    koridor: {
      ortam: 'ortam_lozan_otel',
      baslik: 'Koridor',
      paragraflar: (d) => [
        pendleBurada(d)
          ? bayrak(d, 'tazminatSonu') === 'red'
            ? 'Koridorda Pendle bir koltuğa çökmüş. Seni görünce kalkmıyor. Bir tüccar batan gemiden iner, diyor; sesi kısık. Ama ben gemiyle battım. Sen bunu istedin. Bir şey demiyorsun. Demene gerek yok.'
            : 'Koridorda Pendle avukatıyla konuşuyor. Seni görünce kibarca başını eğiyor. Bir dahaki sefere, diyor. Her zaman bir dahaki sefer vardır.'
          : 'Koridorda Pendle\'in avukatı paltosunu giyiyor; Londra treni yarım saat sonra.',
        'Klara Rainer pencerenin önünde; göle bakıyor. ' +
          (bayrak(d, 'klaraYardim')
            ? 'Dilekçeyi geri çektiğim için Cenevre\'deki büromu kaybedeceğim, diyor. Masrafları ödeyen müşteri benden hesap soracak. Kimin ödediğini merak ediyor musunuz?'
            : 'Sizi dinlemem gerekirdi, diyor. Belgeyi getirdiğinizde. Masrafları ödeyen müşteri bana bunu yapmamamı söylemişti. Kimin ödediğini merak ediyor musunuz?'),
        'Klara elindeki dosyanın kapağını gösteriyor. Masraflar: Banque Vollmer, Zürih. Albert Vollmer. Dedemin bankasının kurucularından; Genel Kurul\'da masanın öbür ucunda oturan, hep susan adam. Herkes onu dedemden ayrı sandı.',
        'Ben de, diyor Klara. Ben de sandım.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { delil: [], bayrak: { vollmerIpucu: true } }, sonra: 'son_lozan' }],
    },
    son_lozan: {
      ortam: 'ortam_gol',
      ortamOran: 0.6,
      baslik: '4 Şubat 1923',
      paragraflar: (d) => [
        'Konferans 4 Şubat\'ta kesiliyor; heyetler trenlere biniyor. Barış bu kış imzalanmayacak. Belki baharda, diyor gazeteler.',
        'Ouchy iskelesinde son akşam. Göl buz tutmamış; ama kıyıları beyaz. Rıza Bey, Nermin, Neslihan. ' + (delilVar(d, 'kemal_ifadesi') ? 'Kemal Reis de; yarın Pire\'ye dönecek, oradan İstanbul\'a. Babamın kayıkhanesini görmek istiyorum, diyor.' : 'Kemal Reis\'in motoru iskelede değil; Pendle\'le birlikte gitmiş.'),
        'Nermin defterine son satırı yazıyor: Lozan, bir otel, üç akşam. Kayıp mallar alt komisyonu. Kimsenin okumayacağı bir haber, diyor. Ama yazılmış olsun.',
        'Elinde Klara\'nın verdiği kâğıt: Banque Vollmer. Zürih\'te bir kasa açmıştınız, Rivière\'in anahtarıyla. O bankanın müdürü sizi kapıda karşılamıştı. Gülümseyerek.',
        'Yirmi ikinci bölümün sonu.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_lozan_otel',
      ortamOran: 0.45,
      baslik: 'Yirmi ikinci bölüm bitti',
      paragraflar: ['Kararların kaydedildi. Sıradaki: 1923 baharı, İstanbul. Bir sofra ve Banque Vollmer\'den bir mektup.'],
      secenekler: [{ etiket: 'Yirmi üçüncü bölüme geç', sonrakiBolum: 'bolum23' }, { etiket: 'Ana menüye dön', anaMenu: true }],
    },
  },

  mekanlar: {
    otel22: {
      ad: 'Ouchy\'deki otel',
      ortam: 'ortam_lozan_otel',
      tarif: (d) =>
        'Göl kıyısında büyük bir otel: mermer lobi, kütüphane, basın salonu, iskeleye inen merdiven. ' +
        (sayi(d, 'aksam') < AKSAM_SAYISI ? 'Alt komisyona ' + (AKSAM_SAYISI - sayi(d, 'aksam')) + ' akşam var. Bu akşam nereye gideceksin?' : 'Komisyon toplanıyor.'),
      nesneler: [
        {
          id: 'kutuphane',
          etiket: 'Kütüphaneye, Klara Rainer\'e git',
          kosul: (d) => sayi(d, 'aksam') < AKSAM_SAYISI && !delilVar(d, 'sahte_manifest'),
          incele: 'Kütüphanenin kapısını açıyorsun.',
          etki: { sahne: 'klara22' },
        },
        {
          id: 'iskele',
          etiket: 'İskeleye, Kemal Reis\'e git',
          kosul: (d) => sayi(d, 'aksam') < AKSAM_SAYISI && !delilVar(d, 'kemal_ifadesi'),
          incele: 'Karlı merdivenlerden iskeleye iniyorsun.',
          etki: { sahne: 'kemal22' },
        },
        {
          id: 'kizilhac',
          etiket: 'Cenevre trenine bin, Kızılhaç\'a, Eleni\'ye git',
          kosul: (d) => sayi(d, 'aksam') < AKSAM_SAYISI && !delilVar(d, 'kizilhac_fisi'),
          incele: 'İstasyona yürüyorsun.',
          etki: { sahne: 'eleni22' },
        },
        {
          id: 'basin',
          etiket: 'Basın salonuna, Nermin\'le git',
          kosul: (d) => sayi(d, 'aksam') < AKSAM_SAYISI && !bayrak(d, 'basinGidildi'),
          incele: 'Basın salonunun kapısından duman taşıyor.',
          etki: { sahne: 'basin22' },
        },
      ],
      kisiler: ['nermin', 'neslihan', 'riza'],
      gecisler: [],
    },
  },

  kisiler: {
    nermin: {
      ad: 'Nermin',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            bayrak(d, 'pendleSonu') === 'gazete'
              ? 'Nermin muhabir kartını düzeltiyor. İzmir haberini bilen muhabirler burada, diyor. Bir akşamımı onlara verirsem, sabah gazetesi bizim tanığımız olur.'
              : 'Nermin defterini karıştırıyor. Klara\'nın imzası dilekçenin altında, diyor. Zürih\'te bize yardım etmişti. Şimdi karşımızda. Avukatlar böyledir; ama Klara avukattan fazlası.',
          secenekler: [{ etiket: 'Anlaşıldı.' }],
        },
      },
    },
    neslihan: {
      ad: 'Neslihan',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Neslihan pencereden göle bakıyor. Rivière beni bir kez buraya getirmişti, diyor. Yirmi yaşındaydım galiba. Yaşımı bile karıştırıyorum abi; o yıllar tek bir uzun kış gibi.',
          secenekler: [{ etiket: 'Kış bitti Neslihan.' }],
        },
      },
    },
    riza: {
      ad: 'Rıza Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: 'Rıza Bey haritayı değil, saati gösteriyor. Klara belgeye bakar, diyor; bir akşam yetmeyebilir. Kemal kalbine bakar; o da bir akşam yetmeyebilir. Eleni kayda bakar; ona bir akşam yeter. İyi say.',
          secenekler: [{ etiket: 'Sayıyorum.' }],
        },
      },
    },
  },
};
