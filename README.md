# Annapurna Muhim — PWA (Progressive Web App)

Yeh wahi form hai, ab ek **installable PWA** ke roop mein. PWA ka matlab:
koi app store install nahi chahiye — user browser mein site kholta hai aur
"Install App" dabakar isse phone/laptop ke home screen / app drawer par
app jaisa install kar sakta hai. Offline bhi chalta hai (ek baar khulne
ke baad).

## Is folder mein kya hai

- `index.html` — aapka original form (bina content change ke), bas head
  mein PWA tags (`manifest`, icons) aur end mein service-worker
  registration + ek "Install App" button add kiya gaya hai.
- `manifest.json` — app ka naam, icon, theme color, standalone display
  mode define karta hai.
- `sw.js` — service worker: form + icons cache karta hai taaki offline
  bhi khule; CDN scripts (fonts, jsPDF, xlsx, html2canvas) online-first
  cache hote hain.
- `icons/` — aapke logo se banaye gaye sab required sizes (72px se 512px
  tak), + ek "maskable" icon jo Android adaptive-icon shapes ke saath
  sahi fit hota hai.

## ⚠️ Zaroori: PWA ko HTTPS par host karna padta hai

Browsers install-prompt aur service worker sirf **HTTPS** (ya
`localhost`) par allow karte hain — file ko seedha double-click karke
(`file://`) kholne se install button aur offline-caching kaam nahi
karenge. Free hosting options (drag-and-drop, 2 minute mein live):

1. **Netlify Drop** — https://app.netlify.com/drop
   Is poore folder ko waha drag-drop karein, turant ek live HTTPS link
   mil jaayega.
2. **GitHub Pages** — folder ko ek GitHub repo mein push karke Settings →
   Pages se enable karein.
3. **Firebase Hosting** — `firebase init hosting` → `firebase deploy`.
4. Apna existing domain/hosting bhi use kar sakte hain — bas poora
   folder waise hi upload kar dein (root ya kisi subfolder mein).

## Local par test karna ho (install prompt ke bina, bas offline-check)

Terminal mein is folder ke andar:
```
python3 -m http.server 8000
```
Phir browser mein `http://localhost:8000` kholein — localhost par bhi
service worker aur install-prompt kaam karte hain.

## User experience

- Chrome/Edge (Android/Desktop) par site kholte hi neeche-left mein
  "ऐप इंस्टॉल करें" button dikhega — tap karte hi home screen icon ban
  jaata hai, app apni window mein (bina browser address bar ke) khulta
  hai.
- iPhone/Safari par automatic install-prompt nahi aata (Apple ka
  limitation) — user ko Share button → "Add to Home Screen" manually
  karna hota hai, lekin icon/naam sahi dikhega kyunki humne
  `apple-touch-icon` add kar diya hai.
- Ek baar install/open ho jaaye to form offline bhi kaam karta hai aur
  progress bhi save hota hai (jaisa website version mein hota hai).

## Naam / icon / theme color badalna ho to

- App ka naam: `manifest.json` mein `name` aur `short_name`
- Icon: `icons/` folder ki PNGs replace karein (same file names/sizes
  rakhein) — sabse zaroori `icon-512.png` aur `icon-maskable-512.png`
- Theme/status-bar color: `manifest.json` ka `theme_color` aur
  `background_color`
