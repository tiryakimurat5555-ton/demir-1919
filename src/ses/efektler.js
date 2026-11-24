// Ortam sesleri ve efektler. Bütün sesler uygulamanın içindedir (internet gerekmez).
// Kaynak: Bahtiyar'ın Google Drive'ındaki Efektler klasörü (ortam döngüleri ve kısa efektler);
// döngüler çapraz geçişle kesintisiz yapıldı. Hangi dosyadan geldikleri CLAUDE.md'de.
// tik.wav Kayıp Okyanus'tan. Ses dosyası olmayan adlar (secim, dip) titreşimle karşılanır.
import { createAudioPlayer, setAudioModeAsync, setIsAudioActiveAsync } from 'expo-audio';
import * as Haptics from 'expo-haptics';

const KAYNAKLAR = {
  tik: require('../../assets/ses/tik.wav'),
  sessiz: require('../../assets/ses/sessiz.wav'),
  ortam_yuzey: require('../../assets/ses/ortam_yuzey.wav'),
  // Vadi-i Sukût'un ortamı (Murat, 21 Kasım: telefondan gönderdiği kayıt; 5 dakikalık kesintisiz döngü)
  ortam_vadi: require('../../assets/ses/ortam_vadi.mp3'),
  // Merkez terminalinin ortamı (Murat, 21 Kasım: telefondan gönderdiği kayıt; 5 dakikalık döngü)
  ortam_terminal: require('../../assets/ses/ortam_terminal.mp3'),
  // Jeotermal tarım alanının ortamı (Murat, 21 Kasım: telefondan gönderdiği kayıt; 5 dakikalık döngü)
  ortam_tarim: require('../../assets/ses/ortam_tarim.mp3'),
  // Koloni Sera Binası'nın ortamı (Bahtiyar'ın kaydı, 23 Kasım; 3.11)
  ortam_sera: require('../../assets/ses/ortam_sera.mp3'),
  // Kadim Krater'in müziği: Murat'ın gönderdiği kayıt (tarım alanınınkiyle aynı dosya; 21 Kasım 12:58)
  ortam_kapsul: require('../../assets/ses/ortam_kapsul.wav'),
  ortam_harabe: require('../../assets/ses/ortam_harabe.wav'),
  ortam_menu: require('../../assets/ses/ortam_menu.wav'),
  // Giriş melodisi (Murat, 21 Kasım: telefondan gönderdiği ses kaydı); ana menü ve ayarlarda döner
  giris_muzik: require('../../assets/ses/giris_muzik.mp3'),
  bip: require('../../assets/ses/bip.wav'),
  dugme: require('../../assets/ses/dugme.wav'),
  jenerator: require('../../assets/ses/jenerator_calis.wav'),
  kapi: require('../../assets/ses/kapi.wav'),
  red: require('../../assets/ses/reddedildi.wav'),
  sinyal: require('../../assets/ses/sinyal.wav'),
  sonar: require('../../assets/ses/sonar.wav'),
  tislama: require('../../assets/ses/tislama.wav'),
  ortam_sirtlar: require('../../assets/ses/ortam_sirtlar.wav'),
  valf: require('../../assets/ses/valf.wav'),
  sonda: require('../../assets/ses/sonda.wav'),
  patlama: require('../../assets/ses/patlama.wav'),
  telsiz_zil: require('../../assets/ses/telsiz_zil.wav'),
  ortam_plato: require('../../assets/ses/ortam_plato.wav'),
  hidrolik: require('../../assets/ses/hidrolik.wav'),
  kilit: require('../../assets/ses/kilit.wav'),
  // ElevenLabs (1.5): savaş uyarıları, kalkan, keşif zili, deklanşör
  el_plazma_sarj: require('../../assets/ses/el_plazma_sarj.wav'),
  el_torpido: require('../../assets/ses/el_torpido.wav'),
  el_iyon: require('../../assets/ses/el_iyon.wav'),
  el_kalkan: require('../../assets/ses/el_kalkan.wav'),
  el_kesif_zili: require('../../assets/ses/el_kesif_zili.wav'),
  // 2.4: envanter sayfa çevirme ve teçhizat sesleri (ElevenLabs)
  el_sayfa: require('../../assets/ses/el_sayfa.wav'),
  el_tufek: require('../../assets/ses/el_tufek.wav'),
  el_hancer: require('../../assets/ses/el_hancer.wav'),
  el_mizrak: require('../../assets/ses/el_mizrak.wav'),
  el_golge: require('../../assets/ses/el_golge.wav'),
  el_pelerin: require('../../assets/ses/el_pelerin.wav'),
  // 2.5: final görevleri
  el_koro: require('../../assets/ses/el_koro.wav'),
  el_cahelon: require('../../assets/ses/el_cahelon.wav'),
  el_sharon: require('../../assets/ses/el_sharon.wav'),
  el_mancinik: require('../../assets/ses/el_mancinik.wav'),
  // 2.6: yan görevler
  el_canavar: require('../../assets/ses/el_canavar.wav'),
  el_droid: require('../../assets/ses/el_droid.wav'),
  el_kus: require('../../assets/ses/el_kus.wav'),
  // Düğme sesleri (ElevenLabs, 1.18): onay, geri, devam et, yeni oyun
  el_secim: require('../../assets/ses/el_secim.wav'),
  el_geri: require('../../assets/ses/el_geri.wav'),
  // Tarım (ElevenLabs, 2.0; tarim-ve-kseno-botanik bölüm 8): çapa, ekme, vana, hasat, olgunluk zili, melezleme,
  // yatağın durumu (kuru, çürük, sağlıklı) ve kseno-habitat bölmelerinin ortamı
  tarim_capa: require('../../assets/ses/tarim_capa.wav'),
  tarim_ekme: require('../../assets/ses/tarim_ekme.wav'),
  tarim_vana: require('../../assets/ses/tarim_vana.wav'),
  tarim_hasat: require('../../assets/ses/tarim_hasat.wav'),
  tarim_hazir: require('../../assets/ses/tarim_hazir.wav'),
  tarim_melez: require('../../assets/ses/tarim_melez.wav'),
  tarim_kuru: require('../../assets/ses/tarim_kuru.wav'),
  tarim_curuk: require('../../assets/ses/tarim_curuk.wav'),
  tarim_saglikli: require('../../assets/ses/tarim_saglikli.wav'),
  ortam_kubbe: require('../../assets/ses/ortam_kubbe.wav'),
  // Tonoflenya ortamları (ElevenLabs, 2.1): YGK katları, Malkenia'nın altı halkası, saray, Kara Göl, kantonlar, güney
  // havzası, Malazar
  ortam_t_ygk: require('../../assets/ses/t/ortam_t_ygk.mp3'),
  ortam_t_ygk_alt: require('../../assets/ses/t/ortam_t_ygk_alt.mp3'),
  ortam_t_hangar: require('../../assets/ses/t/ortam_t_hangar.mp3'),
  ortam_t_igne: require('../../assets/ses/t/ortam_t_igne.mp3'),
  ortam_t_zhaor: require('../../assets/ses/t/ortam_t_zhaor.mp3'),
  ortam_t_varek: require('../../assets/ses/t/ortam_t_varek.mp3'),
  ortam_t_axira: require('../../assets/ses/t/ortam_t_axira.mp3'),
  ortam_t_sinha: require('../../assets/ses/t/ortam_t_sinha.mp3'),
  ortam_t_uma: require('../../assets/ses/t/ortam_t_uma.mp3'),
  ortam_t_elyndra: require('../../assets/ses/t/ortam_t_elyndra.mp3'),
  ortam_t_tenohris: require('../../assets/ses/t/ortam_t_tenohris.mp3'),
  ortam_t_karagol: require('../../assets/ses/t/ortam_t_karagol.mp3'),
  ortam_t_karagol_berrak: require('../../assets/ses/t/ortam_t_karagol_berrak.mp3'),
  ortam_t_kanton: require('../../assets/ses/t/ortam_t_kanton.mp3'),
  ortam_t_sahil: require('../../assets/ses/t/ortam_t_sahil.mp3'),
  ortam_t_dock: require('../../assets/ses/t/ortam_t_dock.mp3'),
  ortam_t_fenrir: require('../../assets/ses/t/ortam_t_fenrir.mp3'),
  ortam_t_arin: require('../../assets/ses/t/ortam_t_arin.mp3'),
  ortam_t_veradon: require('../../assets/ses/t/ortam_t_veradon.mp3'),
  ortam_t_malazar: require('../../assets/ses/t/ortam_t_malazar.mp3'),
  ortam_t_ocak: require('../../assets/ses/t/ortam_t_ocak.mp3'),
  // Atlasın bölgeleri (ElevenLabs, 2.3)
  ortam_t_okyanus: require('../../assets/ses/t/ortam_t_okyanus.mp3'),
  ortam_t_mormon: require('../../assets/ses/t/ortam_t_mormon.mp3'),
  ortam_t_loran: require('../../assets/ses/t/ortam_t_loran.mp3'),
  ortam_t_liman: require('../../assets/ses/t/ortam_t_liman.mp3'),
  ortam_t_kale: require('../../assets/ses/t/ortam_t_kale.mp3'),
  ortam_t_sanayi: require('../../assets/ses/t/ortam_t_sanayi.mp3'),
  ortam_t_kukurt: require('../../assets/ses/t/ortam_t_kukurt.mp3'),
  ortam_t_col: require('../../assets/ses/t/ortam_t_col.mp3'),
  ortam_t_cam: require('../../assets/ses/t/ortam_t_cam.mp3'),
  ortam_t_kanyon: require('../../assets/ses/t/ortam_t_kanyon.mp3'),
  ortam_t_hardrin: require('../../assets/ses/t/ortam_t_hardrin.mp3'),
  ortam_t_kahergonat: require('../../assets/ses/t/ortam_t_kahergonat.mp3'),
  ortam_t_tundra: require('../../assets/ses/t/ortam_t_tundra.mp3'),
  ortam_t_zeris: require('../../assets/ses/t/ortam_t_zeris.mp3'),
  ortam_t_bataklik: require('../../assets/ses/t/ortam_t_bataklik.mp3'),
  ortam_t_orman: require('../../assets/ses/t/ortam_t_orman.mp3'),
  ortam_t_teras: require('../../assets/ses/t/ortam_t_teras.mp3'),
  ortam_t_koy: require('../../assets/ses/t/ortam_t_koy.mp3'),
  ortam_t_ada: require('../../assets/ses/t/ortam_t_ada.mp3'),
  ortam_t_cember: require('../../assets/ses/t/ortam_t_cember.mp3'),
  ortam_t_girdap: require('../../assets/ses/t/ortam_t_girdap.mp3'),
  el_devam: require('../../assets/ses/el_devam.wav'),
  el_yeni_oyun: require('../../assets/ses/el_yeni_oyun.wav'),
  el_deklansor: require('../../assets/ses/el_deklansor.wav'),
  polimer: require('../../assets/ses/polimer.wav'),
  ortam_uzay: require('../../assets/ses/ortam_uzay.wav'),
  ortam_kokpit: require('../../assets/ses/ortam_kokpit.mp3'),
  ortam_kargo: require('../../assets/ses/ortam_kargo.mp3'),
  ortam_reaktor: require('../../assets/ses/ortam_reaktor.wav'),
  ortam_revir: require('../../assets/ses/ortam_revir.mp3'),
  kapi_gemi: require('../../assets/ses/kapi_gemi.wav'),
  kalkis: require('../../assets/ses/kalkis.wav'),
  kaynak: require('../../assets/ses/kaynak.wav'),
  zincir: require('../../assets/ses/zincir.wav'),
  arayuz: require('../../assets/ses/arayuz.wav'),
  moral_yuksek: require('../../assets/ses/moral_yuksek.wav'),
  moral_dusuk: require('../../assets/ses/moral_dusuk.wav'),
  ortam_dogu: require('../../assets/ses/ortam_dogu.wav'),
  ortam_civa: require('../../assets/ses/ortam_civa.wav'),
  ortam_lav: require('../../assets/ses/ortam_lav.wav'),
  ortam_mantar: require('../../assets/ses/ortam_mantar.wav'),
  ortam_kriyo: require('../../assets/ses/ortam_kriyo.wav'),
  ortam_obsidyen: require('../../assets/ses/ortam_obsidyen.wav'),
  ortam_kuleler: require('../../assets/ses/ortam_kuleler.wav'),
  ortam_vaha: require('../../assets/ses/ortam_vaha.wav'),
  ortam_tunel: require('../../assets/ses/ortam_tunel.wav'),
  statik: require('../../assets/ses/statik.wav'),
  buz_catlak: require('../../assets/ses/buz_catlak.wav'),
  magma: require('../../assets/ses/magma.wav'),
  // İnilebilir gezegenlerin yüzey ortamları (Bahtiyar, 21 Kasım)
  ortam_gez_p01: require('../../assets/ses/gezegen/ortam_gez_p01.mp3'),
  ortam_gez_p02: require('../../assets/ses/gezegen/ortam_gez_p02.mp3'),
  ortam_gez_p03: require('../../assets/ses/gezegen/ortam_gez_p03.mp3'),
  ortam_gez_p04: require('../../assets/ses/gezegen/ortam_gez_p04.mp3'),
  ortam_gez_p05: require('../../assets/ses/gezegen/ortam_gez_p05.mp3'),
  ortam_gez_p06: require('../../assets/ses/gezegen/ortam_gez_p06.mp3'),
  ortam_gez_p07: require('../../assets/ses/gezegen/ortam_gez_p07.mp3'),
  ortam_gez_p08: require('../../assets/ses/gezegen/ortam_gez_p08.mp3'),
  ortam_gez_p09: require('../../assets/ses/gezegen/ortam_gez_p09.mp3'),
  ortam_gez_p10: require('../../assets/ses/gezegen/ortam_gez_p10.mp3'),
  ortam_gez_p11: require('../../assets/ses/gezegen/ortam_gez_p11.mp3'),
  ortam_gez_p12: require('../../assets/ses/gezegen/ortam_gez_p12.mp3'),
  ortam_gez_p13: require('../../assets/ses/gezegen/ortam_gez_p13.mp3'),
  ortam_gez_p14: require('../../assets/ses/gezegen/ortam_gez_p14.mp3'),
  ortam_gez_p15: require('../../assets/ses/gezegen/ortam_gez_p15.mp3'),
  ortam_gez_p16: require('../../assets/ses/gezegen/ortam_gez_p16.mp3'),
  ortam_gez_p17: require('../../assets/ses/gezegen/ortam_gez_p17.mp3'),
  ortam_gez_p18: require('../../assets/ses/gezegen/ortam_gez_p18.mp3'),
  ortam_gez_p19: require('../../assets/ses/gezegen/ortam_gez_p19.mp3'),
  ortam_gez_p20: require('../../assets/ses/gezegen/ortam_gez_p20.mp3'),
  // Yerleşim mekânları (v5 Paket 1, 4.0; ElevenLabs)
  ortam_meydan: require('../../assets/ses/yerlesim/ortam_meydan.mp3'),
  ortam_kamara: require('../../assets/ses/yerlesim/ortam_kamara.mp3'),
  ortam_ashane: require('../../assets/ses/yerlesim/ortam_ashane.mp3'),
  ortam_atolye: require('../../assets/ses/yerlesim/ortam_atolye.mp3'),
  ortam_konut: require('../../assets/ses/yerlesim/ortam_konut.mp3'),
  ortam_kubbe_ev: require('../../assets/ses/yerlesim/ortam_kubbe_ev.mp3'),
  ortam_tapinak: require('../../assets/ses/yerlesim/ortam_tapinak.mp3'),
  ortam_taverna: require('../../assets/ses/yerlesim/ortam_taverna.mp3'),
  ortam_okul: require('../../assets/ses/yerlesim/ortam_okul.mp3'),
  ortam_hamam: require('../../assets/ses/yerlesim/ortam_hamam.mp3'),
  ortam_gozlem: require('../../assets/ses/yerlesim/ortam_gozlem.mp3'),
  // 4.2: festival müzikleri (v5 Paket 3A; Bahtiyar'ın kayıtları), İkmal İskelesi ve pazar efektleri (ElevenLabs)
  festival_alti_yildiz: require('../../assets/ses/festival_alti_yildiz.mp3'),
  festival_varek: require('../../assets/ses/festival_varek.mp3'),
  festival_axira: require('../../assets/ses/festival_axira.mp3'),
  festival_elyndra: require('../../assets/ses/festival_elyndra.mp3'),
  festival_ekmek: require('../../assets/ses/festival_ekmek.mp3'),
  festival_dunya_isigi: require('../../assets/ses/festival_dunya_isigi.mp3'),
  ortam_iskele: require('../../assets/ses/yerlesim/ortam_iskele.mp3'),
  ortam_iskele_gece: require('../../assets/ses/yerlesim/ortam_iskele_gece.mp3'),
  orin_inis: require('../../assets/ses/orin_inis.wav'),
  el_kasa: require('../../assets/ses/el_kasa.wav'),
  el_bas_ton: require('../../assets/ses/el_bas_ton.wav'),
  // 4.4 yerleşim tezgâhları (ElevenLabs)
  el_tz_firin: require('../../assets/ses/el_tz_firin.wav'),
  el_tz_ocak: require('../../assets/ses/el_tz_ocak.wav'),
  el_tz_marangoz: require('../../assets/ses/el_tz_marangoz.wav'),
  el_tz_ors: require('../../assets/ses/el_tz_ors.wav'),
  el_tz_dokuma: require('../../assets/ses/el_tz_dokuma.wav'),
  el_tz_tutsu: require('../../assets/ses/el_tz_tutsu.wav'),
  el_tz_can: require('../../assets/ses/el_tz_can.wav'),
  el_tz_lab: require('../../assets/ses/el_tz_lab.wav'),
  el_tz_yazi: require('../../assets/ses/el_tz_yazi.wav'),
  el_cark: require('../../assets/ses/el_cark.wav'),
  el_illuzyon: require('../../assets/ses/el_illuzyon.wav'),
  // 4.3: Derin Maden Ocağı ve İç Deniz Kıyı Koruluğu (v5 Paket 5, 6, 13; ElevenLabs)
  ortam_maden_ust: require('../../assets/ses/saha/ortam_maden_ust.mp3'),
  // 4.5: barınak, jeotermal göl, arşiv (ElevenLabs) ve hayvan/hobi efektleri
  ortam_barinak: require('../../assets/ses/hayvan/ortam_barinak.mp3'),
  ortam_gol: require('../../assets/ses/hayvan/ortam_gol.mp3'),
  ortam_arsiv: require('../../assets/ses/hayvan/ortam_arsiv.mp3'),
  el_hayvan_ac: require('../../assets/ses/hayvan/el_hayvan_ac.wav'),
  el_hayvan_mutlu: require('../../assets/ses/hayvan/el_hayvan_mutlu.wav'),
  el_hayvan_hasta: require('../../assets/ses/hayvan/el_hayvan_hasta.wav'),
  el_catlama: require('../../assets/ses/hayvan/el_catlama.wav'),
  el_zar: require('../../assets/ses/hayvan/el_zar.wav'),
  // 4.6-4.7: düğün, doğum, görev kilometre taşı
  el_dugun: require('../../assets/ses/aile/el_dugun.wav'),
  el_dogum: require('../../assets/ses/aile/el_dogum.wav'),
  el_gorev: require('../../assets/ses/aile/el_gorev.wav'),
  ortam_maden_orta: require('../../assets/ses/saha/ortam_maden_orta.mp3'),
  ortam_maden_derin: require('../../assets/ses/saha/ortam_maden_derin.mp3'),
  ortam_kiyi: require('../../assets/ses/saha/ortam_kiyi.mp3'),
  kazma_vurus: require('../../assets/ses/saha/kazma_vurus.wav'),
  kaya_kirilma: require('../../assets/ses/saha/kaya_kirilma.wav'),
  balta_vurus: require('../../assets/ses/saha/balta_vurus.wav'),
  agac_devrilme: require('../../assets/ses/saha/agac_devrilme.wav'),
  asansor: require('../../assets/ses/saha/asansor.wav'),
  olta_atis: require('../../assets/ses/saha/olta_atis.wav'),
  balik_slap: require('../../assets/ses/saha/balik_slap.wav'),
  makara: require('../../assets/ses/saha/makara.wav'),
  balik_yakalandi: require('../../assets/ses/saha/balik_yakalandi.wav'),
  misina_kop: require('../../assets/ses/saha/misina_kop.wav'),
  kaynak_belirme: require('../../assets/ses/saha/kaynak_belirme.wav'),
};

