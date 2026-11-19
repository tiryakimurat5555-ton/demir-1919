// Dördüncü görev: Kül (birinci perde, Karaköy). Saf JavaScript; gorev1.js'i içe aktarmaz.
//
// Pazartesi. Kasketli Yaşar Haliç'ten çıkarılmıştır; sırtında Sabri'ninkiyle aynı yara. Komiser Halim korkmuştur.
// Halim'i polisliğe sokan emekli komiser Rıza Bey gelir: "Döverek değil, delille." Gündüz Yaşar'ın cesedi, Hüsnü,
// Gülce; akşam Halim Rum meyhanesinde tek başına içer. Kalıbı kıran bölüm: pano yok, bir sorgu var. Elindeki her
// delil Halim'in üstüne bir ağırlıktır (baskı); baskı yeterince olunca Halim çözülür. Sonra Halim'in kaderine karar
// verilir: teslim etmek, bırakmak ya da Ohannes'in mahzeninde saklamak. Delorme temizlik yapıyor; saklanmayan ölür.
//
// d alanları: gorev 4, gorevGun, baski, bayrak.*

const bayrak = (d, k) => d.bayrak[k];
const delilVar = (d, id) => d.deliller.includes(id);
function delilEkle(d, id) {
  if (delilVar(d, id)) return false;
  d.deliller.push(id);
  return true;
}
const gunDakika = (d) => ((d.dakika % 1440) + 1440) % 1440;
const ilkGun = (d) => d.gun === d.gorevGun;
const g4Mi = (d) => d.gorev === 4;

export const BASKI_SINIRI = 3;

export const G4_DELILLER = {
  yasar_yarasi: {
    ad: 'Yaşar\'ın sırtındaki yara',
    tarif: 'Kasketli Yaşar\'ın sırtında, sol kürek kemiğinin altında ince bir bıçak yarası. Kaburgaların arasından, tek seferde. Sabri\'ninkiyle aynı el.',
  },
  ikinci_motor: {
    ad: 'Pazar gecesinin motoru',
    tarif: 'Hüsnü Reis pazar gecesi yine ışıksız bir motor gördü; Haliç\'in ağzında bir süre durup geri dönmüş. Güvertede uzun paltolu bir adam.',
  },
  halim_dilekce: {
    ad: 'Halim\'in tayin dilekçesi',
    tarif: 'Gülce\'ye göre Komiser Halim bu sabah Liman İdaresi\'ne bir dilekçe göndermiş: Bursa\'ya tayin istiyor. Acele, yazıyormuş kenarında, kendi eliyle.',
  },
  halim_itirafi: {
    ad: 'Halim\'in itirafı',
    tarif: 'Halim anlattı: Sabri\'yi Delorme öldürdü, kendisi kimsesiz diye gömdürdü. Ayda otuz lira. Çarşamba gecesi Ferrante\'nin antreposunda son sandıklar yükleniyor; Delorme orada olacak. Bir de 1913\'te Maliye\'de bir kâtip: Kâmil Efendi. Nazım Bey ona İmzala ve yaşa demiş.',
  },
};

export const G4_CIKARIMLAR = {
  ayni_el: {
    ifade: 'Sabri\'yi ve Yaşar\'ı aynı el öldürdü: Delorme kendi adamlarını da temizliyor.',
    kume: [['yasar_yarasi'], ['bicak_yarasi', 'dinle_toplanti', 'delorme_kart', 'kul_tablasi']],
    gorev: 4,
  },
  kacis: {
    ifade: 'Halim kaçmaya hazırlanıyor; sıranın kendisinde olduğunu biliyor.',
    kume: [['halim_dilekce'], ['yasar_yarasi', 'ikinci_motor']],
    gorev: 4,
  },
};

export const G4_YANLISLAR = [
  { gorev: 4, ifade: 'Yaşar\'ı Halim öldürdü; muhbirini susturdu.', duzeltme: 'Halim kendi muhbirini öldürse cesedini Haliç\'e atmaz evlat, kendi karakolunun önüne koymaz. O yara usta işi.' },
  { gorev: 4, ifade: 'Yaşar sarhoş düşüp boğuldu.', duzeltme: 'Bu limanda herkes sarhoş düşüp boğuluyorsa, birileri onları itiyordur.' },
];

