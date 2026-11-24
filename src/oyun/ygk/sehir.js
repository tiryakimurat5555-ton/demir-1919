// v6 Paket 16: isteğe bağlı, tekrarlanabilir şehir ve akademi işlemleri. Altı sabit noktada (kabul masası, lonca ihtiyarı,
// meclis kürsüsü, Flee Plee iskele görevlisi, Arin antik tapınağı, Veradon gümrük kulesi) günde bir küçük büyü işi.
// Yapılmazsa hiçbir ceza yok; ana hikâyeyi, bağ kademelerini ve Paket 8 finalini kilitlemez. Savaşta büyü yine yasak.
import * as BM from '../buyu/bulmaca';
import * as BY from '../buyu/buyu';
import * as ZN from '../tonoflenya/zanaat';
import { D } from './yardim';
import { GUN_SN, etkiKoy } from '../zaman';
import { tarim } from '../tarim/tarim';

const gun = (d) => Math.floor(((d.zaman && d.zaman.sn) || 0) / GUN_SN);
const kayit = (d) => {
  if (!d.ygk) d.ygk = { k: {}, aktif: null, sonuc: null, haber: [] };
  if (!d.ygk.sehir) d.ygk.sehir = {};
  return d.ygk.sehir;
};
// Ödülü gün sırasına göre seç (iki seçenekli ödüller dönüşümlü)
const sira = (d, l) => l[gun(d) % l.length];

