const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');

// Custom plugin to handle media replacement
class MediaReplacementPlugin {
  constructor(options = {}) {
    this.env = options.env || 'dev';
    this.assetsPath = options.assetsPath || './src/assets.json';
  }

  apply(compiler) {
    const pluginName = 'MediaReplacementPlugin';

    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        pluginName,
        (data, callback) => {
          try {
            const assets = JSON.parse(fs.readFileSync(this.assetsPath, 'utf8'));
            let html = data.html;

            Object.keys(assets).forEach(key => {
              const mediaConfig = assets[key];
              if (mediaConfig && mediaConfig[this.env]) {
                const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'gi');
                html = html.replace(regex, mediaConfig[this.env]);
              }
            });

            data.html = html;
            callback(null, data);
          } catch (error) {
            console.error('Error processing assets.json:', error);
            callback(error);
          }
        }
      );
    });
  }
}

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const mediaEnv = process.env.MEDIA_ENV || (isProduction ? 'prod' : 'dev');

  return {
    entry: './src/index.ts',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      clean: true,
    },

    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript'
              ]
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/[name][ext]'
          }
        }
      ]
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx']
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        inject: true,
        minify: isProduction ? {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        } : false
      }),

      new MediaReplacementPlugin({
        env: mediaEnv,
        assetsPath: path.resolve(__dirname, 'src/assets.json')
      }),

      // Copy media files to dist folder for development and production
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/assets'),
            to: path.resolve(__dirname, 'dist/assets'),
            noErrorOnMissing: true
          }
        ]
      }),

      ...(isProduction ? [
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css'
        })
      ] : [])
    ],

    devServer: {
      static: [
        {
          directory: path.join(__dirname, 'dist'),
        },
        {
          directory: path.join(__dirname, 'src/assets'),
          publicPath: '/assets',
        }
      ],
      compress: true,
      port: 9000,
      hot: true,
      open: true
    },

    optimization: {
      minimize: isProduction,
    }
  };
};