// --- Nesneler ---
export const G4_NESNELER = [
  {
    id: 'yasar',
    ad: 'Yaşar\'ın cesedi',
    mekan: 'dis',
    x: 20,
    y: 2,
    mevcut: (d) => g4Mi(d) && ilkGun(d) && gunDakika(d) < 10 * 60 + 30,
    giris: 'Rıhtımın taşına bir çuval örtülmüş. Altından bir kasket çıkmış, ıslak.',
    eylemler: [
      {
        id: 'sirt',
        etiket: 'Çuvalı kaldır, sırtına bak',
        yap: () => ({
          metin: 'Kimse seni durdurmuyor; Halim\'in adamları bile uzakta. Yaşar\'ın sırtında, sol kürek kemiğinin altında ince bir yara. Kaburgaların arasından, tek seferde. Sabri\'yi düşünüyorsun; aynı yer, aynı el.',
          delil: ['yasar_yarasi'],
        }),
      },
      {
        id: 'cep',
        etiket: 'Ceplerini yokla',
        yap: (d) => {
          if (bayrak(d, 'yasarCep')) return { metin: 'Cepleri boş.' };
          d.bayrak.yasarCep = true;
          d.para += 3;
          return { metin: 'Islak cepler. Üç kuruş, bir sigara paketi ve katlanmış bir kâğıt: Kalafatçı Hanı, 3. Senin odan. Paranın üçünü de alıyorsun; Yaşar\'ın artık ihtiyacı yok. Kâğıdı yırtıp denize atıyorsun.' };
        },
      },
    ],
  },
  {
    id: 'mahzen',
    ad: 'Ohannes\'in mahzen kapağı',
    mekan: 'han',
    x: 42,
    y: 18,
    mevcut: (d) => g4Mi(d) && bayrak(d, 'halimSonu') === 'sakli',
    giris: 'Avlunun köşesinde, kilim altında bir mahzen kapağı. Aşağıda Halim var.',
    eylemler: [
      {
        id: 'dinle',
        etiket: 'Kapağa kulak ver',
        yap: () => ({ metin: 'Aşağıdan bir tespih sesi geliyor. Halim namaz kılıyor ya da kılmayı hatırlamaya çalışıyor.' }),
      },
    ],
  },
];

// --- Sorgu ---
const BASKILAR = [
  {
    id: 'yasar',
    etiket: 'Yaşar\'ın sırtındaki yarayı gördüm. Sabri\'ninkiyle aynı.',
    kosul: (d) => delilVar(d, 'yasar_yarasi'),
    deger: 1,
    metin: 'Halim kadehi bırakıyor. Eli titriyor. Gördüm, diyor. Ben de gördüm. Sabri\'yi de gördüm. Aynı.',
  },
  {
    id: 'defter',
    etiket: 'Nazım Bey\'in defterinde adın var: H., Karaköy, ayda otuz.',
    kosul: (d) => delilVar(d, 'rusvet_defteri'),
    deger: 2,
    metin: 'Halim\'in yüzü kül rengi. O defter, diyor fısıltıyla, o defter odadan çıkmaz. Sen... Sesi kesiliyor.',
  },
  {
    id: 'gecit',
    etiket: 'Geçen akşam geçitte seni duydum. Kayıkhane yakılacak dedin.',
    kosul: (d) => delilVar(d, 'kulak_misafiri') || delilVar(d, 'halim_bulusma'),
    deger: 1,
    metin: 'Halim gözlerini kapatıyor. Ben demedim, diyor. Ben iletirim. Hep iletirim.',
  },
  {
    id: 'defin',
    etiket: 'Sabri\'yi kimsesiz diye gömdürdün. Taşsız, duasız.',
    kosul: () => true,
    deger: 1,
    metin: (d) =>
      bayrak(d, 'sabriTasi')
        ? 'Halim başını eğiyor. Mezarına taş dikmişsiniz, duydum. Ateşçi Sabri, Trabzonlu. Ben de geçtim önünden. Okuyamadım.'
        : 'Halim kadehine bakıyor. Kimsesizdi, diyor. Ama sesi buna kendisi de inanmıyor.',
  },
  {
    id: 'emir',
    etiket: 'Maliye\'den gelen emir: kırk sandık otuz sekiz yazılsın.',
    kosul: (d) => delilVar(d, 'nazim_emri'),
    deger: 1,
    metin: 'Halim acı acı gülüyor. İki sandık kâğıtta yok oldu, değil mi? O iki sandık benim payımdı. Hiç görmedim bile.',
  },
];

export function baskiSecenekleri() {
  return BASKILAR;
}

