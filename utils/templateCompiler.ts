import path from "path";

import pug, { Options, LocalsObject } from "pug";

import { __dirname as __root_dirname } from "../pathEMS";

interface templateOptions extends Options {
  doctype: "html" | string
}

function templateCompiler(file: string, localContent?: LocalsObject, options?: Options): string {
    const templateOptions: templateOptions = {
        doctype: options?.doctype ?? "html",
        ...options
    };
    const compilerPugFunction = pug.compileFile(path.resolve(__root_dirname, file), templateOptions);

    return compilerPugFunction({ ...localContent });
}

export default templateCompiler;