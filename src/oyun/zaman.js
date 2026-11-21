// Yıldız Zamanı: altı nöbetli gün döngüsü (belgeler/tonoflenya-ve-yeni-sistemler-gelistirici-yonergesi.md bölüm 4).
// Bir oyun günü altı nöbet; her nöbet hızlandırılmış ölçekte 20 dakika. Zaman her modda akar (yüzeyde, gemide,
// uzayda): seferden dönünce tarlalar büyümüş, atölyeler bitmiş olur. Saf JavaScript.
//
// d.zaman = { sn }  oyunun başından beri geçen oyun süresi. Gün 1, Gümüş Şafak nöbetinde başlar.

export const NOBET_SN = 1200;
export const GUN_SN = NOBET_SN * 6;

// akor: nöbet değişiminde çalan rezonans çanı (Hz, üç nota; konumsal motorun çan tınısı)
export const NOBETLER = [
  { ad: 'Gümüş Şafak', yildiz: 'Zhaor', isik: 'gümüşi parlak alacakaranlık', etki: 'Sabah pazarının açılış çanları.', akor: [523, 659, 784] },
  { ad: 'Kızıl Kuşluk', yildiz: 'Varek', isik: 'sıcak kırmızı gün ışığı', etki: 'Askeri talimler ve sanayi vardiyası.', akor: [196, 247, 294] },
  { ad: 'Yeşil Öğle', yildiz: 'Axira', isik: 'canlı yeşil parıltı', etki: 'Bitki fotosentezi zirvede: tarlalar daha hızlı büyür.', akor: [349, 440, 523] },
  { ad: 'Mor İkindi', yildiz: 'Elyndra', isik: 'derin mor gölgeler', etki: 'Akademi dersleri, büyü deneyleri.', akor: [311, 370, 466] },
  { ad: 'Mavi Akşam', yildiz: 'Sinha', isik: 'mavi huzur ışığı', etki: 'Liman fenerleri, sakin müzikler.', akor: [131, 165, 196] },
  { ad: 'Altın Gece', yildiz: 'Uma', isik: 'sarı yıldız karanlığı', etki: 'Gece pazarları, gölge yaratıklar. Isıtılmayan seralar soğur.', akor: [220, 277, 330] },
];

function z(d) {
  if (!d.zaman) d.zaman = { sn: 0 };
  return d.zaman;
}

export function gun(d) {
  return Math.floor(z(d).sn / GUN_SN) + 1;
}
export function nobetNo(d) {
  return Math.floor((z(d).sn % GUN_SN) / NOBET_SN);
}
export function nobet(d) {
  return NOBETLER[nobetNo(d)];
}
export function kalanSn(d) {
  return NOBET_SN - (z(d).sn % NOBET_SN);
}

// Her karede çağrılır; nöbet değişince bir olay döner
export function zamanAkit(d, dt) {
  const t = z(d);
  const once = Math.floor(t.sn / NOBET_SN);
  t.sn += dt;
  const sonra = Math.floor(t.sn / NOBET_SN);
  if (sonra === once) return [];
  const n = nobet(d);
  return [{ tur: 'nobet', no: nobetNo(d), akor: n.akor, acil: false, nobetMetni: n.ad + ' nöbeti devrede (' + n.yildiz + ' ışığı). ' + n.etki }];
}

// İleri sarma (ör. uzun yolculuk); dönen olaylar yalnız son nöbeti bildirir
export function ileriSar(d, sn) {
  const o = zamanAkit(d, sn);
  return o;
}

// Hâkim yıldızın gücü (Malken medeniyeti bölüm 1): her nöbette o yıldızın işi güçlenir.
//   Zhaor fener (zihin, telepati) ×1,1 · Varek üretim (dökümhane, plazma) ×1,15 · Axira tarla ×1,25 (tarim.js) ·
//   Elyndra aether ayarları (melezleme eşiği) ×1,5 · Sinha hız ×1,1 ve alınan savaş hasarı ×0,9 · Uma nüfus ×1,2
export function yildizCarpani(d, is) {
  if (!d || !d.zaman) return 1;
  const y = nobet(d).yildiz;
  if (is === 'fener') return y === 'Zhaor' ? 1.1 : 1;
  if (is === 'uretim') return y === 'Varek' ? 1.15 : 1;
  if (is === 'aether') return y === 'Elyndra' ? 1.5 : 1;
  if (is === 'hiz') return y === 'Sinha' ? 1.1 : 1;
  if (is === 'hasar') return y === 'Sinha' ? 0.9 : 1;
  if (is === 'nufus') return y === 'Uma' ? 1.2 : 1;
  return 1;
}

export function zamanMetni(d, ek) {
  const n = nobet(d);
  const dk = Math.ceil(kalanSn(d) / 60);
  return 'Gün ' + gun(d) + ', ' + n.ad + ' nöbeti (' + n.yildiz + ' ışığı, ' + n.isik + '). Bir sonraki nöbete ' + dk + ' dakika var.' + (ek ? ' ' + ek : '');
}
