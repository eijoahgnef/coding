function myNew(fn) {
    return function() {
        console.log(arguments);
        let args = Array.from(arguments)
        let obj = {}
        obj.__proto__ = fn.prototype
        let tmp = fn.call(obj, ...args)
        return tmp ? tmp : obj
    }
}

function Person(height, weight) {
    this.height = height
    this.weight = weight
}

let yaoming = myNew(Person)(226, 140)
console.log(yaoming);