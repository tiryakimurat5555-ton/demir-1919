# Kullanım: dongu.py girdi cikti kanal oran capraz_sn I
import sys, subprocess, numpy as np
gir, cik, kanal, oran, cx, I = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4]), float(sys.argv[5]), sys.argv[6]
ham = subprocess.run(['ffmpeg','-v','error','-i',gir,'-af','loudnorm=I=%s:TP=-3'%I,'-ac',str(kanal),'-ar',str(oran),'-f','f32le','-'],capture_output=True,check=True).stdout
x = np.frombuffer(ham, dtype=np.float32).reshape(-1, kanal).copy()
n = int(cx*oran)
bas, govde, son = x[:n], x[n:-n] if len(x) > 3*n else x[n:], x[-n:]
t = np.linspace(0,1,n)[:,None]
kar = son*np.cos(t*np.pi/2) + bas*np.sin(t*np.pi/2)
y = np.concatenate([kar, x[n:-n]])
uzanti = cik.rsplit('.',1)[1]
arg = ['ffmpeg','-y','-v','error','-f','f32le','-ar',str(oran),'-ac',str(kanal),'-i','-']
arg += (['-c:a','pcm_s16le'] if uzanti=='wav' else ['-b:a','96k'])
subprocess.run(arg+[cik], input=y.astype(np.float32).tobytes(), check=True)
