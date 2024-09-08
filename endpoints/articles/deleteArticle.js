const fs = require("fs");
const responseCodes = require("../../constants/responseCodes");

function deleteArticle(req, res, reqData, cb) {
  if (!reqData.params?.id) {
    cb({ code: responseCodes.BAD_REQUEST, message: "Id in params is missing" });
    return;
  }

  let articleToDelete;

  const newData = reqData.payload.articles?.filter((article) => {
    if (article.id !== reqData.params?.id) {
      return true;
    }
    articleToDelete = article;
    return false;
  });

  if (!articleToDelete) {
    cb({ code: responseCodes.BAD_REQUEST, message: "No article with such id" });
  }

  fs.writeFile(path.join(__dirname, "data", "articles.json"), JSON.stringify(newData), (err) => {
    if (err) {
      console.error("Error writing JSON to file", err);
    } else {
      articles = newData;
      cb(null, articleToDelete);
    }
  });
}

module.exports = deleteArticle;
