// Paket 3 (YGK Akademi büyü sınavları ve figür zincirleri) ve Paket 5 (öğretmen-öğrenci ağı, AKD-01 … AKD-06, üç giriş yolu)
// belgeler/v6. Görevler kişi dosyalarındaki bağ ağına (ygk/bag.js) eklenir.
// - Paket 3 bölüm 2: Valen ve Morvenna Kael "Yasak Müfredat İkilemi", Zephyra ile Morwenna "Zaman Hücresi", Dünya Çivisi
//   "Çivinin Altındaki Yankı". Kefius KEF-02, Ignador IGN-02 ve Tixie TIX-03 kişi dosyalarında.
// - Paket 3 bölüm 3: on kürsüye isteğe bağlı büyü sınavı (tur 'sinav'); üçü bitince Kefius onayıyla T2 YGK Rezonans Asası
//   (paket 2 bölüm 2.1: piezo ve gümüş tozu). Çivinin Altındaki Yankı da T2 onayı verir.
// - Paket 2 bölüm 4: kırgın usta yolu (bag.js telafi) ve arşiv yedek yolu (öğretmeni kırgınsa Kat 4 arşivinde büyüyü
//   ek bedelle öğreten bulmaca). Böylece hiçbir seçim bir büyüyü kalıcı olarak kilitlemez.
import { gorevEkle, KISILER, GOREVLER, kayit, puanEkle, KISI_EKLERI, gorevDurumu } from './bag';
import { D, S } from './yardim';
import * as BY from '../buyu/buyu';
import * as BM from '../buyu/bulmaca';
import { BUYULER } from '../buyu/veri';
import * as ZN from '../tonoflenya/zanaat';
import { gucEkle } from '../tonoflenya/kisiler';

const darbe = (d) => !!d.bayrak.valenKapali;

// --- Paket 3 bölüm 2 ---
gorevEkle('valen', {
  id: 'YGK-MUF', ad: 'Yasak müfredat ikilemi', tur: 'zincir', k: 3, puan: 0, kosul: (d) => !!d.bayrak.akademiBuyuKolu || BY.acikMi(d), kosulMetni: 'kolonide Malazar tozuyla asanı uyandır',
  durum: 'Kolonideki Ortak Okul\'un büyü kolu akademide duyuldu; Rektörlük Malazar büyüsünün okutulup okutulmayacağını tartışıyor.',
  hikaye: [
    (d) => (darbe(d)
      ? 'Rektör Morvenna Kael, Valen\'in hücreye düşmeden önce mühürlediği eski bir rektörlük kararını önüne koyuyor: "Malazar müfredatı yasaktır." Morvenna gizli arşivin açılmasını savunuyor.'
      : 'Valen Malazar büyüsünün akademide okutulmasını tehlikeli buluyor; vekili Morvenna Kael ise gizli arşivin açılmasını savunuyor. Masada eski bir rektörlük mührü: kimin elinden çıktığı okunmuyor.'),
    'Mühür çözülmeden kimse kararın asıl metnini bilmiyor.',
  ],
  cozum: 'Lumina salımı ve Hakikat Yankısı ile eski rektörlük mührünü oku.',
  bulmaca: { dugumler: [
    D('muhur', 'Eski rektörlük mührü', 0, 'metal', 'Ağır, çok katmanlı bir mühür.', [['lumina_salim', 'hakikat_yankisi'], ['lumina_salim', 'yanki_tarama'], ['yanki_tarama', 'hakikat_yankisi']], 'Mühür okundu: Sekizler Konseyi\'nin elinden, "denetimli öğretim" şartıyla.'),
  ] },
  secimSoru: 'Malazar müfredatı ne olacak?',
  secimler: [
    S('Denetimli öğretimi savun: büyü akademide okutulsun', { valen: 10, morvenna: 25, kefius: 15, g_ygk: 5 }, 'Arşiv açıldı; alt kat izinleri senin.', { odul: { tas: { mor: 1 } }, bayrak: ['malazarMufredat', 'altKatIzni'] }),
    S('Valen\'in temkinini destekle: büyü yalnız koloni tapınağında kalsın', { valen: 35, morvenna: -10, g_ygk: 15 }, 'Akademi itibarın yükseldi; büyü dersleri yalnız hocaların kişisel sınavlarında sürüyor.', { bayrak: ['malazarTemkin'] }),
  ] });

