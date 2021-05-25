const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'docs'),
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    modules: [
      'node_modules'
    ],
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [
      // ... other rules
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ]
}