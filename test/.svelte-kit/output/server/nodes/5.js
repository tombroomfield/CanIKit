import * as server from '../entries/pages/allow/server_page/allowed/klass/_page.server.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/allow/server_page/allowed/klass/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/allow/server_page/allowed/klass/+page.server.js";
export const imports = ["_app/immutable/nodes/5.91afc5cb.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.a21d6cee.js"];
export const stylesheets = [];
export const fonts = [];
