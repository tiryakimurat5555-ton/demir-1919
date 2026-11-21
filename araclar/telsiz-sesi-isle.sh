#!/bin/bash
# Gerçekçi el telsizi (1.8). $1 giriş, $2 çıkış, $3 ortam (telsiz|savas|gemi)
set -e
g="$1"; c="$2"; o="$3"
PAR=/home/claude/demir-1919/assets/ses/konumsal/parazit.wav
kirp="silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse"
case "$o" in
  telsiz|savas)
    if [ "$o" = savas ]; then SUR=6; BAS=550; UST=2600; YATAK=0.16; else SUR=4; BAS=450; UST=2800; YATAK=0.12; fi
    # Ses: dar bant (iki kat süzgeç), burun rengi (1,6 kHz), sert sıkıştırma ve aşırı sürülmüş hoparlör doyumu,
    # 8 kHz örneklemeye indirilip geri (alçak çözünürlüklü telsiz), hafif titreşen sinyal (sönümlenme).
    # Arkada gerçek radyo paraziti (Bahtiyar'ın Efektler'i: Bluezone Radyo Parazit) bant içinde, konuşmanın altında.
    # Başta tuşa basma tıkı + cızırtı patlaması, sonda tuşu bırakma: kısa "kşşş" kuyruğu ve tık.
    ffmpeg -nostdin -hide_banner -loglevel error -y -i "$g" -stream_loop -1 -i "$PAR" \
      -f lavfi -t 0.16 -i "anoisesrc=color=white:amplitude=0.5:r=44100" \
      -f lavfi -t 0.32 -i "anoisesrc=color=white:amplitude=0.45:r=44100" \
      -filter_complex "\
[0:a]${kirp},aresample=44100,highpass=f=${BAS}:poles=2,highpass=f=${BAS}:poles=2,lowpass=f=${UST}:poles=2,lowpass=f=${UST}:poles=2,\
equalizer=f=1600:t=q:w=1.0:g=6,acompressor=threshold=-28dB:ratio=8:attack=1:release=40:makeup=4,\
volume=${SUR},asoftclip=type=atan,volume=0.5,aresample=8000,aresample=44100,lowpass=f=3000,\
tremolo=f=5.3:d=0.08,apad=pad_dur=0.04[v];\
[2:a]highpass=f=700,lowpass=f=3000,afade=t=in:d=0.01,afade=t=out:st=0.08:d=0.08,volume=0.9[s1];\
[3:a]highpass=f=600,lowpass=f=3200,afade=t=in:d=0.01,afade=t=out:st=0.06:d=0.26,volume=0.8[s2];\
[s1][v][s2]concat=n=3:v=0:a=1[ses];\
[1:a]aresample=44100,highpass=f=${BAS},lowpass=f=${UST},volume=${YATAK}[yatak];\
[ses][yatak]amix=inputs=2:duration=first:dropout_transition=0:normalize=0,alimiter=limit=0.9,loudnorm=I=-16:TP=-1.5:LRA=6" \
      -ac 1 -ar 22050 -c:a libmp3lame -b:a 48k "$c" ;;
  gemi)
    # Gemi interkomu: hoparlörden çıkan ses (orta bant, metal kabin yankısı), çok hafif uğultu; telsiz kadar bozuk değil
    ffmpeg -nostdin -hide_banner -loglevel error -y -i "$g" -f lavfi -i "anoisesrc=color=brown:amplitude=0.01:r=44100" \
      -filter_complex "[0:a]${kirp},aresample=44100,highpass=f=280:poles=2,lowpass=f=4500:poles=2,equalizer=f=2000:t=q:w=1.2:g=4,\
acompressor=threshold=-22dB:ratio=4:attack=3:release=80:makeup=2,asoftclip=type=tanh,aecho=0.85:0.55:19|37|61:0.22|0.12|0.06,apad=pad_dur=0.2[v];\
[1:a]lowpass=f=400[ug];[v][ug]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.9,loudnorm=I=-16:TP=-1.5:LRA=7" \
      -ac 1 -ar 22050 -c:a libmp3lame -b:a 48k "$c" ;;
esac
