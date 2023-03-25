function deepClone(obj) {
    let map = new WeakMap()
    function isObject(target) {
        return target instanceof Object || typeof target === 'function'
    }
    if (isObject(obj)) {
        if (map.has(obj)) {
            return map.get(obj)
        }

        let newObj

        if (obj instanceof Array) {
            newObj = []
        } else if (obj instanceof Function) {
            newObj = function () {
                return obj.apply(this, arguments)
            }
        } else if (obj instanceof RegExp) {
            console.log("正则：",obj.source, obj.flags);
            newObj = new RegExp(obj.source, obj.flags)
        } else if (obj instanceof Date) {
            newObj = new Date(obj)
        } else if (obj instanceof Set) {
            newObj = new Set()
            // map.set(obj, )
        } else {
            newObj = {}
        }
        // 克隆一份对象，避免循环引用
        let desc = Object.getOwnPropertyDescriptors(obj)
        let clone = Object.create(Object.getPrototypeOf(obj), desc)
        map.set(obj, clone)
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = deepClone(obj[key])
            }
        }
        return newObj
    }
    return obj
}

let obj = {
    a: 1,
    b: {
        x: 2
    },
    c: [3,4],
    d: function() {
        console.log(this.a);
    },
    e: new RegExp('a','g'),
    f: new Date(),
    g: new Set([1,2,3,4,5])
}

let o = deepClone(obj)
console.log(o);