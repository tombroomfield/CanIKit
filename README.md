# CanIKit

The missing SvelteKit Authorization Library!

CanIKit is a SvelteKit library that provides a simple way to add authorization to your SvelteKit application. It is heavily inspired by [Pundit](https://github.com/varvet/pundit);

The main purpose of CanIKit is to provide a simple way to isolate server-side authorization logic from your route files. This allows for a better separation of concerns and helps keep your +server, +layout.server, and +page.server files cleaner.

Another key feature of CanIKit is that an error is thrown if the `canI` method is not called when running server-side code (typically server page loads or API calls). This helps ensure that authorization is always considered when designing your routes.

## Installation

```sh
npm install canikit
```

## Setup

CanIKit provides a `hook` that must be set up in your hooks.server file.

```typescript
// hooks.server.ts
import CanIKit from "canikit";

// ...

export const handle = CanIKit.handle({
  pagePolicies: import.meta.glob("./routes/**/page.policy.*"),
  pageSevers: import.meta.glob("./routes/**/+page.server.*"),
  layoutPolicies: import.meta.glob("./routes/**/layout.policy.*"),
  layoutServers: import.meta.glob("./routes/**/+layout.server.*"),
  apiServers: import.meta.glob("./routes/**/+server.*"),
  apiPolicies: import.meta.glob("./routes/**/policy.*"),
});
```

In the likely event that you are already using a hook, simply utilize the SvelteKit `sequence` function to combine the hooks.

```typescript
// hooks.server.ts
import CanIKit from "canikit";
import { sequence } from "@sveltejs/kit/hooks";

// ...

export const handle = sequence(
  // ... other hooks,
  CanIKit.handle({
    pagePolicies: import.meta.glob("./routes/**/page.policy.*"),
    pageSevers: import.meta.glob("./routes/**/+page.server.*"),
    layoutPolicies: import.meta.glob("./routes/**/layout.policy.*"),
    layoutServers: import.meta.glob("./routes/**/+layout.server.*"),
    apiServers: import.meta.glob("./routes/**/+server.*"),
    apiPolicies: import.meta.glob("./routes/**/policy.*"),
  })
);
```
