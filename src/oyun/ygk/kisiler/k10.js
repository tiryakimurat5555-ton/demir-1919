// Paket 6A: Tonoflenya Batı (Filtra, Loran Vadisi, Kara Göl) ve Doğu (Zorah, Gri Yel Burcu, Çöl Kantonları), 10 kademeli
// bağlar ve yalnız büyüyle çözülen görev hattı. Var olan BL-oronte/BL-zeno zincirleri, karakter ağı konuşmaları ve
// bölgeler aynen kalır; bunlar yanlarına eklenir. Görevlerde dövülen silahlar yalnız görev kişisine teslim edilir,
// evrensel savaş düzenine girmez (Paket 6A bölüm 4).
// Belgede yalnız tema ve özel ödül var; kademe metinleri, hediye listeleri, sohbetler ve imza cümleleri bu temalardan
// yazıldı (KAPSAM'da [~]).
import { kisiEkle, kademe, KISI_EKLERI, puanEkle } from '../bag';
import { D, S, O } from '../yardim';
import * as ZN from '../../tonoflenya/zanaat';
import * as BY from '../../buyu/buyu';
import { gucEkle } from '../../tonoflenya/kisiler';
import { dengeMi } from '../siyaset';

Object.assign(ZN.ESYA, {
  vadi_ozu: { kat: 3, ad: 'Saf vadi özü', tarif: 'Sarah\'nın falez serasından; tuzlu topraktan süzülmüş şifalı bitki özü. Revirde ve hediye olarak değerli.' },
});

// Yerleşimdeki Brom ile Oronte'nin eski bağı (v5 Paket 1): Brom koloniye katıldıysa af yolu ona da yansır
function bromPuan(d, n) {
  try {
    const r = d.yer && d.yer.kisi && d.yer.kisi.brom;
    if (r) r.p = Math.min(1000, (r.p || 0) + n);
  } catch (e) { /* yerleşim yoksa sessiz */ }
}
const drahmirUsta = (d) => kademe(d, 'drahmir') >= 6;

