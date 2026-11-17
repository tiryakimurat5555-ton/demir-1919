# Demir 1919 — çalışma notları

## Murat ile çalışma
- Murat'ın yalnızca iPhone'u var; kodu elle düzenleyemez. Bütün dosyaları ben yazar, depoya gönderirim.
  Asla "şu satırı değiştir" türü talimat verme. Kendisinin yapacağı adımlarda sayfanın doğrudan bağlantısını ver.
- Murat görme engellidir (VoiceOver kullanır); görsel tasarımı görüntüden değerlendiremez.
- Her şey Türkçe: arayüz, sesli rehber, kod içi adlar ve yorumlar.
- Diğer projeler (kayip-okyanus, TaslarPro, Deneme/Galaktik İmparatorluk) ayrıdır; onlara dokunma.
- Test edilmemiş bir özelliği çalışıyor diye sunma; telefonda ancak Murat Expo Go'da denediğinde doğrulanır.

## Tasarım
- Kaynak: belgeler/tasarim-taslagi.pdf (8 sayfa). 19. bölümdeki çalışma talimatına uy:
  önceki seçimleri yeniden sorma ya da sessizce değiştirme; her yeni tasarım kararında tek soru sor,
  önerilen seçeneği ve kısa gerekçesini söyle; 186. soru (dünya büyüklüğü) açık karar olarak kalır.
- Tarihsel gerçekler ile kurgu (örgüt, karakterler) ayrı tutulur; gerçek kişileri uydurma bilgilerle ilişkilendirme.
- Taslaktaki ölçek (fotogerçekçi, 80+ saat, çok şehir) hedeftir, taahhüt değildir. Önce dikey dilim:
  İstanbul limanı, Süleyman Kaptan, denizcinin eşyaları, belge, soruşturma panosu.
- Erişilebilirlik kararı henüz verilmedi: taslak, dahili ekran okuyucunun VoiceOver/TalkBack ile birlikte
  çalışmasını istiyor. Şimdilik: ekran okuyucu açıksa duyurular announceForAccessibility ile, kapalıysa
  expo-speech (tr-TR); kapalıyken düğmeye dokun = oku, 3 sn içinde yeniden dokun = seç.

## Teknik
- Expo SDK 58; sürümler kayip-okyanus deposuyla aynı (bundledNativeModules.json). Bu ortamda npm erişimi yok.
- Sözdizimi denetimi: `bun build index.js --outdir /tmp/bb -e expo -e expo-speech -e expo-haptics -e expo-status-bar -e react -e react-native -e 'react-native/*'`
- Yayın: main'e push → GitHub Actions (.github/workflows/expo-guncelleme.yml) → eas update (branch main).
  Depo herkese açık olduğu için Actions dakikası sınırsızdır. Gizli anahtar: EXPO_TOKEN (ya da DEMIR1919).
  İlk çalışmada `eas init` app.json'a proje kimliğini yazıp main'e commit eder; push etmeden önce `git pull --rebase`.
  Kayıt `yayin-kaydi` dalında: `git fetch -q origin yayin-kaydi && git show FETCH_HEAD:yayin-kaydi.txt`
- Akış: uygula → bun build → CLAUDE.md/README → commit → git pull --rebase → push → yayin-kaydi'nda success'i bekle
  → Türkçe rapor (Expo Go bağlantısı, yenilikler, denenmemiş olanlar dürüstçe).
