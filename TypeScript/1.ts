// 类型断言：“尖括号”语法 和 as语法，其实就是在告诉编译器，放心，我知道他是什么类型
let oneValue: any = 'this is a string'
let strLength:number = (<string>oneValue).length

let anotherValue: any = 'this is a string too'
let itsLength = (anotherValue as string).length  //  length 提示为(property) String.length:number
let len: any = anotherValue.length  //  length 会提示为any类型


// 非空断言 用一个新的后缀表达操作符“!”可以用于断言操作对象是 非null 和 非undefined类型。
function myFun(maybeString: string | undefined | null) {
    const mustString: string = maybeString  //  会提示，不能将undefined，分配给string
    const ignoreUndefinedAndNull: string = maybeString! //  会排除null和undefined
}

type NumGenerator = () => number
function fn(numGenerator: NumGenerator | undefined) {
    const num1 = numGenerator()  //  err 调用了未定义的对象
    const num2 = numGenerator!()
}

let usedNum!: number  //  现在不会报错了
init()
console.log(usedNum * 2);  //  usedNum在赋值前就被使用了，

function init() {
    usedNum = 10
}