const sorguSecenekleri = [
  ...BASKILAR.map((b) => ({
    etiket: b.etiket,
    kosul: (d) => b.kosul(d) && !bayrak(d, 'baski_' + b.id),
    yap: (d) => {
      d.bayrak['baski_' + b.id] = true;
      d.baski = (d.baski || 0) + b.deger;
      return typeof b.metin === 'function' ? b.metin(d) : b.metin;
    },
    sonra: 'sorgu',
  })),
  {
    etiket: 'Yakasına yapış. Konuş, Halim!',
    kosul: (d) => !bayrak(d, 'baski_tehdit'),
    yap: (d) => {
      d.bayrak.baski_tehdit = true;
      if (bayrak(d, 'rizaGelir')) {
        d.rizaBag = (d.rizaBag || 0) - 1;
        return 'Elini uzattığın anda Rıza Bey bileğini yakalıyor; demir gibi bir el. Döverek değil, diyor alçak sesle. Halim\'in gözleri ikinizin arasında gidip geliyor. Bir şey kazanmadın; Rıza\'nın gözünde bir şey kaybettin.';
      }
      d.baski = (d.baski || 0) + 1;
      d.itibar -= 1;
      d.travma = (d.travma || 0) + 1;
      return 'Yakasından tutup masaya yapıştırıyorsun. Kadehler devriliyor; meyhanede herkes susuyor. Halim konuşmuyor, ağlıyor. Ellerinde bir şey kıpırdıyor: Seddülbahir\'de bir esirin yakası. Bırakıyorsun. Meyhaneci kapıyı gösteriyor ama bir şey demiyor.';
    },
    sonra: 'sorgu',
  },
  {
    etiket: 'Delorme seni de temizleyecek, Halim. Sana bir yol var; anlat.',
    kosul: (d) => (d.baski || 0) >= BASKI_SINIRI,
    sonra: 'itiraf',
  },
  {
    etiket: 'Delorme seni de temizleyecek, Halim. Anlat.',
    kosul: (d) => (d.baski || 0) < BASKI_SINIRI,
    yap: () => 'Halim kadehini kaldırıyor. Sen kim oluyorsun? Bir hamal. Bir hamala ne anlatacağım? Elinde ne var ki? Sesi korkudan kalın.',
    sonra: 'sorgu',
  },
  { etiket: 'Masadan kalk.' },
];

