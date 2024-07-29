var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readFileSync } from "node:fs";
import { mergeCssContent } from "./helper/mearge_css_content.js";
import { cssFiles } from "./helper/utils.js";
import { LightningcssTransform } from "./lib/transform.js";
/**
 * **Asynchronously transforms CSS files based on the provided options.**
 *
 * _Retrieves CSS files from the specified base URL while ignoring certain files._
 *
 * _Merges the CSS content from the files and transforms it using LightningcssTransform._
 *
 * @param baseUrl The base URL to search for CSS files.
 * @param ignores An array of file paths to ignore during the search.
 * @param write A boolean indicating whether to write the transformed CSS to a file.
 * @param outDir The output directory for the transformed CSS file.
 * @param fileName The name of the output CSS file.
 * @param sourceMap A boolean indicating whether to generate a source map for the transformed CSS.
 * @param minify A boolean indicating whether to minify the transformed CSS.
 * @returns A promise that resolves to the transformed CSS content or if write true write output files or undefined.
 *
 *
 * ---
 *
 * <br />
 *
 *  **Example Usage**
 *
 * <br/>
 *
 * ```ts
 * import { transformDir, type LTR } from "bagancss";

    // to write the output.
    await transform({
    baseUrl: "./src", // required
    ignores: [], // default - []
    write: true, // default - false
    outDir: "./dist", // If options.write = true , required
    fileName: "out.css", // default - "bundle.css"
    sourceMap: true, // default - false
    minify: true, // default - false
    });

    // to get transformed code

    const result = await transformDir({
    baseUrl: "./src", // required
    ignores: [], // default - []
    sourceMap: true, // default - false
    minify: true, // default - false
    }) as LTR; // to avoid the undefined call as type of LTR.

    const transformed_css_code = result.csscode;
    const transformed_css_map_code = result.mapcode;

 *
 *
 * ```
 *
 */
export function transformDir(_a) {
    return __awaiter(this, arguments, void 0, function* ({ baseUrl, ignores, write, outDir, fileName, sourceMap, minify, }) {
        if (typeof baseUrl !== "string" || baseUrl.trim() === "") {
            throw new Error("Invalid baseUrl: must be a non-empty string");
        }
        const files = cssFiles(baseUrl, ignores);
        let cssContent;
        try {
            cssContent = yield mergeCssContent(files);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(`Failed to merge CSS content: ${errorMessage}`);
        }
        const css = Buffer.from(cssContent);
        return LightningcssTransform({
            content: css,
            write,
            outDir,
            fileName,
            sourceMap,
            minify,
        });
    });
}
/**
 * Transforms the content of a file using LightningcssTransform based on the provided options.
 * @param {Partial<TransformOptions>} options - The options for transforming the file content.
 * @returns {LTR | undefined} The transformed result or undefined if entryFile is not provided.
 */
export function transformFile({ entryFile, write, outDir, fileName, sourceMap, minify, }) {
    if (!entryFile) {
        return undefined;
    }
    const css = readFileSync(entryFile);
    return LightningcssTransform({
        content: css,
        write,
        outDir,
        fileName,
        sourceMap,
        minify,
    });
}
/**
 * Transforms the provided content using LightningcssTransform with optional configurations.
 * @param Partial<TransformFileNContent> - Partial object containing content, fileName, write, outDir, sourceMap, and minify options.
 * @returns LTR | undefined - Transformed content or undefined if no content provided.
 */
export function transformContent({ content, fileName, write, outDir, sourceMap, minify, }) {
    if (!content) {
        return undefined;
    }
    const css = Buffer.from(content);
    return LightningcssTransform({
        content: css,
        write,
        outDir,
        fileName,
        sourceMap,
        minify,
    });
}
//# sourceMappingURL=index.js.map