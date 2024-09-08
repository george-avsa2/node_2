const fs = require("fs");
const responseCodes = require("../../constants/responseCodes");

function createArticle(req, res, reqData, cb) {
  if (typeof reqData.body !== "object") {
    cb({ code: responseCodes.BAD_REQUEST, message: "Body is empty" });
    return;
  }

  const newData = [...reqData.payload.articles, reqData.body];
  fs.writeFile(path.join(__dirname, "data", "articles.json"), JSON.stringify(newData), (err) => {
    if (err) {
      console.error("Error writing JSON to file", err);
    } else {
      reqData.payload.articles.push(reqData.body);
      cb(null, reqData.body);
    }
  });
}

module.exports = createArticle;
