// Konumsal ses motoru (deneme). Expo Go'daki ses kütüphanesinde sağ-sol ve ön-arka konumlandırma yok;
// bu yüzden görünmez bir WebView içinde tarayıcının Web Audio API'si kullanılır (PannerNode, HRTF).
// WebView Expo Go'nun içinde gelir; ayrı bir uygulama kurmak gerekmez.
//
// Komutlar (ref üzerinden):
//   baslat()                         ses bağlamını açar
//   kaynak(id, tur, nokta)           ses kaynağı ekler ya da yerini değiştirir. tur: 'zil', 'deniz', 'cekic'
//   dinleyici(d)                     { x, y, yon } dinleyicinin yeri ve yönü
//   adim()                           ayak sesi (dinleyicinin kendi yerinde)
//   model(ad)                        'HRTF' ya da 'equalpower'
//   yukle(ad, modul)                 bir ses dosyasını (require ile) motora yükler; tek kanala indirir
//   dosyaKaynak(id, ad, nokta, aralik) yüklenmiş sesi bir noktadan, aralik ms'de bir çalar
//   sil(id)                          kaynağı kaldırır
//   tek(ad, nokta, duzey)            yüklenmiş sesi bir noktadan bir kez çalar
//   boguk(acik)                      içerideyken dışarıdaki sesleri boğar (duvar arkası)
//   durdur()
// kaynak türleri: 'zil', 'cekic', 'deniz', 'ayak' (yürüyen birinin ayak sesleri)
// Motor hazır olunca ve hata olursa onMesaj({ tur, ... }) çağrılır.
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';
import * as DosyaSistemi from 'expo-file-system';
import { sesKoordinati, sesYonu } from '../oyun/konum';

