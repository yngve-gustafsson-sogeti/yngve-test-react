const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = (env, options) => {
  console.log("PROJECTS is using WEBPACK.CONFIG.PROD.JS");
  return {
    entry: "./src/index",
    mode: "production",
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
          test: /\.s?css$/,
          exclude: /node_modules/,
          use: [
            {
            loader: MiniCssExtractPlugin.loader,
            options: {publicPath: ""},
          },
            "css-loader",
            {
              loader: "postcss-loader",
              options: { sourceMap: false }
            },
            "sass-loader"
          ],
        }
      ],
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new ModuleFederationPlugin({
        name: "projects",
        filename: "remoteEntry.js",
        remotes: {
          hushalla: "hushalla@https://app-ordercreate-hushallareact-test.azurewebsites.net/remoteEntry.js",
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
    optimization: {
      minimizer: [
        '...',
        new CssMinimizerPlugin(),
      ],
    },
  };
}
