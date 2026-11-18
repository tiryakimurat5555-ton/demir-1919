// Otuz üçüncü bölüm: "Koza". Bursa, 2-6 Nisan 1925. Altıncı kitabın açılışı; Gülce'nin bölümü.
// Arka plan (gerçek): Bursa ipekçiliği, Koza Han (koza pazarı), Mudanya-Bursa demiryolu (1892). Gerçek kişiler
// konuşturulmaz; tüccarlar, filatür ve olaylar kurgudur.
// Kurgu: kayıkhanenin ilk davası (32. bölümün levhası): Tevfik kayboldu. Selim (1905 doğumlu; 20. bölümde Nuri Bey'in
// rehinesiydi, 23. bölümde okumayı öğrendi) kayıkhaneye gelir. Tevfik Mudanya gümrüğünde kâtip; belgesiz koza
// sandıklarını durdurmuş. Sandıkların sahibi N. B.: Nuri Bey (20. bölümden; kural 4). Nuri Bursa kozasını Banque Vollmer
// çekleriyle topluyor; filatürleri iflasa sürükleyip ucuza almak için. Tevfik'i Kayhan'daki handa tutuyor.
// Karşılık verilen iplikler: gulceZarf, gulceTevfik, kayikhaneVaris, nuriSonu, tevfikKarar, pusulaKime, rizaSon22.
// Yeni iplikler: gulceArama, nuriSon33, gulceSon33, vollmerCek.
import { BOLUM32 } from './bolum32';
import { bayrak, cikarimVar, delilVar, sayi } from '../oyun/motor';

const gulceYakin = (d) => sayi(d, 'gulceGuven') >= 2 || !!bayrak(d, 'gulceyeAnlatti');
const zarfAcik = (d) => ['acti', 'acti33'].includes(bayrak(d, 'gulceZarf'));