// Ortam döngülerinin kendi düzeyleri (konuşmanın altında kalsınlar diye düşük)
const DONGULER = {
  ortam_meydan: 0.55,
  ortam_kamara: 0.55,
  ortam_ashane: 0.55,
  ortam_atolye: 0.55,
  ortam_konut: 0.55,
  ortam_kubbe_ev: 0.55,
  ortam_tapinak: 0.55,
  ortam_taverna: 0.55,
  ortam_okul: 0.55,
  ortam_hamam: 0.55,
  ortam_gozlem: 0.55,
  festival_alti_yildiz: 0.6,
  festival_varek: 0.6,
  festival_axira: 0.6,
  festival_elyndra: 0.6,
  festival_ekmek: 0.6,
  festival_dunya_isigi: 0.6,
  ortam_iskele: 0.55,
  ortam_maden_ust: 0.55,
  ortam_barinak: 0.55,
  ortam_gol: 0.55,
  ortam_arsiv: 0.5,
  ortam_maden_orta: 0.55,
  ortam_maden_derin: 0.55,
  ortam_kiyi: 0.55,
  ortam_iskele_gece: 0.55,
  ortam_yuzey: 0.55,
  ortam_vadi: 0.55,
  ortam_terminal: 0.55,
  ortam_tarim: 0.55,
  ortam_sera: 0.6,
  ortam_kubbe: 0.55,
  ortam_t_ygk: 0.55,
  ortam_t_ygk_alt: 0.55,
  ortam_t_hangar: 0.55,
  ortam_t_igne: 0.55,
  ortam_t_zhaor: 0.55,
  ortam_t_varek: 0.55,
  ortam_t_axira: 0.55,
  ortam_t_sinha: 0.55,
  ortam_t_uma: 0.55,
  ortam_t_elyndra: 0.55,
  ortam_t_tenohris: 0.55,
  ortam_t_karagol: 0.55,
  ortam_t_karagol_berrak: 0.55,
  ortam_t_kanton: 0.55,
  ortam_t_sahil: 0.55,
  ortam_t_dock: 0.55,
  ortam_t_fenrir: 0.6,
  ortam_t_arin: 0.55,
  ortam_t_veradon: 0.55,
  ortam_t_malazar: 0.55,
  ortam_t_ocak: 0.55,
  ortam_t_okyanus: 0.55,
  ortam_t_mormon: 0.55,
  ortam_t_loran: 0.55,
  ortam_t_liman: 0.55,
  ortam_t_kale: 0.55,
  ortam_t_sanayi: 0.55,
  ortam_t_kukurt: 0.55,
  ortam_t_col: 0.55,
  ortam_t_cam: 0.55,
  ortam_t_kanyon: 0.55,
  ortam_t_hardrin: 0.55,
  ortam_t_kahergonat: 0.55,
  ortam_t_tundra: 0.55,
  ortam_t_zeris: 0.55,
  ortam_t_bataklik: 0.6,
  ortam_t_orman: 0.55,
  ortam_t_teras: 0.55,
  ortam_t_koy: 0.55,
  ortam_t_ada: 0.55,
  ortam_t_cember: 0.55,
  ortam_t_girdap: 0.6,
  ortam_krater: 0.55,
  ortam_kapsul: 0.6,
  ortam_harabe: 0.55,
  ortam_menu: 0.45,
  giris_muzik: 0.6,
  ortam_sirtlar: 0.6,
  ortam_plato: 0.6,
  ortam_uzay: 0.55,
  ortam_kokpit: 0.6,
  ortam_kargo: 0.6,
  ortam_reaktor: 0.5,
  ortam_revir: 0.6,
  ortam_dogu: 0.5,
  ortam_civa: 0.55,
  ortam_lav: 0.6,
  ortam_mantar: 0.55,
  ortam_kriyo: 0.5,
  ortam_obsidyen: 0.5,
  ortam_kuleler: 0.55,
  ortam_vaha: 0.55,
  ortam_tunel: 0.6,
  ortam_gez_p01: 0.6,
  ortam_gez_p02: 0.6,
  ortam_gez_p03: 0.6,
  ortam_gez_p04: 0.6,
  ortam_gez_p05: 0.6,
  ortam_gez_p06: 0.6,
  ortam_gez_p07: 0.6,
  ortam_gez_p08: 0.6,
  ortam_gez_p09: 0.6,
  ortam_gez_p10: 0.6,
  ortam_gez_p11: 0.6,
  ortam_gez_p12: 0.6,
  ortam_gez_p13: 0.6,
  ortam_gez_p14: 0.6,
  ortam_gez_p15: 0.6,
  ortam_gez_p16: 0.6,
  ortam_gez_p17: 0.6,
  ortam_gez_p18: 0.6,
  ortam_gez_p19: 0.6,
  ortam_gez_p20: 0.6,
};


