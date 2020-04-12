/**
 * @file DOM 相关
 */

/**
 * 是否支持 classList
 *
 * @type {boolean}
 */
const hasClassList = 'classList' in document.documentElement;

/**
 * 是否包含指定的 class
 *
 * @param {Element} el HTMLElement
 * @param {string} className 待评估是否被包含的 class 名
 */
export const hasClass = hasClassList
    ? (el, className) => el.classList.contains(className)
    : (el, className) => ` ${el.className} `.indexOf(` ${className} `) > -1;

/**
 * 增加 class
 *
 * @param {Element} el HTMLElement
 * @param {string} className 要增加的 class 名
 */
export const addClass = hasClassList
    ? (el, className) => el.classList.add(className)
    : (el, className) => !hasClass(el, className) && (el.className = `${el.className} ${className}`.trim());

/**
 * 移除 class
 *
 * @param {Element} el HTMLElement
 * @param {string} className 要移除的 class 名
 */
export const removeClass = hasClassList
    ? (el, className) => el.classList.remove(className)
    : (el, className) =>
        (el.className = el.className
            .split(/\s+/)
            .filter(name => name !== className)
            .join(' '));

/**
 * 切换 class
 *
 * @param {Element} el HTMLElement
 * @param {string} className 要切换的 class 名
 */
export const toggleClass = hasClassList
    ? (el, className) => el.classList.toggle(className)
    : (el, className) => (hasClass(el, className) ? removeClass : addClass)(el, className);

export const setWidth = (dom, width) => {
    if (!dom) {
        return;
    }
    dom.style.width = `${width}px`;
};

export const setHeight = (dom, height) => {
    if (!dom) {
        return;
    }
    dom.style.height = `${height}px`;
};

/**
 * 找到target上的属性，如果当前元素上找不到，则向上找父节点的属性
 * @param {HTMLElement} target
 */
export const findAttrOnTarget = (target, attrName) => {
    let limit = 3;
    while (limit > 0 && typeof target?.dataset?.[attrName] === 'undefined') {
        target = target.parentElement;
        limit--;
    }
    return target?.dataset?.[attrName];
};
