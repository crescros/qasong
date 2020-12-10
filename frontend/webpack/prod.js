const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "production",
  plugins: [
    new Dotenv({
      path: "./.env.production",
    }),
  ],
  devServer: {
    contentBase: "./build",
  },
  output: {
    publicPath: "/static/",
  },
};
