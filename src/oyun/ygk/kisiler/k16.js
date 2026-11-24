// v6 Paket 8: Tonoflenya büyü finali. Tenohris'in altındaki kadim sunakta beş renkli taşla dev muhafız heykelleri, Kaos
// Mührü'nün üç kilidi ve siyasi kapanış. Final 17-20'nin uzay ve kara savaşları AYNEN durur; bu, yalnız Malazar Asası ve
// büyü hattını tamamlayanlara açılan ek bir son bölümdür. Yapılmazsa hiçbir şey kilitlenmez.
// Önceki büyü görevlerinin bayrakları burada okunur: toprakMuhafizi (TAS hattı), isikIpucu (IŞIK hattı), akisMuhru,
// suDengesi, tamRezonans, axiraCizgisi, sinhaAkor (Sinha K10) ve Sinha K6.
import { gorevEkle, kayit, kademe, KISILER, GOREVLER, SAHNELER, gorevDurumu } from '../bag';
import { D, S } from '../yardim';
import * as ZN from '../../tonoflenya/zanaat';
import * as BY from '../../buyu/buyu';
import { gucItibari } from '../../tonoflenya/kisiler';
import * as SY from '../siyaset';

Object.assign(ZN.ESYA, {
  malazar_kargisi: { kat: 5, ad: 'Malazar Çekirdek Kargısı', tarif: 'Sunağın kalbine saplanacak kargı; Kaelan\'ın kara buzu ve Sıfır\'ın dişlileriyle dövüldü.' },
});

const BOLGELER = [['bati', 'Batı, Filtra'], ['dogu', 'Doğu, Zorah'], ['kuzey', 'Kuzey, Zeris'], ['guney', 'Güney, Flee Plee'], ['ygk', 'YGK Akademi']];
// Bölgeden orta düzey itibar ya da o bölgenin bir kişisiyle tamamlanmış bir görev
function bolgeTamam(d, guc) {
  if (gucItibari(d, guc) >= 25) return true;
  return Object.keys(GOREVLER).some((gid) => {
    const g = GOREVLER[gid];
    const k = KISILER[g.kisi];
    return k && !k.gizli && (k.guc || 'ygk') === guc && kayit(d, g.kisi).gorev[gid] === 'bitti';
  });
}
export function finalEksikleri(d) {
  const l = [];
  if (!d.bayrak.tonoflenyaGoruldu) l.push('Tonoflenya\'ya varış');
  if (!d.buyu || (d.buyu.asa || 0) < 3) l.push('Çekirdek Yıldız Asası (üçüncü kademe; Nyxara ile)');
  const t = (d.buyu && d.buyu.taslar) || {};
  const renk = { kizil: 'kızıl', mavi: 'mavi', sari: 'sarı', yesil: 'yeşil', mor: 'mor' };
  const eksikTas = Object.keys(renk).filter((r) => !(t[r] > 0));
  if (eksikTas.length) l.push('en az birer rezonans taşı: ' + eksikTas.map((r) => renk[r]).join(', ') + ' eksik');
  const eksikB = BOLGELER.filter(([g]) => !bolgeTamam(d, g)).map((x) => x[1]);
  if (eksikB.length) l.push('orta düzey itibar ya da bir görev: ' + eksikB.join('; '));
  return l;
}
const bitti = (d, g) => kayit(d, 'saha').gorev[g] === 'bitti';
const sinhaIpucu = (d) => kademe(d, 'sinha') >= 6 || !!d.bayrak.sinhaAkor;

