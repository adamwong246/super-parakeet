const isProduction = process.env.NODE_ENV == "production";

const config = {
  target: 'node',
  entry: "./test/index.ts",
  experiments: {
    topLevelAwait: true
  },
  output: {
    filename: 'test.bundle.js',
  },
  module: {
    unknownContextCritical: false,
    rules: [
      {
        test: /\.node$/,
        loader: "node-loader",
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
    extensions: [".tsx", ".ts", ".js", ".mjs"]
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