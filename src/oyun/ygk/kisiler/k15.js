// Paket 14 bölüm 2-3 ve Paket 15: rota olayları (ROTA-01..06), Axira Çemberi (AXI-01, AXI-02), Kara Şehir'in üç kulesi
// (KAR-01), Su Mezarı eşiği (CAH-01). Hepsi gizli "saha" kaydına eklenir ("Saha büyü görevleri" listesi). LAN-01 Keşiş
// Vaelor'un görevi (k14.js). Hiçbiri ana hikâyeyi kilitlemez: yapılmazsa final görevleri aynen sürer, yapılırsa taktik
// avantaj, gizli satır ve lore açılır (savas.js, operasyon.js, final.js okur).
import { gorevEkle, kayit, KISI_EKLERI, puanEkle } from '../bag';
import { D, S } from '../yardim';
import * as ZN from '../../tonoflenya/zanaat';
import * as BY from '../../buyu/buyu';
import { SEYAHAT_KANCALARI } from '../../tonoflenya/atlas';

Object.assign(ZN.ESYA, {
  kara_sehir_kaydi: { kat: 4, ad: 'Kara Şehir Yankı Kaydı', tarif: 'Çöken savunma titreşiminin kristale işlenmiş son yankısı.' },
});

const fb = (d, n) => ((d.tf && d.tf.biten) || []).includes(n);
const bitti = (d, g) => kayit(d, 'saha').gorev[g] === 'bitti';
const ekle = (g) => gorevEkle('saha', { k: 0, puan: 0, ...g });

