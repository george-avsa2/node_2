const fs = require("fs");
const responseCodes = require("../../constants/responseCodes");
const articleSchema = require("../../schemas/article");
const path = require("path");
const checkBody = require("../../helpers/checkBody");
const checkSchema = require("../../helpers/checkSchema");

function createArticle(req, res, reqData, cb) {
  const isError = checkBody(reqData, cb);
  if (isError) {
    return;
  }
  const [errors, article] = checkSchema(reqData.body, articleSchema);
  if (errors) {
    cb({ code: responseCodes.BAD_REQUEST, message: errors.join("; ") });
    return;
  }

  const newData = [...reqData.payload.articles, article];
  fs.writeFile(path.join(process.cwd(), "data", "articles.json"), JSON.stringify(newData), (err) => {
    if (err) {
      console.error("Error writing JSON to file", err);
    } else {
      reqData.payload.articles.push(article);
      cb(null, article);
    }
  });
}

module.exports = createArticle;
