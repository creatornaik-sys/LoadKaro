import fetch from "node-fetch";

async function search(q) {
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(q)}`;
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } });
  const html = await res.text();
  const links = [...html.matchAll(/class="result__snippet"[^>]*>([\s\S]*?)<\/a>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const urls = [...html.matchAll(/class="result__url"[^>]*>([^<]+)/g)].map(m => m[1].trim());
  console.log(`=== Query: ${q} ===`);
  urls.slice(0, 4).forEach((u, i) => console.log(u, links[i]?.slice(0, 80)));
}

async function run() {
  await search('"LPT 712" tata');
  await search('"1109g LPT" tata');
  await search('"Pro 2049" eicher orange OR CNG OR plus');
  await search('bharatbenz 1617 highway OR trucksdekho OR cardekho');
}

run();
