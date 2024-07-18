import { styleText } from "node:util";
import browserslist from "browserslist";
/* NPM */
import { Features, browserslistToTargets, transform } from "lightningcss";
/* LOCAL */
import { baganWriteFile } from "../helper/utils.js";
/* ----------------------------------------------------------------------------------------------- */
export interface LightningcssTransformOptions {
	content: Buffer;
	write?: boolean;
	outFilePath?: string;
}
/**
 * Transforms the given content using Lightningcss.
 *
 * @param {LightningcssTransformOptions} options - The options for transforming the content.
 * @returns If write is true and outFilePath is provided, writes the transformed content to the specified file path. Otherwise, returns an object containing the transformed CSS code and map code.
 */
export function LightningcssTransform({
	write,
	content,
	outFilePath,
}: LightningcssTransformOptions) {
	if (write && !outFilePath)
		console.log(
			styleText(
				["bold", "yellow"],
				"If `options.write` enable `option.outFilePath` is required",
			),
		);
	const targets = browserslistToTargets(browserslist(">= 0.25%"));
	const { code, map } = transform({
		filename: outFilePath,
		code: content,
		minify: true,
		sourceMap: true,
		targets,
		include: Features.Colors | Features.Nesting,
		exclude: Features.VendorPrefixes,
	});
	const csscode = String(code);
	const mapcode = String(map);
	if (write && outFilePath) {
		baganWriteFile({
			filePath: outFilePath,
			data: csscode,
		});
		baganWriteFile({
			filePath: `${outFilePath}.map`,
			data: mapcode,
		});
	} else {
		return {
			csscode,
			mapcode,
		};
	}
}
