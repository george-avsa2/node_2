const responseCodes = require("../../constants/responseCodes");

function getArticlesById(req, res, reqData, cb) {
  if (typeof reqData.body !== "object") {
    cb({ code: responseCodes.BAD_REQUEST, message: "Body is empty" });
    return;
  }
  const article = reqData?.payload?.articles?.find((article) => article?.id === reqData.body.id);
  if (!article) {
    cb({ code: 400, message: `No article with id: ${reqData.body.id}` });
  }
  const filteredComments = reqData.payload?.comments?.filter((comment) => comment?.articleId === article.id);
  cb(null, { ...article, comments: filteredComments || [] });
}

module.exports = getArticlesById;
