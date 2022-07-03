const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/App.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [new HtmlWebpackPlugin({ template: "public/index.html" })],
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devtool:
    process.env.NODE_ENV === "production" ? "source-map" : "inline-source-map",
  devServer: {
    static: "./dist",
    port: 3000,
  },
};
