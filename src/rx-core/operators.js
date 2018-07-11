const { curry } = require('../utils')
const Observable = require('./Observable')

const map = curry((f, src) => {
    return Observable.create(observer => {
        const subscription = src.subscribe({
            next     : x => observer.next(f(x)),
            error    : e => observer.error(e),
            complete : () => observer.complete()
        })

        return () => subscription.unsubscribe()
    })
})

const filter = curry((predicate, src) => {
    return Observable.create(observer => {
        const subscription = src.subscribe({
            next : x => {
                if (predicate(x)) {
                    observer.next(x)
                }
            },
            error    : e => observer.error(e),
            complete : () => observer.complete()
        })

        return () => subscription.unsubscribe()
    })
})

const scan = curry((initialValue, reducer, src) => {
    return Observable.create(observer => {
        const subscription = src.subscribe({
            next : x => {
                initialValue = reducer(initialValue, x)
                observer.next(initialValue)
            },
            error    : e => observer.error(e),
            complete : () => observer.complete()
        })

        return () => subscription.unsubscribe()
    })
})

const merge = (...streams) => {
    return Observable.create(observer => {
        const subscribe = src =>
            src.subscribe({
                next     : x => observer.next(x),
                error    : e => observer.error(e),
                complete : () => observer.complete()
            })

        const subscriptions = streams.map(subscribe)

        return () => {
            subscriptions.forEach(subscription => subscription.unsubscribe())
        }
    })
}
const pipe = (...operators) => src => {
    return operators.reduce((stream, operator) => operator(stream), src)
}

module.exports = {
    map,
    filter,
    scan,
    merge,
    pipe
}
