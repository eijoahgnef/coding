function temp(a,b){
    //打印a的结果
	console.log(a)  //  [Function: a]
    //声明一个函数a
	function a(){}
    //给a进行赋值
	a = 10
    //打印a的结果
	console.log(a)  //  10
    //声明一个函数b
	function b(){}
    //打印b的结果
	console.log(b)  //  [Function: b]
}
//调用temp()这个函数
temp(9,5)

// 按照流程也就是说会这样：
// 创建一个AO对象，
// AO {a: undefied, b: undefied} -> function声明提升 AO {a: [Function: a], b: [Function: b]}
//  然后就是逐行解释代码了