function getAllArticles(req, res, reqData, cb) {
  cb(
    null,
    reqData.payload.articles.map((article) => {
      const comments = reqData.payload.comments?.find((comment) => comment.articleId === article.id) || [];
      return { ...article, comments };
    }),
  );
}

module.exports = getAllArticles;