// Savaş sesleri (3.9): düşman aileleri, boss aşamaları, silah atışları ve vuruşları. Çok sayıda oynatıcıyı
// açılışta açmamak için tembel: savaş başında (onYukle) ya da ilk çalındığında açılır, savaş bitince bırakılır.
const TEMBEL = {
  // 5.0 büyü sesleri (belgeler/v6): büyüler, şişe, hava, heykel, bulmaca geri bildirimi (ElevenLabs; buz, cam kırılması,
  // patlama ve büyü seçimi Bahtiyar'ın Drive Efektler klasöründen)
  by_aether: require('../../assets/ses/buyu/by_aether.wav'),
  by_agirlik: require('../../assets/ses/buyu/by_agirlik.wav'),
  by_arac: require('../../assets/ses/buyu/by_arac.wav'),
  by_asa_uyanis: require('../../assets/ses/buyu/by_asa_uyanis.wav'),
  by_basari: require('../../assets/ses/buyu/by_basari.wav'),
  by_bitis: require('../../assets/ses/buyu/by_bitis.wav'),
  by_buzul: require('../../assets/ses/buyu/by_buzul.wav'),
  by_devre: require('../../assets/ses/buyu/by_devre.wav'),
  by_dugum: require('../../assets/ses/buyu/by_dugum.wav'),
  by_frekans: require('../../assets/ses/buyu/by_frekans.wav'),
  by_hakikat: require('../../assets/ses/buyu/by_hakikat.wav'),
  by_hava_durgun: require('../../assets/ses/buyu/by_hava_durgun.wav'),
  by_hava_isit: require('../../assets/ses/buyu/by_hava_isit.wav'),
  by_hava_ruzgar: require('../../assets/ses/buyu/by_hava_ruzgar.wav'),
  by_hava_sogut: require('../../assets/ses/buyu/by_hava_sogut.wav'),
  by_hava_yagmur: require('../../assets/ses/buyu/by_hava_yagmur.wav'),
  by_heykel: require('../../assets/ses/buyu/by_heykel.wav'),
  by_hibrit: require('../../assets/ses/buyu/by_hibrit.wav'),
  by_ikiz: require('../../assets/ses/buyu/by_ikiz.wav'),
  by_kalkan: require('../../assets/ses/buyu/by_kalkan.wav'),
  by_kivilcim: require('../../assets/ses/buyu/by_kivilcim.wav'),
  by_kopru: require('../../assets/ses/buyu/by_kopru.wav'),
  by_metal: require('../../assets/ses/buyu/by_metal.wav'),
  by_odak: require('../../assets/ses/buyu/by_odak.wav'),
  by_oz: require('../../assets/ses/buyu/by_oz.wav'),
  by_patlama: require('../../assets/ses/buyu/by_patlama.wav'),
  by_ruzgar: require('../../assets/ses/buyu/by_ruzgar.wav'),
  by_sarmasik: require('../../assets/ses/buyu/by_sarmasik.wav'),
  by_secim: require('../../assets/ses/buyu/by_secim.wav'),
  by_senkron: require('../../assets/ses/buyu/by_senkron.wav'),
  by_sise_kir: require('../../assets/ses/buyu/by_sise_kir.wav'),
  by_sise_salim: require('../../assets/ses/buyu/by_sise_salim.wav'),
  by_sivi: require('../../assets/ses/buyu/by_sivi.wav'),
  by_suzulme: require('../../assets/ses/buyu/by_suzulme.wav'),
  by_tele: require('../../assets/ses/buyu/by_tele.wav'),
  by_toprak: require('../../assets/ses/buyu/by_toprak.wav'),
  by_toz_toplama: require('../../assets/ses/buyu/by_toz_toplama.wav'),
  by_yanki: require('../../assets/ses/buyu/by_yanki.wav'),
  by_yanlis: require('../../assets/ses/buyu/by_yanlis.wav'),
  by_yildirim: require('../../assets/ses/buyu/by_yildirim.wav'),
  by_yildirim_dusur: require('../../assets/ses/buyu/by_yildirim_dusur.wav'),
  by_zihin: require('../../assets/ses/buyu/by_zihin.wav'),
  // 5.1: YGK Akademi bağ ağı imza cümleleri (belgeler/v6 karakter-01 … 23; ElevenLabs eleven_v4)
  imza_yg_tixie_selam: require('../../assets/ses/ygk/imza/tixie_selam.mp3'),
  imza_yg_tixie_tesekkur: require('../../assets/ses/ygk/imza/tixie_tesekkur.mp3'),
  imza_yg_tixie_kizgin: require('../../assets/ses/ygk/imza/tixie_kizgin.mp3'),
  imza_yg_lasiraxi_selam: require('../../assets/ses/ygk/imza/lasiraxi_selam.mp3'),
  imza_yg_lasiraxi_tesekkur: require('../../assets/ses/ygk/imza/lasiraxi_tesekkur.mp3'),
  imza_yg_lasiraxi_kizgin: require('../../assets/ses/ygk/imza/lasiraxi_kizgin.mp3'),
  imza_yg_zynae_selam: require('../../assets/ses/ygk/imza/zynae_selam.mp3'),
  imza_yg_zynae_tesekkur: require('../../assets/ses/ygk/imza/zynae_tesekkur.mp3'),
  imza_yg_zynae_kizgin: require('../../assets/ses/ygk/imza/zynae_kizgin.mp3'),
  imza_yg_sirilla_selam: require('../../assets/ses/ygk/imza/sirilla_selam.mp3'),
  imza_yg_sirilla_tesekkur: require('../../assets/ses/ygk/imza/sirilla_tesekkur.mp3'),
  imza_yg_sirilla_kizgin: require('../../assets/ses/ygk/imza/sirilla_kizgin.mp3'),
  imza_yg_palmi_selam: require('../../assets/ses/ygk/imza/palmi_selam.mp3'),
  imza_yg_palmi_tesekkur: require('../../assets/ses/ygk/imza/palmi_tesekkur.mp3'),
  imza_yg_palmi_kizgin: require('../../assets/ses/ygk/imza/palmi_kizgin.mp3'),
  imza_yg_miranda_selam: require('../../assets/ses/ygk/imza/miranda_selam.mp3'),
  imza_yg_miranda_tesekkur: require('../../assets/ses/ygk/imza/miranda_tesekkur.mp3'),
  imza_yg_miranda_kizgin: require('../../assets/ses/ygk/imza/miranda_kizgin.mp3'),
  imza_yg_corinne_selam: require('../../assets/ses/ygk/imza/corinne_selam.mp3'),
  imza_yg_corinne_tesekkur: require('../../assets/ses/ygk/imza/corinne_tesekkur.mp3'),
  imza_yg_corinne_kizgin: require('../../assets/ses/ygk/imza/corinne_kizgin.mp3'),
  imza_yg_kefius_selam: require('../../assets/ses/ygk/imza/kefius_selam.mp3'),
  imza_yg_kefius_tesekkur: require('../../assets/ses/ygk/imza/kefius_tesekkur.mp3'),
  imza_yg_kefius_kizgin: require('../../assets/ses/ygk/imza/kefius_kizgin.mp3'),
  imza_yg_zephyra_selam: require('../../assets/ses/ygk/imza/zephyra_selam.mp3'),
  imza_yg_zephyra_tesekkur: require('../../assets/ses/ygk/imza/zephyra_tesekkur.mp3'),
  imza_yg_zephyra_kizgin: require('../../assets/ses/ygk/imza/zephyra_kizgin.mp3'),
  imza_yg_valen_selam: require('../../assets/ses/ygk/imza/valen_selam.mp3'),
  imza_yg_valen_tesekkur: require('../../assets/ses/ygk/imza/valen_tesekkur.mp3'),
  imza_yg_valen_kizgin: require('../../assets/ses/ygk/imza/valen_kizgin.mp3'),
  imza_yg_ignador_selam: require('../../assets/ses/ygk/imza/ignador_selam.mp3'),
  imza_yg_ignador_tesekkur: require('../../assets/ses/ygk/imza/ignador_tesekkur.mp3'),
  imza_yg_ignador_kizgin: require('../../assets/ses/ygk/imza/ignador_kizgin.mp3'),
  imza_yg_morwenna_selam: require('../../assets/ses/ygk/imza/morwenna_selam.mp3'),
  imza_yg_morwenna_tesekkur: require('../../assets/ses/ygk/imza/morwenna_tesekkur.mp3'),
  imza_yg_morwenna_kizgin: require('../../assets/ses/ygk/imza/morwenna_kizgin.mp3'),
  imza_yg_forges_selam: require('../../assets/ses/ygk/imza/forges_selam.mp3'),
  imza_yg_forges_tesekkur: require('../../assets/ses/ygk/imza/forges_tesekkur.mp3'),
  imza_yg_forges_kizgin: require('../../assets/ses/ygk/imza/forges_kizgin.mp3'),
  imza_yg_korvinus_selam: require('../../assets/ses/ygk/imza/korvinus_selam.mp3'),
  imza_yg_korvinus_tesekkur: require('../../assets/ses/ygk/imza/korvinus_tesekkur.mp3'),
  imza_yg_korvinus_kizgin: require('../../assets/ses/ygk/imza/korvinus_kizgin.mp3'),
  imza_yg_zeva_selam: require('../../assets/ses/ygk/imza/zeva_selam.mp3'),
  imza_yg_zeva_tesekkur: require('../../assets/ses/ygk/imza/zeva_tesekkur.mp3'),
  imza_yg_zeva_kizgin: require('../../assets/ses/ygk/imza/zeva_kizgin.mp3'),
  imza_yg_kaelis_selam: require('../../assets/ses/ygk/imza/kaelis_selam.mp3'),
  imza_yg_kaelis_tesekkur: require('../../assets/ses/ygk/imza/kaelis_tesekkur.mp3'),
  imza_yg_kaelis_kizgin: require('../../assets/ses/ygk/imza/kaelis_kizgin.mp3'),
  imza_yg_faelan_selam: require('../../assets/ses/ygk/imza/faelan_selam.mp3'),
  imza_yg_faelan_tesekkur: require('../../assets/ses/ygk/imza/faelan_tesekkur.mp3'),
  imza_yg_faelan_kizgin: require('../../assets/ses/ygk/imza/faelan_kizgin.mp3'),
  imza_yg_jolkar_selam: require('../../assets/ses/ygk/imza/jolkar_selam.mp3'),
  imza_yg_jolkar_tesekkur: require('../../assets/ses/ygk/imza/jolkar_tesekkur.mp3'),
  imza_yg_jolkar_kizgin: require('../../assets/ses/ygk/imza/jolkar_kizgin.mp3'),
  imza_yg_caelum_selam: require('../../assets/ses/ygk/imza/caelum_selam.mp3'),
  imza_yg_caelum_tesekkur: require('../../assets/ses/ygk/imza/caelum_tesekkur.mp3'),
  imza_yg_caelum_kizgin: require('../../assets/ses/ygk/imza/caelum_kizgin.mp3'),
  imza_yg_lyra_selam: require('../../assets/ses/ygk/imza/lyra_selam.mp3'),
  imza_yg_lyra_tesekkur: require('../../assets/ses/ygk/imza/lyra_tesekkur.mp3'),
  imza_yg_lyra_kizgin: require('../../assets/ses/ygk/imza/lyra_kizgin.mp3'),
  imza_yg_trellis_selam: require('../../assets/ses/ygk/imza/trellis_selam.mp3'),
  imza_yg_trellis_tesekkur: require('../../assets/ses/ygk/imza/trellis_tesekkur.mp3'),
  imza_yg_trellis_kizgin: require('../../assets/ses/ygk/imza/trellis_kizgin.mp3'),
  imza_yg_seraphine_selam: require('../../assets/ses/ygk/imza/seraphine_selam.mp3'),
  imza_yg_seraphine_tesekkur: require('../../assets/ses/ygk/imza/seraphine_tesekkur.mp3'),
  imza_yg_seraphine_kizgin: require('../../assets/ses/ygk/imza/seraphine_kizgin.mp3'),
  imza_yg_maelis_selam: require('../../assets/ses/ygk/imza/maelis_selam.mp3'),
  imza_yg_maelis_tesekkur: require('../../assets/ses/ygk/imza/maelis_tesekkur.mp3'),
  imza_yg_maelis_kizgin: require('../../assets/ses/ygk/imza/maelis_kizgin.mp3'),
  imza_yg_silas_selam: require('../../assets/ses/ygk/imza/silas_selam.mp3'),
  imza_yg_silas_tesekkur: require('../../assets/ses/ygk/imza/silas_tesekkur.mp3'),
  imza_yg_silas_kizgin: require('../../assets/ses/ygk/imza/silas_kizgin.mp3'),
  imza_yg_puskul_selam: require('../../assets/ses/ygk/imza/puskul_selam.mp3'),
  imza_yg_puskul_tesekkur: require('../../assets/ses/ygk/imza/puskul_tesekkur.mp3'),
  imza_yg_puskul_kizgin: require('../../assets/ses/ygk/imza/puskul_kizgin.mp3'),
  imza_yg_morvenna_selam: require('../../assets/ses/ygk/imza/morvenna_selam.mp3'),
  imza_yg_morvenna_tesekkur: require('../../assets/ses/ygk/imza/morvenna_tesekkur.mp3'),
  imza_yg_morvenna_kizgin: require('../../assets/ses/ygk/imza/morvenna_kizgin.mp3'),
  imza_yg_veyra_selam: require('../../assets/ses/ygk/imza/veyra_selam.mp3'),
  imza_yg_veyra_tesekkur: require('../../assets/ses/ygk/imza/veyra_tesekkur.mp3'),
  imza_yg_veyra_kizgin: require('../../assets/ses/ygk/imza/veyra_kizgin.mp3'),
  imza_yg_dren_selam: require('../../assets/ses/ygk/imza/dren_selam.mp3'),
  imza_yg_dren_tesekkur: require('../../assets/ses/ygk/imza/dren_tesekkur.mp3'),
  imza_yg_dren_kizgin: require('../../assets/ses/ygk/imza/dren_kizgin.mp3'),
  imza_yg_elian_selam: require('../../assets/ses/ygk/imza/elian_selam.mp3'),
  imza_yg_elian_tesekkur: require('../../assets/ses/ygk/imza/elian_tesekkur.mp3'),
  imza_yg_elian_kizgin: require('../../assets/ses/ygk/imza/elian_kizgin.mp3'),
  imza_yg_sora_selam: require('../../assets/ses/ygk/imza/sora_selam.mp3'),
  imza_yg_sora_tesekkur: require('../../assets/ses/ygk/imza/sora_tesekkur.mp3'),
  imza_yg_sora_kizgin: require('../../assets/ses/ygk/imza/sora_kizgin.mp3'),
  imza_yg_nox_selam: require('../../assets/ses/ygk/imza/nox_selam.mp3'),
  imza_yg_nox_tesekkur: require('../../assets/ses/ygk/imza/nox_tesekkur.mp3'),
  imza_yg_nox_kizgin: require('../../assets/ses/ygk/imza/nox_kizgin.mp3'),
  // 5.2: Tonoflenya bölge liderleri ve seçkin subayların imza cümleleri (v6 Paket 6A, 6B, 7)
  imza_yg_oronte_selam: require('../../assets/ses/ygk/imza/oronte_selam.mp3'),
  imza_yg_oronte_tesekkur: require('../../assets/ses/ygk/imza/oronte_tesekkur.mp3'),
  imza_yg_oronte_kizgin: require('../../assets/ses/ygk/imza/oronte_kizgin.mp3'),
  imza_yg_cuce_selam: require('../../assets/ses/ygk/imza/cuce_selam.mp3'),
  imza_yg_cuce_tesekkur: require('../../assets/ses/ygk/imza/cuce_tesekkur.mp3'),
  imza_yg_cuce_kizgin: require('../../assets/ses/ygk/imza/cuce_kizgin.mp3'),
  imza_yg_sarah_selam: require('../../assets/ses/ygk/imza/sarah_selam.mp3'),
  imza_yg_sarah_tesekkur: require('../../assets/ses/ygk/imza/sarah_tesekkur.mp3'),
  imza_yg_sarah_kizgin: require('../../assets/ses/ygk/imza/sarah_kizgin.mp3'),
  imza_yg_zeno_selam: require('../../assets/ses/ygk/imza/zeno_selam.mp3'),
  imza_yg_zeno_tesekkur: require('../../assets/ses/ygk/imza/zeno_tesekkur.mp3'),
  imza_yg_zeno_kizgin: require('../../assets/ses/ygk/imza/zeno_kizgin.mp3'),
  imza_yg_kasim_selam: require('../../assets/ses/ygk/imza/kasim_selam.mp3'),
  imza_yg_kasim_tesekkur: require('../../assets/ses/ygk/imza/kasim_tesekkur.mp3'),
  imza_yg_kasim_kizgin: require('../../assets/ses/ygk/imza/kasim_kizgin.mp3'),
  imza_yg_mirelza_selam: require('../../assets/ses/ygk/imza/mirelza_selam.mp3'),
  imza_yg_mirelza_tesekkur: require('../../assets/ses/ygk/imza/mirelza_tesekkur.mp3'),
  imza_yg_mirelza_kizgin: require('../../assets/ses/ygk/imza/mirelza_kizgin.mp3'),
  imza_yg_kaelan_selam: require('../../assets/ses/ygk/imza/kaelan_selam.mp3'),
  imza_yg_kaelan_tesekkur: require('../../assets/ses/ygk/imza/kaelan_tesekkur.mp3'),
  imza_yg_kaelan_kizgin: require('../../assets/ses/ygk/imza/kaelan_kizgin.mp3'),
  imza_yg_barracuda_selam: require('../../assets/ses/ygk/imza/barracuda_selam.mp3'),
  imza_yg_barracuda_tesekkur: require('../../assets/ses/ygk/imza/barracuda_tesekkur.mp3'),
  imza_yg_barracuda_kizgin: require('../../assets/ses/ygk/imza/barracuda_kizgin.mp3'),
  imza_yg_nyxara_selam: require('../../assets/ses/ygk/imza/nyxara_selam.mp3'),
  imza_yg_nyxara_tesekkur: require('../../assets/ses/ygk/imza/nyxara_tesekkur.mp3'),
  imza_yg_nyxara_kizgin: require('../../assets/ses/ygk/imza/nyxara_kizgin.mp3'),
  imza_yg_elyndra_selam: require('../../assets/ses/ygk/imza/elyndra_selam.mp3'),
  imza_yg_elyndra_tesekkur: require('../../assets/ses/ygk/imza/elyndra_tesekkur.mp3'),
  imza_yg_elyndra_kizgin: require('../../assets/ses/ygk/imza/elyndra_kizgin.mp3'),
  imza_yg_varek_selam: require('../../assets/ses/ygk/imza/varek_selam.mp3'),
  imza_yg_varek_tesekkur: require('../../assets/ses/ygk/imza/varek_tesekkur.mp3'),
  imza_yg_varek_kizgin: require('../../assets/ses/ygk/imza/varek_kizgin.mp3'),
  imza_yg_axira_selam: require('../../assets/ses/ygk/imza/axira_selam.mp3'),
  imza_yg_axira_tesekkur: require('../../assets/ses/ygk/imza/axira_tesekkur.mp3'),
  imza_yg_axira_kizgin: require('../../assets/ses/ygk/imza/axira_kizgin.mp3'),
  imza_yg_zhaor_selam: require('../../assets/ses/ygk/imza/zhaor_selam.mp3'),
  imza_yg_zhaor_tesekkur: require('../../assets/ses/ygk/imza/zhaor_tesekkur.mp3'),
  imza_yg_zhaor_kizgin: require('../../assets/ses/ygk/imza/zhaor_kizgin.mp3'),
  imza_yg_sinha_selam: require('../../assets/ses/ygk/imza/sinha_selam.mp3'),
  imza_yg_sinha_tesekkur: require('../../assets/ses/ygk/imza/sinha_tesekkur.mp3'),
  imza_yg_sinha_kizgin: require('../../assets/ses/ygk/imza/sinha_kizgin.mp3'),
  imza_yg_drahmir_selam: require('../../assets/ses/ygk/imza/drahmir_selam.mp3'),
  imza_yg_drahmir_tesekkur: require('../../assets/ses/ygk/imza/drahmir_tesekkur.mp3'),
  imza_yg_drahmir_kizgin: require('../../assets/ses/ygk/imza/drahmir_kizgin.mp3'),
  // Yerleşimcilerin imza cümleleri (v5 Paket 1: selam, teşekkür, kızgınlık; ElevenLabs)
  imza_orin_selam: require('../../assets/ses/yerlesim/imza/orin_selam.mp3'),
  imza_orin_tesekkur: require('../../assets/ses/yerlesim/imza/orin_tesekkur.mp3'),
  imza_orin_kizgin: require('../../assets/ses/yerlesim/imza/orin_kizgin.mp3'),
  imza_sorya_selam: require('../../assets/ses/yerlesim/imza/sorya_selam.mp3'),
  imza_sorya_tesekkur: require('../../assets/ses/yerlesim/imza/sorya_tesekkur.mp3'),
  imza_sorya_kizgin: require('../../assets/ses/yerlesim/imza/sorya_kizgin.mp3'),
  imza_kaelon_selam: require('../../assets/ses/yerlesim/imza/kaelon_selam.mp3'),
  imza_kaelon_tesekkur: require('../../assets/ses/yerlesim/imza/kaelon_tesekkur.mp3'),
  imza_kaelon_kizgin: require('../../assets/ses/yerlesim/imza/kaelon_kizgin.mp3'),
  imza_lyris_selam: require('../../assets/ses/yerlesim/imza/lyris_selam.mp3'),
  imza_lyris_tesekkur: require('../../assets/ses/yerlesim/imza/lyris_tesekkur.mp3'),
  imza_lyris_kizgin: require('../../assets/ses/yerlesim/imza/lyris_kizgin.mp3'),
  imza_zarek_selam: require('../../assets/ses/yerlesim/imza/zarek_selam.mp3'),
  imza_zarek_tesekkur: require('../../assets/ses/yerlesim/imza/zarek_tesekkur.mp3'),
  imza_zarek_kizgin: require('../../assets/ses/yerlesim/imza/zarek_kizgin.mp3'),
  imza_veysel_selam: require('../../assets/ses/yerlesim/imza/veysel_selam.mp3'),
  imza_veysel_tesekkur: require('../../assets/ses/yerlesim/imza/veysel_tesekkur.mp3'),
  imza_veysel_kizgin: require('../../assets/ses/yerlesim/imza/veysel_kizgin.mp3'),
  imza_defne_selam: require('../../assets/ses/yerlesim/imza/defne_selam.mp3'),
  imza_defne_tesekkur: require('../../assets/ses/yerlesim/imza/defne_tesekkur.mp3'),
  imza_defne_kizgin: require('../../assets/ses/yerlesim/imza/defne_kizgin.mp3'),
  imza_marcus_selam: require('../../assets/ses/yerlesim/imza/marcus_selam.mp3'),
  imza_marcus_tesekkur: require('../../assets/ses/yerlesim/imza/marcus_tesekkur.mp3'),
  imza_marcus_kizgin: require('../../assets/ses/yerlesim/imza/marcus_kizgin.mp3'),
  imza_torvok_selam: require('../../assets/ses/yerlesim/imza/torvok_selam.mp3'),
  imza_torvok_tesekkur: require('../../assets/ses/yerlesim/imza/torvok_tesekkur.mp3'),
  imza_torvok_kizgin: require('../../assets/ses/yerlesim/imza/torvok_kizgin.mp3'),
  imza_siravel_selam: require('../../assets/ses/yerlesim/imza/siravel_selam.mp3'),
  imza_siravel_tesekkur: require('../../assets/ses/yerlesim/imza/siravel_tesekkur.mp3'),
  imza_siravel_kizgin: require('../../assets/ses/yerlesim/imza/siravel_kizgin.mp3'),
  imza_mateo_selam: require('../../assets/ses/yerlesim/imza/mateo_selam.mp3'),
  imza_mateo_tesekkur: require('../../assets/ses/yerlesim/imza/mateo_tesekkur.mp3'),
  imza_mateo_kizgin: require('../../assets/ses/yerlesim/imza/mateo_kizgin.mp3'),
  imza_julian_selam: require('../../assets/ses/yerlesim/imza/julian_selam.mp3'),
  imza_julian_tesekkur: require('../../assets/ses/yerlesim/imza/julian_tesekkur.mp3'),
  imza_julian_kizgin: require('../../assets/ses/yerlesim/imza/julian_kizgin.mp3'),
  imza_brom_selam: require('../../assets/ses/yerlesim/imza/brom_selam.mp3'),
  imza_brom_tesekkur: require('../../assets/ses/yerlesim/imza/brom_tesekkur.mp3'),
  imza_brom_kizgin: require('../../assets/ses/yerlesim/imza/brom_kizgin.mp3'),
  imza_nerissa_selam: require('../../assets/ses/yerlesim/imza/nerissa_selam.mp3'),
  imza_nerissa_tesekkur: require('../../assets/ses/yerlesim/imza/nerissa_tesekkur.mp3'),
  imza_nerissa_kizgin: require('../../assets/ses/yerlesim/imza/nerissa_kizgin.mp3'),
  imza_halvar_selam: require('../../assets/ses/yerlesim/imza/halvar_selam.mp3'),
  imza_halvar_tesekkur: require('../../assets/ses/yerlesim/imza/halvar_tesekkur.mp3'),
  imza_halvar_kizgin: require('../../assets/ses/yerlesim/imza/halvar_kizgin.mp3'),
  imza_elara_selam: require('../../assets/ses/yerlesim/imza/elara_selam.mp3'),
  imza_elara_tesekkur: require('../../assets/ses/yerlesim/imza/elara_tesekkur.mp3'),
  imza_elara_kizgin: require('../../assets/ses/yerlesim/imza/elara_kizgin.mp3'),
  imza_tina_selam: require('../../assets/ses/yerlesim/imza/tina_selam.mp3'),
  imza_tina_tesekkur: require('../../assets/ses/yerlesim/imza/tina_tesekkur.mp3'),
  imza_tina_kizgin: require('../../assets/ses/yerlesim/imza/tina_kizgin.mp3'),
  s_abis_gelis: require('../../assets/ses/savas/s_abis_gelis.mp3'),
  s_abis_hasar1: require('../../assets/ses/savas/s_abis_hasar1.mp3'),
  s_abis_olum: require('../../assets/ses/savas/s_abis_olum.mp3'),
  s_akrep_gelis: require('../../assets/ses/savas/s_akrep_gelis.mp3'),
  s_akrep_hasar1: require('../../assets/ses/savas/s_akrep_hasar1.mp3'),
  s_akrep_hasar2: require('../../assets/ses/savas/s_akrep_hasar2.mp3'),
  s_akrep_olum: require('../../assets/ses/savas/s_akrep_olum.mp3'),
  s_akrep_yetenek: require('../../assets/ses/savas/s_akrep_yetenek.mp3'),
  s_alarm_kara: require('../../assets/ses/savas/s_alarm_kara.mp3'),
  s_alarm_uzay: require('../../assets/ses/savas/s_alarm_uzay.mp3'),
  s_atis_agir_plazma: require('../../assets/ses/savas/s_atis_agir_plazma.mp3'),
  s_atis_golge_oku: require('../../assets/ses/savas/s_atis_golge_oku.mp3'),
  s_atis_isi: require('../../assets/ses/savas/s_atis_isi.mp3'),
  s_atis_iyon: require('../../assets/ses/savas/s_atis_iyon.mp3'),
  s_atis_kilic: require('../../assets/ses/savas/s_atis_kilic.mp3'),
  s_atis_lazer: require('../../assets/ses/savas/s_atis_lazer.mp3'),
  s_atis_mermi: require('../../assets/ses/savas/s_atis_mermi.mp3'),
  s_atis_pence: require('../../assets/ses/savas/s_atis_pence.mp3'),
  s_atis_plazma: require('../../assets/ses/savas/s_atis_plazma.mp3'),
  s_atis_sonik: require('../../assets/ses/savas/s_atis_sonik.mp3'),
  s_atis_torpido: require('../../assets/ses/savas/s_atis_torpido.mp3'),
  s_cahelon_faz: require('../../assets/ses/savas/s_cahelon_faz.mp3'),
  s_cahelon_gelis: require('../../assets/ses/savas/s_cahelon_gelis.mp3'),
  s_cahelon_hasar1: require('../../assets/ses/savas/s_cahelon_hasar1.mp3'),
  s_cahelon_hasar2: require('../../assets/ses/savas/s_cahelon_hasar2.mp3'),
  s_cahelon_olum: require('../../assets/ses/savas/s_cahelon_olum.mp3'),
  s_cahelon_yetenek: require('../../assets/ses/savas/s_cahelon_yetenek.mp3'),
  s_canavar_gelis: require('../../assets/ses/savas/s_canavar_gelis.mp3'),
  s_canavar_hasar1: require('../../assets/ses/savas/s_canavar_hasar1.mp3'),
  s_canavar_hasar2: require('../../assets/ses/savas/s_canavar_hasar2.mp3'),
  s_canavar_olum: require('../../assets/ses/savas/s_canavar_olum.mp3'),
  s_canavar_yetenek: require('../../assets/ses/savas/s_canavar_yetenek.mp3'),
  s_dron_gelis: require('../../assets/ses/savas/s_dron_gelis.mp3'),
  s_dron_hasar1: require('../../assets/ses/savas/s_dron_hasar1.mp3'),
  s_dron_olum: require('../../assets/ses/savas/s_dron_olum.mp3'),
  s_dron_yetenek: require('../../assets/ses/savas/s_dron_yetenek.mp3'),
  s_dusman_kalkan: require('../../assets/ses/savas/s_dusman_kalkan.mp3'),
  s_golgegemi_gelis: require('../../assets/ses/savas/s_golgegemi_gelis.mp3'),
  s_golgegemi_hasar1: require('../../assets/ses/savas/s_golgegemi_hasar1.mp3'),
  s_golgegemi_hasar2: require('../../assets/ses/savas/s_golgegemi_hasar2.mp3'),
  s_golgegemi_olum: require('../../assets/ses/savas/s_golgegemi_olum.mp3'),
  s_golgegemi_yetenek: require('../../assets/ses/savas/s_golgegemi_yetenek.mp3'),
  s_golgesuru_gelis: require('../../assets/ses/savas/s_golgesuru_gelis.mp3'),
  s_golgesuru_hasar1: require('../../assets/ses/savas/s_golgesuru_hasar1.mp3'),
  s_golgesuru_hasar2: require('../../assets/ses/savas/s_golgesuru_hasar2.mp3'),
  s_golgesuru_olum: require('../../assets/ses/savas/s_golgesuru_olum.mp3'),
  s_golgesuru_yetenek: require('../../assets/ses/savas/s_golgesuru_yetenek.mp3'),
  s_illuzyon_gelis: require('../../assets/ses/savas/s_illuzyon_gelis.mp3'),
  s_illuzyon_hasar1: require('../../assets/ses/savas/s_illuzyon_hasar1.mp3'),
  s_illuzyon_hasar2: require('../../assets/ses/savas/s_illuzyon_hasar2.mp3'),
  s_illuzyon_olum: require('../../assets/ses/savas/s_illuzyon_olum.mp3'),
  s_illuzyon_yetenek: require('../../assets/ses/savas/s_illuzyon_yetenek.mp3'),
  s_insan_gelis: require('../../assets/ses/savas/s_insan_gelis.mp3'),
  s_insan_hasar1: require('../../assets/ses/savas/s_insan_hasar1.mp3'),
  s_insan_hasar2: require('../../assets/ses/savas/s_insan_hasar2.mp3'),
  s_insan_olum: require('../../assets/ses/savas/s_insan_olum.mp3'),
  s_insan_yetenek: require('../../assets/ses/savas/s_insan_yetenek.mp3'),
  s_isabet_govde: require('../../assets/ses/savas/s_isabet_govde.mp3'),
  s_isabet_zirh: require('../../assets/ses/savas/s_isabet_zirh.mp3'),
  s_iska: require('../../assets/ses/savas/s_iska.mp3'),
  s_kahergonat_faz: require('../../assets/ses/savas/s_kahergonat_faz.mp3'),
  s_kahergonat_gelis: require('../../assets/ses/savas/s_kahergonat_gelis.mp3'),
  s_kahergonat_hasar1: require('../../assets/ses/savas/s_kahergonat_hasar1.mp3'),
  s_kahergonat_hasar2: require('../../assets/ses/savas/s_kahergonat_hasar2.mp3'),
  s_kahergonat_olum: require('../../assets/ses/savas/s_kahergonat_olum.mp3'),
  s_kahergonat_yetenek: require('../../assets/ses/savas/s_kahergonat_yetenek.mp3'),
  s_kalkan_acilis: require('../../assets/ses/savas/s_kalkan_acilis.mp3'),
  s_kalkan_kirildi: require('../../assets/ses/savas/s_kalkan_kirildi.mp3'),
  s_kalkan_vurus: require('../../assets/ses/savas/s_kalkan_vurus.mp3'),
  s_korsan_gelis: require('../../assets/ses/savas/s_korsan_gelis.mp3'),
  s_korsan_hasar1: require('../../assets/ses/savas/s_korsan_hasar1.mp3'),
  s_korsan_hasar2: require('../../assets/ses/savas/s_korsan_hasar2.mp3'),
  s_korsan_olum: require('../../assets/ses/savas/s_korsan_olum.mp3'),
  s_korsan_yetenek: require('../../assets/ses/savas/s_korsan_yetenek.mp3'),
  s_kriyo_gelis: require('../../assets/ses/savas/s_kriyo_gelis.mp3'),
  s_kriyo_hasar1: require('../../assets/ses/savas/s_kriyo_hasar1.mp3'),
  s_kriyo_hasar2: require('../../assets/ses/savas/s_kriyo_hasar2.mp3'),
  s_kriyo_olum: require('../../assets/ses/savas/s_kriyo_olum.mp3'),
  s_kriyo_yetenek: require('../../assets/ses/savas/s_kriyo_yetenek.mp3'),
  s_otomat_gelis: require('../../assets/ses/savas/s_otomat_gelis.mp3'),
  s_otomat_hasar1: require('../../assets/ses/savas/s_otomat_hasar1.mp3'),
  s_otomat_hasar2: require('../../assets/ses/savas/s_otomat_hasar2.mp3'),
  s_otomat_olum: require('../../assets/ses/savas/s_otomat_olum.mp3'),
  s_otomat_yetenek: require('../../assets/ses/savas/s_otomat_yetenek.mp3'),
  s_oyuncu_lazer: require('../../assets/ses/savas/s_oyuncu_lazer.mp3'),
  s_oyuncu_tufek: require('../../assets/ses/savas/s_oyuncu_tufek.mp3'),
  s_sharon_faz: require('../../assets/ses/savas/s_sharon_faz.mp3'),
  s_sharon_gelis: require('../../assets/ses/savas/s_sharon_gelis.mp3'),
  s_sharon_hasar1: require('../../assets/ses/savas/s_sharon_hasar1.mp3'),
  s_sharon_hasar2: require('../../assets/ses/savas/s_sharon_hasar2.mp3'),
  s_sharon_olum: require('../../assets/ses/savas/s_sharon_olum.mp3'),
  s_sharon_yetenek: require('../../assets/ses/savas/s_sharon_yetenek.mp3'),
  s_siper_vurus: require('../../assets/ses/savas/s_siper_vurus.mp3'),
  s_solucan_gelis: require('../../assets/ses/savas/s_solucan_gelis.mp3'),
  s_solucan_hasar1: require('../../assets/ses/savas/s_solucan_hasar1.mp3'),
  s_solucan_hasar2: require('../../assets/ses/savas/s_solucan_hasar2.mp3'),
  s_solucan_olum: require('../../assets/ses/savas/s_solucan_olum.mp3'),
  s_solucan_yetenek: require('../../assets/ses/savas/s_solucan_yetenek.mp3'),
  s_spor_gelis: require('../../assets/ses/savas/s_spor_gelis.mp3'),
  s_spor_hasar1: require('../../assets/ses/savas/s_spor_hasar1.mp3'),
  s_spor_hasar2: require('../../assets/ses/savas/s_spor_hasar2.mp3'),
  s_spor_olum: require('../../assets/ses/savas/s_spor_olum.mp3'),
  s_spor_yetenek: require('../../assets/ses/savas/s_spor_yetenek.mp3'),
  s_surungen_gelis: require('../../assets/ses/savas/s_surungen_gelis.mp3'),
  s_surungen_hasar1: require('../../assets/ses/savas/s_surungen_hasar1.mp3'),
  s_surungen_hasar2: require('../../assets/ses/savas/s_surungen_hasar2.mp3'),
  s_surungen_olum: require('../../assets/ses/savas/s_surungen_olum.mp3'),
  s_surungen_yetenek: require('../../assets/ses/savas/s_surungen_yetenek.mp3'),
  s_tarikat_gelis: require('../../assets/ses/savas/s_tarikat_gelis.mp3'),
  s_tarikat_hasar1: require('../../assets/ses/savas/s_tarikat_hasar1.mp3'),
  s_tarikat_hasar2: require('../../assets/ses/savas/s_tarikat_hasar2.mp3'),
  s_tarikat_olum: require('../../assets/ses/savas/s_tarikat_olum.mp3'),
  s_tarikat_yetenek: require('../../assets/ses/savas/s_tarikat_yetenek.mp3'),
  s_ucan_gelis: require('../../assets/ses/savas/s_ucan_gelis.mp3'),
  s_ucan_hasar1: require('../../assets/ses/savas/s_ucan_hasar1.mp3'),
  s_ucan_hasar2: require('../../assets/ses/savas/s_ucan_hasar2.mp3'),
  s_ucan_olum: require('../../assets/ses/savas/s_ucan_olum.mp3'),
  s_ucan_yetenek: require('../../assets/ses/savas/s_ucan_yetenek.mp3'),
  s_xarathia_faz: require('../../assets/ses/savas/s_xarathia_faz.mp3'),
  s_xarathia_gelis: require('../../assets/ses/savas/s_xarathia_gelis.mp3'),
  s_xarathia_hasar1: require('../../assets/ses/savas/s_xarathia_hasar1.mp3'),
  s_xarathia_hasar2: require('../../assets/ses/savas/s_xarathia_hasar2.mp3'),
  s_xarathia_olum: require('../../assets/ses/savas/s_xarathia_olum.mp3'),
  s_xarathia_yetenek: require('../../assets/ses/savas/s_xarathia_yetenek.mp3'),
  s_yabanci_gelis: require('../../assets/ses/savas/s_yabanci_gelis.mp3'),
  s_yabanci_hasar1: require('../../assets/ses/savas/s_yabanci_hasar1.mp3'),
  s_yabanci_hasar2: require('../../assets/ses/savas/s_yabanci_hasar2.mp3'),
  s_yabanci_olum: require('../../assets/ses/savas/s_yabanci_olum.mp3'),
  s_yabanci_yetenek: require('../../assets/ses/savas/s_yabanci_yetenek.mp3'),
  s_yavru_gelis: require('../../assets/ses/savas/s_yavru_gelis.mp3'),
  s_yavru_hasar1: require('../../assets/ses/savas/s_yavru_hasar1.mp3'),
  s_yavru_olum: require('../../assets/ses/savas/s_yavru_olum.mp3'),
  s_yenilgi: require('../../assets/ses/savas/s_yenilgi.mp3'),
  s_zafer: require('../../assets/ses/savas/s_zafer.mp3'),
};

