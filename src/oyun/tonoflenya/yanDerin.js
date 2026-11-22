// Otuz yan görevin derinleştirmesi (belgeler/v4/tonoflenya-30-yan-gorev-derinlestirme.txt). yan.js'teki görevleri bozmadan
// üstüne yazar: oyunda karşılığı olmayan ön koşullar gerçek eşya/araç/kıdeme bağlanır (1.1), ödüller beş ana güce yazar
// (1.2; fraksiyon g_ygk … g_guney), Yıldız Nöbeti dinamikleri (g.nobet), on çatışmalı göreve evrensel savaş (g.savas:
// operasyondan sonra yan_savas sahnesi, zaferde karar) ve belgedeki Seçenek A/B ödülleri.
import { YAN_GOREV, yan, operasyonlariKaydet } from './yan';
import * as ZN from './zanaat';
import * as SB from './subay';
import { karakterDurumu, gucEkle } from './kisiler';

const ml = (d, n) => {
  ZN.hazirla(d);
  d.para.ml += n;
  return n + ' Malken Lirası';
};
const esya = (d, id, n = 1) => {
  ZN.ekle(d, id, n);
  return (n > 1 ? n + ' ' : '') + ZN.adi(id);
};
const kaynak = (d, id, n, ad) => {
  d.koloni.kaynaklar[id] = (d.koloni.kaynaklar[id] || 0) + n;
  return n + ' ' + (ad || ZN.adi(id));
};
const bilim = (d, n) => {
  yan(d).bilim += n;
  d.kaptan.tecrube += Math.round(n / 10);
  return n + ' bilim puanı';
};
const K = (etiket, sonuc, itibar, odul) => ({ etiket, sonuc, itibar, odul });
const kus = (d, id) => ZN.kusanildiMi(d, id);
const var_ = (id, n = 1) => (d) => ZN.miktar(d, id) >= n;
const sinif = (s) => (d) => !!d.gemi && (d.gemi.sinif || 1) >= s;
const arac = (d) => (d.araclar || []).some((a) => a === 'col_tilkisi' || a === 'mammoth');

// Yeni ödül eşyaları
Object.assign(ZN.ESYA, {
  astral_odak: { kat: 4, ad: 'Astral Odak İksiri', tarif: 'Axira tapınağının ilahisinden damıtılmış; kullanınca stres silinir.' },
  santaj_kaydi: { kat: 5, ad: 'Gizli şantaj kaydı', tarif: 'Uma aristokrasisinin bir sırrı; YGK bunu bildiğin için sana borçlu.' },
  kervan_hissesi: { kat: 5, ad: 'Safran Kervan Ticaret Hissesi', tarif: 'Her gün yüz lira pasif gelir.' },
  antik_buz_cekirdegi: { kat: 5, ad: 'Antik Buz Çekirdeği', tarif: 'Norvask mamut mezarından; milyon yıllık donmuş hava kabarcıkları.' },
  helgar_izni: { kat: 5, ad: 'Helgar Madenleri Serbest Erişim Beratı', tarif: 'Helgar Kara Buz Dükalığı\'nın madenlerine serbest giriş.' },
});
if (ZN.ESYA.varek_bataryasi) ZN.ESYA.varek_bataryasi.etki = 'Gemi birincil silah hasarı yüzde on beş fazla.';

