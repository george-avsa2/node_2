const http = require("http");
const path = require("path");
const readFilePromise = require("./helpers/readFilePromise");
const sendData = require("./helpers/sendJson");
const parseBodyJson = require("./helpers/parseBodyJson");

const hostname = "127.0.0.1";
const port = 3000;

const handlers = {
  "/sum": sum,
};

const server = http.createServer((req, res) => {
  parseBodyJson(req, (err, payload) => {
    const handler = getHandler(req.url);

    handler(req, res, payload, sendData);
  });
});

async function startServer() {
  const filesToGet = ["articles.json", "comments.json"].map((fileName) => readFilePromise(path.join(__dirname, "data", fileName)));
  const [data1, data2] = await Promise.all(filesToGet);

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

function getHandler(url) {
  return handlers[url] || notFound;
}

function sum(req, res, payload, cb) {
  if (!payload) {
    cb("Body is empty", res);
  }
  const result = { c: payload.a + payload.b };

  cb(null, res, result);
}

function notFound(req, res, payload, cb) {
  cb({ code: 404, message: "Not found" });
}

startServer();
