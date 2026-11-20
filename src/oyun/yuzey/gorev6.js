// Koloni projeleri: entegrasyon matrisinin altı yüzey işi (belgeler/uzay-oyunu-tasarim-ve-senaryo.md bölüm 6).
// Her iş bir tesisin önünü açar; tesis yeni donanım üretir ve uzay haritasında yeni bir nokta belirir. Saf JavaScript.
//
//   Rezonatör kalibrasyonu   Kadim Krater'deki kalibrasyon sütunu: rezonatörle beş notalık dizi → Kuantum Laboratuvarı
//   İzotop sıkıştırma        dengelenmiş bir gaz bacasında valf dengeleme (üç tahliye) → İtki Hangarı
//   Gaz bacası ısı izolasyonu üç bacaya polimer levha sarma (kükürt maruziyetiyle) → Kriyo-Atölye
//   Zemin alaşım kaplaması   platodaki kızağa vinçle zırhlı plaka kaplama → Askeri Tersane
//   Ağ şebekesi entegrasyonu Gözcü Tepesi'nde ikinci frekans ayarı (koloninin iç ağı) → Komuta Merkezi
//   Kadim şifre deşifresi    iç mabetteki yazıtta rezonatörle altı notalık dizi → Yüksek Enerji Reaktörü + kadim anahtar
// Bayraklar: kalibrasyon, sikistirma, izole_<baca>, izolasyon, kaplama, ag, sifre.
import { NOKTALAR } from './harita';
import { MATRIS } from '../veri/donanim';
import { TESISLER, maliyetMetni } from '../veri/tesisler';

const b = (d) => d.bayrak;
const ad = (d, rol) => (d.murettebat[rol] ? d.murettebat[rol].ad : '');
const ilkAd = (d, rol) => ad(d, rol).split(' ')[0];
const BACALAR = ['baca_1', 'baca_2', 'baca_3'];
export const IZOLASYON_LEVHA = 10;

const tamamSahnesi = (baslik, satirlar, tesis) => ({
  baslik,
  ortam: null,
  efekt: ['sinyal'],
  metin: (d) => [...satirlar(d), 'Terminalden ' + TESISLER[tesis].ad + ' kurulabilir: ' + maliyetMetni(TESISLER[tesis].maliyet) + '.'],
  secenekler: () => [{ etiket: 'Devam', sonra: null }],
});

export const SAHNELER = {
  kalibrasyon_tamam: tamamSahnesi('Rezonatör kalibre edildi', (d) => ['Beşinci nota sütunun içinde çınlayınca kraterin bütün çanları bir kez, birlikte cevap veriyor. Rezonatörün kristalleri artık kadim perdelere ayarlı.', ilkAd(d, 0) + ': "Bu ayarla bir kuantum sürücüsünün bobinlerini de akort edebiliriz, Kaptan."'], 'kuantum_lab'),
  sikistirma_tamam: tamamSahnesi('İzotop sıkıştırıldı', (d) => ['Bacanın gazı sıkıştırma odasında yoğunlaşıp avuç kadar ağır bir kristale dönüşüyor. Ağır itki sistemleri için yeter.', ilkAd(d, 0) + ': "Bununla bir itki hangarının test tezgâhını çalıştırırız."'], 'itki_hangari'),
  izolasyon_tamam: tamamSahnesi('Bacalar yalıtıldı', (d) => ['Üç bacanın ağzı polimer levhalarla sarıldı; sıcak gaz artık kontrollü akıyor, kayalar soğuyor.', ilkAd(d, 2) + ': "Aynı yalıtımla bir kriyo-atölye kurarsak yangın bastırma kalkanı yapabiliriz."'], 'kriyo_atolye'),
  kaplama_tamam: tamamSahnesi('Kızak zemini kaplandı', (d) => ['Kızağın zemini zırhlı alaşım levhalarla kaplandı; en ağır topların geri tepmesini bile taşır.', ilkAd(d, 0) + ': "Artık burada askeri donanım da kurabiliriz."'], 'askeri_tersane'),
  ag_tamam: tamamSahnesi('Ağ şebekesi kuruldu', (d) => ['Kule, dökümhane, laboratuvar ve jeneratör aynı kanalda konuşmaya başladı; koloninin bütün makineleri tek bir ritimle uğulduyor.', ilkAd(d, 1) + ': "Bu ağla bir komuta merkezi kurarsak iki donanmanın kayıtlarını bile aynı anda dinleriz."'], 'komuta_merkezi'),
  sifre_tamam: tamamSahnesi('Kadim şifre çözüldü', (d) => ['Altıncı nota yazıtın çizgilerinde kayboluyor; duvar açılıp içinden avuç büyüklüğünde, ılık bir kristal anahtar çıkıyor: kadim rezonans anahtarı.', ilkAd(d, 1) + ': "Yazıta göre bu, yıldızların arasındaki bir mancınığın kilidi. Onu besleyecek bir reaktör gerek."', 'Kadim rezonans anahtarı kızaktaki depoya kondu.'], 'yuksek_reaktor'),
};

