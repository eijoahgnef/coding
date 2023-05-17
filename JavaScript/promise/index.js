const PNEDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise(fn) {
    this.status = PENDING
    this.value = null
    this.reason = null

    var that = this

    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    function resolve(value) {
        if(that.status === PNEDING) {
            that.status = FULFILLED
            that.value = value

            that.onFulfilledCallbacks.forEach(callback => {
                callback(that.value)
            })
        }
    }


    function reject(reason) {
        if (that.status === PENDING) {
            that.status = REJECTED
            that.reason = reason

            that.onRejectedCallbacks.forEach(callback => {
                callback(that.reason)
            })
        }
    }

    try {
        fn(resolve, reject)
    } catch(error) {
        reject(error)
    }
}

MyPromise.prototype.all = function(promiseList) {
    let resPromise = new MyPromise((resolve, reject) => {
        let count = 0
        let result= []
        let length = promiseList.length

        if (length === 0) {
            return resolve(result)
        }

        promiseList.forEach((promise, index) => {
            MyPromise.resolve(promise).then(value => {
                count++
                result[index] = value
                if (count === length) {
                    resolve(result)
                }
            }, reason => {
                reject(reason)
            })
        })
    })


    return resPromise
}

MyPromise.prototype.race = function(promiseList) {
    let resPromise = new MyPromise((resolve, reject) => {
        let length = promiseList.length

        if (length === 0) {
            return resolve()
        } else {
            for (let i = 0; i < length; i++) {
                MyPromise.resolve(promiseList[i]).then(val => {
                    return resolve(val)
                }, reason => {
                    return reject(reason)
                })
            }
        }
    })

    return resPromise
}

MyPromise.prototype.finally = function(fn) {
    return this.then(value => {
        return MyPromise.resolve(fn()).then(() => value)
    }, err => {
        return MyPromise.resolve(fn()).then(() => {
            throw err
        })
    })
}

MyPromise.prototype.allSettled = function(promiseList) {
    return new MyPromise(resolve => {
        let length = promiseList.length
        let result = []
        let count = 0

        if (length === 0) {
            return resolve(result)
        } else {
            for (let i = 0; i < length; i++) {

                (function(i){
                    let currentPromise = MyPromise.resolve(promiseList[i])

                    currentPromise.then(value => {
                        count++
                        result[i] = {
                            status: 'fulfilled',
                            value: value
                        }
                        if (count === length) {
                            return resolve(result)
                        }
                    })
                })(i)
            }
        }
    })
}