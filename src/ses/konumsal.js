// Konumsal ses motoru (Demir 1919'dan alındı; Expo Go'da doğrulandı). Expo Go'daki ses kütüphanesinde sağ-sol ve ön-arka konumlandırma yok;
// bu yüzden görünmez bir WebView içinde tarayıcının Web Audio API'si kullanılır (PannerNode, HRTF).
// WebView Expo Go'nun içinde gelir; ayrı bir uygulama kurmak gerekmez.
//
// Komutlar (ref üzerinden):
//   baslat()                         ses bağlamını açar
//   kaynak(id, tur, nokta)           ses kaynağı ekler ya da yerini değiştirir. tur: 'zil', 'deniz', 'cekic'
//   dinleyici(d)                     { x, y, yon } dinleyicinin yeri ve yönü
//   adim()                           ayak sesi (dinleyicinin kendi yerinde; içeride boğulmaz)
//   model(ad)                        'HRTF' ya da 'equalpower'
//   yukle(ad, modul)                 bir ses dosyasını (require ile) motora yükler; tek kanala indirir
//   dosyaKaynak(id, ad, nokta, aralik) yüklenmiş sesi bir noktadan, aralik ms'de bir çalar
//   sil(id)                          kaynağı kaldırır
//   tek(ad, nokta, duzey)            yüklenmiş sesi bir noktadan bir kez çalar
//   boguk(acik)                      içerideyken dışarıdaki sesleri boğar (duvar arkası)
//   durdur()
//   kisiKur(id, nokta, ic)           konuşan bir kişi kurar (ic: aynı odada; dışarıyı boğan süzgeçten geçmez)
//   kisiGit(id, nokta, sure)         kişiyi sure ms'de oraya götürür (koşma, yürüme)
//   kisiCal(id, ad, duzey, dongu, oran) kişinin ağzından/ayağından ses çalar; döngü değilse bitince 'kisiBitti'
//   kisiOran(id, oran, sure), kisiDur(id), kisiSil(id)
//   cevreDuzey(oran)                 çevre seslerinin (deniz vb.) taban düzeyi; konuşma sürerken ayrıca kısılır
//   dongu(id, ad, nokta, duzey)      yüklenmiş sesi bir noktadan kesintisiz döngüyle çalar (jeneratör uğultusu)
//   duzey(id, duzey)                 döngünün düzeyini yumuşakça değiştirir
//   telsizKur(), telsizAyar(yakinlik, kayma), telsizSil()
//                                    kulaklıktaki telsiz: parazit + kesik sinyal tonu. yakinlik 0-1 parazitle tonu
//                                    karıştırır; kayma (kanal farkı) tonun perdesini kaydırır, hedefte sıfırlanır
//   basincKur(), basincAyar(basinc, alarm), basincSil()
//                                    valf dengeleme: basınç yükseldikçe tizleşen ve güçlenen gaz tıslaması;
//                                    alarm açıkken üstüne kesik bir uyarı tonu
// Kişi sesleri uzaklıkla boğuklaşır (hava yutumu) ve mekânın yankısını alır ('dis' rıhtım, 'ic' ahşap oda).
// kaynak türleri: 'zil', 'cekic', 'deniz', 'ayak' (yürüyen birinin ayak sesleri), 'kristal' (ara sıra çınlayan kristal)
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
  var ctx = null, model = 'HRTF', kaynaklar = {}, ana = null, suzgec = null, yakin = null, cevre = null, yankilar = {}, kisiler = {}, dinN = { x: 0, y: 0, z: 0 }, konusan = 0;
  function bildir(o){ try { window.ReactNativeWebView.postMessage(JSON.stringify(o)); } catch(e){} }
  function baglam(){
    if (ctx) return ctx;
    try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch(e){}
    var C = window.AudioContext || window.webkitAudioContext;
    ctx = new C();
    ana = ctx.createGain(); ana.gain.value = 0.9;
    suzgec = ctx.createBiquadFilter(); suzgec.type = 'lowpass'; suzgec.frequency.value = 20000;
    ana.connect(suzgec); suzgec.connect(ctx.destination);
    // Aynı odadaki konuşan kişiler için ayrı yol: içerideyken dışarıyı boğan süzgeçten geçmez
    yakin = ctx.createGain(); yakin.gain.value = 0.9; yakin.connect(ctx.destination);
    // Çevre sesleri (deniz, tramvay, uzak ayaklar) kendi düğümünden geçer; biri konuşurken kısılır
    cevre = ctx.createGain(); cevre.gain.value = 1; cevre.connect(ana);
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
    p.connect(cevre); return p;
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
  // Kristal: ara sıra, rüzgârda kendiliğinden çınlayan cam gibi uzun bir tını
  function kristalCal(k){
    if (Math.random() < 0.35) return;
    var t = ctx.currentTime, kok = [2093, 2349, 2637, 3136][Math.floor(Math.random() * 4)], oranlar = [1, 2.76, 5.4];
    for (var i = 0; i < oranlar.length; i++){
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.value = kok * oranlar[i]; o.type = 'sine';
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.22 / (i * 2 + 1), t + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 2.6 - i * 0.7);
      o.connect(g); g.connect(k.p); o.start(t); o.stop(t + 2.7);
    }
  }
  // Çan / nota: çan tınısı (1, 2, 2,76, 5,4 kısmi tonları, uzun sönüm). hedef bir panner ya da 'yakin' düğümü.
  function notaCal(frek, hedef, duzey, sure){
    var t = ctx.currentTime, oranlar = [1, 2, 2.76, 5.4], sn = sure || 3.2, d = duzey == null ? 0.5 : duzey;
    for (var i = 0; i < oranlar.length; i++){
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.value = frek * oranlar[i]; o.type = 'sine';
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(d / (i * 1.6 + 1), t + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, t + sn / (i * 0.6 + 1));
      o.connect(g); g.connect(hedef); o.start(t); o.stop(t + sn + 0.1);
    }
  }
  // Yanlış nota: kapının alçak, boğuk inlemesi
  function inlemeCal(hedef){
    var t = ctx.currentTime, o = ctx.createOscillator(), o2 = ctx.createOscillator(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    o.type = 'sawtooth'; o2.type = 'sawtooth';
    o.frequency.setValueAtTime(70, t); o.frequency.exponentialRampToValueAtTime(48, t + 1.4);
    o2.frequency.setValueAtTime(73, t); o2.frequency.exponentialRampToValueAtTime(46, t + 1.4);
    f.type = 'lowpass'; f.frequency.value = 380;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.5, t + 0.12); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.5);
    o.connect(f); o2.connect(f); f.connect(g); g.connect(hedef); o.start(t); o2.start(t); o.stop(t + 1.6); o2.stop(t + 1.6);
  }
  // Yerçekimi alanı: sürekli, ağır ağır nabız atan alçak uğultu
  function yercekimiBaslat(k){
    var o = ctx.createOscillator(), o2 = ctx.createOscillator(), g = ctx.createGain(), lfo = ctx.createOscillator(), lg = ctx.createGain();
    o.type = 'sine'; o.frequency.value = 45; o2.type = 'triangle'; o2.frequency.value = 90.7;
    g.gain.value = 0.3; lfo.frequency.value = 0.8; lg.gain.value = 0.25;
    lfo.connect(lg); lg.connect(g.gain); o.connect(g); o2.connect(g); g.connect(k.p); o.start(); o2.start(); lfo.start();
    k.durdur = function(){ try { o.stop(); o2.stop(); lfo.stop(); } catch(e){} };
  }
  // Uzay feneri: kendi perdesinde kısa, düzenli bir bip (uzak mesafeler için geniş menzilli panner)
  function fenerCal(k){
    var t = ctx.currentTime, o = ctx.createOscillator(), o2 = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine'; o.frequency.value = k.frek || 440; o2.type = 'sine'; o2.frequency.value = (k.frek || 440) * 2;
    var g2 = ctx.createGain(); g2.gain.value = 0.25;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.6, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
    o.connect(g); o2.connect(g2); g2.connect(g); g.connect(k.p); o.start(t); o2.start(t); o.stop(t + 0.4); o2.stop(t + 0.4);
  }
  // Deniz: sürekli, yavaşça kabarıp inen alçak gürültü
  function denizBaslat(k){
    var s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain(), lfo = ctx.createOscillator(), lg = ctx.createGain();
    s.buffer = gurultu(4); s.loop = true; f.type = 'lowpass'; f.frequency.value = 600;
    g.gain.value = 0.35; lfo.frequency.value = 0.12; lg.gain.value = 0.2;
    lfo.connect(lg); lg.connect(g.gain); s.connect(f); f.connect(g); g.connect(k.p); s.start(); lfo.start();
    k.durdur = function(){ try { s.stop(); lfo.stop(); } catch(e){} };
  }
  // Kayıtlı adım sesleri: 'adim_<zemin>_N' adlı tamponlardan rastgele biri, hafif hız ve düzey farkıyla
  var sonAdim = {};
  function adimOrnegi(zemin, hedef, duzey){
    var adlar = [];
    for (var a in tamponlar) if (a.indexOf('adim_' + zemin + '_') === 0) adlar.push(a);
    if (!adlar.length) return false;
    var ad = adlar[Math.floor(Math.random() * adlar.length)];
    if (ad === sonAdim[zemin] && adlar.length > 1) ad = adlar[(adlar.indexOf(ad) + 1) % adlar.length];
    sonAdim[zemin] = ad;
    var s = ctx.createBufferSource(), g = ctx.createGain();
    s.buffer = tamponlar[ad]; s.playbackRate.value = 0.93 + Math.random() * 0.14;
    g.gain.value = (duzey || 0.5) * (0.8 + Math.random() * 0.2);
    s.connect(g); g.connect(hedef || yakin); s.start();
    return true;
  }
  function adimCal(hedef, duzey, zemin){
    if (zemin && adimOrnegi(zemin, hedef, duzey)) return;
    var t = ctx.currentTime, s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = gurultu(0.09); f.type = 'lowpass'; f.frequency.value = 900;
    g.gain.setValueAtTime(duzey || 0.5, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
    s.connect(f); f.connect(g); g.connect(hedef || yakin); s.start(t);
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
  function kaynak(id, tur, n, zemin, frek){
    baglam();
    var k = kaynaklar[id];
    if (k && zemin) k.zemin = zemin;
    if (k && k.tur === 'dosya') { konumla(k.p, n); return; }
    if (!k || k.tur !== tur){
      if (k && k.durdur) k.durdur();
      if (k && k.zaman) clearInterval(k.zaman);
      k = { tur: tur, p: panner(), zemin: zemin, frek: frek };
      kaynaklar[id] = k;
      if (tur === 'zil') { zilCal(k); k.zaman = setInterval(function(){ zilCal(k); }, 1500); }
      else if (tur === 'cekic') { k.zaman = setInterval(function(){ cekicCal(k); }, 700); }
      else if (tur === 'deniz') denizBaslat(k);
      else if (tur === 'ayak') { k.zaman = setInterval(function(){ adimCal(k.p, 0.9, k.zemin || 'tas'); }, 540); }
      else if (tur === 'kristal') { kristalCal(k); k.zaman = setInterval(function(){ kristalCal(k); }, 2300); }
      else if (tur === 'can') {
        // Kraterin çanları kendiliğinden, kısık ve seyrek çınlar (her biri kendi aralığıyla)
        var ara = 5200 + Math.floor(Math.random() * 2600);
        setTimeout(function(){ if (kaynaklar[id] === k) notaCal(k.frek || 262, k.p, 0.12, 2.6); }, Math.floor(Math.random() * 3000));
        k.zaman = setInterval(function(){ notaCal(k.frek || 262, k.p, 0.12, 2.6); }, ara);
      }
      else if (tur === 'yercekimi') yercekimiBaslat(k);
      else if (tur === 'fener') {
        k.p.refDistance = 10; k.p.rolloffFactor = 0.8; k.p.maxDistance = 200;
        setTimeout(function(){ if (kaynaklar[id] === k) fenerCal(k); }, Math.floor(Math.random() * 1200));
        k.zaman = setInterval(function(){ fenerCal(k); }, 1600);
      }
    }
    konumla(k.p, n);
  }
  function dinleyici(n, y){
    baglam();
    var l = ctx.listener;
    dinN = n;
    for (var kid in kisiler) kisiAyarla(kisiler[kid]);
    if (l.positionX) { l.positionX.value = n.x; l.positionY.value = n.y; l.positionZ.value = n.z; l.forwardX.value = y.x; l.forwardY.value = y.y; l.forwardZ.value = y.z; }
    else { l.setPosition(n.x, n.y, n.z); l.setOrientation(y.x, y.y, y.z, 0, 1, 0); }
  }
  function modelSec(m){
    model = m;
    for (var id in kaynaklar) kaynaklar[id].p.panningModel = m;
    for (var kid in kisiler) kisiler[kid].p.panningModel = m;
  }
  function durdur(){
    for (var kid in kisiler) kisiSil(kid);
    telsizSil(); basincSil(); teraziSil(); vincSil(); motorSil();
    for (var id in kaynaklar){ var k = kaynaklar[id]; if (k.zaman) clearInterval(k.zaman); if (k.durdur) k.durdur(); try { k.p.disconnect(); } catch(e){} }
    kaynaklar = {};
    if (ctx) { try { ctx.close(); } catch(e){} ctx = null; }
  }
  // --- Yankı: mekânın duvarlarından dönen ses (yapay dürtü yanıtı) ---
  // 'dis': rıhtım; binaların cephelerinden gecikmeli birkaç yansıma ve uzun, seyrek bir kuyruk.
  // 'ic': ahşap kayıkhane; çok erken, sık yansımalar ve kısa kuyruk.
  function yankiTamponu(sure, egri, erken){
    var n = Math.floor(ctx.sampleRate * sure), b = ctx.createBuffer(2, n, ctx.sampleRate);
    for (var c = 0; c < 2; c++){
      var v = b.getChannelData(c);
      for (var i = 0; i < n; i++) v[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, egri) * 0.35;
      for (var k = 0; k < erken.length; k++){
        var j = Math.floor((erken[k][0] + (c ? 0.0023 * k : 0)) * ctx.sampleRate);
        if (j < n) v[j] += erken[k][1] * (k % 2 ? -1 : 1);
      }
    }
    return b;
  }
  function yanki(tur){
    if (yankilar[tur]) return yankilar[tur];
    var giris = ctx.createBiquadFilter(), c = ctx.createConvolver(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    // Yankıya yalnız sesin gövdesi gider: bas uğultu ve tıslama kuyrukta birikmesin
    giris.type = 'highpass'; giris.frequency.value = 280;
    f.type = 'lowpass';
    if (tur === 'ic'){ c.buffer = yankiTamponu(0.5, 3, [[0.006, 0.55], [0.011, 0.45], [0.017, 0.35], [0.024, 0.3], [0.031, 0.2]]); f.frequency.value = 4000; g.gain.value = 0.38; }
    else { c.buffer = yankiTamponu(1.4, 5, [[0.038, 0.4], [0.071, 0.3], [0.118, 0.22], [0.19, 0.12]]); f.frequency.value = 2600; g.gain.value = 0.2; }
    giris.connect(c); c.connect(f); f.connect(g); g.connect(tur === 'ic' ? yakin : ana);
    yankilar[tur] = giris;
    return giris;
  }
  // --- Konuşan kişiler: hareket eden, sesi uzaklıkla süzülen, yankısı olan kaynaklar ---
  function uzaklik3(a, b){ var x = a.x - b.x, y = a.y - b.y, z = a.z - b.z; return Math.sqrt(x * x + y * y + z * z); }
  function kisiAyarla(k){
    var t = ctx.currentTime;
    if (k.p.positionX){
      k.p.positionX.setTargetAtTime(k.n.x, t, 0.02); k.p.positionY.setTargetAtTime(k.n.y, t, 0.02); k.p.positionZ.setTargetAtTime(k.n.z, t, 0.02);
    } else k.p.setPosition(k.n.x, k.n.y, k.n.z);
    var d = Math.max(0.5, uzaklik3(k.n, dinN));
    // Hava yüksek sesleri yutar: uzaktaki ses daha boğuk gelir
    k.hava.frequency.setTargetAtTime(Math.max(1800, Math.min(18000, 18000 * Math.pow(3 / d, 0.85))), t, 0.05);
    // Yankı uzaklıkla doğrudan sesten yavaş azalır; uzaktaki ses daha "odalı" duyulur
    k.gonder.gain.setTargetAtTime((k.ic ? 0.5 : 0.32) * Math.min(1.4, Math.pow(2 / d, 0.45)), t, 0.05);
  }
  function kisiSil(id){
    var k = kisiler[id]; if (!k) return;
    if (k.zaman) clearInterval(k.zaman);
    try { if (k.dongu) k.dongu.stop(); } catch(e){}
    try { k.g.disconnect(); k.p.disconnect(); } catch(e){}
    delete kisiler[id];
  }
  function kisiKur(id, n, ic){
    baglam(); kisiSil(id);
    var g = ctx.createGain(), sik = ctx.createDynamicsCompressor(), hava = ctx.createBiquadFilter(), p = ctx.createPanner(), gonder = ctx.createGain();
    p.panningModel = model; p.distanceModel = 'inverse'; p.refDistance = 1.5; p.maxDistance = 100; p.rolloffFactor = 0.9;
    hava.type = 'lowpass'; hava.frequency.value = 18000;
    // Ses öne çıksın: hafif sıkıştırma ve kazanç (ortam sesinin altında kalmasın)
    sik.threshold.value = -24; sik.ratio.value = 3; sik.attack.value = 0.005; sik.release.value = 0.2; sik.knee.value = 10;
    g.gain.value = 1.6;
    g.connect(sik); sik.connect(hava); hava.connect(p); p.connect(ic ? yakin : ana);
    g.connect(gonder); gonder.connect(yanki(ic ? 'ic' : 'dis'));
    var k = { g: g, hava: hava, p: p, gonder: gonder, n: n, ic: !!ic };
    kisiler[id] = k; kisiAyarla(k);
  }
  // n noktasına sure ms'de yürür/koşar (sona doğru yavaşlayarak)
  function kisiGit(id, n, sure){
    var k = kisiler[id]; if (!k) return;
    if (k.zaman) clearInterval(k.zaman);
    var bas = { x: k.n.x, y: k.n.y, z: k.n.z }, t0 = Date.now();
    k.zaman = setInterval(function(){
      var o = Math.min(1, (Date.now() - t0) / Math.max(1, sure));
      var e = o < 0.85 ? o / 0.85 * 0.9 : 0.9 + (1 - Math.pow(1 - (o - 0.85) / 0.15, 2)) * 0.1;
      k.n = { x: bas.x + (n.x - bas.x) * e, y: bas.y + (n.y - bas.y) * e, z: bas.z + (n.z - bas.z) * e };
      kisiAyarla(k);
      if (o >= 1){ clearInterval(k.zaman); k.zaman = null; }
    }, 30);
  }
  function kisiCal(id, ad, duzey, dongu, oran){
    var k = kisiler[id], t = tamponlar[ad]; if (!k || !t) return;
    var s = ctx.createBufferSource(), g = ctx.createGain();
    s.buffer = t; g.gain.value = duzey == null ? 1 : duzey;
    if (oran) s.playbackRate.value = oran;
    s.connect(g); g.connect(k.g);
    if (dongu){ s.loop = true; try { if (k.dongu) k.dongu.stop(); } catch(e){} k.dongu = s; k.donguKazanc = g; }
    else {
      // Konuşma süresince çevre sesleri kısılır (sinema karışımındaki gibi)
      cevreKis(1);
      s.onended = function(){ cevreKis(-1); bildir({ tur: 'kisiBitti', id: id, ad: ad }); };
    }
    s.start();
  }
  var cevreTaban = 1;
  function cevreKis(fark){
    konusan = Math.max(0, konusan + fark);
    var t = ctx.currentTime;
    cevre.gain.cancelScheduledValues(t);
    cevre.gain.setTargetAtTime(cevreTaban * (konusan > 0 ? 0.35 : 1), t, konusan > 0 ? 0.08 : 0.4);
  }
  function cevreDuzey(oran){ baglam(); cevreTaban = oran; cevreKis(0); }
  function kisiOran(id, oran, sure){
    var k = kisiler[id]; if (!k || !k.dongu) return;
    k.dongu.playbackRate.setTargetAtTime(oran, ctx.currentTime, (sure || 300) / 3000);
  }
  function kisiDur(id){
    var k = kisiler[id]; if (!k || !k.dongu) return;
    var s = k.dongu, t = ctx.currentTime;
    k.donguKazanc.gain.setTargetAtTime(0.0001, t, 0.05);
    try { s.stop(t + 0.3); } catch(e){}
    k.dongu = null;
  }
  // --- Döngüyle çalan konumlu dosya sesi ---
  function dongu(id, ad, n, duzey){
    baglam();
    var t = tamponlar[ad]; if (!t) return;
    var eski = kaynaklar[id];
    if (eski && eski.tur === 'dongu' && eski.ad === ad){ konumla(eski.p, n); duzeyAyarla(id, duzey); return; }
    sil(id);
    var p = panner(), g = ctx.createGain(), s = ctx.createBufferSource();
    konumla(p, n); g.gain.value = 0.0001; s.buffer = t; s.loop = true;
    s.connect(g); g.connect(p); s.start();
    g.gain.setTargetAtTime(duzey == null ? 1 : duzey, ctx.currentTime, 0.4);
    kaynaklar[id] = { tur: 'dongu', ad: ad, p: p, g: g, durdur: function(){ try { s.stop(); } catch(e){} } };
  }
  function duzeyAyarla(id, duzey){
    var k = kaynaklar[id]; if (!k || !k.g) return;
    k.g.gain.setTargetAtTime(Math.max(0.0001, duzey), ctx.currentTime, 0.2);
  }
  // --- Kulaklıktaki telsiz (frekans ayarı) ---
  var telsiz = null;
  function telsizSil(){
    if (!telsiz) return;
    try { telsiz.src.stop(); telsiz.o.stop(); telsiz.lfo.stop(); } catch(e){}
    try { telsiz.gs.disconnect(); telsiz.gt.disconnect(); } catch(e){}
    telsiz = null;
  }
  function telsizKur(){
    baglam(); telsizSil();
    var gs = ctx.createGain(), gt = ctx.createGain(), bp = ctx.createBiquadFilter(), src = ctx.createBufferSource();
    src.buffer = tamponlar['parazit'] || gurultu(3); src.loop = true;
    bp.type = 'bandpass'; bp.frequency.value = 1700; bp.Q.value = 0.6;
    gs.gain.value = 0.0001; gt.gain.value = 0.0001;
    src.connect(gs); gs.connect(bp); bp.connect(yakin);
    // Sinyal: kesik kesik atan sinüs (mors gibi), kanal yaklaştıkça netleşir
    var o = ctx.createOscillator(), lfo = ctx.createOscillator(), lg = ctx.createGain(), tg = ctx.createGain();
    o.type = 'sine'; o.frequency.value = 1150;
    lfo.type = 'square'; lfo.frequency.value = 2.6; lg.gain.value = 0.5; tg.gain.value = 0.5;
    lfo.connect(lg); lg.connect(tg.gain); o.connect(tg); tg.connect(gt); gt.connect(yakin);
    src.start(); o.start(); lfo.start();
    gs.gain.setTargetAtTime(0.7, ctx.currentTime, 0.3);
    telsiz = { gs: gs, gt: gt, o: o, lfo: lfo, src: src };
  }
  function telsizAyar(y, kayma){
    if (!telsiz) return;
    var t = ctx.currentTime;
    telsiz.gs.gain.setTargetAtTime(0.75 * (1 - y * 0.88) + 0.0001, t, 0.06);
    telsiz.gt.gain.setTargetAtTime(0.55 * y * y + 0.0001, t, 0.06);
    telsiz.o.frequency.setTargetAtTime(1150 + Math.max(-30, Math.min(30, kayma)) * 35, t, 0.05);
  }
  // --- Valf basıncı (kulaklıkta) ---
  var basinc = null;
  function basincSil(){
    if (!basinc) return;
    try { basinc.src.stop(); basinc.o.stop(); basinc.lfo.stop(); } catch(e){}
    try { basinc.g.disconnect(); basinc.ag.disconnect(); } catch(e){}
    basinc = null;
  }
  function basincKur(){
    baglam(); basincSil();
    var src = ctx.createBufferSource(), bp = ctx.createBiquadFilter(), g = ctx.createGain();
    src.buffer = gurultu(2); src.loop = true;
    bp.type = 'bandpass'; bp.frequency.value = 400; bp.Q.value = 1.4; g.gain.value = 0.0001;
    src.connect(bp); bp.connect(g); g.connect(yakin);
    var o = ctx.createOscillator(), lfo = ctx.createOscillator(), lg = ctx.createGain(), tg = ctx.createGain(), ag = ctx.createGain();
    o.type = 'square'; o.frequency.value = 1480;
    lfo.type = 'square'; lfo.frequency.value = 5; lg.gain.value = 0.5; tg.gain.value = 0.5;
    lfo.connect(lg); lg.connect(tg.gain); o.connect(tg); tg.connect(ag); ag.gain.value = 0.0001; ag.connect(yakin);
    src.start(); o.start(); lfo.start();
    basinc = { src: src, bp: bp, g: g, o: o, lfo: lfo, ag: ag };
  }
  function basincAyar(p, alarm){
    if (!basinc) return;
    var t = ctx.currentTime;
    basinc.bp.frequency.setTargetAtTime(300 + p * 2600, t, 0.08);
    basinc.g.gain.setTargetAtTime(0.06 + p * 0.6, t, 0.08);
    basinc.ag.gain.setTargetAtTime(alarm ? 0.09 : 0.0001, t, 0.02);
  }
  // --- Hidrolik ayak dengeleme (kulakta): sabit referans tonu + ayağın tonu; ikisi yaklaştıkça vuru yavaşlar ---
  var terazi = null;
  function teraziSil(){
    if (!terazi) return;
    try { terazi.r.stop(); terazi.a.stop(); terazi.g.stop(); } catch(e){}
    try { terazi.cikis.disconnect(); } catch(e){}
    terazi = null;
  }
  function teraziKur(ref){
    baglam(); teraziSil();
    var cikis = ctx.createGain(); cikis.gain.value = 0.0001; cikis.connect(yakin);
    var r = ctx.createOscillator(), rg = ctx.createGain(), a = ctx.createOscillator(), ag = ctx.createGain();
    r.type = 'sine'; r.frequency.value = ref || 330; rg.gain.value = 0.16;
    a.type = 'sine'; a.frequency.value = ref || 330; ag.gain.value = 0.16;
    r.connect(rg); rg.connect(cikis); a.connect(ag); ag.connect(cikis);
    // Hidroliğin alçak, boğuk uğultusu (pompalandıkça yükselir)
    var g = ctx.createBufferSource(), gf = ctx.createBiquadFilter(), gg = ctx.createGain();
    g.buffer = gurultu(2); g.loop = true; gf.type = 'lowpass'; gf.frequency.value = 160; gg.gain.value = 0.05;
    g.connect(gf); gf.connect(gg); gg.connect(cikis);
    r.start(); a.start(); g.start();
    cikis.gain.setTargetAtTime(1, ctx.currentTime, 0.2);
    terazi = { r: r, a: a, g: g, gg: gg, cikis: cikis, son: 0 };
  }
  function teraziAyar(frek, pompa){
    if (!terazi) return;
    var t = ctx.currentTime;
    terazi.a.frequency.setTargetAtTime(frek, t, 0.05);
    terazi.gg.gain.setTargetAtTime(pompa ? 0.22 : 0.05, t, 0.08);
  }
  // --- Vinç (kulakta): parçanın yeri stereo dengesiyle; ortadayken düzenli tık ---
  var vinc = null;
  function vincSil(){
    if (!vinc) return;
    try { vinc.o.stop(); vinc.n.stop(); clearInterval(vinc.zaman); } catch(e){}
    try { vinc.cikis.disconnect(); } catch(e){}
    vinc = null;
  }
  function vincKur(){
    baglam(); vincSil();
    var pan = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    var cikis = ctx.createGain(); cikis.gain.value = 0.0001;
    if (pan) { cikis.connect(pan); pan.connect(yakin); } else cikis.connect(yakin);
    var o = ctx.createOscillator(), og = ctx.createGain();
    o.type = 'triangle'; o.frequency.value = 110; og.gain.value = 0.2; o.connect(og); og.connect(cikis);
    // Zincir şıkırtısı: süzülmüş gürültü, yavaşça kabarıp iner
    var n = ctx.createBufferSource(), f = ctx.createBiquadFilter(), ng = ctx.createGain();
    n.buffer = gurultu(2); n.loop = true; f.type = 'bandpass'; f.frequency.value = 2400; f.Q.value = 3; ng.gain.value = 0.06;
    n.connect(f); f.connect(ng); ng.connect(cikis);
    o.start(); n.start();
    cikis.gain.setTargetAtTime(1, ctx.currentTime, 0.2);
    vinc = { o: o, n: n, cikis: cikis, pan: pan, ortada: false };
    vinc.zaman = setInterval(function(){
      if (!vinc || !vinc.ortada) return;
      var t = ctx.currentTime, k = ctx.createOscillator(), kg = ctx.createGain();
      k.type = 'square'; k.frequency.value = 1800; kg.gain.setValueAtTime(0.08, t); kg.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
      k.connect(kg); kg.connect(yakin); k.start(t); k.stop(t + 0.05);
    }, 400);
  }
  function vincAyar(x, yukseklik, ortada){
    if (!vinc) return;
    var t = ctx.currentTime;
    if (vinc.pan) vinc.pan.pan.setTargetAtTime(Math.max(-1, Math.min(1, x)), t, 0.05);
    vinc.o.frequency.setTargetAtTime(90 + yukseklik * 20, t, 0.1);
    vinc.ortada = !!ortada;
  }
  // --- Gemi motoru (Kıvılcım: ince, yüksek devirli türbin vızıltısı; hızlandıkça tizleşen ıslık) ---
  var motorS = null;
  function motorSil(){
    if (!motorS) return;
    try { motorS.a.stop(); motorS.i.stop(); if (motorS.n) motorS.n.stop(); if (motorS.lfo) motorS.lfo.stop(); } catch(e){}
    try { motorS.cikis.disconnect(); } catch(e){}
    motorS = null;
  }
  // Motor profilleri: gemi sınıfları ve yüzey araçları (araclar-ve-gemi-filosu.md akustik karakterler)
  // a: ana ton (tip, Hz), s: süzgeç (Hz), i: ıslık (Hz), n: gürültü süzgeci (Hz, 0 = yok), r: ritim (Hz, genlik dalgası)
  var MOTORLAR = {
    turbin:   { a: ['sawtooth', 180], s: 900,  i: 1400, n: 0,    r: 0 },
    piston:   { a: ['square', 62],    s: 400,  i: 0,    n: 300,  r: 4 },
    manyetik: { a: ['sine', 110],     s: 1200, i: 220,  n: 0,    r: 0 },
    bas:      { a: ['triangle', 41],  s: 250,  i: 0,    n: 180,  r: 0.7 },
    kutle:    { a: ['sine', 31],      s: 200,  i: 62,   n: 120,  r: 0.4 },
    hover:    { a: ['sine', 2300],    s: 5000, i: 4600, n: 0,    r: 7 },
    palet:    { a: ['sawtooth', 55],  s: 300,  i: 0,    n: 600,  r: 6 },
    kervan:   { a: ['triangle', 92],  s: 700,  i: 0,    n: 900,  r: 2 },
    vtol:     { a: ['sawtooth', 120], s: 1500, i: 0,    n: 1800, r: 0 }
  };
  function motorKur(profil){
    baglam(); motorSil();
    var P = MOTORLAR[profil] || MOTORLAR.turbin;
    var cikis = ctx.createGain(); cikis.gain.value = 0.0001; cikis.connect(yakin);
    var ritim = ctx.createGain(); ritim.gain.value = 1; ritim.connect(cikis);
    var a = ctx.createOscillator(), af = ctx.createBiquadFilter(), ag = ctx.createGain();
    a.type = P.a[0]; a.frequency.value = P.a[1]; af.type = 'bandpass'; af.frequency.value = P.s; af.Q.value = 2; ag.gain.value = 0.12;
    a.connect(af); af.connect(ag); ag.connect(ritim);
    var i = ctx.createOscillator(), ig = ctx.createGain();
    i.type = 'sine'; i.frequency.value = P.i || 1; ig.gain.value = 0.0001; i.connect(ig); ig.connect(ritim);
    var n = null, ng = null, nf = null;
    if (P.n) {
      n = ctx.createBufferSource(); nf = ctx.createBiquadFilter(); ng = ctx.createGain();
      n.buffer = gurultu(2); n.loop = true; nf.type = 'lowpass'; nf.frequency.value = P.n; ng.gain.value = 0.15;
      n.connect(nf); nf.connect(ng); ng.connect(ritim); n.start();
    }
    var lfo = null;
    if (P.r) {
      lfo = ctx.createOscillator(); var lg = ctx.createGain();
      lfo.frequency.value = P.r; lg.gain.value = 0.35; lfo.connect(lg); lg.connect(ritim.gain); lfo.start();
    }
    a.start(); i.start();
    cikis.gain.setTargetAtTime(1, ctx.currentTime, 0.3);
    motorS = { P: P, a: a, af: af, ag: ag, i: i, ig: ig, n: n, nf: nf, lfo: lfo, cikis: cikis };
  }
  function motorAyar(hiz){
    if (!motorS) return;
    var t = ctx.currentTime, h = Math.max(0, Math.min(5, hiz)), P = motorS.P;
    motorS.a.frequency.setTargetAtTime(P.a[1] * (1 + h * 0.35), t, 0.4);
    motorS.af.frequency.setTargetAtTime(P.s * (1 + h * 0.35), t, 0.4);
    motorS.ag.gain.setTargetAtTime(0.06 + h * 0.03, t, 0.4);
    if (P.i) {
      motorS.i.frequency.setTargetAtTime(P.i * (1 + h * 0.3), t, 0.4);
      motorS.ig.gain.setTargetAtTime(h ? 0.01 + h * 0.012 : 0.004, t, 0.4);
    }
    if (motorS.nf) motorS.nf.frequency.setTargetAtTime(P.n * (1 + h * 0.4), t, 0.4);
    if (motorS.lfo) motorS.lfo.frequency.setTargetAtTime(P.r * (1 + h * 0.3), t, 0.4);
  }
  window.motor = {
    komut: function(c){
      try {
        if (c.ad === 'baslat') { baglam(); ctx.resume().then(function(){ bildir({ tur: 'hazir', durum: ctx.state }); }, function(e){ bildir({ tur: 'hata', metin: String(e) }); }); }
        else if (c.ad === 'kaynak') kaynak(c.id, c.tur, c.n, c.zemin, c.frek);
        else if (c.ad === 'nota') {
          baglam();
          var h = yakin;
          if (c.n) { var p = panner(); konumla(p, c.n); h = p; setTimeout(function(){ try { p.disconnect(); } catch(e){} }, 4500); }
          notaCal(c.frek, h, c.duzey, c.sure);
        }
        else if (c.ad === 'inleme') {
          baglam();
          var h2 = yakin;
          if (c.n) { var p2 = panner(); konumla(p2, c.n); h2 = p2; setTimeout(function(){ try { p2.disconnect(); } catch(e){} }, 2500); }
          inlemeCal(h2);
        }
        else if (c.ad === 'dinleyici') dinleyici(c.n, c.y);
        else if (c.ad === 'adim') { baglam(); adimCal(null, c.duzey || 0.45, c.zemin); }
        else if (c.ad === 'yukle') yukle(c.dosya, c.veri);
        else if (c.ad === 'dosyaKaynak') dosyaKaynak(c.id, c.dosya, c.n, c.aralik);
        else if (c.ad === 'model') modelSec(c.model);
        else if (c.ad === 'sil') sil(c.id);
        else if (c.ad === 'tek') { baglam(); tekCal(c.dosya, c.n, c.duzey); }
        else if (c.ad === 'boguk') boguk(c.acik);
        else if (c.ad === 'durdur') durdur();
        else if (c.ad === 'kisiKur') kisiKur(c.id, c.n, c.ic);
        else if (c.ad === 'kisiGit') kisiGit(c.id, c.n, c.sure);
        else if (c.ad === 'kisiCal') { baglam(); kisiCal(c.id, c.dosya, c.duzey, c.dongu, c.oran); }
        else if (c.ad === 'kisiOran') kisiOran(c.id, c.oran, c.sure);
        else if (c.ad === 'kisiDur') kisiDur(c.id);
        else if (c.ad === 'kisiSil') kisiSil(c.id);
        else if (c.ad === 'cevreDuzey') cevreDuzey(c.oran);
        else if (c.ad === 'dongu') dongu(c.id, c.dosya, c.n, c.duzey);
        else if (c.ad === 'duzey') duzeyAyarla(c.id, c.duzey);
        else if (c.ad === 'telsizKur') telsizKur();
        else if (c.ad === 'telsizAyar') telsizAyar(c.yakinlik, c.kayma);
        else if (c.ad === 'telsizSil') telsizSil();
        else if (c.ad === 'basincKur') basincKur();
        else if (c.ad === 'basincAyar') basincAyar(c.basinc, c.alarm);
        else if (c.ad === 'basincSil') basincSil();
        else if (c.ad === 'teraziKur') teraziKur(c.ref);
        else if (c.ad === 'teraziAyar') teraziAyar(c.frek, c.pompa);
        else if (c.ad === 'teraziSil') teraziSil();
        else if (c.ad === 'vincKur') vincKur();
        else if (c.ad === 'vincAyar') vincAyar(c.x, c.yukseklik, c.ortada);
        else if (c.ad === 'vincSil') vincSil();
        else if (c.ad === 'motorKur') motorKur(c.profil);
        else if (c.ad === 'motorAyar') motorAyar(c.hiz);
        else if (c.ad === 'motorSil') motorSil();
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
  // 5.6: dosyalar istendikçe ve tek tek yüklenir. 5.5'e kadar 139 dosya (39 MB) açılışta aynı anda base64 olarak
  // WebView'e gönderiliyordu; iPhone'da bellek ve ses sistemi tıkanıyordu.
  const y = useRef({ dosyalar: {}, yuklenen: {}, istenen: {}, kuyruk: [], calisiyor: false, bekleyen: {} }).current;
  const isle = async () => {
    if (y.calisiyor) return;
    y.calisiyor = true;
    while (y.kuyruk.length) {
      const ad = y.kuyruk.shift();
      try {
        const veri = await sesDosyasiOku(y.dosyalar[ad]);
        gonder({ ad: 'yukle', dosya: ad, veri });
      } catch (e) {
        if (onMesaj) onMesaj({ tur: 'hata', metin: 'Dosya okunamadı: ' + ad + ' ' + String(e && e.message ? e.message : e) });
      }
      await new Promise((r) => setTimeout(r, 40));
    }
    y.calisiyor = false;
  };
  const iste = (ad) => {
    if (!ad || !y.dosyalar[ad] || y.istenen[ad]) return;
    y.istenen[ad] = true;
    y.kuyruk.push(ad);
    isle();
  };
  // Dosyası henüz yüklenmemiş döngü ya da aralıklı kaynak: yüklenince gönderilir
  const dosyaIle = (ad, id, komut, bekle = true) => {
    if (y.yuklenen[ad]) return gonder(komut);
    if (bekle && id) {
      if (!y.bekleyen[ad]) y.bekleyen[ad] = {};
      y.bekleyen[ad][id] = komut;
    }
    iste(ad);
  };
  const bekleyenSil = (id) => {
    for (const ad of Object.keys(y.bekleyen)) delete y.bekleyen[ad][id];
  };
  const mesaj = (x) => {
    if (x && x.tur === 'dosyaHazir') {
      y.yuklenen[x.ad] = true;
      const b = y.bekleyen[x.ad];
      delete y.bekleyen[x.ad];
      if (b) for (const id of Object.keys(b)) gonder(b[id]);
    }
    if (onMesaj) onMesaj(x);
  };
  useImperativeHandle(ref, () => ({
    baslat: () => gonder({ ad: 'baslat' }),
    kaynak: (id, tur, nokta, zemin, frek) => gonder({ ad: 'kaynak', id, tur, n: sesKoordinati(nokta), zemin, frek }),
    // Çan notası: nokta verilirse o yerde, verilmezse kulaklıkta
    nota: (frek, nokta, duzey = 0.5, sure = 3.2) => gonder({ ad: 'nota', frek, n: nokta ? sesKoordinati(nokta) : null, duzey, sure }),
    inleme: (nokta) => gonder({ ad: 'inleme', n: nokta ? sesKoordinati(nokta) : null }),
    dinleyici: (d) => gonder({ ad: 'dinleyici', n: sesKoordinati(d), y: sesYonu(d.yon) }),
    adim: (zemin, duzey) => gonder({ ad: 'adim', zemin, duzey }),
    model: (ad) => gonder({ ad: 'model', model: ad }),
    durdur: () => gonder({ ad: 'durdur' }),
    sil: (id) => {
      bekleyenSil(id);
      gonder({ ad: 'sil', id });
    },
    tek: (ad, nokta, duzey = 1) => dosyaIle(ad, null, { ad: 'tek', dosya: ad, n: sesKoordinati(nokta), duzey }, false),
    boguk: (acik) => gonder({ ad: 'boguk', acik: !!acik }),
    // Dosya kaydı: hangi ad hangi pakette (yüklemez); iste: kuyruğa alır, sırayla yükler
    kaydet: (dosyalar) => Object.assign(y.dosyalar, dosyalar),
    iste,
    yukluMu: (ad) => !!y.yuklenen[ad],
    yukle: (ad, modul) => {
      if (modul) y.dosyalar[ad] = modul;
      iste(ad);
    },
    // Konuşan kişiler (seslendirilmiş sahneler)
    kisiKur: (id, nokta, ic = false) => gonder({ ad: 'kisiKur', id, n: sesKoordinati(nokta), ic }),
    kisiGit: (id, nokta, sure) => gonder({ ad: 'kisiGit', id, n: sesKoordinati(nokta), sure }),
    kisiCal: (id, ad, duzey = 1, dongu = false, oran = 1) => dosyaIle(ad, 'kisi_' + id, { ad: 'kisiCal', id, dosya: ad, duzey, dongu, oran }, dongu),
    kisiOran: (id, oran, sure) => gonder({ ad: 'kisiOran', id, oran, sure }),
    kisiDur: (id) => gonder({ ad: 'kisiDur', id }),
    kisiSil: (id) => gonder({ ad: 'kisiSil', id }),
    cevreDuzey: (oran) => gonder({ ad: 'cevreDuzey', oran }),
    dosyaKaynak: (id, ad, nokta, aralik) => dosyaIle(ad, id, { ad: 'dosyaKaynak', id, dosya: ad, n: sesKoordinati(nokta), aralik }),
    dongu: (id, ad, nokta, duzey = 1) => dosyaIle(ad, id, { ad: 'dongu', id, dosya: ad, n: sesKoordinati(nokta), duzey }),
    duzey: (id, duzey) => gonder({ ad: 'duzey', id, duzey }),
    telsizKur: () => gonder({ ad: 'telsizKur' }),
    telsizAyar: (yakinlik, kayma) => gonder({ ad: 'telsizAyar', yakinlik, kayma }),
    telsizSil: () => gonder({ ad: 'telsizSil' }),
    basincKur: () => gonder({ ad: 'basincKur' }),
    basincAyar: (basinc, alarm) => gonder({ ad: 'basincAyar', basinc, alarm: !!alarm }),
    basincSil: () => gonder({ ad: 'basincSil' }),
    teraziKur: (ref) => gonder({ ad: 'teraziKur', ref }),
    teraziAyar: (frek, pompa) => gonder({ ad: 'teraziAyar', frek, pompa: !!pompa }),
    teraziSil: () => gonder({ ad: 'teraziSil' }),
    vincKur: () => gonder({ ad: 'vincKur' }),
    vincAyar: (x, yukseklik, ortada) => gonder({ ad: 'vincAyar', x, yukseklik, ortada: !!ortada }),
    vincSil: () => gonder({ ad: 'vincSil' }),
    motorKur: (profil = 'turbin') => gonder({ ad: 'motorKur', profil }),
    motorAyar: (hiz) => gonder({ ad: 'motorAyar', hiz }),
    motorSil: () => gonder({ ad: 'motorSil' }),
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
          let x = null;
          try {
            x = JSON.parse(e.nativeEvent.data);
          } catch (_) {}
          if (x) mesaj(x);
        }}
      />
    </View>
  );
}

const stiller = StyleSheet.create({
  gizli: { position: 'absolute', width: 2, height: 2, opacity: 0, left: 0, top: 0 },
});

export default forwardRef(KonumsalSes);
