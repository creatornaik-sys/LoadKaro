import fetch from "node-fetch";

async function fetchImages(url, label) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
    });
    const html = await res.text();
    const imgs = [...new Set(html.match(/(?:https:)?\/\/[^"'\s<>]+\.(?:jpg|jpeg|png|webp)/gi) || [])];
    console.log(`=== ${label} ===`);
    imgs.filter(i => /pro-2049|2049|712|lpt|truck/i.test(i)).slice(0, 10).forEach(i => console.log(i));
  } catch (e) {
    console.error(label, e.message);
  }
}

async function run() {
  await fetchImages("https://www.eichertrucksandbuses.com/light-medium-duty-trucks/sub-5-ton/pro-2049", "Eicher 2049");
  await fetchImages("https://trucks.tatamotors.com/lpt/tata-lpt-712", "Tata LPT 712");
}

run();
