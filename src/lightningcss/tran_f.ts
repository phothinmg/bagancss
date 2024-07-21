import { type PathLike, readFileSync } from "node:fs";
import type { LTR, TransformOptions } from "./index.js";
import { LightningcssTransform } from "./transform.js";

export interface TransformFileNContent extends TransformOptions {
	entryFile?: PathLike;
	content?: string;
}

/**
 * Transforms the content of a file using LightningcssTransform based on the provided options.
 * @param {Partial<TransformFileNContent>} options - The options for transforming the file content.
 * @returns {LTR | undefined} The transformed result or undefined if entryFile is not provided.
 */
export function transformFile({
	entryFile,
	write,
	outDir,
	fileName,
	sourceMap,
	minify,
}: Partial<TransformFileNContent>): LTR | undefined {
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
}: Partial<TransformFileNContent>): LTR | undefined {
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