// --- Konuşmalar ---
export const G4_KONUSMALAR = {
  riza: {
    uygun: (d) => g4Mi(d),
    giris: (d) => (bayrak(d, 'g4Bitti') ? 'bitti' : bayrak(d, 'rizaTanisti4') ? 'sonra' : 'ilk'),
    dugumler: {
      ilk: {
        metin: (d) => {
          d.bayrak.rizaTanisti4 = true;
          if (!d.kesif) d.kesif = {};
          d.kesif.kisi_riza = true;
          const k1 = bayrak(d, 'karar1');
          return k1 === 'polis'
            ? 'Rıza Bey hanın avlusunda, sırtı dimdik, ellerini bastonunun üstüne koymuş. Cihangir\'deki ev, diyor; belge, kopya. Hatırlarsın. Yaşar\'ı duydum. Halim\'i polisliğe ben soktum, Arif. On dokuz yaşında bir yetimdi; okuma yazmayı ben öğrettim. Şimdi bana ne olduğunu sen anlatacaksın.'
            : 'Avluda yaşlı, dimdik bir adam; bastonunun üstünde iki eli. Rıza, diyor. Emekli komiser. Süleyman çağırdı. Halim\'i polisliğe ben soktum. On dokuz yaşında bir yetimdi; okuma yazmayı ben öğrettim. Şimdi bana ne olduğunu sen anlatacaksın.';
        },
        secenekler: [{ etiket: 'Anlatayım Rıza Bey.', sonra: 'kural' }],
      },
      kural: {
        metin: () =>
          'Dinliyor; hiç sözünü kesmeden, iki kez sordurarak. Sonunda bastonunu taşa vuruyor. Halim akşamları Rum meyhanesinde içer, diyor; han ile yapıların arasında, rıhtıma bakan kapı. Bu akşam tek başına olacak; korkan adam yalnız içer. Onunla konuşacaksan bir kuralım var: Döverek değil, delille. Dayak itiraf getirir; doğruyu getirmez.',
        secenekler: [
          {
            etiket: 'Halim\'i kurtarmak mı istiyorsun, yakalamak mı?',
            yap: (d) => {
              d.bayrak.rizaHalim4 = 'soru';
              return 'Rıza uzun süre susuyor. İkisi aynı şey olabilir mi, diyor sonunda. Bilmiyorum. Kırk yıl polislik ettim; ilk kez bilmiyorum.';
            },
            sonra: 'sonra',
          },
          {
            etiket: 'Sözüm var: elimi kaldırmayacağım.',
            yap: (d) => {
              d.bayrak.rizaHalim4 = 'soz';
              d.rizaBag = (d.rizaBag || 0) + 1;
              return 'Rıza başını eğiyor. Söz kolay, diyor. Masada, karşında korkudan titreyen bir adam varken zor. Göreceğiz.';
            },
            sonra: 'sonra',
          },
          {
            etiket: 'Başını salla.',
            yap: (d) => {
              d.bayrak.rizaHalim4 = 'sus';
            },
            sonra: 'sonra',
          },
        ],
      },
      sonra: {
        metin: () => 'Rıza bastonunu iki elinin arasında çeviriyor. Söyle.',
        secenekler: [
          {
            etiket: 'Bu akşam meyhaneye benimle gel.',
            kosul: (d) => !bayrak(d, 'rizaGelir'),
            yap: (d) => {
              d.bayrak.rizaGelir = true;
              return 'Rıza bir an duraksıyor. Beni görünce kaçabilir, diyor. Ya da kalır; çocukken kalırdı. Ben köşede otururum. Sen konuş. Ben yalnızca orada olurum.';
            },
            sonra: 'sonra',
          },
          {
            etiket: 'Babanı anlat bana. İmam mıydı?',
            kosul: (d) => !bayrak(d, 'rizaBabaAnlatti'),
            yap: (d) => {
              d.bayrak.rizaBabaAnlatti = true;
              return 'Rıza\'nın gözleri bir an yumuşuyor. Kasımpaşa\'da bir mahalle camisinin imamıydı. Polis olacağım dediğimde bana tek bir şey sordu: Kimi koruyacaksın, oğlum? Kanunu mu, insanı mı? O gün cevap veremedim. Hâlâ veremiyorum. Halim o sorunun cevabıydı belki; yanlış cevabı.';
            },
            sonra: 'sonra',
          },
          { etiket: 'Akşam görüşürüz.' },
        ],
      },
      bitti: {
        metin: () => 'Rıza bastonunu kaldırıyor. Çarşamba gecesi antrepo, diyor. Bu kez yasayla gideceğiz, ya da hiç gitmeyeceğiz.',
        secenekler: [{ etiket: 'Peki Rıza Bey.' }],
      },
    },
  },

  halim: {
    uygun: (d) => g4Mi(d) && !bayrak(d, 'g4Bitti'),
    giris: (d) => {
      if (bayrak(d, 'halimItiraf')) return 'sonra';
      return d.mekan === 'meyhane' ? 'sorgu' : 'gun';
    },
    dugumler: {
      gun: {
        metin: () => 'Komiser Halim\'in gözleri kanlı, bıyığı darmadağın. Ne istiyorsun? Git işine. Bugün kimseyle konuşacak halim yok. Yüzünü çeviriyor; elleri ceplerinde, titriyor.',
        secenekler: [{ etiket: 'Uzaklaş.' }],
      },
      sorgu: {
        metin: (d) => {
          const b = d.baski || 0;
          const ilk = !bayrak(d, 'sorguBasladi');
          d.bayrak.sorguBasladi = true;
          const bas = ilk
            ? (bayrak(d, 'rizaGelir')
                ? 'Halim köşedeki Rıza Bey\'i görünce bir an çocuk gibi donuyor. Sonra başını önüne eğiyor. Otur, diyor sana. Madem geldin.'
                : 'Halim meyhanenin en dip masasında, önünde yarısı bitmiş bir rakı şişesi. Seni görünce kaçmıyor; kaçacak gücü yok. Otur, diyor. Madem geldin.') + ' '
            : '';
          const durum = b >= BASKI_SINIRI ? 'Halim\'in omuzları çökmüş; artık sana değil, masaya bakıyor.' : b >= 1 ? 'Halim kadehini çeviriyor; gözü kapıda.' : 'Halim seni süzüyor; korkusunu öfkeyle örtüyor.';
          return bas + durum;
        },
        secenekler: sorguSecenekleri,
      },
      itiraf: {
        metin: (d) => {
          d.bayrak.halimItiraf = true;
          delilEkle(d, 'halim_itirafi');
          d.bayrak.delormeAdi = true;
          d.bayrak.kamilEfendi = true;
          return 'Halim uzun süre susuyor. Sonra konuşmaya başlıyor; bir kez başlayınca duramıyor. Delorme, diyor. Sabri\'yi Delorme öldürdü; motorda, kendi eliyle. Ben gömdürdüm. Ayda otuz lira, Arif; bir komiserin maaşının iki katı. Yaşar\'ı da o öldürdü; çünkü Yaşar seni fark ettirdi. Sırada ben varım. Çarşamba gecesi Ferrante\'nin antreposunda son sandıklar yükleniyor, Delorme orada olacak, saat onda. Bir de... sesi kısılıyor. Bir de on üç senesinde, Maliye\'de bir kâtip vardı. Kâmil Efendi. Nazım Bey ona bir kâğıt uzattı: İmzala ve yaşa. İmzalamadı. Ertesi hafta Haliç\'ten çıkardılar. Ben o gün karakolun kapısında nöbetçiydim. Kaza yazdılar.';
        },
        secenekler: [
          {
            etiket: 'Devam',
            yap: (d) => {
              d.sahne = 'g4_halim_karar';
            },
          },
        ],
      },
      sonra: {
        metin: () => 'Halim kadehini itiyor. Söyledim işte. Daha ne istiyorsun?',
        secenekler: [{ etiket: 'Hiçbir şey.' }],
      },
    },
  },

  husnu: {
    uygun: (d) => g4Mi(d) && !bayrak(d, 'husnuKustu') && !bayrak(d, 'husnu4'),
    giris: () => 'g4',
    dugumler: {
      g4: {
        metin: (d) => {
          d.bayrak.husnu4 = true;
          delilEkle(d, 'ikinci_motor');
          return 'Hüsnü kayığını bağlıyor; ellerine bakmıyor. Pazar gecesi yine o motor geldi, diyor. Işıksız. Haliç\'in ağzında durdu, bir şey attı, geri döndü. Güvertede uzun paltolu bir adam; sigara içiyordu, ateşi elinin içinde. Sonra sabah Yaşar\'ı çıkardılar. Ben yaşlandım Arif. Gözlerim bu kadarını görmek istemiyor.';
        },
        secenekler: [{ etiket: 'Sağ ol Hüsnü Reis.' }],
      },
    },
  },

  gulce: {
    uygun: (d) => g4Mi(d) && !!bayrak(d, 'gulceIzin') && !bayrak(d, 'g4Bitti'),
    giris: (d) => (bayrak(d, 'gulce4') ? 'sonra' : 'g4'),
    dugumler: {
      g4: {
        metin: (d) => {
          d.bayrak.gulce4 = true;
          delilEkle(d, 'halim_dilekce');
          return 'Gülce sesini alçaltıyor. Halim bu sabah İdare\'ye dilekçe yollamış. Bursa\'ya tayin istiyor. Kenarına kendi eliyle yazmış: Acele. Halim hayatında hiçbir şeyi acele istememişti.';
        },
        secenekler: [{ etiket: 'Sağ ol Gülce Hanım.', sonra: 'sonra' }],
      },
      sonra: {
        metin: () => 'Gülce defterini kapatıyor. Başka?',
        secenekler: [
          {
            etiket: 'Kâmil Efendi\'yi tanır mıydın? Maliye\'de kâtipti.',
            kosul: (d) => delilVar(d, 'halim_itirafi') && !bayrak(d, 'gulceKamil'),
            sonra: 'kamil',
          },
          { etiket: 'Yok, sağ ol.' },
        ],
      },
      kamil: {
        metin: (d) =>
          'Gülce\'nin kalemi düşüyor. Eğilip almıyor. Babam, diyor. Kâmil Efendi benim babamdı. On üç senesinde Haliç\'ten çıkardılar; kaza dediler. ' +
          (bayrak(d, 'gulceNazim') ? 'Nazım Bey\'i sorduğunda sana söyleyememiştim. ' : '') +
          'Kim söyledi sana? Ne dedi? Sözcük sözcük söyle.',
        secenekler: [
          {
            etiket: 'Halim söyledi. Nazım Bey babana İmzala ve yaşa demiş; baban imzalamamış.',
            yap: (d) => {
              d.bayrak.gulceKamil = 'soyle';
              d.bayrak.gulceyeAnlatti = true;
              d.gulceGuven = (d.gulceGuven || 0) + 1;
              return 'Gülce gözlerini kapatıyor. İmzalamamış, diyor; bir kez daha, kendine. İmzalamamış. Gözlerini açtığında başka biri bakıyor sana. Nazım Bey, diyor. Teşekkür ederim, Arif. Ne yapacağımı bilmiyorum. Ama artık bir adı var.';
            },
          },
          {
            etiket: 'Bir tanık babanın öldürüldüğünü söyledi. Ayrıntısı şimdilik bende kalsın.',
            yap: (d) => {
              d.bayrak.gulceKamil = 'sakla';
              return 'Gülce dudaklarını sıkıyor. Benden bir şey saklıyorsun, diyor. Babamın son sözünü benden saklıyorsun. Sonra yumuşuyor: Belki beni koruyorsun. Belki kendini. Bir gün söyleyeceksin.';
            },
          },
        ],
      },
    },
  },
};

