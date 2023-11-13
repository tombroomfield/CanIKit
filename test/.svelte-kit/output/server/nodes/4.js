import * as server from '../entries/pages/allow/server_page/allowed/functions/_page.server.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/allow/server_page/allowed/functions/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/allow/server_page/allowed/functions/+page.server.js";
export const imports = ["_app/immutable/nodes/4.91afc5cb.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.a21d6cee.js"];
export const stylesheets = [];
export const fonts = [];