// Ön koşulların gerçek oyuna eşlenmesi (1.1)
const ESLEME = [
  [/Gürültü engelleyici pelerin|Zihin koruma tılsımı/, 'Fenrir Işık Pelerini ya da YGK Baş-Büyücü Cübbesi', (d) => var_('isik_pelerini')(d) || var_('bas_buyucu_cubbesi')(d)],
  [/Plazma söndürücü/, 'İki tüp dondurucu köpük', (d) => (d.koloni.parcalar.dondurucu_kopuk || 0) + ZN.miktar(d, 'dondurucu_kopuk') >= 2],
  [/Aether akort anahtarı/, 'T-05 Sonik Tüfek ya da Sinha akustik çipi', (d) => var_('sonik_tufek')(d) || var_('sinha_cipi')(d)],
  [/Şok mızrağı|Plazma kılıcı/, 'Zhaor Işık Mızrağı ya da Filtra Ağır Plazma Tüfeği', (d) => var_('isik_mizragi')(d) || var_('plazma_tufegi')(d)],
  [/Manta-01|Nomad-01/, 'Çöl Tilkisi ya da Mammoth (araç hangarı)', arac],
  [/Zırh seviyesi 2/, 'Filtra Oksit Ağır Zırhı ya da Lamine Titanyum Zırh (kuşanılı ya da gemide)', (d) => kus(d, 'oksit_zirhi') || !!(d.kusanilan && d.kusanilan.zirh) || (d.koloni.parcalar.mod_govde || 0) > 0],
  [/Savaş seviyesi 15/, 'Kırmızı Yıldız ekolünde Yıldız Muhafızı kıdemi (300 puan)', (d) => SB.kabiliyet(d, 'varek', 3)],
];
const GEMI = { 7: [2, 'Sınıf II (Rüzgarkıran) ya da üstü gemi'], 19: [2, 'Sınıf II (Rüzgarkıran) ya da üstü gemi'], 28: [3, 'Sınıf III (Aethel Muhafızı) ya da üstü gemi'] };
for (const g of Object.values(YAN_GOREV)) {
  g.onkosul = g.onkosul.map(([ad, f]) => {
    for (const [re, yeni, den] of ESLEME) if (re.test(ad)) return [yeni, den];
    if (/Gemi sınıfı/.test(ad) && GEMI[g.no]) return [GEMI[g.no][1], sinif(GEMI[g.no][0])];
    return [ad, f];
  });
}
// Görev 10: yakın dövüş için silah + zırh
YAN_GOREV[10].onkosul = [['Filtra Ağır Plazma Tüfeği ya da Zhaor Işık Mızrağı', (d) => var_('plazma_tufegi')(d) || var_('isik_mizragi')(d)], ['Bir zırh kuşanılı', (d) => !!(d.kusanilan && d.kusanilan.zirh)]];

// Yıldız Nöbeti dinamikleri
Object.assign(YAN_GOREV[1], { nobet: ['Uma', 'Zhaor'], nobetMetni: 'Gece pazarı yalnız Altın Gece ya da Gümüş Şafak nöbetinde kurulur.' });
Object.assign(YAN_GOREV[3], { nobet: ['Elyndra'], nobetMetni: 'Simyacının gizli yazısı yalnız Mor İkindi\'nin ışığında okunur.' });
Object.assign(YAN_GOREV[25], { nobet: ['Sinha'], nobetMetni: 'Işık tozu dalgası en yoğun Mavi Akşam nöbetinde.' });

