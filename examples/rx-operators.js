const Observable = require('../src/rx-core/Observable')
const { map, filter, scan, merge, pipe } = require('../src/rx-core/operators')

const double = n => n * 2
const isPair = n => n % 2 === 0
const add = (a, b) => a + b

const show = {
    next     : console.log,
    error    : console.error,
    complete : () => console.log('completed!')
}
const numbers$ = Observable.fromArray([1, 2, 3, 4, 5])

map(double)(numbers$).subscribe(show)
filter(isPair)(numbers$).subscribe(show)
scan(0)(add)(numbers$).subscribe(show)

pipe(
    filter(isPair),
    map(double),
    scan(0, add)
)(numbers$).subscribe(show)

const asyncNumbers$ = Observable.sequence(function*() {
    let n = 0
    while (true) {
        yield n++
    }
}, 250)

const letters$ = Observable.sequence(function*() {
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    while (true) {
        yield possible.charAt(Math.floor(Math.random() * possible.length))
    }
}, 400)

const symbols$ = Observable.sequence(function*() {
    let possible = '!@¢$<>=?¿%'
    while (true) {
        yield possible.charAt(Math.floor(Math.random() * possible.length))
    }
}, 350)

const subscription = merge(letters$, asyncNumbers$, symbols$).subscribe(show)
setTimeout(() => subscription.unsubscribe(), 2000)
