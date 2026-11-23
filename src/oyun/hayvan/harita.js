// 4.5 mekânları (yalnız veri): Hayvan Barınağı (v5 Paket 14/15), Jeotermal Göl Kıyısı ve Koloni Arşivi Salonu
// (Paket 3B bölüm 2). yuzey/harita.js birleştirir.
import { icMerkez } from '../yerlesim/harita';

export const H_MEKANLAR = {
  barinak: {
    ad: 'Hayvan Barınağı',
    tarif: 'Sera binasının yanında, kubbeli küçük bir ağıl: saman, ahşap bölmeler, havalandırma uğultusu. Hayvanların sesleri bölmelerinden gelir.',
    alan: { bati: 5000, dogu: 5030, guney: 0, kuzey: 24 },
    ortam: 'ortam_barinak',
    zemin: 'tas',
  },
  jeotermal_gol: {
    ad: 'Jeotermal Göl Kıyısı',
    tarif: 'Sıcak bir yeraltı gölü: buhar tüten menfezler, sakin su, ahşap bir iskele. Ara sıra bir balık sıçrar.',
    alan: { bati: 4800, dogu: 4840, guney: 0, kuzey: 30 },
    ortam: 'ortam_gol',
    zemin: 'tas',
    saha: 'gol',
  },
  arsiv: {
    ad: 'Koloni Arşivi Salonu',
    tarif: 'Okulun arkasında vitrinli, sessiz bir salon. Cam vitrinler ince bir tınıyla titreşiyor; dört set için dört vitrin.',
    alan: { bati: 5100, dogu: 5120, guney: 0, kuzey: 20 },
    ortam: 'ortam_arsiv',
    zemin: 'tas',
  },
};

const okul = icMerkez('okul');
export const H_KAPILAR = {
  barinak_kapi: {
    ad: 'Hayvan barınağının kapısı',
    uclar: [
      { mekan: 'vadi', x: -40, y: -16, yon: Math.PI, ad: 'Hayvan barınağının kapısı' },
      { mekan: 'barinak', x: 5015, y: 1.5, yon: 0, ad: 'Vadiye çıkış' },
    ],
    kosul: (d) => !!d.bayrak.barinak,
    gizli: (d) => !d.bayrak.barinak,
    kilitMetni: 'Burada henüz bir barınak yok.',
    gecisMetni: ['Saman ve sıcak hayvan kokusu; bölmelerden sesler.', 'Vadinin serin havasına çıkıyorsun.'],
  },
  gol_yolu: {
    ad: 'Jeotermal göle inen merdiven',
    uclar: [
      { mekan: 'vadi', x: 20, y: -43, yon: Math.PI, ad: 'Jeotermal göle inen merdiven' },
      { mekan: 'jeotermal_gol', x: 4801.5, y: 15, yon: 0, ad: 'Vadiye çıkan merdiven' },
    ],
    kosul: (d) => !!(d.koloni && d.koloni.binalar.includes('jeotermal_santral') && d.bayrak.sektor_guney),
    gizli: (d) => !(d.koloni && d.koloni.binalar.includes('jeotermal_santral')),
    kilitMetni: 'Merdiven buharla dolu; güney sektörü güvenli olmadan inmek tehlikeli.',
    gecisMetni: ['Ilık, nemli basamaklardan iniyorsun; aşağıda su şırıldıyor.', 'Basamaklardan vadiye çıkıyorsun.'],
  },
  arsiv_kapi: {
    ad: 'Koloni Arşivi kapısı',
    uclar: [
      { mekan: 'okul', x: okul ? okul.bati + okul.gen - 1.5 : 0, y: okul ? okul.gen / 2 : 0, yon: 0, ad: 'Koloni Arşivi kapısı' },
      { mekan: 'arsiv', x: 5101.5, y: 10, yon: Math.PI, ad: 'Okula dönüş' },
    ],
    kosul: (d) => !!(d.yer && d.yer.binalar.includes('okul')),
    gizli: (d) => !(d.yer && d.yer.binalar.includes('okul')),
    kilitMetni: 'Okul kurulunca açılır.',
    gecisMetni: ['Sessiz salona giriyorsun; cam vitrinler ince bir tınıyla karşılıyor.', 'Okulun koridoruna dönüyorsun.'],
  },
};

export const H_NOKTALAR = {
  bakim_panosu: { mekan: 'barinak', x: 5015, y: 20, ad: 'Bakım panosu ve yem ambarı', yaricap: 2.2, engel: 1, hayvan: 'pano', tarif: 'Bölmelerin listesi, yem ve ilaç dolabı, modül planları.' },
  kulucka_odasi: { mekan: 'barinak', x: 5026, y: 12, ad: 'Kuluçka makinesi', yaricap: 2, engel: 1, hayvan: 'kulucka', tarif: 'Biyo-kubbeye bağlı kuluçka makinesi: genom kapsülleri buraya.' },
  gol_iskelesi: { mekan: 'jeotermal_gol', x: 4825, y: 15, ad: 'Göl iskelesi', yaricap: 2.5, saha: 'balik', balik: 'jeotermal_gol', tarif: 'Sıcak gölün üstüne uzanan ahşap iskele. Buharın altında balıklar ve kseno-canlılar.' },
  arsiv_vitrinleri: { mekan: 'arsiv', x: 5110, y: 15, ad: 'Arşiv vitrinleri', yaricap: 2.5, engel: 1, arsiv: true, tarif: 'Dört vitrin: fosil ve kemik, kristal ve mineral, kadim kayıt, kozmik ses imzaları.' },
};