// Çatışmalar (evrensel savaş)
const S = (dusmanlar, adlar, tier, ek = {}) => ({ dusmanlar, adlar, ortam: ek.ortam || 'kara', tier, gelis: dusmanlar.length > 1 ? 'kiskac' : 'tek', ...ek });
Object.assign(YAN_GOREV[4], { savas: S(['kadim_otomat'], ['arızalı Varek savaş otomatı'], 3, { giris: 'Otomatın kalkanı tonunu değiştiriyor: iki parmakla çevir, kalkan tonunu kır.' }), savasMetni: 'Kışladaki Varek savaş otomatı arızalandı ve sana döndü!', savasBitis: 'Otomat sustu; aşırı yüklü plazma bataryası sağlam.' });
Object.assign(YAN_GOREV[10], { savas: S(['sinir_muhafizi', 'sinir_muhafizi'], ['Anitor kraliyet sınır muhafızı', 'Anitor kraliyet sınır muhafızı'], 3), savasMetni: 'İki kraliyet sınır muhafızı şövalyenin önünü kesti: düello!', savasBitis: 'Muhafızlar yere çöktü; Sir Gareth kılıcını indiriyor.' });
Object.assign(YAN_GOREV[13], { savas: S(['kum_kertenkelesi', 'kum_kertenkelesi'], null, 3), savasMetni: 'Fırtınanın içinden iki Zorah kum kertenkelesi kuleye saldırıyor!', savasBitis: 'Kertenkeleler kuma gömüldü; kule güvende.' });
Object.assign(YAN_GOREV[14], { savas: (d) => S(['cam_akrebi'], null, 3, { giris: (d.koloni.parcalar.sonik_kovucu || 0) > 0 ? 'Sonik kovucu ilk turda akrebin kristal zırhını sarsıyor.' : '' }), savasMetni: 'Kristal çöl akrebi camın altından fırladı!', savasBitis: 'Akrep camın üstünde kıpırtısız.' });
Object.assign(YAN_GOREV[15], { savas: S(['haydut_cetesi', 'haydut_cetesi', 'haydut_cetesi'], null, 3, { gelis: 'kiskac' }), savasMetni: 'Nirdol Boynu\'nda üç haydut çetesi pusuda! Yüzde yirmi beş canda teslim olabilirler.', savasBitis: 'Haydutlar dağıldı ya da teslim oldu; kanyon açık.' });
Object.assign(YAN_GOREV[19], { savas: S(['simya_muhafizi'], null, 4), savasMetni: 'Simyacının hücresindeki çılgın simya muhafızı uyandı!', savasBitis: 'Muhafız eriyip kara bir sıvıya döndü; simyacı titriyor.' });
Object.assign(YAN_GOREV[21], { savas: S(['yildiz_paraziti', 'yildiz_paraziti'], null, 4), savasMetni: 'Teleskobun merceklerinden iki etobur Alt Evren yıldız paraziti üstüne atıldı! Işık mızrağı iki kat vurur.', savasBitis: 'Parazitler ışığa dağıldı.' });
Object.assign(YAN_GOREV[24], { savas: S(['biyom_yaratigi', 'biyom_yaratigi'], ['buzul biyom yaratığı', 'buzul biyom yaratığı'], 4), savasMetni: 'Kulenin buzundan iki buzul biyom yaratığı çıktı; yavrularını çağırıyorlar!', savasBitis: 'Yaratıklar buza geri çekildi; kule ayakta.' });
Object.assign(YAN_GOREV[28], { savas: S(['korsan_korvet', 'dron_tasiyici'], null, 4, { ortam: 'uzay' }), savasMetni: 'Bataklık korsanlarının korveti ve dron taşıyıcısı limanı abluka altında tutuyor!', savasBitis: 'Abluka kırıldı.' });
Object.assign(YAN_GOREV[30], { savas: S(['sis_canavari'], null, 4), savasMetni: 'Sis feneri bataklık canavarı fenerini sallıyor; yalnız göğüs hırıltısı gerçek!', savasBitis: 'Canavar balçığa serildi.' });

