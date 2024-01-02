'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _function = require('fp-ts/function');

class CanIKitPolicy {
    constructor({ user, resource }) {
        this.user = user;
        this.resource = resource;
    }
}

/**
 * Checks if an object exists (not undefined or null).
 *
 * @param object - The object to check.
 * @returns True if the object exists, false otherwise.
 */
function exists(object) {
    return object !== undefined && object !== null;
}

function policyExists(policy, route) {
    if (exists(policy))
        return true;
    console.log(`Policy not provided for route ${route}`, policy);
    throw new Error(`Policy not provided for route ${route}`);
}

function objectIsSplatImportedModule(obj) {
    return typeof obj === "object" && !obj.default;
}
function objectIsntSplatImportedModule(obj) {
    return !objectIsSplatImportedModule(obj);
}
function splatImportedModuleFunctionIsPresent(obj, func) {
    return !!(objectIsSplatImportedModule(obj) &&
        obj[func] &&
        typeof obj[func] === "function");
}
function splatImportedModuleFunctionIsntPresent(obj, func) {
    return !splatImportedModuleFunctionIsPresent(obj, func);
}

/**
 * Executes the specified function from the policy object.
 * @param functionName - The name of the function to execute.
 * @param policy - The policy object containing the function.
 * @returns A function that takes a user and resource object and executes the specified function from the policy object.
 */
function splat({ functionName, policy, route }) {
    if (objectIsntSplatImportedModule(policy))
        return false;
    if (splatImportedModuleFunctionIsntPresent(policy, functionName))
        return missingSplatImportedModuleFunction(functionName, route);
    return policy[functionName];
}
function missingSplatImportedModuleFunction(functionName, route) {
    throw new Error(`Unable to fire "${functionName}" from the policy for the route ${route}. The module does not have a "${functionName}" function.`);
}

function objectIsClass(obj) {
    return typeof obj === "function" && !!obj.prototype;
}
function objectIsntClass(obj) {
    return !objectIsClass(obj);
}
function classFunctionIsPresent(klass, func) {
    return !!(objectIsClass(klass) && klass.prototype[func]);
}
function classFunctionIsntPresent(klass, func) {
    return !classFunctionIsPresent(klass, func);
}

/**
 * Creates a function that invokes a method on a class instance.
 * @param functionName - The name of the method to invoke.
 * @param policy - The class to create an instance of.
 * @returns A function that invokes the specified method on the class instance.
 */
function klass({ functionName, policy, route }) {
    if (objectIsntClass(policy))
        return false;
    if (classFunctionIsntPresent(policy, functionName))
        return missingClassFunction(functionName, policy);
    return ({ user, resource }) => {
        const instance = new policy({ user, resource });
        return instance[functionName]();
    };
}
function missingClassFunction(functionName, route) {
    throw new Error(`Unable to fire ${functionName} from the policy for the route ${route}. The class does not have a ${functionName} method.`);
}

function objectIsDefaultImportedModule(obj) {
    return typeof obj === "object" && !!obj.default;
}
function objectIsntDefaultImportedModule(obj) {
    return !objectIsDefaultImportedModule(obj);
}
function defaultImportedModuleFunctionIsPresent(obj, func) {
    return !!(objectIsDefaultImportedModule(obj) &&
        obj.default[func] &&
        typeof obj.default[func] === "function");
}
function defaultImportedModuleFunctionIsntPresent(obj, func) {
    return !defaultImportedModuleFunctionIsPresent(obj, func);
}

/**
 * Retrieves the default import function from a policy object.
 * @param functionName - The name of the function to retrieve.
 * @param policy - The policy object.
 * @returns The default import function if it exists, otherwise false.
 */
function defaultImport({ policy, functionName, route }) {
    if (objectIsntDefaultImportedModule(policy))
        return false;
    if (defaultImportedModuleFunctionIsntPresent(policy, functionName))
        return missingDefaultImportedModuleFunction(functionName, route);
    return policy.default[functionName];
}
function missingDefaultImportedModuleFunction(functionName, route) {
    throw new Error(`Unable to fire ${functionName} for the policy of the route: ${route}. The module does not have a ${functionName} function.`);
}

