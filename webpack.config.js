const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  performance: { hints: false },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  stats: { children: false },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          appendExtension: true,
          loaders: {
            scss: "vue-style-loader!css-loader!sass-loader",
          },
        },
      },
      {
        test: /\.ts?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          {
            loader: "sass-resources-loader",
            options: {
              resources: "./styles/colors.scss",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".vue"],
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@stores": path.resolve(__dirname, "src/stores/"),
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
};
