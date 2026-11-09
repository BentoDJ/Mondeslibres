import json, os, re, sys
from PIL import Image
A=os.path.dirname(os.path.abspath(__file__))+'/'
cats=json.load(open(A+'cats.json')); q=json.load(open(A+'qual.json'))
GARDER={'157','162','156'}          # vraies photos / logo : on ne touche pas
BOISSONS={'5','9','10','11','20','21','22','27','28','29','196','6','12','13','14','171','182','183','184','186','187','188','189','190','191','192','193','194','7','167','169','170'}
W,H0,PAD,GAPMIN=2682,600,40,36
EXCLUS={'35','318'}   # détourage raté (traînée au-dessus du goulot, reste de fond blanc)
import numpy as np
def empreinte(k):
    im=Image.open(A+'cut/'+k+'.png').convert('RGBA').resize((12,36)); a=np.array(im).astype(float)
    return a[:,:,:3]*(a[:,:,3:]/255.)
def nom_court(n):
    return re.sub(r'\s*\d+([,.]\d+)?\s*(cl|ml|l|g)\b.*$','',n.lower()).strip()
plan={}
def ok(k,boisson):
    v=q.get(k)
    if not v or v['coins']>0.12 or v['h']<300: return False
    if boisson: return 2.3<=v['ratio']<=5.5 and 0.4<=v['fill']<=0.85
    return 0.35<=v['ratio']<=5.5 and 0.35<=v['fill']<=0.97
for cid,c in cats.items():
    if cid in GARDER: continue
    boisson=cid in BOISSONS
    keys=[];vus=[];noms=set()
    for p in c['prods']:
        m=re.search(r'/(\d+)-large_default/',p['img'])
        if not m or m.group(1) in keys or m.group(1) in EXCLUS or not ok(m.group(1),boisson): continue
        k=m.group(1); nc=nom_court(p['n'] or '')
        e=empreinte(k)
        if nc in noms or any(np.abs(e-x).mean()<14 for x in vus): continue   # même produit en une autre contenance
        keys.append(k); vus.append(e); noms.add(nc)
    items=[];total=0
    for k in keys:
        v=q[k]; h=540 if v['ratio']>=1.8 else 400
        w=round(h/v['ratio'])
        if total+w+(len(items))*GAPMIN > W-2*PAD: continue
        items.append((k,h,w)); total+=w
    if len(items)<5:
        plan[cid]={'slug':c['slug'],'action':'masquer','nb':len(items)}; continue
    # alternance des hauteurs : on mélange un peu les formats pour éviter les blocs
    gap=(W-2*PAD-total)/(len(items)-1); gap=min(gap,120)
    used=total+gap*(len(items)-1); x=(W-used)/2
    canvas=Image.new('RGB',(W,H0),(255,255,255))
    for k,h,w in items:
        im=Image.open(A+'cut/'+k+'.png').convert('RGBA').resize((w,h),Image.LANCZOS)
        canvas.paste(im,(round(x),H0-30-h),im); x+=w+gap
    canvas.save(A+'out/'+cid+'.jpg',quality=88)
    plan[cid]={'slug':c['slug'],'action':'bandeau','nb':len(items),'produits':[k for k,_,_ in items]}
json.dump(plan,open(A+'plan.json','w'),indent=1)
for cid,v in sorted(plan.items(),key=lambda x:int(x[0])): print(cid,v['slug'],v['action'],v['nb'])
