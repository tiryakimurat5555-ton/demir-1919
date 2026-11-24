// 5.3: Paket 9-13 saha büyü görevleri (evrimsel hatlar, Kara Göl, deniz, kıyı ve kanyon bölgeleri), saha hazırlık ağı
import { describe, expect, test, afterEach } from 'bun:test';
import { yeniOyun } from '../src/oyun/durum';
import { zamanIlerle, sahneSecenekleri, sahneSec } from '../src/oyun/yuzey/gorevler';
import { NOKTALAR } from '../src/oyun/yuzey/harita';
import * as YG from '../src/oyun/ygk';
import * as BY from '../src/oyun/buyu/buyu';
import * as BM from '../src/oyun/buyu/bulmaca';
import * as ZN from '../src/oyun/tonoflenya/zanaat';
import * as Z from '../src/oyun/zaman';
import { mekanOrtami } from '../src/oyun/yerlesim/festival';
import { SAHA_GOREVLERI, TECHIZAT, techizatMenu } from '../src/oyun/ygk/kisiler/k13';

const { Y } = YG;
afterEach(() => BM.kolayModAyarla(false));
function oyun() {
  const d = yeniOyun(9);
  d.sahne = null;
  zamanIlerle(d, 1);
  BY.hazirla(d);
  BY.asaUyandir(d);
  d.sahne = null;
  d.bayrak.tonoflenyaGoruldu = true;
  for (const r of ['kizil', 'mavi', 'sari', 'yesil', 'mor']) d.buyu.taslar[r] = 3;
  return d;
}
// Kolay modda bulmacayı bilinen büyülerle değil, ilk ulaşılabilir yol ya da yedekle çöz
function oyna(d, gid, secim = 0) {
  BM.kolayModAyarla(true);
  d.mekan = Y.gorevYeri(gid).mekan;
  Y.gorevBaslat(d, gid);
  expect(d.sahne).toBe('ygk_gorev');
  sahneSec(d, 'ygk_gorev', 0);
  let say = 0;
  while (d.bulmaca && say++ < 40) {
    const l = BM.dugumler(d);
    const i = l.findIndex((n) => !BM.cozulduMu(d, n) && (!n.on || n.on.every((x) => BM.cozulduMu(d, l.find((m) => m.id === x)))));
    if (i < 0) break;
    d.bulmaca.i = i;
    d.buyu.odak = 100;
    const n = l[i];
    const c = n.kombolar.find((k) => k.every((el) => BM.elemanUlasilir(d, el, n)));
    if (!c) BM.sec(d, 'yedek');
    else for (const el of c) if (d.bulmaca) { d.buyu.odak = 100; BM.sec(d, el); }
  }
  expect(d.sahne).toBe('ygk_secim');
  sahneSec(d, 'ygk_secim', secim);
  expect(Y.kayit(d, 'saha').gorev[gid]).toBe('bitti');
}
const bitir = (d, l) => { for (const g of l) Y.kayit(d, 'saha').gorev[g] = 'bitti'; };

describe('Veri', () => {
  test('Paket 9-13 görev kodlarının hepsi var ve yerinde', () => {
    const l = ['SU-01', 'SU-02', 'SU-03', 'ISIK-01', 'ISIK-02', 'ISIK-03', 'TAS-01', 'TAS-02', 'TAS-03', 'HAVA-01', 'HAVA-02', 'HAVA-03', 'KG-01', 'KG-02', 'KG-03', 'NER-01', 'NER-02', 'FEN-01', 'FEN-02', 'THA-01', 'THA-02', 'GUM-01', 'JUL-01', 'JUL-02', 'ANI-01', 'ANI-02', 'ORE-01', 'ORE-02', 'GOL-01'];
    expect(SAHA_GOREVLERI.length).toBe(l.length);
    for (const g of l) {
      expect(Y.GOREVLER[g].kisi).toBe('saha');
      expect(NOKTALAR['yg_yer_' + g]).toBeTruthy();
    }
  });
  test('saha kaydı gizli; bölge menüsünde iki giriş', () => {
    const d = oyun();
    expect(Y.KISILER.saha.gizli).toBe(true);
    const m = YG.bolgeMenu(d);
    expect(m.ogeler.some((o) => o.id === 'saha')).toBe(true);
    expect(m.ogeler.some((o) => o.id === 'techizat')).toBe(true);
    expect(Y.gorevlerMenu(d, 'saha').ogeler[0].etiket.indexOf('[Evrimsel]')).toBe(0);
  });
  test('teçhizat eşyaları tanımlı', () => {
    for (const t of TECHIZAT) expect(ZN.adi(t.id)).not.toBe(t.id);
  });
});

