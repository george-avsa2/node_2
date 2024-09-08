const fs = require("fs");
const responseCodes = require("../../constants/responseCodes");
const checkBody = require("../../helpers/checkBody");
const path = require("path");
const writeJsonFileSync = require("../../helpers/writeJsonFileSync");

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
    return;
  }

  writeJsonFileSync(path.join(process.cwd(), "data", "articles.json"), newData);
  cb(null, articleToDelete);
}

module.exports = deleteArticle;
