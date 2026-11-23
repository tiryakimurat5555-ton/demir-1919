// Gündelik eşya kataloğu (belgeler/v5 Paket 10) ve sera/vahaya eklenen gündelik ekimler (Paket 5 bölüm 3.1).
//
// Eşyalar tonoflenya/zanaat.js ESYA kaydına 'gunluk: true' ve kat 6 ile eklenir: böylece ZN.miktar/ekle, ilan panosu
// (yerlesim/pazar.js), hediye ve tüccar onları tanır; gemi envanterinin beş kategorisinde görünmez ve gemi ambarının
// hacmine girmez (koloni deposunda durur). Kimlikler Paket 11 istek şablonlarındakilerle birebir aynıdır.
//   sekme     Paket 10 bölüm 5 kategorili çanta: 0 Hammaddeler, 1 Yiyecek ve İçecek, 2 Giyim ve Zanaat,
//             3 Malken ve Tören, 4 Özel ve Evlilik
//   gk        tüccar ve tezgâh için taban değer (Galaktik Keşif Kredisi)
//   yiyecek   hediye ve festival katkısında yiyecek sayılır
//   rezonans  [Ham Rezonans] etiketi (Paket 10 bölüm 2)
//   hayvan    hayvan barınağı ürünü: başlangıçta kilitli; ne üretilir ne istekte çıkar (Paket 10 3.2 notu)
//   kullan    çantadaki eylem (tezgah.js kullan): ye | ic | yak | sefer | fener | onar | dekor | yikan | ilac
import * as ZN from '../tonoflenya/zanaat';
import { BITKILER, BITKI_SIRASI, KATEGORI_ADI } from '../tarim/bitkiler';
import { HAMMADDELER } from '../veri/tesisler';

export const SEKMELER = ['Hammaddeler', 'Yiyecek ve İçecek', 'Giyim ve Zanaat', 'Malken ve Tören', 'Özel ve Evlilik'];
export const REZONANS_NOTU = 'Ham Rezonans: doğal rezonans taşır; şimdilik zanaat ve törende kullanılır, ileride özel tesislerde işlenebilir.';

