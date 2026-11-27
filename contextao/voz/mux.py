# Uso: python3 voz/mux.py AUDIO.mp3 SEGS.json VIDEO_MUDO.mp4 SAIDA.mp4
import json, subprocess, sys
audio, segs_f, video, out = sys.argv[1:5]; segs = json.load(open(segs_f)); flt = []; n = 0
for s in segs:
    if s[0] == 'sil': flt.append(f"anullsrc=r=44100:cl=mono,atrim=0:{s[1]}[p{n}]")
    else: flt.append(f"[0:a]atrim=start={s[1]}" + (f":end={s[2]}" if s[2] else "") + f",asetpts=PTS-STARTPTS,aformat=sample_rates=44100:channel_layouts=mono[p{n}]")
    n += 1
flt.append("anullsrc=r=44100:cl=mono,atrim=0:3[tail]")
flt.append(''.join(f'[p{i}]' for i in range(n)) + f"[tail]concat=n={n+1}:v=0:a=1,highpass=f=60,loudnorm=I=-16:TP=-1.5:LRA=11[out]")
subprocess.run(['ffmpeg','-y','-loglevel','error','-i',audio,'-filter_complex',';'.join(flt),'-map','[out]','-ar','48000','/tmp/_narr.wav'], check=True)
subprocess.run(['ffmpeg','-y','-loglevel','error','-i',video,'-i','/tmp/_narr.wav','-map','0:v','-map','1:a','-c:v','copy','-c:a','aac','-b:a','192k','-movflags','+faststart',out], check=True)
print(subprocess.run(['ffprobe','-v','error','-show_entries','stream=codec_type,duration','-of','csv=p=0',out],capture_output=True,text=True).stdout)
