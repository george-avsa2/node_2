const responseCodes = require("../constants/responseCodes");

function checkBody(reqData, cb) {
  if (typeof reqData.body !== "object") {
    cb({ code: responseCodes.BAD_REQUEST, message: "Body is empty" });
    return true;
  }
}

module.exports = checkBody;