const E = (ad, sekme, gk, tarif, ek = {}) => ({ kat: 6, gunluk: true, ad, sekme, gk, tarif, ...ek });
export const GUNLUK = {
  // 3.3 Dünya ihtiyaçları: aşhane
  ekmek: E('Taş fırın ekmeği', 1, 6, 'Arpa unu, deniz tuzu ve su; kabuğu çıtır, içi sıcak. Günlük moral yemeği ve sefer rasyonu.', { yiyecek: true, kullan: 'ye' }),
  dunya_cayi: E('Demli Dünya çayı', 1, 6, 'Çay yaprağından ince belli bardakta. Usta Veysel, Marcus ve Halvar\'ın favorisi.', { yiyecek: true, kullan: 'ic' }),
  kavrulmus_kahve: E('Kavrulmuş nöro-kahve', 1, 8, 'Arpa ya da kahve çekirdeği kömür ateşinde kavrulur. Kaelon, Marcus ve Halvar\'ın gece nöbeti içeceği.', { yiyecek: true, kullan: 'ic' }),
  balik_konservesi: E('Tuzlu balık konservesi', 1, 9, 'Balık, deniz tuzu ve cam kavanoz. Uzun ömürlü sefer erzağı; Mateo\'nun takas malı.', { yiyecek: true, kullan: 'sefer' }),
  balik_corbasi: E('Balık çorbası', 1, 9, 'Balık, tatlı yıldız kökü ve tuzla kaynayan sıcak güveç. Maden dönüşü yorgunluğu alır.', { yiyecek: true, kullan: 'ye' }),
  borek: E('Peynirli börek', 1, 10, 'Un, süt ya da soya-kazein peyniri ve vaha hurması şerbetiyle. Festival ve taverna ikramı.', { yiyecek: true, kullan: 'ye' }),
  baharat: E('Baharat ve tuz karışımı', 1, 7, 'Deniz tuzu, kristal çiçek ve yıldız kökü. Sorya\'nın yemek kalitesini artıran sırrı.', { yiyecek: true }),
  vaha_tabagi: E('Vaha ziyafet tabağı', 1, 18, 'Sorya\'nın özel tarifi: hurma, bal ve baharat. Yüksek moral verir.', { yiyecek: true, kullan: 'ye' }),
  kuru_meyve: E('Kurutulmuş mevsim meyvesi', 1, 5, 'Vaha hurması ve yıldız kökü güneşte kurur. Kış ve maden seferinin hafif atıştırmalığı.', { yiyecek: true, kullan: 'ye' }),
  kamp_yemegi: E('Kamp ateşinde ızgara balık', 1, 5, 'Kıyı odunu közünde, tuzsuz ve basit. Kamp ateşinin ilk yemeği.', { yiyecek: true, kullan: 'ye' }),
  // Dünya atölyesi: fırın, marangoz, örs, dokuma
  tugla: E('Pişmiş tuğla ve kiremit', 2, 3, 'Ham kil fırında kömürle pişer. Konut, aşhane, okul ve karakol yapımı.'),
  seramik_canak: E('Seramik çanak ve testi', 2, 5, 'Kil ve suyla çarkta döner, fırında sırlanır. Aşhane servisi ve su depolama.'),
  oyuncak: E('Ahşap çocuk oyuncağı ve topaç', 4, 7, 'Usta Veysel\'in rendesinden; reçineyle cilalı. Okul şenliği ve doğan çocuklara hediye.'),
  muzik_kutusu: E('Müzik kutusu', 4, 40, 'Veysel ve Kaelon\'un ortak işi: kereste, bakır tarak, kristal. Kamarada uyurken ninni çalar.', { kullan: 'dekor' }),
  akvaryum: E('Küçük göl akvaryumu', 4, 35, 'Veysel ve Sira-Vel: cam fanus ve küçük göl balıkları. Kamarada su kabarcığı sesi.', { kullan: 'dekor' }),
  ruzgar_cani: E('Rüzgâr çanı', 3, 20, 'Julian\'ın akordu: kereste ve küçük kristal çan. Kamara ve ev kapısında hafif tını.', { kullan: 'dekor' }),
  tamir_kiti: E('Tamir kiti ve saha çantası', 2, 14, 'Kaelon\'un hazırladığı demir, bez ve yağ. Maden ve araç acil saha onarımı.', { kullan: 'onar' }),
  demir_takim: E('Demir çivi, menteşe ve tava', 2, 6, 'Örs başında dövülür. Veysel\'in tamirleri ve ilan panosu işleri.'),
  dugun_yuzugu: E('Dünya düğün yüzüğü', 4, 60, 'Gümüş tozu ve piezo kristalden. Dünya kökenli bir yerleşimciyle evliliğin sembolü.'),
  keten_gomlek: E('Keten gömlek ve iş tulumu', 2, 10, 'Pamuk ve keten ipliğinden. Yerleşimcilerin mevsimlik kıyafeti.'),
  cocuk_kiyafeti: E('Çocuk kıyafeti', 2, 8, 'Küçük bedenler için yumuşak keten. Okuldaki çocuklar ve yeni aileler.'),
  sal: E('Keten şal', 2, 7, 'Akşam serinliğine. Evlenen çiftlere ve yaşlılara hediye.'),
  halat: E('Halat', 2, 4, 'Bitkisel lif örülerek. Maden inişi, balıkçı ağı ve iskele.'),
  is_eldiveni: E('İş eldiveni', 2, 4, 'Lif ve kumaştan kalın eldiven. Torvok ve Kaelon sever.'),
  yun_battaniye: E('Yün battaniye ve atkı', 2, 16, 'Xeno-yünden. Ayaz mevsiminin ısınma ihtiyacı.', { hayvan: true }),
  saha_cantasi: E('Dokuma saha çantası', 2, 15, 'Keten, halat ve bakır toka. Zarek ve Elara\'nın keşif çantası.'),
  // 3.4 Malken ihtiyaçları: tapınak, çan atölyesi, hamam ve şifa labı
  fener_yagi: E('Işık otu fener yağı', 3, 6, 'Işık otu ve reçine. Maden kafa feneri yakıtı.', { kullan: 'fener', rezonans: true }),
  huzur_tutsusu: E('Huzur tütsüsü', 3, 8, 'Kristal çiçek ve reçine. Tapınakta yakılır; stresi azaltır.', { kullan: 'yak' }),
  kristal_can: E('Küçük kristal çan', 3, 14, 'Bakır gövde, piezo kristal dil. Julian\'ın akort işleri ve festival.', { rezonans: true }),
  rezonans_lambasi: E('Rezonans lambası', 3, 16, 'Cam, fosforlu liken ve bakır. Ev aydınlatması ve gece nöbeti.', { rezonans: true }),
  sakin_cay: E('Sakinleştirici Malken çayı', 1, 9, 'Kristal çiçek, bal ve saf su. Sefer sonrası stres azaltır.', { yiyecek: true, kullan: 'ic' }),
  antikor_iksiri: E('Malken ve Abis antikor iksiri', 3, 18, 'Şifalı yeraltı mantarı ve hamam minerali. Maden zehrine ve sporlara direnç.', { kullan: 'ilac' }),
  aroma_yagi: E('Hamam aroma yağı', 3, 12, 'Kristal çiçek ve ışık otu. Termal hamamda tam arınma.', { kullan: 'yikan', rezonans: true }),
  sabun: E('Doğal koloni sabunu', 2, 4, 'Reçine yağı ve deniz tuzu. Hamam, revir ve günlük temizlik.'),
  malken_takisi: E('Gümüş Malken takısı', 3, 22, 'Gümüş tozu ve kristal çiçek. Yüksek güven hediyesi.'),
  // 3.5 Sosyal, evlilik, kamara ve özel talep
  bag_tilsimi: E('Altı Yıldız bağ tılsımı', 4, 70, 'Saf aether, kristal çiçek ve gümüş. Malken ya da dış kökenli bir yerleşimciyle evliliğin sembolü.', { rezonans: true }),
  ders_defteri: E('Çocuk ders defteri ve kalem', 4, 5, 'Lif kâğıdı ve liken mürekkebi. Okul görevleri ve çırak eğitimi.'),
  kristal_pusula: E('Sesli kristal pusula', 4, 30, 'Bakır, piezo kristal ve cam. Maden ve kıyıda yön bulma; Zarek ve Elara ister.', { rezonans: true }),
  muhur_kutusu: E('Arşiv mühür kutusu', 4, 35, 'Kereste, gümüş ve fosil. Koloni arşivi set tamamlama hediyesi.'),
  malazar_buyu_tozu: E('Malazar büyü tozu', 4, 300, 'Malazar asası ve büyü kristallerinden. Akademi ve tapınaktaki büyü ve ileri rezonans sunağının anahtarı.', { rezonans: true }),
  // 3.2 Hayvan barınağı ürünleri: başlangıç bölgesinde hayvan yok, kilitli
  xeno_sut: E('Xeno-süt', 1, 6, 'Hayvan barınağından. İlk bölgede bilinen hayvan yok; xeno-fauna planı açılınca gelir.', { yiyecek: true, hayvan: true }),
  xeno_yumurta: E('Xeno-yumurta', 1, 5, 'Hayvan barınağından. İlk bölgede bilinen hayvan yok; xeno-fauna planı açılınca gelir.', { yiyecek: true, hayvan: true }),
  xeno_yun: E('Yumuşak yün', 0, 6, 'Hayvan barınağından. İlk bölgede bilinen hayvan yok; xeno-fauna planı açılınca gelir.', { hayvan: true }),
};
for (const k of Object.keys(GUNLUK)) if (!ZN.ESYA[k]) ZN.ESYA[k] = GUNLUK[k];

