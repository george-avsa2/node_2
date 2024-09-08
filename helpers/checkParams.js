const responseCodes = require("../constants/responseCodes");

function checkParams(params, requiredParams, cb) {
  const missing = requiredParams.reduce((acc, requiredParam) => {
    if (!params[requiredParam]) {
      acc.push(requiredParam);
    }
    return acc;
  }, []);
  if (missing.length) {
    const message = `${missing.join(", ")} in params missing`;
    cb({ code: responseCodes.BAD_REQUEST, message });
    return true;
  }
}

module.exports = checkParams;
