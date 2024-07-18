/* NODE */
import { styleText } from "node:util";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import advancedPreset from "cssnano-preset-advanced";
/* NPM */
import postcss from "postcss";
import atImport from "postcss-import";
import postcssNested from "postcss-nested";
/* LOCAL */
import { baganWriteFile } from "../helper/utils.js";
/* ------------------------------------------------------ */
export interface PostcssTransformOptions {
	content: string;
	write?: boolean;
	outFilePath?: string;
	fileFrom?: string;
}
/**
 * Transforms the given CSS content using PostCSS with specified options.
 * If `write` is enabled, writes the transformed CSS to the specified `outFilePath`.
 *
 * @param content The CSS content to transform
 * @param fileFrom The file path of the source CSS file
 * @param outFilePath The output file path to write the transformed CSS
 * @param write A flag indicating whether to write the transformed CSS to a file
 * @returns An object containing the transformed CSS code and source map code if `write` is disabled, otherwise nothing
 */
export function PostcssTransform({
	content,
	fileFrom,
	outFilePath,
	write,
}: PostcssTransformOptions) {
	if (write && !outFilePath) {
		console.log(
			styleText(
				["bold", "yellow"],
				"If `options.write` enable `option.outFilePath` is required",
			),
		);
		return {};
	}

	let csscode: string;
	let mapcode: string;
	const preset = advancedPreset({});
	postcss([cssnano({ preset, plugins: [autoprefixer, postcssNested] })])
		.use(atImport())
		.process(content, {
			from: fileFrom,
			to: outFilePath,
			map: {
				inline: false,
			},
		})
		.then((result: postcss.Result<postcss.Root>) => {
			csscode = result.css;
			mapcode = result.map.toString();
			if (write && outFilePath) {
				baganWriteFile({
					filePath: outFilePath,
					data: result.css,
				});
				if (result.map) {
					baganWriteFile({
						filePath: `${outFilePath}.map`,
						data: result.map.toString(),
					});
				}
			} else {
				return {
					csscode,
					mapcode,
				};
			}
		});
}
