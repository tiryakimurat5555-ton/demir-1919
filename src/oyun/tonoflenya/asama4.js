// v4 Aşama 4 (belgeler/v4/asama-4-tonoflenya-ana-gorevler-ve-final-derinlestirme.txt), ara sahne 4B:
// "Zirve İğnesi'nin Hizalanması". Final #3'ten sonra Kefius çağırır; iki parmakla çevirerek altı yıldızın ışığı
// iğnenin ucunda tek tonda toplanır. Bitince bayrak.zirveHizasi (Kronik #4'ü ve Final #4'ü açar) ve malazarIzni.
// Ara sahne 4A (varış, Final #1 ödülü) malken.js ve final.js'te; Final #16-#20 derinleştirmesi final.js ve savas.js'te.
import { hikayeEkle } from '../hikaye';

const A = (tur, ad, giris, bitis, ek) => ({ tur, ad, giris, bitis, ...(ek || {}) });

hikayeEkle('zirve_ignesi', {
  kod: '4B', ad: 'Zirve İğnesi\'nin Hizalanması', veren: 'Kefius Arateon ve Gözlemevi Görevlisi', grup: 'tonoflenya',
  ortam: 'ortam_t_igne',
  tetik: (d) => !!(d.tf && d.tf.biten && d.tf.biten.includes(3)) && !!d.bayrak.tonoflenyaGoruldu,
  giris: [
    'Gözlemevi Görevlisi telsizden, telaşla: "Kaptan, Akademinin altıncı katına çıkın! Dehlizdeki sızıntı Zirve İğnesi\'ni kaydırdı; altı yıldızın ışığı iğnenin ucunda dağılıyor."',
    'Kefius Arateon: "İğne hizasız kaldıkça Kara Göl\'ün altındaki mührün sesini duyamayız. Dev pirinç ve kristal halkayı iki parmağınla çevir; altı yıldızı tek bir tonda topla."',
    'Gözlemevi camlarına gümüşi rüzgâr vuruyor; iğnenin başında altı ayrı ton birbirine sürtünerek vınlıyor.',
  ],
  adimlar: [
    { op: [
      A('frekans', 'Gümüş, kızıl ve zümrüt ışık', 'Zhaor, Varek ve Axira\'nın ışınları dağınık. Referans tonu dinle; iki parmakla çevirerek iğnenin tonunu eşle.', 'Üç yıldızın ışığı iğnenin ucunda birleşti.'),
      A('frekans', 'Ametist, mavi ve altın ışık', 'Şimdi Elyndra, Sinha ve Uma. Yine iki parmakla çevir; altı ışın tek bir tona otursun.', 'Altı ışın tek bir tonda: iğne kusursuz bir çan sesiyle hizalandı.'),
    ] },
  ],
  odul: (d) => 'Zirve İğnesi hizalandı. İğnenin ucundan komşu bir dünyaya bakıyorsun: suyla kaplı Okyanos-Abyssus. Kronik dört, Cahelon\'un laneti, artık okunabilir; Malazar yolu da açık.',
  bitince: (d) => {
    d.bayrak.zirveHizasi = true;
    d.bayrak.malazarIzni = true;
    if (!d.kodeks.some((k) => k.id === 'okyanos_abyssus')) d.kodeks.push({ id: 'okyanos_abyssus', ad: 'Okyanos-Abyssus', tarif: 'Tonoflenya\'nın komşusu, bütünüyle okyanusla kaplı lanetli gezegen. Zirve İğnesi hizalanınca ilk kez görüldü; dipsiz girdabının altında Cahelon uyuyor.', itibar: 15 });
  },
});