// --- ROTA-01..06: bölgeler arası yolculukta ilk geçişte tetiklenir (atlas.js seyahatEt → SEYAHAT_KANCALARI) ---
export const ROTALAR_OLAY = {
  'ROTA-01': { a: 'gozlem_adalari', b: 'gumus_tuy', soz: 'Spiral akıntıda yük taşıyan bir ikmal salı kayalıklara sürükleniyor.' },
  'ROTA-02': { a: 'safran', b: 'julithan', soz: 'Sarı kükürt yarıklarından boğucu gaz sızıyor; kervan yolu kapandı.' },
  'ROTA-03': { a: 'oredan', b: 'veradon', soz: 'Kanyon üstündeki eski asma köprünün bir yakası koptu.' },
  'ROTA-04': { a: 'valdren', b: 'norvask', soz: 'Dondurucu tipide görüş sıfır; bir kervanın kızakları buz tuttu.' },
  'ROTA-05': { a: 'fenrir', b: 'tharal', soz: 'Parlayan bir toz hortumu bir kuryeyi içine çekmek üzere.' },
  'ROTA-06': { a: 'keralon', b: 'fleeplee', soz: 'Zeminden yanıcı gaz kabarcıkları yükseliyor; ateş ya da kıvılcım her şeyi patlatır.' },
};
SEYAHAT_KANCALARI.push((d, y, hedef) => {
  const gecen = new Set([hedef]);
  for (const a of y.ayaklar) { gecen.add(a.a); gecen.add(a.c); gecen.add(a.from); gecen.add(a.to); }
  const l = [];
  for (const id of Object.keys(ROTALAR_OLAY)) {
    const r = ROTALAR_OLAY[id];
    if (d.bayrak['rota_' + id] || !gecen.has(r.a) || !gecen.has(r.b)) continue;
    d.bayrak['rota_' + id] = true;
    l.push('Yolda: ' + r.soz + ' İstersen "Saha büyü görevleri"nden ' + id + ' ile müdahale edebilirsin; yapmasan da yolun sürer.');
  }
  return l.join(' ');
});
const rota = (id, ad, cozum, dugumler, sonuc, odul, ek = {}) => ekle({
  id, ad, tur: 'bag',
  kosul: (d) => !!d.bayrak['rota_' + id] && !!d.bayrak.tonoflenyaGoruldu, kosulMetni: 'bu yoldan bir kez geçince açılır',
  durum: ROTALAR_OLAY[id].soz,
  hikaye: ['Yolculuğun ortasında durdun. ' + ROTALAR_OLAY[id].soz, 'Savaş yok; yalnız büyü ya da saha aracı.'],
  cozum, bulmaca: { dugumler, hava: ek.hava },
  secimler: [S('Yoluna devam et', ek.puan || {}, sonuc, { odul })],
});
rota('ROTA-01', 'Spiral akıntıda sürüklenen sal', 'Sıvı Yönlendirme ile ana akıntıyı kır; salı Canlı Sarmaşık ile kıyı babasına çek.', [
  D('akinti', 'Salın altındaki spiral akıntı', -0.3, 'su', 'Sal dönerek kayalıklara gidiyor.', [['sivi']], 'Akıntı kırıldı; sal yavaşladı.'),
  D('baba', 'Kıyı babası', 0.4, 'bitki', 'Halat yetişmiyor.', [['sarmasik'], ['tele_kaldirma']], 'Sal babaya bağlandı; ikmal kurtuldu.', { on: ['akinti'] }),
], 'Salcılar sana bir torba gümüş tozu bırakıyor.', { esya: { gumus_tozu: 2 } }, { puan: { g_guney: 5 } });
rota('ROTA-02', 'Kükürt dumanı çöken geçit', 'Hava Kontrolü (rüzgâr) ile dumanı vadi dışına süpür; Lumina İşaret Feneri ya da Lumina salımıyla güvenli çizgiyi işaretle.', [
  D('duman', 'Sarı kükürt dumanı', -0.3, 'ruzgar', 'Geçit boğucu sarı bir sisle dolu.', [['hava_ruzgar']], 'Duman vadiden dışarı süpürüldü.'),
  D('cizgi', 'Kervan yolu', 0.4, 'kristal', 'Kervan yönünü bulamıyor.', [['lumina_feneri'], ['lumina_salim']], 'Işık çizgisi boyunca kervan geçti.', { on: ['duman'] }),
], 'Kervan sana bir kutu baharat ve bir tamir kiti bırakıyor.', { esya: { tamir_kiti: 1 } }, { puan: { g_bati: 5 } });
rota('ROTA-03', 'Kırılan asma köprü halatı', 'Geçici Madde Köprüsü (ya da Aether Denge Çivisiyle desteklenmiş geçiş) kur; karşıdaki kopuk demir halkayı Metal Şekillendirme ile bağla.', [
  D('kopru', 'Kopan köprü yakası', -0.3, 'ruzgar', 'Köprü tek ipinden sallanıyor.', [['madde_koprusu'], ['denge_civisi'], ['isik_koprusu']], 'Karşıya geçtin.'),
  D('halka', 'Kopuk demir halka', 0.4, 'metal', 'Halat halkadan kurtulmuş.', [['metal']], 'Halka yeniden kaynadı; köprü sağlam.', { on: ['kopru'] }),
], 'Oredan ve Veradon kervanları köprüyü kullanabilir.', { esya: { demir_cevheri: 2 } }, { puan: { g_guney: 5 } });
rota('ROTA-04', 'Dondurucu tipide kayıp kervan', 'Solis Eritici Kapsül (ya da Sarı Solis şişesi) ile buz kilidini çöz; Hakikat Yankısı ile Norvask kule çanının gerçek yönünü bul.', [
  D('kizak', 'Buz tutmuş kızaklar', -0.3, 'buz', 'Tekerlekler ve kızaklar buzla kaynaşmış.', [['solis_kapsulu'], ['solis_salim'], ['kivilcim']], 'Buz eridi; kızaklar kayıyor.'),
  D('can', 'Tipideki çan sesi', 0.4, 'fisilti', 'Çan sesi her yönden geliyor gibi.', [['hakikat_yankisi'], ['yanki_tarama']], 'Gerçek yön bulundu; kervan Norvask\'a ulaştı.', { on: ['kizak'] }),
], 'Kervancılar sana bir şişe buzul aetheri bırakıyor.', { esya: { buzul_aether: 1 } }, { puan: { g_kuzey: 5 } });
rota('ROTA-05', 'Toz hortumu altındaki kurye', 'Hafif Süzülme ile toza basmadan kuryeye ulaş; Hava Kontrolü (basınç kubbesi) ile hortumu dağıt.', [
  D('toz', 'Parlayan toz', -0.3, 'toz', 'Diz boyu ince toz.', [['suzulme']], 'Tozun üstünden kuryeye vardın.'),
  D('hortum', 'Toz hortumu', 0.4, 'ruzgar', 'Hortum kuryeyi çekiyor.', [['hava_kubbe']], 'Hortum yukarı dağıldı.', { on: ['toz'] }),
], 'Kurye sana teslim edemediği bir paket ışık otu bırakıyor.', { esya: { urun_isik_otu: 2 } }, { puan: { g_guney: 5 } });
rota('ROTA-06', 'Bataklık gazı cebi', 'Ateş ya da yıldırım kullanmadan Hava Kontrolü (serin ya da durgun) ile gazı seyrelt, ya da Sıvı Yönlendirme ile kabarcığı suya bastır.', [
  D('gaz', 'Yanıcı gaz cebi', 0, 'fisilti', 'Kabarcıklar tısırdıyor; tek kıvılcım patlatır.', [['hava_durgun'], ['hava_serin'], ['sivi']], 'Gaz seyreldi; yol temiz.', { tehlike: { kivilcim: { ceza: 20, soz: 'Kıvılcım gazı ateşledi! Patlama seni geri savurdu.' }, yildirim_rez: { ceza: 20, soz: 'Yıldırım gazı ateşledi! Patlama seni geri savurdu.' } } }),
], 'Bataklık yolcuları sana fosforlu liken veriyor.', { esya: { urun_fosforlu_liken: 2 } }, { puan: { g_guney: 5 } });