gorevEkle('zephyra', {
  id: 'ZMN-01', ad: 'Zaman hücresi', tur: 'zincir', k: 4, puan: 25, ogren: 'aether_adimi',
  kosul: (d) => (d.ygk.k.morwenna || {}).k >= 3, kosulMetni: 'Morwenna ile bağın en az kademe 3 olmalı',
  durum: 'Zephyra ile Morwenna\'nın hücrelerinin arasındaki duvarlar sürekli yer değiştiriyor: eski bir zaman ve yankı hücresi.',
  hikaye: [
    'Kat -4\'ün koridoru her adımda başka bir yere çıkıyor. Bir kapı sağda, sonra solda; Zephyra\'nın tüy hışırtısı ve Morwenna\'nın fısıltısı yer değiştiriyor.',
    'İki tutsak aynı anda konuşuyor: "Gerçek kapı bir tanedir. Gözcü sensörü yalnız sıcak ve soğuğun karışımına kördür."',
  ],
  cozum: 'Yankı Taraması ve Lumina ile gerçek kapıyı bul; Buzul ve Kıvılcım ile buhar perdesi kurup sensörü kör et; Aether Adımı ile zamanı bük.',
  bulmaca: { dugumler: [
    D('kapi', 'Yer değiştiren kapılar', -0.5, 'fisilti', 'Kapılar sürekli kayıyor.', [['yanki_tarama', 'lumina_salim'], ['hakikat_yankisi']], 'Gerçek kapı bulundu.'),
    D('sensor', 'Gözcü sensörü', 0, 'elektrik', 'Kırmızı, sabit bir göz.', [['buzul', 'kivilcim'], ['hava_sis']], 'Sensör buharın ardında kör.', { on: ['kapi'] }),
    D('zaman', 'Donmuş an', 0.5, 'fisilti', 'Kapının ardında zaman bir saniye geride.', [['aether_adimi'], ['zihin_arindirma', 'yanki_ikizi']], 'Zamanı bükerek geçtin; iki tutsak aynı odada.', { on: ['sensor'] }),
  ] },
  bitisMetni: 'Aether Adımı ve YGK\'nın karanlık geçmişine dair bir kayıt senin.',
  odul: { ogret: ['aether_adimi'] }, yap: (d) => { puanEkle(d, 'morwenna', 25); d.bayrak.ygkKaranlikGecmis = true; } });

gorevEkle('kefius', {
  id: 'CIV-01', ad: 'Çivinin altındaki yankı', tur: 'zincir', k: 7, once: ['KEF-03'], puan: 30,
  durum: 'Akademinin temelindeki kadim çiviyi besleyen yeraltı akıntısı taştı.',
  hikaye: [
    'Kat -5\'te soğuk bir su sesi; Dünya Çivisi\'nin dibinde akıntı taşmış, taş temeller ıslanıyor. Akıntının ortasında kadim bir muhafız heykeli diz çökmüş, göğsünde boş bir yuva.',
    'Kefius: "Önce suyu yönlendir, sonra taşı aç. Heykel uyanırsa çiviyi tutar."',
  ],
  cozum: 'Sıvı Yönlendirme ile akıntıyı çevir, Ağır Toprak Yarma ile kanalı aç, renkli taşlı muhafız heykelini canlandır.',
  bulmaca: { dugumler: [
    D('akinti', 'Taşan akıntı', -0.5, 'su', 'Soğuk, hızlı bir su.', [['sivi'], ['buzul', 'tele_kaldirma']], 'Akıntı yan kanala çevrildi.'),
    D('kanal', 'Taş kanal', 0, 'tas', 'Kanalın ağzı taşla tıkalı.', [['toprak_yarma'], ['kivilcim', 'tele_kaldirma']], 'Kanal açıldı.', { on: ['akinti'] }),
    D('heykel', 'Muhafız heykeli', 0.5, 'tas', 'Göğsünde iki taş yuvası.', [['heykel']], 'Muhafız uyandı ve çiviyi omzuna aldı.', { on: ['kanal'], tas: { mor: 1, kizil: 1 }, ipucu: 'Heykel bir mor ve bir kızıl taş ister; taşlar bitince geri gelir.', yedek: { odak: 40, bedel: { piezo: 1 }, metin: 'Kefius\'un eski rün halkasıyla heykeli taşsız uyandırdın.' } }),
  ] },
  bitisMetni: 'Mor bir rezonans taşı, T2 YGK Asası onayı ve Tonoflenya\'da gizli bir koordinat.',
  odul: { tas: { mor: 1 } }, yap: (d) => { d.bayrak.asaT2Onay = true; d.bayrak.civiKoordinat = true; } });

