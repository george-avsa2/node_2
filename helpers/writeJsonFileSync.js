const fs = require("fs");

function writeJsonFileSync(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing to JSON file:", err);
  }
}

module.exports = writeJsonFileSync;
