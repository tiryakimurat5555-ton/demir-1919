// Seslendirilmiş telsiz ve gemi içi konuşmaları (ElevenLabs, 1.7).
// Adlar prosedürel olduğu için kayıtlarda ad geçmez: önce rehber "Telsizci Aras Kaya" der, sonra kayıt çalar.
// Kayıt yalnız konuşan kişi kapsülden sağ çıkan öncüyse (murettebat sırası 0, 1, 2) ve sesin
// cinsiyetiyle uyuşuyorsa çalar; başka biri konuşuyorsa metin eskisi gibi rehberle okunur.
// Saf JavaScript: ekran sesi src/ses/telsiz.js ile çalar.

// Öncülerin sesleri: 0 başçarkçı (olgun, tok erkek), 1 telsizci (genç erkek), 2 hekim (sakin kadın)
export const SESLER = {
  0: { ses: 'Emir', cinsiyet: 'e' },
  1: { ses: 'Agit Taşdemir', cinsiyet: 'e' },
  2: { ses: 'Öykü Arel', cinsiyet: 'k' },
};

// ortam: telsiz (yüzeyde, bant süzgeci + hafif parazit), gemi (gemi içi interkom), savas (kısa, sert telsiz)
export const KAYITLAR = {
  // Görev bildirimleri
  sirtlar_ilk: { rol: 1, ortam: 'telsiz', metin: 'Kaptan, sesin kesik geliyor; manyetik parazit var. Radarın burada kısa menzilli olacak, bacaların fışkırmasını kulağınla izle. Batı, doğu ve sırtın dibinde üç baca saydım.' },
  zehir_yarim: { rol: 2, ortam: 'telsiz', metin: 'Kaptan, maskenin kartuşları yarıya indi. Bacalardan uzaklaşırsan nefesin düzelir; vadiye dönersen tamamen temizlenir.' },
  ilk_baca: { rol: 0, ortam: 'telsiz', metin: 'Kaptan! İlk sondadan ölçüm geldi, izotop saflığı beklediğimizden yüksek. İki baca daha, ve bu gezegende ilk kez kendi yakıtımızı dökeriz.' },
  krater_ilk: { rol: 1, ortam: 'telsiz', metin: 'Kaptan, sesini zor duyuyorum; krater sesi yutuyor. Yankıdan beş çan sayıyorum: batıdan başlayıp saat yönünde, en pesten en tize. Kapı kraterin tam ortasında.' },
  lab_ilk: { rol: 0, ortam: 'telsiz', metin: 'Kaptan, cihazlarım çıldırdı; o salonun içinde yerçekimi yer yer üç katına çıkıyor. Derin uğultuları duyduğun yere basma.' },
  plato_ilk: { rol: 1, ortam: 'telsiz', metin: 'Kaptan, rüzgâr ölçerim hamleleri gösteriyor; yaklaşık her on beş, yirmi saniyede bir. Islığı duyunca dur. Kızağın dört ayağı platonun ortasında; dağıtım kutusu tam ortalarında.' },
  ilk_ayak: { rol: 0, ortam: 'telsiz', metin: 'Kaptan, bir ayak oturdu! Kızağın o köşesi artık sarsılmıyor. Üç ayak daha.' },
  lab_kuruldu: { rol: 0, ortam: 'telsiz', metin: 'Kaptan, laboratuvar çalışıyor. Terminalden üretime başla; plakalar en uzun süren iş.' },
  // Bölge duyuruları
  dogu_acik: { rol: 1, ortam: 'telsiz', metin: 'Kaptan, vadinin doğu ucundan kulak tırmalayan çınlamalar alıyorum; arada statik çıtırtılar. Orası kristal bataklıkları. Geçit artık açık ama sis pusulayı şaşırtıyor: yüklenen bir sütunun çıtırtısını duyarsan ondan uzaklaş.' },
  obsidyen_acik: { rol: 1, ortam: 'telsiz', metin: 'Kaptan, yine ben. Güneybatı kanyonundan tuhaf, uzun yankılar dönüyor; sanki ötede devasa bir cam çanak var. Göçük kirişlerle açıldı.' },
  civa_haber: { rol: 2, ortam: 'telsiz', metin: 'Kaptan, bataklığın güneybatı köşesinden aşağı bir yokuş iniyor; dibinde cıva şelaleleri var. Buharı maskeyi zorlar, kısa kal.' },
  lav_acik: { rol: 0, ortam: 'telsiz', metin: 'Kaptan, bacalar dengelenince sırtların güney ucunda lav koridorlarına inen ağız açıldı. Orada durmak değil, kaçmak gerekir: ayağının altında gümbürtü duyarsan hemen yer değiştir.' },
  mantar_haber: { rol: 2, ortam: 'telsiz', metin: 'Kaptan, koridorların güneybatı ucunda serin bir hava akımı var; bir çatlak aşağıda nemli bir mağaraya iniyor olmalı. Sporlar sakinleştirici olabilir, örnek getir.' },
  kriyo_acik: { rol: 0, ortam: 'telsiz', metin: 'Kaptan, platonun kuzeydoğu ucundaki buzul yarığına halat ve iskele kurdum. Aşağısı metan mağaraları; soğuk insanı hızla tüketir. Kriyo-atölyemiz olursa termal giysi yaparız.' },
  kule_haber: { rol: 1, ortam: 'telsiz', metin: 'Kaptan, Atmosphere-X hazırsa platonun kuzeybatı ucundan havada süzülen kulelere uçabilirsin. Rüzgâr aralarından flüt gibi çalıyor.' },
  // Yerel mini görev çağrıları (mini.js cagri metinleri)
  mini_mantar_hasadi: { rol: 2, ortam: 'telsiz', metin: 'Kaptan, mantar ormanı spor dökme dönemine girdi. Fotonik kristaller olgunlaşıyor; olgun olanlar ince ince çınlar. Spor yoğunluğu artmadan üç olgun kristal topla, laboratuvara getir. Olmamışı koparma, çürümüşe dokunma.' },
  mini_vana_donmasi: { rol: 0, ortam: 'telsiz', metin: 'Kaptan, metan mağarasındaki ana yakıt hattı soğuktan çatladı! Dört bağlantıdan biri kaçırıyor. Tıslamayı dinle, doğru bağlantıyı bul ve termal meşaleyle mühürle. Beş polimer levha yeter.' },
  mini_kayip_ekip: { rol: 1, ortam: 'telsiz', metin: 'Kaptan, obsidyen ovasındaki keşif ekibinden haber alamıyoruz! Manyetik parazit rotalarını şaşırtmış; radar orada işe yaramıyor. Araçlarının kornasını çalıyorlar. Camın yankıları arasından kornayı izle.' },
  mini_vaha_kanali: { rol: 2, ortam: 'telsiz', metin: 'Kaptan, vahanın kaynağı kaya kaymasıyla tıkandı; su kesildi! Bentteki kayayı sonik patlatıcıyla parçalamak gerek, ama vadiye zarar vermeden: patlatıcının frekansını kayanın kendi rezonansına ayarla.' },
  mini_ceviri_krizi: { rol: 1, ortam: 'telsiz', metin: 'Kaptan, akademide gergin bir tartışma var. Tapınaktan getirilen metinlerle Kaelith tarihi çelişiyor; iki taraf da birbirini sahtekârlıkla suçluyor. Terminalden kütüphaneye bağlan, ikisini de dinle.' },
  mini_basinc_dususu: { rol: 2, ortam: 'telsiz', metin: 'Kaptan, kseno-habitat kubbesinde basınç düşüyor! İçerideki canlılar boğuluyor. Kapsülün güneyindeki üç yedek kompresörü elle çalıştır; her birinde basıncı dinle, tam zamanında aç.' },
  mini_solucan_gocu: { rol: 0, ortam: 'telsiz', metin: 'Kaptan, sismograflar çıldırıyor! Bir kör solucan sürüsü sırtların maden ocaklarına doğru geliyor. Sırtlardaki üç kayaya frekans kazığı dik; sürü boş kanyonlara sapsın. Her kazığa bir kristal. İki buçuk dakikamız var!' },
  mini_yagmaci_tuzagi: { rol: 1, ortam: 'telsiz', metin: 'Kaptan, Vanguard enkazında yabancı telsiz cızırtıları! Kaçak korsan kalıntıları enkazı yağmalıyor. Sessizce sız: yavaş yürü, cızırtıya yaklaş, plazma kesiciyle sersemlet. Hızlı yürürsen seni duyarlar.' },
  // Sefer olayları (sefer.js; gemi içi interkom)
  sefer_ikmal: { rol: 1, ortam: 'gemi', metin: 'Kaptanım, yakındaki asteroit gölgesinde terk edilmiş bir ikmal mekiği sinyali yakaladım. Rotayı iki derece kaydırırsak sağlam yakıt kapsülleri alabiliriz.' },
  sefer_ariza: { rol: 0, ortam: 'gemi', metin: 'Kaptanım! Sol plazma hattındaki rezonans valfi aşındı, motor dairesine gaz sızıyor. Ya hızı yarıya düşürmeliyiz ya da bir yedek parça yakıp valfi mühürlemeliyim!' },
  sefer_ortaklik: { rol: 2, ortam: 'gemi', metin: 'Kaptanım, madenci mürettebatla biyoloğumuz laboratuvarı paylaşma konusunda anlaştı; ortaklaşa yeni bir soğutucu alaşım geliştirdiler.' },
  sefer_tehdit: { rol: 1, ortam: 'gemi', metin: 'Kaptan! Sektör devriyesinden şifreli telsiz: bölgede korsan karartması başlamış. Sinyal kulesi rotamızı değiştirmemizi öneriyor.' },
  // Savaşta telsiz subayının uyarıları (savas.js)
  savas_plazma_sag: { rol: 1, ortam: 'savas', metin: 'Plazma topu, sağdan!' },
  savas_plazma_sol: { rol: 1, ortam: 'savas', metin: 'Plazma topu, soldan!' },
  savas_torpido_sag: { rol: 1, ortam: 'savas', metin: 'Kinetik torpido, sağdan!' },
  savas_torpido_sol: { rol: 1, ortam: 'savas', metin: 'Kinetik torpido, soldan!' },
  savas_iyon_sag: { rol: 1, ortam: 'savas', metin: 'İyon ışını, sağdan!' },
  savas_iyon_sol: { rol: 1, ortam: 'savas', metin: 'İyon ışını, soldan!' },
};