// WebView içinde çalışan motor. Basit sesler (zil, çekiç, deniz, ayak) kodla üretilir; ötekiler yüklenen dosyalardan çalınır.
const MOTOR_HTML = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body><script>
(function(){
  var ctx = null, model = 'HRTF', kaynaklar = {}, ana = null, suzgec = null;
  function bildir(o){ try { window.ReactNativeWebView.postMessage(JSON.stringify(o)); } catch(e){} }
  function baglam(){
    if (ctx) return ctx;
    try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch(e){}
    var C = window.AudioContext || window.webkitAudioContext;
    ctx = new C();
    ana = ctx.createGain(); ana.gain.value = 0.9;
    suzgec = ctx.createBiquadFilter(); suzgec.type = 'lowpass'; suzgec.frequency.value = 20000;
    ana.connect(suzgec); suzgec.connect(ctx.destination);
    var l = ctx.listener;
    if (l.forwardX) { l.forwardX.value = 0; l.forwardY.value = 0; l.forwardZ.value = -1; l.upX.value = 0; l.upY.value = 1; l.upZ.value = 0; }
    return ctx;
  }
  function gurultu(sn){
    var b = ctx.createBuffer(1, Math.floor(ctx.sampleRate * sn), ctx.sampleRate), v = b.getChannelData(0);
    for (var i = 0; i < v.length; i++) v[i] = Math.random() * 2 - 1;
    return b;
  }
  function panner(){
    var p = ctx.createPanner();
    p.panningModel = model; p.distanceModel = 'inverse'; p.refDistance = 2; p.maxDistance = 60; p.rolloffFactor = 1.2;
    p.connect(ana); return p;
  }
  function konumla(p, n){
    if (p.positionX) { p.positionX.value = n.x; p.positionY.value = n.y; p.positionZ.value = n.z; }
    else p.setPosition(n.x, n.y, n.z);
  }
  // Zil: birkaç kısmi tonun sönümlenen toplamı, aralıklarla çalar
  function zilCal(k){
    var t = ctx.currentTime, frek = [880, 1320, 2093, 2640];
    for (var i = 0; i < frek.length; i++){
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.value = frek[i]; o.type = 'sine';
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.35 / (i + 1), t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1 - i * 0.15);
      o.connect(g); g.connect(k.p); o.start(t); o.stop(t + 1.2);
    }
  }
  // Çekiç: kısa, süzülmüş gürültü vuruşu
  function cekicCal(k){
    var t = ctx.currentTime, s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = gurultu(0.12); f.type = 'bandpass'; f.frequency.value = 1800; f.Q.value = 3;
    g.gain.setValueAtTime(0.9, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.11);
    s.connect(f); f.connect(g); g.connect(k.p); s.start(t);
  }
  // Deniz: sürekli, yavaşça kabarıp inen alçak gürültü
  function denizBaslat(k){
    var s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain(), lfo = ctx.createOscillator(), lg = ctx.createGain();
    s.buffer = gurultu(4); s.loop = true; f.type = 'lowpass'; f.frequency.value = 600;
    g.gain.value = 0.35; lfo.frequency.value = 0.12; lg.gain.value = 0.2;
    lfo.connect(lg); lg.connect(g.gain); s.connect(f); f.connect(g); g.connect(k.p); s.start(); lfo.start();
    k.durdur = function(){ try { s.stop(); lfo.stop(); } catch(e){} };
  }
  function adimCal(hedef, duzey){
    var t = ctx.currentTime, s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = gurultu(0.09); f.type = 'lowpass'; f.frequency.value = 900;
    g.gain.setValueAtTime(duzey || 0.5, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
    s.connect(f); f.connect(g); g.connect(hedef || ana); s.start(t);
  }
  function tekCal(ad, n, duzey){
    var t = tamponlar[ad]; if (!t) return;
    var p = panner(), g = ctx.createGain(), s = ctx.createBufferSource();
    konumla(p, n); g.gain.value = duzey == null ? 1 : duzey;
    s.buffer = t; s.connect(g); g.connect(p); s.start();
    s.onended = function(){ try { p.disconnect(); } catch(e){} };
  }
  function sil(id){
    var k = kaynaklar[id]; if (!k) return;
    if (k.zaman) clearInterval(k.zaman); if (k.durdur) k.durdur();
    try { k.p.disconnect(); } catch(e){}
    delete kaynaklar[id];
  }
  function boguk(acik){
    baglam();
    var t = ctx.currentTime;
    suzgec.frequency.cancelScheduledValues(t);
    suzgec.frequency.setTargetAtTime(acik ? 700 : 20000, t, 0.15);
  }
  var tamponlar = {};
  // Base64 WAV'ı çözer; iki kanallıysa tek kanala indirir (konumlandırma tek kanallı seste doğru çalışır)
  function yukle(ad, b64){
    baglam();
    var ikili = atob(b64), dizi = new Uint8Array(ikili.length);
    for (var i = 0; i < ikili.length; i++) dizi[i] = ikili.charCodeAt(i);
    ctx.decodeAudioData(dizi.buffer, function(t){
      var tek = t;
      if (t.numberOfChannels > 1){
        tek = ctx.createBuffer(1, t.length, t.sampleRate);
        var c = tek.getChannelData(0), a = t.getChannelData(0), b = t.getChannelData(1);
        for (var j = 0; j < c.length; j++) c[j] = (a[j] + b[j]) * 0.5;
      }
      tamponlar[ad] = tek;
      bildir({ tur: 'dosyaHazir', ad: ad, sure: t.duration });
    }, function(e){ bildir({ tur: 'hata', metin: 'Çözülemedi: ' + ad + ' ' + String(e) }); });
  }
  function dosyaCal(k){
    var t = tamponlar[k.ad]; if (!t) return;
    var s = ctx.createBufferSource(); s.buffer = t; s.connect(k.p); s.start();
  }
  function dosyaKaynak(id, ad, n, aralik){
    baglam();
    var k = kaynaklar[id];
    if (k){ if (k.zaman) clearInterval(k.zaman); if (k.durdur) k.durdur(); }
    k = { tur: 'dosya', ad: ad, p: k ? k.p : panner() };
    kaynaklar[id] = k;
    konumla(k.p, n);
    dosyaCal(k);
    k.zaman = setInterval(function(){ dosyaCal(k); }, aralik);
  }
  function kaynak(id, tur, n){
    baglam();
    var k = kaynaklar[id];
    if (k && k.tur === 'dosya') { konumla(k.p, n); return; }
    if (!k || k.tur !== tur){
      if (k && k.durdur) k.durdur();
      if (k && k.zaman) clearInterval(k.zaman);
      k = { tur: tur, p: panner() };
      kaynaklar[id] = k;
      if (tur === 'zil') { zilCal(k); k.zaman = setInterval(function(){ zilCal(k); }, 1500); }
      else if (tur === 'cekic') { k.zaman = setInterval(function(){ cekicCal(k); }, 700); }
      else if (tur === 'deniz') denizBaslat(k);
      else if (tur === 'ayak') { k.zaman = setInterval(function(){ adimCal(k.p, 0.8); }, 520); }
    }
    konumla(k.p, n);
  }
  function dinleyici(n, y){
    baglam();
    var l = ctx.listener;
    if (l.positionX) { l.positionX.value = n.x; l.positionY.value = n.y; l.positionZ.value = n.z; l.forwardX.value = y.x; l.forwardY.value = y.y; l.forwardZ.value = y.z; }
    else { l.setPosition(n.x, n.y, n.z); l.setOrientation(y.x, y.y, y.z, 0, 1, 0); }
  }
  function modelSec(m){
    model = m;
    for (var id in kaynaklar) kaynaklar[id].p.panningModel = m;
  }
  function durdur(){
    for (var id in kaynaklar){ var k = kaynaklar[id]; if (k.zaman) clearInterval(k.zaman); if (k.durdur) k.durdur(); try { k.p.disconnect(); } catch(e){} }
    kaynaklar = {};
    if (ctx) { try { ctx.close(); } catch(e){} ctx = null; }
  }
  window.motor = {
    komut: function(c){
      try {
        if (c.ad === 'baslat') { baglam(); ctx.resume().then(function(){ bildir({ tur: 'hazir', durum: ctx.state }); }, function(e){ bildir({ tur: 'hata', metin: String(e) }); }); }
        else if (c.ad === 'kaynak') kaynak(c.id, c.tur, c.n);
        else if (c.ad === 'dinleyici') dinleyici(c.n, c.y);
        else if (c.ad === 'adim') { baglam(); adimCal(); }
        else if (c.ad === 'yukle') yukle(c.dosya, c.veri);
        else if (c.ad === 'dosyaKaynak') dosyaKaynak(c.id, c.dosya, c.n, c.aralik);
        else if (c.ad === 'model') modelSec(c.model);
        else if (c.ad === 'sil') sil(c.id);
        else if (c.ad === 'tek') { baglam(); tekCal(c.dosya, c.n, c.duzey); }
        else if (c.ad === 'boguk') boguk(c.acik);
        else if (c.ad === 'durdur') durdur();
      } catch(e){ bildir({ tur: 'hata', metin: String(e) }); }
    }
  };
  bildir({ tur: 'yuklendi' });
})();
</script></body></html>`;

// Paketteki ses dosyasını base64 olarak okur (Expo Go'da varlık önce cihaza indirilir)
export async function sesDosyasiOku(modul) {
  const varlik = Asset.fromModule(modul);
  await varlik.downloadAsync();
  const uri = varlik.localUri || varlik.uri;
  if (DosyaSistemi.File) return new DosyaSistemi.File(uri).base64();
  return DosyaSistemi.readAsStringAsync(uri, { encoding: 'base64' });
}

function KonumsalSes({ onMesaj }, ref) {
  const web = useRef(null);
  const gonder = (c) => {
    if (web.current) web.current.injectJavaScript('window.motor && window.motor.komut(' + JSON.stringify(c) + '); true;');
  };
  useImperativeHandle(ref, () => ({
    baslat: () => gonder({ ad: 'baslat' }),
    kaynak: (id, tur, nokta) => gonder({ ad: 'kaynak', id, tur, n: sesKoordinati(nokta) }),
    dinleyici: (d) => gonder({ ad: 'dinleyici', n: sesKoordinati(d), y: sesYonu(d.yon) }),
    adim: () => gonder({ ad: 'adim' }),
    model: (ad) => gonder({ ad: 'model', model: ad }),
    durdur: () => gonder({ ad: 'durdur' }),
    sil: (id) => gonder({ ad: 'sil', id }),
    tek: (ad, nokta, duzey = 1) => gonder({ ad: 'tek', dosya: ad, n: sesKoordinati(nokta), duzey }),
    boguk: (acik) => gonder({ ad: 'boguk', acik: !!acik }),
    yukle: async (ad, modul) => {
      try {
        const veri = await sesDosyasiOku(modul);
        gonder({ ad: 'yukle', dosya: ad, veri });
      } catch (e) {
        if (onMesaj) onMesaj({ tur: 'hata', metin: 'Dosya okunamadı: ' + ad + ' ' + String(e && e.message ? e.message : e) });
      }
    },
    dosyaKaynak: (id, ad, nokta, aralik) => gonder({ ad: 'dosyaKaynak', id, dosya: ad, n: sesKoordinati(nokta), aralik }),
  }));
  return (
    <View style={stiller.gizli} pointerEvents="none" importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
      <WebView
        ref={web}
        originWhitelist={['*']}
        source={{ html: MOTOR_HTML }}
        javaScriptEnabled
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback
        onMessage={(e) => {
          try {
            if (onMesaj) onMesaj(JSON.parse(e.nativeEvent.data));
          } catch (_) {}
        }}
      />
    </View>
  );
}

const stiller = StyleSheet.create({
  gizli: { position: 'absolute', width: 2, height: 2, opacity: 0, left: 0, top: 0 },
});

export default forwardRef(KonumsalSes);
