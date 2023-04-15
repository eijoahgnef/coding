// 利用代理模式实现图片预加载
var myImage = (function() {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode)

    return {
        setSrc: function(src) {
            imgNode.src = src
        }
    }
})()

var proxyImage = (function() {
    var img = new Image
    img.onload = function() {
        myImage.setSrc(this.src)
    }

    return {
        setSrc: function(src) {
            myImage.setSrc('C:/users/loading.gif')
            img.src = src
        }
    }
})()

proxyImage.setSrc('http://imgXXXXXXX')