// 4.7: Üç katmanlı görev mimarisi (v5 Paket 7). 115 görev kartı: ANA 20, YER 40, YAN 55.
// Görevler yeni oynanış yaratmaz; oyunda zaten var olan adımların (görevler, binalar, maden, kıyı, yerleşimciler, aile,
// festival, uzay, Tonoflenya) üstüne bir bağımlılık ağacı ve "şunu yaparsan bu olur" kartı koyar.
// Durum: d.gorevAgi = { biten { kod: gün }, ertelenen { kod: true }, uyarildi { kod: true }, son [kod], sonSn }
// Bir görev, ön şartlarının hepsi bitmiş ve kendi denetimi doğru olunca biter (denetim yoksa ön şartlar yeter). Biten kalır.
// Yerleşimci eşlemesi (Paket 7'deki adlar oyundaki on altı kişiyle uyuşmuyor; KAPSAM 62): Selim → Torvok, Nadia → Sira-Vel,
// Tarik → Brom, Lira → Julian, 13. yerleşimci → Tina, Vaelis → Halvar, Ayla → Nerissa, Ozan-7 → Mateo. K1/K2/K3 → Kademe 3/6/10.
import * as IM from '../imalat/tezgah';
import * as AI from '../aile/aile';
import * as HB from '../hobi/hobi';
import { itibarKademesi } from '../uzay/fenomen';
import * as Z from '../zaman';
import { YERLESIMCILER } from '../yerlesim/veri';

// --- Denetim yardımcıları (bağımlılıksız; alanlar yoksa yanlış) ---
const B = (d, k) => !!(d.bayrak && d.bayrak[k]);
const tesis = (d, t) => ((d.koloni && d.koloni.binalar) || []).includes(t);
const bina = (d, b) => !!(d.yer && (d.yer.binalar || []).includes(b));
const katildi = (d, id) => !!(d.yer && (d.yer.katilan || []).includes(id));
const kisi = (d, id) => (d.yer && d.yer.kisi && d.yer.kisi[id]) || null;
const kademe = (d, id) => (kisi(d, id) && kisi(d, id).k) || 0;
const sh = (d) => d.saha || {};
const durak = (d, n) => (sh(d).duraklar || []).includes(n);
const karakol = (d, k) => (sh(d).karakollar || []).includes(k);
const alet = (d, a) => (sh(d).alet && sh(d).alet[a]) || 0;
const eslik = (d, a) => !!(sh(d).eslikGecmis && sh(d).eslikGecmis[a]);
const gezegenSay = (d) => (d.tamamlananOp || []).filter((x) => /^p\d\d$/.test(x)).length;
const gezegenUst = (d) => (d.tamamlananOp || []).some((x) => /^p(1[3-9]|20)$/.test(x));
const tf = (d, n) => !!(d.tf && (d.tf.biten || []).includes(n));
const tarifYapildi = (d, f) => Object.keys(d.uretilenTarif || {}).some((id) => IM.TARIFLER[id] && f(IM.TARIFLER[id], id));
const festivalSay = (d) => Object.keys((d.festival && d.festival.son) || {}).length;
const arsivSay = (d) => HB.SETLER.filter((s) => B(d, 'arsiv_' + s.id)).length;
const pz = (d) => d.pazar || {};
const aile = (d) => d.aile || { cocuklar: [], ciftler: [], aileEvi: {} };
const ciraKVar = (d) => (aile(d).cocuklar || []).some((c) => AI.evre(d, c) === 'cirak');
const BALIKLAR = ['sazan', 'gol_baligi', 'yilan_baligi', 'yengec', 'kseno_eti', 'nadir'];
const balikSay = (d) => BALIKLAR.filter((b) => sh(d).avlanan && sh(d).avlanan[b]).length;
const ashaneTarifleri = () => Object.keys(IM.TARIFLER).filter((id) => IM.TARIFLER[id].bina.includes('ashane'));
const asciSay = (d) => ashaneTarifleri().filter((id) => d.uretilenTarif && d.uretilenTarif[id]).length;
const MADEN_DURAKLARI = [1, 5, 10, 15, 20, 25, 30, 35, 40];

// --- Kart üretici ---
// G(kod, ad, on [kod], denetim(d) | null, acar, { kat, uyari, bekle, nasil, ilerleme(d) 0-1 })
export const GOREVLER = {};
export const SIRA = [];
function G(kod, ad, on, denetim, acar, ek = {}) {
  GOREVLER[kod] = { kod, ad, on, denetim, acar, ...ek, tur: kod.slice(0, 3) };
  SIRA.push(kod);
}
// Yerleşimci güven kademesi (K1/K2/K3 → 3/6/10)
const KAD = { 1: 3, 2: 6, 3: 10 };
const kadDenetim = (id, k) => (d) => kademe(d, id) >= KAD[k];
const kadIlerleme = (id, k) => (d) => Math.min(1, ((kisi(d, id) && kisi(d, id).p) || 0) / (KAD[k] * 100));
const kadNasil = (ad, k) => ad + " ile sohbet et, sevdiği hediyeleri ver; güven kademesi " + KAD[k] + " olunca kademe sahnesi açılır. Profil kartından ilerlemeyi dinleyebilirsin.";
const katNasil = (ad, kosul) => ad + " koloniye kendiliğinden katılır: " + kosul + " Katılınca meydanda ve kamp ateşinde bulunur.";

// ================= EVRE 1 =================
G("ANA-01", "Sağ Kalanların Sayımı ve İlk Enerji", [], (d) => B(d, "kule"),
  "Merkez terminali ve sinyal kulesi; kolonide ilk enerji. Yerleşim ve sanayi kolları açılır.",
  { bekle: "Zorunlu başlangıç adımı.", nasil: "Birinci görev Sinyal Arayışı: jeneratörü çalıştır, anteni kur, frekansı kilitle, sinyal kulesini inşa et." });
G("ANA-02", "Koloni Savunma Çemberi ve İlk Çıkarım", ["ANA-01"], (d) => B(d, "dokumhane"),
  "Jeotermal sondaj ve dökümhane: temel sanayi binaları, koloni ikinci seviye. YER-01, YER-04 ve çekirdek beş yerleşimcinin hikâyeleri açılır.",
  { bekle: "Tamamlandıktan sonra ANA-03 bekletilebilir.", nasil: "İkinci görev Jeotermal Sondaj: üç bacaya sonda yerleştir, valfleri dengele, dökümhaneyi kur." });
G("ANA-03", "Atmosfer Tarayıcısı ve Kısa Menzil Radyo", ["ANA-02"], (d) => B(d, "kazi"),
  "Kadim Krater'deki kazıdan yıldız haritası: Moloz Kuşağı ve uydu sinyalinin izi. YAN-06 ve ANA-04 açılır.",
  { bekle: "Maden ya da köy işleri için istediğin kadar ertelenebilir.", nasil: "Üçüncü görev Antik Kseno-Laboratuvar Kazısı: rezonans kapılarını notalarla aç, veri kristallerini ve yıldız haritasını al." });
G("ANA-04", "Vanguard-01 Enkaz Koordinatları", ["ANA-03"], (d) => B(d, "morsBulundu"),
  "Gözcü Tepesi'nden mors sinyali; Sarp Kanyon üzerinden Vanguard-01 enkazına rota. Evre 2'ye köprü.",
  { bekle: "Hazır hissetmeden enkaza çıkmak zorunda değilsin.", nasil: "Gözcü Tepesi'nde mors sinyalini ara: frekansı 95 ile 115 arasında kilitle." });
G("YER-01", "Yerleşim Sekmesini Aç", ["ANA-02"], (d) => bina(d, "meydan"),
  "Merkez terminalinde Yerleşim sekmesi; meydan ve ilk ev planları. Yerleşimciler meydana taşınır.",
  { kat: "insa", bekle: "İsteğe bağlı sırayla ilerlenir.", nasil: "Basınçlı Yaşam Bloğu'nu kur, sonra terminalde Yerleşim, Binalar, Koloni Meydanı." });
G("YER-02", "Kaptanın Kamarası ve Vardiya Düzeni", ["YER-01"], (d) => bina(d, "kamara"),
  "Kaptanın kamarası: uyku, dekor rafı; nöbet uzunluğu Ayarlar'da 10, 15, 20, 25 ya da 30 dakika.",
  { kat: "insa", bekle: "İstediğin zaman.", nasil: "Yerleşim, Binalar, Kaptanın Kamarası." });
