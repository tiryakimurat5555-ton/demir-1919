// Faz 2 bölgeleri: telsizden duyurulan yeni sektörler (gezegen-gelisimi-ve-yerel-gorevler-v2.md 2.1, 2.2, 3.1-3.5).
// Bölgelerin kendisi harita.js'te, tehlikeleri dunya.js'te (statik, magma, yarasa, cıva ve donma maruziyeti).
// Saf JavaScript.
const ad = (d, rol) => (d.murettebat[rol] ? d.murettebat[rol].ad : '');
const ilkAd = (d, rol) => ad(d, rol).split(' ')[0];
const gordu = (d, m) => (d.gorulenMekanlar || []).includes(m);

export const SAHNELER = {};

export const BILDIRIMLER = [
  {
    id: 'dogu_acik',
    rol: 1,
    kosul: (d) => !!d.bayrak.dokumhane && d.mekan === 'vadi',
    metin: (d) => 'Kaptan, ' + ilkAd(d, 1) + '. Vadinin doğu ucundan kulak tırmalayan çınlamalar alıyorum; arada statik çıtırtılar. Orası kristal bataklıkları. Geçit artık açık ama sis pusulayı şaşırtıyor: yüklenen bir sütunun çıtırtısını duyarsan ondan uzaklaş.',
  },
  {
    id: 'obsidyen_acik',
    rol: 1,
    kosul: (d) => !!d.bayrak.dokumhane && d.mekan === 'vadi' && (d.duyulanBildirimler || []).includes('dogu_acik'),
    metin: (d) => 'Kaptan, ' + ilkAd(d, 1) + ' yine. Güneybatı kanyonundan tuhaf, uzun yankılar dönüyor; sanki ötede devasa bir cam çanak var. Göçük kirişlerle açıldı.',
  },
  {
    id: 'civa_haber',
    rol: 2,
    kosul: (d) => d.mekan === 'dogu',
    metin: (d) => 'Kaptan, ' + ilkAd(d, 2) + '. Bataklığın güneybatı köşesinden aşağı bir yokuş iniyor; dibinde cıva şelaleleri var. Buharı maskeyi zorlar, kısa kal.',
  },
  {
    id: 'lav_acik',
    rol: 0,
    kosul: (d) => !!d.bayrak.sondaj && d.mekan === 'sirtlar',
    metin: (d) => 'Kaptan, ' + ilkAd(d, 0) + '. Bacalar dengelenince sırtların güney ucunda lav koridorlarına inen ağız açıldı. Orada durmak değil, kaçmak gerekir: ayağının altında gümbürtü duyarsan hemen yer değiştir.',
  },
  {
    id: 'mantar_haber',
    rol: 2,
    kosul: (d) => d.mekan === 'lav',
    metin: (d) => 'Kaptan, ' + ilkAd(d, 2) + '. Koridorların güneybatı ucunda serin bir hava akımı var; bir çatlak aşağıda nemli bir mağaraya iniyor olmalı. Sporlar sakinleştirici olabilir, örnek getir.',
  },
  {
    id: 'kriyo_acik',
    rol: 0,
    kosul: (d) => !!d.bayrak.zemin && d.mekan === 'plato',
    metin: (d) => 'Kaptan, ' + ilkAd(d, 0) + '. Platonun kuzeydoğu ucundaki buzul yarığına halat ve iskele kurdum. Aşağısı metan mağaraları; soğuk insanı hızla tüketir. Kriyo-atölyemiz olursa termal giysi yaparız.',
  },
  {
    id: 'kule_haber',
    rol: 1,
    kosul: (d) => (d.araclar || []).includes('atmosphere_x') && d.mekan === 'plato',
    metin: (d) => 'Kaptan, ' + ilkAd(d, 1) + '. Atmosphere-X hazırsa platonun kuzeybatı ucundan havada süzülen kulelere uçabilirsin. Rüzgâr aralarından flüt gibi çalıyor.',
  },
];

export const BOLGE_KAPILARI = ['dogu_gecit', 'civa_gecit', 'lav_gecit', 'mantar_gecit', 'kriyo_gecit', 'obsidyen_gecit', 'kule_inisi'];
export { gordu };
