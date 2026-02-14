const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 5501;
const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".mp3": "audio/mpeg",
};

const server = http.createServer((req, res) => {
  let file = req.url === "/" ? "/index.html" : req.url;
  file = path.join(__dirname, file.replace(/\?.*$/, ""));
  const ext = path.extname(file);
  const type = MIME[ext] || "application/octet-stream";

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log("");
  console.log("  Valentine project is running!");
  console.log("  Open in browser: http://localhost:" + PORT);
  console.log("  Press Ctrl+C to stop");
  console.log("");
});
