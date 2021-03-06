'use strict'
const glob = require('glob')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []

  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))

  ;entryFiles.forEach((entryFile) => {
    const match = entryFile.match(/src\/(.*)\/index\.js/)
    const pageName = match && match[1]
    entry[pageName] = entryFile
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        }
      })
    )
  })

  return {
    entry,
    htmlWebpackPlugins,
  }
}

const { entry, htmlWebpackPlugins } = setMPA()

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    // libraryTarget: 'window',
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: 'babel-loader',
      },
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240, // 小于10KB的图片，打包进JS
            }
          }
        ]
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
  ].concat(htmlWebpackPlugins),
  devServer: {
    contentBase: './dist',
    hot: true,
    stats: 'errors-only'
  },
}
