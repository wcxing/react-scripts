/**
 * @file 在指定元素上监听键盘事件
 *
 * @param {HTMLElement} targetElement 需要绑定键盘事件的元素
 * @param {Object} listeners 需要注册的所有监听器
 * @return {Function} 移除事件监听器
 */

const code2ShortcutMap = {
    // 等号
    Equal: 'equal',
    // 减号
    Minus: 'minus',
    // 回车
    Enter: 'enter',
    // 删除
    Backspace: 'backspace',
    // 空格
    Space: 'space',
    // 方向键
    ArrowLeft: 'left',
    ArrowRight: 'right',
    ArrowUp: 'up',
    ArrowDown: 'down',
    PageUp: 'pageUp',
    PageDown: 'pageDown',
    Escape: 'escape'
};

export default (targetElement, listeners) => {
    const callback = e => {
        let shortcut = '';
        let {key, code, keyCode, shiftKey, ctrlKey, altKey} = e;
        key = key.toLowerCase();

        // 处理字母和数字键
        if (keyCode <= 57 && keyCode >= 48
            || keyCode <= 90 && keyCode >= 65
        ) {
            shortcut = String.fromCharCode(keyCode).toLowerCase();
        }
        // 处理其他常用字符
        else if (keyCode === 229) {
            shortcut = null;
        }
        else {
            shortcut = code2ShortcutMap[code];
        }

        if (!shortcut) {
            return;
        }

        // 处理组合键
        if (shiftKey && key !== 'shift') {
            shortcut = `shift+${shortcut}`;
        }
        if (ctrlKey && key !== 'control') {
            shortcut = `ctrl+${shortcut}`;
        }
        if (altKey && key !== 'alt') {
            shortcut = `alt+${shortcut}`;
        }

        const handler = listeners[shortcut];
        if (typeof handler === 'function') {
            handler(e);
        }
    };
    targetElement.addEventListener('keydown', callback);

    return function removeKeyboardListener() {
        targetElement.removeEventListener('keydown', callback);
    };
};
