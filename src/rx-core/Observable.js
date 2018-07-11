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

    pipe(...operators) {
        return operators.reduce((stream, operator) => operator(stream), this)
    }

    static fromArray(xs) {
        return new Observable(observer => {
            xs.forEach(x => observer.next(x))
            observer.complete()
            return () => {
                /* unsubscribed*/
            }
        })
    }

    static fromEvent(event, ee) {
        return new Observable(observer => {
            const onNext = x => observer.next(x)
            const onError = e => observer.next(e)
            const onFinish = () => observer.complete()

            ee.addListener(event, onNext)
            ee.addListener('error', onError)
            ee.addListener('finish', onFinish)

            return () => {
                ee.removeListener(event, onNext)
                ee.removeListener('error', onError)
                ee.removeListener('finish', onFinish)
            }
        })
    }

    static sequence(generator, ms) {
        const it = generator()

        return new Observable(observer => {
            const id = setInterval(() => {
                observer.next(it.next())
            }, ms)

            return () => clearInterval(id)
        })
    }

    static interval(ms) {
        let i = 0

        return new Observable(observer => {
            const id = setInterval(() => {
                observer.next(i++)
            }, ms)

            return () => clearInterval(id)
        })
    }
}

module.exports = Observable
