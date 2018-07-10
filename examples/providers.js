const providers = require('../src/providers')

const facebook = providers.facebook({ rate : 1000 })
facebook.on('post', console.log)

const twitter = providers.twitter({ rate : 1000 })
twitter.on('twit', console.log)

const instagram = providers.instagram({ rate : 1000 })
instagram.on('hipster', console.log)
