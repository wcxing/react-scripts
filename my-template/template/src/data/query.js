import {camelCase} from '~/util/string';

export function parseQueryString(search = location.search) {
    search = search.slice(1);
    const params = {};
    if (!search) {
        return params;
    }
    search.split('&').forEach(param => {
        const p = param.split('=');
        let key = p[0];
        const value = decodeURIComponent(p[1]);
        params[key] = value;
    });
    return params;
}

export default parseQueryString();
