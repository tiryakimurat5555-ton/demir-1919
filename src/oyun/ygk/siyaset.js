// Tonoflenya hiyerarşisi ve zincirleme etki haritası (belgeler/v6 Paket 4). Beş güç odağı tonoflenya/kisiler.js'teki
// GUCLER ve gucItibari'dir (-100…100); burada oyuncunun üç siyasi pozisyonu bu itibarlardan çıkar:
//   A Başkent / Düzen yanlısı: YGK itibarı taşranın (Batı, Güney, Kuzey ortalaması) en az 20 üstünde.
//   B Taşra İttifakı yanlısı: taşra ortalaması YGK'nın en az 20 üstünde.
//   C Bağımsız Arabulucu (Denge Yolu): YGK da taşra da en az 25.
// Pozisyon görev bağ puanını etkiler (A: akademi kişileri ×1,15, taşra ×0,9; B: tersi, Valen yarıya düşer; C: herkes
// ×1,05). Hiçbir kapıyı tamamen kapatmaz (zero-deadlock). Bağımlılık: tonoflenya/kisiler.js.
import { gucItibari, GUCLER } from '../tonoflenya/kisiler';

export const TASRA = ['bati', 'guney', 'kuzey'];
export const POZISYONLAR = {
  A: { ad: 'Başkent ve Düzen yanlısı', kazanc: 'Akademi kişilerinin görevleri bağı yüzde on beş daha hızlı ilerletir.', zorluk: 'Filtra, Fleeplee ve Zeris kişileri biraz daha temkinli: taşra görevleri bağı yüzde on daha yavaş ilerletir.' },
  B: { ad: 'Taşra İttifakı yanlısı', kazanc: 'Oronte, Barracuda, Nyxara, Mirelza ve çevrelerinin görevleri bağı yüzde on beş daha hızlı ilerletir.', zorluk: 'Valen seni tehdit görüyor: onunla bağ yarı hızda. Akademi kişileri yüzde on daha yavaş; Morvenna ve Kefius üzerinden yürümek gerekir.' },
  C: { ad: 'Bağımsız Arabulucu, Denge Yolu', kazanc: 'Hiçbir kapı kapanmaz; bütün görevler bağı yüzde beş daha hızlı ilerletir ve denge seçenekleri açılır.', zorluk: 'En zor yol: iki tarafta da en az 25 itibar ister.' },
};
const ort = (d) => TASRA.reduce((t, g) => t + gucItibari(d, g), 0) / TASRA.length;
export function pozisyon(d) {
  const y = gucItibari(d, 'ygk');
  const t = ort(d);
  if (y >= 25 && t >= 25) return 'C';
  if (y - t >= 20) return 'A';
  if (t - y >= 20) return 'B';
  return null;
}
// Görev puanı çarpanı: kişinin gücü (kisi.guc; akademi kişileri 'ygk')
export function carpan(d, kisi, tur) {
  if (tur !== 'gorev' || !d.bayrak || !d.bayrak.tonoflenyaGoruldu) return 1;
  const p = pozisyon(d);
  const g = kisi.guc || 'ygk';
  if (p === 'C') return 1.05;
  if (p === 'A') return g === 'ygk' ? 1.15 : TASRA.includes(g) || g === 'dogu' ? 0.9 : 1;
  if (p === 'B') {
    if (kisi.id === 'valen') return 0.5;
    return g === 'ygk' ? 0.9 : TASRA.includes(g) ? 1.15 : 1;
  }
  return 1;
}
export const dengeMi = (d) => pozisyon(d) === 'C';

// Paket 4 bölüm 2: güç odakları
export const ODAKLAR = [
  { guc: 'ygk', bolge: 'Merkez, YGK Akademi', lider: 'Valen Lazeria (ya da Morvenna Kael), Arkanist Kefius Arateon', rol: 'Resmî bilgi, geçiş belgeleri (Tentran kartı, ambargo), yüksek arkanist mühürleri ve yargı yetkisi.', iliski: 'Taşrayı tepeden yönetmek ister. Filtra ve Fleeplee ile gergin; Zorah ile çıkar ortaklığı.' },
  { guc: 'bati', bolge: 'Batı, Filtra', lider: 'Oronte, Sendika lideri', rol: 'Ağır sanayi, maden ve lonca gücü.', iliski: 'Başkentin vergilerinden nefret eder; Fleeplee ile gizli dayanışma, Zorah ile sınır ve ticaret rekabeti.' },
  { guc: 'dogu', bolge: 'Doğu, Zorah', lider: 'Silahşör Zeno, Kervan Yolu', rol: 'Kervan hatları, ikmal damarları ve ticaret güvenliği.', iliski: 'Kim güvenli yol sağlarsa ona yaklaşır; Filtra\'nın silahlanmasından şüphelenir, YGK ile dengeli ticaret yürütür.' },
  { guc: 'kuzey', bolge: 'Kuzey, Zeris', lider: 'Mirelza, Dış Kule ve Halyon', rol: 'Gözetleme kuleleri, rüzgâr ve fırtına geçitleri, eski gözlemciler.', iliski: 'Başkentin gizli Kat -4 ve -5 projelerinden şüphelenir; bilgi karşılığı kuzey özerkliği ister.' },
  { guc: 'guney', bolge: 'Güney, Fleeplee', lider: 'Kaptan Barracuda ve sürgün mucit Nyxara Vel\'din', rol: 'Serbest liman, kaçak teknoloji (Tether-Key) ve Arin-Malken hibrit deneyleri.', iliski: 'YGK kurallarını tanımaz; Filtra ile el altından parça değişimi yapar.' },
];