// Belgedeki Seçenek A/B ödülleri (yalnız tek "Ödül" yazan görevlerde ödül iki seçeneğe de eklenir)
const ekle = (no, ek) => {
  for (const k of YAN_GOREV[no].kararlar) {
    const eski = k.odul;
    k.odul = (d) => eski(d) + ', ' + ek.odul(d);
    k.itibar = { ...k.itibar, ...(ek.itibar || {}) };
  }
};
YAN_GOREV[1].kararlar = [
  K('Kaçakçıyı ihbar et', 'Kaçakçı muhafızlara verildi; başkentte kanun düzeni arttı.', { g_ygk: 20 }, (d) => ml(d, 800)),
  K('Karaborsacıyla anlaş', 'Mallara el koymadın; karaborsa artık sana yüzde on indirim yapıyor.', { g_ygk: -10 }, (d) => { d.bayrak.yan_istihbarat = true; return 'Karaborsada yüzde on indirim, ' + kaynak(d, 'isik_tozu', 50, 'gram Fenrir ışık tozu'); }),
];
YAN_GOREV[2].kararlar = [
  K('Hattı kapat ve onar', 'Hat güvenle onarıldı; Telamon gemine gizli bir tahliye kapısı açtı.', { g_ygk: 25 }, (d) => { d.bayrak.yan_protokol = true; return 'Magentor Acil Işınlanma Protokolü (savaşta yetenek listesinde: kaçış kolaylığı)'; }),
  K('Sızan aetheri topla', 'Sızıntıyı tankına çektin.', {}, (d) => kaynak(d, 'saf_aether', 80, 'saf aether') + ', ' + ml(d, 1200)),
];
ekle(3, { odul: (d) => { d.bayrak.yan_melezHiz = true; return bilim(d, 1500) + ' (YGK araştırma ilerlemesi yüzde beş); YGK beşinci kat laboratuvarında ve akademide melez üretim süresi kalıcı yüzde on kısa'; } });
YAN_GOREV[4].kararlar = [
  K('Bataryayı kışlaya geri ver, kazayı raporla', 'Varek Muhafızları minnettar; batarya sende kalsın dediler.', { g_ygk: 20 }, (d) => esya(d, 'varek_bataryasi')),
  K('Bataryayı gizlice gemine tak', 'Batarya senin; kışla bir şey sormadı.', { g_ygk: 20 }, (d) => esya(d, 'varek_bataryasi')),
];
ekle(5, { itibar: { g_ygk: 25 }, odul: (d) => { d.koloni.moral = Math.min(100, d.koloni.moral + 5); return esya(d, 'astral_odak', 2) + ', şehirde moral arttı'; } });
YAN_GOREV[6].kararlar = [
  K('Kaseti soyluya iade et', 'Soylu minnettar; Sinha tezgâhı sana bir akustik çip gönderdi.', {}, (d) => ml(d, 1500) + ', ' + esya(d, 'sinha_cipi')),
  K('Gizli şantaj kaydını YGK\'ya ver', 'Kayıt Akademinin arşivinde; YGK sana borçlu.', { g_ygk: 20 }, (d) => ml(d, 1500) + ', ' + esya(d, 'santaj_kaydi')),
];
YAN_GOREV[7].kararlar = [
  K('Kalyonu çekerek Julithan limanına götür', 'Julithan liman idaresi kalyonun yükünü seninle paylaştı.', { g_bati: 20 }, (d) => ml(d, 1800) + ', ' + kaynak(d, 'titanyum', 100)),
  K('Yükü yağmala, gemiyi batır', 'Yük senin ama Julithan hayalet kalyonun kaderini öğrendi.', { g_bati: -15 }, (d) => ml(d, 1800) + ', ' + kaynak(d, 'titanyum', 100)),
];
ekle(8, { odul: (d) => { d.bayrak.loranYosunu = true; kaynak(d, 'loran_yosunu', 6, 'Loran su yosunu'); return 'Loran su yosunu damarı açıldı: altı birim (Sarah\'nın T-09 Kseno-Panzehir taslağı için), ' + bilim(d, 1500); } });
YAN_GOREV[9].kararlar = [
  K('Suikastçıyı yakala', 'Senato kurtuldu.', { g_bati: 30 }, (d) => ml(d, 2000)),
  K('Senato sırrını sakla', 'Sır seninle; Senato seni korumaya aldı.', {}, (d) => { d.bayrak.senatoKorumasi = true; return kaynak(d, 'isik_tozu', 150, 'gram Fenrir ışık tozu') + ', politik koruma'; }),
];
YAN_GOREV[10].kararlar = [
  K('Şövalyeyi Anitor\'a teslim et', 'Anitor kralı adaleti sağladı.', { g_bati: 30 }, (d) => ml(d, 2200)),
  K('Sir Gareth\'i kurtar ve ekibe al', 'Sir Gareth mürettebatında; Anitor sana kırgın.', { g_bati: -10 }, (d) => { if (!yan(d).ozel.some((x) => x.ad === 'Sir Gareth')) yan(d).ozel.push({ ad: 'Sir Gareth', unvan: 'Firari şövalye', etki: 'savaşta alınan hasar yüzde on üç az' }); return 'Yeni mürettebat: Sir Gareth (savaşta alınan hasar ×0,87)'; }),
];
ekle(11, { itibar: { g_bati: 25 }, odul: (d) => { d.bayrak.yan_filtra_fiyat = true; return kaynak(d, 'kizilkaya_titanyumu', 150, 'kızılkaya titanyumu') + ', Julithan limanında Filtra oksit demiri yüzde yirmi ucuz'; } });
ekle(12, { odul: (d) => esya(d, 'kervan_hissesi') + ' (her gün yüz lira), ' + kaynak(d, 'safran_kukurt', 40, 'Safran kükürt cevheri') });
ekle(13, { itibar: { g_dogu: 20 }, odul: (d) => { if (!d.bayrak.tehlikeMuaf) d.bayrak.tehlikeMuaf = {}; d.bayrak.tehlikeMuaf.kum = true; return esya(d, 'ajmero_kuresi') + ', çöl fırtınalarında sığınma hakkı (kum fırtınası işlemez)'; } });
YAN_GOREV[14].kararlar = [
  K('Akrebi Lonca\'ya teslim et', 'Avcılar Loncası ödülü verdi.', { g_dogu: 25 }, (d) => ml(d, 1600)),
  K('Akrep kabuğunu işle', 'Kristal kabuk rezonans camına dönüştü.', { g_dogu: 15 }, (d) => kaynak(d, 'rezonans_cami', 20, 'rezonans camı')),
];
ekle(15, { itibar: { g_dogu: 25 }, odul: (d) => { karakterDurumu(d).tanis.zeno = true; gucEkle(d, 'dogu', 5); return ml(d, 1500) + ', Silahşör Zeno ile güven bağı (karakter ağında tanışıldı)'; } });
ekle(16, { odul: (d) => { yan(d).hardrinBariyer = 3; return 'Hardrin Manyetik Bariyeri (sonraki üç çatışmada yarı hasar), ' + kaynak(d, 'mavi_aether', 30, 'mavi aether tozu'); } });
ekle(17, { odul: (d) => bilim(d, 2000) + ', ' + kaynak(d, 'saf_aether', 100, 'saf aether kristali') });
YAN_GOREV[18].kararlar = [
  K('Tarikatçıyı dinle, haritayı al', 'Tarikatçı Kahergonat\'ın gizli arka giriş haritasını verdi: Final on altıda zırhlının kalkanı yüzde yirmi beş kırık başlar.', {}, (d) => esya(d, 'gecit_haritasi')),
  K('Sınır muhafızlarına teslim et', 'Muhafızlar tarikatçıyı aldı.', { g_dogu: 25 }, (d) => ml(d, 2000)),
];
YAN_GOREV[19].kararlar = [
  K('Simyacıyı muhafızlara teslim et', 'Halyon cezaevi simyacıyı geri aldı.', { g_kuzey: 25 }, (d) => ml(d, 1800) + ', ' + esya(d, 'halyon_prangasi') + ' (itibar kanıtı)'),
  K('Deli Simyacı Malakor\'u gemine al', 'Malakor laboratuvarında; Kuzey bunu hoş karşılamadı.', { g_kuzey: -15 }, (d) => { if (!yan(d).ozel.some((x) => x.ad === 'Deli Simyacı Malakor')) yan(d).ozel.push({ ad: 'Deli Simyacı Malakor', unvan: 'Kaçak simyacı', etki: 'torpido hasarı yüzde yirmi fazla' }); esya(d, 'halyon_prangasi'); return 'Yeni mürettebat: Deli Simyacı Malakor (torpido hasarı ×1,2)'; }),
];
ekle(20, { itibar: { g_kuzey: 20 }, odul: (d) => { if (!d.bayrak.tehlikeMuaf) d.bayrak.tehlikeMuaf = {}; d.bayrak.tehlikeMuaf.mormon = true; d.bayrak.tehlikeMuaf.kara_buz = true; return 'Mormon Denizi girdap bağışıklığı (Kuzey seyrüseferinde girdap ve kara buz tehlikesi işlemez)'; } });
ekle(21, { itibar: { g_kuzey: 30 }, odul: (d) => (ZN.miktar(d, 'parazit_sensoru') ? 'Mirelza ve Baş Gözlemci Valerius kule hattında birleşti' : esya(d, 'parazit_sensoru') + ' (gizli pusuları önceden görür); Mirelza ve Baş Gözlemci Valerius kule hattında birleşti') });
ekle(22, { itibar: { g_kuzey: 20 }, odul: (d) => kaynak(d, 'kara_buz', 50, 'Norvask kara buzu') + ', ' + esya(d, 'antik_buz_cekirdegi') });
YAN_GOREV[23].kararlar = [
  K('Kaçakçıların kristallerini sat', 'Kristaller pazarda.', {}, (d) => ml(d, 2400)),
  K('Helgar madenlerine serbest erişim iste', 'Dük madenlerini sana açtı.', { g_kuzey: 25 }, (d) => esya(d, 'helgar_izni')),
];
YAN_GOREV[24].kararlar = [
  K('Kuleyi Drahmir\'e teslim et', 'Drahmir muhafızları kuleyi devraldı.', { g_kuzey: 35 }, (d) => ml(d, 2000)),
  K('Üç sınır muhafızını ekibe al', 'Üç Drahmir askeri koloni ve gemi kara savunmasında.', { g_kuzey: 15 }, (d) => { d.bayrak.sinirAskeri = 3; return 'Kara savunmasına üç sınır askeri (kara çatışmalarında alınan hasar yüzde on az)'; }),
];
ekle(25, { itibar: { g_guney: 20 }, odul: (d) => kaynak(d, 'isik_tozu', 250, 'gram Fenrir ışık tozu') });
ekle(27, { itibar: { g_guney: 25 }, odul: (d) => kaynak(d, 'arin_tuyu', 20, 'Arin kuş tüyü') + ', ' + kaynak(d, 'arin_recinesi', 30, 'Arin girdap reçinesi') + '; resmî elçi Aethelgard ile sürgün mucit Nyxara Vel\'din ayrı kişiler olarak kaldı' });
YAN_GOREV[28].kararlar = [
  K('Veradon ticaret filosunu koru', 'Filo limana sağ salim girdi.', { g_guney: 35 }, (d) => ml(d, 3200) + ', ' + esya(d, 'liman_nisani') + ', enkazdan ' + esya(d, 'veradon_defteri')),
  K('Korsan gemisini ele geçir', 'Zırhlı Korsan Korveti filoda; Veradon korsanla iş tuttuğunu düşünüyor.', { g_guney: -15 }, (d) => {
    if (!d.filo) d.filo = [];
    d.filo.push({ ad: 'Zırhlı Korsan Korveti', sinif: 2, govde: 120, maxGovde: 120, moduller: {}, yakit: 40, maxYakit: 40, yer: 'kizak', atamalar: {}, odul: true });
    esya(d, 'veradon_defteri');
    return 'Zırhlı Korsan Korveti filoda, amiralin seyir defteri';
  }),
];
YAN_GOREV[29].kararlar = [
  K('Değirmeni halka aç', 'Yerel halkın gıda sorunu çözüldü; koloni de bunu duydu.', { g_guney: 25 }, (d) => { d.koloni.moral = Math.min(100, d.koloni.moral + 15); return 'Moral artı on beş'; }),
  K('Üretim payı al', 'Değirmenin bir payı senin.', {}, (d) => { d.bayrak.yan_aether_tozu = true; return 'Haftada elli gram saf aether ışık tozu pasif gelir'; }),
];
YAN_GOREV[30].kararlar = [
  K('Canavarı yok et, kristali al', 'Sis feneri kristali senin: Keralon sisine bağışıklık, kalkan ve sensör bonusu.', { g_guney: 20 }, (d) => { if (!d.bayrak.tehlikeMuaf) d.bayrak.tehlikeMuaf = {}; d.bayrak.tehlikeMuaf.bataklik = true; return esya(d, 'feneri_kristali'); }),
  K('Bataklık halkına hediye et', 'Bataklık köyleri canavarın kristalini kutsal emanet sayacak.', { g_guney: 40 }, (d) => ml(d, 2500)),
];

operasyonlariKaydet();
