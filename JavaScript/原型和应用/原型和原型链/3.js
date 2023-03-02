// 组合继承

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
SubType.prototype = new SuperType()
SubType.prototype.constructor = SubType
SubType.prototype.sayAge = function () {
    console.log(this.age);
}

var instance1 = new SubType('fhj', 18)
// console.log(instance1.colors); // ['red', 'green', 'blue']
instance1.sayName()
instance1.sayAge()

var instance2 = new SubType('dde', 19)
instance2.sayName()
instance2.sayAge()

console.log(instance1 instanceof SubType);  //  ture
