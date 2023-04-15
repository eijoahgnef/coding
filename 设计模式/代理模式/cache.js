var mult = function() {
    let a = 1
    for(let i = 0,l = arguments.length; i < l; i++) {
        a = a * arguments[i]
    }
    return a
}

var proxyMult = (function() {
    let cache = {}
    return function() {
        console.log(arguments);
        let args = Array.prototype.join.call(arguments,',')
        if (args in cache) {
            return cache[args]
        }
        return cache[args] = mult.apply(this, arguments)
    }
})()

console.log(proxyMult(1,2,3,4));
console.log(proxyMult(1,2,3,4));