kisiEkle('oronte', {
  ad: 'Oronte', unvan: 'Filtra Maden Sendikası önderi', nokta: 'k_oronte', guc: 'bati', bolgeKisisi: true, yerAdi: 'Filtra, Kızılkaya Filtrum', sinif: 'A',
  hiz: [[0, 10, 1]],
  hizMetni: 'Sınıf A, görev ağırlıklı: bağın dörtte üçü görevlerden gelir. Sohbet ve hediye yarı puan verir.',
  kimlik: [
    'Filtra madencilerinin seçilmiş önderi; göğüs kafesinin yarısı eski bir maden kazasından kalma pistonlu bir protez. Konuşurken içinde bir vana tıslar.',
    'Başkentin vergilerinden ve YGK arkanistlerinin tepeden bakışından nefret eder. Sendikanın onurunu her şeyin üstünde tutar.',
    'Yıllar önce Brom adında bir dökümcüyle yolları ayrıldı; o kırgınlık hâlâ sendika salonunda konuşulmaz.',
  ],
  kademeler: [
    'Sendika kapısı: seni Başkentin bir başka gözcüsü sanıyor.',
    'Ocak başında bir kadeh: madencilerin ağır şakalarına güler gibi yapıyor.',
    'Vergiler: Başkentin sendikadan neler aldığını kendi defterinden okutuyor.',
    'Onur meselesi: sendikanın eski tören silahının kaybını anlatıyor.',
    'Brom\'un adı: ilk kez eski dostunun adını ağzına alıyor.',
    'Sendika salonunda yer: seni madencilerin toplantısına çağırıyor.',
    'Kadim geçitler: Ağır Toprak Yarma gerektiren eski Filtra geçitlerinin haritasını açıyor.',
    'Pistonun sırrı: göğsündeki vananın hikâyesini, YGK hekimlerine neden gitmediğini anlatıyor.',
    'Ocakların şarkısı: madencilerin ölenler için söylediği şarkıyı seninle söylüyor.',
    'Brom\'la yüzleşme hazırlığı: kırgınlığı bitirmek için senden aracılık istiyor.',
    'Daimi ittifak: Filtra Sendikası Aethelis\'in daimi müttefiki; Brom ile Oronte ocak başında yan yana.',
  ],
  sosyal: [
    ['Brom', 'Eski dökümcü dostu; bir dökümün çatlaması yüzünden yolları ayrıldı.', 'FIL-02 af yolunu açar; Brom koloniye katıldıysa bağı da ilerler.'],
    ['Silahşör Zeno', 'Sınır ve kervan rekabeti; Zeno Filtra\'nın silahlanmasından şüphelenir.', 'FIL-02 ile ZOR-02 birbirini etkiler; ikisini de yapıp denge yolunu seçersen ateşkes.'],
    ['Cüretkâr Cüce', 'Sendikanın en iyi sondaj ustası; Oronte ona kardeşi gibi güvenir.', ''],
    ['Kaptan Barracuda', 'El altından parça değişimi yaptıkları söylenir.', ''],
  ],
  sever: ['demir_cevheri', 'komur', 'oksit_celik', 'dunya_cayi'], sevmez: ['urun_kristal_cicek', 'huzur_tutsusu'],
  hediyeNot: 'Ter ve demir kokan her şeyi sever; Başkent süsü saydığı kristal ve tütsüyü geri çevirir.',
  severSoz: '"İşte madenci hediyesi! Bunu ocakta herkese gösteririm."', sevmezSoz: '"Bunu bana Konsey mi yolladı? Ocakta işe yaramaz."',
  gorevler: [
    { id: 'FIL-01', ad: 'Çöken Kızılkaya tüneli', tur: 'hiyerarsi', k: 0, puan: 0,
      durum: 'Sendikanın ana maden galerisini normal matkapların kıramadığı kadim bir kristal damarı kapatmış.',
      hikaye: ['Oronte\'nin pistonu öfkeyle tıslıyor: "Üç matkap ucu kırıldı, iki adamım yaralı. Konsey büyücüleri bize yardım etmez. Sen o asayla madde yarıyorsan, göster."', 'Galerinin ağzında kristal damar kızıl bir uğultuyla titriyor; arkasında sıkışmış madencilerin çekiç sesleri.'],
      cozum: 'Ağır Toprak Yarma ile damarı yar (ya da Kıvılcım ve Buzul ile şok çatlat); Tele-Kaldırma ile düşen blokları temizle.',
      bulmaca: { dugumler: [
        D('damar', 'Kadim kristal damarı', -0.3, 'kristal', 'Damar kızıl bir uğultuyla titriyor; matkap izleri bile yok.', [['toprak_yarma'], ['kivilcim', 'buzul']], 'Damar ortasından yarıldı.'),
        D('blok', 'Düşen bloklar', 0.4, 'tas', 'Tonlarca taş galerinin ağzını tıkıyor.', [['tele_kaldirma'], ['agirlik_sifir']], 'Bloklar havaya kalktı, kenara dizildi.', { on: ['damar'] }),
      ] },
      secimler: [S('Madencileri çıkar, galeriyi sendikaya teslim et', { oronte: 40, cuce: 15, g_bati: 10 }, 'Madenciler tozlu yüzleriyle dışarı çıkıyor. Oronte elini uzatıyor: "Filtra alt maden kapısı artık sana açık."', { bayrak: ['filtraAltMaden'], odul: { tas: { kizil: 1 } } })] },
    { id: 'FIL-02', ad: 'Sendikanın onur silahı', tur: 'zincir', k: 3, once: ['FIL-01'], puan: 0, bolge: 'bati',
      durum: 'Oronte, loncanın eski onurunu göstermek için büyü ocağında dövülmüş büyüsüz saf çelik bir tören çekici ister.',
      hikaye: [
        'Sendika salonunun duvarında boş bir çivi var. Oronte oraya bakarak konuşuyor: "Babamın babası o çekiçle Filtra\'nın ilk ocağını yaktı. Konsey vergi diye aldı, eritti. Bir yenisini istiyorum; büyüsüz, saf çelik. Ama büyü ocağında dövülmüş olsun ki Konsey ne kaybettiğini görsün."',
        'Çekiç sana değil Oronte\'ye teslim edilecek; kendin kuşanmazsın.',
        (d) => (drahmirUsta(d) ? 'Başçavuş Drahmir telsizden homurdanıyor: "Ocağı ben tutarım evlat. Çeliğe su verirken acele etme."' : ''),
      ],
      cozum: 'Kıvılcım Dalgası ile ocağı ısıt, Metal Şekillendirme ile kalıba dök, Buzul Mühür ile şok soğut.',
      bulmaca: { dugumler: [
        D('ocak', 'Büyü ocağı', -0.5, 'lav', 'Ocak soğuk; çelik kütlesi kararmış.', [['kivilcim']], 'Ocak kızıl kor gibi parlıyor.'),
        D('kalip', 'Tören çekicinin kalıbı', 0, 'metal', 'Kızgın çelik kalıba akmayı bekliyor.', [['metal']], 'Çelik kalıbın her oyuğuna oturdu.', { on: ['ocak'] }),
        D('su', 'Su verme teknesi', 0.5, 'su', 'Çekiç hâlâ kızgın; yavaş soğursa yumuşar.', [['buzul']], 'Tısss: çelik bir anda sertleşti.', { on: ['kalip'] }),
      ] },
      secimSoru: 'Çekici nasıl teslim edeceksin?',
      secimler: [
        S('Çekici Oronte\'ye teslim et', { oronte: 40, g_bati: 15, g_dogu: -5 }, (d) => 'Oronte çekici duvardaki çiviye asıyor; salonda bir alkış kopuyor. Brom için bir af yolu açıldı. Ama Doğu\'da Silahşör Zeno bunu Filtra\'nın silahlanması sayacak.' + (drahmirUsta(d) ? ' Drahmir\'in ustalığıyla çekiç kusursuz; Oronte ikinci kez başını eğiyor.' : ''), { bayrak: ['filtraSilah', 'bromAfYolu'], yap: (d) => { bromPuan(d, 40); if (drahmirUsta(d)) puanEkle(d, 'oronte', 10); } }),
        S('Denge Yolu: çekiçle birlikte Zorah\'a ateşkes önerisi götür', { oronte: 25, zeno: 25, g_bati: 10, g_dogu: 10 }, 'Oronte uzun uzun düşünüyor: "Zeno ile aynı masaya oturmak... Peki. Çekiç bir silah değil, bir onur nişanı olsun." İki lider ateşkes imzalıyor.', { kosul: (d) => !!d.bayrak.zorahSilah && (dengeMi(d) || (kademe(d, 'oronte') >= 5 && kademe(d, 'zeno') >= 5)), bayrak: ['filtraSilah', 'bromAfYolu', 'filtraZorahAteskes'], yap: (d) => bromPuan(d, 40) }),
      ] },
    { id: 'FIL-06', ad: 'Kırık pistonun kalıbı', tur: 'bag', k: 6, once: ['FIL-02'], puan: 25,
      durum: 'Oronte\'nin göğüs kafesindeki eski vana arızalandı; YGK hekimlerine gitmeyi gururuna yediremiyor.',
      hikaye: [
        'Sendika salonu boş. Oronte bir sandalyeye çökmüş, göğsündeki vana düzensiz tıslıyor; nefesi kesik.',
        '"O kazada üç arkadaşımı kaybettim," diyor. "Başkent hekimleri beni iyileştirdi ama faturasını sendikaya kestiler; on yıl ödedik. O gün yemin ettim: bir daha Konsey\'in kapısına gitmem."',
        '"Brom da oradaydı. Dökümü o yapmıştı; çatlak çıktı. Onu suçladım. Belki de haksızdım." Sesi ilk kez kırılıyor.',
      ],
      cozum: 'Metal Şekillendirme ile hassas vana kalıbını dök.',
      bulmaca: { dugumler: [D('vana', 'Göğüs kafesindeki vana', 0, 'metal', 'Vana düzensiz tıslıyor; contası çatlamış.', [['metal'], ['metal', 'devre']], 'Yeni vana yerine oturdu; nefesi düzeldi.')] },
      secimSoru: 'Oronte sana bakıyor. Ne diyeceksin?',
      secimler: [
        S('"Brom\'a da bir şans ver. O çatlak ikinizi de yaraladı."', { oronte: 35 }, 'Oronte uzun bir sessizlikten sonra başını sallıyor: "Belki... ocak başında konuşuruz."', { bayrak: ['oronteBromYumusadi'], yap: (d) => bromPuan(d, 30) }),
        S('"Gururun seni öldürecekti. Bir dahaki sefer bana haber ver."', { oronte: 25 }, '"Haklısın," diye homurdanıyor. "Ama bunu kimseye söyleme."'),
      ] },
  ],
  sohbetler: [
    { k: 2, ad: 'Vergi defteri', soz: 'Oronte: "Bu yıl Konsey ocaklardan yüzde kırk aldı. Yüzde kırk! Sen olsan ne yapardın?"',
      secenekler: [
        O('"Başkentle açık açık pazarlık ederdim."', { erken: 15, gec: 25, esik: 5 }, '"Açık pazarlık... Konsey açık bir şey bilmez ama deneriz."'),
        O('"Ocakları kapatıp grev yapardım."', 10, 'Gülüyor: "Grevi de denedik; aç kaldık."'),
        O('"Vergiler düzen içindir, ödenmeli."', -10, 'Pistonu öfkeyle tıslıyor.'),
      ] },
    { k: 5, ad: 'Ölenlerin şarkısı', soz: 'Oronte: "Madencilerin bir şarkısı var; ocakta ölenler için söylenir. Hiç duydun mu?"',
      secenekler: [
        O('"Söyle, dinliyorum."', 30, 'Kalın, kırık bir sesle mırıldanıyor; salon susuyor.'),
        O('"Ölümden konuşmayalım, iş konuşalım."', -5, '"Sen de Konsey gibisin," diye kısa kesiyor.'),
      ] },
  ],
  kademeEtki: (d, k) => {
    if (k === 6) d.bayrak.filtraGecitleri = true;
    if (k === 10) { d.bayrak.filtraIttifak = true; gucEkle(d, 'bati', 15); bromPuan(d, 60); }
  },
  imza: { selam: 'Sendika kapısı açık; çamurunu silmeden gir.', tesekkur: 'Filtra bunu unutmaz.', kizgin: 'Konsey gibi konuşma bana!' },
  ortam: 'Ağır pres darbeleri, uzak maden vagonlarının gıcırtısı ve göğüs pistonunun ritmik tıslaması.',
});