// --- AXI-01, AXI-02: Axira Çemberi ve Final 17'nin yanal köprüsü ---
ekle({ id: 'AXI-01', ad: 'Gündüz ışığını yutan yedi karo', tur: 'zincir', bolge: 'ygk',
  kosul: (d) => fb(d, 16), kosulMetni: '16. büyük görevden (Kara Şehir) sonra açılır',
  durum: 'Kuşatma öncesinde Axira Çemberi\'nin zemin taşları ters fazda kilitlenmiş; sarayın kristal katmanlarına giden dış meydan kararmış.',
  hikaye: ['Malkenia\'yı Tenohris\'ten ayıran oval meydan karanlık. Taban taşları gündüz yıldız ışığını hapsederdi; şimdi hiçbiri ışımıyor.'],
  cozum: 'Üç güneş-yıldız taşına Lumina salımı ver; iki uçtaki zıt karolara Yankı İkizi (ya da Sabit Yankı Mührü) ile aynı anda bas; çizginin ucundaki kırık mermer basamaktan Aether Adımı ile geç.',
  bulmaca: { dugumler: [
    D('yildiz', 'Üç güneş-yıldız taşı', -0.5, 'kristal', 'Gömülü ışık devresi uyuyor.', [['lumina_salim'], ['lumina_firlat']], 'Taşların altında bir devre uyandı.'),
    D('faz', 'Meydanın iki ucundaki zıt karolar', 0, 'tas', 'Aynı saniyede basılmalı.', [['yanki_ikizi'], ['sabit_yanki_muhru']], 'Ortadaki taş dairesi döndü; yerden zümrüt bir kılavuz çizgi yükseldi.', { on: ['yildiz'] }),
    D('basamak', 'Kırık mermer basamak', 0.5, 'ruzgar', 'Çizginin ucunda boşluk.', [['aether_adimi'], ['suzulme']], 'Saray duvarının altında Eski Muhafız Bakım Odası.', { on: ['faz'] }),
  ] },
  secimler: [S('Bakım odasını işaretle', { g_ygk: 10 }, 'Zümrüt çizgi Tenohris\'e kadar uzanıyor; saray duvarının altındaki eski bakım odası artık haritanda.', { bayrak: ['axiraCizgisi'] })],
});
ekle({ id: 'AXI-02', ad: 'Tenohris\'in sessiz kapısı', tur: 'hiyerarsi', once: ['AXI-01'],
  kosul: (d) => fb(d, 16), kosulMetni: '16. büyük görevden sonra açılır',
  durum: 'Eski bakım kapısı Tenohris\'in kristal tabanına doğrudan çıkıyor; kilidi paslı, üstünde saray mührü.',
  hikaye: ['Kapı ana saray kapısından bağımsız; kuşatma sırasında bile buradan avluya sızılabilir.', (d) => (ZN.miktar(d, 'golge_sifre') > 0 ? 'Gölge mühür şifre çözücün kilidi tek adımda tanıdı.' : '')],
  cozum: 'Paslı kilit mekanizmasını Metal Şekillendirme ile düzelt; saray mührünü kırmadan Öz Bağlama ile (ya da gölge şifre çözücüyle) aç.',
  bulmaca: { dugumler: [
    D('pas', 'Paslı kilit mekanizması', -0.3, 'metal', 'Dişliler kaynamış.', [['metal']], 'Mekanizma döndü.'),
    D('muhur', 'Saray mührü', 0.4, 'elektrik', 'Kırılırsa saray alarmı çalar.', [['oz_baglama']], 'Mühür kırılmadan açıldı.', { on: ['pas'] }),
  ] },
  secimler: [S('Yanal girişi açık bırak', { g_ygk: 10, valen: 10 }, (d) => 'Kuşatmada istersen ana kapı çatışmasına girmeden doğrudan saray avlusuna sızabileceksin.' + (d.bayrak.karKule >= 3 ? ' Kara Şehir\'in kuleleri de çöktüğü için filo Tenohris\'e geçerken hasar almayacak.' : ''), { bayrak: ['axiraYanGecit'], yap: (d) => { if (ZN.miktar(d, 'golge_sifre') > 0) BY.odakEkle(d, 15); } })],
});

