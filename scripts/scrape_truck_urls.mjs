import fetch from "node-fetch";
import fs from "fs";

const pages = [
  { name: "tata_1109", url: "https://trucks.cardekho.com/en/trucks/tata/1109-g-lpt" },
  { name: "tata_lpt_712", url: "https://tractorkarvan.com/commercial-vehicle/tata/truck/lpt-712" },
  { name: "eicher_2049", url: "https://trucks.tractorjunction.com/en/eicher-truck/pro-2049" },
  { name: "bharatbenz_1617", url: "https://trucks.tractorjunction.com/en/bharat-benz-truck/1617r" },
  { name: "bharatbenz_tb", url: "https://www.trucksbuses.com/trucks/cargo-truck/bharatbenz-1617r" }
];

async function run() {
  for (const p of pages) {
    try {
      const res = await fetch(p.url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      });
      const html = await res.text();
      const imgs = [...new Set(html.match(/https:\/\/[^"'\s<>]+\.(?:jpg|jpeg|png|webp)/gi) || [])];
      console.log(`\n=== ${p.name} ===`);
      const filtered = imgs.filter(img => /truck|1109|712|2049|1617|vehicle|lpt/i.test(img));
      console.log(filtered.slice(0, 6));
    } catch (e) {
      console.error(p.name, e.message);
    }
  }
}

run();
