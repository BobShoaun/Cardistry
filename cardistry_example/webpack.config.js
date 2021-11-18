const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "script.min.js",
    path: path.resolve(__dirname, "public"),
  },
};