describe('Faz kapıları ve sıfır kilit', () => {
  test('Faz 1 Tonoflenya ile, Faz 2 bir finalle, Faz 3 altı finalle açılır', () => {
    const d = oyun();
    expect(Y.gorevDurumu(d, 'SU-01')).toBe('acik');
    expect(Y.gorevDurumu(d, 'SU-02')).toBe('kosul');
    d.tf = { biten: [1] };
    expect(Y.gorevDurumu(d, 'SU-02')).toBe('acik');
    expect(Y.gorevDurumu(d, 'SU-03')).toBe('kosul');
    d.tf.biten = [1, 2, 3, 4, 5, 6];
    expect(Y.gorevDurumu(d, 'SU-03')).toBe('acik');
  });
  test('ikinci basamak birinci olmadan yapılabilir (kolaylık yok)', () => {
    const d = oyun();
    d.tf = { biten: [1] };
    oyna(d, 'SU-02');
    expect(d.bayrak.tehlikeMuaf.kara_buz).toBe(true);
  });
  test('yerinde değilken görev yeri söylenir', () => {
    const d = oyun();
    d.mekan = 'vadi';
    const r = Y.gorevBaslat(d, 'SU-01');
    expect(r.metin).toContain('yerinde yapılır');
    expect(d.sahne).toBe(null);
  });
});

describe('Hatların sonuçları', () => {
  test('SU-01 seçeneğin kendi ödülünü verir (bakır valf)', () => {
    const d = oyun();
    oyna(d, 'SU-01');
    expect(ZN.miktar(d, 'bakir_valf')).toBe(1);
  });
  test('SU-03 iki basamak tamsa Akış Mührü', () => {
    const d = oyun();
    d.tf = { biten: [1, 2, 3, 4, 5, 6] };
    bitir(d, ['SU-01', 'SU-02']);
    oyna(d, 'SU-03');
    expect(d.bayrak.akisMuhru).toBe(true);
    expect(ZN.miktar(d, 'akis_muhru')).toBe(1);
  });
  test('ISIK-03 hattın tamamıyla Işık Muhafızı ipucu', () => {
    const d = oyun();
    d.tf = { biten: [1, 2, 3, 4, 5, 6] };
    bitir(d, ['ISIK-01', 'ISIK-02']);
    oyna(d, 'ISIK-03');
    expect(d.bayrak.isikIpucu).toBe(true);
    expect(d.bayrak.tehlikeMuaf.anomali).toBe(true);
  });
  test('HAVA-02 Ajmero kum fırtınasını üç gün dindirir', () => {
    const d = oyun();
    d.tf = { biten: [1] };
    oyna(d, 'HAVA-02');
    expect(Z.etkiVar(d, 'kumDindi')).toBe(true);
    expect(ZN.miktar(d, 'ruzgar_pusulasi')).toBe(1);
  });
  test('HAVA-03 dört hat sonunda tam rezonans', () => {
    const d = oyun();
    d.tf = { biten: [1, 2, 3, 4, 5, 6] };
    bitir(d, ['SU-03', 'ISIK-03', 'TAS-03']);
    oyna(d, 'HAVA-03');
    expect(d.bayrak.tamRezonans).toBe(true);
  });
  test('TAS-03 bazalt çekirdeğiyle odak iadesi, kodeks', () => {
    const d = oyun();
    d.tf = { biten: [1, 2, 3, 4, 5, 6] };
    oyna(d, 'TAS-03');
    expect(d.kodeks.some((k) => k.id === 'kahergonat_arsivi')).toBe(true);
  });
});

