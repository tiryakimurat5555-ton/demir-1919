// Final görevlerinin başladığı yerler (belgeler/tonoflenya-buyuk-final-gorevleri.md bölüm 2). Saf veri;
// yuzey/harita.js birleştirir. Eylemleri tonoflenya/final.js verir.
import { T_MEKANLAR } from './harita';
import { A_MEKANLAR } from './atlas';

const MK = { ...T_MEKANLAR, ...A_MEKANLAR };
function n(mekan, fx, fy, ad, tarif) {
  const a = MK[mekan].alan;
  return { mekan, x: Math.round((a.bati + (a.dogu - a.bati) * fx) * 10) / 10, y: Math.round((a.guney + (a.kuzey - a.guney) * fy) * 10) / 10, ad, tarif, yaricap: 2, final: true };
}
const rez = (mekan, yildiz) => n(mekan, 0.75, 0.25, 'Kalkan rezonatörü (' + yildiz + ')', 'Halkanın kalkanını besleyen titreşen bir kristal sütun; dokununca ' + yildiz + '\'nın tonu.');

export const F_NOKTALAR = {
  konsey_salonu: n('ygk_6', 0.3, 0.25, 'Yüksek Konsey Salonu', 'Kulenin tepesinde, camları gümüşi rüzgârla titreyen yuvarlak salon; ortasında kristal veri konsolu.'),
  rezonator_zhaor: rez('halka_zhaor', 'Zhaor'),
  rezonator_varek: rez('halka_varek', 'Varek'),
  rezonator_axira: rez('halka_axira', 'Axira'),
  rezonator_elyndra: rez('halka_elyndra', 'Elyndra'),
  rezonator_sinha: rez('halka_sinha', 'Sinha'),
  rezonator_uma: rez('halka_uma', 'Uma'),
  yasak_dolaplar: n('ygk_m3', 0.3, 0.3, 'Yasak kronik dolapları', 'Eski Axelum inancının mühürlü parşömenlerinin çelik dolapları; kendiliğinden titriyorlar.'),
  derin_ocak: n('malazar_ocaklari', 0.15, 0.8, 'Derin ocak ağzı', 'Sekiz yüz metre aşağı inen bir maden kuyusu; Bront başında bekliyor.'),
  sifir_fayi: n('malazar_ocaklari', 0.5, 0.15, 'Sıfır noktası fayı', 'I. Bagrius\'un ilk kazısının dibinde siyah dumanlar sızan bir kırık.'),
  bagrius_dokumhanesi: n('malazar_zirve', 0.7, 0.7, 'Terk edilmiş Bagrius dökümhanesi', 'Zirvenin altına oyulmuş devasa bir dökümhane; jeotermal körükleri soğumuş.'),
  miria_kulesi: n('flee_plee', 0.4, 0.6, 'Sahil muhafız kulesi', 'Kaptan Miria\'nın gözetleme kulesi; telsizi yalnız fokurtu çekiyor.'),
  kaelen_platformu: n('aether_dock', 0.6, 0.6, 'Teleportasyon kapıları', 'Platform kentin arızalı ışınlanma kapıları; Baş Teknisyen Kaelen önlerinde.'),
  arin_gozlemevi: n('arin', 0.5, 0.9, 'Koruyucu Gözlemevi', 'Adanın sırtında, gezegen kurulurken konulmuş kadim bir monolit; kendiliğinden uyanmış.'),
  akrep_vadisi: n('dogu_kanton', 0.7, 0.7, 'Akrep Vadisi', 'Kumun altına batmış dikilitaşların vadisi; Şeyh Kasım\'ın çadırı.'),
  cokuk_magara: n('kirik_vadi', 0.6, 0.4, 'Çökük Mağara', 'Kanyonun dibinde, içinden yaşlı bir sesin geldiği çökük bir mağara.'),
  liman_baskani: n('veradon', 0.6, 0.7, 'Liman başkanlığı', 'Mültecilerle dolu rıhtımın başında Liman Başkanı Varis.'),
  krater_tabani: n('kara_gol', 0.3, 0.3, 'Kraterin kenarı', 'Kara suların çekildiği dipsiz krater; aşağıda kırık kuleler.'),
  runahar_gogsu: n('kara_gol', 0.6, 0.25, 'Runahar\'ın göğüs kafesi', 'Kraterin dibinde, taşlaşmış devasa bir göğüs kafesi.'),
  astral_gecit: n('kara_gol', 0.4, 0.8, 'Astral geçit', 'Kara Göl\'ün üstünde havada titreyen solgun bir ışık.'),
  kara_kuleler: n('kahergonat', 0.5, 0.8, 'Kara kulelerin dibi', 'Göğe mor yıldırımlar fırlatan siyah sivri kuleler.'),
  saray_avlusu: n('tenohris', 0.8, 0.5, 'Sarayın ön avlusu', 'Oval kapıların önü; hava savunma bataryası burada.'),
  dunya_civisi: n('ygk_m5', 0.3, 0.3, 'Dünya Çivisi', 'Gezegenin omurgası: akademinin en dibindeki devasa mühür sütunu; zemininde iki taş yuvası.'),
};
