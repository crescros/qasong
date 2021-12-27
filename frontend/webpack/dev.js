const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: "./.env.development",
    }),
  ],
  devServer: {
    contentBase: "./build",
    hot: true,
    port: 8081
  },
};
