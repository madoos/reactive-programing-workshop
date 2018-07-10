const utils = require('../src/utils')

const double = x => x * 2
const mapDouble = utils.map(double)

utils.stdout(mapDouble([1, 2, 3]))
utils.stdout(mapDouble({ a : 1, b : 2, c : 3 }))
utils.stdout(utils.get('a.b.c.0', { a : { b : { c : [34] } } }))
utils.stdout(
    utils.projection(
        { a : 'a1', b : 'a.b', c : x => x.c * 2 },
        { a1 : 4, a : { b : 34 }, c : 2 }
    )
)

let i = 0
setInterval(() => utils.stdout({ a : { b : { c : i++ } } }), 1000)
