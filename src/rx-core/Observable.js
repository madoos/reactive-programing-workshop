const Observer = require('./Observer')
const Subscription = require('./Subscription.js')

class Observable {
    constructor(subscribe) {
        this._subscribe = subscribe
    }

    static create(subscribe) {
        return new Observable(subscribe)
    }

    subscribe(handler) {
        const observer = Observer.create(handler)
        const unsubscribedHandler = this._subscribe(observer)
        observer.__unsubscribe = unsubscribedHandler
        return Subscription.create(unsubscribedHandler)
    }
}

module.exports = Observable
