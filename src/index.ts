import { type PathLike, readFileSync } from "node:fs";
import { mergeCssContent } from "./helper/mearge_css_content.js";
import { type CssFile, cssFiles } from "./helper/utils.js";
import { type LTO, LightningcssTransform } from "./lib/transform.js";

interface TransformOptions extends CssFile, LTO {
	entryFile?: PathLike;
	content?: string;
}

export type LTR = {
	csscode: string;
	mapcode: string;
};

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

export async function transformDir({
	baseUrl,
	ignores,
	write,
	outDir,
	fileName,
	sourceMap,
	minify,
}: Partial<TransformOptions>): Promise<LTR | undefined> {
	if (typeof baseUrl !== "string" || baseUrl.trim() === "") {
		throw new Error("Invalid baseUrl: must be a non-empty string");
	}
	const files = cssFiles(baseUrl, ignores);
	let cssContent: string;
	try {
		cssContent = await mergeCssContent(files);
	} catch (error) {
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
}

/**
 * Transforms the content of a file using LightningcssTransform based on the provided options.
 * @param {Partial<TransformOptions>} options - The options for transforming the file content.
 * @returns {LTR | undefined} The transformed result or undefined if entryFile is not provided.
 */
export function transformFile({
	entryFile,
	write,
	outDir,
	fileName,
	sourceMap,
	minify,
}: Partial<TransformOptions>): LTR | undefined {
	if (!entryFile) {
		return undefined;
	}

	const css: Buffer = readFileSync(entryFile);
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

export function transformContent({
	content,
	fileName,
	write,
	outDir,
	sourceMap,
	minify,
}: Partial<TransformOptions>): LTR | undefined {
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
