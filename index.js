const http = require("http");
const path = require("path");
const fs = require("fs");
const readFilePromise = require("./helpers/readFilePromise");
const responseCodes = require("./constants/responseCodes");
const getAllArticles = require("./endpoints/articles/getAllArticles");
const getArticlesById = require("./endpoints/articles/getArticlesById");
const createArticle = require("./endpoints/articles/createArticle");
const updateArticle = require("./endpoints/articles/updateArticle");
const deleteArticle = require("./endpoints/articles/deleteArticle");

const pino = require("pino");
const pinoHttp = require("pino-http");

const logPath = path.join(__dirname, "server.log");
const logStream = fs.createWriteStream(logPath, { flags: "a" });

const logger = pino(
  {
    level: "info",
  },
  logStream,
);

const httpLogger = pinoHttp({ logger });

const hostname = "127.0.0.1";
const port = 3000;

const handlers = {
  "/api/articles/readall": getAllArticles,
  "/api/articles/read": getArticlesById,
  "/api/articles/create": createArticle,
  "/api/articles/update": updateArticle,
  "/api/articles/delete": deleteArticle,
};

function createServerWithCustomData(articles, comments) {
  return (req, res) => {
    httpLogger(req, res);
    let bodyData = "";

    req.on("data", (chunk) => {
      bodyData += chunk;
    });

    req.on("end", () => {
      let body;
      try {
        body = JSON.parse(bodyData);
      } catch (err) {
        console.log(err);
      } finally {
        const [url, paramsString] = req.url.split("?");
        const params = paramsString?.split("&")?.reduce((acc, splittedParams) => {
          const [key, value] = splittedParams.split("=");
          acc[key] = value;
          return acc;
        }, {});

        const handler = getHandler(url);
        const data = { articles, comments };
        const objectAttributes = { payload: data, params, body };

        handler(req, res, objectAttributes, (err, result) => {
          res.setHeader("Content-Type", "application/json");

          if (err) {
            res.statusCode = err.code;
            res.end(JSON.stringify(err));
          } else {
            res.statusCode = 200;
            res.end(JSON.stringify(result));
          }
        });
      }
    });
  };
}
async function startServer() {
  const filesToGet = ["articles.json", "comments.json"].map((fileName) => readFilePromise(path.join(__dirname, "data", fileName)));
  console.log("Getting data from database");
  const [data1, data2] = await Promise.all(filesToGet);
  console.log("Data was succsessfuly loaded");

  const server = http.createServer(createServerWithCustomData(data1, data2));

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

function getHandler(url) {
  return handlers[url] || notFound;
}

function notFound(req, res, data, cb) {
  cb({ code: 404, message: "Not found" });
}

startServer();
