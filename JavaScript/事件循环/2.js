console.log('1');

setTimeout(function () {
    console.log('2');
    process.nextTick(function () {
        console.log('3');
    })
    new Promise(function (resolve) {
        console.log('4');
        resolve();
    }).then(function () {
        console.log('5')
    })
})
process.nextTick(function () {
    console.log('6');
})
new Promise(function (resolve) {
    console.log('7');
    resolve();
}).then(function () {
    console.log('8')
})

setTimeout(function () {
    console.log('9');
    process.nextTick(function () {
        console.log('10');
    })
    new Promise(function (resolve) {
        console.log('11');
        resolve();
    }).then(function () {
        console.log('12')
    })
})

// 第一轮
/* 
Tasks: script  setTimeout setTimeout
Mircrotasks: 
JS stack: run script 
Log: 1 7 6 8
*/
// UI render
// 第二轮
/* 
Tasks:   setTimeout setTimeout
Mircrotasks: 
JS stack: run setTimeout
Log: 1 7 6 8 2 4 3 5
*/
// UI render
// 第三轮
/* 
Tasks: setTimeout
Mircrotasks: 
JS stack: run setTimeout
Log: 1 7 6 8 2 4 3 5 9 11 10 12
*/