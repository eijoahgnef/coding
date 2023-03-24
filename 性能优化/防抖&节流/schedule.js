class Schedule {
    constructor(max) {
        // 最多可允许的任务数
        this.max = max
        // 记录正在执行的异步函数
        this.count = 0
        // 初始化任务队列
        this.queue = []
    }
    async addTask(timer, result) {
        // 如果正在执行的异步函数大于了最大限制，则会阻塞
        if (this.count >= this.max) {
            await new Promise((resolve) => {
                this.queue.push(resolve)
            })
        }
        this.count++
        // 阻塞后面的任务
        let res = await new Promise(resovle => {
             setTimeout(() => {
                resovle(result)
             }, timer)
        })
        this.count--
        // 唤醒阻塞的队列
        if (this.queue.length) {
            this.queue.shift()()
        }
        console.log(res);
        return res
    }
}
let scheduler = new Schedule(2)
scheduler.addTask(3000, '1')
scheduler.addTask(1000, '2')
scheduler.addTask(1000, '3')
scheduler.addTask(900, '4')
