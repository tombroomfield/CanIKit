const canIKitErrorNames = ["NoPagePolicyError", "CanINotCalledError"];
export function handleError({ error, _event, }) {
    if (canIKitErrorNames.includes(error.name)) {
        return {
            message: process.env.NODE_ENV == "production" ? "Internal error" : error.message,
        };
    }
}
//# sourceMappingURL=index.js.map