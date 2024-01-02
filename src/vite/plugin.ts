import { validServer } from "src/parsing";
import { notServerFile } from "@lib/sveltekit";

interface PluginOptions {
  lax: boolean;
}

function plugin({ lax }: PluginOptions = { lax: false }) {
  return {
    name: "can-i-kit",
    /**
     * Running on transform, but never actually transforming the code.
     * Will check to see if the server file is valid.
     * Which in this case, means either:
     *  - it calls `canI()` and has a corresponding policy file or
     *  - it contains a `// skip-can-i` comment
     */
    transform(code: string, id: string): null {
      if (notServerFile(id)) return null;

      /* 
       Checks to see if the server file is valid.
       Which in this case, means either:
        - it calls `canI()`
        - it contains a `// skip-can-i` comment
       If either of these checks fail, throw an error or log a warning depending on the lax option. 
      */
      validServer(id, code, lax);

      return null; // no transformation to the code
    },
  };
}

export default plugin;
