const { facebook, twitter, instagram } = require('./src/providers')
const { projection, stdout } = require('./src/utils')
const { Observable, operators } = require('./src/rx-core')
const { map, scan, merge } = operators

// Transform socialnetwok events into reactive data stream
const facebook$ = Observable.fromEvent('post', facebook({ rate : 250 }))
const twitter$ = Observable.fromEvent('twit', twitter({ rate : 500 }))
const instagram$ = Observable.fromEvent('hipster', instagram({ rate : 500 }))

// Normalize data
const facebookNormalizer = projection({
    user     : 'user',
    avatar   : 'picture',
    isHappy  : 'positiveFeedback',
    provider : 'provider'
})

const twitterNormalizer = projection({
    user     : 'user_name',
    avatar   : 'profile_image',
    isHappy  : 'positive_feedback',
    provider : 'provider'
})

const instagramNormalizer = projection({
    user     : 'name',
    avatar   : ['portfolio', 0],
    isHappy  : 'feedback',
    provider : 'provider'
})

// Mix in a channel
const socialnetwok$ = merge(
    facebook$.pipe(map(facebookNormalizer)),
    twitter$.pipe(map(twitterNormalizer)),
    instagram$.pipe(map(instagramNormalizer))
)

// Show real time report
const initialReport = {
    happyUsers   : 0,
    unhappyUsers : 0
}

const updateReport = (status, user) => {
    return {
        happyUsers   : user.isHappy ? status.happyUsers + 1 : status.happyUsers,
        unhappyUsers : !user.isHappy
            ? status.unhappyUsers + 1
            : status.unhappyUsers
    }
}

const subscription = socialnetwok$
    .pipe(scan(initialReport, updateReport))
    .subscribe({ next : stdout })

// Exit
setTimeout(() => {
    subscription.unsubscribe()
    console.log(' ---unsubscribed!---')
    process.exit(0)
}, 20000)
