// YGK Akademi bağ ağının yeni kişi noktaları (belgeler/v6 karakter-01 … karakter-23). Var olan akademi figürleri kendi
// noktalarında kalır (k_tixie, k_kefius, ak_forges …); burada yalnız ilk kez yerleşen kişiler, koşullu ikinci yerler
// (serbest Zephyra, serbest Morwenna, hücredeki Valen) ve Kat 4 arşivi. Bağımlılıksız (yuzey/harita.js birleştirir).
import { YGK_KATLARI } from '../tonoflenya/harita';

const katX = (id) => 8200 + YGK_KATLARI.indexOf(id) * 40;
const N = (ygk, kat, x, y, ad, tarif, gorunur) => ({ mekan: kat, x: katX(kat) + x, y, ad, yaricap: 2, ygk, tarif, ...(gorunur ? { gorunur } : {}) });
const hk = (d) => (d.hikaye && d.hikaye.biten ? d.hikaye.biten : {});

export const YG_NOKTALAR = {
  yg_lasiraxi: N('lasiraxi', 'ygk_2', 4, 10, 'Lasiraxi Jolt, Tu ağının sinyal tanrıçası', 'Omurgasından ağa uzanan ışıldayan kablolar; gözlerinde kayan veri rünleri. Etrafında sessiz Dijital Çıraklar.'),
  yg_veyra: N('veyra', 'ygk_2', 12, 10, 'Veyra-K, burslu akustik öğrencisi', 'Ön sırada, defterine kapanmış; mırıldandığı nota tekrarları ve hızlı kalem cızırtısı.'),
  yg_zynae: N('zynae', 'ygk_3', 14, 10, 'Zynae, Pembe Prizma', 'Avucunda dönen bir prizmanın cam gibi tiz çınlaması; inci beyazı ipek hışırtısı.'),
  yg_dren: N('dren', 'ygk_3', 12, 6, 'Dren, örs çırağı', 'Yan tezgâhta düzensiz çekiç vuruşları, körük üflemesi ve arada bir "Tüh, yine olmadı!"'),
  yg_palmi: N('palmi', 'ygk_4', 14, 8, 'Palmi, Sarayın Gözü', 'Ayak sesi hiç duyulmuyor; yalnız havada süzülen ağır ipek hışırtısı ve kristal korsenin soğuk vınlaması.'),
  yg_corinne: N('corinne', 'ygk_4', 6, 14, 'Corinne, Sırçanın Bekçisi', 'Hızlı sayfa çevirme, deri çanta gıcırtısı ve arada telaşlı bir cam şıngırtısı.'),
  yg_sora: N('sora', 'ygk_4', 10, 12, 'Sora-9, kütüphane çırağı', 'Merdiven tıkırtıları, kitap yerleştirme sesleri ve neşeli bir ıslık.'),
  ygk_arsiv: N(null, 'ygk_4', 3, 18, 'Kat 4 arşivi, yedek öğrenme rafları', 'Tozlu raflar; ustaların eski ders notları ve küçük sınav taşları. Kırgın bir ustanın büyüsü burada notlardan öğrenilebilir.'),
  yg_miranda: N('miranda', 'ygk_5', 10, 10, 'Miranda Caledor, İhtişamın Gölgesi', 'İnce kristal kadeh çınlaması, ağır ipek hışırtısı ve tembel bir arp tınısı.'),
  yg_elian: N('elian', 'ygk_5', 12, 14, 'Elian, sera asistanı', 'Su püskürtme sesi, toprak kazıma ve ince yaprak hışırtısı.'),
  yg_sirilla: N('sirilla', 'ygk_6', 4, 4, 'Sirilla, Sırça Göz', 'Soğuk bir ayna salonu; yavaş topuk sesleri ve ince cam titremesi.'),
  yg_zephyra: N('zephyra', 'ygk_6', 10, 18, 'Zephyra, dış rüzgâr balkonunda', 'Uğuldayan yüksek rüzgâr ve geniş kanat çırpışları.', (d) => !!d.bayrak.zephyraSerbest),
  yg_valen: N('valen', 'ygk_m4', 10, 10, 'Valen Lazeria, stasis hücresinde', 'Kendi elleriyle kurduğu hücrelerden birinde; vakarlı, sessiz bir kriyo nabzı.', (d) => !!d.bayrak.valenKapali),
  yg_nox: N('nox', 'ygk_m2', 14, 14, 'Nox, gece stajyeri', 'Merdiven köşesinde hızlı kalp atışı, titrek nefes ve bardağa çarpan bir çay kaşığı.'),
  yg_morwenna: N('morwenna', 'ygk_m3', 10, 10, 'Morwenna, karanlık dehlizlerde', 'Sağdan sola kayan boğuk fısıltılar.', (d) => hk(d).ak_morwenna === 0),
};
