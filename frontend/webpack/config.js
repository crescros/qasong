const { merge } = require("webpack-merge");

const commonConfig = require("./common");

module.exports = ({ env }) => {
  const envConfig = require("./" + env);

  return merge(commonConfig, envConfig);
};
