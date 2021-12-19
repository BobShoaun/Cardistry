const path = require("path");

module.exports = {
  entry: {
    script: "./src/script.js",
    examples: "./src/examples.js",
    "move-example": "./src/move-example.js",
  },
  output: {
    filename: "[name].min.js",
    path: path.resolve(path.join(__dirname, "public", "js")),
  },
};
