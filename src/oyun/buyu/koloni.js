// Koloni çapası: Axelum Tapınağı'nda sekiz temel büyü ve şişeleme, Malken doğa büyüsü (Sorya ya da Dr. Lyris),
// tapınak dersliğinde dört alıştırma odası ve kolonideki beş saha bulmacası (belgeler/v6 Paket 1 bölüm 2 Katman 1,
// Paket 2 bölüm 3-4). Ortak Okul'un akademi kolu YGK'ya rezonans mektubu gönderir (Paket 3 bölüm 1).
import * as Z from '../zaman';
import * as BY from './buyu';
import * as BM from './bulmaca';
import { BUYULER, TUREVLER } from './veri';
import { NOKTALAR, MEKANLAR } from '../yuzey/harita';

// Tonoflenya'nın açık gökyüzü bölgelerinde yıldız tozu (Paket 2 bölüm 3.1)
BY.DEFTER_EKLERI.push((d) => {
  const mk = MEKANLAR[d.mekan];
  if (!mk || !mk.tonoflenya || !mk.dis || !BY.biliyor(d, 'siseleme')) return [];
  const r = BY.tozRengi(d);
  return [{ id: 'toz', etiket: 'Açık gökyüzünde yıldız tozu topla' + (r ? ': havada ' + (r === 'lumina' ? 'beyaz Lumina' : 'sarı Solis') : ', şimdi havada toz yok'), yap: (z) => BY.tozTopla(z, z.mekan) }];
});

// --- Öğrenme bulmacaları ---
const OGRENME = {
  kivilcim: ['Buz tutmuş deneme kilidi', 'Kırağı bağlamış küçük bir kilit; soğuk bir çıtırtı.'],
  buzul: ['Kızgın bakır ızgara', 'Kıpkızıl bir ızgara; havayı titreten sıcaklık.'],
  suzulme: ['Sunağın önündeki yarık', 'İki adım genişliğinde karanlık bir yarık; dipten rüzgâr çıkıyor.'],
  tele_kaldirma: ['Ağır taş kapak', 'Yerde, halkası kırılmış bir taş kapak.'],
  devre: ['Sönük rezonans lambası', 'Eski bir lamba; içinde ölü bir devre.'],
  frekans_anahtari: ['Çanlı ton kilidi', 'Üç çanlı küçük bir kilit; bir tonu bekliyor.'],
  yanki_tarama: ['Düz duvar', 'Düz bir duvar; ama yankısı tuhaf geliyor.'],
  zihin_arindirma: ['Fısıltılı kristal', 'Kristalden kafa karıştıran fısıltılar sızıyor.'],
};
for (const k of Object.keys(OGRENME)) BM.ogrenmeBulmacasi(k, [k], OGRENME[k][0], OGRENME[k][1]);
BM.ogrenmeBulmacasi('siseleme', ['lumina_salim', 'solis_salim'], 'Karanlık niş', 'Sunağın ardında, ışık almayan bir niş; içinde bir yazıt olmalı.');
BM.BULMACALAR.ogren_siseleme.basla = (d) => {
  if (!BY.siseVarMi(d, 'lumina') && !BY.siseVarMi(d, 'solis')) BY.siseEkle(d, 'lumina', 1);
};
BM.BULMACALAR.ogren_siseleme.giris = 'Sunağın rahibe defterinde şişelemenin kuralı yazılı: toz yalnız açık gökyüzünde, Gümüş Şafak ve Mor İkindi\'de beyaz, Mavi Akşam\'da sarı süzülür. Sunak ilk şişeni dolu verdi. Önce asanın ucunda şişeyi aralamayı, sonra nişi aydınlatmayı dene.';
BM.ogrenmeBulmacasi('sarmasik', ['sarmasik'], 'Duvar dibindeki kuru çatlak', 'Tapınak duvarında kuru bir çatlak; içine bir tohum bıraktın.');