G("YER-03", "İlk Konutlar ve Yatak Kapasitesi", ["YER-01"], (d) => bina(d, "dunya_konut") || bina(d, "kubbe_ev"),
  "Dünya konutu ya da Malken kubbe evi: yeni yerleşimcilerin katılımı ve aile evleri.",
  { kat: "insa", bekle: "Ev yapılmazsa göçmen görevleri bekler, oyun durmaz.", nasil: "Yerleşim, Binalar, Dünya Konutu ya da Malken Kubbe Evi." });
G("YER-04", "Basit Alet Tezgâhı", ["ANA-02"], (d) => bina(d, "atolye"),
  "Atölye: kazma, balta, fener, olta ve çanta; birinci kademe aletler. Maden ve kıyı yolları buna bağlı.",
  { kat: "imalat", bekle: "Maden ve kıyı öncesi şart.", nasil: "Yerleşim, Binalar, Atölye. Aletler menüsü terminalde ve atölyede." });
G("YER-05", "Maden Girişinin Temizlenmesi", ["YER-04"], (d) => B(d, "madenAcik"),
  "Vadi'deki maden ağzı ve asansör: Kat 1-10 (bakır, kömür, kil, kuvars).",
  { kat: "maden", bekle: "Maden istemeyen kıyıya gidebilir.", nasil: "Kaelon ya da Torvok'la konuş: madeni açmayı önerirler." });
G("YER-06", "İç Deniz Kıyı Patikası", ["YER-04"], (d) => B(d, "kiyiAcik"),
  "Manyetik Sırtlar'dan iç deniz kıyısına patika: kereste, lif, tuz, balık.",
  { kat: "kiyi", bekle: "Kıyı ile maden tamamen paralel.", nasil: "Zarek'le konuş: kıyı patikasını açmayı önerir." });
G("YER-07", "Dünya Usulü Aşhane", ["YER-01", "YER-06"], (d) => bina(d, "ashane"),
  "Aşhane: günlük yemek, sefer rasyonu, aşçılık ritmi.",
  { kat: "insa", bekle: "İsteğe bağlı; açlık cezası yok.", nasil: "Yerleşim, Binalar, Aşhane." });
G("YER-08", "Çamurdan Tuğlaya: İlk Fırın", ["YER-05", "YER-06"], (d) => tarifYapildi(d, (t, id) => !!t.cikti.tugla || !!t.cikti.seramik),
  "Tuğla ve seramik: aile evleri, karakollar ve tapınak için.",
  { kat: "imalat", bekle: "Paralel üretim kolu.", nasil: "Atölyenin fırınında kil ve kömürden tuğla üret." });
G("YER-09", "İlan Panosu Direğini Dik", ["YER-02"], (d) => tesis(d, "yasam_blogu") && bina(d, "meydan"),
  "Meydandaki ilan panosu: en çok üç sipariş, kredi ve takas kuponu.",
  { kat: "imalat", bekle: "Ekonomik özgürlük sağlar.", nasil: "Yaşam bloğu ve meydan kurulunca pano kendiliğinden belirir." });
G("YER-10", "Koloni Tezgâhı ve İlk Satış", ["YER-09"], (d) => (pz(d).tezgahGelir || 0) > 0 || Object.keys(pz(d).tezgah || {}).length > 0,
  "Meydandaki koloni tezgâhı: günde en çok 400 kredi yerel satış.",
  { kat: "imalat", bekle: "İstediğin zaman kullan.", nasil: "Meydanda koloni tezgâhına mal koy." });
G("YAN-01", "Sorya Val-Nira (K1): Toprağın Nabzı", ["ANA-02"], kadDenetim("sorya", 1), "Sorya'nın üçüncü kademe sahnesi ve kazancı (+10 moral).",
  { kat: "hikaye", bekle: "Tamamen isteğe bağlı.", nasil: kadNasil("Sorya", 1), ilerleme: kadIlerleme("sorya", 1) });
G("YAN-02", "Kaelon Vex-Tar (K1): Sessiz Perçin", ["ANA-02"], kadDenetim("kaelon", 1), "Kaelon'un üçüncü kademe sahnesi; alet bileme ücretsiz.",
  { kat: "hikaye", bekle: "Tamamen isteğe bağlı.", nasil: kadNasil("Kaelon", 1), ilerleme: kadIlerleme("kaelon", 1) });
G("YAN-03", "Dr. Lyris Mar-Axira (K1): Işık ve Nabız", ["ANA-02"], kadDenetim("lyris", 1), "Lyris'in üçüncü kademe sahnesi.",
  { kat: "hikaye", bekle: "Tamamen isteğe bağlı.", nasil: kadNasil("Lyris", 1), ilerleme: kadIlerleme("lyris", 1) });
G("YAN-04", "Zarek Sol-Zhaor (K1): Altı Yıldızın Kaydı", ["ANA-02"], kadDenetim("zarek", 1), "Zarek'in üçüncü kademe sahnesi; Koloni Arşivi fikri.",
  { kat: "hikaye", bekle: "Tamamen isteğe bağlı.", nasil: kadNasil("Zarek", 1), ilerleme: kadIlerleme("zarek", 1) });
G("YAN-05", "Usta Veysel (K1): Çayın Demini Bulmak", ["YER-07"], kadDenetim("veysel", 1), "Veysel'in üçüncü kademe sahnesi.",
  { kat: "hikaye", bekle: "Tamamen isteğe bağlı.", nasil: kadNasil("Usta Veysel", 1), ilerleme: kadIlerleme("veysel", 1) });
G("YAN-06", "Enkazdan Gelen Ses (Kaptan Marcus)", ["ANA-03", "YER-03"], (d) => katildi(d, "marcus"), "Kaptan Marcus koloniye katılır.",
  { kat: "hikaye", bekle: "Bekletirsen Marcus katılmayı bekler.", nasil: katNasil("Marcus", "katılım koşulu terminalde Yerleşim, Yerleşimciler'de okunur.") });
G("YAN-07", "İlk Olta, İlk Av", ["YER-06"], (d) => Object.keys(sh(d).avlanan || {}).length > 0, "Balıkçılık; balıklar aşhane, pano ve hediyelerde.",
  { kat: "ticaret", bekle: "Hobi kolu.", nasil: "Kıyıdaki balık noktalarından birinde oltayı at: tek dokun tasma, ısırınca sürükleyip çek." });
G("YAN-08", "İlan Panosunda İlk Gün", ["YER-09"], (d) => (pz(d).teslimSayisi || 0) >= 3, "Üç sipariş teslim: Orin'in gemisinin izi ve kupon.",
  { kat: "ticaret", bekle: "İsteğe bağlı.", nasil: "İlan panosundaki siparişlerden üçünü teslim et.", ilerleme: (d) => Math.min(1, (pz(d).teslimSayisi || 0) / 3) });

// ================= EVRE 2 =================
G("ANA-05", "Vanguard-01 Kara Kutusunu Çıkar", ["ANA-04"], (d) => B(d, "vanguardGunluk"),
  "Enkazdaki ses günlükleri: eski Dünya teknolojisi, bütün noktalar haritada, Vanguard fırını.",
  { bekle: "Bekletirsen koloni işleyişi aksamaz.", nasil: "Sarp Kanyon'dan Vanguard'a git, enkazda ses günlüklerini dinle." });
G("ANA-06", "Yörünge İniş Pisti Onarımı", ["ANA-05", "YER-09"], (d) => !!pz(d).orinGeldi,
  "Kaptan Orin haftanın yedinci günü ikmal iskelesine iner.",
  { uyari: "Orin'in gemisi geldiğinde her şey kısıtlı stok ve pahalıdır; çekirdek uzay teknolojisi satılmaz. Koloni ekonomisi seferlerin yerine geçmez.",
    bekle: "Oyuncu hazır olunca.", nasil: "Meydan ve iskele kurulu olsun; haftanın yedinci günü sabah nöbetlerinde iskeleye in." });
G("ANA-07", "Uzun Menzilli Radyo Kulesi", ["ANA-06"], (d) => (d.bitenGorevler || []).includes("kivilcim"),
  "Kıvılcım gemisiyle ilk uçuş; yörünge taraması ve dış gezegen görevlerine köprü.",
  { bekle: "Uzaya çıkmak istemeyen burada durup koloni kurabilir.", nasil: "Tersanede Kıvılcım'ı topla, ilk uçuşu yap, bir noktayı tarayıp Aethelis'e kenetlen." });
