var each = function(arr, callback) {
    for (let i = 0,l = arr.length; i < l; i++) {
        callback.call(arr[i], i ,arr[i])
    }
}

each([1,2,3], (i, n) => {
    console.log(i,n);
})