const utils = require('../src/utils')

const double = x => x * 2
const mapDouble = utils.map(double)

console.log(mapDouble([1, 2, 3]))
console.log(mapDouble({ a : 1, b : 2, c : 3 }))
console.log(utils.get('a.b.c.0', { a : { b : { c : [34] } } }))
console.log(
    utils.projection(
        { a : 'a1', b : 'a.b', c : x => x.c * 2 },
        { a1 : 4, a : { b : 34 }, c : 2 }
    )
)
