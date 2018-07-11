const Observable = require('../src/rx-core/Observable')

const numbers = Observable.create(observer => {
    let i = 0
    const id = setInterval(() => observer.next(i++), 500)
    return () => clearInterval(id)
})

const handler = { next : console.log }
const subscription = numbers.subscribe(handler)
setTimeout(() => subscription.unsubscribe(), 3000)
