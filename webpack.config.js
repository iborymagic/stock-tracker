const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, options) => {
  return {
    mode: options.mode,
    entry: './index.tsx',
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, './dist'),
      publicPath: "/",
      clean: true,
    },

    devServer: {
      compress: true,
      hot: true,
      port: 3000,
      open: true, 
      historyApiFallback: true
    },
    devtool: options.mode === 'development' ? 'eval-source-map' : false,
    target: "web",
    module: {
      rules: [
        {
          test: /\.(tsx|ts)$/,
          use: {
            loader: 'babel-loader',
          },
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [
            options.mode === 'development' 
              ? "style-loader" 
              : MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    ["postcss-preset-env"],
                  ],
                },
              },
            },
            "sass-loader"
          ],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
          type: "javascript/auto",
          loader: "file-loader",
          options: {
            publicPath: "../",
            name: "[path][name].[ext]",
            context: path.resolve(__dirname, "src/assets"),
            emitFile: false,
          },
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: "javascript/auto",
          exclude: /images/,
          loader: "file-loader",
          options: {
            publicPath: "../",
            name: "[path][name].[ext]",
            context: path.resolve(__dirname, "src/assets"),
            emitFile: false,
          },
        },
      ],
    },
    resolve: { 
      extensions: [".tsx", ".ts", ".js"],
      plugins: [new TsconfigPathsPlugin()],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        inject: true
      }),
      () => options.mode === 'development' 
        ? false 
        : new MiniCssExtractPlugin({
          filename: `[name].[chunkhash].css`,
        }),
    ]
  };
};