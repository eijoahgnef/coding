setTimeout(() => {
    console.log('timer1')
    Promise.resolve().then(function () {
        console.log('promise1')
    })
}, 0)
process.nextTick(() => {
    console.log('nextTick')
    process.nextTick(() => {
        console.log('nextTick')
        process.nextTick(() => {
            console.log('nextTick')
            process.nextTick(() => {
                console.log('nextTick')
            })
        })
    })
})
Promise.resolve().then(() => {
    console.log('promise2');
})

const superFn = async() => {
    console.log('super');
    await subFn()
    console.log('superman');
}
function subFn() {
    console.log('sub');
}
superFn()
// super
// sub
// nextTick
// super
// sub
// nextTick
// nextTick
// nextTick
// nextTick
// promise2
// superman
// timer1
// promise1

/* 
process.nextTick这个函数时独立于Event Loop之外的，它有一个自己的对列，
当每个阶段完成后，如果存在nextTIck对列，就会清空对列中的所有回调函数
并且优于其他mircotask执行
*/