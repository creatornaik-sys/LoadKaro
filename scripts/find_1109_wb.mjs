import fetch from "node-fetch";

async function get() {
  const urls = [
    "https://trucks.tractorjunction.com/en/tata-truck/1109g-lpt",
    "https://tractorkarvan.com/commercial-vehicle/tata/truck/1109g-lpt"
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      const html = await res.text();
      const imgs = [...new Set(html.match(/(?:https:)?\/\/[^"'\s<>]+\.(?:jpg|jpeg|png|webp)/gi) || [])];
      console.log(`=== ${url} ===`);
      imgs.filter(i => /1109/i.test(i)).forEach(i => console.log(i));
    } catch (e) {
      console.error(url, e.message);
    }
  }
}

get();
