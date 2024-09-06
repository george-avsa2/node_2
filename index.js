const fs = require("fs");
const http = require("http");
const path = require("path");
const readFilePromise = require("./helpers/readFilePromise");
const parseBodyJson = require("./helpers/parseBodyJson");
const responseCodes = require("./constants/responseCodes");

const hostname = "127.0.0.1";
const port = 3000;

const handlers = {
  "/sum": sum,
  "/api/articles/readall": getAllArticles,
  "/api/articles/read": getArticlesById,
  "/api/articles/create": createArticle,
  "/api/articles/update": updateArticle,
};

function createServerWithCustomData(articles, comments) {
  return (req, res) => {
    parseBodyJson(req, (err, params) => {
      const handler = getHandler(req.url);

      handler(req, res, { articles, comments }, params, (err, result) => {
        res.setHeader("Content-Type", "application/json");

        if (err) {
          res.statusCode = err.code;
          res.end(JSON.stringify(err));

          return;
        }

        res.statusCode = 200;
        res.end(JSON.stringify(result));
      });
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

function sum(req, res, comments, payload, cb) {
  console.log(comments, payload);
  if (!payload) {
    cb({ code: responseCodes.BAD_REQUEST, message: "Body is empty" });
    return;
  }

  const result = { c: payload.a + payload.b };

  cb(null, result);
}

function getAllArticles(req, res, { articles }, payload, cb) {
  cb(null, articles);
}

function getArticlesById(req, res, { comments, articles }, payload, cb) {
  if (!payload) {
    cb({ code: responseCodes.BAD_REQUEST, message: "Body is empty" });
    return;
  }
  const article = articles.find((article) => article?.id === payload.id);
  if (!article) {
    cb({ code: 400, message: `No article with id: ${payload.id}` });
  }
  const filteredComments = comments?.filter((comment) => comment?.articleId === article.id);
  cb(null, { ...article, comments: filteredComments });
}

function createArticle(req, res, { articles }, payload, cb) {
  if (!payload) {
    cb({ code: responseCodes.BAD_REQUEST, message: "Body is empty" });
    return;
  }
  const newData = [...articles, payload];
  fs.writeFile(path.join(__dirname, "data", "articles.json"), JSON.stringify(newData), (err) => {
    if (err) {
      console.error("Error writing JSON to file", err);
    } else {
      articles.push(payload);
      cb(null, payload);
    }
  });
}

function updateArticle(req, res, { articles }, payload, cb) {
  if (!payload) {
    cb({ code: responseCodes.BAD_REQUEST, message: "Body is empty" });
    return;
  }

  let updatedArticle;

  const newData = articles.map((article) => {
    if (article.id === payload.id) {
      const keklol = { ...article, ...payload };
      updatedArticle = keklol;
      return keklol;
    }
    return article;
  });

  fs.writeFile(path.join(__dirname, "data", "articles.json"), JSON.stringify(newData), (err) => {
    if (err) {
      console.error("Error writing JSON to file", err);
    } else {
      articles = newData;
      cb(null, updatedArticle);
    }
  });
}

function notFound(req, res, payload, cb) {
  cb({ code: 404, message: "Not found" });
}

startServer();
