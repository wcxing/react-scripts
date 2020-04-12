/**
 * @file 发布订阅模式
 */

export default class EventEmitter {
    onObj = {};

    oneObj = {};

    on(key, callback) {
        if (this.onObj[key] === void 0) {
            this.onObj[key] = [];
        }
        this.onObj[key].push(callback);
        return this;
    }

    one(key, callback) {
        if (this.oneObj[key] === void 0) {
            this.oneObj[key] = [];
        }
        this.oneObj[key].push(callback);
        return this;
    }

    off(key, callback) {
        if (!callback) {
            delete this.onObj[key];
            delete this.oneObj[key];
        }
        const onArr = this.onObj[key];
        const oneArr = this.oneObj[key];
        if (Array.isArray(onArr)) {
            const onIndex = onArr.indexOf(callback);
            if (onIndex !== -1) {
                onArr.splice(onIndex, 1);
            }
        }
        if (Array.isArray(oneArr)) {
            const oneIndex = oneArr.indexOf(callback);
            if (oneIndex !== -1) {
                oneArr.splice(oneIndex, 1);
            }
        }
        return this;
    }

    trigger(...args) {
        if (arguments.length === 0) {
            return this;
        }
        const [key, ...params] = args;
        if (isNonEmptyArray(this.onObj[key])) {
            this.onObj[key].forEach(callback => {
                callback(...params);
            });
        }
        if (isNonEmptyArray(this.oneObj[key])) {
            this.oneObj[key].forEach(callback => {
                callback(...params);
            });
            delete this.oneObj[key];
        }
        return this;
    }

    clear() {
        this.onObj = {};
        this.oneObj = {};
    }
}

function isNonEmptyArray(variable) {
    return Array.isArray(variable) && variable.length;
}