G("ANA-08", "İlk Gezegen Savunma Tatbikatı", ["ANA-07", "YAN-06"], (d) => B(d, "egitim_kara") && B(d, "egitim_uzay"),
  "Kara ve uzay savaş eğitimi tamam; çatışmalar ve baskın savunması açılır. Evre 3 ana görevleri.",
  { bekle: "Ekipman güçlenene kadar ertelenebilir.", nasil: "Menüde Savaş eğitimi: önce kara, uzay açılınca uzay eğitimi." });
G("YER-11", "Kat 10 Asansörü ve İlk Yeraltı Karakolu", ["YER-05", "YAN-06"], (d) => karakol(d, "kat10"),
  "Kat 10 karakolu: pusu yüzde 70 azalır; Kat 11-20 erişimi ve tahta destek.",
  { kat: "maden", uyari: "Bu görevi tamamlarsan Kat 11-20'nin orta seviye yeraltı düşmanları önüne çıkar. İstersen şimdi bekleyip Kat 1-10'da hazırlık yapabilirsin.",
    bekle: "Hazır değilsen Kat 1-10'da kalınabilir.", nasil: "Maden asansöründe Kat 10'a in, Kat 10 durağında karakol kur." });
G("YER-12", "Kıyı Kampı Karakolu", ["YER-06", "YER-08"], (d) => karakol(d, "kiyi"),
  "Kıyı kampı: kıyı pusu riski yüzde 70 azalır; kereste ve tuz desteği.",
  { kat: "kiyi", bekle: "Paralel güvenlik adımı.", nasil: "Kıyıdaki kampta karakol kur." });
G("YER-13", "Koloni Arşivi Binası", ["YER-01", "YAN-04"], (d) => bina(d, "okul"),
  "Okulun doğu duvarındaki Koloni Arşivi: dört bağış seti.",
  { kat: "imalat", bekle: "Koleksiyon ve kalıcı ödül kolu.", nasil: "Yerleşim, Binalar, Okul: arşiv kapısı okulun içinde." });
G("YER-14", "Axelum Tapınağı / Huzur Mabedi", ["YER-08", "YER-03"], (d) => bina(d, "tapinak"),
  "Axelum Tapınağı: Malken festivalleri, tütsü, rezonans sunağı.",
  { kat: "insa", bekle: "Sosyal bina kolu.", nasil: "Yerleşim, Binalar, Axelum Tapınağı." });
G("YER-15", "Takas Meydanı ve Tüccar İskelesi", ["ANA-06"], (d) => (d.gorulenMekanlar || []).includes("iskele"),
  "İkmal iskelesi: Orin'le alım, satım ve takas; kısıtlı stokta fiyat uyarısı.",
  { kat: "imalat", bekle: "Ticaret kolu.", nasil: "Meydanın iskele kapısından iskeleye in." });
G("YER-16", "Çöl Tilkisi Saha Donanımı", ["YER-11|YER-12"], (d) => eslik(d, "col_tilkisi"),
  "Çöl Tilkisi madende ve kıyıda eşlik eder: üst katlarda pusu yok.",
  { kat: "imalat", bekle: "Araç entegrasyonu.", nasil: "Araç hangarında Çöl Tilkisi'ni yap; maden asansöründe yüzeyden inerken onu eşliğe seç." });
G("YER-17", "Demir Atölyesi ve T2 Aletler", ["YER-11"], (d) => ["kazma", "balta", "olta"].some((a) => alet(d, a) >= 2),
  "İkinci kademe kazma, balta ve olta: sert damarlar, yaşlı ağaçlar, daha geniş ısırma penceresi.",
  { kat: "maden", bekle: "Güçlenme adımı.", nasil: "Aletler menüsünde bir aleti ikinci kademeye yükselt." });
G("YER-18", "Taverna: Akşamların Kalbi", ["YER-07", "YER-03"], (d) => bina(d, "taverna"),
  "Taverna: akşam sohbetleri, Altı Yıldız Zarı.",
  { kat: "insa", bekle: "Sosyal ve mini oyun kolu.", nasil: "Yerleşim, Binalar, Taverna." });
G("YER-19", "Çan ve Tütsü Atölyesi", ["YER-14", "YER-08"], (d) => tarifYapildi(d, (t) => t.tezgah === "can" || t.tezgah === "tutsu") || ((d.hobi && d.hobi.besteler) || []).length > 0,
  "Çan ve tütsü imalatı; gözlem kulesinde altı yıldız notasıyla beste.",
  { kat: "imalat", bekle: "Zanaat kolu.", nasil: "Tapınaktaki tütsü ya da çan tezgâhında bir şey üret, ya da gözlem kulesinde bir beste kaydet." });
G("YER-20", "Sera ve Vaha Genişletme (Günlük Mahsul)", ["YER-07", "YER-13"], (d) => ["arpa", "pamuk_keten", "isik_otu", "kristal_cicek", "cay_yapragi", "tatli_kok"].some((b) => d.tarim && d.tarim.tohumlar && d.tarim.tohumlar[b]),
  "Arpa, pamuk-keten, çay, ışık otu, kristal çiçek ve tatlı kök tohumları; yeni tarla yok.",
  { kat: "kiyi", bekle: "Çiftçilik, dokuma ve aşhane zinciri.", nasil: "Aşhane, atölye ya da vahadan gelen gündelik tohum hediyelerini bekle ya da Orin'den tohum al." });
G("YAN-09", "Sığınaktaki Öğretmen (Öğretmen Defne)", ["ANA-05", "YER-03"], (d) => katildi(d, "defne"), "Öğretmen Defne koloniye katılır; okul planı.",
  { kat: "hikaye", bekle: "Bekletilebilir.", nasil: katNasil("Defne", "koşulu Yerleşimciler listesinde.") });
G("YAN-10", "Yıkık Kubbeden Çıkan Usta (Torvok)", ["ANA-05", "YER-08"], (d) => katildi(d, "torvok"), "Torvok koloniye katılır.",
  { kat: "hikaye", bekle: "Bekletilebilir.", nasil: katNasil("Torvok", "koşulu Yerleşimciler listesinde.") });
G("YAN-11", "Vaha Kenarındaki Pilot (Elara)", ["YER-20", "YER-03"], (d) => katildi(d, "elara"), "Elara koloniye katılır.",
  { kat: "hikaye", bekle: "Bekletilebilir.", nasil: katNasil("Elara", "koşulu Yerleşimciler listesinde.") });
G("YAN-12", "Kaptan Orin ile İlk Pazarlık", ["ANA-06"], (d) => (pz(d).orinAlim || 0) > 0, "Orin'le ilk alım ya da satım.",
  { kat: "ticaret", bekle: "Ticaret yan zinciri.", nasil: "İskelede Orin'den bir şey al ya da ona bir şey sat." });
G("YAN-13", "Sorya Val-Nira (K2): Vaha'nın Kökleri", ["YAN-01", "YER-20"], kadDenetim("sorya", 2), "Sorya'nın altıncı kademe sahnesi.",
  { kat: "hikaye", bekle: "İsteğe bağlı.", nasil: kadNasil("Sorya", 2), ilerleme: kadIlerleme("sorya", 2) });
G("YAN-14", "Kaelon Vex-Tar (K2): Kardeşimin Çekici", ["YAN-02", "YER-17"], kadDenetim("kaelon", 2), "Kaelon'un altıncı kademe sahnesi; tamir ucuzlar.",
  { kat: "hikaye", bekle: "İsteğe bağlı.", nasil: kadNasil("Kaelon", 2), ilerleme: kadIlerleme("kaelon", 2) });
G("YAN-15", "Dr. Lyris Mar-Axira (K2): Eski Salgın Günlüğü", ["YAN-03", "YER-11"], kadDenetim("lyris", 2), "Lyris'in altıncı kademe sahnesi; maruziyet azalır.",
  { kat: "hikaye", bekle: "Maden güvenliği için faydalı ama zorunlu değil.", nasil: kadNasil("Lyris", 2), ilerleme: kadIlerleme("lyris", 2) });
G("YAN-16", "Zarek Sol-Zhaor (K2): Unutulmuş Tablet", ["YAN-04", "YER-13"], kadDenetim("zarek", 2), "Zarek'in altıncı kademe sahnesi.",
  { kat: "hikaye", bekle: "İsteğe bağlı.", nasil: kadNasil("Zarek", 2), ilerleme: kadIlerleme("zarek", 2) });
