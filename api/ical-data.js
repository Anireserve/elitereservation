// ═══════════════════════════════════════════════════════
//  Elite Home Group Israel — Vercel Serverless Function
//  Récupère les calendriers iCal Airbnb côté serveur
//  Route : /api/ical-data  (GET)
// ═══════════════════════════════════════════════════════

const https = require('https');

const ICAL_URLS = {
  "Apt 83361 — Netanya": "https://www.airbnb.fr/calendar/ical/1315345554016383361.ics?t=7694717924684c6f8fcd66996729d7bc",
  "Apt 53616 — Netanya": "https://www.airbnb.fr/calendar/ical/1490708023786053616.ics?t=33e801ad23c64b069220c6be0a21d652",
  "Apt 67193 — Netanya": "https://www.airbnb.fr/calendar/ical/1629900440159467193.ics?t=1ec69b226c614330861185ba08e07a7a",
  "Apt 25731 — Netanya": "https://www.airbnb.fr/calendar/ical/1637882744798925731.ics?t=9ef7d150795a4410bdc3a908a645f091",
  "Apt 52810 — Netanya": "https://www.airbnb.fr/calendar/ical/1533834667656852810.ics?t=67ab162d53724c8f80b0bb0761085516",
  "Apt 24670 — Netanya": "https://www.airbnb.fr/calendar/ical/1626970716235924670.ics?t=e39d492eeba84defb85a9ae861427a55",
  "Apt 46519 — Netanya": "https://www.airbnb.fr/calendar/ical/1654299312702546519.ics?t=923fc85ccf0e4eb58039ebebfef012c0",
  "Apt 52163 — Netanya": "https://www.airbnb.fr/calendar/ical/1224521245162452163.ics?t=4179f8c4d9e847eaab939fb3950811de",
  "Apt 33864 — Netanya": "https://www.airbnb.fr/calendar/ical/1175085191554333864.ics?t=67ea59578667405a81c3a54be03a336a",
  "Hébergement 76898 — Kfar Yona": "https://www.airbnb.fr/calendar/ical/1466620094626476898.ics?t=af20cb726d9641de8e8b5f9e205ed495",
  "Apt 99317 — Netanya": "https://www.airbnb.fr/calendar/ical/1433841370821199317.ics?t=4b031929599d41a3b82b940f29758706",
  "Apt 77569 — Netanya": "https://www.airbnb.fr/calendar/ical/1521653346666177569.ics?t=405f1b25a678487c89b525f830a950bf",
  "Apt 28715 — Netanya": "https://www.airbnb.fr/calendar/ical/1612237951481128715.ics?t=4508d38c3b3b4d7e95e565aae39d613d",
  "Apt 01411 — Netanya": "https://www.airbnb.fr/calendar/ical/36501411.ics?t=7391189aafcd404fa810711f5a243c83",
  "Apt 28256 — Netanya": "https://www.airbnb.fr/calendar/ical/1605910608745528256.ics?t=61493af62ab34bc1a92b791f0452265a",
  "Apt 60747 — Netanya": "https://www.airbnb.fr/calendar/ical/1303437225728460747.ics?t=2868999189d949bf80f11a8a1c18ab6c",
  "Apt 66024 — Netanya": "https://www.airbnb.fr/calendar/ical/1506397101353566024.ics?t=6d4dd98d55224c2ca1f3e2cb1eae80d7",
  "Apt 25761 — Netanya": "https://www.airbnb.fr/calendar/ical/1612283322683825761.ics?t=de62833287804c46b18c024faf4eb0f0",
  "Apt 88745 — Netanya": "https://www.airbnb.fr/calendar/ical/1241953428669588745.ics?t=1d4fb76bbbff4faca40237b6132d0bab",
  "Apt 25814 — Netanya": "https://www.airbnb.fr/calendar/ical/1629928696618625814.ics?t=fb695f212ad844deb76ff6b9abdbe682",
  "Apt 98316 — Netanya": "https://www.airbnb.fr/calendar/ical/1629663765623298316.ics?t=cacb8c782aad45d5be2bcab2b87077f7",
  "Apt 28766 — Netanya": "https://www.airbnb.fr/calendar/ical/1629651714774328766.ics?t=3397fd65e68b4aea8df2b6cda3ccdef9",
  "Apt 00321 — Netanya": "https://www.airbnb.fr/calendar/ical/1479665460583700321.ics?t=dd94ba77ea484d78ba913ba7c1ec4d49",
  "Apt 81203 — Tel Aviv-Yafo": "https://www.airbnb.fr/calendar/ical/1502931916854381203.ics?t=23c22a1e8c744114aed1b110badf1e66",
  "Apt 43435 — Netanya": "https://www.airbnb.fr/calendar/ical/1335310134902043435.ics?t=d308e538a2a2413295738453c2d952cb",
  "Apt 45560 — Netanya": "https://www.airbnb.fr/calendar/ical/1513138205634145560.ics?t=a59a6dcf4c794a66b141ed1ade79c664",
  "Hébergement 66319 — Netanya": "https://www.airbnb.fr/calendar/ical/1640523959762966319.ics?t=55b19ef9a97a4e1e92de9d626420cb95",
  "Apt 70682 — Netanya": "https://www.airbnb.fr/calendar/ical/1473183298554670682.ics?t=d78811fbeb2d4cfaa1f5521722e4a855",
  "Hébergement 88941 — Kfar Yona": "https://www.airbnb.fr/calendar/ical/1169666737889988941.ics?t=702ecd34f28942d488eb740ed4b81ee9",
  "Apt 57229 — Kfar Yona": "https://www.airbnb.fr/calendar/ical/1415005754265857229.ics?t=669a15619c414132a9992d1a683eeb78",
  "Villa 72659 — Netanya": "https://www.airbnb.fr/calendar/ical/39772659.ics?t=214cbdad1d584d67b4a8164d063189d0",
  "Apt 40567 — Tel Aviv-Yafo": "https://www.airbnb.fr/calendar/ical/1668109411780640567.ics?t=91cf6b2684554092990876ca1c80890f",
  "Apt 65146 — Netanya": "https://www.airbnb.fr/calendar/ical/49165146.ics?t=e1200003f1c84f2a895abbec2bc1aea9",
  "Apt 31930 — Netanya": "https://www.airbnb.fr/calendar/ical/1298592173553231930.ics?t=71e76567d89e460bb06829946f545472",
  "Apt 91879 — Netanya": "https://www.airbnb.fr/calendar/ical/1384120621324091879.ics?t=cdb9c12360ca4144822bf851dd7cb795",
  "Apt 45649 — Netanya": "https://www.airbnb.fr/calendar/ical/1445523645377045649.ics?t=bc26a86dff824a1d8e7a67c845fa259b",
  "Apt 75248 — Netanya": "https://www.airbnb.fr/calendar/ical/1192536760548875248.ics?t=d28976efc4c44f65b2e48dc60bf715f5",
  "Apt 46032 — Netanya": "https://www.airbnb.fr/calendar/ical/1645556918794746032.ics?t=84f31d2c06864d719f2716f491b1255a",
  "Apt 21882 — Netanya": "https://www.airbnb.fr/calendar/ical/1304188349571321882.ics?t=c04ebcfe54c64dfd87c82209122b6614",
  "Apt 91605 — Netanya": "https://www.airbnb.fr/calendar/ical/1054952503406291605.ics?t=1de0ba887a5f426ebb12856e1e056a47",
  "Apt 69599 — Netanya": "https://www.airbnb.fr/calendar/ical/1046081133849569599.ics?t=1c17af95582444048a24caba7b9da58f",
  "Apt 88252 — Jérusalem": "https://www.airbnb.fr/calendar/ical/990467087965488252.ics?t=4c6cb741a15d4c2c8d37de3bc0a5b4a2",
  "Apt 55059 — Netanya": "https://www.airbnb.fr/calendar/ical/957684850185155059.ics?t=5cfe285c675f455280ee82a6d8b48a1e",
  "Apt 85169 — Netanya": "https://www.airbnb.fr/calendar/ical/955048939559085169.ics?t=9c473a5fbd6549fc96829211e105bfb7",
  "Apt 02852 — Netanya": "https://www.airbnb.fr/calendar/ical/922400765551402852.ics?t=d0c6ebe86540468582fb3eb740b1658a",
  "Apt 37229 — Netanya": "https://www.airbnb.fr/calendar/ical/907663434158237229.ics?t=45a1ea06e10b405ca65405abb2e6f009",
  "Apt 37730 — Netanya": "https://www.airbnb.fr/calendar/ical/888213373135337730.ics?t=3f1f44b2143d4bff87914c7b9bcd809e",
  "Hébergement 89961 — Kfar Yona": "https://www.airbnb.fr/calendar/ical/811642557269889961.ics?t=b5b752a7036e434092958d9c6440130a",
  "Apt 32753 — Ra'anana": "https://www.airbnb.fr/calendar/ical/795626826720732753.ics?t=fb85b4865bee412d901182c516b9b23f",
  "Apt 16645 — Netanya": "https://www.airbnb.fr/calendar/ical/767323456779416645.ics?t=0b4ae61650d44376a5e2402bac33da2d",
  "Gad Mahness XVIII - Groupe Maison d'Élite": "https://www.airbnb.fr/calendar/ical/48538162.ics?t=bb3ce0d988634a30a3b72185fedd913b",
  "Histadrute - Groupe Maison d'Élite": "https://www.airbnb.fr/calendar/ical/45095363.ics?t=8586896da37248b892d637da58fc9983",
  "Nitza XIV - Élite Home Group": "https://www.airbnb.fr/calendar/ical/42507906.ics?t=e45c59c6043c45a3ad08518c45ca5fa4",
  "Hashmonaim VII - Groupe ELITE HOME": "https://www.airbnb.fr/calendar/ical/40385717.ics?t=c9ccd51ef12a4329a8eadf54f03d873c",
};

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/calendar,*/*',
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetchUrl(res.headers.location).then(resolve).catch(reject);
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('timeout')); });
    req.on('error', reject);
  });
}

function parseIcal(text) {
  const events = [];
  let current = {};
  for (const rawLine of text.split('\n')) {
    const line = rawLine.trim();
    if (line === 'BEGIN:VEVENT') {
      current = {};
    } else if (line === 'END:VEVENT') {
      if (current.start && current.end) events.push({ start: current.start, end: current.end });
      current = {};
    } else if (line.startsWith('DTSTART')) {
      const m = line.match(/(\d{8})/);
      if (m) { const d = m[1]; current.start = `${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,8)}`; }
    } else if (line.startsWith('DTEND')) {
      const m = line.match(/(\d{8})/);
      if (m) { const d = m[1]; current.end = `${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,8)}`; }
    }
  }
  return events;
}

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600'); // cache 5 min

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const data = {};
  await Promise.all(
    Object.entries(ICAL_URLS).map(async ([name, url]) => {
      try {
        const text = await fetchUrl(url);
        const events = parseIcal(text);
        data[name] = { ok: true, events };
      } catch (e) {
        data[name] = { ok: false, events: [], error: e.message };
      }
    })
  );

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(data);
};
