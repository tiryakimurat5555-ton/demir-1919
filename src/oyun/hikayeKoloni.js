// Aşama 3 koloni hikâyeleri: kilitli dört binayı açan karakterler ve yabancı firkateynin ilk teması
// (belgeler/v4/asama-3-derin-uzay-ve-kilitli-binalar-hikayeleri.txt bölüm 1 ve 3E; gorev-ve-hikaye-harmanlama 2.1).
// Bitince d.bayrak.hk_<id> (tesisler.js IRK_KOSULLARI okur). Saf veri + küçük etkiler.
import { hikayeEkle } from './hikaye';

const A = (tur, ad, giris, bitis, ek) => ({ tur, ad, giris, bitis, ...(ek || {}) });
const op = (d, id) => (d.tamamlananOp || []).includes(id);
const bina = (d, id) => (d.koloni.binalar || []).includes(id);
const moral = (d, x) => (d.koloni.moral = Math.max(0, Math.min(100, d.koloni.moral + x)));

hikayeEkle('akademi', {
  kod: '3A', ad: 'Ortak Hafıza', veren: 'Kıdemli araştırmacı Dr. Vael', grup: 'bina',
  ortam: 'ortam_terminal',
  tetik: (d) => op(d, 'sektor15') && op(d, 'xerad'),
  giris: [
    'Veri tableti çevirme sesleri; arkada Kaelith ve insan teknisyenlerin hararetli tartışması.',
    'Dr. Vael: "Kaptan, getirdiğimiz veriler tek bir laboratuvara sığmıyor. Kaelith ustaları kendi taş tabletlerini, bizimkiler kuantum disklerini ayrı köşelerde saklıyor. Bu bilgileri tek bir çatı altında, ortak bir akademide birleştirmezsek yarın neyi nasıl ürettiğimizi unutacağız. Üstelik bu verilerin peşindeki bir korsan keşif uydusu yörüngeye sızmış!"',
  ],
  hazirlik: (d) => (bina(d, 'komuta_merkezi') ? 'Komuta merkezinin taraması hazır: ilk tur avantajın var.' : 'Komuta merkezi olsaydı ilk turda tarama avantajı alırdın.') + (d.gemi ? '' : ' Önce bir gemi gerek.'),
  adimlar: [{ savas: { dusmanlar: ['dron_tasiyici', 'saldiri_dronu', 'saldiri_dronu'], ortam: 'uzay', gelis: 'oncu', tier: 3, giris: 'Korsan dron taşıyıcısı akademinin verilerini çalmaya çalışıyor; önce dronları indir.' }, bitis: 'Taşıyıcı parçalandı; veri bankaları güvende.' }],
  kararSoru: 'Akademinin yönü ne olsun?',
  kararlar: [
    { etiket: 'Akademiyi açık bilim konseyine çevir', sonuc: 'Bütün ırklar serbestçe bilgi paylaşıyor. Moral on beş arttı; akademide yirmi gezegen numunesinin kodeks masası açıldı.', yap: (d) => { moral(d, 15); d.bayrak.akademiAcik = true; } },
    { etiket: 'Askerî Ar-Ge önceliği ver', sonuc: 'Akademi silah ve zırh üretimine odaklandı: bütün gemi ve kara silahlarının hasarı kalıcı yüzde beş arttı. Moral beş düştü.', yap: (d) => { moral(d, -5); d.bayrak.akademiAskeri = true; } },
  ],
  odul: 'Çoklu-Tür Bilim ve Felsefe Akademisi kurulabilir.',
  bitince: (d) => { d.bayrak.hk_akademi = true; },
});