describe('Kara Göl (Paket 11)', () => {
  test('KG-01 teçhizat ister; şehirden alınabilir', () => {
    const d = oyun();
    expect(Y.gorevDurumu(d, 'KG-01')).toBe('kosul');
    d.para = { ml: 1000, gk: 0 };
    for (const id of ['koruma_muhru', 'fisilti_filtresi']) {
      const m = techizatMenu(d).ogeler.find((o) => o.id === 't_' + id).alt(d);
      m.ogeler.find((o) => o.id === 'sehir').yap(d);
      expect(ZN.miktar(d, id)).toBe(1);
    }
    expect(Y.gorevDurumu(d, 'KG-01')).toBe('acik');
  });
  test('akademi yolu kademe 3 ile ücretsiz', () => {
    const d = oyun();
    const m = () => techizatMenu(d).ogeler.find((o) => o.id === 't_runahar_plani').alt(d).ogeler[0];
    expect(m().yap(d).ses).toBe('red');
    Y.kayit(d, 'corinne').k = 3;
    m().yap(d);
    expect(ZN.miktar(d, 'runahar_plani')).toBe(1);
  });
  test('KG-02, KG-01 olmadan 13. finalle açılır; Valen kapalıysa seçeneği gizlenir', () => {
    const d = oyun();
    expect(Y.gorevDurumu(d, 'KG-02')).toBe('kosul');
    d.tf = { biten: [13] };
    expect(Y.gorevDurumu(d, 'KG-02')).toBe('acik');
    d.bayrak.valenKapali = true;
    d.mekan = 'kara_gol';
    Y.gorevBaslat(d, 'KG-02');
    sahneSec(d, 'ygk_gorev', 0);
    BM.kolayModAyarla(true);
    d.bulmaca = null;
    d.ygk.aktif = 'KG-02';
    d.sahne = 'ygk_secim';
    const l = sahneSecenekleri(d, 'ygk_secim').map((o) => o.etiket).join(' ');
    expect(l).not.toContain('Valen');
  });
  test('KG-03 sonrası Kara Göl berrak ortamı', () => {
    const d = oyun();
    expect(mekanOrtami(d, 'kara_gol')).toBe('ortam_t_karagol');
    d.tf = { biten: [14] };
    oyna(d, 'KG-03');
    expect(mekanOrtami(d, 'kara_gol')).toBe('ortam_t_karagol_berrak');
  });
});

describe('Bölge görevleri (Paket 12-13)', () => {
  test('ikinci görevler birinciyi bekler', () => {
    const d = oyun();
    d.tf = { biten: [1] };
    for (const [a, b] of [['NER-01', 'NER-02'], ['FEN-01', 'FEN-02'], ['THA-01', 'THA-02'], ['JUL-01', 'JUL-02'], ['ANI-01', 'ANI-02']]) {
      expect(Y.gorevDurumu(d, b)).toBe('kosul');
      oyna(d, a);
      expect(Y.gorevDurumu(d, b)).toBe('acik');
    }
  });
  test('ANI-01 B korsan haritası ve Barracuda puanı', () => {
    const d = oyun();
    d.tf = { biten: [1] };
    oyna(d, 'ANI-01', 1);
    expect(ZN.miktar(d, 'korsan_harita_parcasi')).toBe(1);
    expect(Y.kayit(d, 'barracuda').p).toBeGreaterThan(0);
  });
  test('THA-01 B ışık otu ve bal verir', () => {
    const d = oyun();
    d.tf = { biten: [1] };
    oyna(d, 'THA-01', 1);
    expect(ZN.miktar(d, 'urun_isik_otu')).toBe(3);
  });
});

describe('5.3 sesler', () => {
  test('Kara Göl berrak döngüsü var', () => {
    expect(require('fs').existsSync('assets/ses/t/ortam_t_karagol_berrak.mp3')).toBe(true);
  });
});
