import dotenv from "dotenv";
import webpack from "webpack";
import nodeExternals from "webpack-node-externals"; 
import path from "path";
import { __dirname } from "./pathEMS.js";

dotenv.config();

const mode = process.env.MODE || "development";

const serverConfig = {
    mode,
    entry: { server: ["./index.js"] },
    target: "node",
    externals: [nodeExternals({
        allowlist: ["lowdb", "steno"],
    })],
    externalsPresets: { node: true },
    output: {
        filename: "server.cjs",
        path: path.resolve(__dirname, "dist"),
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