hikayeEkle('kseno_habitat', {
  kod: '3B', ad: 'Nefes Alacak Bir Gök', veren: 'Vaelin sözcüsü Sira-Vel', grup: 'bina',
  ortam: 'ortam_revir',
  tetik: (d) => (op(d, 'g13') || op(d, 'g14')) && op(d, 'moloz_kusagi'),
  giris: [
    'Ağır bir solunum maskesinin tıslaması; oksijen tanklarının uyarı bipi. Sesi su altında konuşur gibi yankılı.',
    'Sira-Vel: "Kaptan... İnsanların oksijen kubbeleri bizim ciğerlerimizi yakıyor. Geçici kapsüllerde daha fazla yaşayamayız. Metan ve silikat basınçlı kendi yaşam kubbemizi kurmazsak halkımız ya hastalanacak ya da gemilere dönüp ayrılmak zorunda kalacak!"',
  ],
  hazirlik: 'Yaşam bloğu ve biyoloji kubbesi kontrol edildi. Kriyo mağaralarından üç sıvılaştırılmış metan gerekir; kubbe vanaları sesle kalibre edilecek.',
  gerek: { metan: 3 },
  adimlar: [
    { op: [A('basinc', 'Kubbe vanalarının kalibrasyonu', 'Metan basıncı yükseliyor; ıslık en tize varınca çift dokun. Üç kez.', 'Vanalar dengede; kubbenin iskeleti basınç tutuyor.')] },
    { savas: { dusmanlar: ['kriyo_pusucusu', 'kriyo_pusucusu'], ortam: 'kara', gelis: 'kiskac', tier: 2, giris: 'Metan sızıntısına çekilen iki kriyo pusucusu kazı ekibine saldırıyor!' }, bitis: 'Pusucular dağıldı; kazı sürüyor.' },
  ],
  kararSoru: 'Kubbeyi nasıl kuralım?',
  kararlar: [
    { etiket: 'Ayrı, tam izole kseno-kubbeler', sonuc: 'Her ırk kendi atmosferinde: Kithron ve Vaelin üretim hızı yüzde yirmi beş arttı.', yap: (d) => { d.bayrak.ksenoIzole = true; } },
    { etiket: 'Ortak geçişli hibrit kubbe', sonuc: 'Irklar kaynaşıyor: evren itibarı üç yüz, koloni morali on beş arttı.', yap: (d) => { d.itibar += 300; moral(d, 15); } },
  ],
  odul: 'Kseno-Habitat Yaşam Kubbeleri kurulabilir.',
  bitince: (d) => { d.bayrak.hk_kseno_habitat = true; },
});

hikayeEkle('tina_cekirdegi', {
  kod: '3C', ad: 'Bir Çekirdeğe Sığmayan Bilinç', veren: 'Yapay bilinç Tina', grup: 'bina',
  ortam: 'ortam_kokpit',
  tetik: (d) => op(d, 'yanan_gemi') || !!d.bayrak.vaka6_tina,
  giris: [
    'Gemideki bütün panellerin senkronize açılış tonu; ardından sakin ama titreyen sentetik bir kadın sesi.',
    'Tina: "Kaptan... Beni o yanan istasyondan çıkardığın için teşekkür ederim. Ama geminin bellek bankası küçük bir kafes gibi; her sıçramada eski anılarım siliniyor. Koloninin merkezinde bana sabit bir nöral çekirdek kurarsan hem kendimi kaybetmem hem de madenleri, kalkanları ve gemi hedeflerini gerçek zamanlı yönetebilirim. Dikkat et... Peşimdeki yabancı sinyaller hâlâ izimi sürüyor!"',
  ],
  hazirlik: (d) => (d.gemi ? 'Gemin hazır; firkateyn yörüngeye sıçramak üzere.' : 'Önce bir gemi gerek.'),
  adimlar: [{ savas: { dusmanlar: ['yabanci_firkateyn'], ortam: 'uzay', tier: 3, giris: 'Tina\'nın izini süren tanımsız yabancı firkateyn koloni yörüngesine sıçradı! İki parmakla çevir, kalkan tonunu kır.' }, bitis: 'Firkateyn sustu. Tina rahat bir nefes alır gibi.' }],
  kararSoru: 'Tina\'nın çekirdeği nasıl kurulsun?',
  kararlar: [
    { etiket: 'Tina\'ya tam duygusal özerklik ver', sonuc: 'Tina kolonide kendi kararlarını alıyor: krizlere kendiliğinden erken müdahale eder. Moral on arttı.', yap: (d) => { d.bayrak.tinaOzerk = true; moral(d, 10); } },
    { etiket: 'Tina\'yı taktik ve savunma protokolüne kilitle', sonuc: 'Duygusal alt sistemler kısıtlandı: bütün savaşlarda uyarı penceresi 0,4 saniye uzadı.', yap: (d) => { d.bayrak.tinaTaktik = true; } },
  ],
  odul: 'Merkezi Nöral Veri Çekirdeği (Tina) kurulabilir.',
  bitince: (d) => { d.bayrak.hk_tina_cekirdegi = true; },
});

