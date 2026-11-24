// Tonoflenya seyahat ve geçit kuralları (v4 tonoflenya-bolgesel-gorevler-ve-ambargo-entegrasyonu bölüm 1). Bağımlılıksız:
// atlas.js içe aktarır (bolgesel.js'teki hikâyeler zanaat üzerinden atlas'a döndüğü için ayrı dosya).
const b = (d) => d.bayrak;
const fb = (d, n) => !!(d.tf && d.tf.biten && d.tf.biten.includes(n));
const esya = (d, k) => (d.esya && d.esya[k]) || 0;

// --- Bölüm 1: seyahat kuralları ---
// Ambargoda taşra seçildiyse Magentor kapıları kapalı: yalnız sıradaki final görevi oradaysa geçilir
const MAGENTOR = ['halka_zhaor', 'halka_varek', 'halka_axira', 'halka_sinha', 'halka_uma', 'halka_elyndra', 'tenohris', 'kara_gol'];
export function magentorKapali(d) {
  if (b(d).ambargo !== 'tasra' || fb(d, 18)) return false;
  return true;
}
// d: oyun, y: yolBul sonucu (ayaklar), hedef: BOLGELER kimliği, bolgeler: BOLGELER. Dönüş: { red } ya da { notlar, ek }
export function seyahatKurali(d, y, hedef, bolgeler, finalNoktaMekani) {
  const notlar = [];
  const g = bolgeler[hedef];
  const gecer = (id) => y.ayaklar.some((a) => a.a === id || a.c === id) || hedef === id;
  if (!fb(d, 1) && hedef !== 'ygk') return { red: 'Muhafız: "Başkente ve kuşaklara geçiş YGK Kayıt Mührü ister." Final görevi birden sonra açılır.' };
  // ZAH-03 Tarafsız Kervan Mühürü ambargoyu kırar
  if (hedef === 'magentor' && magentorKapali(d) && esya(d, 'tarafsiz_muhur') < 1 && !(finalNoktaMekani && MAGENTOR.includes(finalNoktaMekani))) {
    return { red: 'Büyük Ambargo: Magentor\'un kapıları taşra ittifakına kapalı. Akademiye yalnız eksi birinci kattaki Kör Rıhtım\'dan gizlice girilir.' };
  }
  if (gecer('tentran')) {
    const harc = esya(d, 'tentran_izni') > 0 || esya(d, 'sahte_gumruk_belgesi') > 0 ? 10 : 40; // CAK-02 sahte belge izin sayılır
    if ((d.koloni.kaynaklar.isik_tozu || 0) < harc) return { red: 'Tentran ışınlanma kapısı: ' + harc + ' gram Fenrir ışık tozu harcı gerekir' + (harc > 10 ? ' (Tentran Işınlanma İzni olsa on gram yeterdi).' : '.') };
    d.koloni.kaynaklar.isik_tozu -= harc;
    notlar.push('Tentran kapısında ' + harc + ' gram ışık tozu harcı ödendi' + (harc > 10 ? '; Tentran Işınlanma İzni yok, geçici izin pahalı.' : '.'));
  }
  if (hedef === 'arin') {
    const atmos = (d.araclar || []).includes('atmosphere_x');
    if (b(d).arinKapali && !atmos) return { red: 'Arin hava sahası kapalı: Barracuda\'yı koruduğun için Aethelgard izin vermiyor. Yalnız Atmosphere-X ile inilir.' };
    if (!atmos && !b(d).ygkKayit) return { red: 'Arin Adası\'na yalnız Atmosphere-X ya da YGK hava izniyle çıkılır.' };
  }
  if (y.ayaklar.some((a) => a.tehlike === 'kum') && esya(d, 'ajmero_kuresi') < 1) notlar.push('Ajmero küresi yok: Zorah fırtınası kervanı sert dövdü.');
  if (y.ayaklar.some((a) => a.mod === 'deniz_mormon')) {
    const korunur = d.gemi && (d.gemi.sinif || 1) >= 2 && (esya(d, 'mormon_pusulasi') > 0 || (b(d).tehlikeMuaf && b(d).tehlikeMuaf.mormon));
    if (!korunur && d.gemi) {
      d.gemi.govde = Math.max(1, Math.round(d.gemi.govde - (d.gemi.maxGovde || d.gemi.govde) * 0.1));
      notlar.push('Mormon girdabı gövdeyi hırpaladı: Sınıf II gemi ve Mormon pusulası ya da girdap bağışıklığı olmadan geçilmez gibi.');
    }
  }
  return { notlar, gidis: g };
}
// Zinas fırtınasında avantaj
export function zinasAvantaji(d) {
  return (d.araclar || []).includes('col_tilkisi') || (!!d.gemi && (d.gemi.sinif || 1) >= 2);
}

