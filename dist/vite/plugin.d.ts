interface PluginOptions {
    lax: boolean;
}
declare function plugin({ lax }?: PluginOptions): {
    name: string;
    /**
     * Running on transform, but never actually transforming the code.
     * Will check to see if the server file is valid.
     * Which in this case, means either:
     *  - it calls `canI()` and has a corresponding policy file or
     *  - it contains a `// skip-can-i` comment
     */
    transform(code: string, id: string): null;
};
export default plugin;
