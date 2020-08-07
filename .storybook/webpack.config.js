const path = require("path");

module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts[x]?$/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(jpg|png|jpeg|gif)$/,
        use: ["url-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "leap-ui": path.resolve(__dirname, "./../components"),
    },
  },
};
