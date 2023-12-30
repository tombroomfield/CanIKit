// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { CanI } from "../../src/index";
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      canI: CanI;
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
