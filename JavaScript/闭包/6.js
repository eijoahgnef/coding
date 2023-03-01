    //赋值到闭包里
    let sque = (function () {
        let _width = Symbol();

        class Squery {
            constructor(s) {
                this[_width] = s
            }

            foo() {
                console.log(this[_width])
            }
        }
        return Squery
    })();

    let ss = new sque(20);
    ss.foo();  // 20
    console.log(ss[_width])  // err