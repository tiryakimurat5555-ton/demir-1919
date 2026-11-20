// Tesislerde üretilen gemi parçaları ve modüller (belgeler/araclar-ve-gemi-filosu.md bölüm 2 ve 4,
// uzay-oyunu-tasarim-ve-senaryo.md bölüm 2, 3 ve 6). Saf veri.
//
// Belgedeki miktarlar korunur: Kıvılcım 150 titanyum-karbon iskelet plakası, 40 birim bakır-optik kablo,
// 25 litre standart itki yakıtı ve 1 minyatür iyon reaktörü ister. Dökümhane bir dökümde 50 plaka verir.

// Parçalar: kimlik → ad (sayıyla söylenir) ve tarif
export const PARCALAR = {
  plaka: { ad: 'titanyum-karbon iskelet plakası', tarif: 'Çarpınca tok, sağlam bir metal sesi veren plaka. Bütün gemi iskeletleri bundan.' },
  kablo: { ad: 'birim bakır-optik kablo', tarif: 'İnce bakır-optik kablo demeti; kokpitin sinir sistemi.' },
  itki_yakiti: { ad: 'litre standart itki yakıtı', tarif: 'Doldurulurken derinden sıvı-gaz tıslaması çıkaran yakıt.' },
  iyon_reaktoru: { ad: 'minyatür iyon reaktörü', tarif: 'Avuç kadar bir çekirdek; Kıvılcım\'ın kalbi.' },
  // Modüller (montaj katmanları, gemiler.js MODUL_KATMANLARI)
  mod_burun: { ad: 'kripto frekans anteni', tarif: 'Ön burun: uzun menzilli şifreli askeri ve kadim yayınları çözer.', katman: 'burun' },
  mod_govde: { ad: 'lamine titanyum zırh takımı', tarif: 'Ana gövde: meteorit çarpmalarına ve top salvosuna karşı direnç.', katman: 'govde' },
  mod_bolme_a: { ad: 'biyo-karantina ve plazma dekontaminasyon bölmesi', tarif: 'İç bölme A: kseno-sporları izole eder, genetik çekirdeği korur.', katman: 'bolme_a' },
  // Kademe 2-3 gemi malzemeleri (bölüm 2 ve 4)
  guclu_alasim: { ad: 'güçlendirilmiş titanyum-karbon alaşımı', tarif: 'Rüzgarkıran\'ın gövdesi; dökümhanede polimerle sertleştirilir.' },
  sasi_celigi: { ad: 'parça şasi çeliği', tarif: 'Kaynak yapıldığında kıvılcım çıkaran ağır kütle. Yüzey atölyesinden ya da korsan enkazlarından.' },
  saf_kristal: { ad: 'birim piezo-elektrik saf kristal', tarif: 'Sensör ve rezonans için arıtılmış kristal; tıklayınca cam gibi tınlar.' },
  plazma_yakiti: { ad: 'litre plazma yakıtı', tarif: 'Füzyon reaktörlerinin yakıtı; tank dolarken derinden tıslar.' },
  plazma_reaktoru: { ad: 'standart plazma füzyon reaktörü', tarif: 'Rüzgarkıran\'ın makine dairesinin kalbi.' },
  zirhli_plaka: { ad: 'zırhlı şasi metali ve titanyum plaka', tarif: 'Aethel Muhafızı\'nın gövdesi.' },
  kseno_alasim: { ad: 'birim kseno-alaşım ve iletken kristal', tarif: 'Kadim kristalle örülmüş iletken alaşım; harmonik vuruşlar yayar.' },
  graviton_yakiti: { ad: 'litre graviton yakıtı', tarif: 'Hiper-sürücülerin yakıtı; kulaklıkla hissedilen pes bir titreşimi var.' },
  helyum: { ad: 'helyum-3 soğutma tüpü', tarif: 'Reaktör soğutma hatları için; tahliyede yüksek ıslık ve donma çatırtısı.' },
  kalkan_projektoru: { ad: 'ağır korvet sınıfı kalkan projektörü', tarif: 'Aethel Muhafızı\'nın manyetik kalkanını kuran projektör.' },
  // Kademe 4-5 malzemeleri: kaynakları uzay görevlerinde (Faz 4)
  kompozit_blok: { ad: 'ağır titanyum-kompozit zırh bloğu', tarif: 'Gökdelen\'in gövdesi.', uzaydan: true },
  notron_matris: { ad: 'birim nötron-yoğun çelik ve kristal matris', tarif: 'Parçalanan gezegen çekirdeğinden (G-07) gelen nötron-yoğun çekirdekle yapılır.', uzaydan: true },
  hiper_bobin: { ad: 'çift hatlı ağır hiper-sürücü bobini', tarif: 'Gökdelen\'in sürücüsü; kriyolit çekirdekli.' },
  yatistirici: { ad: 'doz sakinleştirici ilaç', tarif: 'Kseno-sporlardan; revirlerde ve uyum merkezlerinde.' },
  super_alasim: { ad: 'nötron takviyeli süper alaşım plakası', tarif: 'Hisar-ı Kadim\'in gövdesi.', uzaydan: true },
  kadim_disk: { ad: 'birim kadim kseno-kristal ve optik şifreleme diski', tarif: 'Kadim tapınaklardan (G-10).', uzaydan: true },
  kuantum_cekirdek: { ad: 'kuantum rezonans çekirdeği', tarif: 'Hisar-ı Kadim\'in dört çekirdeğinden biri.', uzaydan: true },
  // Araç parçaları (bölüm 3)
  polimer_levha: { ad: 'asit-direnç polimer levhası', tarif: 'Esnek, kimyasal temasta erimeyen kauçuksu levha.' },
  kompozit: { ad: 'titanyum-çelik kompoziti', tarif: 'Demir Kervan\'ın gövdesi.' },
  hafif_alasim: { ad: 'hafif titanyum alaşımı', tarif: 'Uçucular ve dronlar için.' },
  mikrocip: { ad: 'mikro-çip devresi', tarif: 'Dronların optik izleme beyni.' },
  sondaj_cekirdegi: { ad: 'hidrolik sondaj çekirdeği', tarif: 'Mammoth\'un titreşimli rezonans matkabının kalbi.' },
  // Bölge arındırma donanımı (gezegen-gelisimi-v2 bölüm 5)
  dondurucu_kopuk: { ad: 'tüp dondurucu köpük', tarif: 'Gaz ve plazma sızıntılarını saniyeler içinde donduran helyumlu köpük; püskürtülünce çıtırdar.' },
  topraklama_cubugu: { ad: 'topraklama çubuğu', tarif: 'Toprağa çakılınca statik yükü emen titanyum çubuk; uçta hafif bir vızıltı.' },
  sismik_dengeleyici: { ad: 'sismik dengeleyici', tarif: 'Fay hatlarına çakılan, titreşimi sönümleyen ağır kazık.' },
  notralizasyon_kulesi: { ad: 'nötralizasyon kulesi', tarif: 'Zehirli gazı ve fırtınanın iyonlarını emip arıtan dikey kule.' },
  sonik_kovucu: { ad: 'sonik kovucu', tarif: 'Fauna için rahatsız edici, insan kulağına zar zor duyulan bir uğultu yayar.' },
  ikmal_karakolu: { ad: 'otomatik ikmal karakolu', tarif: 'Otonom taşıyıcılar için radar koridoru açan, bölgenin madenlerini koloniye taşıyan küçük üs.' },
};