const TAPINAK = ['kivilcim', 'buzul', 'suzulme', 'tele_kaldirma', 'devre', 'frekans_anahtari', 'yanki_tarama', 'zihin_arindirma', 'siseleme'];
const malkenDogaUstasi = (d) => (d.bayrak.yk_sorya_6 ? 'Sorya' : d.bayrak.yk_lyris_6 ? 'Dr. Lyris' : null);
export function ogrenmeMenu(d) {
  BY.hazirla(d);
  const l = TAPINAK.map((k) => {
    const x = BUYULER[k] || TUREVLER[k];
    const bil = BY.biliyor(d, k);
    return { id: 'o_' + k, etiket: x.ad + (bil ? ', biliyorsun' : ', öğren'), ipucu: x.islev, yap: (z) => (bil ? { metin: x.ad + ' zaten sende. Ustalığı kullandıkça artar.' } : BM.baslat(z, 'ogren_' + k, { ogren: k })) };
  });
  const usta = malkenDogaUstasi(d);
  l.push({
    id: 'o_sarmasik',
    etiket: TUREVLER.sarmasik.ad + (BY.biliyor(d, 'sarmasik') ? ', biliyorsun' : usta ? ', ' + usta + ' öğretiyor' : ', kilitli'),
    ipucu: TUREVLER.sarmasik.islev + (usta ? '' : ' Malken doğa büyüsü: Sorya ya da Dr. Lyris\'le altıncı kademeye varınca öğretirler.'),
    yap: (z) => (BY.biliyor(z, 'sarmasik') ? { metin: 'Sarmaşık büyüsü zaten sende.' } : usta ? (BM.baslat(z, 'ogren_sarmasik', { ogren: 'sarmasik' })) : { metin: 'Malken doğa büyüsünü yerleşimcilerden Sorya ya da Dr. Lyris bilir; onlarla altıncı kademeye varınca sana öğretirler.', ses: 'red' }),
  });
  const n = TAPINAK.filter((k) => BY.biliyor(d, k)).length;
  return {
    baslik: 'Axelum dersliği: temel büyüler',
    giris: 'Tapınağın rezonans sunağı her ekolün iki kök büyüsünü ve temel şişelemeyi öğretir. Her büyü önce asanın ucunda bir frekans ayarıyla, sonra hedefte tek bir denemeyle öğrenilir; odak harcamaz. ' + n + ' / ' + TAPINAK.length + ' öğrenildi. İleri ve usta büyüler YGK Akademi\'deki hocalardan öğrenilir.',
    ogeler: l,
  };
}

