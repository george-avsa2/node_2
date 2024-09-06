const fs = require("fs");

function readFilePromise(path, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding, (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const stringifiedData = JSON.parse(data.toString());
          resolve(stringifiedData);
        } catch (e) {
          reject(e);
        }
      }
    });
  });
}

module.exports = readFilePromise;
