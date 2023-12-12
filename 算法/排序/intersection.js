// 两个乱序数组的交集
let arr1 = [2, 4, 5, 3, 9, 12, 15, 17, 19]
let arr2 = [3, 5, 8, 16, 13, 12, 19]

// 两个循环暴力解，时间复杂度
// function intersection(arr1, arr2) {
//     let arr = []
//     for (let i = 0; i < arr1.length; i++) {
//         let current = arr1[i]
//         for (let j = 0; j < arr2.length; j++) {
//             if (current === arr2[j]) {
//                 arr.push(current)
//             }
//         }
//     }
//     return arr
// }

// 双指针同时遍历两个数组 O(n)
// function intersection(arr1, arr2) {
//     let i = 0, j = 0;
//     let arr = []
//     arr1.sort((a, b) => a-b)
//     arr2.sort((a, b) => a-b)
//     while(i < arr1.length && j < arr2.length) {
//         if (arr1[i] === arr2[j]) {
//             arr.push(arr1[i])
//             i++
//             j++
//         } else if (arr1[i] > arr2[j]) {
//             j++
//         } else {
//             i++
//         }
//     }
//     return arr
// }

// 排序+二分查找 O(nlogn)
// function intersection(arr1, arr2) {
//     arr1.sort((a,b) => a-b)
//     let arr = []
//     for (let i = 0; i < arr2.length; i++) {
//         if (binary(arr2[i], arr1)) {
//             arr.push(arr2[i])
//         }
//     }
//     function binary(num, arr) {
//         let left = 0
//         let right = arr.length - 1
//         while(left <= right) {
//             let middle = Math.floor((left+right)/2)
//             if (arr[middle] === num) {
//                 return true
//             } else if (arr[middle] > num) {
//                 right = middle - 1
//             } else {
//                 left = middle + 1
//             }
//         }
//         return false
//     }
//     return arr
// }

// 利用hash结构

console.log(intersection(arr1, arr2));