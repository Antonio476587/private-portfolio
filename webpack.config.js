import dotenv from "dotenv";
import webpack from "webpack";
import path from "path";
import { __dirname } from "./pathEMS.js";
import TerserPlugin from "terser-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";

import { createRequire } from "module";

const require = createRequire(import.meta.url);

dotenv.config();

const mode = process.env.MODE || "development";

const browserConfig = {
    mode,
    entry: {
        polyfill: ["whatwg-fetch"],
        app: ["./src/App.tsx"],
        style: "./styles/index.scss",
    },
    output: {
        filename: "js/[name].bundle.min.js",
        path: path.resolve(__dirname, "public"),
    },
    resolve: {
        extensions: [".tsx", ".jsx", ".ts", ".js", ".css", ".scss", ".sass"],
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    targets: {
                                        ie: "11",
                                        edge: "15",
                                        safari: "10",
                                        firefox: "50",
                                        chrome: "49",
                                    },
                                },
                            ],
                            "@babel/preset-react",
                        ],
                    },
                },
            },
            {
                test: /\.(tsx|ts)?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    "css-loader",
                    "sass-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./css/teststyle.css"
        }),
    ],
    optimization: {
        splitChunks: {
            name: "vendor",
            chunks: "all",
        },
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new OptimizeCssAssetsPlugin(),
        ],
    },
    devtool: mode === "development" ? "source-map" : false,
    devServer: {
        static: {
            directory: path.resolve(__dirname, "public"),
            publicPath: "/",
        },
        open: true,
        historyApiFallback: { index: "/indexwebpack.html" },
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
};

export default browserConfig;
