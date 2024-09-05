const responseCodes = require("../constants/responseCodes");

function sendData(err, res, data, statusCode = responseCodes.OK, contentType = "application/json") {
  res.statusCode = err && statusCode === responseCodes.OK ? responseCodes.FORBIDDEN : statusCode;
  res.setHeader("Content-Type", contentType);
  res.end(JSON.stringify(err ? { code: statusCode !== responseCodes.OK ? statusCode : res.statusCode, message: err } : data));
}

module.exports = sendData;
