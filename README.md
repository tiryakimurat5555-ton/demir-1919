# Demir 1919

1918–1923 yıllarında, işgal altındaki İstanbul'da başlayan tarihsel macera ve dedektiflik oyunu.
Başkahraman Çanakkale gazisi Arif Demir. Gizli örgüt ve olay örgüsü kurgudur.

Expo (React Native) ile yazılır, iPhone'da Expo Go ile denenir. Tamamen çevrim dışı çalışacak,
görme engelli oyuncular tarafından bağımsız oynanabilecek; VoiceOver ve TalkBack ile uyumlu olacak.

Tasarım taslağı: `belgeler/tasarim-taslagi.pdf`

## Şu anki aşama: 2 — birinci bölüm: Sudaki Adam (sesli prototip)

- Karaköy, Aralık 1918: ateşçi Sabri'nin ölümü, şifreli belge, kanatlı anahtar
- Mekânlar: rıhtım, Süleyman Kaptan'ın kayıkhanesi, liman kayıt bürosu, Kalafatçı Hanı ve Sabri'nin odası
- Konuşmalar seçimli: Süleyman Kaptan, Gülce, kayıkçı Hüsnü, hancı Ohannes Usta, İngiliz nöbetçi
- Soruşturma panosu: iki delili birleştirip çıkarım yapma; defter: hedef ve olanlar
- Arif'in savaş anıları ve verdiğin kararlar kaydedilir; üç farklı karar ve kapanış
- Otomatik kayıt, Devam et
- Ayarlar: konuşma hızı, ortam sesi düzeyi ve Türkçe ses seçimi
- Ortam sesleri: sisli rıhtım, kayıkhane, liman bürosu, han avlusu, Sabri'nin odası; düşen sandık ve savaş anısı; delil bulunca not alma sesi

## 1 — sesli menü düzeni

- Oyun VoiceOver/TalkBack kapalıyken, kendi Türkçe sesiyle oynanır (Kayıp Okyanus'taki hareketler)
- Ekran okuyucu açıksa uyarı ekranı; kapanınca oyun kendiliğinden başlar
- Ana menü: Yeni oyun (giriş metni), Hareketler, Hakkında

## 0 — başlangıç iskeleti

- GitHub → Expo yayın hattı (main dalına her gönderimde Expo Go güncellemesi)
