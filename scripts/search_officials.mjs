import fetch from "node-fetch";

async function searchDuck(query) {
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } });
  const html = await res.text();
  const urls = [...html.matchAll(/class="result__url"[^>]*>([^<]+)/g)].map(m => m[1].trim());
  console.log(`=== Query: ${query} ===`);
  console.log(urls.slice(0, 4));
}

async function run() {
  await searchDuck('site:eichertrucksandbuses.com "Pro 2049"');
  await searchDuck('site:trucks.tatamotors.com "LPT 712"');
  await searchDuck('site:trucks.tatamotors.com "1109"');
  await searchDuck('site:bharatbenz.com "1617R"');
}

run();
