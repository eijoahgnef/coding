# JavaScript的数据类型
- 基础数据类型：number, string, boolean, null, undefined, bigint, symbol
- 引用数据类型：Object, Date, Repx, Array, Math, Set, Map, weakSet, weakMap

# null 和 undefined 的区别
- 相同点：都是原始类型的值，进行条件判断时，两者都是false。
- 不同点：null是js的关键字，表示空值，undefined不是js的关键字，它是一个全局变量。类型不一样，转换值也不一样。

# 判断数据类型的方法
- typeof 用于判断基础类型，但是判断null的时候他会是object，这是一个历史遗留问题，判断一个数据的类型主要是根据他在底层的二进制存储的前三位，而null全是0，判断数据类型是跟你局前三位的数字，对象前三位为0，自然null也就被误认为是对象了。也可用于判断function，返回的就是'function'。
- instanceOf 用于引用类型的判断
- Object.prototype.toString.call() 可用来判断所有类型，包括null，其返回值都是为 "[object XXXX]"，后面的是首字母大写。
- constructor 整数数字需要加括号，或者多加一个小数点(num).constructor 或 num..constructor,null和undefined都不能用判断，undefined是为定义的，而null则为空。

# 类型转换
分为显式类型转换 和 隐式类型转换
显式类型转换：靠JavaScript内置的一些API通过开发人员直接执行的。比如Number()、String()、Boolean()、parseInt()等。
隐式类型转化：由JavaScript编译器自动完成，隐式类型转换也叫强制类型转换。

# 一元操作符
+ 会默认调用 ToNumber 处理该值


如果传入的值是对象类型，会先调用ToPrimitive() 方法，执行的步骤是：

1. 如果 obj 是基本类型，就直接返回
2. 否则，调用 valueOf 方法，如果返回一个原始值，则js将其值返回
3. 否则，调用 toString 方法，如果返回一个原始值，则js将其值返回
4. 否则，报类型错误


# 二元运算
<!-- val1 + val2 -->
1. v1 = Toprimitive(val1)
2. v2 = Toprimitive(val2)
3. 如果v1是字符串或者v2是字符串，那么返回 ToString(v1) 和 ToString(v2)的拼接结果
4. 返回 ToNumber(v1) 和 ToNumber(v2)的运算结果

- new Date(2021,12,20)跳过valueOf()

- num 和 数组

# == 相等
x == y
如果x,y是同一类型：
1. x是 undefined，返回true
2. x是null，返回true
3. ...
4. x是对象，y是字符串或者数字，Toprimitive(x) == y
5. null == undefined // true

# 布尔值和其他类型
1. 当一方出现布尔值时，就会对这一方面的值进行 ToNumber() 处理

# toBoolean
"",false,0,null,undefined,NaN  都会转为false，其余的都会转为true