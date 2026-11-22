// Savaş sesleri (3.9, Murat: "yaratık, gemi, kişi, boss ... ilk gelişleri, saldırıları, hasar aldıklarında
// alınan hasara göre, yetenekleri, ölümleri; silahların hasarları, kalkana vuruş, her türden ses").
// Bağımlılıksız: savas.js olaylara "sesler" alanı ekler, ekran (Yuzey.js) efektler.js'ten çalar.
// Dosyalar assets/ses/savas/s_<ad>.mp3: düşman aileleri ElevenLabs (sfx v3), silah atışları ve vuruşları
// Bahtiyar'ın Drive arşivi (Efektler 4 "Bilim Kurgu Silahı Blaster Lazer Patlaması Zap", "Geleceğin Silah
// Kalkanı" ve öteki Efektler klasörleri).

// Her düşman türünün ses ailesi
export const AILE = {
  // Uzay
  korsan_avci: 'korsan',
  korsan_korvet: 'korsan',
  agir_maden_korsani: 'korsan',
  yabanci_firkateyn: 'yabanci',
  dron_tasiyici: 'dron',
  saldiri_dronu: 'dron',
  golge_dronu: 'dron',
  golge_kanat: 'golgesuru',
  golge_gemisi: 'golgegemi',
  kahergonat_zirhlisi: 'kahergonat',
  // Kara
  sulfur_akrebi: 'akrep',
  yuva_ana_akrebi: 'akrep',
  magma_akrebi: 'akrep',
  kristal_akrep: 'akrep',
  cam_akrebi: 'akrep',
  kadim_otomat: 'otomat',
  vanguard_otomati: 'otomat',
  haydut_cetesi: 'insan',
  yagmaci_oncusu: 'insan',
  yagmaci_lideri: 'insan',
  sinir_muhafizi: 'insan',
  tarikat_muhafizi: 'tarikat',
  simya_muhafizi: 'tarikat',
  golge_muhafizi: 'tarikat',
  biyom_yaratigi: 'canavar',
  galeri_cagirani: 'canavar',
  sis_canavari: 'canavar',
  bataklik_pusucusu: 'canavar',
  mantar_pusucusu: 'spor',
  kriyo_yaratigi: 'kriyo',
  kriyo_pusucusu: 'kriyo',
  vaha_solucani: 'solucan',
  dev_kor_solucan: 'solucan',
  kseno_avci: 'ucan',
  yildiz_paraziti: 'ucan',
  kum_kertenkelesi: 'surungen',
  ses_illuzyonu: 'illuzyon',
  yavru: 'yavru',
  abyssus_yaratigi: 'abis',
  // Bosslar
  xarathia: 'xarathia',
  lord_sharon: 'sharon',
  cahelon: 'cahelon',
};

// Aşama geçişi sesi olan bosslar
const FAZLI = new Set(['kahergonat', 'xarathia', 'sharon', 'cahelon']);
// Ağır hasar ve yetenek sesi olmayan küçük aileler (hafif hasar ve geliş sesine düşer)
const KUCUK = new Set(['yavru', 'abis']);
// Drone ailesinin ağır hasarı yok: küçük gövde tek darbede düşer
const AGIRSIZ = new Set(['dron']);

// Yer değiştirme ve kaçış: ailenin hareket sesi
const HAREKET = {
  korsan: 's_korsan_yetenek',
  yabanci: 's_korsan_yetenek',
  dron: 's_dron_yetenek',
  golgesuru: 's_golgesuru_gelis',
  golgegemi: 's_golgegemi_yetenek',
  kahergonat: 's_korsan_yetenek',
  insan: 's_insan_yetenek',
  surungen: 's_surungen_yetenek',
  illuzyon: 's_illuzyon_yetenek',
  canavar: 's_surungen_yetenek',
  ucan: 's_ucan_yetenek',
  solucan: 's_solucan_gelis',
};

