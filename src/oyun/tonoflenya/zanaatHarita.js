// Eşya, zanaat ve mürettebat rehberinin haritadaki yerleri (belgeler/tonoflenya-esya-zanaat-ve-murettebat-rehberi.md
// bölüm 1, 2, 5.3): subay kurulu, veri masası, ticaret masaları, limanlardaki istihdam ve yeni hammadde yatakları.
// Saf veri; yuzey/harita.js birleştirir. zanaat: 'kurul' | 'veri' | 'pazar' (pazar kimliği) alanı tonoflenya/zanaat.js'e gider.
import { T_MEKANLAR } from './harita';
import { A_MEKANLAR } from './atlas';

const MK = { ...T_MEKANLAR, ...A_MEKANLAR };
// Mekânın alanında oransal konum (0-1)
function yer(mekan, fx, fy) {
  const a = MK[mekan].alan;
  return { mekan, x: Math.round((a.bati + (a.dogu - a.bati) * fx) * 10) / 10, y: Math.round((a.guney + (a.kuzey - a.guney) * fy) * 10) / 10 };
}
const n = (mekan, fx, fy, ad, tarif, ek = {}) => ({ ...yer(mekan, fx, fy), ad, tarif, yaricap: 2, ...ek });
// Aethelis-IV'ün vadisi (yuzey/harita.js MEKANLAR.vadi: x -55..55, y -45..60)
const vadi = (x, y, ad, tarif, ek) => ({ mekan: 'vadi', x, y, ad, tarif, yaricap: 2, ...ek });

export const Z_NOKTALAR = {
  // YGK
  subay_kurulu: n('ygk_1', 0.3, 0.2, 'Akademi subay kurulu', 'Yarım daire bir masa; arkasında altı ekolün sancakları. Kurul gemilere subay görevlendiriyor.', { zanaat: 'kurul' }),
  veri_masasi: n('ygk_2', 0.3, 0.2, 'Derin uzay veri masası', 'Akademinin derin uzaydan dönen kaptanlardan veri paketi satın aldığı masa. Galaktik Keşif Kredisiyle öder.', { zanaat: 'veri' }),
  // Ticaret masaları (Malken Lirası; Tentran'da Fenrir ışık tozu)
  uma_pazari: n('halka_uma', 0.2, 0.75, 'Altın pazar', 'Uma halkasının çarşısı: deri, bal, altın tel, kumaş; tezgâhların arasında sikke şıngırtısı.', { zanaat: 'pazar' }),
  zhaor_pazari: n('halka_zhaor', 0.5, 0.5, 'Gümüş tezgâhlar', 'Kalkan kulelerinin dibinde gümüş prizma ve Zhaor ipeği satan tezgâhlar.', { zanaat: 'pazar' }),
  axira_tezgahi: n('halka_axira', 0.5, 0.75, 'Şifacılar tezgâhı', 'Asma bahçelerin altında biyo-filtre, mor çiçek özütü ve şifalı otlar.', { zanaat: 'pazar' }),
  sinha_tezgahi: n('halka_sinha', 0.5, 0.75, 'Akustik çip atölyesi', 'Kuantum pilonunun yanında, sonar çipleri ve frekans röleleri satan bir atölye.', { zanaat: 'pazar' }),
  elyndra_dokumacisi: n('halka_elyndra', 0.5, 0.75, 'Mor kumaş dokumacısı', 'Elyndra\'nın ışığında boyanmış, aether akımı geçiren kumaşlar.', { zanaat: 'pazar' }),
  tentran_tuccari: n('aether_dock', 0.25, 0.33, 'Tentran kuantum tüccarı', 'Platform kentin yüksek teknoloji tezgâhı; burada yalnız Fenrir ışık tozu geçer.', { zanaat: 'pazar', liman: true }),
  veradon_hani: n('veradon', 0.17, 0.33, 'Veradon hanı', 'Güney kervanlarının hanı; tavanından kurutulmuş balık, köşesinde iş arayan gemiciler.', { zanaat: 'pazar', liman: true }),
  julithan_limani: n('julithan', 0.5, 0.5, 'Julithan tüccar limanı', 'Cumhuriyetin rıhtımı: maden, kumaş ve erzak; tavernalarında boşta subaylar.', { zanaat: 'pazar', liman: true }),
  nerya_limani: n('nerya', 0.5, 0.5, 'Nerya lonca rıhtımı', 'Kanal kentinin lonca rıhtımı; her şey alınıp satılır, her gemici bir ekole yeminli.', { zanaat: 'pazar', liman: true }),
  kahergonat_karaborsa: n('kahergonat', 0.3, 0.3, 'Kahergonat karaborsası', 'Bazalt kemerlerin altında, mor ve yeşil dumanların arasında fısıldaşan satıcılar. Yasaklı mallar burada.', { zanaat: 'pazar' }),
  // Yeni hammadde yatakları (bölüm 2)
  piezo_1: vadi(-40, 35, 'Piezo kristali', 'Üzerine basınca küçük kıvılcımlar çıkaran sarı bir taş damarı.', { kaynak: 'piezo', stok: 3, ses: 'kristal' }),
  piezo_2: vadi(38, -20, 'Piezo kristali', 'Sarı, çıtırdayan bir kristal öbeği.', { kaynak: 'piezo', stok: 3, ses: 'kristal' }),
  zhaor_prizmasi_1: n('halka_zhaor', 0.8, 0.8, 'Gümüş prizma kayası', 'Kalkan kulelerinin gölgesinde gümüşi yansımalar veren, manyetik alana duyarlı bir taş.', { kaynak: 'zhaor_prizmasi', stok: 2, ses: 'kristal' }),
  kizilkaya_1: n('filtra', 0.25, 0.75, 'Kızılkaya titanyum damarı', 'Kızıl kayanın içinde sert, ağır bir metal damarı.', { kaynak: 'kizilkaya_titanyumu', stok: 4 }),
  norvask_buzu_1: n('norvask', 0.5, 0.7, 'Kara buz madeni', 'Asla erimeyen, oda sıcaklığında duman çıkaran buz metali.', { kaynak: 'norvask_buzu', stok: 3 }),
  norvask_buzu_2: n('helgar', 0.5, 0.7, 'Helgar kara buz kütlesi', 'Dükalığın işlediği erimeyen siyah buz kütleleri.', { kaynak: 'norvask_buzu', stok: 3 }),
  safran_1: n('safran', 0.25, 0.25, 'Safran kükürt tabakası', 'Sarımsı, ufalanabilir sülfür tabakası.', { kaynak: 'safran_kukurt', stok: 4 }),
  kara_aether_1: n('kahergonat', 0.7, 0.7, 'Kara aether damarı', 'Işığı yutan, yaklaşınca cızırdayan katran kristali.', { kaynak: 'kara_aether', stok: 3, ses: 'parazit' }),
  arin_tuyu_1: n('arin', 0.3, 0.7, 'Kuş tüyü yuvaları', 'İtim akımlarında yaşayan kuşların bıraktığı uzun, hafif tüyler.', { kaynak: 'arin_tuyu', stok: 3 }),
  girdap_recinesi_1: n('arin', 0.75, 0.3, 'Girdap reçinesi ağacı', 'Gövdesinden ılık, yapışkan bir reçine sızan bükülmüş bir ağaç.', { kaynak: 'girdap_recinesi', stok: 3 }),
};
