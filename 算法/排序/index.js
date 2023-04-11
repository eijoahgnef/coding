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

// 快速排序，选一个值为基准值，然后大的放右边，小的放左边，一样大的放中间
function quickSort(arr) {
    if (arr.length < 2) {
        return arr
    } else {
        let pivot = arr[0]
        let pivotArr = []
        let lowArr = []
        let highArr = []
        arr.forEach(item => {
            if (item > pivot) {
                highArr.push(item)
            } else if (item < pivot) {
                lowArr.push(item)
            } else {
                pivotArr.push(item)
            }
        })
        return quickSort(lowArr).concat(pivotArr).concat(quickSort(highArr))
    }
}

//  归并排序，排序一个数组，我们先把数组从中间分成前后两部分，然后对前后两部分分别排序，再将排好序的两部分合并在一起，这样整个数组就都有序了 
function mergeSort(arr) {
    const len = arr.length
    if (len < 2) return arr
    let middle = Math.floor(len/2)
    let left = arr.slice(0, middle)
    let right = arr.slice(middle)
    return merge(mergeSort(left), mergeSort(right))
}
function merge(left, right) {
	const result = [];
	while (left.length && right.length) {
		if (left[0] <= right[0]) {
			result.push(left.shift());
		} else {
			result.push(right.shift());
		}
	}
	while (left.length) result.push(left.shift());
	while (right.length) result.push(right.shift());
	return result;
};

// 堆排序，
const arr = [2,35,15,123,51,123,32,32,12,124]
// console.log(mergeSort(arr));

