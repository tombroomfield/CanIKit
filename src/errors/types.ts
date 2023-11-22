import type NoPagePolicyError from "./no_page_policy_error";
import type CanINotCalledError from "./cani_not_called_error";

export type CanIKitError = NoPagePolicyError | CanINotCalledError;
