const singleTon = function(name) {
    this.name = name
    this.instance = null
}

singleTon.prototype.getName = function() {
    alert (this.name)
}

singleTon.getInstance = function(name) {
    // 往singleTon上挂一个instance属性，作为仅有的一个实例
    if (!this.instance) {
        this.instance = new singleTon(name)
    }
    return this.instance
}
let a = singleTon.getInstance('fhj')
let b = singleTon.getInstance('dde')
console.log(a === b);  //  true