/**
 * Returns a function that takes fireable policy function.
 * @param policy - The policy object.
 * @param functionName - The name of the function.
 * @param route - The route.
 * @returns A function that takes a user and resource object and returns an async policy function.
 */
function fireable({ policy, functionName, route }) {
    policyExists(policy, route);
    const fireableContext = { functionName, policy, route };
    return klass(fireableContext) || splat(fireableContext) || defaultImport(fireableContext) || unableToFire(functionName, route);
}
function unableToFire(functionName, route) {
    throw new Error(`Unable to fire ${functionName} for the policy of the route: ${route}. The policy is not a supported type.`);
}

class UnhandledPermissionDeniedError extends Error {
    constructor(request) {
        super(`Unhandled Permission denied for route: ${request.route} (method: ${request.method})`);
        this.name = "UnhandledPermissionDeniedError";
    }
}

function mapRest(method) {
    switch (method) {
        case "GET":
            return "view";
        case "POST":
            return "create";
        case "PUT":
            return "update";
        case "PATCH":
            return "update";
        case "DELETE":
            return "delete";
        default:
            throw new Error(`Invalid method: ${method}`);
    }
}

/**
 * Returns a function that will accept a suppled action and return the action or the mapped rest action if the suppled action is undefined.
 * @param {string} method The method to map to a rest action. Must be one of GET, POST, PUT, PATCH, or DELETE.
 * @example
 * ```ts
 * const action = resolve("GET")("custom") // "custom"
 * const action = resolve("GET")(undefined) // "view"
 * const action = resolve("POST")(undefined) // "create"
 * @returns A function that will accept a suppled action and return the action or the mapped rest action if the suppled action is undefined.
 */
function resolve(method) {
    return (suppledAction) => {
        /* Return the suppled action if it is defined, otherwise return the mapped rest action. */
        return suppledAction || mapRest(method);
    };
}

function canI(request) {
    return async (policy, { user, resource, action, denied, } = {}) => {
        /* Grab the name of the function to call on the policy. */
        const functionName = resolve(request.method)(action);
        /**
         * Go get a fireable function from the policy. This will throw errors if no policy is provided or if the function does not exist.
         * Then call the fireable function with the user and resource.
         */
        const result = await fireable(policy, functionName, request.route)({ user, resource });
        // User is authorized, return true.
        if (result)
            return true;
        /**
         * If the user isn't authorized, call the denied function if it exists, otherwise throw a PermissionDeniedError.
         */
        const deniedFunction = denied || policy.denied;
        if (!deniedFunction)
            throw new UnhandledPermissionDeniedError(request);
        await deniedFunction({ user, resource });
    };
}

/**
 * Attaches a canI function to the event.locals object.
 * @param {Event} event The event object.
 * @param {HookResolve} resolve The resolve function.
 * @returns {Promise<any>} The result of the resolve function.
 */
function handle() {
    return async ({ event, resolve }) => {
        if (!event.route.id)
            return await resolve(event);
        event.locals.canI = _function.pipe({ route: event.route.id, method: event.request.method }, canI);
        return await resolve(event);
    };
}

/**
 * Checks if a given function name has been called in the provided code.
 * @param code The code to search for function calls.
 * @returns A function that takes a function name and returns a boolean indicating if it has been called.
 */
function hasCalledFunction(code) {
    return (functionName) => new RegExp(`${functionName}\\s*\\(`, "g").test(code);
}

/**
 * Returns a function that checks if a given string contains a slash comment
 * @param comment The comment to check for, without the slashes.
 * @returns A function that checks if a given string contains a slash comment.
 * @example
 * ```ts
 * const hasSkipComment = hasSlashComment("skip-can-i");
 * hasSkipComment("// skip-can-i"); // true
 * ```
 * @category AST
 */
function hasSlashComment(code) {
    return (comment) => new RegExp(`//\\s*${comment}`).test(code);
}

function callsCanI(code) {
    // Check if the code calls the canI function.
    return _function.pipe("canI", hasCalledFunction(code));
}

function hasSkipComment(code) {
    // Check if the code has a skip comment.
    return _function.pipe("skip-can-i", hasSlashComment(code));
}

