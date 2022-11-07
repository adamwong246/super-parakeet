const webpack = require('webpack');
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: "./src/index.tsx",
  experiments: {
    topLevelAwait: true
  },
  output: {
    filename: 'super-parakeet.bundle.js',
  },

  devServer: {
    historyApiFallback: true,
    open: true,
    host: "localhost",
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },

  plugins: [
    // new webpack.IgnorePlugin(/canvas/, /jsdom$/)
  ],

  // externals: { canvas: {} },

  module: {
    unknownContextCritical: false,
    rules: [

      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },




      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      {
        test: /\.m?js$/i,
        type: "javascript/auto",
      },
      {
        test: /\.m?js$/i,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".mjs", ".testeranto.ts"]
  }
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};