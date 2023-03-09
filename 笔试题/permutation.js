// 全排列
function permutation(nums) {
    let res = []
    let path = []

    track(nums, nums.length, [])

    function track(arr, len, used) {
        // 递归出口
        if (arr.length === len) {
            res.push([...path])
        }

        for (let i = 0; i < arr.length; i++) {
            if (used[i]) continue  //  记录路径是否用过
            path.push(arr[i])
            used[i] = true
            track(arr, len, used)  //  递归
            path.pop()  //  回溯，将push的元素pop出来，然后标记为未使用
            used[i] = false
        }
    }
}