// --- Paket 3 bölüm 3: kürsü büyü sınavları ---
const sinav = (kisi, id, ad, durum, cozum, dugumler, odul, yap) => gorevEkle(kisi, {
  id, ad, tur: 'sinav', k: 0, puan: 20, durum, hikaye: [durum], cozum, bulmaca: { dugumler }, odul, yap,
  bitisMetni: 'Kürsü büyü sınavı tamamlandı.',
});
sinav('korvinus', 'SNV-01', 'Kürsü büyü sınavı: sahte protokol', 'Korvinus\'un masasında altı protokol tableti; biri sahte.', 'Hakikat Yankısı ile sahte tableti ayıkla.',
  [D('tablet', 'Altı protokol tableti', 0, 'metal', 'Hepsi aynı görünüyor.', [['hakikat_yankisi'], ['yanki_tarama', 'zihin_arindirma']], 'Sahte tablet boş tınladı.')],
  null, (d) => { gucEkle(d, 'ygk', 5); BY.odakEkle(d, 20); });
sinav('silas', 'SNV-02', 'Kürsü büyü sınavı: gözcü kuklaları', 'Silas\'ın odasında dönen gözcü kuklaları; yakalanmadan geçmelisin.', 'Yoğun sis ya da buhar perdesiyle gözcüleri kör et.',
  [D('gozcu', 'Gözcü kuklaları', 0, 'fisilti', 'Dönen, ışıklı gözler.', [['hava_sis'], ['buzul', 'kivilcim']], 'Gözcüler sisin ardında kör; odayı geçtin.', { pencere: 20 })],
  { sise: { lumina: 1 } });
sinav('forges', 'SNV-03', 'Kürsü büyü sınavı: aşırı ısınmış fırın', 'Forges\'in fırını aşırı ısındı; doğru sırayla soğutup alaşımı dökmelisin.', 'Kıvılcım Dalgası ve Buzul Mühür\'ü doğru sırayla uygula.',
  [D('firin', 'Aşırı ısınmış fırın', 0, 'lav', 'Alaşım kaynıyor.', [['kivilcim', 'buzul']], 'Alaşım kusursuz döküldü.', { sirali: true })],
  { tas: { kizil: 1 } });
sinav('jolkar', 'SNV-04', 'Kürsü büyü sınavı: taş terazi', 'Dev taş bloklar bir terazinin iki kefesinde; dengelenmeli.', 'Tele-Kaldırma ve Yankı İkizi ile iki kefeyi aynı anda dengele.',
  [D('terazi', 'Taş terazi', 0, 'tas', 'İki kefe birbirini çekiyor.', [['tele_kaldirma', 'yanki_ikizi'], ['agirlik_sifir']], 'Terazi dengede.')],
  { tas: { mavi: 1 } });