G("YAN-17", "Usta Veysel (K2): Eski Dünya'nın Ekmeği", ["YAN-05", "YER-20"], kadDenetim("veysel", 2), "Veysel'in altıncı kademe sahnesi; dekor dükkânı.",
  { kat: "hikaye", bekle: "İsteğe bağlı.", nasil: kadNasil("Usta Veysel", 2), ilerleme: kadIlerleme("veysel", 2) });
G("YAN-18", "Kaptan Marcus (K1): Nöbet Defteri", ["YAN-06", "YER-11"], kadDenetim("marcus", 1), "Marcus'un üçüncü kademe sahnesi.",
  { kat: "hikaye", bekle: "İsteğe bağlı.", nasil: kadNasil("Marcus", 1), ilerleme: kadIlerleme("marcus", 1) });
G("YAN-19", "İlk Festival Hazırlığı", ["YER-14|YER-18"], (d) => festivalSay(d) > 0, "İlk festival; beş günlük bekleme ve döngü başlar.",
  { kat: "aile", bekle: "Festival tamamen senin isteğinle başlar.", nasil: "Terminalde Yerleşim, Festivaller: koşulu sağlanan bir festivali başlat." });
G("YAN-20", "Dokuma Tezgâhı ve İlk Kıyafet", ["YER-20"], (d) => tarifYapildi(d, (t) => t.tezgah === "dokuma"),
  "Kumaş ve kıyafet: hediye çeşitliliği.",
  { kat: "ticaret", bekle: "İsteğe bağlı.", nasil: "Dünya konutundaki dokuma tezgâhında pamuk-ketenden bir şey doku." });

// ================= EVRE 3 =================
G("ANA-09", "İlk Dış Gezegen Keşif Uçuşu", ["ANA-08"], (d) => gezegenSay(d) >= 1,
  "Yirmi dış gezegen hattı: ilk iniş ve numune.",
  { bekle: "Kolonide kalıp Evre 3 yerleşimlerini bitirmek serbest.", nasil: "Gemiyle bir gezegen noktasına git, kenetlen ve iniş operasyonunu bitir." });
G("ANA-10", "Yörünge Ticaret ve Siyaset Köprüsü", ["ANA-09", "ANA-06"], (d) => itibarKademesi(d) >= 1,
  "Evren itibarı ikinci kademe: bilim ve gemi yükseltmeleri derinleşir.",
  { bekle: "İsteğe bağlı tempoda.", nasil: "Fenomen kaydet, gezegen ve topluluk operasyonları bitir: itibar 1000." });
G("ANA-11", "Gezegen Çekirdek Sismik Taraması", ["ANA-09", "YER-21"], (d) => durak(d, 25),
  "Kat 21-30'un fay hattı haritada: Kat 25 durağı.",
  { bekle: "Bilimsel ön hazırlık.", nasil: "Madende Kat 21-25 arasında merdivenle in, Kat 25 asansör durağını aç." });
G("ANA-12", "Koloni Meclisi ve Ortak Yemin", ["ANA-10", "YER-22"], (d) => ((d.koloni && d.koloni.seviye) || 1) >= 4,
  "Koloni dördüncü seviye: terraforming ve Dünya-Malken birleşik kimliği. Evre 4 ana görevleri.",
  { bekle: "Hikâye dönüm noktası.", nasil: "Koloni yönetiminde Terraforming katmanları ve dördüncü seviye eksikleri okunur." });
G("YER-21", "Kat 20 Asansörü ve İkinci Karakol", ["YER-11", "YER-17"], (d) => karakol(d, "kat20"),
  "Kat 20 karakolu; Kat 21-30 kristal damarları.",
  { kat: "maden", uyari: "Bu görevi tamamlarsan Kat 21-30'un güçlü yeraltı düşmanları başlar. Önce Mammoth eşliği ya da ikinci kademe zırh önerilir.",
    bekle: "İstersen Kat 11-20'de kal.", nasil: "Kat 20 durağında karakol kur." });
G("YER-22", "Okul ve Gençlik Çıraklık Binası", ["YAN-09", "YER-08"], (d) => bina(d, "okul"),
  "Okul: doğan çocukların öğrenci ve çırak evreleri.",
  { kat: "insa", bekle: "Aile sisteminin temel şartı.", nasil: "Yerleşim, Binalar, Okul." });
G("YER-23", "Termal Hamam ve Dinlenme Konağı", ["YER-14", "YER-08"], (d) => bina(d, "hamam"),
  "Hamam: stres, yorgunluk ve artık zehir tek girişte sıfırlanır.",
  { kat: "insa", bekle: "Yaşam kalitesi binası.", nasil: "Yerleşim, Binalar, Termal Hamam." });
G("YER-24", "Mammoth ve Demir Kervan Saha Entegrasyonu", ["YER-21"], (d) => eslik(d, "mammoth") || eslik(d, "demir_kervan"),
  "Mammoth tek darbede kazar; Demir Kervan sınırsız çanta ve karakol akışı.",
  { kat: "imalat", bekle: "Araçların koloniye bağlanması.", nasil: "Mammoth ya da Demir Kervan'ı maden asansöründe eşliğe seç." });
G("YER-25", "Aile Konutları (Geniş Evler)", ["YAN-10", "YER-22"], (d) => !!aile(d).kamaraGenis || Object.keys(aile(d).aileEvi || {}).length > 0,
  "Aile evi ya da genişletilmiş kamara: evlilik ve çocuk için fiziksel şart.",
  { kat: "insa", bekle: "Nüfus artışı kolu.", nasil: "Konutta Aile evine yükselt ya da kamarada kamarayı genişlet." });
G("YER-26", "Açık Hava Pazarı (Haftalık Panayır)", ["YER-15", "YER-18"], (d) => (pz(d).tezgahGelir || 0) >= 400,
  "Tezgâhta toplam 400 kredilik satış: meydan pazarı canlanır.",
  { kat: "imalat", bekle: "Sosyal ekonomi.", nasil: "Koloni tezgâhına mal koy; satışlar nöbet başlarında gelir.", ilerleme: (d) => Math.min(1, (pz(d).tezgahGelir || 0) / 400) });
G("YER-27", "Hayvan Barınağı ve Xeno-Bakım", ["YAN-11", "YER-06"], (d) => B(d, "barinak"),
  "Barınak, kuluçka ve bakım; süt, yün, yumurta.",
  { kat: "kiyi", bekle: "Hobi ve günlük ürün kolu.", nasil: "Terminalde Yerleşim ya da barınak menüsünden barınağı kur." });
G("YER-28", "T3 Ustalık Aletleri Tezgâhı", ["YER-21"], (d) => ["kazma", "balta", "olta"].some((a) => alet(d, a) >= 3),
  "Üçüncü kademe aletler: kristal ve elmas damarları.",
  { kat: "maden", bekle: "Son katlar öncesi güçlenme.", nasil: "Aletler menüsünde bir aleti üçüncü kademeye yükselt." });
G("YER-29", "Yeraltı Işıklandırma ve Ses İşaretçileri", ["YER-21", "YER-20"], (d) => alet(d, "fener") >= 2,
  "İkinci kademe fener: pusu uyarısı ve derin katlarda yön.",
  { kat: "maden", bekle: "Erişilebilirlik ve konfor.", nasil: "Aletler menüsünde feneri ikinci kademeye yükselt." });
G("YER-30", "Koloni Arşivi: İlk 2 Seti Tamamla", ["YER-13", "YER-21"], (d) => arsivSay(d) >= 2,
  "İki bağış seti: setlerin kalıcı ödülleri.",
  { kat: "imalat", bekle: "Koleksiyon hedefi.", nasil: "Arşiv vitrinlerinde parçaları bağışla.", ilerleme: (d) => Math.min(1, arsivSay(d) / 2) });
G("YAN-21", "Kıyı Mağarasındaki Şifacı (Sira-Vel)", ["YER-12", "YER-03"], (d) => katildi(d, "siravel"), "Sira-Vel koloniye katılır.",
  { kat: "hikaye", bekle: "Bekletilebilir.", nasil: katNasil("Sira-Vel", "koşulu Yerleşimciler listesinde.") });
G("YAN-22", "Gölgedeki Zanaatkâr (Brom)", ["YER-18", "YER-17"], (d) => katildi(d, "brom"), "Brom koloniye katılır.",
  { kat: "hikaye", bekle: "Bekletilebilir.", nasil: katNasil("Brom", "koşulu Yerleşimciler listesinde.") });
G("YAN-23", "Gezgin Ses Ustası (Julian)", ["YER-26", "YER-03"], (d) => katildi(d, "julian"), "Julian koloniye katılır.",
  { kat: "hikaye", bekle: "Bekletilebilir.", nasil: katNasil("Julian", "koşulu Yerleşimciler listesinde.") });