// --- KAR-01: Kara Şehir'in üç gözetleme kulesi (her kule ayrı; sayısı bayrak.karKule) ---
const kule = (id, ad, durum, cozum, dugumler) => ekle({ id, ad, tur: 'zincir', bolge: 'kuzey',
  kosul: (d) => fb(d, 15), kosulMetni: '15. büyük görevden sonra, Kara Şehir saldırısından önce açılır',
  durum, hikaye: [(d) => (fb(d, 16) ? 'Kara Şehir düştü; kule yine de sessizce gevşetilebilir, eski yankısı kayda geçer.' : 'Mareşal Elyon Vane\'nin gözcüleri: "Kulelere doğrudan saldırmak bütün şehir zeminini sarsar. Dış topraklama düğümlerinden sessizce gevşetin."'), durum],
  cozum, bulmaca: { dugumler },
  secimler: [S('Kuleyi gevşet', { g_kuzey: 5 }, (d) => {
    const n = ['KAR-01a', 'KAR-01b', 'KAR-01c'].filter((x) => x === id || bitti(d, x)).length;
    return n === 1 ? 'Bir kule gevşedi: Kara Şehir\'deki ilk kalkan darbesi zayıflayacak.' : n === 2 ? 'İki kule gevşedi: kulelerin görüş paraziti kalktı, gizli yan geçit görünür.' : 'Üç kule birden: savunma titreşimi tamamen çöktü. Kara Şehir Yankı Kaydı elinde; Corinne ya da Kefius\'a verebilirsin.';
  }, { yap: (d) => {
    d.bayrak.karKule = ['KAR-01a', 'KAR-01b', 'KAR-01c'].filter((x) => x === id || bitti(d, x)).length;
    if (d.bayrak.karKule === 3) ZN.ekle(d, 'kara_sehir_kaydi', 1);
  } })],
});
kule('KAR-01a', 'Uyanan kuleler: Kuzey İğnesi', 'Kule dibinde üç özdeş bakır kapak; ikisi sahte alarm düğümü. Yanlış kapak öbür kulelerin frekansını hızlandırır.', 'Hakikat Yankısı (ya da yıldız pusulası) ile altından kalp atışı gelen gerçek kapağı bul; mandalı Metal Şekillendirme ile aç.', [
  D('kapak', 'Üç bakır kapak', -0.3, 'metal', 'Üçü de aynı görünüyor.', [['hakikat_yankisi'], ['yanki_tarama']], 'Ortadaki kapağın altında düşük bir nabız.', { tehlike: { metal: { ceza: 15, soz: 'Yanlış kapak! Keskin bir metalik alarm; öbür kuleler hızlandı.' } } }),
  D('mandal', 'Gerçek kapağın mandalı', 0.4, 'metal', 'Mandal ağır ve paslı.', [['metal'], ['tele_kaldirma']], 'Mandal açıldı; Kuzey İğnesi sustu.', { on: ['kapak'] }),
]);
kule('KAR-01b', 'Uyanan kuleler: Bazalt Kapı Kulesi', 'Topraklama kolu ancak iki karşıt sütundaki basınç plakasına aynı saniyede basılınca yuvasından çıkar.', 'Yankı İkizi (ya da Sabit Yankı Mührü) ile karşı sütunu sabitle; topraklama kolunu Metal Şekillendirme ile kırk beş derece dışa bük.', [
  D('plaka', 'Karşıt basınç plakaları', -0.3, 'tas', 'İki sütun on adım arayla.', [['yanki_ikizi'], ['sabit_yanki_muhru']], 'İki plaka birden basıldı; kol yuvasından çıktı.'),
  D('kol', 'Topraklama kolu', 0.4, 'metal', 'Ağır gıcırtı; kol dik duruyor.', [['metal']], 'Kol dışa büküldü; Bazalt Kapı sustu.', { on: ['plaka'] }),
]);
kule('KAR-01c', 'Uyanan kuleler: Çatlak Çan Kulesi', 'Üçüncü kulenin kolu aşırı ısıdan kaynaşmış; zorlamak kolu kırar ve alarmı tetikler.', 'Önce Buzul Mühür (ya da Hava Kontrolü: serin) ile metalin ısısını düşür; ardından Metal Şekillendirme ile kilit pimini çıkar.', [
  D('isi', 'Kızgın kaynaşmış kol', -0.3, 'lav', 'Kol kızıl kor; dokunulmuyor.', [['buzul'], ['hava_serin']], 'Metal soğudu.', { tehlike: { metal: { ceza: 15, soz: 'Kızgın metal zorlanınca çatırdadı; alarm yaklaştı.' } } }),
  D('pim', 'Kilit pimi', 0.4, 'metal', 'Pim soğuk ve sıkı.', [['metal']], 'Pim çıktı; Çatlak Çan sustu.', { on: ['isi'] }),
]);

