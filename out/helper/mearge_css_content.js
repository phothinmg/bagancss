var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readFile } from "node:fs/promises";
import { extname } from "node:path";
import { getFileName } from "./utils.js";
/**
 * Asynchronously merges the content of CSS files specified by the given file paths.
 * Filters out non-CSS files from the provided file paths.
 * Reads the content of each CSS file and concatenates them into a single string.
 * Returns the merged CSS content as a string.
 *
 * @param filePaths An array of strings representing the file paths of CSS files to merge.
 * @returns A string containing the merged content of all CSS files.
 */
export function mergeCssContent(filePaths) {
    return __awaiter(this, void 0, void 0, function* () {
        const cssFiles = filePaths.filter((i) => extname(i) === ".css");
        const _import = cssFiles.filter((i) => getFileName(i) === "_import.css");
        const notimport = cssFiles.filter((i) => getFileName(i) !== "_import.css");
        const importContent = yield Promise.all(_import.map((filePath) => readFile(filePath)));
        const notimportContent = yield Promise.all(notimport.map((filePath) => readFile(filePath)));
        const fileContents = [...importContent, ...notimportContent];
        const margedContent = fileContents.join("\n");
        return margedContent;
    });
}
//# sourceMappingURL=mearge_css_content.js.map