/**
 * @file 字符串处理
 */

export function camelCase(underlineString) {
    return String(underlineString)
        .replace(/_([a-z0-9])/gi, ($0, $1) => $1.toUpperCase());
}

export function camelCaseObject(underlineVariable) {
    if (Array.isArray(underlineVariable)) {
        return underlineVariable.map(item => {
            if (typeof item === 'string') {
                return camelCase(item);
            }
            if (typeof item === 'object') {
                return camelCaseObject(item);
            }
            return item;
        });
    }
    if (typeof underlineVariable === 'object') {
        return Object.keys(underlineVariable).reduce((result, key) => {
            const value = underlineVariable[key];
            result[camelCase(key)] = value && typeof value === 'object'
                ? camelCaseObject(value)
                : value;
            return result;
        }, {});
    }
    return underlineVariable;
}

export function snakeCase(camelString) {
    return String(camelString)
        .replace(/\B([A-Z])/g, '_$1')
        .toLowerCase();
}

export function snakeCaseObject(camelVariable) {
    if (typeof camelVariable === 'object') {
        return Object.keys(camelVariable).reduce((result, key) => {
            const value = camelVariable[key];
            result[snakeCase(key)] = value && typeof value === 'object'
                ? snakeCaseObject(value)
                : value;
            return result;
        }, {});
    }
    return camelVariable.map(item => {
        if (typeof item === 'string') {
            return snakeCase(item);
        }
        if (typeof item === 'object') {
            return snakeCaseObject(item);
        }
        return item;
    });
}