// --- Sahneler ---
export const G4_SAHNELER = {
  g4_acilis: {
    ortam: 'ortam_han',
    baslik: 'Kül',
    paragraflar: (d) =>
      [
        'Hana dönüyorsun; ayakların seni kendiliğinden getiriyor. Avluda Ohannes ocağı yakmış ama çay koymamış.',
        'Yaşar\'ın cesedi hâlâ rıhtımda, Leventis\'in eski yerinin batısında, bir çuvalın altında. Halim\'in adamları uzakta duruyor; kimse yaklaşmak istemiyor.',
        bayrak(d, 'pusuYardim') === 'riza' || bayrak(d, 'karar1') === 'polis'
          ? 'Avlunun ortasında, bastonuna dayanmış, Cihangir\'deki yaşlı adam bekliyor: Rıza Bey. Seni görünce başını sallıyor.'
          : 'Avlunun ortasında yaşlı, dimdik bir adam bekliyor; bastonuna dayanmış. Süleyman\'ın çağırdığı biri.',
        'Dördüncü görev: Kül. Halim korkuyor. Korkan adam konuşur; ama kime konuşacağını kendisi seçer.',
      ].filter(Boolean),
    secenekler: [{ etiket: 'Avluya çık', sonra: null }],
    bitisSozu: 'Dördüncü görev: Kül. Pazartesi sabahı, Kalafatçı Hanı\'nın avlusu. Rıza Bey avluda. Yaşar\'ın cesedi saat on bire kadar rıhtımda. Akşam Halim, han ile yapıların arasındaki Rum meyhanesinde.',
  },
  g4_halim_karar: {
    ortam: 'ortam_meyhane',
    baslik: 'Halim',
    paragraflar: (d) =>
      [
        'Halim boşalmış şişeye bakıyor. Beni öldürecekler, diyor. Bu gece ya da yarın. Delorme hiçbir şeyi yarıda bırakmaz.',
        bayrak(d, 'rizaGelir') ? 'Rıza Bey köşesinden kalkıp masaya geliyor. Halim\'in omzuna elini koyuyor. Yirmi yıl önce de böyle koymuştu belki.' : '',
        'Halim\'in kaderi senin elinde. Ne yapacaksın?',
      ].filter(Boolean),
    secenekler: [
      {
        etiket: 'Karakola götürelim; ifadesi kayda geçsin.',
        yap: (d) => {
          d.bayrak.halimKarar = 'teslim';
          d.bayrak.halimSonu = 'asildi';
        },
        sonra: 'g4_son_teslim',
      },
      {
        etiket: 'Bırak gitsin. Bursa\'ya kaçsın, yolu açık olsun.',
        yap: (d) => {
          d.bayrak.halimKarar = 'birak';
          d.bayrak.halimSonu = 'bicaklandi';
        },
        sonra: 'g4_son_birak',
      },
      {
        etiket: 'Ohannes\'in mahzenine saklayalım. Bir tanık lazım; ölü tanık konuşmaz.',
        yap: (d) => {
          d.bayrak.halimKarar = 'sakla';
          d.bayrak.halimSonu = 'sakli';
          d.rizaBag = (d.rizaBag || 0) + 1;
        },
        sonra: 'g4_son_sakla',
      },
    ],
  },
  g4_son_teslim: {
    ortam: 'ortam_rihtim',
    baslik: 'Galata Karakolu',
    paragraflar: (d) =>
      [
        'Gece yarısı Halim\'i Galata karakoluna götürüyorsunuz. Rıza Bey nöbetçi komiserle uzun uzun konuşuyor; Halim ifadesini imzalıyor. Ellerinin titremesi geçmiş.',
        'Sabah karakolun önü kalabalık. Nöbetçi komiser Rıza\'nın yüzüne bakamıyor. Halim hücresinde, kemerine asılı bulunmuş. İntihar, diyor kâğıt.',
        'Gece hücrenin kapısını kim açtı? Defterde kimse yok. İfadesinin aslı da yok; yalnızca senin hatırladıkların.',
        'Rıza Bey bastonunu yere bırakıp oturuyor; karakolun basamağına, bir ihtiyar gibi. İlk kez ihtiyar görünüyor. Kanunu korudum, diyor. İnsanı koruyamadım. Babam bunu sormuştu.',
      ].filter(Boolean),
    secenekler: [{ etiket: 'Devam', sonra: 'g4_kapanis' }],
  },
  g4_son_birak: {
    ortam: 'ortam_depo',
    baslik: 'Arka kapı',
    paragraflar: () => [
      'Halim\'in paltosunu sırtına geçirip arka kapıdan çıkarıyorsunuz. Bursa vapuru şafakta. Halim sana bir şey söylemek istiyor, söylemiyor. Karanlığa yürüyor.',
      'Şafakta hamallar Ferrante\'nin antreposunun arka kapısında bir adam buluyor. Paltosu sırtında, bavulu yanında. Sırtında, sol kürek kemiğinin altında ince bir yara.',
      'Vapur zamanında kalkıyor. Halim\'in bileti cebinde.',
      'Rıza Bey hiçbir şey söylemiyor. Cesedin başında diz çöküp gözlerini kapatıyor; dudakları kıpırdıyor. Babasının duası belki.',
    ],
    secenekler: [{ etiket: 'Devam', sonra: 'g4_kapanis' }],
  },
  g4_son_sakla: {
    ortam: 'ortam_han',
    baslik: 'Mahzen',
    paragraflar: () => [
      'Gece yarısı Halim\'i hanın avlusundan geçirip Ohannes\'in mahzenine indiriyorsunuz. Ohannes hiçbir şey sormuyor; bir döşek, bir testi su, bir tespih bırakıyor.',
      'Ermeni bir ustanın mahzeninde saklanan Türk bir komiser, diyor Ohannes acı acı gülerek. Bu şehir artık böyle.',
      'Sabah rıhtımda Halim\'in kalpağı bulunuyor, suyun kenarında. Delorme\'un adamları onu Haliç\'te arıyor. Bulamayacaklar.',
      'Rıza Bey mahzen kapağının yanında, bastonuna dayanmış, uzun süre duruyor. Bu kez insanı korudun, diyor. Kanunu sonra konuşuruz.',
    ],
    secenekler: [{ etiket: 'Devam', sonra: 'g4_kapanis' }],
  },
  g4_sabah_olu: {
    ortam: 'ortam_rihtim',
    baslik: 'Geç kalındı',
    paragraflar: () => [
      'Sabah rıhtımda bir kalabalık daha. Halim dün gece meyhaneden yalnız çıkmış; antreponun arka kapısında bulunmuş. Sırtında aynı yara.',
      'Rıza Bey cesedin başında, bastonuna dayanmış, kıpırdamadan duruyor. Konuşmaya hazırdı, diyor sonunda. Görmedin mi? Kimse onu dinlemeye gelmedi.',
    ],
    secenekler: [
      {
        etiket: 'Devam',
        yap: (d) => {
          d.bayrak.halimKarar = 'yok';
          d.bayrak.halimSonu = 'bicaklandi';
        },
        sonra: 'g4_kapanis',
      },
    ],
  },
  g4_kapanis: {
    ortam: 'ortam_han',
    baslik: 'Beşinci kişi',
    paragraflar: (d) =>
      [
        'Akşam Kalafatçı Hanı\'nın avlusunda toplanıyorsunuz: Cemil, Nermin, Süleyman, sen. Rıza Bey en son geliyor.',
        delilVar(d, 'halim_itirafi')
          ? 'Çarşamba gecesi, diyor Rıza. Antrepo, saat on. Delorme orada olacak. Halim\'in sözü bu; ' + (bayrak(d, 'halimSonu') === 'sakli' ? 'Halim de mahzende, bir gün mahkemede söyler.' : 'ölünün sözü.')
          : 'Elimizde bir ölü daha var, diyor Rıza. Bir de Ferrante\'nin antreposu. Delorme son sandıkları yükleyecek; ne zaman, bilmiyoruz.',
        'Rıza bastonunu iki elinin arasına alıyor. Kırk yıl polislik ettim. Halim\'i ben yetiştirdim, Delorme yedi. Kalanımı size veriyorum. Ama bir şartım var: döverek değil, delille.',
      ].filter(Boolean),
    secenekler: [
      {
        etiket: 'Şartın kabul, Rıza Bey.',
        yap: (d) => {
          d.bayrak.rizaEkipte = true;
          d.bayrak.rizaKabul = 'sart';
          d.rizaBag = (d.rizaBag || 0) + 1;
        },
        sonra: 'g4_son',
      },
      {
        etiket: 'Delorme\'a delil yetmez, Rıza Bey.',
        yap: (d) => {
          d.bayrak.rizaEkipte = true;
          d.bayrak.rizaKabul = 'itiraz';
        },
        sonra: 'g4_son',
      },
    ],
  },
  g4_son: {
    ortam: 'ortam_han',
    baslik: 'Çarşamba',
    paragraflar: (d) =>
      [
        bayrak(d, 'rizaKabul') === 'itiraz'
          ? 'Rıza sana uzun uzun bakıyor. Yetmezse, diyor, sen de onun gibi olursun. O zaman seni ben yakalarım. Söz.'
          : 'Rıza başını eğiyor. Sözünü tutan adamla çalışırım, diyor. Tutamayanı da yakalarım.',
        bayrak(d, 'gulceKamil') === 'soyle' ? 'Gülce avlunun kapısında, kollarını kavuşturmuş duruyor. İçeri girmiyor; gitmiyor da.' : '',
        'Beş kişisiniz artık. Bir hamal, bir doktor, bir gazeteci, bir kaptan ve bir emekli komiser. Kanatlı anahtarın karşısında küçük bir sofra.',
        'Dördüncü görevin sonu. Karaköy\'de dolaşmayı sürdürebilirsin. Beşinci görev, Antrepo, bir sonraki adımda: çarşamba gecesi, saat on.',
      ].filter(Boolean),
    secenekler: [{ etiket: 'Devam', yap: (d) => gorev4Bitir(d), sonra: null }],
    bitisSozu: 'Kalafatçı Hanı\'nın avlusu. Menüden Görev\'i ve Yerler\'i her zaman açabilirsin.',
  },
};

