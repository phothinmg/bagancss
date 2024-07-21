/* NODE */
import {
	type NoParamCallback,
	existsSync,
	mkdirSync,
	writeFile,
} from "node:fs";
import { dirname } from "node:path";
/* NPM */
import { globSync } from "glob";

/* LOCAL */

/* --------------------------------------- */
export interface BaganWriteFileOptions {
	filePath: string;
	data: string | NodeJS.ArrayBufferView;
	callback?: NoParamCallback;
}

/**
 * Writes data to a file specified by the filePath.
 * If the directory path does not exist, it creates the directory.
 *
 * @param filePath - The path to the file where the data will be written.
 * @param data - The data to be written to the file.
 * @param callback - An optional callback function to be executed after writing the file.
 */
export function baganWriteFile({
	filePath,
	data,
	callback,
}: BaganWriteFileOptions): void {
	const cb: NoParamCallback = callback ?? (() => true);

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
export function getFileName(path: string) {
	return path.split("/").slice(-1)[0];
}

/* ------------------------------------------ */
/**
 * Fetches the CSS content from the specified URL.
 *
 * @param url - The URL from which to fetch the CSS content.
 * @returns A promise that resolves with the CSS content as a string.
 */
export const cssFromURL = async (url: string): Promise<string> => {
	return await fetch(url).then((res) => res.text());
};

/* ---------------------------------------------- */

export interface CssFile {
	baseUrl?: string;
	ignores?: string[];
}

/**
 * Retrieves a list of CSS files within the specified base directory.
 *
 * @param baseUrl The base directory to search for CSS files. Defaults to the current directory if not provided.
 * @param ignores An optional array of directories to ignore during the search process.
 * @returns An array of strings representing the paths to the CSS files found.
 */

export const cssFiles = (baseUrl?: string, ignores?: string[]): string[] => {
	const base = baseUrl ?? ".";
	const igs = ignores ?? [];
	const defaultIgnore = ["node_modules"];
	const files = globSync(`${base}/**/*.css`, {
		ignore: [...defaultIgnore, ...igs],
	});
	return files;
};

/* ------------------------------------------------------------------- */
