const curryN = (arity, fn) => {
    const curried = (...args) => {
        return arity === args.length
            ? fn(...args)
            : (...rest) => curried(...args, ...rest)
    }

    return curried
}

const curry = fn => {
    return curryN(fn.length, fn)
}

const isPromise = value => {
    return typeof value.then === 'function' ? true : false
}

const _mapArray = curry((f, xs) => xs.map(f))

const _mapObject = curry((f, x) => {
    return Object.entries(x).reduce((mapped, [key, value]) => {
        mapped[key] = f(value)
        return mapped
    }, {})
})

const isArray = Array.isArray

const map = curry((f, x) => {
    return isArray(x) ? _mapArray(f, x) : _mapObject(f, x)
})

const isFunction = x => typeof x === 'function'

const get = curry((path, x) => {
    const _path = isArray(path) ? path : path.split('.')

    try {
        return _path.reduce((child, key) => {
            return child[key]
        }, x)
    } catch (e) {
        return
    }
})

const projection = curry((descriptor, src) =>
    map(getter => {
        return isFunction(getter) ? getter(src) : get(getter, src)
    }, descriptor)
)

module.exports = {
    curryN,
    curry,
    isPromise,
    map,
    isFunction,
    get,
    projection
}
