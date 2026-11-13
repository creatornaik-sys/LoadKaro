import fetch from "node-fetch";

async function search() {
  const q = 'eicher pro 2049 plus cng OR orange site:eichertrucksandbuses.com OR site:motorindiaonline.com OR site:trucksfloor.com OR site:trucksbuses.com';
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(q)}`;
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } });
  const html = await res.text();
  const urls = [...html.matchAll(/class="result__url"[^>]*>([^<]+)/g)].map(m => m[1].trim());
  console.log(urls.slice(0, 8));
}

search();