// --- Başlangıç ve bitiş ---
export function gorev4Baslat(d) {
  d.gorev = 4;
  d.gorevGun = d.gun;
  d.dakika = 9 * 60 + 5;
  d.gece = false;
  d.sonSaat = 9;
  d.sonVapur = d.dakika;
  d.mekan = 'han';
  d.oyuncu = { x: 37, y: 19, yon: Math.PI };
  d.yakin = {};
  d.oto = null;
  d.suphe = 0;
  d.baski = 0;
  d.kilik = null;
}

function gorev4Bitir(d) {
  d.bayrak.g4Bitti = true;
  d.gun = d.gorevGun + 1;
  d.dakika = 9 * 60;
  d.gece = false;
  d.sonSaat = 9;
  d.sonVapur = d.dakika;
  d.mekan = 'han';
  d.oyuncu = { x: 37, y: 19, yon: Math.PI };
  d.yakin = {};
  d.oto = null;
}

// Halim gece yarısına kadar konuşturulmazsa ertesi sabah ölü bulunur
export function gorev4Ilerle(d) {
  if (!g4Mi(d) || bayrak(d, 'g4Bitti') || d.sahne || bayrak(d, 'halimKarar')) return;
  const gd = gunDakika(d);
  if (d.gun > d.gorevGun && gd >= 6 * 60) d.sahne = 'g4_sabah_olu';
}