// Aynı dosyayı çalan ortamlar tek oynatıcıyı paylaşır (Kadim Krater ile tarım alanı aynı kaydı çalar).
// 3.9'a kadar ikisi ayrı oynatıcıdan aynı dosyayı açıyordu; Bahtiyar tarım alanında sesin hiç gelmediğini bildirdi.
const TAKMA_ADLAR = { ortam_krater: 'ortam_tarim' };
const asil = (ad) => (ad && TAKMA_ADLAR[ad]) || ad;

const oynaticilar = {};
let hazir = false;
let ortamDuzeyi = 0.6;
let calanOrtam = null;
let ortamOrani = 1;
const solmalar = {};

export async function sesleriHazirla() {
  if (hazir) return;
  try {
    await setAudioModeAsync({ playsInSilentMode: true, interruptionMode: 'mixWithOthers', shouldPlayInBackground: false });
  } catch (e) {}
  try {
    await setIsAudioActiveAsync(true);
  } catch (e) {}
  for (const ad of Object.keys(KAYNAKLAR)) {
    try {
      // keepAudioSessionActive: kısa bir ses bitince iPhone'un ses kanalı kapanıp konuşmayı kısmasın
      const p = createAudioPlayer(KAYNAKLAR[ad], { keepAudioSessionActive: true });
      if (DONGULER[ad] !== undefined || ad === 'sessiz') p.loop = true;
      oynaticilar[ad] = p;
    } catch (e) {}
  }
  hazir = true;
  oturumuAcikTut();
}

