import { mergeCssContent } from "../helper/mearge_css_content.js";
import { cssFiles } from "../helper/utils.js";
import type { CssFile } from "../helper/utils.js";
import { LightningcssTransform } from "./transform.js";
import type { LightningcssTransformOptions } from "./transform.js";

type F = CssFile;
type L = LightningcssTransformOptions;

export type LT = {
	Fopts: F;
	writeFile?: boolean;
	writeFilePath?: string;
};
export type LTR = {
	csscode: string;
	mapcode: string;
};
/**
 * ### Asynchronously transforms Lightningcss content.
 * 
 * ---
 * 
 * * **Parameters**
 * 
 *   * **Fopts = File options**
 * 
 *     * **`Fopts.baseUrl` : path/to/directory of css files.**
 * 
 *     * **`Fopts.ignores`: Array of files want to exculde in transform**
 * 
 *        * **_When using `@import` statements , need to collect these in special file ` _import.css` in `baseUrl`._**
 * 
 *    * **`writeFile` : If true , will write transformed code to file(map file include), default - false**
 * 
 *    * **`writeFilePath` : When `writeFile` is `true` required. eg. `./dist/index.css`**
 * 
 * * **Returns**
 * 
 *   * **Write the output to files when `writeFile` is `true`**.
 * 
 *   * **Return `csscode` and `mapcode` when `writeFile` is `false`**.
 * 
 * 
 * ***
 * 
 * <br>
 * 
 * ```ts
 * import { transform_L } from ".";

    await transform_L({
      Fopts: {
        baseUrl: "./test-css",
        ignores: [],
      },
      writeFile: true,
      writeFilePath: "./dist/index.css",
    });
    // write ./dist/index.css and ./dist/index.css.mnap
 * ```

    ---

  <br>


    ```ts
    import { transform_L, type LTR } from "./src/index.js";

    const cssContent = await transform_L({
      Fopts: {
        baseUrl: "./test-css",
        ignores: [],
      },
    }) as LTR ;

    console.log(cssContent.csscode);
    console.log(cssContent.mapcode);

    ```
 *
 */

export default async function transform_L({
	Fopts,
	writeFile,
	writeFilePath,
}: LT): Promise<LTR | undefined> {
	const files = cssFiles(Fopts.baseUrl, Fopts.ignores);
	const cssContent = await mergeCssContent(files);
	const css = Buffer.from(cssContent);
	return LightningcssTransform({
		content: css,
		write: writeFile,
		outFilePath: writeFilePath,
	});
}
