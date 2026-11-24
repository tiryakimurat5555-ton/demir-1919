// Koloni büyü bulmacalarının yeni noktaları (belgeler/v6 Paket 1-2; koloni çapası). yuzey/harita.js birleştirir.
// Vadideki enkaz, tapınak, okul ve gözlem tepesindeki bulmacalar var olan noktalara eylem olarak eklenir (buyu/koloni.js).
// Maden kat 30 galerisi: x 4200 + 40 × 6 = 4440 batısı, 24 m genişlik.
export const B_NOKTALAR = {
  kizil_muhur: { mekan: 'maden_30', x: 4460, y: 15, ad: 'Kızıl damar mührü', yaricap: 2.2, buyuNoktasi: true, gorunur: (d) => !!(d.buyu && d.buyu.asa > 0), tarif: 'Galerinin dibinde, kazmanın sekip geçtiği pürüzsüz bir taş yüz. Arkasından sıcak, kızıl bir uğultu geliyor.' },
  batik_sandik: { mekan: 'kiyi', x: 4668, y: 3, ad: 'Kayalık koydaki batık sandık', yaricap: 2.4, buyuNoktasi: true, gorunur: (d) => !!(d.buyu && d.buyu.asa > 0), tarif: 'Dalgaların arasında, kayaya sıkışmış eski bir sandık. Her dalga çekilişinde kapağından mavi bir parıltı.' },
  kurumus_kaynak: { mekan: 'vaha', x: 2818, y: 30, ad: 'Kurumuş kaynak', yaricap: 2.2, buyuNoktasi: true, gorunur: (d) => !!(d.buyu && d.buyu.asa > 0), tarif: 'Kalsit duvarın dibinde kurumuş bir kaynak ağzı. Çatlaktan kükürtlü bir buhar sızıyor; dibinde yeşil bir şey parlıyor.' },
};
