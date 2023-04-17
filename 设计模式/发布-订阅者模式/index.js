// 公司类
class Company {
    constructor() {
        // 事件中心
        this.eventList = {}
    }
    // 订阅方法
    subscribe(plan, flushMsg) {
        if (!this.eventList[plan]) {
            this.eventList[plan] = []
        }
        this.eventList[plan].push(flushMsg)
    }
    // 发布方法
    publish(plan, ...args) {
        if (this.eventList[plan]) {
            this.eventList[plan].forEach(flushMsg => flushMsg(...args))
        }
    }
    // 取消订阅方法
    unsubscribe(plan, flushMsg) {
        if (this.eventList[plan]) {
            const cbIndex = this.eventList[plan].findIndex(e => e === flushMsg)
            if (cbIndex != -1) {
                this.eventList[plan].splice(cbIndex, 1)
            }
        }
        if (this.eventList[plan].length === 0) {
            delete this.eventList[plan]
        }
    }
}
class Boss {
    constructor(name) {
        this.name = name
    }
    publish(plan, flushMsg, company) {
        company.publish(plan, flushMsg)
    }
}
class Customer{
    constructor(name) {
        this.name = name
    }
    subscribe(plan, flushMsg, company) {
        company.subscribe(plan, flushMsg)
    }
}
// 创建一个中介公司
let company = new Company()
// boss实例化
let boss = new Boss('fhj')
// 顾客实例化
let customer = new Customer('dde')
let scalper = new Customer('大黄牛')

customer.subscribe('200squares', (msg) => {
    console.log("200平方的有了", msg);
}, company)
customer.subscribe('300squares', (msg) => {
    console.log('300平方的有了', msg);
}, company)
scalper.subscribe('200squares', msg => {
    console.log("200平方的有了", msg);
}, company)
scalper.subscribe('300squares', msg => {
    console.log("300平方的有了", msg);
}, company)
scalper.subscribe('400squares', msg => {
    console.log("400平方的有了", msg);
}, company)
boss.publish('200squares', '电梯房11楼3万一平', company)
// boss发布消息后，顾客和黄牛都会收到消息