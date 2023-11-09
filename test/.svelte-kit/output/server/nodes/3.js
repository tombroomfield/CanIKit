

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/allow/no_backend/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.74c6ce18.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.a21d6cee.js"];
export const stylesheets = [];
export const fonts = [];