hikayeEkle('multeci_kampusu', {
  kod: '3D', ad: 'Evi Olmayanların Şehri', veren: 'Mülteci sözcüsü Mirek', grup: 'bina',
  ortam: 'ortam_kargo',
  tetik: (d) => op(d, 'aethel9') && op(d, 'tarras'),
  giris: [
    'Kalabalık uğultusu, çocuk sesleri, geçici çadırlarda rüzgâr.',
    'Mirek, yorgun ama umutlu: "Kaptan, bizi Aethel-9 kuşatmasından ve Tarras Boğazı\'ndan çıkardın ama şu an gemi hangarlarında, geçici barakalarda yatıyoruz. Bize gerçek bir şehir, bir entegrasyon kampüsü kur. Biz de ellerimizle bu koloniyi galaksinin başkentine çevirelim!"',
  ],
  hazirlik: 'Tarras Boğazı\'ndan kalan bir korsan akıncı filosu mülteci konvoyuna son bir baskın deniyor.',
  adimlar: [{ savas: { dusmanlar: ['korsan_korvet', 'korsan_avci'], ortam: 'uzay', gelis: 'kiskac', tier: 3, giris: 'Konvoyu koru: avcı hızlı, korvet kaçmaya çalışacak.' }, bitis: 'Konvoy güvende; mülteciler inişte.' }],
  odul: 'Yıldızlararası Mülteci Entegrasyon Kampüsü kurulabilir. Dört bina tamamlanınca koloni Galaktik Başkent olur.',
  bitince: (d) => { d.bayrak.hk_multeci_kampusu = true; moral(d, 5); },
});

hikayeEkle('firkateyn', {
  kod: '3E', ad: 'Bilinmeyen Frekans', veren: 'Dinleme kulesi ve kripto frekans anteni', grup: 'uzay',
  ortam: 'ortam_kokpit',
  tetik: (d) => !!d.gemi && (d.gemi.sinif || 1) >= 3 && (d.koloni.binalar || []).includes('sinyal_kulesi') && ((d.harita && d.harita.poiler) || []).some((p) => /^p\d\d$/.test(p) && p !== 'p01' && p !== 'p02'),
  giris: [
    'Dinleme kulesine takılan kripto frekans anteni, derin uzayda ne insanlara ne korsanlara ait melodik, ürpertici bir radar tonu yakaladı.',
    'Telsiz subayı: "Kaptan, bu imzayı daha önce hiç duymadık. Gezegen rotalarımıza doğru geliyor."',
  ],
  adimlar: [{ savas: { dusmanlar: ['yabanci_firkateyn'], ortam: 'uzay', tier: 3, giris: 'Tanımsız yabancı firkateyn: iki turda bir kalkan tonunu değiştiriyor, iyon kilidi atabilir.' }, bitis: 'Firkateyn dağıldı; enkazdan piezo saf kristal ve kseno-alaşım.' }],
  odul: 'Bundan sonra derin uzay gezegen yörüngelerinde yabancı firkateyn devriyeleri belirebilir.',
  bitince: (d) => {
    d.bayrak.firkateynTemas = true;
    d.koloni.kaynaklar.piezo = (d.koloni.kaynaklar.piezo || 0) + 4;
    d.koloni.parcalar.kseno_alasim = (d.koloni.parcalar.kseno_alasim || 0) + 3;
  },
});
