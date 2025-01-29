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
        compiler.hooks.emit.tapAsync(pluginName, (compilation, callback) => {
            compilation.emitAsset(
                path.join(this.options.outputFolder, `tests.html`),
                    new RawSource(`<%~ include('src/_partials/headMeta.html') %>`)
                );
                callback()

            // compilation.hooks.processAssets.tap({
            //     "name": pluginName,
            //     "stage": compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
            //     additionalAssets: true
            // }, (assets) => {
                
            // });
        
            
        });
        
    }
}