// --- CAH-01: Su Mezarı'nın üçlü eşiği ---
ekle({ id: 'CAH-01', ad: 'Su Mezarının üçlü eşiği ve Cahelon\'un yankıları', tur: 'zincir', bolge: 'guney',
  kosul: (d) => fb(d, 19), kosulMetni: '19. büyük görevden (Lanetli Gezegene Hiper-Sıçrama) sonra açılır',
  durum: 'Cahelon\'un mezarına inen kapı yalnız mekanik bir duvar değil: su basıncı, zift karanlığı ve üç yankı anısıyla örülmüş.',
  hikaye: ['Keralon\'un derinliklerinden açılan dış eşik galerisi. Su altı basıncı kalp atışı gibi vuruyor.', (d) => (d.bayrak.suDengesi ? 'Keralon ve Kara Göl arındırıldığı için su basıncı zaten yarıya düşmüş: akıntılar tek hamlede çekilecek.' : '')],
  cozum: 'Üç ters akıntıyı Sıvı Yönlendirme ile tahliye boşluklarına çek; çatlakları Buzul Mühür ile kilitle; üç ıslak kabartmaya Hakikat Yankısı uygula; yarığı Işık Köprüsü (varsa Aether Denge Çivisi) ile geç.',
  bulmaca: { dugumler: [
    D('girdap', 'Üç ters akıntı kolu', -0.6, 'su', 'Akıntılar seni geri itiyor.', [['sivi']], 'Akıntılar yan boşluklara çekildi.'),
    D('catlak', 'Kapının iki yanındaki çatlaklar', -0.2, 'buz', 'Su sızıyor.', [['buzul']], 'Buz çatırdayarak çatlakları mühürledi.', { on: ['girdap'] }),
    D('kabartma', 'Üç ıslak taş kabartma', 0.2, 'fisilti', 'Taşlardan eski, yankılı sesler süzülüyor.', [['hakikat_yankisi']], 'Üç fısıltı: Cahelon Birinci Çağ\'da Tonoflenya\'yı kurtarmak için kendini buraya kapattı; Kefius\'un ve Valen\'in ataları mezarı bu yüzden gizledi; ve bekliyor... onu artık zincir değil, bir söz özgür bırakacak.', { on: ['catlak'] }),
    D('yarik', 'Dipsiz su yarığı', 0.6, 'kristal', 'Karşıda yüzleşme platformu.', [['isik_koprusu'], ['isik_koprusu', 'denge_civisi'], ['aether_adimi']], 'Platforma geçtin; odağın tam.', { on: ['kabartma'] }),
  ] },
  secimler: [S('Yüzleşmeye hazırlan', { g_guney: 5, kefius: 10, valen: 10 }, 'Cahelon\'un üç yankısını taşıyorsun. Hesaplaşmada ona söyleyecek bir sözün var.', { bayrak: ['cahelonYanki'], yap: (d) => { BY.odakEkle(d, 999); if (d.bayrak.suDengesi) BY.odakEkle(d, 20); } })],
});

