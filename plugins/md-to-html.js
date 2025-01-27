import fs from "fs"
import path from 'path'

export class MarkdownToHtmlPlugin {
    static defaultOptions = {
        outputFolder: '/',
        targetFolder: "/",
        processor: null,
    };
  
    constructor(options = {}) {
        this.options = { ...MarkdownToHtmlPlugin.defaultOptions, ...options };
    }
  
    apply(compiler) {
        const pluginName = MarkdownToHtmlPlugin.name;
        const { webpack } = compiler;
        const { Compilation } = webpack;
        const { RawSource } = webpack.sources;
    
        // Tapping to the "thisCompilation" hook in order to further tap
        // to the compilation process on an earlier stage.
        compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
            let assets = []
            fs.readdir(this.options.targetFolder, { withFileTypes: true }, (err, files) => {  
                files.forEach((file) => {
                    const fullPath = path.join(this.options.targetFolder, file.name);
                    if (file.isFile() && fullPath.endsWith('.md')) {
                        this.options.processor.process(fs.readFileSync(fullPath, "utf-8"))
                        .then(html => {
                            compilation.emitAsset(
                                path.join(this.options.outputFolder, `${path.parse(fullPath).name}.html`),
                                new RawSource(String(html))

                            );
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    }
                });
            })
        });
        
    }
}