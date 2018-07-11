class Observer {
    constructor(handler) {
        this.handler = handler
        this.unsubscribed = false
    }

    static create(handler) {
        return new Observer(handler)
    }

    next(value) {
        if (!this.unsubscribed) {
            this.handler.next(value)
        }
    }

    complete() {
        if (!this.unsubscribed) {
            this.handler.complete()
        }

        this.unsubscribe()
    }

    error(e) {
        if (!this.unsubscribed) {
            this.handler.error(e)
        }
        this.unsubscribe()
    }

    unsubscribe() {
        this.unsubscribed = true

        if (this._unsubscribe) {
            this._unsubscribe()
        }
    }
}

module.exports = Observer
