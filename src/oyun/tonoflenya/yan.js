// Tonoflenya yan görevleri ve yerel vakalar (belgeler/tonoflenya-yan-gorevler-ve-yerel-vakalar.md): beş kuşağa
// dağılmış otuz görev, ön koşullar, akustik mekanikler, dallanan kararlar, ödül ve itibar matrisi. Saf JavaScript.
//
// Akış: görevin yerindeki nokta "Yan görev: …" → giriş sahnesi (kod, tür, görev veren, harita hiyerarşisi, ambiyans,
//   ekran okuyucu notu, ön koşullar) → yüzey operasyonu (operasyon.js; yuzey: true) → karar (A / B) → ödül.
//   Aynı anda bir yan görev yürür (d.yan.aktif). Ön koşullar: oyunda karşılığı olanlar denetlenir (ekol kıdemi, gemi
//   sınıfı, eşya); öbürleri görevi veren kişi ödünç verir (envanterde "görev gereci").
// Durum: d.yan = { aktif, biten [no], karar { no: 'A'|'B' }, itibar { fraksiyon: puan }, bilim, ozel [subay], gun };
//   d.opBekle (gorevler.zamanIlerle operasyonu başlatır).
import { OPERASYONLAR } from '../veri/uzayGorevleri';
import { uretec, uyeUret } from '../veri/murettebat';
import * as ZN from './zanaat';
import * as SB from './subay';
import { T_MEKANLAR } from './harita';
import { A_MEKANLAR } from './atlas';

const A = (tur, ad, giris, bitis, ek) => ({ tur, ad, giris, bitis, ...(ek || {}) });
const ml = (d, n) => {
  ZN.hazirla(d);
  d.para.ml += n;
  return n + ' Malken Lirası';
};
const esya = (d, id, n = 1) => {
  ZN.ekle(d, id, n);
  return (n > 1 ? n + ' ' : '') + ZN.adi(id);
};
const kaynak = (d, id, n) => {
  d.koloni.kaynaklar[id] = (d.koloni.kaynaklar[id] || 0) + n;
  return n + ' ' + ZN.adi(id);
};
const bilim = (d, n) => {
  yan(d).bilim += n;
  d.kaptan.tecrube += Math.round(n / 10);
  return n + ' bilim puanı';
};
const bayrak = (d, b) => {
  d.bayrak[b] = true;
};
const muaf = (d, ...t) => {
  if (!d.bayrak.tehlikeMuaf) d.bayrak.tehlikeMuaf = {};
  for (const x of t) d.bayrak.tehlikeMuaf[x] = true;
};
const ozel = (d, ad, unvan, etki) => {
  if (!yan(d).ozel.some((x) => x.ad === ad)) d.yan.ozel.push({ ad, unvan, etki });
  return 'Yeni mürettebat: ' + ad + ' (' + unvan + '; ' + etki + ')';
};
// Ön koşul denetimleri
const kidem = (e, k) => (d) => SB.kabiliyet(d, e, k);
const herhangiKidem = (k) => (d) => SB.EKOL_SIRASI.some((e) => SB.kabiliyet(d, e, k));
const sinif = (s) => (d) => !!d.gemi && (d.gemi.sinif || 1) >= s;
const var_ = (id) => (d) => ZN.miktar(d, id) > 0;

// Yan görevlerin ödül ve yadigâr eşyaları (zanaat.js ESYA'ya eklenir). deger: pazarlarda "değerli mallar" fiyatı (lira)
Object.assign(ZN.ESYA, {
  gumus_rozet: { kat: 5, ad: 'Gümüş Muhafız Rozeti', tarif: 'Malkenia pazarlarında yüzde on indirim.' },
  aether_bataryasi: { kat: 4, ad: 'Aether rezonans bataryası', tarif: 'Reaktöre yüklenince otuz litre itki yakıtı.' },
  gubre_formulu: { kat: 5, ad: 'Elyndra Saf Gübre Formülü', tarif: 'Bütün seralarda yüzde yirmi beş hızlı büyüme.' },
  orkide_tohumu: { kat: 3, ad: 'Astral mor orkide tohumu', tarif: 'Yüksek kârlı lüks ürün.', deger: 300 },
  varek_bataryasi: { kat: 2, yuva: 'silah', ad: 'Varek Aşırı Yüklü Plazma Bataryası', tarif: 'Silah yuvası.', etki: 'Gemi top hasarı yüzde on sekiz fazla.' },
  hayat_muskasi: { kat: 5, ad: 'Axira Hayat Muskası', tarif: 'Gemi ve mürettebat ölümcül yaralanmada bir kez yarı canla dirilir (savaşta yenilgi anında).' },
  konser_bileti: { kat: 4, ad: 'Malken lüks konser bileti', tarif: 'Mürettebat sadakati yüzde on: kullanınca stres silinir, moral artar.' },
  ticaret_berati: { kat: 5, ad: 'Deniz Ticaret İtiyat Beratı', tarif: 'Batı Kıtası pazarlarında yüzde on fazla satış; Zinas korsanları dokunmaz.' },
  oksijen_yosunu: { kat: 5, ad: 'Kadim Oksijen Yosunu Kültürü', tarif: 'Terraforming hızını yüzde on artırır.' },
  graviton_hucresi: { kat: 4, ad: 'Saf graviton hücresi', tarif: 'Reaktöre yüklenince elli litre: beş yüz ışık yılı menzil.' },
  seref_madalyasi: { kat: 5, ad: 'Cumhuriyet Şeref Madalyası', tarif: 'Julithan Senatosu\'ndan.' },
  maden_hissesi: { kat: 5, ad: 'Filtra Maden Karteli Hissesi', tarif: 'Her gün yüz lira pasif gelir.' },
  dag_pusulasi: { kat: 5, ad: 'Dağ Rehberi Pusulası', tarif: 'Kuzey geçitlerinin kara buz ve anomali tehlikelerinden korur.' },
  safran_kristali: { kat: 3, ad: 'Saf safran kristali', tarif: 'Paha biçilmez egzotik yük.', deger: 3000 },
  ruzgar_muskasi: { kat: 5, ad: 'Zorah Rüzgâr Muskası', tarif: 'Çölün kum fırtınası ve seraplarından korur.' },
  akrep_zehri: { kat: 4, ad: 'Saf cam akrebi zehri', tarif: 'Torpidolara asit kaplama: her torpido bir doz harcar, yüzde otuz fazla vurur.' },
  haydut_tabancasi: { kat: 1, yuva: 'silah', ad: 'Haydut Başı Akustik Tabancası', tarif: 'Kanyonun yankısında doğan bir silah.', etki: 'Birincil atış 1,5 kat.' },
  mavi_prizma: { kat: 5, ad: 'Kutsal Mavi Kristal Prizma', tarif: 'Fener menzili yüzde on artar.' },
  gunes_kuresi: { kat: 3, ad: 'Kadim güneş küresi', tarif: 'Karaborsada paha biçilmez bir antika.', deger: 3500 },
  gecit_haritasi: { kat: 5, ad: 'Kahergonat Gizli Geçit Haritası', tarif: 'Ana görevlerde sızma kolaylığı: Final 16\'da arka kanyondan sızılır, Kahergonat öncü zırhlısının kalkanı yüzde yirmi beş kırık başlar.' },
  gumus_tuy: { kat: 3, ad: 'Gümüş tüy', tarif: 'Lüks kabin yalıtımı.', deger: 40 },
  yildiz_atlasi: { kat: 5, ad: 'Yıldız Atlası Haritası', tarif: 'Fener menzili yüzde on artar.' },
  parazit_sensoru: { kat: 2, yuva: 'kesif', ad: 'Kozmik Parazit Sensörü', tarif: 'Keşif yuvası.', etki: 'Derin uzay sinyal yakalama yüzde otuz fazla (fener menzili).' },
  gen_kapsulu: { kat: 5, ad: 'Kadim Gen Kapsülü', tarif: 'Kolonide klonlanabilir binek hayvanı üretimi için bozulmamış mamut geni.' },
  kara_buz_parcasi: { kat: 4, ad: 'Saf kara buz parçası', tarif: 'Cephane kaplaması: savaşta kritik vuruş şansı yüzde on beş artar; her kritik bir parça harcar.' },
  drahmir_kalkani: { kat: 1, yuva: 'zirh', ad: 'Drahmir Kraliyet Kalkanı', tarif: 'Burç 3\'ün savunucusuna.', etki: 'Savaşta alınan hasar yüzde on beş az.' },
  toz_pelerini: { kat: 5, ad: 'Işık Tozu Pelerini', tarif: 'Görünmezlik süresini yüzde yirmi artırır (ışık pelerininin gizlemesi uzar).' },
  isik_yakiti: { kat: 4, ad: '25 litre Fenrir sıvı ışık yakıtı', tarif: 'Reaktöre yüklenince yirmi beş litre.' },
  gok_yuzugu: { kat: 5, ad: 'Gökyüzü Tüyü Yüzüğü', tarif: 'Arin Krallığı\'ndan.' },
  askeri_plan: { kat: 5, ad: 'Güney Krallıkları Gizli Askerî Planı', tarif: 'Yüksek siyasi koz.' },
  liman_nisani: { kat: 5, ad: 'Liman Şeref Nişanı', tarif: 'Veradon\'dan.' },
  feneri_kristali: { kat: 5, ad: 'Bataklık Feneri Kristali', tarif: 'Sisli alanlarda tam isabet: savaşta kilit payı yüzde elli geniş.' },
  gorev_gereci: { kat: 5, ad: 'Görev gereci', tarif: 'Yan görevleri verenlerin ödünç verdiği aletler.' },
});