// Sürekli çalan sessiz döngü: iOS'ta konuşmanın kısık başlamasını önler
export function oturumuAcikTut() {
  const p = oynaticilar.sessiz;
  if (!p) return;
  try {
    p.volume = 1;
    if (!p.playing) p.play();
  } catch (e) {}
}

function titret(ad) {
  try {
    if (ad === 'tik') Haptics.selectionAsync().catch(() => {});
    else if (ad === 'secim') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    else if (ad === 'dip') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
  } catch (e) {}
}

// iOS'ta seekTo eşzamansızdır: sarma bitmeden play() çağrılırsa ses çalmayabilir (Kayıp Okyanus'taki düzeltme)
function basaSarVeCal(p) {
  let oldu = false;
  const oynat = () => {
    if (oldu) return;
    oldu = true;
    try {
      p.play();
    } catch (e) {}
  };
  try {
    if (p.playing) p.pause();
    const s = p.seekTo(0);
    if (s && typeof s.then === 'function') {
      s.then(oynat, oynat);
      setTimeout(oynat, 120);
    } else oynat();
  } catch (e) {
    oynat();
  }
}

function oynatici(ad) {
  if (!oynaticilar[ad] && hazir && TEMBEL[ad]) {
    try {
      oynaticilar[ad] = createAudioPlayer(TEMBEL[ad], { keepAudioSessionActive: true });
    } catch (e) {}
  }
  return oynaticilar[ad];
}