// --- Noktalara eklenen eylemler ---
export function ekEylemler(d, id) {
  const g = b(d);
  const e = [];
  if (id === 'kalibrasyon_sutunu') {
    if (!g.kalibrasyon) e.push({ id: 'p_kalibre', etiket: 'Rezonatörü kalibre et', ipucu: 'Sütunun çaldığı beş notalık diziyi rezonatörle tekrarla.' });
  }
  if (BACALAR.includes(id) && g['baca_' + id]) {
    if (!g.sikistirma && d.koloni.binalar.includes('reaktor_lab')) e.push({ id: 'p_sikistir', etiket: 'İzotopu sıkıştır', ipucu: 'Valf dengelemesi; üç tahliye.' });
    if (!g['izole_' + id]) e.push({ id: 'p_izole', etiket: 'Isı yalıtımı sar', ipucu: IZOLASYON_LEVHA + ' polimer levha harcar.' });
  }
  if (id === 'kizak' && d.koloni.binalar.includes('tersane') && !g.kaplama) e.push({ id: 'p_kapla', etiket: 'Zemini alaşımla kapla', ipucu: '100 zırhlı plaka; vinçle.' });
  if (id === 'tepe' && g.telemetri && !g.ag && d.koloni.binalar.includes('dokumhane')) e.push({ id: 'p_ag', etiket: 'Koloninin ağını kur', ipucu: 'İkinci bir frekans ayarı.' });
  if (id === 'yazit' && g.kazi && !g.sifre) e.push({ id: 'p_sifre', etiket: 'Kadim şifreyi çöz', ipucu: 'Yazıtın altı notalık dizisini rezonatörle tekrarla.' });
  return e;
}
export function ekEylemMi(eylemId) {
  return eylemId.indexOf('p_') === 0;
}
export function noktaMi(id) {
  return id === 'kalibrasyon_sutunu';
}

export function eylemUygula(d, id, eylemId) {
  const g = b(d);
  const rezonatorYok = { metin: 'Rezonatörün yok. Mühendis bir frekans rezonatörü yapabilir.', ses: 'red' };
  if (eylemId === 'p_kalibre') return d.envanter.includes('rezonator') ? { rezonans: 'kalibre' } : rezonatorYok;
  if (eylemId === 'p_sifre') return d.envanter.includes('rezonator') ? { rezonans: 'sifre' } : rezonatorYok;
  if (eylemId === 'p_sikistir') return { valf: true, amac: 'sikistirma' };
  if (eylemId === 'p_ag') return { ayar: true, amac: 'ag' };
  if (eylemId === 'p_kapla') return { kaplama: true };
  if (eylemId === 'p_izole') {
    const p = d.koloni.parcalar || {};
    if ((p.polimer_levha || 0) < IZOLASYON_LEVHA) return { metin: IZOLASYON_LEVHA + ' polimer levha gerekir; elinde ' + (p.polimer_levha || 0) + '. Dökümhanede üretilir.', ses: 'red' };
    p.polimer_levha -= IZOLASYON_LEVHA;
    g['izole_' + id] = true;
    d.zehir = Math.min(95, (d.zehir || 0) + 10);
    const kalan = BACALAR.filter((x) => !g['izole_' + x]).length;
    if (!kalan) {
      g.izolasyon = true;
      d.sahne = 'izolasyon_tamam';
      return { metin: 'Son levhayı da sarıyorsun.', ses: 'polimer' };
    }
    return { metin: 'Sıcak gazın yanında levhaları sarıyorsun; eldivenlerin yanıyor, kükürt maskeyi zorluyor. Kalan baca: ' + kalan + '.', ses: 'polimer' };
  }
  if (id === 'kalibrasyon_sutunu') return { metin: NOKTALAR[id].tarif + (g.kalibrasyon ? ' Çanlarla aynı perdede, sessizce titriyor.' : '') };
  return { metin: '' };
}

// Projelerin durumu (görev ipucu ve terminal için)
export function projeListesi(d) {
  return MATRIS.filter((m) => m.bayrak).map((m) => {
    const yapildi = !!b(d)[m.bayrak];
    const kuruldu = d.koloni.binalar.includes(m.tesis);
    return { is: m.is, tesis: TESISLER[m.tesis].kisa, durum: kuruldu ? 'tesis kurulu' : yapildi ? 'iş tamam, tesis kurulabilir' : 'yapılmadı' };
  });
}
export function projeMetni(d) {
  return 'Koloni projeleri: ' + projeListesi(d).map((p) => p.is + ' (' + p.tesis + '): ' + p.durum).join('; ') + '.';
}
