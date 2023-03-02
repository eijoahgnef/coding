// 原型式继承
function object(o) {
    function F() { }
    F.prototype = o
    return new F()
}

var person = {
    name: '胡少',
    colors:['red', 'green', 'blue']
}

var person1 = Object.create(person,{
    name: {
        value:'老胡',
        enumerable: true
    }
})
var person2 = Object.create(person,{
    name: {
        value:'胡老'
    }
})
person1.colors.push('pink')
console.log(person1); //  {name: '老胡'}
console.log(person2);  //  {}
console.log(person2.name); //  胡老
console.log(person1.colors);  //    [ 'red', 'green', 'blue', 'pink' ]
console.log(person2.colors);    //  [ 'red', 'green', 'blue', 'pink' ]