const fs = require("fs");
const https = require("https");
const path = require("path");

const ICS_URL =
  "https://calendar.google.com/calendar/ical/swecc%40uw.edu/public/basic.ics";
const DEST = path.join(__dirname, "..", "public", "calendar.ics");

function download(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, { timeout: 10000 }, (response) => {
      if (
        response.statusCode >= 300 &&
        response.statusCode < 400 &&
        response.headers.location
      ) {
        response.resume();
        download(response.headers.location).then(resolve, reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Calendar sync failed: HTTP ${response.statusCode}`));
        response.resume();
        return;
      }
      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    });
    request.on("error", reject);
    request.on("timeout", () => {
      request.destroy();
      reject(new Error("Calendar sync timed out"));
    });
  });
}

download(ICS_URL)
  .then((text) => {
    if (!text.includes("BEGIN:VCALENDAR")) {
      throw new Error("Calendar sync returned unexpected content");
    }
    fs.mkdirSync(path.dirname(DEST), { recursive: true });
    fs.writeFileSync(DEST, text);
    console.log(`Synced Google Calendar ICS to ${path.relative(process.cwd(), DEST)}`);
  })
  .catch((error) => {
    if (fs.existsSync(DEST)) {
      console.warn(`${error.message}. Using existing ${path.relative(process.cwd(), DEST)}`);
      process.exit(0);
    }
    console.error(error.message);
    process.exit(0);
  });
