const EventEmitter = require('events')
const faker = require('faker')

const facebook = ({ rate }) => {
    const posts = new EventEmitter()

    setInterval(
        () =>
            posts.emit('post', {
                user             : faker.name.firstName(),
                picture          : faker.image.people(),
                post             : faker.lorem.paragraph(),
                positiveFeedback : faker.random.boolean()
            }),
        rate
    )

    return posts
}

const twitter = ({ rate }) => {
    const twits = new EventEmitter()

    setInterval(
        () =>
            /*eslint camelcase: 0*/
            twits.emit('twit', {
                user_name         : faker.name.firstName(),
                profile_image     : faker.image.people(),
                twit              : faker.lorem.sentence(),
                positive_feedback : faker.random.boolean()
            }),
        rate
    )

    return twits
}

const instagram = ({ rate }) => {
    const posers = new EventEmitter()

    setInterval(
        () =>
            posers.emit('hipster', {
                name      : faker.name.firstName(),
                portfolio : [
                    faker.image.cats(),
                    faker.image.people(),
                    faker.image.fashion(),
                    faker.image.food()
                ],
                lifeStyle : faker.lorem.paragraphs(),
                feedback  : faker.random.boolean()
            }),
        rate
    )

    return posers
}

module.exports = {
    facebook,
    twitter,
    instagram
}
