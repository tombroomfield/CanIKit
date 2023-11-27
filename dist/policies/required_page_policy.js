export default class RequiredPagePolicy {
    constructor(path) {
        this.path = path;
        this.missing = true;
    }
    [Symbol.iterator]() {
        return {
            next: function () {
                return {
                    value: this,
                    done: true,
                };
            },
        };
    }
}
//# sourceMappingURL=required_page_policy.js.map