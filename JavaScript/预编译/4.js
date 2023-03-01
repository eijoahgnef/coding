var a = 100
function foo(){
    console.log(a)
}
foo()

// 面试官问： 为什么输出的值会是100

// 实现编译器会创建一个GO对象
// 找到声明变量 var a 和函数声明function foo() {}
// GO {
//     a: undefined,
//     foo: function(){}
// }
// 然后逐步执行代码，运行第一行代码，a = 100,GO中的a： undefined -> 100
// 当执行到foo(),会创建一个AO对象，接着又时在里面找变量和函数声明
// AO {} 由于没有，就为空了
// 执行foo(),打印a，先在AO里找，没有，再往GO里找