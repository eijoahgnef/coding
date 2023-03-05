# 字符串的正则方法
> ES6出现之前，字符串对象共有4个方法，可以使用正则表达式：match()、replace()、search()、split()。ES6将这4个方法全部调用到RegExp的实例方法，从而做到所有与正则相关的方法，全部定义到RegExp对象上。

# 常见的正则  1.js

# 正则中的特殊字符
- 先行断言：x(?=y), 匹配 x 仅仅当x后面跟着
    例如，/Jack(?=Sprat)/会匹配到'Jack'仅当它后面跟着'Sprat'。/Jack(?=Sprat|Frost)/匹配‘Jack’仅当它后面跟着'Sprat'或者是‘Frost’。但是‘Sprat’和‘Frost’都不是匹配结果的一部分。
- 后行断言：(?<=y), 匹配 x 仅当x前面是y
    例如，/(?<=Jack)Sprat/会匹配到' Sprat '仅仅当它前面是' Jack '。/(?<=Jack|Tom)Sprat/匹配‘Sprat ’仅仅当它前面是'Jack'或者是‘Tom’。但是‘Jack’和‘Tom’都不是匹配结果的一部分。