// Düşmanın silahı ateşlendiği ya da darbe indiği an
export const ATIS_SESI = {
  plazma: 's_atis_plazma',
  torpido: 's_atis_torpido',
  iyon: 's_atis_iyon',
  agir_plazma: 's_atis_agir_plazma',
  isi_dalgasi: 's_atis_isi',
  sonik_dalga: 's_atis_sonik',
  pence: 's_atis_pence',
  tukuruk: 's_akrep_yetenek',
  lazer: 's_atis_lazer',
  mermi: 's_atis_mermi',
  golge_oku: 's_atis_golge_oku',
  kilic: 's_atis_kilic',
};

export function aile(tur) {
  if (!tur) return null;
  return AILE[tur] || (/korsan/.test(tur) ? 'korsan' : /akrep/.test(tur) ? 'akrep' : null);
}

// olay: gelis | hasar1 | hasar2 | yetenek | olum | faz | hareket
export function dusmanSesi(tur, olay) {
  const a = aile(tur);
  if (!a) return null;
  if (olay === 'hareket') return HAREKET[a] || null;
  if (olay === 'faz') return FAZLI.has(a) ? 's_' + a + '_faz' : 's_' + a + (KUCUK.has(a) ? '_gelis' : '_yetenek');
  if (olay === 'hasar2' && (KUCUK.has(a) || AGIRSIZ.has(a))) olay = 'hasar1';
  if (olay === 'yetenek' && KUCUK.has(a)) olay = 'gelis';
  return 's_' + a + '_' + olay;
}

// Uyarı (telegraf) anında silahın yerine ailenin kendi saldırı hazırlığı duyulsun diye
export function uyariSesi(tur, silah, varsayilan) {
  const a = aile(tur);
  if (a === 'kahergonat') return 's_kahergonat_yetenek';
  if (a === 'xarathia' && silah === 'isi_dalgasi') return 's_xarathia_yetenek';
  if (a === 'cahelon' && silah === 'sonik_dalga') return 's_cahelon_yetenek';
  if (a === 'otomat' && silah === 'lazer') return 's_otomat_yetenek';
  if (a === 'ucan' && silah === 'pence') return 's_ucan_yetenek';
  if (a === 'solucan' && silah === 'sonik_dalga') return 's_solucan_yetenek';
  if (a === 'spor' && silah === 'tukuruk') return 's_spor_yetenek';
  if (a === 'kriyo') return 's_kriyo_yetenek';
  if (a === 'tarikat' && silah === 'golge_oku') return 's_tarikat_yetenek';
  if (a === 'sharon' && silah === 'kilic') return 's_sharon_gelis';
  if (a === 'illuzyon') return 's_illuzyon_yetenek';
  return varsayilan;
}

// Düşmana vurulan hasarın ağırlığı: gövdenin dörtte biri ya da can üçte birin altına indiyse ağır
export function hasarAgir(h, govde, max) {
  if (!max) return false;
  return h >= max * 0.25 || govde / max < 0.33;
}

// Ekranın savaş başında belleğe alacağı sesler
export function savasSesListesi(turler, kara) {
  const l = new Set(['s_zafer', 's_yenilgi', 's_iska', 's_dusman_kalkan', kara ? 's_alarm_kara' : 's_alarm_uzay', kara ? 's_siper_vurus' : 's_kalkan_vurus', kara ? 's_isabet_zirh' : 's_isabet_govde', kara ? 's_oyuncu_tufek' : 's_oyuncu_lazer', 's_kalkan_kirildi', 's_kalkan_acilis', 's_atis_torpido']);
  for (const t of turler) for (const o of ['gelis', 'hasar1', 'hasar2', 'yetenek', 'olum', 'faz', 'hareket']) {
    const s = dusmanSesi(t, o);
    if (s) l.add(s);
  }
  for (const k of Object.values(ATIS_SESI)) l.add(k);
  return [...l];
}
