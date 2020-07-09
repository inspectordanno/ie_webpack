const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === "development";

  return {
    context: path.join(__dirname, "src"),
    entry: path.join(__dirname, "src", "index.js"),
    output: {
      path: path.join(__dirname, "dist"),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.js$/,
          exclude: /node_modules/,
        },
        {
          test: /\.s?css$/,
          oneOf: [
            {
              test: /\.module\.s?css$/,
              use: [
                isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
                {
                  loader: "css-loader",
                  options: {
                    modules: {
                      localIdentName: "[local]__[hash:base64:5]",
                    },
                    modules: true,
                    sourceMap: true,
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: true,
                    config: {
                      path: 'postcss.config.js'
                    }
                  }
                },
                {
                  loader: 'sass-loader', options: { sourceMap: true }
                }
              ],
            },
            {
              use: [
                isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
                "css-loader",
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: true,
                    config: {
                      path: 'postcss.config.js'
                    }
                  }
                },
                "sass-loader",
              ],
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "index.html"),
      }),
      // new CopyPlugin(
      //   [
      //     { from: '...', to: 'data' }
      //   ],
      // ),
    ],
    devtool: isDevelopment ? "eval-cheap-module-source-map" : false,
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      historyApiFallback: true,
    },
    resolve: {
      extensions: [".js", ".scss"],
    },
  };
};
