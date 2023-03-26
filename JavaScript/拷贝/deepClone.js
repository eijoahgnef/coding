function deepClone(obj) {
    let map = new WeakMap()
    function isObject(target) {
        return target instanceof Object || typeof target === 'function'
    }
    function clone(obj) {
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
                newObj = new RegExp(obj.source, obj.flags)
            } else if (obj instanceof Date) {
                newObj = new Date(obj)
            } else if (obj instanceof Set) {
                newObj = new Set()
                map.set(obj, newObj)
                obj.forEach(val => {
                    if (isObject(val)) {
                        newObj.add(clone(val))
                    } else {
                        newObj.add(val)
                    }
                })
                return newObj
            } else if(obj instanceof Map) {
                newObj = new Map()
                map.set(obj, newObj)
                obj.forEach((val, key) => {
                    if (isObject(val)) {
                        newObj.set(key, clone(val))
                    } else {
                        newObj.set(key, obj.get(key))
                    }
                })
                return newObj
            } else {
                newObj = {}
            }
            // 收集键名，包括symbol作为key以及不可枚举的属性
            const keys = Reflect.ownKeys(obj)
            let desc = Object.getOwnPropertyDescriptors(obj)
            let tmp = Object.create(Object.getPrototypeOf(obj), desc)
            map.set(obj, tmp)
            keys.forEach(key => {
                const val = obj[key]
                if(isObject(val)) {
                    newObj[key] = clone(val)
                } else {
                    newObj[key] = val
                }
            })
            return newObj
        }
        return obj
    }
    
    return clone(obj)
}
let testMap = new Map()
testMap.set('name', 'fhj')
testMap.set('age', 18)
testMap.set('obj', {
    name: 'fhj',
    age: 18
})
var obj = {
    a: 1,
    b: {
        x: 2
    },
    c: [3, 4],
    d: function () {
        console.log(this.a);
    },
    e: new RegExp('a', 'g'),
    f: new Date(),
    g: new Set([1, 2, 3, 4, 5]),
    h: testMap
}


let o = deepClone(obj)
console.log(o);


