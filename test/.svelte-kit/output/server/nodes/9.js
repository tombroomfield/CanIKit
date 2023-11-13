import * as server from '../entries/pages/block/server_page/not_called/functions/_page.server.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/block/server_page/not_called/functions/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/block/server_page/not_called/functions/+page.server.js";
export const imports = ["_app/immutable/nodes/9.fd4d4fa1.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.a21d6cee.js"];
export const stylesheets = [];
export const fonts = [];
