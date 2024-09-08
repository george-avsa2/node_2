function getAllArticles(req, res, reqData, cb) {
  cb(null, reqData.payload.articles);
}

module.exports = getAllArticles;
