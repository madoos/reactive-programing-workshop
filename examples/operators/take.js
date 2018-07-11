const Observable = require('../../src/rx-core/Observable')
const { take } = require('../../src/rx-core/operators')

Observable.interval(1000)
    .pipe(take(3))
    .subscribe({
        next     : console.log,
        complete : () => console.log('completed!')
    })