// --- Tapınak dersliği: dört alıştırma odası ---
BM.bulmacaEkle('ders_element', {
  ad: 'Derslik: ateş ve buz odası',
  giris: 'Taş bir oda. Solda buz tutmuş bir kapı çıtırdıyor, sağda bir lav ızgarası fokurduyor, karşıda bir gözcü kristali odayı izliyor.',
  dugumler: [
    { id: 'buz_kapi', ad: 'Buz tutmuş kapı', pan: -0.7, mesafe: 0.4, ses: 'buz', durum: 'Kapının menteşelerini kalın bir buz sarmış.', kombolar: [['kivilcim'], ['solis_salim']], cozuldu: 'Buz eriyip damladı; kapı aralandı.' },
    { id: 'lav', ad: 'Lav ızgarası', pan: 0.7, mesafe: 0.5, ses: 'lav', durum: 'Izgaranın altından kızgın bir akıntı geçiyor; üstünden yürünmez.', kombolar: [['buzul'], ['hava_ayaz']], cozuldu: 'Akıntının yüzü kabuk bağladı; ızgara soğudu.' },
    { id: 'gozcu', ad: 'Gözcü kristali', pan: 0, mesafe: 0.8, ses: 'kristal', durum: 'Kristal seni görüyor; önünden geçersen alarm çalar. Ardında çıkış.', kombolar: [['buzul', 'kivilcim'], ['hava_sis']], sirali: false, ara: 'Bir buğu yükseldi; peşinden ters bir element gelirse buhar perdesi olur.', ipucu: 'Peş peşe soğuk ve sıcak: yoğun bir buhar perdesi kristali kör eder. Ya da hava kontrolüyle sis.', cozuldu: 'Yoğun buhar perdesi kristali kör etti.' },
  ],
  bitis: 'Ateş ve buz odası geçildi. Rahibe defterine bir not düşüyor: element dengesi.',
  odul: { odak: 20, sise: { lumina: 1 } },
});
BM.bulmacaEkle('ders_tasima', {
  ad: 'Derslik: boşluk ve ağırlık odası',
  giris: 'Odanın ortasında bir yarık, karşı kıyısında ağır bir taş sandık. Sandığın altında derslik anahtarı.',
  dugumler: [
    { id: 'yarik', ad: 'Ortadaki yarık', pan: 0, mesafe: 0.3, ses: 'ruzgar', durum: 'Yarığın dibinden soğuk bir rüzgâr; atlanmayacak kadar geniş.', kombolar: [['suzulme']], cozuldu: 'Süzülerek karşı kıyıya geçtin.' },
    { id: 'sandik', ad: 'Ağır taş sandık', pan: 0.5, mesafe: 0.8, ses: 'tas', durum: 'Kollarınla kıpırdatamazsın.', kombolar: [['tele_kaldirma']], on: ['yarik'], cozuldu: 'Sandık havaya yükseldi; altındaki anahtarı aldın.' },
  ],
  bitis: 'Boşluk ve ağırlık odası geçildi.',
  odul: { odak: 15, esya: { gumus_tozu: 1 } },
});
BM.bulmacaEkle('ders_tekno', {
  ad: 'Derslik: ölü devre ve ton kilidi',
  giris: 'Eski bir yük asansörü ve çanlı bir kapı. İkisi de yüzyıllardır sessiz.',
  dugumler: [
    { id: 'asansor', ad: 'Ölü yük asansörü', pan: -0.5, mesafe: 0.5, ses: 'elektrik', durum: 'Panelinde tek bir kıvılcım bile yok.', kombolar: [['devre']], cozuldu: 'Asansör vınlayarak uyandı ve seni kapının önüne taşıdı.' },
    { id: 'ton_kapi', ad: 'Çanlı ton kapısı', pan: 0.5, mesafe: 0.6, ses: 'kristal', durum: 'Kapının çanları bir tonu bekliyor.', kombolar: [['frekans_anahtari']], on: ['asansor'], cozuldu: 'Doğru frekans çanlarda çınladı; kapı açıldı.' },
  ],
  bitis: 'Tekno odası geçildi.',
  odul: { odak: 15, esya: { piezo: 1 } },
});
BM.bulmacaEkle('ders_yanki', {
  ad: 'Derslik: gizli oda ve fısıltı',
  giris: 'Karanlık, boş görünen bir oda. Bir yerden fısıltılar geliyor.',
  dugumler: [
    { id: 'gizli', ad: 'Düz duvar', pan: -0.6, mesafe: 0.5, ses: 'fisilti', durum: 'Düz bir duvar ama yankısı boş.', kombolar: [['yanki_tarama'], ['lumina_salim']], cozuldu: 'Duvarın ardında gizli bir niş belirdi.' },
    { id: 'fisilti', ad: 'Fısıltılı köşe', pan: 0.6, mesafe: 0.4, ses: 'fisilti', durum: 'Kafanın içinde sayıları karıştıran fısıltılar.', kombolar: [['zihin_arindirma']], cozuldu: 'Fısıltılar dindi; aklın berraklaştı.' },
  ],
  bitis: 'Yankı ve zihin odası geçildi. Dört ekolün temelini sınadın.',
  odul: { odak: 15, esya: { urun_kristal_cicek: 1 } },
});
const DERSLER = ['ders_element', 'ders_tasima', 'ders_tekno', 'ders_yanki'];
export function derslikMenu(d) {
  return {
    baslik: 'Tapınak dersliği: alıştırma odaları',
    giris: 'Dört ekolün alıştırma odası. İlk geçişte ödül verir; sonra istediğin kadar tekrar edip ustalık kazanabilirsin.',
    ogeler: DERSLER.map((id) => ({ id, etiket: BM.BULMACALAR[id].ad + (BM.bittiMi(d, id) ? ', geçildi' : ''), yap: (z) => BM.baslat(z, id) })),
  };
}

