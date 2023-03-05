// 正常的递归函数
function sum(x, y) {
    if (y > 0) {
        return sum(x + 1, y - 1);
    } else {
        return x;
    }
}

sum(1, 100000)

// 蹦床函数的一个实现
// function trampoline(f) {
//     while (f && f instanceof Function) {
//         f = f();
//     }
//     return f;
// }

// function sum(x, y) {
//     if (y > 0) {
//         return sum.bind(null, x + 1, y - 1);
//     } else {
//         return x;
//     }
// }

// trampoline(sum(1, 100000))


// 尾递归的优化，将递归改成了循环
function tco(f) {
    var value;
    var active = false;
    var accumulated = [];
  
    return function accumulator() {
      accumulated.push(arguments);
      if (!active) {
        active = true;
        while (accumulated.length) {
          value = f.apply(this, accumulated.shift());
        }
        active = false;
        return value;
      }
    };
  }
  
  var sum = tco(function(x, y) {
    if (y > 0) {
      return sum(x + 1, y - 1)
    }
    else {
      return x
    }
  });
  
  sum(1, 100000)