sinav('faelan', 'SNV-05', 'Kürsü büyü sınavı: alev ve Solis izi', 'Odayı alev sarmış; önce söndür, sonra Solis izini bul.', 'Kademeli hava kontrolüyle yağmurla söndür, sonra Solis izini bul.',
  [D('alev', 'Odadaki alev', -0.3, 'lav', 'Alevler tavana vuruyor.', [['hava_yagmur'], ['buzul'], ['sivi']], 'Alev söndü.'), D('iz', 'Solis izi', 0.4, 'kristal', 'Külün içinde sarı bir parıltı.', [['yanki_tarama'], ['lumina_salim']], 'Solis izi bulundu.', { on: ['alev'] })],
  { sise: { solis: 1 } });
sinav('trellis', 'SNV-06', 'Kürsü büyü sınavı: asma köprü', 'Kuru serada iki yüksek platform arasında köprü kurmalısın.', 'Canlı Sarmaşık ve Sıvı Yönlendirme ile asma köprü kur.',
  [D('kopru', 'İki platform', 0, 'bitki', 'Arada boşluk; toprak kuru.', [['sarmasik', 'sivi'], ['isik_koprusu'], ['madde_koprusu']], 'Yeşil bir asma köprü kuruldu.')],
  { tas: { yesil: 1 } });
sinav('seraphine', 'SNV-07', 'Kürsü büyü sınavı: yıldız haritası', 'Karanlık tavanda gizli bir yıldız haritası.', 'Beyaz Lumina salımıyla doğru haritayı oku.',
  [D('tavan', 'Karanlık tavan', 0, 'kristal', 'Kapkara.', [['lumina_salim'], ['solis_salim']], 'Doğru yıldız haritası belirdi.')],
  null, (d) => { BY.odakEkle(d, 10); d.bayrak.odakHavuzu = (d.bayrak.odakHavuzu || 0) + 10; });
sinav('caelum', 'SNV-08', 'Kürsü büyü sınavı: gece kilidi', 'Dört notalı bir gece kilidi.', 'Ses ve Yankı Düğümü ile dört notayı çöz.',
  [D('kilit', 'Gece kilidi', 0, 'fisilti', 'Dört nota, biri ters.', [['yanki_dugumu'], ['frekans_anahtari', 'yanki_tarama']], 'Kilit açıldı; Julian için yeni bir nota.')],
  null, (d) => { d.bayrak.julianNota = true; });
sinav('kaelis', 'SNV-09', 'Kürsü büyü sınavı: kule vericisi', 'Bozuk bir kule vericisi eşleşmiyor.', 'Frekans Anahtarı ve Devre Kıvılcımı ile vericiyi eşleştir.',
  [D('verici', 'Kule vericisi', 0, 'elektrik', 'İki tonlu cızırtı.', [['frekans_anahtari', 'devre'], ['hibrit_cozucu']], 'Verici eşleşti.')],
  { tas: { sari: 1 } });
sinav('zeva', 'SNV-10', 'Kürsü büyü sınavı: final muhafızı', 'Aynı sınavda zihin ve taş: final muhafız bulmacası.', 'Zihin Arındırma ve Heykel Canlandırma.',
  [D('zihin', 'Muhafızın baskısı', -0.3, 'fisilti', 'Ağır bir zihin baskısı.', [['zihin_arindirma']], 'Zihnin berrak.'),
    D('muhafiz', 'Taş muhafız', 0.4, 'tas', 'Göğsünde iki yuva.', [['heykel']], 'Muhafız uyandı ve sana yol verdi.', { on: ['zihin'], tas: { kizil: 1, mavi: 1 }, yedek: { odak: 40, bedel: { gumus_tozu: 1 }, metin: 'Zeva\'nın denge çapasıyla muhafızı taşsız geçtin.' } })],
  { tas: { mor: 1 } }, (d) => { d.bayrak.ygkBuyuNisani = true; });

export const sinavSayisi = (d) => Object.keys(GOREVLER).filter((g) => GOREVLER[g].tur === 'sinav' && d.ygk && kayit(d, GOREVLER[g].kisi).gorev[g] === 'bitti').length;