// [Ham Rezonans] taşıyan hammadde ve hasat ürünleri (Paket 10 3.1, 3.2)
export const REZONANS = new Set(['piezo', 'aether', 'saf_aether', 'cekirdek_tasi', 'urun_fosforlu_liken', 'urun_isik_otu', 'urun_kristal_cicek', ...Object.keys(GUNLUK).filter((k) => GUNLUK[k].rezonans)]);
export const rezonansMi = (k) => REZONANS.has(k);

// --- Paket 5 bölüm 3.1: sera ve vahaya eklenen gündelik ekimler ---
KATEGORI_ADI.M = 'Malken gündelik ekimi';
const B = {
  arpa: { ad: 'Arpa ve Ekstra Buğday', kat: 'A', ortam: 'teras', dongu: 3, su: 60, isi: 18, frek: 208, urun: 'arpa', olgun: 'kuru başakların rüzgârda sürtünüp hışırdaması', kaynak: 'Sorya ve Veysel\'in Dünya tohum kesesi; aşhane kurulunca gelir. Kaptan Orin de satar.' },
  pamuk_keten: { ad: 'Pamuk ve Keten', kat: 'A', ortam: 'teras', dongu: 4, su: 55, isi: 24, frek: 185, urun: 'pamuk ve keten lifi', olgun: 'kozaların patlayıp yumuşak bir puf sesiyle açılması', kaynak: 'Usta Veysel\'in kesesi; Dünya atölyesi kurulunca gelir. Kaptan Orin de satar.' },
  cay_yapragi: { ad: 'Çay Yaprağı', kat: 'A', ortam: 'teras', dongu: 3, su: 75, isi: 20, frek: 277, urun: 'çay yaprağı', olgun: 'taze filizlerin çıtırtıyla kıvrılması', kaynak: 'Usta Veysel\'in Dünya\'dan getirdiği fide; aşhane kurulunca gelir.' },
  isik_otu: { ad: 'Işık Otu', kat: 'M', ortam: 'vaha', ortamlar: ['vaha', 'teras'], dongu: 3, su: 70, isi: 22, frek: 415, urun: 'ışık otu', olgun: 'yaprakların ışıldarken ince bir vızıltıyla titreşmesi', kaynak: 'Lyris\'in Malken tohumları; vaha bulununca gelir.' },
  kristal_cicek: { ad: 'Kristal Çiçek', kat: 'M', ortam: 'vaha', ortamlar: ['vaha', 'teras'], dongu: 4, su: 60, isi: 20, frek: 554, urun: 'kristal çiçek', olgun: 'taç yapraklarının cam gibi birbirine değip çınlaması', kaynak: 'Lyris ve Sira-Vel\'in tapınak tohumları; vaha bulununca gelir.' },
  tatli_kok: { ad: 'Tatlı Yıldız Kökü', kat: 'M', ortam: 'vaha', ortamlar: ['vaha', 'teras'], dongu: 4, su: 65, isi: 21, frek: 156, urun: 'tatlı yıldız kökü', olgun: 'kökün toprağı kabartıp tok bir tıkırtı çıkarması', kaynak: 'Sorya\'nın Malken mutfağından; vaha bulununca gelir.' },
};
for (const k of Object.keys(B)) {
  if (!BITKILER[k]) {
    BITKILER[k] = B[k];
    BITKI_SIRASI.push(k);
  }
}
export const GUNDELIK_BITKILER = Object.keys(B);

// --- Çanta sekmeleri ---
const YIYECEK_URUN = new Set(['vaha_hurmasi', 'tatli_kok', 'altin_hurma']);
export function sekmesi(k) {
  if (GUNLUK[k]) return GUNLUK[k].sekme;
  if (k.indexOf('erzak_') === 0) return 1;
  if (k.indexOf('urun_') === 0) return YIYECEK_URUN.has(k.slice(5)) ? 1 : 0;
  if (HAMMADDELER[k]) return 0;
  return 2;
}
