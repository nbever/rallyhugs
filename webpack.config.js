const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcPath = path.join(__dirname, 'src');

module.exports = {
  context: srcPath,
  entry: 'index.tsx',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  resolve: {
    modules: [srcPath, 'node_modules'],
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    compress: true,
    port: 9000,
    compress: true,
    historyApiFallback: true,
    // proxy: {
    //   '/api': {
    //     secure: false,
    //     target: 'http://localhost:3000',
    //     pathRewrite: { '^/api': '' }
    //   }
    // }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Rally Hugs',
      template: 'index.html.ejs',
      favicon: 'assets/rally_onion.svg',
    }),
  ],
};
