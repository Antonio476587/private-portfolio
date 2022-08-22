import dotenv from "dotenv";
import webpack from "webpack";
import nodeExternals from "webpack-node-externals"; 
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const mode = process.env.MODE || "development";

const serverConfig = {
    mode,
    entry: { server: ["./index.js"] },
    target: "node",
    externals: [nodeExternals({
        allowlist: ["lowdb", "steno", "whatwg-fetch"],
    })],
    externalsPresets: { node: true },
    output: {
        filename: "server.cjs",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: [".tsx", ".jsx", ".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env", {
                                targets: { node: "10" },
                            }],
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
        ],
    },
    devtool: mode === "development" ? "source-map" : false,
    devServer: {
        static: false,
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
};

export default serverConfig;