// --- Koloni saha bulmacaları ---
BM.bulmacaEkle('enkaz_kasasi', {
  ad: 'Kopan modülün mühürlü kasası',
  giris: 'Enkazın altında, iniş sırasında ezilmiş bir güvenlik kasası. Üstünde çarpık bir kapak, yanında donmuş bir kilit paneli.',
  dugumler: [
    { id: 'kapak', ad: 'Çarpık enkaz kapağı', pan: -0.4, mesafe: 0.4, ses: 'metal', durum: 'Yarım tonluk eğri bir sac; kasayı örtüyor.', kombolar: [['tele_kaldirma']], cozuldu: 'Kapak gıcırdayarak kalktı ve yana devrildi.' },
    { id: 'panel', ad: 'Kilit paneli', pan: 0.3, mesafe: 0.5, ses: 'elektrik', durum: 'Ekranı kararmış, tuşları buz tutmuş.', kombolar: [['devre'], ['kivilcim', 'frekans_anahtari']], on: ['kapak'], cozuldu: 'Panel bir an aydınlandı; kilidin dilleri çekildi.' },
  ],
  bitis: 'Kasanın içinde öncü ekibin unuttuğu acil durum malzemesi.',
  odul: { odak: 10, sise: { solis: 1 }, esya: { gumus_tozu: 2 } },
});
BM.bulmacaEkle('gozlem_mercekleri', {
  ad: 'Gözlem tepesinin yıldız mercekleri',
  giris: 'Gözlem kulesinin tepesinde eski bir mercek dizisi. Motoru sessiz, ayar çanı sağır, yıldız haritası tozla örtülü.',
  dugumler: [
    { id: 'motor', ad: 'Mercek motoru', pan: -0.6, mesafe: 0.4, ses: 'elektrik', durum: 'Dişlileri yerinde ama akım yok.', kombolar: [['devre']], cozuldu: 'Motor homurdanarak dönmeye başladı.' },
    { id: 'can', ad: 'Ayar çanı', pan: 0, mesafe: 0.6, ses: 'kristal', durum: 'Mercekleri hizalayan çan; bir frekans bekliyor.', kombolar: [['frekans_anahtari']], on: ['motor'], cozuldu: 'Mercekler çanın tonuyla hizalandı.' },
    { id: 'harita', ad: 'Yıldız haritası', pan: 0.6, mesafe: 0.5, ses: 'fisilti', durum: 'Tozun altında silik çizgiler.', kombolar: [['yanki_tarama'], ['lumina_salim']], cozuldu: 'Harita belirdi: Zhaor\'un ışığının düştüğü yerde bir kristal yuvası.' },
  ],
  bitis: 'Merceklerin odağında, kristal yuvasından sarı bir rezonans taşı çıktı.',
  odul: { tas: { sari: 1 }, odak: 10 },
});
BM.bulmacaEkle('kizil_damar', {
  ad: 'Kızıl damar mührü',
  giris: 'Maden kat 30. Kazmanın sekip geçtiği pürüzsüz bir taş yüz; ardından sıcak, kızıl bir uğultu.',
  dugumler: [
    { id: 'catlak', ad: 'Görünmez çatlak', pan: -0.5, mesafe: 0.4, ses: 'fisilti', durum: 'Taş yüz kusursuz görünüyor.', kombolar: [['yanki_tarama'], ['lumina_salim']], cozuldu: 'Yankı ince bir çatlağı ortaya çıkardı.' },
    { id: 'blok', ad: 'Mühür bloğu', pan: 0, mesafe: 0.6, ses: 'tas', durum: 'Çatlağın ardında, yerine oturmuş dev bir blok.', kombolar: [['tele_kaldirma'], ['toprak_yarma']], on: ['catlak'], cozuldu: 'Blok yerinden kalkıp kenara indi.' },
    { id: 'damar', ad: 'Kızgın damar', pan: 0.5, mesafe: 0.8, ses: 'lav', durum: 'Damardan yayılan ısı yaklaşmaya izin vermiyor.', kombolar: [['buzul'], ['hava_serin']], on: ['blok'], cozuldu: 'Damar soğuyup koyulaştı; içinde kızıl bir taş parlıyor.' },
  ],
  bitis: 'Kızıl rezonans taşını damardan söktün.',
  odul: { tas: { kizil: 1 }, esya: { demir_cevheri: 3 } },
});
BM.bulmacaEkle('batik_sandik', {
  ad: 'Kayalık koydaki batık sandık',
  giris: 'Dalgalar kayalara çarpıyor. Sandık her dalgada sulara gömülüyor; kapağında mavi bir parıltı.',
  dugumler: [
    { id: 'dalga', ad: 'Sandığın üstündeki su', pan: 0, mesafe: 0.5, ses: 'su', durum: 'Su durmadan çekilip geri geliyor.', kombolar: [['buzul'], ['hava_ayaz']], cozuldu: 'Su buz tuttu; dalgalar donmuş bir kabuğa çarpıyor.' },
    { id: 'sandik', ad: 'Batık sandık', pan: 0.4, mesafe: 0.7, ses: 'tas', durum: 'Kayaya sıkışmış, ağır ve ıslak.', kombolar: [['tele_kaldirma']], on: ['dalga'], cozuldu: 'Sandık buzdan sıyrılıp kıyıya süzüldü.' },
  ],
  bitis: 'Sandığın içinde, eski bir kâşifin mavi rezonans taşı.',
  odul: { tas: { mavi: 1 }, esya: { deniz_tuzu: 3 } },
});
BM.bulmacaEkle('kurumus_kaynak', {
  ad: 'Vahanın kurumuş kaynağı',
  giris: 'Kalsit duvarın dibinde kurumuş bir kaynak ağzı. Çatlaktan kükürtlü bir buhar sızıyor; dipte yeşil bir şey parlıyor.',
  dugumler: [
    { id: 'buhar', ad: 'Kükürtlü buhar', pan: -0.4, mesafe: 0.4, ses: 'ruzgar', durum: 'Başını döndüren, fısıltılı bir buhar.', kombolar: [['zihin_arindirma'], ['buzul']], cozuldu: 'Buhar dağıldı; başın netleşti.' },
    { id: 'catlak', ad: 'Derin kuru çatlak', pan: 0.3, mesafe: 0.7, ses: 'bitki', durum: 'Taş, parıltıya inmeye izin vermeyecek kadar dar ve derin.', kombolar: [['sarmasik'], ['tele_kaldirma', 'yanki_tarama']], on: ['buhar'], ara: 'Taşın yeri belli oldu; bir hamle daha.', cozuldu: 'Çatlak açıldı; parıltıya ulaştın.' },
  ],
  bitis: 'Kaynağın dibinden yeşil bir rezonans taşı ve ılık bir su sızıntısı.',
  odul: { tas: { yesil: 1 }, esya: { saf_su: 2 } },
  sonra: (d) => {
    if (BY.biliyor(d, 'sarmasik')) return 'Sarmaşığın kökü kaynağı yeniden açtı; vahanın havası nemlendi.';
    return '';
  },
});

