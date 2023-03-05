let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: 'aaa', bar: 'bbb' };
baz // undefined

// 错误的写法
let x;
// {x} = {x: 1};
// SyntaxError: syntax error
// 上面代码的写法会报错，因为 JavaScript 引擎会将{x}理解成一个代码块，从而发生语法错误。
// 只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。
({x} = {x: 1});