gorevEkle('saha', {
  id: 'BF-01', ad: 'Tenohris altı kadim sunak: beş muhafız ve Kaos Mührü', tur: 'final', k: 0, puan: 0, bolge: 'ygk',
  kosul: (d) => finalEksikleri(d).length === 0,
  kosulMetni: 'büyü finali: Çekirdek Yıldız Asası, beş renkten birer taş ve beş bölgeden itibar ya da görev gerekir',
  durum: 'Tenohris Sarayı ile YGK\'nın eksi beşinci katındaki Dünya Çivisi arasındaki kadim Malazar mührü çatladı. Onu ne teknoloji ne top mermisi kapatır: yalnız beş bölgenin taşlarıyla uyanan dev muhafızlar ve büyü ustalığı.',
  hikaye: [
    'Sarayın altında, ışığın girmediği bir salon. Dört köşede dört dev taş muhafız, ortada bir Yıldız Muhafızı; aralarında nefes alır gibi titreşen kara bir mühür.',
    (d) => (ZN.miktar(d, 'malazar_kargisi') ? '' : 'Kaelan ile "Sıfır" Makinist\'in birlikte dövdüğü Malazar Çekirdek Kargısı eline veriliyor.'),
    (d) => (d.bayrak.toprakMuhafizi ? 'Taş hattını bitirdiğin için muhafızlar asanın frekansını hemen tanıyor: kuzey geçişi yarı sürede açılacak.' : ''),
    (d) => (d.bayrak.isikIpucu ? 'Işık hattının yankısı salonda: her muhafızın yönü ve istediği taş kulağına okunuyor. Batı solda kızıl, kuzey arkada mavi, doğu sağda sarı, güney önde yeşil; merkezde mor.' : ''),
    (d) => (sinhaIpucu(d) ? 'Sinha telsizden yavaşça: "Altı yıldızın notası tek bir akorda; Yankı Düğümü\'yle çal, Zarek\'in ipucunu unutma."' : ''),
    (d) => (d.bayrak.tamRezonans || (bitti(d, 'SU-03') && bitti(d, 'KG-03') && bitti(d, 'HAVA-03')) ? 'Keralon, Kara Göl ve Malazar Hâle\'si arınmış: salon tam rezonansa hazır.' : ''),
  ],
  cozum: 'Beş heykeli taşlarıyla ve uyandırma büyüleriyle canlandır; sonra Kaos Mührü: havayı yağmura çekip yıldırım düşür, Lumina ile mühür çizgisini görüp Solis fırlatarak çekirdeği kır, Yankı Düğümü ile altı yıldızın akorunu çal.',
  basla: (d) => {
    if (!ZN.miktar(d, 'malazar_kargisi')) ZN.ekle(d, 'malazar_kargisi', 1);
    if (d.bayrak.toprakMuhafizi) BY.odakEkle(d, 30);
  },
  bulmaca: { hava: 0, kaliciTas: true, dugumler: [
    D('bati', 'Batı Ocağı Muhafızı', -0.8, 'lav', 'Heykel iki kızıl ve bir sarı taş istiyor; solunda erimiş bir bariyer kapısı.', [['kivilcim', 'heykel']], '"Ateş ve demir hatırlandı; kapı açıldı."', { tas: { kizil: 2, sari: 1 } }),
    D('kuzey', 'Kuzey Buzul Muhafızı', -0.4, 'buz', 'Heykel iki mavi ve bir yeşil taş istiyor; önünde taşan aether lavı.', [['buzul', 'heykel']], '"Sular duruldu, taş köprü sabitlendi."', { tas: { mavi: 2, yesil: 1 } }),
    D('dogu', 'Doğu Rüzgâr Muhafızı', 0, 'ruzgar', 'Heykel iki sarı ve bir kızıl taş istiyor; tepede iki yüksek enerji kolu.', [['ruzgar_ucusu', 'heykel'], ['yanki_ikizi', 'heykel'], ['sarmasik', 'sabit_yanki_muhru', 'heykel']], '"Rüzgâr iki kanadı birden eğdi."', { tas: { sari: 2, kizil: 1 } }),
    D('guney', 'Güney Şifa Muhafızı', 0.4, 'bitki', 'Heykel iki yeşil ve bir mavi taş istiyor; salonu zehirli bir spor sisi dolduruyor.', [['sivi', 'zihin_arindirma', 'heykel']], '"Zehirli nefes toprağa döndü."', { tas: { yesil: 2, mavi: 1 } }),
    D('merkez', 'Merkez Çekirdek Muhafızı', 0.8, 'kristal', 'Yıldız Muhafızı bir mor taş ve Malazar Çekirdek Kargısı istiyor.', [['oz_baglama', 'hakikat_yankisi', 'heykel']], '"Beş taş tek kalpte birleşti; çivi yeniden çakıldı."', { tas: { mor: 1 }, on: ['bati', 'kuzey', 'dogu', 'guney'] }),
    D('gok', 'Kaos Mührü: gök kilidi', -0.3, 'simsek', 'Tavanda kara bir bulut; sunak paratoneri boşta.', [['yildirim_dusur']], 'Gökyüzü yükü paratonere boşaldı.', { on: ['merkez'], ipucu: 'Önce havayı yağmura çek, sonra yıldırım düşür.' }),
    D('isik', 'Kaos Mührü: ışık ve kırma kilidi', 0.3, 'kristal', 'Görünmez bir mühür çizgisi; ortasında karanlık bir çekirdek.', [['lumina_salim', 'solis_firlat']], 'Çizgi göründü, Solis çekirdeği kırdı.', { on: ['gok'], sirali: true }),
    D('akor', 'Kaos Mührü: altı yıldız akoru', 0, 'kristal', 'Altı yıldızın notası dağınık: Zhaor, Varek, Axira, Elyndra, Sinha, Uma.', [['yanki_dugumu'], ['yanki_ikizi', 'frekans_anahtari']], 'Altı yıldızın birleşik akoru salonda yankılanıyor; Kaos Mührü kapandı.', { on: ['isik'] }),
  ] },
  secimSoru: 'Mühür kapandı. Tonoflenya\'nın güç dengesi senin zincir seçimlerinle mühürleniyor.',
  secimler: [
    S('Kapanış: Başkent ve YGK', { g_ygk: 20 }, (d) => epilog(d, 'A'), { kosul: (d) => SY.pozisyon(d) === 'A', yap: (d) => kapanis(d, 'A') }),
    S('Kapanış: taşra ve bölge ittifakı', { g_bati: 10, g_dogu: 10, g_kuzey: 10, g_guney: 10 }, (d) => epilog(d, 'B'), { kosul: (d) => SY.pozisyon(d) === 'B', yap: (d) => kapanis(d, 'B') }),
    S('Kapanış: bağımsız arabulucu, Denge Yolu', { g_ygk: 10, g_bati: 10, g_dogu: 10, g_kuzey: 10, g_guney: 10 }, (d) => epilog(d, 'C'), { kosul: (d) => SY.pozisyon(d) !== 'A' && SY.pozisyon(d) !== 'B', yap: (d) => kapanis(d, 'C') }),
  ],
});