// --- Nokta eylemleri ---
const SAHA = { enkaz: 'enkaz_kasasi', yb_gozlem: 'gozlem_mercekleri', kizil_muhur: 'kizil_damar', batik_sandik: 'batik_sandik', kurumus_kaynak: 'kurumus_kaynak' };
export function noktaMi(id) {
  return id === 'kizil_muhur' || id === 'batik_sandik' || id === 'kurumus_kaynak';
}
export function noktaEylemleri(d, id) {
  return [...ekEylemler(d, id), { id: 'incele', etiket: 'İncele' }];
}
function bulmacaEylemi(d, id) {
  const b = SAHA[id];
  const yarim = d.buyu.yarim && d.buyu.yarim[b];
  return { id: 'bm_' + b, etiket: (yarim ? 'Büyü bulmacasına dön: ' : 'Büyü bulmacası: ') + BM.BULMACALAR[b].ad + (BM.bittiMi(d, b) ? ', çözüldü' : ''), ipucu: 'Asanla düğümlere büyü uygularsın; yanlış büyü yalnız biraz odak götürür.' };
}
export function ekEylemler(d, id) {
  if (!d.buyu || !d.buyu.asa) return [];
  const l = [];
  if (id === 'yb_tapinak') {
    l.push({ id: 'by_ogren', etiket: 'Axelum dersliği: büyü öğren', ipucu: 'Sekiz temel büyü ve şişeleme.' });
    l.push({ id: 'by_derslik', etiket: 'Tapınak dersliği: alıştırma odaları' });
    l.push({ id: 'by_dinlen', etiket: 'Sunağın başında dinlen', ipucu: 'Rezonans odak havuzu dolar.' });
  }
  if (id === 'yb_okul') l.push({ id: 'by_kol', etiket: d.bayrak.akademiBuyuKolu ? 'Akademi kolu: YGK ile rezonans yazışması' : 'Akademi kolu: YGK\'ya rezonans mektubu gönder', ipucu: 'YGK Akademi\'nin hocaları kadim Malken rezonansını fark eder.' });
  if (id === 'yb_gozlem') l.push({ id: 'by_toz', etiket: 'Yıldız tozu topla', ipucu: BY.tozRengi(d) ? 'Şimdi havada ' + (BY.tozRengi(d) === 'lumina' ? 'beyaz Lumina' : 'sarı Solis') + ' süzülüyor.' : 'Şimdi havada toz yok.' });
  if (SAHA[id]) l.push(bulmacaEylemi(d, id));
  return l;
}
export function ekEylemMi(e) {
  return !!e && (e.indexOf('by_') === 0 || e.indexOf('bm_') === 0);
}
export function eylemUygula(d, id, e) {
  BY.hazirla(d);
  if (e === 'incele') return { metin: (NOKTALAR[id] && NOKTALAR[id].tarif) || '' };
  if (e === 'by_ogren') return { agac: (x) => ogrenmeMenu(x) };
  if (e === 'by_derslik') return { agac: (x) => derslikMenu(x) };
  if (e === 'by_dinlen') {
    const ek = BY.dinlenince(d);
    d.zaman.sn += Z.SAAT_SN;
    return { metin: 'Sunağın mor ışığında gözlerini kapadın; bir saat geçti.' + (ek || ' Odak havuzun zaten doluydu.'), ses: 'by_odak' };
  }
  if (e === 'by_kol') {
    if (d.bayrak.akademiBuyuKolu) return { metin: 'YGK\'dan cevap geldi: Kefius Arateon ve kürsü hocaları kadim Malken rezonansını duydu. Akademinin katlarında büyü sınavları seni bekliyor; Tonoflenya\'ya vardığında YGK Akademi\'ye uğra.' };
    d.bayrak.akademiBuyuKolu = true;
    return { metin: 'Okulun akademi kolu, asanın uyanışını anlatan bir rezonans mektubu YGK\'ya gönderdi. Kürsülerdeki hocalar yüzyıllardır duymadıkları bir Malken titreşimini fark edecek; YGK Akademi\'de büyü sınavları açıldı.', ses: 'sinyal' };
  }
  if (e === 'by_toz') return BY.tozTopla(d, id);
  if (e.indexOf('bm_') === 0) return BM.baslat(d, e.slice(3));
  return { metin: '' };
}

// --- Sahne: asanın uyanışı ---
export const SAHNELER = {
  asa_uyanis: {
    baslik: 'Asa uyanıyor',
    efekt: ['by_asa_uyanis'],
    metin: () => [
      'Kristaller asanın oyuklarında eriyip mor bir toza dönüşürken asa elinde ısınıyor. Bu, alışık olduğun bir ısı değil: kanındaki bir şeyi tanıyor.',
      'Malken kökenlisin; ama yıllardır büyünün bir aracı yoktu. Şimdi Malazar\'ın ocaklarında dövülmüş asa ilk kez seninle aynı frekansta titreşiyor. Malazar Kök Asası uyandı.',
      'Rezonans odak havuzun yüz. Axelum Tapınağı\'nın dersliği sekiz temel büyüyü ve şişelemeyi öğretir; ileri büyüler YGK Akademi\'nin hocalarındadır. Büyü yalnız bulmacalarda, sınavlarda ve büyü görevlerinde işe yarar; savaşta teknolojin konuşur. Ana menüde Büyü defteri.',
    ],
    secenekler: () => [{ etiket: 'Devam', sonra: null }],
  },
};