/**
 * Checks if the given code is valid server code.
 * This doesn't check to see if the policy file exists, only that the code is valid and has a skip comment or calls `canI()`.
 * @param code The code to check.
 * @returns `true` if the code is valid server code, otherwise `false`.
 * @example
 * ```ts
 * validServerCode("canI()"); // true
 * ```
 *
 * @category Parsing
 * @internal
 */
function isValidServerCode(code) {
    return hasSkipComment(code) || callsCanI(code);
}
/**
 * Checks if the given code is invalid server code.
 * This doesn't check to see if the policy file exists, only that the code is invalid and doesn't have a skip comment or call `canI()`.
 * @param code The code to check.
 * @returns `true` if the code is invalid server code, otherwise `false`.
 * @example
 * ```ts
 * invalidServerCode("canI()"); // false
 * ```
 *
 * @category Parsing
 * @internal
 */
function isInvalidServerCode(code) {
    return !isValidServerCode(code);
}

const throwOrWarn = (message, warn) => {
    if (warn)
        return _function.pipe(message, printWarn, () => false);
    throw _function.pipe(message, Error);
};
function printWarn(msg) {
    const yellow = "\x1b[33m";
    const reset = "\x1b[0m";
    console.log(yellow, msg, reset);
}

/**
 *
 * @param {InvalidHandle} params The parameters for the handler.
 * @param {boolean} params.lax Whether or not to throw an error or just log a warning.
 * @param {string} params.fileName The path of the server file.
 * @returns A function that handles an invalid server file, either throwing an error or logging a warning if the file is invalid.
 * @example
 * ```ts
 * invalidServer({ lax: false, fileName: "src/routes/api.ts" })(true); // true
 * invalidServer({ lax: false, fileName: "src/routes/api.ts" })(false); // throws an error
 * invalidServer({ lax: true, fileName: "src/routes/api.ts" })(false); // logs a warning
 */
function invalidServer({ lax, fileName, }) {
    return (valid) => {
        return valid || throwOrWarn(msg(fileName), lax);
    };
}
function msg(fileName) {
    return `The server file ${fileName} must call 'canI()' or contain a '// skip-can-i' comment.`;
}

function validServer(fileName, code, lax) {
    /*
      Take the code in the server file,
      check to ensure it has a call to `canI()` or a `// skip-can-i` comment.
      If it doesn't, throw an error or log a warning depending on the lax option.
    */
    return _function.pipe(code, isInvalidServerCode, invalidServer({ lax, fileName }));
}

/**
 * Check if the file is a server file. This will accept any file that matches the pattern `+*.server.(ts|js)`.
 * @param path The path to check.
 * @returns `true` if the file is a server file, otherwise `false`.
 * @example
 * ```ts
 * isServerFile("./routes/+page.server.ts"); // true
 * ```
 * @category Parsing
 * @internal
 */
function isServerFile(path) {
    return /\+.*\.server\.(ts|js)$/.test(path);
}
/**
 * Check if the file is not a server file. This will accept any file that does not match the pattern `+*.server.(ts|js)`.
 * @param path The path to check.
 * @returns `true` if the file is not a server file, otherwise `false`.
 * @example
 * ```ts
 * notServerFile("./routes/+page.server.ts"); // false
 * ```
 * @category Parsing
 * @internal
 */
function notServerFile(path) {
    return !isServerFile(path);
}

function plugin({ lax } = { lax: false }) {
    return {
        name: "can-i-kit",
        /**
         * Running on transform, but never actually transforming the code.
         * Will check to see if the server file is valid.
         * Which in this case, means either:
         *  - it calls `canI()` and has a corresponding policy file or
         *  - it contains a `// skip-can-i` comment
         */
        transform(code, id) {
            if (notServerFile(id))
                return null;
            /*
             Checks to see if the server file is valid.
             Which in this case, means either:
              - it calls `canI()`
              - it contains a `// skip-can-i` comment
             If either of these checks fail, throw an error or log a warning depending on the lax option.
            */
            validServer(id, code, lax);
            return null; // no transformation to the code
        },
    };
}

exports.CanIKitPolicy = CanIKitPolicy;
exports.canIKitHandle = handle;
exports.canIKitPlugin = plugin;
//# sourceMappingURL=can-i-kit.cjs.js.map
