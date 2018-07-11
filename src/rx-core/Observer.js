module.exports = class Observer {
    constructor(handler) {
        this.handler = handler
        this.unsubscribed = false
    }

    static create(handler) {}

    next(value) {}

    complete() {}

    error(e) {}

    unsubscribe() {}
}