// Paket 7 bölüm 3: büyük bir zincir kararından sonra gemiye dönüşte seçkin subayların kısa yorumu (gemi ya da Tonoflenya
// limanındayken, bir sonraki ilerlemede). Yalnız seçkin kadro katıldıysa.
export const TEPKILER = {
  bati: [['drahmir', 'Başçavuş Drahmir: "Filtra\'nın ocakları sana borçlandı evlat. Sendika unutmaz; ama Başkent de unutmaz, sırtını kolla."'], ['axira', 'Dr. Axira: "Madenler büyüdükçe Loran\'ın falezleri tuzlanıyor. Kararını verdin; şimdi toprağı da düşün."']],
  dogu: [['zhaor', 'Zhaor: "Kervan yolları da yıldız rotaları gibidir; birini değiştirirsen öbürleri de kayar. Zeno sana güveniyor."'], ['varek', 'Varek: "Doğu sınırına silah girdi. Taktik olarak yerinde; ama sınırda her silah bir gün başka birine döner."']],
  kuzey: [['zhaor', 'Zhaor: "Zeris kulesinin rüzgârı şimdi bizden yana esiyor. Kuzeyin haritaları bize açılacak."'], ['varek', 'Varek: "Kuzey silahlanıyor ve Başkent bunu duydu. Denetim gelecek; hazırlıklı ol."']],
  guney: [['elyndra', 'Elyndra: "Kaçak Arin devreleri... Bilimsel olarak büyüleyici, siyasi olarak bir kıvılcım. Hata payını hesapladın mı kaptan?"'], ['sinha', 'Sinha: "Güneyin şarkısı... daha hızlı çalıyor artık. Dengeyi... duyuyor musun?"']],
  ygk: [['elyndra', 'Elyndra: "Akademinin mühürleri bizim tarafımızda. Veri yalan söylemez; ama Konsey bazen söyler."'], ['sinha', 'Sinha: "Başkent... yüksek bir nota. Taşra ise derin bir uğultu. İkisini birlikte duymak... ustalık ister."']],
};
export function tepkiEkle(d, guc) {
  if (!d.ygk) return;
  if (!d.ygk.tepki) d.ygk.tepki = [];
  if (TEPKILER[guc] && !d.ygk.tepki.includes(guc)) d.ygk.tepki.push(guc);
}
// Gemide (ya da gemi Tonoflenya limanındayken iskelede) bekleyen yorumları söyler
export function tepkiIlerle(d) {
  const t = d.ygk && d.ygk.tepki;
  if (!t || !t.length || !d.bayrak.seckinKadro) return [];
  if (!d.gemide) return [];
  const g = t.shift();
  const sec = TEPKILER[g][(d.zaman ? Math.floor(d.zaman.sn / 600) : 0) % TEPKILER[g].length];
  return [sec[1]];
}

// Menü: güç haritası, pozisyon, üç görev sınıfı
export function siyasetMenu(d) {
  const p = pozisyon(d);
  return {
    baslik: 'Tonoflenya hiyerarşisi ve zincirleme etki',
    giris: 'Pozisyonun: ' + (p ? POZISYONLAR[p].ad : 'henüz belirsiz; kararların seni bir yana çekecek') + '. ' + (p ? POZISYONLAR[p].kazanc + ' ' + POZISYONLAR[p].zorluk : ''),
    ogeler: [
      ...ODAKLAR.map((o) => ({ id: 'o_' + o.guc, etiket: o.bolge + ': itibar ' + gucItibari(d, o.guc), ipucu: o.lider, yap: () => ({ metin: (GUCLER[o.guc] || o.bolge) + '. Lider: ' + o.lider + '. ' + o.rol + ' ' + o.iliski }) })),
      ...Object.keys(POZISYONLAR).map((k) => ({ id: 'p_' + k, etiket: 'Pozisyon ' + k + ': ' + POZISYONLAR[k].ad + (p === k ? ', şu an bu' : ''), yap: () => ({ metin: POZISYONLAR[k].kazanc + ' ' + POZISYONLAR[k].zorluk }) })),
      { id: 'sinif', etiket: 'Üç görev sınıfı', yap: () => ({ metin: 'Görev listelerinde her görevin başında sınıfı okunur. Zincir: bir bölgedeki karar başka bölgedeki görevleri değiştirir. Hiyerarşi: bir lidere kendini kanıtlayıp kapalı kapıları açar. Bağ, güvenli: siyasi dengeyi hiç bozmaz, yalnız kişisel bağı derinleştirir.' }) },
    ],
  };
}