export const SEHIR_ISLERI = {
  kabul_masasi: {
    ad: 'Acil evrak ve asa rezonans kontrolü', veren: 'Mor gözlü Malken görevli',
    soz: '"Kaptan, yine altı yıldızın altından gelen evraklar birbirine girdi. Asanla şu mürekkebi bir yokla da gerçek imzayı görelim."',
    dugumler: [D('fis', 'Biriken öğrenci fişleri ve asa kayıtları', 0, 'fisilti', 'İki fişin tarihi yanlış; birinde mürekkep silinmiş.', [['hakikat_yankisi'], ['lumina_salim']], 'Sahte fişler ayrıldı; silinmiş imza okunuyor.')],
    odul: (d) => { BY.odakEkle(d, 15); return { esya: { [sira(d, ['muhur_kutusu', 'dunya_cayi'])]: 1 } }; },
    son: 'Akademi içi küçük bir odak yenilenmesi.',
  },
  konsey_sozcusu: {
    ad: 'Yıldız tozu şişeleme ve şehir mühür bakımı', veren: 'Ametist gözlü lonca ihtiyarı',
    soz: '"Ametist nöbeti çöktü evlat. Şişeni hazırla, gökten düşeni ziyan etme; şu sandığın mührünü de tazele ki kâtipler uyuyabilsin."',
    dugumler: [
      D('akim', 'Avludaki ışık akımı', -0.3, 'kristal', 'Gökten saf toz iniyor.', [['bos_sise'], ['lumina_salim'], ['solis_salim']], 'Şişe dolmaya başladı.'),
      D('sandik', 'Lonca sandığı', 0.4, 'metal', 'Mühür gevşemiş.', [['oz_baglama'], ['metal']], 'Sandık yeniden mühürlendi.', { on: ['akim'] }),
    ],
    odul: (d) => { BY.siseEkle(d, sira(d, ['lumina', 'solis']), 1); etkiKoy(d, 'loncaIndirim', GUN_SN); const e = sira(d, ['urun_kristal_cicek', 'gumus_tozu']); if (e.indexOf('urun_') === 0) tarim(d); return { esya: { [e]: 1 } }; },
    son: 'Bir şişe doldu; bugün Malkenia pazarlarında takas indirimi.',
  },
  meclis_kursusu: {
    ad: 'Altı yıldız akort yoklaması', veren: 'Sıvı kristal kürsü sözcüsü',
    soz: '"Kürsü yine titriyor. Senatörler konuşmadan önce şu altı notayı düzelt de sesleri salonda yankılanıp kırılmasın."',
    dugumler: [D('kanat', 'Kürsünün sağ ve sol kristal kanadı', 0, 'kristal', 'İki kanat ayrı tonda titreşiyor.', [['yanki_ikizi'], ['yanki_dugumu'], ['sabit_yanki_muhru']], 'Altı notalı yıldız akoru eşitlendi.')],
    odul: (d) => ({ esya: { [sira(d, ['sakin_cay', 'huzur_tutsusu'])]: 1 } }),
    son: (d) => sira(d, ['Kürsü sözcüsü fısıldıyor: "Lonca ihtiyarı Konsey\'e yeni bir vergi önerisi hazırlıyor."', 'Kürsü sözcüsü: "Valen\'in raporları son günlerde hep Kara Göl\'den söz ediyor."', 'Kürsü sözcüsü: "Uma\'daki baloda iki elçi yine aynı odaya kapanmış derler."', 'Kürsü sözcüsü: "Tentran harcının düşürülmesi meclise gelecek; tüccarlar memnun değil."']),
  },
  kayik_gorevlisi: {
    ad: 'Kayıp kayık anahtarı ve fener rıhtımı', veren: 'Pelerinli Malken iskele görevlisi',
    soz: '"Dalga yine anahtarı yuttu! Büyünle şu suyu kenara itiver de balıkçılar sabaha kadar iskelede beklemesin."',
    dugumler: [D('rihtim', 'Sığ su ve nemli fener bobini', 0, 'su', 'Anahtar dipte parlıyor; fener sönük.', [['sivi'], ['yildirim_rez'], ['kivilcim']], 'Anahtar kıyıda, fener yanıyor.')],
    odul: (d) => { const e = sira(d, ['urun_fosforlu_liken', 'piezo']); if (e.indexOf('urun_') === 0) tarim(d); return { esya: { [e]: 1 } }; },
    son: 'Balıkçılar el sallıyor.',
  },
  arin_tapinagi: {
    ad: 'Rüzgâr çanları ve zihin sükûneti', veren: 'Keşiş Vaelor',
    soz: '"Zihnin yine gürültüyle dolmuş. Gel, önce tapınağın rüzgârını dindir; çanlar çaldığında kendi yükün de hafifler."',
    dugumler: [
      D('ruzgar', 'Yüksek irtifa fırtınası', -0.3, 'ruzgar', 'Tunç çanlar kilitlenmiş; rüzgâr sert.', [['hava_durgun'], ['hava_serin']], 'Rüzgâr yatıştı.'),
      D('halka', 'Yüksek çan halkası', 0.4, 'kristal', 'Çan halkası yuvasından kaymış.', [['zihin_arindirma'], ['suzulme']], 'Çanlar yeniden çalıyor.', { on: ['ruzgar'] }),
    ],
    odul: (d) => { BY.odakEkle(d, 999); const e = sira(d, ['kristal_can', 'urun_isik_otu']); if (e.indexOf('urun_') === 0) tarim(d); return { esya: { [e]: 1 } }; },
    son: 'Odak tamamen yenilendi.',
  },
  gumruk_kulesi: {
    ad: 'Kervan yükü ve menteşe bakımı', veren: 'Veradon gümrük kâtibi',
    soz: '"Güneyden on araba birden girdi, sürgü sıkıştı! Büyünle şu demiri düzeltirsen hanın mutfağından sana sıcak börek ayırtırım."',
    dugumler: [D('surgu', 'Kervan kapısının sürgüsü ve baharat sandıkları', 0, 'metal', 'Sürgü eğilmiş; bir sandığın etiketi sahte.', [['metal'], ['hakikat_yankisi']], 'Sürgü düzeldi; sahte sandık ayıklandı.')],
    odul: (d) => { const e = sira(d, ['urun_vaha_hurmasi', 'borek', 'tamir_kiti']); if (e.indexOf('urun_') === 0) tarim(d); return { esya: { [e]: 1 } }; },
    son: 'Hanın mutfağından sıcak bir koku geliyor.',
  },
};
for (const id of Object.keys(SEHIR_ISLERI)) {
  const t = SEHIR_ISLERI[id];
  BM.bulmacaEkle('sehir_' + id, {
    ad: t.ad, giris: t.soz, dugumler: t.dugumler, tekrar: true, hava: 0,
    bitis: 'İş bitti.',
    odul: (d) => t.odul(d),
    sonra: (d) => { kayit(d)[id] = gun(d); return typeof t.son === 'function' ? t.son(d) : t.son; },
  });
}
export const sehirNoktasi = (id) => !!SEHIR_ISLERI[id];
export function ekEylemler(d, id) {
  const t = SEHIR_ISLERI[id];
  if (!t || !d.buyu || !BY.acikMi(d)) return [];
  const bugun = kayit(d)[id] === gun(d);
  return [{ id: 'yg_sehir', etiket: 'Günlük iş: ' + t.ad + (bugun ? ', bugün yapıldı' : ''), ipucu: 'İsteğe bağlı. ' + t.veren + ' her gün küçük bir büyü işi verir; yapmasan hiçbir şey kaybetmezsin.' }];
}
export function eylemUygula(d, id) {
  const t = SEHIR_ISLERI[id];
  if (kayit(d)[id] === gun(d)) return { metin: t.veren + ': "Bugünlük işimiz yok. Yarın uğra."' };
  const r = BM.baslat(d, 'sehir_' + id);
  return r.buyu ? { ...r, metin: t.veren + ': ' + t.soz } : r;
}
