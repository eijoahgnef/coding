var Flower = function() {}

var xiaoming = {
    sendFlower: function(target) {
        var flower = new Flower()
        target.receiveFlower(flower)
    }
}

var B = {
    receiveFlower: function(flower) {
        A.listenGoodMood(function() {    // 监听A的好心情
            A.receiveFlower(flower)
        })
    }
}

var A = {
    receiveFlower: function(flower) {
        console.log('收到花' + flower);
    },
    listenGoodMood: function(fn) {
        // 假设十秒之后A的心情变好
        setTimeout(fn,10000)
    }
}

xiaoming.sendFlower(B)