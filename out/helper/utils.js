var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* NODE */
import { existsSync, mkdirSync, writeFile, } from "node:fs";
import { dirname } from "node:path";
/* NPM */
import { globSync } from "glob";
/**
 * Writes data to a file specified by the filePath.
 * If the directory path does not exist, it creates the directory.
 *
 * @param filePath - The path to the file where the data will be written.
 * @param data - The data to be written to the file.
 * @param callback - An optional callback function to be executed after writing the file.
 */
export function baganWriteFile({ filePath, data, callback, }) {
    const cb = callback !== null && callback !== void 0 ? callback : (() => true);
    const directoryPath = dirname(filePath);
    if (!existsSync(directoryPath)) {
        mkdirSync(directoryPath, { recursive: true });
    }
    writeFile(filePath, data, cb);
}
/* ----------------------------------------- */
/**
 * Returns the file name from the given path.
 *
 * @param path - The path from which to extract the file name.
 * @returns The extracted file name.
 */
export function getFileName(path) {
    return path.split("/").slice(-1)[0];
}
/* ------------------------------------------ */
/**
 * Fetches the CSS content from the specified URL.
 *
 * @param url - The URL from which to fetch the CSS content.
 * @returns A promise that resolves with the CSS content as a string.
 */
export const cssFromURL = (url) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetch(url).then((res) => res.text());
});
/**
 * Retrieves a list of CSS files within the specified base directory.
 *
 * @param baseUrl The base directory to search for CSS files. Defaults to the current directory if not provided.
 * @param ignores An optional array of directories to ignore during the search process.
 * @returns An array of strings representing the paths to the CSS files found.
 */
export const cssFiles = (baseUrl, ignores) => {
    const base = baseUrl !== null && baseUrl !== void 0 ? baseUrl : ".";
    const igs = ignores !== null && ignores !== void 0 ? ignores : [];
    const defaultIgnore = ["node_modules"];
    const files = globSync(`${base}/**/*.css`, {
        ignore: [...defaultIgnore, ...igs],
    });
    return files;
};
/* ------------------------------------------------------------------- */
//# sourceMappingURL=utils.js.map