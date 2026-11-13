import fetch from "node-fetch";

async function run() {
  const q = 'bharatbenz 1617R site:trucks.cardekho.com OR site:trucksbuses.com OR site:trucksfloor.com OR site:motorindiaonline.com';
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(q)}`;
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  const html = await res.text();
  const urls = [...html.matchAll(/class="result__url"[^>]*>([^<]+)/g)].map(m => m[1].trim());
  console.log("BharatBenz links:", urls.slice(0, 8));
}

run();