// Otuz yan görev. onkosul: [[ad, denetim | null]] (null: görevi veren ödünç verir).
// kararlar: [{ etiket, sonuc, odul(d) → ödül metni, itibar: { fraksiyon: n } }]
const K = (etiket, sonuc, itibar, odul) => ({ etiket, sonuc, itibar, odul });
export const YAN = [
  // --- Bölüm 1: Magentor ve başkent halkaları ---
  {
    no: 1, kod: 'MAG-SQ-01', ad: 'Zhaor Gece Pazarında Kaçak Kristal İzi', tur: 'Dedektiflik, gizlilik, soruşturma', mekan: 'halka_zhaor', fx: 0.2, fy: 0.85, yer: 'Kuzey Gece Pazarı tezgâhları', npc: 'Muhafız Yüzbaşısı Vaelen Morvath',
    harita: 'Dünya Haritası → Magentor Yarımadası → Zhaor Halkası → Kuzey Gece Pazarı Tezgâhları',
    onkosul: [['Karakter seviyesi 12 ve üstü (oyunda: herhangi bir ekolde Seyrüsefer Uzmanı)', herhangiKidem(2)], ['Akustik analiz becerisi seviye 2 (Mavi Yıldız ekolünde Seyrüsefer Uzmanı)', kidem('sinha', 2)], ['Gürültü engelleyici pelerin', null]],
    ambiyans: 'Kalabalık gece pazarı; aralıklı kristal şıngırtıları ve uzaktan fısıltılar.', talkback: 'Zhaor Pazarı, tezgâh 44 civarında yüksek frekanslı sahte kristal tınlaması duyuluyor.',
    giris: 'Gece pazarında sahte Malazar tozuyla seyreltilmiş kaçak aether kristalleri satılıyor.',
    op: [
      A('frekans', 'İz sürme', 'Parmağını yukarı aşağı gezdir: tınlamanın en saf olduğu tezgâhı bul; orada çift dokun.', 'Sahte kristalin tezgâhı bu.', { cift: true }),
      A('kademeli', 'Kaçış koridorunu kapat', 'Kaçakçı kaçıyor! İki parmakla sağa kaydır: ses dalgasıyla koridoru kapat.', 'Kaçakçı köşeye sıkıştı.', { n: 1, yon: 'sag', parmak: 2 }),
    ],
    kararlar: [
      K('Adalete teslim et', 'Kaçakçı muhafızlara verildi; başkentte kanun düzeni arttı.', { malken_sarayi: 15 }, (d) => ml(d, 850) + ', ' + esya(d, 'gumus_rozet')),
      K('Şebekeyi rüşvetle satın al', 'Mallara el koydun; karaborsa teması artık senin.', { karaborsa: 20 }, (d) => ml(d, 1400) + ', ' + kaynak(d, 'aether', 45) + ' (saf Malazar kristal parçası)'),
    ],
  },
  {
    no: 2, kod: 'MAG-SQ-02', ad: 'Saray Altı Teleport Şebekesinde Rezonans Sızıntısı', tur: 'Teknik mühendislik, frekans hizalama', mekan: 'tenohris', fx: 0.2, fy: 0.85, yer: 'Alt Merkez İstasyon, Tentran-Loran hat odası', npc: 'Baş Mühendis Telamon Sael',
    harita: 'Magentor Yarımadası → Tenohris Sarayı → Alt Merkez İstasyon → Tentran-Loran Hat Odası',
    onkosul: [['Aether akort anahtarı', null], ['YGK mühendislik sertifikası seviye 1 (YGK kaydı)', (d) => !!d.bayrak.ygkKayit]],
    ambiyans: 'Teleport reaktörü uğultusu; aralıklı tiz arklar ve basınç tıslaması.', talkback: 'Tentran-Loran hat odası. Faz açısı kaymış; iki parmakla saat yönünde çevirin.',
    giris: 'Saraydan Tentran ve Loran\'a giden teleport hatlarında faz kayması var; rezonans tüpü aşırı ısınıyor.',
    op: [
      A('frekans', 'Basınç ayarı', 'İki parmakla saat yönünde çevir: kulaklıkta sağ-sol denge oturana kadar.', 'Faz açısı sıfırlandı.'),
      A('basinc', 'Arızalı çekirdek', 'Tüp patlamak üzere! Alarmda çift dokun: acil soğutucu. Üç kez.', 'Tüp soğudu.'),
    ],
    kararlar: [
      K('Güvenli hat restorasyonu', 'Hatlar standart kapasitede; şehir şebekesi rahatladı.', { magentor_konseyi: 10 }, (d) => ml(d, 1100) + ', ' + esya(d, 'aether_bataryasi', 2)),
      K('Aşırı yükleme itki modu', 'Hatlara gizli bir bypass valfi kurdun: gemin için hızlı tahliye kapısı.', {}, (d) => { bayrak(d, 'yan_protokol'); return 'Özel yetenek: Magentor Acil Işınlanma Protokolü (savaşta yetenek listesinde: gemiyi saray altına çeker), ' + ml(d, 750); }),
    ],
  },
  {
    no: 3, kod: 'MAG-SQ-03', ad: 'Elyndra Halkasında Kayıp Simyacının Notları', tur: 'Gizem, bulmaca, biyo-büyü', mekan: 'halka_elyndra', fx: 0.2, fy: 0.85, yer: 'Biyo-Kristal Kubbesi 3', npc: 'Botanikçi Kaelen Vey',
    harita: 'Magentor Yarımadası → Elyndra Halkası → Biyo-Kristal Kubbesi 3',
    onkosul: [['Kseno-botanik tarım bilgisi (tarım alanı açılmış olmalı)', (d) => !!d.tarim], ['Bir analiz tüpü', null]],
    ambiyans: 'Kristal damlalı fıskiyeler; fısıldayan mor yaprak hışırtısı.', talkback: 'Biyo-Kristal Kubbesi 3. Üç rezonans çiçeği; doğru tonda uğuldayanı bulun.',
    giris: 'Kayıp simyacı geride yalnız sesle açılan üç rezonans çiçeği bırakmış; polenleri zemin altındaki kasasının şifresini fısıldıyor.',
    op: [
      A('frekans', 'Akustik çiçek takibi', 'Doğru tonda uğuldayan çiçeği bul: parmağını gezdir, üstündeyken çift dokun.', 'Çiçek açıldı; polenler fısıldıyor.', { cift: true }),
      A('ton', 'Kasa açma', 'Basılı tut: polenler şifreyi üç tonla fısıldar. Sonra sırayla: kalın aşağı, tiz yukarı, orta çift dokun.', 'Kasa açıldı; simyacının notları elinde.', { n: 3 }),
    ],
    kararlar: [
      K('Notları Botanik Konseyine teslim et', 'Aethelis-IV tarım teraslarına aktarılacak resmî hibrit formülü kazanıldı.', { botanikciler: 20 }, (d) => { bayrak(d, 'yan_gubre'); return ml(d, 900) + ', ' + esya(d, 'gubre_formulu'); }),
      K('Notları şahsi seraya sakla', 'Gece açan egzotik orkide tohumları senin.', {}, (d) => esya(d, 'orkide_tohumu', 3) + ', ' + ml(d, 1200)),
    ],
  },
  {
    no: 4, kod: 'MAG-SQ-04', ad: 'Varek Kışlasında Silah Testi Kazası', tur: 'Taktik savaş, yangın söndürme', mekan: 'halka_varek', fx: 0.2, fy: 0.85, yer: 'Poligon 7', npc: 'Silah Ustası Torin Grax',
    harita: 'Magentor Yarımadası → Varek Halkası → Poligon 7',
    onkosul: [['Zırh seviyesi 2 ve üstü (bir zırh kuşanılı)', (d) => !!(d.kusanilan && d.kusanilan.zirh)], ['Plazma söndürücü', null]],
    ambiyans: 'Alarm sireni, patlamalar, alev kükremesi, çığlıklar.', talkback: 'Poligon 7. Droidin atış sesi hangi kanaldan gelirse ters yana kaydırın.',
    giris: 'Kırmızı yıldız plazmasıyla çalışan otonom bir savaş kulesi arızalanmış, etrafa ateş açıyor.',
    op: [
      A('kacin', 'Akustik siper', 'Droidin atış sesi soldan gelirse sağa, sağdan gelirse sola kaydır; dört kez.', 'Droidin arkasındasın.', { n: 4, efekt: 'el_droid' }),
      A('kenetle', 'Devre dışı bırak', 'Çift dokun: güç bağlantısını kopar.', 'Droid sustu.'),
    ],
    kararlar: [
      K('Çekirdeği güvenle parçala', 'Tehlike tamamen yok oldu; kışla kurtuldu.', { varek_muhafiz: 20 }, (d) => { d.koloni.parcalar.zirhli_plaka = (d.koloni.parcalar.zirhli_plaka || 0) + 100; return ml(d, 1300) + ', ağır balistik kalkan çeliği (100 zırhlı plaka)'; }),
      K('Çekirdeği gemi silahına dönüştür', 'Plazma modülünü söküp kruvazörüne monte ettin; şehir güvenliği zarar gördü.', { sehir_guvenligi: -5 }, (d) => esya(d, 'varek_bataryasi') + ' (envanterden gemiye tak)'),
    ],
  },
  {
    no: 5, kod: 'MAG-SQ-05', ad: 'Axira Tapınağında Kadim İlahilerin Sırrı', tur: 'Mistik, ritim eşleme', mekan: 'halka_axira', fx: 0.2, fy: 0.85, yer: 'Hayat Mabedi, Zümrüt Sütunlu Salon', npc: 'Baş Rahibe Seraphina',
    harita: 'Magentor Yarımadası → Axira Halkası → Zümrüt Sütunlu Salon',
    onkosul: [['Astral melodi algılama yeteneği (Yeşil Yıldız ekolünde Seyrüsefer Uzmanı)', kidem('axira', 2)]],
    ambiyans: 'Kutsal, yankılı koro; rüzgâr çanları ve su akışı.', talkback: 'Zümrüt Sütunlu Salon. Sütunların ritmi: bir, iki, bir, üç.',
    giris: 'Zümrüt sütunlar belirli bir vuruş ritmiyle titriyor; ritmi tutanın önünde mabedin altındaki tohum mahzeni aralanır.',
    op: [A('ritim', 'Ritim takibi', 'Ritme uygun dokun: bir, iki, bir, üç; yedi vuruş, aralarda durmadan.', 'Taş kapı aralanıyor; kadim tohum mahzeni.', { n: 7 })],
    kararlar: [
      K('Tohumları halka dağıt', 'Başkent halkı kutsal ekmeğini yapacak.', { sehir_halki: 25 }, (d) => { d.koloni.moral = Math.min(100, d.koloni.moral + 25); return 'Halk morali, ' + esya(d, 'hayat_muskasi'); }),
      K('Akademiye biyolojik incelemeye götür', 'YGK genetik araştırmaya başladı.', { akademi: 10 }, (d) => { bayrak(d, 'yan_ygk_arastirma'); return bilim(d, 1500) + ', ' + ml(d, 800) + ', YGK araştırma ilerlemesi yüzde beş'; }),
    ],
  },
  {
    no: 6, kod: 'MAG-SQ-06', ad: 'Uma Sanatçılar Sokağında Akustik Şantaj', tur: 'Sosyal casusluk, dinleme', mekan: 'halka_uma', fx: 0.8, fy: 0.85, yer: 'Kristal Tiyatro, Sanatçılar Locası', npc: 'Baş Müzisyen Orpheus Dan',
    harita: 'Magentor Yarımadası → Uma Halkası → Sanatçılar Locası',
    onkosul: [['Mikro-frekans kaydedici', null]],
    ambiyans: 'Kristal arp solosu; fısıldaşan seyirciler.', talkback: 'Sanatçılar Locası. Şantajcının fısıltısını ses yönünden bulun.',
    giris: 'Seyircilerin arasında diplomatik bir şantajcı var; cebinde soylu bir hanedanın kristal kaseti.',
    op: [
      A('yaklas', 'Casus dinleme', 'Şantajcının fısıltısını iki kulakta eşitle; yukarı kaydırıp sokul.', 'Fısıltı tam yanında; kayıt alındı.', { mesafe: 25, frek: 330 }),
      A('kademeli', 'Kaset değişimi', 'Hissettirmeden al: iki parmakla yukarı kaydır.', 'Kaset avucunda.', { n: 1, yon: 'yukari', parmak: 2 }),
    ],
    kararlar: [
      K('Kaseti soyluya iade et', 'Soylu hanedan sana minnettar.', { uma_aristokrasi: 15 }, (d) => ml(d, 1000) + ', ' + esya(d, 'konser_bileti')),
      K('Şantajcıya karşı şantaj yap', 'Büyük bir gelir; yeraltı istihbarat ağı artık sana açık.', {}, (d) => { bayrak(d, 'yan_istihbarat'); return ml(d, 2500) + ', yeraltı istihbarat ağı (karaborsada yüzde on indirim)'; }),
    ],
  },
  // --- Bölüm 2: Batı kuşağı ---
  {
    no: 7, kod: 'WST-SQ-01', ad: 'Zinas Denizi Ortasında Hayalet Ticaret Kalyonu', tur: 'Deniz keşfi, hayatta kalma', mekan: 'loran', fx: 0.8, fy: 0.85, yer: 'Batı kıyı iskelesi, Zinas açıkları', npc: 'Kaptan Marik Vane',
    harita: 'Batı Kuşağı → Zinas Denizi → Sürüklenen Kalyon Güvertesi',
    onkosul: [['Gemi sınıfı: Korvet ya da üstü', sinif(2)], ['Deniz sonarı donanımı', null]],
    ambiyans: 'Fırtına, dalgalar, tahta gıcırtısı; sis düdüğü.', talkback: 'Zinas açıkları. Sisin içindeki çıngırağa doğru dümen kırın.',
    giris: 'Yoğun sisin içinden bir çıngırak sesi; sürüklenen bir kalyonun mürettebatı hipnoz altında.',
    op: [
      A('yaklas', 'Sis içinde arama', 'Çıngırağın sesini iki kulakta eşitle; yukarı kaydırıp ilerle.', 'Kalyonun bordasındasın.', { mesafe: 45, frek: 1100 }),
      A('tut', 'Zihin kontrol kristali', 'Basılı tut: kristali kır.', 'Kristal kırıldı; mürettebat uyanıyor.'),
    ],
    kararlar: [
      K('Kalyonu çekerek Julithan limanına götür', 'Ticaret konvoyunun takdirini kazandın.', { julithan: 20 }, (d) => { muaf(d, 'korsan'); return ml(d, 1200) + ', ' + esya(d, 'ticaret_berati'); }),
      K('Yükü yağmala, gemiyi batır', 'Değerli madenler ambarda.', { julithan: -15 }, (d) => ml(d, 2200) + ', ' + kaynak(d, 'titanyum', 150) + ' (ham titanyum külçesi)'),
    ],
  },
  {
    no: 8, kod: 'WST-SQ-02', ad: 'Loran Vadisi\'nde Batık Laboratuvarın Uyanışı', tur: 'Su altı arkeolojisi, basınç yönetimi', mekan: 'loran', fx: 0.2, fy: 0.85, yer: 'Sualtı araştırma kubbesi, çökük biyo-laboratuvar', npc: 'Arkeolog Selyna Thorne',
    harita: 'Batı Kuşağı → Loran Vadisi → Çökük Biyo-Laboratuvar',
    onkosul: [['Basınç kalkanı seviye 2', null], ['Yüzey aracı Manta-01', null]],
    ambiyans: 'Boğuk su kabarcıkları; metal genleşme sesleri.', talkback: 'Çökük Biyo-Laboratuvar. Sonar dalgası gönderin; sonra vanaları ritmik kapatın.',
    giris: 'Manta aracıyla dip yarığa iniliyor; laboratuvarın odaları su almış.',
    op: [
      A('sonar', 'Dalgıç inişi', 'Basılı tut: sonar dalgası giriş kapısını açar.', 'Kapı açıldı.'),
      A('basinc', 'Basınç odası', 'Su dolan odada vanaları kapat: alarmda çift dokun, üç kez.', 'Oda kurudu.'),
    ],
    kararlar: [
      K('Kadim su-yosunu kültürünü kurtar', 'Oksijen üreten devrimsel bir biyom hücresi.', { bilim_enstitusu: 20 }, (d) => { bayrak(d, 'yan_oksijen'); return esya(d, 'oksijen_yosunu') + ', ' + ml(d, 1000); }),
      K('Enerji reaktörünü sök', 'Laboratuvar çöktü ama saf graviton hücreleri çıktı.', {}, (d) => esya(d, 'graviton_hucresi', 2) + ', ' + ml(d, 800)),
    ],
  },
  {
    no: 9, kod: 'WST-SQ-03', ad: 'Julithan Senatosunda Suikast Alarmı', tur: 'Casusluk, keskin nişancılık, akustik engelleme', mekan: 'julithan', fx: 0.2, fy: 0.85, yer: 'Mermer Senato Binası, balkonlar', npc: 'Senatör Cassian Drake',
    harita: 'Batı Kuşağı → Julithan Başkenti → Senato Balkonları',
    onkosul: [['Sonik nabız tabancası', null], ['Diplomatik geçiş belgesi (YGK kaydı)', (d) => !!d.bayrak.ygkKayit]],
    ambiyans: 'Senato tartışma uğultusu; uzaktan bir yay ya da tetik tıkırtısı.', talkback: 'Senato Balkonları. Metal sürtünmenin geldiği locaya dönün.',
    giris: 'Senatör konuşurken localardan birinden metal sürtünmesi geliyor: bir suikastçı.',
    op: [
      A('nisan', 'Tetik sesini yakala', 'Sürtünmenin geldiği yöne dön: sağa sola kaydır; tam önündeyken çift dokun.', 'Loca bulundu.', { n: 1 }),
      A('refleks', 'Sonik şok', 'Suikastçı tetiğe uzanıyor! Tık sesini duyar duymaz dokun.', 'Suikastçı sersemledi.', { n: 1 }),
    ],
    kararlar: [
      K('Suikastçıyı canlı yakala', 'Sorguda Anitor Krallığı\'nın parmağı ortaya çıktı.', { julithan_senatosu: 25 }, (d) => ml(d, 1600) + ', ' + esya(d, 'seref_madalyasi')),
      K('Kaçmasına izin ver, izini sür', 'Gizli karargâhın yeri öğrenildi: Anitor\'un cephaneliği.', {}, (d) => { d.koloni.parcalar.zirhli_plaka = (d.koloni.parcalar.zirhli_plaka || 0) + 60; return ml(d, 900) + ', Anitor gizli cephanelik koordinatları (60 zırhlı plaka ganimet)'; }),
    ],
  },
  {
    no: 10, kod: 'WST-SQ-04', ad: 'Anitor Krallığı Sınırında Firari Şövalye', tur: 'Kovalamaca, onur düellosu', mekan: 'anitor', fx: 0.2, fy: 0.85, yer: 'Brastion sınır kalesi, Kuzgun Kayalıkları', npc: 'Firari Şövalye Sir Gareth',
    harita: 'Batı Kuşağı → Anitor Sınırı → Kuzgun Kayalıkları',
    onkosul: [['Yakın dövüş zırhı (bir zırh kuşanılı)', (d) => !!(d.kusanilan && d.kusanilan.zirh)], ['Plazma kılıcı ya da baston', null]],
    ambiyans: 'Demir kılıç çarpışmaları; at toynakları ve rüzgâr.', talkback: 'Kuzgun Kayalıkları. Darbe hangi yandan gelirse o yana kaydırın: sol kalkan, sağ kılıç.',
    giris: 'Sir Gareth\'i kraliyet muhafızları kovalıyor; seni de onun yanında sanıyorlar.',
    op: [A('kacin', 'Düello', 'Darbe hangi yandan gelirse o yana kaydır: sol kalkan, sağ kılıç. Beş kez.', 'Muhafızlar geri çekildi.', { n: 5, ayni: true })],
    kararlar: [
      K('Şövalyeyi Anitor kralına teslim et', 'Kral büyük ödül verdi.', { anitor: 30 }, (d) => ml(d, 2000)),
      K('Şövalyeyi gemi mürettebatına kat', 'Efsanevi bir yakın dövüş subayı kazandın.', {}, (d) => ozel(d, 'Sir Gareth', 'Güvenlik Şefi', 'gemi içi savunma ve yatılı saldırı gücü yüzde on beş: savaşta alınan hasar ×0,87')),
    ],
  },
  {
    no: 11, kod: 'WST-SQ-05', ad: 'Filtra Oksit Dağlarında Madenci İsyanı', tur: 'Müzakere, taktik bastırma', mekan: 'filtra', fx: 0.75, fy: 0.25, yer: 'Kızılkaya Filtrum, derin cevher ocağı 9', npc: 'Maden Lideri Borok Demirçekiç',
    harita: 'Batı Kuşağı → Filtra Oksit Dağları → Derin Cevher Ocağı 9',
    onkosul: [['Karizma / diplomasi seviye 2 (Sarı Yıldız ekolünde Seyrüsefer Uzmanı) ya da ağır zırhlı birlikler (Filtra oksit zırhı)', (d) => SB.kabiliyet(d, 'uma', 2) || ZN.miktar(d, 'oksit_zirhi') > 0]],
    ambiyans: 'Maden kazmaları ve buhar kazanı; öfkeli madenci sloganları.', talkback: 'Derin Cevher Ocağı 9. Gaz sızıntısının yerini dinleyin.',
    giris: 'Madenciler zehirli gaz sızıntısı yüzünden asansörleri kilitlemiş.',
    op: [A('sonar', 'Kriz noktası', 'Basılı tut: sızıntının yerini dinle.', 'Sızıntı havalandırma bacasında.')],
    kararlar: [
      K('Havalandırmayı kendi geminden tamir et', 'Madencilerin güvenini kazanıp barışçıl bir çözüm buldun.', { filtra_madencileri: 25 }, (d) => kaynak(d, 'oksit_celik', 100) + ' (saf Filtra oksit çeliği)'),
      K('Ocakları zorla aç, elebaşlarını tutukla', 'Şirket sahipleri seni takdir ediyor.', {}, (d) => ml(d, 2400) + ', ' + esya(d, 'maden_hissesi') + ' (her gün yüz lira)'),
    ],
  },
  {
    no: 12, kod: 'WST-SQ-06', ad: 'Safran Sıradağlarında Kayıp Kervanın Çanları', tur: 'Arama-kurtarma, çığ tehlikesi', mekan: 'safran', fx: 0.75, fy: 0.75, yer: 'Altın Geçit, Kör Vadi Geçidi', npc: 'Kervancıbaşı El-Mansur',
    harita: 'Batı Kuşağı → Safran Dağları → Kör Vadi Geçidi',
    onkosul: [['Yüzey keşif aracı Nomad-01', null], ['Termal tarayıcı', null]],
    ambiyans: 'Dağ rüzgârı ve kaya düşmesi; uzaktan yankılanan pirinç deve çanları.', talkback: 'Kör Vadi Geçidi. Rüzgârın kestiği çan seslerini takip edin.',
    giris: 'Kar ve kaya altına gömülmüş bir kervan; çanları hâlâ ara ara çalıyor.',
    op: [
      A('yaklas', 'Çan akustiği', 'Çan sesini iki kulakta eşitle; yukarı kaydırıp ilerle.', 'Kervanın üstündesin.', { mesafe: 40, frek: 660 }),
      A('tut', 'Kaya kırma', 'Basılı tut: ses topuyla kayaları temizle.', 'Kayalar dağıldı; kervan açıkta.'),
    ],
    kararlar: [
      K('Önce canları kurtar', 'Kervandaki bütün yolcular sağ.', { safran_gocebeleri: 30 }, (d) => { muaf(d, 'kara_buz', 'anomali'); return ml(d, 1000) + ', ' + esya(d, 'dag_pusulasi'); }),
      K('Önce safran baharat sandıklarını çıkar', 'Paha biçilmez egzotik yük kurtuldu.', { safran_gocebeleri: -10 }, (d) => esya(d, 'safran_kristali') + ' (değeri üç bin lira)'),
    ],
  },
  // --- Bölüm 3: Doğu kuşağı ---
  {
    no: 13, kod: 'EST-SQ-01', ad: 'Ajmero Kulesi\'nde Fırtına Sığınağı', tur: 'Hayatta kalma, kule savunması', mekan: 'ajmero', fx: 0.3, fy: 0.3, yer: 'Ajmero Kulesi terası', npc: 'Kule Bekçisi Rashid',
    harita: 'Doğu Kuşağı → Zorah Çölü → Ajmero Kulesi Terası',
    onkosul: [['Çöl filtreli çevre giysisi', null], ['Kum fırtınası barometresi', null]],
    ambiyans: 'Şiddetli kum fırtınası uğultusu; taş duvara çarpan kum taneleri.', talkback: 'Ajmero Kulesi Terası. Dört sürgüyü sırayla kapatın.',
    giris: 'Manyetik bir fırtına yaklaşıyor; kulenin dört yönündeki taş sürgüler açık.',
    op: [
      A('kademeli', 'Kapıları mühürleme', 'Sürgüleri sırayla kapat: sağa kaydır, dört kez.', 'Dört sürgü de kapandı.', { n: 4, yon: 'sag', parmak: 1 }),
      A('nisan', 'Kum kertenkeleleri', 'Kuleye tırmanan kertenkelelerin sesine dön; önündeyken çift dokun: sonik darbe. Üç kez.', 'Kertenkeleler püskürtüldü.', { n: 3 }),
    ],
    kararlar: [
      K('Dışarıda kalan yabancı kervanı içeri al', 'Kuledeki oksijen riske girdi ama hayatlar kurtuldu.', { col_kabileleri: 25 }, (d) => { muaf(d, 'kum', 'serap'); return ml(d, 1200) + ', ' + esya(d, 'ruzgar_muskasi'); }),
      K('Kapıları açma, güvenliği koru', 'Kule sakinleri sorunsuz kurtuldu.', {}, (d) => { d.koloni.parcalar.plaka = (d.koloni.parcalar.plaka || 0) + 50; return ml(d, 800) + ', tamir parçaları (50 plaka)'; }),
    ],
  },
  {
    no: 14, kod: 'EST-SQ-02', ad: 'Cam Düzlüklerinde Işık Yankısı Avı', tur: 'Yaratık avı, ışık-ses bulmacası', mekan: 'cam_duzlukleri', fx: 0.75, fy: 0.75, yer: 'Erimiş cam krateri', npc: 'Usta Avcı Varis',
    harita: 'Doğu Kuşağı → Zorah Çölü → Erimiş Cam Krateri',
    onkosul: [['Lazer kırılma prizması', null], ['Rezonans yayı', null]],
    ambiyans: 'Cam uğultusu ve çınlama; çıtırdayan termal kırılmalar.', talkback: 'Erimiş Cam Krateri. Akrep görünmez; camın çınlama frekansını izleyin.',
    giris: 'Görünmez Kristal Çöl Akrebi ayak seslerinden değil, camın çınlama frekansından bulunur.',
    op: [A('frekans', 'Yankı takibi', 'Parmağını gezdir; çınlama akrebin üstünde netleşir; orada çift dokun.', 'Akrep yakalandı.', { cift: true })],
    kararlar: [
      K('Akrebi öldür, zehir kesesini al', 'Silah ve ilaç sanayii için nadir bir sıvı.', { avcilar: 20 }, (d) => ml(d, 2000) + ', ' + esya(d, 'akrep_zehri', 3)),
      K('Canlı tuzağa düşür, koloniye götür', 'Savunma droidi zırhı için canlı biyo-örnek.', {}, (d) => { if (!d.kodeks.some((x) => x.id === 'cam_akrebi')) d.kodeks.push({ id: 'cam_akrebi', ad: 'Kristal Çöl Akrebi', tarif: 'Zorah\'ın cam düzlüklerinde yaşayan, yalnız camın çınlamasından fark edilen görünmez akrep. Kolonide biyo-kubbede yaşıyor.', itibar: 10 }); return bilim(d, 1500) + ', koloni biyo-kubbelerine canlı tür'; }),
    ],
  },
  {
    no: 15, kod: 'EST-SQ-03', ad: 'Nirdol Boynunda Haydut Pususu ve Barikat', tur: 'Akustik taktik savaş', mekan: 'hardrin', fx: 0.25, fy: 0.85, yer: 'Nirdol Boynu geçidi', npc: 'Muhafız Yüzbaşısı Korgan',
    harita: 'Doğu Kuşağı → Mavi Hardrin Dağları → Nirdol Boğazı',
    onkosul: [['Savaş seviyesi 15 ve üstü (Kırmızı Yıldız ekolünde Seyrüsefer Uzmanı)', kidem('varek', 2)], ['Zırh kalkanı', null]],
    ambiyans: 'Pusu: ok ve kurşun sesleri; kanyon yankısı.', talkback: 'Nirdol Boğazı. Yankının asıl kaynağına dönün.',
    giris: 'Haydutlar yüksek kayalıklardan ateş açıyor; kanyon her atışı üç kez yankılıyor.',
    op: [A('nisan', 'Kanyonda yankı savaşı', 'Yankılanan silah sesinin asıl kaynağına dön; önündeyken çift dokun: sonik topla kaya yuvarla. Üç kez.', 'Haydutların mevzileri çöktü.', { n: 3 })],
    kararlar: [
      K('Haydut liderini düelloya çağır', 'Lideri yendin; çete dağıldı.', { kervan_loncasi: 20 }, (d) => ml(d, 1800) + ', ' + esya(d, 'haydut_tabancasi')),
      K('Kanyonu patlatıp geçidi kapat', 'Haydutlar gömüldü; ticaret yolu bir hafta kapalı.', {}, (d) => { d.yan.nirdolKapali = ((d.zaman && d.zaman.sn) || 0) + 7 * 7200; return ml(d, 2200) + ' (yağmalanan sandıklardan), geçici ticaret kesintisi'; }),
    ],
  },
  {
    no: 16, kod: 'EST-SQ-04', ad: 'Morluk Kapısı\'nda Mavi Kristal Uğultusu', tur: 'Manyetik frekans dengeleme', mekan: 'golge_hatti', fx: 0.8, fy: 0.3, yer: 'Morluk Kapısı, Mavi Işık Kemeri', npc: 'Keşiş Eldor',
    harita: 'Doğu Kuşağı → Mavi Hardrin Dağları → Mavi Işık Kemeri',
    onkosul: [['Manyetik ayar çatalı', null], ['Aether izolasyon eldiveni', null]],
    ambiyans: 'Derin manyetik bas uğultusu; statik kıvılcımlar.', talkback: 'Mavi Işık Kemeri. İki parmakla çevirerek manyetik düğümleri sıfırlayın.',
    giris: 'Hardrin\'in gece ışığı dengesizleşmiş, kervanların pusulalarını bozuyor.',
    op: [A('rotasyon', 'Manyetik dengeleme', 'İki parmakla kesintisiz çevir: düğümler sıfırlanana dek.', 'Mavi ışık dengelendi.', { radyan: 8 })],
    kararlar: [
      K('Frekansı doğal mavi ışığa sabitle', 'Dağın bin yıllık mistik dengesi korundu.', { dogu_kesisleri: 30 }, (d) => esya(d, 'mavi_prizma')),
      K('Enerjiyi gemi kalkanlarına şarj et', 'Gemi geçici olarak sınırsız kalkan enerjisi çekti.', {}, (d) => { d.yan.hardrinBariyer = 3; return 'Hardrin manyetik bariyeri: üç çatışma boyunca alınan hasar yarı'; }),
    ],
  },
  {
    no: 17, kod: 'EST-SQ-05', ad: 'Doğu Kırık Vadisi\'nde Çökmüş Güneş Tapınağı', tur: 'Zindan keşfi, labirent', mekan: 'kirik_vadi', fx: 0.2, fy: 0.8, yer: 'Yeraltı Güneş Mahzeni', npc: 'Tarihçi Alim Tariq',
    harita: 'Doğu Kuşağı → Doğu Kırık Vadi → Yeraltı Güneş Mahzeni',
    onkosul: [['Taşınabilir projektör', null], ['Sismik tarayıcı', null]],
    ambiyans: 'Damlayan su ve toz dökülmesi; uzak metal sürtünmeleri.', talkback: 'Yeraltı Güneş Mahzeni. Bastonun yankısını dinleyin: uzun yankı uçurum, kısa tok ses açık kapı.',
    giris: 'Kör karanlıkta yön, duvara vurulan bastonun yankısından bulunur.',
    op: [A('ton', 'Sesle yön bulma', 'Basılı tut: dört koridorun yankısı çalar. Sonra sırayla doğru kapıları seç: kalın aşağı kaydır, tiz yukarı kaydır, orta çift dokun.', 'Güneş mahzenindesin; kadim küre önünde.', { n: 4 })],
    kararlar: [
      K('Kadim güneş küresini yerinde bırak', 'Tapınak ayakta; hiyeroglifler kopyalandı.', { akademi: 20 }, (d) => { if (!d.kodeks.some((x) => x.id === 'gunes_tapinagi')) d.kodeks.push({ id: 'gunes_tapinagi', ad: 'Doğu Kırık Vadisi Güneş Tapınağı', tarif: 'Yer kabuğunun yarıldığı vadide çökmüş antik bir güneş tapınağı; mahzenindeki küre gün ışığını yeraltına taşırmış.', itibar: 15 }); return bilim(d, 1800) + ', antik tarih kodeks kaydı'; }),
      K('Küreyi söküp al', 'Tapınak çökerken kaçtın; paha biçilmez bir antika.', {}, (d) => { if (d.gemi) d.gemi.govde = Math.max(1, d.gemi.govde - 10); return esya(d, 'gunes_kuresi') + ' (karaborsada üç bin beş yüz lira), kaçarken küçük hasar'; }),
    ],
  },
  {
    no: 18, kod: 'EST-SQ-06', ad: 'Kahergonat Sınırında Firari Tarikatçının İtirafları', tur: 'Casusluk, sorgu, ahlaki tercih', mekan: 'kahergonat', fx: 0.15, fy: 0.85, yer: 'Kahergonat Yolu sınır karakolu, karakol hücresi', npc: 'Muhafız Teğmeni Selim',
    harita: 'Doğu Kuşağı → Kahergonat Sınır Hattı → Karakol Hücresi',
    onkosul: [['Zihin koruma tılsımı', null]],
    ambiyans: 'Fırtına ve zincir sesleri; boğuk fısıltılar.', talkback: 'Karakol Hücresi. İki sesten gerçek olanın frekansına odaklanın.',
    giris: 'Tarikatçı aynı anda iki sesle konuşuyor: kendi sesi ve Lord Sharon\'un fısıltısı.',
    op: [A('frekans', 'Fısıltıyı ayrıştırma', 'İki parmakla çevir: adamın gerçek sesinin frekansını bul ve tut.', 'Adamın gerçek bilinci konuşuyor.')],
    kararlar: [
      K('Tarikatçıyı idamdan kurtarıp tedavi et', 'Yaşadı ve Kahergonat\'ın gizli arka giriş haritasını verdi.', {}, (d) => esya(d, 'gecit_haritasi') + ', ' + ml(d, 1000)),
      K('Hemen idam et', 'Karanlık enerjinin karakola bulaşması önlendi.', { sinir_muhafiz: 15 }, (d) => ml(d, 1500)),
    ],
  },
  // --- Bölüm 4: Kuzey kuşağı ---
  {
    no: 19, kod: 'NTH-SQ-01', ad: 'Halyon Sürgün Adasında Kaçak Simyacı Vakası', tur: 'Firar kovalamacası, büyü düellosu', mekan: 'halyon', fx: 0.2, fy: 0.85, yer: 'Halyon Adası kayalıkları', npc: 'Cezaevi Müdürü Orik',
    harita: 'Kuzey Kuşağı → Mormon Denizi → Halyon Adası Kayalıkları',
    onkosul: [['Gemi sınıfı: Korvet ya da Fırkateyn', sinif(2)], ['Donma önleyici motor ısıtıcıları', null]],
    ambiyans: 'Karanlık dalgalar ve sürgün çığlıkları; büyü patlamaları.', talkback: 'Halyon kayalıkları. Buz kalkanının frekansını tersine çevirin.',
    giris: 'Deli simyacı etrafına buzdan bir kalkan örmüş; büyüleri kayalara çarpıyor.',
    op: [A('frekans', 'Büyü kalkanını kırma', 'İki parmakla çevir: kalkanın tonunu bul, ters fazla tut.', 'Kalkan çatladı; simyacı diz çöktü.')],
    kararlar: [
      K('Simyacıyı hücresine geri koy', 'Kanunlara sadık kaldın.', { mormon_muhafiz: 25 }, (d) => { esya(d, 'halyon_prangasi'); return ml(d, 1500) + ', Halyon sürgün prangası (itibar kanıtı)'; }),
      K('Gemine kaçır, laboratuvara al', 'Tehlikeli ama dâhi bir silah mühendisi kazandın.', { yasal: -15 }, (d) => { esya(d, 'halyon_prangasi'); return ozel(d, 'Deli Simyacı Malakor', 'Silah Mühendisi', 'torpido patlama yarıçapı yüzde yirmi: torpido hasarı ×1,2'); }),
    ],
  },
  {
    no: 20, kod: 'NTH-SQ-02', ad: 'Gümüş Tüy Takımadalarında Göçmen Kuşların Çığlığı', tur: 'Ekolojik kurtarma, akustik yön bulma', mekan: 'gumus_tuy', fx: 0.2, fy: 0.85, yer: 'Yuva kayalıkları', npc: 'Kuşbilimci Elspeth',
    harita: 'Kuzey Kuşağı → Gümüş Tüy Adaları → Yuva Kayalıkları',
    onkosul: [['Biyo-akustik sensör modülü', null]],
    ambiyans: 'Binlerce martı ve kuş kanadı; sis düdüğü.', talkback: 'Yuva Kayalıkları. Korsan kulesinin anten frekansını değiştirin.',
    giris: 'Terk edilmiş bir korsan telsiz kulesi kuşların yönünü şaşırtıp kayalara çarpmalarına yol açıyor.',
    op: [A('frekans', 'Sinyal parazitini kesme', 'Kuleye tırmandın. İki parmakla çevir: antenin frekansını kuşların göç tonuna çek.', 'Kuşlar yönünü buldu.', { efekt: 'el_kus' })],
    kararlar: [
      K('Kuleyi kuş sığınağı olarak yeniden programla', 'Ekolojik denge korundu.', { doga_koruma: 30 }, (d) => esya(d, 'gumus_tuy', 50)),
      K('Kuleyi askerî erken uyarı radarına çevir', 'Kuzey donanması için bir üs.', {}, (d) => { muaf(d, 'mormon', 'toz_sisi'); return ml(d, 1800) + ', Mormon Denizi radar haritası (sisli havada tam görüş: Mormon tehlikeleri işlemez)'; }),
    ],
  },
  {
    no: 21, kod: 'NTH-SQ-03', ad: 'Zeris Kulesi Tepesinde Yıldız Parazitleri', tur: 'Yüksek irtifa savaş, droid bakımı', mekan: 'zeris', fx: 0.8, fy: 0.85, yer: 'Açık çatı gözlem platformu', npc: 'Baş Gözlemci Valerius',
    harita: 'Kuzey Kuşağı → Zeris Kulesi → Açık Çatı Gözlem Platformu',
    onkosul: [['Yüksek irtifa oksijen maskesi', null], ['Statik boşaltıcı', null]],
    ambiyans: 'Sert rüzgâr ve inleyen metal kule; kozmik vızıltı.', talkback: 'Açık Çatı Gözlem Platformu. Parazitlerin sesine dönüp vurun.',
    giris: 'Kulenin en üstündeki merceklere etobur yıldız parazitleri yapışmış.',
    op: [A('nisan', 'Platformda yürüyüş', 'Parazitin sesine dön: sağa sola kaydır; önündeyken çift dokun. Dört kez.', 'Mercekler temiz.', { n: 4 })],
    kararlar: [
      K('Mercekleri temizleyip teleskobu onar', 'Uzayın derinliklerini tarayan teleskop yeniden açıldı.', { ygk_astronomi: 20 }, (d) => { esya(d, 'zeris_aynasi'); return bilim(d, 2000) + ', ' + esya(d, 'yildiz_atlasi') + ', merceğin taşınabilir kopyası: Zeris Yıldız Aynası'; }),
      K('Parazitlerin enerjisini gemi sensörüne çek', 'Amiral geminin tarama menzili ikiye katlandı.', {}, (d) => { esya(d, 'zeris_aynasi'); return esya(d, 'parazit_sensoru') + ' (envanterden gemiye tak), Zeris Yıldız Aynası'; }),
    ],
  },
  {
    no: 22, kod: 'NTH-SQ-04', ad: 'Norvask Buz Krallığında Donmuş Mamut Mezarı', tur: 'Kazı, paleontoloji, buz kırma', mekan: 'norvask', fx: 0.2, fy: 0.3, yer: 'Fiyort Vadisi, Buzul Mağarası 12', npc: 'Buz Avcısı Jarek',
    harita: 'Kuzey Kuşağı → Norvask Krallığı → Buzul Mağarası 12',
    onkosul: [['Termal lazer kesici', null], ['Ağır kışlık giysi (termal giysi ya da kriyo çalışması)', null]],
    ambiyans: 'Çatırdayan buzullar ve damlalar; lazer cızırtısı.', talkback: 'Buzul Mağarası 12. Isı yükselirken alarmda bırakın; buzul çökmesin.',
    giris: 'Buzun içinde bir mamut; aşırı ısı verilirse mağara çöker.',
    op: [A('basinc', 'Buz çözme ritimleri', 'Lazer ısıtıyor; ısı alarmında çift dokun: kes. Üç kez, kontrollü eritme.', 'Mamut buzdan çıktı.')],
    kararlar: [
      K('Fosil kemikleri ve dişleri müze için çıkar', 'Büyük bir arkeolojik değer.', { norvask: 25 }, (d) => ml(d, 2200)),
      K('Bozulmamış hücreyi ve geni klonlama için al', 'Biyoteknolojik deneyler.', {}, (d) => esya(d, 'gen_kapsulu')),
    ],
  },
  {
    no: 23, kod: 'NTH-SQ-05', ad: 'Helgar Kara Buz Dükalığında Kaçakçılık Ağı', tur: 'Pusu, soğuk takip', mekan: 'helgar', fx: 0.2, fy: 0.3, yer: 'Kara Buz Limanı, buz altı tünelleri', npc: 'Gümrük Şefi Brann',
    harita: 'Kuzey Kuşağı → Helgar Dükalığı → Buz Altı Tünelleri',
    onkosul: [['Kızılötesi kar gözlüğü', null], ['Susturuculu silah', null]],
    ambiyans: 'Ayak altında ezilen buz; fısıldayan tüccarlar.', talkback: 'Buz Altı Tünelleri. Yavaş, tek tek dokunarak ilerleyin; hızlanırsanız nöbetçiler uyanır.',
    giris: 'Kara buz kristali kaçıran bir konvoy tünellerde ilerliyor.',
    op: [A('yaklas', 'Tünelde sessiz ilerleme', 'Konvoyun sesini iki kulakta eşitle; yalnız dokunarak, adım adım ilerle. Yukarı kaydırma: nöbetçiler uyanır.', 'Konvoyun tam arkasındasın.', { mesafe: 32, sessiz: true, frek: 260 })],
    kararlar: [
      K('Kaçakçıları tutukla, yüke el koy', 'Helgar Dükü seni ödüllendirdi.', { helgar: 30 }, (d) => ml(d, 1800)),
      K('Kristalleri kendin al, kaçakçıları sal', 'Silah sanayii için ultra keskin bir madde.', {}, (d) => esya(d, 'kara_buz_parcasi', 40)),
    ],
  },
  {
    no: 24, kod: 'NTH-SQ-06', ad: 'Drahmir Sınırında Donmuş Gözcü Kulesi', tur: 'Savunma, barikat', mekan: 'drahmir', fx: 0.8, fy: 0.85, yer: 'Kahergonat kuzey sınır kalesi, Burç 3', npc: 'Yüzbaşı Vorn',
    harita: 'Kuzey Kuşağı → Drahmir Sınırı → Burç 3',
    onkosul: [['Ağır plazma tüfeği (Filtra Ağır Plazma Tüfeği)', var_('plazma_tufegi')], ['Taktik kalkan', null]],
    ambiyans: 'Kara rüzgâr ve canavar ulumaları; dövülen çelik kapı.', talkback: 'Burç 3. Yaratığın sesi hangi yandansa o yana ateş edin.',
    giris: 'Kahergonat\'ın kara sisinden çıkan buz yaratıkları kuleye tırmanıyor.',
    op: [A('kacin', 'Karanlık yaratık püskürtme', 'Sesin geldiği yana seri ateş: aynı yana kaydır, beş kez.', 'Yaratıklar çekildi.', { n: 5, ayni: true })],
    kararlar: [
      K('Kuleyi sonuna kadar savun', 'Drahmir kraliyet hattı düşmedi.', { drahmir: 35 }, (d) => ml(d, 2500) + ', ' + esya(d, 'drahmir_kalkani')),
      K('Askerleri tahliye et, kuleyi patlat', 'Can kaybı yok; canavarlar patlamada yok oldu.', {}, (d) => {
        const r = uretec((d.tohum || 1) * 77 + 24);
        for (let i = 0; i < 3; i++) d.murettebat.push(uyeUret(r, 'muharebe', d.murettebat.map((u) => u.ad)));
        return ml(d, 1500) + ', kurtarılan askerlerden sadakat yemini: gemiye üç yeni mürettebat';
      }),
    ],
  },
  // --- Bölüm 5: Güney kuşağı ---
  {
    no: 25, kod: 'STH-SQ-01', ad: 'Fleeplee Sahilinde Işık Tozu Fırtınası', tur: 'Hasat, toz manyetizması', mekan: 'flee_plee', fx: 0.8, fy: 0.3, yer: 'Toz toplayıcı iskelesi, Işık Kumsalı', npc: 'Balıkçı Reisi Morwen',
    harita: 'Güney Kuşağı → Fleeplee Sahili → Işık Kumsalı',
    onkosul: [['Toz süzgeci ağları', null], ['Toz geçirmez tulum', null]],
    ambiyans: 'Toz dalgalarının yumuşak fısıltısı; parlayan kristal çanlar.', talkback: 'Işık Kumsalı. Dalga yükselirken iki parmakla aşağı kaydırın: ağları gerin.',
    giris: 'Fenrir\'den altın sarısı bir toz dalgası yükseliyor.',
    op: [A('kademeli', 'Toz dalgasını yakalama', 'İki parmakla aşağı kaydır: ağları ger. Üç kez.', 'Ağlar tozla dolu.', { n: 3, yon: 'asagi', parmak: 2 })],
    kararlar: [
      K('Tozu köyün ortak ambarına bırak', 'Balıkçı köyü kışı refah içinde geçirecek.', { fleeplee: 35 }, (d) => esya(d, 'toz_pelerini')),
      K('Tozu kendi laboratuvarına yükle', 'Gemi jeneratörleri için saf biyo-ışık yakıtı.', {}, (d) => esya(d, 'isik_yakiti', 10) + ' (250 litre), ' + ml(d, 1000)),
    ],
  },
  {
    no: 26, kod: 'STH-SQ-02', ad: 'Tentran Işınlanma Platformunda Graviton Sapması', tur: 'Yüksek mühendislik, ağırlıksızlık bulmacası', mekan: 'aether_dock', fx: 0.85, fy: 0.15, yer: 'İtki kontrol merkezi, havadaki ana itki halkası', npc: 'Baş Mimar Zephyra',
    harita: 'Güney Kuşağı → Tentran Platformu → Havadaki Ana İtki Halkası',
    onkosul: [['Graviton ayar anahtarı', null], ['Yerçekimi botları', null]],
    ambiyans: 'İtki motoru ve rüzgâr uğultusu; yerçekimi boşalma sesi.', talkback: 'Ana itki halkası. Sesin en yoğun olduğu rotora süzülün, çift dokunarak kilitleyin.',
    giris: 'Platformun itim jeneratörlerinden biri bozulmuş; şehir havada yan yatıyor.',
    op: [
      A('yaklas', 'Sıfır yerçekimi', 'Arızalı rotorun sesini iki kulakta eşitle; yukarı kaydırıp süzül.', 'Rotorun dibindesin.', { mesafe: 35, frek: 150 }),
      A('kenetle', 'Rotoru kilitle', 'Çift dokun.', 'Rotor kilitlendi; platform dengede.'),
    ],
    kararlar: [
      K('Ana rotoru onar', 'Şehir yatay dengesine kavuştu.', { tentran: 30 }, (d) => { bayrak(d, 'yan_tentran_bakim'); return ml(d, 2200) + ', şehirde ücretsiz gemi bakımı (YGK iskelesinde onarım ücretsiz)'; }),
      K('Rotorun iticisini gemine çift motor olarak bağla', 'Tentran acil durum desteğiyle idare ediyor; gemin süper hız kazandı.', {}, (d) => { bayrak(d, 'yan_cift_graviton'); return 'Tentran Çift Graviton İtkisi: seyir hızı yüzde yirmi beş fazla'; }),
    ],
  },
  {
    no: 27, kod: 'STH-SQ-03', ad: 'Uçan Arin Adası\'nda Kanatlı Elçinin Gizli Mektubu', tur: 'Diplomatik casusluk, havada takip', mekan: 'arin', fx: 0.85, fy: 0.85, yer: 'Yüksek Gökyüzü Sarayı, Rüzgâr Kulesi', npc: 'Kanatlı Elçi Aethelgard',
    harita: 'Güney Kuşağı → Uçan Arin Adası → Rüzgâr Kulesi',
    onkosul: [['Uçan araç ya da planör modülü (rezonans kayığı)', (d) => !!d.bayrak.aetherKayigi], ['Şifre çözücü çip', null]],
    ambiyans: 'Kanat çırpma ve hafif arp melodisi; bulut hışırtısı.', talkback: 'Rüzgâr Kulesi. Casus kuşu izleyin; rüzgâra göre dümen kırın.',
    giris: 'Arin\'den güney krallıklarına gizli bir mektup taşıyan casus bir kuş havalanıyor.',
    op: [A('denge', 'Hava takibi', 'Sürükleyerek dümeni tut: kuşun sesi tam önünde kalsın, iki ton birleşsin.', 'Kuş indi; mektup elinde.', { eksen: 'yatay' })],
    kararlar: [
      K('Mektubu değiştirmeden yerine ulaştır', 'İki krallık arasında savaş önlendi.', { arin: 30 }, (d) => ml(d, 1500) + ', ' + esya(d, 'gok_yuzugu')),
      K('Mektubu okuyup şantaj için kopyala', 'Yüksek bir siyasi koz.', {}, (d) => ml(d, 3000) + ', ' + esya(d, 'askeri_plan')),
    ],
  },
  {
    no: 28, kod: 'STH-SQ-04', ad: 'Veradon Limanında Bataklık Korsanları Ablukası', tur: 'Deniz savaşı, taktik havan atışı', mekan: 'veradon', fx: 0.85, fy: 0.15, yer: 'Dış fener kulesi, dış dalgakıran barikatı', npc: 'Liman Valisi Roderick',
    harita: 'Güney Kuşağı → Veradon Limanı → Dış Dalgakıran Barikatı',
    onkosul: [['Gemi sınıfı: Kruvazör ya da donanımlı Fırkateyn', sinif(3)]],
    ambiyans: 'Top atışları ve su patlamaları; sis çanı ve haykırışlar.', talkback: 'Dış Dalgakıran. Korsan zırhlılarının motor odalarını sesle hedefleyin.',
    giris: 'Keralon bataklıklarından gelen dört korsan zırhlısı limanı kapatmış.',
    op: [A('nisan', 'Korsan barikatını kırma', 'Motor odasının sesine dön; önündeyken çift dokun. Dört zırhlı.', 'Barikat kırıldı.', { n: 4 })],
    kararlar: [
      K('Korsan gemilerini batır', 'Liman trafiği anında açıldı.', { veradon: 35 }, (d) => { esya(d, 'veradon_defteri'); return ml(d, 2800) + ', ' + esya(d, 'liman_nisani') + ', enkazdan Veradon korsan seyir defteri'; }),
      K('Korsan amiralini esir al, gemisini filoya kat', 'Donanmana bir korsan gemisi katıldı.', {}, (d) => {
        if (!d.filo) d.filo = [];
        d.filo.push({ ad: 'Zırhlı Korsan Korveti', sinif: 2, govde: 120, maxGovde: 120, moduller: {}, yakit: 40, maxYakit: 40, yer: 'kizak', atamalar: {}, odul: true });
        esya(d, 'veradon_defteri');
        return 'Zırhlı Korsan Korveti refakatçi olarak filoda, ' + ml(d, 1200) + ', amiralin seyir defteri';
      }),
    ],
  },
  {
    no: 29, kod: 'STH-SQ-05', ad: 'Tharal Krallığında Antik Işık Tozu Değirmeni', tur: 'Bulmaca, çark mekaniği', mekan: 'tharal', fx: 0.2, fy: 0.85, yer: 'Işık Vadisi, Büyük Kristal Değirmen', npc: 'Değirmenci Yaşlı Bran',
    harita: 'Güney Kuşağı → Tharal Krallığı → Büyük Kristal Değirmen',
    onkosul: [['Kinetik kaldıraç aleti', null]],
    ambiyans: 'Dev dişli ve su çarkı dönüşü; toz akışı fısıltısı.', talkback: 'Büyük Kristal Değirmen. Dişlilerin sesine göre ritmik dokunun.',
    giris: 'Değirmenin dev kristal çarkları sıkışmış.',
    op: [A('ritim', 'Çarkları hizalama', 'Dişlilerin sesine göre ritmik dokun; aksatmadan altı kez.', 'Çarklar dönüyor.', { n: 6 })],
    kararlar: [
      K('Değirmeni halkın un ve toz üretimine bırak', 'Yerel halkın gıda sorunu çözüldü.', { tharal: 25 }, (d) => { bayrak(d, 'yan_tharal_rasyon'); return 'Yaşam boyu ücretsiz ekmek ve rasyon: ambarda her gün iki Malken sefer rasyonu hazır'; }),
      K('Değirmeni saf aether tozu rafinerisine çevir', 'Büyücüler için yüksek safiyette toz.', {}, (d) => { bayrak(d, 'yan_aether_tozu'); return 'Haftada elli saf aether tozu (büyü tozu) pasif gelir, ' + ml(d, 1400); }),
    ],
  },
  {
    no: 30, kod: 'STH-SQ-06', ad: 'Keralon Bataklıklarında Sis Feneri Canavarı', tur: 'Efsanevi yaratık avı, körleme dövüş', mekan: 'keralon', fx: 0.2, fy: 0.85, yer: 'Çürük Su Kulübesi, Kör Sis Çukuru', npc: 'Bataklık Cadısı Moira',
    harita: 'Güney Kuşağı → Keralon Bataklıkları → Kör Sis Çukuru',
    onkosul: [['Asit geçirmez zırh (bir zırh kuşanılı)', (d) => !!(d.kusanilan && d.kusanilan.zirh)], ['Güçlü fener', null], ['Şok mızrağı', null]],
    ambiyans: 'Bataklık vıcıklaması ve boğuk gürültü; hipnotik çan tınlaması.', talkback: 'Kör Sis Çukuru. Fenerin ışığı yanıltır; yalnız göğüs hırıltısını dinleyin.',
    giris: 'Canavar kafasındaki parlayan feneri sallayarak kurbanlarını çekiyor. Görsel fener yanıltıcı; yalnız derin göğüs hırıltısı gerçek.',
    op: [A('nisan', 'Sahte fener tuzağı', 'Hırıltıya dön: sağa sola kaydır; önündeyken çift dokun. Üç vuruş.', 'Canavar yere serildi.', { n: 3, efekt: 'el_canavar' })],
    kararlar: [
      K('Canavarı öldür, fener kristalini al', 'Gece görüş kalkanı için efsanevi bir aydınlatıcı.', {}, (d) => ml(d, 3200) + ', ' + esya(d, 'feneri_kristali')),
      K('Canavarı ehlileştir, bataklık koruyucusu yap', 'Bataklık köyleri korsanlardan korunacak.', { keralon: 40 }, (d) => { muaf(d, 'bataklik'); return 'Bölgeden geçerken asla saldırıya uğramama ayrıcalığı (bataklık tehlikesi işlemez)'; }),
    ],
  },
];
export const YAN_GOREV = Object.fromEntries(YAN.map((g) => [g.no, g]));
// Eşya-zanaat rehberinin 4. bölümündeki görev yadigârları ve belgeleri yan görevlerden gelir
const YADIGAR = { 8: 'loran_tableti', 11: 'filtra_sartnamesi', 13: 'ajmero_kuresi', 20: 'mormon_pusulasi', 26: 'tentran_izni' };
const MK = { ...T_MEKANLAR, ...A_MEKANLAR };
export const YAN_NOKTALARI = {};
for (const g of YAN) {
  const a = MK[g.mekan].alan;
  YAN_NOKTALARI['yan_' + g.no] = { mekan: g.mekan, x: Math.round((a.bati + (a.dogu - a.bati) * g.fx) * 10) / 10, y: Math.round((a.guney + (a.kuzey - a.guney) * g.fy) * 10) / 10, ad: g.yer + ': ' + g.npc, tarif: g.npc + '. ' + g.giris, yaricap: 2, yan: g.no };
}

