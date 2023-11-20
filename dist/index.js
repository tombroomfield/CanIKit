"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanIKitPolicy = void 0;
const policy_1 = __importDefault(require("./policies/policy"));
exports.CanIKitPolicy = policy_1.default;
const index_1 = require("./hooks/index");
const CanIKit = {
    handle: index_1.handle,
};
exports.default = CanIKit;
//# sourceMappingURL=index.js.map