import fetch from "node-fetch";

const targets = [
  { id: 'v04', name: 'Ashok Leyland Dost+', url: 'https://trucks.cardekho.com/en/trucks/ashok-leyland/dost-plus' },
  { id: 'v05', name: 'Tata 407 LPT', url: 'https://trucks.cardekho.com/en/trucks/tata/407-gold-29-wb' },
  { id: 'v06', name: 'Eicher Pro 2049', url: 'https://trucks.cardekho.com/en/trucks/eicher/pro-2049' },
  { id: 'v07', name: 'Tata 1109', url: 'https://trucks.cardekho.com/en/trucks/tata/t-11-ultra' },
  { id: 'v08', name: 'BharatBenz 1617R', url: 'https://trucks.cardekho.com/en/trucks/bharatbenz/1617r' }
];

async function check() {
  for (const t of targets) {
    try {
      const res = await fetch(t.url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      });
      const html = await res.text();
      const regex = /https:\/\/truckcdn\.cardekho\.com\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)/gi;
      const matches = [...new Set(html.match(regex) || [])];
      console.log(`=== ${t.name} ===`);
      const relevant = matches.filter(m => !m.includes('fonts') && !m.includes('footer') && !m.includes('logo') && !m.includes('icon'));
      console.log(relevant.slice(0, 5));
    } catch (e) {
      console.error(t.name, e.message);
    }
  }
}

check();
