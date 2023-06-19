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

## Usage

Once setup, you will likely start getting some errors when you try to load your pages. This is because on every server-side load event, CanIKit will check to ensure that the `canI` method is called. Let's see an example of how we can do that.

```typescript
// +page.server.js
export async function load({ request, locals: { canI } }) {
  const user = ... // Find the user based on the request
  await canI({ user });


  // ... other code
}
```

In it's most basic form, the `canI` function can be passed a user object. The user will be passed to the policy for the page, layout, or API route. Let's see an example of a policy file for a page:

In the same directory as the `+page.server.js|ts` file, create a `page.policy.js|ts` file.

This very simple policy just checks to ensure that we have a signed in user, otherwise the authorization will fail.

```typescript
// page.policy.ts
import { CanIKitPolicy } from "canikit";
export default class Policy extends CanIKit {
  async view() {
    // We have access to this user object through this.user
    if (!this.user) return false;

    return true;
  }
}
```

### Authorizing resources

Often, 'who can view this page' is not enough. We often need to authorize the page (or action) against a specific resource. Take this page for example

`./routes/todos/[id]/+page.server.ts`

In this case, we only want to allow the user to view the page if they are the owner of the todo item. We can do this by passing the resource to the `canI` method.

```typescript
// +page.server.ts
export async function load({ request, params, locals: { canI } }) {
  const user = ... // Find the user based on the request
  const todo = ... // Find the todo based on the params
  await canI({ user, resource: todo });

  // ... other code
}

```

Then, inside our policy file:

```typescript
// page.policy.ts
import { CanIKitPolicy } from "canikit";
export default class Policy extends CanIKit {
  async view() {
    // We have access to this user object through this.user
    // We have access to the resource through this.resource
    if (!this.user) return false;

    // We only want to allow the user to view the page if they are the owner of the todo item
    if (this.user.id !== this.resource.userId) return false;

    return true;
  }
}
```

### Skipping authorization

Sometimes, you may want to skip authorization for a page. For example, you may have a public page that anyone can view. You can do this by calling the skipCanI method.

```typescript
// +page.server.ts
export async function load({ request, params, locals: { skipCanI } }) {
  skipCanI();

  // ... other code
}
```
