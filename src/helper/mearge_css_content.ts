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
export async function mergeCssContent(filePaths: string[]): Promise<string> {
	const cssFiles = filePaths.filter((i) => extname(i) === ".css");
	const _import = cssFiles.filter((i) => getFileName(i) === "_import.css");
	const notimport = cssFiles.filter((i) => getFileName(i) !== "_import.css");
	const importContent = await Promise.all(
		_import.map((filePath) => readFile(filePath)),
	);
	const notimportContent = await Promise.all(
		notimport.map((filePath) => readFile(filePath)),
	);
	const fileContents = [...importContent, ...notimportContent];
	const margedContent = fileContents.join("\n");

	return margedContent;
}