kisiEkle('cuce', {
  ad: 'Cüretkâr Cüce', unvan: 'Filtra madenlerinin sondaj ustası', nokta: 'k_curetkar_cuce', guc: 'bati', bolgeKisisi: true, yerAdi: 'Filtra derin galerileri', sinif: 'A',
  hiz: [[0, 10, 1.1]],
  hizMetni: 'Sınıf A, görevin yüzde sekseni: kazdıkça ve taşıdıkça bağ dolar; laf kalabalığını sevmez.',
  kimlik: [
    'Boyu bir asa kadar, sesi bir sondaj kulesi kadar gür. Yeraltında doğduğuna yemin eder.',
    'Dev kaya tünellerinin her çatlağını kulağıyla dinleyerek bulur; kaskına tıklatarak konuşur.',
  ],
  kademeler: [
    'Kaskına iki tık: seni tanımıyor.',
    'Ortak çay: madenci çayını paylaşıyor.',
    'Kulak dersi: kayanın sesini nasıl dinlediğini gösteriyor.',
    'Kızıl damar söylentisi: derindeki kızıl taş damarlarından bahsediyor.',
    'İlk inişin: seni ikinci galeriye indiriyor.',
    'Kızıl taş damarları: yerini yalnız sana söylüyor.',
    'Tünel gömleği: eski madenci gömleğini sana hediye ediyor.',
    'Babasının matkabı: kayıp matkabın hikâyesi.',
    'Ortak kazı: aynı tünelde omuz omuza.',
    'Derin dinleme: en alt galerideki uğultunun sırrı.',
    'Maden heykeli: büyük maden muhafızının kilidini sana açıyor.',
  ],
  sosyal: [['Oronte', 'Önderine kardeş gibi bağlı.', 'FIL-01 ikisinin de güvenini kazandırır.'], ['Torvok', 'Kolonideki cüce ustasıyla aynı kanı taşır; birbirlerinin matkaplarını kıskanırlar.', '']],
  sever: ['demir_cevheri', 'komur', 'fosil', 'ekmek'], sevmez: ['urun_kristal_cicek', 'bal'],
  hediyeNot: 'Yeraltından gelen her şeyi sever; yapışkan ve süslü şeyleri sevmez.',
  severSoz: '"Hah! Bu taşın kokusunu bilirim."', sevmezSoz: '"Bunu galeride ne yapayım, yapıştırıcı mı?"',
  gorevler: [
    { id: 'FIL-03', ad: 'Cüretkâr Cüce\'nin taş devleri', tur: 'bag', k: 2, puan: 30,
      durum: 'Derin galerideki dev pres kapısı sıkışmış; tek kişinin gücü yetmez.',
      hikaye: ['Cüce kaskını kapıya dayayıp dinliyor: "İki kol var; ikisi aynı anda çekilmezse kapı kilitlenir. Ben bir kolu çekerim ama öbür kola boyum yetmez, aklın yetiyorsa bir yol bul."', 'Köşede tozlu bir taş muhafız heykeli; göğsünde üç boş taş yuvası.'],
      cozum: 'Yankı İkizi ile iki kolu aynı anda çek; ya da iki kızıl ve bir sarı taş takıp taş muhafız heykelini canlandır.',
      bulmaca: { dugumler: [D('kapi', 'Dev pres kapısı', 0, 'tas', 'İki uzak kol; yanda tozlu bir muhafız heykeli.', [['yanki_ikizi'], ['heykel']], 'Kapı gürleyerek açıldı.', { tas: { kizil: 2, sari: 1 } })] },
      secimler: [S('Cüceyle birlikte galeriye in', { cuce: 20 }, 'Cüce galeride buldukları ilk kızıl parçayı sana veriyor.', { odul: { esya: { demir_cevheri: 3 } } })] },
  ],
  sohbetler: [
    { k: 1, ad: 'Kayanın sesi', soz: 'Cüce kaskını tıklatıyor: "Duydun mu? Kaya konuşur. Bu duvar diyor ki arkasında boşluk var."',
      secenekler: [O('"Bana da dinlemeyi öğret."', 15, '"Kulak taşa, gönül kazmaya!"'), O('"Ben radar kullanırım."', 0, '"Radar mı? Kaya radara yalan söyler."')] },
  ],
  kademeEtki: (d, k) => {
    if (k === 5) BY.tasEkle(d, 'kizil', 1);
    if (k === 10) { BY.tasEkle(d, 'kizil', 2); d.bayrak.cuceMuhafiz = true; }
  },
  imza: { selam: 'Kask tık tık; hoş geldin yer üstü!', tesekkur: 'Kaya senden razı!', kizgin: 'Galerimi karıştırma!' },
  ortam: 'Uzak bir sondaj matkabının vınlaması, kaska vurulan kısa tıklar ve damlayan su.',
});

