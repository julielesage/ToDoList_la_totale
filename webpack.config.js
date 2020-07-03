const path = require("path");
// The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"), // = "./dist"
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        // to be able to build TypeScript files with webpack :
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
      },
      {
        // source-map-loader extracts existing source maps from all JavaScript entries. This includes both inline source maps as well as those linked via URL. This loader is especially useful when using 3rd-party libraries having their own source maps. If not extracted and processed into the source map of the webpack bundle, browsers may misinterpret source map data.
        //=> permet de voir les fichiers tsx dans le bundle dans les sources de la console web d'inspection en tapant ⌘P
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },

      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true, importLoaders: 1 },
          },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },

      // {
      //   test: /\.scss$/,
      //   use: ExtractTextPlugin.extract({
      //     use: [
      //       {
      //         loader: "css-loader",
      //         options: {
      //           minimize: true,
      //         },
      //       },
      //       "sass-loader",
      //     ],
      //   }),
      // },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    // new ExtractTextPlugin("style.css"), = deprecated
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
};
