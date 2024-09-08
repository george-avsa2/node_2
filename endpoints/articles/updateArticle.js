const fs = require("fs");
const responseCodes = require("../../constants/responseCodes");

function updateArticle(req, res, reqData, cb) {
  if (typeof reqData.body !== "object") {
    cb({ code: responseCodes.BAD_REQUEST, message: "Body is empty" });
    return;
  }
  if (!reqData.params?.id) {
    cb({ code: responseCodes.BAD_REQUEST, message: "Id in params is missing" });
    return;
  }

  let updatedArticle;

  const newData = reqData.payload.articles?.map((article) => {
    if (article.id === reqData.params?.id) {
      const keklol = { ...article, ...reqData?.body };
      updatedArticle = keklol;
      return keklol;
    }
    return article;
  });

  if (!updatedArticle) {
    cb({ code: responseCodes.BAD_REQUEST, message: "No article with such id" });
  }

  fs.writeFile(path.join(__dirname, "data", "articles.json"), JSON.stringify(newData), (err) => {
    if (err) {
      console.error("Error writing JSON to file", err);
    } else {
      reqData.payload.articles = newData;
      cb(null, updatedArticle);
    }
  });
}

module.exports = updateArticle;
