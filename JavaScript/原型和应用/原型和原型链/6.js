// 寄生组合式继承
SuperType.prototype.sayName = function () {
    console.log(this.name);
}
function SuperType(name) {
    this.name = name
    this.colors = ['red', 'green', 'blue']
}


function SubType(name, age) {
    SuperType.call(this, name)
    this.age = age
}
var anotherPrototype = Object.create(SuperType.prototype)
SubType.prototype = anotherPrototype
SubType.prototype.constructor = SubType
SubType.prototype.sayAge = function () {
    console.log(this.age);
}


var instance1 = new SubType('fhj', 20)
instance1.colors.push('pink')
instance1.sayName()
instance1.sayAge()
console.log(instance1.colors);

var instance2 = new SubType('dde', 22)
instance2.sayName()
instance2.sayAge()
console.log(instance2.colors);
