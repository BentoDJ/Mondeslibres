cd /tmp/claude-0/-home-user-Mondeslibres/23a6e3ab-1c95-5f07-beb6-96d48b06a73b/scratchpad/bandeaux/all/src
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"
while read -r u; do f=$(echo "$u" | sed 's#.*/\([0-9]*\)-large_default/.*#\1#'); [ -s "$f.jpg" ] || curl -sS -m 30 -A "$UA" -o "$f.jpg" "$u"; done < /tmp/claude-0/-home-user-Mondeslibres/23a6e3ab-1c95-5f07-beb6-96d48b06a73b/scratchpad/bandeaux/all/urls.txt
cd /tmp/claude-0/-home-user-Mondeslibres/23a6e3ab-1c95-5f07-beb6-96d48b06a73b/scratchpad/bandeaux/all && /tmp/claude-0/-home-user-Mondeslibres/23a6e3ab-1c95-5f07-beb6-96d48b06a73b/scratchpad/venv-rembg/bin/python -I - <<'PY'
from rembg import remove, new_session
from PIL import Image
import glob, json, os, numpy as np
A='/tmp/claude-0/-home-user-Mondeslibres/23a6e3ab-1c95-5f07-beb6-96d48b06a73b/scratchpad/bandeaux/all/'
s=new_session('u2net'); q={}
for f in sorted(glob.glob(A+'src/*.jpg')):
    k=os.path.basename(f)[:-4]; o=A+'cut/'+k+'.png'
    try:
        if not os.path.exists(o):
            im=Image.open(f).convert('RGB'); out=remove(im,session=s); bb=out.getbbox()
            if not bb: continue
            out.crop(bb).save(o)
        c=Image.open(o); al=np.array(c)[:,:,3]; w,h=c.size
        # coins de la boîte : un détourage raté laisse un fond opaque dans les coins
        corners=np.mean([al[:max(1,h//12),:max(1,w//12)].mean(),al[:max(1,h//12),-max(1,w//12):].mean(),al[-max(1,h//12):,:max(1,w//12)].mean(),al[-max(1,h//12):,-max(1,w//12):].mean()])/255
        q[k]={'ratio':round(h/w,2),'fill':round(float((al>128).mean()),2),'h':h,'w':w,'coins':round(float(corners),2)}
    except Exception as e: print('ERR',k,e)
json.dump(q,open(A+'qual.json','w'),indent=0); print('fini',len(q))
PY
