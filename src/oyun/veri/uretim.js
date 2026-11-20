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
};

export const PARCA_SIRASI = ['plaka', 'kablo', 'itki_yakiti', 'iyon_reaktoru', 'mod_burun', 'mod_govde', 'mod_bolme_a'];

// Üretim tarifleri: tesis → tarifler. girdi hammadde ya da parça olabilir. sure: saniye (sanayi iş gücü kısaltır).
export const TARIFLER = {
  dokumhane: [
    { id: 'plaka', ad: '50 titanyum-karbon plaka dök', girdi: { titanyum: 2, bazalt: 1 }, cikti: { plaka: 50 }, sure: 40 },
    { id: 'kablo', ad: '20 birim bakır-optik kablo çek', girdi: { kristal: 1, titanyum: 1 }, cikti: { kablo: 20 }, sure: 30 },
    { id: 'zirh', ad: 'Lamine titanyum zırh takımı', girdi: { plaka: 50, polimer: 1 }, cikti: { mod_govde: 1 }, sure: 60 },
  ],
  reaktor_lab: [
    { id: 'yakit', ad: '10 litre standart itki yakıtı', girdi: { izotop: 1 }, cikti: { itki_yakiti: 10 }, sure: 30 },
    { id: 'iyon', ad: 'Minyatür iyon reaktörü', girdi: { izotop: 2, kristal: 1, titanyum: 1 }, cikti: { iyon_reaktoru: 1 }, sure: 90 },
  ],
  sinyal_kulesi: [{ id: 'anten', ad: 'Kripto frekans anteni', girdi: { kristal: 2, kablo: 10 }, cikti: { mod_burun: 1 }, sure: 60 }],
  biyo_kubbe: [{ id: 'karantina', ad: 'Biyo-karantina bölmesi', girdi: { kseno: 1, polimer: 1, kristal: 1 }, cikti: { mod_bolme_a: 1 }, sure: 60 }],
};
