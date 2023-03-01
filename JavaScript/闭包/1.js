function foo(){
    var a = 2;
    function bar(){
        console.log('a: ' + a);  //  ?
    }
    return bar;
}
var baz = foo();
baz();