G("YAN-24", "İlk Düğün Çanı", ["YER-25"], (d) => !!aile(d).es || (aile(d).ciftler || []).length > 0, "Evlilik: kaptanın ya da arabuluculukla iki yerleşimcinin.",
  { kat: "aile", bekle: "Evlilik tamamen senin tercihin.", nasil: "Kademe 8'deki bir yerleşimcinin konuşma menüsünde evlenme teklifi; ya da Aile ve nesiller'de arabuluculuk." });
G("YAN-25", "Yeni Bir Ses: Koloninin İlk Çocuğu", ["YAN-24", "YER-22"], (d) => (aile(d).cocuklar || []).length > 0, "Bebek, öğrenci ve çırak evreleri başlar.",
  { kat: "aile", bekle: "Nesil devamlılığı kolu.", nasil: "Evlendikten üç gün sonra kamarada çocuk yatağı kur; eşin akşam sorar; on dört gün beklenir." });
G("YAN-26", "Öğretmen Defne (K1): Boş Defterler", ["YAN-09", "YER-22"], kadDenetim("defne", 1), "Defne'nin üçüncü kademe sahnesi.",
  { kat: "hikaye", bekle: "İsteğe bağlı.", nasil: kadNasil("Defne", 1), ilerleme: kadIlerleme("defne", 1) });
G("YAN-27", "Torvok (K1): Rüzgâra Dayanıklı Duvar", ["YAN-10", "YER-25"], kadDenetim("torvok", 1), "Torvok'un üçüncü kademe sahnesi.",
  { kat: "hikaye", bekle: "İsteğe bağlı.", nasil: kadNasil("Torvok", 1), ilerleme: kadIlerleme("torvok", 1) });
G("YAN-28", "Elara (K1): İlk Hasadın Tadı", ["YAN-11", "YER-20"], kadDenetim("elara", 1), "Elara'nın üçüncü kademe sahnesi.",
  { kat: "hikaye", bekle: "İsteğe bağlı.", nasil: kadNasil("Elara", 1), ilerleme: kadIlerleme("elara", 1) });
G("YAN-29", "Kaptan Marcus (K2): Karanlıkta Nöbet", ["YAN-18", "YER-21"], kadDenetim("marcus", 2), "Marcus'un altıncı kademe sahnesi; kaçınma penceresi uzar, sefer kısalır.",
  { kat: "hikaye", bekle: "İsteğe bağlı.", nasil: kadNasil("Marcus", 2), ilerleme: kadIlerleme("marcus", 2) });
G("YAN-30", "Sorya Val-Nira (K3): Toprağın Kalbi", ["YAN-13", "YER-23"], kadDenetim("sorya", 3), "Sorya'nın onuncu kademe finali; kalkışta peksimet.",
  { kat: "hikaye", bekle: "Karakter finali.", nasil: kadNasil("Sorya", 3), ilerleme: kadIlerleme("sorya", 3) });
G("YAN-31", "Kaelon Vex-Tar (K3): Ateş ve İsim", ["YAN-14", "YER-28"], kadDenetim("kaelon", 3), "Kaelon'un onuncu kademe finali.",
  { kat: "hikaye", bekle: "Karakter finali.", nasil: kadNasil("Kaelon", 3), ilerleme: kadIlerleme("kaelon", 3) });
G("YAN-32", "Dr. Lyris Mar-Axira (K3): İki Dünyanın Şifası", ["YAN-15", "YAN-21"], kadDenetim("lyris", 3), "Lyris'in onuncu kademe finali.",
  { kat: "hikaye", bekle: "Karakter finali.", nasil: kadNasil("Lyris", 3), ilerleme: kadIlerleme("lyris", 3) });
G("YAN-33", "Zarek Sol-Zhaor (K3): Altı Yıldızın Sırrı", ["YAN-16", "YER-30"], kadDenetim("zarek", 3), "Zarek'in onuncu kademe finali.",
  { kat: "hikaye", bekle: "Karakter finali.", nasil: kadNasil("Zarek", 3), ilerleme: kadIlerleme("zarek", 3) });
G("YAN-34", "Usta Veysel (K3): Ocağın Son Sırrı", ["YAN-17", "YER-26"], kadDenetim("veysel", 3), "Veysel'in onuncu kademe finali; kamarada moral iki katı.",
  { kat: "hikaye", bekle: "Karakter finali.", nasil: kadNasil("Usta Veysel", 3), ilerleme: kadIlerleme("veysel", 3) });
G("YAN-35", "Altı Yıldızın Büyük Hizalanması", ["YER-14"], (d) => !!(d.festival && d.festival.son && d.festival.son.alti_yildiz), "Oyunun en büyük kültürel kutlaması.",
  { kat: "aile", bekle: "Hazır olunca tetiklersin.", nasil: "Festivaller menüsünde Altı Yıldızın Büyük Hizalanması'nı başlat (yılın son mevsiminde)." });

// ================= EVRE 4 =================
G("ANA-13", "Orta Hat Gezegenleri ve YGK Akademisi Köprüsü", ["ANA-12"], (d) => B(d, "ygkKayit"),
  "YGK feneri, Tonoflenya'ya sıçrama ve akademi kaydı.",
  { bekle: "Kendi hızında.", nasil: "Gözcü Tepesi'nde YGK frekansını kilitle, YGK feneriyle sıçra, kabulde kaydol." });
G("ANA-14", "Büyük İttifak ve Evren İtibarı Sınavı", ["ANA-13"], (d) => itibarKademesi(d) >= 2,
  "Evren itibarı üçüncü kademe: ticaret kapıları ve Tonoflenya ön şartları.",
  { bekle: "Tonoflenya'ya gitmek istemeyen koloniye dönebilir.", nasil: "İtibarı 5000'e çıkar." });
G("ANA-15", "Tonoflenya'ya İlk Yolculuk", ["ANA-14"], (d) => B(d, "tonoflenyaGoruldu"),
  "Tonoflenya: YGK katları, halkalar, atlas.",
  { bekle: "Tonoflenya kuralları aynen geçerli.", nasil: "YGK feneriyle sıçra." });
G("ANA-16", "Çekirdek Enerji Dengelemesi", ["ANA-15", "YER-31"], (d) => (d.tf && (d.tf.biten || []).length >= 10) || false,
  "Tonoflenya'nın ilk on büyük görevi: yeraltı enerjisi ile reaktör senkronu. Evre 5.",
  { bekle: "Final öncesi ana adım.", nasil: "Tonoflenya büyük görevlerinden onunu bitir.", ilerleme: (d) => Math.min(1, ((d.tf && d.tf.biten) || []).length / 10) });
G("YER-31", "Kat 30 Asansörü ve Derin Karakol", ["YER-21", "YER-28"], (d) => karakol(d, "kat30"),
  "Kat 30 karakolu; Kat 31-40 çekirdek katları.",
  { kat: "maden", uyari: "Bu görevi tamamlarsan en tehlikeli katlar açılır: Kat 31-40. Akrep eşliği ya da üçüncü kademe donanım önerilir.",
    bekle: "Hazır değilsen Kat 21-30'da kal.", nasil: "Kat 30 durağında karakol kur." });
G("YER-32", "Atmosphere-X ve Akrep Saha Entegrasyonu", ["YER-31"], (d) => eslik(d, "akrep") || eslik(d, "atmosphere_x"),
  "Akrep pusuyu sezer ve fazladan ürün; Atmosphere-X keşif ve tahliye.",
  { kat: "imalat", bekle: "Araçların zirve kullanımı.", nasil: "Akrep ya da Atmosphere-X'i maden asansöründe eşliğe seç." });
G("YER-33", "Kültürlerarası Şölen Salonu", ["YER-26", "YER-23"], (d) => ((d.yer && d.yer.binalar) || []).length >= 10,
  "Yerleşimin on binası ayakta: on altı kişinin aynı anda toplandığı meydan ve şölen.",
  { kat: "insa", bekle: "Sosyal zirve.", nasil: "Yerleşim binalarından en az onunu kur.", ilerleme: (d) => Math.min(1, ((d.yer && d.yer.binalar) || []).length / 10) });
G("YER-34", "Koloni Arşivi: Tüm 4 Seti Tamamla", ["YER-30", "YER-31"], (d) => B(d, "arsiv_hepsi"),
  "Arşiv yüzde yüz: efsanevi madalya ve Orin indirimi.",
  { kat: "imalat", bekle: "Koleksiyon finali.", nasil: "Dört setin bütün parçalarını bağışla.", ilerleme: (d) => arsivSay(d) / HB.SETLER.length });