kisiEkle('sarah', {
  ad: 'Sarah', unvan: 'Loran Vadisi botanikçisi', nokta: 'k_sarah', guc: 'bati', bolgeKisisi: true, yerAdi: 'Loran Vadisi', sinif: 'B',
  hiz: [[0, 10, 1]],
  hizMetni: 'Sınıf B, yarı sohbet yarı görev.',
  kimlik: [
    'Dalga falezlerinin kovuklarında sera kuran, tuzlu toprağın şifasını arayan sakin bir botanikçi.',
    'Ellerinde hep toprak; konuşurken bitkilere de dönüp bir şey söyler.',
  ],
  kademeler: [
    'Falez kovuğu: seni bitkilerini ezecek bir gezgin sanıyor.',
    'Tohum takası: sana bir avuç vadi tohumu gösteriyor.',
    'Tuzlu toprak: tuzun bitkileri nasıl öldürdüğünü anlatıyor.',
    'Dalga ritmi: falezlerdeki bitkilerin dalgaya göre açtığını söylüyor.',
    'Kara Göl korkusu: gölün suyunun vadiye sızmasından korktuğunu itiraf ediyor.',
    'Şifa defteri: eski Loran şifa tariflerini paylaşıyor.',
    'Yeşil rezonans: yeşil taşın ve nadir vadi tohumunun yerini sana söylüyor.',
    'Axira ile ortak reçete: gemindeki kseno-biyologla yazışıyor.',
    'Annesinin bahçesi: neden falezlere kaçtığını anlatıyor.',
    'Toprağın hafızası: Kara Göl\'ün arındırılabileceğine inanıyor.',
    'Kara Göl sırrı: gölü arındırmanın eski sırrını sana veriyor.',
  ],
  sosyal: [['Dr. Axira Nerys', 'Biyo-reçeteler üzerine yazışırlar.', 'SUB-03 ikisini birleştirir.'], ['Trellis-7', 'Akademinin sera robotu; Sarah onu çocuk gibi sever.', '']],
  sever: ['urun_isik_otu', 'urun_fosforlu_liken', 'sakin_cay', 'bal'], sevmez: ['komur', 'demir_cevheri'],
  hediyeNot: 'Yaşayan ve iyileştiren her şeyi sever; toprağı kirleten madenleri istemez.',
  severSoz: '"Ah, bunu serada kök saldırırım!"', sevmezSoz: '"Bu toz toprağı öldürür, lütfen geri al."',
  gorevler: [
    { id: 'FIL-04', ad: 'Falezdeki susuz sera', tur: 'bag', k: 1, puan: 0,
      durum: 'Sarah\'nın falez kovuğundaki nadir bitkileri aşırı tuz ve kuraklık yüzünden soluyor.',
      hikaye: ['Sarah kuru yaprakları avucunda ufalıyor: "Kaynak suyu yukarıda, falezin öbür yanında. Sera aşağıda. Merdivenim çürüdü, kovaları taşıyamıyorum."'],
      cozum: 'Sıvı Yönlendirme ile temiz kaynak suyunu seraya çevir; Canlı Kök ve Sarmaşık ile falez merdivenini kur.',
      bulmaca: { dugumler: [
        D('su', 'Falezin öbür yanındaki kaynak', -0.4, 'su', 'Temiz su yanlış yöne, denize akıyor.', [['sivi']], 'Su kıvrılıp seraya aktı.'),
        D('merdiven', 'Çürümüş falez merdiveni', 0.4, 'bitki', 'Basamaklar kırık; aşağısı uçurum.', [['sarmasik'], ['madde_koprusu']], 'Kökler örülüp sağlam bir merdiven oldu.', { on: ['su'] }),
      ] },
      secimler: [S('Serayı birlikte yeniden ek', { sarah: 45, g_bati: 5 }, 'Sarah\'nın gözleri doluyor: "Bunlar yüz yıldır bu falezde yaşıyordu."', { odul: { tas: { yesil: 1 }, esya: { vadi_ozu: 2 } } })] },
    { id: 'FIL-05', ad: 'Kara Göl\'ün zift sularından geçiş', tur: 'hiyerarsi', k: 4, once: ['FIL-04'], puan: 30,
      durum: 'Birinci Çağ kalıntısının ortasındaki sunağa tekne giremez; sular zift ve fısıltı dolu.',
      hikaye: ['Sarah gölü işaret ediyor: "O sunakta Birinci Çağ\'ın arındırma yazıtı var. Ona ulaşabilirsek vadimizi gölden koruyabiliriz. Ama suya değen tekne batıyor."', 'Gölden yükselen fısıltılar insanın aklını bulandırıyor.'],
      cozum: 'Buzul Mühür ile suyu buz köprüsüne çevir ya da havayı Ayaz\'a çekip gölü dondur; sunaktaki paraziti Zihin Arındırma ile sustur.',
      bulmaca: { hava: 0, dugumler: [
        D('gol', 'Zift gibi sular', -0.3, 'su', 'Koyu, ağır sular; tekne girerse batar.', [['buzul'], ['hava_ayaz']], 'Göl dondu; buzun üstünden yürünebiliyor.'),
        D('sunak', 'Fısıldayan sunak', 0.4, 'fisilti', 'Fısıltılar zihnini kurcalıyor.', [['zihin_arindirma']], 'Fısıltılar sustu; yazıt okunuyor.', { on: ['gol'], tehlike: { hava_firtina: { ceza: 10, soz: 'Fırtına buzu çatlatıyor; geri çekildin.' } } }),
      ] },
      secimler: [S('Yazıtı Sarah için kopyala', { sarah: 30, g_ygk: 5 }, 'Sarah yazıtı satır satır defterine geçiriyor. "Bu bir başlangıç," diyor.', { bayrak: ['karaGolSunak'] })] },
  ],
  sohbetler: [
    { k: 1, ad: 'Dalga ve kök', soz: 'Sarah: "Bu falez otları yalnız dalga yükselince açar. Sence bitkiler denizi duyar mı?"',
      secenekler: [O('"Duyuyorlardır; ben de duyuyorum."', 20, 'Gülümsüyor.'), O('"Bitki bitkidir."', -5, 'Omuz silkip yapraklarına dönüyor.')] },
    { k: 5, ad: 'Annesinin bahçesi', soz: 'Sarah: "Annemin Magentor\'da bir bahçesi vardı. Konsey yol açmak için yıktırdı. O gün buraya geldim."',
      secenekler: [O('"Burası da onun bahçesinin devamı."', 35, 'Sessizce başını sallıyor.'), O('"Yeni bir bahçe kurmalısın."', 20, '"Kuruyorum işte; burada."')] },
  ],
  kademeEtki: (d, k) => {
    if (k === 6) { BY.tasEkle(d, 'yesil', 1); ZN.ekle(d, 'urun_isik_otu', 2); }
    if (k === 10) d.bayrak.karaGolSirri = true;
  },
  imza: { selam: 'Ayaklarına dikkat; filizler yeni uyanıyor.', tesekkur: 'Toprak sana teşekkür ediyor.', kizgin: 'Köklerimi ezdin!' },
  ortam: 'Falezlere vuran dalgalar, sera camına damlayan su ve rüzgârda hışırdayan tuzlu otlar.',
});

