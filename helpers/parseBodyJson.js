function parseBodyJson(req, cb) {
  let body = [];

  req
    .on("data", function (chunk) {
      body.push(chunk);
    })
    .on("end", function () {
      body = Buffer.concat(body).toString();
      try {
        let params = JSON.parse(body);

        cb(null, params);
      } catch (e) {
        cb(e);
      }
    });
}

module.exports = parseBodyJson;
