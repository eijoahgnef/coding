// 经典继承
function SuperType(name) {
    this.colors = ['red', 'green', 'blue']
    this.name = name
}

function SubType(name) {
    SuperType.call(this, name)
}

var instance1 = new SubType()
instance1.colors.push('pink')
console.log(instance1.colors); // ['red', 'green', 'blue','pink']

var instance2 = new SubType('fhj')
console.log(instance2);
// SubType { colors: [ 'red', 'green', 'blue' ] }