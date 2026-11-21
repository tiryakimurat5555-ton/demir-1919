// Tarım noktalarının eylemleri (gorevler.js yönlendirir). Saf JavaScript.
//   sera_konsolu    seraların durumu, tohum ambarı, hasat işleme, kolonist atama, genişletme, melezleme, beslenme,
//                   bitki ansiklopedisi
//   ekim_teraslari  tarla katmanı (sera: teraslar ve kseno-bölmeler)
//   vaha_parselleri tarla katmanı (saklı vahanın açık toprağı)
//   yabani_*        yabani bitkiden tohum toplama
//   vanguard_enkaz  (ek) Vanguard-01'in tohum kasaları
import { NOKTALAR } from '../yuzey/harita';
import * as T from './tarim';

export function noktaMi(id) {
  return !!(NOKTALAR[id] && NOKTALAR[id].tarim);
}

export function ekEylemler(d, id) {
  if (id === 'vanguard_enkaz' && !(d.tarim && d.tarim.kasa)) return [{ id: 't_kasa', etiket: 'Tohum kasalarını aç', ipucu: 'Vanguard-01\'in genetik tohum kasaları.' }];
  return [];
}
export function ekEylemMi(eylemId) {
  return eylemId === 't_kasa';
}

export function noktaEylemleri(d, id) {
  const n = NOKTALAR[id];
  if (n.tarim === 'yabani') return [{ id: 't_topla', etiket: 'Tohum topla', ipucu: 'İki tohum.' }, { id: 'incele', etiket: 'İncele' }];
  if (n.tarim === 'sera' || n.tarim === 'vaha') return [{ id: 't_tarla', etiket: 'Yataklara geç', ipucu: 'Çapala, ek, sula, ısıyı ayarla, hasat et.' }, { id: 't_durum', etiket: 'Durum' }, { id: 'incele', etiket: 'İncele' }];
  const e = [
    { id: 't_durum', etiket: 'Seraların durumu' },
    { id: 't_tohum', etiket: 'Tohum ambarı ve hasat deposu' },
    { id: 't_isle', etiket: 'Hasat işleme', ipucu: 'Mutfak, eczane ve biyo-dökümhane tarifleri.' },
    { id: 't_isci', etiket: 'Kolonist ata', ipucu: 'Yataklara işçi: sulama, sıcaklık ve hasat otomatik.' },
    { id: 't_kademe', etiket: 'Serayı genişlet' },
  ];
  if (d.koloni.binalar.includes('biyo_kubbe')) e.push({ id: 't_melez', etiket: 'Melezleme', ipucu: 'İki tohumun biyo-titreşimini tek harmonide birleştir.' });
  e.push({ id: 't_besin', etiket: 'Beslenme matrisi' }, { id: 't_ansiklopedi', etiket: 'Bitki ansiklopedisi' }, { id: 'incele', etiket: 'İncele' });
  return e;
}

export function eylemUygula(d, id, eylemId) {
  const n = NOKTALAR[id];
  if (eylemId === 't_kasa') return T.kasaAc(d);
  if (eylemId === 'incele') return { metin: n.tarif || n.ad };
  if (eylemId === 't_topla') return T.yabaniTopla(d, id);
  if (!T.acikMi(d) && n.tarim !== 'yabani') return { metin: 'Seraya henüz ısı gelmiyor.', ses: 'red' };
  if (eylemId === 't_tarla') return { tarla: n.tarim };
  if (eylemId === 't_durum') return { metin: T.durumMetni(d) };
  if (eylemId === 't_tohum') return { metin: T.tohumMetni(d) + ' ' + T.depoMetni(d) };
  if (eylemId === 't_besin') return { metin: T.besinMetni(d) };
  if (eylemId === 't_isle') return { tarimMenu: 'isle' };
  if (eylemId === 't_isci') return { tarimMenu: 'isci' };
  if (eylemId === 't_kademe') return { tarimMenu: 'kademe' };
  if (eylemId === 't_melez') return { tarimMenu: 'melez' };
  if (eylemId === 't_ansiklopedi') return { tarimMenu: 'ansiklopedi' };
  return { metin: '' };
}
