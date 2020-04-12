/**
 * @file 缓冲队列
 */
import EventEmitter from './EventEmitter';

export default class BufferQueue {
    constructor(length, interval) {
        this.length = length;
        this.interval = interval;
    }

    eventEmitter = new EventEmitter();

    timer = null;

    queue = [];

    length = 0;

    interval = 1000;

    push(ele) {
        if (this.queue.length < this.length) {
            this.queue.push(ele);
            if (this.queue.length === 1) {
                this.startTimer();
            }
        }
    }

    filter(canSave) {
        return this.queue.filter(ele => canSave(ele));
    }

    listenPop(callback) {
        this.eventEmitter.on('pop', callback);
    }

    clear() {
        this.eventEmitter.clear();
        this.queue = [];
        this.stopTimer();
    }

    pop = () => {
        const {queue} = this;
        if (queue.length) {
            const data = queue.shift();
            if (queue.length === 0) {
                this.stopTimer();
            }
            this.eventEmitter.trigger('pop', data);
        }
    };

    startTimer() {
        // 立即执行一下
        this.pop();
        this.timer = setInterval(this.pop, this.interval);
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
}