export const BOLUM33 = {
  id: 'bolum33',
  ad: 'Otuz üçüncü bölüm: Koza',
  baslangic: 'acilis',
  ilkMekan: 'kayikhane33',

  deliller: {
    ...BOLUM32.deliller,
    selim_ifadesi: {
      ad: 'Selim\'in anlattığı',
      tarif: 'Tevfik bir hafta önce Kayhan\'daki bir hana gitti. Biri ona, 1921\'de kesilen sayıların kime gittiğini bildiğini söylemişti. Dönmedi. Selim aynı handa, 1921\'de üç ay rehin tutulmuştu.',
    },
    koza_defteri: {
      ad: 'Koza Han\'daki defter',
      tarif: 'Kozacı Hacı Rasim\'in alım satım defteri. Son iki ayda Bursa kozasının yarısından çoğunu tek bir alıcı almış: N. B. Ödemeler Banque Vollmer et Cie, Zürih çekleriyle. Fiyat piyasanın üstünde; filatürler koza bulamıyor.',
    },
    mudanya_kaydi: {
      ad: 'Tevfik\'in defteri',
      tarif: 'Tevfik\'in Setbaşı\'ndaki odasında, yeşil mürekkeple: Mudanya, 21 Mart. N. B. adına otuz sandık koza, Pire\'ye. Menşe şahadetnamesi yok. Durdurdum. İkinci kez geldiler; yine durdurdum. Üçüncü kez biri bana Kayhan\'dan bir not getirdi.',
    },
    vollmer_ceki: {
      ad: 'Nuri Bey\'in imzalı ifadesi',
      tarif: 'Nuri Bey\'in el yazısı: Bursa kozasını Banque Vollmer\'in parasıyla topladım. Amaç fiyatı yükseltmek, filatürleri koza bulamaz hâle getirmek, sonra onları ucuza almak. Talimat Zürih\'ten. Altında bir çek koçanı: A. V.',
    },
  },

  cikarimlar: {
    ...BOLUM32.cikarimlar,
    nuri_dondu: {
      a: 'koza_defteri',
      b: 'selim_ifadesi',
      ad: 'N. B.',
      metin: 'Kozaları toplayan N. B. ile Selim\'i 1921\'de Kayhan\'da tutan adam aynı kişi: Nuri Bey. Tarife işinden sonra Bursa\'ya dönmüş; bu kez tüccar olarak.',
    },
    kapan: {
      a: 'mudanya_kaydi',
      b: 'selim_ifadesi',
      ad: 'Kapan',
      metin: 'Tevfik Mudanya\'da Nuri\'nin sandıklarını iki kez durdurdu. Üçüncüsünde ona Kayhan\'dan bir not geldi: 1921\'in sayıları. Bir kapan. Tevfik yine de gitti.',
    },
  },

  olaylar: [
    { id: 'kayhan', kosul: (d) => cikarimVar(d, 'nuri_dondu') && cikarimVar(d, 'kapan'), etki: { sahne: 'kayhan33' } },
  ],

  hedefler: [
    { kosul: (d) => bayrak(d, 'bolumBitti'), metin: 'Otuz üçüncü bölüm bitti.' },
    { kosul: (d) => !delilVar(d, 'selim_ifadesi'), metin: 'Selim\'i dinle.' },
    { kosul: (d) => !delilVar(d, 'koza_defteri'), metin: 'Bursa\'ya git. Koza Han\'da kozacılara sor.' },
    { kosul: (d) => !delilVar(d, 'mudanya_kaydi'), metin: 'Tevfik\'in Setbaşı\'ndaki odasına bak.' },
    { kosul: () => true, metin: 'Soruşturma panosunda delilleri bağla.' },
  ],

  sahneler: {
    acilis: {
      ortam: 'ortam_kayikhane',
      baslik: '2 Nisan 1925, Karaköy',
      paragraflar: (d) => [
        'Süleyman Kaptan\'ın ölümünün üzerinden yedi ay geçti. Kayıkhanede hâlâ talaş kokusu var.',
        {
          kemal: 'Kemal tezgâhta; Arayan\'ın omurgası bitti, kaburgaları yarım. Her sabah babasının çekicini kullanıyor.',
          gulce: 'Gülce her akşam büro kapanınca iskeleye geliyor; kapıyı o açıyor, o kapatıyor. Anahtar boynunda bir iple.',
          hepimiz: 'Kapıda Ohannes Usta\'nın kalay levhası: Kim kaybolduysa, buradan aranır. Yedi ayda kimse gelmedi. Bu sabah biri geldi.',
        }[bayrak(d, 'kayikhaneVaris')] || 'Kayıkhanenin kapısı açık.',
        'Kapıda yirmi yaşlarında, zayıf, kasketli bir genç. Elinde buruşmuş bir kâğıt. Ben Selim, diyor. Tevfik\'in kardeşi. Ağabeyim kayboldu.',
        'Gülce o sırada içeride, Süleyman\'ın eski masasında defter tutuyor. Kalemi elinde duruyor.',
        bayrak(d, 'pusulaKime') === 'arif'
          ? 'Cebinde Süleyman\'ın pusulası. Elini üstüne koyuyorsun; alışkanlık oldu.'
          : '',
        bayrak(d, 'rahelKarar') === 'birlikte'
          ? 'Neslihan Rahel\'le Beyrut\'ta. Bu kez yanında değil.'
          : 'Neslihan babasının yanında, Kalafatçı Hanı\'nda. Bu kez yanında değil.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: { mekan: 'kayikhane33', bayrak: { ekip_riza: true, ekip_cemil: false, ekip_nermin: false } } }],
    },

    kayhan33: {
      ortam: 'ortam_depo',
      baslik: 'Kayhan\'daki han, gece',
      paragraflar: (d) => [
        'Kayhan çarşısının arkasında eski bir han; kapısı zincirli, bir kapısı değil. Rıza Bey önden giriyor; bastonu taşa vurmuyor, sessiz.',
        'Bodrum. Bir fener. Bir sandalyede Tevfik: yüzü şiş, elleri bağlı, ama gözleri açık. Karşısında, bir sandığın üstünde, kır saçlı, temiz giyimli bir adam: Nuri Bey.',
        bayrak(d, 'nuriSonu') === 'yakalandi'
          ? 'Ankara\'da askerî mahkemeye teslim etmiştik onu. İki yıl yatmış; Yirmi Üç\'te salıverilmiş. Sizi hatırlıyorum, diyor Rıza Bey\'e. Delille, demiştiniz. Ben de delil topladım.'
          : 'Ankara\'da elimizden kaçmıştı; kâğıtlarını yakıp. Dört yıl sonra karşında. Kaçmak bir meslektir, diyor gülümseyerek. Siz de öğrenirsiniz.',
        'Tevfik bana borçlu, diyor Nuri. Yirmi Bir\'de sayılarımı kesti. Şimdi de kozalarımı. Bir gümrük kâtibi iki kere bir adamın önünü keserse, o adam bir şey yapmak zorunda kalır.',
        bayrak(d, 'gulceArama') === 'birlikte'
          ? 'Gülce senin yanında. Nuri\'ye değil, Tevfik\'e bakıyor.'
          : 'Gülce merdivenin başında kalmış; aşağı inmiyor. Sesini duyuyor ama.',
      ],
      secenekler: [
        {
          etiket: 'Rıza Bey konuşsun. Defter, çekler, Tevfik\'in kaydı: delille.',
          etki: { bayrak: { nuriSon33: 'teslim' }, artir: { rizaBag: 1 } },
          sonra: 'kayhan33_son',
        },
        {
          etiket: 'Gülce konuşsun.',
          kosul: (d) => bayrak(d, 'gulceArama') === 'birlikte',
          etki: { bayrak: { nuriSon33: 'imza' }, delil: ['vollmer_ceki'], artir: { gulceGuven: 1 } },
          sonra: 'kayhan33_son',
        },
        {
          etiket: 'Fener ile Nuri arasına gir. Üstüne yürü.',
          etki: { bayrak: { nuriSon33: 'kavga' }, artir: { travma: 1 } },
          sonra: 'kayhan33_son',
        },
      ],
    },
    kayhan33_son: {
      ortam: 'ortam_depo',
      baslik: 'Bodrum',
      paragraflar: (d) => [
        {
          teslim: 'Rıza Bey defteri açıyor; koza defterini, sonra Tevfik\'in yeşil mürekkepli sayfasını. Okuyor; tek tek, yavaş, bir zabıt kâtibi gibi. Nuri\'nin gülümsemesi ikinci sayfada bitiyor. Jandarma kapıda; Rıza Bey çağırmış, haber vermeden. Döverek değil, diyor. Delille. Bu sefer sizin kaçacak kâğıdınız yok.',
          imza: 'Gülce bir adım atıyor. Ben Kâmil Efendi\'nin kızıyım, diyor. On Üç\'te Maliye\'de bir adam babama imzala ve yaşa demişti. Babam imzalamadı; yaşamadı. Size aynı şeyi söylüyorum: imzalayın ve yaşayın. Kozaları kimin parasıyla topladığınızı yazın. Nuri uzun süre bakıyor. Sonra kalemi alıyor. Zürih, diye yazıyor ilk satıra.',
          kavga: 'Fener devriliyor. Karanlıkta bir sandık, bir yumruk, taşa çarpan bir baş; seninki değil. Nefesin kesiliyor; bir an Seddülbahir\'desin. Sonra Rıza Bey\'in sesi: Arif, buradayım. Fener yeniden yandığında Nuri yok; arka kapı açık. Tevfik\'in ipleri kesilmiş; kendisi kesmiş, Nuri\'nin düşürdüğü bıçakla.',
        }[bayrak(d, 'nuriSon33')] || '',
        'Tevfik ayağa kalkıyor; sendeliyor. Selim koşup koluna giriyor.',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', sonra: 'tevfik33' }],
    },
    tevfik33: {
      ortam: 'ortam_kozahan',
      ortamOran: 0.4,
      baslik: 'Koza Han, şafak',
      paragraflar: (d) => [
        'Koza Han\'ın avlusu; şadırvan, sabahın ilk çayları. Tevfik bir taşın üstünde oturuyor, Selim yanında. Gülce karşılarında.',
        {
          yaz: 'Dört yıl önce Gülce ona yaz ve yaşa demişti. Yazmıştı; on dört sayfa. Sonra Mudanya\'da bir kâtiplik. Şimdi Gülce\'ye bakamıyor.',
          affetme: 'Dört yıl önce Gülce onu affetmeyeceğini söylemişti. Kapıyı kapatmıştı. Şimdi bir bodrumdan çıkardığı adamın karşısında oturuyor.',
          sessiz: 'Dört yıl önce Gülce onun defterini kapatıp dizine koymuştu; tek söz etmeden. Tevfik o sessizliği hâlâ taşıyor; yüzünden belli.',
        }[bayrak(d, 'gulceTevfik')] || 'Tevfik Gülce\'ye bakamıyor.',
        zarfAcik(d)
          ? 'Gülce biliyor. Süleyman\'ın zarfındaki mektuptan: On Üç\'te Maliye\'den babasının dosyasını bir gece çıkaran genç kâtip. Tevfik bunu kimseye söylemedi. Gülce\'nin bildiğini bilmiyor.'
          : 'Gülce\'nin cebinde Süleyman\'ın açılmamış zarfı. İçinde ne olduğunu bilmiyor.',
      ],
      secenekler: [
        {
          etiket: 'Gülce ona On Üç\'ü söylesin: Dosyayı sen çıkardın. Babam için. Biliyorum.',
          kosul: (d) => zarfAcik(d),
          etki: { bayrak: { gulceSon33: 'bildi' }, artir: { gulceGuven: 1 } },
          sonra: 'tevfik33_son',
        },
        {
          etiket: 'Gülce zarfı şimdi açsın; burada, onun önünde.',
          kosul: (d) => !zarfAcik(d),
          etki: { bayrak: { gulceSon33: 'acti', gulceZarf: 'acti33' } },
          sonra: 'tevfik33_son',
        },
        {
          etiket: 'Gülce yalnızca elini uzatsın. Kalk Tevfik; Selim seni bekliyor.',
          etki: { bayrak: { gulceSon33: 'el' } },
          sonra: 'tevfik33_son',
        },
        {
          etiket: 'Gülce bir şey söylemesin. Kayıkhaneye dönelim.',
          etki: { bayrak: { gulceSon33: 'sus' } },
          sonra: 'tevfik33_son',
        },
      ],
    },
    tevfik33_son: {
      ortam: 'ortam_kozahan',
      ortamOran: 0.4,
      baslik: 'Şadırvan',
      paragraflar: (d) => [
        {
          bildi: 'Tevfik başını kaldırıyor. Kim söyledi, diyor. Kaptan, diyor Gülce. Ölmeden önce. On iki yıl bildi; söylemedi. Benim için mi, senin için mi, bilmiyorum. Tevfik ağlamıyor; ama elleri titriyor. Geç kaldım, diyor. Biliyorum, diyor Gülce. Babam da geç kalmıştı. Hepimiz geç kaldık.',
          acti: 'Gülce zarfı açıyor; Selim\'in kaptana yazdığı mektup. Okuyor; yüzü değişiyor. Sonra Tevfik\'e dönüyor. On Üç, diyor. Maliye. Sen miydin? Tevfik bir şey demiyor; demesi gerekmiyor. Gülce mektubu katlıyor, Tevfik\'in avucuna koyuyor. Bu seninmiş, diyor. Kaptan yanlış adrese yollamış.',
          el: 'Gülce elini uzatıyor. Tevfik bir süre bakıyor; sonra tutuyor, kalkıyor. Kimse bir şey söylemiyor. Selim ikisinin arasında; gülmekle ağlamak arasında.',
          sus: 'Gülce ayağa kalkıyor. Tren dokuzda, diyor yalnızca. Tevfik başını sallıyor. Selim ağabeyine bakıyor, sonra Gülce\'ye; bir şey anlamıyor. Belki de anlıyor.',
        }[bayrak(d, 'gulceSon33')] || '',
        {
          teslim: 'Nuri Bey Bursa cezaevinde. Koza defteri savcıda. Zürih\'teki çekler bir soru olarak kalıyor: Banque Vollmer neden Bursa\'nın ipeğini satın alıyor?',
          imza: 'Nuri\'nin imzalı ifadesi cebinde. Banque Vollmer, Zürih; talimat, çek koçanı, A. V. Albert Vollmer. Mezatta defteri satan adam, şimdi bir şehrin ipeğini satın alıyor.',
          kavga: 'Nuri kaçtı. Ama koza defteri sende; Zürih\'teki çeklerin numaralarıyla. Banque Vollmer bir şehrin ipeğini satın alıyor; neden?',
        }[bayrak(d, 'nuriSon33')] || '',
      ].filter(Boolean),
      secenekler: [{ etiket: 'Devam', etki: (d) => ({ bayrak: { vollmerCek: bayrak(d, 'nuriSon33') === 'imza' ? 'ifade' : 'soru' } }), sonra: 'kapanis33' }],
    },
    kapanis33: {
      ortam: 'ortam_kayikhane',
      baslik: 'Kayıkhane',
      paragraflar: (d) => [
        'Mudanya\'dan vapur, akşam Karaköy. Kayıkhanenin kapısı açık; Gülce anahtarı çeviriyor.',
        bayrak(d, 'kayikhaneVaris') === 'hepimiz'
          ? 'Levhanın altına biri tebeşirle bir satır yazmış: Tevfik. Bulundu. Ohannes Usta mı, Kemal mi, bilmiyorsun.'
          : 'Masaya ilk dosyayı koyuyorsunuz: Tevfik. Bulundu.',
        bayrak(d, 'gulceArama') === 'yalniz'
          ? 'Gülce masanın başına oturuyor. Ben gelmek istememiştim, diyor sana. Selim için geldim dedim. Yalan söyledim; kendim için geldim.'
          : 'Gülce masanın başına oturuyor. Babamın dosyasını bir gece biri kurtarmaya çalışmış, diyor. Ben de bir dosya kurtardım. Ödeştik mi? Bilmiyorum.',
        bayrak(d, 'vollmerCek') === 'ifade'
          ? 'Nuri\'nin ifadesi masada. Zürih. Altıncı kitabın ilk kâğıdı.'
          : 'Koza defteri masada; Zürih\'ten gelen çeklerin numaraları. Altıncı kitabın ilk kâğıdı.',
        'Otuz üçüncü bölümün sonu.',
      ],
      secenekler: [{ etiket: 'Devam', etki: { bayrak: { bolumBitti: true } }, sonra: 'son' }],
    },
    son: {
      ortam: 'ortam_kayikhane',
      ortamOran: 0.45,
      baslik: 'Otuz üçüncü bölüm bitti',
      paragraflar: ['Kararların kaydedildi. Sırada otuz dördüncü bölüm: Tebeşir.'],
      secenekler: [
        { etiket: '34. bölüme geç', sonrakiBolum: 'bolum34' },
        { etiket: 'Ana menüye dön', anaMenu: true },
      ],
    },
  },

  mekanlar: {
    kayikhane33: {
      ad: 'Kayıkhane',
      ortam: 'ortam_kayikhane',
      tarif: 'Tezgâh, talaş, Süleyman\'ın eski masası. Kapıda Selim bekliyor; Gülce masanın başında.',
      nesneler: [
        {
          id: 'kagit33',
          etiket: 'Selim\'in elindeki kâğıt',
          incele: 'Tevfik\'in el yazısıyla bir not: Kayhan, eski han, Çarşamba gecesi. Altında başka bir el: Yirmi Bir\'in sayıları sendeyse, gel.',
        },
      ],
      kisiler: ['selim33', 'gulce33', 'riza33'],
      gecisler: [
        { hedef: 'bursa33', etiket: 'Mudanya vapuruna, oradan trenle Bursa\'ya', kosul: (d) => delilVar(d, 'selim_ifadesi') && !!bayrak(d, 'gulceArama') },
      ],
    },
    bursa33: {
      ad: 'Koza Han',
      ortam: 'ortam_kozahan',
      tarif: 'İki katlı taş han; avlusunda şadırvan. Kozacılar çuvalların başında. Kayhan çarşısı arkada; Setbaşı köprünün öbür yanında.',
      nesneler: [],
      kisiler: ['rasim33'],
      gecisler: [{ hedef: 'oda33', etiket: 'Setbaşı\'na, Tevfik\'in odasına' }],
    },
    oda33: {
      ad: 'Tevfik\'in odası',
      ortam: 'ortam_oda',
      tarif: 'Setbaşı\'nda bir evin üst katı. Dar bir yatak, bir masa, bir rafta düzgün dizilmiş defterler. Selim burada ağabeyiyle kalıyor.',
      nesneler: [
        {
          id: 'masa33',
          etiket: 'Masadaki defter',
          incele: (d) =>
            delilVar(d, 'mudanya_kaydi')
              ? 'Yeşil mürekkep. Tevfik hâlâ aynı mürekkeple yazıyor; Yirmi Bir\'de seni ona götüren mürekkeple.'
              : 'Yeşil mürekkeple tutulmuş bir defter. Son sayfa: Mudanya, 21 Mart. Otuz sandık koza, N. B. adına. Durdurdum.',
          etki: (d) => (delilVar(d, 'mudanya_kaydi') ? null : { delil: ['mudanya_kaydi'] }),
        },
      ],
      kisiler: [],
      gecisler: [{ hedef: 'bursa33', etiket: 'Koza Han\'a dön' }],
    },
  },

  kisiler: {
    selim33: {
      ad: 'Selim',
      giris: (d) => (delilVar(d, 'selim_ifadesi') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: (d) =>
            [
              'Selim kasketini elinde evirip çeviriyor. Ağabeyim Mudanya gümrüğünde kâtip, diyor. Geçen Çarşamba Bursa\'ya geldi; Kayhan\'da biriyle buluşacaktı. Dönmedi.',
              bayrak(d, 'tevfikKarar') === 'teslim'
                ? 'Polatlı\'da beni Cemil Bey\'in hastanesinde bulan oydu. O handan çıkardıktan sonra.'
                : 'Polatlı\'da Cemil Bey\'in hastanesinde sedye taşıyordum. Ağabeyim beni orada buldu; sonra.',
            ].join(' '),
          secenekler: [
            {
              etiket: 'Kayhan\'da hangi han?',
              etki: { delil: ['selim_ifadesi'] },
              sonra: 'han',
              cevap: 'Selim\'in yüzü değişiyor. Yirmi Bir\'de beni tuttukları han, diyor. Üç ay. Bir bodrum. Nuri Bey\'in adamları. Ağabeyime bir not gelmiş: Yirmi Bir\'in sayıları kime gitti, biliyorum. Gitme dedim. Gitti.',
            },
          ],
        },
        han: {
          soz: 'Selim kâğıdı uzatıyor. Kaptana mektup yazmıştım, diyor. Geçen yaz. Cevap gelmedi; sonra öldüğünü duydum. Levhayı da duydum. Kim kaybolduysa.',
          secenekler: [{ etiket: 'Bulacağız Selim.' }],
        },
        sonra: {
          soz: 'Selim kapının yanında bekliyor; kasketini hâlâ çeviriyor.',
          secenekler: [{ etiket: 'Hazırlan.' }],
        },
      },
    },
    gulce33: {
      ad: 'Gülce',
      giris: (d) => (bayrak(d, 'gulceArama') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: (d) =>
            [
              'Gülce kalemi bırakıyor. Dört yıl önce onu bu şehirden kovdum, diyor; Bursa\'ya yanlış sayılar yazan adamı. Şimdi kardeşi kapımda.',
              zarfAcik(d)
                ? 'Kaptanın zarfını okudum. On Üç\'ü biliyorum. Ona hiç söylemedim. Bilmesini istemedim; borçlu kalmak istemedim.'
                : 'Kaptanın zarfı hâlâ cebimde. Açmadım. Bursa damgalı; artık neden olduğunu tahmin ediyorum.',
              gulceYakin(d) ? 'Sana soruyorum, Arif. Benimle gelir misin?' : 'Gelmem gerekir mi, bilmiyorum.',
            ].join(' '),
          secenekler: [
            {
              etiket: 'Gel. Bu senin kararın olmalı; aşağı inersen ben yanındayım.',
              etki: { bayrak: { gulceArama: 'birlikte' }, artir: { gulceGuven: 1 } },
              cevap: 'Gülce anahtarı boynundan çıkarıp masaya koyuyor. Kemal bakar, diyor. Ya da Ohannes Usta. Biz bir gün yokuz.',
            },
            {
              etiket: 'Kal. Biz ararız. Tevfik\'i aramak zorunda değilsin.',
              etki: { bayrak: { gulceArama: 'yalniz' } },
              cevap: 'Gülce başını sallıyor. Sonra paltosunu alıyor. Selim için gelirim, diyor. Tevfik için değil. Merdivenin başında beklerim.',
            },
            {
              etiket: 'Zarfı aç önce. Ne taşıdığını bilmeden yola çıkma.',
              kosul: (d) => !zarfAcik(d),
              etki: { bayrak: { gulceArama: 'birlikte', gulceZarf: 'acti33' } },
              cevap: 'Gülce zarfı açıyor. Selim\'in mektubu. On Üç. Maliye. Tevfik. Okuyor; bir kez, iki kez. Sonra katlıyor. Geliyorum, diyor. Bu sefer biliyorum ne için.',
            },
          ],
        },
        sonra: {
          soz: 'Gülce paltosunu giymiş. Tren dokuzda, diyor.',
          secenekler: [{ etiket: 'Tamam.' }],
        },
      },
    },
    riza33: {
      ad: 'Rıza Bey',
      giris: () => 'ilk',
      dugumler: {
        ilk: {
          soz: (d) =>
            ({
              emekli: 'Rıza Bey iskelede balık tutuyor. Emekliyim, diyor; oltasını sarmadan. Sonra Selim\'e bakıyor. Bir bodrum mu? Oltayı sarıyor.',
              kirgin: 'Rıza Bey kayıkhanenin kapısında; Moda\'dan beri ilk kez. Kayıp bir adam, diyor. Benim işim kayıp adamlardı. Geliyorum; konuşmamız gerekmez.',
            }[bayrak(d, 'rizaSon22')] || 'Rıza Bey bastonunu kapıya dayamış. Bursa, diyor. Kayhan. Yirmi Bir\'de Nuri\'nin oradan aldığı adamları sayardık. Geliyorum.'),
          secenekler: [{ etiket: 'Sağ ol Rıza Bey.' }],
        },
      },
    },
    rasim33: {
      ad: 'Hacı Rasim',
      giris: (d) => (delilVar(d, 'koza_defteri') ? 'sonra' : 'ilk'),
      dugumler: {
        ilk: {
          soz: 'Yaşlı bir kozacı; çuvalının başında, bir kozayı parmaklarının arasında yuvarlıyor. Ne arıyorsunuz, diyor. Koza mı, adam mı? Bu yıl ikisi de pahalı.',
          secenekler: [
            {
              etiket: 'Bu yıl kozayı kim alıyor?',
              etki: { delil: ['koza_defteri'] },
              sonra: 'sonra',
              cevap: 'Hacı Rasim defterini açıyor. Biri alıyor, diyor; hepsini. Piyasanın üstünde, peşin, İsviçre çekiyle. N. B. diye imzalıyor. Filatürler koza bulamıyor; Demirtaş\'taki kızlar işsiz. Bu, ticaret değil evlat. Bu, bir şehri boğmak.',
            },
          ],
        },
        sonra: {
          soz: 'Hacı Rasim kozayı ışığa tutuyor. İyi koza, diyor. Kimin elinde kalacak, o belli değil.',
          secenekler: [{ etiket: 'Sağ olun.' }],
        },
      },
    },
  },
};
