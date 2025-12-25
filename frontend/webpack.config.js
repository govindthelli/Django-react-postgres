const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "production", // IMPORTANT for build inside docker

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env"] }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },

  resolve: { extensions: ["*", ".js", ".jsx"] },

  output: {
    path: path.resolve(__dirname, "dist/"), // <-- REQUIRED for docker
    filename: "bundle.js",
    publicPath: "/", // <-- Avoids 404 on refresh in NGINX
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html", // from your project
      filename: "index.html"         // generated inside dist/
    })
  ]
};
