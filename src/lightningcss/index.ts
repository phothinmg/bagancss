import { mergeCssContent } from "../helper/mearge_css_content.js";
import { type CssFile, cssFiles } from "../helper/utils.js";
import { type LTO, LightningcssTransform } from "./transform.js";

export interface TransformOptions extends CssFile, LTO {}

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
 * ```ts
 * import { transform, type LTR } from "bagancss";

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

	const result = await transform({
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

export default async function transform({
  baseUrl,
  ignores,
  write,
  outDir,
  fileName,
  sourceMap,
  minify,
}: TransformOptions): Promise<LTR | undefined> {
  if (typeof baseUrl !== "string" || baseUrl.trim() === "") {
    throw new Error("Invalid baseUrl: must be a non-empty string");
  }
  const files = cssFiles(baseUrl, ignores);
  let cssContent;
  try {
    cssContent = await mergeCssContent(files);
  } catch (error: any) {
    throw new Error(`Failed to merge CSS content: ${error.message}`);
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