kisiEkle('zeno', {
  ad: 'Silahşör Zeno', unvan: 'Zorah kervan yolu muhafızı', nokta: 'k_zeno', guc: 'dogu', bolgeKisisi: true, yerAdi: 'Gri Yel Burcu', sinif: 'B',
  hiz: [[0, 10, 1]],
  hizMetni: 'Sınıf B: yüzde elli beş sohbet, yüzde kırk beş görev.',
  kimlik: [
    'Çöl kervanlarının en eski muhafızı; iki tabancası ve tek bir kural: kervan kan dökmeden geçer.',
    'Eski yoldaşlarının çoğunu kum fırtınalarında ve sınır çatışmalarında kaybetti; özgürlüğü kervan yolunda arar.',
  ],
  kademeler: [
    'Kervan ateşi: sana sırtını dönmüyor ama yüzünü de göstermiyor.',
    'İlk nöbet: kervanın arkasında yürümene izin veriyor.',
    'Kum okuma: fırtınanın gelişini kumdan okumayı öğretiyor.',
    'Eski yoldaşlar: ateşte iki boş fincan bırakıyor; neden olduğunu söylemiyor.',
    'Sınır kuralları: Filtra ve Başkent hakkında açık konuşuyor.',
    'Sessiz geçiş: kan dökmeden geçmenin değerini anlatıyor.',
    'Gizli rotalar: Kervan Ağırlık Sıfırlama ile geçilen gizli kervan yollarını gösteriyor.',
    'Boş fincanlar: iki yoldaşının adını söylüyor.',
    'Özgürlük: neden hiçbir krallığa bağlanmadığını anlatıyor.',
    'Son sır: gece verandasında en eski yarasını açıyor.',
    'Çölün anahtarı: çölün gizli geçit anahtarını sana emanet ediyor.',
  ],
  sosyal: [['Oronte', 'Filtra\'nın silahlanmasından şüphelenir.', 'FIL-02 ve ZOR-02 birbirini etkiler.'], ['Şeyh Kasım', 'Çöl loncasının reisiyle eski dost; su paylaşımında birbirine söz verirler.', 'ZOR-05 ikisini birlikte çağırır.'], ['Zhaor Vel-Amin', 'Yıldızla yol bulmayı Zhaor\'dan öğrendi.', '']],
  sever: ['urun_vaha_hurmasi', 'dunya_cayi', 'kavrulmus_kahve', 'deniz_tuzu'], sevmez: ['huzur_tutsusu', 'urun_kristal_cicek'],
  hediyeNot: 'Yolda işe yarayan sade şeyleri sever; tütsü ve çiçeği kervanda yük sayar.',
  severSoz: '"Yol azığı! İşte bunu anlarım."', sevmezSoz: '"Kervanda bunu kim taşıyacak?"',
  gorevler: [
    { id: 'ZOR-01', ad: 'Kayan kumların altındaki kervan', tur: 'hiyerarsi', k: 0, puan: 0,
      durum: 'Bir ikmal kervanı kayan kum çukuruna saplanmış; araçlar yaklaşamıyor.',
      hikaye: ['Zeno şapkasını eğiyor: "Altı araba, on iki yük hayvanı. Kum her dakika biraz daha yutuyor. Halat atarsak biz de gideriz."'],
      cozum: 'Kıvılcım Dalgası ya da Yıldırım ile kumu cam köprüye çevir, ya da yağmur veya buzla batak kumu sertleştir; Geçici Madde Köprüsü ile kervanı çıkar.',
      bulmaca: { hava: 0, dugumler: [
        D('kum', 'Kayan kum çukuru', -0.3, 'toz', 'Kum ağır ağır dönüyor; arabalar yarı gömülü.', [['kivilcim'], ['yildirim_rez'], ['hava_yagmur'], ['buzul']], 'Kum sertleşip camlaştı.'),
        D('kervan', 'Saplanmış kervan', 0.4, 'tas', 'Arabalar sert zemine çekilmeyi bekliyor.', [['madde_koprusu'], ['agirlik_sifir']], 'Kervan tek tek köprüden geçti.', { on: ['kum'] }),
      ] },
      secimler: [S('Kervanı yoluna gönder', { zeno: 40, g_dogu: 10 }, 'Zeno ilk kez şapkasını çıkarıyor: "Kervan Ağırlık Sıfırlama\'yı öğrenmek istersen, yol senin."', { odul: { ogret: ['agirlik_sifir'] }, bayrak: ['zenoKervanYolu'] })] },
    { id: 'ZOR-02', ad: 'Doğu sınırının çift tüfeği', tur: 'zincir', k: 3, once: ['ZOR-01'], puan: 0, bolge: 'dogu',
      kosul: (d) => !d.bayrak.filtraSilah || !!d.bayrak.zenoIkna, kosulMetni: 'Filtra\'ya dövdüğün silahı önce Zeno\'ya açıklaman gerek (Zeno\'nun yanında)',
      durum: 'Zeno, kervan muhafızları için büyü ocağında dövülmüş büyüsüz bir çöl koruma tüfeği ister.',
      hikaye: [
        'Zeno tabancasını temizliyor: "Kanunsuzlar sınırı zorluyor. Muhafızlarımın elinde paslı tüfekler var. Bana saf çöl demirinden, büyüsüz, sağlam bir tüfek döv; kervanı korusun, adam öldürmesin diye nişangâhı düşük."',
        (d) => (d.bayrak.filtraSilah ? 'Ama gözlerini kısıyor: "Filtra\'ya da bir şey dövdün, duydum. Sözüne güveniyorum; yine de dikkat et."' : ''),
      ],
      cozum: 'Ağır Toprak Yarma ile saf çöl demirini çıkar; Metal Şekillendirme ve Kıvılcım ile döv.',
      bulmaca: { dugumler: [
        D('demir', 'Saf çöl demiri damarı', -0.4, 'tas', 'Kumun altında koyu, ağır bir damar.', [['toprak_yarma']], 'Demir kütlesi kumdan çıktı.'),
        D('dovum', 'Tüfeğin namlusu', 0.4, 'metal', 'Demir kızgın ama biçimsiz.', [['metal', 'kivilcim']], 'Namlu dümdüz, soğuk ve sağlam.', { on: ['demir'] }),
      ] },
      secimSoru: 'Tüfeği nasıl teslim edeceksin?',
      secimler: [
        S('Tüfeği Zeno\'ya teslim et', { zeno: 35, g_dogu: 15, oronte: -10 }, (d) => 'Zeno tüfeği omzuna alıyor. Zorah itibarın yükseldi; ama Oronte Doğu\'nun güçlenmesinden rahatsız olacak.' + (drahmirUsta(d) ? ' Drahmir\'in ince ayarıyla tüfek kusursuz.' : ''), { bayrak: ['zorahSilah'], yap: (d) => { if (drahmirUsta(d)) puanEkle(d, 'zeno', 10); } }),
        S('Denge Yolu: Oronte ile Zeno\'yu aynı masaya oturt', { zeno: 25, oronte: 25, g_bati: 10, g_dogu: 10 }, 'Gri Yel Burcu\'nda, kervan ateşinin başında iki lider el sıkışıyor: Filtra ile Zorah ateşkes imzaladı.', { kosul: (d) => !!d.bayrak.filtraSilah && (dengeMi(d) || (kademe(d, 'oronte') >= 5 && kademe(d, 'zeno') >= 5)), bayrak: ['zorahSilah', 'filtraZorahAteskes'] }),
      ] },
    { id: 'ZOR-03', ad: 'Kum fırtınasında sessiz geçiş', tur: 'bag', k: 4, once: ['ZOR-01'], puan: 20,
      durum: 'Kanunsuz gözcüler kanyon ağzını tutmuş; Zeno kan dökmeden kervanı geçirmek istiyor.',
      hikaye: ['Zeno: "Altı gözcü, iki ateş. Ateş edersem geçeriz ama biri ölür. Ben ölüm istemiyorum."'],
      cozum: 'Hava Kontrolü ile yoğun sis indir ya da Buzul ve Kıvılcım ile buhar perdesi oluştur.',
      bulmaca: { hava: 0, dugumler: [D('kanyon', 'Kanyon ağzındaki gözcüler', 0, 'ruzgar', 'Gözcülerin ateşi kanyonu aydınlatıyor.', [['hava_sis'], ['buzul', 'kivilcim']], 'Sisin içinde kervan sessizce geçti.')] },
      secimSoru: 'Gece ateş başında Zeno eski dostlarını anlatıyor. Ne yaparsın?',
      secimler: [
        S('Sessizce dinle', { zeno: 30 }, 'Zeno iki boş fincanı doldurup ateşin kenarına koyuyor: "Rasa ve Teomen. Bu fırtınada kayboldular. Kervan hep onlar için yürür."'),
        S('Onlar için bir kadeh kaldır', { zeno: 25 }, 'Zeno şapkasını göğsüne bastırıyor; bir süre kimse konuşmuyor.'),
      ] },
    { id: 'ZOR-06', ad: 'Yıldız ışığıyla kâğıt masası', tur: 'bag', k: 7, once: ['ZOR-03'], puan: 60,
      durum: 'Gece Gri Yel Burcu verandasında Zeno ile oturulur; gökten sarı Solis tozu süzülür.',
      hikaye: [
        'Veranda karanlık; gökten ince sarı bir toz yağıyor. Zeno eski bir kâğıt destesini karıştırıyor: "Rasa ile bu desteyle oynardık. Kim kaybederse sabah nöbetini tutardı."',
        '"O fırtınada nöbeti ben tutmalıydım. Kâğıtta kazandım, nöbeti ona bıraktım. Kum onu aldı. O günden beri hiçbir krallığa bağlanmadım; çünkü bir daha kimsenin nöbetini başkasına bırakmayacağım."',
        'Kâğıtları sana uzatıyor: "Bir el oyna. Kim kaybederse sabah nöbetini birlikte tutarız."',
      ],
      cozum: 'Gökten süzülen Solis tozunu yakala: havayı durgunlaştır ya da Hafif Süzülme ile toza yüksel.',
      bulmaca: { hava: 0, dugumler: [D('toz', 'Süzülen Solis tozu', 0, 'toz', 'Sarı toz rüzgârla dağılıyor.', [['hava_durgun'], ['suzulme']], 'Toz şişelere süzüldü.')] },
      secimler: [S('Eli oyna, nöbeti birlikte tut', { zeno: 40 }, 'Sabaha kadar oynuyorsunuz. Şafakta Zeno sana bir kum saati veriyor: "Çölün geçit anahtarının ilk parçası."', { odul: { sise: { solis: 2 } }, bayrak: ['zenoSirri'] })] },
  ],
  sohbetler: [
    { k: 1, ad: 'Kum fırtınası', soz: 'Zeno: "Kum kokusu değişti. Üç saate fırtına gelir. Kervan nereye sığınmalı sence?"',
      secenekler: [O('"Kanyonun rüzgâr altı yamacına."', 20, '"İyi göz."'), O('"Burçta beklesin."', 10, '"Burç dolu, ama olur."'), O('"Hızlanıp kaçsın."', -5, '"Kumdan kaçılmaz evlat."')] },
    { k: 4, ad: 'Kime bağlısın?', soz: 'Zeno: "Herkes bana soruyor: Başkent mi, Filtra mı? Sen kime bağlısın?"',
      secenekler: [O('"Yolu güvenli tutana."', { erken: 15, gec: 30, esik: 5 }, '"Benim gibi konuşuyorsun."'), O('"Konsey\'e; düzen lazım."', 5, 'Omuz silkiyor.'), O('"Kimseye."', 20, 'Gülümsüyor.')] },
  ],
  kademeEtki: (d, k) => {
    if (k === 6) d.bayrak.zenoGizliRota = true;
    if (k === 10) { d.bayrak.zenoGecitAnahtari = true; gucEkle(d, 'dogu', 15); }
  },
  imza: { selam: 'Kervan ateşinde yer var, otur.', tesekkur: 'Yol seninle güvende.', kizgin: 'Bu çölde sözünü tutmayan yolda kalır.' },
  ortam: 'Rüzgârda çınlayan kervan çanları, kumda sürüklenen tozlar ve kervan ateşinin çatırtısı.',
});

