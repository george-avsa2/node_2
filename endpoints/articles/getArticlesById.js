const responseCodes = require("../../constants/responseCodes");
const checkBody = require("../../helpers/checkBody");

function getArticlesById(req, res, reqData, cb) {
  if (checkBody(reqData)) {
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
