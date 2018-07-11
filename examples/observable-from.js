const Observable = require('../src/rx-core/Observable')
const { facebook } = require('../src/providers')

Observable.fromArray([1, 2, 3]).subscribe({
    next     : n => console.log('from Array:', n),
    complete : () => console.log('completed!')
})

Observable.fromEvent('post', facebook({ rate : 500 })).subscribe({
    next     : post => console.log('from facebook -->', post),
    complete : () => console.log('completed!')
})
