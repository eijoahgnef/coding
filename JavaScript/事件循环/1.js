console.log('script start');

setTimeout(function () {
    console.log('setTimeout');
}, 0);

Promise.resolve()
    .then(function () {
        console.log('promise1');
    })
    .then(function () {
        console.log('promise2');
    });

console.log('script end');

/* 
Tasks:
Mircrotasks: 
JS stack:
Log:
*/

// 1. 当前循环产生的微任务会加入到本次循环的微任务队列中
// 2。 只有微任务队列为空的时候才会开启下一个宏任务