module.exports = class Subscription {
    constructor(unsubscribe) {
        this.unsubscribe = unsubscribe
    }

    static create(unsubscribe) {
        return new Subscription(unsubscribe)
    }
}
