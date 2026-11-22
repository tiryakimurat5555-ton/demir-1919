// v4 Faz 4: hikâye motoru, kilitli dört binanın karakter hikâyeleri, yabancı firkateyn teması; yüzey bölgeleri
import { describe, expect, test } from 'bun:test';
import { yeniOyun } from '../src/oyun/durum';
import * as G from '../src/oyun/gemi/gemi';
import * as HK from '../src/oyun/hikaye';
import { SAHNELER, zamanIlerle, eylemUygula } from '../src/oyun/yuzey/gorevler';
import { TESISLER } from '../src/oyun/veri/tesisler';
import { NOKTALAR } from '../src/oyun/yuzey/harita';
import { ZAFER_KANCALARI } from '../src/oyun/kancalar';
import * as AR from '../src/oyun/yuzey/arindirma';

function oyun(t = 61) {
  const d = yeniOyun(t);
  d.sahne = null;
  d.zaman = { sn: 0 };
  return d;
}
function sec(d, i = 0) {
  const c = SAHNELER[d.sahne].secenekler(d)[i];
  if (c.yap) c.yap();
  d.sahne = c.sonra;
}
function zafer(d) {
  const sonra = d.savasSonraSahne;
  d.savasBekle = null;
  d.savasSonraSahne = null;
  d.sahne = sonra;
  if (ZAFER_KANCALARI[sonra]) ZAFER_KANCALARI[sonra](d);
}

describe('Hikâye motoru ve Aşama 3', () => {
  test('3A Ortak Hafıza: tetik, telsiz çağrısı, uzay çatışması, karar; akademi açılır', () => {
    const d = oyun();
    G.gemiOlustur(d, 2);
    expect(TESISLER.akademi.kosul(d)).toBe(false);
    d.tamamlananOp = ['sektor15', 'xerad'];
    zamanIlerle(d, 0.1);
    expect(d.hikaye.bekleyen).toContain('akademi');
    expect(d.sahne).toBe('hk_giris');
    expect(SAHNELER.hk_giris.metin(d).join(' ')).toContain('Dr. Vael');
    sec(d, 0);
    expect(d.savasBekle.dusmanlar).toContain('dron_tasiyici');
    zafer(d);
    expect(d.sahne).toBe('hk_ara');
    sec(d, 0);
    expect(d.sahne).toBe('hk_karar');
    sec(d, 1);
    expect(d.sahne).toBe('hk_sonuc');
    expect(d.bayrak.akademiAskeri).toBe(true);
    expect(TESISLER.akademi.kosul(d)).toBe(true);
    expect(HK.karari(d, 'akademi')).toBe(1);
  });

  test('3B Nefes Alacak Bir Gök: metan bedeli, vana operasyonu, kriyo pusucuları, karar', () => {
    const d = oyun(62);
    d.tamamlananOp = ['g14', 'moloz_kusagi'];
    HK.hikayeIlerle(d);
    expect(d.sahne).toBe('hk_giris');
    // Metan yoksa başlamaz
    expect(SAHNELER.hk_giris.secenekler(d)[0].etiket).toContain('eksik');
    d.koloni.kaynaklar.metan = 3;
    sec(d, 0);
    expect(d.koloni.kaynaklar.metan).toBe(0);
    expect(d.opBekle).toBe('hk_kseno_habitat_0');
    // Operasyon biter
    d.opBekle = null;
    d.sahne = 'hk_ara';
    sec(d, 0);
    expect(d.savasBekle.dusmanlar).toEqual(['kriyo_pusucusu', 'kriyo_pusucusu']);
    zafer(d);
    sec(d, 0);
    sec(d, 1);
    expect(TESISLER.kseno_habitat.kosul(d)).toBe(true);
    expect(d.itibar).toBeGreaterThanOrEqual(300);
  });

  test('Sonra denirse bir nöbet bekler; yarım kalan hikâye bekleyenlere döner', () => {
    const d = oyun(63);
    d.bayrak.vaka6_tina = true;
    HK.hikayeIlerle(d);
    expect(d.sahne).toBe('hk_giris');
    sec(d, 1);
    expect(d.sahne).toBe(null);
    HK.hikayeIlerle(d);
    expect(d.sahne).toBe(null);
    d.zaman.sn += 1201;
    HK.hikayeIlerle(d);
    expect(d.sahne).toBe('hk_giris');
    sec(d, 0);
    expect(d.savasBekle.dusmanlar).toEqual(['yabanci_firkateyn']);
    // Yenilgi: çatışma bitti, sahne yok
    d.savasBekle = null;
    d.savasSonraSahne = null;
    HK.hikayeIlerle(d);
    expect(d.hikaye.aktif).toBe(null);
    expect(d.hikaye.bekleyen).toContain('tina_cekirdegi');
  });

  test('3C, 3D, 3E: Tina, mülteciler, firkateyn teması devriyeleri açar', () => {
    const d = oyun(64);
    G.gemiOlustur(d, 3);
    d.koloni.binalar.push('sinyal_kulesi');
    d.bayrak.vaka6_tina = true;
    d.tamamlananOp = ['aethel9', 'tarras'];
    d.harita.poiler.push('p05');
    for (const beklenen of ['tina_cekirdegi', 'multeci_kampusu', 'firkateyn']) {
      HK.hikayeIlerle(d);
      expect(d.hikaye.aktif).toBe(beklenen);
      sec(d, 0);
      zafer(d);
      sec(d, 0);
      if (d.sahne === 'hk_karar') sec(d, 1);
      expect(d.sahne).toBe('hk_sonuc');
      d.sahne = null;
    }
    expect(d.bayrak.tinaTaktik).toBe(true);
    expect(TESISLER.tina_cekirdegi.kosul(d)).toBe(true);
    expect(TESISLER.multeci_kampusu.kosul(d)).toBe(true);
    expect(d.bayrak.firkateynTemas).toBe(true);
    expect(d.koloni.kaynaklar.piezo).toBe(4);
    expect(HK.hikayeMenu(d).ogeler.length).toBe(3);
  });
});

