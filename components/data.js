const fs = require("fs");
var parse = require("csv-parse");
// const csv = require("csvtojson");

const tsvToJson = () => {
  fs.readFile(inputPath, function (err, fileData) {
    parse(fileData, { columns: false, trim: true }, function (err, rows) {
      // Your CSV data is in an array of arrys passed to this callback as rows.
    });
  });
};
