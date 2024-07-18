import { mergeCssContent } from "../helper/mearge_css_content.js";
import { cssFiles, type CssFile } from "../helper/utils.js";
import { LightningcssTransform, type LTO } from "./transform.js";

export type F = CssFile;
export type T = LTO;

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
 *   * **`Foptions`: `F` = File options**
 * 
 *     1. **`Foptions.baseUrl` : path/to/directory of css files.**
 * 
 *     2. **`Foptions.ignores`: Array of files want to exculde in transform**
 * 
 *        * **_When using `@import` statements , need to collect these at special file named ` _import.css` in `baseUrl`._**
 * 
 *    * **`Toptions` : `T` = Transform Options**
 * 
 *    
 * 
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

export default async function transform_L(
  Foptions: F,
  Toptions: T
): Promise<LTR | undefined> {
  const files = cssFiles(Foptions.baseUrl, Foptions.ignores);
  const cssContent = await mergeCssContent(files);
  const css = Buffer.from(cssContent);
  return LightningcssTransform({
    content: css,
    write: Toptions.write,
    outDir: Toptions.outDir,
    fileName: Toptions.fileName,
    sourceMap: Toptions.sourceMap,
    minify: Toptions.minify,
  });
}
