// Sefer erzaklarının etkileri (belgeler/tarim-ve-kseno-botanik-rehberi.md bölüm 5). Bağımlılığı yok: seyir, savaş ve
// sefer modülleri buradan okur. d.seferEtki = { anahtar: kalan sefer }; kalkışta tarim.js erzakYukle doldurur,
// eve kenetlenince seferBitti bir azaltır.
//   peksimet    uzun seferden sonra moral düşmez         guvec     savaşta stres yok
//   konsantre   fener menzili ×1,25                     kahve     fener menzili ×1,15
//   kalibrasyon fener menzili ×1,15                     fotonik   fener menzili ×2
//   ziyafet     savaşta ilk iki uyarıya +1 sn           kronos    her uyarıya +1,5 sn
//   merhem      çatışma sonunda stres yarıya            kriyo     yenilgide yas yok (bir kez)
//   katalizor   yakıt ×0,5                              sogutucu  itiş (hız) ×1,2
//   macun       gövde yarının altına inince +%30 (bir kez)
//   kalkan      alınan savaş hasarı ×0,8                lens      verilen savaş hasarı ×1,2

export function etkiVar(d, k) {
  return !!(d.seferEtki && d.seferEtki[k] > 0);
}

export function fenerCarpani(d) {
  return (etkiVar(d, 'fotonik') ? 2 : 1) * (etkiVar(d, 'konsantre') ? 1.25 : 1) * (etkiVar(d, 'kahve') ? 1.15 : 1) * (etkiVar(d, 'kalibrasyon') ? 1.15 : 1);
}
export function yakitCarpani(d) {
  return etkiVar(d, 'katalizor') ? 0.5 : 1;
}
export function hizCarpani(d) {
  return etkiVar(d, 'sogutucu') ? 1.2 : 1;
}
export function alinanHasarCarpani(d) {
  return (etkiVar(d, 'kalkan') ? 0.8 : 1) * (d.bayrak && d.bayrak.koruyucu_tabaka ? 0.9 : 1);
}
export function verilenHasarCarpani(d) {
  return etkiVar(d, 'lens') ? 1.2 : 1;
}
// Savaş uyarısına eklenen savunma süresi (saniye); ziyafet ilk iki uyarıda
export function uyariEki(d, s) {
  let ek = etkiVar(d, 'kronos') ? 1.5 : 0;
  if (etkiVar(d, 'ziyafet') && (s.ziyafetSay || 0) < 2) {
    s.ziyafetSay = (s.ziyafetSay || 0) + 1;
    ek += 1;
  }
  return ek;
}
