import fetch from "node-fetch";

async function get() {
  for (const url of [
    "https://www.eichertrucksandbuses.com/light-medium-duty-trucks/sub-5-ton/pro-2049-plus",
    "https://trucks.tractorjunction.com/en/eicher-truck/pro-2049-plus",
    "https://www.trucksbuses.com/trucks/cargo-truck/eicher-pro-2049-plus"
  ]) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } });
      const html = await res.text();
      const imgs = [...new Set(html.match(/(?:https:)?\/\/[^"'\s<>]+\.(?:jpg|jpeg|png|webp)/gi) || [])];
      console.log(`=== ${url} ===`);
      imgs.filter(i => /pro-2049|2049/i.test(i)).forEach(i => console.log(i));
    } catch (e) {
      console.error(url, e.message);
    }
  }
}

get();
