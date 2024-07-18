import { mergeCssContent } from "../helper/mearge_css_content.js";
import { type CssFile, cssFiles } from "../helper/utils.js";
import { type LTO, LightningcssTransform } from "./transform.js";

export interface TransformOptions extends CssFile, LTO {}

export type LTR = {
	csscode: string;
	mapcode: string;
};

/**
 * ### Asynchronously transforms Lightningcss content.
 * 
 * ---
 
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
	const files = cssFiles(baseUrl, ignores);
	const cssContent = await mergeCssContent(files);
	const css = Buffer.from(cssContent);
	return LightningcssTransform({
		content: css,
		write: write,
		outDir: outDir,
		fileName: fileName,
		sourceMap: sourceMap,
		minify: minify,
	});
}