describe('Dokuz yüzey bölgesi', () => {
  test('karakol yerleri; izolasyonda bölgenin kara düşmanı, zaferde ilerleme; karakol kazancı', () => {
    for (const m of ['dogu', 'civa', 'lav', 'mantar', 'kriyo', 'obsidyen', 'kuleler', 'tuneller', 'vaha']) {
      expect(AR.ARINDIRMA[m]).toBeTruthy();
      expect(AR.BOLGE_DETAY[m].kazanc).toBeTruthy();
      expect(Object.values(NOKTALAR).some((n) => n.karakol === m)).toBe(true);
    }
    const d = oyun(65);
    d.koloni.bolgeDurumu = { obsidyen: 1 };
    expect(eylemUygula(d, 'karakol_obsidyen', 'a_izole').ses).toBe('red');
    d.koloni.parcalar.sonik_kovucu = 1;
    const r = eylemUygula(d, 'karakol_obsidyen', 'a_izole');
    expect(r.kapat).toBe(true);
    expect(d.savasBekle.dusmanlar).toEqual(['kristal_akrep', 'kristal_akrep']);
    zafer(d);
    expect(d.sahne).toBe('bolge_izole');
    expect(d.koloni.bolgeDurumu.obsidyen).toBe(2);
    expect(d.koloni.parcalar.sonik_kovucu).toBe(0);
    // Güvenli bölgenin karakolu sürekli kazanç verir
    d.koloni.bolgeDurumu.obsidyen = 4;
    d.sahne = null;
    const pc = d.koloni.kaynaklar.plazma_cami || 0;
    for (let i = 0; i < 40; i++) zamanIlerle(d, 5);
    expect((d.koloni.kaynaklar.plazma_cami || 0)).toBeGreaterThan(pc);
  });
});