// Fraksiyon adları (bölüm 6 itibar matrisi)
export const FRAKSIYONLAR = {
  malken_sarayi: 'Malken Sarayı', karaborsa: 'Yeraltı karaborsası', magentor_konseyi: 'Magentor Konseyi', botanikciler: 'Botanikçiler',
  varek_muhafiz: 'Varek Muhafızları', sehir_guvenligi: 'Şehir güvenliği', sehir_halki: 'Şehir halkı', akademi: 'Akademi', uma_aristokrasi: 'Uma aristokrasisi',
  julithan: 'Julithan Cumhuriyeti', bilim_enstitusu: 'Bilim Enstitüsü', julithan_senatosu: 'Julithan Senatosu', anitor: 'Anitor Krallığı',
  filtra_madencileri: 'Filtra madencileri', safran_gocebeleri: 'Safran göçebeleri', col_kabileleri: 'Çöl kabileleri', avcilar: 'Avcılar Loncası',
  kervan_loncasi: 'Kervan Loncası', dogu_kesisleri: 'Doğu keşişleri', sinir_muhafiz: 'Sınır muhafızları', mormon_muhafiz: 'Cezaevi idaresi',
  yasal: 'Yasal itibar', doga_koruma: 'Doğa koruma', ygk_astronomi: 'YGK astronomi', norvask: 'Norvask Krallığı', helgar: 'Helgar Dükalığı',
  drahmir: 'Drahmir Krallığı', fleeplee: 'Fleeplee köyü', tentran: 'Tentran Teknoloji Konseyi', arin: 'Arin Ada Krallığı', veradon: 'Veradon ticareti',
  tharal: 'Tharal halkı', keralon: 'Keralon halkı',
};

