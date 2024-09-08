const fs = require("fs");
const responseCodes = require("../../constants/responseCodes");
const path = require("path");
const checkBody = require("../../helpers/checkBody");
const checkSchema = require("../../helpers/checkSchema");
const writeJsonFileSync = require("../../helpers/writeJsonFileSync");
const commentSchema = require("../../schemas/comment");

function createComment(req, res, reqData, cb) {
  const isError = checkBody(reqData, cb);
  if (isError) {
    return;
  }

  const [errors, comment] = checkSchema(reqData.body, commentSchema);
  if (errors) {
    cb({ code: responseCodes.BAD_REQUEST, message: errors.join("; ") });
    return;
  }

  const isArticleExistent = reqData.payload.articles.find((article) => article.id === comment.articleId);

  if (!isArticleExistent) {
    cb({ code: responseCodes.BAD_REQUEST, message: "no article with such id, use '/api/articles/readall' to see the list of articles" });
    return;
  }

  const newData = [...reqData.payload.comments, comment];
  writeJsonFileSync(path.join(process.cwd(), "data", "comments.json"), newData);
  cb(null, comment);
}

module.exports = createComment;
