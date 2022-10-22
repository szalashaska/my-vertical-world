const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "static/frontend"),
    filename: "main.js",
  },

  target: "web",
  devServer: {
    port: "3000",
    static: ["./templates/frontend"],
    open: true,
    hot: true,
    liveReload: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png|.jpg/,
        type: "asset/resource",
      },

      {
        test: /\.mp4$/,
        use: "file-loader?name=videos/[name].[ext]",
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
};
