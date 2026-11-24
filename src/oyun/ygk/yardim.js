// YGK kişi verisi için kısa yazım yardımcıları (ygk/kisiler/*.js).
//   D(id, ad, pan, ses, durum, kombolar, cozuldu, ek): büyü bulmacası düğümü (buyu/bulmaca.js)
//   S(etiket, puan {kisi: n | 'g_<güç>': n}, sonuc, ek): görev kararı
//   P: belgelerdeki niteliksel puanlar (+Düşük … +Çok Yüksek)
export const D = (id, ad, pan, ses, durum, kombolar, cozuldu, ek = {}) => ({ id, ad, pan, mesafe: 0.5, ses, durum, kombolar, cozuldu, ...ek });
export const S = (etiket, puan, sonuc, ek = {}) => ({ etiket, puan, sonuc, ...ek });
export const P = { cokYuksek: 35, yuksek: 25, orta: 15, dusuk: 8, eksiDusuk: -5, eksiOrta: -10, eksiYuksek: -20 };
// Sohbet seçeneği: puan sayı ya da { erken, gec, esik } (eşik kademesinden sonra gec)
export const O = (etiket, puan, yanit, ek = {}) => ({ etiket, puan, yanit, ...ek });