// Operasyonlar
for (const g of YAN) OPERASYONLAR['yan' + g.no] = { yuzey: true, final: true, yan: g.no, adimlar: g.op, sonuc: () => [], odul: {}, sahne: 'yan_karar' };

// --- Durum ---
export function yan(d) {
  if (!d.yan) d.yan = { aktif: null, biten: [], karar: {}, itibar: {}, bilim: 0, ozel: [], gun: null, odunc: [] };
  ZN.hazirla(d);
  return d.yan;
}
export function ozelVar(d, ad) {
  return !!(d.yan && d.yan.ozel.some((x) => x.ad.indexOf(ad) >= 0));
}
export function onkosulMetni(d, g) {
  return g.onkosul.map(([ad, f]) => ad + (f ? (f(d) ? ': tamam' : ': eksik') : ': görevi veren ödünç verir')).join('; ');
}
function eksikler(d, g) {
  return g.onkosul.filter(([, f]) => f && !f(d)).map(([ad]) => ad);
}
export function noktaMi(id) {
  return !!YAN_NOKTALARI[id];
}
export function noktaEylemleri(d, id) {
  const y = yan(d);
  const no = YAN_NOKTALARI[id].yan;
  const g = YAN_GOREV[no];
  const e = [];
  if (y.biten.includes(no)) e.push({ id: 'yn_bitti_' + no, etiket: g.npc + ' ile konuş', ipucu: 'Görev tamam.' });
  else if (y.aktif === no && d.op && d.op.id === 'yan' + no) e.push({ id: 'yn_devam_' + no, etiket: 'Göreve dön: ' + g.ad });
  else e.push({ id: 'yn_bas_' + no, etiket: 'Yan görev: ' + g.ad, ipucu: g.kod + ', ' + g.tur + '. Ön koşullar: ' + onkosulMetni(d, g) });
  e.push({ id: 'incele', etiket: 'İncele' });
  return e;
}
export function eylemUygula(d, id, eid) {
  const y = yan(d);
  const no = YAN_NOKTALARI[id].yan;
  const g = YAN_GOREV[no];
  if (eid === 'incele') return { metin: YAN_NOKTALARI[id].tarif };
  if (eid.indexOf('yn_bitti_') === 0) return { metin: g.npc + ': "' + (y.karar[no] === 'B' ? 'Seçimini unutmayacağız, Kaptan.' : 'Yaptığını unutmayacağız, Kaptan.') + '"' };
  if (eid.indexOf('yn_devam_') === 0) return { opDevam: true, metin: '' };
  if (eid.indexOf('yn_bas_') === 0) {
    if (y.aktif && y.aktif !== no) return { metin: 'Önce sürmekte olan yan görevi bitir: ' + YAN_GOREV[y.aktif].ad + '.', ses: 'red' };
    if (d.op) return { metin: 'Başka bir operasyon sürüyor.', ses: 'red' };
    const e = eksikler(d, g);
    if (e.length) return { metin: g.npc + ' başını sallıyor: önce şunlar gerekir: ' + e.join('; ') + '.', ses: 'red' };
    y.aktif = no;
    d.sahne = 'yan_giris';
    return { metin: '' };
  }
  return { metin: '' };
}

