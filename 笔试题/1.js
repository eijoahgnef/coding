function parseParam(url) {
    const ans = {}
    const paramsArr = url.slice(url.indexOf("?") + 1).split("&")
    for (let i = 0; i < paramsArr.length; i++) {
        let params = paramsArr[i].split('=')
        let key = params[0]
        let value = params.length === 1 ? true : decodeURIComponent(reverse(params[1]))
        if (key in ans) {
            if (Array.isArray(ans[key])) {
                ans[key].push(value)
            } else {
                ans[key] = [ans[key], value]
            }
        } else {
            ans[key] = value
        }
    }
    return ans
}

function reverse(value) {
    return parseInt(value) == value ? parseInt(value) : value
}
console.log(parseParam("http://www.domain.com/?user=jack&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled"));