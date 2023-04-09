// 冒泡排序，小的冒泡，大的沉底, 时间复杂度：O(n^2)
function bubbleSort(arr) {
    for (let i = 0; i < arr.length-1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
            }
        }
    }
    return arr
}

// 选择排序，在未排序的序列中找到最小（最大）元素，存放在排序序列的起始位置，然后，再从剩余未排序的元素中继续寻找最小（最大）元素，然后放在已排序的末尾。以此类推。
function selectSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        index = i
        for (let j = i+1; j < arr.length; j++) {
            if (arr[index] > arr[j] ) {
                index = j
            }
        }
        if (index !== i) {
            [arr[index], arr[i]] = [arr[i], arr[index]]
        }
    }
    return arr
}
const arr = [2,35,15,123,51,32,32,12,124]
console.log(selectSort(arr));