function tamRezonans(d) {
  return !!(d.bayrak.tamRezonans || (bitti(d, 'SU-03') && bitti(d, 'KG-03') && bitti(d, 'HAVA-03')));
}
export function epilog(d, yol) {
  const l = [];
  if (yol === 'A') {
    // Valen Ak Darbe'de stasise kapatıldıysa (akademi.js valenKapali) sözü rektör vekili Morvenna Kael söyler; Valen'in yolu değişmez
    if (d.bayrak.valenKapali) {
      l.push('Tenohris kubbesinin altında rektör vekili Morvenna Kael resmi mührü indiriyor; yanında Kefius Arateon ilk kez başını eğip gülümsüyor. Eksi dördüncü katta Valen\'in hücresinin camı bir an ışıyor.');
      l.push('Morvenna Kael: "Valen yıllarca Malazar\'ın yalnız yıkım getirdiğine inandı. Sen o gücü kuralların ve aklın içine mühürledin. Bugünden itibaren büyü, YGK Akademi\'nin gizli değil resmî kürsüsüdür."');
    } else {
      l.push('Tenohris kubbesinin altında Valen Lazeria resmi mührünü indirirken, yanında duran Kefius Arateon ilk kez başını eğip gülümsüyor.');
      l.push('Valen Lazeria: "Yıllarca Malazar\'ın sadece yıkım getirdiğine inandım, kaptan. Ama sen o gücü kuralların ve aklın içine mühürledin. Bugünden itibaren büyü, YGK Akademi\'nin gizli değil resmî kürsüsüdür."');
    }
    l.push('Kefius Arateon: "Korkunun duvarlarını indirdik. Şimdi Aethelis ve Tonoflenya aynı kütüphaneden okuyacak."');
    l.push('Akademi bütün katlarıyla, altıncı kattan eksi beşe kadar, halka ve öğrencilere açıldı; Aethelis ile kalıcı bir bilgi köprüsü kuruldu.');
  } else if (yol === 'B') {
    l.push('Malkenia surlarının dışında Oronte, Kaptan Barracuda, Nyxara Vel\'din ve Mirelza aynı masanın etrafında; gökyüzünde Filtra fişekleri, uzakta Zeris\'in rüzgâr çanları.');
    l.push('Oronte: "Başkent yıllarca kristali ve çeliği tek başına tuttu. Sen ise dört bölgenin taşını tek sunakta birleştirdin."');
    l.push('Nyxara Vel\'din: "Artık kimse Malazar tozu taşıdığı için kaçak sayılmayacak. Serbest Lonca bugün doğdu."');
    l.push('Filtra, Zorah, Zeris ve Flee Plee arasında bağımsız bir ticaret ve zanaat loncası kuruldu; Başkentin tekeli kırıldı.');
  } else {
    l.push('Tenohris Sarayı\'nın altındaki büyük masada Valen ve Kefius, dört bölgenin liderleri ve gemiden inen altı YGK subayı, Elyndra, Varek, Axira, Zhaor, Sinha ve Drahmir, yan yana oturuyor.');
    l.push('Sinha Mar-Zul yavaşça: "Dinleyin... İlk kez bütün Tonoflenya tek bir notada nefes alıyor. Ne saray taşradan yüksek... ne taşra saraya düşman."');
    l.push('Varek Kaelon: "İki dünyanın barışı bir kılıçla değil, sabırla kuruldu kaptan. Onur duyuyorum."');
    l.push('Aethelis-IV ile Tonoflenya eşit ortaklar ilan edildi; bütün kapılar açık kaldı.');
  }
  if (tamRezonans(d)) l.push('Tam Rezonans: altı yıldızın akoru çalarken ' + (d.bayrak.axiraCizgisi ? 'Axira Çemberi\'nden gelen zümrüt ışık sunağa ulaşıyor; ' : '') + 'Keralon, Kara Göl ve Malazar Hâle\'sinin arınmış sesleri akora katılıyor. Salon ilk kez kusursuz bir uyumla titreşiyor.');
  l.push('Malazar Büyük Ustası unvanı senin; odak havuzun kalıcı olarak yüz yirmiye çıktı. Bölgelerdeki bağlar, yan görevler ve günlük şehir işleri istediğin zaman açık.');
  return l.join(' ');
}
function kapanis(d, yol) {
  d.bayrak.buyuFinali = yol;
  d.bayrak.malazarUstasi = true;
  if (tamRezonans(d)) d.bayrak.tamRezonansEpilog = true;
  if (!d.tf) d.tf = { biten: [], unvan: [] };
  if (!d.tf.unvan) d.tf.unvan = [];
  if (!d.tf.unvan.includes('Malazar Büyük Ustası')) d.tf.unvan.push('Malazar Büyük Ustası');
  BY.odakEkle(d, 120);
  if (yol === 'A') d.bayrak.akademiAcik = true;
  if (yol === 'B') d.bayrak.serbestLonca = true;
  if (yol === 'C') d.bayrak.esitOrtaklik = true;
  if (d.koloni) d.koloni.moral = Math.min(100, (d.koloni.moral || 0) + (yol === 'C' ? 15 : 10));
  d.ygk.sonraSahne = 'bf_akor';
}

// Kapanış sonrası: altı yıldız çanının birleşik akoru
Object.assign(SAHNELER, {
  bf_akor: {
    baslik: 'Altı yıldızın akoru',
    efekt: ['el_final_akor'],
    metin: (d) => ['Merkez sunak kapanırken altı yıldız çanının birleşik akoru bütün salonda yankılanıyor. Beş muhafız taş gözlerini kapatıyor; taşlar göğüslerinde kalıcı olarak ışıyor.', d.bayrak.tamRezonansEpilog ? 'Zümrüt ışık sunağın üstünde bir süre daha asılı kalıyor, sonra altı renge ayrılıp göğe yükseliyor.' : 'Tonoflenya büyü finali tamamlandı. Yolculuğun sürüyor.'],
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
  },
});
export const buyuFinaliDurumu = (d) => gorevDurumu(d, 'BF-01');
