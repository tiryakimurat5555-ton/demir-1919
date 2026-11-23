// Paket 9: ikili ve üçlü karakter dengeleri. Bağımlılıksız (veri.js dışında); yerlesim.js kullanır.
//   d.yer.uyum { 'a|b': -100..100 } (yakın çiftler +35, çatışmalı -35 başlar), d.yer.olay (bekleyen olay kimliği),
//   d.yer.olaylar [bitenler], d.yer.olayGun (günde en fazla bir büyük olay).
//   Tetik: iki karakter de kolonide ve Kademe 5+ (geç gelen karakter koruması: bireysel barlar bağımsız).
//   Üçüncü kişi (tanık) yoksa aynı Sosyal Ocak'tan başka bir yerleşimci devralır.
//   Seçenek: { e, c, p: { kimlik: puan }, uyum, kosul?(d), kosulMetni, bayrak, moral }.

export const SOSYAL_OCAKLAR = {
  atolye: { ad: 'Ocak ve Atölye', uyeler: ['veysel', 'kaelon', 'torvok', 'brom', 'halvar'] },
  sifa: { ad: 'Şifa ve Toprak', uyeler: ['sorya', 'lyris', 'siravel', 'nerissa'] },
  gok: { ad: 'Gök ve Keşif', uyeler: ['marcus', 'zarek', 'elara'] },
  kultur: { ad: 'Kültür ve Pazar', uyeler: ['defne', 'julian', 'mateo', 'tina'] },
};
export function ocagi(id) {
  return Object.keys(SOSYAL_OCAKLAR).find((o) => SOSYAL_OCAKLAR[o].uyeler.includes(id));
}

const yer = (d, id) => !!(d.yer && d.yer.binalar && d.yer.binalar.includes(id));
const bina = (d, id) => !!(d.koloni && d.koloni.binalar && d.koloni.binalar.includes(id));

