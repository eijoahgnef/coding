// reduce(callbackFn,initaValue)
// reduce((previousValue, currentValue, currentIndex, array) => {})
// previousValue:上一次调用callback的返回值。在第一次调用时，若指定了初始值initaValue，其值则为initaValue，否则为数组索引为0的元素array[0]
// currentValue:数组中正在处理的元素。在第一次调用时，若指定了初始值initaValue。其值则为索引为0的元素array[0],否则array[1]
// 当设置了initaValue初始值，那么就会遍历arr.length次数组，否则arr.length - 1次
// 函数最终的返回值不是callback里的返回值，callback的返回值给了previousValue，最终返回给外界的是previousValue

let numberArr = [1,1,1,2,3,4,4,5,6,6,7]
let stringArr = ['a', 'b', 'c', 'c', 'f', 'f', 'h', 'h']

// 处理总和的累加器
const delTotal = (acc, item) => {
    return acc + item
}

// 处理最大值的累加器
const delMax = (acc, item) => {
    return (acc > item) ? acc : item
}

// 数组去重
const delRepetition = (acc, cur) => {
    if (acc.indexOf(cur) === -1) {
        acc.push(cur)
    }
    return acc
}
// console.log(numberArr.reduce(delRepetition, []));
// console.log(stringArr.reduce(delRepetition, []));

// 将二维数组转为一维
const flattened = (acc, cur) => acc.concat(cur)
// console.log([[0,2],[4,6],[7,8]].reduce(flattened, []));

// 计算数组中每个元素出现的个数
// 统计出现次数这个场景，也很常见，比如投票统计
const reducer = (tally, vote) => {
    if (!tally[vote]) {
        tally[vote] = 1
    } else {
        tally[vote] = tally[vote] + 1  //  此处只能这样增 1
    }
    // console.log();
    return tally
}

const votes = ['vue', 'react', 'angular', 'angular', 'vue','vue', 'vue']
// console.log(votes.reduce(reducer, {}));

// 可以做数据筛选



