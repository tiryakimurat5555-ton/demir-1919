// Yerleşimcilerin o nöbette bulunduğu yer (Paket 1 nöbet programları). dunya.js buradan alır; bağımlılığı az tutulur
// (veri.js, yerlesim/harita.js, zaman.js) ki yuzey/dunya.js ile döngü olmasın.
import { PROGRAM_YERI, YERLESIMCILER, YERLESIMCI_SIRASI, YERLESIM_BINALARI } from './veri';
import { icMerkez } from './harita';
import { nobet, nobetNo } from '../zaman';

export const yerVar = (d, id) => !!(d.yer && d.yer.binalar && d.yer.binalar.includes(id));
export const katildiMi = (d, id) => !!(d.yer && d.yer.katilan && d.yer.katilan.includes(id));
// Koloni Meydanı kurulunca öncü mürettebat da nöbet programına göre yaşar (öncesinde görevdeki yerlerinde)
export const programAktif = (d) => yerVar(d, 'meydan');

// Kişi kimliği (harita.js KISILER) → yerleşimci kimliği
export function yerlesimciKimligi(kisiId) {
  if (kisiId && kisiId.indexOf('y_') === 0) return kisiId.slice(2);
  for (const id of YERLESIMCI_SIRASI) if (YERLESIMCILER[id].kisi === kisiId) return id;
  return null;
}
export function kisiKimligi(yid) {
  const y = YERLESIMCILER[yid];
  return y && y.kisi ? y.kisi : 'y_' + yid;
}

const YER_EYLEM = {
  mutfak: 'ocağın başında', kantin: 'kantinde', sera: 'sera yataklarının arasında', meydan: 'meydanda, tezgâhların yanında',
  taverna: 'tavernada bir masada', atolye: 'tezgâhın başında', santral: 'santral panellerini kontrol ediyor', revir: 'revirde',
  enstitu: 'laboratuvar masasında', hastane: 'hasta yatağının yanında', okul: 'sıraların arasında', arsiv: 'arşiv raflarında',
  hamam: 'havuzun kenarında', gozlem: 'tepede gökyüzünü dinliyor', cantepe: 'çanların akordunu yapıyor', dokumhane: 'döküm kalıplarının başında',
  maden: 'maden aletlerini biliyor', reaktor: 'reaktör planlarının başında', tersane: 'tersane çizimlerine eğilmiş', hangar: 'araçların bakımında',
  gol: 'havuz suyunu inceliyor', dis_kapi: 'dış kapıda nöbette', kamp: 'ateşin başında', evler: 'evinde', kubbe: 'kubbesinde dinleniyor',
  tapinak: 'tapınakta', terminal: 'terminalin ışıklarında',
};

// Kamp ateşinin çevresi (vadi): yerleşimciler ateşin etrafında halka olur
function kampYeri(i) {
  const a = (i / YERLESIMCI_SIRASI.length) * Math.PI * 2;
  return { mekan: 'vadi', x: 6 + Math.cos(a) * 3.4, y: -4 + Math.sin(a) * 3.4 };
}

export function programYeri(d, yid) {
  const y = YERLESIMCILER[yid];
  return y.program[nobet(d).yildiz] || 'kamp';
}

// Yerleşimcinin şu anki yeri: { mekan, x, y, eylem, yer (program yeri), bina } ya da null (katılmamış ya da
// öncü mürettebat programa geçmemiş)
export function kisiKonumu(d, yid) {
  const y = YERLESIMCILER[yid];
  if (!y || !katildiMi(d, yid)) return null;
  if (y.kisi && !programAktif(d)) return null;
  const i = YERLESIMCI_SIRASI.indexOf(yid);
  const yer = programYeri(d, yid);
  const hedef = PROGRAM_YERI[yer] || 'kamp';
  const eylem = YER_EYLEM[yer] || 'işinin başında';
  // Festival süresince herkes meydanda, festival alanının çevresinde (v5 3A bölüm 6)
  if (d.festival && d.festival.aktif && yerVar(d, 'meydan')) {
    const a = (i / YERLESIMCI_SIRASI.length) * Math.PI * 2;
    return { mekan: 'meydan', x: 3230 + Math.cos(a) * 7, y: 34 + Math.sin(a) * 4, eylem: 'kutlamada', yer: 'meydan', bina: 'meydan' };
  }
  // Paket 4: Kaptan'ın eşi akşamları (Mor İkindi sonrası) kamaraya döner
  if (d.aile && d.aile.es === yid && yerVar(d, 'kamara') && nobetNo(d) >= 4) {
    const m = icMerkez('kamara');
    return { mekan: YERLESIM_BINALARI.kamara.mekan, x: m.x - 3, y: m.y, eylem: 'kamarada, seninle', yer: 'kamara', bina: 'kamara' };
  }
  const dx = ((i % 4) - 1.5) * 3.2;
  const dy = (Math.floor(i / 4) % 4) * 2.2;
  if (hedef === 'sera' && d.bayrak && d.bayrak.sondaj) return { mekan: 'tarim', x: 3010 + dx, y: 9 + dy, eylem, yer, bina: 'sera' };
  if (hedef === 'revir') return { mekan: 'kapsul', x: 301 + (i % 3) * 1.6, y: 2.5 + (Math.floor(i / 3) % 2) * 2.5, eylem, yer, bina: 'revir' };
  if (hedef === 'meydan' && yerVar(d, 'meydan')) return { mekan: 'meydan', x: 3230 + ((i % 8) - 3.5) * 4.5, y: i < 8 ? 18 : 33, eylem, yer, bina: 'meydan' };
  if (YERLESIM_BINALARI[hedef] && hedef !== 'kamp' && hedef !== 'meydan' && yerVar(d, hedef)) {
    const m = icMerkez(hedef);
    return { mekan: YERLESIM_BINALARI[hedef].mekan, x: m.x + dx * (m.gen > 20 ? 2 : 1), y: 4 + dy, eylem, yer, bina: hedef };
  }
  return { ...kampYeri(i), eylem: 'kamp ateşinin başında', yer: 'kamp', bina: 'kamp' };
}