// Kara Şehir Yankı Kaydı: Corinne ya da Kefius'a (kişi menülerinde)
KISI_EKLERI.push((d, id) => {
  if ((id !== 'corinne' && id !== 'kefius') || ZN.miktar(d, 'kara_sehir_kaydi') < 1) return [];
  return [{ id: 'kara_kayit', etiket: 'Kara Şehir Yankı Kaydını ver', yap: (z) => {
    ZN.ekle(z, 'kara_sehir_kaydi', -1);
    puanEkle(z, id, 30, 'gorev');
    z.bayrak['karaKayit_' + id] = true;
    if (!z.kodeks.some((x) => x.id === 'kara_sehir_kaydi')) z.kodeks.push({ id: 'kara_sehir_kaydi', ad: 'Kara Şehir\'in son yankısı', tarif: 'Üç gözetleme kulesinin çöken savunma titreşimi; Kahergonat\'ın neden yüzyıllarca uyuduğunun ipucu.', itibar: 10 });
    return { metin: id === 'corinne' ? 'Corinne kaydı arşive yerleştiriyor: "Kahergonat\'ın sesi... ilk kez bir kristalde."' : 'Kefius kaydı dinliyor, uzun süre susuyor: "Sharon\'un uyandırdığı şey bu titreşimdi."' };
  }, geri: true }];
});
