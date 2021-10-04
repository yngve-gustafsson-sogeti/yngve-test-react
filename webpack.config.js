const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3001,
  },
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.(png|jp?g|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        //exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
        },
        {
            loader: 'css-loader',
            options: {
                sourceMap: true,
            },
        },
        {
            loader: 'sass-loader',
            options: {
                sourceMap: true,
            },
        },
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "projects",
      filename: "remoteEntry.js",
      remotes: {
        hushalla: "hushalla@http://localhost:3002/remoteEntry.js",
      },
      exposes: {
        "./Navigation": "./src/Navigation",
        "./Header": "./src/components/Header",
        "./routes": "./src/routes",
        "./ModalNewProject": "./src/components/ModalNewProject"
      },
      shared: {
        ...deps,
        react: {
          eager: true,
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          eager: true,
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
