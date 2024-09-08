const fs = require("fs");
const path = require("path");
const responseCodes = require("../../constants/responseCodes");
const checkBody = require("../../helpers/checkBody");
const checkSchemaPartial = require("../../helpers/checkSchemaPartial");
const articleSchema = require("../../schemas/article");
const checkParams = require("../../helpers/checkParams");

function updateArticle(req, res, reqData, cb) {
  const isError = checkBody(reqData, cb);

  const isParamError = checkParams(reqData.params || {}, ["id"], cb);
  if (isError || isParamError) {
    return;
  }

  const [errors, newArticle] = checkSchemaPartial(reqData.body, articleSchema);
  if (errors?.length) {
    cb({ code: responseCodes.BAD_REQUEST, message: errors.join("; ") });
    return;
  }

  let updatedArticle;

  const newData = reqData.payload.articles?.map((article) => {
    if (article?.id === reqData.params?.id) {
      const temp = { ...article, ...newArticle };
      updatedArticle = temp;
      return temp;
    }
    return article;
  });

  if (!updatedArticle) {
    cb({ code: responseCodes.BAD_REQUEST, message: "No article with such id" });
  }

  fs.writeFile(path.join(process.cwd(), "data", "articles.json"), JSON.stringify(newData), (err) => {
    if (err) {
      console.error("Error writing JSON to file", err);
    } else {
      reqData.payload.articles = newData;
      cb(null, updatedArticle);
    }
  });
}

module.exports = updateArticle;
