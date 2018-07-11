const providers = require('../src/providers')

const facebook = providers.facebook({ rate : 300 })
const twitter = providers.twitter({ rate : 300 })
const instagram = providers.instagram({ rate : 300 })

facebook.on('post', console.log)
twitter.on('twit', console.log)
instagram.on('hipster', console.log)

setTimeout(() => facebook.close(), 2000)
setTimeout(() => twitter.close(), 2000)
setTimeout(() => instagram.close(), 2000)
