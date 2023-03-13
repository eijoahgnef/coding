function ajax(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET','/user');
    xhr.onreadystatechange = function(){
          ajax();
    };
    xhr.send();
}
// axios的封装
axios.defaults.timeout = 61 * 1000
let copyConfig
axios.interceptors.request.use((config) => {
    config.headers['Authorization'] = window.localStorage.getItem('jwtToken')
    config.headers['userId'] = window.localStorage.getItem('userId')
    copyConfig = config
    return config
})

axios.interceptors.response.use((response) => {
    return response
}, 
(err) => {
    if (err.code === "ECONNABORTED") {
        console.log('超时了，再次发请求，新建一个Promise');
        var newPromise = new Promise(function (resolve){
            resolve()
        })

        return newPromise.then(function () {
            return axios(copyConfig.headers)
        })
    }
    return Promise.reject(err)
})
