/**
 * @module @baganjs/css
 */
/*
 
 CSS MODULE FOR BAGAN JS.
 TRANSFORM BUNDLE OPTIMIZE CSS FILES WITH LIGHTNINGCSS APIS AND POSTCSS.
*/
import { mergeCssContent } from "./helper/mearge_css_content.js";
import {
	baganWriteFile,
	cssFiles,
	cssFromURL,
	getFileName,
} from "./helper/utils.js";
import type { BaganWriteFileOptions, CssFile } from "./helper/utils.js";
import transform_L, { type LTR } from "./lightningcss/index.js";

export {
	transform_L,
	cssFiles,
	cssFromURL,
	baganWriteFile,
	getFileName,
	mergeCssContent,
};
export type { LTR, CssFile, BaganWriteFileOptions };
