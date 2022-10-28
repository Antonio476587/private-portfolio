import path from "path";

import pug, { Options, LocalsObject, compile } from "pug";

import { __dirname as __root_dirname } from "../pathEMS";

interface templateOptions extends Options {
  doctype: "html" | string
}

function convertToValidPugInsertion(htmlSyntaxToConvert: string): string {
    if (!htmlSyntaxToConvert.match(/^<.+>$/s)) return "";
    return(htmlSyntaxToConvert.trim().slice(1, htmlSyntaxToConvert.length - 1));
}

interface pugTemplateObject {
  content: string,
}

type pugTemplate = string | pugTemplateObject;

function templateCompiler(pugTemplate: pugTemplate, localContent?: LocalsObject, options?: Options): string {
    const templateOptions: templateOptions = {
        doctype: options?.doctype ?? "html",
        ...options
    };
    const compilerPugFunction = typeof pugTemplate === "string" ? pug.compileFile(path.resolve(__root_dirname, pugTemplate), templateOptions) : pug.compile(pugTemplate.content, templateOptions);

    return compilerPugFunction({ ...localContent });
}

templateCompiler.convertToValidPugInsertion = convertToValidPugInsertion;

export default templateCompiler;
export { convertToValidPugInsertion };