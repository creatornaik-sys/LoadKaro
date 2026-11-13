import fetch from "node-fetch";

async function run() {
  const urls = [
    "https://www.bharatbenz.com/trucks/mdt-specifications-1617r-72",
    "https://trucks.cardekho.com/en/trucks/bharat-benz/1617r",
    "https://tractorkarvan.com/commercial-vehicle/bharatbenz/truck/1617r",
    "https://www.truckonwheels.com/bharatbenz/bharatbenz-1617r"
  ];
  for (const u of urls) {
    try {
      const res = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } });
      const html = await res.text();
      const imgs = [...new Set(html.match(/(?:https:)?\/\/[^"'\s<>]+\.(?:jpg|jpeg|png|webp)/gi) || [])];
      console.log(`=== ${u} ===`);
      imgs.filter(i => /1617|truck|bharat/i.test(i)).slice(0, 10).forEach(i => console.log(i));
    } catch (e) {
      console.error(u, e.message);
    }
  }
}

run();
