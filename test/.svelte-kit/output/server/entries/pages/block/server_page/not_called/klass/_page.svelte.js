import { c as create_ssr_component } from "../../../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  console.log("DATA", data);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div data-testid="msg" data-svelte-h="svelte-1eqc6r6">LOADED - BACKEND, POLICY, NOT CALLED</div>`;
});
export {
  Page as default
};
