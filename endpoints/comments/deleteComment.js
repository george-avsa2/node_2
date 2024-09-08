const fs = require("fs");
const responseCodes = require("../../constants/responseCodes");
const checkBody = require("../../helpers/checkBody");
const path = require("path");

function deleteComment(req, res, reqData, cb) {
  const isError = checkBody(reqData, cb);
  if (isError) {
    return;
  }

  let commentToDelete;

  const newData = reqData.payload.comments?.filter((comment) => {
    if (comment.id !== reqData.body?.id) {
      return true;
    }
    commentToDelete = comment;
    return false;
  });

  if (!commentToDelete) {
    cb({ code: responseCodes.BAD_REQUEST, message: "No article with such id" });
    return;
  }

  fs.writeFile(path.join(process.cwd(), "data", "comments.json"), JSON.stringify(newData), (err) => {
    if (err) {
      console.error("Error writing JSON to file", err);
    } else {
      articles = newData;
      cb(null, commentToDelete);
    }
  });
}

module.exports = deleteComment;
