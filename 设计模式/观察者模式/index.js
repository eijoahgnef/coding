let publisher = {
    // 订阅者们
    mySubscriber: [],
    addSubscriber: function(subscriber) {
        this.mySubscriber.push(subscriber)
    },  //添加订阅者
    // 发布消息给订阅者
    releaseNews(msg) {
        this.mySubscriber.forEach(item => {
            item.call(this, msg)
        })
    }
}

function ui(msg) {
    if (msg === '出图') {
        // 接收到自己的任务开始执行
        console.log(msg);
    } else {
        console.log('指令错误');
    }
}
function coder(msg) {
    if (msg === '敲代码') {
        console.log(msg);
    } else {
        console.log('指令错误');
    }
}
// ui订阅消息
publisher.addSubscriber(ui)
// 程序员订阅信息
publisher.addSubscriber(coder)
publisher.releaseNews('敲代码')