/**
 * @file 函数处理
 */

/**
 * 防抖动
 *
 * @param {Function} fn 需要防抖动的函数
 * @param {?Object=} context 函数调用时的上下文
 * @return {Function} 包装过的支持防抖动函数
 */
export const debounce = (fn, delay, context) => {
    let timer = null;

    return function debounce(...args) {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        timer = setTimeout(() => {
            fn(...args);
        }, delay, context);
    };
};

/**
 * 节流
 *
 * @param {Function} fn 需要节流的函数
 * @param {?Object=} context 函数调用时的上下文
 * @return {Function} 包装过的支持节流函数
 */
export const throttle = (fn, delay = 100, context) => {
    let lastCalledTime;
    let timer;

    const wrapperFn = (args, now = +new Date()) => {
        lastCalledTime = now;
        fn.apply(context, args);
    };

    return function throttled(...args) {
        const nowTime = +new Date();
        if (lastCalledTime && nowTime - lastCalledTime < delay) {
            clearTimeout(timer);
            timer = setTimeout(() => wrapperFn(args), delay);
        }
        else {
            wrapperFn(args, nowTime);
        }
    };
};

/**
 * 节流
 *
 * 在duration时长内，最多执行length次fn，如果执行次数超限，就回调onOverRun
 *
 * @param {Function} fn 需要节流的函数
 * @param {Number} duration
 * @param {Number} length
 * @param {Function} onOverRun
 * @return {Function} 包装过的支持节流函数
 */

export const throttle2 = ({
    fn,
    duration = 1000,
    length = 1,
    onOverRun
}) => {
    const queue = [];
    return (...args) => {
        const now = Date.now();
        const first = queue[0];

        if (queue.length < length) {
            queue.push(now);
            return fn(...args);
        }

        if (now - first > duration) {
            queue.shift();
            queue.push(now);
            return fn(...args);
        }

        if (typeof onOverRun === 'function') {
            return onOverRun(...args);
        }
    };
};

/**
 * 节流（相比throttle2，支持动态传入回调）
 *
 * 在duration时长内，最多执行length次fn
 *
 * @param {Function} fn 需要节流的函数
 * @param {Number} duration
 * @param {Number} length
 * @return {Function} 包装过的支持节流函数
 */

export const throttle3 = ({
    fn,
    duration = 1000,
    length = 1
}) => {
    const queue = [];
    return (data, onSuccess, onFail) => {
        const now = Date.now();
        const first = queue[0];

        if (queue.length < length) {
            queue.push(now);
            const result = fn(data);
            if (typeof onSuccess === 'function') {
                onSuccess(result);
            }
            return result;
        }

        if (now - first > duration) {
            queue.shift();
            queue.push(now);
            const result = fn(data);
            if (typeof onSuccess === 'function') {
                onSuccess(result);
            }
            return result;
        }

        if (typeof onFail === 'function') {
            return onFail();
        }
    };
};


/**
 * 生成自动重试方法
 *
 * 返回的方法在调用时候，将执行传入的方法fn，并在失败时候自动重试
 *
 * @param {Function} fn 返回值为thenable对象的方法
 * @param {Number} times 重试的次数
 * @param {Number} delay 重试时间间隔
 * @return {Function} 生成的自动重试方法
 */
export const createRetryer = options => {
    const {
        fn,
        delay = 1000,
        limit = 3,
    } = options;

    const wrappedFN = (...args) => (
        new Promise((resolve, reject) => {
            const run = error => {
                if (wrappedFN.retryTimes === limit) {
                    reject(error);
                    return;
                }
                fn(...args)
                    .then(
                        resolve,
                        error => {
                            setTimeout(() => {
                                wrappedFN.retryTimes++;
                                run(error);
                            }, delay);
                        }
                    );
            };
            run();
        })
    );

    wrappedFN.retryTimes = 0;

    return wrappedFN;
};

/**
 * 处理 async/await 异常
 *
 * 返回的方法在调用时候，resolve时将执行传入的方法fn，在失败的时候返回原因
 *
 * @param {Function} fn 返回值为thenable对象的方法
 * @return {Function} 生成数组，第一个元素为失败的原因，第二个元素是结果
 */
export const catchAwait = fn => async (...args) => {
    try {
        return [null, await fn(...args)];
    }
    catch (e) {
        return [e];
    }
};
