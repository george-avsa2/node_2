function parseBodyJson(req, cb) {
  if (!req.body) {
    cb(null);
    return;
  }
  let body = [];

  req
    .on("data", function (chunk) {
      body.push(chunk);
    })
    .on("end", function () {
      body = Buffer.concat(body).toString();

      let params = JSON.parse(body);

      cb(null, params);
    });
}

module.exports = parseBodyJson;
