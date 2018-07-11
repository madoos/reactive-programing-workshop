const { curry } = require('../utils')

const map = curry((f, stream) => {})
const filter = curry((p, stream) => {})
const scan = curry((initialValue, reducer, stream) => {})
const merge = (...streams) => {}
const pipe = (...operators) => stream => {}

module.exports = {
    map,
    filter,
    scan,
    merge,
    pipe
}