G("YER-35", "İlk Genç Çırak'ın Mezuniyeti", ["YER-22", "YAN-25"], ciraKVar,
  "Kolonide doğan ilk çocuk çırak olarak çalışmaya başlar.",
  { kat: "aile", bekle: "Nesil sisteminin meyvesi.", nasil: "Çocuk 42 günlük olunca okuldan çırak olarak çıkar." });
G("YER-36", "Gelişmiş Tıbbi ve Botanik Laboratuvarı", ["YER-20", "YAN-32"], (d) => tesis(d, "kseno_eczane"),
  "Kseno eczanesi: gezegen bitkileri ve Malken otlarından özgün ilaçlar.",
  { kat: "insa", bekle: "Ticaret dengesi korunur.", nasil: "Terminalde Kseno Eczane'yi kur." });
G("YAN-36", "Eski İstasyon Bilinci (Tina)", ["ANA-15", "YER-03"], (d) => katildi(d, "tina"), "Tina koloniye katılır.",
  { kat: "hikaye", bekle: "Bekletilebilir.", nasil: katNasil("Tina", "koşulu Yerleşimciler listesinde.") });
G("YAN-37", "Sürgün Bilgin (Halvar)", ["ANA-15", "YER-13"], (d) => katildi(d, "halvar"), "Halvar koloniye katılır.",
  { kat: "hikaye", bekle: "Bekletilebilir.", nasil: katNasil("Halvar", "koşulu Yerleşimciler listesinde.") });
G("YAN-38", "Gezegen Korucusu (Nerissa)", ["ANA-13", "YER-12"], (d) => katildi(d, "nerissa"), "Nerissa koloniye katılır.",
  { kat: "hikaye", bekle: "Bekletilebilir.", nasil: katNasil("Nerissa", "koşulu Yerleşimciler listesinde.") });
G("YAN-39", "Yıldız Haritacısı (Mateo)", ["ANA-14", "YER-33"], (d) => katildi(d, "mateo") && ((d.yer && d.yer.katilan) || []).length >= 16, "Mateo katılır; on altı kişilik kadro tamam.",
  { kat: "hikaye", bekle: "Bekletilebilir.", nasil: katNasil("Mateo", "koşulu Yerleşimciler listesinde; on altı yerleşimcinin hepsi gerekir."), ilerleme: (d) => Math.min(1, ((d.yer && d.yer.katilan) || []).length / 16) });
G("YAN-40", "Öğretmen Defne (K2-K3): İlk Mezunlar", ["YAN-26", "YER-35"], kadDenetim("defne", 3), "Defne'nin onuncu kademe finali.",
  { kat: "hikaye", bekle: "Karakter finali.", nasil: kadNasil("Defne", 3), ilerleme: kadIlerleme("defne", 3) });
G("YAN-41", "Torvok (K2-K3): Yaşayan Şehir", ["YAN-27", "YER-33"], kadDenetim("torvok", 3), "Torvok'un onuncu kademe finali.",
  { kat: "hikaye", bekle: "Karakter finali.", nasil: kadNasil("Torvok", 3), ilerleme: kadIlerleme("torvok", 3) });
G("YAN-42", "Elara (K2-K3): Dört Mevsimin Tohumu", ["YAN-28", "YER-36"], kadDenetim("elara", 3), "Elara'nın onuncu kademe finali.",
  { kat: "hikaye", bekle: "Karakter finali.", nasil: kadNasil("Elara", 3), ilerleme: kadIlerleme("elara", 3) });
G("YAN-43", "Kaptan Marcus (K3): Son Nöbet, İlk Barış", ["YAN-29", "YER-31"], kadDenetim("marcus", 3), "Marcus'un onuncu kademe finali.",
  { kat: "hikaye", bekle: "Karakter finali.", nasil: kadNasil("Marcus", 3), ilerleme: kadIlerleme("marcus", 3) });
G("YAN-44", "Sira-Vel (K1-K3): Kıyıların Şifası", ["YAN-21", "YER-36"], kadDenetim("siravel", 3), "Sira-Vel'in onuncu kademe finali; hamam stresi sıfırlar.",
  { kat: "hikaye", bekle: "Karakter finali.", nasil: kadNasil("Sira-Vel", 3), ilerleme: kadIlerleme("siravel", 3) });
G("YAN-45", "Brom (K1-K3): Sesin Madeni", ["YAN-22", "YER-31"], kadDenetim("brom", 3), "Brom'un onuncu kademe finali.",
  { kat: "hikaye", bekle: "Karakter finali.", nasil: kadNasil("Brom", 3), ilerleme: kadIlerleme("brom", 3) });
G("YAN-46", "Julian (K1-K3): Altı Mevsimin Şarkısı", ["YAN-23", "YER-33"], kadDenetim("julian", 3), "Julian'ın onuncu kademe finali; taverna morali iki katı.",
  { kat: "hikaye", bekle: "Karakter finali.", nasil: kadNasil("Julian", 3), ilerleme: kadIlerleme("julian", 3) });
G("YAN-47", "Kaptan Orin'in Gizli Rotası", ["YAN-12", "ANA-15"], (d) => !!pz(d).orinGeldi, "Orin'in stoğunda Tonoflenya ve Sis egzotikleri, seyrek Malazar eşyası.",
  { kat: "ticaret", bekle: "Ticaret finali.", nasil: "Tonoflenya'yı gördükten sonra Orin'in haftalık stoğu genişler." });

// ================= EVRE 5 =================
G("ANA-17", "Dış Sınırların Ötesi (Gezegen 13-20 Hattı)", ["ANA-16"], gezegenUst,
  "Son dış gezegenler ve büyük galaktik tehditler.",
  { bekle: "İstediğin zaman uzaya çıkarsın.", nasil: "On üçüncü ile yirminci arasındaki bir gezegenin iniş operasyonunu bitir." });
G("ANA-18", "Tonoflenya Büyük Meclisi", ["ANA-15", "ANA-17"], (d) => tf(d, 17),
  "Tonoflenya'nın büyük diplomasi dönüm noktası (büyük görev 17).",
  { bekle: "Kendi hızında.", nasil: "Tonoflenya büyük görevlerinde on yedinciyi bitir." });
G("ANA-19", "Çekirdek Muhafızı ve Son Savunma", ["ANA-18", "YER-31"], (d) => tf(d, 19),
  "Ana hikâyenin büyük final krizi (büyük görev 19).",
  { uyari: "Bu görev ana hikâyenin büyük final savaşlarını başlatır. Tam hazır olmadan başlatmak zorunda değilsin: önce hamamda dinlen, çantanı ve gemini hazırla.",
    bekle: "Tam hazır olmadan başlatmak zorunda değilsin.", nasil: "Tonoflenya büyük görevlerinde on dokuzuncuyu bitir." });
G("ANA-20", "Yeni Bir Çağ: Sonsuz Koloni", ["ANA-19"], (d) => tf(d, 20) || B(d, "kopruBarisi"),
  "Ana hikâye biter; koloni yaşamı sürer.",
  { bekle: "Ana hikâye bitse de koloni yaşamı bitmez.", nasil: "Yirminci büyük görevi bitir." });
G("YER-37", "Maden Kat 40: Çekirdek Odası", ["YER-31", "YER-32"], (d) => durak(d, 40),
  "Madenin en alt katı: çekirdek kristali.",
  { kat: "maden", bekle: "Madencilik zirvesi.", nasil: "Merdivenle Kat 40'a in." });
G("YER-38", "Kendi Kendine Yeten Ekosistem Sertifikası", ["YER-34", "YER-35"], null,
  "Koloni dışarıdan temel kaynak almadan nesillerce yaşayabilir.",
  { kat: "insa", bekle: "Koloni zirvesi.", nasil: "Ön şartları bitirince kendiliğinden verilir." });
G("YER-39", "Altın Aletler", ["YER-37", "YER-28"], (d) => ["kazma", "balta", "fener", "olta", "canta"].every((a) => alet(d, a) >= 3),
  "Beş alette üçüncü kademe ustalık.",
  { kat: "imalat", bekle: "Zanaat zirvesi.", nasil: "Kazma, balta, fener, olta ve çantayı üçüncü kademeye yükselt.", ilerleme: (d) => ["kazma", "balta", "fener", "olta", "canta"].filter((a) => alet(d, a) >= 3).length / 5 });