function itibarEkle(d, it) {
  const y = yan(d);
  const l = [];
  for (const k of Object.keys(it || {})) {
    y.itibar[k] = (y.itibar[k] || 0) + it[k];
    d.itibar += Math.max(0, it[k]);
    l.push((it[k] > 0 ? '+' : '') + it[k] + ' ' + FRAKSIYONLAR[k]);
  }
  return l.join(', ');
}

export const SAHNELER = {
  yan_giris: {
    baslik: 'Yan görev',
    efekt: ['telsiz_zil'],
    metin: (d) => {
      const g = YAN_GOREV[yan(d).aktif];
      if (!g) return [];
      return [g.kod + '. ' + g.ad + '. ' + g.tur + '.', 'Görev veren: ' + g.npc + '. Harita: ' + g.harita + '.', 'Ön koşullar: ' + onkosulMetni(d, g) + '.', g.ambiyans, g.giris, 'Ekran okuyucu: ' + g.talkback];
    },
    secenekler: (d) => {
      const y = yan(d);
      const g = YAN_GOREV[y.aktif];
      if (!g) return [{ etiket: 'Devam', sonra: null }];
      return [
        { etiket: 'Başla', yap: () => { if (g.onkosul.some(([, f]) => !f) && !y.odunc.includes(g.no)) { y.odunc.push(g.no); ZN.ekle(d, 'gorev_gereci', 1); } d.opBekle = 'yan' + g.no; }, sonra: null },
        { etiket: 'Sonra', yap: () => { y.aktif = null; }, sonra: null },
      ];
    },
  },
  yan_karar: {
    baslik: 'Kritik karar',
    efekt: ['sinyal'],
    metin: (d) => {
      const g = YAN_GOREV[yan(d).aktif];
      return g ? [g.op[g.op.length - 1].bitis, 'Kararını ver.'] : [];
    },
    secenekler: (d) => {
      const y = yan(d);
      const g = YAN_GOREV[y.aktif];
      if (!g) return [{ etiket: 'Devam', sonra: null }];
      return g.kararlar.map((k, i) => ({
        etiket: 'Seçenek ' + (i ? 'B' : 'A') + ': ' + k.etiket,
        yap: () => {
          let odul = k.odul(d);
          if (YADIGAR[g.no] && ZN.miktar(d, YADIGAR[g.no]) === 0) odul += ', görev yadigârı: ' + esya(d, YADIGAR[g.no]);
          const it = itibarEkle(d, k.itibar);
          y.karar[g.no] = i ? 'B' : 'A';
          if (!y.biten.includes(g.no)) y.biten.push(g.no);
          y.aktif = null;
          d.yanSon = { sonuc: k.sonuc, odul, itibar: it };
          SB.ekolKazan(d, 'uma', 15);
        },
        sonra: 'yan_odul',
      }));
    },
  },
  yan_odul: {
    baslik: 'Yan görev tamam',
    efekt: ['sinyal'],
    metin: (d) => (d.yanSon ? [d.yanSon.sonuc, 'Ödül: ' + d.yanSon.odul + '.', d.yanSon.itibar ? 'İtibar: ' + d.yanSon.itibar + '.' : null].filter(Boolean) : []),
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
  },
};

