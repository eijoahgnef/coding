## JS为什么是单线程语言？
> js作为主要运行在浏览器的脚本语言，js主要用途之一就是操作DOM。如果js有两个进程，同时对一个DOM进行操作，这时浏览器该听哪个线程的。

## promise的特性？
1. promise有三种状态，pending，fulfilled，rejected。只有异步操作的结果，才可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。

## promise的作用？
> 异步编程，避免回调地狱。

# promise原型上有哪些方法？
- then(resolved, rejected)
then 方法会返回一个新的promise实例（不是原来那个promise实例）

- catch(err)
是then方法的别名，用于指定发生错误时的回调函数

- finally(callback)
用于指定不管promise对象最后状态如何，都会执行的操作。

- all([p1, p2, p3])
用于将多个promise实例，包装成一个新的promise实例。只有数组里的promise对象的状态都变成了fulfilled，或者是有一个被rejected，就会调用后面的回调方法。

- race([p1, p2, p3])
这个和all方法差不多，但是只要有一个实例率先改变状态，不管是成功还是失败，这个先改变状态的实例的返回值就会传给race后面的回调函数。

- any([p1, p2, p3])
只要参数实例有一个变成fulfilled状态，any返回的promise就会变成fulfilled，如果所有的实例都是变成了rejected，那么catch就会捕捉到错误。