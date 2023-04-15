var each = function(arr, callback) {
    for (let i = 0, l = arr.length; i < l; i++) {
        if (callback(i, arr[i]) === false) {
            break
        }
    }
}

each([1,2,3,4,5], (i, n) => {
    if (n>3) {
        return false
    }
    console.log(n);
})