// Pasif gelirler ve süreli etkiler (gorevler.zamanIlerle)
export function yanIlerle(d) {
  if (!d.yan) return;
  const gun = Math.floor(((d.zaman && d.zaman.sn) || 0) / 7200);
  if (d.yan.gun == null) d.yan.gun = gun;
  while (d.yan.gun < gun) {
    d.yan.gun += 1;
    if (ZN.miktar(d, 'maden_hissesi') > 0) d.para.ml += 100;
    if (d.bayrak.yan_tharal_rasyon && ZN.miktar(d, 'malken_rasyonu') < 2) ZN.ekle(d, 'malken_rasyonu', 2 - ZN.miktar(d, 'malken_rasyonu'));
    if (d.bayrak.yan_aether_tozu && d.yan.gun % 7 === 0) d.koloni.kaynaklar.buyu_tozu = (d.koloni.kaynaklar.buyu_tozu || 0) + 50;
  }
}

// --- Menüler ---
export function yanMenu(d) {
  const y = yan(d);
  return {
    baslik: 'Yan görevler ve itibar',
    giris: y.biten.length + ' / 30 yan görev tamam.' + (y.aktif ? ' Süren: ' + YAN_GOREV[y.aktif].ad + '.' : '') + ' Bilim puanı ' + y.bilim + '.',
    ogeler: [
      { id: 'liste', etiket: 'Görevler (kuşaklara göre)', alt: (x) => ({ baslik: 'Otuz yan görev', giris: 'Her biri kendi bölgesindeki kişide başlar.', ogeler: YAN.map((g) => ({ id: 'g' + g.no, etiket: g.kod + ' ' + g.ad + (yan(x).biten.includes(g.no) ? ', tamam, seçenek ' + yan(x).karar[g.no] : ', ' + g.harita) + '. Gereken: ' + onkosulMetni(x, g) + '.' })) }) },
      { id: 'itibar', etiket: 'Bölgesel itibar matrisi', alt: (x) => ({ baslik: 'İtibar', giris: Object.keys(yan(x).itibar).length ? '' : 'Henüz yerel itibar yok.', ogeler: Object.keys(yan(x).itibar).map((k) => ({ id: k, etiket: FRAKSIYONLAR[k] + ': ' + yan(x).itibar[k] })) }) },
      { id: 'ozel', etiket: 'Özel mürettebat: ' + (y.ozel.length ? y.ozel.map((o) => o.ad).join(', ') : 'yok'), alt: (x) => ({ baslik: 'Özel mürettebat', giris: '', ogeler: yan(x).ozel.map((o, i) => ({ id: 'o' + i, etiket: o.ad + ', ' + o.unvan + ': ' + o.etki })) }) },
    ],
  };
}