export const OLAYLAR = {
  // --- Sekiz çatışma ve arabuluculuk çifti ---
  c_brom_tina: {
    tur: 'catisma', a: 'brom', b: 'tina', tanik: 'defne', mekan: 'atolye', b_: 'Ocak başında makine tartışması',
    m: [
      `Atölye sokağında bir gürültü: Brom elinde bir İngiliz anahtarı, Tina'nın döküm ısı sensörünü sökmek üzere. “Ocağın ısısını ben elimle bilirim! Bu kutu bana ne zaman çekiç vuracağımı söyleyemez!” Tina'nın hoparlöründen titrek bir ses: “Brom, sensör yalnızca ölçüyor. Kimseye bir şey söylemiyor.”`,
      `Defne çocukların elinden tutmuş, kapıda duruyor: “Kaptan, çocuklar korktu. Brom Tina'yı sökerse onlar da Tina'nın öleceğini sanıyor.” Üçü de sana bakıyor; atölyenin geleceği bu kararda.`,
    ],
    s: [
      { e: `Brom haklı: ağır çekiçte his gerekir.`, c: `Brom sensörü söküp rafa koyuyor. Tina sessizleşiyor; Defne çocukları uzaklaştırıyor. Atölye geleneksel zanaata döndü.`, p: { brom: 30, tina: -15, defne: -5 }, uyum: -10 },
      { e: `Tina'nın ölçümü hayat kurtarır; Brom alışmalı.`, c: `Brom anahtarı yere fırlatıp gidiyor. Tina çekingen bir teşekkür fısıldıyor. Atölye verimli ama gergin.`, p: { tina: 30, defne: 10, brom: -20 }, uyum: -10 },
      { e: `Orta yol: Brom'un el ölçüsünü Tina yalnız kaydetsin, komut vermesin.`, c: `Brom bir an duruyor: “Yalnız kayıt mı? Hm.” Tina: “Yalnız kayıt.” Defne gülümsüyor. Bir saat sonra Brom ilk kez Tina'nın grafiğine bakıyor. Ağır şasi üretimi daha ucuz ve hatasız.`, p: { brom: 20, tina: 20, defne: 15 }, uyum: 40, kosul: (d) => yer(d, 'okul') || true, bayrak: 'uyum_brom_tina' },
    ],
  },
  c_sorya_mateo: {
    tur: 'catisma', a: 'sorya', b: 'mateo', tanik: 'veysel', mekan: 'meydan', b_: 'Kıtlık korkusu ve kâr defteri',
    m: [
      `Meydanda sepetler dolusu hurma ve taze ekmek. Sorya kollarını açmış: “Herkese! Bu akşam kimse aç yatmayacak.” Mateo defterini sallıyor: “Kaptan Orin yarın iniyor! Bunun yarısıyla bir kalkan bobini alırız.”`,
      `Usta Veysel bastonunu taşa vuruyor, tok bir ses. Kimse konuşmuyor. “Evlat,” diyor sana, “bu koloninin neye değer verdiğini bugün sen söyleyeceksin.”`,
    ],
    s: [
      { e: `Önce kimse aç kalmasın: hepsi sofraya.`, c: `Sorya sepetleri dağıtıyor, Veysel başını sallıyor. Mateo defterini kapatıp sessizce gidiyor. Koloninin morali beş arttı.`, p: { sorya: 30, veysel: 15, mateo: -15 }, uyum: -10, moral: 5 },
      { e: `Koloniye kaynak lazım: Mateo satsın.`, c: `Mateo sevinçle sepetleri topluyor. Sorya'nın yüzü kararıyor; Veysel sırtını dönüyor.`, p: { mateo: 30, sorya: -15, veysel: -10 }, uyum: -10 },
      { e: `Orta yol: taze yemek sofraya, kurutulmuş ve turşu takasa.`, c: `Sorya bir an düşünüyor: “Kurutmayı ben bilirim.” Mateo gözlerini kırpıştırıyor: “Kurutulmuş hurma Orin'in en sevdiği.” Veysel gülüyor. Uzun ömürlü erzak ticareti açıldı.`, p: { sorya: 20, mateo: 20, veysel: 20 }, uyum: 40, kosul: (d) => yer(d, 'ashane'), kosulMetni: 'Aşhane gerekir.', bayrak: 'uyum_sorya_mateo' },
    ],
  },
  c_marcus_zarek: {
    tur: 'catisma', a: 'marcus', b: 'zarek', tanik: 'elara', mekan: 'gozlem', b_: 'Çizelge ve rüzgâr',
    m: [
      `Gözlem tepesinde iki ses birbirini bastırıyor. Marcus elinde nöbet çizelgesi: “Dün gece Zarek rotasından çıktı; iki saat haber alamadık!” Zarek kollarını açıyor: “Rüzgâr değişti! Eski rotada kaya kayması vardı; ben gitmeseydim sabah kimse bilmezdi.”`,
      `Elara kronometresine bakıyor, sonra ikisine: “İkiniz de haklısınız ve ikiniz de vaktimi yiyorsunuz.” Sana dönüyor: “Kaptan, karar?”`,
    ],
    s: [
      { e: `Çizelge kesin: herkes rotasında.`, c: `Marcus memnun bir selam veriyor. Zarek çantasını yere atıp tepeden iniyor. Karakol disiplini arttı.`, p: { marcus: 25, zarek: -20, elara: 5 }, uyum: -10 },
      { e: `Zarek serbest: keşif önce.`, c: `Zarek kahkahayla tepeden fırlıyor. Marcus çizelgeyi buruşturuyor. Keşif hızı arttı.`, p: { zarek: 25, marcus: -20, elara: 5 }, uyum: -10 },
      { e: `Orta yol: gece dış hatlar Marcus'ta, gündüz öncü iz Zarek'te.`, c: `Marcus ile Zarek birbirine bakıyor. Marcus: “Gece benim.” Zarek: “Gündüz benim.” Elara: “Ve ben ikisini de zamanlarım.” Çift katmanlı güvenlik kuruldu.`, p: { marcus: 20, zarek: 20, elara: 15 }, uyum: 40, bayrak: 'uyum_marcus_zarek' },
    ],
  },
  c_torvok_siravel: {
    tur: 'catisma', a: 'torvok', b: 'siravel', tanik: 'lyris', mekan: 'hamam', b_: 'Sıcak çekiç, soğuk su',
    m: [
      `Hamamın havuzu bulanık, yüzeyinde ince bir kurum tabakası. Sira-Vel suyun kenarında diz çökmüş, elini suya daldırmış; yüzü bembeyaz. “Ocağın cürufu dereye karışmış. Su hasta.”`,
      `Torvok kapıda, elleri kara: “Ocak durursa maden durur! Ben ne yapayım, cürufu yutayım mı?” Lyris bir şişe su numunesiyle geliyor: “Bu suyla kimse yıkanmamalı. Kaptan, bir karar.”`,
    ],
    s: [
      { e: `Ocak duramaz; madene ihtiyacımız var.`, c: `Torvok başını sallayıp gidiyor. Sira-Vel suyun kenarında sessizce kalıyor; Lyris hamamı geçici olarak kapatıyor.`, p: { torvok: 25, siravel: -20, lyris: -15 }, uyum: -10 },
      { e: `Şifa suyu kirlenemez; ocağı kapat.`, c: `Torvok homurdanarak ocağın ateşini söndürüyor. Sira-Vel minnetle başını eğiyor.`, p: { siravel: 25, lyris: 15, torvok: -20 }, uyum: -10 },
      { e: `Orta yol: ocağın sıcak atık suyunu kapalı boruyla hamam kazanına bağlayalım.`, c: `Torvok gözlerini kırpıştırıyor: “Benim atığım... onun sıcak suyu mu olacak?” Sira-Vel ilk kez Torvok'a gülümsüyor. Hamamın ısınması artık bedava.`, p: { torvok: 20, siravel: 25, lyris: 15 }, uyum: 45, kosul: (d) => (d.koloni.parcalar.kablo || 0) >= 1 || !!(d.yer && d.yer.katilan.includes('kaelon')), kosulMetni: 'Kaelon ya da boru malzemesi gerekir.', bayrak: 'uyum_torvok_siravel' },
    ],
  },
  c_kaelon_julian: {
    tur: 'catisma', a: 'kaelon', b: 'julian', tanik: 'veysel', mekan: 'atolye', b_: 'Çan ve vana',
    m: [
      `Atölyede bir vana tıslıyor; Kaelon duyamıyor, çünkü yan avluda Julian yeni çanlarını akort ediyor. Kaelon anahtarını tezgâha bırakıp dışarı fırlıyor: “Bir vana patlarsa o çanla mı haber vereceksin?”`,
      `Julian elindeki çanı indiriyor: “İşçiler bu tınılarla daha az yoruluyor Kaelon. Bak, Veysel bile söyledi.” Veysel rendesini bırakmadan: “Söyledim. Ama vanayı da duymak lazım.”`,
    ],
    s: [
      { e: `Atölye yanında müzik yok.`, c: `Julian çanlarını toplayıp gidiyor. Kaelon vanaya dönüyor. Teknik hatalar sıfırlandı.`, p: { kaelon: 25, julian: -15, veysel: 5 }, uyum: -10 },
      { e: `Müzik kalsın; moral önemli.`, c: `Julian sevinçle çalmaya devam ediyor. Kaelon dişlerini sıkıp vanaya eğiliyor.`, p: { julian: 25, kaelon: -15, veysel: 0 }, uyum: -10 },
      { e: `Orta yol: akort saatleri vardiya sonuna.`, c: `Kaelon ve Julian el sıkışıyor. Akşam vardiya biterken atölyeye yumuşak bir çan sesi yayılıyor; Kaelon'un omuzları gevşiyor. Atölyede yorgunluk azaldı.`, p: { kaelon: 20, julian: 20, veysel: 15 }, uyum: 40, bayrak: 'uyum_kaelon_julian' },
    ],
  },
  c_elara_veysel: {
    tur: 'catisma', a: 'elara', b: 'veysel', tanik: 'kaelon', mekan: 'atolye', b_: 'Hız ve kalite',
    m: [
      `Elara hangardan bir sipariş getirmiş: kamara rafları, araç iç kaplamaları; hepsi yarın. Veysel ağır ağır başını sallıyor: “Yarın olmaz. Ahşabın kurusun, sonra konuşuruz.”`,
      `Elara saatine vuruyor: “Kurusun mu? Benim zamanım kurumak için değil!” Kaelon ikisinin arasında, elinde bir vida: “Belki ikisinin de yapabileceği bir yol vardır?” İkisi de sana bakıyor.`,
    ],
    s: [
      { e: `Hız önce: Elara'nın takvimi.`, c: `Elara sevinçle hangara koşuyor. Veysel sessizce rendesine dönüyor.`, p: { elara: 25, veysel: -15, kaelon: 0 }, uyum: -10 },
      { e: `Kalite önce: Veysel'in usulü.`, c: `Veysel teşekkür eder gibi başını eğiyor. Elara kronometresine bakıp homurdanıyor.`, p: { veysel: 25, elara: -15, kaelon: 0 }, uyum: -10 },
      { e: `Orta yol: hızlı iskelet Elara'dan, ince işçilik Veysel'den.`, c: `Elara ve Veysel birlikte çalışıyor; biri hızla çatıyor, öbürü sabırla süslüyor. Sonunda Elara: “Bu... güzel olmuş.” Veysel: “Ve hızlı.” Dayanıklı, hızlı dekor ve araç kaplaması.`, p: { elara: 20, veysel: 20, kaelon: 10 }, uyum: 40, bayrak: 'uyum_elara_veysel' },
    ],
  },
  c_nerissa_zarek: {
    tur: 'catisma', a: 'nerissa', b: 'zarek', tanik: 'marcus', mekan: 'meydan', b_: 'Tarama mı, cesaret mi?',
    m: [
      `Zarek elinde bir yosun kökü, heyecanla: “Mantar ormanının ötesinde yeni bir mağara! Hemen gidelim, akşama kadar dönerim.” Nerissa önüne geçiyor: “Gaz ölçümü yapılmadan kimse o mağaraya girmez. Bir saat ver bana.”`,
      `Zarek'in sabrı tükeniyor: “Bir saatte mağara kapanabilir!” Marcus yanınıza geliyor, kollarını kavuşturmuş: “İkisini de kaybetmek istemem Kaptan. Söyle.”`,
    ],
    s: [
      { e: `Önce bilimsel tarama.`, c: `Nerissa cihazlarını hazırlıyor; Zarek bir taşa oturup bekliyor, yüzü asık. Güvenli veri.`, p: { nerissa: 25, zarek: -15, marcus: 10 }, uyum: -10 },
      { e: `Zarek gitsin; fırsatı kaçırmayalım.`, c: `Zarek rüzgâr gibi uzaklaşıyor. Nerissa defterine bir şey yazıyor, sessiz.`, p: { zarek: 25, nerissa: -15, marcus: -5 }, uyum: -10 },
      { e: `Orta yol: Zarek numune getirsin, Nerissa anında analiz etsin.`, c: `Zarek bir kavanozla mağaranın ağzına koşuyor; Nerissa dışarıda cihazını kuruyor. On dakikada sonuç: güvenli. İkisi birlikte giriyor. Tehlike erken uyarısı kuruldu.`, p: { nerissa: 20, zarek: 20, marcus: 15 }, uyum: 40, bayrak: 'uyum_nerissa_zarek' },
    ],
  },
  c_halvar_julian: {
    tur: 'catisma', a: 'halvar', b: 'julian', tanik: 'kaelon', mekan: 'taverna', b_: 'Patlama sesi ve çan',
    m: [
      `Festival provası: Julian büyük çanı ilk kez tam güçle çalıyor. Tavernanın köşesinde Halvar yerinden sıçrıyor, kupası yere düşüp kırılıyor. Elleri titriyor; gözleri bir an çok uzaklarda.`,
      `Julian korkuyla koşuyor: “Halvar? Ben... bilmiyordum.” Halvar nefes nefese: “Patlama gibi. Kurşun-4 gibi.” Kaelon ikisinin arasında, sessiz. Bütün taverna sana bakıyor.`,
    ],
    s: [
      { e: `Festivalde büyük çan çalınmasın.`, c: `Julian başını eğiyor; Halvar rahat bir nefes alıyor. Festival biraz daha sessiz olacak.`, p: { halvar: 25, julian: -15, kaelon: 5 }, uyum: -10 },
      { e: `Festival festivaldir; Halvar o gece uzak dursun.`, c: `Julian sevinçle provaya dönüyor. Halvar sessizce tavernadan çıkıyor.`, p: { julian: 25, halvar: -20, kaelon: -5 }, uyum: -10 },
      { e: `Orta yol: Julian düşük frekanslı, yumuşak tınılar bestelesin.`, c: `Julian bir hafta çalışıyor; yeni çanlar derin ve yumuşak, bir kalp atışı gibi. Halvar ilk dinleyişinde gözlerini kapatıyor: “Bu... huzur veriyor.” Halvar'ın huzur terapisi açıldı.`, p: { halvar: 20, julian: 25, kaelon: 10 }, uyum: 40, moral: 5, bayrak: 'uyum_halvar_julian' },
    ],
  },

  // --- Sekiz sinerji ve ortaklık çifti ---
  s_torvok_brom: {
    tur: 'sinerji', a: 'torvok', b: 'brom', mekan: 'atolye', b_: 'Kaelith ateşi, Filtra çekici',
    m: [
      `Dökümhanede iki dev aynı örsün başında. Torvok'un Kaelith çekici ağır ve geniş, Brom'un Filtra çekici dar ve keskin. İlk vuruşlar birbirine çarpıyor; sonra bir ritim buluyorlar: biri katlıyor, öbürü sertleştiriyor.`,
      `Gecenin sonunda örsün üstünde bir zırh plakası, iki damgalı. Torvok kahkahayla Brom'un sırtına vuruyor; Brom ilk kez gülüyor. “Hiçbir ocak tek başına bunu yapamazdı,” diyor. “İkimiz bile değil; ocaklarımız.”`,
    ],
    s: [{ e: `İki ustayı kutla.`, c: `T3 ve zırhlı araç parçaları artık daha dayanıklı.`, p: { torvok: 15, brom: 15 }, uyum: 25, bayrak: 'sin_torvok_brom' }],
  },
  s_lyris_nerissa: {
    tur: 'sinerji', a: 'lyris', b: 'nerissa', mekan: 'kapsul', b_: 'Malken ve abis iksiri',
    m: [
      `Revirin laboratuvarında Lyris'in Malken otları, Nerissa'nın abisal mineralleri yan yana. İki hekim sessizce çalışıyor; konuşmalarına gerek yok, elleri birbirini tamamlıyor.`,
      `Sabaha karşı bir şişe: mavi ve yeşil iki katman, yavaşça karışıyor. “Çift kaynaklı antikor,” diyor Nerissa. Lyris ekliyor: “Derin madenin zehirlerine karşı. İkimizin yemini de içinde.”`,
    ],
    s: [{ e: `Şişeyi birlikte kaldırın.`, c: `Derin maden zehir ve spor etkileri yarı yarıya azalacak.`, p: { lyris: 15, nerissa: 15 }, uyum: 25, bayrak: 'sin_lyris_nerissa' }],
  },
  s_veysel_kaelon: {
    tur: 'sinerji', a: 'veysel', b: 'kaelon', mekan: 'atolye', b_: 'Ahşap ve dişli',
    m: [
      `Atölyenin köşesinde Veysel ceviz bir kutu oyuyor, Kaelon minik dişliler kesiyor. İkisi de diğerinin işine bakmıyor; ama her biri, öbürünün boşluğunu bırakarak çalışıyor.`,
      `Kutu birleştirildiğinde kapağı açılıyor: içinde dönen küçük yıldızlar, bir melodi, kristal bir tını. Veysel gözlerini siliyor: “Torunum için yaptığımdan güzel.” Kaelon başını eğiyor: “Ahşap senin, dişli benim. Ama ses ikimizin.”`,
    ],
    s: [{ e: `Kutuyu kamaraya koy.`, c: `Kaptanın Kamarası için otomatik yıldız müzik kutusu üretildi.`, p: { veysel: 15, kaelon: 15 }, uyum: 25, bayrak: 'sin_veysel_kaelon' }],
  },
  s_sorya_veysel: {
    tur: 'sinerji', a: 'sorya', b: 'veysel', mekan: 'ashane', b_: 'İki dünyanın fırını',
    m: [
      `Aşhanenin taş fırını harlı. Veysel Dünya usulü ekşi mayayı getirmiş, Sorya vaha hurmasını. Hamur yoğrulurken ikisi de kendi annesinin şarkısını mırıldanıyor; melodiler bir yerde buluşuyor.`,
      `Fırından çıkan ekmek tatlı, ekşi ve sıcak. Sorya bir dilimi sana uzatıyor: “Bundan sonra her seferde çantanda bir tane olacak.” Veysel: “Uzak yolda ev kokusu.”`,
    ],
    s: [{ e: `Ekmeği böl, ikisiyle paylaş.`, c: `Seferlerde ek bir rasyon ve moral.`, p: { sorya: 15, veysel: 15 }, uyum: 25, moral: 5, bayrak: 'sin_sorya_veysel' }],
  },
  s_defne_tina: {
    tur: 'sinerji', a: 'defne', b: 'tina', mekan: 'okul', b_: 'Canlı yıldız dersliği',
    m: [
      `Okulda çocuklar halka olmuş; ortada Tina'nın terminali. Defne bir tarih anlatıyor, Tina arşivden o günün seslerini çalıyor: kapsülün inişi, ilk ekmeğin çıtırtısı, ilk çanın tınısı.`,
      `Bir çocuk soruyor: “Tina, sen de orada mıydın?” Tina bir an susuyor. “Hayır. Ama hepsini hatırlıyorum, çünkü siz bana anlattınız.” Defne gülümsüyor: “İşte tarih budur.”`,
    ],
    s: [{ e: `Derse sen de katıl.`, c: `Okulda sesli, etkileşimli tarih arşivi açıldı; çırak eğitimi hızlandı.`, p: { defne: 15, tina: 15 }, uyum: 25, bayrak: 'sin_defne_tina' }],
  },
  s_zarek_elara: {
    tur: 'sinerji', a: 'zarek', b: 'elara', mekan: 'gozlem', b_: 'Yıldızdan toprağa rota',
    m: [
      `Gözlem tepesinde iki harita üst üste: Zarek'in rüzgâr ve ses haritası, Elara'nın zaman ve yakıt hesabı. Zarek bir geçidi gösteriyor, Elara saniyeleri sayıyor.`,
      `Gece yarısı ortak bir rota çiziliyor: uzayda ve karada, rüzgârın taşıdığı, zamanın kısalttığı yollar. Elara kronometresini durdurup gülüyor: “Yüzde sekiz!” Zarek: “Rüzgâr da öyle dedi.”`,
    ],
    s: [{ e: `Rotayı ilk seferde dene.`, c: `Uzay ve kara araçlarında yakıt ve süre kalıcı olarak azaldı.`, p: { zarek: 15, elara: 15 }, uyum: 25, bayrak: 'sin_zarek_elara' }],
  },
  s_lyris_siravel: {
    tur: 'sinerji', a: 'lyris', b: 'siravel', mekan: 'hamam', b_: 'Buhar ve çay',
    m: [
      `Hamamın buharında Sira-Vel suyu okuyor, Lyris bir çaydanlık hazırlıyor. “Su bedeni gevşetir,” diyor Sira-Vel. “Çay da aklı,” diye ekliyor Lyris.`,
      `Yeni bir ritüel doğuyor: önce sıcak su, sonra mor çiçekli çay. Hamamdan çıkan herkes hafiflemiş, yaraları daha çabuk kapanıyor. Lyris'le Sira-Vel birbirine bakıp gülümsüyor; söze gerek yok.`,
    ],
    s: [{ e: `Ritüeli sen de dene.`, c: `Hamam ve çay birlikte yaralanmayı ve stresi aynı anda siliyor.`, p: { lyris: 15, siravel: 15 }, uyum: 25, bayrak: 'sin_lyris_siravel' }],
  },
  s_marcus_halvar: {
    tur: 'sinerji', a: 'marcus', b: 'halvar', mekan: 'meydan', b_: 'Sessiz kalkan hattı',
    m: [
      `Marcus'un karakol haritası ve Halvar'ın kalkan bobinleri bir masada. İki adam da az konuşur; ama birbirlerinin cümlelerini tamamlıyorlar. “Fener burada.” “Bobin şurada.”`,
      `Bir hafta sonra bütün karakollarda yeni, sessiz bir enerji kalkanı uğulduyor. Marcus selam veriyor, Halvar başını eğiyor. “Kimse karanlıkta kalmayacak,” diyor Marcus. Halvar: “Ve kimse kilitli kalmayacak.”`,
    ],
    s: [{ e: `İkisine teşekkür et.`, c: `Karakollarda ek enerji kalkanı; pusulara karşı daha güçlü.`, p: { marcus: 15, halvar: 15 }, uyum: 25, bayrak: 'sin_marcus_halvar' }],
  },
};
export const OLAY_SIRASI = Object.keys(OLAYLAR);

export const ciftAnahtari = (a, b) => [a, b].sort().join('|');
