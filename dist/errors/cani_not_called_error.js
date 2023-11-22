export default class CanINotCalledError extends Error {
    constructor(path) {
        super(`CanI not called for route ${path}`);
        this.name = "CanINotCalledError";
    }
}
//# sourceMappingURL=cani_not_called_error.js.map