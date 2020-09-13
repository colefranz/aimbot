const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  performance: { hints: false },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "./",
  },
  devServer: {
    contentBase: "./dist",
    port: 9000,
    publicPath: "/",
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
      {
        test: /\.svg$/,
        use: ["vue-svg-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".vue"],
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@stores": path.resolve(__dirname, "src/stores/"),
      "@svg": path.resolve(__dirname, "svg/opt/"),
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/aimbot.html",
    }),
  ],
};