// Ad listeleri (murettebat.js de bunları kullanır): eski kayıtlarda cinsiyet alanı yoksa addan anlaşılır
export const ERKEK_ADLAR = ['Demir', 'Aras', 'Kaan', 'Tolga', 'Bora', 'Orhan', 'Toprak', 'Umut', 'Rüzgar'];
export const KADIN_ADLAR = ['Lyra', 'Selin', 'Mira', 'Ece', 'Nil', 'Defne', 'Asya', 'Ada', 'İlke'];

export function cinsiyeti(uye) {
  if (!uye) return null;
  if (uye.cinsiyet) return uye.cinsiyet;
  const ilk = (uye.ad || '').split(' ')[0];
  if (ERKEK_ADLAR.includes(ilk)) return 'e';
  if (KADIN_ADLAR.includes(ilk)) return 'k';
  return null;
}

// Bu kişi bu kaydı kendi sesiyle söyleyebilir mi? (öncü ve aynı cinsiyet)
export function sesiUyarMi(d, rol, uye) {
  const oncu = d.murettebat && d.murettebat[rol];
  if (!oncu || !uye || oncu.id !== uye.id) return false;
  return cinsiyeti(uye) === SESLER[rol].cinsiyet;
}

// Kayıt kimliği; çalınamıyorsa null. uye verilmezse kaydın sahibi öncü kabul edilir.
export function kayitBul(d, id, uye) {
  const k = KAYITLAR[id];
  if (!k) return null;
  const u = uye || (d.murettebat && d.murettebat[k.rol]);
  return sesiUyarMi(d, k.rol, u) ? id : null;
}