// --- T2 YGK Rezonans Asası: üç kürsü sınavı ya da Çivi onayı + Kefius onayı (piezo ve gümüş tozu) ---
export function asaT2Durumu(d) {
  if (!BY.acikMi(d)) return 'Önce asanı uyandırmalısın.';
  if (d.buyu.asa >= 2) return 'Asan zaten YGK Rezonans Asası.';
  if (sinavSayisi(d) < 3 && !d.bayrak.asaT2Onay) return 'Üç kürsü büyü sınavı gerekir; ' + sinavSayisi(d) + ' tamam.';
  if (ZN.miktar(d, 'piezo') < 1 || ZN.miktar(d, 'gumus_tozu') < 1) return 'Kefius onay için bir piezo kristal ve bir gümüş tozu istiyor.';
  return null;
}
export function asaT2Yap(d) {
  const e = asaT2Durumu(d);
  if (e) return { metin: e, ses: 'red' };
  ZN.ekle(d, 'piezo', -1);
  ZN.ekle(d, 'gumus_tozu', -1);
  BY.asaYukselt(d, 2);
  puanEkle(d, 'kefius', 20);
  return { metin: 'Kefius asanın başına piezo kristali, gövdesine gümüş tozunu işledi. Asan artık YGK Rezonans Asası: bütün büyülerde odak yüzde on beş az, hava hamleleri iki adım.', efekt: 'by_asa_uyanis' };
}
KISI_EKLERI.push((d, id) => (id === 'kefius' && BY.acikMi(d) && d.buyu.asa < 2
  ? [{ id: 'asa_t2', etiket: 'Asa onayı: YGK Rezonans Asası', ipucu: asaT2Durumu(d) || 'Hazır: piezo ve gümüş tozu.', yap: (z) => asaT2Yap(z), geri: true }]
  : []));

// --- Paket 2 bölüm 4: arşiv yedek yolu ---
// Öğretmeni kırgın olan ve henüz bilinmeyen akademi büyüleri: Kat 4 arşivinde (ygk_arsiv noktası) ek bedelli bir bulmaca.
export function arsivBuyuleri(d) {
  const l = [];
  for (const gid of Object.keys(GOREVLER)) {
    const g = GOREVLER[gid];
    if (!g.ogren || BY.biliyor(d, g.ogren)) continue;
    const ki = KISILER[g.kisi];
    if (!(d.ygk && d.ygk.k[g.kisi] && d.ygk.k[g.kisi].kirgin) && !(ki.ulasilamaz && ki.ulasilamaz(d))) continue;
    if (!l.some((x) => x.el === g.ogren)) l.push({ el: g.ogren, kisi: g.kisi, gid });
  }
  return l;
}
const ARSIV_BEDEL = 30;
export function arsivMenu(d) {
  const l = arsivBuyuleri(d);
  return {
    baslik: 'Kat 4 arşivi: yedek öğrenme',
    giris: l.length ? 'Kırgın ya da akademiden ayrılmış bir ustanın büyüsünü arşiv notlarından öğrenebilirsin; ' + ARSIV_BEDEL + ' odak ve bir gümüş tozu ister.' : 'Arşivde şimdilik yedek bir ders yok: öğretmenlerinden hiçbiri sana kırgın değil.',
    ogeler: l.map((x) => ({
      id: 'ar_' + x.el, etiket: (BUYULER[x.el] ? BUYULER[x.el].ad : x.el) + ': ' + KISILER[x.kisi].ad + '\'ın notları',
      yap: (z) => {
        if (z.buyu.odak < ARSIV_BEDEL || ZN.miktar(z, 'gumus_tozu') < 1) return { metin: 'Odak ' + ARSIV_BEDEL + ' ve bir gümüş tozu gerekir.', ses: 'red' };
        BY.odakHarca(z, ARSIV_BEDEL);
        ZN.ekle(z, 'gumus_tozu', -1);
        return BM.baslat(z, 'ogren_arsiv_' + x.el, { ogren: x.el });
      },
    })),
  };
}
// Her akademi büyüsü için arşiv bulmacası: iki düğüm, yalnız o büyüyle çözülür (öğrenme kipinde)
const ARSIV_SON = [];
export function arsivBulmacalariKur() {
  for (const gid of Object.keys(GOREVLER)) {
    const g = GOREVLER[gid];
    if (!g.ogren || ARSIV_SON.includes(g.ogren)) continue;
    ARSIV_SON.push(g.ogren);
    const el = g.ogren;
    BM.bulmacaEkle('ogren_arsiv_' + el, {
      ad: BY.adi(el) + ': arşiv notlarından öğrenme',
      giris: 'Arşiv notları önünde. Önce asanın tonunu notlardaki frekansa oturt, sonra sınav taşında bir kez dene.',
      dugumler: [
        { id: 'not', ad: 'Arşiv notları', pan: -0.3, mesafe: 0.2, ses: 'fisilti', durum: 'Eski bir el yazısı; frekans işaretleri.', kombolar: [[el]], cozuldu: 'Frekans asaya işlendi.' },
        { id: 'tas', ad: 'Sınav taşı', pan: 0.3, mesafe: 0.5, ses: 'kristal', durum: 'Küçük bir sınav taşı büyünün tınısını bekliyor.', kombolar: [[el]], on: ['not'], cozuldu: 'Deneme başarılı.' },
      ],
      bitis: BY.adi(el) + ' artık senin.',
      odul: { ogret: [el] },
      tekrar: true,
    });
  }
}

