const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "production", // required for docker build

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react" // JSX support in build
            ]
          }
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
    path: path.resolve(__dirname, "dist/"), // matches your Dockerfile
    filename: "bundle.js",
    publicPath: "/" // avoids 404 on page refresh
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html", // input html
      filename: "index.html"         // output in dist/
    })
  ]
};