kisiEkle('kasim', {
  ad: 'Şeyh Kasım', unvan: 'Çöl Loncası reisi', nokta: 'yg_kasim', guc: 'dogu', bolgeKisisi: true, yerAdi: 'Doğu çöl kantonları', sinif: 'B',
  hiz: [[0, 10, 1]],
  hizMetni: 'Sınıf B: sohbet ve görev birlikte.',
  kimlik: [
    'Çöl loncasının yaşlı reisi; kumullardaki kadim dikilitaşları ve su paylaşımının hafızası.',
    'Bakır cezvesi hiç soğumaz; her misafire önce kahve, sonra soru.',
  ],
  kademeler: [
    'Kahve: önce kahveni içmeni bekliyor.',
    'Su payı: kantonların suyu nasıl paylaştığını anlatıyor.',
    'Dikilitaşlar: kumda kaybolan taşların hikâyesi.',
    'Lonca meclisi: seni meclisin dış halkasına oturtuyor.',
    'Kum yazısı: kuma çizilen eski işaretleri okumayı öğretiyor.',
    'Sarı rezonans: sarı taşı sana emanet ediyor.',
    'Kuyunun derdi: kuruyan kuyunun derdini anlatıyor.',
    'Ataların adı: lonca reislerinin soyunu sayıyor.',
    'Zeno ile ant: Zeno ile su yemininin hikâyesi.',
    'Kumların altındaki şehir: dikilitaşların neyi gösterdiği.',
    'Vaha heykeli: çöl vahasının heykel kilidini sana açıyor.',
  ],
  sosyal: [['Silahşör Zeno', 'Eski dost; su yeminiyle bağlı.', 'ZOR-05\'e ikisi birlikte çağırır.']],
  sever: ['kavrulmus_kahve', 'urun_vaha_hurmasi', 'bal', 'kristal_can'], sevmez: ['komur', 'tamir_kiti'],
  hediyeNot: 'Misafir ağırlamaya yarayan şeyleri sever; kara is ve makine kokusunu çadıra sokmaz.',
  severSoz: '"Misafirin hediyesi başımızın üstünde."', sevmezSoz: '"Bunu çadırın dışında bırak evladım."',
  gorevler: [
    { id: 'ZOR-04', ad: 'Gömülü çöl dikilitaşı', tur: 'hiyerarsi', k: 0, puan: 0,
      durum: 'Kadim bir çöl dikilitaşı dev bir kum tepesinin altında kalmış; yazıtı karanlıkta okunmuyor.',
      hikaye: ['Kasım cezvesini bırakıyor: "Dedemin dedesi bu taşın gölgesinde su yemini etti. Kum onu yuttu. Yazıtı okursan kantonlar seni misafir değil, kardeş sayar."'],
      cozum: 'Ağır Toprak Yarma ile ya da Boran ile kumu süpür; ardından beyaz Lumina şişesi salarak gizli mührü oku.',
      bulmaca: { hava: 0, dugumler: [
        D('kum', 'Dev kum tepesi', -0.3, 'toz', 'Kum taşın üstüne yığılmış.', [['toprak_yarma'], ['hava_boran']], 'Kum savruldu; dikilitaş göründü.'),
        D('muhur', 'Karanlıktaki mühür', 0.4, 'kristal', 'Yazıt karanlıkta; harfler seçilmiyor.', [['lumina_salim']], 'Beyaz ışıkta mühür parladı; yazıt okunuyor.', { on: ['kum'] }),
      ] },
      secimler: [S('Yazıtı meclise oku', { kasim: 40, g_dogu: 10 }, 'Meclis ayağa kalkıyor: "Kardeşimiz!"', { odul: { tas: { sari: 1 } } })] },
    { id: 'ZOR-05', ad: 'Çöl vahası heykelini uyandırma', tur: 'bag', k: 5, once: ['ZOR-04'], puan: 30,
      durum: 'Kuruyan kanton kuyusunun başındaki eski taş muhafız heykeli tıkanmış yeraltı kapağını tutuyor.',
      hikaye: ['Kasım ve Zeno kuyunun başında. Zeno: "Kuyu kuruyunca kervan yolu da kurur." Kasım heykelin göğsündeki üç boş yuvayı gösteriyor: "Ataların taşları buraya takılırdı."'],
      cozum: 'İki sarı ve bir mavi taş takarak heykeli canlandır; heykel kapağı açınca Sıvı Yönlendirme ile suyu kanala akıt.',
      bulmaca: { dugumler: [
        D('heykel', 'Kuyunun taş muhafızı', -0.3, 'tas', 'Heykelin göğsünde üç boş taş yuvası.', [['heykel'], ['tele_kaldirma', 'agirlik_sifir']], 'Heykel doğruldu, kapağı kaldırdı.', { tas: { sari: 2, mavi: 1 } }),
        D('kanal', 'Kuru kanal', 0.4, 'su', 'Yeraltı suyu kapağın altında birikmiş.', [['sivi']], 'Su kanala akıyor; kantonda çocuklar koşuşuyor.', { on: ['heykel'] }),
      ] },
      secimler: [S('Suyu kantonlarla eşit paylaştır', { kasim: 30, zeno: 15, g_dogu: 10 }, 'Kasım ve Zeno su yeminini senin önünde yeniliyor.', { bayrak: ['kantonKuyusu'] })] },
  ],
  sohbetler: [
    { k: 1, ad: 'Kahve', soz: 'Kasım: "Kahven acı mı olsun, tatlı mı? Çölde misafirin ağzının tadı sorulur."',
      secenekler: [O('"Sizin içtiğiniz gibi."', 20, 'Memnun bir mırıltı.'), O('"Kahve içmem."', -5, 'Cezveyi sessizce geri çekiyor.')] },
  ],
  kademeEtki: (d, k) => {
    if (k === 5) BY.tasEkle(d, 'sari', 1);
    if (k === 10) { BY.tasEkle(d, 'mor', 1); d.bayrak.kasimVahaHeykeli = true; }
  },
  imza: { selam: 'Gölgeme hoş geldin, önce kahve.', tesekkur: 'Kum seni unutmaz evladım.', kizgin: 'Misafir de olsan haddini bil!' },
  ortam: 'Bakır cezvenin fokurtusu, tespih şıkırtısı ve çadır bezini döven çöl rüzgârı.',
});

