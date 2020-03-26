const path = require('path');

module.exports = {
  entry: "./contact/contact.jsx"
 ,
  output: {
    path: path.join(__dirname, "demo"),
    filename: "contact.js"
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/react', '@babel/env']
          }
        },
        exclude: /node_modules/,
      }
    ]
  }
};