// --- Paket 5: AKD-01 … AKD-06 ve üç giriş yolu ---
gorevEkle('veyra', {
  id: 'AKD-01', ad: 'Borulardaki yankı', tur: 'bag', k: 0, puan: 25,
  durum: 'Tixie Kat 2 havalandırmasından enerji çekerken akustik amfiyi bozdu; Kaelis suçluyu bulup disipline vermek istiyor.',
  hikaye: [
    'Amfide borulardan gelen tiz bir vınlama; Veyra-K ders notlarını duyamıyor ama Tixie\'yi ihbar etmek de istemiyor.',
    'Kaelis kapıda: "Bu sesin sahibini bulacağım." Boruların içinden yarım bir kıkırtı.',
  ],
  cozum: 'Ses ve Yankı Düğümü ile boru frekansını dengele ya da Devre Kıvılcımı ile Tixie\'ye ayrı bir yedek hat aç.',
  bulmaca: { dugumler: [
    D('boru', 'Vınlayan borular', 0, 'elektrik', 'Tiz bir vınlama.', [['yanki_dugumu'], ['devre'], ['frekans_anahtari']], 'Boru sustu; Tixie\'nin hattı ayrıldı.'),
  ] },
  bitisMetni: 'İki taraf barıştı; Veyra-K sana akademideki kestirme havalandırma haritasını verdi.',
  yap: (d) => { puanEkle(d, 'tixie', 15); puanEkle(d, 'kaelis', 5); d.bayrak.havalandirmaHaritasi = true; } });
gorevEkle('faelan', {
  id: 'AKD-02', ad: 'Yanık eldivenler', tur: 'bag', k: 0, puan: 25,
  durum: 'Faelan\'ın hata büyüsü dersinde kontrolden çıkan bir ısı dalgası amfiyi duman altında bıraktı; Veyra-K içeride.',
  hikaye: ['Duman, öksürük ve Faelan\'ın kahkahası: "Bu kadarını ben de beklemiyordum!"'],
  cozum: 'Buzul Mühür ya da soğutmayla odayı soğut; Lumina ile kalan kıvılcımları temizle.',
  bulmaca: { dugumler: [
    D('isi', 'Isı dalgası', -0.3, 'lav', 'Amfi kavruluyor.', [['buzul'], ['hava_serin']], 'Oda soğudu.'),
    D('kivilcim', 'Kalan kıvılcımlar', 0.4, 'kristal', 'Sıralarda çıtırdayan kıvılcımlar.', [['lumina_salim'], ['buzul'], ['hava_yagmur']], 'Son kıvılcım da söndü.', { on: ['isi'] }),
  ] },
  bitisMetni: 'Faelan sana bir Sarı Solis şişesi verdi.',
  odul: { sise: { solis: 1 } }, yap: (d) => { puanEkle(d, 'veyra', 10); } });
