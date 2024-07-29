import browserslist from "browserslist";
/* NPM */
import { Features, browserslistToTargets, transform } from "lightningcss";
/* LOCAL */
import { baganWriteFile } from "../helper/utils.js";
/* ----------------------------------------------------------------------------------------------- */
export interface LTO {
	fileName?: string;
	write?: boolean;
	outDir?: string;
	sourceMap?: boolean;
	minify?: boolean;
}
export interface LToptions extends LTO {
	content: Buffer;
}
/**
 * Transforms the given content using Lightningcss.
 *
 
 * @returns If write is true and outFilePath is provided, writes the transformed content to the specified file path. Otherwise, returns an object containing the transformed CSS code and map code.
 */
export function LightningcssTransform({
	write,
	content,
	fileName,
	outDir,
	sourceMap,
	minify,
}: LToptions) {
	const W: boolean = write ?? false;
	const SM: boolean = sourceMap ?? false;
	const MNF: boolean = minify ?? false;
	if (W && !outDir) {
		console.log("If `options.write` enable `option.outDir` is required");
		return {
			csscode: "",
			mapcode: "",
		};
	}
	const fn: string = fileName ?? "bundle.css";
	const targets = browserslistToTargets(browserslist(">= 0.25%"));
	const { code, map } = transform({
		filename: fn,
		code: content,
		minify: MNF,
		sourceMap: SM,
		targets,
		include: Features.Colors | Features.Nesting,
		exclude: Features.VendorPrefixes,
	});
	const csscode = String(code);
	const mapcode = String(map);
	if (W && outDir) {
		baganWriteFile({
			filePath: `${outDir}/${fn}`,
			data: csscode,
		});
		if (SM) {
			baganWriteFile({
				filePath: `${outDir}/${fn}.map`,
				data: mapcode,
			});
		}
	} else {
		return {
			csscode,
			mapcode,
		};
	}
}
