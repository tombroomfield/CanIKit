import * as server from '../entries/pages/block/server_page/no_policy/_page.server.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/block/server_page/no_policy/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/block/server_page/no_policy/+page.server.js";
export const imports = ["_app/immutable/nodes/5.d53e7e21.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.a21d6cee.js"];
export const stylesheets = [];
export const fonts = [];
