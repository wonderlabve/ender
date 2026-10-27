import base64, re, os, sys
d = sys.argv[1]
c = open(os.path.join(d,'styles.css')).read(); j = open(os.path.join(d,'script.js')).read(); s = open(os.path.join(d,'index.html')).read()
names = sorted(set(re.findall(r"img/([\w\-]+)\.jpg", s)))
root = ':root{' + ''.join(f"--i-{n}:url('data:image/jpeg;base64,{base64.b64encode(open(os.path.join(d,'img',n+'.jpg'),'rb').read()).decode()}');" for n in names if os.path.exists(os.path.join(d,'img',n+'.jpg'))) + '}'
def sub(m):
    n = m.group(1)
    return f"var(--i-{n})" if os.path.exists(os.path.join(d,'img',n+'.jpg')) else m.group(0)
s = re.sub(r"url\('img/([\w\-]+)\.jpg'\)", sub, s)
s = re.sub(r'<span class="ph-label">[^<]*</span>', '', s)
s = re.sub(r'data-full="img/([\w\-]+)\.jpg"', lambda m: f'data-full="var(--i-{m.group(1)})"', s)
s = s.replace('<link rel="stylesheet" href="styles.css">', '<style>\n' + root + '\n' + c + '\n</style>').replace('<script src="script.js"></script>', '<script>\n' + j + '\n</script>')
open(os.path.join(d,'preview.html'),'w').write(s); print(len(s)//1024, 'KB', len(names), 'imgs')
