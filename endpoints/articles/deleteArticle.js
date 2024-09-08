const fs = require("fs");
const responseCodes = require("../../constants/responseCodes");
const checkBody = require("../../helpers/checkBody");
const path = require("path");

function deleteArticle(req, res, reqData, cb) {
  const isError = checkBody(reqData, cb);
  if (isError) {
    return;
  }

  let articleToDelete;

  const newData = reqData.payload.articles?.filter((article) => {
    if (article.id !== reqData.body?.id) {
      return true;
    }
    articleToDelete = article;
    return false;
  });

  if (!articleToDelete) {
    cb({ code: responseCodes.BAD_REQUEST, message: "No article with such id" });
  }

  fs.writeFile(path.join(process.cwd(), "data", "articles.json"), JSON.stringify(newData), (err) => {
    if (err) {
      console.error("Error writing JSON to file", err);
    } else {
      articles = newData;
      cb(null, articleToDelete);
    }
  });
}

module.exports = deleteArticle;