gorevEkle('dren', {
  id: 'AKD-03', ad: 'İki ustanın ortak örsü', tur: 'bag', k: 3, puan: 25,
  durum: 'Dren hem Forges\'in çeliğini hem Korvinus\'un anti-büyü mührünü taşıyan bir tören kılıcı dövmek istiyor; iki hoca yan yana gelmiyor.',
  hikaye: ['Dren örsün başında: "Bu kılıç ikisinin de eseri olacak. Ama ikisi de aynı odada durmuyor."'],
  cozum: 'Kıvılcım Dalgası, Metal Şekillendirme ve Buzul Mühür ile kılıcı dök ve iki ustaya sun.',
  bulmaca: { dugumler: [
    D('kilic', 'Tören kılıcı', 0, 'metal', 'Ham çelik ve bir kristal yuvası.', [['kivilcim', 'metal', 'buzul'], ['kivilcim', 'oz_baglama', 'buzul']], 'Kılıç dengede; iki usta yıllar sonra el sıkıştı.', { sirali: true }),
  ] },
  bitisMetni: 'Forges ve Korvinus yıllar sonra ilk kez el sıkıştı; Metal Şekillendirme ustalığın hızlandı.',
  odul: { tas: { kizil: 1 } }, yap: (d) => { puanEkle(d, 'forges', 20); puanEkle(d, 'korvinus', 20); d.buyu.kullanim.metal = (d.buyu.kullanim.metal || 0) + 3; } });
gorevEkle('elian', {
  id: 'AKD-04', ad: 'Kurumuş sera kökü', tur: 'hiyerarsi', k: 2, puan: 25,
  durum: 'Kat 5 serasında nadir bir Malken-Dünya hibrit bitkisi kurudu; Lyra mercek reçinesi için kesmek, Trellis-7 yaşatmak istiyor.',
  hikaye: ['Kuru gövdenin üstünde iki ses: Lyra\'nın makası ve Trellis-7\'nin yavaş nefesi. Elian aralarında, bitkinin yaprağını tutuyor.'],
  cozum: 'Sıvı Yönlendirme ile fıskiye suyunu çevir; Canlı Sarmaşık ile bitkiyi canlandır.',
  bulmaca: { dugumler: [
    D('su', 'Fıskiye suyu', -0.3, 'su', 'Su başka yöne akıyor.', [['sivi'], ['hava_yagmur']], 'Su köke ulaştı.'),
    D('bitki', 'Hibrit bitki', 0.4, 'bitki', 'Kuru ama canlı.', [['sarmasik'], ['lumina_salim', 'zihin_arindirma']], 'Bitki canlandı.', { on: ['su'] }),
  ] },
  bitisMetni: 'Trellis-7 ve Elian sana yeşil bir taş verdi; Lyra reçine fazlasını paylaştı ve koloni serası için bir not düştü.',
  odul: { tas: { yesil: 1 } }, yap: (d) => { puanEkle(d, 'trellis', 15); puanEkle(d, 'lyra', 10); d.bayrak.seraNotu = true; } });
gorevEkle('sora', {
  id: 'AKD-05', ad: 'Unutulmuş kuzey haritası', tur: 'zincir', k: 2, puan: 0,
  durum: 'Sora-9 Püskül\'ün raflarında Zeris ile Kat -4 arasındaki eski gizli geçidi gösteren mühürlü bir parşömen buldu.',
  hikaye: ['Parşömenin mührü soğuk. Sora-9 fısıldıyor: "Bu bir geçit, Kaptan. Zeris\'ten doğrudan Kat -4\'e."'],
  cozum: 'Lumina ya da Hakikat Yankısı ile mührü aç.',
  bulmaca: { dugumler: [
    D('muhur', 'Mühürlü parşömen', 0, 'fisilti', 'Soğuk bir mühür.', [['lumina_salim'], ['hakikat_yankisi']], 'Mühür açıldı: eski bir kuzey geçidi.'),
  ] },
  secimSoru: 'Haritayı kime vereceksin?',
  secimler: [
    S('Valen\'e (ya da Rektörlüğe) teslim et', { valen: 15, sora: 15, g_ygk: 25 }, 'Sora-9 resmî arşivci oldu; Mirelza Kuzey görevinde senden ek kanıt isteyecek.', { bayrak: ['akd5Valen'] }),
    S('Mirelza\'ya sızdır', { g_kuzey: 15, valen: -15, kefius: 10 }, 'Zeris itibarın arttı, Kuzey Rüzgârı Uçuşu yolu hızlandı; Valen seni ve Sora-9\'u sorguya çekti ama Kefius gizlice korudu.', { bayrak: ['akd5Mirelza'] }),
    S('Kefius\'a şifreli kopya bırak, aslına dokunma', { kefius: 20, sora: 10 }, 'İki tarafa kriz çıkmadan Kat -3 bilgisi açıldı.', { bayrak: ['akd5Denge'] }),
  ] });
