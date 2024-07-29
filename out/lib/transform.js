import browserslist from "browserslist";
/* NPM */
import { Features, browserslistToTargets, transform } from "lightningcss";
/* LOCAL */
import { baganWriteFile } from "../helper/utils.js";
/**
 * Transforms the given content using Lightningcss.
 *
 
 * @returns If write is true and outFilePath is provided, writes the transformed content to the specified file path. Otherwise, returns an object containing the transformed CSS code and map code.
 */
export function LightningcssTransform({ write, content, fileName, outDir, sourceMap, minify, }) {
    const W = write !== null && write !== void 0 ? write : false;
    const SM = sourceMap !== null && sourceMap !== void 0 ? sourceMap : false;
    const MNF = minify !== null && minify !== void 0 ? minify : false;
    if (W && !outDir) {
        console.log("If `options.write` enable `option.outDir` is required");
        return {
            csscode: "",
            mapcode: "",
        };
    }
    const fn = fileName !== null && fileName !== void 0 ? fileName : "bundle.css";
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
    }
    else {
        return {
            csscode,
            mapcode,
        };
    }
}
//# sourceMappingURL=transform.js.map