// Kişi düzeltmeleri: saklanan ya da ölen Halim kimseye görünmez
export function kisiDuzelt4(d, k) {
  if (!g4Mi(d)) return k;
  if (k.id === 'halim' && bayrak(d, 'halimKarar')) return null;
  return k;
}

// Rutinde olmayan kişiler: Rıza meyhaneye gelirse köşede oturur
export function ekKisiler4(d) {
  if (!g4Mi(d) || !bayrak(d, 'rizaGelir') || !ilkGun(d) || bayrak(d, 'g4Bitti')) return [];
  const gd = gunDakika(d);
  if (gd < 19 * 60 + 50 || gd >= 23 * 60) return [];
  return [{ id: 'riza', ad: 'Rıza Bey', mekan: 'meyhane', x: 58, y: 28, yuruyor: false, eylem: 'köşede, bir bardak suyla oturuyor', soz: 'Rıza Bey gözünü Halim\'den ayırmıyor: Ben buradayım. Sen konuş.' }];
}

export function g4Ipucu(d) {
  if (bayrak(d, 'g4Bitti')) return 'Dördüncü görev bitti. Rıza Bey ekipte. Beşinci görev, Antrepo, bir sonraki adımda.';
  if (bayrak(d, 'halimKarar')) return 'Halim\'in işi bitti. Hana dön.';
  const gd = gunDakika(d);
  const p = [];
  if (!bayrak(d, 'rizaTanisti4')) p.push('Rıza Bey Kalafatçı Hanı\'nın avlusunda seni bekliyor.');
  if (ilkGun(d) && gd < 10 * 60 + 30 && !delilVar(d, 'yasar_yarasi')) p.push('Yaşar\'ın cesedi saat on bire kadar rıhtımda, Leventis\'in eski yerinin batısında.');
  if (ilkGun(d) && gd < 20 * 60) p.push('Akşam sekizden sonra Halim, han ile yapıların arasındaki Rum meyhanesinde tek başına içecek. Elindeki her delil onun üstüne bir ağırlık; yeterince ağırlık olunca konuşur.');
  else if (ilkGun(d) && gd < 23 * 60) p.push('Halim meyhanede. Gece yarısından önce konuşmazsa sabahı görmeyecek.');
  return p.join(' ');
}
