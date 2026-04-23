import urllib.request
import os

images = {
    'kapil_sharma.png': 'https://upload.wikimedia.org/wikipedia/en/4/45/The_Kapil_Sharma_Show_logo.png',
    'indian_idol.png':  'https://upload.wikimedia.org/wikipedia/en/7/72/Indianidol14.png',
    'shark_tank.png':   'https://upload.wikimedia.org/wikipedia/en/2/2f/Shark_Tank_India.jpg',
    'kbc.png':          'https://upload.wikimedia.org/wikipedia/commons/0/03/KAUN_BANEGA_CROREPATI_SEASON_11.jpg',
    'bigg_boss.png':    'https://upload.wikimedia.org/wikipedia/en/9/92/Bigg_Boss_17.png',
    'dance_deewane.png':'https://upload.wikimedia.org/wikipedia/en/3/39/DanceDeewane.png',
    'tanck.png':        'https://upload.wikimedia.org/wikipedia/commons/0/0c/IGT_Logo.png',
}

os.makedirs('assets/images', exist_ok=True)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Referer': 'https://en.wikipedia.org/'
}

for filename, url in images.items():
    dest = f'assets/images/{filename}'
    print(f'Downloading {filename} ...', end=' ', flush=True)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as r, open(dest, 'wb') as f:
            f.write(r.read())
        size = os.path.getsize(dest)
        print(f'OK ({size//1024} KB)')
    except Exception as e:
        print(f'FAILED — {e}')