gorevEkle('nox', {
  id: 'AKD-06', ad: 'Çatlaktaki kalp atışı', tur: 'zincir', k: 2, puan: 30,
  durum: 'Nox, Kat -2 sessiz hücrelerinde Malazar Çatlağı\'ndan gelen bir titreşim duydu.',
  hikaye: ['İki sessiz kapı; ikisi aynı anda açılmalı. Nox\'un kulakları çınlıyor.'],
  cozum: 'Yankı İkizi ile iki kapıyı aynı anda aç; Zihin Arındırma ile Nox\'un çınlamasını kes.',
  bulmaca: { dugumler: [
    D('kapilar', 'İki sessiz kapı', -0.3, 'tas', 'Aynı anda açılmalı.', [['yanki_ikizi'], ['tele_kaldirma', 'yanki_dugumu']], 'İki kapı birlikte açıldı.'),
    D('cinlama', 'Nox\'un çınlaması', 0.4, 'fisilti', 'Tiz bir çınlama.', [['zihin_arindirma'], ['hava_durgun']], 'Çınlama kesildi.', { on: ['kapilar'] }),
  ] },
  bitisMetni: 'Çatlaktan bir mor taş çıktı; Nox artık Malazar Dağı ile akademi arasındaki gizli rezonans sızıntısını takip eden sadık müttefikin.',
  odul: { tas: { mor: 1 } }, yap: (d) => { puanEkle(d, 'silas', 10); puanEkle(d, 'jolkar', 10); d.bayrak.noxMalazar = true; } });

// Üç giriş yolu (paket 5 bölüm 1): kimse kimseyi kilitlemez; yalnız rehber
export const YOLLAR = [
  { id: 'A', ad: 'Yol A: Akustik ve cep-park', kat: 'Kat 1 ve 2', kisiler: ['veyra', 'tixie', 'kaelis', 'ignador', 'lasiraxi', 'faelan'], tarif: 'Güvenli bağ görevleriyle başlamak, akademinin gizli geçitlerini ve dedikodularını tanımak için en rahat başlangıç.' },
  { id: 'B', ad: 'Yol B: Zanaat, örs ve simya', kat: 'Kat 3 ve 5', kisiler: ['dren', 'forges', 'korvinus', 'zeva', 'zynae', 'elian', 'lyra', 'trellis', 'seraphine', 'miranda'], tarif: 'Büyü ocağında ekipman dövme, Metal Şekillendirme, Öz Bağlama, Canlı Sarmaşık ve element bulmacaları.' },
  { id: 'C', ad: 'Yol C: Arşiv, gizem ve siyaset', kat: 'Kat 4, 6 ve eksi katlar', kisiler: ['sora', 'puskul', 'corinne', 'kefius', 'palmi', 'sirilla', 'valen', 'morvenna', 'nox', 'maelis', 'silas', 'jolkar', 'caelum', 'zephyra', 'morwenna'], tarif: 'Tonoflenya\'nın öteki bölgelerini etkileyen zincir kararları ve Malazar Çatlağı sırları buradan başlar.' },
];
export { gorevDurumu };
