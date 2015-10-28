var webpack = require('webpack')

var pkg = require('./package.json')

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new webpack.BannerPlugin(
    pkg.name + ' ' + pkg.version + ' - ' + pkg.homepage + '\n' +
    pkg.license + ' Licensed'
  )
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  )
}

module.exports = {
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/}
    ]
  },
  output: {
    library: pkg.standalone,
    libraryTarget: 'umd'
  },
  externals: [{
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  }],
  plugins: plugins,
  resolve: {
    extensions: ['', '.js']
  }
}
