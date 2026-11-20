// Kaptan yetenek ağacı ve gemi modifikasyon ağacı (belgeler/savas-yetenek-ve-murettebat-mekanikleri.md bölüm 3).
// Saf veri ve küçük yardımcılar.
//
// Kaptan yetenekleri sefer tecrübesiyle (görevler, krizler, çatışmalar) açılır; her dalda sırayla (1 → 2 → 3).
// Akademik personel tecrübe kazancını artırır (koloni.js bilim). Gemi modifikasyonları tesislerde üretilip gemiye
// kaynaklanan ek donanımlardır (donanim.js'e eklenir).

export const DALLAR = {
  A: 'Akustik Sezgi ve Refleks',
  B: 'Taktik Komuta ve Soğukkanlılık',
  C: 'Alan Mühendisliği ve Doğaçlama Hayatta Kalma',
  D: 'Kseno-Diplomasi ve Telsiz Aldatması',
};
const y = (dal, sira, ad, tarif) => ({ dal, sira, ad, tarif, bedel: sira * 100 });
export const YETENEKLER = {
  A1: y('A', 1, 'Kör Odaklanma', 'Pruva kilidinin tolerans aralığı genişler; hedefleme kolaylaşır (savaşta kilit açısı ×1,43).'),
  A2: y('A', 2, 'Rezonans Ayırt Etme', 'Düşmanın zayıf noktasını motor sesindeki çatlaktan duyarsın: her üç isabetten biri kritik (×2).'),
  A3: y('A', 3, 'Zaman Esnetici Refleks', 'Düşmanın uyarı sesiyle darbe arasındaki savunma penceresi 1 saniye uzar.'),
  B1: y('B', 1, 'Salvo Senkronizasyonu', 'Birincil silahla torpido art arda ateşlenince ikincinin enerjisi sıfır: torpido şarjsız ateşlenir.'),
  B2: y('B', 2, 'Bastırma Ateşi', 'Düşman şarj olurken yaptığın isabet saldırısını keser.'),
  B3: y('B', 3, 'Filo Lideri Narası', 'Seferde mürettebatın moral krizlerini tek komutla durdurursun.'),
  C1: y('C', 1, 'Kabin Basınç Disiplini', 'Gövde delindiğinde contalama zamanı kazanırsın: aldığın hasar yüzde on azalır.'),
  C2: y('C', 2, 'Aşırı Yükleme Toleransı', 'Reaktör kilitlense de acil bataryalarla savunma yapabilirsin.'),
  C3: y('C', 3, 'Hurda Yamama Sanatı', 'Çatışma sonrası enkazla iticileri yamarsın; gövdenin bir kısmı onarılır.'),
  D1: y('D', 1, 'Frekans Karıştırma', 'Torpido kilitlenmesinde aşağı kaydır: sahte gürültü füzeyi şaşırtır.'),
  D2: y('D', 2, 'Yabancı Dil Sezgisi', 'Düşmanın telsiz bağırtılarını çevirirsin: bir sonraki silahı önceden fısıldanır.'),
  D3: y('D', 3, 'Ateşkes Çağrısı', 'Düşmanın gövdesi yüzde 25\'e inince iki parmakla yukarı kaydır: teslim olur.'),
};
export const YETENEK_SIRASI = Object.keys(YETENEKLER);

export function harcanabilir(d) {
  return Math.max(0, Math.floor((d.kaptan.tecrube || 0) - (d.kaptan.harcanan || 0)));
}
export function yetenekListesi(d) {
  const y0 = d.kaptan.yetenekler || {};
  return YETENEK_SIRASI.map((id) => {
    const x = YETENEKLER[id];
    const onceki = x.sira === 1 || y0[x.dal + (x.sira - 1)];
    let durum;
    if (y0[id]) durum = 'Açık.';
    else if (!onceki) durum = 'Önce ' + YETENEKLER[x.dal + (x.sira - 1)].ad + '.';
    else durum = x.bedel + ' tecrübe' + (harcanabilir(d) >= x.bedel ? '; açılabilir.' : '; elinde ' + harcanabilir(d) + '.');
    return { id, ad: x.ad + ' (' + DALLAR[x.dal] + ')', tarif: x.tarif, durum, acilir: !y0[id] && !!onceki && harcanabilir(d) >= x.bedel };
  });
}
export function yetenekAc(d, id) {
  const l = yetenekListesi(d).find((x) => x.id === id);
  if (!l || !l.acilir) return { metin: l ? l.ad + ': ' + l.durum : '', ses: 'red' };
  if (!d.kaptan.yetenekler) d.kaptan.yetenekler = {};
  d.kaptan.yetenekler[id] = true;
  d.kaptan.harcanan = (d.kaptan.harcanan || 0) + YETENEKLER[id].bedel;
  return { metin: YETENEKLER[id].ad + ' açıldı. ' + YETENEKLER[id].tarif, ses: 'kur' };
}

// 3.2 Gemi modifikasyonları (ek donanım; kademe sırasıyla tesisleri belgedeki gibi)
const m = (ad, tesis, girdi, tarif) => ({ ad, tesis, girdi, sure: 120, minSinif: 1, tarif });
export const GEMI_MODLARI = {
  k1_sonumleme: m('K1 akustik sönümlemeli plakalar', 'dokumhane', { plaka: 80, polimer_levha: 10 }, 'Kinetik darbelerin sarsıntı hasarı yüzde kırk azalır; çarpan mermi tok bir tınlamaya döner.'),
  k2_soguk_nozul: m('K2 vektörel soğuk itici nozulları', 'itki_hangari', { helyum: 20, plaka: 30 }, 'Reaktif kaçınma penceresi uzar; yakıt yakmaz, ters itişte sert bir gaz fıslaması.'),
  k3_plazma_bobini: m('K3 çift fazlı plazma bobini', 'reaktor_lab', { plazma_yakiti: 20, saf_kristal: 20 }, 'Silahlar düşman kalkanının rezonansını zorlayıp delip geçer; ateşlemede elektrik arkı.'),
  k4_tahliye_valfi: m('K4 otomatik basınç tahliye valfleri', 'biyo_kubbe', { polimer_levha: 20, kablo: 20 }, 'Delinen oda saniyede mühürlenir; reaktör kilidi kısa sürer.'),
  k5_karadutu: m('K5 kuantum rezonans karadutusu', 'komuta_merkezi', { mikrocip: 20, saf_kristal: 20 }, 'Düşmanın atış ritmini çözer; ikinci turdan sonra düşmanın manevrası küçülür. "Düşman modeli çözüldü."'),
};
