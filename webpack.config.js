const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === "production";

const config = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'app.js',
    globalObject: 'this',
    assetModuleFilename: 'assets/[name][ext]',
  },
  devServer: {
    open: true,
    static: './src/',
    https: false,
    host: 'localhost',
    port: 8080,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      publicPath: 'production' !== process.env.NODE_ENV ? '/' : '',
      scriptLoading: 'blocking',
    }),

    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),

    new webpack.DefinePlugin({
      'process.env': `'${process.env.NODE_ENV}'`
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'raw-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: false
              }
            }
          }
        ],
        include: [
          path.resolve(__dirname, "src/style")
        ],
        exclude: [
          path.resolve(__dirname, "node_module")
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".scss"],
  },
  // experiments: {
  //    asset: true
  // }
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
