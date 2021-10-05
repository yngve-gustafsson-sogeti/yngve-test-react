const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const deps = require("./package.json").dependencies;
const Dotenv = require("dotenv-webpack");

module.exports = (env, options) => {
  console.log("PROJECTS is using WEBPACK.CONFIG.STAGE.JS");
  return {
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
          options: {
            presets: ["@babel/preset-react"],
          },
        },
        {
          test: /\.s?css$/,
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { publicPath: "" },
            },
            "css-loader",
            {
              loader: "postcss-loader",
              options: { sourceMap: true },
            },
            "sass-loader",
          ],
        },
      ],
    },
    plugins: [
      new Dotenv({ path: "./.env.stage" }),
      new MiniCssExtractPlugin(),
      new ModuleFederationPlugin({
        name: "projects",
        filename: "remoteEntry.js",
        remotes: {
          hushalla:
            "hushalla@https://app-pam-hushallareact-ase-stage.ase-pam.appserviceenvironment.net",
        },
        exposes: {
          "./Navigation": "./src/Navigation",
          "./Header": "./src/components/Header",
          "./routes": "./src/routes",
          "./ModalNewProject": "./src/components/ModalNewProject",
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
};