// ZOR-02 önkoşulu: Filtra\'ya silah dövdüysen Zeno\'yu ikna eden konuşma (Paket 6A madde 8). Üç yol, hiçbiri kilitlemez.
KISI_EKLERI.push((d, id) => {
  if (id !== 'zeno' || !d.bayrak.filtraSilah || d.bayrak.zenoIkna) return [];
  return [{
    id: 'ikna', etiket: 'Filtra\'ya dövdüğün çekici Zeno\'ya açıkla',
    alt: () => ({
      baslik: 'Zeno ile açık konuşma',
      giris: 'Zeno tabancasını masaya bırakıyor: "Filtra\'ya silah dövmüşsün. Yarın o çekiç bir topa dönerse kervanlarım ne olacak?"',
      ogeler: [
        { id: 'durust', etiket: '"Bir onur nişanı; büyüsüz, ateş etmez. Senin kervanını da aynı özenle korurum."', yap: (z) => { z.bayrak.zenoIkna = true; puanEkle(z, 'zeno', 10, 'sohbet'); return { metin: 'Zeno uzun uzun bakıyor: "Sözün tamam. Tüfeği döv."' }; }, geri: true },
        { id: 'teminat', etiket: 'Kervan muhafızlarına 30 GK teminat bırak', yap: (z) => { if (!z.para || (z.para.gk || 0) < 30) return { metin: '30 GK gerekir.', ses: 'red' }; z.para.gk -= 30; z.bayrak.zenoIkna = true; return { metin: 'Zeno teminatı kervan kasasına koyuyor: "Ticaret dili de bir dildir."' }; }, geri: true },
        { id: 'bekle', etiket: 'Şimdilik konuyu kapat', yap: () => ({ metin: 'Zeno omuz silkiyor; konu masada duruyor.' }), geri: true },
      ],
    }),
  }];
});
