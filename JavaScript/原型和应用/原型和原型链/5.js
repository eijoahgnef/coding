// 寄生式继承
function createPerson(original) {
    var clone = Object.create(original)
    clone.sayGood = function() {
        console.log('hello');
    }
    return clone
}

let obj = {
    name: 'aaa'
}
let obj2 = createPerson(obj)