G("YER-40", "Koloni Anıtı ve Nesil Kitabesi", ["YER-38", "ANA-20"], null,
  "Kurucuların ve kolonide doğan çocukların adlarını okuyan anıt (görev kartından dinlenir).",
  { kat: "insa", bekle: "Duygusal final.", nasil: "Ön şartları bitirince kendiliğinden verilir; kartta Kitabeyi dinle." });
G("YAN-48", "Tina (K1-K3): Sessiz Devreler", ["YAN-36", "YER-37"], kadDenetim("tina", 3), "Tina'nın onuncu kademe finali; üretim ×1,1.",
  { kat: "hikaye", bekle: "İsteğe bağlı.", nasil: kadNasil("Tina", 3), ilerleme: kadIlerleme("tina", 3) });
G("YAN-49", "Halvar (K1-K3): Sürgünün Defteri", ["YAN-37", "YER-34"], kadDenetim("halvar", 3), "Halvar'ın onuncu kademe finali.",
  { kat: "hikaye", bekle: "İsteğe bağlı.", nasil: kadNasil("Halvar", 3), ilerleme: kadIlerleme("halvar", 3) });
G("YAN-50", "Nerissa (K1-K3): Vahşi Dostluk", ["YAN-38", "YER-27"], kadDenetim("nerissa", 3), "Nerissa'nın onuncu kademe finali.",
  { kat: "hikaye", bekle: "İsteğe bağlı.", nasil: kadNasil("Nerissa", 3), ilerleme: kadIlerleme("nerissa", 3) });
G("YAN-51", "Mateo (K1-K3): Son Koordinat", ["YAN-39", "ANA-20"], kadDenetim("mateo", 3), "Mateo'nun onuncu kademe finali.",
  { kat: "hikaye", bekle: "İsteğe bağlı.", nasil: kadNasil("Mateo", 3), ilerleme: kadIlerleme("mateo", 3) });
G("YAN-52", "Usta Balıkçı ve Deniz Efsanesi", ["YAN-07", "YER-28"], (d) => balikSay(d) >= BALIKLAR.length,
  "Sazan, göl balığı, yılan balığı, yengeç, kseno-et ve nadir av: hepsi.",
  { kat: "ticaret", bekle: "Hobi ustalığı.", nasil: "Sığ kıyı, termal akıntı, kayalık koy ve jeotermal gölde avlan.", ilerleme: (d) => balikSay(d) / BALIKLAR.length });
G("YAN-53", "Usta Aşçı: Dünya ve Malken Sofrası", ["YER-07", "YAN-34"], (d) => asciSay(d) >= ashaneTarifleri().length,
  "Aşhanenin bütün tariflerini en az bir kez pişir.",
  { kat: "ticaret", bekle: "Hobi ustalığı.", nasil: "Aşhanedeki her tarifi bir kez üret.", ilerleme: (d) => asciSay(d) / Math.max(1, ashaneTarifleri().length) });
G("YAN-54", "Usta Madenci: Kat 40 Yankısı", ["YER-37"], (d) => MADEN_DURAKLARI.every((k) => durak(d, k)),
  "Bütün asansör durakları açık.",
  { kat: "ticaret", bekle: "Hobi ustalığı.", nasil: "Madende her beş katta bir durağı aç.", ilerleme: (d) => MADEN_DURAKLARI.filter((k) => durak(d, k)).length / MADEN_DURAKLARI.length });
G("YAN-55", "Altı Festivalin Hamisi", ["YER-35"], (d) => festivalSay(d) >= 6,
  "Dört Malken ve iki Dünya festivalinin hepsi en az bir kez.",
  { kat: "aile", bekle: "Kültür ustalığı.", nasil: "Festivaller menüsünden altı festivali de birer kez kutla.", ilerleme: (d) => Math.min(1, festivalSay(d) / 6) });

// --- Sekmeler ve alt filtreler (Paket 7 2.1) ---
export const SEKMELER = {
  ana: { ad: "Ana görevler", filtreler: [] },
  yer: { ad: "Yerleşim görevleri", filtreler: [["insa", "Koloni inşa ve sosyal binalar"], ["maden", "Maden ve yeraltı karakolları"], ["kiyi", "İç deniz kıyısı ve doğal kaynaklar"], ["imalat", "Günlük imalat, araçlar ve arşiv"]] },
  yan: { ad: "Yan görevler", filtreler: [["hikaye", "Yerleşimci hikâyeleri"], ["aile", "Aile, nesil ve kültür"], ["ticaret", "Ticaret, ilan panosu ve hobi ustalığı"]] },
};
const SEKME_TURU = { ana: "ANA", yer: "YER", yan: "YAN" };
const TUR_ADI = { ANA: "Ana", YER: "Yerleşim", YAN: "Yan" };

// --- Durum ---
export function agi(d) {
  if (!d.gorevAgi) d.gorevAgi = { biten: {}, ertelenen: {}, uyarildi: {}, son: [], sonSn: -1e9 };
  const a = d.gorevAgi;
  for (const k of ["biten", "ertelenen", "uyarildi"]) if (!a[k]) a[k] = {};
  if (!a.son) a.son = [];
  return a;
}
export const bittiMi = (d, kod) => !!agi(d).biten[kod];
// "YER-11|YER-12": ikisinden biri yeter
const onTamam = (d, on) => on.split("|").some((k) => bittiMi(d, k));
export const onlarTamam = (d, g) => g.on.every((o) => onTamam(d, o));
export function durum(d, kod) {
  const g = GOREVLER[kod];
  if (bittiMi(d, kod)) return "tamam";
  if (!onlarTamam(d, g)) return "kilitli";
  if (agi(d).ertelenen[kod]) return "ertelendi";
  const il = g.ilerleme ? g.ilerleme(d) : 0;
  return il > 0 && il < 1 ? "aktif" : "hazir";
}
export function durumMetni(d, kod) {
  const s = durum(d, kod);
  if (s === "aktif") return "Aktif, ilerleme yüzde " + Math.round(GOREVLER[kod].ilerleme(d) * 100);
  return { tamam: "Tamamlandı", kilitli: "Kilitli, ön şart eksik", ertelendi: "Ertelendi", hazir: "Hazır" }[s];
}
const kodAdi = (kod) => kod + " " + GOREVLER[kod].ad;
export function onSartMetni(d, kod) {
  const g = GOREVLER[kod];
  if (!g.on.length) return "Ön şart yok.";
  return "Ön şart: " + g.on.map((o) => o.split("|").map((k) => k + (bittiMi(d, k) ? " tamam" : " eksik")).join(" ya da ")).join("; ") + ".";
}
export function kartMetni(d, kod) {
  const g = GOREVLER[kod];
  const l = [TUR_ADI[g.tur] + " " + kodAdi(kod) + ".", "Durum: " + durumMetni(d, kod) + ".", onSartMetni(d, kod), "Tamamlarsan açılacaklar: " + g.acar];
  if (g.uyari) l.push("Uyarı: " + g.uyari);
  if (g.bekle) l.push("Bekletirsen: " + g.bekle);
  return l.join(" ");
}
// Bir görevin bitmesiyle hazır hâle gelenler
function acilanlar(d, kod) {
  return SIRA.filter((k) => !bittiMi(d, k) && GOREVLER[k].on.some((o) => o.split("|").includes(kod)) && onlarTamam(d, GOREVLER[k]));
}

// --- İlerleme (gorevler.zamanIlerle; 3 yıldız saniyede bir) ---
export function gorevAgiIlerle(d, zorla) {
  const ilk = !d.gorevAgi;
  const a = agi(d);
  const sn = (d.zaman && d.zaman.sn) || 0;
  if (!zorla && !ilk && Math.abs(sn - a.sonSn) < 3) return [];
  a.sonSn = sn;
  const yeni = [];
  let degisti = true;
  while (degisti) {
    degisti = false;
    for (const kod of SIRA) {
      if (a.biten[kod]) continue;
      const g = GOREVLER[kod];
      if (!onlarTamam(d, g)) continue;
      let ok = false;
      try {
        ok = g.denetim ? !!g.denetim(d) : true;
      } catch (e) {
        ok = false;
      }
      if (ok) {
        a.biten[kod] = Z.gun(d);
        delete a.ertelenen[kod];
        yeni.push(kod);
        degisti = true;
      }
    }
  }
  // Yeni hazır olan uyarılı görevler (Paket 7 4.2): bir kez sesli uyarı
  const uyar = SIRA.filter((k) => GOREVLER[k].uyari && !a.uyarildi[k] && !a.biten[k] && onlarTamam(d, GOREVLER[k]));
  for (const k of uyar) a.uyarildi[k] = true;
  if (ilk) {
    // Eski kayıt ya da yeni oyun: zaten yapılmış olanlar sessizce işaretlenir
    for (const k of SIRA) if (a.biten[k] || onlarTamam(d, GOREVLER[k])) a.uyarildi[k] = true;
    return [];
  }
  const olaylar = [];
  if (yeni.length) {
    a.son = [...yeni.slice().reverse(), ...a.son].slice(0, 10);
    const ac = [...new Set(yeni.flatMap((k) => acilanlar(d, k)))];
    const m =
      "Görev tamamlandı: " + yeni.map(kodAdi).join("; ") + "." +
      (ac.length ? " Açılan görevler: " + ac.map(kodAdi).join("; ") + "." : "");
    olaylar.push({ tur: "gorevTamam", metin: m });
  }
  for (const k of uyar) olaylar.push({ soz: "Görev terminali, " + kodAdi(k) + " hazır. " + GOREVLER[k].uyari });
  return olaylar;
}

