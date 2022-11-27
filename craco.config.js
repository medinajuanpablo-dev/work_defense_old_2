const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@static": path.resolve(__dirname, "src/static/"),
      "@common": path.resolve(__dirname, "src/common/"),
      "@state": path.resolve(__dirname, "src/state/"),
    },
  },
};