export const PARCA_SIRASI = Object.keys(PARCALAR);

// Üretim tarifleri: tesis → tarifler. girdi hammadde ya da parça olabilir. sure: saniye (sanayi iş gücü kısaltır).
export const TARIFLER = {
  dokumhane: [
    { id: 'plaka', ad: '50 titanyum-karbon plaka dök', girdi: { titanyum: 2, bazalt: 1 }, cikti: { plaka: 50 }, sure: 40 },
    { id: 'kablo', ad: '20 birim bakır-optik kablo çek', girdi: { kristal: 1, titanyum: 1 }, cikti: { kablo: 20 }, sure: 30 },
    { id: 'zirh', ad: 'Lamine titanyum zırh takımı', girdi: { plaka: 50, polimer: 1 }, cikti: { mod_govde: 1 }, sure: 60 },
    { id: 'guclu', ad: '50 güçlendirilmiş titanyum-karbon alaşımı', girdi: { titanyum: 3, bazalt: 1, polimer: 1 }, cikti: { guclu_alasim: 50 }, sure: 60 },
    { id: 'zirhli', ad: '100 zırhlı şasi metali ve titanyum plaka', girdi: { plaka: 100, sasi_celigi: 20 }, cikti: { zirhli_plaka: 100 }, sure: 60 },
    { id: 'helyum', ad: '30 helyum-3 soğutma tüpü', girdi: { izotop: 1, polimer: 1 }, cikti: { helyum: 30 }, sure: 45 },
    { id: 'levha', ad: '30 asit-direnç polimer levhası', girdi: { polimer: 1 }, cikti: { polimer_levha: 30 }, sure: 30 },
    { id: 'kompozit', ad: '100 titanyum-çelik kompoziti', girdi: { plaka: 50, sasi_celigi: 30 }, cikti: { kompozit: 100 }, sure: 60 },
    { id: 'hafif', ad: '60 hafif titanyum alaşımı', girdi: { titanyum: 2, kristal: 1 }, cikti: { hafif_alasim: 60 }, sure: 45 },
    { id: 'sondaj', ad: 'Hidrolik sondaj çekirdeği', girdi: { titanyum: 3, kristal: 1 }, cikti: { sondaj_cekirdegi: 1 }, sure: 90 },
    { id: 'kopuk', ad: '2 tüp dondurucu köpük', girdi: { polimer_levha: 10, helyum: 10 }, cikti: { dondurucu_kopuk: 2 }, sure: 40 },
    { id: 'cubuk', ad: '3 topraklama çubuğu', girdi: { titanyum: 1, kablo: 10 }, cikti: { topraklama_cubugu: 3 }, sure: 40 },
    { id: 'sismik', ad: 'Sismik dengeleyici', girdi: { plaka: 50, kristal: 1 }, cikti: { sismik_dengeleyici: 1 }, sure: 60 },
  ],
  reaktor_lab: [
    { id: 'yakit', ad: '10 litre standart itki yakıtı', girdi: { izotop: 1 }, cikti: { itki_yakiti: 10 }, sure: 30 },
    { id: 'iyon', ad: 'Minyatür iyon reaktörü', girdi: { izotop: 2, kristal: 1, titanyum: 1 }, cikti: { iyon_reaktoru: 1 }, sure: 90 },
    { id: 'saf', ad: '20 birim piezo-elektrik saf kristal arıt', girdi: { kristal: 2 }, cikti: { saf_kristal: 20 }, sure: 40 },
    { id: 'notralizasyon', ad: 'Nötralizasyon kulesi', girdi: { polimer_levha: 20, saf_kristal: 10, izotop: 1 }, cikti: { notralizasyon_kulesi: 1 }, sure: 90 },
    { id: 'plazma', ad: '15 litre plazma yakıtı', girdi: { izotop: 2 }, cikti: { plazma_yakiti: 15 }, sure: 40 },
    { id: 'fuzyon', ad: 'Standart plazma füzyon reaktörü', girdi: { izotop: 4, kristal: 2, titanyum: 3 }, cikti: { plazma_reaktoru: 1 }, sure: 150 },
    { id: 'graviton', ad: '10 litre graviton yakıtı', girdi: { graviton: 1 }, cikti: { graviton_yakiti: 10 }, sure: 60 },
    { id: 'metan', ad: '15 litre itki yakıtı (metandan)', girdi: { metan: 1 }, cikti: { itki_yakiti: 15 }, sure: 30 },
    { id: 'bobin', ad: 'Çift hatlı ağır hiper-sürücü bobini (kriyolit çekirdekli)', girdi: { kriyolit: 3, graviton_yakiti: 20, kseno_alasim: 30 }, cikti: { hiper_bobin: 1 }, sure: 240 },
    { id: 'kalkan', ad: 'Ağır korvet sınıfı kalkan projektörü', girdi: { saf_kristal: 20, kseno_alasim: 20, graviton_yakiti: 10 }, cikti: { kalkan_projektoru: 1 }, sure: 180 },
  ],
  sinyal_kulesi: [
    { id: 'anten', ad: 'Kripto frekans anteni', girdi: { kristal: 2, kablo: 10 }, cikti: { mod_burun: 1 }, sure: 60 },
    { id: 'cip', ad: '15 mikro-çip devresi', girdi: { kristal: 1, kablo: 5 }, cikti: { mikrocip: 15 }, sure: 40 },
    { id: 'kovucu', ad: '2 sonik kovucu', girdi: { kristal: 1, mikrocip: 5 }, cikti: { sonik_kovucu: 2 }, sure: 40 },
  ],
  biyo_kubbe: [
    { id: 'karantina', ad: 'Biyo-karantina bölmesi', girdi: { kseno: 1, polimer: 1, kristal: 1 }, cikti: { mod_bolme_a: 1 }, sure: 60 },
    { id: 'yatistirici', ad: '10 doz sakinleştirici ilaç', girdi: { kseno_spor: 1 }, cikti: { yatistirici: 10 }, sure: 40 },
    { id: 'foton', ad: 'Foton reçinesiyle kubbe aydınlatması (moral)', girdi: { foton_recinesi: 1 }, cikti: { moral: 8 }, sure: 30 },
    { id: 'kseno_alasim', ad: '50 birim kseno-alaşım ve iletken kristal', girdi: { kseno: 1, saf_kristal: 10 }, cikti: { kseno_alasim: 50 }, sure: 60 },
  ],
  kriyo_atolye: [
    { id: 'kriyo_helyum', ad: '40 helyum-3 soğutma tüpü (kriyolitten)', girdi: { kriyolit: 1 }, cikti: { helyum: 40 }, sure: 45 },
    { id: 'giysi', ad: 'Termal giysi', girdi: { polimer_levha: 20, helyum: 20 }, cikti: { esya_termal_giysi: 1 }, sure: 60 },
  ],
  // Yüzey araçları montaj hangarı: şasi çeliği atölyesi ve beş araç (araclar-ve-gemi-filosu.md bölüm 3)
  arac_hangari: [
    { id: 'sasi', ad: '30 parça şasi çeliği', girdi: { bazalt: 2, titanyum: 1 }, cikti: { sasi_celigi: 30 }, sure: 40 },
    { id: 'karakol', ad: 'Otomatik ikmal karakolu', girdi: { sasi_celigi: 40, plaka: 30, mikrocip: 10 }, cikti: { ikmal_karakolu: 1 }, sure: 90 },
    { id: 'kabuk_zirh', ad: 'Fosil kabuk araç zırhı (bütün araçlar)', girdi: { kseno_kabuk: 2, sasi_celigi: 20 }, cikti: { bayrak_kabukZirh: 1 }, sure: 90 },
    { id: 'delici_uc', ad: 'Fosil kabuk delici uç (Mammoth)', girdi: { kseno_kabuk: 2, titanyum: 2 }, cikti: { bayrak_deliciUc: 1 }, sure: 90 },
    { id: 'col_tilkisi', ad: 'Çöl Tilkisi keşif skimmer\'ı', girdi: { plaka: 80, saf_kristal: 20, itki_yakiti: 15 }, cikti: { arac_col_tilkisi: 1 }, sure: 120 },
    { id: 'mammoth', ad: 'Mammoth sondaj tankı', girdi: { sasi_celigi: 250, plaka: 60, plazma_yakiti: 30, sondaj_cekirdegi: 1 }, cikti: { arac_mammoth: 1 }, sure: 180 },
    { id: 'demir_kervan', ad: 'Demir Kervan asit taşıyıcısı', girdi: { kompozit: 400, polimer_levha: 90, itki_yakiti: 45 }, cikti: { arac_demir_kervan: 1 }, sure: 180 },
    { id: 'atmosphere_x', ad: 'Atmosphere-X VTOL mekiği', girdi: { hafif_alasim: 180, saf_kristal: 50, itki_yakiti: 35 }, cikti: { arac_atmosphere_x: 1 }, sure: 150 },
    { id: 'akrep', ad: 'Akrep otonom toplama dronu', girdi: { hafif_alasim: 30, mikrocip: 15, itki_yakiti: 5 }, cikti: { arac_akrep: 1 }, sure: 60 },
  ],
};

// Donanımlar (veri/donanim.js): her biri 'mod_<id>' parçası ve kendi tesisinde bir tarif olur
import { DONANIMLAR } from './donanim';
for (const id of Object.keys(DONANIMLAR)) {
  const x = DONANIMLAR[id];
  PARCALAR['mod_' + id] = { ad: x.ad, tarif: x.tarif, katman: id, ek: !x.katman, minSinif: x.minSinif || 3 };
  if (x.kendi) continue;
  if (!TARIFLER[x.tesis]) TARIFLER[x.tesis] = [];
  TARIFLER[x.tesis].push({ id: 'mod_' + id, ad: x.ad[0].toUpperCase() + x.ad.slice(1), girdi: x.girdi, cikti: { ['mod_' + id]: 1 }, sure: x.sure });
}
PARCA_SIRASI.splice(0, PARCA_SIRASI.length, ...Object.keys(PARCALAR));
