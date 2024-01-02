# Overview

src is broken down into a few top level functions, all other logic is utalized by these functions.

## hook
The hook [`handle`](./hooks/index.ts) attaches the `canI` function to the locals for each server function.

## canI
[`canI`](./authorization/canI.ts) returns the contextual `canI` function to be called for each server hook. It takes the request context, resolves a fireable function based on the supplied policy (class, splat or default import) and fires it.

## vite plugin
[`plugin`](./vite/plugin.ts) is responsible for checking the the provided server functions to ensure the `canI` function is called.
