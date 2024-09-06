const responseCodes = require("../constants/responseCodes");

function sendData(err, data, contentType = "application/json") {
  res.statusCode = err ? err.code : data.code;
  res.setHeader("Content-Type", contentType);
  res.end(JSON.stringify(err ? err : data));
}

module.exports = sendData;
