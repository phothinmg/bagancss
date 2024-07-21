/**
 * @module @baganjs/css
 */
/*
 
 CSS MODULE FOR BAGAN JS.
 TRANSFORM BUNDLE OPTIMIZE CSS FILES WITH LIGHTNINGCSS APIS AND POSTCSS.
*/
import { mergeCssContent } from "./helper/mearge_css_content.js";
import {
	type BaganWriteFileOptions,
	type CssFile,
	baganWriteFile,
	cssFiles,
	cssFromURL,
	getFileName,
} from "./helper/utils.js";

import transform, {
	type LTR,
	type TransformOptions,
} from "./lightningcss/index.js";
import { transformContent, transformFile } from "./lightningcss/tran_f.js";

export {
	transform,
	cssFiles,
	cssFromURL,
	baganWriteFile,
	getFileName,
	mergeCssContent,
	transformContent,
	transformFile,
};
export type { LTR, CssFile, BaganWriteFileOptions, TransformOptions };
