const fs = require("fs");
const responseCodes = require("../../constants/responseCodes");
const articleSchema = require("../../schemas/article");
const path = require("path");
const checkBody = require("../../helpers/checkBody");
const checkSchema = require("../../helpers/checkSchema");
const writeJsonFileSync = require("../../helpers/writeJsonFileSync");

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
  writeJsonFileSync(path.join(process.cwd(), "data", "articles.json"), newData);
  cb(null, article);
}

module.exports = createArticle;