// --- Menüler (ağaç) ---
export function ertele(d, kod) {
  const a = agi(d);
  if (a.ertelenen[kod]) {
    delete a.ertelenen[kod];
    return { metin: kodAdi(kod) + " yeniden hazır listesinde." };
  }
  a.ertelenen[kod] = true;
  return { metin: kodAdi(kod) + " ertelendi. Hazır görevler listesinde görünmez; dilediğin zaman geri alabilirsin. Ertelemek hiçbir şeyi bozmaz." };
}
function kitabeMetni(d) {
  const adlar = ((d.yer && d.yer.katilan) || []).map((id) => (YERLESIMCILER[id] ? YERLESIMCILER[id].ad : id));
  const cocuklar = (aile(d).cocuklar || []).map((c) => c.ad);
  return "Koloni anıtı. Kurucular: " + adlar.join(", ") + "." + (cocuklar.length ? " Burada doğanlar: " + cocuklar.join(", ") + "." : " Kitabenin altında yeni nesiller için boş satırlar var.");
}
function gorevKarti(d, kod) {
  const g = GOREVLER[kod];
  const s = durum(d, kod);
  const ogeler = [
    { id: "durum", etiket: "Durum: " + durumMetni(d, kod) + "." },
    { id: "on", etiket: onSartMetni(d, kod) },
    { id: "acar", etiket: "Tamamlarsan açılacaklar: " + g.acar },
  ];
  if (g.uyari) ogeler.push({ id: "uyari", etiket: "Uyarı: " + g.uyari });
  if (g.bekle) ogeler.push({ id: "bekle", etiket: "Bekletirsen: " + g.bekle });
  if (g.nasil && s !== "tamam") ogeler.push({ id: "nasil", etiket: "Nasıl yapılır: " + g.nasil });
  if (s === "hazir" || s === "aktif" || s === "ertelendi")
    ogeler.push({ id: "ertele", etiket: s === "ertelendi" ? "Ertelemeyi kaldır" : "Ertele", yap: (x) => ertele(x, kod) });
  if (s === "tamam") {
    ogeler.push({ id: "gun", etiket: "Tamamlandığı gün: " + agi(d).biten[kod] + "." });
    if (kod === "YER-40") ogeler.push({ id: "kitabe", etiket: "Kitabeyi dinle", yap: (x) => ({ metin: kitabeMetni(x) }) });
  }
  const ac = SIRA.filter((k) => GOREVLER[k].on.some((o) => o.split("|").includes(kod)));
  if (ac.length) ogeler.push({ id: "sonraki", etiket: "Bunu bekleyen görevler: " + ac.map(kodAdi).join("; ") + "." });
  return { baslik: TUR_ADI[g.tur] + " " + kod, giris: kartMetni(d, kod), ogeler };
}
function gorevOgesi(d, kod) {
  const g = GOREVLER[kod];
  return {
    id: kod,
    etiket: TUR_ADI[g.tur] + " " + kodAdi(kod) + ". " + durumMetni(d, kod) + ".",
    ipucu: onSartMetni(d, kod) + " Tamamlarsan açılacaklar: " + g.acar + (g.uyari ? " Uyarı: " + g.uyari : ""),
    alt: (x) => gorevKarti(x, kod),
  };
}
const sayac = (d, kodlar) => kodlar.filter((k) => bittiMi(d, k)).length + " / " + kodlar.length;
export function hazirlar(d) {
  return SIRA.filter((k) => ["hazir", "aktif"].includes(durum(d, k)));
}
// Hazır görevler: ana, yerleşim, yan sırasıyla
function hazirMenu(d) {
  const l = hazirlar(d);
  return {
    baslik: "Hazır görevler",
    giris: l.length ? l.length + " görev şimdi yapılabilir. Ertelediklerin burada görünmez." : "Şu an hazır görev yok; ertelediklerine bak.",
    ogeler: l.map((k) => gorevOgesi(d, k)),
  };
}
export function sekmeMenu(d, sekme, filtreNo = 0) {
  const sk = SEKMELER[sekme];
  const tur = SEKME_TURU[sekme];
  const filtreler = [[null, "Tümü"], ...sk.filtreler];
  const fn = ((filtreNo % filtreler.length) + filtreler.length) % filtreler.length;
  const [fid, fad] = filtreler[fn];
  const kodlar = SIRA.filter((k) => GOREVLER[k].tur === tur && (!fid || GOREVLER[k].kat === fid));
  const ikiParmak = sk.filtreler.length
    ? { sag: (x) => sekmeMenu(x, sekme, fn + 1), sol: (x) => sekmeMenu(x, sekme, fn - 1), ses: "el_sayfa" }
    : null;
  return {
    baslik: sk.ad + (fid ? ": " + fad : ""),
    giris: sk.ad + (sk.filtreler.length ? ", filtre " + fad + ". İki parmakla sağa ya da sola kaydır: sonraki filtre." : ".") + " Tamamlanan " + sayac(d, kodlar) + ".",
    ogeler: kodlar.map((k) => gorevOgesi(d, k)),
    ikiParmak,
  };
}
export function gorevMenu(d) {
  gorevAgiIlerle(d, true);
  const a = agi(d);
  const tur = (t) => SIRA.filter((k) => GOREVLER[k].tur === t);
  const ert = SIRA.filter((k) => durum(d, k) === "ertelendi");
  const ogeler = [
    { id: "hazir", etiket: "Hazır görevler: " + hazirlar(d).length, ipucu: "Ön şartı tamam, şimdi yapılabilecekler.", alt: (x) => hazirMenu(x) },
    { id: "ana", etiket: "Ana görevler, " + sayac(d, tur("ANA")) + " tamam", alt: (x) => sekmeMenu(x, "ana") },
    { id: "yer", etiket: "Yerleşim görevleri, " + sayac(d, tur("YER")) + " tamam", ipucu: "Dört alt filtre; iki parmakla sağa sola.", alt: (x) => sekmeMenu(x, "yer") },
    { id: "yan", etiket: "Yan görevler, " + sayac(d, tur("YAN")) + " tamam", ipucu: "Üç alt filtre; iki parmakla sağa sola.", alt: (x) => sekmeMenu(x, "yan") },
  ];
  if (ert.length) ogeler.push({ id: "ertelenen", etiket: "Ertelenenler: " + ert.length, alt: (x) => ({ baslik: "Ertelenenler", giris: ert.length + " görev ertelendi.", ogeler: ert.map((k) => gorevOgesi(x, k)) }) });
  if (a.son.length) ogeler.push({ id: "son", etiket: "Son tamamlananlar", alt: (x) => ({ baslik: "Son tamamlananlar", giris: "En yeni önce.", ogeler: agi(x).son.map((k) => gorevOgesi(x, k)) }) });
  return {
    baslik: "Görev terminali",
    giris: "Görev terminali. " + Object.keys(a.biten).length + " / " + SIRA.length + " görev tamamlandı. Hiçbir görev ötekini kilitlemez; ertelemek bir şeyi bozmaz.",
    ogeler,
  };
}
export function ekEylemler(d, id) {
  if (id === "terminal" || id === "meydan_terminali") return [{ id: "ga_gorevler", etiket: "Görev terminali", ipucu: "115 görevin ön şartları ve açacakları." }];
  return [];
}
export const ekEylemMi = (e) => e === "ga_gorevler";
export function eylemUygula(d) {
  return { agac: (x) => gorevMenu(x) };
}