// Savaş başında o savaşın seslerini belleğe alır (ilk çalışta gecikme olmasın)
export function onYukle(adlar) {
  for (const ad of adlar || []) oynatici(ad);
}

// Tembel açılan oynatıcıları bırakır (savaş bitince)
export function bosalt() {
  for (const ad of Object.keys(oynaticilar)) {
    if (!TEMBEL[ad]) continue;
    try {
      oynaticilar[ad].remove();
    } catch (e) {}
    delete oynaticilar[ad];
  }
}

export function sesVarMi(ad) {
  return !!(KAYNAKLAR[ad] || TEMBEL[ad]);
}

export function cal(ad, duzey = 1) {
  const p = oynatici(ad);
  if (!p) {
    titret(ad);
    return;
  }
  try {
    p.volume = Math.max(0, Math.min(1, duzey));
    basaSarVeCal(p);
  } catch (e) {}
}

function hedefDuzey(ad) {
  return (DONGULER[ad] ?? 0.5) * ortamDuzeyi * ortamOrani;
}

// Bir döngünün düzeyini yumuşakça değiştirir; 0'a inince duraklatır
function sol(ad, hedef, sure = 900) {
  const p = oynaticilar[ad];
  if (!p) return;
  clearInterval(solmalar[ad]);
  let bas = 0;
  try {
    bas = p.playing ? p.volume : 0;
    if (!p.playing && hedef > 0) {
      p.volume = 0;
      p.play();
    }
  } catch (e) {}
  const adim = 12;
  let i = 0;
  solmalar[ad] = setInterval(() => {
    i++;
    const v = bas + (hedef - bas) * (i / adim);
    try {
      p.volume = Math.max(0, Math.min(1, v));
    } catch (e) {}
    if (i >= adim) {
      clearInterval(solmalar[ad]);
      if (hedef <= 0) {
        try {
          p.pause();
        } catch (e) {}
      }
    }
  }, sure / adim);
}

// Mekânın ortam sesini çalar; öncekini yavaşça kısar. ad null ise ortam susar.
export function ortamCal(ad, oran = 1) {
  ortamOrani = oran;
  ad = asil(ad);
  if (ad && !oynaticilar[ad]) ad = null;
  if (calanOrtam && calanOrtam !== ad) sol(calanOrtam, 0);
  calanOrtam = ad;
  if (ad) sol(ad, hedefDuzey(ad));
}

// Şu an çalan ortam döngüsünün adı (yoksa null)
export function calanOrtamAdi() {
  return calanOrtam;
}

export function ortamSesiAyarla(duzey) {
  ortamDuzeyi = duzey;
  if (calanOrtam) sol(calanOrtam, hedefDuzey(calanOrtam), 300);
}
