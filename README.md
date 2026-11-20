# Aethelis

Görsel arayüzü olmayan, üç boyutlu sesle ve dokunma hareketleriyle oynanan bir koloni ve uzay keşif oyunu.
İnsanlığın derin uzaydaki sığınağı Aethelis-IV'e inen kapsülden başlarsın: vadide dolaşır, kaynak toplar,
tesis kurar, ileride gemini parça parça inşa edip uzaya açılırsın.

Tasarım: Bahtiyar Cankurt (belgeler/). Yapım: Murat ve Bahtiyar. Expo Go ile iPhone ve Android'de çalışır.

## Bu sürümde (0.1)
- Vadi-i Sukût'ta sesle serbest dolaşma; iniş kapsülünün içi ve dışı.
- Radar: uzun basınca yankılar nesnelerin yönünden döner.
- Birinci görev "Sinyal Arayışı": alet dolabı, kopan arka modül, yedek jeneratör, Gözcü Tepesi'nde anten
  ve kulakla frekans ayarı; yörüngedeki Kestrel-7 uydusundan telemetri.
- Kaynak toplama (bazalt, titanyum hurdası, silikat kristali) ve Sinyal Kulesi inşası.
- Otomatik kayıt (uygulamadan çıkınca ya da telefon kilitlenince) ve kapsüldeki terminalden üç yuvaya elle kayıt.

## Hareketler
- Sürükleyip tut: yukarı ileri, aşağı geri, sağa-sola dön.
- Dokun: çevrende ne var. Uzun bas: radar. Çift dokun: kullan, geç ya da konuş.
- İki parmakla dokun: sustur. İki parmakla çift dokun: menü.
- Frekans ayarında: yukarı-aşağı sürükle ya da iki parmakla çevir.

Oyun VoiceOver ve TalkBack kapalıyken, kendi Türkçe sesli rehberiyle oynanır. Kulaklıkla oynayın.

## Geliştirme
- `bun test testler/` — görev testleri
- Yayın: main dalına her gönderim Expo Go güncellemesi olarak yayınlanır (.github/workflows/expo-guncelleme.yml).
- Çalışma notları: CLAUDE.md
